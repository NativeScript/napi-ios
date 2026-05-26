#ifndef NATIVESCRIPT_NATIVE_API_HAS_ENGINE_LAZY_GLOBALS
inline bool InstallNativeApiEngineLazyGlobal(
    Runtime&, std::shared_ptr<NativeApiJsiBridge>, const std::string&,
    const std::string&, bool) {
  return false;
}
#endif

class NativeApiHostObject final : public HostObject {
 public:
  explicit NativeApiHostObject(std::shared_ptr<NativeApiJsiBridge> bridge)
      : bridge_(std::move(bridge)) {}

  Value get(Runtime& runtime, const PropNameID& name) override {
    std::string property = name.utf8(runtime);
    if (property == "runtime") {
      return makeString(runtime, "jsi");
    }
    if (property == "backend") {
      return makeString(runtime, "hermes");
    }
    if (property == "metadata") {
      return metadataObject(runtime);
    }
    if (property == "hasScheduler") {
      return bridge_->scheduler() != nullptr;
    }
    if (property == "interop") {
      return createInteropObject(runtime, bridge_);
    }
#ifdef NATIVESCRIPT_NATIVE_API_HAS_ENGINE_LAZY_GLOBALS
    if (property == "__defineLazyGlobal") {
      auto bridge = bridge_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "__defineLazyGlobal"), 3,
          [bridge](Runtime& runtime, const Value&, const Value* args,
                   size_t count) -> Value {
            std::string name = readStringArg(runtime, args, count, 0, "name");
            std::string kind = readStringArg(runtime, args, count, 1, "kind");
            bool force = count > 2 && args[2].isBool() && args[2].getBool();
            return InstallNativeApiEngineLazyGlobal(runtime, bridge, name, kind,
                                                    force);
          });
    }
#endif
    if (property == "__fastEnumeration") {
      auto bridge = bridge_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "__fastEnumeration"), 1,
          [bridge](Runtime& runtime, const Value&, const Value* args,
                   size_t count) -> Value {
            if (count < 1 || !args[0].isObject()) {
              throw facebook::jsi::JSError(
                  runtime, "Fast enumeration expects a native object.");
            }
            id object = NativeApiObjectHostObject::nativeObjectFromValue(runtime, args[0]);
            if (object == nil) {
              throw facebook::jsi::JSError(
                  runtime, "Fast enumeration expects a native object.");
            }
            if (![object conformsToProtocol:@protocol(NSFastEnumeration)]) {
              throw facebook::jsi::JSError(
                  runtime, "Object does not conform to NSFastEnumeration.");
            }
            return Object::createFromHostObject(
                runtime,
                std::make_shared<NativeApiFastEnumerationIteratorHostObject>(
                    bridge, static_cast<id<NSFastEnumeration>>(object)));
          });
    }
    if (property == "runOnUI") {
      auto bridge = bridge_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "runOnUI"), 1,
          [bridge](Runtime& runtime, const Value&, const Value* args,
                   size_t count) -> Value {
            auto scheduler = bridge->scheduler();
            if (scheduler == nullptr) {
              throw facebook::jsi::JSError(
                  runtime,
                  "NativeApiJsi was installed without a UI scheduler.");
            }

            std::shared_ptr<Function> callback;
            if (count > 0 && !args[0].isNull() && !args[0].isUndefined()) {
              if (!args[0].isObject()) {
                throw facebook::jsi::JSError(
                    runtime, "runOnUI expects a function callback.");
              }

              Object callbackObject = args[0].asObject(runtime);
              if (!callbackObject.isFunction(runtime)) {
                throw facebook::jsi::JSError(
                    runtime, "runOnUI expects a function callback.");
              }
              callback = std::make_shared<Function>(
                  callbackObject.asFunction(runtime));
            }

            Runtime* runtimePtr = &runtime;
            auto promiseCtor =
                runtime.global().getPropertyAsFunction(runtime, "Promise");
            return promiseCtor.callAsConstructor(
                runtime,
                Function::createFromHostFunction(
                    runtime, PropNameID::forAscii(runtime, "runOnUIPromise"),
                    2,
                    [scheduler, runtimePtr, callback](
                        Runtime& promiseRuntime, const Value&,
                        const Value* promiseArgs,
                        size_t promiseArgc) -> Value {
                      if (promiseArgc < 2 || !promiseArgs[0].isObject() ||
                          !promiseArgs[1].isObject()) {
                        return Value::undefined();
                      }

                      auto resolve = std::make_shared<Function>(
                          promiseArgs[0].asObject(promiseRuntime)
                              .asFunction(promiseRuntime));
                      auto reject = std::make_shared<Function>(
                          promiseArgs[1].asObject(promiseRuntime)
                              .asFunction(promiseRuntime));
                      if (callback == nullptr) {
                        scheduler->invokeOnUI([scheduler, runtimePtr, resolve]() {
                          scheduler->invokeOnJS([runtimePtr, resolve]() {
                            resolve->call(*runtimePtr);
                          });
                        });
                        return Value::undefined();
                      }

                      scheduler->invokeOnJS([runtimePtr, callback, resolve, reject]() {
                        try {
                          {
                            ScopedNativeApiUINativeCallDispatch uiDispatch;
                            callback->call(*runtimePtr);
                          }
                          resolve->call(*runtimePtr);
                        } catch (const std::exception& error) {
                          reject->call(
                              *runtimePtr,
                              String::createFromUtf8(*runtimePtr, error.what()));
                        }
                      });

                      return Value::undefined();
                    }));
          });
    }
    if (property == "import") {
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "import"), 1,
          [](Runtime& runtime, const Value&, const Value* args,
             size_t count) -> Value {
            std::string path = readStringArg(runtime, args, count, 0, "path");
            std::string frameworkPath = path;
            if (!frameworkPath.empty() && frameworkPath[0] != '/') {
              frameworkPath = "/System/Library/Frameworks/" + frameworkPath +
                              ".framework";
            }

            NSBundle* bundle = [NSBundle
                bundleWithPath:[NSString stringWithUTF8String:frameworkPath.c_str()]];
            if (bundle == nil || ![bundle load]) {
              throw facebook::jsi::JSError(
                  runtime, "Could not load bundle: " + frameworkPath);
            }
            return true;
          });
    }
    if (property == "lookup") {
      auto bridge = bridge_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "lookup"), 1,
          [bridge](Runtime& runtime, const Value&, const Value* args,
                   size_t count) -> Value {
            std::string symbolName =
                readStringArg(runtime, args, count, 0, "name");
            const NativeApiSymbol* symbol = bridge->find(symbolName);
            if (symbol == nullptr) {
              return Value::null();
            }
            return symbolToObject(runtime, *symbol);
          });
    }
    if (property == "getClass") {
      auto bridge = bridge_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "getClass"), 1,
          [bridge](Runtime& runtime, const Value&, const Value* args,
                   size_t count) -> Value {
            std::string className =
                readStringArg(runtime, args, count, 0, "name");
            const NativeApiSymbol* symbol = bridge->findClass(className);
            if (symbol == nullptr) {
              Class cls = objc_lookUpClass(className.c_str());
              if (cls == nil) {
                return Value::null();
              }
              NativeApiSymbol runtimeSymbol{
                  .kind = NativeApiSymbolKind::Class,
                  .offset = MD_SECTION_OFFSET_NULL,
                  .name = className,
                  .runtimeName = className,
              };
              return makeNativeClassValue(runtime, bridge,
                                          std::move(runtimeSymbol));
            }

            return makeNativeClassValue(runtime, bridge, *symbol);
          });
    }
    if (property == "__extendClass") {
      auto bridge = bridge_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "__extendClass"), 2,
          [bridge](Runtime& runtime, const Value&, const Value* args,
                   size_t count) -> Value {
            return extendNativeApiJsiClass(runtime, bridge, args, count);
          });
    }
    if (property == "__invokeBase") {
      auto bridge = bridge_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "__invokeBase"), 3,
          [bridge](Runtime& runtime, const Value&, const Value* args,
                   size_t count) -> Value {
            return invokeNativeApiJsiBaseMethod(runtime, bridge, args, count);
          });
    }
    if (property == "__rememberClassWrapper") {
      auto bridge = bridge_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "__rememberClassWrapper"), 3,
          [bridge](Runtime& runtime, const Value&, const Value* args,
                   size_t count) -> Value {
            if (count < 2) {
              return Value::undefined();
            }
            Class cls = classFromJsiValue(runtime, args[0]);
            if (cls == Nil) {
              return Value::undefined();
            }
            bridge->rememberClassValue(runtime, cls, args[1]);
            if (count >= 3 && args[2].isObject()) {
              bridge->rememberClassPrototype(runtime, cls, args[2]);
            }
            return Value::undefined();
          });
    }
    if (property == "__rememberObjectClassWrapper") {
      auto bridge = bridge_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "__rememberObjectClassWrapper"),
          2,
          [bridge](Runtime& runtime, const Value&, const Value* args,
                   size_t count) -> Value {
            if (count < 2) {
              return Value::undefined();
            }
            id object = NativeApiObjectHostObject::nativeObjectFromValue(
                runtime, args[0]);
            if (object == nil) {
              return Value::undefined();
            }
            bridge->setObjectExpando(runtime, object,
                                     "__nativeApiClassWrapper", args[1]);
            return Value::undefined();
          });
    }
    if (property == "CC_SHA256") {
      auto bridge = bridge_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "CC_SHA256"), 3,
          [bridge](Runtime& runtime, const Value&, const Value* args,
                   size_t count) -> Value {
            if (count < 3 || !args[1].isNumber()) {
              throw facebook::jsi::JSError(
                  runtime, "CC_SHA256 expects data, length, and output.");
            }
            void* commonCrypto =
                dlopen("/usr/lib/system/libcommonCrypto.dylib",
                       RTLD_NOW | RTLD_LOCAL);
            void* symbol = commonCrypto != nullptr
                               ? dlsym(commonCrypto, "CC_SHA256")
                               : nullptr;
            if (symbol == nullptr && commonCrypto != nullptr) {
              symbol = dlsym(commonCrypto, "_CC_SHA256");
            }
            if (symbol == nullptr) {
              throw facebook::jsi::JSError(runtime,
                                           "CC_SHA256 is not available.");
            }
            NativeApiJsiArgumentFrame frame(3);
            void* data = pointerFromJsiValue(runtime, args[0], frame);
            void* output = pointerFromJsiValue(runtime, args[2], frame);
            using CC_SHA256_Fn = unsigned char* (*)(const void*, unsigned long,
                                                    unsigned char*);
            auto fn = reinterpret_cast<CC_SHA256_Fn>(symbol);
            unsigned char* result =
                fn(data, static_cast<unsigned long>(args[1].getNumber()),
                   static_cast<unsigned char*>(output));
            return createPointer(runtime, bridge, result);
          });
    }
    if (property == "getFunction") {
      auto bridge = bridge_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "getFunction"), 1,
          [bridge](Runtime& runtime, const Value&, const Value* args,
                   size_t count) -> Value {
            std::string functionName =
                readStringArg(runtime, args, count, 0, "name");
            const NativeApiSymbol* symbol = bridge->findFunction(functionName);
            if (symbol == nullptr) {
              return Value::null();
            }
            auto function = Function::createFromHostFunction(
                runtime, PropNameID::forAscii(runtime, symbol->name), 0,
                [bridge, symbol = *symbol](Runtime& runtime, const Value&,
                                           const Value* args,
                                           size_t count) -> Value {
                  return callCFunction(runtime, bridge, symbol, args, count);
            });
            function.setProperty(runtime, "kind", makeString(runtime, "function"));
            function.setProperty(runtime, "nativeName",
                                 makeString(runtime, symbol->name));
            function.setProperty(runtime, "metadataOffset",
                                 static_cast<double>(symbol->offset));
            function.setProperty(runtime, "sizeof",
                                 static_cast<double>(sizeof(void*)));
            return function;
          });
    }
    if (property == "getConstant") {
      auto bridge = bridge_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "getConstant"), 1,
          [bridge](Runtime& runtime, const Value&, const Value* args,
                   size_t count) -> Value {
            std::string constantName =
                readStringArg(runtime, args, count, 0, "name");
            const NativeApiSymbol* symbol = bridge->findConstant(constantName);
            if (symbol == nullptr) {
              return Value::undefined();
            }
            return constantToValue(runtime, bridge, *symbol);
          });
    }
    if (property == "getEnum") {
      auto bridge = bridge_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "getEnum"), 1,
          [bridge](Runtime& runtime, const Value&, const Value* args,
                   size_t count) -> Value {
            std::string enumName = readStringArg(runtime, args, count, 0, "name");
            const NativeApiSymbol* symbol = bridge->findEnum(enumName);
            if (symbol == nullptr) {
              return Value::undefined();
            }
            return enumToObject(runtime, bridge->metadata(), *symbol);
          });
    }
    if (property == "getProtocol") {
      auto bridge = bridge_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "getProtocol"), 1,
          [bridge](Runtime& runtime, const Value&, const Value* args,
                   size_t count) -> Value {
            std::string protocolName =
                readStringArg(runtime, args, count, 0, "name");
            const NativeApiSymbol* symbol = bridge->findProtocol(protocolName);
            if (symbol == nullptr) {
              Protocol* protocol = lookupProtocolByNativeName(protocolName);
              if (protocol == nullptr) {
                return Value::null();
              }
              const char* runtimeName = protocol_getName(protocol);
              NativeApiSymbol runtimeSymbol{
                  .kind = NativeApiSymbolKind::Protocol,
                  .offset = MD_SECTION_OFFSET_NULL,
                  .name = protocolName,
                  .runtimeName = runtimeName != nullptr ? runtimeName : protocolName,
              };
              return makeNativeProtocolValue(runtime, bridge,
                                             std::move(runtimeSymbol));
            }
            return makeNativeProtocolValue(runtime, bridge, *symbol);
          });
    }
    if (property == "getStruct" || property == "getUnion") {
      auto bridge = bridge_;
      bool isUnion = property == "getUnion";
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, property.c_str()), 1,
          [bridge, isUnion](Runtime& runtime, const Value&, const Value* args,
                            size_t count) -> Value {
            std::string aggregateName =
                readStringArg(runtime, args, count, 0, "name");
            const NativeApiSymbol* symbol =
                isUnion ? bridge->findUnion(aggregateName)
                        : bridge->findStruct(aggregateName);
            if (symbol == nullptr) {
              return Value::undefined();
            }
            return makeAggregateConstructor(runtime, bridge, *symbol);
          });
    }

    if (const NativeApiSymbol* classSymbol = bridge_->findClass(property)) {
      return makeNativeClassValue(runtime, bridge_, *classSymbol);
    }

    if (const NativeApiSymbol* functionSymbol = bridge_->findFunction(property)) {
      auto bridge = bridge_;
      Function function = Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, property.c_str()), 0,
          [bridge, symbol = *functionSymbol](Runtime& runtime, const Value&,
                                             const Value* args,
                                             size_t count) -> Value {
            return callCFunction(runtime, bridge, symbol, args, count);
          });
      function.setProperty(runtime, "kind", makeString(runtime, "function"));
      function.setProperty(runtime, "nativeName",
                           makeString(runtime, functionSymbol->name));
      function.setProperty(runtime, "metadataOffset",
                           static_cast<double>(functionSymbol->offset));
      function.setProperty(runtime, "sizeof",
                           static_cast<double>(sizeof(void*)));
      return function;
    }

    if (const NativeApiSymbol* constantSymbol = bridge_->findConstant(property)) {
      return constantToValue(runtime, bridge_, *constantSymbol);
    }

    if (const NativeApiSymbol* enumSymbol = bridge_->findEnum(property)) {
      return enumToObject(runtime, bridge_->metadata(), *enumSymbol);
    }

    if (const NativeApiSymbol* protocolSymbol =
            bridge_->findProtocol(property)) {
      return makeNativeProtocolValue(runtime, bridge_, *protocolSymbol);
    }

    if (const NativeApiSymbol* aggregateSymbol =
            bridge_->findAggregate(property)) {
      return makeAggregateConstructor(runtime, bridge_, *aggregateSymbol);
    }

    return Value::undefined();
  }

  std::vector<PropNameID> getPropertyNames(Runtime& runtime) override {
    std::vector<PropNameID> names;
    names.reserve(11);
    addPropertyName(runtime, names, "runtime");
    addPropertyName(runtime, names, "backend");
    addPropertyName(runtime, names, "metadata");
    addPropertyName(runtime, names, "hasScheduler");
    addPropertyName(runtime, names, "interop");
#ifdef NATIVESCRIPT_NATIVE_API_HAS_ENGINE_LAZY_GLOBALS
    addPropertyName(runtime, names, "__defineLazyGlobal");
#endif
    addPropertyName(runtime, names, "runOnUI");
    addPropertyName(runtime, names, "import");
    addPropertyName(runtime, names, "lookup");
    addPropertyName(runtime, names, "getClass");
    addPropertyName(runtime, names, "__extendClass");
    addPropertyName(runtime, names, "__invokeBase");
    addPropertyName(runtime, names, "__rememberClassWrapper");
    addPropertyName(runtime, names, "__rememberObjectClassWrapper");
    addPropertyName(runtime, names, "getFunction");
    addPropertyName(runtime, names, "getConstant");
    addPropertyName(runtime, names, "getEnum");
    addPropertyName(runtime, names, "getProtocol");
    addPropertyName(runtime, names, "getStruct");
    addPropertyName(runtime, names, "getUnion");
    return names;
  }

 private:
  Object metadataObject(Runtime& runtime) const {
    Object metadata(runtime);
    metadata.setProperty(runtime, "classes",
                         static_cast<double>(bridge_->classCount()));
    metadata.setProperty(runtime, "functions",
                         static_cast<double>(bridge_->functionCount()));
    metadata.setProperty(runtime, "constants",
                         static_cast<double>(bridge_->constantCount()));
    metadata.setProperty(runtime, "protocols",
                         static_cast<double>(bridge_->protocolCount()));
    metadata.setProperty(runtime, "enums",
                         static_cast<double>(bridge_->enumCount()));
    metadata.setProperty(runtime, "structs",
                         static_cast<double>(bridge_->structCount()));
    metadata.setProperty(runtime, "unions",
                         static_cast<double>(bridge_->unionCount()));

    metadata.setProperty(
        runtime, "classNames",
        Function::createFromHostFunction(
            runtime, PropNameID::forAscii(runtime, "classNames"), 0,
            [bridge = bridge_](Runtime& runtime, const Value&, const Value*,
                               size_t) -> Value {
              return namesToArray(runtime, bridge->classNames());
            }));
    metadata.setProperty(
        runtime, "functionNames",
        Function::createFromHostFunction(
            runtime, PropNameID::forAscii(runtime, "functionNames"), 0,
            [bridge = bridge_](Runtime& runtime, const Value&, const Value*,
                               size_t) -> Value {
              return namesToArray(runtime, bridge->functionNames());
            }));
    metadata.setProperty(
        runtime, "constantNames",
        Function::createFromHostFunction(
            runtime, PropNameID::forAscii(runtime, "constantNames"), 0,
            [bridge = bridge_](Runtime& runtime, const Value&, const Value*,
                               size_t) -> Value {
              return namesToArray(runtime, bridge->constantNames());
            }));
    metadata.setProperty(
        runtime, "protocolNames",
        Function::createFromHostFunction(
            runtime, PropNameID::forAscii(runtime, "protocolNames"), 0,
            [bridge = bridge_](Runtime& runtime, const Value&, const Value*,
                               size_t) -> Value {
              return namesToArray(runtime, bridge->protocolNames());
            }));
    metadata.setProperty(
        runtime, "enumNames",
        Function::createFromHostFunction(
            runtime, PropNameID::forAscii(runtime, "enumNames"), 0,
            [bridge = bridge_](Runtime& runtime, const Value&, const Value*,
                               size_t) -> Value {
              return namesToArray(runtime, bridge->enumNames());
            }));
    metadata.setProperty(
        runtime, "structNames",
        Function::createFromHostFunction(
            runtime, PropNameID::forAscii(runtime, "structNames"), 0,
            [bridge = bridge_](Runtime& runtime, const Value&, const Value*,
                               size_t) -> Value {
              return namesToArray(runtime, bridge->structNames());
            }));
    metadata.setProperty(
        runtime, "unionNames",
        Function::createFromHostFunction(
            runtime, PropNameID::forAscii(runtime, "unionNames"), 0,
            [bridge = bridge_](Runtime& runtime, const Value&, const Value*,
                               size_t) -> Value {
              return namesToArray(runtime, bridge->unionNames());
            }));
    return metadata;
  }

  std::shared_ptr<NativeApiJsiBridge> bridge_;
};

class NativeApiPointerHostObject final
    : public HostObject,
      public std::enable_shared_from_this<NativeApiPointerHostObject> {
 public:
  NativeApiPointerHostObject(std::shared_ptr<NativeApiDirectBridge> bridge,
                             void* pointer, std::string kind = "pointer",
                             bool adopted = false)
      : bridge_(std::move(bridge)),
        pointer_(pointer),
        kind_(std::move(kind)),
        adopted_(adopted) {}

  ~NativeApiPointerHostObject() override {
    if (adopted_ && pointer_ != nullptr) {
      if (bridge_ != nullptr) {
        bridge_->forgetPointerValue(pointer_);
      }
      free(pointer_);
      pointer_ = nullptr;
    }
  }

  void* pointer() const { return pointer_; }
  bool adopted() const { return adopted_; }
  void adopt() { adopted_ = true; }
  void clearWithoutFree() {
    if (bridge_ != nullptr) {
      bridge_->forgetPointerValue(pointer_);
    }
    pointer_ = nullptr;
    adopted_ = false;
  }

  Value get(Runtime& runtime, const PropNameID& name) override {
    std::string property = name.utf8(runtime);
    if (property == "kind") {
      return makeString(runtime, kind_);
    }
    if (property == "address") {
      return static_cast<double>(reinterpret_cast<uintptr_t>(pointer_));
    }
    if (property == "adopted") {
      return adopted_;
    }
    if (property == "takeRetainedValue" || property == "takeUnretainedValue") {
      bool retained = property == "takeRetainedValue";
      std::weak_ptr<NativeApiPointerHostObject> weakSelf = shared_from_this();
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, property.c_str()), 0,
          [weakSelf, retained](Runtime& runtime, const Value&, const Value*,
                               size_t) -> Value {
            auto self = weakSelf.lock();
            if (!self || self->pointer_ == nullptr || self->consumed_) {
              throw JSError(runtime, "Unmanaged value has already been consumed.");
            }
            id object = static_cast<id>(self->pointer_);
            self->consumed_ = true;
            self->pointer_ = nullptr;
            self->adopted_ = false;
            return makeNativeObjectValue(runtime, self->bridge_, object, retained);
          });
    }
    if (property == "add" || property == "subtract") {
      void* pointer = pointer_;
      bool add = property == "add";
      auto bridge = bridge_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, property.c_str()), 1,
          [bridge, pointer, add](Runtime& runtime, const Value&,
                                 const Value* args, size_t count) -> Value {
            if (count < 1 || !args[0].isNumber()) {
              throw JSError(runtime, "Pointer offset must be a number.");
            }
            intptr_t offset = static_cast<intptr_t>(args[0].getNumber());
            intptr_t base = reinterpret_cast<intptr_t>(pointer);
            void* result = reinterpret_cast<void*>(add ? base + offset : base - offset);
            return createPointer(runtime, bridge, result);
          });
    }
    if (property == "toNumber") {
      void* pointer = pointer_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "toNumber"), 0,
          [pointer](Runtime&, const Value&, const Value*, size_t) -> Value {
            return static_cast<double>(reinterpret_cast<uintptr_t>(pointer));
          });
    }
    if (property == "toBigInt") {
      void* pointer = pointer_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "toBigInt"), 0,
          [pointer](Runtime& runtime, const Value&, const Value*, size_t) -> Value {
            return BigInt::fromUint64(
                runtime,
                static_cast<uint64_t>(reinterpret_cast<uintptr_t>(pointer)));
          });
    }
    if (property == "toHexString" || property == "toDecimalString") {
      void* pointer = pointer_;
      bool hex = property == "toHexString";
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, property.c_str()), 0,
          [pointer, hex](Runtime& runtime, const Value&, const Value*, size_t) -> Value {
            if (hex) {
              char text[2 + sizeof(uintptr_t) * 2 + 1] = {};
              snprintf(text, sizeof(text), "0x%llx",
                       static_cast<unsigned long long>(
                           reinterpret_cast<uintptr_t>(pointer)));
              return makeString(runtime, text);
            } else {
              char text[32] = {};
              snprintf(text, sizeof(text), "%lld",
                       static_cast<long long>(reinterpret_cast<intptr_t>(pointer)));
              return makeString(runtime, text);
            }
          });
    }
    if (property == "toString") {
      void* pointer = pointer_;
      std::string kind = kind_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "toString"), 0,
          [pointer, kind](Runtime& runtime, const Value&, const Value*,
                          size_t) -> Value {
            char address[32] = {};
            snprintf(address, sizeof(address), "%p", pointer);
            if (kind == "pointer") {
              return makeString(runtime,
                                "<Pointer: " + std::string(address) + ">");
            }
            return makeString(runtime, "[NativeApiDirect " + kind + " " +
                                           std::string(address) + "]");
          });
    }
    return Value::undefined();
  }

  std::vector<PropNameID> getPropertyNames(Runtime& runtime) override {
    std::vector<PropNameID> names;
    names.reserve(3);
    addPropertyName(runtime, names, "kind");
    addPropertyName(runtime, names, "address");
    addPropertyName(runtime, names, "adopted");
    addPropertyName(runtime, names, "takeRetainedValue");
    addPropertyName(runtime, names, "takeUnretainedValue");
    addPropertyName(runtime, names, "add");
    addPropertyName(runtime, names, "subtract");
    addPropertyName(runtime, names, "toNumber");
    addPropertyName(runtime, names, "toBigInt");
    addPropertyName(runtime, names, "toHexString");
    addPropertyName(runtime, names, "toDecimalString");
    addPropertyName(runtime, names, "toString");
    return names;
  }

 private:
  std::shared_ptr<NativeApiDirectBridge> bridge_;
  void* pointer_ = nullptr;
  std::string kind_;
  bool adopted_ = false;
  bool consumed_ = false;
};

class NativeApiReferenceHostObject final : public HostObject {
 public:
  NativeApiReferenceHostObject(std::shared_ptr<NativeApiDirectBridge> bridge,
                               NativeApiDirectType type, void* data, bool ownsData,
                               size_t byteLength = 0,
                               std::shared_ptr<Value> pendingValue = nullptr,
                               std::shared_ptr<Value> backingValue = nullptr)
      : bridge_(std::move(bridge)),
        type_(std::move(type)),
        data_(data),
        ownsData_(ownsData),
        byteLength_(byteLength),
        pendingValue_(std::move(pendingValue)),
        backingValue_(std::move(backingValue)) {}

  ~NativeApiReferenceHostObject() override {
    if (ownsData_ && data_ != nullptr) {
      free(data_);
      data_ = nullptr;
    }
  }

  void* data() const { return data_; }
  const NativeApiDirectType& type() const { return type_; }
  void ensureStorage(Runtime& runtime, NativeApiDirectType type,
                     NativeApiDirectArgumentFrame& frame, size_t elements = 1);

  Value get(Runtime& runtime, const PropNameID& name) override;
  void set(Runtime& runtime, const PropNameID& name, const Value& value) override;
  std::vector<PropNameID> getPropertyNames(Runtime& runtime) override {
    std::vector<PropNameID> names;
    addPropertyName(runtime, names, "kind");
    addPropertyName(runtime, names, "value");
    addPropertyName(runtime, names, "address");
    addPropertyName(runtime, names, "toString");
    return names;
  }

 private:
  std::shared_ptr<NativeApiDirectBridge> bridge_;
  NativeApiDirectType type_;
  void* data_ = nullptr;
  bool ownsData_ = false;
  size_t byteLength_ = 0;
  std::shared_ptr<Value> pendingValue_;
  std::shared_ptr<Value> backingValue_;
};

class NativeApiStructObjectHostObject final : public HostObject {
 public:
  NativeApiStructObjectHostObject(
      std::shared_ptr<NativeApiDirectBridge> bridge,
      std::shared_ptr<NativeApiDirectAggregateInfo> info,
      const void* data = nullptr, bool ownsData = true,
      std::shared_ptr<std::vector<unsigned char>> storageOwner = nullptr,
      std::shared_ptr<Value> backingValue = nullptr)
      : bridge_(std::move(bridge)),
        info_(std::move(info)),
        ownedData_(std::move(storageOwner)),
        backingValue_(std::move(backingValue)),
        ownsData_(ownsData) {
    size_t size = info_ != nullptr ? info_->size : 0;
    if (ownedData_ != nullptr) {
      data_ = const_cast<void*>(data);
      ownsData_ = false;
    } else if (ownsData_) {
      ownedData_ = std::make_shared<std::vector<unsigned char>>(size, 0);
      if (data != nullptr && size > 0) {
        std::memcpy(ownedData_->data(), data, size);
      }
      data_ = ownedData_->empty() ? nullptr : ownedData_->data();
    } else {
      data_ = const_cast<void*>(data);
    }
  }

  void* data() const { return data_; }
  std::shared_ptr<NativeApiDirectAggregateInfo> info() const { return info_; }
  std::shared_ptr<std::vector<unsigned char>> storageOwner() const {
    return ownedData_;
  }
  std::shared_ptr<Value> backingValue() const { return backingValue_; }

  Value get(Runtime& runtime, const PropNameID& name) override;
  void set(Runtime& runtime, const PropNameID& name, const Value& value) override;
  std::vector<PropNameID> getPropertyNames(Runtime& runtime) override;

 private:
  std::shared_ptr<NativeApiDirectBridge> bridge_;
  std::shared_ptr<NativeApiDirectAggregateInfo> info_;
  std::shared_ptr<std::vector<unsigned char>> ownedData_;
  std::shared_ptr<Value> backingValue_;
  void* data_ = nullptr;
  bool ownsData_ = true;
};

class NativeApiFastEnumerationIteratorHostObject final : public HostObject {
 public:
  NativeApiFastEnumerationIteratorHostObject(
      std::shared_ptr<NativeApiDirectBridge> bridge, id<NSFastEnumeration> collection)
      : bridge_(std::move(bridge)), collection_(collection) {
    [(id)collection_ retain];
  }

  ~NativeApiFastEnumerationIteratorHostObject() override {
    [(id)collection_ release];
    collection_ = nil;
  }

  Value get(Runtime& runtime, const PropNameID& name) override {
    std::string property = name.utf8(runtime);
    if (property == "next") {
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "next"), 0,
          [this](Runtime& runtime, const Value&, const Value*, size_t) -> Value {
            return next(runtime);
          });
    }
    return Value::undefined();
  }

  std::vector<PropNameID> getPropertyNames(Runtime& runtime) override {
    std::vector<PropNameID> names;
    addPropertyName(runtime, names, "next");
    return names;
  }

 private:
  Value next(Runtime& runtime) {
    Object result(runtime);
    if (done_ || collection_ == nil) {
      result.setProperty(runtime, "done", true);
      return result;
    }

    if (stackIndex_ >= stackLength_) {
      stackLength_ = [collection_ countByEnumeratingWithState:&state_
                                                      objects:stack_
                                                        count:16];
      stackIndex_ = 0;
      if (stackLength_ == 0) {
        done_ = true;
        result.setProperty(runtime, "done", true);
        return result;
      }
    }

    id value = state_.itemsPtr[stackIndex_++];
    NativeApiDirectType valueType = nativeObjectReturnTypeForClass(object_getClass(value));
    result.setProperty(runtime, "value",
                       convertNativeReturnValue(runtime, bridge_, valueType, &value));
    result.setProperty(runtime, "done", false);
    return result;
  }

  std::shared_ptr<NativeApiDirectBridge> bridge_;
  id<NSFastEnumeration> collection_ = nil;
  NSFastEnumerationState state_ = {};
  id __unsafe_unretained stack_[16] = {};
  NSUInteger stackLength_ = 0;
  NSUInteger stackIndex_ = 0;
  bool done_ = false;
};

NativeApiSymbol nativeApiSymbolForRuntimeClass(
    const std::shared_ptr<NativeApiDirectBridge>& bridge, Class cls) {
  const char* name = cls != Nil ? class_getName(cls) : "";
  if (bridge != nullptr) {
    if (const NativeApiSymbol* symbol = bridge->findClassForRuntimePointer(cls)) {
      return *symbol;
    }
    if (const NativeApiSymbol* symbol = bridge->findClassForRuntimeClass(cls)) {
      return *symbol;
    }
    if (name != nullptr) {
      if (const NativeApiSymbol* symbol = bridge->findClass(name)) {
        return *symbol;
      }
    }
  }

  return NativeApiSymbol{
      .kind = NativeApiSymbolKind::Class,
      .offset = MD_SECTION_OFFSET_NULL,
      .name = name != nullptr ? name : "",
      .runtimeName = name != nullptr ? name : "",
  };
}

class NativeApiSuperHostObject final : public HostObject {
 public:
  NativeApiSuperHostObject(std::shared_ptr<NativeApiDirectBridge> bridge,
                           id receiver, Class dispatchClass)
      : bridge_(std::move(bridge)),
        receiver_(receiver),
        dispatchClass_(dispatchClass) {
    if (receiver_ != nil) {
      [receiver_ retain];
    }
  }

  ~NativeApiSuperHostObject() override {
    if (receiver_ != nil) {
      [receiver_ release];
      receiver_ = nil;
    }
  }

  Value get(Runtime& runtime, const PropNameID& name) override {
    std::string property = name.utf8(runtime);
    if (property == "kind") {
      return makeString(runtime, "super");
    }
    if (property == "toString") {
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "toString"), 0,
          [](Runtime& runtime, const Value&, const Value*, size_t) -> Value {
            return makeString(runtime, "[NativeApiDirectSuper]");
          });
    }
    if (receiver_ == nil || dispatchClass_ == Nil) {
      return Value::undefined();
    }

    if (const NativeApiSymbol* symbol =
            bridge_->findClassForRuntimeClass(dispatchClass_)) {
      const auto& members = bridge_->membersForClass(*symbol);
      if (const NativeApiMember* propertyMember =
              selectPropertyMember(members, property, false)) {
        SEL selector = sel_getUid(propertyMember->selectorName.c_str());
        if (class_getInstanceMethod(dispatchClass_, selector) != nullptr) {
          return callObjCSelector(runtime, bridge_, receiver_, false,
                                  propertyMember->selectorName, propertyMember,
                                  nullptr, 0, dispatchClass_);
        }
      }

      if (selectMethodMember(members, property, false, 0) != nullptr) {
        auto bridge = bridge_;
        id receiver = receiver_;
        Class dispatchClass = dispatchClass_;
        std::string memberName = property;
        return Function::createFromHostFunction(
            runtime, PropNameID::forAscii(runtime, property.c_str()), 0,
            [bridge, receiver, dispatchClass, memberName](
                Runtime& runtime, const Value&, const Value* args,
                size_t count) -> Value {
              const NativeApiSymbol* symbol =
                  bridge->findClassForRuntimeClass(dispatchClass);
              if (symbol == nullptr) {
                throw JSError(
                    runtime, "Objective-C metadata is not available for super.");
              }
              const NativeApiMember* selected = selectMethodMember(
                  bridge->membersForClass(*symbol), memberName, false, count);
              if (selected == nullptr) {
                throw JSError(
                    runtime, "Objective-C super selector is not available: " +
                                 memberName);
              }
              return callObjCSelector(runtime, bridge, receiver, false,
                                      selected->selectorName, selected, args,
                                      count, dispatchClass);
            });
      }
    }

    if (auto selectorName =
            runtimeSelectorNameForProperty(dispatchClass_, false, property)) {
      auto bridge = bridge_;
      id receiver = receiver_;
      Class dispatchClass = dispatchClass_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, property.c_str()), 0,
          [bridge, receiver, dispatchClass, selectorName = *selectorName](
              Runtime& runtime, const Value&, const Value* args,
              size_t count) -> Value {
            return callObjCSelector(runtime, bridge, receiver, false,
                                    selectorName, nullptr, args, count,
                                    dispatchClass);
          });
    }

    return Value::undefined();
  }

  void set(Runtime& runtime, const PropNameID& name, const Value& value) override {
    std::string property = name.utf8(runtime);
    if (receiver_ == nil || dispatchClass_ == Nil) {
      throw JSError(runtime, "Cannot set property on nil super.");
    }

    if (const NativeApiSymbol* symbol =
            bridge_->findClassForRuntimeClass(dispatchClass_)) {
      const auto& members = bridge_->membersForClass(*symbol);
      if (const NativeApiMember* propertyMember =
              selectWritablePropertyMember(members, property, false)) {
        if (propertyMember->readonly ||
            propertyMember->setterSelectorName.empty()) {
          throw JSError(
              runtime, "Attempted to assign to readonly property.");
        }
        NativeApiMember setterMember = *propertyMember;
        setterMember.selectorName = propertyMember->setterSelectorName;
        setterMember.signatureOffset = propertyMember->setterSignatureOffset;
        Value args[] = {Value(runtime, value)};
        callObjCSelector(runtime, bridge_, receiver_, false,
                         setterMember.selectorName, &setterMember, args, 1,
                         dispatchClass_);
        return;
      }
    }

    std::string setterSelectorName = setterSelectorForProperty(property);
    SEL selector = sel_getUid(setterSelectorName.c_str());
    if (class_getInstanceMethod(dispatchClass_, selector) != nullptr) {
      Value args[] = {Value(runtime, value)};
      callObjCSelector(runtime, bridge_, receiver_, false, setterSelectorName,
                       nullptr, args, 1, dispatchClass_);
      return;
    }

    throw JSError(runtime,
                                 "No writable native super property: " +
                                     property);
  }

  std::vector<PropNameID> getPropertyNames(Runtime& runtime) override {
    std::vector<PropNameID> names;
    addPropertyName(runtime, names, "kind");
    addPropertyName(runtime, names, "toString");
    return names;
  }

 private:
  std::shared_ptr<NativeApiDirectBridge> bridge_;
  id receiver_ = nil;
  Class dispatchClass_ = Nil;
};

class NativeApiObjectHostObject final
    : public HostObject,
      public std::enable_shared_from_this<NativeApiObjectHostObject> {
 public:
  NativeApiObjectHostObject(std::shared_ptr<NativeApiDirectBridge> bridge,
                            id object, bool ownsObject)
      : bridge_(std::move(bridge)), object_(object), ownsObject_(ownsObject) {
    if (object_ != nil && !ownsObject_) {
      [object_ retain];
      ownsObject_ = true;
    }
  }

  ~NativeApiObjectHostObject() override {
    if (ownsObject_ && object_ != nil) {
      [object_ release];
      object_ = nil;
    }
  }

  id object() const { return object_; }

  void disownObject(id expected) {
    if (object_ == expected) {
      ownsObject_ = false;
      object_ = nil;
    }
  }

  static bool isInitializerSelector(const std::string& selectorName) {
    return selectorName.rfind("init", 0) == 0;
  }

  static id nativeObjectFromValue(Runtime& runtime, const Value& value) {
    if (!value.isObject()) {
      return nil;
    }
    Object object = value.asObject(runtime);
    if (!object.isHostObject<NativeApiObjectHostObject>(runtime)) {
      return nil;
    }
    return object.getHostObject<NativeApiObjectHostObject>(runtime)->object();
  }

  Value callObjectSelector(Runtime& runtime, const std::string& selectorName,
                           const NativeApiMember* member, const Value* args,
                           size_t count, Class dispatchSuperClass = Nil) {
    id receiver = object_;
    if (receiver == nil) {
      throw JSError(runtime,
                                   "Cannot send Objective-C selector to nil.");
    }

    const bool initializer = isInitializerSelector(selectorName);
    std::optional<Object> classWrapper;
    if (initializer) {
      Value classWrapperValue = bridge_->findObjectExpando(
          runtime, receiver, "__nativeApiClassWrapper");
      if (classWrapperValue.isObject()) {
        classWrapper.emplace(classWrapperValue.asObject(runtime));
      }
      bridge_->forgetRoundTripValue(receiver);
      bridge_->forgetObjectExpandos(receiver);
    }

    Value result =
        callObjCSelector(runtime, bridge_, receiver, false, selectorName, member,
                         args, count, dispatchSuperClass);
    if (initializer) {
      if (nativeObjectFromValue(runtime, result) != receiver) {
        disownObject(receiver);
      } else if (classWrapper) {
        bridge_->setObjectExpando(runtime, receiver, "__nativeApiClassWrapper",
                                  Value(runtime, *classWrapper));
      }
    }
    return result;
  }

  Value get(Runtime& runtime, const PropNameID& name) override {
    std::string property = name.utf8(runtime);
    if (property == "kind") {
      return makeString(runtime, "object");
    }
    if (property == "className") {
      return makeString(runtime, object_ != nil ? object_getClassName(object_) : "");
    }
    if (property == "nativeAddress") {
      char address[32] = {};
      snprintf(address, sizeof(address), "%p", object_);
      return makeString(runtime, address);
    }
    if (property == "class") {
      auto bridge = bridge_;
      id object = object_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "class"), 0,
          [bridge, object](Runtime& runtime, const Value&, const Value*,
                           size_t) -> Value {
            if (object == nil) {
              return Value::undefined();
            }
            Value classWrapper = bridge->findObjectExpando(
                runtime, object, "__nativeApiClassWrapper");
            if (classWrapper.isObject()) {
              return classWrapper;
            }
            NativeApiSymbol symbol =
                nativeApiSymbolForRuntimeClass(bridge, object_getClass(object));
            return makeNativeClassValue(runtime, bridge, std::move(symbol));
          });
    }
    if (property == "constructor") {
      if (object_ == nil) {
        return Value::undefined();
      }
      Value classWrapper = bridge_->findObjectExpando(
          runtime, object_, "__nativeApiClassWrapper");
      if (classWrapper.isObject()) {
        return classWrapper;
      }
      NativeApiSymbol symbol =
          nativeApiSymbolForRuntimeClass(bridge_, object_getClass(object_));
      return makeNativeClassValue(runtime, bridge_, std::move(symbol));
    }
    if (property == "superclass") {
      if (object_ == nil) {
        return Value::undefined();
      }
      Class superclass = class_getSuperclass(object_getClass(object_));
      if (superclass == Nil) {
        return Value::null();
      }
      NativeApiSymbol symbol = nativeApiSymbolForRuntimeClass(bridge_, superclass);
      return makeNativeClassValue(runtime, bridge_, std::move(symbol));
    }
    if (property == "super") {
      Class dispatchClass =
          object_ != nil ? class_getSuperclass(object_getClass(object_)) : Nil;
      return Object::createFromHostObject(
          runtime,
          std::make_shared<NativeApiSuperHostObject>(bridge_, object_,
                                                     dispatchClass));
    }
    if (property == "invoke" || property == "send") {
      auto bridge = bridge_;
      id object = object_;
      std::weak_ptr<NativeApiObjectHostObject> weakSelf = shared_from_this();
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, property.c_str()), 1,
          [bridge, object, weakSelf](Runtime& runtime, const Value&,
                                     const Value* args,
                                     size_t count) -> Value {
            std::string selectorName =
                readStringArg(runtime, args, count, 0, "selector");
            if (auto self = weakSelf.lock()) {
              return self->callObjectSelector(runtime, selectorName, nullptr,
                                              args + 1, count - 1);
            }
              return callObjCSelector(runtime, bridge, object, false, selectorName,
                                    nullptr, args + 1, count - 1);
          });
    }
    if (property == "takeRetainedValue" || property == "takeUnretainedValue") {
      bool retained = property == "takeRetainedValue";
      std::weak_ptr<NativeApiObjectHostObject> weakSelf = shared_from_this();
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, property.c_str()), 0,
          [weakSelf, retained](Runtime& runtime, const Value&, const Value*,
                               size_t) -> Value {
            auto self = weakSelf.lock();
            if (!self || self->object_ == nil || self->consumed_) {
              throw JSError(runtime, "Unmanaged value has already been consumed.");
            }

            id object = self->object_;
            if (self->bridge_ != nullptr) {
              self->bridge_->forgetRoundTripValue(object);
            }
            if (self->ownsObject_) {
              [object release];
            }
            self->object_ = nil;
            self->ownsObject_ = false;
            self->consumed_ = true;
            return makeNativeObjectValue(runtime, self->bridge_, object, retained);
          });
    }
    if (property == "toString") {
      id object = object_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "toString"), 0,
          [object](Runtime& runtime, const Value&, const Value*, size_t) -> Value {
            NSString* description =
                object != nil ? [object description] : @"<nil>";
            return makeString(runtime, description.UTF8String ?: "");
              });
    }
    if (property == "URL" && object_ != nil &&
        [object_ respondsToSelector:@selector(URL)]) {
      return callObjectSelector(runtime, "URL", nullptr, nullptr, 0);
    }
    if (property == "Symbol.iterator" ||
        property == "Symbol(Symbol.iterator)" ||
        property == "@@iterator") {
      auto bridge = bridge_;
      id object = object_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "Symbol.iterator"), 0,
          [bridge, object](Runtime& runtime, const Value&, const Value*,
                           size_t) -> Value {
            if (object == nil ||
                ![object conformsToProtocol:@protocol(NSFastEnumeration)]) {
              throw JSError(
                  runtime, "Object does not conform to NSFastEnumeration.");
            }
            return Object::createFromHostObject(
                runtime,
                std::make_shared<NativeApiFastEnumerationIteratorHostObject>(
                    bridge, static_cast<id<NSFastEnumeration>>(object)));
          });
    }

#if TARGET_OS_OSX
    if (property == "initWithRedGreenBlueAlpha") {
      Class nsColorClass = NSClassFromString(@"NSColor");
      if (object_ != nil && nsColorClass != Nil &&
          [object_ isKindOfClass:nsColorClass]) {
        auto bridge = bridge_;
        return Function::createFromHostFunction(
            runtime, PropNameID::forAscii(runtime, property.c_str()), 4,
            [bridge, nsColorClass](Runtime& runtime, const Value&,
                                   const Value* args, size_t count) -> Value {
              const char* selectors[] = {
                  "colorWithSRGBRed:green:blue:alpha:",
                  "colorWithCalibratedRed:green:blue:alpha:",
                  "colorWithDeviceRed:green:blue:alpha:",
              };
              for (const char* selectorName : selectors) {
                if (class_getClassMethod(nsColorClass,
                                         sel_getUid(selectorName)) != nullptr) {
                  return callObjCSelector(runtime, bridge,
                                          static_cast<id>(nsColorClass), true,
                                          selectorName, nullptr, args, count);
                }
              }
              throw JSError(
                  runtime, "NSColor RGB initializer is not available.");
            });
      }
    }
#endif

    if (property == "initWithFireDateIntervalTargetSelectorUserInfoRepeats") {
      Class timerClass = NSClassFromString(@"NSTimer");
      if (object_ != nil && timerClass != Nil &&
          [object_ isKindOfClass:timerClass]) {
        auto bridge = bridge_;
        return Function::createFromHostFunction(
            runtime, PropNameID::forAscii(runtime, property.c_str()), 6,
            [bridge, timerClass](Runtime& runtime, const Value&,
                                 const Value* args, size_t count) -> Value {
              if (count < 6) {
                throw JSError(
                    runtime, "NSTimer initializer expects six arguments.");
              }
              return callObjCSelector(
                  runtime, bridge, static_cast<id>(timerClass), true,
                  "timerWithTimeInterval:target:selector:userInfo:repeats:",
                  nullptr, args + 1, count - 1);
            });
      }
    }

    Value expando = bridge_->findObjectExpando(runtime, object_, property);
    if (!expando.isUndefined()) {
      return expando;
    }

    if (object_ != nil) {
      try {
        Value receiver = bridge_->findRoundTripValue(runtime, object_);
        Value resolverValue = runtime.global().getProperty(
            runtime, "__nativeScriptGetNativeApiPrototypeProperty");
        if (receiver.isObject() && resolverValue.isObject() &&
            resolverValue.asObject(runtime).isFunction(runtime)) {
          Value prototype =
              bridge_->findClassPrototype(runtime, object_getClass(object_));
          Value prototypeOrName = prototype.isObject()
                                      ? Value(runtime, prototype)
                                      : Value::undefined();
          if (prototypeOrName.isUndefined()) {
            Value classWrapper = bridge_->findObjectExpando(
                runtime, object_, "__nativeApiClassWrapper");
            if (classWrapper.isObject()) {
              Object wrapperObject = classWrapper.asObject(runtime);
              Value wrapperPrototype =
                  wrapperObject.getProperty(runtime, "prototype");
              if (wrapperPrototype.isObject()) {
                prototypeOrName = std::move(wrapperPrototype);
              }
            }
          }
          if (prototypeOrName.isUndefined()) {
            const char* className = object_getClassName(object_);
            prototypeOrName = makeString(runtime,
                                         className != nullptr ? className : "");
          }
	          Value resolved = resolverValue.asObject(runtime)
	                               .asFunction(runtime)
	                               .call(runtime, std::move(prototypeOrName),
	                                     Value(runtime, receiver),
	                                     makeString(runtime, property));
	          if (resolved.isObject()) {
	            Object result = resolved.asObject(runtime);
	            Value found = result.getProperty(runtime, "found");
	            if (found.isBool() && found.getBool()) {
	              return result.getProperty(runtime, "value");
	            }
	          }
	        }
	      } catch (const std::exception&) {
	      }
    }

    if (object_ != nil && [object_ isKindOfClass:[NSArray class]]) {
      NSArray* array = static_cast<NSArray*>(object_);
      if (property == "length") {
        return static_cast<double>(array.count);
      }
      if (auto index = parseArrayIndexProperty(property)) {
        if (*index >= array.count) {
          return Value::undefined();
        }
        id element = [array objectAtIndex:*index];
        NativeApiDirectType elementType = nativeObjectReturnType();
        return convertNativeReturnValue(runtime, bridge_, elementType, &element);
      }
    }

    if (object_ != nil) {
      if (const NativeApiSymbol* symbol =
              bridge_->findClassForRuntimeClass(object_getClass(object_))) {
        const auto& members = bridge_->membersForClass(*symbol);
        if (const NativeApiMember* propertyMember =
                selectPropertyMember(members, property, false)) {
          SEL selector = sel_getUid(propertyMember->selectorName.c_str());
          if ([object_ respondsToSelector:selector]) {
            return callObjectSelector(runtime, propertyMember->selectorName,
                                      propertyMember, nullptr, 0);
          }
          std::string booleanSelectorName =
              booleanGetterSelectorForProperty(property);
          if (booleanSelectorName != propertyMember->selectorName) {
            SEL booleanSelector = sel_getUid(booleanSelectorName.c_str());
            if ([object_ respondsToSelector:booleanSelector]) {
              NativeApiMember getterMember = *propertyMember;
              getterMember.selectorName = booleanSelectorName;
              return callObjectSelector(runtime, getterMember.selectorName,
                                        &getterMember, nullptr, 0);
            }
          }
        }

        if (selectMethodMember(members, property, false, 0) != nullptr) {
          auto bridge = bridge_;
          id object = object_;
          std::weak_ptr<NativeApiObjectHostObject> weakSelf =
              shared_from_this();
          std::string memberName = property;
          return Function::createFromHostFunction(
              runtime, PropNameID::forAscii(runtime, property.c_str()),
              0,
              [bridge, object, weakSelf, memberName](Runtime& runtime,
                                                     const Value&,
                                                     const Value* args,
                                                     size_t count) -> Value {
                const NativeApiSymbol* symbol =
                    bridge->findClassForRuntimeClass(object_getClass(object));
                if (symbol == nullptr) {
                  throw JSError(
                      runtime, "Objective-C metadata is not available for object.");
                }
                const NativeApiMember* selected = selectMethodMember(
                    bridge->membersForClass(*symbol), memberName, false, count);
                if (selected == nullptr) {
                  throw JSError(
                      runtime, "Objective-C selector is not available: " +
                                   memberName);
                }
                if (auto self = weakSelf.lock()) {
                  return self->callObjectSelector(
                      runtime, selected->selectorName, selected, args, count);
                }
                return callObjCSelector(runtime, bridge, object, false,
                                        selected->selectorName, selected, args,
                                        count);
              });
        }
      }

      if (auto selectorName =
              runtimeSelectorNameForProperty(object_getClass(object_), false,
                                             property)) {
        if (selectorArgumentCount(*selectorName) == 0 &&
            hasRuntimeSetterForProperty(object_getClass(object_), false,
                                        property)) {
          return callObjectSelector(runtime, *selectorName, nullptr, nullptr, 0);
        }

        auto bridge = bridge_;
        id object = object_;
        std::weak_ptr<NativeApiObjectHostObject> weakSelf = shared_from_this();
        return Function::createFromHostFunction(
            runtime, PropNameID::forAscii(runtime, property.c_str()), 0,
            [bridge, object, weakSelf, selectorName = *selectorName](
                Runtime& runtime, const Value&, const Value* args,
                size_t count) -> Value {
              if (auto self = weakSelf.lock()) {
                return self->callObjectSelector(runtime, selectorName, nullptr,
                                                args, count);
              }
              return callObjCSelector(runtime, bridge, object, false,
                                      selectorName, nullptr, args, count);
        });
      }

      if ([object_ isKindOfClass:[NSDictionary class]]) {
        NSString* key = [NSString stringWithUTF8String:property.c_str()];
        if (key != nil) {
          id value = [static_cast<NSDictionary*>(object_) objectForKey:key];
          if (value != nil) {
            NativeApiDirectType valueType = nativeObjectReturnType();
            return convertNativeReturnValue(runtime, bridge_, valueType, &value);
          }
        }
      }
    }

    return Value::undefined();
  }

  void set(Runtime& runtime, const PropNameID& name, const Value& value) override {
    std::string property = name.utf8(runtime);
    if (object_ == nil) {
      throw JSError(runtime, "Cannot set property on nil object.");
    }

    if (const NativeApiSymbol* symbol =
            bridge_->findClassForRuntimeClass(object_getClass(object_))) {
      const auto& members = bridge_->membersForClass(*symbol);
      if (const NativeApiMember* propertyMember =
              selectWritablePropertyMember(members, property, false)) {
        if (propertyMember->readonly) {
          throw JSError(
              runtime, "Attempted to assign to readonly property.");
        }
        NativeApiMember setterMember = *propertyMember;
        setterMember.selectorName = propertyMember->setterSelectorName;
        setterMember.signatureOffset = propertyMember->setterSignatureOffset;
        Value args[] = {Value(runtime, value)};
        callObjCSelector(runtime, bridge_, object_, false,
                         setterMember.selectorName, &setterMember, args, 1);
        return;
      }
    }

    std::string setterSelectorName = setterSelectorForProperty(property);
    SEL selector = sel_getUid(setterSelectorName.c_str());
    if ([object_ respondsToSelector:selector]) {
      Value args[] = {Value(runtime, value)};
      callObjCSelector(runtime, bridge_, object_, false, setterSelectorName,
                       nullptr, args, 1);
      return;
    }

    bridge_->setObjectExpando(runtime, object_, property, value);
  }

  std::vector<PropNameID> getPropertyNames(Runtime& runtime) override {
    std::vector<PropNameID> names;
    names.reserve(6);
    addPropertyName(runtime, names, "kind");
    addPropertyName(runtime, names, "className");
    addPropertyName(runtime, names, "nativeAddress");
    addPropertyName(runtime, names, "constructor");
    addPropertyName(runtime, names, "superclass");
    addPropertyName(runtime, names, "super");
    addPropertyName(runtime, names, "invoke");
    addPropertyName(runtime, names, "send");
    addPropertyName(runtime, names, "takeRetainedValue");
    addPropertyName(runtime, names, "takeUnretainedValue");
    addPropertyName(runtime, names, "toString");
    return names;
  }

 private:
  std::shared_ptr<NativeApiDirectBridge> bridge_;
  id object_ = nil;
  bool ownsObject_ = false;
  bool consumed_ = false;
};

class NativeApiClassHostObject final : public HostObject {
 public:
  NativeApiClassHostObject(std::shared_ptr<NativeApiDirectBridge> bridge,
                           NativeApiSymbol symbol)
      : bridge_(std::move(bridge)), symbol_(std::move(symbol)) {}

  Class nativeClass() const {
    return objc_lookUpClass(symbol_.runtimeName.c_str());
  }

  Value get(Runtime& runtime, const PropNameID& name) override {
    std::string property = name.utf8(runtime);
    if (property == "kind") {
      return makeString(runtime, "class");
    }
    if (property == "name") {
      return makeString(runtime, symbol_.name);
    }
    if (property == "runtimeName") {
      return makeString(runtime, symbol_.runtimeName);
    }
    if (property == "available") {
      return objc_lookUpClass(symbol_.runtimeName.c_str()) != nil;
    }
	    if (property == "metadataOffset") {
	      return static_cast<double>(symbol_.offset);
	    }
	    if (property == "__superclass") {
	      if (symbol_.superclassOffset == MD_SECTION_OFFSET_NULL) {
	        return Value::undefined();
	      }
	      const NativeApiSymbol* superclass =
	          bridge_->findClassByOffset(symbol_.superclassOffset);
	      if (superclass == nullptr) {
	        return Value::undefined();
	      }
	      return makeNativeClassValue(runtime, bridge_, *superclass);
	    }
	    if (property == "__staticMembers" || property == "__instanceMembers") {
	      bool staticMembers = property == "__staticMembers";
      const auto& members = bridge_->surfaceMembersForClass(symbol_);
      Array result(runtime, members.size());
      size_t index = 0;
      for (const auto& member : members) {
        bool memberIsStatic =
            (member.flags & metagen::mdMemberStatic) != 0;
        if (memberIsStatic != staticMembers) {
          continue;
        }
        Object descriptor(runtime);
        descriptor.setProperty(runtime, "name", makeString(runtime, member.name));
        descriptor.setProperty(runtime, "selectorName",
                               makeString(runtime, member.selectorName));
        descriptor.setProperty(
            runtime, "argumentCount",
            static_cast<double>(selectorArgumentCount(member.selectorName)));
        descriptor.setProperty(runtime, "property", member.property);
        descriptor.setProperty(runtime, "readonly", member.readonly);
        descriptor.setProperty(runtime, "setterSelectorName",
                               makeString(runtime, member.setterSelectorName));
        result.setValueAtIndex(runtime, index++, descriptor);
      }
      Array compact(runtime, index);
      for (size_t i = 0; i < index; i++) {
        compact.setValueAtIndex(runtime, i, result.getValueAtIndex(runtime, i));
      }
      return compact;
    }
    if (property == "toString") {
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "toString"), 0,
          [symbol = symbol_](Runtime& runtime, const Value&,
                             const Value*, size_t) -> Value {
            return makeString(runtime,
                              "[NativeApiDirectClass " + symbol.name + "]");
          });
    }
    if (property == "construct" || property == "alloc" || property == "new") {
      auto bridge = bridge_;
      auto symbol = symbol_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, property), 0,
          [bridge, symbol, property](Runtime& runtime, const Value&,
                                     const Value* args, size_t count) -> Value {
            Class cls = objc_lookUpClass(symbol.runtimeName.c_str());
            if (cls == nil) {
              throw JSError(
                  runtime, "Objective-C class is not available: " + symbol.name);
            }

            id result = nil;
            if (property == "construct" && count == 1) {
              void* pointer = nullptr;
              if (args[0].isNumber()) {
                pointer = reinterpret_cast<void*>(
                    static_cast<uintptr_t>(args[0].getNumber()));
              } else if (args[0].isObject()) {
                Object object = args[0].asObject(runtime);
                if (object.isHostObject<NativeApiPointerHostObject>(runtime)) {
                  pointer = object
                                .getHostObject<NativeApiPointerHostObject>(
                                    runtime)
                                ->pointer();
                } else if (object.isHostObject<NativeApiReferenceHostObject>(
                               runtime)) {
                  pointer = object
                                .getHostObject<NativeApiReferenceHostObject>(
                                    runtime)
                                ->data();
                } else if (object.isHostObject<NativeApiObjectHostObject>(
                               runtime)) {
                  pointer = object
                                .getHostObject<NativeApiObjectHostObject>(
                                    runtime)
                                ->object();
                }
              }
              return makeNativeObjectValue(runtime, bridge,
                                           static_cast<id>(pointer), false);
            }

            if (property == "new") {
              if (count != 0) {
                throw JSError(
                    runtime, "new does not take arguments; use invoke for an "
                             "explicit Objective-C selector.");
              }
              result = [[cls alloc] init];
            } else {
              if (count != 0) {
                throw JSError(
                    runtime, "alloc does not take arguments; call invoke on the "
                             "allocated object for an explicit init selector.");
              }
              result = [cls alloc];
            }

            return makeNativeObjectValue(runtime, bridge, result, true);
          });
    }
    if (property == "invoke" || property == "send") {
      auto bridge = bridge_;
      auto symbol = symbol_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, property.c_str()), 1,
          [bridge, symbol](Runtime& runtime, const Value&, const Value* args,
                           size_t count) -> Value {
            std::string selectorName =
                readStringArg(runtime, args, count, 0, "selector");
            Class cls = objc_lookUpClass(symbol.runtimeName.c_str());
            if (cls == nil) {
              throw JSError(
                  runtime, "Objective-C class is not available: " + symbol.name);
            }
            return callObjCSelector(runtime, bridge, static_cast<id>(cls), true,
                                    selectorName, nullptr, args + 1,
                                    count - 1);
          });
    }

    const auto& members = bridge_->membersForClass(symbol_);
    if (const NativeApiMember* propertyMember =
            selectWritablePropertyMember(members, property, true)) {
      auto bridge = bridge_;
      auto symbol = symbol_;
      Class cls = objc_lookUpClass(symbol.runtimeName.c_str());
      if (cls == nil) {
        throw JSError(
            runtime, "Objective-C class is not available: " + symbol.name);
      }
      SEL selector = sel_getUid(propertyMember->selectorName.c_str());
      if (class_getClassMethod(cls, selector) != nullptr) {
        return callObjCSelector(runtime, bridge, static_cast<id>(cls), true,
                                propertyMember->selectorName, propertyMember,
                                nullptr, 0);
      }
    }

    if (selectMethodMember(members, property, true, 0) != nullptr) {
      auto bridge = bridge_;
      auto symbol = symbol_;
      std::string memberName = property;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, property.c_str()), 0,
          [bridge, symbol, memberName](Runtime& runtime, const Value&,
                                       const Value* args,
                                       size_t count) -> Value {
            Class cls = objc_lookUpClass(symbol.runtimeName.c_str());
            if (cls == nil) {
              throw JSError(
                  runtime, "Objective-C class is not available: " + symbol.name);
            }
            const NativeApiMember* selected = selectMethodMember(
                bridge->membersForClass(symbol), memberName, true, count);
            if (selected == nullptr) {
              throw JSError(
                  runtime, "Objective-C selector is not available: " +
                               memberName);
            }
            return callObjCSelector(runtime, bridge, static_cast<id>(cls), true,
                                    selected->selectorName, selected, args,
                                    count);
          });
    }

    Class cls = objc_lookUpClass(symbol_.runtimeName.c_str());
    if (cls != nil) {
      if (auto selectorName =
              runtimeSelectorNameForProperty(cls, true, property)) {
        if (selectorArgumentCount(*selectorName) == 0 &&
            hasRuntimeSetterForProperty(cls, true, property)) {
          return callObjCSelector(runtime, bridge_, static_cast<id>(cls), true,
                                  *selectorName, nullptr, nullptr, 0);
        }

        auto bridge = bridge_;
        return Function::createFromHostFunction(
            runtime, PropNameID::forAscii(runtime, property.c_str()), 0,
            [bridge, cls, selectorName = *selectorName](
                Runtime& runtime, const Value&, const Value* args,
                size_t count) -> Value {
              return callObjCSelector(runtime, bridge, static_cast<id>(cls),
                                      true, selectorName, nullptr, args,
                                      count);
            });
      }
    }

    return Value::undefined();
  }

  void set(Runtime& runtime, const PropNameID& name, const Value& value) override {
    std::string property = name.utf8(runtime);
    Class cls = objc_lookUpClass(symbol_.runtimeName.c_str());
    if (cls == nil) {
      throw JSError(
          runtime, "Objective-C class is not available: " + symbol_.name);
    }

    const auto& members = bridge_->membersForClass(symbol_);
    if (const NativeApiMember* propertyMember =
            selectPropertyMember(members, property, true)) {
      if (propertyMember->readonly) {
        throw JSError(
            runtime, "Attempted to assign to readonly property.");
      }
      NativeApiMember setterMember = *propertyMember;
      setterMember.selectorName = propertyMember->setterSelectorName;
      setterMember.signatureOffset = propertyMember->setterSignatureOffset;
      Value args[] = {Value(runtime, value)};
      callObjCSelector(runtime, bridge_, static_cast<id>(cls), true,
                       setterMember.selectorName, &setterMember, args, 1);
      return;
    }

    std::string setterSelectorName = setterSelectorForProperty(property);
    SEL selector = sel_getUid(setterSelectorName.c_str());
    if (class_getClassMethod(cls, selector) != nullptr) {
      Value args[] = {Value(runtime, value)};
      callObjCSelector(runtime, bridge_, static_cast<id>(cls), true,
                       setterSelectorName, nullptr, args, 1);
      return;
    }

    throw JSError(runtime,
                                 "No writable native property: " + property);
  }

  std::vector<PropNameID> getPropertyNames(Runtime& runtime) override {
    std::vector<PropNameID> names;
    names.reserve(8);
    addPropertyName(runtime, names, "kind");
    addPropertyName(runtime, names, "name");
    addPropertyName(runtime, names, "runtimeName");
    addPropertyName(runtime, names, "available");
    addPropertyName(runtime, names, "metadataOffset");
    addPropertyName(runtime, names, "toString");
    addPropertyName(runtime, names, "construct");
    addPropertyName(runtime, names, "alloc");
    addPropertyName(runtime, names, "new");
    addPropertyName(runtime, names, "invoke");
    addPropertyName(runtime, names, "send");
    return names;
  }

 private:
  std::shared_ptr<NativeApiDirectBridge> bridge_;
  NativeApiSymbol symbol_;
};

Value makeNativeObjectValue(Runtime& runtime,
                            const std::shared_ptr<NativeApiDirectBridge>& bridge,
                            id object, bool ownsObject) {
  if (object == nil) {
    return Value::null();
  }

  Value cached = bridge->findRoundTripValue(runtime, object);
  if (!cached.isUndefined()) {
    if (ownsObject) {
      [object release];
    }
    return cached;
  }

  Object result = Object::createFromHostObject(
      runtime,
      std::make_shared<NativeApiObjectHostObject>(bridge, object, ownsObject));
  bridge->rememberRoundTripValue(runtime, object, Value(runtime, result));
  return result;
}

Value globalNativeSymbolValue(Runtime& runtime, const NativeApiSymbol& symbol,
                              const char* expectedKind) {
  Object global = runtime.global();
  Value cacheValue = global.getProperty(
      runtime, "__nativeScriptNativeApiGlobalCache");
  if (!cacheValue.isObject()) {
    return Value::undefined();
  }

  Object cache = cacheValue.asObject(runtime);
  auto readCache = [&](const std::string& name) -> Value {
    if (name.empty()) {
      return Value::undefined();
    }

    Value value = cache.getProperty(runtime, name.c_str());
    if (!value.isObject()) {
      return Value::undefined();
    }

    try {
      Object object = value.asObject(runtime);
      Value kindValue = object.getProperty(runtime, "kind");
      if (kindValue.isString() &&
          kindValue.asString(runtime).utf8(runtime) == expectedKind) {
        return value;
      }
    } catch (const std::exception&) {
    }

    return Value::undefined();
  };

  Value value = readCache(symbol.name);
  if (!value.isUndefined()) {
    return value;
  }
  if (symbol.runtimeName != symbol.name) {
    value = readCache(symbol.runtimeName);
    if (!value.isUndefined()) {
      return value;
    }
  }

  try {
    if (std::strcmp(expectedKind, "class") == 0) {
      Value classResolverValue = global.getProperty(
          runtime, "__nativeScriptResolveNativeApiClassWrapper");
      if (classResolverValue.isObject() &&
          classResolverValue.asObject(runtime).isFunction(runtime)) {
        Function classResolver =
            classResolverValue.asObject(runtime).asFunction(runtime);
        auto resolveClassWrapper = [&](const std::string& name) -> Value {
          if (name.empty()) {
            return Value::undefined();
          }
          Value resolved = classResolver.call(runtime, makeString(runtime, name));
          return resolved.isObject() ? std::move(resolved) : Value::undefined();
        };

        value = resolveClassWrapper(symbol.name);
        if (!value.isUndefined()) {
          return value;
        }
        if (symbol.runtimeName != symbol.name) {
          value = resolveClassWrapper(symbol.runtimeName);
          if (!value.isUndefined()) {
            return value;
          }
        }
      }
    }

    Value resolverValue =
        global.getProperty(runtime, "__nativeScriptResolveNativeApiGlobal");
    if (resolverValue.isObject() &&
        resolverValue.asObject(runtime).isFunction(runtime)) {
      Function resolver = resolverValue.asObject(runtime).asFunction(runtime);
      auto resolveGlobal = [&](const std::string& name) -> Value {
        if (name.empty()) {
          return Value::undefined();
        }
        Value resolved = resolver.call(runtime, makeString(runtime, name),
                                       makeString(runtime, expectedKind));
        if (resolved.isObject()) {
          return resolved;
        }
        return Value::undefined();
      };

      value = resolveGlobal(symbol.name);
      if (!value.isUndefined()) {
        return value;
      }
      if (symbol.runtimeName != symbol.name) {
        value = resolveGlobal(symbol.runtimeName);
        if (!value.isUndefined()) {
          return value;
        }
      }
    }
  } catch (const std::exception&) {
  }

  return Value::undefined();
}

Value makeNativeClassValue(Runtime& runtime,
                           const std::shared_ptr<NativeApiDirectBridge>& bridge,
                           NativeApiSymbol symbol) {
  Class cls = objc_lookUpClass(symbol.runtimeName.c_str());
  Value cachedClass = bridge->findClassValue(runtime, cls);
  if (!cachedClass.isUndefined()) {
    return cachedClass;
  }
  Value globalValue = globalNativeSymbolValue(runtime, symbol, "class");
  if (!globalValue.isUndefined()) {
    return globalValue;
  }
  return Object::createFromHostObject(
      runtime,
      std::make_shared<NativeApiClassHostObject>(bridge, std::move(symbol)));
}

Protocol* lookupProtocolByNativeName(const std::string& name) {
  Protocol* protocol = objc_getProtocol(name.c_str());
  if (protocol != nullptr) {
    return protocol;
  }
  constexpr const char* suffix = "Protocol";
  size_t suffixLength = std::strlen(suffix);
  if (name.size() > suffixLength &&
      name.compare(name.size() - suffixLength, suffixLength, suffix) == 0) {
    protocol = objc_getProtocol(
        name.substr(0, name.size() - suffixLength).c_str());
  }
  return protocol;
}

class NativeApiProtocolHostObject final : public HostObject {
 public:
  NativeApiProtocolHostObject(std::shared_ptr<NativeApiDirectBridge> bridge,
                              NativeApiSymbol symbol)
      : bridge_(std::move(bridge)), symbol_(std::move(symbol)) {}

  Protocol* nativeProtocol() const {
    Protocol* protocol = lookupProtocolByNativeName(symbol_.runtimeName);
    if (protocol == nullptr && symbol_.runtimeName != symbol_.name) {
      protocol = lookupProtocolByNativeName(symbol_.name);
    }
    return protocol;
  }

  const NativeApiSymbol& symbol() const { return symbol_; }

  Value get(Runtime& runtime, const PropNameID& name) override {
    std::string property = name.utf8(runtime);
    if (property == "kind") {
      return makeString(runtime, "protocol");
    }
    if (property == "name") {
      return makeString(runtime, symbol_.name);
    }
    if (property == "runtimeName") {
      return makeString(runtime, symbol_.runtimeName);
    }
    if (property == "available") {
      return nativeProtocol() != nullptr;
    }
    if (property == "metadataOffset") {
      return static_cast<double>(symbol_.offset);
    }
    if (property == "nativeAddress") {
      return static_cast<double>(
          reinterpret_cast<uintptr_t>(nativeProtocol()));
    }
    if (property == "prototype") {
      Object prototype(runtime);
      for (const auto& member : bridge_->membersForProtocol(symbol_)) {
        if (prototype.hasProperty(runtime, member.name.c_str())) {
          continue;
        }
        if (member.property) {
          defineProtocolProperty(runtime, prototype, member, false);
        } else {
          prototype.setProperty(runtime, member.name.c_str(),
                                makeProtocolMemberFunction(runtime, member,
                                                           false));
        }
      }
      return prototype;
    }
    if (property == "toString") {
      auto symbol = symbol_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "toString"), 0,
          [symbol](Runtime& runtime, const Value&, const Value*, size_t) -> Value {
            return makeString(runtime,
                              "[NativeApiDirectProtocol " + symbol.name + "]");
          });
    }
    const auto& members = bridge_->membersForProtocol(symbol_);
    if (const NativeApiMember* propertyMember =
            selectPropertyMember(members, property, true)) {
      return makeProtocolPropertyGetter(runtime, *propertyMember, true);
    }
    if (const NativeApiMember* propertyMember =
            selectPropertyMember(members, property, false)) {
      return makeProtocolPropertyGetter(runtime, *propertyMember, true);
    }
    if (const NativeApiMember* methodMember =
            selectMethodMember(members, property, true, 0)) {
      return makeProtocolMemberFunction(runtime, *methodMember, true);
    }
    if (const NativeApiMember* methodMember =
            selectMethodMember(members, property, false, 0)) {
      return makeProtocolMemberFunction(runtime, *methodMember, true);
    }
    return Value::undefined();
  }

  std::vector<PropNameID> getPropertyNames(Runtime& runtime) override {
    std::vector<PropNameID> names;
    addPropertyName(runtime, names, "kind");
    addPropertyName(runtime, names, "name");
    addPropertyName(runtime, names, "runtimeName");
    addPropertyName(runtime, names, "available");
    addPropertyName(runtime, names, "metadataOffset");
    addPropertyName(runtime, names, "nativeAddress");
    addPropertyName(runtime, names, "prototype");
    addPropertyName(runtime, names, "toString");
    for (const auto& member : bridge_->membersForProtocol(symbol_)) {
      addPropertyName(runtime, names, member.name.c_str());
    }
    return names;
  }

 private:
  static Class classReceiverFromThis(Runtime& runtime, const Value& thisValue) {
    if (!thisValue.isObject()) {
      return Nil;
    }

    Object object = thisValue.asObject(runtime);
    if (object.isHostObject<NativeApiClassHostObject>(runtime)) {
      return object.getHostObject<NativeApiClassHostObject>(runtime)->nativeClass();
    }

    Value wrappedClass = object.getProperty(runtime, "__nativeApiClass");
    if (wrappedClass.isObject()) {
      Object wrappedObject = wrappedClass.asObject(runtime);
      if (wrappedObject.isHostObject<NativeApiClassHostObject>(runtime)) {
        return wrappedObject.getHostObject<NativeApiClassHostObject>(runtime)
            ->nativeClass();
      }
    }

    Value kindValue = object.getProperty(runtime, "kind");
    if (kindValue.isString() &&
        kindValue.asString(runtime).utf8(runtime) == "class") {
      Value runtimeNameValue = object.getProperty(runtime, "runtimeName");
      if (!runtimeNameValue.isString()) {
        runtimeNameValue = object.getProperty(runtime, "name");
      }
      if (runtimeNameValue.isString()) {
        std::string runtimeName =
            runtimeNameValue.asString(runtime).utf8(runtime);
        return objc_lookUpClass(runtimeName.c_str());
      }
    }

    return Nil;
  }

  id objectReceiverFromThis(Runtime& runtime, const Value& thisValue) const {
    if (!thisValue.isObject()) {
      return nil;
    }

    Object object = thisValue.asObject(runtime);
    if (object.isHostObject<NativeApiObjectHostObject>(runtime)) {
      return object.getHostObject<NativeApiObjectHostObject>(runtime)->object();
    }

    return nil;
  }

  Value makeProtocolMemberFunction(Runtime& runtime, NativeApiMember member,
                                   bool receiverIsClass) const {
    auto bridge = bridge_;
    return Function::createFromHostFunction(
        runtime, PropNameID::forAscii(runtime, member.name.c_str()), 0,
        [bridge, member, receiverIsClass](Runtime& runtime,
                                          const Value& thisValue,
                                          const Value* args,
                                          size_t count) -> Value {
          id receiver = nil;
          if (receiverIsClass) {
            receiver = static_cast<id>(
                classReceiverFromThis(runtime, thisValue));
          } else if (thisValue.isObject()) {
            Object object = thisValue.asObject(runtime);
            if (object.isHostObject<NativeApiObjectHostObject>(runtime)) {
              receiver = object.getHostObject<NativeApiObjectHostObject>(runtime)
                             ->object();
            }
          }

          if (receiver == nil) {
            throw JSError(
                runtime, "Protocol member requires a native receiver.");
          }
          return callObjCSelector(runtime, bridge, receiver, receiverIsClass,
                                  member.selectorName, &member, args, count);
        });
  }

  Value makeProtocolPropertyGetter(Runtime& runtime, NativeApiMember member,
                                   bool receiverIsClass) const {
    auto bridge = bridge_;
    return Function::createFromHostFunction(
        runtime, PropNameID::forAscii(runtime, member.name.c_str()), 0,
        [bridge, member, receiverIsClass](Runtime& runtime,
                                          const Value& thisValue,
                                          const Value*, size_t) -> Value {
          id receiver = nil;
          if (receiverIsClass) {
            receiver = static_cast<id>(
                classReceiverFromThis(runtime, thisValue));
          } else if (thisValue.isObject()) {
            Object object = thisValue.asObject(runtime);
            if (object.isHostObject<NativeApiObjectHostObject>(runtime)) {
              receiver = object.getHostObject<NativeApiObjectHostObject>(runtime)
                             ->object();
            }
          }

          if (receiver == nil) {
            throw JSError(
                runtime, "Protocol property requires a native receiver.");
          }
          return callObjCSelector(runtime, bridge, receiver, receiverIsClass,
                                  member.selectorName, &member, nullptr, 0);
        });
  }

  Value makeProtocolPropertySetter(Runtime& runtime, NativeApiMember member,
                                   bool receiverIsClass) const {
    auto bridge = bridge_;
    return Function::createFromHostFunction(
        runtime, PropNameID::forAscii(runtime, member.setterSelectorName.c_str()),
        1,
        [bridge, member, receiverIsClass](Runtime& runtime,
                                          const Value& thisValue,
                                          const Value* args,
                                          size_t count) -> Value {
          id receiver = nil;
          if (receiverIsClass) {
            receiver = static_cast<id>(
                classReceiverFromThis(runtime, thisValue));
          } else if (thisValue.isObject()) {
            Object object = thisValue.asObject(runtime);
            if (object.isHostObject<NativeApiObjectHostObject>(runtime)) {
              receiver = object.getHostObject<NativeApiObjectHostObject>(runtime)
                             ->object();
            }
          }

          if (receiver == nil) {
            throw JSError(
                runtime, "Protocol property requires a native receiver.");
          }
          if (count < 1) {
            throw JSError(
                runtime, "Protocol property setter expects a value.");
          }

          NativeApiMember setterMember = member;
          setterMember.selectorName = member.setterSelectorName;
          setterMember.signatureOffset = member.setterSignatureOffset;
          return callObjCSelector(runtime, bridge, receiver, receiverIsClass,
                                  setterMember.selectorName, &setterMember,
                                  args, 1);
        });
  }

  void defineProtocolProperty(Runtime& runtime, Object& target,
                              const NativeApiMember& member,
                              bool receiverIsClass) const {
    try {
      Object objectCtor = runtime.global().getPropertyAsObject(runtime, "Object");
      Function defineProperty =
          objectCtor.getPropertyAsFunction(runtime, "defineProperty");
      Object descriptor(runtime);
      descriptor.setProperty(runtime, "configurable", true);
      descriptor.setProperty(runtime, "enumerable", true);
      descriptor.setProperty(runtime, "get",
                             makeProtocolPropertyGetter(runtime, member,
                                                        receiverIsClass));
      if (!member.readonly && !member.setterSelectorName.empty()) {
        descriptor.setProperty(runtime, "set",
                               makeProtocolPropertySetter(runtime, member,
                                                          receiverIsClass));
      }
      defineProperty.call(runtime, target, makeString(runtime, member.name),
                          descriptor);
    } catch (const std::exception&) {
    }
  }

  std::shared_ptr<NativeApiDirectBridge> bridge_;
  NativeApiSymbol symbol_;
};

Value makeNativeProtocolValue(Runtime& runtime,
                              const std::shared_ptr<NativeApiDirectBridge>& bridge,
                              NativeApiSymbol symbol) {
  Value globalValue = globalNativeSymbolValue(runtime, symbol, "protocol");
  if (!globalValue.isUndefined()) {
    return globalValue;
  }
  return Object::createFromHostObject(
      runtime,
      std::make_shared<NativeApiProtocolHostObject>(bridge, std::move(symbol)));
}

Class nativeClassFromDirectObject(Runtime& runtime, const Object& object) {
  if (object.isHostObject<NativeApiClassHostObject>(runtime)) {
    return object.getHostObject<NativeApiClassHostObject>(runtime)->nativeClass();
  }

  Value wrappedClass = object.getProperty(runtime, "__nativeApiClass");
  if (wrappedClass.isObject()) {
    Object wrappedObject = wrappedClass.asObject(runtime);
    if (wrappedObject.isHostObject<NativeApiClassHostObject>(runtime)) {
      return wrappedObject.getHostObject<NativeApiClassHostObject>(runtime)
          ->nativeClass();
    }
  }
  return Nil;
}

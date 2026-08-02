bool isValidMetadataStringOffset(MDMetadataReader* metadata,
                                 MDSectionOffset offset) {
  if (metadata == nullptr || metadata->constantsOffset < metadata->stringsOffset) {
    return false;
  }
  return offset < metadata->constantsOffset - metadata->stringsOffset;
}

bool startsWith(const std::string& value, const std::string& prefix) {
  return value.size() >= prefix.size() &&
         value.compare(0, prefix.size(), prefix) == 0;
}

bool endsWith(const std::string& value, const std::string& suffix) {
  return value.size() >= suffix.size() &&
         value.compare(value.size() - suffix.size(), suffix.size(), suffix) == 0;
}

std::string stripEnumSuffix(const std::string& enumName) {
  static const std::vector<std::string> suffixes = {
      "Options", "Option", "Enums", "Enum",   "Result", "Direction",
      "Orientation", "Style", "Mask", "Type", "Status", "Modes", "Mode", "s"};

  for (const auto& suffix : suffixes) {
    if (enumName.size() > suffix.size() && endsWith(enumName, suffix)) {
      return enumName.substr(0, enumName.size() - suffix.size());
    }
  }

  return enumName;
}

bool isNSComparisonResultOrderingName(const std::string& enumName,
                                      const std::string& member) {
  if (enumName != "NSComparisonResult") {
    return false;
  }
  return member == "Ascending" || member == "Same" || member == "Descending";
}

Value enumToObject(Runtime& runtime, MDMetadataReader* metadata,
                   const NativeApiSymbol& symbol) {
  Object result(runtime);
  if (metadata == nullptr || symbol.offset == MD_SECTION_OFFSET_NULL) {
    return result;
  }

  std::string enumName = symbol.name;
  std::string strippedPrefix = stripEnumSuffix(enumName);
  MDSectionOffset offset = symbol.offset + sizeof(MDSectionOffset);
  bool next = true;
  while (next) {
    auto nameOffset = metadata->getOffset(offset);
    next = (nameOffset & metagen::mdSectionOffsetNext) != 0;
    nameOffset &= ~metagen::mdSectionOffsetNext;
    offset += sizeof(MDSectionOffset);

    const char* memberName = metadata->resolveString(nameOffset);
    int64_t value = metadata->getEnumValue(offset);
    offset += sizeof(int64_t);

    std::string canonicalName = memberName != nullptr ? memberName : "";
    std::vector<std::string> aliases;
    aliases.push_back(canonicalName);

    if (!strippedPrefix.empty() && startsWith(canonicalName, strippedPrefix) &&
        canonicalName.size() > strippedPrefix.size()) {
      aliases.push_back(canonicalName.substr(strippedPrefix.size()));
    } else if (!strippedPrefix.empty() &&
               !startsWith(canonicalName, strippedPrefix)) {
      aliases.push_back(strippedPrefix + canonicalName);
    }

    if (startsWith(enumName, "NS") && !startsWith(canonicalName, "NS")) {
      aliases.push_back(std::string("NS") + canonicalName);
    }

    if (enumName == "NSStringCompareOptions" &&
        !endsWith(canonicalName, "Search")) {
      aliases.push_back(canonicalName + "Search");
      aliases.push_back(std::string("NS") + canonicalName + "Search");
    }

    if (!startsWith(canonicalName, "k")) {
      aliases.push_back(std::string("k") + enumName + canonicalName);
    }

    if (isNSComparisonResultOrderingName(enumName, canonicalName)) {
      aliases.push_back(std::string("Ordered") + canonicalName);
      aliases.push_back(std::string("NSOrdered") + canonicalName);
    }

    std::vector<std::string> uniqueAliases;
    std::unordered_set<std::string> seenAliases;
    for (const auto& alias : aliases) {
      if (!alias.empty() && seenAliases.insert(alias).second) {
        uniqueAliases.push_back(alias);
      }
    }

    for (const auto& alias : uniqueAliases) {
      result.setProperty(runtime, alias.c_str(), static_cast<double>(value));
    }

    char valueKey[32] = {};
    snprintf(valueKey, sizeof(valueKey), "%lld", static_cast<long long>(value));
    if (!result.hasProperty(runtime, valueKey)) {
      std::string reverseName =
          uniqueAliases.size() > 1 ? uniqueAliases[1] : canonicalName;
      result.setProperty(runtime, valueKey, makeString(runtime, reverseName));
    }
  }
  return result;
}

Value constantToValue(Runtime& runtime,
                      const std::shared_ptr<NativeApiJsiBridge>& bridge,
                      const NativeApiSymbol& symbol) {
  MDMetadataReader* metadata = bridge->metadata();
  if (metadata == nullptr || symbol.offset == MD_SECTION_OFFSET_NULL) {
    return Value::undefined();
  }

  MDSectionOffset offset = symbol.offset + sizeof(MDSectionOffset);
  auto evalKind = metadata->getVariableEvalKind(offset);
  offset += sizeof(metagen::MDVariableEvalKind);

  switch (evalKind) {
    case metagen::mdEvalInt64:
      return static_cast<double>(metadata->getInt64(offset));
    case metagen::mdEvalDouble:
      return metadata->getDouble(offset);
    case metagen::mdEvalString: {
      if (isValidMetadataStringOffset(metadata, offset)) {
        auto stringOffset = metadata->getOffset(offset);
        return makeString(runtime, metadata->resolveString(stringOffset));
      }

      void* symbolPtr = dlsym(bridge->selfDl(), symbol.name.c_str());
      if (symbolPtr == nullptr) {
        return Value::undefined();
      }

      NativeApiJsiType stringObjectType;
      stringObjectType.kind = metagen::mdTypeNSStringObject;
      stringObjectType.ffiType = &ffi_type_pointer;
      stringObjectType.supported = true;
      return convertNativeReturnValue(runtime, bridge, stringObjectType,
                                      symbolPtr);
    }
    case metagen::mdEvalNone:
      break;
  }

  MDSectionOffset typeOffset = offset;
  NativeApiJsiType type = parseMetadataJsiType(metadata, &typeOffset, bridge.get());
  if (unsupportedJsiType(type)) {
    throw facebook::jsi::JSError(
        runtime, "Native constant type is not supported by pure JSI: " +
                     symbol.name);
  }

  void* symbolPtr = dlsym(bridge->selfDl(), symbol.name.c_str());
  if (symbolPtr == nullptr) {
    return Value::undefined();
  }
  return convertNativeReturnValue(runtime, bridge, type, symbolPtr);
}

void prepareJsiArgument(Runtime& runtime,
                        const std::shared_ptr<NativeApiJsiBridge>& bridge,
                        const NativeApiJsiType& type, const Value& arg,
                        size_t index, NativeApiJsiArgumentFrame& frame) {
  ffi_type* ffiType = ffiTypeForJsiArgument(type);
  size_t size =
      ffiType != nullptr && ffiType->size > 0 ? ffiType->size : nativeSizeForType(type);
  void* target = frame.storageAt(index, size);
  convertJsiFfiArgument(runtime, bridge, type, arg, target, frame);
}

void prepareJsiArguments(Runtime& runtime,
                         const std::shared_ptr<NativeApiJsiBridge>& bridge,
                         const NativeApiJsiSignature& signature,
                         const Value* args, size_t count,
                         NativeApiJsiArgumentFrame& frame) {
  if (count != signature.argumentTypes.size()) {
    throw facebook::jsi::JSError(
        runtime, "Actual arguments count: \"" + std::to_string(count) +
                     "\". Expected: \"" +
                     std::to_string(signature.argumentTypes.size()) + "\".");
  }

  for (size_t i = 0; i < signature.argumentTypes.size(); i++) {
    prepareJsiArgument(runtime, bridge, signature.argumentTypes[i], args[i], i,
                       frame);
  }
}

Value callNativeFunctionPointer(
    Runtime& runtime, const std::shared_ptr<NativeApiJsiBridge>& bridge,
    const NativeApiJsiType& type, void* pointer, bool block, const Value* args,
    size_t count) {
  if (pointer == nullptr) {
    throw facebook::jsi::JSError(runtime, "Native function pointer is null.");
  }
  if (bridge == nullptr || bridge->metadata() == nullptr ||
      type.signatureOffset == MD_SECTION_OFFSET_NULL) {
    throw facebook::jsi::JSError(
        runtime, "Native function pointer metadata is unavailable.");
  }

  auto signature = parseMetadataJsiSignature(
      bridge->metadata(), type.signatureOffset, block ? 1 : 0, bridge.get());
  if (!signature || !signature->prepared || signature->variadic ||
      unsupportedJsiType(signature->returnType)) {
    throw facebook::jsi::JSError(
        runtime,
        "Native function pointer signature is not supported by pure JSI.");
  }

  NativeApiJsiArgumentFrame frame(signature->argumentTypes.size());
  prepareJsiArguments(runtime, bridge, *signature, args, count, frame);

  std::vector<void*> values;
  if (block) {
    values.reserve(signature->argumentTypes.size() + 1);
    values.push_back(&pointer);
    for (size_t i = 0; i < signature->argumentTypes.size(); i++) {
      values.push_back(frame.values()[i]);
    }
  }

  void* callable = pointer;
  if (block) {
    auto literal = static_cast<NativeApiJsiBlockLiteral*>(pointer);
    if (literal == nullptr || literal->invoke == nullptr) {
      throw facebook::jsi::JSError(runtime, "Native block invoke pointer is null.");
    }
    callable = literal->invoke;
  }

  std::vector<unsigned char> returnStorage(
      std::max<size_t>(nativeSizeForType(signature->returnType), sizeof(void*)), 0);
  performNativeInvocation(runtime, bridge->nativeInvocationInvoker(), [&]() {
    ffi_call(&signature->cif, FFI_FN(callable), returnStorage.data(),
             block ? values.data() : frame.values());
  });

  return convertNativeReturnValue(runtime, bridge, signature->returnType,
                                  returnStorage.data());
}

Value wrapNativeFunctionPointer(Runtime& runtime,
                                const std::shared_ptr<NativeApiJsiBridge>& bridge,
                                const NativeApiJsiType& type, void* pointer,
                                bool block) {
  const char* functionName = block ? "NativeApiJsiBlock" : "NativeApiJsiFunctionPointer";
  auto function = Function::createFromHostFunction(
      runtime, PropNameID::forAscii(runtime, functionName), 0,
      [bridge, type, pointer, block](Runtime& runtime, const Value&,
                                     const Value* args, size_t count) -> Value {
        return callNativeFunctionPointer(runtime, bridge, type, pointer, block,
                                         args, count);
      });
  function.setProperty(runtime, "kind",
                       makeString(runtime, block ? "block" : "functionPointer"));
  function.setProperty(
      runtime, "__nativeApiPointerObject",
      createPointer(runtime, bridge, pointer));
  function.setProperty(
      runtime, "__nativeApiPointer",
      static_cast<double>(reinterpret_cast<uintptr_t>(pointer)));
  function.setProperty(
      runtime, "nativeAddress",
      static_cast<double>(reinterpret_cast<uintptr_t>(pointer)));
  function.setProperty(runtime, "sizeof",
                       static_cast<double>(sizeof(void*)));
  function.setProperty(
      runtime, "toString",
      Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "toString"), 0,
          [pointer, block](Runtime& runtime, const Value&, const Value*,
                           size_t) -> Value {
            char address[32] = {};
            snprintf(address, sizeof(address), "%p", pointer);
            return makeString(runtime,
                              std::string("[NativeApiJsi ") +
                                  (block ? "Block " : "FunctionPointer ") +
                                  address + "]");
          }));
  return function;
}

Value callCFunction(Runtime& runtime,
                    const std::shared_ptr<NativeApiJsiBridge>& bridge,
                    const NativeApiSymbol& symbol, const Value* args,
                    size_t count) {
  MDMetadataReader* metadata = bridge->metadata();
  if (metadata == nullptr) {
    throw facebook::jsi::JSError(runtime, "Native metadata is not loaded.");
  }

  void* fnptr = dlsym(bridge->selfDl(), symbol.name.c_str());
  if (fnptr == nullptr) {
    throw facebook::jsi::JSError(runtime,
                                 "Native function is not available: " +
                                     symbol.name);
  }

  MDSectionOffset signatureOffset =
      metadata->signaturesOffset +
      metadata->getOffset(symbol.offset + sizeof(MDSectionOffset));
  auto signature = parseMetadataJsiSignature(
      metadata, signatureOffset, 0, bridge.get(),
      (metadata->getFunctionFlag(symbol.offset + sizeof(MDSectionOffset) * 2) &
       metagen::mdFunctionReturnOwned) != 0);
  if (!signature || !signature->prepared || signature->variadic ||
      unsupportedJsiType(signature->returnType)) {
    throw facebook::jsi::JSError(
        runtime, "Native function signature is not supported by pure JSI: " +
                     symbol.name);
  }

  NativeApiJsiArgumentFrame frame(signature->argumentTypes.size());
  prepareJsiArguments(runtime, bridge, *signature, args, count, frame);

  if (symbol.name == "NSApplicationMain" ||
      symbol.name == "UIApplicationMain") {
    runtime.drainMicrotasks();
  }

  std::vector<unsigned char> returnStorage(
      std::max<size_t>(nativeSizeForType(signature->returnType), sizeof(void*)), 0);
  bool dispatchingNativeCallToUI = shouldDispatchNativeCallToUI();
  bool retainedReturn = false;
  performNativeInvocation(runtime, bridge->nativeInvocationInvoker(), [&]() {
    ffi_call(&signature->cif, FFI_FN(fnptr), returnStorage.data(),
             frame.values());
    if (dispatchingNativeCallToUI &&
        !signature->returnType.returnOwned &&
        isObjectiveCObjectType(signature->returnType)) {
      id object = *reinterpret_cast<id*>(returnStorage.data());
      if (object != nil) {
        [object retain];
        retainedReturn = true;
      }
    }
  });

  NativeApiJsiType returnType = signature->returnType;
  if (retainedReturn) {
    returnType.returnOwned = true;
  }
  if (symbol.name == "CFBagContainsValue" &&
      (returnType.kind == metagen::mdTypeChar ||
       returnType.kind == metagen::mdTypeUChar ||
       returnType.kind == metagen::mdTypeUInt8)) {
    return *returnStorage.data() != 0;
  }
  return convertNativeReturnValue(runtime, bridge, returnType,
                                  returnStorage.data());
}

bool signatureSupportedForJsiInvocation(
    const std::optional<NativeApiJsiSignature>& signature) {
  if (!signature || !signature->prepared || signature->variadic ||
      unsupportedJsiType(signature->returnType)) {
    return false;
  }
  for (const auto& argType : signature->argumentTypes) {
    if (unsupportedJsiType(argType)) {
      return false;
    }
  }
  return true;
}

Value callObjCSelector(Runtime& runtime,
                       const std::shared_ptr<NativeApiJsiBridge>& bridge,
                       id receiver, bool receiverIsClass,
                       const std::string& selectorName,
                       const NativeApiMember* member,
                       const Value* args, size_t count,
                       Class dispatchSuperClass) {
  if (receiver == nil) {
    throw facebook::jsi::JSError(runtime,
                                 "Cannot send Objective-C selector to nil.");
  }

  SEL selector = sel_registerName(selectorName.c_str());
  Class receiverClass =
      receiverIsClass ? static_cast<Class>(receiver) : object_getClass(receiver);
  Class lookupClass = dispatchSuperClass != Nil ? dispatchSuperClass : receiverClass;
  Method method = receiverIsClass ? class_getClassMethod(lookupClass, selector)
                                  : class_getInstanceMethod(lookupClass, selector);
  if (method == nullptr &&
      (dispatchSuperClass != Nil || ![receiver respondsToSelector:selector])) {
    throw facebook::jsi::JSError(runtime,
                                 "Objective-C selector is not available: " +
                                     selectorName);
  }

  std::optional<NativeApiJsiSignature> signature;
  std::optional<NativeApiJsiSignature> runtimeSignature;
  if (member != nullptr &&
      member->signatureOffset != MD_SECTION_OFFSET_NULL &&
      member->signatureOffset != 0) {
    signature = parseMetadataJsiSignature(
        bridge->metadata(), member->signatureOffset, 2, bridge.get(),
        (member->flags & metagen::mdMemberReturnOwned) != 0);
  }
  if (method != nullptr) {
    runtimeSignature = parseObjCMethodJsiSignature(method, bridge.get());
  }
  if (signatureSupportedForJsiInvocation(signature) &&
      signatureSupportedForJsiInvocation(runtimeSignature)) {
    reconcileObjCMethodRuntimeSignature(&*signature, *runtimeSignature);
  }
  if (!signatureSupportedForJsiInvocation(signature) && runtimeSignature) {
    signature = std::move(runtimeSignature);
  }

  if (!signatureSupportedForJsiInvocation(signature)) {
    throw facebook::jsi::JSError(
        runtime, "Objective-C signature is not supported by pure JSI: " +
                     selectorName);
  }
  signature->selectorName = selectorName;

  NativeApiJsiArgumentFrame frame(signature->argumentTypes.size());
  const bool isNSErrorOutMethod = isNSErrorOutJsiMethodSignature(*signature);
  if (isNSErrorOutMethod) {
    size_t expected = signature->argumentTypes.size();
    if (count > expected || count + 1 < expected) {
      throw facebook::jsi::JSError(
          runtime, "Actual arguments count: \"" + std::to_string(count) +
                       "\". Expected: \"" + std::to_string(expected) + "\".");
    }
  }

  const bool hasImplicitNSErrorOutArg =
      isNSErrorOutMethod && count + 1 == signature->argumentTypes.size();
  NSError* implicitNSError = nil;
  if (hasImplicitNSErrorOutArg) {
    for (size_t i = 0; i < count; i++) {
      prepareJsiArgument(runtime, bridge, signature->argumentTypes[i], args[i], i,
                         frame);
    }

    size_t outArgIndex = signature->argumentTypes.size() - 1;
    void* target = frame.storageAt(outArgIndex, sizeof(NSError**));
    NSError** implicitNSErrorOutArg = &implicitNSError;
    *static_cast<void**>(target) = implicitNSErrorOutArg;
  } else {
    prepareJsiArguments(runtime, bridge, *signature, args, count, frame);
  }

  std::vector<void*> values;
  values.reserve(signature->argumentTypes.size() + 2);
  struct objc_super superReceiver = {receiver, dispatchSuperClass};
  struct objc_super* superReceiverPtr = &superReceiver;
  if (dispatchSuperClass != Nil) {
    values.push_back(&superReceiverPtr);
  } else {
    values.push_back(&receiver);
  }
  values.push_back(&selector);
  for (size_t i = 0; i < signature->argumentTypes.size(); i++) {
    values.push_back(frame.values()[i]);
  }

  std::vector<unsigned char> returnStorage(
      std::max<size_t>(nativeSizeForType(signature->returnType), sizeof(void*)), 0);
  bool dispatchingNativeCallToUI = shouldDispatchNativeCallToUI();
  bool retainedReturn = false;
  performNativeInvocation(runtime, bridge->nativeInvocationInvoker(), [&]() {
#if defined(__x86_64__)
    bool isStret = signature->returnType.ffiType->size > 16 &&
                   signature->returnType.ffiType->type == FFI_TYPE_STRUCT;
    void (*target)(void) = dispatchSuperClass != Nil
                       ? (isStret ? FFI_FN(objc_msgSendSuper_stret)
                                  : FFI_FN(objc_msgSendSuper))
                       : (isStret ? FFI_FN(objc_msgSend_stret)
                                  : FFI_FN(objc_msgSend));
    ffi_call(&signature->cif, target, returnStorage.data(), values.data());
#else
    ffi_call(&signature->cif,
             dispatchSuperClass != Nil ? FFI_FN(objc_msgSendSuper)
                                       : FFI_FN(objc_msgSend),
             returnStorage.data(), values.data());
#endif
    if (dispatchingNativeCallToUI &&
        !signature->returnType.returnOwned &&
        isObjectiveCObjectType(signature->returnType)) {
      id object = *reinterpret_cast<id*>(returnStorage.data());
      if (object != nil) {
        [object retain];
        retainedReturn = true;
      }
    }
  });

  NativeApiJsiType returnType = signature->returnType;
  if ((selectorName == "valueForKey:" || selectorName == "valueForKeyPath:") &&
      isObjectiveCObjectType(returnType)) {
    returnType.kind = metagen::mdTypeAnyObject;
  }
  if (retainedReturn) {
    returnType.returnOwned = true;
  }
  if (hasImplicitNSErrorOutArg && implicitNSError != nil) {
    const char* errorMessage = [[implicitNSError description] UTF8String];
    throw facebook::jsi::JSError(
        runtime, errorMessage != nullptr ? errorMessage : "Unknown NSError");
  }
  return convertNativeReturnValue(runtime, bridge, returnType,
                                  returnStorage.data());
}

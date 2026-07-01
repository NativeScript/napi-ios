// Included by NativeApiJSC.mm inside the NativeScript anonymous namespace.

struct NativeApiSelectorGroupData {
  NativeApiSelectorGroupData(
      std::shared_ptr<engine::jscengine::RuntimeState> state,
      std::shared_ptr<NativeApiBridge> bridge, Class lookupClass,
      bool receiverIsClass,
      std::shared_ptr<std::vector<NativeApiSelectorGroupEntry>>
          selectors,
      std::shared_ptr<
          std::vector<std::shared_ptr<NativeApiPreparedObjCInvocation>>>
          preparedInvocations,
      std::weak_ptr<NativeApiObjectHostObject> boundReceiver = {},
      std::shared_ptr<NativeApiObjectLifetimeState> boundReceiverState =
          nullptr)
      : state(state),
        bridge(std::move(bridge)),
        lookupClass(lookupClass),
        receiverIsClass(receiverIsClass),
        selectors(std::move(selectors)),
        preparedInvocations(std::move(preparedInvocations)),
        boundReceiver(std::move(boundReceiver)),
        boundReceiverState(std::move(boundReceiverState)),
        runtime(state) {}

  std::shared_ptr<engine::jscengine::RuntimeState> state;
  std::shared_ptr<NativeApiBridge> bridge;
  Class lookupClass = Nil;
  bool receiverIsClass = false;
  std::shared_ptr<std::vector<NativeApiSelectorGroupEntry>> selectors;
  std::shared_ptr<
      std::vector<std::shared_ptr<NativeApiPreparedObjCInvocation>>>
      preparedInvocations;
  std::weak_ptr<NativeApiObjectHostObject> boundReceiver;
  std::shared_ptr<NativeApiObjectLifetimeState> boundReceiverState;
  // Reused per call (avoids per-call shared_ptr refcount + dispatch-superclass
  // probe on the hot path).
  Runtime runtime;
  Class cachedReceiverClass = Nil;
  Class cachedDispatchClass = Nil;
};

#include "NativeApiJSCMarshalling.mm"

#include "NativeApiJSCGsd.mm"


void* lookupGeneratedEngineObjCGsdInvoker(uint64_t dispatchId) {
  return reinterpret_cast<void*>(lookupObjCGsdInvoker(dispatchId));
}

bool tryCallGeneratedEngineObjCSelector(
    Runtime& runtime, const std::shared_ptr<NativeApiBridge>& bridge,
    id receiver, const NativeApiPreparedObjCInvocation& prepared,
    const Value* args, size_t count, Class dispatchSuperClass, Value* result) {
  if (result == nullptr || receiver == nil ||
      !prepared.gsdEngineCallable || dispatchSuperClass != Nil ||
      count != prepared.gsdEngineArgumentCount) {
    return false;
  }

  auto invoker = reinterpret_cast<ObjCGsdInvoker>(prepared.engineInvoker);
  GsdObjCContext ctx{runtime,  bridge,    receiver, prepared.selector,
                     runtime.context(), nullptr,    prepared.signature.returnType};
  ctx.valueArguments = args;
  ctx.materializeValueResult = true;
  if (!invoker(ctx)) {
    return false;
  }
  *result = std::move(ctx.valueResult);
  return true;
}

JSValueRef setJSCEnginePreparedObjCResult(
    Runtime& runtime, const std::shared_ptr<NativeApiBridge>& bridge,
    id receiver, const NativeApiPreparedObjCInvocation& prepared,
    const std::shared_ptr<NativeApiObjectHostObject>& receiverHostObject,
    const std::optional<Object>& initializerClassWrapper,
    size_t providedCount, const JSValueRef arguments[],
    Class dispatchSuperClass) {
  const NativeApiSignature& signature = prepared.signature;
  if (receiver == nil || signature.variadic ||
      unsupportedEngineType(signature.returnType)) {
    throw JSError(runtime,
                  "Objective-C selector is not supported by JSC engine: " +
                      prepared.selectorName);
  }

  const bool isNSErrorOutMethod = prepared.isNSErrorOutMethod;
  if (isNSErrorOutMethod) {
    size_t expected = signature.argumentTypes.size();
    if (providedCount > expected || providedCount + 1 < expected) {
      throw JSError(
          runtime, "Actual arguments count: \"" + std::to_string(providedCount) +
                       "\". Expected: \"" + std::to_string(expected) + "\".");
    }
  } else if (providedCount != signature.argumentTypes.size()) {
    throw JSError(
        runtime, "Actual arguments count: \"" + std::to_string(providedCount) +
                     "\". Expected: \"" +
                     std::to_string(signature.argumentTypes.size()) + "\".");
  }

  // GSD fast path: the generated invoker reads args directly from the JSC
  // arguments, calls objc_msgSend with a typed cast, and produces the JS
  // return value — bypassing all generic marshalling.
  if (prepared.gsdEngineCallable && dispatchSuperClass == Nil &&
      providedCount == prepared.gsdEngineArgumentCount &&
      !initializerClassWrapper && !isNSErrorOutMethod) {
    auto invoker = reinterpret_cast<ObjCGsdInvoker>(prepared.engineInvoker);
    GsdObjCContext ctx{runtime,  bridge,    receiver, prepared.selector,
                       runtime.context(), arguments, signature.returnType};
    if (invoker(ctx)) {
      return ctx.result;
    }
  }

  if (dispatchSuperClass == Nil && !initializerClassWrapper &&
      providedCount <= 2) {
    Value fastArgs[2];
    for (size_t i = 0; i < providedCount; i++) {
      fastArgs[i] = Value::borrowed(runtime, arguments[i]);
    }
    Value fastResult;
    if (tryCallFastEngineObjCSelector(runtime, bridge, receiver, prepared,
                                      fastArgs, providedCount, Nil,
                                      &fastResult)) {
      return fastResult.local(runtime);
    }
  }

  NativeApiArgumentFrame frame(signature.argumentTypes.size());
  for (size_t i = 0; i < providedCount; i++) {
    if (!prepareJSCEngineArgument(runtime, bridge, signature.argumentTypes[i],
                                  arguments[i], frame, i)) {
      throw JSError(runtime,
                    "Objective-C argument is not supported by JSC engine: " +
                        prepared.selectorName);
    }
  }

  const bool hasImplicitNSErrorOutArg =
      isNSErrorOutMethod && providedCount + 1 == signature.argumentTypes.size();
  NSError* implicitNSError = nil;
  if (hasImplicitNSErrorOutArg) {
    size_t outArgIndex = signature.argumentTypes.size() - 1;
    void* target = frame.storageAt(outArgIndex, sizeof(NSError**));
    NSError** implicitNSErrorOutArg = &implicitNSError;
    *static_cast<void**>(target) = implicitNSErrorOutArg;
  }

  NativeApiPointerFrame values(signature.argumentTypes.size() + 2);
  size_t valueIndex = 0;
  struct objc_super superReceiver = {receiver, dispatchSuperClass};
  struct objc_super* superReceiverPtr = &superReceiver;
  if (dispatchSuperClass != Nil) {
    values.set(valueIndex++, &superReceiverPtr);
  } else {
    values.set(valueIndex++, &receiver);
  }
  values.set(valueIndex++, const_cast<SEL*>(&prepared.selector));
  for (size_t i = 0; i < signature.argumentTypes.size(); i++) {
    values.set(valueIndex++, frame.values()[i]);
  }

  NativeApiReturnStorage returnStorage(
      nativeSizeForType(signature.returnType));
  performNativeInvocation(runtime, bridge->nativeInvocationInvoker(), [&]() {
    if (prepared.preparedInvoker != nullptr && dispatchSuperClass == Nil) {
      prepared.preparedInvoker(reinterpret_cast<void*>(objc_msgSend),
                               values.data(), returnStorage.data());
    } else {
#if defined(__x86_64__)
      bool isStret = signature.returnType.ffiType->size > 16 &&
                     signature.returnType.ffiType->type == FFI_TYPE_STRUCT;
      void* target = dispatchSuperClass != Nil
                         ? (isStret ? FFI_FN(objc_msgSendSuper_stret)
                                    : FFI_FN(objc_msgSendSuper))
                         : (isStret ? FFI_FN(objc_msgSend_stret)
                                    : FFI_FN(objc_msgSend));
      ffi_call(const_cast<ffi_cif*>(&signature.cif), target,
               returnStorage.data(), values.data());
#else
      ffi_call(const_cast<ffi_cif*>(&signature.cif),
               dispatchSuperClass != Nil ? FFI_FN(objc_msgSendSuper)
                                         : FFI_FN(objc_msgSend),
               returnStorage.data(), values.data());
#endif
    }
  });

  NativeApiType returnType = signature.returnType;
  if (hasImplicitNSErrorOutArg && implicitNSError != nil) {
    const char* errorMessage = [[implicitNSError description] UTF8String];
    throw JSError(
        runtime, errorMessage != nullptr ? errorMessage : "Unknown NSError");
  }
  if (initializerClassWrapper) {
    id resultObject = nil;
    if (isObjectiveCObjectType(returnType)) {
      resultObject = *static_cast<id*>(returnStorage.data());
    }
    if (receiverHostObject != nullptr && resultObject != receiver) {
      receiverHostObject->disownObject(receiver);
    }
    if (resultObject != nil) {
      bridge->setObjectExpando(runtime, resultObject,
                               "__nativeApiClassWrapper",
                               Value(runtime, *initializerClassWrapper));
    }
  }
  return setJSCEngineReturnValue(runtime, bridge, returnType,
                                 returnStorage.data(), prepared.selectorName);
}

JSValueRef NativeApiSelectorGroupCall(
    JSContextRef context, JSObjectRef function, JSObjectRef thisObject,
    size_t argumentCount, const JSValueRef arguments[], JSValueRef* exception) {
  auto* data =
      static_cast<NativeApiSelectorGroupData*>(JSObjectGetPrivate(function));
  if (data == nullptr || data->selectors == nullptr ||
      data->preparedInvocations == nullptr) {
    return JSValueMakeUndefined(context);
  }

  Runtime& runtime = data->runtime;
  try {
    NativeApiRoundTripCacheFrameGuard roundTripFrame(data->bridge);
    if (argumentCount >= data->selectors->size() ||
        (*data->selectors)[argumentCount].selectorName.empty()) {
      throw JSError(runtime,
                    "Objective-C selector is not available for the provided arguments "
                    "count.");
    }

    NativeApiSelectorGroupEntry& entry = (*data->selectors)[argumentCount];
    auto& prepared = (*data->preparedInvocations)[argumentCount];
    Class selectorLookupClass = data->lookupClass;
    id receiver = data->receiverIsClass ? static_cast<id>(data->lookupClass) : nil;
    std::shared_ptr<NativeApiObjectHostObject> receiverHostObject;
    if (!data->receiverIsClass) {
      if (data->boundReceiverState != nullptr) {
        receiver = data->boundReceiverState->object();
        if (receiver == nil) {
          throw JSError(runtime,
                        "Objective-C selector requires a native receiver.");
        }
      } else if (thisObject != nullptr) {
        auto* holder = static_cast<engine::jscengine::HostObjectHolder*>(
            JSObjectGetPrivate(thisObject));
        if (holder != nullptr &&
            holder->typeToken ==
                engine::jscengine::hostObjectTypeToken<
                    NativeApiObjectHostObject>()) {
          receiver =
              static_cast<NativeApiObjectHostObject*>(holder->hostObject.get())
                  ->object();
        }
      }
    }
    if (receiver == nil) {
      throw JSError(runtime,
                    "Objective-C selector requires a native receiver.");
    }

    const bool propertyGetterCall =
        entry.hasMember && entry.member.property && argumentCount == 0;
    const std::string* selectorNamePtr = &entry.selectorName;
    const NativeApiMember* selectedMember =
        entry.hasMember ? &entry.member : nullptr;
    bool callTargetCanPrepare = true;
    if (prepared == nullptr || propertyGetterCall) {
      NativeApiSelectorGroupCallTarget callTarget =
          selectorGroupCallTargetForEntry(receiver, selectorLookupClass,
                                          data->receiverIsClass, entry,
                                          argumentCount);
      selectorNamePtr = callTarget.selectorName;
      selectedMember = callTarget.member;
      callTargetCanPrepare = callTarget.canPrepare;
      if (prepared != nullptr && prepared->selectorName != *selectorNamePtr) {
        prepared = nullptr;
      }
    }
    const std::string& selectorName =
        prepared != nullptr && !propertyGetterCall ? prepared->selectorName
                                                   : *selectorNamePtr;

    if (data->receiverIsClass) {
      Class methodClass = prepared != nullptr ? prepared->receiverClass : Nil;
      if (methodClass == Nil) {
        SEL selector = sel_registerName(selectorName.c_str());
        methodClass =
            NativeApiClassHostObject::classRespondingToClassSelector(
                data->lookupClass, selector);
      }
      if (methodClass == Nil) {
        throw JSError(runtime,
                      "Objective-C selector is not available: " +
                          entry.selectorName);
      }
      selectorLookupClass = methodClass;
      receiver = static_cast<id>(methodClass);
    }
    if (propertyGetterCall && !callTargetCanPrepare) {
      return callObjCSelector(runtime, data->bridge, receiver,
                              data->receiverIsClass, selectorName,
                              selectedMember, nullptr, 0)
          .local(runtime);
    }

    if (prepared == nullptr) {
      if (!data->receiverIsClass) {
        SEL selector = sel_registerName(selectorName.c_str());
        if (class_getInstanceMethod(selectorLookupClass, selector) == nullptr) {
          Class receiverClass = object_getClass(receiver);
          if (class_getInstanceMethod(receiverClass, selector) != nullptr) {
            selectorLookupClass = receiverClass;
          }
        }
      }
      prepared = prepareNativeApiObjCInvocation(
          runtime, data->bridge, selectorLookupClass, data->receiverIsClass,
          selectorName, selectedMember);
      // Look up the engine-neutral GSD invoker for this signature.
      if (prepared->engineInvoker == nullptr) {
        uint64_t dispatchId = dispatchIdForEngineSignature(
            prepared->signature, SignatureCallKind::ObjCMethod);
        if (auto gsdInvoker = lookupObjCGsdInvoker(dispatchId)) {
          prepared->engineInvoker = reinterpret_cast<void*>(gsdInvoker);
          configureGeneratedEngineObjCInvocation(*prepared);
        }
      }
    }

    std::optional<Object> initializerClassWrapper;
    if (!data->receiverIsClass && prepared->isInitMethod) {
      if (!receiverHostObject) {
        if (data->boundReceiverState != nullptr) {
          if (auto boundReceiver = data->boundReceiver.lock()) {
            receiverHostObject = std::move(boundReceiver);
          }
        } else if (thisObject != nullptr) {
          auto* holder = static_cast<engine::jscengine::HostObjectHolder*>(
              JSObjectGetPrivate(thisObject));
          if (holder != nullptr &&
              holder->typeToken ==
                  engine::jscengine::hostObjectTypeToken<
                      NativeApiObjectHostObject>()) {
            receiverHostObject =
                std::static_pointer_cast<NativeApiObjectHostObject>(
                    holder->hostObject);
          }
        }
      }
      Value classWrapperValue = data->bridge->findObjectExpando(
          runtime, receiver, "__nativeApiClassWrapper");
      if (classWrapperValue.isObject()) {
        initializerClassWrapper.emplace(classWrapperValue.asObject(runtime));
      }
      data->bridge->forgetRoundTripValue(receiver);
      data->bridge->forgetObjectExpandos(receiver);
    }

    Class dispatchClass = Nil;
    if (!data->receiverIsClass) {
      Class receiverClass = object_getClass(receiver);
      if (receiverClass == data->cachedReceiverClass) {
        dispatchClass = data->cachedDispatchClass;
      } else {
        dispatchClass = dispatchSuperclassForEngineDerivedReceiver(
            receiver, data->lookupClass);
        data->cachedReceiverClass = receiverClass;
        data->cachedDispatchClass = dispatchClass;
      }
    }
    return setJSCEnginePreparedObjCResult(
        runtime, data->bridge, receiver, *prepared, receiverHostObject,
        initializerClassWrapper, argumentCount, arguments, dispatchClass);
  } catch (const std::exception& error) {
    engine::jscengine::setException(context, exception, error);
    return JSValueMakeUndefined(context);
  }
}

void NativeApiSelectorGroupFinalize(JSObjectRef function) {
  delete static_cast<NativeApiSelectorGroupData*>(
      JSObjectGetPrivate(function));
}

JSClassRef NativeApiSelectorGroupFunctionClass(Runtime& runtime) {
  auto state = runtime.state();
  if (state->selectorGroupFunctionClass == nullptr) {
    JSClassDefinition definition = kJSClassDefinitionEmpty;
    definition.className = "NativeScriptEngineSelectorGroupFunction";
    definition.callAsFunction = NativeApiSelectorGroupCall;
    definition.finalize = NativeApiSelectorGroupFinalize;
    state->selectorGroupFunctionClass = JSClassCreate(&definition);
  }
  return state->selectorGroupFunctionClass;
}

Function CreateNativeApiSelectorGroupFunctionImpl(
    Runtime& runtime, std::shared_ptr<NativeApiBridge> bridge,
    Class lookupClass, bool receiverIsClass,
    std::shared_ptr<std::vector<NativeApiSelectorGroupEntry>> selectors,
    std::shared_ptr<
        std::vector<std::shared_ptr<NativeApiPreparedObjCInvocation>>>
        preparedInvocations,
    std::weak_ptr<NativeApiObjectHostObject> boundReceiver,
    std::shared_ptr<NativeApiObjectLifetimeState> boundReceiverState =
        nullptr) {
  auto* data = new NativeApiSelectorGroupData(
      runtime.state(), std::move(bridge), lookupClass, receiverIsClass,
      std::move(selectors), std::move(preparedInvocations),
      std::move(boundReceiver), std::move(boundReceiverState));
  JSObjectRef function =
      JSObjectMake(runtime.context(),
                   NativeApiSelectorGroupFunctionClass(runtime), data);
  engine::jscengine::setFunctionPrototype(runtime.context(), function);

  JSStringRef property = engine::jscengine::makeJSString("name");
  JSStringRef functionName =
      engine::jscengine::makeJSString("__nativeSelectorGroup");
  JSValueRef value = JSValueMakeString(runtime.context(), functionName);
  JSObjectSetProperty(runtime.context(), function, property, value,
                      kJSPropertyAttributeReadOnly, nullptr);
  JSStringRelease(functionName);
  JSStringRelease(property);

  Value functionValue(runtime, function);
  return functionValue.asObject(runtime).asFunction(runtime);
}

Function CreateNativeApiSelectorGroupFunction(
    Runtime& runtime, std::shared_ptr<NativeApiBridge> bridge,
    Class lookupClass, bool receiverIsClass,
    std::shared_ptr<std::vector<NativeApiSelectorGroupEntry>> selectors,
    std::shared_ptr<
        std::vector<std::shared_ptr<NativeApiPreparedObjCInvocation>>>
        preparedInvocations) {
  return CreateNativeApiSelectorGroupFunctionImpl(
      runtime, std::move(bridge), lookupClass, receiverIsClass,
      std::move(selectors), std::move(preparedInvocations), {}, nullptr);
}

Function CreateNativeApiBoundSelectorGroupFunction(
    Runtime& runtime, std::shared_ptr<NativeApiBridge> bridge, Class lookupClass,
    std::shared_ptr<NativeApiObjectHostObject> receiverHostObject,
    std::shared_ptr<std::vector<NativeApiSelectorGroupEntry>> selectors,
    std::shared_ptr<
        std::vector<std::shared_ptr<NativeApiPreparedObjCInvocation>>>
        preparedInvocations) {
  return CreateNativeApiSelectorGroupFunctionImpl(
      runtime, std::move(bridge), lookupClass, false, std::move(selectors),
      std::move(preparedInvocations), receiverHostObject,
      receiverHostObject != nullptr ? receiverHostObject->lifetimeState()
                                    : nullptr);
}


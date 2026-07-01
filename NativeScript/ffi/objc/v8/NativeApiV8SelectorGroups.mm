// Included by NativeApiV8.mm inside the NativeScript anonymous namespace.

struct NativeApiSelectorGroupData {
  NativeApiSelectorGroupData(
      std::shared_ptr<engine::v8engine::RuntimeState> state,
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

  std::shared_ptr<engine::v8engine::RuntimeState> state;
  std::shared_ptr<NativeApiBridge> bridge;
  Class lookupClass = Nil;
  bool receiverIsClass = false;
  std::shared_ptr<std::vector<NativeApiSelectorGroupEntry>> selectors;
  std::shared_ptr<
      std::vector<std::shared_ptr<NativeApiPreparedObjCInvocation>>>
      preparedInvocations;
  std::weak_ptr<NativeApiObjectHostObject> boundReceiver;
  std::shared_ptr<NativeApiObjectLifetimeState> boundReceiverState;
  // Cached Runtime wrapper reused per call (avoids per-call shared_ptr
  // atomic refcount on the hot dispatch path).
  Runtime runtime;
  // 1-entry memo for dispatchSuperclassForEngineDerivedReceiver.
  Class cachedReceiverClass = Nil;
  Class cachedDispatchClass = Nil;
};

#include "NativeApiV8Marshalling.mm"

#include "NativeApiV8Gsd.mm"


void* lookupGeneratedEngineObjCGsdInvoker(uint64_t dispatchId) {
  return reinterpret_cast<void*>(lookupObjCGsdInvoker(dispatchId));
}

bool tryCallGeneratedEngineObjCSelector(
    Runtime&, const std::shared_ptr<NativeApiBridge>&, id,
    const NativeApiPreparedObjCInvocation&, const Value*, size_t, Class,
    Value*) {
  return false;
}

void setV8EnginePreparedObjCResult(
    Runtime& runtime, const std::shared_ptr<NativeApiBridge>& bridge,
    id receiver, const NativeApiPreparedObjCInvocation& prepared,
    const std::shared_ptr<NativeApiObjectHostObject>& receiverHostObject,
    const std::optional<Object>& initializerClassWrapper,
    const v8::FunctionCallbackInfo<v8::Value>& info,
    Class dispatchSuperClass) {
  const NativeApiSignature& signature = prepared.signature;
  if (receiver == nil || signature.variadic ||
      unsupportedEngineType(signature.returnType)) {
    throw JSError(runtime,
                  "Objective-C selector is not supported by V8 engine: " +
                      prepared.selectorName);
  }

  const bool isNSErrorOutMethod = prepared.isNSErrorOutMethod;
  const size_t providedCount = static_cast<size_t>(info.Length());
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

  // GSD fast path: the generated invoker reads args directly from
  // FunctionCallbackInfo, calls objc_msgSend with a typed cast, and sets the
  // return via the V8 API — all in one generated function. Bypasses all
  // generic marshalling.
  if (prepared.gsdEngineCallable && dispatchSuperClass == Nil &&
      providedCount == prepared.gsdEngineArgumentCount &&
      !initializerClassWrapper && !isNSErrorOutMethod) {
    auto invoker = reinterpret_cast<ObjCGsdInvoker>(prepared.engineInvoker);
    GsdObjCContext ctx{runtime,
                       bridge,
                       receiver,
                       prepared.selector,
                       info,
                       runtime.isolate(),
                       runtime.context(),
                       signature.returnType};
    if (invoker(ctx)) {
      return;
    }
  }

  if (dispatchSuperClass == Nil && !initializerClassWrapper &&
      providedCount <= 2) {
    Value fastArgs[2];
    for (size_t i = 0; i < providedCount; i++) {
      fastArgs[i] = Value::borrowed(runtime, info[static_cast<int>(i)]);
    }
    Value fastResult;
    if (tryCallFastEngineObjCSelector(runtime, bridge, receiver, prepared,
                                      fastArgs, providedCount, Nil,
                                      &fastResult)) {
      info.GetReturnValue().Set(fastResult.local(runtime));
      return;
    }
  }

  NativeApiArgumentFrame frame(signature.argumentTypes.size());
  for (size_t i = 0; i < providedCount; i++) {
    if (!prepareV8EngineArgument(runtime, bridge, signature.argumentTypes[i],
                                 info[static_cast<int>(i)], frame, i)) {
      throw JSError(runtime,
                    "Objective-C argument is not supported by V8 engine: " +
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
  setV8EngineReturnValue(runtime, bridge, returnType, returnStorage.data(),
                         prepared.selectorName, info);
}

void NativeApiSelectorGroupCallback(
    const v8::FunctionCallbackInfo<v8::Value>& info) {
  auto* data = static_cast<NativeApiSelectorGroupData*>(
      info.Data().As<v8::External>()->Value());
  if (data == nullptr || data->selectors == nullptr ||
      data->preparedInvocations == nullptr) {
    return;
  }

  Runtime& runtime = data->runtime;
  v8::HandleScope handleScope(runtime.isolate());
  try {
    NativeApiRoundTripCacheFrameGuard roundTripFrame(data->bridge);
    size_t count = static_cast<size_t>(info.Length());
    if (count >= data->selectors->size() ||
        (*data->selectors)[count].selectorName.empty()) {
      throw JSError(runtime,
                    "Objective-C selector is not available for the provided arguments "
                    "count.");
    }

    NativeApiSelectorGroupEntry& entry = (*data->selectors)[count];
    auto& prepared = (*data->preparedInvocations)[count];
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
      } else {
        // Use raw pointer for receiver lookup (avoids atomic ref count on hot path).
        // The receiver host object is kept alive by the V8 GC handle.
        auto* rawHost = v8HostObjectRaw<NativeApiObjectHostObject>(info.This());
        if (rawHost != nullptr) {
          receiver = rawHost->object();
          // Only get shared_ptr if needed for init handling below.
        }
      }
    }
    if (receiver == nil) {
      throw JSError(runtime,
                    "Objective-C selector requires a native receiver.");
    }

    const bool propertyGetterCall =
        entry.hasMember && entry.member.property && count == 0;
    const std::string* selectorNamePtr = &entry.selectorName;
    const NativeApiMember* selectedMember =
        entry.hasMember ? &entry.member : nullptr;
    bool callTargetCanPrepare = true;
    if (prepared == nullptr || propertyGetterCall) {
      NativeApiSelectorGroupCallTarget callTarget =
          selectorGroupCallTargetForEntry(receiver, selectorLookupClass,
                                          data->receiverIsClass, entry, count);
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
      Value result = callObjCSelector(runtime, data->bridge, receiver,
                                      data->receiverIsClass, selectorName,
                                      selectedMember, nullptr, 0);
      info.GetReturnValue().Set(result.local(runtime));
      return;
    }

    if (prepared == nullptr) {
      // First call: resolve the method and cache the prepared invocation.
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
      // Init methods need the shared_ptr for disown handling.
      if (!receiverHostObject) {
        if (data->boundReceiverState != nullptr) {
          if (auto boundReceiver = data->boundReceiver.lock()) {
            receiverHostObject = std::move(boundReceiver);
          }
        }
      }
      if (!receiverHostObject) {
        receiverHostObject =
            v8HostObject<NativeApiObjectHostObject>(runtime, info.This());
      }
      Value classWrapperValue = data->bridge->findObjectExpando(
          runtime, receiver, "__nativeApiClassWrapper");
      if (classWrapperValue.isObject()) {
        initializerClassWrapper.emplace(classWrapperValue.asObject(runtime));
      }
      data->bridge->forgetRoundTripValue(receiver);
      data->bridge->forgetObjectExpandos(receiver);
    }

    // For JS-extended receivers, dispatch from the immediate native
    // superclass so native-derived overrides are honored (not the method's
    // defining ancestor, which would skip intermediate native overrides).
    // dispatchSuperclassForEngineDerivedReceiver is a pure function of the
    // receiver's class + lookupClass, so memoize it (1-entry cache) to avoid a
    // per-call class_conformsToProtocol on the hot path.
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
    // Inline GSD fast path: skip the setV8EnginePreparedObjCResult call and its
    // argument-count/NSError preamble entirely for the common case. The
    // generated invoker reads args, calls objc_msgSend, and sets the return.
    if (prepared->gsdEngineCallable && dispatchClass == Nil &&
        !prepared->isInitMethod &&
        count == prepared->gsdEngineArgumentCount) {
      auto invoker = reinterpret_cast<ObjCGsdInvoker>(prepared->engineInvoker);
      GsdObjCContext ctx{runtime,
                         data->bridge,
                         receiver,
                         prepared->selector,
                         info,
                         runtime.isolate(),
                         runtime.context(),
                         prepared->signature.returnType};
      if (invoker(ctx)) {
        return;
      }
    }
    setV8EnginePreparedObjCResult(runtime, data->bridge, receiver, *prepared,
                                  receiverHostObject, initializerClassWrapper,
                                  info, dispatchClass);
  } catch (const std::exception& exception) {
    engine::v8engine::throwV8Exception(info.GetIsolate(), exception);
  }
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
  auto data = std::make_shared<NativeApiSelectorGroupData>(
      runtime.state(), std::move(bridge), lookupClass, receiverIsClass,
      std::move(selectors), std::move(preparedInvocations),
      std::move(boundReceiver), std::move(boundReceiverState));
  auto* rawData = data.get();
  runtime.state()->retainedNativeData.push_back(std::move(data));

  v8::Local<v8::External> external =
      v8::External::New(runtime.isolate(), rawData);
  v8::Local<v8::FunctionTemplate> functionTemplate =
      v8::FunctionTemplate::New(runtime.isolate(),
                                NativeApiSelectorGroupCallback, external);
  v8::Local<v8::Function> function =
      functionTemplate->GetFunction(runtime.context()).ToLocalChecked();
  function->SetName(
      engine::v8engine::makeV8String(runtime.isolate(), "__nativeSelectorGroup"));
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


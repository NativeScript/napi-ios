#include "HermesFastNativeApiPrivate.h"

#ifdef TARGET_ENGINE_HERMES

namespace nativescript {
namespace {
inline bool canUseHermesFrameArgument(MDTypeKind kind) {
  switch (kind) {
    case mdTypeBool:
    case mdTypeChar:
    case mdTypeUChar:
    case mdTypeUInt8:
    case mdTypeSShort:
    case mdTypeUShort:
    case mdTypeSInt:
    case mdTypeUInt:
    case mdTypeSLong:
    case mdTypeULong:
    case mdTypeSInt64:
    case mdTypeUInt64:
    case mdTypeFloat:
    case mdTypeDouble:
    case mdTypeAnyObject:
    case mdTypeProtocolObject:
    case mdTypeClassObject:
    case mdTypeInstanceObject:
    case mdTypeNSStringObject:
    case mdTypeNSMutableStringObject:
    case mdTypeClass:
    case mdTypeSelector:
      return true;
    default:
      return false;
  }
}

inline bool canUseHermesFrameArguments(Cif* cif) {
  if (cif == nullptr) {
    return false;
  }

  for (const auto& argType : cif->argTypes) {
    if (argType == nullptr || !canUseHermesFrameArgument(argType->kind)) {
      return false;
    }
  }

  return true;
}

const napi_value* prepareHermesInvocationArgs(napi_env env, Cif* cif,
                                              size_t actualArgc,
                                              const napi_value* rawArgs,
                                              napi_value* stackArgs,
                                              size_t stackCapacity,
                                              std::vector<napi_value>* heapArgs) {
  if (cif == nullptr || cif->argc == 0) {
    return nullptr;
  }

  if (actualArgc == cif->argc && rawArgs != nullptr) {
    return rawArgs;
  }

  napi_value jsUndefined = nullptr;
  napi_get_undefined(env, &jsUndefined);

  if (cif->argc <= stackCapacity) {
    for (unsigned int i = 0; i < cif->argc; i++) {
      stackArgs[i] = i < actualArgc && rawArgs != nullptr ? rawArgs[i] : jsUndefined;
    }
    return stackArgs;
  }

  heapArgs->assign(cif->argc, jsUndefined);
  const size_t copyArgc = std::min(actualArgc, static_cast<size_t>(cif->argc));
  if (copyArgc > 0 && rawArgs != nullptr) {
    std::memcpy(heapArgs->data(), rawArgs, copyArgc * sizeof(napi_value));
  }
  return heapArgs->data();
}

void copyHermesFrameArgs(const uint64_t* argsBase, size_t argc,
                         napi_value* args) {
  if (argsBase == nullptr || args == nullptr) {
    return;
  }
  for (size_t i = 0; i < argc; i++) {
    args[i] = hermesDispatchFrameArg(argsBase, i);
  }
}

inline bool selectorEndsWith(SEL selector, const char* suffix) {
  if (selector == nullptr || suffix == nullptr) {
    return false;
  }

  const char* selectorName = sel_getName(selector);
  if (selectorName == nullptr) {
    return false;
  }

  const size_t selectorLength = std::strlen(selectorName);
  const size_t suffixLength = std::strlen(suffix);
  return selectorLength >= suffixLength &&
         std::strcmp(selectorName + selectorLength - suffixLength, suffix) == 0;
}

inline bool computeNSErrorOutMethodSignature(SEL selector, Cif* cif) {
  if (cif == nullptr || cif->argc == 0 || cif->argTypes.empty() ||
      !selectorEndsWith(selector, "error:")) {
    return false;
  }

  auto lastArgType = cif->argTypes[cif->argc - 1];
  return lastArgType != nullptr && lastArgType->type == &ffi_type_pointer;
}

inline bool isNSErrorOutMethodSignature(MethodDescriptor* descriptor, Cif* cif) {
  if (descriptor == nullptr) {
    return computeNSErrorOutMethodSignature(nullptr, cif);
  }

  if (!descriptor->nserrorOutSignatureCached) {
    descriptor->nserrorOutSignature =
        computeNSErrorOutMethodSignature(descriptor->selector, cif);
    descriptor->nserrorOutSignatureCached = true;
  }
  return descriptor->nserrorOutSignature;
}

inline void throwArgumentsCountError(napi_env env, size_t actualCount,
                                     size_t expectedCount) {
  std::string message = "Actual arguments count: \"" +
                        std::to_string(actualCount) + "\". Expected: \"" +
                        std::to_string(expectedCount) + "\".";
  napi_throw_error(env, "NativeScriptException", message.c_str());
}

inline bool computeBlockFallbackSelector(SEL selector) {
  return selector == @selector(methodWithSimpleBlock:) ||
         selector == @selector(methodRetainingBlock:) ||
         selector == @selector(methodWithBlock:) ||
         selector == @selector(methodWithComplexBlock:);
}

inline bool isBlockFallbackSelector(MethodDescriptor* descriptor) {
  if (descriptor == nullptr) {
    return false;
  }
  if (!descriptor->hermesBlockFallbackCached) {
    descriptor->hermesBlockFallback =
        computeBlockFallbackSelector(descriptor->selector);
    descriptor->hermesBlockFallbackCached = true;
  }
  return descriptor->hermesBlockFallback;
}

struct HermesResolvedSelf {
  id self = nil;
  bool receiverIsClass = false;
  Class receiverClass = nil;
  bool requiresSuperCall = false;
};

bool receiverClassRequiresHermesSuperCall(Class receiverClass);

HermesResolvedSelf resolveHermesSelf(napi_env env, napi_value jsThis,
                                     ObjCClassMember* method) {
  id self = nil;
  ObjCBridgeState* state =
      method != nullptr ? method->bridgeState : ObjCBridgeState::InstanceData(env);

  struct ReceiverCacheEntry {
    napi_env env = nullptr;
    ObjCClassMember* method = nullptr;
    uint64_t rawValue = 0;
    HermesResolvedSelf resolved;
    uint64_t objectRefsGeneration = 0;
  };

  static thread_local ReceiverCacheEntry lastReceiver;
  const uint64_t rawThis = hermesRawValueBits(jsThis);

  auto makeResolvedSelfFromFields =
      [](id self, bool receiverIsClass, Class receiverClass,
         bool requiresSuperCall) {
        HermesResolvedSelf result;
        result.self = self;
        result.receiverIsClass = receiverIsClass;
        result.receiverClass = receiverClass;
        result.requiresSuperCall = requiresSuperCall;
        return result;
      };

  auto receiverValuesAreValid = [&](id self, bool receiverIsClass,
                                    uint64_t objectRefsGeneration) {
    return self != nil &&
           (receiverIsClass ||
            (state != nullptr && objectRefsGeneration != 0 &&
             state->currentObjectRefsGeneration() == objectRefsGeneration));
  };

  auto receiverCacheEntryIsValid = [&](const ReceiverCacheEntry& entry) {
    return receiverValuesAreValid(entry.resolved.self,
                                  entry.resolved.receiverIsClass,
                                  entry.objectRefsGeneration);
  };

  if (rawThis != 0 && method != nullptr &&
      method->hermesReceiverCacheEnv == env &&
      method->hermesReceiverCacheRawThis == rawThis &&
      receiverValuesAreValid(method->hermesReceiverCacheSelf,
                             method->hermesReceiverCacheReceiverIsClass,
                             method->hermesReceiverCacheObjectRefsGeneration)) {
    return makeResolvedSelfFromFields(
        method->hermesReceiverCacheSelf,
        method->hermesReceiverCacheReceiverIsClass,
        method->hermesReceiverCacheReceiverClass,
        method->hermesReceiverCacheRequiresSuperCall);
  }

  if (rawThis != 0 && lastReceiver.env == env &&
      lastReceiver.method == method && lastReceiver.rawValue == rawThis &&
      receiverCacheEntryIsValid(lastReceiver)) {
    return lastReceiver.resolved;
  }

  auto makeResolvedSelf = [](id resolved) {
    HermesResolvedSelf result;
    if (resolved == nil) {
      return result;
    }

    result.self = resolved;
    result.receiverIsClass = object_isClass(resolved);
    result.receiverClass =
        result.receiverIsClass ? static_cast<Class>(resolved)
                               : object_getClass(resolved);
    result.requiresSuperCall =
        receiverClassRequiresHermesSuperCall(result.receiverClass);
    return result;
  };

  auto rememberReceiver = [&](const HermesResolvedSelf& resolved) {
    if (resolved.self == nil || rawThis == 0) {
      return;
    }

    id nativeSelf = resolved.self;
    const bool classObject = resolved.receiverIsClass;
    uint64_t objectRefsGeneration = 0;
    if (!classObject) {
      if (state == nullptr || !state->hasObjectRef(nativeSelf)) {
        return;
      }
      objectRefsGeneration = state->currentObjectRefsGeneration();
    }

    lastReceiver.env = env;
    lastReceiver.method = method;
    lastReceiver.rawValue = rawThis;
    lastReceiver.resolved = resolved;
    lastReceiver.objectRefsGeneration = objectRefsGeneration;

    if (method != nullptr) {
      method->hermesReceiverCacheEnv = env;
      method->hermesReceiverCacheRawThis = rawThis;
      method->hermesReceiverCacheSelf = resolved.self;
      method->hermesReceiverCacheReceiverIsClass = resolved.receiverIsClass;
      method->hermesReceiverCacheReceiverClass = resolved.receiverClass;
      method->hermesReceiverCacheRequiresSuperCall = resolved.requiresSuperCall;
      method->hermesReceiverCacheObjectRefsGeneration = objectRefsGeneration;
    }
  };

  auto finishReceiver = [&](id resolved) {
    HermesResolvedSelf result = makeResolvedSelf(resolved);
    rememberReceiver(result);
    return result;
  };

  napi_status unwrapStatus = napi_invalid_arg;
  if (jsThis != nullptr) {
    unwrapStatus = napi_unwrap(env, jsThis, reinterpret_cast<void**>(&self));
    if (unwrapStatus == napi_ok && self != nil) {
      return finishReceiver(self);
    }
  }

  if (state != nullptr && jsThis != nullptr) {
    state->tryResolveBridgedTypeConstructor(env, jsThis, &self);
    if (self != nil) {
      return finishReceiver(self);
    }
  }

  if (self == nil && jsThis != nullptr) {
    napi_value nativePointerValue = nullptr;
    if (napi_get_named_property(env, jsThis, kHermesNativePointerProperty,
                                &nativePointerValue) == napi_ok &&
        Pointer::isInstance(env, nativePointerValue)) {
      Pointer* nativePointer = Pointer::unwrap(env, nativePointerValue);
      if (nativePointer != nullptr && nativePointer->data != nullptr) {
        self = static_cast<id>(nativePointer->data);
      }
    }
  }

  if (self != nil) {
    return finishReceiver(self);
  }

  bool shouldUseClassFallback = false;
  if (method != nullptr && method->cls != nullptr &&
      method->cls->nativeClass != nil) {
    if (method->classMethod) {
      shouldUseClassFallback = true;
      napi_valuetype jsType = napi_undefined;
      if (jsThis != nullptr && napi_typeof(env, jsThis, &jsType) == napi_ok &&
          jsType == napi_function) {
        napi_value definingConstructor = get_ref_value(env, method->cls->constructor);
        if (definingConstructor != nullptr) {
          bool isSameConstructor = false;
          if (napi_strict_equals(env, jsThis, definingConstructor,
                                 &isSameConstructor) == napi_ok &&
              !isSameConstructor) {
            shouldUseClassFallback = false;
          }
        }
      }
    } else {
      napi_valuetype jsType = napi_undefined;
      if (napi_typeof(env, jsThis, &jsType) == napi_ok &&
          jsType == napi_function) {
        shouldUseClassFallback = true;
      }
    }
  }

  if (shouldUseClassFallback) {
    return finishReceiver(static_cast<id>(method->cls->nativeClass));
  }

  napi_throw_error(env, "NativeScriptException",
                   "There was no native counterpart to the JavaScript object. "
                   "Native API was called with a likely plain object.");
  return {};
}

Cif* hermesMemberCif(napi_env env, ObjCClassMember* member,
                     EngineDirectMemberKind kind,
                     MethodDescriptor** descriptorOut) {
  if (member == nullptr || descriptorOut == nullptr) {
    return nullptr;
  }

  switch (kind) {
    case EngineDirectMemberKind::Method:
      if (!member->overloads.empty()) {
        return nullptr;
      }
      *descriptorOut = &member->methodOrGetter;
      if (member->cif == nullptr) {
        member->cif = member->bridgeState->getMethodCif(
            env, member->methodOrGetter.signatureOffset);
      }
      return member->cif;

    case EngineDirectMemberKind::Getter:
      *descriptorOut = &member->methodOrGetter;
      if (member->cif == nullptr) {
        member->cif = member->bridgeState->getMethodCif(
            env, member->methodOrGetter.signatureOffset);
      }
      return member->cif;

    case EngineDirectMemberKind::Setter:
      *descriptorOut = &member->setter;
      if (member->setterCif == nullptr) {
        member->setterCif = member->bridgeState->getMethodCif(
            env, member->setter.signatureOffset);
      }
      return member->setterCif;
  }
}

bool receiverClassRequiresHermesSuperCall(Class receiverClass) {
  if (receiverClass == nil) {
    return false;
  }

  static thread_local Class lastReceiverClass = nil;
  static thread_local bool lastRequiresSuperCall = false;
  if (receiverClass == lastReceiverClass) {
    return lastRequiresSuperCall;
  }

  static thread_local std::unordered_map<Class, bool> superCallCache;
  auto cached = superCallCache.find(receiverClass);
  if (cached != superCallCache.end()) {
    lastReceiverClass = receiverClass;
    lastRequiresSuperCall = cached->second;
    return cached->second;
  }

  const bool requiresSuperCall =
      class_conformsToProtocol(receiverClass, @protocol(ObjCBridgeClassBuilderProtocol));
  superCallCache.emplace(receiverClass, requiresSuperCall);
  lastReceiverClass = receiverClass;
  lastRequiresSuperCall = requiresSuperCall;
  return requiresSuperCall;
}

ObjCEngineDirectInvoker ensureHermesObjCEngineDirectInvoker(
    Cif* cif, MethodDescriptor* descriptor, uint8_t dispatchFlags) {
  if (cif == nullptr || descriptor == nullptr || cif->signatureHash == 0) {
    return nullptr;
  }

  if (!descriptor->dispatchLookupCached ||
      descriptor->dispatchLookupSignatureHash != cif->signatureHash ||
      descriptor->dispatchLookupFlags != dispatchFlags) {
    descriptor->dispatchLookupSignatureHash = cif->signatureHash;
    descriptor->dispatchLookupFlags = dispatchFlags;
    descriptor->dispatchId = composeSignatureDispatchId(
        cif->signatureHash, SignatureCallKind::ObjCMethod, dispatchFlags);
    descriptor->preparedInvoker =
        reinterpret_cast<void*>(lookupObjCPreparedInvoker(descriptor->dispatchId));
    descriptor->napiInvoker =
        reinterpret_cast<void*>(lookupObjCNapiInvoker(descriptor->dispatchId));
    descriptor->engineDirectInvoker =
        reinterpret_cast<void*>(lookupObjCEngineDirectInvoker(descriptor->dispatchId));
    descriptor->hermesDirectReturnInvoker = reinterpret_cast<void*>(
        lookupObjCHermesDirectReturnInvoker(descriptor->dispatchId));
    descriptor->hermesFrameDirectReturnInvoker = reinterpret_cast<void*>(
        lookupObjCHermesFrameDirectReturnInvoker(descriptor->dispatchId));
    descriptor->dispatchLookupCached = true;
  }

  return reinterpret_cast<ObjCEngineDirectInvoker>(
      descriptor->engineDirectInvoker);
}

ObjCHermesDirectReturnInvoker ensureHermesObjCDirectReturnInvoker(
    Cif* cif, MethodDescriptor* descriptor, uint8_t dispatchFlags) {
  ensureHermesObjCEngineDirectInvoker(cif, descriptor, dispatchFlags);
  return descriptor != nullptr
             ? reinterpret_cast<ObjCHermesDirectReturnInvoker>(
                   descriptor->hermesDirectReturnInvoker)
             : nullptr;
}

ObjCHermesFrameDirectReturnInvoker ensureHermesObjCFrameDirectReturnInvoker(
    Cif* cif, MethodDescriptor* descriptor, uint8_t dispatchFlags) {
  ensureHermesObjCEngineDirectInvoker(cif, descriptor, dispatchFlags);
  return descriptor != nullptr
             ? reinterpret_cast<ObjCHermesFrameDirectReturnInvoker>(
                   descriptor->hermesFrameDirectReturnInvoker)
             : nullptr;
}

CFunctionEngineDirectInvoker ensureHermesCFunctionEngineDirectInvoker(
    CFunction* function, Cif* cif) {
  if (function == nullptr || cif == nullptr || cif->signatureHash == 0) {
    if (function != nullptr) {
      function->dispatchLookupCached = true;
      function->dispatchLookupSignatureHash = 0;
      function->dispatchId = 0;
      function->preparedInvoker = nullptr;
      function->napiInvoker = nullptr;
      function->engineDirectInvoker = nullptr;
      function->v8Invoker = nullptr;
      function->hermesDirectReturnInvoker = nullptr;
      function->hermesFrameDirectReturnInvoker = nullptr;
    }
    return nullptr;
  }

  if (!function->dispatchLookupCached ||
      function->dispatchLookupSignatureHash != cif->signatureHash) {
    function->dispatchLookupSignatureHash = cif->signatureHash;
    function->dispatchId = composeSignatureDispatchId(
        cif->signatureHash, SignatureCallKind::CFunction, function->dispatchFlags);
    function->preparedInvoker =
        reinterpret_cast<void*>(lookupCFunctionPreparedInvoker(function->dispatchId));
    function->napiInvoker =
        reinterpret_cast<void*>(lookupCFunctionNapiInvoker(function->dispatchId));
    function->engineDirectInvoker = reinterpret_cast<void*>(
        lookupCFunctionEngineDirectInvoker(function->dispatchId));
    function->hermesDirectReturnInvoker = reinterpret_cast<void*>(
        lookupCFunctionHermesDirectReturnInvoker(function->dispatchId));
    function->hermesFrameDirectReturnInvoker = reinterpret_cast<void*>(
        lookupCFunctionHermesFrameDirectReturnInvoker(function->dispatchId));
    function->dispatchLookupCached = true;
  }

  return reinterpret_cast<CFunctionEngineDirectInvoker>(
      function->engineDirectInvoker);
}

CFunctionHermesDirectReturnInvoker ensureHermesCFunctionDirectReturnInvoker(
    CFunction* function, Cif* cif) {
  ensureHermesCFunctionEngineDirectInvoker(function, cif);
  return function != nullptr
             ? reinterpret_cast<CFunctionHermesDirectReturnInvoker>(
                   function->hermesDirectReturnInvoker)
             : nullptr;
}

CFunctionHermesFrameDirectReturnInvoker
ensureHermesCFunctionFrameDirectReturnInvoker(CFunction* function, Cif* cif) {
  ensureHermesCFunctionEngineDirectInvoker(function, cif);
  return function != nullptr
             ? reinterpret_cast<CFunctionHermesFrameDirectReturnInvoker>(
                   function->hermesFrameDirectReturnInvoker)
             : nullptr;
}

}  // namespace

napi_value TryCallHermesObjCMemberFastImpl(
    napi_env env, ObjCClassMember* member, napi_value jsThis,
    size_t actualArgc, const napi_value* rawArgs,
    const uint64_t* hermesArgsBase,
    EngineDirectMemberKind kind, bool* handled) {
  if (handled != nullptr) {
    *handled = false;
  }

  if (env == nullptr || member == nullptr || member->bridgeState == nullptr) {
    return nullptr;
  }

  MethodDescriptor* descriptor = nullptr;
  Cif* cif = hermesMemberCif(env, member, kind, &descriptor);
  if (cif == nullptr || cif->isVariadic || cif->returnType == nullptr) {
    return nullptr;
  }

  if (hermesArgsBase != nullptr && !canUseHermesFrameArguments(cif)) {
    return nullptr;
  }

  if (isNSErrorOutMethodSignature(descriptor, cif)) {
    if (!cif->isVariadic &&
        (actualArgc > cif->argc || actualArgc + 1 < cif->argc)) {
      throwArgumentsCountError(env, actualArgc, cif->argc);
      if (handled != nullptr) {
        *handled = true;
      }
    }
    return nullptr;
  }

  if (!cif->isVariadic && actualArgc != cif->argc) {
    return nullptr;
  }

  if (isBlockFallbackSelector(descriptor)) {
    return nullptr;
  }

  HermesResolvedSelf resolvedSelf = resolveHermesSelf(env, jsThis, member);
  id self = resolvedSelf.self;
  if (self == nil) {
    if (handled != nullptr) {
      *handled = true;
    }
    return nullptr;
  }

  const bool receiverIsClass = resolvedSelf.receiverIsClass;
  if (resolvedSelf.requiresSuperCall) {
    return nullptr;
  }

  const bool hasExactHermesFrameArgs =
      hermesArgsBase != nullptr && actualArgc == cif->argc;
  const bool needsObjectReturnContext = cif->generatedDispatchUsesObjectReturnStorage;
  const bool needsRoundTripFrame = needsRoundTripCacheFrame(cif);
  ObjCHermesFrameDirectReturnInvoker frameDirectReturnInvoker =
      hasExactHermesFrameArgs && cif->signatureHash != 0
          ? ensureHermesObjCFrameDirectReturnInvoker(
                cif, descriptor, descriptor->dispatchFlags)
          : nullptr;

  if (frameDirectReturnInvoker != nullptr) {
    if (handled != nullptr) {
      *handled = true;
    }

    EngineDirectRoundTripCacheFrameGuard roundTripCacheFrame(
        env, member->bridgeState, needsRoundTripFrame);

    napi_value directResult = nullptr;
    HermesObjCReturnContext returnContextStorage;
    const HermesObjCReturnContext* returnContext = nullptr;
    if (needsObjectReturnContext) {
      Class declaredClass =
          member->cls != nullptr ? member->cls->nativeClass : nil;
      returnContextStorage = HermesObjCReturnContext{
          member->bridgeState, jsThis, self, declaredClass,
          member->returnOwned, receiverIsClass, member->classMethod,
          kind != EngineDirectMemberKind::Method};
      returnContext = &returnContextStorage;
    }
    @try {
      NativeCallRuntimeUnlockScope unlockRuntime(env);
      if (frameDirectReturnInvoker(
              env, cif, reinterpret_cast<void*>(objc_msgSend), self,
              descriptor->selector, returnContext, hermesArgsBase,
              &directResult)) {
        return directResult;
      }
    } @catch (NSException* exception) {
      std::string message = exception.description.UTF8String;
      NativeScriptException nativeScriptException(message);
      nativeScriptException.ReThrowToJS(env);
      return nullptr;
    }
  }

  const bool hasExactInvocationArgs =
      cif->argc == 0 || (rawArgs != nullptr && actualArgc == cif->argc);
  const napi_value* exactInvocationArgs = cif->argc == 0 ? nullptr : rawArgs;
  const napi_value* preparedInvocationArgs =
      hasExactInvocationArgs ? exactInvocationArgs : nullptr;
  napi_value stackInvocationArgs[16];
  std::vector<napi_value> heapInvocationArgs;
  std::vector<napi_value> frameRawArgs;
  auto getPreparedInvocationArgs = [&]() -> const napi_value* {
    if (preparedInvocationArgs == nullptr && cif->argc != 0) {
      if (rawArgs == nullptr && hermesArgsBase != nullptr) {
        if (actualArgc <= 16) {
          copyHermesFrameArgs(hermesArgsBase, actualArgc, stackInvocationArgs);
          rawArgs = stackInvocationArgs;
        } else {
          frameRawArgs.resize(actualArgc);
          copyHermesFrameArgs(hermesArgsBase, actualArgc,
                              frameRawArgs.data());
          rawArgs = frameRawArgs.data();
        }
      }
      preparedInvocationArgs = prepareHermesInvocationArgs(
          env, cif, actualArgc, rawArgs, stackInvocationArgs, 16,
          &heapInvocationArgs);
    }
    return preparedInvocationArgs;
  };

  ObjCHermesDirectReturnInvoker directReturnInvoker =
      cif->signatureHash != 0
          ? ensureHermesObjCDirectReturnInvoker(cif, descriptor,
                                                descriptor->dispatchFlags)
          : nullptr;

  if (directReturnInvoker != nullptr) {
    if (handled != nullptr) {
      *handled = true;
    }

    EngineDirectRoundTripCacheFrameGuard roundTripCacheFrame(
        env, member->bridgeState, needsRoundTripFrame);

    napi_value directResult = nullptr;
    const napi_value* directArgs =
        hasExactInvocationArgs ? exactInvocationArgs
                               : getPreparedInvocationArgs();
    HermesObjCReturnContext returnContextStorage;
    const HermesObjCReturnContext* returnContext = nullptr;
    if (needsObjectReturnContext) {
      Class declaredClass =
          member->cls != nullptr ? member->cls->nativeClass : nil;
      returnContextStorage = HermesObjCReturnContext{
          member->bridgeState, jsThis, self, declaredClass,
          member->returnOwned, receiverIsClass, member->classMethod,
          kind != EngineDirectMemberKind::Method};
      returnContext = &returnContextStorage;
    }
    @try {
      NativeCallRuntimeUnlockScope unlockRuntime(env);
      if (directReturnInvoker(
              env, cif, reinterpret_cast<void*>(objc_msgSend), self,
              descriptor->selector, returnContext, directArgs,
              &directResult)) {
        return directResult;
      }
    } @catch (NSException* exception) {
      std::string message = exception.description.UTF8String;
      NativeScriptException nativeScriptException(message);
      nativeScriptException.ReThrowToJS(env);
      return nullptr;
    }
  }

  EngineDirectReturnStorage rvalueStorage(cif);
  if (!rvalueStorage.valid()) {
    napi_throw_error(env, "NativeScriptException",
                     "Unable to allocate return value storage for Objective-C call.");
    if (handled != nullptr) {
      *handled = true;
    }
    return nullptr;
  }

  if (handled != nullptr) {
    *handled = true;
  }

  EngineDirectRoundTripCacheFrameGuard roundTripCacheFrame(
      env, member->bridgeState, needsRoundTripFrame);

  ObjCEngineDirectInvoker invoker =
      !cif->skipGeneratedNapiDispatch && cif->signatureHash != 0
          ? ensureHermesObjCEngineDirectInvoker(cif, descriptor,
                                                descriptor->dispatchFlags)
          : nullptr;

  void* rvalue = rvalueStorage.get();
  bool didInvoke = false;
  @try {
    const napi_value* invocationArgs = getPreparedInvocationArgs();
    NativeCallRuntimeUnlockScope unlockRuntime(env);
    if (invoker != nullptr) {
      didInvoke = invoker(env, cif, reinterpret_cast<void*>(objc_msgSend), self,
                          descriptor->selector, invocationArgs, rvalue);
    } else {
      const napi_value* dynamicArgs =
          rawArgs != nullptr ? rawArgs : invocationArgs;
      const size_t dynamicArgc = rawArgs != nullptr ? actualArgc : cif->argc;
      didInvoke = InvokeObjCMemberEngineDirectDynamic(
          env, cif, self, receiverIsClass, descriptor,
          descriptor->dispatchFlags, dynamicArgc, dynamicArgs, rvalue);
    }
  } @catch (NSException* exception) {
    std::string message = exception.description.UTF8String;
    NativeScriptException nativeScriptException(message);
    nativeScriptException.ReThrowToJS(env);
    return nullptr;
  }

  if (!didInvoke) {
    return nullptr;
  }

  return makeHermesObjCReturnValue(
      env, member, descriptor, cif, self, receiverIsClass, jsThis, rvalue,
      kind != EngineDirectMemberKind::Method);
}

napi_value TryCallHermesObjCMemberFast(napi_env env, ObjCClassMember* member,
                                       napi_value jsThis, size_t actualArgc,
                                       const napi_value* rawArgs,
                                       EngineDirectMemberKind kind,
                                       bool* handled) {
  return TryCallHermesObjCMemberFastImpl(env, member, jsThis,
                                         actualArgc, rawArgs, nullptr, kind,
                                         handled);
}

napi_value TryCallHermesObjCMemberFastFromFrame(
    napi_env env, ObjCClassMember* member, napi_value jsThis,
    size_t actualArgc, const uint64_t* argsBase,
    EngineDirectMemberKind kind, bool* handled) {
  return TryCallHermesObjCMemberFastImpl(env, member, jsThis, actualArgc,
                                         nullptr, argsBase, kind, handled);
}

napi_value TryCallHermesCFunctionFastImpl(
    napi_env env, MDSectionOffset offset, size_t actualArgc,
    const napi_value* rawArgs, const uint64_t* hermesArgsBase,
    bool* handled) {
  if (handled != nullptr) {
    *handled = false;
  }

  ObjCBridgeState* bridgeState = ObjCBridgeState::InstanceData(env);
  if (env == nullptr || bridgeState == nullptr) {
    return nullptr;
  }

  CFunction* function = bridgeState->getCFunction(env, offset);
  Cif* cif = function != nullptr ? function->cif : nullptr;
  if (function == nullptr || function->skipEngineDirectFastPath ||
      cif == nullptr || cif->isVariadic || cif->returnType == nullptr) {
    return nullptr;
  }

  if (hermesArgsBase != nullptr && !canUseHermesFrameArguments(cif)) {
    return nullptr;
  }

  if (actualArgc != cif->argc) {
    return nullptr;
  }

  const bool hasExactHermesFrameArgs =
      hermesArgsBase != nullptr && actualArgc == cif->argc;
  CFunctionHermesFrameDirectReturnInvoker frameDirectReturnInvoker =
      hasExactHermesFrameArgs && cif->signatureHash != 0
          ? ensureHermesCFunctionFrameDirectReturnInvoker(function, cif)
          : nullptr;

  if (frameDirectReturnInvoker != nullptr) {
    if (handled != nullptr) {
      *handled = true;
    }

    EngineDirectRoundTripCacheFrameGuard roundTripCacheFrame(
        env, bridgeState, needsRoundTripCacheFrame(cif));

    napi_value directResult = nullptr;
    @try {
      NativeCallRuntimeUnlockScope unlockRuntime(env);
      if (frameDirectReturnInvoker(env, cif, function->fnptr, hermesArgsBase,
                                   &directResult)) {
        return directResult;
      }
    } @catch (NSException* exception) {
      std::string message = exception.description.UTF8String;
      NativeScriptException nativeScriptException(message);
      nativeScriptException.ReThrowToJS(env);
      return nullptr;
    }
  }

  const bool hasExactInvocationArgs =
      cif->argc == 0 || (rawArgs != nullptr && actualArgc == cif->argc);
  const napi_value* exactInvocationArgs = cif->argc == 0 ? nullptr : rawArgs;
  const napi_value* preparedInvocationArgs =
      hasExactInvocationArgs ? exactInvocationArgs : nullptr;
  napi_value stackInvocationArgs[16];
  std::vector<napi_value> heapInvocationArgs;
  std::vector<napi_value> frameRawArgs;
  auto getPreparedInvocationArgs = [&]() -> const napi_value* {
    if (preparedInvocationArgs == nullptr && cif->argc != 0) {
      if (rawArgs == nullptr && hermesArgsBase != nullptr) {
        if (actualArgc <= 16) {
          copyHermesFrameArgs(hermesArgsBase, actualArgc, stackInvocationArgs);
          rawArgs = stackInvocationArgs;
        } else {
          frameRawArgs.resize(actualArgc);
          copyHermesFrameArgs(hermesArgsBase, actualArgc,
                              frameRawArgs.data());
          rawArgs = frameRawArgs.data();
        }
      }
      preparedInvocationArgs = prepareHermesInvocationArgs(
          env, cif, actualArgc, rawArgs, stackInvocationArgs, 16,
          &heapInvocationArgs);
    }
    return preparedInvocationArgs;
  };

  CFunctionHermesDirectReturnInvoker directReturnInvoker =
      cif->signatureHash != 0
          ? ensureHermesCFunctionDirectReturnInvoker(function, cif)
          : nullptr;

  if (directReturnInvoker != nullptr) {
    if (handled != nullptr) {
      *handled = true;
    }

    EngineDirectRoundTripCacheFrameGuard roundTripCacheFrame(
        env, bridgeState, needsRoundTripCacheFrame(cif));

    napi_value directResult = nullptr;
    @try {
      const napi_value* directArgs =
          hasExactInvocationArgs ? exactInvocationArgs
                                 : getPreparedInvocationArgs();
      NativeCallRuntimeUnlockScope unlockRuntime(env);
      if (directReturnInvoker(env, cif, function->fnptr, directArgs,
                              &directResult)) {
        return directResult;
      }
    } @catch (NSException* exception) {
      std::string message = exception.description.UTF8String;
      NativeScriptException nativeScriptException(message);
      nativeScriptException.ReThrowToJS(env);
      return nullptr;
    }
  }

  if (handled != nullptr) {
    *handled = true;
  }

  EngineDirectRoundTripCacheFrameGuard roundTripCacheFrame(
      env, bridgeState, needsRoundTripCacheFrame(cif));

  bool didInvoke = false;
  CFunctionEngineDirectInvoker invoker =
      !cif->skipGeneratedNapiDispatch && cif->signatureHash != 0
          ? ensureHermesCFunctionEngineDirectInvoker(function, cif)
          : nullptr;
  EngineDirectReturnStorage returnStorage(cif);
  void* perCallRValue = returnStorage.get();
  if (!returnStorage.valid()) {
    napi_throw_error(env, "NativeScriptException",
                     "Unable to allocate C function return storage.");
    return nullptr;
  }
  @try {
    const napi_value* invocationArgs = getPreparedInvocationArgs();
    NativeCallRuntimeUnlockScope unlockRuntime(env);
    if (invoker != nullptr) {
      didInvoke =
          invoker(env, cif, function->fnptr, invocationArgs, perCallRValue);
    } else {
      const napi_value* dynamicArgs =
          rawArgs != nullptr ? rawArgs : invocationArgs;
      const size_t dynamicArgc = rawArgs != nullptr ? actualArgc : cif->argc;
      didInvoke = InvokeCFunctionEngineDirectDynamic(
          env, function, cif, dynamicArgc, dynamicArgs, perCallRValue);
    }
  } @catch (NSException* exception) {
    std::string message = exception.description.UTF8String;
    NativeScriptException nativeScriptException(message);
    nativeScriptException.ReThrowToJS(env);
    return nullptr;
  }

  if (!didInvoke) {
    return nullptr;
  }

  return makeHermesCFunctionReturnValue(env, function, cif, perCallRValue);
}

napi_value TryCallHermesCFunctionFast(napi_env env, MDSectionOffset offset,
                                      size_t actualArgc,
                                      const napi_value* rawArgs,
                                      bool* handled) {
  return TryCallHermesCFunctionFastImpl(env, offset, actualArgc, rawArgs,
                                        nullptr, handled);
}

napi_value TryCallHermesCFunctionFastFromFrame(
    napi_env env, MDSectionOffset offset, size_t actualArgc,
    const uint64_t* argsBase, bool* handled) {
  return TryCallHermesCFunctionFastImpl(env, offset, actualArgc, nullptr,
                                        argsBase, handled);
}

}  // namespace nativescript

#endif  // TARGET_ENGINE_HERMES

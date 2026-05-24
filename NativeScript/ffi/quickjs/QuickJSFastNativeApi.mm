#include "QuickJSFastNativeApiPrivate.h"

#ifdef TARGET_ENGINE_QUICKJS

namespace {
JSValue throwQuickJSPendingException(JSContext* context, const char* message) {
  if (context == nullptr) {
    return JS_EXCEPTION;
  }
  if (JS_HasException(context)) {
    return JS_Throw(context, JS_GetException(context));
  }
  return JS_ThrowInternalError(context, "%s", message);
}

bool isCompatCFunction(napi_env env, void* data) {
  auto* bridgeState = nativescript::ObjCBridgeState::InstanceData(env);
  if (bridgeState == nullptr || data == nullptr) {
    return true;
  }

  auto offset = static_cast<MDSectionOffset>(reinterpret_cast<uintptr_t>(data));
  const char* name = bridgeState->metadata->getString(offset);
  return strcmp(name, "dispatch_async") == 0 ||
         strcmp(name, "dispatch_get_current_queue") == 0 ||
         strcmp(name, "dispatch_get_global_queue") == 0 ||
         strcmp(name, "UIApplicationMain") == 0 ||
         strcmp(name, "NSApplicationMain") == 0;
}

id resolveQuickJSSelf(napi_env env, napi_value jsThis,
                      nativescript::ObjCClassMember* member) {
  id self = nil;
  auto* state = nativescript::ObjCBridgeState::InstanceData(env);

  if (jsThis != nullptr) {
    void* wrapped = nullptr;
    if (nativescript::TryUnwrapQuickJSNativeObjectFast(
            env, ToJSValue(jsThis), &wrapped) &&
        wrapped != nullptr) {
      return static_cast<id>(wrapped);
    }
  }

  if (state != nullptr && jsThis != nullptr) {
    state->tryResolveBridgedTypeConstructor(env, jsThis, &self);
  }

  if (self == nil && jsThis != nullptr) {
    napi_unwrap(env, jsThis, reinterpret_cast<void**>(&self));
  }

  if (self != nil) {
    return self;
  }

  if (member != nullptr && member->cls != nullptr &&
      member->cls->nativeClass != nil) {
    if (member->classMethod) {
      return static_cast<id>(member->cls->nativeClass);
    }

    napi_valuetype jsType = napi_undefined;
    if (jsThis != nullptr && napi_typeof(env, jsThis, &jsType) == napi_ok &&
        jsType == napi_function) {
      return static_cast<id>(member->cls->nativeClass);
    }
  }

  return nil;
}

nativescript::Cif* quickJSMemberCif(
    napi_env env, nativescript::ObjCClassMember* member,
    nativescript::EngineDirectMemberKind kind,
    nativescript::MethodDescriptor** descriptorOut) {
  if (member == nullptr || descriptorOut == nullptr) {
    return nullptr;
  }

  switch (kind) {
    case nativescript::EngineDirectMemberKind::Method:
      if (!member->overloads.empty()) {
        return nullptr;
      }
      *descriptorOut = &member->methodOrGetter;
      if (member->cif == nullptr) {
        member->cif = member->bridgeState->getMethodCif(
            env, member->methodOrGetter.signatureOffset);
      }
      return member->cif;

    case nativescript::EngineDirectMemberKind::Getter:
      *descriptorOut = &member->methodOrGetter;
      if (member->cif == nullptr) {
        member->cif = member->bridgeState->getMethodCif(
            env, member->methodOrGetter.signatureOffset);
      }
      return member->cif;

    case nativescript::EngineDirectMemberKind::Setter:
      *descriptorOut = &member->setter;
      if (member->setterCif == nullptr) {
        member->setterCif = member->bridgeState->getMethodCif(
            env, member->setter.signatureOffset);
      }
      return member->setterCif;
  }
}

bool receiverClassRequiresQuickJSSuperCall(Class receiverClass) {
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
      receiverClass != nil &&
      class_conformsToProtocol(receiverClass,
                               @protocol(ObjCBridgeClassBuilderProtocol));
  superCallCache.emplace(receiverClass, requiresSuperCall);
  lastReceiverClass = receiverClass;
  lastRequiresSuperCall = requiresSuperCall;
  return requiresSuperCall;
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

inline bool computeQuickJSNSErrorOutSignature(SEL selector,
                                              nativescript::Cif* cif) {
  if (cif == nullptr || cif->argc == 0 || cif->argTypes.empty() ||
      !selectorEndsWith(selector, "error:")) {
    return false;
  }
  auto lastArgType = cif->argTypes[cif->argc - 1];
  return lastArgType != nullptr && lastArgType->type == &ffi_type_pointer;
}

inline bool isQuickJSNSErrorOutSignature(
    nativescript::MethodDescriptor* descriptor, nativescript::Cif* cif) {
  if (descriptor == nullptr) {
    return computeQuickJSNSErrorOutSignature(nullptr, cif);
  }

  if (!descriptor->nserrorOutSignatureCached) {
    descriptor->nserrorOutSignature =
        computeQuickJSNSErrorOutSignature(descriptor->selector, cif);
    descriptor->nserrorOutSignatureCached = true;
  }
  return descriptor->nserrorOutSignature;
}

inline bool isQuickJSBlockFallbackSelector(SEL selector) {
  return selector == @selector(methodWithSimpleBlock:) ||
         selector == @selector(methodRetainingBlock:) ||
         selector == @selector(methodWithBlock:) ||
         selector == @selector(methodWithComplexBlock:);
}

nativescript::ObjCEngineDirectInvoker ensureQuickJSObjCEngineDirectInvoker(
    nativescript::Cif* cif, nativescript::MethodDescriptor* descriptor,
    uint8_t dispatchFlags) {
  if (cif == nullptr || descriptor == nullptr || cif->signatureHash == 0) {
    return nullptr;
  }

  if (!descriptor->dispatchLookupCached ||
      descriptor->dispatchLookupSignatureHash != cif->signatureHash ||
      descriptor->dispatchLookupFlags != dispatchFlags) {
    descriptor->dispatchLookupSignatureHash = cif->signatureHash;
    descriptor->dispatchLookupFlags = dispatchFlags;
    descriptor->dispatchId = nativescript::composeSignatureDispatchId(
        cif->signatureHash, nativescript::SignatureCallKind::ObjCMethod,
        dispatchFlags);
    descriptor->preparedInvoker = reinterpret_cast<void*>(
        nativescript::lookupObjCPreparedInvoker(descriptor->dispatchId));
    descriptor->napiInvoker = reinterpret_cast<void*>(
        nativescript::lookupObjCNapiInvoker(descriptor->dispatchId));
    descriptor->engineDirectInvoker = reinterpret_cast<void*>(
        nativescript::lookupObjCEngineDirectInvoker(descriptor->dispatchId));
    descriptor->dispatchLookupCached = true;
  }

  return reinterpret_cast<nativescript::ObjCEngineDirectInvoker>(
      descriptor->engineDirectInvoker);
}

nativescript::CFunctionEngineDirectInvoker
ensureQuickJSCFunctionEngineDirectInvoker(nativescript::CFunction* function,
                                          nativescript::Cif* cif) {
  if (function == nullptr || cif == nullptr || cif->signatureHash == 0) {
    if (function != nullptr) {
      function->dispatchLookupCached = true;
      function->dispatchLookupSignatureHash = 0;
      function->dispatchId = 0;
      function->preparedInvoker = nullptr;
      function->napiInvoker = nullptr;
      function->engineDirectInvoker = nullptr;
      function->v8Invoker = nullptr;
    }
    return nullptr;
  }

  if (!function->dispatchLookupCached ||
      function->dispatchLookupSignatureHash != cif->signatureHash) {
    function->dispatchLookupSignatureHash = cif->signatureHash;
    function->dispatchId = nativescript::composeSignatureDispatchId(
        cif->signatureHash, nativescript::SignatureCallKind::CFunction,
        function->dispatchFlags);
    function->preparedInvoker = reinterpret_cast<void*>(
        nativescript::lookupCFunctionPreparedInvoker(function->dispatchId));
    function->napiInvoker = reinterpret_cast<void*>(
        nativescript::lookupCFunctionNapiInvoker(function->dispatchId));
    function->engineDirectInvoker = reinterpret_cast<void*>(
        nativescript::lookupCFunctionEngineDirectInvoker(function->dispatchId));
    function->dispatchLookupCached = true;
  }

  return reinterpret_cast<nativescript::CFunctionEngineDirectInvoker>(
      function->engineDirectInvoker);
}

QuickJSEngineDirectResult tryCallQuickJSObjCEngineDirect(
    JSContext* context, napi_env env, nativescript::ObjCClassMember* member,
    napi_value jsThis, int argc, const napi_value* argv,
    nativescript::EngineDirectMemberKind kind, JSValue* result) {
  if (context == nullptr || env == nullptr || member == nullptr ||
      member->bridgeState == nullptr || argc < 0 || result == nullptr) {
    return QuickJSEngineDirectResult::NotHandled;
  }

  nativescript::MethodDescriptor* descriptor = nullptr;
  nativescript::Cif* cif = quickJSMemberCif(env, member, kind, &descriptor);
  if (cif == nullptr || cif->isVariadic || cif->returnType == nullptr) {
    return QuickJSEngineDirectResult::NotHandled;
  }

  const bool canUseGeneratedInvoker =
      cif->signatureHash != 0 && static_cast<unsigned int>(argc) == cif->argc;
  auto invoker = canUseGeneratedInvoker
      ? ensureQuickJSObjCEngineDirectInvoker(
            cif, descriptor, descriptor->dispatchFlags)
      : nullptr;

  if (isQuickJSNSErrorOutSignature(descriptor, cif) ||
      isQuickJSBlockFallbackSelector(descriptor->selector)) {
    return QuickJSEngineDirectResult::NotHandled;
  }

  id self = resolveQuickJSSelf(env, jsThis, member);
  if (self == nil) {
    return QuickJSEngineDirectResult::NotHandled;
  }

  const bool receiverIsClass = object_isClass(self);
  Class receiverClass = receiverIsClass ? static_cast<Class>(self) : object_getClass(self);
  if (receiverClassRequiresQuickJSSuperCall(receiverClass)) {
    return QuickJSEngineDirectResult::NotHandled;
  }

  nativescript::EngineDirectReturnStorage rvalueStorage(cif);
  if (!rvalueStorage.valid()) {
    return QuickJSEngineDirectResult::NotHandled;
  }

  void* rvalue = rvalueStorage.get();
  nativescript::EngineDirectRoundTripCacheFrameGuard roundTripCacheFrame(
      env, member->bridgeState, cif);
  bool didInvoke = false;
  @try {
    if (invoker != nullptr) {
      didInvoke = invoker(env, cif, reinterpret_cast<void*>(objc_msgSend), self,
                          descriptor->selector, argv, rvalue);
    } else {
      didInvoke = nativescript::InvokeObjCMemberEngineDirectDynamic(
          env, cif, self, receiverIsClass, descriptor,
          descriptor->dispatchFlags, static_cast<size_t>(argc), argv, rvalue);
    }
  } @catch (NSException* exception) {
    std::string message = exception.description.UTF8String;
    nativescript::NativeScriptException nativeScriptException(message);
    nativeScriptException.ReThrowToJS(env);
    return QuickJSEngineDirectResult::Failed;
  }

  if (!didInvoke) {
    if (invoker == nullptr && JS_HasException(context)) {
      return QuickJSEngineDirectResult::Failed;
    }
    return QuickJSEngineDirectResult::NotHandled;
  }

  if (!makeQuickJSObjCReturnValue(
          context, env, member, descriptor, cif, self, receiverIsClass,
          jsThis, rvalue, kind != nativescript::EngineDirectMemberKind::Method,
          result)) {
    return QuickJSEngineDirectResult::Failed;
  }

  return QuickJSEngineDirectResult::Handled;
}

QuickJSEngineDirectResult tryCallQuickJSCFunctionEngineDirect(
    JSContext* context, napi_env env, MDSectionOffset offset, int argc,
    const napi_value* argv, JSValue* result) {
  if (context == nullptr || env == nullptr || argc < 0 || result == nullptr) {
    return QuickJSEngineDirectResult::NotHandled;
  }

  auto* bridgeState = nativescript::ObjCBridgeState::InstanceData(env);
  if (bridgeState == nullptr || isCompatCFunction(env, reinterpret_cast<void*>(
                                           static_cast<uintptr_t>(offset)))) {
    return QuickJSEngineDirectResult::NotHandled;
  }

  auto* function = bridgeState->getCFunction(env, offset);
  auto* cif = function != nullptr ? function->cif : nullptr;
  if (function == nullptr || cif == nullptr || cif->isVariadic ||
      cif->returnType == nullptr) {
    return QuickJSEngineDirectResult::NotHandled;
  }

  const bool canUseGeneratedInvoker =
      cif->signatureHash != 0 && static_cast<unsigned int>(argc) == cif->argc;
  auto invoker = canUseGeneratedInvoker
      ? ensureQuickJSCFunctionEngineDirectInvoker(function, cif)
      : nullptr;

  bool didInvoke = false;
  nativescript::EngineDirectRoundTripCacheFrameGuard roundTripCacheFrame(
      env, bridgeState, cif);
  nativescript::EngineDirectReturnStorage rvalueStorage(cif);
  if (!rvalueStorage.valid()) {
    return QuickJSEngineDirectResult::NotHandled;
  }
  void* rvalue = rvalueStorage.get();
  @try {
    if (invoker != nullptr) {
      didInvoke = invoker(env, cif, function->fnptr, argv, rvalue);
    } else {
      didInvoke = nativescript::InvokeCFunctionEngineDirectDynamic(
          env, function, cif, static_cast<size_t>(argc), argv, rvalue);
    }
  } @catch (NSException* exception) {
    std::string message = exception.description.UTF8String;
    nativescript::NativeScriptException nativeScriptException(message);
    nativeScriptException.ReThrowToJS(env);
    return QuickJSEngineDirectResult::Failed;
  }

  if (!didInvoke) {
    if (invoker == nullptr && JS_HasException(context)) {
      return QuickJSEngineDirectResult::Failed;
    }
    return QuickJSEngineDirectResult::NotHandled;
  }

  if (!makeQuickJSCFunctionReturnValue(context, env, function, cif, rvalue,
                                       result)) {
    return QuickJSEngineDirectResult::Failed;
  }

  return QuickJSEngineDirectResult::Handled;
}

JSValue callFastNative(JSContext* context, JSValueConst thisValue, int argc,
                       JSValueConst* argv, int magic, JSValue* funcData) {
  napi_env env = static_cast<napi_env>(JS_GetContextOpaque(context));
  if (env == nullptr) {
    return JS_UNDEFINED;
  }

  auto* externalInfo = static_cast<QuickJSFastExternalInfo*>(
      JS_GetOpaque(funcData[0], env->runtime->externalClassId));
  void* data = externalInfo != nullptr ? externalInfo->data : nullptr;
  if (data == nullptr) {
    return JS_UNDEFINED;
  }

  bool useGlobalValue = false;
  JSValue effectiveThis = thisValue;
  if (JS_IsUndefined(effectiveThis)) {
    useGlobalValue = true;
    effectiveThis = JS_GetGlobalObject(context);
  }

  napi_value stackArgs[16];
  std::vector<napi_value> heapArgs;
  napi_value* napiArgs = stackArgs;
  if (argc > 16) {
    heapArgs.resize(static_cast<size_t>(argc));
    napiArgs = heapArgs.data();
  }
  for (int i = 0; i < argc; i++) {
    napiArgs[i] = reinterpret_cast<napi_value>(&argv[i]);
  }

  napi_value jsThis = reinterpret_cast<napi_value>(&effectiveThis);
  JSValue directReturn = JS_UNDEFINED;
  QuickJSEngineDirectResult directResult =
      QuickJSEngineDirectResult::NotHandled;
  switch (magic) {
    case kQuickJSFastObjCMethod:
      directResult = tryCallQuickJSObjCEngineDirect(
          context, env, static_cast<nativescript::ObjCClassMember*>(data),
          jsThis, argc, napiArgs,
          nativescript::EngineDirectMemberKind::Method, &directReturn);
      break;
    case kQuickJSFastObjCGetter:
      directResult = tryCallQuickJSObjCEngineDirect(
          context, env, static_cast<nativescript::ObjCClassMember*>(data),
          jsThis, 0, nullptr,
          nativescript::EngineDirectMemberKind::Getter, &directReturn);
      break;
    case kQuickJSFastObjCSetter: {
      JSValue undefined = JS_UNDEFINED;
      napi_value value =
          argc > 0 ? reinterpret_cast<napi_value>(&argv[0])
                   : reinterpret_cast<napi_value>(&undefined);
      directResult = tryCallQuickJSObjCEngineDirect(
          context, env, static_cast<nativescript::ObjCClassMember*>(data),
          jsThis, 1, &value,
          nativescript::EngineDirectMemberKind::Setter, &directReturn);
      break;
    }
    case kQuickJSFastCFunction:
      directResult = tryCallQuickJSCFunctionEngineDirect(
          context, env,
          static_cast<MDSectionOffset>(reinterpret_cast<uintptr_t>(data)),
          argc, napiArgs, &directReturn);
      break;
    default:
      break;
  }

  if (directResult == QuickJSEngineDirectResult::Handled) {
    if (useGlobalValue) {
      JS_FreeValue(context, effectiveThis);
    }
    if (JS_HasException(context)) {
      JS_FreeValue(context, directReturn);
      return JS_Throw(context, JS_GetException(context));
    }
    return directReturn;
  }

  if (directResult == QuickJSEngineDirectResult::Failed) {
    if (useGlobalValue) {
      JS_FreeValue(context, effectiveThis);
    }
    JS_FreeValue(context, directReturn);
    return throwQuickJSPendingException(
        context, "NativeScript fast native call failed.");
  }

  if (JS_HasException(context)) {
    JSValue staleException = JS_GetException(context);
    JS_FreeValue(context, staleException);
  }

  QuickJSFastStackHandleScope scope(env);

  napi_value result = nullptr;
  switch (magic) {
    case kQuickJSFastObjCMethod:
      result = nativescript::ObjCClassMember::jsCallDirect(
          env, static_cast<nativescript::ObjCClassMember*>(data), jsThis,
          static_cast<size_t>(argc), napiArgs);
      break;

    case kQuickJSFastObjCGetter:
      result = nativescript::ObjCClassMember::jsGetterDirect(
          env, static_cast<nativescript::ObjCClassMember*>(data), jsThis);
      break;

    case kQuickJSFastObjCSetter: {
      JSValue undefined = JS_UNDEFINED;
      napi_value value =
          argc > 0 ? reinterpret_cast<napi_value>(&argv[0])
                   : reinterpret_cast<napi_value>(&undefined);
      result = nativescript::ObjCClassMember::jsSetterDirect(
          env, static_cast<nativescript::ObjCClassMember*>(data), jsThis,
          value);
      break;
    }

    case kQuickJSFastObjCReadOnlySetter:
      result = nativescript::ObjCClassMember::jsReadOnlySetterDirect(env);
      break;

    case kQuickJSFastCFunction:
      result = nativescript::CFunction::jsCallDirect(
          env,
          static_cast<MDSectionOffset>(reinterpret_cast<uintptr_t>(data)),
          static_cast<size_t>(argc), napiArgs);
      break;

    default:
      break;
  }

  JSValue returnValue = JS_UNDEFINED;
  if (result != nullptr) {
    returnValue = JS_DupValue(context, ToJSValue(result));
  }

  scope.close();

  if (useGlobalValue) {
    JS_FreeValue(context, effectiveThis);
  }

  if (JS_HasException(context)) {
    JS_FreeValue(context, returnValue);
    return JS_Throw(context, JS_GetException(context));
  }

  return returnValue;
}

JSValue makeFastFunction(napi_env env, int kind, void* data) {
  if (env == nullptr || env->context == nullptr) {
    return JS_EXCEPTION;
  }

  JSContext* context = env->context;
  auto* externalInfo = static_cast<QuickJSFastExternalInfo*>(
      mi_malloc(sizeof(QuickJSFastExternalInfo)));
  if (externalInfo == nullptr) {
    return JS_EXCEPTION;
  }
  externalInfo->data = data;
  externalInfo->finalizeHint = nullptr;
  externalInfo->finalizeCallback = nullptr;

  JSValue dataValue =
      JS_NewObjectClass(context, static_cast<int>(env->runtime->externalClassId));
  if (JS_IsException(dataValue)) {
    mi_free(externalInfo);
    return JS_EXCEPTION;
  }
  if (JS_SetOpaque(dataValue, externalInfo) != 0) {
    mi_free(externalInfo);
    JS_FreeValue(context, dataValue);
    return JS_EXCEPTION;
  }

  JSValue functionValue =
      JS_NewCFunctionData(context, callFastNative, 0, kind, 1, &dataValue);
  JS_FreeValue(context, dataValue);
  return functionValue;
}

bool defineFastProperty(napi_env env, napi_value object,
                        const napi_property_descriptor* descriptor,
                        JSValue value, JSValue getter, JSValue setter) {
  JSContext* context = qjs_get_context(env);
  if (context == nullptr || object == nullptr || descriptor == nullptr) {
    return false;
  }

  JSAtom key = 0;
  if (descriptor->name != nullptr) {
    key = JS_ValueToAtom(context, ToJSValue(descriptor->name));
  } else if (descriptor->utf8name != nullptr) {
    key = JS_NewAtom(context, descriptor->utf8name);
  } else {
    return false;
  }

  JSValue jsObject = ToJSValue(object);
  if (!JS_IsObject(jsObject)) {
    JS_FreeAtom(context, key);
    return false;
  }

  int flags =
      JS_PROP_HAS_WRITABLE | JS_PROP_HAS_ENUMERABLE | JS_PROP_HAS_CONFIGURABLE;
  if ((descriptor->attributes & napi_writable) != 0 ||
      !JS_IsUndefined(getter) || !JS_IsUndefined(setter)) {
    flags |= JS_PROP_WRITABLE;
  }
  if ((descriptor->attributes & napi_enumerable) != 0) {
    flags |= JS_PROP_ENUMERABLE;
  }
  if ((descriptor->attributes & napi_configurable) != 0) {
    flags |= JS_PROP_CONFIGURABLE;
  }

  if (!JS_IsUndefined(value)) {
    flags |= JS_PROP_HAS_VALUE;
  }
  if (!JS_IsUndefined(getter)) {
    flags |= JS_PROP_HAS_GET;
  }
  if (!JS_IsUndefined(setter)) {
    flags |= JS_PROP_HAS_SET;
  }

  int status = JS_DefineProperty(context, jsObject, key, value, getter, setter,
                                 flags);
  JS_FreeAtom(context, key);
  return status >= 0;
}

}  // namespace

extern "C" bool nativescript_quickjs_try_define_fast_native_property(
    napi_env env, napi_value object,
    const napi_property_descriptor* descriptor) {
  if (env == nullptr || object == nullptr || descriptor == nullptr) {
    return false;
  }

  JSContext* context = qjs_get_context(env);
  if (context == nullptr) {
    return false;
  }

  if (descriptor->method == nativescript::ObjCClassMember::jsCall &&
      descriptor->data != nullptr) {
    JSValue function =
        makeFastFunction(env, kQuickJSFastObjCMethod, descriptor->data);
    return !JS_IsException(function) &&
           defineFastProperty(env, object, descriptor, function,
                              JS_UNDEFINED, JS_UNDEFINED);
  }

  if (descriptor->method == nativescript::CFunction::jsCall &&
      descriptor->data != nullptr &&
      !isCompatCFunction(env, descriptor->data)) {
    JSValue function =
        makeFastFunction(env, kQuickJSFastCFunction, descriptor->data);
    return !JS_IsException(function) &&
           defineFastProperty(env, object, descriptor, function,
                              JS_UNDEFINED, JS_UNDEFINED);
  }

  if (descriptor->getter == nativescript::ObjCClassMember::jsGetter &&
      descriptor->data != nullptr) {
    JSValue getter =
        makeFastFunction(env, kQuickJSFastObjCGetter, descriptor->data);
    if (JS_IsException(getter)) {
      return false;
    }

    JSValue setter = JS_UNDEFINED;
    if (descriptor->setter == nativescript::ObjCClassMember::jsSetter) {
      setter =
          makeFastFunction(env, kQuickJSFastObjCSetter, descriptor->data);
      if (JS_IsException(setter)) {
        return false;
      }
    } else if (descriptor->setter ==
               nativescript::ObjCClassMember::jsReadOnlySetter) {
      setter = makeFastFunction(env, kQuickJSFastObjCReadOnlySetter,
                                descriptor->data);
      if (JS_IsException(setter)) {
        return false;
      }
    } else if (descriptor->setter != nullptr) {
      return false;
    }

    return defineFastProperty(env, object, descriptor, JS_UNDEFINED, getter,
                              setter);
  }

  return false;
}


#endif  // TARGET_ENGINE_QUICKJS

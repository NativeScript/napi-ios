#include "JSCFastNativeApiPrivate.h"

#ifdef TARGET_ENGINE_JSC

namespace nativescript {
namespace {
bool isCompatCFunction(napi_env env, void* data) {
  ObjCBridgeState* bridgeState = ObjCBridgeState::InstanceData(env);
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


id resolveJSCSelf(napi_env env, napi_value jsThis, ObjCClassMember* member) {
  id self = nil;
  ObjCBridgeState* state = ObjCBridgeState::InstanceData(env);

  if (jsThis != nullptr) {
    void* wrapped = nullptr;
    if (nativescript_jsc_try_unwrap_native(env, jsThis, &wrapped) &&
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
    bool shouldUseClassFallback = member->classMethod;
    napi_valuetype jsType = napi_undefined;
    if (jsThis != nullptr && napi_typeof(env, jsThis, &jsType) == napi_ok &&
        jsType == napi_function) {
      bool isSameConstructor = true;
      napi_value definingConstructor = nullptr;
      if (member->cls->constructor != nullptr) {
        napi_get_reference_value(env, member->cls->constructor,
                                 &definingConstructor);
      }
      if (definingConstructor != nullptr &&
          napi_strict_equals(env, jsThis, definingConstructor,
                             &isSameConstructor) == napi_ok &&
          !isSameConstructor) {
        shouldUseClassFallback = false;
      } else {
        shouldUseClassFallback = true;
      }
    }

    if (member->classMethod) {
      if (shouldUseClassFallback) {
        return static_cast<id>(member->cls->nativeClass);
      }
      return nil;
    }

    if (shouldUseClassFallback) {
      return static_cast<id>(member->cls->nativeClass);
    }
  }

  return nil;
}

Cif* jscMemberCif(napi_env env, ObjCClassMember* member,
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

bool receiverClassRequiresJSCSuperCall(Class receiverClass) {
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

inline bool computeJSCNSErrorOutSignature(SEL selector, Cif* cif) {
  if (cif == nullptr || cif->argc == 0 || cif->argTypes.empty() ||
      !selectorEndsWith(selector, "error:")) {
    return false;
  }
  auto lastArgType = cif->argTypes[cif->argc - 1];
  return lastArgType != nullptr && lastArgType->type == &ffi_type_pointer;
}

inline bool isJSCNSErrorOutSignature(MethodDescriptor* descriptor, Cif* cif) {
  if (descriptor == nullptr) {
    return computeJSCNSErrorOutSignature(nullptr, cif);
  }

  if (!descriptor->nserrorOutSignatureCached) {
    descriptor->nserrorOutSignature =
        computeJSCNSErrorOutSignature(descriptor->selector, cif);
    descriptor->nserrorOutSignatureCached = true;
  }
  return descriptor->nserrorOutSignature;
}

inline bool isJSCBlockFallbackSelector(SEL selector) {
  return selector == @selector(methodWithSimpleBlock:) ||
         selector == @selector(methodRetainingBlock:) ||
         selector == @selector(methodWithBlock:) ||
         selector == @selector(methodWithComplexBlock:);
}

ObjCEngineDirectInvoker ensureJSCObjCEngineDirectInvoker(
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
    descriptor->dispatchLookupCached = true;
  }

  return reinterpret_cast<ObjCEngineDirectInvoker>(
      descriptor->engineDirectInvoker);
}

CFunctionEngineDirectInvoker ensureJSCCFunctionEngineDirectInvoker(
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
    }
    return nullptr;
  }

  if (!function->dispatchLookupCached ||
      function->dispatchLookupSignatureHash != cif->signatureHash) {
    function->dispatchLookupSignatureHash = cif->signatureHash;
    function->dispatchId = composeSignatureDispatchId(
        cif->signatureHash, SignatureCallKind::CFunction,
        function->dispatchFlags);
    function->preparedInvoker =
        reinterpret_cast<void*>(lookupCFunctionPreparedInvoker(function->dispatchId));
    function->napiInvoker =
        reinterpret_cast<void*>(lookupCFunctionNapiInvoker(function->dispatchId));
    function->engineDirectInvoker = reinterpret_cast<void*>(
        lookupCFunctionEngineDirectInvoker(function->dispatchId));
    function->dispatchLookupCached = true;
  }

  return reinterpret_cast<CFunctionEngineDirectInvoker>(
      function->engineDirectInvoker);
}


JSCEngineDirectResult tryCallJSCObjCEngineDirect(
    napi_env env, ObjCClassMember* member, napi_value jsThis, size_t argc,
    const napi_value* argv, EngineDirectMemberKind kind, JSValueRef* result) {
  if (env == nullptr || member == nullptr || member->bridgeState == nullptr ||
      result == nullptr) {
    return JSCEngineDirectResult::NotHandled;
  }

  MethodDescriptor* descriptor = nullptr;
  Cif* cif = jscMemberCif(env, member, kind, &descriptor);
  if (cif == nullptr || cif->isVariadic || cif->returnType == nullptr) {
    return JSCEngineDirectResult::NotHandled;
  }

  const bool canUseGeneratedInvoker =
      cif->signatureHash != 0 && argc == cif->argc;
  ObjCEngineDirectInvoker invoker = canUseGeneratedInvoker
      ? ensureJSCObjCEngineDirectInvoker(cif, descriptor,
                                         descriptor->dispatchFlags)
      : nullptr;

  if (isJSCNSErrorOutSignature(descriptor, cif) ||
      isJSCBlockFallbackSelector(descriptor->selector)) {
    return JSCEngineDirectResult::NotHandled;
  }

  id self = resolveJSCSelf(env, jsThis, member);
  if (self == nil) {
    return JSCEngineDirectResult::NotHandled;
  }

  const bool receiverIsClass = object_isClass(self);
  Class receiverClass = receiverIsClass ? static_cast<Class>(self) : object_getClass(self);
  if (receiverClassRequiresJSCSuperCall(receiverClass)) {
    return JSCEngineDirectResult::NotHandled;
  }

  EngineDirectReturnStorage rvalueStorage(cif);
  if (!rvalueStorage.valid()) {
    return JSCEngineDirectResult::NotHandled;
  }

  void* rvalue = rvalueStorage.get();
  EngineDirectRoundTripCacheFrameGuard roundTripCacheFrame(
      env, member->bridgeState, cif);
  bool didInvoke = false;
  @try {
    if (invoker != nullptr) {
      didInvoke = invoker(env, cif, reinterpret_cast<void*>(objc_msgSend), self,
                          descriptor->selector, argv, rvalue);
    } else {
      didInvoke = InvokeObjCMemberEngineDirectDynamic(
          env, cif, self, receiverIsClass, descriptor,
          descriptor->dispatchFlags, argc, argv, rvalue);
    }
  } @catch (NSException* exception) {
    std::string message = exception.description.UTF8String;
    NativeScriptException nativeScriptException(message);
    nativeScriptException.ReThrowToJS(env);
    return JSCEngineDirectResult::Failed;
  }

  if (!didInvoke) {
    if (invoker == nullptr && env->last_exception != nullptr) {
      return JSCEngineDirectResult::Failed;
    }
    return JSCEngineDirectResult::NotHandled;
  }

  if (!makeJSCObjCReturnValue(env, member, descriptor, cif, self,
                              receiverIsClass, jsThis, rvalue,
                              kind != EngineDirectMemberKind::Method, result)) {
    return JSCEngineDirectResult::Failed;
  }

  return JSCEngineDirectResult::Handled;
}

JSCEngineDirectResult tryCallJSCCFunctionEngineDirect(
    napi_env env, MDSectionOffset offset, size_t argc, const napi_value* argv,
    JSValueRef* result) {
  if (env == nullptr || result == nullptr) {
    return JSCEngineDirectResult::NotHandled;
  }

  ObjCBridgeState* bridgeState = ObjCBridgeState::InstanceData(env);
  if (bridgeState == nullptr ||
      isCompatCFunction(env, reinterpret_cast<void*>(
                                 static_cast<uintptr_t>(offset)))) {
    return JSCEngineDirectResult::NotHandled;
  }

  CFunction* function = bridgeState->getCFunction(env, offset);
  Cif* cif = function != nullptr ? function->cif : nullptr;
  if (function == nullptr || cif == nullptr || cif->isVariadic ||
      cif->returnType == nullptr) {
    return JSCEngineDirectResult::NotHandled;
  }

  const bool canUseGeneratedInvoker =
      cif->signatureHash != 0 && argc == cif->argc;
  CFunctionEngineDirectInvoker invoker = canUseGeneratedInvoker
      ? ensureJSCCFunctionEngineDirectInvoker(function, cif)
      : nullptr;

  bool didInvoke = false;
  EngineDirectRoundTripCacheFrameGuard roundTripCacheFrame(env, bridgeState, cif);
  EngineDirectReturnStorage rvalueStorage(cif);
  if (!rvalueStorage.valid()) {
    return JSCEngineDirectResult::NotHandled;
  }
  void* rvalue = rvalueStorage.get();
  @try {
    if (invoker != nullptr) {
      didInvoke = invoker(env, cif, function->fnptr, argv, rvalue);
    } else {
      didInvoke = InvokeCFunctionEngineDirectDynamic(
          env, function, cif, argc, argv, rvalue);
    }
  } @catch (NSException* exception) {
    std::string message = exception.description.UTF8String;
    NativeScriptException nativeScriptException(message);
    nativeScriptException.ReThrowToJS(env);
    return JSCEngineDirectResult::Failed;
  }

  if (!didInvoke) {
    if (invoker == nullptr && env->last_exception != nullptr) {
      return JSCEngineDirectResult::Failed;
    }
    return JSCEngineDirectResult::NotHandled;
  }

  if (!makeJSCCFunctionReturnValue(env, function, cif, rvalue, result)) {
    return JSCEngineDirectResult::Failed;
  }

  return JSCEngineDirectResult::Handled;
}

void initializeFastFunction(JSContextRef ctx, JSObjectRef object) {
  JSObjectRef global = JSContextGetGlobalObject(ctx);
  JSValueRef functionCtorValue =
      JSObjectGetProperty(ctx, global, ScopedJSString("Function"), nullptr);
  JSObjectRef functionCtor = JSValueToObject(ctx, functionCtorValue, nullptr);
  if (functionCtor == nullptr) {
    return;
  }

  JSValueRef functionPrototype =
      JSObjectGetProperty(ctx, functionCtor, ScopedJSString("prototype"), nullptr);
  JSObjectRef functionPrototypeObject =
      JSValueToObject(ctx, functionPrototype, nullptr);
  if (functionPrototypeObject != nullptr) {
    JSObjectSetPrototype(ctx, object, functionPrototype);
    for (const char* name : {"bind", "call", "apply"}) {
      ScopedJSString propertyName(name);
      JSValueRef property =
          JSObjectGetProperty(ctx, functionPrototypeObject, propertyName, nullptr);
      if (property != nullptr && !JSValueIsUndefined(ctx, property)) {
        JSObjectSetProperty(ctx, object, propertyName, property,
                            kJSPropertyAttributeDontEnum, nullptr);
      }
    }
  }
}

JSValueRef callFastFunction(JSContextRef ctx, JSObjectRef function,
                            JSObjectRef thisObject, size_t argumentCount,
                            const JSValueRef arguments[],
                            JSValueRef* exception) {
  auto* binding =
      static_cast<JSCFastNativeBinding*>(JSObjectGetPrivate(function));
  if (binding == nullptr) {
    napi_env env = napi_env__::get(const_cast<JSGlobalContextRef>(ctx));
    if (env != nullptr) {
      JSValueRef bindingValue =
          JSObjectGetPropertyForKey(ctx, function, env->function_info_symbol,
                                    nullptr);
      if (bindingValue != nullptr && JSValueIsObject(ctx, bindingValue)) {
        JSObjectRef bindingObject = JSValueToObject(ctx, bindingValue, nullptr);
        if (bindingObject != nullptr) {
          binding = static_cast<JSCFastNativeBinding*>(
              JSObjectGetPrivate(bindingObject));
        }
      }
    }
  }
  if (binding == nullptr || binding->env == nullptr) {
    return JSValueMakeUndefined(ctx);
  }

  napi_env env = binding->env;
  env->last_error.error_code = napi_ok;
  env->last_error.engine_error_code = 0;
  env->last_error.engine_reserved = nullptr;

  JSValueRef effectiveThis =
      thisObject != nullptr ? thisObject : JSContextGetGlobalObject(ctx);
  napi_value stackArgs[16];
  std::vector<napi_value> heapArgs;
  napi_value* argv = stackArgs;
  if (argumentCount > 16) {
    heapArgs.resize(argumentCount);
    argv = heapArgs.data();
  }
  for (size_t i = 0; i < argumentCount; i++) {
    argv[i] = ToNapi(arguments[i]);
  }
  napi_value jsThis = ToNapi(effectiveThis);
  JSValueRef directResult = nullptr;
  JSCEngineDirectResult directCallResult = JSCEngineDirectResult::NotHandled;
  switch (binding->kind) {
    case JSCFastNativeKind::ObjCMethod:
      directCallResult = tryCallJSCObjCEngineDirect(
          env, static_cast<ObjCClassMember*>(binding->data), jsThis,
          argumentCount, argv, EngineDirectMemberKind::Method,
          &directResult);
      break;
    case JSCFastNativeKind::ObjCGetter:
      directCallResult = tryCallJSCObjCEngineDirect(
          env, static_cast<ObjCClassMember*>(binding->data), jsThis, 0,
          nullptr, EngineDirectMemberKind::Getter, &directResult);
      break;
    case JSCFastNativeKind::ObjCSetter: {
      JSValueRef undefined = JSValueMakeUndefined(ctx);
      napi_value value =
          argumentCount > 0 ? ToNapi(arguments[0]) : ToNapi(undefined);
      directCallResult = tryCallJSCObjCEngineDirect(
          env, static_cast<ObjCClassMember*>(binding->data), jsThis, 1,
          &value, EngineDirectMemberKind::Setter, &directResult);
      break;
    }
    case JSCFastNativeKind::CFunction:
      directCallResult = tryCallJSCCFunctionEngineDirect(
          env,
          static_cast<MDSectionOffset>(
              reinterpret_cast<uintptr_t>(binding->data)),
          argumentCount, argv, &directResult);
      break;
    default:
      break;
  }

  if (directCallResult == JSCEngineDirectResult::Handled) {
    if (env->last_exception != nullptr) {
      if (exception != nullptr) {
        *exception = env->last_exception;
      }
      env->last_exception = nullptr;
      return JSValueMakeUndefined(ctx);
    }
    return directResult != nullptr ? directResult : JSValueMakeUndefined(ctx);
  }

  if (directCallResult == JSCEngineDirectResult::Failed) {
    if (env->last_exception == nullptr) {
      napi_throw_error(env, "NativeScriptException",
                       "NativeScript fast native call failed.");
    }
    if (exception != nullptr) {
      *exception = env->last_exception;
    }
    env->last_exception = nullptr;
    return JSValueMakeUndefined(ctx);
  }

  env->last_exception = nullptr;

  napi_value result = nullptr;

  switch (binding->kind) {
    case JSCFastNativeKind::ObjCMethod:
      result = ObjCClassMember::jsCallDirect(
          env, static_cast<ObjCClassMember*>(binding->data), jsThis,
          argumentCount, argv);
      break;

    case JSCFastNativeKind::ObjCGetter:
      result = ObjCClassMember::jsGetterDirect(
          env, static_cast<ObjCClassMember*>(binding->data), jsThis);
      break;

    case JSCFastNativeKind::ObjCSetter: {
      JSValueRef undefined = JSValueMakeUndefined(ctx);
      napi_value value =
          argumentCount > 0 ? ToNapi(arguments[0]) : ToNapi(undefined);
      result = ObjCClassMember::jsSetterDirect(
          env, static_cast<ObjCClassMember*>(binding->data), jsThis, value);
      break;
    }

    case JSCFastNativeKind::ObjCReadOnlySetter:
      result = ObjCClassMember::jsReadOnlySetterDirect(env);
      break;

    case JSCFastNativeKind::CFunction:
      result = CFunction::jsCallDirect(
          env, static_cast<MDSectionOffset>(
                   reinterpret_cast<uintptr_t>(binding->data)),
          argumentCount, argv);
      break;
  }

  if (env->last_exception != nullptr) {
    if (exception != nullptr) {
      *exception = env->last_exception;
    }
    env->last_exception = nullptr;
    return JSValueMakeUndefined(ctx);
  }

  return result != nullptr ? ToJSValue(result) : JSValueMakeUndefined(ctx);
}

void finalizeFastFunction(JSObjectRef object) {
  delete static_cast<JSCFastNativeBinding*>(JSObjectGetPrivate(object));
}

JSClassRef fastFunctionClass() {
  static JSClassRef cls = [] {
    JSClassDefinition definition = kJSClassDefinitionEmpty;
    definition.className = "NativeScriptFastNativeBinding";
    definition.finalize = finalizeFastFunction;
    return JSClassCreate(&definition);
  }();
  return cls;
}

JSObjectRef makeFastFunction(napi_env env, JSCFastNativeKind kind, void* data,
                             const char* name) {
  auto* binding = new JSCFastNativeBinding{env, kind, data};
  ScopedJSString functionName(name != nullptr ? name : "");
  JSObjectRef function = JSObjectMakeFunctionWithCallback(
      env->context, name != nullptr ? static_cast<JSStringRef>(functionName)
                                    : nullptr,
      callFastFunction);
  if (function == nullptr) {
    delete binding;
    return nullptr;
  }

  JSObjectRef bindingObject =
      JSObjectMake(env->context, fastFunctionClass(), binding);
  if (bindingObject == nullptr) {
    delete binding;
    return nullptr;
  }
  JSObjectSetPropertyForKey(env->context, function, env->function_info_symbol,
                            bindingObject,
                            kJSPropertyAttributeDontEnum |
                                kJSPropertyAttributeReadOnly |
                                kJSPropertyAttributeDontDelete,
                            nullptr);
  return function;
}

bool setDescriptorValue(JSContextRef ctx, JSObjectRef descriptor,
                        const char* name, JSValueRef value) {
  JSValueRef exception = nullptr;
  JSObjectSetProperty(ctx, descriptor, ScopedJSString(name), value,
                      kJSPropertyAttributeNone, &exception);
  return exception == nullptr;
}

bool defineProperty(napi_env env, napi_value object,
                    const napi_property_descriptor* descriptor,
                    JSValueRef propertyName, JSObjectRef value,
                    JSObjectRef getter, JSObjectRef setter) {
  JSContextRef ctx = env->context;
  JSValueRef objectValue = ToJSValue(object);
  if (!JSValueIsObject(ctx, objectValue)) {
    return false;
  }

  JSObjectRef jsObject = JSValueToObject(ctx, objectValue, nullptr);
  JSObjectRef propertyDescriptor = JSObjectMake(ctx, nullptr, nullptr);
  if (propertyDescriptor == nullptr) {
    return false;
  }

  if (!setDescriptorValue(ctx, propertyDescriptor, "configurable",
                          JSValueMakeBoolean(
                              ctx, (descriptor->attributes &
                                    napi_configurable) != 0)) ||
      !setDescriptorValue(ctx, propertyDescriptor, "enumerable",
                          JSValueMakeBoolean(
                              ctx, (descriptor->attributes &
                                    napi_enumerable) != 0))) {
    return false;
  }

  if (getter != nullptr || setter != nullptr) {
    if (getter != nullptr &&
        !setDescriptorValue(ctx, propertyDescriptor, "get", getter)) {
      return false;
    }
    if (setter != nullptr &&
        !setDescriptorValue(ctx, propertyDescriptor, "set", setter)) {
      return false;
    }
  } else if (value != nullptr) {
    if (!setDescriptorValue(ctx, propertyDescriptor, "writable",
                            JSValueMakeBoolean(
                                ctx, (descriptor->attributes &
                                      napi_writable) != 0)) ||
        !setDescriptorValue(ctx, propertyDescriptor, "value", value)) {
      return false;
    }
  } else {
    return false;
  }

  JSObjectRef global = JSContextGetGlobalObject(ctx);
  JSValueRef objectCtorValue =
      JSObjectGetProperty(ctx, global, ScopedJSString("Object"), nullptr);
  JSObjectRef objectCtor = JSValueToObject(ctx, objectCtorValue, nullptr);
  if (objectCtor == nullptr) {
    return false;
  }

  JSValueRef definePropertyValue =
      JSObjectGetProperty(ctx, objectCtor, ScopedJSString("defineProperty"),
                          nullptr);
  JSObjectRef definePropertyFunction =
      JSValueToObject(ctx, definePropertyValue, nullptr);
  if (definePropertyFunction == nullptr) {
    return false;
  }

  JSValueRef args[] = {jsObject, propertyName, propertyDescriptor};
  JSValueRef exception = nullptr;
  JSObjectCallAsFunction(ctx, definePropertyFunction, objectCtor, 3, args,
                         &exception);
  return exception == nullptr;
}

bool makePropertyName(napi_env env, const napi_property_descriptor* descriptor,
                      JSValueRef* propertyName) {
  if (descriptor->utf8name != nullptr) {
    *propertyName =
        JSValueMakeString(env->context, ScopedJSString(descriptor->utf8name));
    return true;
  }
  if (descriptor->name != nullptr) {
    *propertyName = ToJSValue(descriptor->name);
    return true;
  }
  return false;
}

}  // namespace

bool JSCTryDefineFastNativeProperty(
    napi_env env, napi_value object,
    const napi_property_descriptor* descriptor) {
  if (env == nullptr || object == nullptr || descriptor == nullptr) {
    return false;
  }

  JSValueRef propertyName = nullptr;
  if (!makePropertyName(env, descriptor, &propertyName)) {
    return false;
  }

  if (descriptor->method == ObjCClassMember::jsCall &&
      descriptor->data != nullptr) {
    JSObjectRef function = makeFastFunction(
        env, JSCFastNativeKind::ObjCMethod, descriptor->data,
        descriptor->utf8name);
    return function != nullptr &&
           defineProperty(env, object, descriptor, propertyName, function,
                          nullptr, nullptr);
  }

  if (descriptor->method == CFunction::jsCall && descriptor->data != nullptr &&
      !isCompatCFunction(env, descriptor->data)) {
    JSObjectRef function = makeFastFunction(
        env, JSCFastNativeKind::CFunction, descriptor->data,
        descriptor->utf8name);
    return function != nullptr &&
           defineProperty(env, object, descriptor, propertyName, function,
                          nullptr, nullptr);
  }

  if (descriptor->getter == ObjCClassMember::jsGetter &&
      descriptor->data != nullptr) {
    JSObjectRef getter = makeFastFunction(
        env, JSCFastNativeKind::ObjCGetter, descriptor->data,
        descriptor->utf8name);
    JSObjectRef setter = nullptr;
    if (descriptor->setter == ObjCClassMember::jsSetter) {
      setter = makeFastFunction(env, JSCFastNativeKind::ObjCSetter,
                                descriptor->data, descriptor->utf8name);
    } else if (descriptor->setter == ObjCClassMember::jsReadOnlySetter) {
      setter = makeFastFunction(env, JSCFastNativeKind::ObjCReadOnlySetter,
                                descriptor->data, descriptor->utf8name);
    } else if (descriptor->setter != nullptr) {
      return false;
    }

    return getter != nullptr &&
           (descriptor->setter == nullptr || setter != nullptr) &&
           defineProperty(env, object, descriptor, propertyName, nullptr,
                          getter, setter);
  }

  return false;
}

}  // namespace nativescript

#endif  // TARGET_ENGINE_JSC

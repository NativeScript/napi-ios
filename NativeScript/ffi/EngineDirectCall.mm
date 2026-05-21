#include "EngineDirectCall.h"

#import <Foundation/Foundation.h>
#include <objc/message.h>
#include <objc/runtime.h>

#include <cstdlib>
#include <cstring>
#include <optional>
#include <string>
#include <unordered_map>
#include <vector>

#include "CFunction.h"
#include "Class.h"
#include "ClassBuilder.h"
#include "ClassMember.h"
#include "Interop.h"
#include "NativeScriptException.h"
#include "ObjCBridge.h"
#include "SignatureDispatch.h"
#include "TypeConv.h"

namespace nativescript {
namespace {

constexpr const char* kNativePointerProperty = "__ns_native_ptr";

inline bool needsRoundTripCacheFrame(Cif* cif) {
  return cif != nullptr &&
         (cif->generatedDispatchHasRoundTripCacheArgument ||
          cif->generatedDispatchUsesObjectReturnStorage);
}

class RoundTripCacheFrameGuard {
 public:
  RoundTripCacheFrameGuard(napi_env env, ObjCBridgeState* bridgeState)
      : env_(env), bridgeState_(bridgeState) {
    if (bridgeState_ != nullptr) {
      bridgeState_->beginRoundTripCacheFrame(env_);
    }
  }

  ~RoundTripCacheFrameGuard() {
    if (bridgeState_ != nullptr) {
      bridgeState_->endRoundTripCacheFrame(env_);
    }
  }

 private:
  napi_env env_ = nullptr;
  ObjCBridgeState* bridgeState_ = nullptr;
};

class CifReturnStorage {
 public:
  explicit CifReturnStorage(Cif* cif) {
    size_t size = 0;
    if (cif != nullptr) {
      size = cif->rvalueLength;
      if (size == 0 && cif->cif.rtype != nullptr) {
        size = cif->cif.rtype->size;
      }
    }
    if (size == 0) {
      size = sizeof(void*);
    }

    if (size <= kInlineSize) {
      data_ = inlineBuffer_;
      std::memset(data_, 0, size);
      return;
    }

    data_ = std::malloc(size);
    if (data_ != nullptr) {
      std::memset(data_, 0, size);
    }
  }

  ~CifReturnStorage() {
    if (data_ != nullptr && data_ != inlineBuffer_) {
      std::free(data_);
    }
  }

  bool valid() const { return data_ != nullptr; }
  void* get() const { return data_; }

 private:
  static constexpr size_t kInlineSize = 32;
  alignas(max_align_t) unsigned char inlineBuffer_[kInlineSize];
  void* data_ = nullptr;
};

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
  if (cif == nullptr || cif->argc == 0 || cif->argTypes.empty()) {
    return false;
  }
  if (!selectorEndsWith(selector, "error:")) {
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

inline bool isBlockFallbackSelector(SEL selector) {
  const char* selectorName = sel_getName(selector);
  return selectorName != nullptr &&
         (std::strcmp(selectorName, "methodWithSimpleBlock:") == 0 ||
          std::strcmp(selectorName, "methodRetainingBlock:") == 0 ||
          std::strcmp(selectorName, "methodWithBlock:") == 0 ||
          std::strcmp(selectorName, "methodWithComplexBlock:") == 0);
}

id resolveSelf(napi_env env, napi_value jsThis, ObjCClassMember* method) {
  id self = nil;
  ObjCBridgeState* state = ObjCBridgeState::InstanceData(env);
  if (state != nullptr && jsThis != nullptr) {
    state->tryResolveBridgedTypeConstructor(env, jsThis, &self);
  }

  napi_status unwrapStatus =
      self != nil ? napi_ok : napi_unwrap(env, jsThis, reinterpret_cast<void**>(&self));

  if ((unwrapStatus != napi_ok || self == nil) && jsThis != nullptr) {
    napi_value nativePointerValue = nullptr;
    if (napi_get_named_property(env, jsThis, kNativePointerProperty,
                                &nativePointerValue) == napi_ok &&
        Pointer::isInstance(env, nativePointerValue)) {
      Pointer* nativePointer = Pointer::unwrap(env, nativePointerValue);
      if (nativePointer != nullptr && nativePointer->data != nullptr) {
        self = static_cast<id>(nativePointer->data);
        unwrapStatus = napi_ok;
      }
    }
  }

  if (unwrapStatus == napi_ok && self != nil) {
    return self;
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
    return static_cast<id>(method->cls->nativeClass);
  }

  napi_throw_error(env, "NativeScriptException",
                   "There was no native counterpart to the JavaScript object. "
                   "Native API was called with a likely plain object.");
  return nil;
}

Cif* resolveMethodDescriptorCif(napi_env env, ObjCClassMember* member,
                                MethodDescriptor* descriptor, Cif** cacheSlot,
                                bool receiverIsClass, Class receiverClass) {
  if (env == nullptr || member == nullptr || descriptor == nullptr ||
      cacheSlot == nullptr) {
    return nullptr;
  }

  Cif* cached = *cacheSlot;
  if (cached != nullptr) {
    return cached;
  }

  Method runtimeMethod = receiverIsClass
                             ? class_getClassMethod(receiverClass, descriptor->selector)
                             : class_getInstanceMethod(receiverClass, descriptor->selector);
  Cif* resolved = nullptr;
  if (runtimeMethod != nullptr) {
    resolved = member->bridgeState->getMethodCif(env, runtimeMethod);
  }
  if (resolved == nullptr) {
    resolved = member->bridgeState->getMethodCif(env, descriptor->signatureOffset);
  }

  *cacheSlot = resolved;
  return resolved;
}

inline bool receiverClassRequiresSuperCall(Class receiverClass) {
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

ObjCEngineDirectInvoker ensureObjCEngineDirectInvoker(Cif* cif,
                                                      MethodDescriptor* descriptor,
                                                      uint8_t dispatchFlags) {
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
#ifdef TARGET_ENGINE_V8
    descriptor->v8Invoker =
        reinterpret_cast<void*>(lookupObjCV8Invoker(descriptor->dispatchId));
#endif
    descriptor->dispatchLookupCached = true;
  }

  return reinterpret_cast<ObjCEngineDirectInvoker>(
      descriptor->engineDirectInvoker);
}

CFunctionEngineDirectInvoker ensureCFunctionEngineDirectInvoker(CFunction* function,
                                                                Cif* cif) {
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
        cif->signatureHash, SignatureCallKind::CFunction, function->dispatchFlags);
    function->preparedInvoker =
        reinterpret_cast<void*>(lookupCFunctionPreparedInvoker(function->dispatchId));
    function->napiInvoker =
        reinterpret_cast<void*>(lookupCFunctionNapiInvoker(function->dispatchId));
    function->engineDirectInvoker = reinterpret_cast<void*>(
        lookupCFunctionEngineDirectInvoker(function->dispatchId));
#ifdef TARGET_ENGINE_V8
    function->v8Invoker =
        reinterpret_cast<void*>(lookupCFunctionV8Invoker(function->dispatchId));
#endif
    function->dispatchLookupCached = true;
  }

  return reinterpret_cast<CFunctionEngineDirectInvoker>(
      function->engineDirectInvoker);
}

const napi_value* prepareInvocationArgs(napi_env env, Cif* cif,
                                        size_t actualArgc,
                                        const napi_value* rawArgs,
                                        std::vector<napi_value>* paddedArgs) {
  if (cif == nullptr || cif->argc == 0) {
    return nullptr;
  }

  if (actualArgc == cif->argc && rawArgs != nullptr) {
    return rawArgs;
  }

  napi_value jsUndefined = nullptr;
  napi_get_undefined(env, &jsUndefined);
  paddedArgs->assign(cif->argc, jsUndefined);
  const size_t copyArgc = std::min(actualArgc, static_cast<size_t>(cif->argc));
  if (copyArgc > 0 && rawArgs != nullptr) {
    std::memcpy(paddedArgs->data(), rawArgs, copyArgc * sizeof(napi_value));
  }
  return paddedArgs->data();
}

napi_value convertObjCReturnValue(napi_env env, ObjCClassMember* member,
                                  MethodDescriptor* descriptor, Cif* cif,
                                  id self, bool receiverIsClass,
                                  napi_value jsThis, void* rvalue,
                                  bool propertyAccess) {
  if (member == nullptr || descriptor == nullptr || cif == nullptr) {
    return nullptr;
  }

  const char* selectorName = sel_getName(descriptor->selector);
  if (selectorName != nullptr && std::strcmp(selectorName, "class") == 0) {
    if (!propertyAccess && !receiverIsClass) {
      napi_value constructor = jsThis;
      napi_get_named_property(env, jsThis, "constructor", &constructor);
      return constructor;
    }

    id classObject = receiverIsClass ? self : static_cast<id>(object_getClass(self));
    return member->bridgeState->getObject(env, classObject, kUnownedObject, 0, nullptr);
  }

  if (cif->returnType->kind == mdTypeInstanceObject) {
    napi_value constructor = jsThis;
    if (!receiverIsClass) {
      napi_get_named_property(env, jsThis, "constructor", &constructor);
    }

    id obj = *reinterpret_cast<id*>(rvalue);
    if (obj != nil) {
      ObjCBridgeState* state = ObjCBridgeState::InstanceData(env);
      if (state != nullptr) {
        napi_value cached = state->getCachedHandleObject(env, static_cast<void*>(obj));
        if (cached == nullptr) {
          cached = state->findCachedObjectWrapper(env, obj);
        }
        if (cached != nullptr) {
          return cached;
        }
      }
    }

    return member->bridgeState->getObject(
        env, obj, constructor, member->returnOwned ? kOwnedObject : kUnownedObject);
  }

  if (cif->returnType->kind == mdTypeAnyObject) {
    id obj = *reinterpret_cast<id*>(rvalue);
    if (receiverIsClass && obj != nil) {
      Class receiverClass = static_cast<Class>(self);
      if ((receiverClass == [NSString class] ||
           receiverClass == [NSMutableString class]) &&
          selectorName != nullptr &&
          (std::strcmp(selectorName, "string") == 0 ||
           std::strcmp(selectorName, "stringWithString:") == 0 ||
           std::strcmp(selectorName, "stringWithCapacity:") == 0)) {
        return member->bridgeState->getObject(env, obj, jsThis, kUnownedObject);
      }
    }
  }

  if (cif->returnType->kind == mdTypeAnyObject ||
      cif->returnType->kind == mdTypeProtocolObject ||
      cif->returnType->kind == mdTypeClassObject) {
    id obj = *reinterpret_cast<id*>(rvalue);
    if (obj != nil && ![obj isKindOfClass:[NSString class]] &&
        ![obj isKindOfClass:[NSNumber class]] &&
        ![obj isKindOfClass:[NSNull class]]) {
      ObjCBridgeState* state = ObjCBridgeState::InstanceData(env);
      if (state != nullptr) {
        napi_value cached = state->getCachedHandleObject(env, static_cast<void*>(obj));
        if (cached == nullptr) {
          cached = state->findCachedObjectWrapper(env, obj);
        }
        if (cached != nullptr) {
          return cached;
        }
      }
    }
  }

  napi_value fastResult = nullptr;
  if (TryFastConvertEngineReturnValue(env, cif->returnType->kind, rvalue,
                                      &fastResult)) {
    return fastResult;
  }

  return cif->returnType->toJS(env, rvalue, member->returnOwned ? kReturnOwned : 0);
}

napi_value convertCFunctionReturnValue(napi_env env, CFunction* function,
                                       Cif* cif, void* rvalue) {
  if (cif == nullptr) {
    return nullptr;
  }

  napi_value fastResult = nullptr;
  if (TryFastConvertEngineReturnValue(env, cif->returnType->kind, rvalue,
                                      &fastResult)) {
    return fastResult;
  }

  uint32_t toJSFlags = kCStringAsReference;
  if (function != nullptr && (function->dispatchFlags & 1) != 0) {
    toJSFlags |= kReturnOwned;
  }
  return cif->returnType->toJS(env, rvalue, toJSFlags);
}

bool isCompatOrMainCFunction(ObjCBridgeState* bridgeState, MDSectionOffset offset) {
  if (bridgeState == nullptr) {
    return true;
  }

  const char* name = bridgeState->metadata->getString(offset);
  return name == nullptr ||
         std::strcmp(name, "dispatch_async") == 0 ||
         std::strcmp(name, "dispatch_get_current_queue") == 0 ||
         std::strcmp(name, "dispatch_get_global_queue") == 0 ||
         std::strcmp(name, "UIApplicationMain") == 0 ||
         std::strcmp(name, "NSApplicationMain") == 0;
}

}  // namespace

napi_value TryCallObjCMemberEngineDirect(napi_env env, ObjCClassMember* member,
                                         napi_value jsThis, size_t actualArgc,
                                         const napi_value* rawArgs,
                                         EngineDirectMemberKind kind,
                                         bool* handled) {
  if (handled != nullptr) {
    *handled = false;
  }

  if (env == nullptr || member == nullptr || member->bridgeState == nullptr) {
    return nullptr;
  }

  if (kind == EngineDirectMemberKind::Method && !member->overloads.empty()) {
    return nullptr;
  }

  id self = resolveSelf(env, jsThis, member);
  if (self == nil) {
    if (handled != nullptr) {
      *handled = true;
    }
    return nullptr;
  }

  const bool receiverIsClass = object_isClass(self);
  Class receiverClass = receiverIsClass ? static_cast<Class>(self) : object_getClass(self);
  if (receiverClassRequiresSuperCall(receiverClass)) {
    return nullptr;
  }

  MethodDescriptor* descriptor = nullptr;
  Cif** cifSlot = nullptr;
  bool propertyAccess = false;
  switch (kind) {
    case EngineDirectMemberKind::Method:
      descriptor = &member->methodOrGetter;
      cifSlot = &member->cif;
      break;
    case EngineDirectMemberKind::Getter:
      descriptor = &member->methodOrGetter;
      cifSlot = &member->cif;
      propertyAccess = true;
      break;
    case EngineDirectMemberKind::Setter:
      descriptor = &member->setter;
      cifSlot = &member->setterCif;
      propertyAccess = true;
      break;
  }

  Cif* cif = resolveMethodDescriptorCif(env, member, descriptor, cifSlot,
                                        receiverIsClass, receiverClass);
  if (cif == nullptr) {
    return nullptr;
  }

  if (cif->isVariadic || isBlockFallbackSelector(descriptor->selector)) {
    return nullptr;
  }

  const bool isNSErrorOutMethod = isNSErrorOutMethodSignature(descriptor, cif);
  if (isNSErrorOutMethod) {
    if (!cif->isVariadic &&
        (actualArgc > cif->argc || actualArgc + 1 < cif->argc)) {
      throwArgumentsCountError(env, actualArgc, cif->argc);
      if (handled != nullptr) {
        *handled = true;
      }
    }
    return nullptr;
  }

  ObjCEngineDirectInvoker invoker =
      ensureObjCEngineDirectInvoker(cif, descriptor, descriptor->dispatchFlags);
  if (invoker == nullptr) {
    return nullptr;
  }

  std::vector<napi_value> paddedArgs;
  const napi_value* invocationArgs =
      prepareInvocationArgs(env, cif, actualArgc, rawArgs, &paddedArgs);

  CifReturnStorage rvalueStorage(cif);
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

  std::optional<RoundTripCacheFrameGuard> roundTripCacheFrame;
  if (needsRoundTripCacheFrame(cif)) {
    roundTripCacheFrame.emplace(env, member->bridgeState);
  }

  void* rvalue = rvalueStorage.get();
  bool didInvoke = false;
  @try {
    didInvoke = invoker(env, cif, reinterpret_cast<void*>(objc_msgSend), self,
                        descriptor->selector, invocationArgs, rvalue);
  } @catch (NSException* exception) {
    std::string message = exception.description.UTF8String;
    NativeScriptException nativeScriptException(message);
    nativeScriptException.ReThrowToJS(env);
    return nullptr;
  }

  if (!didInvoke) {
    return nullptr;
  }

  return convertObjCReturnValue(env, member, descriptor, cif, self,
                                receiverIsClass, jsThis, rvalue, propertyAccess);
}

napi_value TryCallCFunctionEngineDirect(napi_env env, MDSectionOffset offset,
                                        size_t actualArgc,
                                        const napi_value* rawArgs,
                                        bool* handled) {
  if (handled != nullptr) {
    *handled = false;
  }

  ObjCBridgeState* bridgeState = ObjCBridgeState::InstanceData(env);
  if (env == nullptr || bridgeState == nullptr ||
      isCompatOrMainCFunction(bridgeState, offset)) {
    return nullptr;
  }

  CFunction* function = bridgeState->getCFunction(env, offset);
  Cif* cif = function != nullptr ? function->cif : nullptr;
  if (function == nullptr || cif == nullptr || cif->isVariadic) {
    return nullptr;
  }

  CFunctionEngineDirectInvoker invoker =
      ensureCFunctionEngineDirectInvoker(function, cif);
  if (invoker == nullptr) {
    return nullptr;
  }

  std::vector<napi_value> paddedArgs;
  const napi_value* invocationArgs =
      prepareInvocationArgs(env, cif, actualArgc, rawArgs, &paddedArgs);

  if (handled != nullptr) {
    *handled = true;
  }

  std::optional<RoundTripCacheFrameGuard> roundTripCacheFrame;
  if (needsRoundTripCacheFrame(cif)) {
    roundTripCacheFrame.emplace(env, bridgeState);
  }

  bool didInvoke = false;
  @try {
    didInvoke = invoker(env, cif, function->fnptr, invocationArgs, cif->rvalue);
  } @catch (NSException* exception) {
    std::string message = exception.description.UTF8String;
    NativeScriptException nativeScriptException(message);
    nativeScriptException.ReThrowToJS(env);
    return nullptr;
  }

  if (!didInvoke) {
    return nullptr;
  }

  return convertCFunctionReturnValue(env, function, cif, cif->rvalue);
}

}  // namespace nativescript

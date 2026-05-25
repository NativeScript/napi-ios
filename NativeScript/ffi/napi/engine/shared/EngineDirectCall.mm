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

#include "ffi/napi/CFunction.h"
#include "ffi/napi/Class.h"
#include "ffi/napi/ClassBuilder.h"
#include "ffi/napi/ClassMember.h"
#include "ffi/napi/Interop.h"
#include "runtime/NativeScriptException.h"
#include "ffi/napi/ObjCBridge.h"
#include "SignatureDispatch.h"
#include "ffi/napi/TypeConv.h"

namespace nativescript {
namespace {

constexpr const char* kNativePointerProperty = "__ns_native_ptr";

inline bool needsRoundTripCacheFrame(Cif* cif) {
  return cif != nullptr && cif->generatedDispatchHasRoundTripCacheArgument;
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

inline size_t alignUpSize(size_t value, size_t alignment) {
  if (alignment == 0) {
    return value;
  }
  return ((value + alignment - 1) / alignment) * alignment;
}

size_t getCifArgumentStorageSize(Cif* cif, unsigned int argumentIndex,
                                 unsigned int implicitArgumentCount) {
  if (cif == nullptr || cif->cif.arg_types == nullptr) {
    return sizeof(void*);
  }

  const unsigned int ffiIndex = argumentIndex + implicitArgumentCount;
  if (ffiIndex >= cif->cif.nargs) {
    return sizeof(void*);
  }

  ffi_type* ffiArgType = cif->cif.arg_types[ffiIndex];
  size_t storageSize = ffiArgType != nullptr ? ffiArgType->size : 0;
  return storageSize != 0 ? storageSize : sizeof(void*);
}

size_t getCifArgumentStorageAlign(Cif* cif, unsigned int argumentIndex,
                                  unsigned int implicitArgumentCount) {
  if (cif == nullptr || cif->cif.arg_types == nullptr) {
    return alignof(void*);
  }

  const unsigned int ffiIndex = argumentIndex + implicitArgumentCount;
  if (ffiIndex >= cif->cif.nargs) {
    return alignof(void*);
  }

  ffi_type* ffiArgType = cif->cif.arg_types[ffiIndex];
  size_t alignment = ffiArgType != nullptr ? ffiArgType->alignment : 0;
  return alignment != 0 ? alignment : alignof(void*);
}

class EngineDirectArgumentStorage {
 public:
  EngineDirectArgumentStorage(Cif* cif, unsigned int implicitArgumentCount) {
    if (cif == nullptr || cif->argc == 0) {
      return;
    }

    count_ = cif->argc;
    if (count_ <= kInlineArgCount) {
      buffers_ = inlineBuffers_;
    } else {
      heapBuffers_.resize(count_, nullptr);
      buffers_ = heapBuffers_.data();
    }

    size_t totalSize = 0;
    for (unsigned int i = 0; i < count_; i++) {
      const size_t storageAlign =
          getCifArgumentStorageAlign(cif, i, implicitArgumentCount);
      const size_t storageSize =
          getCifArgumentStorageSize(cif, i, implicitArgumentCount);
      totalSize = alignUpSize(totalSize, storageAlign);
      totalSize += storageSize;
    }

    if (totalSize == 0) {
      totalSize = sizeof(void*);
    }

    storageBase_ = totalSize <= kInlineStorageSize
                       ? static_cast<void*>(inlineStorage_)
                       : std::malloc(totalSize);
    if (storageBase_ == nullptr) {
      valid_ = false;
      return;
    }

    std::memset(storageBase_, 0, totalSize);

    size_t offset = 0;
    for (unsigned int i = 0; i < count_; i++) {
      const size_t storageAlign =
          getCifArgumentStorageAlign(cif, i, implicitArgumentCount);
      const size_t storageSize =
          getCifArgumentStorageSize(cif, i, implicitArgumentCount);
      offset = alignUpSize(offset, storageAlign);
      buffers_[i] =
          static_cast<void*>(static_cast<unsigned char*>(storageBase_) + offset);
      offset += storageSize;
    }
  }

  ~EngineDirectArgumentStorage() {
    if (storageBase_ != nullptr && storageBase_ != inlineStorage_) {
      std::free(storageBase_);
    }
  }

  bool valid() const { return valid_; }

  void* at(unsigned int index) const {
    return index < count_ ? buffers_[index] : nullptr;
  }

 private:
  static constexpr unsigned int kInlineArgCount = 16;
  static constexpr size_t kInlineStorageSize = 256;
  alignas(max_align_t) unsigned char inlineStorage_[kInlineStorageSize];
  void* inlineBuffers_[kInlineArgCount] = {};
  std::vector<void*> heapBuffers_;
  void** buffers_ = inlineBuffers_;
  unsigned int count_ = 0;
  void* storageBase_ = nullptr;
  bool valid_ = true;
};

void reportNativeException(napi_env env, NSException* exception) {
  std::string message = exception.description.UTF8String;
  NativeScriptException nativeScriptException(message);
  nativeScriptException.ReThrowToJS(env);
}

const napi_value* prepareDynamicInvocationArgs(napi_env env, Cif* cif,
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

  napi_value* paddedArgs = stackArgs;
  if (cif->argc > stackCapacity) {
    heapArgs->assign(cif->argc, jsUndefined);
    paddedArgs = heapArgs->data();
  } else {
    for (unsigned int i = 0; i < cif->argc; i++) {
      paddedArgs[i] = jsUndefined;
    }
  }

  const size_t copyArgc = std::min(actualArgc, static_cast<size_t>(cif->argc));
  if (copyArgc > 0 && rawArgs != nullptr) {
    std::memcpy(paddedArgs, rawArgs, copyArgc * sizeof(napi_value));
  }
  return paddedArgs;
}

void freeObjCConvertedArguments(napi_env env, Cif* cif, void** avalues,
                                bool* shouldFree, bool shouldFreeAny) {
  if (!shouldFreeAny || cif == nullptr || avalues == nullptr ||
      shouldFree == nullptr) {
    return;
  }

  for (unsigned int i = 0; i < cif->argc; i++) {
    if (shouldFree[i]) {
      cif->argTypes[i]->free(env, *static_cast<void**>(avalues[i + 2]));
    }
  }
}

void freeCFunctionConvertedArguments(napi_env env, Cif* cif, void** avalues,
                                     bool* shouldFree, bool shouldFreeAny,
                                     void* rvalue) {
  if (!shouldFreeAny || cif == nullptr || avalues == nullptr ||
      shouldFree == nullptr) {
    return;
  }

  void* returnPointerValue = nullptr;
  const bool returnIsPointer =
      cif->returnType != nullptr && cif->returnType->type == &ffi_type_pointer;
  if (returnIsPointer && rvalue != nullptr) {
    returnPointerValue = *static_cast<void**>(rvalue);
  }

  for (unsigned int i = 0; i < cif->argc; i++) {
    if (!shouldFree[i]) {
      continue;
    }
    if (returnPointerValue != nullptr && avalues[i] != nullptr) {
      void* argPointerValue = *static_cast<void**>(avalues[i]);
      if (argPointerValue == returnPointerValue) {
        continue;
      }
    }
    cif->argTypes[i]->free(env, *static_cast<void**>(avalues[i]));
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
#ifdef TARGET_ENGINE_HERMES
    descriptor->hermesDirectReturnInvoker =
        reinterpret_cast<void*>(lookupObjCHermesDirectReturnInvoker(descriptor->dispatchId));
    descriptor->hermesFrameDirectReturnInvoker = reinterpret_cast<void*>(
        lookupObjCHermesFrameDirectReturnInvoker(descriptor->dispatchId));
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
#ifdef TARGET_ENGINE_V8
    function->v8Invoker =
        reinterpret_cast<void*>(lookupCFunctionV8Invoker(function->dispatchId));
#endif
#ifdef TARGET_ENGINE_HERMES
    function->hermesDirectReturnInvoker =
        reinterpret_cast<void*>(lookupCFunctionHermesDirectReturnInvoker(function->dispatchId));
    function->hermesFrameDirectReturnInvoker = reinterpret_cast<void*>(
        lookupCFunctionHermesFrameDirectReturnInvoker(function->dispatchId));
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
        if (napi_value cached = state->findCachedObjectWrapper(env, obj);
            cached != nullptr) {
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
        if (napi_value cached = state->findCachedObjectWrapper(env, obj);
            cached != nullptr) {
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

}  // namespace

bool InvokeObjCMemberEngineDirectDynamic(napi_env env, Cif* cif, id self,
                                         bool receiverIsClass,
                                         MethodDescriptor* descriptor,
                                         uint8_t dispatchFlags,
                                         size_t actualArgc,
                                         const napi_value* rawArgs,
                                         void* rvalue) {
  if (env == nullptr || cif == nullptr || self == nil ||
      descriptor == nullptr || rvalue == nullptr || cif->isVariadic) {
    return false;
  }

  Class receiverClass = receiverIsClass ? static_cast<Class>(self)
                                        : object_getClass(self);
  if (receiverClassRequiresSuperCall(receiverClass)) {
    return false;
  }

  napi_value stackPaddedArgs[16];
  std::vector<napi_value> heapPaddedArgs;
  const napi_value* invocationArgs = prepareDynamicInvocationArgs(
      env, cif, actualArgc, rawArgs, stackPaddedArgs, 16, &heapPaddedArgs);

  EngineDirectArgumentStorage argStorage(cif, 2);
  if (!argStorage.valid()) {
    napi_throw_error(env, "NativeScriptException",
                     "Unable to allocate argument storage for Objective-C call.");
    return false;
  }

  void* stackAvalues[32];
  std::vector<void*> heapAvalues;
  void** avalues = stackAvalues;
  if (cif->cif.nargs > 32) {
    heapAvalues.resize(cif->cif.nargs);
    avalues = heapAvalues.data();
  }

  SEL selector = descriptor->selector;
  avalues[0] = static_cast<void*>(&self);
  avalues[1] = static_cast<void*>(&selector);

  bool stackShouldFree[16] = {};
  std::vector<uint8_t> heapShouldFree;
  if (cif->argc > 16) {
    heapShouldFree.assign(cif->argc, 0);
  }

  bool shouldFreeAny = false;
  for (unsigned int i = 0; i < cif->argc; i++) {
    bool shouldFreeArg = false;
    avalues[i + 2] = argStorage.at(i);
    if (!TryFastConvertEngineArgument(env, cif->argTypes[i]->kind,
                                      invocationArgs[i], avalues[i + 2])) {
      cif->argTypes[i]->toNative(env, invocationArgs[i], avalues[i + 2],
                                 &shouldFreeArg, &shouldFreeAny);
    }
    if (cif->argc > 16) {
      heapShouldFree[i] = shouldFreeArg ? 1 : 0;
    } else {
      stackShouldFree[i] = shouldFreeArg;
    }
  }

  bool didInvoke = false;
  @try {
    auto preparedInvoker =
        reinterpret_cast<ObjCPreparedInvoker>(descriptor->preparedInvoker);
    if (preparedInvoker != nullptr) {
      preparedInvoker(reinterpret_cast<void*>(objc_msgSend), avalues, rvalue);
    } else {
#if defined(__x86_64__)
      const bool isStret =
          cif->returnType != nullptr && cif->returnType->type != nullptr &&
          cif->returnType->type->size > 16 &&
          cif->returnType->type->type == FFI_TYPE_STRUCT;
      ffi_call(&cif->cif,
               isStret ? FFI_FN(objc_msgSend_stret) : FFI_FN(objc_msgSend),
               rvalue, avalues);
#else
      ffi_call(&cif->cif, FFI_FN(objc_msgSend), rvalue, avalues);
#endif
    }
    didInvoke = true;
  } @catch (NSException* exception) {
    reportNativeException(env, exception);
  }

  if (cif->argc > 16 && shouldFreeAny) {
    for (unsigned int i = 0; i < cif->argc; i++) {
      if (heapShouldFree[i] != 0) {
        cif->argTypes[i]->free(env, *static_cast<void**>(avalues[i + 2]));
      }
    }
  } else {
    freeObjCConvertedArguments(env, cif, avalues, stackShouldFree,
                               shouldFreeAny);
  }

  return didInvoke;
}

bool InvokeCFunctionEngineDirectDynamic(napi_env env, CFunction* function,
                                        Cif* cif, size_t actualArgc,
                                        const napi_value* rawArgs,
                                        void* rvalue) {
  if (env == nullptr || function == nullptr || cif == nullptr ||
      function->fnptr == nullptr || rvalue == nullptr || cif->isVariadic) {
    return false;
  }

  napi_value stackPaddedArgs[16];
  std::vector<napi_value> heapPaddedArgs;
  const napi_value* invocationArgs = prepareDynamicInvocationArgs(
      env, cif, actualArgc, rawArgs, stackPaddedArgs, 16, &heapPaddedArgs);

  void* stackAvalues[16];
  std::vector<void*> heapAvalues;
  void** avalues = stackAvalues;
  if (cif->argc > 16) {
    heapAvalues.resize(cif->argc);
    avalues = heapAvalues.data();
  }

  bool stackShouldFree[16] = {};
  std::vector<uint8_t> heapShouldFree;
  if (cif->argc > 16) {
    heapShouldFree.reserve(cif->argc);
  }
  bool shouldFreeAny = false;

  for (unsigned int i = 0; i < cif->argc; i++) {
    bool shouldFreeArg = false;
    avalues[i] = cif->avalues[i];
    if (!TryFastConvertEngineArgument(env, cif->argTypes[i]->kind,
                                      invocationArgs[i], avalues[i])) {
      cif->argTypes[i]->toNative(env, invocationArgs[i], avalues[i],
                                 &shouldFreeArg, &shouldFreeAny);
    }
    if (cif->argc > 16) {
      heapShouldFree.push_back(shouldFreeArg ? 1 : 0);
    } else {
      stackShouldFree[i] = shouldFreeArg;
    }
  }

  bool didInvoke = false;
  @try {
    auto preparedInvoker =
        reinterpret_cast<CFunctionPreparedInvoker>(function->preparedInvoker);
    if (preparedInvoker != nullptr) {
      preparedInvoker(function->fnptr, avalues, rvalue);
    } else {
      ffi_call(&cif->cif, FFI_FN(function->fnptr), rvalue, avalues);
    }
    didInvoke = true;
  } @catch (NSException* exception) {
    reportNativeException(env, exception);
  }

  if (cif->argc > 16) {
    if (shouldFreeAny) {
      void* returnPointerValue = nullptr;
      const bool returnIsPointer =
          cif->returnType != nullptr &&
          cif->returnType->type == &ffi_type_pointer;
      if (returnIsPointer && rvalue != nullptr) {
        returnPointerValue = *static_cast<void**>(rvalue);
      }
      for (unsigned int i = 0; i < cif->argc; i++) {
        if (heapShouldFree[i] == 0) {
          continue;
        }
        if (returnPointerValue != nullptr && avalues[i] != nullptr) {
          void* argPointerValue = *static_cast<void**>(avalues[i]);
          if (argPointerValue == returnPointerValue) {
            continue;
          }
        }
        cif->argTypes[i]->free(env, *static_cast<void**>(avalues[i]));
      }
    }
  } else {
    freeCFunctionConvertedArguments(env, cif, avalues, stackShouldFree,
                                    shouldFreeAny, rvalue);
  }

  return didInvoke;
}

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
    if (invoker != nullptr) {
      didInvoke = invoker(env, cif, reinterpret_cast<void*>(objc_msgSend), self,
                          descriptor->selector, invocationArgs, rvalue);
    } else {
      didInvoke = InvokeObjCMemberEngineDirectDynamic(
          env, cif, self, receiverIsClass, descriptor, descriptor->dispatchFlags,
          actualArgc, rawArgs, rvalue);
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
  if (env == nullptr || bridgeState == nullptr) {
    return nullptr;
  }

  CFunction* function = bridgeState->getCFunction(env, offset);
  Cif* cif = function != nullptr ? function->cif : nullptr;
  if (function == nullptr || function->skipEngineDirectFastPath ||
      cif == nullptr || cif->isVariadic) {
    return nullptr;
  }

  CFunctionEngineDirectInvoker invoker =
      ensureCFunctionEngineDirectInvoker(function, cif);

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
  CifReturnStorage rvalueStorage(cif);
  if (!rvalueStorage.valid()) {
    napi_throw_error(env, "NativeScriptException",
                     "Unable to allocate C function return storage.");
    return nullptr;
  }
  void* rvalue = rvalueStorage.get();
  @try {
    if (invoker != nullptr) {
      didInvoke = invoker(env, cif, function->fnptr, invocationArgs, rvalue);
    } else {
      didInvoke = InvokeCFunctionEngineDirectDynamic(
          env, function, cif, actualArgc, rawArgs, rvalue);
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

  return convertCFunctionReturnValue(env, function, cif, rvalue);
}

}  // namespace nativescript

#include "HermesFastNativeApi.h"

#ifdef TARGET_ENGINE_HERMES

#import <Foundation/Foundation.h>
#include <objc/message.h>
#include <objc/runtime.h>

#include <algorithm>
#include <cmath>
#include <cstddef>
#include <cstdint>
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
constexpr uint64_t kHermesFirstTaggedValue = 0xfff9000000000000ULL;
constexpr uint64_t kHermesBoolETag = 0x1fff6ULL;
constexpr uint64_t kHermesBoolBit = 1ULL << 46;

inline bool isHermesNumber(uint64_t raw) {
  return raw < kHermesFirstTaggedValue;
}

inline bool isHermesBool(uint64_t raw) {
  return (raw >> 47) == kHermesBoolETag;
}

inline double hermesRawToDouble(uint64_t raw) {
  double value = 0.0;
  std::memcpy(&value, &raw, sizeof(value));
  return value;
}

inline bool readHermesFiniteNumber(napi_value value, double* result) {
  if (value == nullptr || result == nullptr) {
    return false;
  }

  const uint64_t raw = *reinterpret_cast<const uint64_t*>(value);
  if (!isHermesNumber(raw)) {
    return false;
  }

  double converted = hermesRawToDouble(raw);
  if (std::isnan(converted) || std::isinf(converted)) {
    converted = 0.0;
  }
  *result = converted;
  return true;
}

inline napi_value makeHermesRawValue(uint64_t raw) {
  static thread_local uint64_t slots[8] = {};
  static thread_local unsigned int nextSlot = 0;
  uint64_t* slot = &slots[nextSlot++ & 7];
  *slot = raw;
  return reinterpret_cast<napi_value>(slot);
}

inline napi_value makeHermesRawNumberValue(double value) {
  uint64_t raw = 0;
  std::memcpy(&raw, &value, sizeof(raw));
  return makeHermesRawValue(raw);
}

inline napi_value makeHermesRawBoolValue(bool value) {
  return makeHermesRawValue((kHermesBoolETag << 47) |
                            (value ? kHermesBoolBit : 0));
}

SEL cachedSelectorForName(const char* selectorName, size_t length) {
  struct LastSelectorCacheEntry {
    std::string name;
    SEL selector = nullptr;
  };

  static thread_local LastSelectorCacheEntry lastSelector;
  if (lastSelector.selector != nullptr && lastSelector.name.size() == length &&
      memcmp(lastSelector.name.data(), selectorName, length) == 0) {
    return lastSelector.selector;
  }

  static thread_local std::unordered_map<std::string, SEL> selectorCache;
  std::string key(selectorName, length);
  auto cached = selectorCache.find(key);
  if (cached != selectorCache.end()) {
    lastSelector.name = cached->first;
    lastSelector.selector = cached->second;
    return cached->second;
  }

  SEL selector = sel_registerName(key.c_str());
  if (selectorCache.size() < 4096) {
    auto inserted = selectorCache.emplace(std::move(key), selector);
    lastSelector.name = inserted.first->first;
  } else {
    lastSelector.name.assign(selectorName, length);
  }
  lastSelector.selector = selector;
  return selector;
}

bool tryFastConvertHermesSelectorArgument(napi_env env, napi_value value,
                                          SEL* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  constexpr size_t kStackCapacity = 256;
  char stackBuffer[kStackCapacity];
  size_t length = 0;
  napi_status status = napi_get_value_string_utf8(
      env, value, stackBuffer, kStackCapacity, &length);
  if (status == napi_ok && length + 1 < kStackCapacity) {
    *result = cachedSelectorForName(stackBuffer, length);
    return true;
  }

  if (status == napi_ok || status == napi_string_expected) {
    if (status == napi_string_expected) {
      napi_valuetype valueType = napi_undefined;
      if (napi_typeof(env, value, &valueType) == napi_ok &&
          (valueType == napi_null || valueType == napi_undefined)) {
        *result = nullptr;
        return true;
      }
      return false;
    }

    if (napi_get_value_string_utf8(env, value, nullptr, 0, &length) !=
        napi_ok) {
      return false;
    }

    std::vector<char> heapBuffer(length + 1, '\0');
    if (napi_get_value_string_utf8(env, value, heapBuffer.data(),
                                   heapBuffer.size(), &length) != napi_ok) {
      return false;
    }
    *result = cachedSelectorForName(heapBuffer.data(), length);
    return true;
  }

  return false;
}

bool tryFastUnwrapHermesObjectArgument(napi_env env, MDTypeKind kind,
                                       napi_value value, void* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  void* wrapped = nullptr;
  if (napi_unwrap(env, value, &wrapped) != napi_ok || wrapped == nullptr) {
    return false;
  }

  if (kind == mdTypeClass) {
    id nativeObject = static_cast<id>(wrapped);
    if (!object_isClass(nativeObject)) {
      return false;
    }
    *reinterpret_cast<Class*>(result) = static_cast<Class>(wrapped);
    return true;
  }

  *reinterpret_cast<id*>(result) = static_cast<id>(wrapped);
  return true;
}

inline bool needsRoundTripCacheFrame(Cif* cif) {
  return cif != nullptr &&
         (cif->generatedDispatchHasRoundTripCacheArgument ||
          cif->generatedDispatchUsesObjectReturnStorage);
}

class HermesFastRoundTripCacheFrameGuard {
 public:
  HermesFastRoundTripCacheFrameGuard(napi_env env, ObjCBridgeState* bridgeState)
      : env_(env), bridgeState_(bridgeState) {
    if (bridgeState_ != nullptr) {
      bridgeState_->beginRoundTripCacheFrame(env_);
    }
  }

  ~HermesFastRoundTripCacheFrameGuard() {
    if (bridgeState_ != nullptr) {
      bridgeState_->endRoundTripCacheFrame(env_);
    }
  }

 private:
  napi_env env_ = nullptr;
  ObjCBridgeState* bridgeState_ = nullptr;
};

class HermesFastReturnStorage {
 public:
  explicit HermesFastReturnStorage(Cif* cif) {
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

  ~HermesFastReturnStorage() {
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

inline bool isBlockFallbackSelector(SEL selector) {
  return selector == @selector(methodWithSimpleBlock:) ||
         selector == @selector(methodRetainingBlock:) ||
         selector == @selector(methodWithBlock:) ||
         selector == @selector(methodWithComplexBlock:);
}

id resolveHermesSelf(napi_env env, napi_value jsThis, ObjCClassMember* method) {
  id self = nil;
  ObjCBridgeState* state = ObjCBridgeState::InstanceData(env);

  napi_status unwrapStatus = napi_invalid_arg;
  if (jsThis != nullptr) {
    unwrapStatus = napi_unwrap(env, jsThis, reinterpret_cast<void**>(&self));
    if (unwrapStatus == napi_ok && self != nil) {
      return self;
    }
  }

  if (state != nullptr && jsThis != nullptr) {
    state->tryResolveBridgedTypeConstructor(env, jsThis, &self);
  }

  if (self == nil && jsThis != nullptr) {
    napi_value nativePointerValue = nullptr;
    if (napi_get_named_property(env, jsThis, kNativePointerProperty,
                                &nativePointerValue) == napi_ok &&
        Pointer::isInstance(env, nativePointerValue)) {
      Pointer* nativePointer = Pointer::unwrap(env, nativePointerValue);
      if (nativePointer != nullptr && nativePointer->data != nullptr) {
        self = static_cast<id>(nativePointer->data);
      }
    }
  }

  if (self != nil) {
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
    descriptor->dispatchLookupCached = true;
  }

  return reinterpret_cast<ObjCEngineDirectInvoker>(
      descriptor->engineDirectInvoker);
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
    function->dispatchLookupCached = true;
  }

  return reinterpret_cast<CFunctionEngineDirectInvoker>(
      function->engineDirectInvoker);
}

napi_value makeHermesObjCReturnValue(napi_env env, ObjCClassMember* member,
                                     MethodDescriptor* descriptor, Cif* cif,
                                     id self, bool receiverIsClass,
                                     napi_value jsThis, void* rvalue,
                                     bool propertyAccess) {
  if (member == nullptr || descriptor == nullptr || cif == nullptr ||
      cif->returnType == nullptr) {
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

  if (cif->returnType->kind == mdTypeAnyObject && receiverIsClass) {
    id obj = *reinterpret_cast<id*>(rvalue);
    Class receiverClass = static_cast<Class>(self);
    if (obj != nil &&
        (receiverClass == [NSString class] ||
         receiverClass == [NSMutableString class]) &&
        selectorName != nullptr &&
        (std::strcmp(selectorName, "string") == 0 ||
         std::strcmp(selectorName, "stringWithString:") == 0 ||
         std::strcmp(selectorName, "stringWithCapacity:") == 0)) {
      return member->bridgeState->getObject(env, obj, jsThis, kUnownedObject);
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
  if (TryFastConvertHermesReturnValue(env, cif->returnType->kind, rvalue,
                                      &fastResult)) {
    return fastResult;
  }

  return cif->returnType->toJS(env, rvalue,
                               member->returnOwned ? kReturnOwned : 0);
}

napi_value makeHermesCFunctionReturnValue(napi_env env, CFunction* function,
                                          Cif* cif, void* rvalue) {
  if (cif == nullptr || cif->returnType == nullptr) {
    return nullptr;
  }

  napi_value fastResult = nullptr;
  if (TryFastConvertHermesReturnValue(env, cif->returnType->kind, rvalue,
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

bool TryFastConvertHermesBoolArgument(napi_env env, napi_value value,
                                      uint8_t* result) {
  if (value == nullptr || result == nullptr) {
    return false;
  }

  const uint64_t raw = *reinterpret_cast<const uint64_t*>(value);
  if (!isHermesBool(raw)) {
    return false;
  }
  *result = (raw & kHermesBoolBit) != 0 ? static_cast<uint8_t>(1)
                                        : static_cast<uint8_t>(0);
  return true;
}

bool TryFastConvertHermesDoubleArgument(napi_env env, napi_value value,
                                        double* result) {
  return readHermesFiniteNumber(value, result);
}

bool TryFastConvertHermesFloatArgument(napi_env env, napi_value value,
                                       float* result) {
  double converted = 0.0;
  if (!TryFastConvertHermesDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<float>(converted);
  return true;
}

bool TryFastConvertHermesInt8Argument(napi_env env, napi_value value,
                                      int8_t* result) {
  double converted = 0.0;
  if (!TryFastConvertHermesDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<int8_t>(converted);
  return true;
}

bool TryFastConvertHermesUInt8Argument(napi_env env, napi_value value,
                                       uint8_t* result) {
  double converted = 0.0;
  if (!TryFastConvertHermesDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<uint8_t>(converted);
  return true;
}

bool TryFastConvertHermesInt16Argument(napi_env env, napi_value value,
                                       int16_t* result) {
  double converted = 0.0;
  if (!TryFastConvertHermesDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<int16_t>(converted);
  return true;
}

bool TryFastConvertHermesUInt16Argument(napi_env env, napi_value value,
                                        uint16_t* result) {
  if (value == nullptr || result == nullptr) {
    return false;
  }

  double converted = 0.0;
  if (readHermesFiniteNumber(value, &converted)) {
    *result = static_cast<uint16_t>(converted);
    return true;
  }
  return TryFastConvertNapiUInt16Argument(env, value, result);
}

bool TryFastConvertHermesInt32Argument(napi_env env, napi_value value,
                                       int32_t* result) {
  double converted = 0.0;
  if (!TryFastConvertHermesDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<int32_t>(converted);
  return true;
}

bool TryFastConvertHermesUInt32Argument(napi_env env, napi_value value,
                                        uint32_t* result) {
  double converted = 0.0;
  if (!TryFastConvertHermesDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<uint32_t>(converted);
  return true;
}

bool TryFastConvertHermesInt64Argument(napi_env env, napi_value value,
                                       int64_t* result) {
  if (value == nullptr || result == nullptr) {
    return false;
  }

  double converted = 0.0;
  if (readHermesFiniteNumber(value, &converted)) {
    *result = static_cast<int64_t>(converted);
    return true;
  }

  bool lossless = false;
  return napi_get_value_bigint_int64(env, value, result, &lossless) == napi_ok;
}

bool TryFastConvertHermesUInt64Argument(napi_env env, napi_value value,
                                        uint64_t* result) {
  if (value == nullptr || result == nullptr) {
    return false;
  }

  double converted = 0.0;
  if (readHermesFiniteNumber(value, &converted)) {
    *result = static_cast<uint64_t>(converted);
    return true;
  }

  bool lossless = false;
  return napi_get_value_bigint_uint64(env, value, result, &lossless) == napi_ok;
}

bool TryFastConvertHermesSelectorArgument(napi_env env, napi_value value,
                                          SEL* result) {
  return tryFastConvertHermesSelectorArgument(env, value, result);
}

bool TryFastConvertHermesObjectArgument(napi_env env, MDTypeKind kind,
                                        napi_value value, void* result) {
  if (tryFastUnwrapHermesObjectArgument(env, kind, value, result)) {
    return true;
  }
  return false;
}

bool TryFastConvertHermesArgument(napi_env env, MDTypeKind kind,
                                  napi_value value, void* result) {
  if (value == nullptr || result == nullptr) {
    return false;
  }

  switch (kind) {
    case mdTypeBool:
      return TryFastConvertHermesBoolArgument(
          env, value, reinterpret_cast<uint8_t*>(result));
    case mdTypeChar:
      return TryFastConvertHermesInt8Argument(
          env, value, reinterpret_cast<int8_t*>(result));
    case mdTypeUChar:
    case mdTypeUInt8:
      return TryFastConvertHermesUInt8Argument(
          env, value, reinterpret_cast<uint8_t*>(result));
    case mdTypeSShort:
      return TryFastConvertHermesInt16Argument(
          env, value, reinterpret_cast<int16_t*>(result));
    case mdTypeUShort:
      return TryFastConvertHermesUInt16Argument(
          env, value, reinterpret_cast<uint16_t*>(result));
    case mdTypeSInt:
      return TryFastConvertHermesInt32Argument(
          env, value, reinterpret_cast<int32_t*>(result));
    case mdTypeUInt:
      return TryFastConvertHermesUInt32Argument(
          env, value, reinterpret_cast<uint32_t*>(result));
    case mdTypeSLong:
    case mdTypeSInt64:
      return TryFastConvertHermesInt64Argument(
          env, value, reinterpret_cast<int64_t*>(result));
    case mdTypeULong:
    case mdTypeUInt64:
      return TryFastConvertHermesUInt64Argument(
          env, value, reinterpret_cast<uint64_t*>(result));
    case mdTypeFloat:
      return TryFastConvertHermesFloatArgument(
          env, value, reinterpret_cast<float*>(result));
    case mdTypeDouble:
      return TryFastConvertHermesDoubleArgument(
          env, value, reinterpret_cast<double*>(result));
    case mdTypeSelector:
      return TryFastConvertHermesSelectorArgument(
          env, value, reinterpret_cast<SEL*>(result));
    case mdTypeClass:
    case mdTypeAnyObject:
    case mdTypeProtocolObject:
    case mdTypeClassObject:
    case mdTypeInstanceObject:
    case mdTypeNSStringObject:
    case mdTypeNSMutableStringObject:
      if (TryFastConvertHermesObjectArgument(env, kind, value, result)) {
        return true;
      }
      return TryFastConvertNapiArgument(env, kind, value, result);

    default:
      return false;
  }
}

bool TryFastConvertHermesReturnValue(napi_env env, MDTypeKind kind,
                                     const void* value, napi_value* result) {
  if (env == nullptr || result == nullptr) {
    return false;
  }

  switch (kind) {
    case mdTypeVoid:
      return napi_get_null(env, result) == napi_ok;

    case mdTypeBool:
      if (value == nullptr) {
        return false;
      }
      *result =
          makeHermesRawBoolValue(*reinterpret_cast<const uint8_t*>(value) != 0);
      return true;

    case mdTypeChar: {
      if (value == nullptr) {
        return false;
      }
      const int8_t raw = *reinterpret_cast<const int8_t*>(value);
      if (raw == 0 || raw == 1) {
        *result = makeHermesRawBoolValue(raw == 1);
        return true;
      }
      *result = makeHermesRawNumberValue(static_cast<double>(raw));
      return true;
    }

    case mdTypeUChar:
    case mdTypeUInt8: {
      if (value == nullptr) {
        return false;
      }
      const uint8_t raw = *reinterpret_cast<const uint8_t*>(value);
      if (raw == 0 || raw == 1) {
        *result = makeHermesRawBoolValue(raw == 1);
        return true;
      }
      *result = makeHermesRawNumberValue(static_cast<double>(raw));
      return true;
    }

    case mdTypeSShort:
      if (value == nullptr) {
        return false;
      }
      *result = makeHermesRawNumberValue(
          static_cast<double>(*reinterpret_cast<const int16_t*>(value)));
      return true;

    case mdTypeUShort: {
      if (value == nullptr) {
        return false;
      }
      const uint16_t raw = *reinterpret_cast<const uint16_t*>(value);
      if (raw >= 32 && raw <= 126) {
        const char buffer[2] = {static_cast<char>(raw), '\0'};
        return napi_create_string_utf8(env, buffer, NAPI_AUTO_LENGTH,
                                       result) == napi_ok;
      }
      *result = makeHermesRawNumberValue(static_cast<double>(raw));
      return true;
    }

    case mdTypeSInt:
      if (value == nullptr) {
        return false;
      }
      *result = makeHermesRawNumberValue(
          static_cast<double>(*reinterpret_cast<const int32_t*>(value)));
      return true;

    case mdTypeUInt:
      if (value == nullptr) {
        return false;
      }
      *result = makeHermesRawNumberValue(
          static_cast<double>(*reinterpret_cast<const uint32_t*>(value)));
      return true;

    case mdTypeSLong:
    case mdTypeSInt64: {
      if (value == nullptr) {
        return false;
      }
      const int64_t raw = *reinterpret_cast<const int64_t*>(value);
      constexpr int64_t kMaxSafeInteger = 9007199254740991LL;
      if (raw > kMaxSafeInteger || raw < -kMaxSafeInteger) {
        return napi_create_bigint_int64(env, raw, result) == napi_ok;
      }
      *result = makeHermesRawNumberValue(static_cast<double>(raw));
      return true;
    }

    case mdTypeULong:
    case mdTypeUInt64: {
      if (value == nullptr) {
        return false;
      }
      const uint64_t raw = *reinterpret_cast<const uint64_t*>(value);
      constexpr uint64_t kMaxSafeInteger = 9007199254740991ULL;
      if (raw > kMaxSafeInteger) {
        return napi_create_bigint_uint64(env, raw, result) == napi_ok;
      }
      *result = makeHermesRawNumberValue(static_cast<double>(raw));
      return true;
    }

    case mdTypeFloat:
      if (value == nullptr) {
        return false;
      }
      *result = makeHermesRawNumberValue(
          static_cast<double>(*reinterpret_cast<const float*>(value)));
      return true;

    case mdTypeDouble:
      if (value == nullptr) {
        return false;
      }
      *result = makeHermesRawNumberValue(
          *reinterpret_cast<const double*>(value));
      return true;

    default:
      return false;
  }
}

napi_value TryCallHermesObjCMemberFast(napi_env env, ObjCClassMember* member,
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

  MethodDescriptor* descriptor = nullptr;
  Cif* cif = hermesMemberCif(env, member, kind, &descriptor);
  if (cif == nullptr || cif->isVariadic || cif->returnType == nullptr) {
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

  if (isBlockFallbackSelector(descriptor->selector)) {
    return nullptr;
  }

  ObjCEngineDirectInvoker invoker =
      cif->signatureHash != 0
          ? ensureHermesObjCEngineDirectInvoker(cif, descriptor,
                                                descriptor->dispatchFlags)
          : nullptr;

  id self = resolveHermesSelf(env, jsThis, member);
  if (self == nil) {
    if (handled != nullptr) {
      *handled = true;
    }
    return nullptr;
  }

  const bool receiverIsClass = object_isClass(self);
  Class receiverClass =
      receiverIsClass ? static_cast<Class>(self) : object_getClass(self);
  if (receiverClassRequiresHermesSuperCall(receiverClass)) {
    return nullptr;
  }

  napi_value stackPaddedArgs[16];
  std::vector<napi_value> heapPaddedArgs;
  const napi_value* invocationArgs = prepareHermesInvocationArgs(
      env, cif, actualArgc, rawArgs, stackPaddedArgs, 16, &heapPaddedArgs);

  HermesFastReturnStorage rvalueStorage(cif);
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

  std::optional<HermesFastRoundTripCacheFrameGuard> roundTripCacheFrame;
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
          env, cif, self, receiverIsClass, descriptor,
          descriptor->dispatchFlags, actualArgc, rawArgs, rvalue);
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

napi_value TryCallHermesCFunctionFast(napi_env env, MDSectionOffset offset,
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
  if (function == nullptr || cif == nullptr || cif->isVariadic ||
      cif->returnType == nullptr) {
    return nullptr;
  }

  CFunctionEngineDirectInvoker invoker =
      cif->signatureHash != 0
          ? ensureHermesCFunctionEngineDirectInvoker(function, cif)
          : nullptr;

  napi_value stackPaddedArgs[16];
  std::vector<napi_value> heapPaddedArgs;
  const napi_value* invocationArgs = prepareHermesInvocationArgs(
      env, cif, actualArgc, rawArgs, stackPaddedArgs, 16, &heapPaddedArgs);

  if (handled != nullptr) {
    *handled = true;
  }

  std::optional<HermesFastRoundTripCacheFrameGuard> roundTripCacheFrame;
  if (needsRoundTripCacheFrame(cif)) {
    roundTripCacheFrame.emplace(env, bridgeState);
  }

  bool didInvoke = false;
  @try {
    if (invoker != nullptr) {
      didInvoke = invoker(env, cif, function->fnptr, invocationArgs, cif->rvalue);
    } else {
      didInvoke = InvokeCFunctionEngineDirectDynamic(
          env, function, cif, actualArgc, rawArgs, cif->rvalue);
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

  return makeHermesCFunctionReturnValue(env, function, cif, cif->rvalue);
}

}  // namespace nativescript

#endif  // TARGET_ENGINE_HERMES

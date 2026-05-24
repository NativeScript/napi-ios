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
#include <string>
#include <unordered_map>
#include <vector>

#include "ffi/napi/CFunction.h"
#include "ffi/napi/CallbackThreading.h"
#include "ffi/napi/Class.h"
#include "ffi/napi/ClassBuilder.h"
#include "ffi/napi/ClassMember.h"
#include "ffi/napi/Interop.h"
#include "ffi/napi/NativeScriptException.h"
#include "ffi/napi/ObjCBridge.h"
#include "SignatureDispatch.h"
#include "ffi/napi/TypeConv.h"

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

inline uint64_t hermesRawValueBits(napi_value value) {
  return value != nullptr ? *reinterpret_cast<const uint64_t*>(value) : 0;
}

inline double hermesRawToDouble(uint64_t raw) {
  double value = 0.0;
  std::memcpy(&value, &raw, sizeof(value));
  return value;
}

inline bool hermesRawDoubleIsFinite(uint64_t raw) {
  constexpr uint64_t kExponentMask = 0x7ff0000000000000ULL;
  return (raw & kExponentMask) != kExponentMask;
}

inline bool readHermesFiniteNumber(napi_value value, double* result) {
  if (value == nullptr || result == nullptr) {
    return false;
  }

  const uint64_t raw = *reinterpret_cast<const uint64_t*>(value);
  if (!isHermesNumber(raw)) {
    return false;
  }

  *result = hermesRawDoubleIsFinite(raw) ? hermesRawToDouble(raw) : 0.0;
  return true;
}

inline napi_value makeHermesRawValue(Cif* cif, uint64_t raw) {
  if (cif != nullptr) {
    cif->hermesRawReturnSlot = raw;
    return reinterpret_cast<napi_value>(&cif->hermesRawReturnSlot);
  }

  static thread_local uint64_t slots[64] = {};
  static thread_local unsigned int nextSlot = 0;
  uint64_t* slot = &slots[nextSlot++ & 63];
  *slot = raw;
  return reinterpret_cast<napi_value>(slot);
}

inline napi_value makeHermesRawNumberValue(Cif* cif, double value) {
  uint64_t raw = 0;
  std::memcpy(&raw, &value, sizeof(raw));
  return makeHermesRawValue(cif, raw);
}

inline napi_value makeHermesRawBoolValue(Cif* cif, bool value) {
  return makeHermesRawValue(cif, (kHermesBoolETag << 47) |
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

  struct SelectorArgumentCacheEntry {
    napi_env env = nullptr;
    uint64_t rawValue = 0;
    SEL selector = nullptr;
  };

  static thread_local SelectorArgumentCacheEntry lastSelectorArgument;
  const uint64_t rawValue = hermesRawValueBits(value);
  if (rawValue != 0 && lastSelectorArgument.env == env &&
      lastSelectorArgument.rawValue == rawValue &&
      lastSelectorArgument.selector != nullptr) {
    *result = lastSelectorArgument.selector;
    return true;
  }

  constexpr size_t kStackCapacity = 256;
  char stackBuffer[kStackCapacity];
  size_t length = 0;
  napi_status status = napi_get_value_string_utf8(
      env, value, stackBuffer, kStackCapacity, &length);
  if (status == napi_ok && length + 1 < kStackCapacity) {
    SEL selector = cachedSelectorForName(stackBuffer, length);
    lastSelectorArgument = {env, rawValue, selector};
    *result = selector;
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
    SEL selector = cachedSelectorForName(heapBuffer.data(), length);
    lastSelectorArgument = {env, rawValue, selector};
    *result = selector;
    return true;
  }

  return false;
}

bool tryFastConvertHermesStringToNSStringArgument(napi_env env,
                                                  napi_value value,
                                                  id* result,
                                                  bool mutableString) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  if (mutableString) {
    constexpr size_t kStackUtf16Capacity = 128;
    char16_t utf16Stack[kStackUtf16Capacity];
    char16_t* utf16Buffer = utf16Stack;
    size_t utf16Capacity = kStackUtf16Capacity;
    size_t utf16Length = 0;
    if (napi_get_value_string_utf16(env, value, utf16Buffer, utf16Capacity,
                                    &utf16Length) != napi_ok) {
      return false;
    }

    std::vector<char16_t> utf16Heap;
    if (utf16Length + 1 >= utf16Capacity) {
      if (napi_get_value_string_utf16(env, value, nullptr, 0, &utf16Length) !=
          napi_ok) {
        return false;
      }
      utf16Heap.resize(utf16Length + 1, 0);
      utf16Buffer = utf16Heap.data();
      utf16Capacity = utf16Heap.size();
      if (napi_get_value_string_utf16(env, value, utf16Buffer, utf16Capacity,
                                      &utf16Length) != napi_ok) {
        return false;
      }
    }

    *result =
        [[[NSMutableString alloc]
            initWithCharacters:reinterpret_cast<const unichar*>(utf16Buffer)
                        length:utf16Length] autorelease];
    return true;
  }

  constexpr size_t kStackUtf8Capacity = 256;
  char utf8Stack[kStackUtf8Capacity];
  char* utf8Buffer = utf8Stack;
  size_t utf8Capacity = kStackUtf8Capacity;
  size_t utf8Length = 0;
  if (napi_get_value_string_utf8(env, value, utf8Buffer, utf8Capacity,
                                 &utf8Length) != napi_ok) {
    return false;
  }

  std::vector<char> utf8Heap;
  if (utf8Length + 1 >= utf8Capacity) {
    if (napi_get_value_string_utf8(env, value, nullptr, 0, &utf8Length) !=
        napi_ok) {
      return false;
    }
    utf8Heap.resize(utf8Length + 1, '\0');
    utf8Buffer = utf8Heap.data();
    utf8Capacity = utf8Heap.size();
    if (napi_get_value_string_utf8(env, value, utf8Buffer, utf8Capacity,
                                   &utf8Length) != napi_ok) {
      return false;
    }
  }

  id stringValue = [[[NSString alloc] initWithBytes:utf8Buffer
                                             length:utf8Length
                                           encoding:NSUTF8StringEncoding]
      autorelease];
  *result = stringValue != nil ? stringValue : [NSString string];
  return true;
}

id resolveCachedHermesHandleObject(napi_env env, void* handle) {
  if (env == nullptr || handle == nullptr) {
    return nil;
  }

  ObjCBridgeState* bridgeState = ObjCBridgeState::InstanceData(env);
  if (bridgeState == nullptr) {
    return nil;
  }

  napi_value cachedValue = bridgeState->getCachedHandleObject(env, handle);
  if (cachedValue == nullptr) {
    return nil;
  }

  void* wrapped = nullptr;
  if (napi_unwrap(env, cachedValue, &wrapped) == napi_ok && wrapped != nullptr) {
    bridgeState->cacheRoundTripObject(env, static_cast<id>(wrapped), cachedValue);
    return static_cast<id>(wrapped);
  }

  bool hasNativePointer = false;
  if (napi_has_named_property(env, cachedValue, kNativePointerProperty,
                              &hasNativePointer) == napi_ok &&
      hasNativePointer) {
    napi_value nativePointerValue = nullptr;
    if (napi_get_named_property(env, cachedValue, kNativePointerProperty,
                                &nativePointerValue) == napi_ok) {
      if (Pointer::isInstance(env, nativePointerValue)) {
        Pointer* pointer = Pointer::unwrap(env, nativePointerValue);
        if (pointer != nullptr && pointer->data != nullptr) {
          bridgeState->cacheRoundTripObject(
              env, static_cast<id>(pointer->data), cachedValue);
          return static_cast<id>(pointer->data);
        }
      } else {
        void* nativePointer = nullptr;
        if (napi_get_value_external(env, nativePointerValue,
                                    &nativePointer) == napi_ok &&
            nativePointer != nullptr) {
          bridgeState->cacheRoundTripObject(
              env, static_cast<id>(nativePointer), cachedValue);
          return static_cast<id>(nativePointer);
        }
      }
    }
  }

  return nil;
}

bool tryFastUnwrapHermesObjectArgument(napi_env env, MDTypeKind kind,
                                       napi_value value, void* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  struct ObjectArgumentCacheEntry {
    napi_env env = nullptr;
    uint64_t rawValue = 0;
    id nativeObject = nil;
    bool classObject = false;
    ObjCBridgeState* bridgeState = nullptr;
    uint64_t objectRefsGeneration = 0;
  };

  static thread_local ObjectArgumentCacheEntry objectArgumentCache[8];
  static thread_local unsigned int nextObjectArgumentCacheSlot = 0;
  static thread_local ObjectArgumentCacheEntry lastObjectArgument;

  const uint64_t rawValue = hermesRawValueBits(value);
  if (rawValue != 0) {
    if (lastObjectArgument.env == env &&
        lastObjectArgument.rawValue == rawValue &&
        lastObjectArgument.nativeObject != nil) {
      bool lastValid = lastObjectArgument.classObject;
      if (!lastValid && lastObjectArgument.bridgeState != nullptr &&
          lastObjectArgument.objectRefsGeneration != 0 &&
          lastObjectArgument.bridgeState->currentObjectRefsGeneration() ==
              lastObjectArgument.objectRefsGeneration) {
        lastValid = true;
      }

      if (lastValid) {
        if (kind == mdTypeClass) {
          if (!lastObjectArgument.classObject) {
            return false;
          }
          *reinterpret_cast<Class*>(result) =
              static_cast<Class>(lastObjectArgument.nativeObject);
          return true;
        }

        *reinterpret_cast<id*>(result) = lastObjectArgument.nativeObject;
        return true;
      }
      lastObjectArgument.rawValue = 0;
    }

    for (auto& entry : objectArgumentCache) {
      if (entry.env != env || entry.rawValue != rawValue ||
          entry.nativeObject == nil) {
        continue;
      }

      if (!entry.classObject) {
        if (entry.bridgeState == nullptr ||
            entry.objectRefsGeneration == 0 ||
            entry.bridgeState->currentObjectRefsGeneration() !=
                entry.objectRefsGeneration) {
          entry.rawValue = 0;
          continue;
        }
      }

      if (kind == mdTypeClass) {
        if (!entry.classObject) {
          return false;
        }
        lastObjectArgument = entry;
        *reinterpret_cast<Class*>(result) =
            static_cast<Class>(entry.nativeObject);
        return true;
      }

      lastObjectArgument = entry;
      *reinterpret_cast<id*>(result) = entry.nativeObject;
      return true;
    }
  }

  auto rememberObjectArgument = [&](id nativeObject,
                                    ObjCBridgeState* bridgeState) {
    if (nativeObject == nil || rawValue == 0) {
      return;
    }

    const bool classObject = object_isClass(nativeObject);
    uint64_t objectRefsGeneration = 0;
    if (!classObject) {
      if (bridgeState == nullptr) {
        bridgeState = ObjCBridgeState::InstanceData(env);
      }
      if (bridgeState == nullptr) {
        return;
      }
      if (!bridgeState->hasObjectRef(nativeObject)) {
        return;
      }
      objectRefsGeneration = bridgeState->currentObjectRefsGeneration();
    }

    auto& entry = objectArgumentCache[nextObjectArgumentCacheSlot++ & 7];
    entry.env = env;
    entry.rawValue = rawValue;
    entry.nativeObject = nativeObject;
    entry.classObject = classObject;
    entry.bridgeState = bridgeState;
    entry.objectRefsGeneration = objectRefsGeneration;
    lastObjectArgument = entry;
  };

  auto setPointerLikeObject = [&](void* data) -> bool {
    id nativeObject = nil;
    if (id cachedObject = resolveCachedHermesHandleObject(env, data);
        cachedObject != nil) {
      nativeObject = cachedObject;
      rememberObjectArgument(nativeObject, nullptr);
    } else {
      nativeObject = static_cast<id>(data);
    }

    if (kind == mdTypeClass) {
      if (nativeObject == nil || !object_isClass(nativeObject)) {
        return false;
      }
      *reinterpret_cast<Class*>(result) = static_cast<Class>(nativeObject);
      return true;
    }

    *reinterpret_cast<id*>(result) = nativeObject;
    return true;
  };

  ObjCBridgeState* bridgeState = nullptr;
  if (kind == mdTypeClass) {
    bridgeState = ObjCBridgeState::InstanceData(env);
    Class bridgedClass = nil;
    if (bridgeState != nullptr &&
        bridgeState->tryResolveBridgedClassConstructor(env, value,
                                                       &bridgedClass) &&
        bridgedClass != nil) {
      rememberObjectArgument(static_cast<id>(bridgedClass), bridgeState);
      *reinterpret_cast<Class*>(result) = bridgedClass;
      return true;
    }
  } else {
    bridgeState = ObjCBridgeState::InstanceData(env);
    id bridgedType = nil;
    if (bridgeState != nullptr &&
        bridgeState->tryResolveBridgedTypeConstructor(env, value,
                                                     &bridgedType) &&
        bridgedType != nil) {
      rememberObjectArgument(bridgedType, bridgeState);
      *reinterpret_cast<id*>(result) = bridgedType;
      return true;
    }
  }

  if (Pointer::isInstance(env, value)) {
    Pointer* pointer = Pointer::unwrap(env, value);
    return setPointerLikeObject(pointer != nullptr ? pointer->data : nullptr);
  }

  if (Reference::isInstance(env, value)) {
    Reference* reference = Reference::unwrap(env, value);
    return setPointerLikeObject(reference != nullptr ? reference->data : nullptr);
  }

  void* wrapped = nullptr;
  if (napi_unwrap(env, value, &wrapped) != napi_ok || wrapped == nullptr) {
    return false;
  }

  if (kind == mdTypeClass) {
    id nativeObject = static_cast<id>(wrapped);
    ObjCBridgeState* bridgeState = nullptr;
    if (!object_isClass(nativeObject)) {
      bridgeState = ObjCBridgeState::InstanceData(env);
      if (bridgeState != nullptr) {
        id normalizedObject = bridgeState->nativeObjectForBridgeWrapper(wrapped);
        if (normalizedObject != nil) {
          nativeObject = normalizedObject;
        }
      }
    }
    if (!object_isClass(nativeObject)) {
      return false;
    }
    rememberObjectArgument(nativeObject, bridgeState);
    *reinterpret_cast<Class*>(result) = static_cast<Class>(nativeObject);
    return true;
  }

  id nativeObject = static_cast<id>(wrapped);
  if (bridgeState == nullptr) {
    bridgeState = ObjCBridgeState::InstanceData(env);
  }
  if (bridgeState != nullptr && bridgeState->hasRoundTripCacheFrame()) {
    bridgeState->cacheRoundTripObject(env, nativeObject, value);
  }
  rememberObjectArgument(nativeObject, nullptr);
  *reinterpret_cast<id*>(result) = nativeObject;
  return true;
}

inline bool needsRoundTripCacheFrame(Cif* cif) {
  return cif != nullptr && cif->generatedDispatchHasRoundTripCacheArgument;
}

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

class HermesFastRoundTripCacheFrameGuard {
 public:
  HermesFastRoundTripCacheFrameGuard(napi_env env, ObjCBridgeState* bridgeState,
                                     bool enabled = true)
      : env_(enabled ? env : nullptr),
        bridgeState_(enabled ? bridgeState : nullptr) {
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

bool tryFastConvertHermesNSStringReturnValue(napi_env env, NSString* str,
                                             napi_value* result) {
  if (env == nullptr || result == nullptr || str == nil) {
    return false;
  }

  const NSUInteger length = [str length];
  constexpr NSUInteger kStackCapacity = 256;
  char16_t stackBuffer[kStackCapacity];
  char16_t* buffer = stackBuffer;

  if (length > kStackCapacity) {
    buffer = static_cast<char16_t*>(
        std::malloc(sizeof(char16_t) * static_cast<size_t>(length)));
    if (buffer == nullptr) {
      return false;
    }
  }

  if (length > 0) {
    [str getCharacters:reinterpret_cast<unichar*>(buffer)
                 range:NSMakeRange(0, length)];
  }

  napi_status status = napi_create_string_utf16(
      env, buffer, static_cast<size_t>(length), result);
  if (buffer != stackBuffer) {
    std::free(buffer);
  }

  return status == napi_ok;
}

bool tryFastConvertHermesBoxedPrimitiveReturnValue(
    napi_env env, Cif* cif, id value, napi_value* result,
    bool* recognizedFoundationObject = nullptr) {
  if (recognizedFoundationObject != nullptr) {
    *recognizedFoundationObject = false;
  }
  if (env == nullptr || result == nullptr || value == nil) {
    return false;
  }

  Class valueClass = object_getClass(value);
  static thread_local Class lastNonBoxedPrimitiveClasses[8] = {};
  static thread_local unsigned int nextNonBoxedPrimitiveClassSlot = 0;
  for (Class cachedClass : lastNonBoxedPrimitiveClasses) {
    if (cachedClass == valueClass) {
      return false;
    }
  }

  if ([value isKindOfClass:[NSNumber class]]) {
    if (recognizedFoundationObject != nullptr) {
      *recognizedFoundationObject = true;
    }
    if ([value isKindOfClass:[NSDecimalNumber class]]) {
      return false;
    }
    if (CFGetTypeID((CFTypeRef)value) == CFBooleanGetTypeID()) {
      *result = makeHermesRawBoolValue(cif, [value boolValue] == YES);
      return true;
    }
    *result = makeHermesRawNumberValue(cif, [value doubleValue]);
    return true;
  }

  if ([value isKindOfClass:[NSNull class]]) {
    if (recognizedFoundationObject != nullptr) {
      *recognizedFoundationObject = true;
    }
    return napi_get_null(env, result) == napi_ok;
  }

  if (valueClass != nil) {
    lastNonBoxedPrimitiveClasses[nextNonBoxedPrimitiveClassSlot++ & 7] =
        valueClass;
  }

  return false;
}

bool tryFastConvertHermesFoundationObject(napi_env env, Cif* cif, id value,
                                          napi_value* result,
                                          bool* recognizedFoundationObject = nullptr) {
  if (recognizedFoundationObject != nullptr) {
    *recognizedFoundationObject = false;
  }
  if (env == nullptr || result == nullptr || value == nil) {
    return false;
  }

  Class valueClass = object_getClass(value);
  static thread_local Class lastNonFoundationObjectClasses[8] = {};
  static thread_local unsigned int nextNonFoundationObjectClassSlot = 0;
  for (Class cachedClass : lastNonFoundationObjectClasses) {
    if (cachedClass == valueClass) {
      return false;
    }
  }

  if ([value isKindOfClass:[NSString class]]) {
    if (recognizedFoundationObject != nullptr) {
      *recognizedFoundationObject = true;
    }
    return tryFastConvertHermesNSStringReturnValue(
        env, static_cast<NSString*>(value), result);
  }

  if (tryFastConvertHermesBoxedPrimitiveReturnValue(
          env, cif, value, result, recognizedFoundationObject)) {
    return true;
  }

  if (recognizedFoundationObject == nullptr ||
      !*recognizedFoundationObject) {
    lastNonFoundationObjectClasses[nextNonFoundationObjectClassSlot++ & 7] =
        valueClass;
  }

  return false;
}

inline bool isHermesNSStringFactorySelector(SEL selector) {
  return selector == @selector(string) ||
         selector == @selector(stringWithString:) ||
         selector == @selector(stringWithCapacity:);
}

inline bool isHermesNSStringFactoryClass(Class cls) {
  return cls == [NSString class] || cls == [NSMutableString class];
}

inline bool shouldWrapHermesNSStringFactoryReturn(SEL selector,
                                                  bool classMethod,
                                                  bool receiverIsClass,
                                                  id self,
                                                  Class declaredClass) {
  if (!classMethod || !isHermesNSStringFactorySelector(selector)) {
    return false;
  }

  if (isHermesNSStringFactoryClass(declaredClass)) {
    return true;
  }

  if (!receiverIsClass || self == nil) {
    return false;
  }

  return isHermesNSStringFactoryClass(static_cast<Class>(self));
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

  napi_value fastResult = nullptr;
  if (TryFastConvertHermesReturnValue(env, cif, cif->returnType->kind, rvalue,
                                      &fastResult)) {
    return fastResult;
  }

  if (descriptor->selector == @selector(class)) {
    if (!propertyAccess && !receiverIsClass) {
      napi_value constructor = jsThis;
      napi_get_named_property(env, jsThis, "constructor", &constructor);
      return constructor;
    }

    id classObject = receiverIsClass ? self : static_cast<id>(object_getClass(self));
    return member->bridgeState->getObject(env, classObject, kUnownedObject, 0, nullptr);
  }

  if (cif->returnType->kind == mdTypeAnyObject ||
      cif->returnType->kind == mdTypeNSStringObject ||
      cif->returnType->kind == mdTypeNSMutableStringObject) {
    id obj = *reinterpret_cast<id*>(rvalue);
    Class declaredClass = member->cls != nullptr ? member->cls->nativeClass : nil;
    if (obj != nil && shouldWrapHermesNSStringFactoryReturn(
                          descriptor->selector, member->classMethod,
                          receiverIsClass, self, declaredClass)) {
      return member->bridgeState->getObject(env, obj, jsThis, kUnownedObject);
    }
  }

  if (cif->returnType->kind == mdTypeInstanceObject) {
    id obj = *reinterpret_cast<id*>(rvalue);
    napi_value boxedPrimitiveResult = nullptr;
    if (tryFastConvertHermesBoxedPrimitiveReturnValue(
            env, cif, obj, &boxedPrimitiveResult)) {
      return boxedPrimitiveResult;
    }

    if (obj != nil) {
      ObjCBridgeState* state = member->bridgeState;
      if (state != nullptr) {
        if (napi_value cached = state->findCachedObjectWrapper(env, obj);
            cached != nullptr) {
          return cached;
        }
      }
    }

    napi_value constructor = jsThis;
    if (!receiverIsClass) {
      napi_get_named_property(env, jsThis, "constructor", &constructor);
    }

    return member->bridgeState->getObject(
        env, obj, constructor, member->returnOwned ? kOwnedObject : kUnownedObject);
  }

  if (cif->returnType->kind == mdTypeAnyObject ||
      cif->returnType->kind == mdTypeProtocolObject ||
      cif->returnType->kind == mdTypeClassObject) {
    id obj = *reinterpret_cast<id*>(rvalue);
    napi_value foundationResult = nullptr;
    bool recognizedFoundationObject = false;
    if (tryFastConvertHermesFoundationObject(
            env, cif, obj, &foundationResult, &recognizedFoundationObject)) {
      return foundationResult;
    }

    if (obj != nil && !recognizedFoundationObject) {
      ObjCBridgeState* state = member->bridgeState;
      if (state != nullptr) {
        if (napi_value cached = state->findCachedObjectWrapper(env, obj);
            cached != nullptr) {
          return cached;
        }
      }
    }
  }

  if (cif->returnType->kind == mdTypeNSStringObject) {
    NSString* str = *reinterpret_cast<NSString**>(rvalue);
    napi_value stringResult = nullptr;
    if (tryFastConvertHermesNSStringReturnValue(env, str, &stringResult)) {
      return stringResult;
    }
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
  if (TryFastConvertHermesReturnValue(env, cif, cif->returnType->kind, rvalue,
                                      &fastResult)) {
    return fastResult;
  }

  if (cif->returnType->kind == mdTypeNSStringObject) {
    NSString* str = *reinterpret_cast<NSString**>(rvalue);
    napi_value stringResult = nullptr;
    if (tryFastConvertHermesNSStringReturnValue(env, str, &stringResult)) {
      return stringResult;
    }
  } else if (cif->returnType->kind == mdTypeInstanceObject) {
    id obj = *reinterpret_cast<id*>(rvalue);
    napi_value boxedPrimitiveResult = nullptr;
    if (tryFastConvertHermesBoxedPrimitiveReturnValue(
            env, cif, obj, &boxedPrimitiveResult)) {
      return boxedPrimitiveResult;
    }
  } else if (cif->returnType->kind == mdTypeAnyObject ||
             cif->returnType->kind == mdTypeProtocolObject ||
             cif->returnType->kind == mdTypeClassObject) {
    id obj = *reinterpret_cast<id*>(rvalue);
    napi_value foundationResult = nullptr;
    if (tryFastConvertHermesFoundationObject(env, cif, obj, &foundationResult)) {
      return foundationResult;
    }
  }

  uint32_t toJSFlags = kCStringAsReference;
  if (function != nullptr && (function->dispatchFlags & 1) != 0) {
    toJSFlags |= kReturnOwned;
  }
  return cif->returnType->toJS(env, rvalue, toJSFlags);
}

}  // namespace

bool TryFastSetHermesGeneratedObjCObjectReturnValue(
    napi_env env, Cif* cif, const HermesObjCReturnContext* context,
    SEL selector, MDTypeKind kind, id value, napi_value* result) {
  if (env == nullptr || cif == nullptr || cif->returnType == nullptr ||
      context == nullptr || result == nullptr) {
    return false;
  }

  ObjCBridgeState* bridgeState =
      static_cast<ObjCBridgeState*>(context->bridgeState);
  if (bridgeState == nullptr) {
    return false;
  }

  if (value == nil && selector != @selector(class)) {
    return napi_get_null(env, result) == napi_ok;
  }

  if (selector == @selector(class)) {
    if (!context->propertyAccess && !context->receiverIsClass &&
        context->jsThis != nullptr) {
      napi_value constructor = context->jsThis;
      napi_get_named_property(env, context->jsThis, "constructor", &constructor);
      *result = constructor;
      return true;
    }

    id classObject = context->receiverIsClass
                         ? context->self
                         : static_cast<id>(object_getClass(context->self));
    *result = bridgeState->getObject(env, classObject, kUnownedObject, 0, nullptr);
    return *result != nullptr;
  }

  if (kind == mdTypeInstanceObject) {
    napi_value boxedPrimitiveResult = nullptr;
    if (tryFastConvertHermesBoxedPrimitiveReturnValue(
            env, cif, value, &boxedPrimitiveResult)) {
      *result = boxedPrimitiveResult;
      return true;
    }

    if (value != nil) {
      if (napi_value cached = bridgeState->findCachedObjectWrapper(env, value);
          cached != nullptr) {
        *result = cached;
        return true;
      }
    }

    napi_value constructor = context->jsThis;
    if (!context->receiverIsClass && context->jsThis != nullptr) {
      napi_get_named_property(env, context->jsThis, "constructor", &constructor);
    }

    *result = bridgeState->getObject(
        env, value, constructor,
        context->returnOwned ? kOwnedObject : kUnownedObject);
    return *result != nullptr;
  }

  if ((kind == mdTypeAnyObject || kind == mdTypeNSStringObject ||
       kind == mdTypeNSMutableStringObject) &&
      value != nil && shouldWrapHermesNSStringFactoryReturn(
                          selector, context->classMethod,
                          context->receiverIsClass, context->self,
                          context->declaredClass)) {
    *result =
        bridgeState->getObject(env, value, context->jsThis, kUnownedObject);
    return *result != nullptr;
  }

  if (kind == mdTypeNSStringObject) {
    return tryFastConvertHermesNSStringReturnValue(
        env, static_cast<NSString*>(value), result);
  }

  if (kind == mdTypeAnyObject || kind == mdTypeProtocolObject ||
      kind == mdTypeClassObject) {
    napi_value foundationResult = nullptr;
    bool recognizedFoundationObject = false;
    if (tryFastConvertHermesFoundationObject(
            env, cif, value, &foundationResult, &recognizedFoundationObject)) {
      *result = foundationResult;
      return true;
    }

    if (value != nil && !recognizedFoundationObject) {
      if (napi_value cached = bridgeState->findCachedObjectWrapper(env, value);
          cached != nullptr) {
        *result = cached;
        return true;
      }
    }
  }

  uint32_t toJSFlags = context->returnOwned ? kReturnOwned : 0;
  *result = cif->returnType->toJS(env, &value, toJSFlags);
  return *result != nullptr;
}

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
  return napi_get_value_bigint_int64(env, value, result, &lossless) == napi_ok &&
         lossless;
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
  return napi_get_value_bigint_uint64(env, value, result, &lossless) == napi_ok &&
         lossless;
}

bool TryFastConvertHermesSelectorArgument(napi_env env, napi_value value,
                                          SEL* result) {
  return tryFastConvertHermesSelectorArgument(env, value, result);
}

bool TryFastConvertHermesObjectArgument(napi_env env, MDTypeKind kind,
                                        napi_value value, void* result) {
  if (value == nullptr || result == nullptr) {
    return false;
  }

  const bool isNSStringKind =
      kind == mdTypeNSStringObject || kind == mdTypeNSMutableStringObject;
  if (kind != mdTypeClass && !isNSStringKind) {
    const uint64_t raw = hermesRawValueBits(value);
    if (isHermesBool(raw)) {
      *reinterpret_cast<id*>(result) =
          [NSNumber numberWithBool:(raw & kHermesBoolBit) != 0];
      return true;
    }
    if (isHermesNumber(raw)) {
      *reinterpret_cast<id*>(result) =
          [NSNumber numberWithDouble:hermesRawToDouble(raw)];
      return true;
    }
  }

  if (tryFastUnwrapHermesObjectArgument(env, kind, value, result)) {
    return true;
  }
  return false;
}

bool TryFastConvertHermesPointerArgument(napi_env env, MDTypeKind kind,
                                         napi_value value, void** result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  napi_valuetype valueType = napi_undefined;
  if (napi_typeof(env, value, &valueType) != napi_ok) {
    return false;
  }

  if (kind == mdTypeBlock) {
    if (valueType == napi_null || valueType == napi_undefined) {
      *result = nullptr;
      return true;
    }
    return false;
  }

  switch (valueType) {
    case napi_null:
    case napi_undefined:
      *result = nullptr;
      return true;

    case napi_bigint: {
      uint64_t raw = 0;
      bool lossless = false;
      if (napi_get_value_bigint_uint64(env, value, &raw, &lossless) !=
          napi_ok) {
        return false;
      }
      *result = reinterpret_cast<void*>(raw);
      return true;
    }

    case napi_external:
      return napi_get_value_external(env, value, result) == napi_ok;

    case napi_function:
    case napi_object: {
      ObjCBridgeState* bridgeState = ObjCBridgeState::InstanceData(env);
      if (bridgeState != nullptr) {
        id bridgedType = nil;
        if (bridgeState->tryResolveBridgedTypeConstructor(env, value,
                                                         &bridgedType) &&
            bridgedType != nil) {
          *result = static_cast<void*>(bridgedType);
          return true;
        }
      }

      if (Pointer::isInstance(env, value)) {
        Pointer* pointer = Pointer::unwrap(env, value);
        *result = pointer != nullptr ? pointer->data : nullptr;
        return true;
      }

      if (Reference::isInstance(env, value)) {
        Reference* reference = Reference::unwrap(env, value);
        if (reference == nullptr || reference->data == nullptr) {
          return false;
        }
        *result = reference->data;
        return true;
      }

      void* wrapped = nullptr;
      if (napi_unwrap(env, value, &wrapped) == napi_ok && wrapped != nullptr) {
        if (bridgeState != nullptr) {
          id nativeObject = bridgeState->nativeObjectForBridgeWrapper(wrapped);
          if (nativeObject != nil) {
            *result = static_cast<void*>(nativeObject);
            return true;
          }
        }

        *result = wrapped;
        return true;
      }

      bool hasNativePointer = false;
      if (valueType == napi_object &&
          napi_has_named_property(env, value, kNativePointerProperty,
                                  &hasNativePointer) == napi_ok &&
          hasNativePointer) {
        napi_value nativePointerValue = nullptr;
        if (napi_get_named_property(env, value, kNativePointerProperty,
                                    &nativePointerValue) == napi_ok &&
            nativePointerValue != nullptr) {
          if (Pointer::isInstance(env, nativePointerValue)) {
            Pointer* pointer = Pointer::unwrap(env, nativePointerValue);
            *result = pointer != nullptr ? pointer->data : nullptr;
            return true;
          }
          return napi_get_value_external(env, nativePointerValue, result) ==
                 napi_ok;
        }
      }

      return false;
    }

    default:
      return false;
  }
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
      if (kind != mdTypeClass &&
          tryFastConvertHermesStringToNSStringArgument(
              env, value, reinterpret_cast<id*>(result),
              kind == mdTypeNSMutableStringObject)) {
        return true;
      }
      return TryFastConvertNapiArgument(env, kind, value, result);

    case mdTypePointer:
    case mdTypeOpaquePointer:
    case mdTypeBlock:
    case mdTypeFunctionPointer:
      return TryFastConvertHermesPointerArgument(
          env, kind, value, reinterpret_cast<void**>(result));

    default:
      return false;
  }
}

bool TryFastConvertHermesReturnValue(napi_env env, Cif* cif, MDTypeKind kind,
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
          makeHermesRawBoolValue(
              cif, *reinterpret_cast<const uint8_t*>(value) != 0);
      return true;

    case mdTypeChar: {
      if (value == nullptr) {
        return false;
      }
      const int8_t raw = *reinterpret_cast<const int8_t*>(value);
      if (raw == 0 || raw == 1) {
        *result = makeHermesRawBoolValue(cif, raw == 1);
        return true;
      }
      *result = makeHermesRawNumberValue(cif, static_cast<double>(raw));
      return true;
    }

    case mdTypeUChar:
    case mdTypeUInt8: {
      if (value == nullptr) {
        return false;
      }
      const uint8_t raw = *reinterpret_cast<const uint8_t*>(value);
      if (raw == 0 || raw == 1) {
        *result = makeHermesRawBoolValue(cif, raw == 1);
        return true;
      }
      *result = makeHermesRawNumberValue(cif, static_cast<double>(raw));
      return true;
    }

    case mdTypeSShort:
      if (value == nullptr) {
        return false;
      }
      *result = makeHermesRawNumberValue(cif,
          static_cast<double>(*reinterpret_cast<const int16_t*>(value)));
      return true;

    case mdTypeUShort: {
      if (value == nullptr) {
        return false;
      }
      const uint16_t raw = *reinterpret_cast<const uint16_t*>(value);
      if (raw >= 32 && raw <= 126) {
        const char buffer[2] = {static_cast<char>(raw), '\0'};
        return napi_create_string_utf8(env, buffer, 1, result) == napi_ok;
      }
      *result = makeHermesRawNumberValue(cif, static_cast<double>(raw));
      return true;
    }

    case mdTypeSInt:
      if (value == nullptr) {
        return false;
      }
      *result = makeHermesRawNumberValue(cif,
          static_cast<double>(*reinterpret_cast<const int32_t*>(value)));
      return true;

    case mdTypeUInt:
      if (value == nullptr) {
        return false;
      }
      *result = makeHermesRawNumberValue(cif,
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
      *result = makeHermesRawNumberValue(cif, static_cast<double>(raw));
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
      *result = makeHermesRawNumberValue(cif, static_cast<double>(raw));
      return true;
    }

    case mdTypeFloat:
      if (value == nullptr) {
        return false;
      }
      *result = makeHermesRawNumberValue(cif,
          static_cast<double>(*reinterpret_cast<const float*>(value)));
      return true;

    case mdTypeDouble:
      if (value == nullptr) {
        return false;
      }
      *result = makeHermesRawNumberValue(cif,
          *reinterpret_cast<const double*>(value));
      return true;

    default:
      return false;
  }
}

bool TryFastConvertHermesReturnValue(napi_env env, MDTypeKind kind,
                                     const void* value, napi_value* result) {
  return TryFastConvertHermesReturnValue(env, nullptr, kind, value, result);
}

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

    HermesFastRoundTripCacheFrameGuard roundTripCacheFrame(
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

    HermesFastRoundTripCacheFrameGuard roundTripCacheFrame(
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

  HermesFastRoundTripCacheFrameGuard roundTripCacheFrame(
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

    HermesFastRoundTripCacheFrameGuard roundTripCacheFrame(
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

    HermesFastRoundTripCacheFrameGuard roundTripCacheFrame(
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

  HermesFastRoundTripCacheFrameGuard roundTripCacheFrame(
      env, bridgeState, needsRoundTripCacheFrame(cif));

  bool didInvoke = false;
  CFunctionEngineDirectInvoker invoker =
      !cif->skipGeneratedNapiDispatch && cif->signatureHash != 0
          ? ensureHermesCFunctionEngineDirectInvoker(function, cif)
          : nullptr;
  HermesFastReturnStorage returnStorage(cif);
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

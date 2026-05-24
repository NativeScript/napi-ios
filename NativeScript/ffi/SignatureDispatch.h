#ifndef NS_SIGNATURE_DISPATCH_H
#define NS_SIGNATURE_DISPATCH_H

#include <objc/runtime.h>

#include <cmath>
#include <cstddef>
#include <cstdint>
#include <cstdlib>
#include <cstring>

#include "Cif.h"
#include "js_native_api.h"
#ifdef TARGET_ENGINE_V8
#include <v8.h>
#endif

namespace nativescript {

#ifndef NS_LIKELY
#define NS_LIKELY(value) __builtin_expect(!!(value), 1)
#endif
#ifndef NS_UNLIKELY
#define NS_UNLIKELY(value) __builtin_expect(!!(value), 0)
#endif

enum class SignatureCallKind : uint8_t {
  ObjCMethod = 1,
  CFunction = 2,
  BlockInvoke = 3,
};

using ObjCPreparedInvoker = void (*)(void* fnptr, void** avalues, void* rvalue);
using CFunctionPreparedInvoker = void (*)(void* fnptr, void** avalues,
                                          void* rvalue);
using BlockPreparedInvoker = void (*)(void* fnptr, void** avalues,
                                      void* rvalue);
using ObjCNapiInvoker = bool (*)(napi_env env, Cif* cif, void* fnptr, id self,
                                 SEL selector, const napi_value* argv,
                                 void* rvalue);
using CFunctionNapiInvoker = bool (*)(napi_env env, Cif* cif, void* fnptr,
                                      const napi_value* argv, void* rvalue);
using ObjCEngineDirectInvoker = bool (*)(napi_env env, Cif* cif, void* fnptr,
                                         id self, SEL selector,
                                         const napi_value* argv,
                                         void* rvalue);
using CFunctionEngineDirectInvoker = bool (*)(napi_env env, Cif* cif,
                                              void* fnptr,
                                              const napi_value* argv,
                                              void* rvalue);

#ifdef TARGET_ENGINE_V8
using ObjCV8Invoker = bool (*)(napi_env env, Cif* cif, void* fnptr, id self,
                               SEL selector, void* bridgeState, bool returnOwned,
                               bool receiverIsClass, bool propertyAccess,
                               const v8::FunctionCallbackInfo<v8::Value>& info,
                               void* rvalue, bool* didSetReturnValue);
using CFunctionV8Invoker =
    bool (*)(napi_env env, Cif* cif, void* fnptr,
             const v8::FunctionCallbackInfo<v8::Value>& info, void* rvalue,
             bool* didSetReturnValue);
#endif
#ifdef TARGET_ENGINE_HERMES
struct HermesObjCReturnContext {
  void* bridgeState = nullptr;
  napi_value jsThis = nullptr;
  id self = nil;
  Class declaredClass = nil;
  bool returnOwned = false;
  bool receiverIsClass = false;
  bool classMethod = false;
  bool propertyAccess = false;
};

using ObjCHermesDirectReturnInvoker = bool (*)(napi_env env, Cif* cif,
                                               void* fnptr, id self,
                                               SEL selector,
                                               const HermesObjCReturnContext* returnContext,
                                               const napi_value* argv,
                                               napi_value* result);
using CFunctionHermesDirectReturnInvoker =
    bool (*)(napi_env env, Cif* cif, void* fnptr,
             const napi_value* argv, napi_value* result);
using ObjCHermesFrameDirectReturnInvoker = bool (*)(
    napi_env env, Cif* cif, void* fnptr, id self, SEL selector,
    const HermesObjCReturnContext* returnContext, const uint64_t* argsBase,
    napi_value* result);
using CFunctionHermesFrameDirectReturnInvoker = bool (*)(
    napi_env env, Cif* cif, void* fnptr, const uint64_t* argsBase,
    napi_value* result);
using BlockHermesFrameDirectReturnInvoker = bool (*)(
    napi_env env, Cif* cif, void* fnptr, void* block,
    const uint64_t* argsBase, napi_value* result);

bool TryFastSetHermesGeneratedObjCObjectReturnValue(
    napi_env env, Cif* cif, const HermesObjCReturnContext* context,
    SEL selector, MDTypeKind kind, id value, napi_value* result);

constexpr uint64_t kHermesDispatchFirstTaggedValue = 0xfff9000000000000ULL;
constexpr uint64_t kHermesDispatchBoolETag = 0x1fff6ULL;
constexpr uint64_t kHermesDispatchBoolBit = 1ULL << 46;

inline bool isHermesDispatchNumber(uint64_t raw) {
  return raw < kHermesDispatchFirstTaggedValue;
}

inline bool isHermesDispatchBool(uint64_t raw) {
  return (raw >> 47) == kHermesDispatchBoolETag;
}

inline uint64_t hermesDispatchRawValueBits(napi_value value) {
  return value != nullptr ? *reinterpret_cast<const uint64_t*>(value) : 0;
}

inline napi_value hermesDispatchFrameArg(const uint64_t* argsBase,
                                         size_t index) {
  return argsBase != nullptr
             ? reinterpret_cast<napi_value>(
                   const_cast<uint64_t*>(argsBase - (index + 1)))
             : nullptr;
}

inline uint64_t hermesDispatchFrameRawArg(const uint64_t* argsBase,
                                          size_t index) {
  return argsBase != nullptr ? *(argsBase - (index + 1)) : 0;
}

inline double hermesDispatchRawToDouble(uint64_t raw) {
  double value = 0.0;
  std::memcpy(&value, &raw, sizeof(value));
  return value;
}

inline bool hermesDispatchRawDoubleIsFinite(uint64_t raw) {
  constexpr uint64_t kExponentMask = 0x7ff0000000000000ULL;
  return (raw & kExponentMask) != kExponentMask;
}

inline bool readHermesDispatchFiniteNumber(napi_value value, double* result) {
  if (value == nullptr || result == nullptr) {
    return false;
  }

  const uint64_t raw = hermesDispatchRawValueBits(value);
  if (!isHermesDispatchNumber(raw)) {
    return false;
  }

  if (!hermesDispatchRawDoubleIsFinite(raw)) {
    return false;
  }

  *result = hermesDispatchRawToDouble(raw);
  return true;
}

inline bool readHermesDispatchFiniteNumberRaw(uint64_t raw, double* result) {
  if (result == nullptr || !isHermesDispatchNumber(raw)) {
    return false;
  }

  if (!hermesDispatchRawDoubleIsFinite(raw)) {
    return false;
  }

  *result = hermesDispatchRawToDouble(raw);
  return true;
}

inline napi_value makeHermesDispatchRawValue(Cif* cif, uint64_t raw) {
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

inline napi_value makeHermesDispatchRawNumberValue(Cif* cif, double value) {
  uint64_t raw = 0;
  std::memcpy(&raw, &value, sizeof(raw));
  return makeHermesDispatchRawValue(cif, raw);
}

inline napi_value makeHermesDispatchRawBoolValue(Cif* cif, bool value) {
  return makeHermesDispatchRawValue(
      cif,
      (kHermesDispatchBoolETag << 47) |
      (value ? kHermesDispatchBoolBit : 0));
}

inline bool TryFastConvertHermesGeneratedBoolArgument(
    napi_env env, napi_value value, uint8_t* result) {
  if (value == nullptr || result == nullptr) {
    return false;
  }
  const uint64_t raw = hermesDispatchRawValueBits(value);
  if (!isHermesDispatchBool(raw)) {
    return false;
  }
  *result = (raw & kHermesDispatchBoolBit) != 0 ? static_cast<uint8_t>(1)
                                                : static_cast<uint8_t>(0);
  return true;
}

inline bool TryFastConvertHermesGeneratedBoolRawArgument(uint64_t raw,
                                                         uint8_t* result) {
  if (result == nullptr || !isHermesDispatchBool(raw)) {
    return false;
  }
  *result = (raw & kHermesDispatchBoolBit) != 0 ? static_cast<uint8_t>(1)
                                                : static_cast<uint8_t>(0);
  return true;
}

inline bool TryFastConvertHermesGeneratedDoubleArgument(
    napi_env env, napi_value value, double* result) {
  return readHermesDispatchFiniteNumber(value, result);
}

inline bool TryFastConvertHermesGeneratedDoubleRawArgument(uint64_t raw,
                                                           double* result) {
  return readHermesDispatchFiniteNumberRaw(raw, result);
}

inline bool TryFastConvertHermesGeneratedFloatArgument(
    napi_env env, napi_value value, float* result) {
  double converted = 0.0;
  if (!readHermesDispatchFiniteNumber(value, &converted)) {
    return false;
  }
  *result = static_cast<float>(converted);
  return true;
}

inline bool TryFastConvertHermesGeneratedFloatRawArgument(uint64_t raw,
                                                          float* result) {
  double converted = 0.0;
  if (!readHermesDispatchFiniteNumberRaw(raw, &converted)) {
    return false;
  }
  *result = static_cast<float>(converted);
  return true;
}

inline bool TryFastConvertHermesGeneratedInt8Argument(
    napi_env env, napi_value value, int8_t* result) {
  double converted = 0.0;
  if (!readHermesDispatchFiniteNumber(value, &converted)) {
    return false;
  }
  *result = static_cast<int8_t>(converted);
  return true;
}

inline bool TryFastConvertHermesGeneratedInt8RawArgument(uint64_t raw,
                                                         int8_t* result) {
  double converted = 0.0;
  if (!readHermesDispatchFiniteNumberRaw(raw, &converted)) {
    return false;
  }
  *result = static_cast<int8_t>(converted);
  return true;
}

inline bool TryFastConvertHermesGeneratedUInt8Argument(
    napi_env env, napi_value value, uint8_t* result) {
  double converted = 0.0;
  if (!readHermesDispatchFiniteNumber(value, &converted)) {
    return false;
  }
  *result = static_cast<uint8_t>(converted);
  return true;
}

inline bool TryFastConvertHermesGeneratedUInt8RawArgument(uint64_t raw,
                                                          uint8_t* result) {
  double converted = 0.0;
  if (!readHermesDispatchFiniteNumberRaw(raw, &converted)) {
    return false;
  }
  *result = static_cast<uint8_t>(converted);
  return true;
}

inline bool TryFastConvertHermesGeneratedInt16Argument(
    napi_env env, napi_value value, int16_t* result) {
  double converted = 0.0;
  if (!readHermesDispatchFiniteNumber(value, &converted)) {
    return false;
  }
  *result = static_cast<int16_t>(converted);
  return true;
}

inline bool TryFastConvertHermesGeneratedInt16RawArgument(uint64_t raw,
                                                          int16_t* result) {
  double converted = 0.0;
  if (!readHermesDispatchFiniteNumberRaw(raw, &converted)) {
    return false;
  }
  *result = static_cast<int16_t>(converted);
  return true;
}

inline bool TryFastConvertHermesGeneratedUInt16Argument(
    napi_env env, napi_value value, uint16_t* result) {
  double converted = 0.0;
  if (!readHermesDispatchFiniteNumber(value, &converted)) {
    return false;
  }
  *result = static_cast<uint16_t>(converted);
  return true;
}

inline bool TryFastConvertHermesGeneratedUInt16RawArgument(uint64_t raw,
                                                           uint16_t* result) {
  double converted = 0.0;
  if (!readHermesDispatchFiniteNumberRaw(raw, &converted)) {
    return false;
  }
  *result = static_cast<uint16_t>(converted);
  return true;
}

inline bool TryFastConvertHermesGeneratedInt32Argument(
    napi_env env, napi_value value, int32_t* result) {
  double converted = 0.0;
  if (!readHermesDispatchFiniteNumber(value, &converted)) {
    return false;
  }
  *result = static_cast<int32_t>(converted);
  return true;
}

inline bool TryFastConvertHermesGeneratedInt32RawArgument(uint64_t raw,
                                                          int32_t* result) {
  double converted = 0.0;
  if (!readHermesDispatchFiniteNumberRaw(raw, &converted)) {
    return false;
  }
  *result = static_cast<int32_t>(converted);
  return true;
}

inline bool TryFastConvertHermesGeneratedUInt32Argument(
    napi_env env, napi_value value, uint32_t* result) {
  double converted = 0.0;
  if (!readHermesDispatchFiniteNumber(value, &converted)) {
    return false;
  }
  *result = static_cast<uint32_t>(converted);
  return true;
}

inline bool TryFastConvertHermesGeneratedUInt32RawArgument(uint64_t raw,
                                                           uint32_t* result) {
  double converted = 0.0;
  if (!readHermesDispatchFiniteNumberRaw(raw, &converted)) {
    return false;
  }
  *result = static_cast<uint32_t>(converted);
  return true;
}

inline bool TryFastConvertHermesGeneratedInt64Argument(
    napi_env env, napi_value value, int64_t* result) {
  double converted = 0.0;
  if (!readHermesDispatchFiniteNumber(value, &converted)) {
    return false;
  }
  *result = static_cast<int64_t>(converted);
  return true;
}

inline bool TryFastConvertHermesGeneratedInt64RawArgument(uint64_t raw,
                                                          int64_t* result) {
  double converted = 0.0;
  if (!readHermesDispatchFiniteNumberRaw(raw, &converted)) {
    return false;
  }
  *result = static_cast<int64_t>(converted);
  return true;
}

inline bool TryFastConvertHermesGeneratedUInt64Argument(
    napi_env env, napi_value value, uint64_t* result) {
  double converted = 0.0;
  if (!readHermesDispatchFiniteNumber(value, &converted)) {
    return false;
  }
  *result = static_cast<uint64_t>(converted);
  return true;
}

inline bool TryFastConvertHermesGeneratedUInt64RawArgument(uint64_t raw,
                                                           uint64_t* result) {
  double converted = 0.0;
  if (!readHermesDispatchFiniteNumberRaw(raw, &converted)) {
    return false;
  }
  *result = static_cast<uint64_t>(converted);
  return true;
}

inline bool SetHermesGeneratedVoidReturn(napi_env env, napi_value* result) {
  return napi_get_null(env, result) == napi_ok;
}

inline bool SetHermesGeneratedBoolReturn(Cif* cif, napi_value* result,
                                         bool value) {
  *result = makeHermesDispatchRawBoolValue(cif, value);
  return true;
}

inline bool SetHermesGeneratedInt8Return(Cif* cif, napi_value* result,
                                         int8_t value) {
  if (value == 0 || value == 1) {
    *result = makeHermesDispatchRawBoolValue(cif, value == 1);
  } else {
    *result =
        makeHermesDispatchRawNumberValue(cif, static_cast<double>(value));
  }
  return true;
}

inline bool SetHermesGeneratedUInt8Return(Cif* cif, napi_value* result,
                                          uint8_t value) {
  if (value == 0 || value == 1) {
    *result = makeHermesDispatchRawBoolValue(cif, value == 1);
  } else {
    *result =
        makeHermesDispatchRawNumberValue(cif, static_cast<double>(value));
  }
  return true;
}

inline bool SetHermesGeneratedInt16Return(Cif* cif, napi_value* result,
                                          int16_t value) {
  *result = makeHermesDispatchRawNumberValue(cif, static_cast<double>(value));
  return true;
}

inline bool SetHermesGeneratedUInt16Return(napi_env env, Cif* cif,
                                           napi_value* result,
                                           uint16_t value) {
  if (value >= 32 && value <= 126) {
    const char buffer[2] = {static_cast<char>(value), '\0'};
    return napi_create_string_utf8(env, buffer, 1, result) == napi_ok;
  }
  *result = makeHermesDispatchRawNumberValue(cif, static_cast<double>(value));
  return true;
}

inline bool SetHermesGeneratedInt32Return(Cif* cif, napi_value* result,
                                          int32_t value) {
  *result = makeHermesDispatchRawNumberValue(cif, static_cast<double>(value));
  return true;
}

inline bool SetHermesGeneratedUInt32Return(Cif* cif, napi_value* result,
                                           uint32_t value) {
  *result = makeHermesDispatchRawNumberValue(cif, static_cast<double>(value));
  return true;
}

inline bool SetHermesGeneratedInt64Return(napi_env env, Cif* cif,
                                          napi_value* result,
                                          int64_t value) {
  constexpr int64_t kMaxSafeInteger = 9007199254740991LL;
  if (NS_UNLIKELY(value > kMaxSafeInteger || value < -kMaxSafeInteger)) {
    return napi_create_bigint_int64(env, value, result) == napi_ok;
  }
  *result = makeHermesDispatchRawNumberValue(cif, static_cast<double>(value));
  return true;
}

inline bool SetHermesGeneratedUInt64Return(napi_env env, Cif* cif,
                                           napi_value* result,
                                           uint64_t value) {
  constexpr uint64_t kMaxSafeInteger = 9007199254740991ULL;
  if (NS_UNLIKELY(value > kMaxSafeInteger)) {
    return napi_create_bigint_uint64(env, value, result) == napi_ok;
  }
  *result = makeHermesDispatchRawNumberValue(cif, static_cast<double>(value));
  return true;
}

inline bool SetHermesGeneratedDoubleReturn(Cif* cif, napi_value* result,
                                           double value) {
  *result = makeHermesDispatchRawNumberValue(cif, value);
  return true;
}
#endif

struct ObjCDispatchEntry {
  uint64_t dispatchId;
  ObjCPreparedInvoker invoker;
};

struct CFunctionDispatchEntry {
  uint64_t dispatchId;
  CFunctionPreparedInvoker invoker;
};

struct BlockDispatchEntry {
  uint64_t dispatchId;
  BlockPreparedInvoker invoker;
};

struct ObjCNapiDispatchEntry {
  uint64_t dispatchId;
  ObjCNapiInvoker invoker;
};

struct CFunctionNapiDispatchEntry {
  uint64_t dispatchId;
  CFunctionNapiInvoker invoker;
};

struct ObjCEngineDirectDispatchEntry {
  uint64_t dispatchId;
  ObjCEngineDirectInvoker invoker;
};

struct CFunctionEngineDirectDispatchEntry {
  uint64_t dispatchId;
  CFunctionEngineDirectInvoker invoker;
};

#ifdef TARGET_ENGINE_V8
struct ObjCV8DispatchEntry {
  uint64_t dispatchId;
  ObjCV8Invoker invoker;
};

struct CFunctionV8DispatchEntry {
    uint64_t dispatchId;
    CFunctionV8Invoker invoker;
};
#endif
#ifdef TARGET_ENGINE_HERMES
struct ObjCHermesDirectReturnDispatchEntry {
  uint64_t dispatchId;
  ObjCHermesDirectReturnInvoker invoker;
};

struct CFunctionHermesDirectReturnDispatchEntry {
  uint64_t dispatchId;
  CFunctionHermesDirectReturnInvoker invoker;
};

struct ObjCHermesFrameDirectReturnDispatchEntry {
  uint64_t dispatchId;
  ObjCHermesFrameDirectReturnInvoker invoker;
};

struct CFunctionHermesFrameDirectReturnDispatchEntry {
  uint64_t dispatchId;
  CFunctionHermesFrameDirectReturnInvoker invoker;
};

struct BlockHermesFrameDirectReturnDispatchEntry {
  uint64_t dispatchId;
  BlockHermesFrameDirectReturnInvoker invoker;
};
#endif

inline constexpr uint64_t kSignatureHashOffsetBasis = 14695981039346656037ull;
inline constexpr uint64_t kSignatureHashPrime = 1099511628211ull;

inline uint64_t hashBytesFnv1a(const void* data, size_t size,
                               uint64_t seed = kSignatureHashOffsetBasis) {
  const auto* bytes = static_cast<const uint8_t*>(data);
  uint64_t hash = seed;
  for (size_t i = 0; i < size; i++) {
    hash ^= static_cast<uint64_t>(bytes[i]);
    hash *= kSignatureHashPrime;
  }
  return hash;
}

inline uint64_t composeSignatureDispatchId(uint64_t signatureHash,
                                           SignatureCallKind kind,
                                           uint8_t flags) {
  const uint8_t kindByte = static_cast<uint8_t>(kind);
  uint64_t hash = hashBytesFnv1a(&kindByte, sizeof(kindByte));
  hash = hashBytesFnv1a(&flags, sizeof(flags), hash);
  return hashBytesFnv1a(&signatureHash, sizeof(signatureHash), hash);
}

#ifdef TARGET_ENGINE_V8
static_assert(sizeof(v8::Local<v8::Value>) == sizeof(napi_value),
              "Cannot convert between v8::Local<v8::Value> and napi_value");

inline napi_value v8LocalValueToNapiValue(v8::Local<v8::Value> local) {
  return reinterpret_cast<napi_value>(*local);
}

inline void setV8DispatchInt64ReturnValue(
    v8::Isolate* isolate, const v8::FunctionCallbackInfo<v8::Value>& info,
    int64_t value) {
  constexpr int64_t kMaxSafeInteger = 9007199254740991LL;
  if (value > kMaxSafeInteger || value < -kMaxSafeInteger) {
    info.GetReturnValue().Set(v8::BigInt::New(isolate, value));
  } else {
    info.GetReturnValue().Set(static_cast<double>(value));
  }
}

inline void setV8DispatchUInt64ReturnValue(
    v8::Isolate* isolate, const v8::FunctionCallbackInfo<v8::Value>& info,
    uint64_t value) {
  constexpr uint64_t kMaxSafeInteger = 9007199254740991ULL;
  if (value > kMaxSafeInteger) {
    info.GetReturnValue().Set(v8::BigInt::NewFromUnsigned(isolate, value));
  } else {
    info.GetReturnValue().Set(static_cast<double>(value));
  }
}

inline void setV8DispatchUInt16ReturnValue(
    v8::Isolate* isolate, const v8::FunctionCallbackInfo<v8::Value>& info,
    uint16_t value) {
  if (value >= 32 && value <= 126) {
    const char buffer[2] = {static_cast<char>(value), '\0'};
    info.GetReturnValue().Set(
        v8::String::NewFromUtf8(isolate, buffer, v8::NewStringType::kNormal,
                                1)
            .ToLocalChecked());
  } else {
    info.GetReturnValue().Set(static_cast<uint32_t>(value));
  }
}

bool TryFastSetV8GeneratedObjCObjectReturnValue(
    napi_env env, const v8::FunctionCallbackInfo<v8::Value>& info,
    Cif* cif, void* bridgeState, id self, SEL selector, id value,
    bool returnOwned, bool receiverIsClass, bool propertyAccess);
#endif

}  // namespace nativescript

#ifndef NS_GSD_BACKEND_V8
#ifdef TARGET_ENGINE_V8
#define NS_GSD_BACKEND_V8 1
#else
#define NS_GSD_BACKEND_V8 0
#endif
#endif

#ifndef NS_GSD_BACKEND_JSC
#ifdef TARGET_ENGINE_JSC
#define NS_GSD_BACKEND_JSC 1
#else
#define NS_GSD_BACKEND_JSC 0
#endif
#endif

#ifndef NS_GSD_BACKEND_QUICKJS
#ifdef TARGET_ENGINE_QUICKJS
#define NS_GSD_BACKEND_QUICKJS 1
#else
#define NS_GSD_BACKEND_QUICKJS 0
#endif
#endif

#ifndef NS_GSD_BACKEND_HERMES
#ifdef TARGET_ENGINE_HERMES
#define NS_GSD_BACKEND_HERMES 1
#else
#define NS_GSD_BACKEND_HERMES 0
#endif
#endif

#define NS_GSD_BACKEND_ENGINE_DIRECT \
  (NS_GSD_BACKEND_JSC || NS_GSD_BACKEND_QUICKJS || NS_GSD_BACKEND_HERMES)

#ifndef NS_GSD_BACKEND_NAPI
#if NS_GSD_BACKEND_V8 || NS_GSD_BACKEND_ENGINE_DIRECT
#define NS_GSD_BACKEND_NAPI 0
#else
#define NS_GSD_BACKEND_NAPI 1
#endif
#endif

#if NS_GSD_BACKEND_V8 && !defined(TARGET_ENGINE_V8)
#error "NS_GSD_BACKEND_V8 requires TARGET_ENGINE_V8"
#endif
#if NS_GSD_BACKEND_JSC && !defined(TARGET_ENGINE_JSC)
#error "NS_GSD_BACKEND_JSC requires TARGET_ENGINE_JSC"
#endif
#if NS_GSD_BACKEND_QUICKJS && !defined(TARGET_ENGINE_QUICKJS)
#error "NS_GSD_BACKEND_QUICKJS requires TARGET_ENGINE_QUICKJS"
#endif
#if NS_GSD_BACKEND_HERMES && !defined(TARGET_ENGINE_HERMES)
#error "NS_GSD_BACKEND_HERMES requires TARGET_ENGINE_HERMES"
#endif

#ifndef NS_HAS_GENERATED_SIGNATURE_DISPATCH
#define NS_HAS_GENERATED_SIGNATURE_DISPATCH 0
#endif

#ifndef NS_HAS_GENERATED_SIGNATURE_NAPI_DISPATCH
#define NS_HAS_GENERATED_SIGNATURE_NAPI_DISPATCH 0
#endif

#ifndef NS_HAS_GENERATED_SIGNATURE_V8_DISPATCH
#define NS_HAS_GENERATED_SIGNATURE_V8_DISPATCH 0
#endif

#ifndef NS_HAS_GENERATED_SIGNATURE_ENGINE_DIRECT_DISPATCH
#define NS_HAS_GENERATED_SIGNATURE_ENGINE_DIRECT_DISPATCH 0
#endif

#ifndef NS_HAS_GENERATED_SIGNATURE_HERMES_DIRECT_RETURN_DISPATCH
#define NS_HAS_GENERATED_SIGNATURE_HERMES_DIRECT_RETURN_DISPATCH 0
#endif

#ifndef NS_HAS_GENERATED_SIGNATURE_HERMES_FRAME_DIRECT_RETURN_DISPATCH
#define NS_HAS_GENERATED_SIGNATURE_HERMES_FRAME_DIRECT_RETURN_DISPATCH 0
#endif

#ifndef NS_HAS_GENERATED_SIGNATURE_HERMES_BLOCK_FRAME_DIRECT_RETURN_DISPATCH
#define NS_HAS_GENERATED_SIGNATURE_HERMES_BLOCK_FRAME_DIRECT_RETURN_DISPATCH 0
#endif

#if defined(__has_include)
#if __has_include("GeneratedSignatureDispatch.inc")
#include "GeneratedSignatureDispatch.inc"
#endif
#endif

#if !NS_HAS_GENERATED_SIGNATURE_DISPATCH
namespace nativescript {
inline constexpr ObjCDispatchEntry kGeneratedObjCDispatchEntries[] = {
    {0, nullptr}};
inline constexpr CFunctionDispatchEntry kGeneratedCFunctionDispatchEntries[] = {
    {0, nullptr}};
inline constexpr BlockDispatchEntry kGeneratedBlockDispatchEntries[] = {
    {0, nullptr}};
}  // namespace nativescript
#endif

#if !NS_HAS_GENERATED_SIGNATURE_NAPI_DISPATCH
namespace nativescript {
inline constexpr ObjCNapiDispatchEntry kGeneratedObjCNapiDispatchEntries[] = {
    {0, nullptr}};
inline constexpr CFunctionNapiDispatchEntry
    kGeneratedCFunctionNapiDispatchEntries[] = {{0, nullptr}};
}  // namespace nativescript
#endif

#if !NS_HAS_GENERATED_SIGNATURE_ENGINE_DIRECT_DISPATCH
namespace nativescript {
inline constexpr ObjCEngineDirectDispatchEntry
    kGeneratedObjCEngineDirectDispatchEntries[] = {{0, nullptr}};
inline constexpr CFunctionEngineDirectDispatchEntry
    kGeneratedCFunctionEngineDirectDispatchEntries[] = {{0, nullptr}};
}  // namespace nativescript
#endif

#if defined(TARGET_ENGINE_V8) && !NS_HAS_GENERATED_SIGNATURE_V8_DISPATCH
namespace nativescript {
inline constexpr ObjCV8DispatchEntry kGeneratedObjCV8DispatchEntries[] = {
    {0, nullptr}};
inline constexpr CFunctionV8DispatchEntry
    kGeneratedCFunctionV8DispatchEntries[] = {{0, nullptr}};
}  // namespace nativescript
#endif

#if defined(TARGET_ENGINE_HERMES) && \
    !NS_HAS_GENERATED_SIGNATURE_HERMES_DIRECT_RETURN_DISPATCH
namespace nativescript {
inline constexpr ObjCHermesDirectReturnDispatchEntry
    kGeneratedObjCHermesDirectReturnDispatchEntries[] = {{0, nullptr}};
inline constexpr CFunctionHermesDirectReturnDispatchEntry
    kGeneratedCFunctionHermesDirectReturnDispatchEntries[] = {{0, nullptr}};
}  // namespace nativescript
#endif

#if defined(TARGET_ENGINE_HERMES) && \
    !NS_HAS_GENERATED_SIGNATURE_HERMES_FRAME_DIRECT_RETURN_DISPATCH
namespace nativescript {
inline constexpr ObjCHermesFrameDirectReturnDispatchEntry
    kGeneratedObjCHermesFrameDirectReturnDispatchEntries[] = {{0, nullptr}};
inline constexpr CFunctionHermesFrameDirectReturnDispatchEntry
    kGeneratedCFunctionHermesFrameDirectReturnDispatchEntries[] = {
        {0, nullptr}};
}  // namespace nativescript
#endif

#if defined(TARGET_ENGINE_HERMES) && \
    !NS_HAS_GENERATED_SIGNATURE_HERMES_BLOCK_FRAME_DIRECT_RETURN_DISPATCH
namespace nativescript {
inline constexpr BlockHermesFrameDirectReturnDispatchEntry
    kGeneratedBlockHermesFrameDirectReturnDispatchEntries[] = {{0, nullptr}};
}  // namespace nativescript
#endif

namespace nativescript {

template <typename Entry, typename Invoker, size_t N>
inline Invoker lookupDispatchInvoker(const Entry (&entries)[N],
                                     uint64_t dispatchId) {
  if (dispatchId == 0 || N <= 1) {
    return nullptr;
  }

  size_t low = 1;
  size_t high = N;
  while (low < high) {
    const size_t mid = low + ((high - low) >> 1);
    const uint64_t midId = entries[mid].dispatchId;
    if (midId < dispatchId) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  if (low < N && entries[low].dispatchId == dispatchId) {
    return entries[low].invoker;
  }
  return nullptr;
}

inline bool isGeneratedDispatchEnabled() {
  static const bool enabled = []() {
    const char* disableFlag = std::getenv("NS_DISABLE_GSD");
    if (disableFlag == nullptr || disableFlag[0] == '\0') {
      return true;
    }
    return !(disableFlag[0] == '0' && disableFlag[1] == '\0');
  }();
  return enabled;
}

inline ObjCPreparedInvoker lookupObjCPreparedInvoker(uint64_t dispatchId) {
  if (!isGeneratedDispatchEnabled()) {
    return nullptr;
  }
  return lookupDispatchInvoker<ObjCDispatchEntry, ObjCPreparedInvoker>(
      kGeneratedObjCDispatchEntries, dispatchId);
}

inline CFunctionPreparedInvoker lookupCFunctionPreparedInvoker(
    uint64_t dispatchId) {
  if (!isGeneratedDispatchEnabled()) {
    return nullptr;
  }
  return lookupDispatchInvoker<CFunctionDispatchEntry,
                               CFunctionPreparedInvoker>(
      kGeneratedCFunctionDispatchEntries, dispatchId);
}

inline BlockPreparedInvoker lookupBlockPreparedInvoker(uint64_t dispatchId) {
  if (!isGeneratedDispatchEnabled()) {
    return nullptr;
  }
  return lookupDispatchInvoker<BlockDispatchEntry, BlockPreparedInvoker>(
      kGeneratedBlockDispatchEntries, dispatchId);
}

inline ObjCNapiInvoker lookupObjCNapiInvoker(uint64_t dispatchId) {
  if (!isGeneratedDispatchEnabled()) {
    return nullptr;
  }
  return lookupDispatchInvoker<ObjCNapiDispatchEntry, ObjCNapiInvoker>(
      kGeneratedObjCNapiDispatchEntries, dispatchId);
}

inline CFunctionNapiInvoker lookupCFunctionNapiInvoker(uint64_t dispatchId) {
  if (!isGeneratedDispatchEnabled()) {
    return nullptr;
  }
  return lookupDispatchInvoker<CFunctionNapiDispatchEntry,
                               CFunctionNapiInvoker>(
      kGeneratedCFunctionNapiDispatchEntries, dispatchId);
}

inline ObjCEngineDirectInvoker lookupObjCEngineDirectInvoker(
    uint64_t dispatchId) {
  if (!isGeneratedDispatchEnabled()) {
    return nullptr;
  }
  return lookupDispatchInvoker<ObjCEngineDirectDispatchEntry,
                               ObjCEngineDirectInvoker>(
      kGeneratedObjCEngineDirectDispatchEntries, dispatchId);
}

inline CFunctionEngineDirectInvoker lookupCFunctionEngineDirectInvoker(
    uint64_t dispatchId) {
  if (!isGeneratedDispatchEnabled()) {
    return nullptr;
  }
  return lookupDispatchInvoker<CFunctionEngineDirectDispatchEntry,
                               CFunctionEngineDirectInvoker>(
      kGeneratedCFunctionEngineDirectDispatchEntries, dispatchId);
}

#ifdef TARGET_ENGINE_V8
inline ObjCV8Invoker lookupObjCV8Invoker(uint64_t dispatchId) {
  if (!isGeneratedDispatchEnabled()) {
    return nullptr;
  }
  return lookupDispatchInvoker<ObjCV8DispatchEntry, ObjCV8Invoker>(
      kGeneratedObjCV8DispatchEntries, dispatchId);
}

inline CFunctionV8Invoker lookupCFunctionV8Invoker(uint64_t dispatchId) {
  if (!isGeneratedDispatchEnabled()) {
    return nullptr;
  }
  return lookupDispatchInvoker<CFunctionV8DispatchEntry, CFunctionV8Invoker>(
      kGeneratedCFunctionV8DispatchEntries, dispatchId);
}
#endif

#ifdef TARGET_ENGINE_HERMES
inline ObjCHermesDirectReturnInvoker lookupObjCHermesDirectReturnInvoker(
    uint64_t dispatchId) {
  if (!isGeneratedDispatchEnabled()) {
    return nullptr;
  }
  return lookupDispatchInvoker<ObjCHermesDirectReturnDispatchEntry,
                               ObjCHermesDirectReturnInvoker>(
      kGeneratedObjCHermesDirectReturnDispatchEntries, dispatchId);
}

inline CFunctionHermesDirectReturnInvoker
lookupCFunctionHermesDirectReturnInvoker(uint64_t dispatchId) {
  if (!isGeneratedDispatchEnabled()) {
    return nullptr;
  }
  return lookupDispatchInvoker<CFunctionHermesDirectReturnDispatchEntry,
                               CFunctionHermesDirectReturnInvoker>(
      kGeneratedCFunctionHermesDirectReturnDispatchEntries, dispatchId);
}

inline ObjCHermesFrameDirectReturnInvoker
lookupObjCHermesFrameDirectReturnInvoker(uint64_t dispatchId) {
  if (!isGeneratedDispatchEnabled()) {
    return nullptr;
  }
  return lookupDispatchInvoker<ObjCHermesFrameDirectReturnDispatchEntry,
                               ObjCHermesFrameDirectReturnInvoker>(
      kGeneratedObjCHermesFrameDirectReturnDispatchEntries, dispatchId);
}

inline CFunctionHermesFrameDirectReturnInvoker
lookupCFunctionHermesFrameDirectReturnInvoker(uint64_t dispatchId) {
  if (!isGeneratedDispatchEnabled()) {
    return nullptr;
  }
  return lookupDispatchInvoker<CFunctionHermesFrameDirectReturnDispatchEntry,
                               CFunctionHermesFrameDirectReturnInvoker>(
      kGeneratedCFunctionHermesFrameDirectReturnDispatchEntries, dispatchId);
}

inline BlockHermesFrameDirectReturnInvoker
lookupBlockHermesFrameDirectReturnInvoker(uint64_t dispatchId) {
  if (!isGeneratedDispatchEnabled()) {
    return nullptr;
  }
  return lookupDispatchInvoker<BlockHermesFrameDirectReturnDispatchEntry,
                               BlockHermesFrameDirectReturnInvoker>(
      kGeneratedBlockHermesFrameDirectReturnDispatchEntries, dispatchId);
}
#endif

}  // namespace nativescript

#endif  // NS_SIGNATURE_DISPATCH_H

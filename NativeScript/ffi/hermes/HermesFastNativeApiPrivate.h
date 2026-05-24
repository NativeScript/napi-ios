#ifndef NS_HERMES_FAST_NATIVE_API_PRIVATE_H
#define NS_HERMES_FAST_NATIVE_API_PRIVATE_H

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
#include "InvocationSupport.h"
#include "ffi/napi/NativeScriptException.h"
#include "ffi/napi/ObjCBridge.h"
#include "SignatureDispatch.h"
#include "ffi/napi/TypeConv.h"

namespace nativescript {

inline constexpr const char* kHermesNativePointerProperty = "__ns_native_ptr";
inline constexpr uint64_t kHermesFirstTaggedValue = 0xfff9000000000000ULL;
inline constexpr uint64_t kHermesBoolETag = 0x1fff6ULL;
inline constexpr uint64_t kHermesBoolBit = 1ULL << 46;

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

  const uint64_t raw = hermesRawValueBits(value);
  if (!isHermesNumber(raw)) {
    return false;
  }

  *result = hermesRawDoubleIsFinite(raw) ? hermesRawToDouble(raw) : 0.0;
  return true;
}

inline napi_value makeHermesRawValue(Cif* cif, uint64_t raw) {
  (void)cif;
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
  return makeHermesRawValue(
      cif, (kHermesBoolETag << 47) | (value ? kHermesBoolBit : 0));
}

napi_value makeHermesObjCReturnValue(napi_env env, ObjCClassMember* member,
                                     MethodDescriptor* descriptor, Cif* cif,
                                     id self, bool receiverIsClass,
                                     napi_value jsThis, void* rvalue,
                                     bool propertyAccess);

napi_value makeHermesCFunctionReturnValue(napi_env env, CFunction* function,
                                          Cif* cif, void* rvalue);

}  // namespace nativescript

#endif  // TARGET_ENGINE_HERMES

#endif  // NS_HERMES_FAST_NATIVE_API_PRIVATE_H

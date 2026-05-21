#include "TypeConv.h"

#ifdef TARGET_ENGINE_HERMES

#include <cmath>
#include <cstdint>
#include <cstring>
#include <string>
#include <unordered_map>
#include <vector>

namespace nativescript {
namespace {

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

}  // namespace

bool TryFastConvertHermesArgument(napi_env env, MDTypeKind kind,
                                  napi_value value, void* result) {
  if (value == nullptr || result == nullptr) {
    return false;
  }

  const uint64_t raw = *reinterpret_cast<const uint64_t*>(value);
  switch (kind) {
    case mdTypeBool:
      if (!isHermesBool(raw)) {
        return false;
      }
      *reinterpret_cast<uint8_t*>(result) =
          (raw & kHermesBoolBit) != 0 ? static_cast<uint8_t>(1) : static_cast<uint8_t>(0);
      return true;

    case mdTypeChar:
    case mdTypeUChar:
    case mdTypeUInt8:
    case mdTypeSShort:
    case mdTypeSInt:
    case mdTypeUInt:
    case mdTypeFloat:
    case mdTypeDouble: {
      if (!isHermesNumber(raw)) {
        return false;
      }
      double converted = hermesRawToDouble(raw);
      if (std::isnan(converted) || std::isinf(converted)) {
        converted = 0.0;
      }
      switch (kind) {
        case mdTypeChar:
          *reinterpret_cast<int8_t*>(result) = static_cast<int8_t>(converted);
          break;
        case mdTypeUChar:
        case mdTypeUInt8:
          *reinterpret_cast<uint8_t*>(result) = static_cast<uint8_t>(converted);
          break;
        case mdTypeSShort:
          *reinterpret_cast<int16_t*>(result) = static_cast<int16_t>(converted);
          break;
        case mdTypeSInt:
          *reinterpret_cast<int32_t*>(result) = static_cast<int32_t>(converted);
          break;
        case mdTypeUInt:
          *reinterpret_cast<uint32_t*>(result) = static_cast<uint32_t>(converted);
          break;
        case mdTypeFloat:
          *reinterpret_cast<float*>(result) = static_cast<float>(converted);
          break;
        case mdTypeDouble:
          *reinterpret_cast<double*>(result) = converted;
          break;
        default:
          break;
      }
      return true;
    }

    case mdTypeUShort:
      if (isHermesNumber(raw)) {
        double converted = hermesRawToDouble(raw);
        if (std::isnan(converted) || std::isinf(converted)) {
          converted = 0.0;
        }
        *reinterpret_cast<uint16_t*>(result) = static_cast<uint16_t>(converted);
        return true;
      }
      return TryFastConvertNapiUInt16Argument(env, value,
                                              reinterpret_cast<uint16_t*>(result));

    case mdTypeSLong:
    case mdTypeSInt64:
      if (isHermesNumber(raw)) {
        double converted = hermesRawToDouble(raw);
        if (std::isnan(converted) || std::isinf(converted)) {
          converted = 0.0;
        }
        *reinterpret_cast<int64_t*>(result) = static_cast<int64_t>(converted);
        return true;
      }
      {
        bool lossless = false;
        return napi_get_value_bigint_int64(env, value, reinterpret_cast<int64_t*>(result),
                                           &lossless) == napi_ok;
      }

    case mdTypeULong:
    case mdTypeUInt64:
      if (isHermesNumber(raw)) {
        double converted = hermesRawToDouble(raw);
        if (std::isnan(converted) || std::isinf(converted)) {
          converted = 0.0;
        }
        *reinterpret_cast<uint64_t*>(result) = static_cast<uint64_t>(converted);
        return true;
      }
      {
        bool lossless = false;
        return napi_get_value_bigint_uint64(env, value, reinterpret_cast<uint64_t*>(result),
                                            &lossless) == napi_ok;
      }

    case mdTypeSelector:
      return tryFastConvertHermesSelectorArgument(
          env, value, reinterpret_cast<SEL*>(result));

    case mdTypeClass:
    case mdTypeAnyObject:
    case mdTypeProtocolObject:
    case mdTypeClassObject:
    case mdTypeInstanceObject:
    case mdTypeNSStringObject:
    case mdTypeNSMutableStringObject:
      if (tryFastUnwrapHermesObjectArgument(env, kind, value, result)) {
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
      return napi_get_boolean(
                 env, *reinterpret_cast<const uint8_t*>(value) != 0, result) ==
             napi_ok;

    case mdTypeChar: {
      if (value == nullptr) {
        return false;
      }
      const int8_t raw = *reinterpret_cast<const int8_t*>(value);
      if (raw == 0 || raw == 1) {
        return napi_get_boolean(env, raw == 1, result) == napi_ok;
      }
      return napi_create_int32(env, raw, result) == napi_ok;
    }

    case mdTypeUChar:
    case mdTypeUInt8: {
      if (value == nullptr) {
        return false;
      }
      const uint8_t raw = *reinterpret_cast<const uint8_t*>(value);
      if (raw == 0 || raw == 1) {
        return napi_get_boolean(env, raw == 1, result) == napi_ok;
      }
      return napi_create_uint32(env, raw, result) == napi_ok;
    }

    case mdTypeSShort:
      if (value == nullptr) {
        return false;
      }
      return napi_create_int32(
                 env, *reinterpret_cast<const int16_t*>(value), result) ==
             napi_ok;

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
      return napi_create_uint32(env, raw, result) == napi_ok;
    }

    case mdTypeSInt:
      if (value == nullptr) {
        return false;
      }
      return napi_create_int32(
                 env, *reinterpret_cast<const int32_t*>(value), result) ==
             napi_ok;

    case mdTypeUInt:
      if (value == nullptr) {
        return false;
      }
      return napi_create_uint32(
                 env, *reinterpret_cast<const uint32_t*>(value), result) ==
             napi_ok;

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
      return napi_create_int64(env, raw, result) == napi_ok;
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
      return napi_create_int64(env, static_cast<int64_t>(raw), result) == napi_ok;
    }

    case mdTypeFloat:
      if (value == nullptr) {
        return false;
      }
      return napi_create_double(
                 env, *reinterpret_cast<const float*>(value), result) == napi_ok;

    case mdTypeDouble:
      if (value == nullptr) {
        return false;
      }
      return napi_create_double(
                 env, *reinterpret_cast<const double*>(value), result) == napi_ok;

    default:
      return false;
  }
}

}  // namespace nativescript

#endif  // TARGET_ENGINE_HERMES

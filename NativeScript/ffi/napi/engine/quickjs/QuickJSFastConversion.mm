#include "QuickJSFastNativeApiPrivate.h"

#ifdef TARGET_ENGINE_QUICKJS

namespace nativescript {

namespace {

inline bool readQuickJSNumber(JSValue value, double* result) {
  if (result == nullptr) {
    return false;
  }

  const int tag = JS_VALUE_GET_NORM_TAG(value);
  if (tag == JS_TAG_INT) {
    *result = static_cast<double>(JS_VALUE_GET_INT(value));
    return true;
  }
  if (tag == JS_TAG_FLOAT64) {
    *result = JS_VALUE_GET_FLOAT64(value);
    return true;
  }
  return false;
}

inline bool readQuickJSFiniteNumber(JSValue value, double* result) {
  if (!readQuickJSNumber(value, result)) {
    return false;
  }
  if (std::isnan(*result) || std::isinf(*result)) {
    *result = 0.0;
  }
  return true;
}

inline bool readQuickJSInt64(JSContext* context, JSValue value,
                             int64_t* result) {
  if (context == nullptr || result == nullptr) {
    return false;
  }

  const int tag = JS_VALUE_GET_NORM_TAG(value);
  if (tag == JS_TAG_INT) {
    *result = static_cast<int64_t>(JS_VALUE_GET_INT(value));
    return true;
  }
  if (tag == JS_TAG_FLOAT64) {
    const double converted = JS_VALUE_GET_FLOAT64(value);
    if (std::isnan(converted) || std::isinf(converted)) {
      *result = 0;
      return true;
    }
    *result = static_cast<int64_t>(converted);
    return true;
  }
  if (JS_IsBigInt(context, value)) {
    return JS_ToBigInt64(context, result, value) == 0;
  }
  return false;
}

inline bool readQuickJSUInt64(JSContext* context, JSValue value,
                              uint64_t* result) {
  if (context == nullptr || result == nullptr) {
    return false;
  }

  const int tag = JS_VALUE_GET_NORM_TAG(value);
  if (tag == JS_TAG_INT) {
    *result = static_cast<uint64_t>(
        static_cast<int64_t>(JS_VALUE_GET_INT(value)));
    return true;
  }
  if (tag == JS_TAG_FLOAT64) {
    const double converted = JS_VALUE_GET_FLOAT64(value);
    if (std::isnan(converted) || std::isinf(converted)) {
      *result = 0;
      return true;
    }
    *result = static_cast<uint64_t>(converted);
    return true;
  }
  if (JS_IsBigInt(context, value)) {
    return JS_ToBigUint64(context, result, value) == 0;
  }
  return false;
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

id normalizeWrappedNativeObject(napi_env env, MDTypeKind kind, void* wrapped) {
  if (wrapped == nullptr) {
    return nil;
  }

  auto* bridgeState = ObjCBridgeState::InstanceData(env);
  if (bridgeState != nullptr) {
    id cachedNative = bridgeState->nativeObjectForBridgeWrapper(wrapped);
    if (cachedNative != nil) {
      return cachedNative;
    }

    for (const auto& entry : bridgeState->classes) {
      ObjCClass* bridgedClass = entry.second;
      if (bridgedClass == wrapped && bridgedClass->nativeClass != nil) {
        return (id)bridgedClass->nativeClass;
      }
    }

    if (kind == mdTypeProtocolObject || kind == mdTypeAnyObject) {
      for (const auto& entry : bridgeState->protocols) {
        ObjCProtocol* bridgedProtocol = entry.second;
        if (bridgedProtocol != wrapped) {
          continue;
        }

        Protocol* runtimeProtocol =
            objc_getProtocol(bridgedProtocol->name.c_str());
        if (runtimeProtocol != nil) {
          return (id)runtimeProtocol;
        }
        break;
      }
    }
  }

  return static_cast<id>(wrapped);
}

bool tryFastUnwrapQuickJSNativeObject(napi_env env, JSValue jsValue,
                                      void** result) {
  if (env == nullptr || result == nullptr || !JS_IsObject(jsValue)) {
    return false;
  }

  *result = nullptr;
  auto* directInfo = static_cast<QuickJSFastExternalInfo*>(
      JS_GetOpaque(jsValue, env->runtime->napiObjectClassId));
  if (directInfo != nullptr && directInfo->data != nullptr) {
    *result = directInfo->data;
    return true;
  }

  JSPropertyDescriptor descriptor{};
  int wrapped = JS_GetOwnProperty(env->context, &descriptor, jsValue,
                                  env->atoms.napi_external);
  if (wrapped <= 0) {
    return false;
  }

  auto* externalInfo = static_cast<QuickJSFastExternalInfo*>(
      JS_GetOpaque(descriptor.value, env->runtime->externalClassId));
  if (externalInfo != nullptr && externalInfo->data != nullptr) {
    *result = externalInfo->data;
  }

  JS_FreeValue(env->context, descriptor.value);
  return *result != nullptr;
}

}  // namespace

bool TryUnwrapQuickJSNativeObjectFast(napi_env env, JSValue jsValue,
                                      void** result) {
  return tryFastUnwrapQuickJSNativeObject(env, jsValue, result);
}

namespace {

bool tryFastConvertQuickJSObjectArgument(napi_env env, MDTypeKind kind,
                                         JSValue jsValue, void* result) {
  if (env == nullptr || result == nullptr) {
    return false;
  }

  if (JS_IsNull(jsValue) || JS_IsUndefined(jsValue)) {
    if (kind == mdTypeClass) {
      *reinterpret_cast<Class*>(result) = Nil;
    } else {
      *reinterpret_cast<id*>(result) = nil;
    }
    return true;
  }

  if (JS_IsString(jsValue) &&
      (kind == mdTypeAnyObject || kind == mdTypeNSStringObject ||
       kind == mdTypeNSMutableStringObject)) {
    size_t length = 0;
    const char* chars = JS_ToCStringLen(env->context, &length, jsValue);
    if (chars == nullptr) {
      return false;
    }

    NSString* string =
        [[[NSString alloc] initWithBytes:chars
                                  length:length
                                encoding:NSUTF8StringEncoding] autorelease];
    JS_FreeCString(env->context, chars);
    if (string == nil) {
      string = @"";
    }
    if (kind == mdTypeNSMutableStringObject) {
      string = [[[NSMutableString alloc] initWithString:string] autorelease];
    }
    *reinterpret_cast<id*>(result) = string;
    return true;
  }

  if (kind == mdTypeAnyObject && JS_IsBool(jsValue)) {
    *reinterpret_cast<id*>(result) =
        [NSNumber numberWithBool:JS_VALUE_GET_BOOL(jsValue)];
    return true;
  }

  if (kind == mdTypeAnyObject) {
    double number = 0.0;
    if (readQuickJSNumber(jsValue, &number)) {
      *reinterpret_cast<id*>(result) = [NSNumber numberWithDouble:number];
      return true;
    }
  }

  void* wrapped = nullptr;
  if (!tryFastUnwrapQuickJSNativeObject(env, jsValue, &wrapped)) {
    return false;
  }

  if (kind == mdTypeClass) {
    id nativeObject = static_cast<id>(wrapped);
    if (!object_isClass(nativeObject)) {
      nativeObject = normalizeWrappedNativeObject(env, kind, wrapped);
    }
    if (!object_isClass(nativeObject)) {
      return false;
    }
    *reinterpret_cast<Class*>(result) = static_cast<Class>(nativeObject);
    return true;
  }

  *reinterpret_cast<id*>(result) =
      normalizeWrappedNativeObject(env, kind, wrapped);
  return true;
}

}  // namespace

bool TryFastConvertQuickJSBoolArgument(napi_env env, napi_value value,
                                       uint8_t* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  JSValue jsValue = ToJSValue(value);
  if (!JS_IsBool(jsValue)) {
    return false;
  }
  *result = JS_VALUE_GET_BOOL(jsValue) ? static_cast<uint8_t>(1)
                                       : static_cast<uint8_t>(0);
  return true;
}

bool TryFastConvertQuickJSDoubleArgument(napi_env env, napi_value value,
                                         double* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }
  return readQuickJSFiniteNumber(ToJSValue(value), result);
}

bool TryFastConvertQuickJSFloatArgument(napi_env env, napi_value value,
                                        float* result) {
  double converted = 0.0;
  if (!TryFastConvertQuickJSDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<float>(converted);
  return true;
}

bool TryFastConvertQuickJSInt8Argument(napi_env env, napi_value value,
                                       int8_t* result) {
  double converted = 0.0;
  if (!TryFastConvertQuickJSDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<int8_t>(converted);
  return true;
}

bool TryFastConvertQuickJSUInt8Argument(napi_env env, napi_value value,
                                        uint8_t* result) {
  double converted = 0.0;
  if (!TryFastConvertQuickJSDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<uint8_t>(converted);
  return true;
}

bool TryFastConvertQuickJSInt16Argument(napi_env env, napi_value value,
                                        int16_t* result) {
  double converted = 0.0;
  if (!TryFastConvertQuickJSDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<int16_t>(converted);
  return true;
}

bool TryFastConvertQuickJSUInt16Argument(napi_env env, napi_value value,
                                         uint16_t* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  JSValue jsValue = ToJSValue(value);
  if (JS_IsString(jsValue)) {
    size_t byteLength = 0;
    const char* str = JS_ToCStringLen(env->context, &byteLength, jsValue);
    if (str == nullptr) {
      return false;
    }

    NSString* string = [[NSString alloc] initWithBytes:str
                                                length:byteLength
                                              encoding:NSUTF8StringEncoding];
    JS_FreeCString(env->context, str);

    if (string == nil || [string length] != 1) {
      [string release];
      napi_throw_type_error(env, nullptr, "Expected a single-character string.");
      return false;
    }

    *result = static_cast<uint16_t>([string characterAtIndex:0]);
    [string release];
    return true;
  }

  double converted = 0.0;
  if (!readQuickJSFiniteNumber(jsValue, &converted)) {
    return false;
  }
  *result = static_cast<uint16_t>(converted);
  return true;
}

bool TryFastConvertQuickJSInt32Argument(napi_env env, napi_value value,
                                        int32_t* result) {
  double converted = 0.0;
  if (!TryFastConvertQuickJSDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<int32_t>(converted);
  return true;
}

bool TryFastConvertQuickJSUInt32Argument(napi_env env, napi_value value,
                                         uint32_t* result) {
  double converted = 0.0;
  if (!TryFastConvertQuickJSDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<uint32_t>(converted);
  return true;
}

bool TryFastConvertQuickJSInt64Argument(napi_env env, napi_value value,
                                        int64_t* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }
  return readQuickJSInt64(env->context, ToJSValue(value), result);
}

bool TryFastConvertQuickJSUInt64Argument(napi_env env, napi_value value,
                                         uint64_t* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }
  return readQuickJSUInt64(env->context, ToJSValue(value), result);
}

bool TryFastConvertQuickJSSelectorArgument(napi_env env, napi_value value,
                                           SEL* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  JSValue jsValue = ToJSValue(value);
  if (JS_IsNull(jsValue) || JS_IsUndefined(jsValue)) {
    *result = nullptr;
    return true;
  }
  if (!JS_IsString(jsValue)) {
    return false;
  }

  size_t length = 0;
  const char* selectorName = JS_ToCStringLen(env->context, &length, jsValue);
  if (selectorName == nullptr) {
    return false;
  }
  *result = cachedSelectorForName(selectorName, length);
  JS_FreeCString(env->context, selectorName);
  return true;
}

bool TryFastConvertQuickJSObjectArgument(napi_env env, MDTypeKind kind,
                                         napi_value value, void* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }
  if (Pointer::isInstance(env, value) || Reference::isInstance(env, value)) {
    if (TryFastConvertNapiArgument(env, kind, value, result)) {
      return true;
    }
    if (kind == mdTypeClass) {
      void* data = nullptr;
      if (Pointer::isInstance(env, value)) {
        Pointer* pointer = Pointer::unwrap(env, value);
        data = pointer != nullptr ? pointer->data : nullptr;
      } else {
        Reference* reference = Reference::unwrap(env, value);
        data = reference != nullptr ? reference->data : nullptr;
      }
      id nativeObject = static_cast<id>(data);
      if (nativeObject != nil && object_isClass(nativeObject)) {
        *reinterpret_cast<Class*>(result) = static_cast<Class>(nativeObject);
        return true;
      }
    }
    return false;
  }
  if (tryFastConvertQuickJSObjectArgument(env, kind, ToJSValue(value),
                                          result)) {
    if (kind != mdTypeClass) {
      napi_valuetype valueType = napi_undefined;
      if (napi_typeof(env, value, &valueType) == napi_ok &&
          valueType == napi_object) {
        id nativeObject = *reinterpret_cast<id*>(result);
        ObjCBridgeState* bridgeState = ObjCBridgeState::InstanceData(env);
        if (nativeObject != nil && bridgeState != nullptr &&
            bridgeState->hasRoundTripCacheFrame()) {
          bridgeState->cacheRoundTripObject(env, nativeObject, value);
        }
      }
    }
    return true;
  }
  return TryFastConvertNapiArgument(env, kind, value, result);
}

bool TryFastConvertQuickJSArgument(napi_env env, MDTypeKind kind,
                                   napi_value value, void* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  switch (kind) {
    case mdTypeBool:
      return TryFastConvertQuickJSBoolArgument(
          env, value, reinterpret_cast<uint8_t*>(result));
    case mdTypeChar:
      return TryFastConvertQuickJSInt8Argument(
          env, value, reinterpret_cast<int8_t*>(result));
    case mdTypeUChar:
    case mdTypeUInt8:
      return TryFastConvertQuickJSUInt8Argument(
          env, value, reinterpret_cast<uint8_t*>(result));
    case mdTypeSShort:
      return TryFastConvertQuickJSInt16Argument(
          env, value, reinterpret_cast<int16_t*>(result));
    case mdTypeUShort:
      return TryFastConvertQuickJSUInt16Argument(
          env, value, reinterpret_cast<uint16_t*>(result));
    case mdTypeSInt:
      return TryFastConvertQuickJSInt32Argument(
          env, value, reinterpret_cast<int32_t*>(result));
    case mdTypeUInt:
      return TryFastConvertQuickJSUInt32Argument(
          env, value, reinterpret_cast<uint32_t*>(result));
    case mdTypeSLong:
    case mdTypeSInt64:
      return TryFastConvertQuickJSInt64Argument(
          env, value, reinterpret_cast<int64_t*>(result));
    case mdTypeULong:
    case mdTypeUInt64:
      return TryFastConvertQuickJSUInt64Argument(
          env, value, reinterpret_cast<uint64_t*>(result));
    case mdTypeFloat:
      return TryFastConvertQuickJSFloatArgument(
          env, value, reinterpret_cast<float*>(result));
    case mdTypeDouble:
      return TryFastConvertQuickJSDoubleArgument(
          env, value, reinterpret_cast<double*>(result));
    case mdTypeSelector:
      return TryFastConvertQuickJSSelectorArgument(
          env, value, reinterpret_cast<SEL*>(result));
    case mdTypeClass:
    case mdTypeAnyObject:
    case mdTypeProtocolObject:
    case mdTypeClassObject:
    case mdTypeInstanceObject:
    case mdTypeNSStringObject:
    case mdTypeNSMutableStringObject:
      if (TryFastConvertQuickJSObjectArgument(env, kind, value, result)) {
        return true;
      }
      return TryFastConvertNapiArgument(env, kind, value, result);

    default:
      return false;
  }
}

bool TryFastConvertQuickJSReturnValue(napi_env env, MDTypeKind kind,
                                      const void* value, napi_value* result) {
  if (env == nullptr || result == nullptr) {
    return false;
  }

  JSContext* context = qjs_get_context(env);
  if (context == nullptr) {
    return false;
  }

  JSValue jsValue = JS_UNDEFINED;
  switch (kind) {
    case mdTypeVoid:
      jsValue = JS_UNDEFINED;
      break;

    case mdTypeBool:
      if (value == nullptr) {
        return false;
      }
      jsValue = JS_NewBool(context, *reinterpret_cast<const uint8_t*>(value) != 0);
      break;

    case mdTypeChar: {
      if (value == nullptr) {
        return false;
      }
      const int8_t raw = *reinterpret_cast<const int8_t*>(value);
      jsValue = raw == 0 || raw == 1 ? JS_NewBool(context, raw == 1)
                                     : JS_NewInt32(context, raw);
      break;
    }

    case mdTypeUChar:
    case mdTypeUInt8: {
      if (value == nullptr) {
        return false;
      }
      const uint8_t raw = *reinterpret_cast<const uint8_t*>(value);
      jsValue = raw == 0 || raw == 1 ? JS_NewBool(context, raw == 1)
                                     : JS_NewUint32(context, raw);
      break;
    }

    case mdTypeSShort:
      if (value == nullptr) {
        return false;
      }
      jsValue = JS_NewInt32(context, *reinterpret_cast<const int16_t*>(value));
      break;

    case mdTypeUShort: {
      if (value == nullptr) {
        return false;
      }
      const uint16_t raw = *reinterpret_cast<const uint16_t*>(value);
      if (raw >= 32 && raw <= 126) {
        const char buffer[1] = {static_cast<char>(raw)};
        jsValue = JS_NewStringLen(context, buffer, 1);
      } else {
        jsValue = JS_NewUint32(context, raw);
      }
      break;
    }

    case mdTypeSInt:
      if (value == nullptr) {
        return false;
      }
      jsValue = JS_NewInt32(context, *reinterpret_cast<const int32_t*>(value));
      break;

    case mdTypeUInt:
      if (value == nullptr) {
        return false;
      }
      jsValue = JS_NewUint32(context, *reinterpret_cast<const uint32_t*>(value));
      break;

    case mdTypeSLong:
    case mdTypeSInt64: {
      if (value == nullptr) {
        return false;
      }
      const int64_t raw = *reinterpret_cast<const int64_t*>(value);
      constexpr int64_t kMaxSafeInteger = 9007199254740991LL;
      jsValue = raw > kMaxSafeInteger || raw < -kMaxSafeInteger
                    ? JS_NewBigInt64(context, raw)
                    : JS_NewInt64(context, raw);
      break;
    }

    case mdTypeULong:
    case mdTypeUInt64: {
      if (value == nullptr) {
        return false;
      }
      const uint64_t raw = *reinterpret_cast<const uint64_t*>(value);
      constexpr uint64_t kMaxSafeInteger = 9007199254740991ULL;
      jsValue = raw > kMaxSafeInteger
                    ? JS_NewBigUint64(context, raw)
                    : JS_NewInt64(context, static_cast<int64_t>(raw));
      break;
    }

    case mdTypeFloat:
      if (value == nullptr) {
        return false;
      }
      jsValue = JS_NewFloat64(context, *reinterpret_cast<const float*>(value));
      break;

    case mdTypeDouble:
      if (value == nullptr) {
        return false;
      }
      jsValue = JS_NewFloat64(context, *reinterpret_cast<const double*>(value));
      break;

    default:
      return false;
  }

  if (JS_IsException(jsValue)) {
    return false;
  }

  return qjs_create_scoped_value(env, jsValue, result) == napi_ok;
}

}  // namespace nativescript

#endif  // TARGET_ENGINE_QUICKJS

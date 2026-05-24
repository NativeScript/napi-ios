#include "JSCFastNativeApiPrivate.h"

#ifdef TARGET_ENGINE_JSC

namespace nativescript {
namespace {
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

bool canMakeJSCRawReturnValue(MDTypeKind kind) {
  switch (kind) {
    case mdTypeVoid:
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
      return true;
    default:
      return false;
  }
}

bool makeJSCRawReturnValue(napi_env env, MDTypeKind kind, const void* value,
                           JSValueRef* result) {
  if (env == nullptr || result == nullptr) {
    return false;
  }

  JSContextRef ctx = env->context;
  switch (kind) {
    case mdTypeVoid:
      *result = JSValueMakeUndefined(ctx);
      return true;

    case mdTypeBool:
      if (value == nullptr) return false;
      *result = JSValueMakeBoolean(
          ctx, *reinterpret_cast<const uint8_t*>(value) != 0);
      return true;

    case mdTypeChar: {
      if (value == nullptr) return false;
      const int8_t raw = *reinterpret_cast<const int8_t*>(value);
      *result = raw == 0 || raw == 1 ? JSValueMakeBoolean(ctx, raw == 1)
                                     : JSValueMakeNumber(ctx, raw);
      return true;
    }

    case mdTypeUChar:
    case mdTypeUInt8: {
      if (value == nullptr) return false;
      const uint8_t raw = *reinterpret_cast<const uint8_t*>(value);
      *result = raw == 0 || raw == 1 ? JSValueMakeBoolean(ctx, raw == 1)
                                     : JSValueMakeNumber(ctx, raw);
      return true;
    }

    case mdTypeSShort:
      if (value == nullptr) return false;
      *result = JSValueMakeNumber(ctx, *reinterpret_cast<const int16_t*>(value));
      return true;

    case mdTypeUShort: {
      if (value == nullptr) return false;
      const uint16_t raw = *reinterpret_cast<const uint16_t*>(value);
      if (raw >= 32 && raw <= 126) {
        const char buffer[2] = {static_cast<char>(raw), '\0'};
        *result = JSValueMakeString(ctx, ScopedJSString(buffer));
      } else {
        *result = JSValueMakeNumber(ctx, raw);
      }
      return true;
    }

    case mdTypeSInt:
      if (value == nullptr) return false;
      *result = JSValueMakeNumber(ctx, *reinterpret_cast<const int32_t*>(value));
      return true;

    case mdTypeUInt:
      if (value == nullptr) return false;
      *result = JSValueMakeNumber(ctx, *reinterpret_cast<const uint32_t*>(value));
      return true;

    case mdTypeSLong:
    case mdTypeSInt64: {
      if (value == nullptr) return false;
      const int64_t raw = *reinterpret_cast<const int64_t*>(value);
      constexpr int64_t kMaxSafeInteger = 9007199254740991LL;
      if (raw > kMaxSafeInteger || raw < -kMaxSafeInteger) {
        napi_value bigint = nullptr;
        if (napi_create_bigint_int64(env, raw, &bigint) == napi_ok) {
          *result = ToJSValue(bigint);
          return true;
        }
      }
      *result = JSValueMakeNumber(ctx, static_cast<double>(raw));
      return true;
    }

    case mdTypeULong:
    case mdTypeUInt64: {
      if (value == nullptr) return false;
      const uint64_t raw = *reinterpret_cast<const uint64_t*>(value);
      constexpr uint64_t kMaxSafeInteger = 9007199254740991ULL;
      if (raw > kMaxSafeInteger) {
        napi_value bigint = nullptr;
        if (napi_create_bigint_uint64(env, raw, &bigint) == napi_ok) {
          *result = ToJSValue(bigint);
          return true;
        }
      }
      *result = JSValueMakeNumber(ctx, static_cast<double>(raw));
      return true;
    }

    case mdTypeFloat:
      if (value == nullptr) return false;
      *result = JSValueMakeNumber(ctx, *reinterpret_cast<const float*>(value));
      return true;

    case mdTypeDouble:
      if (value == nullptr) return false;
      *result = JSValueMakeNumber(ctx, *reinterpret_cast<const double*>(value));
      return true;

    default:
      return false;
  }
}

bool makeJSCNSStringValue(napi_env env, NSString* string, JSValueRef* result) {
  if (env == nullptr || result == nullptr) {
    return false;
  }

  if (string == nil) {
    *result = JSValueMakeNull(env->context);
    return true;
  }

  NSUInteger length = [string length];
  std::vector<char16_t> chars(length > 0 ? length : 1);
  if (length > 0) {
    [string getCharacters:reinterpret_cast<unichar*>(chars.data())
                    range:NSMakeRange(0, length)];
  }

  JSStringRef jsString = JSStringCreateWithCharacters(
      reinterpret_cast<const JSChar*>(chars.data()), length);
  if (jsString == nullptr) {
    return false;
  }
  *result = JSValueMakeString(env->context, jsString);
  JSStringRelease(jsString);
  return true;
}

bool makeJSCBoxedObjectValue(napi_env env, id obj, JSValueRef* result) {
  if (env == nullptr || result == nullptr) {
    return false;
  }

  if (obj == nil || obj == [NSNull null]) {
    *result = JSValueMakeNull(env->context);
    return true;
  }

  if ([obj isKindOfClass:[NSString class]]) {
    return makeJSCNSStringValue(env, (NSString*)obj, result);
  }

  if ([obj isKindOfClass:[NSNumber class]] &&
      ![obj isKindOfClass:[NSDecimalNumber class]]) {
    if (CFGetTypeID((CFTypeRef)obj) == CFBooleanGetTypeID()) {
      *result = JSValueMakeBoolean(env->context, [obj boolValue]);
    } else {
      *result = JSValueMakeNumber(env->context, [obj doubleValue]);
    }
    return true;
  }

  return false;
}

}  // namespace

bool makeJSCObjCReturnValue(napi_env env, ObjCClassMember* member,
                            MethodDescriptor* descriptor, Cif* cif, id self,
                            bool receiverIsClass, napi_value jsThis,
                            void* rvalue, bool propertyAccess,
                            JSValueRef* result) {
  if (env == nullptr || member == nullptr || descriptor == nullptr ||
      cif == nullptr || cif->returnType == nullptr || result == nullptr) {
    return false;
  }

  if (makeJSCRawReturnValue(env, cif->returnType->kind, rvalue, result)) {
    return true;
  }

  const char* selectorName = sel_getName(descriptor->selector);
  if (selectorName != nullptr && std::strcmp(selectorName, "class") == 0) {
    if (!propertyAccess && !receiverIsClass) {
      napi_value constructor = jsThis;
      napi_get_named_property(env, jsThis, "constructor", &constructor);
      *result = ToJSValue(constructor);
      return true;
    }

    id classObject = receiverIsClass ? self : (id)object_getClass(self);
    napi_value converted =
        member->bridgeState->getObject(env, classObject, kUnownedObject, 0, nullptr);
    if (converted == nullptr) {
      return false;
    }
    *result = ToJSValue(converted);
    return true;
  }

  if (cif->returnType->kind == mdTypeInstanceObject) {
    napi_value constructor = jsThis;
    if (!receiverIsClass) {
      napi_get_named_property(env, jsThis, "constructor", &constructor);
    }
    id obj = *reinterpret_cast<id*>(rvalue);
    napi_value converted =
        obj != nil ? member->bridgeState->findCachedObjectWrapper(env, obj)
                   : nullptr;
    if (converted == nullptr) {
      converted = member->bridgeState->getObject(
          env, obj, constructor, member->returnOwned ? kOwnedObject : kUnownedObject);
    }
    *result = converted != nullptr ? ToJSValue(converted) : JSValueMakeNull(env->context);
    return true;
  }

  if (cif->returnType->kind == mdTypeNSStringObject) {
    return makeJSCNSStringValue(
        env, *reinterpret_cast<NSString* const*>(rvalue), result);
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
        napi_value converted =
            member->bridgeState->getObject(env, obj, jsThis, kUnownedObject);
        if (converted == nullptr) {
          return false;
        }
        *result = ToJSValue(converted);
        return true;
      }
    }

    if (obj != nil && ![obj isKindOfClass:[NSString class]] &&
        ![obj isKindOfClass:[NSNumber class]] &&
        ![obj isKindOfClass:[NSNull class]]) {
      napi_value cached = member->bridgeState->findCachedObjectWrapper(env, obj);
      if (cached != nullptr) {
        *result = ToJSValue(cached);
        return true;
      }
    }

    if (makeJSCBoxedObjectValue(env, obj, result)) {
      return true;
    }
  }

  napi_value fastResult = nullptr;
  if (TryFastConvertEngineReturnValue(env, cif->returnType->kind, rvalue,
                                      &fastResult)) {
    *result = ToJSValue(fastResult);
    return true;
  }

  napi_value converted =
      cif->returnType->toJS(env, rvalue, member->returnOwned ? kReturnOwned : 0);
  if (converted == nullptr) {
    return false;
  }
  *result = ToJSValue(converted);
  return true;
}

bool makeJSCCFunctionReturnValue(napi_env env, CFunction* function, Cif* cif,
                                 void* rvalue, JSValueRef* result) {
  if (env == nullptr || cif == nullptr || cif->returnType == nullptr ||
      result == nullptr) {
    return false;
  }

  if (makeJSCRawReturnValue(env, cif->returnType->kind, rvalue, result)) {
    return true;
  }

  if (cif->returnType->kind == mdTypeNSStringObject) {
    return makeJSCNSStringValue(
        env, *reinterpret_cast<NSString* const*>(rvalue), result);
  }
  if (cif->returnType->kind == mdTypeAnyObject &&
      makeJSCBoxedObjectValue(env, *reinterpret_cast<id const*>(rvalue), result)) {
    return true;
  }

  napi_value fastResult = nullptr;
  if (TryFastConvertEngineReturnValue(env, cif->returnType->kind, rvalue,
                                      &fastResult)) {
    *result = ToJSValue(fastResult);
    return true;
  }

  uint32_t toJSFlags = kCStringAsReference;
  if (function != nullptr && (function->dispatchFlags & 1) != 0) {
    toJSFlags |= kReturnOwned;
  }
  napi_value converted = cif->returnType->toJS(env, rvalue, toJSFlags);
  if (converted == nullptr) {
    return false;
  }
  *result = ToJSValue(converted);
  return true;
}

namespace {

bool readJSCStringUTF8(napi_env env, JSValueRef jsValue, const char** out,
                       size_t* outLength, char* stackBuffer,
                       size_t stackCapacity, std::vector<char>* heapBuffer) {
  if (env == nullptr || jsValue == nullptr || out == nullptr ||
      outLength == nullptr || stackBuffer == nullptr || heapBuffer == nullptr) {
    return false;
  }

  JSValueRef exception = nullptr;
  JSStringRef str = JSValueToStringCopy(env->context, jsValue, &exception);
  if (exception != nullptr || str == nullptr) {
    env->last_exception = exception;
    return false;
  }

  const size_t maxLength = JSStringGetMaximumUTF8CStringSize(str);
  char* buffer = stackBuffer;
  size_t capacity = stackCapacity;
  if (maxLength > stackCapacity) {
    heapBuffer->assign(maxLength, '\0');
    buffer = heapBuffer->data();
    capacity = heapBuffer->size();
  }

  const size_t copied = JSStringGetUTF8CString(str, buffer, capacity);
  JSStringRelease(str);
  if (copied == 0) {
    return false;
  }

  *out = buffer;
  *outLength = copied - 1;
  return true;
}

NSString* makeNSStringFromJSCString(napi_env env, JSValueRef jsValue,
                                    bool mutableString) {
  if (env == nullptr || jsValue == nullptr) {
    return nil;
  }

  JSValueRef exception = nullptr;
  JSStringRef str = JSValueToStringCopy(env->context, jsValue, &exception);
  if (exception != nullptr || str == nullptr) {
    env->last_exception = exception;
    return nil;
  }

  const size_t length = JSStringGetLength(str);
  const JSChar* chars = JSStringGetCharactersPtr(str);
  NSString* result =
      [[[NSString alloc] initWithCharacters:reinterpret_cast<const unichar*>(chars)
                                     length:length] autorelease];
  JSStringRelease(str);
  if (result == nil) {
    result = @"";
  }
  if (mutableString) {
    return [[[NSMutableString alloc] initWithString:result] autorelease];
  }
  return result;
}

id normalizeWrappedNativeObject(napi_env env, MDTypeKind kind, void* wrapped) {
  if (wrapped == nullptr) {
    return nil;
  }

  auto bridgeState = ObjCBridgeState::InstanceData(env);
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

        Protocol* runtimeProtocol = objc_getProtocol(bridgedProtocol->name.c_str());
        if (runtimeProtocol != nil) {
          return (id)runtimeProtocol;
        }
        break;
      }
    }
  }

  return static_cast<id>(wrapped);
}

bool tryFastConvertJSCObjectArgument(napi_env env, MDTypeKind kind,
                                     JSValueRef jsValue, void* result) {
  if (env == nullptr || jsValue == nullptr || result == nullptr) {
    return false;
  }

  if (JSValueIsNull(env->context, jsValue) ||
      JSValueIsUndefined(env->context, jsValue)) {
    if (kind == mdTypeClass) {
      *reinterpret_cast<Class*>(result) = Nil;
    } else {
      *reinterpret_cast<id*>(result) = nil;
    }
    return true;
  }

  if (JSValueIsString(env->context, jsValue) &&
      (kind == mdTypeAnyObject || kind == mdTypeNSStringObject ||
       kind == mdTypeNSMutableStringObject)) {
    *reinterpret_cast<id*>(result) = makeNSStringFromJSCString(
        env, jsValue, kind == mdTypeNSMutableStringObject);
    return true;
  }

  if (kind == mdTypeAnyObject && JSValueIsBoolean(env->context, jsValue)) {
    *reinterpret_cast<id*>(result) =
        [NSNumber numberWithBool:JSValueToBoolean(env->context, jsValue)];
    return true;
  }

  if (kind == mdTypeAnyObject && JSValueIsNumber(env->context, jsValue)) {
    JSValueRef exception = nullptr;
    double converted = JSValueToNumber(env->context, jsValue, &exception);
    if (exception != nullptr) {
      env->last_exception = exception;
      return false;
    }
    *reinterpret_cast<id*>(result) = [NSNumber numberWithDouble:converted];
    return true;
  }

  if (!JSValueIsObject(env->context, jsValue)) {
    return false;
  }

  void* wrapped = nullptr;
  if (!nativescript_jsc_try_unwrap_native(env, ToNapi(jsValue), &wrapped) ||
      wrapped == nullptr) {
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

bool TryFastConvertJSCBoolArgument(napi_env env, napi_value value,
                                   uint8_t* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  JSValueRef jsValue = ToJSValue(value);
  if (!JSValueIsBoolean(env->context, jsValue)) {
    return false;
  }
  *result = JSValueToBoolean(env->context, jsValue) ? static_cast<uint8_t>(1)
                                                    : static_cast<uint8_t>(0);
  return true;
}

bool TryFastConvertJSCDoubleArgument(napi_env env, napi_value value,
                                     double* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  JSValueRef jsValue = ToJSValue(value);
  if (!JSValueIsNumber(env->context, jsValue)) {
    return false;
  }
  JSValueRef exception = nullptr;
  double converted = JSValueToNumber(env->context, jsValue, &exception);
  if (exception != nullptr) {
    env->last_exception = exception;
    return false;
  }
  if (std::isnan(converted) || std::isinf(converted)) {
    converted = 0.0;
  }
  *result = converted;
  return true;
}

bool TryFastConvertJSCFloatArgument(napi_env env, napi_value value,
                                    float* result) {
  double converted = 0.0;
  if (!TryFastConvertJSCDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<float>(converted);
  return true;
}

bool TryFastConvertJSCInt8Argument(napi_env env, napi_value value,
                                   int8_t* result) {
  double converted = 0.0;
  if (!TryFastConvertJSCDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<int8_t>(converted);
  return true;
}

bool TryFastConvertJSCUInt8Argument(napi_env env, napi_value value,
                                    uint8_t* result) {
  double converted = 0.0;
  if (!TryFastConvertJSCDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<uint8_t>(converted);
  return true;
}

bool TryFastConvertJSCInt16Argument(napi_env env, napi_value value,
                                    int16_t* result) {
  double converted = 0.0;
  if (!TryFastConvertJSCDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<int16_t>(converted);
  return true;
}

bool TryFastConvertJSCUInt16Argument(napi_env env, napi_value value,
                                     uint16_t* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  JSContextRef ctx = env->context;
  JSValueRef jsValue = ToJSValue(value);
  if (JSValueIsString(ctx, jsValue)) {
    JSValueRef exception = nullptr;
    JSStringRef str = JSValueToStringCopy(ctx, jsValue, &exception);
    if (exception != nullptr || str == nullptr) {
      env->last_exception = exception;
      return false;
    }
    const size_t length = JSStringGetLength(str);
    if (length != 1) {
      JSStringRelease(str);
      napi_throw_type_error(env, nullptr, "Expected a single-character string.");
      return false;
    }
    *result = static_cast<uint16_t>(JSStringGetCharactersPtr(str)[0]);
    JSStringRelease(str);
    return true;
  }

  double converted = 0.0;
  if (!TryFastConvertJSCDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<uint16_t>(converted);
  return true;
}

bool TryFastConvertJSCInt32Argument(napi_env env, napi_value value,
                                    int32_t* result) {
  double converted = 0.0;
  if (!TryFastConvertJSCDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<int32_t>(converted);
  return true;
}

bool TryFastConvertJSCUInt32Argument(napi_env env, napi_value value,
                                     uint32_t* result) {
  double converted = 0.0;
  if (!TryFastConvertJSCDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<uint32_t>(converted);
  return true;
}

bool TryFastConvertJSCInt64Argument(napi_env env, napi_value value,
                                    int64_t* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  JSContextRef ctx = env->context;
  JSValueRef jsValue = ToJSValue(value);
  if (JSValueIsNumber(ctx, jsValue)) {
    double converted = 0.0;
    if (!TryFastConvertJSCDoubleArgument(env, value, &converted)) {
      return false;
    }
    *result = static_cast<int64_t>(converted);
    return true;
  }

  if (__builtin_available(macOS 15.0, iOS 18.0, *)) {
    if (!JSValueIsBigInt(ctx, jsValue)) {
      return false;
    }
    JSValueRef exception = nullptr;
    *result = JSValueToInt64(ctx, jsValue, &exception);
    if (exception != nullptr) {
      env->last_exception = exception;
      return false;
    }
    return true;
  }

  bool lossless = false;
  return napi_get_value_bigint_int64(env, value, result, &lossless) == napi_ok;
}

bool TryFastConvertJSCUInt64Argument(napi_env env, napi_value value,
                                     uint64_t* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  JSContextRef ctx = env->context;
  JSValueRef jsValue = ToJSValue(value);
  if (JSValueIsNumber(ctx, jsValue)) {
    double converted = 0.0;
    if (!TryFastConvertJSCDoubleArgument(env, value, &converted)) {
      return false;
    }
    *result = static_cast<uint64_t>(converted);
    return true;
  }

  if (__builtin_available(macOS 15.0, iOS 18.0, *)) {
    if (!JSValueIsBigInt(ctx, jsValue)) {
      return false;
    }
    JSValueRef exception = nullptr;
    *result = JSValueToUInt64(ctx, jsValue, &exception);
    if (exception != nullptr) {
      env->last_exception = exception;
      return false;
    }
    return true;
  }

  bool lossless = false;
  return napi_get_value_bigint_uint64(env, value, result, &lossless) == napi_ok;
}

bool TryFastConvertJSCSelectorArgument(napi_env env, napi_value value,
                                       SEL* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  JSValueRef jsValue = ToJSValue(value);
  if (JSValueIsNull(env->context, jsValue) ||
      JSValueIsUndefined(env->context, jsValue)) {
    *result = nullptr;
    return true;
  }
  if (!JSValueIsString(env->context, jsValue)) {
    return false;
  }

  constexpr size_t kStackCapacity = 256;
  char stackBuffer[kStackCapacity];
  std::vector<char> heapBuffer;
  const char* selectorName = nullptr;
  size_t selectorLength = 0;
  if (!readJSCStringUTF8(env, jsValue, &selectorName, &selectorLength,
                         stackBuffer, kStackCapacity, &heapBuffer)) {
    return false;
  }
  *result = cachedSelectorForName(selectorName, selectorLength);
  return true;
}

bool TryFastConvertJSCObjectArgument(napi_env env, MDTypeKind kind,
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
  if (tryFastConvertJSCObjectArgument(env, kind, ToJSValue(value), result)) {
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

bool TryFastConvertJSCArgument(napi_env env, MDTypeKind kind, napi_value value,
                               void* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  JSContextRef ctx = env->context;
  JSValueRef jsValue = ToJSValue(value);
  switch (kind) {
    case mdTypeBool:
      if (!JSValueIsBoolean(ctx, jsValue)) {
        return false;
      }
      *reinterpret_cast<uint8_t*>(result) =
          JSValueToBoolean(ctx, jsValue) ? static_cast<uint8_t>(1) : static_cast<uint8_t>(0);
      return true;

    case mdTypeChar:
    case mdTypeUChar:
    case mdTypeUInt8:
    case mdTypeSShort:
    case mdTypeSInt:
    case mdTypeUInt:
    case mdTypeFloat:
    case mdTypeDouble: {
      if (!JSValueIsNumber(ctx, jsValue)) {
        return false;
      }
      JSValueRef exception = nullptr;
      double converted = JSValueToNumber(ctx, jsValue, &exception);
      if (exception != nullptr) {
        env->last_exception = exception;
        return false;
      }
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
      if (JSValueIsString(ctx, jsValue)) {
        JSValueRef exception = nullptr;
        JSStringRef str = JSValueToStringCopy(ctx, jsValue, &exception);
        if (exception != nullptr || str == nullptr) {
          env->last_exception = exception;
          return false;
        }
        const size_t length = JSStringGetLength(str);
        if (length != 1) {
          JSStringRelease(str);
          napi_throw_type_error(env, nullptr, "Expected a single-character string.");
          return false;
        }
        *reinterpret_cast<uint16_t*>(result) =
            static_cast<uint16_t>(JSStringGetCharactersPtr(str)[0]);
        JSStringRelease(str);
        return true;
      }
      if (JSValueIsNumber(ctx, jsValue)) {
        JSValueRef exception = nullptr;
        double converted = JSValueToNumber(ctx, jsValue, &exception);
        if (exception != nullptr) {
          env->last_exception = exception;
          return false;
        }
        *reinterpret_cast<uint16_t*>(result) = static_cast<uint16_t>(converted);
        return true;
      }
      return false;

    case mdTypeSLong:
    case mdTypeSInt64:
    case mdTypeULong:
    case mdTypeUInt64:
      if (JSValueIsNumber(ctx, jsValue)) {
        JSValueRef exception = nullptr;
        double converted = JSValueToNumber(ctx, jsValue, &exception);
        if (exception != nullptr) {
          env->last_exception = exception;
          return false;
        }
        if (std::isnan(converted) || std::isinf(converted)) {
          converted = 0.0;
        }
        if (kind == mdTypeSLong || kind == mdTypeSInt64) {
          *reinterpret_cast<int64_t*>(result) = static_cast<int64_t>(converted);
        } else {
          *reinterpret_cast<uint64_t*>(result) = static_cast<uint64_t>(converted);
        }
        return true;
      }
      if (__builtin_available(macOS 15.0, iOS 18.0, *)) {
        if (!JSValueIsBigInt(ctx, jsValue)) {
          return false;
        }
        JSValueRef exception = nullptr;
        if (kind == mdTypeSLong || kind == mdTypeSInt64) {
          *reinterpret_cast<int64_t*>(result) =
              JSValueToInt64(ctx, jsValue, &exception);
        } else {
          *reinterpret_cast<uint64_t*>(result) =
              JSValueToUInt64(ctx, jsValue, &exception);
        }
        if (exception != nullptr) {
          env->last_exception = exception;
          return false;
        }
        return true;
      }
      if (kind == mdTypeSLong || kind == mdTypeSInt64) {
        bool lossless = false;
        return napi_get_value_bigint_int64(env, value, reinterpret_cast<int64_t*>(result),
                                           &lossless) == napi_ok;
      }
      {
        bool lossless = false;
        return napi_get_value_bigint_uint64(env, value, reinterpret_cast<uint64_t*>(result),
                                            &lossless) == napi_ok;
      }

    case mdTypeSelector: {
      SEL* selector = reinterpret_cast<SEL*>(result);
      if (JSValueIsNull(ctx, jsValue) || JSValueIsUndefined(ctx, jsValue)) {
        *selector = nullptr;
        return true;
      }
      if (!JSValueIsString(ctx, jsValue)) {
        return false;
      }

      constexpr size_t kStackCapacity = 256;
      char stackBuffer[kStackCapacity];
      std::vector<char> heapBuffer;
      const char* selectorName = nullptr;
      size_t selectorLength = 0;
      if (!readJSCStringUTF8(env, jsValue, &selectorName, &selectorLength,
                             stackBuffer, kStackCapacity, &heapBuffer)) {
        return false;
      }
      *selector = cachedSelectorForName(selectorName, selectorLength);
      return true;
    }

    case mdTypeClass:
    case mdTypeAnyObject:
    case mdTypeProtocolObject:
    case mdTypeClassObject:
    case mdTypeInstanceObject:
    case mdTypeNSStringObject:
    case mdTypeNSMutableStringObject:
      if (TryFastConvertJSCObjectArgument(env, kind, value, result)) {
        return true;
      }
      return TryFastConvertNapiArgument(env, kind, value, result);

    default:
      return false;
  }
}

bool TryFastConvertJSCReturnValue(napi_env env, MDTypeKind kind,
                                  const void* value, napi_value* result) {
  if (env == nullptr || result == nullptr) {
    return false;
  }

  JSContextRef ctx = env->context;
  JSValueRef jsValue = nullptr;
  switch (kind) {
    case mdTypeVoid:
      jsValue = JSValueMakeUndefined(ctx);
      break;

    case mdTypeBool:
      if (value == nullptr) {
        return false;
      }
      jsValue = JSValueMakeBoolean(
          ctx, *reinterpret_cast<const uint8_t*>(value) != 0);
      break;

    case mdTypeChar: {
      if (value == nullptr) {
        return false;
      }
      const int8_t raw = *reinterpret_cast<const int8_t*>(value);
      jsValue = raw == 0 || raw == 1
                    ? JSValueMakeBoolean(ctx, raw == 1)
                    : JSValueMakeNumber(ctx, raw);
      break;
    }

    case mdTypeUChar:
    case mdTypeUInt8: {
      if (value == nullptr) {
        return false;
      }
      const uint8_t raw = *reinterpret_cast<const uint8_t*>(value);
      jsValue = raw == 0 || raw == 1
                    ? JSValueMakeBoolean(ctx, raw == 1)
                    : JSValueMakeNumber(ctx, raw);
      break;
    }

    case mdTypeSShort:
      if (value == nullptr) {
        return false;
      }
      jsValue = JSValueMakeNumber(ctx, *reinterpret_cast<const int16_t*>(value));
      break;

    case mdTypeUShort: {
      if (value == nullptr) {
        return false;
      }
      const uint16_t raw = *reinterpret_cast<const uint16_t*>(value);
      if (raw >= 32 && raw <= 126) {
        const char buffer[2] = {static_cast<char>(raw), '\0'};
        jsValue = JSValueMakeString(ctx, ScopedJSString(buffer));
      } else {
        jsValue = JSValueMakeNumber(ctx, raw);
      }
      break;
    }

    case mdTypeSInt:
      if (value == nullptr) {
        return false;
      }
      jsValue = JSValueMakeNumber(ctx, *reinterpret_cast<const int32_t*>(value));
      break;

    case mdTypeUInt:
      if (value == nullptr) {
        return false;
      }
      jsValue = JSValueMakeNumber(ctx, *reinterpret_cast<const uint32_t*>(value));
      break;

    case mdTypeSLong:
    case mdTypeSInt64: {
      if (value == nullptr) {
        return false;
      }
      const int64_t raw = *reinterpret_cast<const int64_t*>(value);
      constexpr int64_t kMaxSafeInteger = 9007199254740991LL;
      if (raw > kMaxSafeInteger || raw < -kMaxSafeInteger) {
        napi_value bigint = nullptr;
        if (napi_create_bigint_int64(env, raw, &bigint) == napi_ok) {
          *result = bigint;
          return true;
        }
      }
      jsValue = JSValueMakeNumber(ctx, static_cast<double>(raw));
      break;
    }

    case mdTypeULong:
    case mdTypeUInt64: {
      if (value == nullptr) {
        return false;
      }
      const uint64_t raw = *reinterpret_cast<const uint64_t*>(value);
      constexpr uint64_t kMaxSafeInteger = 9007199254740991ULL;
      if (raw > kMaxSafeInteger) {
        napi_value bigint = nullptr;
        if (napi_create_bigint_uint64(env, raw, &bigint) == napi_ok) {
          *result = bigint;
          return true;
        }
      }
      jsValue = JSValueMakeNumber(ctx, static_cast<double>(raw));
      break;
    }

    case mdTypeFloat:
      if (value == nullptr) {
        return false;
      }
      jsValue = JSValueMakeNumber(ctx, *reinterpret_cast<const float*>(value));
      break;

    case mdTypeDouble:
      if (value == nullptr) {
        return false;
      }
      jsValue = JSValueMakeNumber(ctx, *reinterpret_cast<const double*>(value));
      break;

    default:
      return false;
  }

  *result = ToNapi(jsValue);
  return true;
}

}  // namespace nativescript

#endif  // TARGET_ENGINE_JSC

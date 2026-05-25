#include "V8FastNativeApiPrivate.h"

#ifdef TARGET_ENGINE_V8

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

bool TryFastConvertV8SelectorArgument(napi_env env, v8::Local<v8::Value> value, SEL* selector) {
  if (env == nullptr || selector == nullptr || value.IsEmpty()) {
    return false;
  }

  if (value->IsNullOrUndefined()) {
    *selector = nullptr;
    return true;
  }

  if (!value->IsString()) {
    return false;
  }

  v8::Local<v8::String> string = value.As<v8::String>();
  constexpr size_t kStackCapacity = 256;
  char stackBuffer[kStackCapacity];
  char* buffer = stackBuffer;
  size_t length = 0;
  size_t capacity = 0;

  if (string->IsOneByte() || string->ContainsOnlyOneByte()) {
    length = static_cast<size_t>(string->Length());
    capacity = length + 1;
    if (capacity > kStackCapacity) {
      buffer = static_cast<char*>(malloc(capacity));
      if (buffer == nullptr) {
        return false;
      }
    }
    string->WriteOneByteV2(env->isolate, 0, static_cast<uint32_t>(length),
                           reinterpret_cast<uint8_t*>(buffer),
                           v8::String::WriteFlags::kNullTerminate);
  } else {
    length = string->Utf8LengthV2(env->isolate);
    capacity = length + 1;
    if (capacity > kStackCapacity) {
      buffer = static_cast<char*>(malloc(capacity));
      if (buffer == nullptr) {
        return false;
      }
    }

    size_t written =
        string->WriteUtf8V2(env->isolate, buffer, capacity, v8::String::WriteFlags::kNullTerminate);
    if (written == 0) {
      if (buffer != stackBuffer) {
        free(buffer);
      }
      return false;
    }
    length = buffer[written - 1] == '\0' ? written - 1 : written;
  }

  buffer[length] = '\0';
  *selector = cachedSelectorForName(buffer, length);
  if (buffer != stackBuffer) {
    free(buffer);
  }
  return true;
}


v8::Local<v8::String> nativePointerPropertyName(v8::Isolate* isolate) {
  static thread_local v8::Persistent<v8::String> name;
  static thread_local v8::Isolate* nameIsolate = nullptr;

  if (name.IsEmpty() || nameIsolate != isolate) {
    name.Reset();
    nameIsolate = isolate;
    name.Reset(isolate, v8::String::NewFromUtf8(isolate, kV8NativePointerProperty,
                                                v8::NewStringType::kInternalized)
                            .ToLocalChecked());
  }

  return v8::Local<v8::String>::New(isolate, name);
}

bool hasV8NativePointerProperty(napi_env env, v8::Local<v8::Object> object) {
  if (env == nullptr || object.IsEmpty()) {
    return false;
  }

  return object->HasOwnProperty(env->context(), nativePointerPropertyName(env->isolate))
      .FromMaybe(false);
}

id resolveCachedHandleObject(napi_env env, void* handle) {
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
  if (napi_has_named_property(env, cachedValue, kV8NativePointerProperty, &hasNativePointer) ==
          napi_ok &&
      hasNativePointer) {
    napi_value nativePointerValue = nullptr;
    if (napi_get_named_property(env, cachedValue, kV8NativePointerProperty, &nativePointerValue) ==
            napi_ok &&
        Pointer::isInstance(env, nativePointerValue)) {
      Pointer* pointer = Pointer::unwrap(env, nativePointerValue);
      if (pointer != nullptr && pointer->data != nullptr) {
        bridgeState->cacheRoundTripObject(env, static_cast<id>(pointer->data), cachedValue);
        return static_cast<id>(pointer->data);
      }
    }
  }

  return nil;
}

bool TryFastUnwrapV8PointerLikeObjectArgument(napi_env env, v8::Local<v8::Value> value,
                                              id* result) {
  if (env == nullptr || result == nullptr || value.IsEmpty() || !value->IsObject()) {
    return false;
  }

  napi_value jsValue = v8impl::JsValueFromV8LocalValue(value);
  void* data = nullptr;
  if (Pointer::isInstance(env, jsValue)) {
    Pointer* pointer = Pointer::unwrap(env, jsValue);
    data = pointer != nullptr ? pointer->data : nullptr;
  } else if (Reference::isInstance(env, jsValue)) {
    Reference* reference = Reference::unwrap(env, jsValue);
    data = reference != nullptr ? reference->data : nullptr;
  } else {
    return false;
  }

  if (id cachedObject = resolveCachedHandleObject(env, data); cachedObject != nil) {
    *result = cachedObject;
  } else {
    *result = static_cast<id>(data);
  }
  return true;
}

bool TryFastUnwrapV8ObjectArgument(napi_env env, v8::Local<v8::Value> value, id* result) {
  if (env == nullptr || result == nullptr || value.IsEmpty()) {
    return false;
  }

  if (value->IsNullOrUndefined()) {
    *result = nil;
    return true;
  }

  if (!value->IsObject()) {
    return false;
  }

  v8::Local<v8::Object> object = value.As<v8::Object>();
  if (isV8NativeWrapperObject(object)) {
    id nativeObject = tryReadWrappedReference(env, object);
    if (nativeObject != nil) {
      *result = nativeObject;
      ObjCBridgeState* bridgeState = ObjCBridgeState::InstanceData(env);
      if (bridgeState != nullptr && bridgeState->hasRoundTripCacheFrame()) {
        bridgeState->cacheRoundTripObject(env, nativeObject,
                                          v8impl::JsValueFromV8LocalValue(value));
      }
      return true;
    }
  }

  if (TryFastUnwrapV8PointerLikeObjectArgument(env, value, result)) {
    return true;
  }

  if (hasV8NativePointerProperty(env, object)) {
    id nativeObject = tryUnwrapV8NativeObject(env, value);
    if (nativeObject != nil) {
      *result = nativeObject;
      ObjCBridgeState* bridgeState = ObjCBridgeState::InstanceData(env);
      if (bridgeState != nullptr && bridgeState->hasRoundTripCacheFrame()) {
        bridgeState->cacheRoundTripObject(env, nativeObject,
                                          v8impl::JsValueFromV8LocalValue(value));
      }
      return true;
    }
  }

  return false;
}

bool TryFastUnwrapV8ClassArgument(napi_env env, v8::Local<v8::Value> value, Class* result) {
  if (env == nullptr || result == nullptr || value.IsEmpty()) {
    return false;
  }

  if (value->IsNullOrUndefined()) {
    *result = Nil;
    return true;
  }

  if (!value->IsObject()) {
    return false;
  }

  id nativeObject = tryUnwrapV8NativeObject(env, value);
  if (nativeObject == nil || !object_isClass(nativeObject)) {
    return false;
  }

  *result = (Class)nativeObject;
  return true;
}

}  // namespace

bool TryFastConvertV8UInt16Argument(napi_env env, v8::Local<v8::Value> value, uint16_t* result) {
  if (env == nullptr || result == nullptr || value.IsEmpty()) {
    return false;
  }

  if (value->IsString()) {
    v8::String::Value chars(env->isolate, value);
    if (chars.length() != 1) {
      *result = 0;
      return false;
    }

    *result = static_cast<uint16_t>((*chars)[0]);
    return true;
  }

  uint32_t converted = 0;
  if (!value->Uint32Value(env->context()).To(&converted)) {
    return false;
  }

  *result = static_cast<uint16_t>(converted);
  return true;
}

bool TryFastConvertV8Argument(napi_env env, MDTypeKind kind, v8::Local<v8::Value> value,
                              void* result) {
  if (env == nullptr || result == nullptr || value.IsEmpty()) {
    return false;
  }

  switch (kind) {
    case mdTypeChar: {
      int32_t converted = 0;
      if (!value->Int32Value(env->context()).To(&converted)) {
        return false;
      }
      *reinterpret_cast<int8_t*>(result) = static_cast<int8_t>(converted);
      return true;
    }

    case mdTypeUChar:
    case mdTypeUInt8: {
      uint32_t converted = 0;
      if (!value->Uint32Value(env->context()).To(&converted)) {
        return false;
      }
      *reinterpret_cast<uint8_t*>(result) = static_cast<uint8_t>(converted);
      return true;
    }

    case mdTypeSShort: {
      int32_t converted = 0;
      if (!value->Int32Value(env->context()).To(&converted)) {
        return false;
      }
      *reinterpret_cast<int16_t*>(result) = static_cast<int16_t>(converted);
      return true;
    }

    case mdTypeUShort:
      return TryFastConvertV8UInt16Argument(env, value, reinterpret_cast<uint16_t*>(result));

    case mdTypeSInt:
      return value->Int32Value(env->context()).To(reinterpret_cast<int32_t*>(result));

    case mdTypeUInt:
      return value->Uint32Value(env->context()).To(reinterpret_cast<uint32_t*>(result));

    case mdTypeSLong:
    case mdTypeSInt64:
      if (value->IsBigInt()) {
        bool lossless = false;
        int64_t converted = value.As<v8::BigInt>()->Int64Value(&lossless);
        if (!lossless) {
          return false;
        }
        *reinterpret_cast<int64_t*>(result) = converted;
        return true;
      }
      return value->IntegerValue(env->context()).To(reinterpret_cast<int64_t*>(result));

    case mdTypeULong:
    case mdTypeUInt64:
      if (value->IsBigInt()) {
        bool lossless = false;
        uint64_t converted = value.As<v8::BigInt>()->Uint64Value(&lossless);
        if (!lossless) {
          return false;
        }
        *reinterpret_cast<uint64_t*>(result) = converted;
        return true;
      } else {
        int64_t converted = 0;
        if (!value->IntegerValue(env->context()).To(&converted)) {
          return false;
        }
        *reinterpret_cast<uint64_t*>(result) = static_cast<uint64_t>(converted);
        return true;
      }

    case mdTypeFloat: {
      double converted = 0.0;
      if (!value->NumberValue(env->context()).To(&converted)) {
        return false;
      }
      if (std::isnan(converted) || std::isinf(converted)) {
        converted = 0.0;
      }
      *reinterpret_cast<float*>(result) = static_cast<float>(converted);
      return true;
    }

    case mdTypeDouble: {
      double converted = 0.0;
      if (!value->NumberValue(env->context()).To(&converted)) {
        return false;
      }
      if (std::isnan(converted) || std::isinf(converted)) {
        converted = 0.0;
      }
      *reinterpret_cast<double*>(result) = converted;
      return true;
    }

    case mdTypeBool:
      if (!value->IsBoolean()) {
        return false;
      }
      *reinterpret_cast<uint8_t*>(result) =
          value->BooleanValue(env->isolate) ? static_cast<uint8_t>(1) : static_cast<uint8_t>(0);
      return true;

    case mdTypeSelector: {
      return TryFastConvertV8SelectorArgument(env, value, reinterpret_cast<SEL*>(result));
    }

    case mdTypeClass:
      if (TryFastUnwrapV8ClassArgument(env, value, reinterpret_cast<Class*>(result))) {
        return true;
      }
      return TryFastConvertNapiArgument(env, kind, v8impl::JsValueFromV8LocalValue(value), result);

    case mdTypeAnyObject:
    case mdTypeProtocolObject:
    case mdTypeClassObject:
    case mdTypeInstanceObject:
    case mdTypeNSStringObject:
    case mdTypeNSMutableStringObject:
      if (TryFastUnwrapV8ObjectArgument(env, value, reinterpret_cast<id*>(result))) {
        return true;
      }
      return TryFastConvertNapiArgument(env, kind, v8impl::JsValueFromV8LocalValue(value), result);

    default:
      return false;
  }
}

bool TryFastConvertV8ReturnValue(napi_env env, MDTypeKind kind, const void* value,
                                 v8::Local<v8::Value>* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  v8::Isolate* isolate = env->isolate;
  switch (kind) {
    case mdTypeVoid:
      *result = v8::Undefined(isolate);
      return true;

    case mdTypeBool:
      *result = v8::Boolean::New(isolate, *reinterpret_cast<const uint8_t*>(value) != 0);
      return true;

    case mdTypeChar:
      *result = v8::Integer::New(isolate, *reinterpret_cast<const int8_t*>(value));
      return true;

    case mdTypeUChar:
    case mdTypeUInt8:
      *result = v8::Integer::NewFromUnsigned(isolate, *reinterpret_cast<const uint8_t*>(value));
      return true;

    case mdTypeSShort:
      *result = v8::Integer::New(isolate, *reinterpret_cast<const int16_t*>(value));
      return true;

    case mdTypeUShort: {
      uint16_t raw = *reinterpret_cast<const uint16_t*>(value);
      if (raw >= 32 && raw <= 126) {
        const char buffer[2] = {static_cast<char>(raw), '\0'};
        *result =
            v8::String::NewFromUtf8(isolate, buffer, v8::NewStringType::kNormal,
                                    1)
                .ToLocalChecked();
      } else {
        *result = v8::Integer::NewFromUnsigned(isolate, raw);
      }
      return true;
    }

    case mdTypeSInt:
      *result = v8::Integer::New(isolate, *reinterpret_cast<const int32_t*>(value));
      return true;

    case mdTypeUInt:
      *result = v8::Integer::NewFromUnsigned(isolate, *reinterpret_cast<const uint32_t*>(value));
      return true;

    case mdTypeSLong:
    case mdTypeSInt64: {
      int64_t nativeValue = *reinterpret_cast<const int64_t*>(value);
      constexpr int64_t kMaxSafeInteger = 9007199254740991LL;
      if (nativeValue > kMaxSafeInteger || nativeValue < -kMaxSafeInteger) {
        *result = v8::BigInt::New(isolate, nativeValue);
      } else {
        *result = v8::Number::New(isolate, static_cast<double>(nativeValue));
      }
      return true;
    }

    case mdTypeULong:
    case mdTypeUInt64: {
      uint64_t nativeValue = *reinterpret_cast<const uint64_t*>(value);
      constexpr uint64_t kMaxSafeInteger = 9007199254740991ULL;
      if (nativeValue > kMaxSafeInteger) {
        *result = v8::BigInt::NewFromUnsigned(isolate, nativeValue);
      } else {
        *result = v8::Number::New(isolate, static_cast<double>(nativeValue));
      }
      return true;
    }

    case mdTypeFloat:
      *result = v8::Number::New(isolate, *reinterpret_cast<const float*>(value));
      return true;

    case mdTypeDouble:
      *result = v8::Number::New(isolate, *reinterpret_cast<const double*>(value));
      return true;

    default:
      return false;
  }
}


bool TryFastConvertV8NSStringReturnValue(napi_env env, const void* value,
                                         v8::Local<v8::Value>* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  NSString* str = *reinterpret_cast<NSString* const*>(value);
  v8::Isolate* isolate = env->isolate;
  if (str == nil) {
    *result = v8::Null(isolate);
    return true;
  }

  const NSUInteger length = [str length];
  if (length == 0) {
    *result = v8::String::Empty(isolate);
    return true;
  }

  if (length > static_cast<NSUInteger>(std::numeric_limits<int>::max())) {
    return false;
  }

  const UniChar* directChars = CFStringGetCharactersPtr((CFStringRef)str);
  if (directChars != nullptr) {
    v8::Local<v8::String> stringValue;
    if (!v8::String::NewFromTwoByte(
             isolate, reinterpret_cast<const uint16_t*>(directChars), v8::NewStringType::kNormal,
             static_cast<int>(length))
             .ToLocal(&stringValue)) {
      return false;
    }
    *result = stringValue;
    return true;
  }

  constexpr NSUInteger kStackCapacity = 256;
  UniChar stackBuffer[kStackCapacity];
  UniChar* buffer = length <= kStackCapacity
                        ? stackBuffer
                        : static_cast<UniChar*>(malloc(length * sizeof(UniChar)));
  if (buffer == nullptr) {
    return false;
  }

  [str getCharacters:buffer range:NSMakeRange(0, length)];

  v8::Local<v8::String> stringValue;
  bool converted = v8::String::NewFromTwoByte(
                       isolate, reinterpret_cast<const uint16_t*>(buffer),
                       v8::NewStringType::kNormal, static_cast<int>(length))
                       .ToLocal(&stringValue);
  if (buffer != stackBuffer) {
    free(buffer);
  }

  if (!converted) {
    return false;
  }

  *result = stringValue;
  return true;
}

bool TryFastConvertV8FoundationObject(napi_env env, id value, v8::Local<v8::Value>* result) {
  if (env == nullptr || value == nil || result == nullptr) {
    return false;
  }

  v8::Isolate* isolate = env->isolate;
  if ([value isKindOfClass:[NSNull class]]) {
    *result = v8::Null(isolate);
    return true;
  }

  if ([value isKindOfClass:[NSNumber class]] && ![value isKindOfClass:[NSDecimalNumber class]]) {
    if (CFGetTypeID((CFTypeRef)value) == CFBooleanGetTypeID()) {
      *result = v8::Boolean::New(isolate, [value boolValue] == YES);
      return true;
    }

    *result = v8::Number::New(isolate, [value doubleValue]);
    return true;
  }

  if ([value isKindOfClass:[NSString class]]) {
    NSString* str = (NSString*)value;
    return TryFastConvertV8NSStringReturnValue(env, &str, result);
  }

  return false;
}

bool TryFastSetV8ObjectReturnValue(napi_env env,
                                   const v8::FunctionCallbackInfo<v8::Value>& info,
                                   ObjCBridgeState* bridgeState, id value,
                                   ObjectOwnership ownership) {
  if (env == nullptr || bridgeState == nullptr) {
    return false;
  }

  v8::Isolate* isolate = info.GetIsolate();
  if (value == nil) {
    info.GetReturnValue().Set(v8::Null(isolate));
    return true;
  }

  v8::Local<v8::Value> fastValue;
  if (TryFastConvertV8FoundationObject(env, value, &fastValue)) {
    info.GetReturnValue().Set(fastValue);
    return true;
  }

  if (napi_value cached = bridgeState->findCachedObjectWrapper(env, value);
      cached != nullptr) {
    info.GetReturnValue().Set(v8impl::V8LocalValueFromJsValue(cached));
    return true;
  }

  napi_value result = bridgeState->getObject(env, value, ownership, 0, nullptr);
  if (result == nullptr) {
    return false;
  }

  info.GetReturnValue().Set(v8impl::V8LocalValueFromJsValue(result));
  return true;
}


bool TryFastSetV8GeneratedObjCObjectReturnValue(
    napi_env env, const v8::FunctionCallbackInfo<v8::Value>& info, Cif* cif,
    void* bridgeState, id self, SEL selector, id value, bool returnOwned,
    bool receiverIsClass, bool propertyAccess) {
  (void)propertyAccess;
  auto* state = static_cast<ObjCBridgeState*>(bridgeState);
  if (env == nullptr || state == nullptr || cif == nullptr || cif->returnType == nullptr) {
    return false;
  }

  if (selector == @selector(class)) {
    return false;
  }

  switch (cif->returnType->kind) {
    case mdTypeAnyObject:
    case mdTypeProtocolObject:
    case mdTypeClassObject:
    case mdTypeNSStringObject:
      break;
    default:
      return false;
  }

  if (receiverIsClass && value != nil) {
    Class receiverClass = (Class)self;
    if ((receiverClass == [NSString class] || receiverClass == [NSMutableString class]) &&
        (selector == @selector(string) ||
         selector == @selector(stringWithString:) ||
         selector == @selector(stringWithCapacity:))) {
      return false;
    }
  }

  return TryFastSetV8ObjectReturnValue(
      env, info, state, value, returnOwned ? kOwnedObject : kUnownedObject);
}


}  // namespace nativescript

#endif  // TARGET_ENGINE_V8

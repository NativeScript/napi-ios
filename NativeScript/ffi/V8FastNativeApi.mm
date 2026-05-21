#include "V8FastNativeApi.h"

#ifdef TARGET_ENGINE_V8

#import <CoreFoundation/CoreFoundation.h>
#import <Foundation/Foundation.h>
#include <objc/message.h>
#include <objc/runtime.h>

#include <algorithm>
#include <cmath>
#include <cstddef>
#include <cstdlib>
#include <cstring>
#include <limits>
#include <memory>
#include <optional>
#include <string>
#include <unordered_map>
#include <vector>

#include "CFunction.h"
#include "ClassBuilder.h"
#include "ClassMember.h"
#include "Interop.h"
#include "Object.h"
#include "ObjCBridge.h"
#include "SignatureDispatch.h"
#include "TypeConv.h"
#include "ffi/NativeScriptException.h"
#include "v8-api.h"

namespace nativescript {
namespace {

constexpr const char* kNativePointerProperty = "__ns_native_ptr";
constexpr int kNativeWrapperReferenceField = 0;
constexpr int kNativeWrapperMarkerField = 1;
constexpr int kNativeWrapperFieldCount = 2;

#if V8_MAJOR_VERSION >= 14
#define NS_V8_INTERCEPTED v8::Intercepted
#define NS_V8_RETURN_YES return v8::Intercepted::kYes
#define NS_V8_RETURN_NO return v8::Intercepted::kNo
#define NS_V8_SETTER_INFO v8::PropertyCallbackInfo<void>
#else
#define NS_V8_INTERCEPTED void
#define NS_V8_RETURN_YES return
#define NS_V8_RETURN_NO return
#define NS_V8_SETTER_INFO v8::PropertyCallbackInfo<v8::Value>
#endif

struct V8CFunctionBinding {
  ObjCBridgeState* bridgeState = nullptr;
  MDSectionOffset offset = 0;
  CFunction* function = nullptr;
};

id tryReadWrappedReference(napi_env env, v8::Local<v8::Object> object);
bool TryFastConvertV8FoundationObject(napi_env env, id value, v8::Local<v8::Value>* result);
bool TryFastConvertV8NSStringReturnValue(napi_env env, const void* value,
                                         v8::Local<v8::Value>* result);

napi_env envFromHandlerData(v8::Local<v8::Value> data) {
  if (data.IsEmpty() || !data->IsExternal()) {
    return nullptr;
  }

  return static_cast<napi_env>(data.As<v8::External>()->Value());
}

void* nativeWrapperMarker() {
  static uintptr_t marker;
  return &marker;
}

bool isV8NativeWrapperObject(v8::Local<v8::Object> object) {
  return !object.IsEmpty() && object->InternalFieldCount() > kNativeWrapperMarkerField &&
         object->GetAlignedPointerFromInternalField(kNativeWrapperMarkerField) ==
             nativeWrapperMarker();
}

void throwV8Error(v8::Isolate* isolate, const char* message) {
  if (isolate == nullptr) {
    return;
  }

  v8::Local<v8::String> errorMessage;
  if (!v8::String::NewFromUtf8(isolate, message != nullptr ? message : "",
                               v8::NewStringType::kNormal)
           .ToLocal(&errorMessage)) {
    return;
  }

  isolate->ThrowException(v8::Exception::Error(errorMessage));
}

void throwNativeScriptExceptionToV8(napi_env env, v8::Isolate* isolate,
                                    NativeScriptException& exception) {
  if (env == nullptr || isolate == nullptr) {
    return;
  }

  napi_value error = nullptr;
  exception.ReThrowToJS(env, &error);
  if (error != nullptr) {
    isolate->ThrowException(v8impl::V8LocalValueFromJsValue(error));
    return;
  }

  throwV8Error(isolate, exception.Description().c_str());
}

thread_local bool isDefiningNativeWrapperProperty = false;

class NativeWrapperPropertyDefinitionGuard {
 public:
  NativeWrapperPropertyDefinitionGuard() : previous_(isDefiningNativeWrapperProperty) {
    isDefiningNativeWrapperProperty = true;
  }

  ~NativeWrapperPropertyDefinitionGuard() {
    isDefiningNativeWrapperProperty = previous_;
  }

 private:
  bool previous_;
};

bool definePlainValueProperty(v8::Local<v8::Context> context, v8::Local<v8::Object> object,
                              v8::Local<v8::Name> property, v8::Local<v8::Value> value) {
  NativeWrapperPropertyDefinitionGuard guard;
  return object->CreateDataProperty(context, property, value).FromMaybe(false);
}

bool isInternalNativeProperty(v8::Isolate* isolate, v8::Local<v8::Name> property) {
  if (property.IsEmpty() || !property->IsString()) {
    return true;
  }

  v8::String::Utf8Value name(isolate, property);
  if (*name == nullptr) {
    return true;
  }

  return strcmp(*name, "napi_external") == 0 || strcmp(*name, "napi_typetag") == 0 ||
         strcmp(*name, kNativePointerProperty) == 0;
}

NS_V8_INTERCEPTED nativeWrapperNamedSetter(v8::Local<v8::Name> property,
                                           v8::Local<v8::Value> value,
                                           const NS_V8_SETTER_INFO& info) {
  if (isDefiningNativeWrapperProperty) {
    NS_V8_RETURN_NO;
  }

  napi_env env = envFromHandlerData(info.Data());
  v8::Local<v8::Object> holder = info.Holder();

  if (env != nullptr && !isInternalNativeProperty(info.GetIsolate(), property)) {
    id nativeObject = tryReadWrappedReference(env, holder);
    if (nativeObject != nil) {
      transferOwnershipToNative(env, v8impl::JsValueFromV8LocalValue(holder), nativeObject);
    }
  }

  definePlainValueProperty(info.GetIsolate()->GetCurrentContext(), holder, property, value);
  NS_V8_RETURN_YES;
}

NS_V8_INTERCEPTED nativeWrapperIndexedGetter(
    uint32_t index, const v8::PropertyCallbackInfo<v8::Value>& info) {
  napi_env env = envFromHandlerData(info.Data());
  if (env == nullptr) {
    NS_V8_RETURN_NO;
  }

  id nativeObject = tryReadWrappedReference(env, info.Holder());
  if (nativeObject == nil || ![nativeObject isKindOfClass:[NSArray class]]) {
    NS_V8_RETURN_NO;
  }

  @try {
    id value = reinterpret_cast<id (*)(id, SEL, NSUInteger)>(objc_msgSend)(
        nativeObject, @selector(objectAtIndex:), static_cast<NSUInteger>(index));
    if (value == nil) {
      info.GetReturnValue().Set(v8::Null(info.GetIsolate()));
      NS_V8_RETURN_YES;
    }

    v8::Local<v8::Value> fastValue;
    if (TryFastConvertV8FoundationObject(env, value, &fastValue)) {
      info.GetReturnValue().Set(fastValue);
      NS_V8_RETURN_YES;
    }

    ObjCBridgeState* state = ObjCBridgeState::InstanceData(env);
    napi_value result = nullptr;
    if (state != nullptr) {
      result = state->findCachedObjectWrapper(env, value);
      if (result == nullptr) {
        result = state->getObject(env, value, kUnownedObject, 0, nullptr);
      }
    }
    if (result != nullptr) {
      info.GetReturnValue().Set(v8impl::V8LocalValueFromJsValue(result));
      NS_V8_RETURN_YES;
    }
  } @catch (NSException* exception) {
    std::string message = exception.description.UTF8String;
    NativeScriptException nativeScriptException(message);
    throwNativeScriptExceptionToV8(env, info.GetIsolate(), nativeScriptException);
    NS_V8_RETURN_YES;
  }

  NS_V8_RETURN_NO;
}

NS_V8_INTERCEPTED nativeWrapperIndexedSetter(uint32_t index, v8::Local<v8::Value> value,
                                             const NS_V8_SETTER_INFO& info) {
  napi_env env = envFromHandlerData(info.Data());
  if (env == nullptr) {
    NS_V8_RETURN_NO;
  }

  id nativeObject = tryReadWrappedReference(env, info.Holder());
  if (nativeObject == nil ||
      ![nativeObject respondsToSelector:@selector(setObject:atIndexedSubscript:)]) {
    NS_V8_RETURN_NO;
  }

  id nativeValue = nil;
  if (!TryFastConvertV8Argument(env, mdTypeAnyObject, value, &nativeValue)) {
    NS_V8_RETURN_NO;
  }

  @try {
    reinterpret_cast<void (*)(id, SEL, id, NSUInteger)>(objc_msgSend)(
        nativeObject, @selector(setObject:atIndexedSubscript:), nativeValue,
        static_cast<NSUInteger>(index));
    NS_V8_RETURN_YES;
  } @catch (NSException* exception) {
    std::string message = exception.description.UTF8String;
    NativeScriptException nativeScriptException(message);
    throwNativeScriptExceptionToV8(env, info.GetIsolate(), nativeScriptException);
    NS_V8_RETURN_YES;
  }
}

v8::Local<v8::ObjectTemplate> nativeWrapperObjectTemplate(napi_env env) {
  v8::Isolate* isolate = env->isolate;
  static thread_local v8::Persistent<v8::ObjectTemplate> objectTemplate;
  static thread_local v8::Isolate* templateIsolate = nullptr;
  static thread_local napi_env templateEnv = nullptr;

  if (objectTemplate.IsEmpty() || templateIsolate != isolate || templateEnv != env) {
    objectTemplate.Reset();
    templateIsolate = isolate;
    templateEnv = env;
    v8::Local<v8::ObjectTemplate> created = v8::ObjectTemplate::New(isolate);
    created->SetInternalFieldCount(kNativeWrapperFieldCount);
    v8::Local<v8::External> envData = v8::External::New(isolate, env);
    v8::PropertyHandlerFlags namedFlags = static_cast<v8::PropertyHandlerFlags>(
        static_cast<int>(v8::PropertyHandlerFlags::kNonMasking) |
        static_cast<int>(v8::PropertyHandlerFlags::kOnlyInterceptStrings));
    created->SetHandler(v8::NamedPropertyHandlerConfiguration(
        nullptr, nativeWrapperNamedSetter, nullptr, nullptr, nullptr, envData, namedFlags));
    created->SetHandler(v8::IndexedPropertyHandlerConfiguration(
        nativeWrapperIndexedGetter, nativeWrapperIndexedSetter, nullptr, nullptr, nullptr,
        envData));
    objectTemplate.Reset(isolate, created);
  }

  return v8::Local<v8::ObjectTemplate>::New(isolate, objectTemplate);
}

}  // namespace

napi_value CreateV8NativeWrapperObject(napi_env env) {
  if (env == nullptr) {
    return nullptr;
  }

  v8::EscapableHandleScope scope(env->isolate);
  v8::Local<v8::Object> object;
  if (!nativeWrapperObjectTemplate(env)->NewInstance(env->context()).ToLocal(&object)) {
    return nullptr;
  }
  object->SetAlignedPointerInInternalField(kNativeWrapperMarkerField, nativeWrapperMarker());

  return v8impl::JsValueFromV8LocalValue(scope.Escape(object));
}

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

id tryUnwrapV8NativeObject(napi_env env, v8::Local<v8::Value> value);

v8::Local<v8::String> nativePointerPropertyName(v8::Isolate* isolate) {
  static thread_local v8::Persistent<v8::String> name;
  static thread_local v8::Isolate* nameIsolate = nullptr;

  if (name.IsEmpty() || nameIsolate != isolate) {
    name.Reset();
    nameIsolate = isolate;
    name.Reset(isolate, v8::String::NewFromUtf8(isolate, kNativePointerProperty,
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
  if (napi_has_named_property(env, cachedValue, kNativePointerProperty, &hasNativePointer) ==
          napi_ok &&
      hasNativePointer) {
    napi_value nativePointerValue = nullptr;
    if (napi_get_named_property(env, cachedValue, kNativePointerProperty, &nativePointerValue) ==
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
      throwV8Error(env->isolate, "Expected a single-character string.");
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
        *reinterpret_cast<int64_t*>(result) = value.As<v8::BigInt>()->Int64Value(&lossless);
        return true;
      }
      return value->IntegerValue(env->context()).To(reinterpret_cast<int64_t*>(result));

    case mdTypeULong:
    case mdTypeUInt64:
      if (value->IsBigInt()) {
        bool lossless = false;
        *reinterpret_cast<uint64_t*>(result) =
            value.As<v8::BigInt>()->Uint64Value(&lossless);
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

    case mdTypeUShort:
      *result = v8::Integer::NewFromUnsigned(isolate, *reinterpret_cast<const uint16_t*>(value));
      return true;

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

namespace {

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

  napi_value cached = bridgeState->getCachedHandleObject(env, (void*)value);
  if (cached == nullptr) {
    cached = bridgeState->findCachedObjectWrapper(env, value);
  }
  if (cached != nullptr) {
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

}  // namespace

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

namespace {

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

class V8CifArgumentStorage {
 public:
  V8CifArgumentStorage(Cif* cif, unsigned int implicitArgumentCount) {
    if (cif == nullptr || cif->argc == 0) {
      return;
    }

    buffers_.resize(cif->argc, nullptr);

    size_t totalSize = 0;
    for (unsigned int i = 0; i < cif->argc; i++) {
      const size_t storageAlign = getCifArgumentStorageAlign(cif, i, implicitArgumentCount);
      const size_t storageSize = getCifArgumentStorageSize(cif, i, implicitArgumentCount);
      totalSize = alignUpSize(totalSize, storageAlign);
      totalSize += storageSize;
    }

    if (totalSize == 0) {
      totalSize = sizeof(void*);
    }

    storageBase_ = totalSize <= kInlineSize ? inlineBuffer_ : malloc(totalSize);
    if (storageBase_ == nullptr) {
      valid_ = false;
      return;
    }

    memset(storageBase_, 0, totalSize);

    size_t offset = 0;
    for (unsigned int i = 0; i < cif->argc; i++) {
      const size_t storageAlign = getCifArgumentStorageAlign(cif, i, implicitArgumentCount);
      const size_t storageSize = getCifArgumentStorageSize(cif, i, implicitArgumentCount);
      offset = alignUpSize(offset, storageAlign);
      buffers_[i] = static_cast<void*>(static_cast<unsigned char*>(storageBase_) + offset);
      offset += storageSize;
    }
  }

  ~V8CifArgumentStorage() {
    if (storageBase_ != nullptr && storageBase_ != inlineBuffer_) {
      free(storageBase_);
    }
  }

  bool valid() const { return valid_; }

  void* at(unsigned int index) const {
    if (index >= buffers_.size()) {
      return nullptr;
    }
    return buffers_[index];
  }

 private:
  static constexpr size_t kInlineSize = 256;
  alignas(max_align_t) unsigned char inlineBuffer_[kInlineSize];
  void* storageBase_ = nullptr;
  bool valid_ = true;
  std::vector<void*> buffers_;
};

class V8CifReturnStorage {
 public:
  explicit V8CifReturnStorage(Cif* cif) {
    size_ = 0;
    if (cif != nullptr) {
      size_ = cif->rvalueLength;
      if (size_ == 0 && cif->cif.rtype != nullptr) {
        size_ = cif->cif.rtype->size;
      }
    }
    if (size_ == 0) {
      size_ = sizeof(void*);
    }

    data_ = size_ <= kInlineSize ? inlineBuffer_ : malloc(size_);
  }

  ~V8CifReturnStorage() {
    if (data_ != nullptr && data_ != inlineBuffer_) {
      free(data_);
    }
  }

  bool valid() const { return data_ != nullptr; }
  void* get() const { return data_; }

 private:
  static constexpr size_t kInlineSize = 32;
  alignas(max_align_t) unsigned char inlineBuffer_[kInlineSize];
  void* data_ = nullptr;
  size_t size_ = 0;
};

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
  napi_env env_;
  ObjCBridgeState* bridgeState_;
};

inline napi_env envFromCurrentContext(v8::Isolate* isolate) {
  (void)isolate;
  return nullptr;
}

v8::Local<v8::Private> napiPrivateKey(v8::Isolate* isolate) {
  static thread_local v8::Persistent<v8::Private> key;
  static thread_local v8::Isolate* keyIsolate = nullptr;

  if (key.IsEmpty() || keyIsolate != isolate) {
    key.Reset();
    keyIsolate = isolate;
    key.Reset(isolate, v8::Private::ForApi(
                          isolate, v8::String::NewFromUtf8Literal(isolate, "napi_private")));
  }

  return v8::Local<v8::Private>::New(isolate, key);
}

v8::Local<v8::String> prototypePropertyName(v8::Isolate* isolate) {
  static thread_local v8::Persistent<v8::String> name;
  static thread_local v8::Isolate* nameIsolate = nullptr;

  if (name.IsEmpty() || nameIsolate != isolate) {
    name.Reset();
    nameIsolate = isolate;
    name.Reset(isolate, v8::String::NewFromUtf8Literal(isolate, "prototype"));
  }

  return v8::Local<v8::String>::New(isolate, name);
}

id tryReadWrappedReference(napi_env env, v8::Local<v8::Object> object) {
  if (env == nullptr || object.IsEmpty()) {
    return nil;
  }

  if (object->InternalFieldCount() > 0) {
    auto* reference =
        static_cast<v8impl::Reference*>(
            object->GetAlignedPointerFromInternalField(kNativeWrapperReferenceField));
    if (reference != nullptr) {
      return static_cast<id>(reference->Data());
    }
  }

  v8::Local<v8::Value> wrappedReference;
  if (!object->GetPrivate(env->context(), napiPrivateKey(env->isolate)).ToLocal(&wrappedReference) ||
      !wrappedReference->IsExternal()) {
    return nil;
  }

  auto* reference = static_cast<v8impl::Reference*>(wrappedReference.As<v8::External>()->Value());
  return reference != nullptr ? static_cast<id>(reference->Data()) : nil;
}

id tryUnwrapV8NativeObject(napi_env env, v8::Local<v8::Value> value) {
  if (env == nullptr || value.IsEmpty() || !value->IsObject()) {
    return nil;
  }

  v8::Local<v8::Object> object = value.As<v8::Object>();
  if (isV8NativeWrapperObject(object)) {
    id nativeObject = tryReadWrappedReference(env, object);
    if (nativeObject != nil) {
      return nativeObject;
    }
  }

  v8::Local<v8::Context> context = env->context();
  if (object->IsProxy()) {
    v8::Local<v8::Proxy> proxy = object.As<v8::Proxy>();
    v8::Local<v8::Value> target = proxy->GetTarget();
    if (target->IsObject()) {
      id nativeObject = tryReadWrappedReference(env, target.As<v8::Object>());
      if (nativeObject != nil) {
        return nativeObject;
      }
    }
  }

  id nativeObject = tryReadWrappedReference(env, object);
  if (nativeObject != nil) {
    return nativeObject;
  }

  if (object->IsFunction()) {
    v8::MaybeLocal<v8::Value> maybePrototype =
        object->Get(context, prototypePropertyName(env->isolate));
    v8::Local<v8::Value> prototype;
    if (maybePrototype.ToLocal(&prototype) && prototype->IsObject()) {
      object = prototype.As<v8::Object>();
      nativeObject = tryReadWrappedReference(env, object);
      if (nativeObject != nil) {
        return nativeObject;
      }
    }
  }

  return nil;
}

id resolveSelf(napi_env env, v8::Local<v8::Value> jsThisValue, ObjCClassMember* method) {
  id self = nil;
  ObjCBridgeState* state =
      method != nullptr ? method->bridgeState : ObjCBridgeState::InstanceData(env);

  if (!jsThisValue.IsEmpty() && jsThisValue->IsObject()) {
    v8::Local<v8::Object> jsThisObject = jsThisValue.As<v8::Object>();
    if (isV8NativeWrapperObject(jsThisObject)) {
      self = tryReadWrappedReference(env, jsThisObject);
      if (self != nil) {
        return self;
      }
    }
  }

  self = tryUnwrapV8NativeObject(env, jsThisValue);
  if (self != nil) {
    return self;
  }

  napi_value jsThis = v8impl::JsValueFromV8LocalValue(jsThisValue);

  if (state != nullptr && jsThis != nullptr) {
    state->tryResolveBridgedTypeConstructor(env, jsThis, &self);
  }

  if (self == nil && jsThis != nullptr) {
    void* unwrapped = nullptr;
    if (napi_unwrap(env, jsThis, &unwrapped) == napi_ok) {
      self = static_cast<id>(unwrapped);
    }
  }

  if (self == nil && jsThis != nullptr) {
    napi_value nativePointerValue = nullptr;
    if (napi_get_named_property(env, jsThis, kNativePointerProperty, &nativePointerValue) ==
            napi_ok &&
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
  if (method != nullptr && method->cls != nullptr && method->cls->nativeClass != nil) {
    if (method->classMethod) {
      shouldUseClassFallback = true;
    } else if (!jsThisValue.IsEmpty() && jsThisValue->IsFunction()) {
      shouldUseClassFallback = true;
    }
  }

  if (shouldUseClassFallback) {
    return (id)method->cls->nativeClass;
  }

  throwV8Error(env != nullptr ? env->isolate : nullptr,
               "There was no native counterpart to the JavaScript object. Native API was "
               "called with a likely plain object.");
  return nil;
}

bool receiverClassRequiresSuperCall(Class receiverClass);

bool receiverRequiresSuperCall(id self, bool classMethod) {
  if (self == nil) {
    return false;
  }

  Class receiverClass = classMethod ? (Class)self : object_getClass(self);
  return receiverClassRequiresSuperCall(receiverClass);
}

ObjCV8Invoker ensureObjCV8Invoker(Cif* cif, MethodDescriptor* descriptor, uint8_t dispatchFlags) {
  if (cif == nullptr || descriptor == nullptr || cif->signatureHash == 0 ||
      cif->skipGeneratedNapiDispatch) {
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
    descriptor->v8Invoker = reinterpret_cast<void*>(lookupObjCV8Invoker(descriptor->dispatchId));
    descriptor->dispatchLookupCached = true;
  }

  return reinterpret_cast<ObjCV8Invoker>(descriptor->v8Invoker);
}

CFunctionV8Invoker ensureCFunctionV8Invoker(CFunction* function, Cif* cif) {
  if (function == nullptr || cif == nullptr || cif->signatureHash == 0 ||
      cif->skipGeneratedNapiDispatch) {
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
    function->v8Invoker = reinterpret_cast<void*>(lookupCFunctionV8Invoker(function->dispatchId));
    function->dispatchLookupCached = true;
  }

  return reinterpret_cast<CFunctionV8Invoker>(function->v8Invoker);
}

inline bool selectorEndsWith(SEL selector, const char* suffix) {
  if (selector == nullptr || suffix == nullptr) {
    return false;
  }

  const char* selectorName = sel_getName(selector);
  if (selectorName == nullptr) {
    return false;
  }

  size_t selectorLength = strlen(selectorName);
  size_t suffixLength = strlen(suffix);
  if (selectorLength < suffixLength) {
    return false;
  }

  return strcmp(selectorName + selectorLength - suffixLength, suffix) == 0;
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

inline void throwArgumentsCountError(v8::Isolate* isolate, size_t actualCount,
                                     size_t expectedCount) {
  std::string message = "Actual arguments count: \"" + std::to_string(actualCount) +
                        "\". Expected: \"" + std::to_string(expectedCount) + "\".";
  throwV8Error(isolate, message.c_str());
}

bool canConvertV8ValueToType(napi_env env, v8::Local<v8::Value> value,
                             std::shared_ptr<TypeConv> typeConv) {
  if (env == nullptr || typeConv == nullptr || value.IsEmpty()) {
    return false;
  }

  if (value->IsNullOrUndefined()) {
    return true;
  }

  switch (typeConv->kind) {
    case mdTypeBool:
      return value->IsBoolean() || value->IsNumber();

    case mdTypeChar:
    case mdTypeUChar:
      return value->IsBoolean() || value->IsNumber() || value->IsBigInt();

    case mdTypeSShort:
      return value->IsNumber() || value->IsBigInt();

    case mdTypeUShort:
      if (value->IsString()) {
        return value.As<v8::String>()->Length() == 1;
      }
      return value->IsNumber() || value->IsBigInt();

    case mdTypeSInt:
    case mdTypeUInt:
    case mdTypeSLong:
    case mdTypeULong:
    case mdTypeSInt64:
    case mdTypeUInt64:
    case mdTypeFloat:
    case mdTypeDouble:
      return value->IsNumber() || value->IsBigInt();

    case mdTypeString:
      return value->IsString() || value->IsObject();

    case mdTypeAnyObject:
      return value->IsObject() || value->IsFunction() || value->IsString() || value->IsNumber() ||
             value->IsBoolean() || value->IsBigInt();

    case mdTypeClass:
    case mdTypeClassObject:
    case mdTypeProtocolObject:
      return value->IsFunction() || value->IsObject();

    case mdTypeInstanceObject:
      return value->IsObject() || value->IsFunction() || value->IsString() || value->IsNumber() ||
             value->IsBoolean() || value->IsBigInt();

    case mdTypeNSStringObject:
    case mdTypeNSMutableStringObject:
      return value->IsString() || value->IsObject();

    case mdTypeSelector:
      return value->IsString();

    case mdTypePointer:
    case mdTypeOpaquePointer:
      return value->IsObject() || value->IsFunction() || value->IsBigInt() || value->IsString();

    case mdTypeStruct:
      return value->IsObject();

    case mdTypeBlock:
    case mdTypeFunctionPointer:
      return value->IsFunction() || value->IsNullOrUndefined();

    default:
      return false;
  }
}

int scoreV8ValueForType(v8::Local<v8::Value> value, std::shared_ptr<TypeConv> typeConv) {
  if (typeConv == nullptr || value.IsEmpty()) {
    return 0;
  }

  switch (typeConv->kind) {
    case mdTypeBool:
      return value->IsBoolean() ? 2 : 0;
    case mdTypeSInt:
    case mdTypeUInt:
    case mdTypeSLong:
    case mdTypeULong:
    case mdTypeSInt64:
    case mdTypeUInt64:
    case mdTypeFloat:
    case mdTypeDouble:
      return value->IsNumber() || value->IsBigInt() ? 2 : 0;
    case mdTypeString:
    case mdTypeNSStringObject:
    case mdTypeNSMutableStringObject:
      return value->IsString() ? 2 : 0;
    default:
      return 1;
  }
}

Cif* resolveMethodDescriptorCif(napi_env env, ObjCClassMember* method,
                                MethodDescriptor* descriptor, Cif** cacheSlot,
                                bool receiverIsClass, Class receiverClass) {
  if (env == nullptr || method == nullptr || descriptor == nullptr || cacheSlot == nullptr) {
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
    resolved = method->bridgeState->getMethodCif(env, runtimeMethod);
  }
  if (resolved == nullptr) {
    resolved = method->bridgeState->getMethodCif(env, descriptor->signatureOffset);
  }

  *cacheSlot = resolved;
  return resolved;
}

bool selectV8MethodOverload(napi_env env, const v8::FunctionCallbackInfo<v8::Value>& info,
                            ObjCClassMember* method, id self, MethodDescriptor** selectedMethod,
                            Cif** selectedCif) {
  if (env == nullptr || method == nullptr || self == nil || selectedMethod == nullptr ||
      selectedCif == nullptr) {
    return false;
  }

  *selectedMethod = &method->methodOrGetter;

  if (method->overloads.empty() && method->cif != nullptr) {
    *selectedCif = method->cif;
    return true;
  }

  const bool receiverIsClass = object_isClass(self);
  Class receiverClass = receiverIsClass ? (Class)self : object_getClass(self);
  *selectedCif = resolveMethodDescriptorCif(env, method, &method->methodOrGetter, &method->cif,
                                            receiverIsClass, receiverClass);

  if (method->overloads.empty()) {
    return *selectedCif != nullptr;
  }

  struct Candidate {
    MethodDescriptor* descriptor;
    Cif* cif;
    int score;
  };

  std::vector<Candidate> candidates;
  const size_t actualArgc = static_cast<size_t>(info.Length());
  auto tryAddCandidate = [&](MethodDescriptor* descriptor, Cif* cif) {
    if (descriptor == nullptr || cif == nullptr || cif->argc != actualArgc) {
      return;
    }

    int score = 0;
    for (size_t i = 0; i < actualArgc; i++) {
      if (!canConvertV8ValueToType(env, info[static_cast<int>(i)], cif->argTypes[i])) {
        return;
      }
      score += scoreV8ValueForType(info[static_cast<int>(i)], cif->argTypes[i]);
    }

    candidates.push_back(Candidate{descriptor, cif, score});
  };

  tryAddCandidate(&method->methodOrGetter, *selectedCif);
  for (auto& overload : method->overloads) {
    Cif* overloadCif =
        resolveMethodDescriptorCif(env, method, &overload.method, &overload.cif, receiverIsClass,
                                   receiverClass);
    tryAddCandidate(&overload.method, overloadCif);
  }

  if (!candidates.empty()) {
    Candidate* best = &candidates[0];
    for (auto& candidate : candidates) {
      if (candidate.score > best->score) {
        best = &candidate;
      }
    }
    *selectedMethod = best->descriptor;
    *selectedCif = best->cif;
  }

  return *selectedCif != nullptr;
}

bool receiverClassRequiresSuperCall(Class receiverClass) {
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

  bool requiresSuperCall =
      class_conformsToProtocol(receiverClass, @protocol(ObjCBridgeClassBuilderProtocol));
  superCallCache.emplace(receiverClass, requiresSuperCall);
  lastReceiverClass = receiverClass;
  lastRequiresSuperCall = requiresSuperCall;
  return requiresSuperCall;
}

bool invokeObjCPreparedOrFfi(napi_env env, Cif* cif, id self, bool classMethod,
                             MethodDescriptor* descriptor, uint8_t dispatchFlags, void** avalues,
                             void* rvalue) {
  if (cif == nullptr || descriptor == nullptr) {
    return false;
  }

  Class receiverClass = classMethod ? (Class)self : object_getClass(self);
  const bool supercall = receiverClassRequiresSuperCall(receiverClass);
  if (supercall && classMethod) {
    ObjCBridgeState* state = ObjCBridgeState::InstanceData(env);
    ClassBuilder* builder =
        state != nullptr ? static_cast<ClassBuilder*>(state->classesByPointer[self]) : nullptr;
    if (builder != nullptr && !builder->isFinal) {
      builder->build();
    }
  }

#if defined(__x86_64__)
  bool isStret = cif->returnType->type->size > 16 && cif->returnType->type->type == FFI_TYPE_STRUCT;
#endif

  @try {
    if (!supercall) {
      auto invoker = ensureObjCV8Invoker(cif, descriptor, dispatchFlags);
      auto preparedInvoker =
          descriptor != nullptr ? reinterpret_cast<ObjCPreparedInvoker>(descriptor->preparedInvoker)
                                : nullptr;
      if (preparedInvoker != nullptr) {
        preparedInvoker((void*)objc_msgSend, avalues, rvalue);
        return true;
      }

#if defined(__x86_64__)
      ffi_call(&cif->cif, isStret ? FFI_FN(objc_msgSend_stret) : FFI_FN(objc_msgSend), rvalue,
               avalues);
#else
      ffi_call(&cif->cif, FFI_FN(objc_msgSend), rvalue, avalues);
#endif
      (void)invoker;
    } else {
      Class superClass = classMethod ? class_getSuperclass(object_getClass((id)receiverClass))
                                     : class_getSuperclass(receiverClass);
      struct objc_super superobj = {self, superClass};
      auto superobjPtr = &superobj;
      avalues[0] = (void*)&superobjPtr;
#if defined(__x86_64__)
      ffi_call(&cif->cif, isStret ? FFI_FN(objc_msgSendSuper_stret) : FFI_FN(objc_msgSendSuper),
               rvalue, avalues);
#else
      ffi_call(&cif->cif, FFI_FN(objc_msgSendSuper), rvalue, avalues);
#endif
    }
  } @catch (NSException* exception) {
    std::string message = exception.description.UTF8String;
    NativeScriptException nativeScriptException(message);
    throwNativeScriptExceptionToV8(env, env != nullptr ? env->isolate : nullptr,
                                  nativeScriptException);
    return false;
  }

  return true;
}

void setObjCReturnValue(napi_env env, const v8::FunctionCallbackInfo<v8::Value>& info,
                        ObjCClassMember* method, MethodDescriptor* descriptor, Cif* cif, id self,
                        bool receiverIsClass, void* rvalue, bool propertyAccess) {
  if (cif == nullptr || method == nullptr || descriptor == nullptr) {
    return;
  }

  if (cif->returnType->kind == mdTypeVoid) {
    info.GetReturnValue().Set(v8::Undefined(info.GetIsolate()));
    return;
  }

  v8::Local<v8::Value> fastResult;
  if (TryFastConvertV8ReturnValue(env, cif->returnType->kind, rvalue, &fastResult)) {
    info.GetReturnValue().Set(fastResult);
    return;
  }

  if (cif->returnType->kind == mdTypeNSStringObject &&
      TryFastConvertV8NSStringReturnValue(env, rvalue, &fastResult)) {
    info.GetReturnValue().Set(fastResult);
    return;
  }

  napi_value jsThis = v8impl::JsValueFromV8LocalValue(info.This());
  const char* selectorName = sel_getName(descriptor->selector);
  if (selectorName != nullptr && strcmp(selectorName, "class") == 0) {
    if (!propertyAccess && !receiverIsClass) {
      napi_value constructor = jsThis;
      napi_get_named_property(env, jsThis, "constructor", &constructor);
      info.GetReturnValue().Set(v8impl::V8LocalValueFromJsValue(constructor));
      return;
    }

    id classObject = receiverIsClass ? self : (id)object_getClass(self);
    napi_value result =
        method->bridgeState->getObject(env, classObject, kUnownedObject, 0, nullptr);
    info.GetReturnValue().Set(v8impl::V8LocalValueFromJsValue(result));
    return;
  }

  if (cif->returnType->kind == mdTypeInstanceObject) {
    napi_value constructor = jsThis;
    if (!receiverIsClass) {
      napi_get_named_property(env, jsThis, "constructor", &constructor);
    }
    id obj = *((id*)rvalue);
    if (obj != nil) {
      ObjCBridgeState* state = ObjCBridgeState::InstanceData(env);
      if (state != nullptr) {
        napi_value cached = state->getCachedHandleObject(env, (void*)obj);
        if (cached == nullptr) {
          cached = state->findCachedObjectWrapper(env, obj);
        }
        if (cached != nullptr) {
          info.GetReturnValue().Set(v8impl::V8LocalValueFromJsValue(cached));
          return;
        }
      }
    }
    napi_value result = method->bridgeState->getObject(
        env, obj, constructor, method->returnOwned ? kOwnedObject : kUnownedObject);
    info.GetReturnValue().Set(v8impl::V8LocalValueFromJsValue(result));
    return;
  }

  if (cif->returnType->kind == mdTypeAnyObject && receiverIsClass) {
    id obj = *((id*)rvalue);
    Class receiverClass = (Class)self;
    if (obj != nil &&
        (receiverClass == [NSString class] || receiverClass == [NSMutableString class]) &&
        selectorName != nullptr &&
        (strcmp(selectorName, "string") == 0 || strcmp(selectorName, "stringWithString:") == 0 ||
         strcmp(selectorName, "stringWithCapacity:") == 0)) {
      napi_value result = method->bridgeState->getObject(env, obj, jsThis, kUnownedObject);
      info.GetReturnValue().Set(v8impl::V8LocalValueFromJsValue(result));
      return;
    }
  }

  if (cif->returnType->kind == mdTypeAnyObject ||
      cif->returnType->kind == mdTypeInstanceObject ||
      cif->returnType->kind == mdTypeProtocolObject ||
      cif->returnType->kind == mdTypeClassObject) {
    id obj = *((id*)rvalue);
    if (obj != nil && ![obj isKindOfClass:[NSString class]] &&
        ![obj isKindOfClass:[NSNumber class]] && ![obj isKindOfClass:[NSNull class]]) {
      ObjCBridgeState* state = ObjCBridgeState::InstanceData(env);
      if (state != nullptr) {
        napi_value cached = state->getCachedHandleObject(env, (void*)obj);
        if (cached == nullptr) {
          cached = state->findCachedObjectWrapper(env, obj);
        }
        if (cached != nullptr) {
          info.GetReturnValue().Set(v8impl::V8LocalValueFromJsValue(cached));
          return;
        }
      }
    }
  }

  napi_value result = cif->returnType->toJS(env, rvalue, method->returnOwned ? kReturnOwned : 0);
  info.GetReturnValue().Set(v8impl::V8LocalValueFromJsValue(result));
}

bool invokeObjCSlow(napi_env env, const v8::FunctionCallbackInfo<v8::Value>& info,
                    ObjCClassMember* method, MethodDescriptor* descriptor, Cif* cif, id self,
                    bool receiverIsClass, bool propertyAccess) {
  V8CifReturnStorage rvalueStorage(cif);
  if (!rvalueStorage.valid()) {
    throwV8Error(info.GetIsolate(),
                 "Unable to allocate return value storage for Objective-C call.");
    return false;
  }

  V8CifArgumentStorage argStorage(cif, 2);
  if (!argStorage.valid()) {
    throwV8Error(info.GetIsolate(),
                 "Unable to allocate argument storage for Objective-C call.");
    return false;
  }

  void* avalues[cif->cif.nargs];
  avalues[0] = (void*)&self;
  avalues[1] = (void*)&descriptor->selector;

  const size_t actualArgc = static_cast<size_t>(info.Length());
  const bool hasImplicitNSErrorOutArg =
      !cif->isVariadic && isNSErrorOutMethodSignature(descriptor, cif) &&
      actualArgc + 1 == cif->argc;
  NSError* implicitNSError = nil;

  bool shouldFreeAny = false;
  bool shouldFree[cif->argc];
  v8::Local<v8::Value> undefinedValue = v8::Undefined(info.GetIsolate());

  for (unsigned int i = 0; i < cif->argc; i++) {
    shouldFree[i] = false;
    avalues[i + 2] = argStorage.at(i);
    if (hasImplicitNSErrorOutArg && i == cif->argc - 1) {
      NSError** implicitNSErrorOutArg = &implicitNSError;
      *reinterpret_cast<void**>(avalues[i + 2]) = implicitNSErrorOutArg;
      continue;
    }

    v8::Local<v8::Value> argValue = i < actualArgc ? info[i] : undefinedValue;
    if (!TryFastConvertV8Argument(env, cif->argTypes[i]->kind, argValue, avalues[i + 2])) {
      cif->argTypes[i]->toNative(env, v8impl::JsValueFromV8LocalValue(argValue), avalues[i + 2],
                                 &shouldFree[i], &shouldFreeAny);
    }
  }

  void* rvalue = rvalueStorage.get();
  const bool didInvoke = invokeObjCPreparedOrFfi(env, cif, self, receiverIsClass, descriptor,
                                                 descriptor->dispatchFlags, avalues, rvalue);

  if (shouldFreeAny) {
    for (unsigned int i = 0; i < cif->argc; i++) {
      if (shouldFree[i]) {
        cif->argTypes[i]->free(env, *((void**)avalues[i + 2]));
      }
    }
  }

  if (!didInvoke) {
    return false;
  }

  if (hasImplicitNSErrorOutArg && implicitNSError != nil) {
    const char* errorMessage = [[implicitNSError description] UTF8String];
    NativeScriptException nativeScriptException(errorMessage != nullptr ? errorMessage
                                                                        : "Unknown NSError");
    throwNativeScriptExceptionToV8(env, info.GetIsolate(), nativeScriptException);
    return false;
  }

  setObjCReturnValue(env, info, method, descriptor, cif, self, receiverIsClass, rvalue,
                     propertyAccess);
  return true;
}

bool invokeObjCFast(napi_env env, const v8::FunctionCallbackInfo<v8::Value>& info,
                    ObjCClassMember* method, MethodDescriptor* descriptor, Cif* cif, id self,
                    bool propertyAccess) {
  if (env == nullptr || method == nullptr || descriptor == nullptr || cif == nullptr) {
    return false;
  }

  const bool receiverIsClass = object_isClass(self);
  Class receiverClass = receiverIsClass ? (Class)self : object_getClass(self);
  const bool requiresSuperCall = receiverClassRequiresSuperCall(receiverClass);
  const size_t actualArgc = static_cast<size_t>(info.Length());
  const bool isNSErrorOutMethod = isNSErrorOutMethodSignature(descriptor, cif);
  if (!cif->isVariadic && isNSErrorOutMethod) {
    if (actualArgc > cif->argc || actualArgc + 1 < cif->argc) {
      throwArgumentsCountError(info.GetIsolate(), actualArgc, cif->argc);
      return false;
    }
  }
  const bool hasImplicitNSErrorOutArg =
      isNSErrorOutMethod && !cif->isVariadic && actualArgc + 1 == cif->argc;
  const bool canUseGeneratedDispatch = !isNSErrorOutMethod && !requiresSuperCall;
  ObjCV8Invoker invoker =
      canUseGeneratedDispatch ? ensureObjCV8Invoker(cif, descriptor, descriptor->dispatchFlags)
                              : nullptr;
  if (invoker == nullptr) {
    return invokeObjCSlow(env, info, method, descriptor, cif, self, receiverIsClass,
                          propertyAccess);
  }

  const bool generatedDispatchSetsReturnDirectly =
      cif->generatedDispatchSetsV8ReturnDirectly;
  const bool generatedDispatchUsesObjectReturnStorage =
      !generatedDispatchSetsReturnDirectly && cif->generatedDispatchUsesObjectReturnStorage;
  const bool needsRoundTripCache =
      generatedDispatchUsesObjectReturnStorage &&
      cif->generatedDispatchHasRoundTripCacheArgument;
  std::optional<RoundTripCacheFrameGuard> roundTripCacheFrame;
  if (needsRoundTripCache) {
    roundTripCacheFrame.emplace(env, method->bridgeState);
  }

  std::optional<V8CifReturnStorage> rvalueStorage;
  id objectRvalue = nil;
  void* rvalue = nullptr;
  if (generatedDispatchUsesObjectReturnStorage) {
    rvalue = &objectRvalue;
  } else if (!generatedDispatchSetsReturnDirectly) {
    rvalueStorage.emplace(cif);
    if (!rvalueStorage->valid()) {
      throwV8Error(info.GetIsolate(),
                   "Unable to allocate return value storage for Objective-C call.");
      return false;
    }
    rvalue = rvalueStorage->get();
  }

  bool didInvoke = false;
  bool didSetReturnValue = false;
  @try {
    didInvoke = invoker(env, cif, (void*)objc_msgSend, self, descriptor->selector,
                        method->bridgeState, method->returnOwned, receiverIsClass,
                        propertyAccess, info, rvalue, &didSetReturnValue);
  } @catch (NSException* exception) {
    std::string message = exception.description.UTF8String;
    NativeScriptException nativeScriptException(message);
    throwNativeScriptExceptionToV8(env, info.GetIsolate(), nativeScriptException);
    return false;
  }

  if (!didInvoke) {
    return invokeObjCSlow(env, info, method, descriptor, cif, self, receiverIsClass,
                          propertyAccess);
  }

  if (!didSetReturnValue) {
    setObjCReturnValue(env, info, method, descriptor, cif, self, receiverIsClass, rvalue,
                       propertyAccess);
  }
  return true;
}

void v8ObjCMethodCallback(const v8::FunctionCallbackInfo<v8::Value>& info) {
  auto* method = static_cast<ObjCClassMember*>(info.Data().As<v8::External>()->Value());
  napi_env env = method != nullptr && method->bridgeState != nullptr
                     ? method->bridgeState->env
                     : envFromCurrentContext(info.GetIsolate());
  if (env == nullptr || method == nullptr) {
    return;
  }

  id self = resolveSelf(env, info.This(), method);
  if (self == nil) {
    return;
  }

  MethodDescriptor* descriptor = nullptr;
  Cif* cif = nullptr;
  if (!selectV8MethodOverload(env, info, method, self, &descriptor, &cif)) {
    throwV8Error(info.GetIsolate(), "Unable to resolve native call signature.");
    return;
  }

  invokeObjCFast(env, info, method, descriptor, cif, self, false);
}

void v8ObjCGetterCallback(const v8::FunctionCallbackInfo<v8::Value>& info) {
  auto* method = static_cast<ObjCClassMember*>(info.Data().As<v8::External>()->Value());
  napi_env env = method != nullptr && method->bridgeState != nullptr
                     ? method->bridgeState->env
                     : envFromCurrentContext(info.GetIsolate());
  if (env == nullptr || method == nullptr) {
    return;
  }

  id self = resolveSelf(env, info.This(), method);
  if (self == nil) {
    return;
  }

  Cif* cif = method->cif;
  if (cif == nullptr) {
    cif = method->cif =
        method->bridgeState->getMethodCif(env, method->methodOrGetter.signatureOffset);
  }

  invokeObjCFast(env, info, method, &method->methodOrGetter, cif, self, true);
}

void v8ObjCSetterCallback(const v8::FunctionCallbackInfo<v8::Value>& info) {
  auto* method = static_cast<ObjCClassMember*>(info.Data().As<v8::External>()->Value());
  napi_env env = method != nullptr && method->bridgeState != nullptr
                     ? method->bridgeState->env
                     : envFromCurrentContext(info.GetIsolate());
  if (env == nullptr || method == nullptr) {
    return;
  }

  id self = resolveSelf(env, info.This(), method);
  if (self == nil) {
    return;
  }

  Cif* cif = method->setterCif;
  if (cif == nullptr) {
    cif = method->setterCif =
        method->bridgeState->getMethodCif(env, method->setter.signatureOffset);
  }

  invokeObjCFast(env, info, method, &method->setter, cif, self, true);
}

void v8ReadOnlySetterCallback(const v8::FunctionCallbackInfo<v8::Value>& info) {
  auto* method = info.Data().IsEmpty()
                     ? nullptr
                     : static_cast<ObjCClassMember*>(info.Data().As<v8::External>()->Value());
  napi_env env = method != nullptr && method->bridgeState != nullptr
                     ? method->bridgeState->env
                     : envFromCurrentContext(info.GetIsolate());
  throwV8Error(info.GetIsolate(), "Attempted to assign to readonly property.");
}

void setCFunctionReturnValue(napi_env env, const v8::FunctionCallbackInfo<v8::Value>& info,
                             CFunction* function, Cif* cif, void* rvalue) {
  if (cif == nullptr) {
    return;
  }

  if (cif->returnType->kind == mdTypeVoid) {
    info.GetReturnValue().Set(v8::Undefined(info.GetIsolate()));
    return;
  }

  v8::Local<v8::Value> fastResult;
  if (TryFastConvertV8ReturnValue(env, cif->returnType->kind, rvalue, &fastResult)) {
    info.GetReturnValue().Set(fastResult);
    return;
  }

  if (cif->returnType->kind == mdTypeNSStringObject &&
      TryFastConvertV8NSStringReturnValue(env, rvalue, &fastResult)) {
    info.GetReturnValue().Set(fastResult);
    return;
  }

  uint32_t toJSFlags = kCStringAsReference;
  if (function != nullptr && (function->dispatchFlags & 1) != 0) {
    toJSFlags |= kReturnOwned;
  }

  napi_value result = cif->returnType->toJS(env, rvalue, toJSFlags);
  info.GetReturnValue().Set(v8impl::V8LocalValueFromJsValue(result));
}

bool invokeCFunctionSlow(napi_env env, const v8::FunctionCallbackInfo<v8::Value>& info,
                         CFunction* function, Cif* cif) {
  if (function == nullptr || cif == nullptr) {
    return false;
  }

  void* avalues[cif->argc];
  bool shouldFreeAny = false;
  bool shouldFree[cif->argc];
  v8::Local<v8::Value> undefinedValue = v8::Undefined(info.GetIsolate());

  for (unsigned int i = 0; i < cif->argc; i++) {
    shouldFree[i] = false;
    avalues[i] = cif->avalues[i];
    v8::Local<v8::Value> argValue =
        i < static_cast<unsigned int>(info.Length()) ? info[i] : undefinedValue;
    if (!TryFastConvertV8Argument(env, cif->argTypes[i]->kind, argValue, avalues[i])) {
      cif->argTypes[i]->toNative(env, v8impl::JsValueFromV8LocalValue(argValue), avalues[i],
                                 &shouldFree[i], &shouldFreeAny);
    }
  }

  auto preparedInvoker = reinterpret_cast<CFunctionPreparedInvoker>(function->preparedInvoker);

  @try {
    if (preparedInvoker != nullptr) {
      preparedInvoker(function->fnptr, avalues, cif->rvalue);
    } else {
      ffi_call(&cif->cif, FFI_FN(function->fnptr), cif->rvalue, avalues);
    }
  } @catch (NSException* exception) {
    std::string message = exception.description.UTF8String;
    NativeScriptException nativeScriptException(message);
    throwNativeScriptExceptionToV8(env, info.GetIsolate(), nativeScriptException);
    return false;
  }

  if (shouldFreeAny) {
    void* returnPointerValue = nullptr;
    const bool returnIsPointer =
        cif->returnType != nullptr && cif->returnType->type == &ffi_type_pointer;
    if (returnIsPointer && cif->rvalue != nullptr) {
      returnPointerValue = *((void**)cif->rvalue);
    }

    for (unsigned int i = 0; i < cif->argc; i++) {
      if (shouldFree[i]) {
        if (returnPointerValue != nullptr && avalues[i] != nullptr) {
          void* argPointerValue = *((void**)avalues[i]);
          if (argPointerValue == returnPointerValue) {
            continue;
          }
        }
        cif->argTypes[i]->free(env, *((void**)avalues[i]));
      }
    }
  }

  setCFunctionReturnValue(env, info, function, cif, cif->rvalue);
  return true;
}

void v8CFunctionCallback(const v8::FunctionCallbackInfo<v8::Value>& info) {
  auto* binding = info.Data().IsEmpty()
                      ? nullptr
                      : static_cast<V8CFunctionBinding*>(info.Data().As<v8::External>()->Value());
  ObjCBridgeState* bridgeState = binding != nullptr ? binding->bridgeState : nullptr;
  napi_env env = bridgeState != nullptr ? bridgeState->env : envFromCurrentContext(info.GetIsolate());
  CFunction* function = binding != nullptr ? binding->function : nullptr;
  if (function == nullptr && bridgeState != nullptr && binding != nullptr) {
    function = bridgeState->getCFunction(env, binding->offset);
    binding->function = function;
  }
  if (env == nullptr || function == nullptr) {
    return;
  }

  Cif* cif = function != nullptr ? function->cif : nullptr;
  CFunctionV8Invoker invoker = ensureCFunctionV8Invoker(function, cif);

  bool didInvoke = false;
  bool didSetReturnValue = false;
  if (invoker != nullptr) {
    @try {
      didInvoke = invoker(env, cif, function->fnptr, info, cif->rvalue, &didSetReturnValue);
    } @catch (NSException* exception) {
      std::string message = exception.description.UTF8String;
      NativeScriptException nativeScriptException(message);
      throwNativeScriptExceptionToV8(env, info.GetIsolate(), nativeScriptException);
      return;
    }
  }

  if (!didInvoke) {
    invokeCFunctionSlow(env, info, function, cif);
    return;
  }

  if (!didSetReturnValue) {
    setCFunctionReturnValue(env, info, function, cif, cif->rvalue);
  }
}

bool isCompatLibdispatchFunction(ObjCBridgeState* bridgeState, MDSectionOffset offset) {
  if (bridgeState == nullptr) {
    return false;
  }

  const char* name = bridgeState->metadata->getString(offset);
  return strcmp(name, "dispatch_async") == 0 || strcmp(name, "dispatch_get_current_queue") == 0 ||
         strcmp(name, "dispatch_get_global_queue") == 0 || strcmp(name, "UIApplicationMain") == 0 ||
         strcmp(name, "NSApplicationMain") == 0;
}

bool defineV8FunctionProperty(napi_env env, v8::Local<v8::Object> object,
                              v8::Local<v8::Name> propertyName, v8::Local<v8::Function> function,
                              napi_property_attributes attributes) {
  v8::PropertyDescriptor descriptor(function, (attributes & napi_writable) != 0);
  descriptor.set_enumerable((attributes & napi_enumerable) != 0);
  descriptor.set_configurable((attributes & napi_configurable) != 0);

  return object->DefineProperty(env->context(), propertyName, descriptor).FromMaybe(false);
}

bool defineV8AccessorProperty(napi_env env, v8::Local<v8::Object> object,
                              v8::Local<v8::Name> propertyName, v8::Local<v8::Function> getter,
                              v8::Local<v8::Function> setter, napi_property_attributes attributes) {
  v8::PropertyDescriptor descriptor(getter, setter);
  descriptor.set_enumerable((attributes & napi_enumerable) != 0);
  descriptor.set_configurable((attributes & napi_configurable) != 0);

  return object->DefineProperty(env->context(), propertyName, descriptor).FromMaybe(false);
}

}  // namespace

bool V8TryDefineFastNativeProperty(napi_env env, v8::Local<v8::Object> object,
                                   v8::Local<v8::Name> propertyName,
                                   const napi_property_descriptor* descriptor) {
#if !NS_GSD_BACKEND_V8
  return false;
#else
  if (env == nullptr || descriptor == nullptr) {
    return false;
  }

  v8::Local<v8::Context> context = env->context();

  if (descriptor->method == ObjCClassMember::jsCall) {
    auto* method = static_cast<ObjCClassMember*>(descriptor->data);
    if (method == nullptr || !method->overloads.empty()) {
      return false;
    }

    Cif* cif = method->cif;
    if (cif == nullptr) {
      cif = method->cif =
          method->bridgeState->getMethodCif(env, method->methodOrGetter.signatureOffset);
    }

    v8::Local<v8::Function> function;
    if (!v8::Function::New(context, v8ObjCMethodCallback, v8::External::New(env->isolate, method))
             .ToLocal(&function)) {
      return false;
    }

    return defineV8FunctionProperty(env, object, propertyName, function, descriptor->attributes);
  }

  if (descriptor->method == CFunction::jsCall) {
    auto offset = static_cast<MDSectionOffset>(reinterpret_cast<uintptr_t>(descriptor->data));
    ObjCBridgeState* bridgeState = ObjCBridgeState::InstanceData(env);
    if (isCompatLibdispatchFunction(bridgeState, offset)) {
      return false;
    }

    if (bridgeState == nullptr) {
      return false;
    }

    auto* binding = new V8CFunctionBinding{bridgeState, offset, nullptr};
    v8::Local<v8::Function> functionValue;
    if (!v8::Function::New(context, v8CFunctionCallback, v8::External::New(env->isolate, binding))
             .ToLocal(&functionValue)) {
      delete binding;
      return false;
    }

    return defineV8FunctionProperty(env, object, propertyName, functionValue,
                                    descriptor->attributes);
  }

  if (descriptor->getter == ObjCClassMember::jsGetter && descriptor->data != nullptr) {
    auto* method = static_cast<ObjCClassMember*>(descriptor->data);
    Cif* getterCif = method->cif;
    if (getterCif == nullptr) {
      getterCif = method->cif =
          method->bridgeState->getMethodCif(env, method->methodOrGetter.signatureOffset);
    }

    v8::Local<v8::Function> getter;
    if (!v8::Function::New(context, v8ObjCGetterCallback, v8::External::New(env->isolate, method))
             .ToLocal(&getter)) {
      return false;
    }

    v8::Local<v8::Function> setter;
    if (descriptor->setter == ObjCClassMember::jsReadOnlySetter) {
      if (!v8::Function::New(context, v8ReadOnlySetterCallback,
                             v8::External::New(env->isolate, method))
               .ToLocal(&setter)) {
        return false;
      }
    } else if (descriptor->setter == ObjCClassMember::jsSetter) {
      Cif* setterCif = method->setterCif;
      if (setterCif == nullptr) {
        setterCif = method->setterCif =
            method->bridgeState->getMethodCif(env, method->setter.signatureOffset);
      }
      if (!v8::Function::New(context, v8ObjCSetterCallback, v8::External::New(env->isolate, method))
               .ToLocal(&setter)) {
        return false;
      }
    } else if (descriptor->setter != nullptr) {
      return false;
    }

    return defineV8AccessorProperty(env, object, propertyName, getter, setter,
                                    descriptor->attributes);
  }

  return false;
#endif
}

}  // namespace nativescript

#undef NS_V8_INTERCEPTED
#undef NS_V8_RETURN_YES
#undef NS_V8_RETURN_NO
#undef NS_V8_SETTER_INFO

#endif  // TARGET_ENGINE_V8

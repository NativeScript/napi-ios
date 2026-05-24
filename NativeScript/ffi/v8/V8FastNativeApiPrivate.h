#ifndef NS_V8_FAST_NATIVE_API_PRIVATE_H
#define NS_V8_FAST_NATIVE_API_PRIVATE_H

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

#include "ffi/napi/CFunction.h"
#include "ffi/napi/ClassBuilder.h"
#include "ffi/napi/ClassMember.h"
#include "ffi/napi/Interop.h"
#include "InvocationSupport.h"
#include "ffi/napi/Object.h"
#include "ffi/napi/ObjCBridge.h"
#include "SignatureDispatch.h"
#include "ffi/napi/TypeConv.h"
#include "ffi/napi/NativeScriptException.h"
#include "v8-api.h"

namespace nativescript {

inline constexpr const char* kV8NativePointerProperty = "__ns_native_ptr";
inline constexpr int kV8NativeWrapperReferenceField = 0;
inline constexpr int kV8NativeWrapperMarkerField = 1;
inline constexpr int kV8NativeWrapperFieldCount = 2;

struct V8CFunctionBinding {
  ObjCBridgeState* bridgeState = nullptr;
  MDSectionOffset offset = 0;
  CFunction* function = nullptr;
};

bool TryFastConvertV8FoundationObject(napi_env env, id value,
                                      v8::Local<v8::Value>* result);
bool TryFastConvertV8NSStringReturnValue(napi_env env, const void* value,
                                         v8::Local<v8::Value>* result);

inline void* nativeWrapperMarker() {
  static uintptr_t marker;
  return &marker;
}

inline bool isV8NativeWrapperObject(v8::Local<v8::Object> object) {
  return !object.IsEmpty() &&
         object->InternalFieldCount() > kV8NativeWrapperMarkerField &&
         object->GetAlignedPointerFromInternalField(
             kV8NativeWrapperMarkerField) == nativeWrapperMarker();
}

inline void throwV8Error(v8::Isolate* isolate, const char* message) {
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

inline void throwNativeScriptExceptionToV8(napi_env env, v8::Isolate* isolate,
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

inline v8::Local<v8::Private> napiPrivateKey(v8::Isolate* isolate) {
  static thread_local v8::Persistent<v8::Private> key;
  static thread_local v8::Isolate* keyIsolate = nullptr;

  if (key.IsEmpty() || keyIsolate != isolate) {
    key.Reset();
    keyIsolate = isolate;
    key.Reset(isolate, v8::Private::ForApi(
                          isolate, v8::String::NewFromUtf8Literal(
                                       isolate, "napi_private")));
  }

  return v8::Local<v8::Private>::New(isolate, key);
}

inline v8::Local<v8::String> prototypePropertyName(v8::Isolate* isolate) {
  static thread_local v8::Persistent<v8::String> name;
  static thread_local v8::Isolate* nameIsolate = nullptr;

  if (name.IsEmpty() || nameIsolate != isolate) {
    name.Reset();
    nameIsolate = isolate;
    name.Reset(isolate, v8::String::NewFromUtf8Literal(isolate, "prototype"));
  }

  return v8::Local<v8::String>::New(isolate, name);
}

inline id tryReadWrappedReference(napi_env env,
                                  v8::Local<v8::Object> object) {
  if (env == nullptr || object.IsEmpty()) {
    return nil;
  }

  if (object->InternalFieldCount() > kV8NativeWrapperReferenceField) {
    auto* reference = static_cast<v8impl::Reference*>(
        object->GetAlignedPointerFromInternalField(
            kV8NativeWrapperReferenceField));
    if (reference != nullptr) {
      return static_cast<id>(reference->Data());
    }
  }

  v8::Local<v8::Value> wrappedReference;
  if (!object->GetPrivate(env->context(), napiPrivateKey(env->isolate))
           .ToLocal(&wrappedReference) ||
      wrappedReference.IsEmpty() || !wrappedReference->IsExternal()) {
    return nil;
  }

  auto* reference = static_cast<v8impl::Reference*>(
      wrappedReference.As<v8::External>()->Value());
  return reference != nullptr ? static_cast<id>(reference->Data()) : nil;
}

inline id tryUnwrapV8NativeObject(napi_env env,
                                  v8::Local<v8::Value> value) {
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

  if (value->IsFunction()) {
    v8::MaybeLocal<v8::Value> maybePrototype =
        object->Get(context, prototypePropertyName(env->isolate));
    v8::Local<v8::Value> prototype;
    if (maybePrototype.ToLocal(&prototype) &&
        prototype->IsObject()) {
      object = prototype.As<v8::Object>();
      nativeObject = tryReadWrappedReference(env, object);
      if (nativeObject != nil) {
        return nativeObject;
      }
    }
  }

  return nil;
}

}  // namespace nativescript

#endif  // TARGET_ENGINE_V8

#endif  // NS_V8_FAST_NATIVE_API_PRIVATE_H

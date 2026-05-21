#ifndef V8_FAST_NATIVE_API_H
#define V8_FAST_NATIVE_API_H

#ifdef TARGET_ENGINE_V8

#include <v8.h>

#include "js_native_api.h"

namespace nativescript {

napi_value CreateV8NativeWrapperObject(napi_env env);

bool V8TryDefineFastNativeProperty(napi_env env, v8::Local<v8::Object> object,
                                   v8::Local<v8::Name> propertyName,
                                   const napi_property_descriptor* descriptor);

}  // namespace nativescript

#endif  // TARGET_ENGINE_V8

#endif  // V8_FAST_NATIVE_API_H

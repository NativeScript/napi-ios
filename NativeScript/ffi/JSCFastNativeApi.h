#ifndef NS_JSC_FAST_NATIVE_API_H
#define NS_JSC_FAST_NATIVE_API_H

#include "js_native_api.h"

#ifdef __cplusplus

namespace nativescript {

#ifdef TARGET_ENGINE_JSC

bool JSCTryDefineFastNativeProperty(napi_env env, napi_value object,
                                    const napi_property_descriptor* descriptor);

#endif  // TARGET_ENGINE_JSC

}  // namespace nativescript

#endif  // __cplusplus

#endif  // NS_JSC_FAST_NATIVE_API_H

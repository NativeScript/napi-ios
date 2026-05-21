#ifndef NS_QUICKJS_FAST_NATIVE_API_H
#define NS_QUICKJS_FAST_NATIVE_API_H

#include <stdbool.h>

#include "js_native_api.h"

#ifdef __cplusplus
extern "C" {
#endif

bool nativescript_quickjs_try_define_fast_native_property(
    napi_env env, napi_value object,
    const napi_property_descriptor* descriptor);

#ifdef __cplusplus
}
#endif

#endif  // NS_QUICKJS_FAST_NATIVE_API_H

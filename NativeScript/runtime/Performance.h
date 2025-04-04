#ifndef PERFORMANCE_H
#define PERFORMANCE_H

#include "js_native_api_types.h"

namespace nativescript {

class Performance {
 public:
  static void Init(napi_env env);

  static napi_value Constructor(napi_env env, napi_callback_info cbinfo);

  static napi_value Now(napi_env env, napi_callback_info cbinfo);
};

}  // namespace nativescript

#endif  // PERFORMANCE_H

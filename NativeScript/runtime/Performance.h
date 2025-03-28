#ifndef PERFORMANCE_H
#define PERFORMANCE_H

#include "js_native_api.h"

namespace nativescript {

class Performance {
 public:
  static void init(napi_env env);

  static napi_value constructor(napi_env env, napi_callback_info cbinfo);

  static napi_value now(napi_env env, napi_callback_info cbinfo);
};

}  // namespace nativescript

#endif  // PERFORMANCE_H

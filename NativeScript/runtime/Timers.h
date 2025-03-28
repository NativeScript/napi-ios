#ifndef TIMERS_H
#define TIMERS_H

#include "js_native_api_types.h"

namespace nativescript {

class Timers {
 public:
  static void init(napi_env env);

  static napi_value setTimeout(napi_env env, napi_callback_info cbinfo);
  static napi_value setInterval(napi_env env, napi_callback_info cbinfo);
  static napi_value clearTimer(napi_env env, napi_callback_info cbinfo);
};

}  // namespace nativescript

#endif  // TIMERS_H

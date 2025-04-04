#ifndef TIMERS_H
#define TIMERS_H

#include "js_native_api_types.h"

namespace nativescript {

class Timers {
 public:
  static void Init(napi_env env);

  static napi_value SetTimeout(napi_env env, napi_callback_info cbinfo);
  static napi_value SetInterval(napi_env env, napi_callback_info cbinfo);
  static napi_value ClearTimer(napi_env env, napi_callback_info cbinfo);
};

}  // namespace nativescript

#endif  // TIMERS_H

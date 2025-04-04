#ifndef CONSOLE_H
#define CONSOLE_H

#include "js_native_api_types.h"

namespace nativescript {

enum ConsoleStream {
  kConsoleStreamLog,
  kConsoleStreamError,
  kConsoleStreamWarn,
};

class Console {
 public:
  static void Init(napi_env env);

  static napi_value Constructor(napi_env env, napi_callback_info cbinfo);

  static napi_value Log(napi_env env, napi_callback_info cbinfo);
};

}  // namespace nativescript

#endif  // CONSOLE_H

#ifndef REQUIRE_H
#define REQUIRE_H

#include "js_native_api_types.h"
#include <string>

class Require {
public:
  Require(std::string path, std::string tilde) : path(path), tilde(tilde) {}

  static Require *Init(napi_env env, std::string &path, std::string &tilde);

  static napi_value CreateRequire(napi_env env, std::string &path,
                                  std::string &tilde,
                                  Require **pRequire = nullptr);

  static void Finalize(napi_env env, void *data, void *hint);

  std::string Resolve(std::string &spec);
  napi_value RequireModule(napi_env env, std::string spec);

  static napi_value RequireCallback(napi_env env, napi_callback_info cbinfo);

  std::string path;
  std::string tilde;
};

#endif // REQUIRE_H

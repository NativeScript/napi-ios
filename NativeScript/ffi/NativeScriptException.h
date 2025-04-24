#ifndef NativeScriptException_h
#define NativeScriptException_h

#include <string>

#include "js_native_api_types.h"

namespace nativescript {

class NativeScriptException {
 public:
  NativeScriptException(const std::string& message);
  NativeScriptException(const std::string& message,
                        const std::string& stackTrace);
  NativeScriptException(napi_env env, napi_value error,
                        const std::string& message,
                        const std::string& name = "NativeScriptException");
  ~NativeScriptException();

  void ReThrowToJS(napi_env env);

  static void OnUncaughtError(napi_env env, napi_value error);

  std::string Description() const;

 private:
  napi_env env_;
  napi_ref javascriptException_;
  std::string name_;
  std::string message_;
  std::string stackTrace_;
  std::string fullMessage_;

  static std::string GetErrorStackTrace(napi_env env, napi_value stackTrace);
  static std::string GetErrorMessage(napi_env env, napi_value error,
                                     const std::string& prependMessage = "");
  std::string GetFullMessage(napi_env env, napi_value error,
                             const std::string& jsExceptionMessage);

  static void PrintErrorMessage(const std::string& errorMessage);
};

}  // namespace nativescript

#endif /* NativeScriptException_h */

#ifndef _URL_SEARCH_PARAMS_HEADER_
#define _URL_SEARCH_PARAMS_HEADER_

#include "ada/ada.h"
#include "js_native_api_types.h"

namespace nativescript {

class URLSearchParams {
 public:
  static void Init(napi_env env, napi_value global);
  static void Destructor(napi_env env, void* nativeObject, void* finalize_hint);

  explicit URLSearchParams(ada::url_search_params params);
  ada::url_search_params* GetURLSearchParams();

 private:
  static napi_value New(napi_env env, napi_callback_info info);
  static napi_value Append(napi_env env, napi_callback_info info);
  static napi_value Delete(napi_env env, napi_callback_info info);
  static napi_value Entries(napi_env env, napi_callback_info info);
  static napi_value ForEach(napi_env env, napi_callback_info info);
  static napi_value Get(napi_env env, napi_callback_info info);
  static napi_value GetAll(napi_env env, napi_callback_info info);
  static napi_value Has(napi_env env, napi_callback_info info);
  static napi_value Keys(napi_env env, napi_callback_info info);
  static napi_value Set(napi_env env, napi_callback_info info);
  static napi_value GetSize(napi_env env, napi_callback_info info);
  static napi_value Sort(napi_env env, napi_callback_info info);
  static napi_value ToString(napi_env env, napi_callback_info info);
  static napi_value Values(napi_env env, napi_callback_info info);

  ada::url_search_params params_;
};

}  // namespace nativescript

#endif

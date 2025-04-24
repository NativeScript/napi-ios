#ifndef _URL_HEADER_
#define _URL_HEADER_

#include "ada/ada.h"
#include "js_native_api_types.h"

using namespace ada;
namespace nativescript {
class URL {
 public:
  static void Init(napi_env env, napi_value global);
  static void Destructor(napi_env env, void* nativeObject, void* finalize_hint);

  explicit URL(url_aggregator url);
  url_aggregator* GetURL();

 private:
  static napi_value New(napi_env env, napi_callback_info info);
  static napi_ref constructor;

  static napi_value GetHash(napi_env env, napi_callback_info info);
  static napi_value SetHash(napi_env env, napi_callback_info info);

  static napi_value GetHost(napi_env env, napi_callback_info info);
  static napi_value SetHost(napi_env env, napi_callback_info info);

  static napi_value GetHostName(napi_env env, napi_callback_info info);
  static napi_value SetHostName(napi_env env, napi_callback_info info);

  static napi_value GetHref(napi_env env, napi_callback_info info);
  static napi_value SetHref(napi_env env, napi_callback_info info);

  static napi_value GetOrigin(napi_env env, napi_callback_info info);

  static napi_value GetPassword(napi_env env, napi_callback_info info);
  static napi_value SetPassword(napi_env env, napi_callback_info info);

  static napi_value GetPathName(napi_env env, napi_callback_info info);
  static napi_value SetPathName(napi_env env, napi_callback_info info);

  static napi_value GetPort(napi_env env, napi_callback_info info);
  static napi_value SetPort(napi_env env, napi_callback_info info);

  static napi_value GetProtocol(napi_env env, napi_callback_info info);
  static napi_value SetProtocol(napi_env env, napi_callback_info info);

  static napi_value GetSearch(napi_env env, napi_callback_info info);
  static napi_value SetSearch(napi_env env, napi_callback_info info);

  static napi_value GetUserName(napi_env env, napi_callback_info info);
  static napi_value SetUserName(napi_env env, napi_callback_info info);

  static napi_value ToString(napi_env env, napi_callback_info info);
  static napi_value CanParse(napi_env env, napi_callback_info info);

  url_aggregator url_;
};
}  // namespace nativescript

#endif
#ifndef NS_HERMES_FAST_CALLBACK_INFO_H
#define NS_HERMES_FAST_CALLBACK_INFO_H

#include "js_native_api.h"

#ifdef TARGET_ENGINE_HERMES

#include <cstddef>
#include <cstdint>

namespace nativescript {

struct HermesFastCallbackInfo {
  napi_env env = nullptr;
  const uint64_t* thisArg = nullptr;
  const uint64_t* argsBase = nullptr;
  unsigned int argc = 0;
  void* data = nullptr;
  const uint64_t* newTarget = nullptr;
};

inline const HermesFastCallbackInfo* TryGetHermesFastCallbackInfo(
    napi_env env, napi_callback_info cbinfo) {
  if (env == nullptr || cbinfo == nullptr) {
    return nullptr;
  }

  auto* info = reinterpret_cast<const HermesFastCallbackInfo*>(cbinfo);
  if (info->env != env || info->thisArg == nullptr || info->argsBase == nullptr) {
    return nullptr;
  }

  return info;
}

inline napi_value HermesFastThisArg(const HermesFastCallbackInfo* info) {
  return reinterpret_cast<napi_value>(const_cast<uint64_t*>(info->thisArg));
}

inline napi_value HermesFastArg(const HermesFastCallbackInfo* info,
                                size_t index) {
  if (index >= info->argc) {
    return nullptr;
  }

  return reinterpret_cast<napi_value>(
      const_cast<uint64_t*>(info->argsBase - (index + 1)));
}

}  // namespace nativescript

#endif  // TARGET_ENGINE_HERMES

#endif  // NS_HERMES_FAST_CALLBACK_INFO_H

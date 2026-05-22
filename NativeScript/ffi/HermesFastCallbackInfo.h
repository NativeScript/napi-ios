#ifndef NS_HERMES_FAST_CALLBACK_INFO_H
#define NS_HERMES_FAST_CALLBACK_INFO_H

#include "js_native_api.h"

#ifdef TARGET_ENGINE_HERMES

#include <cstddef>
#include <cstdint>

namespace nativescript {

struct HermesFastCallbackInfo {
  struct HostFunctionContext {
    napi_env env = nullptr;
    napi_callback callback = nullptr;
    void* data = nullptr;
  };

  struct CallbackFrame {
    const uint64_t* frameStart = nullptr;
    const uint64_t* thisArgAndArgsBase = nullptr;
    unsigned int argc = 0;
  };

  const HostFunctionContext* context = nullptr;
  const CallbackFrame* frame = nullptr;
};

inline const HermesFastCallbackInfo* TryGetHermesFastCallbackInfo(
    napi_env env, napi_callback_info cbinfo) {
  if (env == nullptr || cbinfo == nullptr) {
    return nullptr;
  }

  auto* info = reinterpret_cast<const HermesFastCallbackInfo*>(cbinfo);
  if (info->context == nullptr || info->frame == nullptr ||
      info->context->env != env || info->frame->thisArgAndArgsBase == nullptr) {
    return nullptr;
  }

  return info;
}

inline size_t HermesFastArgc(const HermesFastCallbackInfo* info) {
  return info != nullptr && info->frame != nullptr ? info->frame->argc : 0;
}

inline void* HermesFastData(const HermesFastCallbackInfo* info) {
  return info != nullptr && info->context != nullptr ? info->context->data
                                                     : nullptr;
}

inline napi_value HermesFastThisArg(const HermesFastCallbackInfo* info) {
  return reinterpret_cast<napi_value>(
      const_cast<uint64_t*>(info->frame->thisArgAndArgsBase));
}

inline const uint64_t* HermesFastArgsBase(const HermesFastCallbackInfo* info) {
  return info != nullptr && info->frame != nullptr
             ? info->frame->thisArgAndArgsBase
             : nullptr;
}

inline napi_value HermesFastArg(const HermesFastCallbackInfo* info,
                                size_t index) {
  if (index >= HermesFastArgc(info)) {
    return nullptr;
  }

  return reinterpret_cast<napi_value>(
      const_cast<uint64_t*>(info->frame->thisArgAndArgsBase - (index + 1)));
}

}  // namespace nativescript

#endif  // TARGET_ENGINE_HERMES

#endif  // NS_HERMES_FAST_CALLBACK_INFO_H

#ifndef NS_FFI_SHARED_INVOCATION_SUPPORT_H
#define NS_FFI_SHARED_INVOCATION_SUPPORT_H

#include <cstddef>
#include <cstdlib>
#include <cstring>

#include "ffi/napi/Cif.h"
#include "ffi/napi/ObjCBridge.h"

namespace nativescript {

inline bool needsRoundTripCacheFrame(Cif* cif) {
  return cif != nullptr && cif->generatedDispatchHasRoundTripCacheArgument;
}

class EngineDirectRoundTripCacheFrameGuard {
 public:
  EngineDirectRoundTripCacheFrameGuard(napi_env env,
                                       ObjCBridgeState* bridgeState,
                                       bool enabled)
      : env_(enabled ? env : nullptr),
        bridgeState_(enabled ? bridgeState : nullptr) {
    if (bridgeState_ != nullptr) {
      bridgeState_->beginRoundTripCacheFrame(env_);
    }
  }

  EngineDirectRoundTripCacheFrameGuard(napi_env env,
                                       ObjCBridgeState* bridgeState,
                                       Cif* cif)
      : EngineDirectRoundTripCacheFrameGuard(
            env, bridgeState, needsRoundTripCacheFrame(cif)) {}

  ~EngineDirectRoundTripCacheFrameGuard() {
    if (bridgeState_ != nullptr) {
      bridgeState_->endRoundTripCacheFrame(env_);
    }
  }

 private:
  napi_env env_ = nullptr;
  ObjCBridgeState* bridgeState_ = nullptr;
};

class EngineDirectReturnStorage {
 public:
  explicit EngineDirectReturnStorage(Cif* cif) {
    size_t size = 0;
    if (cif != nullptr) {
      size = cif->rvalueLength;
      if (size == 0 && cif->cif.rtype != nullptr) {
        size = cif->cif.rtype->size;
      }
    }
    if (size == 0) {
      size = sizeof(void*);
    }

    if (size <= kInlineSize) {
      data_ = inlineBuffer_;
      std::memset(data_, 0, size);
      return;
    }

    data_ = std::malloc(size);
    if (data_ != nullptr) {
      std::memset(data_, 0, size);
    }
  }

  ~EngineDirectReturnStorage() {
    if (data_ != nullptr && data_ != inlineBuffer_) {
      std::free(data_);
    }
  }

  bool valid() const { return data_ != nullptr; }
  void* get() const { return data_; }

 private:
  static constexpr size_t kInlineSize = 32;
  alignas(max_align_t) unsigned char inlineBuffer_[kInlineSize];
  void* data_ = nullptr;
};

}  // namespace nativescript

#endif  // NS_FFI_SHARED_INVOCATION_SUPPORT_H

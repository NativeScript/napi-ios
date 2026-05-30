//
// Created by Ammar Ahmed on 16/11/2024.
//

#ifndef TEST_APP_JSR_H
#define TEST_APP_JSR_H

#include "hermes/hermes.h"
#include "jsi/threadsafe.h"
#include "jsr_common.h"

#include <unordered_map>

class JSR {
 public:
  JSR();
  std::unique_ptr<facebook::jsi::ThreadSafeRuntime> runtime;
  facebook::jsi::Runtime* rt;
  std::recursive_mutex js_mutex;
  static inline thread_local std::unordered_map<JSR*, int> lock_depth;
  void lock() {
    runtime->lock();
    js_mutex.lock();
    lock_depth[this] += 1;
  }
  void unlock() {
    auto depth = lock_depth.find(this);
    if (depth != lock_depth.end()) {
      depth->second -= 1;
      if (depth->second <= 0) {
        lock_depth.erase(depth);
      }
    }
    js_mutex.unlock();
    runtime->unlock();
  }
  int currentLockDepth() const {
    auto depth = lock_depth.find(const_cast<JSR*>(this));
    if (depth == lock_depth.end()) {
      return 0;
    }
    return depth->second;
  }

  static std::unordered_map<napi_env, JSR*> env_to_jsr_cache;
};

int js_current_env_lock_depth(napi_env env);
facebook::jsi::Runtime* js_get_jsi_runtime(napi_env env);

typedef struct napi_runtime__ {
  JSR* hermes;
} napi_runtime__;

class NapiScope {
 public:
  explicit NapiScope(napi_env env, bool openHandle = true) : env_(env) {
    js_lock_env(env_);
    if (openHandle) {
      napi_open_handle_scope(env_, &napiHandleScope_);
    } else {
      napiHandleScope_ = nullptr;
    }
  }

  ~NapiScope() {
    if (napiHandleScope_) {
      napi_close_handle_scope(env_, napiHandleScope_);
    }
    js_unlock_env(env_);
  }

 private:
  napi_env env_;
  napi_handle_scope napiHandleScope_;
};

#define JSEnterScope

#endif  // TEST_APP_JSR_H

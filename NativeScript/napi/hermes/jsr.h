//
// Created by Ammar Ahmed on 16/11/2024.
//

#ifndef TEST_APP_JSR_H
#define TEST_APP_JSR_H

// The two platforms link different Hermes builds that expose different
// Node-API entry points:
//
//   Apple   - hermes.xcframework, a NativeScript-patched Hermes exposing the
//             C++ jsi::Runtime::createNodeApiEnv() hook (see jsi/jsi.h).
//   Android - libhermesvm.so, which exports the upstream C ABI
//             (hermes_napi_create_env / hermes_run_script /
//             hermes_run_bytecode) and reaches the VM runtime through
//             facebook::hermes::IHermes.
//
// Everything below that is not ABI-specific is shared.

#include <memory>
#include <mutex>
#include <unordered_map>

#include "hermes/hermes.h"
#include "jsi/threadsafe.h"
#include "jsr_common.h"

#ifdef __ANDROID__
// Node-API surface exported by libhermesvm.so.
#include "napi/hermes_napi.h"
#endif

class JSR {
 public:
  JSR();
  std::unique_ptr<facebook::jsi::ThreadSafeRuntime> runtime;
#ifdef __ANDROID__
  // The android path needs the concrete HermesRuntime to reach IHermes.
  facebook::hermes::HermesRuntime* rt;
  // Depth of nested JS scopes entered from the host (see NapiScope). Hermes is
  // configured with an explicit microtask queue, so promise jobs only run when
  // we drain them; we drain once this returns to 0, i.e. when the native call
  // stack has fully unwound back out of JS.
  int jsEnterState = 0;
#else
  facebook::jsi::Runtime* rt;
#endif
  std::recursive_mutex js_mutex;
  void lock();
  void unlock();
  int currentLockDepth() const;

  static std::unordered_map<napi_env, JSR*> env_to_jsr_cache;
};

int js_current_env_lock_depth(napi_env env);
facebook::jsi::Runtime* js_get_jsi_runtime(napi_env env);

typedef struct jsr_ns_runtime__ {
  JSR* hermes;
} jsr_ns_runtime__;

class NapiScope {
 public:
  explicit NapiScope(napi_env env, bool openHandle = true) : env_(env) {
    js_lock_env(env_);
#ifdef __ANDROID__
    auto it = JSR::env_to_jsr_cache.find(env_);
    jsr_ = it != JSR::env_to_jsr_cache.end() ? it->second : nullptr;
    if (jsr_) {
      jsr_->jsEnterState++;
    }
#endif
    if (openHandle) {
      napi_open_handle_scope(env_, &napiHandleScope_);
    } else {
      napiHandleScope_ = nullptr;
    }
  }

  ~NapiScope() {
#ifdef __ANDROID__
    // Drain the microtask queue only when the outermost JS scope unwinds so
    // that promise continuations (async/await) run — mirroring how a JS engine
    // empties its job queue once control returns to the host. Draining at a
    // nested depth would run continuations while JS is still on the stack.
    // A throwing microtask must never escape a destructor.
    if (jsr_ && --jsr_->jsEnterState <= 0) {
      jsr_->jsEnterState = 0;
      try {
        js_execute_pending_jobs(env_);
      } catch (...) {
      }
    }
#endif
    if (napiHandleScope_) {
      napi_close_handle_scope(env_, napiHandleScope_);
    }
    js_unlock_env(env_);
  }

 private:
  napi_env env_;
  napi_handle_scope napiHandleScope_;
#ifdef __ANDROID__
  JSR* jsr_ = nullptr;
#endif
};

#define JSEnterScope

#endif  // TEST_APP_JSR_H

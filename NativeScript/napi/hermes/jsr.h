//
// Created by Ammar Ahmed on 16/11/2024.
//

#ifndef TEST_APP_JSR_H
#define TEST_APP_JSR_H

// Both platforms link the same Hermes build (scripts/download_hermes.sh
// installs the xcframework and the Android .so files from one release) and use
// the upstream C ABI: hermes_napi_create_env / hermes_run_script /
// hermes_run_bytecode, reaching the VM runtime through
// facebook::hermes::IHermes.
//
// Apple previously went through a NativeScript-local
// jsi::Runtime::createNodeApiEnv() hook. That is gone upstream, so the two
// entry paths have collapsed into one.

#include <memory>
#include <mutex>
#include <unordered_map>

#include "hermes/hermes.h"
#include "jsi/threadsafe.h"
#include "jsr_common.h"

class JSR {
 public:
  JSR();
  std::unique_ptr<facebook::jsi::ThreadSafeRuntime> runtime;
  // Both platforms reach IHermes through the concrete HermesRuntime.
  facebook::hermes::HermesRuntime* rt;
#ifdef __ANDROID__
  // Depth of nested JS scopes entered from the host (see NapiScope). Hermes is
  // configured with an explicit microtask queue, so promise jobs only run when
  // we drain them; we drain once this returns to 0, i.e. when the native call
  // stack has fully unwound back out of JS.
  int jsEnterState = 0;
#endif
  std::recursive_mutex js_mutex;
  void lock();
  void unlock();
  int currentLockDepth() const;

  // Workers each build their own runtime and env on their own thread
  // (WorkerImpl::BackgroundLooper), so this map is inserted into and erased
  // from off the main thread while other threads are looking envs up. An
  // unsynchronized rehash during insert frees the bucket list a concurrent
  // find() is walking, which hands back a garbage JSR* and crashes deep inside
  // the VM. Reach it only through these three accessors, which hold the mutex.
  static JSR* FromEnv(napi_env env);
  static void RegisterEnv(napi_env env, JSR* jsr);
  static void UnregisterEnv(napi_env env);

 private:
  static std::unordered_map<napi_env, JSR*> env_to_jsr_cache;
  static std::mutex env_to_jsr_mutex;
};

int js_current_env_lock_depth(napi_env env);
facebook::jsi::Runtime* js_get_jsi_runtime(napi_env env);

// The Objective-C bridge (ffi/objc/hermes) only ever holds the jsi::Runtime&
// that JSI handed it, which is ThreadSafeRuntime::getUnsafeRuntime() -- the
// lock is not reachable through it. Native callbacks arrive on whatever thread
// the platform picks (an NSOperationQueue worker, a URLSession delegate
// queue), so the bridge needs a way back to the ThreadSafeRuntime guarding
// that runtime before it enters the VM. V8 has the same problem and solves it
// with v8::Locker; this is the Hermes equivalent. Returns null for a runtime
// this layer did not create.
//
// Lock through the returned JSR rather than its ThreadSafeRuntime directly:
// JSR::lock() also maintains the per-thread depth counter that
// js_current_env_lock_depth() reports, and callers such as
// shouldAvoidMainQueueSyncWhileHoldingHermesLock() in Timers.mm use that count
// to decide whether a synchronous hop to the main queue would deadlock.
JSR* js_jsr_for_runtime(facebook::jsi::Runtime* runtime);

typedef struct jsr_ns_runtime__ {
  JSR* hermes;
} jsr_ns_runtime__;

class NapiScope {
 public:
  explicit NapiScope(napi_env env, bool openHandle = true) : env_(env) {
    js_lock_env(env_);
#ifdef __ANDROID__
    jsr_ = JSR::FromEnv(env_);
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

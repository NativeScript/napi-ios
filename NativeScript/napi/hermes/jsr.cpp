#include "jsr.h"

#include "js_runtime.h"

using namespace facebook::jsi;
std::unordered_map<napi_env, JSR*> JSR::env_to_jsr_cache;

namespace {
thread_local std::unordered_map<JSR*, int> g_runtime_lock_depth;

class RuntimeLockGuard {
 public:
  explicit RuntimeLockGuard(JSR* runtime) : runtime_(runtime) {
    runtime_->lock();
  }

  ~RuntimeLockGuard() { runtime_->unlock(); }

 private:
  JSR* runtime_;
};
}  // namespace

void JSR::lock() {
  runtime->lock();
  js_mutex.lock();
  g_runtime_lock_depth[this] += 1;
}

void JSR::unlock() {
  auto depth = g_runtime_lock_depth.find(this);
  if (depth != g_runtime_lock_depth.end()) {
    depth->second -= 1;
    if (depth->second <= 0) {
      g_runtime_lock_depth.erase(depth);
    }
  }
  js_mutex.unlock();
  runtime->unlock();
}

int JSR::currentLockDepth() const {
  auto depth = g_runtime_lock_depth.find(const_cast<JSR*>(this));
  if (depth == g_runtime_lock_depth.end()) {
    return 0;
  }
  return depth->second;
}

int js_current_env_lock_depth(napi_env env) {
  auto itFound = JSR::env_to_jsr_cache.find(env);
  if (itFound == JSR::env_to_jsr_cache.end() || itFound->second == nullptr) {
    return 0;
  }
  return itFound->second->currentLockDepth();
}

JSR::JSR() {
  hermes::vm::RuntimeConfig config = hermes::vm::RuntimeConfig::Builder()
                                         .withMicrotaskQueue(true)
                                         .withEnableEval(true)
                                         .build();
  runtime = facebook::hermes::makeThreadSafeHermesRuntime(config);
  rt = &runtime->getUnsafeRuntime();
}

napi_status js_create_runtime(napi_runtime* runtime) {
  if (runtime == nullptr) return napi_invalid_arg;
  *runtime = new napi_runtime__();
  (*runtime)->hermes = new JSR();

  return napi_ok;
}

napi_status js_lock_env(napi_env env) {
  auto itFound = JSR::env_to_jsr_cache.find(env);
  if (itFound == JSR::env_to_jsr_cache.end()) {
    return napi_invalid_arg;
  }
  itFound->second->lock();

  return napi_ok;
}

napi_status js_unlock_env(napi_env env) {
  auto itFound = JSR::env_to_jsr_cache.find(env);
  if (itFound == JSR::env_to_jsr_cache.end()) {
    return napi_invalid_arg;
  }
  itFound->second->unlock();

  return napi_ok;
}

napi_status js_create_napi_env(napi_env* env, napi_runtime runtime) {
  if (env == nullptr) return napi_invalid_arg;
  RuntimeLockGuard lock(runtime->hermes);
  *env = (napi_env)runtime->hermes->rt->createNodeApiEnv(9);
  JSR::env_to_jsr_cache.insert(std::make_pair(*env, runtime->hermes));
  return napi_ok;
}

facebook::jsi::Runtime* js_get_jsi_runtime(napi_env env) {
  auto itFound = JSR::env_to_jsr_cache.find(env);
  if (itFound == JSR::env_to_jsr_cache.end()) {
    return nullptr;
  }
  return itFound->second->rt;
}

napi_status js_set_runtime_flags(const char* flags) { return napi_ok; }

napi_status js_free_napi_env(napi_env env) {
  JSR::env_to_jsr_cache.erase(env);
  return napi_ok;
}

napi_status js_free_runtime(napi_runtime runtime) {
  if (runtime == nullptr) return napi_invalid_arg;
  runtime->hermes->runtime.reset();
  runtime->hermes->rt = nullptr;
  delete runtime->hermes;
  delete runtime;

  return napi_ok;
}

napi_status js_execute_script(napi_env env, napi_value script, const char* file,
                              napi_value* result) {
  return napi_run_script_source(env, script, file, result);
}

napi_status js_execute_pending_jobs(napi_env env) {
  bool result;
  return jsr_drain_microtasks(env, -1, &result);
}

napi_status js_get_engine_ptr(napi_env env, int64_t* engine_ptr) {
  return napi_ok;
}

napi_status js_adjust_external_memory(napi_env env, int64_t changeInBytes,
                                      int64_t* externalMemory) {
  napi_adjust_external_memory(env, changeInBytes, externalMemory);
  return napi_ok;
}

napi_status js_cache_script(napi_env env, const char* source,
                            const char* file) {
  return napi_ok;
}

napi_status js_run_cached_script(napi_env env, const char* file,
                                 napi_value script, void* cache,
                                 napi_value* result) {
  return napi_ok;
}

napi_status js_get_runtime_version(napi_env env, napi_value* version) {
  napi_create_string_utf8(env, "Hermes", NAPI_AUTO_LENGTH, version);
  return napi_ok;
}

extern "C" napi_status napi_run_script_source(napi_env env, napi_value script,
                                              const char* source_url,
                                              napi_value* result) {
  (void)source_url;
  return napi_run_script(env, script, result);
}

extern "C" napi_status jsr_run_script(napi_env env, napi_value source,
                                      const char* source_url,
                                      napi_value* result) {
  return napi_run_script_source(env, source, source_url, result);
}

extern "C" napi_status jsr_drain_microtasks(napi_env env,
                                            int32_t max_count_hint,
                                            bool* result) {
  auto itFound = JSR::env_to_jsr_cache.find(env);
  if (itFound == JSR::env_to_jsr_cache.end() || result == nullptr) {
    return napi_invalid_arg;
  }

  NapiScope scope(env, false);
  *result = itFound->second->rt->drainMicrotasks(max_count_hint);
  return napi_ok;
}

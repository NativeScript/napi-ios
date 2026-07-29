#include "jsr.h"

#include "jsr_common.h"

#include <functional>

#ifdef __ANDROID__
#include <cstdio>
#include <cstring>

#include "File.h"
#include "NativeScriptAssert.h"
#include "bytecode_container.h"
#else
#include "js_runtime.h"
#endif

using namespace facebook::jsi;
std::unordered_map<napi_env, JSR*> JSR::env_to_jsr_cache;

namespace {
thread_local std::unordered_map<JSR*, int> g_runtime_lock_depth;

class RuntimeLockGuard {
 public:
  explicit RuntimeLockGuard(JSR* runtime) : runtime_(runtime) {
    runtime_->lock();
  }

  ~RuntimeLockGuard() {
    runtime_->unlock();
  }

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
#ifdef __ANDROID__
  hermes::vm::RuntimeConfig config = hermes::vm::RuntimeConfig::Builder()
                                         .withMicrotaskQueue(true)
                                         .withES6BlockScoping(true)
                                         .withEnableAsyncGenerators(true)
                                         .withAsyncBreakCheckInEval(true)
                                         .build();
  runtime = facebook::hermes::makeThreadSafeHermesRuntime(config);
  rt = static_cast<facebook::hermes::HermesRuntime*>(&runtime->getUnsafeRuntime());
#else
  hermes::vm::RuntimeConfig config = hermes::vm::RuntimeConfig::Builder()
                                         .withMicrotaskQueue(true)
                                         .withEnableEval(true)
                                         .build();
  runtime = facebook::hermes::makeThreadSafeHermesRuntime(config);
  rt = &runtime->getUnsafeRuntime();
#endif
}

napi_status js_create_runtime(jsr_ns_runtime* runtime) {
  if (runtime == nullptr) return napi_invalid_arg;
  *runtime = new jsr_ns_runtime__();
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

napi_status js_create_napi_env(napi_env* env, jsr_ns_runtime runtime) {
  if (env == nullptr) return napi_invalid_arg;
  RuntimeLockGuard lock(runtime->hermes);
#ifdef __ANDROID__
  // Extract the underlying hermes::vm::Runtime from the JSI HermesRuntime via
  // the IHermes interface, then create the Node-API env on top of it. This is
  // the same path Hermes' own tools (repl, test-runner, napi-runner) use and
  // relies only on symbols exported by libhermesvm.so.
  void* vmRuntime =
      facebook::jsi::castInterface<facebook::hermes::IHermes>(runtime->hermes->rt)
          ->getVMRuntimeUnsafe();
  *env = hermes_napi_create_env(vmRuntime);
#else
  *env = (napi_env)runtime->hermes->rt->createNodeApiEnv(9);
#endif
  if (*env == nullptr) return napi_generic_failure;
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
#ifndef NS_HERMES_SKIP_ENV_CLEANUP_HOOKS
  js_run_env_cleanup_hooks(env);
#endif
  JSR::env_to_jsr_cache.erase(env);
  return napi_ok;
}

napi_status js_free_runtime(jsr_ns_runtime runtime) {
  if (runtime == nullptr) return napi_invalid_arg;
  runtime->hermes->runtime.reset();
  runtime->hermes->rt = nullptr;
  delete runtime->hermes;
  delete runtime;

  return napi_ok;
}

napi_status js_execute_script(napi_env env, napi_value script, const char* file,
                              napi_value* result) {
#ifdef __ANDROID__
  // Pull the UTF-8 source out of the napi string value and compile+run it via
  // the Hermes NAPI entry point so we can attach the source URL for stack
  // traces.
  size_t len = 0;
  napi_status status = napi_get_value_string_utf8(env, script, nullptr, 0, &len);
  if (status != napi_ok) return status;

  DEBUG_WRITE("[script] loading script: %s", file);

  uint8_t* source = new uint8_t[len + 1];
  status = napi_get_value_string_utf8(env, script, reinterpret_cast<char*>(source),
                                      len + 1, &len);
  if (status != napi_ok) {
    delete[] source;
    return status;
  }

  hermes_run_script_flags flags{};
  flags.struct_size = sizeof(flags);
  // Pass size = len + 1 so the trailing '\0' lets Hermes run the source
  // zero-copy. Hermes takes ownership of the buffer and frees it via the
  // finalizer below.
  return hermes_run_script(
      env, source, len + 1,
      [](const uint8_t* data, size_t, void*) { delete[] const_cast<uint8_t*>(data); },
      nullptr, file, &flags, result);
#else
  return napi_run_script_source(env, script, file, result);
#endif
}

#ifdef __ANDROID__
// Hermes bytecode (HBC) magic, first 8 bytes little-endian (0x1F1903C103BC1FC6).
// Hermes stores raw HBC (no NativeScript container), so the whole file is the
// bytecode buffer.
static const uint8_t kHermesMagic[8] = {0xc6, 0x1f, 0xbc, 0x03,
                                        0xc1, 0x03, 0x19, 0x1f};

napi_status js_run_bytecode_file(napi_env env, const char* file,
                                 napi_value* result) {
  std::string path;
  if (!nsbc::ResolvePath(file, path)) {
    DEBUG_WRITE("[bytecode] Unable to resolve file: %s", path.c_str());
    return napi_cannot_run_js;
  }
  if (!nsbc::HasMagic(path, reinterpret_cast<const char*>(kHermesMagic))) {
    DEBUG_WRITE("[bytecode] Unable to find hermes header: %s", path.c_str());
    return napi_cannot_run_js;
  }

  int length = 0;
  auto data = tns::File::ReadBinary(path, length);
  if (!data) return napi_cannot_run_js;

  DEBUG_WRITE("[bytecode] loading Hermes HBC bytecode: %s (%d bytes)", file, length);

  hermes_bytecode_flags flags{};
  flags.struct_size = sizeof(flags);
  // App modules live for the whole runtime lifetime, so keep the bytecode
  // resident and let Hermes reference it zero-copy for faster loads.
  flags.persistent = true;
  // Hermes takes ownership of the buffer and frees it via the finalizer.
  return hermes_run_bytecode(
      env, static_cast<const uint8_t*>(data), static_cast<size_t>(length),
      [](const uint8_t* d, size_t, void*) { delete[] const_cast<uint8_t*>(d); },
      nullptr, file, &flags, result);
}
#else
napi_status js_run_bytecode_file(napi_env env, const char* file,
                                 napi_value* result) {
  // The Apple Hermes build does not expose the bytecode entry points.
  return napi_cannot_run_js;
}
#endif

napi_status js_execute_pending_jobs(napi_env env) {
#ifdef __ANDROID__
  auto itFound = JSR::env_to_jsr_cache.find(env);
  if (itFound == JSR::env_to_jsr_cache.end()) {
    return napi_invalid_arg;
  }
  itFound->second->rt->drainMicrotasks();
  return napi_ok;
#else
  bool result;
  return jsr_drain_microtasks(env, -1, &result);
#endif
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
#ifdef __ANDROID__
  int length = 0;
  // tns::File::ReadBinary allocates with new uint8_t[length].
  auto data = tns::File::ReadBinary(file, length);
  if (!data) {
    return napi_cannot_run_js;
  }

  hermes_bytecode_flags flags{};
  flags.struct_size = sizeof(flags);
  // Hermes takes ownership of the buffer and frees it via the finalizer.
  return hermes_run_bytecode(
      env, static_cast<const uint8_t*>(data), static_cast<size_t>(length),
      [](const uint8_t* d, size_t, void*) { delete[] const_cast<uint8_t*>(d); },
      nullptr, file, &flags, result);
#else
  return napi_ok;
#endif
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

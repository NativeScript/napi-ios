#include "native_api_util.h"
#include "runtime/SpinLock.h"
#ifdef ENABLE_JS_RUNTIME

#include "Runtime.h"
#include "RuntimeConfig.h"
#include "js_native_api.h"
#include "js_native_api_types.h"
#include "jsr.h"
#include "jsr_common.h"
#include "runtime/modules/RuntimeModules.h"
#ifdef TARGET_ENGINE_V8
#include "v8-api.h"
#endif  // TARGET_ENGINE_V8
#include <CoreFoundation/CFRunLoop.h>

#include "NativeScript.h"
#include "robin_hood.h"

namespace nativescript {

static robin_hood::unordered_map<napi_env, Runtime*> runtimes_;

std::atomic<int> Runtime::nextIsolateId{0};

Runtime* Runtime::GetRuntime(napi_env env) {
  auto it = runtimes_.find(env);
  if (it != runtimes_.end()) {
    return it->second;
  }
  return nullptr;
}

Runtime::Runtime() {
  currentRuntime_ = this;
  workerId_ = -1;
  // workerCache_ = Caches::Workers;
}

Runtime::~Runtime() {
  currentRuntime_ = nullptr;

  modules_.DeInit();

  if (env_) {
    napi_close_handle_scope(env_, globalScope_);

    {
      NapiScope scope(env_);

      js_free_napi_env(env_);
    }

    js_free_runtime(runtime_);
  }

  {
    SpinLock lock(envsMutex_);
    runtimes_.erase(env_);
  }
}

void Runtime::Init(bool isWorker) {
  js_set_runtime_flags("");

  auto now = std::chrono::steady_clock::now();
  startTime_ = std::chrono::duration<double>(now.time_since_epoch()).count();

  auto sysNow = std::chrono::system_clock::now();
  realtimeOrigin_ = std::chrono::duration_cast<std::chrono::milliseconds>(
                        sysNow.time_since_epoch())
                        .count();

  js_create_runtime(&runtime_);
  js_create_napi_env(&env_, runtime_);

  runtimeLoop_ = CFRunLoopGetCurrent();

  {
    SpinLock lock(envsMutex_);
    runtimes_[env_] = this;
  }

#ifdef TARGET_ENGINE_V8
  v8::Locker locker(env_->isolate);
  v8::Isolate::Scope isolate_scope(env_->isolate);
  v8::Context::Scope context_scope(env_->context());
#endif  // TARGET_ENGINE_V8

  napi_open_handle_scope(env_, &globalScope_);

  napi_handle_scope scope;
  napi_open_handle_scope(env_, &scope);

  napi_value global;
  napi_get_global(env_, &global);
  napi_set_named_property(env_, global, "global", global);

  const char* CompatScript = R"(
    if (!WeakRef.prototype.get) WeakRef.prototype.get = function() {
      return this.deref();
    };

    if (!globalThis.__collect) {
      globalThis.__collect = function() {
        gc();
      };
    }

    if (!globalThis.gc) {
      globalThis.gc = function() {
        console.warn('gc() is not exposed');
      };
    }
  )";

  napi_value compatScript, result;
  napi_create_string_utf8(env_, CompatScript, NAPI_AUTO_LENGTH, &compatScript);
  napi_run_script(env_, compatScript, &result);

  if (isWorker) {
    napi_property_descriptor prop = napi_util::desc("self", global);
    napi_define_properties(env_, global, 1, &prop);
  }

  modules_.Init(env_, global);

  const char* metadata_path = std::getenv("NS_METADATA_PATH");
  nativescript_init(env_, metadata_path, RuntimeConfig.MetadataPtr);

  napi_close_handle_scope(env_, scope);
}

const int Runtime::WorkerId() { return this->workerId_; }

void Runtime::SetWorkerId(int workerId) { this->workerId_ = workerId; }

void Runtime::RunScript(std::string& scriptSrc, std::string file) {
  NapiScope scope(env_);

  napi_value script, result;
  napi_create_string_utf8(env_, scriptSrc.c_str(), scriptSrc.length(), &script);
  js_execute_script(env_, script, file.c_str(), &result);
}

napi_value Runtime::RunModule(std::string spec) {
  NapiScope scope(env_);
  return modules_.module.Require(env_, spec, RuntimeConfig.BaseDir);
}

void Runtime::RunMainModule() { napi_value result = RunModule("./"); }

void Runtime::RunLoop() { CFRunLoopRunInMode(kCFRunLoopDefaultMode, 0, true); }

bool Runtime::IsAlive(napi_env env) {
  SpinLock lock(envsMutex_);
  auto it = runtimes_.find(env);
  return it != runtimes_.end();
}

thread_local Runtime* Runtime::currentRuntime_ = nullptr;
SpinMutex Runtime::envsMutex_;

}  // namespace nativescript

#endif  // ENABLE_JS_RUNTIME

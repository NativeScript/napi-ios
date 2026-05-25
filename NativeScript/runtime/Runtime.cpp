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
#ifdef TARGET_ENGINE_HERMES
#include "ffi/hermes/jsi/NativeApiJsi.h"
#endif  // TARGET_ENGINE_HERMES
#include <CoreFoundation/CFRunLoop.h>

#include "NativeScript.h"
#include "robin_hood.h"

extern "C" {
void node_module_register(const char* name, napi_module_init init) {
  nativescript::napiModuleRegistry[name] = init;
}
}

namespace nativescript {

std::unordered_map<std::string, napi_module_init> napiModuleRegistry;

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

  if (env_) {
    {
      // Enter isolate/context for deinit work without creating another
      // temporary N-API handle scope. We must close the long-lived
      // `globalScope_` in LIFO order.
      NapiScope scope(env_, false);

      modules_.DeInit();
      napi_close_handle_scope(env_, globalScope_);
      js_free_napi_env(env_);
    }

    js_free_runtime(runtime_);
  } else {
    modules_.DeInit();
  }

  {
    SpinLock lock(envsMutex_);
    runtimes_.erase(env_);
  }
}

napi_value drainMicrotasks(napi_env env, napi_callback_info cbinfo) {
  js_execute_pending_jobs(env);
  return nullptr;
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
    if (typeof globalThis.__extends !== "function") {
      var __extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function(d, b) { d.__proto__ = b; }) ||
        function(d, b) {
          for (var p in b) {
            if (Object.prototype.hasOwnProperty.call(b, p)) {
              d[p] = b[p];
            }
          }
        };
      globalThis.__extends = function(d, b) {
        if (typeof b !== "function" && b !== null) {
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        }
        __extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }

    if (typeof globalThis.__decorate !== "function") {
      globalThis.__decorate = function(decorators, target, key, desc) {
        var c = arguments.length;
        var r = c < 3 ? target : (desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc);
        var d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
          r = Reflect.decorate(decorators, target, key, desc);
        } else {
          for (var i = decorators.length - 1; i >= 0; i--) {
            d = decorators[i];
            if (d) {
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            }
          }
        }
        if (c > 3 && r) {
          Object.defineProperty(target, key, r);
        }
        return r;
      };
    }

    if (typeof globalThis.__param !== "function") {
      globalThis.__param = function(paramIndex, decorator) {
        return function(target, key) { decorator(target, key, paramIndex); };
      };
    }

    if (typeof globalThis.ObjCClass !== "function") {
      globalThis.ObjCClass = function ObjCClass(...protocols) {
        return function(constructor) {
          constructor.ObjCProtocols = protocols;
        };
      };
    }

    if (typeof WeakRef === "function") {
      if (!WeakRef.prototype.get && typeof WeakRef.prototype.deref === "function") {
        WeakRef.prototype.get = WeakRef.prototype.deref;
      }

      if (!WeakRef.prototype.clear) {
        WeakRef.prototype.clear = function() {
          console.warn("WeakRef.clear() is non-standard and has been deprecated. It does nothing and the call can be safely removed.");
        };
      }
    }

    if (!globalThis.__time) {
      globalThis.__time = function() {
        if (globalThis.performance && typeof performance.now === "function") {
          return performance.now();
        }
        return Date.now();
      };
    }

    if (globalThis.performance && typeof performance.now === "function" &&
        typeof performance.timeOrigin !== "number") {
      const now = performance.now();
      const origin = Date.now() - now;
      try {
        Object.defineProperty(performance, "timeOrigin", {
          configurable: true,
          enumerable: true,
          writable: false,
          value: origin
        });
      } catch (_) {
        performance.timeOrigin = origin;
      }
    }

    if (!globalThis.__collect) {
      globalThis.__collect = function() {
        gc();
      };
    }

    if (!globalThis.__dynamicImport) {
      globalThis.__dynamicImport = function(specifier) {
        return Promise.resolve().then(function() {
          const runtimeRequire =
            typeof globalThis.require === "function" ? globalThis.require : null;
          if (!runtimeRequire) {
            throw new ReferenceError("require is not available");
          }

          const loaded = runtimeRequire(specifier);
          if (loaded !== null &&
              (typeof loaded === "object" || typeof loaded === "function")) {
            if (loaded.__esModule) {
              return loaded;
            }
            return Object.assign({ default: loaded }, loaded);
          }

          return { default: loaded };
        });
      };
    }

    if (!globalThis.gc) {
      globalThis.gc = function() {
        console.warn('gc() is not exposed');
      };
    }

    if (typeof globalThis.URLPattern !== "function") {
      globalThis.URLPattern = class URLPattern {
        constructor(input, baseURL) {
          if (typeof input !== "string") {
            throw new TypeError("Failed to construct 'URLPattern': input must be a string");
          }

          let url;
          if (baseURL === undefined || baseURL === null) {
            url = new URL(input);
          } else {
            url = new URL(input, baseURL);
          }

          const normalizeProtocol = (value) => value.endsWith(":") ? value.slice(0, -1) : value;

          this.protocol = normalizeProtocol(url.protocol);
          this.username = url.username || "*";
          this.password = url.password || "*";
          this.hostname = url.hostname || "*";
          this.port = url.port || "";
          this.pathname = url.pathname || "/";
          this.search = url.search || "*";
          this.hash = url.hash || "*";
          this.hasRegExpGroups = false;
        }
      };
    }
  )";

  napi_value compatScript, result;
  napi_create_string_utf8(env_, CompatScript, NAPI_AUTO_LENGTH, &compatScript);
  napi_run_script(env_, compatScript, &result);

#if defined(TARGET_ENGINE_V8) || defined(TARGET_ENGINE_HERMES)
  const char* PromiseProxyScript = R"(
        // Ensure that Promise callbacks are executed on the
        // same thread on which they were created
        (() => {
            global.Promise = new Proxy(global.Promise, {
                construct: function(target, args) {
                    let origFunc = args[0];
                    let runloop = CFRunLoopGetCurrent();

                    let promise = new target(function(resolve, reject) {
                        function isFulfilled() {
                            return !resolve;
                        }
                        function markFulfilled() {
                            origFunc = null;
                            resolve = null;
                            reject = null;
                        }
                        origFunc(value => {
                            if (isFulfilled()) {
                                return;
                            }
                            const resolveCall = resolve.bind(this, value);
                            if (runloop === CFRunLoopGetCurrent()) {
                                markFulfilled();
                                resolveCall();
                            } else {
                                CFRunLoopPerformBlock(runloop, kCFRunLoopDefaultMode, resolveCall);
                                CFRunLoopWakeUp(runloop);
                                markFulfilled();
                            }
                        }, reason => {
                            if (isFulfilled()) {
                                return;
                            }
                            const rejectCall = reject.bind(this, reason);
                            if (runloop === CFRunLoopGetCurrent()) {
                                markFulfilled();
                                rejectCall();
                            } else {
                                CFRunLoopPerformBlock(runloop, kCFRunLoopDefaultMode, rejectCall);
                                CFRunLoopWakeUp(runloop);
                                markFulfilled();
                            }
                        });
                    });

                    return new Proxy(promise, {
                        get: function(target, name) {
                            let orig = target[name];
                            if (name === "then" || name === "catch" || name === "finally") {
                                return orig.bind(target);
                            }
                            return typeof orig === 'function' ? function(x) {
                                if (runloop === CFRunLoopGetCurrent()) {
                                    orig.bind(target, x)();
                                    return target;
                                }
                                CFRunLoopPerformBlock(runloop, kCFRunLoopDefaultMode, orig.bind(target, x));
                                CFRunLoopWakeUp(runloop);
                                return target;
                            } : orig;
                        }
                    });
                }
            });
        })();
    )";

  napi_value promiseProxyScript;
  napi_create_string_utf8(env_, PromiseProxyScript, NAPI_AUTO_LENGTH,
                          &promiseProxyScript);
  napi_run_script(env_, promiseProxyScript, &result);
#endif

  if (isWorker) {
    napi_property_descriptor prop = napi_util::desc("self", global);
    napi_define_properties(env_, global, 1, &prop);
  }

  napi_property_descriptor prop =
      napi_util::desc("__drainMicrotaskQueue", drainMicrotasks, nullptr);
  napi_define_properties(env_, global, 1, &prop);

  modules_.Init(env_, global);

#ifdef TARGET_ENGINE_HERMES
  const char* HermesGlobalBootstrap = R"(
    if (typeof globalThis.Console === "function" && typeof globalThis.console === "undefined") {
      globalThis.console = Object.create(globalThis.Console.prototype);
    }
    if (typeof globalThis.Performance === "function" && typeof globalThis.performance === "undefined") {
      globalThis.performance = Object.create(globalThis.Performance.prototype);
    }
  )";

  napi_value hermesGlobalBootstrapScript;
  napi_create_string_utf8(env_, HermesGlobalBootstrap, NAPI_AUTO_LENGTH,
                          &hermesGlobalBootstrapScript);
  napi_run_script(env_, hermesGlobalBootstrapScript, &result);
#endif

  const char* metadata_path = std::getenv("NS_METADATA_PATH");
#if NS_FFI_BACKEND_NAPI
  nativescript_init(env_, metadata_path, RuntimeConfig.MetadataPtr);
#endif

#if NS_FFI_BACKEND_DIRECT && defined(TARGET_ENGINE_HERMES)
  if (auto* jsiRuntime = js_get_jsi_runtime(env_)) {
    NativeApiJsiConfig nativeApiJsiConfig;
    nativeApiJsiConfig.metadataPath = metadata_path;
    nativeApiJsiConfig.metadataPtr = RuntimeConfig.MetadataPtr;
    nativeApiJsiConfig.installGlobalSymbols = true;
    InstallNativeApiJSI(*jsiRuntime, nativeApiJsiConfig);
  }
#endif  // NS_FFI_BACKEND_DIRECT && TARGET_ENGINE_HERMES

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

void Runtime::RunLoop() {
  // Keep the runtime alive while asynchronous main-thread work is pending, but
  // still exit once the loop has been idle for a short period.
  constexpr CFTimeInterval kPollSeconds = 0.1;
  constexpr int kIdlePollsBeforeExit = 10;  // ~1s idle window

  int idlePolls = 0;
  while (true) {
    js_execute_pending_jobs(env_);

    const auto result =
        CFRunLoopRunInMode(kCFRunLoopDefaultMode, kPollSeconds, true);

    if (result == kCFRunLoopRunHandledSource) {
      idlePolls = 0;
      continue;
    }

    if (result == kCFRunLoopRunTimedOut) {
#ifdef __APPLE__
      if (Timers::HasActiveTimers()) {
        idlePolls = 0;
        continue;
      }
#endif
      idlePolls++;
      if (idlePolls >= kIdlePollsBeforeExit) {
        break;
      }
      continue;
    }

    if (result == kCFRunLoopRunStopped || result == kCFRunLoopRunFinished) {
      break;
    }
  }
}

bool Runtime::IsAlive(napi_env env) {
  SpinLock lock(envsMutex_);
  auto it = runtimes_.find(env);
  return it != runtimes_.end();
}

thread_local Runtime* Runtime::currentRuntime_ = nullptr;
SpinMutex Runtime::envsMutex_;

}  // namespace nativescript

#endif  // ENABLE_JS_RUNTIME

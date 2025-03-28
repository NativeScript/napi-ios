#ifdef ENABLE_JS_RUNTIME

#include "Runtime.h"

#include "RuntimeConfig.h"
#include "js_native_api_types.h"
#include "jsr.h"
#include "jsr_common.h"
#ifdef __APPLE__
#include "App.h"
#endif  // __APPLE__
#include "Console.h"
#include "Performance.h"
#include "Require.h"
#include "Timers.h"
#include "js_native_api.h"
#ifdef TARGET_ENGINE_V8
#include "v8-api.h"
#endif  // TARGET_ENGINE_V8
#include <CoreFoundation/CFRunLoop.h>

#include <iostream>

#include "NativeScript.h"

namespace nativescript {

Runtime::Runtime() {
  js_set_runtime_flags("");

  js_create_runtime(&runtime);
  js_create_napi_env(&env, runtime);

#ifdef TARGET_ENGINE_V8
  v8::Locker locker(env->isolate);
  v8::Isolate::Scope isolate_scope(env->isolate);
  v8::Context::Scope context_scope(env->context());
#endif  // TARGET_ENGINE_V8

  napi_open_handle_scope(env, &globalScope);

  napi_handle_scope scope;
  napi_open_handle_scope(env, &scope);

  napi_value global;
  napi_get_global(env, &global);
  napi_set_named_property(env, global, "global", global);

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
  napi_create_string_utf8(env, CompatScript, NAPI_AUTO_LENGTH, &compatScript);
  napi_run_script(env, compatScript, &result);

  Console::init(env);
  Performance::init(env);
#ifdef __APPLE__
  Timers::init(env);
#endif  // __APPLE__

  require = Require::init(env, RuntimeConfig.BaseDir, RuntimeConfig.BaseDir);

  const char* metadata_path = std::getenv("NS_METADATA_PATH");
  objc_bridge_init(env, metadata_path, RuntimeConfig.MetadataPtr);

#ifdef __APPLE__
  App* app = App::init(env);
  // app->runtime = this->runtime;
#endif  // __APPLE__

  napi_close_handle_scope(env, scope);
}

void Runtime::RunScript(std::string& scriptSrc) {
  NapiScope scope(env);

  napi_value script, result;
  napi_create_string_utf8(env, scriptSrc.c_str(), scriptSrc.length(), &script);
  js_execute_script(env, script, "<anonymous>", &result);
}

napi_value Runtime::RunModule(std::string spec) {
  NapiScope scope(env);
  std::string path = require->resolve(spec);
  return require->require(env, path);
}

void Runtime::RunMainModule() {
  napi_value result = RunModule("./");
}

void Runtime::RunLoop() {
  CFRunLoopRunInMode(kCFRunLoopDefaultMode, 0, true);
}

}  // namespace nativescript

#endif  // ENABLE_JS_RUNTIME

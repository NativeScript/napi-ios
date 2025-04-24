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

  modules.Init(env, global);

  const char* metadata_path = std::getenv("NS_METADATA_PATH");
  nativescript_init(env, metadata_path, RuntimeConfig.MetadataPtr);

  napi_close_handle_scope(env, scope);
}

void Runtime::RunScript(std::string& scriptSrc, std::string file) {
  NapiScope scope(env);

  napi_value script, result;
  napi_create_string_utf8(env, scriptSrc.c_str(), scriptSrc.length(), &script);
  js_execute_script(env, script, file.c_str(), &result);
}

napi_value Runtime::RunModule(std::string spec) {
  NapiScope scope(env);
  return modules.module.Require(env, spec, RuntimeConfig.BaseDir);
}

void Runtime::RunMainModule() { napi_value result = RunModule("./"); }

void Runtime::RunLoop() { CFRunLoopRunInMode(kCFRunLoopDefaultMode, 0, true); }

}  // namespace nativescript

#endif  // ENABLE_JS_RUNTIME

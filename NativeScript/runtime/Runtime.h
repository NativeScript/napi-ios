#ifndef RUNTIME_H
#define RUNTIME_H

#include <CoreFoundation/CFRunLoop.h>

#include "runtime/modules/RuntimeModules.h"
#ifdef ENABLE_JS_RUNTIME

#include "js_native_api_types.h"

namespace nativescript {

class Runtime {
 public:
  Runtime();

  void Init(bool isWorker);

  void RunScript(std::string& script, std::string file = "<anonymous>");
  napi_value RunModule(std::string spec);
  void RunMainModule();

  void RunLoop();

  int workerId;
  CFRunLoopRef runtimeLoop;
  double startTime;
  double realtimeOrigin;

  napi_runtime runtime;
  napi_env env;
  napi_handle_scope globalScope;
  RuntimeModules modules = RuntimeModules();

  // std::shared_ptr<ConcurrentMap<int, std::shared_ptr<Caches::WorkerState>>>
  //     workerCache_;
};

}  // namespace nativescript

#endif  // ENABLE_JS_RUNTIME

#endif  // RUNTIME_H

#ifndef RUNTIME_H
#define RUNTIME_H

#include <CoreFoundation/CFRunLoop.h>
#ifdef ENABLE_JS_RUNTIME

#include "Require.h"
#include "js_native_api_types.h"

namespace nativescript {

class Runtime {
 public:
  Runtime();

  void Init(bool isWorker);

  void RunScript(std::string& script);
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
  Require* require;

  // std::shared_ptr<ConcurrentMap<int, std::shared_ptr<Caches::WorkerState>>>
  //     workerCache_;
};

}  // namespace nativescript

#endif  // ENABLE_JS_RUNTIME

#endif  // RUNTIME_H

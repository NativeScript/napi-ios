#ifndef RUNTIME_H
#define RUNTIME_H

#include <CoreFoundation/CFRunLoop.h>

#include <vector>

#include "js_native_api_types.h"
#include "runtime/SpinLock.h"
#include "runtime/modules/RuntimeModules.h"

namespace nativescript {

class Runtime {
 public:
  Runtime();
  ~Runtime();

  void Init(bool isWorker = false);

  inline napi_env GetEnv() { return env_; }
  static Runtime* GetRuntime(napi_env env);

  void RunScript(std::string& script, std::string file = "<anonymous>");
  napi_value RunModule(std::string spec);
  void RunMainModule();

  const int WorkerId();
  void SetWorkerId(int workerId);
  inline bool IsRuntimeWorker() { return workerId_ > 0; }

  static bool IsWorker() {
    if (currentRuntime_ == nullptr) {
      return false;
    }

    return currentRuntime_->IsRuntimeWorker();
  }

  inline CFRunLoopRef RuntimeLoop() { return runtimeLoop_; }

  void RunLoop();

  static Runtime* GetCurrentRuntime() { return currentRuntime_; }

  static bool IsAlive(napi_env env);

 private:
  int workerId_;
  CFRunLoopRef runtimeLoop_;
  double startTime_;
  double realtimeOrigin_;

  napi_runtime runtime_;
  napi_env env_ = nullptr;
  napi_handle_scope globalScope_;
  RuntimeModules modules_ = RuntimeModules();

  static thread_local Runtime* currentRuntime_;
  static SpinMutex envsMutex_;
  static std::atomic<int> nextIsolateId;

  // std::shared_ptr<ConcurrentMap<int, std::shared_ptr<Caches::WorkerState>>>
  //     workerCache_;
};

}  // namespace nativescript

#endif  // RUNTIME_H

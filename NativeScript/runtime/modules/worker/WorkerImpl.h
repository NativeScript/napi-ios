#ifndef WORKER_IMPL_H
#define WORKER_IMPL_H

#include <atomic>
#include <functional>
#include <memory>

#include "ffi/NativeScriptException.h"
#include "js_native_api_types.h"
#include "native_api_util.h"
#include "runtime/modules/worker/ConcurrentMap.h"
#include "runtime/modules/worker/ConcurrentQueue.h"
#include "runtime/modules/worker/Message.h"

namespace nativescript {

class WorkerImpl {
 public:
  WorkerImpl(napi_env env, std::function<void(napi_env, napi_value jsThis,
                                              std::shared_ptr<worker::Message>)>
                               onMessage);

  void Start(std::shared_ptr<napi_util::PersistentObject> worker,
             std::function<napi_env()> func);

  napi_value GetWorkerObject();

  void CallOnErrorHandlers(napi_env env, napi_value error);
  void PassUncaughtExceptionFromWorkerToMain(napi_env env,
                                             NativeScriptException& ex,
                                             bool async = true);
  void PassUncaughtExceptionFromWorkerToMain(napi_env env, napi_value error,
                                             bool async = true);
  void PostMessage(std::shared_ptr<worker::Message> message);
  void Close();
  void Terminate();

  const int Id();
  const inline bool isDisposed() { return isDisposed_; }
  const bool IsRunning();
  const bool IsClosing();
  const int WorkerId();
  const inline napi_env GetMainEnv() { return mainEnv_; }
  const inline napi_env GetWorkerEnv() { return workerEnv_; }
  const inline void MakeWeak() { isWeak_ = true; }
  const inline bool IsWeak() { return isWeak_; }

  static std::shared_ptr<ConcurrentMap<int, WorkerImpl*>> Workers;

 private:
  napi_env mainEnv_;
  napi_env workerEnv_;
  bool isRunning_;
  bool isClosing_;
  std::atomic<bool> isTerminating_;
  bool isDisposed_;
  bool isWeak_;
  std::function<void(napi_env, napi_value jsThis,
                     std::shared_ptr<worker::Message>)>
      onMessage_;
  std::shared_ptr<napi_util::PersistentObject> poWorker_;
  ConcurrentQueue queue_;
  static std::atomic<int> nextId_;
  int workerId_;

  void BackgroundLooper(std::function<napi_env()> func);
  void DrainPendingTasks();
  napi_value ConstructErrorObject(napi_env env, std::string message,
                                  std::string stackTrace);
};

}  // namespace nativescript

#endif  // WORKER_IMPL_H
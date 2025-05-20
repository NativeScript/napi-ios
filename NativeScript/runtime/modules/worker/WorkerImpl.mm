#include <Foundation/Foundation.h>
#include <memory>
#include <string>
#include "ffi/NativeScriptException.h"
#include "js_native_api.h"
#include "js_native_api_types.h"
#include "jsr.h"
#include "native_api_util.h"

#include "WorkerImpl.h"
#include "runtime/Runtime.h"
#include "runtime/Util.h"
#include "runtime/modules/worker/ConcurrentMap.h"

namespace nativescript {

static NSOperationQueue* workers_ = nil;

__attribute((constructor)) void staticInitWorkers() {
  workers_ = [[NSOperationQueue new] init];
  workers_.maxConcurrentOperationCount = 100;
}

WorkerImpl::WorkerImpl(
    napi_env env,
    std::function<void(napi_env, napi_value jsThis, std::shared_ptr<worker::Message>)> onMessage)
    : mainEnv_(env),
      workerEnv_(nullptr),
      isRunning_(false),
      isClosing_(false),
      isTerminating_(false),
      isDisposed_(false),
      isWeak_(false),
      onMessage_(onMessage) {}

const int WorkerImpl::Id() { return this->workerId_; }

const bool WorkerImpl::IsRunning() { return this->isRunning_; }

const bool WorkerImpl::IsClosing() { return this->isClosing_; }

const int WorkerImpl::WorkerId() { return this->workerId_; }

void WorkerImpl::PostMessage(std::shared_ptr<worker::Message> message) {
  if (!this->isTerminating_) {
    this->queue_.Push(message);
  }
}

void WorkerImpl::Start(std::shared_ptr<napi_util::PersistentObject> poWorker,
                       std::function<napi_env()> func) {
  this->poWorker_ = poWorker;
  this->workerId_ = nextId_.fetch_add(1, std::memory_order_relaxed) + 1;

  [workers_ addOperationWithBlock:^{
    this->BackgroundLooper(func);
  }];

  this->isRunning_ = true;
}

napi_value WorkerImpl::GetWorkerObject() {
  if (this->poWorker_ != nullptr) {
    return this->poWorker_->GetValue();
  }
  return nullptr;
}

void WorkerImpl::DrainPendingTasks() {
  std::vector<std::shared_ptr<worker::Message>> messages = this->queue_.PopAll();

  NapiScope scope(this->workerEnv_);
  napi_value global = napi_util::global(this->workerEnv_);

  for (std::shared_ptr<worker::Message> message : messages) {
    if (this->isTerminating_) {
      break;
    }

    this->onMessage_(this->workerEnv_, global, message);

    napi_value exception = nullptr;
    napi_get_and_clear_last_exception(this->workerEnv_, &exception);
    if (exception != nullptr && napi_util::is_of_type(this->workerEnv_, exception, napi_object)) {
      this->CallOnErrorHandlers(this->workerEnv_, exception);
    }

  }
}

void WorkerImpl::BackgroundLooper(std::function<napi_env()> func) {
  if (!this->isTerminating_) {
    CFRunLoopRef runLoop = CFRunLoopGetCurrent();
    this->queue_.Initialize(
        runLoop,
        [](void* info) {
          WorkerImpl* w = static_cast<WorkerImpl*>(info);
          w->DrainPendingTasks();
        },
        this);

    this->workerEnv_ = func();

    
    this->DrainPendingTasks();

    
    // check again as it could terminate before this
    if (!this->isTerminating_) {
      CFRunLoopRun();
    }
  }

  this->isDisposed_ = true;

  Runtime* runtime = Runtime::GetCurrentRuntime();
  delete runtime;
}

void WorkerImpl::Close() { this->isClosing_ = true; }

void WorkerImpl::Terminate() {
  // set terminating to true atomically
  bool wasTerminating = this->isTerminating_.exchange(true);
  if (!wasTerminating) {
    if (this->workerEnv_ != nullptr) {
      // TODO: how to terminate?
      // this->workerEnv_->TerminateExecution();
    }
    this->queue_.Terminate();
    this->isRunning_ = false;
  }
}

void WorkerImpl::CallOnErrorHandlers(napi_env env, napi_value error) {
  if (this->isTerminating_) {
    return;
  }

  napi_value global = napi_util::global(env);

  napi_value onError = napi_util::get_property(env, global, "onerror");

  if (onError != nullptr && napi_util::is_of_type(env, onError, napi_function)) {
    napi_value args[1] = {error};
    napi_value result;
    napi_status status = napi_call_function(env, global, onError, 1, args, &result);
    if (status != napi_ok) {
      napi_get_and_clear_last_exception(env, &result);
      this->PassUncaughtExceptionFromWorkerToMain(env, error);
    }

    napi_value booleanValue;
    napi_coerce_to_bool(env, result, &booleanValue);
    bool handled = false;
    napi_get_value_bool(env, booleanValue, &handled);
    if (handled) {
      // Do nothing, exception is handled and does not need to be raised to the main thread's
      // onerror handler
      return;
    }

    this->PassUncaughtExceptionFromWorkerToMain(env, error);
  }
}

void WorkerImpl::PassUncaughtExceptionFromWorkerToMain(napi_env env, NativeScriptException& ex,
                                                       bool async) {
  Runtime* runtime = Runtime::GetRuntime(mainEnv_);
  if (runtime == nullptr) {
    return;
  }

  ExecuteOnRunLoop(
      runtime->RuntimeLoop(),
      [this, ex]() {
        napi_env env = this->mainEnv_;
        napi_value workerObj = this->poWorker_->GetValue();
        napi_value onError = napi_util::get_property(env, workerObj, "onerror");

        if (onError != nullptr && napi_util::is_of_type(env, onError, napi_function)) {
          napi_value arg;
          napi_create_error(env, napi_util::to_js_string(env, ex.Name()),
                            napi_util::to_js_string(env, ex.Description()), &arg);
          napi_value result;
          napi_call_function(env, workerObj, onError, 1, &arg, &result);
        } else {
          NSLog(@"Uncaught exception in worker: %s", ex.Description().c_str());
        }
      },
      async);
}

void WorkerImpl::PassUncaughtExceptionFromWorkerToMain(napi_env env, napi_value error, bool async) {
  napi_value message = napi_util::get_property(env, error, "message");
  napi_value stackTrace = napi_util::get_property(env, error, "stack");

  std::string messageStr = napi_util::get_cxx_string(env, message);
  std::string stackTraceStr = napi_util::get_cxx_string(env, stackTrace);

  Runtime* runtime = Runtime::GetRuntime(mainEnv_);
  if (runtime == nullptr) {
    return;
  }

  ExecuteOnRunLoop(
      runtime->RuntimeLoop(),
      [this, messageStr, stackTraceStr]() {
        napi_env env = this->mainEnv_;
        napi_value workerObj = this->poWorker_->GetValue();
        napi_value onError = napi_util::get_property(env, workerObj, "onerror");

        if (onError != nullptr && napi_util::is_of_type(env, onError, napi_function)) {
          napi_value arg = this->ConstructErrorObject(env, messageStr, stackTraceStr);
          napi_value result;
          napi_call_function(env, workerObj, onError, 1, &arg, &result);
        } else {
          NSLog(@"Uncaught exception in worker: %s\n  at\n%s", messageStr.c_str(),
                stackTraceStr.c_str());
        }
      },
      async);
}

napi_value WorkerImpl::ConstructErrorObject(napi_env env, std::string message,
                                            std::string stackTrace) {
  napi_value obj;
  napi_create_object(env, &obj);

  napi_value jsMessage = napi_util::to_js_string(env, message);
  napi_value jsStackTrace = napi_util::to_js_string(env, stackTrace);

  napi_set_named_property(env, obj, "message", jsMessage);
  // TODO: stack or stackTrace? Old runtime set stackTrace
  napi_set_named_property(env, obj, "stack", jsStackTrace);

  return obj;
}

std::atomic<int> WorkerImpl::nextId_(0);

std::shared_ptr<ConcurrentMap<int, WorkerImpl*>> WorkerImpl::Workers =
    std::make_shared<ConcurrentMap<int, WorkerImpl*>>();

}  // namespace nativescript

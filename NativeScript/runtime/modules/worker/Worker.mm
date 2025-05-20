#include "Worker.h"
#include <Foundation/NSObjCRuntime.h>
#include <memory>
#include <string>
#include "ffi/NativeScriptException.h"
#include "js_native_api.h"
#include "js_native_api_types.h"
#include "jsr.h"
#include "native_api_util.h"
#include "runtime/Runtime.h"
#include "runtime/Util.h"
#include "runtime/modules/worker/WorkerImpl.h"

namespace nativescript {

void Worker::Init(napi_env env, napi_value global) { Init(env, global, true); }

void Worker::Init(napi_env env, napi_value global, bool isWorkerThread) {
  if (isWorkerThread) {
    napi_property_descriptor globalProperties[] = {
        napi_util::desc("postMessage", PostMessageToMain),
        napi_util::desc("close", CloseWorker),
    };

    napi_define_properties(env, global, 2, globalProperties);
  }

  napi_property_descriptor properties[] = {
      napi_util::desc("postMessage", PostMessage),
      napi_util::desc("terminate", Terminate),
  };

  napi_value Worker;
  napi_define_class(env, "Worker", NAPI_AUTO_LENGTH, Constructor, nullptr, 2, properties, &Worker);

  napi_property_descriptor globalProperties[] = {
      napi_util::desc("Worker", Worker),
  };
  napi_define_properties(env, global, 1, globalProperties);
}

JS_METHOD(Worker::Constructor) {
  try {
    size_t argc = 1;
    napi_value argv[1];
    napi_value jsThis;
    napi_get_cb_info(env, cbinfo, &argc, argv, &jsThis, nullptr);

    std::string workerPath = napi_util::get_cxx_string(env, argv[0]);

    WorkerImpl* worker = new WorkerImpl(env, Worker::OnMessage);
    napi_ref result = nullptr;
    napi_wrap(env, jsThis, worker, Worker::Finalize, nullptr, &result);

    std::shared_ptr<napi_util::PersistentObject> poWorker =
        std::make_shared<napi_util::PersistentObject>(env, result);

    std::function<napi_env()> func([worker, workerPath]() {
      Runtime* runtime = new Runtime();
      runtime->Init(true);
      napi_env env = runtime->GetEnv();

      try {
        NapiScope scope(env);
        runtime->SetWorkerId(worker->WorkerId());
        int workerId = worker->WorkerId();
        Worker::SetWorkerId(env, workerId);
        runtime->RunModule(workerPath);
      } catch (NativeScriptException& ex) {
        NapiScope scope(env);
        worker->PassUncaughtExceptionFromWorkerToMain(env, ex, false);
        worker->Terminate();
      }

      return env;
    });

    worker->Start(poWorker, func);

    int workerId = worker->Id();
    WorkerImpl::Workers->Insert(workerId, worker);

    return jsThis;
  } catch (NativeScriptException& ex) {
    ex.ReThrowToJS(env);
    return nullptr;
  }
}

void Worker::Finalize(napi_env env, void* nativeObject, void* finalize_hint) {
  WorkerImpl* worker = reinterpret_cast<WorkerImpl*>(nativeObject);
  if (worker != nullptr) {
    delete worker;
  }
}

JS_METHOD(Worker::PostMessageToMain) {
  try {
    napi_value argv[1];
    size_t argc = 1;
    napi_value jsThis;
    napi_get_cb_info(env, cbinfo, &argc, argv, &jsThis, nullptr);

    if (argc < 1) {
      throw NativeScriptException("Not enough arguments.");
      return nullptr;
    }

    if (argc > 1) {
      throw NativeScriptException("Too many arguments passed.");
      return nullptr;
    }

    int workerId = Worker::GetWorkerId(env, jsThis);
    WorkerImpl* worker = WorkerImpl::Workers->Get(workerId);

    if (worker == nullptr) {
      throw NativeScriptException("Worker is not initialized.");
      return nullptr;
    }

    if (!worker->IsRunning()) {
      return nullptr;
    }

    auto message = std::make_shared<worker::Message>();
    napi_value object;
    napi_create_object(env, &object);
    napi_set_named_property(env, object, "data", argv[0]);
    message->Serialize(env, object);

    napi_env mainEnv = worker->GetMainEnv();

    CFRunLoopRef queue = Runtime::GetRuntime(mainEnv)->RuntimeLoop();

    ExecuteOnRunLoop(
        queue,
        [mainEnv, worker, message] {
          NapiScope scope(mainEnv);
          napi_value global = napi_util::global(mainEnv);
          napi_value workerInstance = worker->GetWorkerObject();
          Worker::OnMessage(mainEnv, workerInstance, message);
        },
        true);
  } catch (NativeScriptException& ex) {
    ex.ReThrowToJS(env);
  }

  return nullptr;
}

JS_METHOD(Worker::PostMessage) {
  try {
    napi_value argv[1];
    size_t argc = 1;
    napi_value jsThis;
    napi_get_cb_info(env, cbinfo, &argc, argv, &jsThis, nullptr);

    if (argc < 1) {
      throw NativeScriptException("Not enough arguments.");
      return nullptr;
    }

    if (argc > 1) {
      throw NativeScriptException("Too many arguments passed.");
      return nullptr;
    }

    WorkerImpl* worker = nullptr;
    napi_unwrap(env, jsThis, reinterpret_cast<void**>(&worker));

    if (worker == nullptr) {
      throw NativeScriptException("Worker is not initialized.");
      return nullptr;
    }

    if (!worker->IsRunning() || worker->IsClosing()) {
      return nullptr;
    }

    auto message = std::make_shared<worker::Message>();

    napi_value object;
    napi_create_object(env, &object);

    napi_set_named_property(env, object, "data", argv[0]);

    message->Serialize(env, object);
    worker->PostMessage(message);
  } catch (NativeScriptException& ex) {
    ex.ReThrowToJS(env);
  }

  return nullptr;
}

void Worker::OnMessage(napi_env env, napi_value receiver,
                       std::shared_ptr<worker::Message> message) {
  napi_value onMessageFunc = nullptr;
  napi_status status = napi_get_named_property(env, receiver, "onmessage", &onMessageFunc);

  if (!napi_util::is_of_type(env, onMessageFunc, napi_function)) {
    return;
  }

  napi_value result;
  napi_value arg = message->Deserialize(env);

  status = napi_call_function(env, receiver, onMessageFunc, 1, &arg, &result);

  if (status != napi_ok) {
    if (status == napi_pending_exception) {
      napi_value exception;
      napi_get_and_clear_last_exception(env, &exception);
      if (exception != nullptr && napi_util::is_of_type(env, exception, napi_object)) {
        napi_value stack = napi_util::get_property(env, exception, "stack");
        if (stack != nullptr) {
          std::string stackStr = napi_util::get_cxx_string(env, stack);
          NSLog(@"Worker::OnMessage - exception stack: %s", stackStr.c_str());
        }
      }
    }

    return;
  }
}

JS_METHOD(Worker::CloseWorker) {
  napi_value jsThis;
  napi_get_cb_info(env, cbinfo, nullptr, nullptr, &jsThis, nullptr);

  WorkerImpl* worker = nullptr;
  napi_unwrap(env, jsThis, reinterpret_cast<void**>(&worker));

  if (worker == nullptr) {
    throw NativeScriptException("Worker is not initialized.");
    return nullptr;
  }

  if (!worker->IsRunning() || worker->IsClosing()) {
    return nullptr;
  }

  worker->Close();

  napi_value oncloseVal;
  napi_get_named_property(env, jsThis, "onclose", &oncloseVal);

  if (!napi_util::is_of_type(env, oncloseVal, napi_function)) {
    return nullptr;
  }

  napi_value result;
  napi_status status = napi_call_function(env, jsThis, oncloseVal, 0, nullptr, &result);
  if (status != napi_ok) {
    napi_value exception;
    napi_get_and_clear_last_exception(env, &exception);
    if (exception != nullptr && napi_util::is_of_type(env, exception, napi_object)) {
      worker->CallOnErrorHandlers(env, exception);
    }
  }

  return nullptr;
}

JS_METHOD(Worker::Terminate) {
  napi_value jsThis;
  napi_get_cb_info(env, cbinfo, nullptr, nullptr, &jsThis, nullptr);

  WorkerImpl* worker = nullptr;
  napi_unwrap(env, jsThis, reinterpret_cast<void**>(&worker));

  if (worker == nullptr) {
    throw NativeScriptException("Worker is not initialized.");
    return nullptr;
  }

  worker->Terminate();

  return nullptr;
}

napi_value Worker::Serialize(napi_env env, napi_value value) {
  // Local<Context> context = isolate->GetCurrentContext();
  // Local<ObjectTemplate> objTemplate = ObjectTemplate::New(isolate);

  // Local<Object> obj;
  // bool success = objTemplate->NewInstance(context).ToLocal(&obj);
  // tns::Assert(success, isolate);

  // success = obj->Set(context, tns::ToV8String(isolate, "data"), value).FromMaybe(false);
  // tns::Assert(success, isolate);

  // Local<Value> result;
  // TryCatch tc(isolate);
  // success = v8::JSON::Stringify(context, obj).ToLocal(&result);
  // if (!success && tc.HasCaught()) {
  //     error = tc.Exception();
  //     return Local<v8::String>();
  // }

  // tns::Assert(success, isolate);

  // return result.As<v8::String>();

  return nullptr;
}

void Worker::SetWorkerId(napi_env env, int workerId) {
  napi_value global = napi_util::global(env);

  // TODO: make this a private property
  napi_set_named_property(env, global, "__private_worker_id__",
                          napi_util::to_js_number(env, workerId));
}

int Worker::GetWorkerId(napi_env env, napi_value global) {
  napi_value workerIdVal;
  napi_get_named_property(env, global, "__private_worker_id__", &workerIdVal);
  if (napi_util::is_of_type(env, workerIdVal, napi_number)) {
    return napi_util::get_int32(env, workerIdVal);
  }

  return -1;
}

}  // namespace nativescript

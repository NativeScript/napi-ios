#include <mutex>
#include "js_native_api.h"
#include "js_native_tsfn.h"

struct napi_threadsafe_function__ {
  napi_env env;
  std::mutex mutex;
  int64_t refcount;

  void *context;

  void* thread_finalize_data;
  napi_finalize thread_finalize_cb;

  napi_value js_value;
  napi_threadsafe_function_call_js call_js_cb;
};

napi_status napi_create_threadsafe_function(napi_env env,
                                            napi_value func,
                                            napi_value async_resource,
                                            napi_value async_resource_name,
                                            size_t max_queue_size,
                                            size_t initial_thread_count,
                                            void* thread_finalize_data,
                                            napi_finalize thread_finalize_cb,
                                            void* context,
                                            napi_threadsafe_function_call_js call_js_cb,
                                            napi_threadsafe_function* result) {
  auto fn = new napi_threadsafe_function__{};
  fn->env = env;
  fn->js_value = func;
  fn->refcount = initial_thread_count;
  fn->thread_finalize_data = thread_finalize_data;
  fn->thread_finalize_cb = thread_finalize_cb;
  fn->context = context;
  fn->call_js_cb = call_js_cb;
  *result = fn;
  return napi_ok;
}

napi_status napi_get_threadsafe_function_context(napi_threadsafe_function funcOpaque,
                                                 void** result) {
  auto func = static_cast<napi_threadsafe_function__*>(funcOpaque);
  if (!func) return napi_invalid_arg;
  *result = func->context;
  return napi_ok;
}

// called on js thread
void release_threadsafe_function(void *context) {
  auto fn = static_cast<napi_threadsafe_function__*>(context);
  fn->env->all_tsfns.erase(fn);
  napi_unref_threadsafe_function(fn->env, fn);
  fn->thread_finalize_cb(fn->env, fn->thread_finalize_data, nullptr);
  delete fn;
}

struct tsfn_call_context {
  napi_threadsafe_function__ *func;
  void *data;
};

// called inside env
void _call_threadsafe_function(void *context) {
  auto ctx_ptr = static_cast<tsfn_call_context *>(context);
  auto ctx = *ctx_ptr;
  delete ctx_ptr;
  auto func = ctx.func;
  if (func->js_value) {
    napi_value undefined{};
    napi_get_undefined(func->env, &undefined);
    napi_call_function(func->env, undefined, func->js_value, 0, nullptr, nullptr);
  } else {
    func->call_js_cb(func->env, func->js_value, func->context, ctx.data);
  }
}

napi_status napi_call_threadsafe_function(napi_threadsafe_function funcOpaque,
                                          void* data,
                                          napi_threadsafe_function_call_mode is_blocking) {
  auto func = static_cast<napi_threadsafe_function__*>(funcOpaque);
  func->env->executor.dispatch_async(func->env->executor.context,
                                     _call_threadsafe_function,
                                     new tsfn_call_context { func, data });
  return napi_ok;
}

napi_status napi_acquire_threadsafe_function(napi_threadsafe_function funcOpaque) {
  auto func = static_cast<napi_threadsafe_function__*>(funcOpaque);
  std::lock_guard mutex(func->mutex);
  if (func->refcount == -1) return napi_closing;
  ++func->refcount;
  return napi_ok;
}

napi_status napi_release_threadsafe_function(napi_threadsafe_function funcOpaque,
                                             napi_threadsafe_function_release_mode mode) {
  auto func = static_cast<napi_threadsafe_function__*>(funcOpaque);
  bool closing = false;
  do {
    std::lock_guard mutex(func->mutex);
    if (func->refcount == 0) { // already closed
      return napi_closing;
    } else if (mode == napi_tsfn_abort) {
      closing = true;
      func->refcount = 0;
    } else if (--func->refcount == 0) {
      closing = true;
    }
  } while (0);
  if (closing) {
    func->env->executor.dispatch_async(func->env->executor.context, release_threadsafe_function, func);
  }
  return napi_ok;
}

napi_status napi_ref_threadsafe_function(napi_env env, napi_threadsafe_function funcOpaque) {
  auto func = static_cast<napi_threadsafe_function__*>(funcOpaque);
  env->strong_tsfns.insert(func);
  return napi_ok;
}

napi_status napi_unref_threadsafe_function(napi_env env, napi_threadsafe_function funcOpaque) {
  auto func = static_cast<napi_threadsafe_function__*>(funcOpaque);
  auto it = env->strong_tsfns.find(func);
  if (it != env->strong_tsfns.end()) {
    env->strong_tsfns.erase(it);
    env->check_empty();
  }
  return napi_ok;
}

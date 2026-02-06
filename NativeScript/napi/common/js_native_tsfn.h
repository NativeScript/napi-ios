#ifndef JS_NATIVE_TSFN_H_
#define JS_NATIVE_TSFN_H_

#include "js_native_api.h"
#include <cstddef>
#include <cwchar>

typedef void* napi_threadsafe_function;

typedef void (*napi_threadsafe_function_call_js)(napi_env env, napi_value js_cb,
                                                 void* context, void* data);

extern "C" NAPI_EXTERN napi_status napi_create_threadsafe_function(
    napi_env env, napi_value func, napi_value async_resource,
    napi_value async_resource_name, size_t max_queue_size,
    size_t initial_thread_count, void* thread_finalize_data,
    napi_finalize thread_finalize_cb, void* context,
    napi_threadsafe_function_call_js call_js_cb,
    napi_threadsafe_function* result);

enum napi_threadsafe_function_release_mode {
  napi_tsfn_release,
  napi_tsfn_abort
};

extern "C" NAPI_EXTERN napi_status
napi_acquire_threadsafe_function(napi_threadsafe_function func);

extern "C" NAPI_EXTERN napi_status napi_release_threadsafe_function(
    napi_threadsafe_function func, napi_threadsafe_function_release_mode mode);

enum napi_threadsafe_function_call_mode {
  napi_tsfn_blocking,
  napi_tsfn_nonblocking
};

extern "C" NAPI_EXTERN napi_status
napi_call_threadsafe_function(napi_threadsafe_function func, void* data,
                              napi_threadsafe_function_call_mode is_blocking);

extern "C" NAPI_EXTERN napi_status
napi_unref_threadsafe_function(napi_env env, napi_threadsafe_function func);

#endif

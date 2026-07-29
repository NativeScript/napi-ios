//
// Created by Ammar Ahmed on 09/02/2025.
//

#ifndef TEST_APP_QUICKS_RUNTIME_H
#define TEST_APP_QUICKS_RUNTIME_H
#include "js_native_api.h"
#include "quickjs.h"

// The opaque runtime handle used to live in js_native_api_types.h; it now lives
// in jsr_common.h, which this header cannot include (quickjs-api.c is C and only
// needs the handle, not the JSR entry points). Redeclaring the typedef is legal
// and matches how v8/jsr.h and jsc/jsr.h carry their own copies.
typedef struct jsr_ns_runtime__* jsr_ns_runtime;

EXTERN_C_START

NAPI_EXTERN napi_status NAPI_CDECL qjs_create_runtime(jsr_ns_runtime* runtime);

NAPI_EXTERN napi_status NAPI_CDECL qjs_create_napi_env(napi_env* env,
                                                       jsr_ns_runtime runtime);

NAPI_EXTERN napi_status NAPI_CDECL qjs_free_napi_env(napi_env env);

NAPI_EXTERN napi_status NAPI_CDECL qjs_free_runtime(jsr_ns_runtime runtime);

NAPI_EXTERN napi_status NAPI_CDECL qjs_execute_script(napi_env env,
                                                      napi_value script,
                                                      const char* file,
                                                      napi_value* result);

NAPI_EXTERN napi_status NAPI_CDECL
qjs_runtime_before_gc_callback(napi_env env, napi_finalize cb, void* data);

NAPI_EXTERN napi_status NAPI_CDECL
qjs_runtime_after_gc_callback(napi_env env, napi_finalize cb, void* data);

NAPI_EXTERN napi_status NAPI_CDECL qjs_execute_pending_jobs(napi_env env);

NAPI_EXTERN napi_status NAPI_CDECL qjs_update_stack_top(napi_env env);

NAPI_EXTERN JSContext* NAPI_CDECL qjs_get_context(napi_env env);

NAPI_EXTERN JSRuntime* NAPI_CDECL qjs_get_runtime(napi_env env);

NAPI_EXTERN void NAPI_CDECL
qjs_shared_array_buffer_data_retain(uint8_t* data);

NAPI_EXTERN void NAPI_CDECL
qjs_shared_array_buffer_data_release(uint8_t* data);

NAPI_EXTERN napi_status NAPI_CDECL qjs_create_scoped_value(napi_env env,
                                                           JSValue value,
                                                           napi_value* result);

EXTERN_C_END

#endif  // TEST_APP_QUICKS_RUNTIME_H

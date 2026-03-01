#include "js_native_api.h"
#include "js_native_api_types.h"
#include "jsr.h"
#ifdef __APPLE__

#import <Foundation/Foundation.h>
#include <dispatch/dispatch.h>
#include <objc/runtime.h>
#include <cmath>
#include <atomic>
#include "Timers.h"

static std::atomic<int> gActiveTimers{0};

@interface NSTimerHandle : NSObject {
 @public
  NSTimer* timer;
  napi_env env;
  napi_ref callback;
  bool activeCounted;
}
@end

@implementation NSTimerHandle
- (void)dealloc {
  if (activeCounted) {
    gActiveTimers.fetch_sub(1, std::memory_order_relaxed);
    activeCounted = false;
  }
  timer = nil;
  [super dealloc];
}
@end

namespace {
const void* kTimerHandleAssociationKey = &kTimerHandleAssociationKey;

void MarkTimerActive(NSTimerHandle* handle) {
  if (handle == nil) {
    return;
  }

  @synchronized(handle) {
    if (!handle->activeCounted) {
      handle->activeCounted = true;
      gActiveTimers.fetch_add(1, std::memory_order_relaxed);
    }
  }
}

void AddTimerToMainRunLoop(NSTimer* timer) {
  if (timer == nil) {
    return;
  }

  auto addTimer = ^{
    if ([timer isValid]) {
      [[NSRunLoop mainRunLoop] addTimer:timer forMode:NSDefaultRunLoopMode];
    }
  };

  if ([NSThread isMainThread]) {
    addTimer();
    return;
  }

  dispatch_sync(dispatch_get_main_queue(), addTimer);
}

void DisposeTimerHandle(napi_env callEnv, NSTimerHandle* handle,
                        bool invalidateTimer = true) {
  if (handle == nil) {
    return;
  }

  auto disposeTimer = ^{
    @synchronized(handle) {
      if (handle->timer != nil) {
        NSTimer* rawTimer = handle->timer;
        objc_setAssociatedObject(rawTimer, kTimerHandleAssociationKey, nil,
                                 OBJC_ASSOCIATION_ASSIGN);
        if (invalidateTimer && [rawTimer isValid]) {
          [rawTimer invalidate];
        }
        handle->timer = nil;
      }
    }
  };

  if ([NSThread isMainThread]) {
    disposeTimer();
  } else {
    dispatch_sync(dispatch_get_main_queue(), disposeTimer);
  }

  napi_ref callback = nullptr;
  bool shouldDecrementActiveCount = false;
  @synchronized(handle) {
    if (handle->activeCounted) {
      handle->activeCounted = false;
      shouldDecrementActiveCount = true;
    }
    callback = handle->callback;
    handle->callback = nullptr;
  }

  if (shouldDecrementActiveCount) {
    gActiveTimers.fetch_sub(1, std::memory_order_relaxed);
  }

  napi_env cleanupEnv = callEnv != nullptr ? callEnv : handle->env;
  if (cleanupEnv != nullptr && callback != nullptr) {
    napi_delete_reference(cleanupEnv, callback);
  }
}
}  // namespace

namespace nativescript {

JS_CLASS_INIT(Timers::Init) {
  const napi_property_descriptor properties[] = {
      napi_util::desc("setTimeout", SetTimeout),
      napi_util::desc("setInterval", SetInterval),
      napi_util::desc("clearTimeout", ClearTimer),
      napi_util::desc("clearInterval", ClearTimer),
      napi_util::desc("queueMicrotask", QueueMicrotask),
      napi_util::desc("__ns__setTimeout", SetTimeout),
      napi_util::desc("__ns__setInterval", SetInterval),
      napi_util::desc("__ns__clearTimeout", ClearTimer),
      napi_util::desc("__ns__clearInterval", ClearTimer),
      napi_util::desc("__ns__queueMicrotask", QueueMicrotask),
  };

  napi_define_properties(env, global, 10, properties);
}

JS_METHOD(Timers::SetTimeout) {
  size_t argc = 2;
  napi_value argv[2];
  napi_get_cb_info(env, cbinfo, &argc, argv, nullptr, nullptr);

  double ms = 0;
  if (argc > 1) {
    napi_get_value_double(env, argv[1], &ms);
  }
  if (ms < 0 || !std::isfinite(ms)) {
    ms = 0;
  }

  NSTimeInterval interval = ms / 1000;

  napi_ref callback;
  napi_create_reference(env, argv[0], 1, &callback);

  NSTimerHandle* handle = [[NSTimerHandle alloc] init];
  handle->env = env;
  handle->callback = callback;
  handle->activeCounted = false;
  // Keep one retain owned by the JS external handle.
  [handle retain];
  MarkTimerActive(handle);

  NSTimer* timer = [NSTimer
      timerWithTimeInterval:interval
                    repeats:NO
                      block:^(NSTimer* timer) {
                        NSTimerHandle* handle = (NSTimerHandle*)objc_getAssociatedObject(
                            timer, kTimerHandleAssociationKey);
                        if (handle == nil) {
                          return;
                        }
                        [handle retain];

                        napi_env callbackEnv = nullptr;
                        napi_ref callbackRef = nullptr;
                        @synchronized(handle) {
                          callbackEnv = handle->env;
                          callbackRef = handle->callback;
                        }

                        if (callbackEnv == nullptr || callbackRef == nullptr) {
                          [handle release];
                          return;
                        }

                        NapiScope scope(callbackEnv);
                        napi_value global, callbackValue;
                        napi_get_global(callbackEnv, &global);
                        napi_get_reference_value(callbackEnv, callbackRef, &callbackValue);
                        napi_call_function(callbackEnv, global, callbackValue, 0, nullptr, nullptr);

                        // One-shot timers are already in-flight here; avoid
                        // invalidating during callback teardown.
                        DisposeTimerHandle(callbackEnv, handle, false);
                        [handle release];
                      }];

  handle->timer = timer;
  objc_setAssociatedObject(timer, kTimerHandleAssociationKey, handle,
                           OBJC_ASSOCIATION_RETAIN_NONATOMIC);

  napi_value result;
  napi_create_external(
      env, handle,
      [](napi_env env, void* data, void* /*hint*/) {
        NSTimerHandle* handle = static_cast<NSTimerHandle*>(data);
        if (handle == nil) {
          return;
        }
        [handle release];
      },
      nullptr, &result);
  // Drop creator ownership. Remaining ownership is timer association + JS external.
  [handle release];

  AddTimerToMainRunLoop(timer);

  return result;
}

JS_METHOD(Timers::SetInterval) {
  size_t argc = 2;
  napi_value argv[2];
  napi_get_cb_info(env, cbinfo, &argc, argv, nullptr, nullptr);

  double ms = 0;
  if (argc > 1) {
    napi_get_value_double(env, argv[1], &ms);
  }
  if (ms < 0 || !std::isfinite(ms)) {
    ms = 0;
  }

  NSTimeInterval interval = ms / 1000;

  napi_ref callback;
  napi_create_reference(env, argv[0], 1, &callback);

  NSTimerHandle* handle = [[NSTimerHandle alloc] init];
  handle->env = env;
  handle->callback = callback;
  handle->activeCounted = false;
  // Keep one retain owned by the JS external handle.
  [handle retain];
  MarkTimerActive(handle);

  NSTimer* timer = [NSTimer
      timerWithTimeInterval:interval
                    repeats:YES
                      block:^(NSTimer* timer) {
                        NSTimerHandle* handle = (NSTimerHandle*)objc_getAssociatedObject(
                            timer, kTimerHandleAssociationKey);
                        if (handle == nil) {
                          return;
                        }
                        [handle retain];

                        napi_env callbackEnv = nullptr;
                        napi_ref callbackRef = nullptr;
                        @synchronized(handle) {
                          callbackEnv = handle->env;
                          callbackRef = handle->callback;
                        }

                        if (callbackEnv == nullptr || callbackRef == nullptr) {
                          [handle release];
                          return;
                        }

                        NapiScope scope(callbackEnv);
                        napi_value global, callbackValue;
                        napi_get_global(callbackEnv, &global);
                        napi_get_reference_value(callbackEnv, callbackRef, &callbackValue);
                        napi_call_function(callbackEnv, global, callbackValue, 0, nullptr, nullptr);
                        [handle release];
                      }];

  handle->timer = timer;
  objc_setAssociatedObject(timer, kTimerHandleAssociationKey, handle,
                           OBJC_ASSOCIATION_RETAIN_NONATOMIC);

  napi_value result;
  napi_create_external(
      env, handle,
      [](napi_env env, void* data, void* /*hint*/) {
        NSTimerHandle* handle = static_cast<NSTimerHandle*>(data);
        if (handle == nil) {
          return;
        }
        [handle release];
      },
      nullptr, &result);
  // Drop creator ownership. Remaining ownership is timer association + JS external.
  [handle release];

  AddTimerToMainRunLoop(timer);

  return result;
}

JS_METHOD(Timers::ClearTimer) {
  size_t argc = 1;
  napi_value argv[1];
  napi_get_cb_info(env, cbinfo, &argc, argv, nullptr, nullptr);

  if (argc < 1 || argv[0] == nullptr) {
    return nullptr;
  }

  napi_valuetype type;
  napi_typeof(env, argv[0], &type);
  if (type != napi_external) {
    return nullptr;
  }

  void* rawHandle = nullptr;
  napi_get_value_external(env, argv[0], &rawHandle);
  NSTimerHandle* handle = static_cast<NSTimerHandle*>(rawHandle);
  if (handle == nil) {
    return nullptr;
  }
  [handle retain];
  DisposeTimerHandle(env, handle);
  [handle release];

  return nullptr;
}

JS_METHOD(Timers::QueueMicrotask) {
  size_t argc = 1;
  napi_value argv[1];
  napi_get_cb_info(env, cbinfo, &argc, argv, nullptr, nullptr);

  if (argc < 1 || argv[0] == nullptr) {
    napi_throw_type_error(env, nullptr,
                          "The \"callback\" argument must be of type function");
    return nullptr;
  }

  napi_valuetype callbackType;
  if (napi_typeof(env, argv[0], &callbackType) != napi_ok ||
      callbackType != napi_function) {
    napi_throw_type_error(env, nullptr,
                          "The \"callback\" argument must be of type function");
    return nullptr;
  }

  napi_value global;
  napi_get_global(env, &global);

  napi_value promiseCtor;
  if (napi_get_named_property(env, global, "Promise", &promiseCtor) != napi_ok) {
    napi_throw_error(env, nullptr, "Promise is not available");
    return nullptr;
  }

  napi_value resolveFn;
  if (napi_get_named_property(env, promiseCtor, "resolve", &resolveFn) != napi_ok) {
    napi_throw_error(env, nullptr, "Promise.resolve is not available");
    return nullptr;
  }

  napi_value undefinedValue;
  napi_get_undefined(env, &undefinedValue);

  napi_value promise;
  napi_value resolveArgs[1] = {undefinedValue};
  if (napi_call_function(env, promiseCtor, resolveFn, 1, resolveArgs, &promise) !=
      napi_ok) {
    return nullptr;
  }

  napi_value thenFn;
  if (napi_get_named_property(env, promise, "then", &thenFn) != napi_ok) {
    napi_throw_error(env, nullptr, "Promise.then is not available");
    return nullptr;
  }

  if (napi_call_function(env, promise, thenFn, 1, argv, nullptr) != napi_ok) {
    return nullptr;
  }

  return napi_util::undefined(env);
}

bool Timers::HasActiveTimers() {
  return gActiveTimers.load(std::memory_order_relaxed) > 0;
}

}  // namespace nativescript

#endif  // __APPLE__

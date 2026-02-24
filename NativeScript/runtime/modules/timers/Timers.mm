#include "js_native_api.h"
#include "js_native_api_types.h"
#include "jsr.h"
#ifdef __APPLE__

#import <Foundation/Foundation.h>
#include <dispatch/dispatch.h>
#include <objc/runtime.h>
#include <cmath>
#include "Timers.h"

@interface NSTimerHandle : NSObject {
 @public
  NSTimer* timer;
  napi_env env;
  napi_ref callback;
}
@end

@implementation NSTimerHandle
- (void)dealloc {
  if (timer != nil) {
    [timer release];
    timer = nil;
  }
  [super dealloc];
}
@end

namespace {
const void* kTimerHandleAssociationKey = &kTimerHandleAssociationKey;

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

void DisposeTimerHandle(napi_env callEnv, NSTimerHandle* handle) {
  if (handle == nil) {
    return;
  }

  if (handle->timer != nil) {
    NSTimer* rawTimer = handle->timer;
    objc_setAssociatedObject(rawTimer, kTimerHandleAssociationKey, nil, OBJC_ASSOCIATION_ASSIGN);
    [rawTimer invalidate];
    [rawTimer release];
    handle->timer = nil;
  }

  napi_env cleanupEnv = callEnv != nullptr ? callEnv : handle->env;
  if (cleanupEnv != nullptr && handle->callback != nullptr) {
    napi_delete_reference(cleanupEnv, handle->callback);
    handle->callback = nullptr;
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
      napi_util::desc("__ns__setTimeout", SetTimeout),
      napi_util::desc("__ns__setInterval", SetInterval),
      napi_util::desc("__ns__clearTimeout", ClearTimer),
      napi_util::desc("__ns__clearInterval", ClearTimer),
  };

  napi_define_properties(env, global, 8, properties);
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

  NSTimer* timer = [NSTimer
      timerWithTimeInterval:interval
                    repeats:NO
                      block:^(NSTimer* timer) {
                        NSTimerHandle* handle = (NSTimerHandle*)objc_getAssociatedObject(
                            timer, kTimerHandleAssociationKey);
                        if (handle == nil || handle->callback == nullptr) {
                          return;
                        }
                        [handle retain];

                        NapiScope scope(handle->env);
                        napi_value global, callbackValue;
                        napi_get_global(handle->env, &global);
                        napi_get_reference_value(handle->env, handle->callback, &callbackValue);
                        napi_call_function(handle->env, global, callbackValue, 0, nullptr, nullptr);

                        napi_delete_reference(handle->env, handle->callback);
                        handle->callback = nullptr;
                        objc_setAssociatedObject(timer, kTimerHandleAssociationKey, nil,
                                                 OBJC_ASSOCIATION_ASSIGN);
                        if (handle->timer != nil) {
                          [handle->timer release];
                          handle->timer = nil;
                        }
                        [handle release];
                      }];

  handle->timer = [timer retain];
  objc_setAssociatedObject(timer, kTimerHandleAssociationKey, handle,
                           OBJC_ASSOCIATION_RETAIN_NONATOMIC);

  napi_value result;
  napi_create_external(
      env, handle,
      [](napi_env env, void* data, void* /*hint*/) {
        NSTimerHandle* handle = (NSTimerHandle*)data;
        [handle release];
      },
      nullptr, &result);

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

  NSTimer* timer = [NSTimer
      timerWithTimeInterval:interval
                    repeats:YES
                      block:^(NSTimer* timer) {
                        NSTimerHandle* handle = (NSTimerHandle*)objc_getAssociatedObject(
                            timer, kTimerHandleAssociationKey);
                        if (handle == nil || handle->callback == nullptr) {
                          return;
                        }
                        [handle retain];

                        NapiScope scope(handle->env);
                        napi_value global, callbackValue;
                        napi_get_global(handle->env, &global);
                        napi_get_reference_value(handle->env, handle->callback, &callbackValue);
                        napi_call_function(handle->env, global, callbackValue, 0, nullptr, nullptr);
                        [handle release];
                      }];

  handle->timer = [timer retain];
  objc_setAssociatedObject(timer, kTimerHandleAssociationKey, handle,
                           OBJC_ASSOCIATION_RETAIN_NONATOMIC);

  napi_value result;
  napi_create_external(
      env, handle,
      [](napi_env env, void* data, void* /*hint*/) {
        NSTimerHandle* handle = (NSTimerHandle*)data;
        [handle release];
      },
      nullptr, &result);

  AddTimerToMainRunLoop(timer);

  return result;
}

JS_METHOD(Timers::ClearTimer) {
  size_t argc = 1;
  napi_value argv[1];
  napi_get_cb_info(env, cbinfo, &argc, argv, nullptr, nullptr);

  napi_valuetype type;
  napi_typeof(env, argv[0], &type);
  if (type != napi_external) {
    return nullptr;
  }

  void* rawHandle = nullptr;
  napi_get_value_external(env, argv[0], &rawHandle);
  NSTimerHandle* handle = (NSTimerHandle*)rawHandle;
  DisposeTimerHandle(env, handle);

  return nullptr;
}

}  // namespace nativescript

#endif  // __APPLE__

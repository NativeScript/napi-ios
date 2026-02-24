#include "js_native_api.h"
#include "js_native_api_types.h"
#include "jsr.h"
#ifdef __APPLE__

#import <Foundation/Foundation.h>
#include <dispatch/dispatch.h>
#include <objc/runtime.h>
#include <cmath>
#include <mutex>
#include <unordered_set>
#include "Timers.h"

@interface NSTimerHandle : NSObject {
 @public
  NSTimer* timer;
  napi_env env;
  napi_ref callback;
}
@end

namespace {
std::mutex& TimerHandlesMutex();
std::unordered_set<NSTimerHandle*>& ActiveTimerHandles();
NSTimerHandle* RetainActiveTimerHandle(void* rawHandle);
}  // namespace

@implementation NSTimerHandle
- (void)dealloc {
  {
    std::lock_guard<std::mutex> guard(TimerHandlesMutex());
    ActiveTimerHandles().erase(self);
  }

  timer = nil;
  [super dealloc];
}
@end

namespace {
std::mutex& TimerHandlesMutex() {
  static std::mutex mutex;
  return mutex;
}

std::unordered_set<NSTimerHandle*>& ActiveTimerHandles() {
  static std::unordered_set<NSTimerHandle*> activeHandles;
  return activeHandles;
}

NSTimerHandle* RetainActiveTimerHandle(void* rawHandle) {
  NSTimerHandle* handle = static_cast<NSTimerHandle*>(rawHandle);
  if (handle == nil) {
    return nil;
  }

  std::lock_guard<std::mutex> guard(TimerHandlesMutex());
  if (ActiveTimerHandles().find(handle) == ActiveTimerHandles().end()) {
    return nil;
  }

  [handle retain];
  return handle;
}

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

  auto disposeTimer = ^{
    @synchronized(handle) {
      if (handle->timer != nil) {
        NSTimer* rawTimer = handle->timer;
        objc_setAssociatedObject(rawTimer, kTimerHandleAssociationKey, nil,
                                 OBJC_ASSOCIATION_ASSIGN);
        [rawTimer invalidate];
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
  @synchronized(handle) {
    callback = handle->callback;
    handle->callback = nullptr;
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
  {
    std::lock_guard<std::mutex> guard(TimerHandlesMutex());
    ActiveTimerHandles().insert(handle);
  }

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

                        DisposeTimerHandle(callbackEnv, handle);
                        [handle release];
                      }];

  handle->timer = timer;
  objc_setAssociatedObject(timer, kTimerHandleAssociationKey, handle,
                           OBJC_ASSOCIATION_RETAIN_NONATOMIC);

  napi_value result;
  napi_create_external(
      env, handle,
      [](napi_env env, void* data, void* /*hint*/) {
        NSTimerHandle* handle = RetainActiveTimerHandle(data);
        if (handle == nil) {
          return;
        }
        [handle release];
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
  {
    std::lock_guard<std::mutex> guard(TimerHandlesMutex());
    ActiveTimerHandles().insert(handle);
  }

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
        NSTimerHandle* handle = RetainActiveTimerHandle(data);
        if (handle == nil) {
          return;
        }
        [handle release];
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
  NSTimerHandle* handle = RetainActiveTimerHandle(rawHandle);
  if (handle == nil) {
    return nullptr;
  }
  DisposeTimerHandle(env, handle);
  [handle release];

  return nullptr;
}

}  // namespace nativescript

#endif  // __APPLE__

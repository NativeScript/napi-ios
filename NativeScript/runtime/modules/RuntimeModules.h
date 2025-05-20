#ifndef RUNTIMEMODULES_H
#define RUNTIMEMODULES_H

#include "console/Console.h"
#include "js_native_api_types.h"
#include "performance/Performance.h"
#include "runtime/RuntimeConfig.h"
#include "runtime/modules/module/ModuleInternal.h"
#include "runtime/modules/worker/Worker.h"
#include "url/URL.h"
#include "url/URLSearchParams.h"
#ifdef __APPLE__
#include "app/App.h"
#include "timers/Timers.h"
#endif  // __APPLE__

namespace nativescript {

class RuntimeModules {
 public:
  inline RuntimeModules() {}

  inline void Init(napi_env env, napi_value global) {
    module.Init(env, RuntimeConfig.BaseDir);

    URL::Init(env, global);
    URLSearchParams::Init(env, global);

    Console::Init(env, global);
    Performance::Init(env, global);

#ifdef __APPLE__
    App::Init(env);
    Timers::Init(env, global);
#endif  // __APPLE__

    Worker::Init(env, global);
  }

  inline void DeInit() { module.DeInit(); }

  ModuleInternal module;
};

}  // namespace nativescript

#endif  // RUNTIMEMODULES_H

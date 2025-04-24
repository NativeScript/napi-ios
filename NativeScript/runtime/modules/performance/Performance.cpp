#include "Performance.h"

#include "js_native_api.h"
#include "mach/mach_time.h"
#include "native_api_util.h"

namespace nativescript {

JS_CLASS_INIT(Performance::Init) {
  napi_value Performance, performance;

  const napi_property_descriptor properties[] = {
      {
          .utf8name = "now",
          .name = nullptr,
          .method = Now,
          .getter = nullptr,
          .setter = nullptr,
          .value = nullptr,
          .attributes = napi_default,
          .data = nullptr,
      },
  };

  napi_define_class(env, "Performance", NAPI_AUTO_LENGTH,
                    Performance::Constructor, nullptr, 1, properties,
                    &Performance);

  napi_new_instance(env, Performance, 0, nullptr, &performance);

  const napi_property_descriptor globalProperties[] = {
      {
          .utf8name = "performance",
          .name = nullptr,
          .method = nullptr,
          .getter = nullptr,
          .setter = nullptr,
          .value = performance,
          .attributes = napi_default,
          .data = nullptr,
      },
  };

  napi_define_properties(env, global, 1, globalProperties);
}

JS_METHOD(Performance::Constructor) {
  napi_value thisArg;
  napi_get_cb_info(env, cbinfo, nullptr, nullptr, &thisArg, nullptr);

  return thisArg;
}

JS_METHOD(Performance::Now) {
  uint64_t time = mach_absolute_time();
  mach_timebase_info_data_t timebase;
  mach_timebase_info(&timebase);
  double nanoseconds =
      (double)time * (double)timebase.numer / (double)timebase.denom;
  double milliseconds = nanoseconds / 1000000.0;

  napi_value result;
  napi_create_double(env, milliseconds, &result);
  return result;
}

}  // namespace nativescript

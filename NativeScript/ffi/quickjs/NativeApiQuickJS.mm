#include "NativeApiQuickJS.h"

#ifdef TARGET_ENGINE_QUICKJS

#include "NativeApiQuickJSRuntime.h"
#include "ffi/direct/NativeApiDirectSignatureDispatch.h"

namespace nativescript {

namespace {

using nativescript::direct::Array;
using nativescript::direct::ArrayBuffer;
using nativescript::direct::BigInt;
using nativescript::direct::Function;
using nativescript::direct::HostObject;
using nativescript::direct::MutableBuffer;
using nativescript::direct::Object;
using nativescript::direct::PropNameID;
using nativescript::direct::Runtime;
using nativescript::direct::String;
using nativescript::direct::StringBuffer;
using nativescript::direct::Value;
using nativescript::direct::JSError;
using metagen::MDMemberFlag;
using metagen::MDMetadataReader;
using metagen::MDSectionOffset;
using metagen::MDTypeKind;

// clang-format off
#define NATIVESCRIPT_NATIVE_API_DIRECT_BACKEND_NAME "quickjs"
#include "ffi/direct/NativeApiDirectBridge.h"
// clang-format on

#define NATIVESCRIPT_NATIVE_API_HAS_ENGINE_LAZY_GLOBALS 1
#define NATIVESCRIPT_NATIVE_API_RETAIN_RUNTIME 1

static JSValue NativeApiQuickJSLazyGlobalGetter(JSContext* context, JSValueConst, int,
                                                JSValueConst*, int, JSValueConst* data) {
  JSValue global = JS_GetGlobalObject(context);
  JSValue resolver = JS_GetPropertyStr(context, global, "__nativeScriptResolveNativeApiLazyGlobal");
  if (!JS_IsFunction(context, resolver)) {
    JS_FreeValue(context, resolver);
    JS_FreeValue(context, global);
    return JS_UNDEFINED;
  }

  JSValueConst args[] = {data[0], data[1]};
  JSValue result = JS_Call(context, resolver, global, 2, args);
  JS_FreeValue(context, resolver);
  if (JS_IsException(result)) {
    JS_FreeValue(context, global);
    return result;
  }

  JSAtom atom = JS_ValueToAtom(context, data[0]);
  if (atom != JS_ATOM_NULL) {
    JS_DefinePropertyValue(context, global, atom, JS_DupValue(context, result),
                           JS_PROP_CONFIGURABLE);
    JS_FreeAtom(context, atom);
  }
  JS_FreeValue(context, global);
  return result;
}

bool InstallNativeApiEngineLazyGlobal(Runtime& runtime, std::shared_ptr<NativeApiDirectBridge>,
                                      const std::string& name, const std::string& kind,
                                      bool force) {
  if (name.empty() || kind.empty()) {
    return false;
  }

  JSContext* context = runtime.context();
  JSValue global = JS_GetGlobalObject(context);
  JSAtom atom = JS_NewAtomLen(context, name.data(), name.size());
  if (atom == JS_ATOM_NULL) {
    JS_FreeValue(context, global);
    return false;
  }

  int hasProperty = JS_HasProperty(context, global, atom);
  if (!force && hasProperty > 0) {
    JS_FreeAtom(context, atom);
    JS_FreeValue(context, global);
    return false;
  }
  if (hasProperty < 0) {
    JS_FreeAtom(context, atom);
    JS_FreeValue(context, global);
    return false;
  }

  JSValue data[] = {
      JS_NewStringLen(context, name.data(), name.size()),
      JS_NewStringLen(context, kind.data(), kind.size()),
  };
  if (JS_IsException(data[0]) || JS_IsException(data[1])) {
    JS_FreeValue(context, data[0]);
    JS_FreeValue(context, data[1]);
    JS_FreeAtom(context, atom);
    JS_FreeValue(context, global);
    return false;
  }

  JSValue getter = JS_NewCFunctionData(context, NativeApiQuickJSLazyGlobalGetter, 0, 0, 2, data);
  JS_FreeValue(context, data[0]);
  JS_FreeValue(context, data[1]);
  if (JS_IsException(getter)) {
    JS_FreeAtom(context, atom);
    JS_FreeValue(context, global);
    return false;
  }

  int status =
      JS_DefinePropertyGetSet(context, global, atom, getter, JS_UNDEFINED, JS_PROP_CONFIGURABLE);
  JS_FreeAtom(context, atom);
  JS_FreeValue(context, global);
  return status >= 0;
}

// clang-format off
#include "ffi/direct/NativeApiDirectHostObjects.h"
// clang-format on

std::shared_ptr<Runtime> retainNativeApiDirectRuntime(Runtime& runtime) {
  return std::make_shared<Runtime>(runtime.state());
}

// clang-format off
#include "ffi/direct/NativeApiDirectCallbacks.h"
#include "ffi/direct/NativeApiDirectConversion.h"
#include "ffi/direct/NativeApiDirectInvocation.h"
#include "ffi/direct/NativeApiDirectClassBuilder.h"
#include "ffi/direct/NativeApiDirectHostObject.h"
// clang-format on

}  // namespace

#include "ffi/direct/NativeApiDirectInstall.h"

void InstallNativeApiQuickJS(JSContext* context, const NativeApiQuickJSConfig& config) {
  if (context == nullptr) {
    return;
  }
  auto state = direct::quickjsdirect::stateForContext(context);
  nativescript::direct::Runtime runtime(state);
  direct::quickjsdirect::ensureClasses(runtime);
  InstallNativeApiDirect(runtime, config);
}

}  // namespace nativescript

extern "C" void NativeScriptInstallNativeApiQuickJS(JSContext* context, const char* metadataPath) {
  nativescript::NativeApiQuickJSConfig config;
  config.metadataPath = metadataPath;
  nativescript::InstallNativeApiQuickJS(context, config);
}

#endif  // TARGET_ENGINE_QUICKJS

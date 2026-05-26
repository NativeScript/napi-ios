#include "NativeApiV8.h"

#ifdef TARGET_ENGINE_V8

#include "NativeApiV8Runtime.h"

namespace nativescript {

using NativeApiJsiConfig = NativeApiDirectConfig;
using NativeApiJsiScheduler = NativeApiDirectScheduler;

namespace {

using facebook::jsi::Array;
using facebook::jsi::ArrayBuffer;
using facebook::jsi::BigInt;
using facebook::jsi::Function;
using facebook::jsi::HostObject;
using facebook::jsi::MutableBuffer;
using facebook::jsi::Object;
using facebook::jsi::PropNameID;
using facebook::jsi::Runtime;
using facebook::jsi::String;
using facebook::jsi::StringBuffer;
using facebook::jsi::Value;
using metagen::MDMemberFlag;
using metagen::MDMetadataReader;
using metagen::MDSectionOffset;
using metagen::MDTypeKind;

// clang-format off
#include "jsi/NativeApiJsiBridge.h"
// clang-format on

#define NATIVESCRIPT_NATIVE_API_HAS_ENGINE_LAZY_GLOBALS 1
#define NATIVESCRIPT_NATIVE_API_RETAIN_RUNTIME 1
#define NATIVESCRIPT_NATIVE_API_RUNTIME_SCOPE 1

struct NativeApiV8LazyGlobalData {
  NativeApiV8LazyGlobalData(v8::Isolate* isolate, const std::string& name,
                            const std::string& kind) {
    nameValue.Reset(isolate, facebook::jsi::v8direct::makeV8String(isolate, name));
    kindValue.Reset(isolate, facebook::jsi::v8direct::makeV8String(isolate, kind));
  }

  ~NativeApiV8LazyGlobalData() {
    nameValue.Reset();
    kindValue.Reset();
  }

  v8::Global<v8::String> nameValue;
  v8::Global<v8::String> kindValue;
};

std::shared_ptr<Runtime> retainNativeApiJsiRuntime(Runtime& runtime) {
  return std::make_shared<Runtime>(runtime.state());
}

class NativeApiJsiRuntimeScope final {
 public:
  explicit NativeApiJsiRuntimeScope(Runtime& runtime)
      : locker_(runtime.isolate()),
        isolateScope_(runtime.isolate()),
        handleScope_(runtime.isolate()),
        context_(runtime.context()),
        contextScope_(context_) {}

 private:
  v8::Locker locker_;
  v8::Isolate::Scope isolateScope_;
  v8::HandleScope handleScope_;
  v8::Local<v8::Context> context_;
  v8::Context::Scope contextScope_;
};

void NativeApiV8LazyGlobalGetter(v8::Local<v8::Name>,
                                 const v8::PropertyCallbackInfo<v8::Value>& info) {
  v8::Isolate* isolate = info.GetIsolate();
  v8::HandleScope handleScope(isolate);
  v8::Local<v8::Context> context = isolate->GetCurrentContext();
  if (!info.Data()->IsExternal()) {
    return;
  }

  auto* data = static_cast<NativeApiV8LazyGlobalData*>(info.Data().As<v8::External>()->Value());
  if (data == nullptr) {
    return;
  }
  v8::Local<v8::String> nameValue = data->nameValue.Get(isolate);
  v8::Local<v8::String> kindValue = data->kindValue.Get(isolate);

  v8::Local<v8::Object> global = context->Global();
  v8::Local<v8::Value> resolverValue;
  if (!global
           ->Get(context, facebook::jsi::v8direct::makeV8String(
                              isolate, "__nativeScriptResolveNativeApiLazyGlobal"))
           .ToLocal(&resolverValue) ||
      !resolverValue->IsFunction()) {
    return;
  }

  v8::TryCatch tryCatch(isolate);
  v8::Local<v8::Value> args[] = {nameValue, kindValue};
  v8::Local<v8::Value> result;
  if (!resolverValue.As<v8::Function>()->Call(context, global, 2, args).ToLocal(&result)) {
    if (tryCatch.HasCaught()) {
      isolate->ThrowException(tryCatch.Exception());
    }
    return;
  }
  if (global->Delete(context, nameValue).FromMaybe(false)) {
    global->DefineOwnProperty(context, nameValue, result, v8::DontEnum).FromMaybe(false);
  }
  info.GetReturnValue().Set(result);
}

bool InstallNativeApiEngineLazyGlobal(Runtime& runtime, std::shared_ptr<NativeApiJsiBridge>,
                                      const std::string& name, const std::string& kind,
                                      bool force) {
  if (name.empty() || kind.empty()) {
    return false;
  }

  v8::Isolate* isolate = runtime.isolate();
  v8::EscapableHandleScope handleScope(isolate);
  v8::Local<v8::Context> context = runtime.context();
  v8::Local<v8::Object> global = context->Global();
  v8::Local<v8::String> property = facebook::jsi::v8direct::makeV8String(isolate, name);
  if (!force && global->HasOwnProperty(context, property).FromMaybe(false)) {
    return false;
  }

  auto data = std::make_shared<NativeApiV8LazyGlobalData>(isolate, name, kind);
  v8::Local<v8::External> external = v8::External::New(isolate, data.get());

  bool installed = global
                       ->SetNativeDataProperty(context, property, NativeApiV8LazyGlobalGetter,
                                               nullptr, external, v8::DontEnum)
                       .FromMaybe(false);
  if (installed) {
    runtime.state()->retainedNativeData.push_back(std::move(data));
  }
  return installed;
}

// clang-format off
#include "jsi/NativeApiJsiHostObjects.h"
#include "jsi/NativeApiJsiCallbacks.h"
#include "jsi/NativeApiJsiConversion.h"
#include "jsi/NativeApiJsiInvocation.h"
#include "jsi/NativeApiJsiClassBuilder.h"
#include "jsi/NativeApiJsiHostObject.h"
// clang-format on

}  // namespace

#include "jsi/NativeApiJsiInstall.h"

void InstallNativeApiV8(v8::Isolate* isolate, v8::Local<v8::Context> context,
                        const NativeApiV8Config& config) {
  if (isolate == nullptr || context.IsEmpty()) {
    return;
  }
  v8::Locker locker(isolate);
  v8::Isolate::Scope isolateScope(isolate);
  v8::HandleScope handleScope(isolate);
  v8::Context::Scope contextScope(context);
  Runtime runtime(isolate, context);
  InstallNativeApiJSI(runtime, config);
}

}  // namespace nativescript

extern "C" void NativeScriptInstallNativeApiV8(v8::Isolate* isolate, v8::Local<v8::Context> context,
                                               const char* metadataPath) {
  nativescript::NativeApiV8Config config;
  config.metadataPath = metadataPath;
  nativescript::InstallNativeApiV8(isolate, context, config);
}

#endif  // TARGET_ENGINE_V8

#include "NativeApiJSC.h"

#ifdef TARGET_ENGINE_JSC

#include "NativeApiJSCRuntime.h"

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
#include "jsi/NativeApiJsiHostObjects.h"
// clang-format on
#define NATIVESCRIPT_NATIVE_API_RETAIN_RUNTIME 1

std::shared_ptr<Runtime> retainNativeApiJsiRuntime(Runtime& runtime) {
  return std::make_shared<Runtime>(runtime.state());
}

// clang-format off
#include "jsi/NativeApiJsiCallbacks.h"
#include "jsi/NativeApiJsiConversion.h"
#include "jsi/NativeApiJsiInvocation.h"
#include "jsi/NativeApiJsiClassBuilder.h"
#include "jsi/NativeApiJsiHostObject.h"
// clang-format on

}  // namespace

#include "jsi/NativeApiJsiInstall.h"

void InstallNativeApiJSC(JSGlobalContextRef context, const NativeApiJSCConfig& config) {
  if (context == nullptr) {
    return;
  }
  Runtime runtime(context);
  InstallNativeApiJSI(runtime, config);
}

}  // namespace nativescript

extern "C" void NativeScriptInstallNativeApiJSC(JSGlobalContextRef context,
                                                const char* metadataPath) {
  nativescript::NativeApiJSCConfig config;
  config.metadataPath = metadataPath;
  nativescript::InstallNativeApiJSC(context, config);
}

#endif  // TARGET_ENGINE_JSC

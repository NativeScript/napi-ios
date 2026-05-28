#include "NativeApiJSC.h"

#ifdef TARGET_ENGINE_JSC

#include "NativeApiJSCRuntime.h"
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
#define NATIVESCRIPT_NATIVE_API_DIRECT_BACKEND_NAME "jsc"
#include "ffi/direct/NativeApiDirectBridge.h"
#include "ffi/direct/NativeApiDirectHostObjects.h"
// clang-format on
#define NATIVESCRIPT_NATIVE_API_RETAIN_RUNTIME 1

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

void InstallNativeApiJSC(JSGlobalContextRef context, const NativeApiJSCConfig& config) {
  if (context == nullptr) {
    return;
  }
  Runtime runtime(context);
  InstallNativeApiDirect(runtime, config);
}

}  // namespace nativescript

extern "C" void NativeScriptInstallNativeApiJSC(JSGlobalContextRef context,
                                                const char* metadataPath) {
  nativescript::NativeApiJSCConfig config;
  config.metadataPath = metadataPath;
  nativescript::InstallNativeApiJSC(context, config);
}

#endif  // TARGET_ENGINE_JSC

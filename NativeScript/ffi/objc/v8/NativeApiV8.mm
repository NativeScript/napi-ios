#include "NativeApiV8.h"

#ifdef TARGET_ENGINE_V8

#include "NativeApiV8Runtime.h"
#include "SignatureDispatch.h"

#include "../shared/bridge/InteropProfiler.h"

// `../shared/bridge/BatchOps.mm` (textually included below, inside this
// TU's `namespace nativescript { namespace { ... } }`) is pure UIKit code
// (UIView/UIScrollView/etc, guarded `#if TARGET_OS_IPHONE`). The Hermes
// engine's translation unit gets UIKit imported for free via its
// CocoaPods/Xcode target's implicit prefix header; this standalone V8/
// napi-cli CLI build (this file, no prefix header) does not, and CI's
// iOS-simulator build of this target failed on exactly that ("unknown type
// name 'UIView'", commits 77e93b22/93aa4a0f) even after BatchOps.mm's own
// body was correctly TARGET_OS_IPHONE-guarded -- the guard's condition is
// true for iOS *simulator* too (same as device), so the guarded code was
// reached, just without UIKit declared. The import cannot live inside
// BatchOps.mm itself: it is textually included below AFTER `namespace
// nativescript {`/the anonymous namespace both open, and Objective-C
// @interface/@protocol declarations (UIKit.h is full of them) are illegal
// inside a C++ namespace -- it must be here, at this file's true global
// scope, before either namespace opens.
#if TARGET_OS_IPHONE
#import <UIKit/UIKit.h>
#endif  // TARGET_OS_IPHONE

namespace nativescript {

namespace {

using nativescript::engine::Array;
using nativescript::engine::ArrayBuffer;
using nativescript::engine::BigInt;
using nativescript::engine::Function;
using nativescript::engine::HostObject;
using nativescript::engine::MutableBuffer;
using nativescript::engine::Object;
using nativescript::engine::PropNameID;
using nativescript::engine::Runtime;
using nativescript::engine::String;
using nativescript::engine::StringBuffer;
using nativescript::engine::Value;
using nativescript::engine::JSError;
using metagen::MDMemberFlag;
using metagen::MDMetadataReader;
using metagen::MDSectionOffset;
using metagen::MDTypeKind;

// clang-format off
#define NATIVESCRIPT_NATIVE_API_BACKEND_NAME "v8"
#include "../shared/bridge/ObjCBridge.mm"
// clang-format on

#define NATIVESCRIPT_NATIVE_API_HAS_ENGINE_LAZY_GLOBALS 1
#define NATIVESCRIPT_NATIVE_API_HAS_ENGINE_SELECTOR_GROUP_FUNCTION 1
#define NATIVESCRIPT_NATIVE_API_RETAIN_RUNTIME 1
#define NATIVESCRIPT_NATIVE_API_RUNTIME_SCOPE 1

#include "NativeApiV8RuntimeSupport.mm"

// clang-format off
#include "../shared/bridge/HostObjects.mm"
#include "../shared/bridge/Callbacks.mm"
#include "../shared/bridge/TypeConv.mm"
#include "../shared/bridge/Invocation.mm"
#include "../shared/bridge/ClassBuilder.mm"
#include "../shared/bridge/BatchOps.mm"
#include "../shared/bridge/HostObject.mm"
// clang-format on


#include "NativeApiV8SelectorGroups.mm"

}  // namespace

#include "../shared/bridge/Install.mm"

void InstallNativeApi(v8::Isolate* isolate, v8::Local<v8::Context> context,
                        const NativeApiConfig& config) {
  if (isolate == nullptr || context.IsEmpty()) {
    return;
  }
  v8::Locker locker(isolate);
  v8::Isolate::Scope isolateScope(isolate);
  v8::HandleScope handleScope(isolate);
  v8::Context::Scope contextScope(context);
  Runtime runtime(isolate, context);
  InstallNativeApi(runtime, config);
}

}  // namespace nativescript

extern "C" void NativeScriptInstallNativeApi(v8::Isolate* isolate, v8::Local<v8::Context> context,
                                               const char* metadataPath) {
  nativescript::NativeApiConfig config;
  config.metadataPath = metadataPath;
  nativescript::InstallNativeApi(isolate, context, config);
}

#endif  // TARGET_ENGINE_V8

#include "NativeScriptNativeApiModule.h"

#import <Foundation/Foundation.h>
#import <TargetConditionals.h>

#include <mutex>
#include <utility>

#include "NativeApiJsiReactNative.h"
#include "NativeScriptUIKitHost.h"

#include <worklets/Compat/Holders.h>
#include <worklets/WorkletRuntime/WorkletRuntime.h>

namespace {

std::string pathForResource(NSBundle* bundle, NSString* name, NSString* type) {
  if (bundle == nil) {
    return "";
  }
  NSString* path = [bundle pathForResource:name ofType:type];
  return path != nil ? path.UTF8String : "";
}

std::string bundledMetadataPath() {
#if TARGET_OS_SIMULATOR
#if defined(__x86_64__)
  NSString* metadataName = @"metadata.ios-sim.x86_64";
#else
  NSString* metadataName = @"metadata.ios-sim.arm64";
#endif
#else
  NSString* metadataName = @"metadata.ios.arm64";
#endif

  std::string path = pathForResource([NSBundle mainBundle], metadataName, @"nsmd");
  if (!path.empty()) {
    return path;
  }

  Class providerClass = NSClassFromString(@"NativeScriptNativeApiModuleProvider");
  NSBundle* providerBundle =
      providerClass != Nil ? [NSBundle bundleForClass:providerClass] : nil;
  NSString* resourceBundlePath =
      [providerBundle pathForResource:@"NativeScriptNativeApi" ofType:@"bundle"];
  NSBundle* resourceBundle =
      resourceBundlePath != nil ? [NSBundle bundleWithPath:resourceBundlePath] : nil;

  path = pathForResource(resourceBundle, metadataName, @"nsmd");
  if (!path.empty()) {
    return path;
  }

  return pathForResource(resourceBundle, @"metadata", @"nsmd");
}

void writeSmokeMarkerIfRequested(const char* stage) {
  const char* enabled = getenv("NATIVESCRIPT_RN_TURBO_SMOKE_MARKER");
  if (enabled == nullptr || enabled[0] == '\0') {
    return;
  }

  NSString* path = [NSTemporaryDirectory()
      stringByAppendingPathComponent:@"NativeScriptNativeApiSmoke.marker"];
  NSString* content =
      [NSString stringWithFormat:@"stage=%s\n", stage != nullptr ? stage : ""];
  [content writeToFile:path atomically:YES encoding:NSUTF8StringEncoding error:nil];
}

bool writeSmokeMarkerContentIfRequested(const std::string& content) {
  const char* enabled = getenv("NATIVESCRIPT_RN_TURBO_SMOKE_MARKER");
  if (enabled == nullptr || enabled[0] == '\0') {
    return false;
  }

  NSString* path = [NSTemporaryDirectory()
      stringByAppendingPathComponent:@"NativeScriptNativeApiSmoke.marker"];
  NSString* nativeContent =
      [[NSString alloc] initWithBytes:content.data()
                               length:content.size()
                             encoding:NSUTF8StringEncoding];
  if (nativeContent == nil) {
    nativeContent = @"";
  }

  BOOL ok = [nativeContent writeToFile:path
                            atomically:YES
                              encoding:NSUTF8StringEncoding
                                 error:nil];
#if !__has_feature(objc_arc)
  [nativeContent release];
#endif
  return ok == YES;
}

bool nativeApiInstalled(facebook::jsi::Runtime& runtime) {
  return runtime.global().hasProperty(runtime, "__nativeScriptNativeApi");
}

std::mutex& nativeScriptWorkletRuntimeMutex() {
  static std::mutex mutex;
  return mutex;
}

std::weak_ptr<worklets::WorkletRuntime>& nativeScriptWorkletRuntime() {
  static std::weak_ptr<worklets::WorkletRuntime> runtime;
  return runtime;
}

void setNativeScriptWorkletRuntime(
    std::shared_ptr<worklets::WorkletRuntime> runtime) {
  std::lock_guard<std::mutex> lock(nativeScriptWorkletRuntimeMutex());
  nativeScriptWorkletRuntime() = std::move(runtime);
}

std::shared_ptr<worklets::WorkletRuntime> getNativeScriptWorkletRuntime() {
  std::lock_guard<std::mutex> lock(nativeScriptWorkletRuntimeMutex());
  return nativeScriptWorkletRuntime().lock();
}

NSString* stringProperty(facebook::jsi::Runtime& runtime,
                         facebook::jsi::Object& object, const char* name) {
  auto value = object.getProperty(runtime, name);
  if (!value.isString()) {
    return nil;
  }
  std::string text = value.getString(runtime).utf8(runtime);
  return [NSString stringWithUTF8String:text.c_str()];
}

}  // namespace

NSDictionary<NSString*, NSString*>* NativeScriptCreateUIKitHost(
    NSString* hostId) {
  if (hostId.length == 0 || ![NSThread isMainThread]) {
    return nil;
  }

  auto workletRuntime = getNativeScriptWorkletRuntime();
  if (workletRuntime == nullptr) {
    return nil;
  }

  std::string hostIdString =
      hostId.UTF8String != nullptr ? hostId.UTF8String : "";
  if (hostIdString.empty()) {
    return nil;
  }

  try {
    return workletRuntime->runSync(
        [hostIdString = std::move(hostIdString)](
            facebook::jsi::Runtime& runtime) -> NSDictionary<NSString*, NSString*>* {
          auto global = runtime.global();
          auto createValue =
              global.getProperty(runtime, "__nativeScriptCreateUIKitHostFromNative");
          if (!createValue.isObject()) {
            return nil;
          }

          auto createObject = createValue.asObject(runtime);
          if (!createObject.isFunction(runtime)) {
            return nil;
          }

          auto result = createObject.asFunction(runtime).call(
              runtime, facebook::jsi::String::createFromUtf8(runtime, hostIdString));
          if (!result.isObject()) {
            return nil;
          }

          auto resultObject = result.asObject(runtime);
          NSMutableDictionary<NSString*, NSString*>* handles =
              [NSMutableDictionary dictionaryWithCapacity:3];
          NSString* nativeViewHandle =
              stringProperty(runtime, resultObject, "nativeViewHandle");
          NSString* childrenViewHandle =
              stringProperty(runtime, resultObject, "childrenViewHandle");
          NSString* controllerHandle =
              stringProperty(runtime, resultObject, "controllerHandle");

          if (nativeViewHandle.length > 0) {
            handles[@"nativeViewHandle"] = nativeViewHandle;
          }
          if (childrenViewHandle.length > 0) {
            handles[@"childrenViewHandle"] = childrenViewHandle;
          }
          if (controllerHandle.length > 0) {
            handles[@"controllerHandle"] = controllerHandle;
          }
          return handles;
        });
  } catch (const std::exception& error) {
    NSLog(@"NativeScript failed to create UIKit host %@: %s", hostId,
          error.what());
  } catch (...) {
    NSLog(@"NativeScript failed to create UIKit host %@", hostId);
  }
  return nil;
}

namespace facebook::react {

NativeScriptNativeApiModule::NativeScriptNativeApiModule(
    std::shared_ptr<CallInvoker> jsInvoker)
    : NativeScriptNativeApiCxxSpec(jsInvoker), jsInvoker_(std::move(jsInvoker)) {}

bool NativeScriptNativeApiModule::install(jsi::Runtime& runtime,
                                          std::string metadataPath) {
  writeSmokeMarkerIfRequested("install:resolve-metadata");
  std::string resolvedMetadataPath =
      metadataPath.empty() ? bundledMetadataPath() : metadataPath;
  const char* metadataPathArg =
      resolvedMetadataPath.empty() ? nullptr : resolvedMetadataPath.c_str();

  writeSmokeMarkerIfRequested("install:before-jsi");
  auto config = nativescript::MakeReactNativeNativeApiJsiConfig(
      jsInvoker_, nullptr, metadataPathArg);
  nativescript::InstallNativeApiJSI(runtime, config);
  writeSmokeMarkerIfRequested("install:after-jsi");
  return isInstalled(runtime);
}

bool NativeScriptNativeApiModule::installWorkletRuntime(
    jsi::Runtime& runtime, jsi::Object runtimeHolder,
    std::string metadataPath) {
  writeSmokeMarkerIfRequested("installWorkletRuntime:headers");
  if (!runtimeHolder.hasNativeState<worklets::WorkletRuntimeHolder>(runtime)) {
    writeSmokeMarkerIfRequested("installWorkletRuntime:no-holder");
    return false;
  }

  auto holder =
      runtimeHolder.getNativeState<worklets::WorkletRuntimeHolder>(runtime);
  if (holder == nullptr || holder->runtime_ == nullptr) {
    writeSmokeMarkerIfRequested("installWorkletRuntime:null-runtime");
    return false;
  }

  setNativeScriptWorkletRuntime(holder->runtime_);

  std::string resolvedMetadataPath =
      metadataPath.empty() ? bundledMetadataPath() : metadataPath;
  auto jsInvoker = jsInvoker_;
  return holder->runtime_->runSync(
      [jsInvoker = std::move(jsInvoker),
       resolvedMetadataPath = std::move(resolvedMetadataPath)](
          jsi::Runtime& workletRuntime) -> bool {
        if (nativeApiInstalled(workletRuntime)) {
          return true;
        }

        const char* metadataPathArg =
            resolvedMetadataPath.empty() ? nullptr
                                         : resolvedMetadataPath.c_str();
        auto config = nativescript::MakeReactNativeNativeApiJsiConfig(
            jsInvoker, nullptr, metadataPathArg);
        nativescript::InstallNativeApiJSI(workletRuntime, config);
        return nativeApiInstalled(workletRuntime);
      });
}

bool NativeScriptNativeApiModule::isInstalled(jsi::Runtime& runtime) {
  return nativeApiInstalled(runtime);
}

std::string NativeScriptNativeApiModule::defaultMetadataPath(jsi::Runtime&) {
  return bundledMetadataPath();
}

std::string NativeScriptNativeApiModule::getRuntimeBackend(jsi::Runtime&) {
  writeSmokeMarkerIfRequested("getRuntimeBackend");
  return "hermes-jsi";
}

bool NativeScriptNativeApiModule::__writeTestMarker(jsi::Runtime&,
                                                    std::string content) {
  return writeSmokeMarkerContentIfRequested(content);
}

}  // namespace facebook::react

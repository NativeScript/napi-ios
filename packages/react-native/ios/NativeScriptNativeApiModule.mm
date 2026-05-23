#include "NativeScriptNativeApiModule.h"

#import <Foundation/Foundation.h>
#import <TargetConditionals.h>

#include <utility>

#include "NativeApiJsiReactNative.h"

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

}  // namespace

namespace facebook::react {

NativeScriptNativeApiModule::NativeScriptNativeApiModule(
    std::shared_ptr<CallInvoker> jsInvoker)
    : NativeScriptNativeApiCxxSpec(jsInvoker), jsInvoker_(std::move(jsInvoker)) {}

bool NativeScriptNativeApiModule::install(jsi::Runtime& runtime,
                                          std::string metadataPath) {
  std::string resolvedMetadataPath =
      metadataPath.empty() ? bundledMetadataPath() : metadataPath;
  const char* metadataPathArg =
      resolvedMetadataPath.empty() ? nullptr : resolvedMetadataPath.c_str();

  auto config = nativescript::MakeReactNativeNativeApiJsiConfig(
      jsInvoker_, nullptr, metadataPathArg);
  nativescript::InstallNativeApiJSI(runtime, config);
  return isInstalled(runtime);
}

bool NativeScriptNativeApiModule::isInstalled(jsi::Runtime& runtime) {
  return runtime.global().hasProperty(runtime, "__nativeScriptNativeApi");
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

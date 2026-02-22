#import "NativescriptJsi.h"
#import "NativescriptJsiInstaller.h"
#import <jsi/jsi.h>

using namespace facebook;

@interface NativescriptJsi (JSIBindings) <RCTTurboModuleWithJSIBindings>
@end

@implementation NativescriptJsi
- (NSNumber *)multiply:(double)a b:(double)b {
  NSNumber *result = @(a * b);

  return result;
}

- (NSString *)getMainBundleResourcePath {
  return [[NSBundle mainBundle] resourcePath];
}

- (NSString *)getArch {
#if defined(__arm64__)
  return @"arm64";
#elif defined(__x86_64__)
  return @"x86_64";
#endif
  return @"unknown";
}

- (void)nativescript_init:(NSString *)metadata_path {
  NSLog(metadata_path);

  // TODO: Port NativeScript/ffi/ObjCBridge.mm to JSI.
}

- (void)installJSIBindingsWithRuntime:(facebook::jsi::Runtime &)runtime
                          callInvoker:(const std::shared_ptr<facebook::react::CallInvoker> &)callinvoker {
  nativescriptjsi::NativescriptJsiInstaller::install(runtime);
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeNativescriptJsiSpecJSI>(params);
}

+ (NSString *)moduleName
{
  return @"NativescriptJsi";
}

@end

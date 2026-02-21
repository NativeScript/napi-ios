#import "NativescriptJsi.h"

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

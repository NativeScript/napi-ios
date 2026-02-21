#import "NativescriptJsi.h"

@implementation NativescriptJsi
- (NSNumber *)multiply:(double)a b:(double)b {
  NSNumber *result = @(a * b);

  return result;
}

- (void)nativescript_init:(NSString *)metadata_path {
  // TODO
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

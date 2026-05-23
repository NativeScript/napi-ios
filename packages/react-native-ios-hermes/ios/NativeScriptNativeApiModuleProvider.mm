#import "NativeScriptNativeApiModuleProvider.h"

#import <ReactCommon/CallInvoker.h>
#import <ReactCommon/TurboModule.h>

#include "NativeScriptNativeApiModule.h"

@implementation NativeScriptNativeApiModuleProvider

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams&)params {
  return std::make_shared<facebook::react::NativeScriptNativeApiModule>(
      params.jsInvoker);
}

@end

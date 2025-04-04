#include "NativeScript.h"
#include "Runtime.h"
#include "RuntimeConfig.h"

using namespace nativescript;

@implementation Config

@synthesize BaseDir;
@synthesize ApplicationPath;
@synthesize MetadataPtr;
@synthesize IsDebug;

@end

@implementation NativeScript

extern char defaultStartOfMetadataSection __asm("section$start$__DATA$__TNSMetadata");

std::unique_ptr<Runtime> runtime_;

- (void)runScriptString:(NSString*)script runLoop:(BOOL)runLoop {
  std::string cppScript = [script UTF8String];
  runtime_->RunScript(cppScript);
  if (runLoop) {
    runtime_->RunLoop();
  }
}

- (void)runMainApplication {
  std::string spec = "./app/bundle.js";
  runtime_->RunModule(spec);
  runtime_->RunLoop();
}

- (bool)liveSync {
  return false;
}

- (void)shutdownRuntime {
  runtime_ = nullptr;
}

- (instancetype)initWithConfig:(Config*)config {
  if (self = [super init]) {
    RuntimeConfig.BaseDir = [config.BaseDir UTF8String];
    if (config.ApplicationPath != nil) {
      RuntimeConfig.ApplicationPath =
          [[config.BaseDir stringByAppendingPathComponent:config.ApplicationPath] UTF8String];
    } else {
      RuntimeConfig.ApplicationPath =
          [[config.BaseDir stringByAppendingPathComponent:@"app"] UTF8String];
    }
    if (config.MetadataPtr != nil) {
      RuntimeConfig.MetadataPtr = [config MetadataPtr];
    } else {
      RuntimeConfig.MetadataPtr = &defaultStartOfMetadataSection;
    }
    RuntimeConfig.IsDebug = [config IsDebug];
    RuntimeConfig.LogToSystemConsole = [config LogToSystemConsole];

    runtime_ = std::make_unique<Runtime>();

    // TODO: separate runtime init and measure the time

    if (RuntimeConfig.IsDebug) {
      // TODO: Inspector for debugging
      // runtime_->enableInspector();
    }
  }
  return self;
}

- (instancetype)initializeWithConfig:(Config*)config {
  return [self initWithConfig:config];
}

- (void)restartWithConfig:(Config*)config {
  [self shutdownRuntime];
  [self initWithConfig:config];
}

@end

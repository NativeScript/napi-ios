#ifndef NATIVESCRIPT_H
#define NATIVESCRIPT_H

#ifdef __cplusplus

extern "C"

#endif  // __cplusplus

    void
    nativescript_init(void* env, const char* metadata_path, const void* metadata_ptr);

#ifdef __OBJC__

#import <Foundation/Foundation.h>

__attribute__((visibility("default")))
@interface Config : NSObject

@property(nonatomic, retain) NSString* BaseDir;
@property(nonatomic, retain) NSString* ApplicationPath;
@property(nonatomic) void* MetadataPtr;
@property BOOL IsDebug;
@property BOOL LogToSystemConsole;
@property int ArgumentsCount;
@property(nonatomic) char** Arguments;

@end

__attribute__((visibility("default")))
@interface NativeScript : NSObject

- (instancetype)initWithConfig:(Config*)config;
- (void)runScriptString:(NSString*)script runLoop:(BOOL)runLoop;
- (void)restartWithConfig:(Config*)config;
- (void)shutdownRuntime;

/**
 WARNING: this method does not return in most applications. (UIApplicationMain)
 */
- (void)runMainApplication;
- (bool)liveSync;

@end

#endif  // __OBJC__

#endif /* NATIVESCRIPT_H */

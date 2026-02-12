#include "BundleLoader.h"
#include <Foundation/Foundation.h>

// Check if Resources/app/ exists, then load package.json["main"] || app/index.js full file path

std::string resolveMainPath() {
  NSFileManager* fileManager = [NSFileManager defaultManager];
  NSString* resourcesPath = [[NSBundle mainBundle] resourcePath];
  NSString* appPath = [resourcesPath stringByAppendingPathComponent:@"app"];
  BOOL isDir;

  if ([fileManager fileExistsAtPath:appPath isDirectory:&isDir] && isDir) {
    NSString* packageJsonPath = [appPath stringByAppendingPathComponent:@"package.json"];
    if ([fileManager fileExistsAtPath:packageJsonPath]) {
      NSData* jsonData = [NSData dataWithContentsOfFile:packageJsonPath];
      NSError* error;
      NSDictionary* packageDict = [NSJSONSerialization JSONObjectWithData:jsonData
                                                                  options:0
                                                                    error:&error];
      if (error == nil) {
        NSString* mainEntry = packageDict[@"main"];
        if (mainEntry != nil) {
          NSString* mainPath = [appPath stringByAppendingPathComponent:mainEntry];
          if ([fileManager fileExistsAtPath:mainPath]) {
            return std::string([mainPath UTF8String]);
          }

          if ([[mainEntry pathExtension] length] == 0) {
            NSString* mainPathMjs = [mainPath stringByAppendingPathExtension:@"mjs"];
            if ([fileManager fileExistsAtPath:mainPathMjs]) {
              return std::string([mainPathMjs UTF8String]);
            }

            NSString* mainPathJs = [mainPath stringByAppendingPathExtension:@"js"];
            if ([fileManager fileExistsAtPath:mainPathJs]) {
              return std::string([mainPathJs UTF8String]);
            }
          }
        }
      }
    }

    // Fallback to app/index.js
    NSString* indexPath = [appPath stringByAppendingPathComponent:@"index.js"];
    if ([fileManager fileExistsAtPath:indexPath]) {
      return std::string([indexPath UTF8String]);
    }
  }

  return "";
}

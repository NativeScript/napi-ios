#import <Foundation/Foundation.h>

FOUNDATION_EXPORT NSDictionary<NSString*, NSString*>* NativeScriptCreateUIKitHost(NSString* hostId);

FOUNDATION_EXPORT NSDictionary<NSString*, NSString*>* NativeScriptRunUIKitHostLifecycle(
    NSString* hostId, NSString* phase);

FOUNDATION_EXPORT BOOL NativeScriptRefreshUIKitHostView(NSString* viewHandle);

#import <Foundation/Foundation.h>

@class UIView;

FOUNDATION_EXPORT NSDictionary<NSString*, NSString*>* NativeScriptCreateUIKitHost(
    NSString* hostId, NSString* propsJson);

FOUNDATION_EXPORT NSDictionary<NSString*, NSString*>* NativeScriptCreateUIKitHostWithInfo(
    NSString* hostId, NSString* propsJson, NSString* nativeMountInfoJson);

FOUNDATION_EXPORT NSDictionary<NSString*, NSString*>* NativeScriptRunUIKitHostLifecycle(
    NSString* hostId, NSString* phase, NSString* propsJson);

FOUNDATION_EXPORT NSDictionary<NSString*, NSString*>* NativeScriptRunUIKitHostLifecycleWithInfo(
    NSString* hostId,
    NSString* phase,
    NSString* propsJson,
    NSString* transactionJson,
    NSString* nativeMountInfoJson);

FOUNDATION_EXPORT BOOL NativeScriptRefreshUIKitHostView(NSString* viewHandle);

FOUNDATION_EXPORT BOOL NativeScriptRefreshUIKitHostViewOwner(NSString* viewHandle);

FOUNDATION_EXPORT BOOL NativeScriptRefreshUIKitHostViewDirectOwner(NSString* viewHandle);

FOUNDATION_EXPORT BOOL NativeScriptInvalidateUIKitHostReadyOwner(NSString* viewHandle);

FOUNDATION_EXPORT BOOL NativeScriptNotifyUIKitAccessibilityLayoutChanged(NSString* viewHandle);

FOUNDATION_EXPORT BOOL NativeScriptFlushUIKitHostView(NSString* viewHandle);

FOUNDATION_EXPORT BOOL NativeScriptFlushUIKitHostViewOwner(NSString* viewHandle);

FOUNDATION_EXPORT NSDictionary<NSString*, NSString*>* NativeScriptUIKitHostHandlesForView(
    NSString* viewHandle);

FOUNDATION_EXPORT NSDictionary<NSString*, NSString*>* NativeScriptUIKitHostOwnerHandlesForView(
    NSString* viewHandle);

FOUNDATION_EXPORT NSString* NativeScriptNearestViewControllerForView(NSString* viewHandle);

FOUNDATION_EXPORT BOOL NativeScriptAttachViewControllerToNearestParent(
    NSString* controllerHandle, NSString* viewHandle, BOOL allowRootParent);

FOUNDATION_EXPORT NSArray<UIView*>* NativeScriptCollectedUIKitHostChildren(
    NSString* viewHandle);

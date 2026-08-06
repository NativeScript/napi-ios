#import <React/RCTViewManager.h>

#import "NativeScriptUIView.h"

@interface NativeScriptUIViewManager : RCTViewManager
@end

@implementation NativeScriptUIViewManager

RCT_EXPORT_MODULE(NativeScriptUIView)

- (UIView*)view {
  return [[[NativeScriptUIView alloc] initWithFrame:CGRectZero] autorelease];
}

RCT_EXPORT_VIEW_PROPERTY(nativeViewHandle, NSString)
RCT_EXPORT_VIEW_PROPERTY(childrenViewHandle, NSString)
RCT_EXPORT_VIEW_PROPERTY(controllerHandle, NSString)
RCT_EXPORT_VIEW_PROPERTY(attachNativeView, BOOL)
RCT_EXPORT_VIEW_PROPERTY(attachControllerToParent, BOOL)
RCT_EXPORT_VIEW_PROPERTY(collectChildren, BOOL)
RCT_EXPORT_VIEW_PROPERTY(detachControllerFromParent, BOOL)
RCT_EXPORT_VIEW_PROPERTY(detachControllerView, BOOL)
RCT_EXPORT_VIEW_PROPERTY(disableDetachedChildrenTouchHandler, BOOL)
RCT_EXPORT_VIEW_PROPERTY(disableUIKitHostWindowAttachRefresh, BOOL)
RCT_EXPORT_VIEW_PROPERTY(emitOffWindowHostReady, BOOL)
RCT_EXPORT_VIEW_PROPERTY(ignoreHostReadyWindowAttachment, BOOL)
RCT_EXPORT_VIEW_PROPERTY(externalDetachedChildrenOwner, BOOL)
RCT_EXPORT_VIEW_PROPERTY(fabricLifecycleCallbacks, BOOL)
RCT_EXPORT_VIEW_PROPERTY(immediateTransactionCommit, BOOL)
RCT_EXPORT_VIEW_PROPERTY(mountChildrenDirectlyToChildrenView, BOOL)
RCT_EXPORT_VIEW_PROPERTY(layoutDirectChildrenToChildrenViewBounds, BOOL)
RCT_EXPORT_VIEW_PROPERTY(pinNativeViewToHost, BOOL)
RCT_EXPORT_VIEW_PROPERTY(preserveDetachedChildrenLayout, BOOL)
RCT_EXPORT_VIEW_PROPERTY(detachedChildrenContentOffsetX, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(detachedChildrenContentOffsetY, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(debugName, NSString)
RCT_EXPORT_VIEW_PROPERTY(uikitHostPropsJson, NSString)
RCT_EXPORT_VIEW_PROPERTY(uikitHostPropsRevision, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(hostId, NSString)
RCT_EXPORT_VIEW_PROPERTY(hostReadyId, NSString)
RCT_EXPORT_VIEW_PROPERTY(updateRevision, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(mountedRevision, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(onHostReady, RCTDirectEventBlock)

@end

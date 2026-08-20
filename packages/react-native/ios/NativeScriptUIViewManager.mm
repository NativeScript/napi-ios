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
RCT_EXPORT_VIEW_PROPERTY(detachControllerView, BOOL)
RCT_EXPORT_VIEW_PROPERTY(debugName, NSString)
RCT_EXPORT_VIEW_PROPERTY(hostId, NSString)
RCT_EXPORT_VIEW_PROPERTY(hostReadyId, NSString)
RCT_EXPORT_VIEW_PROPERTY(updateRevision, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(mountedRevision, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(onHostReady, RCTDirectEventBlock)

@end

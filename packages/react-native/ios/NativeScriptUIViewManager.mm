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
RCT_EXPORT_VIEW_PROPERTY(debugName, NSString)

@end

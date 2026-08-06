#import <React/RCTViewComponentView.h>

@interface NativeScriptUIViewComponentView : RCTViewComponentView

// YES while a Fabric mounting transaction is applying mutations to this view
// (between mountingTransactionWillMount and mountingTransactionDidMount).
// Hosts created lazily during a transaction must not replay a partial child
// snapshot as a transactionCommitted — didMount delivers the complete one.
@property(nonatomic, assign, readonly) BOOL isApplyingMountingTransaction;

+ (nullable NativeScriptUIViewComponentView*)nativeScriptComponentViewForReactTag:(NSInteger)tag;

- (NSDictionary<NSString*, NSString*>*)applyNativeScriptUIKitHostProps:
    (NSDictionary<NSString*, id>*)props;

- (UIView*)nativeScriptCurrentContainerView;

@end

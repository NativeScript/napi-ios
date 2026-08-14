#import <React/RCTViewComponentView.h>

@interface NativeScriptUIViewComponentView : RCTViewComponentView

// YES while a Fabric mounting transaction is applying mutations to this view
// (between mountingTransactionWillMount and mountingTransactionDidMount).
// Hosts created lazily during a transaction must not replay a partial child
// snapshot as a transactionCommitted — didMount delivers the complete one.
@property(nonatomic, assign, readonly) BOOL isApplyingMountingTransaction;

// YES (only meaningful while isApplyingMountingTransaction is YES) if the
// Fabric mounting transaction currently being applied contains ANY
// Remove/Delete mutation ANYWHERE in the transaction (transaction-wide, not
// scoped to this host). C-fix-3 (iteration 9 cold-launch stall series) scopes
// mid-transaction refresh-tail coalescing to insert-only transactions using
// this flag — a transaction with a removal never takes that path, so the
// pop/content-discipline path stays byte-identical.
@property(nonatomic, assign, readonly) BOOL currentTransactionHasRemovalMutation;

+ (nullable NativeScriptUIViewComponentView*)nativeScriptComponentViewForReactTag:(NSInteger)tag;

- (NSDictionary<NSString*, NSString*>*)applyNativeScriptUIKitHostProps:
    (NSDictionary<NSString*, id>*)props;

- (UIView*)nativeScriptCurrentContainerView;

@end

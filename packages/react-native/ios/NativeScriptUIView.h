#import <UIKit/UIKit.h>
#import <React/RCTComponent.h>

@class NativeScriptUIView;

@protocol NativeScriptUIViewHostReadyDelegate <NSObject>
- (void)nativeScriptUIView:(NativeScriptUIView*)view
          didHostReady:(NSDictionary<NSString*, id>*)event;
@end

@interface NativeScriptUIView : UIView

@property(nonatomic, copy) NSString* hostId;
@property(nonatomic, copy) NSString* hostReadyId;
@property(nonatomic, copy) NSString* nativeViewHandle;
@property(nonatomic, copy) NSString* childrenViewHandle;
@property(nonatomic, copy) NSString* controllerHandle;
@property(nonatomic, assign) BOOL attachNativeView;
@property(nonatomic, assign) BOOL attachControllerToParent;
@property(nonatomic, assign) BOOL adoptHostViewAsControllerView;
@property(nonatomic, assign) BOOL collectChildren;
@property(nonatomic, assign) BOOL detachControllerFromParent;
@property(nonatomic, assign) BOOL detachControllerView;
@property(nonatomic, assign) BOOL disableDetachedChildrenTouchHandler;
@property(nonatomic, assign) BOOL disableUIKitHostWindowAttachRefresh;
@property(nonatomic, assign) BOOL emitOffWindowHostReady;
@property(nonatomic, assign) BOOL ignoreHostReadyWindowAttachment;
@property(nonatomic, assign) BOOL externalDetachedChildrenOwner;
@property(nonatomic, assign) BOOL fabricLifecycleCallbacks;
@property(nonatomic, assign) BOOL immediateTransactionCommit;
@property(nonatomic, assign) BOOL deferTransactionCommitOnRemovals;
// iteration 10, Stage 1: default-off. See NativeScriptUIViewNativeComponent.ts.
@property(nonatomic, assign) BOOL nativeCommitObservations;
@property(nonatomic, assign) BOOL mountChildrenDirectlyToChildrenView;
@property(nonatomic, assign) BOOL layoutDirectChildrenToChildrenViewBounds;
@property(nonatomic, assign) BOOL pinNativeViewToHost;
@property(nonatomic, assign) BOOL preserveDetachedChildrenLayout;
@property(nonatomic, assign) CGFloat detachedChildrenContentOffsetX;
@property(nonatomic, assign) CGFloat detachedChildrenContentOffsetY;
@property(nonatomic, copy) NSString* debugName;
@property(nonatomic, copy) NSString* uikitHostPropsJson;
@property(nonatomic, assign) NSInteger uikitHostPropsRevision;
@property(nonatomic, assign) NSInteger updateRevision;
@property(nonatomic, assign) NSInteger mountedRevision;
@property(nonatomic, copy) RCTDirectEventBlock onHostReady;
@property(nonatomic, assign) id<NativeScriptUIViewHostReadyDelegate> hostReadyDelegate;
@property(nonatomic, assign) UIView* fabricComponentView;

- (void)layoutDetachedChildrenViewSubviewsIfNeeded;
- (BOOL)hostedContentPointInside:(CGPoint)point withEvent:(UIEvent*)event;
- (UIView*)hostedContentHitTest:(CGPoint)point withEvent:(UIEvent*)event;
- (BOOL)shouldHideEmptyFabricHostWrapper;
- (void)notifyFabricTransactionCommitted;
- (void)notifyFabricTransactionCommittedWithModifiedChildren:(BOOL)hasModifiedChildren
                                               modifiedProps:(BOOL)hasModifiedProps;
- (void)notifyFabricTransactionCommittedWithModifiedChildren:(BOOL)hasModifiedChildren
                                               modifiedProps:(BOOL)hasModifiedProps
                                                   mutations:(NSArray<NSDictionary<NSString*, id>*>*)mutations;
// SEAM D STAGE 0 (Fabric transactionCommitted exactly-once dedup): a single
// delivery token owned by this host, shared by every producer that can
// schedule a deferred `transactionCommitted` -- ComponentView's
// mountingTransactionDidMount (the legitimate initiator) and mount-op
// fallback, plus this class's own props-revision path. It is bumped on every
// actual delivery (see notifyFabricTransactionCommittedWithModifiedChildren:
// modifiedProps:mutations:) and on setHostId:/dealloc. A producer that is
// about to schedule a dispatch_async delivery must call
// -advanceFabricTransactionDeliveryToken first (this both reserves a fresh
// token for its own deferred check AND immediately invalidates any
// still-pending schedule from another producer for the same commit); the
// deferred block then re-checks -fabricTransactionDeliveryToken when it runs
// and no-ops if it no longer matches -- i.e. some other producer (or a
// newer schedule, or a synchronous delivery) already handled this commit.
- (NSUInteger)fabricTransactionDeliveryToken;
- (NSUInteger)advanceFabricTransactionDeliveryToken;
- (NSArray<NSDictionary<NSString*, id>*>*)fabricMountedChildrenSnapshot;
- (BOOL)refreshDetachedChildrenHost;
- (void)mountUIKitHostIfNeeded;
- (NSDictionary<NSString*, NSString*>*)uikitHostHandles;
- (NSArray<UIView*>*)collectedChildComponentViews;
- (void)recordFabricChildComponentViewMounted:(UIView*)view index:(NSInteger)index;
- (void)recordFabricChildComponentViewUnmounted:(UIView*)view;
- (void)clearFabricChildComponentViewRecords;
- (void)restoreFabricChildComponentViewsForUnmount:(UIView*)view index:(NSInteger)index;
// RNS `willBeUnmountedInUpcomingTransaction` parity: a Fabric-unmounted child
// must never be re-attached. `clearFabricRelocationRecordForUnmountedChildComponentView:`
// wraps the internal relocation-record clear for a child that just received
// its FINAL unmountChildComponentView detach. The pending-unmount-tag set is
// populated (from Remove/Delete mutations targeting this container) before a
// mounting transaction's unmounts run, and consulted while restoring
// relocated children so a sibling's unmount can never resurrect a view
// Fabric is deleting in the same transaction.
- (void)clearFabricRelocationRecordForUnmountedChildComponentView:(UIView*)view;
- (void)markFabricChildComponentViewTagsPendingUnmountForCurrentTransaction:
    (NSSet<NSNumber*>*)tags;
- (void)clearFabricChildComponentViewTagsPendingUnmountForCurrentTransaction;
- (BOOL)unmountCollectedChildComponentView:(UIView*)view;
- (void)notifyFabricMountingTransactionWillMount;
- (void)notifyFabricChildMounted:(UIView*)componentView
               childContainerView:(UIView*)childContainerView
                            index:(NSInteger)index;
- (void)notifyFabricChildUnmounted:(UIView*)componentView
                 childContainerView:(UIView*)childContainerView
                              index:(NSInteger)index;
- (BOOL)isAdoptedControllerViewOwnedByNavigationController;
- (BOOL)shouldDeferContainerFrameToNavigationController;
- (BOOL)containerFrameIsUIKitDrivenByNavigationController;

@end

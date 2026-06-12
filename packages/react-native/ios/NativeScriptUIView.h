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
@property(nonatomic, assign) BOOL detachControllerView;
@property(nonatomic, copy) NSString* debugName;
@property(nonatomic, assign) NSInteger updateRevision;
@property(nonatomic, assign) NSInteger mountedRevision;
@property(nonatomic, copy) RCTDirectEventBlock onHostReady;
@property(nonatomic, assign) id<NativeScriptUIViewHostReadyDelegate> hostReadyDelegate;

- (void)layoutDetachedChildrenViewSubviewsIfNeeded;
- (BOOL)refreshDetachedChildrenHost;

@end

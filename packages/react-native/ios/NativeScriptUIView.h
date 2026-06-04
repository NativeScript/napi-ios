#import <UIKit/UIKit.h>

@interface NativeScriptUIView : UIView

@property(nonatomic, copy) NSString* hostId;
@property(nonatomic, copy) NSString* nativeViewHandle;
@property(nonatomic, copy) NSString* childrenViewHandle;
@property(nonatomic, copy) NSString* controllerHandle;
@property(nonatomic, copy) NSString* debugName;

@end

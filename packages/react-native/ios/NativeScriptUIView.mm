#import "NativeScriptUIView.h"
#import "NativeScriptUIKitHost.h"

static id NativeScriptNSObjectFromHandle(NSString* handle) {
  if (handle == nil || handle.length == 0) {
    return nil;
  }

  const char* text = handle.UTF8String;
  if (text == nullptr || text[0] == '\0') {
    return nil;
  }

  char* end = nullptr;
  unsigned long long address = strtoull(text, &end, 0);
  if (address == 0 || end == text || (end != nullptr && *end != '\0')) {
    return nil;
  }

  id object = reinterpret_cast<id>(static_cast<uintptr_t>(address));
  return object;
}

static UIView* NativeScriptUIViewFromHandle(NSString* handle) {
  id object = NativeScriptNSObjectFromHandle(handle);
  if (object == nil || ![object isKindOfClass:UIView.class]) {
    return nil;
  }

  return static_cast<UIView*>(object);
}

static UIViewController* NativeScriptUIViewControllerFromHandle(NSString* handle) {
  id object = NativeScriptNSObjectFromHandle(handle);
  if (object == nil || ![object isKindOfClass:UIViewController.class]) {
    return nil;
  }

  return static_cast<UIViewController*>(object);
}

static UIViewController* NativeScriptNearestViewController(UIView* view) {
  UIResponder* responder = view;
  while (responder != nil) {
    responder = responder.nextResponder;
    if ([responder isKindOfClass:UIViewController.class]) {
      return static_cast<UIViewController*>(responder);
    }
  }
  return nil;
}

@implementation NativeScriptUIView {
  UIView* _nativeView;
  UIView* _childrenView;
  UIViewController* _viewController;
}

- (void)dealloc {
  [self detachViewController];
  [_nativeView removeFromSuperview];
  [_nativeView release];
  [_childrenView release];
  [_viewController release];
  [_nativeViewHandle release];
  [_childrenViewHandle release];
  [_controllerHandle release];
  [_hostId release];
  [_debugName release];
  [super dealloc];
}

- (void)setHostId:(NSString*)hostId {
  if ((_hostId == hostId) || [_hostId isEqualToString:hostId]) {
    return;
  }

  [_hostId release];
  _hostId = [hostId copy];
  [self mountUIKitHostIfNeeded];
}

- (void)setNativeViewHandle:(NSString*)nativeViewHandle {
  if ((_nativeViewHandle == nativeViewHandle) ||
      [_nativeViewHandle isEqualToString:nativeViewHandle]) {
    return;
  }

  [_nativeViewHandle release];
  _nativeViewHandle = [nativeViewHandle copy];
  [self setNativeView:NativeScriptUIViewFromHandle(_nativeViewHandle)];
}

- (void)setChildrenViewHandle:(NSString*)childrenViewHandle {
  if ((_childrenViewHandle == childrenViewHandle) ||
      [_childrenViewHandle isEqualToString:childrenViewHandle]) {
    return;
  }

  [_childrenViewHandle release];
  _childrenViewHandle = [childrenViewHandle copy];
  [self setChildrenView:NativeScriptUIViewFromHandle(_childrenViewHandle)];
}

- (void)setControllerHandle:(NSString*)controllerHandle {
  if ((_controllerHandle == controllerHandle) ||
      [_controllerHandle isEqualToString:controllerHandle]) {
    return;
  }

  [_controllerHandle release];
  _controllerHandle = [controllerHandle copy];
  [self setViewController:NativeScriptUIViewControllerFromHandle(_controllerHandle)];
}

- (void)setDebugName:(NSString*)debugName {
  if ((_debugName == debugName) || [_debugName isEqualToString:debugName]) {
    return;
  }

  [_debugName release];
  _debugName = [debugName copy];
}

- (NSString*)description {
  if (_debugName.length == 0) {
    return [super description];
  }

  NSString* description = [super description];
  if ([description hasSuffix:@">"]) {
    return [[description substringToIndex:description.length - 1]
        stringByAppendingFormat:@"; debugName = %@>", _debugName];
  }
  return [description stringByAppendingFormat:@" debugName = %@", _debugName];
}

- (void)mountUIKitHostIfNeeded {
  if (_hostId.length == 0) {
    return;
  }

  NSDictionary<NSString*, NSString*>* handles = NativeScriptCreateUIKitHost(_hostId);
  if (handles == nil) {
    return;
  }

  NSString* nativeViewHandle = handles[@"nativeViewHandle"];
  NSString* childrenViewHandle = handles[@"childrenViewHandle"];
  NSString* controllerHandle = handles[@"controllerHandle"];

  if (nativeViewHandle.length > 0) {
    self.nativeViewHandle = nativeViewHandle;
  }
  if (childrenViewHandle.length > 0) {
    self.childrenViewHandle = childrenViewHandle;
  }
  if (controllerHandle.length > 0) {
    self.controllerHandle = controllerHandle;
  }
}

- (void)setChildrenView:(UIView*)childrenView {
  if (_childrenView == childrenView) {
    return;
  }

  [_childrenView release];
  _childrenView = [childrenView retain];
  [self moveReactSubviewsToChildrenView];
}

- (void)setNativeView:(UIView*)nativeView {
  if (_nativeView == nativeView) {
    return;
  }

  [_nativeView removeFromSuperview];
  [_nativeView release];
  _nativeView = nil;

  if (nativeView == nil) {
    return;
  }

  _nativeView = [nativeView retain];
  [_nativeView removeFromSuperview];
  _nativeView.frame = self.bounds;
  _nativeView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
  [super insertSubview:_nativeView atIndex:0];
  [self moveReactSubviewsToChildrenView];
  [self setNeedsLayout];
}

- (void)setViewController:(UIViewController*)viewController {
  if (_viewController == viewController) {
    return;
  }

  [self detachViewController];
  [_viewController release];
  _viewController = [viewController retain];
  [self setNativeView:_viewController.view];
  [self attachViewControllerIfPossible];
}

- (void)attachViewControllerIfPossible {
  if (_viewController == nil || _viewController.parentViewController != nil ||
      self.window == nil) {
    return;
  }

  UIViewController* parent = NativeScriptNearestViewController(self);
  if (parent == nil || parent == _viewController) {
    return;
  }

  [parent addChildViewController:_viewController];
  [_viewController didMoveToParentViewController:parent];
}

- (void)detachViewController {
  if (_viewController == nil || _viewController.parentViewController == nil) {
    return;
  }

  [_viewController willMoveToParentViewController:nil];
  [_viewController removeFromParentViewController];
}

- (void)moveReactSubviewsToChildrenView {
  if (_childrenView == nil) {
    return;
  }

  NSArray<UIView*>* subviews = [self.subviews copy];
  for (UIView* subview in subviews) {
    if (subview == _nativeView || subview == _childrenView) {
      continue;
    }
    [_childrenView addSubview:subview];
  }
  [subviews release];
}

- (void)insertSubview:(UIView*)view atIndex:(NSInteger)index {
  if (_childrenView != nil && view != _nativeView && view != _childrenView) {
    NSUInteger targetIndex =
        MIN(static_cast<NSUInteger>(MAX(index, 0)), _childrenView.subviews.count);
    [_childrenView insertSubview:view atIndex:targetIndex];
    return;
  }
  [super insertSubview:view atIndex:index];
}

- (void)didMoveToWindow {
  [super didMoveToWindow];
  [self mountUIKitHostIfNeeded];
  [self attachViewControllerIfPossible];
}

- (void)layoutSubviews {
  [super layoutSubviews];
  _nativeView.frame = self.bounds;
}

@end

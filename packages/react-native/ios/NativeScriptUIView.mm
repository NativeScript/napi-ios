#import "NativeScriptUIView.h"
#import "NativeScriptUIKitHost.h"
#import <objc/runtime.h>

#if __has_include(<React/RCTSurfaceTouchHandler.h>)
#import <React/RCTSurfaceTouchHandler.h>
#endif

#if __has_include(<React/RCTRootView.h>) && __has_include(<React/RCTTouchHandler.h>)
#import <React/RCTRootView.h>
#import <React/RCTTouchHandler.h>
#endif

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

static NSString* NativeScriptHandleFromNSObject(id object) {
  if (object == nil) {
    return @"";
  }

  return [NSString stringWithFormat:@"%p", object];
}

static BOOL NativeScriptChildrenViewHasVisibleChild(UIView* childrenView, UIView* sentinel) {
  if (childrenView == nil) {
    return NO;
  }

  for (UIView* subview in childrenView.subviews) {
    if (subview == sentinel || subview.hidden || subview.alpha <= 0.01) {
      continue;
    }

    return YES;
  }

  return NO;
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

static BOOL NativeScriptViewIsDescendantOfView(UIView* view, UIView* ancestor) {
  UIView* current = view;
  while (current != nil) {
    if (current == ancestor) {
      return YES;
    }
    current = current.superview;
  }
  return NO;
}

static BOOL NativeScriptViewHasGestureRecognizer(UIView* view, UIGestureRecognizer* recognizer) {
  if (view == nil || recognizer == nil) {
    return NO;
  }

  for (UIGestureRecognizer* existingRecognizer in view.gestureRecognizers) {
    if (existingRecognizer == recognizer) {
      return YES;
    }
  }

  return NO;
}

static UIView* NativeScriptGestureRecognizerAttachedView(id recognizer) {
  if (recognizer == nil || ![recognizer isKindOfClass:UIGestureRecognizer.class]) {
    return nil;
  }

  return static_cast<UIGestureRecognizer*>(recognizer).view;
}

static UIGestureRecognizer* NativeScriptFindAncestorSurfaceTouchHandler(UIView* view) {
#if __has_include(<React/RCTSurfaceTouchHandler.h>)
  UIView* parent = view.superview;
  NSUInteger depth = 0;

  while (parent != nil && depth < 32) {
    for (UIGestureRecognizer* recognizer in parent.gestureRecognizers) {
      if ([recognizer isKindOfClass:RCTSurfaceTouchHandler.class]) {
        return recognizer;
      }
    }

    parent = parent.superview;
    depth += 1;
  }
#endif

  return nil;
}

static BOOL NativeScriptShouldForwardControllerAppearance(UIViewController* controller) {
  return controller != nil && controller.view != nil && controller.view.window != nil;
}

static BOOL NativeScriptHostedViewContainsControllerView(UIView* hostedView,
                                                         UIViewController* controller) {
  return hostedView != nil && controller != nil && controller.view != nil &&
      NativeScriptViewIsDescendantOfView(controller.view, hostedView);
}

static CGRect NativeScriptEffectiveTabBarHitBounds(UITabBar* tabBar) {
  CGRect bounds = tabBar.bounds;
  CGSize fittingSize = [tabBar sizeThatFits:CGSizeMake(bounds.size.width, bounds.size.height)];
  CGFloat maximumHeight = MAX(fittingSize.height + 32, 96);

  if (bounds.size.height > maximumHeight) {
    bounds.origin.y = CGRectGetMaxY(bounds) - maximumHeight;
    bounds.size.height = maximumHeight;
  }

  return CGRectInset(bounds, -24, -16);
}

static BOOL NativeScriptPointInsideTabBarHitArea(UITabBar* tabBar, UIWindow* window,
                                                 CGPoint windowPoint) {
  if (tabBar == nil || tabBar.hidden || tabBar.alpha <= 0.01 ||
      !tabBar.userInteractionEnabled) {
    return NO;
  }

  CGPoint localPoint = [tabBar convertPoint:windowPoint fromView:window];
  return CGRectContainsPoint(NativeScriptEffectiveTabBarHitBounds(tabBar), localPoint);
}

static UITabBar* NativeScriptVisibleTabBarAtPoint(UIView* root, UIWindow* window,
                                                  CGPoint windowPoint) {
  if (root.hidden || root.alpha <= 0.01 || !root.userInteractionEnabled) {
    return nil;
  }

  if ([root isKindOfClass:UITabBar.class]) {
    UITabBar* tabBar = static_cast<UITabBar*>(root);
    if (NativeScriptPointInsideTabBarHitArea(tabBar, window, windowPoint)) {
      return static_cast<UITabBar*>(root);
    }
  }

  for (UIView* subview in [root.subviews reverseObjectEnumerator]) {
    UITabBar* tabBar = NativeScriptVisibleTabBarAtPoint(subview, window, windowPoint);
    if (tabBar != nil) {
      return tabBar;
    }
  }

  return nil;
}

static BOOL NativeScriptSubviewShouldFillParent(UIView* parent, UIView* child) {
  if (parent == nil || child == nil) {
    return NO;
  }

  const CGRect parentBounds = parent.bounds;
  const CGRect childFrame = child.frame;
  if (parentBounds.size.width <= 0) {
    return NO;
  }

  return fabs(childFrame.origin.x) < 1 && fabs(childFrame.origin.y) < 1 &&
         (childFrame.size.width <= 0 || fabs(childFrame.size.width - parentBounds.size.width) < 2);
}

static void NativeScriptLayoutHostedSubviewChain(UIView* root, NSUInteger depth) {
  if (root == nil || depth > 12 || [root isKindOfClass:UIScrollView.class]) {
    return;
  }

  const CGRect bounds = root.bounds;
  for (UIView* subview in root.subviews) {
    if (!NativeScriptSubviewShouldFillParent(root, subview)) {
      continue;
    }

    subview.frame = bounds;
    subview.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    [subview setNeedsLayout];
    [subview layoutIfNeeded];
    NativeScriptLayoutHostedSubviewChain(subview, depth + 1);
  }
}

@class NativeScriptUIView;

static const void* NativeScriptDetachedChildrenOwnerKey =
    &NativeScriptDetachedChildrenOwnerKey;

static NativeScriptUIView* NativeScriptDetachedChildrenOwner(UIView* view) {
  id owner = view == nil ? nil : objc_getAssociatedObject(view, NativeScriptDetachedChildrenOwnerKey);
  if (owner == nil || ![owner isKindOfClass:NativeScriptUIView.class]) {
    return nil;
  }

  return static_cast<NativeScriptUIView*>(owner);
}

static void NativeScriptSetDetachedChildrenOwner(UIView* view, NativeScriptUIView* owner) {
  if (view == nil) {
    return;
  }

  objc_setAssociatedObject(
      view, NativeScriptDetachedChildrenOwnerKey, owner, OBJC_ASSOCIATION_ASSIGN);
}

@interface NativeScriptUIView ()
- (void)attachDetachedChildrenTouchHandlerIfNeeded;
- (void)installDetachedChildrenTouchSentinelIfNeeded;
- (void)notifyHostReadyIfNeeded;
- (BOOL)refreshDetachedChildrenHost;
- (void)updateDetachedChildrenTouchHandlerOrigin;
@end

@interface NativeScriptDetachedChildrenTouchSentinel : UIView
@property(nonatomic, assign) NativeScriptUIView* owner;
@end

@implementation NativeScriptDetachedChildrenTouchSentinel

- (void)didMoveToWindow {
  [super didMoveToWindow];
  [self.owner refreshDetachedChildrenHost];
}

- (void)didMoveToSuperview {
  [super didMoveToSuperview];
  [self.owner refreshDetachedChildrenHost];
}

- (void)layoutSubviews {
  [super layoutSubviews];
  [self.owner refreshDetachedChildrenHost];
}

@end

@implementation NativeScriptUIView {
  UIView* _nativeView;
  UIView* _childrenView;
  UIViewController* _viewController;
  id _detachedTouchHandler;
  UIView* _detachedTouchHandlerView;
  UIWindow* _detachedTouchHandlerWindow;
  NativeScriptDetachedChildrenTouchSentinel* _detachedTouchSentinel;
  NSInteger _hostMountRetryCount;
  NSString* _lastHostReadyKey;
}

- (void)dealloc {
  if (_hostId.length > 0) {
    NativeScriptRunUIKitHostLifecycle(_hostId, @"dispose");
  }
  [self detachViewController];
  [self detachDetachedChildrenTouchHandler];
  [_detachedTouchSentinel removeFromSuperview];
  [_detachedTouchSentinel release];
  [_nativeView removeFromSuperview];
  [_nativeView release];
  if (NativeScriptDetachedChildrenOwner(_childrenView) == self) {
    NativeScriptSetDetachedChildrenOwner(_childrenView, nil);
  }
  [_childrenView release];
  [_viewController release];
  [_detachedTouchHandler release];
  [_detachedTouchHandlerView release];
  [_nativeViewHandle release];
  [_childrenViewHandle release];
  [_controllerHandle release];
  [_hostId release];
  [_hostReadyId release];
  [_debugName release];
  [_onHostReady release];
  [_lastHostReadyKey release];
  [super dealloc];
}

- (void)setHostId:(NSString*)hostId {
  if ((_hostId == hostId) || [_hostId isEqualToString:hostId]) {
    return;
  }

  NSString* previousHostId = [_hostId copy];
  if (previousHostId.length > 0) {
    NativeScriptRunUIKitHostLifecycle(previousHostId, @"dispose");
  }
  [previousHostId release];

  [_hostId release];
  _hostId = [hostId copy];
  _hostMountRetryCount = 0;
  [_lastHostReadyKey release];
  _lastHostReadyKey = nil;
  [self mountUIKitHostIfNeeded];
  [self notifyHostReadyIfNeeded];
}

- (void)setHostReadyId:(NSString*)hostReadyId {
  if ((_hostReadyId == hostReadyId) || [_hostReadyId isEqualToString:hostReadyId]) {
    return;
  }

  [_hostReadyId release];
  _hostReadyId = [hostReadyId copy];
  [_lastHostReadyKey release];
  _lastHostReadyKey = nil;
  [self notifyHostReadyIfNeeded];
}

- (void)setOnHostReady:(RCTDirectEventBlock)onHostReady {
  if (_onHostReady == onHostReady) {
    return;
  }

  [_onHostReady release];
  _onHostReady = [onHostReady copy];
  [self notifyHostReadyIfNeeded];
}

- (void)setNativeViewHandle:(NSString*)nativeViewHandle {
  if ((_nativeViewHandle == nativeViewHandle) ||
      [_nativeViewHandle isEqualToString:nativeViewHandle]) {
    return;
  }

  [_nativeViewHandle release];
  _nativeViewHandle = [nativeViewHandle copy];
  UIView* nativeView = NativeScriptUIViewFromHandle(_nativeViewHandle);
  if (_detachControllerView && _viewController != nil && nativeView == _viewController.view) {
    nativeView = nil;
  }
  if (nativeView == nil && _nativeViewHandle.length == 0 && !_detachControllerView &&
      _viewController != nil) {
    nativeView = _viewController.view;
  }
  [self setNativeView:nativeView];
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

- (void)setDetachControllerView:(BOOL)detachControllerView {
  if (_detachControllerView == detachControllerView) {
    return;
  }

  if (detachControllerView) {
    [self detachViewController];
    if (_viewController != nil && _nativeView == _viewController.view) {
      [self setNativeView:nil];
    }
  }

  _detachControllerView = detachControllerView;

  if (!_detachControllerView && _viewController != nil) {
    if (_nativeViewHandle.length == 0) {
      [self setNativeView:_viewController.view];
    }
    [self attachViewControllerIfPossible];
  }
}

- (void)setDebugName:(NSString*)debugName {
  if ((_debugName == debugName) || [_debugName isEqualToString:debugName]) {
    return;
  }

  [_debugName release];
  _debugName = [debugName copy];
}

- (void)setUpdateRevision:(NSInteger)updateRevision {
  if (_updateRevision == updateRevision) {
    return;
  }

  _updateRevision = updateRevision;
  if (_updateRevision > 0) {
    [self runUIKitHostLifecycle:@"update"];
  }
}

- (void)setMountedRevision:(NSInteger)mountedRevision {
  if (_mountedRevision == mountedRevision) {
    return;
  }

  _mountedRevision = mountedRevision;
  if (_mountedRevision > 0) {
    [self runUIKitHostLifecycle:@"mounted"];
  }
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

- (NSDictionary<NSString*, id>*)hostReadyEventWithHasChildren:(BOOL)hasChildren {
  NSString* readyId = _hostReadyId.length > 0 ? _hostReadyId : _hostId;
  if (readyId.length == 0) {
    return nil;
  }

  NSMutableDictionary<NSString*, id>* event = [NSMutableDictionary dictionaryWithCapacity:6];
  event[@"hostReadyId"] = readyId;
  event[@"hostId"] = _hostId ?: @"";
  event[@"nativeViewHandle"] = NativeScriptHandleFromNSObject(_nativeView);
  event[@"childrenViewHandle"] = NativeScriptHandleFromNSObject(_childrenView);
  event[@"controllerHandle"] = NativeScriptHandleFromNSObject(_viewController);
  event[@"hasChildren"] = @(hasChildren);
  return event;
}

- (void)notifyHostReadyIfNeeded {
  const BOOL hasChildren =
      NativeScriptChildrenViewHasVisibleChild(_childrenView, _detachedTouchSentinel);
  if (!hasChildren) {
    return;
  }

  NSDictionary<NSString*, id>* event = [self hostReadyEventWithHasChildren:hasChildren];
  if (event == nil) {
    return;
  }

  NSString* key = [NSString
      stringWithFormat:@"%@|%@|%@|%@|%@|%@",
                       event[@"hostReadyId"] ?: @"",
                       event[@"hostId"] ?: @"",
                       event[@"nativeViewHandle"] ?: @"",
                       event[@"childrenViewHandle"] ?: @"",
                       event[@"controllerHandle"] ?: @"",
                       [event[@"hasChildren"] boolValue] ? @"1" : @"0"];
  if ([_lastHostReadyKey isEqualToString:key]) {
    return;
  }

  [_lastHostReadyKey release];
  _lastHostReadyKey = [key copy];

  if (_onHostReady != nil) {
    _onHostReady(event);
  }
  if ([_hostReadyDelegate respondsToSelector:@selector(nativeScriptUIView:didHostReady:)]) {
    [_hostReadyDelegate nativeScriptUIView:self didHostReady:event];
  }
}

- (void)applyUIKitHostHandles:(NSDictionary<NSString*, NSString*>*)handles {
  if (handles == nil) {
    return;
  }

  NSString* nativeViewHandle = handles[@"nativeViewHandle"];
  NSString* childrenViewHandle = handles[@"childrenViewHandle"];
  NSString* controllerHandle = handles[@"controllerHandle"];

  if (controllerHandle.length > 0) {
    self.controllerHandle = controllerHandle;
  }
  if (nativeViewHandle.length > 0) {
    self.nativeViewHandle = nativeViewHandle;
  }
  if (childrenViewHandle.length > 0) {
    self.childrenViewHandle = childrenViewHandle;
  }
  [self notifyHostReadyIfNeeded];
}

- (void)mountUIKitHostIfNeeded {
  if (_hostId.length == 0) {
    return;
  }

  NSDictionary<NSString*, NSString*>* handles = NativeScriptCreateUIKitHost(_hostId);
  if (handles != nil) {
    _hostMountRetryCount = 0;
    [self applyUIKitHostHandles:handles];
    return;
  }

  if (_hostMountRetryCount >= 8) {
    return;
  }

  _hostMountRetryCount += 1;
  NSString* retryHostId = [_hostId copy];
  dispatch_async(dispatch_get_main_queue(), ^{
    if (retryHostId.length > 0 && [self->_hostId isEqualToString:retryHostId]) {
      [self mountUIKitHostIfNeeded];
    }
    [retryHostId release];
  });
}

- (void)runUIKitHostLifecycle:(NSString*)phase {
  if (_hostId.length == 0 || phase.length == 0) {
    return;
  }

  [self mountUIKitHostIfNeeded];
  [self applyUIKitHostHandles:NativeScriptRunUIKitHostLifecycle(_hostId, phase)];
}

- (void)setChildrenView:(UIView*)childrenView {
  if (_childrenView == childrenView) {
    return;
  }

  [self detachDetachedChildrenTouchHandler];
  [_detachedTouchSentinel removeFromSuperview];
  [_detachedTouchSentinel release];
  _detachedTouchSentinel = nil;
  if (NativeScriptDetachedChildrenOwner(_childrenView) == self) {
    NativeScriptSetDetachedChildrenOwner(_childrenView, nil);
  }
  [_childrenView release];
  _childrenView = [childrenView retain];
  NativeScriptSetDetachedChildrenOwner(_childrenView, self);
  [self moveReactSubviewsToChildrenView];
  [self installDetachedChildrenTouchSentinelIfNeeded];
  [self attachDetachedChildrenTouchHandlerIfNeeded];
  [self notifyHostReadyIfNeeded];
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
  [self notifyHostReadyIfNeeded];
}

- (void)setViewController:(UIViewController*)viewController {
  if (_viewController == viewController) {
    return;
  }

  [self detachViewController];
  [_viewController release];
  _viewController = [viewController retain];
  if (_detachControllerView) {
    if (_viewController != nil && _nativeView == _viewController.view) {
      [self setNativeView:nil];
    }
    return;
  }
  if (_nativeViewHandle.length == 0) {
    [self setNativeView:_viewController.view];
  }
  [self attachViewControllerIfPossible];
  [self notifyHostReadyIfNeeded];
}

- (void)attachViewControllerIfPossible {
  if (_detachControllerView || _viewController == nil ||
      _viewController.parentViewController != nil || self.window == nil) {
    return;
  }

  UIViewController* parent = NativeScriptNearestViewController(self);
  if (parent == nil || parent == _viewController) {
    return;
  }

  UIView* hostedViewToReinsert = nil;
  NSUInteger hostedViewIndex = NSNotFound;
  if (_nativeView.superview == self &&
      NativeScriptHostedViewContainsControllerView(_nativeView, _viewController)) {
    hostedViewToReinsert = [_nativeView retain];
    hostedViewIndex = [self.subviews indexOfObject:hostedViewToReinsert];
    [hostedViewToReinsert removeFromSuperview];
  }

  const BOOL shouldForwardAppearance =
      hostedViewToReinsert == nil && NativeScriptShouldForwardControllerAppearance(_viewController);
  if (shouldForwardAppearance) {
    [_viewController beginAppearanceTransition:YES animated:NO];
  }

  [parent addChildViewController:_viewController];
  if (hostedViewToReinsert != nil) {
    NSUInteger targetIndex =
        hostedViewIndex == NSNotFound ? 0 : MIN(hostedViewIndex, self.subviews.count);
    [super insertSubview:hostedViewToReinsert atIndex:targetIndex];
  }
  [_viewController didMoveToParentViewController:parent];

  if (shouldForwardAppearance) {
    [_viewController endAppearanceTransition];
  }
  [hostedViewToReinsert release];
}

- (void)detachViewController {
  if (_detachControllerView || _viewController == nil ||
      _viewController.parentViewController == nil) {
    return;
  }

  UIView* hostedViewToReinsert = nil;
  NSUInteger hostedViewIndex = NSNotFound;
  if (_nativeView.superview == self &&
      NativeScriptHostedViewContainsControllerView(_nativeView, _viewController)) {
    hostedViewToReinsert = [_nativeView retain];
    hostedViewIndex = [self.subviews indexOfObject:hostedViewToReinsert];
  }

  const BOOL shouldForwardAppearance =
      hostedViewToReinsert == nil && NativeScriptShouldForwardControllerAppearance(_viewController);
  if (shouldForwardAppearance) {
    [_viewController beginAppearanceTransition:NO animated:NO];
  }

  [_viewController willMoveToParentViewController:nil];
  [hostedViewToReinsert removeFromSuperview];
  [_viewController removeFromParentViewController];
  if (hostedViewToReinsert != nil) {
    NSUInteger targetIndex =
        hostedViewIndex == NSNotFound ? 0 : MIN(hostedViewIndex, self.subviews.count);
    [super insertSubview:hostedViewToReinsert atIndex:targetIndex];
  }

  if (shouldForwardAppearance) {
    [_viewController endAppearanceTransition];
  }
  [hostedViewToReinsert release];
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
  [self layoutDetachedChildrenViewSubviewsIfNeeded];
  [self installDetachedChildrenTouchSentinelIfNeeded];
  [self attachDetachedChildrenTouchHandlerIfNeeded];
  [self notifyHostReadyIfNeeded];
}

- (void)insertSubview:(UIView*)view atIndex:(NSInteger)index {
  if (_childrenView != nil && view != _nativeView && view != _childrenView) {
    NSUInteger targetIndex =
        MIN(static_cast<NSUInteger>(MAX(index, 0)), _childrenView.subviews.count);
    [_childrenView insertSubview:view atIndex:targetIndex];
    [self layoutDetachedChildrenViewSubviewsIfNeeded];
    [self installDetachedChildrenTouchSentinelIfNeeded];
    [self attachDetachedChildrenTouchHandlerIfNeeded];
    [self notifyHostReadyIfNeeded];
    return;
  }
  [super insertSubview:view atIndex:index];
  [self notifyHostReadyIfNeeded];
}

- (void)layoutDetachedChildrenViewSubviewsIfNeeded {
  if (_childrenView == nil) {
    return;
  }

  const CGRect bounds = _childrenView.bounds;
  for (UIView* subview in _childrenView.subviews) {
    if (subview == _detachedTouchSentinel) {
      subview.frame = CGRectZero;
      continue;
    }

    subview.frame = bounds;
    subview.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    [subview setNeedsLayout];
    [subview layoutIfNeeded];
    NativeScriptLayoutHostedSubviewChain(subview, 0);
  }
}

- (BOOL)refreshDetachedChildrenHost {
  if (_childrenView == nil) {
    return NO;
  }

  [self layoutDetachedChildrenViewSubviewsIfNeeded];
  [self installDetachedChildrenTouchSentinelIfNeeded];
  [self attachDetachedChildrenTouchHandlerIfNeeded];
  [self updateDetachedChildrenTouchHandlerOrigin];
  [self notifyHostReadyIfNeeded];

  return NativeScriptChildrenViewHasVisibleChild(_childrenView, _detachedTouchSentinel);
}

- (void)installDetachedChildrenTouchSentinelIfNeeded {
  if (_childrenView == nil || _detachedTouchSentinel != nil) {
    return;
  }

  NativeScriptDetachedChildrenTouchSentinel* sentinel =
      [[NativeScriptDetachedChildrenTouchSentinel alloc] initWithFrame:CGRectZero];
  sentinel.owner = self;
  sentinel.hidden = YES;
  sentinel.userInteractionEnabled = NO;
  sentinel.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
  _detachedTouchSentinel = sentinel;
  [_childrenView addSubview:sentinel];
}

- (void)attachDetachedChildrenTouchHandlerIfNeeded {
  if (_childrenView == nil) {
    return;
  }

  UIView* touchView = _childrenView;
  touchView.userInteractionEnabled = YES;
  if (NativeScriptFindAncestorSurfaceTouchHandler(touchView) != nil) {
    [self detachDetachedChildrenTouchHandler];
    return;
  }

  if (_detachedTouchHandler != nil) {
    UIView* attachedTouchHandlerView =
        NativeScriptGestureRecognizerAttachedView(_detachedTouchHandler);
    if (_detachedTouchHandlerView != touchView ||
        (attachedTouchHandlerView != nil && attachedTouchHandlerView != touchView) ||
        _detachedTouchHandlerWindow != touchView.window ||
        !NativeScriptViewHasGestureRecognizer(touchView, _detachedTouchHandler)) {
      [self detachDetachedChildrenTouchHandler];
    } else {
      [self updateDetachedChildrenTouchHandlerOrigin];
      return;
    }
  }

  if (_detachedTouchHandler != nil) {
    [self updateDetachedChildrenTouchHandlerOrigin];
    return;
  }

#if __has_include(<React/RCTSurfaceTouchHandler.h>)
  RCTSurfaceTouchHandler* surfaceTouchHandler = [RCTSurfaceTouchHandler new];
  [surfaceTouchHandler attachToView:touchView];
  _detachedTouchHandler = surfaceTouchHandler;
  _detachedTouchHandlerView = [touchView retain];
  _detachedTouchHandlerWindow = touchView.window;
  [self updateDetachedChildrenTouchHandlerOrigin];
  return;
#endif
}

- (void)updateDetachedChildrenTouchHandlerOrigin {
#if __has_include(<React/RCTSurfaceTouchHandler.h>)
  if (_detachedTouchHandler == nil || _detachedTouchHandlerView == nil ||
      ![_detachedTouchHandler isKindOfClass:RCTSurfaceTouchHandler.class]) {
    return;
  }

  CGPoint origin = CGPointZero;
  if (_detachedTouchHandlerView.window != nil) {
    origin = [_detachedTouchHandlerView convertPoint:CGPointZero
                                             toView:_detachedTouchHandlerView.window];
  }

  ((RCTSurfaceTouchHandler*)_detachedTouchHandler).viewOriginOffset = origin;
#endif
}

- (void)detachDetachedChildrenTouchHandler {
  if (_detachedTouchHandler == nil || _detachedTouchHandlerView == nil) {
    [_detachedTouchHandler release];
    _detachedTouchHandler = nil;
    [_detachedTouchHandlerView release];
    _detachedTouchHandlerView = nil;
    _detachedTouchHandlerWindow = nil;
    return;
  }

  UIView* attachedTouchHandlerView =
      NativeScriptGestureRecognizerAttachedView(_detachedTouchHandler);
  UIView* detachView =
      attachedTouchHandlerView != nil ? attachedTouchHandlerView : _detachedTouchHandlerView;

  if ([_detachedTouchHandler respondsToSelector:@selector(detachFromView:)]) {
    if (NativeScriptViewHasGestureRecognizer(detachView, _detachedTouchHandler)) {
      [_detachedTouchHandler detachFromView:detachView];
    }
  }

  [_detachedTouchHandler release];
  _detachedTouchHandler = nil;
  [_detachedTouchHandlerView release];
  _detachedTouchHandlerView = nil;
  _detachedTouchHandlerWindow = nil;
}

- (UIView*)hitTest:(CGPoint)point withEvent:(UIEvent*)event {
  [self refreshDetachedChildrenHost];

  UIView* hitView = [super hitTest:point withEvent:event];
  if (hitView == nil && _childrenView != nil && _childrenView.window != nil) {
    CGPoint childrenPoint = [_childrenView convertPoint:point fromView:self];
    hitView = [_childrenView hitTest:childrenPoint withEvent:event];
  }

  if (hitView == nil || self.window == nil) {
    return hitView;
  }

  CGPoint windowPoint = [self convertPoint:point toView:self.window];
  UITabBar* tabBar = NativeScriptVisibleTabBarAtPoint(self.window, self.window, windowPoint);
  if (tabBar != nil) {
    if (NativeScriptViewIsDescendantOfView(tabBar, self)) {
      CGPoint tabBarPoint = [tabBar convertPoint:windowPoint fromView:self.window];
      UIView* tabBarHitView = [tabBar hitTest:tabBarPoint withEvent:event];
      if (tabBarHitView != nil) {
        return tabBarHitView;
      }
      return tabBar;
    }
    if (!NativeScriptViewIsDescendantOfView(self, tabBar)) {
      return nil;
    }
  }

  return hitView;
}

- (void)didMoveToWindow {
  [super didMoveToWindow];
  [self mountUIKitHostIfNeeded];
  [self attachViewControllerIfPossible];
  [self attachDetachedChildrenTouchHandlerIfNeeded];
  [self updateDetachedChildrenTouchHandlerOrigin];
  [self notifyHostReadyIfNeeded];
}

- (void)layoutSubviews {
  [super layoutSubviews];
  _nativeView.frame = self.bounds;
  [self layoutDetachedChildrenViewSubviewsIfNeeded];
  [self installDetachedChildrenTouchSentinelIfNeeded];
  [self attachDetachedChildrenTouchHandlerIfNeeded];
  [self updateDetachedChildrenTouchHandlerOrigin];
  [self notifyHostReadyIfNeeded];
}

@end

static BOOL NativeScriptRefreshUIKitHostSubviews(UIView* root, NSUInteger depth) {
  if (root == nil || depth > 24) {
    return NO;
  }

  BOOL refreshed = NO;
  if ([root isKindOfClass:NativeScriptUIView.class]) {
    refreshed = [static_cast<NativeScriptUIView*>(root) refreshDetachedChildrenHost] || refreshed;
  }

  NativeScriptUIView* detachedChildrenOwner = NativeScriptDetachedChildrenOwner(root);
  if (detachedChildrenOwner != nil) {
    refreshed = [detachedChildrenOwner refreshDetachedChildrenHost] || refreshed;
  }

  if ([root isKindOfClass:NativeScriptDetachedChildrenTouchSentinel.class]) {
    NativeScriptDetachedChildrenTouchSentinel* sentinel =
        static_cast<NativeScriptDetachedChildrenTouchSentinel*>(root);
    refreshed = [sentinel.owner refreshDetachedChildrenHost] || refreshed;
  }

  for (UIView* subview in root.subviews) {
    refreshed = NativeScriptRefreshUIKitHostSubviews(subview, depth + 1) || refreshed;
  }

  return refreshed;
}

BOOL NativeScriptRefreshUIKitHostView(NSString* viewHandle) {
  if (![NSThread isMainThread]) {
    return NO;
  }

  UIView* view = NativeScriptUIViewFromHandle(viewHandle);
  if (view == nil) {
    return NO;
  }

  return NativeScriptRefreshUIKitHostSubviews(view, 0);
}

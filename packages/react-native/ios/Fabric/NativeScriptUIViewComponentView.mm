#import "NativeScriptUIViewComponentView.h"

#import <QuartzCore/QuartzCore.h>
#import <React/RCTFabricComponentsPlugins.h>
#import <React/RCTConversions.h>
#import <React/RCTMountingTransactionObserving.h>
#import <react/renderer/components/NativeScriptNativeApiSpec/ComponentDescriptors.h>
#import <react/renderer/components/NativeScriptNativeApiSpec/EventEmitters.h>
#import <react/renderer/components/NativeScriptNativeApiSpec/Props.h>
#import "NativeScriptUIViewSizeFeedback.h"

#import "NativeScriptUIView.h"

#if __has_include(<React/RCTSurfaceTouchHandler.h>)
#import <React/RCTSurfaceTouchHandler.h>
#endif

#include <chrono>
#include <cstring>

using namespace facebook::react;

static BOOL NativeScriptFabricViewIsDescendantOfView(UIView* view, UIView* ancestor) {
  UIView* current = view;
  while (current != nil) {
    if (current == ancestor) {
      return YES;
    }
    current = current.superview;
  }
  return NO;
}

static BOOL NativeScriptFabricLifecycleDebugEnabled() {
  static BOOL enabled;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    const char* value = getenv("NS_NS_FABRIC_DEBUG");
    enabled = value != nullptr && value[0] != '\0' && strcmp(value, "0") != 0;
  });
  return enabled;
}

static NSString* NativeScriptFabricDescribeView(UIView* view) {
  if (view == nil) {
    return @"<nil>";
  }
  NSString* tagDescription = @"";
  if ([view conformsToProtocol:@protocol(RCTComponentViewProtocol)]) {
    tagDescription = [NSString stringWithFormat:@"; tag=%ld",
                                                static_cast<long>(((UIView<RCTComponentViewProtocol>*)view).tag)];
  }

  return [NSString stringWithFormat:@"<%@: %p%@; frame=%@; bounds=%@; hidden=%d; alpha=%.3f; window=%p; super=%@:%p; subviews=%lu>",
                                    NSStringFromClass(view.class),
                                    view,
                                    tagDescription,
                                    NSStringFromCGRect(view.frame),
                                    NSStringFromCGRect(view.bounds),
                                    view.hidden,
                                    view.alpha,
                                    view.window,
                                    view.superview == nil ? @"nil" : NSStringFromClass(view.superview.class),
                                    view.superview,
                                    static_cast<unsigned long>(view.subviews.count)];
}

static void NativeScriptFabricLifecycleLog(NSString* format, ...) {
  if (!NativeScriptFabricLifecycleDebugEnabled()) {
    return;
  }

  va_list args;
  va_start(args, format);
  NSString* message = [[NSString alloc] initWithFormat:format arguments:args];
  va_end(args);
  NSLog(@"[NS_NS_FABRIC_DEBUG] %@", message);
  [message release];
}

static NSMapTable<NSNumber*, NativeScriptUIViewComponentView*>*
NativeScriptFabricComponentViewRegistry() {
  static NSMapTable<NSNumber*, NativeScriptUIViewComponentView*>* registry;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    registry = [[NSMapTable strongToWeakObjectsMapTable] retain];
  });
  return registry;
}

static NSString* NativeScriptFabricMutationTypeName(
    facebook::react::ShadowViewMutation::Type type) {
  switch (type) {
    case facebook::react::ShadowViewMutation::Create:
      return @"Create";
    case facebook::react::ShadowViewMutation::Delete:
      return @"Delete";
    case facebook::react::ShadowViewMutation::Insert:
      return @"Insert";
    case facebook::react::ShadowViewMutation::Remove:
      return @"Remove";
    case facebook::react::ShadowViewMutation::Update:
      return @"Update";
  }
}

static void NativeScriptFabricLogMutationIfNativeScriptUIView(
    const facebook::react::ShadowViewMutation& mutation) {
  if (!NativeScriptFabricLifecycleDebugEnabled()) {
    return;
  }
  const auto& newView = mutation.newChildShadowView;
  const auto& oldView = mutation.oldChildShadowView;
  const BOOL newIsNativeScript =
      newView.componentName != nullptr &&
      std::strcmp(newView.componentName, "NativeScriptUIView") == 0;
  const BOOL oldIsNativeScript =
      oldView.componentName != nullptr &&
      std::strcmp(oldView.componentName, "NativeScriptUIView") == 0;
  if (!newIsNativeScript && !oldIsNativeScript) {
    return;
  }
  const auto& view = newIsNativeScript ? newView : oldView;
  NativeScriptFabricLifecycleLog(
      @"mutation type=%@ tag=%lld parent=%lld index=%d traits=%d layout=%g,%g %gx%g props=%d",
      NativeScriptFabricMutationTypeName(mutation.type),
      static_cast<long long>(view.tag),
      static_cast<long long>(mutation.parentTag),
      mutation.index,
      static_cast<int>(view.traits.get()),
      view.layoutMetrics.frame.origin.x,
      view.layoutMetrics.frame.origin.y,
      view.layoutMetrics.frame.size.width,
      view.layoutMetrics.frame.size.height,
      view.props != nullptr);
}

static NSString* NativeScriptFabricComponentName(const char* componentName) {
  return componentName != nullptr ? [NSString stringWithUTF8String:componentName] : @"";
}

static NSDictionary<NSString*, id>* NativeScriptFabricMutationRecord(
    const facebook::react::ShadowViewMutation& mutation) {
  const auto& newView = mutation.newChildShadowView;
  const auto& oldView = mutation.oldChildShadowView;
  return @{
    @"type" : NativeScriptFabricMutationTypeName(mutation.type),
    @"parentTag" : @(mutation.parentTag),
    @"index" : @(mutation.index),
    @"newChildTag" : @(newView.tag),
    @"newChildComponentName" : NativeScriptFabricComponentName(newView.componentName),
    @"oldChildTag" : @(oldView.tag),
    @"oldChildComponentName" : NativeScriptFabricComponentName(oldView.componentName),
  };
}

static NSArray<NSDictionary<NSString*, id>*>* NativeScriptFabricMutationRecords(
    const facebook::react::MountingTransaction& transaction) {
  NSMutableArray<NSDictionary<NSString*, id>*>* records = [NSMutableArray array];
  for (const auto& mutation : transaction.getMutations()) {
    [records addObject:NativeScriptFabricMutationRecord(mutation)];
  }
  return records;
}

static UIView* NativeScriptFabricCurrentContainerViewForComponentView(UIView* view) {
  if (view == nil) {
    return nil;
  }

  SEL nativeScriptSelector = NSSelectorFromString(@"nativeScriptCurrentContainerView");
  if ([view respondsToSelector:nativeScriptSelector]) {
    IMP implementation = [view methodForSelector:nativeScriptSelector];
    if (implementation != nullptr) {
      UIView* (*nativeScriptCurrentContainerView)(id, SEL) =
          reinterpret_cast<UIView* (*)(id, SEL)>(implementation);
      UIView* containerView = nativeScriptCurrentContainerView(view, nativeScriptSelector);
      if (containerView != nil) {
        return containerView;
      }
    }
  }

  SEL selector = NSSelectorFromString(@"currentContainerView");
  if (![view respondsToSelector:selector]) {
    return view;
  }

  IMP implementation = [view methodForSelector:selector];
  if (implementation == nullptr) {
    return view;
  }

  UIView* (*currentContainerView)(id, SEL) =
      reinterpret_cast<UIView* (*)(id, SEL)>(implementation);
  return currentContainerView(view, selector) ?: view;
}

static BOOL NativeScriptFabricViewIsHostHitTestPlumbing(UIView* view) {
  if (view == nil || [view isKindOfClass:UIControl.class]) {
    return NO;
  }

  NSString* className = NSStringFromClass(view.class);
  const BOOL isNativeScriptHost = [className isEqualToString:@"NativeScriptUIView"] ||
      [className isEqualToString:@"NativeScriptUIViewComponentView"];

#if __has_include(<React/RCTSurfaceTouchHandler.h>)
  BOOL hasOnlySurfaceTouchHandlers = view.gestureRecognizers.count > 0;
  for (UIGestureRecognizer* recognizer in view.gestureRecognizers) {
    if (![recognizer isKindOfClass:RCTSurfaceTouchHandler.class]) {
      hasOnlySurfaceTouchHandlers = NO;
      break;
    }
  }
#else
  BOOL hasOnlySurfaceTouchHandlers = NO;
#endif

  const BOOL isPlainSurfaceHost =
      [className isEqualToString:@"UIView"] &&
      (view.gestureRecognizers.count == 0 || hasOnlySurfaceTouchHandlers) &&
      view.subviews.count > 0;

  if (!isNativeScriptHost && !isPlainSurfaceHost) {
    return NO;
  }

  return view.gestureRecognizers.count == 0 || hasOnlySurfaceTouchHandlers;
}

static BOOL NativeScriptFabricColorIsEffectivelyClear(UIColor* color) {
  if (color == nil) {
    return YES;
  }

  return CGColorGetAlpha(color.CGColor) <= 0.01;
}

static BOOL NativeScriptFabricCGColorIsEffectivelyClear(CGColorRef color) {
  if (color == nullptr) {
    return YES;
  }

  return CGColorGetAlpha(color) <= 0.01;
}

static CGRect NativeScriptFabricEffectiveTabBarHitBounds(UITabBar* tabBar) {
  CGRect bounds = tabBar.bounds;
  CGSize fittingSize = [tabBar sizeThatFits:CGSizeMake(bounds.size.width, bounds.size.height)];
  CGFloat maximumHeight = MAX(fittingSize.height + 32, 96);

  if (bounds.size.height > maximumHeight) {
    bounds.origin.y = CGRectGetMaxY(bounds) - maximumHeight;
    bounds.size.height = maximumHeight;
  }

  return CGRectInset(bounds, -24, -16);
}

static CGRect NativeScriptFabricTabBarWindowHitFrame(UITabBar* tabBar, UIWindow* window) {
  if (tabBar == nil) {
    return CGRectNull;
  }

  if (window != nil) {
    return [tabBar convertRect:tabBar.bounds toView:window];
  }

  if (tabBar.superview != nil) {
    return [tabBar.superview convertRect:tabBar.frame toView:nil];
  }

  return tabBar.frame;
}

static CGRect NativeScriptFabricTabBarWindowHitBounds(UITabBar* tabBar, UIWindow* window) {
  CGRect frame = NativeScriptFabricTabBarWindowHitFrame(tabBar, window);
  if (CGRectIsNull(frame)) {
    return frame;
  }

  const CGFloat topEdge = window != nil ? window.safeAreaInsets.top + 20 : 64;
  CGSize fittingSize = [tabBar sizeThatFits:CGSizeMake(frame.size.width, frame.size.height)];
  const CGFloat maximumHeight = MAX(fittingSize.height + 32, 96);
  if (frame.size.height > maximumHeight) {
    if (CGRectGetMinY(frame) <= topEdge) {
      frame.size.height = maximumHeight;
    } else {
      frame.origin.y = CGRectGetMaxY(frame) - maximumHeight;
      frame.size.height = maximumHeight;
    }
  }

  frame = CGRectInset(frame, -24, 0);
  if (CGRectGetMinY(frame) <= topEdge) {
    frame.origin.y -= 16;
    frame.size.height += 16;
  } else {
    frame.origin.y -= 16;
    frame.size.height += 32;
  }
  return frame;
}

static BOOL NativeScriptFabricPointInsideTabBarHitArea(UITabBar* tabBar, UIWindow* window,
                                                       CGPoint windowPoint) {
  if (tabBar == nil || tabBar.hidden || tabBar.alpha <= 0.01 ||
      !tabBar.userInteractionEnabled) {
    return NO;
  }

  CGRect frameHitBounds = NativeScriptFabricTabBarWindowHitBounds(tabBar, window);
  if (!CGRectContainsPoint(frameHitBounds, windowPoint)) {
    return NO;
  }

  CGPoint localPoint = [tabBar convertPoint:windowPoint fromView:window];
  if (CGRectContainsPoint(NativeScriptFabricEffectiveTabBarHitBounds(tabBar), localPoint)) {
    return YES;
  }

  return YES;
}

static UITabBar* NativeScriptFabricVisibleControllerTabBarAtPoint(UIViewController* controller,
                                                                  UIWindow* window,
                                                                  CGPoint windowPoint) {
  if (controller == nil) {
    return nil;
  }

  UIViewController* presentedController = controller.presentedViewController;
  if (presentedController != nil && !presentedController.isBeingDismissed) {
    UITabBar* presentedTabBar = NativeScriptFabricVisibleControllerTabBarAtPoint(
        presentedController, window, windowPoint);
    if (presentedTabBar != nil) {
      return presentedTabBar;
    }
  }

  NSArray<UIViewController*>* childControllers = controller.childViewControllers;
  for (UIViewController* childController in [childControllers reverseObjectEnumerator]) {
    UITabBar* childTabBar =
        NativeScriptFabricVisibleControllerTabBarAtPoint(childController, window, windowPoint);
    if (childTabBar != nil) {
      return childTabBar;
    }
  }

  if ([controller isKindOfClass:UITabBarController.class]) {
    UITabBarController* tabBarController = static_cast<UITabBarController*>(controller);
    UITabBar* tabBar = tabBarController.tabBar;
    if (NativeScriptFabricPointInsideTabBarHitArea(tabBar, window, windowPoint)) {
      return tabBar;
    }
  }

  return nil;
}

static UITabBar* NativeScriptFabricVisibleWindowTabBarAtPoint(UIWindow* window,
                                                              CGPoint windowPoint) {
  if (window == nil) {
    return nil;
  }

  UITabBar* controllerTabBar = NativeScriptFabricVisibleControllerTabBarAtPoint(
      window.rootViewController, window, windowPoint);
  if (controllerTabBar != nil) {
    return controllerTabBar;
  }

  return nil;
}

static UITabBar* NativeScriptFabricVisibleTabBarAtPoint(UIView* root, UIWindow* window,
                                                        CGPoint windowPoint) {
  if (root == nil) {
    return nil;
  }

  if ([root isKindOfClass:UIWindow.class]) {
    return NativeScriptFabricVisibleWindowTabBarAtPoint(static_cast<UIWindow*>(root), windowPoint);
  }

  if ([root isKindOfClass:UITabBar.class]) {
    UITabBar* tabBar = static_cast<UITabBar*>(root);
    if (NativeScriptFabricPointInsideTabBarHitArea(tabBar, window, windowPoint)) {
      return static_cast<UITabBar*>(root);
    }
  }

  for (UIView* subview in [root.subviews reverseObjectEnumerator]) {
    UITabBar* tabBar = NativeScriptFabricVisibleTabBarAtPoint(subview, window, windowPoint);
    if (tabBar != nil) {
      return tabBar;
    }
  }

  return nil;
}

static UIView* NativeScriptFabricHitTestTabBarAtPoint(UIView* root, UIWindow* window,
                                                      CGPoint windowPoint, UIEvent* event) {
  UITabBar* tabBar = NativeScriptFabricVisibleTabBarAtPoint(root, window, windowPoint);
  if (tabBar == nil) {
    return nil;
  }

  CGPoint tabBarPoint = [tabBar convertPoint:windowPoint fromView:window];
  if (!CGRectContainsPoint(NativeScriptFabricEffectiveTabBarHitBounds(tabBar), tabBarPoint) &&
      CGRectContainsPoint(NativeScriptFabricTabBarWindowHitBounds(tabBar, window), windowPoint)) {
    tabBarPoint = CGPointMake(windowPoint.x - tabBar.frame.origin.x,
                              windowPoint.y - tabBar.frame.origin.y);
  }
  UIView* tabBarHitView = [tabBar hitTest:tabBarPoint withEvent:event];
  if (tabBarHitView == tabBar &&
      CGRectContainsPoint(NativeScriptFabricTabBarWindowHitBounds(tabBar, window), windowPoint)) {
    CGPoint fallbackPoint = CGPointMake(windowPoint.x - tabBar.frame.origin.x,
                                        windowPoint.y - tabBar.frame.origin.y);
    UIView* fallbackHitView = [tabBar hitTest:fallbackPoint withEvent:event];
    if (fallbackHitView != nil && fallbackHitView != tabBar) {
      return fallbackHitView;
    }
  }
  return tabBarHitView ?: tabBar;
}

@interface NativeScriptUIViewComponentView () <NativeScriptUIViewHostReadyDelegate,
                                               RCTMountingTransactionObserving>
@end

@implementation NativeScriptUIViewComponentView {
  NativeScriptUIView* _containerView;
  NSString* _debugName;
  UIColor* _emptyHostWrapperSavedBackgroundColor;
  UIColor* _emptyHostWrapperSavedContainerBackgroundColor;
  CGColorRef _emptyHostWrapperSavedLayerBackgroundColor;
  CGColorRef _emptyHostWrapperSavedContainerLayerBackgroundColor;
  CGFloat _emptyHostWrapperSavedAlpha;
  CGFloat _emptyHostWrapperSavedContainerAlpha;
  BOOL _emptyHostWrapperSavedOpaque;
  BOOL _emptyHostWrapperSavedContainerOpaque;
  BOOL _emptyHostWrapperSavedLayerOpaque;
  BOOL _emptyHostWrapperSavedContainerLayerOpaque;
  BOOL _emptyHostWrapperVisualsSuppressed;
  BOOL _hasModifiedChildrenInCurrentTransaction;
  BOOL _hasModifiedPropsInCurrentTransaction;
  BOOL _hasObservedPropsUpdateSinceLastTransaction;
  BOOL _isApplyingMountingTransaction;
  // C-fix-3 (iteration 9): set once per mountingTransactionWillMount, from a
  // transaction-wide (not host-scoped) scan for any Remove/Delete mutation.
  // See the .h property doc.
  BOOL _currentTransactionHasRemovalMutation;
  BOOL _hasPendingFabricTransactionCommitFallbackChildren;
  BOOL _hasPendingFabricTransactionCommitFallbackProps;
  NSInteger _registeredReactTag;
  // SEAM D STAGE 0: the historical, independently-bumped
  // _mountingTransactionToken and _fabricTransactionCommitFallbackToken have
  // been deleted -- both deferred-delivery paths below now capture/check the
  // single shared token owned by _containerView (see
  // NativeScriptUIView.h's fabricTransactionDeliveryToken /
  // advanceFabricTransactionDeliveryToken).
  NSDictionary<NSString*, id>* _pendingHostReadyEvent;
  facebook::react::NativeScriptUIViewSizedShadowNode::ConcreteState::Shared _sizeState;
  CGSize _lastPushedAdoptedSize;
  // RNS parity (RNSScreen's _newLayoutMetrics/_oldLayoutMetrics): cache the
  // most recent layout metrics Fabric handed us, even on passes where we skip
  // applying them to the view (adopted + under a navigation controller — see
  // -updateLayoutMetrics:oldLayoutMetrics: below). Re-applied when adoption
  // ends so the view immediately picks up its real Yoga-resolved frame.
  facebook::react::LayoutMetrics _newLayoutMetrics, _oldLayoutMetrics;
  BOOL _hasCachedLayoutMetrics;
}

+ (NativeScriptUIViewComponentView*)nativeScriptComponentViewForReactTag:(NSInteger)tag {
  // Lock hierarchy (see NativeScriptNativeApiModule.mm's
  // nativeScriptApplyUIKitHostPropsForFabricTag / runUIKitHostFunction): no
  // code that may run with the worklet runtime's runtimeMutex_ held (i.e.
  // anything reachable from worklet JS) may block waiting on the main
  // queue. An off-main caller here is a programming error -- matches the
  // no-op-off-main pattern used by every other entry point in
  // NativeScriptUIView.mm.
  if (![NSThread isMainThread]) {
    return nil;
  }

  if (tag == 0) {
    return nil;
  }
  return [NativeScriptFabricComponentViewRegistry() objectForKey:@(tag)];
}

- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const NativeScriptUIViewProps>();
    _props = defaultProps;

    _containerView = [[NativeScriptUIView alloc] initWithFrame:self.bounds];
    _containerView.hostReadyDelegate = self;
    _containerView.fabricComponentView = self;
    _containerView.autoresizingMask =
        UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    self.contentView = _containerView;
    NativeScriptFabricLifecycleLog(@"init ownerTag=%ld component=%@ container=%@",
                                   static_cast<long>(self.tag),
                                   NativeScriptFabricDescribeView(self),
                                   NativeScriptFabricDescribeView(_containerView));
  }

  return self;
}

- (void)nativeScriptRegisterCurrentReactTag {
  if (![NSThread isMainThread]) {
    dispatch_async(dispatch_get_main_queue(), ^{
      [self nativeScriptRegisterCurrentReactTag];
    });
    return;
  }

  const NSInteger tag = self.tag;
  if (_registeredReactTag == tag) {
    return;
  }

  NSMapTable<NSNumber*, NativeScriptUIViewComponentView*>* registry =
      NativeScriptFabricComponentViewRegistry();
  if (_registeredReactTag != 0) {
    NativeScriptUIViewComponentView* registeredView =
        [registry objectForKey:@(_registeredReactTag)];
    if (registeredView == self) {
      [registry removeObjectForKey:@(_registeredReactTag)];
    }
  }

  _registeredReactTag = tag;
  if (tag != 0) {
    [registry setObject:self forKey:@(tag)];
  }
}

- (void)nativeScriptUnregisterCurrentReactTag {
  if (![NSThread isMainThread]) {
    dispatch_async(dispatch_get_main_queue(), ^{
      [self nativeScriptUnregisterCurrentReactTag];
    });
    return;
  }

  if (_registeredReactTag == 0) {
    return;
  }

  NSMapTable<NSNumber*, NativeScriptUIViewComponentView*>* registry =
      NativeScriptFabricComponentViewRegistry();
  NativeScriptUIViewComponentView* registeredView =
      [registry objectForKey:@(_registeredReactTag)];
  if (registeredView == self) {
    [registry removeObjectForKey:@(_registeredReactTag)];
  }
  _registeredReactTag = 0;
}

- (void)setTag:(NSInteger)tag {
  [super setTag:tag];
  [self nativeScriptRegisterCurrentReactTag];
}

- (UIView*)nativeScriptCurrentContainerView {
  return _containerView ?: self;
}

- (void)dealloc {
  [self nativeScriptUnregisterCurrentReactTag];
  _containerView.hostReadyDelegate = nil;
  [_debugName release];
  [_pendingHostReadyEvent release];
  [_emptyHostWrapperSavedBackgroundColor release];
  [_emptyHostWrapperSavedContainerBackgroundColor release];
  CGColorRelease(_emptyHostWrapperSavedLayerBackgroundColor);
  CGColorRelease(_emptyHostWrapperSavedContainerLayerBackgroundColor);
  [_containerView release];
  [super dealloc];
}

- (void)nativeScriptUIView:(NativeScriptUIView*)view
          didHostReady:(NSDictionary<NSString*, id>*)event {
  (void)view;
  if (_eventEmitter == nullptr) {
    if (_pendingHostReadyEvent != event) {
      [_pendingHostReadyEvent release];
      _pendingHostReadyEvent = [event copy];
    }
    return;
  }

  [self emitHostReadyEvent:event];
}

- (void)emitHostReadyEvent:(NSDictionary<NSString*, id>*)event {
  if (_eventEmitter == nullptr || event == nil) {
    return;
  }

  static_cast<const NativeScriptUIViewEventEmitter&>(*_eventEmitter)
      .onHostReady(NativeScriptUIViewEventEmitter::OnHostReady{
          .hostReadyId = RCTStringFromNSString(event[@"hostReadyId"] ?: @""),
          .hostId = RCTStringFromNSString(event[@"hostId"] ?: @""),
          .componentViewHandle = RCTStringFromNSString(event[@"componentViewHandle"] ?: @""),
          .nativeViewHandle = RCTStringFromNSString(event[@"nativeViewHandle"] ?: @""),
          .childrenViewHandle = RCTStringFromNSString(event[@"childrenViewHandle"] ?: @""),
          .controllerHandle = RCTStringFromNSString(event[@"controllerHandle"] ?: @""),
          .hasChildren = [event[@"hasChildren"] boolValue],
          .visibleDescendantCount = [event[@"visibleDescendantCount"] intValue],
          .windowAttached = [event[@"windowAttached"] boolValue],
      });
}

- (void)updateEventEmitter:(const EventEmitter::Shared&)eventEmitter {
  [super updateEventEmitter:eventEmitter];

  if (_eventEmitter == nullptr || _pendingHostReadyEvent == nil) {
    return;
  }

  NSDictionary<NSString*, id>* event = [_pendingHostReadyEvent retain];
  [_pendingHostReadyEvent release];
  _pendingHostReadyEvent = nil;
  _sizeState = nullptr;
  _lastPushedAdoptedSize = CGSizeZero;
  [self emitHostReadyEvent:event];
  [event release];
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

- (void)refreshContainerViewFrameIfNeeded {
  // When the container view has been adopted as a UIViewController's view and
  // that controller is pushed onto a UINavigationController, UIKit owns the
  // frame (push/pop transitions, safe-area/nav-bar layout). Forcing our own
  // frame here would fight UIKit's sizing, so defer to it in that case.
  if ([_containerView shouldDeferContainerFrameToNavigationController]) {
    return;
  }
  if (!CGRectEqualToRect(_containerView.frame, self.bounds)) {
    _containerView.frame = self.bounds;
    [_containerView setNeedsLayout];
  }
}

- (void)storeEmptyHostWrapperVisualStateIfNeeded {
  if (!_emptyHostWrapperVisualsSuppressed) {
    _emptyHostWrapperSavedOpaque = self.opaque;
    _emptyHostWrapperSavedContainerOpaque = _containerView.opaque;
    _emptyHostWrapperSavedLayerOpaque = self.layer.opaque;
    _emptyHostWrapperSavedContainerLayerOpaque = _containerView.layer.opaque;
    _emptyHostWrapperSavedAlpha = self.alpha;
    _emptyHostWrapperSavedContainerAlpha = _containerView.alpha;
  }

  if (!_emptyHostWrapperVisualsSuppressed ||
      !NativeScriptFabricColorIsEffectivelyClear(self.backgroundColor)) {
    [_emptyHostWrapperSavedBackgroundColor release];
    _emptyHostWrapperSavedBackgroundColor = [self.backgroundColor retain];
  }

  if (!_emptyHostWrapperVisualsSuppressed ||
      !NativeScriptFabricColorIsEffectivelyClear(_containerView.backgroundColor)) {
    [_emptyHostWrapperSavedContainerBackgroundColor release];
    _emptyHostWrapperSavedContainerBackgroundColor = [_containerView.backgroundColor retain];
  }

  if (!_emptyHostWrapperVisualsSuppressed ||
      !NativeScriptFabricCGColorIsEffectivelyClear(self.layer.backgroundColor)) {
    CGColorRelease(_emptyHostWrapperSavedLayerBackgroundColor);
    _emptyHostWrapperSavedLayerBackgroundColor =
        CGColorRetain(self.layer.backgroundColor);
  }

  if (!_emptyHostWrapperVisualsSuppressed ||
      !NativeScriptFabricCGColorIsEffectivelyClear(_containerView.layer.backgroundColor)) {
    CGColorRelease(_emptyHostWrapperSavedContainerLayerBackgroundColor);
    _emptyHostWrapperSavedContainerLayerBackgroundColor =
        CGColorRetain(_containerView.layer.backgroundColor);
  }

  _emptyHostWrapperVisualsSuppressed = YES;
}

- (void)restoreEmptyHostWrapperVisualStateIfNeeded {
  if (!_emptyHostWrapperVisualsSuppressed) {
    return;
  }

  self.backgroundColor = _emptyHostWrapperSavedBackgroundColor;
  _containerView.backgroundColor = _emptyHostWrapperSavedContainerBackgroundColor;
  self.alpha = _emptyHostWrapperSavedAlpha;
  _containerView.alpha = _emptyHostWrapperSavedContainerAlpha;
  self.layer.backgroundColor = _emptyHostWrapperSavedLayerBackgroundColor;
  _containerView.layer.backgroundColor = _emptyHostWrapperSavedContainerLayerBackgroundColor;
  self.opaque = _emptyHostWrapperSavedOpaque;
  _containerView.opaque = _emptyHostWrapperSavedContainerOpaque;
  self.layer.opaque = _emptyHostWrapperSavedLayerOpaque;
  _containerView.layer.opaque = _emptyHostWrapperSavedContainerLayerOpaque;

  [_emptyHostWrapperSavedBackgroundColor release];
  _emptyHostWrapperSavedBackgroundColor = nil;
  [_emptyHostWrapperSavedContainerBackgroundColor release];
  _emptyHostWrapperSavedContainerBackgroundColor = nil;
  CGColorRelease(_emptyHostWrapperSavedLayerBackgroundColor);
  _emptyHostWrapperSavedLayerBackgroundColor = nullptr;
  CGColorRelease(_emptyHostWrapperSavedContainerLayerBackgroundColor);
  _emptyHostWrapperSavedContainerLayerBackgroundColor = nullptr;
  _emptyHostWrapperVisualsSuppressed = NO;
  [self.layer setNeedsDisplay];
  [_containerView.layer setNeedsDisplay];
}

- (void)refreshEmptyHostWrapperVisualState {
  if (_containerView.hostId.length == 0) {
    [self restoreEmptyHostWrapperVisualStateIfNeeded];
    return;
  }

  if (![_containerView shouldHideEmptyFabricHostWrapper]) {
    [self restoreEmptyHostWrapperVisualStateIfNeeded];
    return;
  }

  [self storeEmptyHostWrapperVisualStateIfNeeded];
  self.backgroundColor = UIColor.clearColor;
  _containerView.backgroundColor = UIColor.clearColor;
  self.alpha = 0;
  _containerView.alpha = 0;
  self.layer.backgroundColor = UIColor.clearColor.CGColor;
  _containerView.layer.backgroundColor = UIColor.clearColor.CGColor;
  self.opaque = NO;
  _containerView.opaque = NO;
  self.layer.opaque = NO;
  _containerView.layer.opaque = NO;
  [self.layer setNeedsDisplay];
  [_containerView.layer setNeedsDisplay];
}

- (void)refreshContainerViewFrameAndHost {
  [self refreshContainerViewFrameIfNeeded];
  [_containerView mountUIKitHostIfNeeded];
  // No unconditional setNeedsLayout here: this method runs from
  // layoutSubviews, so re-invalidating every pass created a permanent
  // 60/120 Hz layout->refresh loop per mounted host that saturated the main
  // thread (mount transactions starved; presses appeared dead).
  // refreshContainerViewFrameIfNeeded invalidates when the frame changed.
  [_containerView refreshDetachedChildrenHost];
  [self refreshEmptyHostWrapperVisualState];
  self.hidden = NO;
  const BOOL externallyOwned = _containerView.externalDetachedChildrenOwner;
  self.accessibilityElementsHidden = externallyOwned;
  _containerView.accessibilityElementsHidden = externallyOwned;
}

- (void)scheduleFabricTransactionCommitFallbackIfNeeded {
  if (!_containerView.fabricLifecycleCallbacks) {
    return;
  }

  // SEAM D STAGE 0: this fallback exists for the OUT-of-transaction path
  // (worklet-driven nativeScriptApplyUIKitHostPropsForFabricTag /
  // NativeScriptNativeApiModule.mm's runUIKitHostFunction, where
  // mountingTransactionDidMount never fires). Inside a Fabric mounting
  // transaction, mountingTransactionDidMount below is the legitimate
  // initiator (RNS parity: RNSScreenStack.mm:1352-1370 delivers
  // exactly-once, dispatch_async'd, ordered after layout) and always
  // delivers once the transaction finishes -- scheduling here too just
  // duplicates it one runloop turn later. This was producer #3 of the
  // measured 4-6x per-pop transactionCommitted redelivery.
  if (_isApplyingMountingTransaction) {
    return;
  }

  const BOOL hasModifiedChildren = _hasModifiedChildrenInCurrentTransaction;
  const BOOL hasModifiedProps = _hasModifiedPropsInCurrentTransaction;
  if (!hasModifiedChildren && !hasModifiedProps) {
    return;
  }

  _hasPendingFabricTransactionCommitFallbackChildren =
      _hasPendingFabricTransactionCommitFallbackChildren || hasModifiedChildren;
  _hasPendingFabricTransactionCommitFallbackProps =
      _hasPendingFabricTransactionCommitFallbackProps || hasModifiedProps;

  const NSUInteger fallbackToken = [_containerView advanceFabricTransactionDeliveryToken];
  dispatch_async(dispatch_get_main_queue(), ^{
    if ([self->_containerView fabricTransactionDeliveryToken] != fallbackToken ||
        !self->_containerView.fabricLifecycleCallbacks) {
      return;
    }

    const BOOL hasModifiedChildren =
        self->_hasModifiedChildrenInCurrentTransaction ||
        self->_hasPendingFabricTransactionCommitFallbackChildren;
    const BOOL hasModifiedProps =
        self->_hasModifiedPropsInCurrentTransaction ||
        self->_hasPendingFabricTransactionCommitFallbackProps;
    if (!hasModifiedChildren && !hasModifiedProps) {
      return;
    }

    self->_hasModifiedChildrenInCurrentTransaction = NO;
    self->_hasModifiedPropsInCurrentTransaction = NO;
    self->_hasObservedPropsUpdateSinceLastTransaction = NO;
    self->_hasPendingFabricTransactionCommitFallbackChildren = NO;
    self->_hasPendingFabricTransactionCommitFallbackProps = NO;

    [self refreshContainerViewFrameAndHost];
    [self->_containerView
        notifyFabricTransactionCommittedWithModifiedChildren:hasModifiedChildren
                                               modifiedProps:hasModifiedProps];
  });
}

- (NSDictionary<NSString*, NSString*>*)applyNativeScriptUIKitHostProps:
    (NSDictionary<NSString*, id>*)props {
  if (props == nil) {
    return @{};
  }

  NSString* (^stringValue)(NSString*) = ^NSString*(NSString* key) {
    id value = props[key];
    return [value isKindOfClass:NSString.class] ? static_cast<NSString*>(value) : nil;
  };
  BOOL (^boolValue)(NSString*) = ^BOOL(NSString* key) {
    id value = props[key];
    return [value respondsToSelector:@selector(boolValue)] ? [value boolValue] : NO;
  };
  NSInteger (^integerValue)(NSString*) = ^NSInteger(NSString* key) {
    id value = props[key];
    return [value respondsToSelector:@selector(integerValue)] ? [value integerValue] : 0;
  };
  CGFloat (^floatValue)(NSString*) = ^CGFloat(NSString* key) {
    id value = props[key];
    return [value respondsToSelector:@selector(doubleValue)]
        ? static_cast<CGFloat>([value doubleValue])
        : 0;
  };

  NSString* debugName = stringValue(@"debugName");
  if (!((_debugName == debugName) || [_debugName isEqualToString:debugName])) {
    [_debugName release];
    _debugName = [debugName copy];
  }
  _containerView.debugName = debugName;

  _containerView.attachNativeView = boolValue(@"attachNativeView");
  _containerView.attachControllerToParent = boolValue(@"attachControllerToParent");
  _containerView.adoptHostViewAsControllerView =
      boolValue(@"adoptHostViewAsControllerView");
  _containerView.collectChildren = boolValue(@"collectChildren");
  _containerView.detachControllerFromParent = boolValue(@"detachControllerFromParent");
  _containerView.detachControllerView = boolValue(@"detachControllerView");
  _containerView.disableDetachedChildrenTouchHandler =
      boolValue(@"disableDetachedChildrenTouchHandler");
  _containerView.disableUIKitHostWindowAttachRefresh =
      boolValue(@"disableUIKitHostWindowAttachRefresh");
  _containerView.emitOffWindowHostReady = boolValue(@"emitOffWindowHostReady");
  _containerView.ignoreHostReadyWindowAttachment =
      boolValue(@"ignoreHostReadyWindowAttachment");
  _containerView.externalDetachedChildrenOwner = boolValue(@"externalDetachedChildrenOwner");
  _containerView.fabricLifecycleCallbacks = boolValue(@"fabricLifecycleCallbacks");
  // Adopted screens (RNSScreen parity) require SYNCHRONOUS transaction commits:
  // the fork's transactionCommitted reconcile finalizes the adoption + drives
  // the size-feedback push, and if it is deferred a runloop turn (the default
  // dispatch_async path) it races the layout/compositing pass and leaves the
  // hosted ScrollView content mounted-but-not-composited. RNSScreen commits its
  // state synchronously (unstable_Immediate); mirror that end-to-end here.
  _containerView.immediateTransactionCommit =
      boolValue(@"immediateTransactionCommit") ||
      boolValue(@"adoptHostViewAsControllerView");
  // RNS DidMount dispatch_async parity (adopted-only): when set, a mounting
  // transaction that removes/deletes children is never committed
  // synchronously here, even if immediateTransactionCommit is YES — see
  // mountingTransactionDidMount below.
  _containerView.deferTransactionCommitOnRemovals =
      boolValue(@"deferTransactionCommitOnRemovals");
  // iteration 10, Stage 1: default-off, see NativeScriptUIViewNativeComponent.ts.
  _containerView.nativeCommitObservations = boolValue(@"nativeCommitObservations");
  _containerView.mountChildrenDirectlyToChildrenView =
      boolValue(@"mountChildrenDirectlyToChildrenView");
  _containerView.layoutDirectChildrenToChildrenViewBounds =
      boolValue(@"layoutDirectChildrenToChildrenViewBounds");
  _containerView.pinNativeViewToHost = boolValue(@"pinNativeViewToHost");
  _containerView.preserveDetachedChildrenLayout = boolValue(@"preserveDetachedChildrenLayout");
  _containerView.detachedChildrenContentOffsetX =
      floatValue(@"detachedChildrenContentOffsetX");
  _containerView.detachedChildrenContentOffsetY =
      floatValue(@"detachedChildrenContentOffsetY");

  // Bug B fix: when the incoming JS handle string is missing or empty (""),
  // JS state does not know the real native handle yet. Do NOT overwrite the
  // live native handle with an empty string -- that drives
  // setChildrenViewHandle:@"" -> setChildrenView(nil) and clears _childrenView,
  // blanking the hosted React subtree (pushed Detail / presented Modal render
  // blank). Skip the assignment and leave the existing native handle intact.
  // Intentional clears are owned by -prepareForRecycle / -setHostId:'s reset,
  // which assign nil directly on _containerView (not via this props path).
  NSString* incomingNativeViewHandle = stringValue(@"nativeViewHandle");
  if (incomingNativeViewHandle.length > 0) {
    _containerView.nativeViewHandle = incomingNativeViewHandle;
  }
  NSString* incomingChildrenViewHandle = stringValue(@"childrenViewHandle");
  if (incomingChildrenViewHandle.length > 0) {
    _containerView.childrenViewHandle = incomingChildrenViewHandle;
  }
  NSString* incomingControllerHandle = stringValue(@"controllerHandle");
  if (incomingControllerHandle.length > 0) {
    _containerView.controllerHandle = incomingControllerHandle;
  }

  _hasModifiedPropsInCurrentTransaction = YES;
  _hasObservedPropsUpdateSinceLastTransaction = YES;
  _containerView.uikitHostPropsJson = stringValue(@"uikitHostPropsJson");
  _containerView.uikitHostPropsRevision = integerValue(@"uikitHostPropsRevision");
  _containerView.hostId = stringValue(@"hostId");
  _containerView.hostReadyId = stringValue(@"hostReadyId");
  _containerView.updateRevision = integerValue(@"updateRevision");
  _containerView.mountedRevision = integerValue(@"mountedRevision");

  [self refreshContainerViewFrameAndHost];
  [self scheduleFabricTransactionCommitFallbackIfNeeded];

  NativeScriptFabricLifecycleLog(
      @"applyNativeScriptUIKitHostProps owner=%p debug=%@ hostId=%@ collect=%d lifecycle=%d mountedChildren=%lu handles=%@",
      self,
      _debugName ?: @"",
      _containerView.hostId ?: @"",
      _containerView.collectChildren,
      _containerView.fabricLifecycleCallbacks,
      static_cast<unsigned long>(_containerView.fabricMountedChildrenSnapshot.count),
      _containerView.uikitHostHandles);

  return [_containerView uikitHostHandles];
}

- (void)mountChildComponentView:(UIView<RCTComponentViewProtocol>*)childComponentView
                          index:(NSInteger)index {
  NativeScriptFabricLifecycleLog(@"mountChild owner=%p ownerTag=%ld debug=%@ hostId=%@ index=%ld child=%@ childContainer=%@",
                                 self,
                                 static_cast<long>(self.tag),
                                 _debugName ?: @"",
                                 _containerView.hostId ?: @"",
                                 static_cast<long>(index),
                                 NativeScriptFabricDescribeView(childComponentView),
                                 NativeScriptFabricDescribeView(
                                     NativeScriptFabricCurrentContainerViewForComponentView(
                                         childComponentView)));
  _hasModifiedChildrenInCurrentTransaction = YES;
  [_containerView insertSubview:childComponentView atIndex:index];
  [_containerView recordFabricChildComponentViewMounted:childComponentView index:index];
  if (_containerView.hostId.length == 0) {
    return;
  }
  if (_containerView.fabricLifecycleCallbacks) {
    [_containerView
        notifyFabricChildMounted:childComponentView
               childContainerView:NativeScriptFabricCurrentContainerViewForComponentView(
                                      childComponentView)
                            index:index];
  }
  if (![self nativeScriptShouldCoalesceInTransactionRefreshTail]) {
    [self refreshContainerViewFrameAndHost];
  }
  [self scheduleFabricTransactionCommitFallbackIfNeeded];
}

- (void)unmountChildComponentView:(UIView<RCTComponentViewProtocol>*)childComponentView
                            index:(NSInteger)index {
  NativeScriptFabricLifecycleLog(@"unmountChild owner=%p debug=%@ hostId=%@ index=%ld child=%@ childContainer=%@",
                                 self,
                                 _debugName ?: @"",
                                 _containerView.hostId ?: @"",
                                 static_cast<long>(index),
                                 NativeScriptFabricDescribeView(childComponentView),
                                 NativeScriptFabricDescribeView(
                                     NativeScriptFabricCurrentContainerViewForComponentView(
                                         childComponentView)));
  _hasModifiedChildrenInCurrentTransaction = YES;
  [_containerView recordFabricChildComponentViewUnmounted:childComponentView];
  if (_containerView.hostId.length == 0) {
    [childComponentView removeFromSuperview];
    // RNS parity: a Fabric-unmounted child must never be restored later by
    // the reparenting guard (see restoreFabricChildComponentViewsForUnmount).
    [_containerView
        clearFabricRelocationRecordForUnmountedChildComponentView:childComponentView];
    return;
  }
  if (_containerView.fabricLifecycleCallbacks) {
    [_containerView
        notifyFabricChildUnmounted:childComponentView
                 childContainerView:NativeScriptFabricCurrentContainerViewForComponentView(
                                        childComponentView)
                              index:index];
  }
  [_containerView restoreFabricChildComponentViewsForUnmount:childComponentView index:index];
  if ([_containerView unmountCollectedChildComponentView:childComponentView]) {
    [self refreshContainerViewFrameAndHost];
    [self scheduleFabricTransactionCommitFallbackIfNeeded];
    return;
  }
  [childComponentView removeFromSuperview];
  // RNS parity: a Fabric-unmounted child must never be restored later by the
  // reparenting guard (see restoreFabricChildComponentViewsForUnmount). The
  // collected-children and plain-view funnels already clear this record on
  // their own final detach paths; this brings the direct paths to parity.
  [_containerView
      clearFabricRelocationRecordForUnmountedChildComponentView:childComponentView];
  [self refreshContainerViewFrameAndHost];
  [self scheduleFabricTransactionCommitFallbackIfNeeded];
}

- (void)mountingTransactionWillMount:(const facebook::react::MountingTransaction&)transaction
                withSurfaceTelemetry:(const facebook::react::SurfaceTelemetry&)surfaceTelemetry {
  (void)surfaceTelemetry;
  static const BOOL profileHostCalls = getenv("NS_NS_HOST_PROFILE") != nullptr;
  if (profileHostCalls) {
    NSLog(@"NS_NS_HOST_PROFILE txn-will host=%@ mutations=%zu",
          _containerView.hostId ?: @"?", transaction.getMutations().size());
  }
  for (const auto& mutation : transaction.getMutations()) {
    NativeScriptFabricLogMutationIfNativeScriptUIView(mutation);
  }
  _hasModifiedChildrenInCurrentTransaction = NO;
  if (!_hasObservedPropsUpdateSinceLastTransaction) {
    _hasModifiedPropsInCurrentTransaction = NO;
  }
  _isApplyingMountingTransaction = YES;
  // Fabric delivers mounting-transaction callbacks to EVERY registered
  // observer view for EVERY transaction in the app. Crossing into the UI
  // worklet for hosts that have no mutation in this transaction made every
  // unrelated Fabric commit (a text update, a counter) pay one worklet
  // round-trip per live host. Upstream RNSScreenStackView scans the mutation
  // list natively and reacts only to its own mutations; mirror that here.
  BOOL transactionTouchesThisHost = NO;
  // RNS `willBeUnmountedInUpcomingTransaction` parity: collect the tags of any
  // children this transaction is Remove/Delete-ing from under us BEFORE any
  // unmounts run, so restoreFabricChildComponentViewsForUnmount (which can be
  // triggered by a SIBLING's unmount later in this same transaction) never
  // resurrects a view Fabric is deleting here.
  NSMutableSet<NSNumber*>* pendingUnmountTags = nil;
  const auto selfTag = static_cast<facebook::react::Tag>(self.tag);
  // C-fix-3 (iteration 9): a single transaction-wide scan (this loop already
  // walks every mutation for transactionTouchesThisHost/pendingUnmountTags),
  // independent of transactionTouchesThisHost/deferTransactionCommitOnRemovals
  // -- ANY Remove/Delete anywhere in the transaction, not just ones that touch
  // this host, disqualifies the whole transaction from mid-transaction
  // refresh-tail coalescing below (see mountChildComponentView:index:,
  // updateProps:oldProps:, and NativeScriptUIView.mm's insertSubview:atIndex:).
  BOOL transactionHasAnyRemovalMutation = NO;
  for (const auto& mutation : transaction.getMutations()) {
    if (mutation.parentTag == selfTag ||
        mutation.newChildShadowView.tag == selfTag ||
        mutation.oldChildShadowView.tag == selfTag) {
      transactionTouchesThisHost = YES;
    }
    if (mutation.type == facebook::react::ShadowViewMutation::Remove ||
        mutation.type == facebook::react::ShadowViewMutation::Delete) {
      transactionHasAnyRemovalMutation = YES;
    }
    if (mutation.parentTag == selfTag &&
        (mutation.type == facebook::react::ShadowViewMutation::Remove ||
         mutation.type == facebook::react::ShadowViewMutation::Delete)) {
      if (pendingUnmountTags == nil) {
        pendingUnmountTags = [NSMutableSet new];
      }
      [pendingUnmountTags addObject:@(mutation.oldChildShadowView.tag)];
    }
  }
  _currentTransactionHasRemovalMutation = transactionHasAnyRemovalMutation;
  if (pendingUnmountTags != nil) {
    [_containerView
        markFabricChildComponentViewTagsPendingUnmountForCurrentTransaction:pendingUnmountTags];
    [pendingUnmountTags release];
  }
  if (_containerView.fabricLifecycleCallbacks && transactionTouchesThisHost) {
    [_containerView notifyFabricMountingTransactionWillMount];
  }
}

- (BOOL)isApplyingMountingTransaction {
  return _isApplyingMountingTransaction;
}

- (BOOL)currentTransactionHasRemovalMutation {
  return _currentTransactionHasRemovalMutation;
}

// C-fix-3 (iteration 9): YES while applying an insert/update-only Fabric
// mounting transaction (no Remove/Delete anywhere in it). mountChild's and
// updateProps's own -refreshContainerViewFrameAndHost tail calls are safe to
// skip in this window: mountingTransactionDidMount ALREADY runs a full,
// unconditional -refreshContainerViewFrameAndHost before it delivers
// (immediately if immediateTransactionCommit, else one dispatch_async hop
// later) whenever this host had any modification in the transaction -- which
// is a precondition for reaching either call site below. A transaction with a
// removal never returns YES here, so the pop/content-discipline path (which
// always contains a Remove/Delete) is completely untouched.
- (BOOL)nativeScriptShouldCoalesceInTransactionRefreshTail {
  return _isApplyingMountingTransaction && !_currentTransactionHasRemovalMutation;
}

- (void)mountingTransactionDidMount:(const facebook::react::MountingTransaction&)transaction
               withSurfaceTelemetry:(const facebook::react::SurfaceTelemetry&)surfaceTelemetry {
  (void)surfaceTelemetry;
  static const BOOL profileHostCalls = getenv("NS_NS_HOST_PROFILE") != nullptr;
  if (profileHostCalls) {
    NSLog(@"NS_NS_HOST_PROFILE txn-did host=%@ children=%d props=%d immediate=%d",
          _containerView.hostId ?: @"?",
          _hasModifiedChildrenInCurrentTransaction ? 1 : 0,
          (_hasModifiedPropsInCurrentTransaction || _hasPendingFabricTransactionCommitFallbackProps) ? 1 : 0,
          _containerView.immediateTransactionCommit ? 1 : 0);
  }
  // TEMPORARY INSTRUMENTATION (iteration 9, C-fix-3 measurement; restored for
  // iteration 10 Stage 0 -- see dev-notes/perf/iteration-10-*.md §0) --
  // Fabric's OWN per-transaction mount telemetry (facebook::react::
  // TransactionTelemetry), read directly rather than inferred. Removed
  // before this iteration's work lands for real (see the final "remove all
  // instrumentation, clean rebuild" pass).
  static const BOOL profileMountPhase = getenv("NS_NS_FABRIC7") != nullptr;
  if (profileMountPhase) {
    auto& telemetry = transaction.getTelemetry();
    const double mountMs =
        std::chrono::duration<double, std::milli>(telemetry.getMountEndTime() -
                                                    telemetry.getMountStartTime())
            .count();
    NSLog(@"[FABRIC7] host=%@ txn=%lld mountMs=%.2f mutations=%zu",
          _containerView.hostId ?: @"?", static_cast<long long>(transaction.getNumber()),
          mountMs, transaction.getMutations().size());
  }
  // TEMPORARY INSTRUMENTATION (iteration 10, Stage 0 -- [FABRIC10]) --
  // §0's correction: Fabric's own mount telemetry (above, [FABRIC7]) is
  // stamped BEFORE `notifyObserversMountingTransactionDidMount` runs
  // (TelemetryController.cpp:19-51 / RCTMountingManager.mm:259-270), so it
  // structurally cannot see this callback's own body -- exactly the code
  // iteration 9's C-fix-1/2/3 touch. Bracket the OBSERVER PHASE + same-turn
  // tails here instead: entry-to-return for the synchronous (immediate)
  // path, entry-to-return of the dispatch_async tail for the deferred path.
  // `cumulativeMs` is measured from the FIRST observer entry seen for a
  // given transaction number (observers run back-to-back on main, so the
  // last-logged `cumulativeMs` for a transaction approximates the whole
  // multi-host observer-phase span). Removed before this iteration lands.
  static const BOOL profileObserverPhase = getenv("NS_NS_FABRIC10") != nullptr;
  static NSInteger sFabric10Txn = -1;
  static CFTimeInterval sFabric10PhaseStart = 0;
  CFTimeInterval fabric10Entry = 0;
  long long fabric10TxnNumber = 0;
  if (profileObserverPhase) {
    fabric10Entry = CACurrentMediaTime();
    fabric10TxnNumber = static_cast<long long>(transaction.getNumber());
    if (fabric10TxnNumber != sFabric10Txn) {
      sFabric10Txn = fabric10TxnNumber;
      sFabric10PhaseStart = fabric10Entry;
    }
  }
  _isApplyingMountingTransaction = NO;
  // RNS `willBeUnmountedInUpcomingTransaction` parity: the pending-unmount-tag
  // set is transaction-scoped only; always clear it here regardless of
  // whether this host observed modifications, mirroring how Fabric always
  // pairs a mountingTransactionWillMount with a mountingTransactionDidMount.
  [_containerView clearFabricChildComponentViewTagsPendingUnmountForCurrentTransaction];
  const BOOL hasModifiedChildren =
      _hasModifiedChildrenInCurrentTransaction ||
      _hasPendingFabricTransactionCommitFallbackChildren;
  const BOOL hasModifiedProps =
      _hasModifiedPropsInCurrentTransaction ||
      _hasPendingFabricTransactionCommitFallbackProps;
  _hasModifiedChildrenInCurrentTransaction = NO;
  _hasModifiedPropsInCurrentTransaction = NO;
  _hasObservedPropsUpdateSinceLastTransaction = NO;

  if (!hasModifiedChildren && !hasModifiedProps) {
    if (profileObserverPhase) {
      const CFTimeInterval now = CACurrentMediaTime();
      NSLog(@"[FABRIC10] host=%@ txn=%lld hostMs=%.2f cumulativeMs=%.2f empty=1 deferred=0",
            _containerView.hostId ?: @"?", fabric10TxnNumber,
            (now - fabric10Entry) * 1000.0, (now - sFabric10PhaseStart) * 1000.0);
    }
    return;
  }

  // C-fix-1 (iteration 9): this used to build one 7-key NSDictionary per
  // mutation (~109 at cold launch) UNCONDITIONALLY, above, before the
  // early-return -- so every registered observer paid the allocation for
  // every transaction in the app, including hosts with no modification in
  // this transaction and hosts that never consume `mutations` at all.
  // Build it lazily, only once we know this call is actually about to
  // deliver a commit, and only for hosts that opted into fabric lifecycle
  // callbacks (mountChild/unmountChild gate on the same flag elsewhere in
  // this file; -fabricTransactionJsonWithModifiedChildren:...mutations: in
  // NativeScriptUIView.mm already turns `mutations:nil` into `@[]`, so the
  // delivered payload is byte-identical for hosts that DO consume it).
  NSArray<NSDictionary<NSString*, id>*>* mutationRecords =
      _containerView.fabricLifecycleCallbacks ? NativeScriptFabricMutationRecords(transaction)
                                               : nil;

  _hasPendingFabricTransactionCommitFallbackChildren = NO;
  _hasPendingFabricTransactionCommitFallbackProps = NO;
  // SEAM D STAGE 0: advancing the shared token here immediately invalidates
  // any still-pending deferred schedule from the mount-op fallback or the
  // props-revision path (producers #2/#3) for this same host, and captures
  // the fresh value this call's own (possibly deferred, below) delivery will
  // check against.
  const NSUInteger transactionToken = [_containerView advanceFabricTransactionDeliveryToken];

  // RNS DidMount dispatch_async parity (adopted-only, gated by
  // deferTransactionCommitOnRemovals): RNSScreenStackView never runs UIKit
  // containment mutations synchronously inside a mounting transaction — see
  // RNSScreenStack.mm mountingTransactionDidMount. Our transactionCommitted
  // reconcile can dismiss/reparent views, so if this transaction contains any
  // Remove/Delete, defer the reconcile out of the transaction even when
  // immediateTransactionCommit is YES. Insert/update-only transactions (the
  // render-fix path) are unaffected.
  BOOL transactionHasRemovalMutation = NO;
  if (_containerView.deferTransactionCommitOnRemovals) {
    for (const auto& mutation : transaction.getMutations()) {
      if (mutation.type == facebook::react::ShadowViewMutation::Remove ||
          mutation.type == facebook::react::ShadowViewMutation::Delete) {
        transactionHasRemovalMutation = YES;
        break;
      }
    }
  }

  if (_containerView.immediateTransactionCommit && !transactionHasRemovalMutation) {
    [self refreshContainerViewFrameAndHost];
    [_containerView
        notifyFabricTransactionCommittedWithModifiedChildren:hasModifiedChildren
                                               modifiedProps:hasModifiedProps
                                                   mutations:mutationRecords];
    if (profileObserverPhase) {
      const CFTimeInterval now = CACurrentMediaTime();
      NSLog(@"[FABRIC10] host=%@ txn=%lld hostMs=%.2f cumulativeMs=%.2f empty=0 deferred=0",
            _containerView.hostId ?: @"?", fabric10TxnNumber,
            (now - fabric10Entry) * 1000.0, (now - sFabric10PhaseStart) * 1000.0);
    }
    return;
  }

  const CFTimeInterval fabric10ScheduleTime = profileObserverPhase ? CACurrentMediaTime() : 0;
  dispatch_async(dispatch_get_main_queue(), ^{
    if ([self->_containerView fabricTransactionDeliveryToken] != transactionToken) {
      return;
    }

    const CFTimeInterval fabric10TailEntry = profileObserverPhase ? CACurrentMediaTime() : 0;
    [self refreshContainerViewFrameAndHost];
    [self->_containerView
        notifyFabricTransactionCommittedWithModifiedChildren:hasModifiedChildren
                                               modifiedProps:hasModifiedProps
                                                   mutations:mutationRecords];
    if (profileObserverPhase) {
      const CFTimeInterval now = CACurrentMediaTime();
      NSLog(@"[FABRIC10] host=%@ txn=%lld hostMs=%.2f cumulativeMs=%.2f empty=0 deferred=1 "
            @"scheduleDelayMs=%.2f",
            self->_containerView.hostId ?: @"?", fabric10TxnNumber,
            (now - fabric10TailEntry) * 1000.0, (now - sFabric10PhaseStart) * 1000.0,
            (fabric10TailEntry - fabric10ScheduleTime) * 1000.0);
    }
  });
}

- (void)didMoveToWindow {
  [super didMoveToWindow];
  NativeScriptFabricLifecycleLog(@"didMoveToWindow component=%@ container=%@ debug=%@ hostId=%@",
                                 NativeScriptFabricDescribeView(self),
                                 NativeScriptFabricDescribeView(_containerView),
                                 _debugName ?: @"",
                                 _containerView.hostId ?: @"");
  [self refreshContainerViewFrameAndHost];
}

- (void)willMoveToSuperview:(UIView*)newSuperview {
  [super willMoveToSuperview:newSuperview];
  NativeScriptFabricLifecycleLog(@"willMoveToSuperview component=%@ newSuperview=%@ debug=%@ hostId=%@",
                                 NativeScriptFabricDescribeView(self),
                                 NativeScriptFabricDescribeView(newSuperview),
                                 _debugName ?: @"",
                                 _containerView.hostId ?: @"");
}

- (void)didMoveToSuperview {
  [super didMoveToSuperview];
  NativeScriptFabricLifecycleLog(@"didMoveToSuperview component=%@ container=%@ debug=%@ hostId=%@",
                                 NativeScriptFabricDescribeView(self),
                                 NativeScriptFabricDescribeView(_containerView),
                                 _debugName ?: @"",
                                 _containerView.hostId ?: @"");
}

- (void)layoutSubviews {
  [super layoutSubviews];
  [self refreshContainerViewFrameAndHost];
}

- (void)updateLayoutMetrics:(const LayoutMetrics&)layoutMetrics
           oldLayoutMetrics:(const LayoutMetrics&)oldLayoutMetrics {
  // Always cache, even when we're about to skip applying these metrics below —
  // they're re-applied once adoption ends (see updateProps's adoption-toggle-off
  // site), mirroring RNSScreen's _newLayoutMetrics/_oldLayoutMetrics +
  // -notifyWillAppear.
  _newLayoutMetrics = layoutMetrics;
  _oldLayoutMetrics = oldLayoutMetrics;
  _hasCachedLayoutMetrics = YES;
  // RNS parity (RNSScreen.mm updateLayoutMetrics ~1348-1371): once UIKit's
  // navigation controller owns this adopted container's frame, do not let
  // Yoga's resolved layout metrics drive the view's frame — UIKit is sizing
  // it via push/pop transitions and safe-area/nav-bar layout, and applying our
  // own frame here would fight that (RCTViewComponentView's default
  // -updateLayoutMetrics:oldLayoutMetrics: sets self.frame from layoutMetrics).
  if (![_containerView containerFrameIsUIKitDrivenByNavigationController]) {
    [super updateLayoutMetrics:layoutMetrics oldLayoutMetrics:oldLayoutMetrics];
  }
  NativeScriptFabricLifecycleLog(@"updateLayoutMetrics component=%@ container=%@ debug=%@ hostId=%@",
                                 NativeScriptFabricDescribeView(self),
                                 NativeScriptFabricDescribeView(_containerView),
                                 _debugName ?: @"",
                                 _containerView.hostId ?: @"");
  // Unconditional: keeps the containerView's frame/host state in sync with
  // whatever self.bounds ended up being, regardless of whether super applied
  // the new layout metrics above.
  [self refreshContainerViewFrameAndHost];
}

- (BOOL)pointInside:(CGPoint)point withEvent:(UIEvent*)event {
  [self refreshContainerViewFrameIfNeeded];

  if (_containerView.externalDetachedChildrenOwner) {
    return NO;
  }

  const BOOL superResult = [super pointInside:point withEvent:event];
  if (superResult && ![_containerView shouldHideEmptyFabricHostWrapper]) {
    return YES;
  }

  if (_containerView != nil && _containerView.window != nil) {
    CGPoint containerPoint = [_containerView convertPoint:point fromView:self];
    if ([_containerView hostedContentPointInside:containerPoint withEvent:event]) {
      return YES;
    }
  }

  if (self.window != nil) {
    CGPoint windowPoint = [self convertPoint:point toView:self.window];
    UITabBar* tabBar = NativeScriptFabricVisibleTabBarAtPoint(self.window, self.window, windowPoint);
    if (tabBar != nil && NativeScriptFabricViewIsDescendantOfView(tabBar, self)) {
      return YES;
    }
  }

  return NO;
}

- (UIView*)hitTest:(CGPoint)point withEvent:(UIEvent*)event {
  [self refreshContainerViewFrameIfNeeded];

  if (_containerView.externalDetachedChildrenOwner) {
    return nil;
  }

  if (self.window != nil) {
    CGPoint windowPoint = [self convertPoint:point toView:self.window];
    UIView* tabBarHitView =
        NativeScriptFabricHitTestTabBarAtPoint(self.window, self.window, windowPoint, event);
    if (tabBarHitView != nil) {
      return tabBarHitView;
    }
  }

  if (_containerView != nil && _containerView.window != nil) {
    CGPoint containerPoint = [_containerView convertPoint:point fromView:self];
    UIView* hostedHitView = [_containerView hostedContentHitTest:containerPoint withEvent:event];
    if (hostedHitView != nil) {
      return hostedHitView;
    }
  }

  UIView* hitView = [super hitTest:point withEvent:event];
  if (hitView == self &&
      ([_containerView shouldHideEmptyFabricHostWrapper] ||
       NativeScriptFabricViewIsHostHitTestPlumbing(self))) {
    hitView = nil;
  }
  if (hitView == nil && _containerView != nil && _containerView.window != nil) {
    CGPoint containerPoint = [_containerView convertPoint:point fromView:self];
    hitView = [_containerView hitTest:containerPoint withEvent:event];
  }
  if (hitView == self &&
      ([_containerView shouldHideEmptyFabricHostWrapper] ||
       NativeScriptFabricViewIsHostHitTestPlumbing(self))) {
    hitView = nil;
  }

  if (hitView == nil || self.window == nil) {
    return hitView;
  }

  CGPoint windowPoint = [self convertPoint:point toView:self.window];
  UITabBar* tabBar = NativeScriptFabricVisibleTabBarAtPoint(self.window, self.window, windowPoint);
  if (tabBar != nil) {
    if (NativeScriptFabricViewIsDescendantOfView(tabBar, self)) {
      CGPoint tabBarPoint = [tabBar convertPoint:windowPoint fromView:self.window];
      UIView* tabBarHitView = [tabBar hitTest:tabBarPoint withEvent:event];
      if (tabBarHitView != nil) {
        return tabBarHitView;
      }
      return tabBar;
    }
    if (!NativeScriptFabricViewIsDescendantOfView(self, tabBar)) {
      return nil;
    }
  }

  return hitView;
}

- (void)updateProps:(Props::Shared const&)props oldProps:(Props::Shared const&)oldProps {
  const auto oldViewProps = std::static_pointer_cast<const NativeScriptUIViewProps>(_props);
  const auto newViewProps = std::static_pointer_cast<const NativeScriptUIViewProps>(props);
  const std::string oldNativeViewHandle = oldViewProps->nativeViewHandle;
  const std::string newNativeViewHandle = newViewProps->nativeViewHandle;
  const std::string oldChildrenViewHandle = oldViewProps->childrenViewHandle;
  const std::string newChildrenViewHandle = newViewProps->childrenViewHandle;
  const std::string oldControllerHandle = oldViewProps->controllerHandle;
  const std::string newControllerHandle = newViewProps->controllerHandle;
  const auto oldAttachNativeView = oldViewProps->attachNativeView;
  const auto newAttachNativeView = newViewProps->attachNativeView;
  const auto oldAttachControllerToParent = oldViewProps->attachControllerToParent;
  const auto newAttachControllerToParent = newViewProps->attachControllerToParent;
  const auto oldAdoptHostViewAsControllerView =
      oldViewProps->adoptHostViewAsControllerView;
  const auto newAdoptHostViewAsControllerView =
      newViewProps->adoptHostViewAsControllerView;
  const auto oldCollectChildren = oldViewProps->collectChildren;
  const auto newCollectChildren = newViewProps->collectChildren;
  const auto oldDetachControllerFromParent = oldViewProps->detachControllerFromParent;
  const auto newDetachControllerFromParent = newViewProps->detachControllerFromParent;
  const auto oldDetachControllerView = oldViewProps->detachControllerView;
  const auto newDetachControllerView = newViewProps->detachControllerView;
  const auto oldDisableDetachedChildrenTouchHandler =
      oldViewProps->disableDetachedChildrenTouchHandler;
  const auto newDisableDetachedChildrenTouchHandler =
      newViewProps->disableDetachedChildrenTouchHandler;
  const auto oldDisableUIKitHostWindowAttachRefresh =
      oldViewProps->disableUIKitHostWindowAttachRefresh;
  const auto newDisableUIKitHostWindowAttachRefresh =
      newViewProps->disableUIKitHostWindowAttachRefresh;
  const auto oldEmitOffWindowHostReady = oldViewProps->emitOffWindowHostReady;
  const auto newEmitOffWindowHostReady = newViewProps->emitOffWindowHostReady;
  const auto oldIgnoreHostReadyWindowAttachment =
      oldViewProps->ignoreHostReadyWindowAttachment;
  const auto newIgnoreHostReadyWindowAttachment =
      newViewProps->ignoreHostReadyWindowAttachment;
  const auto oldExternalDetachedChildrenOwner =
      oldViewProps->externalDetachedChildrenOwner;
  const auto newExternalDetachedChildrenOwner =
      newViewProps->externalDetachedChildrenOwner;
  const auto oldFabricLifecycleCallbacks = oldViewProps->fabricLifecycleCallbacks;
  const auto newFabricLifecycleCallbacks = newViewProps->fabricLifecycleCallbacks;
  const auto oldImmediateTransactionCommit = oldViewProps->immediateTransactionCommit;
  const auto newImmediateTransactionCommit = newViewProps->immediateTransactionCommit;
  const auto oldDeferTransactionCommitOnRemovals =
      oldViewProps->deferTransactionCommitOnRemovals;
  const auto newDeferTransactionCommitOnRemovals =
      newViewProps->deferTransactionCommitOnRemovals;
  // iteration 10, Stage 1: default-off, see NativeScriptUIViewNativeComponent.ts.
  const auto oldNativeCommitObservations = oldViewProps->nativeCommitObservations;
  const auto newNativeCommitObservations = newViewProps->nativeCommitObservations;
  const auto oldMountChildrenDirectlyToChildrenView =
      oldViewProps->mountChildrenDirectlyToChildrenView;
  const auto newMountChildrenDirectlyToChildrenView =
      newViewProps->mountChildrenDirectlyToChildrenView;
  const auto oldLayoutDirectChildrenToChildrenViewBounds =
      oldViewProps->layoutDirectChildrenToChildrenViewBounds;
  const auto newLayoutDirectChildrenToChildrenViewBounds =
      newViewProps->layoutDirectChildrenToChildrenViewBounds;
  const auto oldPinNativeViewToHost = oldViewProps->pinNativeViewToHost;
  const auto newPinNativeViewToHost = newViewProps->pinNativeViewToHost;
  const auto oldPreserveDetachedChildrenLayout = oldViewProps->preserveDetachedChildrenLayout;
  const auto newPreserveDetachedChildrenLayout = newViewProps->preserveDetachedChildrenLayout;
  const auto oldDetachedChildrenContentOffsetX =
      oldViewProps->detachedChildrenContentOffsetX;
  const auto newDetachedChildrenContentOffsetX =
      newViewProps->detachedChildrenContentOffsetX;
  const auto oldDetachedChildrenContentOffsetY =
      oldViewProps->detachedChildrenContentOffsetY;
  const auto newDetachedChildrenContentOffsetY =
      newViewProps->detachedChildrenContentOffsetY;
  const std::string oldDebugName = oldViewProps->debugName;
  const std::string newDebugName = newViewProps->debugName;
  const std::string oldUIKitHostPropsJson = oldViewProps->uikitHostPropsJson;
  const std::string newUIKitHostPropsJson = newViewProps->uikitHostPropsJson;
  const auto oldUIKitHostPropsRevision = oldViewProps->uikitHostPropsRevision;
  const auto newUIKitHostPropsRevision = newViewProps->uikitHostPropsRevision;
  const std::string oldHostId = oldViewProps->hostId;
  const std::string newHostId = newViewProps->hostId;
  const std::string oldHostReadyId = oldViewProps->hostReadyId;
  const std::string newHostReadyId = newViewProps->hostReadyId;
  const auto oldUpdateRevision = oldViewProps->updateRevision;
  const auto newUpdateRevision = newViewProps->updateRevision;
  const auto oldMountedRevision = oldViewProps->mountedRevision;
  const auto newMountedRevision = newViewProps->mountedRevision;

  [super updateProps:props oldProps:oldProps];

  if (oldDebugName != newDebugName) {
    NSString* debugName =
        newDebugName.empty() ? nil : [NSString stringWithUTF8String:newDebugName.c_str()];
    [_debugName release];
    _debugName = [debugName copy];
    _containerView.debugName = debugName;
  }

  NativeScriptFabricLifecycleLog(
      @"updateProps owner=%p ownerTag=%ld debug=%@ hostId=%s native=%s children=%s controller=%s collect=%d attachController=%d attachNative=%d externalOwner=%d mountChildrenDirect=%d layoutDirectChildren=%d immediate=%d uikitRev=%lld updateRev=%lld mountedRev=%lld",
      self,
      static_cast<long>(self.tag),
      _debugName ?: @"",
      newHostId.c_str(),
      newNativeViewHandle.c_str(),
      newChildrenViewHandle.c_str(),
      newControllerHandle.c_str(),
      newCollectChildren,
      newAttachControllerToParent,
      newAttachNativeView,
      newExternalDetachedChildrenOwner,
      newMountChildrenDirectlyToChildrenView,
      newLayoutDirectChildrenToChildrenViewBounds,
      newImmediateTransactionCommit,
      static_cast<long long>(newUIKitHostPropsRevision),
      static_cast<long long>(newUpdateRevision),
      static_cast<long long>(newMountedRevision));

  if (oldAdoptHostViewAsControllerView != newAdoptHostViewAsControllerView) {
    _containerView.adoptHostViewAsControllerView = newAdoptHostViewAsControllerView;
    if (oldAdoptHostViewAsControllerView && !newAdoptHostViewAsControllerView &&
        _hasCachedLayoutMetrics) {
      // RNS parity (RNSScreen.mm:512 -notifyWillAppear re-applies
      // _newLayoutMetrics/_oldLayoutMetrics). Adoption just ended, so Fabric is
      // about to resume owning this view's frame; -updateLayoutMetrics: was
      // skipping applying metrics to the view while adopted (see above), so
      // replay the last metrics now instead of waiting for an unrelated future
      // layout pass to happen to re-deliver them.
      [self updateLayoutMetrics:_newLayoutMetrics oldLayoutMetrics:_oldLayoutMetrics];
    }
  }

  if (oldAttachNativeView != newAttachNativeView) {
    _containerView.attachNativeView = newAttachNativeView;
  }

  if (oldAttachControllerToParent != newAttachControllerToParent) {
    _containerView.attachControllerToParent = newAttachControllerToParent;
  }

  if (oldCollectChildren != newCollectChildren) {
    _containerView.collectChildren = newCollectChildren;
  }

  if (oldDetachControllerFromParent != newDetachControllerFromParent) {
    _containerView.detachControllerFromParent = newDetachControllerFromParent;
  }

  if (oldDetachControllerView != newDetachControllerView) {
    _containerView.detachControllerView = newDetachControllerView;
  }

  if (oldDisableDetachedChildrenTouchHandler != newDisableDetachedChildrenTouchHandler) {
    _containerView.disableDetachedChildrenTouchHandler =
        newDisableDetachedChildrenTouchHandler;
  }

  if (oldDisableUIKitHostWindowAttachRefresh !=
      newDisableUIKitHostWindowAttachRefresh) {
    _containerView.disableUIKitHostWindowAttachRefresh =
        newDisableUIKitHostWindowAttachRefresh;
  }

  if (oldEmitOffWindowHostReady != newEmitOffWindowHostReady) {
    _containerView.emitOffWindowHostReady = newEmitOffWindowHostReady;
  }

  if (oldIgnoreHostReadyWindowAttachment !=
      newIgnoreHostReadyWindowAttachment) {
    _containerView.ignoreHostReadyWindowAttachment =
        newIgnoreHostReadyWindowAttachment;
  }

  if (oldExternalDetachedChildrenOwner != newExternalDetachedChildrenOwner) {
    _containerView.externalDetachedChildrenOwner = newExternalDetachedChildrenOwner;
  }

  if (oldFabricLifecycleCallbacks != newFabricLifecycleCallbacks) {
    _containerView.fabricLifecycleCallbacks = newFabricLifecycleCallbacks;
  }

  // Adopted screens force synchronous transaction commits (RNSScreen parity;
  // see the dictionary-prop path above for the full rationale) — fold
  // adoption into the effective value here too, so the typed-props path
  // matches regardless of whether immediateTransactionCommit was explicitly
  // set at the JSX level.
  const auto oldEffectiveImmediateTransactionCommit =
      oldImmediateTransactionCommit || oldAdoptHostViewAsControllerView;
  const auto newEffectiveImmediateTransactionCommit =
      newImmediateTransactionCommit || newAdoptHostViewAsControllerView;
  if (oldEffectiveImmediateTransactionCommit != newEffectiveImmediateTransactionCommit) {
    _containerView.immediateTransactionCommit = newEffectiveImmediateTransactionCommit;
  }

  if (oldDeferTransactionCommitOnRemovals != newDeferTransactionCommitOnRemovals) {
    _containerView.deferTransactionCommitOnRemovals = newDeferTransactionCommitOnRemovals;
  }

  if (oldNativeCommitObservations != newNativeCommitObservations) {
    _containerView.nativeCommitObservations = newNativeCommitObservations;
  }

  if (oldMountChildrenDirectlyToChildrenView !=
      newMountChildrenDirectlyToChildrenView) {
    _containerView.mountChildrenDirectlyToChildrenView = newMountChildrenDirectlyToChildrenView;
  }

  if (oldLayoutDirectChildrenToChildrenViewBounds !=
      newLayoutDirectChildrenToChildrenViewBounds) {
    _containerView.layoutDirectChildrenToChildrenViewBounds =
        newLayoutDirectChildrenToChildrenViewBounds;
  }

  if (oldPinNativeViewToHost != newPinNativeViewToHost) {
    _containerView.pinNativeViewToHost = newPinNativeViewToHost;
  }

  if (oldPreserveDetachedChildrenLayout != newPreserveDetachedChildrenLayout) {
    _containerView.preserveDetachedChildrenLayout = newPreserveDetachedChildrenLayout;
  }

  if (oldDetachedChildrenContentOffsetX != newDetachedChildrenContentOffsetX) {
    _containerView.detachedChildrenContentOffsetX = newDetachedChildrenContentOffsetX;
  }

  if (oldDetachedChildrenContentOffsetY != newDetachedChildrenContentOffsetY) {
    _containerView.detachedChildrenContentOffsetY = newDetachedChildrenContentOffsetY;
  }

  // Bug B fix: a stale-empty ("") incoming handle means JS does not know the
  // real native handle yet -- skip the assignment rather than clobbering the
  // live native handle with nil (which would clear _childrenView and blank the
  // hosted React subtree). Intentional clears run through -prepareForRecycle /
  // -setHostId:, not this typed change-path.
  if (oldNativeViewHandle != newNativeViewHandle && !newNativeViewHandle.empty()) {
    _containerView.nativeViewHandle =
        [NSString stringWithUTF8String:newNativeViewHandle.c_str()];
  }

  if (oldChildrenViewHandle != newChildrenViewHandle && !newChildrenViewHandle.empty()) {
    _containerView.childrenViewHandle =
        [NSString stringWithUTF8String:newChildrenViewHandle.c_str()];
  }

  if (oldControllerHandle != newControllerHandle && !newControllerHandle.empty()) {
    _containerView.controllerHandle =
        [NSString stringWithUTF8String:newControllerHandle.c_str()];
  }

  if (oldUIKitHostPropsJson != newUIKitHostPropsJson) {
    _hasModifiedPropsInCurrentTransaction = YES;
    _hasObservedPropsUpdateSinceLastTransaction = YES;
    NSString* uikitHostPropsJson =
        newUIKitHostPropsJson.empty()
            ? nil
            : [NSString stringWithUTF8String:newUIKitHostPropsJson.c_str()];
    _containerView.uikitHostPropsJson = uikitHostPropsJson;
  }

  if (oldUIKitHostPropsRevision != newUIKitHostPropsRevision) {
    _hasModifiedPropsInCurrentTransaction = YES;
    _hasObservedPropsUpdateSinceLastTransaction = YES;
    _containerView.uikitHostPropsRevision = newUIKitHostPropsRevision;
  }

  if (oldHostId != newHostId) {
    NSString* hostId = newHostId.empty() ? nil : [NSString stringWithUTF8String:newHostId.c_str()];
    _containerView.hostId = hostId;
  }

  if (oldHostReadyId != newHostReadyId) {
    NSString* hostReadyId = newHostReadyId.empty()
                                ? nil
                                : [NSString stringWithUTF8String:newHostReadyId.c_str()];
    _containerView.hostReadyId = hostReadyId;
  }

  if (oldUpdateRevision != newUpdateRevision) {
    _hasModifiedPropsInCurrentTransaction = YES;
    _hasObservedPropsUpdateSinceLastTransaction = YES;
    _containerView.updateRevision = newUpdateRevision;
  }

  if (oldMountedRevision != newMountedRevision) {
    _containerView.mountedRevision = newMountedRevision;
  }

  // C-fix-3 (iteration 9): see nativeScriptShouldCoalesceInTransactionRefreshTail
  // -- mountingTransactionDidMount's own unconditional refresh converges this
  // for insert/update-only transactions.
  if (![self nativeScriptShouldCoalesceInTransactionRefreshTail]) {
    [self refreshContainerViewFrameAndHost];
  }
  [self scheduleFabricTransactionCommitFallbackIfNeeded];
}

+ (BOOL)shouldBeRecycled {
  return NO;
}

- (void)prepareForRecycle {
  NativeScriptFabricLifecycleLog(@"prepareForRecycle component=%@ container=%@ debug=%@ hostId=%@",
                                 NativeScriptFabricDescribeView(self),
                                 NativeScriptFabricDescribeView(_containerView),
                                 _debugName ?: @"",
                                 _containerView.hostId ?: @"");
  [self nativeScriptUnregisterCurrentReactTag];
  [self restoreEmptyHostWrapperVisualStateIfNeeded];
  [_containerView restoreFabricChildComponentViewsForUnmount:nil index:NSNotFound];
  [super prepareForRecycle];
  [_debugName release];
  _debugName = nil;
  [_pendingHostReadyEvent release];
  _pendingHostReadyEvent = nil;
  _containerView.hostId = nil;
  _containerView.hostReadyId = nil;
  [_containerView clearFabricChildComponentViewRecords];
  _containerView.debugName = nil;
  _containerView.nativeViewHandle = nil;
  _containerView.childrenViewHandle = nil;
  // Turn adoption off BEFORE dropping the controller handle so the restore
  // (controller gets a plain replacement view, retain cycle broken) runs
  // while the controller is still known; then reclaim the container into the
  // recycled shell if UIKit containment moved it.
  _containerView.adoptHostViewAsControllerView = NO;
  _containerView.controllerHandle = nil;
  if (_containerView.superview != self) {
    [_containerView removeFromSuperview];
    [self addSubview:_containerView];
  }
  _containerView.attachNativeView = NO;
  _containerView.attachControllerToParent = NO;
  _containerView.collectChildren = NO;
  _containerView.detachControllerFromParent = NO;
  _containerView.detachControllerView = NO;
  _containerView.disableDetachedChildrenTouchHandler = NO;
  _containerView.disableUIKitHostWindowAttachRefresh = NO;
  _containerView.emitOffWindowHostReady = NO;
  _containerView.ignoreHostReadyWindowAttachment = NO;
  _containerView.externalDetachedChildrenOwner = NO;
  _containerView.fabricLifecycleCallbacks = NO;
  _containerView.immediateTransactionCommit = NO;
  _containerView.deferTransactionCommitOnRemovals = NO;
  _containerView.nativeCommitObservations = NO;
  _containerView.mountChildrenDirectlyToChildrenView = NO;
  _containerView.layoutDirectChildrenToChildrenViewBounds = NO;
  _containerView.pinNativeViewToHost = NO;
  _containerView.preserveDetachedChildrenLayout = NO;
  _containerView.detachedChildrenContentOffsetX = 0;
  _containerView.detachedChildrenContentOffsetY = 0;
  _containerView.uikitHostPropsJson = nil;
  _containerView.uikitHostPropsRevision = 0;
  _containerView.updateRevision = 0;
  _containerView.mountedRevision = 0;
  self.hidden = NO;
  _hasModifiedChildrenInCurrentTransaction = NO;
  _hasModifiedPropsInCurrentTransaction = NO;
  _hasObservedPropsUpdateSinceLastTransaction = NO;
  _hasPendingFabricTransactionCommitFallbackChildren = NO;
  _hasPendingFabricTransactionCommitFallbackProps = NO;
  // SEAM D STAGE 0: invalidate any still-pending deferred delivery (from
  // either producer) against the shared token before this container/instance
  // is torn down/reset.
  [_containerView advanceFabricTransactionDeliveryToken];
  _hasCachedLayoutMetrics = NO;
}

// RNS parity (RNSScreen.mm -invalidate / -invalidateImpl): `+shouldBeRecycled`
// returns NO for this class, so Fabric NEVER moves instances into the recycle
// pool — RCTComponentViewRegistry's _enqueueComponentViewWithComponentHandle:
// calls -invalidate (not -prepareForRecycle) for every permanent unmount of
// this component. Before this override, that path fell through to the
// no-op base implementation, so none of the hostId/relocation-record/
// adoption teardown below ever ran on permanent discard — a per-modal
// controller+container leak. Do the safe, non-UIKit-containment-mutating
// teardown synchronously, then defer the adoption unwind (which mutates
// UIKit containment via restoreAdoptedControllerViewIfNeeded) so it never
// races an in-flight transition/mounting transaction, mirroring RNS
// deferring `_controller = nil` in -invalidateImpl.
- (void)invalidate {
  NativeScriptFabricLifecycleLog(@"invalidate component=%@ container=%@ debug=%@ hostId=%@",
                                 NativeScriptFabricDescribeView(self),
                                 NativeScriptFabricDescribeView(_containerView),
                                 _debugName ?: @"",
                                 _containerView.hostId ?: @"");
  [self nativeScriptUnregisterCurrentReactTag];
  [_containerView restoreFabricChildComponentViewsForUnmount:nil index:NSNotFound];
  [_containerView clearFabricChildComponentViewRecords];
  _containerView.hostId = nil;
  _containerView.hostReadyId = nil;
  [_pendingHostReadyEvent release];
  _pendingHostReadyEvent = nil;

  // Legacy (never-adopted) hosts have nothing to unwind — near-no-op.
  if (_containerView.adoptHostViewAsControllerView) {
    // MRC (this file is built with -fno-objc-arc): retain the container for
    // the lifetime of the deferred block instead of an ARC-style weak
    // capture, so it is safe to touch even if this component view itself has
    // already been deallocated by the time the block runs.
    NativeScriptUIView* retainedContainerView = [_containerView retain];
    dispatch_async(dispatch_get_main_queue(), ^{
      // Turn adoption off BEFORE dropping the controller handle (same
      // ordering rationale as -prepareForRecycle above): the restore
      // (controller gets a plain replacement view, retain cycle broken)
      // must run while the controller is still known.
      retainedContainerView.adoptHostViewAsControllerView = NO;
      retainedContainerView.controllerHandle = nil;
      [retainedContainerView release];
    });
  }

  [super invalidate];
}

- (void)updateState:(const facebook::react::State::Shared&)state
           oldState:(const facebook::react::State::Shared&)oldState {
  _sizeState = std::static_pointer_cast<
      const facebook::react::NativeScriptUIViewSizedShadowNode::ConcreteState>(
      state);
}

// Push the UIKit-resolved adopted-container size into the shadow tree so the
// custom descriptor's adopt() re-sizes the Yoga node and the hosted subtree
// re-lays-out at the real dimensions. Only meaningful while adopted and
// UIKit-owned; a zero/again-equal size is skipped to avoid redundant commits.
- (void)pushAdoptedContainerSizeToShadowTree:(CGSize)size {
  if (_sizeState == nullptr) {
    return;
  }
  if (size.width <= 0 || size.height <= 0) {
    return;
  }
  if (CGSizeEqualToSize(size, _lastPushedAdoptedSize)) {
    return;
  }
  _lastPushedAdoptedSize = size;
  // Commit SYNCHRONOUSLY (unstable_Immediate), exactly like RNSScreen's
  // -updateBounds. An Asynchronous state update is processed on a later React
  // commit that races UIKit's mount/compositing pass, which leaves the hosted
  // subtree (esp. a ScrollView's below-the-fold content) laid out in the shadow
  // tree but not composited until some other event (e.g. a user scroll) forces a
  // new commit. A synchronous commit re-lays-out and re-mounts the hosted
  // content within this same layout pass, so it is composited immediately. This
  // is called from -layoutSubviews on the main thread, where an immediate commit
  // is safe.
  _sizeState->updateState(
      facebook::react::NativeScriptUIViewSizeStateData{
          facebook::react::Size{
              static_cast<facebook::react::Float>(size.width),
              static_cast<facebook::react::Float>(size.height)}},
      facebook::react::EventQueue::UpdateMode::unstable_Immediate);
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
  // Custom descriptor with UIKit->shadow-tree size feedback (adoption).
  return concreteComponentDescriptorProvider<NativeScriptUIViewSizedComponentDescriptor>();
}

@end

Class<RCTComponentViewProtocol> NativeScriptUIViewCls(void) {
  return NativeScriptUIViewComponentView.class;
}

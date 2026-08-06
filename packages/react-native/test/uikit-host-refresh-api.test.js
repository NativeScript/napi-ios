const assert = require("assert");
const fs = require("fs");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(packageRoot, relativePath), "utf8");
}

const index = read("src/index.ts");
const nativeComponent = read("src/NativeScriptUIViewNativeComponent.ts");
assert(
  index.includes("export function refreshUIKitHostView"),
  "public JS API should export refreshUIKitHostView",
);
assert(
  index.includes("__nativeScriptRefreshUIKitHostView"),
  "refreshUIKitHostView should call the worklet-installed native refresh global",
);
assert(
  index.includes("export function flushUIKitHostView") &&
    index.includes("__nativeScriptFlushUIKitHostView"),
  "public JS API should export flushUIKitHostView (used by the tabs-snapshot reveal path, symmetric with refreshUIKitHostView)",
);
assert(
  index.includes("export function notifyUIKitAccessibilityLayoutChanged") &&
    index.includes("__nativeScriptNotifyUIKitAccessibilityLayoutChanged") &&
    !index.includes(
      "export function notifyUIKitAccessibilityLayoutChangedHandle",
    ),
  "public JS API should expose UIKit accessibility layout invalidation (unused handle variant trimmed)",
);
assert(
  !index.includes("refreshUIKitHostViewHandle") &&
    !index.includes("refreshUIKitHostViewOwner") &&
    !index.includes("refreshUIKitHostViewDirectOwner") &&
    !index.includes("invalidateUIKitHostReadyOwner") &&
    !index.includes("flushUIKitHostViewHandle") &&
    !index.includes("flushUIKitHostViewOwner") &&
    !index.includes("attachViewControllerToNearestParent") &&
    !index.includes("nearestViewController"),
  "unused UIKit host refresh/flush/invalidate/attach handle+owner variants should be trimmed from the JS surface (base refresh/flush + native entry points are retained)",
);

const declarations = read("src/index.ts");
assert(
  declarations.includes("refreshUIKitHostView(view: unknown): boolean"),
  "public declarations should expose refreshUIKitHostView",
);
assert(
  declarations.includes(
    "notifyUIKitAccessibilityLayoutChanged(view: unknown): boolean",
  ) &&
    !declarations.includes("notifyUIKitAccessibilityLayoutChangedHandle("),
  "public declarations should expose UIKit accessibility layout invalidation (unused handle variant trimmed)",
);

const hostHeader = read("ios/NativeScriptUIKitHost.h");
assert(
  hostHeader.includes("NativeScriptRefreshUIKitHostView"),
  "UIKit host header should export a native refresh entry point",
);
assert(
  hostHeader.includes("NativeScriptRefreshUIKitHostViewOwner"),
  "UIKit host header should export an owner-only native refresh entry point",
);
assert(
  hostHeader.includes("NativeScriptRefreshUIKitHostViewDirectOwner"),
  "UIKit host header should export a direct-owner native refresh entry point",
);
assert(
  hostHeader.includes("NativeScriptInvalidateUIKitHostReadyOwner"),
  "UIKit host header should export an owner-only native hostReady invalidation entry point",
);
assert(
  hostHeader.includes("NativeScriptNotifyUIKitAccessibilityLayoutChanged"),
  "UIKit host header should export a native accessibility layout invalidation entry point",
);
assert(
  hostHeader.includes("NativeScriptFlushUIKitHostView") &&
    hostHeader.includes("NativeScriptFlushUIKitHostViewOwner"),
  "UIKit host header should export native display-flush entry points",
);
assert(
  hostHeader.includes("NativeScriptAttachViewControllerToNearestParent"),
  "UIKit host header should export generic nearest-parent UIViewController attachment",
);
assert(
  hostHeader.includes("NativeScriptNearestViewControllerForView"),
  "UIKit host header should export generic nearest UIViewController lookup",
);

const hostView = read("ios/NativeScriptUIView.mm");
const hostViewHeader = read("ios/NativeScriptUIView.h");
const manager = read("ios/NativeScriptUIViewManager.mm");
const fabricView = read("ios/Fabric/NativeScriptUIViewComponentView.mm");
assert(
  hostHeader.includes("BOOL allowRootParent") &&
    hostView.includes(
      "if (!allowRootParent && parent == view.window.rootViewController)",
    ),
  "nearest-parent UIViewController attachment should refuse app-root parenting unless explicitly requested",
);
assert(
  hostView.includes("NativeScriptNearestViewControllerForView") &&
    hostView.includes(
      "NativeScriptClosestReactViewControllerForView(view, nil)",
    ) &&
    hostView.includes(
      "controller = NativeScriptNearestViewController(view, nil);",
    ) &&
    hostView.includes(
      "NativeScriptClosestReactViewControllerForView(view, controller)",
    ) &&
    hostView.includes(
      "parent = NativeScriptNearestResponderViewController(view, controller);",
    ),
  "nearest UIViewController lookup should mirror RN reactViewController ownership before falling back to UIKit parent resolution",
);
assert(
  hostView.includes("#import <objc/runtime.h>"),
  "NativeScriptUIView should use ObjC associations for detached children hosts",
);
assert(
  hostView.includes("refreshDetachedChildrenHost"),
  "NativeScriptUIView should be able to refresh detached React children",
);
assert(
  hostView.includes("UIWindow* _lastUIKitHostAttachmentWindow;") &&
    hostView.includes("BOOL _needsUIKitHostRefreshAfterNativeAttachment;") &&
    hostView.includes("if (_hostId.length == 0 ||\n      _disableUIKitHostWindowAttachRefresh ||") &&
    hostView.includes("UIWindow* currentWindow = self.window;") &&
    hostView.includes(
      "if (!_needsUIKitHostRefreshAfterNativeAttachment &&\n      _lastUIKitHostAttachmentWindow == currentWindow)",
    ) &&
    hostView.includes("_lastUIKitHostAttachmentWindow = currentWindow;") &&
    hostView.includes("_needsUIKitHostRefreshAfterNativeAttachment = NO;") &&
    hostView.includes("- (void)setNeedsUIKitHostRefreshAfterNativeAttachment"),
  "NativeScriptUIView should refresh UIKit hosts only on real window or dirty host attachment changes",
);
assert(
  nativeComponent.includes("disableUIKitHostWindowAttachRefresh?: boolean") &&
    declarations.includes("disableUIKitHostWindowAttachRefresh?: boolean") &&
    index.includes('"disableUIKitHostWindowAttachRefresh"') &&
    index.includes(
      "const disableUIKitHostWindowAttachRefresh =\n      props.disableUIKitHostWindowAttachRefresh === true;",
    ) &&
    index.includes("disableUIKitHostWindowAttachRefresh,") &&
    hostViewHeader.includes(
      "@property(nonatomic, assign) BOOL disableUIKitHostWindowAttachRefresh",
    ) &&
    manager.includes(
      "RCT_EXPORT_VIEW_PROPERTY(disableUIKitHostWindowAttachRefresh, BOOL)",
    ) &&
    fabricView.includes("oldViewProps->disableUIKitHostWindowAttachRefresh") &&
    fabricView.includes(
      "_containerView.disableUIKitHostWindowAttachRefresh =\n        newDisableUIKitHostWindowAttachRefresh;",
    ) &&
    fabricView.includes("_containerView.disableUIKitHostWindowAttachRefresh = NO;"),
  "UIKit hosts should expose an opt-out for generic window-attachment refresh when native containment owns the hot path",
);
assert(
  hostView.includes("- (void)refreshDetachedChildrenSentinelAttachment") &&
    hostView.includes("[self.owner refreshDetachedChildrenSentinelAttachment];") &&
    !hostView.includes("[self.owner refreshDetachedChildrenHost];"),
  "detached children sentinel callbacks should maintain attachment without emitting hostReady lifecycle",
);
assert(
  hostView.includes("static BOOL NativeScriptInvalidateHostReadyOwner") &&
    hostView.includes("[owner invalidateHostReadySnapshot];") &&
    hostView.includes("[owner notifyHostReadyIfNeeded];") &&
    hostView.includes("BOOL _isNotifyingHostReady;") &&
    hostView.includes("static BOOL isDeliveringHostReady;") &&
    hostView.includes("if (isDeliveringHostReady)") &&
    hostView.includes("if (_isNotifyingHostReady)") &&
    hostView.includes("_isNotifyingHostReady = YES;") &&
    hostView.includes("isDeliveringHostReady = YES;") &&
    hostView.includes("isDeliveringHostReady = NO;") &&
    hostView.includes("@finally {\n    isDeliveringHostReady = NO;\n    _isNotifyingHostReady = NO;\n  }") &&
    hostView.includes("BOOL NativeScriptInvalidateUIKitHostReadyOwner"),
  "owner hostReady invalidation should clear the native snapshot and re-emit the UI-worklet lifecycle",
);
assert(
  hostView.includes("BOOL NativeScriptNotifyUIKitAccessibilityLayoutChanged") &&
    hostView.includes("UIAccessibilityPostNotification") &&
    hostView.includes("UIAccessibilityLayoutChangedNotification"),
  "accessibility layout invalidation should notify UIKit accessibility synchronously on the main thread",
);
assert(
    hostView.includes(
      "static BOOL NativeScriptRefreshOwner(NativeScriptUIView* owner)",
    ) &&
    hostView.includes("static NSMutableSet<NSValue*>* refreshingOwners") &&
    hostView.includes("[refreshingOwners containsObject:ownerKey]") &&
    hostView.includes("[refreshingOwners addObject:ownerKey]") &&
    hostView.includes("@finally {\n    [refreshingOwners removeObject:ownerKey];\n  }") &&
    hostView.includes("[owner attachViewControllerIfPossible]") &&
    hostView.includes('[owner runUIKitHostLifecycle:@"refresh"\n                 transactionJson:') &&
    hostView.includes("refreshedDetachedChildren = [owner refreshDetachedChildrenHost];") &&
    hostView.includes("return refreshedDetachedChildren;") &&
    !hostView.includes(
      "- (BOOL)refreshDetachedChildrenHost {\n  [self attachViewControllerIfPossible];",
    ),
  "explicit refreshUIKitHostView should retry generic UIViewController containment without mutating containment from hitTest refreshes",
);
assert(
  hostView.includes("NativeScriptUIView* owner = NativeScriptUIKitHostOwnerForView(view);") &&
    hostView.includes("if (owner != nil) {\n    return NativeScriptRefreshOwner(owner);\n  }\n\n  return NativeScriptRefreshUIKitHostSubviews(view, 0);") &&
    !hostView.includes(
      "return NativeScriptRefreshUIKitHostOwnersInAncestorChain(view) ||\n         NativeScriptRefreshUIKitHostSubviews(view, 0);",
    ),
  "generic refreshUIKitHostView should refresh the direct hosted owner/tree instead of re-entering ancestor stack owners",
);
assert(
  index.includes('phase === "refresh"') &&
    index.includes("function refreshingUIKitHostSet") &&
    index.includes("refreshingHosts.add(hostId)") &&
    index.includes("refreshingHosts.delete(hostId)") &&
    index.includes("const refreshHost = definition.refresh") &&
    index.includes("host.refresh?.(nextProps, host.previousProps);") &&
    index.includes("refreshHost?.("),
  "explicit refreshUIKitHostView should run only an opted-in guarded host refresh when UIKit moves hosted views without React prop changes",
);
assert(
  declarations.includes("refresh?: (") &&
    declarations.includes(
      '"create" | "update" | "refresh" | "mounted" | "dispose"',
    ),
  "public declarations should expose the explicit UIKit host refresh callback",
);
assert(
  hostView.includes(
    "sameHandle && (_nativeView != nil || _nativeViewHandle.length == 0)",
  ) &&
    hostView.includes(
      "sameHandle && (_childrenView != nil || _childrenViewHandle.length == 0)",
    ) &&
    hostView.includes(
      "sameHandle && (_viewController != nil || _controllerHandle.length == 0)",
    ),
  "NativeScriptUIView should retry same-handle resolution when native objects were not resolvable yet",
);
assert(
  hostView.includes("NativeScriptDetachedChildrenOwner") &&
    hostView.includes("objc_setAssociatedObject") &&
    hostView.includes("objc_getAssociatedObject"),
  "NativeScriptUIView should associate detached children views with their owner",
);
assert(
  hostView.includes("NativeScriptDetachedChildrenOwner(root)") &&
    hostView.includes("refreshDetachedChildrenHost"),
  "refreshUIKitHostView should refresh a detached children view even if its sentinel was removed",
);
assert(
  hostView.includes("BOOL NativeScriptRefreshUIKitHostViewOwner") &&
    hostView.includes(
      "return NativeScriptRefreshUIKitHostOwnersInAncestorChain(view);",
    ) &&
    !hostView.includes(
      "BOOL NativeScriptRefreshUIKitHostViewOwner(NSString* viewHandle) {\n  if (![NSThread isMainThread]) {\n    return NO;\n  }\n\n  UIView* view = NativeScriptUIViewFromHandle(viewHandle);\n  if (view == nil) {\n    return NO;\n  }\n\n  return NativeScriptRefreshUIKitHostOwnersInAncestorChain(view) ||\n         NativeScriptRefreshUIKitHostSubviews(view, 0);",
    ),
  "owner-only refresh should not recursively scan every hosted React descendant",
);
assert(
  hostView.includes("BOOL NativeScriptRefreshUIKitHostViewDirectOwner") &&
    hostView.includes(
      "return NativeScriptRefreshOwner(NativeScriptUIKitHostOwnerForView(view));",
    ) &&
    !hostView.includes(
      "BOOL NativeScriptRefreshUIKitHostViewDirectOwner(NSString* viewHandle) {\n  if (![NSThread isMainThread]) {\n    return NO;\n  }\n\n  UIView* view = NativeScriptUIViewFromHandle(viewHandle);\n  if (view == nil) {\n    return NO;\n  }\n\n  return NativeScriptRefreshUIKitHostOwnersInAncestorChain(view);",
    ),
  "direct-owner refresh should refresh only the nearest UIKit host owner without walking ancestor owners",
);
assert(
  hostView.includes("NSArray<UIView*>* subviews = [root.subviews copy];") &&
    hostView.includes("for (UIView* subview in subviews)") &&
    hostView.includes("[subviews release];"),
  "refreshUIKitHostView should snapshot subviews because refreshing owners can mutate UIKit hierarchy during traversal",
);
assert(
  hostView.includes("NSString* _lastDetachedChildrenLayoutKey") &&
    hostView.includes("NativeScriptDetachedChildrenLayoutSnapshotKey") &&
    hostView.includes('appendString:@"|tree:"') &&
    hostView.includes("NativeScriptAppendSubviewTopology(key, childrenView, sentinel, 0, 3)") &&
    hostView.includes(
      "if ([_lastDetachedChildrenLayoutKey isEqualToString:layoutKey])",
    ) &&
    hostView.includes(
      "- (BOOL)layoutDetachedChildrenViewSubviewsAndReturnMutation",
    ),
  "NativeScriptUIView refresh should skip duplicate detached-children layout snapshots",
);
assert(
  hostView.includes("if ([parent isKindOfClass:UIScrollView.class])") &&
    hostView.includes("childFrame.size.height < parentBounds.size.height - 2") &&
    hostView.includes("static CGRect NativeScriptHostedSubviewFillFrame(UIView* parent)") &&
    hostView.includes("frame.origin = CGPointZero;") &&
    hostView.includes("const CGRect bounds = NativeScriptHostedSubviewFillFrame(root);") &&
    !hostView.includes("static BOOL NativeScriptLayoutHostedScrollViewContent") &&
    !hostView.includes("NativeScriptHostedContentExtent") &&
    !hostView.includes("scrollView.contentSize = targetSize") &&
    !hostView.includes(
      "if ([root isKindOfClass:UIScrollView.class]) {\n    return NO;\n  }",
    ),
  "NativeScriptUIView direct-child layout may expand an undersized origin-aligned ScrollView content container without inheriting scroll offset, taking over contentSize, or shrinking long content",
);
assert(
  hostView.includes(
    "return NativeScriptChildrenViewHasVisibleChild(_childrenView, _detachedTouchSentinel, self);",
  ),
  "refreshUIKitHostView should report whether hosted React children are ready without counting the internal carrier",
);
assert(
  hostView.includes("UIView* touchView = _childrenView;"),
  "NativeScriptUIView should attach the RN touch handler to the stable detached children host",
);
assert(
  index.includes("disableDetachedChildrenTouchHandler?: boolean") &&
    index.includes('"disableDetachedChildrenTouchHandler"') &&
    index.includes("props.disableDetachedChildrenTouchHandler === true") &&
    declarations.includes("disableDetachedChildrenTouchHandler?: boolean") &&
    read("src/NativeScriptUIViewNativeComponent.ts").includes(
      "disableDetachedChildrenTouchHandler?: boolean",
    ) &&
    read("ios/NativeScriptUIView.h").includes(
      "@property(nonatomic, assign) BOOL disableDetachedChildrenTouchHandler",
    ) &&
    read("ios/NativeScriptUIViewManager.mm").includes(
      "RCT_EXPORT_VIEW_PROPERTY(disableDetachedChildrenTouchHandler, BOOL)",
    ) &&
    read("ios/Fabric/NativeScriptUIViewComponentView.mm").includes(
      "_containerView.disableDetachedChildrenTouchHandler =",
    ) &&
    hostView.includes(
      "if (_disableDetachedChildrenTouchHandler || _mountChildrenDirectlyToChildrenView)",
    ) &&
    hostView.includes(
      "[self detachDetachedChildrenTouchHandler];\n    return;",
    ),
  "NativeScriptUIView should expose a generic host option for RN children that already live under an upstream surface touch handler",
);
assert(
  hostView.includes(
    "NativeScriptViewHasGestureRecognizer(touchView, _detachedTouchHandler)",
  ) &&
    hostView.includes(
      "NativeScriptGestureRecognizerAttachedView(_detachedTouchHandler)",
    ) &&
    hostView.includes("_detachedTouchHandler != nil && _detachedTouchHandlerView == touchView") &&
    hostView.includes("attachedTouchHandlerView == nil") &&
    hostView.includes("[_detachedTouchHandler attachToView:touchView];") &&
    hostView.includes("reattached detached handler") &&
    hostView.includes("preserve hidden/window") &&
    hostView.includes("_detachedTouchHandlerWindow = touchView.window;") &&
    !hostView.includes("_detachedTouchHandlerWindow != touchView.window"),
  "NativeScriptUIView should preserve and reattach a same-view detached RN touch handler across transient UIKit window transitions",
);
assert(
  hostView.includes("static BOOL NativeScriptGestureRecognizerHasActiveTouches") &&
    hostView.includes("gesture.state == UIGestureRecognizerStateBegan") &&
    hostView.includes("gesture.state == UIGestureRecognizerStateChanged") &&
    hostView.includes("gesture.numberOfTouches > 0") &&
    hostView.includes("preserve active handler"),
  "NativeScriptUIView should not detach or move an active RN surface touch handler during a host refresh",
);
assert(
  hostView.includes("_detachedTouchHandlerWindow = touchView.window;") &&
    hostView.includes("_detachedTouchHandlerWindow = nil;"),
  "NativeScriptUIView should track and clear the detached touch handler window",
);
assert(
  hostView.includes("touchView.userInteractionEnabled = YES;"),
  "NativeScriptUIView should keep the hosted RN touch surface interactive after refreshes",
);
assert(
  hostView.includes("@implementation NativeScriptDetachedChildrenTouchSentinel") &&
    hostView.includes("- (BOOL)pointInside:(CGPoint)point withEvent:(UIEvent*)event {\n  return NO;\n}") &&
    hostView.includes("- (UIView*)hitTest:(CGPoint)point withEvent:(UIEvent*)event {\n  return nil;\n}"),
  "NativeScript detached-children sentinel should never become a touch target even if UIKit refresh code changes hidden or interaction flags",
);
assert(
  hostView.includes("_detachedTouchSentinel.owner = nil;\n  [_detachedTouchSentinel removeFromSuperview];") &&
    hostView.match(/_detachedTouchSentinel\.owner = nil;\n  \[_detachedTouchSentinel removeFromSuperview\];/g)
      ?.length >= 2,
  "NativeScript detached-children sentinel should clear its owner before removal so UIKit lifecycle callbacks cannot re-enter a tearing-down host",
);
assert(
  hostView.includes("static BOOL NativeScriptViewIsHostHitTestPlumbing(UIView* view)") &&
    hostView.includes("[view isKindOfClass:UIControl.class]") &&
    hostView.includes("static BOOL NativeScriptViewHasOnlySurfaceTouchHandlers(UIView* view)") &&
    hostView.includes("[recognizer isKindOfClass:RCTSurfaceTouchHandler.class]") &&
    hostView.includes('[className isEqualToString:@"NativeScriptUIView"]') &&
    hostView.includes('[className isEqualToString:@"NativeScriptUIViewComponentView"]') &&
    hostView.includes('[className isEqualToString:@"UIView"] &&') &&
    hostView.includes("(view.gestureRecognizers.count == 0 || NativeScriptViewHasOnlySurfaceTouchHandlers(view))") &&
    hostView.includes("view.subviews.count > 0") &&
    hostView.includes("view.gestureRecognizers.count == 0 || NativeScriptViewHasOnlySurfaceTouchHandlers(view)"),
  "NativeScriptUIView should classify inert host wrappers and plain RN surface-handler carriers as touch-transparent plumbing",
);
assert(
  hostView.includes("if (hitView != nil && hitView != self)") &&
    hostView.includes("hitViewIsTransparentHostWrapper") &&
    hostView.includes("hitViewIsHostPlumbing") &&
    hostView.includes("[static_cast<NativeScriptUIView*>(hitView) shouldHideEmptyFabricHostWrapper]") &&
    hostView.includes("hitView = nil;") &&
    hostView.includes("skip super host plumbing") &&
    hostView.includes("skip hosted host plumbing") &&
    hostView.includes(
      "([self shouldHideEmptyFabricHostWrapper] || NativeScriptViewIsHostHitTestPlumbing(self))",
    ) &&
    hostView.includes(
      "if (_externalDetachedChildrenOwner) {\n    return hitView;\n  }\n\n  UIView* hostedViews[] = { _nativeView, _childrenView };",
    ) &&
    hostView.includes(
      "return hitView;\n}\n\n- (BOOL)hostedViewIsDetachedFromHostWrapper:",
    ),
  "NativeScriptUIView should not swallow detached hosted React touches by returning the empty host wrapper before checking hosted content",
);
assert(
    hostView.includes("- (NSArray*)accessibilityElements") &&
    hostView.includes("static BOOL NativeScriptViewHasHiddenUIKitAncestor(UIView* view)") &&
    hostView.includes("NativeScriptViewHasHiddenUIKitAncestor(self)") &&
    hostView.includes("[self hostedViewIsDetachedFromHostWrapper:_nativeView]") &&
    hostView.includes("return [super accessibilityElements];") &&
    !hostView.includes("[elements addObject:hostedView]") &&
    hostView.includes("- (NSInteger)accessibilityElementCount") &&
    hostView.includes("- (id)accessibilityElementAtIndex:(NSInteger)index") &&
    hostView.includes("- (NSInteger)indexOfAccessibilityElement:(id)element"),
  "NativeScriptUIView should route detached hosted touches without duplicating the real UIKit accessibility owner chain",
);
assert(
  hostView.includes("[surfaceTouchHandler attachToView:touchView];") &&
    hostView.includes("[self updateDetachedChildrenTouchHandlerOrigin];") &&
    hostView.includes(
      "NativeScriptViewHasSurfaceTouchHandler(touchView, _detachedTouchHandler)",
    ) &&
    hostView.includes(
      "NativeScriptViewHasSurfaceTouchHandlerInAncestorChain(touchView, _detachedTouchHandler)",
    ) &&
    hostView.includes(
      "NativeScriptUpdateSurfaceTouchHandlerOriginsInAncestorChain(touchView, _detachedTouchHandler)",
    ) &&
    hostView.includes(
      "NativeScriptUpdateSurfaceTouchHandlerOrigins(touchView, _detachedTouchHandler)",
    ) &&
    hostView.includes(
      "((RCTSurfaceTouchHandler*)recognizer).viewOriginOffset = origin;",
    ) &&
    hostView.includes("touchView.window == nil") &&
    !hostView.includes("NativeScriptWindowSurfaceTouchHandler") &&
    !hostView.includes("NativeScriptEnsureWindowSurfaceTouchHandler") &&
    !hostView.includes("NativeScriptViewHasOwnedReactHostAncestor") &&
    !hostView.includes("NativeScriptWindowSurfaceTouchHandlerKey") &&
    !hostView.includes("NativeScriptDetachedSurfaceTouchHandler") &&
    !hostView.includes("NS_TOUCH_DIAG"),
  "NativeScriptUIView should attach RN touch handling only to windowed NativeScript-hosted React subtrees that do not already own a surface handler",
);
assert(
  hostView.includes("if (!CGRectEqualToRect(subview.frame, bounds))") &&
    hostView.includes("if (didMutateSubview)") &&
    !hostView.includes("[subview layoutIfNeeded];"),
  "NativeScriptUIView refresh should update stale frames without forcing or invalidating clean UIKit layout during touch dispatch",
);
assert(
  hostView.includes("NativeScriptDetachedChildrenDisplaySnapshotKey") &&
    hostView.includes("NativeScriptInvalidateHostedSubviewDisplay") &&
    hostView.includes("[view.layer setNeedsDisplay];") &&
    hostView.includes("NativeScriptFlushHostedSubviewDisplay") &&
    hostView.includes("[view.layer displayIfNeeded];") &&
    hostView.includes("[CATransaction flush];") &&
    hostView.includes("- (BOOL)flushDetachedChildrenDisplay") &&
    hostView.includes("- (void)invalidateDetachedChildrenDisplayIfNeeded") &&
    hostView.includes(
      "[self invalidateDetachedChildrenDisplayIfNeeded];\n  [self notifyHostReadyIfNeeded];",
    ),
  "NativeScriptUIView should invalidate hosted RN display at attach/reparent refresh boundaries and expose an explicit synchronous display flush for first native frames",
);
assert(
  hostView.includes("static BOOL NativeScriptFlushOwnerDisplay") &&
    hostView.includes("NativeScriptFlushUIKitHostOwnersInAncestorChain") &&
    hostView.includes("NativeScriptFlushUIKitHostSubviews") &&
	    hostView.includes("BOOL NativeScriptFlushUIKitHostView(NSString* viewHandle)") &&
	    hostView.includes("BOOL NativeScriptFlushUIKitHostViewOwner(NSString* viewHandle)") &&
	    hostView.includes("NativeScriptUIView* owner = NativeScriptUIKitHostOwnerForView(view);") &&
	    hostView.includes("NativeScriptFlushOwnerDisplay(owner)") &&
	    hostView.includes("BOOL flushed = NativeScriptFlushOwnerDisplay(owner);") &&
	    hostView.includes(
	      "flushed = NativeScriptFlushUIKitHostSubviews(view, 0) || flushed;",
	    ) &&
	    hostView.includes(
	      "const BOOL flushed = NativeScriptFlushUIKitHostOwnersInAncestorChain(view);",
	    ) &&
    !hostView.includes(
      "const BOOL flushed = NativeScriptFlushUIKitHostOwnersInAncestorChain(view) ||\n      NativeScriptFlushUIKitHostSubviews(view, 0);",
    ) &&
    !hostView.includes(
      "BOOL NativeScriptFlushUIKitHostViewOwner(NSString* viewHandle) {\n  if (![NSThread isMainThread]) {\n    return NO;\n  }\n\n  UIView* view = NativeScriptUIViewFromHandle(viewHandle);\n  if (view == nil) {\n    return NO;\n  }\n\n  const BOOL flushed = NativeScriptFlushUIKitHostOwnersInAncestorChain(view) ||",
    ),
  "default display flush should refresh the direct host/tree and owner-only display flush should avoid recursively scanning every hosted React descendant",
);
{
  const nativeHitTestStart = hostView.indexOf(
    "- (UIView*)hitTest:(CGPoint)point withEvent:(UIEvent*)event",
  );
  const nativeHitTestEnd = hostView.indexOf(
    "- (void)didMoveToWindow",
    nativeHitTestStart,
  );
  assert(
    nativeHitTestStart >= 0 &&
      nativeHitTestEnd > nativeHitTestStart &&
      !hostView
        .slice(nativeHitTestStart, nativeHitTestEnd)
        .includes("invalidateDetachedChildrenDisplay"),
    "NativeScriptUIView should not invalidate hosted RN display during hit testing",
  );
}
assert(
  index.includes("preserveDetachedChildrenLayout?: boolean") &&
    index.includes('"preserveDetachedChildrenLayout"') &&
    index.includes("props.preserveDetachedChildrenLayout === true") &&
    declarations.includes("preserveDetachedChildrenLayout?: boolean") &&
    read("src/NativeScriptUIViewNativeComponent.ts").includes(
      "preserveDetachedChildrenLayout?: boolean",
    ) &&
    read("ios/NativeScriptUIView.h").includes(
      "@property(nonatomic, assign) BOOL preserveDetachedChildrenLayout",
    ) &&
    read("ios/Fabric/NativeScriptUIViewComponentView.mm").includes(
      "_containerView.preserveDetachedChildrenLayout = newPreserveDetachedChildrenLayout;",
    ) &&
    hostView.includes("if (_preserveDetachedChildrenLayout)") &&
    hostView.includes("continue;"),
  "NativeScriptUIView should expose a generic mode that preserves Fabric child layout for config hosts",
);
assert(
  index.includes("collectChildren?: boolean") &&
    index.includes('"collectChildren"') &&
    index.includes("props.collectChildren === true") &&
    index.includes("export function collectedUIKitHostChildren") &&
    index.includes("export function uikitHostHandlesForView") &&
    !index.includes("uikitHostOwnerHandlesForView") &&
    index.includes("__nativeScriptCollectedUIKitHostChildren") &&
    index.includes("__nativeScriptUIKitHostHandlesForView") &&
    index.includes("componentViewHandle,") &&
    index.includes("containerViewHandle,") &&
    declarations.includes("collectChildren?: boolean") &&
    declarations.includes("componentViewHandle?: string") &&
    declarations.includes("containerViewHandle?: string") &&
    declarations.includes("collectedUIKitHostChildren<T = unknown>") &&
    declarations.includes("uikitHostHandlesForView") &&
    read("src/NativeScriptUIViewNativeComponent.ts").includes(
      "collectChildren?: boolean",
    ) &&
    read("ios/NativeScriptUIView.h").includes(
      "@property(nonatomic, assign) BOOL collectChildren",
    ) &&
    read("ios/Fabric/NativeScriptUIViewComponentView.mm").includes(
      "_containerView.collectChildren = newCollectChildren;",
    ) &&
    hostView.includes("- (NSArray<UIView*>*)collectedChildComponentViews") &&
    hostView.includes(
      '@"componentViewHandle" : NativeScriptHandleFromNSObject(self.superview)',
    ) &&
    hostView.includes(
      '@"containerViewHandle" : NativeScriptHandleFromNSObject(self)',
    ) &&
    hostView.includes("NativeScriptCollectedUIKitHostChildren") &&
    hostView.includes("NativeScriptUIKitHostHandlesForView") &&
    hostView.includes("NativeScriptUIKitHostOwnerHandlesForView") &&
    hostView.includes("parentOwner != nil && parentOwner != owner") &&
    hostView.includes("current = current.superview;") &&
    read("ios/NativeScriptNativeApiModule.mm").includes(
      "__nativeScriptUIKitHostHandlesForView",
    ) &&
    read("ios/NativeScriptNativeApiModule.mm").includes(
      "__nativeScriptUIKitHostOwnerHandlesForView",
    ) &&
    hostView.includes("unmountCollectedChildComponentView"),
  "NativeScriptUIView should expose a generic Fabric child collector for component views that own React subviews without mounting them",
);
assert(
  hostView.includes("NativeScriptInstallFabricReparentingGuard") &&
    hostView.includes("NativeScriptRecordFabricParentBeforeMove") &&
    hostView.includes("NativeScriptRestoreFabricChildrenForUnmount") &&
    hostView.includes('NSClassFromString(@"RCTViewComponentView")') &&
    hostView.includes(
      'NSSelectorFromString(@"unmountChildComponentView:index:")',
    ) &&
    hostView.includes("NativeScriptFabricGuardRCTViewComponentViewUnmountChild") &&
    read("ios/NativeScriptUIView.h").includes(
      "- (void)restoreFabricChildComponentViewsForUnmount:(UIView*)view index:(NSInteger)index",
    ) &&
    read("ios/Fabric/NativeScriptUIViewComponentView.mm").includes(
      "[_containerView restoreFabricChildComponentViewsForUnmount:childComponentView index:index]",
    ) &&
    read("ios/Fabric/NativeScriptUIViewComponentView.mm").includes(
      "[_containerView restoreFabricChildComponentViewsForUnmount:nil index:NSNotFound]",
    ),
  "NativeScriptUIView should restore UIKit-reparented Fabric children before React Native Fabric unmount assertions run",
);
assert(
  hostView.includes(
    "NativeScriptFabricRestoreWouldCrossActiveControllerTransition",
  ) &&
    hostView.includes("NativeScriptFabricControllerIsTransitioning") &&
    hostView.includes("NativeScriptFabricUnmountRelocatedChildInRuntime") &&
    hostView.includes(
      "if (NativeScriptRestoreFabricChildrenForUnmount(expectedSuperview, child, index, nil, nil))",
    ) &&
    hostView.includes(
      "NativeScriptOriginalUIViewRemoveFromSuperview(child, @selector(removeFromSuperview));",
    ) &&
    hostView.includes("return;"),
  "NativeScriptUIView should not force Fabric children back through an active UIKit controller transition during unmount",
);
assert(
  !hostView.includes("NativeScriptFindAncestorSurfaceTouchHandler") &&
    !hostView.includes(
      "NativeScriptDetachNestedDetachedChildrenTouchHandlers",
    ) &&
    !hostView.includes("hasActiveDetachedChildrenTouchHandler") &&
    !hostView.includes("NativeScriptViewHasVisibleNestedUIKitHost") &&
    hostView.includes(
      "if (touchView.hidden || touchView.alpha <= 0.01 || touchView.window == nil)",
    ) &&
    hostView.includes(
      "NativeScriptViewHasSurfaceTouchHandlerInAncestorChain(touchView, _detachedTouchHandler)",
    ) &&
    !hostView.includes("nativeViewHasVisibleNestedUIKitHost") &&
    hostView.includes("shouldUseNativeControllerTouchSurface") &&
    hostView.includes("touchView = _nativeView") &&
    hostView.includes(
      "NativeScriptHostedViewContainsControllerView(_nativeView, _viewController)",
    ) &&
    !hostView.includes(
      "NativeScriptHostedViewContainsControllerView(_nativeView, _viewController) &&\n      !NativeScriptViewHasVisibleNestedUIKitHost",
    ) &&
    !hostView.includes(
      "(_childrenView.hidden || !childrenViewHasVisibleChild)",
    ) &&
    hostView.includes("[surfaceTouchHandler attachToView:touchView];"),
  "NativeScriptUIView should route UIKit-reparented React islands through their own RN touch handler unless an ancestor surface already owns touches",
);
assert(
  hostView.includes("UIView* detachView =") &&
    hostView.includes(
      "NativeScriptGestureRecognizerAttachedView(_detachedTouchHandler)",
    ) &&
    hostView.includes(
      "NativeScriptViewHasGestureRecognizer(detachView, _detachedTouchHandler)",
    ) &&
    hostView.includes("[_detachedTouchHandler detachFromView:detachView];"),
  "NativeScriptUIView should detach RCTSurfaceTouchHandler from its actual attached view, not a stale stored host view",
);
assert(
  hostView.includes(
    "- (UIView*)hitTest:(CGPoint)point withEvent:(UIEvent*)event {\n  return [self hostedContentHitTest:point withEvent:event];\n}",
  ) &&
    !hostView.includes(
      "NativeScriptEnsureWindowSurfaceTouchHandler(self.window);",
    ),
  "NativeScriptUIView should keep hit testing on the routing path without repairing detached RN touch hosts",
);
assert(
  !hostView.includes("NativeScriptFirstReactTaggedSubview"),
  "NativeScriptUIView should not attach RN touch handling to a route-dependent React descendant",
);

const fabricHostView = read("ios/Fabric/NativeScriptUIViewComponentView.mm");
assert(
  fabricHostView.includes("static BOOL NativeScriptFabricViewIsHostHitTestPlumbing(UIView* view)") &&
    fabricHostView.includes('[className isEqualToString:@"NativeScriptUIViewComponentView"]') &&
    fabricHostView.includes('[className isEqualToString:@"UIView"] &&') &&
    fabricHostView.includes("(view.gestureRecognizers.count == 0 || hasOnlySurfaceTouchHandlers)") &&
    fabricHostView.includes("view.subviews.count > 0") &&
    fabricHostView.includes("[recognizer isKindOfClass:RCTSurfaceTouchHandler.class]") &&
    fabricHostView.includes("NativeScriptFabricViewIsHostHitTestPlumbing(self)"),
  "Fabric NativeScriptUIView host should not become the terminal touch target for hosted RN children",
);
assert(
  fabricHostView.includes("NativeScriptFabricColorIsEffectivelyClear") &&
    fabricHostView.includes("NativeScriptFabricCGColorIsEffectivelyClear") &&
    fabricHostView.includes("- (void)refreshEmptyHostWrapperVisualState") &&
    fabricHostView.includes("[_containerView shouldHideEmptyFabricHostWrapper]") &&
    fabricHostView.includes("_emptyHostWrapperSavedLayerBackgroundColor") &&
    fabricHostView.includes("_emptyHostWrapperSavedContainerLayerBackgroundColor") &&
    fabricHostView.includes("CGFloat _emptyHostWrapperSavedAlpha;") &&
    fabricHostView.includes("CGFloat _emptyHostWrapperSavedContainerAlpha;") &&
    fabricHostView.includes("_emptyHostWrapperSavedAlpha = self.alpha;") &&
    fabricHostView.includes(
      "_emptyHostWrapperSavedContainerAlpha = _containerView.alpha;",
    ) &&
    fabricHostView.includes("CGColorRetain(self.layer.backgroundColor)") &&
    fabricHostView.includes("CGColorRetain(_containerView.layer.backgroundColor)") &&
    fabricHostView.includes("CGColorRelease(_emptyHostWrapperSavedLayerBackgroundColor)") &&
    fabricHostView.includes("CGColorRelease(_emptyHostWrapperSavedContainerLayerBackgroundColor)") &&
    fabricHostView.includes("self.alpha = _emptyHostWrapperSavedAlpha;") &&
    fabricHostView.includes(
      "_containerView.alpha = _emptyHostWrapperSavedContainerAlpha;",
    ) &&
    fabricHostView.includes("self.backgroundColor = UIColor.clearColor;") &&
    fabricHostView.includes("_containerView.backgroundColor = UIColor.clearColor;") &&
    fabricHostView.includes("self.alpha = 0;") &&
    fabricHostView.includes("_containerView.alpha = 0;") &&
    fabricHostView.includes("self.layer.backgroundColor = UIColor.clearColor.CGColor;") &&
    fabricHostView.includes("_containerView.layer.backgroundColor = UIColor.clearColor.CGColor;") &&
    fabricHostView.includes("self.opaque = NO;") &&
    fabricHostView.includes("_containerView.opaque = NO;") &&
    fabricHostView.includes("self.layer.opaque = NO;") &&
    fabricHostView.includes("_containerView.layer.opaque = NO;") &&
    fabricHostView.includes("[self.layer setNeedsDisplay];") &&
    fabricHostView.includes("[_containerView.layer setNeedsDisplay];") &&
    fabricHostView.includes("restoreEmptyHostWrapperVisualStateIfNeeded") &&
    fabricHostView.includes("[self refreshEmptyHostWrapperVisualState];") &&
    fabricHostView.includes("[self restoreEmptyHostWrapperVisualStateIfNeeded];"),
  "Fabric NativeScriptUIView host should make empty detached host wrappers paint-transparent, not only hit-test-transparent",
);
assert(
  hostView.includes(
    "- (BOOL)shouldHideEmptyFabricHostWrapper {\n  UIView* componentView = self.superview;\n  if (componentView != nil && (_childrenView == componentView || _nativeView == componentView)) {\n    return NO;\n  }\n\n  if ([self hasVisibleSubviewMountedInHostWrapper]) {\n    return NO;\n  }",
  ) &&
    hostView.includes(
      "const BOOL hasExternalDetachedChildrenOwner =\n      _externalDetachedChildrenOwner && (_nativeView != nil || _childrenView != nil);",
    ) &&
    hostView.includes(
      "return hasDetachedHostedContent || hasExternalDetachedChildrenOwner;",
    ),
  "NativeScriptUIView should make empty external-detached-owner shells paint-inert while keeping hosts with visible mounted children visible",
);
assert(
  fabricHostView.includes("- (void)refreshContainerViewFrameAndHost") &&
    fabricHostView.includes("- (void)refreshContainerViewFrameIfNeeded") &&
    fabricHostView.includes(
      "if (!CGRectEqualToRect(_containerView.frame, self.bounds))",
    ) &&
    fabricHostView.includes("_containerView.frame = self.bounds;") &&
    fabricHostView.includes("[_containerView setNeedsLayout];") &&
    !fabricHostView.includes("[_containerView layoutIfNeeded];") &&
    fabricHostView.includes("[_containerView refreshDetachedChildrenHost];"),
  "Fabric wrapper should correct stale host frames without forcing UIKit layout during Fabric commits",
);
assert(
  fabricHostView.includes(
    "- (UIView*)hitTest:(CGPoint)point withEvent:(UIEvent*)event {\n  [self refreshContainerViewFrameIfNeeded];",
  ) &&
    !fabricHostView.includes(
      "- (UIView*)hitTest:(CGPoint)point withEvent:(UIEvent*)event {\n  [self refreshContainerViewFrameAndHost];",
    ),
  "Fabric wrapper should keep hit testing on a frame-only path instead of repairing detached RN touch hosts",
);
assert(
  fabricHostView.includes("- (void)didMoveToWindow") &&
    fabricHostView.includes("[self refreshContainerViewFrameAndHost];"),
  "Fabric wrapper should refresh detached RN touch hosts when UIKit moves the wrapper between windows",
);
assert(
  fabricHostView.includes("- (void)mountChildComponentView") &&
    !fabricHostView.includes(
      "- (void)mountChildComponentView:(UIView<RCTComponentViewProtocol>*)childComponentView\n                          index:(NSInteger)index {\n  [_containerView insertSubview:childComponentView atIndex:index];\n  [_containerView layoutDetachedChildrenViewSubviewsIfNeeded];",
    ),
  "Fabric child mounts should use full host refresh instead of layout-only refresh",
);
assert(
  fabricHostView.includes("- (void)updateLayoutMetrics") &&
    !fabricHostView.includes(
      "- (void)updateLayoutMetrics:(const LayoutMetrics&)layoutMetrics\n           oldLayoutMetrics:(const LayoutMetrics&)oldLayoutMetrics {\n  [super updateLayoutMetrics:layoutMetrics oldLayoutMetrics:oldLayoutMetrics];\n  [_containerView layoutDetachedChildrenViewSubviewsIfNeeded];",
    ),
  "Fabric layout updates should refresh the touch host origin and handler, not just resize children",
);
assert(
  fabricHostView.includes("+ (BOOL)shouldBeRecycled") &&
    fabricHostView.includes("return NO;"),
  "Fabric NativeScriptUIView hosts arbitrary UIKit/RN native state and should opt out of Fabric component recycling like upstream screens component views",
);
assert(
  hostView.includes("return enabled != nullptr && enabled[0] == '1';"),
  "NativeScript touch debug logging should require NS_NS_TOUCH_DEBUG=1 so explicit off values do not log on the touch hot path",
);

const moduleSource = read("ios/NativeScriptNativeApiModule.mm");
assert(
  moduleSource.includes("__nativeScriptRefreshUIKitHostView"),
  "worklet runtime install should expose the refresh host function",
);
assert(
  moduleSource.includes("__nativeScriptFlushUIKitHostView") &&
    moduleSource.includes("__nativeScriptFlushUIKitHostViewOwner") &&
    moduleSource.includes("NativeScriptFlushUIKitHostView(nativeHandle)") &&
    moduleSource.includes("NativeScriptFlushUIKitHostViewOwner(nativeHandle)"),
  "worklet runtime install should expose the display flush host functions",
);
assert(
  moduleSource.includes("__nativeScriptAttachViewControllerToNearestParent") &&
    moduleSource.includes("NativeScriptAttachViewControllerToNearestParent(") &&
    moduleSource.includes("BOOL allowRootParent") &&
    moduleSource.includes("controllerHandle, viewHandle, allowRootParent"),
  "worklet runtime install should expose the generic nearest-parent attachment host function",
);
assert(
  moduleSource.includes("__nativeScriptNearestViewControllerForView") &&
    moduleSource.includes("NativeScriptNearestViewControllerForView(viewHandle)") &&
    moduleSource.includes("return jsi::Value::null();"),
  "worklet runtime install should expose the nil-safe nearest UIViewController lookup host function",
);

console.log("uikit host refresh API tests passed");

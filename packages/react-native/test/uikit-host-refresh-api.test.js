const assert = require("assert");
const fs = require("fs");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(packageRoot, relativePath), "utf8");
}

const index = read("src/index.ts");
assert(
  index.includes("export function refreshUIKitHostView"),
  "public JS API should export refreshUIKitHostView",
);
assert(
  index.includes("__nativeScriptRefreshUIKitHostView"),
  "refreshUIKitHostView should call the worklet-installed native refresh global",
);
assert(
  index.includes("export function refreshUIKitHostViewHandle") &&
    index.includes("return refresh(nativeHandleForUIKitView(view)) === true;") &&
    index.includes("return refresh(viewHandle) === true;"),
  "public JS API should refresh UIKit hosts from native handles",
);

const declarations = read("src/index.d.ts");
assert(
  declarations.includes("refreshUIKitHostView(view: unknown): boolean"),
  "public declarations should expose refreshUIKitHostView",
);
assert(
  declarations.includes("refreshUIKitHostViewHandle(viewHandle: string): boolean"),
  "public declarations should expose handle-based UIKit host refresh",
);

const hostHeader = read("ios/NativeScriptUIKitHost.h");
assert(
  hostHeader.includes("NativeScriptRefreshUIKitHostView"),
  "UIKit host header should export a native refresh entry point",
);

const hostView = read("ios/NativeScriptUIView.mm");
assert(
  hostView.includes("#import <objc/runtime.h>"),
  "NativeScriptUIView should use ObjC associations for detached children hosts",
);
assert(
  hostView.includes("refreshDetachedChildrenHost"),
  "NativeScriptUIView should be able to refresh detached React children",
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
  hostView.includes(
    "return NativeScriptChildrenViewHasVisibleChild(_childrenView, _detachedTouchSentinel);",
  ),
  "refreshUIKitHostView should report whether hosted React children are ready",
);
assert(
  hostView.includes("UIView* touchView = _childrenView;"),
  "NativeScriptUIView should attach the RN touch handler to the stable detached children host",
);
assert(
  hostView.includes("NativeScriptViewHasGestureRecognizer(touchView, _detachedTouchHandler)") &&
    hostView.includes("NativeScriptGestureRecognizerAttachedView(_detachedTouchHandler)") &&
    hostView.includes("_detachedTouchHandlerWindow != touchView.window") &&
    hostView.includes("[self detachDetachedChildrenTouchHandler];"),
  "NativeScriptUIView should repair a stale detached RN touch handler after UIKit window transitions",
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
  hostView.includes("NativeScriptFindAncestorSurfaceTouchHandler") &&
    hostView.includes("NativeScriptFindAncestorSurfaceTouchHandler(touchView) != nil") &&
    hostView.includes("[self detachDetachedChildrenTouchHandler];"),
  "NativeScriptUIView should not install a duplicate detached touch handler below an ancestor RCTSurfaceTouchHandler",
);
assert(
  hostView.includes("UIView* detachView =") &&
    hostView.includes("NativeScriptGestureRecognizerAttachedView(_detachedTouchHandler)") &&
    hostView.includes("NativeScriptViewHasGestureRecognizer(detachView, _detachedTouchHandler)") &&
    hostView.includes("[_detachedTouchHandler detachFromView:detachView];"),
  "NativeScriptUIView should detach RCTSurfaceTouchHandler from its actual attached view, not a stale stored host view",
);
assert(
  hostView.includes("- (UIView*)hitTest:(CGPoint)point withEvent:(UIEvent*)event {\n  [self refreshDetachedChildrenHost];"),
  "NativeScriptUIView should refresh the detached RN touch host before first hit testing",
);
assert(
  !hostView.includes("NativeScriptFirstReactTaggedSubview"),
  "NativeScriptUIView should not attach RN touch handling to a route-dependent React descendant",
);

const fabricHostView = read("ios/Fabric/NativeScriptUIViewComponentView.mm");
assert(
  fabricHostView.includes("[_containerView refreshDetachedChildrenHost];"),
  "Fabric wrapper should refresh the detached RN touch host before first hit testing",
);
assert(
  fabricHostView.includes("- (void)didMoveToWindow") &&
    fabricHostView.includes("[_containerView refreshDetachedChildrenHost];"),
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

const moduleSource = read("ios/NativeScriptNativeApiModule.mm");
assert(
  moduleSource.includes("__nativeScriptRefreshUIKitHostView"),
  "worklet runtime install should expose the refresh host function",
);

console.log("uikit host refresh API tests passed");

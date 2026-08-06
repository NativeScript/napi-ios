const assert = require("assert");
const fs = require("fs");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(packageRoot, relativePath), "utf8");
}

const index = read("src/index.ts");
const declarations = read("src/index.ts");
const nativeComponent = read("src/NativeScriptUIViewNativeComponent.ts");
const hostHeader = read("ios/NativeScriptUIView.h");
const hostView = read("ios/NativeScriptUIView.mm");
const manager = read("ios/NativeScriptUIViewManager.mm");
const fabricView = read("ios/Fabric/NativeScriptUIViewComponentView.mm");

assert(
  index.includes("mountChildrenDirectlyToChildrenView?: boolean") &&
    index.includes('"mountChildrenDirectlyToChildrenView"') &&
    index.includes("props.mountChildrenDirectlyToChildrenView === true") &&
    declarations.includes("mountChildrenDirectlyToChildrenView?: boolean") &&
    nativeComponent.includes("mountChildrenDirectlyToChildrenView?: boolean") &&
    hostHeader.includes(
      "@property(nonatomic, assign) BOOL mountChildrenDirectlyToChildrenView",
    ) &&
    manager.includes(
      "RCT_EXPORT_VIEW_PROPERTY(mountChildrenDirectlyToChildrenView, BOOL)",
    ) &&
    fabricView.includes("oldViewProps->mountChildrenDirectlyToChildrenView") &&
    fabricView.includes(
      "_containerView.mountChildrenDirectlyToChildrenView = newMountChildrenDirectlyToChildrenView;",
    ) &&
    fabricView.includes(
      "_containerView.mountChildrenDirectlyToChildrenView = NO;",
    ),
  "NativeScriptUIView should expose a generic direct Fabric child mount mode for UIKit-owned component views",
);

assert(
  hostView.includes("NativeScriptLayoutHostedSubviewChain(_childrenView, _detachedTouchSentinel, 0);") &&
    hostView.includes("NativeScriptLayoutMetricsForFabricComponentView") &&
    hostView.includes("NativeScriptFabricLayoutFrameForView") &&
    hostView.includes("NativeScriptFabricLayoutSizeForView(parent, &parentLayoutSize)") &&
    hostView.includes("NativeScriptFabricLayoutSizeForView(child, &childLayoutSize)") &&
    hostView.includes("if (_layoutDirectChildrenToChildrenViewBounds) {\n      NativeScriptLayoutHostedSubviewChain(_childrenView, _detachedTouchSentinel, 0);") &&
    hostView.includes("if (_layoutDirectChildrenToChildrenViewBounds) {\n        NativeScriptLayoutHostedSubviewChain(_childrenView, _detachedTouchSentinel, 0);") &&
    hostView.includes(
      "if (_mountChildrenDirectlyToChildrenView) {\n    if (_layoutDirectChildrenToChildrenViewBounds) {",
    ) &&
    hostView.includes(
      "if (_mountChildrenDirectlyToChildrenView) {\n      if (_layoutDirectChildrenToChildrenViewBounds) {",
    ) &&
    hostView.includes(
      "if (_mountChildrenDirectlyToChildrenView) {\n    if (_layoutDirectChildrenToChildrenViewBounds) {\n      NativeScriptLayoutHostedSubviewChain(_childrenView, _detachedTouchSentinel, 0);\n    }\n    [self detachDetachedChildrenTouchHandler];\n    [self invalidateDetachedChildrenDisplayIfNeeded];",
    ) &&
    hostView.includes(
      "if (_childrenView == nil || _mountChildrenDirectlyToChildrenView) {\n    return NO;\n  }",
    ) &&
    !hostView.includes(
      "if (_mountChildrenDirectlyToChildrenView) {\n    [self layoutDetachedChildrenViewSubviewsIfNeeded];",
    ) &&
    !hostView.includes(
      "if (_mountChildrenDirectlyToChildrenView) {\n      [self layoutDetachedChildrenViewSubviewsIfNeeded];",
    ),
  "Direct child mount mode should mount Fabric children into the supplied UIKit view, avoid detached-host layout/touch-handler repair, and only run direct bounds/layout-metrics repair behind the explicit opt-in flag",
);

// The hosted fill is a presentation-only override of a box Yoga under-sized.
// Writing the filled frame back into Fabric's cached layout metrics used to
// make that override permanent: Fabric then believed the view was already laid
// out, never applied the real Yoga frame again, and any hosted element with its
// own width/height was pinned to the host's bounds forever. The fill must keep
// Fabric's cache reporting Yoga's truth.
assert(
  !hostView.includes("NativeScriptUpdateFabricLayoutMetricsFrameIfPossible") &&
    !hostView.includes(
      'NSSelectorFromString(@"updateLayoutMetrics:oldLayoutMetrics:")',
    ) &&
    !hostView.includes("nextLayoutMetrics.frame = RCTRectFromCGRect(frame);"),
  "The hosted subview fill must not write its filled frame back into Fabric's cached layout metrics, or the real Yoga frame is never applied again and self-sized hosted content is pinned to the host bounds",
);

// Only re-stretch children Yoga itself stretched flush to the parent's box. A
// child Yoga deliberately sized smaller than its parent is the author's layout
// and must survive the fill untouched.
assert(
  hostView.includes(
    "return fabs(childLayoutSize.width - parentLayoutSize.width) < 2 &&\n           fabs(childLayoutSize.height - parentLayoutSize.height) < 2;",
  ),
  "NativeScriptSubviewShouldFillParent should compare Yoga boxes on both axes when Yoga laid out both parent and child, so self-sized hosted content keeps its own size",
);

assert(
  hostView.includes("@interface NativeScriptDetachedChildrenLayoutObserver") &&
    hostView.includes('[_view addObserver:self forKeyPath:@"bounds" options:0 context:nil];') &&
    hostView.includes('[_view addObserver:self forKeyPath:@"frame" options:0 context:nil];') &&
    hostView.includes("[owner refreshDetachedChildrenHost];") &&
    hostView.includes("objc_setAssociatedObject(view, NativeScriptDetachedChildrenLayoutObserverKey, observer") &&
    hostView.includes("if (_mountChildrenDirectlyToChildrenView && _layoutDirectChildrenToChildrenViewBounds) {\n    NativeScriptLayoutHostedSubviewChain(_childrenView, _detachedTouchSentinel, 0);\n  }"),
  "Direct child bounds layout should refresh when externally-owned UIKit childrenView bounds/frame changes, matching upstream RNS native bounds-driven child layout",
);

assert(
  hostView.includes("- (void)setMountChildrenDirectlyToChildrenView:(BOOL)mountChildrenDirectlyToChildrenView") &&
    hostView.includes("_mountChildrenDirectlyToChildrenView = mountChildrenDirectlyToChildrenView;") &&
    hostView.includes("[self detachDetachedChildrenTouchHandler];") &&
    hostView.includes("[self invalidateDetachedChildrenLayoutSnapshot];") &&
    hostView.includes("[self invalidateDetachedChildrenDisplaySnapshot];") &&
    hostView.includes(
      "[self moveReactSubviewsToChildrenView];\n  [self refreshDetachedChildrenHost];",
    ),
  "Changing direct child mount mode should clear detached-host state and reparent already-mounted Fabric children before the next transaction",
);

assert(
  hostView.includes("static BOOL NativeScriptHostedOwnerViewPointInsideExcludingHost") &&
    hostView.includes("static UIView* NativeScriptHostedOwnerViewHitTestExcludingHost") &&
    hostView.includes("NativeScriptViewIsDescendantOfView(self, hostedView)") &&
    hostView.includes(
      "NativeScriptHostedOwnerViewHitTestExcludingHost(hostedView, self, hostedPoint, event, 0)",
    ) &&
    !hostView.includes(
      "NativeScriptViewIsDescendantOfView(self, hostedView)\n        ? [hostedView hitTest:hostedPoint withEvent:event]",
    ),
  "Direct child mount mode should hit-test owner-mounted Fabric children without recursively re-entering the NativeScript host component view",
);

console.log("uikit host direct children mount API tests passed");

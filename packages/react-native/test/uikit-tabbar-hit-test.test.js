const assert = require("assert");
const fs = require("fs");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(packageRoot, relativePath), "utf8");
}

for (const relativePath of [
  "ios/NativeScriptUIView.mm",
  "ios/Fabric/NativeScriptUIViewComponentView.mm",
]) {
  const source = read(relativePath);
  assert(
    source.includes("PointInsideTabBarHitArea"),
    `${relativePath} should gate tab bar passthrough on the tab bar hit area`,
  );
  assert(
    source.includes("VisibleControllerTabBarAtPoint") &&
      source.includes("window.rootViewController") &&
      source.includes("root isKindOfClass:UIWindow.class"),
    `${relativePath} should resolve window-level tab bar passthrough through UIKit controllers instead of scanning the full view tree`,
  );
  assert(
    source.includes("tabBar.userInteractionEnabled") &&
      source.includes("if (root == nil)") &&
      !source.includes("root.hidden || root.alpha <= 0.01 || !root.userInteractionEnabled") &&
      !source.includes("root.hidden || root.alpha <= 0.01"),
    `${relativePath} should validate tab bar interaction without pruning private UIKit ancestors`,
  );
  assert(
    source.includes("EffectiveTabBarHitBounds"),
    `${relativePath} should cap oversized tab bar visual bounds before hit testing`,
  );
  assert(
    source.includes("CGRectInset(bounds, -24, -16)"),
    `${relativePath} should allow a small expanded tab bar hit target`,
  );
  assert(
    source.includes("TabBarWindowHitFrame") &&
      source.includes("convertRect:tabBar.bounds toView:window") &&
      source.includes("TabBarWindowHitBounds") &&
      source.includes("CGPointMake(windowPoint.x - tabBar.frame.origin.x") &&
      source.includes("windowPoint.y - tabBar.frame.origin.y"),
    `${relativePath} should compare tab bar hit frames in window coordinates and keep the private-container fallback`,
  );
  assert(
    source.includes("tabBarHitView == tabBar") &&
      source.includes("fallbackHitView != nil && fallbackHitView != tabBar"),
    `${relativePath} should retry the private-container tab bar point when UIKit only hits the tab bar shell`,
  );
  assert(
    source.includes("const CGFloat topEdge = window != nil ? window.safeAreaInsets.top + 20 : 64") &&
      source.includes("const CGFloat maximumHeight = MAX(fittingSize.height + 32, 96)") &&
      source.includes("if (frame.size.height > maximumHeight)") &&
      source.includes("frame.origin.y = CGRectGetMaxY(frame) - maximumHeight") &&
      source.includes("if (CGRectGetMinY(frame) <= topEdge)") &&
      source.includes("frame.size.height += 16") &&
      source.includes("frame.size.height += 32"),
    `${relativePath} should clamp stale tab bar window hit frames before expanding them over content`,
  );
  assert(
    source.indexOf("if (!CGRectContainsPoint(frameHitBounds, windowPoint))") >
      source.indexOf("CGRect frameHitBounds = ") &&
      source.indexOf("if (!CGRectContainsPoint(frameHitBounds, windowPoint))") <
        source.indexOf("CGPoint localPoint = [tabBar convertPoint:windowPoint fromView:window]"),
    `${relativePath} should reject points outside the tab bar window frame before trusting converted tab bar coordinates`,
  );
  assert(
    !source.includes("VisibleHitViewAtPoint"),
    `${relativePath} should not use recursive tab bar descendants as the passthrough hit area`,
  );
}

const hostHeader = read("ios/NativeScriptUIView.h");
const hostView = read("ios/NativeScriptUIView.mm");
const fabricView = read("ios/Fabric/NativeScriptUIViewComponentView.mm");

assert(
  hostHeader.includes("- (BOOL)hostedContentPointInside:(CGPoint)point withEvent:(UIEvent*)event"),
  "NativeScriptUIView should expose a generic hosted-content pointInside helper to the Fabric wrapper",
);
assert(
  hostHeader.includes("- (UIView*)hostedContentHitTest:(CGPoint)point withEvent:(UIEvent*)event"),
  "NativeScriptUIView should expose a generic hosted-content hitTest helper to the Fabric wrapper",
);
assert(
  hostView.includes("- (BOOL)hostedContentPointInside:(CGPoint)point withEvent:(UIEvent*)event") &&
    hostView.includes("[hostedView pointInside:hostedPoint withEvent:event]") &&
    hostView.includes("NativeScriptVisibleTabBarAtPoint") &&
    hostView.includes("- (BOOL)pointInside:(CGPoint)point withEvent:(UIEvent*)event"),
  "NativeScriptUIView should allow hosted UIKit content to receive touches outside the wrapper bounds",
);
assert(
  hostView.includes("NativeScriptHitTestTabBarAtPoint(hostedView, self.window, windowPoint, event)") &&
    hostView.indexOf("NativeScriptHitTestTabBarAtPoint(hostedView, self.window, windowPoint, event)") <
      hostView.indexOf("UIView* hitView = [super hitTest:point withEvent:event]"),
  "NativeScriptUIView should prefer owned UIKit tab bar hits before hosted RN content",
);
assert(
  fabricView.includes("- (BOOL)pointInside:(CGPoint)point withEvent:(UIEvent*)event") &&
    fabricView.includes("[_containerView hostedContentPointInside:containerPoint withEvent:event]") &&
    fabricView.includes("NativeScriptFabricVisibleTabBarAtPoint"),
  "NativeScriptUIViewComponentView should ask hosted content before rejecting out-of-bounds UIKit touches",
);
assert(
  fabricView.includes("[_containerView hostedContentHitTest:containerPoint withEvent:event]") &&
    fabricView.indexOf("[_containerView hostedContentHitTest:containerPoint withEvent:event]") <
      fabricView.indexOf("UIView* hitView = [super hitTest:point withEvent:event]"),
  "NativeScriptUIViewComponentView should ask hosted UIKit content for high-priority hits before Fabric consumes touches",
);
assert(
  fabricView.includes("NativeScriptFabricHitTestTabBarAtPoint(self.window, self.window, windowPoint, event)") &&
    fabricView.indexOf("NativeScriptFabricHitTestTabBarAtPoint(self.window, self.window, windowPoint, event)") <
      fabricView.indexOf("[_containerView hostedContentHitTest:containerPoint withEvent:event]"),
  "NativeScriptUIViewComponentView should let visible UIKit tab bars beat full-height RN screen content",
);

console.log("uikit tab bar hit-test tests passed");

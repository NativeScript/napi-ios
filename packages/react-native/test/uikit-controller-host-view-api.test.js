const assert = require("assert");
const fs = require("fs");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(packageRoot, relativePath), "utf8");
}

const index = read("src/index.ts");
assert(
  index.includes("hostView?: (controller: Controller) => unknown"),
  "defineUIViewController should expose a generic hostView resolver",
);
assert(
  index.includes("hostView: definition.hostView?.(controller) ?? controllerRecord.view"),
  "defineUIViewController should use the resolved host view before falling back to controller.view",
);

const declarations = read("src/index.ts");
assert(
  declarations.includes("hostView?: (controller: Controller) => unknown"),
  "public declarations should expose UIViewControllerDefinition.hostView",
);
assert(
  index.includes("detachControllerFromParent?: boolean") &&
    index.includes("attachControllerToParent?: boolean") &&
    index.includes("pinNativeViewToHost?: boolean") &&
    declarations.includes("detachControllerFromParent?: boolean") &&
    declarations.includes("attachControllerToParent?: boolean") &&
    declarations.includes("pinNativeViewToHost?: boolean") &&
    read("src/NativeScriptUIViewNativeComponent.ts").includes(
      "detachControllerFromParent?: boolean",
    ) &&
    read("src/NativeScriptUIViewNativeComponent.ts").includes(
      "attachControllerToParent?: boolean",
    ) &&
    read("src/NativeScriptUIViewNativeComponent.ts").includes(
      "pinNativeViewToHost?: boolean",
    ),
  "defineUIKitHost should expose generic controller-parent and hosted-view layout controls",
);
assert(
    index.includes("invokeObjCSelector,") &&
    index.includes("function tryNativeHandleForNSObject") &&
    index.includes("return false;") &&
    index.includes("const handle = tryNativeHandleForNSObject(arg);") &&
    index.includes("function encodeObjCSelectorArgument") &&
    index.includes("Array.isArray(arg)") &&
    index.includes('const object = nativeObjectFromHandle<ReturnValue>(result);') &&
    index.includes("return object ?? (result as ReturnValue);") &&
    index.includes("export function invokeObjCSelector<ReturnValue = unknown>") &&
    index.includes(".__nativeScriptInvokeObjCSelector") &&
    declarations.includes("export type ObjCSelectorArgument") &&
    declarations.includes("invokeObjCSelector<ReturnValue = unknown>") &&
    !index.includes("attachViewControllerToNearestParent") &&
    !index.includes("nearestViewController"),
  "NativeScript default export should include generic ObjC selector invocation (nearest-parent attachment + nearestViewController removed as unused surface)",
);

const nativeApiModule = read("ios/NativeScriptNativeApiModule.mm");
assert(
  nativeApiModule.includes("__nativeScriptInvokeObjCSelector") &&
    nativeApiModule.includes("nativeScriptInvokeObjCSelectorFromHandles") &&
    nativeApiModule.includes("[target respondsToSelector:selector]") &&
    nativeApiModule.includes("NSInvocation* invocation") &&
    nativeApiModule.includes("nativeScriptSetInvocationArgument") &&
    nativeApiModule.includes("object.isArray(runtime)") &&
    nativeApiModule.includes("NSMutableArray<id>* result") &&
    nativeApiModule.includes("nativeScriptJSIValueFromInvocationReturn"),
  "NativeScript worklet runtime should expose a synchronous ObjC selector primitive for UIKit wrappers",
);

assert(
  nativeApiModule.includes("case 'Q':") &&
    nativeApiModule.includes("number.unsignedLongLongValue") &&
    nativeApiModule.includes("if (code == 'Q')") &&
    nativeApiModule.includes("static_cast<double>(longLongValue)") &&
    nativeApiModule.includes("case 'L':") &&
    nativeApiModule.includes("if (code == 'L')"),
  "NativeScript worklet selector invocation should preserve unsigned ObjC integer arguments and return values",
);

const nativeHost = read("ios/NativeScriptUIView.mm");
assert(
  !nativeHost.includes("hostMountRetry") &&
    !nativeHost.includes("retryHostId"),
  "NativeScriptUIView should not retry host mounting; React registers UI host factories synchronously before Fabric commits",
);
assert(
  index.includes("attachNativeView?: boolean") &&
    declarations.includes("attachNativeView?: boolean") &&
    read("src/NativeScriptUIViewNativeComponent.ts").includes(
      "attachNativeView?: boolean",
    ) &&
    read("ios/NativeScriptUIView.h").includes(
      "@property(nonatomic, assign) BOOL attachNativeView",
    ) &&
    nativeHost.includes("_attachNativeView = NO;") &&
    nativeHost.includes("- (void)setAttachNativeView:(BOOL)attachNativeView") &&
    nativeHost.includes("[self clearNativeViewAttachmentIfOwnedByHost];") &&
    nativeHost.includes("if (_attachNativeView && _nativeViewHandle.length == 0)") &&
    index.includes("attachNativeView,") &&
    read("ios/NativeScriptUIViewManager.mm").includes(
      "RCT_EXPORT_VIEW_PROPERTY(attachNativeView, BOOL)",
    ) &&
    read("ios/Fabric/NativeScriptUIViewComponentView.mm").includes(
      "oldViewProps->attachNativeView",
    ) &&
    read("ios/Fabric/NativeScriptUIViewComponentView.mm").includes(
      "_containerView.attachNativeView = newAttachNativeView",
    ) &&
    read("ios/Fabric/NativeScriptUIViewComponentView.mm").includes(
      "_containerView.attachNativeView = NO",
    ),
  "NativeScriptUIView should make attachNativeView a real Fabric/Paper prop so externally owned controller views are not hosted by the wrapper",
);
assert(
  nativeHost.includes("if (_attachNativeView && _nativeViewHandle.length == 0) {\n      [self setNativeView:_viewController.view];"),
  "NativeScriptUIView should not overwrite an explicit native host view or an attachNativeView=false host with controller.view",
);
assert(
  nativeHost.includes("[self attachViewControllerIfPossible];"),
  "NativeScriptUIView should still attach the controller for lifecycle when a custom host view is used",
);
assert(
  nativeHost.includes("const BOOL nativeViewIsDetachedControllerView =") &&
    nativeHost.includes("const BOOL nextNativeViewIsDetachedControllerView =") &&
    nativeHost.includes(
      "_detachControllerView && _viewController != nil && nativeView == _viewController.view",
    ) &&
    !nativeHost.includes(
      "if (_detachControllerView && _viewController != nil && nativeView == _viewController.view) {\n    nativeView = nil;",
    ) &&
    nativeHost.includes("const BOOL nextNativeViewIsExternallyWindowOwned =") &&
    nativeHost.includes(
      "nextNativeViewIsDetachedControllerView && nativeView.superview != nil",
    ) &&
    nativeHost.includes("nativeView.superview != self && nativeView.window != nil") &&
    nativeHost.includes(
      "if (nextNativeViewIsExternallyWindowOwned) {\n    [self moveReactSubviewsToChildrenView];",
    ) &&
    nativeHost.includes(
      "[self moveReactSubviewsToChildrenView];\n    [self refreshDetachedChildrenHost];",
    ) &&
    nativeHost.includes(
      "[self refreshDetachedChildrenHost];\n    [_nativeView setNeedsDisplay];",
    ) &&
    nativeHost.includes(
      "_detachControllerView && nextController != nil && nextNativeView == nextController.view",
    ) &&
    nativeHost.includes("const BOOL mustClearDetachedControllerView =") &&
    nativeHost.includes(
      "_detachControllerView && _viewController != nil && _nativeView == _viewController.view",
    ),
  "NativeScriptUIView should detect controller-owned detached views before moving them through the host wrapper",
);
const applyHandlesStart = nativeHost.indexOf(
  "- (void)applyUIKitHostHandles:(NSDictionary<NSString*, NSString*>*)handles",
);
const applyHandlesSource = nativeHost.slice(
  applyHandlesStart,
  nativeHost.indexOf("- (void)mountUIKitHostIfNeeded", applyHandlesStart),
);
const detachedBranchStart = applyHandlesSource.indexOf(
  "if (nativeViewIsDetachedControllerView)",
);
const detachedBranchSource = applyHandlesSource.slice(
  detachedBranchStart,
  applyHandlesSource.indexOf("} else {", detachedBranchStart),
);
assert(
  detachedBranchSource.indexOf("self.controllerHandle = controllerHandle;") >= 0 &&
    detachedBranchSource.indexOf("self.childrenViewHandle = childrenViewHandle;") >
      detachedBranchSource.indexOf("self.controllerHandle = controllerHandle;") &&
    detachedBranchSource.indexOf("self.nativeViewHandle = nativeViewHandle;") >
      detachedBranchSource.indexOf("self.childrenViewHandle = childrenViewHandle;"),
  "NativeScriptUIView should apply detached controller-view hosts as controller, children, then native handle so the controller view is never transiently hosted",
);
assert(
  nativeHost.includes("_attachControllerToParent = NO;") &&
    nativeHost.includes(
      "- (void)setAttachControllerToParent:(BOOL)attachControllerToParent",
    ) &&
    nativeHost.includes("[self detachViewControllerIfOwnedByHost];") &&
    nativeHost.includes("if (!_attachControllerToParent || _detachControllerFromParent"),
  "NativeScriptUIView should wait for explicit controller-parent attachment props before owning parent containment",
);
assert(
 nativeHost.includes("- (void)setPinNativeViewToHost:(BOOL)pinNativeViewToHost") &&
    nativeHost.includes("const BOOL nativeViewIsOwnedByHost = _nativeView.superview == self;") &&
    nativeHost.includes("if (!nativeViewIsOwnedByHost) {\n    [self deactivateNativeViewHostConstraints];\n    return;\n  }") &&
    nativeHost.includes("[_nativeView.topAnchor constraintEqualToAnchor:self.topAnchor]") &&
    nativeHost.includes("[_nativeView.bottomAnchor constraintEqualToAnchor:self.bottomAnchor]") &&
    nativeHost.includes("BOOL hasInactiveConstraint = NO;") &&
    nativeHost.includes("if (!constraint.active)") &&
    nativeHost.includes("if (hasInactiveConstraint) {\n      [NSLayoutConstraint activateConstraints:_nativeViewHostConstraints];\n    }") &&
    nativeHost.includes("[NSLayoutConstraint activateConstraints:_nativeViewHostConstraints]") &&
    nativeHost.includes("const BOOL ownsNativeViewAsSubview = _nativeView != nil && _nativeView.superview == self;") &&
    nativeHost.includes("const BOOL didResizeNativeView =\n      ownsNativeViewAsSubview && !_pinNativeViewToHost &&") &&
    nativeHost.includes("!CGRectEqualToRect(_nativeView.frame, self.bounds);"),
  "NativeScriptUIView should optionally pin only host-owned UIKit views with constraints instead of frame/autoresizing layout",
);
assert(
  nativeHost.includes("hostedViewToReinsert = [_nativeView retain];") &&
    nativeHost.includes("hostedViewIndex = [self.subviews indexOfObject:hostedViewToReinsert];") &&
    nativeHost.includes("[self deactivateNativeViewHostConstraints];\n    [hostedViewToReinsert removeFromSuperview];"),
  "NativeScriptUIView should rebuild pinned constraints after temporarily removing a hosted controller view for UIKit containment",
);
assert(
  nativeHost.includes("- (void)layoutHostedViewControllerViewIfNeeded") &&
    nativeHost.includes("[_nativeView setNeedsLayout];\n  [_nativeView layoutIfNeeded];") &&
    nativeHost.includes("[self layoutHostedViewControllerViewIfNeeded];\n  [_viewController didMoveToParentViewController:parent];") &&
    nativeHost.includes("[_viewController didMoveToParentViewController:parent];\n  [self layoutHostedViewControllerViewIfNeeded];") &&
    nativeHost.includes(
      "- (void)setPinNativeViewToHost:(BOOL)pinNativeViewToHost"
    ) &&
    nativeHost.includes(
      "_pinNativeViewToHost = pinNativeViewToHost;\n  [self applyNativeViewLayoutMode];\n  [self layoutHostedViewControllerViewIfNeeded];"
    ) &&
    nativeHost.includes("if (_pinNativeViewToHost || didResizeNativeView) {\n    [self layoutHostedViewControllerViewIfNeeded];") &&
    nativeHost.includes("[self layoutHostedViewControllerViewIfNeeded];\n  [self setNeedsLayout];"),
  "NativeScriptUIView should synchronously lay out controller-owned hosted views after containment, pinning, and size changes",
);
const setViewControllerStart = nativeHost.indexOf(
  "- (void)setViewController:(UIViewController*)viewController",
);
const setViewControllerSource = nativeHost.slice(
  setViewControllerStart,
  nativeHost.indexOf(
    "- (void)attachViewControllerIfPossible",
    setViewControllerStart,
  ),
);
assert(
  setViewControllerSource.includes("[self setNeedsLayout];") &&
    !setViewControllerSource.includes("[self attachViewControllerIfPossible];") &&
    setViewControllerSource.includes("if (_detachControllerFromParent) {\n    [self detachViewController];"),
  "NativeScriptUIView should defer first controller attachment until host detach props are applied and detach pre-parented controllers when requested",
);
assert(
  nativeHost.includes("view.window.rootViewController") &&
    nativeHost.includes("NativeScriptTopMostViewControllerForWindow") &&
    nativeHost.includes("controller.presentedViewController"),
  "NativeScriptUIView should fall back to the window root/top-presented controller when the responder chain has no parent controller",
);
assert(
  nativeHost.includes("NativeScriptControllerHierarchyContainsController") &&
    nativeHost.includes("UINavigationController.class") &&
    nativeHost.includes("UITabBarController.class") &&
    nativeHost.includes("UISplitViewController.class"),
  "NativeScriptUIView should be able to prove UIKit containment through common controller containers",
);
assert(
  nativeHost.includes(
    "NativeScriptNearestViewController(UIView* view, UIViewController* excludedController)",
  ) &&
    nativeHost.includes("#import <React/UIView+React.h>") &&
    nativeHost.includes("NativeScriptReactViewControllerForView") &&
    nativeHost.includes("view.reactViewController") &&
    nativeHost.includes("NativeScriptReactSuperviewForView") &&
    nativeHost.includes("view.reactSuperview ?: view.superview") &&
    nativeHost.includes("NativeScriptClosestReactViewControllerForView") &&
    nativeHost.includes("NativeScriptNearestViewControllerForView") &&
    nativeHost.includes(
      "UIViewController* controller = NativeScriptClosestReactViewControllerForView(view, nil);",
    ) &&
    nativeHost.includes(
      "controller = NativeScriptNearestViewController(view, nil);",
    ) &&
    nativeHost.includes(
      "UIViewController* parent = NativeScriptClosestReactViewControllerForView(view, controller);",
    ) &&
    nativeHost.includes(
      "parent = NativeScriptNearestResponderViewController(view, controller);",
    ) &&
    nativeHost.includes("responder != excludedController") &&
    nativeHost.includes(
      "NativeScriptNearestViewController(self, _viewController)",
    ),
  "NativeScriptUIView should mirror RN reactViewController/reactSuperview lookup before responder fallback and skip the hosted controller itself when searching for a UIKit parent",
);
assert(
  nativeHost.includes("NativeScriptHostedViewOwnerKey") &&
    nativeHost.includes("NativeScriptSetHostedViewOwner(_nativeView, self)") &&
    nativeHost.includes("NativeScriptRefreshUIKitHostOwnersInAncestorChain(view)") &&
    nativeHost.includes("[owner attachViewControllerIfPossible]"),
  "refreshUIKitHostView should refresh the owning host and retry controller containment from hosted UIKit descendants",
);
assert(
  nativeHost.includes("_detachControllerFromParent || _detachControllerView") &&
    nativeHost.includes("_viewController.presentingViewController != nil") &&
    nativeHost.includes("_viewController.isBeingPresented") &&
    nativeHost.includes("_viewController.isBeingDismissed") &&
    !nativeHost.includes("_viewController.presentationController != nil"),
  "NativeScriptUIView should skip parent attachment for externally owned or actively presented controllers without treating a precreated presentationController as presented",
);
assert(
  !nativeHost.includes("_viewController.parentViewController != nil ||") &&
    nativeHost.includes("_viewController.parentViewController == parent") &&
    nativeHost.includes("NativeScriptControllerHierarchyContainsController(rootController, _viewController)") &&
    nativeHost.includes(
      "rootController == nil ||\n       NativeScriptControllerHierarchyContainsController(rootController, _viewController)",
    ) &&
    nativeHost.includes("[self detachViewControllerIfOwnedByHost];\n    if (_viewController.parentViewController != nil)") &&
    nativeHost.includes("[parent addChildViewController:_viewController]"),
  "NativeScriptUIView should reparent hosted controllers when the current parent is detached from the window root",
);
assert(
  nativeHost.includes("UIViewController* _attachedViewControllerParent;") &&
    nativeHost.includes("_attachedViewControllerParent = parent;") &&
    nativeHost.includes("- (void)detachViewControllerIfOwnedByHost") &&
    nativeHost.includes("_viewController.parentViewController != _attachedViewControllerParent") &&
    nativeHost.includes("if (_attachedViewControllerParent == nil ||\n        _viewController.parentViewController != _attachedViewControllerParent) {\n      return;\n    }"),
  "NativeScriptUIView should track and detach only controller parents it attached itself",
);
const detachControllerFromParentStart = nativeHost.indexOf(
  "- (void)setDetachControllerFromParent:(BOOL)detachControllerFromParent",
);
const detachControllerFromParentSource = nativeHost.slice(
  detachControllerFromParentStart,
  nativeHost.indexOf("- (void)setDebugName:", detachControllerFromParentStart),
);
assert(
  detachControllerFromParentSource.includes(
    "[self detachViewController];",
  ) && detachControllerFromParentSource.includes("_attachedViewControllerParent = nil;"),
  "detachControllerFromParent should generically detach the controller from any current parent",
);
assert(
  read("ios/NativeScriptUIViewManager.mm").includes(
    "RCT_EXPORT_VIEW_PROPERTY(detachControllerFromParent, BOOL)",
  ) &&
	  read("ios/NativeScriptUIViewManager.mm").includes(
	    "RCT_EXPORT_VIEW_PROPERTY(attachControllerToParent, BOOL)",
	  ) &&
    read("ios/NativeScriptUIViewManager.mm").includes(
      "RCT_EXPORT_VIEW_PROPERTY(attachNativeView, BOOL)",
    ) &&
    read("ios/NativeScriptUIViewManager.mm").includes(
      "RCT_EXPORT_VIEW_PROPERTY(pinNativeViewToHost, BOOL)",
    ) &&
    read("ios/Fabric/NativeScriptUIViewComponentView.mm").includes(
      "_containerView.detachControllerFromParent = newDetachControllerFromParent",
    ) &&
	    read("ios/Fabric/NativeScriptUIViewComponentView.mm").includes(
	      "_containerView.attachControllerToParent = newAttachControllerToParent",
	    ) &&
    read("ios/Fabric/NativeScriptUIViewComponentView.mm").includes(
      "_containerView.attachNativeView = newAttachNativeView",
    ) &&
    read("ios/Fabric/NativeScriptUIViewComponentView.mm").includes(
      "_containerView.attachControllerToParent = NO",
    ) &&
    read("ios/Fabric/NativeScriptUIViewComponentView.mm").includes(
      "_containerView.pinNativeViewToHost = newPinNativeViewToHost",
    ) &&
    read("ios/Fabric/NativeScriptUIViewComponentView.mm").includes(
      "_containerView.pinNativeViewToHost = NO",
    ),
  "NativeScriptUIView should wire controller-parent ownership and hosted-view layout controls through Paper and Fabric",
);

console.log("uikit controller host-view API tests passed");

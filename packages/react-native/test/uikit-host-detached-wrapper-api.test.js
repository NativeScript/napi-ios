const assert = require("assert");
const fs = require("fs");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(packageRoot, relativePath), "utf8");
}

const hostHeader = read("ios/NativeScriptUIView.h");
const hostView = read("ios/NativeScriptUIView.mm");
const fabricView = read("ios/Fabric/NativeScriptUIViewComponentView.mm");
const index = read("src/index.ts");
const declarations = read("src/index.ts");
const nativeComponent = read("src/NativeScriptUIViewNativeComponent.ts");
const manager = read("ios/NativeScriptUIViewManager.mm");

assert(
  hostHeader.includes("- (BOOL)shouldHideEmptyFabricHostWrapper"),
  "NativeScriptUIView should expose whether its empty Fabric wrapper must be touch-transparent",
);
assert(
  hostView.includes("- (BOOL)hostedViewIsDetachedFromHostWrapper:(UIView*)hostedView") &&
    hostView.includes("!NativeScriptViewIsDescendantOfView(hostedView, self)") &&
    hostView.includes("hostedView.window == nil") &&
    hostView.includes("hostedView.hidden || hostedView.alpha <= 0.01"),
  "NativeScriptUIView should recognize real hosted UIKit content that moved outside the Fabric wrapper",
);
assert(
  hostView.includes("static UIView* NativeScriptHitTestVisibleDescendantOutsideBounds") &&
    hostView.includes("depth > 16") &&
    hostView.includes("[subviews reverseObjectEnumerator]") &&
    hostView.includes("[subview hitTest:subviewPoint withEvent:event]") &&
    hostView.includes(
      "NativeScriptHitTestVisibleDescendantOutsideBounds(subview, subviewPoint, event, depth + 1)",
    ) &&
    hostView.includes(
      "NativeScriptHitTestVisibleDescendantOutsideBounds(hostedView, hostedPoint, event, 0)",
    ),
  "NativeScriptUIView should hit-test visible hosted descendants even when an internal carrier view has zero bounds",
);
assert(
  hostView.includes("const BOOL subviewIsHostPlumbing = NativeScriptViewIsHostHitTestPlumbing(subview);") &&
    hostView.includes("if ((!subviewIsHostPlumbing && [subview pointInside:subviewPoint withEvent:event])") &&
    hostView.includes("if (!subviewIsHostPlumbing) {\n      hitView = [subview hitTest:subviewPoint withEvent:event];") &&
    hostView.includes(
      "NativeScriptHostedOwnerViewHitTestExcludingHost(subview, hostView, subviewPoint, event, depth + 1)",
    ),
  "NativeScriptUIView should traverse NativeScript host plumbing directly instead of re-entering host hitTest while searching detached descendants",
);
assert(
  hostView.includes("- (BOOL)hasVisibleSubviewMountedInHostWrapper") &&
    hostView.includes("subview == _detachedTouchSentinel") &&
    hostView.includes("subview.hidden || subview.alpha <= 0.01"),
  "NativeScriptUIView should only hide wrappers that have no visible mounted content of their own",
);
assert(
  hostView.includes("- (BOOL)shouldHideEmptyFabricHostWrapper") &&
    hostView.includes("[self hostedViewIsDetachedFromHostWrapper:_nativeView]") &&
    hostView.includes("_childrenView != _nativeView") &&
    hostView.includes(
      "if ([self hasVisibleSubviewMountedInHostWrapper]) {\n    return NO;\n  }",
    ) &&
    hostView.includes(
      "_externalDetachedChildrenOwner && (_nativeView != nil || _childrenView != nil)",
    ) &&
    hostView.includes(
      "return hasDetachedHostedContent || hasExternalDetachedChildrenOwner;",
    ),
  "NativeScriptUIView should make empty detached or externally-owned Fabric wrappers touch-transparent without hiding locally mounted visible children",
);
assert(
  hostView.includes(
    "if ([super pointInside:point withEvent:event] && ![self shouldHideEmptyFabricHostWrapper])",
  ) &&
    hostView.includes(
      "if (hitView == self &&\n      ([self shouldHideEmptyFabricHostWrapper] || NativeScriptViewIsHostHitTestPlumbing(self)))",
    ),
  "NativeScriptUIView should keep empty detached wrappers transparent to generic UIView hit testing",
);
assert(
  fabricView.includes("static BOOL NativeScriptFabricViewIsHostHitTestPlumbing(UIView* view)") &&
    fabricView.includes('[className isEqualToString:@"NativeScriptUIViewComponentView"]'),
  "NativeScriptUIViewComponentView should classify inert host wrappers as touch-transparent plumbing",
);
assert(
  fabricView.includes("- (BOOL)pointInside:(CGPoint)point withEvent:(UIEvent*)event") &&
    fabricView.includes(
      "superResult && ![_containerView shouldHideEmptyFabricHostWrapper]",
    ) &&
    fabricView.includes(
      "if (hitView == self &&\n      ([_containerView shouldHideEmptyFabricHostWrapper] ||\n       NativeScriptFabricViewIsHostHitTestPlumbing(self)))",
    ) &&
    !fabricView.includes("if (self.hidden) {\n    return NO;\n  }") &&
    !fabricView.includes("if (self.hidden) {\n    return nil;\n  }"),
  "NativeScriptUIViewComponentView should stay visible for UIKit traversal while keeping empty wrappers touch-transparent",
);
assert(
  fabricView.includes("self.hidden = NO;") &&
    fabricView.includes(
      "const BOOL externallyOwned = _containerView.externalDetachedChildrenOwner;",
    ) &&
    fabricView.includes("self.accessibilityElementsHidden = externallyOwned;") &&
    fabricView.includes(
      "_containerView.accessibilityElementsHidden = externallyOwned;",
    ) &&
    hostView.includes("NativeScriptViewHasHiddenUIKitAncestor(self)"),
  "NativeScriptUIViewComponentView should hide externally owned Fabric wrappers from UIKit accessibility without exposing hidden staging owners",
);
assert(
  hostView.includes("- (NSArray*)accessibilityElements") &&
    hostView.includes("return [super accessibilityElements];") &&
    !hostView.includes("[elements addObject:hostedView]"),
  "NativeScriptUIView should not re-export detached hosted UIKit views through the Fabric shell accessibility tree",
);
assert(
  index.includes("externalDetachedChildrenOwner?: boolean") &&
    index.includes('"externalDetachedChildrenOwner"') &&
    index.includes("props.externalDetachedChildrenOwner === true") &&
    declarations.includes("externalDetachedChildrenOwner?: boolean") &&
    nativeComponent.includes("externalDetachedChildrenOwner?: boolean") &&
    hostHeader.includes(
      "@property(nonatomic, assign) BOOL externalDetachedChildrenOwner",
    ) &&
    manager.includes(
      "RCT_EXPORT_VIEW_PROPERTY(externalDetachedChildrenOwner, BOOL)",
    ) &&
    fabricView.includes("oldViewProps->externalDetachedChildrenOwner") &&
    fabricView.includes(
      "_containerView.externalDetachedChildrenOwner = newExternalDetachedChildrenOwner;",
    ) &&
    fabricView.includes("_containerView.externalDetachedChildrenOwner = NO;"),
  "NativeScriptUIView should expose a generic mode for detached children owned by an external UIKit container",
);
assert(
  hostView.includes("if (_externalDetachedChildrenOwner) {\n    return NO;\n  }") &&
    hostView.includes("if (_externalDetachedChildrenOwner) {\n    return hitView;\n  }") &&
    hostView.includes("return [super accessibilityElements];"),
  "NativeScriptUIView should not route hit-testing or shell accessibility through externally owned detached children",
);
assert(
  fabricView.includes(
    "if (_containerView.externalDetachedChildrenOwner) {\n    return NO;\n  }",
  ) &&
    fabricView.includes(
      "if (_containerView.externalDetachedChildrenOwner) {\n    return nil;\n  }",
    ),
  "NativeScriptUIViewComponentView should make externally owned Fabric wrappers touch-inert so UIKit's real owner receives the event",
);
assert(
  index.includes("        nativeViewHandle,\n") &&
    !index.includes("nativeViewHandle: attachNativeView"),
  "defineUIKitHost should pass the host view handle even when attachNativeView=false so Fabric lifecycle events identify externally owned UIKit roots without attaching them",
);
assert(
  hostView.includes(
    "if (!_attachNativeView) {\n    [self clearNativeViewAttachmentIfOwnedByHost];\n    [self notifyHostReadyIfNeeded];\n    return;\n  }",
  ) &&
    hostView.includes(
      "else if (!_attachNativeView && nativeViewHandle.length > 0)",
    ) &&
    hostView.includes("_nativeViewHandle = [nativeViewHandle copy];"),
  "NativeScriptUIView should store nativeViewHandle as identity-only when attachNativeView=false",
);

console.log("uikit detached wrapper tests passed");

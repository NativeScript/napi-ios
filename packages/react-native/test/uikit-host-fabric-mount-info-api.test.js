const assert = require("assert");
const fs = require("fs");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(packageRoot, relativePath), "utf8");
}

const index = read("src/index.ts");
const declarations = read("src/index.ts");
const hostHeader = read("ios/NativeScriptUIKitHost.h");
const hostViewHeader = read("ios/NativeScriptUIView.h");
const hostView = read("ios/NativeScriptUIView.mm");
const fabricHostView = read("ios/Fabric/NativeScriptUIViewComponentView.mm");
const nativeApiModule = read("ios/NativeScriptNativeApiModule.mm");

assert(
  index.includes("export type UIKitNativeMountInfo") &&
    declarations.includes("export type UIKitNativeMountInfo") &&
    index.includes("readonly fabricComponentView: unknown | null") &&
    declarations.includes("readonly fabricComponentView: unknown | null") &&
    index.includes("requiresNativeMountInfo?: boolean") &&
    declarations.includes("requiresNativeMountInfo?: boolean") &&
    index.includes("readonly fabricComponentViewHandle: string") &&
    index.includes("readonly fabricContainerView: unknown | null") &&
    index.includes("readonly fabricContainerViewHandle: string"),
  "UIKit host context should expose generic Fabric mount handles to UI worklets",
);

assert(
  index.includes("parseUIKitNativeMountInfoJson") &&
    index.includes('"fabricComponentViewHandle"') &&
    index.includes('"fabricContainerViewHandle"') &&
    index.includes("syncUIKitNativeMountInfo(") &&
    index.includes("pending.nativeMountInfoRef.current = nativeMountInfo") &&
    index.includes("function nativeObjectFromStringHandle") &&
    index.indexOf("function nativeObjectFromStringHandle") <
      index.indexOf("function parseUIKitNativeMountInfoJson") &&
	    index.includes("pending.requiresNativeMountInfo === true") &&
	    index.includes("pending.nativeMountInfoRef.current == null") &&
    index.includes(
      "const pending = pendingUIKitHostRegistry().get(hostId);",
    ) &&
    index.includes(
      "pending?.requiresNativeMountInfo === true &&\n    pending.nativeMountInfoRef.current == null",
    ) &&
	    index.includes("host?.context.setNativeMountInfo(nativeMountInfo)") &&
    index.includes("setNativeMountInfo(info)") &&
    index.includes("nativeMountInfoRef.current = info"),
  "UIKit host creation should preserve native Fabric mount info before create() runs and defer opted-in hosts until it exists",
);

assert(
  index.includes(
    "shouldRunMountedOrNativeMountInfo: boolean | string = false",
  ) &&
    index.includes("typeof shouldRunMountedOrNativeMountInfo === \"string\"") &&
    index.includes("parseUIKitNativeMountInfoJson(nativeMountInfoJson)") &&
    index.includes("createRegisteredUIKitHostFromNative") &&
    index.includes(
      "const handles = createRegisteredUIKitHostFromNative(\n    hostId,\n    undefined,\n    false,\n    nativeMountInfoJson,\n  );",
    ),
  "Native-created UIKit hosts should preserve Fabric mount info through both create and lifecycle-created host paths without breaking existing mounted calls",
);

assert(
    hostHeader.includes("NativeScriptCreateUIKitHostWithInfo") &&
    hostViewHeader.includes("@property(nonatomic, assign) UIView* fabricComponentView") &&
    nativeApiModule.includes("NSString* nativeMountInfoJson") &&
    nativeApiModule.includes("nativeMountInfoJsonString") &&
    nativeApiModule.includes(
      "function.call(runtime, hostIdValue, propsJsonValue,\n                                         nativeMountInfoJsonValue)",
    ) &&
    nativeApiModule.includes(
      "function.call(runtime, hostIdValue, phaseValue, propsJsonValue,\n                                       transactionJsonValue, nativeMountInfoJsonValue)",
    ) &&
    hostView.includes("- (NSString*)nativeMountInfoJson") &&
    hostView.includes("UIView* componentView = _fabricComponentView ?: self.superview;") &&
    hostView.includes("fabricComponentViewHandle") &&
    hostView.includes("fabricContainerViewHandle") &&
    fabricHostView.includes("_containerView.fabricComponentView = self;") &&
    hostView.includes("NativeScriptCreateUIKitHostWithInfo"),
  "NativeScriptUIView should pass its Fabric component/container handles into UI worklet host creation",
);

assert(
  hostView.includes("NativeScriptChildrenViewHasVisibleChild(UIView* childrenView,\n                                                   UIView* sentinel,\n                                                   UIView* owner)") &&
    hostView.includes("if (subview == owner) {\n      if (NativeScriptChildrenViewHasVisibleChild(subview, sentinel, owner))") &&
    hostView.includes("NativeScriptChildrenViewVisibleDescendantCount(UIView* childrenView,\n                                                                 UIView* sentinel,\n                                                                 UIView* owner)") &&
    hostView.includes("NSUInteger count = (view == sentinel || view == owner) ? 0 : 1;") &&
    hostView.includes("child == nil || child == self || child == _nativeView") &&
    hostView.includes("_childrenView == componentView || _nativeView == componentView"),
  "Fabric-component-backed hosts should not count their internal NativeScript carrier as user content, but must still inspect descendants inside it",
);

const refreshContainerViewFrameAndHostIndex = fabricHostView.indexOf(
  "- (void)refreshContainerViewFrameAndHost",
);
const refreshContainerViewFrameAndHost = fabricHostView.slice(
  refreshContainerViewFrameAndHostIndex,
  fabricHostView.indexOf("- (void)scheduleFabricTransactionCommitFallbackIfNeeded"),
);

assert(
  refreshContainerViewFrameAndHostIndex > -1 &&
    refreshContainerViewFrameAndHost.includes(
      "[self refreshContainerViewFrameIfNeeded];",
    ) &&
    refreshContainerViewFrameAndHost.includes(
      "[_containerView mountUIKitHostIfNeeded];",
    ) &&
    refreshContainerViewFrameAndHost.indexOf(
      "[self refreshContainerViewFrameIfNeeded];",
    ) <
      refreshContainerViewFrameAndHost.indexOf(
        "[_containerView mountUIKitHostIfNeeded];",
      ) &&
    refreshContainerViewFrameAndHost.indexOf(
      "[_containerView mountUIKitHostIfNeeded];",
    ) <
      refreshContainerViewFrameAndHost.indexOf(
        "[_containerView refreshDetachedChildrenHost];",
      ),
  "Fabric component refresh should retry native UIKit host creation after native mount info is available and before child refresh work",
);

console.log("uikit host Fabric mount info API tests passed");

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
const hostViewHeader = read("ios/NativeScriptUIView.h");
const hostView = read("ios/NativeScriptUIView.mm");
const manager = read("ios/NativeScriptUIViewManager.mm");
const fabricView = read("ios/Fabric/NativeScriptUIViewComponentView.mm");
const normalizedIndex = index.replace(/\s+/g, " ");

assert(
  declarations.includes("export type UIKitFabricMountedChild") &&
    declarations.includes("readonly ownerComponentViewHandle: string") &&
    declarations.includes("readonly ownerContainerViewHandle: string") &&
    declarations.includes("readonly ownerNativeViewHandle: string") &&
    declarations.includes("readonly ownerChildrenViewHandle: string") &&
    declarations.includes("readonly ownerControllerHandle: string") &&
    declarations.includes("readonly componentViewHandle: string") &&
    declarations.includes("readonly containerViewHandle: string") &&
    declarations.includes("readonly controllerHandle: string") &&
    declarations.includes("mountingTransactionWillMount?: (") &&
    declarations.includes("mountingTransactionDidMount?: (") &&
    declarations.includes("mountChild?: (") &&
    declarations.includes("unmountChild?: ("),
  "public declarations should expose direct Fabric child lifecycle callbacks for UIKit hosts",
);

assert(
  index.includes("function parseUIKitFabricMountedChildJson") &&
    index.includes('phase === "mountingTransactionWillMount"') &&
    index.includes('phase === "mountChild" || phase === "unmountChild"') &&
    index.includes("host.mountChild?.(child, nextProps, host.previousProps)") &&
    index.includes(
      "host.unmountChild?.(child, nextProps, host.previousProps)",
    ) &&
    index.includes("function commitUIKitHostFabricTransaction(") &&
    normalizedIndex.includes(
      "commitUIKitHostFabricTransaction( host, nextProps, host.previousProps, parseUIKitFabricTransactionJson(transactionJson), );",
    ) &&
    index.includes("const hasFabricLifecycleCallbacks =") &&
    index.includes("transactionCommittedHost != null") &&
    index.includes("hostReadyHost != null") &&
    index.includes("nativeMountInfoJson?: string") &&
    index.includes("parseUIKitNativeMountInfoJson(nativeMountInfoJson)") &&
    index.includes("fabricLifecycleCallbacks: hasFabricLifecycleCallbacks"),
  "defineUIKitHost should route native Fabric lifecycle phases to UI-runtime callbacks and opt in automatically, including transaction/host-ready-only consumers",
);

assert(
  nativeComponent.includes("fabricLifecycleCallbacks?: boolean") &&
    declarations.includes("fabricLifecycleCallbacks?: boolean") &&
    index.includes('"fabricLifecycleCallbacks"') &&
    hostViewHeader.includes(
      "@property(nonatomic, assign) BOOL fabricLifecycleCallbacks",
    ) &&
    manager.includes(
      "RCT_EXPORT_VIEW_PROPERTY(fabricLifecycleCallbacks, BOOL)",
    ),
  "NativeScriptUIView should expose an opt-in native prop for Fabric lifecycle callbacks",
);

assert(
  hostViewHeader.includes("- (void)notifyFabricMountingTransactionWillMount") &&
    hostViewHeader.includes(
      "- (void)notifyFabricChildMounted:(UIView*)componentView",
    ) &&
    hostViewHeader.includes(
      "- (void)notifyFabricChildUnmounted:(UIView*)componentView",
    ) &&
    hostView.includes('[self runUIKitHostLifecycle:@"mountChild"') &&
    hostView.includes('[self runUIKitHostLifecycle:@"unmountChild"') &&
    hostView.includes(
      '[self runUIKitHostLifecycle:@"mountingTransactionWillMount"]',
    ) &&
    hostView.includes(
      '"ownerComponentViewHandle" : NativeScriptHandleFromNSObject(self.superview)',
    ) &&
    hostView.includes(
      '"ownerContainerViewHandle" : NativeScriptHandleFromNSObject(self)',
    ) &&
    hostView.includes(
      '"componentViewHandle" : NativeScriptHandleFromNSObject(componentView)',
    ) &&
    hostView.includes(
      '"containerViewHandle" : NativeScriptHandleFromNSObject(childContainerView)',
    ) &&
    hostView.includes(
      "- (NSArray<NSDictionary<NSString*, id>*>*)fabricMountedChildrenSnapshot",
    ),
  "NativeScriptUIView should serialize direct Fabric child lifecycle payloads into the UI-runtime host lifecycle",
);

assert(
  fabricView.includes(
    "NativeScriptFabricCurrentContainerViewForComponentView",
  ) &&
    read("ios/Fabric/NativeScriptUIViewComponentView.h").includes(
      "- (UIView*)nativeScriptCurrentContainerView",
    ) &&
    fabricView.includes(
      'NSSelectorFromString(@"nativeScriptCurrentContainerView")',
    ) &&
    hostView.includes(
      'NSSelectorFromString(@"nativeScriptCurrentContainerView")',
    ) &&
    fabricView.includes("- (UIView*)nativeScriptCurrentContainerView") &&
    fabricView.includes("return _containerView ?: self;") &&
    fabricView.includes("if (_containerView.fabricLifecycleCallbacks)") &&
    fabricView.includes("notifyFabricChildMounted:childComponentView") &&
    fabricView.includes("notifyFabricChildUnmounted:childComponentView") &&
    fabricView.includes(
      "[_containerView notifyFabricMountingTransactionWillMount]",
    ) &&
    fabricView.includes(
      "_containerView.fabricLifecycleCallbacks = newFabricLifecycleCallbacks",
    ) &&
    fabricView.includes("_containerView.fabricLifecycleCallbacks = NO"),
  "Fabric component view should forward direct child lifecycle events only for opted-in UIKit hosts",
);

assert(
  hostView.includes("- (void)setFabricLifecycleCallbacks:(BOOL)fabricLifecycleCallbacks") &&
    hostView.includes("- (NSString*)fabricMountedChildLifecycleKeyForEvent:") &&
    hostView.includes("- (void)replayFabricMountedChildrenAsMountEventsIfNeeded") &&
    hostView.includes("NSMutableArray<UIView*>* _fabricMountedChildComponentViews;") &&
    hostView.includes("- (void)recordFabricChildComponentViewMounted:(UIView*)view index:(NSInteger)index") &&
    hostView.includes("- (void)recordFabricChildComponentViewUnmounted:(UIView*)view") &&
    hostView.includes("appendChildren(_fabricMountedChildComponentViews);") &&
    hostViewHeader.includes("- (void)recordFabricChildComponentViewMounted:(UIView*)view index:(NSInteger)index") &&
    fabricView.includes("[_containerView recordFabricChildComponentViewMounted:childComponentView index:index];") &&
    fabricView.includes("[_containerView recordFabricChildComponentViewUnmounted:childComponentView];") &&
    hostView.includes("[self replayFabricMountedChildrenAsMountEventsIfNeeded];\n    [self replayFabricTransactionAfterHostCreationIfNeeded];") &&
    hostView.includes('if (_hostId.length == 0 || !_fabricLifecycleCallbacks || !_hasCreatedUIKitHost)') &&
    hostView.includes('[_fabricMountedChildLifecycleKeys addObject:childKey];') &&
    hostView.includes('[self runUIKitHostLifecycle:@"mountChild" event:event];') &&
    hostView.includes('if (!_hasCreatedUIKitHost) {\n    [_fabricMountedChildLifecycleKeys removeObject:childKey];\n  }') &&
    hostView.includes('[_fabricMountedChildLifecycleKeys removeObject:childKey];'),
  "NativeScriptUIView should replay already-mounted direct Fabric children as mountChild lifecycle events once lifecycle callbacks and host creation are ready",
);

console.log("uikit host Fabric lifecycle API tests passed");

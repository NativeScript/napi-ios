const assert = require("assert");
const fs = require("fs");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(packageRoot, relativePath), "utf8");
}

const index = read("src/index.ts");
const declarations = read("src/index.ts");
const hostViewHeader = read("ios/NativeScriptUIView.h");
const hostView = read("ios/NativeScriptUIView.mm");
const manager = read("ios/NativeScriptUIViewManager.mm");
const fabricView = read("ios/Fabric/NativeScriptUIViewComponentView.mm");
const nativeComponent = read("src/NativeScriptUIViewNativeComponent.ts");
const transactionParser = index.slice(
  index.indexOf("function parseUIKitFabricTransactionJson"),
  index.indexOf("function parseUIKitFabricMountedChildRecord"),
);
const normalizedIndex = index.replace(/\s+/g, " ");

assert(
  declarations.includes("transactionCommitted?: (") &&
    declarations.includes(
      "readonly fabricTransaction: UIKitFabricTransaction",
    ) &&
    declarations.includes(
      "readonly children: readonly UIKitFabricMountedChild[]",
    ) &&
    declarations.includes("readonly mutations: readonly UIKitFabricMutation[]") &&
    declarations.includes("export type UIKitFabricMutation") &&
    declarations.includes("readonly hasModifiedProps: boolean") &&
    index.includes(
      "const transactionCommittedHost = definition.transactionCommitted",
    ) &&
    index.includes("function parseUIKitFabricTransactionJson") &&
    index.includes('phase === "transactionCommitted"') &&
    index.includes('phase === "refresh"') &&
    index.includes("host.context.setFabricTransaction(") &&
    index.includes("parseUIKitFabricTransactionJson(transactionJson)") &&
    index.includes("hasModifiedProps:") &&
    index.includes("parseUIKitFabricMountedChildRecord") &&
    normalizedIndex.includes(
      "commitUIKitHostFabricTransaction( host, nextProps, host.previousProps, parseUIKitFabricTransactionJson(transactionJson), );",
    ) &&
    index.includes("host.transactionCommitted?.(props, previousProps);") &&
    index.includes("transactionCommittedHost?.("),
  "defineUIKitHost should expose a UI-worklet Fabric transaction committed lifecycle with child and prop metadata",
);

assert(
  transactionParser.includes("const children: UIKitFabricMountedChild[] = [];") &&
    transactionParser.includes(
      'const ownerComponentViewHandle = stringRecordValue(',
    ) &&
    transactionParser.includes("ownerContainerViewHandle") &&
    transactionParser.includes("const mutations: UIKitFabricMutation[] = [];") &&
    transactionParser.includes('type: stringRecordValue(event, "type")') &&
    transactionParser.includes("parentTag: numberOrNull(event.parentTag)") &&
    transactionParser.includes("children.push({") &&
    transactionParser.includes("ownerComponentViewHandle,") &&
    !transactionParser.includes(".map("),
  "Fabric transaction child parsing should avoid Array.map callbacks so UI worklets do not lose child-record parser bindings",
);

assert(
  hostViewHeader.includes("- (void)notifyFabricTransactionCommitted") &&
    hostViewHeader.includes("modifiedProps:(BOOL)hasModifiedProps") &&
    hostViewHeader.includes(
      "- (NSArray<NSDictionary<NSString*, id>*>*)fabricMountedChildrenSnapshot",
    ) &&
    hostViewHeader.includes(
      "@property(nonatomic, assign) BOOL immediateTransactionCommit",
    ) &&
    hostView.includes("- (void)notifyFabricTransactionCommitted") &&
    hostView.includes('"children" : [self fabricMountedChildrenSnapshot]') &&
    hostView.includes('"mutations" : mutations ?: @[]') &&
    hostView.includes("- (NSString*)fabricTransactionJsonWithModifiedChildren:") &&
    hostView.includes(
      '[self runUIKitHostLifecycle:@"refresh"\n                transactionJson:[self fabricTransactionJsonWithModifiedChildren:YES',
    ) &&
    hostView.includes("hasModifiedProps") &&
    hostView.includes("NativeScriptRunUIKitHostLifecycleWithInfo") &&
    hostView.includes("replayFabricTransactionAfterHostCreationIfNeeded") &&
    hostView.includes("_hasReplayedFabricTransactionAfterHostCreation") &&
    hostView.includes("NativeScriptViewIsDescendantOfView(self, _childrenView)") &&
    hostView.includes(
      '[self runUIKitHostLifecycle:@"transactionCommitted" transactionJson:transactionJson];',
    ),
  "NativeScriptUIView should forward Fabric transaction commits and mutation metadata into the UI-worklet host lifecycle, including children mounted before host creation",
);

assert(
  // The out-of-band props-revision commit reuses the shared, monotonic Fabric
  // delivery token (_fabricTransactionDeliveryToken / advanceFabricTransaction-
  // DeliveryToken) rather than a dedicated props-commit counter; the coalescing
  // behavior this pins -- capture token, dispatch_async, drop if superseded --
  // is unchanged.
  hostView.includes("NSUInteger _fabricTransactionDeliveryToken;") &&
    hostView.includes(
      "- (void)scheduleUIKitHostPropsTransactionCommitIfNeeded",
    ) &&
    hostView.includes(
      "if (_hostId.length == 0 || _updateRevision <= 0)",
    ) &&
    hostView.includes(
      "const NSUInteger transactionToken = [self advanceFabricTransactionDeliveryToken];",
    ) &&
    hostView.includes("dispatch_async(dispatch_get_main_queue(), ^{") &&
    hostView.includes(
      "self->_fabricTransactionDeliveryToken != transactionToken",
    ) &&
    hostView.includes(
      "notifyFabricTransactionCommittedWithModifiedChildren:NO modifiedProps:YES",
    ) &&
    hostView.includes(
      '[self runUIKitHostLifecycle:@"update"];\n    [self scheduleUIKitHostPropsTransactionCommitIfNeeded];',
    ) &&
    hostView.includes("return ++_fabricTransactionDeliveryToken;"),
  "NativeScriptUIView should coalesce a generic transactionCommitted callback after UIKit host prop revision updates so controller and native-view hosts can react to committed prop mutations without waiting for child mounts",
);

assert(
  index.includes("function commitUIKitHostFabricTransaction(") &&
    index.includes("host.context.setFabricTransaction(transaction);") &&
    index.includes("host.mountingTransactionDidMount?.(props, previousProps);") &&
    index.includes("host.transactionCommitted?.(props, previousProps);") &&
    index.includes("hasModifiedProps: false") &&
    normalizedIndex.includes(
      "commitUIKitHostFabricTransaction( host, nextProps, host.previousProps, parseUIKitFabricTransactionJson(transactionJson), );",
    ) &&
    normalizedIndex.includes(
      "const updatePreviousProps = host.previousProps ?? fallbackPreviousProps;",
    ) &&
    normalizedIndex.includes(
      "commitUIKitHostFabricTransaction( host, nextProps, updatePreviousProps, { children: [], hasModifiedChildren: false, hasModifiedProps: true, mutations: [], }, );",
    ),
  "defineUIKitHost should publish a generic prop-mutation Fabric transaction after direct UI-thread React prop updates, matching the native transactionCommitted lifecycle path for mount-through-native hosts",
);

assert(
  nativeComponent.includes("immediateTransactionCommit?: boolean") &&
    declarations.includes("immediateTransactionCommit?: boolean") &&
    index.includes('"immediateTransactionCommit"') &&
    index.includes(
      "props.immediateTransactionCommit === true ? true : undefined",
    ) &&
    manager.includes(
      "RCT_EXPORT_VIEW_PROPERTY(immediateTransactionCommit, BOOL)",
    ),
  "defineUIKitHost should expose an opt-in immediate transaction commit host prop",
);

assert(
  fabricView.includes("#import <React/RCTMountingTransactionObserving.h>") &&
    fabricView.includes("RCTMountingTransactionObserving") &&
    fabricView.includes("- (void)mountingTransactionDidMount:") &&
    fabricView.includes("NativeScriptFabricMutationRecords(transaction)") &&
    fabricView.includes("NativeScriptFabricMutationRecord(") &&
    fabricView.includes('@"parentTag" : @(mutation.parentTag)') &&
    fabricView.includes('@"newChildTag" : @(newView.tag)') &&
    fabricView.includes('@"oldChildTag" : @(oldView.tag)') &&
    fabricView.includes("if (!hasModifiedChildren && !hasModifiedProps)") &&
    fabricView.includes(
      "if (_containerView.immediateTransactionCommit && !transactionHasRemovalMutation)",
    ) &&
    fabricView.includes(
      "notifyFabricTransactionCommittedWithModifiedChildren:hasModifiedChildren",
    ) &&
    fabricView.includes("modifiedProps:hasModifiedProps") &&
    fabricView.includes("mutations:mutationRecords") &&
    fabricView.includes("dispatch_async(dispatch_get_main_queue(), ^{") &&
    !fabricView.includes(
      "notifyFabricTransactionCommittedWithModifiedChildren:self->_hasModifiedChildrenInCurrentTransaction",
    ),
  "NativeScriptUIViewComponentView should notify UIKit hosts for Fabric transactions that changed direct children or host props",
);

assert(
  fabricView.includes("_hasModifiedChildrenInCurrentTransaction = YES;") &&
    fabricView.includes("_hasModifiedPropsInCurrentTransaction = YES;") &&
    fabricView.includes("_hasObservedPropsUpdateSinceLastTransaction = YES;") &&
    fabricView.includes(
      "if (!_hasObservedPropsUpdateSinceLastTransaction) {\n    _hasModifiedPropsInCurrentTransaction = NO;\n  }",
    ) &&
    fabricView.includes("_hasObservedPropsUpdateSinceLastTransaction = NO;") &&
    fabricView.includes("_hasModifiedChildrenInCurrentTransaction = NO;") &&
    fabricView.includes("_hasModifiedPropsInCurrentTransaction = NO;") &&
    fabricView.includes("_mountingTransactionToken"),
  "Fabric transaction observer should keep explicit child and prop mutation markers available for host parity code, even when Fabric reports prop changes before mountingTransactionWillMount",
);

assert(
  // The fallback reuses the container view's shared, monotonic delivery token
  // (advanceFabricTransactionDeliveryToken / fabricTransactionDeliveryToken)
  // instead of a dedicated fallback counter; on delivery it clears the
  // coalesced pending flags. The coalescing behavior this pins is unchanged.
  fabricView.includes(
    "self->_hasPendingFabricTransactionCommitFallbackChildren = NO;",
  ) &&
    fabricView.includes(
      "BOOL _hasPendingFabricTransactionCommitFallbackChildren;",
    ) &&
    fabricView.includes(
      "BOOL _hasPendingFabricTransactionCommitFallbackProps;",
    ) &&
    fabricView.includes(
      "- (void)scheduleFabricTransactionCommitFallbackIfNeeded",
    ) &&
    fabricView.includes(
      "_hasPendingFabricTransactionCommitFallbackChildren =\n      _hasPendingFabricTransactionCommitFallbackChildren || hasModifiedChildren;",
    ) &&
    fabricView.includes(
      "_hasPendingFabricTransactionCommitFallbackProps =\n      _hasPendingFabricTransactionCommitFallbackProps || hasModifiedProps;",
    ) &&
    fabricView.includes(
      "const NSUInteger fallbackToken = [_containerView advanceFabricTransactionDeliveryToken];",
    ) &&
    fabricView.includes(
      "[self->_containerView fabricTransactionDeliveryToken] != fallbackToken",
    ) &&
    fabricView.includes(
      "const BOOL hasModifiedChildren =\n        self->_hasModifiedChildrenInCurrentTransaction ||\n        self->_hasPendingFabricTransactionCommitFallbackChildren;",
    ) &&
    fabricView.includes(
      "const BOOL hasModifiedProps =\n        self->_hasModifiedPropsInCurrentTransaction ||\n        self->_hasPendingFabricTransactionCommitFallbackProps;",
    ) &&
    fabricView.includes(
      "_hasModifiedChildrenInCurrentTransaction ||\n      _hasPendingFabricTransactionCommitFallbackChildren;",
    ) &&
    fabricView.includes(
      "_hasModifiedPropsInCurrentTransaction ||\n      _hasPendingFabricTransactionCommitFallbackProps;",
    ) &&
    fabricView.includes(
      "notifyFabricTransactionCommittedWithModifiedChildren:hasModifiedChildren",
    ) &&
    fabricView.includes("[self scheduleFabricTransactionCommitFallbackIfNeeded];") &&
    fabricView.includes(
      "self->_hasPendingFabricTransactionCommitFallbackProps = NO;",
    ),
  "NativeScriptUIViewComponentView should coalesce a generic UIKit-host transaction commit fallback for child and prop mutations when Fabric does not deliver a mountingTransactionDidMount callback for the component view",
);

console.log("uikit host transaction API tests passed");

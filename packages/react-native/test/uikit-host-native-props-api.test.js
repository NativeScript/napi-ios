const assert = require("assert");
const fs = require("fs");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(packageRoot, relativePath), "utf8");
}

const nativeComponent = read("src/NativeScriptUIViewNativeComponent.ts");
const index = read("src/index.ts");
const hostHeader = read("ios/NativeScriptUIKitHost.h");
const hostViewHeader = read("ios/NativeScriptUIView.h");
const hostView = read("ios/NativeScriptUIView.mm");
const fabricView = read("ios/Fabric/NativeScriptUIViewComponentView.mm");
const nativeApiModule = read("ios/NativeScriptNativeApiModule.mm");
const manager = read("ios/NativeScriptUIViewManager.mm");
const normalizedIndex = index.replace(/\s+/g, " ");
const normalizedHostView = hostView.replace(/\s+/g, " ");

assert(
  nativeComponent.includes("uikitHostPropsJson?: string") &&
    nativeComponent.includes("uikitHostPropsRevision?: Int32"),
  "NativeScriptUIView native component should expose a generic host props commit channel",
);

assert(
  index.includes("function stringifySerializableUIKitHostProps") &&
    index.includes("function stringifyUIKitHostPropsPayload") &&
    index.includes("__nativeScriptUIKitHostPropsRevision") &&
    index.includes("__nativeScriptUIKitFunctionProp") &&
    index.includes("function isSerializableUIKitHostObject") &&
    index.includes("function copyUIKitHostPropsForUI") &&
    index.includes('key === "children"') &&
    index.includes('typeof value === "function"') &&
    index.includes("!isSerializableUIKitHostObject(value)") &&
    index.includes("[uikitHostFunctionPropMarkerKey]: true") &&
    index.includes("uikitHostPropsJson:") &&
    index.includes("uikitHostPropsRevision:") &&
    index.includes("updateRevision:") &&
    index.includes("mountThroughNativeHost && nativeHostPropsJson != null"),
  "defineUIKitHost should pass serializable props through Fabric updateRevision",
);
assert(
    index.includes("Object.prototype.hasOwnProperty.call(") &&
    index.includes('    "nativeProps",') &&
    index.includes('typeof nativePropsMapper === "function"') &&
    index.includes("const normalizedProps = (props ?? {})") &&
    index.includes("Object.entries(normalizedProps)") &&
    index.includes("mappedNativeProps = nativePropsMapper(normalizedProps)") &&
    index.includes("mappedNativeProps = nativePropsMapper") &&
    index.includes("Object.assign(nativeProps, mappedNativeProps)"),
  "defineUIKitHost should normalize missing props, use own nativeProps mappers, and support explicit static native props",
);

assert(
  index.includes("function syncUIKitHostPropsFromNative") &&
    index.includes("JSON.parse(propsJson)") &&
    index.includes("function mergeUIKitHostPropsFromNative") &&
    index.includes("isUIKitHostFunctionPropMarker(nativeValue)") &&
    index.includes("mergeUIKitHostPropsFromNative(current, nativeProps)") &&
    index.includes("function shouldApplyUIKitHostPropsRevision") &&
    index.includes("pending.propsRevision") &&
    index.includes("host.propsRevision") &&
    index.includes("syncUIKitHostPropsFromNative(hostId, propsJson)") &&
    index.includes("shouldRunMountedOrNativeMountInfo: boolean | string = false") &&
    // 6738e4ef (cut redundant cold-launch host-lifecycle crossings):
    // runUIKitHostLifecycleFromNative's own createRegisteredUIKitHostFromNative
    // call deliberately stopped re-passing nativeMountInfoJson -- it was
    // already parsed and synced by syncUIKitNativeMountInfo just above, so
    // re-passing it made every crossing re-parse the identical JSON and
    // re-resolve every native handle a second time.
    normalizedIndex.includes(
      "createRegisteredUIKitHostFromNative(hostId, undefined, false);",
    ) &&
    !index.includes("createRegisteredUIKitHostFromNative(hostId, propsJson)"),
  "UI worklet host lifecycle should merge native-commit props once before running updates",
);
assert(
  index.indexOf("function syncUIKitHostPropsFromNative") <
    index.indexOf("function createRegisteredUIKitHostFromNative") &&
    index.indexOf("function syncUIKitHostPropsFromNative") <
      index.indexOf("function runUIKitHostLifecycleFromNative"),
  "native-props worklet helper must be declared before worklets capture it",
);

assert(
  index.includes("function hasNonSerializableUIKitHostProps") &&
    index.includes("function nonSerializableUIKitHostPropsChanged") &&
    index.includes("const reactHostPropsJsonRef") &&
    index.includes("didLiveHostPropsChange") &&
    index.includes("reactHostPropsRevisionRef.current += 1") &&
    index.includes("reactHostPropsJsonRef.current = nextSerializableReactHostPropsJson") &&
    index.includes("nextRevision > currentRevision") &&
    index.includes("syncUIKitHostPropsFromReact(") &&
    index.includes("nextPropsRevision") &&
    // Lever 2 (pop-wedge fix): host.update()/commitUIKitHostFabricTransaction
    // must gate on whether the SERIALIZABLE native payload actually advanced
    // (nativeRevisionAdvanced, compared against host.updateAppliedNativeRevision),
    // not merely on "this host has function props at all" (the old
    // shouldUpdateFromReactProps check, which fired on every function-identity-only
    // re-render even with zero real prop change).
    index.includes("nativeRevisionAdvanced") &&
    index.includes("host.updateAppliedNativeRevision") &&
    index.includes("updateAppliedNativeRevision?: number") &&
    index.includes("const uiRuntimeProps = copyUIKitHostPropsForUI(pluginProps)") &&
    index.includes("prepareUIKitHostOnUI,\n          uiRuntimeProps,") &&
    index.includes("host.update?.(") &&
    index.includes("host.previousProps = nextProps") &&
    index.includes("didApplyProps") &&
    index.includes("return uikitHostHandles(host);"),
  "mount-through-native updates should rerun on the UI thread only when the serializable native payload actually advanced, not on function-identity-only churn",
);

assert(
  index.includes("function runOnUISync") &&
    !index.includes("export function runOnUISync") &&
    index.includes('typeof worklets.runOnUISync !== "function"') &&
    index.includes("return worklets.runOnUISync(callback, ...args);"),
  "NativeScript should keep a synchronous UI worklet primitive (internal) for Fabric-style native host preparation",
);

assert(
  index.includes("const [nativeHostRevision, setNativeHostRevision]") &&
    index.includes("const prepareUIKitHostOnUI = (") &&
    index.includes("createRegisteredUIKitHostFromNative(hostId, undefined, false)") &&
    index.includes("setNativeHostRevision((revision) => revision + 1)") &&
    index.includes("mountedRevision:") &&
    index.includes("nativeHostRevision > 0"),
  "mount-through-native hosts should keep the mountedRevision fallback visible until NativeScript has a main-thread synchronous UI worklet primitive",
);

assert(
  index.includes("if (shouldRunMounted && !host.hasMounted)") &&
    index.includes('phase === "mounted" && !host.hasMounted') &&
    index.includes("host.hasMounted = true;") &&
    index.includes("host.mounted?.(host.propsRef.current);"),
  "native-created UIKit hosts should run mounted idempotently from the native mounted lifecycle",
);

assert(
  index.includes("reactHostPropsRevision,") &&
    !index.includes("      pluginProps,\n      updateHost,"),
  "defineUIKitHost should depend on the native-relevant props revision instead of the fresh pluginProps object",
);

const declarations = read("src/index.ts");
assert(
  declarations.includes("nativeProps?:\n    | Partial<ViewProps>") &&
    declarations.includes(") => Partial<ViewProps> | undefined);"),
  "public declarations should allow function or explicit static nativeProps definitions",
);

assert(
  hostHeader.includes("NativeScriptCreateUIKitHost(") &&
    hostHeader.includes("NSString* hostId, NSString* propsJson") &&
    hostHeader.includes("NSString* hostId, NSString* phase, NSString* propsJson"),
  "native host bridge should accept a generic props snapshot",
);

assert(
	  hostViewHeader.includes("@property(nonatomic, copy) NSString* uikitHostPropsJson") &&
	    hostView.includes("NativeScriptCreateUIKitHostWithInfo(") &&
	    hostView.includes("NSString* nativeMountInfoJson = [self nativeMountInfoJson];") &&
	    normalizedHostView.includes(
	      "NativeScriptCreateUIKitHostWithInfo( _hostId, _uikitHostPropsJson, nativeMountInfoJson)"
	    ) &&
	    hostView.includes("BOOL _hasCreatedUIKitHost;") &&
	    hostView.includes("_hasCreatedUIKitHost = NO;") &&
	    hostView.includes("_hasCreatedUIKitHost = YES;") &&
	    hostView.includes("_hostId.length == 0 || _hasCreatedUIKitHost") &&
	    hostView.includes("NativeScriptRunUIKitHostLifecycleWithInfo(") &&
	    normalizedHostView.includes(
	      "NativeScriptRunUIKitHostLifecycleWithInfo(_hostId, phase, _uikitHostPropsJson, transactionJson, [self nativeMountInfoJson])"
	    ) &&
	    normalizedHostView.includes(
	      "NativeScriptRunUIKitHostLifecycleWithInfo(_hostId, phase, _uikitHostPropsJson, nil, [self nativeMountInfoJson])"
	    ) &&
	    hostView.indexOf("NativeScriptRunUIKitHostLifecycleWithInfo(") >
	      hostView.indexOf("- (void)runUIKitHostLifecycle:"),
  "NativeScriptUIView should forward latest props and native mount info while avoiding already-mounted native host recreation before every lifecycle call",
);

assert(
  fabricView.includes("newViewProps->uikitHostPropsJson") &&
    fabricView.includes("_containerView.uikitHostPropsJson = uikitHostPropsJson") &&
    fabricView.includes("_containerView.uikitHostPropsRevision = newUIKitHostPropsRevision") &&
    fabricView.indexOf("_containerView.uikitHostPropsJson = uikitHostPropsJson") <
      fabricView.indexOf("_containerView.hostId = hostId"),
  "Fabric component view should apply host props before hostId/updateRevision lifecycle props",
);

assert(
  nativeApiModule.includes("propsJsonString") &&
    nativeApiModule.includes("function.call(runtime, hostIdValue, propsJsonValue)") &&
    nativeApiModule.includes("function.call(runtime, hostIdValue, phaseValue, propsJsonValue)"),
  "native module should pass props snapshots into the UI worklet runtime synchronously",
);

assert(
  manager.includes("RCT_EXPORT_VIEW_PROPERTY(uikitHostPropsJson, NSString)") &&
    manager.includes("RCT_EXPORT_VIEW_PROPERTY(uikitHostPropsRevision, NSInteger)"),
  "Paper host manager should expose the generic props commit channel too",
);

console.log("uikit host native props API tests passed");

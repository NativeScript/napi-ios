const assert = require("assert");
const fs = require("fs");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(packageRoot, relativePath), "utf8");
}

const index = read("src/index.ts");
const nativeView = read("ios/NativeScriptUIView.mm");
const updateGuard =
  "if (nativeViewHandle == null && !mountThroughNativeHost) {";
const updateGuardIndex = index.indexOf(updateGuard);

assert(
  updateGuardIndex > -1,
  "defineUIKitHost should still guard updates until a native host is mounted",
);

const previousHook = index.slice(0, updateGuardIndex).lastIndexOf("useEffect(");
const previousLayoutHook = index
  .slice(0, updateGuardIndex)
  .lastIndexOf("useLayoutEffect(");

assert(
  previousLayoutHook > previousHook,
  "UIKit host prop updates should run from useLayoutEffect so native library updates are scheduled before passive effects",
);

assert(
    index.includes("function runOnUISync") &&
    index.includes("const mountThroughNativeHost = true;") &&
    index.includes("const asyncPreparedHostRef = useRef") &&
    index.includes("if (mountThroughNativeHost && requiresNativeMountInfo)") &&
    index.includes("runOnUISync(\n          prepareUIKitHostOnUI") &&
    index.includes("runOnUI(\n          prepareUIKitHostOnUI") &&
    index.includes("replayPendingNativeUIKitHostCreateRequest(hostId)") &&
    index.includes(
      "pendingNativeUIKitHostCreateRequestRegistry().set(hostId",
    ) &&
    index.includes("setNativeHostRevision((revision) => revision + 1)") &&
    index.includes("mountedRevision:"),
  "mount-through-native UIKit hosts should synchronously pre-register native-mount-info hosts, retain async native create replay, and keep mountedRevision explicit",
);

assert(
  !index.includes("__nativeScriptUIKitDefinitionRegistry") &&
    !index.includes("function registerUIKitDefinition") &&
    index.includes("const pendingPropsRevision = shouldApplyPendingProps") &&
    index.includes(
      "const latestPropsRef = latest?.propsRef ?? pendingPropsRef;",
    ) &&
    index.includes("propsRevision: nextPropsRevision") &&
    index.includes("validWorklets") &&
    index.includes(".runOnUIAsync(installUIKitNativeMountBridge)") &&
    index.includes("return createImmediately") &&
    index.includes(
      "createRegisteredUIKitHostFromNative(hostId, undefined, false)",
    ),
  "mount-through-native UIKit hosts should prepare a revision-aware pending host without the failed definition-registry transfer and install the native bridge independently",
);

assert(
  index.includes("disposeRegisteredUIKitHost(hostId, currentProps);"),
  "mount-through-native UIKit hosts should dispose from the React layout-effect cleanup with serialized props",
);

const deallocIndex = nativeView.indexOf("- (void)dealloc {");
const setHostIdIndex = nativeView.indexOf("- (void)setHostId:");
assert(
  deallocIndex > -1 && setHostIdIndex > deallocIndex,
  "NativeScriptUIView should define dealloc before setHostId",
);
const deallocBody = nativeView.slice(deallocIndex, setHostIdIndex);
assert(
  !deallocBody.includes("NativeScriptRunUIKitHostLifecycle"),
  "NativeScriptUIView dealloc must not re-enter the Worklet runtime during host object finalization",
);
assert(
  deallocBody.includes("[self dismissViewControllerPresentationIfNeeded];") &&
    deallocBody.indexOf("[self dismissViewControllerPresentationIfNeeded];") <
      deallocBody.indexOf("[self detachViewControllerIfOwnedByHost];"),
  "NativeScriptUIView dealloc should dismiss native UIKit presentations before releasing hosted controllers",
);
assert(
  nativeView.includes("- (void)dismissViewControllerPresentationIfNeeded") &&
    nativeView.includes(
      "presentationController.presentingViewController != nil",
    ) &&
    nativeView.includes("dismissViewControllerAnimated:NO completion:nil"),
  "NativeScriptUIView should clean up presented controllers with native UIKit dismissal",
);
assert(
  nativeView.includes(
    'NativeScriptRunUIKitHostLifecycle(previousHostId, @"dispose", nil)',
  ),
  "NativeScriptUIView should still dispose the previous host when hostId changes in a stable lifecycle",
);

console.log("uikit host lifecycle timing API tests passed");

# @nativescript/react-native

A TurboModule + Fabric host that lets you drive real UIKit from TypeScript. It
installs the NativeScript Native API (the JSI Objective‑C interop used by the
NativeScript Hermes runtime) into a React Native app, and gives you a small set
of host factories for wrapping native `UIView`s and `UIViewController`s as React
components. The native work runs in worklets on the UI runtime, so UIKit is
touched on the right thread with the same globals and generated iOS SDK types
NativeScript uses.

```ts
import NativeScript from "@nativescript/react-native";

NativeScript.init();

await NativeScript.runOnUI(() => {
  "worklet";
  UIApplication.sharedApplication.keyWindow.tintColor = UIColor.systemPinkColor;
});
```

This package is intentionally low‑level. It installs the interop and gives you
lifecycle helpers; it ships no opinionated wrappers for tabs, maps, cameras, or
navigation. Build those as components in your app, or on top of
[`@nativescript/react-native-screens`](../react-native-screens) (the thin
`react-native-screens` adapter that this engine powers).

Requires Hermes and the New Architecture (Fabric + TurboModules).

---

## `init()` and the Babel plugin

`NativeScript.init()` attaches the Native API host object to
`globalThis.__nativeScriptNativeApi`, installs the lazy NativeScript‑style class
and C‑function globals, and installs the Native API into the
`react-native-worklets` UI runtime. Call it once, early, before touching native
APIs.

```ts
NativeScript.init(); // installs interop + worklet UI runtime
```

By default `init()` does **not** publish Objective‑C classes as globals on the
React Native JS thread — UIKit must be reached through worklets. Pass
`{ globals: true }` only if you deliberately want the JS‑thread globals.

Install `react-native-worklets`, add both Babel plugins, and re‑run
`pod install` so `RNWorklets` is linked:

```sh
npm install react-native-worklets
```

```js
// babel.config.js
module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    "@nativescript/react-native/babel-plugin",
    "react-native-worklets/plugin",
  ],
};
```

The NativeScript Babel plugin rewrites directive‑style callbacks: a `"use js"`
callback becomes an interop callback that runs back on the React Native JS
thread. `"use ui"` is rejected in React Native — use a `"worklet"` callback with
`NativeScript.runOnUI()` instead.

```ts
someNativeApi(() => {
  "use js";
  console.log("back on the RN JS thread");
});
```

---

## The threading model

There are three execution contexts, and getting UIKit onto the right one is the
whole point of this package:

| Context | What runs there | How you reach it |
| --- | --- | --- |
| **RN JS thread** | Your React render/effects, prop plumbing, `init()`. | Default. Never touch UIKit from here. |
| **Worklet UI runtime** | UIKit reads/writes, host `create`/`update`/… lifecycle, delegate/target‑action bodies. | `runOnUI()`, host lifecycle callbacks (already on the UI runtime). |
| **Main dispatch queue** | Work that must land on the platform main queue specifically. | `dispatchAsyncOnMainQueue()` (call from the UI runtime). |

- **`runOnUI(callback, ...args)`** — schedules a `"worklet"` callback on the UI
  runtime and resolves with its result. It only accepts a Worklets‑transformed
  function; running the RN JS runtime as a UI‑thread shim is not supported, so a
  non‑worklet callback throws. This is how you touch UIKit from React code.

  ```ts
  const width = await NativeScript.runOnUI(() => {
    "worklet";
    return UIScreen.mainScreen.bounds.size.width;
  });
  ```

- **`dispatchAsyncOnMainQueue(callback)`** — from inside a worklet, defers a
  `() => void` onto the main dispatch queue (e.g. to let a presentation settle
  before the next UIKit mutation). Returns `false` if the native scheduler is
  not installed.

- **`registerUIRuntimeGlobal(name, value)`** — installs a shared value as a
  global on the UI runtime so multiple worklets can reach it without
  re‑capturing it. Resolves to `true` once installed. Use it for cross‑worklet
  singletons; prefer plain closure capture for one‑off values.

Host lifecycle callbacks (`create`, `update`, `mounted`, `dispose`, …) already
run on the UI runtime, so you do **not** wrap their bodies in `runOnUI()`.

---

## Defining native hosts

Three factories turn native objects into React components. Each takes a
definition whose lifecycle callbacks run on the UI runtime and receive a
context object (`ctx`).

### `defineUIKitView` — one native `UIView`

```tsx
import NativeScript, { defineUIKitView } from "@nativescript/react-native";
import type { UIKitViewRef } from "@nativescript/react-native";

export const NativeSwitch = defineUIKitView<
  { value: boolean; onValueChange?: (value: boolean) => void },
  UISwitch
>({
  name: "NativeSwitch",
  layout: { sizing: "intrinsic" },
  create(ctx) {
    const view = UISwitch.new();
    ctx.targetAction(view, UIControlEvents.ValueChanged, () => {
      ctx.emit("onValueChange", view.on);
    });
    return view;
  },
  update(view, props) {
    if (view.on !== props.value) view.setOnAnimated(props.value, false);
  },
});

<NativeSwitch value={on} onValueChange={setOn} style={{ height: 32 }} />;
```

### `defineUIKitContainer` — a native `UIView` that hosts RN children

`create` returns `{ rootView, childrenView }`; React Native children mount into
`childrenView`.

```tsx
export const BlurCard = NativeScript.defineUIKitContainer({
  name: "BlurCard",
  create() {
    const rootView = UIVisualEffectView.alloc().initWithEffect(
      UIBlurEffect.effectWithStyle(UIBlurEffectStyle.SystemMaterial),
    );
    return { rootView, childrenView: rootView.contentView };
  },
});
```

### `defineUIViewController` — real child‑controller containment

Use this when UIKit expects a `UIViewController` (tabs, navigation, split views,
document browsers, presentations). `createController` returns the controller.

```tsx
export const NativePageHost = NativeScript.defineUIViewController({
  name: "NativePageHost",
  createController() {
    return UIViewController.new();
  },
  update(controller) {
    controller.view.backgroundColor = UIColor.systemBackgroundColor;
  },
});
```

### Lifecycle hooks

Definitions may implement `create`/`createController`, `update`, `refresh`,
`mounted`, `dispose`, `hostReady`, `transactionCommitted`,
`mountingTransactionWillMount`/`DidMount`, `mountChild`/`unmountChild`, and
`nativeProps`. Each hook receives `(view, props, previousProps?, ctx?)` (details
vary per hook) and runs on the UI runtime. `dispose` may return
`{ removeHostView: true }` to also tear down the RN host view.

### The context (`ctx`)

`ctx` is a [`UIKitViewContext`](src/index.ts) with the current `name`, `tag`,
`props`, Fabric handles, and helpers:

- `ctx.emit(name, payload)` — asynchronously invoke the matching React prop.
- `ctx.targetAction(control, events, callback)` — retained target/action, auto‑removed on dispose.
- `ctx.gestureAction(gesture, callback)` — retained gesture target/action.
- `ctx.actionTarget(callback)` — a standalone retained target/action pair.
- `ctx.delegate(object, protocol, implementation)` — create + assign + retain a delegate.
- `ctx.notification(name, object, callback)` — observe + auto‑remove an `NSNotification`.
- `ctx.observe(object, keyPath, callback)` — add + auto‑remove a KVO observation.
- `ctx.retain(value)` / `ctx.release(value)` — keep native helpers alive for (or free them before) the component lifetime.
- `ctx.dispose(callback)` — register cleanup, run once in reverse order.
- `ctx.invalidateLayout()` — schedule a fresh native measurement.
- `ctx.loadImage(source, options, callback)` — resolve an RN image source to a native `UIImage`.

Delegate, data‑source, target/action and `UIAction` callback bodies are JS work.
If one can be reached from a background native thread and needs to mutate UIKit,
wrap the mutation in `runOnUI()`.

### `layout.sizing`

React Native owns placement through Yoga; UIKit owns native behavior inside the
placed rectangle. `layout.sizing` opts into native measurement:

- `fill` — fill the RN host bounds (default).
- `intrinsic` — use `intrinsicContentSize`.
- `sizeThatFits` — use `sizeThatFits` with the style constraints.
- `autoLayout` — use `systemLayoutSizeFittingSize`.

Add `defaultSize`, `minSize`, `maxSize` when a native view can report zero or
needs bounds on the first pass. Call `ctx.invalidateLayout()` after content
changes.

### Imperative refs

```tsx
const ref = useRef<UIKitViewRef<UISwitch>>(null);
await ref.current?.runOnUI((view) => {
  "worklet";
  view.alpha = 0.8;
});
const size = await ref.current?.measureNative();
ref.current?.invalidateNativeLayout();
```

---

## Host view props

RN view props (`style`, `testID`, accessibility, responder props,
`pointerEvents`) go to the shared host component; your own props go to the
definition. Use `nativeProps(props)` in a definition when a plugin prop should
also affect the RN host. Beyond the RN props, [`UIKitHostViewProps`](src/index.ts)
exposes hosting‑strategy flags — most apps need none of them; adapters use them
to pick a containment model. One line each:

- `adoptHostViewAsControllerView` — make the Fabric host view the controller's `view` (upstream RNS hosting; moves mounted children wholesale).
- `attachController` / `attachControllerToParent` / `detachControllerFromParent` — control whether/where the hosted controller is added as a child controller.
- `attachControllerView` / `attachNativeView` / `pinNativeViewToHost` — control how the native view is inserted and pinned into the host.
- `collectChildren` — expose mounted Fabric children for collection instead of mounting them (see `collectedUIKitHostChildren`).
- `mountChildrenDirectlyToChildrenView` / `layoutDirectChildrenToChildrenViewBounds` — mount/layout RN children straight into the children view.
- `disableDetachedChildrenTouchHandler` / `externalDetachedChildrenOwner` / `preserveDetachedChildrenLayout` — opt out of the detached‑children touch/layout plumbing when an upstream surface already owns it.
- `detachedChildrenContentOffsetX` / `detachedChildrenContentOffsetY` — offset detached hosted content.
- `disableUIKitHostWindowAttachRefresh` — skip the generic window‑attach refresh when native containment owns the hot path.
- `fabricLifecycleCallbacks` — enable the Fabric mount/commit lifecycle hooks.
- `immediateTransactionCommit` / `deferTransactionCommitOnRemovals` — tune when Fabric transactions are committed to the host.
- `emitOffWindowHostReady` / `ignoreHostReadyWindowAttachment` / `onHostReady` — control the `hostReady` lifecycle event and its window gating.

---

## Interop utilities

Each entry: signature — contract — the one hazard.

- **`getClass<T>(name): T | null`** — dynamic native class lookup. Returns `null` if unavailable. Hazard: globals are lazy; don't force member enumeration in hot paths.
- **`isClassAvailable(name): boolean`** — availability probe. Hazard: simulator vs device availability can differ for optional frameworks.
- **`loadFramework(nameOrPath): boolean`** — load a system framework by name or `.framework` path before using its classes/protocols.
- **`createDelegate<T>(protocols, methods, options?): T`** — build + retain a protocol delegate from protocol objects or names. Hazard: UIKit holds delegates weakly — retain via `options.retainer`/`options.owner`, or it dies with the closure.
- **`nativeMethodPolicy(callback, policy)`** — tag a callback with a per‑method thread/return policy the bridge honors. Hazard: the marker is non‑enumerable; keep the tagged reference.
- **`nativeHandleForObject(value): string | undefined`** — stable string handle for a native object, safe to carry across worklets.
- **`nativeObjectFromHandle<T>(handle): T | null`** — resolve a handle back to a native object on the UI runtime. Hazard: string handles round‑trip; numeric coercion is a lossy fallback.
- **`invokeObjCSelector<R>(target, selector, args?): R`** — send an arbitrary Objective‑C selector; native object results are re‑wrapped.
- **`nativeArrayLength(value)` / `nativeArrayItem<T>(value, index)`** — read a bridged `NSArray`/`NSOrderedSet` without assuming JS array shape.
- **`nativeSubviews<T>(view): T[]`** — snapshot a `UIView`'s subviews on the UI runtime.
- **`loadImage(source, options, callback)`** — resolve an RN image source to a native `UIImage` (also available as `ctx.loadImage`).
- **`collectedUIKitHostChildren<T>(view)` / `uikitHostHandlesForView(view)`** — read the Fabric children/handles a `collectChildren` host exposed.
- **`refreshUIKitHostView(view)` / `flushUIKitHostView(view)`** — re‑run a host's opt‑in `refresh`, or force its display to flush, when UIKit moved it without a React prop change. Both return `false` for non‑hosted views.
- **`notifyUIKitAccessibilityLayoutChanged(view)`** — post a UIKit accessibility layout‑changed notification for a reattached host.
- **`reactNativeFabricViewLayoutTraits(view)` / `…ForHandle(handle)`** — read a Fabric view's layout metrics/traits from an object or a handle.

Objective‑C exceptions raised while dispatching through the bridge become JS
errors where they can be caught. Process‑level failures (`abort()`, fatal
assertions, memory corruption, some framework preconditions) are not catchable —
use availability checks and presentation guards instead of exceptions as control
flow.

---

## The `__extendClass` contract

`NSObject.extend(...)` (used under the hood by `createDelegate` and by direct
subclassing) builds a native subclass whose JS proxy forwards to the native
class. Two hazards ship with it:

1. **Overriding an inherited property needs an accessor descriptor.** A plain
   `value:` override on the extension object does not replace an inherited
   Objective‑C property getter/setter — define the override with an accessor
   (`get`/`set`) descriptor so the native property dispatch is actually
   overridden.

2. **`typeof proxy.sel === "function"` is not an availability check.** The proxy
   answers `function` for selectors the class may respond to, so a truthy
   `typeof` does not prove the selector is implemented/available. Use
   `isClassAvailable()` / `respondsToSelector:` (or a real feature probe) before
   relying on an optional selector.

---

## Examples

Runnable definitions ship under
[`@nativescript/react-native/examples`](examples): a switch, an intrinsic label,
a container, a view controller, a tab‑bar controller, a QuickLook preview
controller, and a presentation helper.

---

## Install (bare React Native)

```sh
npm install /path/to/nativescript-react-native-*.tgz react-native-worklets
cd ios
RCT_NEW_ARCH_ENABLED=1 USE_HERMES=1 pod install
```

Add both Babel plugins (see above), then `init()` before using native APIs. A
small CLI is bundled for bare projects:

```sh
npx nativescript-rn configure               # adds the Babel plugins + config, non-destructively
npx nativescript-rn generate-metadata --check
```

## Install (Expo)

Expo Go can't load custom native code — use a development build, EAS Build, or
`npx expo run:ios`.

```sh
npx expo install @nativescript/react-native react-native-worklets
```

```json
{ "expo": { "plugins": ["@nativescript/react-native"] } }
```

The config plugin enables Hermes + the New Architecture and adds both Babel
transforms. Pass metadata inputs when the app uses Objective‑C‑visible pods or
extra system frameworks:

```json
{
  "expo": {
    "plugins": [
      ["@nativescript/react-native", {
        "metadata": {
          "includePods": ["SomeObjCSDK"],
          "includeSystemFrameworks": ["UIKit", "MapKit", "WebKit"]
        }
      }]
    ]
  }
}
```

Set `{ "babelPlugin": false }` in the plugin options to add the Babel plugins
yourself.

---

## Building and testing the package

```sh
npm run build-rn-turbomodule   # tarball -> packages/react-native/dist/ and build/npm-tarballs/
npm run test-rn-turbomodule    # verify inside a generated RN iOS app
```

The published tarball includes the generated NativeScript metadata, the libffi
xcframework, and the generated iOS SDK TypeScript declarations. `src/index.ts`
is the package's type surface (`package.json` "types"); it is authored for
babel/metro and carries `// @ts-nocheck`, so its exported declarations are the
checkable contract while its worklet‑host body stays out of consumers' strict
type checks.

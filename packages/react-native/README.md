# @nativescript/react-native

React Native TurboModule wrapper for the NativeScript Native API JSI bridge on
Hermes.

The module exposes one small TurboModule whose `init()` method attaches the
NativeScript Native API host object to `globalThis.__nativeScriptNativeApi` and
installs lazy NativeScript-style globals for classes and C functions. The host
object itself is pure JSI and is shared with the NativeScript Hermes runtime.

```ts
import NativeScript from "@nativescript/react-native";

NativeScript.init();

const object = NSObject.new();
```

`NativeScript.init()` also installs the Native API into the
`react-native-worklets` UI runtime. `NativeScript.runOnUI()` only accepts
Worklets callbacks; running React Native's JS-thread runtime as a UI-thread shim
is not supported.

```ts
await NativeScript.runOnUI(() => {
  "worklet";
  UIApplication.sharedApplication.keyWindow.tintColor = UIColor.systemPinkColor;
});
```

Install `react-native-worklets`, add its Babel plugin, and run `pod install` so
the `RNWorklets` pod is linked:

```sh
npm install react-native-worklets
```

```js
module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    "@nativescript/react-native/babel-plugin",
    "react-native-worklets/plugin",
  ],
};
```

`installWorklets()` is still exported for custom initialization, but it throws
when Worklets is unavailable or incompatible. `runOnUI()` throws when the
callback was not transformed into a Worklets function.

Obj-C blocks and JS-backed Obj-C method callbacks, including `NSObject.extend`
subclass overrides and delegates created with `createDelegate()`, should return
to React Native's JS thread for JS work. Use `jsInvoker()` when a callback can be
reached from a native caller thread:

```ts
UIView.animateWithDurationAnimationsCompletion(
  0.25,
  null,
  NativeScript.jsInvoker((finished) => {
    console.log("animation finished", finished);
  }),
);
```

Delegate, data-source, target/action, and `UIAction` callbacks are JS-side
callbacks. Treat their bodies as JS work. If a callback can be reached from a
background native thread and needs to mutate UIKit, wrap the mutation in
`NativeScript.runOnUI()` with a Worklets callback.

The package also includes a Babel plugin for directive-style JS callbacks:

```ts
someNativeApi(() => {
  "use js";
  console.log("back on JS");
});
```

The transform rewrites those callbacks to `NativeScript.jsInvoker(fn)`.
`"use ui"` is rejected in React Native; use a Worklets `"worklet"` callback with
`NativeScript.runOnUI()` instead.

## Defining native UIKit views in JS

Use `defineUIKitView()` to turn a NativeScript-created `UIView` tree into a
normal React Native component. The package owns the RN host view; your
definition owns the UIKit subtree. `create`, `update`, `mounted`, and `dispose`
run through the NativeScript UI dispatcher, so UIKit calls are safe and use the
same globals and iOS SDK types as NativeScript.

```tsx
import NativeScript, { defineUIKitView } from "@nativescript/react-native";
import type { UIKitViewRef } from "@nativescript/react-native";

NativeScript.init();

type BadgeProps = {
  title: string;
  tone?: "blue" | "green";
};

export const NativeBadge = defineUIKitView<BadgeProps, UIView>({
  name: "NativeBadge",
  create() {
    const view = UIView.alloc().initWithFrame(CGRectZero);
    const label = UILabel.alloc().initWithFrame(CGRectZero);
    label.tag = 1;
    label.textAlignment = NSTextAlignment.Center;
    label.textColor = UIColor.whiteColor;
    label.autoresizingMask =
      UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;
    view.addSubview(label);
    return view;
  },
  update(view, props) {
    view.backgroundColor =
      props.tone === "green"
        ? UIColor.systemGreenColor
        : UIColor.systemBlueColor;
    view.layer.cornerRadius = 12;
    view.clipsToBounds = true;
    const label = view.viewWithTag(1) as UILabel;
    label.text = props.title;
  },
});

<NativeBadge title="UIKit from JS" tone="blue" style={{ height: 48 }} />;
```

Forward a ref when you need imperative access:

```tsx
const badgeRef = useRef<UIKitViewRef<UIView>>(null);

await badgeRef.current?.runOnUI((view) => {
  "worklet";
  view.alpha = 0.8;
});

const measured = await badgeRef.current?.measureNative();
badgeRef.current?.invalidateNativeLayout();
```

React Native view props such as `style`, `testID`, accessibility props, responder
props, and `pointerEvents` go to the host component. Your own props go to the
UIKit definition; use `nativeProps(props)` when a plugin prop should also affect
the RN host. The `name` option is forwarded to the shared native host view as a
debug name, so native view descriptions can show `NativeScriptUIView` with your
definition name. It does not dynamically change the registered RN host component
tag.

### Lifecycle and context

`create`, `update`, `mounted`, and `dispose` run through the UIKit path. You do
not need to wrap UIKit work in `runOnUI()` inside those callbacks.

The first argument to `create` is also the current props object, so existing
`create(props)` definitions keep working. New code can use the context helpers:

```tsx
export const NativeSwitch = NativeScript.defineUIKitView<
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
    if (view.on !== props.value) {
      view.setOnAnimated(props.value, false);
    }
  },
});
```

Context helpers cover common native view-manager patterns:

- `ctx.emit(name, payload)` asynchronously calls the matching React prop.
- `ctx.targetAction(control, events, callback)` retains and removes a target/action helper.
- `ctx.delegate(object, protocol, implementation)` creates, assigns, and retains a delegate.
- `ctx.notification(name, object, callback)` observes and removes notifications.
- `ctx.observe(object, keyPath, callback)` observes and removes KVO.
- `ctx.retain(value)` keeps native helper objects alive for the component lifetime.
- `ctx.release(value)` releases a retained helper before component disposal.
- `ctx.dispose(callback)` runs cleanup once, in reverse registration order.
- `ctx.invalidateLayout()` schedules a fresh native measurement.

### State, delegates, and retention

Native proxies support JavaScript expando properties for local state. Native
property setters still win first, and unsupported names fall back to JS state:

```ts
NativeScript.runOnUI(() => {
  "worklet";
  const view = UIView.new();
  view.ownerState = { selected: false };
  view.tag = 42; // still calls UIKit's native tag setter
});
```

Use `WeakMap`, React state, or another external object when you want state that
is not tied to the lifetime of a specific native proxy.

UIKit often retains delegates and actions weakly or outlives the JavaScript
closure that created them. Retain those helper objects explicitly. Use
`ctx.retain()` inside `defineUIKitView()`, or a standalone retainer elsewhere:

```ts
const retainer = NativeScript.createRetainer();

const delegate = NativeScript.createDelegate<UIScrollViewDelegate>(
  UIScrollViewDelegate,
  {
    scrollViewDidScroll(scrollView) {
      NativeScript.runOnUI(() => {
        "worklet";
        scrollView.indicatorStyle = UIScrollViewIndicatorStyle.White;
      });
    },
  },
  { retainer },
);

scrollView.delegate = delegate;

// Later, when the owner is done:
scrollView.delegate = null;
retainer.dispose();
```

`createDelegate(protocols, methods, options)` accepts protocol objects or names.
If metadata was generated before a framework was loaded, use strings with
`NativeScript.loadFramework()` and `NativeScript.getProtocol()`:

```ts
NativeScript.loadFramework("QuickLook");

const dataSource = NativeScript.createDelegate(
  "QLPreviewControllerDataSource",
  {
    numberOfPreviewItemsInPreviewController() {
      return 1;
    },
    previewControllerPreviewItemAtIndex() {
      return NSURL.fileURLWithPath(path);
    },
  },
  { owner: ctx },
);
```

Use `NativeScript.retain(value)` and `NativeScript.release(value)` only for
process-lifetime helpers. Prefer `createRetainer()` or `ctx.retain()` for
component-scoped objects.

### Layout

React Native owns placement through Yoga. UIKit owns native behavior inside the
placed rectangle. Use `layout.sizing` to opt into native measurement:

- `fill`: fill the RN host bounds.
- `intrinsic`: use `intrinsicContentSize`.
- `sizeThatFits`: use `sizeThatFits` with style constraints.
- `autoLayout`: use `systemLayoutSizeFittingSize`.

Use `defaultSize`, `minSize`, and `maxSize` when a native view can report zero
or needs bounds during the first layout pass.

```tsx
const NativeTitle = NativeScript.defineUIKitView<{ text: string }, UILabel>({
  name: "NativeTitle",
  layout: {
    sizing: "intrinsic",
    defaultSize: { width: 1, height: 1 },
  },
  create() {
    return UILabel.new();
  },
  update(label, props, _previous, ctx) {
    label.text = props.text;
    ctx?.invalidateLayout();
  },
});
```

### Containers and view controllers

Use `defineUIKitContainer()` when React Native children should mount inside a
UIKit-owned content view:

```tsx
export const BlurCard = NativeScript.defineUIKitContainer({
  name: "BlurCard",
  create() {
    const rootView = UIVisualEffectView.alloc().initWithEffect(
      UIBlurEffect.effectWithStyle(UIBlurEffectStyle.SystemMaterial),
    );
    return {
      rootView,
      childrenView: rootView.contentView,
    };
  },
});

<BlurCard style={{ padding: 16 }}>
  <Text>React Native child content</Text>
</BlurCard>;
```

Use `defineUIViewController()` for APIs that require real child view-controller
containment:

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

### Building app-specific native UI

This package is intentionally low-level. It installs NativeScript's Native API
inside React Native and gives you lifecycle helpers; it does not ship opinionated
wrappers for tabs, maps, cameras, pickers, or other app components. Build those
as local components in your app or library:

- Use `defineUIKitView()` for one native `UIView`.
- Use `defineUIKitContainer()` when React Native children should mount inside a
  native `UIView`.
- Use `defineUIViewController()` when UIKit expects view-controller containment,
  such as tabs, navigation controllers, split views, document browsers, preview
  controllers, and presentation flows.
- Use `ctx.delegate()`, `ctx.targetAction()`, `ctx.retain()`, and
  `ctx.dispose()` for native callbacks and weakly-held helper objects.
- Use `NativeScript.isClassAvailable()` before touching SDK-new APIs.

For example, build native tabs with `UITabBarController` instead of measuring a
standalone `UITabBar` as a leaf RN view:

```tsx
type NativeTabsProps = {
  selectedIndex: number;
  onSelectedIndexChange?: (index: number) => void;
};

export const NativeTabs = NativeScript.defineUIViewController<
  NativeTabsProps,
  UITabBarController
>({
  name: "NativeTabs",
  createController(ctx) {
    const controller = UITabBarController.new();
    const viewControllers = TAB_ITEMS.map((item, index) => {
      const child = UIViewController.new();
      child.view.backgroundColor = UIColor.systemBackgroundColor;
      child.tabBarItem = UITabBarItem.alloc().initWithTitleImageSelectedImage(
        item.title,
        UIImage.systemImageNamed(item.symbol),
        UIImage.systemImageNamed(item.selectedSymbol),
      );
      child.tabBarItem.tag = index;
      return child;
    });

    controller.viewControllers = NSArray.arrayWithArray(viewControllers);
    ctx.delegate(controller, UITabBarControllerDelegate, {
      tabBarControllerDidSelectViewController(tabBarController) {
        ctx.emit("onSelectedIndexChange", tabBarController.selectedIndex);
      },
    });
    return controller;
  },
  update(controller, props) {
    controller.selectedIndex = props.selectedIndex;
  },
});

<NativeTabs
  selectedIndex={selectedIndex}
  onSelectedIndexChange={setSelectedIndex}
  style={{ flex: 1 }}
/>;
```

For modal UIKit controllers, find the top visible presenter and guard against
double presentation:

```ts
function topVisibleViewController(
  root = UIApplication.sharedApplication.keyWindow?.rootViewController,
) {
  let current = root;
  while (current?.presentedViewController) {
    current = current.presentedViewController;
  }
  if (current?.selectedViewController) {
    return topVisibleViewController(current.selectedViewController);
  }
  if (current?.visibleViewController) {
    return topVisibleViewController(current.visibleViewController);
  }
  return current;
}

await NativeScript.runOnUI(() => {
  "worklet";
  const presenter = topVisibleViewController();
  if (!presenter || presenter.presentedViewController) {
    return;
  }
  presenter.presentViewControllerAnimatedCompletion(controller, true, null);
});
```

### Availability and heavy UIKit classes

Use availability helpers before touching optional frameworks. Simulator and
device availability can differ for frameworks such as VisionKit, QuickLook, and
PassKit.

```ts
if (
  NativeScript.loadFramework("VisionKit") &&
  NativeScript.isClassAvailable("VNDocumentCameraViewController")
) {
  const CameraController = NativeScript.getClass<
    typeof VNDocumentCameraViewController
  >("VNDocumentCameraViewController");
  const controller = CameraController?.new();
}
```

`NativeScript.isFrameworkLoaded(nameOrPath)` checks an `NSBundle`;
`NativeScript.loadFramework(nameOrPath)` loads a system framework by name or a
specific `.framework` path; `NativeScript.getClass(name)` and
`NativeScript.getProtocol(name)` return dynamically available native references.

Class globals are lazy. Large UIKit classes such as `UITabBarController` can
have a wide inherited surface, so avoid forcing member enumeration with broad
reflection in hot paths. Constructing and direct property/method access stay
lazy; `Object.keys`, prototype introspection, and generated member lists are the
expensive path.

Objective-C exceptions thrown while dispatching through the bridge are converted
to JS errors where Objective-C can catch them. Process-level failures such as
`abort()`, fatal assertions, memory corruption, and some framework precondition
violations are not catchable; use availability checks and presentation guards
instead of relying on exceptions as control flow.

The package ships example definitions under `@nativescript/react-native/examples`.

The published package includes generated NativeScript metadata, the libffi
xcframework, and generated iOS SDK TypeScript declarations. Build it from the
repository root with:

```sh
npm run build-rn-turbomodule
```

The tarball is written to `packages/react-native/dist/` and copied to
`build/npm-tarballs/`.

To verify it inside a generated React Native iOS app:

```sh
npm run test-rn-turbomodule
```

## Using the package in a React Native app

1. Build or download the package tarball.
2. Install it in an RN app that has Hermes and the New Architecture enabled:

   ```sh
   npm install /path/to/nativescript-react-native-0.0.1.tgz react-native-worklets
   cd ios
   RCT_NEW_ARCH_ENABLED=1 USE_HERMES=1 pod install
   ```

3. Initialize it before using native APIs:

   ```ts
   import NativeScript from "@nativescript/react-native";

   NativeScript.init();

   await NativeScript.runOnUI(() => {
     "worklet";
     UIApplication.sharedApplication.keyWindow.tintColor =
       UIColor.systemPinkColor;
   });
   ```

4. Add the bundled NativeScript Babel plugin and the Worklets Babel plugin:

   ```js
   module.exports = {
     presets: ["module:@react-native/babel-preset"],
     plugins: [
       "@nativescript/react-native/babel-plugin",
       "react-native-worklets/plugin",
     ],
   };
   ```

## Using the package in an Expo app

Expo Go cannot load this package because it contains custom native code. Use an
Expo development build, EAS Build, or `npx expo run:ios`.

1. Install the package:

   ```sh
   npx expo install @nativescript/react-native react-native-worklets
   ```

   When testing a local tarball:

   ```sh
   npm install /path/to/nativescript-react-native-0.0.1.tgz
   ```

2. Add the config plugin to `app.json` or `app.config.js`:

   ```json
   {
     "expo": {
       "plugins": ["@nativescript/react-native"]
     }
   }
   ```

   The plugin configures iOS for Hermes and the React Native New Architecture,
   which are required by this JSI TurboModule. It also adds the
   `@nativescript/react-native/babel-plugin` and `react-native-worklets/plugin`
   transforms to `babel.config.js` so `"use js"` and worklet callbacks work in
   Expo bundles.

3. Prebuild and run the iOS development build:

   ```sh
   npx expo prebuild --platform ios
   npx expo run:ios
   ```

4. Initialize NativeScript in app code before using native APIs:

   ```tsx
   import NativeScript, { defineUIKitView } from "@nativescript/react-native";

   NativeScript.init();

   const NativeBadge = defineUIKitView<{ title: string }, UIView>({
     name: "NativeBadge",
     create() {
       const view = UIView.alloc().initWithFrame(CGRectZero);
       const label = UILabel.alloc().initWithFrame(CGRectZero);
       label.tag = 1;
       label.textAlignment = NSTextAlignment.Center;
       view.addSubview(label);
       return view;
     },
     update(view, props) {
       view.backgroundColor = UIColor.systemBlueColor;
       const label = view.viewWithTag(1) as UILabel;
       label.text = props.title;
     },
   });
   ```

Set `{ "babelPlugin": false }` in the config plugin options if you prefer to add
the NativeScript and Worklets Babel plugins manually.

The plugin also writes `nativescript.react-native.json` so metadata options are
visible to native builds. You can pass metadata inputs when the app uses
Objective-C-visible pods or extra system frameworks:

```json
{
  "expo": {
    "plugins": [
      [
        "@nativescript/react-native",
        {
          "metadata": {
            "includePods": ["SomeObjCSDK"],
            "includeSystemFrameworks": ["UIKit", "MapKit", "WebKit"]
          }
        }
      ]
    ]
  }
}
```

## Bare React Native setup helper

The tarball includes a small CLI for bare RN projects:

```sh
npx nativescript-rn configure
npx nativescript-rn generate-metadata --check
cd ios
RCT_NEW_ARCH_ENABLED=1 USE_HERMES=1 pod install
```

`configure` adds the bundled NativeScript and Worklets Babel plugins when
missing, writes
`nativescript.react-native.json`, and warns when the app is not configured for
Hermes and the New Architecture. The command is intentionally conservative and
does not make destructive native project edits.

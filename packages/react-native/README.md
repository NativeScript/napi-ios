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

For UIKit work that must happen on the main thread, pass a callback to the JSI
host object's `runOnUI()` helper. The callback itself stays on React Native's JS
thread; NativeScript native calls made inside the callback are synchronously
performed on UIKit's main thread.

```ts
await NativeScript.runOnUI(() => {
  UIApplication.sharedApplication.keyWindow.tintColor = UIColor.systemPinkColor;
});
```

## Defining native UIKit views in JS

Use `defineUIKitView()` to turn a NativeScript-created `UIView` tree into a
normal React Native component. The package owns the RN host view; your
definition owns the UIKit subtree. `create`, `update`, `mounted`, and `dispose`
run through the NativeScript UI dispatcher, so UIKit calls are safe and use the
same globals and iOS SDK types as NativeScript.

```tsx
import NativeScript, {defineUIKitView} from "@nativescript/react-native";
import type {UIKitViewRef} from "@nativescript/react-native";

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
      props.tone === "green" ? UIColor.systemGreenColor : UIColor.systemBlueColor;
    view.layer.cornerRadius = 12;
    view.clipsToBounds = true;
    const label = view.viewWithTag(1) as UILabel;
    label.text = props.title;
  },
});

<NativeBadge title="UIKit from JS" tone="blue" style={{height: 48}} />;
```

Forward a ref when you need imperative access:

```tsx
const badgeRef = useRef<UIKitViewRef<UIView>>(null);

await badgeRef.current?.runOnUI((view) => {
  view.alpha = 0.8;
});
```

React Native view props such as `style`, `testID`, accessibility props, responder
props, and `pointerEvents` go to the host component. Your own props go to the
UIKit definition; use `nativeProps(props)` when a plugin prop should also affect
the RN host. The `name` option is forwarded to the shared native host view as a
debug name, so native view descriptions can show `NativeScriptUIView` with your
definition name. It does not dynamically change the registered RN host component
tag.

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
   npm install /path/to/nativescript-react-native-0.0.1.tgz
   cd ios
   RCT_NEW_ARCH_ENABLED=1 USE_HERMES=1 pod install
   ```

3. Initialize it before using native APIs:

   ```ts
   import NativeScript from "@nativescript/react-native";

   NativeScript.init();

   await NativeScript.runOnUI(() => {
     UIApplication.sharedApplication.keyWindow.tintColor =
       UIColor.systemPinkColor;
   });
   ```

## Using the package in an Expo app

Expo Go cannot load this package because it contains custom native code. Use an
Expo development build, EAS Build, or `npx expo run:ios`.

1. Install the package:

   ```sh
   npx expo install @nativescript/react-native
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
   which are required by this JSI TurboModule.

3. Prebuild and run the iOS development build:

   ```sh
   npx expo prebuild --platform ios
   npx expo run:ios
   ```

4. Initialize NativeScript in app code before using native APIs:

   ```tsx
   import NativeScript, {defineUIKitView} from "@nativescript/react-native";

   NativeScript.init();

   const NativeBadge = defineUIKitView<{title: string}, UIView>({
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

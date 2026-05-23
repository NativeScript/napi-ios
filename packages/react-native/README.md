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

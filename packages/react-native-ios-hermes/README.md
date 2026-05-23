# @nativescript/react-native-ios-hermes

React Native TurboModule wrapper for the NativeScript Native API JSI bridge on
Hermes.

The module exposes one small TurboModule whose `install()` method attaches the
NativeScript Native API host object to `globalThis.__nativeScriptNativeApi` and
installs lazy NativeScript-style globals for classes and C functions. The host
object itself is pure JSI and is shared with the NativeScript Hermes runtime.

```ts
import NativeScriptNativeApi from "@nativescript/react-native-ios-hermes";

NativeScriptNativeApi.install();

const object = NSObject.new();
```

For UIKit work that must happen on the main thread, pass a callback to the JSI
host object's `runOnUI()` helper. The callback itself stays on React Native's JS
thread; NativeScript native calls made inside the callback are synchronously
performed on UIKit's main thread.

```ts
await NativeScriptNativeApi.runOnUI(() => {
  UIApplication.sharedApplication.keyWindow.tintColor = UIColor.systemPinkColor;
});
```

The published package must include generated NativeScript metadata and the
libffi xcframework. Build it from the repository root with:

```sh
npm run build-rn-ios-hermes-turbomodule
```

To verify it inside a generated React Native iOS app:

```sh
npm run test-rn-ios-hermes-turbomodule
```

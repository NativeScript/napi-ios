# @nativescript/react-native-ios-hermes

React Native TurboModule wrapper for the NativeScript Native API JSI bridge on
Hermes.

The module exposes one small TurboModule whose `install()` method attaches the
NativeScript Native API host object to `globalThis.__nativeScriptNativeApi`.
The host object itself is pure JSI and is shared with the NativeScript Hermes
runtime.

```ts
import NativeScriptNativeApi from "@nativescript/react-native-ios-hermes";

NativeScriptNativeApi.install();

const api = globalThis.__nativeScriptNativeApi;
const NSObject = api.getClass("NSObject");
```

For UIKit work that must happen on the main thread, pass a callback to the JSI
host object's `runOnUI()` helper. The callback itself stays on React Native's JS
thread; NativeScript native calls made inside the callback are synchronously
performed on UIKit's main thread.

```ts
await api.runOnUI(() => {
  const UIColor = api.getClass("UIColor");
  const UIApplication = api.getClass("UIApplication");
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

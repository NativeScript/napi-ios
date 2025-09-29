/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./types/index.d.ts" />

/**
 * The function to initialize all the JS bindings to the iOS SDK, allowing you
 * to call iOS APIs from JS (e.g. `NSString.alloc().init()`).
 *
 * For NativeScript apps (i.e. apps using NativeScript Core), don't call this!
 * The initialization will be done for you under-the-hood from the native side.
 *
 * For React Native apps, and any other hosts that implement the
 * `react-native-node-api` [prebuilds standard](https://github.com/callstackincubator/react-native-node-api/blob/9b231c14459b62d7df33360f930a00343d8c46e6/docs/PREBUILDS.md),
 * call this before calling any iOS APIs from JS. It's simplest to call it early
 * on in the entrypoint of your app.
 *
 * It's not safe to call this API twice - so if you put it in a useEffect()
 * hook, be careful about the hook getting called twice due to a HMR update or
 * React Strict Mode.
 */
export function init(): void;

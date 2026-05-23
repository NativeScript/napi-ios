# React Native iOS Hermes Demo

This demo is generated into `build/react-native-ios-hermes-demo` so the
repository does not need to commit React Native boilerplate.

Run it from the repository root:

```sh
npm run demo-rn-ios-hermes-turbomodule
```

The generated app installs the local
`@nativescript/react-native-ios-hermes` tarball, enables Hermes and the New
Architecture, then launches an iOS simulator app. The app installs the
NativeScript Native API JSI host object and uses `runOnUI` to execute a small
UIKit tweak from JavaScript while dispatching the native UIKit calls to the main
thread. The script waits for a simulator marker after the tweak succeeds.

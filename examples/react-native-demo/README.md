# React Native NativeScript Demo

This demo is generated into `build/react-native-demo` so the
repository does not need to commit React Native boilerplate.

Run it from the repository root:

```sh
npm run demo-rn-turbomodule
```

The generated app installs the local
`@nativescript/react-native` tarball, enables Hermes and the New
Architecture, then launches an iOS simulator app. The app installs the
NativeScript Native API JSI host object with `NativeScript.init()`, installs
NativeScript-style globals such as `UIApplication` and `UIColor`, and uses
`runOnUI` to execute a small UIKit tweak from JavaScript while dispatching the
native UIKit calls to the main thread. The script waits for a simulator marker
after the tweak succeeds.

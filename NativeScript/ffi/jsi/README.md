# Native API JSI bridge

This directory contains the Hermes-first JSI entrypoint for NativeScript Native
API access.

The core installer is engine-host agnostic:

```cpp
nativescript::NativeApiJsiConfig config;
config.metadataPath = metadataPath;
config.metadataPtr = metadataPtr;
nativescript::InstallNativeApiJSI(runtime, config);
```

NativeScript's Hermes runtime installs this automatically as
`globalThis.__nativeScriptNativeApi`.

React Native integrations should include `NativeApiJsiReactNative.h` from a
TurboModule implementation and pass the module's JS/UI `CallInvoker`s:

```cpp
nativescript::InstallReactNativeNativeApiJSI(
    runtime, jsInvoker, uiInvoker, metadataPath, metadataPtr);
```

The React Native adapter is intentionally only a scheduler/config shim. The
native API host object, metadata loading, primitive C function dispatch,
Objective-C class/object handles, and selector invocation live in the shared
JSI implementation so they can be used by both NativeScript Hermes and a React
Native TurboModule without going through Node-API.

The direct JSI backend is still moving toward full NativeScript bridge parity.
It covers the metadata-backed Objective-C class/function/constant/enum paths
needed by the React Native TurboModule, including NativeScript-style global
lookup and main-thread native dispatch. Deeper interop features should be
validated against the full NativeScript bridge until equivalent ownership and
lifetime handling is present in the JSI layer.

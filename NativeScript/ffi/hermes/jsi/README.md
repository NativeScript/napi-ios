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
needed by the React Native TurboModule, plus metadata-backed structs/unions,
primitive array/vector value marshalling, JS blocks, C function pointer
callbacks, protocol wrappers, pointer/reference helpers, and the core `interop`
helpers (`Pointer`, `Reference`, `sizeof`, `alloc`, `free`, `adopt`,
`handleof`, `stringFromCString`, `bufferFromData`, and `addProtocol`). Struct
and union constructors, plus protocol symbols, are installed on `globalThis`
along with `interop` so common NativeScript-style calls such as
`CGRect({ origin, size })`, `interop.sizeof(CGRect)`, and
`interop.handleof(value)` work through JSI.

The remaining parity work is class-builder heavy: `interop.addMethod` and
JavaScript-defined Objective-C subclasses still need the full method IMP
installation layer before pure JSI can be considered fully compatible with the
Node-API bridge.

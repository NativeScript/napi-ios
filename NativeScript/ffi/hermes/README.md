# Native API Hermes JSI backend

This directory owns the Hermes-facing Native API entrypoint:

- `NativeApiJsi.h` exposes the public JSI install/create API.
- `NativeApiJsi.mm` binds Hermes JSI types to the shared direct bridge core.
- `NativeApiJsiReactNative.h` adapts React Native `CallInvoker`s to the JSI
  scheduler config used by the TurboModule.
- `NativeApiJsiSignatureDispatch.h` wires Hermes generated signature dispatch
  tables into direct native invocation.

The reusable bridge implementation lives under `../direct` with `NativeApiDirect`
names. V8, JSC, QuickJS, and Hermes all compile that direct bridge against their
own runtime facade; only Hermes exposes the real `facebook::jsi` API.

React Native integrations should include `NativeApiJsiReactNative.h` from a
TurboModule implementation and pass the module's JS/UI `CallInvoker`s:

```cpp
nativescript::InstallReactNativeNativeApiJSI(
    runtime, jsInvoker, uiInvoker, metadataPath, metadataPtr);
```

# Objective-C Dispatch Benchmarks

This benchmark compares hot Objective-C dispatch shapes across the generated
signature dispatch runtime and the PR #366 AOT direct-call runtime.

The benchmark body is plain NativeScript JavaScript:

- `objc-dispatch-benchmarks.js`

The runner can execute it in three modes:

- `napi-node`: fastest smoke run using the packaged macOS Node-API runtime.
- `napi-ios`: builds a temporary iOS app from the packaged `@nativescript/ios`
  template and runs it in Simulator.
- `legacy-ios`: temporarily injects the benchmark into the PR branch
  `TestRunner` app, builds it, runs it in Simulator, then restores the app
  entry point.

For V8 builds, `gsd-off` still uses the V8-native callback/marshalling path,
but generated signature dispatch lookup is disabled so Objective-C calls fall
back to the dynamic prepared/`ffi_call` path. This keeps the comparison focused
on the generated dispatch win instead of accidentally measuring a hand-written
direct `objc_msgSend` fast path.

Examples:

```sh
npm run benchmark:objc-dispatch -- --runtime napi-node --iterations 100000
npm run benchmark:objc-dispatch -- --runtime napi-ios,legacy-ios --iterations 250000
npm run benchmark:objc-dispatch -- --runtime all --include-napi-gsd-off
```

Useful options:

```sh
--legacy-repo /path/to/NativeScript/ios
--destination "platform=iOS Simulator,id=<UDID>"
--napi-package-tgz /path/to/nativescript-ios.tgz
--napi-v8-napi-backend-package-tgz /path/to/nativescript-ios-v8-napi-backend.tgz
--iterations 250000
--include-napi-gsd-off
--include-napi-v8-napi-backend
```

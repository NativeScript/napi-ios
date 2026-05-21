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

The default benchmark cases include calls covered by the hand-written V8 direct
path and calls that rely on generated signature dispatch, so `gsd-on` versus
`gsd-off` shows both the shared callback-path baseline and the GSD-specific
delta.

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

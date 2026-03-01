const isNativeScriptRuntime =
  typeof globalThis.interop !== "undefined" ||
  typeof globalThis.NSObject !== "undefined";

if (!isNativeScriptRuntime) {
  // deno-lint-ignore no-process-globals
  if (typeof process !== "undefined" && typeof process.dlopen === "function") {
    // ===
    // If we're in a Node-like environment (e.g. Node.js, Deno, or Bun)
    // ===

    const path =
      "./build/RelWithDebInfo/NativeScript.apple.node/macos-arm64_x86_64/NativeScript.framework/Versions/A/NativeScript";

    let metaURL = import.meta.url;
    if (!metaURL.includes("://")) {
      metaURL = "file://" + metaURL;
    }

    const module = { exports: {} };

    // deno-lint-ignore no-process-globals
    process.dlopen(module, new URL(path, metaURL).pathname);

    module.exports.init(
      // deno-lint-ignore no-process-globals
      process.env.METADATA_PATH,
    );
  } else if (typeof require !== "undefined") {
    // ===
    // If we're in a React Native-like environment
    // ===

    // Hermes doesn't support MJS, so fall back to CJS. Really, the bundler
    // shouldn't have resolved this file in the first place.

    // react-native-node-api/babel-plugin will rewrite this to:
    //   module.exports = require("react-native-node-api").requireNodeAddon("-nativescript-macos-node-api—-NativeScript");
    module.exports = require("./build/RelWithDebInfo/NativeScript.apple.node");
  }
}

const isNativeScriptRuntime =
  typeof globalThis.interop !== "undefined" ||
  typeof globalThis.NSObject !== "undefined";

if (!isNativeScriptRuntime) {
  // deno-lint-ignore no-process-globals
  if (typeof process !== "undefined" && typeof process.dlopen === "function") {
    // ===
    // If we're in a Node-like environment (e.g. Node.js, Deno, or Bun)
    // ===

    const module = { exports: {} };
    process.dlopen(
      module,
      require("node:path").resolve(
        __dirname,
        "./build/RelWithDebInfo/NativeScript.apple.node/macos-arm64/NativeScript.framework/Versions/A/NativeScript",
      ),
    );
    module.exports.init(process.env.METADATA_PATH);
  } else if (typeof require !== "undefined") {
    // ===
    // If we're in a React Native-like environment
    // ===

    // react-native-node-api/babel-plugin will rewrite this to:
    //   module.exports = require("react-native-node-api").requireNodeAddon("-nativescript-macos-node-api—-NativeScript");
    module.exports = require("./build/RelWithDebInfo/NativeScript.apple.node");
  }
}

const isNativeScriptRuntime =
  typeof globalThis.interop !== "undefined" ||
  typeof globalThis.NSObject !== "undefined";

if (!isNativeScriptRuntime) {
  // deno-lint-ignore no-process-globals
  if (
    typeof process !== "undefined" &&
    typeof process.dlopen === "function" &&
    typeof process.env === "object" &&
    typeof URL === "function" &&
    typeof __filename === "string"
  ) {
    // ===
    // If we're in a Node-like environment (e.g. Node.js, Deno, or Bun)
    // ===

    const module = { exports: {} };
    process.dlopen(
      module,
      new URL(
        "./build/RelWithDebInfo/NativeScript.apple.node/macos-arm64/NativeScript.framework/Versions/A/NativeScript",
        `file://${__filename}`,
      ).pathname,
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

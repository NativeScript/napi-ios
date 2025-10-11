if (typeof interop === "undefined") {
  // deno-lint-ignore no-process-globals
  if (process) {
    // ===
    // If we're in a Node-like environment (e.g. Node.js, Deno, or Bun)
    // ===

    const path =
      "./build/RelWithDebInfo/NativeScript.apple.node/macos-arm64_x86_64/NativeScript.framework/Versions/0.1.0/NativeScript";

    let metaURL = import.meta.url;
    if (!metaURL.includes("://")) {
      metaURL = "file://" + metaURL;
    }

    const module = { exports: {} };

    // deno-lint-ignore no-process-globals
    process.dlopen(module, new URL(path, metaURL).pathname);

    module.exports.init(
      // deno-lint-ignore no-process-globals
      process.env.METADATA_PATH
    );
  } else {
    // ===
    // If we're in a React Native-like environment
    // ===

    // react-native-node-api/babel-plugin will rewrite this to:
    //   module.exports = require("react-native-node-api").requireNodeAddon("-nativescript-macos-node-api—-NativeScript");
    module.exports = require("./build/RelWithDebInfo/NativeScript.apple.node");
  }
}

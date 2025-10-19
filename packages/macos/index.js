if (typeof interop === "undefined") {
  // deno-lint-ignore no-process-globals
  if (process) {
    // ===
    // If we're in a Node-like environment (e.g. Node.js, Deno, or Bun)
    // ===

    const path =
      "./build/RelWithDebInfo/NativeScript.xcframework/macos-arm64_x86_64/NativeScript.framework/Versions/0.1.0/NativeScript";

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

    // Following https://github.com/callstackincubator/react-native-node-api/discussions/262:
    // This leads to: @rpath/NativeScript.framework/NativeScript
    module.exports = require("react-native-node-api").requireNodeAddon(
      "NativeScript"
    );
  }
}

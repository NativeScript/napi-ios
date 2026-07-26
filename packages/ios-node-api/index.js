if (typeof interop === "undefined") {
  // deno-lint-ignore no-process-globals
  if (process) {
    // ===
    // If we're in a Node-like environment (e.g. Node.js for Mobile)
    // ===

    const path =
      "./build/RelWithDebInfo/NativeScript.apple.node/ios-arm64/NativeScript.framework/NativeScript";

    let metaURL = import.meta.url;
    if (!metaURL.includes("://")) {
      metaURL = "file://" + metaURL;
    }

    const module = { exports: {} };

    // `URL.pathname` is percent-encoded, but `process.dlopen` takes a filesystem path. Without
    // decoding, a space in the path arrives as "%20" and the load fails with "no such file" —
    // which happens for any app bundle whose path contains a space, e.g.
    // /Applications/My App.app/… → /Applications/My%20App.app/…
    // deno-lint-ignore no-process-globals
    process.dlopen(module, decodeURIComponent(new URL(path, metaURL).pathname));

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

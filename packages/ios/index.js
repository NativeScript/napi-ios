// react-native-node-api/babel-plugin will rewrite this path to:
//   module.exports = require("react-native-node-api").requireNodeAddon("-nativescript-ios-node-api—-NativeScript");
// ... And some other build-time tooling in react-native-node-api searches this
// package for `*.node` files to point `requireNodeAddon()` to the true path.
//
// This is why we've added react-native-node-api as a peer dependency. We've
// marked it as optional, however, because other hosts may choose not to use
// that Babel transform.
module.exports = require("./build/Debug/NativeScript.apple.node");

// Out of interest, we could alternatively write the path as follows:
//   module.exports = require("bindings")("NativeScript");
//
// react-native-node-api/babel-plugin would recognise and rewrite it all the
// same. That approach might make sense if we were also supporting Node.js with
// this package (as in the case of Node.js, you'd omit the Babel transform and
// you would actually depend on the "bindings" package), but unless we one day
// merge the iOS and macOS packages into one, it feels better to reduce the
// amount of magic involved.

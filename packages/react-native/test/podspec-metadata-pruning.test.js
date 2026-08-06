const assert = require("assert");
const fs = require("fs");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..");
const podspec = fs.readFileSync(path.join(packageRoot, "NativeScriptNativeApi.podspec"), "utf8");

assert(
  podspec.includes(':name => "Prune NativeScript metadata resources"') &&
    podspec.includes(":execution_position => :after_compile") &&
    podspec.includes('bundle="${BUILT_PRODUCTS_DIR}/NativeScriptNativeApi.bundle"'),
  "NativeScriptNativeApi podspec should install a build phase that prunes generated metadata resources",
);

assert(
  podspec.includes("metadata.ios.arm64.nsmd") &&
    podspec.includes("metadata.ios-sim.$arch.nsmd") &&
    podspec.includes('case "$PLATFORM_NAME" in') &&
    podspec.includes("iphoneos)") &&
    podspec.includes("iphonesimulator)"),
  "NativeScriptNativeApi metadata pruning should keep only the metadata file needed for the current SDK platform",
);

assert(
  podspec.includes('rm -f "$file"') &&
    podspec.includes('for file in "$bundle"/metadata*.nsmd; do'),
  "NativeScriptNativeApi metadata pruning should remove unused metadata files from the built resource bundle",
);

console.log("podspec metadata pruning tests passed");

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(packageRoot, relativePath), "utf8");
}

const index = read("src/index.ts");
assert(
  index.includes("export type UIKitDisposeResult"),
  "public source should define UIKitDisposeResult",
);
assert(
  index.includes("disposeResult?.removeHostView !== false"),
  "disposeRegisteredUIKitHost should honor removeHostView=false",
);
assert(
  index.includes("return disposeHost?.(nativeView, disposeProps, context);"),
  "host adapters should propagate dispose return values",
);

const declarations = read("src/index.d.ts");
assert(
  declarations.includes("export type UIKitDisposeResult"),
  "public declarations should expose UIKitDisposeResult",
);
assert(
  declarations.includes("removeHostView?: boolean"),
  "UIKitDisposeResult should expose generic host-view removal control",
);
assert(
  declarations.includes(") => UIKitDisposeResult"),
  "dispose declarations should return UIKitDisposeResult",
);

console.log("uikit host dispose API tests passed");

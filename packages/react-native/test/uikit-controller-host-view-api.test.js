const assert = require("assert");
const fs = require("fs");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(packageRoot, relativePath), "utf8");
}

const index = read("src/index.ts");
assert(
  index.includes("hostView?: (controller: Controller) => unknown"),
  "defineUIViewController should expose a generic hostView resolver",
);
assert(
  index.includes("hostView: definition.hostView?.(controller) ?? controllerRecord.view"),
  "defineUIViewController should use the resolved host view before falling back to controller.view",
);

const declarations = read("src/index.d.ts");
assert(
  declarations.includes("hostView?: (controller: Controller) => unknown"),
  "public declarations should expose UIViewControllerDefinition.hostView",
);

const nativeHost = read("ios/NativeScriptUIView.mm");
assert(
  nativeHost.includes("if (_nativeViewHandle.length == 0) {\n      [self setNativeView:_viewController.view];"),
  "NativeScriptUIView should not overwrite an explicit native host view with controller.view",
);
assert(
  nativeHost.includes("[self attachViewControllerIfPossible];"),
  "NativeScriptUIView should still attach the controller for lifecycle when a custom host view is used",
);

console.log("uikit controller host-view API tests passed");

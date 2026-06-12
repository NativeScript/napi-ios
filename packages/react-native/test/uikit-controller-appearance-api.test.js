const assert = require("assert");
const fs = require("fs");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(packageRoot, relativePath), "utf8");
}

const hostView = read("ios/NativeScriptUIView.mm");

assert(
  hostView.includes("NativeScriptShouldForwardControllerAppearance"),
  "NativeScriptUIView should centralize visible-controller appearance fallback checks",
);
assert(
  hostView.includes("NativeScriptHostedViewContainsControllerView"),
  "NativeScriptUIView should detect when the hosted native view contains the controller view",
);
assert(
  hostView.includes("[hostedViewToReinsert removeFromSuperview];") &&
    hostView.includes("[parent addChildViewController:_viewController];") &&
    hostView.includes("[super insertSubview:hostedViewToReinsert atIndex:targetIndex];") &&
    hostView.includes("[_viewController didMoveToParentViewController:parent];"),
  "NativeScriptUIView should add child controllers before reinserting hosted visible views",
);
assert(
  hostView.includes(
    "hostedViewToReinsert == nil && NativeScriptShouldForwardControllerAppearance(_viewController)",
  ),
  "NativeScriptUIView should only manually forward appearance when it cannot re-order the hosted view",
);
assert(
  hostView.includes("[_viewController beginAppearanceTransition:YES animated:NO];") &&
    hostView.includes("[_viewController beginAppearanceTransition:NO animated:NO];") &&
    hostView.includes("[_viewController endAppearanceTransition];"),
  "NativeScriptUIView should retain manual appearance forwarding as a fallback",
);

console.log("uikit controller appearance API tests passed");

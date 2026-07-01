const assert = require("assert");
const fs = require("fs");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(packageRoot, relativePath), "utf8");
}

const index = read("src/index.ts");
assert(
  index.includes("gestureAction("),
  "UIKit context should expose a gestureAction helper",
);
assert(
  index.includes("targetAction(control, events, callback)"),
  "UIKit context should expose a targetAction helper",
);
assert(
  index.includes("actionTarget(callback)"),
  "UIKit context should expose a generic target/action helper",
);
assert(
  index.includes("function invokeNativeScriptCallback("),
  "UIKit native callbacks should route through a shared callback scheduler",
);
assert(
  index.includes('nativeScriptCallbackThread(callback) !== "js"'),
  "callback scheduler should distinguish JS-owned callbacks from runtime callbacks",
);
assert(
  index.includes("workletsProxy.scheduleOnRN(handler, serializer(args))"),
  "JS-owned UIKit callbacks should schedule asynchronously onto the RN runtime",
);
assert(
  index.includes("invokeNativeScriptCallback(callback, [], () => disposed)"),
  "targetAction should honor callback thread policy instead of calling callbacks synchronously",
);
assert(
  index.includes("nativeGesture.addTargetAction(target, selector)"),
  "gestureAction should attach a target/action to UIGestureRecognizer",
);
assert(
  index.includes("nativeGesture.removeTargetAction(target, selector)"),
  "gestureAction should remove the target/action on dispose",
);
assert(
  index.includes("callback(sender ?? gesture)"),
  "gestureAction should pass the recognizer sender to the callback",
);
assert(
  index.includes("invokeNativeScriptCallback(callback, [sender], () => disposed)"),
  "actionTarget should honor callback thread policy and pass the sender",
);
assert(
  index.includes('action: "nativeScriptHandleAction:"'),
  "actionTarget should return the Objective-C selector name",
);

const declarations = read("src/index.d.ts");
assert(
  declarations.includes("gestureAction("),
  "public declarations should expose gestureAction",
);
assert(
  declarations.includes("callback: (gesture: unknown) => void"),
  "gestureAction declarations should pass the recognizer to callbacks",
);
assert(
  declarations.includes("actionTarget(callback: (sender: unknown) => void)"),
  "public declarations should expose generic actionTarget",
);

console.log("uikit gesture action API tests passed");

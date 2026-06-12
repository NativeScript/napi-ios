const assert = require("assert");
const fs = require("fs");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(packageRoot, relativePath), "utf8");
}

for (const relativePath of [
  "ios/NativeScriptUIView.mm",
  "ios/Fabric/NativeScriptUIViewComponentView.mm",
]) {
  const source = read(relativePath);
  assert(
    source.includes("PointInsideTabBarHitArea"),
    `${relativePath} should gate tab bar passthrough on the tab bar hit area`,
  );
  assert(
    source.includes("EffectiveTabBarHitBounds"),
    `${relativePath} should cap oversized tab bar visual bounds before hit testing`,
  );
  assert(
    source.includes("CGRectInset(bounds, -24, -16)"),
    `${relativePath} should allow a small expanded tab bar hit target`,
  );
  assert(
    !source.includes("VisibleHitViewAtPoint"),
    `${relativePath} should not use recursive tab bar descendants as the passthrough hit area`,
  );
}

console.log("uikit tab bar hit-test tests passed");

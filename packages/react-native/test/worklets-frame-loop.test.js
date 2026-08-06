const assert = require("assert");
const fs = require("fs");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..");
const index = fs.readFileSync(path.join(packageRoot, "src/index.ts"), "utf8");

assert(
  index.includes("function installIdleAwareWorkletsFrameLoop"),
  "runtime should install an idle-aware Worklets frame loop",
);
assert(
  index.includes("__nativeScriptIdleAwareWorkletsFrameLoop"),
  "frame loop install should be idempotent inside the UI runtime",
);
assert(
  index.includes("__nativeScriptNativeRequestAnimationFrame"),
  "frame loop should retain the native RAF host function before overriding it",
);
assert(
  index.includes("globalObject.__nativeRequestAnimationFrame = () => undefined"),
  "frame loop should stop react-native-worklets' perpetual startup frame pump",
);
assert(
  index.includes("scheduleNativeFlush();"),
  "requestAnimationFrame should schedule native frames only when callbacks exist",
);
assert(
  index.includes("NSTimerClass.timerWithTimeIntervalRepeatsBlock"),
  "UI runtime timers should use native NSTimer instead of RAF polling",
);
assert(
  index.includes('nativeApiClass("NSTimer")') &&
    index.includes('nativeApiClass("NSRunLoop")') &&
    !index.includes("globalObject.NSTimer") &&
    !index.includes("globalObject.NSRunLoop"),
  "UI runtime timers should resolve Foundation classes lazily through the Native API host",
);
assert(
  index.includes("NSRunLoopClass.mainRunLoop.addTimerForMode"),
  "native UI timers should run in common run-loop modes",
);
assert(
  index.includes("function runtimeTimerInvoker"),
  "native UI timers should mark callbacks for the owning Worklets runtime",
);
assert(
  index.includes("Math.max(0.001, numericDelay / 1000)"),
  "native UI timers should treat zero-delay JS timers as next-run-loop timers",
);
assert(
  index.includes('value: "runtime"'),
  "native UI timer callbacks should use the generic runtime callback policy",
);
assert(
  index.includes("globalObject.setTimeout = ("),
  "Worklets UI runtime setTimeout should be overridden by NativeScript",
);
assert(
  index.includes("globalObject.setInterval = ("),
  "Worklets UI runtime setInterval should be overridden by NativeScript",
);
assert(
  index.includes(".runOnUIAsync(installIdleAwareWorkletsFrameLoop)"),
  "NativeScript worklet install should patch the UI runtime frame loop",
);

console.log("worklets frame loop tests passed");

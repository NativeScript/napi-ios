const assert = require("assert");
const fs = require("fs");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..");
const index = fs.readFileSync(path.join(packageRoot, "src/index.ts"), "utf8");

assert(
  index.includes("function workletsSetupError(reason: string, cause?: unknown)"),
  "Worklets setup errors should accept the underlying failure as a cause",
);
assert(
  index.includes("formatWorkletsSetupCause(cause)") &&
    index.includes('const causeMessage = formatWorkletsSetupCause(cause);'),
  "Worklets setup errors should include the underlying failure message when available",
);
assert(
  index.includes('typeof errorLike.message === "string"'),
  "Worklets setup errors should include messages from cross-runtime error-like objects",
);
assert(
  index.includes("setupError.cause = cause;"),
  "Worklets setup errors should preserve the original error object on cause",
);
assert(
  index.includes(
    "throw workletsSetupError(\n      `NativeScript.runOnUI requires ${workletsPackageName}`,\n      error,\n    );",
  ),
  "react-native-worklets require failures should not be masked by a generic setup error",
);

console.log("worklets setup error tests passed");

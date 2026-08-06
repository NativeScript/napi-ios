const assert = require("assert");
const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "../../..");
const runner = fs.readFileSync(path.join(repoRoot, "scripts/run-tests-ios.js"), "utf8");
const ci = fs.readFileSync(path.join(repoRoot, ".github/workflows/ci.yml"), "utf8");

assert(
  runner.includes("function collectSimulatorProcessSnapshot(udid, options = {})") &&
    runner.includes("if (options.includeErrors)") &&
    runner.includes("WARNING: unable to collect simulator process snapshot") &&
    runner.includes("collectSimulatorProcessSnapshot(udid, { includeErrors: true })"),
  "iOS test runner diagnostics should report simctl ps failures without throwing away the test timeout context",
);

assert(
  runner.includes("WARNING: unable to collect recent simulator logs") &&
    runner.includes("simctl exited ${result.status}"),
  "iOS test runner diagnostics should report simctl log collection failures without aborting diagnostics",
);

assert(
  ci.includes('IOS_TEST_VERBOSE_SPECS: "1"'),
  "CI should emit per-spec iOS simulator logs so hung runtime specs are identifiable",
);

console.log("iOS runner diagnostics tests passed");

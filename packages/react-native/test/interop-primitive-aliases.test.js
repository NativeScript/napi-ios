const assert = require("assert");
const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "../../..");
const sources = [
  "NativeScript/ffi/objc/shared/bridge/TypeConv.mm",
  "packages/react-native/native-api/ffi/objc/shared/bridge/TypeConv.mm",
];

for (const relativePath of sources) {
  const fullPath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(fullPath)) {
    // packages/react-native/native-api is a gitignored build artifact
    // produced by `npm run build-rn-turbomodule`; skip it when it hasn't
    // been generated (e.g. a fresh checkout).
    continue;
  }
  const source = fs.readFileSync(fullPath, "utf8");

  const interopSource = source.slice(
    source.indexOf("Object createInteropObject"),
    source.indexOf('interop.setProperty(runtime, "types", types);'),
  );

  assert(
    interopSource.includes('setType("long", metagen::mdTypeSLong);') &&
      interopSource.includes('setType("ulong", metagen::mdTypeULong);'),
    `${relativePath}: interop.types should expose long/ulong primitives for ObjC method metadata`,
  );
  assert(
    interopSource.includes('setType("NSInteger", metagen::mdTypeSLong);') &&
      interopSource.includes('setType("NSUInteger", metagen::mdTypeULong);'),
    `${relativePath}: interop.types should expose NSInteger/NSUInteger aliases for UIKit subclass methods`,
  );
  assert(
    interopSource.includes('setType("BOOL", metagen::mdTypeBool);'),
    `${relativePath}: interop.types should expose BOOL for ObjC selectors`,
  );
  assert(
    interopSource.includes('setType("CGFloat", metagen::mdTypeDouble);') &&
      interopSource.includes('setType("CGFloat", metagen::mdTypeFloat);'),
    `${relativePath}: interop.types should expose CGFloat with platform width`,
  );
  assert(
    interopSource.includes('setType("NSTimeInterval", metagen::mdTypeDouble);') &&
      interopSource.includes('setType("CFTimeInterval", metagen::mdTypeDouble);'),
    `${relativePath}: interop.types should expose common UIKit/CoreFoundation double aliases`,
  );
}

console.log("interop primitive aliases tests passed");

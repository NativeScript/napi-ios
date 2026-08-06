const assert = require("assert");
const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "../../..");
const packageRoot = path.resolve(__dirname, "..");

for (const relativePath of [
  "packages/react-native/native-api/ffi/objc/shared/bridge/TypeConv.mm",
  "NativeScript/ffi/objc/shared/bridge/TypeConv.mm",
]) {
  const fullPath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(fullPath)) {
    // packages/react-native/native-api is a gitignored build artifact
    // produced by `npm run build-rn-turbomodule`; skip it when it hasn't
    // been generated (e.g. a fresh checkout).
    continue;
  }
  const source = fs.readFileSync(fullPath, "utf8");
  assert(
    source.includes('PropNameID::forAscii(runtime, "setAssociatedObject")') &&
      source.includes('PropNameID::forAscii(runtime, "getAssociatedObject")'),
    `${relativePath} should expose Objective-C associated objects on generic interop`,
  );
  assert(
    source.includes("objc_setAssociatedObject(target, sel_registerName(key.c_str())") &&
      source.includes("objc_getAssociatedObject(target, sel_registerName(key.c_str()))"),
    `${relativePath} should store associated objects by stable native selector keys`,
  );
  const setAssociatedObjectSource = source.slice(
    source.indexOf('PropNameID::forAscii(runtime, "setAssociatedObject")'),
    source.indexOf('PropNameID::forAscii(runtime, "getAssociatedObject")'),
  );
  assert(
    setAssociatedObjectSource.indexOf("NativeApiArgumentFrame frame(1);") <
      setAssociatedObjectSource.indexOf(
        "value = objectFromEngineValue(runtime, bridge, args[2], frame, false);",
      ) &&
      setAssociatedObjectSource.indexOf("NativeApiArgumentFrame frame(1);") <
        setAssociatedObjectSource.indexOf("objc_setAssociatedObject("),
    `${relativePath} should keep converted associated-object values alive until objc_setAssociatedObject returns`,
  );
  assert(
    source.includes('policy == "assign"') &&
      source.includes("OBJC_ASSOCIATION_ASSIGN") &&
      source.includes("OBJC_ASSOCIATION_RETAIN_NONATOMIC"),
    `${relativePath} should expose assign and retain policies for native ownership parity`,
  );
  assert(
    source.includes("nativeAssociatedObjectTargetFromValue") &&
      source.includes("nativeObjectReturnTypeForClass(object_getClass(associated))") &&
      source.includes("convertNativeReturnValue(runtime, bridge, type, &associated)"),
    `${relativePath} should bridge associated object values through normal NativeScript object conversion`,
  );
}

for (const relativePath of [
  "types/objc-node-api/index.d.ts",
  "../objc-node-api/index.d.ts",
]) {
  const declPath = path.join(packageRoot, relativePath);
  if (!fs.existsSync(declPath)) {
    // packages/react-native/types is a gitignored, generated mirror of
    // packages/objc-node-api's declarations; skip it when it hasn't been
    // generated (e.g. a fresh checkout).
    continue;
  }
  const declarations = fs.readFileSync(declPath, "utf8");
  assert(
    declarations.includes("type AssociationPolicy") &&
      declarations.includes("function setAssociatedObject") &&
      declarations.includes("function getAssociatedObject"),
    `${relativePath} should type generic associated-object interop`,
  );
}

console.log("interop associated object API tests passed");

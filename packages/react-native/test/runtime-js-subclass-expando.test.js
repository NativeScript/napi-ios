const assert = require("assert");
const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "../../..");

for (const relativePath of [
  "NativeScript/ffi/objc/shared/bridge/host_objects/Object.mm",
  "packages/react-native/native-api/ffi/objc/shared/bridge/host_objects/Object.mm",
]) {
  const fullPath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(fullPath)) {
    // The packages/react-native/native-api mirror is a gitignored build
    // artifact produced by `npm run build-rn-turbomodule`; skip it when it
    // hasn't been generated (e.g. a fresh checkout).
    continue;
  }
  const source = fs.readFileSync(fullPath, "utf8");

  assert(
    source.includes("if (isEngineExtendedInstance) {\n      if (invokeEnginePrototypeSetter(runtime, property, value)) {\n        NATIVE_API_SET_RETURN(true);\n      }\n    }"),
    `${relativePath}: a JS-subclass instance's prototype setter must be tried before any metadata/runtime setter path`,
  );

  assert(
    source.includes("storeOwnExpando(runtime, property, value);\n      NATIVE_API_SET_RETURN(false);"),
    `${relativePath}: JS subclass expando fallback should still mirror plain JS-owned fields into native expandos when no prototype setter fired`,
  );
}

console.log("runtime JS subclass expando tests passed");

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "../../..");
const packageRoot = path.resolve(__dirname, "..");

function readRepo(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function readPackage(relativePath) {
  return fs.readFileSync(path.join(packageRoot, relativePath), "utf8");
}

// packages/react-native/native-api and packages/react-native/types are
// gitignored build artifacts (`npm run build-rn-turbomodule`); skip them
// when they haven't been generated (e.g. a fresh checkout).
function repoPathExists(relativePath) {
  return fs.existsSync(path.join(repoRoot, relativePath));
}

function packagePathExists(relativePath) {
  return fs.existsSync(path.join(packageRoot, relativePath));
}

for (const relativePath of [
  "packages/react-native/native-api/ffi/objc/shared/bridge/TypeConv.mm",
  "NativeScript/ffi/objc/shared/bridge/TypeConv.mm",
]) {
  if (!repoPathExists(relativePath)) {
    continue;
  }
  const source = readRepo(relativePath);
  assert(
    source.includes('PropNameID::forAscii(runtime, "Block")'),
    `${relativePath} should expose interop.Block`,
  );
  assert(
    source.includes('PropNameID::forAscii(runtime, "FunctionReference"), 2'),
    `${relativePath} should allow typed FunctionReference callbacks`,
  );
  assert(
    source.includes("__nativeApiCallbackEncoding") &&
      source.includes("interopCallbackFromArguments"),
    `${relativePath} should store explicit callback encodings on generic interop callbacks`,
  );
  assert(
    !source.includes("__nativeScriptCallbackEncoding"),
    `${relativePath} should not use the RN-specific callback encoding marker`,
  );
}

for (const relativePath of [
  "packages/react-native/native-api/ffi/objc/shared/bridge/Install.mm",
  "NativeScript/ffi/objc/shared/bridge/Install.mm",
]) {
  if (!repoPathExists(relativePath)) {
    continue;
  }
  const source = readRepo(relativePath);
  assert(
    source.includes("interop.Block = wrapInteropFactory"),
    `${relativePath} should wrap interop.Block like the other interop factories`,
  );
}

if (packagePathExists("types/objc-node-api/index.d.ts")) {
  const declarations = readPackage("types/objc-node-api/index.d.ts");
  assert(
    declarations.includes("function Block<T extends") &&
      declarations.includes("function FunctionReference<T extends") &&
      declarations.includes("__nativeApiCallbackEncoding"),
    "interop declarations should expose typed Block and FunctionReference factories",
  );
}

const publicApi = readPackage("src/index.ts");
assert(
  !publicApi.includes("objCBlock") && !publicApi.includes("objCFunctionPointer"),
  "typed callback construction should live on interop, not @nativescript/react-native",
);

console.log("interop typed callback API tests passed");

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "../../..");
const bridgeSources = [
  {
    objcBridge: "NativeScript/ffi/objc/shared/bridge/ObjCBridge.mm",
    typeConv: "NativeScript/ffi/objc/shared/bridge/TypeConv.mm",
  },
  {
    objcBridge:
      "packages/react-native/native-api/ffi/objc/shared/bridge/ObjCBridge.mm",
    typeConv:
      "packages/react-native/native-api/ffi/objc/shared/bridge/TypeConv.mm",
  },
];

for (const { objcBridge, typeConv } of bridgeSources) {
  const objcBridgePath = path.join(repoRoot, objcBridge);
  const typeConvPath = path.join(repoRoot, typeConv);
  if (!fs.existsSync(objcBridgePath) || !fs.existsSync(typeConvPath)) {
    // packages/react-native/native-api is a gitignored build artifact
    // produced by `npm run build-rn-turbomodule`; skip it when it hasn't
    // been generated (e.g. a fresh checkout).
    continue;
  }
  const objcBridgeSource = fs.readFileSync(objcBridgePath, "utf8");
  const typeConvSource = fs.readFileSync(typeConvPath, "utf8");

  assert(
    objcBridgeSource.includes("bool nativeObjectPointerMayBeObject(id object)"),
    `${objcBridge}: should expose a shared object-pointer validity guard`,
  );
  assert(
    objcBridgeSource.includes("return raw > 0x1000;"),
    `${objcBridge}: should reject impossible immediate pointers before ObjC messaging`,
  );

  const stringLikeSource = objcBridgeSource.slice(
    objcBridgeSource.indexOf("bool nativeObjectIsStringLike"),
    objcBridgeSource.indexOf("Value findCachedNativeObjectReturn"),
  );
  assert(
    stringLikeSource.indexOf("!nativeObjectPointerMayBeObject(object)") >= 0 &&
      stringLikeSource.indexOf("!nativeObjectPointerMayBeObject(object)") <
        stringLikeSource.indexOf("object_getClass(object)"),
    `${objcBridge}: string-like checks must guard before object_getClass`,
  );

  const objectReturnSource = typeConvSource.slice(
    typeConvSource.indexOf("case metagen::mdTypeAnyObject"),
    typeConvSource.indexOf("case metagen::mdTypeFunctionReference"),
  );
  assert(
    objectReturnSource.indexOf("!nativeObjectPointerMayBeObject(object)") >= 0 &&
      objectReturnSource.indexOf("!nativeObjectPointerMayBeObject(object)") <
        objectReturnSource.indexOf("findCachedNativeObjectReturn"),
    `${typeConv}: object conversion must reject invalid pointers before cache lookup`,
  );
  assert(
    objectReturnSource.indexOf("!nativeObjectPointerMayBeObject(object)") <
      objectReturnSource.indexOf("[object isKindOfClass:[NSNull class]]"),
    `${typeConv}: object conversion must reject invalid pointers before isKindOfClass`,
  );
}

console.log("runtime object conversion guard tests passed");

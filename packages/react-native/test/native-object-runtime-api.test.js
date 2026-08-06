const assert = require("assert");
const fs = require("fs");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(packageRoot, relativePath), "utf8");
}

const index = read("src/index.ts");
const declarations = read("src/index.ts");

assert(
  index.includes("export function nativeObjectFromHandle") &&
    index.includes("function nativePointerAddressFromHandle") &&
    index.includes("function resolveNativeObjectFromHandle") &&
    index.includes("function objectFromNativePointerValue") &&
    index.includes("const address = Number(trimmed)") &&
    index.includes("interop.Pointer(pointerValue)") &&
    index.includes("interop,\n      trimmed") &&
    index.includes("interop, address") &&
    index.indexOf("interop,\n      trimmed") <
      index.indexOf("interop, address") &&
    index.includes("return resolveNativeObjectFromHandle<T>(handle);"),
  "public runtime API should convert native handle strings back to NativeScript objects by preserving string pointer handles before numeric fallback",
);

assert(
  index.includes("export function nativeHandleForObject") &&
    index.includes("return nativeHandleForNSObject(value);"),
  "public runtime API should expose object-to-handle conversion for UI worklets",
);

assert(
  index.includes("type EncodedObjCSelectorArgument") &&
    index.includes("function encodeObjCSelectorArgument") &&
    index.includes("Array.isArray(arg)") &&
    index.includes("encodedItems.push(encodedItem.value)") &&
    declarations.includes("readonly ObjCSelectorArgument[]"),
  "public runtime API should encode nested ObjC selector arguments such as arrays of native objects",
);

assert(
  index.includes("export function nativeArrayLength") &&
    index.includes("export function nativeArrayItem") &&
    index.includes('typeof count === "function"') &&
    index.includes("count.call(value)") &&
    index.includes('invokeObjCSelector<number>(value, "count")') &&
    index.includes("objectAtIndex") &&
    index.includes('invokeObjCSelector<T>(value, "objectAtIndex:", [') &&
    index.includes("objectAtIndexedSubscript"),
  "public runtime API should read bridged native arrays without assuming JS array shape",
);

assert(
  index.includes("export function nativeSubviews") &&
    index.includes("const subviews =") &&
    index.includes("nativeArrayItem<T>(subviews, index)"),
  "public runtime API should snapshot UIView subviews from the UI runtime",
);

assert(
  index.includes("function setAssociatedNativeObject") &&
    !index.includes("export function setAssociatedNativeObject") &&
    !index.includes("getAssociatedNativeObject") &&
    index.includes("setAssociatedObject(target, key, value ?? null, policy)"),
  "associated-object writes should survive as an internal helper (public setAssociatedNativeObject/getAssociatedNativeObject removed as unused surface)",
);

assert(
  index.includes("function registerUIRuntimeGlobalOnUI") &&
    index.includes("export function registerUIRuntimeGlobal<T>") &&
    index.includes("return runOnUI(registerUIRuntimeGlobalOnUI, name, value, force);") &&
    !index.includes("registerUIRuntimeGlobalSync"),
  "public runtime API should register shared UI worklet globals from the React Native runtime (unused sync variant removed)",
);

for (const name of [
  "nativeObjectFromHandle",
  "nativeHandleForObject",
  "nativeArrayLength",
  "nativeArrayItem",
  "nativeSubviews",
  "registerUIRuntimeGlobal",
]) {
  assert(
    declarations.includes(`function ${name}`) &&
      index.includes(`${name},`),
    `${name} should be exported from declarations and default NativeScript object`,
  );
}

assert(
  declarations.includes("export type NativeAssociationPolicy"),
  "public declarations should type associated-object policy names",
);

console.log("native object runtime API tests passed");

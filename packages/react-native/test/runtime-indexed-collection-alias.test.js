const assert = require("assert");
const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "../../..");

for (const relativePath of [
  "NativeScript/ffi/objc/shared/bridge/Install.mm",
  "packages/react-native/native-api/ffi/objc/shared/bridge/Install.mm",
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
    source.includes("function nativeExtensionMethodsWithIndexedCollectionAliases(methods)"),
    `${relativePath}: native class extension should prepare indexed collection method aliases`,
  );
  assert(
    source.includes("needsObjectAtIndexedSubscript") &&
      source.includes("needsSetObjectAtIndexedSubscript"),
    `${relativePath}: indexed collection aliases should cover read and write native subscript selectors`,
  );
  assert(
    source.includes("return this.objectAtIndex(index);") &&
      source.includes("return this.replaceObjectAtIndexWithObject(index, anObject);"),
    `${relativePath}: synthesized subscript aliases should delegate to the JS primitive methods with native argument order corrected`,
  );
  assert(
    source.includes("needsIndexedCollectionIterator") &&
      source.includes("Object.defineProperty(prepared, Symbol.iterator") &&
      source.includes("value: receiver.objectAtIndex(index++)"),
    `${relativePath}: JS-backed indexed collection subclasses should synthesize Symbol.iterator from count/objectAtIndex`,
  );
  assert(
    source.includes("function nativeExtensionOptionsWithIterator(options, methods)") &&
      source.includes("nativeExtensionMethodsHaveIterator(methods)") &&
      source.includes("__hasIterator: true"),
    `${relativePath}: prepared indexed collection iterators should enable the native fast-enumeration bridge`,
  );
  assert(
    source.includes("var extensionMethods = nativeExtensionMethodsWithIndexedCollectionAliases(methods);") &&
      source.includes("nativeExtensionOptionsWithIterator(options, extensionMethods)") &&
      source.includes("api.__extendClass(nativeClass, extensionMethods, extendOptions)") &&
      source.includes("Object.getOwnPropertyDescriptors(extensionMethods)") &&
      source.includes("Object.keys(extensionMethods)"),
    `${relativePath}: NativeClass.extend should register and expose the prepared indexed collection method set`,
  );
  assert(
    source.includes("nativeExtensionMethodsWithIndexedCollectionAliases(constructor.prototype || {})") &&
      source.includes("options = nativeExtensionOptionsWithIterator(options, extensionMethods)") &&
      source.includes("api.__extendClass(nativeBase, extensionMethods, options)") &&
      source.includes("api.__rememberClassWrapper(nativeClass, constructor, extensionMethods)"),
    `${relativePath}: TypeScript native class materialization should use the same prepared method set`,
  );
}

console.log("runtime indexed collection alias tests passed");

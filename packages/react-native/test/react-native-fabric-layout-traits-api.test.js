const assert = require("assert");
const fs = require("fs");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(packageRoot, relativePath), "utf8");
}

const index = read("src/index.ts");
const declarations = read("src/index.ts");
const nativeModule = read("ios/NativeScriptNativeApiModule.mm");

assert(
  nativeModule.includes("__nativeScriptReactFabricViewLayoutTraits") &&
    nativeModule.includes("RCTComponentViewProtocol") &&
    nativeModule.includes("YogaStylableProps") &&
    nativeModule.includes("layoutMetricsForFabricComponentView") &&
    nativeModule.includes("classHierarchyHasInstanceVariable") &&
    nativeModule.includes("hasConcreteFabricStorage") &&
    nativeModule.includes("layoutMetrics->frame") &&
    nativeModule.includes("layoutMetrics->getContentFrame()") &&
    nativeModule.includes("yogaStyle.flexGrow()") &&
    nativeModule.includes("yogaStyle.flexShrink()"),
  "worklet runtime should expose generic Fabric view layout traits",
);

assert(
  nativeModule.indexOf("const bool hasPropsStorage") <
    nativeModule.indexOf("auto props = [componentView props]") &&
    nativeModule.includes("if (!hasPropsStorage) {\n    return traits;\n  }"),
  "Fabric view traits must not call UIView(ComponentViewProtocol).props on plain UIKit views",
);

assert(
  index.includes("export type ReactNativeFabricViewLayoutTraits") &&
    index.includes("export function reactNativeFabricViewLayoutTraits") &&
    index.includes("export function reactNativeFabricViewLayoutTraitsForHandle") &&
    index.includes("__nativeScriptReactFabricViewLayoutTraits"),
  "public JS API should expose Fabric view layout traits from objects and handles",
);

assert(
  declarations.includes("export type ReactNativeFabricViewLayoutTraits") &&
    declarations.includes("hasLayoutMetrics: boolean") &&
    declarations.includes("layoutMetricsFrameWidth?: number") &&
    declarations.includes("layoutMetricsContentFrameHeight?: number") &&
    declarations.includes("reactNativeFabricViewLayoutTraits(") &&
    declarations.includes("reactNativeFabricViewLayoutTraitsForHandle("),
  "public declarations should type Fabric view layout traits",
);

for (const name of [
  "reactNativeFabricViewLayoutTraits",
  "reactNativeFabricViewLayoutTraitsForHandle",
]) {
  assert(
    index.includes(`${name},`) && index.includes(`export function ${name}`),
    `${name} should be a named export listed on the default NativeScript object`,
  );
}

console.log("react native fabric layout traits api tests passed");

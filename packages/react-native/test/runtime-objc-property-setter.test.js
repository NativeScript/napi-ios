const assert = require("assert");
const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "../../..");

// refactor split the old monolithic HostObjects.mm into host_objects/*.mm,
// included (in this order) by the residual HostObjects.mm. Concatenate them
// back into one logical blob so the substring/ordering assertions below
// (carried over from when this was one file) still hold.
const HOST_OBJECTS_INCLUDE_ORDER = [
  "Interop.mm",
  "Struct.mm",
  "Appearance.mm",
  "Object.mm",
  "Class.mm",
  "Protocol.mm",
];

function readLogicalHostObjects(bridgeDir) {
  const residualPath = path.join(bridgeDir, "HostObjects.mm");
  if (!fs.existsSync(residualPath)) {
    return null;
  }
  const parts = [fs.readFileSync(residualPath, "utf8")];
  for (const name of HOST_OBJECTS_INCLUDE_ORDER) {
    parts.push(fs.readFileSync(path.join(bridgeDir, "host_objects", name), "utf8"));
  }
  return parts.join("\n");
}

for (const bridgeDir of [
  path.join(repoRoot, "NativeScript/ffi/objc/shared/bridge"),
  path.join(repoRoot, "packages/react-native/native-api/ffi/objc/shared/bridge"),
]) {
  const source = readLogicalHostObjects(bridgeDir);
  if (source == null) {
    // The packages/react-native/native-api mirror is a gitignored build
    // artifact produced by `npm run build-rn-turbomodule`; skip it when it
    // hasn't been generated (e.g. a fresh checkout).
    continue;
  }

  assert(
    source.includes("runtimeWritablePropertySetter"),
    `${bridgeDir}: host objects should discover writable Objective-C runtime properties`,
  );
  assert(
    source.includes("runtimeReadablePropertyGetter"),
    `${bridgeDir}: host objects should discover readable Objective-C runtime properties`,
  );
  assert(
    source.includes("property_copyAttributeValue(prop, \"S\")"),
    `${bridgeDir}: runtime property fallback should honor custom Objective-C setters`,
  );
  assert(
    source.includes("property_copyAttributeValue(prop, \"R\")"),
    `${bridgeDir}: runtime property fallback should not assign readonly Objective-C properties`,
  );
  assert(
    source.includes("callObjCSelector(runtime, bridge_, object_, false,\n                       *setterSelectorName, nullptr, args, 1);"),
    `${bridgeDir}: runtime property fallback should invoke the discovered native setter`,
  );
  assert(
    source.includes("return callObjectSelector(runtime, *selector, nullptr, nullptr, 0);"),
    `${bridgeDir}: JS-extended instances should read discovered native properties before returning undefined`,
  );
}

const runtimeHostObjects = readLogicalHostObjects(
  path.join(repoRoot, "NativeScript/ffi/objc/shared/bridge"),
);
const runtimeObjCBridge = fs.readFileSync(
  path.join(repoRoot, "NativeScript/ffi/objc/shared/bridge/ObjCBridge.mm"),
  "utf8",
);
const appearanceAccessorStart = runtimeHostObjects.indexOf(
  "Function makeAppearanceProxyPropertySetter(",
);
const appearanceAccessorEnd = runtimeHostObjects.indexOf(
  "\nValue tagStaticAppearanceSelectorResult(",
  appearanceAccessorStart,
);
const appearanceAccessorSource = runtimeHostObjects.slice(
  appearanceAccessorStart,
  appearanceAccessorEnd,
);
const nativeObjectHostObjectStart = runtimeHostObjects.indexOf(
  "class NativeApiObjectHostObject final",
);
const appearanceHostSetStart = runtimeHostObjects.indexOf(
  "NativeApiHostSetResult set(Runtime& runtime, const PropNameID& name, const Value& value) override",
  nativeObjectHostObjectStart,
);
const appearanceHostSetEnd = runtimeHostObjects.indexOf(
  "\n    if (auto setterSelectorName =",
  appearanceHostSetStart,
);
const appearanceHostSetSource = runtimeHostObjects.slice(
  appearanceHostSetStart,
  appearanceHostSetEnd,
);

assert(
  runtimeHostObjects.includes("Class tagStaticAppearanceNativeResult(") &&
    runtimeHostObjects.includes("return customizableClass;"),
  "runtime UIAppearance result tagging should return the customizable target class",
);
assert(
  runtimeHostObjects.includes("appearanceProxyCustomizableClassFromExactDescription(native)") &&
    runtimeHostObjects.includes("if (customizableClass == Nil) {\n    return Nil;\n  }") &&
    !runtimeHostObjects.includes("customizableClass = appearanceClass;"),
  "runtime UIAppearance result tagging should require an exact UIKit proxy target and avoid shadowing AppKit appearance objects",
);
assert(
  runtimeHostObjects.includes("installAppearanceProxyPropertyAccessors") &&
    runtimeHostObjects.includes("makeAppearanceProxyPropertySetter") &&
    runtimeHostObjects.includes("makeAppearanceProxyPropertyGetter") &&
    runtimeHostObjects.includes("betterAppearanceProxyAccessorMember") &&
    runtimeHostObjects.includes("std::unordered_map<std::string, const NativeApiMember*> accessors") &&
    runtimeHostObjects.includes("cacheAppearanceProxyPropertyValue(") &&
    appearanceAccessorSource.includes("runtimeWritablePropertySetter(native, member.name)") &&
    appearanceAccessorSource.includes("if (!member.readonly)") &&
    appearanceAccessorSource.includes("betterAppearanceProxyAccessorMember(accessors[member.name], member)") &&
    !appearanceAccessorSource.includes("std::unordered_set<std::string> installed") &&
    !appearanceAccessorSource.includes("!member.readonly && !member.setterSelectorName.empty()"),
  "runtime UIAppearance proxies should install writable-preferred safe property accessors backed by the appearance cache",
);
assert(
  appearanceHostSetSource.includes("runtimeWritablePropertySetter(object_, property)") &&
    appearanceHostSetSource.includes("selectAppearanceProxyPropertyMember(members, property)") &&
    appearanceHostSetSource.indexOf("taggedAppearanceProxyClass(runtime, bridge_, object_)") <
      appearanceHostSetSource.indexOf("findClassForRuntimeClass(object_getClass(object_))") &&
    !appearanceHostSetSource.includes("propertyMember->readonly ||\n              propertyMember->setterSelectorName.empty()"),
  "runtime UIAppearance host-object assignment should select proxy members before generic object setters and use the same runtime setter fallback before caching",
);
assert(
  !runtimeHostObjects.includes("SetNativeApiObjectPrototype(runtime, resultObject"),
  "runtime UIAppearance proxies should not replace their JS prototype with the target class prototype",
);
assert(
  runtimeObjCBridge.includes("uintptr_t runtimeObjectExpandoKey(Runtime& runtime)") &&
    runtimeObjCBridge.includes("runtime.state().get()") &&
    runtimeObjCBridge.includes("const uintptr_t runtimeKey = runtimeObjectExpandoKey(runtime);") &&
    !runtimeObjCBridge.includes("const uintptr_t runtimeKey =\n        normalizeRuntimePointer(reinterpret_cast<uintptr_t>(&runtime));"),
  "runtime object expandos should use stable backend runtime identity instead of per-callback stack wrapper addresses",
);

console.log("runtime Objective-C property setter tests passed");

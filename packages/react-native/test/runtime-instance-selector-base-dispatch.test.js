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

  const invokeBaseCount = source.match(/return api\.__invokeBase\(\.\.\.baseArgs\);/g)?.length ?? 0;
  assert(
    invokeBaseCount === 1,
    `${relativePath}: only class selector wrappers should route native receivers through __invokeBase`,
  );
  assert(
    !source.includes("return fn.apply(this, arguments);"),
    `${relativePath}: instance selector wrappers should not globally reroute native receivers through __invokeBase`,
  );
  assert(
    source.includes("value: receiverIsClass") &&
      source.includes("? (function(fn, memberName) {") &&
      source.includes("var baseArgs = [nativeClass, this, memberName];") &&
      source.includes(": selectorFunction"),
    `${relativePath}: class selector wrappers should keep base invocation support while instance selectors use engine dispatch`,
  );
  const allocInitFlagDefinitions =
    source.match(/Object\.defineProperty\([^,]+, '__nativeApiUseAllocInitConstructor'/g) || [];
  assert(
    source.includes("function shouldUseAllocInitConstructor(constructable, wrapper)") &&
      source.includes("function setObjectConstructionState(instance, constructing)") &&
      source.includes("api.__setObjectConstructionState(instance, !!constructing)") &&
      source.includes("target.__nativeApiUseAllocInitConstructor") &&
      source.includes("args.length > 0 ||") &&
      source.includes("shouldUseAllocInitConstructor(constructable, wrapper)") &&
      source.includes("setObjectConstructionState(instance, true)") &&
      source.includes("setObjectConstructionState(instance, false)") &&
      allocInitFlagDefinitions.length >= 2,
    `${relativePath}: JS-extended native classes should use alloc/init construction so receivers are remembered before init dispatch`,
  );
}

for (const relativePath of [
  "NativeScript/ffi/objc/shared/bridge/HostObject.mm",
  "packages/react-native/native-api/ffi/objc/shared/bridge/HostObject.mm",
]) {
  const fullPath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(fullPath)) {
    continue;
  }
  const source = fs.readFileSync(fullPath, "utf8");

  assert(
    source.includes("__setObjectConstructionState") &&
      source.includes('sel_registerName("__nativeApiConstructionState")') &&
      source.includes("constructing ? @YES : nil"),
    `${relativePath}: bridge API should mark native objects during JS-subclass construction`,
  );
}

for (const bridgeDir of [
  path.join(repoRoot, "NativeScript/ffi/objc/shared/bridge"),
  path.join(repoRoot, "packages/react-native/native-api/ffi/objc/shared/bridge"),
]) {
  const source = readLogicalHostObjects(bridgeDir);
  if (source == null) {
    continue;
  }
  const branchIndex = source.indexOf("if (isEngineExtendedInstance) {");
  const resolveIndex = source.indexOf(
    "Value resolved = resolveEnginePrototypeGetter(runtime, property, &found);",
    branchIndex,
  );
  const nativeGetterIndex = source.indexOf(
    "runtimeReadablePropertyGetter(object_, property)",
    branchIndex,
  );
  const guardedIndex = source.lastIndexOf(
    "#ifdef NATIVESCRIPT_NATIVE_API_HOST_EXPLICIT_OVERRIDE",
    resolveIndex,
  );

  assert(
    branchIndex !== -1 &&
      resolveIndex !== -1 &&
      nativeGetterIndex !== -1 &&
      branchIndex < resolveIndex &&
      resolveIndex < nativeGetterIndex &&
      guardedIndex < branchIndex,
    `${bridgeDir}: JS-subclassed property reads should prefer prototype getters before native runtime getters on every backend`,
  );
  // Deduped in refactor: classPrototypeForObject (not a second
  // enginePrototypeForObject function) is the shared class-wrapper-prototype
  // lookup used by method/getter/setter resolution.
  assert(
    source.includes("Value classPrototypeForObject(Runtime& runtime)") &&
      source.includes("bridge_->findClassPrototype(runtime, object_getClass(object_))") &&
      (source.match(/Value prototypeValue = classPrototypeForObject\(runtime\);/g)?.length ?? 0) >= 3,
    `${bridgeDir}: JS-subclassed prototype lookup should use the registered class prototype fallback for methods, getters, and setters`,
  );

  const nilObjectSetIndex = source.indexOf(
    'throw JSError(runtime, "Cannot set property on nil object.");',
  );
  const setIndex = source.lastIndexOf(
    "NativeApiHostSetResult set(",
    nilObjectSetIndex,
  );
  const writableIndex = source.indexOf(
    "selectWritablePropertyMember(members, property, false)",
    setIndex,
  );
  const explicitSetterIndex = source.indexOf(
    "invokeEnginePrototypeSetter(runtime, property, value)",
    setIndex,
  );

  assert(
    setIndex !== -1 &&
      nilObjectSetIndex !== -1 &&
      setIndex < nilObjectSetIndex &&
      writableIndex !== -1 &&
      explicitSetterIndex !== -1 &&
      setIndex < explicitSetterIndex &&
      explicitSetterIndex < writableIndex,
    `${bridgeDir}: JS-subclassed property writes should try the prototype setter before native metadata/runtime setters on every backend`,
  );
  // Simplification (§4-C): enginePrototypeHasSetter is gone — by the time
  // set() reaches the no-native-setter fallback, the hoisted
  // invokeEnginePrototypeSetter attempt above has already run and didn't
  // return, so the expando is stored unconditionally instead of re-probing.
  assert(
    !source.includes("enginePrototypeHasSetter") &&
      source.includes("storeOwnExpando(runtime, property, value);\n      NATIVE_API_SET_RETURN(false);"),
    `${bridgeDir}: the no-prototype-setter fallback should store the expando unconditionally, not re-probe for a setter`,
  );
}

for (const relativePath of [
  "NativeScript/ffi/objc/shared/bridge/Callbacks.mm",
  "packages/react-native/native-api/ffi/objc/shared/bridge/Callbacks.mm",
]) {
  const fullPath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(fullPath)) {
    continue;
  }
  const source = fs.readFileSync(fullPath, "utf8");

  assert(
    source.includes("shouldSkipConstructingMethodCallback(args, ret)") &&
      source.includes('signature_->selectorName.rfind("init", 0) == 0') &&
      source.includes('sel_registerName("__nativeApiConstructionState")') &&
      source.includes("zeroReturnValue(ret);"),
    `${relativePath}: Objective-C callbacks should zero-return non-init JS overrides while the receiver is still constructing`,
  );
}

{
  const installSource = fs.readFileSync(
    path.join(repoRoot, "NativeScript/ffi/objc/shared/bridge/Install.mm"),
    "utf8",
  );
  const hostObjectSource = fs.readFileSync(
    path.join(repoRoot, "NativeScript/ffi/objc/shared/bridge/HostObject.mm"),
    "utf8",
  );
  const classBuilderSource = fs.readFileSync(
    path.join(repoRoot, "NativeScript/ffi/objc/shared/bridge/ClassBuilder.mm"),
    "utf8",
  );
  const callbacksSource = fs.readFileSync(
    path.join(repoRoot, "NativeScript/ffi/objc/shared/bridge/Callbacks.mm"),
    "utf8",
  );

  assert(
    installSource.includes("function setObjectAccessorCallbackState(instance, active)") &&
      installSource.includes("__setObjectAccessorCallbackState(instance, !!active)") &&
      installSource.includes("function nativeExtensionAccessorWithCallbackState(fn)") &&
      installSource.includes("Object.getOwnPropertyDescriptors(methods)") &&
      installSource.includes("Reflect.ownKeys(descriptors)") &&
      installSource.includes("fn.apply(this, args)") &&
      installSource.includes("setObjectAccessorCallbackState(this, false)"),
    "JS extension accessors should run with native callback re-entry suppression state",
  );
  assert(
    hostObjectSource.includes("__setObjectAccessorCallbackState") &&
      hostObjectSource.includes('sel_registerName("__nativeApiAccessorCallbackState")') &&
      hostObjectSource.includes("depth += 1") &&
      hostObjectSource.includes("depth -= 1") &&
      hostObjectSource.includes("depth > 0 ? @(depth) : nil"),
    "bridge API should expose a depth-counted JS accessor callback state on native objects",
  );
  // methodCallbackPolicyForSelector (class-level ObjCMethodPolicies/
  // methodPolicies) is dropped (§4-A, no caller ever set them);
  // nativeAccessorCallbackPolicy() is now called with no per-selector
  // policy argument — it always installs just the accessor re-entry key.
  assert(
    classBuilderSource.includes("NativeApiMethodCallbackPolicy nativeAccessorCallbackPolicy") &&
      classBuilderSource.includes('"__nativeApiAccessorCallbackState"') &&
      !classBuilderSource.includes("methodCallbackPolicyForSelector") &&
      (classBuilderSource.match(/nativeAccessorCallbackPolicy\(\)/g)?.length ?? 0) >= 3,
    "property accessor overrides should skip native callback re-entry while JS accessors are executing",
  );
  // applyMethodPolicyAssignments (and the rest of the associated-object
  // assignment/keyPath DSL) is dropped along with the trimmed policy —
  // shouldSkipMethodCallback just zero-returns and reports skipped.
  assert(
    !callbacksSource.includes("applyMethodPolicyAssignments") &&
      callbacksSource.includes("zeroReturnValue(ret);\n        return true;"),
    "skipped native method callbacks should zero their native return storage without the dropped policy-assignment DSL",
  );
}

for (const relativePath of [
  "NativeScript/ffi/objc/shared/bridge/ClassBuilder.mm",
  "packages/react-native/native-api/ffi/objc/shared/bridge/ClassBuilder.mm",
]) {
  const fullPath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(fullPath)) {
    continue;
  }
  const source = fs.readFileSync(fullPath, "utf8");

  assert(
    source.includes("std::optional<Value> preservedNativeApiInitializerSelfReturn("),
    `${relativePath}: runtime should expose the initializer self-preservation helper`,
  );
  assert(
    source.includes("receiverHostObject->object() != receiver") &&
      source.includes("NativeApiObjectHostObject::nativeObjectFromValue(runtime, result)") &&
      source.includes("resultHostObject != receiverHostObject") &&
      source.includes("detachObjectPreservingBridgeState(receiver)") &&
      source.includes("bridge->rememberNativeObjectRoundTripValue(runtime, receiver,") &&
      source.includes("return preserved;") &&
      source.includes("return std::move(*preserved);"),
    `${relativePath}: initializer dispatch should preserve the original JS receiver when native init returns self`,
  );
  assert(
    source.includes("preservedNativeApiInitializerSelfReturn(") &&
      source.includes("Value(runtime, receiverObject)"),
    `${relativePath}: __invokeBase should use the shared initializer self-preservation helper`,
  );
}

for (const relativePath of [
  "NativeScript/ffi/objc/shared/bridge/ObjCBridge.mm",
  "packages/react-native/native-api/ffi/objc/shared/bridge/ObjCBridge.mm",
]) {
  const fullPath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(fullPath)) {
    continue;
  }
  const source = fs.readFileSync(fullPath, "utf8");

  assert(
    source.includes("void rememberNativeObjectRoundTripValue(Runtime& runtime, id object,") &&
      source.includes("rememberRoundTripValue(runtime, object, value, stringLikeNative,") &&
      source.includes("nativeObjectClassKey(object));"),
    `${relativePath}: preserved native object wrappers should use the same validation key as native return marshalling`,
  );
}

for (const relativePath of [
  "NativeScript/ffi/objc/jsc/NativeApiJSCSelectorGroups.mm",
  "NativeScript/ffi/objc/v8/NativeApiV8SelectorGroups.mm",
  "NativeScript/ffi/objc/quickjs/NativeApiQuickJSSelectorGroups.mm",
  "NativeScript/ffi/objc/hermes/NativeApiJsi.mm",
  "packages/react-native/native-api/ffi/objc/hermes/NativeApiJsi.mm",
]) {
  const fullPath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(fullPath)) {
    continue;
  }
  const source = fs.readFileSync(fullPath, "utf8");
  assert(
    source.includes("prepared->isInitMethod") &&
      source.includes("preservedNativeApiInitializerSelfReturn(") &&
      (!relativePath.includes("/hermes/") ||
        source.includes("return std::move(*preserved);")),
    `${relativePath}: engine selector groups should preserve the original receiver when init returns self`,
  );
}

{
  const relativePath = "NativeScript/ffi/objc/v8/NativeApiV8HostObjects.mm";
  const source = fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
  const hostTemplateStart = source.indexOf(
    "v8::Local<v8::ObjectTemplate> hostObjectTemplate",
  );
  const hostTemplateEnd = source.indexOf(
    "state->hostObjectTemplate.Reset",
    hostTemplateStart,
  );
  const nativeTemplateStart = source.indexOf(
    "v8::Local<v8::ObjectTemplate> nativeObjectTemplate",
  );
  const nativeTemplateEnd = source.indexOf(
    "state->nativeObjectTemplate.Reset",
    nativeTemplateStart,
  );
  const hostTemplate = source.slice(hostTemplateStart, hostTemplateEnd);
  const nativeTemplate = source.slice(nativeTemplateStart, nativeTemplateEnd);
  const getterIndex = nativeTemplate.indexOf(
    "tryResolvePrototypeGet(runtime, holderObject, receiver",
  );
  const nativeGetIndex = nativeTemplate.indexOf(
    "holder->hostObject->get",
    getterIndex,
  );
  const setterIndex = nativeTemplate.indexOf(
    "tryInvokePrototypeSetter(runtime, holderObject, receiver",
  );
  const nativeSetIndex = nativeTemplate.indexOf(
    "holder->hostObject->set",
    setterIndex,
  );

  assert(
    source.includes("GetPrototypeV2") &&
      source.includes("GetOwnPropertyDescriptor") &&
      source.includes("tryResolvePrototypeGet") &&
      source.includes("tryInvokePrototypeSetter") &&
      nativeTemplate.includes("v8::PropertyHandlerFlags::kNonMasking"),
    `${relativePath}: V8 native object interceptors should inspect JS prototype descriptors despite kNonMasking handlers`,
  );
  assert(
    getterIndex !== -1 &&
      nativeGetIndex !== -1 &&
      getterIndex < nativeGetIndex &&
      setterIndex !== -1 &&
      nativeSetIndex !== -1 &&
      setterIndex < nativeSetIndex,
    `${relativePath}: V8 native object interceptors should honor JS prototype accessors before native host dispatch`,
  );
  assert(
    !hostTemplate.includes("tryResolvePrototypeGet(runtime, holderObject, receiver"),
    `${relativePath}: JS prototype accessor precedence should be scoped to native object instances, not generic host objects`,
  );
}

for (const bridgeDir of [
  path.join(repoRoot, "NativeScript/ffi/objc/shared/bridge"),
  path.join(repoRoot, "packages/react-native/native-api/ffi/objc/shared/bridge"),
]) {
  const source = readLogicalHostObjects(bridgeDir);
  if (source == null) {
    continue;
  }
  assert(
    source.includes("void detachObjectPreservingBridgeState(id expected)") &&
      source.includes("if (releaseObject && object != nil)") &&
      source.includes("[object release];") &&
      !source.includes("detachObjectPreservingBridgeState(id expected) {\n    if (object_ == expected) {\n      if (bridge_ != nullptr"),
    `${bridgeDir}: temporary initializer result wrappers should detach without clearing live receiver bridge state`,
  );
}

console.log("runtime instance selector base dispatch tests passed");

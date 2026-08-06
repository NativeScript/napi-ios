const assert = require("assert");
const fs = require("fs");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(packageRoot, "../..");

function readPackage(relativePath) {
  return fs.readFileSync(path.join(packageRoot, relativePath), "utf8");
}

function readRepo(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

const index = readPackage("src/index.ts");
assert(
  index.includes('export type NativeScriptCallbackThread = "js" | "runtime"'),
  "public JS API should expose a generic runtime callback thread policy",
);
assert(
  index.includes("function runtimeInvoker") &&
    !index.includes("export function runtimeInvoker"),
  "runtimeInvoker should remain an internal callback primitive (no longer a public export)",
);
assert(
  index.includes("export function dispatchAsyncOnMainQueue") &&
    index.includes("__nativeScriptDispatchAsyncOnMainQueue") &&
    index.includes('"NativeScript.dispatchAsyncOnMainQueue expects a callback"'),
  "public JS API should expose a generic UI-runtime main-queue async scheduler",
);
assert(
  index.includes("const NativeScript = {") &&
    index.includes("  dispatchAsyncOnMainQueue,\n") &&
    index.indexOf("  dispatchAsyncOnMainQueue,\n") >
      index.indexOf("const NativeScript = {"),
  "default NativeScript export should include the generic main-queue async scheduler",
);
assert(
  index.includes("export function nativeMethodPolicy") &&
    index.includes("__nativeScriptMethodPolicy"),
  "public JS API should expose generic native method callback policy markers",
);
assert(
  !index.includes("export function objCBlock") &&
    !index.includes("export function objCFunctionPointer") &&
    !index.includes("typedObjCCallback"),
  "public JS API should not expose RN-specific typed ObjC callback helpers",
);
assert(
  index.includes('return callbackInvoker("runtime", callback)'),
  "runtimeInvoker should mark callbacks for their owning NativeScript runtime",
);
assert(
  index.includes("Object.getOwnPropertyNames(callback)") &&
    index.includes("Object.getOwnPropertySymbols(callback)") &&
    index.includes("Object.defineProperty(wrapped, key, descriptor)"),
  "callback invokers should preserve native callback/block metadata on wrappers",
);
assert(
  index.includes("interop.Block = wrapInteropFactory"),
  "interop.Block should be made callable/constructable when the runtime exposes it",
);
assert(
  index.includes('if (thread === "runtime")'),
  "eventBridge should route runtime callbacks through runtimeInvoker",
);
assert(
  !index.includes("afterUIKitTransition"),
  "runtime should not expose a transition-specific callback API",
);

const declarations = readPackage("src/index.ts");
assert(
  declarations.includes('NativeScriptCallbackThread = "js" | "runtime"'),
  "public declarations should include the runtime callback policy",
);
assert(
  declarations.includes("runtimeInvoker<T extends") &&
    !declarations.includes("export function runtimeInvoker"),
  "runtimeInvoker should remain an internal callback primitive",
);
assert(
  declarations.includes("dispatchAsyncOnMainQueue(callback: () => void): boolean"),
  "public declarations should expose the generic main-queue async scheduler",
);
assert(
  declarations.includes("  dispatchAsyncOnMainQueue,"),
  "public default declarations should include the generic main-queue async scheduler",
);
// The method-policy DSL is intentionally trimmed to its two live fields:
// callSuperBeforeCallback and skipCallbackIfAssociatedObjectTruthy. The
// fuller DSL (argument-index targets, associated-object condition/
// comparison trees, keyPath assignments, typed skip-return values) had no
// caller anywhere in the fork or its own pin tests advertising it.
assert(
  declarations.includes("NativeScriptMethodCallbackPolicy") &&
    declarations.includes("nativeMethodPolicy<T extends") &&
    declarations.includes("callSuperBeforeCallback?: boolean") &&
    declarations.includes("skipCallbackIfAssociatedObjectTruthy?: string | string[]"),
  "public declarations should expose nativeMethodPolicy",
);
assert(
  !declarations.includes("NativeScriptMethodPolicyAssociatedObjectCondition") &&
    !declarations.includes("NativeScriptMethodPolicyKeyPathAssignment") &&
    !declarations.includes("returnValueIfSkipped"),
  "public declarations should not expose the trimmed method-policy DSL (no caller ever used it)",
);
assert(
  !declarations.includes("objCBlock") &&
    !declarations.includes("objCFunctionPointer"),
  "public declarations should not expose typed ObjC callback helpers",
);
assert(
  !declarations.includes("afterUIKitTransition"),
  "public declarations should not expose transition-specific APIs",
);

const moduleSource = readPackage("ios/NativeScriptNativeApiModule.mm");
const normalizedModuleSource = moduleSource.replace(/\s+/g, " ");
assert(
  moduleSource.includes("config.runtimeCallbackInvoker"),
  "Worklet runtime install should configure the generic runtime callback invoker",
);
assert(
  moduleSource.includes("runtimeStrong->schedule"),
  "runtime callbacks should schedule work onto the Worklet runtime",
);
assert(
  moduleSource.includes("__nativeScriptDispatchAsyncOnMainQueue") &&
    moduleSource.includes("dispatch_async(dispatch_get_main_queue(), ^{") &&
    moduleSource.includes("nativeScriptWorkletRuntimeCallbacksAllowed(workletRuntimeGeneration)") &&
    moduleSource.includes("callback->call(runtime);"),
  "Worklet runtime install should expose a generation-gated main-queue async callback scheduler",
);
assert(
  moduleSource.includes("logNativeScriptWorkletRuntimeException") &&
    normalizedModuleSource.includes(
      'logNativeScriptWorkletRuntimeException( "runtimeCallbackInvoker", error)',
    ) &&
    normalizedModuleSource.includes(
      'logNativeScriptWorkletRuntimeException( "dispatchAsyncOnMainQueue", error)',
    ),
  "Worklet runtime scheduled callbacks should log exceptions instead of allowing opaque native aborts",
);
assert(
  normalizedModuleSource.includes(
    "config.runtimeCallbackInvoker = [workletRuntimeWeak, workletRuntimeGeneration]( std::function<void()> task) mutable { if (!nativeScriptWorkletRuntimeCallbacksAllowed(workletRuntimeGeneration)) { return; } auto runtimeStrong = workletRuntimeWeak.lock();",
  ) &&
    !normalizedModuleSource.includes(
      "dispatch_semaphore_wait(done, dispatch_time(DISPATCH_TIME_NOW, 2 * NSEC_PER_SEC))",
    ),
  "runtime callbacks must execute inline via runSync on the caller thread — the schedule-and-timed-wait design dropped callbacks under contention (dismissal bookkeeping) and serialized UIKit delegate bursts into multi-second freezes",
);
assert(
  moduleSource.indexOf("__nativeScriptDispatchAsyncOnMainQueue") <
    moduleSource.indexOf("__nativeScriptRefreshUIKitHostView"),
  "main-queue scheduler should be installed before UIKit host worklet globals use it",
);
assert(
  moduleSource.includes("config.callbackInvocationAllowed"),
  "Worklet runtime install should gate native callbacks during runtime invalidation",
);
assert(
  moduleSource.includes("config.installGlobalSymbols = false") &&
    !moduleSource.includes("config.installGlobalSymbols = true"),
  "React Native and Worklet installs should keep NativeScript globals opt-in",
);
{
  const rnJsiConfig = readRepo("NativeScript/ffi/objc/hermes/NativeApiJsiReactNative.h");
  const backendConfig = readRepo(
    "NativeScript/ffi/objc/shared/NativeApiBackendConfig.h",
  );
  const bridgeSource = readRepo("NativeScript/ffi/objc/shared/bridge/ObjCBridge.mm");
  assert(
    backendConfig.includes("bool indexRuntimePointers = true") &&
      rnJsiConfig.includes("config.indexRuntimePointers = false") &&
      bridgeSource.includes("indexRuntimePointers_(config.indexRuntimePointers)") &&
      bridgeSource.includes("if (indexRuntimePointers_) {\n        Class cls = objc_lookUpClass") &&
      bridgeSource.includes("if (indexRuntimePointers_) {\n        Protocol* protocol = lookupProtocolByNativeName"),
    "React Native Native API installs should avoid eagerly resolving every runtime class/protocol pointer",
  );
}
assert(
  moduleSource.includes("RCTBridgeWillInvalidateModulesNotification"),
  "Native module should stop runtime callbacks before React Native invalidates modules",
);
assert(
  moduleSource.includes("nativeScriptWorkletRuntimeGeneration"),
  "Native module should generation-gate callbacks so stale runtimes cannot resume after reload",
);
assert(
  normalizedModuleSource.includes(
    "runtimeStrong->runSync( [&task, workletRuntimeGeneration](jsi::Runtime&) { if (nativeScriptWorkletRuntimeCallbacksAllowed( workletRuntimeGeneration)) { task(); } })",
  ),
  "runtime callbacks must re-check the runtime generation inside runSync so stale runtimes cannot execute callbacks after reload",
);
assert(
  !moduleSource.includes("__nativeScriptAfterUIKitTransition"),
  "Native module should not install transition-specific host functions",
);

{
  const callbackSource = readRepo("NativeScript/ffi/objc/shared/bridge/Callbacks.mm");
  const classBuilderSource = readRepo(
    "NativeScript/ffi/objc/shared/bridge/ClassBuilder.mm",
  );
  // The method-policy DSL is intentionally trimmed to its two live fields:
  // callSuperBeforeCallback and skipCallbackIfAssociatedObjectTruthy (read
  // from a JS function's __nativeScriptMethodPolicy expando). The fuller DSL
  // below (argument-index targets, associated-object condition/comparison
  // trees, keyPath assignments, typed skip-return values, and class-level
  // ObjCMethodPolicies/methodPolicies plumbing) had no caller anywhere in
  // the fork or its own pin tests advertising it, so it's cut along with
  // the matching runtime surface.
  assert(
    callbackSource.includes("__nativeScriptMethodPolicy") &&
      callbackSource.includes("callSuperBeforeCallback") &&
      callbackSource.includes("skipCallbackIfAssociatedObjectTruthy"),
    "native callbacks should parse the trimmed native method policy",
  );
  assert(
    !callbackSource.includes("skipCallbackIfAllAssociatedObjectConditions") &&
      !callbackSource.includes("setAssociatedObjectsBeforeSkip") &&
      !callbackSource.includes("setKeyPathValuesBeforeSkip") &&
      !callbackSource.includes("returnValueIfSkipped") &&
      !callbackSource.includes("objectForMethodPolicyTarget") &&
      !callbackSource.includes("TargetKind::Argument") &&
      !callbackSource.includes("associatedObjectsAreEqual") &&
      !callbackSource.includes("storePrimitivePolicyReturnValue"),
    "native callbacks should not carry the dead method-policy DSL (no caller ever used it)",
  );
  assert(
    callbackSource.includes("invokeMethodSuper(ret, args)") &&
      callbackSource.includes("shouldSkipMethodCallback(args, ret)") &&
      callbackSource.indexOf("invokeMethodSuper(ret, args)") <
        callbackSource.indexOf("invokeOnCurrentThread(ret, args"),
    "method policy should call native super and skip before JS argument conversion",
  );
  assert(
    callbackSource.includes("methodCallbackReceiver(args)") &&
      callbackSource.includes("associatedObjectIsTruthy") &&
      callbackSource.includes("shouldSkipConstructingMethodCallback"),
    "method policy should check the receiver's associated-object skip key and the construction-state re-entry guard",
  );
  assert(
    callbackSource.includes("Class superDispatchClass = methodBaseClass_;") &&
      callbackSource.includes("makeNativeObjectValue(\n                *runtime_, bridge_, self, false, superDispatchClass)"),
    "callback-bound this.super should dispatch from the lexical override superclass " +
      "(methodBaseClass_ IS the override's base class already -- must be used directly, " +
      "not further superclassed, or a member declared exactly on it becomes unreachable via this.super)",
  );
  assert(
    classBuilderSource.includes("returnOwned, baseClass"),
    "class overrides should pass their base class to method callback policy",
  );
  assert(
    !classBuilderSource.includes('options.methodPolicies') &&
      !classBuilderSource.includes('options.nativeMethodPolicies') &&
      !classBuilderSource.includes("methodCallbackPolicyForSelector"),
    "class extension options should not plumb class-level method policies (no caller ever set them; only the per-function nativeMethodPolicy() expando path is live)",
  );
  assert(
    classBuilderSource.includes("nativeAccessorCallbackPolicy(") &&
      classBuilderSource.includes("skipCallbackIfAssociatedObjectTruthy.push_back(\n      \"__nativeApiAccessorCallbackState\")"),
    "native accessor (getter/setter) overrides should auto-apply the accessor re-entry guard policy",
  );
  assert(
    classBuilderSource.includes("methodBaseClass") &&
      classBuilderSource.includes("std::move(methodPolicy)") &&
      classBuilderSource.includes("addEngineExposedMethod(runtime, bridge, nativeClass, selectorName"),
    "explicit exposed method overrides should also receive base class and method policy plumbing",
  );
  for (const relativePath of [
    "packages/react-native/native-api/ffi/objc/shared/bridge/Install.mm",
    "NativeScript/ffi/objc/shared/bridge/Install.mm",
  ]) {
    if (!fs.existsSync(path.join(repoRoot, relativePath))) {
      continue;
    }
    const installSource = readRepo(relativePath);
    assert(
      !installSource.includes("constructor.ObjCMethodPolicies") &&
        !installSource.includes("options.methodPolicies = constructor.ObjCMethodPolicies"),
      `${relativePath} should not pass a class-level ObjCMethodPolicies map into __extendClass (dead DSL)`,
    );
  }
  for (const relativePath of [
    "packages/react-native/native-api/ffi/objc/shared/bridge/host_objects/Object.mm",
    "NativeScript/ffi/objc/shared/bridge/host_objects/Object.mm",
  ]) {
    if (!fs.existsSync(path.join(repoRoot, relativePath))) {
      continue;
    }
    const hostObjectSource = readRepo(relativePath);
    assert(
      hostObjectSource.includes("Class superDispatchClass_ = Nil") &&
        hostObjectSource.includes("void setSuperDispatchClass(Class superDispatchClass) {") &&
        hostObjectSource.includes("superDispatchClass_ != Nil") &&
        hostObjectSource.includes("std::make_shared<NativeApiSuperHostObject>"),
      `${relativePath} should let callback-bound object wrappers override super dispatch class`,
    );
  }
}

for (const relativePath of [
  "packages/react-native/native-api/ffi/objc/shared/NativeApiBackendConfig.h",
  "NativeScript/ffi/objc/shared/NativeApiBackendConfig.h",
]) {
  if (!fs.existsSync(path.join(repoRoot, relativePath))) {
    continue;
  }
  const source = readRepo(relativePath);
  assert(
    source.includes("runtimeCallbackInvoker"),
    `${relativePath} should expose a generic runtime callback invoker`,
  );
  assert(
    source.includes("callbackInvocationAllowed"),
    `${relativePath} should expose a generic callback invocation gate`,
  );
}

for (const relativePath of [
  "packages/react-native/native-api/ffi/objc/shared/bridge/Callbacks.mm",
  "NativeScript/ffi/objc/shared/bridge/Callbacks.mm",
]) {
  if (!fs.existsSync(path.join(repoRoot, relativePath))) {
    continue;
  }
  const source = readRepo(relativePath);
  assert(
    source.includes("NativeApiCallbackThreadPolicy::Runtime"),
    `${relativePath} should support the runtime callback policy`,
  );
  assert(
    source.includes('policy == "runtime"'),
    `${relativePath} should parse runtime callback policy markers`,
  );
  assert(
    source.includes("bridge_->runtimeCallbackInvoker()"),
    `${relativePath} should dispatch runtime-marked callbacks through the generic invoker`,
  );
  assert(
    source.includes("callbackInvocationAllowed()") &&
      source.includes("zeroReturnValue(ret)"),
    `${relativePath} should zero-return native callbacks once their runtime is invalidating`,
  );
  const bridgeRelativePath = relativePath.replace("Callbacks.mm", "ObjCBridge.mm");
  const bridgeSource = readRepo(bridgeRelativePath);
  assert(
    bridgeSource.includes("bool callbackInvocationAllowed() const noexcept") &&
      bridgeSource.includes("@try") &&
      bridgeSource.includes("@catch (...)") &&
      bridgeSource.includes("catch (...)") &&
      bridgeSource.includes("return false;"),
    `${bridgeRelativePath} should make the callback invocation gate no-throw for C++ and Objective-C exceptions`,
  );
  assert(
    source.includes("parseObjCCallbackEngineSignature") &&
      source.includes("objcSignatureEncoding"),
    `${relativePath} should build callbacks from explicit ObjC encodings`,
  );
}

for (const relativePath of [
  "packages/react-native/native-api/ffi/objc/shared/bridge/Install.mm",
  "NativeScript/ffi/objc/shared/bridge/Install.mm",
]) {
  if (!fs.existsSync(path.join(repoRoot, relativePath))) {
    continue;
  }
  const source = readRepo(relativePath);
  assert(
    source.includes('NativeApiWriteSmokeStage("engine:skip-globals")') &&
      !source.includes('InstallAggregateGlobals(runtime, api, "protocolNames")'),
    `${relativePath} should not eagerly install protocol globals when globals are disabled`,
  );
}

console.log("runtime callback policy tests passed");

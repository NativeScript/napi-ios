const assert = require("assert");
const fs = require("fs");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(packageRoot, relativePath), "utf8");
}

const index = read("src/index.ts");
assert(
  index.includes("gestureAction("),
  "UIKit context should expose a gestureAction helper",
);
assert(
  index.includes("delegate(object, protocolRef, implementation, options = {})"),
  "UIKit context delegate helper should accept delegate creation options",
);
assert(
  index.includes("wrapDelegateMethods(implementation, options.thread ?? \"caller\")") &&
    index.includes("const owner = options.owner ?? context") &&
    index.includes("const assignedObject = (options.assignTo?.object ??") &&
    index.includes("assignedObject[assignedProperty] = delegate"),
  "UIKit context delegate helper should support thread, owner, and assignTo options inline on the UI runtime",
);
assert(
  index.includes("targetAction(control, events, callback)"),
  "UIKit context should expose a targetAction helper",
);
assert(
  index.includes("actionTarget(callback)"),
  "UIKit context should expose a generic target/action helper",
);
assert(
  index.includes("function createNativeActionTarget(") &&
    !index.includes("export function createNativeActionTarget("),
  "runtime should keep a standalone native target/action helper as an internal primitive",
);
assert(
  index.includes("function invokeNativeActionTarget(") &&
    !index.includes("export function invokeNativeActionTarget("),
  "runtime should keep a generic worklet-block target/action invoker as an internal primitive",
);
assert(
  index.includes("function createNativeUIAction(") &&
    !index.includes("export function createNativeUIAction("),
  "runtime should keep a retained UIAction helper as an internal primitive",
);
assert(
  index.includes("function canCreateNativeUIAction()") &&
    !index.includes("export function canCreateNativeUIAction()"),
  "runtime should keep UIAction helper availability as an internal primitive",
);
assert(
  index.includes("function canCreateNativeActionTarget()") &&
    !index.includes("export function canCreateNativeActionTarget()"),
  "runtime should keep target/action availability as an internal primitive",
);
assert(
  index.includes("if (!canCreateNativeActionTarget())"),
  "standalone native target/action helper should guard runtimes without class extension support",
);
assert(
  index.includes('const nsObject = nativeApiClass("NSObject")') &&
    index.includes('getClass<any>("NSObject")') &&
    index.includes("const extendClass = api.__extendClass") &&
    !index.includes("(globalThis as Record<string, any>).NSObject"),
  "UIKit target/action availability should use UI-safe native class lookup while allocation still uses lazy Native API class wrappers",
);
assert(
  index.includes("Object.prototype.hasOwnProperty.call(target, property)") &&
    index.includes("if (nativeValue !== undefined)") &&
    !index.includes("if (property in target) {\n        return Reflect.get(target, property, receiver);\n      }\n      if (cachedNativeFunctions.has(property))"),
  "extended Native API class wrappers should resolve subclass native methods before inherited base wrapper methods",
);
assert(
  index.includes('Object.defineProperty(constructable, "construct"') &&
    index.includes('Object.defineProperty(constructable, "alloc"') &&
    index.includes("return rememberInstanceClass(cls.alloc());") &&
    index.includes("typeof cls.new === \"function\"") &&
    index.includes("return rememberInstanceClass(cls.new());"),
  "Native API class wrappers should expose own construct/alloc/new methods so extended classes allocate and initialize their own native class",
);
assert(
  index.includes("function rememberNativeObjectClass") &&
    index.includes("__rememberObjectClassWrapper") &&
    index.includes("rememberNativeObjectClass(value, wrapper || constructable)"),
  "Native API class wrappers should remember object instances against their JS wrapper",
);
assert(
  index.includes("function createNativeClassInstance") &&
    index.includes("nativeClass.new()") &&
    index.includes("nativeClass.alloc()") &&
    !index.includes("getTargetActionClass().alloc().init()") &&
    !index.includes("DelegateClass.alloc().init()") &&
    !index.includes("getObserverClass().alloc().init()"),
  "runtime-generated target/delegate/observer classes should instantiate through the generic native class helper",
);
assert(
  index.includes("function invokeNativeScriptCallback("),
  "UIKit native callbacks should route through a shared callback scheduler",
);
assert(
  index.includes("const delegateClassOptions: Record<string, unknown> = {\n    protocols: protocolList,") &&
    index.includes("if (options.name) {\n    delegateClassOptions.name = options.name;\n  }") &&
    index.includes("delegateClassOptions,\n  );") &&
    !index.includes("name: options.name,"),
  "createDelegate should omit undefined class names when extending NSObject",
);
assert(
  index.includes('nativeScriptCallbackThread(callback) !== "js"'),
  "callback scheduler should distinguish JS-owned callbacks from runtime callbacks",
);
assert(
  index.includes("workletsProxy.scheduleOnRN(handler, serializer(args))"),
  "JS-owned UIKit callbacks should schedule asynchronously onto the RN runtime",
);
assert(
  index.includes("invokeNativeScriptCallback(callback, [], () => disposed)"),
  "targetAction should honor callback thread policy instead of calling callbacks synchronously",
);
assert(
  index.includes("nativeGesture.addTargetAction(target, selector)"),
  "gestureAction should attach a target/action to UIGestureRecognizer",
);
assert(
  index.includes("nativeGesture.removeTargetAction(target, selector)"),
  "gestureAction should remove the target/action on dispose",
);
assert(
  index.includes("callback(sender ?? gesture)"),
  "gestureAction should pass the recognizer sender to the callback",
);
assert(
  index.includes("invokeNativeScriptCallback(callback, [sender], () => disposed)"),
  "actionTarget should honor callback thread policy and pass the sender",
);
assert(
  index.includes("targetActionCallbacksForRuntime().set(targetKey, (sender) =>") &&
    index.includes("targetActionCallbacksForRuntime().delete(targetKey)") &&
    index.includes("callbackKey: targetKey") &&
    index.includes("invokeNativeScriptCallback(callback, [sender], () => disposed)") &&
    index.includes("invoke,"),
  "standalone native action targets should retain callbacks, expose their stable callback key, provide direct worklet invocation, and dispose them",
);
assert(
  index.includes('const block = InteropBlock(\n    "v@?@",') &&
    index.includes("eventBridge((sender: unknown) =>") &&
    index.includes('}, "runtime")') &&
    index.includes('const defaultNativeRetainerGlobalName = "__nativeScriptDefaultNativeRetainer";') &&
    index.includes("function defaultNativeRetainerForRuntime(): NativeRetainer") &&
    index.includes("const retainer = defaultNativeRetainerForRuntime();") &&
    index.includes("retainer.retain(actionTarget.target)") &&
    index.includes("retainer.retain(block)") &&
    index.includes("retainer.retain(action)") &&
    index.includes('"__nativeScriptUIActionTarget"') &&
    index.includes('"__nativeScriptUIActionBlock"') &&
    index.includes("actionTarget.dispose();"),
  "native UIActions should retain their block/action target lifetimes per runtime and dispose callback table entries",
);
assert(
  index.includes('const invokeNativeActionTargetGlobalName =\n  "__nativeScriptInvokeNativeActionTarget";') &&
    index.includes('if (typeof actionTarget?.invoke === "function")') &&
    index.includes("return actionTarget.invoke(sender) === true;") &&
    index.includes("function invokeNativeActionTargetFromRuntime(") &&
    index.includes("function installNativeActionTargetInvoker()") &&
    index.includes("installNativeActionTargetInvoker();") &&
    index.includes('typeof actionTarget.callbackKey === "string"') &&
    index.includes("const callback = targetActionCallbacksForRuntime().get(targetKey);") &&
    index.includes("callback(sender);\n  return true;"),
  "invokeNativeActionTarget should use a UI-runtime global entrypoint backed by the target/action callback table",
);
assert(
  index.includes("observeValueForKeyPathOfObjectChangeContext(") &&
    index.includes('"observeValueForKeyPath:ofObject:change:context:"') &&
    index.includes("observerCallbacksForRuntime().get("),
  "KVO observers should implement the JSified NativeScript selector while exposing the Objective-C selector",
);
assert(
  index.includes('action: "nativeScriptHandleAction:"'),
  "actionTarget should return the Objective-C selector name",
);

const declarations = read("src/index.ts");
assert(
  declarations.includes("gestureAction(") &&
    declarations.includes("callback: (gesture: unknown) => void") &&
    declarations.includes("actionTarget(callback: (sender: unknown) => void)"),
  "UIKitViewContext should expose gestureAction/actionTarget helpers that pass the recognizer/sender to callbacks",
);
assert(
  declarations.includes("export type NativeActionTarget") &&
    declarations.includes("callbackKey: string;") &&
    declarations.includes("invoke(sender?: unknown): boolean;") &&
    declarations.includes("export type NativeUIAction") &&
    declarations.includes("function canCreateNativeActionTarget(") &&
    declarations.includes("function createNativeActionTarget(") &&
    declarations.includes("function invokeNativeActionTarget(") &&
    declarations.includes("function canCreateNativeUIAction(") &&
    declarations.includes("function createNativeUIAction(") &&
    !declarations.includes("createNativeUIAction: typeof createNativeUIAction"),
  "NativeActionTarget/NativeUIAction stay public types while their action-target factories became internal primitives",
);

console.log("uikit gesture action API tests passed");

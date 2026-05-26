import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import NativeScript, {
  defineUIKitContainer,
  defineUIKitView,
  defineUIViewController,
} from '@nativescript/react-native';
import NativeScriptNativeApi from '@nativescript/react-native/src/NativeScriptNativeApi';

declare const require: any;

type TestStatus = 'pass' | 'fail' | 'skip';

type TestCase = {
  name: string;
  run: () => void | Promise<void>;
};

type TestResult = {
  name: string;
  status: TestStatus;
  error?: string;
};

type RuntimeSpec = {
  name: string;
  run: Function;
  beforeEach: Function[];
  afterEach: Function[];
};

type RuntimeSuite = {
  name: string;
  beforeEach: Function[];
  afterEach: Function[];
};

type RuntimeSpecRegistry = {
  specs: RuntimeSpec[];
  skipped: TestResult[];
};

const marker = 'NATIVESCRIPT_RN_FFI_COMPAT';
const runtimeSpecTimeoutMs = 15000;
const runtimeFailureLimit = 25;
let currentStep = 'startup';
let lastGlobalAccess = '';
let activeAsyncReject: ((reason?: unknown) => void) | null = null;
const uikitPluginIdentifier = 'NativeScriptUIKitPluginView';
const uikitPluginLabelTag = 101;

class PendingSpecError extends Error {
  constructor(message = 'Pending') {
    super(message);
    this.name = 'PendingSpecError';
  }
}

function g(name: string): any {
  lastGlobalAccess = name;
  return (globalThis as Record<string, any>)[name];
}

function step<T>(name: string, callback: () => T): T {
  currentStep = name;
  return callback();
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function assertEqual<T>(actual: T, expected: T, message: string) {
  if (!Object.is(actual, expected)) {
    throw new Error(`${message}: expected ${String(expected)}, got ${String(actual)}`);
  }
}

function assertClose(actual: number, expected: number, message: string) {
  if (Math.abs(actual - expected) > 0.0001) {
    throw new Error(`${message}: expected ${expected}, got ${actual}`);
  }
}

function ptrNumber(value: any): number {
  assert(value && typeof value.toNumber === 'function', 'expected Pointer value');
  return value.toNumber();
}

function sameNativeHandle(a: any, b: any): boolean {
  const interop = g('interop');
  return ptrNumber(interop.handleof(a)) === ptrNumber(interop.handleof(b));
}

function stringify(value: unknown): string {
  if (typeof value === 'string') {
    return JSON.stringify(value);
  }
  if (typeof value === 'function') {
    return `[Function ${value.name || 'anonymous'}]`;
  }
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function fail(message: string): never {
  throw new Error(message);
}

function writeMarker(payload: unknown) {
  const content = JSON.stringify(payload, null, 2);
  const writer = (NativeScriptNativeApi as any).__writeTestMarker;
  if (typeof writer === 'function') {
    writer(content);
  }
  console.log(`${marker} ${content}`);
}

function waitFor<T>(
  read: () => T | undefined | null | false,
  message: string,
  timeoutMs = 5000,
): Promise<T> {
  const startedAt = Date.now();
  return new Promise((resolve, reject) => {
    function poll() {
      const value = read();
      if (value) {
        resolve(value);
        return;
      }
      if (Date.now() - startedAt > timeoutMs) {
        reject(new Error(message));
        return;
      }
      setTimeout(poll, 50);
    }
    poll();
  });
}

function waitForAsync<T>(
  read: () => Promise<T | undefined | null | false>,
  message: string,
  timeoutMs = 5000,
): Promise<T> {
  const startedAt = Date.now();
  return new Promise((resolve, reject) => {
    async function poll() {
      const value = await read();
      if (value) {
        resolve(value);
        return;
      }
      if (Date.now() - startedAt > timeoutMs) {
        reject(new Error(message));
        return;
      }
      setTimeout(poll, 50);
    }
    poll().catch(reject);
  });
}

function isAsymmetricAny(value: unknown): value is {expectedType: Function} {
  return (
    Boolean(value) &&
    typeof value === 'object' &&
    (value as Record<string, unknown>).__nativeScriptJasmineAny === true &&
    typeof (value as Record<string, unknown>).expectedType === 'function'
  );
}

function matchesAny(actual: unknown, expectedType: Function): boolean {
  if (expectedType === String) {
    return typeof actual === 'string' || actual instanceof String;
  }
  if (expectedType === Number) {
    return typeof actual === 'number' || actual instanceof Number;
  }
  if (expectedType === Boolean) {
    return typeof actual === 'boolean' || actual instanceof Boolean;
  }
  if (expectedType === Function) {
    return typeof actual === 'function';
  }
  return actual instanceof (expectedType as any);
}

function deepEqual(actual: unknown, expected: unknown, seen = new Set<object>()): boolean {
  if (isAsymmetricAny(expected)) {
    return matchesAny(actual, expected.expectedType);
  }
  if (Object.is(actual, expected)) {
    return true;
  }
  if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();
  }
  if (actual instanceof ArrayBuffer && expected instanceof ArrayBuffer) {
    if (actual.byteLength !== expected.byteLength) {
      return false;
    }
    const actualBytes = new Uint8Array(actual);
    const expectedBytes = new Uint8Array(expected);
    return actualBytes.every((value, index) => value === expectedBytes[index]);
  }
  if (ArrayBuffer.isView(actual as any) && ArrayBuffer.isView(expected as any)) {
    const actualView = actual as ArrayLike<unknown>;
    const expectedView = expected as ArrayLike<unknown>;
    if (actualView.length !== expectedView.length) {
      return false;
    }
    for (let i = 0; i < actualView.length; i++) {
      if (!deepEqual(actualView[i], expectedView[i], seen)) {
        return false;
      }
    }
    return true;
  }
  if (
    actual == null ||
    expected == null ||
    typeof actual !== 'object' ||
    typeof expected !== 'object'
  ) {
    return false;
  }
  if (seen.has(actual)) {
    return true;
  }
  seen.add(actual);
  const actualKeys = Object.keys(actual as Record<string, unknown>);
  const expectedKeys = Object.keys(expected as Record<string, unknown>);
  if (actualKeys.length !== expectedKeys.length) {
    return false;
  }
  for (const key of expectedKeys) {
    if (!Object.prototype.hasOwnProperty.call(actual, key)) {
      return false;
    }
    if (
      !deepEqual(
        (actual as Record<string, unknown>)[key],
        (expected as Record<string, unknown>)[key],
        seen,
      )
    ) {
      return false;
    }
  }
  return true;
}

function installRuntimeSpecGlobals(): RuntimeSpecRegistry {
  const registry: RuntimeSpecRegistry = {specs: [], skipped: []};
  const rootSuite: RuntimeSuite = {name: 'runtime ffi', beforeEach: [], afterEach: []};
  const suiteStack: RuntimeSuite[] = [rootSuite];
  const globalObject = globalThis as Record<string, any>;
  const originalSetTimeout = globalObject.setTimeout;

  globalObject.global = globalThis;
  globalObject.isSimulator = true;
  globalObject.__runtimeVersion = {major: 999, minor: 0, patch: 0};
  globalObject.process = {
    ...(globalObject.process ?? {}),
    versions: {
      ...(globalObject.process?.versions ?? {}),
      engine: 'hermes',
    },
  };
  if (typeof globalObject.gc !== 'function') {
    globalObject.gc = () => undefined;
  }
  globalObject.utf8 = require('./ns-runtime-tests/Infrastructure/utf8');
  globalObject.UNUSED = function (_param: unknown) {
    return undefined;
  };

  globalObject.setTimeout = (callback: Function, timeout?: number, ...args: unknown[]) =>
    originalSetTimeout(
      (...callbackArgs: unknown[]) => {
        try {
          callback(...callbackArgs);
        } catch (error) {
          if (activeAsyncReject) {
            activeAsyncReject(error);
            return;
          }
          throw error;
        }
      },
      timeout,
      ...args,
    );

  globalObject.describe = (name: string, body: Function) => {
    const suite: RuntimeSuite = {name: String(name), beforeEach: [], afterEach: []};
    suiteStack.push(suite);
    try {
      body();
    } finally {
      suiteStack.pop();
    }
  };

  const skipReasonForRuntimeSpec = (
    specName: string,
    body: Function,
  ): string | undefined => {
    let source = '';
    try {
      source = Function.prototype.toString.call(body);
    } catch {
      source = '';
    }

    if (source.includes('interop.addMethod')) {
      return 'Requires interop.addMethod; excluded from the RN direct-JSI FFI slice until the explicit decorator hook is implemented.';
    }
    return undefined;
  };

  globalObject.it = (name: string, body: Function) => {
    const suites = suiteStack.slice(1);
    const specName = `${suites.map((suite) => suite.name).join(' > ')} > ${name}`;
    const skipReason = skipReasonForRuntimeSpec(specName, body);
    if (skipReason) {
      registry.skipped.push({
        name: specName,
        status: 'skip',
        error: skipReason,
      });
      return;
    }
    registry.specs.push({
      name: specName,
      run: body,
      beforeEach: suiteStack.flatMap((suite) => suite.beforeEach),
      afterEach: suiteStack
        .slice()
        .reverse()
        .flatMap((suite) => suite.afterEach),
    });
  };

  globalObject.xit = (name: string) => {
    const suites = suiteStack.slice(1);
    registry.skipped.push({
      name: `${suites.map((suite) => suite.name).join(' > ')} > ${name}`,
      status: 'skip',
      error: 'Disabled with xit',
    });
  };
  globalObject.fit = globalObject.it;

  globalObject.beforeEach = (body: Function) => {
    suiteStack[suiteStack.length - 1].beforeEach.push(body);
  };
  globalObject.afterEach = (body: Function) => {
    suiteStack[suiteStack.length - 1].afterEach.push(body);
  };
  globalObject.pending = (reason?: string) => {
    throw new PendingSpecError(reason || 'Pending');
  };
  globalObject.jasmine = {
    any(expectedType: Function) {
      return {__nativeScriptJasmineAny: true, expectedType};
    },
  };

  globalObject.expect = (actual: unknown) => {
    const makeMatchers = (negated: boolean) => {
      const check = (condition: boolean, message: string) => {
        const passed = negated ? !condition : condition;
        if (!passed) {
          fail(negated ? `Expected not: ${message}` : message);
        }
      };

      return {
        toBe(expected: unknown, message?: string) {
          check(
            Object.is(actual, expected),
            message || `expected ${stringify(actual)} to be ${stringify(expected)}`,
          );
        },
        toEqual(expected: unknown, message?: string) {
          check(
            deepEqual(actual, expected),
            message || `expected ${stringify(actual)} to equal ${stringify(expected)}`,
          );
        },
        toBeDefined(message?: string) {
          check(actual !== undefined, message || `expected ${stringify(actual)} to be defined`);
        },
        toBeUndefined(message?: string) {
          check(actual === undefined, message || `expected ${stringify(actual)} to be undefined`);
        },
        toBeNull(message?: string) {
          check(actual === null, message || `expected ${stringify(actual)} to be null`);
        },
        toBeTruthy(message?: string) {
          check(Boolean(actual), message || `expected ${stringify(actual)} to be truthy`);
        },
        toBeGreaterThan(expected: number, message?: string) {
          check(
            typeof actual === 'number' && actual > expected,
            message || `expected ${stringify(actual)} to be greater than ${expected}`,
          );
        },
        toContain(expected: unknown, message?: string) {
          check(
            typeof actual === 'string'
              ? actual.includes(String(expected))
              : Array.isArray(actual) && actual.includes(expected),
            message || `expected ${stringify(actual)} to contain ${stringify(expected)}`,
          );
        },
        toMatch(expected: RegExp | string, message?: string) {
          const text = String(actual);
          const matched =
            expected instanceof RegExp ? expected.test(text) : text.includes(String(expected));
          check(matched, message || `expected ${text} to match ${String(expected)}`);
        },
        toBeCloseTo(expected: number, precision = 2, message?: string) {
          const tolerance = Math.pow(10, -precision) / 2;
          check(
            typeof actual === 'number' && Math.abs(actual - expected) < tolerance,
            message || `expected ${stringify(actual)} to be close to ${expected}`,
          );
        },
        toThrow(message?: string) {
          checkThrows(actual, undefined, message, check);
        },
        toThrowError(expected?: RegExp | string | Function, message?: string) {
          checkThrows(actual, expected, message, check);
        },
      };
    };

    const matchers: any = makeMatchers(false);
    matchers.not = makeMatchers(true);
    return matchers;
  };

  return registry;
}

function checkThrows(
  actual: unknown,
  expected: RegExp | string | Function | undefined,
  message: string | undefined,
  check: (condition: boolean, message: string) => void,
) {
  if (typeof actual !== 'function') {
    check(false, message || 'expected value to be a function that throws');
    return;
  }

  let thrown: unknown;
  try {
    actual();
  } catch (error) {
    thrown = error;
  }

  if (thrown === undefined) {
    check(false, message || 'expected function to throw');
    return;
  }

  if (expected === undefined) {
    check(true, '');
    return;
  }

  const thrownMessage = thrown instanceof Error ? thrown.message : String(thrown);
  if (expected instanceof RegExp) {
    check(
      expected.test(thrownMessage),
      message || `expected thrown error ${thrownMessage} to match ${expected}`,
    );
  } else if (typeof expected === 'string') {
    check(
      thrownMessage.includes(expected),
      message || `expected thrown error ${thrownMessage} to include ${expected}`,
    );
  } else {
    check(thrown instanceof (expected as any), message || 'expected thrown error type to match');
  }
}

function loadRuntimeFfiSpecs() {
  require('./ns-runtime-tests/FunctionsTests');
  require('./ns-runtime-tests/MethodCallsTests');
  require('./ns-runtime-tests/Marshalling/Primitives/Function');
  require('./ns-runtime-tests/Marshalling/Primitives/Static');
  require('./ns-runtime-tests/Marshalling/Primitives/Instance');
  require('./ns-runtime-tests/Marshalling/Primitives/Derived');
  require('./ns-runtime-tests/Marshalling/ObjCTypesTests');
  require('./ns-runtime-tests/Marshalling/ConstantsTests');
  require('./ns-runtime-tests/Marshalling/RecordTests');
  require('./ns-runtime-tests/Marshalling/VectorTests');
  require('./ns-runtime-tests/Marshalling/NSStringTests');
  require('./ns-runtime-tests/Marshalling/PointerTests');
  require('./ns-runtime-tests/Marshalling/ReferenceTests');
  require('./ns-runtime-tests/Marshalling/FunctionPointerTests');
  require('./ns-runtime-tests/Marshalling/EnumTests');
  require('./ns-runtime-tests/Marshalling/ProtocolTests');
}

async function runFunction(functionToRun: Function): Promise<void> {
  if (functionToRun.length > 0) {
    await new Promise<void>((resolve, reject) => {
      let settled = false;
      const timeout = setTimeout(() => {
        if (!settled) {
          settled = true;
          reject(new Error(`Timed out after ${runtimeSpecTimeoutMs}ms`));
        }
      }, runtimeSpecTimeoutMs);
      activeAsyncReject = reject;
      const done = (error?: unknown) => {
        if (settled) {
          return;
        }
        settled = true;
        clearTimeout(timeout);
        activeAsyncReject = null;
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      };
      (done as Record<string, unknown>).fail = done;
      try {
        functionToRun(done);
      } catch (error) {
        done(error);
      }
    });
    return;
  }

  const result = functionToRun();
  if (result && typeof result.then === 'function') {
    await result;
  }
}

async function runRuntimeSpecs(
  registry: RuntimeSpecRegistry,
  progress: (current: string, results: TestResult[], total: number) => void,
): Promise<TestResult[]> {
  const results: TestResult[] = [...registry.skipped];
  const total = registry.specs.length + registry.skipped.length;

  for (const spec of registry.specs) {
    const startCount = results.length;
    progress(spec.name, results, total);

    try {
      for (const beforeEach of spec.beforeEach) {
        await runFunction(beforeEach);
      }
      await runFunction(spec.run);
      results.push({name: spec.name, status: 'pass'});
    } catch (error) {
      if (error instanceof PendingSpecError) {
        results.push({name: spec.name, status: 'skip', error: error.message});
      } else {
        results.push({
          name: spec.name,
          status: 'fail',
          error: error instanceof Error ? `${error.name}: ${error.message}` : String(error),
        });
        if (results.filter((result) => result.status === 'fail').length >= runtimeFailureLimit) {
          break;
        }
      }
    } finally {
      activeAsyncReject = null;
      for (const afterEach of spec.afterEach) {
        try {
          await runFunction(afterEach);
        } catch (error) {
          results.push({
            name: `${spec.name} cleanup`,
            status: 'fail',
            error:
              error instanceof Error
                ? `${error.name}: ${error.message}`
                : String(error),
          });
        }
      }
    }

    if (results.filter((result) => result.status === 'fail').length >= runtimeFailureLimit) {
      break;
    }
  }

  return results;
}

async function waitForUIKitPluginAttachment(): Promise<void> {
  await waitForAsync(
    async () => {
      let attached = false;
      await NativeScript.runOnUI(() => {
        const view = (globalThis as any).__nativeScriptUIKitPlugin?.view;
        attached = Boolean(view?.superview && view?.window);
      });
      return attached;
    },
    'JS-defined UIKit view was not attached to the RN tree',
  );
}

const NativeScriptUIKitTestView = defineUIKitView<{
  title: string;
  tint: 'blue' | 'green';
}>({
  name: 'NativeScriptUIKitTestView',
  create(props) {
    const view = g('UIView').alloc().initWithFrame(
      new (g('CGRect'))({
        origin: {x: 0, y: 0},
        size: {width: 160, height: 48},
      }),
    );
    view.accessibilityIdentifier = uikitPluginIdentifier;

    const label = g('UILabel').alloc().initWithFrame(
      new (g('CGRect'))({
        origin: {x: 8, y: 8},
        size: {width: 144, height: 32},
      }),
    );
    label.tag = uikitPluginLabelTag;
    label.textAlignment = g('NSTextAlignment').Center;
    label.textColor = g('UIColor').whiteColor;
    view.addSubview(label);

    (globalThis as any).__nativeScriptUIKitPlugin = {
      created: true,
      disposed: false,
      title: '',
      tint: props.tint,
      view,
    };
    return view;
  },
  mounted(view, props) {
    (globalThis as any).__nativeScriptUIKitPlugin.mounted = true;
    (globalThis as any).__nativeScriptUIKitPlugin.nativeHandle = g(
      'interop',
    ).handleof(view).address;
    (globalThis as any).__nativeScriptUIKitPlugin.title = props.title;
  },
  update(view, props) {
    view.backgroundColor =
      props.tint === 'green' ? g('UIColor').greenColor : g('UIColor').blueColor;
    const label = view.viewWithTag(uikitPluginLabelTag);
    label.text = props.title;
    (globalThis as any).__nativeScriptUIKitPlugin.title = props.title;
    (globalThis as any).__nativeScriptUIKitPlugin.tint = props.tint;
  },
  dispose() {
    const state = (globalThis as any).__nativeScriptUIKitPlugin;
    if (state) {
      state.disposed = true;
      state.view = null;
    }
  },
});

function rnPlanState(): any {
  const globalObject = globalThis as any;
  if (!globalObject.__nativeScriptRNPlan) {
    globalObject.__nativeScriptRNPlan = {
      lifecycle: [],
      disposeCalls: [],
      switchEvents: [],
      delegateEvents: [],
      notificationEvents: [],
      kvoEvents: [],
    };
  }
  return globalObject.__nativeScriptRNPlan;
}

const RNPlanLifecycleProbe = defineUIKitView<{value: number}>({
  name: 'RNPlanLifecycleProbe',
  create(ctx) {
    assert(g('NSThread').isMainThread, 'create did not run on main thread');
    rnPlanState().lifecycle.push(`create:${ctx.value}`);
    return g('UIView').new();
  },
  update(_view, props, _previous, ctx) {
    assert(g('NSThread').isMainThread, 'update did not run on main thread');
    rnPlanState().lifecycle.push(`update:${props.value}:${ctx?.name}`);
  },
  mounted() {
    assert(g('NSThread').isMainThread, 'mounted did not run on main thread');
    rnPlanState().lifecycle.push('mounted');
  },
  dispose() {
    assert(g('NSThread').isMainThread, 'dispose did not run on main thread');
    rnPlanState().lifecycle.push('dispose');
  },
});

const RNPlanDisposeProbe = defineUIKitView<{}>({
  name: 'RNPlanDisposeProbe',
  create(ctx) {
    ctx.dispose(() => rnPlanState().disposeCalls.push('first'));
    ctx.dispose(() => rnPlanState().disposeCalls.push('second'));
    ctx.retain({retained: true});
    return g('UIView').new();
  },
  dispose() {
    rnPlanState().disposeCalls.push('view');
  },
});

const RNPlanSwitchProbe = defineUIKitView<{
  value: boolean;
  onValueChange?: (value: boolean) => void;
}>({
  name: 'RNPlanSwitchProbe',
  create(ctx) {
    const view = g('UISwitch').new();
    ctx.targetAction(view, g('UIControlEvents').ValueChanged, () => {
      ctx.emit('onValueChange', view.on);
    });
    rnPlanState().switch = view;
    return view;
  },
  update(view, props) {
    if (view.on !== props.value) {
      view.setOnAnimated(props.value, false);
    }
  },
});

const RNPlanDelegateProbe = defineUIKitView<{onFire?: (value: string) => void}>({
  name: 'RNPlanDelegateProbe',
  create(ctx) {
    const view = g('UIView').new();
    const probe = g('TNSRNDelegateProbe').new();
    probe.value = 'delegate-value';
    ctx.delegate(probe, g('TNSRNDelegateProbeDelegate'), {
      probeDidFireValue(_probe: unknown, value: string) {
        ctx.emit('onFire', String(value));
      },
    });
    rnPlanState().delegateProbe = probe;
    return view;
  },
});

const RNPlanNotificationProbe = defineUIKitView<{
  onNotification?: (value: string) => void;
}>({
  name: 'RNPlanNotificationProbe',
  create(ctx) {
    const view = g('UIView').new();
    ctx.notification('TNSRNProbeNotification', null, (notification: any) => {
      ctx.emit('onNotification', String(notification.name));
    });
    return view;
  },
});

const RNPlanKVOProbe = defineUIKitView<{onTextObserved?: (value: string) => void}>({
  name: 'RNPlanKVOProbe',
  create(ctx) {
    const view = g('UIView').new();
    const observed = g('TNSRNObservableProbe').new();
    observed.value = 'initial';
    ctx.observe(observed, 'value', (value) => {
      ctx.emit('onTextObserved', String(value));
    });
    rnPlanState().observedProbe = observed;
    return view;
  },
});

const RNPlanIntrinsicLabel = defineUIKitView<{text: string}>({
  name: 'RNPlanIntrinsicLabel',
  layout: {
    sizing: 'intrinsic',
    defaultSize: {width: 1, height: 1},
  },
  create() {
    const label = g('UILabel').new();
    rnPlanState().intrinsicLabel = label;
    return label;
  },
  update(label, props, _previous, ctx) {
    label.text = props.text;
    ctx?.invalidateLayout();
  },
});

const RNPlanSizeThatFitsLabel = defineUIKitView<{text: string}>({
  name: 'RNPlanSizeThatFitsLabel',
  layout: {
    sizing: 'sizeThatFits',
    defaultSize: {width: 1, height: 1},
  },
  create() {
    return g('UILabel').new();
  },
  update(label, props, _previous, ctx) {
    label.text = props.text;
    ctx?.invalidateLayout();
  },
});

const RNPlanAutoLayoutLabel = defineUIKitView<{text: string}>({
  name: 'RNPlanAutoLayoutLabel',
  layout: {
    sizing: 'autoLayout',
    defaultSize: {width: 1, height: 1},
  },
  create() {
    const label = g('UILabel').new();
    label.translatesAutoresizingMaskIntoConstraints = false;
    return label;
  },
  update(label, props, _previous, ctx) {
    label.text = props.text;
    ctx?.invalidateLayout();
  },
});

const RNPlanContainer = defineUIKitContainer<{}>({
  name: 'RNPlanContainer',
  create() {
    const rootView = g('UIView').new();
    const childrenView = g('UIView').new();
    childrenView.accessibilityIdentifier = 'RNPlanContainerChildren';
    childrenView.frame = rootView.bounds;
    childrenView.autoresizingMask =
      g('UIViewAutoresizing').FlexibleWidth |
      g('UIViewAutoresizing').FlexibleHeight;
    rootView.addSubview(childrenView);
    rnPlanState().container = {rootView, childrenView};
    return {rootView, childrenView};
  },
});

const RNPlanViewControllerHost = defineUIViewController<{}>({
  name: 'RNPlanViewControllerHost',
  createController() {
    const controller = g('UIViewController').new();
    controller.view.backgroundColor = g('UIColor').clearColor;
    rnPlanState().controller = controller;
    return controller;
  },
});

function buildReactNativeIntegrationTests(): TestCase[] {
  return [
    {
      name: 'RN host installs fixture-aware metadata-backed globals',
      run() {
        const api = g('__nativeScriptNativeApi');
        assert(api, 'Native API host object was not installed');
        assertEqual(api.runtime, 'jsi', 'runtime kind');
        assertEqual(api.backend, 'hermes', 'runtime backend');
        assert(api.metadata.classes > 0, 'class metadata should be loaded');
        assert(api.metadata.functions > 0, 'function metadata should be loaded');
        assert(api.metadata.constants > 0, 'constant metadata should be loaded');
        assert(api.metadata.enums > 0, 'enum metadata should be loaded');
        assert(api.metadata.protocols > 0, 'protocol metadata should be loaded');
        assert(api.metadata.structs > 0, 'struct metadata should be loaded');
        assert(typeof g('TNSBaseInterface').alloc === 'function', 'TNSBaseInterface missing');
        assert(typeof g('functionWithInt') === 'function', 'functionWithInt missing');
        assertEqual(g('TNSConstant'), 'TNSConstant', 'TNSConstant');
      },
    },
    {
      name: 'dispatches Objective-C methods and properties with NativeScript-style calls',
      run() {
        const object = step('NSObject.alloc.init', () => g('NSObject').alloc().init());
        step('NSObject.respondsToSelector', () =>
          assert(object.respondsToSelector('init'), 'respondsToSelector failed'),
        );
        step('NSObject.isKindOfClass', () =>
          assert(object.isKindOfClass(g('NSObject')), 'isKindOfClass failed'),
        );
        step('NSObject.class', () =>
          assert(sameNativeHandle(object.class(), g('NSObject')), 'class() returned unexpected class'),
        );

        const array = step('NSMutableArray.alloc.init', () =>
          g('NSMutableArray').alloc().init(),
        );
        step('NSMutableArray.addObject alpha', () => array.addObject('alpha'));
        step('NSMutableArray.addObject beta', () => array.addObject('beta'));
        step('NSMutableArray.count', () => assertEqual(array.count, 2, 'NSMutableArray count'));
        step('NSMutableArray.objectAtIndex', () =>
          assertEqual(array.objectAtIndex(1), 'beta', 'NSMutableArray objectAtIndex'),
        );
      },
    },
    {
      name: 'marshals JavaScript arrays, objects, strings, and typed arrays into Foundation values',
      run() {
        const nsArray = g('NSArray').arrayWithArray(['a', 'b']);
        assertEqual(nsArray.count, 2, 'NSArray arrayWithArray count');
        assertEqual(nsArray.objectAtIndex(0), 'a', 'NSArray first value');

        const nsDict = g('NSDictionary').dictionaryWithDictionary({
          answer: 42,
          label: 'native',
        });
        assertEqual(nsDict.objectForKey('answer'), 42, 'NSDictionary numeric value');
        assertEqual(nsDict.objectForKey('label'), 'native', 'NSDictionary string value');

        const bytes = new Uint8Array([65, 66, 67, 0]);
        const data = g('NSData').dataWithBytesLength(bytes, bytes.byteLength);
        const roundTrip = new Uint8Array(g('interop').bufferFromData(data));
        assertEqual(roundTrip[0], 65, 'NSData byte 0');
        assertEqual(roundTrip[1], 66, 'NSData byte 1');
        assertEqual(roundTrip[2], 67, 'NSData byte 2');
      },
    },
    {
      name: 'invokes C function pointer callbacks on the native caller thread',
      run() {
        let callbackRan = false;
        const result = g('functionWithSimpleFunctionPointerOnBackground')(
          (nativeCallerWasMainThread: number) => {
            assertEqual(nativeCallerWasMainThread, 0, 'callback native caller thread');
            assertEqual(g('NSThread').isMainThread, false, 'callback JS native calls thread');
            callbackRan = true;
            return g('NSThread').isMainThread ? 1 : 0;
          },
        );
        assertEqual(result, 0, 'background callback return');
        assert(callbackRan, 'background callback did not run');
      },
    },
    {
      name: 'invokes Objective-C block callbacks on the native caller thread',
      run() {
        let callbackRan = false;
        let callbackThreadHash: string | null = null;
        const nativeThreadHash = g('TNSObjCTypes')
          .alloc()
          .init()
          .methodWithSimpleBlockOnBackground((callerThreadHash: string) => {
            callbackRan = true;
            callbackThreadHash = String(g('NSThread').currentThread.hash);
            assertEqual(
              callbackThreadHash,
              String(callerThreadHash),
              'block callback JS native calls thread',
            );
          });

        assert(callbackRan, 'background block callback did not run');
        assertEqual(
          callbackThreadHash,
          String(nativeThreadHash),
          'background block callback return thread',
        );
      },
    },
    {
      name: 'invokes uiInvoker Objective-C block callbacks on the UI thread',
      run() {
        let callbackRan = false;
        let callbackThreadHash: string | null = null;
        const nativeThreadHash = g('TNSObjCTypes')
          .alloc()
          .init()
          .methodWithSimpleBlockOnBackground(
            NativeScript.uiInvoker((callerThreadHash: string) => {
              callbackRan = true;
              callbackThreadHash = String(g('NSThread').currentThread.hash);
              assert(g('NSThread').isMainThread, 'uiInvoker block did not run on main thread');
              assert(
                callbackThreadHash !== String(callerThreadHash),
                'uiInvoker block stayed on the native caller thread',
              );
            }),
          );

        assert(callbackRan, 'uiInvoker background block callback did not run');
        assert(
          callbackThreadHash !== String(nativeThreadHash),
          'uiInvoker background block return thread',
        );
      },
    },
    {
      name: 'invokes jsInvoker Objective-C block callbacks on the JS thread',
      async run() {
        const jsThreadHash = String(g('NSThread').currentThread.hash);
        let callbackRan = false;
        let callbackThreadHash: string | null = null;
        let nativeThreadHash: string | null = null;
        g('TNSObjCTypes')
          .alloc()
          .init()
          .methodWithSimpleBlockOnBackgroundAsync(
            NativeScript.jsInvoker((callerThreadHash: string) => {
              callbackRan = true;
              nativeThreadHash = String(callerThreadHash);
              callbackThreadHash = String(g('NSThread').currentThread.hash);
            }),
          );

        await waitFor(() => callbackRan, 'jsInvoker background block callback did not run');
        assertEqual(callbackThreadHash, jsThreadHash, 'jsInvoker block callback thread');
        assert(
          nativeThreadHash !== jsThreadHash,
          'jsInvoker block stayed on the native caller thread',
        );
      },
    },
    {
      name: 'runs UIKit native calls through runOnUI main-thread dispatch',
      async run() {
        let mainThread = false;
        await NativeScript.runOnUI(() => {
          mainThread = g('NSThread').isMainThread === true;
          const color = g('UIColor').colorWithRedGreenBlueAlpha(0.1, 0.2, 0.3, 1);
          assert(color, 'UIColor construction failed on UI thread');
        });
        assert(mainThread, 'runOnUI did not execute native calls on main thread');
      },
    },
    {
      name: 'mounts JS-defined UIKit views through the React Native host component',
      async run() {
        await waitFor(
          () =>
            (globalThis as any).__nativeScriptUIKitPlugin?.mounted === true &&
            (globalThis as any).__nativeScriptUIKitPlugin?.title ===
              'Initial UIKit title',
          'JS-defined UIKit view did not mount',
        );

        await waitForUIKitPluginAttachment();
        await NativeScript.runOnUI(() => {
          const view = (globalThis as any).__nativeScriptUIKitPlugin?.view;
          assert(view?.superview, 'JS-defined UIKit view has no host superview');
          assert(
            String(view.superview.description).includes('NativeScriptUIKitTestView'),
            'JS-defined UIKit host did not expose its debug name',
          );
          assert(view?.window, 'JS-defined UIKit view has no window');
          const label = view.viewWithTag(uikitPluginLabelTag);
          assertEqual(label.text, 'Initial UIKit title', 'initial UIKit label text');
        });

        const setTitle = (globalThis as any).__setNativeScriptUIKitTitle;
        const setTint = (globalThis as any).__setNativeScriptUIKitTint;
        assert(typeof setTitle === 'function', 'UIKit title setter was not installed');
        assert(typeof setTint === 'function', 'UIKit tint setter was not installed');
        setTitle('Updated UIKit title');
        setTint('green');

        await waitFor(
          () =>
            (globalThis as any).__nativeScriptUIKitPlugin?.title ===
              'Updated UIKit title' &&
            (globalThis as any).__nativeScriptUIKitPlugin?.tint === 'green',
          'JS-defined UIKit view did not receive prop updates',
        );

        await waitForUIKitPluginAttachment();
        await NativeScript.runOnUI(() => {
          const view = (globalThis as any).__nativeScriptUIKitPlugin?.view;
          assert(view?.superview, 'updated JS-defined UIKit view has no host superview');
          assert(view?.window, 'updated JS-defined UIKit view has no window');
          const label = view.viewWithTag(uikitPluginLabelTag);
          assertEqual(label.text, 'Updated UIKit title', 'updated UIKit label text');
        });
      },
    },
    {
      name: 'runs defineUIKitView lifecycle callbacks on the main thread',
      async run() {
        await waitFor(
          () =>
            rnPlanState().lifecycle.includes('mounted') &&
            rnPlanState().lifecycle.some((entry: string) => entry.startsWith('update:1')),
          'RN plan lifecycle probe did not mount',
        );
        const setValue = (globalThis as any).__setRNPlanLifecycleValue;
        assert(typeof setValue === 'function', 'RN plan lifecycle setter missing');
        setValue(2);
        await waitFor(
          () =>
            rnPlanState().lifecycle.some((entry: string) => entry.startsWith('update:2')),
          'RN plan lifecycle probe did not update',
        );
      },
    },
    {
      name: 'delivers ctx.targetAction events to React Native JavaScript',
      async run() {
        await waitFor(() => rnPlanState().switch?.window, 'switch probe was not mounted');
        await NativeScript.runOnUI(() => {
          const view = rnPlanState().switch;
          view.setOnAnimated(true, false);
          view.sendActionsForControlEvents(g('UIControlEvents').ValueChanged);
        });
        await waitFor(
          () => rnPlanState().switchEvents[0] === true,
          'switch target/action did not emit',
        );
      },
    },
    {
      name: 'delivers ctx.delegate callbacks and retains delegate lifetime',
      async run() {
        await waitFor(
          () => rnPlanState().delegateProbe,
          'delegate probe was not mounted',
        );
        await NativeScript.runOnUI(() => {
          rnPlanState().delegateProbe.fire();
        });
        await waitFor(
          () => rnPlanState().delegateEvents[0] === 'delegate-value',
          'delegate callback did not emit',
        );
      },
    },
    {
      name: 'delivers ctx.notification and ctx.observe events',
      async run() {
        await waitFor(
          () => rnPlanState().observedProbe,
          'KVO probe was not mounted',
        );
        await NativeScript.runOnUI(() => {
          g('NSNotificationCenter').defaultCenter.postNotificationNameObject(
            'TNSRNProbeNotification',
            null,
          );
          rnPlanState().observedProbe.value = 'changed';
        });
        await waitFor(
          () => rnPlanState().notificationEvents[0] === 'TNSRNProbeNotification',
          'notification helper did not emit',
        );
        await waitFor(
          () => rnPlanState().kvoEvents[0] === 'changed',
          'KVO helper did not emit',
        );
      },
    },
    {
      name: 'measures intrinsic, sizeThatFits, and Auto Layout UIKit views',
      async run() {
        const intrinsicRef = (globalThis as any).__rnPlanIntrinsicRef;
        const sizeThatFitsRef = (globalThis as any).__rnPlanSizeThatFitsRef;
        const autoLayoutRef = (globalThis as any).__rnPlanAutoLayoutRef;
        await waitFor(
          () =>
            intrinsicRef?.current?.nativeView &&
            sizeThatFitsRef?.current?.nativeView &&
            autoLayoutRef?.current?.nativeView,
          'measurement refs were not mounted',
        );
        const intrinsic = await intrinsicRef.current.measureNative();
        const sizeThatFits = await sizeThatFitsRef.current.measureNative();
        const autoLayout = await autoLayoutRef.current.measureNative();
        assert(intrinsic.width > 1 && intrinsic.height > 1, 'intrinsic measurement failed');
        assert(sizeThatFits.width > 1 && sizeThatFits.height > 1, 'sizeThatFits failed');
        assert(autoLayout.width > 0 && autoLayout.height > 0, 'autoLayout measurement failed');
      },
    },
    {
      name: 'mounts React Native children inside a UIKit container',
      async run() {
        await waitForAsync(
          async () => {
            let mounted = false;
            await NativeScript.runOnUI(() => {
              const container = rnPlanState().container;
              mounted = Boolean(
                container?.rootView?.superview &&
                  container?.childrenView?.superview === container.rootView &&
                  container?.childrenView?.subviews?.count > 0,
              );
            });
            return mounted;
          },
          'UIKit container children did not mount',
        );
      },
    },
    {
      name: 'hosts UIViewController instances with balanced containment',
      async run() {
        await waitForAsync(
          async () => {
            let attached = false;
            await NativeScript.runOnUI(() => {
              const controller = rnPlanState().controller;
              attached = Boolean(
                controller?.parentViewController &&
                  controller?.view?.superview,
              );
            });
            return attached;
          },
          'UIViewController was not attached to a parent',
        );
      },
    },
    {
      name: 'cleans context resources in reverse order on unmount',
      async run() {
        const state = rnPlanState();
        const counts = {
          switchEvents: state.switchEvents.length,
          delegateEvents: state.delegateEvents.length,
          notificationEvents: state.notificationEvents.length,
          kvoEvents: state.kvoEvents.length,
        };
        const setShow = (globalThis as any).__setRNPlanVisible;
        assert(typeof setShow === 'function', 'RN plan visibility setter missing');
        setShow(false);
        await waitFor(
          () => state.disposeCalls.join(',') === 'view,second,first',
          `dispose order mismatch: ${state.disposeCalls.join(',')}`,
        );
        await NativeScript.runOnUI(() => {
          state.switch?.sendActionsForControlEvents(g('UIControlEvents').ValueChanged);
          state.delegateProbe?.fire();
          g('NSNotificationCenter').defaultCenter.postNotificationNameObject(
            'TNSRNProbeNotification',
            null,
          );
          if (state.observedProbe) {
            state.observedProbe.value = 'after-unmount';
          }
        });
        await new Promise((resolve) => setTimeout(resolve, 200));
        assertEqual(state.switchEvents.length, counts.switchEvents, 'targetAction after unmount');
        assertEqual(state.delegateEvents.length, counts.delegateEvents, 'delegate after unmount');
        assertEqual(
          state.notificationEvents.length,
          counts.notificationEvents,
          'notification after unmount',
        );
        assertEqual(state.kvoEvents.length, counts.kvoEvents, 'KVO after unmount');
      },
    },
  ];
}

function summarize(results: TestResult[]) {
  return {
    passed: results.filter((result) => result.status === 'pass').length,
    failed: results.filter((result) => result.status === 'fail').length,
    skipped: results.filter((result) => result.status === 'skip').length,
    total: results.length,
  };
}

async function runCompatibilitySuite() {
  writeMarker({
    marker,
    status: 'running',
    current: 'before NativeScript.init',
    passed: 0,
    total: 0,
    results: [],
  });
  try {
    NativeScript.init();
  } catch (error) {
    const message =
      error instanceof Error
        ? `${error.name}: ${error.message}; step=${currentStep}; global=${lastGlobalAccess}; stack=${error.stack ?? ''}`
        : `${String(error)}; step=${currentStep}; global=${lastGlobalAccess}`;
    writeMarker({
      marker,
      status: 'fail',
      current: 'NativeScript.init',
      passed: 0,
      total: 0,
      results: [],
      failures: [{name: 'NativeScript.init', status: 'fail', error: message}],
    });
    throw error;
  }

  const registry = installRuntimeSpecGlobals();
  loadRuntimeFfiSpecs();
  const rnTests = buildReactNativeIntegrationTests();
  const total = registry.specs.length + registry.skipped.length + rnTests.length;

  writeMarker({
    marker,
    status: 'running',
    current: 'initialized',
    passed: 0,
    total,
    runtimeSpecs: {
      registered: registry.specs.length,
      skipped: registry.skipped.length,
    },
    backend: NativeScript.getRuntimeBackend(),
  });

  const runtimeResults = await runRuntimeSpecs(registry, (current, results) => {
    const runtimeSummary = summarize(results);
    writeMarker({
      marker,
      status: 'running',
      current,
      passed: runtimeSummary.passed,
      total,
      runtime: runtimeSummary,
      failures: results.filter((result) => result.status === 'fail').slice(0, 50),
      backend: NativeScript.getRuntimeBackend(),
    });
  });

  const rnResults: TestResult[] = [];
  if (!runtimeResults.some((result) => result.status === 'fail')) {
    for (const test of rnTests) {
      try {
        writeMarker({
          marker,
          status: 'running',
          current: test.name,
          passed: summarize(runtimeResults).passed + summarize(rnResults).passed,
          total,
          runtime: summarize(runtimeResults),
          reactNative: summarize(rnResults),
          backend: NativeScript.getRuntimeBackend(),
        });
        await test.run();
        rnResults.push({name: test.name, status: 'pass'});
      } catch (error) {
        rnResults.push({
          name: test.name,
          status: 'fail',
          error:
            error instanceof Error
              ? `${error.name}: ${error.message}; step=${currentStep}; global=${lastGlobalAccess}`
              : `${String(error)}; step=${currentStep}; global=${lastGlobalAccess}`,
        });
        break;
      }
    }
  }

  const results = [...runtimeResults, ...rnResults];
  const failed = results.find((result) => result.status === 'fail');
  const payload = {
    marker,
    status: failed ? 'fail' : 'pass',
    ...summarize(results),
    total,
    runtime: summarize(runtimeResults),
    reactNative: summarize(rnResults),
    failures: results.filter((result) => result.status === 'fail').slice(0, 50),
    backend: NativeScript.getRuntimeBackend(),
  };
  writeMarker(payload);
  if (failed) {
    throw new Error(failed.error);
  }
  return payload;
}

export default function App(): React.JSX.Element {
  const [text, setText] = useState('Running NativeScript RN FFI compatibility tests...');
  const [uikitTitle, setUIKitTitle] = useState('Initial UIKit title');
  const [uikitTint, setUIKitTint] = useState<'blue' | 'green'>('blue');
  const [rnPlanVisible, setRNPlanVisible] = useState(true);
  const [rnPlanLifecycleValue, setRNPlanLifecycleValue] = useState(1);
  const intrinsicRef = useRef<any>(null);
  const sizeThatFitsRef = useRef<any>(null);
  const autoLayoutRef = useRef<any>(null);

  useEffect(() => {
    (globalThis as any).__setNativeScriptUIKitTitle = setUIKitTitle;
    (globalThis as any).__setNativeScriptUIKitTint = setUIKitTint;
    (globalThis as any).__setRNPlanVisible = setRNPlanVisible;
    (globalThis as any).__setRNPlanLifecycleValue = setRNPlanLifecycleValue;
    (globalThis as any).__rnPlanIntrinsicRef = intrinsicRef;
    (globalThis as any).__rnPlanSizeThatFitsRef = sizeThatFitsRef;
    (globalThis as any).__rnPlanAutoLayoutRef = autoLayoutRef;
    runCompatibilitySuite()
      .then((payload) => setText(JSON.stringify(payload, null, 2)))
      .catch((error) => {
        setText(error instanceof Error ? error.message : String(error));
      });
  }, []);

  return (
    <SafeAreaView style={{flex: 1, padding: 16}}>
      <ScrollView>
        <Text selectable>{text}</Text>
        <NativeScriptUIKitTestView
          title={uikitTitle}
          tint={uikitTint}
          style={{height: 48, marginTop: 12}}
        />
        {rnPlanVisible ? (
          <>
            <RNPlanLifecycleProbe
              value={rnPlanLifecycleValue}
              style={{height: 12}}
            />
            <RNPlanDisposeProbe style={{height: 12}} />
            <RNPlanSwitchProbe
              value={false}
              onValueChange={(value) => rnPlanState().switchEvents.push(value)}
              style={{height: 40}}
            />
            <RNPlanDelegateProbe
              onFire={(value) => rnPlanState().delegateEvents.push(value)}
              style={{height: 12}}
            />
            <RNPlanNotificationProbe
              onNotification={(value) => rnPlanState().notificationEvents.push(value)}
              style={{height: 12}}
            />
            <RNPlanKVOProbe
              onTextObserved={(value) => rnPlanState().kvoEvents.push(value)}
              style={{height: 12}}
            />
            <RNPlanIntrinsicLabel
              ref={intrinsicRef}
              text="Intrinsic NativeScript label"
              style={{marginTop: 12}}
            />
            <RNPlanSizeThatFitsLabel
              ref={sizeThatFitsRef}
              text="Size that fits NativeScript label"
              style={{marginTop: 12}}
            />
            <RNPlanAutoLayoutLabel
              ref={autoLayoutRef}
              text="Auto Layout NativeScript label"
              style={{marginTop: 12}}
            />
            <RNPlanContainer style={{height: 48, marginTop: 12}}>
              <Text>RN child inside UIKit container</Text>
            </RNPlanContainer>
            <RNPlanViewControllerHost style={{height: 24, marginTop: 12}} />
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

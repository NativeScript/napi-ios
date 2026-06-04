import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import type {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
import type {ViewProps} from 'react-native';
import {StyleSheet} from 'react-native';
import NativeScriptNativeApi from './NativeScriptNativeApi';
import NativeScriptUIViewNativeComponent from './NativeScriptUIViewNativeComponent';

declare const require: (id: string) => any;

type NativeApiHost = {
  metadata?: {
    classNames?: () => string[];
    functionNames?: () => string[];
    constantNames?: () => string[];
    protocolNames?: () => string[];
    enumNames?: () => string[];
    structNames?: () => string[];
    unionNames?: () => string[];
  };
  import?: (path: string) => boolean;
  getClass?: (name: string) => unknown;
  getProtocol?: (name: string) => unknown;
  getEnum?: (name: string) => unknown;
  getStruct?: (name: string) => unknown;
  getUnion?: (name: string) => unknown;
  [name: string]: unknown;
};

export type InstallOptions = {
  globals?: boolean;
};

export type NativeScriptWorklets = {
  getUIRuntimeHolder: () => object;
  isWorkletFunction: (value: unknown) => boolean;
  runOnUIAsync: <Args extends unknown[], ReturnValue>(
    callback: (...args: Args) => ReturnValue | Promise<ReturnValue>,
    ...args: Args
  ) => Promise<ReturnValue>;
};

export type UIKitSizingMode = 'fill' | 'intrinsic' | 'sizeThatFits' | 'autoLayout';

export type UIKitLayoutOptions = {
  sizing?: UIKitSizingMode;
  defaultSize?: {width?: number; height?: number};
  minSize?: {width?: number; height?: number};
  maxSize?: {width?: number; height?: number};
};

export type UIKitViewContext<Props extends object> = {
  readonly name: string;
  readonly tag: number | null;
  readonly props: Readonly<Props>;
  emit<K extends keyof Props>(
    eventName: K,
    payload?: Props[K] extends ((arg: infer Payload) => unknown) | undefined
      ? Payload
      : unknown,
  ): void;
  targetAction(
    control: unknown,
    events: unknown,
    callback: () => void,
  ): void;
  delegate<T extends object>(
    object: unknown,
    protocolRef: unknown,
    implementation: Partial<T>,
  ): T;
  notification(
    name: string,
    object: unknown | null,
    callback: (notification: unknown) => void,
  ): void;
  observe(
    object: unknown,
    keyPath: string,
    callback: (value: unknown, change: unknown) => void,
  ): void;
  retain<T>(value: T): T;
  release(value?: unknown): void;
  dispose(callback: () => void): void;
  invalidateLayout(): void;
};

type UIKitCreateArgument<Props extends object> =
  UIKitViewContext<Props> & Readonly<Props>;

export type UIKitViewDefinition<Props extends object, NativeView = unknown> = {
  name?: string;
  debugName?: string;
  displayName?: string;
  layout?: UIKitLayoutOptions;
  create: (ctx: UIKitCreateArgument<Props & ViewProps>) => NativeView;
  update?: (
    view: NativeView,
    props: Readonly<Props & ViewProps>,
    previousProps?: Readonly<Props & ViewProps>,
    ctx?: UIKitViewContext<Props & ViewProps>,
  ) => void;
  mounted?: (
    view: NativeView,
    props: Readonly<Props & ViewProps>,
    ctx?: UIKitViewContext<Props & ViewProps>,
  ) => void;
  dispose?: (
    view: NativeView,
    props: Readonly<Props & ViewProps>,
    ctx?: UIKitViewContext<Props & ViewProps>,
  ) => void;
  nativeProps?: (
    props: Readonly<Props & ViewProps>,
  ) => Partial<ViewProps> | undefined;
};

export type UIKitViewRef<NativeView = unknown> = {
  readonly nativeView: NativeView | null;
  runOnUI: <T>(callback: (view: NativeView) => T) => Promise<T>;
  measureNative: () => Promise<{width: number; height: number}>;
  invalidateNativeLayout: () => void;
};

export type UIKitViewComponent<Props extends object, NativeView = unknown> =
  ForwardRefExoticComponent<
    PropsWithoutRef<Props & ViewProps> & RefAttributes<UIKitViewRef<NativeView>>
  >;

export type UIKitContainerResult<
  RootView = unknown,
  ChildrenView = unknown,
> = {
  rootView: RootView;
  childrenView: ChildrenView;
};

export type UIKitContainerDefinition<
  Props extends object,
  RootView = unknown,
  ChildrenView = unknown,
> = Omit<
  UIKitViewDefinition<Props, UIKitContainerResult<RootView, ChildrenView>>,
  'create' | 'update' | 'mounted' | 'dispose'
> & {
  create: (
    ctx: UIKitCreateArgument<Props & ViewProps>,
  ) => UIKitContainerResult<RootView, ChildrenView>;
  update?: (
    view: UIKitContainerResult<RootView, ChildrenView>,
    props: Readonly<Props & ViewProps>,
    previousProps?: Readonly<Props & ViewProps>,
    ctx?: UIKitViewContext<Props & ViewProps>,
  ) => void;
  mounted?: (
    view: UIKitContainerResult<RootView, ChildrenView>,
    props: Readonly<Props & ViewProps>,
    ctx?: UIKitViewContext<Props & ViewProps>,
  ) => void;
  dispose?: (
    view: UIKitContainerResult<RootView, ChildrenView>,
    props: Readonly<Props & ViewProps>,
    ctx?: UIKitViewContext<Props & ViewProps>,
  ) => void;
};

export type UIViewControllerDefinition<
  Props extends object,
  Controller = unknown,
> = Omit<
  UIKitViewDefinition<Props, Controller>,
  'create'
> & {
  createController: (ctx: UIKitCreateArgument<Props & ViewProps>) => Controller;
};

const nativeApiGlobalName = '__nativeScriptNativeApi';
const nativeApiGlobalCacheName = '__nativeScriptNativeApiGlobalCache';
const nativeApiTypeCodeKey = '__nativeApiTypeCode';
const nativeApiCallbackThreadKey = '__nativeScriptCallbackThread';
const nativeApiWrappedCallbackKey = '__nativeScriptWrappedCallback';
const nativeClassWrappers = new WeakMap<object, unknown>();

export type NativeScriptCallbackThread = 'js';
type AnyFunction = (...args: any[]) => any;
export type NativeScriptInvokedCallback<T extends AnyFunction> = T & {
  readonly __nativeScriptCallbackThread?: NativeScriptCallbackThread;
};

export type NativeRetainer = {
  readonly size: number;
  retain<T>(value: T): T;
  release(value?: unknown): void;
  dispose(): void;
};

export type NativeDelegateOwner = {
  retain<T>(value: T): T | void;
  release?(value?: unknown): void;
  dispose?(callback: () => void): void;
};

export type CreateDelegateOptions = {
  name?: string;
  thread?: NativeScriptCallbackThread | 'caller';
  retainer?: NativeRetainer;
  owner?: NativeDelegateOwner;
  assignTo?: {
    object: unknown;
    property?: string;
  };
};

export type NativeProtocolReference = string | object | Function;

function nativeApiHost(): NativeApiHost | undefined {
  return (globalThis as Record<string, unknown>)[nativeApiGlobalName] as
    | NativeApiHost
    | undefined;
}

function requireNativeApiHost(): NativeApiHost {
  const api = nativeApiHost();
  if (!api) {
    throw new Error('NativeScript Native API JSI host object was not installed');
  }
  return api;
}

function nativeApiGlobalCache(): Record<string, unknown> {
  const globalObject = globalThis as Record<string, unknown>;
  const existing = globalObject[nativeApiGlobalCacheName];
  if (existing && typeof existing === 'object') {
    return existing as Record<string, unknown>;
  }

  const cache: Record<string, unknown> = Object.create(null);
  Object.defineProperty(globalThis, nativeApiGlobalCacheName, {
    configurable: false,
    enumerable: false,
    writable: false,
    value: cache,
  });
  return cache;
}

function cacheNativeGlobal(name: string, value: unknown): void {
  if (!name || value === undefined) {
    return;
  }
  nativeApiGlobalCache()[name] = value;
}

function createNativeRetainer(): NativeRetainer {
  const retained: unknown[] = [];
  return {
    get size() {
      return retained.length;
    },
    retain<T>(value: T): T {
      retained.push(value);
      return value;
    },
    release(value?: unknown) {
      if (arguments.length === 0) {
        retained.length = 0;
        return;
      }
      for (let i = retained.length - 1; i >= 0; i--) {
        if (retained[i] === value) {
          retained.splice(i, 1);
        }
      }
    },
    dispose() {
      retained.length = 0;
    },
  };
}

const defaultNativeRetainer = createNativeRetainer();

export function createRetainer(): NativeRetainer {
  return createNativeRetainer();
}

export function retain<T>(value: T): T {
  return defaultNativeRetainer.retain(value);
}

export function release(value?: unknown): void {
  if (arguments.length === 0) {
    defaultNativeRetainer.dispose();
    return;
  }
  defaultNativeRetainer.release(value);
}

const hostViewPropNames = new Set([
  'accessible',
  'accessibilityActions',
  'accessibilityElementsHidden',
  'accessibilityHint',
  'accessibilityIgnoresInvertColors',
  'accessibilityLabel',
  'accessibilityLanguage',
  'accessibilityLiveRegion',
  'accessibilityRole',
  'accessibilityState',
  'accessibilityValue',
  'accessibilityViewIsModal',
  'children',
  'collapsable',
  'focusable',
  'hitSlop',
  'id',
  'importantForAccessibility',
  'nativeID',
  'needsOffscreenAlphaCompositing',
  'onAccessibilityAction',
  'onAccessibilityEscape',
  'onAccessibilityTap',
  'onLayout',
  'onMagicTap',
  'onMoveShouldSetResponder',
  'onMoveShouldSetResponderCapture',
  'onResponderEnd',
  'onResponderGrant',
  'onResponderMove',
  'onResponderReject',
  'onResponderRelease',
  'onResponderStart',
  'onResponderTerminate',
  'onResponderTerminationRequest',
  'onStartShouldSetResponder',
  'onStartShouldSetResponderCapture',
  'pointerEvents',
  'removeClippedSubviews',
  'renderToHardwareTextureAndroid',
  'shouldRasterizeIOS',
  'style',
  'testID',
]);

function splitUIKitViewProps<Props extends object>(
  props: Props & ViewProps,
  definition: UIKitViewDefinition<Props>,
): {
  nativeProps: ViewProps;
  pluginProps: Props & ViewProps;
} {
  const nativeProps: Record<string, unknown> = {};
  const pluginProps: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(props)) {
    if (
      hostViewPropNames.has(key) ||
      key.startsWith('accessibility') ||
      key.startsWith('aria-')
    ) {
      nativeProps[key] = value;
    } else {
      pluginProps[key] = value;
    }
  }

  Object.assign(nativeProps, definition.nativeProps?.(props));

  return {
    nativeProps: nativeProps as ViewProps,
    pluginProps: pluginProps as Props & ViewProps,
  };
}

function nativeHandleForUIKitView(view: unknown): string {
  const interop = (globalThis as Record<string, any>).interop;
  if (!interop || typeof interop.handleof !== 'function') {
    throw new Error('NativeScript interop globals are not installed');
  }

  const pointer = interop.handleof(view);
  if (!pointer) {
    throw new Error('UIKit view definition returned a value without a native handle');
  }

  if (typeof pointer.toHexString === 'function') {
    const text = pointer.toHexString();
    if (typeof text === 'string' && text.length > 0) {
      return text;
    }
  }

  if (typeof pointer.address === 'string' && pointer.address.length > 0) {
    return pointer.address;
  }

  if (typeof pointer.address === 'number') {
    return String(pointer.address);
  }

  if (typeof pointer.toNumber === 'function') {
    return String(pointer.toNumber());
  }

  throw new Error('UIKit view native handle could not be read');
}

function ensureNativeScriptInstalled(): void {
  if (!isInstalled()) {
    init();
  }
}

function defineLazyNativeGlobal(
  name: string,
  resolve: (name: string) => unknown,
  force = false,
) {
  if (!name) {
    return;
  }

  if (!force && Object.prototype.hasOwnProperty.call(globalThis, name)) {
    const descriptor = Object.getOwnPropertyDescriptor(globalThis, name);
    if (descriptor && 'value' in descriptor) {
      cacheNativeGlobal(name, descriptor.value);
    }
    return;
  }

  try {
    Object.defineProperty(globalThis, name, {
      configurable: true,
      enumerable: false,
      get() {
        const value = resolve(name);
        cacheNativeGlobal(name, value);
        Object.defineProperty(globalThis, name, {
          configurable: true,
          enumerable: false,
          writable: false,
          value,
        });
        return value;
      },
    });
  } catch {
    const value = resolve(name);
    if (value !== undefined) {
      cacheNativeGlobal(name, value);
      Object.defineProperty(globalThis, name, {
        configurable: true,
        enumerable: false,
        writable: false,
        value,
      });
    }
  }
}

function wrapAggregateConstructor(nativeConstructor: unknown): unknown {
  if (typeof nativeConstructor !== 'function') {
    return nativeConstructor;
  }

  const aggregate = function NativeScriptAggregate(initialValue?: unknown) {
    return nativeConstructor(initialValue);
  };

  try {
    const hasInstance = Symbol.hasInstance;
    Object.defineProperty(aggregate, hasInstance, {
      configurable: true,
      enumerable: false,
      value(value: unknown) {
        if (!value || typeof value !== 'object') {
          return false;
        }
        const actual = value as Record<string, unknown>;
        return (
          actual.kind === (nativeConstructor as Record<string, unknown>).kind &&
          actual.name === (nativeConstructor as Record<string, unknown>).runtimeName
        );
      },
    });
  } catch {
    // Older runtimes can expose Symbol.hasInstance as read-only.
  }

  for (const key of [
    'kind',
    'runtimeName',
    'metadataOffset',
    'sizeof',
    'fields',
    'equals',
  ]) {
    try {
      Object.defineProperty(aggregate, key, {
        configurable: true,
        enumerable: false,
        writable: false,
        value: (nativeConstructor as Record<string, unknown>)[key],
      });
    } catch {
      // Best effort metadata copy for runtimes with stricter function objects.
    }
  }

  return aggregate;
}

function wrapNativeClass(nativeClass: unknown): unknown {
  if (
    !nativeClass ||
    (typeof nativeClass !== 'object' && typeof nativeClass !== 'function')
  ) {
    return nativeClass;
  }

  const cached = nativeClassWrappers.get(nativeClass as object);
  if (cached) {
    return cached;
  }

  const constructable = function NativeScriptNativeClass(...args: unknown[]) {
    const cls = nativeClass as Record<string, any>;
    if (args.length > 0 && typeof cls.construct === 'function') {
      return cls.construct(...args);
    }
    if (typeof cls.alloc !== 'function') {
      throw new Error('Native class cannot be allocated');
    }
    const instance = cls.alloc();
    if (instance && typeof instance.init === 'function') {
      return instance.init();
    }
    return instance;
  };

  Object.defineProperty(constructable, 'new', {
    configurable: true,
    enumerable: false,
    writable: false,
    value(...args: unknown[]) {
      if (args.length !== 0) {
        throw new Error('new does not take arguments; use invoke for an explicit Objective-C selector.');
      }
      return constructable();
    },
  });

  Object.defineProperty(constructable, '__nativeApiClass', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: nativeClass,
  });
  const cachedNativeFunctions = new Map<PropertyKey, unknown>();

  try {
    const hasInstance = Symbol.hasInstance;
    Object.defineProperty(constructable, hasInstance, {
      configurable: true,
      enumerable: false,
      value(value: unknown) {
        if (!value || typeof value !== 'object') {
          return false;
        }

        const cls = nativeClass as Record<string, any>;
        try {
          if (typeof (value as Record<string, any>).isKindOfClass === 'function') {
            return Boolean((value as Record<string, any>).isKindOfClass(constructable));
          }
        } catch {
          // Fall through to class-name equality for host objects that cannot
          // dispatch isKindOfClass from this thread.
        }

        const expectedName = cls.runtimeName ?? cls.name;
        const actualName = (value as Record<string, unknown>).className;
        return typeof expectedName === 'string' && actualName === expectedName;
      },
    });
  } catch {
    // Older runtimes can expose Symbol.hasInstance as read-only.
  }

  const wrapper = new Proxy(constructable, {
    get(target, property, receiver) {
      if (property in target) {
        return Reflect.get(target, property, receiver);
      }
      if (cachedNativeFunctions.has(property)) {
        return cachedNativeFunctions.get(property);
      }
      const nativeValue = (nativeClass as Record<PropertyKey, unknown>)[property];
      if (typeof nativeValue === 'function') {
        cachedNativeFunctions.set(property, nativeValue);
        try {
          Object.defineProperty(target, property, {
            configurable: true,
            enumerable: false,
            writable: false,
            value: nativeValue,
          });
        } catch {
          // Host runtimes may reject defining function properties; the map is enough.
        }
      }
      return nativeValue;
    },
    set(_target, property, value) {
      (nativeClass as Record<PropertyKey, unknown>)[property] = value;
      return true;
    },
    has(target, property) {
      return property in target || property in (nativeClass as object);
    },
  });

  nativeClassWrappers.set(nativeClass as object, wrapper);
  return wrapper;
}

function wrapInteropFactory(
  nativeFactory: unknown,
  properties: Record<string, unknown>,
): unknown {
  if (typeof nativeFactory !== 'function') {
    return nativeFactory;
  }

  if ((nativeFactory as Record<string, unknown>).__nativeScriptConstructable) {
    return nativeFactory;
  }

  const constructable = function NativeScriptInteropValue(...args: unknown[]) {
    return (nativeFactory as (...args: unknown[]) => unknown)(...args);
  };

  try {
    const nativePrototype = (nativeFactory as {prototype?: unknown}).prototype;
    if (
      nativePrototype &&
      (typeof nativePrototype === 'object' || typeof nativePrototype === 'function')
    ) {
      constructable.prototype = nativePrototype;
    }
  } catch {
    // Keep construction working even if the host function exposes a fixed prototype.
  }

  try {
    const hasInstance = Symbol.hasInstance;
    Object.defineProperty(constructable, hasInstance, {
      configurable: true,
      enumerable: false,
      value(value: unknown) {
        return (
          Boolean(value) &&
          typeof value === 'object' &&
          (value as Record<string, unknown>).kind === properties.kind
        );
      },
    });
  } catch {
    // Older runtimes can expose Symbol.hasInstance as read-only.
  }

  for (const [key, value] of Object.entries(properties)) {
    try {
      Object.defineProperty(constructable, key, {
        configurable: true,
        enumerable: false,
        writable: false,
        value,
      });
    } catch {
      // Best effort metadata copy for runtimes with stricter function objects.
    }
  }

  Object.defineProperty(constructable, '__nativeScriptConstructable', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: true,
  });

  return constructable;
}

function installInteropConstructors(): void {
  const interop = (globalThis as Record<string, unknown>).interop as
    | Record<string, unknown>
    | undefined;
  if (!interop || typeof interop !== 'object') {
    return;
  }

  const sizeof = interop.sizeof;
  const pointerType = (interop.types as Record<string, unknown> | undefined)
    ?.pointer;
  let pointerSize: unknown = undefined;
  if (typeof sizeof === 'function' && pointerType !== undefined) {
    try {
      pointerSize = sizeof(pointerType);
    } catch {
      pointerSize = undefined;
    }
  }

  interop.Pointer = wrapInteropFactory(interop.Pointer, {
    kind: 'pointer',
    sizeof: pointerSize,
  });
  interop.Reference = wrapInteropFactory(interop.Reference, {
    kind: 'reference',
    sizeof: pointerSize,
  });
  interop.FunctionReference = wrapInteropFactory(interop.FunctionReference, {
    kind: 'functionReference',
    sizeof: pointerSize,
  });

  const types = interop.types as Record<string, unknown> | undefined;
  if (types && typeof types === 'object') {
    for (const [name, value] of Object.entries(types)) {
      if (typeof value !== 'number') {
        continue;
      }
      const boxed = {
        valueOf: () => value,
        toString: () => String(value),
      } as Record<string, unknown>;
      Object.defineProperty(boxed, nativeApiTypeCodeKey, {
        configurable: false,
        enumerable: false,
        writable: false,
        value,
      });
      types[name] = boxed;
    }
  }
}

function defineInlineFunction(name: string, value: Function): void {
  if (Object.prototype.hasOwnProperty.call(globalThis, name)) {
    return;
  }
  Object.defineProperty(globalThis, name, {
    configurable: true,
    enumerable: false,
    writable: true,
    value,
  });
}

function installInlineFunctions(): void {
  const makePoint = (x: number, y: number) => ({x, y});
  const makeSize = (width: number, height: number) => ({width, height});
  const makeRect = (x: number, y: number, width: number, height: number) => ({
    origin: {x, y},
    size: {width, height},
  });

  defineInlineFunction('CGPointMake', makePoint);
  defineInlineFunction('NSMakePoint', makePoint);
  defineInlineFunction('CGSizeMake', makeSize);
  defineInlineFunction('NSMakeSize', makeSize);
  defineInlineFunction('CGRectMake', makeRect);
  defineInlineFunction('NSMakeRect', makeRect);
  defineInlineFunction('NSMakeRange', (location: number, length: number) => ({
    location,
    length,
  }));
  defineInlineFunction(
    'UIEdgeInsetsMake',
    (top: number, left: number, bottom: number, right: number) => ({
      top,
      left,
      bottom,
      right,
    }),
  );
}

export function installGlobals(): boolean {
  const api = nativeApiHost();
  if (!api) {
    return false;
  }

  const classNames = api.metadata?.classNames?.() ?? [];
  for (const name of classNames) {
    defineLazyNativeGlobal(name, (className) => wrapNativeClass(api[className]));
  }

  const functionNames = api.metadata?.functionNames?.() ?? [];
  for (const name of functionNames) {
    defineLazyNativeGlobal(name, (functionName) => api[functionName]);
  }

  const constantNames = api.metadata?.constantNames?.() ?? [];
  for (const name of constantNames) {
    defineLazyNativeGlobal(name, (constantName) => api[constantName]);
  }

  const protocolNames = api.metadata?.protocolNames?.() ?? [];
  for (const name of protocolNames) {
    defineLazyNativeGlobal(
      name,
      (protocolName) => api.getProtocol?.(protocolName) ?? api[protocolName],
    );
  }

  const enumNames = api.metadata?.enumNames?.() ?? [];
  for (const name of enumNames) {
    const resolveEnum = (enumName: string) => api.getEnum?.(enumName) ?? api[enumName];
    defineLazyNativeGlobal(name, resolveEnum);

    const enumValue = resolveEnum(name);
    if (!enumValue || typeof enumValue !== 'object') {
      continue;
    }
    for (const memberName of Object.keys(enumValue)) {
      if (/^-?\d+$/.test(memberName)) {
        continue;
      }
      defineLazyNativeGlobal(
        memberName,
        () => (enumValue as Record<string, unknown>)[memberName],
      );
    }
  }

  const structNames = api.metadata?.structNames?.() ?? [];
  for (const name of structNames) {
    defineLazyNativeGlobal(
      name,
      (structName) =>
        wrapAggregateConstructor(api.getStruct?.(structName) ?? api[structName]),
      true,
    );
  }

  const unionNames = api.metadata?.unionNames?.() ?? [];
  for (const name of unionNames) {
    defineLazyNativeGlobal(
      name,
      (unionName) =>
        wrapAggregateConstructor(api.getUnion?.(unionName) ?? api[unionName]),
      true,
    );
  }

  return true;
}

export function init(
  metadataPath = '',
  options: InstallOptions = {},
): boolean {
  const installed = NativeScriptNativeApi.isInstalled()
    || NativeScriptNativeApi.install(metadataPath);
  if (installed) {
    installInteropConstructors();
    installInlineFunctions();
  }
  if (installed && options.globals !== false) {
    installGlobals();
  }
  if (installed) {
    ensureWorkletsInstalled(metadataPath);
  }
  return installed;
}

export const install = init;

export function isInstalled(): boolean {
  return NativeScriptNativeApi.isInstalled();
}

export function defaultMetadataPath(): string {
  return NativeScriptNativeApi.defaultMetadataPath();
}

export function getRuntimeBackend(): string {
  return NativeScriptNativeApi.getRuntimeBackend();
}

let workletsAdapter: NativeScriptWorklets | undefined;
const workletsPackageName = 'react-native-worklets';

function workletsSetupError(reason: string): Error {
  return new Error(
    `${reason}. Install ${workletsPackageName}, add ${workletsPackageName}/plugin to your Babel plugins, and run pod install so RNWorklets is linked.`,
  );
}

function requireReactNativeWorklets(): NativeScriptWorklets {
  try {
    return require(workletsPackageName) as NativeScriptWorklets;
  } catch (error) {
    throw workletsSetupError(`NativeScript.runOnUI requires ${workletsPackageName}`);
  }
}

function validateWorkletsModule(
  worklets: NativeScriptWorklets,
): NativeScriptWorklets {
  if (
    worklets == null ||
    typeof worklets.getUIRuntimeHolder !== 'function' ||
    typeof worklets.isWorkletFunction !== 'function' ||
    typeof worklets.runOnUIAsync !== 'function'
  ) {
    throw workletsSetupError(
      'NativeScript.runOnUI received an incompatible Worklets module',
    );
  }
  return worklets;
}

function ensureWorkletsInstalled(metadataPath = ''): NativeScriptWorklets {
  if (workletsAdapter) {
    return workletsAdapter;
  }
  installWorklets(requireReactNativeWorklets(), metadataPath);
  return workletsAdapter as NativeScriptWorklets;
}

export function installWorklets(
  worklets: NativeScriptWorklets = requireReactNativeWorklets(),
  metadataPath = '',
): boolean {
  if (!NativeScriptNativeApi.isInstalled()) {
    const installed = NativeScriptNativeApi.install(metadataPath);
    if (!installed) {
      throw new Error('NativeScript Native API JSI host object was not installed');
    }
    installInteropConstructors();
    installInlineFunctions();
    installGlobals();
  }

  const validWorklets = validateWorkletsModule(worklets);
  const holder = validWorklets.getUIRuntimeHolder();
  if (holder == null || typeof holder !== 'object') {
    throw workletsSetupError('NativeScript.runOnUI could not resolve a Worklets UI runtime');
  }
  const installRuntime = NativeScriptNativeApi.installWorkletRuntime;
  if (typeof installRuntime !== 'function') {
    throw workletsSetupError(
      'NativeScript Native API was built without RNWorklets runtime support',
    );
  }
  const installed = installRuntime(holder, metadataPath);
  if (!installed) {
    throw workletsSetupError('NativeScript Native API could not install into the Worklets UI runtime');
  }
  workletsAdapter = validWorklets;
  return true;
}

export function runOnUI<Args extends unknown[], ReturnValue>(
  callback: (...args: Args) => ReturnValue | Promise<ReturnValue>,
  ...args: Args
): Promise<ReturnValue> {
  if (typeof callback !== 'function') {
    throw new TypeError('NativeScript.runOnUI expects a Worklets callback');
  }

  ensureNativeScriptInstalled();
  const worklets = ensureWorkletsInstalled();
  if (worklets.isWorkletFunction(callback) !== true) {
    throw workletsSetupError(
      'NativeScript.runOnUI requires a worklet callback',
    );
  }
  return worklets.runOnUIAsync(callback, ...args);
}

function callbackInvoker<T extends AnyFunction>(
  thread: NativeScriptCallbackThread,
  callback: T,
): NativeScriptInvokedCallback<T> {
  if (typeof callback !== 'function') {
    throw new TypeError('NativeScript callback invoker expects a function');
  }

  const existingPolicy = (callback as Record<string, unknown>)[
    nativeApiCallbackThreadKey
  ];
  if (existingPolicy === thread) {
    return callback as NativeScriptInvokedCallback<T>;
  }

  const wrapped = function nativeScriptInvokedCallback(
    this: unknown,
    ...args: unknown[]
  ) {
    return callback.apply(this, args);
  } as NativeScriptInvokedCallback<T>;

  Object.defineProperties(wrapped, {
    [nativeApiCallbackThreadKey]: {
      configurable: false,
      enumerable: false,
      writable: false,
      value: thread,
    },
    [nativeApiWrappedCallbackKey]: {
      configurable: false,
      enumerable: false,
      writable: false,
      value: callback,
    },
  });
  return wrapped;
}

export function uiInvoker<T extends AnyFunction>(
  _callback: T,
): never {
  throw new Error(
    'NativeScript.uiInvoker is not supported in React Native. Use a Worklets "worklet" callback with NativeScript.runOnUI().',
  );
}

export function jsInvoker<T extends AnyFunction>(
  callback: T,
): NativeScriptInvokedCallback<T> {
  return callbackInvoker('js', callback);
}

export function eventBridge<T extends AnyFunction>(
  callback: T,
  thread: NativeScriptCallbackThread | 'caller' = 'js',
): T | NativeScriptInvokedCallback<T> {
  if (thread === 'js') {
    return jsInvoker(callback);
  }
  return callback;
}

export const createEventBridge = eventBridge;

export function isMainThread(): boolean {
  const NSThread = (globalThis as Record<string, any>).NSThread;
  return NSThread?.isMainThread === true;
}

export function assertUIKitThread(
  message = 'UIKit native APIs must be called through NativeScript.runOnUI',
): void {
  if (!isMainThread()) {
    throw new Error(message);
  }
}

export function warnIfNotUIKitThread(
  message = 'UIKit native APIs should be mutated through NativeScript.runOnUI',
): boolean {
  if (isMainThread()) {
    return false;
  }
  if (typeof console !== 'undefined' && typeof console.warn === 'function') {
    console.warn(message);
  }
  return true;
}

function systemFrameworkPath(nameOrPath: string): string {
  if (!nameOrPath) {
    return '';
  }
  if (nameOrPath.includes('/')) {
    return nameOrPath;
  }
  const frameworkName = nameOrPath.endsWith('.framework')
    ? nameOrPath
    : `${nameOrPath}.framework`;
  return `/System/Library/Frameworks/${frameworkName}`;
}

export function getClass<T = unknown>(name: string): T | null {
  if (!name) {
    return null;
  }
  const api = requireNativeApiHost();
  const nativeClass = api.getClass?.(name) ?? api[name];
  if (nativeClass == null) {
    return null;
  }
  const wrapped = wrapNativeClass(nativeClass);
  return wrapped == null ? null : (wrapped as T);
}

export function getProtocol<T = unknown>(name: string): T | null {
  if (!name) {
    return null;
  }
  const api = requireNativeApiHost();
  const protocol = api.getProtocol?.(name) ?? api[name];
  return protocol == null ? null : (protocol as T);
}

export function isClassAvailable(name: string): boolean {
  const nativeClass = getClass<Record<string, unknown>>(name);
  if (!nativeClass) {
    return false;
  }
  if (typeof nativeClass.available === 'boolean') {
    return nativeClass.available;
  }
  return true;
}

function frameworkBundle(nameOrPath: string): any | null {
  const NSBundle = getClass<any>('NSBundle');
  if (!NSBundle || typeof NSBundle.bundleWithPath !== 'function') {
    return null;
  }
  const path = systemFrameworkPath(nameOrPath);
  if (!path) {
    return null;
  }
  return NSBundle.bundleWithPath(path) ?? null;
}

const frameworkSentinelClasses: Record<string, string> = {
  Foundation: 'NSObject',
  UIKit: 'UIView',
  QuickLook: 'QLPreviewController',
  VisionKit: 'VNDocumentCameraViewController',
  PassKit: 'PKPass',
};

function frameworkName(nameOrPath: string): string {
  const match = /([^/]+)\.framework(?:\/)?$/.exec(nameOrPath);
  if (match) {
    return match[1];
  }
  return nameOrPath.replace(/\.framework$/, '');
}

export function isFrameworkLoaded(nameOrPath: string): boolean {
  const sentinelClass = frameworkSentinelClasses[frameworkName(nameOrPath)];
  if (sentinelClass && isClassAvailable(sentinelClass)) {
    return true;
  }
  const bundle = frameworkBundle(nameOrPath);
  if (!bundle) {
    return false;
  }
  if (typeof bundle.loaded === 'boolean') {
    return bundle.loaded;
  }
  if (typeof bundle.isLoaded === 'function') {
    return Boolean(bundle.isLoaded());
  }
  return false;
}

export function loadFramework(nameOrPath: string): boolean {
  if (!nameOrPath) {
    return false;
  }
  if (isFrameworkLoaded(nameOrPath)) {
    return true;
  }
  const api = requireNativeApiHost();
  try {
    if (typeof api.import === 'function') {
      api.import(nameOrPath);
      return true;
    }
  } catch {
    // Fall through to NSBundle below so callers get a false availability result.
  }
  const bundle = frameworkBundle(nameOrPath);
  if (!bundle || typeof bundle.load !== 'function') {
    return false;
  }
  try {
    return Boolean(bundle.load());
  } catch {
    return false;
  }
}

function resolveProtocolReference(protocolRef: NativeProtocolReference): unknown {
  if (typeof protocolRef !== 'string') {
    return protocolRef;
  }
  return (
    (globalThis as Record<string, unknown>)[protocolRef] ??
    getProtocol(protocolRef)
  );
}

function wrapDelegateMethods<T extends object>(
  methods: T,
  thread: CreateDelegateOptions['thread'],
): T {
  if (!thread || thread === 'caller') {
    return methods;
  }

  const wrapped = Object.create(Object.getPrototypeOf(methods));
  for (const key of Reflect.ownKeys(methods)) {
    const descriptor = Object.getOwnPropertyDescriptor(methods, key);
    if (!descriptor) {
      continue;
    }
    if ('value' in descriptor && typeof descriptor.value === 'function') {
      descriptor.value = eventBridge(descriptor.value, thread);
    }
    Object.defineProperty(wrapped, key, descriptor);
  }
  return wrapped;
}

export function createDelegate<T extends object>(
  protocols: NativeProtocolReference | NativeProtocolReference[],
  methods: Partial<T>,
  options: CreateDelegateOptions = {},
): T {
  const protocolList = (Array.isArray(protocols) ? protocols : [protocols])
    .map(resolveProtocolReference)
    .filter(Boolean);
  if (protocolList.length === 0) {
    throw new Error('NativeScript.createDelegate requires at least one protocol');
  }

  const DelegateClass = requireNSObject().extend(
    wrapDelegateMethods(methods, options.thread),
    {
      protocols: protocolList,
      name: options.name,
    },
  );
  const delegate = DelegateClass.alloc().init() as T;
  if (options.retainer) {
    options.retainer.retain(delegate);
  } else if (options.owner) {
    options.owner.retain(delegate);
  } else {
    defaultNativeRetainer.retain(delegate);
  }

  const assignedObject = options.assignTo?.object as
    | Record<string, unknown>
    | undefined;
  const assignedProperty = options.assignTo?.property ?? 'delegate';
  if (assignedObject) {
    assignedObject[assignedProperty] = delegate;
  }

  options.owner?.dispose?.(() => {
    if (assignedObject && assignedObject[assignedProperty] === delegate) {
      assignedObject[assignedProperty] = null;
    }
    options.owner?.release?.(delegate);
    options.retainer?.release(delegate);
    if (!options.retainer && !options.owner) {
      defaultNativeRetainer.release(delegate);
    }
  });

  return delegate;
}

type UIKitRuntimeContext<Props extends object> = UIKitViewContext<Props> & {
  createArgument(): UIKitCreateArgument<Props>;
  disposeResources(): void;
  isDisposed(): boolean;
};

type UIKitHostInstance<NativeView> = {
  hostView: unknown;
  lifecycleValue: NativeView;
  childrenView?: unknown;
  controller?: unknown;
};

type UIKitAdapterDefinition<Props extends object, NativeView> =
  UIKitViewDefinition<Props, NativeView> & {
    resolveHostInstance?: (created: NativeView) => UIKitHostInstance<NativeView>;
  };

let targetActionClass: any;
let observerClass: any;
const targetActionCallbacks = new Map<string, (sender: unknown) => void>();
const observerCallbacks = new Map<
  string,
  (keyPath: string, object: unknown, change: unknown) => void
>();

function objcInteropTypes(): any {
  return (globalThis as Record<string, any>).interop?.types;
}

function requireNSObject(): any {
  const nsObject = (globalThis as Record<string, any>).NSObject;
  if (!nsObject || typeof nsObject.extend !== 'function') {
    throw new Error('NSObject.extend is not available');
  }
  return nsObject;
}

function nativeCallbackKey(value: unknown): string {
  const handleof = (globalThis as Record<string, any>).interop?.handleof;
  if (value != null && typeof handleof === 'function') {
    const handle = handleof(value);
    if (handle != null) {
      if (typeof handle.toHexString === 'function') {
        return handle.toHexString();
      }
      return String(handle);
    }
  }
  return String(value);
}

function getTargetActionClass(): any {
  if (targetActionClass) {
    return targetActionClass;
  }
  const types = objcInteropTypes();
  const NSObject = requireNSObject();
  targetActionClass = NSObject.extend(
    {
      nativeScriptHandleAction(sender: unknown) {
        const callback = targetActionCallbacks.get(nativeCallbackKey(this));
        if (typeof callback === 'function') {
          callback(sender);
        }
      },
    },
    {
      exposedMethods: {
        'nativeScriptHandleAction:': {
          returns: types?.void,
          params: [NSObject],
        },
      },
    },
  );
  return targetActionClass;
}

function getObserverClass(): any {
  if (observerClass) {
    return observerClass;
  }
  const types = objcInteropTypes();
  const NSObject = requireNSObject();
  const NSString = (globalThis as Record<string, any>).NSString;
  const NSDictionary = (globalThis as Record<string, any>).NSDictionary;
  const Pointer = (globalThis as Record<string, any>).interop?.Pointer
    ?? types?.id;

  observerClass = NSObject.extend(
    {
      'observeValueForKeyPath:ofObject:change:context:'(
        keyPath: string,
        object: unknown,
        change: unknown,
      ) {
        const callback = observerCallbacks.get(nativeCallbackKey(this));
        if (typeof callback === 'function') {
          callback(keyPath, object, change);
        }
      },
    },
    {
      exposedMethods: {
        'observeValueForKeyPath:ofObject:change:context:': {
          returns: types?.void,
          params: [NSString ?? NSObject, NSObject, NSDictionary ?? NSObject, Pointer],
        },
      },
    },
  );
  return observerClass;
}

function createUIKitContext<Props extends object>(
  name: string,
  propsRef: React.MutableRefObject<Props>,
  invalidateLayout: () => void,
): UIKitRuntimeContext<Props> {
  const retained: unknown[] = [];
  const cleanupCallbacks: Array<() => void> = [];
  let disposed = false;

  const context: UIKitRuntimeContext<Props> = {
    get name() {
      return name;
    },
    get tag() {
      return null;
    },
    get props() {
      return propsRef.current;
    },
    emit(eventName, payload) {
      if (disposed) {
        return;
      }
      const handler = (propsRef.current as Record<PropertyKey, unknown>)[
        eventName as PropertyKey
      ];
      if (typeof handler !== 'function') {
        return;
      }
      setTimeout(() => {
        if (!disposed) {
          (handler as Function)(payload);
        }
      }, 0);
    },
    targetAction(control, events, callback) {
      if (control == null || typeof callback !== 'function') {
        return;
      }
      const target = getTargetActionClass().alloc().init();
      const targetKey = nativeCallbackKey(target);
      targetActionCallbacks.set(targetKey, jsInvoker(() => {
        if (!disposed) {
          callback();
        }
      }));
      const selector = 'nativeScriptHandleAction:';
      const nativeControl = control as Record<string, Function>;
      if (typeof nativeControl.addTargetActionForControlEvents !== 'function') {
        throw new Error('targetAction expects a UIControl-compatible object');
      }
      nativeControl.addTargetActionForControlEvents(target, selector, events);
      context.retain(target);
      context.dispose(() => {
        if (typeof nativeControl.removeTargetActionForControlEvents === 'function') {
          nativeControl.removeTargetActionForControlEvents(target, selector, events);
        }
        targetActionCallbacks.delete(targetKey);
      });
    },
    delegate(object, protocolRef, implementation) {
      const nativeObject = object as Record<string, unknown>;
      return createDelegate<T>([protocolRef as NativeProtocolReference], implementation, {
        owner: context,
        assignTo: nativeObject && 'delegate' in nativeObject
          ? {object: nativeObject, property: 'delegate'}
          : undefined,
      });
    },
    notification(name, object, callback) {
      const center = (globalThis as Record<string, any>).NSNotificationCenter
        ?.defaultCenter;
      if (!center) {
        throw new Error('NSNotificationCenter.defaultCenter is not available');
      }
      const observer = center.addObserverForNameObjectQueueUsingBlock(
        name,
        object ?? null,
        null,
        jsInvoker((notification: unknown) => {
          if (!disposed) {
            callback(notification);
          }
        }),
      );
      context.retain(observer);
      context.dispose(() => {
        center.removeObserver(observer);
      });
    },
    observe(object, keyPath, callback) {
      const nativeObject = object as Record<string, Function>;
      if (
        object == null ||
        typeof nativeObject.addObserverForKeyPathOptionsContext !== 'function'
      ) {
        throw new Error('observe expects a KVO-compatible NSObject');
      }
      const observer = getObserverClass().alloc().init();
      const observerKey = nativeCallbackKey(observer);
      observerCallbacks.set(observerKey, (
        observedKeyPath: string,
        _observedObject: unknown,
        change: unknown,
      ) => {
        if (disposed || String(observedKeyPath) !== keyPath) {
          return;
        }
        const newKey = (globalThis as Record<string, any>).NSKeyValueChangeNewKey;
        const value =
          change && typeof (change as Record<string, Function>).objectForKey === 'function'
            ? (change as Record<string, Function>).objectForKey(newKey)
            : undefined;
        callback(value, change);
      });
      const options = (globalThis as Record<string, any>).NSKeyValueObservingOptions;
      const optionNew =
        typeof options?.New === 'number'
          ? options.New
          : (globalThis as Record<string, any>).NSKeyValueObservingOptionNew ?? 1;
      nativeObject.addObserverForKeyPathOptionsContext(
        observer,
        keyPath,
        optionNew,
        null,
      );
      context.retain(observer);
      context.dispose(() => {
        try {
          if (typeof nativeObject.removeObserverForKeyPath === 'function') {
            nativeObject.removeObserverForKeyPath(observer, keyPath);
          }
        } finally {
          observerCallbacks.delete(observerKey);
        }
      });
    },
    retain(value) {
      retained.push(value);
      return value;
    },
    release(value?: unknown) {
      if (arguments.length === 0) {
        retained.length = 0;
        return;
      }
      for (let i = retained.length - 1; i >= 0; i--) {
        if (retained[i] === value) {
          retained.splice(i, 1);
        }
      }
    },
    dispose(callback) {
      cleanupCallbacks.push(callback);
    },
    invalidateLayout,
    createArgument() {
      return Object.assign(Object.create(context), propsRef.current);
    },
    disposeResources() {
      if (disposed) {
        return;
      }
      disposed = true;
      for (let i = cleanupCallbacks.length - 1; i >= 0; i--) {
        cleanupCallbacks[i]();
      }
      cleanupCallbacks.length = 0;
      retained.length = 0;
    },
    isDisposed() {
      return disposed;
    },
  };

  return context;
}

function constrainedSize(
  size: {width: number; height: number},
  layout?: UIKitLayoutOptions,
): {width: number; height: number} {
  const defaultSize = layout?.defaultSize ?? {};
  let width = Number.isFinite(size.width) && size.width >= 0
    ? size.width
    : defaultSize.width ?? 0;
  let height = Number.isFinite(size.height) && size.height >= 0
    ? size.height
    : defaultSize.height ?? 0;

  if (layout?.minSize?.width != null) {
    width = Math.max(width, layout.minSize.width);
  }
  if (layout?.minSize?.height != null) {
    height = Math.max(height, layout.minSize.height);
  }
  if (layout?.maxSize?.width != null) {
    width = Math.min(width, layout.maxSize.width);
  }
  if (layout?.maxSize?.height != null) {
    height = Math.min(height, layout.maxSize.height);
  }
  return {width, height};
}

function flattenedStyleSize(style: ViewProps['style']) {
  const flat = StyleSheet.flatten(style) ?? {};
  return {
    width: typeof flat.width === 'number' ? flat.width : undefined,
    height: typeof flat.height === 'number' ? flat.height : undefined,
  };
}

function makeCGSize(width: number, height: number) {
  const CGSizeMake = (globalThis as Record<string, any>).CGSizeMake;
  if (typeof CGSizeMake === 'function') {
    return CGSizeMake(width, height);
  }
  return {width, height};
}

function readNativeSize(size: unknown): {width: number; height: number} {
  const nativeSize = size as {width?: unknown; height?: unknown};
  return {
    width: Number(nativeSize?.width ?? 0),
    height: Number(nativeSize?.height ?? 0),
  };
}

function measureUIKitView(
  view: unknown,
  layout: UIKitLayoutOptions | undefined,
  style: ViewProps['style'],
): {width: number; height: number} {
  const mode = layout?.sizing ?? 'fill';
  if (mode === 'fill') {
    return constrainedSize(layout?.defaultSize ?? {width: 0, height: 0}, layout);
  }

  const styleSize = flattenedStyleSize(style);
  const nativeView = view as Record<string, any>;
  let measured = layout?.defaultSize ?? {width: 0, height: 0};

  if (mode === 'intrinsic') {
    measured = readNativeSize(nativeView.intrinsicContentSize);
  } else if (mode === 'sizeThatFits' && typeof nativeView.sizeThatFits === 'function') {
    measured = readNativeSize(
      nativeView.sizeThatFits(
        makeCGSize(styleSize.width ?? Number.MAX_SAFE_INTEGER, styleSize.height ?? Number.MAX_SAFE_INTEGER),
      ),
    );
  } else if (
    mode === 'autoLayout' &&
    typeof nativeView.systemLayoutSizeFittingSize === 'function'
  ) {
    const fittingSize =
      (globalThis as Record<string, any>).UIView?.layoutFittingCompressedSize ??
      makeCGSize(styleSize.width ?? 0, styleSize.height ?? 0);
    measured = readNativeSize(nativeView.systemLayoutSizeFittingSize(fittingSize));
  }

  return constrainedSize(
    {
      width: styleSize.width ?? measured.width,
      height: styleSize.height ?? measured.height,
    },
    layout,
  );
}

function nativeHandleOrUndefined(value: unknown): string | undefined {
  return value == null ? undefined : nativeHandleForUIKitView(value);
}

function nativeHandleForNSObject(value: unknown): string | undefined {
  if (value == null) {
    return undefined;
  }
  const interop = (globalThis as Record<string, any>).interop;
  const pointer = interop?.handleof?.(value);
  if (!pointer) {
    return undefined;
  }
  if (typeof pointer.toHexString === 'function') {
    return pointer.toHexString();
  }
  if (typeof pointer.address === 'string') {
    return pointer.address;
  }
  if (typeof pointer.address === 'number') {
    return String(pointer.address);
  }
  if (typeof pointer.toNumber === 'function') {
    return String(pointer.toNumber());
  }
  return undefined;
}

function defineUIKitHost<Props extends object, NativeView = unknown>(
  definition: UIKitAdapterDefinition<Props, NativeView>,
): UIKitViewComponent<Props, NativeView> {
  const debugName =
    definition.debugName
    || definition.name
    || definition.displayName
    || 'NativeScriptUIKitView';

  const Component = forwardRef<UIKitViewRef<NativeView>, Props & ViewProps>(
    function NativeScriptUIKitView(props, ref) {
      const {nativeProps, pluginProps} = splitUIKitViewProps(props, definition);
      const viewRef = useRef<NativeView | null>(null);
      const propsRef = useRef(pluginProps);
      const previousPropsRef = useRef<Readonly<Props & ViewProps> | undefined>();
      const contextRef = useRef<UIKitRuntimeContext<Props & ViewProps> | null>(
        null,
      );
      const hostInstanceRef = useRef<UIKitHostInstance<NativeView> | null>(null);
      const mountedRef = useRef(false);
      const disposedRef = useRef(false);
      const [nativeViewHandle, setNativeViewHandle] = useState<string>();
      const [childrenViewHandle, setChildrenViewHandle] = useState<string>();
      const [controllerHandle, setControllerHandle] = useState<string>();
      const [measuredSize, setMeasuredSize] = useState<
        {width: number; height: number} | undefined
      >(() => definition.layout?.sizing === 'fill'
        ? undefined
        : definition.layout?.defaultSize
          ? {
              width: definition.layout.defaultSize.width ?? 0,
              height: definition.layout.defaultSize.height ?? 0,
            }
          : undefined);
      const [error, setError] = useState<Error | null>(null);

      propsRef.current = pluginProps;

      const updateMeasuredSize = () => {
        const hostInstance = hostInstanceRef.current;
        if (!hostInstance || definition.layout?.sizing === 'fill') {
          return;
        }
        runOnUI(() => {
          const nextSize = measureUIKitView(
            hostInstance.hostView,
            definition.layout,
            nativeProps.style,
          );
          setMeasuredSize((previous) =>
            previous &&
            previous.width === nextSize.width &&
            previous.height === nextSize.height
              ? previous
              : nextSize,
          );
        }).catch((reason) => {
          setError(reason instanceof Error ? reason : new Error(String(reason)));
        });
      };

      useImperativeHandle(
        ref,
        () => ({
          get nativeView() {
            return viewRef.current;
          },
          runOnUI(callback) {
            let result: unknown;
            return runOnUI(() => {
              if (viewRef.current == null) {
                throw new Error('UIKit view has not been created yet');
              }
              result = callback(viewRef.current);
            }).then(() => result as never);
          },
          measureNative() {
            let measured:
              | {width: number; height: number}
              | undefined;
            return runOnUI(() => {
              if (viewRef.current == null) {
                throw new Error('UIKit view has not been created yet');
              }
              measured = measureUIKitView(
                hostInstanceRef.current?.hostView ?? viewRef.current,
                definition.layout,
                nativeProps.style,
              );
            }).then(() => {
              if (measured == null) {
                throw new Error('UIKit view measurement did not complete');
              }
              return measured;
            });
          },
          invalidateNativeLayout() {
            updateMeasuredSize();
          },
        }),
        [definition.layout, nativeProps.style],
      );

      useEffect(() => {
        disposedRef.current = false;
        let cancelled = false;

        ensureNativeScriptInstalled();

        runOnUI(() => {
          const currentProps = propsRef.current;
          const context = createUIKitContext(
            debugName,
            propsRef,
            updateMeasuredSize,
          );
          contextRef.current = context;
          const created = definition.create(context.createArgument());
          const hostInstance = definition.resolveHostInstance
            ? definition.resolveHostInstance(created)
            : {hostView: created, lifecycleValue: created};
          const nativeView = hostInstance.lifecycleValue;
          if (cancelled || disposedRef.current) {
            definition.dispose?.(nativeView, currentProps, context);
            context.disposeResources();
            const maybeView = hostInstance.hostView as Record<string, unknown>;
            if (typeof maybeView.removeFromSuperview === 'function') {
              maybeView.removeFromSuperview();
            }
            return undefined;
          }
          hostInstanceRef.current = hostInstance;
          viewRef.current = nativeView;
          definition.update?.(nativeView, currentProps, undefined, context);
          previousPropsRef.current = currentProps;
          return undefined;
        })
          .then(() => {
            const hostInstance = hostInstanceRef.current;
            if (cancelled || viewRef.current == null || hostInstance == null) {
              return;
            }
            setNativeViewHandle(nativeHandleOrUndefined(hostInstance.hostView));
            setChildrenViewHandle(nativeHandleOrUndefined(hostInstance.childrenView));
            setControllerHandle(nativeHandleForNSObject(hostInstance.controller));
            updateMeasuredSize();
          })
          .catch((reason) => {
            setError(reason instanceof Error ? reason : new Error(String(reason)));
          });

        return () => {
          cancelled = true;
          disposedRef.current = true;
          const nativeView = viewRef.current;
          const context = contextRef.current;
          const hostInstance = hostInstanceRef.current;
          viewRef.current = null;
          hostInstanceRef.current = null;
          contextRef.current = null;
          mountedRef.current = false;
          if (nativeView == null) {
            context?.disposeResources();
            return;
          }
          runOnUI(() => {
            definition.dispose?.(nativeView, propsRef.current, context ?? undefined);
            context?.disposeResources();
            const maybeView = hostInstance?.hostView as
              | Record<string, unknown>
              | undefined;
            if (typeof maybeView.removeFromSuperview === 'function') {
              maybeView.removeFromSuperview();
            }
          }).catch((reason) => {
            setError(reason instanceof Error ? reason : new Error(String(reason)));
          });
        };
      }, [definition]);

      useEffect(() => {
        const nativeView = viewRef.current;
        if (nativeView == null) {
          return;
        }

        const previousProps = previousPropsRef.current;
        const currentProps = propsRef.current;
        const context = contextRef.current;
        previousPropsRef.current = currentProps;

        runOnUI(() => {
          definition.update?.(nativeView, currentProps, previousProps, context ?? undefined);
        }).catch((reason) => {
          setError(reason instanceof Error ? reason : new Error(String(reason)));
        });
        updateMeasuredSize();
      }, [definition, pluginProps]);

      useEffect(() => {
        const nativeView = viewRef.current;
        if (nativeViewHandle == null || nativeView == null || mountedRef.current) {
          return;
        }

        mountedRef.current = true;
        const context = contextRef.current;
        runOnUI(() => {
          if (!disposedRef.current) {
            definition.mounted?.(nativeView, propsRef.current, context ?? undefined);
          }
        }).catch((reason) => {
          setError(reason instanceof Error ? reason : new Error(String(reason)));
        });
      }, [definition, nativeViewHandle]);

      if (error) {
        throw error;
      }

      const layoutStyle =
        measuredSize && definition.layout?.sizing !== 'fill'
          ? {
              width: measuredSize.width,
              height: measuredSize.height,
            }
          : undefined;
      const {children, ...nativePropsWithoutChildren} =
        nativeProps as ViewProps & {children?: React.ReactNode};

      return React.createElement(NativeScriptUIViewNativeComponent, {
        ...nativePropsWithoutChildren,
        collapsable: false,
        children: childrenViewHandle ? children : undefined,
        childrenViewHandle,
        controllerHandle,
        debugName,
        nativeViewHandle,
        style: layoutStyle
          ? [nativeProps.style, layoutStyle]
          : nativeProps.style,
      });
    },
  );

  Component.displayName = definition.displayName || definition.name || debugName;
  return Component;
}

export function defineUIKitView<Props extends object, NativeView = unknown>(
  definition: UIKitViewDefinition<Props, NativeView>,
): UIKitViewComponent<Props, NativeView> {
  return defineUIKitHost(definition);
}

export function defineUIKitContainer<
  Props extends object,
  RootView = unknown,
  ChildrenView = unknown,
>(
  definition: UIKitContainerDefinition<Props, RootView, ChildrenView>,
): UIKitViewComponent<Props, UIKitContainerResult<RootView, ChildrenView>> {
  return defineUIKitHost({
    ...definition,
    resolveHostInstance(created) {
      return {
        hostView: created.rootView,
        lifecycleValue: created,
        childrenView: created.childrenView,
      };
    },
  } as UIKitAdapterDefinition<
    Props,
    UIKitContainerResult<RootView, ChildrenView>
  >);
}

export function defineUIViewController<
  Props extends object,
  Controller = unknown,
>(
  definition: UIViewControllerDefinition<Props, Controller>,
): UIKitViewComponent<Props, Controller> {
  return defineUIKitHost({
    ...definition,
    create: definition.createController,
    resolveHostInstance(controller) {
      const controllerRecord = controller as Record<string, unknown>;
      return {
        hostView: controllerRecord.view,
        lifecycleValue: controller,
        controller,
      };
    },
  } as UIKitAdapterDefinition<Props, Controller>);
}

const NativeScript = {
  init,
  install,
  installGlobals,
  isInstalled,
  defaultMetadataPath,
  defineUIKitContainer,
  defineUIKitView,
  defineUIViewController,
  getRuntimeBackend,
  installWorklets,
  assertUIKitThread,
  createDelegate,
  createEventBridge,
  createRetainer,
  eventBridge,
  getClass,
  getProtocol,
  isClassAvailable,
  isFrameworkLoaded,
  isMainThread,
  jsInvoker,
  loadFramework,
  release,
  retain,
  runOnUI,
  uiInvoker,
  warnIfNotUIKitThread,
};

export default NativeScript;

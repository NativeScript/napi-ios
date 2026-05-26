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
import NativeScriptNativeApi from './NativeScriptNativeApi';
import NativeScriptUIViewNativeComponent from './NativeScriptUIViewNativeComponent';

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
  getProtocol?: (name: string) => unknown;
  getStruct?: (name: string) => unknown;
  getUnion?: (name: string) => unknown;
  runOnUI?: (callback?: () => void) => Promise<void>;
  [name: string]: unknown;
};

export type InstallOptions = {
  globals?: boolean;
};

export type UIKitViewDefinition<Props extends object, NativeView = unknown> = {
  name?: string;
  debugName?: string;
  displayName?: string;
  create: (props: Readonly<Props & ViewProps>) => NativeView;
  update?: (
    view: NativeView,
    props: Readonly<Props & ViewProps>,
    previousProps?: Readonly<Props & ViewProps>,
  ) => void;
  mounted?: (view: NativeView, props: Readonly<Props & ViewProps>) => void;
  dispose?: (view: NativeView, props: Readonly<Props & ViewProps>) => void;
  nativeProps?: (
    props: Readonly<Props & ViewProps>,
  ) => Partial<ViewProps> | undefined;
};

export type UIKitViewRef<NativeView = unknown> = {
  readonly nativeView: NativeView | null;
  runOnUI: (callback: (view: NativeView) => void) => Promise<void>;
};

export type UIKitViewComponent<Props extends object, NativeView = unknown> =
  ForwardRefExoticComponent<
    PropsWithoutRef<Props & ViewProps> & RefAttributes<UIKitViewRef<NativeView>>
  >;

const nativeApiGlobalName = '__nativeScriptNativeApi';
const nativeApiGlobalCacheName = '__nativeScriptNativeApiGlobalCache';
const nativeApiTypeCodeKey = '__nativeApiTypeCode';
const nativeClassWrappers = new WeakMap<object, unknown>();

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
    try {
      cacheNativeGlobal(name, (globalThis as Record<string, unknown>)[name]);
    } catch {
      // Some host globals throw when read; leave those uncached.
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

  Object.defineProperty(constructable, '__nativeApiClass', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: nativeClass,
  });

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
      return (nativeClass as Record<PropertyKey, unknown>)[property];
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

export function runOnUI(callback?: () => void): Promise<void> {
  const run = requireNativeApiHost().runOnUI;
  if (typeof run !== 'function') {
    throw new Error(
      'NativeScript Native API JSI host was installed without runOnUI',
    );
  }
  return run(callback);
}

export function defineUIKitView<Props extends object, NativeView = unknown>(
  definition: UIKitViewDefinition<Props, NativeView>,
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
      const mountedRef = useRef(false);
      const disposedRef = useRef(false);
      const [nativeViewHandle, setNativeViewHandle] = useState<string>();
      const [error, setError] = useState<Error | null>(null);

      propsRef.current = pluginProps;

      useImperativeHandle(
        ref,
        () => ({
          get nativeView() {
            return viewRef.current;
          },
          runOnUI(callback) {
            return runOnUI(() => {
              if (viewRef.current == null) {
                throw new Error('UIKit view has not been created yet');
              }
              callback(viewRef.current);
            });
          },
        }),
        [],
      );

      useEffect(() => {
        disposedRef.current = false;
        let cancelled = false;

        ensureNativeScriptInstalled();

        runOnUI(() => {
          const currentProps = propsRef.current;
          const nativeView = definition.create(currentProps);
          if (cancelled || disposedRef.current) {
            definition.dispose?.(nativeView, currentProps);
            const maybeView = nativeView as Record<string, unknown>;
            if (typeof maybeView.removeFromSuperview === 'function') {
              maybeView.removeFromSuperview();
            }
            return undefined;
          }
          viewRef.current = nativeView;
          definition.update?.(nativeView, currentProps, undefined);
          previousPropsRef.current = currentProps;
          return undefined;
        })
          .then(() => {
            if (cancelled || viewRef.current == null) {
              return;
            }
            setNativeViewHandle(nativeHandleForUIKitView(viewRef.current));
          })
          .catch((reason) => {
            setError(reason instanceof Error ? reason : new Error(String(reason)));
          });

        return () => {
          cancelled = true;
          disposedRef.current = true;
          const nativeView = viewRef.current;
          viewRef.current = null;
          mountedRef.current = false;
          if (nativeView == null) {
            return;
          }
          runOnUI(() => {
            definition.dispose?.(nativeView, propsRef.current);
            const maybeView = nativeView as Record<string, unknown>;
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
        previousPropsRef.current = currentProps;

        runOnUI(() => {
          definition.update?.(nativeView, currentProps, previousProps);
        }).catch((reason) => {
          setError(reason instanceof Error ? reason : new Error(String(reason)));
        });
      }, [definition, pluginProps]);

      useEffect(() => {
        const nativeView = viewRef.current;
        if (nativeViewHandle == null || nativeView == null || mountedRef.current) {
          return;
        }

        mountedRef.current = true;
        runOnUI(() => {
          if (!disposedRef.current) {
            definition.mounted?.(nativeView, propsRef.current);
          }
        }).catch((reason) => {
          setError(reason instanceof Error ? reason : new Error(String(reason)));
        });
      }, [definition, nativeViewHandle]);

      if (error) {
        throw error;
      }

      return React.createElement(NativeScriptUIViewNativeComponent, {
        ...nativeProps,
        collapsable: false,
        debugName,
        nativeViewHandle,
      });
    },
  );

  Component.displayName = definition.displayName || definition.name || debugName;
  return Component;
}

const NativeScript = {
  init,
  install,
  installGlobals,
  isInstalled,
  defaultMetadataPath,
  defineUIKitView,
  getRuntimeBackend,
  runOnUI,
};

export default NativeScript;

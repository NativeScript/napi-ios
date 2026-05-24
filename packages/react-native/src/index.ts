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
  if (!name || (!force && Object.prototype.hasOwnProperty.call(globalThis, name))) {
    return;
  }

  try {
    Object.defineProperty(globalThis, name, {
      configurable: true,
      enumerable: false,
      get() {
        const value = resolve(name);
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

  for (const key of ['kind', 'runtimeName', 'metadataOffset', 'sizeof', 'fields']) {
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
    const nativeHasInstance = (nativeFactory as Record<symbol, unknown>)[hasInstance];
    if (typeof nativeHasInstance === 'function') {
      Object.defineProperty(constructable, hasInstance, {
        configurable: true,
        enumerable: false,
        value: nativeHasInstance,
      });
    }
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
}

export function installGlobals(): boolean {
  const api = nativeApiHost();
  if (!api) {
    return false;
  }

  const classNames = api.metadata?.classNames?.() ?? [];
  for (const name of classNames) {
    defineLazyNativeGlobal(name, (className) => api[className]);
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
    defineLazyNativeGlobal(name, (enumName) => api[enumName]);
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
  const installed = NativeScriptNativeApi.install(metadataPath);
  if (installed) {
    installInteropConstructors();
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
        nativeViewHandle,
      });
    },
  );

  Component.displayName = definition.displayName ?? 'NativeScriptUIKitView';
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

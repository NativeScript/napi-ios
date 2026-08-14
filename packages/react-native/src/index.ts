// @ts-nocheck
/// <reference path="../types/ios/index.d.ts" />
/**
 * `@nativescript/react-native` — the TurboModule + Fabric host that lets
 * TypeScript worklets own real UIKit views. This module IS the package's public
 * type surface (`package.json` "types" points here); the hand-written
 * `index.d.ts` it replaced had drifted out of sync with the implementation.
 *
 * `@ts-nocheck` keeps this babel-authored body — with its intentional loose
 * casts and worklet-runtime globals — from injecting strict-mode noise into
 * consumers' type checks, while every `export`ed declaration below still forms
 * the checkable public contract. The triple-slash reference above pulls the
 * generated iOS interop globals (UIView, NSObject, …) into scope for the
 * worklet host bodies.
 */
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from "react";
import { findNodeHandle, type ViewProps } from "react-native";
import NativeScriptNativeApi from "./NativeScriptNativeApi";
import NativeScriptUIViewNativeComponent from "./NativeScriptUIViewNativeComponent";

declare const require: (id: string) => any;

/**
 * The Native API host object installed by the TurboModule. Reflects the loaded
 * runtime/backend, metadata counts + name lists, and the class/protocol/enum/
 * struct/union lookups the interop layer builds on.
 */
export type NativeApiHost = {
  runtime?: string;
  backend?: string;
  metadata?: {
    classes?: number;
    functions?: number;
    constants?: number;
    protocols?: number;
    enums?: number;
    structs?: number;
    unions?: number;
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
  /**
   * Install Objective-C classes/functions/constants as RN runtime globals.
   * Native UI should run through worklets; React Native defaults this off so
   * UIKit cannot be touched from the RN JavaScript thread by accident.
   */
  globals?: boolean;
};

export type NativeScriptWorklets = {
  getUIRuntimeHolder: () => object;
  isWorkletFunction: (value: unknown) => boolean;
  runOnUIAsync: <Args extends unknown[], ReturnValue>(
    callback: (...args: Args) => ReturnValue | Promise<ReturnValue>,
    ...args: Args
  ) => Promise<ReturnValue>;
  runOnUISync: <Args extends unknown[], ReturnValue>(
    callback: (...args: Args) => ReturnValue,
    ...args: Args
  ) => ReturnValue;
};

export type ReactNativeFabricViewLayoutTraits = {
  isFabricComponentView: boolean;
  hasYogaStyle: boolean;
  hasLayoutMetrics: boolean;
  flex: number | null;
  flexGrow: number | null;
  flexShrink: number | null;
  frameX?: number;
  frameY?: number;
  frameWidth?: number;
  frameHeight?: number;
  layoutMetricsFrameX?: number;
  layoutMetricsFrameY?: number;
  layoutMetricsFrameWidth?: number;
  layoutMetricsFrameHeight?: number;
  layoutMetricsContentFrameX?: number;
  layoutMetricsContentFrameY?: number;
  layoutMetricsContentFrameWidth?: number;
  layoutMetricsContentFrameHeight?: number;
};

/**
 * How the native host measures itself: `fill` (match the RN frame),
 * `intrinsic` (`intrinsicContentSize`), `sizeThatFits` (ask the view), or
 * `autoLayout` (systemLayoutSizeFitting via constraints).
 */
export type UIKitSizingMode =
  "fill" | "intrinsic" | "sizeThatFits" | "autoLayout";

/** Native sizing/measurement config for a host (`definition.layout`). */
export type UIKitLayoutOptions = {
  /** Measurement strategy — see {@link UIKitSizingMode} (default `fill`). */
  sizing?: UIKitSizingMode;
  /** Fallback size used before/without a measured size. */
  defaultSize?: { width?: number; height?: number };
  /** Clamp the measured size from below. */
  minSize?: { width?: number; height?: number };
  /** Clamp the measured size from above. */
  maxSize?: { width?: number; height?: number };
};

/** `onHostReady` payload: native handles + readiness for a mounted host. */
export type UIKitHostReadyEvent = {
  nativeEvent: {
    hostReadyId: string;
    hostId: string;
    componentViewHandle: string;
    nativeViewHandle: string;
    childrenViewHandle: string;
    controllerHandle: string;
    hasChildren: boolean;
    visibleDescendantCount: number;
    windowAttached: boolean;
  };
};

export type UIKitHostNativeHandles = {
  componentViewHandle?: string;
  containerViewHandle?: string;
  nativeViewHandle?: string;
  childrenViewHandle?: string;
  controllerHandle?: string;
};

export type UIKitNativeMountInfo = {
  fabricComponentView?: unknown | null;
  fabricComponentViewHandle?: string;
  fabricContainerView?: unknown | null;
  fabricContainerViewHandle?: string;
};

export type UIKitFabricTransaction = {
  readonly children: readonly UIKitFabricMountedChild[];
  readonly hasModifiedChildren: boolean;
  readonly hasModifiedProps: boolean;
  readonly mutations: readonly UIKitFabricMutation[];
  // SEAM D STAGE 0 follow-up: the shared per-host delivery token, bumped
  // exactly-once per ACTUAL native transactionCommitted delivery. Present
  // (and monotonically increasing) only on transactions parsed from a real
  // native payload; synthesized/empty transactions omit it.
  readonly deliveryToken?: number;
  // iteration 10, Stage 1 (nativeCommitObservations, default off): native-
  // computed commit-time observations, present only for hosts that set the
  // `nativeCommitObservations` descriptor bit AND whose adopted controller
  // matches an observation native knows how to compute. Absent means "read
  // the live native state yourself" (the pre-Stage-1 behavior) -- consumers
  // must treat this as an optional fast path, never a required field.
  readonly observations?: UIKitFabricCommitObservations;
};

export type UIKitFabricCommitObservations = {
  readonly v: number;
  readonly selectedControllerHandle?: string;
  readonly viewControllerHandles?: readonly string[];
};

export type UIKitFabricMutation = {
  readonly type: string;
  readonly parentTag: number | null;
  readonly index: number;
  readonly newChildTag: number | null;
  readonly newChildComponentName: string;
  readonly oldChildTag: number | null;
  readonly oldChildComponentName: string;
};

export type UIKitFabricMountedChild = {
  readonly index: number;
  readonly ownerComponentView: unknown | null;
  readonly ownerComponentViewHandle: string;
  readonly ownerContainerView: unknown | null;
  readonly ownerContainerViewHandle: string;
  readonly ownerNativeView: unknown | null;
  readonly ownerNativeViewHandle: string;
  readonly ownerChildrenView: unknown | null;
  readonly ownerChildrenViewHandle: string;
  readonly ownerController: unknown | null;
  readonly ownerControllerHandle: string;
  readonly componentView: unknown | null;
  readonly componentViewHandle: string;
  readonly containerView: unknown | null;
  readonly containerViewHandle: string;
  readonly nativeView: unknown | null;
  readonly nativeViewHandle: string;
  readonly childrenView: unknown | null;
  readonly childrenViewHandle: string;
  readonly controller: unknown | null;
  readonly controllerHandle: string;
};

/**
 * Per-host context passed to every lifecycle callback. Runs on the UI runtime;
 * its helpers register native callbacks/observations that are auto-torn-down
 * when the host disposes.
 */
export type UIKitViewContext<Props extends object> = {
  /** Host debug name (the definition's `name`). */
  readonly name: string;
  /** RN reactTag of the host component, or `null` before it mounts. */
  readonly tag: number | null;
  /** Current props snapshot (RN + your own). */
  readonly props: Readonly<Props>;
  /** The Fabric component view + its native handle. */
  readonly fabricComponentView: unknown | null;
  readonly fabricComponentViewHandle: string;
  /** The Fabric container view + its native handle. */
  readonly fabricContainerView: unknown | null;
  readonly fabricContainerViewHandle: string;
  /** The active Fabric mount transaction (mutations + delivery token). */
  readonly fabricTransaction: UIKitFabricTransaction;
  /** Asynchronously invoke the matching React callback prop by name. */
  emit<K extends keyof Props>(
    eventName: K,
    payload?: Props[K] extends ((arg: infer Payload) => unknown) | undefined
      ? Payload
      : unknown,
  ): void;
  /** Add a retained control target/action, auto-removed on dispose. */
  targetAction(control: unknown, events: unknown, callback: () => void): void;
  /** Add a retained gesture-recognizer target/action, auto-removed on dispose. */
  gestureAction(gesture: unknown, callback: (gesture: unknown) => void): void;
  /** Create a standalone retained target/action pair (exposes its callback key). */
  actionTarget(callback: (sender: unknown) => void): {
    action: string;
    callbackKey: string;
    invoke(sender?: unknown): boolean;
    target: unknown;
  };
  /** Create, assign, and retain a protocol delegate on `object`. */
  delegate<T extends object>(
    object: unknown,
    protocolRef: unknown,
    implementation: Partial<T>,
  ): T;
  /** Observe an `NSNotification`, auto-removed on dispose. */
  notification(
    name: string,
    object: unknown | null,
    callback: (notification: unknown) => void,
  ): void;
  /** Add a KVO observation for `keyPath`, auto-removed on dispose. */
  observe(
    object: unknown,
    keyPath: string,
    callback: (value: unknown, change: unknown) => void,
  ): void;
  /** Keep a native helper alive for the component lifetime. */
  retain<T>(value: T): T;
  /** Release a retained helper before disposal. */
  release(value?: unknown): void;
  /** Register cleanup; runs once, in reverse registration order. */
  dispose(callback: () => void): void;
  /** Schedule a fresh native measurement pass. */
  invalidateLayout(): void;
  /** Resolve an RN image source to a native `UIImage`. */
  loadImage(
    source: unknown,
    options: NativeScriptImageLoadOptions,
    callback: NativeScriptImageLoadCallback,
  ): boolean;
};

type UIKitCreateArgument<Props extends object> = UIKitViewContext<Props> &
  Readonly<Props>;

export type NativeScriptImageLoadOptions = {
  template?: boolean;
};

export type NativeScriptImageLoadCallback = (
  image: unknown | null,
  error: Error | null,
) => void;

export type UIKitDisposeResult = void | {
  removeHostView?: boolean;
};

/**
 * A native host definition: what to build, how to keep it in sync, and how to
 * tear it down. Every callback runs on the UI runtime (no `runOnUI()` wrapping
 * needed inside them).
 */
export type UIKitViewDefinition<Props extends object, NativeView = unknown> = {
  /** Registered host name; also the native view's debug name. */
  name?: string;
  /** Debug name override (falls back to `name`). */
  debugName?: string;
  /** React `displayName` for the generated component. */
  displayName?: string;
  /** Native sizing/measurement strategy — see {@link UIKitLayoutOptions}. */
  layout?: UIKitLayoutOptions;
  /** Opt into native mount-info round-trips for Fabric-style hosting. */
  requiresNativeMountInfo?: boolean;
  /** Build the native view. `ctx` is spread onto the argument, so `create(props)` still works. */
  create: (ctx: UIKitCreateArgument<Props & ViewProps>) => NativeView;
  /** Apply prop changes to the native view. */
  update?: (
    view: NativeView,
    props: Readonly<Props & ViewProps>,
    previousProps?: Readonly<Props & ViewProps>,
    ctx?: UIKitViewContext<Props & ViewProps>,
  ) => void;
  /** Opt-in re-sync when UIKit moved the host without a React prop change. */
  refresh?: (
    view: NativeView,
    props: Readonly<Props & ViewProps>,
    previousProps?: Readonly<Props & ViewProps>,
    ctx?: UIKitViewContext<Props & ViewProps>,
  ) => void;
  /** Run after a Fabric transaction commits into the host. */
  transactionCommitted?: (
    view: NativeView,
    props: Readonly<Props & ViewProps>,
    previousProps?: Readonly<Props & ViewProps>,
    ctx?: UIKitViewContext<Props & ViewProps>,
  ) => void;
  /** Fabric mounting-transaction boundaries (requires `fabricLifecycleCallbacks`). */
  mountingTransactionWillMount?: (
    view: NativeView,
    props: Readonly<Props & ViewProps>,
    previousProps?: Readonly<Props & ViewProps>,
    ctx?: UIKitViewContext<Props & ViewProps>,
  ) => void;
  mountingTransactionDidMount?: (
    view: NativeView,
    props: Readonly<Props & ViewProps>,
    previousProps?: Readonly<Props & ViewProps>,
    ctx?: UIKitViewContext<Props & ViewProps>,
  ) => void;
  /** Called as individual Fabric children mount/unmount into the host. */
  mountChild?: (
    view: NativeView,
    child: UIKitFabricMountedChild,
    props: Readonly<Props & ViewProps>,
    previousProps?: Readonly<Props & ViewProps>,
    ctx?: UIKitViewContext<Props & ViewProps>,
  ) => void;
  unmountChild?: (
    view: NativeView,
    child: UIKitFabricMountedChild,
    props: Readonly<Props & ViewProps>,
    previousProps?: Readonly<Props & ViewProps>,
    ctx?: UIKitViewContext<Props & ViewProps>,
  ) => void;
  /** Fires once the native host is attached and ready (window/attachment gated). */
  hostReady?: (
    view: NativeView,
    props: Readonly<Props & ViewProps>,
    event: UIKitHostReadyEvent,
    previousProps?: Readonly<Props & ViewProps>,
    ctx?: UIKitViewContext<Props & ViewProps>,
  ) => void;
  /** Runs once after the first successful mount. */
  mounted?: (
    view: NativeView,
    props: Readonly<Props & ViewProps>,
    ctx?: UIKitViewContext<Props & ViewProps>,
  ) => void;
  /** Teardown. Return `{ removeHostView: true }` to also drop the RN host view. */
  dispose?: (
    view: NativeView,
    props: Readonly<Props & ViewProps>,
    ctx?: UIKitViewContext<Props & ViewProps>,
  ) => UIKitDisposeResult;
  /** Static or derived RN props to also apply to the host view (e.g. layout style). */
  nativeProps?:
    | Partial<ViewProps>
    | ((props: Readonly<Props & ViewProps>) => Partial<ViewProps> | undefined);
};

/** Imperative handle returned via `ref` to a native host component. */
export type UIKitViewRef<NativeView = unknown> = {
  /** The native view, or `null` before mount / after dispose. */
  readonly nativeView: NativeView | null;
  /** Run a `"worklet"` against the native view on the UI runtime. */
  runOnUI: <T>(callback: (view: NativeView) => T) => Promise<T>;
  /** Measure the native view (resolves its current size). */
  measureNative: () => Promise<{ width: number; height: number }>;
  /** Schedule a fresh native measurement pass. */
  invalidateNativeLayout: () => void;
};

/**
 * Hosting-strategy flags carried on the shared host component in addition to the
 * standard RN {@link ViewProps}. Most apps need none of these; adapters set them
 * to pick a UIKit containment model. Each is one-lined in the package README.
 */
export type UIKitHostViewProps = ViewProps & {
  /**
   * Upstream react-native-screens hosting shape: the Fabric-managed host
   * view becomes the controller's view (controller.view = host container),
   * so UIKit containment moves mounted React children wholesale. Mutually
   * exclusive with attachNativeView/attachControllerView-style containment.
   */
  adoptHostViewAsControllerView?: boolean;
  /** Add the hosted controller as a child view controller. */
  attachController?: boolean;
  /** Attach the hosted controller to the nearest parent controller. */
  attachControllerToParent?: boolean;
  /** Insert the controller's view into the host. */
  attachControllerView?: boolean;
  /** Insert the native view into the host. */
  attachNativeView?: boolean;
  /** Expose mounted Fabric children for collection instead of mounting them. */
  collectChildren?: boolean;
  /** Remove the hosted controller from its parent controller. */
  detachControllerFromParent?: boolean;
  /** Skip the generic window-attach refresh when native containment owns the hot path. */
  disableUIKitHostWindowAttachRefresh?: boolean;
  /** Emit `hostReady` even while the host is off-window. */
  emitOffWindowHostReady?: boolean;
  /** Do not gate `hostReady` on window attachment. */
  ignoreHostReadyWindowAttachment?: boolean;
  /** Enable the Fabric mounting-transaction lifecycle hooks. */
  fabricLifecycleCallbacks?: boolean;
  /** Commit Fabric transactions to the host immediately. */
  immediateTransactionCommit?: boolean;
  /** Defer transaction commits when the mutation only removes children. */
  deferTransactionCommitOnRemovals?: boolean;
  /**
   * iteration 10, Stage 1 (default off): ask native to compute
   * `observations` (adopted-controller state, e.g. the tab controller's
   * selected/ordered view-controller handles) into the committed
   * transaction payload, so JS commit-skip checks can compare handle
   * strings instead of issuing FFI reads against the live controller.
   * Fail-open: absent unless set AND the adopted controller matches the
   * observation native knows how to compute (currently UITabBarController).
   */
  nativeCommitObservations?: boolean;
  /** Mount RN children straight into the children view. */
  mountChildrenDirectlyToChildrenView?: boolean;
  /** Lay out direct children to the children view's bounds. */
  layoutDirectChildrenToChildrenViewBounds?: boolean;
  /** Pin the native view to the host bounds. */
  pinNativeViewToHost?: boolean;
  /** Opt out of the detached-children touch handler (an upstream surface owns touches). */
  disableDetachedChildrenTouchHandler?: boolean;
  /** This host's children are owned by an external detached-children owner. */
  externalDetachedChildrenOwner?: boolean;
  /** Preserve Fabric child layout instead of re-laying it out on refresh. */
  preserveDetachedChildrenLayout?: boolean;
  /** X/Y offset applied to detached hosted content. */
  detachedChildrenContentOffsetX?: number;
  detachedChildrenContentOffsetY?: number;
  /** React callback for the `hostReady` lifecycle event. */
  onHostReady?: (event: UIKitHostReadyEvent) => void;
};

export type UIKitViewComponent<
  Props extends object,
  NativeView = unknown,
> = ForwardRefExoticComponent<
  PropsWithoutRef<Props & UIKitHostViewProps> &
    RefAttributes<UIKitViewRef<NativeView>>
>;

export type UIKitContainerResult<RootView = unknown, ChildrenView = unknown> = {
  rootView: RootView;
  childrenView: ChildrenView;
};

export type UIKitContainerDefinition<
  Props extends object,
  RootView = unknown,
  ChildrenView = unknown,
> = Omit<
  UIKitViewDefinition<Props, UIKitContainerResult<RootView, ChildrenView>>,
  "create" | "update" | "refresh" | "mounted" | "dispose"
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
  refresh?: (
    view: UIKitContainerResult<RootView, ChildrenView>,
    props: Readonly<Props & ViewProps>,
    previousProps?: Readonly<Props & ViewProps>,
    ctx?: UIKitViewContext<Props & ViewProps>,
  ) => void;
  transactionCommitted?: (
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
  ) => UIKitDisposeResult;
};

export type UIViewControllerDefinition<
  Props extends object,
  Controller = unknown,
> = Omit<UIKitViewDefinition<Props, Controller>, "create"> & {
  createController: (ctx: UIKitCreateArgument<Props & ViewProps>) => Controller;
  hostView?: (controller: Controller) => unknown;
  childrenView?: (controller: Controller) => unknown;
};

const nativeApiGlobalName = "__nativeScriptNativeApi";
const nativeApiGlobalCacheName = "__nativeScriptNativeApiGlobalCache";
const nativeApiClassWrapperCacheName = "__nativeScriptNativeApiClassWrappers";
const nativeApiTypeCodeKey = "__nativeApiTypeCode";
const nativeApiCallbackThreadKey = "__nativeScriptCallbackThread";
const nativeApiMethodPolicyKey = "__nativeScriptMethodPolicy";
const nativeApiWrappedCallbackKey = "__nativeScriptWrappedCallback";
export type NativeScriptCallbackThread = "js" | "runtime";
type AnyFunction = (...args: any[]) => any;
// Deliberately small: the only live consumers are calling the ObjC super
// implementation before the JS override runs (callSuperBeforeCallback), and
// suppressing a re-entrant callback while the receiver's associated-object
// state says one is already in flight (skipCallbackIfAssociatedObjectTruthy).
export type NativeScriptMethodCallbackPolicy = {
  callSuper?: "before";
  callSuperBeforeCallback?: boolean;
  skipCallbackIfAssociatedObjectTruthy?: string | string[];
};
export type NativeScriptInvokedCallback<T extends AnyFunction> = T & {
  readonly __nativeScriptCallbackThread?: NativeScriptCallbackThread;
  readonly __nativeScriptWrappedCallback?: T;
};
export type NativeScriptMethodPolicyCallback<T extends AnyFunction> = T & {
  readonly __nativeScriptMethodPolicy?: NativeScriptMethodCallbackPolicy;
};

const nativeCallbackMetadataSkipKeys = new Set<PropertyKey>([
  "length",
  "name",
  "prototype",
  "arguments",
  "caller",
]);

function jsString(value: unknown): string {
  try {
    return `${value}`;
  } catch {
    return "<unstringifiable>";
  }
}

function jsError(message: string): Error {
  try {
    console.error(`[NativeScript] ${message}`);
  } catch {
    // Ignore broken console implementations while preserving the thrown value.
  }
  return {
    name: "Error",
    message,
    stack: message,
  } as Error;
}

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
  thread?: NativeScriptCallbackThread | "caller";
  retainer?: NativeRetainer;
  owner?: NativeDelegateOwner;
  assignTo?: {
    object: unknown;
    property?: string;
  };
};

export type NativeProtocolReference = string | object | Function;

export type NativeAssociationPolicy =
  | "assign"
  | "retain"
  | "retainNonatomic"
  | "strong"
  | "strongNonatomic"
  | "copy"
  | "copyNonatomic"
  | number;

function nativeApiHost(): NativeApiHost | undefined {
  "worklet";

  return (globalThis as Record<string, unknown>)[nativeApiGlobalName] as
    NativeApiHost | undefined;
}

function requireNativeApiHost(): NativeApiHost {
  "worklet";

  const api = nativeApiHost();
  if (!api) {
    throw new Error(
      "NativeScript Native API JSI host object was not installed",
    );
  }
  return api;
}

function nativeApiValue(name: string): unknown {
  "worklet";

  if (!name) {
    return undefined;
  }
  const api = nativeApiHost() as Record<string, unknown> | undefined;
  return api?.[name];
}

function nativeApiClass(name: string): any | null {
  "worklet";

  if (!name) {
    return null;
  }
  const api = nativeApiHost();
  if (!api) {
    return null;
  }
  const nativeClass = api.getClass?.(name) ?? api[name];
  return nativeClass == null ? null : nativeClass;
}

function nativeApiEnum(name: string): unknown {
  "worklet";

  if (!name) {
    return undefined;
  }
  const api = nativeApiHost();
  if (!api) {
    return undefined;
  }
  return api.getEnum?.(name) ?? api[name];
}

function nativeApiClassWrapperCache(): {
  get(key: object): unknown;
  set(key: object, value: unknown): unknown;
} {
  "worklet";

  const globalObject = globalThis as Record<string, unknown>;
  const existing = globalObject[nativeApiClassWrapperCacheName] as
    | {
        get?: (key: object) => unknown;
        set?: (key: object, value: unknown) => unknown;
      }
    | undefined;
  if (
    existing &&
    typeof existing.get === "function" &&
    typeof existing.set === "function"
  ) {
    return existing as {
      get(key: object): unknown;
      set(key: object, value: unknown): unknown;
    };
  }

  let cache: {
    get(key: object): unknown;
    set(key: object, value: unknown): unknown;
  };
  try {
    cache = new WeakMap<object, unknown>();
  } catch {
    cache = new Map<object, unknown>();
  }
  Object.defineProperty(globalThis, nativeApiClassWrapperCacheName, {
    configurable: false,
    enumerable: false,
    writable: false,
    value: cache,
  });
  return cache;
}

function nativeApiGlobalCache(): Record<string, unknown> {
  const globalObject = globalThis as Record<string, unknown>;
  const existing = globalObject[nativeApiGlobalCacheName];
  if (existing && typeof existing === "object") {
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

const defaultNativeRetainerGlobalName = "__nativeScriptDefaultNativeRetainer";

function createNativeRetainer(): NativeRetainer {
  "worklet";

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

function defaultNativeRetainerForRuntime(): NativeRetainer {
  "worklet";

  const globalObject = globalThis as Record<string, any>;
  const existing = globalObject[defaultNativeRetainerGlobalName];
  if (
    existing &&
    typeof existing.retain === "function" &&
    typeof existing.release === "function" &&
    typeof existing.dispose === "function"
  ) {
    return existing as NativeRetainer;
  }

  const retainer = createNativeRetainer();
  try {
    Object.defineProperty(globalObject, defaultNativeRetainerGlobalName, {
      configurable: false,
      enumerable: false,
      writable: false,
      value: retainer,
    });
  } catch {
    globalObject[defaultNativeRetainerGlobalName] = retainer;
  }
  return retainer;
}

const hostViewPropNames = new Set([
  "accessible",
  "accessibilityActions",
  "accessibilityElementsHidden",
  "accessibilityHint",
  "accessibilityIgnoresInvertColors",
  "accessibilityLabel",
  "accessibilityLanguage",
  "accessibilityLiveRegion",
  "accessibilityRole",
  "accessibilityState",
  "accessibilityValue",
  "accessibilityViewIsModal",
  "children",
  "collectChildren",
  "collapsable",
  "focusable",
  "hitSlop",
  "id",
  "importantForAccessibility",
  "immediateTransactionCommit",
  "deferTransactionCommitOnRemovals",
  "nativeCommitObservations",
  "mountChildrenDirectlyToChildrenView",
  "layoutDirectChildrenToChildrenViewBounds",
  "emitOffWindowHostReady",
  "fabricLifecycleCallbacks",
  "ignoreHostReadyWindowAttachment",
  "nativeID",
  "needsOffscreenAlphaCompositing",
  "onAccessibilityAction",
  "onAccessibilityEscape",
  "onAccessibilityTap",
  "onHostReady",
  "onLayout",
  "onMagicTap",
  "onMoveShouldSetResponder",
  "onMoveShouldSetResponderCapture",
  "onResponderEnd",
  "onResponderGrant",
  "onResponderMove",
  "onResponderReject",
  "onResponderRelease",
  "onResponderStart",
  "onResponderTerminate",
  "onResponderTerminationRequest",
  "onStartShouldSetResponder",
  "onStartShouldSetResponderCapture",
  "pointerEvents",
  "disableDetachedChildrenTouchHandler",
  "disableUIKitHostWindowAttachRefresh",
  "externalDetachedChildrenOwner",
  "preserveDetachedChildrenLayout",
  "detachedChildrenContentOffsetX",
  "detachedChildrenContentOffsetY",
  "removeClippedSubviews",
  "renderToHardwareTextureAndroid",
  "shouldRasterizeIOS",
  "style",
  "testID",
]);

function splitUIKitViewProps<Props extends object>(
  props: (Props & UIKitHostViewProps) | undefined,
  definition: UIKitViewDefinition<Props>,
): {
  nativeProps: ViewProps;
  pluginProps: Props & UIKitHostViewProps;
} {
  const normalizedProps = (props ?? {}) as Props & UIKitHostViewProps;
  const nativeProps: Record<string, unknown> = {};
  const pluginProps: Record<string, unknown> = {};
  const debugName =
    definition.debugName ||
    definition.name ||
    definition.displayName ||
    "UIKit";
  let propEntries: [string, unknown][];

  try {
    propEntries = Object.entries(normalizedProps);
  } catch (reason) {
    throw jsError(
      `${debugName} failed to split props: Object.entries is ${typeof Object.entries}; ${jsString(reason)}`,
    );
  }

  try {
    for (const [key, value] of propEntries) {
      if (
        hostViewPropNames.has(key) ||
        key.startsWith("accessibility") ||
        key.startsWith("aria-")
      ) {
        nativeProps[key] = value;
      } else {
        pluginProps[key] = value;
      }
    }
  } catch (reason) {
    throw jsError(
      `${debugName} failed to classify props: Set.has is ${typeof hostViewPropNames.has}; String.startsWith is ${typeof "".startsWith}; ${jsString(reason)}`,
    );
  }

  let nativePropsMapper: UIKitViewDefinition<Props>["nativeProps"];
  try {
    nativePropsMapper = Object.prototype.hasOwnProperty.call(
      definition,
      "nativeProps",
    )
      ? definition.nativeProps
      : undefined;
  } catch (reason) {
    throw jsError(
      `${debugName} failed to read nativeProps mapper: hasOwnProperty.call is ${typeof Object.prototype.hasOwnProperty.call}; ${jsString(reason)}`,
    );
  }
  let mappedNativeProps: Partial<ViewProps> | undefined;
  if (typeof nativePropsMapper === "function") {
    try {
      mappedNativeProps = nativePropsMapper(normalizedProps);
    } catch (reason) {
      throw jsError(
        `${debugName} nativeProps mapper failed: ${jsString(reason)}`,
      );
    }
  } else if (nativePropsMapper != null) {
    mappedNativeProps = nativePropsMapper;
  }

  if (mappedNativeProps != null) {
    try {
      Object.assign(nativeProps, mappedNativeProps);
    } catch (reason) {
      throw jsError(
        `${debugName} failed to merge nativeProps: Object.assign is ${typeof Object.assign}; ${jsString(reason)}`,
      );
    }
  }

  return {
    nativeProps: nativeProps as ViewProps,
    pluginProps: pluginProps as Props & UIKitHostViewProps,
  };
}

const uikitHostPropsPayloadKey = "__nativeScriptUIKitHostProps";
const uikitHostPropsRevisionKey = "__nativeScriptUIKitHostPropsRevision";
const uikitHostFunctionPropMarkerKey = "__nativeScriptUIKitFunctionProp";

function isSerializableUIKitHostObject(value: unknown): value is object {
  if (value == null || typeof value !== "object") {
    return false;
  }

  if (Array.isArray(value)) {
    return true;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype == null;
}

function copyUIKitHostPropsForUI(value: unknown, key = ""): unknown {
  if (key === "children" || key === "ref" || typeof value === "symbol") {
    return undefined;
  }

  if (
    typeof value === "function" ||
    value == null ||
    typeof value !== "object"
  ) {
    return value;
  }

  if (!isSerializableUIKitHostObject(value)) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value.map((item) => copyUIKitHostPropsForUI(item));
  }

  const copy: Record<string, unknown> = {};
  for (const [childKey, childValue] of Object.entries(value)) {
    const copiedValue = copyUIKitHostPropsForUI(childValue, childKey);
    if (copiedValue !== undefined) {
      copy[childKey] = copiedValue;
    }
  }
  return copy;
}

function stringifySerializableUIKitHostProps(props: Readonly<object>): string {
  const seen = new WeakSet<object>();

  try {
    return (
      JSON.stringify(props, (key, value) => {
        if (key === "children" || key === "ref" || typeof value === "symbol") {
          return undefined;
        }
        if (typeof value === "function") {
          return { [uikitHostFunctionPropMarkerKey]: true };
        }

        if (value && typeof value === "object") {
          if (!isSerializableUIKitHostObject(value)) {
            return undefined;
          }
          if (seen.has(value)) {
            return undefined;
          }
          seen.add(value);
        }

        return value;
      }) ?? "{}"
    );
  } catch {
    return "{}";
  }
}

function stringifyUIKitHostPropsPayload(
  serializedPropsJson: string,
  revision: number,
): string {
  const normalizedPropsJson =
    typeof serializedPropsJson === "string" && serializedPropsJson.length > 0
      ? serializedPropsJson
      : "{}";

  return `{"${uikitHostPropsRevisionKey}":${revision},"${uikitHostPropsPayloadKey}":${normalizedPropsJson}}`;
}

function hasNonSerializableUIKitHostProps(value: unknown): boolean {
  const seen = new WeakSet<object>();

  const visit = (key: string, nextValue: unknown): boolean => {
    if (key === "children" || key === "ref") {
      return false;
    }

    if (typeof nextValue === "function" || typeof nextValue === "symbol") {
      return true;
    }

    if (nextValue == null || typeof nextValue !== "object") {
      return false;
    }

    if (!isSerializableUIKitHostObject(nextValue)) {
      return true;
    }

    if (seen.has(nextValue)) {
      return false;
    }
    seen.add(nextValue);

    if (Array.isArray(nextValue)) {
      return nextValue.some((item) => visit("", item));
    }

    return Object.entries(nextValue).some(([childKey, childValue]) =>
      visit(childKey, childValue),
    );
  };

  return visit("", value);
}

function nonSerializableUIKitHostPropsChanged(
  previous: unknown,
  next: unknown,
): boolean {
  const seen = new WeakMap<object, WeakSet<object>>();

  const visit = (
    key: string,
    leftValue: unknown,
    rightValue: unknown,
  ): boolean => {
    if (key === "children" || key === "ref") {
      return false;
    }

    const leftIsLive =
      typeof leftValue === "function" || typeof leftValue === "symbol";
    const rightIsLive =
      typeof rightValue === "function" || typeof rightValue === "symbol";

    if (leftIsLive || rightIsLive) {
      return leftValue !== rightValue;
    }

    if (
      leftValue == null ||
      rightValue == null ||
      typeof leftValue !== "object" ||
      typeof rightValue !== "object"
    ) {
      return false;
    }

    if (
      !isSerializableUIKitHostObject(leftValue) ||
      !isSerializableUIKitHostObject(rightValue)
    ) {
      return leftValue !== rightValue;
    }

    const previousSeen = seen.get(leftValue);
    if (previousSeen?.has(rightValue)) {
      return false;
    }

    if (previousSeen) {
      previousSeen.add(rightValue);
    } else {
      const nextSeen = new WeakSet<object>();
      nextSeen.add(rightValue);
      seen.set(leftValue, nextSeen);
    }

    const keys = new Set([
      ...Object.keys(leftValue as Record<string, unknown>),
      ...Object.keys(rightValue as Record<string, unknown>),
    ]);

    for (const childKey of keys) {
      if (
        visit(
          childKey,
          (leftValue as Record<string, unknown>)[childKey],
          (rightValue as Record<string, unknown>)[childKey],
        )
      ) {
        return true;
      }
    }

    return false;
  };

  return visit("", previous, next);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  "worklet";

  if (value == null || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype == null;
}

function isUIKitHostFunctionPropMarker(value: unknown): boolean {
  "worklet";

  return (
    isPlainObject(value) &&
    value[uikitHostFunctionPropMarkerKey] === true &&
    Object.keys(value).length === 1
  );
}

function mergeUIKitHostPropsFromNative(
  current: unknown,
  nativeValue: unknown,
): unknown {
  "worklet";

  if (isUIKitHostFunctionPropMarker(nativeValue)) {
    return typeof current === "function" ? current : undefined;
  }

  if (Array.isArray(nativeValue)) {
    const currentArray = Array.isArray(current) ? current : [];
    return nativeValue.map((item, index) =>
      mergeUIKitHostPropsFromNative(currentArray[index], item),
    );
  }

  if (isPlainObject(nativeValue)) {
    const currentObject = isPlainObject(current) ? current : undefined;
    const merged: Record<string, unknown> = {};

    for (const [key, childNativeValue] of Object.entries(nativeValue)) {
      const childValue = mergeUIKitHostPropsFromNative(
        currentObject?.[key],
        childNativeValue,
      );
      if (
        childValue !== undefined ||
        !isUIKitHostFunctionPropMarker(childNativeValue)
      ) {
        merged[key] = childValue;
      }
    }

    return merged;
  }

  return nativeValue;
}

function nativeHandleForUIKitView(view: unknown): string {
  "worklet";

  const interop = (globalThis as Record<string, any>).interop;
  if (!interop || typeof interop.handleof !== "function") {
    throw new Error("NativeScript interop globals are not installed");
  }

  const pointer = interop.handleof(view);
  if (!pointer) {
    throw new Error(
      "UIKit view definition returned a value without a native handle",
    );
  }

  if (typeof pointer.toHexString === "function") {
    const text = pointer.toHexString();
    if (typeof text === "string" && text.length > 0) {
      return text;
    }
  }

  if (typeof pointer.address === "string" && pointer.address.length > 0) {
    return pointer.address;
  }

  if (typeof pointer.address === "number") {
    return String(pointer.address);
  }

  if (typeof pointer.toNumber === "function") {
    return String(pointer.toNumber());
  }

  throw new Error("UIKit view native handle could not be read");
}

function tryNativeHandleForUIKitView(view: unknown): string | undefined {
  "worklet";

  if (view == null) {
    return undefined;
  }

  try {
    return nativeHandleForUIKitView(view);
  } catch {
    return undefined;
  }
}

function nativeHandleOrUndefined(value: unknown): string | undefined {
  "worklet";

  return value == null ? undefined : nativeHandleForUIKitView(value);
}

function nativeHandleForNSObject(value: unknown): string | undefined {
  "worklet";

  if (value == null) {
    return undefined;
  }
  const interop = (globalThis as Record<string, any>).interop;
  const pointer = interop?.handleof?.(value);
  if (!pointer) {
    return undefined;
  }
  if (typeof pointer.toHexString === "function") {
    return pointer.toHexString();
  }
  if (typeof pointer.address === "string") {
    return pointer.address;
  }
  if (typeof pointer.address === "number") {
    return String(pointer.address);
  }
  if (typeof pointer.toNumber === "function") {
    return String(pointer.toNumber());
  }
  return undefined;
}

function tryNativeHandleForNSObject(value: unknown): string | undefined {
  "worklet";

  try {
    return nativeHandleForNSObject(value);
  } catch {
    return undefined;
  }
}

/**
 * Stable string handle for a native object, safe to carry across worklet
 * boundaries. Returns `undefined` for non-native values.
 */
export function nativeHandleForObject(value: unknown): string | undefined {
  "worklet";

  return nativeHandleForNSObject(value);
}

export type ObjCSelectorArgument =
  | boolean
  | number
  | string
  | null
  | undefined
  | readonly ObjCSelectorArgument[]
  | object;

type EncodedObjCSelectorArgument =
  boolean | number | string | null | undefined | EncodedObjCSelectorArgument[];

function encodeObjCSelectorArgument(
  arg: ObjCSelectorArgument,
): { ok: true; value: EncodedObjCSelectorArgument } | { ok: false } {
  "worklet";

  if (arg == null || typeof arg === "boolean" || typeof arg === "number") {
    return { ok: true, value: arg };
  }

  if (typeof arg === "string") {
    return { ok: true, value: arg };
  }

  if (Array.isArray(arg)) {
    const encodedItems: EncodedObjCSelectorArgument[] = [];
    for (const item of arg) {
      const encodedItem = encodeObjCSelectorArgument(item);
      if (!encodedItem.ok) {
        return { ok: false };
      }
      encodedItems.push(encodedItem.value);
    }
    return { ok: true, value: encodedItems };
  }

  const handle = tryNativeHandleForNSObject(arg);
  if (typeof handle !== "string" || handle.length === 0) {
    return { ok: false };
  }
  return { ok: true, value: handle };
}

function objectFromNativePointerValue<T>(
  interop: Record<string, any>,
  pointerValue: string | number,
): T | null {
  "worklet";

  try {
    return (interop.object(interop.Pointer(pointerValue)) ?? null) as T | null;
  } catch {
    return null;
  }
}
function isFiniteNumber(value: unknown): value is number {
  "worklet";

  return (
    typeof value === "number" &&
    value === value &&
    value !== Infinity &&
    value !== -Infinity
  );
}
function nativePointerAddressFromHandle(
  handle: string | number | null | undefined,
): number | null {
  "worklet";

  if (typeof handle === "number") {
    return isFiniteNumber(handle) && handle > 0 ? handle : null;
  }

  if (typeof handle !== "string") {
    return null;
  }

  const trimmed = handle.trim();
  if (trimmed.length === 0) {
    return null;
  }

  const address = Number(trimmed);
  if (!isFiniteNumber(address) || address <= 0) {
    return null;
  }

  return address;
}
function resolveNativeObjectFromHandle<T = unknown>(
  handle: string | number | null | undefined,
): T | null {
  "worklet";

  if (handle == null || handle === "") {
    return null;
  }

  const interop = (globalThis as Record<string, any>).interop;
  if (
    !interop ||
    typeof interop.object !== "function" ||
    typeof interop.Pointer !== "function"
  ) {
    return null;
  }

  if (typeof handle === "string") {
    const trimmed = handle.trim();
    if (trimmed.length === 0) {
      return null;
    }

    const objectFromStringPointer = objectFromNativePointerValue<T>(
      interop,
      trimmed,
    );
    if (objectFromStringPointer != null) {
      return objectFromStringPointer;
    }
  }

  const address = nativePointerAddressFromHandle(handle);
  if (address == null) {
    return null;
  }

  return objectFromNativePointerValue<T>(interop, address);
}
/**
 * Resolve a handle from {@link nativeHandleForObject} back to its native object
 * on the UI runtime. String handles round-trip exactly; numeric coercion is a
 * lossy fallback. Returns `null` when unresolvable.
 */
export function nativeObjectFromHandle<T = unknown>(
  handle: string | number | null | undefined,
): T | null {
  "worklet";

  return resolveNativeObjectFromHandle<T>(handle);
}
/**
 * Send an arbitrary Objective-C selector to a native target and re-wrap a native
 * object result. Accepts encoded selector arguments, including nested arrays.
 */
export function invokeObjCSelector<ReturnValue = unknown>(
  target: unknown,
  selectorName: string,
  args: readonly ObjCSelectorArgument[] = [],
): ReturnValue | boolean | null {
  "worklet";

  const invoke = (globalThis as Record<string, any>)
    .__nativeScriptInvokeObjCSelector;
  if (typeof invoke !== "function") {
    return false;
  }

  const targetHandle = tryNativeHandleForNSObject(target);
  if (typeof targetHandle !== "string" || targetHandle.length === 0) {
    return false;
  }

  const selectorArgs: EncodedObjCSelectorArgument[] = [];
  for (const arg of args) {
    const encodedArg = encodeObjCSelectorArgument(arg);
    if (!encodedArg.ok) {
      return false;
    }
    selectorArgs.push(encodedArg.value);
  }

  const result = invoke(targetHandle, selectorName, selectorArgs);
  if (typeof result === "string") {
    const object = nativeObjectFromHandle<ReturnValue>(result);
    return object ?? (result as ReturnValue);
  }

  return result as ReturnValue | boolean | null;
}

function truncateNumber(value: number): number {
  "worklet";

  return value < 0 ? Math.ceil(value) : Math.floor(value);
}

/**
 * Length of a bridged `NSArray`/`NSOrderedSet` without assuming a JS array shape
 * (falls back through `count` / `objectAtIndex:`-style access).
 */
export function nativeArrayLength(value: unknown): number {
  "worklet";

  if (value == null) {
    return 0;
  }

  const arrayLike = value as Record<string, any>;
  const count = arrayLike.count;
  if (isFiniteNumber(count)) {
    return Math.max(0, count);
  }
  if (typeof count === "function") {
    try {
      const resolvedCount = count.call(value);
      if (isFiniteNumber(resolvedCount)) {
        return Math.max(0, resolvedCount);
      }
    } catch {
      // Fall through to JS-array length for non-NSArray objects.
    }
  }

  const length = arrayLike.length;
  if (isFiniteNumber(length)) {
    return Math.max(0, length);
  }

  const selectorCount = invokeObjCSelector<number>(value, "count");
  if (isFiniteNumber(selectorCount)) {
    return Math.max(0, selectorCount);
  }

  return 0;
}

/**
 * Element at `index` of a bridged native collection, mirroring
 * {@link nativeArrayLength}'s shape-agnostic access.
 */
export function nativeArrayItem<T = unknown>(
  value: unknown,
  index: number,
): T | null {
  "worklet";

  if (value == null || !isFiniteNumber(index)) {
    return null;
  }

  const normalizedIndex = truncateNumber(index);
  const count = nativeArrayLength(value);
  if (normalizedIndex < 0 || normalizedIndex >= count) {
    return null;
  }

  const arrayLike = value as Record<string, any>;
  if (typeof arrayLike.objectAtIndex === "function") {
    return (arrayLike.objectAtIndex(normalizedIndex) ?? null) as T | null;
  }
  if (typeof arrayLike.objectAtIndexedSubscript === "function") {
    return (arrayLike.objectAtIndexedSubscript(normalizedIndex) ??
      null) as T | null;
  }

  const selectorItem = invokeObjCSelector<T>(value, "objectAtIndex:", [
    normalizedIndex,
  ]);
  if (selectorItem !== false && selectorItem !== undefined) {
    return (selectorItem ?? null) as T | null;
  }

  return (arrayLike[normalizedIndex] ?? null) as T | null;
}

/**
 * Snapshot a `UIView`'s subviews as a JS array. Call on the UI runtime; the
 * result is a copy, so later UIKit mutations are not reflected.
 */
export function nativeSubviews<T = unknown>(view: unknown): T[] {
  "worklet";

  const subviews = (view as Record<string, unknown> | null | undefined)
    ?.subviews;
  const count = nativeArrayLength(subviews);
  if (count === 0) {
    return [];
  }

  const result: T[] = [];
  for (let index = 0; index < count; index += 1) {
    const subview = nativeArrayItem<T>(subviews, index);
    if (subview != null) {
      result.push(subview);
    }
  }
  return result;
}

/**
 * Read the Fabric child views a `collectChildren` host exposed instead of
 * mounting them. Empty when the host is not in collect mode.
 */
export function collectedUIKitHostChildren<T = unknown>(view: unknown): T[] {
  "worklet";

  const getCollectedChildren = (globalThis as Record<string, any>)
    .__nativeScriptCollectedUIKitHostChildren;
  if (typeof getCollectedChildren !== "function") {
    return [];
  }

  const viewHandle = tryNativeHandleForUIKitView(view);
  if (typeof viewHandle !== "string" || viewHandle.length === 0) {
    return [];
  }

  const collectedChildrenHandle = getCollectedChildren(viewHandle);
  const collectedChildren =
    typeof collectedChildrenHandle === "string"
      ? nativeObjectFromHandle(collectedChildrenHandle)
      : collectedChildrenHandle;
  const count = nativeArrayLength(collectedChildren);
  if (count === 0) {
    return [];
  }

  const result: T[] = [];
  for (let index = 0; index < count; index += 1) {
    const child = nativeArrayItem<T>(collectedChildren, index);
    if (child != null) {
      result.push(child);
    }
  }
  return result;
}

/**
 * Native handles (component / container / native / children / controller) for a
 * hosted view, or `null` if the view is not a NativeScript host.
 */
export function uikitHostHandlesForView(
  view: unknown,
): UIKitHostNativeHandles | null {
  "worklet";

  const getHostHandles = (globalThis as Record<string, any>)
    .__nativeScriptUIKitHostHandlesForView;
  if (typeof getHostHandles !== "function") {
    return null;
  }

  const viewHandle = tryNativeHandleForUIKitView(view);
  if (typeof viewHandle !== "string" || viewHandle.length === 0) {
    return null;
  }

  const handles = getHostHandles(viewHandle);
  if (handles == null || typeof handles !== "object") {
    return null;
  }

  const componentViewHandle =
    typeof handles.componentViewHandle === "string" &&
    handles.componentViewHandle.length > 0
      ? handles.componentViewHandle
      : undefined;
  const containerViewHandle =
    typeof handles.containerViewHandle === "string" &&
    handles.containerViewHandle.length > 0
      ? handles.containerViewHandle
      : undefined;
  const nativeViewHandle =
    typeof handles.nativeViewHandle === "string" &&
    handles.nativeViewHandle.length > 0
      ? handles.nativeViewHandle
      : undefined;
  const childrenViewHandle =
    typeof handles.childrenViewHandle === "string" &&
    handles.childrenViewHandle.length > 0
      ? handles.childrenViewHandle
      : undefined;
  const controllerHandle =
    typeof handles.controllerHandle === "string" &&
    handles.controllerHandle.length > 0
      ? handles.controllerHandle
      : undefined;

  if (
    !componentViewHandle &&
    !containerViewHandle &&
    !nativeViewHandle &&
    !childrenViewHandle &&
    !controllerHandle
  ) {
    return null;
  }

  return {
    componentViewHandle,
    containerViewHandle,
    nativeViewHandle,
    childrenViewHandle,
    controllerHandle,
  };
}

function setAssociatedNativeObject(
  target: unknown,
  key: string,
  value: unknown,
  policy: NativeAssociationPolicy = "retainNonatomic",
): boolean {
  "worklet";

  if (target == null || !key) {
    return false;
  }

  const setAssociatedObject = (globalThis as Record<string, any>).interop
    ?.setAssociatedObject;
  if (typeof setAssociatedObject !== "function") {
    return false;
  }

  setAssociatedObject(target, key, value ?? null, policy);
  return true;
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
    if (descriptor && "value" in descriptor) {
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
  if (typeof nativeConstructor !== "function") {
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
        if (!value || typeof value !== "object") {
          return false;
        }
        const actual = value as Record<string, unknown>;
        return (
          actual.kind === (nativeConstructor as Record<string, unknown>).kind &&
          actual.name ===
            (nativeConstructor as Record<string, unknown>).runtimeName
        );
      },
    });
  } catch {
    // Older runtimes can expose Symbol.hasInstance as read-only.
  }

  for (const key of [
    "kind",
    "runtimeName",
    "metadataOffset",
    "sizeof",
    "fields",
    "equals",
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

function rememberNativeObjectClass<T>(value: T, classWrapper: unknown): T {
  "worklet";

  if (
    value == null ||
    (typeof value !== "object" && typeof value !== "function") ||
    (typeof classWrapper !== "object" && typeof classWrapper !== "function")
  ) {
    return value;
  }

  const rememberObjectClassWrapper = (nativeApiHost() as Record<string, any>)
    ?.__rememberObjectClassWrapper;
  if (typeof rememberObjectClassWrapper === "function") {
    try {
      rememberObjectClassWrapper(value, classWrapper);
    } catch {
      // The native object still works without the expando; remembering only
      // improves constructor/prototype fidelity for runtime-generated classes.
    }
  }

  return value;
}

function wrapNativeClass(nativeClass: unknown): unknown {
  "worklet";

  if (
    !nativeClass ||
    (typeof nativeClass !== "object" && typeof nativeClass !== "function")
  ) {
    return nativeClass;
  }

  const wrapperCache = nativeApiClassWrapperCache();
  const cached = wrapperCache.get(nativeClass as object);
  if (cached) {
    return cached;
  }

  const rememberInstanceClass = <T>(value: T): T =>
    rememberNativeObjectClass(value, wrapper || constructable);

  const constructable = function NativeScriptNativeClass(...args: unknown[]) {
    const cls = nativeClass as Record<string, any>;
    if (args.length > 0 && typeof cls.construct === "function") {
      return rememberInstanceClass(cls.construct(...args));
    }
    if (typeof cls.new === "function") {
      return rememberInstanceClass(cls.new());
    }
    if (typeof cls.alloc !== "function") {
      throw new Error("Native class cannot be allocated");
    }
    const instance = rememberInstanceClass(cls.alloc());
    if (instance && typeof instance.init === "function") {
      return rememberInstanceClass(instance.init());
    }
    return instance;
  };
  let wrapper: unknown = constructable;

  Object.defineProperty(constructable, "construct", {
    configurable: true,
    enumerable: false,
    writable: false,
    value(...args: unknown[]) {
      const cls = nativeClass as Record<string, any>;
      if (typeof cls.construct !== "function") {
        throw new Error("Native class cannot construct an explicit pointer");
      }
      return rememberInstanceClass(cls.construct(...args));
    },
  });

  Object.defineProperty(constructable, "alloc", {
    configurable: true,
    enumerable: false,
    writable: false,
    value(...args: unknown[]) {
      if (args.length !== 0) {
        throw new Error(
          "alloc does not take arguments; use invoke for an explicit Objective-C selector.",
        );
      }
      const cls = nativeClass as Record<string, any>;
      if (typeof cls.alloc !== "function") {
        throw new Error("Native class cannot be allocated");
      }
      return rememberInstanceClass(cls.alloc());
    },
  });

  Object.defineProperty(constructable, "new", {
    configurable: true,
    enumerable: false,
    writable: false,
    value(...args: unknown[]) {
      if (args.length !== 0) {
        throw new Error(
          "new does not take arguments; use invoke for an explicit Objective-C selector.",
        );
      }
      const cls = nativeClass as Record<string, any>;
      if (typeof cls.new === "function") {
        return rememberInstanceClass(cls.new());
      }
      return constructable();
    },
  });

  Object.defineProperty(constructable, "extend", {
    configurable: true,
    enumerable: false,
    writable: false,
    value(methods: object, options: object = {}) {
      const api = requireNativeApiHost() as Record<string, any>;
      const extendClass = api.__extendClass;
      if (typeof extendClass !== "function") {
        throw new Error(
          "NativeScript Native API class extension is unavailable",
        );
      }
      if (methods == null || typeof methods !== "object") {
        throw new Error("extend() first parameter must be an object");
      }

      const extendedNativeClass = extendClass(
        nativeClass,
        methods,
        options ?? {},
      );
      const extended = wrapNativeClass(extendedNativeClass);
      try {
        if (
          extended != null &&
          (typeof extended === "object" || typeof extended === "function") &&
          (typeof wrapper === "object" || typeof wrapper === "function")
        ) {
          Object.setPrototypeOf(extended, wrapper as object);
        }
      } catch {
        // Older engines may reject prototype mutation for host-backed functions.
      }

      const rememberClassWrapper = api.__rememberClassWrapper;
      if (typeof rememberClassWrapper === "function") {
        try {
          // Pass only the class value (arg 2), NOT the wrapper's bare/empty
          // prototype (arg 3): a 2-arg call makes the native side skip
          // rememberClassPrototype, so it no longer registers an empty
          // prototype as the subclass's canonical prototype and re-prototypes
          // instances onto it. That empty-prototype registration (from
          // 3fd29322) poisoned first-access inherited-selector resolution for
          // ClassBuilder subclasses. Keeping arg 2 preserves constructor /
          // instanceof fidelity via rememberClassValue.
          rememberClassWrapper(extendedNativeClass, extended);
        } catch {
          // The WeakMap cache above is enough for JS-side reuse.
        }
      }
      return extended;
    },
  });

  Object.defineProperty(constructable, "__nativeApiClass", {
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
        if (!value || typeof value !== "object") {
          return false;
        }

        const cls = nativeClass as Record<string, any>;
        try {
          if (
            typeof (value as Record<string, any>).isKindOfClass === "function"
          ) {
            return Boolean(
              (value as Record<string, any>).isKindOfClass(constructable),
            );
          }
        } catch {
          // Fall through to class-name equality for host objects that cannot
          // dispatch isKindOfClass from this thread.
        }

        const expectedName = cls.runtimeName ?? cls.name;
        const actualName = (value as Record<string, unknown>).className;
        return typeof expectedName === "string" && actualName === expectedName;
      },
    });
  } catch {
    // Older runtimes can expose Symbol.hasInstance as read-only.
  }

  wrapper = new Proxy(constructable, {
    get(target, property, receiver) {
      if (Object.prototype.hasOwnProperty.call(target, property)) {
        return Reflect.get(target, property, receiver);
      }
      if (cachedNativeFunctions.has(property)) {
        return cachedNativeFunctions.get(property);
      }
      const nativeValue = (nativeClass as Record<PropertyKey, unknown>)[
        property
      ];
      if (typeof nativeValue === "function") {
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
      if (nativeValue !== undefined) {
        return nativeValue;
      }
      return Reflect.get(target, property, receiver);
    },
    set(_target, property, value) {
      (nativeClass as Record<PropertyKey, unknown>)[property] = value;
      return true;
    },
    has(target, property) {
      return property in target || property in (nativeClass as object);
    },
  });

  wrapperCache.set(nativeClass as object, wrapper);
  return wrapper;
}

function wrapInteropFactory(
  nativeFactory: unknown,
  properties: Record<string, unknown>,
): unknown {
  if (typeof nativeFactory !== "function") {
    return nativeFactory;
  }

  if ((nativeFactory as Record<string, unknown>).__nativeScriptConstructable) {
    return nativeFactory;
  }

  const constructable = function NativeScriptInteropValue(...args: unknown[]) {
    return (nativeFactory as (...args: unknown[]) => unknown)(...args);
  };

  try {
    const nativePrototype = (nativeFactory as { prototype?: unknown })
      .prototype;
    if (
      nativePrototype &&
      (typeof nativePrototype === "object" ||
        typeof nativePrototype === "function")
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
          typeof value === "object" &&
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

  Object.defineProperty(constructable, "__nativeScriptConstructable", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: true,
  });

  return constructable;
}

function installInteropConstructors(): void {
  const interop = (globalThis as Record<string, unknown>).interop as
    Record<string, unknown> | undefined;
  if (!interop || typeof interop !== "object") {
    return;
  }

  const sizeof = interop.sizeof;
  const pointerType = (interop.types as Record<string, unknown> | undefined)
    ?.pointer;
  let pointerSize: unknown = undefined;
  if (typeof sizeof === "function" && pointerType !== undefined) {
    try {
      pointerSize = sizeof(pointerType);
    } catch {
      pointerSize = undefined;
    }
  }

  interop.Pointer = wrapInteropFactory(interop.Pointer, {
    kind: "pointer",
    sizeof: pointerSize,
  });
  interop.Reference = wrapInteropFactory(interop.Reference, {
    kind: "reference",
    sizeof: pointerSize,
  });
  interop.Block = wrapInteropFactory(interop.Block, {
    kind: "block",
    sizeof: pointerSize,
  });
  interop.FunctionReference = wrapInteropFactory(interop.FunctionReference, {
    kind: "functionReference",
    sizeof: pointerSize,
  });

  const types = interop.types as Record<string, unknown> | undefined;
  if (types && typeof types === "object") {
    for (const [name, value] of Object.entries(types)) {
      if (typeof value !== "number") {
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
  const makePoint = (x: number, y: number) => ({ x, y });
  const makeSize = (width: number, height: number) => ({ width, height });
  const makeRect = (x: number, y: number, width: number, height: number) => ({
    origin: { x, y },
    size: { width, height },
  });

  defineInlineFunction("CGPointMake", makePoint);
  defineInlineFunction("NSMakePoint", makePoint);
  defineInlineFunction("CGSizeMake", makeSize);
  defineInlineFunction("NSMakeSize", makeSize);
  defineInlineFunction("CGRectMake", makeRect);
  defineInlineFunction("NSMakeRect", makeRect);
  defineInlineFunction("NSMakeRange", (location: number, length: number) => ({
    location,
    length,
  }));
  defineInlineFunction(
    "UIEdgeInsetsMake",
    (top: number, left: number, bottom: number, right: number) => ({
      top,
      left,
      bottom,
      right,
    }),
  );
}

function installGlobals(): boolean {
  const api = nativeApiHost();
  if (!api) {
    return false;
  }

  const classNames = api.metadata?.classNames?.() ?? [];
  for (const name of classNames) {
    defineLazyNativeGlobal(name, (className) =>
      wrapNativeClass(api[className]),
    );
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
    const resolveEnum = (enumName: string) =>
      api.getEnum?.(enumName) ?? api[enumName];
    defineLazyNativeGlobal(name, resolveEnum);

    const enumValue = resolveEnum(name);
    if (!enumValue || typeof enumValue !== "object") {
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
        wrapAggregateConstructor(
          api.getStruct?.(structName) ?? api[structName],
        ),
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

/**
 * Bootstrap the runtime: attach the Native API host to `globalThis`, install the
 * lazy NativeScript-style globals, and install the Native API into the Worklets
 * UI runtime. Call once, early. Pass `{ globals: true }` only to also publish
 * Objective-C classes on the RN JS thread (off by default — reach UIKit via
 * worklets). Returns whether the runtime is installed.
 */
export function init(metadataPath = "", options: InstallOptions = {}): boolean {
  const installed =
    NativeScriptNativeApi.isInstalled() ||
    NativeScriptNativeApi.install(metadataPath);
  if (installed) {
    installInteropConstructors();
    installInlineFunctions();
  }
  if (installed && options.globals === true) {
    installGlobals();
  }
  if (installed) {
    ensureWorkletsInstalled(metadataPath);
  }
  return installed;
}

function isInstalled(): boolean {
  return NativeScriptNativeApi.isInstalled();
}

function defaultMetadataPath(): string {
  return NativeScriptNativeApi.defaultMetadataPath();
}

function getRuntimeBackend(): string {
  return NativeScriptNativeApi.getRuntimeBackend();
}

let workletsAdapter: NativeScriptWorklets | undefined;
const workletsPackageName = "react-native-worklets";

function formatWorkletsSetupCause(cause: unknown): string | undefined {
  if (cause instanceof Error) {
    return cause.message;
  }
  if (cause != null && typeof cause === "object") {
    const errorLike = cause as { message?: unknown };
    if (typeof errorLike.message === "string") {
      return errorLike.message;
    }
  }
  if (typeof cause === "string") {
    return cause;
  }
  return undefined;
}

function workletsSetupError(reason: string, cause?: unknown): Error {
  const causeMessage = formatWorkletsSetupCause(cause);
  const setupError = new Error(
    `${causeMessage ? `${reason}: ${causeMessage}` : reason}. Install ${workletsPackageName}, add ${workletsPackageName}/plugin to your Babel plugins, and run pod install so RNWorklets is linked.`,
  ) as Error & { cause?: unknown };
  if (cause !== undefined) {
    setupError.cause = cause;
  }
  return setupError;
}

function requireReactNativeWorklets(): NativeScriptWorklets {
  try {
    return require(workletsPackageName) as NativeScriptWorklets;
  } catch (error) {
    throw workletsSetupError(
      `NativeScript.runOnUI requires ${workletsPackageName}`,
      error,
    );
  }
}

function validateWorkletsModule(
  worklets: NativeScriptWorklets,
): NativeScriptWorklets {
  if (
    worklets == null ||
    typeof worklets.getUIRuntimeHolder !== "function" ||
    typeof worklets.isWorkletFunction !== "function" ||
    typeof worklets.runOnUIAsync !== "function" ||
    typeof worklets.runOnUISync !== "function"
  ) {
    throw workletsSetupError(
      "NativeScript.runOnUI received an incompatible Worklets module",
    );
  }
  return worklets;
}

function installIdleAwareWorkletsFrameLoop(): boolean {
  "worklet";

  const globalObject = globalThis as Record<string, any>;
  if (globalObject.__nativeScriptIdleAwareWorkletsFrameLoop === true) {
    return true;
  }

  const nativeRequestAnimationFrame =
    globalObject.__nativeRequestAnimationFrame;
  const callMicrotasks = globalObject.__callMicrotasks;

  if (
    typeof nativeRequestAnimationFrame !== "function" ||
    typeof callMicrotasks !== "function"
  ) {
    return false;
  }

  globalObject.__nativeScriptIdleAwareWorkletsFrameLoop = true;
  globalObject.__nativeScriptNativeRequestAnimationFrame =
    nativeRequestAnimationFrame;

  let queuedCallbacks: Array<(timestamp: number) => void> = [];
  let queuedCallbacksBegin = 0;
  let queuedCallbacksEnd = 0;
  let flushedCallbacks = queuedCallbacks;
  let flushedCallbacksBegin = 0;
  let flushedCallbacksEnd = 0;
  let queuedFinalizers: Array<() => void> = [];
  let nativeFlushScheduled = false;

  const NSTimerClass = nativeApiClass("NSTimer");
  const NSRunLoopClass = nativeApiClass("NSRunLoop");
  if (
    NSTimerClass == null ||
    NSRunLoopClass == null ||
    NSRunLoopClass.mainRunLoop == null
  ) {
    throw new Error("NativeScript Worklets timers require NSTimer/NSRunLoop");
  }

  type NativeTimer = { invalidate?: () => void };
  const nativeTimers = new Map<number, NativeTimer>();
  let nextNativeTimerHandle = 1;

  function runtimeTimerInvoker<T extends (...args: any[]) => any>(
    callback: T,
  ): T {
    const wrapped = function nativeScriptWorkletTimerCallback(
      this: unknown,
      ...args: unknown[]
    ) {
      return callback.apply(this, args);
    } as T;
    Object.defineProperties(wrapped, {
      __nativeScriptCallbackThread: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: "runtime",
      },
      __nativeScriptWrappedCallback: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: callback,
      },
    });
    return wrapped;
  }

  function normalizeTimerDelay(delay: unknown): number {
    const numericDelay = isFiniteNumber(delay) ? delay : 0;
    return Math.max(0.001, numericDelay / 1000);
  }

  function scheduleNativeTimer(
    callback: (...args: unknown[]) => void,
    delay: unknown,
    repeats: boolean,
    args: unknown[],
  ): number {
    if (typeof callback !== "function") {
      throw new TypeError("NativeScript Worklets timer expects a callback");
    }

    const handle = nextNativeTimerHandle++;
    const fireTimer = runtimeTimerInvoker((timer: NativeTimer) => {
      if (!nativeTimers.has(handle)) {
        return;
      }
      if (!repeats) {
        nativeTimers.delete(handle);
      }
      callback(...args);
      callMicrotasks();
      if (!repeats) {
        timer?.invalidate?.();
      }
    });

    const interval = normalizeTimerDelay(delay);
    const timer =
      typeof NSTimerClass.timerWithTimeIntervalRepeatsBlock === "function"
        ? NSTimerClass.timerWithTimeIntervalRepeatsBlock(
            interval,
            repeats,
            fireTimer,
          )
        : NSTimerClass.scheduledTimerWithTimeIntervalRepeatsBlock(
            interval,
            repeats,
            fireTimer,
          );

    nativeTimers.set(handle, timer);
    if (typeof NSTimerClass.timerWithTimeIntervalRepeatsBlock === "function") {
      NSRunLoopClass.mainRunLoop.addTimerForMode(
        timer,
        "kCFRunLoopCommonModes",
      );
    }
    return handle;
  }

  function clearNativeTimer(handle: unknown) {
    if (typeof handle !== "number") {
      return;
    }
    const timer = nativeTimers.get(handle);
    nativeTimers.delete(handle);
    timer?.invalidate?.();
  }

  function hasPendingFrameWork() {
    return queuedCallbacks.length > 0 || queuedFinalizers.length > 0;
  }

  function executeQueue(timestamp: number) {
    flushedCallbacks = queuedCallbacks;
    queuedCallbacks = [];

    flushedCallbacksBegin = queuedCallbacksBegin;
    flushedCallbacksEnd = queuedCallbacksEnd;
    queuedCallbacksBegin = queuedCallbacksEnd;

    for (const callback of flushedCallbacks) {
      callback(timestamp);
    }

    flushedCallbacksBegin = flushedCallbacksEnd;
    callMicrotasks();

    const finalizers = queuedFinalizers;
    queuedFinalizers = [];
    for (const finalizer of finalizers) {
      finalizer();
    }
  }

  function flushQueue(timestamp: number) {
    globalObject.__frameTimestamp = timestamp;
    executeQueue(timestamp);
    globalObject.__frameTimestamp = undefined;
  }

  function nativeFlushQueue(timestamp: number) {
    nativeFlushScheduled = false;
    flushQueue(timestamp);
    if (hasPendingFrameWork()) {
      scheduleNativeFlush();
    }
  }

  function scheduleNativeFlush() {
    if (nativeFlushScheduled) {
      return;
    }
    nativeFlushScheduled = true;
    nativeRequestAnimationFrame(nativeFlushQueue);
  }

  globalObject.requestAnimationFrame = (
    callback: (timestamp: number) => void,
  ): number => {
    const handle = queuedCallbacksEnd;
    queuedCallbacksEnd += 1;
    queuedCallbacks.push(callback);
    scheduleNativeFlush();
    return handle;
  };

  globalObject.cancelAnimationFrame = (handle: number) => {
    if (handle < flushedCallbacksBegin || handle >= queuedCallbacksEnd) {
      return;
    }

    if (handle < flushedCallbacksEnd) {
      flushedCallbacks[handle - flushedCallbacksBegin] = () => undefined;
    } else {
      queuedCallbacks[handle - queuedCallbacksBegin] = () => undefined;
    }
  };

  globalObject.requestAnimationFrameFinalizer = (callback: () => void) => {
    queuedFinalizers.push(callback);
    scheduleNativeFlush();
  };

  globalObject.setTimeout = (
    callback: (...args: unknown[]) => void,
    delay?: unknown,
    ...args: unknown[]
  ) => scheduleNativeTimer(callback, delay, false, args);
  globalObject.clearTimeout = clearNativeTimer;
  globalObject.setInterval = (
    callback: (...args: unknown[]) => void,
    delay?: unknown,
    ...args: unknown[]
  ) => scheduleNativeTimer(callback, delay, true, args);
  globalObject.clearInterval = clearNativeTimer;

  globalObject.__flushAnimationFrame = (eventTimestamp: number) => {
    nativeFlushScheduled = false;
    flushQueue(eventTimestamp);
    if (hasPendingFrameWork()) {
      scheduleNativeFlush();
    }
  };

  // Stop react-native-worklets' startup frame pump. The replacements above
  // schedule the native display link only when worklet callbacks are pending.
  globalObject.__nativeRequestAnimationFrame = () => undefined;

  return true;
}

function ensureWorkletsInstalled(metadataPath = ""): NativeScriptWorklets {
  if (workletsAdapter) {
    return workletsAdapter;
  }
  installWorklets(requireReactNativeWorklets(), metadataPath);
  return workletsAdapter as NativeScriptWorklets;
}

function installWorklets(
  worklets: NativeScriptWorklets = requireReactNativeWorklets(),
  metadataPath = "",
): boolean {
  if (!NativeScriptNativeApi.isInstalled()) {
    const installed = NativeScriptNativeApi.install(metadataPath);
    if (!installed) {
      throw new Error(
        "NativeScript Native API JSI host object was not installed",
      );
    }
    installInteropConstructors();
    installInlineFunctions();
  }

  const validWorklets = validateWorkletsModule(worklets);
  const holder = validWorklets.getUIRuntimeHolder();
  if (holder == null || typeof holder !== "object") {
    throw workletsSetupError(
      "NativeScript.runOnUI could not resolve a Worklets UI runtime",
    );
  }
  const installRuntime = NativeScriptNativeApi.installWorkletRuntime;
  if (typeof installRuntime !== "function") {
    throw workletsSetupError(
      "NativeScript Native API was built without RNWorklets runtime support",
    );
  }
  const installed = installRuntime(holder, metadataPath);
  if (!installed) {
    throw workletsSetupError(
      "NativeScript Native API could not install into the Worklets UI runtime",
    );
  }
  validWorklets
    .runOnUIAsync(installIdleAwareWorkletsFrameLoop)
    .catch(() => undefined);
  validWorklets
    .runOnUIAsync(installUIKitNativeMountBridge)
    .catch(() => undefined);
  workletsAdapter = validWorklets;
  return true;
}

/**
 * Schedule a `"worklet"` callback on the Worklets UI runtime and resolve with its
 * result — the way to touch UIKit from React code. Throws if `callback` was not
 * transformed into a worklet (the RN JS runtime is not a valid UI-thread shim).
 */
export function runOnUI<Args extends unknown[], ReturnValue>(
  callback: (...args: Args) => ReturnValue | Promise<ReturnValue>,
  ...args: Args
): Promise<ReturnValue> {
  if (typeof callback !== "function") {
    throw new TypeError("NativeScript.runOnUI expects a Worklets callback");
  }

  ensureNativeScriptInstalled();
  const worklets = ensureWorkletsInstalled();
  if (worklets.isWorkletFunction(callback) !== true) {
    throw workletsSetupError(
      "NativeScript.runOnUI requires a worklet callback",
    );
  }
  return worklets.runOnUIAsync(callback, ...args);
}

function runOnUISync<Args extends unknown[], ReturnValue>(
  callback: (...args: Args) => ReturnValue,
  ...args: Args
): ReturnValue {
  if (typeof callback !== "function") {
    throw new TypeError("NativeScript.runOnUISync expects a Worklets callback");
  }

  ensureNativeScriptInstalled();
  const worklets = ensureWorkletsInstalled();
  if (worklets.isWorkletFunction(callback) !== true) {
    throw workletsSetupError(
      "NativeScript.runOnUISync requires a worklet callback",
    );
  }
  return worklets.runOnUISync(callback, ...args);
}

function registerUIRuntimeGlobalOnUI(
  name: string,
  value: unknown,
  force = true,
): boolean {
  "worklet";

  if (!name) {
    return false;
  }

  const globalObject = globalThis as Record<string, unknown>;
  if (!force && Object.prototype.hasOwnProperty.call(globalObject, name)) {
    return false;
  }

  globalObject[name] = value;
  return true;
}

/**
 * Install a shared value as a global on the UI runtime so multiple worklets can
 * reach it without re-capturing it. Resolves `true` once installed. Prefer plain
 * closure capture for one-off values.
 */
export function registerUIRuntimeGlobal<T>(
  name: string,
  value: T,
  force = true,
): Promise<boolean> {
  return runOnUI(registerUIRuntimeGlobalOnUI, name, value, force);
}

/**
 * From inside a worklet, defer a `() => void` onto the platform main dispatch
 * queue. Returns `false` if the native scheduler is not installed.
 */
export function dispatchAsyncOnMainQueue(callback: () => void): boolean {
  "worklet";

  if (typeof callback !== "function") {
    throw new TypeError(
      "NativeScript.dispatchAsyncOnMainQueue expects a callback",
    );
  }

  const scheduler = (globalThis as Record<string, any>)
    .__nativeScriptDispatchAsyncOnMainQueue;
  if (typeof scheduler !== "function") {
    return false;
  }
  return scheduler(callback) === true;
}

function callbackInvoker<T extends AnyFunction>(
  thread: NativeScriptCallbackThread,
  callback: T,
): NativeScriptInvokedCallback<T> {
  "worklet";

  if (typeof callback !== "function") {
    throw new TypeError("NativeScript callback invoker expects a function");
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

  for (const key of [
    ...Object.getOwnPropertyNames(callback),
    ...Object.getOwnPropertySymbols(callback),
  ]) {
    if (nativeCallbackMetadataSkipKeys.has(key)) {
      continue;
    }

    const descriptor = Object.getOwnPropertyDescriptor(callback, key);
    if (!descriptor) {
      continue;
    }

    try {
      Object.defineProperty(wrapped, key, descriptor);
    } catch {
      // Metadata preservation is best-effort for runtimes with fixed function
      // internals; the callback policy markers below are still applied.
    }
  }

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

/**
 * Tag a callback with a per-method thread/return policy the interop bridge
 * honors when invoking it. Hazard: the marker is a non-enumerable property —
 * keep and pass the returned (same) reference.
 */
export function nativeMethodPolicy<T extends AnyFunction>(
  callback: T,
  policy: NativeScriptMethodCallbackPolicy,
): NativeScriptMethodPolicyCallback<T> {
  "worklet";

  if (typeof callback !== "function") {
    throw new TypeError("NativeScript.nativeMethodPolicy expects a function");
  }

  Object.defineProperty(callback, nativeApiMethodPolicyKey, {
    configurable: false,
    enumerable: false,
    writable: false,
    value: policy,
  });
  return callback as NativeScriptMethodPolicyCallback<T>;
}

function jsInvoker<T extends AnyFunction>(
  callback: T,
): NativeScriptInvokedCallback<T> {
  "worklet";

  return callbackInvoker("js", callback);
}

function runtimeInvoker<T extends AnyFunction>(
  callback: T,
): NativeScriptInvokedCallback<T> {
  "worklet";

  return callbackInvoker("runtime", callback);
}

function nativeScriptCallbackThread(
  callback: AnyFunction,
): NativeScriptCallbackThread | undefined {
  "worklet";

  const thread = (callback as Record<string, unknown>)[
    nativeApiCallbackThreadKey
  ];
  return thread === "js" || thread === "runtime" ? thread : undefined;
}

function nativeScriptWrappedCallback(callback: AnyFunction): AnyFunction {
  "worklet";

  const wrapped = (callback as Record<string, unknown>)[
    nativeApiWrappedCallbackKey
  ];
  return typeof wrapped === "function" ? (wrapped as AnyFunction) : callback;
}

function invokeNativeScriptCallback(
  callback: AnyFunction,
  args: unknown[],
  isDisposed?: () => boolean,
): void {
  "worklet";

  if (nativeScriptCallbackThread(callback) !== "js") {
    callback(...args);
    return;
  }

  const handler = nativeScriptWrappedCallback(callback);
  const workletsProxy = (globalThis as Record<string, any>)
    .__workletsModuleProxy;
  const serializer = (globalThis as Record<string, any>).__serializer;

  if (
    workletsProxy &&
    typeof workletsProxy.scheduleOnRN === "function" &&
    typeof serializer === "function"
  ) {
    workletsProxy.scheduleOnRN(handler, serializer(args));
    return;
  }

  setTimeout(() => {
    if (!isDisposed?.()) {
      handler(...args);
    }
  }, 0);
}

function eventBridge<T extends AnyFunction>(
  callback: T,
  thread: NativeScriptCallbackThread | "caller" = "js",
): T | NativeScriptInvokedCallback<T> {
  "worklet";

  if (thread === "js") {
    return jsInvoker(callback);
  }
  if (thread === "runtime") {
    return runtimeInvoker(callback);
  }
  return callback;
}

export type NativeActionTarget = {
  action: string;
  callbackKey: string;
  dispose(): void;
  invoke(sender?: unknown): boolean;
  target: unknown;
};

export type NativeUIAction = {
  action: unknown;
  actionTarget: NativeActionTarget;
  dispose(): void;
  invoke(sender?: unknown): boolean;
};

function canCreateNativeActionTarget(): boolean {
  "worklet";

  const nsObject = nativeApiClass("NSObject");
  return !!nsObject && typeof nsObject.extend === "function";
}

function createNativeClassInstance<T = unknown>(nativeClass: any): T {
  "worklet";

  if (
    !nativeClass ||
    (typeof nativeClass !== "object" && typeof nativeClass !== "function")
  ) {
    throw new Error("Native class cannot be initialized");
  }
  if (typeof nativeClass.new === "function") {
    return nativeClass.new() as T;
  }
  if (typeof nativeClass.alloc !== "function") {
    throw new Error("Native class cannot be allocated");
  }

  const instance = nativeClass.alloc();
  if (instance && typeof instance.init === "function") {
    return instance.init() as T;
  }
  return instance as T;
}
function objcInteropTypes(): any {
  "worklet";

  return (globalThis as Record<string, any>).interop?.types;
}
/**
 * Dynamic native class lookup by name; `null` if unavailable. Hazard: class
 * globals are lazy — avoid forcing member enumeration (Object.keys, prototype
 * introspection) on large classes in hot paths.
 */
export function getClass<T = unknown>(name: string): T | null {
  "worklet";

  if (!name) {
    return null;
  }
  const nativeClass = nativeApiClass(name);
  if (nativeClass == null) {
    return null;
  }
  const wrapped = wrapNativeClass(nativeClass);
  return wrapped == null ? null : (wrapped as T);
}
function requireNSObject(): any {
  "worklet";

  const nsObject = getClass<any>("NSObject");
  if (!nsObject || typeof nsObject.extend !== "function") {
    throw new Error(
      "NSObject.extend is not available from NativeScript Native API",
    );
  }
  return nsObject;
}
function runtimeGlobalMap<T>(name: string): Map<string, T> {
  "worklet";

  const globalObject = globalThis as Record<string, unknown>;
  const existing = globalObject[name];
  if (existing instanceof Map) {
    return existing as Map<string, T>;
  }

  const map = new Map<string, T>();
  Object.defineProperty(globalThis, name, {
    configurable: true,
    enumerable: false,
    writable: false,
    value: map,
  });
  return map;
}
const targetActionClassGlobalName = "__nativeScriptUIKitTargetActionClass";
const observerClassGlobalName = "__nativeScriptUIKitObserverClass";
const targetActionCallbacksGlobalName =
  "__nativeScriptUIKitTargetActionCallbacks";
const observerCallbacksGlobalName = "__nativeScriptUIKitObserverCallbacks";
const invokeNativeActionTargetGlobalName =
  "__nativeScriptInvokeNativeActionTarget";

function targetActionCallbacksForRuntime(): Map<
  string,
  (sender: unknown) => void
> {
  "worklet";

  return runtimeGlobalMap<(sender: unknown) => void>(
    targetActionCallbacksGlobalName,
  );
}
function nativeCallbackKey(value: unknown): string {
  "worklet";

  const handleof = (globalThis as Record<string, any>).interop?.handleof;
  if (value != null && typeof handleof === "function") {
    const handle = handleof(value);
    if (handle != null) {
      if (typeof handle.toHexString === "function") {
        return handle.toHexString();
      }
      return String(handle);
    }
  }
  return String(value);
}
function getTargetActionClass(): any {
  "worklet";

  const globalObject = globalThis as Record<string, any>;
  const cached = globalObject[targetActionClassGlobalName];
  if (cached) {
    return cached;
  }
  const types = objcInteropTypes();
  const NSObject = requireNSObject();
  const targetActionClass = NSObject.extend(
    {
      nativeScriptHandleAction(sender: unknown) {
        const callback = targetActionCallbacksForRuntime().get(
          nativeCallbackKey(this),
        );
        if (typeof callback === "function") {
          callback(sender);
        }
      },
    },
    {
      exposedMethods: {
        "nativeScriptHandleAction:": {
          returns: types?.void,
          params: [NSObject],
        },
      },
    },
  );
  Object.defineProperty(globalThis, targetActionClassGlobalName, {
    configurable: true,
    enumerable: false,
    writable: false,
    value: targetActionClass,
  });
  return targetActionClass;
}
function createNativeActionTarget(
  callback: AnyFunction,
): NativeActionTarget {
  "worklet";

  if (typeof callback !== "function") {
    throw new Error("createNativeActionTarget expects a callback");
  }
  if (!canCreateNativeActionTarget()) {
    throw new Error(
      "createNativeActionTarget requires Objective-C interop globals on the current runtime",
    );
  }

  const target = createNativeClassInstance(getTargetActionClass());
  const targetKey = nativeCallbackKey(target);
  let disposed = false;
  const invoke = (sender?: unknown) => {
    if (disposed) {
      return false;
    }

    invokeNativeScriptCallback(callback, [sender], () => disposed);
    return true;
  };

  targetActionCallbacksForRuntime().set(targetKey, (sender) => {
    invoke(sender);
  });

  return {
    action: "nativeScriptHandleAction:",
    callbackKey: targetKey,
    dispose() {
      disposed = true;
      targetActionCallbacksForRuntime().delete(targetKey);
    },
    invoke,
    target,
  };
}

function invokeNativeActionTarget(
  actionTarget:
    | Pick<NativeActionTarget, "callbackKey" | "invoke" | "target">
    | null
    | undefined,
  sender?: unknown,
): boolean {
  "worklet";

  if (typeof actionTarget?.invoke === "function") {
    return actionTarget.invoke(sender) === true;
  }

  const invoke = (globalThis as Record<string, any>)
    .__nativeScriptInvokeNativeActionTarget;
  return typeof invoke === "function"
    ? invoke(actionTarget, sender) === true
    : false;
}

function canCreateNativeUIAction(): boolean {
  "worklet";

  const UIAction = nativeApiClass("UIAction");
  const InteropBlock = (globalThis as Record<string, any>).interop?.Block;
  return (
    canCreateNativeActionTarget() &&
    !!UIAction &&
    typeof InteropBlock === "function" &&
    (typeof UIAction.actionWithTitleImageIdentifierHandler === "function" ||
      typeof UIAction.alloc === "function")
  );
}

function createNativeUIAction(
  callback: AnyFunction,
  options: {
    discoverabilityTitle?: string;
    identifier?: string;
    image?: unknown;
    title?: string;
  } = {},
): NativeUIAction {
  "worklet";

  if (typeof callback !== "function") {
    throw new Error("createNativeUIAction expects a callback");
  }
  if (!canCreateNativeUIAction()) {
    throw new Error(
      "createNativeUIAction requires UIAction, interop.Block, and Objective-C target/action support",
    );
  }

  const UIAction = nativeApiClass("UIAction");
  const InteropBlock = (globalThis as Record<string, any>).interop.Block;
  const actionTarget = createNativeActionTarget(callback);
  const block = InteropBlock(
    "v@?@",
    eventBridge((sender: unknown) => {
      "worklet";
      invokeNativeActionTarget(actionTarget, sender);
    }, "runtime"),
  );
  const title = options.title ?? "";
  const image = options.image ?? null;
  const identifier = options.identifier ?? null;
  const allocatedAction =
    typeof UIAction.alloc === "function" ? UIAction.alloc() : null;
  const action =
    allocatedAction &&
    typeof allocatedAction.initWithTitleImageIdentifierHandler === "function"
      ? allocatedAction.initWithTitleImageIdentifierHandler(
          title,
          image,
          identifier,
          block,
        )
      : UIAction.actionWithTitleImageIdentifierHandler(
          title,
          image,
          identifier,
          block,
        );
  let disposed = false;

  if (typeof options.discoverabilityTitle === "string") {
    action.discoverabilityTitle = options.discoverabilityTitle;
  }

  const retainer = defaultNativeRetainerForRuntime();
  retainer.retain(actionTarget.target);
  retainer.retain(block);
  retainer.retain(action);
  setAssociatedNativeObject(
    action,
    "__nativeScriptUIActionTarget",
    actionTarget.target,
    "retainNonatomic",
  );
  setAssociatedNativeObject(
    action,
    "__nativeScriptUIActionBlock",
    block,
    "retainNonatomic",
  );

  return {
    action,
    actionTarget,
    dispose() {
      if (disposed) {
        return;
      }
      disposed = true;
      actionTarget.dispose();
      setAssociatedNativeObject(
        action,
        "__nativeScriptUIActionTarget",
        null,
        "assign",
      );
      setAssociatedNativeObject(
        action,
        "__nativeScriptUIActionBlock",
        null,
        "assign",
      );
      retainer.release(action);
      retainer.release(block);
      retainer.release(actionTarget.target);
    },
    invoke(sender?: unknown) {
      if (disposed) {
        return false;
      }
      return invokeNativeActionTarget(actionTarget, sender);
    },
  };
}

/**
 * Re-run a host's opt-in `refresh` hook when UIKit moved the hosted view without
 * a React prop change. No-op (returns `false`) for non-hosted views.
 */
export function refreshUIKitHostView(view: unknown): boolean {
  "worklet";

  const refresh = (globalThis as Record<string, any>)
    .__nativeScriptRefreshUIKitHostView;
  if (typeof refresh !== "function") {
    return false;
  }

  const viewHandle = tryNativeHandleForUIKitView(view);
  return (
    typeof viewHandle === "string" &&
    viewHandle.length > 0 &&
    refresh(viewHandle) === true
  );
}

/**
 * Force a hosted view's display to flush now (an explicit sibling of
 * {@link refreshUIKitHostView} for the reveal hot path). Returns `false` for
 * non-hosted views or when the native flush entry point is unavailable.
 */
export function flushUIKitHostView(view: unknown): boolean {
  "worklet";

  const flush = (globalThis as Record<string, any>)
    .__nativeScriptFlushUIKitHostView;
  if (typeof flush !== "function") {
    return false;
  }

  const viewHandle = tryNativeHandleForUIKitView(view);
  return (
    typeof viewHandle === "string" &&
    viewHandle.length > 0 &&
    flush(viewHandle) === true
  );
}

/**
 * Post a UIKit accessibility layout-changed notification for a reattached host so
 * assistive tech re-reads its element tree. Returns `false` if not applicable.
 */
export function notifyUIKitAccessibilityLayoutChanged(view: unknown): boolean {
  "worklet";

  const notify = (globalThis as Record<string, any>)
    .__nativeScriptNotifyUIKitAccessibilityLayoutChanged;
  if (typeof notify !== "function") {
    return false;
  }

  const viewHandle = tryNativeHandleForUIKitView(view);
  return (
    typeof viewHandle === "string" &&
    viewHandle.length > 0 &&
    notify(viewHandle) === true
  );
}

function normalizeReactNativeFabricViewLayoutTraits(
  value: unknown,
): ReactNativeFabricViewLayoutTraits | null {
  "worklet";

  if (value == null || typeof value !== "object") {
    return null;
  }

  const traits = value as Record<string, unknown>;
  const numberOrNull = (nextValue: unknown): number | null => {
    "worklet";

    return isFiniteNumber(nextValue) ? nextValue : null;
  };
  const optionalNumber = (nextValue: unknown): number | undefined => {
    "worklet";

    return isFiniteNumber(nextValue) ? nextValue : undefined;
  };

  return {
    isFabricComponentView: traits.isFabricComponentView === true,
    hasYogaStyle: traits.hasYogaStyle === true,
    hasLayoutMetrics: traits.hasLayoutMetrics === true,
    flex: numberOrNull(traits.flex),
    flexGrow: numberOrNull(traits.flexGrow),
    flexShrink: numberOrNull(traits.flexShrink),
    frameX: optionalNumber(traits.frameX),
    frameY: optionalNumber(traits.frameY),
    frameWidth: optionalNumber(traits.frameWidth),
    frameHeight: optionalNumber(traits.frameHeight),
    layoutMetricsFrameX: optionalNumber(traits.layoutMetricsFrameX),
    layoutMetricsFrameY: optionalNumber(traits.layoutMetricsFrameY),
    layoutMetricsFrameWidth: optionalNumber(traits.layoutMetricsFrameWidth),
    layoutMetricsFrameHeight: optionalNumber(traits.layoutMetricsFrameHeight),
    layoutMetricsContentFrameX: optionalNumber(
      traits.layoutMetricsContentFrameX,
    ),
    layoutMetricsContentFrameY: optionalNumber(
      traits.layoutMetricsContentFrameY,
    ),
    layoutMetricsContentFrameWidth: optionalNumber(
      traits.layoutMetricsContentFrameWidth,
    ),
    layoutMetricsContentFrameHeight: optionalNumber(
      traits.layoutMetricsContentFrameHeight,
    ),
  };
}

/**
 * Fabric layout metrics/traits for a view addressed by its native handle.
 */
export function reactNativeFabricViewLayoutTraitsForHandle(
  viewHandle: string,
): ReactNativeFabricViewLayoutTraits | null {
  "worklet";

  const readTraits = (globalThis as Record<string, any>)
    .__nativeScriptReactFabricViewLayoutTraits;
  if (typeof readTraits !== "function" || !viewHandle) {
    return null;
  }

  return normalizeReactNativeFabricViewLayoutTraits(readTraits(viewHandle));
}
/**
 * Fabric layout metrics/traits (frame, content frame, `hasLayoutMetrics`) for a
 * view object, or `null` if it carries none.
 */
export function reactNativeFabricViewLayoutTraits(
  view: unknown,
): ReactNativeFabricViewLayoutTraits | null {
  "worklet";

  const viewHandle = nativeHandleForNSObject(view);
  if (!viewHandle) {
    return null;
  }

  return reactNativeFabricViewLayoutTraitsForHandle(viewHandle);
}

/**
 * Resolve an RN image source to a native `UIImage`, invoking
 * `callback(image, error)`. Also available as `ctx.loadImage`. Returns `false`
 * if the native loader or callback is missing.
 */
export function loadImage(
  source: unknown,
  options: NativeScriptImageLoadOptions = {},
  callback: NativeScriptImageLoadCallback,
): boolean {
  "worklet";

  const loadReactImage = (globalThis as Record<string, any>)
    .__nativeScriptLoadReactImage;
  if (typeof loadReactImage !== "function" || typeof callback !== "function") {
    return false;
  }

  return (
    loadReactImage(
      source,
      options.template === true,
      (handle: unknown, errorMessage: unknown) => {
        "worklet";

        const interop = (globalThis as Record<string, any>).interop;
        const image =
          typeof handle === "string" && handle.length > 0
            ? (interop?.object?.(interop.Pointer(handle)) ?? null)
            : null;
        const error =
          typeof errorMessage === "string" && errorMessage.length > 0
            ? new Error(errorMessage)
            : null;
        callback(image, error);
      },
    ) === true
  );
}

function systemFrameworkPath(nameOrPath: string): string {
  if (!nameOrPath) {
    return "";
  }
  if (nameOrPath.includes("/")) {
    return nameOrPath;
  }
  const frameworkName = nameOrPath.endsWith(".framework")
    ? nameOrPath
    : `${nameOrPath}.framework`;
  return `/System/Library/Frameworks/${frameworkName}`;
}

function getProtocol<T = unknown>(name: string): T | null {
  "worklet";

  if (!name) {
    return null;
  }
  const api = requireNativeApiHost();
  const protocol = api.getProtocol?.(name) ?? api[name];
  return protocol == null ? null : (protocol as T);
}

/**
 * Whether a native class is available on this OS/device. Hazard: simulator and
 * device availability can differ for optional frameworks (VisionKit, PassKit, …).
 */
export function isClassAvailable(name: string): boolean {
  const nativeClass = getClass<Record<string, unknown>>(name);
  if (!nativeClass) {
    return false;
  }
  if (typeof nativeClass.available === "boolean") {
    return nativeClass.available;
  }
  return true;
}

function frameworkBundle(nameOrPath: string): any | null {
  const NSBundle = getClass<any>("NSBundle");
  if (!NSBundle || typeof NSBundle.bundleWithPath !== "function") {
    return null;
  }
  const path = systemFrameworkPath(nameOrPath);
  if (!path) {
    return null;
  }
  return NSBundle.bundleWithPath(path) ?? null;
}

const frameworkSentinelClasses: Record<string, string> = {
  Foundation: "NSObject",
  UIKit: "UIView",
  QuickLook: "QLPreviewController",
  VisionKit: "VNDocumentCameraViewController",
  PassKit: "PKPass",
};

function frameworkName(nameOrPath: string): string {
  const match = /([^/]+)\.framework(?:\/)?$/.exec(nameOrPath);
  if (match) {
    return match[1];
  }
  return nameOrPath.replace(/\.framework$/, "");
}

function isFrameworkLoaded(nameOrPath: string): boolean {
  const sentinelClass = frameworkSentinelClasses[frameworkName(nameOrPath)];
  if (sentinelClass && isClassAvailable(sentinelClass)) {
    return true;
  }
  const bundle = frameworkBundle(nameOrPath);
  if (!bundle) {
    return false;
  }
  if (typeof bundle.loaded === "boolean") {
    return bundle.loaded;
  }
  if (typeof bundle.isLoaded === "function") {
    return Boolean(bundle.isLoaded());
  }
  return false;
}

/**
 * Load a system framework by name or `.framework` path before touching its
 * classes/protocols. Returns whether it is loaded afterward.
 */
export function loadFramework(nameOrPath: string): boolean {
  if (!nameOrPath) {
    return false;
  }
  if (isFrameworkLoaded(nameOrPath)) {
    return true;
  }
  const api = requireNativeApiHost();
  try {
    if (typeof api.import === "function") {
      api.import(nameOrPath);
      return true;
    }
  } catch {
    // Fall through to NSBundle below so callers get a false availability result.
  }
  const bundle = frameworkBundle(nameOrPath);
  if (!bundle || typeof bundle.load !== "function") {
    return false;
  }
  try {
    return Boolean(bundle.load());
  } catch {
    return false;
  }
}

function resolveProtocolReference(
  protocolRef: NativeProtocolReference,
): unknown {
  "worklet";

  if (typeof protocolRef !== "string") {
    return protocolRef;
  }
  return (
    (globalThis as Record<string, unknown>)[protocolRef] ??
    getProtocol(protocolRef)
  );
}

function wrapDelegateMethods<T extends object>(
  methods: T,
  thread: CreateDelegateOptions["thread"],
): T {
  "worklet";

  if (!thread || thread === "caller") {
    return methods;
  }

  const wrapped = Object.create(Object.getPrototypeOf(methods));
  for (const key of Reflect.ownKeys(methods)) {
    const descriptor = Object.getOwnPropertyDescriptor(methods, key);
    if (!descriptor) {
      continue;
    }
    if ("value" in descriptor && typeof descriptor.value === "function") {
      descriptor.value = eventBridge(descriptor.value, thread);
    }
    Object.defineProperty(wrapped, key, descriptor);
  }
  return wrapped;
}

/**
 * Build and retain a protocol delegate from protocol objects or names. Hazard:
 * UIKit holds delegates weakly — retain via `options.retainer`/`options.owner`
 * (or `options.assignTo`), or the delegate dies with its closure.
 */
export function createDelegate<T extends object>(
  protocols: NativeProtocolReference | NativeProtocolReference[],
  methods: Partial<T>,
  options: CreateDelegateOptions = {},
): T {
  "worklet";

  const protocolList = (Array.isArray(protocols) ? protocols : [protocols])
    .map(resolveProtocolReference)
    .filter(Boolean);
  if (protocolList.length === 0) {
    throw new Error(
      "NativeScript.createDelegate requires at least one protocol",
    );
  }

  const delegateClassOptions: Record<string, unknown> = {
    protocols: protocolList,
  };
  if (options.name) {
    delegateClassOptions.name = options.name;
  }
  const DelegateClass = requireNSObject().extend(
    wrapDelegateMethods(methods, options.thread),
    delegateClassOptions,
  );
  const delegate = createNativeClassInstance<T>(DelegateClass);
  if (options.retainer) {
    options.retainer.retain(delegate);
  } else if (options.owner) {
    options.owner.retain(delegate);
  } else {
    defaultNativeRetainerForRuntime().retain(delegate);
  }

  const assignedObject = options.assignTo?.object as
    Record<string, unknown> | undefined;
  const assignedProperty = options.assignTo?.property ?? "delegate";
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
      defaultNativeRetainerForRuntime().release(delegate);
    }
  });

  return delegate;
}

type UIKitRuntimeContext<Props extends object> = UIKitViewContext<Props> & {
  createArgument(): UIKitCreateArgument<Props>;
  disposeResources(): void;
  isDisposed(): boolean;
  setFabricTransaction(transaction: UIKitFabricTransaction): void;
  setNativeMountInfo(info: UIKitNativeMountInfo | null): void;
};

type UIKitHostInstance<NativeView> = {
  hostView: unknown;
  lifecycleValue: NativeView;
  childrenView?: unknown;
  controller?: unknown;
};

type RegisteredUIKitHost<NativeView> = {
  context: UIKitRuntimeContext<any>;
  dispose?: (props: Readonly<any>) => UIKitDisposeResult;
  hostInstance: UIKitHostInstance<NativeView>;
  hasMounted?: boolean;
  mounted?: (props: Readonly<any>) => void;
  nativeView: NativeView;
  previousProps?: Readonly<any>;
  propsRevision?: number;
  // The nativeHostPropsRevision (index.ts ~5880-5892 -- bumps only on a
  // genuine serializable prop change, unlike propsRevision above which also
  // bumps on function-identity-only churn) as of the last time host.update /
  // commitUIKitHostFabricTransaction actually ran for this host. See Lever 2
  // in the update-layout-effect below.
  updateAppliedNativeRevision?: number;
  propsRef: { current: Readonly<any> };
  refresh?: (
    props: Readonly<any>,
    previousProps: Readonly<any> | undefined,
  ) => void;
  hostReady?: (
    props: Readonly<any>,
    event: UIKitHostReadyEvent,
    previousProps: Readonly<any> | undefined,
  ) => void;
  mountingTransactionWillMount?: (
    props: Readonly<any>,
    previousProps: Readonly<any> | undefined,
  ) => void;
  mountingTransactionDidMount?: (
    props: Readonly<any>,
    previousProps: Readonly<any> | undefined,
  ) => void;
  mountChild?: (
    child: UIKitFabricMountedChild,
    props: Readonly<any>,
    previousProps: Readonly<any> | undefined,
  ) => void;
  unmountChild?: (
    child: UIKitFabricMountedChild,
    props: Readonly<any>,
    previousProps: Readonly<any> | undefined,
  ) => void;
  transactionCommitted?: (
    props: Readonly<any>,
    previousProps: Readonly<any> | undefined,
  ) => void;
  update?: (
    props: Readonly<any>,
    previousProps: Readonly<any> | undefined,
  ) => void;
};

type PendingUIKitHost<Props extends object, NativeView> = {
  debugName: string;
  mountHost: () => RegisteredUIKitHost<NativeView>;
  nativeMountInfoRef: { current: UIKitNativeMountInfo | null };
  propsRevision?: number;
  propsRef: { current: Readonly<Props & ViewProps> };
  requiresNativeMountInfo?: boolean;
};

type PendingNativeUIKitHostCreateRequest = {
  nativeMountInfoJson?: string;
  propsJson?: string;
  shouldRunMounted: boolean;
};

type UIKitHostHandles = {
  nativeViewHandle?: string;
  childrenViewHandle?: string;
  controllerHandle?: string;
};

type UIKitAdapterDefinition<
  Props extends object,
  NativeView,
> = UIKitViewDefinition<Props, NativeView> & {
  resolveHostInstance?: (created: NativeView) => UIKitHostInstance<NativeView>;
};

const uikitHostRegistryGlobalName = "__nativeScriptUIKitHostRegistry";
const pendingUIKitHostRegistryGlobalName =
  "__nativeScriptPendingUIKitHostRegistry";
const nativeUIKitHostCreateRequestRegistryGlobalName =
  "__nativeScriptPendingUIKitHostCreateRequests";
const createUIKitHostFromNativeGlobalName =
  "__nativeScriptCreateUIKitHostFromNative";
const runUIKitHostLifecycleFromNativeGlobalName =
  "__nativeScriptRunUIKitHostLifecycleFromNative";
const refreshingUIKitHostsGlobalName = "__nativeScriptRefreshingUIKitHosts";
let nextUIKitHostId = 1;

function createUIKitHostId(debugName: string): string {
  return `${debugName}:${nextUIKitHostId++}`;
}

function traceUIKitHostNativeBridgeEvent(label: string, details = ""): void {
  "worklet";

  const globalObject = globalThis as Record<string, any>;
  if (globalObject.__nativeScriptUIKitHostTraceEvents !== true) {
    return;
  }

  const message = `[NativeScript UIKitHost] ${label}${
    details ? ` ${details}` : ""
  }`;
  if (typeof globalObject.TNSLog === "function") {
    globalObject.TNSLog(message);
  }
  if (typeof console !== "undefined" && typeof console.warn === "function") {
    console.warn(message);
  }
}

function uikitHostRegistry(): Map<string, RegisteredUIKitHost<unknown>> {
  "worklet";

  const globalObject = globalThis as Record<string, unknown>;
  const existing = globalObject[uikitHostRegistryGlobalName];
  if (existing instanceof Map) {
    return existing as Map<string, RegisteredUIKitHost<unknown>>;
  }

  const registry = new Map<string, RegisteredUIKitHost<unknown>>();
  Object.defineProperty(globalThis, uikitHostRegistryGlobalName, {
    configurable: true,
    enumerable: false,
    writable: false,
    value: registry,
  });
  return registry;
}

function pendingUIKitHostRegistry(): Map<
  string,
  PendingUIKitHost<any, unknown>
> {
  "worklet";

  const globalObject = globalThis as Record<string, unknown>;
  const existing = globalObject[pendingUIKitHostRegistryGlobalName];
  if (existing instanceof Map) {
    return existing as Map<string, PendingUIKitHost<any, unknown>>;
  }

  const registry = new Map<string, PendingUIKitHost<any, unknown>>();
  Object.defineProperty(globalThis, pendingUIKitHostRegistryGlobalName, {
    configurable: true,
    enumerable: false,
    writable: false,
    value: registry,
  });
  return registry;
}

function pendingNativeUIKitHostCreateRequestRegistry(): Map<
  string,
  PendingNativeUIKitHostCreateRequest
> {
  "worklet";

  const globalObject = globalThis as Record<string, unknown>;
  const existing = globalObject[nativeUIKitHostCreateRequestRegistryGlobalName];
  if (existing instanceof Map) {
    return existing as Map<string, PendingNativeUIKitHostCreateRequest>;
  }

  const registry = new Map<string, PendingNativeUIKitHostCreateRequest>();
  Object.defineProperty(
    globalThis,
    nativeUIKitHostCreateRequestRegistryGlobalName,
    {
      configurable: true,
      enumerable: false,
      writable: false,
      value: registry,
    },
  );
  return registry;
}

function refreshingUIKitHostSet(): Set<string> {
  "worklet";

  const globalObject = globalThis as Record<string, unknown>;
  const existing = globalObject[refreshingUIKitHostsGlobalName];
  if (existing instanceof Set) {
    return existing as Set<string>;
  }

  const refreshingHosts = new Set<string>();
  Object.defineProperty(globalThis, refreshingUIKitHostsGlobalName, {
    configurable: true,
    enumerable: false,
    writable: false,
    value: refreshingHosts,
  });
  return refreshingHosts;
}

function uikitHostHandles(
  host: RegisteredUIKitHost<unknown>,
): UIKitHostHandles {
  "worklet";

  return {
    nativeViewHandle: nativeHandleOrUndefined(host.hostInstance.hostView),
    childrenViewHandle: nativeHandleOrUndefined(host.hostInstance.childrenView),
    controllerHandle: nativeHandleForNSObject(host.hostInstance.controller),
  };
}

function getRegisteredUIKitHost<NativeView>(
  hostId: string,
): RegisteredUIKitHost<NativeView> {
  "worklet";

  const host = uikitHostRegistry().get(hostId);
  if (!host) {
    throw new Error(`UIKit host ${hostId} has not been created`);
  }
  return host as RegisteredUIKitHost<NativeView>;
}

function registerUIKitHost<NativeView>(
  hostId: string,
  host: RegisteredUIKitHost<NativeView>,
): void {
  "worklet";

  uikitHostRegistry().set(hostId, host as RegisteredUIKitHost<unknown>);
}

function parseUIKitHostPropsJson(propsJson?: string): {
  props: Record<string, unknown>;
  revision?: number;
} | null {
  "worklet";

  if (typeof propsJson !== "string" || propsJson.length === 0) {
    return null;
  }

  try {
    const parsed = JSON.parse(propsJson);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return null;
    }

    const record = parsed as Record<string, unknown>;
    const payload = record[uikitHostPropsPayloadKey];
    if (payload && typeof payload === "object" && !Array.isArray(payload)) {
      const revisionValue = record[uikitHostPropsRevisionKey];
      return {
        props: payload as Record<string, unknown>,
        revision: isFiniteNumber(revisionValue) ? revisionValue : undefined,
      };
    }

    return {
      props: record,
    };
  } catch {
    return null;
  }
}

function stringRecordValue(
  record: Record<string, unknown>,
  key: string,
): string {
  "worklet";

  const value = record[key];
  return typeof value === "string" ? value : "";
}

function nativeObjectFromStringHandle(handle: string): unknown | null {
  "worklet";

  const trimmed = handle.trim();
  if (trimmed.length === 0) {
    return null;
  }

  const address = Number(trimmed);
  if (!isFiniteNumber(address) || address <= 0) {
    return null;
  }

  try {
    const interop = (globalThis as Record<string, any>).interop;
    if (
      !interop ||
      typeof interop.object !== "function" ||
      typeof interop.Pointer !== "function"
    ) {
      return null;
    }

    return interop.object(interop.Pointer(address)) ?? null;
  } catch {
    return null;
  }
}

function parseUIKitNativeMountInfoJson(
  nativeMountInfoJson?: string,
): UIKitNativeMountInfo | null {
  "worklet";

  if (
    typeof nativeMountInfoJson !== "string" ||
    nativeMountInfoJson.length === 0
  ) {
    return null;
  }

  try {
    const parsed = JSON.parse(nativeMountInfoJson);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      traceUIKitHostNativeBridgeEvent(
        "native-mount-info-parse-miss",
        `reason=shape type=${typeof parsed} array=${Array.isArray(parsed) ? 1 : 0}`,
      );
      return null;
    }

    const record = parsed as Record<string, unknown>;
    const fabricComponentViewHandle = stringRecordValue(
      record,
      "fabricComponentViewHandle",
    );
    const fabricContainerViewHandle = stringRecordValue(
      record,
      "fabricContainerViewHandle",
    );

    if (!fabricComponentViewHandle && !fabricContainerViewHandle) {
      traceUIKitHostNativeBridgeEvent(
        "native-mount-info-parse-miss",
        "reason=handles-missing",
      );
      return null;
    }

    traceUIKitHostNativeBridgeEvent(
      "native-mount-info-parse-hit",
      `componentHandle=${fabricComponentViewHandle ? 1 : 0} containerHandle=${
        fabricContainerViewHandle ? 1 : 0
      }`,
    );

    return {
      fabricComponentView: nativeObjectFromStringHandle(
        fabricComponentViewHandle,
      ),
      fabricComponentViewHandle,
      fabricContainerView: nativeObjectFromStringHandle(
        fabricContainerViewHandle,
      ),
      fabricContainerViewHandle,
    };
  } catch (error) {
    traceUIKitHostNativeBridgeEvent(
      "native-mount-info-parse-error",
      error instanceof Error ? error.message : String(error),
    );
    return null;
  }
}

function syncUIKitNativeMountInfo(
  hostId: string,
  nativeMountInfo: UIKitNativeMountInfo | null,
): void {
  "worklet";

  if (nativeMountInfo == null) {
    return;
  }

  const pending = pendingUIKitHostRegistry().get(hostId);
  if (pending) {
    pending.nativeMountInfoRef.current = nativeMountInfo;
  }

  const host = uikitHostRegistry().get(hostId);
  host?.context.setNativeMountInfo(nativeMountInfo);
}

function parseUIKitFabricTransactionJson(
  transactionJson?: string,
): UIKitFabricTransaction {
  "worklet";

  if (typeof transactionJson !== "string" || transactionJson.length === 0) {
    return {
      children: [],
      hasModifiedChildren: false,
      hasModifiedProps: false,
      mutations: [],
    };
  }

  try {
    const parsed = JSON.parse(transactionJson);
    const childrenValue =
      parsed != null && typeof parsed === "object" && !Array.isArray(parsed)
        ? (parsed as Record<string, unknown>).children
        : undefined;
    const mutationsValue =
      parsed != null && typeof parsed === "object" && !Array.isArray(parsed)
        ? (parsed as Record<string, unknown>).mutations
        : undefined;
    const deliveryTokenValue =
      parsed != null && typeof parsed === "object" && !Array.isArray(parsed)
        ? (parsed as Record<string, unknown>).deliveryToken
        : undefined;
    const deliveryToken =
      typeof deliveryTokenValue === "number" &&
      deliveryTokenValue === deliveryTokenValue &&
      deliveryTokenValue !== Infinity &&
      deliveryTokenValue !== -Infinity
        ? deliveryTokenValue
        : undefined;
    // iteration 10, Stage 1: parse `observations` defensively -- any shape
    // mismatch (missing bit, older native build, wrong controller kind)
    // yields `undefined` rather than a malformed object, so every consumer's
    // existing `observations?.field != null` fallback check does the right
    // thing without needing a try/catch of its own.
    const observationsValue =
      parsed != null && typeof parsed === "object" && !Array.isArray(parsed)
        ? (parsed as Record<string, unknown>).observations
        : undefined;
    let observations: UIKitFabricCommitObservations | undefined;
    if (
      observationsValue != null &&
      typeof observationsValue === "object" &&
      !Array.isArray(observationsValue)
    ) {
      const observationsRecord = observationsValue as Record<string, unknown>;
      const rawHandles = observationsRecord.viewControllerHandles;
      const viewControllerHandles = Array.isArray(rawHandles)
        ? rawHandles.filter(
            (handle): handle is string => typeof handle === "string",
          )
        : undefined;
      const selectedControllerHandle =
        typeof observationsRecord.selectedControllerHandle === "string"
          ? observationsRecord.selectedControllerHandle
          : undefined;
      if (viewControllerHandles != null || selectedControllerHandle != null) {
        observations = {
          v: typeof observationsRecord.v === "number" ? observationsRecord.v : 1,
          selectedControllerHandle,
          viewControllerHandles,
        };
      }
    }
    const children: UIKitFabricMountedChild[] = [];
    if (Array.isArray(childrenValue)) {
      for (
        let childIndex = 0;
        childIndex < childrenValue.length;
        childIndex += 1
      ) {
        const child = childrenValue[childIndex];
        if (
          child == null ||
          typeof child !== "object" ||
          Array.isArray(child)
        ) {
          continue;
        }

        const event = child as Record<string, unknown>;
        const rawIndex = event.index;
        const index =
          typeof rawIndex === "number" &&
          rawIndex === rawIndex &&
          rawIndex !== Infinity &&
          rawIndex !== -Infinity
            ? rawIndex
            : -1;
        const ownerComponentViewHandle = stringRecordValue(
          event,
          "ownerComponentViewHandle",
        );
        const ownerContainerViewHandle = stringRecordValue(
          event,
          "ownerContainerViewHandle",
        );
        const ownerNativeViewHandle = stringRecordValue(
          event,
          "ownerNativeViewHandle",
        );
        const ownerChildrenViewHandle = stringRecordValue(
          event,
          "ownerChildrenViewHandle",
        );
        const ownerControllerHandle = stringRecordValue(
          event,
          "ownerControllerHandle",
        );
        const componentViewHandle = stringRecordValue(
          event,
          "componentViewHandle",
        );
        const containerViewHandle = stringRecordValue(
          event,
          "containerViewHandle",
        );
        const nativeViewHandle = stringRecordValue(event, "nativeViewHandle");
        const childrenViewHandle = stringRecordValue(
          event,
          "childrenViewHandle",
        );
        const controllerHandle = stringRecordValue(event, "controllerHandle");

        children.push({
          index,
          ownerComponentView: nativeObjectFromStringHandle(
            ownerComponentViewHandle,
          ),
          ownerComponentViewHandle,
          ownerContainerView: nativeObjectFromStringHandle(
            ownerContainerViewHandle,
          ),
          ownerContainerViewHandle,
          ownerNativeView: nativeObjectFromStringHandle(ownerNativeViewHandle),
          ownerNativeViewHandle,
          ownerChildrenView: nativeObjectFromStringHandle(
            ownerChildrenViewHandle,
          ),
          ownerChildrenViewHandle,
          ownerController: nativeObjectFromStringHandle(ownerControllerHandle),
          ownerControllerHandle,
          componentView: nativeObjectFromStringHandle(componentViewHandle),
          componentViewHandle,
          containerView: nativeObjectFromStringHandle(containerViewHandle),
          containerViewHandle,
          nativeView: nativeObjectFromStringHandle(nativeViewHandle),
          nativeViewHandle,
          childrenView: nativeObjectFromStringHandle(childrenViewHandle),
          childrenViewHandle,
          controller: nativeObjectFromStringHandle(controllerHandle),
          controllerHandle,
        });
      }
    }
    const mutations: UIKitFabricMutation[] = [];
    if (Array.isArray(mutationsValue)) {
      for (
        let mutationIndex = 0;
        mutationIndex < mutationsValue.length;
        mutationIndex += 1
      ) {
        const mutation = mutationsValue[mutationIndex];
        if (
          mutation == null ||
          typeof mutation !== "object" ||
          Array.isArray(mutation)
        ) {
          continue;
        }
        const event = mutation as Record<string, unknown>;
        const numberOrNull = (value: unknown): number | null => {
          "worklet";

          return typeof value === "number" &&
            value === value &&
            value !== Infinity &&
            value !== -Infinity
            ? value
            : null;
        };
        const index = numberOrNull(event.index);
        mutations.push({
          type: stringRecordValue(event, "type"),
          parentTag: numberOrNull(event.parentTag),
          index: index == null ? -1 : index,
          newChildTag: numberOrNull(event.newChildTag),
          newChildComponentName: stringRecordValue(
            event,
            "newChildComponentName",
          ),
          oldChildTag: numberOrNull(event.oldChildTag),
          oldChildComponentName: stringRecordValue(
            event,
            "oldChildComponentName",
          ),
        });
      }
    }

    return {
      children,
      hasModifiedChildren:
        parsed != null &&
        typeof parsed === "object" &&
        (parsed as Record<string, unknown>).hasModifiedChildren === true,
      hasModifiedProps:
        parsed != null &&
        typeof parsed === "object" &&
        (parsed as Record<string, unknown>).hasModifiedProps === true,
      mutations,
      deliveryToken,
      observations,
    };
  } catch {
    return {
      children: [],
      hasModifiedChildren: false,
      hasModifiedProps: false,
      mutations: [],
    };
  }
}

function parseUIKitFabricMountedChildRecord(
  event: Record<string, unknown>,
): UIKitFabricMountedChild {
  "worklet";

  const stringValue = (value: unknown): string => {
    "worklet";

    return typeof value === "string" ? value : "";
  };
  const rawIndex = event.index;
  const index =
    typeof rawIndex === "number" &&
    rawIndex === rawIndex &&
    rawIndex !== Infinity &&
    rawIndex !== -Infinity
      ? rawIndex
      : -1;
  const ownerComponentViewHandle = stringValue(event.ownerComponentViewHandle);
  const ownerContainerViewHandle = stringValue(event.ownerContainerViewHandle);
  const ownerNativeViewHandle = stringValue(event.ownerNativeViewHandle);
  const ownerChildrenViewHandle = stringValue(event.ownerChildrenViewHandle);
  const ownerControllerHandle = stringValue(event.ownerControllerHandle);
  const componentViewHandle = stringValue(event.componentViewHandle);
  const containerViewHandle = stringValue(event.containerViewHandle);
  const nativeViewHandle = stringValue(event.nativeViewHandle);
  const childrenViewHandle = stringValue(event.childrenViewHandle);
  const controllerHandle = stringValue(event.controllerHandle);

  return {
    index,
    ownerComponentView: nativeObjectFromStringHandle(ownerComponentViewHandle),
    ownerComponentViewHandle,
    ownerContainerView: nativeObjectFromStringHandle(ownerContainerViewHandle),
    ownerContainerViewHandle,
    ownerNativeView: nativeObjectFromStringHandle(ownerNativeViewHandle),
    ownerNativeViewHandle,
    ownerChildrenView: nativeObjectFromStringHandle(ownerChildrenViewHandle),
    ownerChildrenViewHandle,
    ownerController: nativeObjectFromStringHandle(ownerControllerHandle),
    ownerControllerHandle,
    componentView: nativeObjectFromStringHandle(componentViewHandle),
    componentViewHandle,
    containerView: nativeObjectFromStringHandle(containerViewHandle),
    containerViewHandle,
    nativeView: nativeObjectFromStringHandle(nativeViewHandle),
    nativeViewHandle,
    childrenView: nativeObjectFromStringHandle(childrenViewHandle),
    childrenViewHandle,
    controller: nativeObjectFromStringHandle(controllerHandle),
    controllerHandle,
  };
}

function parseUIKitFabricMountedChildJson(
  transactionJson?: string,
): UIKitFabricMountedChild | null {
  "worklet";

  if (typeof transactionJson !== "string" || transactionJson.length === 0) {
    return null;
  }

  try {
    const parsed = JSON.parse(transactionJson);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return null;
    }

    return parseUIKitFabricMountedChildRecord(
      parsed as Record<string, unknown>,
    );
  } catch {
    return null;
  }
}

function parseUIKitHostReadyEventJson(
  eventJson?: string,
): UIKitHostReadyEvent | null {
  "worklet";

  if (typeof eventJson !== "string" || eventJson.length === 0) {
    return null;
  }

  try {
    const parsed = JSON.parse(eventJson);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return null;
    }

    const event = parsed as Record<string, unknown>;
    const stringValue = (value: unknown): string => {
      "worklet";

      return typeof value === "string" ? value : "";
    };
    const numberValue = (value: unknown): number => {
      "worklet";

      return isFiniteNumber(value) ? value : 0;
    };

    return {
      nativeEvent: {
        hostReadyId: stringValue(event.hostReadyId),
        hostId: stringValue(event.hostId),
        componentViewHandle: stringValue(event.componentViewHandle),
        nativeViewHandle: stringValue(event.nativeViewHandle),
        childrenViewHandle: stringValue(event.childrenViewHandle),
        controllerHandle: stringValue(event.controllerHandle),
        hasChildren: event.hasChildren === true,
        visibleDescendantCount: numberValue(event.visibleDescendantCount),
        windowAttached: event.windowAttached === true,
      },
    };
  } catch {
    return null;
  }
}

function shouldApplyUIKitHostPropsRevision(
  currentRevision: number | undefined,
  nextRevision: number | undefined,
): boolean {
  "worklet";

  return (
    nextRevision == null ||
    currentRevision == null ||
    nextRevision > currentRevision
  );
}

function syncUIKitHostPropsFromNative(
  hostId: string,
  propsJson?: string,
): boolean {
  "worklet";

  if (typeof propsJson !== "string" || propsJson.length === 0) {
    return false;
  }
  // Every host lifecycle crossing carries the full serialized props; parsing
  // multi-KB JSON per call dominated the per-crossing cost. An identical
  // payload string implies an identical revision, for which the apply below
  // is a no-op, so remember the last-seen string per registration.
  const pending = pendingUIKitHostRegistry().get(hostId) as unknown as
    | (Record<string, unknown> & {
        lastNativePropsJson?: string;
        propsRef: { current: Readonly<Record<string, unknown>> | undefined };
        propsRevision: number | undefined;
      })
    | undefined;
  const host = uikitHostRegistry().get(hostId) as unknown as
    | (Record<string, unknown> & {
        lastNativePropsJson?: string;
        propsRef: { current: Readonly<Record<string, unknown>> | undefined };
        propsRevision: number | undefined;
      })
    | undefined;
  const pendingNeedsParse =
    pending != null && pending.lastNativePropsJson !== propsJson;
  const hostNeedsParse = host != null && host.lastNativePropsJson !== propsJson;
  if (!pendingNeedsParse && !hostNeedsParse) {
    return false;
  }

  const nativePayload = parseUIKitHostPropsJson(propsJson);
  if (nativePayload == null) {
    return false;
  }
  const nativeProps = nativePayload.props;
  const nativeRevision = nativePayload.revision;
  let didApply = false;

  const mergeProps = (current: Readonly<any> | undefined) =>
    mergeUIKitHostPropsFromNative(current, nativeProps) as Record<
      string,
      unknown
    >;

  if (pendingNeedsParse) {
    if (
      shouldApplyUIKitHostPropsRevision(pending!.propsRevision, nativeRevision)
    ) {
      pending!.propsRef.current = mergeProps(pending!.propsRef.current);
      pending!.propsRevision =
        (nativeRevision ?? pending!.propsRevision) as number | undefined;
      didApply = true;
    }
    pending!.lastNativePropsJson = propsJson;
  }

  if (hostNeedsParse) {
    if (
      shouldApplyUIKitHostPropsRevision(host!.propsRevision, nativeRevision)
    ) {
      host!.propsRef.current = mergeProps(host!.propsRef.current);
      host!.propsRevision =
        (nativeRevision ?? host!.propsRevision) as number | undefined;
      didApply = true;
    }
    host!.lastNativePropsJson = propsJson;
  }

  return didApply;
}

function createRegisteredUIKitHostFromNative(
  hostId: string,
  propsJson?: string,
  shouldRunMountedOrNativeMountInfo: boolean | string = false,
  maybeNativeMountInfoJson?: string,
): UIKitHostHandles | null {
  "worklet";

  const shouldRunMounted =
    typeof shouldRunMountedOrNativeMountInfo === "boolean"
      ? shouldRunMountedOrNativeMountInfo
      : false;
  const nativeMountInfoJson =
    typeof shouldRunMountedOrNativeMountInfo === "string"
      ? shouldRunMountedOrNativeMountInfo
      : maybeNativeMountInfoJson;
  const parsedNativeMountInfo =
    parseUIKitNativeMountInfoJson(nativeMountInfoJson);
  const hasNativeMountInfoJson =
    typeof nativeMountInfoJson === "string" && nativeMountInfoJson.length > 0;
  syncUIKitNativeMountInfo(hostId, parsedNativeMountInfo);
  syncUIKitHostPropsFromNative(hostId, propsJson);

  const existingHost = uikitHostRegistry().get(hostId);
  if (existingHost) {
    return uikitHostHandles(existingHost);
  }

  const pending = pendingUIKitHostRegistry().get(hostId);
  if (!pending) {
    pendingNativeUIKitHostCreateRequestRegistry().set(hostId, {
      nativeMountInfoJson,
      propsJson,
      shouldRunMounted,
    });
    traceUIKitHostNativeBridgeEvent(
      "create-miss",
      `host=${hostId} reason=pending-missing infoArg=${
        hasNativeMountInfoJson ? 1 : 0
      }`,
    );
    return null;
  }
  if (
    pending.requiresNativeMountInfo === true &&
    pending.nativeMountInfoRef.current == null
  ) {
    pendingNativeUIKitHostCreateRequestRegistry().set(hostId, {
      nativeMountInfoJson,
      propsJson,
      shouldRunMounted,
    });
    traceUIKitHostNativeBridgeEvent(
      "create-miss",
      `host=${hostId} debug=${pending.debugName} reason=native-mount-info-missing infoArg=${
        hasNativeMountInfoJson ? 1 : 0
      } parsed=${parsedNativeMountInfo ? 1 : 0} raw=${
        hasNativeMountInfoJson ? nativeMountInfoJson : ""
      }`,
    );
    return null;
  }

  const host = pending.mountHost();
  registerUIKitHost(hostId, host);
  pendingNativeUIKitHostCreateRequestRegistry().delete(hostId);
  traceUIKitHostNativeBridgeEvent(
    "create-hit",
    `host=${hostId} debug=${pending.debugName}`,
  );
  if (shouldRunMounted && !host.hasMounted) {
    host.hasMounted = true;
    host.mounted?.(host.propsRef.current);
  }
  return uikitHostHandles(host);
}

function replayPendingNativeUIKitHostCreateRequest(
  hostId: string,
): UIKitHostHandles | null {
  "worklet";

  const request = pendingNativeUIKitHostCreateRequestRegistry().get(hostId);
  if (!request) {
    return null;
  }

  return createRegisteredUIKitHostFromNative(
    hostId,
    request.propsJson,
    request.shouldRunMounted,
    request.nativeMountInfoJson,
  );
}

function ensureRegisteredUIKitHost<NativeView>(
  hostId: string,
): RegisteredUIKitHost<NativeView> | null {
  "worklet";

  const existingHost = uikitHostRegistry().get(hostId);
  if (existingHost) {
    return existingHost as RegisteredUIKitHost<NativeView>;
  }

  const pending = pendingUIKitHostRegistry().get(hostId);
  if (
    pending?.requiresNativeMountInfo === true &&
    pending.nativeMountInfoRef.current == null
  ) {
    return null;
  }

  if (createRegisteredUIKitHostFromNative(hostId, undefined, false) == null) {
    return null;
  }

  const createdHost = uikitHostRegistry().get(hostId);
  return (createdHost ?? null) as RegisteredUIKitHost<NativeView> | null;
}

function disposeRegisteredUIKitHost<NativeView>(
  hostId: string,
  props: Readonly<any>,
): void {
  "worklet";

  pendingUIKitHostRegistry().delete(hostId);
  const registry = uikitHostRegistry();
  const host = registry.get(hostId) as
    RegisteredUIKitHost<NativeView> | undefined;
  if (!host) {
    return;
  }
  registry.delete(hostId);
  host.propsRef.current = props;
  const disposeResult = host.dispose?.(props);
  host.context.disposeResources();
  const maybeView = host.hostInstance.hostView as
    Record<string, unknown> | undefined;
  if (
    disposeResult?.removeHostView !== false &&
    typeof maybeView?.removeFromSuperview === "function"
  ) {
    maybeView.removeFromSuperview();
  }
}

function syncUIKitHostPropsFromReact<Props extends object>(
  hostId: string,
  props: Readonly<Props & ViewProps>,
  revision?: number,
): boolean {
  "worklet";
  let didApply = false;

  const pending = pendingUIKitHostRegistry().get(hostId);
  if (
    pending &&
    shouldApplyUIKitHostPropsRevision(pending.propsRevision, revision)
  ) {
    pending.propsRef.current = props;
    pending.propsRevision = revision ?? pending.propsRevision;
    didApply = true;
  }

  const host = uikitHostRegistry().get(hostId);
  if (host && shouldApplyUIKitHostPropsRevision(host.propsRevision, revision)) {
    host.propsRef.current = props;
    host.propsRevision = revision ?? host.propsRevision;
    didApply = true;
  }

  return didApply;
}

function commitUIKitHostFabricTransaction(
  host: RegisteredUIKitHost<unknown>,
  props: Readonly<any>,
  previousProps: Readonly<any> | undefined,
  transaction: UIKitFabricTransaction,
): void {
  "worklet";

  if (
    host.mountingTransactionDidMount == null &&
    host.transactionCommitted == null
  ) {
    return;
  }

  host.context.setFabricTransaction(transaction);
  try {
    host.mountingTransactionDidMount?.(props, previousProps);
    host.transactionCommitted?.(props, previousProps);
  } finally {
    host.context.setFabricTransaction({
      children: [],
      hasModifiedChildren: false,
      hasModifiedProps: false,
      mutations: [],
    });
  }
}

function runUIKitHostLifecycleFromNative(
  hostId: string,
  phase: string,
  propsJson?: string,
  transactionJson?: string,
  nativeMountInfoJson?: string,
): UIKitHostHandles | null {
  "worklet";

  const profileHostCalls =
    (globalThis as Record<string, unknown>).__NS_NS_HOST_PROFILE === true;
  const profileStart = profileHostCalls ? performance.now() : 0;
  syncUIKitNativeMountInfo(
    hostId,
    parseUIKitNativeMountInfoJson(nativeMountInfoJson),
  );
  const profileAfterMountInfo = profileHostCalls ? performance.now() : 0;
  syncUIKitHostPropsFromNative(hostId, propsJson);
  const profileAfterProps = profileHostCalls ? performance.now() : 0;
  const profileSections = (label: string) => {
    if (!profileHostCalls) {
      return;
    }
    const total = performance.now() - profileStart;
    if (total < 8) {
      return;
    }
    console.warn(
      `NS_NS_HOST_PROFILE_SECTIONS ${hostId} phase=${phase} ${label} mountInfo=${(
        profileAfterMountInfo - profileStart
      ).toFixed(1)} props=${(profileAfterProps - profileAfterMountInfo).toFixed(
        1,
      )} rest=${(performance.now() - profileAfterProps).toFixed(1)}`,
    );
  };

  if (phase === "dispose") {
    const host = uikitHostRegistry().get(hostId);
    const pending = pendingUIKitHostRegistry().get(hostId);
    disposeRegisteredUIKitHost(
      hostId,
      host?.propsRef.current ?? pending?.propsRef.current ?? {},
    );
    return null;
  }

  const profileBeforeCreate = profileHostCalls ? performance.now() : 0;
  // nativeMountInfoJson was already parsed and synced by
  // syncUIKitNativeMountInfo just above (unconditionally, for every phase
  // including this call's own eventual host lookup) -- passing it again here
  // made createRegisteredUIKitHostFromNative re-parse the identical JSON and
  // re-resolve every native handle in it a second time on every single
  // lifecycle crossing. Omit it; the pending-host-creation path this
  // function also serves already observes the mount info synced above via
  // pending.nativeMountInfoRef.current.
  const handles = createRegisteredUIKitHostFromNative(hostId, undefined, false);
  if (profileHostCalls) {
    const createMs = performance.now() - profileBeforeCreate;
    if (createMs >= 8) {
      console.warn(
        `NS_NS_HOST_PROFILE_SECTIONS ${hostId} phase=${phase} createMs=${createMs.toFixed(1)}`,
      );
    }
  }
  if (handles == null) {
    profileSections("create-miss");
    return null;
  }

  const host = getRegisteredUIKitHost<unknown>(hostId);
  const nextProps = host.propsRef.current;

  if (phase === "refresh") {
    const refreshingHosts = refreshingUIKitHostSet();
    if (!refreshingHosts.has(hostId)) {
      refreshingHosts.add(hostId);
      host.context.setFabricTransaction(
        parseUIKitFabricTransactionJson(transactionJson),
      );
      try {
        host.refresh?.(nextProps, host.previousProps);
      } finally {
        host.context.setFabricTransaction({
          children: [],
          hasModifiedChildren: false,
          hasModifiedProps: false,
          mutations: [],
        });
        refreshingHosts.delete(hostId);
      }
    }
  } else if (phase === "update") {
    if (host.previousProps !== nextProps) {
      host.update?.(nextProps, host.previousProps);
      host.previousProps = nextProps;
    }
  } else if (phase === "mounted" && !host.hasMounted) {
    host.hasMounted = true;
    host.mounted?.(nextProps);
  } else if (phase === "mountingTransactionWillMount") {
    host.context.setFabricTransaction({
      children: [],
      hasModifiedChildren: false,
      hasModifiedProps: false,
      mutations: [],
    });
    host.mountingTransactionWillMount?.(nextProps, host.previousProps);
  } else if (phase === "mountChild" || phase === "unmountChild") {
    const child = parseUIKitFabricMountedChildJson(transactionJson);
    if (child != null) {
      host.context.setFabricTransaction({
        children: [],
        hasModifiedChildren: true,
        hasModifiedProps: false,
        mutations: [],
      });
      try {
        if (phase === "mountChild") {
          host.mountChild?.(child, nextProps, host.previousProps);
        } else {
          host.unmountChild?.(child, nextProps, host.previousProps);
        }
      } finally {
        host.context.setFabricTransaction({
          children: [],
          hasModifiedChildren: false,
          hasModifiedProps: false,
          mutations: [],
        });
      }
    }
  } else if (phase === "transactionCommitted") {
    // commitUIKitHostFabricTransaction is a no-op whenever the host defines
    // neither callback -- but transactionJson can carry a full mounted-
    // children snapshot (native handles resolved per child), and parsing it
    // unconditionally paid that cost on every Fabric transaction even when
    // the result was discarded immediately. Several registered hosts (the
    // navigation stack/screen controllers, the badge) have no
    // mountingTransactionDidMount/transactionCommitted callback at all and
    // paid this parse for nothing; hosts that DO define one (e.g. the tabs
    // host) are unaffected -- this only skips work whose result was already
    // being thrown away.
    if (host.mountingTransactionDidMount != null || host.transactionCommitted != null) {
      commitUIKitHostFabricTransaction(
        host,
        nextProps,
        host.previousProps,
        parseUIKitFabricTransactionJson(transactionJson),
      );
    }
  } else if (phase === "hostReady") {
    const hostReadyEvent = parseUIKitHostReadyEventJson(transactionJson);
    if (hostReadyEvent != null) {
      host.hostReady?.(nextProps, hostReadyEvent, host.previousProps);
    }
  }

  profileSections("exit");
  return uikitHostHandles(host);
}

function installUIKitNativeMountBridge(): void {
  "worklet";

  const globalObject = globalThis as Record<string, unknown>;
  if (typeof globalObject[createUIKitHostFromNativeGlobalName] !== "function") {
    Object.defineProperty(globalThis, createUIKitHostFromNativeGlobalName, {
      configurable: true,
      enumerable: false,
      writable: false,
      value: createRegisteredUIKitHostFromNative,
    });
  }
  if (
    typeof globalObject[runUIKitHostLifecycleFromNativeGlobalName] !==
    "function"
  ) {
    Object.defineProperty(
      globalThis,
      runUIKitHostLifecycleFromNativeGlobalName,
      {
        configurable: true,
        enumerable: false,
        writable: false,
        value: runUIKitHostLifecycleFromNative,
      },
    );
  }
}

function applyUIKitHostPropsForFabricTagOnUI(
  reactTag: number,
  nextNativeProps: any,
): UIKitHostHandles | null {
  "worklet";

  installUIKitNativeMountBridge();
  const applyHostProps = (globalThis as any)
    .__nativeScriptApplyUIKitHostPropsForFabricTag;
  if (typeof applyHostProps !== "function") {
    return null;
  }
  return applyHostProps(reactTag, nextNativeProps);
}

function ignoreUIKitLayoutInvalidation(): void {
  "worklet";
}

function observerCallbacksForRuntime(): Map<
  string,
  (keyPath: string, object: unknown, change: unknown) => void
> {
  "worklet";

  return runtimeGlobalMap<
    (keyPath: string, object: unknown, change: unknown) => void
  >(observerCallbacksGlobalName);
}

function invokeNativeActionTargetFromRuntime(
  actionTarget:
    | Pick<NativeActionTarget, "callbackKey" | "invoke" | "target">
    | null
    | undefined,
  sender?: unknown,
): boolean {
  "worklet";

  if (typeof actionTarget?.invoke === "function") {
    return actionTarget.invoke(sender) === true;
  }

  const target = actionTarget?.target;
  if (target == null) {
    return false;
  }

  const targetKey =
    typeof actionTarget.callbackKey === "string"
      ? actionTarget.callbackKey
      : nativeCallbackKey(target);
  const callback = targetActionCallbacksForRuntime().get(targetKey);
  if (typeof callback !== "function") {
    return false;
  }

  callback(sender);
  return true;
}

function installNativeActionTargetInvoker(): void {
  "worklet";

  const globalObject = globalThis as Record<string, unknown>;
  if (typeof globalObject[invokeNativeActionTargetGlobalName] === "function") {
    return;
  }

  Object.defineProperty(globalThis, invokeNativeActionTargetGlobalName, {
    configurable: true,
    enumerable: false,
    writable: false,
    value: invokeNativeActionTargetFromRuntime,
  });
}

installNativeActionTargetInvoker();

function getObserverClass(): any {
  "worklet";

  const globalObject = globalThis as Record<string, any>;
  const cached = globalObject[observerClassGlobalName];
  if (cached) {
    return cached;
  }
  const types = objcInteropTypes();
  const NSObject = requireNSObject();
  const NSString = nativeApiClass("NSString");
  const NSDictionary = nativeApiClass("NSDictionary");
  const Pointer =
    (globalThis as Record<string, any>).interop?.Pointer ?? types?.id;

  const observerClass = NSObject.extend(
    {
      observeValueForKeyPathOfObjectChangeContext(
        keyPath: string,
        object: unknown,
        change: unknown,
        _context: unknown,
      ) {
        const callback = observerCallbacksForRuntime().get(
          nativeCallbackKey(this),
        );
        if (typeof callback === "function") {
          callback(keyPath, object, change);
        }
      },
    },
    {
      exposedMethods: {
        "observeValueForKeyPath:ofObject:change:context:": {
          returns: types?.void,
          params: [
            NSString ?? NSObject,
            NSObject,
            NSDictionary ?? NSObject,
            Pointer,
          ],
        },
      },
    },
  );
  Object.defineProperty(globalThis, observerClassGlobalName, {
    configurable: true,
    enumerable: false,
    writable: false,
    value: observerClass,
  });
  return observerClass;
}

function createUIKitContext<Props extends object>(
  name: string,
  propsRef: { current: Props },
  invalidateLayout: () => void,
  nativeMountInfoRef: { current: UIKitNativeMountInfo | null } = {
    current: null,
  },
): UIKitRuntimeContext<Props> {
  "worklet";

  const retained: unknown[] = [];
  const cleanupCallbacks: Array<() => void> = [];
  let disposed = false;
  let fabricTransaction: UIKitFabricTransaction = {
    children: [],
    hasModifiedChildren: false,
    hasModifiedProps: false,
    mutations: [],
  };

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
    get fabricComponentView() {
      return nativeMountInfoRef.current?.fabricComponentView ?? null;
    },
    get fabricComponentViewHandle() {
      return nativeMountInfoRef.current?.fabricComponentViewHandle ?? "";
    },
    get fabricContainerView() {
      return nativeMountInfoRef.current?.fabricContainerView ?? null;
    },
    get fabricContainerViewHandle() {
      return nativeMountInfoRef.current?.fabricContainerViewHandle ?? "";
    },
    get fabricTransaction() {
      return fabricTransaction;
    },
    setNativeMountInfo(info) {
      nativeMountInfoRef.current = info;
    },
    setFabricTransaction(transaction) {
      fabricTransaction = transaction;
    },
    emit(eventName, payload) {
      if (disposed) {
        return;
      }
      const handler = (propsRef.current as Record<PropertyKey, unknown>)[
        eventName as PropertyKey
      ];
      if (typeof handler !== "function") {
        return;
      }
      const workletsProxy = (globalThis as Record<string, any>)
        .__workletsModuleProxy;
      const serializer = (globalThis as Record<string, any>).__serializer;
      if (
        workletsProxy &&
        typeof workletsProxy.scheduleOnRN === "function" &&
        typeof serializer === "function"
      ) {
        workletsProxy.scheduleOnRN(handler, serializer([payload]));
      } else {
        setTimeout(() => {
          if (!disposed) {
            (handler as Function)(payload);
          }
        }, 0);
      }
    },
    targetAction(control, events, callback) {
      if (control == null || typeof callback !== "function") {
        return;
      }
      const target = createNativeClassInstance(getTargetActionClass());
      const targetKey = nativeCallbackKey(target);
      targetActionCallbacksForRuntime().set(targetKey, () => {
        if (!disposed) {
          invokeNativeScriptCallback(callback, [], () => disposed);
        }
      });
      const selector = "nativeScriptHandleAction:";
      const nativeControl = control as Record<string, Function>;
      if (typeof nativeControl.addTargetActionForControlEvents !== "function") {
        throw new Error("targetAction expects a UIControl-compatible object");
      }
      nativeControl.addTargetActionForControlEvents(target, selector, events);
      context.retain(target);
      context.dispose(() => {
        if (
          typeof nativeControl.removeTargetActionForControlEvents === "function"
        ) {
          nativeControl.removeTargetActionForControlEvents(
            target,
            selector,
            events,
          );
        }
        targetActionCallbacksForRuntime().delete(targetKey);
      });
    },
    gestureAction(gesture, callback) {
      if (gesture == null || typeof callback !== "function") {
        return;
      }
      const target = createNativeClassInstance(getTargetActionClass());
      const targetKey = nativeCallbackKey(target);
      targetActionCallbacksForRuntime().set(targetKey, (sender) => {
        if (!disposed) {
          callback(sender ?? gesture);
        }
      });
      const selector = "nativeScriptHandleAction:";
      const nativeGesture = gesture as Record<string, Function>;
      if (typeof nativeGesture.addTargetAction !== "function") {
        throw new Error(
          "gestureAction expects a UIGestureRecognizer-compatible object",
        );
      }
      nativeGesture.addTargetAction(target, selector);
      context.retain(target);
      context.dispose(() => {
        if (typeof nativeGesture.removeTargetAction === "function") {
          nativeGesture.removeTargetAction(target, selector);
        }
        targetActionCallbacksForRuntime().delete(targetKey);
      });
    },
    actionTarget(callback) {
      if (typeof callback !== "function") {
        throw new Error("actionTarget expects a callback");
      }

      const target = createNativeClassInstance(getTargetActionClass());
      const targetKey = nativeCallbackKey(target);
      const invoke = (sender?: unknown) => {
        if (!disposed) {
          invokeNativeScriptCallback(callback, [sender], () => disposed);
          return true;
        }

        return false;
      };
      targetActionCallbacksForRuntime().set(targetKey, (sender) => {
        invoke(sender);
      });
      context.retain(target);
      context.dispose(() => {
        targetActionCallbacksForRuntime().delete(targetKey);
      });

      return {
        action: "nativeScriptHandleAction:",
        callbackKey: targetKey,
        invoke,
        target,
      };
    },
    delegate(object, protocolRef, implementation, options = {}) {
      const protocolList = [protocolRef as NativeProtocolReference]
        .map(resolveProtocolReference)
        .filter(Boolean);
      if (protocolList.length === 0) {
        throw new Error("NativeScript UIKit delegate requires a protocol");
      }

      const nativeObject = object as Record<string, unknown>;
      const fallbackAssignedObject =
        nativeObject && "delegate" in nativeObject ? nativeObject : undefined;
      const assignedObject = (options.assignTo?.object ??
        fallbackAssignedObject) as Record<string, unknown> | undefined;
      const assignedProperty = options.assignTo?.property ?? "delegate";
      const delegateClassOptions: Record<string, unknown> = {
        protocols: protocolList,
      };
      if (options.name) {
        delegateClassOptions.name = options.name;
      }
      const DelegateClass = requireNSObject().extend(
        wrapDelegateMethods(implementation, options.thread ?? "caller"),
        delegateClassOptions,
      );
      const delegate = createNativeClassInstance<T>(DelegateClass);
      const owner = options.owner ?? context;
      if (options.retainer) {
        options.retainer.retain(delegate);
      } else {
        owner.retain(delegate);
      }
      if (assignedObject) {
        assignedObject[assignedProperty] = delegate;
      }
      owner.dispose?.(() => {
        if (assignedObject && assignedObject[assignedProperty] === delegate) {
          assignedObject[assignedProperty] = null;
        }
        owner.release?.(delegate);
        options.retainer?.release(delegate);
      });
      return delegate;
    },
    notification(name, object, callback) {
      const center = nativeApiClass("NSNotificationCenter")?.defaultCenter;
      if (!center) {
        throw new Error("NSNotificationCenter.defaultCenter is not available");
      }
      const observer = center.addObserverForNameObjectQueueUsingBlock(
        name,
        object ?? null,
        null,
        (notification: unknown) => {
          if (!disposed) {
            callback(notification);
          }
        },
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
        typeof nativeObject.addObserverForKeyPathOptionsContext !== "function"
      ) {
        throw new Error("observe expects a KVO-compatible NSObject");
      }
      const observer = createNativeClassInstance(getObserverClass());
      const observerKey = nativeCallbackKey(observer);
      observerCallbacksForRuntime().set(
        observerKey,
        (
          observedKeyPath: string,
          _observedObject: unknown,
          change: unknown,
        ) => {
          if (disposed || String(observedKeyPath) !== keyPath) {
            return;
          }
          const newKey = nativeApiValue("NSKeyValueChangeNewKey");
          const value =
            change &&
            typeof (change as Record<string, Function>).objectForKey ===
              "function"
              ? (change as Record<string, Function>).objectForKey(newKey)
              : undefined;
          callback(value, change);
        },
      );
      const options = nativeApiEnum("NSKeyValueObservingOptions") as
        Record<string, unknown> | undefined;
      const optionNew =
        typeof options?.New === "number"
          ? options.New
          : ((nativeApiValue("NSKeyValueObservingOptionNew") as
              number | undefined) ?? 1);
      nativeObject.addObserverForKeyPathOptionsContext(
        observer,
        keyPath,
        optionNew,
        null,
      );
      context.retain(observer);
      context.dispose(() => {
        try {
          if (typeof nativeObject.removeObserverForKeyPath === "function") {
            nativeObject.removeObserverForKeyPath(observer, keyPath);
          }
        } finally {
          observerCallbacksForRuntime().delete(observerKey);
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
    loadImage: (source, options, callback) =>
      loadImage(source, options, callback),
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
  size: { width: number; height: number },
  layout?: UIKitLayoutOptions,
): { width: number; height: number } {
  "worklet";

  const defaultSize = layout?.defaultSize ?? {};
  let width =
    isFiniteNumber(size.width) && size.width >= 0
      ? size.width
      : (defaultSize.width ?? 0);
  let height =
    isFiniteNumber(size.height) && size.height >= 0
      ? size.height
      : (defaultSize.height ?? 0);

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
  return { width, height };
}

function flattenedStyleSize(style: ViewProps["style"]) {
  "worklet";

  const flat: Record<string, unknown> = {};
  const applyStyle = (value: unknown) => {
    if (Array.isArray(value)) {
      for (const item of value) {
        applyStyle(item);
      }
      return;
    }
    if (!value || typeof value !== "object") {
      return;
    }
    const record = value as Record<string, unknown>;
    if (typeof record.width === "number") {
      flat.width = record.width;
    }
    if (typeof record.height === "number") {
      flat.height = record.height;
    }
  };
  applyStyle(style);
  return {
    width: typeof flat.width === "number" ? flat.width : undefined,
    height: typeof flat.height === "number" ? flat.height : undefined,
  };
}

function makeCGSize(width: number, height: number) {
  "worklet";

  const CGSizeMake = nativeApiValue("CGSizeMake");
  if (typeof CGSizeMake === "function") {
    return CGSizeMake(width, height);
  }
  return { width, height };
}

function readNativeSize(size: unknown): { width: number; height: number } {
  "worklet";

  const nativeSize = size as { width?: unknown; height?: unknown };
  return {
    width: Number(nativeSize?.width ?? 0),
    height: Number(nativeSize?.height ?? 0),
  };
}

function measureUIKitView(
  view: unknown,
  layout: UIKitLayoutOptions | undefined,
  style: ViewProps["style"],
): { width: number; height: number } {
  "worklet";

  const mode = layout?.sizing ?? "fill";
  if (mode === "fill") {
    return constrainedSize(
      layout?.defaultSize ?? { width: 0, height: 0 },
      layout,
    );
  }

  const styleSize = flattenedStyleSize(style);
  const nativeView = view as Record<string, any>;
  let measured = layout?.defaultSize ?? { width: 0, height: 0 };

  if (mode === "intrinsic") {
    measured = readNativeSize(nativeView.intrinsicContentSize);
  } else if (
    mode === "sizeThatFits" &&
    typeof nativeView.sizeThatFits === "function"
  ) {
    measured = readNativeSize(
      nativeView.sizeThatFits(
        makeCGSize(
          styleSize.width ?? Number.MAX_SAFE_INTEGER,
          styleSize.height ?? Number.MAX_SAFE_INTEGER,
        ),
      ),
    );
  } else if (
    mode === "autoLayout" &&
    typeof nativeView.systemLayoutSizeFittingSize === "function"
  ) {
    const fittingSize =
      nativeApiClass("UIView")?.layoutFittingCompressedSize ??
      makeCGSize(styleSize.width ?? 0, styleSize.height ?? 0);
    measured = readNativeSize(
      nativeView.systemLayoutSizeFittingSize(fittingSize),
    );
  }

  return constrainedSize(
    {
      width: styleSize.width ?? measured.width,
      height: styleSize.height ?? measured.height,
    },
    layout,
  );
}

function defineUIKitHost<Props extends object, NativeView = unknown>(
  definition: UIKitAdapterDefinition<Props, NativeView>,
): UIKitViewComponent<Props, NativeView> {
  const debugName =
    definition.debugName ||
    definition.name ||
    definition.displayName ||
    "NativeScriptUIKitView";
  const createHost = definition.create;
  const updateHost = definition.update;
  const mountedHost = definition.mounted;
  const disposeHost = definition.dispose;
  const refreshHost = definition.refresh;
  const transactionCommittedHost = definition.transactionCommitted;
  const mountingTransactionWillMountHost =
    definition.mountingTransactionWillMount;
  const mountingTransactionDidMountHost =
    definition.mountingTransactionDidMount;
  const mountChildHost = definition.mountChild;
  const unmountChildHost = definition.unmountChild;
  const hostReadyHost = definition.hostReady;
  const resolveHostInstance = definition.resolveHostInstance;
  const layout = definition.layout;
  const requiresNativeMountInfo = definition.requiresNativeMountInfo === true;
  const hasFabricLifecycleCallbacks =
    mountingTransactionWillMountHost != null ||
    mountingTransactionDidMountHost != null ||
    transactionCommittedHost != null ||
    mountChildHost != null ||
    unmountChildHost != null ||
    hostReadyHost != null;

  const Component = forwardRef<
    UIKitViewRef<NativeView>,
    Props & UIKitHostViewProps
  >(function NativeScriptUIKitView(rawProps, ref) {
    const props = (rawProps ?? {}) as Props & UIKitHostViewProps;
    if (typeof splitUIKitViewProps !== "function") {
      throw jsError(
        `${debugName} expected splitUIKitViewProps to be a function, got ${typeof splitUIKitViewProps}`,
      );
    }
    let splitProps: {
      nativeProps: ViewProps;
      pluginProps: Props & UIKitHostViewProps;
    };
    try {
      splitProps = splitUIKitViewProps(props, definition);
    } catch (reason) {
      throw jsError(
        `${debugName} splitUIKitViewProps failed: ${jsString(reason)}`,
      );
    }
    const nativeProps = splitProps.nativeProps;
    const pluginProps = splitProps.pluginProps;
    if (typeof useRef !== "function") {
      throw jsError(
        `${debugName} expected React.useRef to be a function, got ${typeof useRef}`,
      );
    }
    if (typeof useState !== "function") {
      throw jsError(
        `${debugName} expected React.useState to be a function, got ${typeof useState}`,
      );
    }
    if (typeof createUIKitHostId !== "function") {
      throw jsError(
        `${debugName} expected createUIKitHostId to be a function, got ${typeof createUIKitHostId}`,
      );
    }
    const layoutSizing = layout?.sizing ?? "fill";
    const hostIdRef = useRef<string | null>(null);
    if (hostIdRef.current == null) {
      hostIdRef.current = createUIKitHostId(debugName);
    }
    const hostId = hostIdRef.current;
    const nativeComponentRef = useRef(null);
    const propsRef = useRef(pluginProps);
    const reactHostPropsRevisionRef = useRef(0);
    const reactHostPropsJsonRef = useRef<string | undefined>();
    const reactHostRevisionPropsRef = useRef<
      Readonly<Props & UIKitHostViewProps> | undefined
    >();
    const previousPropsRef = useRef<Readonly<Props & ViewProps> | undefined>();
    const mountedRef = useRef(false);
    const disposedRef = useRef(false);
    const asyncPreparedHostRef = useRef<{
      propsRevision: number | undefined;
    } | null>(null);
    const updateMeasuredSizeRef = useRef<() => void>(() => {});
    const [nativeHostRevision, setNativeHostRevision] = useState(0);
    const attachController = props.attachController !== false;
    const adoptHostViewAsControllerView =
      props.adoptHostViewAsControllerView === true;
    const attachControllerToParent = props.attachControllerToParent !== false;
    const attachControllerView = props.attachControllerView !== false;
    const attachNativeView = props.attachNativeView !== false;
    const detachControllerFromParent =
      props.detachControllerFromParent === true;
    const collectChildren = props.collectChildren === true;
    const pinNativeViewToHost = props.pinNativeViewToHost === true;
    const disableDetachedChildrenTouchHandler =
      props.disableDetachedChildrenTouchHandler === true;
    const disableUIKitHostWindowAttachRefresh =
      props.disableUIKitHostWindowAttachRefresh === true;
    const emitOffWindowHostReady = props.emitOffWindowHostReady === true;
    const ignoreHostReadyWindowAttachment =
      props.ignoreHostReadyWindowAttachment === true;
    const externalDetachedChildrenOwner =
      props.externalDetachedChildrenOwner === true;
    const preserveDetachedChildrenLayout =
      props.preserveDetachedChildrenLayout === true;
    const mountChildrenDirectlyToChildrenView =
      props.mountChildrenDirectlyToChildrenView === true;
    const layoutDirectChildrenToChildrenViewBounds =
      props.layoutDirectChildrenToChildrenViewBounds === true;
    const detachedChildrenContentOffsetX = isFiniteNumber(
      props.detachedChildrenContentOffsetX,
    )
      ? props.detachedChildrenContentOffsetX
      : undefined;
    const detachedChildrenContentOffsetY = isFiniteNumber(
      props.detachedChildrenContentOffsetY,
    )
      ? props.detachedChildrenContentOffsetY
      : undefined;
    const mountThroughNativeHost = true;
    const nativeHostPropsJsonRef = useRef<{
      json: string | undefined;
      payloadJson?: string;
      revision: number;
    }>({ json: undefined, revision: 0 });

    const invalidateLayout = () => {
      updateMeasuredSizeRef.current();
    };

    const [nativeViewHandle, setNativeViewHandle] = useState<
      string | undefined
    >();
    const [childrenViewHandle, setChildrenViewHandle] = useState<
      string | undefined
    >();
    const [controllerHandle, setControllerHandle] = useState<
      string | undefined
    >();
    const [measuredSize, setMeasuredSize] = useState<
      { width: number; height: number } | undefined
    >(() =>
      layoutSizing === "fill"
        ? undefined
        : layout?.defaultSize
          ? {
              width: layout.defaultSize.width ?? 0,
              height: layout.defaultSize.height ?? 0,
            }
          : undefined,
    );
    const [error, setError] = useState<Error | null>(null);

    const nextSerializableReactHostPropsJson =
      stringifySerializableUIKitHostProps(pluginProps);
    const nextSerializableNativeHostPropsJson = mountThroughNativeHost
      ? nextSerializableReactHostPropsJson
      : undefined;
    const didSerializableHostPropsChange =
      reactHostPropsJsonRef.current !== nextSerializableReactHostPropsJson;
    const didLiveHostPropsChange =
      didSerializableHostPropsChange ||
      nonSerializableUIKitHostPropsChanged(
        reactHostRevisionPropsRef.current,
        pluginProps,
      );

    propsRef.current = pluginProps;
    const uiRuntimeProps = copyUIKitHostPropsForUI(pluginProps) as Readonly<
      Props & UIKitHostViewProps
    >;

    if (didLiveHostPropsChange) {
      reactHostPropsRevisionRef.current += 1;
      reactHostPropsJsonRef.current = nextSerializableReactHostPropsJson;
      reactHostRevisionPropsRef.current = pluginProps;
    }

    const reactHostPropsRevision = reactHostPropsRevisionRef.current;

    if (didSerializableHostPropsChange) {
      nativeHostPropsJsonRef.current = {
        json: nextSerializableNativeHostPropsJson,
        payloadJson:
          mountThroughNativeHost && nextSerializableNativeHostPropsJson != null
            ? stringifyUIKitHostPropsPayload(
                nextSerializableNativeHostPropsJson,
                reactHostPropsRevision,
              )
            : undefined,
        revision: nativeHostPropsJsonRef.current.revision + 1,
      };
    }
    const nativeHostPropsJson = nativeHostPropsJsonRef.current.payloadJson;
    const nativeHostPropsRevision = nativeHostPropsJsonRef.current.revision;
    const nativeFabricHostProps = mountThroughNativeHost
      ? {
          adoptHostViewAsControllerView,
          attachNativeView,
          attachControllerToParent: attachController
            ? attachControllerToParent
            : false,
          collectChildren,
          detachControllerFromParent:
            attachController && detachControllerFromParent,
          detachControllerView: attachController && !attachControllerView,
          disableDetachedChildrenTouchHandler,
          disableUIKitHostWindowAttachRefresh,
          emitOffWindowHostReady,
          ignoreHostReadyWindowAttachment,
          externalDetachedChildrenOwner,
          fabricLifecycleCallbacks:
            hasFabricLifecycleCallbacks ||
            props.fabricLifecycleCallbacks === true,
          immediateTransactionCommit: props.immediateTransactionCommit === true,
          deferTransactionCommitOnRemovals:
            props.deferTransactionCommitOnRemovals === true,
          nativeCommitObservations: props.nativeCommitObservations === true,
          mountChildrenDirectlyToChildrenView,
          layoutDirectChildrenToChildrenViewBounds,
          pinNativeViewToHost,
          preserveDetachedChildrenLayout,
          detachedChildrenContentOffsetX: detachedChildrenContentOffsetX ?? 0,
          detachedChildrenContentOffsetY: detachedChildrenContentOffsetY ?? 0,
          debugName,
          hostReadyId: hostId,
          hostId,
          mountedRevision:
            mountedHost != null && nativeHostRevision > 0
              ? nativeHostRevision
              : 0,
          nativeViewHandle: nativeViewHandle ?? "",
          childrenViewHandle: childrenViewHandle ?? "",
          controllerHandle: attachController ? (controllerHandle ?? "") : "",
          uikitHostPropsJson: nativeHostPropsJson ?? "",
          uikitHostPropsRevision: nativeHostPropsRevision,
          updateRevision: nativeHostPropsRevision,
        }
      : null;

    const applyHostHandles = (handles: UIKitHostHandles | null | undefined) => {
      if (handles == null) {
        return;
      }

      setNativeViewHandle((previous) =>
        previous === handles.nativeViewHandle
          ? previous
          : handles.nativeViewHandle,
      );
      setChildrenViewHandle((previous) =>
        previous === handles.childrenViewHandle
          ? previous
          : handles.childrenViewHandle,
      );
      setControllerHandle((previous) =>
        previous === handles.controllerHandle
          ? previous
          : handles.controllerHandle,
      );
    };

    const prepareUIKitHostOnUI = (
      currentProps: Readonly<Props & ViewProps>,
      currentPropsRevision: number | undefined,
      createImmediately: boolean,
    ): UIKitHostHandles | null => {
      "worklet";

      installUIKitNativeMountBridge();

      const existingHost = uikitHostRegistry().get(hostId);
      if (existingHost) {
        if (
          shouldApplyUIKitHostPropsRevision(
            existingHost.propsRevision,
            currentPropsRevision,
          )
        ) {
          existingHost.propsRef.current = currentProps;
          existingHost.propsRevision =
            currentPropsRevision ?? existingHost.propsRevision;
        }
        return uikitHostHandles(existingHost);
      }

      const registry = pendingUIKitHostRegistry();
      const pending = registry.get(hostId) as
        PendingUIKitHost<Props, NativeView> | undefined;
      const pendingPropsRef = pending?.propsRef ?? { current: currentProps };
      const pendingNativeMountInfoRef = pending?.nativeMountInfoRef ?? {
        current: null,
      };
      const shouldApplyPendingProps =
        !pending ||
        shouldApplyUIKitHostPropsRevision(
          pending.propsRevision,
          currentPropsRevision,
        );
      if (shouldApplyPendingProps) {
        pendingPropsRef.current = currentProps;
      }
      const pendingPropsRevision = shouldApplyPendingProps
        ? (currentPropsRevision ?? pending?.propsRevision)
        : pending?.propsRevision;

      const mountHost = () => {
        "worklet";

        const latest = pendingUIKitHostRegistry().get(hostId) as
          PendingUIKitHost<Props, NativeView> | undefined;
        const latestPropsRef = latest?.propsRef ?? pendingPropsRef;
        const nextProps = latestPropsRef.current;
        const nextPropsRevision = latest?.propsRevision ?? pendingPropsRevision;
        const context = createUIKitContext(
          debugName,
          latestPropsRef,
          ignoreUIKitLayoutInvalidation,
          latest?.nativeMountInfoRef ?? pendingNativeMountInfoRef,
        );
        const created = createHost(context.createArgument());
        const hostInstance = resolveHostInstance
          ? resolveHostInstance(created)
          : { hostView: created, lifecycleValue: created };
        const nativeView = hostInstance.lifecycleValue;
        updateHost?.(nativeView, nextProps, undefined, context);
        return {
          context,
          dispose(disposeProps: Readonly<Props & ViewProps>) {
            return disposeHost?.(nativeView, disposeProps, context);
          },
          mounted(mountedProps: Readonly<Props & ViewProps>) {
            mountedHost?.(nativeView, mountedProps, context);
          },
          hostInstance,
          nativeView,
          previousProps: nextProps,
          propsRevision: nextPropsRevision,
          propsRef: latestPropsRef,
          refresh(
            refreshProps: Readonly<Props & ViewProps>,
            previousProps: Readonly<Props & ViewProps> | undefined,
          ) {
            refreshHost?.(nativeView, refreshProps, previousProps, context);
          },
          hostReady(
            readyProps: Readonly<Props & ViewProps>,
            event: UIKitHostReadyEvent,
            previousProps: Readonly<Props & ViewProps> | undefined,
          ) {
            hostReadyHost?.(
              nativeView,
              readyProps,
              event,
              previousProps,
              context,
            );
          },
          transactionCommitted(
            transactionProps: Readonly<Props & ViewProps>,
            previousProps: Readonly<Props & ViewProps> | undefined,
          ) {
            transactionCommittedHost?.(
              nativeView,
              transactionProps,
              previousProps,
              context,
            );
          },
          mountingTransactionWillMount(
            transactionProps: Readonly<Props & ViewProps>,
            previousProps: Readonly<Props & ViewProps> | undefined,
          ) {
            mountingTransactionWillMountHost?.(
              nativeView,
              transactionProps,
              previousProps,
              context,
            );
          },
          mountingTransactionDidMount(
            transactionProps: Readonly<Props & ViewProps>,
            previousProps: Readonly<Props & ViewProps> | undefined,
          ) {
            mountingTransactionDidMountHost?.(
              nativeView,
              transactionProps,
              previousProps,
              context,
            );
          },
          mountChild(
            child: UIKitFabricMountedChild,
            childProps: Readonly<Props & ViewProps>,
            previousProps: Readonly<Props & ViewProps> | undefined,
          ) {
            mountChildHost?.(
              nativeView,
              child,
              childProps,
              previousProps,
              context,
            );
          },
          unmountChild(
            child: UIKitFabricMountedChild,
            childProps: Readonly<Props & ViewProps>,
            previousProps: Readonly<Props & ViewProps> | undefined,
          ) {
            unmountChildHost?.(
              nativeView,
              child,
              childProps,
              previousProps,
              context,
            );
          },
          update(
            updateProps: Readonly<Props & ViewProps>,
            previousProps: Readonly<Props & ViewProps> | undefined,
          ) {
            updateHost?.(nativeView, updateProps, previousProps, context);
          },
        };
      };

      registry.set(hostId, {
        debugName,
        mountHost,
        nativeMountInfoRef: pendingNativeMountInfoRef,
        propsRevision: pendingPropsRevision,
        propsRef: pendingPropsRef,
        requiresNativeMountInfo,
      });

      const replayedHandles = replayPendingNativeUIKitHostCreateRequest(hostId);
      if (replayedHandles != null) {
        return replayedHandles;
      }

      return createImmediately
        ? createRegisteredUIKitHostFromNative(hostId, undefined, false)
        : null;
    };

    const prepareAsyncKey = reactHostPropsRevision;
    // Native-mount-info hosts need their UI-runtime factory registered before
    // Fabric commits the component view. Native still performs create() with
    // the real Fabric handles; this only closes the pending-missing race.
    if (
      asyncPreparedHostRef.current == null ||
      asyncPreparedHostRef.current.propsRevision !== prepareAsyncKey
    ) {
      asyncPreparedHostRef.current = {
        propsRevision: prepareAsyncKey,
      };
      if (mountThroughNativeHost && requiresNativeMountInfo) {
        runOnUISync(
          prepareUIKitHostOnUI,
          uiRuntimeProps,
          reactHostPropsRevision,
          false,
        );
      } else {
        runOnUI(
          prepareUIKitHostOnUI,
          uiRuntimeProps,
          reactHostPropsRevision,
          false,
        )
          .then((handles) => {
            if (disposedRef.current) {
              return;
            }
            previousPropsRef.current = propsRef.current;
            applyHostHandles(handles);
            if (handles != null) {
              setNativeHostRevision((revision) => revision + 1);
            }
          })
          .catch((reason) => {
            setError(
              reason instanceof Error ? reason : new Error(String(reason)),
            );
          });
      }
    }

    const updateMeasuredSize = () => {
      if (
        (!mountThroughNativeHost && nativeViewHandle == null) ||
        layoutSizing === "fill"
      ) {
        return;
      }
      runOnUI(() => {
        const host = getRegisteredUIKitHost<NativeView>(hostId);
        return measureUIKitView(
          host.hostInstance.hostView,
          layout,
          nativeProps.style,
        );
      })
        .then((nextSize) => {
          setMeasuredSize((previous) =>
            previous &&
            previous.width === nextSize.width &&
            previous.height === nextSize.height
              ? previous
              : nextSize,
          );
        })
        .catch((reason) => {
          setError(
            reason instanceof Error ? reason : new Error(String(reason)),
          );
        });
    };
    updateMeasuredSizeRef.current = updateMeasuredSize;

    useImperativeHandle(
      ref,
      () => ({
        get nativeView() {
          return null;
        },
        runOnUI(callback) {
          return runOnUI(() => {
            const host = getRegisteredUIKitHost<NativeView>(hostId);
            return callback(host.nativeView);
          });
        },
        measureNative() {
          return runOnUI(() => {
            const host = getRegisteredUIKitHost<NativeView>(hostId);
            return measureUIKitView(
              host.hostInstance.hostView,
              layout,
              nativeProps.style,
            );
          });
        },
        invalidateNativeLayout() {
          updateMeasuredSize();
        },
      }),
      [hostId, layout, nativeProps.style],
    );

    useLayoutEffect(() => {
      disposedRef.current = false;
      let cancelled = false;

      ensureNativeScriptInstalled();

      if (mountThroughNativeHost) {
        const effectProps = uiRuntimeProps;
        const effectPropsRevision = reactHostPropsRevision;
        const bootstrapTag = findNodeHandle(nativeComponentRef.current);
        const bootstrapProps = nativeFabricHostProps;
        // NOTE: this used to also fire a synchronous runOnUISync(
        // applyUIKitHostPropsForFabricTagOnUI) bootstrap here. useLayoutEffect
        // always runs on the RN JS thread, and since the runtimeMutex_
        // lock-hierarchy fix (nativeScriptApplyUIKitHostPropsForFabricTag
        // dispatch_async-ing to main instead of blocking on it off-main),
        // that call could never receive real handles off-main -- it just
        // parked the JS thread on the worklet runtime mutex_ for as long as
        // main held it in the nav reconcile, then resolved null (a no-op).
        // The handles + the missing-host race-close are already owned by
        // the async prepare -> apply chain below plus the pending-create
        // replay (see createRegisteredUIKitHostFromNative /
        // replayPendingNativeUIKitHostCreateRequest), so the sync bootstrap
        // was dead weight and has been removed.
        runOnUI(prepareUIKitHostOnUI, effectProps, effectPropsRevision, false)
          .then((preparedHandles) => {
            if (typeof bootstrapTag !== "number" || bootstrapProps == null) {
              return preparedHandles;
            }
            // applyUIKitHostPropsForFabricTagOnUI now resolves null when it
            // runs off-main (it dispatches async-to-main instead of
            // blocking on it -- see the lock-hierarchy comment above and in
            // NativeScriptNativeApiModule.mm). Fall back to the handles we
            // already prepared so this bootstrap doesn't regress to no
            // handles at all; the real ones land via the update-effect
            // fallback below once the async main-thread apply completes.
            return runOnUI(
              applyUIKitHostPropsForFabricTagOnUI,
              bootstrapTag,
              bootstrapProps,
            ).then((h) => h ?? preparedHandles);
          })
          .then((handles) => {
            if (cancelled || disposedRef.current) {
              return;
            }
            previousPropsRef.current = propsRef.current;
            applyHostHandles(handles);
            if (handles != null) {
              setNativeHostRevision((revision) => revision + 1);
            }
            updateMeasuredSize();
          })
          .catch((reason) => {
            setError(
              reason instanceof Error ? reason : new Error(String(reason)),
            );
          });

        return () => {
          cancelled = true;
          disposedRef.current = true;
          mountedRef.current = false;
          const disposeProps = copyUIKitHostPropsForUI(
            propsRef.current,
          ) as Readonly<Props & UIKitHostViewProps>;
          runOnUI((currentProps) => {
            disposeRegisteredUIKitHost(hostId, currentProps);
          }, disposeProps).catch((reason) => {
            setError(
              reason instanceof Error ? reason : new Error(String(reason)),
            );
          });
        };
      }

      const effectProps = uiRuntimeProps;
      const effectPropsRevision = reactHostPropsRevision;
      runOnUI(prepareUIKitHostOnUI, effectProps, effectPropsRevision, true)
        .then((handles) => {
          if (handles == null) {
            throw new Error(`UIKit host ${hostId} was not created`);
          }
          if (cancelled || disposedRef.current) {
            const disposeProps = copyUIKitHostPropsForUI(
              propsRef.current,
            ) as Readonly<Props & UIKitHostViewProps>;
            runOnUI((currentProps) => {
              disposeRegisteredUIKitHost(hostId, currentProps);
            }, disposeProps).catch((reason) => {
              setError(
                reason instanceof Error ? reason : new Error(String(reason)),
              );
            });
            return;
          }
          previousPropsRef.current = propsRef.current;
          applyHostHandles(handles);
          updateMeasuredSize();
        })
        .catch((reason) => {
          setError(
            reason instanceof Error ? reason : new Error(String(reason)),
          );
        });

      return () => {
        cancelled = true;
        disposedRef.current = true;
        mountedRef.current = false;
        const disposeProps = copyUIKitHostPropsForUI(
          propsRef.current,
        ) as Readonly<Props & UIKitHostViewProps>;
        runOnUI((currentProps) => {
          disposeRegisteredUIKitHost(hostId, currentProps);
        }, disposeProps).catch((reason) => {
          setError(
            reason instanceof Error ? reason : new Error(String(reason)),
          );
        });
      };
    }, [
      createHost,
      debugName,
      disposeHost,
      hostId,
      mountedHost,
      mountThroughNativeHost,
      refreshHost,
      hostReadyHost,
      mountingTransactionDidMountHost,
      mountingTransactionWillMountHost,
      mountChildHost,
      requiresNativeMountInfo,
      resolveHostInstance,
      transactionCommittedHost,
      unmountChildHost,
      updateHost,
    ]);

    useLayoutEffect(() => {
      if (nativeViewHandle == null && !mountThroughNativeHost) {
        return;
      }

      const currentProps = uiRuntimeProps;
      const previousProps = previousPropsRef.current;
      previousPropsRef.current = currentProps;

      if (mountThroughNativeHost) {
        const currentPropsRevision = reactHostPropsRevision;
        const currentNativePropsRevision = nativeHostPropsRevision;
        const bootstrapTag = findNodeHandle(nativeComponentRef.current);
        const bootstrapProps = nativeFabricHostProps;
        runOnUI(
          (
            nextProps,
            fallbackPreviousProps,
            nextPropsRevision,
            nextNativeRevision,
            reactTag,
            nextNativeProps,
          ) => {
            let nativeHandles: UIKitHostHandles | null = null;
            if (typeof reactTag === "number" && nextNativeProps != null) {
              nativeHandles = applyUIKitHostPropsForFabricTagOnUI(
                reactTag,
                nextNativeProps,
              );
            }
            const didApplyProps = syncUIKitHostPropsFromReact(
              hostId,
              nextProps,
              nextPropsRevision,
            );
            const host = ensureRegisteredUIKitHost<NativeView>(hostId);
            if (!host) {
              return null;
            }

            // Lever 2: only invoke host.update()/commitUIKitHostFabricTransaction
            // (and therefore the fork's native update/reconcile handlers) when
            // the SERIALIZABLE native payload actually advanced. Gating on
            // "this component merely HAS function props" (the old
            // shouldUpdateNativeHostFromReactProps check) fired this branch on
            // every function-identity-only re-render -- Animated.event/inline
            // react-navigation handlers are recreated every render -- even
            // when nothing serializable changed. Confirmed via runtime probe:
            // this fired + reached this branch on every observed pop cycle
            // with the native (serializable) revision static, driving a
            // same-commit spurious reconcile in the fork's screen update()
            // handler during the pop commit window. Real prop changes still
            // update exactly once, since nativeHostPropsRevision only bumps
            // on a genuine serializable change (index.ts ~5880-5892).
            // Identity-only churn still runs syncUIKitHostPropsFromReact
            // above (propsRef refresh) so live callbacks stay fresh -- it
            // just skips this branch.
            const nativeRevisionAdvanced = shouldApplyUIKitHostPropsRevision(
              host.updateAppliedNativeRevision,
              nextNativeRevision,
            );
            if (didApplyProps && nativeRevisionAdvanced) {
              const updatePreviousProps =
                host.previousProps ?? fallbackPreviousProps;
              host.update?.(nextProps, updatePreviousProps);
              commitUIKitHostFabricTransaction(
                host,
                nextProps,
                updatePreviousProps,
                {
                  children: [],
                  hasModifiedChildren: false,
                  hasModifiedProps: true,
                  mutations: [],
                },
              );
              host.previousProps = nextProps;
              host.propsRevision = nextPropsRevision ?? host.propsRevision;
              host.updateAppliedNativeRevision =
                nextNativeRevision ?? host.updateAppliedNativeRevision;
            }

            return nativeHandles ?? uikitHostHandles(host);
          },
          currentProps,
          previousProps,
          currentPropsRevision,
          currentNativePropsRevision,
          bootstrapTag,
          bootstrapProps,
        )
          .then((handles) => {
            // Bug B fix: apply host handles UNCONDITIONALLY (restore
            // pre-3fd29322 behavior). 3fd29322 had gated this on
            // `layoutSizing !== "fill"`, which starved fill-sizing hosts
            // (the thin adapter's screen/modal hosts) of the per-commit
            // handle feedback loop -- their childrenViewHandle never
            // converged in JS state, so the React content subtree never
            // mounted into controller.view (blank Detail/Modal). The
            // applyHostHandles setters (~5966-5986) are identity-guarded,
            // so unconditional application does NOT create a re-render
            // loop. This is NOT the Lever 2 update-gating path (that stays
            // gated on nativeRevisionAdvanced above, ~6472-6495).
            applyHostHandles(handles);
          })
          .catch((reason) => {
            setError(
              reason instanceof Error ? reason : new Error(String(reason)),
            );
          });
        updateMeasuredSize();
        return;
      }

      runOnUI(
        (nextProps, fallbackPreviousProps, nextPropsRevision) => {
          const host = ensureRegisteredUIKitHost<NativeView>(hostId);
          if (!host) {
            return;
          }
          if (
            !shouldApplyUIKitHostPropsRevision(
              host.propsRevision,
              nextPropsRevision,
            )
          ) {
            return;
          }
          host.propsRef.current = nextProps;
          host.propsRevision = nextPropsRevision ?? host.propsRevision;
          updateHost?.(
            host.nativeView,
            nextProps,
            host.previousProps ?? fallbackPreviousProps,
            host.context,
          );
          host.previousProps = nextProps;
        },
        currentProps,
        previousProps,
        reactHostPropsRevision,
      ).catch((reason) => {
        setError(reason instanceof Error ? reason : new Error(String(reason)));
      });
      updateMeasuredSize();
    }, [
      hostId,
      mountThroughNativeHost,
      nativeViewHandle,
      reactHostPropsRevision,
      updateHost,
    ]);

    useEffect(() => {
      if (
        mountedRef.current ||
        (nativeViewHandle == null && !mountThroughNativeHost)
      ) {
        return;
      }

      if (mountThroughNativeHost) {
        mountedRef.current = true;
        return;
      }

      mountedRef.current = true;
      const currentProps = propsRef.current;
      const isDisposed = disposedRef.current;
      runOnUI(
        (nextProps, shouldSkipMounted) => {
          if (!shouldSkipMounted) {
            const host = ensureRegisteredUIKitHost<NativeView>(hostId);
            if (!host) {
              return;
            }
            host.propsRef.current = nextProps;
            mountedHost?.(host.nativeView, nextProps, host.context);
          }
        },
        currentProps,
        isDisposed,
      ).catch((reason) => {
        setError(reason instanceof Error ? reason : new Error(String(reason)));
      });
    }, [hostId, mountedHost, mountThroughNativeHost, nativeViewHandle]);

    if (error) {
      throw error;
    }

    const layoutStyle =
      measuredSize && layoutSizing !== "fill"
        ? {
            width: measuredSize.width,
            height: measuredSize.height,
          }
        : undefined;
    const { children, ...nativePropsWithoutChildren } =
      nativeProps as ViewProps & { children?: React.ReactNode };

    return React.createElement(
      NativeScriptUIViewNativeComponent,
      {
        ...nativePropsWithoutChildren,
        ref: nativeComponentRef,
        collapsable: false,
        collapsableChildren: false,
        nativeID: nativeProps.nativeID ?? hostId,
        pointerEvents: nativeProps.pointerEvents ?? "box-none",
        childrenViewHandle,
        controllerHandle: attachController ? controllerHandle : undefined,
        adoptHostViewAsControllerView: adoptHostViewAsControllerView
          ? true
          : undefined,
        attachNativeView,
        attachControllerToParent: attachController
          ? attachControllerToParent
          : undefined,
        collectChildren,
        detachControllerFromParent:
          attachController && detachControllerFromParent ? true : undefined,
        detachControllerView:
          attachController && !attachControllerView ? true : undefined,
        disableDetachedChildrenTouchHandler,
        disableUIKitHostWindowAttachRefresh,
        emitOffWindowHostReady,
        ignoreHostReadyWindowAttachment,
        externalDetachedChildrenOwner,
        fabricLifecycleCallbacks: hasFabricLifecycleCallbacks
          ? true
          : props.fabricLifecycleCallbacks === true
            ? true
            : undefined,
        immediateTransactionCommit:
          props.immediateTransactionCommit === true ? true : undefined,
        deferTransactionCommitOnRemovals:
          props.deferTransactionCommitOnRemovals === true ? true : undefined,
        nativeCommitObservations:
          props.nativeCommitObservations === true ? true : undefined,
        mountChildrenDirectlyToChildrenView,
        layoutDirectChildrenToChildrenViewBounds,
        pinNativeViewToHost,
        preserveDetachedChildrenLayout,
        detachedChildrenContentOffsetX,
        detachedChildrenContentOffsetY,
        debugName,
        hostReadyId: hostId,
        hostId: mountThroughNativeHost ? hostId : undefined,
        mountedRevision:
          mountThroughNativeHost &&
          mountedHost != null &&
          nativeHostRevision > 0
            ? nativeHostRevision
            : undefined,
        nativeViewHandle,
        style: layoutStyle
          ? [nativeProps.style, layoutStyle]
          : nativeProps.style,
        uikitHostPropsJson:
          mountThroughNativeHost && nativeHostPropsJson != null
            ? nativeHostPropsJson
            : undefined,
        uikitHostPropsRevision: mountThroughNativeHost
          ? nativeHostPropsRevision
          : undefined,
        updateRevision: mountThroughNativeHost
          ? nativeHostPropsRevision
          : undefined,
      },
      children,
    );
  });

  Component.displayName =
    definition.displayName || definition.name || debugName;
  return Component;
}

/**
 * Wrap a single native `UIView` as a React component. `create` returns the view;
 * lifecycle hooks and `ctx` run on the UI runtime. RN view props go to the host,
 * your props to the definition. See {@link UIKitViewDefinition}.
 */
export function defineUIKitView<Props extends object, NativeView = unknown>(
  definition: UIKitViewDefinition<Props, NativeView>,
): UIKitViewComponent<Props, NativeView> {
  return defineUIKitHost(definition);
}

/**
 * Wrap a native `UIView` that hosts RN children. `create` returns
 * `{ rootView, childrenView }`; React Native children mount into `childrenView`.
 */
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
      "worklet";

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

/**
 * Wrap a real `UIViewController` for APIs that need view-controller containment
 * (tabs, navigation, split views, presentations). `createController` returns the
 * controller; the engine handles child-controller attachment.
 */
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
      "worklet";

      const controllerRecord = controller as Record<string, unknown>;
      return {
        hostView: definition.hostView?.(controller) ?? controllerRecord.view,
        lifecycleValue: controller,
        childrenView: definition.childrenView?.(controller),
        controller,
      };
    },
  } as UIKitAdapterDefinition<Props, Controller>);
}

const NativeScript = {
  init,
  defineUIKitView,
  defineUIKitContainer,
  defineUIViewController,
  createDelegate,
  runOnUI,
  registerUIRuntimeGlobal,
  dispatchAsyncOnMainQueue,
  nativeMethodPolicy,
  getClass,
  isClassAvailable,
  loadFramework,
  nativeHandleForObject,
  nativeObjectFromHandle,
  invokeObjCSelector,
  nativeArrayLength,
  nativeArrayItem,
  nativeSubviews,
  collectedUIKitHostChildren,
  uikitHostHandlesForView,
  refreshUIKitHostView,
  notifyUIKitAccessibilityLayoutChanged,
  reactNativeFabricViewLayoutTraits,
  reactNativeFabricViewLayoutTraitsForHandle,
};

export default NativeScript;

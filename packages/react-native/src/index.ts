import NativeScriptNativeApi from './NativeScriptNativeApi';

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

const NativeScript = {
  init,
  install,
  installGlobals,
  isInstalled,
  defaultMetadataPath,
  getRuntimeBackend,
  runOnUI,
};

export default NativeScript;

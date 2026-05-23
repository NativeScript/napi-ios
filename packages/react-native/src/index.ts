import NativeScriptNativeApi from './NativeScriptNativeApi';

type NativeApiHost = {
  metadata?: {
    classNames?: () => string[];
    functionNames?: () => string[];
  };
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
) {
  if (!name || name in globalThis) {
    return;
  }

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

  return true;
}

export function init(
  metadataPath = '',
  options: InstallOptions = {},
): boolean {
  const installed = NativeScriptNativeApi.install(metadataPath);
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

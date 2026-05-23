import NativeScriptNativeApi from './NativeScriptNativeApi';

export function install(metadataPath = ''): boolean {
  return NativeScriptNativeApi.install(metadataPath);
}

export function isInstalled(): boolean {
  return NativeScriptNativeApi.isInstalled();
}

export function defaultMetadataPath(): string {
  return NativeScriptNativeApi.defaultMetadataPath();
}

export function getRuntimeBackend(): string {
  return NativeScriptNativeApi.getRuntimeBackend();
}

export default {
  install,
  isInstalled,
  defaultMetadataPath,
  getRuntimeBackend,
};

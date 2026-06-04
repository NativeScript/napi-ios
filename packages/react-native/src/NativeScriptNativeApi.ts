import type {TurboModule} from 'react-native';
import type {UnsafeObject} from 'react-native/Libraries/Types/CodegenTypes';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  readonly install: (metadataPath: string) => boolean;
  readonly installWorkletRuntime: (
    runtimeHolder: UnsafeObject,
    metadataPath: string,
  ) => boolean;
  readonly isInstalled: () => boolean;
  readonly defaultMetadataPath: () => string;
  readonly getRuntimeBackend: () => string;
  readonly __writeTestMarker: (content: string) => boolean;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeScriptNativeApi');

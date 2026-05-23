import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  readonly install: (metadataPath: string) => boolean;
  readonly isInstalled: () => boolean;
  readonly defaultMetadataPath: () => string;
  readonly getRuntimeBackend: () => string;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeScriptNativeApi');

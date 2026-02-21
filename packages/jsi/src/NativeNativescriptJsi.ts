import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  multiply(a: number, b: number): number;
  getArch(): string;
  getMainBundleResourcePath(): string;
  nativescript_init(metadata_path: string | null): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativescriptJsi');

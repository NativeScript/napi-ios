/// <reference path="../types/ios/index.d.ts" />

export type NativeApiHost = {
  runtime?: string;
  backend?: string;
  metadata?: {
    classes?: number;
    functions?: number;
    constants?: number;
    protocols?: number;
    enums?: number;
    classNames?: () => string[];
    functionNames?: () => string[];
    constantNames?: () => string[];
    enumNames?: () => string[];
  };
  runOnUI?: (callback?: () => void) => Promise<void>;
  [name: string]: unknown;
};

export type InstallOptions = {
  globals?: boolean;
};

export function init(metadataPath?: string, options?: InstallOptions): boolean;
export const install: typeof init;
export function installGlobals(): boolean;
export function isInstalled(): boolean;
export function defaultMetadataPath(): string;
export function getRuntimeBackend(): string;
export function runOnUI(callback?: () => void): Promise<void>;

declare const NativeScript: {
  init: typeof init;
  install: typeof install;
  installGlobals: typeof installGlobals;
  isInstalled: typeof isInstalled;
  defaultMetadataPath: typeof defaultMetadataPath;
  getRuntimeBackend: typeof getRuntimeBackend;
  runOnUI: typeof runOnUI;
};

export default NativeScript;

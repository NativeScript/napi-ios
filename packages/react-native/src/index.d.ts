/// <reference path="../types/ios/index.d.ts" />

import type {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
import type {ViewProps} from 'react-native';

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
  /**
   * Human-readable name for this UIKit view definition. This names the JS
   * wrapper when displayName is omitted and is forwarded to the shared native
   * host view as a debug name. It does not change the RN host component tag.
   */
  name?: string;
  /**
   * Explicit native debug name for the shared host view. Use this when the
   * native inspector name should differ from the JS wrapper displayName.
   */
  debugName?: string;
  /**
   * React component display name. When name/debugName are omitted, this is also
   * used as the native debug name.
   */
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

export function init(metadataPath?: string, options?: InstallOptions): boolean;
export const install: typeof init;
export function installGlobals(): boolean;
export function isInstalled(): boolean;
export function defaultMetadataPath(): string;
export function getRuntimeBackend(): string;
export function runOnUI(callback?: () => void): Promise<void>;
export function defineUIKitView<Props extends object, NativeView = unknown>(
  definition: UIKitViewDefinition<Props, NativeView>,
): UIKitViewComponent<Props, NativeView>;

declare const NativeScript: {
  init: typeof init;
  install: typeof install;
  installGlobals: typeof installGlobals;
  isInstalled: typeof isInstalled;
  defaultMetadataPath: typeof defaultMetadataPath;
  defineUIKitView: typeof defineUIKitView;
  getRuntimeBackend: typeof getRuntimeBackend;
  runOnUI: typeof runOnUI;
};

export default NativeScript;

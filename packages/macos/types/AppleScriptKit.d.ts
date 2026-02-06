/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare class ASKPluginObject extends NSObject {
  static pluginDidLoad(bundle: NSBundle): void;
}


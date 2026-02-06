/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare class ASIdentifierManager extends NSObject {
  static sharedManager(): ASIdentifierManager;

  readonly advertisingIdentifier: NSUUID;

  readonly advertisingTrackingEnabled: boolean;

  isAdvertisingTrackingEnabled(): boolean;
}


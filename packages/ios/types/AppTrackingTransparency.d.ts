/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const ATTrackingManagerAuthorizationStatus: {
  NotDetermined: 0,
  Restricted: 1,
  Denied: 2,
  Authorized: 3,
};

declare class ATTrackingManager extends NSObject {
  static readonly trackingAuthorizationStatus: interop.Enum<typeof ATTrackingManagerAuthorizationStatus>;

  static requestTrackingAuthorizationWithCompletionHandler(completion: (p1: interop.Enum<typeof ATTrackingManagerAuthorizationStatus>) => void): void;
}


/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const ADClientErrorDomain: string;

declare const ADClientError: {
  Unknown: 0,
  TrackingRestrictedOrDenied: 1,
  LimitAdTracking: 1,
  MissingData: 2,
  CorruptResponse: 3,
  RequestClientError: 4,
  RequestServerError: 5,
  RequestNetworkError: 6,
  UnsupportedPlatform: 7,
};

declare class ADClient extends NSObject {
  static sharedClient(): ADClient;

  requestAttributionDetailsWithBlock(completionHandler: (p1: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, p2: NSError) => void | null): void;
}


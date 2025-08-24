/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const AAAttributionErrorDomain: string;

declare const AAAttributionErrorCode: {
  NetworkError: 1,
  InternalError: 2,
  PlatformNotSupported: 3,
};

declare class AAAttribution extends NSObject {
  static attributionTokenWithError(error: interop.PointerConvertible): string;
}


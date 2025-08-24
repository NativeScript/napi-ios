/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const APActivationPayloadErrorDomain: string;

declare const APActivationPayloadErrorCode: {
  Disallowed: 1,
  DoesNotMatch: 2,
};

declare class APActivationPayload extends NSObject implements NSSecureCoding, NSCopying {
  readonly URL: NSURL;

  confirmAcquiredInRegionCompletionHandler(region: CLRegion, completionHandler: (p1: boolean, p2: NSError) => void | null): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}


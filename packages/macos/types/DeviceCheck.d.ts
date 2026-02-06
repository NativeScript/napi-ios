/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const DCErrorDomain: string;

declare const DCError: {
  UnknownSystemFailure: 0,
  FeatureUnsupported: 1,
  InvalidInput: 2,
  InvalidKey: 3,
  ServerUnavailable: 4,
};

declare class DCAppAttestService extends NSObject {
  static readonly sharedService: DCAppAttestService;

  readonly supported: boolean;

  generateKeyWithCompletionHandler(completionHandler: (p1: string, p2: NSError) => void | null): void;

  attestKeyClientDataHashCompletionHandler(keyId: string, clientDataHash: NSData, completionHandler: (p1: NSData, p2: NSError) => void | null): void;

  generateAssertionClientDataHashCompletionHandler(keyId: string, clientDataHash: NSData, completionHandler: (p1: NSData, p2: NSError) => void | null): void;

  isSupported(): boolean;
}

declare class DCDevice extends NSObject {
  static readonly currentDevice: DCDevice;

  readonly supported: boolean;

  generateTokenWithCompletionHandler(completion: (p1: NSData, p2: NSError) => void | null): void;

  isSupported(): boolean;
}


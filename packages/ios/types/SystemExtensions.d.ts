/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const OSSystemExtensionErrorDomain: string;

declare const NSSystemExtensionUsageDescriptionKey: string;

declare const OSBundleUsageDescriptionKey: string;

declare const OSSystemExtensionErrorCode: {
  Unknown: 1,
  MissingEntitlement: 2,
  UnsupportedParentBundleLocation: 3,
  ExtensionNotFound: 4,
  ExtensionMissingIdentifier: 5,
  DuplicateExtensionIdentifer: 6,
  UnknownExtensionCategory: 7,
  CodeSignatureInvalid: 8,
  ValidationFailed: 9,
  ForbiddenBySystemPolicy: 10,
  RequestCanceled: 11,
  RequestSuperseded: 12,
  AuthorizationRequired: 13,
};

declare class OSSystemExtensionProperties extends NSObject {
  readonly bundleIdentifier: string;

  readonly bundleVersion: string;

  readonly bundleShortVersion: string;

  readonly isEnabled: boolean;
}

declare class OSSystemExtensionsWorkspace extends NSObject {
  static readonly sharedWorkspace: OSSystemExtensionsWorkspace;

  systemExtensionsForApplicationWithBundleIDError(bundleID: string, out_error: interop.PointerConvertible): NSSet;
}


/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare class SFAuthorization extends NSObject implements NSSecureCoding {
  static authorization(): interop.Object;

  authorizationRef(): interop.Pointer;

  static authorizationWithFlagsRightsEnvironment(flags: interop.Enum<typeof AuthorizationFlags>, rights: interop.PointerConvertible, environment: interop.PointerConvertible): interop.Object;

  initWithFlagsRightsEnvironment(flags: interop.Enum<typeof AuthorizationFlags>, rights: interop.PointerConvertible, environment: interop.PointerConvertible): this;

  init(): this;

  invalidateCredentials(): void;

  obtainWithRightFlagsError(rightName: string, flags: interop.Enum<typeof AuthorizationFlags>, error: interop.PointerConvertible): boolean;

  obtainWithRightsFlagsEnvironmentAuthorizedRightsError(rights: interop.PointerConvertible, flags: interop.Enum<typeof AuthorizationFlags>, environment: interop.PointerConvertible, authorizedRights: interop.PointerConvertible, error: interop.PointerConvertible): boolean;

  permitWithRightsFlagsEnvironmentAuthorizedRights(rights: interop.PointerConvertible, flags: interop.Enum<typeof AuthorizationFlags>, environment: interop.PointerConvertible, authorizedRights: interop.PointerConvertible): number;

  permitWithRightFlags(rightName: string, flags: interop.Enum<typeof AuthorizationFlags>): number;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}


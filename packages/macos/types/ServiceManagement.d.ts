/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const kSMDomainSystemLaunchd: interop.Pointer;

declare const kSMErrorLaunchDeniedByUser: number;

declare const kSMErrorInvalidPlist: number;

declare const kSMErrorJobPlistNotFound: number;

declare const kSMErrorJobNotFound: number;

declare const kSMErrorAuthorizationFailure: number;

declare const kSMErrorInternalFailure: number;

declare const kSMErrorDomainFramework: interop.Pointer;

declare const SMAppServiceErrorDomain: string;

declare const kSMDomainUserLaunchd: interop.Pointer;

declare const kSMErrorDomainLaunchd: interop.Pointer;

declare const kSMErrorAlreadyRegistered: number;

declare const kSMErrorServiceUnavailable: number;

declare const kSMErrorDomainIPC: interop.Pointer;

declare const kSMErrorJobMustBeEnabled: number;

declare const kSMErrorToolNotValid: number;

declare const kSMErrorInvalidSignature: number;

declare const SMAppServiceStatus: {
  NotRegistered: 0,
  Enabled: 1,
  RequiresApproval: 2,
  NotFound: 3,
};

declare function SMLoginItemSetEnabled(identifier: interop.Object, enabled: number): number;

declare function SMJobCopyDictionary(domain: interop.Object, jobLabel: interop.Object): interop.Object;

declare function SMCopyAllJobDictionaries(domain: interop.Object): interop.Object;

declare function SMJobSubmit(domain: interop.Object, job: interop.Object, auth: interop.PointerConvertible, outError: interop.PointerConvertible): number;

declare function SMJobRemove(domain: interop.Object, jobLabel: interop.Object, auth: interop.PointerConvertible, wait: number, outError: interop.PointerConvertible): number;

declare function SMJobBless(domain: interop.Object, executableLabel: interop.Object, auth: interop.PointerConvertible, outError: interop.PointerConvertible): number;

declare class SMAppService extends NSObject {
  static loginItemServiceWithIdentifier<This extends abstract new (...args: any) => any>(this: This, identifier: string): InstanceType<This>;

  static readonly mainAppService: SMAppService;

  static agentServiceWithPlistName<This extends abstract new (...args: any) => any>(this: This, plistName: string): InstanceType<This>;

  static daemonServiceWithPlistName<This extends abstract new (...args: any) => any>(this: This, plistName: string): InstanceType<This>;

  registerAndReturnError(error: interop.PointerConvertible): boolean;

  unregisterAndReturnError(error: interop.PointerConvertible): boolean;

  unregisterWithCompletionHandler(handler: (p1: NSError) => void | null): void;

  readonly status: interop.Enum<typeof SMAppServiceStatus>;

  static statusForLegacyURL(url: NSURL): interop.Enum<typeof SMAppServiceStatus>;

  static openSystemSettingsLoginItems(): void;
}


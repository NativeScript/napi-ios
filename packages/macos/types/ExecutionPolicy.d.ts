/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const EPErrorDomain: string;

declare const EPError: {
  Generic: 1,
  NotADeveloperTool: 2,
};

declare const EPDeveloperToolStatus: {
  NotDetermined: 0,
  Restricted: 1,
  Denied: 2,
  Authorized: 3,
};

declare class EPDeveloperTool extends NSObject {
  init(): this;

  readonly authorizationStatus: interop.Enum<typeof EPDeveloperToolStatus>;

  requestDeveloperToolAccessWithCompletionHandler(handler: (p1: boolean) => void): void;
}

declare class EPExecutionPolicy extends NSObject {
  init(): this;

  addPolicyExceptionForURLError(url: NSURL, error: interop.PointerConvertible): boolean;
}


/// <reference types="@nativescript/objc-node-api" />

declare const kCTErrorDomainPOSIX: number;

declare const kCTErrorDomainNoError: number;

declare const kCTErrorDomainMach: number;

declare const CTCellularPlanCapability: {
  Only: 0,
  AndVoice: 1,
};

declare const CTCellularPlanProvisioningAddPlanResult: {
  Unknown: 0,
  Fail: 1,
  Success: 2,
  Cancel: 3,
};

declare const CTCellularDataRestrictedState: {
  RestrictedStateUnknown: 0,
  Restricted: 1,
  NotRestricted: 2,
};

declare class CTError {
  constructor(init?: CTError);
  domain: number;
  error: number;
}


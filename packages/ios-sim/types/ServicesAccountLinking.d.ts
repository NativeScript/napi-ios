/// <reference types="@nativescript/objc-node-api" />

declare const ServicesAccountLinkingVersionString: interop.Pointer;

declare const SALRegistrationErrorDomain: string;

declare const ServicesAccountLinkingVersionNumber: number;

declare const SALRegistrationError: {
  NotEligible: 0,
  Failed: 1,
};

declare class SALResellerAccount {
  constructor(init?: SALResellerAccount);
  _reserved: interop.Pointer;
}


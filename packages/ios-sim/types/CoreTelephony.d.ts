/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const CTCallStateDisconnected: string;

declare const CTCallStateConnected: string;

declare const CTCallStateIncoming: string;

declare const CTSubscriberTokenRefreshed: string;

declare const CTRadioAccessTechnologyNRNSA: string;

declare const CTRadioAccessTechnologyLTE: string;

declare const CTRadioAccessTechnologyeHRPD: string;

declare const CTRadioAccessTechnologyCDMAEVDORev0: string;

declare const CTRadioAccessTechnologyCDMA1x: string;

declare const CTRadioAccessTechnologyHSUPA: string;

declare const CTRadioAccessTechnologyHSDPA: string;

declare const CTRadioAccessTechnologyWCDMA: string;

declare const CTRadioAccessTechnologyDidChangeNotification: string;

declare const kCTErrorDomainNoError: number;

declare const CTRadioAccessTechnologyEdge: string;

declare const kCTErrorDomainPOSIX: number;

declare const kCTErrorDomainMach: number;

declare const CTRadioAccessTechnologyNR: string;

declare const CTServiceRadioAccessTechnologyDidChangeNotification: string;

declare const CTRadioAccessTechnologyCDMAEVDORevA: string;

declare const CTRadioAccessTechnologyCDMAEVDORevB: string;

declare const CTRadioAccessTechnologyGPRS: string;

declare const CTCallStateDialing: string;

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

declare interface CTTelephonyNetworkInfoDelegate extends NSObjectProtocol {
  dataServiceIdentifierDidChange?(identifier: string): void;
}

declare class CTTelephonyNetworkInfoDelegate extends NativeObject implements CTTelephonyNetworkInfoDelegate {
}

declare interface CTSubscriberDelegate {
  subscriberTokenRefreshed(subscriber: CTSubscriber): void;
}

declare class CTSubscriberDelegate extends NativeObject implements CTSubscriberDelegate {
}

declare class CTCarrier extends NSObject {
  readonly carrierName: string;

  readonly mobileCountryCode: string;

  readonly mobileNetworkCode: string;

  readonly isoCountryCode: string;

  readonly allowsVOIP: boolean;
}

declare class CTCall extends NSObject {
  readonly callState: string;

  readonly callID: string;
}

declare class CTSubscriberInfo extends NSObject {
  static subscribers(): NSArray;

  static subscriber(): CTSubscriber;
}

declare class CTSubscriber extends NSObject {
  readonly carrierToken: NSData;

  refreshCarrierToken(): boolean;

  readonly identifier: string;

  readonly SIMInserted: boolean;

  delegate: CTSubscriberDelegate;

  isSIMInserted(): boolean;

  setDelegate(delegate: CTSubscriberDelegate): void;
}

declare class CTCellularPlanProvisioningRequest extends NSObject implements NSSecureCoding {
  address: string;

  matchingID: string;

  OID: string;

  confirmationCode: string;

  ICCID: string;

  EID: string;

  setAddress(address: string): void;

  setMatchingID(matchingID: string | null): void;

  setOID(OID: string | null): void;

  setConfirmationCode(confirmationCode: string | null): void;

  setICCID(ICCID: string | null): void;

  setEID(EID: string | null): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CTCellularData extends NSObject {
  cellularDataRestrictionDidUpdateNotifier: (p1: interop.Enum<typeof CTCellularDataRestrictedState>) => void;

  readonly restrictedState: interop.Enum<typeof CTCellularDataRestrictedState>;

  setCellularDataRestrictionDidUpdateNotifier(cellularDataRestrictionDidUpdateNotifier: (p1: interop.Enum<typeof CTCellularDataRestrictedState>) => void): void;
}

declare class CTTelephonyNetworkInfo extends NSObject {
  readonly dataServiceIdentifier: string;

  delegate: CTTelephonyNetworkInfoDelegate;

  readonly serviceSubscriberCellularProviders: NSDictionary;

  readonly subscriberCellularProvider: CTCarrier;

  serviceSubscriberCellularProvidersDidUpdateNotifier: (p1: string) => void;

  subscriberCellularProviderDidUpdateNotifier: (p1: CTCarrier) => void;

  readonly serviceCurrentRadioAccessTechnology: NSDictionary;

  readonly currentRadioAccessTechnology: string;

  setDelegate(delegate: CTTelephonyNetworkInfoDelegate | null): void;

  setServiceSubscriberCellularProvidersDidUpdateNotifier(serviceSubscriberCellularProvidersDidUpdateNotifier: (p1: string) => void | null): void;

  setSubscriberCellularProviderDidUpdateNotifier(subscriberCellularProviderDidUpdateNotifier: (p1: CTCarrier) => void): void;
}

declare class CTCellularPlanProvisioning extends NSObject {
  readonly supportsEmbeddedSIM: boolean;

  supportsCellularPlan(): boolean;

  addPlanWithCompletionHandler(request: CTCellularPlanProvisioningRequest, completionHandler: (p1: interop.Enum<typeof CTCellularPlanProvisioningAddPlanResult>) => void): void;
}

declare class CTCallCenter extends NSObject {
  readonly currentCalls: NSSet;

  callEventHandler: (p1: CTCall) => void;

  setCallEventHandler(callEventHandler: (p1: CTCall) => void): void;
}


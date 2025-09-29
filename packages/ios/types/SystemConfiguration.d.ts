/// <reference types="@nativescript/objc-node-api" />

declare const kCNNetworkInfoKeySSID: interop.Pointer;

declare const kCFErrorDomainSystemConfiguration: interop.Pointer;

declare const kSCNetworkFlagsIsDirect: number;

declare const kSCNetworkFlagsIsLocalAddress: number;

declare const kSCNetworkFlagsInterventionRequired: number;

declare const kSCNetworkFlagsConnectionRequired: number;

declare const kSCNetworkFlagsReachable: number;

declare const kSCBondStatusNoPartner: number;

declare const kSCBondStatusOK: number;

declare const kSCStatusReachabilityUnknown: number;

declare const kSCStatusStale: number;

declare const kSCStatusNoConfigFile: number;

declare const kSCStatusPrefsBusy: number;

declare const kSCStatusNoPrefsSession: number;

declare const kSCStatusNotifierActive: number;

declare const kSCStatusNoStoreSession: number;

declare const kSCStatusNeedLock: number;

declare const kSCStatusLocked: number;

declare const kSCStatusInvalidArgument: number;

declare const kSCStatusFailed: number;

declare const kSCBondStatusLinkInvalid: number;

declare const kSCStatusKeyExists: number;

declare const kSCStatusOK: number;

declare const kSCStatusNoLink: number;

declare const kCNNetworkInfoKeyBSSID: interop.Pointer;

declare const kSCNetworkFlagsTransientConnection: number;

declare const kSCStatusAccessError: number;

declare const kSCBondStatusNotInActiveGroup: number;

declare const kSCBondStatusUnknown: number;

declare const kSCStatusMaxLink: number;

declare const kSCStatusNoStoreServer: number;

declare const kSCNetworkFlagsConnectionAutomatic: number;

declare const kCNNetworkInfoKeySSIDData: interop.Pointer;

declare const kSCStatusNoKey: number;

declare const SCNetworkReachabilityFlags: {
  TransientConnection: 1,
  Reachable: 2,
  ConnectionRequired: 4,
  ConnectionOnTraffic: 8,
  InterventionRequired: 16,
  ConnectionOnDemand: 32,
  IsLocalAddress: 65536,
  IsDirect: 131072,
  IsWWAN: 262144,
  ConnectionAutomatic: 8,
};

declare const SCNetworkConnectionStatus: {
  Invalid: -1,
  Disconnected: 0,
  Connecting: 1,
  Connected: 2,
  Disconnecting: 3,
};

declare const SCNetworkConnectionPPPStatus: {
  Disconnected: 0,
  Initializing: 1,
  ConnectingLink: 2,
  DialOnTraffic: 3,
  NegotiatingLink: 4,
  Authenticating: 5,
  WaitingForCallBack: 6,
  NegotiatingNetwork: 7,
  Connected: 8,
  Terminating: 9,
  DisconnectingLink: 10,
  HoldingLinkOff: 11,
  Suspended: 12,
  WaitingForRedial: 13,
};

declare class SCNetworkReachabilityContext {
  constructor(init?: SCNetworkReachabilityContext);
  version: number;
  info: interop.Pointer;
  retain: (p1: interop.PointerConvertible) => interop.Pointer | null;
  release: (p1: interop.PointerConvertible) => void | null;
  copyDescription: (p1: interop.PointerConvertible) => interop.Pointer | null;
}

declare class __SCNetworkReachability {
  constructor(init?: __SCNetworkReachability);
}

declare class __SCNetworkService {
  constructor(init?: __SCNetworkService);
}

declare class __SCNetworkProtocol {
  constructor(init?: __SCNetworkProtocol);
}

declare class __SCBondStatus {
  constructor(init?: __SCBondStatus);
}

declare class SCPreferencesContext {
  constructor(init?: SCPreferencesContext);
  version: number;
  info: interop.Pointer;
  retain: (p1: interop.PointerConvertible) => interop.Pointer | null;
  release: (p1: interop.PointerConvertible) => void | null;
  copyDescription: (p1: interop.PointerConvertible) => interop.Pointer | null;
}

declare class __SCPreferences {
  constructor(init?: __SCPreferences);
}

declare class SCDynamicStoreContext {
  constructor(init?: SCDynamicStoreContext);
  version: number;
  info: interop.Pointer;
  retain: (p1: interop.PointerConvertible) => interop.Pointer | null;
  release: (p1: interop.PointerConvertible) => void | null;
  copyDescription: (p1: interop.PointerConvertible) => interop.Pointer | null;
}

declare class __SCDynamicStore {
  constructor(init?: __SCDynamicStore);
}

declare class __SCNetworkConnection {
  constructor(init?: __SCNetworkConnection);
}

declare class AuthorizationOpaqueRef {
  constructor(init?: AuthorizationOpaqueRef);
}

declare class __SCNetworkSet {
  constructor(init?: __SCNetworkSet);
}

declare class __SCNetworkInterface {
  constructor(init?: __SCNetworkInterface);
}

declare class SCNetworkConnectionContext {
  constructor(init?: SCNetworkConnectionContext);
  version: number;
  info: interop.Pointer;
  retain: (p1: interop.PointerConvertible) => interop.Pointer | null;
  release: (p1: interop.PointerConvertible) => void | null;
  copyDescription: (p1: interop.PointerConvertible) => interop.Pointer | null;
}

declare function SCNetworkReachabilityCreateWithAddress(allocator: interop.Object, address: interop.PointerConvertible): interop.Object;

declare function SCNetworkReachabilityCreateWithAddressPair(allocator: interop.Object, localAddress: interop.PointerConvertible, remoteAddress: interop.PointerConvertible): interop.Object;

declare function SCNetworkReachabilityCreateWithName(allocator: interop.Object, nodename: string): interop.Object;

declare function SCNetworkReachabilityGetTypeID(): number;

declare function SCNetworkReachabilityGetFlags(target: interop.Object, flags: interop.PointerConvertible): number;

declare function SCNetworkReachabilitySetCallback(target: interop.Object, callout: (p1: interop.PointerConvertible, p2: interop.Enum<typeof SCNetworkReachabilityFlags>, p3: interop.PointerConvertible) => void, context: interop.PointerConvertible): number;

declare function SCNetworkReachabilityScheduleWithRunLoop(target: interop.Object, runLoop: interop.Object, runLoopMode: interop.Object): number;

declare function SCNetworkReachabilityUnscheduleFromRunLoop(target: interop.Object, runLoop: interop.Object, runLoopMode: interop.Object): number;

declare function SCNetworkReachabilitySetDispatchQueue(target: interop.Object, queue: NSObject): number;

declare function SCCopyLastError(): interop.Object;

declare function SCError(): number;

declare function SCErrorString(status: number): string;

declare function CNSetSupportedSSIDs(ssidArray: interop.Object): number;

declare function CNMarkPortalOnline(interfaceName: interop.Object): number;

declare function CNMarkPortalOffline(interfaceName: interop.Object): number;

declare function CNCopySupportedInterfaces(): interop.Object;

declare function CNCopyCurrentNetworkInfo(interfaceName: interop.Object): interop.Object;


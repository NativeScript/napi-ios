/// <reference types="@nativescript/objc-node-api" />

declare const kCNNetworkInfoKeySSID: interop.Pointer;

declare const kSCNetworkFlagsIsDirect: number;

declare const kSCNetworkFlagsIsLocalAddress: number;

declare const kSCNetworkFlagsInterventionRequired: number;

declare const kSCNetworkFlagsConnectionRequired: number;

declare const kSCNetworkFlagsReachable: number;

declare const kSCBondStatusNotInActiveGroup: number;

declare const kSCBondStatusNoPartner: number;

declare const kSCBondStatusOK: number;

declare const kCNNetworkInfoKeyBSSID: interop.Pointer;

declare const kSCNetworkFlagsTransientConnection: number;

declare const kSCBondStatusLinkInvalid: number;

declare const kSCBondStatusUnknown: number;

declare const kSCNetworkFlagsConnectionAutomatic: number;

declare const kCNNetworkInfoKeySSIDData: interop.Pointer;

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

declare function SCNetworkReachabilityCreateWithAddress(allocator: interop.PointerConvertible, address: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkReachabilityCreateWithAddressPair(allocator: interop.PointerConvertible, localAddress: interop.PointerConvertible, remoteAddress: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkReachabilityCreateWithName(allocator: interop.PointerConvertible, nodename: string): interop.Pointer;

declare function SCNetworkReachabilityGetTypeID(): number;

declare function SCNetworkReachabilityGetFlags(target: interop.PointerConvertible, flags: interop.PointerConvertible): number;

declare function SCNetworkReachabilitySetCallback(target: interop.PointerConvertible, callout: (p1: interop.PointerConvertible, p2: interop.Enum<typeof SCNetworkReachabilityFlags>, p3: interop.PointerConvertible) => void, context: interop.PointerConvertible): number;

declare function SCNetworkReachabilityScheduleWithRunLoop(target: interop.PointerConvertible, runLoop: interop.PointerConvertible, runLoopMode: interop.PointerConvertible): number;

declare function SCNetworkReachabilityUnscheduleFromRunLoop(target: interop.PointerConvertible, runLoop: interop.PointerConvertible, runLoopMode: interop.PointerConvertible): number;

declare function SCNetworkReachabilitySetDispatchQueue(target: interop.PointerConvertible, queue: NSObject): number;

declare function CNSetSupportedSSIDs(ssidArray: interop.PointerConvertible): number;

declare function CNMarkPortalOnline(interfaceName: interop.PointerConvertible): number;

declare function CNMarkPortalOffline(interfaceName: interop.PointerConvertible): number;

declare function CNCopySupportedInterfaces(): interop.Pointer;

declare function CNCopyCurrentNetworkInfo(interfaceName: interop.PointerConvertible): interop.Pointer;


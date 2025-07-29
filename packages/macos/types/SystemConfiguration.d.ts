/// <reference types="@nativescript/objc-node-api" />

declare const kCFErrorDomainSystemConfiguration: interop.Pointer;

declare const kSCNetworkFlagsInterventionRequired: number;

declare const kSCNetworkFlagsConnectionAutomatic: number;

declare const kSCBondStatusDeviceAggregationStatus: interop.Pointer;

declare const kSCNetworkInterfaceTypeIPv4: interop.Pointer;

declare const kSCNetworkInterfaceTypeSerial: interop.Pointer;

declare const kSCNetworkInterfaceTypePPTP: interop.Pointer;

declare const kSCNetworkInterfaceTypeL2TP: interop.Pointer;

declare const kSCNetworkInterfaceTypeIPSec: interop.Pointer;

declare const kSCNetworkInterfaceTypeFireWire: interop.Pointer;

declare const kSCNetworkInterfaceType6to4: interop.Pointer;

declare const kSCPropUsersConsoleUserGID: interop.Pointer;

declare const kSCDynamicStorePropNetPrimaryInterface: interop.Pointer;

declare const kSCDynamicStorePropSetupLastUpdated: interop.Pointer;

declare const kSCDynamicStoreDomainSetup: interop.Pointer;

declare const kSCValNetSMBNetBIOSNodeTypeMixed: interop.Pointer;

declare const kSCValNetSMBNetBIOSNodeTypeBroadcast: interop.Pointer;

declare const kSCPropNetSMBNetBIOSScope: interop.Pointer;

declare const kSCPropNetSMBNetBIOSNodeType: interop.Pointer;

declare const kSCPropNetSMBNetBIOSName: interop.Pointer;

declare const kSCPropNetProxiesProxyAutoConfigURLString: interop.Pointer;

declare const kSCPropNetProxiesSOCKSUser: interop.Pointer;

declare const kSCPropNetProxiesSOCKSProxy: interop.Pointer;

declare const kSCPropNetProxiesRTSPEnable: interop.Pointer;

declare const kSCPropNetProxiesHTTPSEnable: interop.Pointer;

declare const kSCPropNetProxiesHTTPUser: interop.Pointer;

declare const kSCPropNetProxiesHTTPProxy: interop.Pointer;

declare const kSCPropNetProxiesHTTPPort: interop.Pointer;

declare const kSCPropNetProxiesGopherUser: interop.Pointer;

declare const kSCPropNetProxiesGopherProxy: interop.Pointer;

declare const kSCPropNetProxiesGopherPort: interop.Pointer;

declare const kSCPropNetProxiesExcludeSimpleHostnames: interop.Pointer;

declare const kSCValNetL2TPTransportIPSec: interop.Pointer;

declare const kSCValNetL2TPIPSecSharedSecretEncryptionKeychain: interop.Pointer;

declare const kSCPropNetPPPLCPReceiveACCM: interop.Pointer;

declare const kSCPropNetPPPLCPMTU: interop.Pointer;

declare const kSCPropNetPPPLCPCompressionACField: interop.Pointer;

declare const kSCPropNetPPPLCPEchoEnabled: interop.Pointer;

declare const kSCPropNetPPPIPCPCompressionVJ: interop.Pointer;

declare const kSCPropNetPPPCommUseTerminalScript: interop.Pointer;

declare const kSCPropNetPPPCommTerminalScript: interop.Pointer;

declare const kSCPropNetPPPCommRemoteAddress: interop.Pointer;

declare const kSCValNetPPPAuthProtocolMSCHAP2: interop.Pointer;

declare const kSCValNetPPPAuthProtocolEAP: interop.Pointer;

declare const kSCValNetPPPAuthProtocolCHAP: interop.Pointer;

declare const kSCValNetPPPAuthPromptBefore: interop.Pointer;

declare const kSCValNetPPPAuthPasswordEncryptionToken: interop.Pointer;

declare const kSCPropNetPPPAuthPassword: interop.Pointer;

declare const kSCPropNetPPPAuthEAPPlugins: interop.Pointer;

declare const kSCPropNetPPPVerboseLogging: interop.Pointer;

declare const kSCPropNetPPPStatus: interop.Pointer;

declare const kSCPropNetPPPRetryConnectTime: interop.Pointer;

declare const kSCPropNetPPPLogfile: interop.Pointer;

declare const kSCPropNetPPPLastCause: interop.Pointer;

declare const kSCPropNetPPPDisconnectTime: interop.Pointer;

declare const kSCPropNetPPPDisconnectOnIdleTimer: interop.Pointer;

declare const kSCPropNetPPPDisconnectOnIdle: interop.Pointer;

declare const kSCPropNetPPPDisconnectOnFastUserSwitch: interop.Pointer;

declare const kSCPropNetPPPDialOnDemand: interop.Pointer;

declare const kSCPropNetPPPDeviceLastCause: interop.Pointer;

declare const kSCPropNetPPPConnectTime: interop.Pointer;

declare const kSCPropNetPPPACSPEnabled: interop.Pointer;

declare const kSCPropNetModemSpeaker: interop.Pointer;

declare const kSCPropNetModemNote: interop.Pointer;

declare const kSCPropNetModemHoldCallWaitingAudibleAlert: interop.Pointer;

declare const kSCPropNetModemDialMode: interop.Pointer;

declare const kSCPropNetModemDeviceVendor: interop.Pointer;

declare const kSCPropNetModemConnectSpeed: interop.Pointer;

declare const kSCPropNetModemConnectionScript: interop.Pointer;

declare const kSCPropNetModemAccessPointName: interop.Pointer;

declare const kSCValNetIPv6ConfigMethodRouterAdvertisement: interop.Pointer;

declare const kSCValNetIPv6ConfigMethodManual: interop.Pointer;

declare const kSCPropNetIPv6PrefixLength: interop.Pointer;

declare const kSCPropNetIPv6ConfigMethod: interop.Pointer;

declare const kSCValNetIPv4ConfigMethodManual: interop.Pointer;

declare const kSCValNetIPv4ConfigMethodLinkLocal: interop.Pointer;

declare const kSCValNetIPv4ConfigMethodBOOTP: interop.Pointer;

declare const kSCValNetIPv4ConfigMethodAutomatic: interop.Pointer;

declare const kSCPropNetIPv4BroadcastAddresses: interop.Pointer;

declare const kSCPropNetIPv4SubnetMasks: interop.Pointer;

declare const kSCPropNetIPv4ConfigMethod: interop.Pointer;

declare const kSCPropNetIPv4Addresses: interop.Pointer;

declare const kSCValNetIPSecAuthenticationMethodHybrid: interop.Pointer;

declare const kSCValNetIPSecAuthenticationMethodCertificate: interop.Pointer;

declare const kSCValNetIPSecAuthenticationMethodSharedSecret: interop.Pointer;

declare const kSCPropNetIPSecXAuthPasswordEncryption: interop.Pointer;

declare const kSCPropNetIPSecXAuthPassword: interop.Pointer;

declare const kSCPropNetIPSecXAuthName: interop.Pointer;

declare const kSCPropNetIPSecXAuthEnabled: interop.Pointer;

declare const kSCPropNetIPSecStatus: interop.Pointer;

declare const kSCPropNetIPSecConnectTime: interop.Pointer;

declare const kSCPropNetIPSecSharedSecretEncryption: interop.Pointer;

declare const kSCPropNetIPSecSharedSecret: interop.Pointer;

declare const kSCValNetInterfaceSubTypeL2TP: interop.Pointer;

declare const kSCValNetInterfaceSubTypePPTP: interop.Pointer;

declare const kSCValNetInterfaceSubTypePPPoE: interop.Pointer;

declare const kSCValNetInterfaceTypeIPSec: interop.Pointer;

declare const kSCValNetInterfaceTypePPP: interop.Pointer;

declare const kSCPropNetEthernetMTU: interop.Pointer;

declare const kSCPropNetDNSSupplementalMatchDomains: interop.Pointer;

declare const kSCValNetL2TPTransportIP: interop.Pointer;

declare const kSCPropNetDNSServerPort: interop.Pointer;

declare const kSCPropNetDNSServerAddresses: interop.Pointer;

declare const kSCValNetAirPortJoinModeStrongest: interop.Pointer;

declare const kSCValNetAirPortJoinModeAutomatic: interop.Pointer;

declare const kSCPropNetAirPortAuthPasswordEncryption: interop.Pointer;

declare const kSCPropNetAirPortAuthPassword: interop.Pointer;

declare const kSCPropNetLocalHostName: interop.Pointer;

declare const kSCPropNetInterfaces: interop.Pointer;

declare const kSCPropNetPPPOverridePrimary: interop.Pointer;

declare const kSCEntNetSMB: interop.Pointer;

declare const kSCEntNetPPTP: interop.Pointer;

declare const kSCEntNetPPPSerial: interop.Pointer;

declare const kSCEntNetPPPoE: interop.Pointer;

declare const kSCEntNetL2TP: interop.Pointer;

declare const kSCEntNetIPv6: interop.Pointer;

declare const kSCEntNetInterface: interop.Pointer;

declare const kSCEntNetEthernet: interop.Pointer;

declare const kSCEntNetAirPort: interop.Pointer;

declare const kSCCompInterface: interop.Pointer;

declare const kSCCompGlobal: interop.Pointer;

declare const kSCCompService: interop.Pointer;

declare const kSCCompNetwork: interop.Pointer;

declare const kSCPrefSystem: interop.Pointer;

declare const kSCPrefSets: interop.Pointer;

declare const kSCPrefNetworkServices: interop.Pointer;

declare const kSCPrefCurrentSet: interop.Pointer;

declare const kSCPropVersion: interop.Pointer;

declare const kSCPropMACAddress: interop.Pointer;

declare const kSCPropInterfaceName: interop.Pointer;

declare const kSCDynamicStoreUseSessionKeys: interop.Pointer;

declare const kSCStatusConnectionIgnore: number;

declare const kSCStatusReachabilityUnknown: number;

declare const kSCStatusStale: number;

declare const kSCStatusNoConfigFile: number;

declare const kSCStatusPrefsBusy: number;

declare const kSCStatusNotifierActive: number;

declare const kSCStatusAccessError: number;

declare const kSCStatusInvalidArgument: number;

declare const kSCStatusFailed: number;

declare const kSCStatusOK: number;

declare const kSCPropNetIPSecAuthenticationMethod: interop.Pointer;

declare const kSCPropNetL2TPTransport: interop.Pointer;

declare const kSCStatusNeedLock: number;

declare const kSCPropUsersConsoleUserName: interop.Pointer;

declare const kSCPropNetModemHoldEnabled: interop.Pointer;

declare const kSCValNetIPv4ConfigMethodPPP: interop.Pointer;

declare const kSCBondStatusLinkInvalid: number;

declare const kSCValNetIPSecXAuthPasswordEncryptionPrompt: interop.Pointer;

declare const kSCPropNetPPPAuthPasswordEncryption: interop.Pointer;

declare const kSCPropNetPPPLCPMRU: interop.Pointer;

declare const kSCDynamicStoreDomainFile: interop.Pointer;

declare const kSCPropNetPPPCCPEnabled: interop.Pointer;

declare const kSCPropNetIPv6Addresses: interop.Pointer;

declare const kSCNetworkInterfaceTypeIrDA: interop.Pointer;

declare const kSCPropNetPPPCommRedialCount: interop.Pointer;

declare const kSCPropNetProxiesGopherEnable: interop.Pointer;

declare const kSCPropNetPPPAuthName: interop.Pointer;

declare const kSCDynamicStoreDomainPlugin: interop.Pointer;

declare const kSCPropNetIPv6Router: interop.Pointer;

declare const kSCValNetIPv6ConfigMethodLinkLocal: interop.Pointer;

declare const kSCValNetIPSecSharedSecretEncryptionKeychain: interop.Pointer;

declare const kSCPropNetModemSpeed: interop.Pointer;

declare const kSCPropNetPPPAuthPrompt: interop.Pointer;

declare const kSCPropNetModemHoldReminder: interop.Pointer;

declare const kSCPropNetPPPCommRedialInterval: interop.Pointer;

declare const kSCNetworkProtocolTypeSMB: interop.Pointer;

declare const kSCPropNetIPSecRemoteAddress: interop.Pointer;

declare const kSCBondStatusOK: number;

declare const kSCPropSystemComputerName: interop.Pointer;

declare const kSCEntNetDHCP: interop.Pointer;

declare const kSCPropSystemComputerNameEncoding: interop.Pointer;

declare const kSCNetworkInterfaceTypeBond: interop.Pointer;

declare const kSCPropNetAirPortPreferredNetwork: interop.Pointer;

declare const kSCValNetInterfaceSubTypePPPSerial: interop.Pointer;

declare const kSCPropNetPPPUseSessionTimer: interop.Pointer;

declare const kSCPropNetPPPIdleReminderTimer: interop.Pointer;

declare const kSCPropNetProxiesFTPProxy: interop.Pointer;

declare const kSCNetworkInterfaceTypeBluetooth: interop.Pointer;

declare const kSCPropNetDNSSearchOrder: interop.Pointer;

declare const kSCPropNetProxiesProxyAutoConfigEnable: interop.Pointer;

declare const kSCValNetInterfaceType6to4: interop.Pointer;

declare const kSCEntNetModem: interop.Pointer;

declare const kSCDynamicStoreDomainPrefs: interop.Pointer;

declare const kSCBondStatusUnknown: number;

declare const kSCPropNetLinkActive: interop.Pointer;

declare const kSCValNetIPv6ConfigMethodAutomatic: interop.Pointer;

declare const kSCValNetSMBNetBIOSNodeTypeHybrid: interop.Pointer;

declare const kSCPropNetPPPCommRedialEnabled: interop.Pointer;

declare const kSCValNetIPSecLocalIdentifierTypeKeyID: interop.Pointer;

declare const kSCPropNetInterfaceDeviceName: interop.Pointer;

declare const kSCPropNetPPPDisconnectOnLogout: interop.Pointer;

declare const kSCPropNetProxiesHTTPSProxy: interop.Pointer;

declare const kSCPropNetProxiesRTSPPort: interop.Pointer;

declare const kSCBondStatusDeviceDistributing: interop.Pointer;

declare const kSCValNetPPPAuthPasswordEncryptionKeychain: interop.Pointer;

declare const kSCDynamicStorePropNetPrimaryService: interop.Pointer;

declare const kSCResvLink: interop.Pointer;

declare const kSCBondStatusNoPartner: number;

declare const kSCNetworkFlagsReachable: number;

declare const kSCValNetPPPAuthProtocolMSCHAP1: interop.Pointer;

declare const kSCNetworkInterfaceIPv4: interop.Pointer;

declare const kSCPropNetModemDataCompression: interop.Pointer;

declare const kSCValNetIPv6ConfigMethod6to4: interop.Pointer;

declare const kSCPropNetProxiesHTTPSUser: interop.Pointer;

declare const kSCPropNetProxiesSOCKSEnable: interop.Pointer;

declare const kSCValNetIPv4ConfigMethodDHCP: interop.Pointer;

declare const kSCPropNet6to4Relay: interop.Pointer;

declare const kSCDynamicStorePropNetInterfaces: interop.Pointer;

declare const kSCPropNetIPv6Flags: interop.Pointer;

declare const kSCNetworkInterfaceTypeVLAN: interop.Pointer;

declare const kSCNetworkProtocolTypeProxies: interop.Pointer;

declare const kSCPropNetInterfaceHardware: interop.Pointer;

declare const kSCPropNetPPPIdleReminder: interop.Pointer;

declare const kSCEntNet6to4: interop.Pointer;

declare const kSCValNetModemDialModeIgnoreDialTone: interop.Pointer;

declare const kSCPropNetSMBWINSAddresses: interop.Pointer;

declare const kSCPropNetSMBWorkgroup: interop.Pointer;

declare const kSCPropNetDNSDomainName: interop.Pointer;

declare const kSCNetworkInterfaceTypeWWAN: interop.Pointer;

declare const kSCDynamicStorePropNetServiceIDs: interop.Pointer;

declare const kSCPropNetPPPLCPTransmitACCM: interop.Pointer;

declare const kSCStatusNoLink: number;

declare const kSCPropNetInterfaceSupportsModemOnHold: interop.Pointer;

declare const kSCPropNetProxiesProxyAutoConfigJavaScript: interop.Pointer;

declare const kSCPropNetModemDeviceModel: interop.Pointer;

declare const kSCPropNetIPSecLocalCertificate: interop.Pointer;

declare const kSCPropNetOverridePrimary: interop.Pointer;

declare const kSCPropNetAirPortJoinMode: interop.Pointer;

declare const kSCPropNetProxiesExceptionsList: interop.Pointer;

declare const kSCNetworkProtocolTypeDNS: interop.Pointer;

declare const kSCBondStatusNotInActiveGroup: number;

declare const kSCNetworkInterfaceTypeEthernet: interop.Pointer;

declare const kSCNetworkFlagsTransientConnection: number;

declare const kSCValNetAirPortJoinModePreferred: interop.Pointer;

declare const kSCNetworkProtocolTypeIPv4: interop.Pointer;

declare const kSCPropNetInterfaceType: interop.Pointer;

declare const kSCBondStatusDeviceCollecting: interop.Pointer;

declare const kSCPropNetProxiesHTTPEnable: interop.Pointer;

declare const kSCPropNetAirPortSavePasswords: interop.Pointer;

declare const kSCPropNetIPSecLocalIdentifier: interop.Pointer;

declare const kSCValNetInterfaceTypeEthernet: interop.Pointer;

declare const kSCNetworkFlagsIsLocalAddress: number;

declare const kSCPropNetProxiesSOCKSPort: interop.Pointer;

declare const kSCPropNetEthernetMediaSubType: interop.Pointer;

declare const kSCPropNetIPv4DHCPClientID: interop.Pointer;

declare const kSCPropNetProxiesProxyAutoDiscoveryEnable: interop.Pointer;

declare const kSCDynamicStorePropSetupCurrentSet: interop.Pointer;

declare const kSCValNetIPv4ConfigMethodINFORM: interop.Pointer;

declare const kSCDynamicStoreDomainState: interop.Pointer;

declare const kSCPropNetPPPPlugins: interop.Pointer;

declare const kSCNetworkInterfaceTypePPP: interop.Pointer;

declare const kSCEntNetIPSec: interop.Pointer;

declare const kSCPropNetL2TPIPSecSharedSecret: interop.Pointer;

declare const kSCPropNetProxiesFTPEnable: interop.Pointer;

declare const kSCPropNetPPPLCPCompressionPField: interop.Pointer;

declare const kSCNetworkFlagsIsDirect: number;

declare const kSCStatusConnectionNoService: number;

declare const kSCPropNetPPPIPCPUsePeerDNS: interop.Pointer;

declare const kSCPropNetPPPSessionTimer: interop.Pointer;

declare const kSCResvInactive: interop.Pointer;

declare const kSCStatusMaxLink: number;

declare const kSCCompAnyRegex: interop.Pointer;

declare const kSCPropNetDNSSupplementalMatchOrders: interop.Pointer;

declare const kSCPropNetPPPCommConnectDelay: interop.Pointer;

declare const kSCPropNetAirPortPowerEnabled: interop.Pointer;

declare const kSCValNetIPSecXAuthPasswordEncryptionKeychain: interop.Pointer;

declare const kSCNetworkFlagsConnectionRequired: number;

declare const kSCEntNetFireWire: interop.Pointer;

declare const kSCCompSystem: interop.Pointer;

declare const kSCPropNetProxiesHTTPSPort: interop.Pointer;

declare const kSCValNetModemDialModeWaitForDialTone: interop.Pointer;

declare const kSCEntNetPPP: interop.Pointer;

declare const kSCPropNetModemDeviceContextID: interop.Pointer;

declare const kSCCompHostNames: interop.Pointer;

declare const kSCValNetAirPortAuthPasswordEncryptionKeychain: interop.Pointer;

declare const kSCPropNetModemErrorCorrection: interop.Pointer;

declare const kSCNetworkInterfaceTypeIEEE80211: interop.Pointer;

declare const kSCPropNetProxiesFTPPort: interop.Pointer;

declare const kSCStatusNoPrefsSession: number;

declare const kSCPropNetIPv4Router: interop.Pointer;

declare const kSCCompUsers: interop.Pointer;

declare const kSCPropNetModemHoldReminderTime: interop.Pointer;

declare const kSCPropNetServiceOrder: interop.Pointer;

declare const kSCPropNetPPPAuthProtocol: interop.Pointer;

declare const kSCStatusNoStoreServer: number;

declare const kSCValNetInterfaceTypeFireWire: interop.Pointer;

declare const kSCValNetSMBNetBIOSNodeTypePeer: interop.Pointer;

declare const kSCValNetModemDialModeManual: interop.Pointer;

declare const kSCPropUserDefinedName: interop.Pointer;

declare const kSCPropNetPPPCCPMPPE128Enabled: interop.Pointer;

declare const kSCPropNetPPPLCPEchoFailure: interop.Pointer;

declare const kSCPropNetDNSOptions: interop.Pointer;

declare const kSCPropNetPPPLCPEchoInterval: interop.Pointer;

declare const kSCStatusNoKey: number;

declare const kSCEntNetProxies: interop.Pointer;

declare const kSCPropNetPPPCCPMPPE40Enabled: interop.Pointer;

declare const kSCPropNetModemConnectionPersonality: interop.Pointer;

declare const kSCNetworkInterfaceTypeModem: interop.Pointer;

declare const kSCPropNetProxiesRTSPUser: interop.Pointer;

declare const kSCPropNetModemPulseDial: interop.Pointer;

declare const kSCEntNetLink: interop.Pointer;

declare const kSCValNetPPPAuthPromptAfter: interop.Pointer;

declare const kSCPropUsersConsoleUserUID: interop.Pointer;

declare const kSCPropNetModemHoldDisconnectOnAnswer: interop.Pointer;

declare const kSCPropNetDNSSearchDomains: interop.Pointer;

declare const kSCStatusKeyExists: number;

declare const kSCPropNetEthernetMediaOptions: interop.Pointer;

declare const kSCStatusNoStoreSession: number;

declare const kSCPropNetDNSSortList: interop.Pointer;

declare const kSCPropNetInterfaceSubType: interop.Pointer;

declare const kSCPropNetIPv6DestAddresses: interop.Pointer;

declare const kSCValNetAirPortJoinModeRecent: interop.Pointer;

declare const kSCEntNetIPv4: interop.Pointer;

declare const kSCPropNetL2TPIPSecSharedSecretEncryption: interop.Pointer;

declare const kSCStatusLocked: number;

declare const kSCPropNetDNSServerTimeout: interop.Pointer;

declare const kSCPropNetProxiesFTPPassive: interop.Pointer;

declare const kSCValNetAirPortJoinModeRanked: interop.Pointer;

declare const kSCPropNetAirPortAllowNetCreation: interop.Pointer;

declare const kSCEntUsersConsoleUser: interop.Pointer;

declare const kSCEntNetDNS: interop.Pointer;

declare const kSCPropNetLinkDetaching: interop.Pointer;

declare const kSCNetworkProtocolTypeIPv6: interop.Pointer;

declare const kSCPropNetProxiesRTSPProxy: interop.Pointer;

declare const kSCPropNetProxiesFTPUser: interop.Pointer;

declare const kSCPropNetPPPCommAlternateRemoteAddress: interop.Pointer;

declare const kSCPropNetPPPCommDisplayTerminalWindow: interop.Pointer;

declare const kSCPropNetIPv4DestAddresses: interop.Pointer;

declare const kSCValNetPPPAuthProtocolPAP: interop.Pointer;

declare const kSCPropNetIPSecLocalIdentifierType: interop.Pointer;

declare const kSCPropNetPPPDisconnectOnSleep: interop.Pointer;

declare const SCNetworkConnectionStatus: {
  Invalid: -1,
  Disconnected: 0,
  Connecting: 1,
  Connected: 2,
  Disconnecting: 3,
};

declare const SCPreferencesNotification: {
  Commit: 1,
  Apply: 2,
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

declare const SCNetworkReachabilityFlags: {
  TransientConnection: 1,
  Reachable: 2,
  ConnectionRequired: 4,
  ConnectionOnTraffic: 8,
  InterventionRequired: 16,
  ConnectionOnDemand: 32,
  IsLocalAddress: 65536,
  IsDirect: 131072,
  ConnectionAutomatic: 8,
};

declare class SCNetworkConnectionContext {
  constructor(init?: SCNetworkConnectionContext);
  version: number;
  info: interop.Pointer;
  retain: (p1: interop.PointerConvertible) => interop.Pointer | null;
  release: (p1: interop.PointerConvertible) => void | null;
  copyDescription: (p1: interop.PointerConvertible) => interop.Pointer | null;
}

declare class __SCNetworkConnection {
  constructor(init?: __SCNetworkConnection);
}

declare class SCNetworkReachabilityContext {
  constructor(init?: SCNetworkReachabilityContext);
  version: number;
  info: interop.Pointer;
  retain: (p1: interop.PointerConvertible) => interop.Pointer | null;
  release: (p1: interop.PointerConvertible) => void | null;
  copyDescription: (p1: interop.PointerConvertible) => interop.Pointer | null;
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

declare class __SCDynamicStore {
  constructor(init?: __SCDynamicStore);
}

declare class __SCNetworkReachability {
  constructor(init?: __SCNetworkReachability);
}

declare class __SCPreferences {
  constructor(init?: __SCPreferences);
}

declare class __SCNetworkProtocol {
  constructor(init?: __SCNetworkProtocol);
}

declare class SCDynamicStoreContext {
  constructor(init?: SCDynamicStoreContext);
  version: number;
  info: interop.Pointer;
  retain: (p1: interop.PointerConvertible) => interop.Pointer | null;
  release: (p1: interop.PointerConvertible) => void | null;
  copyDescription: (p1: interop.PointerConvertible) => interop.Pointer | null;
}

declare class __SCNetworkService {
  constructor(init?: __SCNetworkService);
}

declare class __SCNetworkSet {
  constructor(init?: __SCNetworkSet);
}

declare class __SCNetworkInterface {
  constructor(init?: __SCNetworkInterface);
}

declare function SCDynamicStoreGetTypeID(): number;

declare function SCDynamicStoreCreate(allocator: interop.PointerConvertible, name: interop.PointerConvertible, callout: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void, context: interop.PointerConvertible): interop.Pointer;

declare function SCDynamicStoreCreateWithOptions(allocator: interop.PointerConvertible, name: interop.PointerConvertible, storeOptions: interop.PointerConvertible, callout: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void, context: interop.PointerConvertible): interop.Pointer;

declare function SCDynamicStoreCreateRunLoopSource(allocator: interop.PointerConvertible, store: interop.PointerConvertible, order: number): interop.Pointer;

declare function SCDynamicStoreSetDispatchQueue(store: interop.PointerConvertible, queue: NSObject): number;

declare function SCDynamicStoreCopyKeyList(store: interop.PointerConvertible, pattern: interop.PointerConvertible): interop.Pointer;

declare function SCDynamicStoreAddValue(store: interop.PointerConvertible, key: interop.PointerConvertible, value: interop.PointerConvertible): number;

declare function SCDynamicStoreAddTemporaryValue(store: interop.PointerConvertible, key: interop.PointerConvertible, value: interop.PointerConvertible): number;

declare function SCDynamicStoreCopyValue(store: interop.PointerConvertible, key: interop.PointerConvertible): interop.Pointer;

declare function SCDynamicStoreCopyMultiple(store: interop.PointerConvertible, keys: interop.PointerConvertible, patterns: interop.PointerConvertible): interop.Pointer;

declare function SCDynamicStoreSetValue(store: interop.PointerConvertible, key: interop.PointerConvertible, value: interop.PointerConvertible): number;

declare function SCDynamicStoreSetMultiple(store: interop.PointerConvertible, keysToSet: interop.PointerConvertible, keysToRemove: interop.PointerConvertible, keysToNotify: interop.PointerConvertible): number;

declare function SCDynamicStoreRemoveValue(store: interop.PointerConvertible, key: interop.PointerConvertible): number;

declare function SCDynamicStoreNotifyValue(store: interop.PointerConvertible, key: interop.PointerConvertible): number;

declare function SCDynamicStoreSetNotificationKeys(store: interop.PointerConvertible, keys: interop.PointerConvertible, patterns: interop.PointerConvertible): number;

declare function SCDynamicStoreCopyNotifiedKeys(store: interop.PointerConvertible): interop.Pointer;

declare function SCDynamicStoreKeyCreate(allocator: interop.PointerConvertible, fmt: interop.PointerConvertible): interop.Pointer;

declare function SCDynamicStoreKeyCreateNetworkGlobalEntity(allocator: interop.PointerConvertible, domain: interop.PointerConvertible, entity: interop.PointerConvertible): interop.Pointer;

declare function SCDynamicStoreKeyCreateNetworkInterface(allocator: interop.PointerConvertible, domain: interop.PointerConvertible): interop.Pointer;

declare function SCDynamicStoreKeyCreateNetworkInterfaceEntity(allocator: interop.PointerConvertible, domain: interop.PointerConvertible, ifname: interop.PointerConvertible, entity: interop.PointerConvertible): interop.Pointer;

declare function SCDynamicStoreKeyCreateNetworkServiceEntity(allocator: interop.PointerConvertible, domain: interop.PointerConvertible, serviceID: interop.PointerConvertible, entity: interop.PointerConvertible): interop.Pointer;

declare function SCDynamicStoreKeyCreateComputerName(allocator: interop.PointerConvertible): interop.Pointer;

declare function SCDynamicStoreKeyCreateConsoleUser(allocator: interop.PointerConvertible): interop.Pointer;

declare function SCDynamicStoreKeyCreateHostNames(allocator: interop.PointerConvertible): interop.Pointer;

declare function SCDynamicStoreKeyCreateLocation(allocator: interop.PointerConvertible): interop.Pointer;

declare function SCDynamicStoreKeyCreateProxies(allocator: interop.PointerConvertible): interop.Pointer;

declare function SCDynamicStoreCopyComputerName(store: interop.PointerConvertible, nameEncoding: interop.PointerConvertible): interop.Pointer;

declare function SCDynamicStoreCopyConsoleUser(store: interop.PointerConvertible, uid: interop.PointerConvertible, gid: interop.PointerConvertible): interop.Pointer;

declare function SCDynamicStoreCopyLocalHostName(store: interop.PointerConvertible): interop.Pointer;

declare function SCDynamicStoreCopyLocation(store: interop.PointerConvertible): interop.Pointer;

declare function SCDynamicStoreCopyProxies(store: interop.PointerConvertible): interop.Pointer;

declare function SCPreferencesGetTypeID(): number;

declare function SCPreferencesCreate(allocator: interop.PointerConvertible, name: interop.PointerConvertible, prefsID: interop.PointerConvertible): interop.Pointer;

declare function SCPreferencesCreateWithAuthorization(allocator: interop.PointerConvertible, name: interop.PointerConvertible, prefsID: interop.PointerConvertible, authorization: interop.PointerConvertible): interop.Pointer;

declare function SCPreferencesLock(prefs: interop.PointerConvertible, wait: number): number;

declare function SCPreferencesCommitChanges(prefs: interop.PointerConvertible): number;

declare function SCPreferencesApplyChanges(prefs: interop.PointerConvertible): number;

declare function SCPreferencesUnlock(prefs: interop.PointerConvertible): number;

declare function SCPreferencesGetSignature(prefs: interop.PointerConvertible): interop.Pointer;

declare function SCPreferencesCopyKeyList(prefs: interop.PointerConvertible): interop.Pointer;

declare function SCPreferencesGetValue(prefs: interop.PointerConvertible, key: interop.PointerConvertible): interop.Pointer;

declare function SCPreferencesAddValue(prefs: interop.PointerConvertible, key: interop.PointerConvertible, value: interop.PointerConvertible): number;

declare function SCPreferencesSetValue(prefs: interop.PointerConvertible, key: interop.PointerConvertible, value: interop.PointerConvertible): number;

declare function SCPreferencesRemoveValue(prefs: interop.PointerConvertible, key: interop.PointerConvertible): number;

declare function SCPreferencesSetCallback(prefs: interop.PointerConvertible, callout: (p1: interop.PointerConvertible, p2: interop.Enum<typeof SCPreferencesNotification>, p3: interop.PointerConvertible) => void, context: interop.PointerConvertible): number;

declare function SCPreferencesScheduleWithRunLoop(prefs: interop.PointerConvertible, runLoop: interop.PointerConvertible, runLoopMode: interop.PointerConvertible): number;

declare function SCPreferencesUnscheduleFromRunLoop(prefs: interop.PointerConvertible, runLoop: interop.PointerConvertible, runLoopMode: interop.PointerConvertible): number;

declare function SCPreferencesSetDispatchQueue(prefs: interop.PointerConvertible, queue: NSObject): number;

declare function SCPreferencesSynchronize(prefs: interop.PointerConvertible): void;

declare function SCPreferencesPathCreateUniqueChild(prefs: interop.PointerConvertible, prefix: interop.PointerConvertible): interop.Pointer;

declare function SCPreferencesPathGetValue(prefs: interop.PointerConvertible, path: interop.PointerConvertible): interop.Pointer;

declare function SCPreferencesPathGetLink(prefs: interop.PointerConvertible, path: interop.PointerConvertible): interop.Pointer;

declare function SCPreferencesPathSetValue(prefs: interop.PointerConvertible, path: interop.PointerConvertible, value: interop.PointerConvertible): number;

declare function SCPreferencesPathSetLink(prefs: interop.PointerConvertible, path: interop.PointerConvertible, link: interop.PointerConvertible): number;

declare function SCPreferencesPathRemoveValue(prefs: interop.PointerConvertible, path: interop.PointerConvertible): number;

declare function SCPreferencesSetComputerName(prefs: interop.PointerConvertible, name: interop.PointerConvertible, nameEncoding: number): number;

declare function SCPreferencesSetLocalHostName(prefs: interop.PointerConvertible, name: interop.PointerConvertible): number;

declare function SCNetworkInterfaceGetTypeID(): number;

declare function SCNetworkInterfaceCopyAll(): interop.Pointer;

declare function SCNetworkInterfaceGetSupportedInterfaceTypes(interface: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkInterfaceGetSupportedProtocolTypes(interface: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkInterfaceCreateWithInterface(interface: interop.PointerConvertible, interfaceType: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkInterfaceGetBSDName(interface: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkInterfaceGetConfiguration(interface: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkInterfaceGetExtendedConfiguration(interface: interop.PointerConvertible, extendedType: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkInterfaceGetHardwareAddressString(interface: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkInterfaceGetInterface(interface: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkInterfaceGetInterfaceType(interface: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkInterfaceGetLocalizedDisplayName(interface: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkInterfaceSetConfiguration(interface: interop.PointerConvertible, config: interop.PointerConvertible): number;

declare function SCNetworkInterfaceSetExtendedConfiguration(interface: interop.PointerConvertible, extendedType: interop.PointerConvertible, config: interop.PointerConvertible): number;

declare function SCNetworkInterfaceCopyMediaOptions(interface: interop.PointerConvertible, current: interop.PointerConvertible, active: interop.PointerConvertible, available: interop.PointerConvertible, filter: number): number;

declare function SCNetworkInterfaceCopyMediaSubTypes(available: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkInterfaceCopyMediaSubTypeOptions(available: interop.PointerConvertible, subType: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkInterfaceCopyMTU(interface: interop.PointerConvertible, mtu_cur: interop.PointerConvertible, mtu_min: interop.PointerConvertible, mtu_max: interop.PointerConvertible): number;

declare function SCNetworkInterfaceSetMediaOptions(interface: interop.PointerConvertible, subtype: interop.PointerConvertible, options: interop.PointerConvertible): number;

declare function SCNetworkInterfaceSetMTU(interface: interop.PointerConvertible, mtu: number): number;

declare function SCNetworkInterfaceForceConfigurationRefresh(interface: interop.PointerConvertible): number;

declare function SCBondInterfaceCopyAll(prefs: interop.PointerConvertible): interop.Pointer;

declare function SCBondInterfaceCopyAvailableMemberInterfaces(prefs: interop.PointerConvertible): interop.Pointer;

declare function SCBondInterfaceCreate(prefs: interop.PointerConvertible): interop.Pointer;

declare function SCBondInterfaceRemove(bond: interop.PointerConvertible): number;

declare function SCBondInterfaceGetMemberInterfaces(bond: interop.PointerConvertible): interop.Pointer;

declare function SCBondInterfaceGetOptions(bond: interop.PointerConvertible): interop.Pointer;

declare function SCBondInterfaceSetMemberInterfaces(bond: interop.PointerConvertible, members: interop.PointerConvertible): number;

declare function SCBondInterfaceSetLocalizedDisplayName(bond: interop.PointerConvertible, newName: interop.PointerConvertible): number;

declare function SCBondInterfaceSetOptions(bond: interop.PointerConvertible, newOptions: interop.PointerConvertible): number;

declare function SCBondInterfaceCopyStatus(bond: interop.PointerConvertible): interop.Pointer;

declare function SCBondStatusGetTypeID(): number;

declare function SCBondStatusGetMemberInterfaces(bondStatus: interop.PointerConvertible): interop.Pointer;

declare function SCBondStatusGetInterfaceStatus(bondStatus: interop.PointerConvertible, interface: interop.PointerConvertible): interop.Pointer;

declare function SCVLANInterfaceCopyAll(prefs: interop.PointerConvertible): interop.Pointer;

declare function SCVLANInterfaceCopyAvailablePhysicalInterfaces(): interop.Pointer;

declare function SCVLANInterfaceCreate(prefs: interop.PointerConvertible, physical: interop.PointerConvertible, tag: interop.PointerConvertible): interop.Pointer;

declare function SCVLANInterfaceRemove(vlan: interop.PointerConvertible): number;

declare function SCVLANInterfaceGetPhysicalInterface(vlan: interop.PointerConvertible): interop.Pointer;

declare function SCVLANInterfaceGetTag(vlan: interop.PointerConvertible): interop.Pointer;

declare function SCVLANInterfaceGetOptions(vlan: interop.PointerConvertible): interop.Pointer;

declare function SCVLANInterfaceSetPhysicalInterfaceAndTag(vlan: interop.PointerConvertible, physical: interop.PointerConvertible, tag: interop.PointerConvertible): number;

declare function SCVLANInterfaceSetLocalizedDisplayName(vlan: interop.PointerConvertible, newName: interop.PointerConvertible): number;

declare function SCVLANInterfaceSetOptions(vlan: interop.PointerConvertible, newOptions: interop.PointerConvertible): number;

declare function SCNetworkProtocolGetTypeID(): number;

declare function SCNetworkProtocolGetConfiguration(protocol: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkProtocolGetEnabled(protocol: interop.PointerConvertible): number;

declare function SCNetworkProtocolGetProtocolType(protocol: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkProtocolSetConfiguration(protocol: interop.PointerConvertible, config: interop.PointerConvertible): number;

declare function SCNetworkProtocolSetEnabled(protocol: interop.PointerConvertible, enabled: number): number;

declare function SCNetworkServiceGetTypeID(): number;

declare function SCNetworkServiceAddProtocolType(service: interop.PointerConvertible, protocolType: interop.PointerConvertible): number;

declare function SCNetworkServiceCopyAll(prefs: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkServiceCopyProtocols(service: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkServiceCreate(prefs: interop.PointerConvertible, interface: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkServiceCopy(prefs: interop.PointerConvertible, serviceID: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkServiceEstablishDefaultConfiguration(service: interop.PointerConvertible): number;

declare function SCNetworkServiceGetEnabled(service: interop.PointerConvertible): number;

declare function SCNetworkServiceGetInterface(service: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkServiceGetName(service: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkServiceCopyProtocol(service: interop.PointerConvertible, protocolType: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkServiceGetServiceID(service: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkServiceRemove(service: interop.PointerConvertible): number;

declare function SCNetworkServiceRemoveProtocolType(service: interop.PointerConvertible, protocolType: interop.PointerConvertible): number;

declare function SCNetworkServiceSetEnabled(service: interop.PointerConvertible, enabled: number): number;

declare function SCNetworkServiceSetName(service: interop.PointerConvertible, name: interop.PointerConvertible): number;

declare function SCNetworkSetGetTypeID(): number;

declare function SCNetworkSetAddService(set: interop.PointerConvertible, service: interop.PointerConvertible): number;

declare function SCNetworkSetContainsInterface(set: interop.PointerConvertible, interface: interop.PointerConvertible): number;

declare function SCNetworkSetCopyAll(prefs: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkSetCopyCurrent(prefs: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkSetCopyServices(set: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkSetCreate(prefs: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkSetCopy(prefs: interop.PointerConvertible, setID: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkSetGetName(set: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkSetGetSetID(set: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkSetGetServiceOrder(set: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkSetRemove(set: interop.PointerConvertible): number;

declare function SCNetworkSetRemoveService(set: interop.PointerConvertible, service: interop.PointerConvertible): number;

declare function SCNetworkSetSetCurrent(set: interop.PointerConvertible): number;

declare function SCNetworkSetSetName(set: interop.PointerConvertible, name: interop.PointerConvertible): number;

declare function SCNetworkSetSetServiceOrder(set: interop.PointerConvertible, newOrder: interop.PointerConvertible): number;

declare function SCNetworkCheckReachabilityByAddress(address: interop.PointerConvertible, addrlen: number, flags: interop.PointerConvertible): number;

declare function SCNetworkCheckReachabilityByName(nodename: string, flags: interop.PointerConvertible): number;

declare function SCNetworkInterfaceRefreshConfiguration(ifName: interop.PointerConvertible): number;

declare function SCNetworkReachabilityCreateWithAddress(allocator: interop.PointerConvertible, address: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkReachabilityCreateWithAddressPair(allocator: interop.PointerConvertible, localAddress: interop.PointerConvertible, remoteAddress: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkReachabilityCreateWithName(allocator: interop.PointerConvertible, nodename: string): interop.Pointer;

declare function SCNetworkReachabilityGetTypeID(): number;

declare function SCNetworkReachabilityGetFlags(target: interop.PointerConvertible, flags: interop.PointerConvertible): number;

declare function SCNetworkReachabilitySetCallback(target: interop.PointerConvertible, callout: (p1: interop.PointerConvertible, p2: interop.Enum<typeof SCNetworkReachabilityFlags>, p3: interop.PointerConvertible) => void, context: interop.PointerConvertible): number;

declare function SCNetworkReachabilityScheduleWithRunLoop(target: interop.PointerConvertible, runLoop: interop.PointerConvertible, runLoopMode: interop.PointerConvertible): number;

declare function SCNetworkReachabilityUnscheduleFromRunLoop(target: interop.PointerConvertible, runLoop: interop.PointerConvertible, runLoopMode: interop.PointerConvertible): number;

declare function SCNetworkReachabilitySetDispatchQueue(target: interop.PointerConvertible, queue: NSObject): number;

declare function SCNetworkConnectionGetTypeID(): number;

declare function SCNetworkConnectionCopyUserPreferences(selectionOptions: interop.PointerConvertible, serviceID: interop.PointerConvertible, userOptions: interop.PointerConvertible): number;

declare function SCNetworkConnectionCreateWithServiceID(allocator: interop.PointerConvertible, serviceID: interop.PointerConvertible, callout: (p1: interop.PointerConvertible, p2: interop.Enum<typeof SCNetworkConnectionStatus>, p3: interop.PointerConvertible) => void, context: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkConnectionCopyServiceID(connection: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkConnectionGetStatus(connection: interop.PointerConvertible): interop.Enum<typeof SCNetworkConnectionStatus>;

declare function SCNetworkConnectionCopyExtendedStatus(connection: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkConnectionCopyStatistics(connection: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkConnectionStart(connection: interop.PointerConvertible, userOptions: interop.PointerConvertible, linger: number): number;

declare function SCNetworkConnectionStop(connection: interop.PointerConvertible, forceDisconnect: number): number;

declare function SCNetworkConnectionCopyUserOptions(connection: interop.PointerConvertible): interop.Pointer;

declare function SCNetworkConnectionScheduleWithRunLoop(connection: interop.PointerConvertible, runLoop: interop.PointerConvertible, runLoopMode: interop.PointerConvertible): number;

declare function SCNetworkConnectionUnscheduleFromRunLoop(connection: interop.PointerConvertible, runLoop: interop.PointerConvertible, runLoopMode: interop.PointerConvertible): number;

declare function SCNetworkConnectionSetDispatchQueue(connection: interop.PointerConvertible, queue: NSObject): number;

declare function SCCopyLastError(): interop.Pointer;

declare function SCError(): number;

declare function SCErrorString(status: number): string;

declare function CNSetSupportedSSIDs(ssidArray: interop.PointerConvertible): number;

declare function CNMarkPortalOnline(interfaceName: interop.PointerConvertible): number;

declare function CNMarkPortalOffline(interfaceName: interop.PointerConvertible): number;

declare function CNCopySupportedInterfaces(): interop.Pointer;

declare function DHCPClientPreferencesSetApplicationOptions(applicationID: interop.PointerConvertible, options: interop.PointerConvertible, count: number): number;

declare function DHCPClientPreferencesCopyApplicationOptions(applicationID: interop.PointerConvertible, count: interop.PointerConvertible): interop.Pointer;

declare function SCDynamicStoreCopyDHCPInfo(store: interop.PointerConvertible, serviceID: interop.PointerConvertible): interop.Pointer;

declare function DHCPInfoGetOptionData(info: interop.PointerConvertible, code: number): interop.Pointer;

declare function DHCPInfoGetLeaseStartTime(info: interop.PointerConvertible): interop.Pointer;

declare function DHCPInfoGetLeaseExpirationTime(info: interop.PointerConvertible): interop.Pointer;


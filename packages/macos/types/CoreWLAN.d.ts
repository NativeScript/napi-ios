/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const CWLinkQualityNotificationRSSIKey: string;

declare const CWModeDidChangeNotification: string;

declare const CWPowerDidChangeNotification: string;

declare const CWErrorDomain: string;

declare const CWScanCacheDidUpdateNotification: string;

declare const CWSSIDDidChangeNotification: string;

declare const CWLinkQualityNotificationTransmitRateKey: string;

declare const CWCountryCodeDidChangeNotification: string;

declare const CWBSSIDDidChangeNotification: string;

declare const CWLinkQualityDidChangeNotification: string;

declare const CWLinkDidChangeNotification: string;

declare const CWEventType: {
  None: 0,
  PowerDidChange: 1,
  SSIDDidChange: 2,
  BSSIDDidChange: 3,
  CountryCodeDidChange: 4,
  LinkDidChange: 5,
  LinkQualityDidChange: 6,
  ModeDidChange: 7,
  ScanCacheUpdated: 8,
  BtCoexStats: 9,
  Unknown: 9223372036854775807,
};

declare const CWKeychainDomain: {
  None: 0,
  User: 1,
  System: 2,
};

declare const CWCipherKeyFlags: {
  None: 0,
  Unicast: 2,
  Multicast: 4,
  Tx: 8,
  Rx: 16,
};

declare const CWChannelWidth: {
  WidthUnknown: 0,
  Width20MHz: 1,
  Width40MHz: 2,
  Width80MHz: 3,
  Width160MHz: 4,
};

declare const CWIBSSModeSecurity: {
  None: 0,
  WEP40: 1,
  WEP104: 2,
};

declare const CWInterfaceMode: {
  None: 0,
  Station: 1,
  IBSS: 2,
  HostAP: 3,
};

declare const CWErr: {
  No: 0,
  EAPOL: 1,
  InvalidParameter: -3900,
  NoMemory: -3901,
  Unknown: -3902,
  NotSupported: -3903,
  InvalidFormat: -3904,
  Timeout: -3905,
  UnspecifiedFailure: -3906,
  UnsupportedCapabilities: -3907,
  ReassociationDenied: -3908,
  AssociationDenied: -3909,
  AuthenticationAlgorithmUnsupported: -3910,
  InvalidAuthenticationSequenceNumber: -3911,
  ChallengeFailure: -3912,
  APFull: -3913,
  UnsupportedRateSet: -3914,
  ShortSlotUnsupported: -3915,
  DSSSOFDMUnsupported: -3916,
  InvalidInformationElement: -3917,
  InvalidGroupCipher: -3918,
  InvalidPairwiseCipher: -3919,
  InvalidAKMP: -3920,
  UnsupportedRSNVersion: -3921,
  InvalidRSNCapabilities: -3922,
  CipherSuiteRejected: -3923,
  InvalidPMK: -3924,
  SupplicantTimeout: -3925,
  HTFeaturesNotSupported: -3926,
  PCOTransitionTimeNotSupported: -3927,
  ReferenceNotBound: -3928,
  IPCFailure: -3929,
  OperationNotPermitted: -3930,
  kCWErr: -3931,
};

declare const CWSecurity: {
  None: 0,
  WEP: 1,
  WPAPersonal: 2,
  WPAPersonalMixed: 3,
  WPA2Personal: 4,
  Personal: 5,
  DynamicWEP: 6,
  WPAEnterprise: 7,
  WPAEnterpriseMixed: 8,
  WPA2Enterprise: 9,
  Enterprise: 10,
  WPA3Personal: 11,
  WPA3Enterprise: 12,
  WPA3Transition: 13,
  OWE: 14,
  OWETransition: 15,
  Unknown: 9223372036854775807,
};

declare const CWChannelBand: {
  BandUnknown: 0,
  Band2GHz: 1,
  Band5GHz: 2,
  Band6GHz: 3,
};

declare const CWPHYMode: {
  ModeNone: 0,
  Mode11a: 1,
  Mode11b: 2,
  Mode11g: 3,
  Mode11n: 4,
  Mode11ac: 5,
  Mode11ax: 6,
};

declare function CWKeychainFindWiFiPassword(domain: interop.Enum<typeof CWKeychainDomain>, ssid: NSData, password: interop.PointerConvertible): number;

declare function CWKeychainSetWiFiPassword(domain: interop.Enum<typeof CWKeychainDomain>, ssid: NSData, password: string): number;

declare function CWKeychainDeleteWiFiPassword(domain: interop.Enum<typeof CWKeychainDomain>, ssid: NSData): number;

declare function CWKeychainFindWiFiEAPUsernameAndPassword(domain: interop.Enum<typeof CWKeychainDomain>, ssid: NSData, username: interop.PointerConvertible, password: interop.PointerConvertible): number;

declare function CWKeychainSetWiFiEAPUsernameAndPassword(domain: interop.Enum<typeof CWKeychainDomain>, ssid: NSData, username: string, password: string): number;

declare function CWKeychainDeleteWiFiEAPUsernameAndPassword(domain: interop.Enum<typeof CWKeychainDomain>, ssid: NSData): number;

declare function CWKeychainCopyWiFiEAPIdentity(domain: interop.Enum<typeof CWKeychainDomain>, ssid: NSData, identity: interop.PointerConvertible): number;

declare function CWKeychainSetWiFiEAPIdentity(domain: interop.Enum<typeof CWKeychainDomain>, ssid: NSData, identity: interop.PointerConvertible): number;

declare function CWKeychainCopyEAPIdentityList(list: interop.PointerConvertible): number;

declare function CWKeychainCopyEAPUsernameAndPassword(ssidData: interop.PointerConvertible, username: interop.PointerConvertible, password: interop.PointerConvertible): number;

declare function CWKeychainSetEAPUsernameAndPassword(ssidData: interop.PointerConvertible, username: interop.PointerConvertible, password: interop.PointerConvertible): number;

declare function CWKeychainDeleteEAPUsernameAndPassword(ssidData: interop.PointerConvertible): number;

declare function CWKeychainCopyEAPIdentity(ssidData: interop.PointerConvertible, identity: interop.PointerConvertible): number;

declare function CWKeychainSetEAPIdentity(ssidData: interop.PointerConvertible, identity: interop.PointerConvertible): number;

declare function CWKeychainSetPassword(ssidData: interop.PointerConvertible, password: interop.PointerConvertible): number;

declare function CWKeychainCopyPassword(ssidData: interop.PointerConvertible, password: interop.PointerConvertible): number;

declare function CWKeychainDeletePassword(ssidData: interop.PointerConvertible): number;

declare function CWMergeNetworks(networks: NSSet): NSSet;

declare interface CWEventDelegate {
  clientConnectionInterrupted?(): void;

  clientConnectionInvalidated?(): void;

  powerStateDidChangeForWiFiInterfaceWithName?(interfaceName: string): void;

  ssidDidChangeForWiFiInterfaceWithName?(interfaceName: string): void;

  bssidDidChangeForWiFiInterfaceWithName?(interfaceName: string): void;

  countryCodeDidChangeForWiFiInterfaceWithName?(interfaceName: string): void;

  linkDidChangeForWiFiInterfaceWithName?(interfaceName: string): void;

  linkQualityDidChangeForWiFiInterfaceWithNameRssiTransmitRate?(interfaceName: string, rssi: number, transmitRate: number): void;

  modeDidChangeForWiFiInterfaceWithName?(interfaceName: string): void;

  scanCacheUpdatedForWiFiInterfaceWithName?(interfaceName: string): void;
}

declare class CWEventDelegate extends NativeObject implements CWEventDelegate {
}

declare class CWChannel extends NSObject implements NSCopying, NSSecureCoding {
  readonly channelNumber: number;

  readonly channelWidth: interop.Enum<typeof CWChannelWidth>;

  readonly channelBand: interop.Enum<typeof CWChannelBand>;

  isEqualToChannel(channel: CWChannel): boolean;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CWNetworkProfile extends NSObject implements NSCopying, NSMutableCopying, NSSecureCoding {
  readonly ssid: string;

  readonly ssidData: NSData;

  readonly security: interop.Enum<typeof CWSecurity>;

  static networkProfile<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  init(): this;

  initWithNetworkProfile(networkProfile: CWNetworkProfile): this;

  static networkProfileWithNetworkProfile<This extends abstract new (...args: any) => any>(this: This, networkProfile: CWNetworkProfile): InstanceType<This>;

  isEqualToNetworkProfile(networkProfile: CWNetworkProfile): boolean;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  mutableCopyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

// @ts-ignore ClassDecl.tsIgnore
declare class CWMutableConfiguration extends CWConfiguration {
  // @ts-ignore MemberDecl.tsIgnore
  networkProfiles: NSOrderedSet;

  // @ts-ignore MemberDecl.tsIgnore
  requireAdministratorForAssociation: boolean;

  // @ts-ignore MemberDecl.tsIgnore
  requireAdministratorForPower: boolean;

  // @ts-ignore MemberDecl.tsIgnore
  requireAdministratorForIBSSMode: boolean;

  // @ts-ignore MemberDecl.tsIgnore
  rememberJoinedNetworks: boolean;

  setNetworkProfiles(networkProfiles: NSOrderedSet): void;

  setRequireAdministratorForAssociation(requireAdministratorForAssociation: boolean): void;

  setRequireAdministratorForPower(requireAdministratorForPower: boolean): void;

  setRequireAdministratorForIBSSMode(requireAdministratorForIBSSMode: boolean): void;

  setRememberJoinedNetworks(rememberJoinedNetworks: boolean): void;
}

declare class CWConfiguration extends NSObject implements NSCopying, NSMutableCopying, NSSecureCoding {
  readonly networkProfiles: NSOrderedSet;

  readonly requireAdministratorForAssociation: boolean;

  readonly requireAdministratorForPower: boolean;

  readonly requireAdministratorForIBSSMode: boolean;

  readonly rememberJoinedNetworks: boolean;

  static configuration<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  init(): this;

  initWithConfiguration(configuration: CWConfiguration): this;

  static configurationWithConfiguration<This extends abstract new (...args: any) => any>(this: This, configuration: CWConfiguration): InstanceType<This>;

  isEqualToConfiguration(configuration: CWConfiguration): boolean;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  mutableCopyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CWInterface extends NSObject {
  readonly interfaceName: string;

  powerOn(): boolean;

  supportedWLANChannels(): NSSet;

  wlanChannel(): CWChannel;

  activePHYMode(): interop.Enum<typeof CWPHYMode>;

  ssid(): string;

  ssidData(): NSData;

  bssid(): string;

  rssiValue(): number;

  noiseMeasurement(): number;

  security(): interop.Enum<typeof CWSecurity>;

  transmitRate(): number;

  countryCode(): string;

  interfaceMode(): interop.Enum<typeof CWInterfaceMode>;

  transmitPower(): number;

  hardwareAddress(): string;

  serviceActive(): boolean;

  cachedScanResults(): NSSet;

  configuration(): CWConfiguration;

  static interfaceNames(): NSSet;

  static interface<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  static interfaceWithName<This extends abstract new (...args: any) => any>(this: This, name: string | null): InstanceType<This>;

  initWithInterfaceName(name: string | null): this;

  setPowerError(power: boolean, error: interop.PointerConvertible): boolean;

  setWLANChannelError(channel: CWChannel, error: interop.PointerConvertible): boolean;

  setPairwiseMasterKeyError(key: NSData | null, error: interop.PointerConvertible): boolean;

  setWEPKeyFlagsIndexError(key: NSData | null, flags: interop.Enum<typeof CWCipherKeyFlags>, index: number, error: interop.PointerConvertible): boolean;

  scanForNetworksWithSSIDError(ssid: NSData | null, error: interop.PointerConvertible): NSSet;

  scanForNetworksWithSSIDIncludeHiddenError(ssid: NSData | null, includeHidden: boolean, error: interop.PointerConvertible): NSSet;

  scanForNetworksWithNameError(networkName: string | null, error: interop.PointerConvertible): NSSet;

  scanForNetworksWithNameIncludeHiddenError(networkName: string | null, includeHidden: boolean, error: interop.PointerConvertible): NSSet;

  associateToNetworkPasswordError(network: CWNetwork, password: string | null, error: interop.PointerConvertible): boolean;

  disassociate(): void;

  associateToEnterpriseNetworkIdentityUsernamePasswordError(network: CWNetwork, identity: interop.PointerConvertible, username: string | null, password: string | null, error: interop.PointerConvertible): boolean;

  startIBSSModeWithSSIDSecurityChannelPasswordError(ssidData: NSData, security: interop.Enum<typeof CWIBSSModeSecurity>, channel: number, password: string | null, error: interop.PointerConvertible): boolean;

  commitConfigurationAuthorizationError(configuration: CWConfiguration, authorization: SFAuthorization | null, error: interop.PointerConvertible): boolean;
}

declare class CWNetwork extends NSObject implements NSCopying, NSSecureCoding {
  readonly ssid: string;

  readonly ssidData: NSData;

  readonly bssid: string;

  readonly wlanChannel: CWChannel;

  readonly rssiValue: number;

  readonly noiseMeasurement: number;

  readonly informationElementData: NSData;

  readonly countryCode: string;

  readonly beaconInterval: number;

  readonly ibss: boolean;

  isEqualToNetwork(network: CWNetwork): boolean;

  supportsSecurity(security: interop.Enum<typeof CWSecurity>): boolean;

  supportsPHYMode(phyMode: interop.Enum<typeof CWPHYMode>): boolean;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CWWiFiClient extends NSObject {
  delegate: interop.Object;

  static sharedWiFiClient(): CWWiFiClient;

  init(): this;

  interface(): CWInterface;

  interfaceNames(): NSArray;

  static interfaceNames(): NSArray;

  interfaceWithName(interfaceName: string | null): CWInterface;

  interfaces(): NSArray;

  startMonitoringEventWithTypeError(type: interop.Enum<typeof CWEventType>, error: interop.PointerConvertible): boolean;

  stopMonitoringEventWithTypeError(type: interop.Enum<typeof CWEventType>, error: interop.PointerConvertible): boolean;

  stopMonitoringAllEventsAndReturnError(error: interop.PointerConvertible): boolean;

  setDelegate(delegate: interop.Object): void;
}

// @ts-ignore ClassDecl.tsIgnore
declare class CWMutableNetworkProfile extends CWNetworkProfile {
  // @ts-ignore MemberDecl.tsIgnore
  ssidData: NSData;

  // @ts-ignore MemberDecl.tsIgnore
  security: interop.Enum<typeof CWSecurity>;

  setSsidData(ssidData: NSData): void;

  setSecurity(security: interop.Enum<typeof CWSecurity>): void;
}


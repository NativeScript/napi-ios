/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const NEVPNConnectionErrorDomain: string;

declare const NEVPNConnectionStartOptionPassword: string;

declare const NEVPNConnectionStartOptionUsername: string;

declare const NEVPNStatusDidChangeNotification: string;

declare const NERelayConfigurationDidChangeNotification: string;

declare const kNEHotspotHelperOptionDisplayName: string;

declare const NEFilterErrorDomain: string;

declare const NEFilterProviderRemediationMapRemediationButtonTexts: string;

declare const NEFilterProviderRemediationMapRemediationURLs: string;

declare const NEDNSSettingsConfigurationDidChangeNotification: string;

declare const NEDNSSettingsErrorDomain: string;

declare const NEDNSProxyConfigurationDidChangeNotification: string;

declare const NEVPNConfigurationChangeNotification: string;

declare const NEAppProxyErrorDomain: string;

declare const NEFilterConfigurationDidChangeNotification: string;

declare const NEHotspotConfigurationErrorDomain: string;

declare const NEDNSProxyErrorDomain: string;

declare const NERelayErrorDomain: string;

declare const NERelayClientErrorDomain: string;

declare const NEVPNErrorDomain: string;

declare const NETunnelProviderErrorDomain: string;

declare const NEAppPushErrorDomain: string;

declare const NWUDPSessionState: {
  Invalid: 0,
  Waiting: 1,
  Preparing: 2,
  Ready: 3,
  Failed: 4,
  Cancelled: 5,
};

declare const NEAppPushManagerError: {
  ConfigurationInvalid: 1,
  ConfigurationNotLoaded: 2,
  InternalError: 3,
  InactiveSession: 4,
};

declare const NEVPNIKEv2PostQuantumKeyExchangeMethod: {
  MethodNone: 0,
  Method36: 36,
  Method37: 37,
};

declare const NEVPNIKEv2IntegrityAlgorithm: {
  A96: 1,
  A160: 2,
  A256: 3,
  A384: 4,
  A512: 5,
};

declare const NEVPNIKEAuthenticationMethod: {
  None: 0,
  Certificate: 1,
  SharedSecret: 2,
};

declare const NEVPNStatus: {
  Invalid: 0,
  Disconnected: 1,
  Connecting: 2,
  Connected: 3,
  Reasserting: 4,
  Disconnecting: 5,
};

declare const NERelayManagerClientError: {
  None: 1,
  DNSFailed: 2,
  ServerUnreachable: 3,
  ServerDisconnected: 4,
  CertificateMissing: 5,
  CertificateInvalid: 6,
  CertificateExpired: 7,
  ServerCertificateInvalid: 8,
  ServerCertificateExpired: 9,
  Other: 10,
};

declare const NERelayManagerError: {
  Invalid: 1,
  Disabled: 2,
  Stale: 3,
  CannotBeRemoved: 4,
};

declare const NEFilterManagerError: {
  Invalid: 1,
  Disabled: 2,
  Stale: 3,
  CannotBeRemoved: 4,
  PermissionDenied: 5,
  InternalError: 6,
};

declare const NEFilterAction: {
  Invalid: 0,
  Allow: 1,
  Drop: 2,
  Remediate: 3,
  FilterData: 4,
};

declare const NEDNSSettingsManagerError: {
  Invalid: 1,
  Disabled: 2,
  Stale: 3,
  CannotBeRemoved: 4,
};

declare const NEDNSProtocol: {
  Cleartext: 1,
  TLS: 2,
  HTTPS: 3,
};

declare const NEDNSProxyManagerError: {
  Invalid: 1,
  Disabled: 2,
  Stale: 3,
  CannotBeRemoved: 4,
};

declare const NEVPNError: {
  ConfigurationInvalid: 1,
  ConfigurationDisabled: 2,
  ConnectionFailed: 3,
  ConfigurationStale: 4,
  ConfigurationReadWriteFailed: 5,
  ConfigurationUnknown: 6,
};

declare const NETunnelProviderError: {
  Invalid: 1,
  Canceled: 2,
  Failed: 3,
};

declare const NEAppProxyFlowError: {
  NotConnected: 1,
  PeerReset: 2,
  HostUnreachable: 3,
  InvalidArgument: 4,
  Aborted: 5,
  Refused: 6,
  TimedOut: 7,
  Internal: 8,
  DatagramTooLarge: 9,
  ReadAlreadyPending: 10,
};

declare const NEFilterReportEvent: {
  NewFlow: 1,
  DataDecision: 2,
  FlowClosed: 3,
};

declare const NEHotspotHelperCommandType: {
  None: 0,
  FilterScanList: 1,
  Evaluate: 2,
  Authenticate: 3,
  PresentUI: 4,
  Maintain: 5,
  Logoff: 6,
};

declare const NEHotspotNetworkSecurityType: {
  Open: 0,
  WEP: 1,
  Personal: 2,
  Enterprise: 3,
  Unknown: 4,
};

declare const NEHotspotConfigurationError: {
  Invalid: 0,
  InvalidSSID: 1,
  InvalidWPAPassphrase: 2,
  InvalidWEPPassphrase: 3,
  InvalidEAPSettings: 4,
  InvalidHS20Settings: 5,
  InvalidHS20DomainName: 6,
  UserDenied: 7,
  Internal: 8,
  Pending: 9,
  SystemConfiguration: 10,
  Unknown: 11,
  JoinOnceNotSupported: 12,
  AlreadyAssociated: 13,
  ApplicationIsNotInForeground: 14,
  InvalidSSIDPrefix: 15,
  UserUnauthorized: 16,
  SystemDenied: 17,
};

declare const NEEvaluateConnectionRuleAction: {
  ConnectIfNeeded: 1,
  NeverConnect: 2,
};

declare const NETunnelProviderRoutingMethod: {
  DestinationIP: 1,
  SourceApplication: 2,
};

declare const NEHotspotConfigurationEAPTLSVersion: {
  Version_1_0: 0,
  Version_1_1: 1,
  Version_1_2: 2,
};

declare const NEVPNConnectionError: {
  Overslept: 1,
  NoNetworkAvailable: 2,
  UnrecoverableNetworkChange: 3,
  ConfigurationFailed: 4,
  ServerAddressResolutionFailed: 5,
  ServerNotResponding: 6,
  ServerDead: 7,
  AuthenticationFailed: 8,
  ClientCertificateInvalid: 9,
  ClientCertificateNotYetValid: 10,
  ClientCertificateExpired: 11,
  PluginFailed: 12,
  ConfigurationNotFound: 13,
  PluginDisabled: 14,
  NegotiationFailed: 15,
  ServerDisconnected: 16,
  ServerCertificateInvalid: 17,
  ServerCertificateNotYetValid: 18,
  ServerCertificateExpired: 19,
};

declare const NEVPNIKEv2DeadPeerDetectionRate: {
  None: 0,
  Low: 1,
  Medium: 2,
  High: 3,
};

declare const NWPathStatus: {
  Invalid: 0,
  Satisfied: 1,
  Unsatisfied: 2,
  Satisfiable: 3,
};

declare const NEOnDemandRuleAction: {
  Connect: 1,
  Disconnect: 2,
  EvaluateConnection: 3,
  Ignore: 4,
};

declare const NWTCPConnectionState: {
  Invalid: 0,
  Connecting: 1,
  Waiting: 2,
  Connected: 3,
  Disconnected: 4,
  Cancelled: 5,
};

declare const NEVPNIKEv2DiffieHellmanGroup: {
  GroupInvalid: 0,
  Group1: 1,
  Group2: 2,
  Group5: 5,
  Group14: 14,
  Group15: 15,
  Group16: 16,
  Group17: 17,
  Group18: 18,
  Group19: 19,
  Group20: 20,
  Group21: 21,
  Group31: 31,
  Group32: 32,
};

declare const NEVPNIKEv2TLSVersion: {
  VersionDefault: 0,
  Version1_0: 1,
  Version1_1: 2,
  Version1_2: 3,
};

declare const NEHotspotHelperResult: {
  Success: 0,
  Failure: 1,
  UIRequired: 2,
  CommandNotRecognized: 3,
  AuthenticationRequired: 4,
  UnsupportedNetwork: 5,
  TemporaryFailure: 6,
};

declare const NEURLFilterVerdict: {
  Unknown: 1,
  Allow: 2,
  Deny: 3,
};

declare const NEVPNIKEv2CertificateType: {
  RSA: 1,
  ECDSA256: 2,
  ECDSA384: 3,
  ECDSA521: 4,
  Ed25519: 5,
  RSAPSS: 6,
};

declare const NEHotspotConfigurationTTLSInnerAuthenticationType: {
  PAP: 0,
  CHAP: 1,
  MSCHAP: 2,
  MSCHAPv2: 3,
  EAP: 4,
};

declare const NEVPNIKEv2EncryptionAlgorithm: {
  AlgorithmDES: 1,
  Algorithm3DES: 2,
  AlgorithmAES128: 3,
  AlgorithmAES256: 4,
  AlgorithmAES128GCM: 5,
  AlgorithmAES256GCM: 6,
  AlgorithmChaCha20Poly1305: 7,
};

declare const NEHotspotHelperConfidence: {
  None: 0,
  Low: 1,
  High: 2,
};

declare const NETrafficDirection: {
  Any: 0,
  Inbound: 1,
  Outbound: 2,
};

declare const NEHotspotConfigurationEAPType: {
  TLS: 13,
  TTLS: 21,
  PEAP: 25,
  FAST: 43,
};

declare const NEProviderStopReason: {
  None: 0,
  UserInitiated: 1,
  ProviderFailed: 2,
  NoNetworkAvailable: 3,
  UnrecoverableNetworkChange: 4,
  ProviderDisabled: 5,
  AuthenticationCanceled: 6,
  ConfigurationFailed: 7,
  IdleTimeout: 8,
  ConfigurationDisabled: 9,
  ConfigurationRemoved: 10,
  Superceded: 11,
  UserLogout: 12,
  UserSwitch: 13,
  ConnectionFailed: 14,
  Sleep: 15,
  AppUpdate: 16,
  InternalError: 17,
};

declare const NEOnDemandRuleInterfaceType: {
  Any: 0,
  WiFi: 2,
  Cellular: 3,
};

declare interface NWTCPConnectionAuthenticationDelegate extends NSObjectProtocol {
  shouldProvideIdentityForConnection?(connection: NWTCPConnection): boolean;

  provideIdentityForConnectionCompletionHandler?(connection: NWTCPConnection, completion: (p1: interop.PointerConvertible, p2: NSArray<interop.Object> | Array<interop.Object>) => void): void;

  shouldEvaluateTrustForConnection?(connection: NWTCPConnection): boolean;

  evaluateTrustForConnectionPeerCertificateChainCompletionHandler?(connection: NWTCPConnection, peerCertificateChain: NSArray<interop.Object> | Array<interop.Object>, completion: (p1: interop.PointerConvertible) => void): void;
}

declare class NWTCPConnectionAuthenticationDelegate extends NativeObject implements NWTCPConnectionAuthenticationDelegate {
}

declare interface NEAppPushDelegate extends NSObjectProtocol {
  appPushManagerDidReceiveIncomingCallWithUserInfo(manager: NEAppPushManager, userInfo: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;
}

declare class NEAppPushDelegate extends NativeObject implements NEAppPushDelegate {
}

declare class NWTLSParameters extends NSObject {
  TLSSessionID: NSData;

  SSLCipherSuites: NSSet;

  minimumSSLProtocolVersion: number;

  maximumSSLProtocolVersion: number;

  setTLSSessionID(TLSSessionID: NSData): void;

  setSSLCipherSuites(SSLCipherSuites: NSSet): void;

  setMinimumSSLProtocolVersion(minimumSSLProtocolVersion: number): void;

  setMaximumSSLProtocolVersion(maximumSSLProtocolVersion: number): void;
}

declare class NWUDPSession extends NSObject {
  initWithUpgradeForSession(session: NWUDPSession): this;

  readonly state: interop.Enum<typeof NWUDPSessionState>;

  readonly endpoint: NWEndpoint;

  readonly resolvedEndpoint: NWEndpoint;

  readonly viable: boolean;

  readonly hasBetterPath: boolean;

  readonly currentPath: NWPath;

  tryNextResolvedEndpoint(): void;

  readonly maximumDatagramLength: number;

  setReadHandlerMaxDatagrams(handler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null, maxDatagrams: number): void;

  writeMultipleDatagramsCompletionHandler(datagramArray: NSArray<interop.Object> | Array<interop.Object>, completionHandler: (p1: NSError) => void | null): void;

  writeDatagramCompletionHandler(datagram: NSData, completionHandler: (p1: NSError) => void | null): void;

  cancel(): void;

  isViable(): boolean;
}

declare class NWTCPConnection extends NSObject {
  initWithUpgradeForConnection(connection: NWTCPConnection): this;

  readonly state: interop.Enum<typeof NWTCPConnectionState>;

  readonly viable: boolean;

  readonly hasBetterPath: boolean;

  readonly endpoint: NWEndpoint;

  readonly connectedPath: NWPath;

  readonly localAddress: NWEndpoint;

  readonly remoteAddress: NWEndpoint;

  readonly txtRecord: NSData;

  readonly error: NSError;

  cancel(): void;

  readLengthCompletionHandler(length: number, completion: (p1: NSData, p2: NSError) => void | null): void;

  readMinimumLengthMaximumLengthCompletionHandler(minimum: number, maximum: number, completion: (p1: NSData, p2: NSError) => void | null): void;

  writeCompletionHandler(data: NSData, completion: (p1: NSError) => void | null): void;

  writeClose(): void;

  isViable(): boolean;
}

declare class NWHostEndpoint extends NWEndpoint {
  static endpointWithHostnamePort<This extends abstract new (...args: any) => any>(this: This, hostname: string, port: string): InstanceType<This>;

  readonly hostname: string;

  readonly port: string;
}

declare class NWEndpoint extends NSObject implements NSSecureCoding, NSCopying {
  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class NEVPNProtocolIKEv2 extends NEVPNProtocolIPSec {
  deadPeerDetectionRate: interop.Enum<typeof NEVPNIKEv2DeadPeerDetectionRate>;

  serverCertificateIssuerCommonName: string;

  serverCertificateCommonName: string;

  certificateType: interop.Enum<typeof NEVPNIKEv2CertificateType>;

  useConfigurationAttributeInternalIPSubnet: boolean;

  readonly IKESecurityAssociationParameters: NEVPNIKEv2SecurityAssociationParameters;

  readonly childSecurityAssociationParameters: NEVPNIKEv2SecurityAssociationParameters;

  disableMOBIKE: boolean;

  disableRedirect: boolean;

  enablePFS: boolean;

  allowPostQuantumKeyExchangeFallback: boolean;

  enableRevocationCheck: boolean;

  strictRevocationCheck: boolean;

  minimumTLSVersion: interop.Enum<typeof NEVPNIKEv2TLSVersion>;

  maximumTLSVersion: interop.Enum<typeof NEVPNIKEv2TLSVersion>;

  enableFallback: boolean;

  mtu: number;

  ppkConfiguration: NEVPNIKEv2PPKConfiguration;

  setDeadPeerDetectionRate(deadPeerDetectionRate: interop.Enum<typeof NEVPNIKEv2DeadPeerDetectionRate>): void;

  setServerCertificateIssuerCommonName(serverCertificateIssuerCommonName: string): void;

  setServerCertificateCommonName(serverCertificateCommonName: string): void;

  setCertificateType(certificateType: interop.Enum<typeof NEVPNIKEv2CertificateType>): void;

  setUseConfigurationAttributeInternalIPSubnet(useConfigurationAttributeInternalIPSubnet: boolean): void;

  setDisableMOBIKE(disableMOBIKE: boolean): void;

  setDisableRedirect(disableRedirect: boolean): void;

  setEnablePFS(enablePFS: boolean): void;

  setAllowPostQuantumKeyExchangeFallback(allowPostQuantumKeyExchangeFallback: boolean): void;

  setEnableRevocationCheck(enableRevocationCheck: boolean): void;

  setStrictRevocationCheck(strictRevocationCheck: boolean): void;

  setMinimumTLSVersion(minimumTLSVersion: interop.Enum<typeof NEVPNIKEv2TLSVersion>): void;

  setMaximumTLSVersion(maximumTLSVersion: interop.Enum<typeof NEVPNIKEv2TLSVersion>): void;

  setEnableFallback(enableFallback: boolean): void;

  setMtu(mtu: number): void;

  setPpkConfiguration(ppkConfiguration: NEVPNIKEv2PPKConfiguration): void;
}

declare class NEVPNConnection extends NSObject {
  startVPNTunnelAndReturnError(error: interop.PointerConvertible): boolean;

  startVPNTunnelWithOptionsAndReturnError(options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, error: interop.PointerConvertible): boolean;

  stopVPNTunnel(): void;

  fetchLastDisconnectErrorWithCompletionHandler(handler: (p1: NSError) => void | null): void;

  readonly status: interop.Enum<typeof NEVPNStatus>;

  readonly connectedDate: NSDate;

  readonly manager: NEVPNManager;
}

declare class NERelayManager extends NSObject {
  static sharedManager(): NERelayManager;

  loadFromPreferencesWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  removeFromPreferencesWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  saveToPreferencesWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  getLastClientErrorsCompletionHandler(seconds: number, completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>) => void | null): void;

  localizedDescription: string;

  enabled: boolean;

  UIToggleEnabled: boolean;

  allowDNSFailover: boolean;

  get relays(): NSArray;
  set relays(value: NSArray<interop.Object> | Array<interop.Object>);

  get matchDomains(): NSArray;
  set matchDomains(value: NSArray<interop.Object> | Array<interop.Object>);

  get matchFQDNs(): NSArray;
  set matchFQDNs(value: NSArray<interop.Object> | Array<interop.Object>);

  get excludedDomains(): NSArray;
  set excludedDomains(value: NSArray<interop.Object> | Array<interop.Object>);

  get excludedFQDNs(): NSArray;
  set excludedFQDNs(value: NSArray<interop.Object> | Array<interop.Object>);

  get onDemandRules(): NSArray;
  set onDemandRules(value: NSArray<interop.Object> | Array<interop.Object>);

  static loadAllManagersFromPreferencesWithCompletionHandler(completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): void;

  setLocalizedDescription(localizedDescription: string | null): void;

  isEnabled(): boolean;

  setEnabled(enabled: boolean): void;

  isUIToggleEnabled(): boolean;

  setUIToggleEnabled(UIToggleEnabled: boolean): void;

  isDNSFailoverAllowed(): boolean;

  setAllowDNSFailover(allowDNSFailover: boolean): void;

  setRelays(relays: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setMatchDomains(matchDomains: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setMatchFQDNs(matchFQDNs: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setExcludedDomains(excludedDomains: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setExcludedFQDNs(excludedFQDNs: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setOnDemandRules(onDemandRules: NSArray<interop.Object> | Array<interop.Object> | null): void;
}

declare class NERelay extends NSObject implements NSCopying, NSSecureCoding {
  HTTP3RelayURL: NSURL;

  HTTP2RelayURL: NSURL;

  dnsOverHTTPSURL: NSURL;

  syntheticDNSAnswerIPv4Prefix: string;

  syntheticDNSAnswerIPv6Prefix: string;

  get additionalHTTPHeaderFields(): NSDictionary;
  set additionalHTTPHeaderFields(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  get rawPublicKeys(): NSArray;
  set rawPublicKeys(value: NSArray<interop.Object> | Array<interop.Object>);

  identityData: NSData;

  identityDataPassword: string;

  setHTTP3RelayURL(HTTP3RelayURL: NSURL | null): void;

  setHTTP2RelayURL(HTTP2RelayURL: NSURL | null): void;

  setDnsOverHTTPSURL(dnsOverHTTPSURL: NSURL | null): void;

  setSyntheticDNSAnswerIPv4Prefix(syntheticDNSAnswerIPv4Prefix: string | null): void;

  setSyntheticDNSAnswerIPv6Prefix(syntheticDNSAnswerIPv6Prefix: string | null): void;

  setAdditionalHTTPHeaderFields(additionalHTTPHeaderFields: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  setRawPublicKeys(rawPublicKeys: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setIdentityData(identityData: NSData | null): void;

  setIdentityDataPassword(identityDataPassword: string | null): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class NEPacket extends NSObject implements NSCopying, NSSecureCoding {
  initWithDataProtocolFamily(data: NSData, protocolFamily: number): this;

  readonly data: NSData;

  readonly protocolFamily: number;

  readonly metadata: NEFlowMetaData;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class NEOnDemandRuleDisconnect extends NEOnDemandRule {
}

declare class NEOnDemandRuleConnect extends NEOnDemandRule {
}

declare class NEOnDemandRule extends NSObject implements NSSecureCoding, NSCopying {
  readonly action: interop.Enum<typeof NEOnDemandRuleAction>;

  get DNSSearchDomainMatch(): NSArray;
  set DNSSearchDomainMatch(value: NSArray<interop.Object> | Array<interop.Object>);

  get DNSServerAddressMatch(): NSArray;
  set DNSServerAddressMatch(value: NSArray<interop.Object> | Array<interop.Object>);

  interfaceTypeMatch: interop.Enum<typeof NEOnDemandRuleInterfaceType>;

  get SSIDMatch(): NSArray;
  set SSIDMatch(value: NSArray<interop.Object> | Array<interop.Object>);

  probeURL: NSURL;

  setDNSSearchDomainMatch(DNSSearchDomainMatch: NSArray<interop.Object> | Array<interop.Object>): void;

  setDNSServerAddressMatch(DNSServerAddressMatch: NSArray<interop.Object> | Array<interop.Object>): void;

  setInterfaceTypeMatch(interfaceTypeMatch: interop.Enum<typeof NEOnDemandRuleInterfaceType>): void;

  setSSIDMatch(SSIDMatch: NSArray<interop.Object> | Array<interop.Object>): void;

  setProbeURL(probeURL: NSURL): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class NETunnelNetworkSettings extends NSObject implements NSSecureCoding, NSCopying {
  initWithTunnelRemoteAddress(address: string): this;

  readonly tunnelRemoteAddress: string;

  DNSSettings: NEDNSSettings;

  proxySettings: NEProxySettings;

  setDNSSettings(DNSSettings: NEDNSSettings): void;

  setProxySettings(proxySettings: NEProxySettings): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class NEIPv6Route extends NSObject implements NSSecureCoding, NSCopying {
  initWithDestinationAddressNetworkPrefixLength(address: string, networkPrefixLength: NSNumber): this;

  readonly destinationAddress: string;

  readonly destinationNetworkPrefixLength: NSNumber;

  gatewayAddress: string;

  static defaultRoute(): NEIPv6Route;

  setGatewayAddress(gatewayAddress: string): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class NEIPv4Settings extends NSObject implements NSSecureCoding, NSCopying {
  initWithAddressesSubnetMasks(addresses: NSArray<interop.Object> | Array<interop.Object>, subnetMasks: NSArray<interop.Object> | Array<interop.Object>): this;

  readonly addresses: NSArray;

  readonly subnetMasks: NSArray;

  get includedRoutes(): NSArray;
  set includedRoutes(value: NSArray<interop.Object> | Array<interop.Object>);

  get excludedRoutes(): NSArray;
  set excludedRoutes(value: NSArray<interop.Object> | Array<interop.Object>);

  setIncludedRoutes(includedRoutes: NSArray<interop.Object> | Array<interop.Object>): void;

  setExcludedRoutes(excludedRoutes: NSArray<interop.Object> | Array<interop.Object>): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class NEHotspotEAPSettings extends NSObject implements NSCopying, NSSecureCoding {
  get supportedEAPTypes(): NSArray;
  set supportedEAPTypes(value: NSArray<interop.Object> | Array<interop.Object>);

  username: string;

  outerIdentity: string;

  ttlsInnerAuthenticationType: interop.Enum<typeof NEHotspotConfigurationTTLSInnerAuthenticationType>;

  password: string;

  get trustedServerNames(): NSArray;
  set trustedServerNames(value: NSArray<interop.Object> | Array<interop.Object>);

  tlsClientCertificateRequired: boolean;

  preferredTLSVersion: interop.Enum<typeof NEHotspotConfigurationEAPTLSVersion>;

  setIdentity(identity: interop.Object): boolean;

  setTrustedServerCertificates(certificates: NSArray<interop.Object> | Array<interop.Object>): boolean;

  setSupportedEAPTypes(supportedEAPTypes: NSArray<interop.Object> | Array<interop.Object>): void;

  setUsername(username: string): void;

  setOuterIdentity(outerIdentity: string): void;

  setTtlsInnerAuthenticationType(ttlsInnerAuthenticationType: interop.Enum<typeof NEHotspotConfigurationTTLSInnerAuthenticationType>): void;

  setPassword(password: string): void;

  setTrustedServerNames(trustedServerNames: NSArray<interop.Object> | Array<interop.Object>): void;

  isTLSClientCertificateRequired(): boolean;

  setTlsClientCertificateRequired(tlsClientCertificateRequired: boolean): void;

  setPreferredTLSVersion(preferredTLSVersion: interop.Enum<typeof NEHotspotConfigurationEAPTLSVersion>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class NEHotspotHelper extends NSObject {
  static registerWithOptionsQueueHandler(options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, queue: NSObject, handler: (p1: NEHotspotHelperCommand) => void): boolean;

  static logoff(network: NEHotspotNetwork): boolean;

  static supportedNetworkInterfaces(): NSArray | null;
}

declare class NEHotspotHelperResponse extends NSObject {
  setNetwork(network: NEHotspotNetwork): void;

  setNetworkList(networkList: NSArray<interop.Object> | Array<interop.Object>): void;

  deliver(): void;
}

declare class NEHotspotHelperCommand extends NSObject {
  readonly commandType: interop.Enum<typeof NEHotspotHelperCommandType>;

  readonly network: NEHotspotNetwork;

  readonly networkList: NSArray;

  createResponse(result: interop.Enum<typeof NEHotspotHelperResult>): NEHotspotHelperResponse;

  readonly interface: NSObject;

  createTCPConnection(endpoint: NWEndpoint): NWTCPConnection;

  createUDPSession(endpoint: NWEndpoint): NWUDPSession;
}

declare class NEHotspotNetwork extends NSObject {
  readonly SSID: string;

  readonly BSSID: string;

  readonly securityType: interop.Enum<typeof NEHotspotNetworkSecurityType>;

  static fetchCurrentWithCompletionHandler(completionHandler: (p1: NEHotspotNetwork) => void | null): void;

  readonly signalStrength: number;

  readonly secure: boolean;

  readonly autoJoined: boolean;

  readonly justJoined: boolean;

  readonly chosenHelper: boolean;

  setConfidence(confidence: interop.Enum<typeof NEHotspotHelperConfidence>): void;

  setPassword(password: string): void;

  isSecure(): boolean;

  didAutoJoin(): boolean;

  didJustJoin(): boolean;

  isChosenHelper(): boolean;
}

declare class NEFilterProviderConfiguration extends NSObject implements NSSecureCoding, NSCopying {
  filterBrowsers: boolean;

  filterSockets: boolean;

  get vendorConfiguration(): NSDictionary;
  set vendorConfiguration(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  serverAddress: string;

  username: string;

  organization: string;

  passwordReference: NSData;

  identityReference: NSData;

  setFilterBrowsers(filterBrowsers: boolean): void;

  setFilterSockets(filterSockets: boolean): void;

  setVendorConfiguration(vendorConfiguration: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): void;

  setServerAddress(serverAddress: string | null): void;

  setUsername(username: string | null): void;

  setOrganization(organization: string | null): void;

  setPasswordReference(passwordReference: NSData | null): void;

  setIdentityReference(identityReference: NSData | null): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class NEFilterManager extends NSObject {
  static sharedManager(): NEFilterManager;

  loadFromPreferencesWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  removeFromPreferencesWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  saveToPreferencesWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  localizedDescription: string;

  providerConfiguration: NEFilterProviderConfiguration;

  enabled: boolean;

  setLocalizedDescription(localizedDescription: string | null): void;

  setProviderConfiguration(providerConfiguration: NEFilterProviderConfiguration | null): void;

  isEnabled(): boolean;

  setEnabled(enabled: boolean): void;
}

declare class NEFilterDataProvider extends NEFilterProvider {
  handleNewFlow(flow: NEFilterFlow): NEFilterNewFlowVerdict;

  handleInboundDataFromFlowReadBytesStartOffsetReadBytes(flow: NEFilterFlow, offset: number, readBytes: NSData): NEFilterDataVerdict;

  handleOutboundDataFromFlowReadBytesStartOffsetReadBytes(flow: NEFilterFlow, offset: number, readBytes: NSData): NEFilterDataVerdict;

  handleInboundDataCompleteForFlow(flow: NEFilterFlow): NEFilterDataVerdict;

  handleOutboundDataCompleteForFlow(flow: NEFilterFlow): NEFilterDataVerdict;

  handleRemediationForFlow(flow: NEFilterFlow): NEFilterRemediationVerdict;

  handleRulesChanged(): void;
}

declare class NEFilterVerdict extends NSObject implements NSSecureCoding, NSCopying {
  shouldReport: boolean;

  setShouldReport(shouldReport: boolean): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class NEFilterBrowserFlow extends NEFilterFlow implements NSSecureCoding, NSCopying {
  readonly request: NSURLRequest;

  readonly response: NSURLResponse;

  readonly parentURL: NSURL;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class NEFilterFlow extends NSObject implements NSSecureCoding, NSCopying {
  readonly URL: NSURL;

  readonly sourceAppUniqueIdentifier: NSData;

  readonly sourceAppIdentifier: string;

  readonly sourceAppVersion: string;

  readonly direction: interop.Enum<typeof NETrafficDirection>;

  readonly identifier: NSUUID;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class NEDNSOverHTTPSSettings extends NEDNSSettings {
  serverURL: NSURL;

  identityReference: NSData;

  setServerURL(serverURL: NSURL): void;

  setIdentityReference(identityReference: NSData): void;
}

declare class NEDNSOverTLSSettings extends NEDNSSettings {
  serverName: string;

  identityReference: NSData;

  setServerName(serverName: string): void;

  setIdentityReference(identityReference: NSData): void;
}

declare class NEDNSProxyManager extends NSObject {
  static sharedManager(): NEDNSProxyManager;

  loadFromPreferencesWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  removeFromPreferencesWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  saveToPreferencesWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  localizedDescription: string;

  providerProtocol: NEDNSProxyProviderProtocol;

  enabled: boolean;

  setLocalizedDescription(localizedDescription: string | null): void;

  setProviderProtocol(providerProtocol: NEDNSProxyProviderProtocol | null): void;

  isEnabled(): boolean;

  setEnabled(enabled: boolean): void;
}

declare class NEAppProxyUDPFlow extends NEAppProxyFlow {
  readDatagramsAndFlowEndpointsWithCompletionHandler(completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSArray<interop.Object> | Array<interop.Object>, p3: NSError) => void | null): void;

  readDatagramsWithCompletionHandler(completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSArray<interop.Object> | Array<interop.Object>, p3: NSError) => void | null): void;

  writeDatagramsSentByFlowEndpointsCompletionHandler(datagrams: NSArray<interop.Object> | Array<interop.Object>, remoteEndpoints: NSArray<interop.Object> | Array<interop.Object>, completionHandler: (p1: NSError) => void | null): void;

  writeDatagramsSentByEndpointsCompletionHandler(datagrams: NSArray<interop.Object> | Array<interop.Object>, remoteEndpoints: NSArray<interop.Object> | Array<interop.Object>, completionHandler: (p1: NSError) => void | null): void;

  readonly localFlowEndpoint: NSObject;

  readonly localEndpoint: NWEndpoint;
}

declare class NEAppProxyTCPFlow extends NEAppProxyFlow {
  readDataWithCompletionHandler(completionHandler: (p1: NSData, p2: NSError) => void | null): void;

  writeDataWithCompletionHandler(data: NSData, completionHandler: (p1: NSError) => void | null): void;

  readonly remoteFlowEndpoint: NSObject;

  readonly remoteEndpoint: NWEndpoint;
}

declare class NETunnelProviderManager extends NEVPNManager {
  static loadAllFromPreferencesWithCompletionHandler(completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): void;

  copyAppRules(): NSArray;

  readonly routingMethod: interop.Enum<typeof NETunnelProviderRoutingMethod>;
}

declare class NEProvider extends NSObject {
  sleepWithCompletionHandler(completionHandler: () => void): void;

  wake(): void;

  createTCPConnectionToEndpointEnableTLSTLSParametersDelegate(remoteEndpoint: NWEndpoint, enableTLS: boolean, TLSParameters: NWTLSParameters | null, delegate: interop.Object | null): NWTCPConnection;

  createUDPSessionToEndpointFromEndpoint(remoteEndpoint: NWEndpoint, localEndpoint: NWHostEndpoint | null): NWUDPSession;

  displayMessageCompletionHandler(message: string, completionHandler: (p1: boolean) => void): void;

  readonly defaultPath: NWPath;
}

declare class NEPrivateLTENetwork extends NSObject implements NSCopying, NSSecureCoding {
  mobileCountryCode: string;

  mobileNetworkCode: string;

  trackingAreaCode: string;

  setMobileCountryCode(mobileCountryCode: string): void;

  setMobileNetworkCode(mobileNetworkCode: string): void;

  setTrackingAreaCode(trackingAreaCode: string): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class NEHotspotConfigurationManager extends NSObject {
  static readonly sharedManager: NEHotspotConfigurationManager;

  applyConfigurationCompletionHandler(configuration: NEHotspotConfiguration, completionHandler: (p1: NSError) => void | null): void;

  removeConfigurationForSSID(SSID: string): void;

  removeConfigurationForHS20DomainName(domainName: string): void;

  getConfiguredSSIDsWithCompletionHandler(completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>) => void): void;

  joinAccessoryHotspotPassphraseCompletionHandler(accessory: ASAccessory, passphrase: string, completionHandler: (p1: NSError) => void | null): void;

  joinAccessoryHotspotWithoutSecurityCompletionHandler(accessory: ASAccessory, completionHandler: (p1: NSError) => void | null): void;
}

declare class NEDNSProxyProviderProtocol extends NEVPNProtocol {
  get providerConfiguration(): NSDictionary;
  set providerConfiguration(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  providerBundleIdentifier: string;

  setProviderConfiguration(providerConfiguration: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): void;

  setProviderBundleIdentifier(providerBundleIdentifier: string | null): void;
}

declare class NEOnDemandRuleEvaluateConnection extends NEOnDemandRule {
  get connectionRules(): NSArray;
  set connectionRules(value: NSArray<interop.Object> | Array<interop.Object>);

  setConnectionRules(connectionRules: NSArray<interop.Object> | Array<interop.Object>): void;
}

declare class NEFilterRemediationVerdict extends NEFilterVerdict implements NSSecureCoding, NSCopying {
  static allowVerdict(): NEFilterRemediationVerdict;

  static dropVerdict(): NEFilterRemediationVerdict;

  static needRulesVerdict(): NEFilterRemediationVerdict;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class NEDNSSettingsManager extends NSObject {
  static sharedManager(): NEDNSSettingsManager;

  loadFromPreferencesWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  removeFromPreferencesWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  saveToPreferencesWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  localizedDescription: string;

  dnsSettings: NEDNSSettings;

  get onDemandRules(): NSArray;
  set onDemandRules(value: NSArray<interop.Object> | Array<interop.Object>);

  readonly enabled: boolean;

  setLocalizedDescription(localizedDescription: string | null): void;

  setDnsSettings(dnsSettings: NEDNSSettings | null): void;

  setOnDemandRules(onDemandRules: NSArray<interop.Object> | Array<interop.Object> | null): void;

  isEnabled(): boolean;
}

declare class NWPath extends NSObject {
  readonly status: interop.Enum<typeof NWPathStatus>;

  readonly expensive: boolean;

  readonly constrained: boolean;

  isEqualToPath(path: NWPath): boolean;

  isExpensive(): boolean;

  isConstrained(): boolean;
}

declare class NEAppProxyProviderManager extends NETunnelProviderManager {
  static loadAllFromPreferencesWithCompletionHandler(completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): void;
}

declare class NEFilterNewFlowVerdict extends NEFilterVerdict implements NSSecureCoding, NSCopying {
  static needRulesVerdict(): NEFilterNewFlowVerdict;

  static allowVerdict(): NEFilterNewFlowVerdict;

  static dropVerdict(): NEFilterNewFlowVerdict;

  static remediateVerdictWithRemediationURLMapKeyRemediationButtonTextMapKey(remediationURLMapKey: string, remediationButtonTextMapKey: string): NEFilterNewFlowVerdict;

  static URLAppendStringVerdictWithMapKey(urlAppendMapKey: string): NEFilterNewFlowVerdict;

  static filterDataVerdictWithFilterInboundPeekInboundBytesFilterOutboundPeekOutboundBytes(filterInbound: boolean, peekInboundBytes: number, filterOutbound: boolean, peekOutboundBytes: number): NEFilterNewFlowVerdict;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class NEVPNManager extends NSObject {
  static sharedManager(): NEVPNManager;

  loadFromPreferencesWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  removeFromPreferencesWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  saveToPreferencesWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  get onDemandRules(): NSArray;
  set onDemandRules(value: NSArray<interop.Object> | Array<interop.Object>);

  onDemandEnabled: boolean;

  localizedDescription: string;

  protocol: NEVPNProtocol;

  protocolConfiguration: NEVPNProtocol;

  readonly connection: NEVPNConnection;

  enabled: boolean;

  setOnDemandRules(onDemandRules: NSArray<interop.Object> | Array<interop.Object>): void;

  isOnDemandEnabled(): boolean;

  setOnDemandEnabled(onDemandEnabled: boolean): void;

  setLocalizedDescription(localizedDescription: string): void;

  setProtocol(protocol: NEVPNProtocol | null): void;

  setProtocolConfiguration(protocolConfiguration: NEVPNProtocol): void;

  isEnabled(): boolean;

  setEnabled(enabled: boolean): void;
}

declare class NEHotspotConfiguration extends NSObject implements NSCopying, NSSecureCoding {
  readonly SSID: string;

  readonly SSIDPrefix: string;

  joinOnce: boolean;

  lifeTimeInDays: NSNumber;

  hidden: boolean;

  initWithSSID(SSID: string): this;

  initWithSSIDPassphraseIsWEP(SSID: string, passphrase: string, isWEP: boolean): this;

  initWithSSIDEapSettings(SSID: string, eapSettings: NEHotspotEAPSettings): this;

  initWithHS20SettingsEapSettings(hs20Settings: NEHotspotHS20Settings, eapSettings: NEHotspotEAPSettings): this;

  initWithSSIDPrefix(SSIDPrefix: string): this;

  initWithSSIDPrefixPassphraseIsWEP(SSIDPrefix: string, passphrase: string, isWEP: boolean): this;

  setJoinOnce(joinOnce: boolean): void;

  setLifeTimeInDays(lifeTimeInDays: NSNumber): void;

  setHidden(hidden: boolean): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class NEVPNIKEv2PPKConfiguration extends NSObject implements NSCopying {
  initWithIdentifierKeychainReference(identifier: string, keychainReference: NSData): this;

  readonly identifier: string;

  readonly keychainReference: NSData;

  isMandatory: boolean;

  setIsMandatory(isMandatory: boolean): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class NETunnelProviderProtocol extends NEVPNProtocol {
  get providerConfiguration(): NSDictionary;
  set providerConfiguration(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  providerBundleIdentifier: string;

  setProviderConfiguration(providerConfiguration: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  setProviderBundleIdentifier(providerBundleIdentifier: string): void;
}

declare class NEIPv4Route extends NSObject implements NSSecureCoding, NSCopying {
  initWithDestinationAddressSubnetMask(address: string, subnetMask: string): this;

  readonly destinationAddress: string;

  readonly destinationSubnetMask: string;

  gatewayAddress: string;

  static defaultRoute(): NEIPv4Route;

  setGatewayAddress(gatewayAddress: string): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class NEFilterDataVerdict extends NEFilterVerdict implements NSSecureCoding, NSCopying {
  static allowVerdict(): NEFilterDataVerdict;

  static dropVerdict(): NEFilterDataVerdict;

  static remediateVerdictWithRemediationURLMapKeyRemediationButtonTextMapKey(remediationURLMapKey: string | null, remediationButtonTextMapKey: string | null): NEFilterDataVerdict;

  static dataVerdictWithPassBytesPeekBytes(passBytes: number, peekBytes: number): NEFilterDataVerdict;

  static needRulesVerdict(): NEFilterDataVerdict;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class NEFlowMetaData extends NSObject implements NSCopying, NSSecureCoding {
  readonly sourceAppUniqueIdentifier: NSData;

  readonly sourceAppSigningIdentifier: string;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class NEAppPushProvider extends NEProvider {
  readonly providerConfiguration: NSDictionary;

  startWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  start(): void;

  stopWithReasonCompletionHandler(reason: interop.Enum<typeof NEProviderStopReason>, completionHandler: () => void): void;

  reportIncomingCallWithUserInfo(userInfo: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  reportPushToTalkMessageWithUserInfo(userInfo: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  handleTimerEvent(): void;

  unmatchEthernet(): void;
}

declare class NEPacketTunnelFlow extends NSObject {
  readPacketsWithCompletionHandler(completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSArray<interop.Object> | Array<interop.Object>) => void): void;

  writePacketsWithProtocols(packets: NSArray<interop.Object> | Array<interop.Object>, protocols: NSArray<interop.Object> | Array<interop.Object>): boolean;

  readPacketObjectsWithCompletionHandler(completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>) => void): void;

  writePacketObjects(packets: NSArray<interop.Object> | Array<interop.Object>): boolean;
}

declare class NWBonjourServiceEndpoint extends NWEndpoint {
  static endpointWithNameTypeDomain<This extends abstract new (...args: any) => any>(this: This, name: string, type: string, domain: string): InstanceType<This>;

  readonly name: string;

  readonly type: string;

  readonly domain: string;
}

declare class NEFilterControlProvider extends NEFilterProvider {
  get remediationMap(): NSDictionary;
  set remediationMap(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  get URLAppendStringMap(): NSDictionary;
  set URLAppendStringMap(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  handleRemediationForFlowCompletionHandler(flow: NEFilterFlow, completionHandler: (p1: NEFilterControlVerdict) => void): void;

  handleNewFlowCompletionHandler(flow: NEFilterFlow, completionHandler: (p1: NEFilterControlVerdict) => void): void;

  notifyRulesChanged(): void;

  setRemediationMap(remediationMap: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  setURLAppendStringMap(URLAppendStringMap: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;
}

declare class NEHotspotHS20Settings extends NSObject implements NSCopying, NSSecureCoding {
  readonly domainName: string;

  roamingEnabled: boolean;

  get roamingConsortiumOIs(): NSArray;
  set roamingConsortiumOIs(value: NSArray<interop.Object> | Array<interop.Object>);

  get naiRealmNames(): NSArray;
  set naiRealmNames(value: NSArray<interop.Object> | Array<interop.Object>);

  get MCCAndMNCs(): NSArray;
  set MCCAndMNCs(value: NSArray<interop.Object> | Array<interop.Object>);

  initWithDomainNameRoamingEnabled(domainName: string, roamingEnabled: boolean): this;

  isRoamingEnabled(): boolean;

  setRoamingEnabled(roamingEnabled: boolean): void;

  setRoamingConsortiumOIs(roamingConsortiumOIs: NSArray<interop.Object> | Array<interop.Object>): void;

  setNaiRealmNames(naiRealmNames: NSArray<interop.Object> | Array<interop.Object>): void;

  setMCCAndMNCs(MCCAndMNCs: NSArray<interop.Object> | Array<interop.Object>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class NEFilterReport extends NSObject implements NSSecureCoding, NSCopying {
  readonly flow: NEFilterFlow;

  readonly action: interop.Enum<typeof NEFilterAction>;

  readonly event: interop.Enum<typeof NEFilterReportEvent>;

  readonly bytesInboundCount: number;

  readonly bytesOutboundCount: number;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class NEAppProxyProvider extends NETunnelProvider {
  startProxyWithOptionsCompletionHandler(options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, completionHandler: (p1: NSError) => void | null): void;

  stopProxyWithReasonCompletionHandler(reason: interop.Enum<typeof NEProviderStopReason>, completionHandler: () => void): void;

  cancelProxyWithError(error: NSError | null): void;

  handleNewFlow(flow: NEAppProxyFlow): boolean;

  handleNewUDPFlowInitialRemoteFlowEndpoint(flow: NEAppProxyUDPFlow, remoteEndpoint: NSObject): boolean;

  handleNewUDPFlowInitialRemoteEndpoint(flow: NEAppProxyUDPFlow, remoteEndpoint: NWEndpoint): boolean;
}

declare class NEDNSProxyProvider extends NEProvider {
  startProxyWithOptionsCompletionHandler(options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, completionHandler: (p1: NSError) => void | null): void;

  stopProxyWithReasonCompletionHandler(reason: interop.Enum<typeof NEProviderStopReason>, completionHandler: () => void): void;

  cancelProxyWithError(error: NSError | null): void;

  handleNewFlow(flow: NEAppProxyFlow): boolean;

  handleNewUDPFlowInitialRemoteFlowEndpoint(flow: NEAppProxyUDPFlow, remoteEndpoint: NSObject): boolean;

  handleNewUDPFlowInitialRemoteEndpoint(flow: NEAppProxyUDPFlow, remoteEndpoint: NWEndpoint): boolean;

  readonly systemDNSSettings: NSArray;
}

declare class NEProxyServer extends NSObject implements NSSecureCoding, NSCopying {
  initWithAddressPort(address: string, port: number): this;

  readonly address: string;

  readonly port: number;

  authenticationRequired: boolean;

  username: string;

  password: string;

  setAuthenticationRequired(authenticationRequired: boolean): void;

  setUsername(username: string): void;

  setPassword(password: string): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class NEVPNProtocolIPSec extends NEVPNProtocol {
  authenticationMethod: interop.Enum<typeof NEVPNIKEAuthenticationMethod>;

  useExtendedAuthentication: boolean;

  sharedSecretReference: NSData;

  localIdentifier: string;

  remoteIdentifier: string;

  setAuthenticationMethod(authenticationMethod: interop.Enum<typeof NEVPNIKEAuthenticationMethod>): void;

  setUseExtendedAuthentication(useExtendedAuthentication: boolean): void;

  setSharedSecretReference(sharedSecretReference: NSData): void;

  setLocalIdentifier(localIdentifier: string): void;

  setRemoteIdentifier(remoteIdentifier: string): void;
}

declare class NEAppProxyFlow extends NSObject {
  openWithLocalFlowEndpointCompletionHandler(localEndpoint: NSObject | null, completionHandler: (p1: NSError) => void | null): void;

  openWithLocalEndpointCompletionHandler(localEndpoint: NWHostEndpoint | null, completionHandler: (p1: NSError) => void | null): void;

  closeReadWithError(error: NSError | null): void;

  closeWriteWithError(error: NSError | null): void;

  readonly metaData: NEFlowMetaData;

  networkInterface: NSObject;

  readonly remoteHostname: string;

  readonly isBound: boolean;

  setNetworkInterface(networkInterface: NSObject | null): void;
}

declare class NEVPNProtocol extends NSObject implements NSCopying, NSSecureCoding {
  serverAddress: string;

  username: string;

  passwordReference: NSData;

  identityReference: NSData;

  identityData: NSData;

  identityDataPassword: string;

  disconnectOnSleep: boolean;

  proxySettings: NEProxySettings;

  includeAllNetworks: boolean;

  excludeLocalNetworks: boolean;

  excludeCellularServices: boolean;

  excludeAPNs: boolean;

  excludeDeviceCommunication: boolean;

  enforceRoutes: boolean;

  sliceUUID: string;

  setServerAddress(serverAddress: string): void;

  setUsername(username: string): void;

  setPasswordReference(passwordReference: NSData): void;

  setIdentityReference(identityReference: NSData): void;

  setIdentityData(identityData: NSData): void;

  setIdentityDataPassword(identityDataPassword: string): void;

  setDisconnectOnSleep(disconnectOnSleep: boolean): void;

  setProxySettings(proxySettings: NEProxySettings): void;

  setIncludeAllNetworks(includeAllNetworks: boolean): void;

  setExcludeLocalNetworks(excludeLocalNetworks: boolean): void;

  setExcludeCellularServices(excludeCellularServices: boolean): void;

  setExcludeAPNs(excludeAPNs: boolean): void;

  setExcludeDeviceCommunication(excludeDeviceCommunication: boolean): void;

  setEnforceRoutes(enforceRoutes: boolean): void;

  setSliceUUID(sliceUUID: string): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class NETunnelProviderSession extends NEVPNConnection {
  startTunnelWithOptionsAndReturnError(options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, error: interop.PointerConvertible): boolean;

  stopTunnel(): void;

  sendProviderMessageReturnErrorResponseHandler(messageData: NSData, error: interop.PointerConvertible, responseHandler: (p1: NSData) => void | null): boolean;
}

declare class NEDNSSettings extends NSObject implements NSSecureCoding, NSCopying {
  readonly dnsProtocol: interop.Enum<typeof NEDNSProtocol>;

  initWithServers(servers: NSArray<interop.Object> | Array<interop.Object>): this;

  readonly servers: NSArray;

  get searchDomains(): NSArray;
  set searchDomains(value: NSArray<interop.Object> | Array<interop.Object>);

  domainName: string;

  get matchDomains(): NSArray;
  set matchDomains(value: NSArray<interop.Object> | Array<interop.Object>);

  matchDomainsNoSearch: boolean;

  allowFailover: boolean;

  setSearchDomains(searchDomains: NSArray<interop.Object> | Array<interop.Object>): void;

  setDomainName(domainName: string): void;

  setMatchDomains(matchDomains: NSArray<interop.Object> | Array<interop.Object>): void;

  setMatchDomainsNoSearch(matchDomainsNoSearch: boolean): void;

  setAllowFailover(allowFailover: boolean): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class NEEvaluateConnectionRule extends NSObject implements NSSecureCoding, NSCopying {
  initWithMatchDomainsAndAction(domains: NSArray<interop.Object> | Array<interop.Object>, action: interop.Enum<typeof NEEvaluateConnectionRuleAction>): this;

  readonly action: interop.Enum<typeof NEEvaluateConnectionRuleAction>;

  readonly matchDomains: NSArray;

  get useDNSServers(): NSArray;
  set useDNSServers(value: NSArray<interop.Object> | Array<interop.Object>);

  probeURL: NSURL;

  setUseDNSServers(useDNSServers: NSArray<interop.Object> | Array<interop.Object>): void;

  setProbeURL(probeURL: NSURL): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class NEPacketTunnelProvider extends NETunnelProvider {
  startTunnelWithOptionsCompletionHandler(options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, completionHandler: (p1: NSError) => void | null): void;

  stopTunnelWithReasonCompletionHandler(reason: interop.Enum<typeof NEProviderStopReason>, completionHandler: () => void): void;

  cancelTunnelWithError(error: NSError | null): void;

  readonly packetFlow: NEPacketTunnelFlow;

  readonly virtualInterface: NSObject;

  createTCPConnectionThroughTunnelToEndpointEnableTLSTLSParametersDelegate(remoteEndpoint: NWEndpoint, enableTLS: boolean, TLSParameters: NWTLSParameters | null, delegate: interop.Object | null): NWTCPConnection;

  createUDPSessionThroughTunnelToEndpointFromEndpoint(remoteEndpoint: NWEndpoint, localEndpoint: NWHostEndpoint | null): NWUDPSession;
}

declare class NEAppRule extends NSObject implements NSSecureCoding, NSCopying {
  initWithSigningIdentifier(signingIdentifier: string): this;

  readonly matchSigningIdentifier: string;

  matchPath: string;

  get matchDomains(): NSArray;
  set matchDomains(value: NSArray<interop.Object> | Array<interop.Object>);

  setMatchPath(matchPath: string | null): void;

  setMatchDomains(matchDomains: NSArray<interop.Object> | Array<interop.Object> | null): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class NEOnDemandRuleIgnore extends NEOnDemandRule {
}

declare class NEIPv6Settings extends NSObject implements NSSecureCoding, NSCopying {
  initWithAddressesNetworkPrefixLengths(addresses: NSArray<interop.Object> | Array<interop.Object>, networkPrefixLengths: NSArray<interop.Object> | Array<interop.Object>): this;

  readonly addresses: NSArray;

  readonly networkPrefixLengths: NSArray;

  get includedRoutes(): NSArray;
  set includedRoutes(value: NSArray<interop.Object> | Array<interop.Object>);

  get excludedRoutes(): NSArray;
  set excludedRoutes(value: NSArray<interop.Object> | Array<interop.Object>);

  setIncludedRoutes(includedRoutes: NSArray<interop.Object> | Array<interop.Object>): void;

  setExcludedRoutes(excludedRoutes: NSArray<interop.Object> | Array<interop.Object>): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class NEProxySettings extends NSObject implements NSSecureCoding, NSCopying {
  autoProxyConfigurationEnabled: boolean;

  proxyAutoConfigurationURL: NSURL;

  proxyAutoConfigurationJavaScript: string;

  HTTPEnabled: boolean;

  HTTPServer: NEProxyServer;

  HTTPSEnabled: boolean;

  HTTPSServer: NEProxyServer;

  excludeSimpleHostnames: boolean;

  get exceptionList(): NSArray;
  set exceptionList(value: NSArray<interop.Object> | Array<interop.Object>);

  get matchDomains(): NSArray;
  set matchDomains(value: NSArray<interop.Object> | Array<interop.Object>);

  setAutoProxyConfigurationEnabled(autoProxyConfigurationEnabled: boolean): void;

  setProxyAutoConfigurationURL(proxyAutoConfigurationURL: NSURL): void;

  setProxyAutoConfigurationJavaScript(proxyAutoConfigurationJavaScript: string): void;

  setHTTPEnabled(HTTPEnabled: boolean): void;

  setHTTPServer(HTTPServer: NEProxyServer): void;

  setHTTPSEnabled(HTTPSEnabled: boolean): void;

  setHTTPSServer(HTTPSServer: NEProxyServer): void;

  setExcludeSimpleHostnames(excludeSimpleHostnames: boolean): void;

  setExceptionList(exceptionList: NSArray<interop.Object> | Array<interop.Object>): void;

  setMatchDomains(matchDomains: NSArray<interop.Object> | Array<interop.Object>): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class NEURLFilter extends NSObject {
  static verdictForURLCompletionHandler(url: NSURL, completionHandler: (p1: interop.Enum<typeof NEURLFilterVerdict>) => void): void;
}

declare class NEFilterSocketFlow extends NEFilterFlow implements NSSecureCoding, NSCopying {
  readonly remoteFlowEndpoint: NSObject;

  readonly remoteEndpoint: NWEndpoint;

  readonly remoteHostname: string;

  readonly localFlowEndpoint: NSObject;

  readonly localEndpoint: NWEndpoint;

  readonly socketFamily: number;

  readonly socketType: number;

  readonly socketProtocol: number;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class NEFilterProvider extends NEProvider {
  startFilterWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  stopFilterWithReasonCompletionHandler(reason: interop.Enum<typeof NEProviderStopReason>, completionHandler: () => void): void;

  readonly filterConfiguration: NEFilterProviderConfiguration;

  handleReport(report: NEFilterReport): void;
}

declare class NEFilterControlVerdict extends NEFilterNewFlowVerdict implements NSSecureCoding, NSCopying {
  static allowVerdictWithUpdateRules(updateRules: boolean): NEFilterControlVerdict;

  static dropVerdictWithUpdateRules(updateRules: boolean): NEFilterControlVerdict;

  static updateRules(): NEFilterControlVerdict;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class NETunnelProvider extends NEProvider {
  handleAppMessageCompletionHandler(messageData: NSData, completionHandler: (p1: NSData) => void | null): void;

  setTunnelNetworkSettingsCompletionHandler(tunnelNetworkSettings: NETunnelNetworkSettings | null, completionHandler: (p1: NSError) => void | null): void;

  readonly protocolConfiguration: NEVPNProtocol;

  readonly appRules: NSArray;

  readonly routingMethod: interop.Enum<typeof NETunnelProviderRoutingMethod>;

  reasserting: boolean;

  setReasserting(reasserting: boolean): void;
}

declare class NEAppPushManager extends NSObject {
  get matchSSIDs(): NSArray;
  set matchSSIDs(value: NSArray<interop.Object> | Array<interop.Object>);

  get matchPrivateLTENetworks(): NSArray;
  set matchPrivateLTENetworks(value: NSArray<interop.Object> | Array<interop.Object>);

  matchEthernet: boolean;

  get providerConfiguration(): NSDictionary;
  set providerConfiguration(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  providerBundleIdentifier: string;

  delegate: NEAppPushDelegate;

  static loadAllFromPreferencesWithCompletionHandler(completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): void;

  loadFromPreferencesWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  removeFromPreferencesWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  saveToPreferencesWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  localizedDescription: string;

  enabled: boolean;

  readonly active: boolean;

  setMatchSSIDs(matchSSIDs: NSArray<interop.Object> | Array<interop.Object>): void;

  setMatchPrivateLTENetworks(matchPrivateLTENetworks: NSArray<interop.Object> | Array<interop.Object>): void;

  setMatchEthernet(matchEthernet: boolean): void;

  setProviderConfiguration(providerConfiguration: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  setProviderBundleIdentifier(providerBundleIdentifier: string): void;

  setDelegate(delegate: NEAppPushDelegate | null): void;

  setLocalizedDescription(localizedDescription: string): void;

  isEnabled(): boolean;

  setEnabled(enabled: boolean): void;

  isActive(): boolean;
}

declare class NEPacketTunnelNetworkSettings extends NETunnelNetworkSettings {
  IPv4Settings: NEIPv4Settings;

  IPv6Settings: NEIPv6Settings;

  tunnelOverheadBytes: NSNumber;

  MTU: NSNumber;

  setIPv4Settings(IPv4Settings: NEIPv4Settings): void;

  setIPv6Settings(IPv6Settings: NEIPv6Settings): void;

  setTunnelOverheadBytes(tunnelOverheadBytes: NSNumber): void;

  setMTU(MTU: NSNumber): void;
}

declare class NEVPNIKEv2SecurityAssociationParameters extends NSObject implements NSSecureCoding, NSCopying {
  encryptionAlgorithm: interop.Enum<typeof NEVPNIKEv2EncryptionAlgorithm>;

  integrityAlgorithm: interop.Enum<typeof NEVPNIKEv2IntegrityAlgorithm>;

  diffieHellmanGroup: interop.Enum<typeof NEVPNIKEv2DiffieHellmanGroup>;

  get postQuantumKeyExchangeMethods(): NSArray;
  set postQuantumKeyExchangeMethods(value: NSArray<interop.Object> | Array<interop.Object>);

  lifetimeMinutes: number;

  setEncryptionAlgorithm(encryptionAlgorithm: interop.Enum<typeof NEVPNIKEv2EncryptionAlgorithm>): void;

  setIntegrityAlgorithm(integrityAlgorithm: interop.Enum<typeof NEVPNIKEv2IntegrityAlgorithm>): void;

  setDiffieHellmanGroup(diffieHellmanGroup: interop.Enum<typeof NEVPNIKEv2DiffieHellmanGroup>): void;

  setPostQuantumKeyExchangeMethods(postQuantumKeyExchangeMethods: NSArray<interop.Object> | Array<interop.Object>): void;

  setLifetimeMinutes(lifetimeMinutes: number): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}


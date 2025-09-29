/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const AVBErrorDomain: string;

declare const AVBNullEUI64: number;

declare const AVB17221EntityPropertyChanged: {
  TimeToLive: 1,
  GUID: 2,
  EntityID: 2,
  VendorID: 4,
  ModelID: 8,
  EntityCapabilities: 16,
  TalkerStreamSources: 32,
  TalkerCapabilities: 64,
  ListenerStreamSinks: 128,
  ListenerCapabilities: 256,
  ControllerCapabilities: 512,
  AvailableIndex: 1024,
  ASGrandmasterID: 2048,
  GPTPGrandmasterID: 2048,
  MACAddress: 4096,
  AssociationID: 32768,
  EntityType: 65536,
  IdentifyControlIndex: 131072,
  InterfaceIndex: 262144,
  GPTPDomainNumber: 524288,
  CurrentConfigurationIndex: 1048576,
};

declare const AVB17221ACMPIPFlag: {
  AVB17221ACMPIPFlagNone: 0,
};

declare const AVB17221AECPStatusCode: {
  Success: 0,
  NotImplemented: 1,
  NoSuchDescriptor: 2,
  EntityLocked: 3,
  EntityAcquired: 4,
  NotAuthorized: 5,
  InsufficientPrivileges: 6,
  BadArguments: 7,
  NoResources: 8,
  InProgress: 9,
  EntityMisbehaving: 10,
  NotSupported: 11,
  StreamIsRunning: 12,
  AddressAccessAddressTooLow: 2,
  AddressAccessAddressTooHigh: 3,
  AddressAccessAddressInvalid: 4,
  AddressAccessTLVInvalid: 5,
  AddressAccessDataInvalid: 6,
  AddressAccessUnsupported: 7,
  AVCFailure: 2,
};

declare const AVB17221AECPMessageType: {
  AEMCommand: 0,
  AEMResponse: 1,
  AddressAccessCommand: 2,
  AddressAccessResponse: 3,
  LegacyAVCCommand: 4,
  LegacyAVCResponse: 5,
  VendorUniqueCommand: 6,
  VendorUniqueResponse: 7,
};

declare const AVB17221ADPControllerCapabilities: {
  AVB17221ADPControllerCapabilitiesImplemented: 1,
};

declare const AVB17221ADPTalkerCapabilities: {
  Implemented: 1,
  HasOtherSource: 512,
  HasControlSource: 1024,
  HasMediaClockSource: 2048,
  HasSMPTESource: 4096,
  HasMIDISource: 8192,
  HasAudioSource: 16384,
  HasVideoSource: -32768,
};

declare const AVB17221ACMPStatusCode: {
  Success: 0,
  ListenerUnknownID: 1,
  TalkerUnknownID: 2,
  TalkerDestMACFail: 3,
  TalkerNoStreamIndex: 4,
  TalkerNoBandwidth: 5,
  TalkerExclusive: 6,
  ListenerTalkerTimeout: 7,
  ListenerExclusive: 8,
  StateUnavailable: 9,
  NotConnected: 10,
  NoSuchConnection: 11,
  UnableToSendMessage: 12,
  TalkerMisbehaving: 13,
  ListenerMisbehaving: 14,
  SRPFace: 15,
  ControllerNotAuthorized: 16,
  IncompatibleRequest: 17,
  ListenerInvalidConnection: 18,
  ListenerCanOnlyListenOnce: 19,
  NotSupported: 31,
};

declare const AVB17221AECPAddressAccessTLVMode: {
  Read: 0,
  Write: 1,
  Execute: 2,
};

declare const AVB17221ACMPFlags: {
  None: 0,
  ClassB: 1,
  FastConnect: 2,
  SavedState: 4,
  StreamingWait: 8,
  SupportsEncrypted: 16,
  EncryptedPDU: 32,
  StreamingTalkerFailed: 64,
  StreamingConnectedListenersValid: 128,
  StreamingNoStreamReservationProtocol: 256,
  StreamingUsingUDP: 512,
};

declare const AVB17221ADPListenerCapabilities: {
  Implemented: 1,
  HasOtherSink: 512,
  HasControlSink: 1024,
  HasMediaClockSink: 2048,
  HasSMPTESink: 4096,
  HasMIDISink: 8192,
  HasAudioSink: 16384,
  HasVideoSink: -32768,
};

declare const AVB17221ACMPMessageType: {
  ConnectTXCommand: 0,
  ConnectTXResponse: 1,
  DisconnectTXCommand: 2,
  DisconnectTXResponse: 3,
  GetTXStateCommand: 4,
  GetTXStateResponse: 5,
  ConnectRXCommand: 6,
  ConnectRXResponse: 7,
  DisconnectRXCommand: 8,
  DisconnectRXResponse: 9,
  GetRXStateCommand: 10,
  GetRXStateResponse: 11,
  GetTXConnectionCommand: 12,
  GetTXConnectionResponse: 13,
};

declare const AVB17221AEMCommandType: {
  AcquireEntity: 0,
  LockEntity: 1,
  EntityAvailable: 2,
  ControllerAvailable: 3,
  ReadDescriptor: 4,
  WriteDescriptor: 5,
  SetConfiguration: 6,
  GetConfiguration: 7,
  SetStreamFormat: 8,
  GetStreamFormat: 9,
  SetVideoFormat: 10,
  GetVideoFormat: 11,
  SetSensorFormat: 12,
  GetSensorFormat: 13,
  SetStreamInfo: 14,
  GetStreamInfo: 15,
  SetName: 16,
  GetName: 17,
  SetAssociationID: 18,
  GetAssociationID: 19,
  SetSamplingRate: 20,
  GetSamplingRate: 21,
  SetClockSource: 22,
  GetClockSource: 23,
  SetControl: 24,
  GetControl: 25,
  IncrementControl: 26,
  DecrementControl: 27,
  SetSignalSelector: 28,
  GetSignalSelector: 29,
  SetMixer: 30,
  GetMixer: 31,
  SetMatrix: 32,
  GetMatrix: 33,
  StartStreaming: 34,
  StopStreaming: 35,
  RegisterUnsolicitedNotification: 36,
  DeregisterUnsolicitedNotification: 37,
  IdentifyNotification: 38,
  GetAVBInfo: 39,
  GetASPath: 40,
  GetCounters: 41,
  Reboot: 42,
  GetAudioMap: 43,
  AddAudioMapping: 44,
  RemoveAudioMapping: 45,
  GetVideoMap: 46,
  AddVideoMapping: 47,
  RemoveVideoMapping: 48,
  GetSensorMap: 49,
  AddSensorMapping: 50,
  RemoveSensorMapping: 51,
  StartOperation: 52,
  AbortOperation: 53,
  OperationStatus: 54,
  AuthenticationAddKey: 55,
  AuthenticationDeleteKey: 56,
  AuthenticationGetKeyList: 57,
  AuthenticationGetKey: 58,
  AuthenticationAddKeyToChain: 59,
  AuthenticationDeleteKeyFromChain: 60,
  AuthenticationGetKeychainList: 61,
  AuthenticationGetIdentity: 62,
  AuthenticationAddToken: 63,
  AuthenticationDeleteToken: 64,
  Authenticate: 65,
  Deauthenticate: 66,
  EnableTransportSecurity: 67,
  DisableTransportSecurity: 68,
  EnableStreamEncryption: 69,
  DisableStreamEncryption: 70,
  SetMemoryObjectLength: 71,
  GetMemoryObjectLength: 72,
  SetStreamBackup: 73,
  GetStreamBackup: 74,
  GetDynamicInfo: 75,
  SetMaxTransitTime: 76,
  GetMaxTransitTime: 77,
  SetSamplingRateRange: 78,
  GetSamplingRateRange: 79,
  SetPTPInstanceInfo: 80,
  GetPTPInstanceInfo: 81,
  GetPTPInstanceExtendedInfo: 82,
  GetPTPInstanceGrandmasterInfo: 83,
  GetPTPInstancePathCount: 84,
  GetPTPInstancePathTrace: 85,
  GetPTPInstancePerformanceMonitoringCount: 86,
  GetPTPInstancePerformanceMonitoringRecord: 87,
  SetPTPPortInitialIntervals: 88,
  GetPTPPortInitialIntervals: 89,
  GetPTPPortCurrentIntervals: 91,
  SetPTPPortRemoteIntervals: 92,
  GetPTPPortRemoteIntervals: 93,
  SetPTPPortInfo: 94,
  GetPTPPortInfo: 95,
  SetPTPPortOverrides: 96,
  GetPTPPortOverrides: 97,
  GetPTPPortPDelayMonitoringCount: 98,
  GetPTPPortPDelayMonitoringRecord: 99,
  GetPTPPortPerformanceMonitoringCount: 100,
  GetPTPPortPerformanceMonitoringRecord: 101,
  GetPathLatency: 102,
  AuthenticationGetNonce: 103,
  AuthenticationAddKeyNonce: 104,
};

declare const AVB17221ADPEntityCapabilities: {
  DFUMode: 1,
  EFUMode: 1,
  AddressAccessSupported: 2,
  GatewayEntity: 4,
  AEMSupported: 8,
  LegacyAVC: 16,
  AssociationIDSupported: 32,
  AssociationIDValid: 64,
  VendorUniqueSupported: 128,
  ClassASupported: 256,
  ClassBSupported: 512,
  ASSupported: 1024,
  GPTPSupported: 1024,
  AEMAuthenticationSupported: 2048,
  AEMAuthenticationRequired: 4096,
  AEMPersistentAcquireSupported: 8192,
  AEMIdenitifyControlIndexValid: 16384,
  AEMInterfaceIndexValid: 32768,
  GeneralControllerIgnore: 65536,
  EntityNotReady: 131072,
  ACMPAcquireWithAEM: 262144,
  ACMPAuthenticateWithAEM: 524288,
  SupportsUDPv4ATDECC: 1048576,
  SupportsUDPv4Streaming: 2097152,
  SupportsUDPv6ATDECC: 4194304,
  SupportsUDPv6Streaming: 8388608,
  MultiplePTPInstances: 16777216,
  AEMConfigurationIndexValid: 33554432,
};

declare interface AVB17221EntityDiscoveryDelegate {
  didAddRemoteEntityOn17221EntityDiscovery(newEntity: AVB17221Entity, entityDiscovery: AVB17221EntityDiscovery): void;

  didRemoveRemoteEntityOn17221EntityDiscovery(oldEntity: AVB17221Entity, entityDiscovery: AVB17221EntityDiscovery): void;

  didRediscoverRemoteEntityOn17221EntityDiscovery(entity: AVB17221Entity, entityDiscovery: AVB17221EntityDiscovery): void;

  didUpdateRemoteEntityChangedPropertiesOn17221EntityDiscovery(entity: AVB17221Entity, changedProperties: interop.Enum<typeof AVB17221EntityPropertyChanged>, entityDiscovery: AVB17221EntityDiscovery): void;

  didAddLocalEntityOn17221EntityDiscovery(newEntity: AVB17221Entity, entityDiscovery: AVB17221EntityDiscovery): void;

  didRemoveLocalEntityOn17221EntityDiscovery(oldEntity: AVB17221Entity, entityDiscovery: AVB17221EntityDiscovery): void;

  didRediscoverLocalEntityOn17221EntityDiscovery(entity: AVB17221Entity, entityDiscovery: AVB17221EntityDiscovery): void;

  didUpdateLocalEntityChangedPropertiesOn17221EntityDiscovery(entity: AVB17221Entity, changedProperties: interop.Enum<typeof AVB17221EntityPropertyChanged>, entityDiscovery: AVB17221EntityDiscovery): void;
}

declare class AVB17221EntityDiscoveryDelegate extends NativeObject implements AVB17221EntityDiscoveryDelegate {
}

declare interface AVB17221ACMPClient {
  ACMPDidReceiveCommandOnInterface(message: AVB17221ACMPMessage, anInterface: AVB17221ACMPInterface): boolean;

  ACMPDidReceiveResponseOnInterface(message: AVB17221ACMPMessage, anInterface: AVB17221ACMPInterface): boolean;
}

declare class AVB17221ACMPClient extends NativeObject implements AVB17221ACMPClient {
}

declare interface AVB17221AECPClient {
  AECPDidReceiveCommandOnInterface(message: AVB17221AECPMessage, anInterface: AVB17221AECPInterface): boolean;

  AECPDidReceiveResponseOnInterface(message: AVB17221AECPMessage, anInterface: AVB17221AECPInterface): boolean;
}

declare class AVB17221AECPClient extends NativeObject implements AVB17221AECPClient {
}

declare class AVB17221ACMPInterface extends AVB1722ControlInterface {
  readonly multicastDestinationAddress: AVBMACAddress;

  static ACMPInterfaceWithInterface(anInterface: AVBInterface): AVB17221ACMPInterface;

  static ACMPInterfaceWithInterfaceNamed(anInterfaceName: string): AVB17221ACMPInterface;

  setHandlerForEntityID(handler: AVB17221ACMPClient, targetEntityID: number): boolean;

  removeHandlerForEntityID(targetEntityID: number): void;

  sendACMPResponseMessageError(message: AVB17221ACMPMessage, error: interop.PointerConvertible): boolean;

  sendACMPCommandMessageCompletionHandler(message: AVB17221ACMPMessage, completionHandler: (p1: NSError, p2: AVB17221ACMPMessage) => void): boolean;
}

declare class AVB17221ACMPMessage extends NSObject implements NSCopying {
  messageType: interop.Enum<typeof AVB17221ACMPMessageType>;

  status: interop.Enum<typeof AVB17221ACMPStatusCode>;

  streamID: number;

  controllerEntityID: number;

  talkerEntityID: number;

  listenerEntityID: number;

  talkerUniqueID: number;

  listenerUniqueID: number;

  destinationMAC: AVBMACAddress;

  connectionCount: number;

  sequenceID: number;

  flags: interop.Enum<typeof AVB17221ACMPFlags>;

  vlanID: number;

  connectedListenersEntries: number;

  connectedListenersEntriesValid: boolean;

  ipFlags: interop.Enum<typeof AVB17221ACMPIPFlag>;

  sourcePort: number;

  destinationPort: number;

  sourceIPAddress: AVBIPAddress;

  destinationIPAddress: AVBIPAddress;

  sourceMAC: AVBMACAddress;

  static errorForStatusCode(statusCode: interop.Enum<typeof AVB17221ACMPStatusCode>): NSError;

  errorForStatusCode(): NSError;

  setMessageType(messageType: interop.Enum<typeof AVB17221ACMPMessageType>): void;

  setStatus(status: interop.Enum<typeof AVB17221ACMPStatusCode>): void;

  setStreamID(streamID: number): void;

  setControllerEntityID(controllerEntityID: number): void;

  setTalkerEntityID(talkerEntityID: number): void;

  setListenerEntityID(listenerEntityID: number): void;

  setTalkerUniqueID(talkerUniqueID: number): void;

  setListenerUniqueID(listenerUniqueID: number): void;

  setDestinationMAC(destinationMAC: AVBMACAddress | null): void;

  setConnectionCount(connectionCount: number): void;

  setSequenceID(sequenceID: number): void;

  setFlags(flags: interop.Enum<typeof AVB17221ACMPFlags>): void;

  setVlanID(vlanID: number): void;

  setConnectedListenersEntries(connectedListenersEntries: number): void;

  setConnectedListenersEntriesValid(connectedListenersEntriesValid: boolean): void;

  setIpFlags(ipFlags: interop.Enum<typeof AVB17221ACMPIPFlag>): void;

  setSourcePort(sourcePort: number): void;

  setDestinationPort(destinationPort: number): void;

  setSourceIPAddress(sourceIPAddress: AVBIPAddress): void;

  setDestinationIPAddress(destinationIPAddress: AVBIPAddress): void;

  setSourceMAC(sourceMAC: AVBMACAddress | null): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class AVB17221AECPVendorMessage extends AVB17221AECPMessage {
  protocolID: number;

  protocolSpecificData: NSData;

  setProtocolID(protocolID: number): void;

  setProtocolSpecificData(protocolSpecificData: NSData | null): void;
}

declare class AVB17221AECPAVCMessage extends AVB17221AECPMessage {
  commandResponse: NSData;

  setCommandResponse(commandResponse: NSData | null): void;
}

declare class AVB17221AECPAddressAccessTLV extends NSObject {
  mode: interop.Enum<typeof AVB17221AECPAddressAccessTLVMode>;

  address: number;

  memoryData: NSData;

  setMode(mode: interop.Enum<typeof AVB17221AECPAddressAccessTLVMode>): void;

  setAddress(address: number): void;

  setMemoryData(memoryData: NSData | null): void;
}

declare class AVB17221AECPAEMMessage extends AVB17221AECPMessage {
  commandType: interop.Enum<typeof AVB17221AEMCommandType>;

  unsolicited: boolean;

  controllerRequest: boolean;

  commandSpecificData: NSData;

  static commandMessage(): AVB17221AECPAEMMessage;

  static responseMessage(): AVB17221AECPAEMMessage;

  static responseMessageFromCommandMessage(commandMessage: AVB17221AECPAEMMessage): AVB17221AECPAEMMessage;

  setCommandType(commandType: interop.Enum<typeof AVB17221AEMCommandType>): void;

  isUnsolicited(): boolean;

  setUnsolicited(unsolicited: boolean): void;

  isControllerRequest(): boolean;

  setControllerRequest(controllerRequest: boolean): void;

  setCommandSpecificData(commandSpecificData: NSData | null): void;
}

declare class AVB17221AECPMessage extends NSObject implements NSCopying {
  messageType: interop.Enum<typeof AVB17221AECPMessageType>;

  status: interop.Enum<typeof AVB17221AECPStatusCode>;

  targetEntityID: number;

  controllerEntityID: number;

  sequenceID: number;

  sourceMAC: AVBMACAddress;

  static errorForStatusCode(statusCode: interop.Enum<typeof AVB17221AECPStatusCode>): NSError;

  errorForStatusCode(): NSError;

  setMessageType(messageType: interop.Enum<typeof AVB17221AECPMessageType>): void;

  setStatus(status: interop.Enum<typeof AVB17221AECPStatusCode>): void;

  setTargetEntityID(targetEntityID: number): void;

  setControllerEntityID(controllerEntityID: number): void;

  setSequenceID(sequenceID: number): void;

  setSourceMAC(sourceMAC: AVBMACAddress): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class AVB1722ControlInterface extends NSObject {
  readonly interfaceName: string;

  readonly interface: AVBInterface;

  initWithInterfaceName(anInterfaceName: string): this;

  initWithInterface(anInterface: AVBInterface): this;
}

declare class AVBIPAddress extends NSObject implements NSCopying {
  initWithIPv6Address(ipv6Address: interop.PointerConvertible): this;

  initWithIPv6AddressData(ipv6Address: NSData): this;

  initWithIPv4Address(ipv4Address: number): this;

  initWithSockAddr(sockAddr: interop.PointerConvertible): this;

  readonly representsIPv4Address: boolean;

  ipv6Address: NSData;

  ipv4Address: number;

  stringRepresentation: string;

  setIpv6Address(ipv6Address: NSData): void;

  setIpv4Address(ipv4Address: number): void;

  setStringRepresentation(stringRepresentation: string): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class AVBMACAddress extends NSObject implements NSCopying {
  initWithBytes(bytes: interop.PointerConvertible): this;

  readonly bytes: interop.Pointer;

  dataRepresentation: NSData;

  stringRepresentation: string;

  multicast: boolean;

  setDataRepresentation(dataRepresentation: NSData): void;

  setStringRepresentation(stringRepresentation: string): void;

  isMulticast(): boolean;

  setMulticast(multicast: boolean): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class AVBEthernetInterface extends AVBInterface {
}

declare class AVBInterface extends NSObject {
  readonly interfaceName: string;

  readonly entityDiscovery: AVB17221EntityDiscovery;

  readonly aecp: AVB17221AECPInterface;

  readonly acmp: AVB17221ACMPInterface;

  static macAddressForInterfaceNamed(anInterfaceName: string): AVBMACAddress;

  static supportedInterfaces(): NSArray;

  static isAVBEnabledOnInterfaceNamed(anInterfaceName: string): boolean;

  static isAVBCapableInterfaceNamed(anInterfaceName: string): boolean;

  initWithInterfaceName(anInterfaceName: string): this;

  static myEntityID(): number;
}

declare class AVBCentralManager extends NSObject {
  startControllerMatching(): void;

  didAddInterface(interface: AVBInterface): void;

  didRemoveInterface(interface: AVBInterface): void;

  streamingEnabledInterfacesOnly(): boolean;

  static nextAvailableDynamicEntityID(): number;

  static releaseDynamicEntityID(entityID: number): void;

  static nextAvailableDynamicEntityModelID(): number;

  static releaseDynamicEntityModelID(entityModelID: number): void;
}

declare class AVB17221Entity extends NSObject {
  localEntity: boolean;

  timeToLive: number;

  entityID: number;

  entityModelID: number;

  entityCapabilities: interop.Enum<typeof AVB17221ADPEntityCapabilities>;

  talkerStreamSources: number;

  talkerCapabilities: interop.Enum<typeof AVB17221ADPTalkerCapabilities>;

  listenerStreamSinks: number;

  listenerCapabilities: interop.Enum<typeof AVB17221ADPListenerCapabilities>;

  controllerCapabilities: interop.Enum<typeof AVB17221ADPControllerCapabilities>;

  availableIndex: number;

  gPTPGrandmasterID: number;

  gPTPDomainNumber: number;

  identifyControlIndex: number;

  interfaceIndex: number;

  associationID: number;

  currentConfigurationIndex: number;

  get macAddresses(): NSArray;
  set macAddresses(value: NSArray<interop.Object> | Array<interop.Object>);

  entityDiscovery: AVB17221EntityDiscovery;

  isLocalEntity(): boolean;

  setLocalEntity(localEntity: boolean): void;

  setTimeToLive(timeToLive: number): void;

  setEntityID(entityID: number): void;

  setEntityModelID(entityModelID: number): void;

  setEntityCapabilities(entityCapabilities: interop.Enum<typeof AVB17221ADPEntityCapabilities>): void;

  setTalkerStreamSources(talkerStreamSources: number): void;

  setTalkerCapabilities(talkerCapabilities: interop.Enum<typeof AVB17221ADPTalkerCapabilities>): void;

  setListenerStreamSinks(listenerStreamSinks: number): void;

  setListenerCapabilities(listenerCapabilities: interop.Enum<typeof AVB17221ADPListenerCapabilities>): void;

  setControllerCapabilities(controllerCapabilities: interop.Enum<typeof AVB17221ADPControllerCapabilities>): void;

  setAvailableIndex(availableIndex: number): void;

  setGPTPGrandmasterID(gPTPGrandmasterID: number): void;

  setGPTPDomainNumber(gPTPDomainNumber: number): void;

  setIdentifyControlIndex(identifyControlIndex: number): void;

  setInterfaceIndex(interfaceIndex: number): void;

  setAssociationID(associationID: number): void;

  setCurrentConfigurationIndex(currentConfigurationIndex: number): void;

  setMacAddresses(macAddresses: NSArray<interop.Object> | Array<interop.Object>): void;

  setEntityDiscovery(entityDiscovery: AVB17221EntityDiscovery | null): void;
}

declare class AVB17221EntityDiscovery extends NSObject {
  interfaceName: string;

  readonly interface: AVBInterface;

  discoveryDelegate: AVB17221EntityDiscoveryDelegate;

  initWithInterfaceName(anInterfaceName: string): this;

  primeIterators(): void;

  discoverEntities(): boolean;

  discoverEntity(entityID: number): boolean;

  addLocalEntityError(anEntity: AVB17221Entity, error: interop.PointerConvertible): boolean;

  removeLocalEntityError(guid: number, error: interop.PointerConvertible): boolean;

  changeEntityWithEntityIDToNewGPTPGrandmasterIDError(entityID: number, gPTPGrandmasterID: number, error: interop.PointerConvertible): boolean;

  setInterfaceName(interfaceName: string): void;

  setDiscoveryDelegate(discoveryDelegate: AVB17221EntityDiscoveryDelegate | null): void;
}

declare class AVB17221AECPInterface extends AVB1722ControlInterface {
  static AECPInterfaceWithInterface(anInterface: AVBInterface): AVB17221AECPInterface;

  static AECPInterfaceWithInterfaceNamed(anInterfaceName: string): AVB17221AECPInterface;

  setCommandHandlerForEntityID(handler: AVB17221AECPClient, targetEntityID: number): boolean;

  removeCommandHandlerForEntityID(targetEntityID: number): void;

  setResponseHandlerForControllerEntityID(handler: AVB17221AECPClient, controllerEntityID: number): boolean;

  removeResponseHandlerForControllerEntityID(controllerEntityID: number): void;

  sendCommandToMACAddressCompletionHandler(message: AVB17221AECPMessage, destMAC: AVBMACAddress, completionHandler: (p1: NSError, p2: AVB17221AECPMessage) => void): boolean;

  sendResponseToMACAddressError(message: AVB17221AECPMessage, destMAC: AVBMACAddress, error: interop.PointerConvertible): boolean;

  sendVendorUniqueCommandToMACAddressExpectResponseWithinTimeoutCompletionHandler(message: AVB17221AECPVendorMessage, destMAC: AVBMACAddress, timeout: number, completionHandler: (p1: NSError, p2: AVB17221AECPMessage) => void): boolean;
}

declare class AVB17221AECPAddressAccessMessage extends AVB17221AECPMessage {
  get tlvs(): NSArray;
  set tlvs(value: NSArray<interop.Object> | Array<interop.Object>);

  static commandMessage(): AVB17221AECPAddressAccessMessage;

  static responseMessage(): AVB17221AECPAddressAccessMessage;

  setTlvs(tlvs: NSArray<interop.Object> | Array<interop.Object> | null): void;
}


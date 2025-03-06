/// <reference types="@nativescript/objc-node-api" />

declare const MIDICIProfileWasRemovedNotification: string;

declare const MIDICIProfileWasUpdatedNotification: string;

declare const MIDICIDeviceWasRemovedNotification: string;

declare const MIDICIDeviceWasAddedNotification: string;

declare const MIDIUMPFunctionBlockObjectKey: string;

declare const MIDIUMPEndpointObjectKey: string;

declare const MIDIUMPFunctionBlockWasUpdatedNotification: string;

declare const kMIDICIPropertyExchangeBadRequestID: number;

declare const kMIDIDeviceIDFunctionBlock: number;

declare const kMIDIUInteger28Max: number;

declare const kMIDIUInteger14Max: number;

declare const kMIDIUInteger7Max: number;

declare const kMIDIUInteger4Max: number;

declare const MIDIUMPEndpointWasAddedNotification: string;

declare const kMIDIInvalidUniqueID: number;

declare const kMIDIIDNotUnique: number;

declare const kMIDIObjectNotFound: number;

declare const kMIDIWrongThread: number;

declare const kMIDISetupFormatErr: number;

declare const kMIDIServerStartErr: number;

declare const kMIDIMessageSendErr: number;

declare const kMIDINoCurrentSetup: number;

declare const kMIDIUnknownProperty: number;

declare const kMIDINoConnection: number;

declare const kMIDIWrongEndpointType: number;

declare const kMIDIUnknownEndpoint: number;

declare const kMIDIUInteger2Max: number;

declare const kMIDIThruConnection_MaxEndpoints: number;

declare const kMIDIObjectType_ExternalMask: interop.Enum<typeof MIDIObjectType>;

declare const kMIDINotPermitted: number;

declare const kMIDIUnknownError: number;

declare const MIDIChannelsWholePort: number;

declare const MIDIUMPEndpointWasUpdatedNotification: string;

declare const kMIDIInvalidPort: number;

declare const kMIDIInvalidClient: number;

declare const kMIDI1UPMaxSysexSize: number;

declare const kMIDIDeviceIDUMPGroup: number;

declare const MIDIUMPEndpointWasRemovedNotification: string;

declare const MIDICIDeviceObjectKey: string;

declare const kMIDIWrongPropertyType: number;

declare const MIDICIProfileObjectKey: string;

declare const MIDIUMPProtocolOptions: {
  I1: 1,
  I2: 2,
};

declare const MIDICIManagementMessageType: {
  Discovery: 112,
  ReplyToDiscovery: 113,
  InquiryEndpointInformation: 114,
  ReplyToEndpointInformation: 115,
  MIDICIACK: 125,
  InvalidateMUID: 126,
  MIDICINAK: 127,
};

declare const MIDICIPropertyExchangeMessageType: {
  InquiryPropertyExchangeCapabilities: 48,
  ReplyToPropertyExchangeCapabilities: 49,
  InquiryHasPropertyData_Reserved: 50,
  InquiryReplyToHasPropertyData_Reserved: 51,
  InquiryGetPropertyData: 52,
  ReplyToGetProperty: 53,
  InquirySetPropertyData: 54,
  ReplyToSetPropertyData: 55,
  Subscription: 56,
  ReplyToSubscription: 57,
  Notify: 63,
};

declare const MIDICIProfileMessageType: {
  ProfileInquiry: 32,
  ReplyToProfileInquiry: 33,
  SetProfileOn: 34,
  SetProfileOff: 35,
  ProfileEnabledReport: 36,
  ProfileDisabledReport: 37,
  ProfileAdded: 38,
  ProfileRemoved: 39,
  DetailsInquiry: 40,
  ReplyToDetailsInquiry: 41,
  ProfileSpecificData: 47,
};

declare const MIDICICategoryOptions: {
  ProtocolNegotiation: 2,
  ProfileConfigurationSupported: 4,
  PropertyExchangeSupported: 8,
  ProcessInquirySupported: 16,
};

declare const UMPStreamMessageFormat: {
  Complete: 0,
  Start: 1,
  Continuing: 2,
  End: 3,
};

declare const MIDIUMPFunctionBlockUIHint: {
  Unknown: 0,
  Receiver: 1,
  Sender: 2,
  SenderReceiver: 3,
};

declare const MIDIUMPFunctionBlockMIDI1Info: {
  NotMIDI1: 0,
  UnrestrictedBandwidth: 1,
  RestrictedBandwidth: 2,
};

declare const MIDIPerNoteManagementOptions: {
  Reset: 1,
  Detach: 2,
};

declare const MIDIProgramChangeOptions: {
  kMIDIProgramChangeBankValid: 1,
};

declare const MIDINoteAttribute: {
  None: 0,
  ManufacturerSpecific: 1,
  ProfileSpecific: 2,
  Pitch: 3,
};

declare const MIDIUtilityStatus: {
  NOOP: 0,
  JitterReductionClock: 1,
  JitterReductionTimestamp: 2,
  DeltaClockstampTicksPerQuarterNote: 3,
  TicksSinceLastEvent: 4,
};

declare const MIDISysExStatus: {
  Complete: 0,
  Start: 1,
  Continue: 2,
  End: 3,
  MixedDataSetHeader: 8,
  MixedDataSetPayload: 9,
};

declare const MIDICVStatus: {
  NoteOff: 8,
  NoteOn: 9,
  PolyPressure: 10,
  ControlChange: 11,
  ProgramChange: 12,
  ChannelPressure: 13,
  PitchBend: 14,
  RegisteredPNC: 0,
  AssignablePNC: 1,
  RegisteredControl: 2,
  AssignableControl: 3,
  RelRegisteredControl: 4,
  RelAssignableControl: 5,
  PerNotePitchBend: 6,
  PerNoteMgmt: 15,
};

declare const MIDICIDeviceType: {
  Unknown: 0,
  LegacyMIDI1: 1,
  Virtual: 2,
  USBMIDI: 3,
};

declare const MIDINotificationMessageID: {
  SetupChanged: 1,
  ObjectAdded: 2,
  ObjectRemoved: 3,
  PropertyChanged: 4,
  ThruConnectionsChanged: 5,
  SerialPortOwnerChanged: 6,
  IOError: 7,
  InternalStart: 4096,
};

declare const MIDIProtocolID: {
  Protocol_1_0: 1,
  Protocol_2_0: 2,
};

declare const MIDIObjectType: {
  Other: -1,
  Device: 0,
  Entity: 1,
  Source: 2,
  Destination: 3,
  ExternalDevice: 16,
  ExternalEntity: 17,
  ExternalSource: 18,
  ExternalDestination: 19,
};

declare const MIDIMessageType: {
  Utility: 0,
  System: 1,
  ChannelVoice1: 2,
  SysEx: 3,
  ChannelVoice2: 4,
  Data128: 5,
  FlexData: 13,
  UnknownF: 15,
  Stream: 15,
  Invalid: 255,
};

declare const MIDITransformType: {
  None: 0,
  FilterOut: 1,
  MapControl: 2,
  Add: 8,
  Scale: 9,
  MinValue: 10,
  MaxValue: 11,
  MapValue: 12,
};

declare const MIDICIProfileType: {
  SingleChannel: 1,
  Group: 2,
  FunctionBlock: 3,
  Multichannel: 4,
};

declare const MIDICIProcessInquiryMessageType: {
  InquiryProcessInquiryCapabilities: 64,
  ReplyToProcessInquiryCapabilities: 65,
  InquiryMIDIMessageReport: 66,
  ReplyToMIDIMessageReport: 67,
  EndOfMIDIMessageReport: 68,
};

declare const MIDISystemStatus: {
  StartOfExclusive: 240,
  EndOfExclusive: 247,
  MTC: 241,
  SongPosPointer: 242,
  SongSelect: 243,
  TuneRequest: 246,
  TimingClock: 248,
  Start: 250,
  Continue: 251,
  Stop: 252,
  ActiveSending: 254,
  ActiveSensing: 254,
  SystemReset: 255,
};

declare const MIDINetworkConnectionPolicy: {
  NoOne: 0,
  HostsInContactList: 1,
  Anyone: 2,
};

declare const MIDITransformControlType: {
  Type_7Bit: 0,
  Type_14Bit: 1,
  Type_7BitRPN: 2,
  Type_14BitRPN: 3,
  Type_7BitNRPN: 4,
  Type_14BitNRPN: 5,
};

declare const UMPStreamMessageStatus: {
  EndpointDiscovery: 0,
  EndpointInfoNotification: 1,
  DeviceIdentityNotification: 2,
  EndpointNameNotification: 3,
  ProductInstanceIDNotification: 4,
  StreamConfigurationRequest: 5,
  StreamConfigurationNotification: 6,
  FunctionBlockDiscovery: 16,
  FunctionBlockInfoNotification: 17,
  FunctionBlockNameNotification: 18,
  StartOfClip: 32,
  EndOfClip: 33,
};

declare const MIDIUMPFunctionBlockDirection: {
  Unknown: 0,
  Input: 1,
  Output: 2,
  Bidirectional: 3,
};

declare const MIDIUMPCIObjectBackingType: {
  Unknown: 0,
  Virtual: 1,
  DriverDevice: 2,
  USBMIDI: 3,
};

declare class MIDICIDeviceIdentification {
  constructor(init?: MIDICIDeviceIdentification);
  manufacturer: unknown /* const array */;
  family: unknown /* const array */;
  modelNumber: unknown /* const array */;
  revisionLevel: unknown /* const array */;
  reserved: unknown /* const array */;
}

declare class MIDICIProfileIDManufacturerSpecific {
  constructor(init?: MIDICIProfileIDManufacturerSpecific);
  sysExID1: number;
  sysExID2: number;
  sysExID3: number;
  info1: number;
  info2: number;
}

declare class MIDICIProfileIDStandard {
  constructor(init?: MIDICIProfileIDStandard);
  profileIDByte1: number;
  profileBank: number;
  profileNumber: number;
  profileVersion: number;
  profileLevel: number;
}

declare class MIDI2DeviceManufacturer {
  constructor(init?: MIDI2DeviceManufacturer);
  sysExIDByte: unknown /* const array */;
}

declare class unnamed_7015280092647993794 {
  constructor(init?: unnamed_7015280092647993794);
  status: interop.Enum<typeof MIDISysExStatus>;
}

declare class unnamed_7768512638681579653 {
  constructor(init?: unnamed_7768512638681579653);
  bank: number;
  index: number;
  data: number;
}

declare class unnamed_16390353980619917710 {
  constructor(init?: unnamed_16390353980619917710);
  data: number;
  reserved: unknown /* const array */;
}

declare class unnamed_5749934841809323882 {
  constructor(init?: unnamed_5749934841809323882);
  options: interop.Enum<typeof MIDIProgramChangeOptions>;
  program: number;
  reserved: unknown /* const array */;
  bank: number;
}

declare class unnamed_2473012244058360751 {
  constructor(init?: unnamed_2473012244058360751);
  number: number;
  attributeType: interop.Enum<typeof MIDINoteAttribute>;
  velocity: number;
  attribute: number;
}

declare class unnamed_12568206542570764764 {
  constructor(init?: unnamed_12568206542570764764);
  status: interop.Enum<typeof MIDICVStatus>;
  channel: number;
  reserved: unknown /* const array */;
}

declare class unnamed_9796379406484781992 {
  constructor(init?: unnamed_9796379406484781992);
  status: interop.Enum<typeof MIDISysExStatus>;
  channel: number;
  data: unknown /* const array */;
  reserved: number;
}

declare class unnamed_12226403525873125208 {
  constructor(init?: unnamed_12226403525873125208);
  index: number;
  data: number;
}

declare class unnamed_15654849234996699999 {
  constructor(init?: unnamed_15654849234996699999);
  number: number;
  velocity: number;
}

declare class unnamed_2673744219827787119 {
  constructor(init?: unnamed_2673744219827787119);
  status: interop.Enum<typeof MIDISystemStatus>;
}

declare class unnamed_1111712120452702596 {
  constructor(init?: unnamed_1111712120452702596);
  status: interop.Enum<typeof MIDIUtilityStatus>;
}

declare class MIDIMessage_128 {
  constructor(init?: MIDIMessage_128);
  word0: number;
  word1: number;
  word2: number;
  word3: number;
}

declare class MIDIMessage_64 {
  constructor(init?: MIDIMessage_64);
  word0: number;
  word1: number;
}

declare class MIDIDriverInterface {
  constructor(init?: MIDIDriverInterface);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  FindDevices: (p1: interop.PointerConvertible, p2: number) => number | null;
  Start: (p1: interop.PointerConvertible, p2: number) => number | null;
  Stop: (p1: interop.PointerConvertible) => number | null;
  Configure: (p1: interop.PointerConvertible, p2: number) => number | null;
  Send: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  EnableSource: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  Flush: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  Monitor: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  SendPackets: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  MonitorEvents: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
}

declare class MIDITransform {
  constructor(init?: MIDITransform);
  transform: interop.Enum<typeof MIDITransformType>;
  param: number;
}

declare class MIDIValueMap {
  constructor(init?: MIDIValueMap);
  value: unknown /* const array */;
}

declare class MIDIUniversalMessage {
  constructor(init?: MIDIUniversalMessage);
  type: interop.Enum<typeof MIDIMessageType>;
  group: number;
  reserved: unknown /* const array */;
}

declare class MIDIIOErrorNotification {
  constructor(init?: MIDIIOErrorNotification);
  messageID: interop.Enum<typeof MIDINotificationMessageID>;
  messageSize: number;
  driverDevice: number;
  errorCode: number;
}

declare class MIDIObjectPropertyChangeNotification {
  constructor(init?: MIDIObjectPropertyChangeNotification);
  messageID: interop.Enum<typeof MIDINotificationMessageID>;
  messageSize: number;
  object: number;
  objectType: interop.Enum<typeof MIDIObjectType>;
  propertyName: interop.Pointer;
}

declare class MIDIEventPacket {
  constructor(init?: MIDIEventPacket);
  timeStamp: number;
  wordCount: number;
  words: unknown /* const array */;
}

declare class MIDINotification {
  constructor(init?: MIDINotification);
  messageID: interop.Enum<typeof MIDINotificationMessageID>;
  messageSize: number;
}

declare class MIDISysexSendRequest {
  constructor(init?: MIDISysexSendRequest);
  destination: number;
  data: interop.Pointer;
  bytesToSend: number;
  complete: number;
  reserved: unknown /* const array */;
  completionProc: (p1: interop.PointerConvertible) => void | null;
  completionRefCon: interop.Pointer;
}

declare class MIDIMessage_96 {
  constructor(init?: MIDIMessage_96);
  word0: number;
  word1: number;
  word2: number;
}

declare class unnamed_10267001446006520639 {
  constructor(init?: unnamed_10267001446006520639);
  index: number;
  reserved: number;
  data: number;
}

declare class unnamed_15004637805443251253 {
  constructor(init?: unnamed_15004637805443251253);
  byteCount: number;
  streamID: number;
  data: unknown /* const array */;
  reserved: number;
}

declare class unnamed_83953753588401314 {
  constructor(init?: unnamed_83953753588401314);
  note: number;
  options: interop.Enum<typeof MIDIPerNoteManagementOptions>;
  reserved: unknown /* const array */;
}

declare class unnamed_6709909799421502379 {
  constructor(init?: unnamed_6709909799421502379);
  noteNumber: number;
  reserved: number;
  pressure: number;
}

declare class MIDIThruConnectionParams {
  constructor(init?: MIDIThruConnectionParams);
  version: number;
  numSources: number;
  sources: unknown /* const array */;
  numDestinations: number;
  destinations: unknown /* const array */;
  channelMap: unknown /* const array */;
  lowVelocity: number;
  highVelocity: number;
  lowNote: number;
  highNote: number;
  noteNumber: MIDITransform;
  velocity: MIDITransform;
  keyPressure: MIDITransform;
  channelPressure: MIDITransform;
  programChange: MIDITransform;
  pitchBend: MIDITransform;
  filterOutSysEx: number;
  filterOutMTC: number;
  filterOutBeatClock: number;
  filterOutTuneRequest: number;
  reserved2: unknown /* const array */;
  filterOutAllControls: number;
  numControlTransforms: number;
  numMaps: number;
  reserved3: unknown /* const array */;
}

declare class unnamed_15246534396281155555 {
  constructor(init?: unnamed_15246534396281155555);
  mdsID: number;
  data: unknown /* const array */;
  reserved: number;
}

declare class unnamed_9187715356760705211 {
  constructor(init?: unnamed_9187715356760705211);
  noteNumber: number;
  reserved: number;
  bend: number;
}

declare class MIDI2DeviceRevisionLevel {
  constructor(init?: MIDI2DeviceRevisionLevel);
  revisionLevel: unknown /* const array */;
}

declare class MIDISysexSendRequestUMP {
  constructor(init?: MIDISysexSendRequestUMP);
  destination: number;
  words: interop.Pointer;
  wordsToSend: number;
  complete: number;
  completionProc: (p1: interop.PointerConvertible) => void | null;
  completionRefCon: interop.Pointer;
}

declare class unnamed_16520316956806360299 {
  constructor(init?: unnamed_16520316956806360299);
  noteNumber: number;
  pressure: number;
}

declare class unnamed_1887813803087812203 {
  constructor(init?: unnamed_1887813803087812203);
  words: unknown /* const array */;
}

declare class MIDIControlTransform {
  constructor(init?: MIDIControlTransform);
  controlType: interop.Enum<typeof MIDITransformControlType>;
  remappedControlType: interop.Enum<typeof MIDITransformControlType>;
  controlNumber: number;
  transform: interop.Enum<typeof MIDITransformType>;
  param: number;
}

declare class MIDIPacket {
  constructor(init?: MIDIPacket);
  timeStamp: number;
  length: number;
  data: unknown /* const array */;
}

declare class unnamed_17811168451516294020 {
  constructor(init?: unnamed_17811168451516294020);
  data: number;
  reserved: unknown /* const array */;
}

declare class MIDIObjectAddRemoveNotification {
  constructor(init?: MIDIObjectAddRemoveNotification);
  messageID: interop.Enum<typeof MIDINotificationMessageID>;
  messageSize: number;
  parent: number;
  parentType: interop.Enum<typeof MIDIObjectType>;
  child: number;
  childType: interop.Enum<typeof MIDIObjectType>;
}

declare class unnamed_1084297633347470628 {
  constructor(init?: unnamed_1084297633347470628);
  status: interop.Enum<typeof MIDICVStatus>;
  channel: number;
  reserved: unknown /* const array */;
}

declare class MIDIThruConnectionEndpoint {
  constructor(init?: MIDIThruConnectionEndpoint);
  endpointRef: number;
  uniqueID: number;
}

declare class unnamed_15007952048346925891 {
  constructor(init?: unnamed_15007952048346925891);
  noteNumber: number;
  index: number;
  data: number;
}

type unnamed_9071754058892995561Descriptor = 
  | { sysex8: unnamed_15004637805443251253 }
  | { mixedDataSet: unnamed_15246534396281155555 };

declare class unnamed_9071754058892995561 {
  constructor(init?: unnamed_9071754058892995561Descriptor);
  sysex8: unnamed_15004637805443251253;
  mixedDataSet: unnamed_15246534396281155555;
}

type unnamed_15836375106302822790Descriptor = 
  | { timeCode: number }
  | { songPositionPointer: number }
  | { songSelect: number };

declare class unnamed_15836375106302822790 {
  constructor(init?: unnamed_15836375106302822790Descriptor);
  timeCode: number;
  songPositionPointer: number;
  songSelect: number;
}

type unnamed_8118046995719257731Descriptor = 
  | { jitterReductionClock: number }
  | { jitterReductionTimestamp: number };

declare class unnamed_8118046995719257731 {
  constructor(init?: unnamed_8118046995719257731Descriptor);
  jitterReductionClock: number;
  jitterReductionTimestamp: number;
}

type unnamed_9085785635251080792Descriptor = 
  | { note: unnamed_2473012244058360751 }
  | { polyPressure: unnamed_6709909799421502379 }
  | { controlChange: unnamed_10267001446006520639 }
  | { programChange: unnamed_5749934841809323882 }
  | { channelPressure: unnamed_17811168451516294020 }
  | { pitchBend: unnamed_16390353980619917710 }
  | { perNoteController: unnamed_15007952048346925891 }
  | { controller: unnamed_7768512638681579653 }
  | { perNotePitchBend: unnamed_9187715356760705211 }
  | { perNoteManagement: unnamed_83953753588401314 };

declare class unnamed_9085785635251080792 {
  constructor(init?: unnamed_9085785635251080792Descriptor);
  note: unnamed_2473012244058360751;
  polyPressure: unnamed_6709909799421502379;
  controlChange: unnamed_10267001446006520639;
  programChange: unnamed_5749934841809323882;
  channelPressure: unnamed_17811168451516294020;
  pitchBend: unnamed_16390353980619917710;
  perNoteController: unnamed_15007952048346925891;
  controller: unnamed_7768512638681579653;
  perNotePitchBend: unnamed_9187715356760705211;
  perNoteManagement: unnamed_83953753588401314;
}

type MIDICIProfileIDDescriptor = 
  | { standard: MIDICIProfileIDStandard }
  | { manufacturerSpecific: MIDICIProfileIDManufacturerSpecific };

declare class MIDICIProfileID {
  constructor(init?: MIDICIProfileIDDescriptor);
  standard: MIDICIProfileIDStandard;
  manufacturerSpecific: MIDICIProfileIDManufacturerSpecific;
}

type unnamed_3925731857963927765Descriptor = 
  | { utility: unnamed_1111712120452702596 }
  | { system: unnamed_2673744219827787119 }
  | { channelVoice1: unnamed_1084297633347470628 }
  | { sysEx: unnamed_9796379406484781992 }
  | { channelVoice2: unnamed_12568206542570764764 }
  | { data128: unnamed_7015280092647993794 }
  | { unknown: unnamed_1887813803087812203 };

declare class unnamed_3925731857963927765 {
  constructor(init?: unnamed_3925731857963927765Descriptor);
  utility: unnamed_1111712120452702596;
  system: unnamed_2673744219827787119;
  channelVoice1: unnamed_1084297633347470628;
  sysEx: unnamed_9796379406484781992;
  channelVoice2: unnamed_12568206542570764764;
  data128: unnamed_7015280092647993794;
  unknown: unnamed_1887813803087812203;
}

type unnamed_5870401556851984646Descriptor = 
  | { note: unnamed_15654849234996699999 }
  | { polyPressure: unnamed_16520316956806360299 }
  | { controlChange: unnamed_12226403525873125208 }
  | { program: number }
  | { channelPressure: number }
  | { pitchBend: number };

declare class unnamed_5870401556851984646 {
  constructor(init?: unnamed_5870401556851984646Descriptor);
  note: unnamed_15654849234996699999;
  polyPressure: unnamed_16520316956806360299;
  controlChange: unnamed_12226403525873125208;
  program: number;
  channelPressure: number;
  pitchBend: number;
}

declare class MIDICIDeviceManager extends NSObject {
  static readonly sharedInstance: MIDICIDeviceManager;

  readonly discoveredCIDevices: NSArray;
}

declare class MIDIUMPMutableEndpoint extends MIDIUMPEndpoint {
  get mutableFunctionBlocks(): NSArray;
  set mutableFunctionBlocks(value: NSArray<interop.Object> | Array<interop.Object>);

  readonly isEnabled: boolean;

  initWithNameDeviceInfoProductInstanceIDMIDIProtocolDestinationCallback(name: string, deviceInfo: MIDI2DeviceInfo, productInstanceID: string, MIDIProtocol: interop.Enum<typeof MIDIProtocolID>, destinationCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void): this;

  setNameError(name: string, error: interop.PointerConvertible): boolean;

  registerFunctionBlocksMarkAsStaticError(functionBlocks: NSArray<interop.Object> | Array<interop.Object>, markAsStatic: boolean, error: interop.PointerConvertible): boolean;

  setEnabledError(isEnabled: boolean, error: interop.PointerConvertible): boolean;
}

declare class MIDIUMPEndpointManager extends NSObject {
  static readonly sharedInstance: MIDIUMPEndpointManager;

  readonly UMPEndpoints: NSArray;
}

declare class MIDIUMPEndpoint extends NSObject {
  readonly name: string;

  readonly MIDIProtocol: interop.Enum<typeof MIDIProtocolID>;

  readonly supportedMIDIProtocols: interop.Enum<typeof MIDIUMPProtocolOptions>;

  readonly MIDIDestination: number;

  readonly MIDISource: number;

  readonly deviceInfo: MIDI2DeviceInfo;

  readonly productInstanceID: string;

  readonly hasStaticFunctionBlocks: boolean;

  readonly hasJRTSReceiveCapability: boolean;

  readonly hasJRTSTransmitCapability: boolean;

  readonly endpointType: interop.Enum<typeof MIDIUMPCIObjectBackingType>;

  get functionBlocks(): NSArray;
  set functionBlocks(value: NSArray<interop.Object> | Array<interop.Object>);
}

declare class MIDI2DeviceInfo extends NSObject {
  readonly manufacturerID: MIDI2DeviceManufacturer;

  readonly family: number;

  readonly modelNumber: number;

  readonly revisionLevel: MIDI2DeviceRevisionLevel;

  initWithManufacturerIDFamilyModelNumberRevisionLevel(manufacturerID: MIDI2DeviceManufacturer, family: number, modelNumber: number, revisionLevel: MIDI2DeviceRevisionLevel): this;
}

declare class MIDICIDevice extends NSObject {
  readonly deviceInfo: MIDI2DeviceInfo;

  readonly MUID: number;

  readonly supportsProtocolNegotiation: boolean;

  readonly supportsProfileConfiguration: boolean;

  readonly supportsPropertyExchange: boolean;

  readonly supportsProcessInquiry: boolean;

  readonly maxSysExSize: number;

  readonly maxPropertyExchangeRequests: number;

  readonly deviceType: interop.Enum<typeof MIDICIDeviceType>;

  readonly profiles: NSArray;
}

// @ts-ignore ClassDecl.tsIgnore
declare class MIDIUMPMutableFunctionBlock extends MIDIUMPFunctionBlock {
  // @ts-ignore MemberDecl.tsIgnore
  readonly UMPEndpoint: MIDIUMPMutableEndpoint;

  initWithNameDirectionFirstGroupTotalGroupsSpannedMaxSysEx8StreamsMIDI1InfoUIHintIsEnabled(name: string, direction: interop.Enum<typeof MIDIUMPFunctionBlockDirection>, firstGroup: number, totalGroupsSpanned: number, maxSysEx8Streams: number, MIDI1Info: interop.Enum<typeof MIDIUMPFunctionBlockMIDI1Info>, UIHint: interop.Enum<typeof MIDIUMPFunctionBlockUIHint>, isEnabled: boolean): this;

  setEnabledError(isEnabled: boolean, error: interop.PointerConvertible): boolean;

  setNameError(name: string, error: interop.PointerConvertible): boolean;

  reconfigureWithFirstGroupDirectionMIDI1InfoUIHintError(firstGroup: number, direction: interop.Enum<typeof MIDIUMPFunctionBlockDirection>, MIDI1Info: interop.Enum<typeof MIDIUMPFunctionBlockMIDI1Info>, UIHint: interop.Enum<typeof MIDIUMPFunctionBlockUIHint>, error: interop.PointerConvertible): boolean;
}

declare class MIDIUMPFunctionBlock extends NSObject {
  readonly name: string;

  readonly functionBlockID: number;

  readonly direction: interop.Enum<typeof MIDIUMPFunctionBlockDirection>;

  readonly firstGroup: number;

  readonly totalGroupsSpanned: number;

  readonly maxSysEx8Streams: number;

  readonly MIDI1Info: interop.Enum<typeof MIDIUMPFunctionBlockMIDI1Info>;

  readonly UIHint: interop.Enum<typeof MIDIUMPFunctionBlockUIHint>;

  readonly UMPEndpoint: MIDIUMPEndpoint;

  readonly midiCIDevice: MIDICIDevice;

  readonly isEnabled: boolean;
}


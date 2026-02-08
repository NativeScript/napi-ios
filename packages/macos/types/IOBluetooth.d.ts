/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./Foundation.d.ts" />

declare const IOBluetoothPDUTimestamp: string;

declare const IOBluetoothPDUProtocolID: string;

declare const IOBluetoothPDUOriginatingAddressType: string;

declare const IOBluetoothPDUOriginatingAddress: string;

declare const IOBluetoothPDUType: string;

declare const IOBluetoothHandsFreeCallName: string;

declare const IOBluetoothHandsFreeCallMultiparty: string;

declare const IOBluetoothHandsFreeCallMode: string;

declare const IOBluetoothHandsFreeCallDirection: string;

declare const IOBluetoothHandsFreeIndicatorBattChg: string;

declare const IOBluetoothHandsFreeIndicatorSignal: string;

declare const IOBluetoothHandsFreeIndicatorCallSetup: string;

declare const IOBluetoothHandsFreeIndicatorCall: string;

declare const IOBluetoothHandsFreeIndicatorService: string;

declare const kFTSListingTypeKey: interop.Object;

declare const kFTSListingNameKey: interop.Object;

declare const kFTSProgressTransferRateKey: interop.Object;

declare const kFTSProgressTimeElapsedKey: interop.Object;

declare const kFTSProgressBytesTransferredKey: interop.Object;

declare const kOBEXHeaderIDKeyUnknown1ByteQuantity: interop.Object;

declare const kOBEXHeaderIDKeyUnknownByteSequence: interop.Object;

declare const kOBEXHeaderIDKeyUnknownUnicodeText: interop.Object;

declare const kOBEXHeaderIDKeyObjectClass: interop.Object;

declare const kOBEXHeaderIDKeyAuthorizationResponse: interop.Object;

declare const kOBEXHeaderIDKeyAppParameters: interop.Object;

declare const kOBEXHeaderIDKeyHTTP: interop.Object;

declare const kOBEXHeaderIDKeyTarget: interop.Object;

declare const kOBEXHeaderIDKeyDescription: interop.Object;

declare const kOBEXHeaderIDKeyType: interop.Object;

declare const IOBluetoothL2CAPChannelTerminatedNotification: string;

declare const kOBEXHeaderIDKeyBody: interop.Object;

declare const IOBluetoothHostControllerPoweredOnNotification: string;

declare const IOBluetoothPDUUserData: string;

declare const IOBluetoothHostControllerPoweredOffNotification: string;

declare const kOBEXHeaderIDKeyAuthorizationChallenge: interop.Object;

declare const kOBEXHeaderIDKeyConnectionID: interop.Object;

declare const kOBEXHeaderIDKeyName: interop.Object;

declare const kOBEXHeaderIDKeyByteSequence: interop.Object;

declare const kOBEXHeaderIDKeyCount: interop.Object;

declare const kOBEXHeaderIDKeyEndOfBody: interop.Object;

declare const kOBEXHeaderIDKeyTime4Byte: interop.Object;

declare const IOBluetoothPDUServiceCenterAddressType: string;

declare const IOBluetoothHandsFreeIndicatorRoam: string;

declare const kOBEXHeaderIDKeyUnknown4ByteQuantity: interop.Object;

declare const IOBluetoothHandsFreeCallNumber: string;

declare const IOBluetoothHandsFreeCallIndex: string;

declare const kFTSProgressBytesTotalKey: interop.Object;

declare const kOBEXHeaderIDKeyLength: interop.Object;

declare const kFTSProgressPercentageKey: interop.Object;

declare const IOBluetoothPDUServicCenterAddress: string;

declare const IOBluetoothPDUEncoding: string;

declare const kFTSProgressPrecentageKey: interop.Object;

declare const kOBEXHeaderIDKeyWho: interop.Object;

declare const kOBEXHeaderIDKeyUserDefined: interop.Object;

declare const IOBluetoothHandsFreeIndicatorCallHeld: string;

declare const IOBluetoothL2CAPChannelPublishedNotification: string;

declare const IOBluetoothHandsFreeCallStatus: string;

declare const IOBluetoothHandsFreeCallType: string;

declare const kOBEXHeaderIDKeyTimeISO: interop.Object;

declare const kFTSProgressEstimatedTimeKey: interop.Object;

declare const kFTSListingSizeKey: interop.Object;

declare const IOBluetoothHandsFreeCallHoldModes: {
  Mode0: 1,
  Mode1: 2,
  Mode1idx: 4,
  Mode2: 8,
  Mode2idx: 16,
  Mode3: 32,
  Mode4: 64,
};

declare const IOBluetoothHandsFreeCodecID: {
  DCVSD: 1,
  DmSBC: 2,
  DAACELD: -128,
};

declare const IOBluetoothHandsFreePDUMessageStatus: {
  RecUnread: 0,
  RecRead: 1,
  StoUnsent: 2,
  StoSent: 3,
  All: 4,
};

declare const IOBluetoothDeviceSearchOptionsBits: {
  None: 0,
  AlwaysStartInquiry: 1,
  DiscardCachedResults: 2,
};

declare const FTSFileType: {
  Folder: 1,
  File: 2,
};

declare const IOBluetoothHandsFreeAudioGatewayFeatures: {
  None: 0,
  ThreeWayCalling: 1,
  ECAndOrNRFunction: 2,
  VoiceRecognition: 4,
  InBandRingTone: 8,
  AttachedNumberToVoiceTag: 16,
  RejectCallCapability: 32,
  EnhancedCallStatus: 64,
  EnhancedCallControl: 128,
  ExtendedErrorResultCodes: 256,
  CodecNegotiation: 512,
};

declare const IOBluetoothHandsFreeDeviceFeatures: {
  None: 0,
  ECAndOrNRFunction: 1,
  ThreeWayCalling: 2,
  CLIPresentation: 4,
  VoiceRecognition: 8,
  RemoteVolumeControl: 16,
  EnhancedCallStatus: 32,
  EnhancedCallControl: 64,
  CodecNegotiation: 128,
};

declare const OBEXOpCodeSessionValues: {
  CreateSession: 0,
  CloseSession: 1,
  SuspendSession: 2,
  ResumeSession: 3,
  SetTimeout: 4,
};

declare const OBEXRealmValues: {
  ASCII: 0,
  ISO88591: 1,
  ISO88592: 2,
  ISO88593: 3,
  ISO88594: 4,
  ISO88595: 5,
  ISO88596: 6,
  ISO88597: 7,
  ISO88598: 8,
  ISO88599: 9,
  UNICODE: 255,
};

declare const OBEXErrorCodes: {
  ErrorRangeMin: -21850,
  ErrorRangeMax: -21899,
  Success: 0,
  GeneralError: -21850,
  NoResourcesError: -21851,
  UnsupportedError: -21852,
  InternalError: -21853,
  BadArgumentError: -21854,
  TimeoutError: -21855,
  BadRequestError: -21856,
  CancelledError: -21857,
  ForbiddenError: -21858,
  UnauthorizedError: -21859,
  NotAcceptableError: -21860,
  ConflictError: -21861,
  MethodNotAllowedError: -21862,
  NotFoundError: -21863,
  NotImplementedError: -21864,
  PreconditionFailedError: -21865,
  SessionBusyError: -21875,
  SessionNotConnectedError: -21876,
  SessionBadRequestError: -21877,
  SessionBadResponseError: -21878,
  SessionNoTransportError: -21879,
  SessionTransportDiedError: -21880,
  SessionTimeoutError: -21881,
  SessionAlreadyConnectedError: -21882,
};

declare const IOBluetoothL2CAPChannelEventType: {
  Data: 1,
  OpenComplete: 2,
  Closed: 3,
  Reconfigured: 4,
  WriteComplete: 5,
  QueueSpaceAvailable: 6,
};

declare const OBEXPutFlagValues: {
  FlagNone: 0,
  FlagGoToParentDirFirst: 1,
  FlagDontCreateDirectory: 2,
  Flag2Reserved: 4,
  Flag3Reserved: 8,
  Flag4Reserved: 16,
  Flag5Reserved: 32,
  Flag6Reserved: 64,
  Flag7Reserved: 128,
};

declare const OBEXVersions: {
  kOBEXVersion10: 16,
};

declare const OBEXTransportEventTypes: {
  DataReceived: 1147237441,
  Status: 1400136020,
};

declare const OBEXHeaderIdentifiers: {
  Name: 1,
  Description: 5,
  ReservedRangeStart: 16,
  ReservedRangeEnd: 47,
  UserDefinedRangeStart: 48,
  UserDefinedRangeEnd: 63,
  Type: 66,
  TimeISO: 68,
  Target: 70,
  HTTP: 71,
  Body: 72,
  EndOfBody: 73,
  Who: 74,
  AppParameters: 76,
  AuthorizationChallenge: 77,
  AuthorizationResponse: 78,
  ObjectClass: 79,
  Count: 192,
  Length: 195,
  Time4Byte: 196,
  ConnectionID: 203,
  OBEX13WANUUID: 80,
  OBEX13ObjectClass: 81,
  OBEX13SessionParameters: 82,
  OBEX13SessionSequenceNumber: 147,
  OBEX13CreatorID: 207,
};

declare const OBEXSessionEventTypes: {
  ConnectCommandResponseReceived: 1329808707,
  DisconnectCommandResponseReceived: 1329808708,
  PutCommandResponseReceived: 1329808720,
  GetCommandResponseReceived: 1329808711,
  SetPathCommandResponseReceived: 1329808723,
  AbortCommandResponseReceived: 1329808705,
  ConnectCommandReceived: 1330857283,
  DisconnectCommandReceived: 1330857284,
  PutCommandReceived: 1330857296,
  GetCommandReceived: 1330857287,
  SetPathCommandReceived: 1330857299,
  AbortCommandReceived: 1330857281,
  Error: 1330070853,
};

declare const OBEXSessionParameterTags: {
  DeviceAddress: 0,
  Nonce: 1,
  SessionID: 2,
  NextSequenceNumber: 3,
  Timeout: 4,
  SessionOpcode: 5,
};

declare const IOBluetoothHandsFreeSMSSupport: {
  Phase2: 1,
  Phase2p: 2,
  ManufactureSpecific: 4,
};

declare const IOBluetoothUserNotificationChannelDirection: {
  Any: 0,
  Incoming: 1,
  Outgoing: 2,
};

declare const IOBluetoothDeviceSearchTypesBits: {
  Classic: 1,
  LE: 2,
};

declare const IOBluetoothSMSMode: {
  PDU: 0,
  Text: 1,
};

declare const OBEXNonceFlagValues: {
  FlagNone: 0,
  FlagSendUserIDInResponse: 1,
  FlagAccessModeReadOnly: 2,
  Flag2Reserved: 4,
  Flag3Reserved: 8,
  Flag4Reserved: 16,
  Flag5Reserved: 32,
  Flag6Reserved: 64,
  Flag7Reserved: 128,
};

declare const OBEXOpCodeCommandValues: {
  Reserved: 4,
  Connect: 128,
  Disconnect: 129,
  Put: 2,
  PutWithHighBitSet: 130,
  Get: 3,
  GetWithHighBitSet: 131,
  ReservedWithHighBitSet: 132,
  SetPath: 133,
  Abort: 255,
  ReservedRangeStart: 6,
  ReservedRangeEnd: 15,
  UserDefinedStart: 16,
  UserDefinedEnd: 31,
};

declare const OBEXConnectFlagValues: {
  FlagNone: 0,
  FlagSupportMultipleItLMPConnections: 1,
  Flag1Reserved: 2,
  Flag2Reserved: 4,
  Flag3Reserved: 8,
  Flag4Reserved: 16,
  Flag5Reserved: 32,
  Flag6Reserved: 64,
  Flag7Reserved: 128,
};

declare const OBEXOpCodeResponseValues: {
  ReservedRangeStart: 0,
  ReservedRangeEnd: 15,
  Continue: 16,
  ContinueWithFinalBit: 144,
  Success: 32,
  SuccessWithFinalBit: 160,
  Created: 33,
  CreatedWithFinalBit: 161,
  Accepted: 34,
  AcceptedWithFinalBit: 162,
  NonAuthoritativeInfo: 35,
  NonAuthoritativeInfoWithFinalBit: 163,
  NoContent: 36,
  NoContentWithFinalBit: 164,
  ResetContent: 37,
  ResetContentWithFinalBit: 165,
  PartialContent: 38,
  PartialContentWithFinalBit: 166,
  MultipleChoices: 48,
  MultipleChoicesWithFinalBit: 176,
  MovedPermanently: 49,
  MovedPermanentlyWithFinalBit: 177,
  MovedTemporarily: 50,
  MovedTemporarilyWithFinalBit: 178,
  SeeOther: 51,
  SeeOtherWithFinalBit: 179,
  NotModified: 52,
  NotModifiedWithFinalBit: 180,
  UseProxy: 53,
  UseProxyWithFinalBit: 181,
  BadRequest: 64,
  BadRequestWithFinalBit: 192,
  Unauthorized: 65,
  UnauthorizedWithFinalBit: 193,
  PaymentRequired: 66,
  PaymentRequiredWithFinalBit: 194,
  Forbidden: 67,
  ForbiddenWithFinalBit: 195,
  NotFound: 68,
  NotFoundWithFinalBit: 196,
  MethodNotAllowed: 69,
  MethodNotAllowedWithFinalBit: 197,
  NotAcceptable: 70,
  NotAcceptableWithFinalBit: 198,
  ProxyAuthenticationRequired: 71,
  ProxyAuthenticationRequiredWithFinalBit: 199,
  RequestTimeOut: 72,
  RequestTimeOutWithFinalBit: 200,
  Conflict: 73,
  ConflictWithFinalBit: 201,
  Gone: 74,
  GoneWithFinalBit: 202,
  LengthRequired: 75,
  LengthRequiredFinalBit: 203,
  PreconditionFailed: 76,
  PreconditionFailedWithFinalBit: 204,
  RequestedEntityTooLarge: 77,
  RequestedEntityTooLargeWithFinalBit: 205,
  RequestURLTooLarge: 78,
  RequestURLTooLargeWithFinalBit: 206,
  UnsupportedMediaType: 79,
  UnsupportedMediaTypeWithFinalBit: 207,
  InternalServerError: 80,
  InternalServerErrorWithFinalBit: 208,
  NotImplemented: 81,
  NotImplementedWithFinalBit: 209,
  BadGateway: 82,
  BadGatewayWithFinalBit: 210,
  ServiceUnavailable: 83,
  ServiceUnavailableWithFinalBit: 211,
  GatewayTimeout: 84,
  GatewayTimeoutWithFinalBit: 212,
  HTTPVersionNotSupported: 85,
  HTTPVersionNotSupportedWithFinalBit: 213,
  DatabaseFull: 96,
  DatabaseFullWithFinalBit: 224,
  DatabaseLocked: 97,
  DatabaseLockedWithFinalBit: 225,
};

declare class OBEXSessionEvent {
  constructor(init?: OBEXSessionEvent);
  type: number;
  session: interop.Pointer;
  refCon: interop.Pointer;
  isEndOfEventData: number;
  reserved1: interop.Pointer;
  reserved2: interop.Pointer;
  u: unnamed_11596332216191719969;
}

declare class OBEXSetPathCommandData {
  constructor(init?: OBEXSetPathCommandData);
  headerDataPtr: interop.Pointer;
  headerDataLength: number;
  flags: number;
  constants: number;
}

declare class OBEXGetCommandData {
  constructor(init?: OBEXGetCommandData);
  headerDataPtr: interop.Pointer;
  headerDataLength: number;
}

declare class OBEXPutCommandData {
  constructor(init?: OBEXPutCommandData);
  headerDataPtr: interop.Pointer;
  headerDataLength: number;
  bodyDataLeftToSend: number;
}

declare class OBEXDisconnectCommandData {
  constructor(init?: OBEXDisconnectCommandData);
  headerDataPtr: interop.Pointer;
  headerDataLength: number;
}

declare class OBEXConnectCommandData {
  constructor(init?: OBEXConnectCommandData);
  headerDataPtr: interop.Pointer;
  headerDataLength: number;
  maxPacketSize: number;
  version: number;
  flags: number;
}

declare class OBEXSetPathCommandResponseData {
  constructor(init?: OBEXSetPathCommandResponseData);
  serverResponseOpCode: number;
  headerDataPtr: interop.Pointer;
  headerDataLength: number;
  flags: number;
  constants: number;
}

declare class OBEXPutCommandResponseData {
  constructor(init?: OBEXPutCommandResponseData);
  serverResponseOpCode: number;
  headerDataPtr: interop.Pointer;
  headerDataLength: number;
}

declare class IOBluetoothL2CAPChannelDataBlock {
  constructor(init?: IOBluetoothL2CAPChannelDataBlock);
  dataPtr: interop.Pointer;
  dataSize: number;
}

declare class OBEXTransportEvent {
  constructor(init?: OBEXTransportEvent);
  type: number;
  status: number;
  dataPtr: interop.Pointer;
  dataLength: number;
}

declare class OpaquePrivOBEXSessionData {
  constructor(init?: OpaquePrivOBEXSessionData);
}

declare class OBEXDisconnectCommandResponseData {
  constructor(init?: OBEXDisconnectCommandResponseData);
  serverResponseOpCode: number;
  headerDataPtr: interop.Pointer;
  headerDataLength: number;
}

declare class OBEXErrorData {
  constructor(init?: OBEXErrorData);
  error: number;
  dataPtr: interop.Pointer;
  dataLength: number;
}

declare class OpaqueIOBluetoothObjectRef {
  constructor(init?: OpaqueIOBluetoothObjectRef);
}

declare class IOBluetoothL2CAPChannelEvent {
  constructor(init?: IOBluetoothL2CAPChannelEvent);
  eventType: interop.Enum<typeof IOBluetoothL2CAPChannelEventType>;
  u: unnamed_1801812505974471445;
  status: number;
}

declare class OBEXGetCommandResponseData {
  constructor(init?: OBEXGetCommandResponseData);
  serverResponseOpCode: number;
  headerDataPtr: interop.Pointer;
  headerDataLength: number;
}

declare class OBEXAbortCommandData {
  constructor(init?: OBEXAbortCommandData);
  headerDataPtr: interop.Pointer;
  headerDataLength: number;
}

declare class IOBluetoothDeviceSearchAttributes {
  constructor(init?: IOBluetoothDeviceSearchAttributes);
  options: number;
  maxResults: number;
  deviceAttributeCount: number;
  attributeList: interop.Pointer;
}

declare class OBEXConnectCommandResponseData {
  constructor(init?: OBEXConnectCommandResponseData);
  serverResponseOpCode: number;
  headerDataPtr: interop.Pointer;
  headerDataLength: number;
  maxPacketSize: number;
  version: number;
  flags: number;
}

declare class OBEXAbortCommandResponseData {
  constructor(init?: OBEXAbortCommandResponseData);
  serverResponseOpCode: number;
  headerDataPtr: interop.Pointer;
  headerDataLength: number;
}

declare class IOBluetoothDeviceSearchDeviceAttributes {
  constructor(init?: IOBluetoothDeviceSearchDeviceAttributes);
  address: BluetoothDeviceAddress;
  name: unknown /* const array */;
  serviceClassMajor: number;
  deviceClassMajor: number;
  deviceClassMinor: number;
}

declare class OpaqueOBEXSessionRef {
  constructor(init?: OpaqueOBEXSessionRef);
}

type unnamed_11596332216191719969Descriptor = 
  | { connectCommandResponseData: OBEXConnectCommandResponseData }
  | { disconnectCommandResponseData: OBEXDisconnectCommandResponseData }
  | { putCommandResponseData: OBEXPutCommandResponseData }
  | { getCommandResponseData: OBEXGetCommandResponseData }
  | { setPathCommandResponseData: OBEXSetPathCommandResponseData }
  | { abortCommandResponseData: OBEXAbortCommandResponseData }
  | { connectCommandData: OBEXConnectCommandData }
  | { disconnectCommandData: OBEXDisconnectCommandData }
  | { putCommandData: OBEXPutCommandData }
  | { getCommandData: OBEXGetCommandData }
  | { setPathCommandData: OBEXSetPathCommandData }
  | { abortCommandData: OBEXAbortCommandData }
  | { errorData: OBEXErrorData };

declare class unnamed_11596332216191719969 {
  constructor(init?: unnamed_11596332216191719969Descriptor);
  connectCommandResponseData: OBEXConnectCommandResponseData;
  disconnectCommandResponseData: OBEXDisconnectCommandResponseData;
  putCommandResponseData: OBEXPutCommandResponseData;
  getCommandResponseData: OBEXGetCommandResponseData;
  setPathCommandResponseData: OBEXSetPathCommandResponseData;
  abortCommandResponseData: OBEXAbortCommandResponseData;
  connectCommandData: OBEXConnectCommandData;
  disconnectCommandData: OBEXDisconnectCommandData;
  putCommandData: OBEXPutCommandData;
  getCommandData: OBEXGetCommandData;
  setPathCommandData: OBEXSetPathCommandData;
  abortCommandData: OBEXAbortCommandData;
  errorData: OBEXErrorData;
}

type unnamed_1801812505974471445Descriptor = 
  | { data: IOBluetoothL2CAPChannelDataBlock }
  | { writeRefCon: interop.PointerConvertible }
  | { padding: unknown /* const array */ };

declare class unnamed_1801812505974471445 {
  constructor(init?: unnamed_1801812505974471445Descriptor);
  data: IOBluetoothL2CAPChannelDataBlock;
  writeRefCon: interop.Pointer;
  padding: unknown /* const array */;
}

declare function IOBluetoothIgnoreHIDDevice(device: interop.Object): void;

declare function IOBluetoothRemoveIgnoredHIDDevice(device: interop.Object): void;

declare function IOBluetoothUserNotificationUnregister(notificationRef: interop.Object): void;

declare function IOBluetoothL2CAPChannelRegisterForChannelCloseNotification(channel: interop.Object, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void, inRefCon: interop.PointerConvertible): interop.Object;

declare function IOBluetoothAddSCOAudioDevice(device: interop.Object, configDict: interop.Object): number;

declare function IOBluetoothRemoveSCOAudioDevice(device: interop.Object): number;

declare function IOBluetoothNSStringToDeviceAddress(inNameString: string, outDeviceAddress: interop.PointerConvertible): number;

declare function IOBluetoothNSStringFromDeviceAddress(deviceAddress: interop.PointerConvertible): string;

declare function IOBluetoothNSStringFromDeviceAddressColon(deviceAddress: interop.PointerConvertible): string;

declare function IOBluetoothIsFileAppleDesignatedPIMData(inFileName: string): number;

declare function IOBluetoothGetUniqueFileNameAndPath(inName: string, inPath: string): string;

declare function IOBluetoothPackData(ioBuffer: interop.PointerConvertible, inFormat: string): number;

declare function IOBluetoothPackDataList(ioBuffer: interop.PointerConvertible, inFormat: string, inArgs: string): number;

declare function IOBluetoothUnpackData(inBufferSize: number, inBuffer: interop.PointerConvertible, inFormat: string): number;

declare function IOBluetoothUnpackDataList(inBufferSize: number, inBuffer: interop.PointerConvertible, inFormat: string, inArgs: string): number;

declare function IOBluetoothNumberOfAvailableHIDDevices(): number;

declare function IOBluetoothNumberOfPointingHIDDevices(): number;

declare function IOBluetoothNumberOfKeyboardHIDDevices(): number;

declare function IOBluetoothNumberOfTabletHIDDevices(): number;

declare function IOBluetoothFindNumberOfRegistryEntriesOfClassName(deviceType: string): number;

declare function OBEXSessionDelete(inSessionRef: interop.PointerConvertible): number;

declare function OBEXSessionHasOpenOBEXConnection(inSessionRef: interop.PointerConvertible, outIsConnected: interop.PointerConvertible): number;

declare function OBEXSessionGetMaxPacketLength(inSessionRef: interop.PointerConvertible, outLength: interop.PointerConvertible): number;

declare function OBEXSessionGetAvailableCommandPayloadLength(inSessionRef: interop.PointerConvertible, inOpCode: number, outLength: interop.PointerConvertible): number;

declare function OBEXSessionGetAvailableCommandResponsePayloadLength(inSessionRef: interop.PointerConvertible, inOpCode: number, outLength: interop.PointerConvertible): number;

declare function OBEXSessionConnect(inSessionRef: interop.PointerConvertible, inFlags: number, inMaxPacketLength: number, inOptionalHeaders: interop.PointerConvertible, inOptionalHeadersLength: number, inCallback: (p1: interop.PointerConvertible) => void, inUserRefCon: interop.PointerConvertible): number;

declare function OBEXSessionDisconnect(inSessionRef: interop.PointerConvertible, inOptionalHeaders: interop.PointerConvertible, inOptionalHeadersLength: number, inCallback: (p1: interop.PointerConvertible) => void, inUserRefCon: interop.PointerConvertible): number;

declare function OBEXSessionPut(inSessionRef: interop.PointerConvertible, inIsFinalChunk: number, inHeadersData: interop.PointerConvertible, inHeadersDataLength: number, inBodyData: interop.PointerConvertible, inBodyDataLength: number, inCallback: (p1: interop.PointerConvertible) => void, inUserRefCon: interop.PointerConvertible): number;

declare function OBEXSessionGet(inSessionRef: interop.PointerConvertible, inIsFinalChunk: number, inHeadersData: interop.PointerConvertible, inHeadersDataLength: number, inCallback: (p1: interop.PointerConvertible) => void, inUserRefCon: interop.PointerConvertible): number;

declare function OBEXSessionAbort(inSessionRef: interop.PointerConvertible, inOptionalHeaders: interop.PointerConvertible, inOptionalHeadersLength: number, inCallback: (p1: interop.PointerConvertible) => void, inUserRefCon: interop.PointerConvertible): number;

declare function OBEXSessionSetPath(inSessionRef: interop.PointerConvertible, inFlags: number, inConstants: number, inOptionalHeaders: interop.PointerConvertible, inOptionalHeadersLength: number, inCallback: (p1: interop.PointerConvertible) => void, inUserRefCon: interop.PointerConvertible): number;

declare function OBEXSessionConnectResponse(inSessionRef: interop.PointerConvertible, inResponseOpCode: number, inFlags: number, inMaxPacketLength: number, inOptionalHeaders: interop.PointerConvertible, inOptionalHeadersLength: number, inCallback: (p1: interop.PointerConvertible) => void, inUserRefCon: interop.PointerConvertible): number;

declare function OBEXSessionDisconnectResponse(inSessionRef: interop.PointerConvertible, inResponseOpCode: number, inOptionalHeaders: interop.PointerConvertible, inOptionalHeadersLength: number, inCallback: (p1: interop.PointerConvertible) => void, inUserRefCon: interop.PointerConvertible): number;

declare function OBEXSessionGetResponse(inSessionRef: interop.PointerConvertible, inResponseOpCode: number, inOptionalHeaders: interop.PointerConvertible, inOptionalHeadersLength: number, inCallback: (p1: interop.PointerConvertible) => void, inUserRefCon: interop.PointerConvertible): number;

declare function OBEXSessionPutResponse(inSessionRef: interop.PointerConvertible, inResponseOpCode: number, inOptionalHeaders: interop.PointerConvertible, inOptionalHeadersLength: number, inCallback: (p1: interop.PointerConvertible) => void, inUserRefCon: interop.PointerConvertible): number;

declare function OBEXSessionAbortResponse(inSessionRef: interop.PointerConvertible, inResponseOpCode: number, inOptionalHeaders: interop.PointerConvertible, inOptionalHeadersLength: number, inCallback: (p1: interop.PointerConvertible) => void, inUserRefCon: interop.PointerConvertible): number;

declare function OBEXSessionSetPathResponse(inSessionRef: interop.PointerConvertible, inResponseOpCode: number, inOptionalHeaders: interop.PointerConvertible, inOptionalHeadersLength: number, inCallback: (p1: interop.PointerConvertible) => void, inUserRefCon: interop.PointerConvertible): number;

declare function OBEXSessionSetServerCallback(inSessionRef: interop.PointerConvertible, inCallback: (p1: interop.PointerConvertible) => void, inUserRefCon: interop.PointerConvertible): number;

declare function OBEXCreateVCard(inFirstName: interop.PointerConvertible, inFirstNameLength: number, inLastName: interop.PointerConvertible, inLastNameLength: number, inFriendlyName: interop.PointerConvertible, inFriendlyNameLength: number, inNameCharset: interop.PointerConvertible, inNameCharsetLength: number, inHomePhone: interop.PointerConvertible, inHomePhoneLength: number, inWorkPhone: interop.PointerConvertible, inWorkPhoneLength: number, inCellPhone: interop.PointerConvertible, inCellPhoneLength: number, inFaxPhone: interop.PointerConvertible, inFaxPhoneLength: number, inEMailAddress: interop.PointerConvertible, inEMailAddressLength: number, inEMailAddressCharset: interop.PointerConvertible, inEMailAddressCharsetLength: number, inOrganization: interop.PointerConvertible, inOrganizationLength: number, inOrganizationCharset: interop.PointerConvertible, inOrganizationCharsetLength: number, inTitle: interop.PointerConvertible, inTitleLength: number, inTitleCharset: interop.PointerConvertible, inTitleCharsetLength: number): interop.Object;

declare function OBEXCreateVEvent(inCharset: string, inCharsetLength: number, inEncoding: string, inEncodingLength: number, inEventStartDate: string, inEventStartDateLength: number, inEventEndDate: string, inEventEndDateLength: number, inAlarmDate: string, inAlarmDateLength: number, inCategory: string, inCategoryLength: number, inSummary: string, inSummaryLength: number, inLocation: string, inLocationLength: number, inXIRMCLUID: string, inXIRMCLUIDLength: number): interop.Object;

declare function OBEXGetHeaders(inData: interop.PointerConvertible, inDataSize: number): interop.Object;

declare function OBEXHeadersToBytes(dictionaryOfHeaders: interop.Object): interop.Object;

declare function OBEXAddNameHeader(name: interop.Object, dictRef: interop.Object): number;

declare function OBEXAddDescriptionHeader(description: interop.Object, dictRef: interop.Object): number;

declare function OBEXAddCountHeader(count: number, dictRef: interop.Object): number;

declare function OBEXAddTime4ByteHeader(time4Byte: number, dictRef: interop.Object): number;

declare function OBEXAddLengthHeader(length: number, dictRef: interop.Object): number;

declare function OBEXAddTypeHeader(type: interop.Object, dictRef: interop.Object): number;

declare function OBEXAddTimeISOHeader(inHeaderData: interop.PointerConvertible, inHeaderDataLength: number, dictRef: interop.Object): number;

declare function OBEXAddTargetHeader(inHeaderData: interop.PointerConvertible, inHeaderDataLength: number, dictRef: interop.Object): number;

declare function OBEXAddHTTPHeader(inHeaderData: interop.PointerConvertible, inHeaderDataLength: number, dictRef: interop.Object): number;

declare function OBEXAddBodyHeader(inHeaderData: interop.PointerConvertible, inHeaderDataLength: number, isEndOfBody: number, dictRef: interop.Object): number;

declare function OBEXAddWhoHeader(inHeaderData: interop.PointerConvertible, inHeaderDataLength: number, dictRef: interop.Object): number;

declare function OBEXAddConnectionIDHeader(inHeaderData: interop.PointerConvertible, inHeaderDataLength: number, dictRef: interop.Object): number;

declare function OBEXAddApplicationParameterHeader(inHeaderData: interop.PointerConvertible, inHeaderDataLength: number, dictRef: interop.Object): number;

declare function OBEXAddByteSequenceHeader(inHeaderData: interop.PointerConvertible, inHeaderDataLength: number, dictRef: interop.Object): number;

declare function OBEXAddObjectClassHeader(inHeaderData: interop.PointerConvertible, inHeaderDataLength: number, dictRef: interop.Object): number;

declare function OBEXAddAuthorizationChallengeHeader(inHeaderData: interop.PointerConvertible, inHeaderDataLength: number, dictRef: interop.Object): number;

declare function OBEXAddAuthorizationResponseHeader(inHeaderData: interop.PointerConvertible, inHeaderDataLength: number, dictRef: interop.Object): number;

declare function OBEXAddUserDefinedHeader(inHeaderData: interop.PointerConvertible, inHeaderDataLength: number, dictRef: interop.Object): number;

declare function IOBluetoothOBEXSessionCreateWithIOBluetoothSDPServiceRecordRef(inSDPServiceRef: interop.Object, outSessionRef: interop.PointerConvertible): number;

declare function IOBluetoothOBEXSessionCreateWithIOBluetoothDeviceRefAndChannelNumber(inDeviceRef: interop.Object, inChannelID: number, outSessionRef: interop.PointerConvertible): number;

declare function IOBluetoothOBEXSessionCreateWithIncomingIOBluetoothRFCOMMChannel(inRFCOMMChannelRef: interop.Object, inCallback: (p1: interop.PointerConvertible) => void, inUserRefCon: interop.PointerConvertible, outSessionRef: interop.PointerConvertible): number;

declare function IOBluetoothOBEXSessionOpenTransportConnection(inSessionRef: interop.PointerConvertible, inCallback: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, inUserRefCon: interop.PointerConvertible): number;

declare interface IOBluetoothDevicePairDelegate extends NSObjectProtocol {
  devicePairingStarted?(sender: interop.Object): void;

  devicePairingConnecting?(sender: interop.Object): void;

  devicePairingConnected?(sender: interop.Object): void;

  devicePairingPINCodeRequest?(sender: interop.Object): void;

  devicePairingUserConfirmationRequestNumericValue?(sender: interop.Object, numericValue: number): void;

  devicePairingUserPasskeyNotificationPasskey?(sender: interop.Object, passkey: number): void;

  devicePairingFinishedError?(sender: interop.Object, error: number): void;

  deviceSimplePairingCompleteStatus?(sender: interop.Object, status: number): void;
}

declare class IOBluetoothDevicePairDelegate extends NativeObject implements IOBluetoothDevicePairDelegate {
}

declare interface IOBluetoothHandsFreeDeviceDelegate extends IOBluetoothHandsFreeDelegate {
  handsFreeIsServiceAvailable?(device: IOBluetoothHandsFreeDevice, isServiceAvailable: NSNumber): void;

  handsFreeIsCallActive?(device: IOBluetoothHandsFreeDevice, isCallActive: NSNumber): void;

  handsFreeCallSetupMode?(device: IOBluetoothHandsFreeDevice, callSetupMode: NSNumber): void;

  handsFreeCallHoldState?(device: IOBluetoothHandsFreeDevice, callHoldState: NSNumber): void;

  handsFreeSignalStrength?(device: IOBluetoothHandsFreeDevice, signalStrength: NSNumber): void;

  handsFreeIsRoaming?(device: IOBluetoothHandsFreeDevice, isRoaming: NSNumber): void;

  handsFreeBatteryCharge?(device: IOBluetoothHandsFreeDevice, batteryCharge: NSNumber): void;

  handsFreeIncomingCallFrom?(device: IOBluetoothHandsFreeDevice, number: string): void;

  handsFreeRingAttempt?(device: IOBluetoothHandsFreeDevice, ringAttempt: NSNumber): void;

  handsFreeCurrentCall?(device: IOBluetoothHandsFreeDevice, currentCall: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  handsFreeSubscriberNumber?(device: IOBluetoothHandsFreeDevice, subscriberNumber: string): void;

  handsFreeIncomingSMS?(device: IOBluetoothHandsFreeDevice, sms: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  handsFreeUnhandledResultCode?(device: IOBluetoothHandsFreeDevice, resultCode: string): void;
}

declare class IOBluetoothHandsFreeDeviceDelegate extends NativeObject implements IOBluetoothHandsFreeDeviceDelegate {
}

declare interface IOBluetoothHandsFreeAudioGatewayDelegate {
  handsFreeHangup?(device: IOBluetoothHandsFreeAudioGateway, hangup: NSNumber): void;

  handsFreeRedial?(device: IOBluetoothHandsFreeAudioGateway, redial: NSNumber): void;
}

declare class IOBluetoothHandsFreeAudioGatewayDelegate extends NativeObject implements IOBluetoothHandsFreeAudioGatewayDelegate {
}

declare interface IOBluetoothHandsFreeDelegate extends NSObjectProtocol {
  handsFreeConnected?(device: IOBluetoothHandsFree, status: NSNumber): void;

  handsFreeDisconnected?(device: IOBluetoothHandsFree, status: NSNumber): void;

  handsFreeScoConnectionOpened?(device: IOBluetoothHandsFree, status: NSNumber): void;

  handsFreeScoConnectionClosed?(device: IOBluetoothHandsFree, status: NSNumber): void;
}

declare class IOBluetoothHandsFreeDelegate extends NativeObject implements IOBluetoothHandsFreeDelegate {
}

declare interface IOBluetoothRFCOMMChannelDelegate {
  rfcommChannelDataDataLength?(rfcommChannel: IOBluetoothRFCOMMChannel, dataPointer: interop.PointerConvertible, dataLength: number): void;

  rfcommChannelOpenCompleteStatus?(rfcommChannel: IOBluetoothRFCOMMChannel, error: number): void;

  rfcommChannelClosed?(rfcommChannel: IOBluetoothRFCOMMChannel): void;

  rfcommChannelControlSignalsChanged?(rfcommChannel: IOBluetoothRFCOMMChannel): void;

  rfcommChannelFlowControlChanged?(rfcommChannel: IOBluetoothRFCOMMChannel): void;

  rfcommChannelWriteCompleteRefconStatus?(rfcommChannel: IOBluetoothRFCOMMChannel, refcon: interop.PointerConvertible, error: number): void;

  rfcommChannelWriteCompleteRefconStatusBytesWritten?(rfcommChannel: IOBluetoothRFCOMMChannel, refcon: interop.PointerConvertible, error: number, length: number): void;

  rfcommChannelQueueSpaceAvailable?(rfcommChannel: IOBluetoothRFCOMMChannel): void;
}

declare class IOBluetoothRFCOMMChannelDelegate extends NativeObject implements IOBluetoothRFCOMMChannelDelegate {
}

declare interface IOBluetoothL2CAPChannelDelegate {
  l2capChannelDataDataLength?(l2capChannel: IOBluetoothL2CAPChannel, dataPointer: interop.PointerConvertible, dataLength: number): void;

  l2capChannelOpenCompleteStatus?(l2capChannel: IOBluetoothL2CAPChannel, error: number): void;

  l2capChannelClosed?(l2capChannel: IOBluetoothL2CAPChannel): void;

  l2capChannelReconfigured?(l2capChannel: IOBluetoothL2CAPChannel): void;

  l2capChannelWriteCompleteRefconStatus?(l2capChannel: IOBluetoothL2CAPChannel, refcon: interop.PointerConvertible, error: number): void;

  l2capChannelQueueSpaceAvailable?(l2capChannel: IOBluetoothL2CAPChannel): void;
}

declare class IOBluetoothL2CAPChannelDelegate extends NativeObject implements IOBluetoothL2CAPChannelDelegate {
}

declare interface IOBluetoothDeviceAsyncCallbacks {
  remoteNameRequestCompleteStatus(device: IOBluetoothDevice, status: number): void;

  connectionCompleteStatus(device: IOBluetoothDevice, status: number): void;

  sdpQueryCompleteStatus(device: IOBluetoothDevice, status: number): void;
}

declare class IOBluetoothDeviceAsyncCallbacks extends NativeObject implements IOBluetoothDeviceAsyncCallbacks {
}

declare interface IOBluetoothDeviceInquiryDelegate extends NSObjectProtocol {
  deviceInquiryStarted?(sender: IOBluetoothDeviceInquiry): void;

  deviceInquiryDeviceFoundDevice?(sender: IOBluetoothDeviceInquiry, device: IOBluetoothDevice): void;

  deviceInquiryUpdatingDeviceNamesStartedDevicesRemaining?(sender: IOBluetoothDeviceInquiry, devicesRemaining: number): void;

  deviceInquiryDeviceNameUpdatedDeviceDevicesRemaining?(sender: IOBluetoothDeviceInquiry, device: IOBluetoothDevice, devicesRemaining: number): void;

  deviceInquiryCompleteErrorAborted?(sender: IOBluetoothDeviceInquiry, error: number, aborted: boolean): void;
}

declare class IOBluetoothDeviceInquiryDelegate extends NativeObject implements IOBluetoothDeviceInquiryDelegate {
}

declare class IOBluetoothDevicePair extends NSObject implements CBCentralManagerDelegate {
  delegate: interop.Object;

  static pairWithDevice<This extends abstract new (...args: any) => any>(this: This, device: IOBluetoothDevice): InstanceType<This>;

  start(): number;

  stop(): void;

  device(): IOBluetoothDevice;

  setDevice(inDevice: IOBluetoothDevice): void;

  replyPINCodePINCode(PINCodeSize: number, PINCode: interop.PointerConvertible): void;

  replyUserConfirmation(reply: boolean): void;

  setDelegate(delegate: interop.Object): void;

  centralManagerDidUpdateState(central: CBCentralManager): void;

  centralManagerWillRestoreState(central: CBCentralManager, dict: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  centralManagerDidDiscoverPeripheralAdvertisementDataRSSI(central: CBCentralManager, peripheral: CBPeripheral, advertisementData: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, RSSI: NSNumber): void;

  centralManagerDidConnectPeripheral(central: CBCentralManager, peripheral: CBPeripheral): void;

  centralManagerDidFailToConnectPeripheralError(central: CBCentralManager, peripheral: CBPeripheral, error: NSError | null): void;

  centralManagerDidDisconnectPeripheralError(central: CBCentralManager, peripheral: CBPeripheral, error: NSError | null): void;

  centralManagerDidDisconnectPeripheralTimestampIsReconnectingError(central: CBCentralManager, peripheral: CBPeripheral, timestamp: number, isReconnecting: boolean, error: NSError | null): void;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class IOBluetoothSDPDataElement extends NSObject implements NSCoding, NSSecureCoding {
  static withElementValue<This extends abstract new (...args: any) => any>(this: This, element: NSObject): InstanceType<This>;

  static withTypeSizeDescriptorSizeValue<This extends abstract new (...args: any) => any>(this: This, type: number, newSizeDescriptor: number, newSize: number, newValue: NSObject): InstanceType<This>;

  static withSDPDataElementRef<This extends abstract new (...args: any) => any>(this: This, sdpDataElementRef: interop.Object): InstanceType<This>;

  initWithElementValue(element: NSObject): this;

  initWithTypeSizeDescriptorSizeValue(newType: number, newSizeDescriptor: number, newSize: number, newValue: NSObject): this;

  getSDPDataElementRef(): interop.Object;

  getTypeDescriptor(): number;

  getSizeDescriptor(): number;

  getSize(): number;

  getNumberValue(): NSNumber;

  getDataValue(): NSData;

  getStringValue(): string;

  getArrayValue(): NSArray;

  getUUIDValue(): IOBluetoothSDPUUID;

  getValue(): NSObject;

  containsDataElement(dataElement: IOBluetoothSDPDataElement): boolean;

  containsValue(cmpValue: NSObject): boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  static readonly supportsSecureCoding: boolean;
}

declare class IOBluetoothHandsFreeAudioGateway extends IOBluetoothHandsFree {
  initWithDeviceDelegate(device: IOBluetoothDevice, inDelegate: IOBluetoothHandsFreeDelegate): this;
  initWithDeviceDelegate(device: IOBluetoothDevice, inDelegate: interop.Object): this;

  createIndicatorMinMaxCurrentValue(indicatorName: string, minValue: number, maxValue: number, currentValue: number): void;

  processATCommand(atCommand: string): void;

  sendOKResponse(): void;

  sendResponse(response: string): void;

  sendResponseWithOK(response: string, withOK: boolean): void;
}

declare class IOBluetoothHandsFree extends NSObject {
  supportedFeatures: number;

  inputVolume: number;

  inputMuted: boolean;

  outputVolume: number;

  outputMuted: boolean;

  readonly device: IOBluetoothDevice;

  readonly deviceSupportedFeatures: number;

  readonly deviceSupportedSMSServices: number;

  readonly deviceCallHoldModes: number;

  readonly SMSMode: interop.Enum<typeof IOBluetoothSMSMode>;

  readonly SMSEnabled: boolean;

  delegate: IOBluetoothHandsFreeDelegate;

  indicator(indicatorName: string): number;

  setIndicatorValue(indicatorName: string, indicatorValue: number): void;

  initWithDeviceDelegate(device: IOBluetoothDevice, inDelegate: IOBluetoothHandsFreeDelegate): this;

  connect(): void;

  disconnect(): void;

  readonly connected: boolean;

  connectSCO(): void;

  disconnectSCO(): void;

  isSCOConnected(): boolean;

  setSupportedFeatures(supportedFeatures: number): void;

  setInputVolume(inputVolume: number): void;

  isInputMuted(): boolean;

  setInputMuted(inputMuted: boolean): void;

  setOutputVolume(outputVolume: number): void;

  isOutputMuted(): boolean;

  setOutputMuted(outputMuted: boolean): void;

  isSMSEnabled(): boolean;

  setDelegate(delegate: IOBluetoothHandsFreeDelegate): void;

  isConnected(): boolean;
}

declare class OBEXSession extends NSObject {
  OBEXConnectMaxPacketLengthOptionalHeadersOptionalHeadersLengthEventSelectorSelectorTargetRefCon(inFlags: number, inMaxPacketLength: number, inOptionalHeaders: interop.PointerConvertible, inOptionalHeadersLength: number, inSelector: string, inTarget: interop.Object, inUserRefCon: interop.PointerConvertible): number;

  OBEXDisconnectOptionalHeadersLengthEventSelectorSelectorTargetRefCon(inOptionalHeaders: interop.PointerConvertible, inOptionalHeadersLength: number, inSelector: string, inTarget: interop.Object, inUserRefCon: interop.PointerConvertible): number;

  OBEXPutHeadersDataHeadersDataLengthBodyDataBodyDataLengthEventSelectorSelectorTargetRefCon(isFinalChunk: number, inHeadersData: interop.PointerConvertible, inHeadersDataLength: number, inBodyData: interop.PointerConvertible, inBodyDataLength: number, inSelector: string, inTarget: interop.Object, inUserRefCon: interop.PointerConvertible): number;

  OBEXGetHeadersHeadersLengthEventSelectorSelectorTargetRefCon(isFinalChunk: number, inHeaders: interop.PointerConvertible, inHeadersLength: number, inSelector: string, inTarget: interop.Object, inUserRefCon: interop.PointerConvertible): number;

  OBEXAbortOptionalHeadersLengthEventSelectorSelectorTargetRefCon(inOptionalHeaders: interop.PointerConvertible, inOptionalHeadersLength: number, inSelector: string, inTarget: interop.Object, inUserRefCon: interop.PointerConvertible): number;

  OBEXSetPathConstantsOptionalHeadersOptionalHeadersLengthEventSelectorSelectorTargetRefCon(inFlags: number, inConstants: number, inOptionalHeaders: interop.PointerConvertible, inOptionalHeadersLength: number, inSelector: string, inTarget: interop.Object, inUserRefCon: interop.PointerConvertible): number;

  OBEXConnectResponseFlagsMaxPacketLengthOptionalHeadersOptionalHeadersLengthEventSelectorSelectorTargetRefCon(inResponseOpCode: number, inFlags: number, inMaxPacketLength: number, inOptionalHeaders: interop.PointerConvertible, inOptionalHeadersLength: number, inSelector: string, inTarget: interop.Object, inUserRefCon: interop.PointerConvertible): number;

  OBEXDisconnectResponseOptionalHeadersOptionalHeadersLengthEventSelectorSelectorTargetRefCon(inResponseOpCode: number, inOptionalHeaders: interop.PointerConvertible, inOptionalHeadersLength: number, inSelector: string, inTarget: interop.Object, inUserRefCon: interop.PointerConvertible): number;

  OBEXPutResponseOptionalHeadersOptionalHeadersLengthEventSelectorSelectorTargetRefCon(inResponseOpCode: number, inOptionalHeaders: interop.PointerConvertible, inOptionalHeadersLength: number, inSelector: string, inTarget: interop.Object, inUserRefCon: interop.PointerConvertible): number;

  OBEXGetResponseOptionalHeadersOptionalHeadersLengthEventSelectorSelectorTargetRefCon(inResponseOpCode: number, inOptionalHeaders: interop.PointerConvertible, inOptionalHeadersLength: number, inSelector: string, inTarget: interop.Object, inUserRefCon: interop.PointerConvertible): number;

  OBEXAbortResponseOptionalHeadersOptionalHeadersLengthEventSelectorSelectorTargetRefCon(inResponseOpCode: number, inOptionalHeaders: interop.PointerConvertible, inOptionalHeadersLength: number, inSelector: string, inTarget: interop.Object, inUserRefCon: interop.PointerConvertible): number;

  OBEXSetPathResponseOptionalHeadersOptionalHeadersLengthEventSelectorSelectorTargetRefCon(inResponseOpCode: number, inOptionalHeaders: interop.PointerConvertible, inOptionalHeadersLength: number, inSelector: string, inTarget: interop.Object, inUserRefCon: interop.PointerConvertible): number;

  getAvailableCommandPayloadLength(inOpCode: number): number;

  getAvailableCommandResponsePayloadLength(inOpCode: number): number;

  getMaxPacketLength(): number;

  hasOpenOBEXConnection(): boolean;

  setEventCallback(inEventCallback: (p1: interop.PointerConvertible) => void): void;

  setEventRefCon(inRefCon: interop.PointerConvertible): void;

  setEventSelectorTargetRefCon(inEventSelector: string, inEventSelectorTarget: interop.Object, inUserRefCon: interop.PointerConvertible): void;

  serverHandleIncomingData(event: interop.PointerConvertible): void;

  clientHandleIncomingData(event: interop.PointerConvertible): void;

  sendDataToTransportDataLength(inDataToSend: interop.PointerConvertible, inDataLength: number): number;

  openTransportConnectionSelectorTargetRefCon(inSelector: string, inTarget: interop.Object, inUserRefCon: interop.PointerConvertible): number;

  hasOpenTransportConnection(): number;

  closeTransportConnection(): number;
}

declare class IOBluetoothSDPServiceAttribute extends NSObject implements NSCoding, NSSecureCoding {
  static withIDAttributeElementValue<This extends abstract new (...args: any) => any>(this: This, newAttributeID: number, attributeElementValue: NSObject): InstanceType<This>;

  static withIDAttributeElement<This extends abstract new (...args: any) => any>(this: This, newAttributeID: number, attributeElement: IOBluetoothSDPDataElement): InstanceType<This>;

  initWithIDAttributeElementValue(newAttributeID: number, attributeElementValue: NSObject): this;

  initWithIDAttributeElement(newAttributeID: number, attributeElement: IOBluetoothSDPDataElement): this;

  getAttributeID(): number;

  getDataElement(): IOBluetoothSDPDataElement;

  getIDDataElement(): IOBluetoothSDPDataElement;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  static readonly supportsSecureCoding: boolean;
}

declare class IOBluetoothRFCOMMChannel extends IOBluetoothObject implements NSPortDelegate, NSStreamDelegate {
  static registerForChannelOpenNotificationsSelector(object: interop.Object, selector: string): IOBluetoothUserNotification;

  static registerForChannelOpenNotificationsSelectorWithChannelIDDirection(object: interop.Object, selector: string, channelID: number, inDirection: interop.Enum<typeof IOBluetoothUserNotificationChannelDirection>): IOBluetoothUserNotification;

  static withRFCOMMChannelRef<This extends abstract new (...args: any) => any>(this: This, rfcommChannelRef: interop.Object): InstanceType<This>;

  static withObjectID<This extends abstract new (...args: any) => any>(this: This, objectID: number): InstanceType<This>;

  getRFCOMMChannelRef(): interop.Object;

  closeChannel(): number;

  isOpen(): boolean;

  getMTU(): number;

  isTransmissionPaused(): boolean;

  writeLengthSleep(data: interop.PointerConvertible, length: number, sleep: boolean): number;

  writeAsyncLengthRefcon(data: interop.PointerConvertible, length: number, refcon: interop.PointerConvertible): number;

  writeSyncLength(data: interop.PointerConvertible, length: number): number;

  writeSimpleLengthSleepBytesSent(data: interop.PointerConvertible, length: number, sleep: boolean, numBytesSent: interop.PointerConvertible): number;

  setSerialParametersDataBitsParityStopBits(speed: number, nBits: number, parity: interop.Enum<typeof BluetoothRFCOMMParityType>, bitStop: number): number;

  sendRemoteLineStatus(lineStatus: interop.Enum<typeof BluetoothRFCOMMLineStatus>): number;

  setDelegate(delegate: interop.Object): number;

  delegate(): interop.Object;

  getChannelID(): number;

  isIncoming(): boolean;

  getDevice(): IOBluetoothDevice;

  getObjectID(): number;

  registerForChannelCloseNotificationSelector(observer: interop.Object, inSelector: string): IOBluetoothUserNotification;

  handlePortMessage(message: NSPortMessage): void;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;

  streamHandleEvent(aStream: NSStream, eventCode: interop.Enum<typeof NSStreamEvent>): void;
}

declare class IOBluetoothL2CAPChannel extends IOBluetoothObject implements NSPortDelegate {
  static registerForChannelOpenNotificationsSelector(object: interop.Object, selector: string): IOBluetoothUserNotification;

  static registerForChannelOpenNotificationsSelectorWithPSMDirection(object: interop.Object, selector: string, psm: number, inDirection: interop.Enum<typeof IOBluetoothUserNotificationChannelDirection>): IOBluetoothUserNotification;

  static withObjectID<This extends abstract new (...args: any) => any>(this: This, objectID: number): InstanceType<This>;

  closeChannel(): number;

  readonly outgoingMTU: number;

  getOutgoingMTU(): number;

  readonly incomingMTU: number;

  getIncomingMTU(): number;

  requestRemoteMTU(remoteMTU: number): number;

  writeAsyncTrapLengthRefcon(data: interop.PointerConvertible, length: number, refcon: interop.PointerConvertible): number;

  writeAsyncLengthRefcon(data: interop.PointerConvertible, length: number, refcon: interop.PointerConvertible): number;

  writeSyncLength(data: interop.PointerConvertible, length: number): number;

  setDelegate(channelDelegate: interop.Object): number;

  setDelegateWithConfiguration(channelDelegate: interop.Object, channelConfiguration: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): number;

  delegate(): interop.Object;

  readonly device: IOBluetoothDevice;

  getDevice(): IOBluetoothDevice;

  readonly objectID: number;

  getObjectID(): number;

  readonly PSM: number;

  getPSM(): number;

  readonly localChannelID: number;

  getLocalChannelID(): number;

  readonly remoteChannelID: number;

  getRemoteChannelID(): number;

  isIncoming(): boolean;

  registerForChannelCloseNotificationSelector(observer: interop.Object, inSelector: string): IOBluetoothUserNotification;

  handlePortMessage(message: NSPortMessage): void;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class IOBluetoothHostController extends NSObject {
  delegate: interop.Object;

  static defaultController<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  readonly powerState: interop.Enum<typeof BluetoothHCIPowerState>;

  classOfDevice(): number;

  setClassOfDeviceForTimeInterval(classOfDevice: number, seconds: number): number;

  addressAsString(): string;

  nameAsString(): string;

  setDelegate(delegate: interop.Object): void;
}

declare class IOBluetoothDeviceInquiry extends NSObject {
  delegate: interop.Object;

  static inquiryWithDelegate<This extends abstract new (...args: any) => any>(this: This, delegate: interop.Object): InstanceType<This>;

  initWithDelegate(delegate: interop.Object): this;

  start(): number;

  stop(): number;

  inquiryLength: number;

  searchType: number;

  updateNewDeviceNames: boolean;

  foundDevices(): NSArray;

  clearFoundDevices(): void;

  setSearchCriteriaMajorDeviceClassMinorDeviceClass(inServiceClassMajor: number, inMajorDeviceClass: number, inMinorDeviceClass: number): void;

  setDelegate(delegate: interop.Object | null): void;

  setInquiryLength(inquiryLength: number): void;

  setSearchType(searchType: number): void;

  setUpdateNewDeviceNames(updateNewDeviceNames: boolean): void;
}

declare class IOBluetoothOBEXSession extends OBEXSession implements IOBluetoothRFCOMMChannelDelegate {
  static withSDPServiceRecord<This extends abstract new (...args: any) => any>(this: This, inSDPServiceRecord: IOBluetoothSDPServiceRecord): InstanceType<This>;

  static withDeviceChannelID<This extends abstract new (...args: any) => any>(this: This, inDevice: IOBluetoothDevice, inRFCOMMChannelID: number): InstanceType<This>;

  static withIncomingRFCOMMChannelEventSelectorSelectorTargetRefCon<This extends abstract new (...args: any) => any>(this: This, inChannel: IOBluetoothRFCOMMChannel, inEventSelector: string, inEventSelectorTarget: interop.Object, inUserRefCon: interop.PointerConvertible): InstanceType<This>;

  initWithSDPServiceRecord(inSDPServiceRecord: IOBluetoothSDPServiceRecord): this;

  initWithDeviceChannelID(inDevice: IOBluetoothDevice, inChannelID: number): this;

  initWithIncomingRFCOMMChannelEventSelectorSelectorTargetRefCon(inChannel: IOBluetoothRFCOMMChannel, inEventSelector: string, inEventSelectorTarget: interop.Object, inUserRefCon: interop.PointerConvertible): this;

  getRFCOMMChannel(): IOBluetoothRFCOMMChannel;

  getDevice(): IOBluetoothDevice;

  sendBufferTroughChannel(): number;

  restartTransmission(): void;

  isSessionTargetAMac(): boolean;

  openTransportConnectionSelectorTargetRefCon(inSelector: string, inTarget: interop.Object, inUserRefCon: interop.PointerConvertible): number;

  hasOpenTransportConnection(): number;

  closeTransportConnection(): number;

  sendDataToTransportDataLength(inDataToSend: interop.PointerConvertible, inDataLength: number): number;

  setOpenTransportConnectionAsyncSelectorTargetRefCon(inSelector: string, inSelectorTarget: interop.Object, inUserRefCon: interop.PointerConvertible): void;

  setOBEXSessionOpenConnectionCallbackRefCon(inCallback: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, inUserRefCon: interop.PointerConvertible): void;

  rfcommChannelDataDataLength(rfcommChannel: IOBluetoothRFCOMMChannel, dataPointer: interop.PointerConvertible, dataLength: number): void;

  rfcommChannelOpenCompleteStatus(rfcommChannel: IOBluetoothRFCOMMChannel, error: number): void;

  rfcommChannelClosed(rfcommChannel: IOBluetoothRFCOMMChannel): void;

  rfcommChannelControlSignalsChanged(rfcommChannel: IOBluetoothRFCOMMChannel): void;

  rfcommChannelFlowControlChanged(rfcommChannel: IOBluetoothRFCOMMChannel): void;

  rfcommChannelWriteCompleteRefconStatus(rfcommChannel: IOBluetoothRFCOMMChannel, refcon: interop.PointerConvertible, error: number): void;

  rfcommChannelWriteCompleteRefconStatusBytesWritten(rfcommChannel: IOBluetoothRFCOMMChannel, refcon: interop.PointerConvertible, error: number, length: number): void;

  rfcommChannelQueueSpaceAvailable(rfcommChannel: IOBluetoothRFCOMMChannel): void;
}

declare class OBEXFileTransferServices extends NSObject {
  delegate: interop.Object;

  static withOBEXSession<This extends abstract new (...args: any) => any>(this: This, inOBEXSession: IOBluetoothOBEXSession): InstanceType<This>;

  initWithOBEXSession(inOBEXSession: IOBluetoothOBEXSession): this;

  currentPath(): string;

  isBusy(): boolean;

  isConnected(): boolean;

  connectToFTPService(): number;

  connectToObjectPushService(): number;

  disconnect(): number;

  changeCurrentFolderToRoot(): number;

  changeCurrentFolderBackward(): number;

  changeCurrentFolderForwardToPath(inDirName: string): number;

  createFolder(inDirName: string): number;

  removeItem(inItemName: string): number;

  retrieveFolderListing(): number;

  sendFile(inLocalPathAndName: string): number;

  copyRemoteFileToLocalPath(inRemoteFileName: string, inLocalPathAndName: string): number;

  sendDataTypeName(inData: NSData, inType: string, inName: string): number;

  getDefaultVCard(inLocalPathAndName: string): number;

  abort(): number;

  setDelegate(delegate: interop.Object): void;
}

declare class IOBluetoothUserNotification extends NSObject {
  unregister(): void;
}

declare class IOBluetoothHandsFreeDevice extends IOBluetoothHandsFree {
  initWithDeviceDelegate(device: IOBluetoothDevice, inDelegate: IOBluetoothHandsFreeDelegate): this;
  initWithDeviceDelegate(device: IOBluetoothDevice, delegate: interop.Object): this;

  dialNumber(aNumber: string): void;

  memoryDial(memoryLocation: number): void;

  redial(): void;

  endCall(): void;

  acceptCall(): void;

  acceptCallOnPhone(): void;

  sendDTMF(character: string): void;

  subscriberNumber(): void;

  currentCallList(): void;

  releaseHeldCalls(): void;

  releaseActiveCalls(): void;

  releaseCall(index: number): void;

  holdCall(): void;

  placeAllOthersOnHold(index: number): void;

  addHeldCall(): void;

  callTransfer(): void;

  transferAudioToComputer(): void;

  transferAudioToPhone(): void;

  sendSMSMessage(aNumber: string, aMessage: string): void;

  sendATCommand(atCommand: string): void;

  sendATCommandTimeoutSelectorTarget(atCommand: string, timeout: number, selector: string, target: interop.Object): void;
}

declare class IOBluetoothSDPServiceRecord extends NSObject implements NSCoding, NSSecureCoding {
  static publishedServiceRecordWithDictionary<This extends abstract new (...args: any) => any>(this: This, serviceDict: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): InstanceType<This>;

  removeServiceRecord(): number;

  static withServiceDictionaryDevice<This extends abstract new (...args: any) => any>(this: This, serviceDict: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, device: IOBluetoothDevice): InstanceType<This>;

  initWithServiceDictionaryDevice(serviceDict: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, device: IOBluetoothDevice): this;

  static withSDPServiceRecordRef<This extends abstract new (...args: any) => any>(this: This, sdpServiceRecordRef: interop.Object): InstanceType<This>;

  getSDPServiceRecordRef(): interop.Object;

  readonly device: IOBluetoothDevice;

  getDevice(): IOBluetoothDevice;

  readonly attributes: NSDictionary;

  getAttributes(): NSDictionary;

  getAttributeDataElement(attributeID: number): IOBluetoothSDPDataElement;

  getServiceName(): string;

  getRFCOMMChannelID(rfcommChannelID: interop.PointerConvertible): number;

  getL2CAPPSM(outPSM: interop.PointerConvertible): number;

  getServiceRecordHandle(outServiceRecordHandle: interop.PointerConvertible): number;

  matchesUUID16(uuid16: number): boolean;

  matchesUUIDArray(uuidArray: NSArray<interop.Object> | Array<interop.Object>): boolean;

  matchesSearchArray(searchArray: NSArray<interop.Object> | Array<interop.Object>): boolean;

  hasServiceFromArray(array: NSArray<interop.Object> | Array<interop.Object>): boolean;

  readonly sortedAttributes: NSArray;

  handsFreeSupportedFeatures(): number;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  static readonly supportsSecureCoding: boolean;
}

declare class IOBluetoothObject extends NSObject implements NSCopying {
  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class IOBluetoothDevice extends IOBluetoothObject implements NSCoding, NSSecureCoding {
  static registerForConnectNotificationsSelector(observer: interop.Object, inSelector: string): IOBluetoothUserNotification;

  registerForDisconnectNotificationSelector(observer: interop.Object, inSelector: string): IOBluetoothUserNotification;

  static deviceWithAddress<This extends abstract new (...args: any) => any>(this: This, address: interop.PointerConvertible): InstanceType<This>;

  static withAddress<This extends abstract new (...args: any) => any>(this: This, address: interop.PointerConvertible): InstanceType<This>;

  static deviceWithAddressString<This extends abstract new (...args: any) => any>(this: This, address: string): InstanceType<This>;

  static withDeviceRef<This extends abstract new (...args: any) => any>(this: This, deviceRef: interop.Object): InstanceType<This>;

  getDeviceRef(): interop.Object;

  openL2CAPChannelSyncWithPSMDelegate(newChannel: interop.PointerConvertible, psm: number, channelDelegate: interop.Object): number;

  openL2CAPChannelAsyncWithPSMDelegate(newChannel: interop.PointerConvertible, psm: number, channelDelegate: interop.Object): number;

  openL2CAPChannelFindExistingNewChannel(psm: number, findExisting: boolean, newChannel: interop.PointerConvertible): number;

  sendL2CAPEchoRequestLength(data: interop.PointerConvertible, length: number): number;

  openRFCOMMChannelChannel(channelID: number, rfcommChannel: interop.PointerConvertible): number;

  openRFCOMMChannelSyncWithChannelIDDelegate(rfcommChannel: interop.PointerConvertible, channelID: number, channelDelegate: interop.Object): number;

  openRFCOMMChannelAsyncWithChannelIDDelegate(rfcommChannel: interop.PointerConvertible, channelID: number, channelDelegate: interop.Object): number;

  readonly classOfDevice: number;

  getClassOfDevice(): number;

  readonly serviceClassMajor: number;

  getServiceClassMajor(): number;

  readonly deviceClassMajor: number;

  getDeviceClassMajor(): number;

  readonly deviceClassMinor: number;

  getDeviceClassMinor(): number;

  readonly name: string;

  getName(): string;

  readonly nameOrAddress: string;

  getNameOrAddress(): string;

  readonly lastNameUpdate: NSDate;

  getLastNameUpdate(): NSDate;

  getAddress(): interop.Pointer;

  readonly addressString: string;

  getAddressString(): string;

  getPageScanRepetitionMode(): number;

  getPageScanPeriodMode(): number;

  getPageScanMode(): number;

  getClockOffset(): number;

  getLastInquiryUpdate(): NSDate;

  RSSI(): number;

  rawRSSI(): number;

  isConnected(): boolean;

  openConnection(): number;

  openConnectionWithPageTimeoutAuthenticationRequired(target: interop.Object, pageTimeoutValue: number, authenticationRequired: boolean): number;

  closeConnection(): number;

  remoteNameRequest(target: interop.Object): number;

  remoteNameRequestWithPageTimeout(target: interop.Object, pageTimeoutValue: number): number;

  requestAuthentication(): number;

  readonly connectionHandle: number;

  getConnectionHandle(): number;

  isIncoming(): boolean;

  getLinkType(): number;

  getEncryptionMode(): number;

  performSDPQuery(target: interop.Object): number;

  performSDPQueryUuids(target: interop.Object, uuidArray: NSArray<interop.Object> | Array<interop.Object>): number;

  readonly services: NSArray;

  getServices(): NSArray;

  getLastServicesUpdate(): NSDate;

  getServiceRecordForUUID(sdpUUID: IOBluetoothSDPUUID): IOBluetoothSDPServiceRecord;

  static favoriteDevices(): NSArray;

  isFavorite(): boolean;

  addToFavorites(): number;

  removeFromFavorites(): number;

  static recentDevices(numDevices: number): NSArray;

  recentAccessDate(): NSDate;

  static pairedDevices(): NSArray;

  isPaired(): boolean;

  setSupervisionTimeout(timeout: number): number;

  openL2CAPChannelSyncWithPSMWithConfigurationDelegate(newChannel: interop.PointerConvertible, psm: number, channelConfiguration: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, channelDelegate: interop.Object): number;

  openL2CAPChannelAsyncWithPSMWithConfigurationDelegate(newChannel: interop.PointerConvertible, psm: number, channelConfiguration: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, channelDelegate: interop.Object): number;

  awakeAfterUsingCoder(coder: NSCoder): interop.Object;

  handsFreeAudioGatewayDriverID(): string;

  handsFreeAudioGatewayServiceRecord(): IOBluetoothSDPServiceRecord;

  readonly handsFreeAudioGateway: boolean;

  handsFreeDeviceDriverID(): string;

  handsFreeDeviceServiceRecord(): IOBluetoothSDPServiceRecord;

  readonly handsFreeDevice: boolean;

  isHandsFreeAudioGateway(): boolean;

  isHandsFreeDevice(): boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  static readonly supportsSecureCoding: boolean;
}

declare class IOBluetoothSDPUUID extends NSData {
  static uuidWithBytesLength<This extends abstract new (...args: any) => any>(this: This, bytes: interop.PointerConvertible, length: number): InstanceType<This>;

  static uuidWithData<This extends abstract new (...args: any) => any>(this: This, data: NSData): InstanceType<This>;

  static uuid16<This extends abstract new (...args: any) => any>(this: This, uuid16: number): InstanceType<This>;

  static uuid32<This extends abstract new (...args: any) => any>(this: This, uuid32: number): InstanceType<This>;

  static withSDPUUIDRef<This extends abstract new (...args: any) => any>(this: This, sdpUUIDRef: interop.Object): InstanceType<This>;

  initWithUUID16(uuid16: number): this;

  initWithUUID32(uuid32: number): this;

  getSDPUUIDRef(): interop.Object;

  getUUIDWithLength(newLength: number): this;

  isEqualToUUID(otherUUID: IOBluetoothSDPUUID): boolean;

  readonly classForCoder: interop.Object;

  readonly classForArchiver: interop.Object;

  readonly classForPortCoder: interop.Object;
}


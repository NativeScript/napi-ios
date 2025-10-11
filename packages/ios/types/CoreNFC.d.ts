/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const NFCISO15693TagResponseErrorKey: string;

declare const NFCTagResponseUnexpectedLengthErrorKey: string;

declare const NFCErrorDomain: string;

declare const NFCVASMode: {
  NFCVASModeURLOnly: 0,
  NFCVASModeNormal: 1,
  VASModeURLOnly: 0,
  VASModeNormal: 1,
};

declare const NFCTypeNameFormat: {
  Empty: 0,
  NFCWellKnown: 1,
  Media: 2,
  AbsoluteURI: 3,
  NFCExternal: 4,
  Unknown: 5,
  Unchanged: 6,
};

declare const NFCMiFareFamily: {
  Unknown: 1,
  Ultralight: 2,
  Plus: 3,
  DESFire: 4,
};

declare const NFCFeliCaPollingTimeSlot: {
  NFCFeliCaPollingTimeSlotMax1: 0,
  NFCFeliCaPollingTimeSlotMax2: 1,
  NFCFeliCaPollingTimeSlotMax4: 3,
  NFCFeliCaPollingTimeSlotMax8: 7,
  NFCFeliCaPollingTimeSlotMax16: 15,
  PollingTimeSlotMax1: 0,
  PollingTimeSlotMax2: 1,
  PollingTimeSlotMax4: 3,
  PollingTimeSlotMax8: 7,
  PollingTimeSlotMax16: 15,
};

declare const NFCNDEFStatus: {
  NotSupported: 1,
  ReadWrite: 2,
  ReadOnly: 3,
};

declare const NFCTagType: {
  ISO15693: 1,
  FeliCa: 2,
  ISO7816Compatible: 3,
  MiFare: 4,
};

declare const NFCFeliCaPollingRequestCode: {
  NFCFeliCaPollingRequestCodeNoRequest: 0,
  NFCFeliCaPollingRequestCodeSystemCode: 1,
  NFCFeliCaPollingRequestCodeCommunicationPerformance: 2,
  PollingRequestCodeNoRequest: 0,
  PollingRequestCodeSystemCode: 1,
  PollingRequestCodeCommunicationPerformance: 2,
};

declare const NFCISO15693RequestFlag: {
  NFCISO15693RequestFlagDualSubCarriers: 1,
  NFCISO15693RequestFlagHighDataRate: 2,
  NFCISO15693RequestFlagProtocolExtension: 8,
  NFCISO15693RequestFlagSelect: 16,
  NFCISO15693RequestFlagAddress: 32,
  NFCISO15693RequestFlagOption: 64,
  NFCISO15693RequestFlagCommandSpecificBit8: -128,
  RequestFlagDualSubCarriers: 1,
  RequestFlagHighDataRate: 2,
  RequestFlagProtocolExtension: 8,
  RequestFlagSelect: 16,
  RequestFlagAddress: 32,
  RequestFlagOption: 64,
};

declare const NFCPollingOption: {
  ISO14443: 1,
  ISO15693: 2,
  ISO18092: 4,
  PACE: 8,
};

declare const NFCReaderError: {
  ReaderErrorUnsupportedFeature: 1,
  ReaderErrorSecurityViolation: 2,
  ReaderErrorInvalidParameter: 3,
  ReaderErrorInvalidParameterLength: 4,
  ReaderErrorParameterOutOfBound: 5,
  ReaderErrorRadioDisabled: 6,
  ReaderErrorIneligible: 7,
  ReaderErrorAccessNotAccepted: 8,
  ReaderTransceiveErrorTagConnectionLost: 100,
  ReaderTransceiveErrorRetryExceeded: 101,
  ReaderTransceiveErrorTagResponseError: 102,
  ReaderTransceiveErrorSessionInvalidated: 103,
  ReaderTransceiveErrorTagNotConnected: 104,
  ReaderTransceiveErrorPacketTooLong: 105,
  ReaderSessionInvalidationErrorUserCanceled: 200,
  ReaderSessionInvalidationErrorSessionTimeout: 201,
  ReaderSessionInvalidationErrorSessionTerminatedUnexpectedly: 202,
  ReaderSessionInvalidationErrorSystemIsBusy: 203,
  ReaderSessionInvalidationErrorFirstNDEFTagRead: 204,
  TagCommandConfigurationErrorInvalidParameters: 300,
  NdefReaderSessionErrorTagNotWritable: 400,
  NdefReaderSessionErrorTagUpdateFailure: 401,
  NdefReaderSessionErrorTagSizeTooSmall: 402,
  NdefReaderSessionErrorZeroLengthMessage: 403,
};

declare const NFCISO15693ResponseFlag: {
  Error: 1,
  ResponseBufferValid: 2,
  FinalResponse: 4,
  ProtocolExtension: 8,
  BlockSecurityStatusBit5: 16,
  BlockSecurityStatusBit6: 32,
  WaitTimeExtension: 64,
};

declare const NFCFeliCaEncryptionId: {
  NFCFeliCaEncryptionIdA: 79,
  NFCFeliCaEncryptionIdAES_D: 65,
  EncryptionIdA: 79,
  EncryptionIdAES_D: 65,
};

declare const NFCVASErrorCode: {
  NFCVASErrorCodeSuccess: 36864,
  NFCVASErrorCodeDataNotFound: 27267,
  NFCVASErrorCodeDataNotActivated: 25223,
  NFCVASErrorCodeWrongParameters: 27392,
  NFCVASErrorCodeWrongLCField: 26368,
  NFCVASErrorCodeUserIntervention: 27012,
  NFCVASErrorCodeIncorrectData: 27264,
  NFCVASErrorCodeUnsupportedApplicationVersion: 25408,
  VASErrorCodeSuccess: 36864,
  VASErrorCodeDataNotFound: 27267,
  VASErrorCodeDataNotActivated: 25223,
  VASErrorCodeWrongParameters: 27392,
  VASErrorCodeWrongLCField: 26368,
  VASErrorCodeUserIntervention: 27012,
  VASErrorCodeIncorrectData: 27264,
  VASErrorCodeUnsupportedApplicationVersion: 25408,
};

declare interface NFCReaderSessionProtocol extends NSObjectProtocol {
  readonly ready: boolean;

  alertMessage: string;

  beginSession(): void;

  invalidateSession(): void;

  invalidateSessionWithErrorMessage(errorMessage: string): void;

  isReady(): boolean;

  setAlertMessage(alertMessage: string): void;
}

declare class NFCReaderSessionProtocol extends NativeObject implements NFCReaderSessionProtocol {
}

declare interface NFCTag extends NSObjectProtocol, NSSecureCoding, NSCopying {
  readonly type: interop.Enum<typeof NFCTagType>;

  readonly session: NFCReaderSession;

  readonly available: boolean;

  asNFCISO15693Tag(): NFCISO15693Tag;

  asNFCISO7816Tag(): NFCISO7816Tag;

  asNFCFeliCaTag(): NFCFeliCaTag;

  asNFCMiFareTag(): NFCMiFareTag;

  isAvailable(): boolean;
}

declare class NFCTag extends NativeObject implements NFCTag {
}

declare interface NFCNDEFReaderSessionDelegate extends NSObjectProtocol {
  readerSessionDidInvalidateWithError(session: NFCNDEFReaderSession, error: NSError): void;

  readerSessionDidDetectNDEFs(session: NFCNDEFReaderSession, messages: NSArray<interop.Object> | Array<interop.Object>): void;

  readerSessionDidDetectTags?(session: NFCNDEFReaderSession, tags: NSArray<interop.Object> | Array<interop.Object>): void;

  readerSessionDidBecomeActive?(session: NFCNDEFReaderSession): void;
}

declare class NFCNDEFReaderSessionDelegate extends NativeObject implements NFCNDEFReaderSessionDelegate {
}

declare interface NFCVASReaderSessionDelegate extends NSObjectProtocol {
  readerSessionDidBecomeActive?(session: NFCVASReaderSession): void;

  readerSessionDidInvalidateWithError(session: NFCVASReaderSession, error: NSError): void;

  readerSessionDidReceiveVASResponses(session: NFCVASReaderSession, responses: NSArray<interop.Object> | Array<interop.Object>): void;
}

declare class NFCVASReaderSessionDelegate extends NativeObject implements NFCVASReaderSessionDelegate {
}

declare interface NFCISO7816Tag extends NFCTag, NFCNDEFTag {
  readonly initialSelectedAID: string;

  readonly identifier: NSData;

  readonly historicalBytes: NSData;

  readonly applicationData: NSData;

  readonly proprietaryApplicationDataCoding: boolean;

  sendCommandAPDUCompletionHandler(apdu: NFCISO7816APDU, completionHandler: (p1: NSData, p2: number, p3: number, p4: NSError) => void | null): void;
}

declare class NFCISO7816Tag extends NativeObject implements NFCISO7816Tag {
}

declare interface NFCNDEFTag extends NSObjectProtocol, NSSecureCoding, NSCopying {
  readonly available: boolean;

  queryNDEFStatusWithCompletionHandler(completionHandler: (p1: interop.Enum<typeof NFCNDEFStatus>, p2: number, p3: NSError) => void | null): void;

  readNDEFWithCompletionHandler(completionHandler: (p1: NFCNDEFMessage, p2: NSError) => void | null): void;

  writeNDEFCompletionHandler(ndefMessage: NFCNDEFMessage, completionHandler: (p1: NSError) => void | null): void;

  writeLockWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  isAvailable(): boolean;
}

declare class NFCNDEFTag extends NativeObject implements NFCNDEFTag {
}

declare interface NFCMiFareTag extends NFCTag, NFCNDEFTag {
  readonly mifareFamily: interop.Enum<typeof NFCMiFareFamily>;

  readonly identifier: NSData;

  readonly historicalBytes: NSData;

  sendMiFareCommandCompletionHandler(command: NSData, completionHandler: (p1: NSData, p2: NSError) => void | null): void;

  sendMiFareISO7816CommandCompletionHandler(apdu: NFCISO7816APDU, completionHandler: (p1: NSData, p2: number, p3: number, p4: NSError) => void | null): void;
}

declare class NFCMiFareTag extends NativeObject implements NFCMiFareTag {
}

declare interface NFCFeliCaTag extends NFCTag, NFCNDEFTag {
  readonly currentSystemCode: NSData;

  readonly currentIDm: NSData;

  pollingWithSystemCodeRequestCodeTimeSlotCompletionHandler(systemCode: NSData, requestCode: interop.Enum<typeof NFCFeliCaPollingRequestCode>, timeSlot: interop.Enum<typeof NFCFeliCaPollingTimeSlot>, completionHandler: (p1: NSData, p2: NSData, p3: NSError) => void | null): void;

  requestServiceWithNodeCodeListCompletionHandler(nodeCodeList: NSArray<interop.Object> | Array<interop.Object>, completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): void;

  requestResponseWithCompletionHandler(completionHandler: (p1: number, p2: NSError) => void | null): void;

  readWithoutEncryptionWithServiceCodeListBlockListCompletionHandler(serviceCodeList: NSArray<interop.Object> | Array<interop.Object>, blockList: NSArray<interop.Object> | Array<interop.Object>, completionHandler: (p1: number, p2: number, p3: NSArray<interop.Object> | Array<interop.Object>, p4: NSError) => void | null): void;

  writeWithoutEncryptionWithServiceCodeListBlockListBlockDataCompletionHandler(serviceCodeList: NSArray<interop.Object> | Array<interop.Object>, blockList: NSArray<interop.Object> | Array<interop.Object>, blockData: NSArray<interop.Object> | Array<interop.Object>, completionHandler: (p1: number, p2: number, p3: NSError) => void | null): void;

  requestSystemCodeWithCompletionHandler(completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): void;

  requestServiceV2WithNodeCodeListCompletionHandler(nodeCodeList: NSArray<interop.Object> | Array<interop.Object>, completionHandler: (p1: number, p2: number, p3: interop.Enum<typeof NFCFeliCaEncryptionId>, p4: NSArray<interop.Object> | Array<interop.Object>, p5: NSArray<interop.Object> | Array<interop.Object>, p6: NSError) => void | null): void;

  requestSpecificationVersionWithCompletionHandler(completionHandler: (p1: number, p2: number, p3: NSData, p4: NSData, p5: NSError) => void | null): void;

  resetModeWithCompletionHandler(completionHandler: (p1: number, p2: number, p3: NSError) => void | null): void;

  sendFeliCaCommandPacketCompletionHandler(commandPacket: NSData, completionHandler: (p1: NSData, p2: NSError) => void | null): void;
}

declare class NFCFeliCaTag extends NativeObject implements NFCFeliCaTag {
}

declare interface NFCReaderSessionDelegate extends NSObjectProtocol {
  readerSessionDidBecomeActive(session: NFCReaderSession): void;

  readerSessionDidInvalidateWithError(session: NFCReaderSession, error: NSError): void;

  readerSessionDidDetectTags?(session: NFCReaderSession, tags: NSArray<interop.Object> | Array<interop.Object>): void;
}

declare class NFCReaderSessionDelegate extends NativeObject implements NFCReaderSessionDelegate {
}

declare interface NFCISO15693Tag extends NFCTag, NFCNDEFTag {
  readonly identifier: NSData;

  readonly icManufacturerCode: number;

  readonly icSerialNumber: NSData;

  sendCustomCommandWithConfigurationCompletionHandler(commandConfiguration: NFCISO15693CustomCommandConfiguration, completionHandler: (p1: NSData, p2: NSError) => void | null): void;

  readMultipleBlocksWithConfigurationCompletionHandler(readConfiguration: NFCISO15693ReadMultipleBlocksConfiguration, completionHandler: (p1: NSData, p2: NSError) => void | null): void;

  stayQuietWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  readSingleBlockWithRequestFlagsBlockNumberCompletionHandler(flags: interop.Enum<typeof NFCISO15693RequestFlag>, blockNumber: number, completionHandler: (p1: NSData, p2: NSError) => void | null): void;

  writeSingleBlockWithRequestFlagsBlockNumberDataBlockCompletionHandler(flags: interop.Enum<typeof NFCISO15693RequestFlag>, blockNumber: number, dataBlock: NSData, completionHandler: (p1: NSError) => void | null): void;

  lockBlockWithRequestFlagsBlockNumberCompletionHandler(flags: interop.Enum<typeof NFCISO15693RequestFlag>, blockNumber: number, completionHandler: (p1: NSError) => void | null): void;

  readMultipleBlocksWithRequestFlagsBlockRangeCompletionHandler(flags: interop.Enum<typeof NFCISO15693RequestFlag>, blockRange: _NSRange, completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): void;

  writeMultipleBlocksWithRequestFlagsBlockRangeDataBlocksCompletionHandler(flags: interop.Enum<typeof NFCISO15693RequestFlag>, blockRange: _NSRange, dataBlocks: NSArray<interop.Object> | Array<interop.Object>, completionHandler: (p1: NSError) => void | null): void;

  selectWithRequestFlagsCompletionHandler(flags: interop.Enum<typeof NFCISO15693RequestFlag>, completionHandler: (p1: NSError) => void | null): void;

  resetToReadyWithRequestFlagsCompletionHandler(flags: interop.Enum<typeof NFCISO15693RequestFlag>, completionHandler: (p1: NSError) => void | null): void;

  writeAFIWithRequestFlagAfiCompletionHandler(flags: interop.Enum<typeof NFCISO15693RequestFlag>, afi: number, completionHandler: (p1: NSError) => void | null): void;

  lockAFIWithRequestFlagCompletionHandler(flags: interop.Enum<typeof NFCISO15693RequestFlag>, completionHandler: (p1: NSError) => void | null): void;

  writeDSFIDWithRequestFlagDsfidCompletionHandler(flags: interop.Enum<typeof NFCISO15693RequestFlag>, dsfid: number, completionHandler: (p1: NSError) => void | null): void;

  lockDFSIDWithRequestFlagCompletionHandler(flags: interop.Enum<typeof NFCISO15693RequestFlag>, completionHandler: (p1: NSError) => void | null): void;

  lockDSFIDWithRequestFlagCompletionHandler(flags: interop.Enum<typeof NFCISO15693RequestFlag>, completionHandler: (p1: NSError) => void | null): void;

  getSystemInfoWithRequestFlagCompletionHandler(flags: interop.Enum<typeof NFCISO15693RequestFlag>, completionHandler: (p1: number, p2: number, p3: number, p4: number, p5: number, p6: NSError) => void | null): void;

  getSystemInfoAndUIDWithRequestFlagCompletionHandler(flags: interop.Enum<typeof NFCISO15693RequestFlag>, completionHandler: (p1: NSData, p2: number, p3: number, p4: number, p5: number, p6: number, p7: NSError) => void | null): void;

  getMultipleBlockSecurityStatusWithRequestFlagBlockRangeCompletionHandler(flags: interop.Enum<typeof NFCISO15693RequestFlag>, blockRange: _NSRange, completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): void;

  fastReadMultipleBlocksWithRequestFlagBlockRangeCompletionHandler(flags: interop.Enum<typeof NFCISO15693RequestFlag>, blockRange: _NSRange, completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): void;

  customCommandWithRequestFlagCustomCommandCodeCustomRequestParametersCompletionHandler(flags: interop.Enum<typeof NFCISO15693RequestFlag>, customCommandCode: number, customRequestParameters: NSData, completionHandler: (p1: NSData, p2: NSError) => void | null): void;

  extendedReadSingleBlockWithRequestFlagsBlockNumberCompletionHandler(flags: interop.Enum<typeof NFCISO15693RequestFlag>, blockNumber: number, completionHandler: (p1: NSData, p2: NSError) => void | null): void;

  extendedWriteSingleBlockWithRequestFlagsBlockNumberDataBlockCompletionHandler(flags: interop.Enum<typeof NFCISO15693RequestFlag>, blockNumber: number, dataBlock: NSData, completionHandler: (p1: NSError) => void | null): void;

  extendedLockBlockWithRequestFlagsBlockNumberCompletionHandler(flags: interop.Enum<typeof NFCISO15693RequestFlag>, blockNumber: number, completionHandler: (p1: NSError) => void | null): void;

  extendedReadMultipleBlocksWithRequestFlagsBlockRangeCompletionHandler(flags: interop.Enum<typeof NFCISO15693RequestFlag>, blockRange: _NSRange, completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): void;

  extendedWriteMultipleBlocksWithRequestFlagsBlockRangeDataBlocksCompletionHandler(flags: interop.Enum<typeof NFCISO15693RequestFlag>, blockRange: _NSRange, dataBlocks: NSArray<interop.Object> | Array<interop.Object>, completionHandler: (p1: NSError) => void | null): void;

  authenticateWithRequestFlagsCryptoSuiteIdentifierMessageCompletionHandler(flags: interop.Enum<typeof NFCISO15693RequestFlag>, cryptoSuiteIdentifier: number, message: NSData, completionHandler: (p1: interop.Enum<typeof NFCISO15693ResponseFlag>, p2: NSData, p3: NSError) => void | null): void;

  keyUpdateWithRequestFlagsKeyIdentifierMessageCompletionHandler(flags: interop.Enum<typeof NFCISO15693RequestFlag>, keyIdentifier: number, message: NSData, completionHandler: (p1: interop.Enum<typeof NFCISO15693ResponseFlag>, p2: NSData, p3: NSError) => void | null): void;

  challengeWithRequestFlagsCryptoSuiteIdentifierMessageCompletionHandler(flags: interop.Enum<typeof NFCISO15693RequestFlag>, cryptoSuiteIdentifier: number, message: NSData, completionHandler: (p1: NSError) => void | null): void;

  readBufferWithRequestFlagsCompletionHandler(flags: interop.Enum<typeof NFCISO15693RequestFlag>, completionHandler: (p1: interop.Enum<typeof NFCISO15693ResponseFlag>, p2: NSData, p3: NSError) => void | null): void;

  extendedGetMultipleBlockSecurityStatusWithRequestFlagBlockRangeCompletionHandler(flags: interop.Enum<typeof NFCISO15693RequestFlag>, blockRange: _NSRange, completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): void;

  extendedFastReadMultipleBlocksWithRequestFlagBlockRangeCompletionHandler(flags: interop.Enum<typeof NFCISO15693RequestFlag>, blockRange: _NSRange, completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): void;

  sendRequestWithFlagCommandCodeDataCompletionHandler(flags: number, commandCode: number, data: NSData | null, completionHandler: (p1: interop.Enum<typeof NFCISO15693ResponseFlag>, p2: NSData, p3: NSError) => void | null): void;
}

declare class NFCISO15693Tag extends NativeObject implements NFCISO15693Tag {
}

declare interface NFCTagReaderSessionDelegate extends NSObjectProtocol {
  tagReaderSessionDidInvalidateWithError(session: NFCTagReaderSession, error: NSError): void;

  tagReaderSessionDidBecomeActive?(session: NFCTagReaderSession): void;

  tagReaderSessionDidDetectTags?(session: NFCTagReaderSession, tags: NSArray<interop.Object> | Array<interop.Object>): void;
}

declare class NFCTagReaderSessionDelegate extends NativeObject implements NFCTagReaderSessionDelegate {
}

declare class NFCVASResponse extends NSObject implements NSCopying {
  readonly status: interop.Enum<typeof NFCVASErrorCode>;

  readonly vasData: NSData;

  readonly mobileToken: NSData;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class NFCVASReaderSession extends NFCReaderSession {
  initWithVASCommandConfigurationsDelegateQueue(commandConfigurations: NSArray<interop.Object> | Array<interop.Object>, delegate: NFCVASReaderSessionDelegate, queue: NSObject | null): this;
}

declare class NFCNDEFMessage extends NSObject implements NSSecureCoding {
  get records(): NSArray;
  set records(value: NSArray<interop.Object> | Array<interop.Object>);

  readonly length: number;

  initWithNDEFRecords(records: NSArray<interop.Object> | Array<interop.Object>): this;

  static ndefMessageWithData<This extends abstract new (...args: any) => any>(this: This, data: NSData): InstanceType<This> | null;

  setRecords(records: NSArray<interop.Object> | Array<interop.Object>): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class NFCNDEFPayload extends NSObject implements NSSecureCoding {
  typeNameFormat: interop.Enum<typeof NFCTypeNameFormat>;

  type: NSData;

  identifier: NSData;

  payload: NSData;

  initWithFormatTypeIdentifierPayload(format: interop.Enum<typeof NFCTypeNameFormat>, type: NSData, identifier: NSData, payload: NSData): this;

  initWithFormatTypeIdentifierPayloadChunkSize(format: interop.Enum<typeof NFCTypeNameFormat>, type: NSData, identifier: NSData, payload: NSData, chunkSize: number): this;

  setTypeNameFormat(typeNameFormat: interop.Enum<typeof NFCTypeNameFormat>): void;

  setType(type: NSData): void;

  setIdentifier(identifier: NSData): void;

  setPayload(payload: NSData): void;

  static wellKnownTypeURIPayloadWithString<This extends abstract new (...args: any) => any>(this: This, uri: string): InstanceType<This> | null;

  static wellKnownTypeURIPayloadWithURL<This extends abstract new (...args: any) => any>(this: This, url: NSURL): InstanceType<This> | null;

  static wellKnownTypeTextPayloadWithStringLocale<This extends abstract new (...args: any) => any>(this: This, text: string, locale: NSLocale): InstanceType<This> | null;

  static wellKnowTypeTextPayloadWithStringLocale<This extends abstract new (...args: any) => any>(this: This, text: string, locale: NSLocale): InstanceType<This> | null;

  wellKnownTypeURIPayload(): NSURL | null;

  wellKnownTypeTextPayloadWithLocale(locale: interop.PointerConvertible): string | null;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class NFCTagReaderSession extends NFCReaderSession {
  readonly connectedTag: NFCTag;

  initWithPollingOptionDelegateQueue(pollingOption: interop.Enum<typeof NFCPollingOption>, delegate: NFCTagReaderSessionDelegate, queue: NSObject | null): this;

  restartPolling(): void;

  connectToTagCompletionHandler(tag: NFCTag, completionHandler: (p1: NSError) => void | null): void;
}

declare class NFCTagCommandConfiguration extends NSObject implements NSCopying {
  maximumRetries: number;

  retryInterval: number;

  setMaximumRetries(maximumRetries: number): void;

  setRetryInterval(retryInterval: number): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class NFCISO7816APDU extends NSObject implements NSCopying {
  readonly instructionClass: number;

  readonly instructionCode: number;

  readonly p1Parameter: number;

  readonly p2Parameter: number;

  readonly data: NSData;

  readonly expectedResponseLength: number;

  initWithInstructionClassInstructionCodeP1ParameterP2ParameterDataExpectedResponseLength(instructionClass: number, instructionCode: number, p1Parameter: number, p2Parameter: number, data: NSData, expectedResponseLength: number): this;

  initWithData(data: NSData): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class NFCReaderSession extends NSObject implements NFCReaderSessionProtocol {
  readonly delegate: interop.Object;

  static readonly readingAvailable: boolean;

  readonly sessionQueue: NSObject;

  readonly ready: boolean;

  alertMessage: string;

  beginSession(): void;

  invalidateSession(): void;

  invalidateSessionWithErrorMessage(errorMessage: string): void;

  isReady(): boolean;

  setAlertMessage(alertMessage: string): void;

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

declare class NFCISO15693CustomCommandConfiguration extends NFCTagCommandConfiguration {
  manufacturerCode: number;

  customCommandCode: number;

  requestParameters: NSData;

  initWithManufacturerCodeCustomCommandCodeRequestParameters(manufacturerCode: number, customCommandCode: number, requestParameters: NSData | null): this;

  initWithManufacturerCodeCustomCommandCodeRequestParametersMaximumRetriesRetryInterval(manufacturerCode: number, customCommandCode: number, requestParameters: NSData | null, maximumRetries: number, retryInterval: number): this;

  setManufacturerCode(manufacturerCode: number): void;

  setCustomCommandCode(customCommandCode: number): void;

  setRequestParameters(requestParameters: NSData): void;
}

declare class NFCPaymentTagReaderSession extends NFCTagReaderSession {
  initWithDelegateQueue(delegate: NFCTagReaderSessionDelegate, queue: NSObject | null): this;
}

declare class NFCISO15693ReaderSession extends NFCReaderSession {
  initWithDelegateQueue(delegate: NFCReaderSessionDelegate, queue: NSObject | null): this;

  restartPolling(): void;
}

declare class NFCISO15693ReadMultipleBlocksConfiguration extends NFCTagCommandConfiguration {
  range: _NSRange;

  chunkSize: number;

  initWithRangeChunkSize(range: _NSRange, chunkSize: number): this;

  initWithRangeChunkSizeMaximumRetriesRetryInterval(range: _NSRange, chunkSize: number, maximumRetries: number, retryInterval: number): this;

  setRange(range: _NSRange): void;

  setChunkSize(chunkSize: number): void;
}

declare class NFCNDEFReaderSession extends NFCReaderSession {
  initWithDelegateQueueInvalidateAfterFirstRead(delegate: NFCNDEFReaderSessionDelegate, queue: NSObject | null, invalidateAfterFirstRead: boolean): this;

  restartPolling(): void;

  connectToTagCompletionHandler(tag: NFCNDEFTag, completionHandler: (p1: NSError) => void | null): void;
}

declare class NFCVASCommandConfiguration extends NSObject implements NSCopying {
  mode: interop.Enum<typeof NFCVASMode>;

  passTypeIdentifier: string;

  url: NSURL;

  initWithVASModePassTypeIdentifierUrl(mode: interop.Enum<typeof NFCVASMode>, passTypeIdentifier: string, url: NSURL | null): this;

  setMode(mode: interop.Enum<typeof NFCVASMode>): void;

  setPassTypeIdentifier(passTypeIdentifier: string): void;

  setUrl(url: NSURL): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}


/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const TKErrorDomain: string;

declare const TKTokenOperation: {
  None: 0,
  ReadData: 1,
  SignData: 2,
  DecryptData: 3,
  PerformKeyExchange: 4,
};

declare const TKSmartCardPINConfirmation: {
  None: 0,
  New: 1,
  Current: 2,
};

declare const TKSmartCardPINJustification: {
  Left: 0,
  Right: 1,
};

declare const TKSmartCardPINEncoding: {
  Binary: 0,
  ASCII: 1,
  BCD: 2,
};

declare const TKSmartCardProtocol: {
  None: 0,
  T0: 1,
  T1: 2,
  T15: 32768,
  Any: 65535,
};

declare const TKErrorCode: {
  CodeNotImplemented: -1,
  CodeCommunicationError: -2,
  CodeCorruptedData: -3,
  CodeCanceledByUser: -4,
  CodeAuthenticationFailed: -5,
  CodeObjectNotFound: -6,
  CodeTokenNotFound: -7,
  CodeBadParameter: -8,
  CodeAuthenticationNeeded: -9,
  AuthenticationFailed: -5,
  ObjectNotFound: -6,
  TokenNotFound: -7,
};

declare const TKSmartCardSlotState: {
  Missing: 0,
  Empty: 1,
  Probing: 2,
  MuteCard: 3,
  ValidCard: 4,
};

declare const TKSmartCardPINCharset: {
  Numeric: 0,
  Alphanumeric: 1,
  UpperAlphanumeric: 2,
};

declare const TKSmartCardPINCompletion: {
  MaxLength: 1,
  Key: 2,
  Timeout: 4,
};

declare interface TKSmartCardTokenDriverDelegate extends TKTokenDriverDelegate {
  tokenDriverCreateTokenForSmartCardAIDError(driver: TKSmartCardTokenDriver, smartCard: TKSmartCard, AID: NSData | null, error: interop.PointerConvertible): TKSmartCardToken;
}

declare class TKSmartCardTokenDriverDelegate extends NativeObject implements TKSmartCardTokenDriverDelegate {
}

declare interface TKTokenSessionDelegate extends NSObjectProtocol {
  tokenSessionBeginAuthForOperationConstraintError?(session: TKTokenSession, operation: interop.Enum<typeof TKTokenOperation>, constraint: interop.Object, error: interop.PointerConvertible): TKTokenAuthOperation;

  tokenSessionSupportsOperationUsingKeyAlgorithm?(session: TKTokenSession, operation: interop.Enum<typeof TKTokenOperation>, keyObjectID: interop.Object, algorithm: TKTokenKeyAlgorithm): boolean;

  tokenSessionSignDataUsingKeyAlgorithmError?(session: TKTokenSession, dataToSign: NSData, keyObjectID: interop.Object, algorithm: TKTokenKeyAlgorithm, error: interop.PointerConvertible): NSData;

  tokenSessionDecryptDataUsingKeyAlgorithmError?(session: TKTokenSession, ciphertext: NSData, keyObjectID: interop.Object, algorithm: TKTokenKeyAlgorithm, error: interop.PointerConvertible): NSData;

  tokenSessionPerformKeyExchangeWithPublicKeyUsingKeyAlgorithmParametersError?(session: TKTokenSession, otherPartyPublicKeyData: NSData, objectID: interop.Object, algorithm: TKTokenKeyAlgorithm, parameters: TKTokenKeyExchangeParameters, error: interop.PointerConvertible): NSData;
}

declare class TKTokenSessionDelegate extends NativeObject implements TKTokenSessionDelegate {
}

declare interface TKSmartCardUserInteractionDelegate {
  characterEnteredInUserInteraction?(interaction: TKSmartCardUserInteraction): void;

  correctionKeyPressedInUserInteraction?(interaction: TKSmartCardUserInteraction): void;

  validationKeyPressedInUserInteraction?(interaction: TKSmartCardUserInteraction): void;

  invalidCharacterEnteredInUserInteraction?(interaction: TKSmartCardUserInteraction): void;

  oldPINRequestedInUserInteraction?(interaction: TKSmartCardUserInteraction): void;

  newPINRequestedInUserInteraction?(interaction: TKSmartCardUserInteraction): void;

  newPINConfirmationRequestedInUserInteraction?(interaction: TKSmartCardUserInteraction): void;
}

declare class TKSmartCardUserInteractionDelegate extends NativeObject implements TKSmartCardUserInteractionDelegate {
}

declare interface TKTokenDelegate extends NSObjectProtocol {
  tokenCreateSessionWithError(token: TKToken, error: interop.PointerConvertible): TKTokenSession;

  tokenTerminateSession?(token: TKToken, session: TKTokenSession): void;
}

declare class TKTokenDelegate extends NativeObject implements TKTokenDelegate {
}

declare interface TKTokenDriverDelegate extends NSObjectProtocol {
  tokenDriverTokenForConfigurationError?(driver: TKTokenDriver, configuration: TKTokenConfiguration, error: interop.PointerConvertible): TKToken;

  tokenDriverTerminateToken?(driver: TKTokenDriver, token: TKToken): void;
}

declare class TKTokenDriverDelegate extends NativeObject implements TKTokenDriverDelegate {
}

declare class TKSmartCardTokenRegistrationManager extends NSObject {
  static readonly defaultManager: TKSmartCardTokenRegistrationManager;

  readonly registeredSmartCardTokens: NSArray;

  registerSmartCardWithTokenIDPromptMessageError(tokenID: string, promptMessage: string, error: interop.PointerConvertible): boolean;

  unregisterSmartCardWithTokenIDError(tokenID: string, error: interop.PointerConvertible): boolean;
}

declare class TKTokenWatcher extends NSObject {
  readonly tokenIDs: NSArray;

  init(): this;

  initWithInsertionHandler(insertionHandler: (p1: string) => void): this;

  setInsertionHandler(insertionHandler: (p1: string) => void): void;

  addRemovalHandlerForTokenID(removalHandler: (p1: string) => void, tokenID: string): void;

  tokenInfoForTokenID(tokenID: string): TKTokenWatcherTokenInfo;
}

declare class TKSmartCardTokenDriver extends TKTokenDriver {
}

declare class TKTokenSmartCardPINAuthOperation extends TKTokenAuthOperation {
  PINFormat: TKSmartCardPINFormat;

  APDUTemplate: NSData;

  PINByteOffset: number;

  smartCard: TKSmartCard;

  PIN: string;

  setPINFormat(PINFormat: TKSmartCardPINFormat): void;

  setAPDUTemplate(APDUTemplate: NSData | null): void;

  setPINByteOffset(PINByteOffset: number): void;

  setSmartCard(smartCard: TKSmartCard | null): void;

  setPIN(PIN: string | null): void;
}

declare class TKTokenConfiguration extends NSObject {
  readonly instanceID: string;

  configurationData: NSData;

  get keychainItems(): NSArray;
  set keychainItems(value: NSArray<interop.Object> | Array<interop.Object>);

  keyForObjectIDError(objectID: interop.Object, error: interop.PointerConvertible): TKTokenKeychainKey;

  certificateForObjectIDError(objectID: interop.Object, error: interop.PointerConvertible): TKTokenKeychainCertificate;

  setConfigurationData(configurationData: NSData | null): void;

  setKeychainItems(keychainItems: NSArray<interop.Object> | Array<interop.Object>): void;
}

declare class TKTokenKeychainContents extends NSObject {
  fillWithItems(items: NSArray<interop.Object> | Array<interop.Object>): void;

  readonly items: NSArray;

  keyForObjectIDError(objectID: interop.Object, error: interop.PointerConvertible): TKTokenKeychainKey;

  certificateForObjectIDError(objectID: interop.Object, error: interop.PointerConvertible): TKTokenKeychainCertificate;
}

declare class TKTokenKeychainCertificate extends TKTokenKeychainItem {
  initWithCertificateObjectID(certificateRef: interop.PointerConvertible, objectID: interop.Object): this;

  readonly data: NSData;
}

declare class TKTokenDriver extends NSObject {
  delegate: TKTokenDriverDelegate;

  setDelegate(delegate: TKTokenDriverDelegate | null): void;
}

declare class TKTokenKeyAlgorithm extends NSObject {
  isAlgorithm(algorithm: interop.PointerConvertible): boolean;

  supportsAlgorithm(algorithm: interop.PointerConvertible): boolean;
}

declare class TKSmartCard extends NSObject {
  readonly slot: TKSmartCardSlot;

  readonly valid: boolean;

  allowedProtocols: interop.Enum<typeof TKSmartCardProtocol>;

  readonly currentProtocol: interop.Enum<typeof TKSmartCardProtocol>;

  sensitive: boolean;

  context: interop.Object;

  beginSessionWithReply(reply: (p1: boolean, p2: NSError) => void | null): void;

  transmitRequestReply(request: NSData, reply: (p1: NSData, p2: NSError) => void | null): void;

  endSession(): void;

  userInteractionForSecurePINVerificationWithPINFormatAPDUPINByteOffset(PINFormat: TKSmartCardPINFormat, APDU: NSData, PINByteOffset: number): TKSmartCardUserInteractionForSecurePINVerification;

  userInteractionForSecurePINChangeWithPINFormatAPDUCurrentPINByteOffsetNewPINByteOffset(PINFormat: TKSmartCardPINFormat, APDU: NSData, currentPINByteOffset: number, newPINByteOffset: number): TKSmartCardUserInteractionForSecurePINChange;

  setAllowedProtocols(allowedProtocols: interop.Enum<typeof TKSmartCardProtocol>): void;

  setSensitive(sensitive: boolean): void;

  setContext(context: interop.Object | null): void;

  cla: number;

  useExtendedLength: boolean;

  useCommandChaining: boolean;

  sendInsP1P2DataLeReply(ins: number, p1: number, p2: number, requestData: NSData | null, le: NSNumber | null, reply: (p1: NSData, p2: number, p3: NSError) => void | null): void;

  inSessionWithErrorExecuteBlock(error: interop.PointerConvertible, block: (p1: interop.PointerConvertible) => boolean | null): boolean;

  sendInsP1P2DataLeSwError(ins: number, p1: number, p2: number, requestData: NSData | null, le: NSNumber | null, sw: interop.PointerConvertible, error: interop.PointerConvertible): NSData;

  setCla(cla: number): void;

  setUseExtendedLength(useExtendedLength: boolean): void;

  setUseCommandChaining(useCommandChaining: boolean): void;
}

declare class TKSmartCardUserInteractionForSecurePINChange extends TKSmartCardUserInteractionForPINOperation {
  PINConfirmation: interop.Enum<typeof TKSmartCardPINConfirmation>;

  setPINConfirmation(PINConfirmation: interop.Enum<typeof TKSmartCardPINConfirmation>): void;
}

declare class TKSmartCardSlotManager extends NSObject {
  static readonly defaultManager: TKSmartCardSlotManager;

  readonly slotNames: NSArray;

  getSlotWithNameReply(name: string, reply: (p1: TKSmartCardSlot) => void | null): void;

  slotNamed(name: string): TKSmartCardSlot;

  createNFCSlotWithMessageCompletion(message: string | null, completion: (p1: TKSmartCardSlotNFCSession, p2: NSError) => void | null): void;

  isNFCSupported(): boolean;
}

declare class TKSmartCardSlotNFCSession extends NSObject {
  readonly slotName: string;

  updateWithMessageError(message: string, error: interop.PointerConvertible): boolean;

  endSession(): void;
}

declare class TKSmartCardATR extends NSObject {
  initWithBytes(bytes: NSData): this;

  initWithSource(source: () => number): this;

  readonly bytes: NSData;

  readonly protocols: NSArray;

  interfaceGroupAtIndex(index: number): TKSmartCardATRInterfaceGroup;

  interfaceGroupForProtocol(protocol: interop.Enum<typeof TKSmartCardProtocol>): TKSmartCardATRInterfaceGroup;

  readonly historicalBytes: NSData;

  readonly historicalRecords: NSArray;
}

declare class TKTLVRecord extends NSObject {
  readonly tag: number;

  readonly value: NSData;

  readonly data: NSData;

  static recordFromData<This extends abstract new (...args: any) => any>(this: This, data: NSData): InstanceType<This>;

  static sequenceOfRecordsFromData(data: NSData): NSArray;
}

declare class TKTokenDriverConfiguration extends NSObject {
  static readonly driverConfigurations: NSDictionary;

  readonly classID: string;

  readonly tokenConfigurations: NSDictionary;

  addTokenConfigurationForTokenInstanceID(instanceID: string): TKTokenConfiguration;

  removeTokenConfigurationForTokenInstanceID(instanceID: string): void;
}

declare class TKSmartCardPINFormat extends NSObject {
  charset: interop.Enum<typeof TKSmartCardPINCharset>;

  encoding: interop.Enum<typeof TKSmartCardPINEncoding>;

  minPINLength: number;

  maxPINLength: number;

  PINBlockByteLength: number;

  PINJustification: interop.Enum<typeof TKSmartCardPINJustification>;

  PINBitOffset: number;

  PINLengthBitOffset: number;

  PINLengthBitSize: number;

  setCharset(charset: interop.Enum<typeof TKSmartCardPINCharset>): void;

  setEncoding(encoding: interop.Enum<typeof TKSmartCardPINEncoding>): void;

  setMinPINLength(minPINLength: number): void;

  setMaxPINLength(maxPINLength: number): void;

  setPINBlockByteLength(PINBlockByteLength: number): void;

  setPINJustification(PINJustification: interop.Enum<typeof TKSmartCardPINJustification>): void;

  setPINBitOffset(PINBitOffset: number): void;

  setPINLengthBitOffset(PINLengthBitOffset: number): void;

  setPINLengthBitSize(PINLengthBitSize: number): void;
}

declare class TKTokenSession extends NSObject {
  initWithToken(token: TKToken): this;

  readonly token: TKToken;

  delegate: TKTokenSessionDelegate;

  setDelegate(delegate: TKTokenSessionDelegate | null): void;
}

declare class TKTokenAuthOperation extends NSObject implements NSSecureCoding {
  finishWithError(error: interop.PointerConvertible): boolean;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class TKSimpleTLVRecord extends TKTLVRecord {
  initWithTagValue(tag: number, value: NSData): this;
}

declare class TKTokenPasswordAuthOperation extends TKTokenAuthOperation {
  password: string;

  setPassword(password: string | null): void;
}

declare class TKTokenWatcherTokenInfo extends NSObject {
  readonly tokenID: string;

  readonly slotName: string;

  readonly driverName: string;
}

declare class TKSmartCardTokenSession extends TKTokenSession {
  readonly smartCard: TKSmartCard;

  getSmartCardWithError(error: interop.PointerConvertible): TKSmartCard;
}

declare class TKBERTLVRecord extends TKTLVRecord {
  static dataForTag(tag: number): NSData;

  initWithTagValue(tag: number, value: NSData): this;

  initWithTagRecords(tag: number, records: NSArray<interop.Object> | Array<interop.Object>): this;
}

declare class TKSmartCardUserInteraction extends NSObject {
  delegate: TKSmartCardUserInteractionDelegate;

  initialTimeout: number;

  interactionTimeout: number;

  runWithReply(reply: (p1: boolean, p2: NSError) => void | null): void;

  cancel(): boolean;

  setDelegate(delegate: TKSmartCardUserInteractionDelegate | null): void;

  setInitialTimeout(initialTimeout: number): void;

  setInteractionTimeout(interactionTimeout: number): void;
}

declare class TKCompactTLVRecord extends TKTLVRecord {
  initWithTagValue(tag: number, value: NSData): this;
}

declare class TKTokenKeyExchangeParameters extends NSObject {
  readonly requestedSize: number;

  readonly sharedInfo: NSData;
}

declare class TKToken extends NSObject {
  initWithTokenDriverInstanceID(tokenDriver: TKTokenDriver, instanceID: string): this;

  readonly tokenDriver: TKTokenDriver;

  delegate: TKTokenDelegate;

  readonly configuration: TKTokenConfiguration;

  readonly keychainContents: TKTokenKeychainContents;

  setDelegate(delegate: TKTokenDelegate | null): void;
}

declare class TKTokenKeychainItem extends NSObject {
  initWithObjectID(objectID: interop.Object): this;

  readonly objectID: interop.Object;

  label: string;

  get constraints(): NSDictionary;
  set constraints(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  setLabel(label: string | null): void;

  setConstraints(constraints: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): void;
}

declare class TKTokenKeychainKey extends TKTokenKeychainItem {
  initWithCertificateObjectID(certificateRef: interop.PointerConvertible, objectID: interop.Object): this;

  keyType: string;

  applicationTag: NSData;

  keySizeInBits: number;

  publicKeyData: NSData;

  publicKeyHash: NSData;

  canDecrypt: boolean;

  canSign: boolean;

  canPerformKeyExchange: boolean;

  suitableForLogin: boolean;

  setKeyType(keyType: string): void;

  setApplicationTag(applicationTag: NSData | null): void;

  setKeySizeInBits(keySizeInBits: number): void;

  setPublicKeyData(publicKeyData: NSData | null): void;

  setPublicKeyHash(publicKeyHash: NSData | null): void;

  setCanDecrypt(canDecrypt: boolean): void;

  setCanSign(canSign: boolean): void;

  setCanPerformKeyExchange(canPerformKeyExchange: boolean): void;

  isSuitableForLogin(): boolean;

  setSuitableForLogin(suitableForLogin: boolean): void;
}

declare class TKSmartCardATRInterfaceGroup extends NSObject {
  readonly TA: NSNumber;

  readonly TB: NSNumber;

  readonly TC: NSNumber;

  readonly protocol: NSNumber;
}

declare class TKSmartCardSlot extends NSObject {
  readonly state: interop.Enum<typeof TKSmartCardSlotState>;

  readonly ATR: TKSmartCardATR;

  readonly name: string;

  readonly maxInputLength: number;

  readonly maxOutputLength: number;

  makeSmartCard(): TKSmartCard;
}

declare class TKSmartCardUserInteractionForPINOperation extends TKSmartCardUserInteraction {
  PINCompletion: interop.Enum<typeof TKSmartCardPINCompletion>;

  get PINMessageIndices(): NSArray;
  set PINMessageIndices(value: NSArray<interop.Object> | Array<interop.Object>);

  locale: NSLocale;

  resultSW: number;

  resultData: NSData;

  setPINCompletion(PINCompletion: interop.Enum<typeof TKSmartCardPINCompletion>): void;

  setPINMessageIndices(PINMessageIndices: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setLocale(locale: NSLocale | null): void;

  setResultSW(resultSW: number): void;

  setResultData(resultData: NSData | null): void;
}

declare class TKSmartCardToken extends TKToken {
  initWithSmartCardAIDInstanceIDTokenDriver(smartCard: TKSmartCard, AID: NSData | null, instanceID: string, tokenDriver: TKSmartCardTokenDriver): this;

  readonly AID: NSData;
}

declare class TKSmartCardUserInteractionForSecurePINVerification extends TKSmartCardUserInteractionForPINOperation {
}


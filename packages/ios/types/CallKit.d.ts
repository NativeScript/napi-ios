/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./Foundation.d.ts" />

declare const CXErrorDomainCallDirectoryManager: string;

declare const CXErrorDomainRequestTransaction: string;

declare const CXErrorDomainIncomingCall: string;

declare const CXErrorDomainNotificationServiceExtension: string;

declare const CXErrorDomain: string;

declare const CXCallDirectoryPhoneNumberMax: number;

declare const CXCallDirectoryEnabledStatus: {
  Unknown: 0,
  Disabled: 1,
  Enabled: 2,
};

declare const CXCallEndedReason: {
  Failed: 1,
  RemoteEnded: 2,
  Unanswered: 3,
  AnsweredElsewhere: 4,
  DeclinedElsewhere: 5,
};

declare const CXTranslationEngine: {
  Default: 0,
  Custom: 1,
};

declare const CXPlayDTMFCallActionType: {
  SingleTone: 1,
  SoftPause: 2,
  HardPause: 3,
};

declare const CXErrorCodeIncomingCallError: {
  Unknown: 0,
  Unentitled: 1,
  CallUUIDAlreadyExists: 2,
  FilteredByDoNotDisturb: 3,
  FilteredByBlockList: 4,
  FilteredDuringRestrictedSharingMode: 5,
  CallIsProtected: 6,
  FilteredBySensitiveParticipants: 7,
};

declare const CXErrorCodeCallDirectoryManagerError: {
  Unknown: 0,
  NoExtensionFound: 1,
  LoadingInterrupted: 2,
  EntriesOutOfOrder: 3,
  DuplicateEntries: 4,
  MaximumEntriesExceeded: 5,
  ExtensionDisabled: 6,
  CurrentlyLoading: 7,
  UnexpectedIncrementalRemoval: 8,
};

declare const CXErrorCodeNotificationServiceExtensionError: {
  Unknown: 0,
  InvalidClientProcess: 1,
  MissingNotificationFilteringEntitlement: 2,
};

declare const CXErrorCodeRequestTransactionError: {
  Unknown: 0,
  Unentitled: 1,
  UnknownCallProvider: 2,
  EmptyTransaction: 3,
  UnknownCallUUID: 4,
  CallUUIDAlreadyExists: 5,
  InvalidAction: 6,
  MaximumCallGroupsReached: 7,
  CallIsProtected: 8,
};

declare const CXHandleType: {
  Generic: 1,
  PhoneNumber: 2,
  EmailAddress: 3,
};

declare const CXErrorCode: {
  UnknownError: 0,
  Unentitled: 1,
  InvalidArgument: 2,
  MissingVoIPBackgroundMode: 3,
};

declare interface CXProviderDelegate extends NSObjectProtocol {
  providerDidReset(provider: CXProvider): void;

  providerDidBegin?(provider: CXProvider): void;

  providerExecuteTransaction?(provider: CXProvider, transaction: CXTransaction): boolean;

  providerPerformStartCallAction?(provider: CXProvider, action: CXStartCallAction): void;

  providerPerformAnswerCallAction?(provider: CXProvider, action: CXAnswerCallAction): void;

  providerPerformEndCallAction?(provider: CXProvider, action: CXEndCallAction): void;

  providerPerformSetHeldCallAction?(provider: CXProvider, action: CXSetHeldCallAction): void;

  providerPerformSetMutedCallAction?(provider: CXProvider, action: CXSetMutedCallAction): void;

  providerPerformSetGroupCallAction?(provider: CXProvider, action: CXSetGroupCallAction): void;

  providerPerformPlayDTMFCallAction?(provider: CXProvider, action: CXPlayDTMFCallAction): void;

  providerPerformSetTranslatingCallAction?(provider: CXProvider, action: CXSetTranslatingCallAction): void;

  providerTimedOutPerformingAction?(provider: CXProvider, action: CXAction): void;

  providerDidActivateAudioSession?(provider: CXProvider, audioSession: AVAudioSession): void;

  providerDidDeactivateAudioSession?(provider: CXProvider, audioSession: AVAudioSession): void;
}

declare class CXProviderDelegate extends NativeObject implements CXProviderDelegate {
}

declare interface CXCallDirectoryExtensionContextDelegate extends NSObjectProtocol {
  requestFailedForExtensionContextWithError(extensionContext: CXCallDirectoryExtensionContext, error: NSError): void;
}

declare class CXCallDirectoryExtensionContextDelegate extends NativeObject implements CXCallDirectoryExtensionContextDelegate {
}

declare interface CXCallObserverDelegate extends NSObjectProtocol {
  callObserverCallChanged(callObserver: CXCallObserver, call: CXCall): void;
}

declare class CXCallObserverDelegate extends NativeObject implements CXCallObserverDelegate {
}

declare class CXCallDirectoryProvider extends NSObject implements NSExtensionRequestHandling {
  beginRequestWithExtensionContext(context: CXCallDirectoryExtensionContext): void;

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

declare class CXCallController extends NSObject {
  init(): this;

  initWithQueue(queue: NSObject): this;

  readonly callObserver: CXCallObserver;

  requestTransactionCompletion(transaction: CXTransaction, completion: (p1: NSError) => void | null): void;

  requestTransactionWithActionsCompletion(actions: NSArray<interop.Object> | Array<interop.Object>, completion: (p1: NSError) => void | null): void;

  requestTransactionWithActionCompletion(action: CXAction, completion: (p1: NSError) => void | null): void;
}

declare class CXProviderConfiguration extends NSObject implements NSCopying {
  readonly localizedName: string;

  ringtoneSound: string;

  iconTemplateImageData: NSData;

  maximumCallGroups: number;

  maximumCallsPerCallGroup: number;

  includesCallsInRecents: boolean;

  supportsVideo: boolean;

  supportsAudioTranslation: boolean;

  supportedHandleTypes: NSSet;

  init(): this;

  initWithLocalizedName(localizedName: string): this;

  setRingtoneSound(ringtoneSound: string | null): void;

  setIconTemplateImageData(iconTemplateImageData: NSData | null): void;

  setMaximumCallGroups(maximumCallGroups: number): void;

  setMaximumCallsPerCallGroup(maximumCallsPerCallGroup: number): void;

  setIncludesCallsInRecents(includesCallsInRecents: boolean): void;

  setSupportsVideo(supportsVideo: boolean): void;

  setSupportsAudioTranslation(supportsAudioTranslation: boolean): void;

  setSupportedHandleTypes(supportedHandleTypes: NSSet): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class CXPlayDTMFCallAction extends CXCallAction {
  initWithCallUUIDDigitsType(callUUID: NSUUID, digits: string, type: interop.Enum<typeof CXPlayDTMFCallActionType>): this;

  initWithCoder(aDecoder: NSCoder): this;

  digits: string;

  type: interop.Enum<typeof CXPlayDTMFCallActionType>;

  setDigits(digits: string): void;

  setType(type: interop.Enum<typeof CXPlayDTMFCallActionType>): void;
}

declare class CXSetMutedCallAction extends CXCallAction {
  initWithCallUUIDMuted(callUUID: NSUUID, muted: boolean): this;

  initWithCoder(aDecoder: NSCoder): this;

  muted: boolean;

  isMuted(): boolean;

  setMuted(muted: boolean): void;
}

declare class CXSetHeldCallAction extends CXCallAction {
  initWithCallUUIDOnHold(callUUID: NSUUID, onHold: boolean): this;

  initWithCoder(aDecoder: NSCoder): this;

  onHold: boolean;

  isOnHold(): boolean;

  setOnHold(onHold: boolean): void;
}

declare class CXEndCallAction extends CXCallAction {
  fulfillWithDateEnded(dateEnded: NSDate): void;
}

declare class CXAnswerCallAction extends CXCallAction {
  fulfillWithDateConnected(dateConnected: NSDate): void;
}

declare class CXStartCallAction extends CXCallAction {
  initWithCallUUIDHandle(callUUID: NSUUID, handle: CXHandle): this;

  initWithCoder(aDecoder: NSCoder): this;

  handle: CXHandle;

  contactIdentifier: string;

  video: boolean;

  fulfillWithDateStarted(dateStarted: NSDate): void;

  setHandle(handle: CXHandle): void;

  setContactIdentifier(contactIdentifier: string | null): void;

  isVideo(): boolean;

  setVideo(video: boolean): void;
}

declare class CXHandle extends NSObject implements NSCopying, NSSecureCoding {
  readonly type: interop.Enum<typeof CXHandleType>;

  readonly value: string;

  initWithTypeValue(type: interop.Enum<typeof CXHandleType>, value: string): this;

  isEqualToHandle(handle: CXHandle): boolean;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CXTransaction extends NSObject implements NSCopying, NSSecureCoding {
  readonly UUID: NSUUID;

  readonly complete: boolean;

  readonly actions: NSArray;

  initWithActions(actions: NSArray<interop.Object> | Array<interop.Object>): this;

  initWithAction(action: CXAction): this;

  addAction(action: CXAction): void;

  isComplete(): boolean;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CXCallAction extends CXAction {
  readonly callUUID: NSUUID;

  initWithCallUUID(callUUID: NSUUID): this;

  initWithCoder(aDecoder: NSCoder): this;
}

declare class CXCall extends NSObject {
  readonly UUID: NSUUID;

  readonly outgoing: boolean;

  readonly onHold: boolean;

  readonly hasConnected: boolean;

  readonly hasEnded: boolean;

  isEqualToCall(call: CXCall): boolean;

  isOutgoing(): boolean;

  isOnHold(): boolean;
}

declare class CXCallDirectoryManager extends NSObject {
  static readonly sharedInstance: CXCallDirectoryManager;

  reloadExtensionWithIdentifierCompletionHandler(identifier: string, completion: (p1: NSError) => void | null): void;

  getEnabledStatusForExtensionWithIdentifierCompletionHandler(identifier: string, completion: (p1: interop.Enum<typeof CXCallDirectoryEnabledStatus>, p2: NSError) => void | null): void;

  openSettingsWithCompletionHandler(completion: (p1: NSError) => void | null): void;
}

declare class CXCallObserver extends NSObject {
  readonly calls: NSArray;

  setDelegateQueue(delegate: CXCallObserverDelegate | null, queue: NSObject | null): void;
}

declare class CXSetTranslatingCallAction extends CXCallAction implements NSSecureCoding {
  readonly isTranslating: boolean;

  readonly localLanguage: string;

  readonly remoteLanguage: string;

  initWithCallUUIDIsTranslatingLocalLanguageRemoteLanguage(uuid: NSUUID, isTranslating: boolean, localLanguage: string, remoteLanguage: string): this;

  initWithCoder(aDecoder: NSCoder): this;

  fulfillUsingTranslationEngine(translationEngine: interop.Enum<typeof CXTranslationEngine>): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;
}

declare class CXCallUpdate extends NSObject implements NSCopying {
  remoteHandle: CXHandle;

  localizedCallerName: string;

  supportsHolding: boolean;

  supportsGrouping: boolean;

  supportsUngrouping: boolean;

  supportsDTMF: boolean;

  hasVideo: boolean;

  setRemoteHandle(remoteHandle: CXHandle | null): void;

  setLocalizedCallerName(localizedCallerName: string | null): void;

  setSupportsHolding(supportsHolding: boolean): void;

  setSupportsGrouping(supportsGrouping: boolean): void;

  setSupportsUngrouping(supportsUngrouping: boolean): void;

  setSupportsDTMF(supportsDTMF: boolean): void;

  setHasVideo(hasVideo: boolean): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class CXSetGroupCallAction extends CXCallAction {
  initWithCallUUIDCallUUIDToGroupWith(callUUID: NSUUID, callUUIDToGroupWith: NSUUID | null): this;

  initWithCoder(aDecoder: NSCoder): this;

  callUUIDToGroupWith: NSUUID;

  setCallUUIDToGroupWith(callUUIDToGroupWith: NSUUID | null): void;
}

declare class CXProvider extends NSObject {
  initWithConfiguration(configuration: CXProviderConfiguration): this;

  setDelegateQueue(delegate: CXProviderDelegate | null, queue: NSObject | null): void;

  reportNewIncomingCallWithUUIDUpdateCompletion(UUID: NSUUID, update: CXCallUpdate, completion: (p1: NSError) => void | null): void;

  reportCallWithUUIDUpdated(UUID: NSUUID, update: CXCallUpdate): void;

  reportCallWithUUIDEndedAtDateReason(UUID: NSUUID, dateEnded: NSDate | null, endedReason: interop.Enum<typeof CXCallEndedReason>): void;

  reportOutgoingCallWithUUIDStartedConnectingAtDate(UUID: NSUUID, dateStartedConnecting: NSDate | null): void;

  reportOutgoingCallWithUUIDConnectedAtDate(UUID: NSUUID, dateConnected: NSDate | null): void;

  static reportNewIncomingVoIPPushPayloadCompletion(dictionaryPayload: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, completion: (p1: NSError) => void | null): void;

  configuration: CXProviderConfiguration;

  invalidate(): void;

  readonly pendingTransactions: NSArray;

  pendingCallActionsOfClassWithCallUUID(callActionClass: interop.Object, callUUID: NSUUID): NSArray;

  setConfiguration(configuration: CXProviderConfiguration): void;
}

declare class CXAction extends NSObject implements NSCopying, NSSecureCoding {
  readonly UUID: NSUUID;

  readonly complete: boolean;

  readonly timeoutDate: NSDate;

  init(): this;

  initWithCoder(aDecoder: NSCoder): this;

  fulfill(): void;

  fail(): void;

  isComplete(): boolean;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;
}

declare class CXCallDirectoryExtensionContext extends NSExtensionContext {
  delegate: CXCallDirectoryExtensionContextDelegate;

  readonly incremental: boolean;

  addBlockingEntryWithNextSequentialPhoneNumber(phoneNumber: number): void;

  removeBlockingEntryWithPhoneNumber(phoneNumber: number): void;

  removeAllBlockingEntries(): void;

  addIdentificationEntryWithNextSequentialPhoneNumberLabel(phoneNumber: number, label: string): void;

  removeIdentificationEntryWithPhoneNumber(phoneNumber: number): void;

  removeAllIdentificationEntries(): void;

  completeRequestWithCompletionHandler(completion: (p1: boolean) => void | null): void;

  setDelegate(delegate: CXCallDirectoryExtensionContextDelegate | null): void;

  isIncremental(): boolean;
}


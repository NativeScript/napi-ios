/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const WCErrorDomain: string;

declare const WCSessionActivationState: {
  NotActivated: 0,
  Inactive: 1,
  Activated: 2,
};

declare const WCErrorCode: {
  GenericError: 7001,
  SessionNotSupported: 7002,
  SessionMissingDelegate: 7003,
  SessionNotActivated: 7004,
  DeviceNotPaired: 7005,
  WatchAppNotInstalled: 7006,
  NotReachable: 7007,
  InvalidParameter: 7008,
  PayloadTooLarge: 7009,
  PayloadUnsupportedTypes: 7010,
  MessageReplyFailed: 7011,
  MessageReplyTimedOut: 7012,
  FileAccessDenied: 7013,
  DeliveryFailed: 7014,
  InsufficientSpace: 7015,
  SessionInactive: 7016,
  TransferTimedOut: 7017,
  CompanionAppNotInstalled: 7018,
  WatchOnlyApp: 7019,
};

declare interface WCSessionDelegate extends NSObjectProtocol {
  sessionActivationDidCompleteWithStateError(session: WCSession, activationState: interop.Enum<typeof WCSessionActivationState>, error: NSError | null): void;

  sessionDidBecomeInactive(session: WCSession): void;

  sessionDidDeactivate(session: WCSession): void;

  sessionWatchStateDidChange?(session: WCSession): void;

  sessionReachabilityDidChange?(session: WCSession): void;

  sessionDidReceiveMessage?(session: WCSession, message: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  sessionDidReceiveMessageReplyHandler?(session: WCSession, message: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, replyHandler: (p1: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>) => void): void;

  sessionDidReceiveMessageData?(session: WCSession, messageData: NSData): void;

  sessionDidReceiveMessageDataReplyHandler?(session: WCSession, messageData: NSData, replyHandler: (p1: NSData) => void): void;

  sessionDidReceiveApplicationContext?(session: WCSession, applicationContext: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  sessionDidFinishUserInfoTransferError?(session: WCSession, userInfoTransfer: WCSessionUserInfoTransfer, error: NSError | null): void;

  sessionDidReceiveUserInfo?(session: WCSession, userInfo: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  sessionDidFinishFileTransferError?(session: WCSession, fileTransfer: WCSessionFileTransfer, error: NSError | null): void;

  sessionDidReceiveFile?(session: WCSession, file: WCSessionFile): void;
}

declare class WCSessionDelegate extends NativeObject implements WCSessionDelegate {
}

declare class WCSessionFileTransfer extends NSObject {
  readonly file: WCSessionFile;

  readonly progress: NSProgress;

  readonly transferring: boolean;

  cancel(): void;

  isTransferring(): boolean;
}

declare class WCSessionFile extends NSObject {
  readonly fileURL: NSURL;

  readonly metadata: NSDictionary;
}

declare class WCSession extends NSObject {
  static isSupported(): boolean;

  static readonly defaultSession: WCSession;

  delegate: WCSessionDelegate;

  activateSession(): void;

  readonly activationState: interop.Enum<typeof WCSessionActivationState>;

  readonly hasContentPending: boolean;

  readonly paired: boolean;

  readonly watchAppInstalled: boolean;

  readonly complicationEnabled: boolean;

  readonly remainingComplicationUserInfoTransfers: number;

  readonly watchDirectoryURL: NSURL;

  readonly reachable: boolean;

  sendMessageReplyHandlerErrorHandler(message: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, replyHandler: (p1: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>) => void | null, errorHandler: (p1: NSError) => void | null): void;

  sendMessageDataReplyHandlerErrorHandler(data: NSData, replyHandler: (p1: NSData) => void | null, errorHandler: (p1: NSError) => void | null): void;

  readonly applicationContext: NSDictionary;

  updateApplicationContextError(applicationContext: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, error: interop.PointerConvertible): boolean;

  readonly receivedApplicationContext: NSDictionary;

  transferUserInfo(userInfo: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): WCSessionUserInfoTransfer;

  transferCurrentComplicationUserInfo(userInfo: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): WCSessionUserInfoTransfer;

  readonly outstandingUserInfoTransfers: NSArray;

  transferFileMetadata(file: NSURL, metadata: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): WCSessionFileTransfer;

  readonly outstandingFileTransfers: NSArray;

  setDelegate(delegate: WCSessionDelegate | null): void;

  isPaired(): boolean;

  isWatchAppInstalled(): boolean;

  isComplicationEnabled(): boolean;

  isReachable(): boolean;
}

declare class WCSessionUserInfoTransfer extends NSObject implements NSSecureCoding {
  readonly currentComplicationInfo: boolean;

  readonly userInfo: NSDictionary;

  readonly transferring: boolean;

  cancel(): void;

  isCurrentComplicationInfo(): boolean;

  isTransferring(): boolean;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}


/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const BADownloaderPriorityMax: number;

declare const BADownloaderPriorityDefault: number;

declare const BADownloaderPriorityMin: number;

declare const BAErrorDomain: string;

declare const BAContentRequest: {
  Install: 1,
  Update: 2,
  Periodic: 3,
};

declare const BADownloadState: {
  Failed: -1,
  Created: 0,
  Waiting: 1,
  Downloading: 2,
  Finished: 3,
};

declare const BAErrorCode: {
  DownloadInvalid: 0,
  CallFromExtensionNotAllowed: 50,
  CallFromInactiveProcessNotAllowed: 51,
  CallerConnectionNotAccepted: 55,
  CallerConnectionInvalid: 56,
  DownloadAlreadyScheduled: 100,
  DownloadNotScheduled: 101,
  DownloadFailedToStart: 102,
  DownloadAlreadyFailed: 103,
  DownloadEssentialDownloadNotPermitted: 109,
  DownloadBackgroundActivityProhibited: 111,
  DownloadWouldExceedAllowance: 112,
  DownloadDoesNotExist: 113,
  SessionDownloadDisallowedByDomain: 202,
  SessionDownloadDisallowedByAllowance: 203,
  SessionDownloadAllowanceExceeded: 204,
  SessionDownloadNotPermittedBeforeAppLaunch: 206,
};

declare interface BADownloadManagerDelegate extends NSObjectProtocol {
  downloadDidBegin?(download: BADownload): void;

  downloadDidPause?(download: BADownload): void;

  downloadDidWriteBytesTotalBytesWrittenTotalBytesExpectedToWrite?(download: BADownload, bytesWritten: number, totalBytesWritten: number, totalExpectedBytes: number): void;

  downloadDidReceiveChallengeCompletionHandler?(download: BADownload, challenge: NSURLAuthenticationChallenge, completionHandler: (p1: interop.Enum<typeof NSURLSessionAuthChallengeDisposition>, p2: NSURLCredential) => void | null): void;

  downloadFailedWithError?(download: BADownload, error: NSError): void;

  downloadFinishedWithFileURL?(download: BADownload, fileURL: NSURL): void;
}

declare class BADownloadManagerDelegate extends NativeObject implements BADownloadManagerDelegate {
}

declare interface BADownloaderExtension extends NSObjectProtocol {
  downloadsForRequestManifestURLExtensionInfo?(contentRequest: interop.Enum<typeof BAContentRequest>, manifestURL: NSURL, extensionInfo: BAAppExtensionInfo): NSSet;

  backgroundDownloadDidReceiveChallengeCompletionHandler?(download: BADownload, challenge: NSURLAuthenticationChallenge, completionHandler: (p1: interop.Enum<typeof NSURLSessionAuthChallengeDisposition>, p2: NSURLCredential) => void | null): void;

  backgroundDownloadFailedWithError?(download: BADownload, error: NSError): void;

  backgroundDownloadFinishedWithFileURL?(download: BADownload, fileURL: NSURL): void;

  extensionWillTerminate?(): void;
}

declare class BADownloaderExtension extends NativeObject implements BADownloaderExtension {
}

declare class BAURLDownload extends BADownload implements NSCopying {
  initWithIdentifierRequestFileSizeApplicationGroupIdentifier(identifier: string, request: NSURLRequest, fileSize: number, applicationGroupIdentifier: string): this;

  initWithIdentifierRequestEssentialFileSizeApplicationGroupIdentifierPriority(identifier: string, request: NSURLRequest, essential: boolean, fileSize: number, applicationGroupIdentifier: string, priority: number): this;

  initWithIdentifierRequestApplicationGroupIdentifier(identifier: string, request: NSURLRequest, applicationGroupIdentifier: string): this;

  initWithIdentifierRequestApplicationGroupIdentifierPriority(identifier: string, request: NSURLRequest, applicationGroupIdentifier: string, priority: number): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class BAAppExtensionInfo extends NSObject implements NSSecureCoding {
  readonly restrictedDownloadSizeRemaining: NSNumber;

  readonly restrictedEssentialDownloadSizeRemaining: NSNumber;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class BADownloadManager extends NSObject {
  static readonly sharedManager: BADownloadManager;

  delegate: BADownloadManagerDelegate;

  fetchCurrentDownloads(error: interop.PointerConvertible): NSArray;

  fetchCurrentDownloadsWithCompletionHandler(completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): void;

  scheduleDownloadError(download: BADownload, error: interop.PointerConvertible): boolean;

  performWithExclusiveControl(performHandler: (p1: boolean, p2: NSError) => void | null): void;

  performWithExclusiveControlBeforeDatePerformHandler(date: NSDate, performHandler: (p1: boolean, p2: NSError) => void | null): void;

  startForegroundDownloadError(download: BADownload, error: interop.PointerConvertible): boolean;

  cancelDownloadError(download: BADownload, error: interop.PointerConvertible): boolean;

  setDelegate(delegate: BADownloadManagerDelegate): void;
}

declare class BADownload extends NSObject implements NSCoding, NSSecureCoding, NSCopying {
  readonly state: interop.Enum<typeof BADownloadState>;

  readonly identifier: string;

  readonly uniqueIdentifier: string;

  readonly priority: number;

  readonly isEssential: boolean;

  copyAsNonEssential(): this;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  static readonly supportsSecureCoding: boolean;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}


/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const BAAssetPackIdentifierErrorKey: string;

declare const BAManagedErrorDomain: string;

declare const BAErrorDomain: string;

declare const BADownloaderPriorityMax: number;

declare const BADownloaderPriorityMin: number;

declare const BADownloaderPriorityDefault: number;

declare const BADownloadState: {
  Failed: -1,
  Created: 0,
  Waiting: 1,
  Downloading: 2,
  Finished: 3,
};

declare const BAManagedErrorCode: {
  AssetPack: 0,
  File: 1,
};

declare const BAAssetPackStatus: {
  DownloadAvailable: 1,
  UpdateAvailable: 2,
  UpToDate: 4,
  OutOfDate: 8,
  Obsolete: 16,
  Downloading: 32,
  Downloaded: 64,
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

declare const BAContentRequest: {
  Install: 1,
  Update: 2,
  Periodic: 3,
};

declare interface BAManagedAssetPackDownloadDelegate extends NSObjectProtocol {
  downloadOfAssetPackBegan?(assetPack: BAAssetPack): void;

  downloadOfAssetPackPaused?(assetPack: BAAssetPack): void;

  downloadOfAssetPackHasProgress?(assetPack: BAAssetPack, progress: NSProgress): void;

  downloadOfAssetPackFinished?(assetPack: BAAssetPack): void;

  downloadOfAssetPackFailedWithError?(assetPack: BAAssetPack, error: NSError): void;
}

declare class BAManagedAssetPackDownloadDelegate extends NativeObject implements BAManagedAssetPackDownloadDelegate {
}

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

declare interface BAManagedDownloaderExtension extends BADownloaderExtension {
  shouldDownloadAssetPack?(assetPack: BAAssetPack): boolean;
}

declare class BAManagedDownloaderExtension extends NativeObject implements BAManagedDownloaderExtension {
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

declare class BAAppExtensionInfo extends NSObject implements NSSecureCoding {
  readonly restrictedDownloadSizeRemaining: NSNumber;

  readonly restrictedEssentialDownloadSizeRemaining: NSNumber;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class BAAssetPackManager extends NSObject {
  static readonly sharedManager: BAAssetPackManager;

  delegate: BAManagedAssetPackDownloadDelegate;

  getAllAssetPacksWithCompletionHandler(completionHandler: (p1: NSSet, p2: NSError) => void | null): void;

  getAssetPackWithIdentifierCompletionHandler(assetPackIdentifier: string, completionHandler: (p1: BAAssetPack, p2: NSError) => void | null): void;

  getStatusOfAssetPackWithIdentifierCompletionHandler(assetPackIdentifier: string, completionHandler: (p1: interop.Enum<typeof BAAssetPackStatus>, p2: NSError) => void | null): void;

  ensureLocalAvailabilityOfAssetPackCompletionHandler(assetPack: BAAssetPack, completionHandler: (p1: NSError) => void | null): void;

  checkForUpdatesWithCompletionHandler(completionHandler: (p1: NSSet, p2: NSSet, p3: NSError) => void | null): void;

  contentsAtPathSearchingInAssetPackWithIdentifierOptionsError(path: string, assetPackIdentifier: string | null, options: interop.Enum<typeof NSDataReadingOptions>, error: interop.PointerConvertible): NSData;

  fileDescriptorForPathSearchingInAssetPackWithIdentifierError(path: string, assetPackIdentifier: string | null, error: interop.PointerConvertible): number;

  URLForPathError(path: string, error: interop.PointerConvertible): NSURL;

  removeAssetPackWithIdentifierCompletionHandler(assetPackIdentifier: string, completionHandler: (p1: NSError) => void | null): void;

  setDelegate(delegate: BAManagedAssetPackDownloadDelegate | null): void;
}

declare class BAAssetPack extends NSObject {
  readonly identifier: string;

  readonly downloadSize: number;

  readonly version: number;

  readonly userInfo: NSData;

  download(): BADownload;

  downloadForContentRequest(contentRequest: interop.Enum<typeof BAContentRequest>): BADownload;
}

declare class BAURLDownload extends BADownload implements NSCopying {
  initWithIdentifierRequestFileSizeApplicationGroupIdentifier(identifier: string, request: NSURLRequest, fileSize: number, applicationGroupIdentifier: string): this;

  initWithIdentifierRequestEssentialFileSizeApplicationGroupIdentifierPriority(identifier: string, request: NSURLRequest, essential: boolean, fileSize: number, applicationGroupIdentifier: string, priority: number): this;

  initWithIdentifierRequestApplicationGroupIdentifier(identifier: string, request: NSURLRequest, applicationGroupIdentifier: string): this;

  initWithIdentifierRequestApplicationGroupIdentifierPriority(identifier: string, request: NSURLRequest, applicationGroupIdentifier: string, priority: number): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
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

declare class BAAssetPackManifest extends NSObject {
  readonly assetPacks: NSSet;

  initWithContentsOfURLApplicationGroupIdentifierError(URL: NSURL, applicationGroupIdentifier: string, error: interop.PointerConvertible): this;

  initFromDataApplicationGroupIdentifierError(data: NSData, applicationGroupIdentifier: string, error: interop.PointerConvertible): this;

  allDownloads(): NSSet;

  allDownloadsForContentRequest(contentRequest: interop.Enum<typeof BAContentRequest>): NSSet;
}


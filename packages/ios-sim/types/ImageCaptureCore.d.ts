/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const ICAuthorizationStatusRestricted: string;

declare const ICAuthorizationStatusNotDetermined: string;

declare const ICDeleteErrorFileMissing: string;

declare const ICDeleteErrorReadOnly: string;

declare const ICDeleteCanceled: string;

declare const ICDeleteSuccessful: string;

declare const ICCameraDeviceSupportsHEIF: string;

declare const ICCameraDeviceCanAcceptPTPCommands: string;

declare const ICCameraDeviceCanReceiveFile: string;

declare const ICCameraDeviceCanSyncClock: string;

declare const ICCameraDeviceCanDeleteAllFiles: string;

declare const ICCameraDeviceCanDeleteOneFile: string;

declare const ICCameraDeviceCanTakePictureUsingShutterReleaseOnCamera: string;

declare const ICCameraDeviceCanTakePicture: string;

declare const ICDownloadSidecarFiles: string;

declare const ICDeleteAfterSuccessfulDownload: string;

declare const ICSavedAncillaryFiles: string;

declare const ICSaveAsFilename: string;

declare const ICImageSourceShouldCache: string;

declare const ICImageSourceThumbnailMaxPixelSize: string;

declare const ICErrorDomain: string;

declare const ICDeviceLocationDescriptionMassStorage: string;

declare const ICDeviceLocationDescriptionFireWire: string;

declare const ICEnumerationChronologicalOrder: string;

declare const ICTransportTypeProximity: string;

declare const ICTransportTypeTCPIP: string;

declare const ICTransportTypeExFAT: string;

declare const ICTransportTypeMassStorage: string;

declare const ICDeviceCanEjectOrDisconnect: string;

declare const ICSavedFilename: string;

declare const ICTruncateAfterSuccessfulDownload: string;

declare const ICAuthorizationStatusAuthorized: string;

declare const ICOverwrite: string;

declare const ICDeviceLocationDescriptionBluetooth: string;

declare const ICStatusNotificationKey: string;

declare const ICDeleteErrorDeviceMissing: string;

declare const ICDownloadsDirectoryURL: string;

declare const ICDeleteFailed: string;

declare const ICTransportTypeUSB: string;

declare const ICDeleteErrorCanceled: string;

declare const ICDeviceLocationDescriptionUSB: string;

declare const ICAuthorizationStatusDenied: string;

declare const ICReturnObjectErrorCode: {
  DoesNotExist: -21450,
  DataOffsetInvalid: -21449,
  CouldNotBeRead: -21448,
  DataEmpty: -21447,
  DataRequestTooLarge: -21446,
};

declare const ICLegacyReturnCode: {
  CommunicationErr: -9900,
  DeviceNotFoundErr: -9901,
  DeviceNotOpenErr: -9902,
  FileCorruptedErr: -9903,
  IOPendingErr: -9904,
  InvalidObjectErr: -9905,
  InvalidPropertyErr: -9906,
  IndexOutOfRangeErr: -9907,
  PropertyTypeNotFoundErr: -9908,
  CannotYieldDevice: -9909,
  DataTypeNotFoundErr: -9910,
  DeviceMemoryAllocationErr: -9911,
  DeviceInternalErr: -9912,
  DeviceInvalidParamErr: -9913,
  DeviceAlreadyOpenErr: -9914,
  DeviceLocationIDNotFoundErr: -9915,
  DeviceGUIDNotFoundErr: -9916,
  DeviceIOServicePathNotFoundErr: -9917,
  DeviceUnsupportedErr: -9918,
  FrameworkInternalErr: -9919,
  ExtensionInternalErr: -9920,
  InvalidSessionErr: -9921,
};

declare const ICReturnDownloadErrorCode: {
  PathInvalid: -21100,
  FileWritable: -21099,
};

declare const ICReturnConnectionErrorCode: {
  DriverExited: -21350,
  ClosedSessionSuddenly: -21349,
  EjectedSuddenly: -21348,
  SessionAlreadyOpen: -21347,
  EjectFailed: -21346,
  FailedToOpen: -21345,
  FailedToOpenDevice: -21344,
  NotAuthorizedToOpenDevice: -21343,
};

declare const ICReturnCodeOffset: {
  ThumbnailOffset: -21000,
  MetadataOffset: -21050,
  DownloadOffset: -21100,
  DeleteOffset: -21150,
  ExFATOffset: -21200,
  PTPOffset: -21250,
  SystemOffset: -21300,
  DeviceOffset: -21350,
  DeviceConnection: -21400,
  ObjectOffset: -21450,
};

declare const ICEXIFOrientationType: {
  Orientation1: 1,
  Orientation2: 2,
  Orientation3: 3,
  Orientation4: 4,
  Orientation5: 5,
  Orientation6: 6,
  Orientation7: 7,
  Orientation8: 8,
};

declare const ICDeviceLocationType: {
  Local: 256,
  Shared: 512,
  Bonjour: 1024,
  Bluetooth: 2048,
};

declare const ICMediaPresentation: {
  Converted: 1,
  Original: 2,
};

declare const ICReturnMetadataErrorCode: {
  NotAvailable: -20150,
  AlreadyFetching: -20149,
  Canceled: -20148,
  Invalid: -20147,
};

declare const ICDeviceTypeMask: {
  Camera: 1,
  Scanner: 2,
};

declare const ICReturnCode: {
  Success: 0,
  InvalidParam: -9922,
  CommunicationTimedOut: -9923,
  ScanOperationCanceled: -9924,
  ScannerInUseByLocalUser: -9925,
  ScannerInUseByRemoteUser: -9926,
  DeviceFailedToOpenSession: -9927,
  DeviceFailedToCloseSession: -9928,
  ScannerFailedToSelectFunctionalUnit: -9929,
  ScannerFailedToCompleteOverviewScan: -9930,
  ScannerFailedToCompleteScan: -9931,
  ReceivedUnsolicitedScannerStatusInfo: -9932,
  ReceivedUnsolicitedScannerErrorInfo: -9933,
  DownloadFailed: -9934,
  UploadFailed: -9935,
  FailedToCompletePassThroughCommand: -9936,
  DownloadCanceled: -9937,
  FailedToEnabeTethering: -9938,
  FailedToDisabeTethering: -9939,
  FailedToCompleteSendMessageRequest: -9940,
  DeleteFilesFailed: -9941,
  DeleteFilesCanceled: -9942,
  DeviceIsPasscodeLocked: -9943,
  DeviceFailedToTakePicture: -9944,
  DeviceSoftwareNotInstalled: -9945,
  DeviceSoftwareIsBeingInstalled: -9946,
  DeviceSoftwareInstallationCompleted: -9947,
  DeviceSoftwareInstallationCanceled: -9948,
  DeviceSoftwareInstallationFailed: -9949,
  DeviceSoftwareNotAvailable: -9950,
  DeviceCouldNotPair: -9951,
  DeviceCouldNotUnpair: -9952,
  DeviceNeedsCredentials: -9953,
  DeviceIsBusyEnumerating: -9954,
  DeviceCommandGeneralFailure: -9955,
  DeviceFailedToCompleteTransfer: -9956,
  DeviceFailedToSendData: -9957,
  SessionNotOpened: -9958,
  ExFATVolumeInvalid: 21200,
  MultiErrorDictionary: -30000,
};

declare const ICDeviceLocationTypeMask: {
  Local: 256,
  Shared: 512,
  Bonjour: 1024,
  Bluetooth: 2048,
  Remote: 65024,
};

declare const ICDeviceType: {
  Camera: 1,
  Scanner: 2,
};

declare const ICReturnPTPDeviceErrorCode: {
  Failed: -21250,
  NotAuthorized: -21249,
};

declare const ICReturnThumbnailErrorCode: {
  NotAvailable: -21000,
  AlreadyFetching: -20999,
  Canceled: -20098,
  Invalid: -20097,
};

declare interface ICCameraDeviceDownloadDelegate extends NSObjectProtocol {
  didDownloadFileErrorOptionsContextInfo?(file: ICCameraFile, error: NSError | null, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, contextInfo: interop.PointerConvertible): void;

  didReceiveDownloadProgressForFileDownloadedBytesMaxBytes?(file: ICCameraFile, downloadedBytes: number, maxBytes: number): void;
}

declare class ICCameraDeviceDownloadDelegate extends NativeObject implements ICCameraDeviceDownloadDelegate {
}

declare interface ICCameraDeviceDelegate extends ICDeviceDelegate {
  cameraDeviceDidAddItems(camera: ICCameraDevice, items: NSArray<interop.Object> | Array<interop.Object>): void;

  cameraDeviceDidRemoveItems(camera: ICCameraDevice, items: NSArray<interop.Object> | Array<interop.Object>): void;

  cameraDeviceDidReceiveThumbnailForItemError(camera: ICCameraDevice, thumbnail: interop.Object | null, item: ICCameraItem, error: NSError | null): void;

  cameraDeviceDidReceiveMetadataForItemError(camera: ICCameraDevice, metadata: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, item: ICCameraItem, error: NSError | null): void;

  cameraDeviceDidRenameItems(camera: ICCameraDevice, items: NSArray<interop.Object> | Array<interop.Object>): void;

  cameraDeviceDidChangeCapability(camera: ICCameraDevice): void;

  cameraDeviceDidReceivePTPEvent(camera: ICCameraDevice, eventData: NSData): void;

  deviceDidBecomeReadyWithCompleteContentCatalog(device: ICCameraDevice): void;

  cameraDeviceDidRemoveAccessRestriction(device: ICDevice): void;

  cameraDeviceDidEnableAccessRestriction(device: ICDevice): void;

  cameraDeviceShouldGetThumbnailOfItem?(cameraDevice: ICCameraDevice, item: ICCameraItem): boolean;

  cameraDeviceShouldGetMetadataOfItem?(cameraDevice: ICCameraDevice, item: ICCameraItem): boolean;

  cameraDeviceDidCompleteDeleteFilesWithError?(camera: ICCameraDevice, error: NSError | null): void;

  cameraDeviceDidAddItem?(camera: ICCameraDevice, item: ICCameraItem): void;

  cameraDeviceDidRemoveItem?(camera: ICCameraDevice, item: ICCameraItem): void;

  cameraDeviceDidReceiveThumbnailForItem?(camera: ICCameraDevice, item: ICCameraItem): void;

  cameraDeviceDidReceiveMetadataForItem?(camera: ICCameraDevice, item: ICCameraItem): void;
}

declare class ICCameraDeviceDelegate extends NativeObject implements ICCameraDeviceDelegate {
}

declare interface ICDeviceDelegate extends NSObjectProtocol {
  deviceDidCloseSessionWithError(device: ICDevice, error: NSError | null): void;

  didRemoveDevice(device: ICDevice): void;

  deviceDidOpenSessionWithError(device: ICDevice, error: NSError | null): void;

  deviceDidBecomeReady?(device: ICDevice): void;

  deviceDidReceiveStatusInformation?(device: ICDevice, status: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  deviceDidEncounterError?(device: ICDevice, error: NSError | null): void;

  deviceDidEjectWithError?(device: ICDevice, error: NSError | null): void;
}

declare class ICDeviceDelegate extends NativeObject implements ICDeviceDelegate {
}

declare interface ICDeviceBrowserDelegate extends NSObjectProtocol {
  deviceBrowserDidAddDeviceMoreComing(browser: ICDeviceBrowser, device: ICDevice, moreComing: boolean): void;

  deviceBrowserDidRemoveDeviceMoreGoing(browser: ICDeviceBrowser, device: ICDevice, moreGoing: boolean): void;

  deviceBrowserDeviceDidChangeName?(browser: ICDeviceBrowser, device: ICDevice): void;

  deviceBrowserDeviceDidChangeSharingState?(browser: ICDeviceBrowser, device: ICDevice): void;

  deviceBrowserWillSuspendOperations?(browser: ICDeviceBrowser): void;

  deviceBrowserDidSuspendOperations?(browser: ICDeviceBrowser): void;

  deviceBrowserDidCancelSuspendOperations?(browser: ICDeviceBrowser): void;

  deviceBrowserDidResumeOperations?(browser: ICDeviceBrowser): void;
}

declare class ICDeviceBrowserDelegate extends NativeObject implements ICDeviceBrowserDelegate {
}

declare class ICCameraDevice extends ICDevice {
  readonly contentCatalogPercentCompleted: number;

  readonly contents: NSArray;

  readonly mediaFiles: NSArray;

  readonly ejectable: boolean;

  readonly locked: boolean;

  readonly accessRestrictedAppleDevice: boolean;

  readonly iCloudPhotosEnabled: boolean;

  mediaPresentation: interop.Enum<typeof ICMediaPresentation>;

  filesOfType(fileUTType: string): NSArray;

  requestReadDataFromFileAtOffsetLengthReadDelegateDidReadDataSelectorContextInfo(file: ICCameraFile, offset: number, length: number, readDelegate: interop.Object, selector: string, contextInfo: interop.PointerConvertible): void;

  requestDownloadFileOptionsDownloadDelegateDidDownloadSelectorContextInfo(file: ICCameraFile, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, downloadDelegate: ICCameraDeviceDownloadDelegate, selector: string, contextInfo: interop.PointerConvertible): void;

  requestDeleteFiles(files: NSArray<interop.Object> | Array<interop.Object>): void;

  requestDeleteFilesDeleteFailedCompletion(files: NSArray<interop.Object> | Array<interop.Object>, deleteFailed: (p1: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>) => void, completion: (p1: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, p2: NSError) => void | null): NSProgress;

  readonly timeOffset: number;

  readonly batteryLevelAvailable: boolean;

  readonly batteryLevel: number;

  readonly tetheredCaptureEnabled: boolean;

  ptpEventHandler: (p1: NSData) => void;

  requestSendPTPCommandOutDataSendCommandDelegateDidSendCommandSelectorContextInfo(command: NSData, data: NSData | null, sendCommandDelegate: interop.Object, selector: string, contextInfo: interop.PointerConvertible): void;

  requestSendPTPCommandOutDataCompletion(ptpCommand: NSData, ptpData: NSData | null, completion: (p1: NSData, p2: NSData, p3: NSError) => void | null): void;

  isEjectable(): boolean;

  isLocked(): boolean;

  isAccessRestrictedAppleDevice(): boolean;

  setMediaPresentation(mediaPresentation: interop.Enum<typeof ICMediaPresentation>): void;

  setPtpEventHandler(ptpEventHandler: (p1: NSData) => void): void;
}

declare class ICCameraFile extends ICCameraItem {
  readonly width: number;

  readonly height: number;

  readonly originalFilename: string;

  readonly createdFilename: string;

  readonly fileSize: number;

  orientation: interop.Enum<typeof ICEXIFOrientationType>;

  readonly duration: number;

  readonly highFramerate: boolean;

  readonly timeLapse: boolean;

  readonly firstPicked: boolean;

  readonly originatingAssetID: string;

  readonly groupUUID: string;

  readonly gpsString: string;

  readonly relatedUUID: string;

  readonly burstUUID: string;

  readonly burstFavorite: boolean;

  readonly burstPicked: boolean;

  readonly sidecarFiles: NSArray;

  readonly pairedRawImage: ICCameraFile;

  readonly fileCreationDate: NSDate;

  readonly fileModificationDate: NSDate;

  readonly exifCreationDate: NSDate;

  readonly exifModificationDate: NSDate;

  readonly fingerprint: string;

  static fingerprintForFileAtURL(url: NSURL): string | null;

  requestThumbnailDataWithOptionsCompletion(options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, completion: (p1: NSData, p2: NSError) => void | null): void;

  requestMetadataDictionaryWithOptionsCompletion(options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, completion: (p1: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, p2: NSError) => void | null): void;

  requestDownloadWithOptionsCompletion(options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, completion: (p1: string, p2: NSError) => void | null): NSProgress | null;

  requestReadDataAtOffsetLengthCompletion(offset: number, length: number, completion: (p1: NSData, p2: NSError) => void | null): void;

  requestSecurityScopedURLWithCompletion(completion: (p1: NSURL, p2: NSError) => void | null): void;

  requestFingerprintWithCompletion(completion: (p1: string, p2: NSError) => void | null): void;

  setOrientation(orientation: interop.Enum<typeof ICEXIFOrientationType>): void;
}

declare class ICCameraItem extends NSObject {
  readonly device: ICCameraDevice;

  readonly parentFolder: ICCameraFolder;

  readonly name: string;

  readonly UTI: string;

  readonly locked: boolean;

  readonly raw: boolean;

  readonly inTemporaryStore: boolean;

  readonly creationDate: NSDate;

  readonly modificationDate: NSDate;

  readonly thumbnail: interop.Object;

  readonly metadata: NSDictionary;

  readonly userData: NSMutableDictionary;

  readonly ptpObjectHandle: number;

  readonly addedAfterContentCatalogCompleted: boolean;

  requestThumbnail(): void;

  requestMetadata(): void;

  flushThumbnailCache(): void;

  flushMetadataCache(): void;

  readonly thumbnailIfAvailable: interop.Object;

  readonly largeThumbnailIfAvailable: interop.Object;

  readonly metadataIfAvailable: NSDictionary;

  isLocked(): boolean;

  isRaw(): boolean;

  isInTemporaryStore(): boolean;

  wasAddedAfterContentCatalogCompleted(): boolean;
}

declare class ICDevice extends NSObject {
  delegate: ICDeviceDelegate;

  readonly type: interop.Enum<typeof ICDeviceType>;

  readonly capabilities: NSArray;

  readonly name: string;

  readonly productKind: string;

  readonly icon: interop.Object;

  readonly systemSymbolName: string;

  readonly transportType: string;

  readonly UUIDString: string;

  readonly hasOpenSession: boolean;

  readonly userData: NSMutableDictionary;

  readonly usbLocationID: number;

  readonly usbProductID: number;

  readonly usbVendorID: number;

  requestOpenSession(): void;

  requestCloseSession(): void;

  requestEject(): void;

  requestOpenSessionWithOptionsCompletion(options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, completion: (p1: NSError) => void | null): void;

  requestCloseSessionWithOptionsCompletion(options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, completion: (p1: NSError) => void | null): void;

  requestEjectWithCompletion(completion: (p1: NSError) => void | null): void;

  setDelegate(delegate: ICDeviceDelegate | null): void;
}

declare class ICCameraFolder extends ICCameraItem {
  readonly contents: NSArray;
}

declare class ICDeviceBrowser extends NSObject {
  delegate: ICDeviceBrowserDelegate;

  readonly browsing: boolean;

  readonly suspended: boolean;

  browsedDeviceTypeMask: interop.Enum<typeof ICDeviceTypeMask>;

  readonly devices: NSArray;

  init(): this;

  start(): void;

  stop(): void;

  readonly contentsAuthorizationStatus: string;

  requestContentsAuthorizationWithCompletion(completion: (p1: string) => void): void;

  readonly controlAuthorizationStatus: string;

  requestControlAuthorizationWithCompletion(completion: (p1: string) => void): void;

  resetContentsAuthorizationWithCompletion(completion: (p1: string) => void): void;

  resetControlAuthorizationWithCompletion(completion: (p1: string) => void): void;

  setDelegate(delegate: ICDeviceBrowserDelegate | null): void;

  isBrowsing(): boolean;

  isSuspended(): boolean;

  setBrowsedDeviceTypeMask(browsedDeviceTypeMask: interop.Enum<typeof ICDeviceTypeMask>): void;
}


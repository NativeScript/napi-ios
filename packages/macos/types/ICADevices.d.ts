/// <reference types="@nativescript/objc-node-api" />

declare const kICUTTypeRaw: interop.Pointer;

declare const kICS_ThumbnailDataFormatTIFF: number;

declare const kICS_ThumbnailDataFormatJPEG: number;

declare const kICS_MetaData: number;

declare const addedAfterCCCMask: number;

declare const largeFileSizeMask: number;

declare const fileInTempCacheMask: number;

declare const fileLockedMask: number;

declare const hasThumbnailMask: number;

declare const kICD_FileData: number;

declare const kRotateImage: number;

declare const kCreateCustomIcon: number;

declare const kICAMessageDeviceYield: number;

declare const kICAMessageGetEventData: number;

declare const kICAMessageGetLastButtonPressed: number;

declare const kICAMessageCameraReadClock: number;

declare const kICAMessageCheckDevice: number;

declare const kICAMessageConnect: number;

declare const kICAThumbnailFormatPNG: number;

declare const kICADevicePropArtist: interop.Pointer;

declare const kICADevicePropTimelapseInterval: interop.Pointer;

declare const kICADevicePropBurstInterval: interop.Pointer;

declare const kICADevicePropBurstNumber: interop.Pointer;

declare const kICADevicePropStillCaptureMode: interop.Pointer;

declare const kICADevicePropExposureBiasCompensation: interop.Pointer;

declare const kICADevicePropExposureProgramMode: interop.Pointer;

declare const kICADevicePropFocusMode: interop.Pointer;

declare const kICADevicePropFocusDistance: interop.Pointer;

declare const kICADevicePropFNumber: interop.Pointer;

declare const kICADevicePropImageSize: interop.Pointer;

declare const kICANotificationClassPTPVendor: interop.Pointer;

declare const kICANotificationSubTypeWarmUpDone: interop.Pointer;

declare const kICANotificationSubTypeWarmUpStarted: interop.Pointer;

declare const kICANotificationPercentDownloadedKey: interop.Pointer;

declare const kICANotificationNumerOfImagesRemainingKey: interop.Pointer;

declare const kICANotificationDataIsBigEndianKey: interop.Pointer;

declare const kICANotificationImageDataKey: interop.Pointer;

declare const kICANotificationDataKey: interop.Pointer;

declare const kICANotificationICAObjectKey: interop.Pointer;

declare const kICANotificationTypeScannerPageDone: interop.Pointer;

declare const kICANotificationTypeScannerSessionClosed: interop.Pointer;

declare const kICANotificationTypeDownloadProgressStatus: interop.Pointer;

declare const kICANotificationTypeDeviceStatusError: interop.Pointer;

declare const kICANotificationTypeDeviceStatusInfo: interop.Pointer;

declare const kICANotificationTypeDeviceWasReset: interop.Pointer;

declare const kICANotificationTypeDeviceInfoChanged: interop.Pointer;

declare const kICANotificationTypeDeviceRemoved: interop.Pointer;

declare const kICANotificationTypeStoreFull: interop.Pointer;

declare const kICANotificationTypeStoreRemoved: interop.Pointer;

declare const kICANotificationTypeStoreAdded: interop.Pointer;

declare const kICANotificationTypeObjectInfoChanged: interop.Pointer;

declare const kICANotificationTypeObjectRemoved: interop.Pointer;

declare const kICANotificationTypeObjectAdded: interop.Pointer;

declare const kICAAllowMultipleImages: number;

declare const kICATWAINDSPathKey: interop.Pointer;

declare const kICAIPGUIDKey: interop.Pointer;

declare const kICAIPPortKey: interop.Pointer;

declare const kICAIPAddressKey: interop.Pointer;

declare const kICABluetoothAddressKey: interop.Pointer;

declare const kICADeviceIconPathKey: interop.Pointer;

declare const kICADeviceModulePathKey: interop.Pointer;

declare const kICATWAINTransportType: interop.Pointer;

declare const kICASCSITransportType: interop.Pointer;

declare const kICAFireWireTransportType: interop.Pointer;

declare const kICADeviceTypeScanner: interop.Pointer;

declare const kICAMediaDurationInSecondsKey: interop.Pointer;

declare const kMetaDataDictionaryKey: interop.Pointer;

declare const kICACreationDateStringKey: interop.Pointer;

declare const kICARawKey: interop.Pointer;

declare const kICAThumbnailSizeKey: interop.Pointer;

declare const kICAThumbnailPropertyKey: interop.Pointer;

declare const kICADataTypeKey: interop.Pointer;

declare const kICADataPropertyKey: interop.Pointer;

declare const kICALockStatusKey: interop.Pointer;

declare const kICADeviceCapabilitiesKey: interop.Pointer;

declare const kICADeviceTypeKey: interop.Pointer;

declare const kICAUSBVendorIDKey: interop.Pointer;

declare const kICAObjectNameKey: interop.Pointer;

declare const kICADevicesArrayKey: interop.Pointer;

declare const kICACameraPassThruReceive: number;

declare const kICACameraPassThruSend: number;

declare const kICAButtonWeb: number;

declare const kICATypeThumbnail: number;

declare const kICATypeData: number;

declare const kICATypeBoolean: number;

declare const kICATypeFloat: number;

declare const kICATypeSInt32: number;

declare const kICATypeUInt32: number;

declare const kICATypeUInt16: number;

declare const kICAPropertyImageData: number;

declare const kICAPropertyImageSize: number;

declare const kICAPropertyImageFilename: number;

declare const kICAPropertyColorSpace: number;

declare const kICAPropertyImageFlash: number;

declare const kICAPropertyImageAperture: number;

declare const kICAPropertyImageShutterSpeed: number;

declare const kICAPropertyImageDateDigitized: number;

declare const kICAPropertyImageExposureTime: number;

declare const kICAPropertyImageHeight: number;

declare const kICAPropertyImageWidth: number;

declare const kICAFileOther: number;

declare const kICAFileFirmware: number;

declare const kICAFileMovie: number;

declare const kICADirectory: number;

declare const kICAList: number;

declare const kICADeviceOther: number;

declare const kICADevicePDA: number;

declare const kICADeviceMFP: number;

declare const kICADevice: number;

declare const kICASecureSessionRequired: number;

declare const kICAInvalidSessionErr: number;

declare const kICADeviceUnsupportedErr: number;

declare const kICADeviceIOServicePathNotFoundErr: number;

declare const kICADeviceLocationIDNotFoundErr: number;

declare const kICADeviceAlreadyOpenErr: number;

declare const kICADeviceInvalidParamErr: number;

declare const kICADeviceInternalErr: number;

declare const kICADeviceMemoryAllocationErr: number;

declare const kICAInvalidObjectErr: number;

declare const kICAIOPendingErr: number;

declare const kICAFileCorruptedErr: number;

declare const kICAPBVersion: number;

declare const kICADeviceSharedKey: interop.Pointer;

declare const kICANotificationTypeUnreportedStatus: interop.Pointer;

declare const kICAFrameworkInternalErr: number;

declare const kICADevicePropExposureTime: interop.Pointer;

declare const kICAInvalidPropertyErr: number;

declare const kICADevicePropBatteryLevel: interop.Pointer;

declare const kICADownloadAndReturnPathArray: number;

declare const kICAFileImage: number;

declare const kICAButtonEMail: number;

declare const kICABonjourServiceTypeKey: interop.Pointer;

declare const kICAFlagReadWriteAccess: number;

declare const kICADevicePropTimelapseNumber: interop.Pointer;

declare const kICADevicePropRGBGain: interop.Pointer;

declare const kICAUSBProductIDKey: interop.Pointer;

declare const kICAExtensionInternalErr: number;

declare const kICACommunicationErr: number;

declare const kICABonjourServiceNameKey: interop.Pointer;

declare const kICAMediaHeightKey: interop.Pointer;

declare const rawImageFormatMask: number;

declare const kICARemoteDeviceKey: interop.Pointer;

declare const kICADevicePropCaptureDelay: interop.Pointer;

declare const kICATransportTypeKey: interop.Pointer;

declare const kICAPropertyImageDPI: number;

declare const kICANotificationClassKey: interop.Pointer;

declare const kICADevicePropUndefined: interop.Pointer;

declare const kAdjustCreationDate: number;

declare const kICAExecutableArchitectureKey: interop.Pointer;

declare const kICANotificationDeviceListICAObjectKey: interop.Pointer;

declare const kICANotificationImageBytesPerRowKey: interop.Pointer;

declare const kICADevicePropDigitalZoom: interop.Pointer;

declare const kICABonjourTXTRecordKey: interop.Pointer;

declare const kICAMessageDisconnect: number;

declare const kICADeviceCamera: number;

declare const kICAMediaWidthKey: interop.Pointer;

declare const kICADevicePropContrast: interop.Pointer;

declare const kICATypeFixed: number;

declare const kICATypeUInt64: number;

declare const kICANotificationTypeStoreInfoChanged: interop.Pointer;

declare const kICAMessageReset: number;

declare const kICANotificationTypeScannerOverviewOverlayAvailable: interop.Pointer;

declare const kICANotificationSubTypePerformOverviewScan: interop.Pointer;

declare const kICADevicePropCopyrightInfo: interop.Pointer;

declare const kICANotificationImageWidthKey: interop.Pointer;

declare const kAddMetaDataToFinderComment: number;

declare const gICDCallbackFunctions: ICD_callback_functions;

declare const kICANotificationDataSizeKey: interop.Pointer;

declare const kICATypeUInt8: number;

declare const kICAMessageCameraPassThrough: number;

declare const kICADevicePropFlashMode: interop.Pointer;

declare const kICAPropertyTypeNotFoundErr: number;

declare const kICD_MetaData: number;

declare const kICAFireWireGUIDKey: interop.Pointer;

declare const kICAMessageScannerOverviewSelectionChanged: number;

declare const kICAPropertyImageDateOriginal: number;

declare const kICADevicePhone: number;

declare const kICAButtonCopy: number;

declare const kICAPropertyImageThumbnail: number;

declare const kICAIOServicePathKey: interop.Pointer;

declare const kICADataSizeKey: interop.Pointer;

declare const kICATypeSInt16: number;

declare const kICADevicePropFocalLength: interop.Pointer;

declare const kICANotificationScannerButtonTypeKey: interop.Pointer;

declare const kICAUserAssignedDeviceNameKey: interop.Pointer;

declare const kICADevicePropCompressionSetting: interop.Pointer;

declare const kICAUSBTransportType: interop.Pointer;

declare const kICAUSBLocationIDKey: interop.Pointer;

declare const kICADevicePropDateTime: interop.Pointer;

declare const kICANotificationTypeTransactionCanceled: interop.Pointer;

declare const kICANotificationSubTypeDocumentLoaded: interop.Pointer;

declare const kICATypeSInt64: number;

declare const kICADevicePropWhiteBalance: interop.Pointer;

declare const kICADataTypeNotFoundErr: number;

declare const kICANotificationTypeScannerButtonPressed: interop.Pointer;

declare const kICANotificationDeviceICAObjectKey: interop.Pointer;

declare const kICANotificationImageNumberOfRowsKey: interop.Pointer;

declare const kICANotificationTypeCaptureComplete: interop.Pointer;

declare const kICADevicePropFunctionalMode: interop.Pointer;

declare const kICAFileAudio: number;

declare const kICANotificationClassPTPStandard: interop.Pointer;

declare const kICADeviceUsedKey: interop.Pointer;

declare const kICANotificationDataCookieKey: interop.Pointer;

declare const kICADeviceGUIDNotFoundErr: number;

declare const kICADevicePropExposureMeteringMode: interop.Pointer;

declare const kICADevicePropSharpness: interop.Pointer;

declare const kICANotificationTypeDeviceConnectionProgress: interop.Pointer;

declare const kICADevicePropEffectMode: interop.Pointer;

declare const kICARefconKey: interop.Pointer;

declare const kICANotificationVendorErrorCodeKey: interop.Pointer;

declare const kICANotificationSubTypeKey: interop.Pointer;

declare const kICANotificationClassProprietary: interop.Pointer;

declare const kICANotificationImageKey: interop.Pointer;

declare const kICANotificationImageDataSizeKey: interop.Pointer;

declare const kDontEmbedColorSyncProfile: number;

declare const kICS_ThumbnailData: number;

declare const kICADeviceNotFoundErr: number;

declare const gICDScannerCallbackFunctions: ICD_Scannerscanner_callback_functions;

declare const kICD_ThumbnailDataFormatJPEG: number;

declare const kICS_FileData: number;

declare const kICADeviceBrowserDeviceRefKey: interop.Pointer;

declare const kICADeviceTypeCamera: interop.Pointer;

declare const kICANotificationSubTypeDocumentNotLoaded: interop.Pointer;

declare const kICAUploadFileScaleToFit: number;

declare const kICAPropertyColorSyncProfile: number;

declare const kICASandboxViolation: number;

declare const kICAObjectKey: interop.Pointer;

declare const kICADeviceNotOpenErr: number;

declare const kICADevicePropExposureIndex: interop.Pointer;

declare const kICATypeString: number;

declare const kICD_ThumbnailData: number;

declare const kICACannotYieldDevice: number;

declare const kICAModificationDateStringKey: interop.Pointer;

declare const kICAProperty: number;

declare const kICACameraPassThruNotUsed: number;

declare const kSetFileTypeAndCreator: number;

declare const kICANotificationTypeProprietary: interop.Pointer;

declare const kDeleteAfterDownload: number;

declare const kICAFlagReadAccess: number;

declare const kICANotificationImageStartRowKey: interop.Pointer;

declare const kICANotificationTypeDeviceAdded: interop.Pointer;

declare const kICANotificationTypeDevicePropertyChanged: interop.Pointer;

declare const kICANotificationTypeScannerScanDone: interop.Pointer;

declare const kICAUploadFileAsIs: number;

declare const kICANotificationRawEventKey: interop.Pointer;

declare const kICADevicePropFocusMeteringMode: interop.Pointer;

declare const kICANotificationScannerDocumentNameKey: interop.Pointer;

declare const kICAPropertyImageBitDepth: number;

declare const kICANotificationTypeKey: interop.Pointer;

declare const kICAThumbnailFormatJPEG: number;

declare const kICD_ThumbnailDataFormatTIFF: number;

declare const kICANotificationImageHeightKey: interop.Pointer;

declare const kICAFile: number;

declare const kICAThumbnailFormatTIFF: number;

declare const kICADeviceWebSharedKey: interop.Pointer;

declare const kICADeviceScanner: number;

declare const kICD_ThumbnailDataFormatPNG: number;

declare const kICAButtonScan: number;

declare const hasChildrenMask: number;

declare const kICAIPNameKey: interop.Pointer;

declare const kICANotificationTypeRequestObjectTransfer: interop.Pointer;

declare const kICABluetoothTransportType: interop.Pointer;

declare const kICAPropertyImageFNumber: number;

declare const kICANotificationTypeScanProgressStatus: interop.Pointer;

declare const kICAErrorKey: interop.Pointer;

declare const kICAIndexOutOfRangeErr: number;

declare const kICS_ThumbnailDataFormatPNG: number;

declare const kICATCPIPTransportType: interop.Pointer;

declare const kICADevicePropUploadURL: interop.Pointer;

declare class ICD_ScannerSetParametersPB {
  constructor(init?: ICD_ScannerSetParametersPB);
  header: ICDHeader;
  object: number;
  objectInfo: ICAObjectInfo;
  connectionID: number;
  sessionID: number;
  theDict: interop.Pointer;
}

declare class ICD_ScannerInitializePB {
  constructor(init?: ICD_ScannerInitializePB);
  header: ICDHeader;
  object: number;
  objectInfo: ICAObjectInfo;
  connectionID: number;
  sessionID: number;
}

declare class ICD_ScannerObjectSendMessagePB {
  constructor(init?: ICD_ScannerObjectSendMessagePB);
  header: ICDHeader;
  object: number;
  objectInfo: ICAObjectInfo;
  connectionID: number;
  message: ICAMessage;
  totalDataSize: number;
  result: number;
}

declare class ScannerObjectInfo {
  constructor(init?: ScannerObjectInfo);
  icaObject: number;
  reserved: number;
  icaObjectInfo: ICAObjectInfo;
  uniqueID: number;
  uniqueIDFireWire: number;
  thumbnailSize: number;
  dataSize: number;
  dataWidth: number;
  dataHeight: number;
  name: unknown /* const array */;
  creationDate: unknown /* const array */;
  flags: number;
  privateData: string | null;
  tag: number;
}

declare class ICD_ObjectSendMessagePB {
  constructor(init?: ICD_ObjectSendMessagePB);
  header: ICDHeader;
  object: number;
  objectInfo: ICAObjectInfo;
  connectionID: number;
  message: ICAMessage;
  totalDataSize: number;
  result: number;
}

declare class ObjectInfo {
  constructor(init?: ObjectInfo);
  icaObject: number;
  reserved: number;
  icaObjectInfo: ICAObjectInfo;
  uniqueID: number;
  thumbnailSize: number;
  dataSize: number;
  dataWidth: number;
  dataHeight: number;
  name: unknown /* const array */;
  creationDate: unknown /* const array */;
  flags: number;
  privateData: string | null;
  uniqueIDFireWire: number;
  tag: number;
  dataSize64: number;
}

declare class ICD_DisposeObjectPB {
  constructor(init?: ICD_DisposeObjectPB);
  header: ICDHeader;
  object: number;
}

declare class ICD_NewObjectPB {
  constructor(init?: ICD_NewObjectPB);
  header: ICDHeader;
  parentObject: number;
  objectInfo: ICAObjectInfo;
  object: number;
}

declare class ICAScannerStartPB {
  constructor(init?: ICAScannerStartPB);
  header: ICAHeader;
  sessionID: number;
}

declare class ICAScannerSetParametersPB {
  constructor(init?: ICAScannerSetParametersPB);
  header: ICAHeader;
  sessionID: number;
  theDict: interop.Pointer;
}

declare class ICAScannerInitializePB {
  constructor(init?: ICAScannerInitializePB);
  header: ICAHeader;
  sessionID: number;
}

declare class ICAScannerOpenSessionPB {
  constructor(init?: ICAScannerOpenSessionPB);
  header: ICAHeader;
  object: number;
  sessionID: number;
}

declare class ICACloseSessionPB {
  constructor(init?: ICACloseSessionPB);
  header: ICAHeader;
  sessionID: number;
}

declare class ICAOpenSessionPB {
  constructor(init?: ICAOpenSessionPB);
  header: ICAHeader;
  deviceObject: number;
  sessionID: number;
}

declare class ICAUnloadDeviceModulePB {
  constructor(init?: ICAUnloadDeviceModulePB);
  header: ICAHeader;
  deviceObject: number;
}

declare class ICALoadDeviceModulePB {
  constructor(init?: ICALoadDeviceModulePB);
  header: ICAHeader;
  paramDictionary: interop.Pointer;
}

declare class ICAUploadFilePB {
  constructor(init?: ICAUploadFilePB);
  header: ICAHeader;
  parentObject: number;
  fileFSRef: interop.Pointer;
  flags: number;
}

declare class ICADownloadFilePB {
  constructor(init?: ICADownloadFilePB);
  header: ICAHeader;
  object: number;
  dirFSRef: interop.Pointer;
  flags: number;
  fileType: number;
  fileCreator: number;
  rotationAngle: number;
  fileFSRef: interop.Pointer;
}

declare class ICACopyObjectThumbnailPB {
  constructor(init?: ICACopyObjectThumbnailPB);
  header: ICAHeader;
  object: number;
  thumbnailFormat: number;
  thumbnailData: interop.Pointer;
}

declare class ICACopyObjectPropertyDictionaryPB {
  constructor(init?: ICACopyObjectPropertyDictionaryPB);
  header: ICAHeader;
  object: number;
  theDict: interop.Pointer;
}

declare class ICAGetDeviceListPB {
  constructor(init?: ICAGetDeviceListPB);
  header: ICAHeader;
  object: number;
}

declare class ICARegisterForEventNotificationPB {
  constructor(init?: ICARegisterForEventNotificationPB);
  header: ICAHeader;
  objectOfInterest: number;
  eventsOfInterest: interop.Pointer;
  notificationProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  options: interop.Pointer;
}

declare class ICAObjectInfo {
  constructor(init?: ICAObjectInfo);
  objectType: number;
  objectSubtype: number;
}

declare class ICAHeader {
  constructor(init?: ICAHeader);
  err: number;
  refcon: number;
}

declare class ICD_Scannerscanner_callback_functions {
  constructor(init?: ICD_Scannerscanner_callback_functions);
  f_ICD_ScannerOpenUSBDevice: (p1: number, p2: interop.PointerConvertible) => number | null;
  f_ICD_ScannerOpenUSBDeviceWithIORegPath: (p1: number, p2: string, p3: interop.PointerConvertible) => number | null;
  f_ICD_ScannerCloseDevice: (p1: interop.PointerConvertible) => number | null;
  f_ICD_ScannerPeriodicTask: (p1: interop.PointerConvertible) => number | null;
  f_ICD_ScannerGetObjectInfo: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  f_ICD_ScannerCleanup: (p1: interop.PointerConvertible) => number | null;
  f_ICD_ScannerGetPropertyData: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  f_ICD_ScannerSetPropertyData: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  f_ICD_ScannerReadFileData: (p1: interop.PointerConvertible, p2: number, p3: string, p4: number, p5: interop.PointerConvertible) => number | null;
  f_ICD_ScannerWriteFileData: (p1: interop.PointerConvertible, p2: string, p3: number, p4: string, p5: number, p6: interop.PointerConvertible) => number | null;
  f_ICD_ScannerSendMessage: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible) => void) => number | null;
  f_ICD_ScannerAddPropertiesToCFDictionary: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  f_ICD_ScannerOpenFireWireDevice: (p1: number, p2: interop.PointerConvertible) => number | null;
  f_ICD_ScannerOpenFireWireDeviceWithIORegPath: (p1: number, p2: string, p3: interop.PointerConvertible) => number | null;
  f_ICD_ScannerOpenSession: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  f_ICD_ScannerCloseSession: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  f_ICD_ScannerInitialize: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  f_ICD_ScannerGetParameters: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  f_ICD_ScannerSetParameters: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  f_ICD_ScannerStatus: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  f_ICD_ScannerStart: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  f_ICD_ScannerOpenBluetoothDevice: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  f_ICD_ScannerOpenTCPIPDevice: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  f_ICD_ScannerWriteDataToFile: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number | null;
  f_ICD_ScannerOpenMassStorageDevice: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  f_ICD_ScannerWriteDataToFileDescriptor: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible) => number | null;
  f_ICD_ScannerWriteDataToFileDescriptor64: (p1: interop.PointerConvertible, p2: number) => number | null;
}

declare class ICD_ScannerCloseSessionPB {
  constructor(init?: ICD_ScannerCloseSessionPB);
  header: ICDHeader;
  object: number;
  objectInfo: ICAObjectInfo;
  connectionID: number;
  sessionID: number;
}

declare class ICAPTPEventDataset {
  constructor(init?: ICAPTPEventDataset);
  dataLength: number;
  containerType: number;
  eventCode: number;
  transactionID: number;
  params: unknown /* const array */;
}

declare class ICD_callback_functions {
  constructor(init?: ICD_callback_functions);
  f_ICD_OpenUSBDevice: (p1: number, p2: interop.PointerConvertible) => number | null;
  f_ICD_CloseDevice: (p1: interop.PointerConvertible) => number | null;
  f_ICD_PeriodicTask: (p1: interop.PointerConvertible) => number | null;
  f_ICD_GetObjectInfo: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  f_ICD_Cleanup: (p1: interop.PointerConvertible) => number | null;
  f_ICD_GetPropertyData: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  f_ICD_SetPropertyData: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  f_ICD_ReadFileData: (p1: interop.PointerConvertible, p2: number, p3: string, p4: number, p5: interop.PointerConvertible) => number | null;
  f_ICD_WriteFileData: (p1: interop.PointerConvertible, p2: string, p3: number, p4: string, p5: number, p6: interop.PointerConvertible) => number | null;
  f_ICD_SendMessage: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible) => void) => number | null;
  f_ICD_AddPropertiesToCFDictionary: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  f_ICD_OpenFireWireDevice: (p1: number, p2: interop.PointerConvertible) => number | null;
  f_ICD_OpenUSBDeviceWithIORegPath: (p1: number, p2: string, p3: interop.PointerConvertible) => number | null;
  f_ICD_OpenFireWireDeviceWithIORegPath: (p1: number, p2: string, p3: interop.PointerConvertible) => number | null;
  f_ICD_OpenBluetoothDevice: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  f_ICD_OpenTCPIPDevice: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  f_ICD_WriteDataToFile: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number | null;
  f_ICD_OpenMassStorageDevice: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  f_ICD_WriteDataToFileDescriptor: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible) => number | null;
  f_ICD_WriteDataToFileDescriptor64: (p1: interop.PointerConvertible, p2: number) => number | null;
  f_ICD_ReadFileData64: (p1: interop.PointerConvertible, p2: number, p3: string, p4: number, p5: interop.PointerConvertible) => number | null;
}

declare class ICD_ScannerStatusPB {
  constructor(init?: ICD_ScannerStatusPB);
  header: ICDHeader;
  object: number;
  objectInfo: ICAObjectInfo;
  connectionID: number;
  sessionID: number;
  status: number;
}

declare class ICAScannerCloseSessionPB {
  constructor(init?: ICAScannerCloseSessionPB);
  header: ICAHeader;
  sessionID: number;
}

declare class ICACopyObjectDataPB {
  constructor(init?: ICACopyObjectDataPB);
  header: ICAHeader;
  object: number;
  startByte: number;
  requestedSize: number;
  data: interop.Pointer;
}

declare class ICAObjectSendMessagePB {
  constructor(init?: ICAObjectSendMessagePB);
  header: ICAHeader;
  object: number;
  message: ICAMessage;
  result: number;
}

declare class ICARawFileHeader {
  constructor(init?: ICARawFileHeader);
  imageDataOffset: number;
  version: number;
  imageWidth: number;
  imageHeight: number;
  bytesPerRow: number;
  numberOfComponents: number;
  bitsPerComponent: number;
  bitsPerPixel: number;
  cgColorSpaceModel: number;
  bitmapInfo: number;
  orientation: number;
  dpi: number;
  colorSyncModeStr: unknown /* const array */;
}

declare class ICAPTPPassThroughPB {
  constructor(init?: ICAPTPPassThroughPB);
  commandCode: number;
  resultCode: number;
  numOfInputParams: number;
  numOfOutputParams: number;
  params: unknown /* const array */;
  dataUsageMode: number;
  flags: number;
  dataSize: number;
  data: unknown /* const array */;
}

declare class ICAMessage {
  constructor(init?: ICAMessage);
  messageType: number;
  startByte: number;
  dataPtr: interop.Pointer;
  dataSize: number;
  dataType: number;
}

declare class ICD_ScannerStartPB {
  constructor(init?: ICD_ScannerStartPB);
  header: ICDHeader;
  object: number;
  objectInfo: ICAObjectInfo;
  connectionID: number;
  sessionID: number;
}

declare class ICDHeader {
  constructor(init?: ICDHeader);
  err: number;
  refcon: number;
}

declare class ICD_ScannerGetParametersPB {
  constructor(init?: ICD_ScannerGetParametersPB);
  header: ICDHeader;
  object: number;
  objectInfo: ICAObjectInfo;
  connectionID: number;
  sessionID: number;
  theDict: interop.Pointer;
}

declare class ICAScannerStatusPB {
  constructor(init?: ICAScannerStatusPB);
  header: ICAHeader;
  sessionID: number;
  status: number;
}

declare class ICAScannerGetParametersPB {
  constructor(init?: ICAScannerGetParametersPB);
  header: ICAHeader;
  sessionID: number;
  theDict: interop.Pointer;
}

declare class ICASendNotificationPB {
  constructor(init?: ICASendNotificationPB);
  header: ICAHeader;
  notificationDictionary: interop.Pointer;
  replyCode: number;
}

declare class ICD_ScannerOpenSessionPB {
  constructor(init?: ICD_ScannerOpenSessionPB);
  header: ICDHeader;
  object: number;
  objectInfo: ICAObjectInfo;
  connectionID: number;
  sessionID: number;
}

declare class ICAImportImagePB {
  constructor(init?: ICAImportImagePB);
  header: ICAHeader;
  deviceObject: number;
  flags: number;
  supportedFileTypes: interop.Pointer;
  filterProc: (p1: interop.PointerConvertible, p2: number) => number | null;
  importedImages: interop.Pointer;
}

declare function ICAImportImage(pb: interop.PointerConvertible, completion: (p1: interop.PointerConvertible) => void): number;

declare function ICAShowDeviceBrowser(options: interop.PointerConvertible): number;

declare function ICARegisterForEventNotification(params: interop.PointerConvertible, completionProc: (p1: interop.PointerConvertible) => void): number;

declare function ICASendNotification(pb: interop.PointerConvertible): number;

declare function ICASendNotificationAndWaitForReply(pb: interop.PointerConvertible): number;

declare function ICAGetDeviceList(pb: interop.PointerConvertible, completion: (p1: interop.PointerConvertible) => void): number;

declare function ICACopyObjectPropertyDictionary(pb: interop.PointerConvertible, completion: (p1: interop.PointerConvertible) => void): number;

declare function ICACopyObjectThumbnail(pb: interop.PointerConvertible, completion: (p1: interop.PointerConvertible) => void): number;

declare function ICACopyObjectData(params: interop.PointerConvertible, completionProc: (p1: interop.PointerConvertible) => void): number;

declare function ICAObjectSendMessage(pb: interop.PointerConvertible, completion: (p1: interop.PointerConvertible) => void): number;

declare function ICADownloadFile(pb: interop.PointerConvertible, completion: (p1: interop.PointerConvertible) => void): number;

declare function ICAUploadFile(pb: interop.PointerConvertible, completion: (p1: interop.PointerConvertible) => void): number;

declare function ICALoadDeviceModule(pb: interop.PointerConvertible, completion: (p1: interop.PointerConvertible) => void): number;

declare function ICAUnloadDeviceModule(pb: interop.PointerConvertible, completion: (p1: interop.PointerConvertible) => void): number;

declare function ICAOpenSession(pb: interop.PointerConvertible, completion: (p1: interop.PointerConvertible) => void): number;

declare function ICACloseSession(pb: interop.PointerConvertible, completion: (p1: interop.PointerConvertible) => void): number;

declare function ICAScannerOpenSession(pb: interop.PointerConvertible, completion: (p1: interop.PointerConvertible) => void): number;

declare function ICAScannerCloseSession(pb: interop.PointerConvertible, completion: (p1: interop.PointerConvertible) => void): number;

declare function ICAScannerInitialize(pb: interop.PointerConvertible, completion: (p1: interop.PointerConvertible) => void): number;

declare function ICAScannerGetParameters(pb: interop.PointerConvertible, completion: (p1: interop.PointerConvertible) => void): number;

declare function ICAScannerSetParameters(pb: interop.PointerConvertible, completion: (p1: interop.PointerConvertible) => void): number;

declare function ICAScannerStatus(pb: interop.PointerConvertible, completion: (p1: interop.PointerConvertible) => void): number;

declare function ICAScannerStart(pb: interop.PointerConvertible, completion: (p1: interop.PointerConvertible) => void): number;

declare function ICDNewObject(pb: interop.PointerConvertible, completion: (p1: interop.PointerConvertible) => void): number;

declare function ICDDisposeObject(pb: interop.PointerConvertible, completion: (p1: interop.PointerConvertible) => void): number;

declare function ICD_main(argc: number, argv: interop.Pointer): number;

declare function ICDGetStandardPropertyData(objectInfo: interop.PointerConvertible, pb: interop.PointerConvertible): number;

declare function ICDNewObjectInfoCreated(parentInfo: interop.PointerConvertible, index: number, newICAObject: interop.PointerConvertible): number;

declare function ICDNewObjectCreated(parentInfo: interop.PointerConvertible, objectInfo: interop.PointerConvertible, completion: (p1: interop.PointerConvertible) => void): number;

declare function ICDCopyDeviceInfoDictionary(deviceName: string, theDict: interop.PointerConvertible): number;

declare function ICDCreateICAThumbnailFromICNS(fileName: string, thumbnail: interop.PointerConvertible): number;

declare function ICDCreateICAThumbnailFromIconRef(iconRef: interop.PointerConvertible, thumbnail: interop.PointerConvertible): number;

declare function ICDInitiateNotificationCallback(pb: interop.PointerConvertible): number;

declare function ICDCreateEventDataCookie(object: number, cookie: interop.PointerConvertible): number;

declare function ICDConnectUSBDevice(locationID: number): number;

declare function ICDConnectUSBDeviceWithIORegPath(locationID: number, ioregPath: unknown /* const array */): number;

declare function ICDDisconnectUSBDevice(locationID: number): number;

declare function ICDDisconnectUSBDeviceWithIORegPath(locationID: number, ioregPath: unknown /* const array */): number;

declare function ICDConnectFWDevice(guid: number): number;

declare function ICDConnectFWDeviceWithIORegPath(guid: number, ioregPath: unknown /* const array */): number;

declare function ICDDisconnectFWDevice(guid: number): number;

declare function ICDDisconnectFWDeviceWithIORegPath(guid: number, ioregPath: unknown /* const array */): number;

declare function ICDConnectBluetoothDevice(params: interop.PointerConvertible): number;

declare function ICDDisconnectBluetoothDevice(params: interop.PointerConvertible): number;

declare function ICDConnectTCPIPDevice(params: interop.PointerConvertible): number;

declare function ICDDisconnectTCPIPDevice(params: interop.PointerConvertible): number;

declare function ICD_ScannerMain(argc: number, argv: interop.Pointer): number;

declare function ICDScannerGetStandardPropertyData(objectInfo: interop.PointerConvertible, pb: interop.PointerConvertible): number;

declare function ICDScannerNewObjectInfoCreated(parentInfo: interop.PointerConvertible, index: number, newICAObject: interop.PointerConvertible): number;

declare function ICDScannerCopyDeviceInfoDictionary(deviceName: string, theDict: interop.PointerConvertible): number;

declare function ICDScannerCreateICAThumbnailFromICNS(fileName: string, thumbnail: interop.PointerConvertible): number;

declare function ICDScannerInitiateNotificationCallback(pb: interop.PointerConvertible): number;

declare function ICDScannerCreateEventDataCookie(object: number, cookie: interop.PointerConvertible): number;

declare function ICDScannerConnectUSBDevice(locationID: number): number;

declare function ICDScannerConnectUSBDeviceWithIORegPath(locationID: number, ioregPath: unknown /* const array */): number;

declare function ICDScannerDisconnectUSBDevice(locationID: number): number;

declare function ICDScannerDisconnectUSBDeviceWithIORegPath(locationID: number, ioregPath: unknown /* const array */): number;

declare function ICDScannerConnectFWDevice(guid: number): number;

declare function ICDScannerConnectFWDeviceWithIORegPath(guid: number, ioregPath: unknown /* const array */): number;

declare function ICDScannerDisconnectFWDevice(guid: number): number;

declare function ICDScannerDisconnectFWDeviceWithIORegPath(guid: number, ioregPath: unknown /* const array */): number;

declare function ICDScannerConnectBluetoothDevice(params: interop.PointerConvertible): number;

declare function ICDScannerDisconnectBluetoothDevice(params: interop.PointerConvertible): number;

declare function ICDScannerConnectTCPIPDevice(params: interop.PointerConvertible): number;

declare function ICDScannerDisconnectTCPIPDevice(params: interop.PointerConvertible): number;

declare function ICDCreateColorSpace(bitsPerPixel: number, samplesPerPixel: number, icaObject: number, colorSyncMode: interop.PointerConvertible, abstractProfile: interop.PointerConvertible, tmpProfilePath: string): interop.Pointer;

declare function ICDAddImageInfoToNotificationDictionary(dict: interop.PointerConvertible, width: number, height: number, bytesPerRow: number, dataStartRow: number, dataNumberOfRows: number, dataSize: number, dataBuffer: interop.PointerConvertible): number;

declare function ICDAddBandInfoToNotificationDictionary(dict: interop.PointerConvertible, width: number, height: number, bitsPerPixel: number, bitsPerComponent: number, numComponents: number, endianness: number, pixelDataType: number, bytesPerRow: number, dataStartRow: number, dataNumberOfRows: number, dataSize: number, dataBuffer: interop.PointerConvertible): number;

declare function ICDSendNotification(pb: interop.PointerConvertible): number;

declare function ICDSendNotificationAndWaitForReply(pb: interop.PointerConvertible): number;


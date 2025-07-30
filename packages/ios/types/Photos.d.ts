/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const PHImageErrorKey: string;

declare const PHImageResultIsDegradedKey: string;

declare const PHImageResultIsInCloudKey: string;

declare const PHImageManagerMaximumSize: CGSize;

declare const PHInvalidImageRequestID: number;

declare const PHLocalIdentifiersErrorKey: string;

declare const PHLivePhotoInfoErrorKey: string;

declare const PHImageResultRequestIDKey: string;

declare const PHInvalidAssetResourceDataRequestID: number;

declare const PHLivePhotoRequestIDInvalid: number;

declare const PHContentEditingInputErrorKey: string;

declare const PHContentEditingInputCancelledKey: string;

declare const PHLivePhotoInfoIsDegradedKey: string;

declare const PHImageCancelledKey: string;

declare const PHContentEditingInputResultIsInCloudKey: string;

declare const PHPhotosErrorDomain: string;

declare const PHLivePhotoShouldRenderAtPlaybackTime: string;

declare const PHLivePhotoInfoCancelledKey: string;

declare const PHVideoRequestOptionsDeliveryMode: {
  Automatic: 0,
  HighQualityFormat: 1,
  MediumQualityFormat: 2,
  FastFormat: 3,
};

declare const PHVideoRequestOptionsVersion: {
  Current: 0,
  Original: 1,
};

declare const PHImageRequestOptionsResizeMode: {
  None: 0,
  Fast: 1,
  Exact: 2,
};

declare const PHImageRequestOptionsDeliveryMode: {
  Opportunistic: 0,
  HighQualityFormat: 1,
  FastFormat: 2,
};

declare const PHImageRequestOptionsVersion: {
  Current: 0,
  Unadjusted: 1,
  Original: 2,
};

declare const PHLivePhotoFrameType: {
  Photo: 0,
  Video: 1,
};

declare const PHPhotosError: {
  InternalError: -1,
  UserCancelled: 3072,
  LibraryVolumeOffline: 3114,
  RelinquishingLibraryBundleToWriter: 3142,
  SwitchingSystemPhotoLibrary: 3143,
  NetworkAccessRequired: 3164,
  NetworkError: 3169,
  IdentifierNotFound: 3201,
  MultipleIdentifiersFound: 3202,
  ChangeNotSupported: 3300,
  OperationInterrupted: 3301,
  InvalidResource: 3302,
  MissingResource: 3303,
  NotEnoughSpace: 3305,
  RequestNotSupportedForAsset: 3306,
  AccessRestricted: 3310,
  AccessUserDenied: 3311,
  LibraryInFileProviderSyncRoot: 5423,
  PersistentChangeTokenExpired: 3105,
  PersistentChangeDetailsUnavailable: 3210,
  Invalid: -1,
};

declare const PHObjectType: {
  Asset: 1,
  AssetCollection: 2,
  CollectionList: 3,
};

declare const PHAssetSourceType: {
  TypeNone: 0,
  TypeUserLibrary: 1,
  TypeCloudShared: 2,
  TypeiTunesSynced: 4,
};

declare const PHAssetBurstSelectionType: {
  None: 0,
  AutoPick: 1,
  UserPick: 2,
};

declare const PHAssetMediaSubtype: {
  None: 0,
  PhotoPanorama: 1,
  PhotoHDR: 2,
  PhotoScreenshot: 4,
  PhotoLive: 8,
  PhotoDepthEffect: 16,
  SpatialMedia: 1024,
  VideoStreamed: 65536,
  VideoHighFrameRate: 131072,
  VideoTimelapse: 262144,
  VideoScreenRecording: 524288,
  VideoCinematic: 2097152,
};

declare const PHAssetMediaType: {
  Unknown: 0,
  Image: 1,
  Video: 2,
  Audio: 3,
};

declare const PHAssetPlaybackStyle: {
  Unsupported: 0,
  Image: 1,
  ImageAnimated: 2,
  LivePhoto: 3,
  Video: 4,
  VideoLooping: 5,
};

declare const PHAssetCollectionSubtype: {
  AlbumRegular: 2,
  AlbumSyncedEvent: 3,
  AlbumSyncedFaces: 4,
  AlbumSyncedAlbum: 5,
  AlbumImported: 6,
  AlbumMyPhotoStream: 100,
  AlbumCloudShared: 101,
  SmartAlbumGeneric: 200,
  SmartAlbumPanoramas: 201,
  SmartAlbumVideos: 202,
  SmartAlbumFavorites: 203,
  SmartAlbumTimelapses: 204,
  SmartAlbumAllHidden: 205,
  SmartAlbumRecentlyAdded: 206,
  SmartAlbumBursts: 207,
  SmartAlbumSlomoVideos: 208,
  SmartAlbumUserLibrary: 209,
  SmartAlbumSelfPortraits: 210,
  SmartAlbumScreenshots: 211,
  SmartAlbumDepthEffect: 212,
  SmartAlbumLivePhotos: 213,
  SmartAlbumAnimated: 214,
  SmartAlbumLongExposures: 215,
  SmartAlbumUnableToUpload: 216,
  SmartAlbumRAW: 217,
  SmartAlbumCinematic: 218,
  SmartAlbumSpatial: 219,
  SmartAlbumScreenRecordings: 220,
  Any: 9223372036854775807,
};

declare const PHAssetCollectionType: {
  Album: 1,
  SmartAlbum: 2,
  Moment: 3,
};

declare const PHCollectionEditOperation: {
  DeleteContent: 1,
  RemoveContent: 2,
  AddContent: 3,
  CreateContent: 4,
  RearrangeContent: 5,
  Delete: 6,
  Rename: 7,
};

declare const PHCollectionListSubtype: {
  MomentListCluster: 1,
  MomentListYear: 2,
  RegularFolder: 100,
  SmartFolderEvents: 200,
  SmartFolderFaces: 201,
  Any: 9223372036854775807,
};

declare const PHImageContentMode: {
  AspectFit: 0,
  AspectFill: 1,
  Default: 0,
};

declare const PHCollectionListType: {
  MomentList: 1,
  Folder: 2,
  SmartFolder: 3,
};

declare const PHAssetEditOperation: {
  Delete: 1,
  Content: 2,
  Properties: 3,
};

declare const PHAuthorizationStatus: {
  NotDetermined: 0,
  Restricted: 1,
  Denied: 2,
  Authorized: 3,
  Limited: 4,
};

declare const PHAssetResourceType: {
  Photo: 1,
  Video: 2,
  Audio: 3,
  AlternatePhoto: 4,
  FullSizePhoto: 5,
  FullSizeVideo: 6,
  AdjustmentData: 7,
  AdjustmentBasePhoto: 8,
  PairedVideo: 9,
  FullSizePairedVideo: 10,
  AdjustmentBasePairedVideo: 11,
  AdjustmentBaseVideo: 12,
  PhotoProxy: 19,
};

declare const PHAccessLevel: {
  AddOnly: 1,
  ReadWrite: 2,
};

declare interface PHPhotoLibraryChangeObserver extends NSObjectProtocol {
  photoLibraryDidChange(changeInstance: PHChange): void;
}

declare class PHPhotoLibraryChangeObserver extends NativeObject implements PHPhotoLibraryChangeObserver {
}

declare interface PHLivePhotoFrame {
  readonly image: CIImage;

  readonly time: CMTime;

  readonly type: interop.Enum<typeof PHLivePhotoFrameType>;

  readonly renderScale: number;
}

declare class PHLivePhotoFrame extends NativeObject implements PHLivePhotoFrame {
}

declare interface PHPhotoLibraryAvailabilityObserver extends NSObjectProtocol {
  photoLibraryDidBecomeUnavailable(photoLibrary: PHPhotoLibrary): void;
}

declare class PHPhotoLibraryAvailabilityObserver extends NativeObject implements PHPhotoLibraryAvailabilityObserver {
}

declare class PHFetchOptions extends NSObject implements NSCopying {
  predicate: NSPredicate;

  get sortDescriptors(): NSArray;
  set sortDescriptors(value: NSArray<interop.Object> | Array<interop.Object>);

  includeHiddenAssets: boolean;

  includeAllBurstAssets: boolean;

  includeAssetSourceTypes: interop.Enum<typeof PHAssetSourceType>;

  fetchLimit: number;

  wantsIncrementalChangeDetails: boolean;

  setPredicate(predicate: NSPredicate | null): void;

  setSortDescriptors(sortDescriptors: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setIncludeHiddenAssets(includeHiddenAssets: boolean): void;

  setIncludeAllBurstAssets(includeAllBurstAssets: boolean): void;

  setIncludeAssetSourceTypes(includeAssetSourceTypes: interop.Enum<typeof PHAssetSourceType>): void;

  setFetchLimit(fetchLimit: number): void;

  setWantsIncrementalChangeDetails(wantsIncrementalChangeDetails: boolean): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class PHFetchResultChangeDetails<ObjectType = interop.Object> extends NSObject {
  readonly fetchResultBeforeChanges: PHFetchResult;

  readonly fetchResultAfterChanges: PHFetchResult;

  readonly hasIncrementalChanges: boolean;

  readonly removedIndexes: NSIndexSet;

  readonly removedObjects: NSArray;

  readonly insertedIndexes: NSIndexSet;

  readonly insertedObjects: NSArray;

  readonly changedIndexes: NSIndexSet;

  readonly changedObjects: NSArray;

  enumerateMovesWithBlock(handler: (p1: number, p2: number) => void): void;

  readonly hasMoves: boolean;

  static changeDetailsFromFetchResultToFetchResultChangedObjects<ObjectType, This extends abstract new (...args: any) => any>(this: This, fromResult: PHFetchResult, toResult: PHFetchResult, changedObjects: NSArray<interop.Object> | Array<interop.Object>): InstanceType<This>;
}

declare class PHContentEditingInput extends NSObject {
  readonly mediaType: interop.Enum<typeof PHAssetMediaType>;

  readonly mediaSubtypes: interop.Enum<typeof PHAssetMediaSubtype>;

  readonly creationDate: NSDate;

  readonly location: CLLocation;

  readonly contentType: UTType;

  readonly uniformTypeIdentifier: string;

  readonly playbackStyle: interop.Enum<typeof PHAssetPlaybackStyle>;

  readonly adjustmentData: PHAdjustmentData;

  readonly displaySizeImage: UIImage;

  readonly fullSizeImageURL: NSURL;

  readonly fullSizeImageOrientation: number;

  readonly avAsset: AVAsset;

  readonly audiovisualAsset: AVAsset;

  readonly livePhoto: PHLivePhoto;
}

declare class PHAdjustmentData extends NSObject {
  initWithFormatIdentifierFormatVersionData(formatIdentifier: string, formatVersion: string, data: NSData): this;

  readonly formatIdentifier: string;

  readonly formatVersion: string;

  readonly data: NSData;
}

declare class PHAssetResourceManager extends NSObject {
  static defaultManager(): PHAssetResourceManager;

  requestDataForAssetResourceOptionsDataReceivedHandlerCompletionHandler(resource: PHAssetResource, options: PHAssetResourceRequestOptions | null, handler: (p1: NSData) => void, completionHandler: (p1: NSError) => void | null): number;

  writeDataForAssetResourceToFileOptionsCompletionHandler(resource: PHAssetResource, fileURL: NSURL, options: PHAssetResourceRequestOptions | null, completionHandler: (p1: NSError) => void | null): void;

  cancelDataRequest(requestID: number): void;
}

declare class PHAssetResourceRequestOptions extends NSObject implements NSCopying {
  networkAccessAllowed: boolean;

  progressHandler: (p1: number) => void;

  isNetworkAccessAllowed(): boolean;

  setNetworkAccessAllowed(networkAccessAllowed: boolean): void;

  setProgressHandler(progressHandler: (p1: number) => void | null): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class PHCachingImageManager extends PHImageManager {
  allowsCachingHighQualityImages: boolean;

  startCachingImagesForAssetsTargetSizeContentModeOptions(assets: NSArray<interop.Object> | Array<interop.Object>, targetSize: CGSize, contentMode: interop.Enum<typeof PHImageContentMode>, options: PHImageRequestOptions | null): void;

  stopCachingImagesForAssetsTargetSizeContentModeOptions(assets: NSArray<interop.Object> | Array<interop.Object>, targetSize: CGSize, contentMode: interop.Enum<typeof PHImageContentMode>, options: PHImageRequestOptions | null): void;

  stopCachingImagesForAllAssets(): void;

  setAllowsCachingHighQualityImages(allowsCachingHighQualityImages: boolean): void;
}

declare class PHImageManager extends NSObject {
  static defaultManager(): PHImageManager;

  requestImageForAssetTargetSizeContentModeOptionsResultHandler(asset: PHAsset, targetSize: CGSize, contentMode: interop.Enum<typeof PHImageContentMode>, options: PHImageRequestOptions | null, resultHandler: (p1: UIImage, p2: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>) => void | null): number;

  requestImageDataForAssetOptionsResultHandler(asset: PHAsset, options: PHImageRequestOptions | null, resultHandler: (p1: NSData, p2: string, p3: interop.Enum<typeof UIImageOrientation>, p4: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>) => void | null): number;

  requestImageDataAndOrientationForAssetOptionsResultHandler(asset: PHAsset, options: PHImageRequestOptions | null, resultHandler: (p1: NSData, p2: string, p3: interop.Enum<typeof CGImagePropertyOrientation>, p4: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>) => void | null): number;

  cancelImageRequest(requestID: number): void;

  requestLivePhotoForAssetTargetSizeContentModeOptionsResultHandler(asset: PHAsset, targetSize: CGSize, contentMode: interop.Enum<typeof PHImageContentMode>, options: PHLivePhotoRequestOptions | null, resultHandler: (p1: PHLivePhoto, p2: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>) => void | null): number;

  requestPlayerItemForVideoOptionsResultHandler(asset: PHAsset, options: PHVideoRequestOptions | null, resultHandler: (p1: AVPlayerItem, p2: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>) => void | null): number;

  requestExportSessionForVideoOptionsExportPresetResultHandler(asset: PHAsset, options: PHVideoRequestOptions | null, exportPreset: string, resultHandler: (p1: AVAssetExportSession, p2: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>) => void | null): number;

  requestAVAssetForVideoOptionsResultHandler(asset: PHAsset, options: PHVideoRequestOptions | null, resultHandler: (p1: AVAsset, p2: AVAudioMix, p3: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>) => void | null): number;
}

declare class PHVideoRequestOptions extends NSObject implements NSCopying {
  networkAccessAllowed: boolean;

  version: interop.Enum<typeof PHVideoRequestOptionsVersion>;

  deliveryMode: interop.Enum<typeof PHVideoRequestOptionsDeliveryMode>;

  progressHandler: (p1: number, p2: NSError, p3: interop.PointerConvertible, p4: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>) => void;

  isNetworkAccessAllowed(): boolean;

  setNetworkAccessAllowed(networkAccessAllowed: boolean): void;

  setVersion(version: interop.Enum<typeof PHVideoRequestOptionsVersion>): void;

  setDeliveryMode(deliveryMode: interop.Enum<typeof PHVideoRequestOptionsDeliveryMode>): void;

  setProgressHandler(progressHandler: (p1: number, p2: NSError, p3: interop.PointerConvertible, p4: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>) => void | null): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class PHLivePhotoEditingContext extends NSObject {
  initWithLivePhotoEditingInput(livePhotoInput: PHContentEditingInput): this;

  readonly fullSizeImage: CIImage;

  readonly duration: CMTime;

  readonly photoTime: CMTime;

  frameProcessor: (p1: PHLivePhotoFrame, p2: interop.PointerConvertible) => CIImage;

  audioVolume: number;

  readonly orientation: interop.Enum<typeof CGImagePropertyOrientation>;

  prepareLivePhotoForPlaybackWithTargetSizeOptionsCompletionHandler(targetSize: CGSize, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, handler: (p1: PHLivePhoto, p2: NSError) => void | null): void;

  saveLivePhotoToOutputOptionsCompletionHandler(output: PHContentEditingOutput, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, handler: (p1: boolean, p2: NSError) => void | null): void;

  cancel(): void;

  setFrameProcessor(frameProcessor: (p1: PHLivePhotoFrame, p2: interop.PointerConvertible) => CIImage | null): void;

  setAudioVolume(audioVolume: number): void;
}

declare class PHCollectionListChangeRequest extends PHChangeRequest {
  static creationRequestForCollectionListWithTitle<This extends abstract new (...args: any) => any>(this: This, title: string): InstanceType<This>;

  readonly placeholderForCreatedCollectionList: PHObjectPlaceholder;

  static deleteCollectionLists(collectionLists: NSFastEnumeration): void;

  static changeRequestForCollectionList<This extends abstract new (...args: any) => any>(this: This, collectionList: PHCollectionList): InstanceType<This>;

  static changeRequestForCollectionListChildCollections<This extends abstract new (...args: any) => any>(this: This, collectionList: PHCollectionList, childCollections: PHFetchResult): InstanceType<This>;

  static changeRequestForTopLevelCollectionListUserCollections<This extends abstract new (...args: any) => any>(this: This, childCollections: PHFetchResult): InstanceType<This>;

  title: string;

  addChildCollections(collections: NSFastEnumeration): void;

  insertChildCollectionsAtIndexes(collections: NSFastEnumeration, indexes: NSIndexSet): void;

  removeChildCollections(collections: NSFastEnumeration): void;

  removeChildCollectionsAtIndexes(indexes: NSIndexSet): void;

  replaceChildCollectionsAtIndexesWithChildCollections(indexes: NSIndexSet, collections: NSFastEnumeration): void;

  moveChildCollectionsAtIndexesToIndex(indexes: NSIndexSet, toIndex: number): void;

  setTitle(title: string): void;
}

declare class PHAssetCollectionChangeRequest extends PHChangeRequest {
  static creationRequestForAssetCollectionWithTitle<This extends abstract new (...args: any) => any>(this: This, title: string): InstanceType<This>;

  readonly placeholderForCreatedAssetCollection: PHObjectPlaceholder;

  static deleteAssetCollections(assetCollections: NSFastEnumeration): void;

  static changeRequestForAssetCollection<This extends abstract new (...args: any) => any>(this: This, assetCollection: PHAssetCollection): InstanceType<This>;

  static changeRequestForAssetCollectionAssets<This extends abstract new (...args: any) => any>(this: This, assetCollection: PHAssetCollection, assets: PHFetchResult | null): InstanceType<This>;

  title: string;

  addAssets(assets: NSFastEnumeration): void;

  insertAssetsAtIndexes(assets: NSFastEnumeration, indexes: NSIndexSet): void;

  removeAssets(assets: NSFastEnumeration): void;

  removeAssetsAtIndexes(indexes: NSIndexSet): void;

  replaceAssetsAtIndexesWithAssets(indexes: NSIndexSet, assets: NSFastEnumeration): void;

  moveAssetsAtIndexesToIndex(fromIndexes: NSIndexSet, toIndex: number): void;

  setTitle(title: string): void;
}

declare class PHAssetCreationRequest extends PHAssetChangeRequest {
  static creationRequestForAsset<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  static supportsAssetResourceTypes(types: NSArray<interop.Object> | Array<interop.Object>): boolean;

  addResourceWithTypeFileURLOptions(type: interop.Enum<typeof PHAssetResourceType>, fileURL: NSURL, options: PHAssetResourceCreationOptions | null): void;

  addResourceWithTypeDataOptions(type: interop.Enum<typeof PHAssetResourceType>, data: NSData, options: PHAssetResourceCreationOptions | null): void;
}

declare class PHContentEditingInputRequestOptions extends NSObject {
  canHandleAdjustmentData: (p1: PHAdjustmentData) => boolean;

  networkAccessAllowed: boolean;

  progressHandler: (p1: number, p2: interop.PointerConvertible) => void;

  setCanHandleAdjustmentData(canHandleAdjustmentData: (p1: PHAdjustmentData) => boolean): void;

  isNetworkAccessAllowed(): boolean;

  setNetworkAccessAllowed(networkAccessAllowed: boolean): void;

  setProgressHandler(progressHandler: (p1: number, p2: interop.PointerConvertible) => void | null): void;
}

declare class PHPersistentObjectChangeDetails extends NSObject {
  readonly objectType: interop.Enum<typeof PHObjectType>;

  readonly insertedLocalIdentifiers: NSSet;

  readonly updatedLocalIdentifiers: NSSet;

  readonly deletedLocalIdentifiers: NSSet;
}

declare class PHPersistentChangeFetchResult extends NSObject {
  enumerateChangesWithBlock(block: (p1: PHPersistentChange, p2: interop.PointerConvertible) => void): void;
}

declare class PHPersistentChange extends NSObject {
  readonly changeToken: PHPersistentChangeToken;

  changeDetailsForObjectTypeError(objectType: interop.Enum<typeof PHObjectType>, error: interop.PointerConvertible): PHPersistentObjectChangeDetails;
}

declare class PHFetchResult<ObjectType = interop.Object> extends NSObject implements NSCopying, NSFastEnumeration {
  readonly count: number;

  objectAtIndex(index: number): ObjectType;

  objectAtIndexedSubscript(idx: number): ObjectType;

  containsObject(anObject: ObjectType): boolean;

  indexOfObject(anObject: ObjectType): number;

  indexOfObjectInRange(anObject: ObjectType, range: _NSRange): number;

  readonly firstObject: ObjectType;

  readonly lastObject: ObjectType;

  objectsAtIndexes(indexes: NSIndexSet): NSArray;

  enumerateObjectsUsingBlock(block: (p1: interop.Object, p2: number, p3: interop.PointerConvertible) => void): void;

  enumerateObjectsWithOptionsUsingBlock(opts: interop.Enum<typeof NSEnumerationOptions>, block: (p1: interop.Object, p2: number, p3: interop.PointerConvertible) => void): void;

  enumerateObjectsAtIndexesOptionsUsingBlock(s: NSIndexSet, opts: interop.Enum<typeof NSEnumerationOptions>, block: (p1: interop.Object, p2: number, p3: interop.PointerConvertible) => void): void;

  countOfAssetsWithMediaType(mediaType: interop.Enum<typeof PHAssetMediaType>): number;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  countByEnumeratingWithStateObjectsCount(state: interop.PointerConvertible, buffer: interop.PointerConvertible, len: number): number;

  readonly [Symbol.iterator]: () => Iterator<ObjectType>;

}

declare class PHObject extends NSObject implements NSCopying {
  readonly localIdentifier: string;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class PHPhotoLibrary extends NSObject {
  static sharedPhotoLibrary(): PHPhotoLibrary;

  static authorizationStatusForAccessLevel(accessLevel: interop.Enum<typeof PHAccessLevel>): interop.Enum<typeof PHAuthorizationStatus>;

  static requestAuthorizationForAccessLevelHandler(accessLevel: interop.Enum<typeof PHAccessLevel>, handler: (p1: interop.Enum<typeof PHAuthorizationStatus>) => void): void;

  static authorizationStatus(): interop.Enum<typeof PHAuthorizationStatus>;

  static requestAuthorization(handler: (p1: interop.Enum<typeof PHAuthorizationStatus>) => void): void;

  readonly unavailabilityReason: NSError;

  registerAvailabilityObserver(observer: PHPhotoLibraryAvailabilityObserver): void;

  unregisterAvailabilityObserver(observer: PHPhotoLibraryAvailabilityObserver): void;

  performChangesCompletionHandler(changeBlock: () => void, completionHandler: (p1: boolean, p2: NSError) => void | null): void;

  performChangesAndWaitError(changeBlock: () => void, error: interop.PointerConvertible): boolean;

  registerChangeObserver(observer: PHPhotoLibraryChangeObserver): void;

  unregisterChangeObserver(observer: PHPhotoLibraryChangeObserver): void;

  fetchPersistentChangesSinceTokenError(token: PHPersistentChangeToken, error: interop.PointerConvertible): PHPersistentChangeFetchResult;

  readonly currentChangeToken: PHPersistentChangeToken;

  localIdentifierMappingsForCloudIdentifiers(cloudIdentifiers: NSArray<interop.Object> | Array<interop.Object>): NSDictionary;

  cloudIdentifierMappingsForLocalIdentifiers(localIdentifiers: NSArray<interop.Object> | Array<interop.Object>): NSDictionary;

  presentLimitedLibraryPickerFromViewController(controller: UIViewController): void;

  presentLimitedLibraryPickerFromViewControllerCompletionHandler(controller: UIViewController, completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>) => void): void;
}

declare class PHLocalIdentifierMapping extends NSObject {
  readonly localIdentifier: string;

  readonly error: NSError;
}

declare class PHObjectChangeDetails<ObjectType = interop.Object> extends NSObject {
  readonly objectBeforeChanges: ObjectType;

  readonly objectAfterChanges: ObjectType;

  readonly assetContentChanged: boolean;

  readonly objectWasDeleted: boolean;
}

declare class PHLivePhotoRequestOptions extends NSObject implements NSCopying {
  version: interop.Enum<typeof PHImageRequestOptionsVersion>;

  deliveryMode: interop.Enum<typeof PHImageRequestOptionsDeliveryMode>;

  networkAccessAllowed: boolean;

  progressHandler: (p1: number, p2: NSError, p3: interop.PointerConvertible, p4: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>) => void;

  setVersion(version: interop.Enum<typeof PHImageRequestOptionsVersion>): void;

  setDeliveryMode(deliveryMode: interop.Enum<typeof PHImageRequestOptionsDeliveryMode>): void;

  isNetworkAccessAllowed(): boolean;

  setNetworkAccessAllowed(networkAccessAllowed: boolean): void;

  setProgressHandler(progressHandler: (p1: number, p2: NSError, p3: interop.PointerConvertible, p4: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>) => void | null): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class PHLivePhoto extends NSObject implements NSCopying, NSSecureCoding {
  readonly size: CGSize;

  static requestLivePhotoWithResourceFileURLsPlaceholderImageTargetSizeContentModeResultHandler(fileURLs: NSArray<interop.Object> | Array<interop.Object>, image: UIImage | null, targetSize: CGSize, contentMode: interop.Enum<typeof PHImageContentMode>, resultHandler: (p1: PHLivePhoto, p2: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>) => void | null): number;

  static cancelLivePhotoRequestWithRequestID(requestID: number): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class PHChangeRequest extends NSObject {
}

declare class PHAssetChangeRequest extends PHChangeRequest {
  static creationRequestForAssetFromImage<This extends abstract new (...args: any) => any>(this: This, image: UIImage): InstanceType<This>;

  static creationRequestForAssetFromImageAtFileURL<This extends abstract new (...args: any) => any>(this: This, fileURL: NSURL): InstanceType<This>;

  static creationRequestForAssetFromVideoAtFileURL<This extends abstract new (...args: any) => any>(this: This, fileURL: NSURL): InstanceType<This>;

  readonly placeholderForCreatedAsset: PHObjectPlaceholder;

  static deleteAssets(assets: NSFastEnumeration): void;

  static changeRequestForAsset<This extends abstract new (...args: any) => any>(this: This, asset: PHAsset): InstanceType<This>;

  creationDate: NSDate;

  location: CLLocation;

  favorite: boolean;

  hidden: boolean;

  contentEditingOutput: PHContentEditingOutput;

  revertAssetContentToOriginal(): void;

  setCreationDate(creationDate: NSDate | null): void;

  setLocation(location: CLLocation | null): void;

  isFavorite(): boolean;

  setFavorite(favorite: boolean): void;

  isHidden(): boolean;

  setHidden(hidden: boolean): void;

  setContentEditingOutput(contentEditingOutput: PHContentEditingOutput | null): void;
}

declare class PHCollectionList extends PHCollection {
  readonly collectionListType: interop.Enum<typeof PHCollectionListType>;

  readonly collectionListSubtype: interop.Enum<typeof PHCollectionListSubtype>;

  readonly startDate: NSDate;

  readonly endDate: NSDate;

  readonly localizedLocationNames: NSArray;

  static fetchCollectionListsContainingCollectionOptions(collection: PHCollection, options: PHFetchOptions | null): PHFetchResult;

  static fetchCollectionListsWithLocalIdentifiersOptions(identifiers: NSArray<interop.Object> | Array<interop.Object>, options: PHFetchOptions | null): PHFetchResult;

  static fetchCollectionListsWithTypeSubtypeOptions(collectionListType: interop.Enum<typeof PHCollectionListType>, subtype: interop.Enum<typeof PHCollectionListSubtype>, options: PHFetchOptions | null): PHFetchResult;

  static fetchMomentListsWithSubtypeContainingMomentOptions(momentListSubtype: interop.Enum<typeof PHCollectionListSubtype>, moment: PHAssetCollection, options: PHFetchOptions | null): PHFetchResult;

  static fetchMomentListsWithSubtypeOptions(momentListSubtype: interop.Enum<typeof PHCollectionListSubtype>, options: PHFetchOptions | null): PHFetchResult;

  static transientCollectionListWithCollectionsTitle(collections: NSArray<interop.Object> | Array<interop.Object>, title: string | null): PHCollectionList;

  static transientCollectionListWithCollectionsFetchResultTitle(fetchResult: PHFetchResult, title: string | null): PHCollectionList;
}

declare class PHAssetResourceCreationOptions extends NSObject implements NSCopying {
  originalFilename: string;

  contentType: UTType;

  uniformTypeIdentifier: string;

  shouldMoveFile: boolean;

  setOriginalFilename(originalFilename: string | null): void;

  setContentType(contentType: UTType | null): void;

  setUniformTypeIdentifier(uniformTypeIdentifier: string | null): void;

  setShouldMoveFile(shouldMoveFile: boolean): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class PHContentEditingOutput extends NSObject {
  initWithContentEditingInput(contentEditingInput: PHContentEditingInput): this;

  adjustmentData: PHAdjustmentData;

  readonly renderedContentURL: NSURL;

  readonly defaultRenderedContentType: UTType;

  readonly supportedRenderedContentTypes: NSArray;

  renderedContentURLForTypeError(type: UTType, error: interop.PointerConvertible): NSURL;

  setAdjustmentData(adjustmentData: PHAdjustmentData | null): void;

  initWithPlaceholderForCreatedAsset(placeholderForCreatedAsset: PHObjectPlaceholder): this;
}

declare class PHCloudIdentifier extends NSObject implements NSSecureCoding {
  readonly stringValue: string;

  initWithStringValue(stringValue: string): this;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class PHPersistentChangeToken extends NSObject implements NSCopying, NSSecureCoding {
  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class PHAssetResource extends NSObject {
  readonly type: interop.Enum<typeof PHAssetResourceType>;

  readonly assetLocalIdentifier: string;

  readonly originalFilename: string;

  readonly contentType: UTType;

  readonly uniformTypeIdentifier: string;

  readonly pixelWidth: number;

  readonly pixelHeight: number;

  static assetResourcesForAsset(asset: PHAsset): NSArray;

  static assetResourcesForLivePhoto(livePhoto: PHLivePhoto): NSArray;
}

declare class PHChange extends NSObject {
  changeDetailsForObject(object: PHObject): PHObjectChangeDetails;

  changeDetailsForFetchResult(object: PHFetchResult): PHFetchResultChangeDetails;
}

declare class PHAssetCollection extends PHCollection {
  readonly assetCollectionType: interop.Enum<typeof PHAssetCollectionType>;

  readonly assetCollectionSubtype: interop.Enum<typeof PHAssetCollectionSubtype>;

  readonly estimatedAssetCount: number;

  readonly startDate: NSDate;

  readonly endDate: NSDate;

  readonly approximateLocation: CLLocation;

  readonly localizedLocationNames: NSArray;

  static fetchAssetCollectionsWithLocalIdentifiersOptions(identifiers: NSArray<interop.Object> | Array<interop.Object>, options: PHFetchOptions | null): PHFetchResult;

  static fetchAssetCollectionsWithTypeSubtypeOptions(type: interop.Enum<typeof PHAssetCollectionType>, subtype: interop.Enum<typeof PHAssetCollectionSubtype>, options: PHFetchOptions | null): PHFetchResult;

  static fetchAssetCollectionsContainingAssetWithTypeOptions(asset: PHAsset, type: interop.Enum<typeof PHAssetCollectionType>, options: PHFetchOptions | null): PHFetchResult;

  static fetchAssetCollectionsWithALAssetGroupURLsOptions(assetGroupURLs: NSArray<interop.Object> | Array<interop.Object>, options: PHFetchOptions | null): PHFetchResult;

  static fetchMomentsInMomentListOptions(momentList: PHCollectionList, options: PHFetchOptions | null): PHFetchResult;

  static fetchMomentsWithOptions(options: PHFetchOptions | null): PHFetchResult;

  static transientAssetCollectionWithAssetsTitle(assets: NSArray<interop.Object> | Array<interop.Object>, title: string | null): PHAssetCollection;

  static transientAssetCollectionWithAssetFetchResultTitle(fetchResult: PHFetchResult, title: string | null): PHAssetCollection;
}

declare class PHObjectPlaceholder extends PHObject {
}

declare class PHAsset extends PHObject {
  readonly playbackStyle: interop.Enum<typeof PHAssetPlaybackStyle>;

  readonly mediaType: interop.Enum<typeof PHAssetMediaType>;

  readonly mediaSubtypes: interop.Enum<typeof PHAssetMediaSubtype>;

  readonly contentType: UTType;

  readonly pixelWidth: number;

  readonly pixelHeight: number;

  readonly creationDate: NSDate;

  readonly modificationDate: NSDate;

  readonly addedDate: NSDate;

  readonly location: CLLocation;

  readonly duration: number;

  readonly hidden: boolean;

  readonly favorite: boolean;

  readonly burstIdentifier: string;

  readonly burstSelectionTypes: interop.Enum<typeof PHAssetBurstSelectionType>;

  readonly representsBurst: boolean;

  readonly sourceType: interop.Enum<typeof PHAssetSourceType>;

  readonly hasAdjustments: boolean;

  readonly adjustmentFormatIdentifier: string;

  canPerformEditOperation(editOperation: interop.Enum<typeof PHAssetEditOperation>): boolean;

  static fetchAssetsInAssetCollectionOptions(assetCollection: PHAssetCollection, options: PHFetchOptions | null): PHFetchResult;

  static fetchAssetsWithLocalIdentifiersOptions(identifiers: NSArray<interop.Object> | Array<interop.Object>, options: PHFetchOptions | null): PHFetchResult;

  static fetchKeyAssetsInAssetCollectionOptions(assetCollection: PHAssetCollection, options: PHFetchOptions | null): PHFetchResult;

  static fetchAssetsWithBurstIdentifierOptions(burstIdentifier: string, options: PHFetchOptions | null): PHFetchResult;

  static fetchAssetsWithOptions(options: PHFetchOptions | null): PHFetchResult;

  static fetchAssetsWithMediaTypeOptions(mediaType: interop.Enum<typeof PHAssetMediaType>, options: PHFetchOptions | null): PHFetchResult;

  static fetchAssetsWithALAssetURLsOptions(assetURLs: NSArray<interop.Object> | Array<interop.Object>, options: PHFetchOptions | null): PHFetchResult;

  isHidden(): boolean;

  isFavorite(): boolean;

  requestContentEditingInputWithOptionsCompletionHandler(options: PHContentEditingInputRequestOptions | null, completionHandler: (p1: PHContentEditingInput, p2: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>) => void | null): number;

  cancelContentEditingInputRequest(requestID: number): void;
}

declare class PHCollection extends PHObject {
  readonly canContainAssets: boolean;

  readonly canContainCollections: boolean;

  readonly localizedTitle: string;

  canPerformEditOperation(anOperation: interop.Enum<typeof PHCollectionEditOperation>): boolean;

  static fetchCollectionsInCollectionListOptions(collectionList: PHCollectionList, options: PHFetchOptions | null): PHFetchResult;

  static fetchTopLevelUserCollectionsWithOptions(options: PHFetchOptions | null): PHFetchResult;
}

declare class PHCloudIdentifierMapping extends NSObject {
  readonly cloudIdentifier: PHCloudIdentifier;

  readonly error: NSError;
}

declare class PHImageRequestOptions extends NSObject implements NSCopying {
  version: interop.Enum<typeof PHImageRequestOptionsVersion>;

  deliveryMode: interop.Enum<typeof PHImageRequestOptionsDeliveryMode>;

  resizeMode: interop.Enum<typeof PHImageRequestOptionsResizeMode>;

  normalizedCropRect: CGRect;

  networkAccessAllowed: boolean;

  synchronous: boolean;

  progressHandler: (p1: number, p2: NSError, p3: interop.PointerConvertible, p4: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>) => void;

  allowSecondaryDegradedImage: boolean;

  setVersion(version: interop.Enum<typeof PHImageRequestOptionsVersion>): void;

  setDeliveryMode(deliveryMode: interop.Enum<typeof PHImageRequestOptionsDeliveryMode>): void;

  setResizeMode(resizeMode: interop.Enum<typeof PHImageRequestOptionsResizeMode>): void;

  setNormalizedCropRect(normalizedCropRect: CGRect): void;

  isNetworkAccessAllowed(): boolean;

  setNetworkAccessAllowed(networkAccessAllowed: boolean): void;

  isSynchronous(): boolean;

  setSynchronous(synchronous: boolean): void;

  setProgressHandler(progressHandler: (p1: number, p2: NSError, p3: interop.PointerConvertible, p4: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>) => void | null): void;

  setAllowSecondaryDegradedImage(allowSecondaryDegradedImage: boolean): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}


/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const ALAssetsGroupPropertyURL: string;

declare const ALAssetsGroupPropertyPersistentID: string;

declare const ALAssetsGroupPropertyType: string;

declare const ALAssetTypeUnknown: string;

declare const ALAssetTypeVideo: string;

declare const ALAssetTypePhoto: string;

declare const ALAssetPropertyRepresentations: string;

declare const ALAssetPropertyOrientation: string;

declare const ALAssetPropertyDuration: string;

declare const ALAssetPropertyLocation: string;

declare const ALAssetPropertyType: string;

declare const ALErrorInvalidProperty: string;

declare const ALAssetsLibraryAccessUserDeniedError: number;

declare const ALAssetsLibraryDataUnavailableError: number;

declare const ALAssetsLibraryWriteDiskSpaceError: number;

declare const ALAssetsLibraryWriteInvalidDataError: number;

declare const ALAssetsLibraryWriteFailedError: number;

declare const ALAssetsLibraryErrorDomain: string;

declare const ALAssetLibraryDeletedAssetGroupsKey: string;

declare const ALAssetLibraryUpdatedAssetGroupsKey: string;

declare const ALAssetLibraryInsertedAssetGroupsKey: string;

declare const ALAssetLibraryUpdatedAssetsKey: string;

declare const ALAssetsLibraryChangedNotification: string;

declare const ALAssetsGroupAll: number;

declare const ALAssetsGroupPhotoStream: number;

declare const ALAssetsGroupSavedPhotos: number;

declare const ALAssetsGroupEvent: number;

declare const ALAssetsGroupLibrary: number;

declare const ALAssetsLibraryWriteDataEncodingError: number;

declare const ALAssetPropertyURLs: string;

declare const ALAssetsLibraryWriteIncompatibleDataError: number;

declare const ALAssetsLibraryUnknownError: number;

declare const ALAssetsLibraryAccessGloballyDeniedError: number;

declare const ALAssetsGroupPropertyName: string;

declare const ALAssetsGroupFaces: number;

declare const ALAssetPropertyDate: string;

declare const ALAssetsLibraryWriteBusyError: number;

declare const ALAssetPropertyAssetURL: string;

declare const ALAssetsGroupAlbum: number;

declare const ALAuthorizationStatus: {
  NotDetermined: 0,
  Restricted: 1,
  Denied: 2,
  Authorized: 3,
};

declare const ALAssetOrientation: {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
  UpMirrored: 4,
  DownMirrored: 5,
  LeftMirrored: 6,
  RightMirrored: 7,
};

declare class ALAssetsGroup extends NSObject {
  valueForProperty(property: string): interop.Object;

  posterImage(): interop.Pointer;

  setAssetsFilter(filter: ALAssetsFilter): void;

  numberOfAssets(): number;

  enumerateAssetsUsingBlock(enumerationBlock: (p1: ALAsset, p2: number, p3: interop.PointerConvertible) => void): void;

  enumerateAssetsWithOptionsUsingBlock(options: interop.Enum<typeof NSEnumerationOptions>, enumerationBlock: (p1: ALAsset, p2: number, p3: interop.PointerConvertible) => void): void;

  enumerateAssetsAtIndexesOptionsUsingBlock(indexSet: NSIndexSet, options: interop.Enum<typeof NSEnumerationOptions>, enumerationBlock: (p1: ALAsset, p2: number, p3: interop.PointerConvertible) => void): void;

  readonly editable: boolean;

  addAsset(asset: ALAsset): boolean;

  isEditable(): boolean;
}

declare class ALAsset extends NSObject {
  valueForProperty(property: string): interop.Object;

  defaultRepresentation(): ALAssetRepresentation;

  representationForUTI(representationUTI: string): ALAssetRepresentation;

  thumbnail(): interop.Pointer;

  aspectRatioThumbnail(): interop.Pointer;

  writeModifiedImageDataToSavedPhotosAlbumMetadataCompletionBlock(imageData: NSData, metadata: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, completionBlock: (p1: NSURL, p2: NSError) => void): void;

  writeModifiedVideoAtPathToSavedPhotosAlbumCompletionBlock(videoPathURL: NSURL, completionBlock: (p1: NSURL, p2: NSError) => void): void;

  readonly originalAsset: ALAsset;

  readonly editable: boolean;

  setImageDataMetadataCompletionBlock(imageData: NSData, metadata: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, completionBlock: (p1: NSURL, p2: NSError) => void): void;

  setVideoAtPathCompletionBlock(videoPathURL: NSURL, completionBlock: (p1: NSURL, p2: NSError) => void): void;

  isEditable(): boolean;
}

declare class ALAssetsLibrary extends NSObject {
  enumerateGroupsWithTypesUsingBlockFailureBlock(types: number, enumerationBlock: (p1: ALAssetsGroup, p2: interop.PointerConvertible) => void, failureBlock: (p1: NSError) => void): void;

  assetForURLResultBlockFailureBlock(assetURL: NSURL, resultBlock: (p1: ALAsset) => void, failureBlock: (p1: NSError) => void): void;

  groupForURLResultBlockFailureBlock(groupURL: NSURL, resultBlock: (p1: ALAssetsGroup) => void, failureBlock: (p1: NSError) => void): void;

  addAssetsGroupAlbumWithNameResultBlockFailureBlock(name: string, resultBlock: (p1: ALAssetsGroup) => void, failureBlock: (p1: NSError) => void): void;

  writeImageToSavedPhotosAlbumOrientationCompletionBlock(imageRef: interop.PointerConvertible, orientation: interop.Enum<typeof ALAssetOrientation>, completionBlock: (p1: NSURL, p2: NSError) => void): void;

  writeImageToSavedPhotosAlbumMetadataCompletionBlock(imageRef: interop.PointerConvertible, metadata: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, completionBlock: (p1: NSURL, p2: NSError) => void): void;

  writeImageDataToSavedPhotosAlbumMetadataCompletionBlock(imageData: NSData, metadata: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, completionBlock: (p1: NSURL, p2: NSError) => void): void;

  writeVideoAtPathToSavedPhotosAlbumCompletionBlock(videoPathURL: NSURL, completionBlock: (p1: NSURL, p2: NSError) => void): void;

  videoAtPathIsCompatibleWithSavedPhotosAlbum(videoPathURL: NSURL): boolean;

  static authorizationStatus(): interop.Enum<typeof ALAuthorizationStatus>;

  static disableSharedPhotoStreamsSupport(): void;
}

declare class ALAssetRepresentation extends NSObject {
  UTI(): string;

  dimensions(): CGSize;

  size(): number;

  getBytesFromOffsetLengthError(buffer: interop.PointerConvertible, offset: number, length: number, error: interop.PointerConvertible): number;

  fullResolutionImage(): interop.Pointer;

  CGImageWithOptions(options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): interop.Pointer;

  fullScreenImage(): interop.Pointer;

  url(): NSURL;

  metadata(): NSDictionary;

  orientation(): interop.Enum<typeof ALAssetOrientation>;

  scale(): number;

  filename(): string;
}

declare class ALAssetsFilter extends NSObject {
  static allPhotos(): ALAssetsFilter;

  static allVideos(): ALAssetsFilter;

  static allAssets(): ALAssetsFilter;
}


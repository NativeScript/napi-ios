/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./UIKit.d.ts" />

declare const PHPickerMode: {
  Default: 0,
  Compact: 1,
};

declare const PHPickerConfigurationAssetRepresentationMode: {
  Automatic: 0,
  Current: 1,
  Compatible: 2,
};

declare const PHLivePhotoViewPlaybackStyle: {
  Undefined: 0,
  Full: 1,
  Hint: 2,
};

declare const PHLivePhotoBadgeOptions: {
  OverContent: 1,
  LiveOff: 2,
};

declare const PHPickerConfigurationSelection: {
  Default: 0,
  Ordered: 1,
  Continuous: 2,
  ContinuousAndOrdered: 3,
};

declare const PHPickerCapabilities: {
  None: 0,
  Search: 1,
  StagingArea: 2,
  CollectionNavigation: 4,
  SelectionActions: 8,
  SensitivityAnalysisIntervention: 16,
};

declare interface PHContentEditingController extends NSObjectProtocol {
  canHandleAdjustmentData(adjustmentData: PHAdjustmentData): boolean;

  startContentEditingWithInputPlaceholderImage(contentEditingInput: PHContentEditingInput, placeholderImage: UIImage): void;

  finishContentEditingWithCompletionHandler(completionHandler: (p1: PHContentEditingOutput) => void | null): void;

  cancelContentEditing(): void;

  readonly shouldShowCancelConfirmation: boolean;
}

declare class PHContentEditingController extends NativeObject implements PHContentEditingController {
}

declare interface PHPickerViewControllerDelegate extends NSObjectProtocol {
  pickerDidFinishPicking(picker: PHPickerViewController, results: NSArray<interop.Object> | Array<interop.Object>): void;
}

declare class PHPickerViewControllerDelegate extends NativeObject implements PHPickerViewControllerDelegate {
}

declare interface PHLivePhotoViewDelegate extends NSObjectProtocol {
  livePhotoViewCanBeginPlaybackWithStyle?(livePhotoView: PHLivePhotoView, playbackStyle: interop.Enum<typeof PHLivePhotoViewPlaybackStyle>): boolean;

  livePhotoViewWillBeginPlaybackWithStyle?(livePhotoView: PHLivePhotoView, playbackStyle: interop.Enum<typeof PHLivePhotoViewPlaybackStyle>): void;

  livePhotoViewDidEndPlaybackWithStyle?(livePhotoView: PHLivePhotoView, playbackStyle: interop.Enum<typeof PHLivePhotoViewPlaybackStyle>): void;

  livePhotoViewExtraMinimumTouchDurationForTouchWithStyle?(livePhotoView: PHLivePhotoView, touch: UITouch, playbackStyle: interop.Enum<typeof PHLivePhotoViewPlaybackStyle>): number;
}

declare class PHLivePhotoViewDelegate extends NativeObject implements PHLivePhotoViewDelegate {
}

declare class PHPickerViewController extends UIViewController {
  readonly configuration: PHPickerConfiguration;

  delegate: PHPickerViewControllerDelegate;

  initWithConfiguration(configuration: PHPickerConfiguration): this;

  updatePickerUsingConfiguration(configuration: PHPickerUpdateConfiguration): void;

  deselectAssetsWithIdentifiers(identifiers: NSArray<interop.Object> | Array<interop.Object>): void;

  moveAssetWithIdentifierAfterAssetWithIdentifier(identifier: string, afterIdentifier: string | null): void;

  scrollToInitialPosition(): void;

  zoomIn(): void;

  zoomOut(): void;

  setDelegate(delegate: PHPickerViewControllerDelegate): void;
}

declare class PHPickerResult extends NSObject {
  readonly itemProvider: NSItemProvider;

  readonly assetIdentifier: string;
}

declare class PHPickerFilter extends NSObject implements NSCopying {
  static readonly imagesFilter: PHPickerFilter;

  static readonly videosFilter: PHPickerFilter;

  static readonly livePhotosFilter: PHPickerFilter;

  static readonly depthEffectPhotosFilter: PHPickerFilter;

  static readonly burstsFilter: PHPickerFilter;

  static readonly panoramasFilter: PHPickerFilter;

  static readonly screenshotsFilter: PHPickerFilter;

  static readonly screenRecordingsFilter: PHPickerFilter;

  static readonly cinematicVideosFilter: PHPickerFilter;

  static readonly slomoVideosFilter: PHPickerFilter;

  static readonly timelapseVideosFilter: PHPickerFilter;

  static readonly spatialMediaFilter: PHPickerFilter;

  static playbackStyleFilter(playbackStyle: interop.Enum<typeof PHAssetPlaybackStyle>): PHPickerFilter;

  static anyFilterMatchingSubfilters(subfilters: NSArray<interop.Object> | Array<interop.Object>): PHPickerFilter;

  static allFilterMatchingSubfilters(subfilters: NSArray<interop.Object> | Array<interop.Object>): PHPickerFilter;

  static notFilterOfSubfilter(subfilter: PHPickerFilter): PHPickerFilter;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class PHPickerConfiguration extends NSObject implements NSCopying {
  preferredAssetRepresentationMode: interop.Enum<typeof PHPickerConfigurationAssetRepresentationMode>;

  selection: interop.Enum<typeof PHPickerConfigurationSelection>;

  selectionLimit: number;

  filter: PHPickerFilter;

  get preselectedAssetIdentifiers(): NSArray;
  set preselectedAssetIdentifiers(value: NSArray<interop.Object> | Array<interop.Object>);

  mode: interop.Enum<typeof PHPickerMode>;

  edgesWithoutContentMargins: interop.Enum<typeof NSDirectionalRectEdge>;

  disabledCapabilities: interop.Enum<typeof PHPickerCapabilities>;

  initWithPhotoLibrary(photoLibrary: PHPhotoLibrary): this;

  init(): this;

  setPreferredAssetRepresentationMode(preferredAssetRepresentationMode: interop.Enum<typeof PHPickerConfigurationAssetRepresentationMode>): void;

  setSelection(selection: interop.Enum<typeof PHPickerConfigurationSelection>): void;

  setSelectionLimit(selectionLimit: number): void;

  setFilter(filter: PHPickerFilter): void;

  setPreselectedAssetIdentifiers(preselectedAssetIdentifiers: NSArray<interop.Object> | Array<interop.Object>): void;

  setMode(mode: interop.Enum<typeof PHPickerMode>): void;

  setEdgesWithoutContentMargins(edgesWithoutContentMargins: interop.Enum<typeof NSDirectionalRectEdge>): void;

  setDisabledCapabilities(disabledCapabilities: interop.Enum<typeof PHPickerCapabilities>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class PHLivePhotoView extends UIView {
  static livePhotoBadgeImageWithOptions(badgeOptions: interop.Enum<typeof PHLivePhotoBadgeOptions>): UIImage;

  delegate: PHLivePhotoViewDelegate;

  livePhoto: PHLivePhoto;

  contentsRect: CGRect;

  muted: boolean;

  readonly playbackGestureRecognizer: UIGestureRecognizer;

  startPlaybackWithStyle(playbackStyle: interop.Enum<typeof PHLivePhotoViewPlaybackStyle>): void;

  stopPlayback(): void;

  setDelegate(delegate: PHLivePhotoViewDelegate | null): void;

  setLivePhoto(livePhoto: PHLivePhoto | null): void;

  setContentsRect(contentsRect: CGRect): void;

  isMuted(): boolean;

  setMuted(muted: boolean): void;
}

declare class PHPickerUpdateConfiguration extends NSObject implements NSCopying {
  selectionLimit: number;

  edgesWithoutContentMargins: interop.Enum<typeof NSDirectionalRectEdge>;

  setSelectionLimit(selectionLimit: number): void;

  setEdgesWithoutContentMargins(edgesWithoutContentMargins: interop.Enum<typeof NSDirectionalRectEdge>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}


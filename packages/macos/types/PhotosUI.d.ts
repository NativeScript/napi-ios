/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Foundation.d.ts" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./AppKit.d.ts" />

declare const PHProjectCategoryOther: string;

declare const PHProjectCategoryPrints: string;

declare const PHProjectCategoryCard: string;

declare const PHProjectCategoryCalendar: string;

declare const PHProjectCategoryBook: string;

declare const PHProjectTypeUndefined: string;

declare const PHProjectCategoryWallDecor: string;

declare const PHProjectCategoryUndefined: string;

declare const PHProjectCategorySlideshow: string;

declare const PHProjectSectionType: {
  Undefined: 0,
  Cover: 1,
  Content: 2,
  Auxiliary: 3,
};

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

declare const PHProjectCreationSource: {
  Undefined: 0,
  UserSelection: 1,
  Album: 2,
  Memory: 3,
  Moment: 4,
  Project: 20,
  ProjectBook: 21,
  ProjectCalendar: 22,
  ProjectCard: 23,
  ProjectPrintOrder: 24,
  ProjectSlideshow: 25,
  ProjectExtension: 26,
};

declare const PHLivePhotoViewContentMode: {
  Fit: 0,
  Fill: 1,
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

declare const PHProjectTextElementType: {
  Body: 0,
  Title: 1,
  Subtitle: 2,
};

declare interface PHContentEditingController extends NSObjectProtocol {
  canHandleAdjustmentData(adjustmentData: PHAdjustmentData): boolean;

  startContentEditingWithInputPlaceholderImage(contentEditingInput: PHContentEditingInput, placeholderImage: NSImage): void;

  finishContentEditingWithCompletionHandler(completionHandler: (p1: PHContentEditingOutput) => void | null): void;

  cancelContentEditing(): void;

  readonly shouldShowCancelConfirmation: boolean;
}

declare class PHContentEditingController extends NativeObject implements PHContentEditingController {
}

declare interface PHProjectTypeDescriptionInvalidator extends NSObjectProtocol {
  invalidateTypeDescriptionForProjectType(projectType: string): void;

  invalidateFooterTextForSubtypesOfProjectType(projectType: string): void;
}

declare class PHProjectTypeDescriptionInvalidator extends NativeObject implements PHProjectTypeDescriptionInvalidator {
}

declare interface PHLivePhotoViewDelegate extends NSObjectProtocol {
  livePhotoViewCanBeginPlaybackWithStyle?(livePhotoView: PHLivePhotoView, playbackStyle: interop.Enum<typeof PHLivePhotoViewPlaybackStyle>): boolean;

  livePhotoViewWillBeginPlaybackWithStyle?(livePhotoView: PHLivePhotoView, playbackStyle: interop.Enum<typeof PHLivePhotoViewPlaybackStyle>): void;

  livePhotoViewDidEndPlaybackWithStyle?(livePhotoView: PHLivePhotoView, playbackStyle: interop.Enum<typeof PHLivePhotoViewPlaybackStyle>): void;
}

declare class PHLivePhotoViewDelegate extends NativeObject implements PHLivePhotoViewDelegate {
}

declare interface PHProjectExtensionController extends NSObjectProtocol {
  readonly supportedProjectTypes?: NSArray;

  typeDescriptionDataSourceForCategoryInvalidator?(category: string, invalidator: PHProjectTypeDescriptionInvalidator): PHProjectTypeDescriptionDataSource;

  beginProjectWithExtensionContextProjectInfoCompletion(extensionContext: PHProjectExtensionContext, projectInfo: PHProjectInfo, completion: (p1: NSError) => void | null): void;

  resumeProjectWithExtensionContextCompletion(extensionContext: PHProjectExtensionContext, completion: (p1: NSError) => void | null): void;

  finishProjectWithCompletionHandler(completion: () => void): void;
}

declare class PHProjectExtensionController extends NativeObject implements PHProjectExtensionController {
}

declare interface PHProjectTypeDescriptionDataSource extends NSObjectProtocol {
  subtypesForProjectType(projectType: string): NSArray;

  typeDescriptionForProjectType(projectType: string): PHProjectTypeDescription;

  footerTextForSubtypesOfProjectType(projectType: string): NSAttributedString;

  extensionWillDiscardDataSource?(): void;
}

declare class PHProjectTypeDescriptionDataSource extends NativeObject implements PHProjectTypeDescriptionDataSource {
}

declare interface PHPickerViewControllerDelegate extends NSObjectProtocol {
  pickerDidFinishPicking(picker: PHPickerViewController, results: NSArray<interop.Object> | Array<interop.Object>): void;
}

declare class PHPickerViewControllerDelegate extends NativeObject implements PHPickerViewControllerDelegate {
}

declare class PHProjectExtensionContext extends NSExtensionContext {
  readonly photoLibrary: PHPhotoLibrary;

  readonly project: PHProject;

  showEditorForAsset(asset: PHAsset): void;

  updatedProjectInfoFromProjectInfoCompletion(existingProjectInfo: PHProjectInfo | null, completion: (p1: PHProjectInfo) => void | null): NSProgress;
}

declare class PHProjectJournalEntryElement extends PHProjectElement implements NSSecureCoding {
  readonly date: NSDate;

  readonly assetElement: PHProjectAssetElement;

  readonly textElement: PHProjectTextElement;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class PHProjectTextElement extends PHProjectElement implements NSSecureCoding {
  readonly text: string;

  readonly attributedText: NSAttributedString;

  readonly textElementType: interop.Enum<typeof PHProjectTextElementType>;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class PHProjectElement extends NSObject implements NSSecureCoding {
  readonly weight: number;

  readonly placement: CGRect;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class PHProjectSectionContent extends NSObject implements NSSecureCoding {
  readonly elements: NSArray;

  readonly numberOfColumns: number;

  readonly aspectRatio: number;

  readonly cloudAssetIdentifiers: NSArray;

  readonly backgroundColor: NSColor;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class PHProjectInfo extends NSObject implements NSSecureCoding {
  readonly creationSource: interop.Enum<typeof PHProjectCreationSource>;

  readonly projectType: string;

  readonly sections: NSArray;

  readonly brandingEnabled: boolean;

  readonly pageNumbersEnabled: boolean;

  readonly productIdentifier: string;

  readonly themeIdentifier: string;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class PHProjectTypeDescription extends NSObject implements NSSecureCoding {
  readonly projectType: string;

  readonly localizedTitle: string;

  readonly localizedDescription: string;

  readonly localizedAttributedDescription: NSAttributedString;

  readonly image: NSImage;

  readonly subtypeDescriptions: NSArray;

  readonly canProvideSubtypes: boolean;

  initWithProjectTypeTitleDescriptionImageSubtypeDescriptions(projectType: string, localizedTitle: string, localizedDescription: string | null, image: NSImage | null, subtypeDescriptions: NSArray<interop.Object> | Array<interop.Object>): this;

  initWithProjectTypeTitleAttributedDescriptionImageSubtypeDescriptions(projectType: string, localizedTitle: string, localizedAttributedDescription: NSAttributedString | null, image: NSImage | null, subtypeDescriptions: NSArray<interop.Object> | Array<interop.Object>): this;

  initWithProjectTypeTitleDescriptionImage(projectType: string, localizedTitle: string, localizedDescription: string | null, image: NSImage | null): this;

  initWithProjectTypeTitleDescriptionImageCanProvideSubtypes(projectType: string, localizedTitle: string, localizedDescription: string | null, image: NSImage | null, canProvideSubtypes: boolean): this;

  initWithProjectTypeTitleAttributedDescriptionImageCanProvideSubtypes(projectType: string, localizedTitle: string, localizedAttributedDescription: NSAttributedString | null, image: NSImage | null, canProvideSubtypes: boolean): this;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class PHPickerViewController extends NSViewController {
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

declare class PHProjectMapElement extends PHProjectElement implements NSSecureCoding {
  readonly mapType: interop.Enum<typeof MKMapType>;

  readonly centerCoordinate: CLLocationCoordinate2D;

  readonly heading: number;

  readonly pitch: number;

  readonly altitude: number;

  readonly annotations: NSArray;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class PHPickerResult extends NSObject {
  readonly itemProvider: NSItemProvider;

  readonly assetIdentifier: string;
}

declare class PHLivePhotoView extends NSView {
  delegate: PHLivePhotoViewDelegate;

  livePhoto: PHLivePhoto;

  contentMode: interop.Enum<typeof PHLivePhotoViewContentMode>;

  contentsRect: CGRect;

  audioVolume: number;

  muted: boolean;

  startPlaybackWithStyle(playbackStyle: interop.Enum<typeof PHLivePhotoViewPlaybackStyle>): void;

  stopPlayback(): void;

  stopPlaybackAnimated(animated: boolean): void;

  readonly livePhotoBadgeView: NSView;

  setDelegate(delegate: PHLivePhotoViewDelegate | null): void;

  setLivePhoto(livePhoto: PHLivePhoto | null): void;

  setContentMode(contentMode: interop.Enum<typeof PHLivePhotoViewContentMode>): void;

  setContentsRect(contentsRect: CGRect): void;

  setAudioVolume(audioVolume: number): void;

  isMuted(): boolean;

  setMuted(muted: boolean): void;
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

declare class PHProjectRegionOfInterest extends NSObject implements NSSecureCoding {
  readonly rect: CGRect;

  readonly weight: number;

  readonly quality: number;

  readonly identifier: string;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class PHProjectAssetElement extends PHProjectElement implements NSSecureCoding {
  readonly cloudAssetIdentifier: PHCloudIdentifier;

  readonly annotation: string;

  readonly cropRect: CGRect;

  readonly regionsOfInterest: NSArray;

  readonly horizontallyFlipped: boolean;

  readonly verticallyFlipped: boolean;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class PHPickerUpdateConfiguration extends NSObject implements NSCopying {
  selectionLimit: number;

  edgesWithoutContentMargins: interop.Enum<typeof NSDirectionalRectEdge>;

  setSelectionLimit(selectionLimit: number): void;

  setEdgesWithoutContentMargins(edgesWithoutContentMargins: interop.Enum<typeof NSDirectionalRectEdge>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class PHProjectSection extends NSObject implements NSSecureCoding {
  readonly sectionContents: NSArray;

  readonly sectionType: interop.Enum<typeof PHProjectSectionType>;

  readonly title: string;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}


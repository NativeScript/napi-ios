/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const MERAWProcessorReadyForMoreMediaDataDidChangeNotification: string;

declare const MERAWProcessorValuesDidChangeNotification: string;

declare const MediaExtensionErrorDomain: string;

declare const MEVideoDecoderReadyForMoreMediaDataDidChangeNotification: string;

declare const MEDecodeFrameStatus: {
  NoStatus: 0,
  FrameDropped: 1,
};

declare const MEFormatReaderParseAdditionalFragmentsStatus: {
  SizeIncreased: 1,
  FragmentAdded: 2,
  FragmentsComplete: 4,
};

declare const MEFileInfoFragmentsStatus: {
  CouldNotContain: 0,
  Contains: 1,
  CouldContainButDoesNotContain: 2,
};

declare const MEError: {
  UnsupportedFeature: -19320,
  AllocationFailure: -19321,
  InvalidParameter: -19322,
  ParsingFailure: -19323,
  InternalFailure: -19324,
  PropertyNotSupported: -19325,
  NoSuchEdit: -19326,
  NoSamples: -19327,
  LocationNotAvailable: -19328,
  EndOfStream: -19329,
  PermissionDenied: -19330,
  ReferenceMissing: -19331,
};

declare interface MERAWProcessor extends NSObjectProtocol {
  metalDeviceRegistryID?: number;

  readonly outputColorAttachments?: NSDictionary;

  readonly processingParameters: NSArray;

  readonly readyForMoreMediaData: boolean;

  processFrameFromImageBufferCompletionHandler(inputFrame: interop.PointerConvertible, completionHandler: (p1: interop.PointerConvertible, p2: NSError) => void | null): void;

  setMetalDeviceRegistryID?(metalDeviceRegistryID: number): void;

  isReadyForMoreMediaData(): boolean;
}

declare class MERAWProcessor extends NativeObject implements MERAWProcessor {
}

declare interface MEVideoDecoder extends NSObjectProtocol {
  readonly producesRAWOutput?: boolean;

  readonly contentHasInterframeDependencies?: boolean;

  recommendedThreadCount?: number;

  readonly actualThreadCount?: number;

  readonly supportedPixelFormatsOrderedByQuality?: NSArray;

  reducedResolution?: CGSize;

  readonly pixelFormatsWithReducedResolutionDecodeSupport?: NSArray;

  readonly readyForMoreMediaData: boolean;

  decodeFrameFromSampleBufferOptionsCompletionHandler(sampleBuffer: interop.PointerConvertible, options: MEDecodeFrameOptions, completionHandler: (p1: interop.PointerConvertible, p2: interop.Enum<typeof MEDecodeFrameStatus>, p3: NSError) => void | null): void;

  canAcceptFormatDescription?(formatDescription: interop.PointerConvertible): boolean;

  setRecommendedThreadCount?(recommendedThreadCount: number): void;

  setReducedResolution?(reducedResolution: CGSize): void;

  isReadyForMoreMediaData(): boolean;
}

declare class MEVideoDecoder extends NativeObject implements MEVideoDecoder {
}

declare interface MESampleCursor extends NSObjectProtocol, NSCopying {
  readonly presentationTimeStamp: CMTime;

  readonly decodeTimeStamp: CMTime;

  readonly currentSampleDuration: CMTime;

  readonly currentSampleFormatDescription: interop.Pointer;

  stepInDecodeOrderByCountCompletionHandler(stepCount: number, completionHandler: (p1: number, p2: NSError) => void | null): void;

  stepInPresentationOrderByCountCompletionHandler(stepCount: number, completionHandler: (p1: number, p2: NSError) => void | null): void;

  stepByDecodeTimeCompletionHandler(deltaDecodeTime: CMTime, completionHandler: (p1: CMTime, p2: boolean, p3: NSError) => void | null): void;

  stepByPresentationTimeCompletionHandler(deltaPresentationTime: CMTime, completionHandler: (p1: CMTime, p2: boolean, p3: NSError) => void | null): void;

  readonly syncInfo?: AVSampleCursorSyncInfo;

  readonly dependencyInfo?: AVSampleCursorDependencyInfo;

  readonly hevcDependencyInfo?: MEHEVCDependencyInfo;

  readonly decodeTimeOfLastSampleReachableByForwardSteppingThatIsAlreadyLoadedByByteSource?: CMTime;

  samplesWithEarlierDTSsMayHaveLaterPTSsThanCursor?(cursor: MESampleCursor): boolean;

  samplesWithLaterDTSsMayHaveEarlierPTSsThanCursor?(cursor: MESampleCursor): boolean;

  chunkDetailsReturningError?(error: interop.PointerConvertible): MESampleCursorChunk | null;

  sampleLocationReturningError?(error: interop.PointerConvertible): MESampleLocation | null;

  estimatedSampleLocationReturningError?(error: interop.PointerConvertible): MEEstimatedSampleLocation | null;

  refineSampleLocationRefinementDataRefinementDataLengthRefinedLocationError?(estimatedSampleLocation: AVSampleCursorStorageRange, refinementData: interop.PointerConvertible, refinementDataLength: number, refinedLocationOut: interop.PointerConvertible, error: interop.PointerConvertible): boolean;

  loadSampleBufferContainingSamplesToEndCursorCompletionHandler?(endSampleCursor: MESampleCursor | null, completionHandler: (p1: interop.PointerConvertible, p2: NSError) => void | null): void;

  loadPostDecodeProcessingMetadataWithCompletionHandler?(completionHandler: (p1: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, p2: NSError) => void | null): void;
}

declare class MESampleCursor extends NativeObject implements MESampleCursor {
}

declare interface MEFormatReaderExtension extends NSObjectProtocol {
  init(): this;

  formatReaderWithByteSourceOptionsError(primaryByteSource: MEByteSource, options: MEFormatReaderInstantiationOptions | null, error: interop.PointerConvertible): MEFormatReader | null;
}

declare class MEFormatReaderExtension extends NativeObject implements MEFormatReaderExtension {
}

declare interface METrackReader extends NSObjectProtocol {
  loadTrackInfoWithCompletionHandler(completionHandler: (p1: METrackInfo, p2: NSError) => void | null): void;

  generateSampleCursorAtPresentationTimeStampCompletionHandler(presentationTimeStamp: CMTime, completionHandler: (p1: MESampleCursor, p2: NSError) => void | null): void;

  generateSampleCursorAtFirstSampleInDecodeOrderWithCompletionHandler(completionHandler: (p1: MESampleCursor, p2: NSError) => void | null): void;

  generateSampleCursorAtLastSampleInDecodeOrderWithCompletionHandler(completionHandler: (p1: MESampleCursor, p2: NSError) => void | null): void;

  loadUneditedDurationWithCompletionHandler?(completionHandler: (p1: CMTime, p2: NSError) => void | null): void;

  loadTotalSampleDataLengthWithCompletionHandler?(completionHandler: (p1: number, p2: NSError) => void | null): void;

  loadEstimatedDataRateWithCompletionHandler?(completionHandler: (p1: number, p2: NSError) => void | null): void;

  loadMetadataWithCompletionHandler?(completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): void;
}

declare class METrackReader extends NativeObject implements METrackReader {
}

declare interface MEFormatReader extends NSObjectProtocol {
  loadFileInfoWithCompletionHandler(completionHandler: (p1: MEFileInfo, p2: NSError) => void | null): void;

  loadMetadataWithCompletionHandler(completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): void;

  loadTrackReadersWithCompletionHandler(completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): void;

  parseAdditionalFragmentsWithCompletionHandler?(completionHandler: (p1: interop.Enum<typeof MEFormatReaderParseAdditionalFragmentsStatus>, p2: NSError) => void | null): void;
}

declare class MEFormatReader extends NativeObject implements MEFormatReader {
}

declare interface MERAWProcessorExtension extends NSObjectProtocol {
  init(): this;

  processorWithFormatDescriptionExtensionPixelBufferManagerError(formatDescription: interop.PointerConvertible, extensionPixelBufferManager: MERAWProcessorPixelBufferManager, error: interop.PointerConvertible): MERAWProcessor | null;
}

declare class MERAWProcessorExtension extends NativeObject implements MERAWProcessorExtension {
}

declare interface MEVideoDecoderExtension extends NSObjectProtocol {
  init(): this;

  videoDecoderWithCodecTypeVideoFormatDescriptionVideoDecoderSpecificationsExtensionDecoderPixelBufferManagerError(codecType: number, videoFormatDescription: interop.PointerConvertible, videoDecoderSpecifications: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, extensionDecoderPixelBufferManager: MEVideoDecoderPixelBufferManager, error: interop.PointerConvertible): MEVideoDecoder | null;
}

declare class MEVideoDecoderExtension extends NativeObject implements MEVideoDecoderExtension {
}

declare class MERAWProcessingParameter extends NSObject {
  readonly name: string;

  readonly key: string;

  readonly longDescription: string;

  enabled: boolean;

  setEnabled(enabled: boolean): void;
}

declare class MERAWProcessorPixelBufferManager extends NSObject {
  get pixelBufferAttributes(): NSDictionary;
  set pixelBufferAttributes(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  createPixelBufferAndReturnError(error: interop.PointerConvertible): interop.Pointer;

  setPixelBufferAttributes(pixelBufferAttributes: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;
}

declare class MERAWProcessingSubGroupParameter extends MERAWProcessingParameter {
  initWithNameDescriptionParameters(name: string, description: string, parameters: NSArray<interop.Object> | Array<interop.Object>): this;

  readonly subGroupParameters: NSArray;
}

declare class MERAWProcessingIntegerParameter extends MERAWProcessingParameter {
  initWithNameKeyDescriptionInitialValueMaximumMinimum(name: string, key: string, description: string, initialValue: number, maximum: number, minimum: number): this;

  initWithNameKeyDescriptionInitialValueMaximumMinimumNeutralValue(name: string, key: string, description: string, initialValue: number, maximum: number, minimum: number, neutralValue: number): this;

  initWithNameKeyDescriptionInitialValueMaximumMinimumCameraValue(name: string, key: string, description: string, initialValue: number, maximum: number, minimum: number, cameraValue: number): this;

  initWithNameKeyDescriptionInitialValueMaximumMinimumNeutralValueCameraValue(name: string, key: string, description: string, initialValue: number, maximum: number, minimum: number, neutralValue: number, cameraValue: number): this;

  readonly maximumValue: number;

  readonly minimumValue: number;

  readonly initialValue: number;

  currentValue: number;

  hasNeutralValue(outNeutralValue: interop.PointerConvertible): boolean;

  hasCameraValue(outCameraValue: interop.PointerConvertible): boolean;

  setCurrentValue(currentValue: number): void;
}

declare class MERAWProcessingBooleanParameter extends MERAWProcessingParameter {
  initWithNameKeyDescriptionInitialValue(name: string, key: string, description: string, initialValue: boolean): this;

  initWithNameKeyDescriptionInitialValueNeutralValue(name: string, key: string, description: string, initialValue: boolean, neutralValue: boolean): this;

  initWithNameKeyDescriptionInitialValueCameraValue(name: string, key: string, description: string, initialValue: boolean, cameraValue: boolean): this;

  initWithNameKeyDescriptionInitialValueNeutralValueCameraValue(name: string, key: string, description: string, initialValue: boolean, neutralValue: boolean, cameraValue: boolean): this;

  readonly initialValue: boolean;

  currentValue: boolean;

  hasNeutralValue(outNeutralValue: interop.PointerConvertible): boolean;

  hasCameraValue(outCameraValue: interop.PointerConvertible): boolean;

  setCurrentValue(currentValue: boolean): void;
}

declare class MEDecodeFrameOptions extends NSObject {
  doNotOutputFrame: boolean;

  realTimePlayback: boolean;

  setDoNotOutputFrame(doNotOutputFrame: boolean): void;

  setRealTimePlayback(realTimePlayback: boolean): void;
}

declare class MEVideoDecoderPixelBufferManager extends NSObject {
  get pixelBufferAttributes(): NSDictionary;
  set pixelBufferAttributes(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  createPixelBufferAndReturnError(error: interop.PointerConvertible): interop.Pointer;

  registerCustomPixelFormat(customPixelFormat: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  setPixelBufferAttributes(pixelBufferAttributes: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;
}

declare class MEHEVCDependencyInfo extends NSObject implements NSCopying {
  temporalSubLayerAccess: boolean;

  stepwiseTemporalSubLayerAccess: boolean;

  syncSampleNALUnitType: number;

  hasTemporalSubLayerAccess(): boolean;

  setTemporalSubLayerAccess(temporalSubLayerAccess: boolean): void;

  hasStepwiseTemporalSubLayerAccess(): boolean;

  setStepwiseTemporalSubLayerAccess(stepwiseTemporalSubLayerAccess: boolean): void;

  setSyncSampleNALUnitType(syncSampleNALUnitType: number): void;

  temporalLevel: number;

  profileSpace: number;

  tierFlag: number;

  profileIndex: number;

  profileCompatibilityFlags: NSData;

  constraintIndicatorFlags: NSData;

  levelIndex: number;

  setTemporalLevel(temporalLevel: number): void;

  setProfileSpace(profileSpace: number): void;

  setTierFlag(tierFlag: number): void;

  setProfileIndex(profileIndex: number): void;

  setProfileCompatibilityFlags(profileCompatibilityFlags: NSData | null): void;

  setConstraintIndicatorFlags(constraintIndicatorFlags: NSData | null): void;

  setLevelIndex(levelIndex: number): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class MEEstimatedSampleLocation extends NSObject implements NSCopying {
  initWithByteSourceEstimatedSampleLocationRefinementDataLocation(byteSource: MEByteSource, estimatedSampleLocation: AVSampleCursorStorageRange, refinementDataLocation: AVSampleCursorStorageRange): this;

  readonly estimatedSampleLocation: AVSampleCursorStorageRange;

  readonly refinementDataLocation: AVSampleCursorStorageRange;

  readonly byteSource: MEByteSource;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class METrackInfo extends NSObject implements NSCopying {
  initWithMediaTypeTrackIDFormatDescriptions(mediaType: number, trackID: number, formatDescriptions: NSArray<interop.Object> | Array<interop.Object>): this;

  readonly mediaType: number;

  readonly trackID: number;

  enabled: boolean;

  readonly formatDescriptions: NSArray;

  isEnabled(): boolean;

  setEnabled(enabled: boolean): void;

  naturalTimescale: number;

  get trackEdits(): NSArray;
  set trackEdits(value: NSArray<interop.Object> | Array<interop.Object>);

  setNaturalTimescale(naturalTimescale: number): void;

  setTrackEdits(trackEdits: NSArray<interop.Object> | Array<interop.Object>): void;

  extendedLanguageTag: string;

  setExtendedLanguageTag(extendedLanguageTag: string | null): void;

  naturalSize: CGSize;

  preferredTransform: CGAffineTransform;

  nominalFrameRate: number;

  requiresFrameReordering: boolean;

  setNaturalSize(naturalSize: CGSize): void;

  setPreferredTransform(preferredTransform: CGAffineTransform): void;

  setNominalFrameRate(nominalFrameRate: number): void;

  setRequiresFrameReordering(requiresFrameReordering: boolean): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class MEFileInfo extends NSObject implements NSCopying {
  duration: CMTime;

  fragmentsStatus: interop.Enum<typeof MEFileInfoFragmentsStatus>;

  setDuration(duration: CMTime): void;

  setFragmentsStatus(fragmentsStatus: interop.Enum<typeof MEFileInfoFragmentsStatus>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class MERAWProcessingListElementParameter extends MERAWProcessingParameter {
  initWithNameDescriptionElementID(name: string, description: string, elementID: number): this;

  readonly listElementID: number;
}

declare class MEFormatReaderInstantiationOptions extends NSObject implements NSCopying {
  readonly allowIncrementalFragmentParsing: boolean;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class MERAWProcessingFloatParameter extends MERAWProcessingParameter {
  initWithNameKeyDescriptionInitialValueMaximumMinimum(name: string, key: string, description: string, initialValue: number, maximum: number, minimum: number): this;

  initWithNameKeyDescriptionInitialValueMaximumMinimumNeutralValue(name: string, key: string, description: string, initialValue: number, maximum: number, minimum: number, neutralValue: number): this;

  initWithNameKeyDescriptionInitialValueMaximumMinimumCameraValue(name: string, key: string, description: string, initialValue: number, maximum: number, minimum: number, cameraValue: number): this;

  initWithNameKeyDescriptionInitialValueMaximumMinimumNeutralValueCameraValue(name: string, key: string, description: string, initialValue: number, maximum: number, minimum: number, neutralValue: number, cameraValue: number): this;

  readonly maximumValue: number;

  readonly minimumValue: number;

  readonly initialValue: number;

  currentValue: number;

  hasNeutralValue(outNeutralValue: interop.PointerConvertible): boolean;

  hasCameraValue(outCameraValue: interop.PointerConvertible): boolean;

  setCurrentValue(currentValue: number): void;
}

declare class MEByteSource extends NSObject {
  readonly fileName: string;

  readonly contentType: UTType;

  readonly fileLength: number;

  readonly relatedFileNamesInSameDirectory: NSArray;

  readDataOfLengthFromOffsetToDestinationCompletionHandler(length: number, offset: number, dest: interop.PointerConvertible, completionHandler: (p1: number, p2: NSError) => void | null): void;

  readDataOfLengthFromOffsetCompletionHandler(length: number, offset: number, completionHandler: (p1: NSData, p2: NSError) => void | null): void;

  readDataOfLengthFromOffsetToDestinationBytesReadError(length: number, offset: number, dest: interop.PointerConvertible, bytesReadOut: interop.PointerConvertible, error: interop.PointerConvertible): boolean;

  availableLengthAtOffset(offset: number): number;

  byteSourceForRelatedFileNameError(fileName: string, errorOut: interop.PointerConvertible): MEByteSource | null;
}

declare class MESampleLocation extends NSObject implements NSCopying {
  initWithByteSourceSampleLocation(byteSource: MEByteSource, sampleLocation: AVSampleCursorStorageRange): this;

  readonly sampleLocation: AVSampleCursorStorageRange;

  readonly byteSource: MEByteSource;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class MESampleCursorChunk extends NSObject implements NSCopying {
  initWithByteSourceChunkStorageRangeChunkInfoSampleIndexWithinChunk(byteSource: MEByteSource, chunkStorageRange: AVSampleCursorStorageRange, chunkInfo: AVSampleCursorChunkInfo, sampleIndexWithinChunk: number): this;

  readonly byteSource: MEByteSource;

  readonly chunkStorageRange: AVSampleCursorStorageRange;

  readonly chunkInfo: AVSampleCursorChunkInfo;

  readonly sampleIndexWithinChunk: number;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class MERAWProcessingListParameter extends MERAWProcessingParameter {
  initWithNameKeyDescriptionListInitialValue(name: string, key: string, description: string, listElements: NSArray<interop.Object> | Array<interop.Object>, initialValue: number): this;

  initWithNameKeyDescriptionListInitialValueNeutralValue(name: string, key: string, description: string, listElements: NSArray<interop.Object> | Array<interop.Object>, initialValue: number, neutralValue: number): this;

  initWithNameKeyDescriptionListInitialValueCameraValue(name: string, key: string, description: string, listElements: NSArray<interop.Object> | Array<interop.Object>, initialValue: number, cameraValue: number): this;

  initWithNameKeyDescriptionListInitialValueNeutralValueCameraValue(name: string, key: string, description: string, listElements: NSArray<interop.Object> | Array<interop.Object>, initialValue: number, neutralValue: number, cameraValue: number): this;

  readonly listElements: NSArray;

  readonly initialValue: number;

  currentValue: number;

  hasNeutralValue(outNeutralValue: interop.PointerConvertible): boolean;

  hasCameraValue(outCameraValue: interop.PointerConvertible): boolean;

  setCurrentValue(currentValue: number): void;
}


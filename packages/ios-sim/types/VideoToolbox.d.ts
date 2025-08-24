/// <reference types="@nativescript/objc-node-api" />

declare const kVTHDRPerFrameMetadataGenerationOptionsKey_HDRFormats: interop.Pointer;

declare const kVTHDRPerFrameMetadataGenerationHDRFormatType_DolbyVision: interop.Pointer;

declare const kVTPixelRotationPropertyKey_FlipHorizontalOrientation: interop.Pointer;

declare const kVTRotation_CCW90: interop.Pointer;

declare const kVTRotation_0: interop.Pointer;

declare const kVTPixelRotationPropertyKey_Rotation: interop.Pointer;

declare const kVTPixelTransferPropertyKey_RealTime: interop.Pointer;

declare const kVTPixelTransferPropertyKey_DestinationYCbCrMatrix: interop.Pointer;

declare const kVTPixelTransferPropertyKey_DestinationICCProfile: interop.Pointer;

declare const kVTPixelTransferPropertyKey_DestinationTransferFunction: interop.Pointer;

declare const kVTPixelTransferPropertyKey_DestinationColorPrimaries: interop.Pointer;

declare const kVTDownsamplingMode_Decimate: interop.Pointer;

declare const kVTPixelTransferPropertyKey_DestinationPixelAspectRatio: interop.Pointer;

declare const kVTPixelTransferPropertyKey_DestinationCleanAperture: interop.Pointer;

declare const kVTScalingMode_Trim: interop.Pointer;

declare const kVTScalingMode_Letterbox: interop.Pointer;

declare const kVTScalingMode_Normal: interop.Pointer;

declare const kVTVideoEncoderList_InstanceLimit: interop.Pointer;

declare const kVTVideoEncoderList_QualityRating: interop.Pointer;

declare const kVTVideoEncoderList_SupportedSelectionProperties: interop.Pointer;

declare const kVTVideoEncoderList_GPURegistryID: interop.Pointer;

declare const kVTVideoEncoderList_EncoderName: interop.Pointer;

declare const kVTVideoEncoderList_CodecName: interop.Pointer;

declare const kVTVideoEncoderListOption_IncludeStandardDefinitionDVEncoders: interop.Pointer;

declare const kVTMultiPassStorageCreationOption_DoNotDelete: interop.Pointer;

declare const kVTDecompressionPropertyKey_RequestedMVHEVCVideoLayerIDs: interop.Pointer;

declare const kVTDecompressionPropertyKey_PropagatePerFrameHDRDisplayMetadata: interop.Pointer;

declare const kVTVideoDecoderSpecification_PreferredDecoderGPURegistryID: interop.Pointer;

declare const kVTVideoDecoderSpecification_RequiredDecoderGPURegistryID: interop.Pointer;

declare const kVTDecompressionPropertyKey_PixelTransferProperties: interop.Pointer;

declare const kVTDecompressionPropertyKey_SupportedPixelFormatsOrderedByPerformance: interop.Pointer;

declare const kVTDecompressionPropertyKey_SupportedPixelFormatsOrderedByQuality: interop.Pointer;

declare const kVTDecompressionPropertyKey_SuggestedQualityOfServiceTiers: interop.Pointer;

declare const kVTDecompressionProperty_OnlyTheseFrames_KeyFrames: interop.Pointer;

declare const kVTDecompressionProperty_OnlyTheseFrames_AllFrames: interop.Pointer;

declare const kVTDecompressionPropertyKey_ReducedFrameDelivery: interop.Pointer;

declare const kVTDecompressionResolutionKey_Height: interop.Pointer;

declare const kVTDecompressionResolutionKey_Width: interop.Pointer;

declare const kVTDecompressionPropertyKey_ReducedResolutionDecode: interop.Pointer;

declare const kVTDecompressionProperty_FieldMode_DeinterlaceFields: interop.Pointer;

declare const kVTDecompressionProperty_FieldMode_SingleField: interop.Pointer;

declare const kVTDecompressionProperty_FieldMode_BottomFieldOnly: interop.Pointer;

declare const kVTDecompressionProperty_FieldMode_BothFields: interop.Pointer;

declare const kVTDecompressionPropertyKey_FieldMode: interop.Pointer;

declare const kVTDecompressionPropertyKey_ThreadCount: interop.Pointer;

declare const kVTDecompressionPropertyKey_MaximizePowerEfficiency: interop.Pointer;

declare const kVTDecompressionPropertyKey_RealTime: interop.Pointer;

declare const kVTDecompressionPropertyKey_ContentHasInterframeDependencies: interop.Pointer;

declare const kVTDecompressionPropertyKey_MinOutputPresentationTimeStampOfFramesBeingDecoded: interop.Pointer;

declare const kVTDecompressionPropertyKey_OutputPoolRequestedMinimumBufferCount: interop.Pointer;

declare const kVTVideoEncoderSpecification_EncoderID: interop.Pointer;

declare const kVTPropertySupportedValueListKey: interop.Pointer;

declare const kVTPropertySupportedValueMaximumKey: interop.Pointer;

declare const kVTPropertyReadWriteStatusKey: interop.Pointer;

declare const kVTPropertyType_Number: interop.Pointer;

declare const kVTPropertyType_Boolean: interop.Pointer;

declare const kVTPropertyTypeKey: interop.Pointer;

declare const kVTCouldNotOutputTaggedBufferGroupErr: number;

declare const kVTVideoEncoderMVHEVCVideoLayerIDsMismatchErr: number;

declare const kVTVideoDecoderCallbackMessagingErr: number;

declare const kVTVideoDecoderNeedsRosettaErr: number;

declare const kVTSessionMalfunctionErr: number;

declare const kVTVideoDecoderRemovedErr: number;

declare const kVTCouldNotFindTemporalFilterErr: number;

declare const kVTFrameSiloInvalidTimeRangeErr: number;

declare const kVTFrameSiloInvalidTimeStampErr: number;

declare const kVTMultiPassStorageIdentifierMismatchErr: number;

declare const kVTColorCorrectionPixelTransferFailedErr: number;

declare const kVTVideoEncoderAuthorizationErr: number;

declare const kVTVideoDecoderAuthorizationErr: number;

declare const kVTColorSyncTransformConvertFailedErr: number;

declare const kVTCouldNotCreateColorCorrectionDataErr: number;

declare const kVTInsufficientSourceColorDataErr: number;

declare const kVTVideoEncoderNotAvailableNowErr: number;

declare const kVTPixelRotationNotSupportedErr: number;

declare const kVTVideoEncoderMalfunctionErr: number;

declare const kVTVideoDecoderMalfunctionErr: number;

declare const kVTVideoDecoderUnsupportedDataFormatErr: number;

declare const kVTCouldNotCreateInstanceErr: number;

declare const kVTCouldNotFindVideoDecoderErr: number;

declare const kVTPixelTransferNotSupportedErr: number;

declare const kVTAllocationFailedErr: number;

declare const kVTQPModulationLevel_Disable: number;

declare const kVTQPModulationLevel_Default: number;

declare const kVTCompressionPropertyKey_ProjectionKind: interop.Pointer;

declare const kVTCompressionPropertyKey_HorizontalDisparityAdjustment: interop.Pointer;

declare const kVTCompressionPropertyKey_MVHEVCViewIDs: interop.Pointer;

declare const kVTCompressionPropertyKey_MVHEVCVideoLayerIDs: interop.Pointer;

declare const kVTCompressionPropertyKey_EnableLTR: interop.Pointer;

declare const kVTCompressionPropertyKey_EncoderID: interop.Pointer;

declare const kVTAlphaChannelMode_StraightAlpha: interop.Pointer;

declare const kVTCompressionPropertyKey_GammaLevel: interop.Pointer;

declare const kVTCompressionPropertyKey_MasteringDisplayColorVolume: interop.Pointer;

declare const kVTCompressionPropertyKey_ICCProfile: interop.Pointer;

declare const kVTCompressionPropertyKey_FieldDetail: interop.Pointer;

declare const kVTCompressionPropertyKey_CleanAperture: interop.Pointer;

declare const kVTEncodeFrameOptionKey_ForceKeyFrame: interop.Pointer;

declare const kVTCompressionPropertyKey_SupportsBaseFrameQP: interop.Pointer;

declare const kVTCompressionPropertyKey_UsingGPURegistryID: interop.Pointer;

declare const kVTVideoEncoderSpecification_PreferredEncoderGPURegistryID: interop.Pointer;

declare const kVTVideoEncoderSpecification_RequiredEncoderGPURegistryID: interop.Pointer;

declare const kVTCompressionPropertyKey_UsingHardwareAcceleratedVideoEncoder: interop.Pointer;

declare const kVTVideoEncoderSpecification_RequireHardwareAcceleratedVideoEncoder: interop.Pointer;

declare const kVTSampleAttachmentKey_QualityMetrics: interop.Pointer;

declare const kVTCompressionPropertyKey_CalculateMeanSquaredError: interop.Pointer;

declare const kVTCompressionPropertyKey_ReferenceBufferCount: interop.Pointer;

declare const kVTCompressionPropertyKey_BaseLayerFrameRate: interop.Pointer;

declare const kVTCompressionPropertyKey_BaseLayerBitRateFraction: interop.Pointer;

declare const kVTCompressionPropertyKey_BaseLayerFrameRateFraction: interop.Pointer;

declare const kVTCompressionPropertyKey_MaximumRealTimeFrameRate: interop.Pointer;

declare const kVTCompressionPropertyKey_ExpectedFrameRate: interop.Pointer;

declare const kVTCompressionPropertyKey_MaximizePowerEfficiency: interop.Pointer;

declare const kVTUnlimitedFrameDelayCount: number;

declare const kVTCompressionPropertyKey_MaxFrameDelayCount: interop.Pointer;

declare const kVTCompressionPropertyKey_Depth: interop.Pointer;

declare const kVTH264EntropyMode_CAVLC: interop.Pointer;

declare const kVTHDRMetadataInsertionMode_Auto: interop.Pointer;

declare const kVTCompressionPropertyKey_HDRMetadataInsertionMode: interop.Pointer;

declare const kVTProfileLevel_H263_Profile3_Level45: interop.Pointer;

declare const kVTProfileLevel_H263_Profile0_Level45: interop.Pointer;

declare const kVTProfileLevel_MP4V_AdvancedSimple_L4: interop.Pointer;

declare const kVTProfileLevel_MP4V_AdvancedSimple_L3: interop.Pointer;

declare const kVTProfileLevel_MP4V_AdvancedSimple_L1: interop.Pointer;

declare const kVTProfileLevel_MP4V_AdvancedSimple_L0: interop.Pointer;

declare const kVTProfileLevel_MP4V_Main_L4: interop.Pointer;

declare const kVTProfileLevel_MP4V_Main_L3: interop.Pointer;

declare const kVTProfileLevel_MP4V_Simple_L2: interop.Pointer;

declare const kVTProfileLevel_MP4V_Simple_L1: interop.Pointer;

declare const kVTProfileLevel_MP4V_Simple_L0: interop.Pointer;

declare const kVTProfileLevel_H264_ConstrainedHigh_AutoLevel: interop.Pointer;

declare const kVTProfileLevel_H264_High_5_2: interop.Pointer;

declare const kVTProfileLevel_H264_High_5_1: interop.Pointer;

declare const kVTProfileLevel_H264_High_4_1: interop.Pointer;

declare const kVTProfileLevel_H264_High_3_2: interop.Pointer;

declare const kVTProfileLevel_H264_High_3_1: interop.Pointer;

declare const kVTProfileLevel_H264_Extended_AutoLevel: interop.Pointer;

declare const kVTProfileLevel_H264_Extended_5_0: interop.Pointer;

declare const kVTProfileLevel_H264_Main_AutoLevel: interop.Pointer;

declare const kVTProfileLevel_H264_Main_5_2: interop.Pointer;

declare const kVTProfileLevel_H264_Main_5_0: interop.Pointer;

declare const kVTProfileLevel_H264_Main_4_2: interop.Pointer;

declare const kVTProfileLevel_H264_Main_4_1: interop.Pointer;

declare const kVTProfileLevel_H264_Main_3_1: interop.Pointer;

declare const kVTProfileLevel_H264_Baseline_5_2: interop.Pointer;

declare const kVTProfileLevel_H264_Baseline_4_1: interop.Pointer;

declare const kVTProfileLevel_H264_Baseline_3_1: interop.Pointer;

declare const kVTProfileLevel_H264_Baseline_3_0: interop.Pointer;

declare const kVTProfileLevel_H264_Baseline_1_3: interop.Pointer;

declare const kVTProfileLevel_HEVC_Main42210_AutoLevel: interop.Pointer;

declare const kVTProfileLevel_HEVC_Main10_AutoLevel: interop.Pointer;

declare const kVTProfileLevel_HEVC_Main_AutoLevel: interop.Pointer;

declare const kVTCompressionPropertyKey_ProfileLevel: interop.Pointer;

declare const kVTCompressionPropertyKey_EstimatedAverageBytesPerFrame: interop.Pointer;

declare const kVTCompressionPropertyKey_ConstantBitRate: interop.Pointer;

declare const kVTCompressionPropertyKey_PrioritizeEncodingSpeedOverQuality: interop.Pointer;

declare const kVTCompressionPropertyKey_MoreFramesAfterEnd: interop.Pointer;

declare const kVTCompressionPropertyKey_Quality: interop.Pointer;

declare const kVTCompressionPropertyKey_DataRateLimits: interop.Pointer;

declare const kVTCompressionPropertyKey_AverageBitRate: interop.Pointer;

declare const kVTCompressionPropertyKey_AllowOpenGOP: interop.Pointer;

declare const kVTCompressionPropertyKey_AllowFrameReordering: interop.Pointer;

declare const kVTCompressionPropertyKey_AllowTemporalCompression: interop.Pointer;

declare const kVTCompressionPropertyKey_PixelBufferPoolIsShared: interop.Pointer;

declare const kVTCompressionPropertyKey_NumberOfPendingFrames: interop.Pointer;

declare const kVTPropertyReadWriteStatus_ReadOnly: interop.Pointer;

declare const kVTPropertySupportedValueMinimumKey: interop.Pointer;

declare const kVTProfileLevel_H263_Profile0_Level10: interop.Pointer;

declare const kVTCompressionPropertyKey_TargetQualityForAlpha: interop.Pointer;

declare const kVTVideoEncoderList_DisplayName: interop.Pointer;

declare const kVTPixelTransferNotPermittedErr: number;

declare const kVTDecompressionPropertyKey_UsingHardwareAcceleratedVideoDecoder: interop.Pointer;

declare const kVTCompressionPropertyKey_ExpectedDuration: interop.Pointer;

declare const kVTVideoEncoderList_IsHardwareAccelerated: interop.Pointer;

declare const kVTPropertyReadWriteStatus_ReadWrite: interop.Pointer;

declare const kVTVideoDecoderUnknownErr: number;

declare const kVTVideoDecoderSpecification_EnableHardwareAcceleratedVideoDecoder: interop.Pointer;

declare const kVTPropertyShouldBeSerializedKey: interop.Pointer;

declare const kVTDecompressionProperty_DeinterlaceMode_Temporal: interop.Pointer;

declare const kVTVideoEncoderList_CodecType: interop.Pointer;

declare const kVTHDRMetadataInsertionMode_None: interop.Pointer;

declare const kVTCompressionPropertyKey_MaxKeyFrameIntervalDuration: interop.Pointer;

declare const kVTCompressionPropertyKey_PixelAspectRatio: interop.Pointer;

declare const kVTDecompressionPropertyKey_OnlyTheseFrames: interop.Pointer;

declare const kVTMultiPassStorageInvalidErr: number;

declare const kVTProfileLevel_H264_Baseline_3_2: interop.Pointer;

declare const kVTProfileLevel_MP4V_AdvancedSimple_L2: interop.Pointer;

declare const kVTSampleAttachmentQualityMetricsKey_ChromaRedMeanSquaredError: interop.Pointer;

declare const kVTEncodeFrameOptionKey_BaseFrameQP: interop.Pointer;

declare const kVTProfileLevel_H264_High_AutoLevel: interop.Pointer;

declare const kVTDecompressionPropertyKey_MaxOutputPresentationTimeStampOfFramesBeingDecoded: interop.Pointer;

declare const kVTProfileLevel_H264_Baseline_4_2: interop.Pointer;

declare const kVTVideoDecoderNotAvailableNowErr: number;

declare const kVTCompressionPropertyKey_HorizontalFieldOfView: interop.Pointer;

declare const kVTProfileLevel_H264_High_3_0: interop.Pointer;

declare const kVTDecompressionPropertyKey_PixelBufferPoolIsShared: interop.Pointer;

declare const kVTEncodeFrameOptionKey_AcknowledgedLTRTokens: interop.Pointer;

declare const kVTVideoEncoderSpecification_EnableHardwareAcceleratedVideoEncoder: interop.Pointer;

declare const kVTCompressionPropertyKey_MinAllowedFrameQP: interop.Pointer;

declare const kVTPropertyType_Enumeration: interop.Pointer;

declare const kVTCompressionPropertyKey_ColorPrimaries: interop.Pointer;

declare const kVTDecompressionPropertyKey_PixelFormatsWithReducedResolutionSupport: interop.Pointer;

declare const kVTCompressionPropertyKey_YCbCrMatrix: interop.Pointer;

declare const kVTExtensionDisabledErr: number;

declare const kVTDecompressionProperty_OnlyTheseFrames_NonDroppableFrames: interop.Pointer;

declare const kVTCompressionPropertyKey_MoreFramesBeforeStart: interop.Pointer;

declare const kVTCompressionPropertyKey_VideoEncoderPixelBufferAttributes: interop.Pointer;

declare const kVTCouldNotFindExtensionErr: number;

declare const kVTVideoEncoderList_EncoderID: interop.Pointer;

declare const kVTCompressionPropertyKey_MaxAllowedFrameQP: interop.Pointer;

declare const kVTVideoEncoderSpecification_EnableLowLatencyRateControl: interop.Pointer;

declare const kVTDecompressionPropertyKey_DeinterlaceMode: interop.Pointer;

declare const kVTDecompressionPropertyKey_GeneratePerFrameHDRDisplayMetadata: interop.Pointer;

declare const kVTSampleAttachmentKey_RequireLTRAcknowledgementToken: interop.Pointer;

declare const kVTCompressionPropertyKey_MaxKeyFrameInterval: interop.Pointer;

declare const kVTCompressionPropertyKey_HeroEye: interop.Pointer;

declare const kVTImageRotationNotSupportedErr: number;

declare const kVTVideoEncoderNeedsRosettaErr: number;

declare const kVTVideoDecoderSpecification_RequireHardwareAcceleratedVideoDecoder: interop.Pointer;

declare const kVTProfileLevel_H264_Main_3_2: interop.Pointer;

declare const kVTFormatDescriptionChangeNotSupportedErr: number;

declare const kVTProfileLevel_H264_High_4_2: interop.Pointer;

declare const kVTExtensionConflictErr: number;

declare const kVTDecompressionPropertyKey_UsingGPURegistryID: interop.Pointer;

declare const kVTRotation_180: interop.Pointer;

declare const kVTCompressionPropertyKey_AspectRatio16x9: interop.Pointer;

declare const kVTSampleAttachmentQualityMetricsKey_LumaMeanSquaredError: interop.Pointer;

declare const kVTDecompressionPropertyKey_AllowBitstreamToChangeFrameDimensions: interop.Pointer;

declare const kVTProfileLevel_H264_ConstrainedBaseline_AutoLevel: interop.Pointer;

declare const kVTProfileLevel_MP4V_Simple_L3: interop.Pointer;

declare const kVTDownsamplingMode_Average: interop.Pointer;

declare const kVTProfileLevel_H264_Main_5_1: interop.Pointer;

declare const kVTProfileLevel_HEVC_Monochrome_AutoLevel: interop.Pointer;

declare const kVTCompressionPropertyKey_SourceFrameCount: interop.Pointer;

declare const kVTCompressionPropertyKey_RealTime: interop.Pointer;

declare const kVTDecompressionProperty_DeinterlaceMode_VerticalFilter: interop.Pointer;

declare const kVTCompressionPropertyKey_AlphaChannelMode: interop.Pointer;

declare const kVTDecompressionProperty_OnlyTheseFrames_IFrames: interop.Pointer;

declare const kVTCompressionPropertyKey_StereoCameraBaseline: interop.Pointer;

declare const kVTCompressionPropertyKey_TransferFunction: interop.Pointer;

declare const kVTProfileLevel_H264_Baseline_5_1: interop.Pointer;

declare const kVTCompressionPropertyKey_MVHEVCLeftAndRightViewIDs: interop.Pointer;

declare const kVTEncodeFrameOptionKey_ForceLTRRefresh: interop.Pointer;

declare const kVTRotation_CW90: interop.Pointer;

declare const kVTCompressionPropertyKey_PixelTransferProperties: interop.Pointer;

declare const kVTProfileLevel_H264_Baseline_4_0: interop.Pointer;

declare const kVTVideoEncoderList_PerformanceRating: interop.Pointer;

declare const kVTProfileLevel_MP4V_Main_L2: interop.Pointer;

declare const kVTCompressionPropertyKey_PreserveDynamicHDRMetadata: interop.Pointer;

declare const kVTVideoDecoderBadDataErr: number;

declare const kVTCompressionPropertyKey_OutputBitDepth: interop.Pointer;

declare const kVTCouldNotFindVideoEncoderErr: number;

declare const kVTPropertyNotSupportedErr: number;

declare const kVTCompressionPropertyKey_PreserveAlphaChannel: interop.Pointer;

declare const kVTCompressionPropertyKey_FieldCount: interop.Pointer;

declare const kVTDecompressionProperty_TemporalLevelLimit: interop.Pointer;

declare const kVTPixelTransferPropertyKey_ScalingMode: interop.Pointer;

declare const kVTCompressionPropertyKey_ProgressiveScan: interop.Pointer;

declare const kVTCompressionPropertyKey_MaxH264SliceBytes: interop.Pointer;

declare const kVTDecompressionProperty_FieldMode_TopFieldOnly: interop.Pointer;

declare const kVTPixelTransferPropertyKey_DownsamplingMode: interop.Pointer;

declare const kVTVideoEncoderList_SupportsFrameReordering: interop.Pointer;

declare const kVTPixelRotationPropertyKey_FlipVerticalOrientation: interop.Pointer;

declare const kVTDecompressionPropertyKey_NumberOfFramesBeingDecoded: interop.Pointer;

declare const kVTProfileLevel_H264_Baseline_AutoLevel: interop.Pointer;

declare const kVTInvalidSessionErr: number;

declare const kVTCompressionPropertyKey_MultiPassStorage: interop.Pointer;

declare const kVTParameterErr: number;

declare const kVTColorCorrectionImageRotationFailedErr: number;

declare const kVTSampleAttachmentQualityMetricsKey_ChromaBlueMeanSquaredError: interop.Pointer;

declare const kVTCompressionPropertyKey_H264EntropyMode: interop.Pointer;

declare const kVTProfileLevel_H264_Main_3_0: interop.Pointer;

declare const kVTPropertyReadOnlyErr: number;

declare const kVTProfileLevel_H264_High_5_0: interop.Pointer;

declare const kVTDecompressionPropertyKey_ReducedCoefficientDecode: interop.Pointer;

declare const kVTCompressionPropertyKey_ContentLightLevelInfo: interop.Pointer;

declare const kVTProfileLevel_H264_High_4_0: interop.Pointer;

declare const kVTCompressionPropertyKey_ViewPackingKind: interop.Pointer;

declare const kVTAlphaChannelMode_PremultipliedAlpha: interop.Pointer;

declare const kVTCompressionPropertyKey_HasLeftStereoEyeView: interop.Pointer;

declare const kVTH264EntropyMode_CABAC: interop.Pointer;

declare const kVTProfileLevel_HEVC_Monochrome10_AutoLevel: interop.Pointer;

declare const kVTCompressionPropertyKey_HasRightStereoEyeView: interop.Pointer;

declare const kVTScalingMode_CropSourceToCleanAperture: interop.Pointer;

declare const kVTProfileLevel_H264_Baseline_5_0: interop.Pointer;

declare const kVTPropertyDocumentationKey: interop.Pointer;

declare const kVTProfileLevel_H264_Main_4_0: interop.Pointer;

declare const kVTDecompressionPropertyKey_PixelBufferPool: interop.Pointer;

declare const kVTVideoDecoderReferenceMissingErr: number;

declare const VTCompressionSessionOptionFlags: {
  kVTCompressionSessionBeginFinalPass: 1,
};

declare const VTEncodeInfoFlags: {
  Asynchronous: 1,
  FrameDropped: 2,
};

declare const VTDecodeInfoFlags: {
  Asynchronous: 1,
  FrameDropped: 2,
  ImageBufferModifiable: 4,
  SkippedLeadingFrameDropped: 8,
};

declare const VTDecodeFrameFlags: {
  Frame_EnableAsynchronousDecompression: 1,
  Frame_DoNotOutputFrame: 2,
  Frame_1xRealTimePlayback: 4,
  Frame_EnableTemporalProcessing: 8,
};

declare class OpaqueVTMultiPassStorage {
  constructor(init?: OpaqueVTMultiPassStorage);
}

declare class OpaqueVTFrameSilo {
  constructor(init?: OpaqueVTFrameSilo);
}

declare class VTDecompressionOutputCallbackRecord {
  constructor(init?: VTDecompressionOutputCallbackRecord);
  decompressionOutputCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.Enum<typeof VTDecodeInfoFlags>, p5: interop.PointerConvertible, p6: CMTime, p7: CMTime) => void | null;
  decompressionOutputRefCon: interop.Pointer;
}

declare class OpaqueVTDecompressionSession {
  constructor(init?: OpaqueVTDecompressionSession);
}

declare class OpaqueVTCompressionSession {
  constructor(init?: OpaqueVTCompressionSession);
}

declare class VTInt32Point {
  constructor(init?: VTInt32Point);
  x: number;
  y: number;
}

declare class OpaqueVTPixelTransferSession {
  constructor(init?: OpaqueVTPixelTransferSession);
}

declare class VTInt32Size {
  constructor(init?: VTInt32Size);
  width: number;
  height: number;
}

declare class OpaqueVTPixelRotationSession {
  constructor(init?: OpaqueVTPixelRotationSession);
}

declare class OpaqueVTHDRPerFrameMetadataGenerationSession {
  constructor(init?: OpaqueVTHDRPerFrameMetadataGenerationSession);
}

declare function VTSessionCopySupportedPropertyDictionary(session: interop.Object, supportedPropertyDictionaryOut: interop.PointerConvertible): number;

declare function VTSessionSetProperty(session: interop.Object, propertyKey: interop.Object, propertyValue: interop.Object): number;

declare function VTSessionCopyProperty(session: interop.Object, propertyKey: interop.Object, allocator: interop.Object, propertyValueOut: interop.PointerConvertible): number;

declare function VTSessionSetProperties(session: interop.Object, propertyDictionary: interop.Object): number;

declare function VTSessionCopySerializableProperties(session: interop.Object, allocator: interop.Object, dictionaryOut: interop.PointerConvertible): number;

declare function VTCompressionSessionCreate(allocator: interop.Object, width: number, height: number, codecType: number, encoderSpecification: interop.Object, sourceImageBufferAttributes: interop.Object, compressedDataAllocator: interop.Object, outputCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.Enum<typeof VTEncodeInfoFlags>, p5: interop.PointerConvertible) => void, outputCallbackRefCon: interop.PointerConvertible, compressionSessionOut: interop.PointerConvertible): number;

declare function VTCompressionSessionInvalidate(session: interop.Object): void;

declare function VTCompressionSessionGetTypeID(): number;

declare function VTCompressionSessionGetPixelBufferPool(session: interop.Object): interop.Object;

declare function VTCompressionSessionPrepareToEncodeFrames(session: interop.Object): number;

declare function VTCompressionSessionEncodeFrame(session: interop.Object, imageBuffer: interop.Object, presentationTimeStamp: CMTime, duration: CMTime, frameProperties: interop.Object, sourceFrameRefcon: interop.PointerConvertible, infoFlagsOut: interop.PointerConvertible): number;

declare function VTCompressionSessionEncodeFrameWithOutputHandler(session: interop.Object, imageBuffer: interop.Object, presentationTimeStamp: CMTime, duration: CMTime, frameProperties: interop.Object, infoFlagsOut: interop.PointerConvertible, outputHandler: (p1: number, p2: interop.Enum<typeof VTEncodeInfoFlags>, p3: interop.PointerConvertible) => void): number;

declare function VTCompressionSessionCompleteFrames(session: interop.Object, completeUntilPresentationTimeStamp: CMTime): number;

declare function VTIsStereoMVHEVCEncodeSupported(): number;

declare function VTCompressionSessionEncodeMultiImageFrame(session: interop.Object, taggedBufferGroup: interop.PointerConvertible, presentationTimeStamp: CMTime, duration: CMTime, frameProperties: interop.Object, sourceFrameRefcon: interop.PointerConvertible, infoFlagsOut: interop.PointerConvertible): number;

declare function VTCompressionSessionEncodeMultiImageFrameWithOutputHandler(session: interop.Object, taggedBufferGroup: interop.PointerConvertible, presentationTimeStamp: CMTime, duration: CMTime, frameProperties: interop.Object, infoFlagsOut: interop.PointerConvertible, outputHandler: (p1: number, p2: interop.Enum<typeof VTEncodeInfoFlags>, p3: interop.PointerConvertible) => void): number;

declare function VTCompressionSessionBeginPass(session: interop.Object, beginPassFlags: interop.Enum<typeof VTCompressionSessionOptionFlags>, reserved: interop.PointerConvertible): number;

declare function VTCompressionSessionEndPass(session: interop.Object, furtherPassesRequestedOut: interop.PointerConvertible, reserved: interop.PointerConvertible): number;

declare function VTCompressionSessionGetTimeRangesForNextPass(session: interop.Object, timeRangeCountOut: interop.PointerConvertible, timeRangeArrayOut: interop.PointerConvertible): number;

declare function VTDecompressionSessionCreate(allocator: interop.Object, videoFormatDescription: interop.Object, videoDecoderSpecification: interop.Object, destinationImageBufferAttributes: interop.Object, outputCallback: interop.PointerConvertible, decompressionSessionOut: interop.PointerConvertible): number;

declare function VTDecompressionSessionInvalidate(session: interop.Object): void;

declare function VTDecompressionSessionGetTypeID(): number;

declare function VTDecompressionSessionDecodeFrame(session: interop.Object, sampleBuffer: interop.Object, decodeFlags: interop.Enum<typeof VTDecodeFrameFlags>, sourceFrameRefCon: interop.PointerConvertible, infoFlagsOut: interop.PointerConvertible): number;

declare function VTDecompressionSessionDecodeFrameWithOutputHandler(session: interop.Object, sampleBuffer: interop.Object, decodeFlags: interop.Enum<typeof VTDecodeFrameFlags>, infoFlagsOut: interop.PointerConvertible, outputHandler: (p1: number, p2: interop.Enum<typeof VTDecodeInfoFlags>, p3: interop.PointerConvertible, p4: CMTime, p5: CMTime) => void): number;

declare function VTDecompressionSessionFinishDelayedFrames(session: interop.Object): number;

declare function VTDecompressionSessionCanAcceptFormatDescription(session: interop.Object, newFormatDesc: interop.Object): number;

declare function VTDecompressionSessionWaitForAsynchronousFrames(session: interop.Object): number;

declare function VTDecompressionSessionCopyBlackPixelBuffer(session: interop.Object, pixelBufferOut: interop.PointerConvertible): number;

declare function VTIsHardwareDecodeSupported(codecType: number): number;

declare function VTIsStereoMVHEVCDecodeSupported(): number;

declare function VTDecompressionSessionSetMultiImageCallback(decompressionSession: interop.Object, outputMultiImageCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.Enum<typeof VTDecodeInfoFlags>, p5: interop.PointerConvertible, p6: CMTime, p7: CMTime) => void, outputMultiImageRefcon: interop.PointerConvertible): number;

declare function VTDecompressionSessionDecodeFrameWithMultiImageCapableOutputHandler(session: interop.Object, sampleBuffer: interop.Object, decodeFlags: interop.Enum<typeof VTDecodeFrameFlags>, infoFlagsOut: interop.PointerConvertible, multiImageCapableOutputHandler: (p1: number, p2: interop.Enum<typeof VTDecodeInfoFlags>, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: CMTime, p6: CMTime) => void): number;

declare function VTFrameSiloGetTypeID(): number;

declare function VTFrameSiloCreate(allocator: interop.Object, fileURL: interop.Object, timeRange: CMTimeRange, options: interop.Object, frameSiloOut: interop.PointerConvertible): number;

declare function VTFrameSiloAddSampleBuffer(silo: interop.Object, sampleBuffer: interop.Object): number;

declare function VTFrameSiloSetTimeRangesForNextPass(silo: interop.Object, timeRangeCount: number, timeRangeArray: interop.PointerConvertible): number;

declare function VTFrameSiloGetProgressOfCurrentPass(silo: interop.Object, progressOut: interop.PointerConvertible): number;

declare function VTFrameSiloCallFunctionForEachSampleBuffer(silo: interop.Object, timeRange: CMTimeRange, refcon: interop.PointerConvertible, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number): number;

declare function VTFrameSiloCallBlockForEachSampleBuffer(silo: interop.Object, timeRange: CMTimeRange, handler: (p1: interop.PointerConvertible) => number): number;

declare function VTMultiPassStorageGetTypeID(): number;

declare function VTMultiPassStorageCreate(allocator: interop.Object, fileURL: interop.Object, timeRange: CMTimeRange, options: interop.Object, multiPassStorageOut: interop.PointerConvertible): number;

declare function VTMultiPassStorageClose(multiPassStorage: interop.Object): number;

declare function VTCopyVideoEncoderList(options: interop.Object, listOfVideoEncodersOut: interop.PointerConvertible): number;

declare function VTCopySupportedPropertyDictionaryForEncoder(width: number, height: number, codecType: number, encoderSpecification: interop.Object, encoderIDOut: interop.PointerConvertible, supportedPropertiesOut: interop.PointerConvertible): number;

declare function VTCreateCGImageFromCVPixelBuffer(pixelBuffer: interop.Object, options: interop.Object, imageOut: interop.PointerConvertible): number;

declare function VTPixelTransferSessionCreate(allocator: interop.Object, pixelTransferSessionOut: interop.PointerConvertible): number;

declare function VTPixelTransferSessionInvalidate(session: interop.Object): void;

declare function VTPixelTransferSessionGetTypeID(): number;

declare function VTPixelTransferSessionTransferImage(session: interop.Object, sourceBuffer: interop.Object, destinationBuffer: interop.Object): number;

declare function VTPixelRotationSessionCreate(allocator: interop.Object, pixelRotationSessionOut: interop.PointerConvertible): number;

declare function VTPixelRotationSessionInvalidate(session: interop.PointerConvertible): void;

declare function VTPixelRotationSessionGetTypeID(): number;

declare function VTPixelRotationSessionRotateImage(session: interop.PointerConvertible, sourceBuffer: interop.Object, destinationBuffer: interop.Object): number;

declare function VTHDRPerFrameMetadataGenerationSessionGetTypeID(): number;

declare function VTHDRPerFrameMetadataGenerationSessionCreate(allocator: interop.Object, framesPerSecond: number, options: interop.Object, hdrPerFrameMetadataGenerationSessionOut: interop.PointerConvertible): number;

declare function VTHDRPerFrameMetadataGenerationSessionAttachMetadata(hdrPerFrameMetadataGenerationSession: interop.PointerConvertible, pixelBuffer: interop.Object, sceneChange: number): number;


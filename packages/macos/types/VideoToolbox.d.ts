/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const VTFrameProcessorErrorDomain: string;

declare const kVTMotionEstimationSessionCreationOption_MotionVectorSize: interop.Pointer;

declare const kVTRAWProcessingPropertyKey_MetadataForSidecarFile: interop.Pointer;

declare const kVTRAWProcessingPropertyKey_OutputColorAttachments: interop.Pointer;

declare const kVTRAWProcessingParameter_CurrentValue: interop.Pointer;

declare const kVTRAWProcessingParameter_CameraValue: interop.Pointer;

declare const kVTRAWProcessingParameter_NeutralValue: interop.Pointer;

declare const kVTRAWProcessingParameter_InitialValue: interop.Pointer;

declare const kVTRAWProcessingParameter_MinimumValue: interop.Pointer;

declare const kVTRAWProcessingParameter_SubGroup: interop.Pointer;

declare const kVTRAWProcessingParameterListElement_ListElementID: interop.Pointer;

declare const kVTRAWProcessingParameterListElement_Label: interop.Pointer;

declare const kVTRAWProcessingParameterValueType_SubGroup: interop.Pointer;

declare const kVTRAWProcessingParameterValueType_List: interop.Pointer;

declare const kVTRotation_CCW90: interop.Pointer;

declare const kVTRotation_180: interop.Pointer;

declare const kVTPixelTransferPropertyKey_RealTime: interop.Pointer;

declare const kVTPixelTransferPropertyKey_DestinationColorPrimaries: interop.Pointer;

declare const kVTDownsamplingMode_Average: interop.Pointer;

declare const kVTPixelTransferPropertyKey_DestinationCleanAperture: interop.Pointer;

declare const kVTScalingMode_Trim: interop.Pointer;

declare const kVTScalingMode_Letterbox: interop.Pointer;

declare const kVTScalingMode_CropSourceToCleanAperture: interop.Pointer;

declare const kVTPixelTransferPropertyKey_ScalingMode: interop.Pointer;

declare const kVTExtensionProperties_CodecNameKey: interop.Pointer;

declare const kVTExtensionProperties_ExtensionNameKey: interop.Pointer;

declare const kVTVideoEncoderList_IsHardwareAccelerated: interop.Pointer;

declare const kVTVideoEncoderList_InstanceLimit: interop.Pointer;

declare const kVTVideoEncoderList_PerformanceRating: interop.Pointer;

declare const kVTVideoEncoderList_SupportedSelectionProperties: interop.Pointer;

declare const kVTVideoEncoderList_DisplayName: interop.Pointer;

declare const kVTVideoEncoderList_CodecType: interop.Pointer;

declare const kVTDecompressionPropertyKey_GeneratePerFrameHDRDisplayMetadata: interop.Pointer;

declare const kVTDecompressionPropertyKey_PropagatePerFrameHDRDisplayMetadata: interop.Pointer;

declare const kVTDecompressionPropertyKey_UsingGPURegistryID: interop.Pointer;

declare const kVTVideoDecoderSpecification_RequiredDecoderGPURegistryID: interop.Pointer;

declare const kVTDecompressionPropertyKey_SupportedPixelFormatsOrderedByQuality: interop.Pointer;

declare const kVTDecompressionProperty_OnlyTheseFrames_KeyFrames: interop.Pointer;

declare const kVTDecompressionProperty_OnlyTheseFrames_NonDroppableFrames: interop.Pointer;

declare const kVTDecompressionProperty_OnlyTheseFrames_AllFrames: interop.Pointer;

declare const kVTDecompressionPropertyKey_ReducedFrameDelivery: interop.Pointer;

declare const kVTDecompressionResolutionKey_Width: interop.Pointer;

declare const kVTDecompressionProperty_DeinterlaceMode_VerticalFilter: interop.Pointer;

declare const kVTDecompressionPropertyKey_DeinterlaceMode: interop.Pointer;

declare const kVTDecompressionProperty_FieldMode_DeinterlaceFields: interop.Pointer;

declare const kVTDecompressionProperty_FieldMode_SingleField: interop.Pointer;

declare const kVTDecompressionProperty_FieldMode_BothFields: interop.Pointer;

declare const kVTDecompressionPropertyKey_ThreadCount: interop.Pointer;

declare const kVTDecompressionPropertyKey_MaximizePowerEfficiency: interop.Pointer;

declare const kVTDecompressionPropertyKey_RealTime: interop.Pointer;

declare const kVTDecompressionPropertyKey_UsingHardwareAcceleratedVideoDecoder: interop.Pointer;

declare const kVTVideoDecoderSpecification_RequireHardwareAcceleratedVideoDecoder: interop.Pointer;

declare const kVTDecompressionPropertyKey_MaxOutputPresentationTimeStampOfFramesBeingDecoded: interop.Pointer;

declare const kVTDecompressionPropertyKey_NumberOfFramesBeingDecoded: interop.Pointer;

declare const kVTDecompressionPropertyKey_OutputPoolRequestedMinimumBufferCount: interop.Pointer;

declare const kVTPropertyDocumentationKey: interop.Pointer;

declare const kVTPropertySupportedValueListKey: interop.Pointer;

declare const kVTPropertySupportedValueMaximumKey: interop.Pointer;

declare const kVTPropertySupportedValueMinimumKey: interop.Pointer;

declare const kVTPropertyReadWriteStatus_ReadWrite: interop.Pointer;

declare const kVTPropertyReadWriteStatus_ReadOnly: interop.Pointer;

declare const kVTPropertyReadWriteStatusKey: interop.Pointer;

declare const kVTExtensionConflictErr: number;

declare const kVTExtensionDisabledErr: number;

declare const kVTVideoDecoderUnknownErr: number;

declare const kVTVideoDecoderCallbackMessagingErr: number;

declare const kVTVideoDecoderReferenceMissingErr: number;

declare const kVTVideoEncoderNeedsRosettaErr: number;

declare const kVTSessionMalfunctionErr: number;

declare const kVTPixelTransferNotPermittedErr: number;

declare const kVTFrameSiloInvalidTimeRangeErr: number;

declare const kVTMultiPassStorageIdentifierMismatchErr: number;

declare const kVTFormatDescriptionChangeNotSupportedErr: number;

declare const kVTVideoEncoderNotAvailableNowErr: number;

declare const kVTVideoEncoderMalfunctionErr: number;

declare const kVTVideoDecoderUnsupportedDataFormatErr: number;

declare const kVTCouldNotFindVideoEncoderErr: number;

declare const kVTCouldNotCreateInstanceErr: number;

declare const kVTCouldNotFindVideoDecoderErr: number;

declare const kVTAllocationFailedErr: number;

declare const kVTInvalidSessionErr: number;

declare const kVTParameterErr: number;

declare const kVTPropertyReadOnlyErr: number;

declare const kVTQPModulationLevel_Disable: number;

declare const kVTQPModulationLevel_Default: number;

declare const kVTCompressionPropertyKey_SpatialAdaptiveQPLevel: interop.Pointer;

declare const kVTCompressionPropertyCameraCalibrationKey_ExtrinsicOrientationQuaternion: interop.Pointer;

declare const kVTCameraCalibrationExtrinsicOriginSource_StereoCameraSystemBaseline: interop.Pointer;

declare const kVTCompressionPropertyCameraCalibrationKey_ExtrinsicOriginSource: interop.Pointer;

declare const kVTCompressionPropertyCameraCalibrationKey_IntrinsicMatrixReferenceDimensions: interop.Pointer;

declare const kVTCompressionPropertyCameraCalibrationKey_IntrinsicMatrix: interop.Pointer;

declare const kVTCompressionPropertyCameraCalibrationKey_LensFrameAdjustmentsPolynomialX: interop.Pointer;

declare const kVTCompressionPropertyCameraCalibrationKey_RadialAngleLimit: interop.Pointer;

declare const kVTCompressionPropertyCameraCalibrationKey_LensDistortions: interop.Pointer;

declare const kVTCameraCalibrationLensRole_Right: interop.Pointer;

declare const kVTCameraCalibrationLensRole_Left: interop.Pointer;

declare const kVTCompressionPropertyCameraCalibrationKey_LensIdentifier: interop.Pointer;

declare const kVTCompressionPropertyKey_CameraCalibrationDataLensCollection: interop.Pointer;

declare const kVTViewPackingKind_OverUnder: interop.Pointer;

declare const kVTViewPackingKind_SideBySide: interop.Pointer;

declare const kVTCompressionPropertyKey_ViewPackingKind: interop.Pointer;

declare const kVTProjectionKind_HalfEquirectangular: interop.Pointer;

declare const kVTProjectionKind_Equirectangular: interop.Pointer;

declare const kVTCompressionPropertyKey_ProjectionKind: interop.Pointer;

declare const kVTCompressionPropertyKey_HasRightStereoEyeView: interop.Pointer;

declare const kVTCompressionPropertyKey_HorizontalDisparityAdjustment: interop.Pointer;

declare const kVTHeroEye_Left: interop.Pointer;

declare const kVTCompressionPropertyKey_MVHEVCLeftAndRightViewIDs: interop.Pointer;

declare const kVTSampleAttachmentKey_RequireLTRAcknowledgementToken: interop.Pointer;

declare const kVTEncodeFrameOptionKey_AcknowledgedLTRTokens: interop.Pointer;

declare const kVTCompressionPropertyKey_EnableLTR: interop.Pointer;

declare const kVTCompressionPropertyKey_MinAllowedFrameQP: interop.Pointer;

declare const kVTCompressionPropertyKey_MaxAllowedFrameQP: interop.Pointer;

declare const kVTVideoEncoderSpecification_EnableLowLatencyRateControl: interop.Pointer;

declare const kVTCompressionPropertyKey_PreserveDynamicHDRMetadata: interop.Pointer;

declare const kVTCompressionPropertyKey_RecommendedParallelizedSubdivisionMinimumFrameCount: interop.Pointer;

declare const kVTCompressionPropertyKey_EncoderID: interop.Pointer;

declare const kVTCompressionPropertyKey_MultiPassStorage: interop.Pointer;

declare const kVTCompressionPropertyKey_AlphaChannelMode: interop.Pointer;

declare const kVTCompressionPropertyKey_YCbCrMatrix: interop.Pointer;

declare const kVTCompressionPropertyKey_ColorPrimaries: interop.Pointer;

declare const kVTCompressionPropertyKey_AspectRatio16x9: interop.Pointer;

declare const kVTCompressionPropertyKey_FieldDetail: interop.Pointer;

declare const kVTCompressionPropertyKey_FieldCount: interop.Pointer;

declare const kVTCompressionPropertyKey_PixelAspectRatio: interop.Pointer;

declare const kVTCompressionPropertyKey_CleanAperture: interop.Pointer;

declare const kVTEncodeFrameOptionKey_ForceKeyFrame: interop.Pointer;

declare const kVTCompressionPropertyKey_SupportsBaseFrameQP: interop.Pointer;

declare const kVTCompressionPropertyKey_UsingGPURegistryID: interop.Pointer;

declare const kVTVideoEncoderSpecification_RequiredEncoderGPURegistryID: interop.Pointer;

declare const kVTVideoEncoderSpecification_RequireHardwareAcceleratedVideoEncoder: interop.Pointer;

declare const kVTSampleAttachmentQualityMetricsKey_ChromaRedMeanSquaredError: interop.Pointer;

declare const kVTSampleAttachmentQualityMetricsKey_ChromaBlueMeanSquaredError: interop.Pointer;

declare const kVTCompressionPropertyKey_CalculateMeanSquaredError: interop.Pointer;

declare const kVTCompressionPropertyKey_BaseLayerBitRateFraction: interop.Pointer;

declare const kVTCompressionPropertyKey_MaximizePowerEfficiency: interop.Pointer;

declare const kVTCompressionPropertyKey_MaxH264SliceBytes: interop.Pointer;

declare const kVTH264EntropyMode_CAVLC: interop.Pointer;

declare const kVTHDRMetadataInsertionMode_RequestSDRRangePreservation: interop.Pointer;

declare const kVTHDRMetadataInsertionMode_Auto: interop.Pointer;

declare const kVTCompressionPropertyKey_HDRMetadataInsertionMode: interop.Pointer;

declare const kVTProfileLevel_H263_Profile3_Level45: interop.Pointer;

declare const kVTProfileLevel_H263_Profile0_Level10: interop.Pointer;

declare const kVTProfileLevel_MP4V_AdvancedSimple_L3: interop.Pointer;

declare const kVTProfileLevel_MP4V_AdvancedSimple_L2: interop.Pointer;

declare const kVTProfileLevel_MP4V_AdvancedSimple_L1: interop.Pointer;

declare const kVTProfileLevel_MP4V_Main_L4: interop.Pointer;

declare const kVTProfileLevel_MP4V_Main_L3: interop.Pointer;

declare const kVTProfileLevel_MP4V_Main_L2: interop.Pointer;

declare const kVTProfileLevel_MP4V_Simple_L2: interop.Pointer;

declare const kVTProfileLevel_H264_ConstrainedHigh_AutoLevel: interop.Pointer;

declare const kVTProfileLevel_H264_High_AutoLevel: interop.Pointer;

declare const kVTProfileLevel_H264_High_5_1: interop.Pointer;

declare const kVTProfileLevel_H264_High_3_1: interop.Pointer;

declare const kVTProfileLevel_H264_High_3_0: interop.Pointer;

declare const kVTProfileLevel_H264_Extended_AutoLevel: interop.Pointer;

declare const kVTProfileLevel_H264_Extended_5_0: interop.Pointer;

declare const kVTProfileLevel_H264_Main_5_0: interop.Pointer;

declare const kVTProfileLevel_H264_Main_3_2: interop.Pointer;

declare const kVTProfileLevel_H264_Main_3_1: interop.Pointer;

declare const kVTProfileLevel_H264_Baseline_5_2: interop.Pointer;

declare const kVTProfileLevel_H264_Baseline_5_1: interop.Pointer;

declare const kVTProfileLevel_H264_Baseline_5_0: interop.Pointer;

declare const kVTProfileLevel_H264_Baseline_4_2: interop.Pointer;

declare const kVTProfileLevel_H264_Baseline_4_1: interop.Pointer;

declare const kVTProfileLevel_H264_Baseline_4_0: interop.Pointer;

declare const kVTProfileLevel_H264_Baseline_3_1: interop.Pointer;

declare const kVTProfileLevel_H264_Baseline_3_0: interop.Pointer;

declare const kVTProfileLevel_H264_Baseline_1_3: interop.Pointer;

declare const kVTProfileLevel_HEVC_Monochrome_AutoLevel: interop.Pointer;

declare const kVTProfileLevel_HEVC_Main10_AutoLevel: interop.Pointer;

declare const kVTCompressionPropertyKey_VBVBufferDuration: interop.Pointer;

declare const kVTCompressionPropertyKey_VariableBitRate: interop.Pointer;

declare const kVTCompressionPropertyKey_EstimatedAverageBytesPerFrame: interop.Pointer;

declare const kVTCompressionPropertyKey_ConstantBitRate: interop.Pointer;

declare const kVTCompressionPropertyKey_PrioritizeEncodingSpeedOverQuality: interop.Pointer;

declare const kVTCompressionPropertyKey_MoreFramesAfterEnd: interop.Pointer;

declare const kVTCompressionPropertyKey_TargetQualityForAlpha: interop.Pointer;

declare const kVTCompressionPropertyKey_Quality: interop.Pointer;

declare const kVTCompressionPropertyKey_DataRateLimits: interop.Pointer;

declare const kVTCompressionPropertyKey_MaxKeyFrameIntervalDuration: interop.Pointer;

declare const kVTCompressionPropertyKey_NumberOfPendingFrames: interop.Pointer;

declare const kVTPropertyShouldBeSerializedKey: interop.Pointer;

declare const kVTVideoEncoderList_EncoderName: interop.Pointer;

declare const kVTDownsamplingMode_Decimate: interop.Pointer;

declare const kVTCompressionPropertyKey_ContentLightLevelInfo: interop.Pointer;

declare const kVTCompressionPropertyCameraCalibrationKey_IntrinsicMatrixProjectionOffset: interop.Pointer;

declare const kVTRAWProcessingParameter_Description: interop.Pointer;

declare const kVTColorCorrectionPixelTransferFailedErr: number;

declare const kVTPropertyType_Enumeration: interop.Pointer;

declare const kVTExtensionProperties_ContainingBundleURLKey: interop.Pointer;

declare const kVTPixelTransferPropertyKey_DownsamplingMode: interop.Pointer;

declare const kVTCompressionPropertyKey_AverageBitRate: interop.Pointer;

declare const kVTDecompressionPropertyKey_DecoderProducesRAWOutput: interop.Pointer;

declare const kVTMultiPassStorageInvalidErr: number;

declare const kVTProfileLevel_H264_High_5_0: interop.Pointer;

declare const kVTVideoDecoderNeedsRosettaErr: number;

declare const kVTHeroEye_Right: interop.Pointer;

declare const kVTCompressionPropertyKey_ICCProfile: interop.Pointer;

declare const kVTVideoDecoderSpecification_PreferredDecoderGPURegistryID: interop.Pointer;

declare const kVTCompressionPropertyKey_HeroEye: interop.Pointer;

declare const kVTPropertyType_Boolean: interop.Pointer;

declare const kVTVideoDecoderRemovedErr: number;

declare const kVTHDRPerFrameMetadataGenerationOptionsKey_HDRFormats: interop.Pointer;

declare const kVTCompressionPropertyKey_HasLeftStereoEyeView: interop.Pointer;

declare const kVTHDRMetadataInsertionMode_None: interop.Pointer;

declare const kVTProfileLevel_MP4V_Simple_L1: interop.Pointer;

declare const kVTCompressionPropertyKey_H264EntropyMode: interop.Pointer;

declare const kVTDecompressionPropertyKey_PixelBufferPoolIsShared: interop.Pointer;

declare const kVTMotionEstimationSessionCreationOption_Label: interop.Pointer;

declare const kVTCameraCalibrationLensRole_Mono: interop.Pointer;

declare const kVTCompressionPropertyCameraCalibrationKey_LensDomain: interop.Pointer;

declare const kVTDecompressionPropertyKey_SuggestedQualityOfServiceTiers: interop.Pointer;

declare const kVTCompressionPropertyKey_MaximumRealTimeFrameRate: interop.Pointer;

declare const kVTCompressionPropertyKey_AllowFrameReordering: interop.Pointer;

declare const kVTPixelRotationPropertyKey_Rotation: interop.Pointer;

declare const kVTCompressionPropertyKey_StereoCameraBaseline: interop.Pointer;

declare const kVTProfileLevel_H264_Baseline_AutoLevel: interop.Pointer;

declare const kVTPixelRotationPropertyKey_FlipHorizontalOrientation: interop.Pointer;

declare const kVTCompressionPropertyKey_PixelTransferProperties: interop.Pointer;

declare const kVTPixelTransferPropertyKey_DestinationYCbCrMatrix: interop.Pointer;

declare const kVTRAWProcessingParameterValueType_Boolean: interop.Pointer;

declare const kVTDecompressionProperty_FieldMode_BottomFieldOnly: interop.Pointer;

declare const kVTCompressionPreset_VideoConferencing: interop.Pointer;

declare const kVTImageRotationNotSupportedErr: number;

declare const kVTRAWProcessingPropertyKey_MetalDeviceRegistryID: interop.Pointer;

declare const kVTPixelTransferPropertyKey_DestinationICCProfile: interop.Pointer;

declare const kVTProfileLevel_H264_Main_4_1: interop.Pointer;

declare const kVTRAWProcessingParameter_ListArray: interop.Pointer;

declare const kVTDecompressionPropertyKey_OnlyTheseFrames: interop.Pointer;

declare const kVTCameraCalibrationLensDomain_Color: interop.Pointer;

declare const kVTProjectionKind_Rectilinear: interop.Pointer;

declare const kVTDecompressionPropertyKey_PixelBufferPool: interop.Pointer;

declare const kVTRAWProcessingParameterListElement_Description: interop.Pointer;

declare const kVTProfileLevel_HEVC_Main_AutoLevel: interop.Pointer;

declare const kVTProfileLevel_H264_Main_AutoLevel: interop.Pointer;

declare const kVTProfileLevel_H264_Main_4_2: interop.Pointer;

declare const kVTDecompressionPropertyKey_RequestedMVHEVCVideoLayerIDs: interop.Pointer;

declare const kVTVideoDecoderSpecification_EnableHardwareAcceleratedVideoDecoder: interop.Pointer;

declare const kVTCompressionPropertyKey_TransferFunction: interop.Pointer;

declare const kVTProfileLevel_H264_Main_4_0: interop.Pointer;

declare const kVTCompressionPropertyCameraCalibrationKey_LensAlgorithmKind: interop.Pointer;

declare const kVTCompressionPropertyKey_PreserveAlphaChannel: interop.Pointer;

declare const kVTProfileLevel_H263_Profile0_Level45: interop.Pointer;

declare const kVTCompressionPropertyKey_OutputBitDepth: interop.Pointer;

declare const kVTCompressionPropertyCameraCalibrationKey_LensRole: interop.Pointer;

declare const kVTVideoDecoderBadDataErr: number;

declare const kVTCompressionPropertyKey_ProgressiveScan: interop.Pointer;

declare const kVTExtensionProperties_ExtensionURLKey: interop.Pointer;

declare const kVTCompressionPropertyKey_MaxKeyFrameInterval: interop.Pointer;

declare const kVTRAWProcessingParameter_ValueType: interop.Pointer;

declare const kVTCompressionPropertyKey_MoreFramesBeforeStart: interop.Pointer;

declare const kVTCompressionPropertyKey_MVHEVCVideoLayerIDs: interop.Pointer;

declare const kVTProfileLevel_H264_Main_3_0: interop.Pointer;

declare const kVTDecompressionPropertyKey_MinOutputPresentationTimeStampOfFramesBeingDecoded: interop.Pointer;

declare const kVTMotionEstimationSessionCreationOption_UseMultiPassSearch: interop.Pointer;

declare const kVTCompressionPropertyKey_SupportedPresetDictionaries: interop.Pointer;

declare const kVTProfileLevel_H264_High_4_0: interop.Pointer;

declare const kVTMultiPassStorageCreationOption_DoNotDelete: interop.Pointer;

declare const kVTDecodeFrameOptionKey_ContentAnalyzerCropRectangle: interop.Pointer;

declare const kVTRAWProcessingParameter_Enabled: interop.Pointer;

declare const kVTPixelTransferPropertyKey_DestinationPixelAspectRatio: interop.Pointer;

declare const kVTVideoDecoderNotAvailableNowErr: number;

declare const kVTVideoEncoderSpecification_PreferredEncoderGPURegistryID: interop.Pointer;

declare const kVTCompressionPropertyKey_MasteringDisplayColorVolume: interop.Pointer;

declare const kVTCompressionPropertyKey_ReferenceBufferCount: interop.Pointer;

declare const kVTVideoEncoderSpecification_EnableHardwareAcceleratedVideoEncoder: interop.Pointer;

declare const kVTDecompressionPropertyKey_ContentHasInterframeDependencies: interop.Pointer;

declare const kVTDecompressionPropertyKey_AllowBitstreamToChangeFrameDimensions: interop.Pointer;

declare const kVTCompressionPropertyKey_VBVInitialDelayPercentage: interop.Pointer;

declare const kVTCompressionPropertyKey_AllowOpenGOP: interop.Pointer;

declare const kVTRotation_0: interop.Pointer;

declare const kVTCompressionPropertyKey_RecommendedParallelizationLimit: interop.Pointer;

declare const kVTPixelRotationNotSupportedErr: number;

declare const kVTCompressionPropertyKey_BaseLayerFrameRate: interop.Pointer;

declare const kVTExtensionProperties_ExtensionIdentifierKey: interop.Pointer;

declare const kVTHDRPerFrameMetadataGenerationHDRFormatType_DolbyVision: interop.Pointer;

declare const kVTH264EntropyMode_CABAC: interop.Pointer;

declare const kVTRAWProcessingParameter_Name: interop.Pointer;

declare const kVTCompressionPreset_Balanced: interop.Pointer;

declare const kVTVideoEncoderList_QualityRating: interop.Pointer;

declare const kVTVideoDecoderMalfunctionErr: number;

declare const kVTCompressionPropertyKey_BaseLayerFrameRateFraction: interop.Pointer;

declare const kVTProfileLevel_MP4V_AdvancedSimple_L0: interop.Pointer;

declare const kVTProfileLevel_H264_Main_5_2: interop.Pointer;

declare const kVTProfileLevel_MP4V_Simple_L3: interop.Pointer;

declare const kVTVideoEncoderList_EncoderID: interop.Pointer;

declare const kVTProfileLevel_HEVC_Monochrome10_AutoLevel: interop.Pointer;

declare const kVTProfileLevel_HEVC_Main42210_AutoLevel: interop.Pointer;

declare const kVTSampleAttachmentKey_QualityMetrics: interop.Pointer;

declare const kVTCompressionPropertyKey_RecommendedParallelizedSubdivisionMinimumDuration: interop.Pointer;

declare const kVTPixelTransferNotSupportedErr: number;

declare const kVTCompressionPropertyKey_VBVMaxBitRate: interop.Pointer;

declare const kVTExtensionProperties_ContainingBundleNameKey: interop.Pointer;

declare const kVTCouldNotOutputTaggedBufferGroupErr: number;

declare const kVTDecompressionProperty_TemporalLevelLimit: interop.Pointer;

declare const kVTAlphaChannelMode_StraightAlpha: interop.Pointer;

declare const kVTPropertyTypeKey: interop.Pointer;

declare const kVTPixelRotationPropertyKey_FlipVerticalOrientation: interop.Pointer;

declare const kVTFrameSiloInvalidTimeStampErr: number;

declare const kVTVideoEncoderList_GPURegistryID: interop.Pointer;

declare const kVTRAWProcessingParameterValueType_Float: interop.Pointer;

declare const kVTCompressionPropertyKey_RealTime: interop.Pointer;

declare const kVTRotation_CW90: interop.Pointer;

declare const kVTCompressionPropertyKey_ProfileLevel: interop.Pointer;

declare const kVTCompressionPropertyKey_SourceFrameCount: interop.Pointer;

declare const kVTColorSyncTransformConvertFailedErr: number;

declare const kVTAlphaChannelMode_PremultipliedAlpha: interop.Pointer;

declare const kVTDecompressionPropertyKey_SupportedPixelFormatsOrderedByPerformance: interop.Pointer;

declare const kVTVideoEncoderSpecification_EncoderID: interop.Pointer;

declare const kVTCompressionPropertyKey_UsingHardwareAcceleratedVideoEncoder: interop.Pointer;

declare const kVTCompressionPropertyKey_ExpectedFrameRate: interop.Pointer;

declare const kVTCompressionPropertyKey_MVHEVCViewIDs: interop.Pointer;

declare const kVTRAWProcessingParameter_Key: interop.Pointer;

declare const kVTPropertyType_Number: interop.Pointer;

declare const kVTScalingMode_Normal: interop.Pointer;

declare const kVTCompressionPreset_HighQuality: interop.Pointer;

declare const kVTEncodeFrameOptionKey_BaseFrameQP: interop.Pointer;

declare const kVTDecompressionProperty_DeinterlaceMode_Temporal: interop.Pointer;

declare const kVTRAWProcessingParameterValueType_Integer: interop.Pointer;

declare const kVTVideoEncoderList_SupportsFrameReordering: interop.Pointer;

declare const kVTPropertyNotSupportedErr: number;

declare const kVTCouldNotFindTemporalFilterErr: number;

declare const kVTDecompressionProperty_OnlyTheseFrames_IFrames: interop.Pointer;

declare const kVTCompressionPropertyKey_SuggestedLookAheadFrameCount: interop.Pointer;

declare const kVTVideoEncoderAuthorizationErr: number;

declare const kVTProfileLevel_H264_High_4_1: interop.Pointer;

declare const kVTVideoEncoderListOption_IncludeStandardDefinitionDVEncoders: interop.Pointer;

declare const kVTPixelTransferPropertyKey_DestinationTransferFunction: interop.Pointer;

declare const kVTCouldNotCreateColorCorrectionDataErr: number;

declare const kVTCompressionPropertyKey_HorizontalFieldOfView: interop.Pointer;

declare const kVTCompressionPropertyCameraCalibrationKey_LensFrameAdjustmentsPolynomialY: interop.Pointer;

declare const kVTCompressionPropertyKey_ExpectedDuration: interop.Pointer;

declare const kVTProfileLevel_MP4V_AdvancedSimple_L4: interop.Pointer;

declare const kVTProfileLevel_H264_High_3_2: interop.Pointer;

declare const kVTColorCorrectionImageRotationFailedErr: number;

declare const kVTDecompressionPropertyKey_FieldMode: interop.Pointer;

declare const kVTCompressionPropertyKey_Depth: interop.Pointer;

declare const kVTCompressionPropertyKey_MaxFrameDelayCount: interop.Pointer;

declare const kVTVideoEncoderList_CodecName: interop.Pointer;

declare const kVTEncodeFrameOptionKey_ForceLTRRefresh: interop.Pointer;

declare const kVTVideoEncoderAutoWhiteBalanceNotLockedErr: number;

declare const kVTProfileLevel_H264_ConstrainedBaseline_AutoLevel: interop.Pointer;

declare const kVTCameraCalibrationLensAlgorithmKind_ParametricLens: interop.Pointer;

declare const kVTVideoEncoderMVHEVCVideoLayerIDsMismatchErr: number;

declare const kVTDecompressionPropertyKey_ReducedCoefficientDecode: interop.Pointer;

declare const kVTCompressionPreset_HighSpeed: interop.Pointer;

declare const kVTSampleAttachmentQualityMetricsKey_LumaMeanSquaredError: interop.Pointer;

declare const kVTProfileLevel_H264_High_5_2: interop.Pointer;

declare const kVTCompressionPropertyKey_AllowTemporalCompression: interop.Pointer;

declare const kVTInsufficientSourceColorDataErr: number;

declare const kVTCompressionPropertyKey_VideoEncoderPixelBufferAttributes: interop.Pointer;

declare const kVTRAWProcessingParameter_MaximumValue: interop.Pointer;

declare const kVTDecompressionPropertyKey_ReducedResolutionDecode: interop.Pointer;

declare const kVTDecompressionPropertyKey_RequestRAWOutput: interop.Pointer;

declare const kVTProfileLevel_H264_Main_5_1: interop.Pointer;

declare const kVTDecompressionProperty_FieldMode_TopFieldOnly: interop.Pointer;

declare const kVTDecompressionPropertyKey_PixelFormatsWithReducedResolutionSupport: interop.Pointer;

declare const kVTDecodeFrameOptionKey_ContentAnalyzerRotation: interop.Pointer;

declare const kVTDecompressionPropertyKey_PixelTransferProperties: interop.Pointer;

declare const kVTCompressionPropertyKey_GammaLevel: interop.Pointer;

declare const kVTProfileLevel_H264_High_4_2: interop.Pointer;

declare const kVTVideoDecoderAuthorizationErr: number;

declare const kVTCompressionPropertyKey_PixelBufferPoolIsShared: interop.Pointer;

declare const kVTProfileLevel_H264_Baseline_3_2: interop.Pointer;

declare const kVTProjectionKind_ParametricImmersive: interop.Pointer;

declare const kVTCouldNotFindExtensionErr: number;

declare const kVTProfileLevel_MP4V_Simple_L0: interop.Pointer;

declare const kVTUnlimitedFrameDelayCount: number;

declare const kVTDecompressionResolutionKey_Height: interop.Pointer;

declare const VTSuperResolutionScalerConfigurationModelStatus: {
  DownloadRequired: 0,
  Downloading: 1,
  Ready: 2,
};

declare const VTOpticalFlowConfigurationRevision: {
  VTOpticalFlowConfigurationRevision1: 1,
};

declare const VTMotionEstimationFrameFlags: {
  kVTMotionEstimationFrameFlags_CurrentBufferWillBeNextReferenceBuffer: 1,
};

declare const VTFrameRateConversionConfigurationRevision: {
  VTFrameRateConversionConfigurationRevision1: 1,
};

declare const VTSuperResolutionScalerParametersSubmissionMode: {
  Random: 1,
  Sequential: 2,
};

declare const VTSuperResolutionScalerConfigurationQualityPrioritization: {
  VTSuperResolutionScalerConfigurationQualityPrioritizationNormal: 1,
};

declare const VTOpticalFlowParametersSubmissionMode: {
  Random: 1,
  Sequential: 2,
};

declare const VTOpticalFlowConfigurationQualityPrioritization: {
  Normal: 1,
  Quality: 2,
};

declare const VTFrameRateConversionConfigurationQualityPrioritization: {
  Normal: 1,
  Quality: 2,
};

declare const VTMotionBlurConfigurationRevision: {
  VTMotionBlurConfigurationRevision1: 1,
};

declare const VTMotionBlurConfigurationQualityPrioritization: {
  Normal: 1,
  Quality: 2,
};

declare const VTFrameProcessorError: {
  UnknownError: -19730,
  UnsupportedResolution: -19731,
  SessionNotStarted: -19732,
  SessionAlreadyActive: -19733,
  FatalError: -19734,
  SessionLevelError: -19735,
  InitializationFailed: -19736,
  UnsupportedInput: -19737,
  MemoryAllocationFailure: -19738,
  RevisionNotSupported: -19739,
  ProcessingError: -19740,
  InvalidParameterError: -19741,
  InvalidFrameTiming: -19742,
  AssetDownloadFailed: -19743,
};

declare const VTMotionEstimationInfoFlags: {
  kVTMotionEstimationInfoFlags_Reserved0: 1,
};

declare const VTDecodeFrameFlags: {
  Frame_EnableAsynchronousDecompression: 1,
  Frame_DoNotOutputFrame: 2,
  Frame_1xRealTimePlayback: 4,
  Frame_EnableTemporalProcessing: 8,
};

declare const VTDecodeInfoFlags: {
  Asynchronous: 1,
  FrameDropped: 2,
  ImageBufferModifiable: 4,
  SkippedLeadingFrameDropped: 8,
  FrameInterrupted: 16,
};

declare const VTSuperResolutionScalerConfigurationInputType: {
  Video: 1,
  Image: 2,
};

declare const VTCompressionSessionOptionFlags: {
  kVTCompressionSessionBeginFinalPass: 1,
};

declare const VTFrameRateConversionParametersSubmissionMode: {
  Random: 1,
  Sequential: 2,
  SequentialReferencesUnchanged: 3,
};

declare const VTMotionBlurParametersSubmissionMode: {
  Random: 1,
  Sequential: 2,
};

declare const VTSuperResolutionScalerConfigurationRevision: {
  VTSuperResolutionScalerConfigurationRevision1: 1,
};

declare const VTEncodeInfoFlags: {
  Asynchronous: 1,
  FrameDropped: 2,
};

declare class OpaqueVTMotionEstimationSession {
  constructor(init?: OpaqueVTMotionEstimationSession);
}

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

declare class OpaqueVTPixelTransferSession {
  constructor(init?: OpaqueVTPixelTransferSession);
}

declare class OpaqueVTPixelRotationSession {
  constructor(init?: OpaqueVTPixelRotationSession);
}

declare class VTInt32Size {
  constructor(init?: VTInt32Size);
  width: number;
  height: number;
}

declare class OpaqueVTHDRPerFrameMetadataGenerationSession {
  constructor(init?: OpaqueVTHDRPerFrameMetadataGenerationSession);
}

declare class OpaqueVTCompressionSession {
  constructor(init?: OpaqueVTCompressionSession);
}

declare class VTInt32Point {
  constructor(init?: VTInt32Point);
  x: number;
  y: number;
}

declare class OpaqueVTRAWProcessingSession {
  constructor(init?: OpaqueVTRAWProcessingSession);
}

declare class OpaqueVTDecompressionSession {
  constructor(init?: OpaqueVTDecompressionSession);
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

declare function VTDecompressionSessionDecodeFrameWithOptions(session: interop.Object, sampleBuffer: interop.Object, decodeFlags: interop.Enum<typeof VTDecodeFrameFlags>, frameOptions: interop.Object, sourceFrameRefCon: interop.PointerConvertible, infoFlagsOut: interop.PointerConvertible): number;

declare function VTDecompressionSessionDecodeFrameWithOptionsAndOutputHandler(session: interop.Object, sampleBuffer: interop.Object, decodeFlags: interop.Enum<typeof VTDecodeFrameFlags>, frameOptions: interop.Object, infoFlagsOut: interop.PointerConvertible, outputHandler: (p1: number, p2: interop.Enum<typeof VTDecodeInfoFlags>, p3: interop.PointerConvertible, p4: CMTime, p5: CMTime) => void): number;

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

declare function VTRegisterSupplementalVideoDecoderIfAvailable(codecType: number): void;

declare function VTCopyVideoDecoderExtensionProperties(formatDesc: interop.Object, mediaExtensionPropertiesOut: interop.PointerConvertible): number;

declare function VTCopyRAWProcessorExtensionProperties(formatDesc: interop.Object, mediaExtensionPropertiesOut: interop.PointerConvertible): number;

declare function VTPixelTransferSessionCreate(allocator: interop.Object, pixelTransferSessionOut: interop.PointerConvertible): number;

declare function VTPixelTransferSessionInvalidate(session: interop.Object): void;

declare function VTPixelTransferSessionGetTypeID(): number;

declare function VTPixelTransferSessionTransferImage(session: interop.Object, sourceBuffer: interop.Object, destinationBuffer: interop.Object): number;

declare function VTPixelRotationSessionCreate(allocator: interop.Object, pixelRotationSessionOut: interop.PointerConvertible): number;

declare function VTPixelRotationSessionInvalidate(session: interop.PointerConvertible): void;

declare function VTPixelRotationSessionGetTypeID(): number;

declare function VTPixelRotationSessionRotateImage(session: interop.PointerConvertible, sourceBuffer: interop.Object, destinationBuffer: interop.Object): number;

declare function VTRAWProcessingSessionCreate(allocator: interop.Object, formatDescription: interop.Object, outputPixelBufferAttributes: interop.Object, processingSessionOptions: interop.Object, processingSessionOut: interop.PointerConvertible): number;

declare function VTRAWProcessingSessionInvalidate(session: interop.PointerConvertible): void;

declare function VTRAWProcessingSessionGetTypeID(): number;

declare function VTRAWProcessingSessionSetParameterChangedHandler(session: interop.PointerConvertible, parameterChangeHandler: (p1: interop.PointerConvertible) => void): number;

declare function VTRAWProcessingSessionSetParameterChangedHander(session: interop.PointerConvertible, parameterChangeHandler: (p1: interop.PointerConvertible) => void): number;

declare function VTRAWProcessingSessionProcessFrame(session: interop.PointerConvertible, inputPixelBuffer: interop.Object, frameOptions: interop.Object, outputHandler: (p1: number, p2: interop.PointerConvertible) => void): number;

declare function VTRAWProcessingSessionCompleteFrames(session: interop.PointerConvertible): number;

declare function VTRAWProcessingSessionCopyProcessingParameters(session: interop.PointerConvertible, outParameterArray: interop.PointerConvertible): number;

declare function VTRAWProcessingSessionSetProcessingParameters(session: interop.PointerConvertible, processingParameters: interop.Object): number;

declare function VTRegisterProfessionalVideoWorkflowVideoDecoders(): void;

declare function VTRegisterProfessionalVideoWorkflowVideoEncoders(): void;

declare function VTHDRPerFrameMetadataGenerationSessionGetTypeID(): number;

declare function VTHDRPerFrameMetadataGenerationSessionCreate(allocator: interop.Object, framesPerSecond: number, options: interop.Object, hdrPerFrameMetadataGenerationSessionOut: interop.PointerConvertible): number;

declare function VTHDRPerFrameMetadataGenerationSessionAttachMetadata(hdrPerFrameMetadataGenerationSession: interop.PointerConvertible, pixelBuffer: interop.Object, sceneChange: number): number;

declare function VTMotionEstimationSessionGetTypeID(): number;

declare function VTMotionEstimationSessionCreate(allocator: interop.Object, motionVectorProcessorSelectionOptions: interop.Object, width: number, height: number, motionEstimationSessionOut: interop.PointerConvertible): number;

declare function VTMotionEstimationSessionCopySourcePixelBufferAttributes(motionEstimationSession: interop.PointerConvertible, attributesOut: interop.PointerConvertible): number;

declare function VTMotionEstimationSessionInvalidate(session: interop.PointerConvertible): void;

declare function VTMotionEstimationSessionEstimateMotionVectors(session: interop.PointerConvertible, referenceImage: interop.Object, currentImage: interop.Object, motionEstimationFrameFlags: interop.Enum<typeof VTMotionEstimationFrameFlags>, additionalFrameOptions: interop.Object, outputHandler: (p1: number, p2: interop.Enum<typeof VTMotionEstimationInfoFlags>, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void): number;

declare function VTMotionEstimationSessionCompleteFrames(session: interop.PointerConvertible): number;

declare interface VTFrameProcessorParameters extends NSObjectProtocol {
  readonly sourceFrame: VTFrameProcessorFrame;

  readonly destinationFrame?: VTFrameProcessorFrame;

  readonly destinationFrames?: NSArray;
}

declare class VTFrameProcessorParameters extends NativeObject implements VTFrameProcessorParameters {
}

declare interface VTFrameProcessorConfiguration extends NSObjectProtocol {
  readonly frameSupportedPixelFormats: NSArray;

  readonly sourcePixelBufferAttributes: NSDictionary;

  readonly destinationPixelBufferAttributes: NSDictionary;

  readonly nextFrameCount?: number;

  readonly previousFrameCount?: number;

}

declare class VTFrameProcessorConfiguration extends NativeObject implements VTFrameProcessorConfiguration {
  static readonly supported: boolean;

  static readonly maximumDimensions: CMVideoDimensions;

  static readonly minimumDimensions: CMVideoDimensions;

  static isSupported(): boolean;
}

declare class VTFrameProcessorOpticalFlow extends NSObject {
  initWithForwardFlowBackwardFlow(forwardFlow: interop.Object, backwardFlow: interop.Object): this;

  readonly forwardFlow: interop.Object;

  readonly backwardFlow: interop.Object;
}

declare class VTSuperResolutionScalerParameters extends NSObject implements VTFrameProcessorParameters {
  initWithSourceFramePreviousFramePreviousOutputFrameOpticalFlowSubmissionModeDestinationFrame(sourceFrame: VTFrameProcessorFrame, previousFrame: VTFrameProcessorFrame | null, previousOutputFrame: VTFrameProcessorFrame | null, opticalFlow: VTFrameProcessorOpticalFlow | null, submissionMode: interop.Enum<typeof VTSuperResolutionScalerParametersSubmissionMode>, destinationFrame: VTFrameProcessorFrame): this;

  readonly sourceFrame: VTFrameProcessorFrame;

  readonly previousFrame: VTFrameProcessorFrame;

  readonly previousOutputFrame: VTFrameProcessorFrame;

  readonly opticalFlow: VTFrameProcessorOpticalFlow;

  readonly submissionMode: interop.Enum<typeof VTSuperResolutionScalerParametersSubmissionMode>;

  readonly destinationFrame: VTFrameProcessorFrame;

  readonly destinationFrames: NSArray;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class VTLowLatencyFrameInterpolationParameters extends NSObject implements VTFrameProcessorParameters {
  initWithSourceFramePreviousFrameInterpolationPhaseDestinationFrames(sourceFrame: VTFrameProcessorFrame, previousFrame: VTFrameProcessorFrame, interpolationPhase: NSArray<interop.Object> | Array<interop.Object>, destinationFrames: NSArray<interop.Object> | Array<interop.Object>): this;

  readonly sourceFrame: VTFrameProcessorFrame;

  readonly previousFrame: VTFrameProcessorFrame;

  readonly interpolationPhase: NSArray;

  readonly destinationFrames: NSArray;

  readonly destinationFrame: VTFrameProcessorFrame;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class VTTemporalNoiseFilterConfiguration extends NSObject implements VTFrameProcessorConfiguration {
  initWithFrameWidthFrameHeightSourcePixelFormat(frameWidth: number, frameHeight: number, sourcePixelFormat: number): this;

  readonly frameWidth: number;

  readonly frameHeight: number;

  readonly frameSupportedPixelFormats: NSArray;

  readonly sourcePixelBufferAttributes: NSDictionary;

  readonly destinationPixelBufferAttributes: NSDictionary;

  readonly nextFrameCount: number;

  readonly previousFrameCount: number;

  static readonly supportedSourcePixelFormats: NSArray;

  static readonly maximumDimensions: CMVideoDimensions;

  static readonly minimumDimensions: CMVideoDimensions;

  static readonly supported: boolean;

  static isSupported(): boolean;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class VTOpticalFlowParameters extends NSObject implements VTFrameProcessorParameters {
  initWithSourceFrameNextFrameSubmissionModeDestinationOpticalFlow(sourceFrame: VTFrameProcessorFrame, nextFrame: VTFrameProcessorFrame, submissionMode: interop.Enum<typeof VTOpticalFlowParametersSubmissionMode>, destinationOpticalFlow: VTFrameProcessorOpticalFlow): this;

  readonly sourceFrame: VTFrameProcessorFrame;

  readonly nextFrame: VTFrameProcessorFrame;

  readonly submissionMode: interop.Enum<typeof VTOpticalFlowParametersSubmissionMode>;

  readonly destinationOpticalFlow: VTFrameProcessorOpticalFlow;

  readonly destinationFrame: VTFrameProcessorFrame;

  readonly destinationFrames: NSArray;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class VTFrameRateConversionConfiguration extends NSObject implements VTFrameProcessorConfiguration {
  initWithFrameWidthFrameHeightUsePrecomputedFlowQualityPrioritizationRevision(frameWidth: number, frameHeight: number, usePrecomputedFlow: boolean, qualityPrioritization: interop.Enum<typeof VTFrameRateConversionConfigurationQualityPrioritization>, revision: interop.Enum<typeof VTFrameRateConversionConfigurationRevision>): this;

  readonly frameWidth: number;

  readonly frameHeight: number;

  readonly usePrecomputedFlow: boolean;

  readonly qualityPrioritization: interop.Enum<typeof VTFrameRateConversionConfigurationQualityPrioritization>;

  readonly revision: interop.Enum<typeof VTFrameRateConversionConfigurationRevision>;

  static readonly supportedRevisions: NSIndexSet;

  static readonly defaultRevision: interop.Enum<typeof VTFrameRateConversionConfigurationRevision>;

  readonly frameSupportedPixelFormats: NSArray;

  readonly sourcePixelBufferAttributes: NSDictionary;

  readonly destinationPixelBufferAttributes: NSDictionary;

  static readonly supported: boolean;

  static readonly processorSupported: number;

  static isSupported(): boolean;

  readonly nextFrameCount: number;

  readonly previousFrameCount: number;

  static readonly maximumDimensions: CMVideoDimensions;

  static readonly minimumDimensions: CMVideoDimensions;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class VTFrameProcessorFrame extends NSObject {
  initWithBufferPresentationTimeStamp(buffer: interop.Object, presentationTimeStamp: CMTime): this;

  readonly buffer: interop.Object;

  readonly presentationTimeStamp: CMTime;
}

declare class VTTemporalNoiseFilterParameters extends NSObject implements VTFrameProcessorParameters {
  initWithSourceFrameNextFramesPreviousFramesDestinationFrameFilterStrengthHasDiscontinuity(sourceFrame: VTFrameProcessorFrame, nextFrames: NSArray<interop.Object> | Array<interop.Object>, previousFrames: NSArray<interop.Object> | Array<interop.Object>, destinationFrame: VTFrameProcessorFrame, filterStrength: number, hasDiscontinuity: number): this;

  readonly sourceFrame: VTFrameProcessorFrame;

  readonly nextFrames: NSArray;

  readonly previousFrames: NSArray;

  filterStrength: number;

  hasDiscontinuity: boolean;

  readonly destinationFrame: VTFrameProcessorFrame;

  setFilterStrength(filterStrength: number): void;

  setHasDiscontinuity(hasDiscontinuity: boolean): void;

  readonly destinationFrames: NSArray;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class VTFrameRateConversionParameters extends NSObject implements VTFrameProcessorParameters {
  initWithSourceFrameNextFrameOpticalFlowInterpolationPhaseSubmissionModeDestinationFrames(sourceFrame: VTFrameProcessorFrame, nextFrame: VTFrameProcessorFrame, opticalFlow: VTFrameProcessorOpticalFlow | null, interpolationPhase: NSArray<interop.Object> | Array<interop.Object>, submissionMode: interop.Enum<typeof VTFrameRateConversionParametersSubmissionMode>, destinationFrame: NSArray<interop.Object> | Array<interop.Object>): this;

  readonly sourceFrame: VTFrameProcessorFrame;

  readonly nextFrame: VTFrameProcessorFrame;

  readonly opticalFlow: VTFrameProcessorOpticalFlow;

  readonly interpolationPhase: NSArray;

  readonly submissionMode: interop.Enum<typeof VTFrameRateConversionParametersSubmissionMode>;

  readonly destinationFrames: NSArray;

  readonly destinationFrame: VTFrameProcessorFrame;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class VTFrameProcessor extends NSObject {
  init(): this;

  startSessionWithConfigurationError(configuration: VTFrameProcessorConfiguration, error: interop.PointerConvertible): boolean;

  processWithParametersError(parameters: VTFrameProcessorParameters, error: interop.PointerConvertible): boolean;

  processWithParametersCompletionHandler(parameters: VTFrameProcessorParameters, completionHandler: (p1: VTFrameProcessorParameters, p2: NSError) => void | null): void;

  processWithParametersFrameOutputHandler(parameters: VTFrameProcessorParameters, frameOutputHandler: (p1: VTFrameProcessorParameters, p2: CMTime, p3: boolean, p4: NSError) => void | null): void;

  processWithCommandBufferParameters(commandBuffer: MTLCommandBuffer, parameters: VTFrameProcessorParameters): void;

  endSession(): void;
}

declare class VTLowLatencyFrameInterpolationConfiguration extends NSObject implements VTFrameProcessorConfiguration {
  initWithFrameWidthFrameHeightNumberOfInterpolatedFrames(frameWidth: number, frameHeight: number, numberOfInterpolatedFrames: number): this;

  initWithFrameWidthFrameHeightSpatialScaleFactor(frameWidth: number, frameHeight: number, spatialScaleFactor: number): this;

  readonly frameWidth: number;

  readonly frameHeight: number;

  readonly spatialScaleFactor: number;

  readonly numberOfInterpolatedFrames: number;

  readonly frameSupportedPixelFormats: NSArray;

  readonly sourcePixelBufferAttributes: NSDictionary;

  readonly destinationPixelBufferAttributes: NSDictionary;

  static readonly supported: boolean;

  static isSupported(): boolean;

  readonly nextFrameCount: number;

  readonly previousFrameCount: number;

  static readonly maximumDimensions: CMVideoDimensions;

  static readonly minimumDimensions: CMVideoDimensions;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class VTMotionBlurConfiguration extends NSObject implements VTFrameProcessorConfiguration {
  initWithFrameWidthFrameHeightUsePrecomputedFlowQualityPrioritizationRevision(frameWidth: number, frameHeight: number, usePrecomputedFlow: boolean, qualityPrioritization: interop.Enum<typeof VTMotionBlurConfigurationQualityPrioritization>, revision: interop.Enum<typeof VTMotionBlurConfigurationRevision>): this;

  readonly frameWidth: number;

  readonly frameHeight: number;

  readonly usePrecomputedFlow: boolean;

  readonly qualityPrioritization: interop.Enum<typeof VTMotionBlurConfigurationQualityPrioritization>;

  readonly revision: interop.Enum<typeof VTMotionBlurConfigurationRevision>;

  static readonly supportedRevisions: NSIndexSet;

  static readonly defaultRevision: interop.Enum<typeof VTMotionBlurConfigurationRevision>;

  readonly frameSupportedPixelFormats: NSArray;

  readonly sourcePixelBufferAttributes: NSDictionary;

  readonly destinationPixelBufferAttributes: NSDictionary;

  static readonly supported: boolean;

  static readonly processorSupported: number;

  static isSupported(): boolean;

  readonly nextFrameCount: number;

  readonly previousFrameCount: number;

  static readonly maximumDimensions: CMVideoDimensions;

  static readonly minimumDimensions: CMVideoDimensions;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class VTLowLatencySuperResolutionScalerConfiguration extends NSObject implements VTFrameProcessorConfiguration {
  initWithFrameWidthFrameHeightScaleFactor(frameWidth: number, frameHeight: number, scaleFactor: number): this;

  readonly frameWidth: number;

  readonly frameHeight: number;

  readonly frameSupportedPixelFormats: NSArray;

  readonly sourcePixelBufferAttributes: NSDictionary;

  readonly destinationPixelBufferAttributes: NSDictionary;

  readonly scaleFactor: number;

  static readonly maximumDimensions: CMVideoDimensions;

  static readonly minimumDimensions: CMVideoDimensions;

  static readonly supported: boolean;

  static supportedScaleFactorsForFrameWidthFrameHeight(frameWidth: number, frameHeight: number): NSArray;

  static isSupported(): boolean;

  readonly nextFrameCount: number;

  readonly previousFrameCount: number;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class VTMotionBlurParameters extends NSObject implements VTFrameProcessorParameters {
  initWithSourceFrameNextFramePreviousFrameNextOpticalFlowPreviousOpticalFlowMotionBlurStrengthSubmissionModeDestinationFrame(sourceFrame: VTFrameProcessorFrame, nextFrame: VTFrameProcessorFrame | null, previousFrame: VTFrameProcessorFrame | null, nextOpticalFlow: VTFrameProcessorOpticalFlow | null, previousOpticalFlow: VTFrameProcessorOpticalFlow | null, motionBlurStrength: number, submissionMode: interop.Enum<typeof VTMotionBlurParametersSubmissionMode>, destinationFrame: VTFrameProcessorFrame): this;

  readonly sourceFrame: VTFrameProcessorFrame;

  readonly nextFrame: VTFrameProcessorFrame;

  readonly previousFrame: VTFrameProcessorFrame;

  readonly nextOpticalFlow: VTFrameProcessorOpticalFlow;

  readonly previousOpticalFlow: VTFrameProcessorOpticalFlow;

  readonly motionBlurStrength: number;

  readonly submissionMode: interop.Enum<typeof VTMotionBlurParametersSubmissionMode>;

  readonly destinationFrame: VTFrameProcessorFrame;

  readonly destinationFrames: NSArray;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class VTOpticalFlowConfiguration extends NSObject implements VTFrameProcessorConfiguration {
  initWithFrameWidthFrameHeightQualityPrioritizationRevision(frameWidth: number, frameHeight: number, qualityPrioritization: interop.Enum<typeof VTOpticalFlowConfigurationQualityPrioritization>, revision: interop.Enum<typeof VTOpticalFlowConfigurationRevision>): this;

  readonly frameWidth: number;

  readonly frameHeight: number;

  readonly qualityPrioritization: interop.Enum<typeof VTOpticalFlowConfigurationQualityPrioritization>;

  readonly revision: interop.Enum<typeof VTOpticalFlowConfigurationRevision>;

  static readonly supportedRevisions: NSIndexSet;

  static readonly defaultRevision: interop.Enum<typeof VTOpticalFlowConfigurationRevision>;

  readonly frameSupportedPixelFormats: NSArray;

  readonly sourcePixelBufferAttributes: NSDictionary;

  readonly destinationPixelBufferAttributes: NSDictionary;

  static readonly supported: boolean;

  static readonly processorSupported: number;

  static isSupported(): boolean;

  readonly nextFrameCount: number;

  readonly previousFrameCount: number;

  static readonly maximumDimensions: CMVideoDimensions;

  static readonly minimumDimensions: CMVideoDimensions;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class VTSuperResolutionScalerConfiguration extends NSObject implements VTFrameProcessorConfiguration {
  initWithFrameWidthFrameHeightScaleFactorInputTypeUsePrecomputedFlowQualityPrioritizationRevision(frameWidth: number, frameHeight: number, scaleFactor: number, inputType: interop.Enum<typeof VTSuperResolutionScalerConfigurationInputType>, usePrecomputedFlow: boolean, qualityPrioritization: interop.Enum<typeof VTSuperResolutionScalerConfigurationQualityPrioritization>, revision: interop.Enum<typeof VTSuperResolutionScalerConfigurationRevision>): this;

  readonly frameWidth: number;

  readonly frameHeight: number;

  readonly inputType: interop.Enum<typeof VTSuperResolutionScalerConfigurationInputType>;

  readonly precomputedFlow: boolean;

  readonly scaleFactor: number;

  readonly qualityPrioritization: interop.Enum<typeof VTSuperResolutionScalerConfigurationQualityPrioritization>;

  readonly revision: interop.Enum<typeof VTSuperResolutionScalerConfigurationRevision>;

  static readonly supportedRevisions: NSIndexSet;

  static readonly defaultRevision: interop.Enum<typeof VTSuperResolutionScalerConfigurationRevision>;

  readonly frameSupportedPixelFormats: NSArray;

  readonly sourcePixelBufferAttributes: NSDictionary;

  readonly destinationPixelBufferAttributes: NSDictionary;

  readonly configurationModelStatus: interop.Enum<typeof VTSuperResolutionScalerConfigurationModelStatus>;

  downloadConfigurationModelWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  readonly configurationModelPercentageAvailable: number;

  static readonly supported: boolean;

  static readonly supportedScaleFactors: NSArray;

  usesPrecomputedFlow(): boolean;

  static isSupported(): boolean;

  readonly nextFrameCount: number;

  readonly previousFrameCount: number;

  static readonly maximumDimensions: CMVideoDimensions;

  static readonly minimumDimensions: CMVideoDimensions;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class VTLowLatencySuperResolutionScalerParameters extends NSObject implements VTFrameProcessorParameters {
  initWithSourceFrameDestinationFrame(sourceFrame: VTFrameProcessorFrame, destinationFrame: VTFrameProcessorFrame): this;

  readonly sourceFrame: VTFrameProcessorFrame;

  readonly destinationFrame: VTFrameProcessorFrame;

  readonly destinationFrames: NSArray;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}


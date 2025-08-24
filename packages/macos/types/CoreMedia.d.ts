/// <reference types="@nativescript/objc-node-api" />

declare const kCMMetadataDataType_QuickTimeMetadataUUID: interop.Pointer;

declare const kCMMetadataBaseDataType_JSON: interop.Pointer;

declare const kCMMetadataBaseDataType_DimensionsF32: interop.Pointer;

declare const kCMMetadataBaseDataType_UInt64: interop.Pointer;

declare const kCMMetadataBaseDataType_UInt16: interop.Pointer;

declare const kCMMetadataBaseDataType_UInt8: interop.Pointer;

declare const kCMMetadataBaseDataType_SInt64: interop.Pointer;

declare const kCMMetadataBaseDataType_SInt32: interop.Pointer;

declare const kCMMetadataBaseDataType_SInt8: interop.Pointer;

declare const kCMMetadataBaseDataType_Float32: interop.Pointer;

declare const kCMMetadataBaseDataType_BMP: interop.Pointer;

declare const kCMMetadataBaseDataType_PNG: interop.Pointer;

declare const kCMMetadataBaseDataType_JPEG: interop.Pointer;

declare const kCMMetadataBaseDataType_UTF8: interop.Pointer;

declare const kCMMetadataIdentifier_QuickTimeMetadataSceneIlluminance: interop.Pointer;

declare const kCMMetadataIdentifier_QuickTimeMetadataSegmentIdentifier: interop.Pointer;

declare const kCMMetadataIdentifier_QuickTimeMetadataLivePhotoStillImageTransformReferenceDimensions: interop.Pointer;

declare const kCMMetadataIdentifier_QuickTimeMetadataLivePhotoStillImageTransform: interop.Pointer;

declare const kCMMetadataIdentifier_QuickTimeMetadataVideoOrientation: interop.Pointer;

declare const kCMMetadataKeySpace_HLSDateRange: interop.Pointer;

declare const kCMMetadataKeySpace_ID3: interop.Pointer;

declare const kCMMetadataKeySpace_QuickTimeMetadata: interop.Pointer;

declare const kCMMetadataDataTypeRegistryError_MultipleConformingBaseTypes: number;

declare const kCMMetadataDataTypeRegistryError_DataTypeAlreadyRegistered: number;

declare const kCMMetadataDataTypeRegistryError_BadDataTypeIdentifier: number;

declare const kCMMetadataDataTypeRegistryError_AllocationFailed: number;

declare const kCMMetadataIdentifierError_NoKeyValueAvailable: number;

declare const kCMMetadataIdentifierError_BadKeySpace: number;

declare const kCMMetadataIdentifierError_BadNumberKey: number;

declare const kCMMetadataIdentifierError_BadKeyLength: number;

declare const kCMMetadataIdentifierError_BadKey: number;

declare const kCMMetadataIdentifierError_RequiredParameterMissing: number;

declare const kCMTextMarkupCharacterEdgeStyle_DropShadow: interop.Pointer;

declare const kCMTextMarkupCharacterEdgeStyle_Uniform: interop.Pointer;

declare const kCMTextMarkupCharacterEdgeStyle_Depressed: interop.Pointer;

declare const kCMTextMarkupCharacterEdgeStyle_None: interop.Pointer;

declare const kCMTextMarkupAttribute_WritingDirectionSizePercentage: interop.Pointer;

declare const kCMTextMarkupAlignmentType_End: interop.Pointer;

declare const kCMTextMarkupAlignmentType_Middle: interop.Pointer;

declare const kCMTextVerticalLayout_RightToLeft: interop.Pointer;

declare const kCMTextVerticalLayout_LeftToRight: interop.Pointer;

declare const kCMTextMarkupGenericFontName_SmallCapital: interop.Pointer;

declare const kCMTextMarkupGenericFontName_Cursive: interop.Pointer;

declare const kCMTextMarkupGenericFontName_Casual: interop.Pointer;

declare const kCMTextMarkupGenericFontName_MonospaceSansSerif: interop.Pointer;

declare const kCMTextMarkupGenericFontName_MonospaceSerif: interop.Pointer;

declare const kCMTextMarkupGenericFontName_ProportionalSerif: interop.Pointer;

declare const kCMTextMarkupGenericFontName_Monospace: interop.Pointer;

declare const kCMTextMarkupGenericFontName_SansSerif: interop.Pointer;

declare const kCMTextMarkupGenericFontName_Serif: interop.Pointer;

declare const kCMTextMarkupAttribute_GenericFontFamilyName: interop.Pointer;

declare const kCMTextMarkupAttribute_FontFamilyNameList: interop.Pointer;

declare const kCMTextMarkupAttribute_UnderlineStyle: interop.Pointer;

declare const kCMTextMarkupAttribute_BoldStyle: interop.Pointer;

declare const kCMTextMarkupAttribute_BackgroundColorARGB: interop.Pointer;

declare const kCMMemoryPoolOption_AgeOutPeriod: interop.Object;

declare const kCMMemoryPoolError_InvalidParameter: number;

declare const kCMSimpleQueueError_ParameterOutOfRange: number;

declare const kCMSimpleQueueError_RequiredParameterMissing: number;

declare const kCMBufferQueueTrigger_WhenBufferCountBecomesLessThan: number;

declare const kCMBufferQueueTrigger_WhenReset: number;

declare const kCMBufferQueueTrigger_WhenMaxPresentationTimeStampChanges: number;

declare const kCMBufferQueueTrigger_WhenMinPresentationTimeStampChanges: number;

declare const kCMBufferQueueTrigger_WhenDurationBecomesGreaterThanOrEqualTo: number;

declare const kCMBufferQueueTrigger_WhenDurationBecomesGreaterThan: number;

declare const kCMBufferQueueTrigger_WhenDurationBecomesLessThanOrEqualTo: number;

declare const kCMBufferQueueError_InvalidBuffer: number;

declare const kCMBufferQueueError_InvalidTriggerToken: number;

declare const kCMBufferQueueError_CannotModifyQueueFromTriggerCallback: number;

declare const kCMBufferQueueError_QueueIsFull: number;

declare const kCMBufferQueueError_InvalidCMBufferCallbacksStruct: number;

declare const kCMBufferQueueError_RequiredParameterMissing: number;

declare const kCMBufferQueueError_AllocationFailed: number;

declare const kCMSoundDescriptionFlavor_ISOFamily: interop.Pointer;

declare const kCMImageDescriptionFlavor_ISOFamilyWithAppleExtensions: interop.Pointer;

declare const kCMImageDescriptionFlavor_3GPFamily: interop.Pointer;

declare const kCMImageDescriptionFlavor_QuickTimeMovie: interop.Pointer;

declare const kCMFormatDescriptionBridgeError_InvalidSlice: number;

declare const kCMFormatDescriptionBridgeError_IncompatibleFormatDescription: number;

declare const kCMFormatDescriptionBridgeError_InvalidFormatDescription: number;

declare const kCMFormatDescriptionBridgeError_AllocationFailed: number;

declare const kCMFormatDescriptionBridgeError_InvalidParameter: number;

declare const kCMMetadataBaseDataType_PolylineF32: interop.Pointer;

declare const kCMTimebaseNotification_TimeJumped: interop.Pointer;

declare const kCMSyncError_RateMustBeNonZero: number;

declare const kCMSyncError_InvalidParameter: number;

declare const kCMSyncError_MissingRequiredParameter: number;

declare const kCMTimebaseError_ReadOnly: number;

declare const kCMTimebaseError_MissingRequiredParameter: number;

declare const kCMClockError_UnsupportedOperation: number;

declare const kCMClockError_AllocationFailed: number;

declare const kCMMetadataIdentifier_QuickTimeMetadataDirection_Facing: interop.Pointer;

declare const kCMSimpleQueueError_AllocationFailed: number;

declare const kCMSoundDescriptionFlavor_3GPFamily: interop.Pointer;

declare const kCMTimeMappingInvalid: CMTimeMapping;

declare const kCMTimeRangeStartKey: interop.Pointer;

declare const kCMTimeRangeInvalid: CMTimeRange;

declare const kCMTagValueKey: interop.Pointer;

declare const kCMTagProjectionTypeEquirectangular: CMTag;

declare const kCMTagStereoLeftAndRightEye: CMTag;

declare const kCMTagStereoRightEye: CMTag;

declare const kCMTagMediaTypeMetadata: CMTag;

declare const kCMTagMediaSubTypeMebx: CMTag;

declare const kCMSampleAttachmentKey_PostDecodeProcessingMetadata: interop.Pointer;

declare const kCMSampleAttachmentKey_CryptorSubsampleAuxiliaryData: interop.Pointer;

declare const kCMSampleBufferAttachmentKey_ForceKeyFrame: interop.Pointer;

declare const kCMSampleBufferLensStabilizationInfo_Active: interop.Pointer;

declare const kCMSampleBufferDroppedFrameReasonInfo_CameraModeSwitch: interop.Pointer;

declare const kCMSampleBufferAttachmentKey_GradualDecoderRefresh: interop.Pointer;

declare const kCMSampleBufferAttachmentKey_SampleReferenceURL: interop.Pointer;

declare const kCMSampleBufferAttachmentKey_EndsPreviousSampleDuration: interop.Pointer;

declare const kCMSampleBufferAttachmentKey_SpeedMultiplier: interop.Pointer;

declare const kCMSampleAttachmentKey_HEVCSyncSampleNALUnitType: interop.Pointer;

declare const kCMSampleAttachmentKey_HEVCStepwiseTemporalSubLayerAccess: interop.Pointer;

declare const kCMSampleAttachmentKey_DoNotDisplay: interop.Pointer;

declare const kCMHEVCTemporalLevelInfoKey_LevelIndex: interop.Pointer;

declare const kCMHEVCTemporalLevelInfoKey_ProfileIndex: interop.Pointer;

declare const kCMHEVCTemporalLevelInfoKey_TierFlag: interop.Pointer;

declare const kCMHEVCTemporalLevelInfoKey_TemporalLevel: interop.Pointer;

declare const kCMSampleAttachmentKey_DisplayImmediately: interop.Pointer;

declare const kCMSampleAttachmentKey_NotSync: interop.Pointer;

declare const kCMSampleBufferConduitNotificationParameter_UpcomingOutputPTSRangeMayOverlapQueuedOutputPTSRange: interop.Pointer;

declare const kCMSampleBufferNotification_DataBecameReady: interop.Pointer;

declare const kCMSampleBufferFlag_AudioBufferList_Assure16ByteAlignment: number;

declare const kCMSampleBufferError_DataCanceled: number;

declare const kCMSampleBufferError_Invalidated: number;

declare const kCMSampleBufferError_InvalidMediaTypeForOperation: number;

declare const kCMSampleBufferError_BufferHasNoSampleTimingInfo: number;

declare const kCMSampleBufferError_BufferNotReady: number;

declare const kCMSampleBufferError_AlreadyHasDataBuffer: number;

declare const kCMSampleBufferError_RequiredParameterMissing: number;

declare const kCMSampleBufferError_AllocationFailed: number;

declare const kCMMetadataFormatDescriptionMetadataSpecificationKey_StructuralDependency: interop.Pointer;

declare const kCMMetadataFormatDescriptionKey_SetupData: interop.Pointer;

declare const kCMMetadataFormatDescriptionKey_StructuralDependency: interop.Pointer;

declare const kCMMetadataFormatDescriptionKey_ConformingDataTypes: interop.Pointer;

declare const kCMMetadataFormatDescriptionKey_Value: interop.Pointer;

declare const kCMMetadataFormatType_ID3: number;

declare const kCMMetadataFormatType_ICY: number;

declare const kCMTimeCodeFormatDescriptionKey_LangCode: interop.Pointer;

declare const kCMTimeCodeFlag_NegTimesOK: number;

declare const kCMTimeCodeFlag_DropFrame: number;

declare const kCMSampleAttachmentKey_HasRedundantCoding: interop.Pointer;

declare const kCMSubtitleFormatType_WebVTT: number;

declare const kCMTextFormatDescriptionStyle_Height: interop.Pointer;

declare const kCMTextFormatDescriptionExtension_HorizontalJustification: interop.Pointer;

declare const kCMTextFormatDescriptionStyle_StartChar: interop.Pointer;

declare const kCMTextFormatDescriptionExtension_DefaultStyle: interop.Pointer;

declare const kCMTextFormatDescriptionRect_Bottom: interop.Pointer;

declare const kCMTextFormatDescriptionRect_Top: interop.Pointer;

declare const kCMTextFormatDescriptionExtension_DefaultTextBox: interop.Pointer;

declare const kCMTextFormatDescriptionColor_Alpha: interop.Pointer;

declare const kCMTextDisplayFlag_obeySubtitleFormatting: number;

declare const kCMTextFormatType_3GText: number;

declare const kCMClosedCaptionFormatType_ATSC: number;

declare const kCMMuxedStreamType_MPEG2Program: number;

declare const kCMFormatDescriptionExtension_ViewPackingKind: interop.Pointer;

declare const kCMFormatDescriptionProjectionKind_HalfEquirectangular: interop.Pointer;

declare const kCMFormatDescriptionProjectionKind_Rectilinear: interop.Pointer;

declare const kCMFormatDescriptionExtension_ProjectionKind: interop.Pointer;

declare const kCMFormatDescriptionExtension_HasRightStereoEyeView: interop.Pointer;

declare const kCMFormatDescriptionHeroEye_Right: interop.Pointer;

declare const kCMFormatDescriptionHeroEye_Left: interop.Pointer;

declare const kCMFormatDescriptionLogTransferFunction_AppleLog: interop.Pointer;

declare const kCMFormatDescriptionExtension_BitsPerComponent: interop.Pointer;

declare const kCMFormatDescriptionExtension_AlphaChannelMode: interop.Pointer;

declare const kCMFormatDescriptionExtension_MasteringDisplayColorVolume: interop.Pointer;

declare const kCMFormatDescriptionVendor_Apple: interop.Pointer;

declare const kCMFormatDescriptionExtension_RevisionLevel: interop.Pointer;

declare const kCMFormatDescriptionExtension_SpatialQuality: interop.Pointer;

declare const kCMMPEG2VideoProfile_XF: number;

declare const kCMMPEG2VideoProfile_XDCAM_HD_540p: number;

declare const kCMMPEG2VideoProfile_XDCAM_HD422_1080p24_CBR50: number;

declare const kCMMPEG2VideoProfile_XDCAM_HD422_1080i50_CBR50: number;

declare const kCMMPEG2VideoProfile_XDCAM_HD422_1080i60_CBR50: number;

declare const kCMMPEG2VideoProfile_XDCAM_HD422_720p60_CBR50: number;

declare const kCMMPEG2VideoProfile_XDCAM_EX_1080i50_VBR35: number;

declare const kCMMPEG2VideoProfile_XDCAM_EX_720p30_VBR35: number;

declare const kCMMPEG2VideoProfile_XDCAM_EX_720p25_VBR35: number;

declare const kCMMPEG2VideoProfile_XDCAM_HD_1080p25_VBR35: number;

declare const kCMMPEG2VideoProfile_XDCAM_HD_1080i50_VBR35: number;

declare const kCMMPEG2VideoProfile_HDV_1080p30: number;

declare const kCMMPEG2VideoProfile_HDV_1080p25: number;

declare const kCMMPEG2VideoProfile_HDV_1080i60: number;

declare const kCMFormatDescriptionExtension_ProtectedContentOriginalFormat: interop.Pointer;

declare const kCMFormatDescriptionChromaLocation_Top: interop.Pointer;

declare const kCMFormatDescriptionChromaLocation_Left: interop.Pointer;

declare const kCMFormatDescriptionExtension_ChromaLocationTopField: interop.Pointer;

declare const kCMFormatDescriptionExtension_FullRangeVideo: interop.Pointer;

declare const kCMFormatDescriptionYCbCrMatrix_ITU_R_2020: interop.Pointer;

declare const kCMFormatDescriptionYCbCrMatrix_ITU_R_601_4: interop.Pointer;

declare const kCMFormatDescriptionTransferFunction_sRGB: interop.Pointer;

declare const kCMFormatDescriptionTransferFunction_Linear: interop.Pointer;

declare const kCMFormatDescriptionTransferFunction_ITU_R_2020: interop.Pointer;

declare const kCMFormatDescriptionTransferFunction_UseGamma: interop.Pointer;

declare const kCMFormatDescriptionTransferFunction_SMPTE_240M_1995: interop.Pointer;

declare const kCMFormatDescriptionColorPrimaries_EBU_3213: interop.Pointer;

declare const kCMFormatDescriptionFieldDetail_TemporalTopFirst: interop.Pointer;

declare const kCMFormatDescriptionExtension_FieldDetail: interop.Pointer;

declare const kCMFormatDescriptionKey_CleanApertureHeightRational: interop.Pointer;

declare const kCMFormatDescriptionKey_CleanApertureHeight: interop.Pointer;

declare const kCMVideoCodecType_AV1: number;

declare const kCMVideoCodecType_AppleProResRAW: number;

declare const kCMVideoCodecType_AppleProRes4444XQ: number;

declare const kCMVideoCodecType_DVCPROHD1080p25: number;

declare const kCMVideoCodecType_DVCPROHD1080p30: number;

declare const kCMVideoCodecType_DVCPROHD1080i50: number;

declare const kCMVideoCodecType_DVCPROHD1080i60: number;

declare const kCMVideoCodecType_DVCPROHD720p60: number;

declare const kCMVideoCodecType_DVCPAL: number;

declare const kCMVideoCodecType_DVCNTSC: number;

declare const kCMVideoCodecType_MPEG1Video: number;

declare const kCMVideoCodecType_HEVCWithAlpha: number;

declare const kCMVideoCodecType_Cinepak: number;

declare const kCMVideoCodecType_Animation: number;

declare const kCMPixelFormat_4444YpCbCrA8: number;

declare const kCMPixelFormat_422YpCbCr8_yuvs: number;

declare const kCMPixelFormat_16LE555: number;

declare const kCMPixelFormat_16BE565: number;

declare const kCMPixelFormat_32BGRA: number;

declare const kCMAudioFormatDescriptionMask_All: number;

declare const kCMAudioFormatDescriptionMask_ChannelLayout: number;

declare const kCMAudioFormatDescriptionMask_StreamBasicDescription: number;

declare const kCMFormatDescriptionExtension_SampleDescriptionExtensionAtoms: interop.Pointer;

declare const kCMMediaType_TaggedBufferGroup: number;

declare const kCMMediaType_Subtitle: number;

declare const kCMMediaType_ClosedCaption: number;

declare const kCMMediaType_Text: number;

declare const kCMMediaType_Muxed: number;

declare const kCMMediaType_Audio: number;

declare const kCMFormatDescriptionError_ValueNotAvailable: number;

declare const kCMFormatDescriptionError_AllocationFailed: number;

declare const kCMMPEG2VideoProfile_XDCAM_EX_1080p30_VBR35: number;

declare const kCMBlockBufferDontOptimizeDepthFlag: number;

declare const kCMBlockBufferAlwaysCopyDataFlag: number;

declare const kCMBlockBufferEmptyBBufErr: number;

declare const kCMBlockBufferBadPointerParameterErr: number;

declare const kCMBlockBufferBadLengthParameterErr: number;

declare const kCMBlockBufferBadCustomBlockSourceErr: number;

declare const kCMSampleAttachmentKey_IsDependedOnByOthers: interop.Pointer;

declare const kCMBlockBufferBlockAllocationFailedErr: number;

declare const kCMBlockBufferStructureAllocationFailedErr: number;

declare const kCMAttachmentMode_ShouldPropagate: number;

declare const kCMAttachmentMode_ShouldNotPropagate: number;

declare const kCMTimeFlagsKey: interop.Pointer;

declare const kCMTimeScaleKey: interop.Pointer;

declare const kCMTimeZero: CMTime;

declare const kCMTimeIndefinite: CMTime;

declare const kCMTimeInvalid: CMTime;

declare const kCMMPEG2VideoProfile_XDCAM_HD_1080p30_VBR35: number;

declare const kCMMetadataFormatDescriptionMetadataSpecificationKey_DataType: interop.Pointer;

declare const kCMFormatDescriptionError_InvalidParameter: number;

declare const kCMFormatDescriptionChromaLocation_DV420: interop.Pointer;

declare const kCMFormatDescriptionYCbCrMatrix_ITU_R_709_2: interop.Pointer;

declare const kCMTextFormatDescriptionStyle_EndChar: interop.Pointer;

declare const kCMTimeCodeFormatDescriptionKey_Value: interop.Pointer;

declare const kCMBufferQueueTrigger_WhenDurationBecomesGreaterThanOrEqualToAndBufferCountBecomesGreaterThan: number;

declare const kCMMPEG2VideoProfile_XDCAM_EX_1080p25_VBR35: number;

declare const kCMMuxedStreamType_MPEG2Transport: number;

declare const kCMVideoCodecType_AppleProRes422LT: number;

declare const kCMBlockBufferBadOffsetParameterErr: number;

declare const kCMSubtitleFormatType_3GText: number;

declare const kCMMPEG2VideoProfile_HDV_720p60: number;

declare const kCMFormatDescriptionConformsToMPEG2VideoProfile: interop.Pointer;

declare const kCMMPEG2VideoProfile_XDCAM_HD422_540p: number;

declare const kCMMetadataIdentifier_QuickTimeMetadataLocation_ISO6709: interop.Pointer;

declare const kCMTextFormatDescriptionColor_Red: interop.Pointer;

declare const kCMFormatDescriptionExtension_VerbatimISOSampleEntry: interop.Pointer;

declare const kCMTextJustification_centered: number;

declare const kCMTagPackingTypeNone: CMTag;

declare const kCMTextFormatDescriptionExtension_TextJustification: interop.Pointer;

declare const kCMSampleAttachmentKey_PartialSync: interop.Pointer;

declare const kCMSampleBufferAttachmentKey_Reverse: interop.Pointer;

declare const kCMMetadataBaseDataType_SInt16: interop.Pointer;

declare const kCMTimebaseNotificationKey_EventTime: interop.Pointer;

declare const kCMBlockBufferCustomBlockSourceVersion: number;

declare const kCMTagStereoInterpretationOrderReversed: CMTag;

declare const kCMSampleBufferLensStabilizationInfo_Unavailable: interop.Pointer;

declare const kCMVideoCodecType_AppleProResRAWHQ: number;

declare const kCMBlockBufferPermitEmptyReferenceFlag: number;

declare const kCMTagPackingTypeSideBySide: CMTag;

declare const kCMTimebaseError_TimerIntervalTooShort: number;

declare const kCMPixelFormat_444YpCbCr10: number;

declare const kCMFormatDescriptionExtension_Depth: interop.Pointer;

declare const kCMTextFormatDescriptionStyle_Font: interop.Pointer;

declare const kCMMetadataFormatType_Boxed: number;

declare const kCMFormatDescriptionColorPrimaries_SMPTE_C: interop.Pointer;

declare const kCMSampleBufferError_DataFailed: number;

declare const kCMFormatDescriptionFieldDetail_TemporalBottomFirst: interop.Pointer;

declare const kCMMetadataFormatDescriptionMetadataSpecificationKey_ExtendedLanguageTag: interop.Pointer;

declare const kCMVideoCodecType_SorensonVideo3: number;

declare const kCMTextFormatDescriptionColor_Green: interop.Pointer;

declare const kCMTextMarkupGenericFontName_Fantasy: interop.Pointer;

declare const kCMFormatDescriptionExtension_AlternativeTransferCharacteristics: interop.Pointer;

declare const kCMVideoCodecType_SorensonVideo: number;

declare const kCMTextJustification_left_top: number;

declare const kCMVideoCodecType_DVCPro50PAL: number;

declare const kCMSampleBufferError_InvalidEntryCount: number;

declare const kCMFormatDescriptionKey_CleanApertureVerticalOffset: interop.Pointer;

declare const kCMFormatDescriptionExtension_ContentLightLevelInfo: interop.Pointer;

declare const kCMFormatDescriptionExtension_FieldCount: interop.Pointer;

declare const kCMTagStereoLeftEye: CMTag;

declare const kCMMPEG2VideoProfile_HDV_720p50: number;

declare const kCMTextFormatDescriptionExtension_DefaultFontName: interop.Pointer;

declare const kCMFormatDescriptionKey_PixelAspectRatioVerticalSpacing: interop.Pointer;

declare const kCMFormatDescriptionExtension_AmbientViewingEnvironment: interop.Object;

declare const kCMMPEG2VideoProfile_XDCAM_HD422_720p50_CBR50: number;

declare const kCMVideoCodecType_DolbyVisionHEVC: number;

declare const kCMSampleBufferConduitNotification_InhibitOutputUntil: interop.Pointer;

declare const kCMClockError_MissingRequiredParameter: number;

declare const kCMBufferQueueTrigger_WhenDataBecomesReady: number;

declare const kCMTimeCodeFormatType_Counter64: number;

declare const kCMTextMarkupAlignmentType_Left: interop.Pointer;

declare const kCMHEVCTemporalLevelInfoKey_ProfileCompatibilityFlags: interop.Pointer;

declare const kCMPixelFormat_24RGB: number;

declare const kCMBufferQueueError_InvalidTriggerCondition: number;

declare const kCMSampleBufferAttachmentKey_TransitionID: interop.Pointer;

declare const kCMFormatDescriptionExtension_LogTransferFunction: interop.Pointer;

declare const kCMTagProjectionTypeFisheye: CMTag;

declare const kCMMediaType_Metadata: number;

declare const kCMAudioCodecType_AAC_LCProtected: number;

declare const kCMFormatDescriptionExtension_ICCProfile: interop.Pointer;

declare const kCMTimebaseError_AllocationFailed: number;

declare const kCMFormatDescriptionExtension_YCbCrMatrix: interop.Pointer;

declare const kCMSampleBufferError_InvalidMediaFormat: number;

declare const kCMSampleBufferNotificationParameter_OSStatus: interop.Pointer;

declare const kCMMetadataBaseDataType_PolygonF32: interop.Pointer;

declare const kCMMPEG2VideoProfile_XDCAM_HD422_1080p25_CBR50: number;

declare const kCMTextMarkupAttribute_Alignment: interop.Pointer;

declare const kCMMediaType_Video: number;

declare const kCMMetadataDataTypeRegistryError_RequiresConformingBaseType: number;

declare const kCMSampleAttachmentKey_HEVCTemporalSubLayerAccess: interop.Pointer;

declare const kCMTextMarkupAttribute_RelativeFontSize: interop.Pointer;

declare const kCMVideoCodecType_HEVC: number;

declare const kCMMPEG2VideoProfile_XDCAM_EX_1080i60_VBR35: number;

declare const kCMFormatDescriptionKey_CleanApertureHorizontalOffsetRational: interop.Pointer;

declare const kCMFormatDescriptionExtensionKey_MetadataKeyTable: interop.Pointer;

declare const kCMTagMediaTypeAudio: CMTag;

declare const kCMSampleBufferConsumerNotification_BufferConsumed: interop.Pointer;

declare const kCMFormatDescriptionExtension_PixelAspectRatio: interop.Pointer;

declare const kCMSampleBufferAttachmentKey_EmptyMedia: interop.Pointer;

declare const kCMTextMarkupGenericFontName_Default: interop.Pointer;

declare const kCMFormatDescriptionKey_PixelAspectRatioHorizontalSpacing: interop.Pointer;

declare const kCMMetadataFormatDescriptionKey_LocalID: interop.Pointer;

declare const kCMTextMarkupAttribute_CharacterBackgroundColorARGB: interop.Pointer;

declare const kCMFormatDescriptionKey_CleanApertureHorizontalOffset: interop.Pointer;

declare const kCMVideoCodecType_MPEG2Video: number;

declare const kCMFormatDescriptionExtension_ContentColorVolume: interop.Pointer;

declare const kCMMetadataKeySpace_QuickTimeUserData: interop.Pointer;

declare const kCMMPEG2VideoProfile_XDCAM_EX_720p24_VBR35: number;

declare const kCMTimingInfoInvalid: CMSampleTimingInfo;

declare const kCMTextDisplayFlag_continuousKaraoke: number;

declare const kCMFormatDescriptionChromaLocation_TopLeft: interop.Pointer;

declare const kCMPixelFormat_32ARGB: number;

declare const kCMMPEG2VideoProfile_XDCAM_HD422_720p30_CBR50: number;

declare const kCMPixelFormat_444YpCbCr8: number;

declare const kCMTextDisplayFlag_scrollDirection_bottomToTop: number;

declare const kCMVideoCodecType_DisparityHEVC: number;

declare const kCMFormatDescriptionChromaLocation_Bottom: interop.Pointer;

declare const kCMFormatDescriptionExtension_StereoCameraBaseline: interop.Pointer;

declare const kCMTextJustification_bottom_right: number;

declare const kCMMetadataFormatDescriptionMetadataSpecificationKey_SetupData: interop.Pointer;

declare const kCMTextDisplayFlag_writeTextVertically: number;

declare const kCMImageDescriptionFlavor_ISOFamily: interop.Pointer;

declare const kCMFormatDescriptionExtension_ChromaLocationBottomField: interop.Pointer;

declare const kCMTextMarkupAlignmentType_Start: interop.Pointer;

declare const kCMTextMarkupAttribute_FontFamilyName: interop.Pointer;

declare const kCMFormatDescriptionExtension_Vendor: interop.Pointer;

declare const kCMFormatDescriptionExtension_VerbatimSampleDescription: interop.Pointer;

declare const kCMSampleBufferAttachmentKey_ResumeOutput: interop.Pointer;

declare const kCMFormatDescriptionViewPackingKind_OverUnder: interop.Pointer;

declare const kCMTextDisplayFlag_allSubtitlesForced: number;

declare const kCMMPEG2VideoProfile_HDV_720p24: number;

declare const kCMTagDataTypeKey: interop.Pointer;

declare const kCMFormatDescriptionExtension_HorizontalDisparityAdjustment: interop.Pointer;

declare const kCMSampleBufferAttachmentKey_ResetDecoderBeforeDecoding: interop.Pointer;

declare const kCMMuxedStreamType_EmbeddedDeviceScreenRecording: number;

declare const kCMTimeMappingSourceKey: interop.Pointer;

declare const kCMFormatDescriptionExtension_Version: interop.Pointer;

declare const kCMTextDisplayFlag_scrollOut: number;

declare const kCMSampleBufferAttachmentKey_StillImageLensStabilizationInfo: interop.Pointer;

declare const kCMSampleBufferError_CannotSubdivide: number;

declare const kCMAudioFormatDescriptionMask_Extensions: number;

declare const kCMTimeNegativeInfinity: CMTime;

declare const kCMSampleBufferLensStabilizationInfo_Off: interop.Pointer;

declare const kCMTextMarkupAttribute_VerticalLayout: interop.Pointer;

declare const kCMVideoCodecType_JPEG_XL: number;

declare const kCMBlockBufferInsufficientSpaceErr: number;

declare const kCMFormatDescriptionColorPrimaries_ITU_R_709_2: interop.Pointer;

declare const kCMSampleBufferDroppedFrameReason_Discontinuity: interop.Pointer;

declare const kCMTimeValueKey: interop.Pointer;

declare const kCMSampleBufferAttachmentKey_PermanentEmptyMedia: interop.Pointer;

declare const kCMBufferQueueTrigger_WhenEndOfDataReached: number;

declare const kCMFormatDescriptionExtension_ColorPrimaries: interop.Pointer;

declare const kCMMetadataBaseDataType_PointF32: interop.Pointer;

declare const kCMPixelFormat_422YpCbCr16: number;

declare const kCMMediaType_TimeCode: number;

declare const kCMSampleBufferAttachmentKey_TrimDurationAtStart: interop.Pointer;

declare const kCMMetadataBaseDataType_RectF32: interop.Pointer;

declare const kCMFormatDescriptionExtension_HasLeftStereoEyeView: interop.Pointer;

declare const kCMMetadataIdentifier_QuickTimeMetadataPreferredAffineTransform: interop.Pointer;

declare const kCMTextFormatDescriptionColor_Blue: interop.Pointer;

declare const kCMFormatDescriptionTransferFunction_SMPTE_ST_428_1: interop.Pointer;

declare const kCMMetadataIdentifierError_BadIdentifier: number;

declare const kCMVideoCodecType_JPEG: number;

declare const kCMFormatDescriptionColorPrimaries_P3_D65: interop.Pointer;

declare const kCMTextFormatDescriptionExtension_VerticalJustification: interop.Pointer;

declare const kCMMetadataBaseDataType_Float64: interop.Pointer;

declare const kCMTextDisplayFlag_forcedSubtitlesPresent: number;

declare const kCMTimeCodeFormatType_TimeCode64: number;

declare const kCMFormatDescriptionFieldDetail_SpatialFirstLineLate: interop.Pointer;

declare const kCMMetadataBaseDataType_UInt32: interop.Pointer;

declare const kCMFormatDescriptionChromaLocation_Center: interop.Pointer;

declare const kCMTagPackingTypeOverUnder: CMTag;

declare const kCMFormatDescriptionViewPackingKind_SideBySide: interop.Pointer;

declare const kCMSampleBufferAttachmentKey_DisplayEmptyMediaImmediately: interop.Pointer;

declare const kCMMetadataFormatDescriptionKey_DataTypeNamespace: interop.Pointer;

declare const kCMSampleBufferAttachmentKey_DrainAfterDecoding: interop.Pointer;

declare const kCMFormatDescriptionExtension_VerbatimImageDescription: interop.Pointer;

declare const kCMFormatDescriptionKey_CleanApertureVerticalOffsetRational: interop.Pointer;

declare const kCMSampleBufferAttachmentKey_TrimDurationAtEnd: interop.Pointer;

declare const kCMFormatDescriptionChromaLocation_BottomLeft: interop.Pointer;

declare const kCMVideoCodecType_MPEG4Video: number;

declare const kCMTagProjectionTypeRectangular: CMTag;

declare const kCMMetadataIdentifierError_BadKeyType: number;

declare const kCMFormatDescriptionProjectionKind_Equirectangular: interop.Pointer;

declare const kCMMPEG2VideoProfile_XDCAM_HD422_720p24_CBR50: number;

declare const kCMMetadataBaseDataType_UTF16: interop.Pointer;

declare const kCMPixelFormat_16LE5551: number;

declare const kCMFormatDescriptionExtension_FormatName: interop.Pointer;

declare const kCMMemoryPoolError_AllocationFailed: number;

declare const kCMSampleAttachmentKey_EarlierDisplayTimesAllowed: interop.Pointer;

declare const kCMMPEG2VideoProfile_HDV_720p25: number;

declare const kCMClosedCaptionFormatType_CEA608: number;

declare const kCMTextMarkupAttribute_ForegroundColorARGB: interop.Pointer;

declare const kCMPixelFormat_16BE555: number;

declare const kCMFormatDescriptionTransferFunction_ITU_R_709_2: interop.Pointer;

declare const kCMSampleBufferDroppedFrameReason_OutOfBuffers: interop.Pointer;

declare const kCMTextDisplayFlag_scrollDirectionMask: number;

declare const kCMTextDisplayFlag_scrollDirection_rightToLeft: number;

declare const kCMSampleBufferAttachmentKey_SampleReferenceByteOffset: interop.Pointer;

declare const kCMSampleBufferError_SampleIndexOutOfRange: number;

declare const kCMTextMarkupAttribute_OrthogonalLinePositionPercentageRelativeToWritingDirection: interop.Pointer;

declare const kCMMetadataDataTypeRegistryError_RequiredParameterMissing: number;

declare const kCMMetadataIdentifierError_AllocationFailed: number;

declare const kCMFormatDescriptionExtension_HorizontalFieldOfView: interop.Pointer;

declare const kCMTextMarkupAttribute_BaseFontSizePercentageRelativeToVideoHeight: interop.Pointer;

declare const kCMBlockBufferAssureMemoryNowFlag: number;

declare const kCMMetadataBaseDataType_AffineTransformF64: interop.Pointer;

declare const kCMTextFormatType_QTText: number;

declare const kCMSampleBufferNotification_DataFailed: interop.Pointer;

declare const kCMFormatDescriptionExtension_CleanAperture: interop.Pointer;

declare const kCMFormatDescriptionYCbCrMatrix_SMPTE_240M_1995: interop.Pointer;

declare const kCMTimebaseNotification_EffectiveRateChanged: interop.Pointer;

declare const kCMMPEG2VideoProfile_HDV_1080i50: number;

declare const kCMFormatDescriptionTransferFunction_ITU_R_2100_HLG: interop.Pointer;

declare const kCMTextMarkupAlignmentType_Right: interop.Pointer;

declare const kCMFormatDescriptionColorPrimaries_DCI_P3: interop.Pointer;

declare const kCMFormatDescriptionExtension_OriginalCompressionSettings: interop.Pointer;

declare const kCMFormatDescriptionColorPrimaries_ITU_R_2020: interop.Pointer;

declare const kCMBlockBufferUnallocatedBlockErr: number;

declare const kCMMetadataFormatDescriptionKey_LanguageTag: interop.Pointer;

declare const kCMMPEG2VideoProfile_HDV_720p30: number;

declare const kCMVideoCodecType_AppleProRes4444: number;

declare const kCMMPEG2VideoProfile_XDCAM_HD_1080p24_VBR35: number;

declare const kCMFormatDescriptionKey_CleanApertureWidth: interop.Pointer;

declare const kCMTimeEpochKey: interop.Pointer;

declare const kCMFormatDescriptionColorPrimaries_P22: interop.Pointer;

declare const kCMSampleAttachmentKey_AudioIndependentSampleDecoderRefreshCount: interop.Pointer;

declare const kCMTimeCodeFormatType_TimeCode32: number;

declare const kCMClockError_InvalidParameter: number;

declare const kCMMetadataBaseDataType_RawData: interop.Pointer;

declare const kCMVideoCodecType_H264: number;

declare const kCMSampleAttachmentKey_HEVCTemporalLevelInfo: interop.Pointer;

declare const kCMBufferQueueTrigger_WhenDurationBecomesLessThan: number;

declare const kCMSoundDescriptionFlavor_QuickTimeMovie: interop.Pointer;

declare const kCMTextMarkupAttribute_CharacterEdgeStyle: interop.Pointer;

declare const kCMMetadataFormatDescriptionKey_Namespace: interop.Pointer;

declare const kCMPixelFormat_422YpCbCr10: number;

declare const kCMVideoCodecType_AppleProRes422HQ: number;

declare const kCMTagProjectionTypeHalfEquirectangular: CMTag;

declare const kCMBufferQueueError_BadTriggerDuration: number;

declare const kCMMetadataFormatType_EMSG: number;

declare const kCMFormatDescriptionTransferFunction_SMPTE_ST_2084_PQ: interop.Pointer;

declare const kCMTimebaseError_InvalidParameter: number;

declare const kCMTimeRangeDurationKey: interop.Pointer;

declare const kCMTextMarkupCharacterEdgeStyle_Raised: interop.Pointer;

declare const kCMTextFormatDescriptionStyle_FontSize: interop.Pointer;

declare const kCMTextMarkupAttribute_ItalicStyle: interop.Pointer;

declare const kCMTextFormatDescriptionStyle_Ascent: interop.Pointer;

declare const kCMSyncError_AllocationFailed: number;

declare const kCMFormatDescriptionFieldDetail_SpatialFirstLineEarly: interop.Pointer;

declare const kCMVideoCodecType_AppleProRes422Proxy: number;

declare const kCMVideoCodecType_422YpCbCr8: number;

declare const kCMMetadataKeySpace_Icy: interop.Pointer;

declare const kCMSimpleQueueError_QueueIsFull: number;

declare const kCMFormatDescriptionAlphaChannelMode_StraightAlpha: interop.Pointer;

declare const kCMMPEG2VideoProfile_HDV_1080p24: number;

declare const kCMTextFormatDescriptionExtension_FontTable: interop.Pointer;

declare const kCMMetadataDataType_QuickTimeMetadataDirection: interop.Pointer;

declare const kCMFormatDescriptionBridgeError_UnsupportedSampleDescriptionFlavor: number;

declare const kCMTagStereoNone: CMTag;

declare const kCMMetadataBaseDataType_GIF: interop.Pointer;

declare const kCMTextMarkupGenericFontName_ProportionalSansSerif: interop.Pointer;

declare const kCMTextDisplayFlag_fillTextRegion: number;

declare const kCMSampleBufferError_ArrayTooSmall: number;

declare const kCMTimePositiveInfinity: CMTime;

declare const kCMMPEG2VideoProfile_XDCAM_EX_720p50_VBR35: number;

declare const kCMSampleBufferConduitNotificationParameter_MinUpcomingOutputPTS: interop.Pointer;

declare const kCMTextFormatDescriptionRect_Left: interop.Pointer;

declare const kCMVideoCodecType_AppleProRes422: number;

declare const kCMVideoCodecType_DVCPro50NTSC: number;

declare const kCMFormatDescriptionBridgeError_InvalidSerializedSampleDescription: number;

declare const kCMTagCollectionTagsArrayKey: interop.Pointer;

declare const kCMVideoCodecType_VP9: number;

declare const kCMSampleBufferConduitNotification_UpcomingOutputPTSRangeChanged: interop.Pointer;

declare const kCMTimeCodeFormatType_Counter32: number;

declare const kCMFormatDescriptionExtension_ContainsAlphaChannel: interop.Pointer;

declare const kCMTimeRangeZero: CMTimeRange;

declare const kCMMuxedStreamType_MPEG1System: number;

declare const kCMTextDisplayFlag_scrollIn: number;

declare const kCMFormatDescriptionExtension_HasAdditionalViews: interop.Pointer;

declare const kCMPixelFormat_422YpCbCr8: number;

declare const kCMTextFormatDescriptionRect_Right: interop.Pointer;

declare const kCMTextFormatDescriptionStyle_ForegroundColor: interop.Pointer;

declare const kCMSampleBufferAttachmentKey_FillDiscontinuitiesWithSilence: interop.Pointer;

declare const kCMSampleBufferLensStabilizationInfo_OutOfRange: interop.Pointer;

declare const kCMMetadataBaseDataType_PerspectiveTransformF64: interop.Pointer;

declare const kCMSampleBufferConduitNotificationParameter_ResumeTag: interop.Pointer;

declare const kCMSampleBufferAttachmentKey_PostNotificationWhenConsumed: interop.Pointer;

declare const kCMSampleAttachmentKey_HDR10PlusPerFrameData: interop.Pointer;

declare const kCMHEVCTemporalLevelInfoKey_ProfileSpace: interop.Pointer;

declare const kCMTextDisplayFlag_scrollDirection_topToBottom: number;

declare const kCMTagCategoryKey: interop.Pointer;

declare const kCMFormatDescriptionExtension_TransferFunction: interop.Pointer;

declare const kCMTaggedBufferGroupFormatType_TaggedBufferGroup: number;

declare const kCMMPEG2VideoProfile_XDCAM_EX_1080p24_VBR35: number;

declare const kCMMPEG2VideoProfile_XDCAM_EX_720p60_VBR35: number;

declare const kCMFormatDescriptionKey_CleanApertureWidthRational: interop.Pointer;

declare const kCMSampleBufferError_SampleTimingInfoInvalid: number;

declare const kCMTextFormatDescriptionStyle_FontFace: interop.Pointer;

declare const kCMVideoCodecType_DVCPROHD720p50: number;

declare const kCMSampleBufferDroppedFrameReason_FrameWasLate: interop.Pointer;

declare const kCMVideoCodecType_DVCProPAL: number;

declare const kCMTimeMappingTargetKey: interop.Pointer;

declare const kCMFormatDescriptionExtension_BytesPerRow: interop.Pointer;

declare const kCMSoundDescriptionFlavor_QuickTimeMovieV2: interop.Pointer;

declare const kCMHEVCTemporalLevelInfoKey_ConstraintIndicatorFlags: interop.Pointer;

declare const kCMMuxedStreamType_DV: number;

declare const kCMTextMarkupAttribute_TextPositionPercentageRelativeToWritingDirection: interop.Pointer;

declare const kCMVideoCodecType_JPEG_OpenDML: number;

declare const kCMMetadataKeySpace_iTunes: interop.Pointer;

declare const kCMBufferQueueTrigger_WhenBufferCountBecomesGreaterThan: number;

declare const kCMMPEG2VideoProfile_XDCAM_HD422_720p25_CBR50: number;

declare const kCMMetadataFormatDescription_StructuralDependencyKey_DependencyIsInvalidFlag: interop.Pointer;

declare const kCMSampleBufferAttachmentKey_DroppedFrameReasonInfo: interop.Pointer;

declare const kCMSampleBufferConduitNotificationParameter_MaxUpcomingOutputPTS: interop.Pointer;

declare const kCMTextFormatDescriptionExtension_DisplayFlags: interop.Pointer;

declare const kCMFormatDescriptionExtension_HeroEye: interop.Pointer;

declare const kCMSampleBufferError_InvalidSampleData: number;

declare const kCMVideoCodecType_H263: number;

declare const kCMFormatDescriptionExtension_TemporalQuality: interop.Pointer;

declare const kCMBufferQueueError_EnqueueAfterEndOfData: number;

declare const kCMMetadataDataType_QuickTimeMetadataLocation_ISO6709: interop.Pointer;

declare const kCMBlockBufferNoErr: number;

declare const kCMTimeCodeFlag_24HourMax: number;

declare const kCMClosedCaptionFormatType_CEA708: number;

declare const kCMSampleBufferAttachmentKey_DroppedFrameReason: interop.Pointer;

declare const kCMMetadataKeySpace_ISOUserData: interop.Pointer;

declare const kCMAudioCodecType_AAC_AudibleProtected: number;

declare const kCMPixelFormat_16LE565: number;

declare const kCMTagInvalid: CMTag;

declare const kCMFormatDescriptionAlphaChannelMode_PremultipliedAlpha: interop.Pointer;

declare const kCMSampleBufferConduitNotification_ResetOutput: interop.Pointer;

declare const kCMTimeCodeFormatDescriptionExtension_SourceReferenceName: interop.Pointer;

declare const kCMFormatDescriptionExtension_GammaLevel: interop.Pointer;

declare const kCMTextFormatDescriptionExtension_BackgroundColor: interop.Pointer;

declare const kCMTextDisplayFlag_scrollDirection_leftToRight: number;

declare const kCMAudioFormatDescriptionMask_MagicCookie: number;

declare const kCMSampleBufferAttachmentKey_CameraIntrinsicMatrix: interop.Pointer;

declare const kCMSampleAttachmentKey_DependsOnOthers: interop.Pointer;

declare const kCMMPEG2VideoProfile_XDCAM_HD422_1080p30_CBR50: number;

declare const kCMMetadataDataType_QuickTimeMetadataMilliLux: interop.Pointer;

declare const kCMVideoCodecType_DepthHEVC: number;

declare const kCMPersistentTrackID_Invalid: number;

declare const kCMMetadataFormatDescriptionMetadataSpecificationKey_Identifier: interop.Pointer;

declare const kCMSampleBufferError_BufferHasNoSampleSizes: number;

declare const kCMPixelFormat_8IndexedGray_WhiteIsZero: number;

declare const kCMMediaType_AuxiliaryPicture: number;

declare const kCMTagMediaTypeVideo: CMTag;

declare const kCMFormatDescriptionExtension_AuxiliaryTypeInfo: interop.Pointer;

declare const kCMMPEG2VideoProfile_XDCAM_HD_1080i60_VBR35: number;

declare const kCMMetadataFormatDescriptionKey_DataType: interop.Pointer;

declare const CMTaggedBufferGroupError: {
  ParamErr: -15780,
  AllocationFailed: -15781,
  InternalError: -15782,
};

declare const CMPackingType: {
  None: 1852796517,
  SideBySide: 1936286821,
  OverUnder: 1870030194,
};

declare const CMProjectionType: {
  Rectangular: 1919247220,
  Equirectangular: 1701934441,
  HalfEquirectangular: 1751478645,
  Fisheye: 1718186856,
};

declare const CMTagError: {
  ParamErr: -15730,
  AllocationFailed: -15731,
};

declare const CMTimeRoundingMethod: {
  RoundHalfAwayFromZero: 1,
  RoundTowardZero: 2,
  RoundAwayFromZero: 3,
  QuickTime: 4,
  RoundTowardPositiveInfinity: 5,
  RoundTowardNegativeInfinity: 6,
  Default: 1,
};

declare const CMTagDataType: {
  Invalid: 0,
  SInt64: 2,
  Float64: 3,
  OSType: 5,
  Flags: 7,
};

declare const CMTimeFlags: {
  Valid: 1,
  HasBeenRounded: 2,
  PositiveInfinity: 4,
  NegativeInfinity: 8,
  Indefinite: 16,
  ImpliedValueFlagsMask: 28,
};

declare const CMStereoViewComponents: {
  None: 0,
  LeftEye: 1,
  RightEye: 2,
};

declare const CMTagCategory: {
  Undefined: 0,
  MediaType: 1835297121,
  MediaSubType: 1836283234,
  TrackID: 1953653099,
  ChannelID: 1986226286,
  VideoLayerID: 1986814329,
  PixelFormat: 1885960294,
  PackingType: 1885430635,
  ProjectionType: 1886547818,
  StereoView: 1702454643,
  StereoViewInterpretation: 1702455664,
};

declare const CMTagCollectionError: {
  ParamErr: -15740,
  AllocationFailed: -15741,
  InternalError: -15742,
  InvalidTag: -15743,
  InvalidTagCollectionDictionary: -15744,
  InvalidTagCollectionData: -15745,
  TagNotFound: -15746,
  InvalidTagCollectionDataVersion: -15747,
  ExhaustedBufferSize: -15748,
  NotYetImplemented: -15749,
};

declare const CMStereoViewInterpretationOptions: {
  Default: 0,
  StereoOrderReversed: 1,
  AdditionalViews: 2,
};

declare class opaqueCMSimpleQueue {
  constructor(init?: opaqueCMSimpleQueue);
}

declare class opaqueCMBufferQueueTriggerToken {
  constructor(init?: opaqueCMBufferQueueTriggerToken);
}

declare class opaqueCMBufferQueue {
  constructor(init?: opaqueCMBufferQueue);
}

declare class OpaqueCMClock {
  constructor(init?: OpaqueCMClock);
}

declare class CMTag {
  constructor(init?: CMTag);
  category: interop.Enum<typeof CMTagCategory>;
  dataType: interop.Enum<typeof CMTagDataType>;
  value: number;
}

declare class opaqueCMSampleBuffer {
  constructor(init?: opaqueCMSampleBuffer);
}

declare class CMVideoDimensions {
  constructor(init?: CMVideoDimensions);
  width: number;
  height: number;
}

declare class CMBlockBufferCustomBlockSource {
  constructor(init?: CMBlockBufferCustomBlockSource);
  version: number;
  AllocateBlock: (p1: interop.PointerConvertible, p2: number) => interop.Pointer | null;
  FreeBlock: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => void | null;
  refCon: interop.Pointer;
}

declare class CMTime {
  constructor(init?: CMTime);
  value: number;
  timescale: number;
  flags: interop.Enum<typeof CMTimeFlags>;
  epoch: number;
}

declare class OpaqueCMMemoryPool {
  constructor(init?: OpaqueCMMemoryPool);
}

declare class OpaqueCMTimebase {
  constructor(init?: OpaqueCMTimebase);
}

declare class CMTimeMapping {
  constructor(init?: CMTimeMapping);
  source: CMTimeRange;
  target: CMTimeRange;
}

declare class CMBufferCallbacks {
  constructor(init?: CMBufferCallbacks);
  version: number;
  refcon: interop.Pointer;
  getDecodeTimeStamp: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => CMTime | null;
  getPresentationTimeStamp: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => CMTime | null;
  getDuration: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => CMTime | null;
  isDataReady: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  compare: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => interop.Enum<typeof CFComparisonResult> | null;
  dataBecameReadyNotification: interop.Object | null;
  getSize: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
}

declare class OpaqueCMTagCollection {
  constructor(init?: OpaqueCMTagCollection);
}

declare class CMSampleTimingInfo {
  constructor(init?: CMSampleTimingInfo);
  duration: CMTime;
  presentationTimeStamp: CMTime;
  decodeTimeStamp: CMTime;
}

declare class CMTimeRange {
  constructor(init?: CMTimeRange);
  start: CMTime;
  duration: CMTime;
}

declare class OpaqueCMTaggedBufferGroup {
  constructor(init?: OpaqueCMTaggedBufferGroup);
}

declare class opaqueCMFormatDescription {
  constructor(init?: opaqueCMFormatDescription);
}

declare class OpaqueCMBlockBuffer {
  constructor(init?: OpaqueCMBlockBuffer);
}

declare class CMBufferHandlers {
  constructor(init?: CMBufferHandlers);
  version: number;
  getDecodeTimeStamp: (p1: interop.PointerConvertible) => CMTime | null;
  getPresentationTimeStamp: (p1: interop.PointerConvertible) => CMTime | null;
  getDuration: (p1: interop.PointerConvertible) => CMTime | null;
  isDataReady: (p1: interop.PointerConvertible) => number | null;
  compare: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Enum<typeof CFComparisonResult> | null;
  dataBecameReadyNotification: interop.Object | null;
  getSize: (p1: interop.PointerConvertible) => number | null;
}

declare function CMTimeMake(value: number, timescale: number): CMTime;

declare function CMTimeMakeWithEpoch(value: number, timescale: number, epoch: number): CMTime;

declare function CMTimeMakeWithSeconds(seconds: number, preferredTimescale: number): CMTime;

declare function CMTimeGetSeconds(time: CMTime): number;

declare function CMTimeConvertScale(time: CMTime, newTimescale: number, method: interop.Enum<typeof CMTimeRoundingMethod>): CMTime;

declare function CMTimeAdd(lhs: CMTime, rhs: CMTime): CMTime;

declare function CMTimeSubtract(lhs: CMTime, rhs: CMTime): CMTime;

declare function CMTimeMultiply(time: CMTime, multiplier: number): CMTime;

declare function CMTimeMultiplyByFloat64(time: CMTime, multiplier: number): CMTime;

declare function CMTimeMultiplyByRatio(time: CMTime, multiplier: number, divisor: number): CMTime;

declare function CMTimeCompare(time1: CMTime, time2: CMTime): number;

declare function CMTimeMinimum(time1: CMTime, time2: CMTime): CMTime;

declare function CMTimeMaximum(time1: CMTime, time2: CMTime): CMTime;

declare function CMTimeAbsoluteValue(time: CMTime): CMTime;

declare function CMTimeCopyAsDictionary(time: CMTime, allocator: interop.Object): interop.Object;

declare function CMTimeMakeFromDictionary(dictionaryRepresentation: interop.Object): CMTime;

declare function CMTimeCopyDescription(allocator: interop.Object, time: CMTime): interop.Object;

declare function CMTimeShow(time: CMTime): void;

declare function CMSetAttachment(target: interop.Object, key: interop.Object, value: interop.Object, attachmentMode: number): void;

declare function CMGetAttachment(target: interop.Object, key: interop.Object, attachmentModeOut: interop.PointerConvertible): interop.Object;

declare function CMRemoveAttachment(target: interop.Object, key: interop.Object): void;

declare function CMRemoveAllAttachments(target: interop.Object): void;

declare function CMCopyDictionaryOfAttachments(allocator: interop.Object, target: interop.Object, attachmentMode: number): interop.Object;

declare function CMSetAttachments(target: interop.Object, theAttachments: interop.Object, attachmentMode: number): void;

declare function CMPropagateAttachments(source: interop.Object, destination: interop.Object): void;

declare function CMBlockBufferCreateEmpty(structureAllocator: interop.Object, subBlockCapacity: number, flags: number, blockBufferOut: interop.PointerConvertible): number;

declare function CMBlockBufferCreateWithMemoryBlock(structureAllocator: interop.Object, memoryBlock: interop.PointerConvertible, blockLength: number, blockAllocator: interop.Object, customBlockSource: interop.PointerConvertible, offsetToData: number, dataLength: number, flags: number, blockBufferOut: interop.PointerConvertible): number;

declare function CMBlockBufferCreateWithBufferReference(structureAllocator: interop.Object, bufferReference: interop.Object, offsetToData: number, dataLength: number, flags: number, blockBufferOut: interop.PointerConvertible): number;

declare function CMBlockBufferCreateContiguous(structureAllocator: interop.Object, sourceBuffer: interop.Object, blockAllocator: interop.Object, customBlockSource: interop.PointerConvertible, offsetToData: number, dataLength: number, flags: number, blockBufferOut: interop.PointerConvertible): number;

declare function CMBlockBufferGetTypeID(): number;

declare function CMBlockBufferAppendMemoryBlock(theBuffer: interop.Object, memoryBlock: interop.PointerConvertible, blockLength: number, blockAllocator: interop.Object, customBlockSource: interop.PointerConvertible, offsetToData: number, dataLength: number, flags: number): number;

declare function CMBlockBufferAppendBufferReference(theBuffer: interop.Object, targetBBuf: interop.Object, offsetToData: number, dataLength: number, flags: number): number;

declare function CMBlockBufferAssureBlockMemory(theBuffer: interop.Object): number;

declare function CMBlockBufferAccessDataBytes(theBuffer: interop.Object, offset: number, length: number, temporaryBlock: interop.PointerConvertible, returnedPointerOut: interop.PointerConvertible): number;

declare function CMBlockBufferCopyDataBytes(theSourceBuffer: interop.Object, offsetToData: number, dataLength: number, destination: interop.PointerConvertible): number;

declare function CMBlockBufferReplaceDataBytes(sourceBytes: interop.PointerConvertible, destinationBuffer: interop.Object, offsetIntoDestination: number, dataLength: number): number;

declare function CMBlockBufferFillDataBytes(fillByte: number, destinationBuffer: interop.Object, offsetIntoDestination: number, dataLength: number): number;

declare function CMBlockBufferGetDataPointer(theBuffer: interop.Object, offset: number, lengthAtOffsetOut: interop.PointerConvertible, totalLengthOut: interop.PointerConvertible, dataPointerOut: interop.PointerConvertible): number;

declare function CMBlockBufferGetDataLength(theBuffer: interop.Object): number;

declare function CMBlockBufferIsRangeContiguous(theBuffer: interop.Object, offset: number, length: number): number;

declare function CMBlockBufferIsEmpty(theBuffer: interop.Object): number;

declare function CMFormatDescriptionCreate(allocator: interop.Object, mediaType: number, mediaSubType: number, extensions: interop.Object, formatDescriptionOut: interop.PointerConvertible): number;

declare function CMFormatDescriptionGetTypeID(): number;

declare function CMFormatDescriptionEqual(formatDescription: interop.Object, otherFormatDescription: interop.Object): number;

declare function CMFormatDescriptionEqualIgnoringExtensionKeys(formatDescription: interop.Object, otherFormatDescription: interop.Object, formatDescriptionExtensionKeysToIgnore: interop.Object, sampleDescriptionExtensionAtomKeysToIgnore: interop.Object): number;

declare function CMFormatDescriptionGetMediaType(desc: interop.Object): number;

declare function CMFormatDescriptionGetMediaSubType(desc: interop.Object): number;

declare function CMFormatDescriptionGetExtensions(desc: interop.Object): interop.Object;

declare function CMFormatDescriptionGetExtension(desc: interop.Object, extensionKey: interop.Object): interop.Object;

declare function CMAudioFormatDescriptionCreate(allocator: interop.Object, asbd: interop.PointerConvertible, layoutSize: number, layout: interop.PointerConvertible, magicCookieSize: number, magicCookie: interop.PointerConvertible, extensions: interop.Object, formatDescriptionOut: interop.PointerConvertible): number;

declare function CMAudioFormatDescriptionGetStreamBasicDescription(desc: interop.Object): interop.Pointer;

declare function CMAudioFormatDescriptionGetMagicCookie(desc: interop.Object, sizeOut: interop.PointerConvertible): interop.Pointer;

declare function CMAudioFormatDescriptionGetChannelLayout(desc: interop.Object, sizeOut: interop.PointerConvertible): interop.Pointer;

declare function CMAudioFormatDescriptionGetFormatList(desc: interop.Object, sizeOut: interop.PointerConvertible): interop.Pointer;

declare function CMAudioFormatDescriptionGetRichestDecodableFormat(desc: interop.Object): interop.Pointer;

declare function CMAudioFormatDescriptionGetMostCompatibleFormat(desc: interop.Object): interop.Pointer;

declare function CMAudioFormatDescriptionCreateSummary(allocator: interop.Object, formatDescriptionArray: interop.Object, flags: number, formatDescriptionOut: interop.PointerConvertible): number;

declare function CMAudioFormatDescriptionEqual(formatDescription: interop.Object, otherFormatDescription: interop.Object, equalityMask: number, equalityMaskOut: interop.PointerConvertible): number;

declare function CMVideoFormatDescriptionCreate(allocator: interop.Object, codecType: number, width: number, height: number, extensions: interop.Object, formatDescriptionOut: interop.PointerConvertible): number;

declare function CMVideoFormatDescriptionCreateForImageBuffer(allocator: interop.Object, imageBuffer: interop.Object, formatDescriptionOut: interop.PointerConvertible): number;

declare function CMVideoFormatDescriptionCreateFromH264ParameterSets(allocator: interop.Object, parameterSetCount: number, parameterSetPointers: interop.PointerConvertible, parameterSetSizes: interop.PointerConvertible, NALUnitHeaderLength: number, formatDescriptionOut: interop.PointerConvertible): number;

declare function CMVideoFormatDescriptionCreateFromHEVCParameterSets(allocator: interop.Object, parameterSetCount: number, parameterSetPointers: interop.PointerConvertible, parameterSetSizes: interop.PointerConvertible, NALUnitHeaderLength: number, extensions: interop.Object, formatDescriptionOut: interop.PointerConvertible): number;

declare function CMVideoFormatDescriptionGetH264ParameterSetAtIndex(videoDesc: interop.Object, parameterSetIndex: number, parameterSetPointerOut: interop.PointerConvertible, parameterSetSizeOut: interop.PointerConvertible, parameterSetCountOut: interop.PointerConvertible, NALUnitHeaderLengthOut: interop.PointerConvertible): number;

declare function CMVideoFormatDescriptionGetHEVCParameterSetAtIndex(videoDesc: interop.Object, parameterSetIndex: number, parameterSetPointerOut: interop.PointerConvertible, parameterSetSizeOut: interop.PointerConvertible, parameterSetCountOut: interop.PointerConvertible, NALUnitHeaderLengthOut: interop.PointerConvertible): number;

declare function CMVideoFormatDescriptionGetDimensions(videoDesc: interop.Object): CMVideoDimensions;

declare function CMVideoFormatDescriptionGetPresentationDimensions(videoDesc: interop.Object, usePixelAspectRatio: number, useCleanAperture: number): CGSize;

declare function CMVideoFormatDescriptionGetCleanAperture(videoDesc: interop.Object, originIsAtTopLeft: number): CGRect;

declare function CMVideoFormatDescriptionGetExtensionKeysCommonWithImageBuffers(): interop.Object;

declare function CMVideoFormatDescriptionMatchesImageBuffer(desc: interop.Object, imageBuffer: interop.Object): number;

declare function CMVideoFormatDescriptionCopyTagCollectionArray(formatDescription: interop.Object, tagCollectionsOut: interop.PointerConvertible): number;

declare function CMMuxedFormatDescriptionCreate(allocator: interop.Object, muxType: number, extensions: interop.Object, formatDescriptionOut: interop.PointerConvertible): number;

declare function CMTextFormatDescriptionGetDisplayFlags(desc: interop.Object, displayFlagsOut: interop.PointerConvertible): number;

declare function CMTextFormatDescriptionGetJustification(desc: interop.Object, horizontaJustificationlOut: interop.PointerConvertible, verticalJustificationOut: interop.PointerConvertible): number;

declare function CMTextFormatDescriptionGetDefaultTextBox(desc: interop.Object, originIsAtTopLeft: number, heightOfTextTrack: number, defaultTextBoxOut: interop.PointerConvertible): number;

declare function CMTextFormatDescriptionGetDefaultStyle(desc: interop.Object, localFontIDOut: interop.PointerConvertible, boldOut: interop.PointerConvertible, italicOut: interop.PointerConvertible, underlineOut: interop.PointerConvertible, fontSizeOut: interop.PointerConvertible, colorComponentsOut: interop.PointerConvertible): number;

declare function CMTextFormatDescriptionGetFontName(desc: interop.Object, localFontID: number, fontNameOut: interop.PointerConvertible): number;

declare function CMTimeCodeFormatDescriptionCreate(allocator: interop.Object, timeCodeFormatType: number, frameDuration: CMTime, frameQuanta: number, flags: number, extensions: interop.Object, formatDescriptionOut: interop.PointerConvertible): number;

declare function CMTimeCodeFormatDescriptionGetFrameDuration(timeCodeFormatDescription: interop.Object): CMTime;

declare function CMTimeCodeFormatDescriptionGetFrameQuanta(timeCodeFormatDescription: interop.Object): number;

declare function CMTimeCodeFormatDescriptionGetTimeCodeFlags(desc: interop.Object): number;

declare function CMMetadataFormatDescriptionCreateWithKeys(allocator: interop.Object, metadataType: number, keys: interop.Object, formatDescriptionOut: interop.PointerConvertible): number;

declare function CMMetadataFormatDescriptionCreateWithMetadataSpecifications(allocator: interop.Object, metadataType: number, metadataSpecifications: interop.Object, formatDescriptionOut: interop.PointerConvertible): number;

declare function CMMetadataFormatDescriptionCreateWithMetadataFormatDescriptionAndMetadataSpecifications(allocator: interop.Object, sourceDescription: interop.Object, metadataSpecifications: interop.Object, formatDescriptionOut: interop.PointerConvertible): number;

declare function CMMetadataFormatDescriptionCreateByMergingMetadataFormatDescriptions(allocator: interop.Object, sourceDescription: interop.Object, otherSourceDescription: interop.Object, formatDescriptionOut: interop.PointerConvertible): number;

declare function CMMetadataFormatDescriptionGetKeyWithLocalID(desc: interop.Object, localKeyID: number): interop.Object;

declare function CMMetadataFormatDescriptionGetIdentifiers(desc: interop.Object): interop.Object;

declare function CMSampleBufferCreate(allocator: interop.Object, dataBuffer: interop.Object, dataReady: number, makeDataReadyCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number, makeDataReadyRefcon: interop.PointerConvertible, formatDescription: interop.Object, numSamples: number, numSampleTimingEntries: number, sampleTimingArray: interop.PointerConvertible, numSampleSizeEntries: number, sampleSizeArray: interop.PointerConvertible, sampleBufferOut: interop.PointerConvertible): number;

declare function CMSampleBufferCreateWithMakeDataReadyHandler(allocator: interop.Object, dataBuffer: interop.Object, dataReady: number, formatDescription: interop.Object, numSamples: number, numSampleTimingEntries: number, sampleTimingArray: interop.PointerConvertible, numSampleSizeEntries: number, sampleSizeArray: interop.PointerConvertible, sampleBufferOut: interop.PointerConvertible, makeDataReadyHandler: (p1: interop.PointerConvertible) => number): number;

declare function CMSampleBufferCreateReady(allocator: interop.Object, dataBuffer: interop.Object, formatDescription: interop.Object, numSamples: number, numSampleTimingEntries: number, sampleTimingArray: interop.PointerConvertible, numSampleSizeEntries: number, sampleSizeArray: interop.PointerConvertible, sampleBufferOut: interop.PointerConvertible): number;

declare function CMAudioSampleBufferCreateWithPacketDescriptions(allocator: interop.Object, dataBuffer: interop.Object, dataReady: number, makeDataReadyCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number, makeDataReadyRefcon: interop.PointerConvertible, formatDescription: interop.Object, numSamples: number, presentationTimeStamp: CMTime, packetDescriptions: interop.PointerConvertible, sampleBufferOut: interop.PointerConvertible): number;

declare function CMAudioSampleBufferCreateWithPacketDescriptionsAndMakeDataReadyHandler(allocator: interop.Object, dataBuffer: interop.Object, dataReady: number, formatDescription: interop.Object, numSamples: number, presentationTimeStamp: CMTime, packetDescriptions: interop.PointerConvertible, sampleBufferOut: interop.PointerConvertible, makeDataReadyHandler: (p1: interop.PointerConvertible) => number): number;

declare function CMAudioSampleBufferCreateReadyWithPacketDescriptions(allocator: interop.Object, dataBuffer: interop.Object, formatDescription: interop.Object, numSamples: number, presentationTimeStamp: CMTime, packetDescriptions: interop.PointerConvertible, sampleBufferOut: interop.PointerConvertible): number;

declare function CMSampleBufferCreateForImageBuffer(allocator: interop.Object, imageBuffer: interop.Object, dataReady: number, makeDataReadyCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number, makeDataReadyRefcon: interop.PointerConvertible, formatDescription: interop.Object, sampleTiming: interop.PointerConvertible, sampleBufferOut: interop.PointerConvertible): number;

declare function CMSampleBufferCreateForImageBufferWithMakeDataReadyHandler(allocator: interop.Object, imageBuffer: interop.Object, dataReady: number, formatDescription: interop.Object, sampleTiming: interop.PointerConvertible, sampleBufferOut: interop.PointerConvertible, makeDataReadyHandler: (p1: interop.PointerConvertible) => number): number;

declare function CMSampleBufferCreateReadyWithImageBuffer(allocator: interop.Object, imageBuffer: interop.Object, formatDescription: interop.Object, sampleTiming: interop.PointerConvertible, sampleBufferOut: interop.PointerConvertible): number;

declare function CMSampleBufferCreateCopy(allocator: interop.Object, sbuf: interop.Object, sampleBufferOut: interop.PointerConvertible): number;

declare function CMSampleBufferCreateCopyWithNewTiming(allocator: interop.Object, originalSBuf: interop.Object, numSampleTimingEntries: number, sampleTimingArray: interop.PointerConvertible, sampleBufferOut: interop.PointerConvertible): number;

declare function CMSampleBufferCopySampleBufferForRange(allocator: interop.Object, sbuf: interop.Object, sampleRange: CFRange, sampleBufferOut: interop.PointerConvertible): number;

declare function CMSampleBufferGetTypeID(): number;

declare function CMSampleBufferSetDataBuffer(sbuf: interop.Object, dataBuffer: interop.Object): number;

declare function CMSampleBufferGetDataBuffer(sbuf: interop.Object): interop.Object;

declare function CMSampleBufferGetImageBuffer(sbuf: interop.Object): interop.Object;

declare function CMSampleBufferSetDataBufferFromAudioBufferList(sbuf: interop.Object, blockBufferStructureAllocator: interop.Object, blockBufferBlockAllocator: interop.Object, flags: number, bufferList: interop.PointerConvertible): number;

declare function CMSampleBufferGetAudioBufferListWithRetainedBlockBuffer(sbuf: interop.Object, bufferListSizeNeededOut: interop.PointerConvertible, bufferListOut: interop.PointerConvertible, bufferListSize: number, blockBufferStructureAllocator: interop.Object, blockBufferBlockAllocator: interop.Object, flags: number, blockBufferOut: interop.PointerConvertible): number;

declare function CMSampleBufferGetAudioStreamPacketDescriptions(sbuf: interop.Object, packetDescriptionsSize: number, packetDescriptionsOut: interop.PointerConvertible, packetDescriptionsSizeNeededOut: interop.PointerConvertible): number;

declare function CMSampleBufferGetAudioStreamPacketDescriptionsPtr(sbuf: interop.Object, packetDescriptionsPointerOut: interop.PointerConvertible, packetDescriptionsSizeOut: interop.PointerConvertible): number;

declare function CMSampleBufferCopyPCMDataIntoAudioBufferList(sbuf: interop.Object, frameOffset: number, numFrames: number, bufferList: interop.PointerConvertible): number;

declare function CMSampleBufferSetDataReady(sbuf: interop.Object): number;

declare function CMSampleBufferDataIsReady(sbuf: interop.Object): number;

declare function CMSampleBufferSetDataFailed(sbuf: interop.Object, status: number): number;

declare function CMSampleBufferHasDataFailed(sbuf: interop.Object, statusOut: interop.PointerConvertible): number;

declare function CMSampleBufferMakeDataReady(sbuf: interop.Object): number;

declare function CMSampleBufferTrackDataReadiness(sbuf: interop.Object, sampleBufferToTrack: interop.Object): number;

declare function CMSampleBufferInvalidate(sbuf: interop.Object): number;

declare function CMSampleBufferSetInvalidateCallback(sbuf: interop.Object, invalidateCallback: (p1: interop.PointerConvertible, p2: number) => void, invalidateRefCon: number): number;

declare function CMSampleBufferSetInvalidateHandler(sbuf: interop.Object, invalidateHandler: (p1: interop.PointerConvertible) => void): number;

declare function CMSampleBufferIsValid(sbuf: interop.Object): number;

declare function CMSampleBufferGetNumSamples(sbuf: interop.Object): number;

declare function CMSampleBufferGetDuration(sbuf: interop.Object): CMTime;

declare function CMSampleBufferGetPresentationTimeStamp(sbuf: interop.Object): CMTime;

declare function CMSampleBufferGetDecodeTimeStamp(sbuf: interop.Object): CMTime;

declare function CMSampleBufferGetOutputDuration(sbuf: interop.Object): CMTime;

declare function CMSampleBufferGetOutputPresentationTimeStamp(sbuf: interop.Object): CMTime;

declare function CMSampleBufferSetOutputPresentationTimeStamp(sbuf: interop.Object, outputPresentationTimeStamp: CMTime): number;

declare function CMSampleBufferGetOutputDecodeTimeStamp(sbuf: interop.Object): CMTime;

declare function CMSampleBufferGetSampleTimingInfoArray(sbuf: interop.Object, numSampleTimingEntries: number, timingArrayOut: interop.PointerConvertible, timingArrayEntriesNeededOut: interop.PointerConvertible): number;

declare function CMSampleBufferGetOutputSampleTimingInfoArray(sbuf: interop.Object, timingArrayEntries: number, timingArrayOut: interop.PointerConvertible, timingArrayEntriesNeededOut: interop.PointerConvertible): number;

declare function CMSampleBufferGetSampleTimingInfo(sbuf: interop.Object, sampleIndex: number, timingInfoOut: interop.PointerConvertible): number;

declare function CMSampleBufferGetSampleSizeArray(sbuf: interop.Object, sizeArrayEntries: number, sizeArrayOut: interop.PointerConvertible, sizeArrayEntriesNeededOut: interop.PointerConvertible): number;

declare function CMSampleBufferGetSampleSize(sbuf: interop.Object, sampleIndex: number): number;

declare function CMSampleBufferGetTotalSampleSize(sbuf: interop.Object): number;

declare function CMSampleBufferGetFormatDescription(sbuf: interop.Object): interop.Object;

declare function CMSampleBufferGetSampleAttachmentsArray(sbuf: interop.Object, createIfNecessary: number): interop.Object;

declare function CMSampleBufferCallForEachSample(sbuf: interop.Object, callback: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number, refcon: interop.PointerConvertible): number;

declare function CMSampleBufferCallBlockForEachSample(sbuf: interop.Object, handler: (p1: interop.PointerConvertible, p2: number) => number): number;

declare function CMTagGetValueDataType(tag: CMTag): interop.Enum<typeof CMTagDataType>;

declare function CMTagHasSInt64Value(tag: CMTag): number;

declare function CMTagGetSInt64Value(tag: CMTag): number;

declare function CMTagHasFloat64Value(tag: CMTag): number;

declare function CMTagGetFloat64Value(tag: CMTag): number;

declare function CMTagHasOSTypeValue(tag: CMTag): number;

declare function CMTagGetOSTypeValue(tag: CMTag): number;

declare function CMTagHasFlagsValue(tag: CMTag): number;

declare function CMTagGetFlagsValue(tag: CMTag): number;

declare function CMTagMakeWithSInt64Value(category: interop.Enum<typeof CMTagCategory>, value: number): CMTag;

declare function CMTagMakeWithFloat64Value(category: interop.Enum<typeof CMTagCategory>, value: number): CMTag;

declare function CMTagMakeWithOSTypeValue(category: interop.Enum<typeof CMTagCategory>, value: number): CMTag;

declare function CMTagMakeWithFlagsValue(category: interop.Enum<typeof CMTagCategory>, flagsForTag: number): CMTag;

declare function CMTagEqualToTag(tag1: CMTag, tag2: CMTag): number;

declare function CMTagCompare(tag1: CMTag, tag2: CMTag): interop.Enum<typeof CFComparisonResult>;

declare function CMTagHash(tag: CMTag): number;

declare function CMTagCopyDescription(allocator: interop.Object, tag: CMTag): interop.Object;

declare function CMTagCopyAsDictionary(tag: CMTag, allocator: interop.Object): interop.Object;

declare function CMTagMakeFromDictionary(dict: interop.Object): CMTag;

declare function CMTimeRangeMake(start: CMTime, duration: CMTime): CMTimeRange;

declare function CMTimeRangeGetUnion(range: CMTimeRange, otherRange: CMTimeRange): CMTimeRange;

declare function CMTimeRangeGetIntersection(range: CMTimeRange, otherRange: CMTimeRange): CMTimeRange;

declare function CMTimeRangeEqual(range1: CMTimeRange, range2: CMTimeRange): number;

declare function CMTimeRangeContainsTime(range: CMTimeRange, time: CMTime): number;

declare function CMTimeRangeContainsTimeRange(range: CMTimeRange, otherRange: CMTimeRange): number;

declare function CMTimeRangeGetEnd(range: CMTimeRange): CMTime;

declare function CMTimeMapTimeFromRangeToRange(t: CMTime, fromRange: CMTimeRange, toRange: CMTimeRange): CMTime;

declare function CMTimeClampToRange(time: CMTime, range: CMTimeRange): CMTime;

declare function CMTimeMapDurationFromRangeToRange(dur: CMTime, fromRange: CMTimeRange, toRange: CMTimeRange): CMTime;

declare function CMTimeFoldIntoRange(time: CMTime, foldRange: CMTimeRange): CMTime;

declare function CMTimeRangeFromTimeToTime(start: CMTime, end: CMTime): CMTimeRange;

declare function CMTimeRangeCopyAsDictionary(range: CMTimeRange, allocator: interop.Object): interop.Object;

declare function CMTimeRangeMakeFromDictionary(dictionaryRepresentation: interop.Object): CMTimeRange;

declare function CMTimeRangeCopyDescription(allocator: interop.Object, range: CMTimeRange): interop.Object;

declare function CMTimeRangeShow(range: CMTimeRange): void;

declare function CMTimeMappingMake(source: CMTimeRange, target: CMTimeRange): CMTimeMapping;

declare function CMTimeMappingMakeEmpty(target: CMTimeRange): CMTimeMapping;

declare function CMTimeMappingCopyAsDictionary(mapping: CMTimeMapping, allocator: interop.Object): interop.Object;

declare function CMTimeMappingMakeFromDictionary(dictionaryRepresentation: interop.Object): CMTimeMapping;

declare function CMTimeMappingCopyDescription(allocator: interop.Object, mapping: CMTimeMapping): interop.Object;

declare function CMTimeMappingShow(mapping: CMTimeMapping): void;

declare function CMTagCollectionGetTypeID(): number;

declare function CMTagCollectionCreate(allocator: interop.Object, tags: interop.PointerConvertible, tagCount: number, newCollectionOut: interop.PointerConvertible): number;

declare function CMTagCollectionCreateMutable(allocator: interop.Object, capacity: number, newMutableCollectionOut: interop.PointerConvertible): number;

declare function CMTagCollectionCreateCopy(tagCollection: interop.PointerConvertible, allocator: interop.Object, newCollectionCopyOut: interop.PointerConvertible): number;

declare function CMTagCollectionCreateMutableCopy(tagCollection: interop.PointerConvertible, allocator: interop.Object, newMutableCollectionCopyOut: interop.PointerConvertible): number;

declare function CMTagCollectionCopyDescription(allocator: interop.Object, tagCollection: interop.PointerConvertible): interop.Object;

declare function CMTagCollectionGetCount(tagCollection: interop.PointerConvertible): number;

declare function CMTagCollectionContainsTag(tagCollection: interop.PointerConvertible, tag: CMTag): number;

declare function CMTagCollectionContainsTagsOfCollection(tagCollection: interop.PointerConvertible, containedTagCollection: interop.PointerConvertible): number;

declare function CMTagCollectionContainsSpecifiedTags(tagCollection: interop.PointerConvertible, containedTags: interop.PointerConvertible, containedTagCount: number): number;

declare function CMTagCollectionContainsCategory(tagCollection: interop.PointerConvertible, category: interop.Enum<typeof CMTagCategory>): number;

declare function CMTagCollectionGetCountOfCategory(tagCollection: interop.PointerConvertible, category: interop.Enum<typeof CMTagCategory>): number;

declare function CMTagCollectionGetTags(tagCollection: interop.PointerConvertible, tagBuffer: interop.PointerConvertible, tagBufferCount: number, numberOfTagsCopied: interop.PointerConvertible): number;

declare function CMTagCollectionGetTagsWithCategory(tagCollection: interop.PointerConvertible, category: interop.Enum<typeof CMTagCategory>, tagBuffer: interop.PointerConvertible, tagBufferCount: number, numberOfTagsCopied: interop.PointerConvertible): number;

declare function CMTagCollectionCountTagsWithFilterFunction(tagCollection: interop.PointerConvertible, filterApplier: (p1: CMTag, p2: interop.PointerConvertible) => number, context: interop.PointerConvertible): number;

declare function CMTagCollectionGetTagsWithFilterFunction(tagCollection: interop.PointerConvertible, tagBuffer: interop.PointerConvertible, tagBufferCount: number, numberOfTagsCopied: interop.PointerConvertible, filter: (p1: CMTag, p2: interop.PointerConvertible) => number, context: interop.PointerConvertible): number;

declare function CMTagCollectionCopyTagsOfCategories(allocator: interop.Object, tagCollection: interop.PointerConvertible, categories: interop.PointerConvertible, categoriesCount: number, collectionWithTagsOfCategories: interop.PointerConvertible): number;

declare function CMTagCollectionApply(tagCollection: interop.PointerConvertible, applier: (p1: CMTag, p2: interop.PointerConvertible) => void, context: interop.PointerConvertible): void;

declare function CMTagCollectionApplyUntil(tagCollection: interop.PointerConvertible, applier: (p1: CMTag, p2: interop.PointerConvertible) => number, context: interop.PointerConvertible): CMTag;

declare function CMTagCollectionIsEmpty(tagCollection: interop.PointerConvertible): number;

declare function CMTagCollectionCreateIntersection(tagCollection1: interop.PointerConvertible, tagCollection2: interop.PointerConvertible, tagCollectionOut: interop.PointerConvertible): number;

declare function CMTagCollectionCreateUnion(tagCollection1: interop.PointerConvertible, tagCollection2: interop.PointerConvertible, tagCollectionOut: interop.PointerConvertible): number;

declare function CMTagCollectionCreateDifference(tagCollectionMinuend: interop.PointerConvertible, tagCollectionSubtrahend: interop.PointerConvertible, tagCollectionOut: interop.PointerConvertible): number;

declare function CMTagCollectionCreateExclusiveOr(tagCollection1: interop.PointerConvertible, tagCollection2: interop.PointerConvertible, tagCollectionOut: interop.PointerConvertible): number;

declare function CMTagCollectionAddTag(tagCollection: interop.PointerConvertible, tagToAdd: CMTag): number;

declare function CMTagCollectionRemoveTag(tagCollection: interop.PointerConvertible, tagToRemove: CMTag): number;

declare function CMTagCollectionRemoveAllTags(tagCollection: interop.PointerConvertible): number;

declare function CMTagCollectionRemoveAllTagsOfCategory(tagCollection: interop.PointerConvertible, category: interop.Enum<typeof CMTagCategory>): number;

declare function CMTagCollectionAddTagsFromCollection(tagCollection: interop.PointerConvertible, collectionWithTagsToAdd: interop.PointerConvertible): number;

declare function CMTagCollectionAddTagsFromArray(tagCollection: interop.PointerConvertible, tags: interop.PointerConvertible, tagCount: number): number;

declare function CMTagCollectionCopyAsDictionary(tagCollection: interop.PointerConvertible, allocator: interop.Object): interop.Object;

declare function CMTagCollectionCreateFromDictionary(dict: interop.Object, allocator: interop.Object, newCollectionOut: interop.PointerConvertible): number;

declare function CMTagCollectionCopyAsData(tagCollection: interop.PointerConvertible, allocator: interop.Object): interop.Object;

declare function CMTagCollectionCreateFromData(data: interop.Object, allocator: interop.Object, newCollectionOut: interop.PointerConvertible): number;

declare function CMTaggedBufferGroupGetTypeID(): number;

declare function CMTaggedBufferGroupCreate(allocator: interop.Object, tagCollections: interop.Object, buffers: interop.Object, groupOut: interop.PointerConvertible): number;

declare function CMTaggedBufferGroupCreateCombined(allocator: interop.Object, taggedBufferGroups: interop.Object, groupOut: interop.PointerConvertible): number;

declare function CMTaggedBufferGroupGetCount(group: interop.PointerConvertible): number;

declare function CMTaggedBufferGroupGetTagCollectionAtIndex(group: interop.PointerConvertible, index: number): interop.Pointer;

declare function CMTaggedBufferGroupGetCVPixelBufferAtIndex(group: interop.PointerConvertible, index: number): interop.Object;

declare function CMTaggedBufferGroupGetCVPixelBufferForTag(group: interop.PointerConvertible, tag: CMTag, indexOut: interop.PointerConvertible): interop.Object;

declare function CMTaggedBufferGroupGetCVPixelBufferForTagCollection(group: interop.PointerConvertible, tagCollection: interop.PointerConvertible, indexOut: interop.PointerConvertible): interop.Object;

declare function CMTaggedBufferGroupGetCMSampleBufferAtIndex(group: interop.PointerConvertible, index: number): interop.Object;

declare function CMTaggedBufferGroupGetCMSampleBufferForTag(group: interop.PointerConvertible, tag: CMTag, indexOut: interop.PointerConvertible): interop.Object;

declare function CMTaggedBufferGroupGetCMSampleBufferForTagCollection(group: interop.PointerConvertible, tagCollection: interop.PointerConvertible, indexOut: interop.PointerConvertible): interop.Object;

declare function CMTaggedBufferGroupGetNumberOfMatchesForTagCollection(group: interop.PointerConvertible, tagCollection: interop.PointerConvertible): number;

declare function CMTaggedBufferGroupFormatDescriptionCreateForTaggedBufferGroup(allocator: interop.Object, taggedBufferGroup: interop.PointerConvertible, formatDescriptionOut: interop.PointerConvertible): number;

declare function CMTaggedBufferGroupFormatDescriptionMatchesTaggedBufferGroup(desc: interop.PointerConvertible, taggedBufferGroup: interop.PointerConvertible): number;

declare function CMSampleBufferCreateForTaggedBufferGroup(allocator: interop.Object, taggedBufferGroup: interop.PointerConvertible, sbufPTS: CMTime, sbufDuration: CMTime, formatDescription: interop.PointerConvertible, sBufOut: interop.PointerConvertible): number;

declare function CMSampleBufferGetTaggedBufferGroup(sbuf: interop.Object): interop.Pointer;

declare function CMClockGetTypeID(): number;

declare function CMClockGetHostTimeClock(): interop.Object;

declare function CMClockConvertHostTimeToSystemUnits(hostTime: CMTime): number;

declare function CMClockMakeHostTimeFromSystemUnits(hostTime: number): CMTime;

declare function CMClockGetTime(clock: interop.Object): CMTime;

declare function CMClockGetAnchorTime(clock: interop.Object, clockTimeOut: interop.PointerConvertible, referenceClockTimeOut: interop.PointerConvertible): number;

declare function CMClockMightDrift(clock: interop.Object, otherClock: interop.Object): number;

declare function CMClockInvalidate(clock: interop.Object): void;

declare function CMTimebaseGetTypeID(): number;

declare function CMTimebaseCreateWithMasterClock(allocator: interop.Object, masterClock: interop.Object, timebaseOut: interop.PointerConvertible): number;

declare function CMTimebaseCreateWithMasterTimebase(allocator: interop.Object, masterTimebase: interop.Object, timebaseOut: interop.PointerConvertible): number;

declare function CMTimebaseCopyMasterTimebase(timebase: interop.Object): interop.Object;

declare function CMTimebaseCopyMasterClock(timebase: interop.Object): interop.Object;

declare function CMTimebaseCopyMaster(timebase: interop.Object): interop.Object;

declare function CMTimebaseCopyUltimateMasterClock(timebase: interop.Object): interop.Object;

declare function CMTimebaseGetMasterTimebase(timebase: interop.Object): interop.Object;

declare function CMTimebaseGetMasterClock(timebase: interop.Object): interop.Object;

declare function CMTimebaseGetMaster(timebase: interop.Object): interop.Object;

declare function CMTimebaseGetUltimateMasterClock(timebase: interop.Object): interop.Object;

declare function CMTimebaseSetMasterClock(timebase: interop.Object, newMasterClock: interop.Object): number;

declare function CMTimebaseSetMasterTimebase(timebase: interop.Object, newMasterTimebase: interop.Object): number;

declare function CMTimebaseGetTime(timebase: interop.Object): CMTime;

declare function CMTimebaseGetTimeWithTimeScale(timebase: interop.Object, timescale: number, method: interop.Enum<typeof CMTimeRoundingMethod>): CMTime;

declare function CMTimebaseSetTime(timebase: interop.Object, time: CMTime): number;

declare function CMTimebaseSetAnchorTime(timebase: interop.Object, timebaseTime: CMTime, immediateSourceTime: CMTime): number;

declare function CMTimebaseGetRate(timebase: interop.Object): number;

declare function CMTimebaseGetTimeAndRate(timebase: interop.Object, timeOut: interop.PointerConvertible, rateOut: interop.PointerConvertible): number;

declare function CMTimebaseSetRate(timebase: interop.Object, rate: number): number;

declare function CMTimebaseSetRateAndAnchorTime(timebase: interop.Object, rate: number, timebaseTime: CMTime, immediateSourceTime: CMTime): number;

declare function CMTimebaseGetEffectiveRate(timebase: interop.Object): number;

declare function CMTimebaseAddTimer(timebase: interop.Object, timer: interop.Object, runloop: interop.Object): number;

declare function CMTimebaseRemoveTimer(timebase: interop.Object, timer: interop.Object): number;

declare function CMTimebaseSetTimerNextFireTime(timebase: interop.Object, timer: interop.Object, fireTime: CMTime, flags: number): number;

declare function CMTimebaseSetTimerToFireImmediately(timebase: interop.Object, timer: interop.Object): number;

declare function CMTimebaseAddTimerDispatchSource(timebase: interop.Object, timerSource: NSObject): number;

declare function CMTimebaseRemoveTimerDispatchSource(timebase: interop.Object, timerSource: NSObject): number;

declare function CMTimebaseSetTimerDispatchSourceNextFireTime(timebase: interop.Object, timerSource: NSObject, fireTime: CMTime, flags: number): number;

declare function CMTimebaseSetTimerDispatchSourceToFireImmediately(timebase: interop.Object, timerSource: NSObject): number;

declare function CMSyncGetRelativeRate(ofClockOrTimebase: interop.Object, relativeToClockOrTimebase: interop.Object): number;

declare function CMSyncGetRelativeRateAndAnchorTime(ofClockOrTimebase: interop.Object, relativeToClockOrTimebase: interop.Object, outRelativeRate: interop.PointerConvertible, outOfClockOrTimebaseAnchorTime: interop.PointerConvertible, outRelativeToClockOrTimebaseAnchorTime: interop.PointerConvertible): number;

declare function CMSyncConvertTime(time: CMTime, fromClockOrTimebase: interop.Object, toClockOrTimebase: interop.Object): CMTime;

declare function CMSyncMightDrift(clockOrTimebase1: interop.Object, clockOrTimebase2: interop.Object): number;

declare function CMSyncGetTime(clockOrTimebase: interop.Object): CMTime;

declare function CMTimebaseNotificationBarrier(timebase: interop.Object): number;

declare function CMVideoFormatDescriptionCreateFromBigEndianImageDescriptionData(allocator: interop.Object, imageDescriptionData: interop.PointerConvertible, size: number, stringEncoding: number, flavor: interop.PointerConvertible, formatDescriptionOut: interop.PointerConvertible): number;

declare function CMVideoFormatDescriptionCreateFromBigEndianImageDescriptionBlockBuffer(allocator: interop.Object, imageDescriptionBlockBuffer: interop.Object, stringEncoding: number, flavor: interop.PointerConvertible, formatDescriptionOut: interop.PointerConvertible): number;

declare function CMVideoFormatDescriptionCopyAsBigEndianImageDescriptionBlockBuffer(allocator: interop.Object, videoFormatDescription: interop.Object, stringEncoding: number, flavor: interop.PointerConvertible, blockBufferOut: interop.PointerConvertible): number;

declare function CMSwapBigEndianImageDescriptionToHost(imageDescriptionData: interop.PointerConvertible, imageDescriptionSize: number): number;

declare function CMSwapHostEndianImageDescriptionToBig(imageDescriptionData: interop.PointerConvertible, imageDescriptionSize: number): number;

declare function CMAudioFormatDescriptionCreateFromBigEndianSoundDescriptionData(allocator: interop.Object, soundDescriptionData: interop.PointerConvertible, size: number, flavor: interop.PointerConvertible, formatDescriptionOut: interop.PointerConvertible): number;

declare function CMAudioFormatDescriptionCreateFromBigEndianSoundDescriptionBlockBuffer(allocator: interop.Object, soundDescriptionBlockBuffer: interop.Object, flavor: interop.PointerConvertible, formatDescriptionOut: interop.PointerConvertible): number;

declare function CMAudioFormatDescriptionCopyAsBigEndianSoundDescriptionBlockBuffer(allocator: interop.Object, audioFormatDescription: interop.Object, flavor: interop.PointerConvertible, blockBufferOut: interop.PointerConvertible): number;

declare function CMDoesBigEndianSoundDescriptionRequireLegacyCBRSampleTableLayout(soundDescriptionBlockBuffer: interop.Object, flavor: interop.PointerConvertible): number;

declare function CMSwapBigEndianSoundDescriptionToHost(soundDescriptionData: interop.PointerConvertible, soundDescriptionSize: number): number;

declare function CMSwapHostEndianSoundDescriptionToBig(soundDescriptionData: interop.PointerConvertible, soundDescriptionSize: number): number;

declare function CMTextFormatDescriptionCreateFromBigEndianTextDescriptionData(allocator: interop.Object, textDescriptionData: interop.PointerConvertible, size: number, flavor: interop.PointerConvertible, mediaType: number, formatDescriptionOut: interop.PointerConvertible): number;

declare function CMTextFormatDescriptionCreateFromBigEndianTextDescriptionBlockBuffer(allocator: interop.Object, textDescriptionBlockBuffer: interop.Object, flavor: interop.PointerConvertible, mediaType: number, formatDescriptionOut: interop.PointerConvertible): number;

declare function CMTextFormatDescriptionCopyAsBigEndianTextDescriptionBlockBuffer(allocator: interop.Object, textFormatDescription: interop.Object, flavor: interop.PointerConvertible, blockBufferOut: interop.PointerConvertible): number;

declare function CMSwapBigEndianTextDescriptionToHost(textDescriptionData: interop.PointerConvertible, textDescriptionSize: number): number;

declare function CMSwapHostEndianTextDescriptionToBig(textDescriptionData: interop.PointerConvertible, textDescriptionSize: number): number;

declare function CMClosedCaptionFormatDescriptionCreateFromBigEndianClosedCaptionDescriptionData(allocator: interop.Object, closedCaptionDescriptionData: interop.PointerConvertible, size: number, flavor: interop.PointerConvertible, formatDescriptionOut: interop.PointerConvertible): number;

declare function CMClosedCaptionFormatDescriptionCreateFromBigEndianClosedCaptionDescriptionBlockBuffer(allocator: interop.Object, closedCaptionDescriptionBlockBuffer: interop.Object, flavor: interop.PointerConvertible, formatDescriptionOut: interop.PointerConvertible): number;

declare function CMClosedCaptionFormatDescriptionCopyAsBigEndianClosedCaptionDescriptionBlockBuffer(allocator: interop.Object, closedCaptionFormatDescription: interop.Object, flavor: interop.PointerConvertible, blockBufferOut: interop.PointerConvertible): number;

declare function CMSwapBigEndianClosedCaptionDescriptionToHost(closedCaptionDescriptionData: interop.PointerConvertible, closedCaptionDescriptionSize: number): number;

declare function CMSwapHostEndianClosedCaptionDescriptionToBig(closedCaptionDescriptionData: interop.PointerConvertible, closedCaptionDescriptionSize: number): number;

declare function CMTimeCodeFormatDescriptionCreateFromBigEndianTimeCodeDescriptionData(allocator: interop.Object, timeCodeDescriptionData: interop.PointerConvertible, size: number, flavor: interop.PointerConvertible, formatDescriptionOut: interop.PointerConvertible): number;

declare function CMTimeCodeFormatDescriptionCreateFromBigEndianTimeCodeDescriptionBlockBuffer(allocator: interop.Object, timeCodeDescriptionBlockBuffer: interop.Object, flavor: interop.PointerConvertible, formatDescriptionOut: interop.PointerConvertible): number;

declare function CMTimeCodeFormatDescriptionCopyAsBigEndianTimeCodeDescriptionBlockBuffer(allocator: interop.Object, timeCodeFormatDescription: interop.Object, flavor: interop.PointerConvertible, blockBufferOut: interop.PointerConvertible): number;

declare function CMSwapBigEndianTimeCodeDescriptionToHost(timeCodeDescriptionData: interop.PointerConvertible, timeCodeDescriptionSize: number): number;

declare function CMSwapHostEndianTimeCodeDescriptionToBig(timeCodeDescriptionData: interop.PointerConvertible, timeCodeDescriptionSize: number): number;

declare function CMMetadataFormatDescriptionCreateFromBigEndianMetadataDescriptionData(allocator: interop.Object, metadataDescriptionData: interop.PointerConvertible, size: number, flavor: interop.PointerConvertible, formatDescriptionOut: interop.PointerConvertible): number;

declare function CMMetadataFormatDescriptionCreateFromBigEndianMetadataDescriptionBlockBuffer(allocator: interop.Object, metadataDescriptionBlockBuffer: interop.Object, flavor: interop.PointerConvertible, formatDescriptionOut: interop.PointerConvertible): number;

declare function CMMetadataFormatDescriptionCopyAsBigEndianMetadataDescriptionBlockBuffer(allocator: interop.Object, metadataFormatDescription: interop.Object, flavor: interop.PointerConvertible, blockBufferOut: interop.PointerConvertible): number;

declare function CMSwapBigEndianMetadataDescriptionToHost(metadataDescriptionData: interop.PointerConvertible, metadataDescriptionSize: number): number;

declare function CMSwapHostEndianMetadataDescriptionToBig(metadataDescriptionData: interop.PointerConvertible, metadataDescriptionSize: number): number;

declare function CMBufferQueueGetCallbacksForUnsortedSampleBuffers(): interop.Pointer;

declare function CMBufferQueueGetCallbacksForSampleBuffersSortedByOutputPTS(): interop.Pointer;

declare function CMBufferQueueCreate(allocator: interop.Object, capacity: number, callbacks: interop.PointerConvertible, queueOut: interop.PointerConvertible): number;

declare function CMBufferQueueCreateWithHandlers(allocator: interop.Object, capacity: number, handlers: interop.PointerConvertible, queueOut: interop.PointerConvertible): number;

declare function CMBufferQueueGetTypeID(): number;

declare function CMBufferQueueEnqueue(queue: interop.Object, buf: interop.Object): number;

declare function CMBufferQueueDequeueAndRetain(queue: interop.Object): interop.Object;

declare function CMBufferQueueDequeueIfDataReadyAndRetain(queue: interop.Object): interop.Object;

declare function CMBufferQueueGetHead(queue: interop.Object): interop.Object;

declare function CMBufferQueueCopyHead(queue: interop.Object): interop.Object;

declare function CMBufferQueueIsEmpty(queue: interop.Object): number;

declare function CMBufferQueueMarkEndOfData(queue: interop.Object): number;

declare function CMBufferQueueContainsEndOfData(queue: interop.Object): number;

declare function CMBufferQueueIsAtEndOfData(queue: interop.Object): number;

declare function CMBufferQueueReset(queue: interop.Object): number;

declare function CMBufferQueueResetWithCallback(queue: interop.Object, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, refcon: interop.PointerConvertible): number;

declare function CMBufferQueueGetBufferCount(queue: interop.Object): number;

declare function CMBufferQueueGetDuration(queue: interop.Object): CMTime;

declare function CMBufferQueueGetMinDecodeTimeStamp(queue: interop.Object): CMTime;

declare function CMBufferQueueGetFirstDecodeTimeStamp(queue: interop.Object): CMTime;

declare function CMBufferQueueGetMinPresentationTimeStamp(queue: interop.Object): CMTime;

declare function CMBufferQueueGetFirstPresentationTimeStamp(queue: interop.Object): CMTime;

declare function CMBufferQueueGetMaxPresentationTimeStamp(queue: interop.Object): CMTime;

declare function CMBufferQueueGetEndPresentationTimeStamp(queue: interop.Object): CMTime;

declare function CMBufferQueueGetTotalSize(queue: interop.Object): number;

declare function CMBufferQueueInstallTrigger(queue: interop.Object, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, refcon: interop.PointerConvertible, condition: number, time: CMTime, triggerTokenOut: interop.PointerConvertible): number;

declare function CMBufferQueueInstallTriggerWithIntegerThreshold(queue: interop.Object, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, refcon: interop.PointerConvertible, condition: number, threshold: number, triggerTokenOut: interop.PointerConvertible): number;

declare function CMBufferQueueInstallTriggerHandler(queue: interop.Object, condition: number, time: CMTime, triggerTokenOut: interop.PointerConvertible, handler: (p1: interop.PointerConvertible) => void): number;

declare function CMBufferQueueInstallTriggerHandlerWithIntegerThreshold(queue: interop.Object, condition: number, threshold: number, triggerTokenOut: interop.PointerConvertible, handler: (p1: interop.PointerConvertible) => void): number;

declare function CMBufferQueueRemoveTrigger(queue: interop.Object, triggerToken: interop.PointerConvertible): number;

declare function CMBufferQueueTestTrigger(queue: interop.Object, triggerToken: interop.PointerConvertible): number;

declare function CMBufferQueueCallForEachBuffer(queue: interop.Object, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number, refcon: interop.PointerConvertible): number;

declare function CMBufferQueueSetValidationCallback(queue: interop.Object, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number, refcon: interop.PointerConvertible): number;

declare function CMBufferQueueSetValidationHandler(queue: interop.Object, handler: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number): number;

declare function CMSimpleQueueGetTypeID(): number;

declare function CMSimpleQueueCreate(allocator: interop.Object, capacity: number, queueOut: interop.PointerConvertible): number;

declare function CMSimpleQueueEnqueue(queue: interop.Object, element: interop.PointerConvertible): number;

declare function CMSimpleQueueDequeue(queue: interop.Object): interop.Pointer;

declare function CMSimpleQueueGetHead(queue: interop.Object): interop.Pointer;

declare function CMSimpleQueueReset(queue: interop.Object): number;

declare function CMSimpleQueueGetCapacity(queue: interop.Object): number;

declare function CMSimpleQueueGetCount(queue: interop.Object): number;

declare function CMMemoryPoolGetTypeID(): number;

declare function CMMemoryPoolCreate(options: interop.Object): interop.Object;

declare function CMMemoryPoolGetAllocator(pool: interop.Object): interop.Object;

declare function CMMemoryPoolFlush(pool: interop.Object): void;

declare function CMMemoryPoolInvalidate(pool: interop.Object): void;

declare function CMMetadataCreateIdentifierForKeyAndKeySpace(allocator: interop.Object, key: interop.Object, keySpace: interop.Object, identifierOut: interop.PointerConvertible): number;

declare function CMMetadataCreateKeyFromIdentifier(allocator: interop.Object, identifier: interop.Object, keyOut: interop.PointerConvertible): number;

declare function CMMetadataCreateKeyFromIdentifierAsCFData(allocator: interop.Object, identifier: interop.Object, keyOut: interop.PointerConvertible): number;

declare function CMMetadataCreateKeySpaceFromIdentifier(allocator: interop.Object, identifier: interop.Object, keySpaceOut: interop.PointerConvertible): number;

declare function CMMetadataDataTypeRegistryRegisterDataType(dataType: interop.Object, description: interop.Object, conformingDataTypes: interop.Object): number;

declare function CMMetadataDataTypeRegistryDataTypeIsRegistered(dataType: interop.Object): number;

declare function CMMetadataDataTypeRegistryGetDataTypeDescription(dataType: interop.Object): interop.Object;

declare function CMMetadataDataTypeRegistryGetConformingDataTypes(dataType: interop.Object): interop.Object;

declare function CMMetadataDataTypeRegistryDataTypeConformsToDataType(dataType: interop.Object, conformsToDataType: interop.Object): number;

declare function CMMetadataDataTypeRegistryGetBaseDataTypes(): interop.Object;

declare function CMMetadataDataTypeRegistryDataTypeIsBaseDataType(dataType: interop.Object): number;

declare function CMMetadataDataTypeRegistryGetBaseDataTypeForConformingDataType(dataType: interop.Object): interop.Object;

declare function CMAudioDeviceClockCreate(allocator: interop.Object, deviceUID: interop.Object, clockOut: interop.PointerConvertible): number;

declare function CMAudioDeviceClockCreateFromAudioDeviceID(allocator: interop.Object, deviceID: number, clockOut: interop.PointerConvertible): number;

declare function CMAudioDeviceClockSetAudioDeviceUID(clock: interop.Object, deviceUID: interop.Object): number;

declare function CMAudioDeviceClockSetAudioDeviceID(clock: interop.Object, deviceID: number): number;

declare function CMAudioDeviceClockGetAudioDevice(clock: interop.Object, deviceUIDOut: interop.PointerConvertible, deviceIDOut: interop.PointerConvertible, trackingDefaultDeviceOut: interop.PointerConvertible): number;


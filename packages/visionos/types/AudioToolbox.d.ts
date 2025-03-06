/// <reference types="@nativescript/objc-node-api" />

declare const kSequenceTrackProperty_TimeResolution: number;

declare const kSequenceTrackProperty_TrackLength: number;

declare const kSequenceTrackProperty_AutomatedParameters: number;

declare const kSequenceTrackProperty_SoloStatus: number;

declare const kSequenceTrackProperty_MuteStatus: number;

declare const kSequenceTrackProperty_OffsetTime: number;

declare const kSequenceTrackProperty_LoopInfo: number;

declare const kAudioToolboxErr_CannotDoInCurrentContext: number;

declare const kAudioToolboxErr_InvalidPlayerState: number;

declare const kAudioToolboxErr_InvalidEventType: number;

declare const kAudioToolboxErr_NoSequence: number;

declare const kAudioToolboxErr_IllegalTrackDestination: number;

declare const kAudioToolboxErr_StartOfTrack: number;

declare const kAudioToolboxErr_TrackNotFound: number;

declare const kAudioToolboxErr_InvalidSequenceType: number;

declare const kMusicEventType_AUPreset: number;

declare const kMusicEventType_Parameter: number;

declare const kMusicEventType_MIDIRawData: number;

declare const kMusicEventType_MIDIChannelMessage: number;

declare const kMusicEventType_User: number;

declare const kMusicEventType_NULL: number;

declare const kExtAudioFileError_CodecUnavailableInputNotConsumed: number;

declare const kExtAudioFileError_AsyncWriteBufferOverflow: number;

declare const kExtAudioFileError_InvalidSeek: number;

declare const kExtAudioFileError_MaxPacketSizeUnknown: number;

declare const kExtAudioFileError_InvalidOperationOrder: number;

declare const kExtAudioFileError_NonPCMClientFormat: number;

declare const kExtAudioFileError_InvalidPropertySize: number;

declare const kExtAudioFileError_InvalidProperty: number;

declare const kExtAudioFileProperty_ConverterConfig: number;

declare const kExtAudioFileProperty_FileLengthFrames: number;

declare const kExtAudioFileProperty_ClientMaxPacketSize: number;

declare const kExtAudioFileProperty_FileMaxPacketSize: number;

declare const kExtAudioFileProperty_AudioFile: number;

declare const kExtAudioFileProperty_CodecManufacturer: number;

declare const kExtAudioFileProperty_FileChannelLayout: number;

declare const kExtAudioFileProperty_FileDataFormat: number;

declare const kExtAudioFilePacketTableInfoOverride_UseFileValueIfValid: number;

declare const kCAF_SMPTE_TimeType2398: number;

declare const kCAF_SMPTE_TimeType5994: number;

declare const kExtAudioFileError_InvalidDataFormat: number;

declare const kCAF_SMPTE_TimeType2997: number;

declare const kCAF_SMPTE_TimeType30: number;

declare const kCAF_SMPTE_TimeType30Drop: number;

declare const kCAF_SMPTE_TimeTypeNone: number;

declare const kCAFMarkerType_KeySignature: number;

declare const kCAFMarkerType_TimeSignature: number;

declare const kCAFMarkerType_Tempo: number;

declare const kCAFMarkerType_SavedPlayPosition: number;

declare const kCAFMarkerType_ReleaseLoopEnd: number;

declare const kCAFMarkerType_ReleaseLoopStart: number;

declare const kCAFMarkerType_SustainLoopEnd: number;

declare const kCAFMarkerType_SustainLoopStart: number;

declare const kCAFMarkerType_EditDestinationEnd: number;

declare const kCAFMarkerType_EditSourceEnd: number;

declare const kCAFMarkerType_SelectionEnd: number;

declare const kCAFMarkerType_RegionEnd: number;

declare const kCAFMarkerType_Index: number;

declare const kCAFMarkerType_TrackEnd: number;

declare const kCAFMarkerType_ProgramEnd: number;

declare const kCAF_UMIDChunkID: number;

declare const kCAF_OverviewChunkID: number;

declare const kCAF_StringsChunkID: number;

declare const kCAF_EditCommentsChunkID: number;

declare const kCAF_InfoStringsChunkID: number;

declare const kCAF_MagicCookieID: number;

declare const kCAF_InstrumentChunkID: number;

declare const kCAF_RegionChunkID: number;

declare const kCAF_FillerChunkID: number;

declare const kCAF_ChannelLayoutChunkID: number;

declare const kCAF_FileVersion_Initial: number;

declare const kCAF_FileType: number;

declare const kSystemSoundID_Vibrate: number;

declare const kAudioServicesSystemSoundExceededMaximumDurationError: number;

declare const kAudioServicesSystemSoundClientTimedOutError: number;

declare const kAudioServicesSystemSoundUnspecifiedError: number;

declare const kAudioServicesBadPropertySizeError: number;

declare const kAudioSessionProperty_AudioRoute: number;

declare const kAudioSessionCategory_UserInterfaceSoundEffects: number;

declare const kAudioSessionProperty_AudioRouteDescription: number;

declare const kAudioSessionProperty_InputGainAvailable: number;

declare const kAudioSessionProperty_OutputDestination: number;

declare const kAudioSessionProperty_InputSource: number;

declare const kAudioSessionProperty_OutputDestinations: number;

declare const kAudioSessionProperty_InputSources: number;

declare const kAudioSessionProperty_Mode: number;

declare const kAudioSessionProperty_OverrideCategoryEnableBluetoothInput: number;

declare const kAudioSessionProperty_OverrideCategoryDefaultToSpeaker: number;

declare const kAudioSessionProperty_OtherMixableAudioShouldDuck: number;

declare const kAudioSessionProperty_ServerDied: number;

declare const kAudioSessionProperty_AudioInputAvailable: number;

declare const kAudioSessionProperty_OtherAudioIsPlaying: number;

declare const kAudioSessionProperty_CurrentHardwareIOBufferDuration: number;

declare const kAudioSessionProperty_CurrentHardwareOutputLatency: number;

declare const kAudioSessionProperty_CurrentHardwareOutputVolume: number;

declare const kAudioSessionProperty_CurrentHardwareOutputNumberChannels: number;

declare const kAudioSessionProperty_CurrentHardwareSampleRate: number;

declare const kAudioSessionProperty_AudioRouteChange: number;

declare const kAudioSessionProperty_PreferredHardwareIOBufferDuration: number;

declare const kAudioSessionProperty_PreferredHardwareSampleRate: number;

declare const kAudioSessionMode_VoiceChat: number;

declare const kExtAudioFileProperty_AudioConverter: number;

declare const kAudioSessionMode_Default: number;

declare const kAudioSessionInterruptionType_ShouldNotResume: number;

declare const kAudioSessionInterruptionType_ShouldResume: number;

declare const kAudioSessionRouteChangeReason_RouteConfigurationChange: number;

declare const kAudioSessionRouteChangeReason_NoSuitableRouteForCategory: number;

declare const kAudioSessionRouteChangeReason_WakeFromSleep: number;

declare const kAudioSessionRouteChangeReason_CategoryChange: number;

declare const kAudioSessionRouteChangeReason_OldDeviceUnavailable: number;

declare const kAudioSessionRouteChangeReason_NewDeviceAvailable: number;

declare const kAudioSessionOverrideAudioRoute_Speaker: number;

declare const kAudioSessionCategory_RecordAudio: number;

declare const kAudioSessionCategory_MediaPlayback: number;

declare const kAudioSessionCategory_AmbientSound: number;

declare const kAudioSessionEndInterruption: number;

declare const kAudioSessionBeginInterruption: number;

declare const kAudioSessionUnspecifiedError: number;

declare const kAudioServicesNoHardwareError: number;

declare const kAudioSessionNotActiveError: number;

declare const kAudioSessionBadPropertySizeError: number;

declare const kCAF_MarkerChunkID: number;

declare const kAudioSessionUnsupportedPropertyError: number;

declare const kAudioSessionAlreadyInitialized: number;

declare const kAudioSessionNoError: number;

declare const kAudioQueueParam_Pan: number;

declare const kAudioQueueParam_VolumeRampTime: number;

declare const kAudioQueueParam_Volume: number;

declare const kAudioQueueHardwareCodecPolicy_PreferHardware: number;

declare const kAudioQueueHardwareCodecPolicy_UseSoftwareOnly: number;

declare const kAudioQueueHardwareCodecPolicy_Default: number;

declare const kAudioQueueProperty_HardwareCodecPolicy: number;

declare const kAudioQueueTimePitchAlgorithm_TimeDomain: number;

declare const kAudioQueueProperty_TimePitchBypass: number;

declare const kAudioQueueProperty_ConverterError: number;

declare const kAudioQueueProperty_DecodeBufferSizeFrames: number;

declare const kAudioQueueProperty_CurrentLevelMeterDB: number;

declare const kAudioQueueProperty_CurrentLevelMeter: number;

declare const kAudioQueueHardwareCodecPolicy_UseHardwareOnly: number;

declare const kAudioQueueProperty_EnableLevelMetering: number;

declare const kAudioQueueProperty_ChannelLayout: number;

declare const kAudioQueueProperty_StreamDescription: number;

declare const kAudioQueueProperty_MaximumOutputPacketSize: number;

declare const kAudioQueueProperty_MagicCookie: number;

declare const kAudioQueueDeviceProperty_NumberChannels: number;

declare const kAudioQueueDeviceProperty_SampleRate: number;

declare const kAudioQueueProperty_IsRunning: number;

declare const kAudioQueueErr_InvalidOfflineMode: number;

declare const kAudioQueueErr_EnqueueDuringReset: number;

declare const kAudioQueueErr_CannotStartYet: number;

declare const kAudioQueueErr_InvalidTapContext: number;

declare const kAudioQueueErr_TooManyTaps: number;

declare const kAudioQueueErr_QueueInvalidated: number;

declare const kAudioQueueErr_CodecNotFound: number;

declare const kAudioQueueErr_InvalidPropertyValue: number;

declare const kAudioQueueErr_Permissions: number;

declare const kAudioQueueErr_InvalidRunState: number;

declare const kAudioQueueErr_BufferInQueue: number;

declare const kAudioQueueErr_InvalidDevice: number;

declare const kAudioQueueErr_InvalidPropertySize: number;

declare const kAudioQueueErr_DisposalPending: number;

declare const kAudioFormatUnknownFormatError: number;

declare const kAudioFormatUnsupportedDataFormatError: number;

declare const kAudioFormatBadSpecifierSizeError: number;

declare const kAudioFormatBadPropertySizeError: number;

declare const kAudioFormatUnsupportedPropertyError: number;

declare const kAudioFormatUnspecifiedError: number;

declare const kAppleHardwareAudioCodecManufacturer: number;

declare const kAudioEncoderComponentType: number;

declare const kAudioDecoderComponentType: number;

declare const kAudioFormatProperty_HardwareCodecCapabilities: number;

declare const kAudioFormatProperty_ID3TagToDictionary: number;

declare const kAudioFormatProperty_ID3TagSize: number;

declare const kAudioFormatProperty_PanningMatrix: number;

declare const kAudioFormatProperty_ChannelShortName: number;

declare const kAudioFormatProperty_ChannelName: number;

declare const kAudioFormatProperty_ChannelLayoutSimpleName: number;

declare const kAudioFormatProperty_ChannelLayoutName: number;

declare const kAudioFormatProperty_ChannelLayoutForTag: number;

declare const kAudioFormatProperty_ValidateChannelLayout: number;

declare const kAudioFormatProperty_AreChannelLayoutsEquivalent: number;

declare const kAudioFormatProperty_NumberOfChannelsForLayout: number;

declare const kAudioFormatProperty_ChannelMap: number;

declare const kAudioFormatProperty_MatrixMixMap: number;

declare const kAudioFormatProperty_BitmapForLayoutTag: number;

declare const kAudioFormatProperty_AvailableDecodeNumberChannels: number;

declare const kAudioFormatProperty_AvailableEncodeNumberChannels: number;

declare const kAudioFormatProperty_AvailableEncodeBitRates: number;

declare const kAudioFormatProperty_Decoders: number;

declare const kAudioFormatProperty_FormatEmploysDependentPackets: number;

declare const kAudioFormatProperty_FormatIsVBR: number;

declare const kAudioFormatProperty_OutputFormatList: number;

declare const kAudioFormatProperty_EncodeFormatIDs: number;

declare const kAudioFileStreamProperty_InfoDictionary: number;

declare const kAudioFileStreamProperty_PreviousIndependentPacket: number;

declare const kAudioFileStreamProperty_PacketToRollDistance: number;

declare const kAudioFileStreamProperty_FrameToPacket: number;

declare const kAudioFileStreamProperty_ChannelLayout: number;

declare const kAudioFileStreamProperty_DataOffset: number;

declare const kAudioFileStreamProperty_ReadyToProducePackets: number;

declare const kAudioFileStreamError_UnspecifiedError: number;

declare const kAudioFileStreamError_IllegalOperation: number;

declare const kAudioFileStreamError_InvalidFile: number;

declare const kAudioFileStreamError_UnsupportedProperty: number;

declare const kAudioFileGlobalInfo_TypesForHFSTypeCode: number;

declare const kAudioCodecProduceOutputPacketSuccess: number;

declare const kAudioFileGlobalInfo_ExtensionsForType: number;

declare const kAudioFileGlobalInfo_AllMIMETypes: number;

declare const kAudioFileGlobalInfo_AllHFSTypeCodes: number;

declare const kAudioFileGlobalInfo_AvailableStreamDescriptionsForFormat: number;

declare const kAudioFileGlobalInfo_FileTypeName: number;

declare const kAudioFilePropertySourceBitDepth: number;

declare const kAudioFilePropertyID3Tag: number;

declare const kAudioFilePropertyBitRate: number;

declare const kAudioFilePropertyPacketRangeByteCountUpperBound: number;

declare const kAudioFilePropertyFormatList: number;

declare const kAudioFilePropertyChunkIDs: number;

declare const kAudioFilePropertyByteToPacket: number;

declare const kCAFMarkerType_TrackStart: number;

declare const kAudioFilePropertyPacketToByte: number;

declare const kAudioUnitSubType_AudioFilePlayer: number;

declare const kAudioFilePropertyPacketToFrame: number;

declare const kAudioUnitAddPropertyListenerSelect: number;

declare const kAudioFilePropertyDataFormatName: number;

declare const kAudioFileStreamProperty_PacketToFrame: number;

declare const kAudioFilePropertyDataOffset: number;

declare const kAudioFileLoopDirection_Backward: number;

declare const kAudioFileLoopDirection_Forward: number;

declare const kAudioFileNotOpenError: number;

declare const kAudioFileOperationNotSupportedError: number;

declare const kAudioFileInvalidFileError: number;

declare const kAudioFileDoesNotAllow64BitDataSizeError: number;

declare const kAudioFileUnsupportedDataFormatError: number;

declare const kAudioFileUnsupportedFileTypeError: number;

declare const kAudioFileLATMInLOASType: number;

declare const kAudioFileFLACType: number;

declare const kAudioFileAMRType: number;

declare const kAudioFile3GP2Type: number;

declare const kAudioFileAC3Type: number;

declare const kAudioSessionProperty_CurrentHardwareInputNumberChannels: number;

declare const kAudioOutputUnitProperty_HostReceivesRemoteControlEvents: number;

declare const kAudioFileRF64Type: number;

declare const kAudioFileMP3Type: number;

declare const kAudioFileNextType: number;

declare const kAudioFileWAVEType: number;

declare const kAudioFileAIFCType: number;

declare const kAudioConverterSampleRateConverterAlgorithm: number;

declare const kAudioConverterPropertyMaximumInputBufferSize: number;

declare const kAudioConverterErr_HardwareInUse: number;

declare const kAudioConverterErr_OutputSampleRateOutOfRange: number;

declare const kAudioFilePropertyIsOptimized: number;

declare const kCAF_SMPTE_TimeType60Drop: number;

declare const kAudioConverterErr_RequiresPacketDescriptionsError: number;

declare const kAudioConverterErr_BadPropertySizeError: number;

declare const kMultiChannelMixerParam_PreAveragePower: number;

declare const kAudioFileGlobalInfo_AllExtensions: number;

declare const kAudioConverterErr_UnspecifiedError: number;

declare const kAudioConverterErr_PropertyNotSupported: number;

declare const kAudioConverterErr_OperationNotSupported: number;

declare const kConverterPrimeMethod_None: number;

declare const kAudioCodecPropertyMaximumPacketByteSize: number;

declare const kConverterPrimeMethod_Pre: number;

declare const kAudioConverterSampleRateConverterComplexity_MinimumPhase: number;

declare const kAudioConverterSampleRateConverterComplexity_Mastering: number;

declare const kCAF_SMPTE_TimeType2997Drop: number;

declare const kAudioConverterQuality_Low: number;

declare const kAudioConverterQuality_Medium: number;

declare const kAudioConverterQuality_High: number;

declare const kReverb2Param_DecayTimeAt0Hz: number;

declare const kAudioConverterQuality_Max: number;

declare const kAudioConverterPropertySettings: number;

declare const kAudioConverterAvailableEncodeChannelLayoutTags: number;

declare const kAudioFormatProperty_TagForChannelLayout: number;

declare const kAudioConverterAvailableEncodeSampleRates: number;

declare const kAudioConverterApplicableEncodeSampleRates: number;

declare const kAudioConverterApplicableEncodeBitRates: number;

declare const kAudioConverterOutputChannelLayout: number;

declare const kAudioConverterChannelMap: number;

declare const kAudioConverterSampleRateConverterQuality: number;

declare const kAudioConverterSampleRateConverterComplexity: number;

declare const kAudioConverterPropertyInputCodecParameters: number;

declare const kAudioConverterPropertyCalculateInputBufferSize: number;

declare const kAudioConverterPropertyMaximumInputPacketSize: number;

declare const kAUNodeInteraction_Connection: number;

declare const kAUGraphErr_InvalidAudioUnit: number;

declare const kReverb2Param_DecayTimeAtNyquist: number;

declare const kAudioConverterPropertyCalculateOutputBufferSize: number;

declare const kAUGraphErr_OutputNodeErr: number;

declare const kAudioQueueErr_BufferEmpty: number;

declare const kAUGraphErr_NodeNotFound: number;

declare const kMusicDeviceReleaseInstrumentSelect: number;

declare const kMusicDeviceSysExSelect: number;

declare const kMusicNoteEvent_Unused: number;

declare const kReverb2Param_MaxDelayTime: number;

declare const kReverb2Param_DryWetMix: number;

declare const kAudioComponentErr_InstanceTimedOut: number;

declare const kRandomParam_Curve: number;

declare const kRoundTripAACParam_RateOrQuality: number;

declare const kRoundTripAACParam_EncodingStrategy: number;

declare const kAudioFormatProperty_TagsForNumberOfChannels: number;

declare const kRoundTripAACParam_Format: number;

declare const kAudioUnitProperty_RemoteControlEventListener: number;

declare const kAUNBandEQFilterType_ResonantLowShelf: number;

declare const kAUNBandEQFilterType_LowShelf: number;

declare const kAUNBandEQFilterType_BandStop: number;

declare const kInstrumentType_EXS24: number;

declare const kAUNBandEQFilterType_BandPass: number;

declare const kAudioServicesPropertyCompletePlaybackIfAppDies: number;

declare const kAUNBandEQFilterType_ResonantHighPass: number;

declare const kAUNBandEQParam_Gain: number;

declare const kAUNBandEQParam_FilterType: number;

declare const kAUNBandEQParam_BypassBand: number;

declare const kDelayParam_LopassCutoff: number;

declare const kCAFMarkerType_EditDestinationBegin: number;

declare const kAudioFilePropertyMarkerList: number;

declare const kDelayParam_Feedback: number;

declare const kDelayParam_DelayTime: number;

declare const kDelayParam_WetDryMix: number;

declare const kDistortionParam_FinalMix: number;

declare const kDistortionParam_RingModBalance: number;

declare const kDistortionParam_RingModFreq2: number;

declare const kDistortionParam_PolynomialMix: number;

declare const kAudioFileInvalidPacketOffsetError: number;

declare const kDistortionParam_SquaredTerm: number;

declare const kDistortionParam_DecimationMix: number;

declare const kDistortionParam_Decimation: number;

declare const kDistortionParam_Delay: number;

declare const kDynamicsProcessorParam_InputAmplitude: number;

declare const kDynamicsProcessorParam_OverallGain: number;

declare const kAudioFileInvalidPacketDependencyError: number;

declare const kDynamicsProcessorParam_AttackTime: number;

declare const kLimiterParam_PreGain: number;

declare const kParametricEQParam_Q: number;

declare const kAULowShelfParam_CutoffFrequency: number;

declare const kLowPassParam_Resonance: number;

declare const kLowPassParam_CutoffFrequency: number;

declare const kNewTimePitchParam_EnableSpectralCoherence: number;

declare const k3DMixerParam_PostAveragePower: number;

declare const kNewTimePitchParam_Smoothness: number;

declare const kAudioFile3GPType: number;

declare const kNewTimePitchParam_Pitch: number;

declare const kTimePitchParam_EffectBlend: number;

declare const kTimePitchParam_Rate: number;

declare const kHALOutputParam_Volume: number;

declare const kMatrixMixerParam_PostAveragePowerLinear: number;

declare const kMatrixMixerParam_PrePeakHoldLevelLinear: number;

declare const kMatrixMixerParam_PreAveragePowerLinear: number;

declare const kMatrixMixerParam_PreAveragePower: number;

declare const kMultiChannelMixerParam_PostAveragePower: number;

declare const kMultiChannelMixerParam_Pan: number;

declare const kMultiChannelMixerParam_Enable: number;

declare const kMultiChannelMixerParam_Volume: number;

declare const k3DMixerParam_PrePeakHoldLevel: number;

declare const k3DMixerParam_Gain: number;

declare const k3DMixerParam_Azimuth: number;

declare const kReverbParam_FilterEnable: number;

declare const kSpatialMixerParam_ReverbBlend: number;

declare const kSpatialMixerParam_Elevation: number;

declare const kSpatialMixerParam_MaxGain: number;

declare const kAudioFileUnsupportedPropertyError: number;

declare const kSpatialMixerParam_Enable: number;

declare const kSpatialMixerParam_Azimuth: number;

declare const kAUGroupParameterID_KeyPressure_LastKey: number;

declare const kAUGroupParameterID_Expression_LSB: number;

declare const kAUGroupParameterID_Expression: number;

declare const kAUGroupParameterID_Pan: number;

declare const kAUGroupParameterID_ModWheel: number;

declare const kAUGroupParameterID_Sustain: number;

declare const kAudioOutputUnitStopSelect: number;

declare const AUEventSampleTimeImmediate: number;

declare const kAudioFormatProperty_AvailableEncodeChannelLayoutTags: number;

declare const kAudioFilePropertyFrameToPacket: number;

declare const kAUSamplerProperty_BankAndPreset: number;

declare const kAudioUnitProperty_DeferredRendererWaitFrames: number;

declare const kAudioUnitProperty_DeferredRendererExtraLatency: number;

declare const kAUSampler_DefaultPercussionBankMSB: number;

declare const kInstrumentType_AUPreset: number;

declare const kInstrumentType_DLSPreset: number;

declare const kMusicDeviceProperty_BankName: number;

declare const kMusicDeviceProperty_InstrumentCount: number;

declare const kMusicDeviceProperty_InstrumentName: number;

declare const kAudioUnitProperty_ScheduledFileNumberBuffers: number;

declare const kAudioUnitProperty_ScheduledFileBufferSizeFrames: number;

declare const kAudioUnitProperty_ScheduleStartTimeStamp: number;

declare const kAudioUnitProperty_SpatialMixerOutputType: number;

declare const kAudioUnitProperty_SpatialMixerDistanceParams: number;

declare const kAudioUnitProperty_SpatialMixerSourceMode: number;

declare const kAudioUnitProperty_SpatializationAlgorithm: number;

declare const kAudioUnitProperty_ReverbRoomType: number;

declare const kMatrixMixerParam_PostAveragePower: number;

declare const kAUSamplerProperty_LoadPresetFromBank: number;

declare const kAudioUnitSubType_MIDISynth: number;

declare const kAudioUnitProperty_MeterClipping: number;

declare const kAUNBandEQProperty_BiquadCoefficients: number;

declare const kAUNBandEQProperty_MaxNumberOfBands: number;

declare const kAUVoiceIOProperty_BypassVoiceProcessing: number;

declare const kAudioFilePropertyPreviousIndependentPacket: number;

declare const kAudioOutputUnitProperty_HostTransportState: number;

declare const kAudioOutputUnitProperty_RemoteControlToHost: number;

declare const kAudioOutputUnitProperty_OSWorkgroup: number;

declare const kAudioOutputUnitProperty_SetInputCallback: number;

declare const kAudioOutputUnitProperty_EnableIO: number;

declare const kAUNBandEQFilterType_ResonantHighShelf: number;

declare const kMusicDeviceStartNoteSelect: number;

declare const kAudioOutputUnitProperty_ChannelMap: number;

declare const kAudioOutputUnitProperty_CurrentDevice: number;

declare const kAudioUnitSampleRateConverterComplexity_Mastering: number;

declare const kAudioUnitSampleRateConverterComplexity_Normal: number;

declare const kAudioUnitSampleRateConverterComplexity_Linear: number;

declare const kRandomParam_BoundB: number;

declare const kAudioUnitProperty_SampleRateConverterComplexity: number;

declare const kAudioFilePropertyMaximumPacketSize: number;

declare const kAudioUnitSubType_DynamicsProcessor: number;

declare const kAudioUnitParameterName_Full: number;

declare const kRenderQuality_Low: number;

declare const kAUGraphErr_InvalidConnection: number;

declare const kRenderQuality_Medium: number;

declare const kAudioUnitProperty_AudioUnitMIDIProtocol: number;

declare const kAudioUnitProperty_MIDIOutputEventListCallback: number;

declare const kAudioUnitProperty_MIDIOutputCallback: number;

declare const kAudioUnitProperty_LoadedOutOfProcess: number;

declare const kAudioUnitProperty_ParametersForOverview: number;

declare const kAudioUnitProperty_RequestViewController: number;

declare const kAUNBandEQParam_GlobalGain: number;

declare const kAudioUnitProperty_PresentationLatency: number;

declare const kAudioUnitProperty_ContextName: number;

declare const kRandomParam_BoundA: number;

declare const kAudioUnitProperty_ParameterValueFromString: number;

declare const kAudioUnitProperty_ParameterIDName: number;

declare const kAudioUnitProperty_OfflineRender: number;

declare const kAudioUnitProperty_ParameterHistoryInfo: number;

declare const kAudioUnitProperty_InPlaceProcessing: number;

declare const kAudioUnitProperty_RenderQuality: number;

declare const kAudioUnitProperty_FactoryPresets: number;

declare const kAudioUnitProperty_SetRenderCallback: number;

declare const kAudioUnitProperty_LastRenderError: number;

declare const kNumAUNBandEQFilterTypes: number;

declare const kAudioUnitProperty_BypassEffect: number;

declare const kAudioUnitProperty_AudioChannelLayout: number;

declare const kAudioUnitProperty_MaximumFramesPerSlice: number;

declare const kAudioUnitProperty_Latency: number;

declare const kAudioFileStreamError_BadPropertySize: number;

declare const kAudioUnitProperty_ElementCount: number;

declare const kAudioFilePropertyRegionList: number;

declare const kAudioUnitProperty_CPULoad: number;

declare const kAudioFilePropertyRestrictsRandomAccess: number;

declare const kAudioUnitProperty_ParameterInfo: number;

declare const kAudioUnitProperty_SampleRate: number;

declare const kAudioUnitProperty_MakeConnection: number;

declare const kAudioUnitProperty_ClassInfo: number;

declare const kAudioUnitScope_LayerItem: number;

declare const kAudioUnitScope_Global: number;

declare const kNumberOfResponseFrequencies: number;

declare const kAudioUnitComplexRenderSelect: number;

declare const kAudioUnitScheduleParametersSelect: number;

declare const kAudioUnitSetParameterSelect: number;

declare const kAudioUnitRemoveRenderNotifySelect: number;

declare const kAudioUnitRemovePropertyListenerWithUserDataSelect: number;

declare const kAUNBandEQProperty_NumberOfBands: number;

declare const kAudioSessionIncompatibleCategory: number;

declare const kAudioUnitSetPropertySelect: number;

declare const kCAFMarkerType_SelectionStart: number;

declare const kAudioUnitInitializeSelect: number;

declare const kAudioUnitProcessSelect: number;

declare const kAudioUnitGetParameterSelect: number;

declare const kAudioUnitErr_FailedInitialization: number;

declare const kAudioUnitRange: number;

declare const kAudioFilePropertyAudioDataPacketCount: number;

declare const kAudioComponentErr_NotPermitted: number;

declare const kAudioConverterCompressionMagicCookie: number;

declare const kAudioUnitErr_MultipleVoiceProcessors: number;

declare const kAudioCodecDelayMode_Minimum: number;

declare const kAudioUnitErr_ComponentManagerNotSupported: number;

declare const kAudioUnitErr_MissingKey: number;

declare const kAudioUnitErr_InvalidFilePath: number;

declare const kAudioUnitErr_InvalidParameterValue: number;

declare const kAudioUnitProperty_SupportedChannelLayoutTags: number;

declare const kAudioUnitErr_RenderTimeout: number;

declare const kAudioFormatProperty_ASBDFromESDS: number;

declare const kAudioSessionInitializationError: number;

declare const kReverbParam_FilterBandwidth: number;

declare const kAudioComponentErr_InstanceInvalidated: number;

declare const kAudioUnitErr_Unauthorized: number;

declare const kAUNBandEQFilterType_ResonantLowPass: number;

declare const kAudioUnitErr_InvalidOfflineRender: number;

declare const kAudioUnitErr_CannotDoInCurrentContext: number;

declare const kAudioUnitErr_PropertyNotWritable: number;

declare const kAudioUnitErr_InvalidScope: number;

declare const kAudioUnitErr_TooManyFramesToProcess: number;

declare const kAudioSessionCategory_LiveAudio: number;

declare const kAudioUnitErr_NoConnection: number;

declare const kMatrixMixerParam_PrePeakHoldLevel: number;

declare const kAudioUnitErr_InvalidParameter: number;

declare const kAudioUnitSubType_SpatialMixer: number;

declare const kAudioUnitSubType_MatrixMixer: number;

declare const kAudioUnitSubType_NBandEQ: number;

declare const kAudioConverterPrimeMethod: number;

declare const kAudioFormatProperty_AvailableEncodeSampleRates: number;

declare const kAudioUnitSubType_SampleDelay: number;

declare const kAudioUnitSubType_Distortion: number;

declare const kAudioUnitSubType_HighShelfFilter: number;

declare const kAudioFileStreamError_UnsupportedDataFormat: number;

declare const kAudioUnitSubType_LowPassFilter: number;

declare const kAudioUnitSubType_TimePitch: number;

declare const kAudioUnitSubType_AUiPodTimeOther: number;

declare const kAudioUnitSubType_Merger: number;

declare const kAudioUnitSubType_Splitter: number;

declare const kAudioUnitSubType_Sampler: number;

declare const kAudioUnitSubType_RemoteIO: number;

declare const kAudioUnitManufacturer_Apple: number;

declare const kAudioUnitType_RemoteGenerator: number;

declare const kAudioUnitType_MIDIProcessor: number;

declare const kAudioUnitType_Panner: number;

declare const kAudioUnitType_FormatConverter: number;

declare const kAudioUnitType_MusicDevice: number;

declare const kHintAdvanced: number;

declare const kAudioToolboxErr_TrackIndexError: number;

declare const kAudioCodecOutputPrecedenceBitRate: number;

declare const kAudioCodecBitRateFormat_VBR: number;

declare const kAudioCodecPropertyAvailableInputChannelLayouts: number;

declare const kAUSamplerParam_Pan: number;

declare const kAudioUnitSubType_AUConverter: number;

declare const kAudioCodecPropertyOutputChannelLayout: number;

declare const kMusicEventType_ExtendedNote: number;

declare const kAudioCodecOutputFormatsForInputFormat: number;

declare const kAudioCodecBitRateFormat: number;

declare const kAudioCodecPropertyAvailableBitRates: number;

declare const kMultiChannelMixerParam_PostPeakHoldLevel: number;

declare const kAudioCodecPropertyRequiresPacketDescription: number;

declare const kAudioCodecPropertyNameCFString: number;

declare const kAudioFileAAC_ADTSType: number;

declare const kAudioCodecPropertyMinimumDelayMode: number;

declare const kAudioConverterSampleRateConverterComplexity_Normal: number;

declare const kAudioCodecUnsupportedFormatError: number;

declare const kAudioCodecBadPropertySizeError: number;

declare const kAudioCodecUnknownPropertyError: number;

declare const kAudioCodecProduceOutputBufferListSelect: number;

declare const kMusicDeviceMIDIEventSelect: number;

declare const kAudioCodecAppendInputBufferListSelect: number;

declare const kAudioCodecProduceOutputDataSelect: number;

declare const kAudioUnitProperty_DeferredRendererPullSize: number;

declare const kAudioCodecInitializeSelect: number;

declare const kAudioCodecGetPropertyInfoSelect: number;

declare const kAudioFileStreamProperty_PacketToDependencyInfo: number;

declare const kAudioFilePropertyPacketToRollDistance: number;

declare const kAudioCodecProduceOutputPacketAtEOF: number;

declare const kAudioCodecProduceOutputPacketNeedsMoreInputData: number;

declare const kAudioCodecProduceOutputPacketSuccessHasMore: number;

declare const kAudioCodecProduceOutputPacketFailure: number;

declare const kAudioFileWave64Type: number;

declare const kDynamicRangeCompressionProfile_GeneralCompression: number;

declare const kDynamicRangeCompressionProfile_LateNight: number;

declare const kProgramTargetLevel_Minus20dB: number;

declare const kAudioUnitProperty_SpatialMixerAttenuationCurve: number;

declare const kProgramTargetLevel_Minus23dB: number;

declare const kAudioCodecDelayMode_Compatibility: number;

declare const kAudioCodecBitRateControlMode_Variable: number;

declare const kAudioCodecBitRateControlMode_Constant: number;

declare const kAudioCodecPrimeMethod_None: number;

declare const kAudioCodecPrimeMethod_Normal: number;

declare const kAudioCodecPrimeMethod_Pre: number;

declare const kAudioCodecQuality_Min: number;

declare const kAudioFileGlobalInfo_WritableTypes: number;

declare const kAudioCodecQuality_Medium: number;

declare const kAudioUnitProperty_HostCallbacks: number;

declare const kAUNBandEQFilterType_2ndOrderButterworthLowPass: number;

declare const kAudioCodecQuality_High: number;

declare const kAudioCodecQuality_Max: number;

declare const kAudioCodecPropertyAdjustTargetLevelConstant: number;

declare const kAudioCodecPropertyProgramTargetLevelConstant: number;

declare const kAudioCodecPropertyDynamicRangeControlMode: number;

declare const kAudioCodecPropertySoundQualityForVBR: number;

declare const kAudioCodecPropertyPrimeMethod: number;

declare const kAUVoiceIOProperty_MuteOutput: number;

declare const kAudioCodecPropertyApplicableInputSampleRates: number;

declare const kAudioCodecPropertyRecommendedBitRateRange: number;

declare const kAudioCodecPropertyIsInitialized: number;

declare const kAudioFileUnspecifiedError: number;

declare const kReverbParam_FilterGain: number;

declare const kAudioCodecPropertyUsedInputBufferSize: number;

declare const kAudioCodecPropertyCurrentOutputFormat: number;

declare const kAudioCodecPropertyInputBufferSize: number;

declare const kAudioCodecPropertyOutputFormatsForInputFormat: number;

declare const kAudioCodecPropertyInputFormatsForOutputFormat: number;

declare const kAudioCodecPropertyAvailableInputChannelLayoutTags: number;

declare const kAudioCodecPropertyDoesSampleRateConversion: number;

declare const kAudioCodecPropertyAvailableOutputSampleRates: number;

declare const kAudioConverterDecompressionMagicCookie: number;

declare const kAudioCodecPropertyAvailableInputSampleRates: number;

declare const kAudioQueueHardwareCodecPolicy_PreferSoftware: number;

declare const kAUGroupParameterID_DataEntry_LSB: number;

declare const kAudioUnitSubType_PeakLimiter: number;

declare const kAudioFileStreamError_DiscontinuityCantRecover: number;

declare const kAudioUnitType_Output: number;

declare const kAudioUnitProperty_InputSamplesInOutput: number;

declare const kAudioCodecPropertyAdjustTargetLevel: number;

declare const kAudioCodecQuality_Low: number;

declare const kAudioCodecBitRateControlMode_LongTermAverage: number;

declare const kAudioConverterEncodeAdjustableSampleRate: number;

declare const kAudioUnitErr_IllegalInstrument: number;

declare const kAudioCodecInputFormatsForOutputFormat: number;

declare const kAudioCodecBitRateFormat_ABR: number;

declare const kAudioCodecPropertyQualitySetting: number;

declare const kAudioCodecBitRateControlMode_VariableConstrained: number;

declare const kAudioUnitType_Effect: number;

declare const kAudioUnitResetSelect: number;

declare const kAUGroupParameterID_Foot_LSB: number;

declare const kAudioFileStreamProperty_PacketTableInfo: number;

declare const kAudioFileGlobalInfo_TypesForMIMEType: number;

declare const kHipassParam_Resonance: number;

declare const kAUGraphErr_CannotDoInCurrentContext: number;

declare const kAudioQueueErr_RecordUnderrun: number;

declare const kAudioFileStreamProperty_NextIndependentPacket: number;

declare const kAudioUnitErr_FormatNotSupported: number;

declare const kAudioSessionProperty_AudioCategory: number;

declare const kExtAudioFileError_CodecUnavailableInputConsumed: number;

declare const kCAF_UUIDChunkID: number;

declare const kAudioFileMarkerType_Generic: number;

declare const kAUGroupParameterID_ChannelPressure: number;

declare const kAudioFileStreamError_UnsupportedFileType: number;

declare const kAudioCodecPropertyMagicCookie: number;

declare const kCAFMarkerType_Generic: number;

declare const kAudioFormatProperty_ChannelLayoutFromESDS: number;

declare const kAudioUnitErr_InvalidPropertyValue: number;

declare const kAudioConverterPropertyBitDepthHint: number;

declare const kAudioCodecPropertyAvailableBitRateRange: number;

declare const kDynamicRangeCompressionProfile_LimitedPlaybackRange: number;

declare const kAudioConverterPropertyFormatList: number;

declare const kAUNodeInteraction_InputCallback: number;

declare const kHintBasic: number;

declare const kAudioUnitSubType_NewTimePitch: number;

declare const kAudioFilePositionError: number;

declare const kExtAudioFileProperty_ClientDataFormat: number;

declare const k3DMixerParam_Elevation: number;

declare const kAudioUnitRenderSelect: number;

declare const kAudioFileInvalidChunkError: number;

declare const kAudioCodecPropertyAvailableOutputChannelLayoutTags: number;

declare const kAudioCodecGetPropertySelect: number;

declare const kParametricEQParam_Gain: number;

declare const kAudioCodecAppendInputDataSelect: number;

declare const kAUGroupParameterID_Foot: number;

declare const kAudioOutputUnitProperty_HasIO: number;

declare const kAudioFileM4BType: number;

declare const kAudioUnitProperty_MeteringMode: number;

declare const kAudioSessionRouteChangeReason_Unknown: number;

declare const kDistortionParam_CubicTerm: number;

declare const kAudioFileAIFFType: number;

declare const kAudioCodecPropertyBitRateControlMode: number;

declare const kAudioSessionProperty_CurrentHardwareInputLatency: number;

declare const kAudioSessionNotInitialized: number;

declare const kAudioUnitSubType_Varispeed: number;

declare const kAUNBandEQFilterType_2ndOrderButterworthHighPass: number;

declare const kAudioFilePropertyPacketToDependencyInfo: number;

declare const kAudioUnitErr_InvalidElement: number;

declare const kReverb2Param_Gain: number;

declare const k3DMixerParam_Distance: number;

declare const kAUGroupParameterID_PitchBend: number;

declare const kAudioUnitProperty_ClassInfoFromDocument: number;

declare const kAudioComponentErr_UnsupportedType: number;

declare const kAudioCodecResetSelect: number;

declare const kAudioUnitProperty_SupportedNumChannels: number;

declare const kDynamicsProcessorParam_CompressionAmount: number;

declare const kAudioUnitGetPropertySelect: number;

declare const kAudioFileStreamProperty_AverageBytesPerPacket: number;

declare const kAUParameterListener_AnyParameter: number;

declare const kAudioConverterEncodeBitRate: number;

declare const kAudioCodecPropertyMinimumNumberOutputPackets: number;

declare const kAudioFormatProperty_ChannelLayoutForBitmap: number;

declare const kAudioFileGlobalInfo_UTIsForType: number;

declare const kAudioUnitType_RemoteInstrument: number;

declare const kAudioSessionNoCategorySet: number;

declare const kAudioFileBadPropertySizeError: number;

declare const kAudioCodecPropertyAvailableOutputChannelLayouts: number;

declare const kAudioUnitScope_Note: number;

declare const kAudioCodecPropertyDelayMode: number;

declare const kDynamicsProcessorParam_HeadRoom: number;

declare const kAudioCodecPropertyInputChannelLayout: number;

declare const kVarispeedParam_PlaybackRate: number;

declare const kCAF_StreamDescriptionChunkID: number;

declare const kAudioFilePropertyChannelLayout: number;

declare const kAudioFormatProperty_ChannelLayoutHash: number;

declare const kAudioFileStreamProperty_RestrictsRandomAccess: number;

declare const kAudioCodecPropertyApplicableOutputSampleRates: number;

declare const kAudioUnitType_RemoteEffect: number;

declare const kAUGroupParameterID_Sostenuto: number;

declare const kAudioQueueErr_PrimeTimedOut: number;

declare const kAudioUnitSubType_Reverb2: number;

declare const kAudioCodecPropertyAdjustCompressionProfile: number;

declare const kAudioUnitType_MusicEffect: number;

declare const kHighShelfParam_CutOffFrequency: number;

declare const kSpatialMixerParam_MinGain: number;

declare const kAudioConverterSampleRateConverterInitialPhase: number;

declare const kDistortionParam_RingModFreq1: number;

declare const kAudioComponentErr_InitializationTimedOut: number;

declare const k3DMixerParam_PostPeakHoldLevel: number;

declare const kAudioUnitSubType_RoundTripAAC: number;

declare const kAudioUnitType_OfflineEffect: number;

declare const kLimiterParam_DecayTime: number;

declare const kMusicDevicePrepareInstrumentSelect: number;

declare const kParametricEQParam_CenterFreq: number;

declare const kAudioUnitProperty_TailTime: number;

declare const kMusicDeviceMIDIEventListSelect: number;

declare const kAudioUnitProperty_ParameterStringFromValue: number;

declare const kSpatialMixerParam_GlobalReverbGain: number;

declare const kInstrumentType_Audiofile: number;

declare const kAudioUnitProperty_LastRenderSampleTime: number;

declare const kAudioCodecPropertyCurrentInputChannelLayout: number;

declare const kAudioUnitSubType_BandPassFilter: number;

declare const kAudioUnitSubType_HighPassFilter: number;

declare const kAudioUnitRemovePropertyListenerSelect: number;

declare const kAudioUnitClumpID_System: number;

declare const kAudioFormatProperty_FormatList: number;

declare const kAUGroupParameterID_Volume_LSB: number;

declare const kAudioConverterErr_NoHardwarePermission: number;

declare const kAudioUnitGetPropertyInfoSelect: number;

declare const kAudioConverterPropertyMinimumInputBufferSize: number;

declare const kHighShelfParam_Gain: number;

declare const kAudioCodecBitRateFormat_CBR: number;

declare const kAudioFileStreamProperty_AudioDataByteCount: number;

declare const kAudioFileStreamProperty_DataFormat: number;

declare const kAudioCodecDelayMode_Optimal: number;

declare const kAudioCodecPropertyManufacturerCFString: number;

declare const kAudioCodecPropertyCurrentInputFormat: number;

declare const kAudioFilePropertyPacketSizeUpperBound: number;

declare const kCAF_SMPTE_TimeType60: number;

declare const kAudioCodecUnspecifiedError: number;

declare const kAudioFileGlobalInfo_AllUTIs: number;

declare const kNewTimePitchParam_Rate: number;

declare const kMusicDeviceProperty_InstrumentNumber: number;

declare const kAudioUnitScope_Input: number;

declare const kAudioCodecDoesSampleRateConversion: number;

declare const kDynamicRangeControlMode_Heavy: number;

declare const kAudioCodecPropertyFormatInfo: number;

declare const kSpatialMixerParam_Distance: number;

declare const kAudioCodecPropertyMinimumNumberInputPackets: number;

declare const kAudioCodecNoError: number;

declare const kDistortionParam_Decay: number;

declare const kHipassParam_CutoffFrequency: number;

declare const kAudioFileMP1Type: number;

declare const kAudioConverterCurrentOutputStreamDescription: number;

declare const kAudioCodecPropertyEmploysDependentPackets: number;

declare const kExtAudioFileProperty_IOBufferSizeBytes: number;

declare const kAUGroupParameterID_ModWheel_LSB: number;

declare const kAudioUnitSubType_LowShelfFilter: number;

declare const kAudioCodecOutputPrecedence: number;

declare const kConverterPrimeMethod_Normal: number;

declare const kDynamicsProcessorParam_Threshold: number;

declare const kAudioUnitErr_ExtensionNotFound: number;

declare const kAudioUnitType_Generator: number;

declare const kDynamicRangeCompressionProfile_None: number;

declare const kAudioServicesPropertyIsUISound: number;

declare const kAudioCodecPropertyAvailableNumberChannels: number;

declare const kAudioQueueErr_CannotStart: number;

declare const kAudioFilePropertyEstimatedDuration: number;

declare const kAudioCodecPropertyPaddedZeros: number;

declare const kSpatialMixerParam_HeadPitch: number;

declare const kAudioUnitProperty_UsesInternalReverb: number;

declare const kExtAudioFileError_AsyncWriteTooLarge: number;

declare const kBandpassParam_Bandwidth: number;

declare const kMusicEventType_MIDINoteMessage: number;

declare const kAudioCodecPropertyFormatList: number;

declare const kAudioCodecUseRecommendedSampleRate: number;

declare const kSpatialMixerParam_ObstructionAttenuation: number;

declare const kAudioFileStreamProperty_FormatList: number;

declare const kMatrixMixerParam_PostPeakHoldLevelLinear: number;

declare const kAudioQueueErr_BufferEnqueuedTwice: number;

declare const kAudioOutputUnitProperty_StartTime: number;

declare const kAppleSoftwareAudioCodecManufacturer: number;

declare const kAudioUnitScope_Group: number;

declare const kProgramTargetLevel_None: number;

declare const kAUGroupParameterID_KeyPressure_FirstKey: number;

declare const kMusicNoteEvent_UseGroupInstrument: number;

declare const kAudioUnitErr_InvalidProperty: number;

declare const kAudioQueueParam_Pitch: number;

declare const kAudioUnitProperty_ScheduleAudioSlice: number;

declare const kAudioQueueErr_InvalidParameter: number;

declare const kAudioUnitProperty_IsInterAppConnected: number;

declare const kAUGroupParameterID_Volume: number;

declare const kDistortionParam_RingModMix: number;

declare const kAudioUnitErr_InstrumentTypeNotFound: number;

declare const kAudioQueueProperty_CurrentDevice: number;

declare const kAudioConverterCodecQuality: number;

declare const kAudioFileM4AType: number;

declare const kMusicDeviceProperty_SoundBankURL: number;

declare const kAudioQueueTimePitchAlgorithm_Spectral: number;

declare const kAudioFileStreamProperty_MaximumPacketSize: number;

declare const kAudioUnitSubType_ParametricEQ: number;

declare const kAudioCodecPropertySettings: number;

declare const kAudioFileStreamError_NotOptimized: number;

declare const kAudioFormatProperty_ASBDFromMPEGPacket: number;

declare const k3DMixerParam_PlaybackRate: number;

declare const kAudioFileStreamError_ValueUnknown: number;

declare const kRenderQuality_High: number;

declare const kAudioCodecSetPropertySelect: number;

declare const kAUMIDISynthProperty_EnablePreload: number;

declare const kAUSamplerProperty_LoadAudioFiles: number;

declare const kAudioCodecExtendFrequencies: number;

declare const kAudioUnitErr_Initialized: number;

declare const kAudioFileStreamProperty_AudioDataPacketCount: number;

declare const kAudioServicesNoError: number;

declare const kCAF_PacketTableChunkID: number;

declare const kMatrixMixerParam_PostPeakHoldLevel: number;

declare const kAudioCodecBadDataError: number;

declare const kAudioQueueProperty_TimePitchAlgorithm: number;

declare const kAudioFilePropertyDeferSizeUpdates: number;

declare const kAudioFilePermissionsError: number;

declare const kAudioUnitSubType_AU3DMixerEmbedded: number;

declare const kAUGroupParameterID_AllNotesOff: number;

declare const kExtAudioFileProperty_IOBuffer: number;

declare const kAudioFileEndOfFileError: number;

declare const kCAFMarkerType_RegionSyncPoint: number;

declare const kAudioCodecPropertyApplicableBitRateRange: number;

declare const kAudioUnitProperty_DependentParameters: number;

declare const kAudioCodecPropertyHasVariablePacketByteSizes: number;

declare const kAudioCodecPropertyCurrentOutputSampleRate: number;

declare const kAudioUnitProperty_InputAnchorTimeStamp: number;

declare const kAudioCodecPropertyCurrentInputSampleRate: number;

declare const kAudioFileStreamProperty_ByteToPacket: number;

declare const kCAF_SMPTE_TimeType24: number;

declare const kCAF_FormatListID: number;

declare const kAudioUnitErr_Uninitialized: number;

declare const kAudioUnitProperty_HostMIDIProtocol: number;

declare const kAudioFileGlobalInfo_AvailableFormatIDs: number;

declare const kAudioQueueErr_InvalidCodecAccess: number;

declare const kAudioFilePropertyUseAudioTrack: number;

declare const kAudioUnitProperty_SpatialMixerPointSourceInHeadMode: number;

declare const kDynamicsProcessorParam_ExpansionRatio: number;

declare const kAudioConverterPropertyOutputCodecParameters: number;

declare const kAUGroupParameterID_ResetAllControllers: number;

declare const kCAFMarkerType_ProgramStart: number;

declare const kAUSamplerProperty_LoadInstrument: number;

declare const kAudioUnitProcessMultipleSelect: number;

declare const kAudioCodecPropertyPacketFrameSize: number;

declare const kAudioSessionProperty_InputGainScalar: number;

declare const kAudioConverterPrimeInfo: number;

declare const kAudioFileGlobalInfo_TypesForUTI: number;

declare const kAudioOutputUnitProperty_IsRunning: number;

declare const kAudioUnitProperty_PeerURL: number;

declare const kNewTimePitchParam_EnableTransientPreservation: number;

declare const kMusicEventType_ExtendedTempo: number;

declare const kInstrumentType_SF2Preset: number;

declare const kAudioUnitErr_InvalidFile: number;

declare const kAudioOutputUnitProperty_MIDICallbacks: number;

declare const kAudioConverterAvailableEncodeBitRates: number;

declare const kExtAudioFilePacketTableInfoOverride_UseFileValue: number;

declare const kAudioSessionCategory_PlayAndRecord: number;

declare const kAudioFormatProperty_BalanceFade: number;

declare const kAudioCodecOutputPrecedenceNone: number;

declare const kAudioFormatProperty_FirstPlayableFormatFromList: number;

declare const kAudioUnitProperty_MIDIOutputBufferSizeHint: number;

declare const kMatrixMixerParam_Volume: number;

declare const kAudioConverterSampleRateConverterComplexity_Linear: number;

declare const kAudioCodecPropertyZeroFramesPadded: number;

declare const kAudioServicesBadSpecifierSizeError: number;

declare const kAudioFormatProperty_FormatInfo: number;

declare const kRenderQuality_Min: number;

declare const kDistortionParam_Rounding: number;

declare const kAudioQueueErr_InvalidBuffer: number;

declare const kAudioFileLoopDirection_NoLooping: number;

declare const kAUGroupParameterID_Pan_LSB: number;

declare const kAudioFilePropertyFileFormat: number;

declare const kAudioQueueParam_PlayRate: number;

declare const kAudioCodecPropertyCurrentTargetBitRate: number;

declare const kCAF_PeakChunkID: number;

declare const kAudioCodecPropertyProgramTargetLevel: number;

declare const kAudioOutputUnitRange: number;

declare const kAudioUnitProperty_ScheduledFilePrime: number;

declare const kSampleDelayParam_DelayFrames: number;

declare const kAUSampler_DefaultMelodicBankMSB: number;

declare const kAUNBandEQParam_Bandwidth: number;

declare const kAudioFileStreamError_DataUnavailable: number;

declare const kAudioSessionCategory_SoloAmbientSound: number;

declare const kExtAudioFileProperty_PacketTable: number;

declare const kAudioSessionMode_VideoRecording: number;

declare const kAudioUnitSubType_VoiceProcessingIO: number;

declare const kAUGroupParameterID_KeyPressure: number;

declare const kAULowShelfParam_Gain: number;

declare const kAudioCodecPropertyCurrentOutputChannelLayout: number;

declare const kAudioFormatProperty_DecodeFormatIDs: number;

declare const kCAF_iXMLChunkID: number;

declare const kAudioUnitSubType_DeferredRenderer: number;

declare const kAudioUnitProperty_StreamFormat: number;

declare const kAudioFileGlobalInfo_MIMETypesForType: number;

declare const kBandpassParam_CenterFrequency: number;

declare const kAudioConverterErr_InputSampleRateOutOfRange: number;

declare const kAudioFileStreamError_InvalidPacketOffset: number;

declare const kAudioFilePropertyMagicCookieData: number;

declare const kAudioConverterErr_InvalidInputSize: number;

declare const kAudioCodecPropertyAdjustLocalQuality: number;

declare const kAudioComponentErr_TooManyInstances: number;

declare const kAudioFileNotOptimizedError: number;

declare const kAudioUnitSubType_GenericOutput: number;

declare const kAudioConverterInputChannelLayout: number;

declare const kAudioQueueTimePitchAlgorithm_Varispeed: number;

declare const kAudioUnitProperty_ParameterClumpName: number;

declare const kLimiterParam_AttackTime: number;

declare const kAudioFileLoopDirection_ForwardAndBackward: number;

declare const kAudioSessionOverrideAudioRoute_None: number;

declare const kAudioCodecPropertyPrimeInfo: number;

declare const kSpatialMixerParam_HeadYaw: number;

declare const kMusicEventType_Meta: number;

declare const kAudioSessionMode_GameChat: number;

declare const kAudioFileGlobalInfo_ReadableTypes: number;

declare const kAudioFileBW64Type: number;

declare const kDynamicsProcessorParam_OutputAmplitude: number;

declare const kAudioFileStreamProperty_BitRate: number;

declare const kAudioComponentErr_InvalidFormat: number;

declare const kAudioUnitProperty_ShouldAllocateBuffer: number;

declare const kAudioFileGlobalInfo_HFSTypeCodesForType: number;

declare const kAudioUnitProperty_ParameterValueStrings: number;

declare const kAudioConverterQuality_Min: number;

declare const kAudioOutputUnitProperty_StartTimestampsAtZero: number;

declare const kAUGroupParameterID_AllSoundOff: number;

declare const kAudioUnitProperty_MatrixDimensions: number;

declare const kAudioQueueProperty_EnableTimePitch: number;

declare const kAudioFormatProperty_FormatIsExternallyFramed: number;

declare const kDynamicsProcessorParam_ExpansionThreshold: number;

declare const kAudioUnitErr_FileNotSpecified: number;

declare const kCAFMarkerType_RegionStart: number;

declare const kAudioOutputUnitStartSelect: number;

declare const kAudioCodecIllegalOperationError: number;

declare const kAudioUnitSubType_ScheduledSoundPlayer: number;

declare const kVarispeedParam_PlaybackCents: number;

declare const kAudioFilePropertyID3TagOffset: number;

declare const kAudioFilePropertyAudioDataByteCount: number;

declare const kAudioUnitType_Mixer: number;

declare const kExtAudioFileProperty_ClientChannelLayout: number;

declare const kMusicDeviceStopNoteSelect: number;

declare const kAudioSessionSetActiveFlag_NotifyOthersOnDeactivation: number;

declare const kAUVoiceIOProperty_VoiceProcessingEnableAGC: number;

declare const kCAF_MIDIChunkID: number;

declare const kAudioUnitErr_MIDIOutputBufferFull: number;

declare const kAudioFileGlobalInfo_TypesForExtension: number;

declare const kAudioUnitProperty_CurrentPlayTime: number;

declare const kAudioFormatProperty_Encoders: number;

declare const kAudioUnitProperty_RenderContextObserver: number;

declare const kAudioFormatProperty_FormatIsEncrypted: number;

declare const kAudioFilePropertyInfoDictionary: number;

declare const kAudioUnitProperty_ScheduledFileIDs: number;

declare const kAudioCodecNotEnoughBufferSpaceError: number;

declare const kAudioUnitScope_Part: number;

declare const kAudioUnitSubType_MultiSplitter: number;

declare const kTimePitchParam_Pitch: number;

declare const kAudioUnitSubType_Delay: number;

declare const kAudioUnitErr_PropertyNotInUse: number;

declare const kAudioSessionProperty_OverrideAudioRoute: number;

declare const kAudioFileFileNotFoundError: number;

declare const kDistortionParam_SoftClipGain: number;

declare const kDynamicRangeCompressionProfile_NoisyEnvironment: number;

declare const kAUNBandEQFilterType_Parametric: number;

declare const kAudioUnitUninitializeSelect: number;

declare const kDistortionParam_LinearTerm: number;

declare const kAudioUnitSubType_MultiChannelMixer: number;

declare const kReverbParam_FilterType: number;

declare const kAudioFileStreamProperty_PacketToByte: number;

declare const kDistortionParam_DelayMix: number;

declare const kProgramTargetLevel_Minus31dB: number;

declare const kAudioSessionMode_Measurement: number;

declare const kExtAudioFileError_InvalidChannelMap: number;

declare const kAudioUnitProperty_SupportsMPE: number;

declare const kDynamicRangeControlMode_Light: number;

declare const kAudioOutputUnitProperty_NodeComponentDescription: number;

declare const kSpatialMixerParam_OcclusionAttenuation: number;

declare const kAudioUnitProperty_ScheduledFileRegion: number;

declare const kAudioUnitScope_Layer: number;

declare const kAudioCodecProduceOutputPacketSuccessConcealed: number;

declare const kMatrixMixerParam_Enable: number;

declare const kAudioUnitProperty_SpatialMixerRenderingFlags: number;

declare const kCAF_SMPTE_TimeType25: number;

declare const kAudioFileStreamProperty_PacketSizeUpperBound: number;

declare const kAudioUnitProperty_MatrixLevels: number;

declare const kAudioComponentErr_DuplicateDescription: number;

declare const kAUGroupParameterID_DataEntry: number;

declare const kAudioConverterPropertyMaximumOutputPacketSize: number;

declare const kAudioSessionRouteChangeReason_Override: number;

declare const kAudioConverterErr_InvalidOutputSize: number;

declare const kAudioUnitScope_Output: number;

declare const kAudioUnitType_RemoteMusicEffect: number;

declare const kAudioCodecStateError: number;

declare const kAudioConverterPropertyCanResumeFromInterruption: number;

declare const kAudioConverterCurrentInputStreamDescription: number;

declare const kCAF_AudioDataChunkID: number;

declare const kHintHidden: number;

declare const kAudioToolboxErr_EndOfTrack: number;

declare const kSpatialMixerParam_HeadRoll: number;

declare const kAudioFilePropertyDataFormat: number;

declare const kAudioCodecUninitializeSelect: number;

declare const kAudioToolboxError_NoTrackDestination: number;

declare const kAudioFilePropertyNextIndependentPacket: number;

declare const kAudioQueueErr_InvalidQueueType: number;

declare const kAUSamplerParam_FineTuning: number;

declare const kAUSamplerParam_Gain: number;

declare const k3DMixerParam_PreAveragePower: number;

declare const kAudioSessionProperty_InterruptionType: number;

declare const kMusicDeviceRange: number;

declare const kAudioUnitAddRenderNotifySelect: number;

declare const kAudioFormatProperty_FormatName: number;

declare const kAudioFilePropertyAudioTrackCount: number;

declare const kAudioFileMPEG4Type: number;

declare const kAudioUnitProperty_PresentPreset: number;

declare const kDynamicRangeControlMode_None: number;

declare const kAudioFileSoundDesigner2Type: number;

declare const kAudioUnitProperty_ParameterList: number;

declare const kAudioSessionCategory_AudioProcessing: number;

declare const kDynamicsProcessorParam_ReleaseTime: number;

declare const kAudioUnitProperty_FrequencyResponse: number;

declare const kAUSampler_DefaultBankLSB: number;

declare const kAudioQueueErr_InvalidTapType: number;

declare const kCAFMarkerType_EditSourceBegin: number;

declare const kAudioFileStreamProperty_MagicCookieData: number;

declare const kRenderQuality_Max: number;

declare const kAUSamplerParam_CoarseTuning: number;

declare const kAudioConverterErr_FormatNotSupported: number;

declare const kCAF_SMPTE_TimeType5994Drop: number;

declare const kAudioFilePropertyPacketTableInfo: number;

declare const kAudioSessionProperty_OverrideCategoryMixWithOthers: number;

declare const kAudioUnitProperty_NickName: number;

declare const kAudioFileMP2Type: number;

declare const kReverb2Param_RandomizeReflections: number;

declare const kAudioConverterPropertyMinimumOutputBufferSize: number;

declare const kCAF_SMPTE_TimeType50: number;

declare const kAudioUnitErr_UnknownFileType: number;

declare const kAUNBandEQParam_Frequency: number;

declare const kAUNBandEQFilterType_HighShelf: number;

declare const kAudioCodecPropertySupportedOutputFormats: number;

declare const kAudioCodecPropertyPacketSizeLimitForVBR: number;

declare const kReverbParam_FilterFrequency: number;

declare const kAudioCodecPropertyFormatCFString: number;

declare const kAudioQueueErr_InvalidProperty: number;

declare const kAudioServicesUnsupportedPropertyError: number;

declare const kReverb2Param_MinDelayTime: number;

declare const kAudioFilePropertyReserveDuration: number;

declare const kMultiChannelMixerParam_PrePeakHoldLevel: number;

declare const kAudioFileStreamProperty_FileFormat: number;

declare const kAudioUnitProperty_MIDIOutputCallbackInfo: number;

declare const kSpatialMixerParam_PlaybackRate: number;

declare const kAudioUnitProperty_ElementName: number;

declare const kAudioCodecPropertyBitRateForVBR: number;

declare const kAudioCodecPropertySupportedInputFormats: number;

declare const kAudioFileCAFType: number;

declare const kAudioFilePropertyAlbumArtwork: number;

declare const kSpatialMixerParam_Gain: number;

declare const kAudioCodecOutputPrecedenceSampleRate: number;

declare const MusicSequenceFileTypeID: {
  File_Any: 0,
  File_MIDI: 1835623529,
  File_iMelody: 1768777068,
};

declare const AudioUnitParameterOptions: {
  CFNameRelease: 16,
  OmitFromPresets: 8192,
  PlotHistory: 16384,
  MeterReadOnly: 32768,
  DisplayMask: 4653056,
  DisplaySquareRoot: 65536,
  DisplaySquared: 131072,
  DisplayCubed: 196608,
  DisplayCubeRoot: 262144,
  DisplayExponential: 327680,
  HasClump: 1048576,
  ValuesHaveStrings: 2097152,
  DisplayLogarithmic: 4194304,
  IsHighResolution: 8388608,
  NonRealTime: 16777216,
  CanRamp: 33554432,
  ExpertMode: 67108864,
  HasCFNameString: 134217728,
  IsGlobalMeta: 268435456,
  IsElementMeta: 536870912,
  IsReadable: 1073741824,
  IsWritable: -2147483648,
};

declare const MusicSequenceType: {
  Beats: 1650811252,
  Seconds: 1936024435,
  Samples: 1935764848,
};

declare const MusicSequenceLoadFlags: {
  Preserve: 0,
  ChannelsTo: 1,
};

declare const CAFRegionFlags: {
  LoopEnable: 1,
  PlayForward: 2,
  PlayBackward: 4,
};

declare const CAFFormatFlags: {
  Float: 1,
  LittleEndian: 2,
};

declare const AudioQueueProcessingTapFlags: {
  PreEffects: 1,
  PostEffects: 2,
  Siphon: 4,
  StartOfStream: 256,
  EndOfStream: 512,
};

declare const AudioPanningMode: {
  SoundField: 3,
  VectorBasedPanning: 4,
};

declare const AudioFileStreamSeekFlags: {
  kAudioFileStreamSeekFlag_OffsetIsEstimated: 1,
};

declare const AudioFilePermissions: {
  Read: 1,
  Write: 2,
  ReadWrite: 3,
};

declare const AudioFileFlags: {
  EraseFile: 1,
  DontPageAlignAudioData: 2,
};

declare const AudioConverterOptions: {
  kAudioConverterOption_Unbuffered: 65536,
};

declare const AURenderEventType: {
  Parameter: 1,
  ParameterRamp: 2,
  MIDI: 8,
  MIDISysEx: 9,
  MIDIEventList: 10,
};

declare const AUHostTransportStateFlags: {
  Changed: 1,
  Moving: 2,
  Recording: 4,
  Cycling: 8,
};

declare const AUAudioUnitBusType: {
  Input: 1,
  Output: 2,
};

declare const AUParameterAutomationEventType: {
  Value: 0,
  Touch: 1,
  Release: 2,
};

declare const AUSpatialMixerPointSourceInHeadMode: {
  Mono: 0,
  Bypass: 1,
};

declare const AudioUnitParameterUnit: {
  Generic: 0,
  Indexed: 1,
  Boolean: 2,
  Percent: 3,
  Seconds: 4,
  SampleFrames: 5,
  Phase: 6,
  Rate: 7,
  Hertz: 8,
  Cents: 9,
  RelativeSemiTones: 10,
  MIDINoteNumber: 11,
  MIDIController: 12,
  Decibels: 13,
  LinearGain: 14,
  Degrees: 15,
  EqualPowerCrossfade: 16,
  MixerFaderCurve1: 17,
  Pan: 18,
  Meters: 19,
  AbsoluteCents: 20,
  Octaves: 21,
  BPM: 22,
  Beats: 23,
  Milliseconds: 24,
  Ratio: 25,
  CustomUnit: 26,
  MIDI2Controller: 27,
};

declare const AUSpatialMixerAttenuationCurve: {
  Power: 0,
  Exponential: 1,
  Inverse: 2,
  Linear: 3,
};

declare const AUVoiceIOOtherAudioDuckingLevel: {
  Default: 0,
  Min: 10,
  Mid: 20,
  Max: 30,
};

declare const AUVoiceIOSpeechActivityEvent: {
  Started: 0,
  Ended: 1,
};

declare const AudioUnitRemoteControlEvent: {
  TogglePlayPause: 1,
  ToggleRecord: 2,
  Rewind: 3,
};

declare const AudioUnitRenderActionFlags: {
  UnitRenderAction_PreRender: 4,
  UnitRenderAction_PostRender: 8,
  UnitRenderAction_OutputIsSilence: 16,
  OfflineUnitRenderAction_Preflight: 32,
  OfflineUnitRenderAction_Render: 64,
  OfflineUnitRenderAction_Complete: 128,
  UnitRenderAction_PostRenderError: 256,
  UnitRenderAction_DoNotCheckRenderArgs: 512,
};

declare const AudioComponentValidationResult: {
  Unknown: 0,
  Passed: 1,
  Failed: 2,
  TimedOut: 3,
  UnauthorizedError_Open: 4,
  UnauthorizedError_Init: 5,
};

declare const AUParameterEventType: {
  Immediate: 1,
  Ramped: 2,
};

declare const AudioFileStreamPropertyFlags: {
  PropertyIsCached: 1,
  CacheProperty: 2,
};

declare const AU3DMixerAttenuationCurve: {
  Power: 0,
  Exponential: 1,
  Inverse: 2,
  Linear: 3,
};

declare const AudioUnitEventType: {
  ParameterValueChange: 0,
  BeginParameterChangeGesture: 1,
  EndParameterChangeGesture: 2,
  PropertyChange: 3,
};

declare const AUSpatialMixerOutputType: {
  Headphones: 1,
  BuiltInSpeakers: 2,
  ExternalSpeakers: 3,
};

declare const AudioFileStreamParseFlags: {
  kAudioFileStreamParseFlag_Discontinuity: 1,
};

declare const AUSpatialMixerRenderingFlags: {
  InterAuralDelay: 1,
  DistanceAttenuation: 4,
};

declare const MusicSequenceFileFlags: {
  Default: 0,
  EraseFile: 1,
};

declare const AU3DMixerRenderingFlags: {
  InterAuralDelay: 1,
  DopplerShift: 2,
  DistanceAttenuation: 4,
  DistanceFilter: 8,
  DistanceDiffusion: 16,
  LinearDistanceAttenuation: 32,
  ConstantReverbBlend: 64,
};

declare const AUSpatializationAlgorithm: {
  EqualPowerPanning: 0,
  SphericalHead: 1,
  HRTF: 2,
  SoundField: 3,
  VectorBasedPanning: 4,
  StereoPassThrough: 5,
  HRTFHQ: 6,
  UseOutputType: 7,
};

declare const AUScheduledAudioSliceFlags: {
  Complete: 1,
  BeganToRender: 2,
  BeganToRenderLate: 4,
  Loop: 8,
  Interrupt: 16,
  InterruptAtLoop: 32,
};

declare const AudioFileRegionFlags: {
  LoopEnable: 1,
  PlayForward: 2,
  PlayBackward: 4,
};

declare const AudioComponentInstantiationOptions: {
  kAudioComponentInstantiation_LoadedRemotely: -2147483648,
};

declare const AudioSettingsFlags: {
  Expert: 1,
  Invisible: 2,
  Meta: 4,
  UserInterface: 8,
};

declare const AUSpatialMixerSourceMode: {
  SpatializeIfMono: 0,
  Bypass: 1,
  PointSource: 2,
  AmbienceBed: 3,
};

declare const AudioBalanceFadeType: {
  MaxUnityGain: 0,
  EqualPower: 1,
};

declare const AUReverbRoomType: {
  SmallRoom: 0,
  MediumRoom: 1,
  LargeRoom: 2,
  MediumHall: 3,
  LargeHall: 4,
  Plate: 5,
  MediumChamber: 6,
  LargeChamber: 7,
  Cathedral: 8,
  LargeRoom2: 9,
  MediumHall2: 10,
  MediumHall3: 11,
  LargeHall2: 12,
};

declare const AudioBytePacketTranslationFlags: {
  kBytePacketTranslationFlag_IsEstimate: 1,
};

declare class OpaqueMusicPlayer {
  constructor(init?: OpaqueMusicPlayer);
}

declare class AUPresetEvent {
  constructor(init?: AUPresetEvent);
  scope: number;
  element: number;
  preset: interop.Pointer;
}

declare class ExtendedTempoEvent {
  constructor(init?: ExtendedTempoEvent);
  bpm: number;
}

declare class ExtendedNoteOnEvent {
  constructor(init?: ExtendedNoteOnEvent);
  instrumentID: number;
  groupID: number;
  duration: number;
  extendedParams: MusicDeviceNoteParams;
}

declare class MIDIRawData {
  constructor(init?: MIDIRawData);
  length: number;
  data: unknown /* const array */;
}

declare class MIDIChannelMessage {
  constructor(init?: MIDIChannelMessage);
  status: number;
  data1: number;
  data2: number;
  reserved: number;
}

declare class OpaqueExtAudioFile {
  constructor(init?: OpaqueExtAudioFile);
}

declare class CAFUMIDChunk {
  constructor(init?: CAFUMIDChunk);
  mBytes: unknown /* const array */;
}

declare class CAFOverviewSample {
  constructor(init?: CAFOverviewSample);
  mMinValue: number;
  mMaxValue: number;
}

declare class CAFPositionPeak {
  constructor(init?: CAFPositionPeak);
  mValue: number;
  mFrameNumber: number;
}

declare class CAFStrings {
  constructor(init?: CAFStrings);
  mNumEntries: number;
  mStringsIDs: unknown /* const array */;
}

declare class CAFRegion {
  constructor(init?: CAFRegion);
  mRegionID: number;
  mFlags: interop.Enum<typeof CAFRegionFlags>;
  mNumberMarkers: number;
  mMarkers: unknown /* const array */;
}

declare class CAFMarker {
  constructor(init?: CAFMarker);
  mType: number;
  mFramePosition: number;
  mMarkerID: number;
  mSMPTETime: CAF_SMPTE_Time;
  mChannel: number;
}

declare class CAF_SMPTE_Time {
  constructor(init?: CAF_SMPTE_Time);
  mHours: number;
  mMinutes: number;
  mSeconds: number;
  mFrames: number;
  mSubFrameSampleOffset: number;
}

declare class CAFPacketTableHeader {
  constructor(init?: CAFPacketTableHeader);
  mNumberPackets: number;
  mNumberValidFrames: number;
  mPrimingFrames: number;
  mRemainderFrames: number;
  mPacketDescriptions: unknown /* const array */;
}

declare class CAFAudioFormatListItem {
  constructor(init?: CAFAudioFormatListItem);
  mFormat: CAFAudioDescription;
  mChannelLayoutTag: number;
}

declare class CAF_UUID_ChunkHeader {
  constructor(init?: CAF_UUID_ChunkHeader);
  mHeader: CAFChunkHeader;
  mUUID: unknown /* const array */;
}

declare class CAFChunkHeader {
  constructor(init?: CAFChunkHeader);
  mChunkType: number;
  mChunkSize: number;
}

declare class CAFFileHeader {
  constructor(init?: CAFFileHeader);
  mFileType: number;
  mFileVersion: number;
  mFileFlags: number;
}

declare class AudioUnitEvent {
  constructor(init?: AudioUnitEvent);
  mEventType: interop.Enum<typeof AudioUnitEventType>;
  mArgument: unnamed_8536068540525109084;
}

declare class AUListenerBase {
  constructor(init?: AUListenerBase);
}

declare class AudioQueueChannelAssignment {
  constructor(init?: AudioQueueChannelAssignment);
  mDeviceUID: interop.Pointer;
  mChannelNumber: number;
}

declare class AudioQueueLevelMeterState {
  constructor(init?: AudioQueueLevelMeterState);
  mAveragePower: number;
  mPeakPower: number;
}

declare class AudioQueueBuffer {
  constructor(init?: AudioQueueBuffer);
  mAudioDataBytesCapacity: number;
  mAudioData: interop.Pointer;
  mAudioDataByteSize: number;
  mUserData: interop.Pointer;
  mPacketDescriptionCapacity: number;
  mPacketDescriptions: interop.Pointer;
  mPacketDescriptionCount: number;
}

declare class OpaqueAudioQueue {
  constructor(init?: OpaqueAudioQueue);
}

declare class AudioBalanceFade {
  constructor(init?: AudioBalanceFade);
  mLeftRightBalance: number;
  mBackFrontFade: number;
  mType: interop.Enum<typeof AudioBalanceFadeType>;
  mChannelLayout: interop.Pointer;
}

declare class AudioPanningInfo {
  constructor(init?: AudioPanningInfo);
  mPanningMode: interop.Enum<typeof AudioPanningMode>;
  mCoordinateFlags: number;
  mCoordinates: unknown /* const array */;
  mGainScale: number;
  mOutputChannelMap: interop.Pointer;
}

declare class AudioFileTypeAndFormatID {
  constructor(init?: AudioFileTypeAndFormatID);
  mFileType: number;
  mFormatID: number;
}

declare class AudioPacketRangeByteCountTranslation {
  constructor(init?: AudioPacketRangeByteCountTranslation);
  mPacket: number;
  mPacketCount: number;
  mByteCountUpperBound: number;
}

declare class AudioFilePacketTableInfo {
  constructor(init?: AudioFilePacketTableInfo);
  mNumberValidFrames: number;
  mPrimingFrames: number;
  mRemainderFrames: number;
}

declare class AudioBytePacketTranslation {
  constructor(init?: AudioBytePacketTranslation);
  mByte: number;
  mPacket: number;
  mByteOffsetInPacket: number;
  mFlags: interop.Enum<typeof AudioBytePacketTranslationFlags>;
}

declare class AudioFramePacketTranslation {
  constructor(init?: AudioFramePacketTranslation);
  mFrame: number;
  mPacket: number;
  mFrameOffsetInPacket: number;
}

declare class AudioFileRegion {
  constructor(init?: AudioFileRegion);
  mRegionID: number;
  mName: interop.Pointer;
  mFlags: interop.Enum<typeof AudioFileRegionFlags>;
  mNumberMarkers: number;
  mMarkers: unknown /* const array */;
}

declare class AudioFileMarkerList {
  constructor(init?: AudioFileMarkerList);
  mSMPTE_TimeType: number;
  mNumberMarkers: number;
  mMarkers: unknown /* const array */;
}

declare class AudioConverterPrimeInfo {
  constructor(init?: AudioConverterPrimeInfo);
  leadingFrames: number;
  trailingFrames: number;
}

declare class AUNodeRenderCallback {
  constructor(init?: AUNodeRenderCallback);
  destNode: number;
  destInputNumber: number;
  cback: AURenderCallbackStruct;
}

declare class AudioUnitNodeConnection {
  constructor(init?: AudioUnitNodeConnection);
  sourceNode: number;
  sourceOutputNumber: number;
  destNode: number;
  destInputNumber: number;
}

declare class OpaqueAUGraph {
  constructor(init?: OpaqueAUGraph);
}

declare class MusicDeviceNoteParams {
  constructor(init?: MusicDeviceNoteParams);
  argCount: number;
  mPitch: number;
  mVelocity: number;
  mControls: unknown /* const array */;
}

declare class OpaqueAudioConverter {
  constructor(init?: OpaqueAudioConverter);
}

declare class AUMIDIEventList {
  constructor(init?: AUMIDIEventList);
  next: interop.Pointer;
  eventSampleTime: number;
  eventType: interop.Enum<typeof AURenderEventType>;
  reserved: number;
  cable: number;
  eventList: MIDIEventList;
}

declare class AURenderEventHeader {
  constructor(init?: AURenderEventHeader);
  next: interop.Pointer;
  eventSampleTime: number;
  eventType: interop.Enum<typeof AURenderEventType>;
  reserved: number;
}

declare class CAFPeakChunk {
  constructor(init?: CAFPeakChunk);
  mEditCount: number;
  mPeaks: unknown /* const array */;
}

declare class AUParameterAutomationEvent {
  constructor(init?: AUParameterAutomationEvent);
  hostTime: number;
  address: number;
  value: number;
  eventType: interop.Enum<typeof AUParameterAutomationEventType>;
  reserved: number;
}

declare class AUSamplerBankPresetData {
  constructor(init?: AUSamplerBankPresetData);
  bankURL: interop.Pointer;
  bankMSB: number;
  bankLSB: number;
  presetID: number;
  reserved: number;
}

declare class AUSamplerInstrumentData {
  constructor(init?: AUSamplerInstrumentData);
  fileURL: interop.Pointer;
  instrumentType: number;
  bankMSB: number;
  bankLSB: number;
  presetID: number;
}

declare class ScheduledAudioSlice {
  constructor(init?: ScheduledAudioSlice);
  mTimeStamp: AudioTimeStamp;
  mCompletionProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  mCompletionProcUserData: interop.Pointer;
  mFlags: interop.Enum<typeof AUScheduledAudioSliceFlags>;
  mReserved: number;
  mReserved2: interop.Pointer;
  mNumberFrames: number;
  mBufferList: interop.Pointer;
}

declare class MixerDistanceParams {
  constructor(init?: MixerDistanceParams);
  mReferenceDistance: number;
  mMaxDistance: number;
  mMaxAttenuation: number;
}

declare class AudioUnitMeterClipping {
  constructor(init?: AudioUnitMeterClipping);
  peakValueSinceLastCall: number;
  sawInfinity: number;
  sawNotANumber: number;
}

declare class AudioOutputUnitMIDICallbacks {
  constructor(init?: AudioOutputUnitMIDICallbacks);
  userData: interop.Pointer;
  MIDIEventProc: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number) => void | null;
  MIDISysExProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => void | null;
}

declare class AudioUnitParameterNameInfo {
  constructor(init?: AudioUnitParameterNameInfo);
  inID: number;
  inDesiredLength: number;
  outName: interop.Pointer;
}

declare class AudioUnitRenderContext {
  constructor(init?: AudioUnitRenderContext);
  workgroup: OS_os_workgroup | null;
  reserved: unknown /* const array */;
}

declare class AudioUnitParameterHistoryInfo {
  constructor(init?: AudioUnitParameterHistoryInfo);
  updatesPerSecond: number;
  historyDurationInSeconds: number;
}

declare class AUInputSamplesInOutputCallbackStruct {
  constructor(init?: AUInputSamplesInOutputCallbackStruct);
  inputToOutputCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => void | null;
  userData: interop.Pointer;
}

declare class AUMIDIOutputCallbackStruct {
  constructor(init?: AUMIDIOutputCallbackStruct);
  midiOutputCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number | null;
  userData: interop.Pointer;
}

declare class AudioUnitConnection {
  constructor(init?: AudioUnitConnection);
  sourceAudioUnit: interop.Pointer;
  sourceOutputNumber: number;
  destInputNumber: number;
}

declare class AUPreset {
  constructor(init?: AUPreset);
  presetNumber: number;
  presetName: interop.Pointer;
}

declare class AudioIndependentPacketTranslation {
  constructor(init?: AudioIndependentPacketTranslation);
  mPacket: number;
  mIndependentlyDecodablePacket: number;
}

declare class AudioUnitParameter {
  constructor(init?: AudioUnitParameter);
  mAudioUnit: interop.Pointer;
  mParameterID: number;
  mScope: number;
  mElement: number;
}

declare class AURenderCallbackStruct {
  constructor(init?: AURenderCallbackStruct);
  inputProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible) => number | null;
  inputProcRefCon: interop.Pointer;
}

declare class unnamed_10479162294216976082 {
  constructor(init?: unnamed_10479162294216976082);
  startBufferOffset: number;
  durationInFrames: number;
  startValue: number;
  endValue: number;
}

declare class OpaqueAudioComponentInstance {
  constructor(init?: OpaqueAudioComponentInstance);
}

declare class AudioComponentDescription {
  constructor(init?: AudioComponentDescription);
  componentType: number;
  componentSubType: number;
  componentManufacturer: number;
  componentFlags: number;
  componentFlagsMask: number;
}

declare class CAFMarkerChunk {
  constructor(init?: CAFMarkerChunk);
  mSMPTE_TimeType: number;
  mNumberMarkers: number;
  mMarkers: unknown /* const array */;
}

declare class OpaqueMusicSequence {
  constructor(init?: OpaqueMusicSequence);
}

declare class AudioUnitProperty {
  constructor(init?: AudioUnitProperty);
  mAudioUnit: interop.Pointer;
  mPropertyID: number;
  mScope: number;
  mElement: number;
}

declare class OpaqueAudioComponent {
  constructor(init?: OpaqueAudioComponent);
}

declare class AudioCodecPrimeInfo {
  constructor(init?: AudioCodecPrimeInfo);
  leadingFrames: number;
  trailingFrames: number;
}

declare class CABarBeatTime {
  constructor(init?: CABarBeatTime);
  bar: number;
  beat: number;
  subbeat: number;
  subbeatDivisor: number;
  reserved: number;
}

declare class AudioUnitParameterValueFromString {
  constructor(init?: AudioUnitParameterValueFromString);
  inParamID: number;
  inString: interop.Pointer;
  outValue: number;
}

declare class AudioUnitParameterStringFromValue {
  constructor(init?: AudioUnitParameterStringFromValue);
  inParamID: number;
  inValue: interop.Pointer;
  outString: interop.Pointer;
}

declare class AudioFile_SMPTE_Time {
  constructor(init?: AudioFile_SMPTE_Time);
  mHours: number;
  mMinutes: number;
  mSeconds: number;
  mFrames: number;
  mSubFrameSampleOffset: number;
}

declare class AUMIDIEvent {
  constructor(init?: AUMIDIEvent);
  next: interop.Pointer;
  eventSampleTime: number;
  eventType: interop.Enum<typeof AURenderEventType>;
  reserved: number;
  length: number;
  cable: number;
  data: unknown /* const array */;
}

declare class AUParameterEvent {
  constructor(init?: AUParameterEvent);
  next: interop.Pointer;
  eventSampleTime: number;
  eventType: interop.Enum<typeof AURenderEventType>;
  reserved: unknown /* const array */;
  rampDurationSampleFrames: number;
  parameterAddress: number;
  value: number;
}

declare class MIDIMetaEvent {
  constructor(init?: MIDIMetaEvent);
  metaEventType: number;
  unused1: number;
  unused2: number;
  unused3: number;
  dataLength: number;
  data: unknown /* const array */;
}

declare class AudioFormatInfo {
  constructor(init?: AudioFormatInfo);
  mASBD: AudioStreamBasicDescription;
  mMagicCookie: interop.Pointer;
  mMagicCookieSize: number;
}

declare class OpaqueAudioQueueProcessingTap {
  constructor(init?: OpaqueAudioQueueProcessingTap);
}

declare class MIDIEventList {
  constructor(init?: MIDIEventList);
  protocol: interop.Enum<typeof MIDIProtocolID>;
  numPackets: number;
  packet: unknown /* const array */;
}

declare class MusicTrackLoopInfo {
  constructor(init?: MusicTrackLoopInfo);
  loopDuration: number;
  numberOfLoops: number;
}

declare class OpaqueMusicEventIterator {
  constructor(init?: OpaqueMusicEventIterator);
}

declare class MusicEventUserData {
  constructor(init?: MusicEventUserData);
  length: number;
  data: unknown /* const array */;
}

declare class CAFInstrumentChunk {
  constructor(init?: CAFInstrumentChunk);
  mBaseNote: number;
  mMIDILowNote: number;
  mMIDIHighNote: number;
  mMIDILowVelocity: number;
  mMIDIHighVelocity: number;
  mdBGain: number;
  mStartRegionID: number;
  mSustainRegionID: number;
  mReleaseRegionID: number;
  mInstrumentID: number;
}

declare class AudioUnitExternalBuffer {
  constructor(init?: AudioUnitExternalBuffer);
  buffer: interop.Pointer;
  size: number;
}

declare class NoteParamsControlValue {
  constructor(init?: NoteParamsControlValue);
  mID: number;
  mValue: number;
}

declare class AudioUnitParameterInfo {
  constructor(init?: AudioUnitParameterInfo);
  name: unknown /* const array */;
  unitName: interop.Pointer;
  clumpID: number;
  cfNameString: interop.Pointer;
  unit: interop.Enum<typeof AudioUnitParameterUnit>;
  minValue: number;
  maxValue: number;
  defaultValue: number;
  flags: interop.Enum<typeof AudioUnitParameterOptions>;
}

declare class AudioFileMarker {
  constructor(init?: AudioFileMarker);
  mFramePosition: number;
  mName: interop.Pointer;
  mMarkerID: number;
  mSMPTETime: AudioFile_SMPTE_Time;
  mType: number;
  mReserved: number;
  mChannel: number;
}

declare class AudioCodecMagicCookieInfo {
  constructor(init?: AudioCodecMagicCookieInfo);
  mMagicCookieSize: number;
  mMagicCookie: interop.Pointer;
}

declare class MIDIPacketList {
  constructor(init?: MIDIPacketList);
  numPackets: number;
  packet: unknown /* const array */;
}

declare class AudioPacketDependencyInfoTranslation {
  constructor(init?: AudioPacketDependencyInfoTranslation);
  mPacket: number;
  mIsIndependentlyDecodable: number;
  mNumberPrerollPackets: number;
}

declare class ScheduledAudioFileRegion {
  constructor(init?: ScheduledAudioFileRegion);
  mTimeStamp: AudioTimeStamp;
  mCompletionProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => void | null;
  mCompletionProcUserData: interop.Pointer;
  mAudioFile: interop.Pointer;
  mLoopCount: number;
  mStartFrame: number;
  mFramesToPlay: number;
}

declare class OpaqueAudioFileStreamID {
  constructor(init?: OpaqueAudioFileStreamID);
}

declare class AUNodeInteraction {
  constructor(init?: AUNodeInteraction);
  nodeInteractionType: number;
  nodeInteraction: unnamed_10566867607259258934;
}

declare class ExtendedAudioFormatInfo {
  constructor(init?: ExtendedAudioFormatInfo);
  mASBD: AudioStreamBasicDescription;
  mMagicCookie: interop.Pointer;
  mMagicCookieSize: number;
  mClassDescription: AudioClassDescription;
}

declare class AudioUnitParameterEvent {
  constructor(init?: AudioUnitParameterEvent);
  scope: number;
  element: number;
  parameter: number;
  eventType: interop.Enum<typeof AUParameterEventType>;
  eventValues: unnamed_2477855869733007645;
}

declare class AudioFileRegionList {
  constructor(init?: AudioFileRegionList);
  mSMPTE_TimeType: number;
  mNumberRegions: number;
  mRegions: unknown /* const array */;
}

declare class CAFInfoStrings {
  constructor(init?: CAFInfoStrings);
  mNumEntries: number;
}

declare class unnamed_1568723222243216587 {
  constructor(init?: unnamed_1568723222243216587);
  bufferOffset: number;
  value: number;
}

declare class CAFDataChunk {
  constructor(init?: CAFDataChunk);
  mEditCount: number;
  mData: unknown /* const array */;
}

declare class MusicDeviceStdNoteParams {
  constructor(init?: MusicDeviceStdNoteParams);
  argCount: number;
  mPitch: number;
  mVelocity: number;
}

declare class ParameterEvent {
  constructor(init?: ParameterEvent);
  parameterID: number;
  scope: number;
  element: number;
  value: number;
}

declare class HostCallbackInfo {
  constructor(init?: HostCallbackInfo);
  hostUserData: interop.Pointer;
  beatAndTempoProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  musicalTimeLocationProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number | null;
  transportStateProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  transportStateProc2: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible, p8: interop.PointerConvertible) => number | null;
}

declare class MIDINoteMessage {
  constructor(init?: MIDINoteMessage);
  channel: number;
  note: number;
  velocity: number;
  releaseVelocity: number;
  duration: number;
}

declare class AudioOutputUnitStartAtTimeParams {
  constructor(init?: AudioOutputUnitStartAtTimeParams);
  mTimestamp: AudioTimeStamp;
  mFlags: number;
}

declare class AudioPacketRollDistanceTranslation {
  constructor(init?: AudioPacketRollDistanceTranslation);
  mPacket: number;
  mRollDistance: number;
}

declare class CAFRegionChunk {
  constructor(init?: CAFRegionChunk);
  mSMPTE_TimeType: number;
  mNumberRegions: number;
  mRegions: unknown /* const array */;
}

declare class AUDependentParameter {
  constructor(init?: AUDependentParameter);
  mScope: number;
  mParameterID: number;
}

declare class AudioComponentPlugInInterface {
  constructor(init?: AudioComponentPlugInInterface);
  Open: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  Close: (p1: interop.PointerConvertible) => number | null;
  Lookup: (p1: number) => (p1: interop.PointerConvertible) => number | null;
  reserved: interop.Pointer;
}

declare class OpaqueMusicTrack {
  constructor(init?: OpaqueMusicTrack);
}

declare class AURecordedParameterEvent {
  constructor(init?: AURecordedParameterEvent);
  hostTime: number;
  address: number;
  value: number;
}

declare class OpaqueAudioFileID {
  constructor(init?: OpaqueAudioFileID);
}

declare class AudioUnitFrequencyResponseBin {
  constructor(init?: AudioUnitFrequencyResponseBin);
  mFrequency: number;
  mMagnitude: number;
}

declare class OpaqueAudioQueueTimeline {
  constructor(init?: OpaqueAudioQueueTimeline);
}

declare class CAFStringID {
  constructor(init?: CAFStringID);
  mStringID: number;
  mStringStartByteOffset: number;
}

declare class CAFOverviewChunk {
  constructor(init?: CAFOverviewChunk);
  mEditCount: number;
  mNumFramesPerOVWSample: number;
  mData: unknown /* const array */;
}

declare class AudioQueueParameterEvent {
  constructor(init?: AudioQueueParameterEvent);
  mID: number;
  mValue: number;
}

declare class AUChannelInfo {
  constructor(init?: AUChannelInfo);
  inChannels: number;
  outChannels: number;
}

declare class AUVoiceIOOtherAudioDuckingConfiguration {
  constructor(init?: AUVoiceIOOtherAudioDuckingConfiguration);
  mEnableAdvancedDucking: number;
  mDuckingLevel: interop.Enum<typeof AUVoiceIOOtherAudioDuckingLevel>;
}

declare class CAFAudioDescription {
  constructor(init?: CAFAudioDescription);
  mSampleRate: number;
  mFormatID: number;
  mFormatFlags: interop.Enum<typeof CAFFormatFlags>;
  mBytesPerPacket: number;
  mFramesPerPacket: number;
  mChannelsPerFrame: number;
  mBitsPerChannel: number;
}

type unnamed_10566867607259258934Descriptor = 
  | { connection: AudioUnitNodeConnection }
  | { inputCallback: AUNodeRenderCallback };

declare class unnamed_10566867607259258934 {
  constructor(init?: unnamed_10566867607259258934Descriptor);
  connection: AudioUnitNodeConnection;
  inputCallback: AUNodeRenderCallback;
}

type unnamed_2477855869733007645Descriptor = 
  | { ramp: unnamed_10479162294216976082 }
  | { immediate: unnamed_1568723222243216587 };

declare class unnamed_2477855869733007645 {
  constructor(init?: unnamed_2477855869733007645Descriptor);
  ramp: unnamed_10479162294216976082;
  immediate: unnamed_1568723222243216587;
}

type unnamed_8536068540525109084Descriptor = 
  | { mParameter: AudioUnitParameter }
  | { mProperty: AudioUnitProperty };

declare class unnamed_8536068540525109084 {
  constructor(init?: unnamed_8536068540525109084Descriptor);
  mParameter: AudioUnitParameter;
  mProperty: AudioUnitProperty;
}

type AURenderEventDescriptor = 
  | { head: AURenderEventHeader }
  | { parameter: AUParameterEvent }
  | { MIDI: AUMIDIEvent }
  | { MIDIEventsList: AUMIDIEventList };

declare class AURenderEvent {
  constructor(init?: AURenderEventDescriptor);
  head: AURenderEventHeader;
  parameter: AUParameterEvent;
  MIDI: AUMIDIEvent;
  MIDIEventsList: AUMIDIEventList;
}

declare function AudioConverterPrepare(inFlags: number, ioReserved: interop.PointerConvertible, inCompletionBlock: (p1: number) => void): void;

declare function AudioConverterNewWithOptions(inSourceFormat: interop.PointerConvertible, inDestinationFormat: interop.PointerConvertible, inOptions: interop.Enum<typeof AudioConverterOptions>, outAudioConverter: interop.PointerConvertible): number;

declare interface AUAudioUnitFactory extends NSExtensionRequestHandling {
  createAudioUnitWithComponentDescriptionError(desc: AudioComponentDescription, error: interop.PointerConvertible): interop.Object;
}

declare class AUAudioUnitFactory extends NativeObject implements AUAudioUnitFactory {
}


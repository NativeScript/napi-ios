/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const kCMIOSampleBufferAttachmentKey_PixelBufferOverlaidByStaticImage: interop.Pointer;

declare const kCMIOSampleBufferAttachment_MouseAndKeyboardModifiersKey_CursorFrameRect: interop.Pointer;

declare const kCMIOSampleBufferAttachmentKey_MouseAndKeyboardModifiers: interop.Pointer;

declare const kCMIOSampleBufferAttachmentKey_ClientSequenceID: interop.Pointer;

declare const kCMIOSampleBufferAttachmentKey_RepeatedBufferContents: interop.Pointer;

declare const kCMIOSampleBufferAttachmentKey_HostTime: interop.Pointer;

declare const kCMIOSampleBufferAttachmentKey_NumberOfVideoFramesInBuffer: interop.Pointer;

declare const kCMIOSampleBufferAttachmentKey_SMPTETime: interop.Pointer;

declare const kCMIOSampleBufferAttachmentKey_CAAudioTimeStamp: interop.Pointer;

declare const kCMIOSampleBufferAttachmentKey_HDV2_VAUX: interop.Pointer;

declare const kCMIOSampleBufferAttachmentKey_HDV1_PackData: interop.Pointer;

declare const kCMIOSampleBufferAttachmentKey_DiscontinuityFlags: interop.Pointer;

declare const kCMIOSampleBufferNoDataEvent_SleepWakeCycle: number;

declare const kCMIOSampleBufferNoDataEvent_ProcessingError: number;

declare const kCMIOSampleBufferNoDataEvent_DeviceDidNotSync: number;

declare const kCMIOSampleBufferNoDataEvent_NoMedia: number;

declare const kCMIOSampleBufferDiscontinuityFlag_CodecSettingsChanged: number;

declare const kCMIOSampleBufferDiscontinuityFlag_DataFormatChanged: number;

declare const kCMIOSampleBufferDiscontinuityFlag_NoDataMarker: number;

declare const kCMIOSampleBufferDiscontinuityFlag_TrickPlay: number;

declare const kCMIOSampleBufferDiscontinuityFlag_MalformedData: number;

declare const kCMIOSampleBufferDiscontinuityFlag_PacketError: number;

declare const kCMIOSampleBufferDiscontinuityFlag_TimecodeDiscontinuity: number;

declare const kCMIOSampleBufferDiscontinuityFlag_UnknownDiscontinuity: number;

declare const kCMIOSampleBufferNoDiscontinuities: number;

declare const kCMIOPlugInPropertyBundleID: number;

declare const kCMIOPlugInClassID: number;

declare const kCMIODeviceUnsupportedFormatError: number;

declare const kCMIOHardwareSuspendedBySystemError: number;

declare const kCMIOHardwareBadStreamError: number;

declare const kCMIOHardwareBadPropertySizeError: number;

declare const kCMIOHardwareUnknownPropertyError: number;

declare const kCMIOHardwareUnspecifiedError: number;

declare const kCMIOHardwareNotRunningError: number;

declare const kCMIOHardwareNotStoppedError: number;

declare const kCMIOExposureControlPropertyMaximumGain: number;

declare const kCMIOExposureControlPropertyIntegrationTime: number;

declare const kCMIOExposureControlPropertyStable: number;

declare const kCMIOExposureControlPropertyConvergenceSpeed: number;

declare const kCMIOExposureControlPropertyTarget: number;

declare const kCMIOExposureControlPropertyLockThreshold: number;

declare const kCMIOFeatureControlPropertyNativeDataRange: number;

declare const kCMIOFeatureControlPropertyNativeData: number;

declare const kCMIOFeatureControlPropertyAbsoluteUnitName: number;

declare const kCMIOFeatureControlPropertyConvertAbsoluteToNative: number;

declare const kCMIOFeatureControlPropertyConvertNativeToAbsolute: number;

declare const kCMIOFeatureControlPropertyAbsoluteRange: number;

declare const kCMIOFeatureControlPropertyNativeRange: number;

declare const kCMIOFeatureControlPropertyAbsoluteValue: number;

declare const kCMIOFeatureControlPropertyNativeValue: number;

declare const kCMIOFeatureControlPropertyTune: number;

declare const kCMIOFeatureControlPropertyOnOff: number;

declare const kCMIOSelectorControlPropertyAvailableItems: number;

declare const kCMIOBooleanControlPropertyValue: number;

declare const kCMIONoiseReductionControlClassID: number;

declare const kCMIOTiltControlClassID: number;

declare const kCMIOPanControlClassID: number;

declare const kCMIOFocusControlClassID: number;

declare const kCMIOTemperatureControlClassID: number;

declare const kCMIOWhiteBalanceUControlClassID: number;

declare const kCMIOExposureControlClassID: number;

declare const kCMIODataSourceControlClassID: number;

declare const kCMIODirectionControlClassID: number;

declare const kCMIOFeatureControlClassID: number;

declare const kCMIOBooleanControlClassID: number;

declare const kCMIODevicePropertyLocationExternalWirelessDevice: number;

declare const kCMIODevicePropertyLocationExternalDevice: number;

declare const kCMIODevicePropertyLocationBuiltInDisplay: number;

declare const kCMIODevicePropertyIIDCInitialUnitSpace: number;

declare const kCMIODevicePropertyLinkedAndSyncedCoreAudioDeviceUID: number;

declare const kCMIODevicePropertyVideoDigitizerComponents: number;

declare const kCMIODevicePropertyLinkedCoreAudioDeviceUID: number;

declare const kCMIODevicePropertyAVCDeviceType: number;

declare const kCMIODevicePropertyCanProcessAVCCommand: number;

declare const kCMIODevicePropertyClientSyncDiscontinuity: number;

declare const kCMIODevicePropertyExcludeNonDALAccess: number;

declare const kCMIODevicePropertyLatency: number;

declare const kCMIODevicePropertyHogMode: number;

declare const kCMIODevicePropertyDeviceCanBeDefaultDevice: number;

declare const kCMIODevicePropertyModelUID: number;

declare const kCMIODeviceAVCSignalModeDVCPro50_525_60: number;

declare const kCMIODeviceAVCSignalModeDVCPro25_525_60: number;

declare const kCMIODeviceAVCSignalModeHDV2_50: number;

declare const kCMIODeviceAVCSignalModeMicroMV6Mbps_50: number;

declare const kCMIODeviceAVCSignalModeMicroMV12Mbps_50: number;

declare const kCMIODeviceAVCSignalModeHi8PAL: number;

declare const kCMIODeviceAVCSignalModeSVHS625_50: number;

declare const kCMIODeviceAVCSignalModeVHSMESECAM: number;

declare const kCMIODeviceAVCSignalModeVHSSECAM: number;

declare const kCMIODeviceAVCSignalModeVHSNPAL: number;

declare const kCMIODeviceAVCSignalModeVHSNTSC: number;

declare const kCMIODeviceAVCSignalModeDVHS: number;

declare const kCMIODeviceAVCSignalModeMPEG12Mbps_50: number;

declare const kCMIODeviceAVCSignalModeHDV1_50: number;

declare const kCMIODeviceAVCSignalModeMPEG6Mbps_60: number;

declare const kCMIODeviceAVCSignalModeMPEG12Mbps_60: number;

declare const kCMIODeviceAVCSignalModeHD1250_50: number;

declare const kCMIODeviceAVCSignalModeSDL625_50: number;

declare const kCMIODeviceAVCSignalModeSD625_50: number;

declare const kCMIODeviceAVCSignalModeHD1125_60: number;

declare const kCMIODeviceAVCSignalModeSD525_60: number;

declare const kCMIOAVCDeviceType_DVCPro100_PAL: number;

declare const kCMIOAVCDeviceType_DVCPro50_PAL: number;

declare const kCMIOAVCDeviceType_DVCPro_PAL: number;

declare const kCMIOAVCDeviceType_DVCPro_NTSC: number;

declare const kCMIOAVCDeviceType_Unknown: number;

declare const kCMIODeviceClassID: number;

declare const kCMIODevicePropertyScopePlayThrough: number;

declare const kCMIODevicePropertyScopeOutput: number;

declare const kCMIODevicePropertyScopeInput: number;

declare const kCMIOStreamPropertyPreferredFrameRate: number;

declare const kCMIOStreamPropertyInitialPresentationTimeStampForLinkedAndSyncedAudio: number;

declare const kCMIOStreamPropertyDeckLocal: number;

declare const kCMIOStreamPropertyEndOfData: number;

declare const kCMIOStreamPropertyFirstOutputPresentationTimeStamp: number;

declare const kCMIOStreamPropertyOutputBuffersRequiredForStartup: number;

declare const kCMIOStreamPropertyOutputBufferQueueSize: number;

declare const kCMIOStreamPropertyOutputBufferRepeatCount: number;

declare const kCMIOStreamPropertyNoDataEventCount: number;

declare const kCMIOStreamPropertyDeviceSyncTimeoutInMSec: number;

declare const kCMIOStreamPropertyNoDataTimeoutInMSec: number;

declare const kCMIOStreamPropertyFrameRates: number;

declare const kCMIOStreamPropertyMinimumFrameRate: number;

declare const kCMIOStreamPropertyStillImage: number;

declare const kCMIOStreamPropertyFormatDescription: number;

declare const kCMIOStreamPropertyStartingChannel: number;

declare const kCMIODeckShuttlePlayHighSpeed: number;

declare const kCMIODeckShuttlePlayFastest: number;

declare const kCMIODeckShuttlePlayFast: number;

declare const kCMIODeckShuttlePlaySlow3: number;

declare const kCMIODeckShuttlePlaySlow1: number;

declare const kCMIODeckShuttlePause: number;

declare const kCMIODeckShuttlePlayPreviousFrame: number;

declare const kCMIODeckShuttleReverseSlow1: number;

declare const kCMIODeckShuttleReverse1x: number;

declare const kCMIODevicePermissionsError: number;

declare const kCMIODeckShuttleReverseFast: number;

declare const kCMIODeckShuttleReverseFastest: number;

declare const kCMIODeckStateFastForward: number;

declare const kCMIODeckStatePlayReverse: number;

declare const kCMIODeckStatePlay: number;

declare const kCMIODeckStatusOpcode: number;

declare const kCMIODeckStatusNotThreaded: number;

declare const kCMIOStreamUnknown: number;

declare const kCMIOHardwarePropertyDefaultOutputDevice: number;

declare const kCMIOHardwarePropertyDefaultInputDevice: number;

declare const kCMIOHardwarePropertyDevices: number;

declare const kCMIOHardwarePropertyProcessIsMaster: number;

declare const kCMIOSystemObjectClassID: number;

declare const kCMIOObjectPropertyListenerRemoved: number;

declare const kCMIOObjectPropertyListenerAdded: number;

declare const kCMIOObjectPropertyOwnedObjects: number;

declare const kCMIOObjectPropertyElementNumberName: number;

declare const kCMIOObjectPropertyElementCategoryName: number;

declare const kCMIOObjectPropertyManufacturer: number;

declare const kCMIOObjectPropertyCreator: number;

declare const kCMIOObjectPropertyOwner: number;

declare const kCMIOObjectUnknown: number;

declare const kCMIOObjectClassIDWildcard: number;

declare const kCMIOObjectPropertyElementMaster: number;

declare const kCMIOObjectPropertyElementMain: number;

declare const kCMIOObjectPropertyScopeGlobal: number;

declare const kCMIOObjectPropertySelectorWildcard: number;

declare const CMIOExtensionPropertyStreamLatency: string;

declare const CMIOExtensionPropertyStreamSinkEndOfData: string;

declare const CMIOExtensionPropertyStreamSinkBufferUnderrunCount: string;

declare const CMIOExtensionPropertyStreamSinkBufferQueueSize: string;

declare const CMIOExtensionPropertyStreamFrameDuration: string;

declare const CMIOExtensionPropertyDeviceLatency: string;

declare const CMIOExtensionPropertyDeviceLinkedCoreAudioDeviceUID: string;

declare const CMIOExtensionPropertyDeviceModel: string;

declare const kCMIOHardwarePropertyDeviceForUID: number;

declare const kCMIODeckShuttlePlayNextFrame: number;

declare const CMIOExtensionPropertyDeviceIsSuspended: string;

declare const kCMIODeviceAVCSignalModeVHSPAL: number;

declare const kCMIODeckStatusBusy: number;

declare const kCMIOGainControlClassID: number;

declare const kCMIODeckShuttlePlaySlow2: number;

declare const kCMIODevicePropertyLocationExternalDisplay: number;

declare const kCMIODeviceAVCSignalModeVHSMPAL: number;

declare const kCMIODeviceAVCSignalModeHi8NTSC: number;

declare const kCMIODevicePropertyDeviceControl: number;

declare const kCMIODevicePropertySMPTETimeCallback: number;

declare const kCMIOSampleBufferAttachment_MouseAndKeyboardModifiersKey_CursorReference: interop.Pointer;

declare const kCMIOObjectClassID: number;

declare const kCMIOHardwareUnsupportedOperationError: number;

declare const kCMIODevicePropertyCanProcessRS422Command: number;

declare const kCMIOSampleBufferDiscontinuityFlag_BufferOverrun: number;

declare const kCMIOAVCDeviceType_DVCProHD_1080i50: number;

declare const kCMIOStreamPropertyDeck: number;

declare const kCMIOObjectPropertyElementWildcard: number;

declare const CMIOExtensionPropertyStreamSinkBuffersRequiredForStartup: string;

declare const kCMIOAVCDeviceType_DV_PAL: number;

declare const kCMIODevicePropertyDeviceIsAlive: number;

declare const kCMIOSampleBufferDiscontinuityFlag_TimingReferenceJumped: number;

declare const kCMIOSampleBufferNoDataEvent_Unknown: number;

declare const kCMIOSelectorControlClassID: number;

declare const kCMIODevicePropertyDeviceIsRunningSomewhere: number;

declare const kCMIOZoomRelativeControlClassID: number;

declare const kCMIOObjectPropertyName: number;

declare const kCMIODeviceAVCSignalModeDVCPro100_50: number;

declare const kCMIOSelectorControlPropertyAvailableItemNames: number;

declare const kCMIOStreamPropertyOutputBuffersNeededForThrottledPlayback: number;

declare const kCMIOStreamPropertyDeckDropness: number;

declare const kCMIOAVCDeviceType_DVCPro100_NTSC: number;

declare const kCMIOSampleBufferAttachmentKey_MuxedSourcePresentationTimeStamp: interop.Pointer;

declare const kCMIOBlockBufferAttachmentKey_CVPixelBufferReference: interop.Pointer;

declare const kCMIODeviceAVCSignalModeMPEG25Mbps_60: number;

declare const kCMIOExposureControlPropertyRegionOfInterest: number;

declare const kCMIODeckStatusNoDevice: number;

declare const CMIOExtensionPropertyDeviceTransportType: string;

declare const kCMIOSampleBufferAttachmentKey_ClosedCaptionSampleBuffer: interop.Pointer;

declare const kCMIODeckStatusSearchingForDevice: number;

declare const kCMIODeviceAVCSignalModeDVCPro50_625_50: number;

declare const kCMIOShutterControlClassID: number;

declare const kCMIOWhiteLevelControlClassID: number;

declare const kCMIOSampleBufferDiscontinuityFlag_StreamDiscontinuity: number;

declare const kCMIOContrastControlClassID: number;

declare const kCMIOStreamClassID: number;

declare const kCMIOOpticalFilterClassID: number;

declare const kCMIOHardwarePropertyAllowScreenCaptureDevices: number;

declare const kCMIOHueControlClassID: number;

declare const kCMIOHardwarePropertySuspendedBySystem: number;

declare const kCMIODeviceAVCSignalMode8mmNTSC: number;

declare const kCMIOSampleBufferAttachment_MouseAndKeyboardModifiersKey_CursorPositionX: interop.Pointer;

declare const kCMIOControlPropertyVariant: number;

declare const kCMIOSampleBufferDiscontinuityFlag_ClientSyncDiscontinuity: number;

declare const kCMIODevicePropertyLocation: number;

declare const kCMIODeviceAVCSignalModeHDV2_60: number;

declare const kCMIOPanTiltRelativeControlClassID: number;

declare const kCMIOHardwarePropertyUserSessionIsActiveOrHeadless: number;

declare const kCMIODeckStateStop: number;

declare const kCMIOSampleBufferNoDataEvent_DeviceInWrongMode: number;

declare const kCMIODeckShuttleReverseSlowest: number;

declare const kCMIOAVCDeviceType_DVCProHD_1080i60: number;

declare const kCMIODeckShuttleReverseSlow3: number;

declare const kCMIOSelectorControlPropertyCurrentItem: number;

declare const CMIOExtensionPropertyProviderName: string;

declare const kCMIOBacklightCompensationControlClassID: number;

declare const kCMIOStreamPropertyCanProcessDeckCommand: number;

declare const kCMIOPlugInPropertyIsExtension: number;

declare const kCMIOStreamPropertyStillImageFormatDescriptions: number;

declare const kCMIOSampleBufferAttachment_MouseAndKeyboardModifiersKey_KeyboardModifiersEvent: interop.Pointer;

declare const kCMIODeviceAVCSignalModeSVHS525_60: number;

declare const kCMIOSampleBufferAttachmentKey_NumberOfVideoFramesInGOP: interop.Pointer;

declare const kCMIOFeatureControlPropertyAbsoluteNative: number;

declare const kCMIOSaturationControlClassID: number;

declare const kCMIOPanTiltAbsoluteControlClassID: number;

declare const kCMIOSampleBufferAttachment_MouseAndKeyboardModifiersKey_CursorIsDrawnInFramebuffer: interop.Pointer;

declare const kCMIOSampleBufferAttachment_MouseAndKeyboardModifiersKey_CursorSeed: interop.Pointer;

declare const kCMIOSampleBufferAttachmentKey_PulldownCadenceInfo: interop.Pointer;

declare const kCMIODeviceAVCSignalModeDVCPro100_60: number;

declare const kCMIODevicePropertyPlugIn: number;

declare const kCMIOObjectSystemObject: number;

declare const kCMIODevicePropertyDeviceHasStreamingError: number;

declare const kCMIOHardwarePropertySleepingIsAllowed: number;

declare const kCMIOWhiteBalanceVControlClassID: number;

declare const kCMIOZoomControlClassID: number;

declare const kCMIOStreamPropertyDeckCueing: number;

declare const kCMIOStreamPropertyPreferredFormatDescription: number;

declare const kCMIOHardwarePropertyAllowWirelessScreenCaptureDevices: number;

declare const kCMIODevicePropertyDeviceIsRunning: number;

declare const CMIOExtensionPropertyStreamActiveFormatIndex: string;

declare const CMIOExtensionPropertyDeviceCanBeDefaultInputDevice: string;

declare const kCMIOStreamPropertyClock: number;

declare const kCMIODevicePropertyDeviceHasChanged: number;

declare const kCMIOAVCDeviceType_DV_NTSC: number;

declare const CMIOExtensionPropertyDeviceCanBeDefaultOutputDevice: string;

declare const kCMIOSampleBufferAttachmentKey_NativeSMPTEFrameCount: interop.Pointer;

declare const kCMIODevicePropertyLocationUnknown: number;

declare const kCMIODeckStateReverseSlow: number;

declare const kCMIODeckStateFastRewind: number;

declare const kCMIOHardwareNoError: number;

declare const kCMIODeckStatePause: number;

declare const kCMIODeviceAVCSignalModeMicroMV12Mbps_60: number;

declare const kCMIOControlPropertyElement: number;

declare const kCMIOSampleBufferAttachmentKey_SourceAudioFormatDescription: interop.Pointer;

declare const kCMIODeviceAVCSignalModeSDL525_60: number;

declare const kCMIOHardwarePropertyPlugInForBundleID: number;

declare const kCMIOSampleBufferAttachment_MouseAndKeyboardModifiersKey_CursorPositionY: interop.Pointer;

declare const kCMIOFeatureControlPropertyAutomaticManual: number;

declare const kCMIOSampleBufferDiscontinuityFlag_DataWasDropped: number;

declare const kCMIOControlPropertyScope: number;

declare const kCMIOJackControlClassID: number;

declare const kCMIOStreamPropertyDeckThreaded: number;

declare const kCMIODevicePropertyCanSwitchFrameRatesWithoutFrameDrops: number;

declare const kCMIOBlackLevelControlClassID: number;

declare const kCMIOSampleBufferAttachmentKey_NoDataMarker: interop.Pointer;

declare const kCMIODevicePropertyStreams: number;

declare const kCMIOAVCDeviceType_MPEG2: number;

declare const kCMIOStreamPropertyFormatDescriptions: number;

declare const kCMIODeviceAVCSignalMode8mmPAL: number;

declare const kCMIOStreamPropertyFrameRate: number;

declare const kCMIOBrightnessControlClassID: number;

declare const kCMIODeckShuttleReverseFaster: number;

declare const kCMIOHardwareBadDeviceError: number;

declare const kCMIODevicePropertyDeviceUID: number;

declare const kCMIOStreamPropertyScheduledOutputNotificationProc: number;

declare const kCMIOStreamPropertyOutputBufferUnderrunCount: number;

declare const kCMIODevicePropertyIIDCCSRData: number;

declare const kCMIOSharpnessControlClassID: number;

declare const kCMIOObjectPropertyClass: number;

declare const kCMIOWhiteBalanceControlClassID: number;

declare const kCMIOSampleBufferAttachment_MouseAndKeyboardModifiersKey_MouseButtonState: interop.Pointer;

declare const CMIOExtensionMachServiceNameKey: string;

declare const kCMIOSampleBufferDiscontinuityFlag_DiscontinuityInDTS: number;

declare const kCMIODeckStatusTapeInserted: number;

declare const kCMIOSampleBufferAttachmentKey_SequenceNumber: interop.Pointer;

declare const kCMIODeckShuttleReverseSlow2: number;

declare const kCMIOHardwareIllegalOperationError: number;

declare const kCMIOPowerLineFrequencyControlClassID: number;

declare const kCMIODeviceAVCSignalModeAudio: number;

declare const kCMIOIrisControlClassID: number;

declare const kCMIOAVCDeviceType_DVCPro100_720p: number;

declare const kCMIODevicePropertyStreamConfiguration: number;

declare const kCMIOSampleBufferAttachment_MouseAndKeyboardModifiersKey_KeyboardModifiers: interop.Pointer;

declare const kCMIODeckShuttlePlaySlowest: number;

declare const kCMIOStreamPropertyTerminalType: number;

declare const kCMIODeckShuttlePlayFaster: number;

declare const kCMIOHardwarePropertyProcessIsMain: number;

declare const kCMIOStreamPropertyLatency: number;

declare const CMIOExtensionPropertyStreamMaxFrameDuration: string;

declare const kCMIOSampleBufferDiscontinuityFlag_DurationWasExtended: number;

declare const kCMIODataDestinationControlClassID: number;

declare const kCMIOHardwarePropertyUnloadingIsAllowed: number;

declare const kCMIODevicePropertyAVCDeviceSignalMode: number;

declare const kCMIOGammaControlClassID: number;

declare const kCMIODeviceAVCSignalModeMPEG25Mbps_50: number;

declare const kCMIODeckShuttlePlay1x: number;

declare const CMIOExtensionInfoDictionaryKey: string;

declare const kCMIOExposureControlPropertyStability: number;

declare const kCMIODeckStatusLocal: number;

declare const kCMIOControlClassID: number;

declare const kCMIODevicePropertyDeviceMaster: number;

declare const kCMIOStreamPropertyDirection: number;

declare const kCMIOObjectPropertyElementName: number;

declare const kCMIOObjectPropertyScopeWildcard: number;

declare const kCMIOSampleBufferDiscontinuityFlag_RelatedToDiscontinuity: number;

declare const CMIOExtensionPropertyProviderManufacturer: string;

declare const kCMIOHardwareBadObjectError: number;

declare const kCMIOSampleBufferDiscontinuityFlag_DataWasFlushed: number;

declare const kCMIOSelectorControlPropertyItemName: number;

declare const kCMIODeviceAVCSignalModeMPEG6Mbps_50: number;

declare const kCMIODeviceAVCSignalModeMicroMV6Mbps_60: number;

declare const kCMIORollAbsoluteControlClassID: number;

declare const kCMIODeckShuttleReverseHighSpeed: number;

declare const kCMIOAVCDeviceType_DVCPro50_NTSC: number;

declare const kCMIOHardwarePropertyIsInitingOrExiting: number;

declare const kCMIOStreamPropertyDeckFrameNumber: number;

declare const kCMIOSampleBufferAttachment_MouseAndKeyboardModifiersKey_CursorScale: interop.Pointer;

declare const kCMIOSampleBufferAttachment_MouseAndKeyboardModifiersKey_CursorIsVisible: interop.Pointer;

declare const kCMIOExposureControlPropertyUnlockThreshold: number;

declare const kCMIODevicePropertySuspendedByUser: number;

declare const kCMIODeviceAVCSignalModeDVCPro25_625_50: number;

declare const kCMIOStreamPropertyFrameRateRanges: number;

declare const kCMIODeviceUnknown: number;

declare const kCMIODeviceAVCSignalModeHDV1_60: number;

declare const kCMIOSampleBufferDiscontinuityFlag_SleepWakeCycle: number;

declare const kCMIODeckStatePlaySlow: number;

declare const kCMIODevicePropertyTransportType: number;

declare const CMIOExtensionStreamClockType: {
  HostTime: 0,
  LinkedCoreAudioDeviceUID: 1,
  Custom: 2,
};

declare const CMIOExtensionStreamDirection: {
  Source: 0,
  Sink: 1,
};

declare const CMIOExtensionStreamDiscontinuityFlags: {
  None: 0,
  Unknown: 1,
  Time: 2,
  SampleDropped: 64,
};

declare class CMIOHardwarePlugInInterface {
  constructor(init?: CMIOHardwarePlugInInterface);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  Initialize: (p1: interop.PointerConvertible) => number | null;
  InitializeWithObjectID: (p1: interop.PointerConvertible, p2: number) => number | null;
  Teardown: (p1: interop.PointerConvertible) => number | null;
  ObjectShow: (p1: interop.PointerConvertible, p2: number) => void | null;
  ObjectHasProperty: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ObjectIsPropertySettable: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  ObjectGetPropertyDataSize: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible) => number | null;
  ObjectGetPropertyData: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible, p6: number, p7: interop.PointerConvertible, p8: interop.PointerConvertible) => number | null;
  ObjectSetPropertyData: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible, p6: number, p7: interop.PointerConvertible) => number | null;
  DeviceSuspend: (p1: interop.PointerConvertible, p2: number) => number | null;
  DeviceResume: (p1: interop.PointerConvertible, p2: number) => number | null;
  DeviceStartStream: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  DeviceStopStream: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  DeviceProcessAVCCommand: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  DeviceProcessRS422Command: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  StreamCopyBufferQueue: (p1: interop.PointerConvertible, p2: number, p3: (p1: number, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number | null;
  StreamDeckPlay: (p1: interop.PointerConvertible, p2: number) => number | null;
  StreamDeckStop: (p1: interop.PointerConvertible, p2: number) => number | null;
  StreamDeckJog: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  StreamDeckCueTo: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number) => number | null;
}

declare class CMIODeviceStreamConfiguration {
  constructor(init?: CMIODeviceStreamConfiguration);
  mNumberStreams: number;
  mNumberChannels: interop.Pointer;
}

declare class CMIOObjectPropertyAddress {
  constructor(init?: CMIOObjectPropertyAddress);
  mSelector: number;
  mScope: number;
  mElement: number;
}

declare class CMIODeviceAVCCommand {
  constructor(init?: CMIODeviceAVCCommand);
  mCommand: interop.Pointer;
  mCommandLength: number;
  mResponse: interop.Pointer;
  mResponseLength: number;
  mResponseUsed: number;
}

declare class CMIODeviceRS422Command {
  constructor(init?: CMIODeviceRS422Command);
  mCommand: interop.Pointer;
  mCommandLength: number;
  mResponse: interop.Pointer;
  mResponseLength: number;
  mResponseUsed: number;
}

declare class CMIOStreamScheduledOutputNotificationProcAndRefCon {
  constructor(init?: CMIOStreamScheduledOutputNotificationProcAndRefCon);
  scheduledOutputNotificationProc: (p1: number, p2: number, p3: interop.PointerConvertible) => void | null;
  scheduledOutputNotificationRefCon: interop.Pointer;
}

declare class CMIODeviceSMPTETimeCallback {
  constructor(init?: CMIODeviceSMPTETimeCallback);
  mGetSMPTETimeProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  mRefCon: interop.Pointer;
}

declare class CMIOStreamDeck {
  constructor(init?: CMIOStreamDeck);
  mStatus: number;
  mState: number;
  mState2: number;
}

declare function CMIOObjectShow(objectID: number): void;

declare function CMIOObjectHasProperty(objectID: number, address: interop.PointerConvertible): number;

declare function CMIOObjectIsPropertySettable(objectID: number, address: interop.PointerConvertible, isSettable: interop.PointerConvertible): number;

declare function CMIOObjectGetPropertyDataSize(objectID: number, address: interop.PointerConvertible, qualifierDataSize: number, qualifierData: interop.PointerConvertible, dataSize: interop.PointerConvertible): number;

declare function CMIOObjectGetPropertyData(objectID: number, address: interop.PointerConvertible, qualifierDataSize: number, qualifierData: interop.PointerConvertible, dataSize: number, dataUsed: interop.PointerConvertible, data: interop.PointerConvertible): number;

declare function CMIOObjectSetPropertyData(objectID: number, address: interop.PointerConvertible, qualifierDataSize: number, qualifierData: interop.PointerConvertible, dataSize: number, data: interop.PointerConvertible): number;

declare function CMIOObjectAddPropertyListener(objectID: number, address: interop.PointerConvertible, listener: (p1: number, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number, clientData: interop.PointerConvertible): number;

declare function CMIOObjectRemovePropertyListener(objectID: number, address: interop.PointerConvertible, listener: (p1: number, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number, clientData: interop.PointerConvertible): number;

declare function CMIOObjectAddPropertyListenerBlock(objectID: number, address: interop.PointerConvertible, dispatchQueue: NSObject, listener: (p1: number, p2: interop.PointerConvertible) => void): number;

declare function CMIOObjectRemovePropertyListenerBlock(objectID: number, address: interop.PointerConvertible, dispatchQueue: NSObject, listener: (p1: number, p2: interop.PointerConvertible) => void): number;

declare function CMIOStreamCopyBufferQueue(streamID: number, queueAlteredProc: (p1: number, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void, queueAlteredRefCon: interop.PointerConvertible, queue: interop.PointerConvertible): number;

declare function CMIOStreamDeckPlay(streamID: number): number;

declare function CMIOStreamDeckStop(streamID: number): number;

declare function CMIOStreamDeckJog(streamID: number, speed: number): number;

declare function CMIOStreamDeckCueTo(streamID: number, frameNumber: number, playOnCue: number): number;

declare function CMIOStreamClockCreate(allocator: interop.PointerConvertible, clockName: interop.PointerConvertible, sourceIdentifier: interop.PointerConvertible, getTimeCallMinimumInterval: CMTime, numberOfEventsForRateSmoothing: number, numberOfAveragesForRateSmoothing: number, clock: interop.PointerConvertible): number;

declare function CMIOStreamClockPostTimingEvent(eventTime: CMTime, hostTime: number, resynchronize: number, clock: interop.PointerConvertible): number;

declare function CMIOStreamClockInvalidate(clock: interop.PointerConvertible): number;

declare function CMIOStreamClockConvertHostTimeToDeviceTime(hostTime: number, clock: interop.PointerConvertible): CMTime;

declare function CMIODeviceStartStream(deviceID: number, streamID: number): number;

declare function CMIODeviceStopStream(deviceID: number, streamID: number): number;

declare function CMIODeviceProcessAVCCommand(deviceID: number, ioAVCCommand: interop.PointerConvertible): number;

declare function CMIODeviceProcessRS422Command(deviceID: number, ioRS422Command: interop.PointerConvertible): number;

declare function CMIOObjectCreate(owningPlugIn: interop.PointerConvertible, owningObjectID: number, classID: number, objectID: interop.PointerConvertible): number;

declare function CMIOObjectsPublishedAndDied(owningPlugIn: interop.PointerConvertible, owningObjectID: number, numberPublishedCMIOObjects: number, publishedCMIOObjects: interop.Pointer, numberDeadCMIOObjects: number, deadCMIOObjects: interop.Pointer): number;

declare function CMIOObjectPropertiesChanged(owningPlugIn: interop.PointerConvertible, objectID: number, numberAddresses: number, addresses: interop.Pointer): number;

declare function CMIOSampleBufferCreate(allocator: interop.PointerConvertible, dataBuffer: interop.PointerConvertible, formatDescription: interop.PointerConvertible, numSamples: number, numSampleTimingEntries: number, sampleTimingArray: interop.PointerConvertible, numSampleSizeEntries: number, sampleSizeArray: interop.PointerConvertible, sequenceNumber: number, discontinuityFlags: number, sBufOut: interop.PointerConvertible): number;

declare function CMIOSampleBufferCreateForImageBuffer(allocator: interop.PointerConvertible, imageBuffer: interop.PointerConvertible, formatDescription: interop.PointerConvertible, sampleTiming: interop.PointerConvertible, sequenceNumber: number, discontinuityFlags: number, sBufOut: interop.PointerConvertible): number;

declare function CMIOSampleBufferCreateNoDataMarker(allocator: interop.PointerConvertible, noDataEvent: number, formatDescription: interop.PointerConvertible, sequenceNumber: number, discontinuityFlags: number, sBufOut: interop.PointerConvertible): number;

declare function CMIOSampleBufferSetSequenceNumber(allocator: interop.PointerConvertible, sbuf: interop.PointerConvertible, sequenceNumber: number): void;

declare function CMIOSampleBufferGetSequenceNumber(sbuf: interop.PointerConvertible): number;

declare function CMIOSampleBufferSetDiscontinuityFlags(allocator: interop.PointerConvertible, sbuf: interop.PointerConvertible, discontinuityFlags: number): void;

declare function CMIOSampleBufferGetDiscontinuityFlags(sbuf: interop.PointerConvertible): number;

declare function CMIOSampleBufferCopyNonRequiredAttachments(sourceSBuf: interop.PointerConvertible, destSBuf: interop.PointerConvertible, attachmentMode: number): number;

declare function CMIOSampleBufferCopySampleAttachments(sourceSBuf: interop.PointerConvertible, destSBuf: interop.PointerConvertible): number;

declare interface CMIOExtensionProviderSource extends NSObjectProtocol {
  connectClientError(client: CMIOExtensionClient, outError: interop.PointerConvertible): boolean;

  disconnectClient(client: CMIOExtensionClient): void;

  readonly availableProperties: NSSet;

  providerPropertiesForPropertiesError(properties: NSSet, outError: interop.PointerConvertible): CMIOExtensionProviderProperties;

  setProviderPropertiesError(providerProperties: CMIOExtensionProviderProperties, outError: interop.PointerConvertible): boolean;
}

declare class CMIOExtensionProviderSource extends NativeObject implements CMIOExtensionProviderSource {
}

declare interface CMIOExtensionStreamSource extends NSObjectProtocol {
  readonly formats: NSArray;

  readonly availableProperties: NSSet;

  streamPropertiesForPropertiesError(properties: NSSet, outError: interop.PointerConvertible): CMIOExtensionStreamProperties;

  setStreamPropertiesError(streamProperties: CMIOExtensionStreamProperties, outError: interop.PointerConvertible): boolean;

  authorizedToStartStreamForClient(client: CMIOExtensionClient): boolean;

  startStreamAndReturnError(outError: interop.PointerConvertible): boolean;

  stopStreamAndReturnError(outError: interop.PointerConvertible): boolean;
}

declare class CMIOExtensionStreamSource extends NativeObject implements CMIOExtensionStreamSource {
}

declare interface CMIOExtensionDeviceSource extends NSObjectProtocol {
  readonly availableProperties: NSSet;

  devicePropertiesForPropertiesError(properties: NSSet, outError: interop.PointerConvertible): CMIOExtensionDeviceProperties;

  setDevicePropertiesError(deviceProperties: CMIOExtensionDeviceProperties, outError: interop.PointerConvertible): boolean;
}

declare class CMIOExtensionDeviceSource extends NativeObject implements CMIOExtensionDeviceSource {
}

declare class CMIOExtensionClient extends NSObject implements NSCopying {
  readonly clientID: NSUUID;

  readonly signingID: string;

  readonly pid: number;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class CMIOExtensionStream extends NSObject {
  static streamWithLocalizedNameStreamIDDirectionClockTypeSource<This extends abstract new (...args: any) => any>(this: This, localizedName: string, streamID: NSUUID, direction: interop.Enum<typeof CMIOExtensionStreamDirection>, clockType: interop.Enum<typeof CMIOExtensionStreamClockType>, source: CMIOExtensionStreamSource): InstanceType<This>;

  static streamWithLocalizedNameStreamIDDirectionCustomClockConfigurationSource<This extends abstract new (...args: any) => any>(this: This, localizedName: string, streamID: NSUUID, direction: interop.Enum<typeof CMIOExtensionStreamDirection>, customClockConfiguration: CMIOExtensionStreamCustomClockConfiguration, source: CMIOExtensionStreamSource): InstanceType<This>;

  initWithLocalizedNameStreamIDDirectionClockTypeSource(localizedName: string, streamID: NSUUID, direction: interop.Enum<typeof CMIOExtensionStreamDirection>, clockType: interop.Enum<typeof CMIOExtensionStreamClockType>, source: CMIOExtensionStreamSource): this;

  initWithLocalizedNameStreamIDDirectionCustomClockConfigurationSource(localizedName: string, streamID: NSUUID, direction: interop.Enum<typeof CMIOExtensionStreamDirection>, customClockConfiguration: CMIOExtensionStreamCustomClockConfiguration, source: CMIOExtensionStreamSource): this;

  readonly localizedName: string;

  readonly streamID: NSUUID;

  readonly direction: interop.Enum<typeof CMIOExtensionStreamDirection>;

  readonly clockType: interop.Enum<typeof CMIOExtensionStreamClockType>;

  readonly customClockConfiguration: CMIOExtensionStreamCustomClockConfiguration;

  readonly source: CMIOExtensionStreamSource | null;

  readonly streamingClients: NSArray;

  notifyPropertiesChanged(propertyStates: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  sendSampleBufferDiscontinuityHostTimeInNanoseconds(sampleBuffer: interop.PointerConvertible, discontinuity: interop.Enum<typeof CMIOExtensionStreamDiscontinuityFlags>, hostTimeInNanoseconds: number): void;

  consumeSampleBufferFromClientCompletionHandler(client: CMIOExtensionClient, completionHandler: (p1: interop.PointerConvertible, p2: number, p3: interop.Enum<typeof CMIOExtensionStreamDiscontinuityFlags>, p4: boolean, p5: NSError) => void | null): void;

  notifyScheduledOutputChanged(scheduledOutput: CMIOExtensionScheduledOutput): void;
}

declare class CMIOExtensionStreamProperties extends NSObject {
  static streamPropertiesWithDictionary<This extends abstract new (...args: any) => any>(this: This, propertiesDictionary: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): InstanceType<This>;

  initWithDictionary(propertiesDictionary: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): this;

  activeFormatIndex: NSNumber;

  get frameDuration(): NSDictionary;
  set frameDuration(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  get maxFrameDuration(): NSDictionary;
  set maxFrameDuration(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  sinkBufferQueueSize: NSNumber;

  sinkBuffersRequiredForStartup: NSNumber;

  sinkBufferUnderrunCount: NSNumber;

  sinkEndOfData: NSNumber;

  setPropertyStateForProperty(propertyState: CMIOExtensionPropertyState | null, property: string): void;

  get propertiesDictionary(): NSDictionary;
  set propertiesDictionary(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  setActiveFormatIndex(activeFormatIndex: NSNumber): void;

  setFrameDuration(frameDuration: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  setMaxFrameDuration(maxFrameDuration: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  setSinkBufferQueueSize(sinkBufferQueueSize: NSNumber): void;

  setSinkBuffersRequiredForStartup(sinkBuffersRequiredForStartup: NSNumber): void;

  setSinkBufferUnderrunCount(sinkBufferUnderrunCount: NSNumber): void;

  setSinkEndOfData(sinkEndOfData: NSNumber): void;

  setPropertiesDictionary(propertiesDictionary: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;
}

declare class CMIOExtensionDevice extends NSObject {
  static deviceWithLocalizedNameDeviceIDLegacyDeviceIDSource<This extends abstract new (...args: any) => any>(this: This, localizedName: string, deviceID: NSUUID, legacyDeviceID: string | null, source: CMIOExtensionDeviceSource): InstanceType<This>;

  initWithLocalizedNameDeviceIDLegacyDeviceIDSource(localizedName: string, deviceID: NSUUID, legacyDeviceID: string | null, source: CMIOExtensionDeviceSource): this;

  readonly localizedName: string;

  readonly deviceID: NSUUID;

  readonly legacyDeviceID: string;

  readonly source: CMIOExtensionDeviceSource | null;

  readonly streams: NSArray;

  addStreamError(stream: CMIOExtensionStream, outError: interop.PointerConvertible): boolean;

  removeStreamError(stream: CMIOExtensionStream, outError: interop.PointerConvertible): boolean;

  notifyPropertiesChanged(propertyStates: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;
}

declare class CMIOExtensionDeviceProperties extends NSObject {
  static devicePropertiesWithDictionary<This extends abstract new (...args: any) => any>(this: This, propertiesDictionary: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): InstanceType<This>;

  initWithDictionary(propertiesDictionary: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): this;

  model: string;

  suspended: NSNumber;

  transportType: NSNumber;

  linkedCoreAudioDeviceUID: string;

  setPropertyStateForProperty(propertyState: CMIOExtensionPropertyState | null, property: string): void;

  get propertiesDictionary(): NSDictionary;
  set propertiesDictionary(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  setModel(model: string | null): void;

  setSuspended(suspended: NSNumber): void;

  setTransportType(transportType: NSNumber): void;

  setLinkedCoreAudioDeviceUID(linkedCoreAudioDeviceUID: string | null): void;

  setPropertiesDictionary(propertiesDictionary: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;
}

declare class CMIOExtensionProvider extends NSObject {
  static startServiceWithProvider(provider: CMIOExtensionProvider): void;

  static stopServiceWithProvider(provider: CMIOExtensionProvider): void;

  static providerWithSourceClientQueue<This extends abstract new (...args: any) => any>(this: This, source: CMIOExtensionProviderSource, clientQueue: NSObject | null): InstanceType<This>;

  initWithSourceClientQueue(source: CMIOExtensionProviderSource, clientQueue: NSObject | null): this;

  readonly source: CMIOExtensionProviderSource | null;

  readonly clientQueue: NSObject;

  readonly connectedClients: NSArray;

  readonly devices: NSArray;

  addDeviceError(device: CMIOExtensionDevice, outError: interop.PointerConvertible): boolean;

  removeDeviceError(device: CMIOExtensionDevice, outError: interop.PointerConvertible): boolean;

  notifyPropertiesChanged(propertyStates: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  static ignoreSIGTERM(): void;
}

declare class CMIOExtensionProviderProperties extends NSObject {
  static providerPropertiesWithDictionary<This extends abstract new (...args: any) => any>(this: This, propertiesDictionary: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): InstanceType<This>;

  initWithDictionary(propertiesDictionary: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): this;

  name: string;

  manufacturer: string;

  setPropertyStateForProperty(propertyState: CMIOExtensionPropertyState | null, property: string): void;

  get propertiesDictionary(): NSDictionary;
  set propertiesDictionary(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  setName(name: string | null): void;

  setManufacturer(manufacturer: string | null): void;

  setPropertiesDictionary(propertiesDictionary: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;
}

declare class CMIOExtensionStreamFormat extends NSObject implements NSCopying, NSSecureCoding {
  static streamFormatWithFormatDescriptionMaxFrameDurationMinFrameDurationValidFrameDurations<This extends abstract new (...args: any) => any>(this: This, formatDescription: interop.PointerConvertible, maxFrameDuration: CMTime, minFrameDuration: CMTime, validFrameDurations: NSArray<interop.Object> | Array<interop.Object> | null): InstanceType<This>;

  initWithFormatDescriptionMaxFrameDurationMinFrameDurationValidFrameDurations(formatDescription: interop.PointerConvertible, maxFrameDuration: CMTime, minFrameDuration: CMTime, validFrameDurations: NSArray<interop.Object> | Array<interop.Object> | null): this;

  readonly formatDescription: interop.Pointer;

  readonly minFrameDuration: CMTime;

  readonly maxFrameDuration: CMTime;

  readonly validFrameDurations: NSArray;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CMIOExtensionStreamCustomClockConfiguration extends NSObject implements NSCopying, NSSecureCoding {
  static customClockConfigurationWithClockNameSourceIdentifierGetTimeCallMinimumIntervalNumberOfEventsForRateSmoothingNumberOfAveragesForRateSmoothing<This extends abstract new (...args: any) => any>(this: This, clockName: string, sourceIdentifier: NSUUID, getTimeCallMinimumInterval: CMTime, numberOfEventsForRateSmoothing: number, numberOfAveragesForRateSmoothing: number): InstanceType<This>;

  initWithClockNameSourceIdentifierGetTimeCallMinimumIntervalNumberOfEventsForRateSmoothingNumberOfAveragesForRateSmoothing(clockName: string, sourceIdentifier: NSUUID, getTimeCallMinimumInterval: CMTime, numberOfEventsForRateSmoothing: number, numberOfAveragesForRateSmoothing: number): this;

  readonly clockName: string;

  readonly sourceIdentifier: NSUUID;

  readonly getTimeCallMinimumInterval: CMTime;

  readonly numberOfEventsForRateSmoothing: number;

  readonly numberOfAveragesForRateSmoothing: number;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CMIOExtensionPropertyState<ObjectType = interop.Object> extends NSObject implements NSCopying, NSSecureCoding {
  static propertyStateWithValue<ObjectType, This extends abstract new (...args: any) => any>(this: This, value: ObjectType | null): InstanceType<This>;

  static propertyStateWithValueAttributes<ObjectType, This extends abstract new (...args: any) => any>(this: This, value: ObjectType | null, attributes: CMIOExtensionPropertyAttributes | null): InstanceType<This>;

  initWithValue(value: ObjectType | null): this;

  initWithValueAttributes(value: ObjectType | null, attributes: CMIOExtensionPropertyAttributes | null): this;

  readonly value: ObjectType;

  readonly attributes: CMIOExtensionPropertyAttributes;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CMIOExtensionPropertyAttributes<ObjectType = interop.Object> extends NSObject implements NSCopying, NSSecureCoding {
  static propertyAttributesWithMinValueMaxValueValidValuesReadOnly<ObjectType, This extends abstract new (...args: any) => any>(this: This, minValue: ObjectType | null, maxValue: ObjectType | null, validValues: NSArray<interop.Object> | Array<interop.Object> | null, readOnly: boolean): InstanceType<This>;

  initWithMinValueMaxValueValidValuesReadOnly(minValue: ObjectType | null, maxValue: ObjectType | null, validValues: NSArray<interop.Object> | Array<interop.Object> | null, readOnly: boolean): this;

  static readonly readOnlyPropertyAttribute: CMIOExtensionPropertyAttributes;

  readonly minValue: ObjectType;

  readonly maxValue: ObjectType;

  readonly validValues: NSArray;

  readonly readOnly: boolean;

  isReadOnly(): boolean;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CMIOExtensionScheduledOutput extends NSObject implements NSCopying, NSSecureCoding {
  static scheduledOutputWithSequenceNumberHostTimeInNanoseconds<This extends abstract new (...args: any) => any>(this: This, sequenceNumber: number, hostTimeInNanoseconds: number): InstanceType<This>;

  initWithSequenceNumberHostTimeInNanoseconds(sequenceNumber: number, hostTimeInNanoseconds: number): this;

  readonly sequenceNumber: number;

  readonly hostTimeInNanoseconds: number;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}


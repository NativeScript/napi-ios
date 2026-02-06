/// <reference types="@nativescript/objc-node-api" />

declare const IOVideoStreamFormatDictionary: number;

declare const kIOVideoDevicePortTypeInput: number;

declare const kIOVideoDevicePortTypeOutput: number;

declare const kIOVideoDevicePortTypeNotification: number;

declare const IOVideoStreamDictionary: number;

declare const IOVideoStream: number;

declare const kIOVideoDeviceMethodStopStream: number;

declare const kIOVideoDeviceMethodStartStream: number;

declare const kIOVideoDeviceMethodSetStreamFormat: number;

declare const kIOVideoDeviceMethodCloseStream: number;

declare const kIOVideoDeviceMethodClose: number;

declare const IOVideoControlDictionary: number;

declare const OSString: number;

declare const kIOVideoFeatureControlClassIDOpticalFilter: number;

declare const kIOVideoFeatureControlClassIDTemperature: number;

declare const kIOVideoFeatureControlClassIDGamma: number;

declare const kIOVideoFeatureControlClassIDWhiteBalanceV: number;

declare const kIOVideoFeatureControlClassIDWhiteBalanceU: number;

declare const kIOVideoFeatureControlClassIDShutter: number;

declare const kIOVideoFeatureControlClassIDIris: number;

declare const kIOVideoFeatureControlClassIDSharpness: number;

declare const kIOVideoFeatureControlClassIDContrast: number;

declare const kIOVideoFeatureControlClassIDSaturation: number;

declare const kIOVideoFeatureControlClassIDHue: number;

declare const kIOVideoFeatureControlClassIDWhiteLevel: number;

declare const kIOVideoFeatureControlClassIDBlackLevel: number;

declare const kIOVideoSelectorControlClassIDDataDestination: number;

declare const kIOVideoBooleanControlClassIDDirection: number;

declare const kIOVideoBooleanControlClassIDJack: number;

declare const kIOVideoControlBaseClassIDSelector: number;

declare const kIOVideoControlBaseClassIDBoolean: number;

declare const kIOVideoControlScopeOutput: number;

declare const kIOVideoControlScopeInput: number;

declare const kIOVideoDeviceNotificationID_ControlValueChanged: number;

declare const kXHCIUSB2RootHubAddress: number;

declare const kUSBAddress_Mask: number;

declare const kUSBSpeed_Shift: number;

declare const kUSBCUnsupportedTBCableNotificationType: number;

declare const kUSBCUnsupportedTBPortNotificationType: number;

declare const kUSBCTBUnsupportedNotificationType: number;

declare const kUSBCTBNotEnoughPowerNotificationType: number;

declare const kUSBUnsupportedNotificationType: number;

declare const kUSBEndpointCountExceededNotificationType: number;

declare const kUSBiOSDeviceNotEnoughPowerNotificationType: number;

declare const kUSBIndividualOverCurrentNotificationType: number;

declare const kUSBNotEnoughPowerNotificationType: number;

declare const kUSBLowLatencyIsochTransferKey: number;

declare const kUSBHighSpeedMicrosecondsInFrame: number;

declare const kUSBDeviceSpeedSuperPlusBy2: number;

declare const kUSBDeviceSpeedSuperPlus: number;

declare const kUSBDeviceSpeedSuper: number;

declare const kUSBDeviceSpeedLow: number;

declare const kUSBDefaultControlNoDataTimeoutMS: number;

declare const kIOUSBAnySubClass: number;

declare const kIOUSBAnyClass: number;

declare const addPacketShift: number;

declare const kUSB_SSCompDesc_Isoc_Mult_Shift: number;

declare const kUSB_SSCompDesc_Isoc_Mult_Mask: number;

declare const kUSB_SSCompDesc_Bulk_MaxStreams_Shift: number;

declare const kUSB_HSFSEPDesc_wMaxPacketSize_Mult_Shift: number;

declare const kUSB_EPDesc_wMaxPacketSize_MPS_Shift: number;

declare const kUSB_EPDesc_wMaxPacketSize_MPS_Mask: number;

declare const kUSB_EPDesc_bmAttributes_UsageType_Mask: number;

declare const kUSB_EPDesc_bmAttributes_SyncType_Shift: number;

declare const kUSB_EPDesc_bmAttributes_SyncType_Mask: number;

declare const kUSB_EPDesc_bmAttributes_TranType_Mask: number;

declare const kIOUSBDeviceCapabilityDescriptorLengthMin: number;

declare const kIOUSBDeviceCapabilityDescriptorType: number;

declare const kSetInterfaceFeature: number;

declare const kSetDescriptor: number;

declare const kGetEndpointStatus: number;

declare const kGetInterfaceStatus: number;

declare const kGetInterface: number;

declare const kGetConfiguration: number;

declare const kClearEndpointFeature: number;

declare const kUSBMaxHSIsocEndpointReqCount: number;

declare const kUSBMaxFSIsocEndpointReqCount: number;

declare const kUSBRqRecipientMask: number;

declare const kUSBRqDirnMask: number;

declare const kUSBRqDirnShift: number;

declare const kUSBStreamIDAllStreamsMask: number;

declare const kUSBAllStreams: number;

declare const kUSBMaxStream: number;

declare const kUSBUCRequestWithoutUSBNotificationMask: number;

declare const kUSBNoPipeIdx: number;

declare const kUSBDeviceMask: number;

declare const kUSBInterfaceIDMask: number;

declare const kUSBMaxInterfaces: number;

declare const kUSBPipeIDMask: number;

declare const kUSBDeviceIDMask: number;

declare const kUSBMaxDevice: number;

declare const kUSBMaxDevices: number;

declare const kUSBDeviceIDShift: number;

declare const kUSBBillboardAdditinalInfoNoPower: number;

declare const kUSBBillboardAltModeConfigSuccess: number;

declare const kUSBBillboardConfigUnsuccessful: number;

declare const kUSBBillboardVConnReserved: number;

declare const kUSBBillboardVConn6Watt: number;

declare const kUSBBillboardVConn1P5Watt: number;

declare const kUSBSuperSpeedSupportsLS: number;

declare const kUSBImplicitFeedbackDataIsocUsageType: number;

declare const kUSBNoSynchronizationIsocSyncType: number;

declare const kUSBNotificationInterruptUsageType: number;

declare const kUSBEndpointbmAttributesUsageTypeShift: number;

declare const kUSBEndpointbmAttributesUsageTypeMask: number;

declare const kUSBEndpointbmAttributesSynchronizationTypeShift: number;

declare const kUSBEndpointbmAttributesSynchronizationTypeMask: number;

declare const kUSBEndpointbmAttributesTransferTypeMask: number;

declare const kUSBEndpointDirectionIn: number;

declare const kUSBEndpointDirectionOut: number;

declare const kUSBbEndpointDirectionBit: number;

declare const kUSBDFUManifestationTolerantBit: number;

declare const kMSCProtocolControlBulk: number;

declare const KUSBInterfaceAssociationDescriptorProtocol: number;

declare const kUSBBluetoothProgrammingInterfaceProtocol: number;

declare const kUSB2ComplianceDeviceProtocol: number;

declare const kUSBVendorSpecificProtocol: number;

declare const kHIDMouseInterfaceProtocol: number;

declare const kUSBVideoInterfaceCollectionSubClass: number;

declare const kUSBCommonClassSubClass: number;

declare const kUSBCommEthernetNetworkingSubClass: number;

declare const kUSBCommMultiChannelSubClass: number;

declare const kUSBCommAbstractSubClass: number;

declare const kUSBHIDBootInterfaceSubClass: number;

declare const kUSBMassStorageQIC157SubClass: number;

declare const kUSBMassStorageATAPISubClass: number;

declare const kUSBTestMeasurementSubClass: number;

declare const kUSBMIDIStreamingSubClass: number;

declare const kUSBAudioStreamingSubClass: number;

declare const kUSBAudioControlSubClass: number;

declare const kUSBHubSubClass: number;

declare const kUSBDisplayClass: number;

declare const kUSBVendorSpecificInterfaceClass: number;

declare const kUSBWirelessControllerInterfaceClass: number;

declare const kUSBPersonalHealthcareInterfaceClass: number;

declare const kUSBVideoInterfaceClass: number;

declare const kUSBContentSecurityInterfaceClass: number;

declare const kUSBMassStorageInterfaceClass: number;

declare const kUSBImageInterfaceClass: number;

declare const kUSBApplicationSpecificClass: number;

declare const kUSBMiscellaneousClass: number;

declare const kUSBWirelessControllerClass: number;

declare const kUSBDiagnosticClass: number;

declare const kUSBCommunicationClass: number;

declare const kHIDBootProtocolValue: number;

declare const kHIDRtFeatureReport: number;

declare const kHIDRtInputReport: number;

declare const kHIDRqSetProtocol: number;

declare const kHIDRqSetReport: number;

declare const kHIDRqGetReport: number;

declare const kUSBRel30: number;

declare const kUSBRel20: number;

declare const kUSB3MaxPowerPerPort: number;

declare const kUSB150mA: number;

declare const kUSB900mAAvailable: number;

declare const kUSB2MaxPowerPerPort: number;

declare const kUSBAtrRemoteWakeup: number;

declare const kUSBAtrBusPowered: number;

declare const kUSBLowPowerSuspendStateBit: number;

declare const kUSBFunctionRemoteWakeupBit: number;

declare const kUSBFunctionRemoteWakeCapableBit: number;

declare const kUSBFeatureU2Enable: number;

declare const kUSBDeviceCapabilityContainerID: number;

declare const kUSBDeviceCapabilityWirelessUSB: number;

declare const kUSBReportDesc: number;

declare const kUSBHIDDesc: number;

declare const kUSBOnTheGoDesc: number;

declare const kUSBOtherSpeedConfDesc: number;

declare const kUSBEndpointDesc: number;

declare const kUSBInterfaceDesc: number;

declare const kUSBDeviceDesc: number;

declare const kUSBSetSel: number;

declare const kUSBRqSyncFrame: number;

declare const kUSBRqSetInterface: number;

declare const kUSBRqGetConfig: number;

declare const kUSBRqSetDescriptor: number;

declare const kUSBEndpoint: number;

declare const kUSBDevice: number;

declare const kUSBAnyDirn: number;

declare const kUSBNone: number;

declare const kUSBIn: number;

declare const kUSBAnyType: number;

declare const kIOUSBInterfaceSuspendRemoteWakeEnable: number;

declare const kIOUSBInterfaceSuspendLowPower: number;

declare const IOUSBEndpointFeatureSelectorStall: number;

declare const kIOUSBDeviceFeatureSelectorU2Enable: number;

declare const IOUSBEndpointStatusHalt: number;

declare const kIOUSBDeviceStatusU2Enable: number;

declare const kIOUSBDeviceStatusRemoteWakeEnable: number;

declare const kIOUSBDeviceRequestGetConfiguration: number;

declare const kIOUSBDeviceRequestSetDescriptor: number;

declare const kIOUSBDeviceRequestSetFeature: number;

declare const kIOUSBDeviceRequestGetState: number;

declare const kIOUSBDeviceRequestClearFeature: number;

declare const kIOUSBDeviceRequestGetStatus: number;

declare const kIOUSBSuperSpeedHubDelayMax: number;

declare const kIOUSBSuperSpeedHubCharacteristicsReserved: number;

declare const kIOUSBSuperSpeedHubCharacteristicsOverCurrentIndividual: number;

declare const kIOUSBSuperSpeedHubCharacteristicsCompoundDevice: number;

declare const kIOUSBSuperSpeedEndpointCompanionDescriptorIsocReservedPhase: number;

declare const kIOUSBSuperSpeedEndpointCompanionDescriptorIsocReserved: number;

declare const kIOUSBSuperSpeedEndpointCompanionDescriptorIsocMultPhase: number;

declare const kIOUSBSuperSpeedEndpointCompanionDescriptorBulkReservedPhase: number;

declare const kIOUSBSuperSpeedEndpointCompanionDescriptorBulkReserved: number;

declare const kIOUSBSuperSpeedEndpointCompanionDescriptorBulkMaxStreams: number;

declare const kIOUSBSuperSpeedEndpointCompanionDescriptorMaxBurstPhase: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilitySublinkProtocolPhase: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilitySublinkSymmetry: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilitySublinkType: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilitySublinkLSEGbits: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilitySublinkLSE: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilitySublinkSpeedIdPhase: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilitySublinkSpeedId: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilityMinRxLaneCount: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilitySublinkMinSpeedIdPhase: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilitySublinkSpeedIdCount: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilitySublinkSpeedAttrCount: number;

declare const kIOUSBSuperSpeedDeviceCapabilitySupport5Gb: number;

declare const kIOUSBSuperSpeedDeviceCapabilitySupportFullSpeed: number;

declare const kIOUSBSuperSpeedDeviceCapabilityFullSpeed: number;

declare const kIOUSBSuperSpeedDeviceCapabilityLTM: number;

declare const kIOUSBUSB20ExtensionCapabilityBESLD: number;

declare const kIOUSBUSB20ExtensionCapabilityBESLValid: number;

declare const kIOUSBUSB20ExtensionCapabilityBESLSupport: number;

declare const kIOUSBUSB20ExtensionCapabilityLPM: number;

declare const kIOUSBEndpointDescriptorReservedPhase: number;

declare const kIOUSB30RetimerDepthLimit: number;

declare const kIOUSBEndpointDescriptorReserved: number;

declare const kIOUSBEndpointDescriptorPacketSizeMultPhase: number;

declare const kIOUSBEndpointDescriptorPacketSize: number;

declare const kIOUSBEndpointDescriptorUsageTypeInterruptReserved1: number;

declare const kIOUSBEndpointDescriptorUsageTypeInterruptPeriodic: number;

declare const kMSCProtocolBulkOnly: number;

declare const kIOUSBEndpointDescriptorUsageTypePhase: number;

declare const kIOUSBEndpointDescriptorUsageType: number;

declare const kIOUSBEndpointDescriptorSynchronizationTypeAdaptive: number;

declare const kIOUSBEndpointDescriptorSynchronizationTypeAsynchronous: number;

declare const kIOUSBEndpointDescriptorSynchronizationTypeNone: number;

declare const kIOUSBEndpointDescriptorSynchronizationTypePhase: number;

declare const kIOUSBEndpointDescriptorSynchronizationType: number;

declare const kIOUSBEndpointDescriptorTransferTypeInterrupt: number;

declare const kIOUSBEndpointDescriptorTransferType: number;

declare const kIOUSBEndpointDescriptorDirectionIn: number;

declare const kIOUSBEndpointDescriptorDirectionOut: number;

declare const kIOUSBEndpointDescriptorEndpointAddressReserved: number;

declare const kIOUSBEndpointDescriptorNumber: number;

declare const kIOUSBConfigurationDescriptorAttributeSelfPowered: number;

declare const kIOUSBConfigurationDescriptorAttributeRemoteWakeCapable: number;

declare const kIOUSBAppleVendorID: number;

declare const kIOStreamEnqueueInputSyncTrap: number;

declare const kIOStreamMethodSetMode: number;

declare const kIOStreamMethodStart: number;

declare const kIOStreamMethodClose: number;

declare const kIOStreamOptionOpenExclusive: number;

declare const kIOStreamPortTypeOutput: number;

declare const kIOStreamMemoryTypeMask: number;

declare const kIOStreamBufferIDMask: number;

declare const kIOStreamMemoryTypeBufferData: number;

declare const kATASMARTSelfTestStatusPreviousTestReadFailure: number;

declare const kATASMARTSelfTestStatusPreviousTestElectricalFailure: number;

declare const kATASMARTSelfTestStatusPreviousTestUnknownFailure: number;

declare const kATASMARTSelfTestStatusFatalError: number;

declare const kATASMARTOffLineCollectionAbortedByHost: number;

declare const kATASMARTOffLineCollectionNeverStarted: number;

declare const kATAOperationTypeSMS: number;

declare const kATAOperationTypeSMART: number;

declare const kATAOperationTypeFlushCache: number;

declare const kATAOperationTypeWrite: number;

declare const kATAEnablePIOModeMask: number;

declare const kATAEnableMultiWordDMAModeMask: number;

declare const kIOATADefaultPerformance: number;

declare const kIOATAFeature48BitLBA: number;

declare const kIOATAFeatureCompactFlash: number;

declare const kATAValidLogicalSectorSizeMask: number;

declare const kATAValidLogicalSectorSizeBit: number;

declare const kATASupportsFlushCacheExtendedMask: number;

declare const kATASupports48BitAddressingMask: number;

declare const kATASupportsCompactFlashMask: number;

declare const kATASupportsFlushCacheBit: number;

declare const kATASupports48BitAddressingBit: number;

declare const kATASupportsWriteCacheMask: number;

declare const kATASupportsSMARTMask: number;

declare const kATASupportsSMARTBit: number;

declare const k5Minutes: number;

declare const kIOATAMaxBlocksPerXfer: number;

declare const kIOATAMaximumBlockCount16Bit: number;

declare const kIOATAMaximumBlockCount8Bit: number;

declare const kIOATASectorCount16Bit: number;

declare const kIOATASectorCount8Bit: number;

declare const kATADefaultRetries: number;

declare const kATAZeroRetries: number;

declare const kATATimeout45Seconds: number;

declare const kATATimeout30Seconds: number;

declare const kSizeOfATARevisionString: number;

declare const kSizeOfATAModelString: number;

declare const kCurFieldsValidMask: number;

declare const kExtFieldsValidBit: number;

declare const kStandbySupportedMask: number;

declare const kIORDYSupportedMask: number;

declare const kDMADisableMask: number;

declare const kIOUSBEndpointDescriptorUsageTypeIsocFeedback: number;

declare const kLBASupportedMask: number;

declare const kDMASupportedMask: number;

declare const kDMABit: number;

declare const kNonMagneticDriveMask: number;

declare const kRemoveableMediaBit: number;

declare const kFixedDeviceBit: number;

declare const kATAIdentifyIntegrity: number;

declare const kATAIdentifyLogicalSectorAlignment: number;

declare const kATAIdentifyWordsPerLogicalSector2: number;

declare const kATAIdentifyCommandsDefault: number;

declare const kATAIdentifyCommandsEnabled: number;

declare const kATAIdentifyCommandExtension2: number;

declare const kATAIdentifyCommandSetSupported2: number;

declare const kATAIdentifyCommandSetSupported: number;

declare const kATAIdentifyQueueDepth: number;

declare const kATAIdentifyMinPIOTimeWithIORDY: number;

declare const kATAIdentifyRecommendedMultiWordDMATime: number;

declare const kATAIdentifyMinMultiWordDMATime: number;

declare const kATAIdentifyAdvancedPIOModes: number;

declare const kATAIdentifyMultiWordDMA: number;

declare const kATAIdentifySingleWordDMA: number;

declare const kATAIdentifyCurrentCapacity: number;

declare const kATAIdentifyPIOTiming: number;

declare const kIOStorageUnmapOptionReserved: number;

declare const kIOStorageUnmapOptionNone: number;

declare const kCDTrackInfoAddressTypeLBA: number;

declare const kCDTOCFormatATIP: number;

declare const kCDTOCFormatPMA: number;

declare const kCDMediaTypeMax: number;

declare const kCDMediaTypeROM: number;

declare const kCDMediaTypeUnknown: number;

declare const kIOMediaAttributeReservedMask: number;

declare const kBDMediaTypeMax: number;

declare const kBDMediaTypeMin: number;

declare const kBDMediaTypeR: number;

declare const kBDMediaTypeROM: number;

declare const kDVDRZoneInfoAddressTypeLBA: number;

declare const kDVDStructureFormatManufacturingInfo: number;

declare const kDVDStructureFormatDiscKeyInfo: number;

declare const kDVDStructureFormatPhysicalFormatInfo: number;

declare const kDVDKeyFormatAGID_Invalidate: number;

declare const kDVDKeyFormatTitleKey: number;

declare const kDVDKeyFormatKey1: number;

declare const kDVDKeyFormatChallengeKey: number;

declare const kDVDKeyFormatAGID_CSS: number;

declare const kDVDKeyClassRSSA: number;

declare const kDVDBookTypePlusRW: number;

declare const kDVDBookTypeHDRW: number;

declare const kDVDBookTypeRAM: number;

declare const kDVDBookTypeROM: number;

declare const kDVDRegionalPlaybackControlSchemePhase2: number;

declare const kDVDRegionalPlaybackControlSchemePhase1: number;

declare const kDVDCPRMRegion6: number;

declare const kDVDCPRMRegion5: number;

declare const kDVDCPRMRegion3: number;

declare const kDVDMediaTypeMax: number;

declare const kDVDMediaTypeHDRW: number;

declare const kDVDMediaTypePlusRW: number;

declare const kDVDMediaTypeRW: number;

declare const kDVDMediaTypeR: number;

declare const kDVDMediaTypeROM: number;

declare const kMMCDeviceTrayOpen: number;

declare const kREPORT_LUNS_ADDRESS_METHOD_OFFSET: number;

declare const kREPORT_LUNS_ADDRESS_METHOD_LOGICAL_UNIT: number;

declare const kREPORT_LUNS_ADDRESS_METHOD_FLAT_SPACE: number;

declare const kSCSICDBSize_12Byte: number;

declare const kSCSICDBSize_10Byte: number;

declare const kSCSICDBSize_6Byte: number;

declare const kREAD_CAPACITY_RTO_Disabled: number;

declare const kREPORT_CAPACITY_DataSize: number;

declare const kRBCCmd_WRITE_BUFFER: number;

declare const kRBCCmd_WRITE_10: number;

declare const kRBCCmd_VERIFY_10: number;

declare const kRBCCmd_START_STOP_UNIT: number;

declare const kRBCCmd_FORMAT_UNIT: number;

declare const kSESCmd_RESERVE_10: number;

declare const kSESCmd_PERSISTENT_RESERVE_IN: number;

declare const kSESCmd_MODE_SENSE_6: number;

declare const kSESCmd_MODE_SELECT_6: number;

declare const kSCCCmd_SEND_DIAGNOSTICS: number;

declare const kSCCCmd_RESERVE_6: number;

declare const kSCCCmd_RELEASE_10: number;

declare const kSCCCmd_RELEASE_6: number;

declare const kSCCCmd_REDUNDANCY_GROUP_OUT: number;

declare const kSCCCmd_REDUNDANCY_GROUP_IN: number;

declare const kSCCCmd_PERSISTENT_RESERVE_IN: number;

declare const kSCCCmd_MODE_SELECT_6: number;

declare const kSCCCmd_MAINTENANCE_IN: number;

declare const kSMCCmd_RESERVE_ELEMENT_10: number;

declare const kSMCCmd_RELEASE_ELEMENT_6: number;

declare const kSMCCmd_POSITION_TO_ELEMENT: number;

declare const kSMCCmd_MODE_SELECT_6: number;

declare const kSMCCmd_INITIALIZE_ELEMENT_STATUS: number;

declare const kSGCCmd_TEST_UNIT_READY: number;

declare const kSGCCmd_SET_WINDOW: number;

declare const kSGCCmd_REQUEST_SENSE: number;

declare const kSGCCmd_RECEIVE_DIAGNOSTICS_RESULTS: number;

declare const kSGCCmd_OBJECT_POSITION: number;

declare const kSGCCmd_MODE_SENSE_6: number;

declare const kSGCCmd_LOG_SELECT: number;

declare const kSGCCmd_GET_WINDOW: number;

declare const kSGCCmd_GET_DATA_BUFFER_STATUS: number;

declare const kSGCCmd_CHANGE_DEFINITION: number;

declare const kMMCCmd_WRITE_BUFFER: number;

declare const kMMCCmd_WRITE_AND_VERIFY_10: number;

declare const kMMCCmd_WRITE_12: number;

declare const kMMCCmd_WRITE_10: number;

declare const kMMCCmd_TEST_UNIT_READY: number;

declare const kMMCCmd_SYNCHRONIZE_CACHE: number;

declare const kMMCCmd_START_STOP_UNIT: number;

declare const kMMCCmd_SET_STREAMING: number;

declare const kMMCCmd_SET_READ_AHEAD: number;

declare const kMMCCmd_SET_LIMITS_12: number;

declare const kMMCCmd_SET_LIMITS_10: number;

declare const kMMCCmd_SET_CD_SPEED: number;

declare const kMMCCmd_SEND_KEY: number;

declare const kMMCCmd_SEND_DVD_STRUCTURE: number;

declare const kMMCCmd_SEEK_10: number;

declare const kMMCCmd_SEARCH_DATA_LOW_10: number;

declare const kMMCCmd_SEARCH_DATA_HIGH_12: number;

declare const kMMCCmd_SEARCH_DATA_EQUAL_10: number;

declare const kMMCCmd_RESERVE_TRACK: number;

declare const kMMCCmd_REQUEST_SENSE: number;

declare const kMMCCmd_REPORT_KEY: number;

declare const kMMCCmd_READ_LONG: number;

declare const kMMCCmd_READ_CD_MSF: number;

declare const kMMCCmd_READ_BUFFER: number;

declare const kMMCCmd_READ_12: number;

declare const kMMCCmd_READ_10: number;

declare const kMMCCmd_PREVENT_ALLOW_MEDIUM_REMOVAL: number;

declare const kMMCCmd_PREFETCH: number;

declare const kMMCCmd_PLAY_AUDIO_12: number;

declare const kMMCCmd_MODE_SENSE_10: number;

declare const kMMCCmd_MODE_SENSE_6: number;

declare const kMMCCmd_LOG_SELECT: number;

declare const kMMCCmd_LOAD_UNLOAD_MEDIUM: number;

declare const kMMCCmd_INQUIRY: number;

declare const kMMCCmd_GET_EVENT_STATUS_NOTIFICATION: number;

declare const kMMCCmd_GET_CONFIGURATION: number;

declare const kMMCCmd_ERASE: number;

declare const kMMCCmd_CHANGE_DEFINITION: number;

declare const kMMCCmd_BLANK: number;

declare const kSBCWOCmd_WRITE_LONG: number;

declare const kSBCWOCmd_WRITE_BUFFER: number;

declare const kSBCWOCmd_WRITE_AND_VERIFY_12: number;

declare const kSBCWOCmd_WRITE_10: number;

declare const kSBCWOCmd_SYNCHRONIZE_CACHE: number;

declare const kSBCWOCmd_START_STOP_UNIT: number;

declare const kSBCWOCmd_SET_LIMITS_12: number;

declare const kUSBChipSmartCardInterfaceClass: number;

declare const kSBCWOCmd_SEEK_6: number;

declare const kSBCWOCmd_SEARCH_DATA_HIGH_12: number;

declare const kSBCWOCmd_SEARCH_DATA_HIGH_10: number;

declare const kSBCWOCmd_SEARCH_DATA_EQUAL_10: number;

declare const kSBCWOCmd_REZERO_UNIT: number;

declare const kSBCWOCmd_REQUEST_SENSE: number;

declare const kSBCWOCmd_RELEASE_10: number;

declare const kSBCWOCmd_RELEASE_6: number;

declare const kSBCWOCmd_RECEIVE_DIAGNOSTICS_RESULTS: number;

declare const kSBCWOCmd_READ_LONG: number;

declare const kSBCWOCmd_READ_6: number;

declare const kIOUSBSuperSpeedDeviceCapabilityU2DevExitLatMax: number;

declare const kSBCWOCmd_PREVENT_ALLOW_MEDIUM_REMOVAL: number;

declare const kSBCWOCmd_PREFETCH: number;

declare const kSBCWOCmd_MODE_SENSE_6: number;

declare const kSBCWOCmd_MODE_SELECT_6: number;

declare const kSBCWOCmd_MEDIUM_SCAN: number;

declare const kSBCWOCmd_LOG_SENSE: number;

declare const kSBCWOCmd_LOG_SELECT: number;

declare const kSBCWOCmd_INQUIRY: number;

declare const kSBCWOCmd_COMPARE: number;

declare const kSPCProcCmd_WRITE_BUFFER: number;

declare const kSPCProcCmd_RELEASE_6: number;

declare const kSPCProcCmd_RELEASE_10: number;

declare const kSPCProcCmd_RECEIVE_DIAGNOSTICS_RESULTS: number;

declare const kSPCProcCmd_RECEIVE: number;

declare const kSPCProcCmd_PERSISTENT_RESERVE_OUT: number;

declare const kSPCProcCmd_EXTENDED_COPY: number;

declare const kSPCProcCmd_COPY_AND_VERIFY: number;

declare const kSSCPrinterCmd_WRITE_BUFFER: number;

declare const kSSCPrinterCmd_SYNCHRONIZE_BUFFER: number;

declare const kSSCPrinterCmd_SEND_DIAGNOSTICS: number;

declare const kSSCPrinterCmd_RESERVE_10: number;

declare const kSSCPrinterCmd_RESERVE_6: number;

declare const kSSCPrinterCmd_REQUEST_SENSE: number;

declare const kSSCPrinterCmd_RELEASE_6: number;

declare const kSSCPrinterCmd_PERSISTENT_RESERVE_OUT: number;

declare const kSSCPrinterCmd_PERSISTENT_RESERVE_IN: number;

declare const kSSCPrinterCmd_INQUIRY: number;

declare const kSSCPrinterCmd_FORMAT: number;

declare const kSSCPrinterCmd_COPY: number;

declare const kATAIdentifyMultipleSectorCount: number;

declare const kSSCPrinterCmd_CHANGE_DEFINITION: number;

declare const kSSCSeqCmd_TEST_UNIT_READY: number;

declare const kSSCSeqCmd_RESERVE_10: number;

declare const kSSCSeqCmd_RESERVE_6: number;

declare const kSSCSeqCmd_REPORT_DENSITY_SUPPORT: number;

declare const kSSCSeqCmd_RELEASE_10: number;

declare const kSSCSeqCmd_RELEASE_6: number;

declare const kSSCSeqCmd_RECOVER_BUFFERED_DATA: number;

declare const kSSCSeqCmd_READ_REVERSE: number;

declare const kSSCSeqCmd_READ_6: number;

declare const kSSCSeqCmd_PREVENT_ALLOW_MEDIUM_REMOVAL: number;

declare const kSSCSeqCmd_PERSISTENT_RESERVE_OUT: number;

declare const kSSCSeqCmd_MODE_SENSE_10: number;

declare const kSSCSeqCmd_MODE_SENSE_6: number;

declare const kSSCSeqCmd_MODE_SELECT_10: number;

declare const kSSCSeqCmd_LOG_SENSE: number;

declare const kSSCSeqCmd_FORMAT_MEDIUM: number;

declare const kSSCSeqCmd_ERASE: number;

declare const kSSCSeqCmd_COPY_AND_VERIFY: number;

declare const kSSCSeqCmd_COPY: number;

declare const kSBCCmd_XDREAD: number;

declare const kSBCCmd_WRITE_SAME: number;

declare const kSBCCmd_WRITE_AND_VERIFY_10: number;

declare const kSBCCmd_WRITE_10: number;

declare const kSBCCmd_START_STOP_UNIT: number;

declare const kSBCCmd_SET_LIMITS_12: number;

declare const kSBCCmd_SET_LIMITS_10: number;

declare const kSBCCmd_SEEK_10: number;

declare const kSBCCmd_SEARCH_DATA_HIGH_10: number;

declare const kSBCCmd_SEARCH_DATA_EQUAL_10: number;

declare const kSBCCmd_RESERVE_6: number;

declare const kSBCCmd_RELEASE_10: number;

declare const kSBCCmd_RELEASE_6: number;

declare const kSBCCmd_REGENERATE: number;

declare const kSBCCmd_RECEIVE_DIAGNOSTICS_RESULTS: number;

declare const kSBCCmd_REBUILD: number;

declare const kSBCCmd_REASSIGN_BLOCKS: number;

declare const kSBCCmd_READ_GENERATION: number;

declare const kSBCCmd_READ_DEFECT_DATA_12: number;

declare const kSBCCmd_READ_DEFECT_DATA_10: number;

declare const kSBCCmd_READ_BUFFER: number;

declare const kSBCCmd_READ_12: number;

declare const kSBCCmd_PREVENT_ALLOW_MEDIUM_REMOVAL: number;

declare const kSBCCmd_MODE_SENSE_6: number;

declare const kSBCCmd_MODE_SELECT_10: number;

declare const kSBCCmd_INQUIRY: number;

declare const kSBCCmd_COPY: number;

declare const kSBCCmd_COMPARE: number;

declare const kSBCCmd_CHANGE_DEFINITION: number;

declare const kSPCCmd_WRITE_BUFFER: number;

declare const kSPCCmd_RESERVE_6: number;

declare const kSPCCmd_RESERVE_10: number;

declare const kSPCCmd_RELEASE_6: number;

declare const kSPCCmd_RELEASE_10: number;

declare const kSPCCmd_RECEIVE_DIAGNOSTICS_RESULTS: number;

declare const kSPCCmd_READ_BUFFER: number;

declare const kSPCCmd_PERSISTENT_RESERVE_IN: number;

declare const kSPCCmd_MOVE_MEDIUM_ATTACHED: number;

declare const kSPCCmd_MODE_SENSE_6: number;

declare const kSPCCmd_MODE_SELECT_6: number;

declare const kSPCCmd_LOG_SENSE: number;

declare const kSPCCmd_COMPARE: number;

declare const kSPCCmd_CHANGE_DEFINITION: number;

declare const kSCSIServiceAction_WRITE_LONG_16: number;

declare const kSCSIServiceAction_READ_CAPACITY_16: number;

declare const kSCSIServiceAction_SET_DEVICE_IDENTIFIER: number;

declare const kSCSIServiceAction_CHANGE_ALIASES: number;

declare const kSCSIServiceAction_REPORT_TARGET_PORT_GROUPS: number;

declare const kSCSIServiceAction_REPORT_SUPPORTED_OPERATION_CODES: number;

declare const kSCSIServiceAction_REPORT_DEVICE_IDENTIFIER: number;

declare const kSCSIServiceAction_REPORT_ALIASES: number;

declare const kSCSIServiceAction_XPWRITE_32: number;

declare const kSCSIServiceAction_WRITE_SAME_32: number;

declare const kSCSIServiceAction_WRITE_32: number;

declare const kSCSIServiceAction_VERIFY_32: number;

declare const kSCSIServiceAction_READ_32: number;

declare const kSCSICmdVariableLengthCDB: number;

declare const kSCSICmd_XDWRITEREAD_10: number;

declare const kSCSICmd_XDWRITE_EXTENDED: number;

declare const kSCSICmd_XDREAD: number;

declare const kSCSICmd_WRITE_SAME: number;

declare const kSCSICmd_WRITE_LONG: number;

declare const kUSBRel11: number;

declare const kSCSICmd_WRITE_AND_VERIFY_16: number;

declare const kSCSICmd_WRITE_AND_VERIFY_12: number;

declare const kSCSICmd_WRITE_12: number;

declare const kSCSICmd_WRITE_10: number;

declare const kSCSICmd_VOLUME_SET_OUT: number;

declare const kSCSICmd_VERIFY_12: number;

declare const kSCSICmd_UNMAP: number;

declare const kSCSICmd_UPDATE_BLOCK: number;

declare const kSCSICmd_TEST_UNIT_READY: number;

declare const kUSBMassStorageRBCSubClass: number;

declare const kSCSICmd_SYNCHRONIZE_CACHE_16: number;

declare const kSCSICmd_SYNCHRONIZE_CACHE: number;

declare const kSCSICmd_START_STOP_UNIT: number;

declare const kSCSICmd_SPARE_OUT: number;

declare const kUSBStreamIDMask: number;

declare const kSCSICmd_SPARE_IN: number;

declare const kSCSICmd_SET_STREAMING: number;

declare const kSCSICmd_SET_LIMITS_12: number;

declare const kSCSICmd_SET_DEVICE_IDENTIFIER: number;

declare const kSCSICmd_SET_CD_SPEED: number;

declare const kSCSICmd_SERVICE_ACTION_OUT: number;

declare const kSCSICmd_SEND_OPC_INFORMATION: number;

declare const kSCSICmd_SEND_EVENT: number;

declare const kSCSICmd_SEND_DIAGNOSTICS: number;

declare const kSCSICmd_SEEK_10: number;

declare const kSCSICmd_SEEK_6: number;

declare const kSCSICmd_SEARCH_DATA_HIGH_12: number;

declare const kSCSICmd_SCAN_MMC: number;

declare const kSCSICmd_REZERO_UNIT: number;

declare const kSCSICmd_RESERVE_TRACK: number;

declare const kSCSICmd_RESERVE_10: number;

declare const kSCSICmd_RESERVE_6: number;

declare const kSCSICmd_REPORT_KEY: number;

declare const kSCSICmd_REPORT_DEVICE_IDENTIFIER: number;

declare const kSCSICmd_REPAIR_TRACK: number;

declare const kSCSICmd_RELEASE_10: number;

declare const kSCSICmd_REGENERATE: number;

declare const kSCSICmd_RECEIVE_DIAGNOSTICS_RESULTS: number;

declare const kSCSICmd_RECEIVE: number;

declare const kSCSICmd_REASSIGN_BLOCKS: number;

declare const kSCSICmd_READ_UPDATED_BLOCK_10: number;

declare const kSCSICmd_READ_TRACK_INFORMATION: number;

declare const kSCSICmd_READ_TOC_PMA_ATIP: number;

declare const kSCSICmd_READ_SUB_CHANNEL: number;

declare const kSCSICmd_READ_MASTER_CUE: number;

declare const kSCSICmd_READ_HEADER: number;

declare const kSCSICmd_READ_GENERATION: number;

declare const kSCSICmd_READ_FORMAT_CAPACITIES: number;

declare const kSCSICmd_READ_DISC_STRUCTURE: number;

declare const kSCSICmd_READ_DVD_STRUCTURE: number;

declare const kSCSICmd_READ_DISC_INFORMATION: number;

declare const kSCSICmd_READ_CD: number;

declare const kSCSICmd_READ_BUFFER: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilityMinTxLaneCountPhase: number;

declare const kSCSICmd_READ_ATTRIBUTE: number;

declare const kSCSICmd_READ_10: number;

declare const kSCSICmd_READ_6: number;

declare const kSCSICmd_PLAY_RELATIVE_12: number;

declare const kSCSICmd_PLAY_AUDIO_TRACK_INDEX: number;

declare const kSCSICmd_PLAY_AUDIO_MSF: number;

declare const kSCSICmd_PLAY_AUDIO_12: number;

declare const kSCSICmd_ATA_PASS_THROUGH_EXT: number;

declare const kSCSICmd_ATA_PASS_THROUGH: number;

declare const kSCSICmd_MODE_SENSE_10: number;

declare const kSCSICmd_MEDIUM_SCAN: number;

declare const kSCSICmd_MECHANISM_STATUS: number;

declare const kSCSICmd_MAINTENANCE_OUT: number;

declare const kSCSICmd_LOCK_UNLOCK_CACHE_16: number;

declare const kSCSICmd_GET_CONFIGURATION: number;

declare const kSCSICmd_FORMAT_UNIT: number;

declare const kSCSICmd_EXTENDED_COPY: number;

declare const kSCSICmd_COPY_AND_VERIFY: number;

declare const kSCSICmd_COPY: number;

declare const kSCSICmd_CHANGE_DEFINITION: number;

declare const kSCSICmd_ACCESS_CONTROL_IN: number;

declare const kSBCModePageCaching_FSW_Mask: number;

declare const kSBCModePageCaching_LBCSS_Mask: number;

declare const kSBCModePageCaching_VS2_Mask: number;

declare const kSBCModePageCaching_LBCSS_Bit: number;

declare const kSBCModePageCaching_DRA_Bit: number;

declare const kSBCModePageCaching_VS2_Bit: number;

declare const kSBCModePageCaching_VS1_Bit: number;

declare const kSBCModePageCaching_DEMAND_WRITE_Mask: number;

declare const kSBCModePageCaching_ABPF_Mask: number;

declare const kSBCModePageCaching_CAP_Mask: number;

declare const kSBCModePageCaching_DISC_Mask: number;

declare const kSBCModePageCaching_SIZE_Mask: number;

declare const kSBCModePageCaching_WCE_Mask: number;

declare const kSBCModePageCaching_RCD_Mask: number;

declare const kSBCModePageCaching_IC_Bit: number;

declare const kSBCModePageCaching_WCE_Bit: number;

declare const kSBCModePageCaching_RCD_Bit: number;

declare const kSBCModePageFlexibleDisk_PIN_4_Mask: number;

declare const kSBCModePageFlexibleDisk_PIN_1_Mask: number;

declare const kSBCModePageFlexibleDisk_PIN_34_Mask: number;

declare const kSBCModePageFlexibleDisk_PIN_2_Mask: number;

declare const kSBCModePageFlexibleDisk_TRDY_Mask: number;

declare const kSBCModePageFlexibleDisk_SSN_Bit: number;

declare const kSBCModePageCachingCode: number;

declare const kSBCModePageRigidDiskGeometryCode: number;

declare const kSPCModePageAllPagesCode: number;

declare const kModePageFormat_PS_Mask: number;

declare const kModePageFormat_PAGE_CODE_Mask: number;

declare const kModePageFormat_PS_Bit: number;

declare const kModeSenseSBCDeviceSpecific_WriteProtectMask: number;

declare const kModeSenseSBCDeviceSpecific_DPOFUAMask: number;

declare const kModeSenseSBCDeviceSpecific_WriteProtectBit: number;

declare const kModeSenseSBCDeviceSpecific_DPOFUABit: number;

declare const kINQUIRY_PageC0_Features_HasSEP_LUN: number;

declare const kSCSIProtocolIdentifier_SAS: number;

declare const kSCSIProtocolIdentifier_iSCSI: number;

declare const kSCSIProtocolIdentifier_RDMA: number;

declare const kSCSIProtocolIdentifier_ParallelSCSI: number;

declare const kSCSIProtocolIdentifier_FibreChannel: number;

declare const kUSB_EPDesc_bmAttributes_UsageType_Shift: number;

declare const kINQUIRY_Page83_IdentifierTypeSCSINameString: number;

declare const kINQUIRY_Page83_IdentifierTypeMD5LogicalUnitIdentifier: number;

declare const kINQUIRY_Page83_IdentifierTypeTargetPortGroup: number;

declare const kINQUIRY_Page83_IdentifierTypeNAAIdentifier: number;

declare const kINQUIRY_Page83_IdentifierTypeVendorSpecific: number;

declare const kINQUIRY_Page83_AssociationDevice: number;

declare const kINQUIRY_Page83_CodeSetMask: number;

declare const kINQUIRY_Page83_CodeSetBinaryData: number;

declare const kINQUIRY_PageC1_PageCode: number;

declare const kINQUIRY_PageB2_PageCode: number;

declare const kINQUIRY_PageB0_PageCode: number;

declare const kINQUIRY_Page89_PageCode: number;

declare const kINQUIRY_VERSION_DESCRIPTOR_NVME: number;

declare const kINQUIRY_Byte56_CLOCKING_Mask: number;

declare const kSBCModePageCaching_CAP_Bit: number;

declare const kINQUIRY_Byte56_QAS_Mask: number;

declare const kINQUIRY_Byte56_IUS_Mask: number;

declare const kINQUIRY_Byte56_QAS_Bit: number;

declare const kINQUIRY_Byte56_Offset: number;

declare const kINQUIRY_Byte7_RELADR_Mask: number;

declare const kINQUIRY_Byte7_TRANDIS_Mask: number;

declare const kINQUIRY_Byte7_LINKED_Bit: number;

declare const kINQUIRY_Byte7_TRANDIS_Bit: number;

declare const kINQUIRY_Byte6_ADDR16_Mask: number;

declare const kINQUIRY_Byte6_BQUE_Bit: number;

declare const kINQUIRY_Byte6_ADDR16_Bit: number;

declare const kINQUIRY_Byte5_PROTECT_Mask: number;

declare const kINQUIRY_Byte5_3PC_Mask: number;

declare const kINQUIRY_Byte5_ImplicitTPGS_Mask: number;

declare const kINQUIRY_Byte5_ExplicitTPGS_Mask: number;

declare const kINQUIRY_Byte5_SCCS_Mask: number;

declare const kINQUIRY_Byte5_PROTECT_Bit: number;

declare const kINQUIRY_Byte5_3PC_Bit: number;

declare const kINQUIRY_Byte5_ImplicitTPGS_Bit: number;

declare const kINQUIRY_Byte5_ExplicitTPGS_Bit: number;

declare const kINQUIRY_Byte3_AERC_Mask: number;

declare const kUSBCommDirectLineSubClass: number;

declare const kINQUIRY_Byte3_NORMACA_Bit: number;

declare const kINQUIRY_Byte3_HISUP_Bit: number;

declare const kINQUIRY_ANSI_VERSION_SCSI_SPC_3_Compliant: number;

declare const kINQUIRY_ANSI_VERSION_SCSI_SPC_2_Compliant: number;

declare const kINQUIRY_ANSI_VERSION_SCSI_SPC_Compliant: number;

declare const kINQUIRY_ANSI_VERSION_SCSI_1_Compliant: number;

declare const kINQUIRY_ISO_IEC_VERSION_Mask: number;

declare const kINQUIRY_PERIPHERAL_RMB_MediumRemovable: number;

declare const kINQUIRY_PERIPHERAL_TYPE_AutomationDriveInterface: number;

declare const kINQUIRY_PERIPHERAL_TYPE_CommunicationsSSCDevice: number;

declare const kINQUIRY_PERIPHERAL_TYPE_OpticalMemorySBCDevice: number;

declare const kINQUIRY_PERIPHERAL_TYPE_ScannerSCSI2Device: number;

declare const kINQUIRY_PERIPHERAL_TYPE_WriteOnceSBCDevice: number;

declare const kINQUIRY_PERIPHERAL_TYPE_PrinterSSCDevice: number;

declare const kINQUIRY_PERIPHERAL_QUALIFIER_SupportedButNotConnected: number;

declare const kINQUIRY_PRODUCT_REVISION_LEVEL_Length: number;

declare const kINQUIRY_PRODUCT_IDENTIFICATION_Length: number;

declare const kINQUIRY_VENDOR_IDENTIFICATION_Length: number;

declare const kINQUIRY_StandardDataHeaderSize: number;

declare const kSENSE_KEY_Mask: number;

declare const kSENSE_KEY_MISCOMPARE: number;

declare const kSENSE_KEY_ABORTED_COMMAND: number;

declare const kUSBPhysicalDesc: number;

declare const kSENSE_KEY_COPY_ABORTED: number;

declare const kSENSE_KEY_UNIT_ATTENTION: number;

declare const kSENSE_KEY_MEDIUM_ERROR: number;

declare const kSENSE_KEY_NOT_READY: number;

declare const kSENSE_ILI_Not_Set: number;

declare const kSENSE_ILI_Set: number;

declare const kSENSE_EOM_Set: number;

declare const kSENSE_FILEMARK_Set: number;

declare const kSENSE_RESPONSE_CODE_Deferred_Errors: number;

declare const kSENSE_NOT_DATA_VALID: number;

declare const kSenseDefaultSize: number;

declare const kDiscStatusErasableMask: number;

declare const kDiscStatusComplete: number;

declare const kBDFeaturesWriteBit: number;

declare const kDVDFeaturesHDRAMMask: number;

declare const kDVDFeaturesHDRMask: number;

declare const kDVDFeaturesPlusRMask: number;

declare const kDVDFeaturesBUFWriteMask: number;

declare const kDVDFeaturesTestWriteMask: number;

declare const kDVDFeaturesReadStructuresMask: number;

declare const kDVDFeaturesHDReadBit: number;

declare const kDVDFeaturesPlusRWBit: number;

declare const kDVDFeaturesTestWriteBit: number;

declare const kDVDFeaturesReadStructuresBit: number;

declare const kCDFeaturesSAOWriteMask: number;

declare const kCDFeaturesPacketWriteMask: number;

declare const kCDFeaturesWriteOnceMask: number;

declare const kCDFeaturesAnalogAudioMask: number;

declare const kCDFeaturesBUFWriteBit: number;

declare const kCDFeaturesRawWriteBit: number;

declare const kCDFeaturesSAOWriteBit: number;

declare const kCDFeaturesCDDAStreamAccurateBit: number;

declare const kCDFeaturesReWriteableBit: number;

declare const kCDFeaturesWriteOnceBit: number;

declare const kMessageFoundMedia: number;

declare const kMessageTrayStateChangeRequestRejected: number;

declare const kFWSBP2UnsolicitedStatus: number;

declare const kFWSBP2NormalCommandTimeout: number;

declare const kFWSBP2TargetReset: number;

declare const kFWSBP2AbortTask: number;

declare const kFWSBP2QueryLogins: number;

declare const kFWSBP2CommandFixedSize: number;

declare const kFWSBP2CommandDummyORB: number;

declare const kFWSBP2CommandVendorORB: number;

declare const kFWSBP2CommandNormalORB: number;

declare const kFWSBP2CommandImmediate: number;

declare const kFWSBP2ExclusiveLogin: number;

declare const kIOSystemLoadAdvisoryLevelOK: number;

declare const kIOSystemLoadAdvisoryLevelBad: number;

declare const kIOPMAssertionLevelOff: number;

declare const kIOPMSystemCapabilityAudio: number;

declare const kSSCSeqCmd_REQUEST_SENSE: number;

declare const kIOPMSystemCapabilityGraphics: number;

declare const kIOPMSystemCapabilityWillChange: number;

declare const kIOPMClamshellStateOnWake: number;

declare const kIOPMForceLowSpeed: number;

declare const kIOPMRawLowBattery: number;

declare const kIOPMACnoChargeCapability: number;

declare const kIOPMBatteryDepleted: number;

declare const kIOPMUPSInstalled: number;

declare const kIOPMACInstalled: number;

declare const kIOBatteryChargerConnect: number;

declare const kIOBatteryCharge: number;

declare const kIOBatteryInstalled: number;

declare const kIOPMInternalPower: number;

declare const kPMEthernetWakeOnLANSettings: number;

declare const kPMMinutesToDim: number;

declare const kIOPMThermalLevelTrap: number;

declare const kSCSIDataTransfer_NoDataTransfer: number;

declare const kIOPMThermalLevelCritical: number;

declare const kIOPMThermalLevelNormal: number;

declare const kIOPSAdapterErrorFlagForeignObjectDetected: number;

declare const kIOPSAdapterErrorFlagInsufficientAvailablePower: number;

declare const kIOPSAdapterErrorFlagNoErrors: number;

declare const kIOPSFamilyCodeExternal6: number;

declare const kIOPSFamilyCodeExternal5: number;

declare const kIOPSFamilyCodeExternal3: number;

declare const kIOPSFamilyCodeExternal2: number;

declare const kIOPSFamilyCodeExternal: number;

declare const kIOPSFamilyCodeAC: number;

declare const kIOPSFamilyCodeUSBCBrick: number;

declare const kIOPSFamilyCodeUSBAdapter: number;

declare const kIOPSFamilyCodeFirewire: number;

declare const kIOPSFamilyCodeUnsupported: number;

declare const kIOPSFamilyCodeDisconnected: number;

declare const kIOPMPSLocationRight: number;

declare const IOPMNotYetInitialized: number;

declare const IOPMCannotRaisePower: number;

declare const IOPMNoSuchState: number;

declare const IOPMNoErr: number;

declare const kIOPMNotYetInitialized: number;

declare const kIOPMParameterError: number;

declare const kIOPMNoSuchState: number;

declare const kIOPMPowerButtonUp: number;

declare const kIOPMDWOverTemp: number;

declare const kIOPMOverTemp: number;

declare const kIOPMEnableClamshell: number;

declare const kIOPMPowerEmergency: number;

declare const kIOPMSleepNow: number;

declare const kInflowForciblyEnabledBit: number;

declare const kClamshellSleepBit: number;

declare const kClamshellStateBit: number;

declare const kIOPMDriverAssertionForceFullWakeupBit: number;

declare const kIOPMDriverAssertionNetworkKeepAliveActiveBit: number;

declare const kIOPMDriverAssertionReservedBit7: number;

declare const kIOPMDriverAssertionReservedBit5: number;

declare const kIOPMDriverAssertionExternalMediaMountedBit: number;

declare const kIOPMDriverAssertionPreventSystemIdleSleepBit: number;

declare const kIOPMDriverAssertionCPUBit: number;

declare const kIOPMUnknown: number;

declare const IOPMLowestState: number;

declare const IOPMSoftSleep: number;

declare const IOPMNotPowerManaged: number;

declare const IOPMClockRunning: number;

declare const kIOPMCapabilitiesMask: number;

declare const kIOPMStaticPowerValid: number;

declare const kIOPMConfigRetained: number;

declare const kIOPMNotAttainable: number;

declare const kIOPMMaxPerformance: number;

declare const kIOPMChildClamp2: number;

declare const kIOPMChildClamp: number;

declare const kIOPMPreventSystemSleep: number;

declare const kIOPMClockRunning: number;

declare const kIOPMRestart: number;

declare const kIOPMRestartCapability: number;

declare const kIOPMDeviceUsable: number;

declare const IOPMMaxPowerStates: number;

declare const kIOPMMaxPowerStates: number;

declare const kIONetworkLinkValid: number;

declare const kIOMediumOptionLoopback: number;

declare const kIOMediumOptionFlag0: number;

declare const kIOMediumOptionFlowControl: number;

declare const kIOMediumIEEE80211DS2: number;

declare const kIOMediumIEEE80211FH2: number;

declare const kIOMediumEthernet5000BaseT: number;

declare const kIOMediumEthernet10GBaseT: number;

declare const kIOMediumEthernet10GBaseCX4: number;

declare const kIOMediumEthernetHomePNA1: number;

declare const kIOMediumEthernet1000BaseT: number;

declare const kIOMediumEthernet1000BaseTX: number;

declare const kIOMediumEthernet1000BaseLX: number;

declare const kIOMediumEthernet10BaseFL: number;

declare const kIOMediumEthernet10BaseSTP: number;

declare const kIOMediumEthernet100BaseT2: number;

declare const kIOMediumEthernet10BaseT: number;

declare const kIOMediumEthernetNone: number;

declare const kIOMediumEthernetManual: number;

declare const kIOMediumEthernetAuto: number;

declare const kIONetworkInterfaceDisabledState: number;

declare const kIONetworkInterfaceRegisteredState: number;

declare const kIONetworkStackRegisterInterfaceWithLowestUnit: number;

declare const kIONetworkStackRegisterInterfaceWithUnit: number;

declare const kIONetworkDataBufferTypeExternal: number;

declare const kIONetworkDataAccessTypeReset: number;

declare const kIONetworkDataAccessTypeWrite: number;

declare const kIONetworkFeatureLRO: number;

declare const kIONetworkFeatureSWTimeStamp: number;

declare const kIONetworkFeatureTransmitCompletionStatus: number;

declare const kIONetworkFeatureTSOIPv4: number;

declare const kIONetworkFeatureNoBSDWait: number;

declare const kIOPacketFilterPromiscuousAll: number;

declare const kDVIPowerSwitchActiveMask: number;

declare const kDVIPowerSwitchSupportMask: number;

declare const kMirrorUnclippedMirrorMask: number;

declare const kMirrorAreMirroredMask: number;

declare const kMirrorCanMirrorMask: number;

declare const kMirrorCommonGammaMask: number;

declare const kMirrorSameTimingOnlyMirrorMask: number;

declare const kSetClutAtVBL: number;

declare const kSetClutAtSetEntries: number;

declare const kScaleRotate180Mask: number;

declare const kScaleRotateFlagsMask: number;

declare const kScaleCanRotateMask: number;

declare const kScaleCanScaleInterlacedMask: number;

declare const kScaleCanUpSamplePixelsMask: number;

declare const kRangeSupportsSyncOnGreenBit: number;

declare const kAnalogSignalLevel_0714_0286: number;

declare const kInterlacedCEA861SyncModeBit: number;

declare const kAnalogSetupExpectedBit: number;

declare const kRangeSupportsSignal_0700_0000_Mask: number;

declare const kRangeSupportsSignal_0714_0286_Mask: number;

declare const kVideoBufferSizeErr: number;

declare const kVideoI2CTransactionTypeErr: number;

declare const kVideoI2CTransactionErr: number;

declare const kVideoI2CReplyPendingErr: number;

declare const kTimingChangeRestrictedErr: number;

declare const kDMSModeFree: number;

declare const kSyncDigitalHSyncPositiveMask: number;

declare const kSyncDigitalVSyncPositiveMask: number;

declare const kSyncDigitalSeperateMask: number;

declare const kSyncDigitalCompositeSerrateMask: number;

declare const kSPCCmd_TEST_UNIT_READY: number;

declare const kSyncDigitalCompositeMask: number;

declare const kSyncAnalogBipolarSRGBSyncMask: number;

declare const kSyncAnalogBipolarSerrateMask: number;

declare const kSyncAnalogBipolarMask: number;

declare const kSyncAnalogCompositeRGBSyncMask: number;

declare const kSyncAnalogCompositeSerrateMask: number;

declare const kSyncAnalogCompositeMask: number;

declare const kVideoUsageAddrSubAddrBit: number;

declare const kVideoReplyMicroSecDelayBit: number;

declare const kVideoDisplayPortNativeTypeMask: number;

declare const kVideoNoTransactionType: number;

declare const kVideoBusTypeInvalid: number;

declare const kActivateConnection: number;

declare const kGetConnectionCount: number;

declare const kGammaTableIDSpecific: number;

declare const kGammaTableIDNoMoreTables: number;

declare const kGammaTableIDFindFirst: number;

declare const kDisplayModeIDBootProgrammable: number;

declare const kDisplayModeIDFindFirstProgrammable: number;

declare const kDisplayModeIDFindFirstResolution: number;

declare const kDisplayModeIDInvalid: number;

declare const kDisplayModeIDCurrent: number;

declare const kSixthDepthMode: number;

declare const kFirstDepthMode: number;

declare const kDepthMode4: number;

declare const kDepthMode3: number;

declare const kDepthMode2: number;

declare const kDepthMode1: number;

declare const kESCSevenDDC: number;

declare const kESCSevenPALAlternate: number;

declare const kESCSeven16Inch: number;

declare const kESCSevenVGA: number;

declare const kESCSevenNTSC: number;

declare const kESCSevenPAL: number;

declare const kESCSixStandard: number;

declare const kESCFivePortrait: number;

declare const kESCFourNTSC: number;

declare const kESCThree21InchMono: number;

declare const kESCTwo12Inch: number;

declare const kESCZero21Inch: number;

declare const kRSCSeven: number;

declare const kRSCSix: number;

declare const kRSCFive: number;

declare const kRSCFour: number;

declare const kRSCThree: number;

declare const kLiveVideoPassThruMask: number;

declare const kLiveVideoPassThru: number;

declare const kConvolved: number;

declare const kDPMSSyncSuspend: number;

declare const kDPMSSyncStandby: number;

declare const kVerticalSyncMask: number;

declare const kTriStateSyncBit: number;

declare const kNoSeparateSyncControlBit: number;

declare const kEnableSyncOnRed: number;

declare const kEnableSyncOnGreen: number;

declare const kEnableSyncOnBlue: number;

declare const kDisableCompositeSyncBit: number;

declare const kDisableHorizontalSyncBit: number;

declare const cscGetFeatureList: number;

declare const cscGetMirror: number;

declare const cscGetScalerInfo: number;

declare const cscGetCommunicationInfo: number;

declare const cscGetDetailedTiming: number;

declare const cscGetTimingRanges: number;

declare const cscGetClutBehavior: number;

declare const cscGetPowerState: number;

declare const cscGetConvolution: number;

declare const cscGetHardwareCursorDrawState: number;

declare const cscSupportsHardwareCursor: number;

declare const cscRetrieveGammaTable: number;

declare const cscGetGammaInfoList: number;

declare const cscGetNextResolution: number;

declare const cscGetConnection: number;

declare const cscGetDefaultMode: number;

declare const cscGetBaseAddr: number;

declare const kUSBNotEnoughPowerNoACNotificationType: number;

declare const cscGetMode: number;

declare const cscUnusedCall: number;

declare const cscSetFeatureConfiguration: number;

declare const cscSetClutBehavior: number;

declare const cscSetMultiConnect: number;

declare const cscPrivateControlCall: number;

declare const cscSetConvolution: number;

declare const cscSetGray: number;

declare const cscGrayScreen: number;

declare const cscSetGamma: number;

declare const cscSetEntries: number;

declare const cscSetMode: number;

declare const kSPCProcCmd_REPORT_LUNS: number;

declare const kPowerStateSupportsReducedPower3BitMask: number;

declare const kPowerStateSupportsReducedPower2BitMask: number;

declare const kPowerStateSupportsReducedPower1BitMask: number;

declare const kSBCWOCmd_VERIFY_10: number;

declare const kPowerStateSupportsReducedPower1Bit: number;

declare const kPowerStateSleepWaketoDozeMask: number;

declare const kPowerStateSleepNoDPMSMask: number;

declare const kPowerStateSleepForbiddenMask: number;

declare const kPowerStateNeedsRefreshMask: number;

declare const kDVDMediaTypeUnknown: number;

declare const kPowerStateSleepWaketoDozeBit: number;

declare const kPowerStateSleepForbiddenBit: number;

declare const kSBCWOCmd_READ_BUFFER: number;

declare const kPowerStateSleepAwareBit: number;

declare const kPowerStateReducedPower2: number;

declare const kPowerStateReducedPowerMask: number;

declare const kHardwarePark: number;

declare const kHardwareWakeFromSuspend: number;

declare const kHardwareWake: number;

declare const kHardwareSleep: number;

declare const kAVPowerStandby: number;

declare const kAVPowerOff: number;

declare const kResolutionHasMultipleDepthSizes: number;

declare const kDepthDependentMask: number;

declare const kDepthDependent: number;

declare const kModeValidateAgainstDisplay: number;

declare const kModeBuiltIn: number;

declare const kModeNotPreset: number;

declare const kModeSimulscan: number;

declare const kModeShowNever: number;

declare const kModeDefault: number;

declare const kModeSafe: number;

declare const kNoConnect: number;

declare const cscReset: number;

declare const kGenericCRT: number;

declare const kColor19Connect: number;

declare const kColor16Connect: number;

declare const kMonoTwoPageConnect: number;

declare const kPanelFSTNConnect: number;

declare const kPALConnect: number;

declare const kVGAConnect: number;

declare const kMultiModeCRT1Connect: number;

declare const kINQUIRY_Byte56_CLOCKING_ST_AND_DT: number;

declare const kFixedModeCRTConnect: number;

declare const kPanelTFTConnect: number;

declare const kPanelConnect: number;

declare const kOverrideConnection: number;

declare const kConnectionInactive: number;

declare const kHasDDCConnection: number;

declare const kReportsDDCConnection: number;

declare const kTaggingInfoNonStandard: number;

declare const kHasDirectConnection: number;

declare const kAllModesSafe: number;

declare const kAllModesValid: number;

declare const timingSony_1900x1200_74hz: number;

declare const timingApple21: number;

declare const timingApple16: number;

declare const timingApple15x: number;

declare const timingApple15: number;

declare const timingApple12x: number;

declare const timingApple12: number;

declare const timingSony_1920x1200_76hz: number;

declare const timingSony_1920x1080_60hz: number;

declare const timingSony_1600x1024_76hz: number;

declare const timingFilmRate_48hz: number;

declare const timingVESA_1856x1392_75hz: number;

declare const timingVESA_1856x1392_60hz: number;

declare const timingVESA_1792x1344_75hz: number;

declare const timingVESA_1792x1344_60hz: number;

declare const timingVESA_1600x1200_70hz: number;

declare const timingVESA_1280x1024_85hz: number;

declare const timingAppleNTSC_FFconv: number;

declare const timingAppleNTSC_STconv: number;

declare const timingAppleNTSC_FF: number;

declare const timingVESA_1024x768_85hz: number;

declare const timingVESA_1024x768_75hz: number;

declare const timingVESA_1024x768_70hz: number;

declare const timingVESA_1024x768_60hz: number;

declare const timingVESA_800x600_85hz: number;

declare const timingVESA_800x600_75hz: number;

declare const timingVESA_800x600_72hz: number;

declare const timingApple_832x624_75hz: number;

declare const timingGTF_640x480_120hz: number;

declare const timingVESA_640x480_85hz: number;

declare const timingVESA_640x480_72hz: number;

declare const timingApple_640x400_67hz: number;

declare const timingApple_FixedRateLCD: number;

declare const timingInvalid: number;

declare const kDDCForceReadBit: number;

declare const kDDCBlockTypeEDID: number;

declare const kDetailedTimingFormat: number;

declare const sixthVidMode: number;

declare const secondVidMode: number;

declare const kSBCCmd_READ_ELEMENT_STATUS_ATTACHED: number;

declare const firstVidMode: number;

declare const sixteenBitMode: number;

declare const eightBitMode: number;

declare const fourBitMode: number;

declare const mVidParams: number;

declare const mVertRefRate: number;

declare const mPixelSize: number;

declare const mPixelType: number;

declare const mHRes: number;

declare const mBounds: number;

declare const kIOI2CBusNumberMask: number;

declare const kIOI2CUseSubAddressCommFlag: number;

declare const kIOI2CDisplayPortNativeTransactionType: number;

declare const kIOI2CNoTransactionType: number;

declare const kIOHIDOpenedByFastPathClient: number;

declare const kIOHIDEventQueueTypeUser: number;

declare const kIOHIDGlobalMemory: number;

declare const kIOHIDParamConnectType: number;

declare const kHIDUsage_FIDO_InputData: number;

declare const kHIDUsage_FIDO_Undefined: number;

declare const kHIDUsage_CC_Autofocus: number;

declare const kHIDUsage_CC_Undefined: number;

declare const kHIDUsage_MSR_Track3Data: number;

declare const kHIDUsage_MSR_TrackData: number;

declare const kHIDUsage_MSR_DeviceReadOnly: number;

declare const kHIDUsage_MSR_Undefined: number;

declare const kHIDUsage_WD_EnforcedZeroReturn: number;

declare const kHIDUsage_WD_ZeroScale: number;

declare const kHIDUsage_WD_ScaleStatusOverWeightLimit: number;

declare const kIOPMPowerOn: number;

declare const kHIDUsage_WD_ScaleStatusUnderZero: number;

declare const kHIDUsage_WD_ScaleStatusWeightStable: number;

declare const kHIDUsage_WD_ScaleStatusStableAtZero: number;

declare const kHIDUsage_WD_ScaleStatusFault: number;

declare const kHIDUsage_WD_RezeroCount: number;

declare const kHIDUsage_WD_WeightUnitOunce: number;

declare const kHIDUsage_WD_WeightUnitAvoirTon: number;

declare const kHIDUsage_WD_WeightUnitMetricTon: number;

declare const kHIDUsage_WD_WeightUnitTaels: number;

declare const kHIDUsage_WD_WeightUnitCarats: number;

declare const kHIDUsage_WD_WeightUnitKilogram: number;

declare const kHIDUsage_WD_WeightUnitGram: number;

declare const kHIDUsage_WD_WeightUnitMilligram: number;

declare const kHIDUsage_WD_ScaleWeightLimitReport: number;

declare const kHIDUsage_WD_ScaleDataReport: number;

declare const kHIDUsage_WD_ScaleAtrributeReport: number;

declare const kHIDUsage_WD_ScaleScaleClassIVEnglish: number;

declare const kHIDUsage_WD_ScaleScaleClassIVMetric: number;

declare const kHIDUsage_WD_ScaleScaleClassIIILMetric: number;

declare const kHIDUsage_WD_ScaleScaleClassIIMetric: number;

declare const kHIDUsage_WD_ScaleScaleClassIMetric: number;

declare const kHIDUsage_WD_WeighingDevice: number;

declare const kHIDUsage_BCS_VeriCode: number;

declare const kHIDUsage_BCS_SuperCode: number;

declare const kHIDUsage_BCS_PosiCode: number;

declare const kHIDUsage_BCS_Code49: number;

declare const kHIDUsage_BCS_Code16: number;

declare const kHIDUsage_BCS_DLMethodCheckInRange: number;

declare const kHIDUsage_BCS_SecondDiscreteLengthToDecode: number;

declare const kHIDUsage_BCS_MaximumLengthToDecode: number;

declare const kHIDUsage_BCS_MinimumLengthToDecode: number;

declare const kHIDUsage_BCS_RawDataPolarity: number;

declare const kHIDUsage_BCS_SymbologyIdentifier3: number;

declare const kHIDUsage_BCS_SymbologyIdentifier1: number;

declare const kHIDUsage_BCS_CheckDigitCodabarEnable: number;

declare const kHIDUsage_BCS_CheckDigitEnableOneMSIPlessey: number;

declare const kHIDUsage_BCS_CheckDigitEnableStandard2of5OPCC: number;

declare const kHIDUsage_BCS_CheckDigitDisable: number;

declare const kHIDUsage_BCS_CheckDigit: number;

declare const kHIDUsage_BCS_UCC_EAN_128: number;

declare const kHIDUsage_BCS_ItalianPharmacyCode: number;

declare const kHIDUsage_BCS_Interleaved2of5: number;

declare const kHIDUsage_BCS_Code93: number;

declare const kHIDUsage_BCS_Codabar: number;

declare const kHIDUsage_BCS_ClearAllEAN2_3LabelDefinitions: number;

declare const kHIDUsage_BCS_EAN13FlagDigit3: number;

declare const kHIDUsage_BCS_EAN8FlagDigit2: number;

declare const kHIDUsage_BCS_EAN8FlagDigit1: number;

declare const kHIDUsage_BCS_EANThreeLabel: number;

declare const kHIDUsage_BCS_CheckEnableEuropean4DigitPrice: number;

declare const kHIDUsage_BCS_CheckEnable5DigitPrice: number;

declare const kHIDUsage_BCS_PeriodicalIgnorePlus5: number;

declare const kHIDUsage_BCS_PeriodicalIgnorePlus2: number;

declare const kHIDUsage_BCS_PeriodicalOnlyDecodeWithPlus2: number;

declare const kHIDUsage_BCS_PeriodicalAutoDiscriminatePlus2: number;

declare const kHIDUsage_BCS_Periodical: number;

declare const kHIDUsage_BCS_UPC_AWithP5Optional: number;

declare const kHIDUsage_BCS_UPC_AWith128Optical: number;

declare const kHIDUsage_BCS_UPC_AWith128Mandatory: number;

declare const kHIDUsage_BCS_UPC_EANPeriodicals: number;

declare const kHIDUsage_BCS_UPC_EANCouponCode: number;

declare const kHIDUsage_BCS_EAN_99_P5_128_Optional: number;

declare const kHIDUsage_BCS_ConvertUPC_EToA: number;

declare const kHIDUsage_BCS_GRWTIBeep_LampAfterTransmit: number;

declare const kHIDUsage_BCS_GoodReadWhenToWrite: number;

declare const kHIDUsage_BCS_SoundNotOnFileBeep: number;

declare const kHIDUsage_BCS_SoundErrorBeep: number;

declare const kHIDUsage_BCS_GoodReadToneVolume: number;

declare const kHIDUsage_BCS_GoodReadToneLength: number;

declare const kHIDUsage_BCS_GoodReadLED: number;

declare const kHIDUsage_BCS_GoodReadLampDuration: number;

declare const kHIDUsage_BCS_AimDuration: number;

declare const kHIDUsage_BCS_ScannerInRange: number;

declare const kHIDUsage_BCS_ScannerInCradle: number;

declare const kHIDUsage_BCS_TriggerModeLaserOnWhilePulled: number;

declare const kHIDUsage_BCS_TriggerModeContinuousLaserOn: number;

declare const kHIDUsage_BCS_TriggerModeBlinkingLaserOn: number;

declare const kHIDUsage_BCS_InitiateBarcodeRead: number;

declare const kHIDUsage_BCS_PowerOnResetScanner: number;

declare const kHIDUsage_BCS_MotorState: number;

declare const kHIDUsage_BCS_LaserState: number;

declare const kHIDUsage_BCS_BeeperState: number;

declare const kHIDUsage_BCS_BarCodePresent: number;

declare const kHIDUsage_BCS_AimingLaserPattern: number;

declare const kHIDUsage_BCS_ActiveTime: number;

declare const kHIDUsage_BCS_PrefixProprietary: number;

declare const kHIDUsage_BCS_PrefixNone: number;

declare const kHIDUsage_BCS_DataPrefix: number;

declare const kHIDUsage_BCS_ScannerReadConfidence: number;

declare const kHIDUsage_BCS_FragmentDecoding: number;

declare const kHIDUsage_BCS_ProximitySensor: number;

declare const kHIDUsage_BCS_WaterResistant: number;

declare const kHIDUsage_BCS_Triggerless: number;

declare const kBDFeaturesReadBit: number;

declare const kHIDUsage_BCS_ProgrammableBeeper: number;

declare const kHIDUsage_BCS_IntrinsicallySafe: number;

declare const kHIDUsage_BCS_FixedBeeper: number;

declare const kHIDUsage_BCS_ErrorIndication: number;

declare const kHIDUsage_BCS_Class2Laser: number;

declare const kHIDUsage_BCS_Class1ALaser: number;

declare const kHIDUsage_BCS_2DControlReport: number;

declare const kHIDUsage_BCS_Code128ControlReport: number;

declare const kHIDUsage_BCS_CodabarControlReport: number;

declare const kHIDUsage_BCS_Standard2of5ControlReport: number;

declare const kHIDUsage_BCS_Code39ControlReport: number;

declare const kHIDUsage_BCS_ScannedDataReport: number;

declare const kHIDUsage_BCS_AttributeReport: number;

declare const kHIDUsage_BCS_CordlessScannerBase: number;

declare const kPowerStateSleepCanPowerOffMask: number;

declare const kHIDUsage_BCS_DumbBarCodeScanner: number;

declare const kHIDUsage_BCS_BarCodeScanner: number;

declare const kHIDUsage_BCS_BadgeReader: number;

declare const kSBCCmd_WRITE_AND_VERIFY_12: number;

declare const kHIDUsage_BCS_Undefined: number;

declare const kHIDUsage_BS_MasterMode: number;

declare const kHIDUsage_BS_VoltageNotRegulated: number;

declare const kHIDUsage_BS_CurrentNotRegulated: number;

declare const kHIDUsage_BS_CurrentOutOfRange: number;

declare const kHIDUsage_BS_VoltageOutOfRange: number;

declare const kHIDUsage_BS_ThermistorOverRange: number;

declare const kHIDUsage_BS_AlarmInhibited: number;

declare const kHIDUsage_BS_EnablePolling: number;

declare const kHIDUsage_BS_iOEMInformation: number;

declare const kHIDUsage_BS_CapacityGranularity2: number;

declare const kHIDUsage_BS_WarningCapacityLimit: number;

declare const kHIDUsage_BS_Rechargable: number;

declare const kHIDUsage_BS_iDevicename: number;

declare const kHIDUsage_BS_ManufacturerDate: number;

declare const kHIDUsage_BS_ManufacturerData: number;

declare const kHIDUsage_BS_SpecificationInfo: number;

declare const kHIDUsage_BS_PrimaryBatterySupport: number;

declare const kHIDUsage_BS_AverageTimeToFull: number;

declare const kHIDUsage_BS_RunTimeToEmpty: number;

declare const kHIDUsage_BS_FullChargeCapacity: number;

declare const kHIDUsage_BS_RemainingCapacity: number;

declare const kHIDUsage_BS_NeedReplacement: number;

declare const kHIDUsage_BS_ConditioningFlag: number;

declare const kHIDUsage_BS_Charging: number;

declare const kHIDUsage_BS_ChargeController: number;

declare const kHIDUsage_BS_PrimaryBattery: number;

declare const kHIDUsage_BS_CapacityMode: number;

declare const kHIDUsage_BS_AtRate: number;

declare const kHIDUsage_BS_RemainingCapacityLimit: number;

declare const kHIDUsage_BS_ManufacturerAccess: number;

declare const kHIDUsage_BS_BatterySupported: number;

declare const kHIDUsage_BS_OKToUse: number;

declare const kHIDUsage_BS_OutputConnection: number;

declare const kHIDUsage_BS_OptionalMfgFunction4: number;

declare const kHIDUsage_BS_OptionalMfgFunction3: number;

declare const kHIDUsage_BS_OptionalMfgFunction2: number;

declare const kHIDUsage_BS_OptionalMfgFunction1: number;

declare const kMMCCmd_SEARCH_DATA_LOW_12: number;

declare const kHIDUsage_BS_SMBSelectorInfo: number;

declare const kHIDUsage_BS_SMBSelectorPresets: number;

declare const kHIDUsage_BS_SMBSelectorState: number;

declare const kHIDUsage_BS_SMBChargerMode: number;

declare const kHIDUsage_BS_SMBAlarmWarning: number;

declare const kHIDUsage_BS_SMBBatteryMode: number;

declare const kHIDUsage_PD_iProduct: number;

declare const kHIDUsage_PD_Tested: number;

declare const kHIDUsage_PD_Buck: number;

declare const kHIDUsage_PD_Used: number;

declare const kHIDUsage_PD_Switchable: number;

declare const kHIDUsage_PD_ShutdownImminent: number;

declare const kHIDUsage_PD_ShutdownRequested: number;

declare const kHIDUsage_PD_FrequencyOutOfRange: number;

declare const kHIDUsage_PD_InternalFailure: number;

declare const kHIDUsage_PD_Good: number;

declare const kHIDUsage_PD_Present: number;

declare const kHIDUsage_PD_ModuleReset: number;

declare const kHIDUsage_PD_Test: number;

declare const kHIDUsage_PD_DelayBeforeStartup: number;

declare const kHIDUsage_PD_ToggleControl: number;

declare const kHIDUsage_PD_SwitchOffControl: number;

declare const kHIDUsage_PD_ConfigHumidity: number;

declare const kHIDUsage_PD_ConfigPercentLoad: number;

declare const kATAPhysicalLogicalEnabledValue: number;

declare const kHIDUsage_PD_ConfigApparentPower: number;

declare const kHIDUsage_PD_ConfigFrequency: number;

declare const kHIDUsage_PD_ApparentPower: number;

declare const kHIDUsage_PD_Current: number;

declare const kHIDUsage_PD_GangID: number;

declare const kHIDUsage_PD_Gang: number;

declare const kHIDUsage_PD_OutletID: number;

declare const kHIDUsage_PD_FlowID: number;

declare const kHIDUsage_PD_OutputID: number;

declare const kHIDUsage_PD_OutletSystem: number;

declare const kHIDUsage_PD_BatteryID: number;

declare const kHIDUsage_PD_Battery: number;

declare const kHIDUsage_PD_BatterySystemID: number;

declare const kHIDUsage_PD_PeripheralDevice: number;

declare const kHIDUsage_PD_UPS: number;

declare const kMMCCmd_CLOSE_TRACK_SESSION: number;

declare const kHIDUsage_PD_PresentStatus: number;

declare const kHIDUsage_PD_Undefined: number;

declare const kHIDUsage_BD_BrailleRockerUp: number;

declare const OSDictionary: number;

declare const kHIDUsage_BD_BrailleDPadRight: number;

declare const kHIDUsage_BD_BrailleDPadLeft: number;

declare const kHIDUsage_BD_BrailleDPadDown: number;

declare const kHIDUsage_BD_BrailleJoystickDown: number;

declare const kHIDUsage_BD_BrailleKeyboardLeftSpace: number;

declare const kHIDUsage_BD_BrailleKeyboardDot6: number;

declare const kHIDUsage_BD_BrailleKeyboardDot5: number;

declare const kHIDUsage_BD_BrailleKeyboardDot4: number;

declare const kHIDUsage_BD_BrailleKeyboardDot2: number;

declare const kHIDUsage_BD_BrailleKeyboardDot1: number;

declare const kHIDUsage_BD_RowRouterKey: number;

declare const kHIDUsage_BD_RouterSet2: number;

declare const kHIDUsage_BD_ScreenReaderControl: number;

declare const kHIDUsage_CC_Shutter: number;

declare const kHIDUsage_BD_NumberOfBrailleCells: number;

declare const kHIDUsage_BD_8DotBrailleCell: number;

declare const kHIDUsage_BD_BrailleDisplay: number;

declare const kHIDUsage_Snsr_Data_Custom_Value6: number;

declare const kHIDUsage_Snsr_Data_Custom_Value4: number;

declare const kHIDUsage_Snsr_Data_Custom_Value2: number;

declare const kHIDUsage_Snsr_Data_Custom_Value1: number;

declare const kHIDUsage_Snsr_Data_Custom_Usage: number;

declare const kHIDUsage_Snsr_Property_Time_TimeTrimAdjustment: number;

declare const kHIDUsage_Snsr_Property_Time_TimeZoneOffsetFromUTC: number;

declare const kHIDUsage_Snsr_Property_Time: number;

declare const kHIDUsage_Snsr_Data_Time_JulianDayOfYear: number;

declare const kHIDUsage_Snsr_Data_Time_Millisecond: number;

declare const kHIDUsage_Snsr_Data_Time_Minute: number;

declare const kIOPMSystemCapabilityCPU: number;

declare const kHIDUsage_Snsr_Data_Time_Hour: number;

declare const kHIDUsage_Snsr_Data_Time_DayOfWeekSaturday: number;

declare const kHIDUsage_Snsr_Data_Time_DayOfWeekFriday: number;

declare const kHIDUsage_Snsr_Data_Time_DayOfWeekThursday: number;

declare const kHIDUsage_Snsr_Data_Time_DayOfWeekWednesday: number;

declare const kHIDUsage_Snsr_Data_Time_DayOfWeekMonday: number;

declare const kHIDUsage_Snsr_Data_Time_DayOfWeekSunday: number;

declare const kHIDUsage_Snsr_Data_Time_DayOfWeek: number;

declare const kHIDUsage_Snsr_Data_Time_Day: number;

declare const kHIDUsage_Snsr_Data_Electrical_PercentOfRange: number;

declare const kHIDUsage_Snsr_Data_Electrical_Period: number;

declare const kHIDUsage_Snsr_Data_Electrical_Inductance: number;

declare const kHIDUsage_Snsr_Data_Electrical: number;

declare const kHIDUsage_Snsr_Property_Scanner: number;

declare const kHIDUsage_Snsr_Data_Scanner_RFIDTag40Bit: number;

declare const kHIDUsage_Snsr_Property_Light_ConsumerIRSentenceSend: number;

declare const kHIDUsage_Snsr_Data_Light_ColorTemperature: number;

declare const kHIDUsage_Snsr_Data_Light_Illuminance: number;

declare const kHIDUsage_Snsr_Data_Biometric_HumanPresence: number;

declare const kHIDUsage_Snsr_Data_Mechanical_Weight: number;

declare const kHIDUsage_Snsr_Data_Mechanical_GaugePressure: number;

declare const kHIDUsage_Snsr_Data_Mechanical_BooleanSwitchState: number;

declare const kHIDUsage_Snsr_Data_Orientation_MagneticFluxZAxis: number;

declare const kHIDUsage_Snsr_Data_Orientation_MagneticFluxXAxis: number;

declare const kHIDUsage_Snsr_Data_Orientation_RotationMatrix: number;

declare const kHIDUsage_Snsr_Data_Orientation_TiltZAxis: number;

declare const kHIDUsage_Snsr_Data_Orientation_TiltYAxis: number;

declare const kHIDUsage_Snsr_Data_Orientation_TiltXAxis: number;

declare const kHIDUsage_Snsr_Data_Orientation_DistanceOutOfRange: number;

declare const kHIDUsage_Snsr_Data_Orientation_Distance: number;

declare const kHIDUsage_BCS_MSI_Plessey: number;

declare const kHIDUsage_Snsr_Data_Orientation_HeadingMagneticNorth: number;

declare const kHIDUsage_Snsr_Data_Orientation_HeadingCompensatedMagneticNorth: number;

declare const kHIDUsage_Snsr_Data_Orientation_HeadingZAxis: number;

declare const kHIDUsage_Snsr_Data_Orientation: number;

declare const kHIDUsage_Snsr_Data_Motion_Intensity: number;

declare const kHIDUsage_Snsr_Data_Motion_AngularVelocityZAxis: number;

declare const kHIDUsage_Snsr_Data_Motion_Acceleration: number;

declare const kHIDUsage_Snsr_Property_Environmental: number;

declare const kHIDUsage_Snsr_Data_Environmental_WindSpeed: number;

declare const kHIDUsage_Snsr_Data_Environmental_WindDirection: number;

declare const kMMCCmd_PLAY_AUDIO_10: number;

declare const kHIDUsage_Snsr_Data_Environmental_RelativeHumidity: number;

declare const kHIDUsage_Snsr_Property_Location_AccuracyLow: number;

declare const kHIDUsage_Snsr_Property_Location_AccuracyHigh: number;

declare const kHIDUsage_Snsr_Property_Location_AccuracyDefault: number;

declare const kHIDUsage_Snsr_Data_Location_StateOrProvince: number;

declare const kHIDUsage_Snsr_Data_Location_NMEASentence: number;

declare const kHIDUsage_Snsr_Data_Location_SatellitesUsedPRNs: number;

declare const kHIDUsage_Snsr_Data_Location_SatellitesInViewSNRatios: number;

declare const kHIDUsage_Snsr_Data_Location_SatellitesInViewPRNs: number;

declare const kHIDUsage_Snsr_Data_Location_SatellitesInViewIDs: number;

declare const kHIDUsage_Snsr_Data_Location_SatellitesInViewAzimuth: number;

declare const kHIDUsage_Snsr_Data_Location_MagneticHeading: number;

declare const kHIDUsage_Snsr_Data_Location_Longitude: number;

declare const kHIDUsage_Snsr_Data_Location_PositionDilutionOfPrecision: number;

declare const kHIDUsage_Snsr_Data_Location_GPSStatusDataNotValid: number;

declare const kHIDUsage_Snsr_Data_Location_GPSStatusDataValid: number;

declare const kHIDUsage_Snsr_Data_Location_GPSStatus: number;

declare const kHIDUsage_Snsr_Data_Location_GPSSelectionModeDataNotValid: number;

declare const kHIDUsage_Snsr_Data_Location_GPSSelectionModeManualInput: number;

declare const kHIDUsage_Snsr_Data_Location_GPSSelectionModeEstimated: number;

declare const kHIDUsage_Snsr_Data_Location_GPSSelectionModeDGPS: number;

declare const kHIDUsage_Snsr_Data_Location_GPSSelectionMode: number;

declare const kHIDUsage_Snsr_Data_Location_GPSOperationModeAutomatic: number;

declare const kHIDUsage_Snsr_Data_Location_GPSOperationModeManual: number;

declare const kHIDUsage_Snsr_Data_Location_GPSOperationMode: number;

declare const kHIDUsage_Snsr_Data_Location_FixTypeManualInputMode: number;

declare const kHIDUsage_Snsr_Data_Location_FixTypeRealTimeKinematic: number;

declare const kHIDUsage_Snsr_Data_Location_FixTypeGPSPPSMode: number;

declare const kHIDUsage_Snsr_Data_Location_FixTypeDGPSSPSMode: number;

declare const kHIDUsage_Snsr_Data_Location_FixTypeGPSSPSMode: number;

declare const kHIDUsage_Snsr_Data_Location_FixType: number;

declare const kHIDUsage_Snsr_Data_Location_FixQualityDGPS: number;

declare const kHIDUsage_Snsr_Data_Location_FixQualityNoFix: number;

declare const kHIDUsage_Snsr_Data_Location_ErrorRadius: number;

declare const kHIDUsage_Snsr_Data_Location_AltitudeSeaLevelError: number;

declare const kHIDUsage_Snsr_Data_Location_AltitudeEllipsoidError: number;

declare const kHIDUsage_Snsr_Data_Location_Reserved: number;

declare const kHIDUsage_Snsr_Data_Location: number;

declare const kHIDUsage_Snsr_Light_Illuminance: number;

declare const kHIDUsage_Snsr_Property_PowerState_D4_PowerOff: number;

declare const kHIDUsage_Snsr_Property_PowerState_D1_LowPower: number;

declare const kHIDUsage_Snsr_Property_PowerState_D0_FullPower: number;

declare const kHIDUsage_Snsr_Property_ReportingState_WakeAllEvents: number;

declare const kHIDUsage_Snsr_Property_ReportingState_WakeNoEvents: number;

declare const kHIDUsage_Snsr_Property_ReportingState_ThresholdEvents: number;

declare const kHIDUsage_Snsr_Property_ReportLatency: number;

declare const kHIDUsage_Snsr_Property_SamplingRate: number;

declare const kHIDUsage_Snsr_Property_Maximum: number;

declare const kHIDUsage_Snsr_Property_ChangeSensitivityPercentRelative: number;

declare const kHIDUsage_Snsr_Property_ChangeSensitivityAbsolute: number;

declare const kHIDUsage_Snsr_Property_FirmwareVersion: number;

declare const kHIDUsage_Snsr_Property_HardwareRevision: number;

declare const kHIDUsage_Snsr_Property_SensorStatus: number;

declare const kHIDUsage_Snsr_Property_FriendlyName: number;

declare const kHIDUsage_Snsr_Event_SensorEvent_ComplexTrigger: number;

declare const kHIDUsage_Snsr_Event_SensorEvent_ZeroThresholdCrossUp: number;

declare const kHIDUsage_Snsr_Event_SensorEvent_HighThresholdCrossDown: number;

declare const kHIDUsage_Snsr_Event_SensorEvent_HighThresholdCrossUp: number;

declare const kHIDUsage_Snsr_Event_SensorEvent_RangeMaxReached: number;

declare const kHIDUsage_Snsr_Event_SensorEvent_StateChanged: number;

declare const kVideoNoTransactionTypeMask: number;

declare const kHIDUsage_Snsr_Event_SensorState_Error: number;

declare const kHIDUsage_Snsr_Event_SensorState_AccessDenied: number;

declare const kHIDUsage_Snsr_Event_SensorState_Ready: number;

declare const kHIDUsage_Snsr_Event_SensorState_Undefined: number;

declare const kHIDUsage_Snsr_Event_SensorState: number;

declare const kHIDUsage_Snsr_Modifier_ChangeSensitivityPercentRelative: number;

declare const kHIDUsage_Snsr_Modifier_FrequencyMax: number;

declare const kHIDUsage_Snsr_Modifier_ReportInterval: number;

declare const kHIDUsage_Snsr_Modifier_CalibrationOffset: number;

declare const kHIDUsage_Snsr_Modifier_ThresholdLow: number;

declare const kHIDUsage_Snsr_Modifier_Accuracy: number;

declare const kHIDUsage_Snsr_Modifier_Min: number;

declare const kHIDUsage_Snsr_Modifier_Max: number;

declare const kHIDUsage_Snsr_Other_GenericEnumerator: number;

declare const kHIDUsage_Snsr_Other: number;

declare const kHIDUsage_Snsr_Scanner_Barcode: number;

declare const kHIDUsage_Snsr_Orientation_InclinometerD: number;

declare const kHIDUsage_Snsr_Orientation_DeviceOrientation: number;

declare const kHIDUsage_Snsr_Orientation_Distance2D: number;

declare const kHIDUsage_Snsr_Orientation_Inclinometer1D: number;

declare const kHIDUsage_Snsr_Orientation_Compass3D: number;

declare const kHIDUsage_Snsr_Motion_LinearAccelerometer: number;

declare const kHIDUsage_Snsr_Motion_GravityVector: number;

declare const kHIDUsage_Snsr_Motion_Gyrometer3D: number;

declare const kHIDUsage_Snsr_Motion_Gyrometer2D: number;

declare const kHIDUsage_BCS_EAN_13: number;

declare const kHIDUsage_Snsr_Motion_Gyrometer1D: number;

declare const kHIDUsage_Snsr_Motion_Accelerometer1D: number;

declare const kHIDUsage_Snsr_Motion: number;

declare const kHIDUsage_PD_iManufacturer: number;

declare const kHIDUsage_Snsr_Mechanical_HallEffectSwitch: number;

declare const kHIDUsage_Snsr_Mechanical_HapticVibrator: number;

declare const kHIDUsage_Snsr_Mechanical_Force: number;

declare const kHIDUsage_Snsr_Mechanical_BooleanSwitch: number;

declare const kHIDUsage_Snsr_Mechanical: number;

declare const kHIDUsage_Snsr_Location_Static: number;

declare const kHIDUsage_Snsr_Location_Other: number;

declare const kHIDUsage_Snsr_Location_Lookup: number;

declare const kHIDUsage_Snsr_Location_Broadcast: number;

declare const kHIDUsage_Snsr_Location: number;

declare const kHIDUsage_Snsr_Light_ConsumerInfrared: number;

declare const kHIDUsage_Snsr_Environmental_WindDirection: number;

declare const kHIDUsage_Snsr_Environmental_Temperature: number;

declare const kHIDUsage_Snsr_Environmental_Humidity: number;

declare const kHIDUsage_Snsr_Environmental: number;

declare const kMode3Mask: number;

declare const kHIDUsage_Snsr_Electrical_Period: number;

declare const kHIDUsage_Snsr_Electrical_Frequency: number;

declare const kHIDUsage_Snsr_Electrical_Voltage: number;

declare const kHIDUsage_Snsr_Electrical_Inductance: number;

declare const kHIDUsage_Snsr_Electrical_Capacitance: number;

declare const kSESCmd_SEND_DIAGNOSTICS: number;

declare const kHIDUsage_Snsr_Biometric_HumanTouch: number;

declare const kHIDUsage_Snsr_Biometric_HumanPresence: number;

declare const kHIDUsage_Snsr_Biometric: number;

declare const kHIDUsage_AD_UnicodeCharacterSet: number;

declare const kHIDUsage_AD_CursorEnable: number;

declare const kHIDUsage_AD_CursorPixelPositioning: number;

declare const kHIDUsage_AD_Rows: number;

declare const kHIDUsage_AD_Column: number;

declare const kHIDUsage_AD_CursorPositionReport: number;

declare const kHIDUsage_AD_VerticalScroll: number;

declare const kHIDUsage_AD_DisplayEnable: number;

declare const kHIDUsage_AD_DataReadBack: number;

declare const kHIDUsage_PID_Reserved: number;

declare const kHIDUsage_PID_CreateNewEffectReport: number;

declare const kHIDUsage_PID_SharedParameterBlocks: number;

declare const kHIDUsage_PID_ParameterBlockSize: number;

declare const kHIDUsage_PID_StartDelay: number;

declare const kHIDUsage_PID_ActuatorPower: number;

declare const kHIDUsage_PID_SafetySwitch: number;

declare const kHIDUsage_PID_DevicePaused: number;

declare const kHIDUsage_PID_DC_DeviceReset: number;

declare const kHIDUsage_PID_DC_DisableActuators: number;

declare const kHIDUsage_PID_DeviceControl: number;

declare const kHIDUsage_PID_DeviceControlReport: number;

declare const kHIDUsage_PID_StateReport: number;

declare const kHIDUsage_PID_BlockFreeReport: number;

declare const kHIDUsage_PID_BlockLoadError: number;

declare const kHIDRqSetIdle: number;

declare const kHIDUsage_PID_BlockLoadFull: number;

declare const kHIDUsage_PID_BlockLoadSuccess: number;

declare const kHIDUsage_PID_MoveSource: number;

declare const kHIDUsage_PID_PoolMoveReport: number;

declare const kHIDUsage_PID_SimultaneousEffectsMax: number;

declare const kHIDUsage_PID_ROM_EffectBlockCount: number;

declare const kHIDUsage_PID_RAM_PoolSize: number;

declare const kHIDUsage_PID_DeviceGain: number;

declare const kHIDUsage_PID_DeviceGainReport: number;

declare const kHIDUsage_PID_OpEffectStop: number;

declare const kHIDUsage_PID_OpEffectStart: number;

declare const kHIDUsage_PID_EffectOperationReport: number;

declare const kHIDUsage_PID_RampEnd: number;

declare const kHIDUsage_PID_RampStart: number;

declare const kHIDUsage_PID_SetRampForceReport: number;

declare const kHIDUsage_PID_Magnitude: number;

declare const kHIDUsage_PID_SetCustomForceReport: number;

declare const kHIDUsage_PID_CustomForceVendorDefinedData: number;

declare const kHIDUsage_PID_PositiveSaturation: number;

declare const kHIDUsage_PID_NegativeCoefficient: number;

declare const kHIDUsage_PID_PositiveCoefficient: number;

declare const kHIDUsage_PID_CP_Offset: number;

declare const kHIDUsage_PID_FadeLevel: number;

declare const kHIDUsage_PID_SetEnvelopeReport: number;

declare const kHIDUsage_PID_BlockType: number;

declare const kHIDUsage_PID_DirectionEnable: number;

declare const kHIDUsage_PID_TriggerRepeatInterval: number;

declare const kHIDUsage_PID_TriggerButton: number;

declare const kHIDUsage_PID_Gain: number;

declare const kHIDUsage_PID_SamplePeriod: number;

declare const kHIDUsage_PID_Duration: number;

declare const kHIDUsage_PID_ET_Friction: number;

declare const kHIDUsage_PID_ET_Damper: number;

declare const kHIDUsage_PID_ET_Spring: number;

declare const kHIDUsage_PID_ET_SawtoothUp: number;

declare const kHIDUsage_PID_ET_Triangle: number;

declare const kHIDUsage_PID_ET_Square: number;

declare const kHIDUsage_PID_ET_CustomForceData: number;

declare const kHIDUsage_PID_ET_ConstantForce: number;

declare const kHIDUsage_PID_ROM_Flag: number;

declare const kHIDUsage_PID_ParamBlockOffset: number;

declare const kHIDUsage_PID_SetEffectReport: number;

declare const kHIDUsage_Haptics_VendorWaveformFirst: number;

declare const kHIDUsage_Haptics_WaveformRumbleContinuous: number;

declare const kHIDUsage_Haptics_WaveformClick: number;

declare const kHIDUsage_Haptics_WaveformStop: number;

declare const kHIDUsage_Haptics_WaveformCutoffTime: number;

declare const kHIDUsage_Haptics_RetriggerPeriod: number;

declare const kHIDUsage_Haptics_RepeatCount: number;

declare const kHIDUsage_Haptics_Intensity: number;

declare const kHIDUsage_Haptics_ManualTrigger: number;

declare const kHIDUsage_Haptics_AutoTrigger: number;

declare const kHIDUsage_Haptics_DurationList: number;

declare const kHIDUsage_Haptics_WaveformList: number;

declare const kHIDUsage_Dig_ReportRate: number;

declare const kHIDUsage_Dig_CapacitiveHeatMapFrameData: number;

declare const kHIDUsage_Dig_CapacitiveHeatMapProtocolVendorID: number;

declare const kHIDUsage_Dig_GestureCharacterEncodingUTF16BE: number;

declare const kHIDUsage_Dig_GestureCharacterEncodingUTF16LE: number;

declare const kHIDUsage_Dig_GestureCharacterDataLength: number;

declare const kHIDUsage_Dig_GestureCharacterEnable: number;

declare const kHIDUsage_Dig_RelativeScanTime: number;

declare const kHIDUsage_Dig_ContactCountMaximum: number;

declare const kHIDUsage_Dig_DeviceMode: number;

declare const kHIDUsage_Dig_Width: number;

declare const kHIDUsage_Dig_TouchValid: number;

declare const kHIDUsage_Dig_TabletPick: number;

declare const kHIDUsage_Dig_Twist: number;

declare const kHIDUsage_Dig_Altitude: number;

declare const kHIDUsage_Dig_Azimuth: number;

declare const kHIDUsage_Dig_Invert: number;

declare const kHIDUsage_Dig_TransducerIndex: number;

declare const kHIDUsage_Dig_Untouch: number;

declare const kHIDUsage_Dig_InRange: number;

declare const kHIDUsage_Dig_BarrelPressure: number;

declare const kHIDUsage_BCS_PrefixAIMI: number;

declare const kHIDUsage_Dig_TipPressure: number;

declare const kHIDUsage_Dig_GestureCharacter: number;

declare const kHIDUsage_Dig_DeviceSettings: number;

declare const kHIDUsage_Dig_Finger: number;

declare const kHIDUsage_Dig_DeviceConfiguration: number;

declare const kINQUIRY_ANSI_VERSION_SCSI_2_Compliant: number;

declare const kHIDUsage_Dig_FreeSpaceWand: number;

declare const kHIDUsage_Dig_Armature: number;

declare const kHIDUsage_Dig_CoordinateMeasuringMachine: number;

declare const kHIDUsage_Dig_TouchPad: number;

declare const kHIDUsage_Csmr_ContactStatusFlag: number;

declare const kHIDUsage_Csmr_ContactSpeedDialNumber: number;

declare const kHIDUsage_Csmr_ContactEmailMain: number;

declare const kHIDUsage_Csmr_ContactPhoneNumberOther: number;

declare const kHIDUsage_Csmr_ContactPhoneNumberFax: number;

declare const kHIDUsage_Csmr_ContactPhoneNumberPager: number;

declare const kHIDUsage_Csmr_ContactPhoneNumberBusiness: number;

declare const kHIDUsage_Csmr_ContactFullName: number;

declare const thirtyTwoBitMode: number;

declare const kHIDUsage_Csmr_ContactNickname: number;

declare const kHIDUsage_Csmr_ContactAdded: number;

declare const kHIDUsage_Csmr_ContactEdited: number;

declare const kHIDUsage_Csmr_KeyboardInputAssistCancel: number;

declare const kHIDUsage_Csmr_KeyboardInputAssistNext: number;

declare const kHIDUsage_Csmr_ImplementedKeyboardInputAssistControls: number;

declare const kHIDUsage_Csmr_KeyboardIETFLanguageTagIndex: number;

declare const kHIDUsage_Csmr_KeyboardPhysicalLayout: number;

declare const kHIDUsage_Csmr_ExtendedKeyboardAttributesCollection: number;

declare const kHIDUsage_Csmr_ACDesktopShowAllApplications: number;

declare const kHIDUsage_Csmr_ACSoftKeyRight: number;

declare const kHIDUsage_Csmr_ACSoftKeyLeft: number;

declare const kHIDUsage_Csmr_ACNavigationGuidance: number;

declare const kUSBFeatureEndpointStall: number;

declare const kHIDUsage_Csmr_ACSplit: number;

declare const kHIDUsage_Csmr_ACMerge: number;

declare const kHIDUsage_Csmr_ACRename: number;

declare const kFifthDepthMode: number;

declare const kHIDUsage_Csmr_ACInsertSymbol: number;

declare const kHIDUsage_BCS_NotOnFileIndication: number;

declare const kHIDUsage_Csmr_ACInsertPicture: number;

declare const kHIDUsage_Csmr_ACSetBorders: number;

declare const kHIDUsage_Csmr_ACSend: number;

declare const kHIDUsage_Csmr_ACReply: number;

declare const kHIDUsage_Csmr_ACSendTo: number;

declare const kHIDUsage_Csmr_ACSynchronize: number;

declare const kHIDUsage_Csmr_ACResetAlarm: number;

declare const kHIDUsage_Csmr_ACSnoozeAlarm: number;

declare const kHIDUsage_Csmr_ACClearAlarm: number;

declare const kHIDUsage_Csmr_ACSetAlarm: number;

declare const kHIDUsage_Csmr_ACEditTimeZones: number;

declare const kHIDUsage_Csmr_ACSelectTimeZone: number;

declare const kHIDUsage_Csmr_ACSetClock: number;

declare const kHIDUsage_Csmr_ACSortDescending: number;

declare const kHIDUsage_BD_BrailleJoystickLeft: number;

declare const kHIDUsage_Csmr_ACSortAscending: number;

declare const kHIDUsage_Csmr_ACSort: number;

declare const IOPMNextLowerState: number;

declare const kHIDUsage_Csmr_ACSelectTable: number;

declare const kHIDUsage_Csmr_ACSelectColumn: number;

declare const kHIDUsage_Csmr_ACSelectParagraph: number;

declare const kHIDUsage_Csmr_ACSelectSentence: number;

declare const kHIDUsage_Csmr_ACViewComment: number;

declare const kHIDUsage_Csmr_ACUnprotect: number;

declare const kHIDUsage_Csmr_ACProtect: number;

declare const kHIDUsage_Csmr_ACDelete: number;

declare const kHIDUsage_Csmr_ACCollapse: number;

declare const kHIDUsage_Csmr_ACAddToCart: number;

declare const kHIDUsage_Csmr_ACCancel: number;

declare const kHIDUsage_Csmr_ACNo: number;

declare const kHIDUsage_Csmr_ACYes: number;

declare const kHIDUsage_Csmr_ACPromote: number;

declare const kHIDUsage_Csmr_ACBulletedList: number;

declare const kHIDUsage_Csmr_ACRestartNumbering: number;

declare const kHIDUsage_Csmr_ACJustifyBlockV: number;

declare const kIOPacketFilterUnicast: number;

declare const kHIDUsage_Csmr_ACJustifyTop: number;

declare const kHIDUsage_Csmr_ACJustifyRight: number;

declare const kHIDUsage_Csmr_ACFontSelect: number;

declare const kHIDUsage_Csmr_ACMirrorHorizontal: number;

declare const kHIDUsage_Csmr_ACFlipVertical: number;

declare const kHIDUsage_Csmr_ACFlipHorizontal: number;

declare const kHIDUsage_Csmr_ACStrikethrough: number;

declare const kHIDUsage_Csmr_ACUnderline: number;

declare const kHIDUsage_Csmr_ACItalics: number;

declare const kHIDUsage_Csmr_ACFormat: number;

declare const kHIDUsage_Snsr_Property_Environmental_ReferencePressure: number;

declare const kHIDUsage_Csmr_ACTileVertically: number;

declare const kHIDUsage_Csmr_ACTileHorizontally: number;

declare const kHIDUsage_Csmr_ACPan: number;

declare const kHIDUsage_Csmr_ACPanRight: number;

declare const kHIDUsage_Csmr_ACPanLeft: number;

declare const kHIDUsage_Csmr_ACScroll: number;

declare const kHIDUsage_Csmr_ACScrollUp: number;

declare const kHIDUsage_Csmr_ACZoomIn: number;

declare const kHIDUsage_Csmr_ACSubscriptions: number;

declare const kHIDUsage_Csmr_ACHistory: number;

declare const kHIDUsage_Csmr_ACBookmarks: number;

declare const kHIDUsage_Csmr_ACPreviousLink: number;

declare const kHIDUsage_Csmr_ACStop: number;

declare const kHIDUsage_Csmr_ACHome: number;

declare const kHIDUsage_Csmr_ACFindandReplace: number;

declare const kHIDUsage_Csmr_ACFind: number;

declare const kHIDUsage_Csmr_ACUndo: number;

declare const kHIDUsage_Csmr_ACProperties: number;

declare const kHIDUsage_Csmr_ACSave: number;

declare const kHIDUsage_Csmr_ACMinimize: number;

declare const kHIDUsage_Csmr_ACNew: number;

declare const kHIDUsage_Csmr_ALNavigation: number;

declare const kHIDUsage_Csmr_ALContactSync: number;

declare const kHIDUsage_Csmr_ALCustomizedCorporateNewsBrowser: number;

declare const kINQUIRY_ECMA_VERSION_Mask: number;

declare const kHIDUsage_Csmr_ALMarketMonitorOrFinanceBrowser: number;

declare const kHIDUsage_Csmr_ALSmartCardInformationOrHelp: number;

declare const kHIDUsage_Csmr_ALOnlineCommunity: number;

declare const kHIDUsage_Csmr_ALDigitalWallet: number;

declare const kHIDUsage_Csmr_ALMovieBrowser: number;

declare const kHIDUsage_Csmr_ALAudioBrowser: number;

declare const kHIDUsage_Csmr_ALImageBrowser: number;

declare const kHIDUsage_Csmr_ALFileBrowser: number;

declare const kHIDUsage_Csmr_ALScreenSaver: number;

declare const kHIDUsage_Csmr_ALEncryption: number;

declare const kHIDUsage_BCS_ParametersChanged: number;

declare const kHIDUsage_Csmr_ALKeyboardLayout: number;

declare const kHIDUsage_Csmr_ALGrammerCheck: number;

declare const kHIDUsage_Csmr_ALSpellCheck: number;

declare const kHIDUsage_Csmr_ALDictionary: number;

declare const kHIDUsage_Csmr_ALDocuments: number;

declare const kHIDUsage_Csmr_ALIntegratedHelpCenter: number;

declare const kHIDUsage_Csmr_ALPreemptiveHaltTaskOrApplication: number;

declare const kHIDUsage_Csmr_ALPreviousTaskOrApplication: number;

declare const kHIDUsage_BCS_LockoutTime: number;

declare const kHIDUsage_Csmr_ALCommandLineProcessorOrRun: number;

declare const kHIDUsage_Csmr_ALTerminalLockOrScreensaver: number;

declare const kHIDUsage_Csmr_VendorSpecificKeyboardPhysicalLayout: number;

declare const kHIDUsage_Csmr_ALLogonOrLogoff: number;

declare const kHIDUsage_Csmr_ALLogon: number;

declare const kHIDUsage_Csmr_ALTelephonyOrDialer: number;

declare const kHIDUsage_Csmr_ALNetworkChat: number;

declare const kHIDUsage_Csmr_ALInternetBrowser: number;

declare const kHIDUsage_Csmr_ALCalculator: number;

declare const kHIDUsage_Csmr_ALLogOrJournalOrTimecard: number;

declare const kHIDUsage_Csmr_ALContactsOrAddressBook: number;

declare const kHIDUsage_Csmr_ALPresentationApp: number;

declare const kHIDUsage_Csmr_ALGraphicsEditor: number;

declare const kHIDUsage_Csmr_ALSpreadsheet: number;

declare const kIOPMCannotRaisePower: number;

declare const kHIDUsage_Csmr_ALTextEditor: number;

declare const kHIDUsage_Csmr_ALProgrammableButtonConfiguration: number;

declare const kHIDUsage_Csmr_ALLaunchButtonConfigurationTool: number;

declare const kHIDUsage_Csmr_AlternateAudioIncrement: number;

declare const kHIDUsage_Csmr_SubChannelIncrement: number;

declare const kHIDUsage_Csmr_SubChannel: number;

declare const kHIDUsage_Csmr_ChannelSide: number;

declare const kHIDUsage_Csmr_ChannelCenterFront: number;

declare const kSBCWOCmd_WRITE_12: number;

declare const kHIDUsage_Csmr_ChannelRight: number;

declare const kHIDUsage_Csmr_ChannelLeft: number;

declare const kHIDUsage_Csmr_SpeakerSystem: number;

declare const kHIDUsage_BS_ThermistorUnderRange: number;

declare const kHIDUsage_Csmr_BassDecrement: number;

declare const kHIDUsage_Csmr_BalanceLeft: number;

declare const kHIDUsage_Csmr_HoldupAlarm: number;

declare const kHIDUsage_Csmr_Motion: number;

declare const kHIDUsage_Csmr_FireAlarm: number;

declare const kHIDUsage_Csmr_RoomTemperature: number;

declare const kHIDUsage_Csmr_LightIlluminationLevel: number;

declare const kHIDUsage_Csmr_LightEnable: number;

declare const kHIDUsage_Csmr_ExtendedPlay: number;

declare const kHIDUsage_Csmr_LongPlay: number;

declare const kHIDUsage_Csmr_StandardPlay: number;

declare const kHIDUsage_Csmr_PlaybackSpeed: number;

declare const kHIDUsage_Csmr_Speed: number;

declare const kHIDUsage_Csmr_VolumeDecrement: number;

declare const kHIDUsage_Csmr_MPX: number;

declare const kHIDUsage_Csmr_Bass: number;

declare const kHIDUsage_Csmr_Mute: number;

declare const kHIDUsage_Csmr_Volume: number;

declare const kHIDUsage_Csmr_VoiceCommand: number;

declare const kHIDUsage_BS_Maxerror: number;

declare const kHIDUsage_Csmr_PlayOrSkip: number;

declare const kHIDUsage_Csmr_StopOrEject: number;

declare const kHIDUsage_Csmr_TrackingDecrement: number;

declare const kHIDUsage_Csmr_CounterReset: number;

declare const kHIDUsage_Csmr_SearchMarkBackwards: number;

declare const kHIDUsage_Csmr_SearchMarkForward: number;

declare const kHIDUsage_Csmr_ReturnToMark: number;

declare const kHIDUsage_Csmr_ClearMark: number;

declare const kHIDUsage_Csmr_FrameBack: number;

declare const kHIDUsage_Csmr_FrameForward: number;

declare const kHIDUsage_Csmr_TrackNormal: number;

declare const kHIDUsage_Csmr_EnterDisc: number;

declare const kHIDUsage_Csmr_RandomPlay: number;

declare const kHIDUsage_Csmr_FastForward: number;

declare const kHIDUsage_Csmr_Pause: number;

declare const kHIDUsage_Csmr_Monthly: number;

declare const kHIDUsage_Csmr_Daily: number;

declare const kHIDUsage_Csmr_ChannelDecrement: number;

declare const kHIDUsage_Csmr_ChannelIncrement: number;

declare const kHIDUsage_Csmr_MediaSelectCall: number;

declare const kHIDUsage_Csmr_MediaSelectHome: number;

declare const kHIDUsage_Csmr_MediaSelectSecurity: number;

declare const kHIDUsage_Csmr_MediaSelectSatellite: number;

declare const kHIDUsage_Csmr_MediaSelectTape: number;

declare const kHIDUsage_Csmr_Help: number;

declare const kHIDUsage_Csmr_MediaSelectCD: number;

declare const kHIDUsage_Csmr_MediaSelectMessages: number;

declare const kHIDUsage_Csmr_MediaSelectVideoPhone: number;

declare const kHIDUsage_Csmr_MediaSelectProgramGuide: number;

declare const kHIDUsage_Csmr_MediaSelectDVD: number;

declare const kHIDUsage_Csmr_MediaSelectComputer: number;

declare const kHIDUsage_Csmr_Channel: number;

declare const kHIDUsage_PD_Frequency: number;

declare const kHIDUsage_Csmr_OrderMovie: number;

declare const kHIDUsage_Csmr_EnterChannel: number;

declare const kHIDUsage_Csmr_RecallLast: number;

declare const kHIDUsage_Csmr_Selection: number;

declare const kHIDUsage_Csmr_DisplayBrightnessSetAutoBrightness: number;

declare const kHIDUsage_Csmr_DisplayBrightnessMaximum: number;

declare const kHIDUsage_Csmr_DisplayBrightnessMinimum: number;

declare const kHIDUsage_Csmr_DisplayBacklightToggle: number;

declare const kHIDUsage_Csmr_DisplayBrightness: number;

declare const kHIDUsage_Csmr_3DModeSelect: number;

declare const kHIDUsage_Csmr_YellowMenuButton: number;

declare const kHIDUsage_Csmr_RedMenuButton: number;

declare const kHIDUsage_Csmr_PictureInPictureSwap: number;

declare const kHIDUsage_Csmr_PictureInPictureToggle: number;

declare const kHIDUsage_Snsr_Data_Motion_AngularVelocity: number;

declare const kHIDUsage_Csmr_BroadcastMode: number;

declare const kHIDUsage_Csmr_ClosedCaptionSelect: number;

declare const kHIDUsage_Csmr_ClosedCaption: number;

declare const kHIDUsage_Csmr_MenuValueDecrease: number;

declare const kHIDUsage_Csmr_MenuEscape: number;

declare const kHIDUsage_Csmr_MenuLeft: number;

declare const kHIDUsage_Csmr_MenuPick: number;

declare const kHIDUsage_Csmr_SleepMode: number;

declare const kHIDUsage_Csmr_SleepAfter: number;

declare const kHIDUsage_Csmr_Reset: number;

declare const kSCSICmd_READ_CD_MSF: number;

declare const kHIDUsage_Csmr_Power: number;

declare const kSCSIServiceAction_SET_TARGET_PORT_GROUPS: number;

declare const kHIDUsage_Csmr_Plus100: number;

declare const kHIDUsage_Csmr_GraphicEqualizer: number;

declare const kHIDUsage_Csmr_Headphone: number;

declare const kHIDUsage_Csmr_Microphone: number;

declare const kHIDUsage_Csmr_ProgrammableButtons: number;

declare const kHIDUsage_Csmr_ConsumerControl: number;

declare const kHIDUsage_TFon_Reserved: number;

declare const kHIDUsage_Tfon_PhoneKeyStar: number;

declare const kHIDUsage_Tfon_PhoneKey9: number;

declare const kHIDUsage_Tfon_PhoneKey7: number;

declare const kHIDUsage_Tfon_PhoneKey2: number;

declare const kHIDUsage_Tfon_PhoneKey1: number;

declare const kHIDUsage_Tfon_PhoneKey0: number;

declare const kHIDUsage_Tfon_ConfirmationTone2: number;

declare const kHIDUsage_Tfon_ConfirmationTone1: number;

declare const kHIDUsage_Tfon_PriorityRingback: number;

declare const kHIDUsage_Tfon_InsideRingback: number;

declare const kHIDUsage_Tfon_OutsideRingTone: number;

declare const kHIDUsage_Tfon_InsideRingTone: number;

declare const kHIDUsage_Tfon_OutsideDialTone: number;

declare const kHIDUsage_Tfon_InsideDialTone: number;

declare const kHIDUsage_Tfon_AnswerOnOrOff: number;

declare const kHIDUsage_Tfon_ScreenCalls: number;

declare const kHIDUsage_Tfon_RecallNumber: number;

declare const kHIDUsage_Tfon_SpeedDial: number;

declare const kHIDUsage_Tfon_CallerID: number;

declare const kHIDUsage_Tfon_PhoneMute: number;

declare const kHIDUsage_Tfon_Ring: number;

declare const kHIDUsage_Tfon_RingEnable: number;

declare const kHIDUsage_Tfon_Conference: number;

declare const kHIDUsage_Tfon_Line: number;

declare const kHIDUsage_Tfon_AlternateFunction: number;

declare const kHIDUsage_Tfon_Transfer: number;

declare const kHIDUsage_Tfon_Redial: number;

declare const kHIDUsage_Tfon_Hold: number;

declare const kHIDUsage_Tfon_Feature: number;

declare const kHIDUsage_Tfon_Flash: number;

declare const kHIDUsage_Tfon_HookSwitch: number;

declare const kHIDUsage_Tfon_TelephonyKeyPad: number;

declare const kSCSICmd_REPORT_LUNS: number;

declare const kHIDUsage_Tfon_Headset: number;

declare const kHIDUsage_Tfon_Handset: number;

declare const kHIDUsage_Tfon_AnsweringMachine: number;

declare const kHIDUsage_Ord_Instance65535: number;

declare const kHIDUsage_Ord_Instance3: number;

declare const kHIDUsage_Button_254: number;

declare const kHIDUsage_Button_253: number;

declare const kHIDUsage_Button_252: number;

declare const kHIDUsage_Button_251: number;

declare const kHIDUsage_Button_250: number;

declare const kHIDUsage_Button_249: number;

declare const kHIDUsage_Button_247: number;

declare const kHIDUsage_Button_245: number;

declare const kHIDUsage_Button_244: number;

declare const kHIDUsage_Button_243: number;

declare const kHIDUsage_Button_242: number;

declare const kHIDUsage_Snsr_Data_Custom_BooleanArray: number;

declare const kHIDUsage_Button_238: number;

declare const kHIDUsage_Button_237: number;

declare const kHIDUsage_Button_236: number;

declare const kHIDUsage_Button_232: number;

declare const kHIDUsage_Button_231: number;

declare const kHIDUsage_Button_230: number;

declare const kHIDUsage_Button_229: number;

declare const kHIDUsage_Button_227: number;

declare const kHIDUsage_Button_225: number;

declare const kHIDUsage_Button_224: number;

declare const kHIDUsage_Button_222: number;

declare const kHIDUsage_Button_221: number;

declare const kHIDUsage_Button_220: number;

declare const kHIDUsage_Button_219: number;

declare const kHIDUsage_Button_217: number;

declare const kHIDUsage_Button_213: number;

declare const kHIDUsage_Button_212: number;

declare const kSCCCmd_REQUEST_SENSE: number;

declare const kHIDUsage_Button_210: number;

declare const kHIDUsage_Button_207: number;

declare const kHIDUsage_Button_206: number;

declare const kHIDUsage_Button_205: number;

declare const kIOUSBUSB20ExtensionCapabilityBESL: number;

declare const kHIDUsage_Button_201: number;

declare const kHIDUsage_Button_200: number;

declare const kHIDUsage_Button_199: number;

declare const kHIDUsage_Button_198: number;

declare const kHIDUsage_Button_197: number;

declare const kHIDUsage_Button_195: number;

declare const kHIDUsage_Button_192: number;

declare const kHIDUsage_Button_189: number;

declare const kHIDUsage_Button_188: number;

declare const kHIDUsage_Button_187: number;

declare const kHIDUsage_Button_186: number;

declare const kHIDUsage_Button_185: number;

declare const kHIDUsage_Button_184: number;

declare const kHIDUsage_Button_182: number;

declare const kSCSICmd_BLANK: number;

declare const kHIDUsage_Button_181: number;

declare const kHIDUsage_Button_180: number;

declare const kHIDUsage_Button_176: number;

declare const kHIDUsage_Button_175: number;

declare const kHIDUsage_Button_171: number;

declare const kHIDUsage_Button_167: number;

declare const kHIDUsage_Button_166: number;

declare const kHIDUsage_Button_165: number;

declare const kHIDUsage_Button_161: number;

declare const kHIDUsage_Button_158: number;

declare const kHIDUsage_Button_156: number;

declare const kHIDUsage_Button_150: number;

declare const kHIDUsage_Button_149: number;

declare const kHIDUsage_Button_148: number;

declare const kHIDUsage_Button_146: number;

declare const kHIDUsage_Button_145: number;

declare const kHIDUsage_Button_141: number;

declare const kHIDUsage_Button_139: number;

declare const kHIDUsage_BCS_GoodDecodeIndication: number;

declare const kHIDUsage_Button_136: number;

declare const kHIDUsage_Button_134: number;

declare const kHIDUsage_Button_133: number;

declare const kHIDUsage_Button_131: number;

declare const kHIDUsage_Button_128: number;

declare const kHIDUsage_Button_125: number;

declare const kHIDUsage_Button_124: number;

declare const kHIDUsage_Button_121: number;

declare const kHIDUsage_Button_117: number;

declare const kHIDUsage_Button_115: number;

declare const kHIDUsage_Button_113: number;

declare const kHIDUsage_Button_112: number;

declare const kHIDUsage_Button_111: number;

declare const kHIDUsage_Button_106: number;

declare const kHIDUsage_Button_105: number;

declare const kHIDUsage_Button_103: number;

declare const kHIDUsage_Button_101: number;

declare const kHIDUsage_Button_100: number;

declare const kHIDUsage_Button_99: number;

declare const kHIDUsage_Button_96: number;

declare const kHIDUsage_Button_93: number;

declare const kHIDUsage_Button_92: number;

declare const kHIDUsage_Button_84: number;

declare const kHIDUsage_Button_83: number;

declare const kHIDUsage_Button_79: number;

declare const kHIDUsage_Button_78: number;

declare const kHIDUsage_Button_74: number;

declare const kHIDUsage_Button_72: number;

declare const kHIDUsage_Snsr_Event_SensorEvent: number;

declare const kHIDUsage_Button_196: number;

declare const kHIDUsage_Button_71: number;

declare const kHIDUsage_Button_69: number;

declare const kHIDUsage_Button_67: number;

declare const kHIDUsage_Button_65: number;

declare const kHIDUsage_Button_63: number;

declare const kHIDUsage_Button_59: number;

declare const kHIDUsage_Button_56: number;

declare const kHIDUsage_Button_55: number;

declare const kHIDUsage_Button_53: number;

declare const kHIDUsage_Button_51: number;

declare const kHIDUsage_Button_50: number;

declare const kHIDUsage_Button_49: number;

declare const kHIDUsage_Button_48: number;

declare const kHIDUsage_Button_46: number;

declare const kIONetworkDataBufferTypeNone: number;

declare const kHIDUsage_Button_43: number;

declare const kHIDUsage_Button_42: number;

declare const kHIDUsage_Button_36: number;

declare const kSCSIServiceAction_REPORT_SUPPORTED_TASK_MANAGEMENT_FUNCTIONS: number;

declare const kHIDUsage_Button_35: number;

declare const kHIDUsage_Button_33: number;

declare const kDVDMediaTypeRAM: number;

declare const kHIDUsage_Button_31: number;

declare const kHIDUsage_Button_28: number;

declare const kHIDUsage_Button_27: number;

declare const kHIDUsage_Button_25: number;

declare const kHIDUsage_Button_24: number;

declare const kUSPrintingClassGetDeviceID: number;

declare const kHIDUsage_Button_23: number;

declare const kHIDUsage_Button_22: number;

declare const kHIDUsage_Button_21: number;

declare const kHIDUsage_Button_20: number;

declare const kHIDUsage_Button_16: number;

declare const kHIDUsage_Button_12: number;

declare const kHIDUsage_Button_10: number;

declare const kHIDUsage_Button_9: number;

declare const kHIDUsage_Button_7: number;

declare const kHIDUsage_Button_6: number;

declare const kHIDUsage_Button_5: number;

declare const kHIDUsage_Button_4: number;

declare const kHIDUsage_Button_2: number;

declare const kHIDUsage_LED_Reserved: number;

declare const kHIDUsage_LED_Player6: number;

declare const kCDFeaturesTestWriteBit: number;

declare const kHIDUsage_LED_Player5: number;

declare const kHIDUsage_LED_Player4: number;

declare const kHIDUsage_LED_Player2: number;

declare const kHIDUsage_LED_PlayerIndicator: number;

declare const kHIDUsage_LED_LEDIntensity: number;

declare const kHIDUsage_LED_BlueLEDChannel: number;

declare const kHIDUsage_LED_RedLEDChannel: number;

declare const kHIDUsage_LED_RGB_LED: number;

declare const kHIDUsage_Button_65535: number;

declare const kHIDUsage_LED_GoodStatus: number;

declare const kHIDUsage_LED_SystemSuspend: number;

declare const kHIDUsage_LED_IndicatorRed: number;

declare const kHIDUsage_LED_UsageIndicatorColor: number;

declare const kHIDUsage_LED_FastBlinkOnTime: number;

declare const kHIDUsage_Snsr_Data_Time_Year: number;

declare const kHIDUsage_LED_FlashOnTime: number;

declare const kHIDUsage_LED_IndicatorSlowBlink: number;

declare const kHIDUsage_LED_IndicatorFlash: number;

declare const kSCSIServiceAction_REPORT_PRIORITY: number;

declare const kHIDUsage_LED_IndicatorOn: number;

declare const kHIDUsage_LED_Error: number;

declare const kHIDUsage_LED_Record: number;

declare const kHIDUsage_LED_Play: number;

declare const kHIDUsage_LED_FastForward: number;

declare const kHIDUsage_LED_Stop: number;

declare const kHIDUsage_LED_Remote: number;

declare const kHIDUsage_LED_OffLine: number;

declare const kHIDUsage_PD_Overload: number;

declare const kHIDUsage_LED_StandBy: number;

declare const kHIDUsage_LED_NightMode: number;

declare const kHIDUsage_LED_Coverage: number;

declare const kHIDUsage_LED_Microphone: number;

declare const kHIDUsage_LED_Hold: number;

declare const kHIDUsage_LED_BatteryOperation: number;

declare const kHIDUsage_LED_DataMode: number;

declare const kHIDUsage_LED_MessageWaiting: number;

declare const kHIDUsage_LED_Ring: number;

declare const kHIDUsage_LED_RecordingFormatDetect: number;

declare const kHIDUsage_LED_CLV: number;

declare const kCDMediaTypeRW: number;

declare const kHIDUsage_LED_Spinning: number;

declare const kHIDUsage_LED_SamplingRateDetect: number;

declare const kHIDUsage_LED_SurroundOn: number;

declare const kHIDUsage_Csmr_ACSearch: number;

declare const kHIDUsage_LED_SoundFieldOn: number;

declare const kHIDUsage_KeyboardRightShift: number;

declare const kHIDUsage_KeyboardLeftGUI: number;

declare const kHIDUsage_KeyboardLeftShift: number;

declare const kHIDUsage_KeyboardClearOrAgain: number;

declare const kHIDUsage_KeyboardCancel: number;

declare const kHIDUsage_KeyboardSysReqOrAttention: number;

declare const kHIDUsage_KeyboardLANG6: number;

declare const kHIDUsage_KeyboardLANG4: number;

declare const kHIDUsage_KeyboardLANG3: number;

declare const kHIDUsage_KeyboardLANG2: number;

declare const kHIDUsage_KeyboardLANG1: number;

declare const kATALogicalSectorAlignmentMask: number;

declare const kHIDUsage_KeyboardInternational9: number;

declare const kHIDUsage_KeyboardInternational8: number;

declare const kHIDUsage_KeyboardInternational6: number;

declare const kHIDUsage_KeyboardInternational5: number;

declare const kHIDUsage_KeypadEqualSignAS400: number;

declare const kHIDUsage_KeyboardLockingScrollLock: number;

declare const kHIDUsage_KeyboardLockingNumLock: number;

declare const kHIDUsage_KeyboardLockingCapsLock: number;

declare const kHIDUsage_KeyboardVolumeDown: number;

declare const kHIDUsage_KeyboardVolumeUp: number;

declare const kHIDUsage_KeyboardMute: number;

declare const kHIDUsage_KeyboardFind: number;

declare const kHIDUsage_KeyboardPaste: number;

declare const kHIDUsage_KeyboardCopy: number;

declare const kHIDUsage_KeyboardUndo: number;

declare const kHIDUsage_KeyboardMenu: number;

declare const kHIDUsage_KeyboardHelp: number;

declare const kHIDUsage_KeyboardF20: number;

declare const kHIDUsage_KeyboardF17: number;

declare const kDisableVerticalSyncBit: number;

declare const kHIDUsage_KeyboardF16: number;

declare const kHIDUsage_KeyboardF14: number;

declare const kHIDUsage_KeyboardF13: number;

declare const kHIDUsage_KeypadEqualSign: number;

declare const kHIDUsage_KeyboardPower: number;

declare const kHIDUsage_KeyboardNonUSBackslash: number;

declare const kHIDUsage_KeypadPeriod: number;

declare const kHIDUsage_Keypad7: number;

declare const kHIDUsage_Keypad6: number;

declare const kHIDUsage_Keypad4: number;

declare const kHIDUsage_LED_HeadSet: number;

declare const kHIDUsage_Keypad3: number;

declare const kHIDUsage_Keypad2: number;

declare const kHIDUsage_Keypad1: number;

declare const kHIDUsage_KeypadEnter: number;

declare const kHIDUsage_KeypadHyphen: number;

declare const kHIDUsage_KeypadAsterisk: number;

declare const kHIDUsage_KeypadNumLock: number;

declare const kHIDUsage_KeyboardUpArrow: number;

declare const kHIDUsage_KeyboardDownArrow: number;

declare const kHIDUsage_KeyboardLeftArrow: number;

declare const kHIDUsage_KeyboardRightArrow: number;

declare const kHIDUsage_KeyboardEnd: number;

declare const kHIDUsage_KeyboardPageUp: number;

declare const kHIDUsage_KeyboardHome: number;

declare const kHIDUsage_KeyboardInsert: number;

declare const kHIDUsage_KeyboardScrollLock: number;

declare const kHIDUsage_KeyboardF11: number;

declare const kHIDUsage_KeyboardF10: number;

declare const kHIDUsage_KeyboardF9: number;

declare const kHIDUsage_KeyboardF6: number;

declare const kHIDUsage_KeyboardF4: number;

declare const kHIDUsage_KeyboardF2: number;

declare const kHIDUsage_KeyboardCapsLock: number;

declare const kHIDUsage_KeyboardSlash: number;

declare const kHIDUsage_KeyboardComma: number;

declare const kHIDUsage_KeyboardGraveAccentAndTilde: number;

declare const kHIDUsage_KeyboardSemicolon: number;

declare const kMMCCmd_VERIFY_10: number;

declare const kHIDUsage_KeyboardNonUSPound: number;

declare const kHIDUsage_KeyboardHyphen: number;

declare const kHIDUsage_KeyboardTab: number;

declare const kHIDUsage_Keyboard7: number;

declare const kHIDUsage_Keyboard6: number;

declare const kHIDUsage_Csmr_MenuRight: number;

declare const kHIDUsage_Keyboard3: number;

declare const kHIDUsage_Csmr_TrebleDecrement: number;

declare const kHIDUsage_Keyboard2: number;

declare const kHIDUsage_KeyboardZ: number;

declare const kHIDUsage_KeyboardY: number;

declare const kHIDUsage_KeyboardU: number;

declare const kHIDUsage_KeyboardS: number;

declare const kHIDUsage_KeyboardQ: number;

declare const kHIDUsage_KeyboardP: number;

declare const kHIDUsage_KeyboardO: number;

declare const kHIDUsage_KeyboardM: number;

declare const kHIDUsage_KeyboardK: number;

declare const kHIDUsage_KeyboardJ: number;

declare const kHIDUsage_KeyboardH: number;

declare const kHIDUsage_KeyboardG: number;

declare const cscGetPageBase: number;

declare const kHIDUsage_KeyboardD: number;

declare const kHIDUsage_KeyboardC: number;

declare const kHIDUsage_KeyboardA: number;

declare const kHIDUsage_GenDevControls_BatteryStrength: number;

declare const kHIDUsage_Game_Reserved: number;

declare const kHIDUsage_Game_GamepadFormFitting: number;

declare const kHIDUsage_Game_GamepadFormFitting_Compatibility: number;

declare const kHIDUsage_Game_GunSafety: number;

declare const kIOUSBDeviceStatusSelfPowered: number;

declare const kHIDUsage_Game_GunBolt: number;

declare const kHIDUsage_Game_SecondaryFlipper: number;

declare const kHIDUsage_Game_Flipper: number;

declare const kHIDUsage_Game_LeanForwardOrBackward: number;

declare const kHIDUsage_Game_LeanRightOrLeft: number;

declare const kHIDUsage_Game_MoveUpOrDown: number;

declare const kHIDUsage_Game_MoveRightOrLeft: number;

declare const kHIDUsage_Game_TurnRightOrLeft: number;

declare const kHIDUsage_Game_GunDevice: number;

declare const kHIDUsage_Sprt_5Wood: number;

declare const kHIDUsage_Sprt_3Wood: number;

declare const kHIDUsage_Sprt_1Wood: number;

declare const kHIDUsage_Button_174: number;

declare const kHIDUsage_Sprt_SandWedge: number;

declare const kHIDUsage_Sprt_10Iron: number;

declare const kHIDUsage_Sprt_9Iron: number;

declare const kHIDUsage_Sprt_7Iron: number;

declare const kHIDUsage_Sprt_5Iron: number;

declare const kHIDUsage_Snsr_Data_Electrical_Resistance: number;

declare const kHIDUsage_Sprt_4Iron: number;

declare const kHIDUsage_Sprt_StickHeight: number;

declare const kHIDUsage_Sprt_Rate: number;

declare const kHIDUsage_BCS_ParameterScanning: number;

declare const kHIDUsage_Sprt_Slope: number;

declare const kHIDUsage_Sprt_RowingMachine: number;

declare const kHIDUsage_VR_StereoEnable: number;

declare const kHIDUsage_VR_Oculometer: number;

declare const kHIDUsage_VR_HeadMountedDisplay: number;

declare const kHIDUsage_MSR_Track2Data: number;

declare const kHIDUsage_VR_HeadTracker: number;

declare const kHIDUsage_VR_Glove: number;

declare const kHIDUsage_VR_Flexor: number;

declare const kHIDUsage_VR_BodySuit: number;

declare const kHIDUsage_VR_Belt: number;

declare const kHIDUsage_Sim_FrontBrake: number;

declare const kHIDUsage_Sim_HandleBars: number;

declare const kHIDUsage_Sim_BicycleCrank: number;

declare const kHIDUsage_Sim_DivePlane: number;

declare const kHIDUsage_Sim_Accelerator: number;

declare const kHIDUsage_Sim_WingFlaps: number;

declare const kHIDUsage_Sim_Trigger: number;

declare const kHIDUsage_Sim_ToeBrake: number;

declare const kHIDUsage_Sim_LandingGear: number;

declare const kHIDUsage_Sim_Throttle: number;

declare const kHIDUsage_Sim_DiveBrake: number;

declare const kHIDUsage_Sim_CollectiveControl: number;

declare const kMMCCmd_FORMAT_UNIT: number;

declare const kHIDUsage_Sim_ChaffRelease: number;

declare const kHIDUsage_Sim_AutopilotEnable: number;

declare const kSCSICmd_GET_PERFORMANCE: number;

declare const kHIDUsage_Sim_AntiTorqueControl: number;

declare const kHIDUsage_Sim_AileronTrim: number;

declare const kHIDUsage_Sim_Aileron: number;

declare const kHIDUsage_Sim_CyclicTrim: number;

declare const kHIDUsage_Sim_CyclicControl: number;

declare const kHIDUsage_Sim_FlightControlStick: number;

declare const kHIDUsage_Sim_BicycleSimulationDevice: number;

declare const kHIDUsage_Sim_HelicopterSimulationDevice: number;

declare const kHIDUsage_Sim_SubmarineSimulationDevice: number;

declare const kHIDUsage_Sim_FlightSimulationDevice: number;

declare const kHIDUsage_GD_CallActiveLED: number;

declare const kHIDUsage_GD_DockableDevicePrimaryUsageID: number;

declare const kHIDUsage_GD_DockableDeviceVendorID: number;

declare const kSCSICmd_WRITE_SAME_16: number;

declare const kHIDUsage_GD_ControlEnable: number;

declare const kHIDUsage_GD_SystemDisplayRotationLockSliderSwitch: number;

declare const kHIDUsage_GD_ChassisEnclosure: number;

declare const kHIDUsage_GD_CoolantCriticalLevel: number;

declare const kHIDUsage_GD_SensorZone: number;

declare const kHIDUsage_GD_SystemDisplayToggleLCDAutoscale: number;

declare const kHIDUsage_GD_SystemDisplayDual: number;

declare const kHIDUsage_GD_SystemDisplayExternal: number;

declare const kHIDUsage_GD_SystemDisplayInternal: number;

declare const kHIDUsage_GD_SystemHibernate: number;

declare const kHIDUsage_GD_ApplicationDebuggerBreak: number;

declare const kHIDUsage_GD_ApplicationBreak: number;

declare const kHIDUsage_GD_SystemDebuggerBreak: number;

declare const kHIDUsage_GD_SystemSetup: number;

declare const kHIDUsage_GD_SystemUndock: number;

declare const kHIDUsage_GD_SystemDismissNotification: number;

declare const kHIDUsage_GD_SFShiftLockIndicator: number;

declare const kHIDUsage_GD_SFShiftLock: number;

declare const kHIDUsage_GD_PalmTrigger: number;

declare const kHIDUsage_GD_IndexTrigger: number;

declare const kHIDUsage_GD_DPadLeft: number;

declare const kHIDUsage_GD_DPadRight: number;

declare const kHIDUsage_GD_DPadUp: number;

declare const kHIDUsage_GD_SystemMenuDown: number;

declare const kHIDUsage_GD_SystemMenuUp: number;

declare const kHIDUsage_GD_SystemContextMenu: number;

declare const kHIDUsage_GD_SystemSleep: number;

declare const kHIDUsage_GD_SystemPowerDown: number;

declare const kHIDUsage_GD_SystemControl: number;

declare const kHIDUsage_GD_Qw: number;

declare const kSSCPrinterCmd_MODE_SENSE_6: number;

declare const kHIDUsage_GD_Qy: number;

declare const kHIDUsage_Snsr_Data_Location_Latitude: number;

declare const kHIDUsage_GD_Qx: number;

declare const kHIDUsage_GD_FeatureNotification: number;

declare const kHIDUsage_GD_Vno: number;

declare const kHIDUsage_GD_Vbrx: number;

declare const kHIDUsage_GD_Vz: number;

declare const kHIDUsage_GD_Vx: number;

declare const kHIDUsage_GD_MotionWakeup: number;

declare const kHIDUsage_GD_ByteCount: number;

declare const kHIDUsage_GD_CountedBuffer: number;

declare const kHIDUsage_GD_Wheel: number;

declare const kHIDUsage_Sim_Reserved: number;

declare const kHIDUsage_GD_Slider: number;

declare const kHIDUsage_GD_Rz: number;

declare const kHIDUsage_GD_Rx: number;

declare const kHIDUsage_GD_Z: number;

declare const kHIDUsage_GD_X: number;

declare const kHIDUsage_GD_SpatialController: number;

declare const kHIDUsage_GD_SystemMultiAxisController: number;

declare const kHIDUsage_GD_TabletPCSystemControls: number;

declare const kHIDUsage_GD_Keypad: number;

declare const kHIDUsage_GD_Keyboard: number;

declare const kHIDUsage_GD_Joystick: number;

declare const kHIDUsage_GD_Mouse: number;

declare const kHIDUsage_GD_Pointer: number;

declare const kHIDUsage_Undefined: number;

declare const kHIDPage_FIDO: number;

declare const kHIDPage_CameraControl: number;

declare const kHIDPage_MagneticStripeReader: number;

declare const kHIDPage_WeighingDevice: number;

declare const kHIDPage_PowerReserved2: number;

declare const kHIDPage_PowerReserved: number;

declare const kHIDPage_MonitorReserved: number;

declare const kSBCWOCmd_MOVE_MEDIUM: number;

declare const kHIDPage_MonitorEnumerated: number;

declare const kHIDPage_Sensor: number;

declare const kHIDPage_AlphanumericDisplay: number;

declare const kHIDPage_Unicode: number;

declare const kHIDPage_Haptics: number;

declare const kHIDPage_Digitizer: number;

declare const kHIDPage_Game: number;

declare const kHIDPage_GenericDesktop: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilitySublinkProtocol: number;

declare const kIOGraphicsEngineContextVersion: number;

declare const kIOGraphicsEngineContext: number;

declare const kIODisplayNoProductName: number;

declare const kIODisplayOnlyPreferredName: number;

declare const kIOFBCursorMemory: number;

declare const kIOFBShmemCursorNumFramesShift: number;

declare const kIOFBShmemCursorNumFramesMask: number;

declare const kIOFBTenPtOneShmemVersion: number;

declare const kIOFBHardwareCursorInVRAM: number;

declare const kIOFBHardwareCursorActive: number;

declare const kIOFBCursorHWCapable: number;

declare const kIOFBCursorImageNew: number;

declare const kIOFBMaxCursorFrames: number;

declare const kIOFBMaxCursorWidth: number;

declare const kIOFBNumCursorFrames: number;

declare const kIOBlitAllOptions: number;

declare const kIOBlitBeamSyncSpin: number;

declare const kIOBlitBeamSyncAlways: number;

declare const kRangeSupportsSignal_1000_0400_Bit: number;

declare const kIOBlitBeamSync: number;

declare const kIOBlitSurfaceDestination: number;

declare const kIOBlitBeamSyncSwaps: number;

declare const kIOBlitHasCGSSurface: number;

declare const kIOBlitFlushWithSwap: number;

declare const kIOBlitWaitCheck: number;

declare const kIOBlitWaitAll2D: number;

declare const kIOBlitSynchronizeFlushHostWrites: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilitySublinkSpeedMantissaPhase: number;

declare const kIO128RGBAFloatPixelFormat: number;

declare const kIO64RGBAFloatPixelFormat: number;

declare const kIO16LE4444PixelFormat: number;

declare const kIO2vuyPixelFormat: number;

declare const kIOYVYU422PixelFormat: number;

declare const kHIDUsage_FIDO_U2FDevice: number;

declare const kIOYUV411PixelFormat: number;

declare const kIOYVU9PixelFormat: number;

declare const kIOYUVSPixelFormat: number;

declare const kIO24BGRPixelFormat: number;

declare const kIO16LE565PixelFormat: number;

declare const kIO16LE5551PixelFormat: number;

declare const kIO16LE555PixelFormat: number;

declare const kIO8IndexedPixelFormat: number;

declare const kIO2IndexedPixelFormat: number;

declare const kIO1MonochromePixelFormat: number;

declare const kIOBlitSourcePattern: number;

declare const kIOBlitSourceOOLMemory: number;

declare const kIOBlitHighlightOperation: number;

declare const kIOBlitXorOperation: number;

declare const kIOBlitCopyOperation: number;

declare const kIOBlitTypeOperationType0: number;

declare const kIOBlitTypeOperationShift: number;

declare const kIOBlitTypeOperationMask: number;

declare const kIOBlitTypeSourceKeyColorEqual: number;

declare const kIOBlitTypeSourceKeyColorModeMask: number;

declare const kIOBlitTypeScale: number;

declare const kIOBlitTypeColorSpaceConvert: number;

declare const kIOBlitTypeMonoExpand: number;

declare const kIOBlitTypeHideCursor: number;

declare const kIOBlitTypeMoveCursor: number;

declare const kIOBlitTypeCopyRegion: number;

declare const kIOBlitTypeScanlines: number;

declare const kIOBlitTypeRects: number;

declare const kIOBlitTypeVerbMask: number;

declare const kIOAccelPrivateID: number;

declare const kIOAccelVolatileSurface: number;

declare const kSGCCmd_SEND: number;

declare const kFWDontFailOnReset: number;

declare const kFWVectorCommandInterfaceOrdered: number;

declare const kFWCommandInterfaceAbsolute: number;

declare const kFWCommandInterfaceSyncExecute: number;

declare const kFWCommandInterfaceForceCopyAlways: number;

declare const kIOFWSWVers_KPF: number;

declare const kIOFWSpecID_AAPL: number;

declare const kIOFWMustHaveGap63: number;

declare const kIOFWMustNotBeRoot: number;

declare const kIOFWMustBeRoot: number;

declare const kIOFWDisablePhyOnSleep: number;

declare const kIOFWEnableRetryOnAckD: number;

declare const kIOFWDisableAllPhysicalAccess: number;

declare const kIOFWDisablePhysicalAccess: number;

declare const kFWMaxNodeHops: number;

declare const kFWMaxBusses: number;

declare const kFWBusManagerArbitrationTimeoutDuration: number;

declare const kDCLPtrTimeStampOp: number;

declare const kDCLTimeStampOp: number;

declare const kDCLUpdateDCLListOp: number;

declare const kIONetworkDataBufferTypeInternal: number;

declare const kDCLLabelOp: number;

declare const kDCLCallProcOp: number;

declare const kATASMARTOffLineCollectionFatalError: number;

declare const kDCLReceivePacketOp: number;

declare const kDCLReceivePacketStartOp: number;

declare const timingVESA_1600x1200_80hz: number;

declare const kDCLInvalidOp: number;

declare const kFWDCLOpFlagMask: number;

declare const kUSBBillboardVConn3Watt: number;

declare const kFWDCLOpVendorDefinedFlag: number;

declare const kFWDCLOpDynamicFlag: number;

declare const kFWDCLSyBitsEvent: number;

declare const kFWIsochChannelDoNotResumeOnWake: number;

declare const kFWIsochSy: number;

declare const kFWIsochTCodePhase: number;

declare const kFWIsochChanNumPhase: number;

declare const kFWIsochChanNum: number;

declare const kMMCCmd_PAUSE_RESUME: number;

declare const kINQUIRY_Byte7_WBUS16_Bit: number;

declare const kHIDUsage_PID_ActuatorOverrideSwitch: number;

declare const kFWIsochTagPhase: number;

declare const kFWIsochDataLengthPhase: number;

declare const kConfigUnitSWVersIIDC101: number;

declare const kConfigUnitSWVersMacintosh10: number;

declare const kConfigUnitSpec1394TA1: number;

declare const kFWBIBLinkSpeed: number;

declare const kFWBIBGenerationPhase: number;

declare const kFWBIBGeneration: number;

declare const kHIDUsage_AD_AlphanumericDisplay: number;

declare const kFWBIBMaxROM: number;

declare const kFWBIBMaxRec: number;

declare const kFWBIBBmc: number;

declare const kHIDUsage_Snsr_Data_Time_Timestamp: number;

declare const kFWBIBIsc: number;

declare const kFWBIBCmc: number;

declare const kHIDUsage_BS_SerialNumber: number;

declare const kIOBlitUnlockWithSwap: number;

declare const kFWBIBNodeUniqueIDLoAddress: number;

declare const kFWBIBNodeUniqueIDHiAddress: number;

declare const kFWBIBBusNameAddress: number;

declare const kFWBIBHeaderAddress: number;

declare const kFWBroadcastAddress: number;

declare const kFWLocalBusAddress: number;

declare const kFWLocalBusID: number;

declare const kFWAddressNodeIDPhase: number;

declare const kFWAddressBusIDPhase: number;

declare const kFWAddressBusID: number;

declare const kFWCSRStateGone: number;

declare const kFCPCommandAddress: number;

declare const kConfigBIBHeaderAddress: number;

declare const kConfigROMBaseAddress: number;

declare const kCSRChannelsAvailable31_0: number;

declare const kCSRBandwidthAvailable: number;

declare const kCSRBusyTimeout: number;

declare const kCSRMessageResponseAddress: number;

declare const kCSRClockInfo3Address: number;

declare const kCSRClockInfo1Address: number;

declare const kCSRClockInfo0Address: number;

declare const kCSRClockStrobeArrivedMidAddress: number;

declare const kHIDUsage_Snsr_Data_Light_Chromaticity: number;

declare const kCSRClockTickPeriodLoAddress: number;

declare const kCSRClockTickPeriodMidAddress: number;

declare const kCSRClockValueMidAddress: number;

declare const kCSRInterruptMaskAddress: number;

declare const kCSRMemoryBoundLoAddress: number;

declare const kCSRMemoryBaseLoAddress: number;

declare const kHIDUsage_Csmr_ACDownload: number;

declare const kCSRIndirectDataAddress: number;

declare const kCSRIndirectAddressAddress: number;

declare const kCSRResetStartAddress: number;

declare const kCSRStateSetAddress: number;

declare const kCSRPrivateSpaceBaseAddressHi: number;

declare const kCSRInitialMemorySpaceBaseAddressLo: number;

declare const kCSRInitialMemorySpaceBaseAddressHi: number;

declare const kCSRNodeID: number;

declare const kConfigLeafDirCRCPhase: number;

declare const kHIDUsage_MSR_Track1Data: number;

declare const kConfigLeafDirCRC: number;

declare const kConfigLeafDirLengthPhase: number;

declare const kConfigEntryValuePhase: number;

declare const kConfigEntryKeyValue: number;

declare const kConfigEntryKeyTypePhase: number;

declare const kConfigEntryKeyType: number;

declare const kConfigROMCRCValuePhase: number;

declare const kConfigROMCRCLengthPhase: number;

declare const kConfigROMCRCLength: number;

declare const kCSRStateStateDead: number;

declare const kHIDUsage_KeyboardDeleteOrBackspace: number;

declare const kCSRStateStateInitializing: number;

declare const kCSRStateStateRunning: number;

declare const kCSRStateStatePhase: number;

declare const kCSRStateELog: number;

declare const kCSRStateBusDependPhase: number;

declare const kCSRStateUnitDependPhase: number;

declare const kCSRStateUnitDepend: number;

declare const kHIDUsage_PD_OverCharged: number;

declare const kConfigSBP2MAO: number;

declare const kConfigSBP2LUN: number;

declare const kConfigUnitSwVersionKey: number;

declare const kConfigUnitSpecIdKey: number;

declare const kConfigNodeUnitsExtentKey: number;

declare const kConfigNodeUniqueIdKey: number;

declare const kConfigNodeCapabilitiesKey: number;

declare const kConfigNodeSpecIdKey: number;

declare const kConfigNodeHwVersionKey: number;

declare const kConfigModuleSwVersionKey: number;

declare const kConfigModuleHwVersionKey: number;

declare const kConfigTextualDescriptorKey: number;

declare const kFWAckDataError: number;

declare const kFWAckComplete: number;

declare const kCSRStateBusDepend: number;

declare const kFWAckTimeout: number;

declare const kFWResponseBusResetError: number;

declare const kFWResponseAddressError: number;

declare const kFWResponseTypeError: number;

declare const kFWAVCProducerMode_TOSS: number;

declare const kFWAVCConsumerMode_LAST: number;

declare const kFWAVCConsumerMode_MORE: number;

declare const kFWAVCStateDeviceRemoved: number;

declare const kFWAVCStatePlugDisconnected: number;

declare const kFWAVCStatePlugReconnected: number;

declare const kFWAVCStateBusResumed: number;

declare const kFWAVCStateBusSuspended: number;

declare const kFWAVCAsyncPlug27: number;

declare const kSBCWOCmd_PERSISTENT_RESERVE_IN: number;

declare const kFWAVCAsyncPlug26: number;

declare const kFWAVCAsyncPlug24: number;

declare const kFWAVCAsyncPlug22: number;

declare const kFWAVCAsyncPlug19: number;

declare const kFWAVCAsyncPlug17: number;

declare const kFWAVCAsyncPlug16: number;

declare const kFWAVCAsyncPlug10: number;

declare const kFWAVCAsyncPlug9: number;

declare const kFWAVCAsyncPlug5: number;

declare const kFWAVCAsyncPlug4: number;

declare const kFWAVCAsyncPlug0: number;

declare const kIOAudioChannelLabel_Discrete_65535: number;

declare const kHIDUsage_Csmr_ACBold: number;

declare const kIOAudioChannelLabel_Discrete_14: number;

declare const kIOAudioChannelLabel_Discrete_13: number;

declare const kIOAudioChannelLabel_Discrete_12: number;

declare const kIOAudioChannelLabel_Discrete_10: number;

declare const kIOAudioChannelLabel_Discrete_8: number;

declare const kIOAudioChannelLabel_Discrete_7: number;

declare const kIOAudioChannelLabel_Discrete_5: number;

declare const kIOAudioChannelLabel_Discrete_4: number;

declare const kIOAudioChannelLabel_Discrete_3: number;

declare const kIOAudioChannelLabel_Discrete_2: number;

declare const kIOAudioChannelLabel_Discrete_1: number;

declare const kIOAudioChannelLabel_Discrete: number;

declare const kIOAudioChannelLabel_ForeignLanguage: number;

declare const kUSBFeatureU1Enable: number;

declare const kIOAudioChannelLabel_ClickTrack: number;

declare const kIOAudioChannelLabel_HeadphonesRight: number;

declare const kIOAudioChannelLabel_HeadphonesLeft: number;

declare const kIOAudioChannelLabel_XY_Y: number;

declare const kIOAudioChannelLabel_XY_X: number;

declare const kMMCDeviceTrayMask: number;

declare const kIOAudioChannelLabel_MS_Side: number;

declare const kIOAudioChannelLabel_MS_Mid: number;

declare const kSSCSeqCmd_RECEIVE_DIAGNOSTICS_RESULTS: number;

declare const kIOAudioChannelLabel_Ambisonic_Z: number;

declare const kIOAudioChannelLabel_Ambisonic_Y: number;

declare const kIOAudioChannelLabel_CenterTopRear: number;

declare const kIOAudioChannelLabel_CenterTopMiddle: number;

declare const kIOAudioChannelLabel_LeftTopMiddle: number;

declare const kIOAudioChannelLabel_RightTopFront: number;

declare const kIOPMUnidleDevice: number;

declare const kIOAudioChannelLabel_CenterTopFront: number;

declare const kHIDUsage_KeyboardI: number;

declare const kIOAudioChannelLabel_Haptic: number;

declare const kIOAudioChannelLabel_Mono: number;

declare const kIOAudioChannelLabel_Narration: number;

declare const kIOAudioChannelLabel_HearingImpaired: number;

declare const kIOHIDSetGlobalEventFlags: number;

declare const kIOAudioChannelLabel_RightTotal: number;

declare const kIOAudioChannelLabel_LeftTotal: number;

declare const kIOAudioChannelLabel_LFE2: number;

declare const kIOAudioChannelLabel_RightWide: number;

declare const kIOAudioChannelLabel_RearSurroundRight: number;

declare const kIOAudioChannelLabel_RearSurroundLeft: number;

declare const kIOAudioChannelLabel_VerticalHeightRight: number;

declare const kIOAudioChannelLabel_VerticalHeightCenter: number;

declare const kIOAudioChannelLabel_VerticalHeightLeft: number;

declare const kIOAudioChannelLabel_TopCenterSurround: number;

declare const kIOAudioChannelLabel_RightSurroundDirect: number;

declare const kIOAudioChannelLabel_LeftSurroundDirect: number;

declare const kIOAudioChannelLabel_RightCenter: number;

declare const kIOAudioChannelLabel_LFEScreen: number;

declare const kHIDUsage_Button_248: number;

declare const kIOAudioChannelLabel_Right: number;

declare const kIOAudioChannelLabel_Left: number;

declare const kIOAudioChannelLabel_UseCoordinates: number;

declare const kIOAudioChannelLabel_Unused: number;

declare const kIOAudioChannelLabel_Unknown: number;

declare const PROCESSOR_GENERAL: number;

declare const kHIDUsage_Csmr_SubChannelDecrement: number;

declare const PROCESSOR_UNDEFINED: number;

declare const EMBEDDED_DSS_AUDIO: number;

declare const EMBEDDED_CABLE_TUNER_AUDIO: number;

declare const EMBEDDED_TV_TUNER_AUDIO: number;

declare const EMBEDDED_VIDEO_DISC_AUDIO: number;

declare const kHIDUsage_BCS_Wand: number;

declare const EMBEDDED_PHONOGRAPH: number;

declare const EMBEDDED_ANALOG_TAPE: number;

declare const EMBEDDED_DAT: number;

declare const EMBEDDED_LEVEL_CALIBRATION_NOISE_SOURCE: number;

declare const EXTERNAL_ADAT: number;

declare const EXTERNAL_1394_DV_STREAM_SOUNDTRACK: number;

declare const kIOUSBDeviceStatusU1Enable: number;

declare const EXTERNAL_1394_DA_STREAM: number;

declare const kHIDUsage_Csmr_Eject: number;

declare const EXTERNAL_LEGACY_AUDIO_CONNECTOR: number;

declare const EXTERNAL_LINE_CONNECTOR: number;

declare const EXTERNAL_ANALOG_CONNECTOR: number;

declare const EXTERNAL_UNDEFINED: number;

declare const kHIDUsage_Button_153: number;

declare const BIDIRECTIONAL_ECHO_SUPPRESSING_SPEAKERPHONE: number;

declare const BIDIRECTIONAL_SPEAKERPHONE_NO_ECHO_REDX: number;

declare const BIDIRECTIONAL_HANDSET: number;

declare const BIDIRECTIONAL_UNDEFINED: number;

declare const kHIDUsage_Keyboard1: number;

declare const OUTPUT_COMMUNICATION_SPEAKER: number;

declare const OUTPUT_ROOM_SPEAKER: number;

declare const OUTPUT_DESKTOP_SPEAKER: number;

declare const OUTPUT_HEADPHONES: number;

declare const OUTPUT_SPEAKER: number;

declare const OUTPUT_UNDEFINED: number;

declare const INPUT_PROCESSING_MICROPHONE_ARRAY: number;

declare const INPUT_MICROPHONE_ARRAY: number;

declare const kSMCCmd_REQUEST_VOLUME_ELEMENT_ADDRESS: number;

declare const INPUT_OMNIDIRECTIONAL_MICROPHONE: number;

declare const kIOAudioDeviceTransportTypeHdmi: number;

declare const kIOAudioDeviceTransportTypeDisplayPort: number;

declare const kIOAudioDeviceTransportTypeOther: number;

declare const kIOAudioDeviceTransportTypeWireless: number;

declare const kUSBApplicationSpecificInterfaceClass: number;

declare const kIOAudioDeviceTransportTypeNetwork: number;

declare const kHIDUsage_Button_77: number;

declare const kIOAudioDeviceTransportTypePCI: number;

declare const kIOAudioDeviceTransportTypeBuiltIn: number;

declare const kIOAudioLevelControlNegativeInfinity: number;

declare const kIOAudioClockSelectorTypeOther: number;

declare const kHIDUsage_MSR_Track2Length: number;

declare const kIOAudioClockSelectorTypeVideo: number;

declare const kIOAudioClockSelectorTypeSMPTE: number;

declare const kIOAudioClockSelectorTypeADATOptical: number;

declare const kRSCOne: number;

declare const kIOAudioClockSelectorTypeAESEBU: number;

declare const kIOAudioClockSelectorTypeInternal: number;

declare const kIOAudioStreamNumericRepresentationSignedInt: number;

declare const kIOAudioStreamSampleFormatTimeCode: number;

declare const kIOAudioStreamSampleFormat1937MPEG2: number;

declare const kIOAudioStreamSampleFormat1937MPEG1: number;

declare const kIOAudioStreamSampleFormatAC3: number;

declare const kIOAudioStreamSampleFormatMPEG: number;

declare const kIOAudioSelectorControlSelectionValueLine: number;

declare const kIOAudioSelectorControlSelectionValueInternalMicrophone: number;

declare const kIOAudioSelectorControlSelectionValueHeadphones: number;

declare const kIOAudioSelectorControlSelectionValueExternalSpeaker: number;

declare const kIOAudioControlChannelIDDefaultSurroundLeft: number;

declare const kIOAudioControlChannelIDDefaultRearCenter: number;

declare const kIOAudioControlChannelIDDefaultFrontRightCenter: number;

declare const kIOAudioControlChannelIDDefaultSub: number;

declare const kIOAudioControlChannelIDDefaultRightRear: number;

declare const kIOAudioControlChannelIDDefaultCenter: number;

declare const kIOAudioControlChannelIDDefaultLeft: number;

declare const kIOAudioControlChannelNumberInactive: number;

declare const kIOAudioControlUsagePassThru: number;

declare const kIOAudioControlUsageOutput: number;

declare const kIOAudioSelectorControlSubTypeChannelLevelInstrumentLevel: number;

declare const kIOAudioSelectorControlSubTypeChannelLevelMicLevel: number;

declare const kIOAudioSelectorControlSubTypeChannelLevelMinus10dBV: number;

declare const kIOAudioSelectorControlSubTypeChannelLevelPlus4dBu: number;

declare const kIOAudioSelectorControlSubTypeDestination: number;

declare const kIOAudioSelectorControlSubTypeInput: number;

declare const kIOAudioSelectorControlSubTypeOutput: number;

declare const kIOAudioToggleControlSubTypePhantomPower: number;

declare const kIOAudioToggleControlSubTypeiSubAttach: number;

declare const kIOAudioToggleControlSubTypeLFEMute: number;

declare const kIOAudioToggleControlSubTypeSolo: number;

declare const kHIDUsage_GD_WirelessRadioButton: number;

declare const kIOAudioLevelControlSubTypePRAMVolume: number;

declare const kIOAudioControlTypeJack: number;

declare const kHIDPage_GenericDeviceControls: number;

declare const kIOAudioInputPortSubTypeSPDIF: number;

declare const kIOAudioInputPortSubTypeCD: number;

declare const kHIDUsage_Sim_Weapons: number;

declare const kIOAudioInputPortSubTypeExternalMicrophone: number;

declare const kIOAudioInputPortSubTypeInternalMicrophone: number;

declare const kIOAudioOutputPortSubTypeSPDIF: number;

declare const kIOAudioOutputPortSubTypeLine: number;

declare const kIOAudioOutputPortSubTypeHeadphones: number;

declare const kIOAudioOutputPortSubTypeInternalSpeaker: number;

declare const kIOAudioPortTypeProcessing: number;

declare const kHIDUsage_BD_BrailleTopControls: number;

declare const kIOAudioPortTypeOutput: number;

declare const kIOAudioDeviceCanBeDefaultOutput: number;

declare const kIOAudioDeviceCanBeDefaultInput: number;

declare const kIOAudioTimeStampSMPTETimeValid: number;

declare const kIOAudioTimeStampHostTimeValid: number;

declare const kIOAudioTimeStampSampleTimeValid: number;

declare const kIOAudioSMPTETimeType50: number;

declare const kIOAudioSMPTETimeType5994: number;

declare const kIOAudioSMPTETimeType30: number;

declare const kOSClassCanRemote: number;

declare const kMMCCmd_GET_PERFORMANCE: number;

declare const kIORPCMessageOnqueue: number;

declare const kIORPCMessageObjectRefs: number;

declare const kIORPCMessageLocalHost: number;

declare const kIORPCMessageRemote: number;

declare const kIORPCVersion190615Reply: number;

declare const kIOCatalogModuleTerminate: number;

declare const kIOCatalogModuleUnload: number;

declare const kIOCatalogGetROMMkextList: number;

declare const kIOCatalogGetCacheMissList: number;

declare const kIOCatalogGetModuleDemandList: number;

declare const kIOCatalogGetContents: number;

declare const kIOCatalogResetDriversNoMatch: number;

declare const kHIDNoInterfaceProtocol: number;

declare const kIOCatalogKextdFinishedLaunching: number;

declare const kHIDUsage_KeyboardBackslash: number;

declare const kIOCatalogStartMatching__Removed: number;

declare const kMMCCmd_READ_DISC_INFORMATION: number;

declare const mPlaneBytes: number;

declare const kHIDUsage_GD_WirelessRadioLED: number;

declare const kIOMediumOptionHalfDuplex: number;

declare const kIOAudioBuiltInSystemClockDomain: number;

declare const kHIDUsage_Sprt_11Iron: number;

declare const cscGrayPage: number;

declare const kSGCCmd_MODE_SELECT_10: number;

declare const kHIDUsage_Tfon_PhoneKey5: number;

declare const kATAIdentifyCurrentSectors: number;

declare const kSCSICmd_PREVENT_ALLOW_MEDIUM_REMOVAL: number;

declare const kHIDUsage_BD_BrailleLeftControls: number;

declare const kSSCSeqCmd_REPORT_LUNS: number;

declare const kUSB150mAAvailable: number;

declare const kHIDUsage_BCS_EnableCheckDigitTransmit: number;

declare const kHIDUsage_Sprt_LoftWedge: number;

declare const kSCSICmd_WRITE_6: number;

declare const kATAOperationTypePowerManagement: number;

declare const kSSCSeqCmd_COMPARE: number;

declare const kHIDUsage_BD_BrailleKeyboardDot8: number;

declare const kFWSBP2AbortTaskSet: number;

declare const kIOI2CBusTypeI2C: number;

declare const kSENSE_KEY_ILLEGAL_REQUEST: number;

declare const kHIDUsage_BCS_PDF_417: number;

declare const kHIDUsage_Keypad9: number;

declare const kIOAudioLevelControlSubTypeVolume: number;

declare const kHIDUsage_BS_ConnectionToSMBus: number;

declare const kHIDUsage_Csmr_RepeatFromMark: number;

declare const kUSBHIDClass: number;

declare const kIOAudioClockSelectorTypeControl: number;

declare const kIOStreamMemoryTypeBufferControl: number;

declare const kXHCISSRootHubAddress: number;

declare const kHIDUsage_Keyboard9: number;

declare const kIOUSBInterfaceStatusRemoteWakeCapable: number;

declare const kIOAudioControlTypeLevel: number;

declare const kHIDUsage_VR_Reserved: number;

declare const kSCSICmd_XPWRITE: number;

declare const kUSBAnyDesc: number;

declare const kIOPMDriverAssertionForceWakeupBit: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilitySublinkReservedPhase: number;

declare const kHIDUsage_Tfon_PhoneKey4: number;

declare const EMBEDDED_RADIO_TRANSMITTER: number;

declare const kATAWriteCacheEnabledBit: number;

declare const kHIDUsage_Snsr_Property_Minimum: number;

declare const kSPCCmd_SEND_DIAGNOSTICS: number;

declare const kHIDUsage_Snsr_Event_SensorState_Initializing: number;

declare const kHIDUsage_Csmr_ChannelFront: number;

declare const kHIDUsage_Csmr_MediaSelectWWW: number;

declare const kHIDUsage_BS_ThermistorHot: number;

declare const kINQUIRY_Page83_ProtocolIdentifierValidMask: number;

declare const kHIDUsage_KeyboardErrorUndefined: number;

declare const kHIDUsage_BCS_Aiming_PointerMide: number;

declare const kSPCProcCmd_RESERVE_6: number;

declare const kHIDUsage_Snsr_Property_ConnectionType_Attached: number;

declare const kHIDUsage_PID_FadeTime: number;

declare const kHIDUsage_Snsr_Property_Light: number;

declare const kHIDUsage_Snsr_Data_Location_DifferentialGPSDataAge: number;

declare const kFWIsochSyPhase: number;

declare const kATAIdentifyExtendedInfoSupport: number;

declare const kHIDUsage_PID_RAM_PoolAvailable: number;

declare const kSBCCmd_RESERVE_10: number;

declare const kHIDUsage_Button_39: number;

declare const kHIDUsage_Sim_ElevatorTrim: number;

declare const kHIDUsage_Snsr_Data_Time_DayOfWeekTuesday: number;

declare const kIO24RGBPixelFormat: number;

declare const kCSRMessageRequestAddress: number;

declare const kCSRArgumentHiAddress: number;

declare const kHIDUsage_BS_BatteryPresent: number;

declare const kHIDUsage_Snsr_Data_Orientation_Quaternion: number;

declare const kHIDUsage_Csmr_SelectDisc: number;

declare const kHIDUsage_KeyboardF24: number;

declare const kINQUIRY_Byte3_HISUP_Mask: number;

declare const kUSBPeriodicInterruptUsageType: number;

declare const kHIDUsage_Csmr_ACRedoOrRepeat: number;

declare const EXTERNAL_DIGITAL_AUDIO_INTERFACE: number;

declare const kIOPMBatteryCharging: number;

declare const kClearDeviceFeature: number;

declare const kSBCCmd_READ_LONG: number;

declare const kSBCCmd_LOG_SELECT: number;

declare const kHIDUsage_Snsr_Property_Scanner_NFCSentenceSend: number;

declare const kDVDBookTypeHDR: number;

declare const kConfigRootDirectoryKey: number;

declare const kHIDUsage_Dig_Digitizer: number;

declare const kMMCCmd_READ_CD: number;

declare const kHIDRtOutputReport: number;

declare const kIOBlitSourceOOLPattern: number;

declare const IOPMClockNormal: number;

declare const kFWCommandInterfaceForceNoCopy: number;

declare const kSENSE_RESPONSE_CODE_Mask: number;

declare const kINQUIRY_Page83_IdentifierTypeMask: number;

declare const kHIDUsage_Button_68: number;

declare const kHIDUsage_Csmr_ALControlPanel: number;

declare const kHIDUsage_Button_215: number;

declare const kFWSBP2DontSynchronizeMgmtAgent: number;

declare const kSCSICmd_PREFETCH_16: number;

declare const kIOAudioClockSelectorTypeADAT9Pin: number;

declare const kSGCCmd_RELEASE_6: number;

declare const kHIDUsage_BS_RemainingTimeLimitExpired: number;

declare const IOPMAckImplied: number;

declare const kMMCCmd_READ_FORMAT_CAPACITIES: number;

declare const kHIDUsage_PD_LowVoltageTransfer: number;

declare const kSCSICmd_XDWRITE: number;

declare const kBuiltInConnection: number;

declare const kHIDUsage_Snsr_Data_Orientation_HeadingXAxis: number;

declare const kIONetworkFeatureHWTimeStamp: number;

declare const kIONetworkLinkActive: number;

declare const kHIDUsage_Csmr_ALCalendarOrSchedule: number;

declare const kIOVideoFeatureControlClassIDPowerLineFrequency: number;

declare const kSCSICmd_ERASE_12: number;

declare const kHIDUsage_Dig_Height: number;

declare const kDisplayModeIDReservedBase: number;

declare const kHIDUsage_Snsr_Property_ConnectionType: number;

declare const kHIDUsage_Button_81: number;

declare const kIO2IndexedGrayPixelFormat: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilitySublinkDirectionRx: number;

declare const kHIDUsage_KeyboardOpenBracket: number;

declare const kSyncFrame: number;

declare const kIOMediumEthernet100BaseFX: number;

declare const kSCSICmd_LOAD_UNLOAD_MEDIUM: number;

declare const kHIDUsage_PD_HighVoltageTransfer: number;

declare const kHIDPage_MonitorVirtual: number;

declare const cscGetDDCBlock: number;

declare const kHIDUsage_AD_FontData: number;

declare const kATAIdentifyCurrentHeads: number;

declare const kINQUIRY_Byte3_AERC_Bit: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilitySublinkReserved: number;

declare const timingVESA_1600x1200_65hz: number;

declare const kHIDUsage_BCS_MirrorSpeedControl: number;

declare const kSBCModePageCaching_FSW_Bit: number;

declare const kHIDUsage_PD_ActivePower: number;

declare const kHIDUsage_Csmr_KeyboardInputAssistAccept: number;

declare const kPowerStateFullPower: number;

declare const kFWAVCAsyncPlug18: number;

declare const kHIDUsage_Button_116: number;

declare const kHIDUsage_Csmr_MediaSelectCable: number;

declare const kUSBATMNetworkingSubClass: number;

declare const kHIDUsage_AD_CharacterReport: number;

declare const kSCSIProtocolIdentifier_SSA: number;

declare const kSPCProcCmd_LOG_SELECT: number;

declare const kConfigNodeMemoryExtentKey: number;

declare const kHIDUsage_Csmr_ACDemote: number;

declare const kHIDUsage_Csmr_AMOrPM: number;

declare const cscSetHardwareCursor: number;

declare const kUSPrintingClassGePortStatus: number;

declare const kUSBFeatureDeviceRemoteWakeup: number;

declare const kIOPMSleep: number;

declare const kHIDUsage_Tfon_PhoneDirectory: number;

declare const kHIDUsage_BCS_PolarityNormalBarCode: number;

declare const kHIDUsage_BCS_CheckEnable4DigitPrice: number;

declare const kIOAudioDeviceTransportTypeVirtual: number;

declare const kHIDUsage_Dig_ContactCount: number;

declare const kSCCCmd_REPORT_LUNS: number;

declare const kIOBlitTypeCopyRects: number;

declare const kUSBCompositeSubClass: number;

declare const kHIDUsage_PID_Normal: number;

declare const kHIDUsage_Snsr_Property_Resolution: number;

declare const kHIDRqGetIdle: number;

declare const kIOPMClosedClamshell: number;

declare const IOPMPowerOn: number;

declare const kHIDUsage_Snsr_Data_Mechanical_BooleanSwitchArrayStates: number;

declare const kFWMaxNodesPerBus: number;

declare const kIOAudioSelectorControlSubTypeClockSource: number;

declare const kHIDUsage_GD_SystemMenuSelect: number;

declare const kConfigNodeVendorIdKey: number;

declare const kSSCPrinterCmd_RECOVER_BUFFERED_DATA: number;

declare const kHIDUsage_BCS_CheckDigitEnableInterleaved2of5USS: number;

declare const kHIDUsage_GD_SystemSpeakerMute: number;

declare const kHIDUsage_LED_Compose: number;

declare const kSBCModePageCaching_ABPF_Bit: number;

declare const kSBCCmd_LOCK_UNLOCK_CACHE: number;

declare const IOPMNotAttainable: number;

declare const kIOUSBEndpointDescriptorTransferTypeBulk: number;

declare const kHIDUsage_LED_LowCutFilter: number;

declare const kSPCCmd_COPY_AND_VERIFY: number;

declare const kHIDUsage_KeyboardLeftControl: number;

declare const kHIDPage_Simulation: number;

declare const kDigitalSignalMask: number;

declare const kIOPSFamilyCodeUSBUnknown: number;

declare const kConfigUnitDependentInfoKey: number;

declare const kFWSBP2NormalCommandReset: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilitySublinkAsymmetric: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilitySublinkLSEKbits: number;

declare const kIORPCMessageSimpleReply: number;

declare const kHIDUsage_PID_CustomForceDataOffset: number;

declare const kIOBlitReferenceSource: number;

declare const kUSBPrintingInterfaceClass: number;

declare const kIOAudioSelectorControlSelectionValueExternalMicrophone: number;

declare const kFWBIBCycClkAcc: number;

declare const timingVESA_640x480_60hz: number;

declare const kHIDUsage_PID_DC_StopAllEffects: number;

declare const kDCLSendPacketOp: number;

declare const kHIDUsage_Csmr_ACMirrorVertical: number;

declare const kIOHIDSetCursorPosition: number;

declare const kMMCCmd_MODE_SELECT_10: number;

declare const kHIDUsage_Sprt_StickFollowThrough: number;

declare const kHIDUsage_Game_RollRightOrLeft: number;

declare const kIOVideoDeviceMethodSetMode: number;

declare const kDVDFeaturesRandomWriteableMask: number;

declare const kHIDUsage_BCS_LaserOnTime: number;

declare const kATAIdentifyLBACapacity: number;

declare const kMirrorHAlignCenterMirrorMask: number;

declare const kHIDUsage_Snsr_Electrical_Current: number;

declare const kHIDUsage_LED_PaperOut: number;

declare const kHIDUsage_PD_ChangedStatus: number;

declare const kIORPCMessageIDKernel: number;

declare const kHIDUsage_PID_DeadBand: number;

declare const kIOVideoFeatureControlClassIDExposure: number;

declare const kMMCCmd_READ_TOC_PMA_ATIP: number;

declare const kHIDUsage_LED_SendCalls: number;

declare const kIOI2CBusTypeDisplayPort: number;

declare const kSPCCmd_INQUIRY: number;

declare const kHIDUsage_Csmr_ACKeyboardLayoutSelect: number;

declare const kHIDUsage_LED_SlowBlinkOffTime: number;

declare const kFWSBP2LogicalUnitReset: number;

declare const kHIDUsage_BCS_UPC_EAN: number;

declare const kSCSICmd_CLOSE_TRACK_SESSION: number;

declare const kSBCModePageFlexibleDisk_MO_Bit: number;

declare const kHIDUsage_BS_DesignCapacity: number;

declare const kHIDUsage_BCS_RawScannedDataReport: number;

declare const kSCSICmd_MODE_SELECT_10: number;

declare const kHIDUsage_Csmr_ALLANOrWANBrowser: number;

declare const kRangeSupportsSeperateSyncsBit: number;

declare const kSBCWOCmd_SEARCH_DATA_LOW_10: number;

declare const kIOAudioControlChannelIDDefaultLeftRear: number;

declare const BIDIRECTIONAL_ECHO_CANCELING_SPEAKERPHONE: number;

declare const kUSBAsynchronousIsocSyncType: number;

declare const kHIDUsage_LED_Power: number;

declare const kMMCCmd_SEARCH_DATA_HIGH_10: number;

declare const kCSRClockValueHiAddress: number;

declare const kFWCSRStateCMstr: number;

declare const kSCSICmd_MODE_SELECT_6: number;

declare const kCSRTestStartAddress: number;

declare const kSCSIServiceAction_GET_LBA_STATUS: number;

declare const kHIDUsage_Csmr_ALCheckbookOrFinance: number;

declare const kHIDUsage_Csmr_ACDesktopShowAllWindows: number;

declare const kUSBMaxHSIsocFrameCount: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilitySublinkMinSpeedId: number;

declare const kHIDUsage_LED_FastBlinkOffTime: number;

declare const kHIDUsage_Game_PointofView: number;

declare const kHIDUsage_Snsr_Undefined: number;

declare const kDPMSSyncOff: number;

declare const kHIDUsage_GD_SystemWarmRestart: number;

declare const kUSBEndpointTransferTypeUCMask: number;

declare const kINQUIRY_PERIPHERAL_TYPE_ProcessorSPCDevice: number;

declare const kSMCCmd_PERSISTENT_RESERVE_IN: number;

declare const kHIDUsage_MSR_TrackJISLength: number;

declare const kHIDUsage_Tfon_Phone: number;

declare const kHIDUsage_Snsr_Orientation_DistanceD: number;

declare const kHIDUsage_LED_Stereo: number;

declare const kHIDUsage_Sim_FlareRelease: number;

declare const kHIDUsage_Button_173: number;

declare const kINQUIRY_PERIPHERAL_TYPE_OpticalCardReaderOCRWDevice: number;

declare const kHIDUsage_PD_PowerSummaryID: number;

declare const kIOMediumIEEE80211DS1: number;

declare const kHIDUsage_Button_3: number;

declare const kIOMediumEthernet: number;

declare const kHIDUsage_Csmr_ACInsertFile: number;

declare const kMirrorVAlignCenterMirrorMask: number;

declare const kIOMediumEthernet1000BaseCX: number;

declare const kIOAudioSelectorControlSubTypeChannelLevelMinus20dBV: number;

declare const kHIDUsage_Csmr_ACGoTo: number;

declare const cscGetEntries: number;

declare const kHIDUsage_WD_ScaleScaleClassIMetricCL: number;

declare const kHIDUsage_BS_InternalChargeController: number;

declare const kHIDUsage_Button_58: number;

declare const kIOVideoFeatureControlClassIDPan: number;

declare const kHIDUsage_GD_Qz: number;

declare const kIOPSFamilyCodeUSBChargingPortDownstream: number;

declare const cscGetPageCnt: number;

declare const kHIDUsage_Snsr_Motion_Gyrometer: number;

declare const kSCSICmd_STOP_PLAY_SCAN: number;

declare const kSecondDepthMode: number;

declare const kPMSetProcessorSpeed: number;

declare const kHIDUsage_KeyboardInternational3: number;

declare const kIONetworkLinkNoNetworkChange: number;

declare const kIOCatalogRemoveKernelLinker__Removed: number;

declare const kHIDUsage_BCS_Code128: number;

declare const kMMCCmd_PLAY_AUDIO_TRACK_INDEX: number;

declare const kIOSystemLoadAdvisoryLevelGreat: number;

declare const kHIDUsage_Button_241: number;

declare const kExtFieldsValidMask: number;

declare const kSCSICmd_READ_12: number;

declare const kIOAudioSMPTETimeRunning: number;

declare const kSCSICmd_PLAY_CD: number;

declare const kUSBRqGetDescriptor: number;

declare const kHIDUsage_Button_108: number;

declare const kINQUIRY_Page83_AssociationMask: number;

declare const kRangeSupportsCompositeSyncMask: number;

declare const kHIDUsage_Csmr_ACPrintPreview: number;

declare const kSBCCmd_SEND_DIAGNOSTICS: number;

declare const kMMCCmd_PLAY_AUDIO_MSF: number;

declare const kHIDUsage_LED_IndicatorOff: number;

declare const kIOPMPowerButton: number;

declare const kIOAudioChannelLabel_RightTopRear: number;

declare const kFixedDeviceMask: number;

declare const kSBCModePageCaching_DRA_Mask: number;

declare const kIONUCGetNetworkDataCapacityIndex: number;

declare const kHIDUsage_KeyboardB: number;

declare const kSBCModePageFlexibleDisk_MO_Mask: number;

declare const kHIDUsage_Csmr_ACSubscript: number;

declare const kHIDUsage_Csmr_ACSendOrReceive: number;

declare const kRangeSupportsVSyncSerrationMask: number;

declare const kHIDUsage_Button_34: number;

declare const kHIDUsage_Snsr_Property_PowerState_D2_Standby: number;

declare const kHIDUsage_BCS_CheckDigitEnableTwoMSIPlessey: number;

declare const kHIDUsage_Tfon_Park: number;

declare const kHIDUsage_Csmr_BassIncrement: number;

declare const kHIDUsage_Csmr_ALNetworkConference: number;

declare const kIONetworkFeatureHardwareVlan: number;

declare const kHIDUsage_BCS_SoundGoodReadBeep: number;

declare const kSCSICmd_READ_16: number;

declare const kHIDUsage_Snsr_Data_Orientation_MagneticFluxYAxis: number;

declare const kSSCSeqCmd_PERSISTENT_RESERVE_IN: number;

declare const kHIDUsage_Csmr_ChannelUnknown: number;

declare const cscSetDefaultMode: number;

declare const kHIDUsage_Csmr_ModeStep: number;

declare const kDVDBookTypeHDROM: number;

declare const kUSBSuperSpeedLTMCapable: number;

declare const kUSBMassStorageClass: number;

declare const kHIDUsage_Snsr_Modifier_ChangeSensitivityPercentRange: number;

declare const kIONetworkDataAccessTypeRead: number;

declare const kESCSixMSB3: number;

declare const kUSBStream0: number;

declare const kHIDUsage_Csmr_ALPowerStatus: number;

declare const kINQUIRY_PageB1_PageCode: number;

declare const kHIDUsage_KeyboardReturn: number;

declare const kC0DataMaxStringLen: number;

declare const kIOPMHighestState: number;

declare const kIOPMNextHigherState: number;

declare const kIOAudioClockSelectorTypeTOSLink: number;

declare const kIO32RGBAPixelFormat: number;

declare const kSBCWOCmd_MODE_SENSE_10: number;

declare const kDVIPowerSwitchFeature: number;

declare const kHIDUsage_Snsr_Orientation_CompassD: number;

declare const kHIDUsage_Csmr_Balance: number;

declare const kDVDFeaturesCSSBit: number;

declare const kHIDUsage_LED_Usage: number;

declare const kHIDUsage_Button_76: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilitySublinkTypePhase: number;

declare const kIOI2CCombinedTransactionType: number;

declare const kINQUIRY_PERIPHERAL_TYPE_MediumChangerSMCDevice: number;

declare const kATAIdentifyLogicalHeadCount: number;

declare const kIOPacketFilterMulticast: number;

declare const kIOAudioNewClockDomain: number;

declare const kHIDUsage_Button_94: number;

declare const kUSBNotificationPreForcedSuspendBit: number;

declare const kHIDUsage_Button_86: number;

declare const kUSBFullSpeedMicrosecondsInFrame: number;

declare const kMMCCmd_SCAN_MMC: number;

declare const kHIDUsage_Snsr_Data_Motion_AngularPositionXAxis: number;

declare const kHIDUsage_Button_52: number;

declare const kHIDUsage_Csmr_ALContextawareDesktopAssistant: number;

declare const cscGetModeTiming: number;

declare const kSBCModePageRigidDiskGeometry_RPL_Mask: number;

declare const kHIDUsage_GD_Y: number;

declare const kHIDUsage_Csmr_ACExit: number;

declare const kSMCCmd_MOVE_MEDIUM: number;

declare const kFWAVCAsyncPlug21: number;

declare const kHIDUsage_Button_169: number;

declare const kUSBStringDesc: number;

declare const kIOI2CDDCciReplyTransactionType: number;

declare const kDVDKeyFormatRegionState: number;

declare const kHIDUsage_Sprt_3Iron: number;

declare const kSBCCmd_READ_10: number;

declare const timingVESA_1280x960_85hz: number;

declare const kHIDUsage_Button_13: number;

declare const kHIDUsage_BCS_DecodeDataContinued: number;

declare const kHIDUsage_Sprt_BaseballBat: number;

declare const kHIDUsage_Csmr_ALDigitalRightsManager: number;

declare const kHIDUsage_LED_Reverse: number;

declare const kScaleCanSupportInsetMask: number;

declare const OSArray: number;

declare const kFourthDepthMode: number;

declare const kSBCWOCmd_VERIFY_12: number;

declare const kHIDUsage_Csmr_DisplayBrightnessDecrement: number;

declare const kUncertainConnection: number;

declare const kHIDUsage_Sim_TurretDirection: number;

declare const kIOHIDServerConnectType: number;

declare const kSBCWOCmd_TEST_UNIT_READY: number;

declare const kIOUSBAnyProduct: number;

declare const kSSCPrinterCmd_COMPARE: number;

declare const kHIDUsage_WD_ScaleStatusRequiresRezeroing: number;

declare const kIOPMNotPowerManaged: number;

declare const kHIDUsage_BCS_TriggerState: number;

declare const kFireWireCommandUseCopy: number;

declare const kHIDUsage_AD_CursorMode: number;

declare const kIOPMProModeEngaged: number;

declare const kHIDUsage_KeyboardCrSelOrProps: number;

declare const kHIDUsage_Csmr_Menu: number;

declare const kHIDUsage_Button_154: number;

declare const kIOUSBSuperSpeedEndpointCompanionDescriptorBulkMaxStreamsPhase: number;

declare const kHIDUsage_Snsr_Data_Location_HorizontalDilutionOfPrecision: number;

declare const kIOAudioChannelLabel_Ambisonic_W: number;

declare const kSPCProcCmd_CHANGE_DEFINITION: number;

declare const cscGetModeBaseAddress: number;

declare const kATATimeout10Seconds: number;

declare const kHIDUsage_GD_SystemDock: number;

declare const kHIDUsage_Snsr_Event_SensorEvent_LowThresholdCrossUp: number;

declare const timingApple_1152x870_75hz: number;

declare const kHIDUsage_Csmr_ACClose: number;

declare const kHIDUsage_BS_iManufacturerName: number;

declare const kHIDUsage_Snsr_Data_Light_ChromaticityX: number;

declare const kSPCCmd_REPORT_DEVICE_IDENTIFIER: number;

declare const kAppleVendorID: number;

declare const kDVDStructureFormatCopyrightInfo: number;

declare const kHIDUsage_BCS_BarSpaceData: number;

declare const kIOPSAdapterErrorFlagDeviceNeedsToBeRepositioned: number;

declare const kHIDUsage_Csmr_ChannelTop: number;

declare const kHIDUsage_GD_SystemDisplayToggleMode: number;

declare const kCSRMemoryBoundHiAddress: number;

declare const cscGetPreferredConfiguration: number;

declare const kHIDUsage_Button_129: number;

declare const kHIDUsage_Sim_AirplaneSimulationDevice: number;

declare const kHIDUsage_GD_AssistiveControl: number;

declare const kDMSModeNotReady: number;

declare const kIOVideoDeviceMethodOpen: number;

declare const kHIDUsage_BCS_USB_5_SlugCode: number;

declare const kModelessConnect: number;

declare const kHIDUsage_Dig_Pen: number;

declare const kHIDUsage_FIDO_OutputData: number;

declare const kHIDUsage_LED_Rewind: number;

declare const kHIDUsage_GD_Reserved: number;

declare const kIOBlitSourceIsSame: number;

declare const kHIDUsage_Sprt_Reserved: number;

declare const kHIDUsage_BCS_MaxiCode: number;

declare const kIOPSFamilyCodeUSBChargingPortDedicated: number;

declare const kHIDUsage_PD_AwaitingPower: number;

declare const kHIDUsage_Csmr_ACDetachComment: number;

declare const kHIDUsage_Csmr_Repeat: number;

declare const kIONetworkInterfaceOpenedState: number;

declare const kINQUIRY_Page83_ProtocolIdentifierValidBit: number;

declare const kCSRStateOff: number;

declare const kMMCCmd_READ_CAPACITY: number;

declare const kHIDUsage_BCS_UPC_E: number;

declare const timingInvalid_SM_T24: number;

declare const kINQUIRY_Page83_CodeSetASCIIData: number;

declare const kConfigSBP2Revision: number;

declare const kIOAudioChannelLabel_LeftWide: number;

declare const kUSBInterface: number;

declare const kHIDUsage_KeyboardE: number;

declare const kHIDUsage_BD_BrailleRow: number;

declare const kIOPMAllowSleep: number;

declare const kIOAudioSelectorControlSubTypeChannelHighPassFilter: number;

declare const kSetAddress: number;

declare const kTriStateSyncMask: number;

declare const timingApplePAL_ST: number;

declare const kHIDUsage_Snsr_Orientation_Inclinometer2D: number;

declare const kIOMediumEthernet1000BaseSX: number;

declare const kIOCatalogRemoveDrivers: number;

declare const kHIDUsage_PD_OutletSystemID: number;

declare const kFWSBP2NormalCommandStatus: number;

declare const kHIDUsage_BS_BattPackModelLevel: number;

declare const kSBCCmd_SYNCHRONIZE_CACHE: number;

declare const TELEPHONY_UNDEFINED: number;

declare const kMMCCmd_MECHANISM_STATUS: number;

declare const mCmpCount: number;

declare const kDVDFeaturesHDRWBit: number;

declare const kSBCModePageCaching_MF_Bit: number;

declare const mBaseOffset: number;

declare const kHIDUsage_Button_143: number;

declare const kHIDUsage_Csmr_DuressAlarm: number;

declare const kSCSICmd_LOG_SELECT: number;

declare const kHIDUsage_Csmr_ContactLastName: number;

declare const kHIDUsage_Dig_SecondaryTipSwitch: number;

declare const kSSCSeqCmd_MODE_SELECT_6: number;

declare const kFWAVCAsyncPlug7: number;

declare const kHIDUsage_Csmr_SecurityEnable: number;

declare const kHIDUsage_Snsr_Data_Motion_AngularPosition: number;

declare const kHIDUsage_Snsr_Data_Time_Second: number;

declare const kIOAudioStreamByteOrderBigEndian: number;

declare const kUSBRqReserved2: number;

declare const kHIDUsage_LED_Speaker: number;

declare const kCSRStateStateTesting: number;

declare const kHIDUsage_Snsr_Event_SensorEvent_Unknown: number;

declare const kHIDUsage_Csmr_ContactEmailOther: number;

declare const kHIDUsage_Snsr_Data_Location_TrueHeading: number;

declare const kSyncOnBlueMask: number;

declare const kHIDUsage_Csmr_ACPasteSpecial: number;

declare const kHIDUsage_Button_135: number;

declare const kHIDUsage_BS_SMBErrorCode: number;

declare const kHIDUsage_Snsr_Property_Description: number;

declare const kCSRSplitTimeoutLoAddress: number;

declare const kHIDUsage_Csmr_ContactPhoneNumberPersonal: number;

declare const kHIDUsage_Csmr_Aspect: number;

declare const kHIDUsage_KeyboardF12: number;

declare const kHIDUsage_GD_SystemDisplayInvert: number;

declare const kHIDUsage_Csmr_ScanPreviousTrack: number;

declare const kIORPCVersion190615: number;

declare const kUSBBillboardVConn2Watt: number;

declare const kHIDUsage_Snsr_Property_Location_DesiredAccuracy: number;

declare const kFastCheckForDDC: number;

declare const kModeNotGraphicsQuality: number;

declare const kUSBHubCountExceededNotificationType: number;

declare const kHIDUsage_Button_47: number;

declare const kHIDUsage_BS_Level2: number;

declare const kINQUIRY_Byte6_MCHNGR_Mask: number;

declare const kIOPMDriverAssertionBluetoothHIDDevicePairedBit: number;

declare const kIOVideoFeatureControlClassIDZoom: number;

declare const kHIDUsage_Button_151: number;

declare const kIOCatalogAddDrivers: number;

declare const kINQUIRY_PageC0_PageCode: number;

declare const kHIDUsage_Sprt_StickTempo: number;

declare const kUSBRqTypeShift: number;

declare const kIONetworkDataAccessTypeSerialize: number;

declare const kIONetworkFeatureTSOIPv6: number;

declare const kHIDUsage_Csmr_ScanNextTrack: number;

declare const kHIDUsage_Keypad8: number;

declare const kHIDUsage_Haptics_WaveformVendorID: number;

declare const kHIDUsage_KeyboardExSel: number;

declare const kUSBFeatureLTMEnable: number;

declare const kConfigModuleDependentInfoKey: number;

declare const kINQUIRY_Byte56_CLOCKING_ONLY_DT: number;

declare const kHIDUsage_Csmr_ACJustifyLeft: number;

declare const kSCCCmd_SPARE_IN: number;

declare const kPowerStateSleepWakeNeedsProbeBit: number;

declare const kHIDUsage_Button_226: number;

declare const kIOAudioChannelLabel_Discrete_11: number;

declare const kINQUIRY_ANSI_VERSION_NoClaimedConformance: number;

declare const kHIDUsage_Button_120: number;

declare const kSecondsInAMinute: number;

declare const kBDMediaTypeRE: number;

declare const kUSBDiagnosticDeviceInterfaceClass: number;

declare const kMMCCmd_READ_BUFFER_CAPACITY: number;

declare const kHIDUsage_KeyboardPrintScreen: number;

declare const kFWAVCAsyncPlug6: number;

declare const kHIDUsage_WD_DataWeight: number;

declare const kIOPMDriverAssertionMagicPacketWakeEnabledBit: number;

declare const kHIDUsage_Snsr_Orientation_Distance1D: number;

declare const kHIDUsage_Csmr_ACSelectObject: number;

declare const kVideoI2CBusyErr: number;

declare const kSESCmd_RELEASE_10: number;

declare const kHIDUsage_Dig_ProgramChangeKeys: number;

declare const kHIDUsage_Button_29: number;

declare const kUSBPersonalHealthcareClass: number;

declare const kSBCCmd_FORMAT_UNIT: number;

declare const kSPCCmd_REQUEST_SENSE: number;

declare const kIOAudioChannelLabel_LeftSurround: number;

declare const kConfigModuleSpecIdKey: number;

declare const kHIDUsage_LED_Repeat: number;

declare const kHIDUsage_BCS_Check: number;

declare const kMMCCmd_STOP_PLAY_SCAN: number;

declare const kHIDUsage_GD_SystemMenuExit: number;

declare const kHIDUsage_KeyboardEscape: number;

declare const kHIDUsage_PID_OpEffectStartSolo: number;

declare const kHIDUsage_Button_137: number;

declare const kUSBDataClass: number;

declare const kHIDPage_BarCodeScanner: number;

declare const kHIDUsage_Snsr_Property_ReportingState: number;

declare const kHIDUsage_Button_97: number;

declare const kHIDUsage_Button_170: number;

declare const kMMCCmd_SEEK_6: number;

declare const kHIDUsage_Csmr_AC: number;

declare const kHIDUsage_BCS_EAN2_3LabelControlReport: number;

declare const kIOUSBSuperSpeedHubCharacteristicsPowerSwitchingGanged: number;

declare const kHIDUsage_Snsr_Data_Light_ConsumerIRSentenceReceive: number;

declare const kFWAVCAsyncPlug8: number;

declare const kHIDUsage_Game_GamepadTrigger: number;

declare const kIOMediumIEEE80211Manual: number;

declare const kHIDUsage_BCS_UPC_EANControlReport: number;

declare const kHIDUsage_VR_Vest: number;

declare const kHIDUsage_Button_228: number;

declare const kFWResponsePending: number;

declare const kHIDUsage_Dig_Puck: number;

declare const kSCSICmd_SEND_DVD_STRUCTURE: number;

declare const kHIDUsage_Snsr_Data_Location_SatellitesInView: number;

declare const kHIDUsage_Button_44: number;

declare const kINQUIRY_Page80_PageCode: number;

declare const kDPMSSyncMask: number;

declare const kIOBlitDestFramebuffer: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilitySublinkSpeedIdCountPhase: number;

declare const EMBEDDED_SYNTHESIZER: number;

declare const kHIDUsage_Button_130: number;

declare const kHIDUsage_Snsr_Location_Triangulation: number;

declare const kHIDUsage_Button_144: number;

declare const kIOAudioDeviceTransportTypeFireWire: number;

declare const kSPCCmd_COPY: number;

declare const kSPCCmd_MODE_SENSE_10: number;

declare const kHIDUsage_Csmr_ACNumberedList: number;

declare const kREPORT_LUNS_ADDRESS_DEVICE_TYPE_SPECIFIC: number;

declare const kATASMARTSelfTestStatusNoError: number;

declare const kIOPMSoftSleep: number;

declare const INPUT_MICROPHONE: number;

declare const kIOAudioControlChannelIDAll: number;

declare const kIOAudioSelectorControlSelectionValueSPDIF: number;

declare const kHIDUsage_MSR_Track3Length: number;

declare const kHIDUsage_LED_Player3: number;

declare const kFWCSRStateLinkOff: number;

declare const kHIDUsage_BD_BrailleKeyboardRightSpace: number;

declare const kMMCCmd_READ_TRACK_INFORMATION: number;

declare const kHIDUsage_Csmr_ACReplyAll: number;

declare const kIOAudioStreamSampleFormatLinearPCM: number;

declare const kHIDUsage_Csmr_ACZoom: number;

declare const kIOPixelEncodingYCbCr420: number;

declare const kHIDUsage_Csmr_ACNextLink: number;

declare const kHIDUsage_Tfon_Drop: number;

declare const kHIDUsage_BCS_BarCodePresentSensor: number;

declare const kHIDUsage_BD_BrailleKeyboardDot7: number;

declare const kHIDUsage_Button_155: number;

declare const kHIDUsage_LED_IndicatorOrange: number;

declare const kMMCCmd_MODE_SELECT_6: number;

declare const kIOPMPoorValue: number;

declare const kTransparentEncoding: number;

declare const kIOFBConnectInterruptType: number;

declare const kHIDUsage_PID_NegativeSaturation: number;

declare const kSCSICmd_WRITE_ATTRIBUTE: number;

declare const timingApple13x: number;

declare const kIOUSBSuperSpeedHubCharacteristicsPowerSwitchingIndividual: number;

declare const mTable: number;

declare const kIOStreamMemoryTypeOutputQueue: number;

declare const kDepthMode6: number;

declare const kDeactivateConnection: number;

declare const kHIDUsage_Snsr_Mechanical_Pressure: number;

declare const kIOAudioStreamSampleFormatIEEEFloat: number;

declare const kHIDUsage_BCS_EAN_8: number;

declare const kHIDUsage_GenDevControls_BackgroundControls: number;

declare const kHIDUsage_BS_SelectorRevision: number;

declare const kHIDUsage_Sprt_StickSpeed: number;

declare const kSCSICmd_READ_ELEMENT_STATUS_ATTACHED: number;

declare const kIORangeColorimetryxvYCC: number;

declare const kCDTrackInfoAddressTypeSessionNumber: number;

declare const kHIDUsage_Csmr_KeyboardBrightnessIncrement: number;

declare const kUSBSuperSpeedSupportsHS: number;

declare const kIOAudioStreamByteOrderLittleEndian: number;

declare const kHIDUsage_Game_Bump: number;

declare const kConfigModelIdKey: number;

declare const kIOMapOverwrite: number;

declare const kIOTimingIDApple_FixedRateLCD: number;

declare const kIO32ARGBPixelFormat: number;

declare const kHIDUsage_BCS_SymbologyIdentifier2: number;

declare const kINQUIRY_Page83_IdentifierTypeVendorID: number;

declare const kHIDUsage_Snsr_Property_Time_TimeZoneName: number;

declare const kIOFBBlueGammaScaleAttribute: number;

declare const kINQUIRY_PERIPHERAL_TYPE_WellKnownLogicalUnit: number;

declare const kHIDUsage_Button_89: number;

declare const kIODPEventMCCS: number;

declare const kIOUSBEndpointDescriptorPacketSizeMult: number;

declare const kHIDUsage_KeyboardRightControl: number;

declare const kHIDUsage_BD_BrailleDPadUp: number;

declare const kHIDUsage_BS_ThermistorCold: number;

declare const kHIDUsage_BCS_UPC_E1: number;

declare const kIOFBNS_Wake: number;

declare const kSBCModePageFormatDeviceCode: number;

declare const kMMCCmd_SEND_CUE_SHEET: number;

declare const kIO64BGRAPixelFormat: number;

declare const kFWAVCConsumerMode_LOST: number;

declare const cscProbeConnection: number;

declare const kHIDUsage_Button_223: number;

declare const kConnectionColorMode: number;

declare const kIO8IndexedGrayPixelFormat: number;

declare const kIORGBSignedDirectPixels: number;

declare const kHIDUsage_Snsr_Data_Environmental_AtmosphericPressure: number;

declare const kATAIdentifyFirmwareRevision: number;

declare const kIOAudioChannelLabel_DialogCentricMix: number;

declare const kUSBDFUCanUploadBit: number;

declare const kDMSModeReady: number;

declare const kHIDUsage_PID_ET_Sine: number;

declare const timingAppleVGA: number;

declare const kHIDUsage_Dig_ArticulatedArm: number;

declare const kIOUSBSuperSpeedDeviceCapabilityHighSpeed: number;

declare const kSSCPrinterCmd_TEST_UNIT_READY: number;

declare const kATASupportsPowerManagementBit: number;

declare const kHIDUsage_Csmr_ContactEmailPersonal: number;

declare const kSPCCmd_EXTENDED_COPY: number;

declare const kHIDUsage_WD_ScaleScaleClassIIIMetric: number;

declare const kDVDKeyFormatKey2: number;

declare const kSCSIServiceAction_XDWRITE_32: number;

declare const kSCSICmd_SEARCH_DATA_LOW_12: number;

declare const kCSRUnitsBoundLoAddress: number;

declare const kDVDFeaturesHDRAMBit: number;

declare const kHIDUsage_Sprt_Putter: number;

declare const kHIDUsage_BCS_BC412: number;

declare const kFWResponseDataError: number;

declare const kINQUIRY_Page83_AssociationTargetPort: number;

declare const kIOScaleRotateFlags: number;

declare const kConfigUnitDirectoryKey: number;

declare const kCDFeaturesTestWriteMask: number;

declare const kIOAudioSMPTETimeType24: number;

declare const kScaleRotate270Mask: number;

declare const kSSCSeqCmd_LOCATE: number;

declare const kATASupportsFlushCacheExtendedBit: number;

declare const kDVDBookTypeRW: number;

declare const kHIDUsage_Csmr_Illumination: number;

declare const kHIDUsage_BCS_Misc1DControlReport: number;

declare const kIORDYDisableBit: number;

declare const kIOStreamMemoryTypeInputQueue: number;

declare const IOPMParameterError: number;

declare const kHIDUsage_WD_ScaleStatusReport: number;

declare const kHIDUsage_PD_PowerConverter: number;

declare const kModeSenseParameterHeader10_LongLBABit: number;

declare const kHIDUsage_Sim_FlightCommunications: number;

declare const kHIDUsage_Keyboard5: number;

declare const kSBCCmd_READ_CAPACITY: number;

declare const kHIDUsage_BCS_NoReadMessage: number;

declare const kIOHIDAccelerationAlgorithmTypeTable: number;

declare const kFWAVCAsyncPlug20: number;

declare const kIOHIDKeyboardPhysicalLayoutTypeVendor: number;

declare const kIOHIDKeyboardPhysicalLayoutType104: number;

declare const kIOHIDKeyboardPhysicalLayoutType102: number;

declare const kIOHIDKeyboardPhysicalLayoutTypeUnknown: number;

declare const kIOHIDStandardTypeUnspecified: number;

declare const kIOHIDStandardTypeISO: number;

declare const kIOHIDStandardTypeANSI: number;

declare const kHIDUsage_PD_ChargerID: number;

declare const kIOHIDReportOptionVariableSize: number;

declare const kIOHIDReportOptionNotInterrupt: number;

declare const kIOHIDValueOptionsUpdateElementValues: number;

declare const kIOHIDValueOptionsFlagRelativeSimple: number;

declare const kIOHIDValueScaleTypePhysical: number;

declare const kIOHIDValueScaleTypeCalibrated: number;

declare const kIOHIDElementFlagsBufferedByteMask: number;

declare const kIOHIDElementFlagsNullStateMask: number;

declare const kIOBlitOrOperation: number;

declare const kIOHIDElementFlagsConstantMask: number;

declare const kHIDUsage_KeyboardSeparator: number;

declare const kHIDUsage_BS_OptionalMfgFunction5: number;

declare const kHIDUsage_Csmr_ALConsumerControlConfiguration: number;

declare const kHIDUsage_MSR_TrackJISData: number;

declare const kUSBStandard: number;

declare const kHIDUsage_KeyboardRightAlt: number;

declare const kHIDUsage_Snsr_Biometric_HeartRate: number;

declare const kHIDUsage_VR_AnimatronicDevice: number;

declare const kMMCCmd_REPAIR_TRACK: number;

declare const kHIDUsage_PID_Phase: number;

declare const kIOMediumEthernet10Base2: number;

declare const kCSRRegisterSpaceBaseAddressLo: number;

declare const kHIDUsage_Button_61: number;

declare const kAnalogSignalLevel_0700_0000: number;

declare const kSENSE_KEY_VENDOR_SPECIFIC: number;

declare const kUSBVideoStreamingSubClass: number;

declare const kHIDUsage_Snsr_Property_MaxFIFOEvents: number;

declare const kIOMediumEthernet10Base5: number;

declare const kPowerStateSleepWakeNeedsProbeMask: number;

declare const kHIDUsage_KeyboardCloseBracket: number;

declare const kIOAudioControlTypeSelector: number;

declare const kHIDUsage_BCS_TriggerReport: number;

declare const kHIDUsage_Game_GunBurst: number;

declare const kHIDUsage_PD_BadCount: number;

declare const kHIDUsage_Csmr_Rewind: number;

declare const kVideoBusTypeDisplayPort: number;

declare const kUSBReprogrammableDiagnosticSubClass: number;

declare const kHIDUsage_Button_157: number;

declare const kHIDUsage_Snsr_Data_Location_AltitudeEllipsoid: number;

declare const kHIDUsage_KeyboardInternational2: number;

declare const kHIDUsage_Csmr_ACJustifyBottom: number;

declare const kSuperSpeedBusBitMask: number;

declare const kIOVideoDeviceNotificationID_ControlRangeChanged: number;

declare const kSGCCmd_MODE_SENSE_10: number;

declare const kSPCModePagePowerConditionCode: number;

declare const kConfigEntryKeyValuePhase: number;

declare const kHIDUsage_GD_WirelessRadioSliderSwitch: number;

declare const kTransparentEncodedPixel: number;

declare const kHIDUsage_BD_BrailleRockerPress: number;

declare const kHIDUsage_Snsr_Motion_Accelerometer: number;

declare const kIOHIDElementFlagsNonLinearMask: number;

declare const kHIDUsage_BCS_ConvertEAN8To13Type: number;

declare const kHIDUsage_Snsr_Data_Orientation_DistanceZAxis: number;

declare const kHIDUsage_LED_NumLock: number;

declare const kRangeSupportsVSyncSerrationBit: number;

declare const kConnectionSupportsLLDDCSense: number;

declare const kHIDUsage_Button_38: number;

declare const kHIDUsage_Button_110: number;

declare const kSMCCmd_MODE_SENSE_10: number;

declare const cscSetInterrupt: number;

declare const kHIDUsage_Snsr_Modifier_None: number;

declare const kHIDUsage_KeyboardF5: number;

declare const kUSBEndpointPropertiesVersion3: number;

declare const kConnectionEnableAudio: number;

declare const cscSetDetailedTiming: number;

declare const kHIDUsage_GD_CallMuteToggle: number;

declare const kHIDUsage_Csmr_KeyboardBrightnessDecrement: number;

declare const kIOBlitColorSpaceTypes: number;

declare const kMMCCmd_SEARCH_DATA_EQUAL_12: number;

declare const kHIDUsage_Ord_Instance4: number;

declare const kINQUIRY_VERSION_DESCRIPTOR_SAT: number;

declare const kHIDUsage_KeyboardLeftAlt: number;

declare const kHIDUsage_Csmr_ALInstantMessaging: number;

declare const kHIDUsage_Snsr_Data_Location_MagneticVariation: number;

declare const kCDFeaturesBUFWriteMask: number;

declare const kINQUIRY_Byte7_CMDQUE_Mask: number;

declare const kIOMediaStateOffline: number;

declare const kSSCSeqCmd_READ_POSITION: number;

declare const kIONUCLastIndex: number;

declare const kHIDUsage_VR_HandTracker: number;

declare const kIOPMDoze: number;

declare const kIOMediumOptionEEE: number;

declare const kFWDCLImmediateEvent: number;

declare const kGetDescriptor: number;

declare const kHIDUsage_KeyboardF3: number;

declare const kIOPSFamilyCodeUSBChargingPort: number;

declare const kIOBuiltinPanelPowerAttribute: number;

declare const kFWResponseComplete: number;

declare const kVideoDDCciReplyTypeMask: number;

declare const kUSBRFControllerSubClass: number;

declare const kIOAudioChannelLabel_TopBackCenter: number;

declare const kIOTimingIDApple_1024x768_75hz: number;

declare const kGenericLCD: number;

declare const kSGCCmd_COPY_AND_VERIFY: number;

declare const kIOAudioChannelLabel_TopBackRight: number;

declare const kIOGDiagnoseGTraceType: number;

declare const kLBABit: number;

declare const kSMCCmd_MODE_SENSE_6: number;

declare const kHIDUsage_Csmr_PoliceAlarm: number;

declare const kIOUSBDeviceRequestSetAddress: number;

declare const kHIDPage_Monitor: number;

declare const kHIDUsage_Snsr_Orientation_Compass1D: number;

declare const kHIDUsage_Csmr_FanEnable: number;

declare const kSSCPrinterCmd_PRINT: number;

declare const kIOUSBEndpointDescriptorDirection: number;

declare const kDisplaySubPixelConfigurationStripe: number;

declare const kHIDUsage_GD_SystemWakeUp: number;

declare const kFWAVCAsyncPlug15: number;

declare const kUSB_SSCompDesc_Bulk_MaxStreams_Mask: number;

declare const kIORangeColorimetryNotSupported: number;

declare const kUSBDeviceCapability: number;

declare const kHIDUsage_KeyboardInternational7: number;

declare const kHIDUsage_PID_PoolAlignment: number;

declare const kHIDUsage_BS_CycleCount: number;

declare const kHIDUsage_Game_Player: number;

declare const kDisplayModeValidForMirroringFlag: number;

declare const cscSetSync: number;

declare const kIOStreamMethodSuspend: number;

declare const kDisplayModeValidForAirPlayFlag: number;

declare const kESCOnePortraitMono: number;

declare const kIOPMDisableClamshell: number;

declare const kUnknownConnect: number;

declare const kIOTimingIDVESA_1280x1024_60hz: number;

declare const kHIDUsage_WD_ScaleScaleClassGeneric: number;

declare const kHIDUsage_Sim_ElectronicCountermeasures: number;

declare const kHIDUsage_Csmr_ACFilter: number;

declare const kHIDUsage_Game_GunSingleShot: number;

declare const timingApple13: number;

declare const kUSBDefaultControlCompletionTimeoutMS: number;

declare const kATAIdentifyMinPIOTime: number;

declare const kHIDUsage_BCS_MicroPDF: number;

declare const kIOBitsPerColorComponent16: number;

declare const kIONUCWriteNetworkDataIndex: number;

declare const kHIDKeyboardInterfaceProtocol: number;

declare const kIOWSAA_Accelerated: number;

declare const kIOAudioStreamNumericRepresentationUnsignedInt: number;

declare const kHIDUsage_Dig_YTilt: number;

declare const kIOPSFamilyCodeUSBHost: number;

declare const kMMCCmd_READ_SUB_CHANNEL: number;

declare const kHIDUsage_GD_DPadDown: number;

declare const kHIDUsage_Game_GamepadFireOrJump: number;

declare const kRangeSupportsSignal_0700_0300_Mask: number;

declare const kHIDUsage_Tfon_ReorderTone: number;

declare const kHIDUsage_Csmr_ACInsertColumn: number;

declare const kFWCommandNoFlags: number;

declare const kHIDUsage_PID_EffectType: number;

declare const timingApple1Kb: number;

declare const kUSBFunctionRemoteWakeEnableBit: number;

declare const kIOAudioChannelLabel_Discrete_6: number;

declare const kCSRBusManagerID: number;

declare const kHIDUsage_Csmr_VolumeIncrement: number;

declare const kIOAudioChannelLabel_RightSurround: number;

declare const kHIDUsage_BS_AverageCurrent: number;

declare const kUSBBulk: number;

declare const kHIDUsage_Haptics_WaveformRelease: number;

declare const EXTERNAL_MADI: number;

declare const kHIDUsage_Game_PinballDevice: number;

declare const kSPCProcCmd_RECEIVE_COPY_RESULTS: number;

declare const kHIDUsage_BS_ChargerConnection: number;

declare const kSCSICmd_PLAY_AUDIO_10: number;

declare const kINQUIRY_Byte6_VS_Mask: number;

declare const kFWAVCAsyncPlug25: number;

declare const kHIDUsage_LED_UsageMultiModeIndicator: number;

declare const kHIDUsage_Csmr_ALOnlineShoppingBrowswer: number;

declare const kIOUSBSuperSpeedEndpointCompanionDescriptorIsocMult: number;

declare const kHIDUsage_Button_85: number;

declare const kIOUSBDeviceFeatureSelectorRemoteWakeup: number;

declare const kHIDUsage_BCS_Colorcode: number;

declare const EMBEDDED_DVD_AUDIO: number;

declare const kIOWriteCombineCache: number;

declare const kIOMediaAttributeEjectableMask: number;

declare const kSBCCmd_REPORT_LUNS: number;

declare const kConfigROMCRCValue: number;

declare const kSSCSeqCmd_READ_ELEMENT_STATUS_ATTACHED: number;

declare const kRBCCmd_READ_CAPACITY: number;

declare const kHIDUsage_KeyboardT: number;

declare const kUSPrintingClassSoftReset: number;

declare const timingApple_0x0_0hz_Offline: number;

declare const kFWAVCAsyncPlug13: number;

declare const kHorizontalSyncMask: number;

declare const kHIDUsage_Csmr_MenuDown: number;

declare const kIOMediumEthernet10GBaseLR: number;

declare const kHIDUsage_WD_ScaleScaleDevice: number;

declare const kHIDUsage_KeyboardCut: number;

declare const kHIDUsage_KeyboardF19: number;

declare const kDVDFeaturesWriteOnceMask: number;

declare const kIOPMNoErr: number;

declare const IOVideoDeviceUserClientInit: number;

declare const kHIDUsage_Game_GunClip: number;

declare const kIOAudioChannelLabel_Discrete_15: number;

declare const kHIDUsage_Keypad5: number;

declare const kIOPMBatteryInstalled: number;

declare const kSENSE_KEY_DATA_PROTECT: number;

declare const kSGCCmd_COMPARE: number;

declare const kHIDUsage_Csmr_ACJustifyCenterV: number;

declare const kFWSBP2CommandCheckGeneration: number;

declare const kInterlacedCEA861SyncModeMask: number;

declare const kHIDUsage_Snsr_Data_Location_DifferentialReferenceStationID: number;

declare const kIOAudioSMPTETimeType2997: number;

declare const kSCCCmd_MAINTENANCE_OUT: number;

declare const kSCSICmd_WRITE_BUFFER: number;

declare const kNanosecondScale: number;

declare const kIOAudioDeviceTransportTypeBluetooth: number;

declare const kDVDMediaTypePlusR: number;

declare const kHIDUsage_PID_AttackTime: number;

declare const INPUT_NULL: number;

declare const kPowerStateReducedPower1: number;

declare const kIOColorimetryAdobeRGB: number;

declare const kHIDUsage_LED_SystemMicrophoneMute: number;

declare const kHIDUsage_Snsr_Modifier_ThresholdHigh: number;

declare const kATAOperationTypeConfiguration: number;

declare const kDVDMediaTypeHDROM: number;

declare const kIOMediumEthernet100BaseVG: number;

declare const kDiscStatusMask: number;

declare const kDiscStatusOther: number;

declare const kSCSICmd_VERIFY_10: number;

declare const kIOUSBAnyProtocol: number;

declare const kHIDUsage_Game_Gun: number;

declare const kConnectionSyncEnable: number;

declare const kHIDUsage_KeyboardN: number;

declare const kFWAVCAsyncPlug2: number;

declare const kHIDUsage_Snsr_Data_Location_AltitudeAntennaSeaLevel: number;

declare const timingVESA_1920x1440_60hz: number;

declare const kIOStreamMethodGetBufferCount: number;

declare const kDisplayModeAcceleratorBackedFlag: number;

declare const kHIDUsage_Dig_BarrelSwitch: number;

declare const kIOFBSharedConnectType: number;

declare const kIO4IndexedGrayPixelFormat: number;

declare const kHIDUsage_Snsr_Data_Orientation_DistanceXAxis: number;

declare const kHIDUsage_KeyboardRightGUI: number;

declare const kFWAVCAsyncPlugAny: number;

declare const kIOPMAckImplied: number;

declare const kIOAudioLevelControlSubTypeLFEVolume: number;

declare const kHIDUsage_Csmr_ALDesktop: number;

declare const kHIDUsage_Csmr_Assign: number;

declare const kHIDUsage_Csmr_ACCopy: number;

declare const kATAWriteCacheEnabledMask: number;

declare const kHIDUsage_PID_EffectOperation: number;

declare const kHIDUsage_Snsr_Data_Electrical_Capacitance: number;

declare const kIOAudioPortTypePassThru: number;

declare const kUSBConfDesc: number;

declare const kHIDUsage_Snsr_Data_Biometric_HumanTouchState: number;

declare const kHIDUsage_WD_CalibrationCount: number;

declare const kHIDUsage_Snsr_Data_Motion_AngularPositionYAxis: number;

declare const kSPCCmd_REPORT_LUNS: number;

declare const kIOATAMaxPowerSavings: number;

declare const kHIDUsage_Haptics_WaveformBuzzContinuous: number;

declare const kHIDUsage_GD_Start: number;

declare const cscDoCommunication: number;

declare const INPUT_DESKTOP_MICROPHONE: number;

declare const kCSRTestStatusAddress: number;

declare const kHIDUsage_BS_ChargerSelectorSupport: number;

declare const kHIDUsage_Snsr_Data_Electrical_Voltage: number;

declare const kDisplayModeDefaultFlag: number;

declare const kIOMaxBusStall30usec: number;

declare const kHIDUsage_Button_88: number;

declare const kHIDUsage_Button_30: number;

declare const kHIDUsage_Csmr_ACNewWindow: number;

declare const kHIDUsage_GD_CoolantLevel: number;

declare const kATAForceUnitAccessFeatureBit: number;

declare const kIONetworkFeatureSoftwareVlan: number;

declare const kHIDUsage_AD_CharacterHeight: number;

declare const kSCSICmd_PERSISTENT_RESERVE_OUT: number;

declare const kSBCWOCmd_READ_CAPACITY: number;

declare const kFWAVCProducerMode_SEND: number;

declare const kIOVideoDeviceMethodSetControlValue: number;

declare const kIOHIDKeyboardPhysicalLayoutType106: number;

declare const kHIDUsage_Button_211: number;

declare const kHIDUsage_PID_IsochCustomForceEnable: number;

declare const kHIDUsage_Snsr_Event_SensorEvent_FrequencyExceeded: number;

declare const kHIDUsage_GD_SystemMenu: number;

declare const kReportsHotPlugging: number;

declare const kHIDUsage_Snsr_Event_SensorEvent_RangeMinReached: number;

declare const kIOFWLimitAsyncPacketSize: number;

declare const kHIDUsage_KeyboardPeriod: number;

declare const kIOAudioDeviceTransportTypeThunderbolt: number;

declare const kHIDUsage_Csmr_ALProcessOrTaskManager: number;

declare const kIOPMThermalLevelDanger: number;

declare const kHIDUsage_PID_AxesEnable: number;

declare const kIOBlitSynchronizeWaitBeamExit: number;

declare const kSSCSeqCmd_WRITE_BUFFER: number;

declare const kHIDUsage_Snsr_Data_Environmental_Temperature: number;

declare const kUSBDFUCanDownloadBit: number;

declare const kHIDUsage_BCS_CheckEnableEuropean5DigitPrice: number;

declare const kHIDUsage_BCS_CheckDisablePrice: number;

declare const kSyncDigitalCompositeMatchHSyncMask: number;

declare const kIOMediumIEEE80211: number;

declare const cscSetScaler: number;

declare const kINQUIRY_Page83_IdentifierTypeLogicalUnitGroup: number;

declare const kFWAVCAsyncPlug12: number;

declare const kCSRCoreRegistersBaseAddress: number;

declare const kRangeSupportsSeperateSyncsMask: number;

declare const kATASMARTSelfTestStatusPreviousTestServoFailure: number;

declare const kSBCWOCmd_PERSISTENT_RESERVE_OUT: number;

declare const kINQUIRY_Byte6_BQUE_Mask: number;

declare const kIOScaleStretchOnly: number;

declare const kINQUIRY_PERIPHERAL_TYPE_Mask: number;

declare const kHIDUsage_Snsr_Property_Time_ArmAlarm: number;

declare const kIOPMSystemCapabilityAOT: number;

declare const kUSBbEndpointAddressMask: number;

declare const kHIDUsage_PID_Period: number;

declare const kHIDUsage_Snsr_Event_SensorEvent_ZeroThresholdCrossDown: number;

declare const kIOTimingIDApplePAL_FF: number;

declare const kMSCProtocolUSBAttachedSCSI: number;

declare const mCmpSize: number;

declare const kConfigUnitSWVersIIDC102: number;

declare const kHIDUsage_Snsr_Data_Orientation_Heading: number;

declare const kHIDUsage_Tfon_OutsideRingback: number;

declare const kHIDUsage_Csmr_ACBack: number;

declare const kHIDUsage_Snsr_Data_Location_PostalCode: number;

declare const kSBCWOCmd_MODE_SELECT_10: number;

declare const kSCSICmd_WRITE_AND_VERIFY_10: number;

declare const timingSony_1920x1080_72hz: number;

declare const kFWDCLCycleEvent: number;

declare const kHIDUsage_Sim_Rudder: number;

declare const kHIDUsage_Csmr_ALTaskOrProjectManager: number;

declare const kIOKitNoticationTypeSizeAdjShift: number;

declare const kHIDUsage_Csmr_ACIndentyIncrease: number;

declare const kHIDUsage_BCS_CheckDigitEnableStandard2of5USS: number;

declare const kHIDUsage_Csmr_ALMessageStatus: number;

declare const kMessageDeterminingMediaPresence: number;

declare const kHIDUsage_Csmr_MediaSelection: number;

declare const kUSBDataIsocUsageType: number;

declare const kHIDUsage_Snsr_Property_Mechanical_BackwardVibrationSpeed: number;

declare const kHIDUsage_Csmr_Proximity: number;

declare const kMMCCmd_RECEIVE_DIAGNOSTICS_RESULTS: number;

declare const kHIDUsage_WD_ScaleStatus: number;

declare const kHIDUsage_BCS_DecodedData: number;

declare const kHIDUsage_GD_Hatswitch: number;

declare const kHIDUsage_BS_SMBChargerStatus: number;

declare const kIOUSBDeviceFeatureSelectorU1Enable: number;

declare const kIOAudioSMPTETimeType2398: number;

declare const kHIDUsage_PD_Output: number;

declare const kHIDUsage_Csmr_ALWordProcessor: number;

declare const kHIDUsage_Dig_GestureCharacterEncodingUTF8: number;

declare const kHIDUsage_Sprt_9Wood: number;

declare const kIOPSFamilyCodeUSBCTypeC: number;

declare const kHIDUsage_Csmr_AL: number;

declare const kHIDUsage_Csmr_ChannelCenter: number;

declare const IOPMMaxPerformance: number;

declare const kHIDUsage_Csmr_ALDatabaseApp: number;

declare const kUSBBOSDescriptor: number;

declare const kHIDUsage_Snsr_Data_Orientation_HeadingYAxis: number;

declare const timingApple1Ka: number;

declare const thirdVidMode: number;

declare const kHIDUsage_BCS_SettingsReport: number;

declare const kIOMediumIEEE80211DS11: number;

declare const kHIDUsage_Snsr_Light: number;

declare const kHIDUsage_Snsr_Time_RealTimeClock: number;

declare const kSCSICmd_VendorSpecific_End: number;

declare const kConnectionDisplayFlags: number;

declare const kHIDUsage_Sim_BarrelElevation: number;

declare const kIOUSBSuperSpeedDeviceCapabilityLowSpeed: number;

declare const kDeclROMtables: number;

declare const kHIDUsage_BCS_DataLengthMethod: number;

declare const kIOScaleCanUpSamplePixels: number;

declare const kDVDFeaturesCSSMask: number;

declare const kATAIdentifyWordsPerLogicalSector1: number;

declare const kUSB500mAAvailable: number;

declare const kIOPMPSLocationLeft: number;

declare const kFWBadNodeID: number;

declare const kHIDUsage_Snsr_Data_Location_Speed: number;

declare const kIOAudioChannelLabel_LeftCenter: number;

declare const kHIDUsage_BCS_CheckDigitEnableInterleaved2of5OPCC: number;

declare const kIOAudioOutputPortSubTypeExternalSpeaker: number;

declare const kFWIsochDataLength: number;

declare const kHIDUsage_PD_ConfigActivePower: number;

declare const kHIDUsage_Csmr_Play: number;

declare const kSMCCmd_RESERVE_ELEMENT_6: number;

declare const kIOUSBDeviceRequestSetInterface: number;

declare const kHIDUsage_LED_OnLine: number;

declare const kINQUIRY_Page83_IdentifierTypeIEEE_EUI64: number;

declare const kHIDUsage_BS_AtRateTimeToEmpty: number;

declare const kHIDUsage_Button_40: number;

declare const kINQUIRY_MaximumDataSize: number;

declare const kUSBAtrSelfPowered: number;

declare const kHIDUsage_GD_DoNotDisturb: number;

declare const kIOBlitBlendOperation: number;

declare const kSCSICmd_RECEIVE_COPY_RESULTS: number;

declare const kIOAudioSelectorControlSelectionValueNone: number;

declare const kHIDUsage_Csmr_ACFontColor: number;

declare const kHIDUsage_BCS_Interleaved2of5ControlReport: number;

declare const kCSRUnitsBaseHiAddress: number;

declare const kHIDUsage_KeyboardF22: number;

declare const kIOPMBatteryAtWarn: number;

declare const kIOMapWriteThruCache: number;

declare const kIOMediumOptionFlag2: number;

declare const kHIDUsage_Button_152: number;

declare const kHIDUsage_Csmr_ALThesaurus: number;

declare const kIOHIDActivityUserIdle: number;

declare const kCSRStateDReq: number;

declare const kUSBDFUSubClass: number;

declare const kStereoSyncConnection: number;

declare const kIONetworkDataAccessTypeMask: number;

declare const kHIDUsage_GD_SystemMenuHelp: number;

declare const kHIDUsage_BD_BrailleJoystickCenter: number;

declare const kDVDFeaturesRandomWriteableBit: number;

declare const kHIDUsage_Csmr_Once: number;

declare const kSCCCmd_PORT_STATUS: number;

declare const kHIDPage_Sport: number;

declare const kMSCProtocolControlBulkInterrupt: number;

declare const kDisplaySubPixelShapeSquare: number;

declare const kHIDUsage_Sprt_Oar: number;

declare const kDisplaySubPixelShapeElliptical: number;

declare const kDisplaySubPixelConfigurationStripeOffset: number;

declare const kHIDUsage_Csmr_ACSuperscript: number;

declare const kDisplaySubPixelConfigurationDelta: number;

declare const kDisplaySubPixelConfigurationUndefined: number;

declare const kIOCatalogResetDrivers: number;

declare const kDisplaySubPixelLayoutBGR: number;

declare const kDisplaySubPixelLayoutUndefined: number;

declare const kDisplayProductIDGeneric: number;

declare const kIOFBLinkScramblerAlternate: number;

declare const kIOFBLinkScramblerNormal: number;

declare const kIOFBLinkDownspreadMax: number;

declare const kATAIdentifyCommandExtension1: number;

declare const kIOFBLinkPreEmphasisLevel3: number;

declare const kIOFBLinkPreEmphasisLevel1: number;

declare const timingApplePAL_FF: number;

declare const kIOFBLinkPreEmphasisLevel0: number;

declare const kIOFBLinkVoltageLevel3: number;

declare const kIOFBLinkVoltageLevel1: number;

declare const kIOFBBitRateRBR: number;

declare const kIOFBAVSignalTypeDVI: number;

declare const kIOFBAVSignalTypeVGA: number;

declare const kIOFBAVSignalTypeUnknown: number;

declare const kIOHibernatePreviewUpdates: number;

declare const kIOHibernatePreviewActive: number;

declare const kIOTimingIDVESA_1360x768_60hz: number;

declare const kIOTimingIDVESA_848x480_60hz: number;

declare const kIOTimingIDSony_1920x1200_76hz: number;

declare const kIOTimingIDSony_1920x1080_60hz: number;

declare const kIOTimingIDSony_1600x1024_76hz: number;

declare const kIOTimingIDFilmRate_48hz: number;

declare const kIOTimingIDVESA_1920x1440_60hz: number;

declare const kIOTimingIDVESA_1792x1344_75hz: number;

declare const kIOTimingIDVESA_1600x1200_85hz: number;

declare const kIOTimingIDVESA_1600x1200_80hz: number;

declare const kIOTimingIDVESA_1600x1200_75hz: number;

declare const kIOTimingIDVESA_1280x1024_85hz: number;

declare const kIOTimingIDVESA_1280x960_75hz: number;

declare const kIOTimingIDApplePAL_FFconv: number;

declare const kIOTimingIDApplePAL_STconv: number;

declare const kIOTimingIDApplePAL_ST: number;

declare const kIOTimingIDAppleNTSC_FFconv: number;

declare const kIOTimingIDApple_1152x870_75hz: number;

declare const kIOTimingIDVESA_1152x864_75hz: number;

declare const kSSCSeqCmd_CHANGE_DEFINITION: number;

declare const kIOTimingIDVESA_1024x768_85hz: number;

declare const kIOTimingIDVESA_800x600_75hz: number;

declare const kIONUCReadNetworkDataIndex: number;

declare const kIOTimingIDVESA_800x600_56hz: number;

declare const kIOTimingIDApple_832x624_75hz: number;

declare const kIOTimingIDApple_640x818_75hz: number;

declare const kIOTimingIDApple_640x870_75hz: number;

declare const kIOTimingIDVESA_640x480_72hz: number;

declare const kIOTimingIDApple_640x400_67hz: number;

declare const kIOTimingIDApple_512x384_60hz: number;

declare const kIOFBWakeInterruptType: number;

declare const kIOFBMCCSInterruptType: number;

declare const kUSB_EPDesc_MaxMPS: number;

declare const kIOFBDisplayPortInterruptType: number;

declare const kIOFBOfflineInterruptType: number;

declare const kIOFBFrameInterruptType: number;

declare const kIOFBHBLInterruptType: number;

declare const kIOFBVBLInterruptType: number;

declare const kHardwareCursorInfoMinorVersion: number;

declare const kInvertingEncoding: number;

declare const kIODisplayAssertionConnectType: number;

declare const kIODisplayPowerStateOn: number;

declare const kIODisplayPowerStateMinUsable: number;

declare const kIODisplayDitherYCbCr422Shift: number;

declare const kIODisplayDitherYCbCr444Shift: number;

declare const kIODisplayDitherRGBShift: number;

declare const kIODisplayDitherFrameRateControl: number;

declare const kIODisplayDitherDisable: number;

declare const kIODisplayYCbCr422ColorComponentBits10: number;

declare const kIODisplayYCbCr422ColorComponentBits8: number;

declare const kIODisplayYCbCr422ColorComponentBitsUnknown: number;

declare const kIODisplayYCbCr444ColorComponentBits16: number;

declare const kIODisplayYCbCr444ColorComponentBits14: number;

declare const kIODisplayYCbCr444ColorComponentBits12: number;

declare const kIODisplayYCbCr444ColorComponentBits10: number;

declare const kIODisplayYCbCr444ColorComponentBits8: number;

declare const kIODisplayYCbCr444ColorComponentBitsUnknown: number;

declare const kIODisplayRGBColorComponentBits16: number;

declare const kIODisplayRGBColorComponentBits14: number;

declare const kIODisplayRGBColorComponentBits10: number;

declare const kINQUIRY_Byte56_CLOCKING_ONLY_ST: number;

declare const kIODisplayColorMode: number;

declare const kHIDUsage_Csmr_DisplayBrightnessIncrement: number;

declare const kIODPEventAutomatedTestRequest: number;

declare const kIODPEventRemoteControlCommandPending: number;

declare const kIODPEventForceRetrain: number;

declare const kIODPEventIdle: number;

declare const kIODPEventStart: number;

declare const kIOWindowServerActiveAttribute: number;

declare const kIOSyncOnGreen: number;

declare const kIOSyncOnBlue: number;

declare const kIOTriStateSyncs: number;

declare const kIOVSyncDisable: number;

declare const kIOConnectionStereoSync: number;

declare const kConnectionStartOfFrameTime: number;

declare const kIODisplayRGBColorComponentBits6: number;

declare const kIOMediumEthernet2500BaseT: number;

declare const kConnectionAudioStreaming: number;

declare const kConnectionControllerDitherControl: number;

declare const kConnectionColorModesSupported: number;

declare const kConnectionPanelTimingDisable: number;

declare const kConnectionHandleDisplayPortEvent: number;

declare const kConnectionVBLMultiplier: number;

declare const kConnectionGammaScale: number;

declare const kConnectionGreenGammaScale: number;

declare const kConnectionOverscan: number;

declare const kConnectionDisplayParameterCount: number;

declare const kConnectionChanged: number;

declare const kConnectionCheckEnable: number;

declare const kConnectionSupportsHLDDCSense: number;

declare const kConnectionSyncFlags: number;

declare const kConnectionFlags: number;

declare const kAndConnections: number;

declare const kOrConnections: number;

declare const kIOScaleCanRotate: number;

declare const kIOScaleCanSupportInset: number;

declare const kIOScaleCanScaleInterlaced: number;

declare const kIOScaleCanDownSamplePixels: number;

declare const kUSBControl: number;

declare const kIOAnalogSignalLevel_0714_0286: number;

declare const kIOMultiAlignedTiming: number;

declare const kIOPALTiming: number;

declare const kIORangeSupportsInterlacedCEATimingWithConfirm: number;

declare const kPowerStateSupportsReducedPower3Bit: number;

declare const kIORangeSupportsVSyncSerration: number;

declare const kIORangeSupportsCompositeSync: number;

declare const kIORangeSupportsSyncOnGreen: number;

declare const kIORangeSupportsSignal_0714_0286: number;

declare const kIORangeSupportsSignal_0700_0300: number;

declare const kIORangeDynamicRangeDolbyTunnelMode: number;

declare const kIORangeDynamicRangeSDR: number;

declare const kHIDUsage_BS_AverageTimeToEmpty: number;

declare const kIORangeColorimetryBT2020: number;

declare const kIORangeColorimetryBT709: number;

declare const kIORangeColorimetryBT601: number;

declare const kIORangeColorimetryAdobeRGB: number;

declare const kIORangeColorimetryDCIP3: number;

declare const kIORangeColorimetrysRGB: number;

declare const kIORangeColorimetryNativeRGB: number;

declare const kIORangeBitsPerColorComponent12: number;

declare const kIORangeBitsPerColorComponent6: number;

declare const kIORangePixelEncodingYCbCr422: number;

declare const kHIDUsage_Snsr_Property_ResponseCurve: number;

declare const kIORangePixelEncodingRGB444: number;

declare const kIOTimingRangeV1: number;

declare const kCSRRegisterSpaceBaseAddressHi: number;

declare const kIOWSAA_Hibernate: number;

declare const kIOTimingRangeV2: number;

declare const kIODynamicRangeDolbyNormalMode: number;

declare const kIODynamicRangeHDR10: number;

declare const kIODynamicRangeSDR: number;

declare const kIOColorimetryBT2100: number;

declare const kIOColorimetryBT2020: number;

declare const kConfigModuleVendorIdKey: number;

declare const kIOColorimetryxvYCC: number;

declare const kHIDUsage_Csmr_AlternateAudioDecrement: number;

declare const kIOColorimetrysRGB: number;

declare const kIOBitsPerColorComponentNotSupported: number;

declare const kIOPixelEncodingRGB444: number;

declare const kIOPixelEncodingNotSupported: number;

declare const kIOScaleRotate180: number;

declare const kIOScaleInvertY: number;

declare const kIOScaleSwapAxes: number;

declare const kIODetailedTimingValid: number;

declare const kIOMirrorForced: number;

declare const kIOMirrorDefault: number;

declare const kIOUSBInterfaceStatusRemoteWakeEnable: number;

declare const kIOMirrorHWClipped: number;

declare const kIOFBNS_GenerationShift: number;

declare const kIOFBNS_DisplayStateShift: number;

declare const kIOFBNS_DisplayStateMask: number;

declare const kIOFBNS_Dim: number;

declare const kIOFBNS_Doze: number;

declare const kIOFBNS_Rendezvous: number;

declare const kHIDUsage_GD_SystemMenuLeft: number;

declare const kIOWSAA_DriverOpen: number;

declare const kIOWSAA_Sleep: number;

declare const kIOScaleStretchToFit: number;

declare const kIOWSAA_From_Accelerated: number;

declare const kIOFBDisplayState_RestoredProfile: number;

declare const kIOFBHDCPLimit_NoHDCP20Type1: number;

declare const kIOFBHDCPLimit_NoHDCP20Type0: number;

declare const kIOFBHDCPLimit_NoHDCP1x: number;

declare const kIOFBHDRMetaDataAttribute: number;

declare const kIOFBGreenGammaScaleAttribute: number;

declare const kIOFBStop: number;

declare const kIOFBLimitHDCPStateAttribute: number;

declare const kIOFBLimitHDCPAttribute: number;

declare const kIOFBVariableRefreshRate: number;

declare const kIOClamshellStateAttribute: number;

declare const kIOCursorControlAttribute: number;

declare const kIOUSBEndpointDescriptorUsageTypeInterruptNotification: number;

declare const kIOPowerAttribute: number;

declare const kSetCLUTWithLuminance: number;

declare const kSetCLUTImmediately: number;

declare const kSetCLUTByValue: number;

declare const kIOFBSystemAperture: number;

declare const kFramebufferSupportsWritethruCache: number;

declare const kFramebufferSupportsCopybackCache: number;

declare const kIOPMProcessorSpeedChange: number;

declare const kDisplayModeSafeFlag: number;

declare const kDisplayModeNativeFlag: number;

declare const kDisplayModeValidateAgainstDisplay: number;

declare const kDisplayModeNotGraphicsQualityFlag: number;

declare const kDisplayModeNotPresetFlag: number;

declare const kDisplayModeRequiresPanFlag: number;

declare const kDisplayModeNotResizeFlag: number;

declare const kUSBAudioClass: number;

declare const kHIDUsage_Snsr_Modifier_VendorDefined: number;

declare const kDisplayModeNeverShowFlag: number;

declare const kDisplayModeAlwaysShowFlag: number;

declare const kDisplayModeSafetyFlags: number;

declare const kIOMonoDirectPixels: number;

declare const kIORGBDirectPixels: number;

declare const kIOMaxPixelBits: number;

declare const kIODisplayModeIDReservedBase: number;

declare const kIODisplayModeIDBootProgrammable: number;

declare const kDDCBlockSize: number;

declare const kHIDUsage_Snsr_Scanner: number;

declare const kIOAudioControlChannelIDDefaultSurroundRight: number;

declare const kIODynamicRangeTraditionalGammaHDR: number;

declare const kUSBDFUAttributesMask: number;

declare const kHIDUsage_LED_CAV: number;

declare const kHIDUsage_Snsr_Data_Biometric: number;

declare const kPowerStateSupportsReducedPower2Bit: number;

declare const kSGCCmd_READ: number;

declare const kIOInterestCalloutRefconIndex: number;

declare const kIOUSBEndpointDescriptorPacketSizePhase: number;

declare const kCDFeaturesPacketWriteBit: number;

declare const kReportsTagging: number;

declare const kIOPacketFilterPromiscuous: number;

declare const kHIDUsage_Csmr_KeyboardInputAssistNextGroup: number;

declare const kHubSuperSpeedProtocol: number;

declare const kSSCPrinterCmd_LOG_SELECT: number;

declare const kIODisplayPowerStateOff: number;

declare const kSMCCmd_EXCHANGE_MEDIUM: number;

declare const kHIDUsage_BCS_DataMatrix: number;

declare const kHIDUsage_Dig_DataValid: number;

declare const kSBCCmd_COPY_AND_VERIFY: number;

declare const timingApple_640x870_75hz: number;

declare const kINQUIRY_PERIPHERAL_TYPE_ObjectBasedStorageDevice: number;

declare const EMBEDDED_RADIO_RECEIVER: number;

declare const kHIDUsage_Snsr_Data_Mechanical_MultivalueSwitchValue: number;

declare const kIODisplayDitherAll: number;

declare const kHIDUsage_Dig_Stylus: number;

declare const kHIDUsage_PD_ConfigCurrent: number;

declare const kMirrorSameDepthOnlyMirrorMask: number;

declare const kINQUIRY_PageB1_Page_Length: number;

declare const kHIDUsage_Snsr_Data_Location_AddressLine2: number;

declare const kIOHIDValueScaleTypeExponent: number;

declare const kIOPSFamilyCodeUSBDevice: number;

declare const kHIDUsage_Csmr_ACFontSize: number;

declare const kHIDUsage_Tfon_Message: number;

declare const kUSDebugDesc: number;

declare const kINQUIRY_Byte7_Offset: number;

declare const kSetDeviceFeature: number;

declare const kConfigBusDependentInfoKey: number;

declare const kSPCCmd_MODE_SELECT_10: number;

declare const kHIDUsage_BS_BatteryInsertion: number;

declare const kIOAudioSMPTETimeType2997Drop: number;

declare const kSetEndpointFeature: number;

declare const kIOStreamMethodStop: number;

declare const kIOTimingIDApple_0x0_0hz_Offline: number;

declare const kSPCProcCmd_RESERVE_10: number;

declare const kIOPSFamilyCodeUnsupportedRegion: number;

declare const kMMCCmd_RESERVE_6: number;

declare const kINQUIRY_Byte6_ENCSERV_Mask: number;

declare const kHIDUsage_Csmr_FunctionButtons: number;

declare const kHIDUsage_Snsr_Electrical_Resistance: number;

declare const kIOFBLinkDownspreadNone: number;

declare const kIOUSBVendorIDAppleComputer: number;

declare const kSCSICmd_READ_CAPACITY: number;

declare const kHIDUsage_GD_SystemColdRestart: number;

declare const kATAIdentifyUltraDMASupported: number;

declare const kIORangeDynamicRangeHDR10: number;

declare const kIOHIDOptionsTypeMaskPrivate: number;

declare const kHIDUsage_Button_62: number;

declare const kSCSICmd_COMPARE: number;

declare const kSSCPrinterCmd_COPY_AND_VERIFY: number;

declare const kHIDUsage_Button_160: number;

declare const kFWAVCAsyncPlug29: number;

declare const kHIDUsage_Snsr_Data_Biometric_HumanProximityOutOfRange: number;

declare const kHIDUsage_Csmr_NumericKeyPad: number;

declare const kHIDUsage_LED_Kana: number;

declare const kUSB100mA: number;

declare const kIOHIDElementFlagsVariableMask: number;

declare const kHIDUsage_KeyboardSpacebar: number;

declare const IOPMNextHigherState: number;

declare const kRangeSupportsSignal_0714_0286_Bit: number;

declare const kINQUIRY_Byte7_WBUS16_Mask: number;

declare const kHIDUsage_Snsr_Property_Mechanical_ForwardVibrationSpeed: number;

declare const kHIDUsage_Csmr_BlueMenuButton: number;

declare const kHIDUsage_Tfon_DoNotDisturb: number;

declare const kHIDUsage_LED_OffHook: number;

declare const kHIDReportProtocolValue: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilityReservedPhase: number;

declare const kIOVideoDeviceMethodSuspendStream: number;

declare const kIOUYVY422PixelFormat: number;

declare const kIOMapPrefault: number;

declare const twoBitMode: number;

declare const kSCSICmd_GET_EVENT_STATUS_NOTIFICATION: number;

declare const kIOWSAA_DeferStart: number;

declare const kIOAudioStreamSampleFormatMuLaw: number;

declare const kIOUSBAnyVendor: number;

declare const kHIDUsage_Snsr_Biometric_HumanProximity: number;

declare const kHIDUsage_Csmr_ACSaveAndClose: number;

declare const kHIDUsage_AD_ClearDisplay: number;

declare const kFWDCLOpFlagPhase: number;

declare const kMMCCmd_RELEASE_10: number;

declare const kIORangePixelEncodingNotSupported: number;

declare const kUSBBillboardConfigNotAttempted: number;

declare const kHIDUsage_Dig_MultiplePointDigitizer: number;

declare const kHIDUsage_Snsr_Property: number;

declare const kHIDUsage_LED_IndicatorFastBlink: number;

declare const kIOPMWillAckLater: number;

declare const kHIDUsage_Csmr_ACAllCaps: number;

declare const kIOBlitSourceSolid: number;

declare const kHIDUsage_Dig_SurfaceSwitch: number;

declare const kIOCopybackCache: number;

declare const kIOWSAA_Reserved: number;

declare const kHIDUsage_KeyboardPOSTFail: number;

declare const kHardwareCursorInfoMajorVersion: number;

declare const kINQUIRY_Page00_PageCode: number;

declare const kUSBCommunicationControlInterfaceClass: number;

declare const kHIDUsage_PID_SampleCount: number;

declare const kHIDUsage_Game_MoveForwardOrBackward: number;

declare const kHIDUsage_Tfon_StoreNumber: number;

declare const kHIDUsage_KeyboardInternational4: number;

declare const kIOBlitTypeOperationTypeMask: number;

declare const kSCSICmd_SEND_CUE_SHEET: number;

declare const kHIDUsage_Csmr_ACDistributeV: number;

declare const kHIDUsage_KeyboardClear: number;

declare const kHIDUsage_BS_Undefined: number;

declare const kMMCCmd_READ_MASTER_CUE: number;

declare const kHIDUsage_Button_203: number;

declare const kIOCatalogKextdActive: number;

declare const kHIDUsage_Csmr_ACScrollDown: number;

declare const kIORangeDynamicRangeNotSupported: number;

declare const cscGetMultiConnect: number;

declare const kHIDUsage_Csmr_ACUpload: number;

declare const kHIDUsage_Csmr_ClimateControlEnable: number;

declare const kHIDUsage_BCS_Standard2of5: number;

declare const kHIDUsage_Snsr_Mechanical_MultivalueSwitch: number;

declare const kSBCModePageFlexibleDisk_TRDY_Bit: number;

declare const kIOTimingIDSMPTE240M_60hz: number;

declare const kIODeferCLUTSetAttribute: number;

declare const kSCSIServiceAction_XDREAD_32: number;

declare const kHIDUsage_Csmr_MedicalAlarm: number;

declare const kUSBSpeed_Mask: number;

declare const kVideoDDCciReplyType: number;

declare const kHIDUsage_Snsr_Environmental_WindSpeed: number;

declare const kHIDUsage_Csmr_MediaSelectGames: number;

declare const kSCSICmd_MODE_SENSE_6: number;

declare const kHIDUsage_BS_AtRateOK: number;

declare const kHIDUsage_LED_Pause: number;

declare const kHIDUsage_Button_107: number;

declare const kIOScaleRotate270: number;

declare const kHIDUsage_GD_SystemAppMenu: number;

declare const kATASMARTSelfTestStatusInProgress: number;

declare const kINQUIRY_Byte7_SYNC_Bit: number;

declare const kHardwareCursorDescriptorMinorVersion: number;

declare const kHIDUsage_Csmr_Quit: number;

declare const kCSRChannelsAvailable63_32: number;

declare const kIOVideoFeatureControlClassIDGain: number;

declare const kHardwareCursorDescriptorMajorVersion: number;

declare const kDisplaySubPixelShapeUndefined: number;

declare const kCDMediaTypeMin: number;

declare const INPUT_UNDEFINED: number;

declare const kSBCCmd_UPDATE_BLOCK: number;

declare const kHIDUsage_Snsr_Data_Electrical_Frequency: number;

declare const kHIDUsage_Csmr_Still: number;

declare const kUSB3HUBDesc: number;

declare const kHIDUsage_Dig_LightPen: number;

declare const kINQUIRY_Byte6_ENCSERV_Bit: number;

declare const kHIDPage_Undefined: number;

declare const kHIDUsage_Csmr_ALRemoteNetworkingOrISPConnect: number;

declare const kIOBlitMemoryRequiresHostFlush: number;

declare const kHIDUsage_Csmr_ACInsertObject: number;

declare const kFWSBP2CommandReservedORB: number;

declare const kSENSE_FILEMARK_Not_Set: number;

declare const kHIDUsage_Csmr_ALClock: number;

declare const kHIDUsage_BCS_PeriodicalOnlyDecodeWithPlus5: number;

declare const kFWAVCAsyncPlug23: number;

declare const kHIDUsage_KeyboardSelect: number;

declare const kHIDUsage_Snsr_Property_MinimumReportInterval: number;

declare const mPageCnt: number;

declare const kUSBMassStorageSFF8070iSubClass: number;

declare const kSBCCmd_SEEK_6: number;

declare const kSPCCmd_READ_ELEMENT_STATUS_ATTACHED: number;

declare const kSyncInterlaceMask: number;

declare const kFCPResponseAddress: number;

declare const kIORangeColorimetryBT2100: number;

declare const kHIDUsage_Button_122: number;

declare const kHIDUsage_Csmr_ACCatalog: number;

declare const kFWAckBusyX: number;

declare const kIOBlitSourceDefault: number;

declare const kHIDUsage_BCS_ContactScanner: number;

declare const kIOUSBDeviceRequestSetSel: number;

declare const kThirdDepthMode: number;

declare const kPowerStateReducedPower3: number;

declare const kSCCCmd_PERSISTENT_RESERVE_OUT: number;

declare const kSPCCmd_PREVENT_ALLOW_MEDIUM_REMOVAL: number;

declare const kIOAudioDeviceCanBeDefaultNothing: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilitySublinkDirectionTx: number;

declare const kConnectionColorDepthsSupported: number;

declare const kINQUIRY_Page83_CodeSetReserved: number;

declare const kIOCLUTPixels: number;

declare const kIOUSBUSB20ExtensionCapabilityBESLDPhase: number;

declare const kUSB100mAAvailable: number;

declare const kCSRMemoryBaseHiAddress: number;

declare const kConnectionPower: number;

declare const kIODynamicRangeNotSupported: number;

declare const kHIDUsage_Tfon_PhoneKeyA: number;

declare const kFWIsochTag: number;

declare const kHIDUsage_WD_WeightUnitPennyweights: number;

declare const kMirrorCanChangeTimingMask: number;

declare const kIOStreamMethodOpen: number;

declare const kHIDUsage_Csmr_Reserved: number;

declare const kHIDUsage_Sprt_8Iron: number;

declare const kPowerStateNeedsRefresh: number;

declare const kFWBIBMaxROMPhase: number;

declare const kUSBInterfaceIDShift: number;

declare const kSESCmd_RELEASE_6: number;

declare const kModeValid: number;

declare const kHIDUsage_GD_SystemMainMenu: number;

declare const kHIDUsage_AD_DisplayData: number;

declare const kIOTimingIDVESA_640x480_60hz: number;

declare const kIOPMNextLowerState: number;

declare const kHIDUsage_Snsr_Data_Motion_AngularPositionZAxis: number;

declare const kIOHIDAccelerationAlgorithmTypeDefault: number;

declare const kHIDUsage_AD_CharacterWidth: number;

declare const kIOUSBSuperSpeedHubCharacteristicsPowerSwitchingMask: number;

declare const kHIDUsage_Button_209: number;

declare const kMMCCmd_VERIFY_12: number;

declare const kHardwareDrive: number;

declare const kHIDUsage_Snsr_Event_SensorEvent_DataUpdated: number;

declare const kDisplayModeIDNoMoreResolutions: number;

declare const kSCSICmd_ERASE_10: number;

declare const kHIDUsage_BCS_PreventReadOfBarcodes: number;

declare const kIOCatalogAddDriversNoMatch: number;

declare const kHIDUsage_PID_ROM_PoolSize: number;

declare const kIOAsyncCalloutCount: number;

declare const kREAD_CAPACITY_RTO_Mask: number;

declare const kHIDUsage_Snsr_Motion_Accelerometer2D: number;

declare const kHIDUsage_Sim_Elevator: number;

declare const kDisplayModeStretchedFlag: number;

declare const kHIDUsage_BS_ResetToZero: number;

declare const kSyncOnMask: number;

declare const kSENSE_DATA_VALID: number;

declare const kRangeSupportsSignal_0700_0300_Bit: number;

declare const kIOHIDElementFlagsWrapMask: number;

declare const kIOFBBitRateHBR2: number;

declare const kSENSE_KEY_BLANK_CHECK: number;

declare const kIOUSBDeviceRequestGetInterface: number;

declare const kConnectionProbe: number;

declare const kConfigBusInfoBlockLengthPhase: number;

declare const kHIDUsage_Snsr_Event_SensorEvent_ChangeSensitivity: number;

declare const fourthVidMode: number;

declare const kIOHIDKeyboardPhysicalLayoutType101: number;

declare const timingSony_1900x1200_76hz: number;

declare const kHIDUsage_Snsr_Data_Motion_AccelerationAxisY: number;

declare const kHIDUsage_PD_Humidity: number;

declare const kHIDUsage_Csmr_ACDistributeH: number;

declare const kHIDUsage_Button_32: number;

declare const kRangeSupportsSignal_0700_0000_Bit: number;

declare const kHIDUsage_PD_Input: number;

declare const kIOFBTenPtTwoShmemVersion: number;

declare const kHIDUsage_Snsr_Data_Custom: number;

declare const kHIDPage_PowerDevice: number;

declare const kOSAsyncRef64Count: number;

declare const kIODisplayMatchingInfo: number;

declare const kHIDUsage_Tfon_ForwardCalls: number;

declare const kHIDUsage_Csmr_KeyboardInputAssistPreviousGroup: number;

declare const timingVESA_800x600_60hz: number;

declare const cscDrawHardwareCursor: number;

declare const kIOScalingInfoValid: number;

declare const kIOPMClockNormal: number;

declare const kHIDUsage_KeyboardPageDown: number;

declare const kScaleStretchToFitMask: number;

declare const kConnectionControllerDepthsSupported: number;

declare const kHIDUsage_Snsr_Environmental_AtmosphericPressure: number;

declare const kHIDUsage_GD_DockableDevicePrimaryUsagePage: number;

declare const kIOPMLowestState: number;

declare const kMMCDeviceTrayClosed: number;

declare const kHIDUsage_PID_TypeSpecificBlockOffset: number;

declare const kHIDUsage_Button_73: number;

declare const kHIDUsage_BD_BrailleRockerDown: number;

declare const kHIDUsage_BCS_BooklandEAN: number;

declare const kHIDUsage_KeypadPlus: number;

declare const kIORangeSupportsInterlacedCEATiming: number;

declare const kHIDUsage_BCS_EANTwoLabel: number;

declare const kDisplayModeInterlacedFlag: number;

declare const kIOAudioSelectorControlSubTypeChannelNominalLineLevel: number;

declare const kHIDUsage_AD_Columns: number;

declare const kHIDUsage_AD_ASCIICharacterSet: number;

declare const kIOHIDOptionsTypeSeizeDevice: number;

declare const kATAIdentifyPhysicalLogicalSectorSize: number;

declare const kHIDUsage_Button_235: number;

declare const kDisplaySubPixelLayoutRGB: number;

declare const kSBCModePageCaching_VS1_Mask: number;

declare const kFWAVCAsyncPlug14: number;

declare const kSSCPrinterCmd_MODE_SELECT_10: number;

declare const kHIDUsage_KeypadComma: number;

declare const kHIDUsage_BCS_MotorTimeout: number;

declare const kIOBlitFixedSource: number;

declare const timingVESA_1280x1024_60hz: number;

declare const kIOPMGoodValue: number;

declare const kHIDUsage_Dig_Tap: number;

declare const kIOWSAA_StateMask: number;

declare const kSCSICmd_WRITE_16: number;

declare const kPMLastAggressivenessType: number;

declare const kSGCCmd_COPY: number;

declare const kAnalogSignalLevel_0700_0300: number;

declare const kHIDUsage_PD_Flow: number;

declare const kIOPMClamshellOpened: number;

declare const kIOFBServerConnectType: number;

declare const kIODynamicRangeTraditionalGammaSDR: number;

declare const kSSCPrinterCmd_RECEIVE_DIAGNOSTICS_RESULTS: number;

declare const kIOPMFairValue: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilitySublinkDirectionPhase: number;

declare const kIOFBNS_UnDim: number;

declare const kSPCCmd_SET_DEVICE_IDENTIFIER: number;

declare const kIOATAFeatureSMART: number;

declare const kHIDUsage_Dig_Reserved: number;

declare const kHIDUsage_Snsr_Location_DeadReckoning: number;

declare const kIOMirrorDefaultAttribute: number;

declare const kIOHIDKeyboardPhysicalLayoutType103: number;

declare const kINQUIRY_Byte6_VS_Bit: number;

declare const kHIDUsage_Button_159: number;

declare const kDVDBookTypeHDRAM: number;

declare const kSBCModePageCaching_MF_Mask: number;

declare const kIOWSAA_DeferEnd: number;

declare const kHIDUsage_Csmr_ACAttachFile: number;

declare const kCSRStateLost: number;

declare const kConnectionBlueGammaScale: number;

declare const kHIDUsage_Snsr_Property_Time_DaylightSavingsTimeObserved: number;

declare const kHIDUsage_Dig_GestureCharacterEncodingUTF32LE: number;

declare const kSMCCmd_REQUEST_SENSE: number;

declare const kINQUIRY_Page83_CodeSetUTF8Data: number;

declare const kHIDUsage_WD_WeightUnitTroyOunce: number;

declare const kIOHSyncDisable: number;

declare const kHIDUsage_PID_DC_EnableActuators: number;

declare const kATAEnableUltraDMAModeMask: number;

declare const kIOFBCurrentShmemVersion: number;

declare const kIOMediumIEEE80211OptionAdhoc: number;

declare const kFWCommandInterfaceForceBlockRequest: number;

declare const kDCLNuDCLLeaderOp: number;

declare const timingApplePAL_FFconv: number;

declare const timingAppleSVGA: number;

declare const kIOMapStatic: number;

declare const kConfigGenerationKey: number;

declare const kHIDUsage_Csmr_ACForwardMessage: number;

declare const kDisplayModeTelevisionFlag: number;

declare const kIOWSAA_Unaccelerated: number;

declare const kModeSenseParameterHeader10_LongLBAMask: number;

declare const kHIDUsage_BCS_LongRangeScanner: number;

declare const kSBCWOCmd_RESERVE_6: number;

declare const kHIDUsage_Csmr_Treble: number;

declare const kHIDUsage_Sprt_1Iron: number;

declare const kIOTimingIDApple_560x384_60hz: number;

declare const kIOScaleCanBorderInsetOnly: number;

declare const EMBEDDED_DCC: number;

declare const kIOAsyncReservedCount: number;

declare const kHIDUsage_BS_FullyDischarged: number;

declare const kHIDUsage_BS_AtRateTimeToFull: number;

declare const kHIDUsage_BD_BrailleKeyboardDot3: number;

declare const kIOKitNoticationTypeMask: number;

declare const kSBCWOCmd_SET_LIMITS_10: number;

declare const kIOFBLinkVoltageLevel0: number;

declare const kDisplaySubPixelLayoutQuadGBR: number;

declare const kSCSICDBSize_16Byte: number;

declare const kVideoUsageAddrSubAddrMask: number;

declare const kHIDUsage_PD_PercentLoad: number;

declare const kIOUSBDeviceFeatureSelectorTestMode: number;

declare const kConfigEntryValue: number;

declare const kDVDRZoneInfoAddressTypeBorderNumber: number;

declare const kFWFailOnReset: number;

declare const IOVideoDevice: number;

declare const kSCSICmd_SEARCH_DATA_EQUAL_12: number;

declare const kINQUIRY_Byte7_VS_Mask: number;

declare const kIORGBSignedFloatingPointPixels: number;

declare const kMMCCmd_COPY: number;

declare const kHIDUsage_Tfon_PhoneKey6: number;

declare const kDVDFeaturesHDReadMask: number;

declare const kHIDUsage_Button_233: number;

declare const kUSBHIDInterfaceClass: number;

declare const kHIDUsage_Snsr_Data_Location_FixTypeFloatRTK: number;

declare const kCDFeaturesReadStructuresBit: number;

declare const kUSBInterfaceAssociationDesc: number;

declare const kHIDUsage_Csmr_ACResize: number;

declare const IOPMWillAckLater: number;

declare const kIOFBDisplayPortTrainingAttribute: number;

declare const kSBCWOCmd_COPY_AND_VERIFY: number;

declare const cscPrivateStatusCall: number;

declare const kHIDUsage_LED_HighCutFilter: number;

declare const kDVDMediaTypeHDR: number;

declare const kCDTOCFormatTOC: number;

declare const kSGCCmd_WRITE_BUFFER: number;

declare const kIOColorimetryNativeRGB: number;

declare const kHIDUsage_Csmr_ACNormalView: number;

declare const kIORangeBitsPerColorComponent10: number;

declare const kHIDUsage_Snsr_Data_Location_CountryOrRegion: number;

declare const kUSBBillboardUnspecifiedError: number;

declare const kHIDUsage_Snsr_Data_Motion_AngularVelocityXAxis: number;

declare const kSSCSeqCmd_MOVE_MEDIUM_ATTACHED: number;

declare const kINQUIRY_PERIPHERAL_QUALIFIER_Mask: number;

declare const kIOBlitTypeDestKeyColorNotEqual: number;

declare const kSSCSeqCmd_WRITE_FILEMARKS: number;

declare const kSCSICmd_INQUIRY: number;

declare const kIOMediumOptionFullDuplex: number;

declare const kCSRStateAtn: number;

declare const kDVDFeaturesReWriteableMask: number;

declare const timingVESA_1600x1200_75hz: number;

declare const kIORPCMessageOneway: number;

declare const kHIDUsage_BS_SMBBatteryStatus: number;

declare const kIOTimingIDAppleNTSC_ST: number;

declare const kSBCModePageCaching_DISC_Bit: number;

declare const kIOMediumOptionFlag1: number;

declare const kIOFBDisplayState_PipelineBlack: number;

declare const kUSBAdaptiveIsocSyncType: number;

declare const cscGetGray: number;

declare const kIOPSFamilyCodeExternal8: number;

declare const kINQUIRY_PERIPHERAL_RMB_BitMask: number;

declare const kSBCCmd_XPWRITE: number;

declare const cscGetScaler: number;

declare const kIOUSBDeviceRequestSetIsochronousDelay: number;

declare const kHIDUsage_Button_168: number;

declare const kSBCCmd_LOG_SENSE: number;

declare const kIOTimingIDAppleNTSC_FF: number;

declare const kIORangeSupportsSeparateSyncs: number;

declare const kHIDUsage_BCS_DLMethodReadAny: number;

declare const kHIDUsage_Tfon_VoiceMail: number;

declare const kIOVideoDeviceMethodCount: number;

declare const cscSetMirror: number;

declare const kHIDUsage_Game_HeightOfPOV: number;

declare const kHIDUsage_Csmr_ALAOrVCaptureOrPlayback: number;

declare const kHIDUsage_LED_Shift: number;

declare const kIOUSBVendorIDApple: number;

declare const kHardwareWakeToDoze: number;

declare const kHIDUsage_PD_Initialized: number;

declare const kHIDPage_VR: number;

declare const kSSCPrinterCmd_MODE_SELECT_6: number;

declare const kIORangeColorimetryWGRGB: number;

declare const kIOMediumIEEE80211DS5: number;

declare const kHIDUsage_BCS_HeaterPresent: number;

declare const kSyncOnGreenMask: number;

declare const kHIDUsage_Csmr_DataOnScreen: number;

declare const kHIDUsage_LED_ToneEnable: number;

declare const kHIDUsage_Button_114: number;

declare const kINQUIRY_Byte7_LINKED_Mask: number;

declare const kHIDUsage_Csmr_ChannelLowFrequencyEnhancement: number;

declare const kFWAVCAsyncPlug30: number;

declare const kIOHIDElementFlagsNoPreferredMask: number;

declare const kConnectionDisplayParameters: number;

declare const kHIDUsage_Tfon_PhoneKey8: number;

declare const kHIDUsage_Sim_SailingSimulationDevice: number;

declare const kIONUCResetNetworkDataIndex: number;

declare const kConfigNodeSwVersionKey: number;

declare const kSSCPrinterCmd_RELEASE_10: number;

declare const kATASupportsCompactFlashBit: number;

declare const kHIDUsage_GD_Vbrz: number;

declare const kHardwareWakeToDozeFromSuspend: number;

declare const cscGetGamma: number;

declare const kUSBMaxPipes: number;

declare const kDisplayVendorIDUnknown: number;

declare const kIOCatalogRemoveDriversNoMatch: number;

declare const kSENSE_KEY_VOLUME_OVERFLOW: number;

declare const kATAPhysicalLogicalEnabledBit1: number;

declare const kHIDUsage_BS_iDeviceChemistry: number;

declare const kIOColorimetryBT709: number;

declare const kUSBMassStorageUFISubClass: number;

declare const kHIDUsage_Snsr_Time: number;

declare const kIOUSBSuperSpeedDeviceCapabilitySupportHighSpeed: number;

declare const kIOHardwareCursorAttribute: number;

declare const kFWSBP2CommandCompleteNotify: number;

declare const kTickScale: number;

declare const kConnectionSupportsAppleSense: number;

declare const kHIDUsage_WD_ScaleScaleClassIIILEnglish: number;

declare const kHIDUsage_PD_DelayBeforeReboot: number;

declare const kIOAudioSMPTETimeType25: number;

declare const kUSBVendor: number;

declare const kIOPMProModeDisengaged: number;

declare const kHIDUsage_PID_DC_DeviceContinue: number;

declare const mVRes: number;

declare const kIOHIDTransactionOptionDefaultOutputValue: number;

declare const kATAIdentifyConfiguration: number;

declare const kIOSyncOnRed: number;

declare const kIOVideoFeatureControlClassIDBrightness: number;

declare const kUSBDeviceSpeedHigh: number;

declare const kConfigNodeDependentInfoKey: number;

declare const kHIDUsage_Snsr_Modifier_CalibrationMultiplier: number;

declare const kHIDUsage_Snsr_Data_Mechanical: number;

declare const kIOWSAA_NonConsoleDevice: number;

declare const kIOAudioTimeStampRateScalarValid: number;

declare const kHIDUsage_Button_75: number;

declare const kInvertingEncodingShift: number;

declare const kATASupportsAdvancedPowerManagementBit: number;

declare const kSBCCmd_WRITE_12: number;

declare const kINQUIRY_PERIPHERAL_RMB_MediumFixed: number;

declare const kIOPSFamilyCodeUSBHostSuspended: number;

declare const kHIDUsage_Button_147: number;

declare const kHIDUsage_Snsr_Data_Orientation_MagneticFlux: number;

declare const kPowerStateSleepAwareMask: number;

declare const kHIDUsage_KeyboardAgain: number;

declare const kSSCSeqCmd_READ_BUFFER: number;

declare const kHIDUsage_BCS_EAN_99_128_Mandatory: number;

declare const kCSRNodeIDsAddress: number;

declare const kHIDUsage_GD_SystemDisplaySwap: number;

declare const kHIDUsage_GD_DockableDeviceUniqueID: number;

declare const kHIDUsage_BS_FullyCharged: number;

declare const kSBCCmd_READ_UPDATED_BLOCK_10: number;

declare const kIOFBBitRateHBR: number;

declare const kIOTimingIDVESA_1024x768_60hz: number;

declare const kHIDUsage_Button_240: number;

declare const kHIDUsage_Snsr_Data_Biometric_HeartRate: number;

declare const kHIDUsage_Haptics_AutoTriggerAssociatedControl: number;

declare const mVersion: number;

declare const kSSCPrinterCmd_MODE_SENSE_10: number;

declare const kESCSixMSB2: number;

declare const kSGCCmd_SEND_DIAGNOSTICS: number;

declare const kIOPMPreventIdleSleep: number;

declare const kFWBIBMaxRecPhase: number;

declare const kClearInterfaceFeature: number;

declare const kHIDUsage_Snsr_Property_ReportingState_NoEvents: number;

declare const kHIDPage_LEDs: number;

declare const kHIDUsage_Snsr_Data_Location_SatellitesUsedCount: number;

declare const kHIDUsage_LED_CameraOn: number;

declare const kIO16BE565PixelFormat: number;

declare const kHIDUsage_LED_CameraOff: number;

declare const kIORangeSupportsSignal_1000_0400: number;

declare const kHIDUsage_Snsr_Data_Location_FixTypeSimulatorMode: number;

declare const kFWAVCConsumerMode_LESS: number;

declare const kIOAnalogSignalLevel_0700_0300: number;

declare const kHIDUsage_Snsr_Data_Location_AddressLine1: number;

declare const kHIDUsage_Dig_TipSwitch: number;

declare const kSESCmd_MODE_SELECT_10: number;

declare const kSCSICmd_SEND_KEY: number;

declare const kDCLJumpOp: number;

declare const kIOTimingIDAppleNTSC_STconv: number;

declare const kIOUSBEndpointDescriptorUsageTypeInterruptReserved2: number;

declare const kCSRUnitsBoundHiAddress: number;

declare const kSESCmd_MODE_SENSE_10: number;

declare const kHIDUsage_Snsr_Event_SensorEvent_PollResponse: number;

declare const kSMCCmd_PERSISTENT_RESERVE_OUT: number;

declare const kHIDUsage_KeyboardL: number;

declare const kIORegistryIterateParents: number;

declare const kIORegistryIterateRecursively: number;

declare const kDVDRZoneInfoAddressTypeRZoneNumber: number;

declare const kIOMasterPortDefault: number;

declare const kIOHIDSetRelativeCursorPosition: number;

declare const kOSAsyncRefSize: number;

declare const kOSAsyncRefCount: number;

declare const kOSAsyncRef64Size: number;

declare const kIOInterestCalloutCount: number;

declare const kIOMatchingCalloutCount: number;

declare const kIOAsyncCalloutRefconIndex: number;

declare const kUSBNotificationPostForcedSuspendBit: number;

declare const IOPMHighestState: number;

declare const kIOAsyncReservedIndex: number;

declare const kHIDUsage_Dig_Quality: number;

declare const kOSNotificationMessageID: number;

declare const kIOServicePublishNotificationType: number;

declare const kIOSystemStateSleepDescriptionHibernateStateWakingFromHibernate: number;

declare const kHIDUsage_PD_SwitchOnOff: number;

declare const kIOCatalogServiceTerminate: number;

declare const kIOMaxBusStall40usec: number;

declare const kSecondScale: number;

declare const kIOMapGuardedSmall: number;

declare const kIOMapGuardedMask: number;

declare const kIOMapPostedCombinedReordered: number;

declare const kIOMatchingCalloutFuncIndex: number;

declare const kIOMapRealTimeCache: number;

declare const kSPCProcCmd_INQUIRY: number;

declare const kIOMapCopybackInnerCache: number;

declare const kIOMapWriteCombineCache: number;

declare const kIOServiceInteractionAllowed: number;

declare const kIOMapInhibitCache: number;

declare const kIOMapDefaultCache: number;

declare const kIOPostedCombinedReordered: number;

declare const kMMCCmd_COMPARE: number;

declare const kIOPostedReordered: number;

declare const kIORealTimeCache: number;

declare const kSBCCmd_TEST_UNIT_READY: number;

declare const kIOCopybackInnerCache: number;

declare const kIODefaultMemoryType: number;

declare const EMBEDDED_CD_PLAYER: number;

declare const kIOMaxBusStall10usec: number;

declare const kHIDPage_BrailleDisplay: number;

declare const kINQUIRY_Page83_AssociationTargetDevice: number;

declare const kIOVideoFeatureControlClassIDTilt: number;

declare const kFramebufferDisableAltivecAccess: number;

declare const kIOAudioControlUsageInput: number;

declare const kHIDUsage_BCS_ConvertUPCAToEAN_13: number;

declare const kSSCSeqCmd_LOG_SELECT: number;

declare const kUSBSuperSpeedSupportsSS: number;

declare const kSetConfiguration: number;

declare const kOSAsyncCompleteMessageID: number;

declare const kINQUIRY_Byte6_MULTIP_Bit: number;

declare const kHIDUsage_Dig_StereoPlotter: number;

declare const kSCSICmd_LOG_SENSE: number;

declare const kHIDUsage_LED_GenericIndicator: number;

declare const kDisplayModeBuiltInFlag: number;

declare const kSCSICmd_PAUSE_RESUME: number;

declare const kIOPowerStateAttribute: number;

declare const timingApple_640x480_67hz: number;

declare const kHIDUsage_GD_CallMuteLED: number;

declare const kIOStreamEnqueueInputTrap: number;

declare const kIOFBNumCursorFramesShift: number;

declare const cscGetScanProc: number;

declare const kESCSevenNoDisplay: number;

declare const kHIDUsage_GD_SFShift: number;

declare const kSCSICmd_VendorSpecific_Start: number;

declare const kIOAudioStreamSampleFormatALaw: number;

declare const kAVPowerOn: number;

declare const kHIDUsage_GD_ResolutionMultiplier: number;

declare const kHIDUsage_Snsr_Data_Scanner: number;

declare const kINQUIRY_Byte5_ACC_Bit: number;

declare const kAnalogSetupExpectedMask: number;

declare const kIORDYBit: number;

declare const kIOTimingIDVESA_1856x1392_60hz: number;

declare const kHIDUsage_Dig_CapacitiveHeatMapDigitizer: number;

declare const kMultiModeCRT4Connect: number;

declare const kIOYUVUPixelFormat: number;

declare const kSGCCmd_INQUIRY: number;

declare const kVideoCombinedI2CTypeMask: number;

declare const kHIDUsage_Csmr_Plus10: number;

declare const kHIDUsage_Tfon_ProgrammableButton: number;

declare const kUSBInterrupt: number;

declare const kHIDUsage_Sim_FlightYoke: number;

declare const kHIDUsage_BD_6DotBrailleCell: number;

declare const kSSCSeqCmd_INQUIRY: number;

declare const kHIDUsage_BD_BraillePanRight: number;

declare const kHIDUsage_Button_255: number;

declare const kHIDUsage_Button_127: number;

declare const TELEPHONY_PHONE_LINE: number;

declare const kHIDUsage_Dig_3DDigitizer: number;

declare const kIOAudioSelectorControlSelectionValueInternalSpeaker: number;

declare const kHIDUsage_Sim_RearBrake: number;

declare const kHIDUsage_Button_216: number;

declare const kRemoveableMediaMask: number;

declare const kHIDUsage_Csmr_SlowTracking: number;

declare const kHIDUsage_Button_95: number;

declare const kHIDUsage_Snsr_Property_ReportingState_WakeThresholdEvents: number;

declare const kHIDUsage_Keyboard0: number;

declare const kIOUSBEndpointDescriptorTransferTypeIsochronous: number;

declare const kDisplaySubPixelShapeOval: number;

declare const kIOTimingIDVESA_1792x1344_60hz: number;

declare const kCSRErrorLogBufferAddress: number;

declare const kHIDUsage_Snsr_Property_SerialNumber: number;

declare const kIOAudioChannelLabel_Ambisonic_X: number;

declare const kSBCModePageCaching_IC_Mask: number;

declare const kHIDUsage_BCS_GRWTINoBeep_LampUseAtAll: number;

declare const kSCSIServiceAction_XDWRITEREAD_32: number;

declare const kHIDUsage_BCS_UPC_A: number;

declare const kIOAudioToggleControlSubTypeMute: number;

declare const kDisplaySubPixelConfigurationQuad: number;

declare const cscGetCurMode: number;

declare const kIOGDiagnoseConnectType: number;

declare const kHIDUsage_Csmr_VCRPlus: number;

declare const kIOUSBDeviceRequestSynchFrame: number;

declare const kINQUIRY_Byte6_Offset: number;

declare const kDVDCPRMRegion4: number;

declare const kHIDUsage_Sim_Clutch: number;

declare const kConnectionControllerColorDepth: number;

declare const kSPCCmd_LOG_SELECT: number;

declare const kSCSICmd_PERSISTENT_RESERVE_IN: number;

declare const kIOUSBUSB20ExtensionCapabilityBESLDValid: number;

declare const kUSBDeviceQualifierDesc: number;

declare const kIORangeBitsPerColorComponent16: number;

declare const kINQUIRY_PERIPHERAL_TYPE_SimplifiedDirectAccessRBCDevice: number;

declare const kIOMonoInverseDirectPixels: number;

declare const kHIDUsage_Csmr_ACSelectWord: number;

declare const kCSRInterruptTargetAddress: number;

declare const kHIDUsage_BS_ACPresent: number;

declare const kHIDUsage_Snsr_Event: number;

declare const kSBCWOCmd_WRITE_6: number;

declare const EMBEDDED_VCR_AUDIO: number;

declare const kHIDUsage_Button_87: number;

declare const kHIDUsage_KeyboardAlternateErase: number;

declare const kHIDUsage_GD_DockableDeviceObjectType: number;

declare const kHIDUsage_Snsr_Data_Orientation_HeadingTrueNorth: number;

declare const kHIDUsage_BCS_MSIPlesseyControlReport: number;

declare const kHIDUsage_BD_RouterSet3: number;

declare const kUSBNumLockKey: number;

declare const kUSBSynchronousIsocSyncType: number;

declare const kHIDUsage_Snsr_Data_Mechanical_Strain: number;

declare const kINQUIRY_PERIPHERAL_QUALIFIER_NotSupported: number;

declare const IOPMAuxPowerOn: number;

declare const kIOUSBEndpointDescriptorUsageTypeIsocImplicit: number;

declare const kHIDUsage_Snsr_Data_Light_ChromaticityY: number;

declare const kINQUIRY_Page83_AssociationShift: number;

declare const kHIDUsage_Csmr_Record: number;

declare const kDVDFeaturesWriteOnceBit: number;

declare const IOPMDeviceUsable: number;

declare const kIO32ABGRPixelFormat: number;

declare const kMirrorClippedMirrorMask: number;

declare const kScaleCanBorderInsetOnlyMask: number;

declare const kHIDUsage_Snsr_Property_ConnectionType_External: number;

declare const kHIDUsage_Snsr_Data_Location_VerticalDilutionOfPrecision: number;

declare const kMode3Bit: number;

declare const kUSBTDMLowBatteryType: number;

declare const kHIDUsage_Csmr_TrackingIncrement: number;

declare const kHIDUsage_Csmr_ALResearchOrSearchBrowswer: number;

declare const kHIDUsage_KeyboardLANG9: number;

declare const kModeInterlaced: number;

declare const kIOInterestCalloutServiceIndex: number;

declare const kIOAudioChannelLabel_Discrete_0: number;

declare const kIODisplayYCbCr444ColorComponentBits6: number;

declare const kSMCCmd_MODE_SELECT_10: number;

declare const kHIDUsage_Snsr_Data_Mechanical_Force: number;

declare const kIOAudioControlChannelIDDefaultRight: number;

declare const kHIDUsage_Button_246: number;

declare const kHIDUsage_Snsr_Data_Location_SatellitesInViewElevation: number;

declare const kHIDUsage_PID_ET_Ramp: number;

declare const kCSRUnitsBaseLoAddress: number;

declare const kHIDUsage_PD_Charger: number;

declare const cscGetPages: number;

declare const timingVESA_1280x960_60hz: number;

declare const kUSBDeviceSpeedFull: number;

declare const kHIDUsage_Csmr_ACZoomOut: number;

declare const kIOCapturedAttribute: number;

declare const kHIDUsage_Csmr_ACFullScreenView: number;

declare const kIOMapCacheShift: number;

declare const kATAIdentifyLogicalCylinderCount: number;

declare const kHIDUsage_Keyboard4: number;

declare const kHIDUsage_BD_BrailleJoystickUp: number;

declare const kUSBBillBoardClass: number;

declare const kHIDUsage_Button_19: number;

declare const kHIDUsage_Dig_TabletFunctionKeys: number;

declare const kDVDCPRMRegion2: number;

declare const kScaleRotate90Mask: number;

declare const kPMGeneralAggressiveness: number;

declare const kIOKitNoticationMsgSizeMask: number;

declare const kUSBMassStorageSCSISubClass: number;

declare const kMMCCmd_READ_6: number;

declare const kHIDUsage_AD_CharacterSpacingVertical: number;

declare const timingVESA_1600x1200_85hz: number;

declare const kHIDUsage_BCS_BarCodeScannerCradle: number;

declare const kMMCCmd_SEND_DIAGNOSTICS: number;

declare const kFWIsochTCode: number;

declare const kTransparentEncodingShift: number;

declare const kHIDUsage_Sprt_StickHeelOrToe: number;

declare const kIOMaxBusStallNone: number;

declare const kIOUSBSuperSpeedDeviceCapability5Gb: number;

declare const kIO16BE4444PixelFormat: number;

declare const kIOFBOnlineInterruptType: number;

declare const kIOMediaStateBusy: number;

declare const kHIDUsage_GD_Dial: number;

declare const kHIDUsage_BD_BraillePanLeft: number;

declare const kFullPageConnect: number;

declare const kDisplayModeValidForHiResFlag: number;

declare const kIOVRAMSaveAttribute: number;

declare const kConnectionFlushParameters: number;

declare const kIOBlitSourceFramebuffer: number;

declare const kHIDUsage_LED_WarningStatus: number;

declare const kIOAudioSMPTETimeType30Drop: number;

declare const kIOServiceTerminatedNotificationType: number;

declare const kHIDUsage_BS_RelativeStateOfCharge: number;

declare const kUSBCompositeClass: number;

declare const kSCSICmd_REDUNDANCY_GROUP_IN: number;

declare const kHIDUsage_Snsr_Property_ChangeSensitivityPercentRange: number;

declare const kHIDUsage_Csmr_ACJustifyBlockH: number;

declare const kIOFBChangedInterruptType: number;

declare const kHIDUsage_Button_15: number;

declare const kHIDUsage_AD_FontReport: number;

declare const kMessageMediaTypeDetermined: number;

declare const kIODisplayRGBColorComponentBits8: number;

declare const timingApple_1024x768_75hz: number;

declare const kATASupportsAdvancedPowerManagementMask: number;

declare const kIOPacketFilterMulticastAll: number;

declare const kIOUSBInterfaceFeatureSelectorSuspend: number;

declare const kHIDUsage_PID_ActuatorsEnabled: number;

declare const kHIDUsage_Snsr_Property_DevicePath: number;

declare const kHIDUsage_Csmr_MenuValueIncrease: number;

declare const kIOSystemStateSleepDescriptionHibernateStateInactive: number;

declare const kHIDRqGetProtocol: number;

declare const kHIDUsage_Csmr_ACUnlock: number;

declare const kHIDUsage_PID_SetPeriodicReport: number;

declare const kHIDUsage_Snsr_Data_Motion_Speed: number;

declare const IOPMConfigRetained: number;

declare const kHIDUsage_Button_119: number;

declare const kHIDUsage_Csmr_ACIdleKeepAlive: number;

declare const kHIDUsage_GD_RPM: number;

declare const kUSBClass: number;

declare const kUSBBillboardVConn5Watt: number;

declare const kHIDPage_PID: number;

declare const kHIDUsage_KeyboardR: number;

declare const kHIDUsage_LED_GreenLEDChannel: number;

declare const kIOAudioSelectorControlSelectionValueCD: number;

declare const kHIDUsage_Button_142: number;

declare const kSCCCmd_SPARE_OUT: number;

declare const kIOHIDPostHIDManagerEvent: number;

declare const kIOPMSystemCapabilityNetwork: number;

declare const kDVDFeaturesBUFWriteBit: number;

declare const kSSCSeqCmd_LOAD_UNLOAD: number;

declare const kIOMapUserOptionsMask: number;

declare const kIOFBDisplayPortLinkChangeInterruptType: number;

declare const kIODPEventContentProtection: number;

declare const kATAIdentifyCurrentCylinders: number;

declare const kHIDUsage_Snsr_Data_Motion_AngularVelocityYAxis: number;

declare const timingAppleNTSC_ST: number;

declare const kIOMirrorAttribute: number;

declare const kIOFBNS_MessageMask: number;

declare const kColorTwoPageConnect: number;

declare const kHIDUsage_BS_SMBChargerSpecInfo: number;

declare const kSSCSeqCmd_READ_ELEMENT_STATUS: number;

declare const kIOMaxBusStall5usec: number;

declare const kIODPEventSinkSpecific: number;

declare const kSBCCmd_WRITE_6: number;

declare const kIOTimingIDVESA_1600x1200_70hz: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilitySublinkSymmetryPhase: number;

declare const kATAIdentifyDriveCapabilities: number;

declare const kHIDUsage_BS_Usenext: number;

declare const kHIDUsage_KeyboardPause: number;

declare const kIOAudioPortTypeMixer: number;

declare const kHIDUsage_Snsr_Data_Location_AltitudeSeaLevel: number;

declare const kHIDUsage_Ord_Instance2: number;

declare const kIOPSFamilyCodeExternal4: number;

declare const kHIDUsage_PID_PhysicalInterfaceDevice: number;

declare const kHIDUsage_Csmr_FanSpeed: number;

declare const kHIDUsage_Button_54: number;

declare const kSCSIUntaggedTaskIdentifier: number;

declare const kSCCCmd_RESERVE_10: number;

declare const kHIDUsage_Snsr_Data_Custom_Value: number;

declare const kConnectionVideoBest: number;

declare const kIOScaleRotate0: number;

declare const kHIDUsage_Csmr_ContactPhoneNumberMobile: number;

declare const kRangeSupportsSyncOnGreenMask: number;

declare const kHIDUsage_Csmr_Mark: number;

declare const kSCSICmd_MAINTENANCE_IN: number;

declare const kUSBDeviceCapabilityBillboardAltMode: number;

declare const kHIDUsage_Snsr_Scanner_NFC: number;

declare const kHIDUsage_Button_91: number;

declare const kHIDUsage_Button_102: number;

declare const kIOAudioDeviceCanBeSystemOutput: number;

declare const kHIDUsage_BCS_PolarityInvertedBarCode: number;

declare const kIOAudioChannelLabel_RightTopMiddle: number;

declare const kHIDUsage_Csmr_GenericGUIApplicationControls: number;

declare const kHIDUsage_BS_InhibitCharge: number;

declare const kFWIsochChannelDefaultFlags: number;

declare const kMirrorSameSizeOnlyMirrorMask: number;

declare const kHIDUsage_Button_14: number;

declare const EXTERNAL_SPDIF_INTERFACE: number;

declare const kFWBIBLinkSpeedPhase: number;

declare const kHIDUsage_LED_IndicatorBlue: number;

declare const kHIDUsage_Csmr_ALLogoff: number;

declare const kHIDUsage_Csmr_ACForward: number;

declare const kHIDUsage_Csmr_ACSelectRow: number;

declare const kHIDUsage_Snsr_Property_Mechanical_VibrationState: number;

declare const kHIDUsage_Snsr_Data_Light: number;

declare const kPMMinutesToSpinDown: number;

declare const kIOBitsPerColorComponent8: number;

declare const kFWAckPending: number;

declare const kHIDUsage_Snsr_Data_Environmental: number;

declare const kHIDUsage_Csmr_ACInsertMode: number;

declare const cscDirectSetEntries: number;

declare const kINQUIRY_PERIPHERAL_TYPE_UnknownOrNoDeviceType: number;

declare const kIOSyncPositivePolarity: number;

declare const kATASupportsFlushCacheMask: number;

declare const kHIDUsage_PID_ET_Inertia: number;

declare const kUSB_HSFSEPDesc_wMaxPacketSize_Mult_Mask: number;

declare const kHIDUsage_AD_Reserved: number;

declare const kIOUSBFindInterfaceDontCare: number;

declare const kUSBVendorSpecificClass: number;

declare const kIOAudioChannelLabel_CenterSurround: number;

declare const kIOAsyncCompletionNotificationType: number;

declare const kHIDUsage_BCS_QRCode: number;

declare const kIOPMAssertionLevelOn: number;

declare const kHIDUsage_BD_ScreenReaderIdentifier: number;

declare const kHIDUsage_PD_InputID: number;

declare const kIOAudioControlUsageCoreAudioProperty: number;

declare const kUSBIrDABridgeSubClass: number;

declare const kSBCWOCmd_READ_10: number;

declare const kIOUSBEndpointDescriptorTransferTypeControl: number;

declare const kHIDUsage_PID_BlockLoadReport: number;

declare const kHIDUsage_Button_37: number;

declare const kATAPhysicalLogicalEnabledMask: number;

declare const kIOHIDActivityDisplayOn: number;

declare const kHIDUsage_Keypad0: number;

declare const timingVESA_1280x1024_75hz: number;

declare const kIOInhibitCache: number;

declare const kHIDUsage_Csmr_ACPaste: number;

declare const kHIDUsage_PID_BlockLoadStatus: number;

declare const kUSBBillboardVConn4Watt: number;

declare const kIOVideoSelectorControlClassIDDataSource: number;

declare const kHIDUsage_BCS_ElectronicArticleSurveillanceNotification: number;

declare const kHIDUsage_BS_PowerFail: number;

declare const kSCSICmd_REBUILD: number;

declare const kHIDUsage_Snsr_Property_Model: number;

declare const kHIDPage_KeyboardOrKeypad: number;

declare const kFWResponseConflictError: number;

declare const kHIDUsage_LED_Ready: number;

declare const kHIDUsage_LED_Player1: number;

declare const kSBCWOCmd_READ_ELEMENT_STATUS: number;

declare const kSCSICmd_VOLUME_SET_IN: number;

declare const kHIDUsage_Snsr_Scanner_RFID: number;

declare const kIOAudioStreamAlignmentHighByte: number;

declare const kIOTimingIDVESA_800x600_72hz: number;

declare const kIOHIDElementFlagsRelativeMask: number;

declare const kFWSBP2CommandVirtualORBs: number;

declare const kIORangePixelEncodingYCbCr444: number;

declare const kSCSICmd_READ_BUFFER_CAPACITY: number;

declare const kHIDUsage_Sprt_7Wood: number;

declare const kSBCWOCmd_REASSIGN_BLOCKS: number;

declare const kATATimeout1Minute: number;

declare const kIORangePixelEncodingYCbCr420: number;

declare const kIOMediaStateOnline: number;

declare const kUSBBillboardAdditinalInfoNoUSBPD: number;

declare const kHIDUsage_LED_Forward: number;

declare const kIOFBAVSignalTypeHDMI: number;

declare const kHIDUsage_PD_ConfigTemperature: number;

declare const kHIDUsage_Csmr_ACExpand: number;

declare const kDDCForceReadMask: number;

declare const kHIDUsage_WD_ScaleStatusInMotion: number;

declare const kMMCCmd_SEND_EVENT: number;

declare const kSCSIProtocolIdentifier_None: number;

declare const kHIDUsage_Snsr_Orientation_Inclinometer3D: number;

declare const kSCSICmd_SET_READ_AHEAD: number;

declare const kHIDPage_Arcade: number;

declare const kSBCCmd_MODE_SELECT_6: number;

declare const kCSRClockInfo2Address: number;

declare const kSPCProcCmd_SEND: number;

declare const kIOAudioSMPTETimeType60: number;

declare const kHIDUsage_Csmr_ACLock: number;

declare const kIOBlitTypeShowCursor: number;

declare const kHIDUsage_PD_PowerSupply: number;

declare const kREAD_CAPACITY_RTO_Enabled: number;

declare const kIOAnalogSignalLevel_0700_0000: number;

declare const kUSBGangOverCurrentNotificationType: number;

declare const kATAIdentifyDriveCapabilitiesExtended: number;

declare const kHIDUsage_MSR_Track1Length: number;

declare const kIOFixedCLUTPixels: number;

declare const kFWSBP2CommandTransferDataFromTarget: number;

declare const kIOMapUnique: number;

declare const kDCLSkipCycleOp: number;

declare const kHIDUsage_AD_ErrNotaloadablecharacter: number;

declare const kHIDUsage_PD_PowerSummary: number;

declare const kIODisplayDitherTemporal: number;

declare const kConfigUnitLocationKey: number;

declare const spGammaDir: number;

declare const kHIDUsage_BCS_PeriodicalAutoDiscriminatePlus5: number;

declare const kHIDUsage_Snsr_Data_Electrical_Current: number;

declare const kIOAudioClockSelectorTypeExternal: number;

declare const kHIDUsage_Snsr_Data_Biometric_HumanProximityRange: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilitySublinkLSEBits: number;

declare const kHIDPage_BatterySystem: number;

declare const kHIDUsage_PID_TypeSpecificBlockHandle: number;

declare const kHIDUsage_PID_EffectPlaying: number;

declare const kSSCPrinterCmd_READ_BUFFER: number;

declare const kIOUSBSuperSpeedDeviceCapabilitySupportLowSpeed: number;

declare const kHIDUsage_Button_177: number;

declare const kIOYUV211PixelFormat: number;

declare const kIOPMDriverAssertionPreventDisplaySleepBit: number;

declare const kHIDUsage_Tfon_TonesOff: number;

declare const kUSBCommClass: number;

declare const kHIDUsage_LED_EqualizerEnable: number;

declare const kSBCModePageFlexibleDisk_SSN_Mask: number;

declare const kHIDUsage_GD_Vbry: number;

declare const cscGetVideoParameters: number;

declare const kHIDUsage_Dig_GestureCharacterData: number;

declare const kIONetworkStackRegisterInterfaceAll: number;

declare const kUSBFeatureTestMode: number;

declare const kIOPMPreventSleep: number;

declare const kIOUSBEndpointDescriptorUsageTypeIsocReserved: number;

declare const kIO16BE555PixelFormat: number;

declare const kIORangeBitsPerColorComponentNotSupported: number;

declare const kHIDUsage_Snsr_Property_ReleaseData: number;

declare const kConfigUnitSWVersIIDC100: number;

declare const kIOPMInitialDeviceState: number;

declare const kUSBNotificationPreForcedResumeBit: number;

declare const kSCCCmd_MODE_SENSE_10: number;

declare const kSBCCmd_MOVE_MEDIUM_ATTACHED: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilitySublinkSymmetric: number;

declare const kVideoDisplayPortNativeType: number;

declare const kHIDUsage_BCS_EAN13FlagDigit1: number;

declare const kUSBNoUserNotificationType: number;

declare const kINQUIRY_PERIPHERAL_TYPE_DirectAccessSBCDevice: number;

declare const kFWAVCConsumerMode_JUNK: number;

declare const kIOMapGuardedLarge: number;

declare const kConnectionEnable: number;

declare const kHIDUsage_Tfon_LineBusyTone: number;

declare const kHIDUsage_BS_ChargingIndicator: number;

declare const kIOMediumEthernet10GBaseSR: number;

declare const kHIDUsage_Dig_WhiteBoard: number;

declare const kIOPMExternalPower: number;

declare const timingVESA_1600x1200_60hz: number;

declare const kHIDUsage_Snsr_Property_Location_AccuracyMedium: number;

declare const kSBCCmd_XDWRITE_EXTENDED: number;

declare const kSCSICmd_RELEASE_6: number;

declare const kINQUIRY_RESPONSE_DATA_FORMAT_Mask: number;

declare const IOPMBadSpecification: number;

declare const kMMCCmd_READ_HEADER: number;

declare const kHIDUsage_Csmr_ShowCounter: number;

declare const kHIDUsage_Button_8: number;

declare const cscSwitchMode: number;

declare const kIOFBShmemVersionMask: number;

declare const kHIDUsage_Button_193: number;

declare const kHIDUsage_Csmr_ALLocalMachineBrowser: number;

declare const kSyncPositivePolarityMask: number;

declare const kMicrosecondScale: number;

declare const kIOAnalogSignalLevel_1000_0400: number;

declare const kINQUIRY_Byte5_SCCS_Bit: number;

declare const kIOHIDNumLockState: number;

declare const kIOUSBSuperSpeedDeviceCapabilityU1DevExitLatMax: number;

declare const kIOPSFamilyCodeExternal7: number;

declare const kHIDUsage_BS_BelowRemainingCapacityLimit: number;

declare const kIOHIDElementFlagsVolativeMask: number;

declare const kCDFeaturesRawWriteMask: number;

declare const kHIDUsage_PID_Direction: number;

declare const kHIDUsage_VR_DisplayEnable: number;

declare const kChecksumValidCookie: number;

declare const kIOATAMaxPerformance: number;

declare const kConnectionPostWake: number;

declare const kHIDUsage_Csmr_ACRefresh: number;

declare const kCSRArgumentLoAddress: number;

declare const kIOPMBadSpecification: number;

declare const kSSCSeqCmd_SEND_DIAGNOSTICS: number;

declare const kUSBCapsLockKey: number;

declare const kHIDUsage_Snsr_Property_PowerState: number;

declare const kREAD_CAPACITY_PROT_Disabled: number;

declare const kUSBRel10: number;

declare const kSCSIProtocolIdentifier_FireWire: number;

declare const kHIDUsage_PD_iserialNumber: number;

declare const kIOPMDriverAssertionUSBExternalDeviceBit: number;

declare const kSCSIProtocolIdentifier_ADT: number;

declare const kUSBSuperSpeedEndpointCompanion: number;

declare const kHIDUsage_Button_132: number;

declare const kFireWireCommandAbsolute: number;

declare const kHIDUsage_WD_Undefined: number;

declare const kIODisplayYCbCr422ColorComponentBits14: number;

declare const kIOTimingIDSony_1920x1080_72hz: number;

declare const kHIDPage_Telephony: number;

declare const kDVDKeyFormatSetRegion: number;

declare const kINQUIRY_Byte6_MULTIP_Mask: number;

declare const kHIDUsage_AD_StatNotReady: number;

declare const kHIDUsage_LED_BatteryOK: number;

declare const kINQUIRY_Byte7_CMDQUE_Bit: number;

declare const kIOPMUndefinedValue: number;

declare const kHIDUsage_Snsr_Data_Motion: number;

declare const kIOBlitWaitGlobal: number;

declare const kATAMultipleLogicalSectorsBit: number;

declare const kRBCCmd_SYNCHRONIZE_CACHE: number;

declare const kHIDUsage_Ord_Instance1: number;

declare const kIOBlitTypeDestKeyColorEqual: number;

declare const kHIDUsage_PD_OverTemperature: number;

declare const kHIDUsage_Snsr_Data_Location_FixTypeNoFix: number;

declare const kHIDUsage_Sim_FlightStick: number;

declare const kHIDUsage_Csmr_MediaSelectTV: number;

declare const kHIDUsage_Snsr_Other_Custom: number;

declare const kATASupportsPowerManagementMask: number;

declare const kHIDUsage_Snsr_Property_ConnectionType_Integrated: number;

declare const kHIDUsage_Csmr_MediaSelectTuner: number;

declare const kHIDUsage_KeyboardPrior: number;

declare const kHIDUsage_Dig_Eraser: number;

declare const kIOHIDValueOptionsFlagPrevious: number;

declare const kHIDUsage_Snsr_Data_Environmental_Reserved: number;

declare const kHIDUsage_BD_BrailleButtons: number;

declare const kHIDUsage_Snsr_Modifier_PeriodMax: number;

declare const kIsMonoDev: number;

declare const kDVDFeaturesReWriteableBit: number;

declare const kHIDUsage_LED_Conference: number;

declare const kHIDUsage_KeyboardF23: number;

declare const kSCCCmd_MODE_SELECT_10: number;

declare const kHIDUsage_Dig_CapacitiveHeatMapProtocolVersion: number;

declare const kIOUSBDeviceRequestGetDescriptor: number;

declare const kHIDUsage_KeyboardLANG5: number;

declare const kHRConnect: number;

declare const kHIDUsage_LED_Player7: number;

declare const kHIDUsage_GD_DockableDeviceDockingState: number;

declare const kHIDUsage_Snsr_Event_SensorState_NoData: number;

declare const kIOAudioChannelLabel_LeftTopRear: number;

declare const kSBCCmd_SEARCH_DATA_LOW_10: number;

declare const kVideoBusTypeI2C: number;

declare const kHIDUsage_Snsr_Orientation: number;

declare const kHIDUsage_Csmr_ALWirelessStatus: number;

declare const kIOEthernetWakeOnMagicPacket: number;

declare const kHIDUsage_WD_ScaleControlReport: number;

declare const kHIDUsage_BCS_TriggerMode: number;

declare const kHIDUsage_Csmr_MenuUp: number;

declare const kDVDBookTypePlusRWDoubleLayer: number;

declare const kDCLSendBufferOp: number;

declare const kHIDUsage_Snsr_Data_Custom_Value3: number;

declare const kHIDUsage_Snsr_Property_PersistentUniqueID: number;

declare const kIOConnectionBuiltIn: number;

declare const kIOUSBSuperSpeedHubCharacteristicsOverCurrentMask: number;

declare const kHIDUsage_PID_Offset: number;

declare const kIOAudioDeviceTransportTypeUSB: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilitySublinkLSEPhase: number;

declare const kSSCPrinterCmd_LOG_SENSE: number;

declare const kIOAudioSMPTETimeValid: number;

declare const kDCLSendPacketStartOp: number;

declare const kMMCCmd_PLAY_RELATIVE_12: number;

declare const kSSCPrinterCmd_STOP_PRINT: number;

declare const kIODisplayDitherDefault: number;

declare const kATAIdentifyMinorVersion: number;

declare const kHIDUsage_Csmr_ACViewToggle: number;

declare const kUSBFeedbackIsocUsageType: number;

declare const kIOAudioControlChannelIDDefaultFrontLeftCenter: number;

declare const kIOAudioToggleControlSubTypePhaseInvert: number;

declare const EMBEDDED_MULTITRACK_RECORDER: number;

declare const kIOPSFamilyCodeUSBCPD: number;

declare const kHIDUsage_GD_SystemMenuRight: number;

declare const kSENSE_KEY_HARDWARE_ERROR: number;

declare const kIOHIDEventQueueTypeKernel: number;

declare const kHIDUsage_Dig_GestureCharacterQuality: number;

declare const kMMCCmd_PLAY_RELATIVE_10: number;

declare const kHIDUsage_BD_RouterSet1: number;

declare const EMBEDDED_EQUALIZATION_NOISE: number;

declare const kHIDUsage_LED_UsageInUseIndicator: number;

declare const kUSBCommCAPISubClass: number;

declare const kHIDUsage_Button_214: number;

declare const kSESCmd_PERSISTENT_RESERVE_OUT: number;

declare const kHIDUsage_Snsr_Event_SensorEvent_PeriodExceeded: number;

declare const kESCSixMSB1: number;

declare const kSBCCmd_VERIFY_10: number;

declare const kHIDUsage_BCS_NotOnFileVolume: number;

declare const kIODefaultCache: number;

declare const kIOTimingIDVESA_640x480_75hz: number;

declare const kHIDUsage_Csmr_ContactMisc: number;

declare const kVideoReplyMicroSecDelayMask: number;

declare const kConnectionIgnore: number;

declare const kSGCCmd_MODE_SELECT_6: number;

declare const kHIDUsage_GD_CoolantPump: number;

declare const kSPCProcCmd_LOG_SENSE: number;

declare const kHIDUsage_Button_194: number;

declare const kSBCWOCmd_SEND_DIAGNOSTICS: number;

declare const kSBCModePageCaching_SIZE_Bit: number;

declare const kFWAckBusyA: number;

declare const kUSBHUBDesc: number;

declare const kIOServiceMessageNotificationType: number;

declare const kIOPacketFilterBroadcast: number;

declare const kHIDUsage_GD_DockableDeviceDisplayOcclusion: number;

declare const kIOMirrorIsPrimary: number;

declare const kMultiModeCRT3Connect: number;

declare const kUSBEndPtShift: number;

declare const kIOTimingIDVESA_1600x1200_65hz: number;

declare const kATAIdentifySerialNumber: number;

declare const kHIDUsage_Keyboard_Reserved: number;

declare const kIOMapReadOnly: number;

declare const kFirstIOKitNotificationType: number;

declare const kHIDUsage_Sim_AutomobileSimulationDevice: number;

declare const kHIDUsage_Dig_DeviceIdentifier: number;

declare const kIORangeDynamicRangeTraditionalGammaHDR: number;

declare const kHIDUsage_Haptics_WaveformNone: number;

declare const kHIDUsage_Sprt_PowerWedge: number;

declare const fifthVidMode: number;

declare const kIODisplayYCbCr422ColorComponentBits12: number;

declare const kIOMediumIEEE80211Auto: number;

declare const kNTSCConnect: number;

declare const kFWAVCAsyncPlug3: number;

declare const kSCCCmd_MODE_SENSE_6: number;

declare const kHIDUsage_Csmr_SurroundMode: number;

declare const kHIDUsage_Csmr_ALNextTaskOrApplication: number;

declare const kHIDUsage_Snsr_Mechanical_Strain: number;

declare const kHIDUsage_Csmr_ContactEmailBusiness: number;

declare const kGetDeviceStatus: number;

declare const kHIDUsage_Snsr_Property_Accuracy: number;

declare const kHIDUsage_GD_Vy: number;

declare const kHIDUsage_Dig_Touch: number;

declare const kSBCModePageFlexibleDiskCode: number;

declare const kHIDUsage_BCS_GoodReadToneFrequency: number;

declare const kHIDUsage_PID_MoveDestination: number;

declare const kINQUIRY_PERIPHERAL_TYPE_StorageArrayControllerSCC2Device: number;

declare const kATAOperationTypeRead: number;

declare const kSCSICmd_VERIFY_16: number;

declare const kATAMultipleLogicalSectorsMask: number;

declare const kHIDUsage_BD_Undefined: number;

declare const kIODisplayYCbCr422ColorComponentBits16: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilitySublinkSpeedAttrCountPhase: number;

declare const kIO32BGRAPixelFormat: number;

declare const kHIDUsage_LED_CallPickup: number;

declare const kScaleInvertXMask: number;

declare const kHIDUsage_Tfon_SpeakerPhone: number;

declare const kIOVideoControlBaseClassIDFeature: number;

declare const kHIDUsage_AD_DisplayAttributesReport: number;

declare const kIO1IndexedGrayPixelFormat: number;

declare const kHIDUsage_Snsr_Data_Location_GPSSelectionModeAutonomous: number;

declare const kHIDUsage_Snsr_Data_Custom_Value5: number;

declare const kIOHIDCapsLockState: number;

declare const kIODigitalSignal: number;

declare const kDVDMediaTypeHDRAM: number;

declare const kIOMediaAttributeRemovableMask: number;

declare const kIOInterlacedCEATiming: number;

declare const timingApplePAL_STconv: number;

declare const kIOAudioInputPortSubTypeLine: number;

declare const kHIDUsage_Game_PitchUpOrDown: number;

declare const BIDIRECTIONAL_HEADSET: number;

declare const kIOWSAA_Transactional: number;

declare const kIOVideoControlScopePlayThrough: number;

declare const kATAIdentifyMajorVersion: number;

declare const kDVDFeaturesPlusRBit: number;

declare const kDisplayModeSimulscanFlag: number;

declare const kIOVideoControlScopeGlobal: number;

declare const kHIDUsage_GD_SystemMicrophoneMute: number;

declare const kHIDUsage_Csmr_BassBoost: number;

declare const kSGCCmd_RESERVE_6: number;

declare const kIOWSAA_To_Accelerated: number;

declare const kIOBlitWaitContext: number;

declare const kIODisplayYCbCr422ColorComponentBits6: number;

declare const kIOFBDisplayState_Mask: number;

declare const kIORPCMessageKernel: number;

declare const kIOTimingIDVESA_1280x960_60hz: number;

declare const kIOAudioStreamNumericRepresentationIEEE754Float: number;

declare const kIOSystemPowerAttribute: number;

declare const cscGetFeatureConfiguration: number;

declare const kSCSICmd_SEND: number;

declare const kSBCCmd_PERSISTENT_RESERVE_OUT: number;

declare const kIOFBMaxCursorDepth: number;

declare const kHIDUsage_Snsr_Electrical_Potentiometer: number;

declare const kIOUSBHubDelayNs: number;

declare const kHIDUsage_Sim_Steering: number;

declare const timingVESA_800x600_56hz: number;

declare const kHIDUsage_Snsr_Data_Location_GPSSelectionModeSimulator: number;

declare const kHIDUsage_Csmr_ACEdit: number;

declare const kIdentifyWordValidationMask: number;

declare const kIOAudioTimeStampSampleHostTimeValid: number;

declare const kCurFieldsValidBit: number;

declare const kHIDUsage_KeyboardOper: number;

declare const kPowerStateSleepNoDPMSBit: number;

declare const kSESCmd_RECEIVE_DIAGNOSTICS_RESULTS: number;

declare const kHIDUsage_Csmr_KeyboardInputAssistPrevious: number;

declare const kINQUIRY_PERIPHERAL_TYPE_SequentialAccessSSCDevice: number;

declare const kHIDUsage_Csmr_ALVirusProtection: number;

declare const kRSCTwo: number;

declare const kHIDUsage_BS_TerminateDischarge: number;

declare const kSCSIServiceAction_SET_PRIORITY: number;

declare const kHIDUsage_Csmr_ACViewClock: number;

declare const kSESCmd_REQUEST_SENSE: number;

declare const kSyncPositivePolarityBit: number;

declare const kHIDUsage_Sprt_GolfClub: number;

declare const kHIDUsage_Dig_GestureCharacterEncoding: number;

declare const kModeNotResize: number;

declare const EXTERNAL_TDIF: number;

declare const kHIDUsage_Csmr_Loudness: number;

declare const kHIDUsage_Tfon_PhoneKeyB: number;

declare const kIOTimingIDVESA_640x480_85hz: number;

declare const kSENSE_EOM_Mask: number;

declare const kIONTSCTiming: number;

declare const kHIDPage_Consumer: number;

declare const kSBCCmd_REQUEST_SENSE: number;

declare const kCDTOCFormatTEXT: number;

declare const kIOPixelEncodingYCbCr444: number;

declare const timingApple_560x384_60hz: number;

declare const kIOColorimetryNotSupported: number;

declare const kHIDUsage_Button_57: number;

declare const kHIDUsage_Csmr_ApplicationLaunchButtons: number;

declare const kUSBRqGetState: number;

declare const kHIDUsage_Snsr_Data_Orientation_HeadingCompensatedTrueNorth: number;

declare const kHIDUsage_Csmr_Media: number;

declare const kIOMediumEthernet100BaseTX: number;

declare const kDVDKeyClassCSS_CPPM_CPRM: number;

declare const kHIDUsage_Csmr_ACMaximize: number;

declare const kPMMinutesToSleep: number;

declare const kHIDUsage_Snsr_Data_Motion_AccelerationAxisX: number;

declare const kFWAVCAsyncPlug11: number;

declare const kHIDUsage_Button_70: number;

declare const kIOPMRootDomainState: number;

declare const kHIDUsage_Tfon_PhoneKeyD: number;

declare const kHIDUsage_PID_CustomForceDataReport: number;

declare const kFWBIBIrmc: number;

declare const kHIDUsage_KeyboardV: number;

declare const kHIDUsage_Button_202: number;

declare const kDVDFeaturesHDRBit: number;

declare const kHIDUsage_AD_HorizontalScroll: number;

declare const kSBCWOCmd_WRITE_AND_VERIFY_10: number;

declare const kUSBAddress_Shift: number;

declare const kSCSIServiceAction_READ_LONG_16: number;

declare const kHIDUsage_BCS_DisableCheckDigitTransmit: number;

declare const kHIDUsage_Button_123: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilitySublinkDirection: number;

declare const kIOStorageUnmapOptionWhole: number;

declare const kHIDUsage_GD_SystemBreak: number;

declare const kHIDUsage_Sim_Brake: number;

declare const kFramebufferSupportsGammaCorrection: number;

declare const kHIDUsage_LED_Mute: number;

declare const kHIDUsage_Snsr_Data_Mechanical_AbsolutePressure: number;

declare const kIOFBRedGammaScaleAttribute: number;

declare const kREAD_CAPACITY_PROT_Enabled: number;

declare const kHIDUsage_Csmr_KeyboardKeyType: number;

declare const kHIDUsage_Snsr_Data_Time_Month: number;

declare const kHIDUsage_Csmr_ALVoicemail: number;

declare const kSCSICmd_PLAY_RELATIVE_10: number;

declare const kDependentConnection: number;

declare const kIOPMLowPower: number;

declare const kIOStreamOptionOpenShared: number;

declare const kIOPMClamshellClosed: number;

declare const kUSBRqClearFeature: number;

declare const kHIDUsage_Sim_TankSimulationDevice: number;

declare const kSCSICmd_SERVICE_ACTION_IN: number;

declare const kUSBDeviceCapabilityUSB20Extension: number;

declare const kHIDUsage_PD_Outlet: number;

declare const kINQUIRY_Byte7_VS_Bit: number;

declare const kATASMARTOffLineCollectionMask: number;

declare const kConfigUnitSpecAppleA27: number;

declare const INPUT_MODEM_AUDIO: number;

declare const kSBCCmd_XDWRITE: number;

declare const kMessageTrayStateChangeRequestAccepted: number;

declare const kHIDUsage_Snsr_Data_Motion_State: number;

declare const kIODynamicRangeDolbyTunnelMode: number;

declare const kSENSE_KEY_RECOVERED_ERROR: number;

declare const kFWAckBusyB: number;

declare const kSBCCmd_PREFETCH: number;

declare const kHIDUsage_Snsr_Motion_MotionDetector: number;

declare const kUSBDeviceCountExceededNotificationType: number;

declare const kIOFBUserRequestProbe: number;

declare const kHIDUsage_KeyboardF1: number;

declare const kIOHIDQueueOptionsTypeEnqueueAll: number;

declare const kMirrorCanChangePixelFormatMask: number;

declare const kHIDUsage_Button_90: number;

declare const kUSBDeviceCapabilityBillboard: number;

declare const kHIDUsage_BS_AbsoluteStateOfCharge: number;

declare const kHIDUsage_KeypadSlash: number;

declare const kHIDUsage_PID_PoolReport: number;

declare const kHIDUsage_Snsr_Data_Electrical_ElectricalPower: number;

declare const kModeRequiresPan: number;

declare const kNonMagneticDriveBit: number;

declare const kDVDBookTypeR: number;

declare const kIOAudioSMPTETimeType60Drop: number;

declare const kDiscStatusIncomplete: number;

declare const kScaleCanDownSamplePixelsMask: number;

declare const kIOBitsPerColorComponent12: number;

declare const kSCSICmd_SEARCH_DATA_HIGH_10: number;

declare const kUSBCommunicationDataInterfaceClass: number;

declare const kSetInterface: number;

declare const kHIDUsage_KeyboardReturnOrEnter: number;

declare const kHIDUsage_Button_1: number;

declare const kSBCCmd_WRITE_LONG: number;

declare const kHIDUsage_BCS_CheckDigitCode99Enable: number;

declare const kHIDUsage_Snsr_Data_Time: number;

declare const kSCSICmd_LOCK_UNLOCK_CACHE: number;

declare const kHIDUsage_PID_SetConditionReport: number;

declare const OUTPUT_HEAD_MOUNTED_DISPLAY_AUDIO: number;

declare const kUSBInterfacePowerDesc: number;

declare const kHIDUsage_Snsr_Mechanical_BooleanSwitchArray: number;

declare const kHIDUsage_Button_183: number;

declare const kSENSE_DATA_VALID_Mask: number;

declare const TELEPHONY_DOWN_LINE_PHONE: number;

declare const kIOHIDOpenedByEventSystem: number;

declare const kSCSIDataTransfer_FromInitiatorToTarget: number;

declare const kHIDUsage_Sim_Ballast: number;

declare const kHIDUsage_BCS_StatusReport: number;

declare const kUSBRqSetConfig: number;

declare const kINQUIRY_Page83_AssociationLogicalUnit: number;

declare const kHIDUsage_KeyboardLANG8: number;

declare const kHIDUsage_Dig_ContactIdentifier: number;

declare const kUSBPRimeStream: number;

declare const kUSBBillboardVConn1Watt: number;

declare const kHIDUsage_Sprt_StickFaceAngle: number;

declare const kIOTimingIDVESA_800x600_85hz: number;

declare const kHIDUsage_PID_ET_SawtoothDown: number;

declare const kHIDUsage_Csmr_ALEntertainmentContentBrowser: number;

declare const kHIDUsage_GD_SystemDisplayRotationLockButton: number;

declare const kHIDUsage_Snsr_Data_Location_FixQuality: number;

declare const kSCSICmd_SET_LIMITS_10: number;

declare const timingVESA_640x480_75hz: number;

declare const kBDFeaturesReadMask: number;

declare const kHIDUsage_KeyboardInternational1: number;

declare const kHIDUsage_KeyboardF15: number;

declare const kModeStretched: number;

declare const kUSBAudioInterfaceClass: number;

declare const kSyncOnRedMask: number;

declare const kATASMARTOffLineCollectionSuspendedByHost: number;

declare const kHIDUsage_Csmr_ACRotate: number;

declare const kHIDUsage_Tfon_PhoneKey3: number;

declare const kHIDUsage_PD_DelayBeforeShutdown: number;

declare const kIOFBNS_GenerationMask: number;

declare const TELEPHONY_TELEPHONE: number;

declare const kHIDUsage_Button_41: number;

declare const kPowerStateSleepCanPowerOffBit: number;

declare const kHIDUsage_Sprt_Treadmill: number;

declare const kSBCWOCmd_LOCK_UNLOCK_CACHE: number;

declare const kIOMaxBusStall25usec: number;

declare const kMaxAsyncArgs: number;

declare const kHIDUsage_Button_104: number;

declare const kHIDUsage_Button_26: number;

declare const kSENSE_EOM_Not_Set: number;

declare const kUSBCommTelephoneSubClass: number;

declare const kHIDUsage_PID_DeviceManagedPool: number;

declare const kIOEthernetWakeOnPacketAddressMatch: number;

declare const kSBCCmd_WRITE_BUFFER: number;

declare const kHIDUsage_Button_162: number;

declare const EMBEDDED_UNDEFINED: number;

declare const timingApple_640x818_75hz: number;

declare const kHIDPage_Ordinal: number;

declare const cscSetPowerState: number;

declare const kDVDFeaturesHDRWMask: number;

declare const kSPCProcCmd_SEND_DIAGNOSTICS: number;

declare const kIOCatalogResetDefault: number;

declare const kIOAudioDeviceTransportTypeAVB: number;

declare const kIODSCBlockPredEnable: number;

declare const kSBCWOCmd_RESERVE_10: number;

declare const kHIDUsage_PID_AttackLevel: number;

declare const kHIDUsage_Sim_Shifter: number;

declare const kDVDKeyFormatAGID_CPRM: number;

declare const kIdentifyWordValid: number;

declare const kHIDUsage_PD_Voltage: number;

declare const kConfigUnitPollMaskKey: number;

declare const kIOPMThermalLevelUnknown: number;

declare const kRangeSupportsSignal_1000_0400_Mask: number;

declare const kHIDUsage_KeyboardExecute: number;

declare const kHIDUsage_AD_DisplayControlReport: number;

declare const kIOPMPassThrough: number;

declare const kHIDUsage_PD_AudibleAlarmControl: number;

declare const timingApple19: number;

declare const kFWBroadcastNodeID: number;

declare const kSCSICmd_ACCESS_CONTROL_OUT: number;

declare const kUSBbEndpointDirectionMask: number;

declare const kIOHIDStandardTypeJIS: number;

declare const kINQUIRY_PERIPHERAL_QUALIFIER_Connected: number;

declare const kHIDUsage_BS_CapacityGranularity1: number;

declare const kIOTimingIDVESA_1024x768_70hz: number;

declare const kHIDUsage_BS_RemainingTimeLimit: number;

declare const kDepthMode5: number;

declare const kHIDUsage_Button_178: number;

declare const kIOTimingIDInvalid: number;

declare const kHIDUsage_Snsr_Mechanical_Weight: number;

declare const kConnectionRedGammaScale: number;

declare const kHIDUsage_KeyboardF8: number;

declare const kDCLReceiveBufferOp: number;

declare const kCSRStateClearAddress: number;

declare const kINQUIRY_Byte7_RELADR_Bit: number;

declare const kCSRSplitTimeoutHiAddress: number;

declare const kHIDUsage_BCS_EAN13FlagDigit2: number;

declare const kHIDUsage_BD_BrailleRightControls: number;

declare const kHIDUsage_WD_WeightUnit: number;

declare const kHIDUsage_BCS_ConstantElectronicArticleSurveillance: number;

declare const kDVDBookTypePlusRDoubleLayer: number;

declare const kDiscStatusEmpty: number;

declare const kESCThree21InchRadius: number;

declare const kHIDUsage_KeyboardF7: number;

declare const kUSBNotificationPostForcedResumeBit: number;

declare const kSCSICmd_MOVE_MEDIUM_ATTACHED: number;

declare const kHIDUsage_Snsr_Other_Generic: number;

declare const kIOVideoDeviceMethodGetMode: number;

declare const kHIDUsage_AD_StatReady: number;

declare const kIORangeSupportsSignal_0700_0000: number;

declare const kHIDUsage_Button_163: number;

declare const IOPMContextRetained: number;

declare const kSBCCmd_READ_6: number;

declare const kHIDUsage_BCS_AztecCode: number;

declare const kPCRBaseAddress: number;

declare const kHIDUsage_BCS_FirstDiscreteLengthToDecode: number;

declare const kHIDUsage_Csmr_ACJustifyCenterH: number;

declare const kStandbyTimerBit: number;

declare const kHIDUsage_BCS_TriOptic: number;

declare const kHIDUsage_Button_190: number;

declare const kUSBHubClass: number;

declare const kIOBlitTypeLines: number;

declare const kHIDUsage_Csmr_Snapshot: number;

declare const kSBCModePageCaching_DEMAND_READ_Mask: number;

declare const kSBCWOCmd_SEARCH_DATA_EQUAL_12: number;

declare const kIOPMContextRetained: number;

declare const kHIDUsage_BS_TerminateCharge: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilityMinRxLaneCountPhase: number;

declare const kHIDUsage_Button_17: number;

declare const kDisplaySubPixelShapeRound: number;

declare const kIOCSyncDisable: number;

declare const kHIDUsage_Csmr_Tracking: number;

declare const kHIDUsage_Snsr_Light_AmbientLight: number;

declare const kHIDUsage_PD_Boost: number;

declare const kHIDUsage_AD_Row: number;

declare const kHIDUsage_PD_iName: number;

declare const kIONoSeparateSyncControl: number;

declare const kHIDUsage_BCS_KlasseEinsLaser: number;

declare const kHIDUsage_PD_Temperature: number;

declare const kHIDUsage_BCS_DLMethodCheckForDiscrete: number;

declare const kHIDUsage_PID_DownloadForceSample: number;

declare const kIOTimingIDVESA_1280x1024_75hz: number;

declare const kCDMediaTypeR: number;

declare const kScaleInvertYMask: number;

declare const kModeShowNow: number;

declare const kSBCWOCmd_CHANGE_DEFINITION: number;

declare const kIOMapReference: number;

declare const kMMCCmd_READ_DISC_STRUCTURE: number;

declare const kHIDUsage_Csmr_ACPrint: number;

declare const kHIDUsage_Button_118: number;

declare const kSENSE_FILEMARK_Mask: number;

declare const cscSavePreferredConfiguration: number;

declare const kConfigLeafDirLength: number;

declare const kHIDUsage_Dig_TouchScreen: number;

declare const kSBCWOCmd_SEEK_10: number;

declare const kDVDBookTypePlusR: number;

declare const kIOUSBEndpointDescriptorUsageTypeIsocData: number;

declare const kMMCCmd_PLAY_CD: number;

declare const kSPCProcCmd_COMPARE: number;

declare const kHIDUsage_GD_Select: number;

declare const kIOServiceMatchedNotificationType: number;

declare const kDPMSSyncOn: number;

declare const kMultiModeCRT2Connect: number;

declare const kMMCCmd_READ_DVD_STRUCTURE: number;

declare const kHIDUsage_Csmr_ACIndentyDecrease: number;

declare const kSCSICmd_READ_LONG: number;

declare const mRowBytes: number;

declare const kSPCProcCmd_PERSISTENT_RESERVE_IN: number;

declare const kHIDPage_Button: number;

declare const kIOATAFeaturePowerManagement: number;

declare const kSCSICmd_READ_DEFECT_DATA_12: number;

declare const kHIDUsage_PID_MoveLength: number;

declare const kMMCCmd_RELEASE_6: number;

declare const kHIDUsage_WD_WeightUnitPound: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilityReserved: number;

declare const kSSCSeqCmd_MOVE_MEDIUM: number;

declare const timingVESA_1280x960_75hz: number;

declare const INPUT_PERSONAL_MICROPHONE: number;

declare const kHIDUsage_Sim_SpaceshipSimulationDevice: number;

declare const kHIDUsage_Csmr_ACOpen: number;

declare const kUSBRqTypeMask: number;

declare const kHIDUsage_Tfon_PhoneKeyPound: number;

declare const kIOAudioStreamAlignmentLowByte: number;

declare const kIOWriteThruCache: number;

declare const kINQUIRY_Byte56_IUS_Bit: number;

declare const kHIDUsage_BCS_CodeOne: number;

declare const kHIDUsage_AD_ScreenSaverDelay: number;

declare const kIOMapCopybackCache: number;

declare const kHIDUsage_PID_LoopCount: number;

declare const kIOCFSerializeToBinary: number;

declare const kIOUSBUSB20ExtensionCapabilityBESLPhase: number;

declare const OUTPUT_NULL: number;

declare const kINQUIRY_Byte5_ACC_Mask: number;

declare const kHIDUsage_LED_ScrollLock: number;

declare const kIOAudioPortTypeInput: number;

declare const kHIDUsage_KeyboardF18: number;

declare const kIOMirrorIsMirrored: number;

declare const kMMCCmd_SEND_OPC_INFORMATION: number;

declare const kCDFeaturesAnalogAudioBit: number;

declare const kHIDUsage_Dig_BatteryStrength: number;

declare const kHIDUsage_AD_ScreenSaverEnable: number;

declare const kHIDUsage_Csmr_Sleep: number;

declare const kHIDUsage_Button_164: number;

declare const kHIDUsage_Dig_XTilt: number;

declare const kHIDUsage_BCS_ScannerDataAccuracy: number;

declare const kIOFBHDCPLimit_AllowAll: number;

declare const kHIDUsage_AD_FontReadBack: number;

declare const kHIDUsage_Haptics_WaveformVendorPage: number;

declare const kIOAudioChannelLabel_CenterSurroundDirect: number;

declare const kHIDUsage_BCS_MultiRangeScanner: number;

declare const kIOAudioChannelLabel_TopBackLeft: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilitySublinkLSEMbits: number;

declare const kCDFeaturesCDDAStreamAccurateMask: number;

declare const kCSRStateState: number;

declare const kMMCCmd_LOG_SENSE: number;

declare const kSCSICmd_REDUNDANCY_GROUP_OUT: number;

declare const kHIDUsage_PD_VoltageOutOfRange: number;

declare const kScaleSwapAxesMask: number;

declare const kCompositeSyncMask: number;

declare const kIOVideoFeatureControlClassIDBacklightCompensation: number;

declare const kSSCSeqCmd_READ_BLOCK_LIMITS: number;

declare const kHIDUsage_WD_ScaleStatusRequiresCalibration: number;

declare const kIOMediumEthernet100BaseT4: number;

declare const kHIDUsage_AD_CursorBlink: number;

declare const kVideoCombinedI2CType: number;

declare const kATAIdentifyModelNumber: number;

declare const kHIDUsage_Csmr_KeyboardFormFactor: number;

declare const kHIDUsage_Snsr_Data_Orientation_Tilt: number;

declare const kSSCPrinterCmd_REPORT_LUNS: number;

declare const kHIDUsage_Button_66: number;

declare const kHIDUsage_BCS_Standard2of5IATA: number;

declare const kDVDFeaturesPlusRWMask: number;

declare const kSPCProcCmd_TEST_UNIT_READY: number;

declare const kHIDUsage_Snsr_Event_SensorEvent_PropertyChanged: number;

declare const kHIDUsage_Button_138: number;

declare const kATADefaultTimeout: number;

declare const kIOColorimetryWGRGB: number;

declare const kFWBIBBusName: number;

declare const kIOMediumIEEE80211FH1: number;

declare const kSBCWOCmd_SEARCH_DATA_LOW_12: number;

declare const kHIDUsage_Csmr_MediaSelectVCR: number;

declare const kHIDUsage_Sim_WeaponsArm: number;

declare const kHIDUsage_Button_126: number;

declare const kIOFBDisplayState: number;

declare const kCSRBroadcastChannel: number;

declare const kIOTimingIDVESA_1920x1440_75hz: number;

declare const kDigitalSignalBit: number;

declare const kSBCWOCmd_READ_12: number;

declare const kHIDUsage_Csmr_Slow: number;

declare const kHIDUsage_Snsr_Event_SensorEvent_LowThresholdCrossDown: number;

declare const kHIDUsage_Snsr_Electrical: number;

declare const kSESCmd_RESERVE_6: number;

declare const kHIDUsage_Snsr_Motion_Accelerometer3D: number;

declare const kHIDUsage_Button_191: number;

declare const kSSCPrinterCmd_SLEW_AND_PRINT: number;

declare const kIOFBAVSignalTypeDP: number;

declare const kHIDUsage_Button_64: number;

declare const kIOHIDAccelerationAlgorithmTypeParametric: number;

declare const kSGCCmd_PORT_STATUS: number;

declare const kHIDUsage_PID_DC_DevicePause: number;

declare const kHIDUsage_Snsr_Modifier_ChangeSensitivityAbsolute: number;

declare const kHIDUsage_Csmr_Stop: number;

declare const kSCSIServiceAction_WRITE_AND_VERIFY_32: number;

declare const kIOScaleRotate90: number;

declare const kHIDUsage_Haptics_VendorWaveformLast: number;

declare const kSCSICmd_SEARCH_DATA_EQUAL_10: number;

declare const kHIDUsage_KeyboardEqualSign: number;

declare const kHIDUsage_Button_18: number;

declare const kIOStreamPortTypeInput: number;

declare const kHIDUsage_AD_ErrFontdatacannotberead: number;

declare const kIORangeDynamicRangeDolbyNormalMode: number;

declare const kIOHIDOptionsTypeNone: number;

declare const kSSCSeqCmd_REWIND: number;

declare const kHIDUsage_Snsr_Data_Orientation_DistanceYAxis: number;

declare const kHIDUsage_Snsr_Modifier_Resolution: number;

declare const kHIDUsage_Haptics_WaveformPress: number;

declare const kHIDUsage_WD_ScaleScaleClassIIIEnglish: number;

declare const kCSRClockStrobeArrivedHiAddress: number;

declare const kIOBitsPerColorComponent6: number;

declare const kATASMARTSelfTestStatusAbortedByHost: number;

declare const kINQUIRY_Page83_IdentifierTypeRelativePortIdentifier: number;

declare const kHIDUsage_Button_179: number;

declare const kIOAudioChannelLabel_Center: number;

declare const kCDFeaturesTAOWriteMask: number;

declare const kRangeSupportsCompositeSyncBit: number;

declare const kIOConnectMethodVarOutputSize: number;

declare const kHIDUsage_KeyboardF21: number;

declare const kHIDUsage_LED_BatteryLow: number;

declare const kINQUIRY_ANSI_VERSION_Mask: number;

declare const timingVESA_1920x1440_75hz: number;

declare const kHIDUsage_Button_234: number;

declare const kHIDUsage_BCS_GoodReadLampIntensity: number;

declare const kHIDUsage_LED_Player8: number;

declare const kVideoDefaultBus: number;

declare const kHIDUsage_Csmr_BalanceRight: number;

declare const kHIDUsage_Snsr_Location_GPS: number;

declare const kHIDUsage_BCS_TransmitCheckDigit: number;

declare const kIOFBDisplayState_AlreadyActive: number;

declare const kATAForceUnitAccessFeatureMask: number;

declare const kHIDUsage_Sim_TrackControl: number;

declare const kHIDUsage_Snsr_Data_Scanner_NFCSentenceReceive: number;

declare const kHIDUsage_Csmr_ChannelSurround: number;

declare const kIOPixelEncodingYCbCr422: number;

declare const kSCSICmd_REQUEST_SENSE: number;

declare const kHIDUsage_Csmr_ALAudioPlayer: number;

declare const kIOPMAuxPowerOn: number;

declare const kHIDUsage_WD_ScaleStatisticsReport: number;

declare const kIOMapPostedWrite: number;

declare const kHIDUsage_GD_SystemDisplayBoth: number;

declare const kINQUIRY_Byte7_SYNC_Mask: number;

declare const kHIDUsage_Csmr_VCROrTV: number;

declare const kIORangeSupportsMultiAlignedTiming: number;

declare const kHIDUsage_Csmr_TrebleIncrement: number;

declare const kHIDUsage_Csmr_ContactFirstName: number;

declare const kHIDUsage_Tfon_PriorityRingTone: number;

declare const kIOUSBSuperSpeedEndpointCompanionDescriptorSSPIsocCompanion: number;

declare const kDisplaySubPixelLayoutQuadGBL: number;

declare const kIOBlitTypeSourceKeyColorNotEqual: number;

declare const kHIDUsage_PID_BlockHandle: number;

declare const kSENSE_KEY_NO_SENSE: number;

declare const kUSB_EPDesc_bmAttributes_TranType_Shift: number;

declare const kScaleRotate0Mask: number;

declare const kHIDUsage_PD_PowerConverterID: number;

declare const kHIDUsage_Csmr_ContactRecordActive: number;

declare const kCDFeaturesReWriteableMask: number;

declare const kHIDUsage_BCS_GRWTIAfterDecode: number;

declare const kAnalogSignalLevel_1000_0400: number;

declare const kSCSIDataTransfer_FromTargetToInitiator: number;

declare const kUSBRqSetAddress: number;

declare const kDisplaySubPixelShapeRectangular: number;

declare const kIOPMThermalLevelWarning: number;

declare const kHIDUsage_Csmr_PlayOrPause: number;

declare const kHIDUsage_GD_MultiAxisController: number;

declare const kIOInterestCalloutFuncIndex: number;

declare const kSSCSeqCmd_SPACE: number;

declare const kHIDUsage_Snsr_Data_Location_City: number;

declare const kATASupportsWriteCacheBit: number;

declare const kHIDUsage_Snsr_Data_Location_GeoidalSeparation: number;

declare const kUSBTooManyDevicesAddress: number;

declare const kIOBlitSourceMemory: number;

declare const kIOColorimetryDCIP3: number;

declare const kHIDUsage_Tfon_MessageControls: number;

declare const kSGCCmd_SCAN: number;

declare const kHIDUsage_GD_Thumbstick: number;

declare const kIOMainPortDefault: number;

declare const kHIDUsage_BD_BrailleJoystickRight: number;

declare const kHIDUsage_AD_CharacterSpacingHorizontal: number;

declare const kHIDUsage_Csmr_GreenMenuButton: number;

declare const kHIDUsage_KeyboardW: number;

declare const kIO4IndexedPixelFormat: number;

declare const kHIDUsage_LED_PaperJam: number;

declare const kAVPowerSuspend: number;

declare const kHIDUsage_Csmr_ALOEMFeatureBrowser: number;

declare const kHIDUsage_AD_DisplayStatus: number;

declare const kConvolvedMask: number;

declare const kIORangeSupportsVRR: number;

declare const kHIDUsage_Snsr_Time_AlarmTimer: number;

declare const kHIDUsage_LED_DoNotDisturb: number;

declare const kIOUSBSuperSpeedHubCharacteristicsOverCurrentGlobal: number;

declare const kIOPostedWrite: number;

declare const kHIDUsage_BCS_Code32: number;

declare const EMBEDDED_MINIDISK: number;

declare const kHIDUsage_KeyboardApplication: number;

declare const kIOTimingIDVESA_1856x1392_75hz: number;

declare const kUSBPhysicalInterfaceClass: number;

declare const kConfigBIBBusNameAddress: number;

declare const kIOTimingIDVESA_1280x960_85hz: number;

declare const kUSBRqGetStatus: number;

declare const kFWAVCAsyncPlug28: number;

declare const kIORangeBitsPerColorComponent8: number;

declare const kREPORT_LUNS_ADDRESS_METHOD_PERIPHERAL_DEVICE: number;

declare const kHIDUsage_Button_11: number;

declare const kVideoSimpleI2CType: number;

declare const kHIDUsage_BS_Level3: number;

declare const kRBCCmd_READ_10: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilitySublinkSpeedMantissa: number;

declare const kIOUSBDeviceStatusLTMEnable: number;

declare const kSPCProcCmd_COPY: number;

declare const kIOAudioControlTypeToggle: number;

declare const kIOStreamMethodGetMode: number;

declare const kFWAVCAsyncPlug1: number;

declare const kMMCCmd_RESERVE_10: number;

declare const kIOFBLinkVoltageLevel2: number;

declare const kHIDUsage_Csmr_ALOnlineActivityBrowswer: number;

declare const kINQUIRY_Byte6_MCHNGR_Bit: number;

declare const kHIDUsage_LED_SlowBlinkOnTime: number;

declare const kHIDUsage_Snsr_Orientation_Distance3D: number;

declare const kHIDUsage_LED_Busy: number;

declare const OUTPUT_LOW_FREQUENCY_EFFECTS_SPEAKER: number;

declare const kIODisplayNeedsCEAUnderscan: number;

declare const kHIDUsage_Haptics_SimpleHapticController: number;

declare const kIOMediumIEEE80211None: number;

declare const kIOTimingIDVESA_1024x768_75hz: number;

declare const cscGetInterrupt: number;

declare const kIOAudioSMPTETimeType5994Drop: number;

declare const kCSRNodeIDPhase: number;

declare const kBDMediaTypeUnknown: number;

declare const kInvertingEncodedPixel: number;

declare const timingSMPTE240M_60hz: number;

declare const kHIDUsage_LED_CapsLock: number;

declare const kUSBDeviceCapabilitySuperSpeedUSB: number;

declare const kIODisplayDitherSpatial: number;

declare const kSBCCmd_PERSISTENT_RESERVE_IN: number;

declare const kHIDUsage_BCS_Code39: number;

declare const kHIDUsage_Sim_MotorcycleSimulationDevice: number;

declare const kHIDUsage_BS_ChargerSpec: number;

declare const kIOUSBEndpointDescriptorDirectionPhase: number;

declare const kSBCCmd_MODE_SENSE_10: number;

declare const kIOVideoControlElementMaster: number;

declare const kSBCCmd_REZERO_UNIT: number;

declare const kHIDUsage_BCS_AddEAN2_3LabelDefinition: number;

declare const kRSCZero: number;

declare const kSCSIProtocolIdentifier_ATAPI: number;

declare const kIOTimingIDVESA_800x600_60hz: number;

declare const kDVDKeyFormatAGID_CSS2: number;

declare const kHIDUsage_Snsr_Electrical_Power: number;

declare const kIOVideoFeatureControlClassIDFocus: number;

declare const kUSBNoStream: number;

declare const kIOPMSleepCapability: number;

declare const kHIDUsage_BCS_EAN8FlagDigit3: number;

declare const kIOAudioStreamSampleFormat1937AC3: number;

declare const kIOFBNS_Sleep: number;

declare const kHIDUsage_Snsr_Property_PowerState_D3_Sleep: number;

declare const kATAIdentifyCurrentMultipleSectors: number;

declare const kIOUSBDeviceRequestSetConfiguration: number;

declare const kHIDUsage_KeyboardX: number;

declare const kHIDUsage_Button_109: number;

declare const kIOAudioChannelLabel_LeftTopFront: number;

declare const kIOHIDEventSystemConnectType: number;

declare const kIOBlitTypeDestKeyColorModeMask: number;

declare const kConfigBusInfoBlockLength: number;

declare const kIOTimingIDGTF_640x480_120hz: number;

declare const kHIDUsage_Sim_MagicCarpetSimulationDevice: number;

declare const cscKillIO: number;

declare const kUSBRqSetFeature: number;

declare const kCDTrackInfoAddressTypeTrackNumber: number;

declare const kUSB20ExtensionLPMSupported: number;

declare const kHIDUsage_BS_Discharging: number;

declare const oneBitMode: number;

declare const kCDFeaturesReadStructuresMask: number;

declare const kUSBFeatureFunctionSuspend: number;

declare const kHIDUsage_Sprt_StickType: number;

declare const kSPCProcCmd_REQUEST_SENSE: number;

declare const kHIDUsage_Button_208: number;

declare const kHIDUsage_BCS_TransmitStart_Stop: number;

declare const kVideoCannotMirrorErr: number;

declare const kINQUIRY_PERIPHERAL_TYPE_CDROM_MMCDevice: number;

declare const kIOBlitSourceCGSSurface: number;

declare const kFWBIBNodeCapabilitiesAddress: number;

declare const kHIDUsage_LED_IndicatorGreen: number;

declare const kINQUIRY_Byte3_NORMACA_Mask: number;

declare const kHIDUsage_Keyboard8: number;

declare const kIOAudioClockSelectorTypeSPDIF: number;

declare const kHIDUsage_PD_SwitchOnControl: number;

declare const kSGCCmd_READ_BUFFER: number;

declare const kSBCWOCmd_COPY: number;

declare const kSSCSeqCmd_WRITE_6: number;

declare const kVideoSimpleI2CTypeMask: number;

declare const kESCThree21InchMonoRadius: number;

declare const kSENSE_RESPONSE_CODE_Current_Errors: number;

declare const kDDCConnect: number;

declare const kHIDUsage_BCS_UltraCode: number;

declare const kHIDUsage_LED_IndicatorAmber: number;

declare const kIOTimingIDApple_640x480_67hz: number;

declare const kHIDUsage_Snsr_Property_Location: number;

declare const kHIDUsage_BCS_SetParameterDefaultValues: number;

declare const kHIDUsage_BD_BrailleDPadCenter: number;

declare const kHIDUsage_BD_BrailleKeyboardSpace: number;

declare const kHIDPage_VendorDefinedStart: number;

declare const kHIDUsage_Sim_SportsSimulationDevice: number;

declare const kIOHIDEventNotification: number;

declare const kHIDUsage_Dig_GestureCharacterEncodingUTF32BE: number;

declare const kHIDUsage_Csmr_ACCut: number;

declare const kHIDUsage_Sprt_6Iron: number;

declare const kUSBVideoControlSubClass: number;

declare const kIOMaxBusStall20usec: number;

declare const kSBCModePageFlexibleDisk_SPC_Mask: number;

declare const kIOUSBPingResponseTimeNs: number;

declare const kIOUSBSuperSpeedHubDecodeLatencyMax: number;

declare const kHIDUsage_Csmr_ACExpandAll: number;

declare const kIOI2CSimpleTransactionType: number;

declare const kHIDUsage_BD_RouterKey: number;

declare const kIOUSBEndpointDescriptorNumberPhase: number;

declare const spVidNamesDir: number;

declare const kHIDUsage_Csmr_ALOEMHelp: number;

declare const kIONetworkSupportedPacketFilters: number;

declare const kFWAddressNodeID: number;

declare const kIOVideoDeviceMethodOpenStream: number;

declare const kUSBIsoc: number;

declare const kHIDUsage_KeyboardOut: number;

declare const kSENSE_ILI_Mask: number;

declare const kHIDUsage_KeyboardLANG7: number;

declare const kSCSICDBSize_Maximum: number;

declare const kHIDUsage_Button_60: number;

declare const kHIDUsage_Snsr_Property_PowerState_Undefined: number;

declare const kDisplayModeValidFlag: number;

declare const kSCSICmd_SEARCH_DATA_LOW_10: number;

declare const kIOBlitFramebufferDestination: number;

declare const kPMMotionSensor: number;

declare const kHIDUsage_Tfon_PhoneKeyC: number;

declare const kSMCCmd_RELEASE_ELEMENT_10: number;

declare const kIOBlitWaitAll: number;

declare const kUSBSetIsochDelay: number;

declare const kHIDUsage_Snsr_Property_ReportInterval: number;

declare const kIOAudioTimeStampWordClockTimeValid: number;

declare const kIODriverPowerAttribute: number;

declare const kHIDUsage_WD_WeightUnitGrains: number;

declare const kBDFeaturesWriteMask: number;

declare const kIOPMNullAssertionID: number;

declare const kIOMatchingCalloutRefconIndex: number;

declare const kHIDUsage_KeyboardErrorRollOver: number;

declare const kDCLSetTagSyncBitsOp: number;

declare const kHIDUsage_PD_CommunicationLost: number;

declare const kFWBIBCycClkAccPhase: number;

declare const kHIDUsage_BCS_HandsFreeScanning: number;

declare const kATASMARTOffLineCollectionNoError: number;

declare const kHIDUsage_PD_BatterySystem: number;

declare const kSPCCmd_RECEIVE_COPY_RESULTS: number;

declare const kPMPowerSource: number;

declare const kESCSeven19Inch: number;

declare const kMillisecondScale: number;

declare const kATASMARTSelfTestStatusInterruptedByReset: number;

declare const kSCSICmd_PREFETCH: number;

declare const kIONetworkFeatureMultiPages: number;

declare const kHIDUsage_KeyboardQuote: number;

declare const kHIDUsage_Csmr_ACInsertRow: number;

declare const kHIDUsage_BCS_PowerupBeep: number;

declare const kHIDUsage_BCS_FullASCIIConversion: number;

declare const EMBEDDED_SATELLITE_RECEIVER_AUDIO: number;

declare const kCSRPrivateSpaceBaseAddressLo: number;

declare const kHIDUsage_KeyboardF: number;

declare const kHIDUsage_Tfon_CallWaitingTone: number;

declare const kHIDUsage_Button_45: number;

declare const kIOAudioChannelLabel_Discrete_9: number;

declare const kHIDUsage_PID_EffectBlockIndex: number;

declare const kHIDPage_Scale: number;

declare const kIOUSBEndpointDescriptorTransferTypePhase: number;

declare const kHIDUsage_GD_AssistiveControlCompatible: number;

declare const kIONUCGetNetworkDataHandleIndex: number;

declare const kHIDUsage_Snsr_Property_Mechanical: number;

declare const kMMCCmd_COPY_AND_VERIFY: number;

declare const kHIDUsage_PD_ConfigVoltage: number;

declare const timingApple_512x384_60hz: number;

declare const kLastIOKitNotificationType: number;

declare const kHIDUsage_PID_SetConstantForceReport: number;

declare const kUSBOut: number;

declare const kUSBSuperSpeedSupportsFS: number;

declare const kIOUSBHubPort2PortExitLatencyNs: number;

declare const kHIDUsage_Sprt_2Iron: number;

declare const kSCSICmd_READ_DEFECT_DATA_10: number;

declare const kHIDUsage_Csmr_ACBuyOrCheckout: number;

declare const kIODisplayRGBColorComponentBits12: number;

declare const kIOUSBEndpointDescriptorSynchronizationTypeSynchronous: number;

declare const kHIDUsage_Button_98: number;

declare const kHIDUsage_Csmr_Weekly: number;

declare const kREAD_CAPACITY_PROT_Mask: number;

declare const kIOATAFeatureAdvancedPowerManagement: number;

declare const kUSBPrintingClass: number;

declare const kHIDUsage_PID_CustomForceData: number;

declare const kHIDUsage_Snsr_Data_Location_FixQualityGPS: number;

declare const kHIDUsage_Button_140: number;

declare const kHIDUsage_Csmr_ALNewsreader: number;

declare const kHIDUsage_Game_GunAutomatic: number;

declare const kIODisplayRGBColorComponentBitsUnknown: number;

declare const kHIDUsage_Button_82: number;

declare const kHIDUsage_BD_BrailleFaceControls: number;

declare const kHIDUsage_Button_172: number;

declare const kIOTimingIDVESA_1600x1200_60hz: number;

declare const cscGetSync: number;

declare const kHIDUsage_GD_GamePad: number;

declare const kCDFeaturesTAOWriteBit: number;

declare const kIOUSBSuperSpeedPlusDeviceCapabilityMinTxLaneCount: number;

declare const kSCSIServiceAction_REPORT_PROVISIONING_INITIALIZATION_PATTERN: number;

declare const kINQUIRY_Page83_PageCode: number;

declare const kDVDKeyFormatASF: number;

declare const kUSBRqGetInterface: number;

declare const kSPCProcCmd_READ_BUFFER: number;

declare const kHIDUsage_Game_NewGame: number;

declare const kUSBScrollLockKey: number;

declare const kSSCSeqCmd_VERIFY_6: number;

declare const kIOColorimetryBT601: number;

declare const kIOPMBroadcastAggressiveness: number;

declare const kCSRBusDependentRegistersBaseAddress: number;

declare const kIOPMSystemCapabilityDidChange: number;

declare const kSPCCmd_PERSISTENT_RESERVE_OUT: number;

declare const kHIDUsage_KeyboardDeleteForward: number;

declare const kIOSystemStateSleepDescriptionHibernateStateHibernating: number;

declare const kHIDUsage_Snsr_Motion_Speedometer: number;

declare const kDVDMediaTypeMin: number;

declare const kFWAckTypeError: number;

declare const kHIDUsage_BCS_CommitParametersToNVM: number;

declare const kHIDUsage_BCS_TriggerModeLaserStaysOnAfterTriggerRelease: number;

declare const kIOUSBDeviceFeatureSelectorLTMEnable: number;

declare const kREPORT_CAPACITY_16_DataSize: number;

declare const kIORangeDynamicRangeTraditionalGammaSDR: number;

declare const kHIDUsage_KeyboardStop: number;

declare const kHIDUsage_Button_218: number;

declare const kIOScaleInvertX: number;

declare const kHIDUsage_Csmr_ALAlarms: number;

declare const kHIDUsage_Snsr_Event_SensorState_NotAvailable: number;

declare const kUSBOther: number;

declare const kATAIdentifySectorsPerTrack: number;

declare const kHIDUsage_Csmr_MediaSelectTelephone: number;

declare const kATAPhysicalSectorSizeMask: number;

declare const kHIDUsage_Snsr_Orientation_Compass2D: number;

declare const kINQUIRY_PERIPHERAL_TYPE_EnclosureServicesSESDevice: number;

declare const kScaleStretchOnlyMask: number;

declare const kHIDUsage_BS_BroadcastToCharger: number;

declare const kIOATAFeatureWriteCache: number;

declare const kIORPCMessageError: number;

declare const mDevType: number;

declare const kHIDUsage_WD_DataScaling: number;

declare const kHIDUsage_Game_ShootBall: number;

declare const kHIDUsage_Snsr_Property_ReportingState_AllEvents: number;

declare const kHIDUsage_Csmr_ACAttachComment: number;

declare const kSGCCmd_LOG_SENSE: number;

declare const kIOAnalogSetupExpected: number;

declare const kHIDUsage_BCS_ChannelCode: number;

declare const kSMCCmd_READ_ELEMENT_STATUS: number;

declare const kIOHIDQueueOptionsTypeNone: number;

declare const kIOMapPostedReordered: number;

declare const kHIDUsage_Csmr_ContactIndex: number;

declare const kIOFBLinkPreEmphasisLevel2: number;

declare const kHIDUsage_Button_80: number;

declare const kATAPhysicalLogicalEnabledBit0: number;

declare const kHIDUsage_Snsr_Property_Manufacturer: number;

declare const kHIDUsage_LED_ExternalPowerConnected: number;

declare const kIOBitsPerColorComponent10: number;

declare const kHIDUsage_Snsr_Data_Location_FixTypeEstimated: number;

declare const kHIDUsage_Snsr_Sensor: number;

declare const kIOUSBSuperSpeedEndpointCompanionDescriptorMaxBurst: number;

declare const kHIDUsage_Game_3DGameController: number;

declare const kIOMapAnywhere: number;

declare const kHIDUsage_GD_Ry: number;

declare const kHIDUsage_Button_204: number;

declare const kIOMapCacheMask: number;

declare const kHIDUsage_Csmr_ACCollapseAll: number;

declare const kHIDUsage_Csmr_ALEmailReader: number;

declare const kDVDCPRMRegion1: number;

declare const kHIDUsage_Snsr_Data_Motion_AccelerationAxisZ: number;

declare const kIOAsyncCalloutFuncIndex: number;

declare const kHIDUsage_Button_239: number;

declare const _IOAudioEngineMemory: {
  Status: 0,
  Sample: 1,
  Mix: 2,
  BytesInInput: 3,
  BytesInOutput: 4,
};

declare const IOHIDReportType: {
  Input: 0,
  Output: 1,
  Feature: 2,
  Count: 3,
};

declare const IOHIDButtonModes: {
  BothLeftClicks: 0,
  ReverseLeftRightClicks: 1,
  EnableRightClick: 2,
};

declare const IOHIDUserDeviceOptions: {
  IOHIDUserDeviceOptionsCreateOnActivate: 1,
};

declare const NXMouseButton: {
  One: 0,
  Left: 1,
  Right: 2,
};

declare const SCSITaskStatus: {
  GOOD: 0,
  CHECK_CONDITION: 2,
  CONDITION_MET: 4,
  BUSY: 8,
  INTERMEDIATE: 16,
  INTERMEDIATE_CONDITION_MET: 20,
  RESERVATION_CONFLICT: 24,
  TASK_SET_FULL: 40,
  ACA_ACTIVE: 48,
  TaskTimeoutOccurred: 1,
  ProtocolTimeoutOccurred: 2,
  DeviceNotResponding: 3,
  DeviceNotPresent: 4,
  DeliveryFailure: 5,
  No_Status: 255,
};

declare const IOFWDCLNotificationType: {
  DCLInvalid: 0,
  DCLUpdate: 1,
  DCLModify: 2,
  NuDCLModify: 3,
  NuDCLModifyJump: 4,
  NuDCLUpdate: 5,
};

declare const tIOUSBTopology: {
  TopologyHost: 1,
  TopologyRootPort: 2,
  Topology1Hub: 3,
  Topology2Hub: 4,
  Topology3Hub: 5,
  Topology4Hub: 6,
  Topology5Hub: 7,
  TopologyTierLimit: 7,
};

declare const kUSBHostConnectorType: {
  BTypeAConnector: 0,
  BTypeMiniABConnector: 1,
  BTypeExpressCard: 2,
  B3TypeStdAConnector: 3,
  B3TypeStdBConnector: 4,
  B3TypeMicroBConnector: 5,
  B3TypeMicroABConnector: 6,
  B3TypePowerBConnector: 7,
  BProprietaryConnector: 255,
};

declare const kUSBConnectable: {
  Not: 0,
  kUSBPortConnectable: 1,
};

declare const USBNotificationTypes: {
  PreForcedSuspend: 1,
  PostForcedSuspend: 2,
  PreForcedResume: 4,
  PostForcedResume: 8,
};

declare const USBDeviceInformationBits: {
  DeviceIsCaptiveBit: 0,
  DeviceIsAttachedToRootHubBit: 1,
  DeviceIsInternalBit: 2,
  DeviceIsConnectedBit: 3,
  DeviceIsEnabledBit: 4,
  DeviceIsSuspendedBit: 5,
  DeviceIsInResetBit: 6,
  DeviceOvercurrentBit: 7,
  DevicePortIsInTestModeBit: 8,
  DeviceIsRootHub: 9,
  RootHubisBuiltIn: 10,
  RootHubIsBuiltInBit: 10,
  DeviceIsRemote: 11,
  DeviceIsAttachedToEnclosure: 12,
  DeviceIsOnThunderboltBit: 13,
  DeviceIsCaptiveMask: 1,
  DeviceIsAttachedToRootHubMask: 2,
  DeviceIsInternalMask: 4,
  DeviceIsConnectedMask: 8,
  DeviceIsEnabledMask: 16,
  DeviceIsSuspendedMask: 32,
  DeviceIsInResetMask: 64,
  DeviceOvercurrentMask: 128,
  DevicePortIsInTestModeMask: 256,
  DeviceIsRootHubMask: 512,
  RootHubisBuiltInMask: 1024,
  RootHubIsBuiltInMask: 1024,
  DeviceIsRemoteMask: 2048,
  DeviceIsAttachedToEnclosureMask: 4096,
  DeviceIsOnThunderboltMask: 8192,
};

declare const tIOUSBHostPortStatus: {
  PortTypeMask: 15,
  PortTypePhase: 0,
  PortTypeStandard: 0,
  PortTypeCaptive: 1,
  PortTypeInternal: 2,
  PortTypeAccessory: 3,
  PortTypeReserved: 240,
  ConnectedSpeedMask: 1792,
  ConnectedSpeedPhase: 8,
  ConnectedSpeedNone: 0,
  ConnectedSpeedFull: 256,
  ConnectedSpeedLow: 512,
  ConnectedSpeedHigh: 768,
  ConnectedSpeedSuper: 1024,
  ConnectedSpeedSuperPlus: 1280,
  ConnectedSpeedSuperPlusBy2: 1536,
  Resetting: 2048,
  Enabled: 4096,
  Suspended: 8192,
  Overcurrent: 16384,
  TestMode: 32768,
};

declare const tIOUSBHostConnectionSpeed: {
  None: 0,
  Full: 1,
  Low: 2,
  High: 3,
  Super: 4,
  SuperPlus: 5,
  SuperPlusBy2: 6,
  Count: 7,
};

declare const tIOUSB30DeviceNotificationType: {
  FunctionWake: 1,
  LatencyTolerance: 2,
  BusIntervalAdjustment: 3,
  HostRoleRequest: 4,
  SublinkSpeed: 5,
};

declare const tIOUSB30BusCurrent: {
  Minimum: 150,
  Default: 900,
  MaxPowerUnits: 8,
};

declare const tIOUSB20BusCurrent: {
  Minimum: 100,
  Default: 500,
  MaxPowerUnits: 2,
};

declare const tIOUSBBusVoltage: {
  kIOUSBBusVoltageDefault: 5,
};

declare const tIOUSBDeviceRequest: {
  Size: 8,
  DirectionMask: 128,
  DirectionPhase: 7,
  DirectionOut: 0,
  DirectionIn: 128,
  TypeMask: 96,
  TypePhase: 5,
  TypeStandard: 0,
  TypeClass: 32,
  TypeVendor: 64,
  RecipientMask: 31,
  RecipientPhase: 0,
  RecipientDevice: 0,
  RecipientInterface: 1,
  RecipientEndpoint: 2,
  RecipientOther: 3,
};

declare const tIOUSBDeviceRequestDirectionValue: {
  Out: 0,
  In: 1,
};

declare const tIOUSBDeviceCapabilityType: {
  Wireless: 1,
  USB20Extension: 2,
  SuperSpeed: 3,
  ContainerID: 4,
  Platform: 5,
  PowerDelivery: 6,
  BatteryInfo: 7,
  PdConsumerPort: 8,
  PdProviderPort: 9,
  SuperSpeedPlus: 10,
  PrecisionMeasurement: 11,
  WirelessExt: 12,
  Billboard: 13,
  BillboardAltMode: 15,
};

declare const tIOUSBEndpointUsageType: {
  Data: 0,
  Feedback: 1,
  Implicit: 2,
};

declare const tIOUSBEndpointSynchronizationType: {
  None: 0,
  Asynchronous: 1,
  Adaptive: 2,
  Synchronous: 3,
};

declare const tIOUSBEndpointDirection: {
  Out: 0,
  In: 1,
  Unknown: 2,
};

declare const tIOUSBDescriptorSize: {
  HeaderSize: 2,
  SizeDevice: 18,
  SizeConfiguration: 9,
  SizeInterface: 9,
  SizeEndpoint: 7,
  SizeStringMinimum: 2,
  SizeStringMaximum: 255,
  SizeDeviceQualifier: 10,
  SizeInterfaceAssociation: 8,
  SizeBOS: 5,
  SizeDeviceCapability: 3,
  SizeUSB20ExtensionCapability: 7,
  SizeSuperSpeedUSBDeviceCapability: 10,
  SizeContainerIDCapability: 20,
  SizeHubMinimum: 9,
  SizeHubMaximum: 21,
  SizeSuperSpeedHub: 12,
  SizeSuperSpeedUSBEndpointCompanion: 6,
  SizeSuperSpeedPlusIsochronousEndpointCompanion: 8,
  SizeBillboardDeviceMinimum: 44,
  SizeBillboardDeviceMaximum: 256,
  SizePlatformECIDCapability: 28,
  SizePlatformCapability: 20,
};

declare const tIOUSBDescriptorType: {
  DescriptorTypeDevice: 1,
  DescriptorTypeConfiguration: 2,
  DescriptorTypeString: 3,
  DescriptorTypeInterface: 4,
  DescriptorTypeEndpoint: 5,
  DescriptorTypeDeviceQualifier: 6,
  DescriptorTypeOtherSpeedConfiguration: 7,
  DescriptorTypeInterfacePower: 8,
  DescriptorTypeOTG: 9,
  DescriptorTypeDebug: 10,
  DescriptorTypeInterfaceAssociation: 11,
  DescriptorTypeBOS: 15,
  DescriptorTypeDeviceCapability: 16,
  DecriptorTypeHID: 33,
  DecriptorTypeReport: 34,
  DescriptorTypePhysical: 35,
  DescriptorTypeHub: 41,
  DescriptorTypeSuperSpeedHub: 42,
  DescriptorTypeSuperSpeedUSBEndpointCompanion: 48,
  DescriptorTypeSuperSpeedPlusIsochronousEndpointCompanion: 49,
};

declare const IOStreamMode: {
  Input: 0,
  Output: 1,
  InputOutput: 2,
};

declare const SCSITaskState: {
  NEW_TASK: 0,
  ENABLED: 1,
  BLOCKED: 2,
  DORMANT: 3,
  ENDED: 4,
};

declare const SCSITaskAttribute: {
  SIMPLE: 0,
  ORDERED: 1,
  HEAD_OF_QUEUE: 2,
  ACA: 3,
};

declare const IOPMUserActiveType: {
  Local: 0,
  Remote: 1,
};

declare const IOPSLowBatteryWarningLevel: {
  None: 1,
  Early: 2,
  Final: 3,
};

declare const tIOUSBLanguageID: {
  kIOUSBLanguageIDEnglishUS: 1033,
};

declare const IOHIDAccessType: {
  Granted: 0,
  Denied: 1,
  Unknown: 2,
};

declare const IOHIDRequestType: {
  Post: 0,
  Listen: 1,
};

declare const IOHIDScrollEventOptions: {
  kIOHIDScrollEventOptionsNoAcceleration: 256,
};

declare const IOHIDKeyboardEventOptions: {
  kIOHIDKeyboardEventOptionsNoKeyRepeat: 256,
};

declare const IOHIDTransactionOptions: {
  None: 0,
  WeakDevice: 1,
};

declare const IOHIDManagerOptions: {
  None: 0,
  UsePersistentProperties: 1,
  DoNotLoadProperties: 2,
  DoNotSaveProperties: 4,
  IndependentDevices: 8,
};

declare const IOHIDDeviceGetValueOptions: {
  With: 131072,
  Without: 262144,
};

declare const eIOAccelSurfaceLockBits: {
  Backing: 0,
  Accel: 1,
  DontCare: 2,
  Mask: 3,
};

declare const eIOAccelSurfaceScaleBits: {
  BeamSyncSwaps: 1,
  FixedSource: 2,
  Filtering: 240,
  FilterDefault: 0,
  FilterNone: 16,
  FilterLinear: 32,
};

declare const eIOAccelSurfaceStateBits: {
  None: 0,
  IdleBit: 1,
};

declare const eIOAccelSurfaceMethods: {
  SurfaceReadLockOptions: 0,
  SurfaceReadUnlockOptions: 1,
  SurfaceGetState: 2,
  SurfaceWriteLockOptions: 3,
  SurfaceWriteUnlockOptions: 4,
  SurfaceRead: 5,
  SurfaceSetShapeBacking: 6,
  SurfaceSetIDMode: 7,
  SurfaceSetScale: 8,
  SurfaceSetShape: 9,
  SurfaceFlush: 10,
  SurfaceQueryLock: 11,
  SurfaceReadLock: 12,
  SurfaceReadUnlock: 13,
  SurfaceWriteLock: 14,
  SurfaceWriteUnlock: 15,
  SurfaceControl: 16,
  SurfaceSetShapeBackingAndLength: 17,
  NumSurfaceMethods: 18,
};

declare const FWAddressSpaceFlags: {
  NoFlags: 0,
  NoWriteAccess: 1,
  NoReadAccess: 2,
  AutoWriteReply: 4,
  AutoReadReply: 8,
  AutoCopyOnWrite: 16,
  ShareIfExists: 32,
  Exclusive: 64,
};

declare const IOFWSecurityMode: {
  Normal: 0,
  Secure: 1,
  SecurePermanent: 2,
};

declare const IOFWWriteFlags: {
  FlagsNone: 0,
  FlagsDeferredNotify: 1,
  FastRetryOnBusy: 2,
  BlockRequest: 4,
};

declare const NuDCLFlags: {
  Dynamic: 2,
  UpdateBeforeCallback: 4,
};

declare const IOFWIsochResourceFlags: {
  NeverMultiMode: 0,
  AllowMultiMode: 1,
  SuggestMultiMode: 2,
  AlwaysMultiMode: 3,
  DefaultIsochResourceFlags: 0,
};

declare const IOCSRKeyType: {
  CSRImmediateKey: 0,
  CSROffsetKey: 1,
  CSRLeafKey: 2,
  CSRDirectoryKey: 3,
  InvalidCSRROMEntry: 255,
};

declare const IOConfigKeyType: {
  ConfigImmediateKey: 0,
  ConfigOffsetKey: 1,
  ConfigLeafKey: 2,
  ConfigDirectoryKey: 3,
  InvalidConfigROMEntry: 255,
};

declare const IOFWSpeed: {
  Speed100MBit: 0,
  Speed200MBit: 1,
  Speed400MBit: 2,
  Speed800MBit: 3,
  SpeedReserved: 3,
  SpeedReserved1: 7,
  SpeedUnknownMask: 128,
  SpeedMaximum: 2147483647,
  SpeedInvalid: -2147483648,
};

declare const IOFWAVCAsyncCommandState: {
  PendingRequest: 0,
  RequestSent: 1,
  RequestFailed: 2,
  WaitingForResponse: 3,
  ReceivedInterimResponse: 4,
  ReceivedFinalResponse: 5,
  TimeOutBeforeResponse: 6,
  BusReset: 7,
  OutOfMemory: 8,
  Canceled: 9,
};

declare const IOFWAVCSubunitPlugMessages: {
  Connected: 0,
  Disconnected: 1,
  ConnectedPlugModified: 2,
  SignalFormatModified: 3,
};

declare const IOFWAVCPlugTypes: {
  SubunitSource: 0,
  SubunitDest: 1,
  IsochInput: 2,
  IsochOutput: 3,
  AsynchInput: 4,
  AsynchOutput: 5,
  ExternalInput: 6,
  ExternalOutput: 7,
};

declare const IOAVCOpcodes: {
  PlugInfoOpcode: 2,
  OutputPlugSignalFormatOpcode: 24,
  InputPlugSignalFormatOpcode: 25,
  UnitInfoOpcode: 48,
  SubunitInfoOpcode: 49,
  ConnectionsOpcode: 34,
  ConnectOpcode: 36,
  DisconnectOpcode: 37,
  PowerOpcode: 178,
  SignalSourceOpcode: 26,
  VendorDependentOpcode: 0,
  OutputSignalModeOpcode: 120,
  InputSignalModeOpcode: 121,
  SignalModeSD525_60: 0,
  SignalModeSDL525_60: 4,
  SignalModeHD1125_60: 8,
  SignalModeSD625_50: 128,
  SignalModeSDL625_50: 132,
  SignalModeHD1250_50: 136,
  SignalModeDVCPro525_60: 120,
  SignalModeDVCPro625_50: 248,
  SignalModeDummyOperand: 255,
  SignalModeMask_50: 128,
  SignalModeMask_STYPE: 124,
  SignalModeMask_SDL: 4,
  SignalModeMask_DVCPro25: 120,
};

declare const IOAVCCommandResponse: {
  ControlCommand: 0,
  StatusInquiryCommand: 1,
  SpecificInquiryCommand: 2,
  NotifyCommand: 3,
  GeneralInquiryCommand: 4,
  NotImplementedStatus: 8,
  AcceptedStatus: 9,
  RejectedStatus: 10,
  InTransitionStatus: 11,
  ImplementedStatus: 12,
  ChangedStatus: 13,
  InterimStatus: 15,
};

declare const IOAVCFrameFields: {
  CommandResponse: 0,
  Address: 1,
  Opcode: 2,
  Operand0: 3,
  Operand1: 4,
  Operand2: 5,
  Operand3: 6,
  Operand4: 7,
  Operand5: 8,
  Operand6: 9,
  Operand7: 10,
  Operand8: 11,
};

declare const _IOAudioControlNotifications: {
  Value: 0,
  Range: 1,
};

declare const _IOAudioEngineTraps: {
  kIOAudioEngineTrapPerformClientIO: 0,
};

declare const IOURLError: {
  Unknown: -10,
  UnknownScheme: -11,
  ResourceNotFound: -12,
  ResourceAccessViolation: -13,
  RemoteHostUnavailable: -14,
  ImproperArguments: -15,
  UnknownPropertyKey: -16,
  PropertyKeyUnavailable: -17,
  Timeout: -18,
};

declare const CDSectorArea: {
  Sync: 128,
  Header: 32,
  SubHeader: 64,
  User: 16,
  Auxiliary: 8,
  ErrorFlags: 2,
  SubChannel: 1,
  SubChannelQ: 4,
};

declare const IOHIDPointerEventOptions: {
  kIOHIDPointerEventOptionsNoAcceleration: 256,
};

declare const _IOAudioEngineNotifications: {
  AllNotifications: 0,
  StreamFormatChangeNotification: 1,
  ChangeNotification: 2,
  StartedNotification: 3,
  StoppedNotification: 4,
  PausedNotification: 5,
  ResumedNotification: 6,
};

declare const CDSectorType: {
  Unknown: 0,
  CDDA: 1,
  Mode1: 2,
  Mode2: 3,
  Mode2Form1: 4,
  Mode2Form2: 5,
  Count: 6,
};

declare const _IOAudioStreamDirection: {
  Output: 0,
  Input: 1,
};

declare const tIOUSBDeviceRequestTypeValue: {
  Standard: 0,
  Class: 1,
  Vendor: 2,
};

declare const tIOUSBDeviceRequestRecipientValue: {
  Device: 0,
  Interface: 1,
  Endpoint: 2,
  Other: 3,
};

declare const IOHIDServiceSensorControlOptions: {
  Decimation: 1,
  Aggregation: 2,
  DispatchControl: 4,
};

declare const _IOAudioEngineState: {
  Stopped: 0,
  Running: 1,
  Paused: 2,
  Resumed: 3,
};

declare const IOHIDTransactionDirectionType: {
  Input: 0,
  Output: 1,
};

declare const IOHIDElementType: {
  Input_Misc: 1,
  Input_Button: 2,
  Input_Axis: 3,
  Input_ScanCodes: 4,
  Input_NULL: 5,
  Output: 129,
  Feature: 257,
  Collection: 513,
};

declare const IOHIDElementCommitDirection: {
  In: 0,
  Out: 1,
};

declare const eIOAccelSurfaceModeBits: {
  ColorDepth1555: 3,
  ColorDepth8888: 4,
  ColorDepthYUV: 6,
  ColorDepthYUV9: 7,
  ColorDepthYUV12: 8,
  ColorDepthYUV2: 9,
  ColorDepthBGRA32: 10,
  ColorDepth2101010: 15,
  ColorDepthBits: 15,
  StereoBit: 16,
  WindowedBit: 32,
  Surface2: 16384,
  BeamSync: 32768,
};

declare const IOFWReadFlags: {
  FlagsNone: 0,
  BlockRequest: 4,
  PingTime: 8,
};

declare const evsioEVSIOSCSIndices: {
  X: 0,
  Y: 1,
};

declare const eIOAccelSurfaceShapeBits: {
  None: 0,
  NonBlockingBit: 1,
  NonSimpleBit: 2,
  IdentityScaleBit: 4,
  FrameSyncBit: 8,
  BeamSyncBit: 16,
  StaleBackingBit: 32,
  AssemblyBit: 64,
  WaitEnabledBit: 128,
  BlockingBit: 1,
};

declare const USBLowLatencyBufferType: {
  Write: 0,
  Read: 1,
  FrameList: 2,
};

declare const evsioEVSIOCCSIndices: {
  X: 0,
  Y: 1,
};

declare const IOFWIsochPortOptions: {
  PortDefaultOptions: 0,
  PortUseSeparateKernelThread: 2,
  EnableRobustness: 4,
  BigEndianUpdates: 8,
  RequireLastContext: 16,
};

declare const eIOAcceleratorClientTypes: {
  SurfaceClientType: 0,
  NumClientTypes: 1,
  Surface2ClientType: 32,
};

declare const IOFWPhysicalAccessMode: {
  Enabled: 0,
  Disabled: 1,
  DisabledForGeneration: 2,
};

declare const tIOUSB30ResetTimeout: {
  Minimum: 80,
  Typical: 100,
  Maximum: 120,
  MaximumWithMargin: 150,
};

declare const SCSIServiceResponse: {
  Request_In_Process: 0,
  SERVICE_DELIVERY_OR_TARGET_FAILURE: 1,
  TASK_COMPLETE: 2,
  LINK_COMMAND_COMPLETE: 3,
  FUNCTION_COMPLETE: 4,
  FUNCTION_REJECTED: 5,
};

declare const eIOAccelSurfaceMemoryTypes: {
  kIOAccelNumSurfaceMemoryTypes: 0,
};

declare const _IOAudioControlCalls: {
  Set: 0,
  Get: 1,
};

declare const EvCmd: {
  NOP: 0,
  HIDE: 1,
  SHOW: 2,
  MOVE: 3,
  LEVEL: 4,
};

declare const IOHIDElementCollectionType: {
  Physical: 0,
  Application: 1,
  Logical: 2,
  Report: 3,
  NamedArray: 4,
  UsageSwitch: 5,
  UsageModifier: 6,
};

declare const CDSectorSize: {
  CDDA: 2352,
  Mode1: 2048,
  Mode2: 2336,
  Mode2Form1: 2048,
  Mode2Form2: 2328,
  Whole: 2352,
};

declare const _IOAudioEngineCalls: {
  RegisterClientBuffer: 0,
  UnregisterClientBuffer: 1,
  GetConnectionID: 2,
  Start: 3,
  Stop: 4,
  GetNearestStartTime: 5,
};

declare const tIOUSB30TimingParameters: {
  Default: 1000000,
  Min: 125000,
};

declare const tIOUSBHostPortType: {
  Standard: 0,
  Captive: 1,
  Internal: 2,
  Accessory: 3,
  ExpressCard: 4,
  C: 5,
  Unknown: 6,
};

declare const tIOUSB30HubExtStatus: {
  RxSublinkSpeedID: 15,
  RxSublinkSpeedIDPhase: 0,
  TxSublinkSpeedID: 240,
  TxSublinkSpeedIDPhase: 4,
  RxLaneCount: 3840,
  RxLaneCountPhase: 8,
  TxLaneCount: 61440,
  TxLaneCountPhase: 12,
};

declare const tIOUSBEndpointType: {
  Control: 0,
  Isochronous: 1,
  Bulk: 2,
  Interrupt: 3,
};

declare const tIOUSB30LinkStateTimeout: {
  LinkStateSSInactiveQuietTimeout: 12,
  LinkStateRxDetectQuietTimeout: 12,
  LinkStatePollingLFPSTimeout: 360,
  LinkStatePollingActiveTimeout: 12,
  LinkStatePollingConfigurationTimeout: 12,
  LinkStatePollingIdleTimeout: 2,
  LinkStateU0RecoveryTimeout: 1,
  LinkStateU0LTimeout: 0,
  LinkStateU1NoLFPSResponseTimeout: 2,
  LinkStateU1PingTimeout: 300,
  LinkStateU2NoLFPSResponseTimeout: 2,
  LinKStateU2RxDetectDelay: 100,
  LinkStateU3NoLFPSResponseTimeout: 10,
  LinkStateU3WakeupRetryDelay: 100,
  LinkStateU3RxDetectDelay: 100,
  LinkStateRecoveryActiveTimeout: 12,
  LinkStateRecoveryConfigurationTimeout: 6,
  LinkStateRecoveryIdleTimeout: 2,
  LinkStateLoopbackExitTimeout: 2,
  LinkStateHotResetActiveTimeout: 12,
  LinkStateHotResetExitTimeout: 2,
  LinkStatePollingDeadline: 387,
  LinkStateSSResumeDeadline: 130,
  LinkStateRecoveryDeadline: 21,
  LinkStateHotResetDeadline: 15,
};

declare const IOAVCUnitTypes: {
  VideoMonitor: 0,
  Audio: 1,
  Printer: 2,
  DiskRecorder: 3,
  TapeRecorder: 4,
  Tuner: 5,
  VideoCamera: 7,
  CameraStorage: 11,
  VendorUnique: 28,
  NumSubUnitTypes: 32,
};

declare const USBPowerRequestTypes: {
  DuringSleep: 0,
  DuringWake: 1,
  RequestWakeRelease: 2,
  RequestSleepRelease: 3,
  RequestWakeReallocate: 4,
  RequestSleepReallocate: 5,
  DuringWakeRevocable: 6,
  DuringWakeUSB3: 7,
};

declare const IODirection: {
  None: 0,
  In: 1,
  Out: 2,
  InOut: 3,
};

declare const USBClassSpecificDesc: {
  kUSBClassSpecificDescriptor: 36,
};

declare const HIDReportCommandType: {
  Set: 0,
  Get: 1,
};

declare const tIOUSB30HubPortStatusCode: {
  Standard: 0,
  PD: 1,
  Ext: 2,
  Count: 3,
};

declare const USBReEnumerateOptions: {
  AddExtraResetTimeBit: 31,
  ReEnumerateCaptureDeviceBit: 30,
  ReEnumerateReleaseDeviceBit: 29,
  AddExtraResetTimeMask: -2147483648,
  ReEnumerateCaptureDeviceMask: 1073741824,
  ReEnumerateReleaseDeviceMask: 536870912,
};

declare class IOVideoDeviceNotification {
  constructor(init?: IOVideoDeviceNotification);
  mObjectID: number;
  mNotificationID: number;
  mNotificationArgument1: number;
  mNotificationArgument2: number;
  mNotificationArgument3: number;
  mNotificationArgument4: number;
}

declare class IOUSBInterfaceStruct550 {
  constructor(init?: IOUSBInterfaceStruct550);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  CreateInterfaceAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  CreateInterfaceAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncPort: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceOpen: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceClose: (p1: interop.PointerConvertible) => number | null;
  GetInterfaceClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceSubClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceProtocol: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceVendor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProduct: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceReleaseNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetConfigurationValue: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetAlternateSetting: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetNumEndpoints: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetLocationID: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDevice: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetAlternateInterface: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ControlRequest: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  GetPipeProperties: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  GetPipeStatus: (p1: interop.PointerConvertible, p2: number) => number | null;
  AbortPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ResetPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ClearPipeStall: (p1: interop.PointerConvertible, p2: number) => number | null;
  ReadPipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  WritePipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number) => number | null;
  ReadPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  WritePipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  ReadIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WriteIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  ControlRequestTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  ReadPipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: number) => number | null;
  WritePipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number) => number | null;
  ReadPipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WritePipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  USBInterfaceGetStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBInterfaceOpenSeize: (p1: interop.PointerConvertible) => number | null;
  ClearPipeStallBothEnds: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetPipePolicy: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number) => number | null;
  GetBandwidthAvailable: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetEndpointProperties: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  LowLatencyReadIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  LowLatencyWriteIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  LowLatencyCreateBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => number | null;
  LowLatencyDestroyBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetBusMicroFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetFrameListTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetIOUSBLibVersion: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  FindNextAssociatedDescriptor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => interop.Pointer | null;
  FindNextAltInterface: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => interop.Pointer | null;
  GetBusFrameNumberWithTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetPipePropertiesV2: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible, p8: interop.PointerConvertible, p9: interop.PointerConvertible, p10: interop.PointerConvertible) => number | null;
  GetPipePropertiesV3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetEndpointPropertiesV3: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SupportsStreams: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  CreateStreams: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  GetConfiguredStreams: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ReadStreamsPipeTO: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: number, p7: number) => number | null;
  WriteStreamsPipeTO: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: number, p6: number, p7: number) => number | null;
  ReadStreamsPipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: number, p6: number, p7: number, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  WriteStreamsPipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: number, p6: number, p7: number, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  AbortStreamsPipe: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
}

declare class IOUSBInterfaceStruct500 {
  constructor(init?: IOUSBInterfaceStruct500);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  CreateInterfaceAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  CreateInterfaceAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncPort: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceOpen: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceClose: (p1: interop.PointerConvertible) => number | null;
  GetInterfaceClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceSubClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceProtocol: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceVendor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProduct: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceReleaseNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetConfigurationValue: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetAlternateSetting: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetNumEndpoints: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetLocationID: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDevice: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetAlternateInterface: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ControlRequest: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  GetPipeProperties: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  GetPipeStatus: (p1: interop.PointerConvertible, p2: number) => number | null;
  AbortPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ResetPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ClearPipeStall: (p1: interop.PointerConvertible, p2: number) => number | null;
  ReadPipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  WritePipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number) => number | null;
  ReadPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  WritePipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  ReadIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WriteIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  ControlRequestTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  ReadPipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: number) => number | null;
  WritePipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number) => number | null;
  ReadPipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WritePipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  USBInterfaceGetStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBInterfaceOpenSeize: (p1: interop.PointerConvertible) => number | null;
  ClearPipeStallBothEnds: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetPipePolicy: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number) => number | null;
  GetBandwidthAvailable: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetEndpointProperties: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  LowLatencyReadIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  LowLatencyWriteIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  LowLatencyCreateBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => number | null;
  LowLatencyDestroyBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetBusMicroFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetFrameListTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetIOUSBLibVersion: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  FindNextAssociatedDescriptor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => interop.Pointer | null;
  FindNextAltInterface: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => interop.Pointer | null;
  GetBusFrameNumberWithTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetPipePropertiesV2: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible, p8: interop.PointerConvertible, p9: interop.PointerConvertible, p10: interop.PointerConvertible) => number | null;
}

declare class IOUSBInterfaceStruct300 {
  constructor(init?: IOUSBInterfaceStruct300);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  CreateInterfaceAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  CreateInterfaceAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncPort: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceOpen: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceClose: (p1: interop.PointerConvertible) => number | null;
  GetInterfaceClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceSubClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceProtocol: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceVendor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProduct: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceReleaseNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetConfigurationValue: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetAlternateSetting: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetNumEndpoints: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetLocationID: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDevice: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetAlternateInterface: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ControlRequest: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  GetPipeProperties: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  GetPipeStatus: (p1: interop.PointerConvertible, p2: number) => number | null;
  AbortPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ResetPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ClearPipeStall: (p1: interop.PointerConvertible, p2: number) => number | null;
  ReadPipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  WritePipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number) => number | null;
  ReadPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  WritePipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  ReadIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WriteIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  ControlRequestTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  ReadPipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: number) => number | null;
  WritePipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number) => number | null;
  ReadPipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WritePipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  USBInterfaceGetStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBInterfaceOpenSeize: (p1: interop.PointerConvertible) => number | null;
  ClearPipeStallBothEnds: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetPipePolicy: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number) => number | null;
  GetBandwidthAvailable: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetEndpointProperties: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  LowLatencyReadIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  LowLatencyWriteIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  LowLatencyCreateBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => number | null;
  LowLatencyDestroyBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetBusMicroFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetFrameListTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetIOUSBLibVersion: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  FindNextAssociatedDescriptor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => interop.Pointer | null;
  FindNextAltInterface: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => interop.Pointer | null;
  GetBusFrameNumberWithTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
}

declare class IOUSBInterfaceStruct245 {
  constructor(init?: IOUSBInterfaceStruct245);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  CreateInterfaceAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  CreateInterfaceAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncPort: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceOpen: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceClose: (p1: interop.PointerConvertible) => number | null;
  GetInterfaceClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceSubClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceProtocol: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceVendor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProduct: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceReleaseNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetConfigurationValue: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetAlternateSetting: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetNumEndpoints: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetLocationID: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDevice: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetAlternateInterface: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ControlRequest: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  GetPipeProperties: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  GetPipeStatus: (p1: interop.PointerConvertible, p2: number) => number | null;
  AbortPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ResetPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ClearPipeStall: (p1: interop.PointerConvertible, p2: number) => number | null;
  ReadPipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  WritePipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number) => number | null;
  ReadPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  WritePipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  ReadIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WriteIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  ControlRequestTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  ReadPipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: number) => number | null;
  WritePipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number) => number | null;
  ReadPipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WritePipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  USBInterfaceGetStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBInterfaceOpenSeize: (p1: interop.PointerConvertible) => number | null;
  ClearPipeStallBothEnds: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetPipePolicy: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number) => number | null;
  GetBandwidthAvailable: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetEndpointProperties: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  LowLatencyReadIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  LowLatencyWriteIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  LowLatencyCreateBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => number | null;
  LowLatencyDestroyBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetBusMicroFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetFrameListTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetIOUSBLibVersion: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  FindNextAssociatedDescriptor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => interop.Pointer | null;
  FindNextAltInterface: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => interop.Pointer | null;
}

declare class IOUSBInterfaceStruct220 {
  constructor(init?: IOUSBInterfaceStruct220);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  CreateInterfaceAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  CreateInterfaceAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncPort: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceOpen: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceClose: (p1: interop.PointerConvertible) => number | null;
  GetInterfaceClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceSubClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceProtocol: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceVendor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProduct: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceReleaseNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetConfigurationValue: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetAlternateSetting: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetNumEndpoints: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetLocationID: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDevice: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetAlternateInterface: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ControlRequest: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  GetPipeProperties: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  GetPipeStatus: (p1: interop.PointerConvertible, p2: number) => number | null;
  AbortPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ResetPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ClearPipeStall: (p1: interop.PointerConvertible, p2: number) => number | null;
  ReadPipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  WritePipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number) => number | null;
  ReadPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  WritePipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  ReadIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WriteIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  ControlRequestTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  ReadPipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: number) => number | null;
  WritePipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number) => number | null;
  ReadPipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WritePipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  USBInterfaceGetStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBInterfaceOpenSeize: (p1: interop.PointerConvertible) => number | null;
  ClearPipeStallBothEnds: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetPipePolicy: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number) => number | null;
  GetBandwidthAvailable: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetEndpointProperties: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  LowLatencyReadIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  LowLatencyWriteIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  LowLatencyCreateBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => number | null;
  LowLatencyDestroyBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetBusMicroFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetFrameListTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetIOUSBLibVersion: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  FindNextAssociatedDescriptor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => interop.Pointer | null;
  FindNextAltInterface: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => interop.Pointer | null;
}

declare class IOUSBInterfaceStruct197 {
  constructor(init?: IOUSBInterfaceStruct197);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  CreateInterfaceAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  CreateInterfaceAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncPort: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceOpen: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceClose: (p1: interop.PointerConvertible) => number | null;
  GetInterfaceClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceSubClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceProtocol: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceVendor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProduct: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceReleaseNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetConfigurationValue: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetAlternateSetting: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetNumEndpoints: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetLocationID: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDevice: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetAlternateInterface: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ControlRequest: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  GetPipeProperties: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  GetPipeStatus: (p1: interop.PointerConvertible, p2: number) => number | null;
  AbortPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ResetPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ClearPipeStall: (p1: interop.PointerConvertible, p2: number) => number | null;
  ReadPipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  WritePipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number) => number | null;
  ReadPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  WritePipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  ReadIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WriteIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  ControlRequestTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  ReadPipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: number) => number | null;
  WritePipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number) => number | null;
  ReadPipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WritePipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  USBInterfaceGetStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBInterfaceOpenSeize: (p1: interop.PointerConvertible) => number | null;
  ClearPipeStallBothEnds: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetPipePolicy: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number) => number | null;
  GetBandwidthAvailable: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetEndpointProperties: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  LowLatencyReadIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  LowLatencyWriteIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  LowLatencyCreateBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => number | null;
  LowLatencyDestroyBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetBusMicroFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetFrameListTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetIOUSBLibVersion: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
}

declare class IOUSBInterfaceStruct192 {
  constructor(init?: IOUSBInterfaceStruct192);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  CreateInterfaceAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  CreateInterfaceAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncPort: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceOpen: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceClose: (p1: interop.PointerConvertible) => number | null;
  GetInterfaceClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceSubClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceProtocol: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceVendor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProduct: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceReleaseNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetConfigurationValue: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetAlternateSetting: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetNumEndpoints: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetLocationID: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDevice: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetAlternateInterface: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ControlRequest: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  GetPipeProperties: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  GetPipeStatus: (p1: interop.PointerConvertible, p2: number) => number | null;
  AbortPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ResetPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ClearPipeStall: (p1: interop.PointerConvertible, p2: number) => number | null;
  ReadPipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  WritePipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number) => number | null;
  ReadPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  WritePipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  ReadIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WriteIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  ControlRequestTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  ReadPipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: number) => number | null;
  WritePipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number) => number | null;
  ReadPipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WritePipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  USBInterfaceGetStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBInterfaceOpenSeize: (p1: interop.PointerConvertible) => number | null;
  ClearPipeStallBothEnds: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetPipePolicy: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number) => number | null;
  GetBandwidthAvailable: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetEndpointProperties: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  LowLatencyReadIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  LowLatencyWriteIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  LowLatencyCreateBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => number | null;
  LowLatencyDestroyBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
}

declare class IOUSBInterfaceStruct183 {
  constructor(init?: IOUSBInterfaceStruct183);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  CreateInterfaceAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  CreateInterfaceAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncPort: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceOpen: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceClose: (p1: interop.PointerConvertible) => number | null;
  GetInterfaceClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceSubClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceProtocol: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceVendor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProduct: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceReleaseNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetConfigurationValue: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetAlternateSetting: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetNumEndpoints: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetLocationID: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDevice: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetAlternateInterface: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ControlRequest: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  GetPipeProperties: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  GetPipeStatus: (p1: interop.PointerConvertible, p2: number) => number | null;
  AbortPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ResetPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ClearPipeStall: (p1: interop.PointerConvertible, p2: number) => number | null;
  ReadPipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  WritePipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number) => number | null;
  ReadPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  WritePipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  ReadIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WriteIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  ControlRequestTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  ReadPipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: number) => number | null;
  WritePipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number) => number | null;
  ReadPipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WritePipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  USBInterfaceGetStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBInterfaceOpenSeize: (p1: interop.PointerConvertible) => number | null;
}

declare class IOUSBInterfaceStruct182 {
  constructor(init?: IOUSBInterfaceStruct182);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  CreateInterfaceAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  CreateInterfaceAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncPort: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceOpen: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceClose: (p1: interop.PointerConvertible) => number | null;
  GetInterfaceClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceSubClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceProtocol: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceVendor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProduct: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceReleaseNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetConfigurationValue: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetAlternateSetting: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetNumEndpoints: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetLocationID: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDevice: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetAlternateInterface: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ControlRequest: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  GetPipeProperties: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  GetPipeStatus: (p1: interop.PointerConvertible, p2: number) => number | null;
  AbortPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ResetPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ClearPipeStall: (p1: interop.PointerConvertible, p2: number) => number | null;
  ReadPipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  WritePipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number) => number | null;
  ReadPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  WritePipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  ReadIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WriteIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  ControlRequestTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  ReadPipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: number) => number | null;
  WritePipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number) => number | null;
  ReadPipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WritePipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  USBInterfaceGetStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
}

declare class IOUSBInterfaceStruct100 {
  constructor(init?: IOUSBInterfaceStruct100);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  CreateInterfaceAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  CreateInterfaceAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncPort: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceOpen: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceClose: (p1: interop.PointerConvertible) => number | null;
  GetInterfaceClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceSubClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceProtocol: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceVendor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProduct: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceReleaseNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetConfigurationValue: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetAlternateSetting: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetNumEndpoints: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetLocationID: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDevice: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetAlternateInterface: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ControlRequest: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  GetPipeProperties: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  GetPipeStatus: (p1: interop.PointerConvertible, p2: number) => number | null;
  AbortPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ResetPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ClearPipeStall: (p1: interop.PointerConvertible, p2: number) => number | null;
  ReadPipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  WritePipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number) => number | null;
  ReadPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  WritePipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  ReadIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WriteIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
}

declare class IOUSBDeviceStruct942 {
  constructor(init?: IOUSBDeviceStruct942);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  CreateDeviceAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  CreateDeviceAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAsyncPort: (p1: interop.PointerConvertible) => number | null;
  USBDeviceOpen: (p1: interop.PointerConvertible) => number | null;
  USBDeviceClose: (p1: interop.PointerConvertible) => number | null;
  GetDeviceClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceSubClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProtocol: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceVendor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProduct: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceReleaseNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAddress: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceBusPowerAvailable: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceSpeed: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetNumberOfConfigurations: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetLocationID: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetConfigurationDescriptorPtr: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetConfiguration: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetConfiguration: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ResetDevice: (p1: interop.PointerConvertible) => number | null;
  DeviceRequest: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  DeviceRequestAsync: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p4: interop.PointerConvertible) => number | null;
  CreateInterfaceIterator: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  USBDeviceOpenSeize: (p1: interop.PointerConvertible) => number | null;
  DeviceRequestTO: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  DeviceRequestAsyncTO: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p4: interop.PointerConvertible) => number | null;
  USBDeviceSuspend: (p1: interop.PointerConvertible, p2: number) => number | null;
  USBDeviceAbortPipeZero: (p1: interop.PointerConvertible) => number | null;
  USBGetManufacturerStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBGetProductStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBGetSerialNumberStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBDeviceReEnumerate: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusMicroFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetIOUSBLibVersion: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetBusFrameNumberWithTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetUSBDeviceInformation: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  RequestExtraPower: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible) => number | null;
  ReturnExtraPower: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  GetExtraPowerAllocated: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetBandwidthAvailableForDevice: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetConfigurationV2: (p1: interop.PointerConvertible, p2: number, p3: boolean, p4: boolean) => number | null;
  RegisterForNotification: (p1: interop.PointerConvertible, p2: number, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number | null;
  UnregisterNotification: (p1: interop.PointerConvertible, p2: number) => number | null;
  AcknowledgeNotification: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetDeviceAsyncNotificationPort: (p1: interop.PointerConvertible) => interop.Pointer | null;
}

declare class IOUSBDeviceStruct197 {
  constructor(init?: IOUSBDeviceStruct197);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  CreateDeviceAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  CreateDeviceAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAsyncPort: (p1: interop.PointerConvertible) => number | null;
  USBDeviceOpen: (p1: interop.PointerConvertible) => number | null;
  USBDeviceClose: (p1: interop.PointerConvertible) => number | null;
  GetDeviceClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceSubClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProtocol: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceVendor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProduct: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceReleaseNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAddress: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceBusPowerAvailable: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceSpeed: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetNumberOfConfigurations: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetLocationID: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetConfigurationDescriptorPtr: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetConfiguration: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetConfiguration: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ResetDevice: (p1: interop.PointerConvertible) => number | null;
  DeviceRequest: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  DeviceRequestAsync: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p4: interop.PointerConvertible) => number | null;
  CreateInterfaceIterator: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  USBDeviceOpenSeize: (p1: interop.PointerConvertible) => number | null;
  DeviceRequestTO: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  DeviceRequestAsyncTO: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p4: interop.PointerConvertible) => number | null;
  USBDeviceSuspend: (p1: interop.PointerConvertible, p2: number) => number | null;
  USBDeviceAbortPipeZero: (p1: interop.PointerConvertible) => number | null;
  USBGetManufacturerStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBGetProductStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBGetSerialNumberStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBDeviceReEnumerate: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusMicroFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetIOUSBLibVersion: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
}

declare class IOUSBDeviceStruct187 {
  constructor(init?: IOUSBDeviceStruct187);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  CreateDeviceAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  CreateDeviceAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAsyncPort: (p1: interop.PointerConvertible) => number | null;
  USBDeviceOpen: (p1: interop.PointerConvertible) => number | null;
  USBDeviceClose: (p1: interop.PointerConvertible) => number | null;
  GetDeviceClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceSubClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProtocol: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceVendor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProduct: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceReleaseNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAddress: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceBusPowerAvailable: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceSpeed: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetNumberOfConfigurations: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetLocationID: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetConfigurationDescriptorPtr: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetConfiguration: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetConfiguration: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ResetDevice: (p1: interop.PointerConvertible) => number | null;
  DeviceRequest: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  DeviceRequestAsync: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p4: interop.PointerConvertible) => number | null;
  CreateInterfaceIterator: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  USBDeviceOpenSeize: (p1: interop.PointerConvertible) => number | null;
  DeviceRequestTO: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  DeviceRequestAsyncTO: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p4: interop.PointerConvertible) => number | null;
  USBDeviceSuspend: (p1: interop.PointerConvertible, p2: number) => number | null;
  USBDeviceAbortPipeZero: (p1: interop.PointerConvertible) => number | null;
  USBGetManufacturerStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBGetProductStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBGetSerialNumberStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBDeviceReEnumerate: (p1: interop.PointerConvertible, p2: number) => number | null;
}

declare class IOUSBDeviceStruct100 {
  constructor(init?: IOUSBDeviceStruct100);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  CreateDeviceAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  CreateDeviceAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAsyncPort: (p1: interop.PointerConvertible) => number | null;
  USBDeviceOpen: (p1: interop.PointerConvertible) => number | null;
  USBDeviceClose: (p1: interop.PointerConvertible) => number | null;
  GetDeviceClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceSubClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProtocol: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceVendor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProduct: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceReleaseNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAddress: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceBusPowerAvailable: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceSpeed: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetNumberOfConfigurations: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetLocationID: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetConfigurationDescriptorPtr: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetConfiguration: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetConfiguration: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ResetDevice: (p1: interop.PointerConvertible) => number | null;
  DeviceRequest: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  DeviceRequestAsync: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p4: interop.PointerConvertible) => number | null;
  CreateInterfaceIterator: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
}

declare class LowLatencyUserBufferInfoV3 {
  constructor(init?: LowLatencyUserBufferInfoV3);
  cookie: number;
  bufferAddress: number;
  bufferSize: number;
  bufferType: number;
  isPrepared: number;
  mappedUHCIAddress: number;
  nextBuffer: interop.Pointer;
}

declare class LowLatencyUserBufferInfo {
  constructor(init?: LowLatencyUserBufferInfo);
  cookie: number;
  bufferAddress: interop.Pointer;
  bufferSize: number;
  bufferType: number;
  isPrepared: number;
  nextBuffer: interop.Pointer;
}

declare class IOUSBLowLatencyIsocStruct {
  constructor(init?: IOUSBLowLatencyIsocStruct);
  fPipe: number;
  fBufSize: number;
  fStartFrame: number;
  fNumFrames: number;
  fUpdateFrequency: number;
  fDataBufferCookie: number;
  fDataBufferOffset: number;
  fFrameListBufferCookie: number;
  fFrameListBufferOffset: number;
}

declare class IOUSBIsocStruct {
  constructor(init?: IOUSBIsocStruct);
  fPipe: number;
  fBuffer: interop.Pointer;
  fBufSize: number;
  fStartFrame: number;
  fNumFrames: number;
  fFrameCounts: interop.Pointer;
}

declare class IOUSBDevReqOOLTO {
  constructor(init?: IOUSBDevReqOOLTO);
  bmRequestType: number;
  bRequest: number;
  wValue: number;
  wIndex: number;
  wLength: number;
  pData: interop.Pointer;
  wLenDone: number;
  pipeRef: number;
  noDataTimeout: number;
  completionTimeout: number;
}

declare class IOUSBDevRequestTO {
  constructor(init?: IOUSBDevRequestTO);
  bmRequestType: number;
  bRequest: number;
  wValue: number;
  wIndex: number;
  wLength: number;
  pData: interop.Pointer;
  wLenDone: number;
  noDataTimeout: number;
  completionTimeout: number;
}

declare class IOUSBDevRequest {
  constructor(init?: IOUSBDevRequest);
  bmRequestType: number;
  bRequest: number;
  wValue: number;
  wIndex: number;
  wLength: number;
  pData: interop.Pointer;
  wLenDone: number;
}

declare class IOUSBMatch {
  constructor(init?: IOUSBMatch);
  usbClass: number;
  usbSubClass: number;
  usbProtocol: number;
  usbVendor: number;
  usbProduct: number;
}

declare class IOUSBEndpointProperties {
  constructor(init?: IOUSBEndpointProperties);
  bVersion: number;
  bAlternateSetting: number;
  bDirection: number;
  bEndpointNumber: number;
  bTransferType: number;
  bUsageType: number;
  bSyncType: number;
  bInterval: number;
  wMaxPacketSize: number;
  bMaxBurst: number;
  bMaxStreams: number;
  bMult: number;
  wBytesPerInterval: number;
}

declare class IOUSBKeyboardData {
  constructor(init?: IOUSBKeyboardData);
  keycount: number;
  usbkeycode: unknown /* const array */;
}

declare class IOUSBMouseData {
  constructor(init?: IOUSBMouseData);
  buttons: number;
  XDelta: number;
  YDelta: number;
}

declare class IOUSBLowLatencyIsocCompletion {
  constructor(init?: IOUSBLowLatencyIsocCompletion);
  target: interop.Pointer;
  action: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => void | null;
  parameter: interop.Pointer;
}

declare class IOUSBIsocCompletion {
  constructor(init?: IOUSBIsocCompletion);
  target: interop.Pointer;
  action: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => void | null;
  parameter: interop.Pointer;
}

declare class IOUSBCompletionWithTimeStamp {
  constructor(init?: IOUSBCompletionWithTimeStamp);
  target: interop.Pointer;
  action: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: UnsignedWide) => void | null;
  parameter: interop.Pointer;
}

declare class IOUSBLowLatencyIsocFrame {
  constructor(init?: IOUSBLowLatencyIsocFrame);
  frStatus: number;
  frReqCount: number;
  frActCount: number;
  frTimeStamp: UnsignedWide;
}

declare class IOUSBIsocFrame {
  constructor(init?: IOUSBIsocFrame);
  frStatus: number;
  frReqCount: number;
  frActCount: number;
}

declare class IOUSBHIDDescriptor {
  constructor(init?: IOUSBHIDDescriptor);
  descLen: number;
  descType: number;
  descVersNum: number;
  hidCountryCode: number;
  hidNumDescriptors: number;
  hidDescriptorType: number;
  hidDescriptorLengthLo: number;
  hidDescriptorLengthHi: number;
}

declare class IOUSBSuperSpeedHubDescriptor {
  constructor(init?: IOUSBSuperSpeedHubDescriptor);
  bLength: number;
  bDescriptorType: number;
  bNumberPorts: number;
  wHubCharacteristics: number;
  bPowerOnToPowerGood: number;
  bHubControllerCurrent: number;
  bHubDecodeLatency: number;
  wHubDelay: number;
  deviceRemovable: number;
}

declare class IOUSB20HubDescriptor {
  constructor(init?: IOUSB20HubDescriptor);
  bLength: number;
  bDescriptorType: number;
  bNumberPorts: number;
  wHubCharacteristics: number;
  bPowerOnToPowerGood: number;
  bHubControllerCurrent: number;
  deviceRemovable: unknown /* const array */;
  reserved: unknown /* const array */;
}

declare class IOUSBSuperSpeedEndpointCompanionDescriptor {
  constructor(init?: IOUSBSuperSpeedEndpointCompanionDescriptor);
  bLength: number;
  bDescriptorType: number;
  bMaxBurst: number;
  bmAttributes: number;
  wBytesPerInterval: number;
}

declare class IOUSBDeviceCapabilityBillboardAltMode {
  constructor(init?: IOUSBDeviceCapabilityBillboardAltMode);
  bLength: number;
  bDescriptorType: number;
  bDevCapabilityType: number;
  bIndex: number;
  dwAlternateModeVdo: number;
}

declare class IOUSBDeviceCapabilityBillboardAltConfigCompatibility {
  constructor(init?: IOUSBDeviceCapabilityBillboardAltConfigCompatibility);
  wSVID: number;
  dwAlternateMode: number;
  iAlternateModeString: number;
}

declare class IOUSBPlatformCapabilityDescriptor {
  constructor(init?: IOUSBPlatformCapabilityDescriptor);
  bLength: number;
  bDescriptorType: number;
  bDevCapabilityType: number;
  bReserved: number;
  PlatformCapabilityUUID: unknown /* const array */;
}

declare class IOUSBDeviceCapabilityContainerID {
  constructor(init?: IOUSBDeviceCapabilityContainerID);
  bLength: number;
  bDescriptorType: number;
  bDevCapabilityType: number;
  bReservedID: number;
  containerID: unknown /* const array */;
}

declare class IOUSBDeviceCapabilitySuperSpeedUSB {
  constructor(init?: IOUSBDeviceCapabilitySuperSpeedUSB);
  bLength: number;
  bDescriptorType: number;
  bDevCapabilityType: number;
  bmAttributes: number;
  wSpeedsSupported: number;
  bFunctionalitySupport: number;
  bU1DevExitLat: number;
  wU2DevExitLat: number;
}

declare class IOUSBBOSDescriptor {
  constructor(init?: IOUSBBOSDescriptor);
  bLength: number;
  bDescriptorType: number;
  wTotalLength: number;
  bNumDeviceCaps: number;
}

declare class IOUSBStringDescriptor {
  constructor(init?: IOUSBStringDescriptor);
  bLength: number;
  bDescriptorType: number;
  bString: unknown /* const array */;
}

declare class IOUSBEndpointDescriptor {
  constructor(init?: IOUSBEndpointDescriptor);
  bLength: number;
  bDescriptorType: number;
  bEndpointAddress: number;
  bmAttributes: number;
  wMaxPacketSize: number;
  bInterval: number;
}

declare class IOUSBInterfaceDescriptor {
  constructor(init?: IOUSBInterfaceDescriptor);
  bLength: number;
  bDescriptorType: number;
  bInterfaceNumber: number;
  bAlternateSetting: number;
  bNumEndpoints: number;
  bInterfaceClass: number;
  bInterfaceSubClass: number;
  bInterfaceProtocol: number;
  iInterface: number;
}

declare class IOUSBConfigurationDescriptor {
  constructor(init?: IOUSBConfigurationDescriptor);
  bLength: number;
  bDescriptorType: number;
  wTotalLength: number;
  bNumInterfaces: number;
  bConfigurationValue: number;
  iConfiguration: number;
  bmAttributes: number;
  MaxPower: number;
}

declare class IOUSBConfigurationDescHeader {
  constructor(init?: IOUSBConfigurationDescHeader);
  bLength: number;
  bDescriptorType: number;
  wTotalLength: number;
}

declare class IOUSBDeviceDescriptor {
  constructor(init?: IOUSBDeviceDescriptor);
  bLength: number;
  bDescriptorType: number;
  bcdUSB: number;
  bDeviceClass: number;
  bDeviceSubClass: number;
  bDeviceProtocol: number;
  bMaxPacketSize0: number;
  idVendor: number;
  idProduct: number;
  bcdDevice: number;
  iManufacturer: number;
  iProduct: number;
  iSerialNumber: number;
  bNumConfigurations: number;
}

declare class IOUSBDescriptorHeader {
  constructor(init?: IOUSBDescriptorHeader);
  bLength: number;
  bDescriptorType: number;
}

declare class __IOStreamBufferQueue {
  constructor(init?: __IOStreamBufferQueue);
  entryCount: number;
  headIndex: number;
  tailIndex: number;
  reserved: number;
  queue: unknown /* const array */;
}

declare class IOATASMARTInterface {
  constructor(init?: IOATASMARTInterface);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  SMARTEnableDisableOperations: (p1: interop.PointerConvertible, p2: number) => number | null;
  SMARTEnableDisableAutosave: (p1: interop.PointerConvertible, p2: number) => number | null;
  SMARTReturnStatus: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SMARTExecuteOffLineImmediate: (p1: interop.PointerConvertible, p2: number) => number | null;
  SMARTReadData: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SMARTValidateReadData: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SMARTReadDataThresholds: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SMARTReadLogDirectory: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SMARTReadLogAtAddress: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number) => number | null;
  SMARTWriteLogAtAddress: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number) => number | null;
  GetATAIdentifyData: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number | null;
}

declare class ATASMARTDataThresholds {
  constructor(init?: ATASMARTDataThresholds);
  vendorSpecific1: unknown /* const array */;
  vendorSpecific2: unknown /* const array */;
  checksum: number;
}

declare class ATASMARTData {
  constructor(init?: ATASMARTData);
  vendorSpecific1: unknown /* const array */;
  offLineDataCollectionStatus: number;
  selfTestExecutionStatus: number;
  secondsToCompleteOffLineActivity: unknown /* const array */;
  vendorSpecific2: number;
  offLineDataCollectionCapability: number;
  SMARTCapability: unknown /* const array */;
  errorLoggingCapability: number;
  vendorSpecific3: number;
  shortTestPollingInterval: number;
  extendedTestPollingInterval: number;
  reserved: unknown /* const array */;
  vendorSpecific4: unknown /* const array */;
  checksum: number;
}

declare class dk_cd_read_track_info_t {
  constructor(init?: dk_cd_read_track_info_t);
  reserved0000: unknown /* const array */;
  address: number;
  addressType: number;
  reserved0072: unknown /* const array */;
  bufferLength: number;
  buffer: interop.Pointer;
}

declare class dk_cd_read_mcn_t {
  constructor(init?: dk_cd_read_mcn_t);
  mcn: unknown /* const array */;
  reserved0112: unknown /* const array */;
}

declare class dk_cd_read_isrc_t {
  constructor(init?: dk_cd_read_isrc_t);
  isrc: unknown /* const array */;
  track: number;
  reserved0112: unknown /* const array */;
}

declare class CDTrackInfo {
  constructor(init?: CDTrackInfo);
  dataLength: number;
  trackNumberLSB: number;
  sessionNumberLSB: number;
  reserved: number;
  trackMode: number;
  copy: number;
  damage: number;
  reserved3: number;
  dataMode: number;
  fixedPacket: number;
  packet: number;
  blank: number;
  reservedTrack: number;
  nextWritableAddressValid: number;
  lastRecordedAddressValid: number;
  reserved5: number;
  trackStartAddress: number;
  nextWritableAddress: number;
  freeBlocks: number;
  fixedPacketSize: number;
  trackSize: number;
  lastRecordedAddress: number;
  trackNumberMSB: number;
  sessionNumberMSB: number;
  reserved6: number;
  reserved7: number;
}

declare class CDTEXT {
  constructor(init?: CDTEXT);
  dataLength: number;
  reserved: number;
  reserved2: number;
  descriptors: unknown /* const array */;
}

declare class CDPMA {
  constructor(init?: CDPMA);
  dataLength: number;
  reserved: number;
  reserved2: number;
  descriptors: unknown /* const array */;
}

declare class CDPMADescriptor {
  constructor(init?: CDPMADescriptor);
  reserved: number;
  control: number;
  adr: number;
  tno: number;
  point: number;
  address: CDMSF;
  zero: number;
  p: CDMSF;
}

declare class CDTOC {
  constructor(init?: CDTOC);
  length: number;
  sessionFirst: number;
  sessionLast: number;
  descriptors: unknown /* const array */;
}

declare class unnamed_17464621307155594590 {
  constructor(init?: unnamed_17464621307155594590);
  time: CDMSF;
  track: unnamed_10669153243747207100;
}

declare class CDAudioStatus {
  constructor(init?: CDAudioStatus);
  status: number;
  position: unnamed_17464621307155594590;
}

declare class CDMSF {
  constructor(init?: CDMSF);
  minute: number;
  second: number;
  frame: number;
}

declare class dk_bd_read_track_info_t {
  constructor(init?: dk_bd_read_track_info_t);
  reserved0000: unknown /* const array */;
  address: number;
  addressType: number;
  reserved0072: unknown /* const array */;
  bufferLength: number;
  buffer: interop.Pointer;
}

declare class dk_bd_send_key_t {
  constructor(init?: dk_bd_send_key_t);
  format: number;
  keyClass: number;
  reserved0016: unknown /* const array */;
  grantID: number;
  reserved0072: unknown /* const array */;
  bufferLength: number;
  buffer: interop.Pointer;
}

declare class disk_blk0 {
  constructor(init?: disk_blk0);
  bootcode: unknown /* const array */;
  parts: unknown /* const array */;
  signature: number;
}

declare class fdisk_part {
  constructor(init?: fdisk_part);
  bootid: number;
  beghead: number;
  begsect: number;
  begcyl: number;
  systid: number;
  endhead: number;
  endsect: number;
  endcyl: number;
  relsect: number;
  numsect: number;
}

declare class dpme {
  constructor(init?: dpme);
  dpme_signature: number;
  dpme_reserved_1: number;
  dpme_map_entries: number;
  dpme_pblock_start: number;
  dpme_pblocks: number;
  dpme_name: unknown /* const array */;
  dpme_type: unknown /* const array */;
  dpme_lblock_start: number;
  dpme_lblocks: number;
  dpme_flags: number;
  dpme_boot_block: number;
  dpme_boot_bytes: number;
  dpme_load_addr: number;
  dpme_load_addr_2: number;
  dpme_goto_addr: number;
  dpme_goto_addr_2: number;
  dpme_checksum: number;
  dpme_process_id: unknown /* const array */;
  dpme_reserved_2: unknown /* const array */;
  dpme_reserved_3: unknown /* const array */;
}

declare class dk_dvd_read_rzone_info_t {
  constructor(init?: dk_dvd_read_rzone_info_t);
  reserved0000: unknown /* const array */;
  address: number;
  addressType: number;
  reserved0072: unknown /* const array */;
  bufferLength: number;
  buffer: interop.Pointer;
}

declare class dk_dvd_send_key_t {
  constructor(init?: dk_dvd_send_key_t);
  format: number;
  keyClass: number;
  reserved0016: unknown /* const array */;
  grantID: number;
  reserved0072: unknown /* const array */;
  bufferLength: number;
  buffer: interop.Pointer;
}

declare class dk_dvd_report_key_t {
  constructor(init?: dk_dvd_report_key_t);
  format: number;
  keyClass: number;
  blockCount: number;
  reserved0024: unknown /* const array */;
  address: number;
  grantID: number;
  reserved0072: unknown /* const array */;
  bufferLength: number;
  buffer: interop.Pointer;
}

declare class DVDRZoneInfo {
  constructor(init?: DVDRZoneInfo);
  dataLength: number;
  rzoneNumberLSB: number;
  borderNumberLSB: number;
  reserved: number;
  reserved2: number;
  copy: number;
  damage: number;
  reserved3: number;
  reserved4: number;
  restrictedOverwrite: number;
  incremental: number;
  blank: number;
  reservedRZone: number;
  nextWritableAddressValid: number;
  lastRecordedAddressValid: number;
  reserved5: number;
  rzoneStartAddress: number;
  nextWritableAddress: number;
  freeBlocks: number;
  blockingFactor: number;
  rzoneSize: number;
  lastRecordedAddress: number;
  rzoneNumberMSB: number;
  borderNumberMSB: number;
  reserved6: number;
  reserved7: number;
}

declare class DVDDiscInfo {
  constructor(init?: DVDDiscInfo);
  dataLength: number;
  discStatus: number;
  stateOfLastBorder: number;
  erasable: number;
  reserved: number;
  reserved2: number;
  numberOfBordersLSB: number;
  firstRZoneNumberInLastBorderLSB: number;
  lastRZoneNumberInLastBorderLSB: number;
  reserved3: number;
  unrestrictedUse: number;
  discBarCodeValid: number;
  reserved4: number;
  reserved5: number;
  numberOfBordersMSB: number;
  firstRZoneNumberInLastBorderMSB: number;
  lastRZoneNumberInLastBorderMSB: number;
  reserved6: unknown /* const array */;
  reserved7: unknown /* const array */;
  reserved8: unknown /* const array */;
  discBarCode: unknown /* const array */;
  reserved9: number;
  numberOfOPCTableEntries: number;
  opcTableEntries: unknown /* const array */;
}

declare class DVDRegionPlaybackControlInfo {
  constructor(init?: DVDRegionPlaybackControlInfo);
  dataLength: unknown /* const array */;
  reserved: unknown /* const array */;
  numberUserResets: number;
  numberVendorResets: number;
  typeCode: number;
  driveRegion: number;
  rpcScheme: number;
  reserved2: number;
}

declare class DVDAuthenticationSuccessFlagInfo {
  constructor(init?: DVDAuthenticationSuccessFlagInfo);
  dataLength: unknown /* const array */;
  reserved: unknown /* const array */;
  reserved2: unknown /* const array */;
  successFlag: number;
  reservedBits: number;
}

declare class DVDTitleKeyInfo {
  constructor(init?: DVDTitleKeyInfo);
  dataLength: unknown /* const array */;
  reserved: unknown /* const array */;
  CP_MOD: number;
  CGMS: number;
  CP_SEC: number;
  CPM: number;
  titleKeyValue: unknown /* const array */;
  reserved2: unknown /* const array */;
}

declare class DVDKey2Info {
  constructor(init?: DVDKey2Info);
  dataLength: unknown /* const array */;
  reserved: unknown /* const array */;
  key2Value: unknown /* const array */;
  reserved2: unknown /* const array */;
}

declare class DVDChallengeKeyInfo {
  constructor(init?: DVDChallengeKeyInfo);
  dataLength: unknown /* const array */;
  reserved: unknown /* const array */;
  challengeKeyValue: unknown /* const array */;
  reserved2: unknown /* const array */;
}

declare class DVDAuthenticationGrantIDInfo {
  constructor(init?: DVDAuthenticationGrantIDInfo);
  dataLength: unknown /* const array */;
  reserved: unknown /* const array */;
  reserved2: unknown /* const array */;
  reservedBits: number;
  grantID: number;
}

declare class DVDCopyrightInfo {
  constructor(init?: DVDCopyrightInfo);
  dataLength: unknown /* const array */;
  reserved: unknown /* const array */;
  copyrightProtectionSystemType: number;
  regionMask: number;
  reserved2: unknown /* const array */;
}

declare class SCSITaskDeviceInterface {
  constructor(init?: SCSITaskDeviceInterface);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  IsExclusiveAccessAvailable: (p1: interop.PointerConvertible) => number | null;
  AddCallbackDispatcherToRunLoop: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  RemoveCallbackDispatcherFromRunLoop: (p1: interop.PointerConvertible) => void | null;
  ObtainExclusiveAccess: (p1: interop.PointerConvertible) => number | null;
  ReleaseExclusiveAccess: (p1: interop.PointerConvertible) => number | null;
  CreateSCSITask: (p1: interop.PointerConvertible) => interop.Pointer | null;
}

declare class SCSITaskInterface {
  constructor(init?: SCSITaskInterface);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  IsTaskActive: (p1: interop.PointerConvertible) => number | null;
  SetTaskAttribute: (p1: interop.PointerConvertible, p2: interop.Enum<typeof SCSITaskAttribute>) => number | null;
  GetTaskAttribute: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetCommandDescriptorBlock: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => number | null;
  GetCommandDescriptorBlockSize: (p1: interop.PointerConvertible) => number | null;
  GetCommandDescriptorBlock: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetScatterGatherEntries: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: number) => number | null;
  SetTimeoutDuration: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetTimeoutDuration: (p1: interop.PointerConvertible) => number | null;
  SetTaskCompletionCallback: (p1: interop.PointerConvertible, p2: (p1: interop.Enum<typeof SCSIServiceResponse>, p2: interop.Enum<typeof SCSITaskStatus>, p3: number, p4: interop.PointerConvertible) => void, p3: interop.PointerConvertible) => number | null;
  ExecuteTaskAsync: (p1: interop.PointerConvertible) => number | null;
  ExecuteTaskSync: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  AbortTask: (p1: interop.PointerConvertible) => number | null;
  GetSCSIServiceResponse: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetTaskState: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetTaskStatus: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetRealizedDataTransferCount: (p1: interop.PointerConvertible) => number | null;
  GetAutoSenseData: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetAutoSenseDataBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => number | null;
  ResetForNewTask: (p1: interop.PointerConvertible) => number | null;
}

declare class SCSICmd_REPORT_LUNS_Header {
  constructor(init?: SCSICmd_REPORT_LUNS_Header);
  LUN_LIST_LENGTH: number;
  RESERVED: number;
  LUN: unknown /* const array */;
}

declare class REPORT_LUNS_PERIPHERAL_DEVICE_ADDRESSING {
  constructor(init?: REPORT_LUNS_PERIPHERAL_DEVICE_ADDRESSING);
  TARGET_LUN: number;
  BUS_IDENTIFIER: number;
  reserved2: number;
  reserved: number;
}

declare class REPORT_LUNS_LOGICAL_UNIT_ADDRESSING {
  constructor(init?: REPORT_LUNS_LOGICAL_UNIT_ADDRESSING);
  LUN: number;
  BUS_NUMBER: number;
  TARGET: number;
  reserved2: number;
  reserved: number;
}

declare class SCSICmd_REPORT_LUNS_LUN_ENTRY {
  constructor(init?: SCSICmd_REPORT_LUNS_LUN_ENTRY);
  FIRST_LEVEL_ADDRESSING: number;
  SECOND_LEVEL_ADDRESSING: number;
  THIRD_LEVEL_ADDRESSING: number;
  FOURTH_LEVEL_ADDRESSING: number;
}

declare class SCSI_Capacity_Data {
  constructor(init?: SCSI_Capacity_Data);
  RETURNED_LOGICAL_BLOCK_ADDRESS: number;
  BLOCK_LENGTH_IN_BYTES: number;
}

declare class SBCModePageCaching {
  constructor(init?: SBCModePageCaching);
  header: ModePageFormatHeader;
  flags: number;
  DEMAND_READ_WRITE_RETENTION_PRIORITY: number;
  DISABLE_PREFETCH_TRANSFER_LENGTH: number;
  MINIMUM_PREFETCH: number;
  MAXIMUM_PREFETCH: number;
  MAXIMUM_PREFETCH_CEILING: number;
  flags2: number;
  NUMBER_OF_CACHE_SEGMENTS: number;
  CACHE_SEGMENT_SIZE: number;
  RESERVED: number;
  NON_CACHE_SEGMENT_SIZE: unknown /* const array */;
}

declare class SBCModePageRigidDiskGeometry {
  constructor(init?: SBCModePageRigidDiskGeometry);
  header: ModePageFormatHeader;
  NUMBER_OF_CYLINDERS: unknown /* const array */;
  NUMBER_OF_HEADS: number;
  STARTING_CYLINDER_WRITE_PRECOMPENSATION: unknown /* const array */;
  STARTING_CYLINDER_REDUCED_WRITE_CURRENT: unknown /* const array */;
  DEVICE_STEP_RATE: number;
  LANDING_ZONE_CYLINDER: unknown /* const array */;
  RPL: number;
  ROTATIONAL_OFFSET: number;
  RESERVED: number;
  MEDIUM_ROTATION_RATE: number;
  RESERVED1: unknown /* const array */;
}

declare class SPCModePagePowerCondition {
  constructor(init?: SPCModePagePowerCondition);
  header: ModePageFormatHeader;
  RESERVED: number;
  IDLE_STANDBY: number;
  IDLE_CONDITION_TIMER: number;
  STANDBY_CONDITION_TIMER: number;
}

declare class ModePageFormatHeader {
  constructor(init?: ModePageFormatHeader);
  PS_PAGE_CODE: number;
  PAGE_LENGTH: number;
}

declare class LongLBAModeParameterBlockDescriptor {
  constructor(init?: LongLBAModeParameterBlockDescriptor);
  NUMBER_OF_BLOCKS: number;
  DENSITY_CODE: number;
  RESERVED: unknown /* const array */;
  BLOCK_LENGTH: number;
}

declare class DASDModeParameterBlockDescriptor {
  constructor(init?: DASDModeParameterBlockDescriptor);
  NUMBER_OF_BLOCKS: number;
  DENSITY_CODE: number;
  BLOCK_LENGTH: unknown /* const array */;
}

declare class SCSICmd_INQUIRY_PageC1_Data {
  constructor(init?: SCSICmd_INQUIRY_PageC1_Data);
  fHeader: SCSICmd_INQUIRY_PageCx_Header;
  fTdmPowerRequirementsPageVersion: number;
  fReserved1: number;
  fReserved2: number;
  fPowerRequired: number;
}

declare class IOUSBDeviceCapabilityUSB2Extension {
  constructor(init?: IOUSBDeviceCapabilityUSB2Extension);
  bLength: number;
  bDescriptorType: number;
  bDevCapabilityType: number;
  bmAttributes: number;
}

declare class SCSICmd_INQUIRY_PageC0_Data {
  constructor(init?: SCSICmd_INQUIRY_PageC0_Data);
  fHeader: SCSICmd_INQUIRY_PageCx_Header;
  fTdmPageVersion: number;
  fTdmProtocolVersion: number;
  fReserved1: number;
  fReserved2: number;
  fMacModelId: unknown /* const array */;
  fSerialNumber: unknown /* const array */;
  fMaxReadSize: number;
  fMaxWriteSize: number;
  fNativeBlockSize: number;
  fPreferredIOSize: number;
  fFeatures: number;
  fWorkArounds: number;
  fEncryptionType: number;
  fReserved3: unknown /* const array */;
  fInstalledRAMSize: number;
}

declare class SCSICmd_INQUIRY_PageB2_Provisioning_Group_Descriptor {
  constructor(init?: SCSICmd_INQUIRY_PageB2_Provisioning_Group_Descriptor);
  DESIGNATION_DESCRIPTOR: unknown /* const array */;
  RESERVED: unknown /* const array */;
}

declare class SCSICmd_INQUIRY_PageB1_Data {
  constructor(init?: SCSICmd_INQUIRY_PageB1_Data);
  PERIPHERAL_DEVICE_TYPE: number;
  PAGE_CODE: number;
  Reserved: number;
  PAGE_LENGTH: number;
  MEDIUM_ROTATION_RATE: number;
  Reserved2: unknown /* const array */;
}

declare class SCSICmd_INQUIRY_PageB0_Data {
  constructor(init?: SCSICmd_INQUIRY_PageB0_Data);
  PERIPHERAL_DEVICE_TYPE: number;
  PAGE_CODE: number;
  PAGE_LENGTH: number;
  WSNZ: number;
  MAXIMUM_COMPARE_AND_WRITE_LENGTH: number;
  OPTIMAL_TRANSFER_LENGTH_GRANULARITY: number;
  MAXIMUM_TRANSFER_LENGTH: number;
  OPTIMAL_TRANSFER_LENGTH: number;
  MAXIMUM_PREFETCH_LENGTH: number;
  MAXIMUM_UNMAP_LBA_COUNT: number;
  MAXIMUM_UNMAP_BLOCK_DESCRIPTOR_COUNT: number;
  OPTIMAL_UNMAP_GRANULARITY: number;
  UNMAP_GRANULARITY_ALIGNMENT: number;
  MAXIMUM_WRITE_SAME_LENGTH: number;
  MAXIMUM_ATOMIC_TRANSFER_LENGTH: number;
  ATOMIC_ALIGNMENT: number;
  ATOMIC_TRANSFER_LENGTH_GRANULARITY: number;
  MAXIMUM_ATOMIC_TRANSFER_LENGTH_WITH_ATOMIC_BOUNDARY: number;
  MAXIMUM_ATOMIC_BOUNDARY_SIZE: number;
}

declare class SCSICmd_INQUIRY_Page83_Identification_Descriptor {
  constructor(init?: SCSICmd_INQUIRY_Page83_Identification_Descriptor);
  CODE_SET: number;
  IDENTIFIER_TYPE: number;
  RESERVED: number;
  IDENTIFIER_LENGTH: number;
  IDENTIFIER: number;
}

declare class SCSICmd_INQUIRY_Page00_Header_SPC_16 {
  constructor(init?: SCSICmd_INQUIRY_Page00_Header_SPC_16);
  PERIPHERAL_DEVICE_TYPE: number;
  PAGE_CODE: number;
  PAGE_LENGTH: number;
}

declare class SCSICmd_INQUIRY_Page00_Header {
  constructor(init?: SCSICmd_INQUIRY_Page00_Header);
  PERIPHERAL_DEVICE_TYPE: number;
  PAGE_CODE: number;
  RESERVED: number;
  PAGE_LENGTH: number;
}

declare class SCSICmd_INQUIRY_StandardDataAll {
  constructor(init?: SCSICmd_INQUIRY_StandardDataAll);
  PERIPHERAL_DEVICE_TYPE: number;
  RMB: number;
  VERSION: number;
  RESPONSE_DATA_FORMAT: number;
  ADDITIONAL_LENGTH: number;
  SCCSReserved: number;
  flags1: number;
  flags2: number;
  VENDOR_IDENTIFICATION: unknown /* const array */;
  PRODUCT_IDENTIFICATION: unknown /* const array */;
  PRODUCT_REVISION_LEVEL: unknown /* const array */;
  VendorSpecific1: unknown /* const array */;
  flags3: number;
  Reserved1: number;
  VERSION_DESCRIPTOR: unknown /* const array */;
  Reserved2: unknown /* const array */;
  VendorSpecific2: unknown /* const array */;
}

declare class SCSICmd_INQUIRY_StandardData {
  constructor(init?: SCSICmd_INQUIRY_StandardData);
  PERIPHERAL_DEVICE_TYPE: number;
  RMB: number;
  VERSION: number;
  RESPONSE_DATA_FORMAT: number;
  ADDITIONAL_LENGTH: number;
  SCCSReserved: number;
  flags1: number;
  flags2: number;
  VENDOR_IDENTIFICATION: unknown /* const array */;
  PRODUCT_IDENTIFICATION: unknown /* const array */;
  PRODUCT_REVISION_LEVEL: unknown /* const array */;
}

declare class SCSI_Sense_Data {
  constructor(init?: SCSI_Sense_Data);
  VALID_RESPONSE_CODE: number;
  SEGMENT_NUMBER: number;
  SENSE_KEY: number;
  INFORMATION_1: number;
  INFORMATION_2: number;
  INFORMATION_3: number;
  INFORMATION_4: number;
  ADDITIONAL_SENSE_LENGTH: number;
  COMMAND_SPECIFIC_INFORMATION_1: number;
  COMMAND_SPECIFIC_INFORMATION_2: number;
  COMMAND_SPECIFIC_INFORMATION_3: number;
  COMMAND_SPECIFIC_INFORMATION_4: number;
  ADDITIONAL_SENSE_CODE: number;
  ADDITIONAL_SENSE_CODE_QUALIFIER: number;
  FIELD_REPLACEABLE_UNIT_CODE: number;
  SKSV_SENSE_KEY_SPECIFIC_MSB: number;
  SENSE_KEY_SPECIFIC_MID: number;
  SENSE_KEY_SPECIFIC_LSB: number;
}

declare class FWSBP2NotifyParams {
  constructor(init?: FWSBP2NotifyParams);
  refCon: interop.Pointer;
  notificationEvent: number;
  message: interop.Pointer;
  length: number;
  generation: number;
}

declare class FWSBP2LoginCompleteParams {
  constructor(init?: FWSBP2LoginCompleteParams);
  refCon: interop.Pointer;
  generation: number;
  status: number;
  loginResponse: interop.Pointer;
  statusBlock: interop.Pointer;
  statusBlockLength: number;
}

declare class FWSBP2StatusBlock {
  constructor(init?: FWSBP2StatusBlock);
  details: number;
  sbpStatus: number;
  orbOffsetHi: number;
  orbOffsetLo: number;
  status: unknown /* const array */;
}

declare class FWSBP2LoginResponse {
  constructor(init?: FWSBP2LoginResponse);
  length: number;
  loginID: number;
  commandBlockAgentAddressHi: number;
  commandBlockAgentAddressLo: number;
  reserved: number;
  reconnectHold: number;
}

declare class DVDManufacturingInfo {
  constructor(init?: DVDManufacturingInfo);
  dataLength: unknown /* const array */;
  reserved: unknown /* const array */;
  discManufacturingInfo: unknown /* const array */;
}

declare class FWSBP2VirtualRange {
  constructor(init?: FWSBP2VirtualRange);
  address: interop.Pointer;
  length: number;
}

declare class IOPMSystemCapabilityChangeParameters {
  constructor(init?: IOPMSystemCapabilityChangeParameters);
  notifyRef: number;
  maxWaitForReply: number;
  changeFlags: number;
  __reserved1: number;
  fromCapabilities: number;
  toCapabilities: number;
  __reserved2: unknown /* const array */;
}

declare class IOPowerStateChangeNotification {
  constructor(init?: IOPowerStateChangeNotification);
  powerRef: interop.Pointer;
  returnValue: number;
  stateNumber: number;
  stateFlags: number;
}

declare class IOUPSPlugInInterface_v140 {
  constructor(init?: IOUPSPlugInInterface_v140);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  getProperties: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  getCapabilities: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  getEvent: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  setEventCallback: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => void, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  sendCommand: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  createAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
}

declare class dk_bd_read_structure_t {
  constructor(init?: dk_bd_read_structure_t);
  format: number;
  reserved0008: unknown /* const array */;
  address: number;
  grantID: number;
  layer: number;
  reserved0080: unknown /* const array */;
  bufferLength: number;
  buffer: interop.Pointer;
}

declare class IOUPSPlugInInterface {
  constructor(init?: IOUPSPlugInInterface);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  getProperties: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  getCapabilities: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  getEvent: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  setEventCallback: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => void, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  sendCommand: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
}

declare class IOEthernetStats {
  constructor(init?: IOEthernetStats);
  dot3StatsEntry: IODot3StatsEntry;
  dot3CollEntry: IODot3CollEntry;
  dot3RxExtraEntry: IODot3RxExtraEntry;
  dot3TxExtraEntry: IODot3TxExtraEntry;
}

declare class IODot3RxExtraEntry {
  constructor(init?: IODot3RxExtraEntry);
  overruns: number;
  watchdogTimeouts: number;
  frameTooShorts: number;
  collisionErrors: number;
  phyErrors: number;
  timeouts: number;
  interrupts: number;
  resets: number;
  resourceErrors: number;
  reserved: unknown /* const array */;
}

declare class IONetworkStats {
  constructor(init?: IONetworkStats);
  inputPackets: number;
  inputErrors: number;
  outputPackets: number;
  outputErrors: number;
  collisions: number;
}

declare class VDConfigurationRec {
  constructor(init?: VDConfigurationRec);
  csConfigFeature: number;
  csConfigSupport: number;
  csConfigValue: number;
  csReserved1: number;
  csReserved2: number;
}

declare class VDMirrorRec {
  constructor(init?: VDMirrorRec);
  csMirrorSize: number;
  csMirrorVersion: number;
  csMirrorRequestID: number;
  csMirrorResultID: number;
  csMirrorFeatures: number;
  csMirrorSupportedFlags: number;
  csMirrorFlags: number;
  csReserved1: number;
  csReserved2: number;
  csReserved3: number;
  csReserved4: number;
  csReserved5: number;
}

declare class VDScalerInfoRec {
  constructor(init?: VDScalerInfoRec);
  csScalerInfoSize: number;
  csScalerInfoVersion: number;
  csReserved1: number;
  csReserved2: number;
  csScalerFeatures: number;
  csMaxHorizontalPixels: number;
  csMaxVerticalPixels: number;
  csReserved3: number;
  csReserved4: number;
  csReserved5: number;
  csReserved6: number;
  csReserved7: number;
}

declare class VDScalerRec {
  constructor(init?: VDScalerRec);
  csScalerSize: number;
  csScalerVersion: number;
  csReserved1: number;
  csReserved2: number;
  csDisplayModeID: number;
  csDisplayModeSeed: number;
  csDisplayModeState: number;
  csReserved3: number;
  csScalerFlags: number;
  csHorizontalPixels: number;
  csVerticalPixels: number;
  csHorizontalInset: number;
  csVerticalInset: number;
  csReserved6: number;
  csReserved7: number;
  csReserved8: number;
}

declare class VDDisplayTimingRangeRec {
  constructor(init?: VDDisplayTimingRangeRec);
  csRangeSize: number;
  csRangeType: number;
  csRangeVersion: number;
  csRangeReserved: number;
  csRangeBlockIndex: number;
  csRangeGroup: number;
  csRangeBlockCount: number;
  csRangeFlags: number;
  csMinPixelClock: number;
  csMaxPixelClock: number;
  csMaxPixelError: number;
  csTimingRangeSyncFlags: number;
  csTimingRangeSignalLevels: number;
  csTimingRangeSupportedSignalConfigs: number;
  csMinFrameRate: number;
  csMaxFrameRate: number;
  csMinLineRate: number;
  csMaxLineRate: number;
  csMaxHorizontalTotal: number;
  csMaxVerticalTotal: number;
  csMaxTotalReserved1: number;
  csMaxTotalReserved2: number;
  csCharSizeHorizontalActive: number;
  csCharSizeHorizontalBlanking: number;
  csCharSizeHorizontalSyncOffset: number;
  csCharSizeHorizontalSyncPulse: number;
  csCharSizeVerticalActive: number;
  csCharSizeVerticalBlanking: number;
  csCharSizeVerticalSyncOffset: number;
  csCharSizeVerticalSyncPulse: number;
  csCharSizeHorizontalBorderLeft: number;
  csCharSizeHorizontalBorderRight: number;
  csCharSizeVerticalBorderTop: number;
  csCharSizeVerticalBorderBottom: number;
  csCharSizeHorizontalTotal: number;
  csCharSizeVerticalTotal: number;
  csCharSizeReserved1: number;
  csMinHorizontalActiveClocks: number;
  csMaxHorizontalActiveClocks: number;
  csMinHorizontalBlankingClocks: number;
  csMaxHorizontalBlankingClocks: number;
  csMinHorizontalSyncOffsetClocks: number;
  csMaxHorizontalSyncOffsetClocks: number;
  csMinHorizontalPulseWidthClocks: number;
  csMaxHorizontalPulseWidthClocks: number;
  csMinVerticalActiveClocks: number;
  csMaxVerticalActiveClocks: number;
  csMinVerticalBlankingClocks: number;
  csMaxVerticalBlankingClocks: number;
  csMinVerticalSyncOffsetClocks: number;
  csMaxVerticalSyncOffsetClocks: number;
  csMinVerticalPulseWidthClocks: number;
  csMaxVerticalPulseWidthClocks: number;
  csMinHorizontalBorderLeft: number;
  csMaxHorizontalBorderLeft: number;
  csMinHorizontalBorderRight: number;
  csMaxHorizontalBorderRight: number;
  csMinVerticalBorderTop: number;
  csMaxVerticalBorderTop: number;
  csMinVerticalBorderBottom: number;
  csMaxVerticalBorderBottom: number;
  csMaxNumLinks: number;
  csMinLink0PixelClock: number;
  csMaxLink0PixelClock: number;
  csMinLink1PixelClock: number;
  csMaxLink1PixelClock: number;
  csReserved6: number;
  csReserved7: number;
  csReserved8: number;
}

declare class SBCModePageFlexibleDisk {
  constructor(init?: SBCModePageFlexibleDisk);
  header: ModePageFormatHeader;
  TRANSFER_RATE: number;
  NUMBER_OF_HEADS: number;
  SECTORS_PER_TRACK: number;
  DATA_BYTES_PER_SECTOR: number;
  NUMBER_OF_CYLINDERS: number;
  STARTING_CYLINDER_WRITE_PRECOMPENSATION: number;
  STARTING_CYLINDER_REDUCED_WRITE_CURRENT: number;
  DEVICE_STEP_RATE: number;
  DEVICE_STEP_PULSE_WIDTH: number;
  HEAD_SETTLE_DELAY: number;
  MOTOR_ON_DELAY: number;
  MOTOR_OFF_DELAY: number;
  TRDY_SSN_MO: number;
  SPC: number;
  WRITE_COMPENSATION: number;
  HEAD_LOAD_DELAY: number;
  HEAD_UNLOAD_DELAY: number;
  PIN_34_PIN_2: number;
  PIN_4_PIN_1: number;
  MEDIUM_ROTATION_RATE: number;
  RESERVED: unknown /* const array */;
}

declare class VDDDCBlockRec {
  constructor(init?: VDDDCBlockRec);
  ddcBlockNumber: number;
  ddcBlockType: number;
  ddcFlags: number;
  ddcReserved: number;
  ddcBlockData: unknown /* const array */;
}

declare class VDPrivateSelectorRec {
  constructor(init?: VDPrivateSelectorRec);
  reserved: number;
  data: unknown /* const array */;
}

declare class VDPowerStateRec {
  constructor(init?: VDPowerStateRec);
  powerState: number;
  powerFlags: number;
  powerReserved1: number;
  powerReserved2: number;
}

declare class VDDrawHardwareCursorRec {
  constructor(init?: VDDrawHardwareCursorRec);
  csCursorX: number;
  csCursorY: number;
  csCursorVisible: number;
  csReserved1: number;
  csReserved2: number;
}

declare class VDSetHardwareCursorRec {
  constructor(init?: VDSetHardwareCursorRec);
  csCursorRef: interop.Pointer;
  csReserved1: number;
  csReserved2: number;
}

declare class VDRetrieveGammaRec {
  constructor(init?: VDRetrieveGammaRec);
  csGammaTableID: number;
  csGammaTablePtr: interop.Pointer;
}

declare class VDGetGammaListRec {
  constructor(init?: VDGetGammaListRec);
  csPreviousGammaTableID: number;
  csGammaTableID: number;
  csGammaTableSize: number;
  csGammaTableName: string | null;
}

declare class VDSettings {
  constructor(init?: VDSettings);
  csParamCnt: number;
  csBrightMax: number;
  csBrightDef: number;
  csBrightVal: number;
  csCntrstMax: number;
  csCntrstDef: number;
  csCntrstVal: number;
  csTintMax: number;
  csTintDef: number;
  csTintVal: number;
  csHueMax: number;
  csHueDef: number;
  csHueVal: number;
  csHorizDef: number;
  csHorizVal: number;
  csHorizMax: number;
  csVertDef: number;
  csVertVal: number;
  csVertMax: number;
}

declare class VDMultiConnectInfoRec {
  constructor(init?: VDMultiConnectInfoRec);
  csDisplayCountOrNumber: number;
  csConnectInfo: VDDisplayConnectInfoRec;
}

declare class VDTimingInfoRec {
  constructor(init?: VDTimingInfoRec);
  csTimingMode: number;
  csTimingReserved: number;
  csTimingFormat: number;
  csTimingData: number;
  csTimingFlags: number;
}

declare class VDSwitchInfoRec {
  constructor(init?: VDSwitchInfoRec);
  csMode: number;
  csData: number;
  csPage: number;
  csBaseAddr: string | null;
  csReserved: number;
}

declare class unnamed_1948574872100089302 {
  constructor(init?: unnamed_1948574872100089302);
  csGTable: string | null;
}

declare class VDFlagRecord {
  constructor(init?: VDFlagRecord);
  csMode: number;
  filler: number;
}

declare class VDGrayRecord {
  constructor(init?: VDGrayRecord);
  csMode: number;
  filler: number;
}

declare class IOI2CBusTiming {
  constructor(init?: IOI2CBusTiming);
  bitTimeout: UnsignedWide;
  byteTimeout: UnsignedWide;
  acknowledgeTimeout: UnsignedWide;
  startTimeout: UnsignedWide;
  holdTime: UnsignedWide;
  riseFallTime: UnsignedWide;
  __reservedA: unknown /* const array */;
}

declare class IOI2CBuffer {
  constructor(init?: IOI2CBuffer);
}

declare class __IOHIDServiceClient {
  constructor(init?: __IOHIDServiceClient);
}

declare class __IOHIDEventSystemClient {
  constructor(init?: __IOHIDEventSystemClient);
}

declare class _NXEQElStruct {
  constructor(init?: _NXEQElStruct);
  next: number;
  sema: number;
  event: _NXEvent;
}

declare class IOHIDDeviceTransactionInterface {
  constructor(init?: IOHIDDeviceTransactionInterface);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  getAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  setDirection: (p1: interop.PointerConvertible, p2: interop.Enum<typeof IOHIDTransactionDirectionType>, p3: number) => number | null;
  getDirection: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  addElement: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => number | null;
  removeElement: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => number | null;
  containsElement: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number) => number | null;
  setValue: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number) => number | null;
  getValue: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number) => number | null;
  commit: (p1: interop.PointerConvertible, p2: number, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p4: interop.PointerConvertible, p5: number) => number | null;
  clear: (p1: interop.PointerConvertible, p2: number) => number | null;
}

declare class IOHIDDeviceQueueInterface {
  constructor(init?: IOHIDDeviceQueueInterface);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  getAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  setDepth: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  getDepth: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  addElement: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => number | null;
  removeElement: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => number | null;
  containsElement: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number) => number | null;
  start: (p1: interop.PointerConvertible, p2: number) => number | null;
  stop: (p1: interop.PointerConvertible, p2: number) => number | null;
  setValueAvailableCallback: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p3: interop.PointerConvertible) => number | null;
  copyNextValue: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => number | null;
}

declare class __IOHIDTransaction {
  constructor(init?: __IOHIDTransaction);
}

declare class IOHIDDeviceInterface121 {
  constructor(init?: IOHIDDeviceInterface121);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  createAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  getAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  createAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  getAsyncPort: (p1: interop.PointerConvertible) => number | null;
  open: (p1: interop.PointerConvertible, p2: number) => number | null;
  close: (p1: interop.PointerConvertible) => number | null;
  setRemovalCallback: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  getElementValue: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  setElementValue: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number) => void, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  queryElementValue: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number) => void, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  startAllQueues: (p1: interop.PointerConvertible) => number | null;
  stopAllQueues: (p1: interop.PointerConvertible) => number | null;
  allocQueue: (p1: interop.PointerConvertible) => interop.Pointer | null;
  allocOutputTransaction: (p1: interop.PointerConvertible) => interop.Pointer | null;
  setReport: (p1: interop.PointerConvertible, p2: interop.Enum<typeof IOHIDReportType>, p3: number, p4: interop.PointerConvertible, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number) => void, p8: interop.PointerConvertible, p9: interop.PointerConvertible) => number | null;
  getReport: (p1: interop.PointerConvertible, p2: interop.Enum<typeof IOHIDReportType>, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number) => void, p8: interop.PointerConvertible, p9: interop.PointerConvertible) => number | null;
}

declare class IOHIDDeviceInterface {
  constructor(init?: IOHIDDeviceInterface);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  createAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  getAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  createAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  getAsyncPort: (p1: interop.PointerConvertible) => number | null;
  open: (p1: interop.PointerConvertible, p2: number) => number | null;
  close: (p1: interop.PointerConvertible) => number | null;
  setRemovalCallback: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  getElementValue: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  setElementValue: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number) => void, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  queryElementValue: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number) => void, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  startAllQueues: (p1: interop.PointerConvertible) => number | null;
  stopAllQueues: (p1: interop.PointerConvertible) => number | null;
  allocQueue: (p1: interop.PointerConvertible) => interop.Pointer | null;
  allocOutputTransaction: (p1: interop.PointerConvertible) => interop.Pointer | null;
  setReport: (p1: interop.PointerConvertible, p2: interop.Enum<typeof IOHIDReportType>, p3: number, p4: interop.PointerConvertible, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number) => void, p8: interop.PointerConvertible, p9: interop.PointerConvertible) => number | null;
  getReport: (p1: interop.PointerConvertible, p2: interop.Enum<typeof IOHIDReportType>, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number) => void, p8: interop.PointerConvertible, p9: interop.PointerConvertible) => number | null;
}

declare class IOHIDQueueInterface {
  constructor(init?: IOHIDQueueInterface);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  createAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  getAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  createAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  getAsyncPort: (p1: interop.PointerConvertible) => number | null;
  create: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  dispose: (p1: interop.PointerConvertible) => number | null;
  addElement: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  removeElement: (p1: interop.PointerConvertible, p2: number) => number | null;
  hasElement: (p1: interop.PointerConvertible, p2: number) => number | null;
  start: (p1: interop.PointerConvertible) => number | null;
  stop: (p1: interop.PointerConvertible) => number | null;
  getNextEvent: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: UnsignedWide, p4: number) => number | null;
  setEventCallout: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  getEventCallout: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
}

declare class IOGraphicsEngineContext {
  constructor(init?: IOGraphicsEngineContext);
  contextLock: number;
  state: number;
  owner: interop.Pointer;
  version: number;
  structSize: number;
  reserved: unknown /* const array */;
}

declare class StdFBShmem_t {
  constructor(init?: StdFBShmem_t);
  cursorSema: number;
  frame: number;
  cursorShow: number;
  cursorObscured: number;
  shieldFlag: number;
  shielded: number;
  saveRect: IOGBounds;
  shieldRect: IOGBounds;
  cursorLoc: IOGPoint;
  cursorRect: IOGBounds;
  oldCursorRect: IOGBounds;
  screenBounds: IOGBounds;
  version: number;
  structSize: number;
  vblTime: UnsignedWide;
  vblDelta: UnsignedWide;
  vblCount: number;
  reservedC: unknown /* const array */;
  hardwareCursorFlags: unknown /* const array */;
  hardwareCursorCapable: number;
  hardwareCursorActive: number;
  hardwareCursorShields: number;
  reservedB: unknown /* const array */;
  cursorSize: unknown /* const array */;
  hotSpot: unknown /* const array */;
  cursor: unnamed_12847566531770991247;
}

declare class IOGraphicsAcceleratorInterfaceStruct {
  constructor(init?: IOGraphicsAcceleratorInterfaceStruct);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  Probe: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number | null;
  Start: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => number | null;
  Stop: (p1: interop.PointerConvertible) => number | null;
  Reset: (p1: interop.PointerConvertible, p2: number) => number | null;
  CopyCapabilities: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetBlitProc: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: interop.PointerConvertible) => number | null;
  Flush: (p1: interop.PointerConvertible, p2: number) => number | null;
  WaitForCompletion: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  Synchronize: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number, p6: number) => number | null;
  GetBeamPosition: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  AllocateSurface: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  FreeSurface: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  LockSurface: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  UnlockSurface: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  SwapSurface: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  SetDestination: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetBlitter: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: interop.PointerConvertible) => number | null;
  WaitComplete: (p1: interop.PointerConvertible, p2: number) => number | null;
  __gaInterfaceReserved: unknown /* const array */;
}

declare class IOBlitSurfaceStruct {
  constructor(init?: IOBlitSurfaceStruct);
  memory: unnamed_17923855300358106514;
  pixelFormat: number;
  size: IOBlitRectangleStruct;
  rowBytes: number;
  byteOffset: number;
  palette: interop.Pointer;
  accessFlags: number;
  interfaceRef: interop.Pointer;
  more: unknown /* const array */;
}

declare class IOBlitCursorStruct {
  constructor(init?: IOBlitCursorStruct);
  operation: IOBlitOperationStruct;
  rect: IOBlitRectangleStruct;
}

declare class IOBlitScanlinesStruct {
  constructor(init?: IOBlitScanlinesStruct);
  operation: IOBlitOperationStruct;
  count: number;
  y: number;
  height: number;
  x: unknown /* const array */;
}

declare class IOBlitVerticesStruct {
  constructor(init?: IOBlitVerticesStruct);
  operation: IOBlitOperationStruct;
  count: number;
  vertices: unknown /* const array */;
}

declare class IOBlitCopyRectangleStruct {
  constructor(init?: IOBlitCopyRectangleStruct);
  sourceX: number;
  sourceY: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

declare class IOBlitRectanglesStruct {
  constructor(init?: IOBlitRectanglesStruct);
  operation: IOBlitOperationStruct;
  count: number;
  rects: unknown /* const array */;
}

declare class IOBlitRectangleStruct {
  constructor(init?: IOBlitRectangleStruct);
  x: number;
  y: number;
  width: number;
  height: number;
}

declare class IOBlitOperationStruct {
  constructor(init?: IOBlitOperationStruct);
  color0: number;
  color1: number;
  offsetX: number;
  offsetY: number;
  sourceKeyColor: number;
  destKeyColor: number;
  specific: unknown /* const array */;
}

declare class IOAccelDeviceRegion {
  constructor(init?: IOAccelDeviceRegion);
  num_rects: number;
  bounds: IOAccelBounds;
  rect: unknown /* const array */;
}

declare class IOAccelSurfaceInformation {
  constructor(init?: IOAccelSurfaceInformation);
  address: unknown /* const array */;
  rowBytes: number;
  width: number;
  height: number;
  pixelFormat: number;
  flags: number;
  colorTemperature: unknown /* const array */;
  typeDependent: unknown /* const array */;
}

declare class IOAccelBounds {
  constructor(init?: IOAccelBounds);
  x: number;
  y: number;
  w: number;
  h: number;
}

declare class IOFireWireDCLCommandPoolInterface_t {
  constructor(init?: IOFireWireDCLCommandPoolInterface_t);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  revision: number;
  version: number;
  Allocate: (p1: interop.PointerConvertible, p2: number) => interop.Pointer | null;
  AllocateWithOpcode: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number) => number | null;
  AllocateTransferPacketDCL: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible, p5: number) => interop.Pointer | null;
  AllocateTransferBufferDCL: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible, p5: number, p6: number, p7: number) => interop.Pointer | null;
  AllocateSendPacketStartDCL: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number) => interop.Pointer | null;
  AllocateSendPacketWithHeaderStartDCL: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number) => interop.Pointer | null;
  AllocateSendBufferDCL: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: number, p6: number) => interop.Pointer | null;
  AllocateSendPacketDCL: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number) => interop.Pointer | null;
  AllocateReceivePacketStartDCL: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number) => interop.Pointer | null;
  AllocateReceivePacketDCL: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number) => interop.Pointer | null;
  AllocateReceiveBufferDCL: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: number, p6: number) => interop.Pointer | null;
  AllocateCallProcDCL: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible) => void, p4: interop.PointerConvertible) => interop.Pointer | null;
  AllocateLabelDCL: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer | null;
  AllocateJumpDCL: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => interop.Pointer | null;
  AllocateSetTagSyncBitsDCL: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => interop.Pointer | null;
  AllocateUpdateDCLListDCL: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number) => interop.Pointer | null;
  AllocatePtrTimeStampDCL: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => interop.Pointer | null;
  Free: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  GetSize: (p1: interop.PointerConvertible) => number | null;
  SetSize: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBytesRemaining: (p1: interop.PointerConvertible) => number | null;
}

declare class IOFireWireIsochChannelInterface_t {
  constructor(init?: IOFireWireIsochChannelInterface_t);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  revision: number;
  version: number;
  SetTalker: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  AddListener: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  AllocateChannel: (p1: interop.PointerConvertible) => number | null;
  ReleaseChannel: (p1: interop.PointerConvertible) => number | null;
  Start: (p1: interop.PointerConvertible) => number | null;
  Stop: (p1: interop.PointerConvertible) => number | null;
  SetChannelForceStopHandler: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: number) => void) => (p1: interop.PointerConvertible, p2: number) => void | null;
  SetRefCon: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  GetRefCon: (p1: interop.PointerConvertible) => interop.Pointer | null;
  NotificationIsOn: (p1: interop.PointerConvertible) => number | null;
  TurnOnNotification: (p1: interop.PointerConvertible) => number | null;
  TurnOffNotification: (p1: interop.PointerConvertible) => void | null;
  ClientCommandIsComplete: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => void | null;
}

declare class IOFireWireCompareSwapCommandInterface_v3_t {
  constructor(init?: IOFireWireCompareSwapCommandInterface_v3_t);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  GetStatus: (p1: interop.PointerConvertible) => number | null;
  GetTransferredBytes: (p1: interop.PointerConvertible) => number | null;
  GetTargetAddress: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  SetTarget: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  SetGeneration: (p1: interop.PointerConvertible, p2: number) => void | null;
  SetCallback: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: number) => void) => void | null;
  SetRefCon: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  IsExecuting: (p1: interop.PointerConvertible) => number | null;
  Submit: (p1: interop.PointerConvertible) => number | null;
  SubmitWithRefconAndCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number) => void) => number | null;
  Cancel: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetBuffer: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void | null;
  GetBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void | null;
  SetMaxPacket: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetFlags: (p1: interop.PointerConvertible, p2: number) => void | null;
  SetTimeoutDuration: (p1: interop.PointerConvertible, p2: number) => void | null;
  SetMaxRetryCount: (p1: interop.PointerConvertible, p2: number) => void | null;
  GetAckCode: (p1: interop.PointerConvertible) => number | null;
  GetResponseCode: (p1: interop.PointerConvertible) => number | null;
  SetMaxPacketSpeed: (p1: interop.PointerConvertible, p2: interop.Enum<typeof IOFWSpeed>) => void | null;
  GetRefCon: (p1: interop.PointerConvertible) => interop.Pointer | null;
  SetValues: (p1: interop.PointerConvertible, p2: number, p3: number) => void | null;
  SetValues64: (p1: interop.PointerConvertible, p2: number, p3: number) => void | null;
  DidLock: (p1: interop.PointerConvertible) => number | null;
  Locked: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  Locked64: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
}

declare class IOFireWireWriteCommandInterface_t {
  constructor(init?: IOFireWireWriteCommandInterface_t);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  GetStatus: (p1: interop.PointerConvertible) => number | null;
  GetTransferredBytes: (p1: interop.PointerConvertible) => number | null;
  GetTargetAddress: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  SetTarget: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  SetGeneration: (p1: interop.PointerConvertible, p2: number) => void | null;
  SetCallback: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: number) => void) => void | null;
  SetRefCon: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  IsExecuting: (p1: interop.PointerConvertible) => number | null;
  Submit: (p1: interop.PointerConvertible) => number | null;
  SubmitWithRefconAndCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number) => void) => number | null;
  Cancel: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetBuffer: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void | null;
  GetBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void | null;
  SetMaxPacket: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetFlags: (p1: interop.PointerConvertible, p2: number) => void | null;
  SetTimeoutDuration: (p1: interop.PointerConvertible, p2: number) => void | null;
  SetMaxRetryCount: (p1: interop.PointerConvertible, p2: number) => void | null;
  GetAckCode: (p1: interop.PointerConvertible) => number | null;
  GetResponseCode: (p1: interop.PointerConvertible) => number | null;
  SetMaxPacketSpeed: (p1: interop.PointerConvertible, p2: interop.Enum<typeof IOFWSpeed>) => void | null;
  GetRefCon: (p1: interop.PointerConvertible) => interop.Pointer | null;
}

declare class IOFireWireReadQuadletCommandInterface_t {
  constructor(init?: IOFireWireReadQuadletCommandInterface_t);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  GetStatus: (p1: interop.PointerConvertible) => number | null;
  GetTransferredBytes: (p1: interop.PointerConvertible) => number | null;
  GetTargetAddress: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  SetTarget: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  SetGeneration: (p1: interop.PointerConvertible, p2: number) => void | null;
  SetCallback: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: number) => void) => void | null;
  SetRefCon: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  IsExecuting: (p1: interop.PointerConvertible) => number | null;
  Submit: (p1: interop.PointerConvertible) => number | null;
  SubmitWithRefconAndCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number) => void) => number | null;
  Cancel: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetQuads: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => void | null;
}

declare class IOFireWireReadCommandInterface_t {
  constructor(init?: IOFireWireReadCommandInterface_t);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  GetStatus: (p1: interop.PointerConvertible) => number | null;
  GetTransferredBytes: (p1: interop.PointerConvertible) => number | null;
  GetTargetAddress: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  SetTarget: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  SetGeneration: (p1: interop.PointerConvertible, p2: number) => void | null;
  SetCallback: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: number) => void) => void | null;
  SetRefCon: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  IsExecuting: (p1: interop.PointerConvertible) => number | null;
  Submit: (p1: interop.PointerConvertible) => number | null;
  SubmitWithRefconAndCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number) => void) => number | null;
  Cancel: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetBuffer: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void | null;
  GetBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void | null;
  SetMaxPacket: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetFlags: (p1: interop.PointerConvertible, p2: number) => void | null;
  SetTimeoutDuration: (p1: interop.PointerConvertible, p2: number) => void | null;
  SetMaxRetryCount: (p1: interop.PointerConvertible, p2: number) => void | null;
  GetAckCode: (p1: interop.PointerConvertible) => number | null;
  GetResponseCode: (p1: interop.PointerConvertible) => number | null;
  SetMaxPacketSpeed: (p1: interop.PointerConvertible, p2: interop.Enum<typeof IOFWSpeed>) => void | null;
  GetRefCon: (p1: interop.PointerConvertible) => interop.Pointer | null;
}

declare class dk_bd_report_key_t {
  constructor(init?: dk_bd_report_key_t);
  format: number;
  keyClass: number;
  blockCount: number;
  reserved0024: unknown /* const array */;
  address: number;
  grantID: number;
  reserved0072: unknown /* const array */;
  bufferLength: number;
  buffer: interop.Pointer;
}

declare class IOFireWireCommandInterface_t {
  constructor(init?: IOFireWireCommandInterface_t);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  GetStatus: (p1: interop.PointerConvertible) => number | null;
  GetTransferredBytes: (p1: interop.PointerConvertible) => number | null;
  GetTargetAddress: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  SetTarget: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  SetGeneration: (p1: interop.PointerConvertible, p2: number) => void | null;
  SetCallback: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: number) => void) => void | null;
  SetRefCon: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  IsExecuting: (p1: interop.PointerConvertible) => number | null;
  Submit: (p1: interop.PointerConvertible) => number | null;
  SubmitWithRefconAndCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number) => void) => number | null;
  Cancel: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetBuffer: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void | null;
  GetBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void | null;
  SetMaxPacket: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetFlags: (p1: interop.PointerConvertible, p2: number) => void | null;
  SetTimeoutDuration: (p1: interop.PointerConvertible, p2: number) => void | null;
  SetMaxRetryCount: (p1: interop.PointerConvertible, p2: number) => void | null;
  GetAckCode: (p1: interop.PointerConvertible) => number | null;
  GetResponseCode: (p1: interop.PointerConvertible) => number | null;
  SetMaxPacketSpeed: (p1: interop.PointerConvertible, p2: interop.Enum<typeof IOFWSpeed>) => void | null;
  GetRefCon: (p1: interop.PointerConvertible) => interop.Pointer | null;
}

declare class IOFireWireConfigDirectoryInterface_t {
  constructor(init?: IOFireWireConfigDirectoryInterface_t);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  Update: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetKeyType: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetKeyValue_UInt32: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  GetKeyValue_Data: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  GetKeyValue_ConfigDirectory: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: CFUUIDBytes, p5: interop.PointerConvertible) => number | null;
  GetKeyOffset_FWAddress: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  GetIndexType: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetIndexKey: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetIndexValue_UInt32: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetIndexValue_Data: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetIndexValue_String: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetIndexValue_ConfigDirectory: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: CFUUIDBytes) => number | null;
  GetIndexOffset_FWAddress: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetIndexOffset_UInt32: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetIndexEntry: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetSubdirectories: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetKeySubdirectories: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetType: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetNumEntries: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
}

declare class IOFireWireLocalUnitDirectoryInterface_t {
  constructor(init?: IOFireWireLocalUnitDirectoryInterface_t);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  AddEntry_Ptr: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible) => number | null;
  AddEntry_UInt32: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible) => number | null;
  AddEntry_FWAddress: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  Publish: (p1: interop.PointerConvertible) => number | null;
  Unpublish: (p1: interop.PointerConvertible) => number | null;
}

declare class IOFireWirePhysicalAddressSpaceInterface_t {
  constructor(init?: IOFireWirePhysicalAddressSpaceInterface_t);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  GetPhysicalSegments: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void | null;
  GetPhysicalSegment: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetPhysicalAddress: (p1: interop.PointerConvertible) => number | null;
  GetFWAddress: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  GetBuffer: (p1: interop.PointerConvertible) => interop.Pointer | null;
  GetBufferSize: (p1: interop.PointerConvertible) => number | null;
}

declare class VDSupportsHardwareCursorRec {
  constructor(init?: VDSupportsHardwareCursorRec);
  csSupportsHardwareCursor: number;
  csReserved1: number;
  csReserved2: number;
}

declare class IOFireWireDeviceInterface_t {
  constructor(init?: IOFireWireDeviceInterface_t);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  InterfaceIsInited: (p1: interop.PointerConvertible) => number | null;
  GetDevice: (p1: interop.PointerConvertible) => number | null;
  Open: (p1: interop.PointerConvertible) => number | null;
  OpenWithSessionRef: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  Close: (p1: interop.PointerConvertible) => void | null;
  NotificationIsOn: (p1: interop.PointerConvertible) => number | null;
  AddCallbackDispatcherToRunLoop: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  RemoveCallbackDispatcherFromRunLoop: (p1: interop.PointerConvertible) => void | null;
  TurnOnNotification: (p1: interop.PointerConvertible) => number | null;
  TurnOffNotification: (p1: interop.PointerConvertible) => void | null;
  SetBusResetHandler: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  SetBusResetDoneHandler: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  ClientCommandIsComplete: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => void | null;
  Read: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: number, p7: number) => number | null;
  ReadQuadlet: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: number) => number | null;
  Write: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: number, p7: number) => number | null;
  WriteQuadlet: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number) => number | null;
  CompareSwap: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: number) => number | null;
  CreateReadCommand: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: (p1: interop.PointerConvertible, p2: number) => void, p7: number, p8: number, p9: interop.PointerConvertible, p10: CFUUIDBytes) => interop.Pointer | null;
  CreateReadQuadletCommand: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: (p1: interop.PointerConvertible, p2: number) => void, p7: number, p8: number, p9: interop.PointerConvertible, p10: CFUUIDBytes) => interop.Pointer | null;
  CreateWriteCommand: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: (p1: interop.PointerConvertible, p2: number) => void, p7: number, p8: number, p9: interop.PointerConvertible, p10: CFUUIDBytes) => interop.Pointer | null;
  CreateWriteQuadletCommand: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: (p1: interop.PointerConvertible, p2: number) => void, p7: number, p8: number, p9: interop.PointerConvertible, p10: CFUUIDBytes) => interop.Pointer | null;
  CreateCompareSwapCommand: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: (p1: interop.PointerConvertible, p2: number) => void, p7: number, p8: number, p9: interop.PointerConvertible, p10: CFUUIDBytes) => interop.Pointer | null;
  BusReset: (p1: interop.PointerConvertible) => number | null;
  GetCycleTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetGenerationAndNodeID: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetLocalNodeID: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetResetTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  CreateLocalUnitDirectory: (p1: interop.PointerConvertible, p2: CFUUIDBytes) => interop.Pointer | null;
  GetConfigDirectory: (p1: interop.PointerConvertible, p2: CFUUIDBytes) => interop.Pointer | null;
  CreateConfigDirectoryWithIOObject: (p1: interop.PointerConvertible, p2: number, p3: CFUUIDBytes) => interop.Pointer | null;
  CreatePseudoAddressSpace: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible, p6: number, p7: CFUUIDBytes) => interop.Pointer | null;
  CreatePhysicalAddressSpace: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: CFUUIDBytes) => interop.Pointer | null;
  FireBugMsg: (p1: interop.PointerConvertible, p2: string) => number | null;
  AddIsochCallbackDispatcherToRunLoop: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  CreateRemoteIsochPort: (p1: interop.PointerConvertible, p2: number, p3: CFUUIDBytes) => interop.Pointer | null;
  CreateLocalIsochPort: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: number, p9: interop.PointerConvertible, p10: number, p11: CFUUIDBytes) => interop.Pointer | null;
  CreateIsochChannel: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.Enum<typeof IOFWSpeed>, p5: CFUUIDBytes) => interop.Pointer | null;
  CreateDCLCommandPool: (p1: interop.PointerConvertible, p2: number, p3: CFUUIDBytes) => interop.Pointer | null;
  GetRefCon: (p1: interop.PointerConvertible) => interop.Pointer | null;
  SetRefCon: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  GetDebugProperty: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => interop.Pointer | null;
  PrintDCLProgram: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => void | null;
  CreateInitialUnitsPseudoAddressSpace: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: number, p6: interop.PointerConvertible, p7: number, p8: CFUUIDBytes) => interop.Pointer | null;
  AddCallbackDispatcherToRunLoopForMode: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  AddIsochCallbackDispatcherToRunLoopForMode: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  RemoveIsochCallbackDispatcherFromRunLoop: (p1: interop.PointerConvertible) => void | null;
  Seize: (p1: interop.PointerConvertible, p2: number) => number | null;
  FireLog: (p1: interop.PointerConvertible, p2: string) => number | null;
  GetBusCycleTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  CreateCompareSwapCommand64: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: (p1: interop.PointerConvertible, p2: number) => void, p7: number, p8: number, p9: interop.PointerConvertible, p10: CFUUIDBytes) => interop.Pointer | null;
  CompareSwap64: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: number, p8: number, p9: number) => number | null;
  GetBusGeneration: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetLocalNodeIDWithGeneration: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetRemoteNodeID: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetSpeedToNode: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetSpeedBetweenNodes: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: interop.PointerConvertible) => number | null;
  GetIRMNodeID: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ClipMaxRec2K: (p1: interop.PointerConvertible, p2: number) => number | null;
  CreateNuDCLPool: (p1: interop.PointerConvertible, p2: number, p3: CFUUIDBytes) => interop.Pointer | null;
  GetSessionRef: (p1: interop.PointerConvertible) => interop.Pointer | null;
  CreateLocalIsochPortWithOptions: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: number, p9: interop.PointerConvertible, p10: number, p11: interop.Enum<typeof IOFWIsochPortOptions>, p12: CFUUIDBytes) => interop.Pointer | null;
  CreateVectorCommand: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: number) => void, p3: interop.PointerConvertible, p4: CFUUIDBytes) => interop.Pointer | null;
  AllocateIRMBandwidthInGeneration: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  ReleaseIRMBandwidthInGeneration: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  AllocateIRMChannelInGeneration: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  ReleaseIRMChannelInGeneration: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  CreateIRMAllocation: (p1: interop.PointerConvertible, p2: number, p3: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, p4: interop.PointerConvertible, p5: CFUUIDBytes) => interop.Pointer | null;
  CreateAsyncStreamListener: (p1: interop.PointerConvertible, p2: number, p3: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number, p4: interop.PointerConvertible, p5: number, p6: CFUUIDBytes) => interop.Pointer | null;
  GetIsochAsyncPort: (p1: interop.PointerConvertible) => number | null;
  CreatePHYCommand: (p1: interop.PointerConvertible, p2: number, p3: number, p4: (p1: interop.PointerConvertible, p2: number) => void, p5: number, p6: number, p7: interop.PointerConvertible, p8: CFUUIDBytes) => interop.Pointer | null;
  CreatePHYPacketListener: (p1: interop.PointerConvertible, p2: number, p3: CFUUIDBytes) => interop.Pointer | null;
  CreateAsyncStreamCommand: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: interop.PointerConvertible, p6: number, p7: (p1: interop.PointerConvertible, p2: number) => void, p8: number, p9: number, p10: interop.PointerConvertible, p11: CFUUIDBytes) => interop.Pointer | null;
  GetCycleTimeAndUpTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
}

declare class IOFireWireAVCLibUnitInterface {
  constructor(init?: IOFireWireAVCLibUnitInterface);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  open: (p1: interop.PointerConvertible) => number | null;
  openWithSessionRef: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  getSessionRef: (p1: interop.PointerConvertible) => interop.Pointer | null;
  close: (p1: interop.PointerConvertible) => void | null;
  addCallbackDispatcherToRunLoop: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  removeCallbackDispatcherFromRunLoop: (p1: interop.PointerConvertible) => void | null;
  setMessageCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void) => void | null;
  AVCCommand: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number | null;
  AVCCommandInGeneration: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible) => number | null;
  getAncestorInterface: (p1: interop.PointerConvertible, p2: string, p3: CFUUIDBytes, p4: CFUUIDBytes) => interop.Pointer | null;
  getProtocolInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: CFUUIDBytes) => interop.Pointer | null;
  getAsyncConnectionPlugCounts: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  createConsumerPlug: (p1: interop.PointerConvertible, p2: number, p3: CFUUIDBytes) => interop.Pointer | null;
  updateAVCCommandTimeout: (p1: interop.PointerConvertible) => number | null;
  makeP2PInputConnection: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  breakP2PInputConnection: (p1: interop.PointerConvertible, p2: number) => number | null;
  makeP2POutputConnection: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.Enum<typeof IOFWSpeed>) => number | null;
  breakP2POutputConnection: (p1: interop.PointerConvertible, p2: number) => number | null;
  createAVCAsynchronousCommand: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, p5: interop.PointerConvertible, p6: interop.PointerConvertible) => number | null;
  AVCAsynchronousCommandSubmit: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  AVCAsynchronousCommandReinit: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  AVCAsynchronousCommandCancel: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  AVCAsynchronousCommandRelease: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  AVCAsynchronousCommandReinitWithCommandBytes: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number) => number | null;
}

declare class _IOFireWireAVCLibAsynchronousCommand {
  constructor(init?: _IOFireWireAVCLibAsynchronousCommand);
  cmdState: interop.Enum<typeof IOFWAVCAsyncCommandState>;
  pRefCon: interop.Pointer;
  pCommandBuf: interop.Pointer;
  cmdLen: number;
  pInterimResponseBuf: interop.Pointer;
  interimResponseLen: number;
  pFinalResponseBuf: interop.Pointer;
  finalResponseLen: number;
}

declare class IOFireWireSessionRefOpaqueStuct {
  constructor(init?: IOFireWireSessionRefOpaqueStuct);
}

declare class __NuDCL {
  constructor(init?: __NuDCL);
}

declare class UserExportDCLNuDCLLeader {
  constructor(init?: UserExportDCLNuDCLLeader);
  pClientDCLStruct: number;
  pNextDCLCommand: number;
  compilerData: number;
  opcode: number;
  program: number;
}

declare class UserExportDCLPtrTimeStampStruct {
  constructor(init?: UserExportDCLPtrTimeStampStruct);
  pClientDCLStruct: number;
  pNextDCLCommand: number;
  compilerData: number;
  opcode: number;
  timeStampPtr: number;
}

declare class UserExportDCLTimeStampStruct {
  constructor(init?: UserExportDCLTimeStampStruct);
  pClientDCLStruct: number;
  pNextDCLCommand: number;
  compilerData: number;
  opcode: number;
  timeStamp: number;
}

declare class UserExportDCLSetTagSyncBitsStruct {
  constructor(init?: UserExportDCLSetTagSyncBitsStruct);
  pClientDCLStruct: number;
  pNextDCLCommand: number;
  compilerData: number;
  opcode: number;
  tagBits: number;
  syncBits: number;
}

declare class UserExportDCLLabelStruct {
  constructor(init?: UserExportDCLLabelStruct);
  pClientDCLStruct: number;
  pNextDCLCommand: number;
  compilerData: number;
  opcode: number;
}

declare class UserExportDCLTransferBufferStruct {
  constructor(init?: UserExportDCLTransferBufferStruct);
  pClientDCLStruct: number;
  pNextDCLCommand: number;
  compilerData: number;
  opcode: number;
  buffer: number;
  size: number;
  packetSize: number;
  reserved: number;
  bufferOffset: number;
}

declare class UserExportDCLTransferPacketStruct {
  constructor(init?: UserExportDCLTransferPacketStruct);
  pClientDCLStruct: number;
  pNextDCLCommand: number;
  compilerData: number;
  opcode: number;
  buffer: number;
  size: number;
}

declare class DCLPtrTimeStampStruct {
  constructor(init?: DCLPtrTimeStampStruct);
  pNextDCLCommand: interop.Pointer;
  compilerData: number;
  opcode: number;
  timeStampPtr: interop.Pointer;
}

declare class DCLUpdateDCLListStruct {
  constructor(init?: DCLUpdateDCLListStruct);
  pNextDCLCommand: interop.Pointer;
  compilerData: number;
  opcode: number;
  dclCommandList: interop.Pointer;
  numDCLCommands: number;
}

declare class DCLSetTagSyncBitsStruct {
  constructor(init?: DCLSetTagSyncBitsStruct);
  pNextDCLCommand: interop.Pointer;
  compilerData: number;
  opcode: number;
  tagBits: number;
  syncBits: number;
}

declare class DCLLabelStruct {
  constructor(init?: DCLLabelStruct);
  pNextDCLCommand: interop.Pointer;
  compilerData: number;
  opcode: number;
}

declare class DCLTransferBufferStruct {
  constructor(init?: DCLTransferBufferStruct);
  pNextDCLCommand: interop.Pointer;
  compilerData: number;
  opcode: number;
  buffer: interop.Pointer;
  size: number;
  packetSize: number;
  reserved: number;
  bufferOffset: number;
}

declare class DCLTransferPacketStruct {
  constructor(init?: DCLTransferPacketStruct);
  pNextDCLCommand: interop.Pointer;
  compilerData: number;
  opcode: number;
  buffer: interop.Pointer;
  size: number;
}

declare class DCLCommandStruct {
  constructor(init?: DCLCommandStruct);
  pNextDCLCommand: interop.Pointer;
  compilerData: number;
  opcode: number;
  operands: unknown /* const array */;
}

declare class _IOAudioSampleRate {
  constructor(init?: _IOAudioSampleRate);
  whole: number;
  fraction: number;
}

declare class _IOAudioSMPTETime {
  constructor(init?: _IOAudioSMPTETime);
  fSubframes: number;
  fSubframeDivisor: number;
  fCounter: number;
  fType: number;
  fFlags: number;
  fHours: number;
  fMinutes: number;
  fSeconds: number;
  fFrames: number;
}

declare class _IOAudioStreamFormatExtension {
  constructor(init?: _IOAudioStreamFormatExtension);
  fVersion: number;
  fFlags: number;
  fFramesPerPacket: number;
  fBytesPerPacket: number;
}

declare class _IOAudioStreamFormat {
  constructor(init?: _IOAudioStreamFormat);
  fNumChannels: number;
  fSampleFormat: number;
  fNumericRepresentation: number;
  fBitDepth: number;
  fBitWidth: number;
  fAlignment: number;
  fByteOrder: number;
  fIsMixable: number;
  fDriverTag: number;
}

declare class _IOAudioEngineStatus {
  constructor(init?: _IOAudioEngineStatus);
  fVersion: number;
  fCurrentLoopCount: number;
  fLastLoopTime: volatile struct UnsignedWide;
  fEraseHeadSampleFrame: number;
}

declare class OSClassDescription {
  constructor(init?: OSClassDescription);
  descriptionSize: number;
  name: unknown /* const array */;
  superName: unknown /* const array */;
  methodOptionsSize: number;
  methodOptionsOffset: number;
  metaMethodOptionsSize: number;
  metaMethodOptionsOffset: number;
  queueNamesSize: number;
  queueNamesOffset: number;
  methodNamesSize: number;
  methodNamesOffset: number;
  metaMethodNamesSize: number;
  metaMethodNamesOffset: number;
  flags: number;
  resv1: unknown /* const array */;
  methodOptions: unknown /* const array */;
  metaMethodOptions: unknown /* const array */;
  dispatchNames: unknown /* const array */;
  methodNames: unknown /* const array */;
  metaMethodNames: unknown /* const array */;
}

declare class IORPC {
  constructor(init?: IORPC);
  message: interop.Pointer;
  reply: interop.Pointer;
  sendSize: number;
  replySize: number;
}

declare class IORPCMessageErrorReturnContent {
  constructor(init?: IORPCMessageErrorReturnContent);
  hdr: IORPCMessage;
  result: number;
  pad: number;
}

declare class IORPCMessageMach {
  constructor(init?: IORPCMessageMach);
  msgh: mach_msg_header_t;
  msgh_body: mach_msg_body_t;
  objects: unknown /* const array */;
}

declare class IOCFPlugInInterfaceStruct {
  constructor(init?: IOCFPlugInInterfaceStruct);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  Probe: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number | null;
  Start: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => number | null;
  Stop: (p1: interop.PointerConvertible) => number | null;
}

declare class SCSI_Capacity_Data_Long {
  constructor(init?: SCSI_Capacity_Data_Long);
  RETURNED_LOGICAL_BLOCK_ADDRESS: number;
  BLOCK_LENGTH_IN_BYTES: number;
  RTO_EN_PROT_EN: number;
  Reserved: unknown /* const array */;
}

declare class IOBlitCopyRegionStruct {
  constructor(init?: IOBlitCopyRegionStruct);
  operation: IOBlitOperationStruct;
  deltaX: number;
  deltaY: number;
  region: interop.Pointer;
}

declare class IOFireWireCompareSwapCommandInterface_t {
  constructor(init?: IOFireWireCompareSwapCommandInterface_t);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  GetStatus: (p1: interop.PointerConvertible) => number | null;
  GetTransferredBytes: (p1: interop.PointerConvertible) => number | null;
  GetTargetAddress: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  SetTarget: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  SetGeneration: (p1: interop.PointerConvertible, p2: number) => void | null;
  SetCallback: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: number) => void) => void | null;
  SetRefCon: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  IsExecuting: (p1: interop.PointerConvertible) => number | null;
  Submit: (p1: interop.PointerConvertible) => number | null;
  SubmitWithRefconAndCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number) => void) => number | null;
  Cancel: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetValues: (p1: interop.PointerConvertible, p2: number, p3: number) => void | null;
  SetValues64: (p1: interop.PointerConvertible, p2: number, p3: number) => void | null;
  DidLock: (p1: interop.PointerConvertible) => number | null;
  Locked: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  Locked64: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetFlags: (p1: interop.PointerConvertible, p2: number) => void | null;
}

declare class IOFireWireLibVectorCommandInterface_t {
  constructor(init?: IOFireWireLibVectorCommandInterface_t);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  Submit: (p1: interop.PointerConvertible) => number | null;
  SubmitWithRefconAndCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number) => void) => number | null;
  IsExecuting: (p1: interop.PointerConvertible) => number | null;
  SetCallback: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: number) => void) => void | null;
  SetRefCon: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  GetRefCon: (p1: interop.PointerConvertible) => interop.Pointer | null;
  SetFlags: (p1: interop.PointerConvertible, p2: number) => void | null;
  GetFlags: (p1: interop.PointerConvertible) => number | null;
  EnsureCapacity: (p1: interop.PointerConvertible, p2: number) => number | null;
  AddCommand: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  RemoveCommand: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  InsertCommandAtIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => void | null;
  GetCommandAtIndex: (p1: interop.PointerConvertible, p2: number) => interop.Pointer | null;
  GetIndexOfCommand: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  RemoveCommandAtIndex: (p1: interop.PointerConvertible, p2: number) => void | null;
  RemoveAllCommands: (p1: interop.PointerConvertible) => void | null;
  GetCommandCount: (p1: interop.PointerConvertible) => number | null;
}

declare class _IODataQueueMemory {
  constructor(init?: _IODataQueueMemory);
  queueSize: number;
  head: number;
  tail: number;
  queue: unknown /* const array */;
}

declare class _IODataQueueEntry {
  constructor(init?: _IODataQueueEntry);
  size: number;
  data: unknown /* const array */;
}

declare class VDCommunicationInfoRec {
  constructor(init?: VDCommunicationInfoRec);
  csBusID: number;
  csBusType: number;
  csMinBus: number;
  csMaxBus: number;
  csSupportedTypes: number;
  csSupportedCommFlags: number;
  csReserved2: number;
  csReserved3: number;
  csReserved4: number;
  csReserved5: number;
  csReserved6: number;
  csReserved7: number;
}

declare class SCSICmd_INQUIRY_Page83_LogicalUnitGroup_Identifier {
  constructor(init?: SCSICmd_INQUIRY_Page83_LogicalUnitGroup_Identifier);
  RESERVED: number;
  LOGICAL_UNIT_GROUP: number;
}

declare class CDTEXTDescriptor {
  constructor(init?: CDTEXTDescriptor);
  packType: number;
  trackNumber: number;
  sequenceNumber: number;
  characterPosition: number;
  blockNumber: number;
  doubleByteCharacterCode: number;
  textData: unknown /* const array */;
  reserved: unknown /* const array */;
}

declare class IORPCMessageErrorReturn {
  constructor(init?: IORPCMessageErrorReturn);
  mach: IORPCMessageMach;
  content: IORPCMessageErrorReturnContent;
}

declare class IOUSBInterfaceStruct190 {
  constructor(init?: IOUSBInterfaceStruct190);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  CreateInterfaceAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  CreateInterfaceAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncPort: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceOpen: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceClose: (p1: interop.PointerConvertible) => number | null;
  GetInterfaceClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceSubClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceProtocol: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceVendor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProduct: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceReleaseNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetConfigurationValue: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetAlternateSetting: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetNumEndpoints: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetLocationID: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDevice: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetAlternateInterface: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ControlRequest: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  GetPipeProperties: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  GetPipeStatus: (p1: interop.PointerConvertible, p2: number) => number | null;
  AbortPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ResetPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ClearPipeStall: (p1: interop.PointerConvertible, p2: number) => number | null;
  ReadPipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  WritePipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number) => number | null;
  ReadPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  WritePipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  ReadIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WriteIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  ControlRequestTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  ReadPipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: number) => number | null;
  WritePipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number) => number | null;
  ReadPipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WritePipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  USBInterfaceGetStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBInterfaceOpenSeize: (p1: interop.PointerConvertible) => number | null;
  ClearPipeStallBothEnds: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetPipePolicy: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number) => number | null;
  GetBandwidthAvailable: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetEndpointProperties: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
}

declare class DCLNuDCLLeader {
  constructor(init?: DCLNuDCLLeader);
  pNextDCLCommand: interop.Pointer;
  compilerData: number;
  opcode: number;
  program: interop.Pointer;
}

declare class IOUSBInterfaceStruct942 {
  constructor(init?: IOUSBInterfaceStruct942);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  CreateInterfaceAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  CreateInterfaceAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncPort: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceOpen: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceClose: (p1: interop.PointerConvertible) => number | null;
  GetInterfaceClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceSubClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceProtocol: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceVendor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProduct: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceReleaseNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetConfigurationValue: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetAlternateSetting: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetNumEndpoints: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetLocationID: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDevice: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetAlternateInterface: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ControlRequest: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  GetPipeProperties: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  GetPipeStatus: (p1: interop.PointerConvertible, p2: number) => number | null;
  AbortPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ResetPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ClearPipeStall: (p1: interop.PointerConvertible, p2: number) => number | null;
  ReadPipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  WritePipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number) => number | null;
  ReadPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  WritePipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  ReadIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WriteIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  ControlRequestTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  ReadPipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: number) => number | null;
  WritePipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number) => number | null;
  ReadPipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WritePipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  USBInterfaceGetStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBInterfaceOpenSeize: (p1: interop.PointerConvertible) => number | null;
  ClearPipeStallBothEnds: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetPipePolicy: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number) => number | null;
  GetBandwidthAvailable: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetEndpointProperties: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  LowLatencyReadIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  LowLatencyWriteIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  LowLatencyCreateBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => number | null;
  LowLatencyDestroyBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetBusMicroFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetFrameListTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetIOUSBLibVersion: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  FindNextAssociatedDescriptor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => interop.Pointer | null;
  FindNextAltInterface: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => interop.Pointer | null;
  GetBusFrameNumberWithTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetPipePropertiesV2: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible, p8: interop.PointerConvertible, p9: interop.PointerConvertible, p10: interop.PointerConvertible) => number | null;
  GetPipePropertiesV3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetEndpointPropertiesV3: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SupportsStreams: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  CreateStreams: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  GetConfiguredStreams: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ReadStreamsPipeTO: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: number, p7: number) => number | null;
  WriteStreamsPipeTO: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: number, p6: number, p7: number) => number | null;
  ReadStreamsPipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: number, p6: number, p7: number, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  WriteStreamsPipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: number, p6: number, p7: number, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  AbortStreamsPipe: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  RegisterForNotification: (p1: interop.PointerConvertible, p2: number, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number | null;
  UnregisterNotification: (p1: interop.PointerConvertible, p2: number) => number | null;
  AcknowledgeNotification: (p1: interop.PointerConvertible, p2: number) => number | null;
  RegisterDriver: (p1: interop.PointerConvertible) => number | null;
  SetDeviceIdlePolicy: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetPipeIdlePolicy: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  GetInterfaceAsyncNotificationPort: (p1: interop.PointerConvertible) => interop.Pointer | null;
}

declare class IOHIDDeviceInterface122 {
  constructor(init?: IOHIDDeviceInterface122);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  createAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  getAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  createAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  getAsyncPort: (p1: interop.PointerConvertible) => number | null;
  open: (p1: interop.PointerConvertible, p2: number) => number | null;
  close: (p1: interop.PointerConvertible) => number | null;
  setRemovalCallback: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  getElementValue: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  setElementValue: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number) => void, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  queryElementValue: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number) => void, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  startAllQueues: (p1: interop.PointerConvertible) => number | null;
  stopAllQueues: (p1: interop.PointerConvertible) => number | null;
  allocQueue: (p1: interop.PointerConvertible) => interop.Pointer | null;
  allocOutputTransaction: (p1: interop.PointerConvertible) => interop.Pointer | null;
  setReport: (p1: interop.PointerConvertible, p2: interop.Enum<typeof IOHIDReportType>, p3: number, p4: interop.PointerConvertible, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number) => void, p8: interop.PointerConvertible, p9: interop.PointerConvertible) => number | null;
  getReport: (p1: interop.PointerConvertible, p2: interop.Enum<typeof IOHIDReportType>, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number) => void, p8: interop.PointerConvertible, p9: interop.PointerConvertible) => number | null;
  copyMatchingElements: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  setInterruptReportHandlerCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number) => void, p5: interop.PointerConvertible, p6: interop.PointerConvertible) => number | null;
}

declare class BDTrackInfo {
  constructor(init?: BDTrackInfo);
  dataLength: number;
  trackNumberLSB: number;
  sessionNumberLSB: number;
  reserved: number;
  reserved2: number;
  damage: number;
  reserved3: number;
  reserved4: number;
  blank: number;
  reservedTrack: number;
  nextWritableAddressValid: number;
  lastRecordedAddressValid: number;
  reserved5: number;
  trackStartAddress: number;
  nextWritableAddress: number;
  freeBlocks: number;
  clusterSize: number;
  trackSize: number;
  lastRecordedAddress: number;
  trackNumberMSB: number;
  sessionNumberMSB: number;
  reserved6: number;
  reserved7: number;
}

declare class _evGlobals {
  constructor(init?: _evGlobals);
  cursorSema: number;
  eNum: number;
  buttons: number;
  eventFlags: number;
  VertRetraceClock: number;
  cursorLoc: IOGPoint;
  frame: number;
  workBounds: IOGBounds;
  mouseRect: IOGBounds;
  version: number;
  structSize: number;
  lastFrame: number;
  screenCursorFixed: __IOFixedPoint32;
  desktopCursorFixed: __IOFixedPoint32;
  reservedA: unknown /* const array */;
  reserved: number;
  updateCursorPositionFromFixed: number;
  logCursorUpdates: number;
  wantPressure: number;
  wantPrecision: number;
  dontWantCoalesce: number;
  dontCoalesce: number;
  mouseRectValid: number;
  movedMask: number;
  waitCursorSema: number;
  AALastEventSent: number;
  AALastEventConsumed: number;
  waitCursorUp: number;
  ctxtTimedOut: number;
  waitCursorEnabled: number;
  globalWaitCursorEnabled: number;
  waitThreshold: number;
  LLEHead: number;
  LLETail: number;
  LLELast: number;
  lleq: unknown /* const array */;
}

declare class IOHIDDeviceDeviceInterface {
  constructor(init?: IOHIDDeviceDeviceInterface);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  open: (p1: interop.PointerConvertible, p2: number) => number | null;
  close: (p1: interop.PointerConvertible, p2: number) => number | null;
  getProperty: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  setProperty: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  getAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  copyMatchingElements: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number) => number | null;
  setValue: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void, p6: interop.PointerConvertible, p7: number) => number | null;
  getValue: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void, p6: interop.PointerConvertible, p7: number) => number | null;
  setInputReportCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.Enum<typeof IOHIDReportType>, p5: number, p6: interop.PointerConvertible, p7: number) => void, p5: interop.PointerConvertible, p6: number) => number | null;
  setReport: (p1: interop.PointerConvertible, p2: interop.Enum<typeof IOHIDReportType>, p3: number, p4: interop.PointerConvertible, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.Enum<typeof IOHIDReportType>, p5: number, p6: interop.PointerConvertible, p7: number) => void, p8: interop.PointerConvertible, p9: number) => number | null;
  getReport: (p1: interop.PointerConvertible, p2: interop.Enum<typeof IOHIDReportType>, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.Enum<typeof IOHIDReportType>, p5: number, p6: interop.PointerConvertible, p7: number) => void, p8: interop.PointerConvertible, p9: number) => number | null;
}

declare class IOUSBInterfaceStruct400 {
  constructor(init?: IOUSBInterfaceStruct400);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  CreateInterfaceAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  CreateInterfaceAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncPort: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceOpen: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceClose: (p1: interop.PointerConvertible) => number | null;
  GetInterfaceClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceSubClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceProtocol: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceVendor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProduct: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceReleaseNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetConfigurationValue: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetAlternateSetting: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetNumEndpoints: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetLocationID: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDevice: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetAlternateInterface: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ControlRequest: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  GetPipeProperties: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  GetPipeStatus: (p1: interop.PointerConvertible, p2: number) => number | null;
  AbortPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ResetPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ClearPipeStall: (p1: interop.PointerConvertible, p2: number) => number | null;
  ReadPipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  WritePipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number) => number | null;
  ReadPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  WritePipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  ReadIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WriteIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  ControlRequestTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  ReadPipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: number) => number | null;
  WritePipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number) => number | null;
  ReadPipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WritePipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  USBInterfaceGetStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBInterfaceOpenSeize: (p1: interop.PointerConvertible) => number | null;
  ClearPipeStallBothEnds: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetPipePolicy: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number) => number | null;
  GetBandwidthAvailable: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetEndpointProperties: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  LowLatencyReadIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  LowLatencyWriteIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  LowLatencyCreateBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => number | null;
  LowLatencyDestroyBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetBusMicroFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetFrameListTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetIOUSBLibVersion: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  FindNextAssociatedDescriptor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => interop.Pointer | null;
  FindNextAltInterface: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => interop.Pointer | null;
  GetBusFrameNumberWithTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
}

declare class IOUSBBulkPipeReq {
  constructor(init?: IOUSBBulkPipeReq);
  pipeRef: number;
  buf: interop.Pointer;
  size: number;
  noDataTimeout: number;
  completionTimeout: number;
}

declare class _evOffsets {
  constructor(init?: _evOffsets);
  evGlobalsOffset: number;
  evShmemOffset: number;
}

declare class VDPrivateSelectorDataRec {
  constructor(init?: VDPrivateSelectorDataRec);
  privateParameters: interop.Pointer;
  privateParametersSize: number;
  privateResults: interop.Pointer;
  privateResultsSize: number;
}

declare class IOUSBGetFrameStruct {
  constructor(init?: IOUSBGetFrameStruct);
  frame: number;
  timeStamp: UnsignedWide;
}

declare class __IOHIDValue {
  constructor(init?: __IOHIDValue);
}

declare class __IOHIDManager {
  constructor(init?: __IOHIDManager);
}

declare class IODetailedTimingInformationV1 {
  constructor(init?: IODetailedTimingInformationV1);
  pixelClock: number;
  horizontalActive: number;
  horizontalBlanking: number;
  horizontalBorder: number;
  horizontalSyncOffset: number;
  horizontalSyncWidth: number;
  verticalActive: number;
  verticalBlanking: number;
  verticalBorder: number;
  verticalSyncOffset: number;
  verticalSyncWidth: number;
}

declare class IOFireWireSBP2LibLUNInterface {
  constructor(init?: IOFireWireSBP2LibLUNInterface);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  open: (p1: interop.PointerConvertible) => number | null;
  openWithSessionRef: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  getSessionRef: (p1: interop.PointerConvertible) => interop.Pointer | null;
  close: (p1: interop.PointerConvertible) => void | null;
  addCallbackDispatcherToRunLoop: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  removeCallbackDispatcherFromRunLoop: (p1: interop.PointerConvertible) => void | null;
  setMessageCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void) => void | null;
  setRefCon: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  getRefCon: (p1: interop.PointerConvertible) => interop.Pointer | null;
  createLogin: (p1: interop.PointerConvertible, p2: CFUUIDBytes) => interop.Pointer | null;
  createMgmtORB: (p1: interop.PointerConvertible, p2: CFUUIDBytes) => interop.Pointer | null;
}

declare class IOFramebufferInformation {
  constructor(init?: IOFramebufferInformation);
  baseAddress: number;
  activeWidth: number;
  activeHeight: number;
  bytesPerRow: number;
  bytesPerPlane: number;
  bitsPerPixel: number;
  pixelType: number;
  flags: number;
  reserved: unknown /* const array */;
}

declare class IOFireWirePseudoAddressSpaceInterface_t {
  constructor(init?: IOFireWirePseudoAddressSpaceInterface_t);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  SetWriteHandler: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible, p5: number, p6: number, p7: number, p8: interop.PointerConvertible) => number) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible, p5: number, p6: number, p7: number, p8: interop.PointerConvertible) => number | null;
  SetReadHandler: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: number, p6: number, p7: number, p8: interop.PointerConvertible) => number) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: number, p6: number, p7: number, p8: interop.PointerConvertible) => number | null;
  SetSkippedPacketHandler: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => void) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => void | null;
  NotificationIsOn: (p1: interop.PointerConvertible) => number | null;
  TurnOnNotification: (p1: interop.PointerConvertible) => number | null;
  TurnOffNotification: (p1: interop.PointerConvertible) => void | null;
  ClientCommandIsComplete: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => void | null;
  GetFWAddress: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  GetBuffer: (p1: interop.PointerConvertible) => interop.Pointer | null;
  GetBufferSize: (p1: interop.PointerConvertible) => number | null;
  GetRefCon: (p1: interop.PointerConvertible) => interop.Pointer | null;
}

declare class SCSICmd_INQUIRY_Page80_Header_SPC_16 {
  constructor(init?: SCSICmd_INQUIRY_Page80_Header_SPC_16);
  PERIPHERAL_DEVICE_TYPE: number;
  PAGE_CODE: number;
  PAGE_LENGTH: number;
  PRODUCT_SERIAL_NUMBER: number;
}

declare class __IOHIDElement {
  constructor(init?: __IOHIDElement);
}

declare class bm34Cursor {
  constructor(init?: bm34Cursor);
  image: unknown /* const array */;
  save: unknown /* const array */;
}

declare class FWAddressStruct {
  constructor(init?: FWAddressStruct);
  nodeID: number;
  addressHi: number;
  addressLo: number;
}

declare class IOFireWireSBP2LibLoginInterface {
  constructor(init?: IOFireWireSBP2LibLoginInterface);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  submitLogin: (p1: interop.PointerConvertible) => number | null;
  submitLogout: (p1: interop.PointerConvertible) => number | null;
  setLoginFlags: (p1: interop.PointerConvertible, p2: number) => void | null;
  setLoginCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void) => void | null;
  setLogoutCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void) => void | null;
  setRefCon: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  getRefCon: (p1: interop.PointerConvertible) => interop.Pointer | null;
  getMaxCommandBlockSize: (p1: interop.PointerConvertible) => number | null;
  getLoginID: (p1: interop.PointerConvertible) => number | null;
  setMaxPayloadSize: (p1: interop.PointerConvertible, p2: number) => void | null;
  setReconnectTime: (p1: interop.PointerConvertible, p2: number) => void | null;
  createORB: (p1: interop.PointerConvertible, p2: CFUUIDBytes) => interop.Pointer | null;
  submitORB: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  setUnsolicitedStatusNotify: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void) => void | null;
  setStatusNotify: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void) => void | null;
  setFetchAgentResetCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number) => void) => void | null;
  submitFetchAgentReset: (p1: interop.PointerConvertible) => number | null;
  setFetchAgentWriteCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void) => void | null;
  ringDoorbell: (p1: interop.PointerConvertible) => number | null;
  enableUnsolicitedStatus: (p1: interop.PointerConvertible) => number | null;
  setBusyTimeoutRegisterValue: (p1: interop.PointerConvertible, p2: number) => number | null;
  setPassword: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => number | null;
}

declare class ModeParameterBlockDescriptor {
  constructor(init?: ModeParameterBlockDescriptor);
  DENSITY_CODE: number;
  NUMBER_OF_BLOCKS: unknown /* const array */;
  RESERVED: number;
  BLOCK_LENGTH: unknown /* const array */;
}

declare class IOUSBDeviceCapabilityBillboardAltConfig {
  constructor(init?: IOUSBDeviceCapabilityBillboardAltConfig);
  wSVID: number;
  bAltenateMode: number;
  iAlternateModeString: number;
}

declare class UASPipeDescriptor {
  constructor(init?: UASPipeDescriptor);
  bLength: number;
  bDescriptorType: number;
  bPipeID: number;
  bReserved: number;
}

declare class IOFireWireSBP2LibORBInterface {
  constructor(init?: IOFireWireSBP2LibORBInterface);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  setRefCon: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  getRefCon: (p1: interop.PointerConvertible) => interop.Pointer | null;
  setCommandFlags: (p1: interop.PointerConvertible, p2: number) => void | null;
  setMaxORBPayloadSize: (p1: interop.PointerConvertible, p2: number) => void | null;
  setCommandTimeout: (p1: interop.PointerConvertible, p2: number) => void | null;
  setCommandGeneration: (p1: interop.PointerConvertible, p2: number) => void | null;
  setCommandBuffersAsRanges: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: number, p6: number) => number | null;
  releaseCommandBuffers: (p1: interop.PointerConvertible) => number | null;
  setCommandBlock: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => number | null;
  LSIWorkaroundSetCommandBuffersAsRanges: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: number, p6: number) => number | null;
  LSIWorkaroundSyncBuffersForOutput: (p1: interop.PointerConvertible) => number | null;
  LSIWorkaroundSyncBuffersForInput: (p1: interop.PointerConvertible) => number | null;
}

declare class SCSICmd_INQUIRY_Page80_Header {
  constructor(init?: SCSICmd_INQUIRY_Page80_Header);
  PERIPHERAL_DEVICE_TYPE: number;
  PAGE_CODE: number;
  RESERVED: number;
  PAGE_LENGTH: number;
  PRODUCT_SERIAL_NUMBER: number;
}

declare class IOUSBDeviceCapabilityDescriptorHeader {
  constructor(init?: IOUSBDeviceCapabilityDescriptorHeader);
  bLength: number;
  bDescriptorType: number;
  bDevCapabilityType: number;
}

declare class IOUSB30HubPortStatusExt {
  constructor(init?: IOUSB30HubPortStatusExt);
  wPortStatus: number;
  wPortChange: number;
  dwExtPortStatus: number;
}

declare class unnamed_5759232563165710455 {
  constructor(init?: unnamed_5759232563165710455);
  reserved: number;
  subType: number;
  misc: unnamed_11666218996679898393;
}

declare class unnamed_7971714628260465398 {
  constructor(init?: unnamed_7971714628260465398);
  vendorID: number;
  tabletID: number;
  pointerID: number;
  deviceID: number;
  systemTabletID: number;
  vendorPointerType: number;
  pointerSerialNumber: number;
  uniqueID: number;
  capabilityMask: number;
  pointerType: number;
  enterProximity: number;
  reserved1: number;
  reserved2: unknown /* const array */;
}

declare class unnamed_2435892573090321970 {
  constructor(init?: unnamed_2435892573090321970);
  x: number;
  y: number;
}

declare class unnamed_4619205928367467519 {
  constructor(init?: unnamed_4619205928367467519);
  deltaAxis1: number;
  deltaAxis2: number;
  deltaAxis3: number;
  reserved1: number;
  fixedDeltaAxis1: number;
  fixedDeltaAxis2: number;
  fixedDeltaAxis3: number;
  pointDeltaAxis1: number;
  pointDeltaAxis2: number;
  pointDeltaAxis3: number;
  reserved8: unknown /* const array */;
}

declare class unnamed_9873895420725477293 {
  constructor(init?: unnamed_9873895420725477293);
  reserved: number;
  eventNum: number;
  trackingNum: number;
  userData: number;
  reserved1: number;
  reserved2: number;
  reserved3: number;
  reserved4: number;
  reserved5: number;
  reserved6: unknown /* const array */;
}

declare class unnamed_5100795372900712712 {
  constructor(init?: unnamed_5100795372900712712);
  origCharSet: number;
  repeat: number;
  charSet: number;
  charCode: number;
  keyCode: number;
  origCharCode: number;
  reserved1: number;
  keyboardType: number;
  reserved2: number;
  reserved3: number;
  reserved4: number;
  reserved5: unknown /* const array */;
}

declare class unnamed_13441805532002983772 {
  constructor(init?: unnamed_13441805532002983772);
  subx: number;
  suby: number;
  eventNum: number;
  click: number;
  pressure: number;
  buttonNumber: number;
  subType: number;
  reserved2: number;
  reserved3: number;
  tablet: unnamed_15250897639706774685;
}

declare class _NXTabletProximityData {
  constructor(init?: _NXTabletProximityData);
  vendorID: number;
  tabletID: number;
  pointerID: number;
  deviceID: number;
  systemTabletID: number;
  vendorPointerType: number;
  pointerSerialNumber: number;
  uniqueID: number;
  capabilityMask: number;
  pointerType: number;
  enterProximity: number;
  reserved1: number;
}

declare class unnamed_9468096681639338463 {
  constructor(init?: unnamed_9468096681639338463);
  x: number;
  y: number;
}

declare class _NXPoint {
  constructor(init?: _NXPoint);
  x: number;
  y: number;
}

declare class NXEventSystemDeviceList {
  constructor(init?: NXEventSystemDeviceList);
  dev: unknown /* const array */;
}

declare class __IOFixedPoint32 {
  constructor(init?: __IOFixedPoint32);
  x: number;
  y: number;
}

declare class evsioMouseScaling {
  constructor(init?: evsioMouseScaling);
  numScaleLevels: number;
  scaleThresholds: unknown /* const array */;
  scaleFactors: unknown /* const array */;
}

declare class evsioKeymapping {
  constructor(init?: evsioKeymapping);
  size: number;
  mapping: string | null;
}

declare class IOGBounds {
  constructor(init?: IOGBounds);
  minx: number;
  maxx: number;
  miny: number;
  maxy: number;
}

declare class IODisplayTimingRangeV1 {
  constructor(init?: IODisplayTimingRangeV1);
  __reservedA: unknown /* const array */;
  version: number;
  __reservedB: unknown /* const array */;
  minPixelClock: number;
  maxPixelClock: number;
  maxPixelError: number;
  supportedSyncFlags: number;
  supportedSignalLevels: number;
  supportedSignalConfigs: number;
  minFrameRate: number;
  maxFrameRate: number;
  minLineRate: number;
  maxLineRate: number;
  maxHorizontalTotal: number;
  maxVerticalTotal: number;
  __reservedD: unknown /* const array */;
  charSizeHorizontalActive: number;
  charSizeHorizontalBlanking: number;
  charSizeHorizontalSyncOffset: number;
  charSizeHorizontalSyncPulse: number;
  charSizeVerticalActive: number;
  charSizeVerticalBlanking: number;
  charSizeVerticalSyncOffset: number;
  charSizeVerticalSyncPulse: number;
  charSizeHorizontalBorderLeft: number;
  charSizeHorizontalBorderRight: number;
  charSizeVerticalBorderTop: number;
  charSizeVerticalBorderBottom: number;
  charSizeHorizontalTotal: number;
  charSizeVerticalTotal: number;
  __reservedE: number;
  minHorizontalActiveClocks: number;
  maxHorizontalActiveClocks: number;
  minHorizontalBlankingClocks: number;
  maxHorizontalBlankingClocks: number;
  minHorizontalSyncOffsetClocks: number;
  maxHorizontalSyncOffsetClocks: number;
  minHorizontalPulseWidthClocks: number;
  maxHorizontalPulseWidthClocks: number;
  minVerticalActiveClocks: number;
  maxVerticalActiveClocks: number;
  minVerticalBlankingClocks: number;
  maxVerticalBlankingClocks: number;
  minVerticalSyncOffsetClocks: number;
  maxVerticalSyncOffsetClocks: number;
  minVerticalPulseWidthClocks: number;
  maxVerticalPulseWidthClocks: number;
  minHorizontalBorderLeft: number;
  maxHorizontalBorderLeft: number;
  minHorizontalBorderRight: number;
  maxHorizontalBorderRight: number;
  minVerticalBorderTop: number;
  maxVerticalBorderTop: number;
  minVerticalBorderBottom: number;
  maxVerticalBorderBottom: number;
  maxNumLinks: number;
  minLink0PixelClock: number;
  maxLink0PixelClock: number;
  minLink1PixelClock: number;
  maxLink1PixelClock: number;
  supportedPixelEncoding: number;
  supportedBitsPerColorComponent: number;
  supportedColorimetryModes: number;
  supportedDynamicRangeModes: number;
  __reservedF: unknown /* const array */;
}

declare class IOFBDisplayModeDescription {
  constructor(init?: IOFBDisplayModeDescription);
  info: IODisplayModeInformation;
  timingInfo: IOTimingInformation;
}

declare class IODetailedTimingInformationV2 {
  constructor(init?: IODetailedTimingInformationV2);
  __reservedA: unknown /* const array */;
  horizontalScaledInset: number;
  verticalScaledInset: number;
  scalerFlags: number;
  horizontalScaled: number;
  verticalScaled: number;
  signalConfig: number;
  signalLevels: number;
  pixelClock: number;
  minPixelClock: number;
  maxPixelClock: number;
  horizontalActive: number;
  horizontalBlanking: number;
  horizontalSyncOffset: number;
  horizontalSyncPulseWidth: number;
  verticalActive: number;
  verticalBlanking: number;
  verticalSyncOffset: number;
  verticalSyncPulseWidth: number;
  horizontalBorderLeft: number;
  horizontalBorderRight: number;
  verticalBorderTop: number;
  verticalBorderBottom: number;
  horizontalSyncConfig: number;
  horizontalSyncLevel: number;
  verticalSyncConfig: number;
  verticalSyncLevel: number;
  numLinks: number;
  verticalBlankingExtension: number;
  pixelEncoding: number;
  bitsPerColorComponent: number;
  colorimetry: number;
  dynamicRange: number;
  dscCompressedBitsPerPixel: number;
  dscSliceHeight: number;
  dscSliceWidth: number;
  verticalBlankingMaxStretchPerFrame: number;
  verticalBlankingMaxShrinkPerFrame: number;
  __reservedB: unknown /* const array */;
}

declare class IOFBHDRMetaDataV1 {
  constructor(init?: IOFBHDRMetaDataV1);
  displayPrimary_X0: number;
  displayPrimary_Y0: number;
  displayPrimary_X1: number;
  displayPrimary_Y1: number;
  displayPrimary_X2: number;
  displayPrimary_Y2: number;
  displayPrimary_X: number;
  displayPrimary_Y: number;
  desiredLuminance_Max: number;
  desiredLuminance_Min: number;
  desiredLightLevel_Avg: number;
  desiredLightLevel_Max: number;
  __reservedA: unknown /* const array */;
}

declare class IODisplayModeInformation {
  constructor(init?: IODisplayModeInformation);
  nominalWidth: number;
  nominalHeight: number;
  refreshRate: number;
  maxDepthIndex: number;
  flags: number;
  imageWidth: number;
  imageHeight: number;
  reserved: unknown /* const array */;
}

declare class IOPixelInformation {
  constructor(init?: IOPixelInformation);
  bytesPerRow: number;
  bytesPerPlane: number;
  bitsPerPixel: number;
  pixelType: number;
  componentCount: number;
  bitsPerComponent: number;
  componentMasks: unknown /* const array */;
  pixelFormat: unknown /* const array */;
  flags: number;
  activeWidth: number;
  activeHeight: number;
  reserved: unknown /* const array */;
}

declare class _NXTabletPointData {
  constructor(init?: _NXTabletPointData);
  x: number;
  y: number;
  z: number;
  buttons: number;
  pressure: number;
  tilt: unnamed_9468096681639338463;
  rotation: number;
  tangentialPressure: number;
  deviceID: number;
  vendor1: number;
  vendor2: number;
  vendor3: number;
}

declare class IOFireWireAsyncStreamCommandInterface_t {
  constructor(init?: IOFireWireAsyncStreamCommandInterface_t);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  GetStatus: (p1: interop.PointerConvertible) => number | null;
  GetTransferredBytes: (p1: interop.PointerConvertible) => number | null;
  GetTargetAddress: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  SetTarget: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  SetGeneration: (p1: interop.PointerConvertible, p2: number) => void | null;
  SetCallback: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: number) => void) => void | null;
  SetRefCon: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  IsExecuting: (p1: interop.PointerConvertible) => number | null;
  Submit: (p1: interop.PointerConvertible) => number | null;
  SubmitWithRefconAndCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number) => void) => number | null;
  Cancel: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetBuffer: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void | null;
  GetBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void | null;
  SetMaxPacket: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetFlags: (p1: interop.PointerConvertible, p2: number) => void | null;
  SetTimeoutDuration: (p1: interop.PointerConvertible, p2: number) => void | null;
  SetMaxRetryCount: (p1: interop.PointerConvertible, p2: number) => void | null;
  GetAckCode: (p1: interop.PointerConvertible) => number | null;
  GetResponseCode: (p1: interop.PointerConvertible) => number | null;
  SetMaxPacketSpeed: (p1: interop.PointerConvertible, p2: interop.Enum<typeof IOFWSpeed>) => void | null;
  GetRefCon: (p1: interop.PointerConvertible) => interop.Pointer | null;
  SetChannel: (p1: interop.PointerConvertible, p2: number) => void | null;
  SetSyncBits: (p1: interop.PointerConvertible, p2: number) => void | null;
  SetTagBits: (p1: interop.PointerConvertible, p2: number) => void | null;
}

declare class unnamed_9603799558256710164 {
  constructor(init?: unnamed_9603799558256710164);
  x: number;
  y: number;
  z: number;
  buttons: number;
  pressure: number;
  tilt: unnamed_2435892573090321970;
  rotation: number;
  tangentialPressure: number;
  deviceID: number;
  vendor1: number;
  vendor2: number;
  vendor3: number;
  reserved: unknown /* const array */;
}

declare class IOUSBDeviceQualifierDescriptor {
  constructor(init?: IOUSBDeviceQualifierDescriptor);
  bLength: number;
  bDescriptorType: number;
  bcdUSB: number;
  bDeviceClass: number;
  bDeviceSubClass: number;
  bDeviceProtocol: number;
  bMaxPacketSize0: number;
  bNumConfigurations: number;
  bReserved: number;
}

declare class _NXEventExt {
  constructor(init?: _NXEventExt);
  payload: _NXEvent;
  extension: _NXEventExtension;
}

declare class dk_dvd_read_structure_t {
  constructor(init?: dk_dvd_read_structure_t);
  format: number;
  reserved0008: unknown /* const array */;
  address: number;
  grantID: number;
  layer: number;
  reserved0080: unknown /* const array */;
  bufferLength: number;
  buffer: interop.Pointer;
}

declare class IOUSBFindEndpointRequest {
  constructor(init?: IOUSBFindEndpointRequest);
  type: number;
  direction: number;
  maxPacketSize: number;
  interval: number;
}

declare class VDDefMode {
  constructor(init?: VDDefMode);
  csID: number;
  filler: number;
}

declare class CDATIP {
  constructor(init?: CDATIP);
  dataLength: number;
  reserved: unknown /* const array */;
  referenceSpeed: number;
  reserved3: number;
  indicativeTargetWritingPower: number;
  reserved2: number;
  reserved5: number;
  unrestrictedUse: number;
  reserved4: number;
  a3Valid: number;
  a2Valid: number;
  a1Valid: number;
  discSubType: number;
  discType: number;
  reserved6: number;
  reserved7: number;
  startTimeOfLeadIn: CDMSF;
  reserved8: number;
  lastPossibleStartTimeOfLeadOut: CDMSF;
  reserved9: number;
  a1: unknown /* const array */;
  reserved10: number;
  a2: unknown /* const array */;
  reserved11: number;
  a3: unknown /* const array */;
  reserved12: number;
}

declare class dk_cd_read_t {
  constructor(init?: dk_cd_read_t);
  offset: number;
  sectorArea: number;
  sectorType: number;
  reserved0080: unknown /* const array */;
  bufferLength: number;
  buffer: interop.Pointer;
}

declare class VDSizeInfo {
  constructor(init?: VDSizeInfo);
  csHSize: number;
  csHPos: number;
  csVSize: number;
  csVPos: number;
}

declare class unnamed_175957732564600561 {
  constructor(init?: unnamed_175957732564600561);
  dx: number;
  dy: number;
  subx: number;
  suby: number;
  subType: number;
  reserved1: number;
  reserved2: number;
  tablet: unnamed_2601017340886590716;
}

declare class IOFireWireLibPHYPacketListenerInterface_t {
  constructor(init?: IOFireWireLibPHYPacketListenerInterface_t);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  SetListenerCallback: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: interop.PointerConvertible) => void) => void | null;
  SetSkippedPacketCallback: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => void) => void | null;
  NotificationIsOn: (p1: interop.PointerConvertible) => number | null;
  TurnOnNotification: (p1: interop.PointerConvertible) => number | null;
  TurnOffNotification: (p1: interop.PointerConvertible) => void | null;
  ClientCommandIsComplete: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  SetRefCon: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  GetRefCon: (p1: interop.PointerConvertible) => interop.Pointer | null;
  SetFlags: (p1: interop.PointerConvertible, p2: number) => void | null;
  GetFlags: (p1: interop.PointerConvertible) => number | null;
}

declare class _IOAudioStreamDataDescriptor {
  constructor(init?: _IOAudioStreamDataDescriptor);
  fVersion: number;
  fNumberOfStreams: number;
  fStreamLength: unknown /* const array */;
}

declare class Block0 {
  constructor(init?: Block0);
  sbSig: number;
  sbBlkSize: number;
  sbBlkCount: number;
  sbDevType: number;
  sbDevId: number;
  sbDrvrData: number;
  sbDrvrCount: number;
  sbDrvrMap: unknown /* const array */;
  sbReserved: unknown /* const array */;
}

declare class unnamed_10669153243747207100 {
  constructor(init?: unnamed_10669153243747207100);
  index: number;
  number: number;
  time: CDMSF;
}

declare class IODot3CollEntry {
  constructor(init?: IODot3CollEntry);
  collFrequencies: unknown /* const array */;
}

declare class IOAccelSurfaceScaling {
  constructor(init?: IOAccelSurfaceScaling);
  buffer: IOAccelBounds;
  source: IOAccelSize;
  reserved: unknown /* const array */;
}

declare class _NXEvent {
  constructor(init?: _NXEvent);
  type: number;
  location: unnamed_12561953416154083337;
  time: number;
  flags: number;
  window: number;
  service_id: number;
  ext_pid: number;
  data: NXEventData;
}

declare class IOServiceInterestContent {
  constructor(init?: IOServiceInterestContent);
  messageType: number;
  messageArgument: unknown /* const array */;
}

declare class IOServiceInterestContent64 {
  constructor(init?: IOServiceInterestContent64);
  messageType: number;
  messageArgument: unknown /* const array */;
}

declare class OSNotificationHeader64 {
  constructor(init?: OSNotificationHeader64);
  size: number;
  type: number;
  reference: unknown /* const array */;
  content: interop.Pointer;
}

declare class IOVirtualRange {
  constructor(init?: IOVirtualRange);
  address: number;
  length: number;
}

declare class IOHIDOutputTransactionInterface {
  constructor(init?: IOHIDOutputTransactionInterface);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  createAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  getAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  createAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  getAsyncPort: (p1: interop.PointerConvertible) => number | null;
  create: (p1: interop.PointerConvertible) => number | null;
  dispose: (p1: interop.PointerConvertible) => number | null;
  addElement: (p1: interop.PointerConvertible, p2: number) => number | null;
  removeElement: (p1: interop.PointerConvertible, p2: number) => number | null;
  hasElement: (p1: interop.PointerConvertible, p2: number) => number | null;
  setElementDefault: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  getElementDefault: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  setElementValue: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  getElementValue: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  commit: (p1: interop.PointerConvertible, p2: number, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number | null;
  clear: (p1: interop.PointerConvertible) => number | null;
}

declare class IOPhysicalRange {
  constructor(init?: IOPhysicalRange);
  address: number;
  length: number;
}

declare class IOUSBDeviceStruct500 {
  constructor(init?: IOUSBDeviceStruct500);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  CreateDeviceAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  CreateDeviceAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAsyncPort: (p1: interop.PointerConvertible) => number | null;
  USBDeviceOpen: (p1: interop.PointerConvertible) => number | null;
  USBDeviceClose: (p1: interop.PointerConvertible) => number | null;
  GetDeviceClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceSubClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProtocol: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceVendor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProduct: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceReleaseNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAddress: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceBusPowerAvailable: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceSpeed: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetNumberOfConfigurations: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetLocationID: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetConfigurationDescriptorPtr: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetConfiguration: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetConfiguration: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ResetDevice: (p1: interop.PointerConvertible) => number | null;
  DeviceRequest: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  DeviceRequestAsync: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p4: interop.PointerConvertible) => number | null;
  CreateInterfaceIterator: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  USBDeviceOpenSeize: (p1: interop.PointerConvertible) => number | null;
  DeviceRequestTO: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  DeviceRequestAsyncTO: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p4: interop.PointerConvertible) => number | null;
  USBDeviceSuspend: (p1: interop.PointerConvertible, p2: number) => number | null;
  USBDeviceAbortPipeZero: (p1: interop.PointerConvertible) => number | null;
  USBGetManufacturerStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBGetProductStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBGetSerialNumberStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBDeviceReEnumerate: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusMicroFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetIOUSBLibVersion: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetBusFrameNumberWithTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetUSBDeviceInformation: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  RequestExtraPower: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible) => number | null;
  ReturnExtraPower: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  GetExtraPowerAllocated: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetBandwidthAvailableForDevice: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
}

declare class IOGPoint {
  constructor(init?: IOGPoint);
  x: number;
  y: number;
}

declare class IOBlitVertexStruct {
  constructor(init?: IOBlitVertexStruct);
  x: number;
  y: number;
}

declare class VDSyncInfoRec {
  constructor(init?: VDSyncInfoRec);
  csMode: number;
  csFlags: number;
}

declare class IOGSize {
  constructor(init?: IOGSize);
  width: number;
  height: number;
}

declare class IODisplayTimingRangeV2 {
  constructor(init?: IODisplayTimingRangeV2);
  __reservedA: unknown /* const array */;
  version: number;
  __reservedB: unknown /* const array */;
  minPixelClock: number;
  maxPixelClock: number;
  maxPixelError: number;
  supportedSyncFlags: number;
  supportedSignalLevels: number;
  supportedSignalConfigs: number;
  minFrameRate: number;
  maxFrameRate: number;
  minLineRate: number;
  maxLineRate: number;
  maxHorizontalTotal: number;
  maxVerticalTotal: number;
  __reservedD: unknown /* const array */;
  charSizeHorizontalActive: number;
  charSizeHorizontalBlanking: number;
  charSizeHorizontalSyncOffset: number;
  charSizeHorizontalSyncPulse: number;
  charSizeVerticalActive: number;
  charSizeVerticalBlanking: number;
  charSizeVerticalSyncOffset: number;
  charSizeVerticalSyncPulse: number;
  charSizeHorizontalBorderLeft: number;
  charSizeHorizontalBorderRight: number;
  charSizeVerticalBorderTop: number;
  charSizeVerticalBorderBottom: number;
  charSizeHorizontalTotal: number;
  charSizeVerticalTotal: number;
  __reservedE: number;
  minHorizontalActiveClocks: number;
  maxHorizontalActiveClocks: number;
  minHorizontalBlankingClocks: number;
  maxHorizontalBlankingClocks: number;
  minHorizontalSyncOffsetClocks: number;
  maxHorizontalSyncOffsetClocks: number;
  minHorizontalPulseWidthClocks: number;
  maxHorizontalPulseWidthClocks: number;
  minVerticalActiveClocks: number;
  maxVerticalActiveClocks: number;
  minVerticalBlankingClocks: number;
  maxVerticalBlankingClocks: number;
  minVerticalSyncOffsetClocks: number;
  maxVerticalSyncOffsetClocks: number;
  minVerticalPulseWidthClocks: number;
  maxVerticalPulseWidthClocks: number;
  minHorizontalBorderLeft: number;
  maxHorizontalBorderLeft: number;
  minHorizontalBorderRight: number;
  maxHorizontalBorderRight: number;
  minVerticalBorderTop: number;
  maxVerticalBorderTop: number;
  minVerticalBorderBottom: number;
  maxVerticalBorderBottom: number;
  maxNumLinks: number;
  minLink0PixelClock: number;
  maxLink0PixelClock: number;
  minLink1PixelClock: number;
  maxLink1PixelClock: number;
  supportedPixelEncoding: number;
  supportedBitsPerColorComponent: number;
  supportedColorimetryModes: number;
  supportedDynamicRangeModes: number;
  __reservedF: unknown /* const array */;
  maxBandwidth: number;
  dscMinSliceHeight: number;
  dscMaxSliceHeight: number;
  dscMinSliceWidth: number;
  dscMaxSliceWidth: number;
  dscMinSlicePerLine: number;
  dscMaxSlicePerLine: number;
  dscMinBPC: number;
  dscMaxBPC: number;
  dscMinBPP: number;
  dscMaxBPP: number;
  dscVBR: number;
  dscBlockPredEnable: number;
  __reservedC: unknown /* const array */;
}

declare class IOFWAsyncStreamListenerInterface_t {
  constructor(init?: IOFWAsyncStreamListenerInterface_t);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  SetListenerHandler: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number | null;
  SetSkippedPacketHandler: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => void) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => void | null;
  NotificationIsOn: (p1: interop.PointerConvertible) => number | null;
  TurnOnNotification: (p1: interop.PointerConvertible) => number | null;
  TurnOffNotification: (p1: interop.PointerConvertible) => void | null;
  ClientCommandIsComplete: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => void | null;
  GetRefCon: (p1: interop.PointerConvertible) => interop.Pointer | null;
  SetFlags: (p1: interop.PointerConvertible, p2: number) => void | null;
  GetFlags: (p1: interop.PointerConvertible) => number | null;
  GetOverrunCounter: (p1: interop.PointerConvertible) => number | null;
}

declare class IOTimingInformation {
  constructor(init?: IOTimingInformation);
  appleTimingID: number;
  flags: number;
  detailedInfo: unnamed_14650194066440877064;
}

declare class IOAsyncCompletionContent {
  constructor(init?: IOAsyncCompletionContent);
  result: number;
  args: interop.Pointer;
}

declare class LowLatencyUserBufferInfoV2 {
  constructor(init?: LowLatencyUserBufferInfoV2);
  cookie: number;
  bufferAddress: interop.Pointer;
  bufferSize: number;
  bufferType: number;
  isPrepared: number;
  mappedUHCIAddress: interop.Pointer;
  nextBuffer: interop.Pointer;
}

declare class evioSpecialKeyMsg {
  constructor(init?: evioSpecialKeyMsg);
  Head: mach_msg_header_t;
  key: number;
  direction: number;
  flags: number;
  level: number;
}

declare class IOUSBDeviceCapabilityBillboard {
  constructor(init?: IOUSBDeviceCapabilityBillboard);
  bLength: number;
  bDescriptorType: number;
  bDevCapabilityType: number;
  iAdditionalInfoURL: number;
  bNumberOfAlternateModes: number;
  bPreferredAlternateMode: number;
  vCONNPower: number;
  bmConfigured: unknown /* const array */;
  bcdVersion: number;
  bAdditionalFailureInfo: number;
  bReserved: number;
  pAltConfigurations: interop.Pointer;
}

declare class SCSICmd_INQUIRY_Page83_Header_SPC_16 {
  constructor(init?: SCSICmd_INQUIRY_Page83_Header_SPC_16);
  PERIPHERAL_DEVICE_TYPE: number;
  PAGE_CODE: number;
  PAGE_LENGTH: number;
}

declare class gpt_ent {
  constructor(init?: gpt_ent);
  ent_type: unknown /* const array */;
  ent_uuid: unknown /* const array */;
  ent_lba_start: number;
  ent_lba_end: number;
  ent_attr: number;
  ent_name: unknown /* const array */;
}

declare class IOFireWireAVCLibConsumerInterface {
  constructor(init?: IOFireWireAVCLibConsumerInterface);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  setSubunit: (p1: interop.PointerConvertible, p2: number) => void | null;
  setRemotePlug: (p1: interop.PointerConvertible, p2: number) => void | null;
  connectToRemotePlug: (p1: interop.PointerConvertible) => number | null;
  disconnectFromRemotePlug: (p1: interop.PointerConvertible) => number | null;
  setFrameStatusHandler: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number, p3: number) => void) => void | null;
  frameProcessed: (p1: interop.PointerConvertible, p2: number) => void | null;
  setMaxPayloadSize: (p1: interop.PointerConvertible, p2: number) => void | null;
  setSegmentSize: (p1: interop.PointerConvertible, p2: number) => number | null;
  getSegmentSize: (p1: interop.PointerConvertible) => number | null;
  getSegmentBuffer: (p1: interop.PointerConvertible) => string | null;
  setPortStateHandler: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number) => void) => void | null;
  setPortFlags: (p1: interop.PointerConvertible, p2: number) => void | null;
  clearPortFlags: (p1: interop.PointerConvertible, p2: number) => void | null;
  getPortFlags: (p1: interop.PointerConvertible) => number | null;
}

declare class IOFireWireNuDCLPoolInterface_t {
  constructor(init?: IOFireWireNuDCLPoolInterface_t);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  revision: number;
  version: number;
  GetProgram: (p1: interop.PointerConvertible) => interop.Pointer | null;
  GetDCLs: (p1: interop.PointerConvertible) => interop.Pointer | null;
  PrintProgram: (p1: interop.PointerConvertible) => void | null;
  PrintDCL: (p1: interop.PointerConvertible) => void | null;
  SetCurrentTagAndSync: (p1: interop.PointerConvertible, p2: number, p3: number) => void | null;
  AllocateSendPacket: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => interop.Pointer | null;
  AllocateSendPacket_v: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => interop.Pointer | null;
  AllocateSkipCycle: (p1: interop.PointerConvertible) => interop.Pointer | null;
  AllocateReceivePacket: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: interop.PointerConvertible) => interop.Pointer | null;
  AllocateReceivePacket_v: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => interop.Pointer | null;
  FindDCLNextDCL: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer | null;
  SetDCLBranch: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDCLBranch: (p1: interop.PointerConvertible) => interop.Pointer | null;
  SetDCLTimeStampPtr: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDCLTimeStampPtr: (p1: interop.PointerConvertible) => interop.Pointer | null;
  SetDCLStatusPtr: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDCLStatusPtr: (p1: interop.PointerConvertible) => interop.Pointer | null;
  AppendDCLRanges: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  SetDCLRanges: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  SetDCLRanges_v: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDCLRanges: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  CountDCLRanges: (p1: interop.PointerConvertible) => number | null;
  GetDCLSpan: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDCLSize: (p1: interop.PointerConvertible) => number | null;
  SetDCLCallback: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void) => number | null;
  GetDCLCallback: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  SetDCLUserHeaderPtr: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetDCLUserHeaderPtr: (p1: interop.PointerConvertible) => interop.Pointer | null;
  GetUserHeaderMaskPtr: (p1: interop.PointerConvertible) => interop.Pointer | null;
  SetDCLRefcon: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  GetDCLRefcon: (p1: interop.PointerConvertible) => interop.Pointer | null;
  AppendDCLUpdateList: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetDCLUpdateList: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  CopyDCLUpdateList: (p1: interop.PointerConvertible) => interop.Pointer | null;
  RemoveDCLUpdateList: (p1: interop.PointerConvertible) => number | null;
  SetDCLWaitControl: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetDCLFlags: (p1: interop.PointerConvertible, p2: number) => void | null;
  GetDCLFlags: (p1: interop.PointerConvertible) => number | null;
  SetDCLSkipBranch: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDCLSkipBranch: (p1: interop.PointerConvertible) => interop.Pointer | null;
  SetDCLSkipCallback: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void) => number | null;
  GetDCLSkipCallback: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  SetDCLSkipRefcon: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDCLSkipRefcon: (p1: interop.PointerConvertible) => interop.Pointer | null;
  SetDCLSyncBits: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetDCLSyncBits: (p1: interop.PointerConvertible) => number | null;
  SetDCLTagBits: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetDCLTagBits: (p1: interop.PointerConvertible) => number | null;
}

declare class _NXParsedKeyMapping_ {
  constructor(init?: _NXParsedKeyMapping_);
  shorts: number;
  keyBits: unknown /* const array */;
  maxMod: number;
  modDefs: unknown /* const array */;
  numDefs: number;
  keyDefs: unknown /* const array */;
  numSeqs: number;
  seqDefs: unknown /* const array */;
  numSpecialKeys: number;
  specialKeys: unknown /* const array */;
  mapping: interop.Pointer;
  mappingLen: number;
}

declare class IOUSBDeviceStruct182 {
  constructor(init?: IOUSBDeviceStruct182);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  CreateDeviceAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  CreateDeviceAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAsyncPort: (p1: interop.PointerConvertible) => number | null;
  USBDeviceOpen: (p1: interop.PointerConvertible) => number | null;
  USBDeviceClose: (p1: interop.PointerConvertible) => number | null;
  GetDeviceClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceSubClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProtocol: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceVendor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProduct: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceReleaseNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAddress: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceBusPowerAvailable: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceSpeed: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetNumberOfConfigurations: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetLocationID: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetConfigurationDescriptorPtr: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetConfiguration: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetConfiguration: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ResetDevice: (p1: interop.PointerConvertible) => number | null;
  DeviceRequest: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  DeviceRequestAsync: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p4: interop.PointerConvertible) => number | null;
  CreateInterfaceIterator: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  USBDeviceOpenSeize: (p1: interop.PointerConvertible) => number | null;
  DeviceRequestTO: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  DeviceRequestAsyncTO: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p4: interop.PointerConvertible) => number | null;
  USBDeviceSuspend: (p1: interop.PointerConvertible, p2: number) => number | null;
  USBDeviceAbortPipeZero: (p1: interop.PointerConvertible) => number | null;
  USBGetManufacturerStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBGetProductStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBGetSerialNumberStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
}

declare class bm18Cursor {
  constructor(init?: bm18Cursor);
  image: unknown /* const array */;
  mask: unknown /* const array */;
  save: unknown /* const array */;
}

declare class IOAccelSurfaceReadData {
  constructor(init?: IOAccelSurfaceReadData);
  x: number;
  y: number;
  w: number;
  h: number;
  client_addr: number;
  client_row_bytes: number;
}

declare class IOPMCalendarStruct {
  constructor(init?: IOPMCalendarStruct);
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  selector: number;
}

declare class IOFireWireSBP2LibMgmtORBInterface {
  constructor(init?: IOFireWireSBP2LibMgmtORBInterface);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  submitORB: (p1: interop.PointerConvertible) => number | null;
  setORBCompleteCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void) => void | null;
  setRefCon: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  getRefCon: (p1: interop.PointerConvertible) => interop.Pointer | null;
  setCommandFunction: (p1: interop.PointerConvertible, p2: number) => number | null;
  setManageeORB: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  setManageeLogin: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  setResponseBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => number | null;
}

declare class IOUSBDeviceStruct400 {
  constructor(init?: IOUSBDeviceStruct400);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  CreateDeviceAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  CreateDeviceAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAsyncPort: (p1: interop.PointerConvertible) => number | null;
  USBDeviceOpen: (p1: interop.PointerConvertible) => number | null;
  USBDeviceClose: (p1: interop.PointerConvertible) => number | null;
  GetDeviceClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceSubClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProtocol: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceVendor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProduct: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceReleaseNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAddress: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceBusPowerAvailable: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceSpeed: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetNumberOfConfigurations: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetLocationID: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetConfigurationDescriptorPtr: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetConfiguration: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetConfiguration: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ResetDevice: (p1: interop.PointerConvertible) => number | null;
  DeviceRequest: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  DeviceRequestAsync: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p4: interop.PointerConvertible) => number | null;
  CreateInterfaceIterator: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  USBDeviceOpenSeize: (p1: interop.PointerConvertible) => number | null;
  DeviceRequestTO: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  DeviceRequestAsyncTO: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p4: interop.PointerConvertible) => number | null;
  USBDeviceSuspend: (p1: interop.PointerConvertible, p2: number) => number | null;
  USBDeviceAbortPipeZero: (p1: interop.PointerConvertible) => number | null;
  USBGetManufacturerStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBGetProductStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBGetSerialNumberStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBDeviceReEnumerate: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusMicroFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetIOUSBLibVersion: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetBusFrameNumberWithTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetUSBDeviceInformation: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  RequestExtraPower: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible) => number | null;
  ReturnExtraPower: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  GetExtraPowerAllocated: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
}

declare class unnamed_12561953416154083337 {
  constructor(init?: unnamed_12561953416154083337);
  x: number;
  y: number;
}

declare class FWSBP2LogoutCompleteParams {
  constructor(init?: FWSBP2LogoutCompleteParams);
  refCon: interop.Pointer;
  generation: number;
  status: number;
  statusBlock: interop.Pointer;
  statusBlockLength: number;
}

declare class IOHardwareCursorInfo {
  constructor(init?: IOHardwareCursorInfo);
  majorVersion: number;
  minorVersion: number;
  cursorHeight: number;
  cursorWidth: number;
  colorMap: interop.Pointer;
  hardwareCursorData: interop.Pointer;
  cursorHotSpotX: number;
  cursorHotSpotY: number;
  reserved: unknown /* const array */;
}

declare class IOUSBDeviceRequestSetSELData {
  constructor(init?: IOUSBDeviceRequestSetSELData);
  u1Sel: number;
  u1Pel: number;
  u2Sel: number;
  u2Pel: number;
}

declare class SPCModeParameterHeader10 {
  constructor(init?: SPCModeParameterHeader10);
  MODE_DATA_LENGTH: number;
  MEDIUM_TYPE: number;
  DEVICE_SPECIFIC_PARAMETER: number;
  LONGLBA: number;
  RESERVED: number;
  BLOCK_DESCRIPTOR_LENGTH: number;
}

declare class IOUSBDFUDescriptor {
  constructor(init?: IOUSBDFUDescriptor);
  bLength: number;
  bDescriptorType: number;
  bmAttributes: number;
  wDetachTimeout: number;
  wTransferSize: number;
}

declare class CDDiscInfo {
  constructor(init?: CDDiscInfo);
  dataLength: number;
  discStatus: number;
  stateOfLastSession: number;
  erasable: number;
  reserved: number;
  numberOfFirstTrack: number;
  numberOfSessionsLSB: number;
  firstTrackNumberInLastSessionLSB: number;
  lastTrackNumberInLastSessionLSB: number;
  reserved3: number;
  unrestrictedUse: number;
  discBarCodeValid: number;
  discIdentificationValid: number;
  discType: number;
  numberOfSessionsMSB: number;
  firstTrackNumberInLastSessionMSB: number;
  lastTrackNumberInLastSessionMSB: number;
  discIdentification: number;
  reserved7: number;
  lastSessionLeadInStartTime: CDMSF;
  reserved8: number;
  lastPossibleStartTimeOfLeadOut: CDMSF;
  discBarCode: unknown /* const array */;
  reserved9: number;
  numberOfOPCTableEntries: number;
  opcTableEntries: unknown /* const array */;
}

declare class IOUSBDeviceCapabilitySuperSpeedPlusUSB {
  constructor(init?: IOUSBDeviceCapabilitySuperSpeedPlusUSB);
  bLength: number;
  bDescriptorType: number;
  bDevCapabilityType: number;
  bReserved: number;
  bmAttributes: number;
  wFunctionalitySupport: number;
  wReserved: number;
  bmSublinkSpeedAttr: interop.Pointer;
}

declare class ATASMARTLogDirectory {
  constructor(init?: ATASMARTLogDirectory);
  SMARTLoggingVersion: unknown /* const array */;
  entries: unknown /* const array */;
}

declare class __IOHIDUserDevice {
  constructor(init?: __IOHIDUserDevice);
}

declare class VDEntryRecord {
  constructor(init?: VDEntryRecord);
  csTable: string | null;
}

declare class IONamedValue {
  constructor(init?: IONamedValue);
  value: number;
  name: string | null;
}

declare class SCSICmd_INQUIRY_Page83_Header {
  constructor(init?: SCSICmd_INQUIRY_Page83_Header);
  PERIPHERAL_DEVICE_TYPE: number;
  PAGE_CODE: number;
  RESERVED: number;
  PAGE_LENGTH: number;
}

declare class DVDKey1Info {
  constructor(init?: DVDKey1Info);
  dataLength: unknown /* const array */;
  reserved: unknown /* const array */;
  key1Value: unknown /* const array */;
  reserved2: unknown /* const array */;
}

declare class DCLCallProcStruct {
  constructor(init?: DCLCallProcStruct);
  pNextDCLCommand: interop.Pointer;
  compilerData: number;
  opcode: number;
  proc: (p1: interop.PointerConvertible) => void | null;
  procData: interop.Pointer;
}

declare class IOColorEntry {
  constructor(init?: IOColorEntry);
  index: number;
  red: number;
  green: number;
  blue: number;
}

declare class IOUSBDeviceStruct320 {
  constructor(init?: IOUSBDeviceStruct320);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  CreateDeviceAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  CreateDeviceAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAsyncPort: (p1: interop.PointerConvertible) => number | null;
  USBDeviceOpen: (p1: interop.PointerConvertible) => number | null;
  USBDeviceClose: (p1: interop.PointerConvertible) => number | null;
  GetDeviceClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceSubClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProtocol: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceVendor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProduct: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceReleaseNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAddress: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceBusPowerAvailable: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceSpeed: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetNumberOfConfigurations: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetLocationID: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetConfigurationDescriptorPtr: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetConfiguration: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetConfiguration: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ResetDevice: (p1: interop.PointerConvertible) => number | null;
  DeviceRequest: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  DeviceRequestAsync: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p4: interop.PointerConvertible) => number | null;
  CreateInterfaceIterator: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  USBDeviceOpenSeize: (p1: interop.PointerConvertible) => number | null;
  DeviceRequestTO: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  DeviceRequestAsyncTO: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p4: interop.PointerConvertible) => number | null;
  USBDeviceSuspend: (p1: interop.PointerConvertible, p2: number) => number | null;
  USBDeviceAbortPipeZero: (p1: interop.PointerConvertible) => number | null;
  USBGetManufacturerStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBGetProductStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBGetSerialNumberStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBDeviceReEnumerate: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusMicroFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetIOUSBLibVersion: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetBusFrameNumberWithTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetUSBDeviceInformation: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  RequestExtraPower: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible) => number | null;
  ReturnExtraPower: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  GetExtraPowerAllocated: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
}

declare class VDDetailedTimingRec {
  constructor(init?: VDDetailedTimingRec);
  csTimingSize: number;
  csTimingType: number;
  csTimingVersion: number;
  csTimingReserved: number;
  csDisplayModeID: number;
  csDisplayModeSeed: number;
  csDisplayModeState: number;
  csDisplayModeAlias: number;
  csSignalConfig: number;
  csSignalLevels: number;
  csPixelClock: number;
  csMinPixelClock: number;
  csMaxPixelClock: number;
  csHorizontalActive: number;
  csHorizontalBlanking: number;
  csHorizontalSyncOffset: number;
  csHorizontalSyncPulseWidth: number;
  csVerticalActive: number;
  csVerticalBlanking: number;
  csVerticalSyncOffset: number;
  csVerticalSyncPulseWidth: number;
  csHorizontalBorderLeft: number;
  csHorizontalBorderRight: number;
  csVerticalBorderTop: number;
  csVerticalBorderBottom: number;
  csHorizontalSyncConfig: number;
  csHorizontalSyncLevel: number;
  csVerticalSyncConfig: number;
  csVerticalSyncLevel: number;
  csNumLinks: number;
  csReserved2: number;
  csReserved3: number;
  csReserved4: number;
  csReserved5: number;
  csReserved6: number;
  csReserved7: number;
  csReserved8: number;
}

declare class IOUSBCompletion {
  constructor(init?: IOUSBCompletion);
  target: interop.Pointer;
  action: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => void | null;
  parameter: interop.Pointer;
}

declare class UserExportDCLUpdateDCLListStruct {
  constructor(init?: UserExportDCLUpdateDCLListStruct);
  pClientDCLStruct: number;
  pNextDCLCommand: number;
  compilerData: number;
  opcode: number;
  dclCommandList: number;
  numDCLCommands: number;
}

declare class _IOAudioSampleIntervalDescriptor {
  constructor(init?: _IOAudioSampleIntervalDescriptor);
  sampleIntervalHi: number;
  sampleIntervalLo: number;
}

declare class IOBlitCopyRectanglesStruct {
  constructor(init?: IOBlitCopyRectanglesStruct);
  operation: IOBlitOperationStruct;
  count: number;
  rects: unknown /* const array */;
}

declare class SBCModePageFormatDevice {
  constructor(init?: SBCModePageFormatDevice);
  header: ModePageFormatHeader;
  TRACKS_PER_ZONE: number;
  ALTERNATE_SECTORS_PER_ZONE: number;
  ALTERNATE_TRACKS_PER_ZONE: number;
  ALTERNATE_TRACKS_PER_LOGICAL_UNIT: number;
  SECTORS_PER_TRACK: number;
  DATA_BYTES_PER_PHYSICAL_SECTOR: number;
  INTERLEAVE: number;
  TRACK_SKEW_FACTOR: number;
  CYLINDER_SKEW_FACTOR: number;
  SSEC_HSEC_RMB_SURF: number;
  RESERVED: unknown /* const array */;
}

declare class IOVideoDeviceNotificationMessage {
  constructor(init?: IOVideoDeviceNotificationMessage);
  mMessageHeader: mach_msg_header_t;
  mClientData: number;
  mNumberNotifications: number;
  mNotifications: unknown /* const array */;
}

declare class SPCModeParameterHeader6 {
  constructor(init?: SPCModeParameterHeader6);
  MODE_DATA_LENGTH: number;
  MEDIUM_TYPE: number;
  DEVICE_SPECIFIC_PARAMETER: number;
  BLOCK_DESCRIPTOR_LENGTH: number;
}

declare class IOUSBHIDReportDesc {
  constructor(init?: IOUSBHIDReportDesc);
  hidDescriptorType: number;
  hidDescriptorLengthLo: number;
  hidDescriptorLengthHi: number;
}

declare class NXEventSystemDevice {
  constructor(init?: NXEventSystemDevice);
  interface: number;
  interface_addr: number;
  dev_type: number;
  id: number;
}

declare class DCLTimeStampStruct {
  constructor(init?: DCLTimeStampStruct);
  pNextDCLCommand: interop.Pointer;
  compilerData: number;
  opcode: number;
  timeStamp: number;
}

declare class SCSICmd_INQUIRY_Page83_TargetPortGroup_Identifier {
  constructor(init?: SCSICmd_INQUIRY_Page83_TargetPortGroup_Identifier);
  RESERVED: number;
  TARGET_PORT_GROUP: number;
}

declare class IOFireWireRemoteIsochPortInterface_t {
  constructor(init?: IOFireWireRemoteIsochPortInterface_t);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  revision: number;
  version: number;
  GetSupported: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  AllocatePort: (p1: interop.PointerConvertible, p2: interop.Enum<typeof IOFWSpeed>, p3: number) => number | null;
  ReleasePort: (p1: interop.PointerConvertible) => number | null;
  Start: (p1: interop.PointerConvertible) => number | null;
  Stop: (p1: interop.PointerConvertible) => number | null;
  SetRefCon: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  GetRefCon: (p1: interop.PointerConvertible) => interop.Pointer | null;
  SetGetSupportedHandler: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  SetAllocatePortHandler: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: interop.Enum<typeof IOFWSpeed>, p3: number) => number) => (p1: interop.PointerConvertible, p2: interop.Enum<typeof IOFWSpeed>, p3: number) => number | null;
  SetReleasePortHandler: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible) => number) => (p1: interop.PointerConvertible) => number | null;
  SetStartHandler: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible) => number) => (p1: interop.PointerConvertible) => number | null;
  SetStopHandler: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible) => number) => (p1: interop.PointerConvertible) => number | null;
}

declare class __IOHIDDevice {
  constructor(init?: __IOHIDDevice);
}

declare class _IOAudioNotificationMessage {
  constructor(init?: _IOAudioNotificationMessage);
  messageHeader: mach_msg_header_t;
  type: number;
  ref: number;
  sender: interop.Pointer;
}

declare class dk_cd_read_toc_t {
  constructor(init?: dk_cd_read_toc_t);
  format: number;
  formatAsTime: number;
  reserved0016: unknown /* const array */;
  address: unnamed_10910005987556194291;
  reserved0064: unknown /* const array */;
  bufferLength: number;
  buffer: interop.Pointer;
}

declare class IOVideoStreamDescription {
  constructor(init?: IOVideoStreamDescription);
  mVideoCodecType: number;
  mVideoCodecFlags: number;
  mWidth: number;
  mHeight: number;
  mReserved1: number;
  mReserved2: number;
}

declare class IOUSBInterfaceStruct650 {
  constructor(init?: IOUSBInterfaceStruct650);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  CreateInterfaceAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  CreateInterfaceAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncPort: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceOpen: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceClose: (p1: interop.PointerConvertible) => number | null;
  GetInterfaceClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceSubClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceProtocol: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceVendor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProduct: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceReleaseNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetConfigurationValue: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetAlternateSetting: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetNumEndpoints: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetLocationID: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDevice: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetAlternateInterface: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ControlRequest: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  GetPipeProperties: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  GetPipeStatus: (p1: interop.PointerConvertible, p2: number) => number | null;
  AbortPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ResetPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ClearPipeStall: (p1: interop.PointerConvertible, p2: number) => number | null;
  ReadPipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  WritePipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number) => number | null;
  ReadPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  WritePipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  ReadIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WriteIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  ControlRequestTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  ReadPipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: number) => number | null;
  WritePipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number) => number | null;
  ReadPipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WritePipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  USBInterfaceGetStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBInterfaceOpenSeize: (p1: interop.PointerConvertible) => number | null;
  ClearPipeStallBothEnds: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetPipePolicy: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number) => number | null;
  GetBandwidthAvailable: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetEndpointProperties: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  LowLatencyReadIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  LowLatencyWriteIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  LowLatencyCreateBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => number | null;
  LowLatencyDestroyBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetBusMicroFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetFrameListTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetIOUSBLibVersion: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  FindNextAssociatedDescriptor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => interop.Pointer | null;
  FindNextAltInterface: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => interop.Pointer | null;
  GetBusFrameNumberWithTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetPipePropertiesV2: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible, p8: interop.PointerConvertible, p9: interop.PointerConvertible, p10: interop.PointerConvertible) => number | null;
  GetPipePropertiesV3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetEndpointPropertiesV3: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SupportsStreams: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  CreateStreams: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  GetConfiguredStreams: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ReadStreamsPipeTO: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: number, p7: number) => number | null;
  WriteStreamsPipeTO: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: number, p6: number, p7: number) => number | null;
  ReadStreamsPipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: number, p6: number, p7: number, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  WriteStreamsPipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: number, p6: number, p7: number, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  AbortStreamsPipe: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  RegisterForNotification: (p1: interop.PointerConvertible, p2: number, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number | null;
  UnregisterNotification: (p1: interop.PointerConvertible, p2: number) => number | null;
  AcknowledgeNotification: (p1: interop.PointerConvertible, p2: number) => number | null;
}

declare class OSNotificationHeader {
  constructor(init?: OSNotificationHeader);
  size: number;
  type: number;
  reference: unknown /* const array */;
  content: interop.Pointer;
}

declare class IOUSBDevReqOOL {
  constructor(init?: IOUSBDevReqOOL);
  bmRequestType: number;
  bRequest: number;
  wValue: number;
  wIndex: number;
  wLength: number;
  pData: interop.Pointer;
  wLenDone: number;
  pipeRef: number;
}

declare class IOFireWireLocalIsochPortInterface_t {
  constructor(init?: IOFireWireLocalIsochPortInterface_t);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  revision: number;
  version: number;
  GetSupported: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  AllocatePort: (p1: interop.PointerConvertible, p2: interop.Enum<typeof IOFWSpeed>, p3: number) => number | null;
  ReleasePort: (p1: interop.PointerConvertible) => number | null;
  Start: (p1: interop.PointerConvertible) => number | null;
  Stop: (p1: interop.PointerConvertible) => number | null;
  SetRefCon: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  GetRefCon: (p1: interop.PointerConvertible) => interop.Pointer | null;
  ModifyJumpDCL: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  PrintDCLProgram: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => void | null;
  ModifyTransferPacketDCLSize: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => number | null;
  ModifyTransferPacketDCLBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ModifyTransferPacketDCL: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number) => number | null;
  SetFinalizeCallback: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible) => number) => number | null;
  SetResourceUsageFlags: (p1: interop.PointerConvertible, p2: interop.Enum<typeof IOFWIsochResourceFlags>) => number | null;
  Notify: (p1: interop.PointerConvertible, p2: interop.Enum<typeof IOFWDCLNotificationType>, p3: interop.PointerConvertible, p4: number) => number | null;
}

declare class _IOAudioBufferDataDescriptor {
  constructor(init?: _IOAudioBufferDataDescriptor);
  fActualDataByteSize: number;
  fActualNumSampleFrames: number;
  fTotalDataByteSize: number;
  fNominalDataByteSize: number;
  fData: unknown /* const array */;
}

declare class IOHIDEventStruct {
  constructor(init?: IOHIDEventStruct);
  type: interop.Enum<typeof IOHIDElementType>;
  elementCookie: number;
  value: number;
  timestamp: UnsignedWide;
  longValueSize: number;
  longValue: interop.Pointer;
}

declare class IOUSBDeviceStruct650 {
  constructor(init?: IOUSBDeviceStruct650);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  CreateDeviceAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  CreateDeviceAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAsyncPort: (p1: interop.PointerConvertible) => number | null;
  USBDeviceOpen: (p1: interop.PointerConvertible) => number | null;
  USBDeviceClose: (p1: interop.PointerConvertible) => number | null;
  GetDeviceClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceSubClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProtocol: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceVendor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProduct: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceReleaseNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAddress: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceBusPowerAvailable: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceSpeed: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetNumberOfConfigurations: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetLocationID: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetConfigurationDescriptorPtr: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetConfiguration: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetConfiguration: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ResetDevice: (p1: interop.PointerConvertible) => number | null;
  DeviceRequest: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  DeviceRequestAsync: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p4: interop.PointerConvertible) => number | null;
  CreateInterfaceIterator: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  USBDeviceOpenSeize: (p1: interop.PointerConvertible) => number | null;
  DeviceRequestTO: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  DeviceRequestAsyncTO: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p4: interop.PointerConvertible) => number | null;
  USBDeviceSuspend: (p1: interop.PointerConvertible, p2: number) => number | null;
  USBDeviceAbortPipeZero: (p1: interop.PointerConvertible) => number | null;
  USBGetManufacturerStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBGetProductStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBGetSerialNumberStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBDeviceReEnumerate: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusMicroFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetIOUSBLibVersion: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetBusFrameNumberWithTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetUSBDeviceInformation: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  RequestExtraPower: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible) => number | null;
  ReturnExtraPower: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  GetExtraPowerAllocated: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetBandwidthAvailableForDevice: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetConfigurationV2: (p1: interop.PointerConvertible, p2: number, p3: boolean, p4: boolean) => number | null;
  RegisterForNotification: (p1: interop.PointerConvertible, p2: number, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number | null;
  UnregisterNotification: (p1: interop.PointerConvertible, p2: number) => number | null;
  AcknowledgeNotification: (p1: interop.PointerConvertible, p2: number) => number | null;
}

declare class IOUSBSuperSpeedPlusIsochronousEndpointCompanionDescriptor {
  constructor(init?: IOUSBSuperSpeedPlusIsochronousEndpointCompanionDescriptor);
  bLength: number;
  bDescriptorType: number;
  wReserved: number;
  dwBytesPerInterval: number;
}

declare class VPBlock {
  constructor(init?: VPBlock);
  vpBaseOffset: number;
  vpRowBytes: number;
  vpBounds: Rect;
  vpVersion: number;
  vpPackType: number;
  vpPackSize: number;
  vpHRes: number;
  vpVRes: number;
  vpPixelType: number;
  vpPixelSize: number;
  vpCmpCount: number;
  vpCmpSize: number;
  vpPlaneBytes: number;
}

declare class DCLJumpStruct {
  constructor(init?: DCLJumpStruct);
  pNextDCLCommand: interop.Pointer;
  compilerData: number;
  opcode: number;
  pJumpDCLLabel: interop.Pointer;
}

declare class applelabel {
  constructor(init?: applelabel);
  al_boot0: unknown /* const array */;
  al_magic: number;
  al_type: number;
  al_flags: number;
  al_offset: number;
  al_size: number;
  al_checksum: number;
  al_boot1: unknown /* const array */;
}

declare class IOUSBDeviceRequest {
  constructor(init?: IOUSBDeviceRequest);
  bmRequestType: number;
  bRequest: number;
  wValue: number;
  wIndex: number;
  wLength: number;
}

declare class SCSICmd_INQUIRY_Page83_RelativeTargetPort_Identifier {
  constructor(init?: SCSICmd_INQUIRY_Page83_RelativeTargetPort_Identifier);
  OBSOLETE: number;
  RELATIVE_TARGET_PORT_IDENTIFIER: number;
}

declare class IOFBDPLinkConfig {
  constructor(init?: IOFBDPLinkConfig);
  version: number;
  bitRate: number;
  __reservedA: unknown /* const array */;
  t1Time: number;
  t2Time: number;
  t3Time: number;
  idlePatterns: number;
  laneCount: number;
  voltage: number;
  preEmphasis: number;
  downspread: number;
  scrambler: number;
  maxBitRate: number;
  maxLaneCount: number;
  maxDownspread: number;
  __reservedB: unknown /* const array */;
}

declare class FWSBP2ReconnectParams {
  constructor(init?: FWSBP2ReconnectParams);
  refCon: interop.Pointer;
  generation: number;
  status: number;
  reconnectStatusBlock: interop.Pointer;
  reconnectStatusBlockLength: number;
}

declare class VDPageInfo {
  constructor(init?: VDPageInfo);
  csMode: number;
  csData: number;
  csPage: number;
  csBaseAddr: string | null;
}

declare class UserExportDCLJumpStruct {
  constructor(init?: UserExportDCLJumpStruct);
  pClientDCLStruct: number;
  pNextDCLCommand: number;
  compilerData: number;
  opcode: number;
  pJumpDCLLabel: number;
}

declare class IOFireWireWriteQuadletCommandInterface_t {
  constructor(init?: IOFireWireWriteQuadletCommandInterface_t);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  GetStatus: (p1: interop.PointerConvertible) => number | null;
  GetTransferredBytes: (p1: interop.PointerConvertible) => number | null;
  GetTargetAddress: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  SetTarget: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  SetGeneration: (p1: interop.PointerConvertible, p2: number) => void | null;
  SetCallback: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: number) => void) => void | null;
  SetRefCon: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  IsExecuting: (p1: interop.PointerConvertible) => number | null;
  Submit: (p1: interop.PointerConvertible) => number | null;
  SubmitWithRefconAndCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number) => void) => number | null;
  Cancel: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetQuads: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => void | null;
}

declare class SCSICmd_INQUIRY_PageCx_Header {
  constructor(init?: SCSICmd_INQUIRY_PageCx_Header);
  PERIPHERAL_DEVICE_TYPE: number;
  PAGE_CODE: number;
  RESERVED: number;
  PAGE_LENGTH: number;
}

declare class VDHardwareCursorDrawStateRec {
  constructor(init?: VDHardwareCursorDrawStateRec);
  csCursorX: number;
  csCursorY: number;
  csCursorVisible: number;
  csCursorSet: number;
  csReserved1: number;
  csReserved2: number;
}

declare class _IODataQueueAppendix {
  constructor(init?: _IODataQueueAppendix);
  version: number;
  msgh: mach_msg_header_t;
}

declare class DVDDiscKeyInfo {
  constructor(init?: DVDDiscKeyInfo);
  dataLength: unknown /* const array */;
  reserved: unknown /* const array */;
  discKeyStructures: unknown /* const array */;
}

declare class VDGammaInfoRec {
  constructor(init?: VDGammaInfoRec);
  csLastGammaID: number;
  csNextGammaID: number;
  csGammaPtr: string | null;
  csReserved: number;
}

declare class CDTOCDescriptor {
  constructor(init?: CDTOCDescriptor);
  session: number;
  control: number;
  adr: number;
  tno: number;
  point: number;
  address: CDMSF;
  zero: number;
  p: CDMSF;
}

declare class IOI2CConnect {
  constructor(init?: IOI2CConnect);
}

declare class IOUSBDeviceStruct300 {
  constructor(init?: IOUSBDeviceStruct300);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  CreateDeviceAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  CreateDeviceAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAsyncPort: (p1: interop.PointerConvertible) => number | null;
  USBDeviceOpen: (p1: interop.PointerConvertible) => number | null;
  USBDeviceClose: (p1: interop.PointerConvertible) => number | null;
  GetDeviceClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceSubClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProtocol: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceVendor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProduct: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceReleaseNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAddress: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceBusPowerAvailable: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceSpeed: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetNumberOfConfigurations: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetLocationID: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetConfigurationDescriptorPtr: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetConfiguration: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetConfiguration: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ResetDevice: (p1: interop.PointerConvertible) => number | null;
  DeviceRequest: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  DeviceRequestAsync: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p4: interop.PointerConvertible) => number | null;
  CreateInterfaceIterator: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  USBDeviceOpenSeize: (p1: interop.PointerConvertible) => number | null;
  DeviceRequestTO: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  DeviceRequestAsyncTO: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p4: interop.PointerConvertible) => number | null;
  USBDeviceSuspend: (p1: interop.PointerConvertible, p2: number) => number | null;
  USBDeviceAbortPipeZero: (p1: interop.PointerConvertible) => number | null;
  USBGetManufacturerStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBGetProductStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBGetSerialNumberStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBDeviceReEnumerate: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusMicroFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetIOUSBLibVersion: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetBusFrameNumberWithTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
}

declare class __IOHIDQueue {
  constructor(init?: __IOHIDQueue);
}

declare class IOOutputQueueStats {
  constructor(init?: IOOutputQueueStats);
  capacity: number;
  size: number;
  peakSize: number;
  dropCount: number;
  outputCount: number;
  retryCount: number;
  stallCount: number;
  reserved: unknown /* const array */;
}

declare class IOFireWireIsochPortInterface_t {
  constructor(init?: IOFireWireIsochPortInterface_t);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  revision: number;
  version: number;
  GetSupported: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  AllocatePort: (p1: interop.PointerConvertible, p2: interop.Enum<typeof IOFWSpeed>, p3: number) => number | null;
  ReleasePort: (p1: interop.PointerConvertible) => number | null;
  Start: (p1: interop.PointerConvertible) => number | null;
  Stop: (p1: interop.PointerConvertible) => number | null;
  SetRefCon: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  GetRefCon: (p1: interop.PointerConvertible) => interop.Pointer | null;
}

declare class IOStreamInterface_v1_t {
  constructor(init?: IOStreamInterface_v1_t);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  Version: number;
  Revision: number;
  Open: (p1: interop.PointerConvertible, p2: number) => number | null;
  Close: (p1: interop.PointerConvertible) => number | null;
  GetBufferCount: (p1: interop.PointerConvertible) => number | null;
  GetBufferInfo: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible) => number | null;
  GetOutputPort: (p1: interop.PointerConvertible) => interop.Pointer | null;
  GetInputPort: (p1: interop.PointerConvertible) => interop.Pointer | null;
  GetOutputQueue: (p1: interop.PointerConvertible) => interop.Pointer | null;
  GetInputQueue: (p1: interop.PointerConvertible) => interop.Pointer | null;
  SetOutputCallback: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, p3: interop.PointerConvertible) => number | null;
  GetRunLoopSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  AddToRunLoop: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  RemoveFromRunLoop: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  DequeueOutputEntry: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  EnqueueInputEntry: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  EnqueueInputBuffer: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number, p6: number) => number | null;
  SendInputNotification: (p1: interop.PointerConvertible, p2: number) => number | null;
  SendInputSyncNotification: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetDataBuffer: (p1: interop.PointerConvertible, p2: number) => interop.Pointer | null;
  GetDataBufferLength: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetControlBuffer: (p1: interop.PointerConvertible, p2: number) => interop.Pointer | null;
  GetControlBufferLength: (p1: interop.PointerConvertible, p2: number) => number | null;
  StartStream: (p1: interop.PointerConvertible) => number | null;
  StopStream: (p1: interop.PointerConvertible) => number | null;
  SuspendStream: (p1: interop.PointerConvertible) => number | null;
  GetMode: (p1: interop.PointerConvertible) => interop.Enum<typeof IOStreamMode> | null;
  SetMode: (p1: interop.PointerConvertible, p2: interop.Enum<typeof IOStreamMode>) => number | null;
}

declare class VDConfigurationFeatureListRec {
  constructor(init?: VDConfigurationFeatureListRec);
  csConfigFeatureList: interop.Pointer;
  csNumConfigFeatures: number;
  csReserved1: number;
  csReserved2: number;
}

declare class IODot3StatsEntry {
  constructor(init?: IODot3StatsEntry);
  alignmentErrors: number;
  fcsErrors: number;
  singleCollisionFrames: number;
  multipleCollisionFrames: number;
  sqeTestErrors: number;
  deferredTransmissions: number;
  lateCollisions: number;
  excessiveCollisions: number;
  internalMacTransmitErrors: number;
  carrierSenseErrors: number;
  frameTooLongs: number;
  internalMacReceiveErrors: number;
  etherChipSet: number;
  missedFrames: number;
}

declare class bm38Cursor {
  constructor(init?: bm38Cursor);
  image: unknown /* const array */;
  save: unknown /* const array */;
}

declare class UserExportDCLCommandStruct {
  constructor(init?: UserExportDCLCommandStruct);
  pClientDCLStruct: number;
  pNextDCLCommand: number;
  compilerData: number;
  opcode: number;
  operands: unknown /* const array */;
}

declare class dk_cd_read_disc_info_t {
  constructor(init?: dk_cd_read_disc_info_t);
  reserved0000: unknown /* const array */;
  bufferLength: number;
  buffer: interop.Pointer;
}

declare class VDResolutionInfoRec {
  constructor(init?: VDResolutionInfoRec);
  csPreviousDisplayModeID: number;
  csDisplayModeID: number;
  csHorizontalPixels: number;
  csVerticalLines: number;
  csRefreshRate: number;
  csMaxDepthMode: number;
  csResolutionFlags: number;
  csReserved: number;
}

declare class dk_dvd_read_disc_info_t {
  constructor(init?: dk_dvd_read_disc_info_t);
  reserved0000: unknown /* const array */;
  bufferLength: number;
  buffer: interop.Pointer;
}

declare class IONotificationPort {
  constructor(init?: IONotificationPort);
}

declare class IOUSBInterfaceStruct398 {
  constructor(init?: IOUSBInterfaceStruct398);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  CreateInterfaceAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  CreateInterfaceAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncPort: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceOpen: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceClose: (p1: interop.PointerConvertible) => number | null;
  GetInterfaceClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceSubClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceProtocol: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceVendor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProduct: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceReleaseNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetConfigurationValue: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetAlternateSetting: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetNumEndpoints: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetLocationID: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDevice: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetAlternateInterface: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ControlRequest: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  GetPipeProperties: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  GetPipeStatus: (p1: interop.PointerConvertible, p2: number) => number | null;
  AbortPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ResetPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ClearPipeStall: (p1: interop.PointerConvertible, p2: number) => number | null;
  ReadPipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  WritePipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number) => number | null;
  ReadPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  WritePipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  ReadIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WriteIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  ControlRequestTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  ReadPipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: number) => number | null;
  WritePipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number) => number | null;
  ReadPipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WritePipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  USBInterfaceGetStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBInterfaceOpenSeize: (p1: interop.PointerConvertible) => number | null;
  ClearPipeStallBothEnds: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetPipePolicy: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number) => number | null;
  GetBandwidthAvailable: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetEndpointProperties: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  LowLatencyReadIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  LowLatencyWriteIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  LowLatencyCreateBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => number | null;
  LowLatencyDestroyBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetBusMicroFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetFrameListTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetIOUSBLibVersion: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  FindNextAssociatedDescriptor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => interop.Pointer | null;
  FindNextAltInterface: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => interop.Pointer | null;
  GetBusFrameNumberWithTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
}

declare class VDConvolutionInfoRec {
  constructor(init?: VDConvolutionInfoRec);
  csDisplayModeID: number;
  csDepthMode: number;
  csPage: number;
  csFlags: number;
  csReserved: number;
}

declare class IOFireWirePHYCommandInterface_t {
  constructor(init?: IOFireWirePHYCommandInterface_t);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  GetStatus: (p1: interop.PointerConvertible) => number | null;
  GetTransferredBytes: (p1: interop.PointerConvertible) => number | null;
  GetTargetAddress: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  SetTarget: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  SetGeneration: (p1: interop.PointerConvertible, p2: number) => void | null;
  SetCallback: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: number) => void) => void | null;
  SetRefCon: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  IsExecuting: (p1: interop.PointerConvertible) => number | null;
  Submit: (p1: interop.PointerConvertible) => number | null;
  SubmitWithRefconAndCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number) => void) => number | null;
  Cancel: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetBuffer: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void | null;
  GetBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void | null;
  SetMaxPacket: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetFlags: (p1: interop.PointerConvertible, p2: number) => void | null;
  SetTimeoutDuration: (p1: interop.PointerConvertible, p2: number) => void | null;
  SetMaxRetryCount: (p1: interop.PointerConvertible, p2: number) => void | null;
  GetAckCode: (p1: interop.PointerConvertible) => number | null;
  GetResponseCode: (p1: interop.PointerConvertible) => number | null;
  SetMaxPacketSpeed: (p1: interop.PointerConvertible, p2: interop.Enum<typeof IOFWSpeed>) => void | null;
  GetRefCon: (p1: interop.PointerConvertible) => interop.Pointer | null;
  SetDataQuads: (p1: interop.PointerConvertible, p2: number, p3: number) => void | null;
}

declare class VDCommunicationRec {
  constructor(init?: VDCommunicationRec);
  csBusID: number;
  csCommFlags: number;
  csMinReplyDelay: number;
  csReserved2: number;
  csSendAddress: number;
  csSendType: number;
  csSendBuffer: interop.Pointer;
  csSendSize: number;
  csReplyAddress: number;
  csReplyType: number;
  csReplyBuffer: interop.Pointer;
  csReplySize: number;
  csReserved3: number;
  csReserved4: number;
  csReserved5: number;
  csReserved6: number;
}

declare class IOFireWireLibIRMAllocationInterface_t {
  constructor(init?: IOFireWireLibIRMAllocationInterface_t);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  setReleaseIRMResourcesOnFree: (p1: interop.PointerConvertible, p2: number) => void | null;
  allocateIsochResources: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  deallocateIsochResources: (p1: interop.PointerConvertible) => number | null;
  areIsochResourcesAllocated: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  NotificationIsOn: (p1: interop.PointerConvertible) => number | null;
  TurnOnNotification: (p1: interop.PointerConvertible) => number | null;
  TurnOffNotification: (p1: interop.PointerConvertible) => void | null;
  SetRefCon: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  GetRefCon: (p1: interop.PointerConvertible) => interop.Pointer | null;
}

declare class IOUSBInterfaceAssociationDescriptor {
  constructor(init?: IOUSBInterfaceAssociationDescriptor);
  bLength: number;
  bDescriptorType: number;
  bFirstInterface: number;
  bInterfaceCount: number;
  bFunctionClass: number;
  bFunctionSubClass: number;
  bFunctionProtocol: number;
  iFunction: number;
}

declare class IODot3TxExtraEntry {
  constructor(init?: IODot3TxExtraEntry);
  underruns: number;
  jabbers: number;
  phyErrors: number;
  timeouts: number;
  interrupts: number;
  resets: number;
  resourceErrors: number;
  reserved: unknown /* const array */;
}

declare class VDDisplayConnectInfoRec {
  constructor(init?: VDDisplayConnectInfoRec);
  csDisplayType: number;
  csConnectTaggedType: number;
  csConnectTaggedData: number;
  csConnectFlags: number;
  csDisplayComponent: number;
  csConnectReserved: number;
}

declare class IORPCMessage {
  constructor(init?: IORPCMessage);
  msgid: number;
  flags: number;
  objectRefs: number;
  objects: unknown /* const array */;
}

declare class _NXEventExtension {
  constructor(init?: _NXEventExtension);
  flags: number;
  audit: audit_token_t;
}

declare class IOHIDCompletion {
  constructor(init?: IOHIDCompletion);
  target: interop.Pointer;
  action: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => void | null;
  parameter: interop.Pointer;
}

declare class IOUSBInterfaceStruct700 {
  constructor(init?: IOUSBInterfaceStruct700);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  CreateInterfaceAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  CreateInterfaceAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncPort: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceOpen: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceClose: (p1: interop.PointerConvertible) => number | null;
  GetInterfaceClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceSubClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceProtocol: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceVendor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProduct: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceReleaseNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetConfigurationValue: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetAlternateSetting: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetNumEndpoints: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetLocationID: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDevice: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetAlternateInterface: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ControlRequest: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  GetPipeProperties: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  GetPipeStatus: (p1: interop.PointerConvertible, p2: number) => number | null;
  AbortPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ResetPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ClearPipeStall: (p1: interop.PointerConvertible, p2: number) => number | null;
  ReadPipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  WritePipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number) => number | null;
  ReadPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  WritePipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  ReadIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WriteIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  ControlRequestTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  ReadPipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: number) => number | null;
  WritePipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number) => number | null;
  ReadPipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WritePipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  USBInterfaceGetStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBInterfaceOpenSeize: (p1: interop.PointerConvertible) => number | null;
  ClearPipeStallBothEnds: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetPipePolicy: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number) => number | null;
  GetBandwidthAvailable: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetEndpointProperties: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  LowLatencyReadIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  LowLatencyWriteIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  LowLatencyCreateBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => number | null;
  LowLatencyDestroyBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetBusMicroFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetFrameListTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetIOUSBLibVersion: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  FindNextAssociatedDescriptor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => interop.Pointer | null;
  FindNextAltInterface: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => interop.Pointer | null;
  GetBusFrameNumberWithTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetPipePropertiesV2: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible, p8: interop.PointerConvertible, p9: interop.PointerConvertible, p10: interop.PointerConvertible) => number | null;
  GetPipePropertiesV3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetEndpointPropertiesV3: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SupportsStreams: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  CreateStreams: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  GetConfiguredStreams: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ReadStreamsPipeTO: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: number, p7: number) => number | null;
  WriteStreamsPipeTO: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: number, p6: number, p7: number) => number | null;
  ReadStreamsPipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: number, p6: number, p7: number, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  WriteStreamsPipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: number, p6: number, p7: number, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  AbortStreamsPipe: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  RegisterForNotification: (p1: interop.PointerConvertible, p2: number, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number | null;
  UnregisterNotification: (p1: interop.PointerConvertible, p2: number) => number | null;
  AcknowledgeNotification: (p1: interop.PointerConvertible, p2: number) => number | null;
  RegisterDriver: (p1: interop.PointerConvertible) => number | null;
}

declare class VDVideoParametersInfoRec {
  constructor(init?: VDVideoParametersInfoRec);
  csDisplayModeID: number;
  csDepthMode: number;
  csVPBlockPtr: interop.Pointer;
  csPageCount: number;
  csDeviceType: number;
  csDepthFlags: number;
}

declare class IOHIDDeviceTimeStampedDeviceInterface {
  constructor(init?: IOHIDDeviceTimeStampedDeviceInterface);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  open: (p1: interop.PointerConvertible, p2: number) => number | null;
  close: (p1: interop.PointerConvertible, p2: number) => number | null;
  getProperty: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  setProperty: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  getAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  copyMatchingElements: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number) => number | null;
  setValue: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void, p6: interop.PointerConvertible, p7: number) => number | null;
  getValue: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void, p6: interop.PointerConvertible, p7: number) => number | null;
  setInputReportCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.Enum<typeof IOHIDReportType>, p5: number, p6: interop.PointerConvertible, p7: number) => void, p5: interop.PointerConvertible, p6: number) => number | null;
  setReport: (p1: interop.PointerConvertible, p2: interop.Enum<typeof IOHIDReportType>, p3: number, p4: interop.PointerConvertible, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.Enum<typeof IOHIDReportType>, p5: number, p6: interop.PointerConvertible, p7: number) => void, p8: interop.PointerConvertible, p9: number) => number | null;
  getReport: (p1: interop.PointerConvertible, p2: interop.Enum<typeof IOHIDReportType>, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.Enum<typeof IOHIDReportType>, p5: number, p6: interop.PointerConvertible, p7: number) => void, p8: interop.PointerConvertible, p9: number) => number | null;
  setInputReportWithTimeStampCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.Enum<typeof IOHIDReportType>, p5: number, p6: interop.PointerConvertible, p7: number, p8: number) => void, p5: interop.PointerConvertible, p6: number) => number | null;
}

declare class IOUSBInterfaceStruct800 {
  constructor(init?: IOUSBInterfaceStruct800);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  CreateInterfaceAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  CreateInterfaceAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceAsyncPort: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceOpen: (p1: interop.PointerConvertible) => number | null;
  USBInterfaceClose: (p1: interop.PointerConvertible) => number | null;
  GetInterfaceClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceSubClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceProtocol: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceVendor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProduct: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceReleaseNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetConfigurationValue: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetInterfaceNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetAlternateSetting: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetNumEndpoints: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetLocationID: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDevice: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetAlternateInterface: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ControlRequest: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  GetPipeProperties: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  GetPipeStatus: (p1: interop.PointerConvertible, p2: number) => number | null;
  AbortPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ResetPipe: (p1: interop.PointerConvertible, p2: number) => number | null;
  ClearPipeStall: (p1: interop.PointerConvertible, p2: number) => number | null;
  ReadPipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  WritePipe: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number) => number | null;
  ReadPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  WritePipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p6: interop.PointerConvertible) => number | null;
  ReadIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WriteIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  ControlRequestTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ControlRequestAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p5: interop.PointerConvertible) => number | null;
  ReadPipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: number) => number | null;
  WritePipeTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number) => number | null;
  ReadPipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  WritePipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p8: interop.PointerConvertible) => number | null;
  USBInterfaceGetStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBInterfaceOpenSeize: (p1: interop.PointerConvertible) => number | null;
  ClearPipeStallBothEnds: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetPipePolicy: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number) => number | null;
  GetBandwidthAvailable: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetEndpointProperties: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  LowLatencyReadIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  LowLatencyWriteIsochPipeAsync: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  LowLatencyCreateBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => number | null;
  LowLatencyDestroyBuffer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetBusMicroFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetFrameListTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetIOUSBLibVersion: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  FindNextAssociatedDescriptor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => interop.Pointer | null;
  FindNextAltInterface: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => interop.Pointer | null;
  GetBusFrameNumberWithTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetPipePropertiesV2: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible, p8: interop.PointerConvertible, p9: interop.PointerConvertible, p10: interop.PointerConvertible) => number | null;
  GetPipePropertiesV3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetEndpointPropertiesV3: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SupportsStreams: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  CreateStreams: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  GetConfiguredStreams: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  ReadStreamsPipeTO: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: number, p7: number) => number | null;
  WriteStreamsPipeTO: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: number, p6: number, p7: number) => number | null;
  ReadStreamsPipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: number, p6: number, p7: number, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  WriteStreamsPipeAsyncTO: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: number, p6: number, p7: number, p8: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p9: interop.PointerConvertible) => number | null;
  AbortStreamsPipe: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  RegisterForNotification: (p1: interop.PointerConvertible, p2: number, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number | null;
  UnregisterNotification: (p1: interop.PointerConvertible, p2: number) => number | null;
  AcknowledgeNotification: (p1: interop.PointerConvertible, p2: number) => number | null;
  RegisterDriver: (p1: interop.PointerConvertible) => number | null;
  SetDeviceIdlePolicy: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetPipeIdlePolicy: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
}

declare class _IOAudioTimeStamp {
  constructor(init?: _IOAudioTimeStamp);
  fSampleTime: number;
  fHostTime: number;
  fRateScalar: number;
  fWordClockTime: number;
  fSMPTETime: _IOAudioSMPTETime;
  fFlags: number;
  fReserved: number;
}

declare class BDDiscInfo {
  constructor(init?: BDDiscInfo);
  dataLength: number;
  discStatus: number;
  stateOfLastSession: number;
  erasable: number;
  dataType: number;
  reserved2: number;
  numberOfSessionsLSB: number;
  firstTrackNumberInLastSessionLSB: number;
  lastTrackNumberInLastSessionLSB: number;
  reserved4: unknown /* const array */;
  numberOfSessionsMSB: number;
  firstTrackNumberInLastSessionMSB: number;
  lastTrackNumberInLastSessionMSB: number;
  reserved6: unknown /* const array */;
}

declare class ATASMARTLogEntry {
  constructor(init?: ATASMARTLogEntry);
  numberOfSectors: number;
  reserved: number;
}

declare class __IOStreamBufferQueueEntry {
  constructor(init?: __IOStreamBufferQueueEntry);
  bufferID: number;
  dataOffset: number;
  dataLength: number;
  controlOffset: number;
  controlLength: number;
  reserved: unknown /* const array */;
}

declare class _IOFireWireAVCLibProtocolInterface {
  constructor(init?: _IOFireWireAVCLibProtocolInterface);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  addCallbackDispatcherToRunLoop: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  removeCallbackDispatcherFromRunLoop: (p1: interop.PointerConvertible) => void | null;
  setMessageCallback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void) => void | null;
  setAVCRequestCallback: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: number, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number) => number | null;
  allocateInputPlug: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number, p6: number) => void, p4: interop.PointerConvertible) => number | null;
  freeInputPlug: (p1: interop.PointerConvertible, p2: number) => void | null;
  readInputPlug: (p1: interop.PointerConvertible, p2: number) => number | null;
  updateInputPlug: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number) => number | null;
  allocateOutputPlug: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number, p6: number) => void, p4: interop.PointerConvertible) => number | null;
  freeOutputPlug: (p1: interop.PointerConvertible, p2: number) => void | null;
  readOutputPlug: (p1: interop.PointerConvertible, p2: number) => number | null;
  updateOutputPlug: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number) => number | null;
  readOutputMasterPlug: (p1: interop.PointerConvertible) => number | null;
  updateOutputMasterPlug: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  readInputMasterPlug: (p1: interop.PointerConvertible) => number | null;
  updateInputMasterPlug: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  publishAVCUnitDirectory: (p1: interop.PointerConvertible) => number | null;
  installAVCCommandHandler: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.Enum<typeof IOFWSpeed>, p5: interop.PointerConvertible, p6: number) => number) => number | null;
  sendAVCResponse: (p1: interop.PointerConvertible, p2: number, p3: number, p4: string, p5: number) => number | null;
  addSubunit: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: interop.PointerConvertible, p6: (p1: interop.PointerConvertible, p2: number, p3: interop.Enum<typeof IOFWAVCPlugTypes>, p4: number, p5: interop.Enum<typeof IOFWAVCSubunitPlugMessages>, p6: number) => number, p7: interop.PointerConvertible) => number | null;
  setSubunitPlugSignalFormat: (p1: interop.PointerConvertible, p2: number, p3: interop.Enum<typeof IOFWAVCPlugTypes>, p4: number, p5: number) => number | null;
  getSubunitPlugSignalFormat: (p1: interop.PointerConvertible, p2: number, p3: interop.Enum<typeof IOFWAVCPlugTypes>, p4: number, p5: interop.PointerConvertible) => number | null;
  connectTargetPlugs: (p1: interop.PointerConvertible, p2: number, p3: interop.Enum<typeof IOFWAVCPlugTypes>, p4: interop.PointerConvertible, p5: number, p6: interop.Enum<typeof IOFWAVCPlugTypes>, p7: interop.PointerConvertible, p8: boolean, p9: boolean) => number | null;
  disconnectTargetPlugs: (p1: interop.PointerConvertible, p2: number, p3: interop.Enum<typeof IOFWAVCPlugTypes>, p4: number, p5: number, p6: interop.Enum<typeof IOFWAVCPlugTypes>, p7: number) => number | null;
  getTargetPlugConnection: (p1: interop.PointerConvertible, p2: number, p3: interop.Enum<typeof IOFWAVCPlugTypes>, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible, p8: interop.PointerConvertible, p9: interop.PointerConvertible) => number | null;
}

declare class DDMap {
  constructor(init?: DDMap);
  ddBlock: number;
  ddSize: number;
  ddType: number;
}

declare class DVDPhysicalFormatInfo {
  constructor(init?: DVDPhysicalFormatInfo);
  dataLength: unknown /* const array */;
  reserved: unknown /* const array */;
  partVersion: number;
  bookType: number;
  minimumRate: number;
  discSize: number;
  layerType: number;
  trackPath: number;
  numberOfLayers: number;
  reserved2: number;
  trackDensity: number;
  linearDensity: number;
  zero1: number;
  startingPhysicalSectorNumberOfDataArea: unknown /* const array */;
  zero2: number;
  endPhysicalSectorNumberOfDataArea: unknown /* const array */;
  zero3: number;
  endSectorNumberInLayerZero: unknown /* const array */;
  reserved1: number;
  bcaFlag: number;
  mediaSpecific: unknown /* const array */;
}

declare class SCSICmd_INQUIRY_PageB2_Data {
  constructor(init?: SCSICmd_INQUIRY_PageB2_Data);
  PERIPHERAL_DEVICE_TYPE: number;
  PAGE_CODE: number;
  PAGE_LENGTH: number;
  THRESHOLD_EXPONENT: number;
  LBP_FLAGS: number;
  MINIMUM_PERCENTAGE: number;
  THRESHOLD_PERCENTAGE: number;
}

declare class IOI2CRequest {
  constructor(init?: IOI2CRequest);
  sendTransactionType: number;
  replyTransactionType: number;
  sendAddress: number;
  replyAddress: number;
  sendSubAddress: number;
  replySubAddress: number;
  __reservedA: unknown /* const array */;
  minReplyDelay: number;
  result: number;
  commFlags: number;
  __padA: number;
  sendBytes: number;
  __reservedB: unknown /* const array */;
  __padB: number;
  replyBytes: number;
  completion: (p1: interop.PointerConvertible) => void | null;
  sendBuffer: number;
  replyBuffer: number;
  __reservedC: unknown /* const array */;
}

declare class bm12Cursor {
  constructor(init?: bm12Cursor);
  image: unknown /* const array */;
  mask: unknown /* const array */;
  save: unknown /* const array */;
}

declare class VDSetEntryRecord {
  constructor(init?: VDSetEntryRecord);
  csTable: interop.Pointer;
  csStart: number;
  csCount: number;
}

declare class evioLLEvent {
  constructor(init?: evioLLEvent);
  setCursor: number;
  type: number;
  location: IOGPoint;
  data: NXEventData;
  setFlags: number;
  flags: number;
}

declare class gpt_hdr {
  constructor(init?: gpt_hdr);
  hdr_sig: unknown /* const array */;
  hdr_revision: number;
  hdr_size: number;
  hdr_crc_self: number;
  __reserved: number;
  hdr_lba_self: number;
  hdr_lba_alt: number;
  hdr_lba_start: number;
  hdr_lba_end: number;
  hdr_uuid: unknown /* const array */;
  hdr_lba_table: number;
  hdr_entries: number;
  hdr_entsz: number;
  hdr_crc_table: number;
  padding: number;
}

declare class _NXSize {
  constructor(init?: _NXSize);
  width: number;
  height: number;
}

declare class MMCDeviceInterface {
  constructor(init?: MMCDeviceInterface);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  version: number;
  revision: number;
  Inquiry: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number | null;
  TestUnitReady: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetPerformance: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: number, p9: interop.PointerConvertible, p10: interop.PointerConvertible) => number | null;
  GetConfiguration: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: number, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  ModeSense10: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number, p6: interop.PointerConvertible, p7: number, p8: interop.PointerConvertible, p9: interop.PointerConvertible) => number | null;
  SetWriteParametersModePage: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number | null;
  GetTrayState: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetTrayState: (p1: interop.PointerConvertible, p2: number) => number | null;
  ReadTableOfContents: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: interop.PointerConvertible, p6: number, p7: interop.PointerConvertible, p8: interop.PointerConvertible) => number | null;
  ReadDiscInformation: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number | null;
  ReadTrackInformation: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: number, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  ReadDVDStructure: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: interop.PointerConvertible, p6: number, p7: interop.PointerConvertible, p8: interop.PointerConvertible) => number | null;
  GetSCSITaskDeviceInterface: (p1: interop.PointerConvertible) => interop.Pointer | null;
  GetPerformanceV2: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number, p6: interop.PointerConvertible, p7: number, p8: interop.PointerConvertible, p9: interop.PointerConvertible) => number | null;
  SetCDSpeed: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number | null;
  ReadFormatCapacities: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number | null;
  ReadDiscStructure: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number, p6: interop.PointerConvertible, p7: number, p8: interop.PointerConvertible, p9: interop.PointerConvertible) => number | null;
  ReadDiscInformationV2: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible) => number | null;
  ReadTrackInformationV2: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: interop.PointerConvertible, p6: number, p7: interop.PointerConvertible, p8: interop.PointerConvertible) => number | null;
  SetStreaming: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible) => number | null;
}

declare class dk_bd_read_disc_info_t {
  constructor(init?: dk_bd_read_disc_info_t);
  reserved0000: unknown /* const array */;
  bufferLength: number;
  buffer: interop.Pointer;
}

declare class IODisplayScalerInformation {
  constructor(init?: IODisplayScalerInformation);
  __reservedA: unknown /* const array */;
  version: number;
  __reservedB: unknown /* const array */;
  scalerFeatures: number;
  maxHorizontalPixels: number;
  maxVerticalPixels: number;
  __reservedC: unknown /* const array */;
}

declare class IOVideoDeviceInterface_v1_t {
  constructor(init?: IOVideoDeviceInterface_v1_t);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  Version: number;
  Revision: number;
  Open: (p1: interop.PointerConvertible, p2: number) => number | null;
  Close: (p1: interop.PointerConvertible) => number | null;
  GetNotificationPort: (p1: interop.PointerConvertible) => interop.Pointer | null;
  SetNotificationCallback: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void, p3: interop.PointerConvertible) => number | null;
  SetControlValue: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible) => number | null;
  SetStreamFormat: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetRunLoopSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  AddToRunLoop: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  RemoveFromRunLoop: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  CreateStreamInterface: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: boolean, p5: interop.PointerConvertible) => number | null;
  ReleaseStreamInterface: (p1: interop.PointerConvertible, p2: boolean, p3: interop.PointerConvertible) => number | null;
}

declare class SCSICmd_INQUIRY_Page89_Data {
  constructor(init?: SCSICmd_INQUIRY_Page89_Data);
  PERIPHERAL_DEVICE_TYPE: number;
  PAGE_CODE: number;
  PAGE_LENGTH: number;
  Reserved: number;
  SAT_VENDOR_IDENTIFICATION: unknown /* const array */;
  SAT_PRODUCT_IDENTIFICATION: unknown /* const array */;
  SAT_PRODUCT_REVISION_LEVEL: unknown /* const array */;
  ATA_DEVICE_SIGNATURE: unknown /* const array */;
  COMMAND_CODE: number;
  Reserved2: unknown /* const array */;
  IDENTIFY_DATA: unknown /* const array */;
}

declare class IOHardwareCursorDescriptor {
  constructor(init?: IOHardwareCursorDescriptor);
  majorVersion: number;
  minorVersion: number;
  height: number;
  width: number;
  bitDepth: number;
  maskBitDepth: number;
  numColors: number;
  colorEncodings: interop.Pointer;
  flags: number;
  supportedSpecialEncodings: number;
  specialEncodings: unknown /* const array */;
}

declare class IOUSBDeviceStruct245 {
  constructor(init?: IOUSBDeviceStruct245);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  CreateDeviceAsyncEventSource: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAsyncEventSource: (p1: interop.PointerConvertible) => interop.Pointer | null;
  CreateDeviceAsyncPort: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAsyncPort: (p1: interop.PointerConvertible) => number | null;
  USBDeviceOpen: (p1: interop.PointerConvertible) => number | null;
  USBDeviceClose: (p1: interop.PointerConvertible) => number | null;
  GetDeviceClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceSubClass: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProtocol: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceVendor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceProduct: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceReleaseNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceAddress: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceBusPowerAvailable: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetDeviceSpeed: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetNumberOfConfigurations: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetLocationID: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetConfigurationDescriptorPtr: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetConfiguration: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SetConfiguration: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ResetDevice: (p1: interop.PointerConvertible) => number | null;
  DeviceRequest: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  DeviceRequestAsync: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p4: interop.PointerConvertible) => number | null;
  CreateInterfaceIterator: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  USBDeviceOpenSeize: (p1: interop.PointerConvertible) => number | null;
  DeviceRequestTO: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  DeviceRequestAsyncTO: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p4: interop.PointerConvertible) => number | null;
  USBDeviceSuspend: (p1: interop.PointerConvertible, p2: number) => number | null;
  USBDeviceAbortPipeZero: (p1: interop.PointerConvertible) => number | null;
  USBGetManufacturerStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBGetProductStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBGetSerialNumberStringIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  USBDeviceReEnumerate: (p1: interop.PointerConvertible, p2: number) => number | null;
  GetBusMicroFrameNumber: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  GetIOUSBLibVersion: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
}

declare class IOAccelSize {
  constructor(init?: IOAccelSize);
  w: number;
  h: number;
}

declare class IOUSBFindInterfaceRequest {
  constructor(init?: IOUSBFindInterfaceRequest);
  bInterfaceClass: number;
  bInterfaceSubClass: number;
  bInterfaceProtocol: number;
  bAlternateSetting: number;
}

declare class UserExportDCLCallProcStruct {
  constructor(init?: UserExportDCLCallProcStruct);
  pClientDCLStruct: number;
  pNextDCLCommand: number;
  compilerData: number;
  opcode: number;
  proc: number;
  procData: number;
}

declare class _IOBlitMemory {
  constructor(init?: _IOBlitMemory);
}

type unnamed_15250897639706774685Descriptor = 
  | { point: _NXTabletPointData }
  | { proximity: _NXTabletProximityData };

declare class unnamed_15250897639706774685 {
  constructor(init?: unnamed_15250897639706774685Descriptor);
  point: _NXTabletPointData;
  proximity: _NXTabletProximityData;
}

type unnamed_10910005987556194291Descriptor = 
  | { session: number }
  | { track: number };

declare class unnamed_10910005987556194291 {
  constructor(init?: unnamed_10910005987556194291Descriptor);
  session: number;
  track: number;
}

type unnamed_17923855300358106514Descriptor = 
  | { bytes: interop.PointerConvertible }
  | { ref: interop.PointerConvertible };

declare class unnamed_17923855300358106514 {
  constructor(init?: unnamed_17923855300358106514Descriptor);
  bytes: interop.Pointer;
  ref: interop.Pointer;
}

type IOUSBHIDDataDescriptor = 
  | { kbd: IOUSBKeyboardData }
  | { mouse: IOUSBMouseData };

declare class IOUSBHIDData {
  constructor(init?: IOUSBHIDDataDescriptor);
  kbd: IOUSBKeyboardData;
  mouse: IOUSBMouseData;
}

type unnamed_2601017340886590716Descriptor = 
  | { point: _NXTabletPointData }
  | { proximity: _NXTabletProximityData };

declare class unnamed_2601017340886590716 {
  constructor(init?: unnamed_2601017340886590716Descriptor);
  point: _NXTabletPointData;
  proximity: _NXTabletProximityData;
}

type NXEventDataDescriptor = 
  | { mouse: unnamed_13441805532002983772 }
  | { mouseMove: unnamed_175957732564600561 }
  | { key: unnamed_5100795372900712712 }
  | { tracking: unnamed_9873895420725477293 }
  | { scrollWheel: unnamed_4619205928367467519 }
  | { zoom: unnamed_4619205928367467519 }
  | { compound: unnamed_5759232563165710455 }
  | { tablet: unnamed_9603799558256710164 }
  | { proximity: unnamed_7971714628260465398 };

declare class NXEventData {
  constructor(init?: NXEventDataDescriptor);
  mouse: unnamed_13441805532002983772;
  mouseMove: unnamed_175957732564600561;
  key: unnamed_5100795372900712712;
  tracking: unnamed_9873895420725477293;
  scrollWheel: unnamed_4619205928367467519;
  zoom: unnamed_4619205928367467519;
  compound: unnamed_5759232563165710455;
  tablet: unnamed_9603799558256710164;
  proximity: unnamed_7971714628260465398;
}

type IOFBHDRMetaDataDescriptor = 
  | { v1: IOFBHDRMetaDataV1 };

declare class IOFBHDRMetaData {
  constructor(init?: IOFBHDRMetaDataDescriptor);
  v1: IOFBHDRMetaDataV1;
}

type unnamed_12847566531770991247Descriptor = 
  | { bw: bm12Cursor }
  | { bw8: bm18Cursor }
  | { rgb: bm34Cursor }
  | { rgb24: bm38Cursor };

declare class unnamed_12847566531770991247 {
  constructor(init?: unnamed_12847566531770991247Descriptor);
  bw: bm12Cursor;
  bw8: bm18Cursor;
  rgb: bm34Cursor;
  rgb24: bm38Cursor;
}

type unnamed_14650194066440877064Descriptor = 
  | { v1: IODetailedTimingInformationV1 }
  | { v2: IODetailedTimingInformationV2 };

declare class unnamed_14650194066440877064 {
  constructor(init?: unnamed_14650194066440877064Descriptor);
  v1: IODetailedTimingInformationV1;
  v2: IODetailedTimingInformationV2;
}

type unnamed_11666218996679898393Descriptor = 
  | { F: unknown /* const array */ }
  | { L: unknown /* const array */ }
  | { S: unknown /* const array */ }
  | { C: unknown /* const array */ };

declare class unnamed_11666218996679898393 {
  constructor(init?: unnamed_11666218996679898393Descriptor);
  F: unknown /* const array */;
  L: unknown /* const array */;
  S: unknown /* const array */;
  C: unknown /* const array */;
}

declare function IOMainPort(bootstrapPort: number, mainPort: interop.PointerConvertible): number;

declare function IOMasterPort(bootstrapPort: number, mainPort: interop.PointerConvertible): number;

declare function IONotificationPortCreate(mainPort: number): interop.Pointer;

declare function IONotificationPortDestroy(notify: interop.PointerConvertible): void;

declare function IONotificationPortGetRunLoopSource(notify: interop.PointerConvertible): interop.Object;

declare function IONotificationPortGetMachPort(notify: interop.PointerConvertible): number;

declare function IONotificationPortSetImportanceReceiver(notify: interop.PointerConvertible): number;

declare function IONotificationPortSetDispatchQueue(notify: interop.PointerConvertible, queue: NSObject): void;

declare function IODispatchCalloutFromMessage(unused: interop.PointerConvertible, msg: interop.PointerConvertible, reference: interop.PointerConvertible): void;

declare function IOCreateReceivePort(msgType: number, recvPort: interop.PointerConvertible): number;

declare function IOObjectRelease(object: number): number;

declare function IOObjectRetain(object: number): number;

declare function IOObjectGetClass(object: number, className: unknown /* const array */): number;

declare function IOObjectCopyClass(object: number): interop.Object;

declare function IOObjectCopySuperclassForClass(classname: interop.Object): interop.Object;

declare function IOObjectCopyBundleIdentifierForClass(classname: interop.Object): interop.Object;

declare function IOObjectConformsTo(object: number, className: unknown /* const array */): number;

declare function IOObjectIsEqualTo(object: number, anObject: number): number;

declare function IOObjectGetKernelRetainCount(object: number): number;

declare function IOObjectGetUserRetainCount(object: number): number;

declare function IOObjectGetRetainCount(object: number): number;

declare function IOIteratorNext(iterator: number): number;

declare function IOIteratorReset(iterator: number): void;

declare function IOIteratorIsValid(iterator: number): number;

declare function IOServiceGetMatchingService(mainPort: number, matching: interop.Object): number;

declare function IOServiceGetMatchingServices(mainPort: number, matching: interop.Object, existing: interop.PointerConvertible): number;

declare function IOServiceAddNotification(mainPort: number, notificationType: unknown /* const array */, matching: interop.Object, wakePort: number, reference: number, notification: interop.PointerConvertible): number;

declare function IOServiceAddMatchingNotification(notifyPort: interop.PointerConvertible, notificationType: unknown /* const array */, matching: interop.Object, callback: (p1: interop.PointerConvertible, p2: number) => void, refCon: interop.PointerConvertible, notification: interop.PointerConvertible): number;

declare function IOServiceAddInterestNotification(notifyPort: interop.PointerConvertible, service: number, interestType: unknown /* const array */, callback: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible) => void, refCon: interop.PointerConvertible, notification: interop.PointerConvertible): number;

declare function IOServiceMatchPropertyTable(service: number, matching: interop.Object, matches: interop.PointerConvertible): number;

declare function IOServiceGetBusyState(service: number, busyState: interop.PointerConvertible): number;

declare function IOServiceWaitQuiet(service: number, waitTime: interop.PointerConvertible): number;

declare function IOKitGetBusyState(mainPort: number, busyState: interop.PointerConvertible): number;

declare function IOKitWaitQuiet(mainPort: number, waitTime: interop.PointerConvertible): number;

declare function IOServiceOpen(service: number, owningTask: number, type: number, connect: interop.PointerConvertible): number;

declare function IOServiceRequestProbe(service: number, options: number): number;

declare function IOServiceAuthorize(service: number, options: number): number;

declare function IOServiceOpenAsFileDescriptor(service: number, oflag: number): number;

declare function IOServiceClose(connect: number): number;

declare function IOConnectAddRef(connect: number): number;

declare function IOConnectRelease(connect: number): number;

declare function IOConnectGetService(connect: number, service: interop.PointerConvertible): number;

declare function IOConnectSetNotificationPort(connect: number, type: number, port: number, reference: number): number;

declare function IOConnectMapMemory(connect: number, memoryType: number, intoTask: number, atAddress: interop.PointerConvertible, ofSize: interop.PointerConvertible, options: number): number;

declare function IOConnectMapMemory64(connect: number, memoryType: number, intoTask: number, atAddress: interop.PointerConvertible, ofSize: interop.PointerConvertible, options: number): number;

declare function IOConnectUnmapMemory(connect: number, memoryType: number, fromTask: number, atAddress: number): number;

declare function IOConnectUnmapMemory64(connect: number, memoryType: number, fromTask: number, atAddress: number): number;

declare function IOConnectSetCFProperties(connect: number, properties: interop.Object): number;

declare function IOConnectSetCFProperty(connect: number, propertyName: interop.Object, property: interop.Object): number;

declare function IOConnectCallMethod(connection: number, selector: number, input: interop.PointerConvertible, inputCnt: number, inputStruct: interop.PointerConvertible, inputStructCnt: number, output: interop.PointerConvertible, outputCnt: interop.PointerConvertible, outputStruct: interop.PointerConvertible, outputStructCnt: interop.PointerConvertible): number;

declare function IOConnectCallAsyncMethod(connection: number, selector: number, wake_port: number, reference: interop.PointerConvertible, referenceCnt: number, input: interop.PointerConvertible, inputCnt: number, inputStruct: interop.PointerConvertible, inputStructCnt: number, output: interop.PointerConvertible, outputCnt: interop.PointerConvertible, outputStruct: interop.PointerConvertible, outputStructCnt: interop.PointerConvertible): number;

declare function IOConnectCallStructMethod(connection: number, selector: number, inputStruct: interop.PointerConvertible, inputStructCnt: number, outputStruct: interop.PointerConvertible, outputStructCnt: interop.PointerConvertible): number;

declare function IOConnectCallAsyncStructMethod(connection: number, selector: number, wake_port: number, reference: interop.PointerConvertible, referenceCnt: number, inputStruct: interop.PointerConvertible, inputStructCnt: number, outputStruct: interop.PointerConvertible, outputStructCnt: interop.PointerConvertible): number;

declare function IOConnectCallScalarMethod(connection: number, selector: number, input: interop.PointerConvertible, inputCnt: number, output: interop.PointerConvertible, outputCnt: interop.PointerConvertible): number;

declare function IOConnectCallAsyncScalarMethod(connection: number, selector: number, wake_port: number, reference: interop.PointerConvertible, referenceCnt: number, input: interop.PointerConvertible, inputCnt: number, output: interop.PointerConvertible, outputCnt: interop.PointerConvertible): number;

declare function IOConnectTrap0(connect: number, index: number): number;

declare function IOConnectTrap1(connect: number, index: number, p1: number): number;

declare function IOConnectTrap2(connect: number, index: number, p1: number, p2: number): number;

declare function IOConnectTrap3(connect: number, index: number, p1: number, p2: number, p3: number): number;

declare function IOConnectTrap4(connect: number, index: number, p1: number, p2: number, p3: number, p4: number): number;

declare function IOConnectTrap5(connect: number, index: number, p1: number, p2: number, p3: number, p4: number, p5: number): number;

declare function IOConnectTrap6(connect: number, index: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number): number;

declare function IOConnectAddClient(connect: number, client: number): number;

declare function IORegistryGetRootEntry(mainPort: number): number;

declare function IORegistryEntryFromPath(mainPort: number, path: unknown /* const array */): number;

declare function IORegistryEntryCopyFromPath(mainPort: number, path: interop.Object): number;

declare function IORegistryCreateIterator(mainPort: number, plane: unknown /* const array */, options: number, iterator: interop.PointerConvertible): number;

declare function IORegistryEntryCreateIterator(entry: number, plane: unknown /* const array */, options: number, iterator: interop.PointerConvertible): number;

declare function IORegistryIteratorEnterEntry(iterator: number): number;

declare function IORegistryIteratorExitEntry(iterator: number): number;

declare function IORegistryEntryGetName(entry: number, name: unknown /* const array */): number;

declare function IORegistryEntryGetNameInPlane(entry: number, plane: unknown /* const array */, name: unknown /* const array */): number;

declare function IORegistryEntryGetLocationInPlane(entry: number, plane: unknown /* const array */, location: unknown /* const array */): number;

declare function IORegistryEntryGetPath(entry: number, plane: unknown /* const array */, path: unknown /* const array */): number;

declare function IORegistryEntryCopyPath(entry: number, plane: unknown /* const array */): interop.Object;

declare function IORegistryEntryGetRegistryEntryID(entry: number, entryID: interop.PointerConvertible): number;

declare function IORegistryEntryCreateCFProperties(entry: number, properties: interop.PointerConvertible, allocator: interop.Object, options: number): number;

declare function IORegistryEntryCreateCFProperty(entry: number, key: interop.Object, allocator: interop.Object, options: number): interop.Object;

declare function IORegistryEntrySearchCFProperty(entry: number, plane: unknown /* const array */, key: interop.Object, allocator: interop.Object, options: number): interop.Object;

declare function IORegistryEntryGetProperty(entry: number, propertyName: unknown /* const array */, buffer: unknown /* const array */, size: interop.PointerConvertible): number;

declare function IORegistryEntrySetCFProperties(entry: number, properties: interop.Object): number;

declare function IORegistryEntrySetCFProperty(entry: number, propertyName: interop.Object, property: interop.Object): number;

declare function IORegistryEntryGetChildIterator(entry: number, plane: unknown /* const array */, iterator: interop.PointerConvertible): number;

declare function IORegistryEntryGetChildEntry(entry: number, plane: unknown /* const array */, child: interop.PointerConvertible): number;

declare function IORegistryEntryGetParentIterator(entry: number, plane: unknown /* const array */, iterator: interop.PointerConvertible): number;

declare function IORegistryEntryGetParentEntry(entry: number, plane: unknown /* const array */, parent: interop.PointerConvertible): number;

declare function IORegistryEntryInPlane(entry: number, plane: unknown /* const array */): number;

declare function IOServiceMatching(name: string): interop.Object;

declare function IOServiceNameMatching(name: string): interop.Object;

declare function IOBSDNameMatching(mainPort: number, options: number, bsdName: string): interop.Object;

declare function IOOpenFirmwarePathMatching(mainPort: number, options: number, path: string): interop.Object;

declare function IORegistryEntryIDMatching(entryID: number): interop.Object;

declare function IOServiceOFPathToBSDName(mainPort: number, openFirmwarePath: unknown /* const array */, bsdName: unknown /* const array */): number;

declare function OSGetNotificationFromMessage(msg: interop.PointerConvertible, index: number, type: interop.PointerConvertible, reference: interop.PointerConvertible, content: interop.PointerConvertible, size: interop.PointerConvertible): number;

declare function IOCatalogueSendData(mainPort: number, flag: number, buffer: string, size: number): number;

declare function IOCatalogueTerminate(mainPort: number, flag: number, description: unknown /* const array */): number;

declare function IOCatalogueGetData(mainPort: number, flag: number, buffer: interop.PointerConvertible, size: interop.PointerConvertible): number;

declare function IOCatalogueModuleLoaded(mainPort: number, name: unknown /* const array */): number;

declare function IOCatalogueReset(mainPort: number, flag: number): number;

declare function IODataQueueDataAvailable(dataQueue: interop.PointerConvertible): number;

declare function IODataQueuePeek(dataQueue: interop.PointerConvertible): interop.Pointer;

declare function IODataQueueDequeue(dataQueue: interop.PointerConvertible, data: interop.PointerConvertible, dataSize: interop.PointerConvertible): number;

declare function IODataQueueWaitForAvailableData(dataQueue: interop.PointerConvertible, notificationPort: number): number;

declare function IODataQueueAllocateNotificationPort(): number;

declare function IODataQueueEnqueue(dataQueue: interop.PointerConvertible, data: interop.PointerConvertible, dataSize: number): number;

declare function IODataQueueSetNotificationPort(dataQueue: interop.PointerConvertible, notifyPort: number): number;

declare function IOCreatePlugInInterfaceForService(service: number, pluginType: interop.Object, interfaceType: interop.Object, theInterface: interop.PointerConvertible, theScore: interop.PointerConvertible): number;

declare function IODestroyPlugInInterface(interface: interop.PointerConvertible): number;

declare function IOCFSerialize(object: interop.Object, options: number): interop.Object;

declare function IOURLCreatePropertyFromResource(alloc: interop.Object, url: interop.Object, property: interop.Object, errorCode: interop.PointerConvertible): interop.Object;

declare function IOURLCreateDataAndPropertiesFromResource(alloc: interop.Object, url: interop.Object, resourceData: interop.PointerConvertible, properties: interop.PointerConvertible, desiredProperties: interop.Object, errorCode: interop.PointerConvertible): number;

declare function IOURLWriteDataAndPropertiesToResource(url: interop.Object, dataToWrite: interop.Object, propertiesToWrite: interop.Object, errorCode: interop.PointerConvertible): number;

declare function IOCFUnserialize(buffer: string, allocator: interop.Object, options: number, errorString: interop.PointerConvertible): interop.Object;

declare function IOCFUnserializeBinary(buffer: string, bufferSize: number, allocator: interop.Object, options: number, errorString: interop.PointerConvertible): interop.Object;

declare function IOCFUnserializeWithSize(buffer: string, bufferSize: number, allocator: interop.Object, options: number, errorString: interop.PointerConvertible): interop.Object;

declare function IORPCMessageFromMach(msg: interop.PointerConvertible, reply: boolean): interop.Pointer;

declare function IOAccelFindAccelerator(framebuffer: number, pAccelerator: interop.PointerConvertible, pFramebufferIndex: interop.PointerConvertible): number;

declare function IOFramebufferOpen(service: number, owningTask: number, type: number, connect: interop.PointerConvertible): number;

declare function IODisplayCreateInfoDictionary(framebuffer: number, options: number): interop.Object;

declare function IODisplayMatchDictionaries(matching1: interop.Object, matching2: interop.Object, options: number): number;

declare function IODisplayForFramebuffer(framebuffer: number, options: number): number;

declare function IODisplaySetParameters(service: number, options: number, params: interop.Object): number;

declare function IODisplaySetFloatParameter(service: number, options: number, parameterName: interop.Object, value: number): number;

declare function IODisplaySetIntegerParameter(service: number, options: number, parameterName: interop.Object, value: number): number;

declare function IODisplayCopyParameters(service: number, options: number, params: interop.PointerConvertible): number;

declare function IODisplayCopyFloatParameters(service: number, options: number, params: interop.PointerConvertible): number;

declare function IODisplayGetFloatParameter(service: number, options: number, parameterName: interop.Object, value: interop.PointerConvertible): number;

declare function IODisplayGetIntegerRangeParameter(service: number, options: number, parameterName: interop.Object, value: interop.PointerConvertible, min: interop.PointerConvertible, max: interop.PointerConvertible): number;

declare function IODisplayCommitParameters(service: number, options: number): number;

declare function IOHIDQueueGetTypeID(): number;

declare function IOHIDQueueCreate(allocator: interop.Object, device: interop.Object, depth: number, options: number): interop.Object;

declare function IOHIDQueueGetDevice(queue: interop.Object): interop.Object;

declare function IOHIDQueueGetDepth(queue: interop.Object): number;

declare function IOHIDQueueSetDepth(queue: interop.Object, depth: number): void;

declare function IOHIDQueueAddElement(queue: interop.Object, element: interop.Object): void;

declare function IOHIDQueueRemoveElement(queue: interop.Object, element: interop.Object): void;

declare function IOHIDQueueContainsElement(queue: interop.Object, element: interop.Object): number;

declare function IOHIDQueueStart(queue: interop.Object): void;

declare function IOHIDQueueStop(queue: interop.Object): void;

declare function IOHIDQueueScheduleWithRunLoop(queue: interop.Object, runLoop: interop.Object, runLoopMode: interop.Object): void;

declare function IOHIDQueueUnscheduleFromRunLoop(queue: interop.Object, runLoop: interop.Object, runLoopMode: interop.Object): void;

declare function IOHIDQueueSetDispatchQueue(queue: interop.Object, dispatchQueue: NSObject): void;

declare function IOHIDQueueSetCancelHandler(queue: interop.Object, handler: () => void): void;

declare function IOHIDQueueActivate(queue: interop.Object): void;

declare function IOHIDQueueCancel(queue: interop.Object): void;

declare function IOHIDQueueRegisterValueAvailableCallback(queue: interop.Object, callback: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, context: interop.PointerConvertible): void;

declare function IOHIDQueueCopyNextValue(queue: interop.Object): interop.Object;

declare function IOHIDQueueCopyNextValueWithTimeout(queue: interop.Object, timeout: number): interop.Object;

declare function IOHIDDeviceGetTypeID(): number;

declare function IOHIDDeviceCreate(allocator: interop.Object, service: number): interop.Object;

declare function IOHIDDeviceGetService(device: interop.Object): number;

declare function IOHIDDeviceOpen(device: interop.Object, options: number): number;

declare function IOHIDDeviceClose(device: interop.Object, options: number): number;

declare function IOHIDDeviceConformsTo(device: interop.Object, usagePage: number, usage: number): number;

declare function IOHIDDeviceGetProperty(device: interop.Object, key: interop.Object): interop.Object;

declare function IOHIDDeviceSetProperty(device: interop.Object, key: interop.Object, property: interop.Object): number;

declare function IOHIDDeviceCopyMatchingElements(device: interop.Object, matching: interop.Object, options: number): interop.Object;

declare function IOHIDDeviceScheduleWithRunLoop(device: interop.Object, runLoop: interop.Object, runLoopMode: interop.Object): void;

declare function IOHIDDeviceUnscheduleFromRunLoop(device: interop.Object, runLoop: interop.Object, runLoopMode: interop.Object): void;

declare function IOHIDDeviceSetDispatchQueue(device: interop.Object, queue: NSObject): void;

declare function IOHIDDeviceSetCancelHandler(device: interop.Object, handler: () => void): void;

declare function IOHIDDeviceActivate(device: interop.Object): void;

declare function IOHIDDeviceCancel(device: interop.Object): void;

declare function IOHIDDeviceRegisterRemovalCallback(device: interop.Object, callback: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, context: interop.PointerConvertible): void;

declare function IOHIDDeviceRegisterInputValueCallback(device: interop.Object, callback: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void, context: interop.PointerConvertible): void;

declare function IOHIDDeviceRegisterInputReportCallback(device: interop.Object, report: interop.PointerConvertible, reportLength: number, callback: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.Enum<typeof IOHIDReportType>, p5: number, p6: interop.PointerConvertible, p7: number) => void, context: interop.PointerConvertible): void;

declare function IOHIDDeviceRegisterInputReportWithTimeStampCallback(device: interop.Object, report: interop.PointerConvertible, reportLength: number, callback: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.Enum<typeof IOHIDReportType>, p5: number, p6: interop.PointerConvertible, p7: number, p8: number) => void, context: interop.PointerConvertible): void;

declare function IOHIDDeviceSetInputValueMatching(device: interop.Object, matching: interop.Object): void;

declare function IOHIDDeviceSetInputValueMatchingMultiple(device: interop.Object, multiple: interop.Object): void;

declare function IOHIDDeviceSetValue(device: interop.Object, element: interop.Object, value: interop.Object): number;

declare function IOHIDDeviceSetValueMultiple(device: interop.Object, multiple: interop.Object): number;

declare function IOHIDDeviceSetValueWithCallback(device: interop.Object, element: interop.Object, value: interop.Object, timeout: number, callback: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void, context: interop.PointerConvertible): number;

declare function IOHIDDeviceSetValueMultipleWithCallback(device: interop.Object, multiple: interop.Object, timeout: number, callback: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void, context: interop.PointerConvertible): number;

declare function IOHIDDeviceGetValue(device: interop.Object, element: interop.Object, pValue: interop.PointerConvertible): number;

declare function IOHIDDeviceGetValueWithOptions(device: interop.Object, element: interop.Object, pValue: interop.PointerConvertible, options: number): number;

declare function IOHIDDeviceCopyValueMultiple(device: interop.Object, elements: interop.Object, pMultiple: interop.PointerConvertible): number;

declare function IOHIDDeviceGetValueWithCallback(device: interop.Object, element: interop.Object, pValue: interop.PointerConvertible, timeout: number, callback: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void, context: interop.PointerConvertible): number;

declare function IOHIDDeviceCopyValueMultipleWithCallback(device: interop.Object, elements: interop.Object, pMultiple: interop.PointerConvertible, timeout: number, callback: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void, context: interop.PointerConvertible): number;

declare function IOHIDDeviceSetReport(device: interop.Object, reportType: interop.Enum<typeof IOHIDReportType>, reportID: number, report: interop.PointerConvertible, reportLength: number): number;

declare function IOHIDDeviceSetReportWithCallback(device: interop.Object, reportType: interop.Enum<typeof IOHIDReportType>, reportID: number, report: interop.PointerConvertible, reportLength: number, timeout: number, callback: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.Enum<typeof IOHIDReportType>, p5: number, p6: interop.PointerConvertible, p7: number) => void, context: interop.PointerConvertible): number;

declare function IOHIDDeviceGetReport(device: interop.Object, reportType: interop.Enum<typeof IOHIDReportType>, reportID: number, report: interop.PointerConvertible, pReportLength: interop.PointerConvertible): number;

declare function IOHIDDeviceGetReportWithCallback(device: interop.Object, reportType: interop.Enum<typeof IOHIDReportType>, reportID: number, report: interop.PointerConvertible, pReportLength: interop.PointerConvertible, timeout: number, callback: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.Enum<typeof IOHIDReportType>, p5: number, p6: interop.PointerConvertible, p7: number) => void, context: interop.PointerConvertible): number;

declare function IOHIDElementGetTypeID(): number;

declare function IOHIDElementCreateWithDictionary(allocator: interop.Object, dictionary: interop.Object): interop.Object;

declare function IOHIDElementGetDevice(element: interop.Object): interop.Object;

declare function IOHIDElementGetParent(element: interop.Object): interop.Object;

declare function IOHIDElementGetChildren(element: interop.Object): interop.Object;

declare function IOHIDElementAttach(element: interop.Object, toAttach: interop.Object): void;

declare function IOHIDElementDetach(element: interop.Object, toDetach: interop.Object): void;

declare function IOHIDElementCopyAttached(element: interop.Object): interop.Object;

declare function IOHIDElementGetCookie(element: interop.Object): number;

declare function IOHIDElementGetType(element: interop.Object): interop.Enum<typeof IOHIDElementType>;

declare function IOHIDElementGetCollectionType(element: interop.Object): interop.Enum<typeof IOHIDElementCollectionType>;

declare function IOHIDElementGetUsagePage(element: interop.Object): number;

declare function IOHIDElementGetUsage(element: interop.Object): number;

declare function IOHIDElementIsVirtual(element: interop.Object): number;

declare function IOHIDElementIsRelative(element: interop.Object): number;

declare function IOHIDElementIsWrapping(element: interop.Object): number;

declare function IOHIDElementIsArray(element: interop.Object): number;

declare function IOHIDElementIsNonLinear(element: interop.Object): number;

declare function IOHIDElementHasPreferredState(element: interop.Object): number;

declare function IOHIDElementHasNullState(element: interop.Object): number;

declare function IOHIDElementGetName(element: interop.Object): interop.Object;

declare function IOHIDElementGetReportID(element: interop.Object): number;

declare function IOHIDElementGetReportSize(element: interop.Object): number;

declare function IOHIDElementGetReportCount(element: interop.Object): number;

declare function IOHIDElementGetUnit(element: interop.Object): number;

declare function IOHIDElementGetUnitExponent(element: interop.Object): number;

declare function IOHIDElementGetLogicalMin(element: interop.Object): number;

declare function IOHIDElementGetLogicalMax(element: interop.Object): number;

declare function IOHIDElementGetPhysicalMin(element: interop.Object): number;

declare function IOHIDElementGetPhysicalMax(element: interop.Object): number;

declare function IOHIDElementGetProperty(element: interop.Object, key: interop.Object): interop.Object;

declare function IOHIDElementSetProperty(element: interop.Object, key: interop.Object, property: interop.Object): number;

declare function IOHIDManagerGetTypeID(): number;

declare function IOHIDManagerCreate(allocator: interop.Object, options: number): interop.Object;

declare function IOHIDManagerOpen(manager: interop.Object, options: number): number;

declare function IOHIDManagerClose(manager: interop.Object, options: number): number;

declare function IOHIDManagerGetProperty(manager: interop.Object, key: interop.Object): interop.Object;

declare function IOHIDManagerSetProperty(manager: interop.Object, key: interop.Object, value: interop.Object): number;

declare function IOHIDManagerScheduleWithRunLoop(manager: interop.Object, runLoop: interop.Object, runLoopMode: interop.Object): void;

declare function IOHIDManagerUnscheduleFromRunLoop(manager: interop.Object, runLoop: interop.Object, runLoopMode: interop.Object): void;

declare function IOHIDManagerSetDispatchQueue(manager: interop.Object, queue: NSObject): void;

declare function IOHIDManagerSetCancelHandler(manager: interop.Object, handler: () => void): void;

declare function IOHIDManagerActivate(manager: interop.Object): void;

declare function IOHIDManagerCancel(manager: interop.Object): void;

declare function IOHIDManagerSetDeviceMatching(manager: interop.Object, matching: interop.Object): void;

declare function IOHIDManagerSetDeviceMatchingMultiple(manager: interop.Object, multiple: interop.Object): void;

declare function IOHIDManagerCopyDevices(manager: interop.Object): interop.Object;

declare function IOHIDManagerRegisterDeviceMatchingCallback(manager: interop.Object, callback: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void, context: interop.PointerConvertible): void;

declare function IOHIDManagerRegisterDeviceRemovalCallback(manager: interop.Object, callback: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void, context: interop.PointerConvertible): void;

declare function IOHIDManagerRegisterInputReportCallback(manager: interop.Object, callback: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.Enum<typeof IOHIDReportType>, p5: number, p6: interop.PointerConvertible, p7: number) => void, context: interop.PointerConvertible): void;

declare function IOHIDManagerRegisterInputReportWithTimeStampCallback(manager: interop.Object, callback: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.Enum<typeof IOHIDReportType>, p5: number, p6: interop.PointerConvertible, p7: number, p8: number) => void, context: interop.PointerConvertible): void;

declare function IOHIDManagerRegisterInputValueCallback(manager: interop.Object, callback: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void, context: interop.PointerConvertible): void;

declare function IOHIDManagerSetInputValueMatching(manager: interop.Object, matching: interop.Object): void;

declare function IOHIDManagerSetInputValueMatchingMultiple(manager: interop.Object, multiple: interop.Object): void;

declare function IOHIDManagerSaveToPropertyDomain(manager: interop.Object, applicationID: interop.Object, userName: interop.Object, hostName: interop.Object, options: number): void;

declare function IOHIDValueGetTypeID(): number;

declare function IOHIDValueCreateWithIntegerValue(allocator: interop.Object, element: interop.Object, timeStamp: number, value: number): interop.Object;

declare function IOHIDValueCreateWithBytes(allocator: interop.Object, element: interop.Object, timeStamp: number, bytes: interop.PointerConvertible, length: number): interop.Object;

declare function IOHIDValueCreateWithBytesNoCopy(allocator: interop.Object, element: interop.Object, timeStamp: number, bytes: interop.PointerConvertible, length: number): interop.Object;

declare function IOHIDValueGetElement(value: interop.Object): interop.Object;

declare function IOHIDValueGetTimeStamp(value: interop.Object): number;

declare function IOHIDValueGetLength(value: interop.Object): number;

declare function IOHIDValueGetBytePtr(value: interop.Object): interop.Pointer;

declare function IOHIDValueGetIntegerValue(value: interop.Object): number;

declare function IOHIDValueGetScaledValue(value: interop.Object, type: number): number;

declare function IOHIDTransactionGetTypeID(): number;

declare function IOHIDTransactionCreate(allocator: interop.Object, device: interop.Object, direction: interop.Enum<typeof IOHIDTransactionDirectionType>, options: number): interop.Object;

declare function IOHIDTransactionGetDevice(transaction: interop.Object): interop.Object;

declare function IOHIDTransactionGetDirection(transaction: interop.Object): interop.Enum<typeof IOHIDTransactionDirectionType>;

declare function IOHIDTransactionSetDirection(transaction: interop.Object, direction: interop.Enum<typeof IOHIDTransactionDirectionType>): void;

declare function IOHIDTransactionAddElement(transaction: interop.Object, element: interop.Object): void;

declare function IOHIDTransactionRemoveElement(transaction: interop.Object, element: interop.Object): void;

declare function IOHIDTransactionContainsElement(transaction: interop.Object, element: interop.Object): number;

declare function IOHIDTransactionScheduleWithRunLoop(transaction: interop.Object, runLoop: interop.Object, runLoopMode: interop.Object): void;

declare function IOHIDTransactionUnscheduleFromRunLoop(transaction: interop.Object, runLoop: interop.Object, runLoopMode: interop.Object): void;

declare function IOHIDTransactionSetValue(transaction: interop.Object, element: interop.Object, value: interop.Object, options: number): void;

declare function IOHIDTransactionGetValue(transaction: interop.Object, element: interop.Object, options: number): interop.Object;

declare function IOHIDTransactionCommit(transaction: interop.Object): number;

declare function IOHIDTransactionCommitWithCallback(transaction: interop.Object, timeout: number, callback: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, context: interop.PointerConvertible): number;

declare function IOHIDTransactionClear(transaction: interop.Object): void;

declare function IOHIDCreateSharedMemory(connect: number, version: number): number;

declare function IOHIDSetEventsEnable(connect: number, enable: number): number;

declare function IOHIDSetCursorEnable(connect: number, enable: number): number;

declare function IOHIDPostEvent(connect: number, eventType: number, location: IOGPoint, eventData: interop.PointerConvertible, eventDataVersion: number, eventFlags: number, options: number): number;

declare function IOHIDSetMouseLocation(connect: number, x: number, y: number): number;

declare function IOHIDGetButtonEventNum(connect: number, button: interop.Enum<typeof NXMouseButton>, eventNum: interop.PointerConvertible): number;

declare function IOHIDGetScrollAcceleration(handle: number, acceleration: interop.PointerConvertible): number;

declare function IOHIDSetScrollAcceleration(handle: number, acceleration: number): number;

declare function IOHIDGetMouseAcceleration(handle: number, acceleration: interop.PointerConvertible): number;

declare function IOHIDSetMouseAcceleration(handle: number, acceleration: number): number;

declare function IOHIDGetMouseButtonMode(handle: number, mode: interop.PointerConvertible): number;

declare function IOHIDSetMouseButtonMode(handle: number, mode: number): number;

declare function IOHIDGetAccelerationWithKey(handle: number, key: interop.Object, acceleration: interop.PointerConvertible): number;

declare function IOHIDSetAccelerationWithKey(handle: number, key: interop.Object, acceleration: number): number;

declare function IOHIDGetParameter(handle: number, key: interop.Object, maxSize: number, bytes: interop.PointerConvertible, actualSize: interop.PointerConvertible): number;

declare function IOHIDSetParameter(handle: number, key: interop.Object, bytes: interop.PointerConvertible, size: number): number;

declare function IOHIDCopyCFTypeParameter(handle: number, key: interop.Object, parameter: interop.PointerConvertible): number;

declare function IOHIDSetCFTypeParameter(handle: number, key: interop.Object, parameter: interop.Object): number;

declare function IOHIDGetStateForSelector(handle: number, selector: number, state: interop.PointerConvertible): number;

declare function IOHIDSetStateForSelector(handle: number, selector: number, state: number): number;

declare function IOHIDGetModifierLockState(handle: number, selector: number, state: interop.PointerConvertible): number;

declare function IOHIDSetModifierLockState(handle: number, selector: number, state: boolean): number;

declare function IOHIDRegisterVirtualDisplay(handle: number, display_token: interop.PointerConvertible): number;

declare function IOHIDUnregisterVirtualDisplay(handle: number, display_token: number): number;

declare function IOHIDSetVirtualDisplayBounds(handle: number, display_token: number, bounds: interop.PointerConvertible): number;

declare function IOHIDGetActivityState(handle: number, hidActivityIdle: interop.PointerConvertible): number;

declare function IOHIDCheckAccess(requestType: interop.Enum<typeof IOHIDRequestType>): interop.Enum<typeof IOHIDAccessType>;

declare function IOHIDRequestAccess(requestType: interop.Enum<typeof IOHIDRequestType>): boolean;

declare function IOHIDAccessCheckAuditToken(requestType: interop.Enum<typeof IOHIDRequestType>, token: audit_token_t): boolean;

declare function NXOpenEventStatus(): number;

declare function NXCloseEventStatus(handle: number): void;

declare function NXEventSystemInfo(handle: number, flavor: string, evs_info: interop.PointerConvertible, evs_info_cnt: interop.PointerConvertible): interop.Pointer;

declare function NXSetKeyRepeatInterval(handle: number, seconds: number): void;

declare function NXKeyRepeatInterval(handle: number): number;

declare function NXSetKeyRepeatThreshold(handle: number, threshold: number): void;

declare function NXKeyRepeatThreshold(handle: number): number;

declare function NXResetKeyboard(handle: number): void;

declare function NXSetClickTime(handle: number, seconds: number): void;

declare function NXClickTime(handle: number): number;

declare function NXSetClickSpace(handle: number, area: interop.PointerConvertible): void;

declare function NXGetClickSpace(handle: number, area: interop.PointerConvertible): void;

declare function NXResetMouse(handle: number): void;

declare function IOHIDEventSystemClientCreateSimpleClient(allocator: interop.Object): interop.Pointer;

declare function IOHIDEventSystemClientSetProperty(client: interop.PointerConvertible, key: interop.Object, property: interop.Object): number;

declare function IOHIDEventSystemClientCopyProperty(client: interop.PointerConvertible, key: interop.Object): interop.Object;

declare function IOHIDEventSystemClientGetTypeID(): number;

declare function IOHIDEventSystemClientCopyServices(client: interop.PointerConvertible): interop.Object;

declare function IOHIDServiceClientSetProperty(service: interop.PointerConvertible, key: interop.Object, property: interop.Object): number;

declare function IOHIDServiceClientCopyProperty(service: interop.PointerConvertible, key: interop.Object): interop.Object;

declare function IOHIDServiceClientGetTypeID(): number;

declare function IOHIDServiceClientGetRegistryID(service: interop.PointerConvertible): interop.Object;

declare function IOHIDServiceClientConformsTo(service: interop.PointerConvertible, usagePage: number, usage: number): number;

declare function IOHIDUserDeviceGetTypeID(): number;

declare function IOHIDUserDeviceCreateWithProperties(allocator: interop.Object, properties: interop.Object, options: number): interop.Pointer;

declare function IOHIDUserDeviceRegisterGetReportBlock(device: interop.PointerConvertible, block: (p1: interop.Enum<typeof IOHIDReportType>, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number): void;

declare function IOHIDUserDeviceRegisterSetReportBlock(device: interop.PointerConvertible, block: (p1: interop.Enum<typeof IOHIDReportType>, p2: number, p3: interop.PointerConvertible, p4: number) => number): void;

declare function IOHIDUserDeviceSetDispatchQueue(device: interop.PointerConvertible, queue: NSObject): void;

declare function IOHIDUserDeviceSetCancelHandler(device: interop.PointerConvertible, handler: () => void): void;

declare function IOHIDUserDeviceActivate(device: interop.PointerConvertible): void;

declare function IOHIDUserDeviceCancel(device: interop.PointerConvertible): void;

declare function IOHIDUserDeviceCopyProperty(device: interop.PointerConvertible, key: interop.Object): interop.Object;

declare function IOHIDUserDeviceSetProperty(device: interop.PointerConvertible, key: interop.Object, property: interop.Object): number;

declare function IOHIDUserDeviceHandleReportWithTimeStamp(device: interop.PointerConvertible, timestamp: number, report: interop.PointerConvertible, reportLength: number): number;

declare function IOFBGetI2CInterfaceCount(framebuffer: number, count: interop.PointerConvertible): number;

declare function IOFBCopyI2CInterfaceForBus(framebuffer: number, bus: number, interface: interop.PointerConvertible): number;

declare function IOI2CCopyInterfaceForID(identifier: interop.Object, interface: interop.PointerConvertible): number;

declare function IOI2CInterfaceOpen(interface: number, options: number, connect: interop.PointerConvertible): number;

declare function IOI2CInterfaceClose(connect: interop.PointerConvertible, options: number): number;

declare function IOI2CSendRequest(connect: interop.PointerConvertible, options: number, request: interop.PointerConvertible): number;

declare function KextManagerCreateURLForBundleIdentifier(allocator: interop.Object, kextIdentifier: interop.Object): interop.Object;

declare function KextManagerLoadKextWithIdentifier(kextIdentifier: interop.Object, dependencyKextAndFolderURLs: interop.Object): number;

declare function KextManagerLoadKextWithURL(kextURL: interop.Object, dependencyKextAndFolderURLs: interop.Object): number;

declare function KextManagerUnloadKextWithIdentifier(kextIdentifier: interop.Object): number;

declare function KextManagerCopyLoadedKextInfo(kextIdentifiers: interop.Object, infoKeys: interop.Object): interop.Object;

declare function IONetworkOpen(obj: number, con: interop.PointerConvertible): number;

declare function IONetworkClose(con: number): number;

declare function IONetworkWriteData(conObj: number, dataHandle: number, srcBuf: interop.PointerConvertible, inSize: number): number;

declare function IONetworkReadData(conObj: number, dataHandle: number, destBuf: interop.PointerConvertible, inOutSizeP: interop.PointerConvertible): number;

declare function IONetworkResetData(conObject: number, dataHandle: number): number;

declare function IONetworkGetDataCapacity(conObject: number, dataHandle: number, capacityP: interop.PointerConvertible): number;

declare function IONetworkGetDataHandle(conObject: number, dataName: string, dataHandleP: interop.PointerConvertible): number;

declare function IONetworkSetPacketFiltersMask(connect: number, filterGroup: unknown /* const array */, filtersMask: number, options: number): number;

declare function IONetworkGetPacketFiltersMask(connect: number, filterGroup: unknown /* const array */, filtersMask: interop.PointerConvertible, options: number): number;

declare function IOPSGetBatteryWarningLevel(): interop.Enum<typeof IOPSLowBatteryWarningLevel>;

declare function IOPSGetTimeRemainingEstimate(): number;

declare function IOPSCopyPowerSourcesInfo(): interop.Object;

declare function IOPSCopyPowerSourcesList(blob: interop.Object): interop.Object;

declare function IOPSGetPowerSourceDescription(blob: interop.Object, ps: interop.Object): interop.Object;

declare function IOPSGetProvidingPowerSourceType(snapshot: interop.Object): interop.Object;

declare function IOPSNotificationCreateRunLoopSource(callback: (p1: interop.PointerConvertible) => void, context: interop.PointerConvertible): interop.Object;

declare function IOPSCreateLimitedPowerNotification(callback: (p1: interop.PointerConvertible) => void, context: interop.PointerConvertible): interop.Object;

declare function IOPSCopyExternalPowerAdapterDetails(): interop.Object;

declare function IOPMFindPowerManagement(master_device_port: number): number;

declare function IOPMSetAggressiveness(fb: number, type: number, aggressiveness: number): number;

declare function IOPMGetAggressiveness(fb: number, type: number, aggressiveness: interop.PointerConvertible): number;

declare function IOPMSleepEnabled(): number;

declare function IOPMSleepSystem(fb: number): number;

declare function IOPMCopyBatteryInfo(masterPort: number, info: interop.PointerConvertible): number;

declare function IORegisterApp(refcon: interop.PointerConvertible, theDriver: number, thePortRef: interop.PointerConvertible, callback: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible) => void, notifier: interop.PointerConvertible): number;

declare function IORegisterForSystemPower(refcon: interop.PointerConvertible, thePortRef: interop.PointerConvertible, callback: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible) => void, notifier: interop.PointerConvertible): number;

declare function IODeregisterApp(notifier: interop.PointerConvertible): number;

declare function IODeregisterForSystemPower(notifier: interop.PointerConvertible): number;

declare function IOAllowPowerChange(kernelPort: number, notificationID: number): number;

declare function IOCancelPowerChange(kernelPort: number, notificationID: number): number;

declare function IOPMSchedulePowerEvent(time_to_wake: interop.Object, my_id: interop.Object, type: interop.Object): number;

declare function IOPMCancelScheduledPowerEvent(time_to_wake: interop.Object, my_id: interop.Object, type: interop.Object): number;

declare function IOPMCopyScheduledPowerEvents(): interop.Object;

declare function IOPMAssertionCreateWithDescription(AssertionType: interop.Object, Name: interop.Object, Details: interop.Object, HumanReadableReason: interop.Object, LocalizationBundlePath: interop.Object, Timeout: number, TimeoutAction: interop.Object, AssertionID: interop.PointerConvertible): number;

declare function IOPMAssertionCreateWithProperties(AssertionProperties: interop.Object, AssertionID: interop.PointerConvertible): number;

declare function IOPMAssertionDeclareUserActivity(AssertionName: interop.Object, userType: interop.Enum<typeof IOPMUserActiveType>, AssertionID: interop.PointerConvertible): number;

declare function IOPMDeclareNetworkClientActivity(AssertionName: interop.Object, AssertionID: interop.PointerConvertible): number;

declare function IOPMAssertionRetain(theAssertion: number): void;

declare function IOPMAssertionRelease(AssertionID: number): number;

declare function IOPMAssertionCopyProperties(theAssertion: number): interop.Object;

declare function IOPMAssertionSetProperty(theAssertion: number, theProperty: interop.Object, theValue: interop.Object): number;

declare function IOPMCopyAssertionsByProcess(AssertionsByPID: interop.PointerConvertible): number;

declare function IOPMCopyAssertionsStatus(AssertionsStatus: interop.PointerConvertible): number;

declare function IOPMAssertionCreate(AssertionType: interop.Object, AssertionLevel: number, AssertionID: interop.PointerConvertible): number;

declare function IOPMAssertionCreateWithName(AssertionType: interop.Object, AssertionLevel: number, AssertionName: interop.Object, AssertionID: interop.PointerConvertible): number;

declare function IOGetSystemLoadAdvisory(): number;

declare function IOCopySystemLoadAdvisoryDetailed(): interop.Object;

declare function IOPMCopyCPUPowerStatus(cpuPowerStatus: interop.PointerConvertible): number;

declare function IOPMGetThermalWarningLevel(thermalLevel: interop.PointerConvertible): number;


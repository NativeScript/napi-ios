/// <reference types="@nativescript/objc-node-api" />

declare const kDataRotate270: number;

declare const kDataRotate180: number;

declare const kVCUsePosition: number;

declare const kVCAcquireImmediate: number;

declare const enable_dklog_serial_output: boolean;

declare const disable_iolog_serial_output: boolean;

declare const uint32_t: number;

declare const serialmode: number;

declare const version: interop.Pointer;

declare const version_variant: interop.Pointer;

declare const version_major: number;

declare const OSDextStatistics: number;

declare const OSKext: number;

declare const kKUNCAlternateResponse: number;

declare const os: number;

declare const receive_vfs_nspace_subsystem: receive_vfs_nspace_subsystem;

declare const arcade_upcall_subsystem: arcade_upcall_subsystem;

declare const clock_reply_subsystem: clock_reply_subsystem;

declare const memory_error_notification_subsystem: memory_error_notification_subsystem;

declare const coalition_notification_subsystem: coalition_notification_subsystem;

declare const fairplay_subsystem: fairplay_subsystem;

declare const iocompressionstats_notification_subsystem: iocompressionstats_notification_subsystem;

declare const do_notify_subsystem: do_notify_subsystem;

declare const kError: number;

declare const kDTPathNameSeparator: number;

declare const assert_boot_args_size_is_4096: unknown /* const array */;

declare const kEfiMemoryMappedIOPortSpace: number;

declare const kEfiMemoryMappedIO: number;

declare const kEfiACPIMemoryNVS: number;

declare const kEfiConventionalMemory: number;

declare const kEfiRuntimeServicesData: number;

declare const kEfiReservedMemoryType: number;

declare const kBootDriverTypeKEXT: number;

declare const kBootDriverTypeInvalid: number;

declare const AppleCallbackPowerSourceProvider: number;

declare const IOHIDTranslationService: number;

declare const IOHIDPowerSourceClient: number;

declare const sockopt_set: number;

declare const sock_data_filt_flag_record: number;

declare const sock_evt_bound: number;

declare const sock_evt_closing: number;

declare const sock_evt_cantsendmore: number;

declare const sock_evt_shutdown: number;

declare const sock_evt_flush_read: number;

declare const sock_evt_connected: number;

declare const sock_evt_connecting: number;

declare const SFLT_EXTENDED: number;

declare const SFLT_PROG: number;

declare const SFLT_GLOBAL: number;

declare const kdebug_enable: number;

declare const lz4_encode_scratch_size: number;

declare const lz4_hash_table_size: number;

declare const vDSP_IIRMonoRight: number;

declare const vDSP_IIRStereo: number;

declare const IOFastPathHIDLEDService: number;

declare const IOFastPathHIDService: number;

declare const IOHIDTimeSyncService: number;

declare const IOFastPathField: number;

declare const DigitizerTransducer: number;

declare const kHIDDispatchOptionKeyboardNoRepeat: number;

declare const kHIDDispatchOptionPhaseAny: number;

declare const kHIDDispatchOptionScrollMomentumEnd: number;

declare const kHIDDispatchOptionPointerDisplayIntegrated: number;

declare const OSAction_IOHIDEventService__CopyEvent_Class: OSClassLoadInformation;

declare const gOSAction_IOHIDEventService__CopyEventMetaClass: interop.Pointer;

declare const OSAction_IOHIDEventService__SetUserProperties: number;

declare const OSAction_IOHIDEventService__SetLED_Class: OSClassLoadInformation;

declare const kKeyMaskFn: number;

declare const kKeyMaskEsc: number;

declare const kKeyMaskSlash: number;

declare const kKeyMaskShift: number;

declare const ATADeviceNub: number;

declare const IOATABusCommand: number;

declare const IOATADevice: number;

declare const IOATADevConfig: number;

declare const IOATACommand: number;

declare const IOExtendedLBA: number;

declare const kATADMAErr: number;

declare const kATAModeNotSupported: number;

declare const kATAErrDevBusy: number;

declare const kATAUnknownOpcode: number;

declare const kATAErrUnknownType: number;

declare const kATADisableWriteCache: number;

declare const kATASetPIOMode: number;

declare const kATAEnableWriteCache: number;

declare const kATAcmdDriveIdentify: number;

declare const kATAcmdFlushCacheExtended: number;

declare const kATAcmdCheckPowerMode: number;

declare const kATAcmdReadBuffer: number;

declare const kATAcmdIdle: number;

declare const kATAcmdStandby: number;

declare const kATAcmdStandbyImmed: number;

declare const kATAcmdDoorLock: number;

declare const kATAcmdWriteDMA: number;

declare const kATAcmdSetRWMultiple: number;

declare const kATAcmdInitDrive: number;

declare const kATAcmdWriteExtended: number;

declare const kATAcmdWriteLong: number;

declare const kATAcmdWrite: number;

declare const kATAcmdRecal: number;

declare const kATAcmdNOP: number;

declare const kATAcmdWORetry: number;

declare const kID_DRIVE: number;

declare const mATADCRReset: number;

declare const mATADCROne: number;

declare const bATADCROne: number;

declare const mATAError: number;

declare const mATAIndex: number;

declare const bATAError: number;

declare const mATALBASelect: number;

declare const mATADriveSelect: number;

declare const mATAHeadNumber: number;

declare const mATAPIuseDMA: number;

declare const bATAPIuseDMA: number;

declare const mATAMediaChangeReq: number;

declare const mATAIDNotFound: number;

declare const mATAMediaChanged: number;

declare const bATAMediaChangeReq: number;

declare const bATAMediaChanged: number;

declare const bATABadBlock: number;

declare const kATADefaultSectorSize: number;

declare const IOBacklightDisplay: number;

declare const IODisplayConnect: number;

declare const kIODisplayNumPowerStates: number;

declare const gIODisplayFadeStyle: number;

declare const gIODisplayFadeTime2: number;

declare const gIODisplayFadeTime1: number;

declare const gIODisplayFadeStyleKey: interop.Pointer;

declare const gIODisplayFadeTime3Key: interop.Pointer;

declare const gIODisplayParametersFlushKey: interop.Pointer;

declare const gIODisplayParametersCommitKey: interop.Pointer;

declare const gIODisplayControllerIDKey: interop.Pointer;

declare const gIODisplayAudioProcessorModeKey: interop.Pointer;

declare const gIODisplayAudioBalanceLRKey: interop.Pointer;

declare const gIODisplayAudioBassKey: interop.Pointer;

declare const gIODisplayAudioTrebleKey: interop.Pointer;

declare const gIODisplayMicrophoneVolumeKey: interop.Pointer;

declare const gIODisplayFirmwareLevelKey: interop.Pointer;

declare const gIODisplayTechnologyTypeKey: interop.Pointer;

declare const gIODisplayParametersTheatreModeWindowKey: interop.Pointer;

declare const gIODisplayRedGammaScaleKey: interop.Pointer;

declare const gIODisplaySelectedColorModeKey: interop.Pointer;

declare const gIODisplayVideoBestKey: interop.Pointer;

declare const gIODisplayParallelogramKey: interop.Pointer;

declare const gIODisplayPincushionKey: interop.Pointer;

declare const gIODisplayTrapezoidKey: interop.Pointer;

declare const gIODisplayVerticalSizeKey: interop.Pointer;

declare const gIODisplayBrightnessKey: interop.Pointer;

declare const gIODisplayContrastKey: interop.Pointer;

declare const gIODisplayMinValueKey: interop.Pointer;

declare const gIODisplayGUIDKey: interop.Pointer;

declare const IOMultiMemoryDescriptor: number;

declare const IONVRAMController: number;

declare const IOGuardPageMemoryDescriptor: number;

declare const IOHIDElementContainer: number;

declare const IOHIDAsyncReportQueue: number;

declare const IOHIDElementPrivate: number;

declare const IOHIDConsumer: number;

declare const OSAction_IOHIDDevice__CompleteReport: number;

declare const OSAction_IOHIDDevice__CompleteReportMetaClass: number;

declare const OSAction_IOHIDDevice__CompleteReport_Class: OSClassLoadInformation;

declare const gOSAction_IOHIDDevice__CompleteReportMetaClass: interop.Pointer;

declare const IOHIDDeviceInterface: number;

declare const IOHIDDeviceMetaClass: number;

declare const IOHIDInterface: number;

declare const IOHIDInterfaceInterface: number;

declare const IOHIDInterfaceMetaClass: number;

declare const IOHIDInterface_Class: OSClassLoadInformation;

declare const IORTC: number;

declare const IOBluetoothHIDDriver: number;

declare const IOWorkQueue: number;

declare const IOBluetoothDevice: number;

declare const IOBluetoothL2CAPChannel: number;

declare const IOFireWireAVCNub: number;

declare const IOFireWireAVCSubUnit: number;

declare const gIOAVCUnitType: interop.Pointer;

declare const IOFireWireAVCCommand: number;

declare const IOFireWirePCRSpace: number;

declare const IOTimeStampIntervalConstantFiltered: number;

declare const IOAudioSelectorControl: number;

declare const IOAudioClientBufferSet: number;

declare const IOAudioTimeIntervalFilterFIR: number;

declare const IOAudioTimeIntervalFilter: number;

declare const U128: number;

declare const IOAudioUserClient: number;

declare const IOAudioPort: number;

declare const IOAudioControl: number;

declare const IODMAController: number;

declare const IOCatalogue: number;

declare const IOUSBHostHIDDevice: number;

declare const kInterruptRetries: number;

declare const IOUSBInterface: number;

declare const IOUSBHostInterfaceInterface: number;

declare const IOUSBHostInterface_Class: OSClassLoadInformation;

declare const IOUSBDevice: number;

declare const AppleUSBDescriptorCache: number;

declare const AppleUSBHostPort: number;

declare const AppleUSBHostDeviceIdler: number;

declare const IOUSBHostDeviceInterface: number;

declare const gIOUSBHostDeviceMetaClass: interop.Pointer;

declare const kIOUSBHostPipeBundlingMax: number;

declare const IOUSBHostStream: number;

declare const IOUSBHostIOSource: number;

declare const AppleUSBRequestPool: number;

declare const AppleUSBHostController: number;

declare const IOUSBHostCITransferCompletionMessageData1TransferStructurePhase: number;

declare const IOUSBHostCITransferCompletionMessageData1TransferStructure: number;

declare const IOUSBHostCITransferCompletionMessageData0TransferLengthPhase: number;

declare const IOUSBHostCITransferCompletionMessageControlEndpointAddressPhase: number;

declare const IOUSBHostCITransferCompletionMessageControlEndpointAddress: number;

declare const IOUSBHostCITransferCompletionMessageControlDeviceAddressPhase: number;

declare const IOUSBHostCILinkData1TransferStructureAddress: number;

declare const IOUSBHostCIIsochronousTransferData0LengthPhase: number;

declare const IOUSBHostCIIsochronousTransferData0Length: number;

declare const IOUSBHostCIIsochronousTransferControlFrameNumber: number;

declare const IOUSBHostCINormalTransferData1BufferPhase: number;

declare const IOUSBHostCINormalTransferData1Buffer: number;

declare const IOUSBHostCINormalTransferData0LengthPhase: number;

declare const IOUSBHostCINormalTransferData0Length: number;

declare const IOUSBHostCISetupTransferData1wLengthPhase: number;

declare const IOUSBHostCISetupTransferData1wLength: number;

declare const IOUSBHostCISetupTransferData1wValuePhase: number;

declare const IOUSBHostCISetupTransferData1bRequest: number;

declare const IOUSBHostCIEndpointSetNextTransferCommandData1Address: number;

declare const IOUSBHostCIEndpointCreateCommandData1Descriptor: number;

declare const IOUSBHostCIDeviceUpdateCommandData1DescriptorAddress: number;

declare const IOUSBHostCIDeviceCreateCommandData1DeviceAddressPhase: number;

declare const IOUSBHostCIDeviceCreateCommandData0Route: number;

declare const IOUSBHostCIDeviceCreateCommandData0RootPortPhase: number;

declare const IOUSBHostCIPortStatusCommandData1ChangeMask: number;

declare const IOUSBHostCIPortStatusCommandData1LinkStateChange: number;

declare const IOUSBHostCIPortStatusCommandData1OvercurrentChange: number;

declare const IOUSBHostCIPortStatusCommandData1SpeedPhase: number;

declare const IOUSBHostCIPortStatusCommandData1LinkStatePhase: number;

declare const IOUSBHostCIPortStatusCommandData1Connected: number;

declare const IOUSBHostCIPortStatusCommandData1Powered: number;

declare const IOUSBHostCIPortEventMessageData0PortNumberPhase: number;

declare const IOUSBHostCICommandMessageData0EndpointAddressPhase: number;

declare const IOUSBHostCICommandMessageData0DeviceAddress: number;

declare const IOUSBHostCICommandMessageData0RootPort: number;

declare const IOUSBHostCICommandMessageControlStatus: number;

declare const IOUSBHostCIPortCapabilitiesMessageData0MaxPower: number;

declare const IOUSBHostCIPortCapabilitiesMessageControlConnectorTypePhase: number;

declare const IOUSBHostCIPortCapabilitiesMessageControlInternalConnector: number;

declare const IOUSBHostCIPortCapabilitiesMessageControlPortNumberPhase: number;

declare const IOUSBHostCICapabilitiesMessageData0CommandTimeoutThresholdPhase: number;

declare const IOUSBHostCICapabilitiesMessageControlPortCountPhase: number;

declare const IOUSBHostCIMessageControlNoResponse: number;

declare const IOUSBHostCIMessageControlStatusPhase: number;

declare const IOUSBHostCIDoorbellStreamID: number;

declare const IOUSBHostCIDoorbellEndpointAddress: number;

declare const IOUSBHostCIPortStatusLinkStateChange: number;

declare const IOUSBHostCIPortStatusLinkState: number;

declare const IOUSBHostCIPortStatusOvercurrent: number;

declare const kUSB3LPMExtraDeviceEL: number;

declare const kUSB3LPMMaxT3SEL: number;

declare const kUSB3LPMU1AcceptOnly: number;

declare const kUSB3LPMU1Disabled: number;

declare const kUSB3LPMMaxU1Timeout: number;

declare const kUSBHostDefaultControlNoDataTimeoutMS: number;

declare const kUSBHostClassRequestNoDataTimeout: number;

declare const kUSBHostStandardRequestSimpleCompletionTimeout: number;

declare const kUSBHostSetAddressTimeout: number;

declare const kUSBHostOpenOptionUserClientSession: number;

declare const kUSBHostVendorIDAppleComputer: number;

declare const kUSBHostMaxCountFullSpeedIsochronous: number;

declare const kUSBHostHubClass: number;

declare const kUSBHostVendorSpecificClass: number;

declare const kHubPort2PortExitLatencyNs: number;

declare const kInterfaceSuspendRemoteWakeEnable: number;

declare const kInterfaceFeatureSelectorSuspend: number;

declare const kDeviceFeatureSelectorU2Enable: number;

declare const kDeviceFeatureSelectorTestMode: number;

declare const kDeviceFeatureSelectorRemoteWakeup: number;

declare const kDeviceStatusU2Enable: number;

declare const IOATAIOReg32: number;

declare const kDeviceStatusU1Enable: number;

declare const kDeviceStatusRemoteWakeEnable: number;

declare const kDeviceRequestSetSel: number;

declare const kDeviceRequestSynchFrame: number;

declare const kDeviceRequestSetConfiguration: number;

declare const kDeviceRequestGetConfiguration: number;

declare const kDeviceRequestGetDescriptor: number;

declare const kDeviceRequestSetAddress: number;

declare const kDeviceRequestClearFeature: number;

declare const kDeviceRequestRecipientDevice: number;

declare const kDeviceRequestRecipientPhase: number;

declare const kDeviceRequestRecipientMask: number;

declare const kDeviceRequestTypeVendor: number;

declare const kATAcmdWriteVerify: number;

declare const kDeviceRequestTypeMask: number;

declare const kDeviceRequestDirectionOut: number;

declare const kSuperSpeedHubCharacteristicsReserved: number;

declare const kSuperSpeedHubCharacteristicsOverCurrentIndividual: number;

declare const kSuperSpeedHubCharacteristicsOverCurrentMask: number;

declare const kSuperSpeedHubCharacteristicsCompoundDevice: number;

declare const kSuperSpeedHubCharacteristicsPowerSwitchingGanged: number;

declare const kSuperSpeedHubCharacteristicsPowerSwitchingMask: number;

declare const kSuperSpeedEndpointCompanionDescriptorIsocReservedPhase: number;

declare const kSuperSpeedEndpointCompanionDescriptorIsocReserved: number;

declare const kSuperSpeedEndpointCompanionDescriptorIsocMult: number;

declare const kSuperSpeedEndpointCompanionDescriptorBulkMaxStreams: number;

declare const kSuperSpeedPlusDeviceCapabilitySublinkProtocolPhase: number;

declare const kSuperSpeedPlusDeviceCapabilitySublinkProtocol: number;

declare const kSuperSpeedPlusDeviceCapabilitySublinkDirectionTx: number;

declare const kSuperSpeedPlusDeviceCapabilitySublinkDirection: number;

declare const kSuperSpeedPlusDeviceCapabilitySublinkSymmetric: number;

declare const kSuperSpeedPlusDeviceCapabilitySublinkLSEKbits: number;

declare const kSuperSpeedPlusDeviceCapabilitySublinkLSEBits: number;

declare const kSuperSpeedPlusDeviceCapabilitySublinkLSE: number;

declare const kSuperSpeedPlusDeviceCapabilityMinTxLaneCount: number;

declare const kSuperSpeedPlusDeviceCapabilityReserved: number;

declare const kSuperSpeedDeviceCapabilitySupportHighSpeed: number;

declare const kHIDDispatchOptionDeliveryNotificationForce: number;

declare const kSuperSpeedDeviceCapabilitySupportFullSpeed: number;

declare const kSuperSpeedDeviceCapabilitySupportLowSpeed: number;

declare const kSuperSpeedDeviceCapability5Gb: number;

declare const kSuperSpeedDeviceCapabilityLowSpeed: number;

declare const kUSB20ExtensionCapabilityBESLDPhase: number;

declare const kUSB20ExtensionCapabilityBESLDValid: number;

declare const kUSB20ExtensionCapabilityBESLSupport: number;

declare const kUSB20ExtensionCapabilityLPM: number;

declare const kEndpointDescriptorReserved: number;

declare const kEndpointDescriptorPacketSizeMult: number;

declare const kEndpointDescriptorPacketSize: number;

declare const kEndpointDescriptorUsageTypeIsocReserved: number;

declare const kEndpointDescriptorUsageTypeInterruptPeriodic: number;

declare const kEndpointDescriptorUsageType: number;

declare const kEndpointDescriptorSynchronizationTypeSynchronous: number;

declare const kEndpointDescriptorSynchronizationTypeAsynchronous: number;

declare const kEndpointDescriptorSynchronizationTypeNone: number;

declare const kEndpointDescriptorTransferTypeInterrupt: number;

declare const kEndpointDescriptorTransferTypePhase: number;

declare const kEndpointDescriptorTransferType: number;

declare const kEndpointDescriptorDirectionOut: number;

declare const kEndpointDescriptorDirectionPhase: number;

declare const kEndpointDescriptorEndpointAddressReserved: number;

declare const kEndpointDescriptorNumber: number;

declare const kConfigurationDescriptorAttributeRemoteWakeCapable: number;

declare const IOInterleavedMemoryDescriptor: number;

declare const IONDRVFramebuffer: number;

declare const IODisplay: number;

declare const IOFramebufferUserClient: number;

declare const kFBDisplayUsablePowerState: number;

declare const kIOFBNotifyGroupID_Count: number;

declare const kIOFBNotifyGroupID_VendorAMD: number;

declare const kIOFBNotifyGroupID_VendorIntel: number;

declare const kIOFBNotifyGroupID_AppleGraphicsPowerManagement: number;

declare const kIOFBNotifyGroupID_AppleGraphicsDisplayPolicy: number;

declare const kIOFBNotifyGroupID_AppleGraphicsMUXControl: number;

declare const kIOFBNotifyGroupID_AppleGraphicsMGPUPowerControl: number;

declare const kIOFBNotifyGroupID_AppleGraphicsDevicePolicy: number;

declare const kIOFBNotifyGroupID_IODisplay: number;

declare const kIOFBNotifyEvent_Last: number;

declare const kIOFBNotifyEvent_HDACodecPowerOnOff: number;

declare const kIOFBNotifyEvent_VRAMReady: number;

declare const kIOFBNotifyEvent_CaptureChange: number;

declare const kIOFBNotifyEvent_ChangeSpeed: number;

declare const kIOFBNotifyEvent_PowerOnOff: number;

declare const kIOFBNotifyEvent_DisplayModeChange: number;

declare const kIOFBNotifyEvent_None: number;

declare const kIOFBNotifyWSAAEnterDefer: number;

declare const kIOFBNotifyWillNotify: number;

declare const kIOFBNotifyDisplayDimsChange: number;

declare const kIOFBNotifyOnlineChange: number;

declare const kIOFBNotifyHDACodecWillPowerOff: number;

declare const kIOFBNotifyHDACodecDidPowerOn: number;

declare const kIOFBNotifyHDACodecWillPowerOn: number;

declare const kIOFBNotifyWillChangeSpeed: number;

declare const kIOFBNotifyWillWake: number;

declare const kIOFBNotifyDidWake: number;

declare const kIOFBNotifyDisplayModeDidChange: number;

declare const kIOFBNotifyDisplayModeWillChange: number;

declare const kEnabledInterruptState: number;

declare const kIODDCHigh: number;

declare const kFBOfflineInterruptServiceType: number;

declare const kFBConnectInterruptServiceType: number;

declare const kConnectInterruptServiceType: number;

declare const kFrameInterruptServiceType: number;

declare const clutType: number;

declare const kRegModifierMask: number;

declare const kSuperSpeedPlusDeviceCapabilitySublinkTypePhase: number;

declare const kRegIterChildren: number;

declare const kRegMaxPropertyNameLength: number;

declare const kRegPropertyNameTerminator: number;

declare const kRegPathNameSeparator: number;

declare const kTenMinutesInSeconds: number;

declare const kSecondsPerHour: number;

declare const IOPMPowerSourceList: number;

declare const IOPMPowerSource: number;

declare const IOBDBlockStorageDriver: number;

declare const IODVDBlockStorageDriver: number;

declare const IODVDBlockStorageDevice: number;

declare const IOCDBlockStorageDriver: number;

declare const IOUserClient2022: number;

declare const IOKitDiagnosticsClient: number;

declare const IOGatedOutputQueue: number;

declare const IOBasicOutputQueue: number;

declare const kIOReturnOutputDropped: number;

declare const kIOOutputCommandStall: number;

declare const kIOOutputCommandNone: number;

declare const kIOOutputStatusRetry: number;

declare const kIOOutputStatusDropped: number;

declare const IOFireWireAVCProtocolUserClient: number;

declare const kIOOutputStatusAccepted: number;

declare const IONetworkData: number;

declare const MBUF_CSUM_PSEUDO_HDR: number;

declare const MBUF_CSUM_DID_DATA: number;

declare const MBUF_CSUM_DID_IP: number;

declare const MBUF_CSUM_REQ_UDPIPV6: number;

declare const MBUF_CSUM_REQ_TCPIPV6: number;

declare const MBUF_CSUM_REQ_UDP: number;

declare const MBUF_TSO_IPV4: number;

declare const MBUF_TYPE_CONTROL: number;

declare const MBUF_TYPE_RIGHTS: number;

declare const MBUF_TYPE_SOOPTS: number;

declare const MBUF_TYPE_ATABLE: number;

declare const MBUF_TYPE_HTABLE: number;

declare const MBUF_TYPE_RTABLE: number;

declare const MBUF_FRAG: number;

declare const MBUF_BCAST: number;

declare const MBUF_EOR: number;

declare const IOKernelDebugger: number;

declare const AppleMacIODevice: number;

declare const gGetDefaultBusSpeedsKey: interop.Pointer;

declare const kMachineTypeUnknown: number;

declare const kChipSetTypeGossamer: number;

declare const kChipSetTypePowerSurge: number;

declare const kBootROMTypeNewWorld: number;

declare const badSelfIDsErr: number;

declare const invalidFWReferenceTypeErr: number;

declare const noListenerOrTalkerErr: number;

declare const channelActiveErr: number;

declare const multipleTalkerErr: number;

declare const alreadyRegisteredErr: number;

declare const invalidIDTypeErr: number;

declare const busReconfiguredErr: number;

declare const timeoutErr: number;

declare const IOFireWireLocalNodeAux: number;

declare const IONaturalMemoryCursor: number;

declare const IOFWSkipCycleDCL: number;

declare const IOFWReceiveDCL: number;

declare const kSCSIControllerNotificationBusReset: number;

declare const kSCSIParallelTaskControllerIDQueueHead: number;

declare const kFirstOrderRanking: number;

declare const kPeripheralDeviceTypeNoMatch: number;

declare const PassthruInterruptController: number;

declare const IOSharedInterruptController: number;

declare const IOSubMemoryDescriptor: number;

declare const kIODTInterruptShared: number;

declare const kIODTRecursive: number;

declare const gIODTNWInterruptMappingKey: interop.Pointer;

declare const gIODTDefaultInterruptController: interop.Pointer;

declare const gIODTAAPLInterruptsKey: interop.Pointer;

declare const gIODTTargetTypeKey: interop.Pointer;

declare const gIODTCompatibleKey: interop.Pointer;

declare const gIODTPlane: interop.Pointer;

declare const IODTPlatformExpert: number;

declare const IOPlatformDevice: number;

declare const IOACPIPlatformDevice: number;

declare const PE_halt_restart: (p1: number) => number;

declare const kPEPanicEnd: number;

declare const kPEPagingOff: number;

declare const kPEUPSDelayHaltCPU: number;

declare const kPEHangCPU: number;

declare const kPERestartCPU: number;

declare const kIOACPIDevicePowerStateCount: number;

declare const kIOACPIDevicePowerStateD3: number;

declare const kIOACPIDevicePowerStateD2: number;

declare const kIOACPIAddressSpaceOpRead: number;

declare const kIOACPIIORange: number;

declare const gIOACPIAddressKey: interop.Pointer;

declare const kErrorRecoveryInterval: number;

declare const gIOACPIHardwareIDKey: interop.Pointer;

declare const kIOPCIAdapterUnused: number;

declare const kIOPCIAdapterNotPresentPending: number;

declare const kIOPCIResourceTypeBusNumber: number;

declare const kIOPCIResourceTypeIO: number;

declare const AppleUSBHostBulkHIDDevice: number;

declare const kIOPCIResourceTypePrefetchMemory: number;

declare const kCheckLinkParents: number;

declare const kIOPMSupportedOnUPS: number;

declare const kIOPMSupportedOnBatt: number;

declare const kIOPMSupportedOnAC: number;

declare const kPCICantSleep: number;

declare const kFrameBufferDeepSleepSupported: number;

declare const kIOAGPStateEnabled: number;

declare const kIOAGPDisableFeature9: number;

declare const kIOAGPDisableFeature7: number;

declare const kIOAGPDisableUnaligned: number;

declare const kIOAGPDisablePCIWrites: number;

declare const kIOAGPDisablePCIReads: number;

declare const kIOAGPGartIdleInvalidate: number;

declare const kIOAGPAccessOutOfRange: number;

declare const kIOAGPDefaultStatus: number;

declare const kIOAGPEnable: number;

declare const kIOPCIConfigShadowPermanent: number;

declare const kIOPCIProbeOptionNeedsScan: number;

declare const kIOPCILatencySnooped: number;

declare const kIOPCIDevicePausedState: number;

declare const kIOPCIDeviceDozeState: number;

declare const kPCI2PCIUpperIORange: number;

declare const kPCI2PCIPrefetchUpperBase: number;

declare const kPCI2PCISubordinateBus: number;

declare const kIOPCI64BitMemorySpace: number;

declare const kIOPCIConfigSpace: number;

declare const kIOPCIExpressL1PMSubstatesCapability: number;

declare const kIOPCIExpressAccessControlServicesCapability: number;

declare const kIOPCIExpressPowerBudgetCapability: number;

declare const kIOPCIExpressErrorReportingCapability: number;

declare const kIOPCIFPBCapability: number;

declare const kIOPCIMSIXCapability: number;

declare const kIOPCIPCIExpressCapability: number;

declare const kIOPCIAGP8Capability: number;

declare const kIOPCIVendorSpecificCapability: number;

declare const kIOPCILDTCapability: number;

declare const kIOPCISlotIDCapability: number;

declare const kIOPCIPowerManagementCapability: number;

declare const kIOPCIConfigMaximumLatency: number;

declare const kIOPCIConfigInterruptPin: number;

declare const kIOPCIConfigSubSystemID: number;

declare const kIOPCIConfigCardBusCISPtr: number;

declare const kIOPCIConfigBaseAddress5: number;

declare const kIOPCIConfigBaseAddress4: number;

declare const kIOPCIConfigBaseAddress0: number;

declare const kIOPCIConfigCacheLineSize: number;

declare const kIOPCIConfigRevisionID: number;

declare const kIOPCIConfigCommand: number;

declare const IOPCIDeviceInterface: number;

declare const gIOPCIDeviceMetaClass: interop.Pointer;

declare const kIOPCICorrectableErrorBitCorrectedInternal: number;

declare const kIOPCICorrectableErrorBitAdvisoryNonFatal: number;

declare const kIOPCICorrectableErrorBitBadTLP: number;

declare const kIOPCICorrectableErrorBitReceiver: number;

declare const kIOPCIUncorrectableErrorBitMCBlockedTLP: number;

declare const kIOPCIUncorrectableErrorBitInternal: number;

declare const kIOPCIUncorrectableErrorBitUnexpectedCompletion: number;

declare const kIOPCIUncorrectableErrorBitCompleterAbort: number;

declare const kIOPCIUncorrectableErrorBitCompletionTimeout: number;

declare const kIOPCIUncorrectableErrorBitSurpriseDown: number;

declare const kIOPCIAERCapTLPPrefixLogDW2Offset: number;

declare const kIOPCIAERCapTLPPrefixLogDW0Offset: number;

declare const kIOPCIAERCapHdrLogDW3Offset: number;

declare const kIOPCIAERCapHdrLogDW2Offset: number;

declare const kIOPCIAERCapCapControlOffset: number;

declare const kIOPCIAERCapCorErrMaskOffset: number;

declare const kIOPCISlotStatusDataLinkLayerStateChanged: number;

declare const kIOPCISlotStatusPresenceDetectChanged: number;

declare const kIOPCISlotStatusMRLSensorChanged: number;

declare const kIOPCISlotCapabilitiesBitElectromechanicalInterlockPresent: number;

declare const kIOPCISlotCapabilitiesBitHotPlugCapable: number;

declare const kIOPCISlotCapabilitiesBitPowerIndicatorPresent: number;

declare const kIOPCISlotCapabilitiesBitAttentionIndicatorPresent: number;

declare const kIOPCISlotCapabilitiesBitPowerControllerPresent: number;

declare const kPCIPMCSPMEWakeReason: number;

declare const kPCIPMCSPMEDisableInS3: number;

declare const kEfiUnusableMemory: number;

declare const kPCIPMCSDefaultEnableBits: number;

declare const kPCIPMCSPowerStateD3: number;

declare const kPCIPMCSPMEEnable: number;

declare const kPCIPMCPMESupportFromD0: number;

declare const kPCIPMCPMESupportFromD1: number;

declare const kPCIPMCPMESupportFromD2: number;

declare const kPCIPMCPMESupportFromD3Cold: number;

declare const kPCI2PCIOffsetBridgeControl: number;

declare const kPCI2PCIOffsetSecondaryBus: number;

declare const kPCI2PCIOffsetPrimaryBus: number;

declare const kIOPCIStatusParityErrActive: number;

declare const kIOPCIStatusLeadAbortActive: number;

declare const kIOPCIStatusDevSel3: number;

declare const kIOPCIStatusDevSel2: number;

declare const kIOPCIStatusDevSel1: number;

declare const kIOPCIStatusCapabilities: number;

declare const kIOPCIStatusInterrupt: number;

declare const kIOPCICommandSERR: number;

declare const kIOPCICommandPaletteSnoop: number;

declare const kIOPCICommandBusMaster: number;

declare const kIOPCICommandBusLead: number;

declare const kIOPCIExpressCapabilityIDHierarchyID: number;

declare const kIOPCIExpressCapabilityIDVFResizableBAR: number;

declare const kIOPCIExpressCapabilityIDMPCIe: number;

declare const kIOPCIExpressCapabilityIDDPC: number;

declare const kIOPCIExpressCapabilityIDLNR: number;

declare const kIOPCIExpressCapabilityIDPMUX: number;

declare const kIOPCIExpressCapabilityIDSPCIe: number;

declare const kIOPCIExpressCapabilityIDTPHRequester: number;

declare const kIOPCIExpressCapabilityIDResizableBAR: number;

declare const kIOPCIExpressCapabilityIDAMD: number;

declare const kIOPCIExpressCapabilityIDPRI: number;

declare const kIOPCIExpressCapabilityIDAlternativeRoutingID: number;

declare const kIOPCIExpressCapabilityIDCAC: number;

declare const kIOPCIExpressCapabilityIDVSEC: number;

declare const kIOPCIExpressCapabilityIDRootComplexRegBlock: number;

declare const kIOPCIExpressCapabilityIDMFVC: number;

declare const kIOPCIExpressCapabilityIDDeviceSerialNumber: number;

declare const kIOPCICapabilityIDFPB: number;

declare const kIOPCICapabilityIDAF: number;

declare const kIOPCICapabilityIDSATAConfiguration: number;

declare const kIOPCICapabilityIDMSIX: number;

declare const kIOPCICapabilityIDSecure: number;

declare const kIOPCICapabilityIDAGP8: number;

declare const kIOPCICapabilityIDDebugPort: number;

declare const kIOPCICapabilityIDPCIX: number;

declare const kIOPCICapabilityIDSlotID: number;

declare const kIOPCICapabilityIDOffset: number;

declare const kIOPCIConfigurationOffsetInterruptLine: number;

declare const kIOPCIConfigurationOffsetCardBusCISPtr: number;

declare const kIOPCIConfigurationOffsetBaseAddress0: number;

declare const kIOPCIConfigurationOffsetBIST: number;

declare const kIOPCIConfigurationOffsetHeaderType: number;

declare const kIOPCIConfigurationOffsetCacheLineSize: number;

declare const kIOPCIConfigurationOffsetClassCode: number;

declare const kIOPCIConfigurationOffsetDeviceID: number;

declare const kIOInterruptTypePCIMessaged: number;

declare const IOHIDPointingDevice: number;

declare const IODataQueue: number;

declare const IOHIDevice: number;

declare const kHIDOutputReport: number;

declare const IOHIKeyboardMapper: number;

declare const IOHIDKeyboardDevice: number;

declare const kModifier_Locked: number;

declare const kModifier_DidKeyUp: number;

declare const kModifier_DidPerformModifiy: number;

declare const kState_Mask: number;

declare const kState_On_ModifiersDown: number;

declare const kState_On: number;

declare const kState_ShiftActivates_Flag: number;

declare const kState_Disabled_Flag: number;

declare const IOHIKeyboard: number;

declare const kIOTimeOptionsContinuous: number;

declare const kIOTimerEventSourceOptionsPriorityUser: number;

declare const kIOTimerEventSourceOptionsPriorityHigh: number;

declare const kIOTimerEventSourceOptionsPriorityMask: number;

declare const IOFireWireLib: number;

declare const kFWExtendedTCodeWrapAdd: number;

declare const kFWExtendedTCodeBoundedAdd: number;

declare const kFWExtendedTCodeLittleAdd: number;

declare const kFWExtendedTCodeFetchAdd: number;

declare const kFWExtendedTCodeCompareSwap: number;

declare const kFWTCodeIsochronousBlock: number;

declare const kFWTCodeCycleStart: number;

declare const kFWTCodeReadBlock: number;

declare const kFWTCodeWriteBlock: number;

declare const kFWTCodeWriteQuadlet: number;

declare const kFWAsynchRCode: number;

declare const kFWAsynchAckSentPhase: number;

declare const kFWAsynchExtendedTCode: number;

declare const kFWAsynchDataLengthPhase: number;

declare const kFWAsynchDataLength: number;

declare const kFWAsynchDestinationOffsetLowPhase: number;

declare const kFWAsynchDestinationOffsetHigh: number;

declare const kFWAsynchSourceID: number;

declare const kFWAsynchDestinationIDPhase: number;

declare const kFWAsynchDestinationID: number;

declare const kFWAsynchPriority: number;

declare const kTIAsycnhRetryB: number;

declare const kFWAsynchRetryA: number;

declare const kFWAsynchTTotal: number;

declare const kFWSelfIDMore: number;

declare const kFWSelfIDNPhPhase: number;

declare const kFWSelfIDNPh: number;

declare const kFWSelfIDNPgPhase: number;

declare const kFWSelfIDNPg: number;

declare const kFWSelfIDNPbPhase: number;

declare const kFWSelfIDNNPhase: number;

declare const kFWSelfIDPacketType: number;

declare const kFWSelfID0P1Phase: number;

declare const kFWSelfID0P0: number;

declare const kFWSelfID0Del: number;

declare const kFWSelfID0SP: number;

declare const kFWSelfID0L: number;

declare const kFWSelfIDM: number;

declare const kFWSelfIDPhyIDPhase: number;

declare const kFWSelfIDBusPowered10W: number;

declare const kFWSelfIDBusPowered3W: number;

declare const kFWSelfIDNoPower: number;

declare const kFWSelfIDPortStatusNotConnected: number;

declare const kFWSelfIDPortStatusChild: number;

declare const kFWPhyConfigurationGapCntPhase: number;

declare const kFWPhyConfigurationGapCnt: number;

declare const kFWPhyConfigurationT: number;

declare const kFWSelfIDPacketID: number;

declare const kFWLinkOnPacketID: number;

declare const kMaxSelfIDs: number;

declare const kIOPCIConfigurationOffsetExpansionROMBase: number;

declare const kSelfIDPacketSize: number;

declare const kFWPhyPacketPhyIDPhase: number;

declare const kMaxWaitForValidSelfID: number;

declare const IOFireWireIRM: number;

declare const IOFWWorkLoop: number;

declare const IOFireWireLink: number;

declare const IOFWQEventSource: number;

declare const IOFireWireMultiIsochReceiveListener: number;

declare const IOFWPHYPacketListener: number;

declare const IOFireWireIRMAllocation: number;

declare const IOFireWireBusAux: number;

declare const IOFWDCLPool: number;

declare const IOFireWirePowerManager: number;

declare const IOLocalConfigDirectory: number;

declare const gFireWireModel_ID: interop.Pointer;

declare const gFireWire_GUID: interop.Pointer;

declare const gFireWireVendor_ID: interop.Pointer;

declare const gFireWireSpeed: interop.Pointer;

declare const gFireWireROM: interop.Pointer;

declare const IOFireWireSBP2ManagementORB: number;

declare const IOFireWireSBP2Login: number;

declare const IOFireWireSBP2ORB: number;

declare const kFWSBP2MaxPageClusterSize: number;

declare const IOEventSource: number;

declare const IOFWSimplePhysicalAddressSpace: number;

declare const kIODMAMapOptionIterateOnly: number;

declare const kIODMAMapOptionNoCacheStore: number;

declare const kIODMAMapOptionTypeMask: number;

declare const kIODMAMapOptionMapped: number;

declare const IOFWPseudoAddressSpaceAux: number;

declare const IOFireWireDevice: number;

declare const IOFWReadQuadCommand: number;

declare const IOFWAsyncCommand: number;

declare const IOFWUserWriteCommand: number;

declare const IOFWDelayCommand: number;

declare const IOFWAddressSpace: number;

declare const IOFireWireNub: number;

declare const IOSyncer: number;

declare const kOFVariablePermUserWrite: number;

declare const kOFVariablePermRootOnly: number;

declare const IOConditionLock: number;

declare const CONSISTENT_DEBUG_VERSION_VAL: number;

declare const CONSISTENT_DEBUG_MAGIC_VAL: number;

declare const CONSISTENT_DEBUG_PANIC_SOURCE_SPTM: number;

declare const CONSISTENT_DEBUG_PANIC_LEN: number;

declare const DEBUG_HEADER_ENTRY_SPTM: number;

declare const DEBUG_HEADER_MAGIC_VAL: number;

declare const kSMEPredicateCount: number;

declare const kIOPCIHotplugCapability: number;

declare const kSMEMaxPredicateSize: number;

declare const kSMEMaxVectorSize: number;

declare const SPTM_VARIANT_DEVELOPMENT: number;

declare const random_seed_length: number;

declare const SPTM_MAP_FLUSH_PENDING: number;

declare const SPTM_MAP_VALID: number;

declare const SPTM_SUCCESS: number;

declare const SPTM_N_PUBLIC_VIOLATIONS: number;

declare const kAirshipDaleBasebandErrorPCILinkResumeFail: number;

declare const kAirshipDaleBasebandErrorPCICplTimeout: number;

declare const kAirshipDaleBasebandErrorPCIAER: number;

declare const kAirshipDaleBasebandErrorPortEnableFailure: number;

declare const kAirshipDaleBasebandDevicePowerOnTimedOut: number;

declare const kAirshipDaleBasebandErrorRxGetCompletionFailure: number;

declare const kAirshipDaleBasebandErrorTxGetCompletionFailure: number;

declare const kAirshipDaleBasebandErrorRxEnqueueFailure: number;

declare const kAirshipDaleBasebandErrorRxConsumeFailure: number;

declare const kAirshipDaleBasebandErrorCCCIInvalidMessage: number;

declare const kAirshipDaleBasebandErrorCCCIHandshakeTimeout: number;

declare const kAirshipDaleBasebandErrorInvalidBootStage: number;

declare const kDALEIPCBBTimeDomainNetwork: number;

declare const kDALEIPCBBTimeDomainGNSS: number;

declare const kAirshipDaleBasebandControlInterfaceErrorMsg: number;

declare const kAirshipDaleBasebandTraceUserClientMax: number;

declare const kAirshipDaleBasebandTraceUserClientClose: number;

declare const kAirshipDaleBasebandControlInterfaceUserClientMax: number;

declare const kAirshipDaleBasebandControlInterfaceUserClientGetDeviceTimeAsync: number;

declare const kAirshipDaleBasebandControlInterfaceUserClientWriteAsync: number;

declare const kAirshipDaleBasebandControlInterfaceUserClientWrite: number;

declare const kAirshipDaleBasebandControlInterfaceUserClientRead: number;

declare const kAirshipDaleBasebandControlInterfaceUserClientOpen: number;

declare const IFNET_THROTTLE_OPPORTUNISTIC: number;

declare const IFNET_THROTTLE_OFF: number;

declare const IFNET_NPM_THRESH_GENERAL: number;

declare const IFNET_NPM_THRESH_NEAR: number;

declare const IFNET_SCHED_MODEL_FQ_CODEL_NEW_DM: number;

declare const IFNET_SCHED_MODEL_FQ_CODEL_NEW: number;

declare const IFNET_SCHED_MODEL_FQ_CODEL: number;

declare const IFNET_LQM_THRESH_POOR: number;

declare const IFNET_LQM_THRESH_ABORT: number;

declare const IFNET_WAKE_ON_MAGIC_PACKET: number;

declare const IFNET_RX_CSUM: number;

declare const IFNET_LRO: number;

declare const IFNET_SW_TIMESTAMP: number;

declare const IFNET_TSO_IPV4: number;

declare const IFNET_IPV6_FRAGMENT: number;

declare const IFNET_CSUM_UDPIPV6: number;

declare const IFNET_CSUM_TCPIPV6: number;

declare const IFNET_IP_FRAGMENT: number;

declare const IFNET_CSUM_FRAGMENT: number;

declare const IFNET_CSUM_TCP: number;

declare const BPF_MODE_OUTPUT: number;

declare const BPF_MODE_INPUT: number;

declare const IFNET_FAMILY_IPSEC: number;

declare const IFNET_FAMILY_UTUN: number;

declare const IFNET_FAMILY_FAITH: number;

declare const IFNET_FAMILY_VLAN: number;

declare const IFNET_FAMILY_LOOPBACK: number;

declare const hv_disable: number;

declare const kpc_actionid: number;

declare const kpc_threads_counting: number;

declare const kHV_ION_EXIT_FULL: number;

declare const oop_jit_conversion: unknown /* const array */;

declare const CS_LINKAGE_APPLICATION_OOPJIT_TOTAL: number;

declare const CS_LINKAGE_APPLICATION_OOPJIT_INVALID: number;

declare const CS_LINKAGE_APPLICATION_XOJIT: number;

declare const CS_LINKAGE_APPLICATION_ROSETTA: number;

declare const CS_LINKAGE_APPLICATION_INVALID: number;

declare const CS_VALIDATION_CATEGORY_NONE: number;

declare const CS_VALIDATION_CATEGORY_OOPJIT: number;

declare const CS_VALIDATION_CATEGORY_DEVELOPER_ID: number;

declare const CS_VALIDATION_CATEGORY_ENTERPRISE: number;

declare const CS_SIGNER_TYPE_OOPJIT: number;

declare const CS_SUPPL_SIGNER_TYPE_LOCAL: number;

declare const CS_SUPPL_SIGNER_TYPE_TRUSTCACHE: number;

declare const CS_SUPPL_SIGNER_TYPE_UNKNOWN: number;

declare const CS_SIGNER_TYPE_LEGACYVPN: number;

declare const CS_SIGNER_TYPE_UNKNOWN: number;

declare const kIOPCIConfigAGPStatusOffset: number;

declare const CS_CDHASH_LEN: number;

declare const CS_HASHTYPE_SHA256: number;

declare const CSTYPE_INDEX_ENTITLEMENTS: number;

declare const CSTYPE_INDEX_REQUIREMENTS: number;

declare const CSSLOT_SIGNATURESLOT: number;

declare const kAirshipDaleBasebandTraceUserClientGetTraceInfo: number;

declare const CSSLOT_ALTERNATE_CODEDIRECTORY_MAX: number;

declare const CSSLOT_LIBRARY_CONSTRAINT: number;

declare const CSSLOT_DER_ENTITLEMENTS: number;

declare const CSSLOT_ENTITLEMENTS: number;

declare const CSSLOT_RESOURCEDIR: number;

declare const CSSLOT_REQUIREMENTS: number;

declare const CSSLOT_INFOSLOT: number;

declare const CSSLOT_CODEDIRECTORY: number;

declare const CS_SUPPORTSRUNTIME: number;

declare const CSMAGIC_BLOBWRAPPER: number;

declare const CSMAGIC_DETACHED_SIGNATURE: number;

declare const CSMAGIC_EMBEDDED_SIGNATURE_OLD: number;

declare const CSMAGIC_EMBEDDED_SIGNATURE: number;

declare const CSMAGIC_CODEDIRECTORY: number;

declare const CSMAGIC_REQUIREMENT: number;

declare const kIOPCIAERCapCapHeaderOffset: number;

declare const IOHIDElement: number;

declare const IOUSBHostCITransferCompletionMessageControlStatus: number;

declare const kAirshipDaleBasebandErrorTxConsumeFailure: number;

declare const kFBOnlineInterruptServiceType: number;

declare const kIOPCICapabilityIDAGP: number;

declare const IOUSBHostInterfaceMetaClass: number;

declare const kPCI2PCIPrefetchUpperLimit: number;

declare const kIOPCISlotStatusAttentionButtonPressed: number;

declare const kIOPCIStatusFastBack2Back: number;

declare const kIOPCIAERCapRootErrStatusOffset: number;

declare const kATAcmdWriteDMAExtended: number;

declare const kIOPCICommandAddressStepping: number;

declare const kUSB3LPMMaxU2SEL: number;

declare const UCInfo: number;

declare const kSuperSpeedEndpointCompanionDescriptorBulkMaxStreamsPhase: number;

declare const kIODMAMapOptionOnChip: number;

declare const IOHIPointing: number;

declare const IFNET_FAMILY_PPP: number;

declare const kPEPanicBegin: number;

declare const IFNET_TSO_IPV6: number;

declare const kDeviceRequestGetInterface: number;

declare const CS_SHA256_TRUNCATED_LEN: number;

declare const kDeviceRequestDirectionMask: number;

declare const CS_VALIDATION_CATEGORY_LOCAL_SIGNING: number;

declare const gFireWireVendor_Name: interop.Pointer;

declare const kHBLInterruptServiceType: number;

declare const kIOPCIStatusDevSel0: number;

declare const IOAccelerator: number;

declare const AppleUSBHostRequestCompleter: number;

declare const catch_exc_subsystem: catch_exc_subsystem;

declare const kCheckLinkForPower: number;

declare const kPCI2PCIPrimaryBus: number;

declare const kIOPCIExpressCapabilityIDPrecisionTimeManagement: number;

declare const kFWIsochChannelNotEnoughBandwidth: number;

declare const kConfigurationDescriptorAttributeSelfPowered: number;

declare const MBUF_TYPE_SONAME: number;

declare const gOSAction_IOHIDEventService__SetLEDMetaClass: interop.Pointer;

declare const kInterfaceSuspendLowPower: number;

declare const kIOFWSBP2FailsOnAckBusy: number;

declare const kIOFBNotifyEvent_Probed: number;

declare const kHIDDispatchOptionPointerAbsolutToRelative: number;

declare const kPCIPMCSPowerStateD0: number;

declare const doubleagent_subsystem: doubleagent_subsystem;

declare const IOFWUserPHYPacketListener: number;

declare const IOStream: number;

declare const kIOUserNotifyOptionCanDrop: number;

declare const kIOUCStructIStructO: number;

declare const kIOUCScalarIStructO: number;

declare const IOUSBHostCIPortCapabilitiesMessageControlConnectorType: number;

declare const kIOMemoryUnshared: number;

declare const kIOMemoryHostPhysicallyContiguous: number;

declare const kIOMemoryPurgeable: number;

declare const kIOMemoryPageable: number;

declare const IOInterruptEventSource: number;

declare const gIOAllCPUInitializedKey: interop.Pointer;

declare const gIOExclaveAssignedKey: interop.Pointer;

declare const gIOMatchDeferKey: interop.Pointer;

declare const gIODriverKitUserClientEntitlementAllowThirdPartyUserClientsKey: interop.Pointer;

declare const gIODriverKitTestDriverEntitlementKey: interop.Pointer;

declare const gIOServiceDEXTEntitlementsKey: interop.Pointer;

declare const gIOUserClientEntitlementsKey: interop.Pointer;

declare const gIOBSDUnitKey: interop.Pointer;

declare const gIOBSDMajorKey: interop.Pointer;

declare const gIOBSDNameKey: interop.Pointer;

declare const gIOCompatibilityMatchKey: interop.Pointer;

declare const gIOUserServicePropertiesKey: interop.Pointer;

declare const gIOSupportedPropertiesKey: interop.Pointer;

declare const gIOInterruptControllersKey: interop.Pointer;

declare const gIOAppPowerStateInterest: interop.Pointer;

declare const kSecondOrderRanking: number;

declare const gIOGeneralInterest: interop.Pointer;

declare const gIOWillTerminateNotification: interop.Pointer;

declare const gIOFirstMatchNotification: interop.Pointer;

declare const gIOFirstPublishNotification: interop.Pointer;

declare const gIOPublishNotification: interop.Pointer;

declare const gIOKitDebugKey: interop.Pointer;

declare const gIOUserServerPreserveUserspaceRebootKey: interop.Pointer;

declare const gIOAssociatedServicesKey: interop.Pointer;

declare const gIOUserClassesKey: interop.Pointer;

declare const gIODEXTMatchCountKey: interop.Pointer;

declare const gIORematchCountKey: interop.Pointer;

declare const gIOMatchedPersonalityKey: interop.Pointer;

declare const gIODefaultMatchCategoryKey: interop.Pointer;

declare const gIOMatchCategoryKey: interop.Pointer;

declare const gIOPropertyMatchKey: interop.Pointer;

declare const gIONameMatchKey: interop.Pointer;

declare const gIOProviderClassKey: interop.Pointer;

declare const kIOACPIAddressSpaceIDSystemMemory: number;

declare const gIOResourceMatchedKey: interop.Pointer;

declare const gIOResourceMatchKey: interop.Pointer;

declare const gIOPowerPlane: interop.Pointer;

declare const gIOServicePlane: interop.Pointer;

declare const kIOServiceFamilyOpenOptions: number;

declare const kIOServiceAsynchronous: number;

declare const kIOServiceSynchronous: number;

declare const gFireWireTDM: interop.Pointer;

declare const kIOServiceTerminate: number;

declare const kIOServiceExclusive: number;

declare const kIOServiceReservedMatchState: number;

declare const kIOServiceFirstPublishState: number;

declare const kIOReportQuantityPacketCount: number;

declare const kIOReportQuantityCapacitance: number;

declare const kIOReportQuantityVoltage: number;

declare const kIOReportQuantityEnergy: number;

declare const kIOReportQuantityPower: number;

declare const kIOReportQuantityUndefined: number;

declare const kIOReportTraceChannelData: number;

declare const kIOReportCopyChannelData: number;

declare const kIOReportEnable: number;

declare const kIOReportFormatSimpleArray: number;

declare const kIOReportFormatState: number;

declare const kIOReportInvalidFormat: number;

declare const IOTimerEventSource: number;

declare const IOCommandGate: number;

declare const kIOTrackingInvalid: number;

declare const kIOTrackingSetMinCaptureSize: number;

declare const kIOTrackingStopCapture: number;

declare const kIOTrackingStartCapture: number;

declare const kIOTrackingResetTracking: number;

declare const kIOTrackingGetMappings: number;

declare const gIOTrackingLeakScanCallback: (p1: number) => void;

declare const gIODKDebug: number;

declare const kIODKDisableCheckInTokenVerification: number;

declare const kIODKDisableDextTag: number;

declare const kIODKDisableDextLaunch: number;

declare const kIODKLogMessages: number;

declare const kIODKLogPM: number;

declare const kIODKLogSetup: number;

declare const kIOTraceCommandGates: number;

declare const kIOTraceIntEventSource: number;

declare const kIOTraceEventSources: number;

declare const kIOTraceWorkLoops: number;

declare const _kIODebugTopFlag: number;

declare const kIOTrackingBoot: number;

declare const kIOWaitQuietBeforeRoot: number;

declare const kIOTracking: number;

declare const kIONoFreeObjects: number;

declare const kIOLogPMRootDomain: number;

declare const kIOLogDTree: number;

declare const kIOLogTracePower: number;

declare const kIOLogMapping: number;

declare const kIOLogYield: number;

declare const kIOLogConfig: number;

declare const kIOLogRegister: number;

declare const kIOLogStart: number;

declare const kIOLogProbe: number;

declare const kIOLogAttach: number;

declare const IONotifier: number;

declare const iokit_iomd_setownership_enabled: boolean;

declare const kIOPreparationIDUnprepared: number;

declare const kIODMAMapIdentityMap: number;

declare const kIODMAMapDeviceMemory: number;

declare const kIODMAMapPhysicallyContiguous: number;

declare const kIODMAMapReadAccess: number;

declare const kIOMemoryClearEncrypted: number;

declare const kIOMemoryIncoherentIOStore: number;

declare const kIOMemoryPurgeableVolatileGroup7: number;

declare const kIOMemoryPurgeableVolatileGroup6: number;

declare const kIOMemoryPurgeableVolatileGroup5: number;

declare const kIOMemoryPurgeableVolatileGroup1: number;

declare const kIOMemoryPurgeableEmpty: number;

declare const kIOMemoryPurgeableNonVolatile: number;

declare const kIOMemoryClearEncrypt: number;

declare const kIOMemoryThreadSafe: number;

declare const kIOMemoryRemote: number;

declare const kIOMemoryPersistent: number;

declare const kIOMemoryHostOnly: number;

declare const kIOMemoryMapperNone: number;

declare const kIOMemoryTypeMask: number;

declare const kIOMemoryTypePersistentMD: number;

declare const kIOMemoryTypeVirtual: number;

declare const kIOMemoryDirectionMask: number;

declare const kIODirectionPrepareNoFault: number;

declare const _IOMemoryDescriptorMixedData: number;

declare const IOMapper: number;

declare const kIOPCISlotStatusPresenceDetectState: number;

declare const IOLockGroup: interop.Pointer;

declare const phy_write_panic: number;

declare const phy_read_panic: number;

declare const mach_absolutetime_last_sleep: number;

declare const kext_assertions_enable: number;

declare const IORegistryIterator: number;

declare const IORegistryPlane: number;

declare const gIORegistryEntryAllowableSetPropertiesKey: interop.Pointer;

declare const gIORegistryEntryIDKey: interop.Pointer;

declare const gIOLocationKey: interop.Pointer;

declare const gIONameKey: interop.Pointer;

declare const OSIterator: number;

declare const kOSStringNoCopy: number;

declare const OSSymbol: number;

declare const OSMetaClass: number;

declare const kIOPCIStatusTargetAbortActive: number;

declare const kIOPCIExpressCapabilityIDL1PMSubstates: number;

declare const MBUF_TYPE_FREE: number;

declare const kPEPanicRestartCPUNoCallouts: number;

declare const catch_mach_exc_subsystem: catch_mach_exc_subsystem;

declare const gIODisplayFadeTime2Key: interop.Pointer;

declare const kIOPCIExpressDeviceSerialNumberCapability: number;

declare const OSOffset: number;

declare const IOStreamUserClient: number;

declare const kIOPCIMSICapability: number;

declare const IOMbufNaturalMemoryCursor: number;

declare const ecc_panic_physical_address: number;

declare const kIOPCIExpressCapabilityIDRCECEndpointAssociation: number;

declare const IFNET_FAMILY_ETHERNET: number;

declare const kDeviceStatusLTMEnable: number;

declare const kIOFBNotifyPriority_Max: number;

declare const MBUF_TYPE_SOCKET: number;

declare const IFNET_SCHED_MODEL_NORMAL: number;

declare const mATAWriteFault: number;

declare const kEndpointFeatureSelectorStall: number;

declare const kUSB20ExtensionCapabilityBESLValid: number;

declare const kIOPCIConfigBIST: number;

declare const sock_data_filt_flag_oob: number;

declare const kIOPCIConfigurationOffsetRevisionID: number;

declare const kAirshipDaleBasebandErrorDevicePowerOffTimedOut: number;

declare const IFNET_CSUM_IP: number;

declare const IOUSBHostCIMessageControlType: number;

declare const kFWConfigurationPacketID: number;

declare const static_if_modified_keys: interop.Pointer;

declare const gIOUserServerNameKey: interop.Pointer;

declare const kDeviceRequestGetStatus: number;

declare const kIOFBNotifyEvent_SleepWake: number;

declare const kIOPCIDeviceOnState: number;

declare const kOSLogRegistryMods: number;

declare const kSuperSpeedHubDelayMax: number;

declare const kPACKET: number;

declare const gIODriverKitEntitlementKey: interop.Pointer;

declare const IOUSBHostDevice_Class: OSClassLoadInformation;

declare const kIOPCIExpressCapabilityIDLatencyTolerenceReporting: number;

declare const IOBlockStorageDriver: number;

declare const IOUSBHostPipe: number;

declare const EventElementCollection: number;

declare const kIOPCICPCIHotswapCapability: number;

declare const ApplePlatformExpert: number;

declare const kIOKitDiagnosticsClientType: number;

declare const kIOFBNotifyDidSleep: number;

declare const kFWSelfIDPortStatusParent: number;

declare const kAirshipDaleBasebandErrorMax: number;

declare const SPTM_MAP_CODESIGN_ERROR: number;

declare const gIOOpenInterest: interop.Pointer;

declare const IOFramebuffer: number;

declare const IOAudioToggleControl: number;

declare const kIOFBNotifyVRAMReady: number;

declare const kIOMemoryBufferPageable: number;

declare const kIOPCIConfigAGPCommandOffset: number;

declare const debug_ivars_size: number;

declare const kIOPCIConfigVendorID: number;

declare const kAirshipDaleBasebandErrorPCIBadRequest: number;

declare const kPCI2PCIOffsetUpperIORange: number;

declare const kFWPacketTCodePhase: number;

declare const gIOACPIPlane: interop.Pointer;

declare const kIOServiceTerminateWithRematch: number;

declare const kAirshipDaleBasebandControlUserClientMax: number;

declare const IOSharedDataQueue: number;

declare const IFNET_FAMILY_GIF: number;

declare const IOUSBHostCISetupTransferData1bmRequestType: number;

declare const IFNET_CSUM_UDP: number;

declare const IFNET_LQM_THRESH_UNKNOWN: number;

declare const IOUserServerCheckInToken: number;

declare const kIOPCIUncorrectableErrorBitPoisonedTLP: number;

declare const gIODisplayManufacturerSpecificKey: interop.Pointer;

declare const gIODisplayPowerStateKey: interop.Pointer;

declare const IOFireWireDeviceAux: number;

declare const kIOPCIDevicePowerStateCount: number;

declare const kIOMemoryMapCopyOnWrite: number;

declare const kIOFBNotifyWillPowerOff: number;

declare const kIOPCIExpressCapabilityIDVirtualChannel: number;

declare const BPF_MODE_DISABLED: number;

declare const IOUSBHostCILinkData1TransferStructureAddressPhase: number;

declare const IOMemoryCursor: number;

declare const kIOFBNotifyGroupID_AppleGraphicsControl: number;

declare const CONSISTENT_DEBUG_PANIC_SOURCE_SK: number;

declare const IOFWAddressSpaceAux: number;

declare const kATAcmdSeek: number;

declare const kIOStatistics: number;

declare const SPTM_VARIANT_RELEASE: number;

declare const kEndpointDescriptorDirectionIn: number;

declare const kSuperSpeedDeviceCapabilityLTM: number;

declare const bin2bcd_data: interop.Pointer;

declare const gIORematchPersonalityKey: interop.Pointer;

declare const kSCSIPort_StatusOffline: number;

declare const IFNET_FAMILY_CELLULAR: number;

declare const kATAcmdReadDMA: number;

declare const IOACPIPlatformExpert: number;

declare const kPEPanicDiagnosticsInProgress: number;

declare const kIOPCICommandFastBack2Back: number;

declare const kIOMemoryKernelUserShared: number;

declare const kIOAGPDisablePageSpans: number;

declare const kKeyMaskPeriod: number;

declare const kIOTrackingGetTracking: number;

declare const kAirshipDaleBasebandErrorPCILinkDown: number;

declare const DEBUG_HEADER_ENTRY_TXM: number;

declare const kFWPhyPacketIDPhase: number;

declare const kFWTCodeLock: number;

declare const IFNET_FAMILY_ANY: number;

declare const kFWTCodePHYPacket: number;

declare const IOFWAsyncStreamReceivePort: number;

declare const MBUF_LOOP: number;

declare const kIOPCICorrectableErrorBitReplayTimerTimeout: number;

declare const debug_malloc_size: number;

declare const kAirshipDaleBasebandErrorTxEnqueueFailure: number;

declare const kATAcmdMediaEject: number;

declare const mATABadBlock: number;

declare const kFWSelfIDNPd: number;

declare const gIONameMatchedKey: interop.Pointer;

declare const mATASeekComplete: number;

declare const gIODTModelKey: interop.Pointer;

declare const IOInterruptController: number;

declare const IOBigMemoryCursor: number;

declare const kEfiACPIReclaimMemory: number;

declare const IOSCSIProtocolServices: number;

declare const kSuperSpeedEndpointCompanionDescriptorBulkReservedPhase: number;

declare const gIODTBridgeModelKey: interop.Pointer;

declare const kAirshipDaleBasebandControlUserClientClose: number;

declare const nfs_ticks: number;

declare const kFWAsynchSpd: number;

declare const kIOFBNotifyProbed: number;

declare const kFWAsynchDestinationOffsetLow: number;

declare const gIODeviceMemoryKey: interop.Pointer;

declare const IOUSBHostCISetupTransferData1wIndex: number;

declare const kIOACPIAddressSpaceIDPCIConfiguration: number;

declare const kFWAsynchSpdPhase: number;

declare const kIOMemoryTypeUIO: number;

declare const IFNET_NPM_THRESH_FAR: number;

declare const kIOMemoryLedgerTagMedia: number;

declare const kHIDDispatchOptionPhaseMayBegin: number;

declare const kOFVariablePermKernelOnly: number;

declare const bATAUncorrectable: number;

declare const kFWSelfIDPortStatusNotPresent: number;

declare const IFNET_FAMILY_MDECAP: number;

declare const kRegIterSubTrees: number;

declare const gIODisplayGreenGammaScaleKey: interop.Pointer;

declare const IOFWSimpleContiguousPhysicalAddressSpace: number;

declare const kIOAGPStateEnablePending: number;

declare const kIOPCIExpressCapabilityIDMRIOV: number;

declare const kKeyMaskCtrl: number;

declare const kAirshipDaleBasebandTraceUserClientOpen: number;

declare const CSSLOT_LAUNCH_CONSTRAINT_RESPONSIBLE: number;

declare const hv_support_available: number;

declare const kIOPCICPCIResourceControlCapability: number;

declare const kIOPCIExpressCapabilityIDAlternateProtocol: number;

declare const IOUSBHostCISetupTransferData1bmRequestTypePhase: number;

declare const kIOReportFormatSimple: number;

declare const kIOAGP4xDataRate: number;

declare const kIOAGP1xDataRate: number;

declare const kIOPCISecureCapability: number;

declare const CS_HASHTYPE_SHA256_TRUNCATED: number;

declare const IOFireWireUnit: number;

declare const gIOCompatibilityPropertiesKey: interop.Pointer;

declare const kIOFBNotifyWillSleep: number;

declare const CSSLOT_ALTERNATE_CODEDIRECTORIES: number;

declare const kDeviceFeatureSelectorLTMEnable: number;

declare const kIOPCICorrectableErrorBitBadDLLP: number;

declare const kHIDDispatchOptionPointerAffixToScreen: number;

declare const IOFWUserReadQuadletCommand: number;

declare const mATASectorSize: number;

declare const gIODisplayMCCSVersionKey: interop.Pointer;

declare const kUSBHostClassRequestCompletionTimeout: number;

declare const kHV_ION_ANY_SIZE: number;

declare const kIOPCICommandMemWrInvalidate: number;

declare const IOUSBHostCIDoorbellEndpointAddressPhase: number;

declare const kFWAsynchSourceIDPhase: number;

declare const kIOReturnOutputStall: number;

declare const AVCCommandHandlerInfo: number;

declare const gIOACPIUniqueIDKey: interop.Pointer;

declare const gIODriverKitUserClientEntitlementsKey: interop.Pointer;

declare const kFBDisplayPowerStateMask: number;

declare const kIOPCIConfigurationOffsetMaximumLatency: number;

declare const IFNET_VLAN_TAGGING: number;

declare const kATAcmdFlushCache: number;

declare const kATAEnableAPM: number;

declare const kEndpointDescriptorReservedPhase: number;

declare const kSuperSpeedEndpointCompanionDescriptorBulkReserved: number;

declare const kFWSelfID0P2Phase: number;

declare const kFWSelfID0SPPhase: number;

declare const gIOBusyInterest: interop.Pointer;

declare const kSuccess: number;

declare const kSuperSpeedPlusDeviceCapabilitySublinkSpeedAttrCountPhase: number;

declare const kRegPropertyValueIsSavedToNVRAM: number;

declare const kEndpointDescriptorSynchronizationTypeAdaptive: number;

declare const kUSB20ExtensionCapabilityBESLPhase: number;

declare const IOFWPseudoAddressSpace: number;

declare const kRootDomainSleepNotSupported: number;

declare const kFWIsochChannelChannelNotAvailable: number;

declare const kIOExternalMethodArgumentsCurrentVersion: number;

declare const IODeviceMemory: number;

declare const kIOFWAVCAsyncCmdFreed: number;

declare const kIOPCIStatusTargetAbortCapable: number;

declare const kKUNCOtherResponse: number;

declare const kIOTracePowerMgmt: number;

declare const gIODisplayMaxValueKey: interop.Pointer;

declare const IOUSBHostCISetupTransferData1bRequestPhase: number;

declare const kIOFBNotifyEvent_All: number;

declare const IOFWSyncer: number;

declare const CSMAGIC_EMBEDDED_LAUNCH_CONSTRAINT: number;

declare const kIOACPIAddressSpaceIDSMBus: number;

declare const kIOMemoryPurgeableVolatile: number;

declare const kIOPCICapabilityIDEnhancedAllocation: number;

declare const kIOPCIConfigExpansionROMBase: number;

declare const kFWSelfIDSelfPowered15W: number;

declare const kFWSelfIDBusPowered1W: number;

declare const kIOPCIConfigurationOffsetBaseAddress1: number;

declare const kPingResponseTimeNs: number;

declare const kHIDFeatureReport: number;

declare const kIOPCIExpressCapabilityIDATS: number;

declare const kSuperSpeedDeviceCapabilityHighSpeed: number;

declare const cablePowerInsufficientErr: number;

declare const IOUSBHostCICapabilitiesMessageData0ConnectionLatencyPhase: number;

declare const CS_SUPPORTSSCATTER: number;

declare const kKeyMaskLeftCommand: number;

declare const kIOPCIIOSpace: number;

declare const MBUF_TYPE_FTABLE: number;

declare const kIOFBNotifyPriority_Min: number;

declare const kIOPCIExpressCapabilityIDDVSEC: number;

declare const kIOPCIAERCapErrSourceIDOffset: number;

declare const mATADataRequest: number;

declare const IOHIDDevice_Class: OSClassLoadInformation;

declare const kIOTimeOptionsWithLeeway: number;

declare const CS_HASH_MAX_SIZE: number;

declare const IOServicePM: number;

declare const MBUF_CSUM_REQ_TCP: number;

declare const kSuperSpeedPlusDeviceCapabilitySublinkSymmetryPhase: number;

declare const IOPCIDevice_Class: OSClassLoadInformation;

declare const kPCIPMCSPMEStatus: number;

declare const kATAcmdWriteMultiple: number;

declare const IOMbufMemoryCursor: number;

declare const kATAcmdWriteSame: number;

declare const cableVoltageTooLowErr: number;

declare const IFNET_FAMILY_TUN: number;

declare const gIOInterruptSpecifiersKey: interop.Pointer;

declare const MBUF_LASTFRAG: number;

declare const kUSBHostStandardRequestCompletionTimeout: number;

declare const kOSRegistryModsMode: number;

declare const kFWAsynchAckSent: number;

declare const kSuperSpeedPlusDeviceCapabilitySublinkMinSpeedId: number;

declare const IOUSBHostCIPortCapabilitiesMessageControlPortNumber: number;

declare const kDeviceStatusSelfPowered: number;

declare const kIOPCICapabilityIDVendorSpecific: number;

declare const kIOTraceTimers: number;

declare const kUSB2LPMMaxL1Timeout: number;

declare const kIODMAMapOptionBypassed: number;

declare const kIOPCIConfigStatus: number;

declare const IOUSBHostCIIsochronousTransferData1Buffer: number;

declare const version_prerelease_level: number;

declare const kEndpointDescriptorUsageTypeIsocData: number;

declare const kIOServiceFirstMatchState: number;

declare const IOFireWireSBP2Target: number;

declare const kIOTimerEventSourceOptionsDefault: number;

declare const kKeyMaskRightCommand: number;

declare const IOUSBHostCIPortStatusConnected: number;

declare const kIOPCICommandSpecialCycles: number;

declare const kDeviceRequestDirectionIn: number;

declare const kIOMemoryPurgeableVolatileGroup4: number;

declare const CS_SUPPORTSLINKAGE: number;

declare const kFWSelfIDSelfPowered45W: number;

declare const kIOLogMemory: number;

declare const spec_vnodeop_p: interop.Pointer;

declare const kIOACPIFixedEventSleepButton: number;

declare const kIOServiceFamilyCloseOptions: number;

declare const kSuperSpeedPlusDeviceCapabilityMinRxLaneCount: number;

declare const kIOAGPSideBandAddresssing: number;

declare const IOUSBHostCIPortStatusSpeedPhase: number;

declare const kUSB20ExtensionCapabilityBESL: number;

declare const kHV_ION_NONE: number;

declare const IFNET_FAMILY_UNUSED_16: number;

declare const OSCollectionIterator: number;

declare const kIOPCIExpressCapabilityIDReadinessTimeReporting: number;

declare const kFWAsynchRt: number;

declare const kIOPCIUncorrectableErrorBitAtomicOpEgressBlocked: number;

declare const kNMIIntLevelMask: number;

declare const gIODTPHandleKey: interop.Pointer;

declare const kIOKextSpinDump: number;

declare const kFWSelfIDBusPowered6W: number;

declare const IOUSBHostPipeMetaClass: number;

declare const kHIDDispatchOptionPhaseEnded: number;

declare const kDeviceRequestRecipientInterface: number;

declare const kIOFBNotifyDidPowerOn: number;

declare const IOUSBHostPipe_Class: OSClassLoadInformation;

declare const IFNET_LQM_THRESH_GOOD: number;

declare const kSuperSpeedPlusDeviceCapabilityMinTxLaneCountPhase: number;

declare const gIODisplayLinearBrightnessProbeKey: interop.Pointer;

declare const kATAcmdSetFeatures: number;

declare const kIOMemorySharingTypeMask: number;

declare const kATADevIntNoCmd: number;

declare const IOHIDEventDriver: number;

declare const kIOPCICommandParityError: number;

declare const kIOPCIAdapterNotPresent: number;

declare const gIODriverKitUserClientEntitlementCommunicatesWithDriversKey: interop.Pointer;

declare const DEBUG_HEADER_ENTRY_XNU: number;

declare const kIOPCIResourceTypeCount: number;

declare const kUSBHostVendorRequestNoDataTimeout: number;

declare const IOHIDKeyboard: number;

declare const gIODisplayParametersKey: interop.Pointer;

declare const kUSB20ExtensionCapabilityBESLD: number;

declare const kIOFBNotifyCaptureChange: number;

declare const kIOPreparationIDUnsupported: number;

declare const kDeviceRequestDirectionPhase: number;

declare const CS_SUPPORTSTEAMID: number;

declare const IOMbufLittleMemoryCursor: number;

declare const kIOMemoryLedgerFlagNoFootprint: number;

declare const kATASetTransferMode: number;

declare const kIODDCBlockTypeEDID: number;

declare const kIOPCIResourceTypeMemory: number;

declare const kFWSelfIDNPc: number;

declare const kATAcmdDiagnostic: number;

declare const kIOAGPDisableFeature8: number;

declare const kIOACPIDevicePowerStateD1: number;

declare const kATANoErr: number;

declare const MBUF_TYPE_DATA: number;

declare const kFWSelfIDNPb: number;

declare const kAirshipDaleBasebandControlInterfaceUserClientClose: number;

declare const kIOPCIConfigurationOffsetBaseAddress4: number;

declare const kIOMemoryLedgerTagDefault: number;

declare const IOUSBHostCICapabilitiesMessageData0ConnectionLatency: number;

declare const kIOPCIDebugPortCapability: number;

declare const RGBDirect: number;

declare const kIOServiceMatchedState: number;

declare const kIOMemoryTypeUPL: number;

declare const kPCI2PCIOffsetPrefetchUpperLimit: number;

declare const kIODDCForceRead: number;

declare const kIOPCICapabilityIDLDT: number;

declare const kSCSIPort_NotificationStatusChange: number;

declare const kIOPCIConfigurationOffsetBaseAddress5: number;

declare const kIOACPIFixedEventPowerButton: number;

declare const IOLittleMemoryCursor: number;

declare const kPCI2PCIIORange: number;

declare const SPTM_SWITCH_ASID_TLBI_FLUSH: number;

declare const bATADataCorrected: number;

declare const kDeviceRequestTypeClass: number;

declare const gIOKitDebug: number;

declare const kIOKitDebugUserOptions: number;

declare const version_revision: number;

declare const kIOMemoryPurgeableVolatileGroup0: number;

declare const kChipSetTypeCore2001: number;

declare const IFNET_FAMILY_PVC: number;

declare const gIODisplayAudioMuteAndScreenBlankKey: interop.Pointer;

declare const gIODisplayFadeTime3: number;

declare const IOUSBHostCIEndpointCreateCommandData1DescriptorPhase: number;

declare const kFWSelfID0Pwr: number;

declare const kAirshipDaleBasebandControlUserClientOpen: number;

declare const IOServiceStateNotificationEventSource: number;

declare const kIOPCICapabilityIDCPCIHotswap: number;

declare const IOHIDSystem: number;

declare const IOFixedPoint64: number;

declare const IOGraphicsDevice: number;

declare const AVCConnectionRecord: number;

declare const kIODDCTristate: number;

declare const kKeyMaskAlt: number;

declare const IOUSBHostCIPortStatusCommandData1Overcurrent: number;

declare const kIOACPIFixedEventRealTimeClock: number;

declare const gIODTAssociatedServiceKey: interop.Pointer;

declare const kIOAGPDisableFeature6: number;

declare const IOFWAsyncPHYCommand: number;

declare const gIODisplayParametersTheatreModeKey: interop.Pointer;

declare const IFNET_SCHED_MODEL_FQ_CODEL_DM: number;

declare const gIODisplayBrightnessFadeKey: interop.Pointer;

declare const IOHIDEventService_Class: OSClassLoadInformation;

declare const IFNET_NPM_THRESH_UNKNOWN: number;

declare const kIOFWSBP2DontUsePTPacketLimit: number;

declare const kIOPCIConfigBaseAddress3: number;

declare const kAirshipDaleBasebandErrorDARTFailure: number;

declare const osbuilder: interop.Pointer;

declare const kIODirectionPrepareToPhys32: number;

declare const kAirshipDaleBasebandErrorIpcSetTransportFailed: number;

declare const kIOPCISlotCapabilitiesBitAttentionButtonPresent: number;

declare const kIOPCINextCapabilityOffset: number;

declare const IOPCI2PCIBridge: number;

declare const telemetry_notification_subsystem: telemetry_notification_subsystem;

declare const kIOPCIExpressCapabilityIDDataLinkFeature: number;

declare const IOFWWriteCommand: number;

declare const task_access_subsystem: task_access_subsystem;

declare const mATACommandAborted: number;

declare const kVBLInterruptServiceType: number;

declare const IORangeAllocator: number;

declare const CSSLOT_APPLICATION: number;

declare const kFWSelfIDNN: number;

declare const mATADataCorrected: number;

declare const addressAlignmentErr: number;

declare const OSObject: number;

declare const kIOFBNotifyGroupID_ThirdParty: number;

declare const kIOPCICapabilityIDPowerManagement: number;

declare const CS_LINKAGE_APPLICATION_OOPJIT: number;

declare const kFWSelfIDNPfPhase: number;

declare const kIOPCICorrectableErrorBitReplayNumRollover: number;

declare const IOFWUserObjectExporter: number;

declare const kIOPCIStatusUDF: number;

declare const kSuperSpeedEndpointCompanionDescriptorSSPIsocCompanion: number;

declare const IOATABusCommand64: number;

declare const kIOPCIConfigurationOffsetLatencyTimer: number;

declare const bcd2bin_data: interop.Pointer;

declare const IOUSBHostPipeInterface: number;

declare const IOPCIConfigurator: number;

declare const IOUSBHostCICommandMessageData0EndpointAddress: number;

declare const mach_absolutetime_asleep: number;

declare const kIOPCIConfigBaseAddress2: number;

declare const kHIDDispatchOptionScrollMomentumContinue: number;

declare const kIOPCICorrectableErrorBitHeaderLogOverflow: number;

declare const gIOACPIDeviceStatusKey: interop.Pointer;

declare const kDeviceRequestGetState: number;

declare const IOUSBHostInterface: number;

declare const gIOHIDDeviceMetaClass: interop.Pointer;

declare const kUSB3LPMU2AcceptOnly: number;

declare const kEndpointDescriptorSynchronizationType: number;

declare const gIOMatchedNotification: interop.Pointer;

declare const kRegPropertyValueIsSavedToDisk: number;

declare const kIOPCIExpressCapabilityIDSRIOV: number;

declare const kIOPCIAERCapTLPPrefixLogDW3Offset: number;

declare const kIOPCIConfigurationOffsetStatus: number;

declare const SPTM_UNMAP_FLUSH_PENDING: number;

declare const IOFireWireAVCAsynchronousCommand: number;

declare const kIOPCISlotStatusCommandCompleted: number;

declare const MBUF_PKTHDR: number;

declare const kIOPCIExpressCapabilityIDAccessControlServices: number;

declare const gIOBSDKey: interop.Pointer;

declare const IOATAReg8: number;

declare const kIOTimerEventSourceOptionsAllowReenter: number;

declare const gIODisplayBlueGammaScaleKey: interop.Pointer;

declare const kFWSelfID0GapCntPhase: number;

declare const kEndpointStatusHalt: number;

declare const kPCIPMCD2Support: number;

declare const kSCSIPort_StatusFailure: number;

declare const kIOPCIVitalProductDataCapability: number;

declare const IOAGPDevice: number;

declare const kIOReportQuantityTime: number;

declare const kFWAsynchNew: number;

declare const kSuperSpeedPlusDeviceCapabilityMinRxLaneCountPhase: number;

declare const IFNET_LQM_THRESH_MINIMALLY_VIABLE: number;

declare const kRegIterRoot: number;

declare const THREAD_CALL_OPTIONS_ONCE: number;

declare const kPCIPMCD1Support: number;

declare const sock_evt_cantrecvmore: number;

declare const kIOPCIExpressCapabilityIDMulticast: number;

declare const kIOPCICapabilityIDPCIExpress: number;

declare const kIOPCIAERCapUncErrSeverityOffset: number;

declare const kIOBufferDescriptorMemoryFlags: number;

declare const bATAIDNotFound: number;

declare const kIOAGPFastWrite: number;

declare const kPCI2PCIBridgeControl: number;

declare const kFWTCodeWriteResponse: number;

declare const _MachineStateCount: interop.Pointer;

declare const IOFastPathHIDGyroService: number;

declare const MBUF_CSUM_REQ_IP: number;

declare const kIOPCIConfigHeaderType: number;

declare const IOHIDWorkLoop: number;

declare const kFBChangedInterruptServiceType: number;

declare const kFWAsynchDestinationOffsetHighPhase: number;

declare const kHIDDispatchOptionScrollNoAcceleration: number;

declare const IOAudioDevice: number;

declare const IOUSBHostCIEndpointSetNextTransferCommandData1AddressPhase: number;

declare const IOFWReadCommand: number;

declare const notFoundErr: number;

declare const MBUF_TYPE_IFADDR: number;

declare const kPCI2PCIOffsetIORange: number;

declare const kUSB3LPMMaxU2Timeout: number;

declare const kIOPCIConfigClassCode: number;

declare const bATASeekComplete: number;

declare const IODCLProgram: number;

declare const IOUSBHostCIIsochronousTransferData1BufferPhase: number;

declare const sock_evt_disconnected: number;

declare const IOGeneralMemoryDescriptor: number;

declare const kSuperSpeedEndpointCompanionDescriptorIsocMultPhase: number;

declare const gIODisplayFadeTime1Key: interop.Pointer;

declare const kIOAGP4GbAddressing: number;

declare const IFNET_SCHED_MODEL_DRIVER_MANAGED: number;

declare const IOUSBHostDeviceMetaClass: number;

declare const IOPacketQueue: number;

declare const kFWSelfID0GapCnt: number;

declare const kUSBHostDefaultControlCompletionTimeoutMS: number;

declare const kDTMaxEntryNameLength: number;

declare const MBUF_MCAST: number;

declare const gIODriverKitUserClientEntitlementAllowAnyKey: interop.Pointer;

declare const kDeviceRequestTypeStandard: number;

declare const kATAcmdWriteBuffer: number;

declare const IODCLTranslator: number;

declare const kPEPanicRestartCPU: number;

declare const kThirdOrderRanking: number;

declare const IOUSBHostCICapabilitiesMessageControlPortCount: number;

declare const kIOPCISlotStatusPowerFaultDetected: number;

declare const IOPlatformIO: number;

declare const kIOMemoryPurgeableVolatileBehaviorFifo: number;

declare const kSuperSpeedHubCharacteristicsPowerSwitchingIndividual: number;

declare const IOATAReg16: number;

declare const kIOUCForegroundOnly: number;

declare const kFWSBP2ConstraintForceDoubleBuffer: number;

declare const kIOmemoryLedgerTagNetwork: number;

declare const gOSAction_IOHIDEventService__SetUserPropertiesMetaClass: interop.Pointer;

declare const kFWIsochChannelUnknownCondition: number;

declare const CS_LINKAGE_APPLICATION_XOJIT_PREVIEWS: number;

declare const kHubDelayNs: number;

declare const IOFireWireUserClient: number;

declare const IOSCSIParallelInterfaceDevice: number;

declare const kIOACPIAddressSpaceOpWrite: number;

declare const debug_iomalloc_size: number;

declare const kIOFBNotifyGroupID_AppleMCCSControl: number;

declare const IOFWSendDCL: number;

declare const IOAudioEngine: number;

declare const IOFireWireLocalNode: number;

declare const kIOTrackingLeakScanStart: number;

declare const kFWSelfIDNPaPhase: number;

declare const kUSB3LPMMaxU1PEL: number;

declare const kSuperSpeedPlusDeviceCapabilitySublinkLSEMbits: number;

declare const OSAction_IOHIDEventService__CopyEvent: number;

declare const IODisplayWrangler: number;

declare const IOHIDPowerSource: number;

declare const OSSerializer: number;

declare const kVCLightBackground: number;

declare const kDefaultProbeRanking: number;

declare const kBootROMTypeOldWorld: number;

declare const dad_enhanced: number;

declare const IOHIDEvent: number;

declare const IOPCIATA: number;

declare const kIOPCIAERCapHdrLogDW1Offset: number;

declare const kATAcmdFormatTrack: number;

declare const kIOTimerEventSourceOptionsPriorityKernel: number;

declare const MBUF_HASFCS: number;

declare const kATAcmdReadDMAExtended: number;

declare const kIODMAMapWriteAccess: number;

declare const kEfiBootServicesCode: number;

declare const IOAudioLevelControl: number;

declare const kIOMemoryPurgeableVolatileGroup3: number;

declare const IOSCSIParallelInterfaceController: number;

declare const kRegIterDescendants: number;

declare const IOUSBHostCICommandMessageData0StreamID: number;

declare const invalidIsochPortIDErr: number;

declare const gIOUserClassKey: interop.Pointer;

declare const MBUF_WAITOK: number;

declare const kIOPCICapabilityIDCPCIResourceControl: number;

declare const bATACommandAborted: number;

declare const kEndpointDescriptorTransferTypeBulk: number;

declare const kFWAsynchPriorityPhase: number;

declare const kIOPCIConfigMinimumGrant: number;

declare const kHIDDispatchOptionPhaseCanceled: number;

declare const hv_callbacks: hv_callbacks_t;

declare const kSMEVectorCount: number;

declare const kIOPreparationIDAlwaysPrepared: number;

declare const kIOMemoryTypePhysical: number;

declare const kATAQueueEmpty: number;

declare const gIOPathKey: interop.Pointer;

declare const kUSBHostOpenOptionSelectAlternateSetting: number;

declare const kIOAGPRequestQueueMask: number;

declare const IOConfigDirectory: number;

declare const IOUSBHostDevice: number;

declare const kIOWaitQuietPanics: number;

declare const IOFireWireUnitAux: number;

declare const kFWTCodeReadBlockResponse: number;

declare const OSAction_IOHIDEventService__SetUserProperties_Class: OSClassLoadInformation;

declare const VIOLATION_INVALID_IO_PADDR: number;

declare const kIOFBNotifyGroupID_AppleHDAController: number;

declare const kernel_task: number;

declare const IOHIDEventServiceMetaClass: number;

declare const IOUSBHostCIPortStatusCommandData1LinkState: number;

declare const IOPCIDevice: number;

declare const kAirshipDaleBasebandErrorIpcErrorOccurred: number;

declare const kIOPCISlotCapabilitiesBitMRLSensorPresent: number;

declare const IFNET_LQM_THRESH_OFF: number;

declare const kBootDriverTypeMKEXT: number;

declare const kIOPMRunModeFullWake: number;

declare const bATATrack0NotFound: number;

declare const IOUSBHostCICommandMessageControlStatusPhase: number;

declare const CS_SIGNER_TYPE_MAC_APP_STORE: number;

declare const kIOReportQuantityTemperature: number;

declare const MBUF_PROMISC: number;

declare const kIOReportQuantityCPUInstrs: number;

declare const gIOHIDEventServiceMetaClass: interop.Pointer;

declare const kIOPCIExpressCapabilityIDFRSQueueing: number;

declare const kIOMemoryPurgeableVolatileOrderingObsolete: number;

declare const IOAudioStream: number;

declare const kIOPCIExpressCapabilityIDRCLinkDeclaration: number;

declare const IOWorkLoop: number;

declare const kATAcmdSleep: number;

declare const IOFireWireBus: number;

declare const IOUSBHostCIPortStatusLinkStatePhase: number;

declare const noChannelsAvailableErr: number;

declare const IOFireWireController: number;

declare const kIOFBNotifyEvent_Notify: number;

declare const IOUSBHostCIDeviceCreateCommandData1DeviceAddress: number;

declare const CS_HASHTYPE_SHA1: number;

declare const IOFastPathUserClient: number;

declare const kHIDDispatchOptionPhaseChanged: number;

declare const IOPCIBridge: number;

declare const kFWExtendedTCodeVendorDependent: number;

declare const kIODKDisableIOPMSystemOffPhase2Allow: number;

declare const kSuperSpeedDeviceCapabilitySupport5Gb: number;

declare const SPTM_UPDATE_DELAYED_TLBI: number;

declare const kFWPhyPacketPhyID: number;

declare const kFWSelfIDNPf: number;

declare const kIOPCIDeviceOffState: number;

declare const disconnectedErr: number;

declare const kIOPCIUncorrectableErrorBitReceiverOverflow: number;

declare const gIOResourceIOKitKey: interop.Pointer;

declare const kIOPCISlotStatusElectromechanicalInterlockState: number;

declare const IFNET_FAMILY_STF: number;

declare const IOUSBHostCIDoorbellDeviceAddress: number;

declare const kATADeviceError: number;

declare const kSuperSpeedPlusDeviceCapabilitySublinkLSEGbits: number;

declare const CSSLOT_LAUNCH_CONSTRAINT_PARENT: number;

declare const kIOReportDisable: number;

declare const kIOFBNotifyHDACodecDidPowerOff: number;

declare const IOUSBHostCIDeviceCreateCommandData0RootPort: number;

declare const kATAcmdRead: number;

declare const kATAcmdIdleImmed: number;

declare const kATAInvalidDevID: number;

declare const kIOReportQuantityFrequency: number;

declare const kIOMemoryAsReference: number;

declare const IOUSBHostCICommandMessageData0StreamIDPhase: number;

declare const IOFWAsyncStreamReceiver: number;

declare const kIOPCIConfigurationOffsetSubSystemID: number;

declare const kIOFBNotifyWSAADidEnterDefer: number;

declare const kIOMemoryPurgeableFaultOnAccess: number;

declare const CS_SHA1_LEN: number;

declare const AppleUSBHostResources: number;

declare const kRegPathNameTerminator: number;

declare const kIOExternalMethodScalarInputCountMax: number;

declare const kSuperSpeedPlusDeviceCapabilitySublinkReserved: number;

declare const bATAWriteFault: number;

declare const kExtInt9_NMIIntSource: number;

declare const gFireWireSelfIDs: interop.Pointer;

declare const kIOFBNotifyWSAAWillEnterDefer: number;

declare const kSuperSpeedPlusDeviceCapabilitySublinkSpeedIdPhase: number;

declare const IOPCIDeviceMetaClass: number;

declare const AVCSubunitInfo: number;

declare const OSAction_IOHIDEventService__CopyEventInterface: number;

declare const kSOFTRESET: number;

declare const kRegMaximumPropertyNameLength: number;

declare const kIOPCISlotCapabilitiesBitNoCommandCompletedSupport: number;

declare const IOFWLocalIsochPort: number;

declare const kFWSelfID0PwrPhase: number;

declare const kIODKEnable: number;

declare const gIORegistryEntryPropertyKeysKey: interop.Pointer;

declare const kDeviceRequestSetIsochronousDelay: number;

declare const gIODisplayVerticalPositionKey: interop.Pointer;

declare const CS_VALIDATION_CATEGORY_APP_STORE: number;

declare const IOAudioTimeIntervalFilterIIR: number;

declare const MBUF_TYPE_HEADER: number;

declare const IOUSBHostCICommandMessageData0RootPortPhase: number;

declare const gIOResourcesKey: interop.Pointer;

declare const kPCI2PCISecondaryBus: number;

declare const kSuperSpeedPlusDeviceCapabilitySublinkSpeedIdCountPhase: number;

declare const IOFilterInterruptEventSource: number;

declare const gIOConsoleSecurityInterest: interop.Pointer;

declare const IOPwrController: number;

declare const kFWPhyConfigurationR: number;

declare const gIODisplayHorizontalPositionKey: interop.Pointer;

declare const IOFireWireControllerAux: number;

declare const CS_SHA256_LEN: number;

declare const kIOPCI32BitMemorySpace: number;

declare const IOFireWireNubAux: number;

declare const kIOPCIAdapterHotRemovePending: number;

declare const IOFWAsyncStreamCommand: number;

declare const kIOUCVariableStructureSize: number;

declare const gFireWireUnit_SW_Version: interop.Pointer;

declare const kEndpointDescriptorDirection: number;

declare const CSSLOT_LAUNCH_CONSTRAINT_SELF: number;

declare const kPCIPMCSPowerStateD2: number;

declare const kSuperSpeedDeviceCapabilityU2DevExitLatMax: number;

declare const kIOPCIConfigDeviceID: number;

declare const kUSBHostMaxDevices: number;

declare const kIOTrackingLeaks: number;

declare const kIOLogMatch: number;

declare const CS_VALIDATION_CATEGORY_DEVELOPMENT: number;

declare const kIOPCICapabilityIDVitalProductData: number;

declare const kHIDFlag_StrictErrorChecking: number;

declare const IFNET_MULTIPAGES: number;

declare const CONSISTENT_DEBUG_PANIC_SOURCE_TXM: number;

declare const kIOPCIAdapterHotAddPending: number;

declare const kIOPCIUncorrectableErrorBitTLPPrefixBlocked: number;

declare const MBUF_CSUM_IP_GOOD: number;

declare const kIOPCICommandMemorySpace: number;

declare const kIOMemoryPhysicallyContiguous: number;

declare const kPCIPMCSPowerStateMask: number;

declare const kFWExtendedTCodeMaskSwap: number;

declare const gIODisplayGammaScaleKey: interop.Pointer;

declare const kIOLogPower: number;

declare const kIOMemoryPurgeableVolatileBehaviorLifo: number;

declare const kAirshipDaleBasebandTraceUserClientFlushTraceBuffers: number;

declare const kIOPCILatencyUnsnooped: number;

declare const kHV_ION_ANY_VALUE: number;

declare const gIOUserServerTagKey: interop.Pointer;

declare const sockopt_get: number;

declare const mATAAddressNotFound: number;

declare const kFWAsynchTLabelPhase: number;

declare const kSuperSpeedPlusDeviceCapabilitySublinkMinSpeedIdPhase: number;

declare const kIOPCIExpressCapabilityIDPASID: number;

declare const kIOExternalMethodScalarOutputCountMax: number;

declare const CS_VALIDATION_CATEGORY_TESTFLIGHT: number;

declare const bATADriveReady: number;

declare const IOUSBHostCIPortStatusCommandData1ConnectChange: number;

declare const kSuperSpeedHubCharacteristicsOverCurrentGlobal: number;

declare const kAirshipDaleBasebandTraceUserClientRegisterTraceBuffer: number;

declare const IOUSBHostCIPortStatusPowered: number;

declare const kEfiRuntimeServicesCode: number;

declare const kDeviceRequestSetFeature: number;

declare const kIOPMPowerStateVersion1: number;

declare const DEBUG_HEADER_CURRENT_VERSION: number;

declare const gIODisplayLinearBrightnessKey: interop.Pointer;

declare const IOATAController: number;

declare const kKeyMaskPower: number;

declare const kFWSelfID0C: number;

declare const kIOTraceIOService: number;

declare const kSuperSpeedEndpointCompanionDescriptorMaxBurstPhase: number;

declare const kIOLogDebugPower: number;

declare const kEfiMaxMemoryType: number;

declare const kDataRotate0: number;

declare const IOUSBHostCIDeviceUpdateCommandData1DescriptorAddressPhase: number;

declare const kIOMemoryLedgerTagGraphics: number;

declare const kIOPCISlotCapabilitiesBitHotPlugSurprise: number;

declare const IOFireWireDuplicateGUIDList: number;

declare const kSuperSpeedPlusDeviceCapabilitySublinkSpeedIdCount: number;

declare const IOPowerConnection: number;

declare const kAirshipDaleBasebandControlInterfaceUserClientReadAsync: number;

declare const IOUSBHostCIEndpointResetCommandData1ClearState: number;

declare const kAirshipDaleBasebandErrorIpcPowerOffTimedOut: number;

declare const kIOPCIConfigInterruptLine: number;

declare const kIOReportQuantityEventCount: number;

declare const kDeviceRequestSetInterface: number;

declare const gIODisplaySpeakerSelectKey: interop.Pointer;

declare const kSuperSpeedPlusDeviceCapabilitySublinkSpeedAttrCount: number;

declare const kHIDDispatchOptionPointerNoAcceleration: number;

declare const gIOBSDMinorKey: interop.Pointer;

declare const gIOPropertyExistsMatchKey: interop.Pointer;

declare const vDSP_IIRMonoLeft: number;

declare const kSCSIPort_StatusOnline: number;

declare const kSuperSpeedPlusDeviceCapabilityReservedPhase: number;

declare const kIOFBNotifyClamshellChange: number;

declare const kIOServiceRequired: number;

declare const kIOMemorySetEncrypted: number;

declare const kNVRAMProperty: number;

declare const kIOFBNotifyEvent_WSAADefer: number;

declare const IOUSBHostCISetupTransferData1wValue: number;

declare const kPCI2PCIPrefetchMemoryRange: number;

declare const kpc_supported: boolean;

declare const IODCLTranslateListen: number;

declare const kDeviceRequestRecipientEndpoint: number;

declare const kRegUniversalModifierMask: number;

declare const gIOLocationMatchKey: interop.Pointer;

declare const gIOParentMatchKey: interop.Pointer;

declare const retryExceededErr: number;

declare const IFNET_FAMILY_FIREWIRE: number;

declare const kIOTimerEventSourceOptionsPriorityKernelHigh: number;

declare const kIOAGPInvalidGARTEntry: number;

declare const kFWSelfIDNPe: number;

declare const CS_LINKAGE_APPLICATION_OOPJIT_MLCOMPILER: number;

declare const MBUF_EXT: number;

declare const kIOPCIExpressCapabilityIDSFI: number;

declare const kIOMemoryPurgeableVolatileOrderingNormal: number;

declare const kFWSelfIDNPdPhase: number;

declare const IOPlatformExpert: number;

declare const kIOTrackingCallSiteBTs: number;

declare const kIOPCIExpressCapabilityIDLaneMarginingRx: number;

declare const kIOPCIExpressCapabilityIDRCInternalLinkCtrl: number;

declare const kIOTrackingLeakScanEnd: number;

declare const CSSLOT_TICKETSLOT: number;

declare const kIOServiceInactiveState: number;

declare const kIOACPIMemoryRange: number;

declare const kNMIIntMask: number;

declare const kHIDDispatchOptionScrollMomentumStart: number;

declare const kHIDDispatchOptionPhaseBegan: number;

declare const kIOPCIConfigBaseAddress1: number;

declare const IOFastPathDescriptor: number;

declare const IOUSBHostCIMessageControlValid: number;

declare const kVSLClamshellStateGestaltType: number;

declare const SPTM_N_TRACES: number;

declare const lz4_decode_scratch_size: number;

declare const kDeviceRequestSetDescriptor: number;

declare const kSuperSpeedHubDecodeLatencyMax: number;

declare const gIODisplayPowerModeKey: interop.Pointer;

declare const kIOPCIExpressLatencyTolerenceReportingCapability: number;

declare const kIOFBNotifyEvent_DisplayDimsChange: number;

declare const gIODisplayBrightnessProbeKey: interop.Pointer;

declare const kIOTraceInterrupts: number;

declare const kKeyMaskDelete: number;

declare const bATADCRReset: number;

declare const kIOPCIConfigurationOffsetInterruptPin: number;

declare const kRegIterSibling: number;

declare const kEfiLoaderCode: number;

declare const kEndpointDescriptorTransferTypeControl: number;

declare const kIOFBNotifyGroupID_VendorNVIDIA: number;

declare const kIOServiceRegisteredState: number;

declare const kIOPCIProbeOptionEject: number;

declare const kIOPCIExpressVirtualChannelCapability: number;

declare const kFWSelfIDNPa: number;

declare const OSMetaClassBase: number;

declare const IOAudioControlUserClient: number;

declare const kIOUCScalarIStructI: number;

declare const IOUSBHostCIPortStatusChangeMask: number;

declare const gIORegistryEntryDefaultLockingSetPropertiesKey: interop.Pointer;

declare const OSAction_IOHIDEventService__SetLED: number;

declare const kIOUCTypeMask: number;

declare const kIOPCIExpressCapabilityIDPowerBudget: number;

declare const kDeviceFeatureSelectorU1Enable: number;

declare const gIODisplaySpeakerVolumeKey: interop.Pointer;

declare const mATADriveReady: number;

declare const IOHIDEventServiceInterface: number;

declare const VIOLATION_INVALID_RESTRICTED_IO_PADDR: number;

declare const kPCI2PCISecondaryLT: number;

declare const gFireWireNodeID: interop.Pointer;

declare const IFNET_RSSI_UNKNOWN: number;

declare const kPEHaltCPU: number;

declare const kIOPCIAERCapRootErrCmdOffset: number;

declare const kDTMaxPropertyNameLength: number;

declare const gIOMatchedServiceCountKey: interop.Pointer;

declare const MBUF_FIRSTFRAG: number;

declare const kIOMemoryPurgeableKeepCurrent: number;

declare const kIOPCIUncorrectableErrorBitFlowControlProtocol: number;

declare const kIOTimerEventSourceOptionsPriorityLow: number;

declare const kRootDomainSleepSupported: number;

declare const kIOPCIConfigurationOffsetBaseAddress3: number;

declare const kIODMAMapPageListFullyOccupied: number;

declare const OSAction_IOHIDEventService__SetUserPropertiesMetaClass: number;

declare const kIODMAMapFixedAddress: number;

declare const kIOPCIConfigurationOffsetVendorID: number;

declare const IOFireWireROMCache: number;

declare const kPCI2PCIOffsetSecondaryLT: number;

declare const IOPCIHostBridgeData: number;

declare const kIOACPIAddressSpaceIDSystemIO: number;

declare const kIOMemoryUseReserve: number;

declare const kIOFBNotifyWSAADidExitDefer: number;

declare const kUSBHostStandardRequestNoDataTimeout: number;

declare const IOFWCommand: number;

declare const gIODisplayParametersDefaultKey: interop.Pointer;

declare const OSAction_IOHIDEventService__SetLEDInterface: number;

declare const gIODisplayUsageTimeKey: interop.Pointer;

declare const ostype: interop.Pointer;

declare const VIOLATION_INVALID_DT_RANGE: number;

declare const IOHIDDevice: number;

declare const kIOPCICapabilityIDMSI: number;

declare const kHIDUnknownReport: number;

declare const kSuperSpeedPlusDeviceCapabilitySublinkSpeedMantissa: number;

declare const kIOLogHibernate: number;

declare const kIOFWSBP2FailsOnBusResetsDuringIO: number;

declare const kFWSelfID0P0Phase: number;

declare const kDeviceRequestSize: number;

declare const kIOAGPIdle: number;

declare const kIOServiceDextRequirePowerForMatching: number;

declare const OSAction_IOHIDEventService__SetLEDMetaClass: number;

declare const kChipSetTypeCore99: number;

declare const kIOPCIAERCapHdrLogDW0Offset: number;

declare const kIOServiceTerminateWithRematchCurrentDext: number;

declare const SFLT_EXTENDED_REGISTRY: number;

declare const kIOFBNotifyDidPowerOff: number;

declare const IOFastPathService: number;

declare const kSuperSpeedPlusDeviceCapabilitySublinkSpeedMantissaPhase: number;

declare const OSCollection: number;

declare const IOATAIOReg16: number;

declare const kEndpointDescriptorTransferTypeIsochronous: number;

declare const kIOFBNotifyGroupID_Legacy: number;

declare const OSAction_IOHIDEventService__SetUserPropertiesInterface: number;

declare const IOFWBusCommand: number;

declare const IODCLTranslateTalk: number;

declare const kPCI2PCIOffsetSubordinateBus: number;

declare const IOUSBHostCIEndpointUpdateCommandData1Descriptor: number;

declare const IFNET_FAMILY_BOND: number;

declare const kDeviceRequestRecipientOther: number;

declare const mATAUncorrectable: number;

declare const directType: number;

declare const current_task: number;

declare const kHIDDispatchOptionDeliveryNotificationSuppress: number;

declare const IOHIDDeviceElementContainer: number;

declare const kIOPCIConfigurationOffsetCapabilitiesPtr: number;

declare const kIOFBNotifyEvent_OnlineChange: number;

declare const IOHIDEventQueue: number;

declare const kIOACPIDevicePowerStateD0: number;

declare const kSuperSpeedPlusDeviceCapabilitySublinkDirectionRx: number;

declare const kATAcmdReadExtended: number;

declare const kATAcmdReadVerify: number;

declare const kIODKDisablePM: number;

declare const kSuperSpeedPlusDeviceCapabilitySublinkDirectionPhase: number;

declare const CSSLOT_IDENTIFICATIONSLOT: number;

declare const kIOACPIFixedEventPMTimer: number;

declare const kIOPCIUncorrectableErrorBitACSViolation: number;

declare const gIOKitTrace: number;

declare const kFWAsynchRtPhase: number;

declare const kSuperSpeedPlusDeviceCapabilitySublinkSymmetry: number;

declare const bATADCRnIntEnable: number;

declare const kIOPCIUncorrectableErrorBitECRC: number;

declare const kIOReportFormatHistogram: number;

declare const kDataRotate90: number;

declare const kIOPCIAERCapTLPPrefixLogDW1Offset: number;

declare const kIOReportQuantityData: number;

declare const kIOPCICapabilityIDHotplug: number;

declare const IOFWPhysicalAddressSpaceAux: number;

declare const bATABusy: number;

declare const kFWSelfIDSelfPowered30W: number;

declare const kEfiLoaderData: number;

declare const IOHIDEventService: number;

declare const IOWatchDogTimer: number;

declare const kSuperSpeedPlusDeviceCapabilitySublinkReservedPhase: number;

declare const kEfiPalCode: number;

declare const kOFVariablePermUserRead: number;

declare const kUSB3LPMMaxU2PEL: number;

declare const kEndpointDescriptorPacketSizeMultPhase: number;

declare const gIOUserClientClassKey: interop.Pointer;

declare const kATAEnableReadAhead: number;

declare const IOFWPhysicalAddressSpace: number;

declare const kIOMemoryIncoherentIOFlush: number;

declare const receive_sysdiagnose_notification_subsystem: receive_sysdiagnose_notification_subsystem;

declare const kIOReportNotifyHubOnChange: number;

declare const kRegCStrMaxEntryNameLength: number;

declare const kVCDarkBackground: number;

declare const kFWAsynchRCodePhase: number;

declare const kPEPanicSync: number;

declare const kIOMemoryPurgeableVolatileGroup2: number;

declare const addressRangeErr: number;

declare const kRegIterContinue: number;

declare const gFireWireUnit_Spec_ID: interop.Pointer;

declare const kIOMapperUncached: number;

declare const kInterfaceStatusRemoteWakeEnable: number;

declare const kIOPCIConfigLatencyTimer: number;

declare const inUseErr: number;

declare const osrelease: interop.Pointer;

declare const kIOReturnOutputSuccess: number;

declare const kIODDCLow: number;

declare const kIOPCIAdapterPresent: number;

declare const IODMAEventSource: number;

declare const kVCDarkReboot: number;

declare const kInterfaceStatusRemoteWakeCapable: number;

declare const kIOFBNotifyEvent_ClamshellChange: number;

declare const kIOPCICommandIOSpace: number;

declare const bATAIndex: number;

declare const kIOPCIExpressCapabilityIDDPA: number;

declare const CSMAGIC_EMBEDDED_DER_ENTITLEMENTS: number;

declare const kUSBHostMaxPipes: number;

declare const kSuperSpeedPlusDeviceCapabilitySublinkAsymmetric: number;

declare const IOUSBHostCITransferCompletionMessageControlDeviceAddress: number;

declare const IOFWAsyncStreamListener: number;

declare const kIOPCIStatusPCI66: number;

declare const gIODisplayOverscanKey: interop.Pointer;

declare const IOUSBHostCITransferCompletionMessageData0TransferLength: number;

declare const OSAction_IOHIDEventService__CopyEventMetaClass: number;

declare const kEndpointDescriptorSynchronizationTypePhase: number;

declare const kIOPCISlotStatusMRLSensorState: number;

declare const kUSB3LPMU2Disabled: number;

declare const kIOACPIAddressSpaceIDEmbeddedController: number;

declare const kDeviceRequestTypePhase: number;

declare const kIOSleepWakeWdogOff: number;

declare const kPEPanicDiagnosticsDone: number;

declare const CS_SUPPORTSCODELIMIT64: number;

declare const kKeyMaskUnknown: number;

declare const kIOPCIExpressCapabilityIDPL16GTs: number;

declare const OSInterface: number;

declare const kIOTraceCompatBootArgs: number;

declare const gIOUserServerClassKey: interop.Pointer;

declare const IOUSBHostCIDeviceCreateCommandData0RoutePhase: number;

declare const kRegNoModifiers: number;

declare const IOUSBHostCIPortStatusOvercurrentChange: number;

declare const kIOAGP2xDataRate: number;

declare const CS_VALIDATION_CATEGORY_INVALID: number;

declare const kIOLogExclaves: number;

declare const IOUSBHostCITransferCompletionMessageControlStatusPhase: number;

declare const kIOPCIUncorrectableErrorBitMalformedTLP: number;

declare const version_stage: number;

declare const IOFWIsochChannel: number;

declare const IOFWWriteQuadCommand: number;

declare const IOHIDPointing: number;

declare const audit_triggers_subsystem: audit_triggers_subsystem;

declare const kIOAGPDisableAGPWrites: number;

declare const kIOFBNotifyDidNotify: number;

declare const kIOServiceSeize: number;

declare const IFNET_FAMILY_DISC: number;

declare const CSMAGIC_EMBEDDED_ENTITLEMENTS: number;

declare const kIODKDisableEntitlementChecking: number;

declare const kIOFBNotifyWSAAWillExitDefer: number;

declare const kIOPCIExpressCapabilityIDVC_MFVCPresent: number;

declare const hex2ascii_data: interop.Pointer;

declare const kIOInterruptTypePCIMessagedX: number;

declare const kIODirectionPrepareNonCoherent: number;

declare const IFNET_FAMILY_SLIP: number;

declare const kATAcmdMCAcknowledge: number;

declare const kIOReportQuantityCurrent: number;

declare const kEfiBootServicesData: number;

declare const CS_VALIDATION_CATEGORY_ROSETTA: number;

declare const kIOPCIConfigurationOffsetCommand: number;

declare const OSSerialize: number;

declare const IOPCIMessagedInterruptController: number;

declare const kFWSelfID0I: number;

declare const gIODriverKitRequiredEntitlementsKey: interop.Pointer;

declare const kFWTCodeLockResponse: number;

declare const cons_ops_index: number;

declare const kFWPhyPacketID: number;

declare const IOFireWireMultiIsochReceivePacket: number;

declare const IOFireWireAVCTargetSpace: number;

declare const channelNotAvailableErr: number;

declare const kSuperSpeedDeviceCapabilityU1DevExitLatMax: number;

declare const kIOMemoryLedgerTagNeural: number;

declare const kRegEntryNameTerminator: number;

declare const kATAcmdReadMultiple: number;

declare const kEndpointDescriptorPacketSizePhase: number;

declare const kIOTimerEventSourceOptionsPriorityWorkLoop: number;

declare const kIODMAMapOptionUnmapped: number;

declare const IOFireWireSBP2LUN: number;

declare const gIOPathMatchKey: interop.Pointer;

declare const kIOFBNotifyDidChangeSpeed: number;

declare const IFNET_VLAN_MTU: number;

declare const kIOReportQuantityInductance: number;

declare const BPF_MODE_INPUT_OUTPUT: number;

declare const IOAudioEngineUserClient: number;

declare const kIOPCIExpressCapabilityIDNPEM: number;

declare const IOFWUserVectorCommand: number;

declare const IOUSBHostCIDoorbellStreamIDPhase: number;

declare const kEndpointDescriptorUsageTypeIsocFeedback: number;

declare const kIOPCIAERCapCorErrStatusOffset: number;

declare const CS_LINKAGE_APPLICATION_OOPJIT_PREVIEWS: number;

declare const version_minor: number;

declare const kChipSetTypePowerStar: number;

declare const mATABusy: number;

declare const kIOPCIUncorrectableErrorBitUnsupportedRequest: number;

declare const kIODMAMapPagingPath: number;

declare const IOUSBHostCICommandMessageData0DeviceAddressPhase: number;

declare const IOUSBHostCIPortEventMessageData0PortNumber: number;

declare const kIODKDisableCDHashChecking: number;

declare const kFWSelfID0DelPhase: number;

declare const kAirshipDaleBasebandErrorCCCIHandshakeError: number;

declare const kIOFBNotifyEvent_Terminated: number;

declare const kSuperSpeedPlusDeviceCapabilitySublinkLSEPhase: number;

declare const kEndpointDescriptorUsageTypeInterruptReserved1: number;

declare const kDisabledInterruptState: number;

declare const IOATABusInfo: number;

declare const kIOFBNotifyGroupID_AppleIOAccelDisplayPipe: number;

declare const kIOOutputCommandMask: number;

declare const IOUSBHostCISetupTransferData1wIndexPhase: number;

declare const kIOPCIAGPCapability: number;

declare const kFWTCodeReadQuadletResponse: number;

declare const kIODKLogIPC: number;

declare const kIOMemoryTypeVirtual64: number;

declare const kATAcmdReadLong: number;

declare const kHIDDispatchOptionScrollMomentumAny: number;

declare const separateBusErr: number;

declare const kPCI2PCIOffsetPrefetchUpperBase: number;

declare const kIOPCIExpressCapabilityIDPL32GTs: number;

declare const IOHIDDeviceShim: number;

declare const kIOPCICommandInterruptDisable: number;

declare const kIOUserNotifyMaxMessageSize: number;

declare const gIOPriorityPowerStateInterest: interop.Pointer;

declare const kIOAGPGartInvalidate: number;

declare const kIOPCIConfigurationOffsetMinimumGrant: number;

declare const IOFWIsochPort: number;

declare const kPCIPMCPMESupportFromD3Hot: number;

declare const IOStreamBuffer: number;

declare const kAirshipDaleBasebandControlErrorMsg: number;

declare const gIODTTypeKey: interop.Pointer;

declare const kSuperSpeedPlusDeviceCapabilitySublinkSpeedId: number;

declare const IORTCController: number;

declare const IOUSBHostCIPortStatusCommandData1Speed: number;

declare const AppleMacIO: number;

declare const kIODMAMapOptionDextOwner: number;

declare const sock_evt_disconnecting: number;

declare const kATATimeoutErr: number;

declare const kIOPCIPCIXCapability: number;

declare const kIOPCIStatusMasterAbortActive: number;

declare const kIOFBNotifyWillPowerOn: number;

declare const kKeyMaskComma: number;

declare const kFWAsynchTLabel: number;

declare const CSSLOT_ALTERNATE_CODEDIRECTORY_LIMIT: number;

declare const IFNET_LRO_NUM_SEG: number;

declare const kPCIPMCD3Support: number;

declare const kFWSelfIDNPcPhase: number;

declare const gIOTerminatedNotification: interop.Pointer;

declare const kIOFBNotifyTerminated: number;

declare const kFWSelfID0P2: number;

declare const MBUF_TSO_IPV6: number;

declare const osbuild_config: interop.Pointer;

declare const MBUF_DONTWAIT: number;

declare const IOMbufBigMemoryCursor: number;

declare const kIOPCIConfigurationOffsetBaseAddress2: number;

declare const kIOPCIAERCapUncErrMaskOffset: number;

declare const kIOMemoryTypePhysical64: number;

declare const kFWDebugIgnoreNodeNone: number;

declare const IOUSBHostCIMessageControlTypePhase: number;

declare const gIODisplayAmbientLightSensorKey: interop.Pointer;

declare const gIOUserUserClientKey: interop.Pointer;

declare const kIOLogServiceTree: number;

declare const gIOServiceKey: interop.Pointer;

declare const bATADataRequest: number;

declare const IODMACommand: number;

declare const kUSBHostVendorRequestCompletionTimeout: number;

declare const CS_SUPPORTSEXECSEG: number;

declare const kIOPCIProbeOptionDone: number;

declare const kFWSelfID0P1: number;

declare const IOUSBHostCIMessageControlStatus: number;

declare const kUSB3LPMMaxHostSchDelay: number;

declare const gIODisplayUsableLinearBrightnessKey: interop.Pointer;

declare const IOUSBHostCIPortCapabilitiesMessageData0MaxPowerPhase: number;

declare const kIODirectionCompleteWithDataValid: number;

declare const kIOPCIStatusSERRActive: number;

declare const kEndpointDescriptorUsageTypeInterruptNotification: number;

declare const kIOPCIConfigCapabilitiesPtr: number;

declare const IORemoteConfigDirectory: number;

declare const fixedType: number;

declare const kIOOutputStatusMask: number;

declare const mATADCRnIntEnable: number;

declare const kUSB3LPMMaxU1SEL: number;

declare const gIOCommandPoolSizeKey: interop.Pointer;

declare const IOUSBHostCIDoorbellDeviceAddressPhase: number;

declare const osversion: interop.Pointer;

declare const mt_core_supported: boolean;

declare const ATATimerEventSource: number;

declare const kATAcmdDoorUnlock: number;

declare const kPCI2PCIOffsetPrefetchMemoryRange: number;

declare const kAirshipDaleBasebandErrorIpcPowerOnTimedOut: number;

declare const kIOACPIBusNumberRange: number;

declare const kHIDInputReport: number;

declare const kFWAsynchExtendedTCodePhase: number;

declare const kSuperSpeedPlusDeviceCapabilitySublinkType: number;

declare const AppleNMI: number;

declare const IOUSBHostCIPortStatusSpeed: number;

declare const IFNET_HW_TIMESTAMP: number;

declare const IORegistryEntry: number;

declare const gIODisplayHorizontalSizeKey: interop.Pointer;

declare const IOUSBHostCIPortStatusConnectChange: number;

declare const kIOPCIConfigurationOffsetSubSystemVendorID: number;

declare const kIterationDone: number;

declare const kIOPCIConfigSubSystemVendorID: number;

declare const kFWSelfIDNPePhase: number;

declare const kSuperSpeedEndpointCompanionDescriptorMaxBurst: number;

declare const kIOPCIAERCapUncErrStatusOffset: number;

declare const MBUF_TYPE_OOBDATA: number;

declare const kIOReportGetDimensions: number;

declare const kIOPCIUncorrectableErrorBitDataLinkProtocol: number;

declare const kIODefaultProbeScore: number;

declare const gIODisplayRotationKey: interop.Pointer;

declare const kFWPacketTCode: number;

declare const CSMAGIC_REQUIREMENTS: number;

declare const gFireWireProduct_Name: interop.Pointer;

declare const SPTM_SWITCH_RCTX_FLUSH: number;

declare const kRegNameSpaceModifierMask: number;

declare const CS_LINKAGE_APPLICATION_ROSETTA_AOT: number;

declare const gIOUSBHostInterfaceMetaClass: interop.Pointer;

declare const IOFWCompareAndSwapCommand: number;

declare const kSuperSpeedDeviceCapabilityFullSpeed: number;

declare const kEndpointDescriptorUsageTypePhase: number;

declare const IOUSBHostCICapabilitiesMessageData0CommandTimeoutThreshold: number;

declare const kKUNCDefaultResponse: number;

declare const kRegIterParents: number;

declare const kPCI2PCIMemoryRange: number;

declare const kIOLogKextMemory: number;

declare const kIODirectionPrepareReserved1: number;

declare const IOUSBHostCIIsochronousTransferControlASAP: number;

declare const mATATrack0NotFound: number;

declare const kIODisplayMaxPowerState: number;

declare const kIODMAMapOptionNonCoherent: number;

declare const kKUNCCancelResponse: number;

declare const CS_HASHTYPE_SHA384: number;

declare const kIOReportTraceOnChange: number;

declare const kAirshipDaleBasebandErrorCreateInterfaceFailure: number;

declare const kIOFBNotifyWSAAExitDefer: number;

declare const kChipSetTypePowerExpress: number;

declare const random_seed_prefix: unknown /* const array */;

declare const IOFireWireSerialBusProtocolTransport: number;

declare const IFNET_TX_STATUS: number;

declare const IOOutputQueue: number;

declare const debug_container_malloc_size: number;

declare const kEndpointDescriptorUsageTypeIsocImplicit: number;

declare const kFWTCodeReadQuadlet: number;

declare const gIODisplayCapabilityStringKey: interop.Pointer;

declare const gIOHIDInterfaceMetaClass: interop.Pointer;

declare const static_if_abi: number;

declare const OSAction_IOHIDDevice__CompleteReportInterface: number;

declare const kIODTExclusive: number;

declare const kAirshipDaleBasebandErrorCCCIInternalError: number;

declare const kIOLogCatalogue: number;

declare const CS_VALIDATION_CATEGORY_PLATFORM: number;

declare const bATAAddressNotFound: number;

declare const kCheckLinkInTraining: number;

declare const IOFireWireAVCUnit: number;

declare const IOATAIOReg8: number;

declare const MBUF_TYPE_PCB: number;

declare const speclisth: unknown /* const array */;

declare const kIODirectionCompleteWithError: number;

declare const gIOUSBHostPipeMetaClass: interop.Pointer;

declare const kFWSelfIDPhyID: number;

declare const IOFWDCL: number;

declare const kEndpointDescriptorUsageTypeInterruptReserved2: number;

declare const kPCIPMCSPowerStateD1: number;

declare const gIODisplayValueKey: interop.Pointer;

declare const kIOPCIExpressCapabilityIDErrorReporting: number;

declare const kIOPMPowerStateVersion2: number;

declare const IODisplayParameterHandler: number;

declare const kIODirectionOutIn: number;

declare const IOStateNotificationItem: number;

declare const kPCI2PCIOffsetMemoryRange: number;

declare const IOUSBHostCIEndpointUpdateCommandData1DescriptorPhase: number;

declare const IOFastPathHIDAccelService: number;

declare const IOUSBHostCIIsochronousTransferControlFrameNumberPhase: number;

declare const IOATAReg32: number;

declare const kIOUCScalarIScalarO: number;

declare const kIOTrackingExcludeNames: number;

declare const IOPMrootDomain: number;

declare const gssd_mechtype: {
  NO_: -1,
  KRB5_: 0,
  SPNEGO_: 1,
  NTLM_: 2,
  IAKERB_: 3,
};

declare const csselr_cache_type: {
  DATA_UNIFIED: 0,
  INSTR: 1,
};

declare const airship_daleipc_ipc_error_flag: {
  CHANNEL_SYNC_FAILURE: 1,
  CLDMA_LINK_ERROR: 2,
  DEVICE_SLEEP_FAILURE: 4,
  DEVICE_SLEEP_EXIT_TIMEOUT: 8,
  DOWNLINK_BUFFER_COUNT_LENGTH_ERROR: 16,
  IO_TIMEOUT: 32,
  CLDMA_RX_ERROR: 64,
  CLDMA_TX_ERROR: 128,
  SYSTEM_FAILURE: 256,
  HOST_SLEEP_FAILURE: 512,
  HOST_WAKE_FAILURE: 1024,
  CHANNEL_UPDATE_FAILURE: 2048,
  UPLINK_UPDATE_FAILURE: 4096,
  CHANNEL_QUIESCE_FAILURE: 8192,
  DOWNLINK_UPDATE_FAILURE: 16384,
};

declare const IOHIDKind: {
  Unknown: 0,
  Keyboard: 1,
  RelativePointing: 2,
};

declare const daleipc_exec_stage: {
  NODEV: 0,
  ROM: 1,
  PL: 2,
  LK: 3,
  MD: 4,
  CCCI: 5,
  OS: 6,
  INVALID: 7,
};

declare const airship_acipc_memregion_state: {
  UNAVAILABLE: 0,
  AVAILABLE: 1,
  MAPPING: 2,
  MAPPED: 3,
  UNMAPPING: 4,
  LIMBO: 5,
  DEAD_UNSETTLED: 6,
  DEAD_SETTLED: 7,
  EDISCONNECTED: 8,
};

declare const airship_acipc_io_result: {
  SUCCESS: 0,
  ERROR: 1,
  OVERFLOW: 2,
  CANCELED: 3,
  RESET: 4,
};

declare const airship_acipc_tr_mode_t: {
  STANDARD: 0,
  BATCH: 1,
};

declare const airship_acipc_boot_image_response: {
  NONE: 0,
  SUCCESS: 1,
  FAILURE: 2,
  UNKNOWN: 3,
  EDISCONNECT: 4,
};

declare const airship_acipc_boot_state_detail_flag: {
  UNAVAILABLE_EXECSTAGE: 1,
  DEAD_DEVICERESET: 2,
  DEAD_EXECSTAGE: 4,
};

declare const airship_driver_user_client_type: {
  kAirshipDriverUserClientTypeDaleTraceInterface: 4,
};

declare const kdebug_test_t: {
  KERNEL_MACROS: 1,
  OLD_TIMESTAMP: 2,
  FUTURE_TIMESTAMP: 3,
  SETUP_IOP: 4,
  SETUP_COPROCESSOR: 5,
  CONTINUOUS_TIMESTAMP: 6,
  ABSOLUTE_TIMESTAMP: 7,
  PAST_EVENT: 8,
};

declare const kdp_event_t: {
  ENTER: 0,
  EXIT: 1,
  PANICLOG: 2,
};

declare const tcp_connection_server_accurate_ecn_state_t: {
  tcp_connection_server_accurate_ecn_invalid: 0,
  tcp_connection_server_accurate_ecn_feature_disabled: 1,
  tcp_connection_server_accurate_ecn_feature_enabled: 2,
  tcp_connection_server_no_ecn_requested: 3,
  tcp_connection_server_classic_ecn_requested: 4,
  tcp_connection_server_accurate_ecn_requested: 5,
  tcp_connection_server_accurate_ecn_negotiation_blackholed: 6,
  tcp_connection_server_accurate_ecn_ace_bleaching_detected: 7,
  tcp_connection_server_accurate_ecn_negotiation_success: 8,
  tcp_connection_server_accurate_ecn_negotiation_success_ect_mangling_detected: 9,
  tcp_connection_server_accurate_ecn_negotiation_success_ect_bleaching_detected: 10,
};

declare const AppleBasebandBridgeUserRequest: {
  BridgeReady: 0,
  BasebandInReset: 1,
  BasebandHostWake: 2,
  MAX: 3,
};

declare const ataEventCode: {
  NullEvent: 0,
  OnlineEvent: 1,
  OfflineEvent: 2,
  RemovedEvent: 3,
  ResetEvent: 4,
  OfflineRequest: 5,
  EjectRequest: 6,
  PIResetEvent: 7,
  ReservedEvent: 128,
};

declare const ataDeviceType: {
  UnknownATA: 0,
  ATA: 1,
  ATAPI: 2,
};

declare const ataSocketType: {
  UnknownSocket: 0,
  InternalATASocket: 1,
  MediaBaySocket: 2,
  PCCardSocket: 3,
  InternalSATA: 4,
  SATABay: 5,
  InternalSATA2: 6,
  SATA2Bay: 7,
};

declare const airship_monitor_comparator: {
  EQ: 0,
  NEQ: 1,
  LT: 2,
  LE: 3,
  GT: 4,
  GE: 5,
};

declare const IOFWAVCProtocolUserClientAsyncCommandCodes: {
  SetAVCRequestCallback: 18,
  AllocateInputPlug: 19,
  AllocateOutputPlug: 20,
  InstallAVCCommandHandler: 21,
  AddSubunit: 22,
  NumAsyncCommands: 23,
};

declare const IOFWAVCProtocolUserClientCommandCodes: {
  SendAVCResponse: 0,
  FreeInputPlug: 1,
  ReadInputPlug: 2,
  UpdateInputPlug: 3,
  FreeOutputPlug: 4,
  ReadOutputPlug: 5,
  UpdateOutputPlug: 6,
  ReadOutputMasterPlug: 7,
  UpdateOutputMasterPlug: 8,
  ReadInputMasterPlug: 9,
  UpdateInputMasterPlug: 10,
  PublishAVCUnitDirectory: 11,
  SetSubunitPlugSignalFormat: 12,
  GetSubunitPlugSignalFormat: 13,
  ConnectTargetPlugs: 14,
  DisconnectTargetPlugs: 15,
  GetTargetPlugConnection: 16,
  AVCRequestNotHandled: 17,
  NumCommands: 18,
};

declare const IOFWAVCUserClientAsyncCommandCodes: {
  InstallAsyncAVCCommandCallback: 16,
  NumAsyncCommands: 17,
};

declare const IOUSBHostCIDeviceSpeed: {
  None: 0,
  Full: 1,
  Low: 2,
  High: 3,
  Super: 4,
  SuperPlus: 5,
  SuperPlusBy2: 6,
};

declare const tIsochronousTransactionOptions: {
  None: 0,
  Wrap: 1,
};

declare const tIsochronousTransferOptions: {
  kIsochronousTransferOptionsNone: 0,
};

declare const IOUSBHostCIDeviceState: {
  Destroyed: 0,
  Paused: 1,
  Active: 2,
};

declare const IOUSBHostCIControllerState: {
  Off: 0,
  Paused: 1,
  Active: 2,
};

declare const IOUSBHostCIMessageStatus: {
  Reserved: 0,
  Success: 1,
  Offline: 2,
  NotPermitted: 3,
  BadArgument: 4,
  Timeout: 5,
  NoResources: 6,
  EndpointStopped: 7,
  ProtocolError: 8,
  TransactionError: 9,
  OverrunError: 10,
  StallError: 11,
  MissedServiceError: 12,
  Error: 13,
};

declare const IOUSBHostCIMessageType: {
  ControllerCapabilities: 0,
  PortCapabilities: 1,
  PortEvent: 8,
  FrameNumberUpdate: 9,
  FrameTimestampUpdate: 10,
  CommandMin: 16,
  ControllerPowerOn: 16,
  ControllerPowerOff: 17,
  ControllerStart: 18,
  ControllerPause: 19,
  ControllerFrameNumber: 20,
  PortPowerOn: 24,
  PortPowerOff: 25,
  PortResume: 26,
  PortSuspend: 27,
  PortReset: 28,
  PortDisable: 29,
  PortStatus: 30,
  DeviceCreate: 32,
  DeviceDestroy: 33,
  DeviceStart: 34,
  DevicePause: 35,
  DeviceUpdate: 36,
  EndpointCreate: 40,
  EndpointDestroy: 41,
  Endpoint_reserved_: 42,
  EndpointPause: 43,
  EndpointUpdate: 44,
  EndpointReset: 45,
  EndpointSetNextTransfer: 46,
  CommandMax: 55,
  SetupTransfer: 56,
  NormalTransfer: 57,
  StatusTransfer: 58,
  IsochronousTransfer: 59,
  Link: 60,
  TransferComplete: 61,
};

declare const IOUSBHostCIUserClientVersion: {
  IOUSBHostCIUserClientVersion100: 0,
};

declare const tUSBDeviceLPMStatus: {
  Default: 0,
  Disabled: 1,
  Enabled: 2,
};

declare const tUSBLPMExitLatency: {
  DescriptorExitLatency: 0,
  DeviceExitLatency: 1,
  SystemExitLatency: 2,
  MaxExitLatency: 3,
  BestEffortServiceLatency: 4,
  BestEffortServiceLatencyDeep: 5,
  DefaultBestEffortServiceLatency: 6,
  DefaultBestEffortServiceLatencyDeep: 7,
  MaxL1BaseExitLatency: 8,
  MaxL1DeepExitLatency: 9,
};

declare const tUSBHostPortStatus: {
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

declare const tDeviceRequestDirection: {
  Out: 0,
  In: 1,
};

declare const tEndpointType: {
  Control: 0,
  Isochronous: 1,
  Bulk: 2,
  Interrupt: 3,
};

declare const tEndpointDirection: {
  Out: 0,
  In: 1,
  Unknown: 2,
};

declare const tBusVoltage: {
  kBusVoltageDefault: 5,
};

declare const tLanguageID: {
  kLanguageIDEnglishUS: 1033,
};

declare const tDescriptorSize: {
  kDescriptorSize: 2,
  Device: 18,
  Configuration: 9,
  Interface: 9,
  Endpoint: 7,
  StringMinimum: 2,
  StringMaximum: 255,
  DeviceQualifier: 10,
  InterfaceAssociation: 8,
  BOS: 5,
  DeviceCapability: 3,
  USB20ExtensionCapability: 7,
  SuperSpeedUSBDeviceCapability: 10,
  ContainerIDCapability: 20,
  HubMinimum: 9,
  HubMaximum: 21,
  SuperSpeedHub: 12,
  SuperSpeedUSBEndpointCompanion: 6,
  SuperSpeedPlusIsochronousEndpointCompanion: 8,
  BillboardDeviceMinimum: 44,
  BillboardDeviceMaximum: 256,
  PlatformECIDCapability: 28,
  PlatformCapability: 20,
};

declare const mbuf_traffic_class_t: {
  BE: 0,
  BK: 1,
  VI: 2,
  VO: 3,
};

declare const SCSIParallelFeatureResult: {
  Unchanged: 0,
  Cleared: 1,
  Success: 2,
};

declare const SCSIParallelFeatureRequest: {
  No: 0,
  Attempt: 1,
  Clear: 2,
};

declare const coprocessor_type_t: {
  VersionNone: 0,
  Version1: 65536,
  Version2: 131072,
};

declare const IOPCILinkSpeed: {
  Speed_2_5_: 1,
  Speed_5_: 2,
  Speed_8_: 3,
  Speed_16_: 4,
  Speed_32_: 5,
};

declare const tIOPCILinkControlASPMBits: {
  Disabled: 0,
  L0s: 1,
  L1: 2,
  L0sL1: 3,
};

declare const airship_acipc_boot_state: {
  UNAVAILABLE: 0,
  READY: 1,
  IMAGE_SENT: 2,
  IMAGE_DONE: 3,
  DEAD_UNSETTLED: 4,
  DEAD_SETTLED: 5,
  EDISCONNECTED: 6,
};

declare const tIOPCILinkSpeed: {
  Speed_2_5_: 1,
  Speed_5_: 2,
  Speed_8_: 3,
  Speed_16_: 4,
  Speed_32_: 5,
};

declare const IONVRAMOperation: {
  Init: 0,
  Read: 1,
  Write: 2,
  Delete: 3,
  Obliterate: 4,
  Reset: 5,
};

declare const xnu_entry_routine_t: {
  BOOT_COLD: 0,
  BOOT_SECONDARY: 1,
  BOOT_WARM: 2,
  BOOT_HIB: 3,
  PANIC: 4,
};

declare const darwin_gpu_role_t: {
  UNKNOWN: 0,
  ALLOW: 1,
  DENY: 2,
  BACKGROUND: 3,
  UTILITY: 4,
  UI_NON_FOCAL: 5,
  UI: 6,
  UI_FOCAL: 7,
};

declare const libsptm_refcnt_type_t: {
  NONE: 0,
  RO: 1,
  WX: 2,
  IOMMU: 3,
};

declare const sptm_vector_type_t: {
  VECTOR_IRQ: 0,
  VECTOR_FIQ: 1,
  VECTOR_SERROR: 2,
  VECTOR_SYNC: 3,
  N_VECTOR_TYPES: 4,
};

declare const cpuid_register_t: {
  eax: 0,
  ebx: 1,
  ecx: 2,
  edx: 3,
};

declare const xdrbuf_type: {
  NONE: 0,
  BUFFER: 1,
};

declare const ipsec_dscp_mapping_t: {
  COP: 0,
  LEGAC: 1,
};

declare const mcc_flags_t: {
  NONE: 0,
  IS_SINGLE_BIT: 1,
  IS_MULTI_BIT: 2,
};

declare const ecc_version_t: {
  V1: 0,
  NUM_VERSIONS: 1,
};

declare const ext_paniclog_create_options_t: {
  NONE: 0,
  WITH_BUFFER: 1,
  ADD_SEPARATE_KEY: 2,
};

declare const ext_paniclog_flags_t: {
  NONE: 0,
  ADD_SEPARATE_KEY: 1,
};

declare const hvg_hcall_return_t: {
  SUCCESS: 0,
  ACCESS_DENIED: 1,
  INVALID_CODE: 2,
  INVALID_PARAMETER: 3,
  IO_FAILED: 4,
  FEAT_DISABLED: 5,
  UNSUPPORTED: 6,
};

declare const kperf_kpc_flags_t: {
  KERNEL_PC: 1,
  KERNEL_COUNTING: 2,
  USER_COUNTING: 4,
  CAPTURED_PC: 8,
};

declare const backtrace_pack_t: {
  NONE: 0,
  KERN_OFFSET_32: 1,
};

declare const backtrace_info_t: {
  I_NONE: 0,
  I_64_BIT: 1,
  I_TRUNCATED: 2,
};

declare const IOUSBHostCIPortState: {
  Off: 0,
  Powered: 1,
  Suspended: 2,
  Active: 3,
};

declare const IONVRAMVariableType: {
  Boolean: 1,
  Number: 2,
  String: 3,
  Data: 4,
};

declare const kcd_compression_type_t: {
  NONE: 0,
  ZLIB: 1,
};

declare const thread_selfcounts_kind_t: {
  CPI: 1,
  CPI_PER_PERF_LEVEL: 2,
  TIME_CPI: 3,
  TIME_CPI_PER_PERF_LEVEL: 4,
  TIME_ENERGY_CPI: 5,
  TIME_ENERGY_CPI_PER_PERF_LEVEL: 6,
};

declare const tDeviceRequestRecipient: {
  Device: 0,
  Interface: 1,
  Endpoint: 2,
  Other: 3,
};

declare const IOUSBHostCIExceptionType: {
  Unknown: 0,
  CapabilitiesInvalid: 1,
  Terminated: 2,
  CommandReadCollision: 3,
  CommandWriteFailed: 4,
  CommandTimeout: 5,
  CommandFailure: 6,
  InterruptInvalid: 7,
  InterruptOverflow: 8,
  DoorbellReadCollision: 9,
  DoorbellOverflow: 10,
  ProtocolError: 11,
  FrameUpdateError: 12,
};

declare const cache_type_t: {
  Lnone: 0,
  L1I: 1,
  L1D: 2,
  L2U: 3,
  L3U: 4,
  LCACHE_MAX: 5,
};

declare const telemetry_pmi: {
  NONE: 0,
  INSTRS: 1,
  CYCLES: 2,
};

declare const sptm_info_t: {
  INFO_SPTM_ALLOWED_IO_RANGES: 0,
  INFO_SPTM_ALLOWED_IO_RANGES_COUNT: 1,
  INFO_SPTM_PMAP_IO_RANGES: 2,
  INFO_SPTM_PMAP_IO_RANGES_COUNT: 3,
  INFO_SPTM_IO_RANGES: 4,
  INFO_SPTM_IO_RANGES_COUNT: 5,
  MAX_SPTM_INFOS: 6,
};

declare const airship_daleipc_channel_sync_operation: {
  CHANNEL_SYNC_FETCH_COMPLETION: 1,
  UPLINK_SYNC_FETCH_COMPLETION: 2,
  DOWNLINK_SYNC_FETCH_COMPLETION: 4,
  NETWORK_CLOCK_UPDATE: 8,
};

declare const airship_acipc_memregion_state_detail_flag: {
  UNAVAILABLE_EXECSTAGE: 1,
  UNAVAILABLE_CONFLICT: 2,
  DEAD_MAPREJECT: 4,
  DEAD_BYREQUEST: 8,
  DEAD_DEVICERESET: 16,
  DEAD_EXECSTAGE: 32,
};

declare const airship_result: {
  OK: 0,
  ERROR: -536870212,
  EBADARGUMENT: -536870206,
  ECANCELED: -536870165,
  ECANTMAP: -536870178,
  EDISCONNECTED: -536870208,
  EEXCLUSIVEACCESS: -536870203,
  EIO: -536870198,
  ENOTOPEN: -536870195,
  ENOSPACE: -536870181,
  ENOTPRIVILEGED: -536870207,
  ENOTREADY: -536870184,
  ETIMEOUT: -536870186,
  EDEVICE: -536870167,
};

declare const ataRegMask: {
  bATAAltSDevC: 14,
  bATAStatusCmd: 7,
  bATASDH: 6,
  bATACylinderHi: 5,
  bATACylinderLo: 4,
  bATASectorNum: 3,
  bATASectorCnt: 2,
  bATAErrFeatures: 1,
  bATAData: 0,
  mATAAltSDevC: 16384,
  mATAStatusCmd: 128,
  mATASDH: 64,
  mATACylinderHi: 32,
  mATACylinderLo: 16,
  mATASectorNum: 8,
  mATASectorCnt: 4,
  mATAErrFeatures: 2,
  mATAData: 1,
};

declare const airship_driver_error: {
  IpcErrorOccurred: 1,
  IpcSetTransportFailed: 2,
  IpcPowerOffTimedOut: 4,
  IpcPowerOnTimedOut: 8,
  DevicePowerOffTimedOut: 16,
  DevicePowerOnTimedOut: 32,
};

declare const airship_resource_state: {
  FREE: 0,
  BUSY: 1,
};

declare const tDeviceRequestType: {
  Standard: 0,
  Class: 1,
  Vendor: 2,
};

declare const tUSBHostConnectionSpeed: {
  None: 0,
  Full: 1,
  Low: 2,
  High: 3,
  Super: 4,
  SuperPlus: 5,
  SuperPlusBy2: 6,
  Count: 7,
};

declare const tUSBLinkState: {
  U0: 0,
  U1: 1,
  U2: 2,
  U3: 3,
  L0: 0,
  L1: 1,
  L2: 2,
  L3: 3,
};

declare const mcc_ecc_version_t: {
  V1: 0,
  NUM_VERSIONS: 1,
};

declare const kdebug_emit_flags_t: {
  FILTER_ONLY: 1,
  NON_PROCESS: 2,
};

declare const IOFWAVCUserClientCommandCodes: {
  Open: 0,
  Close: 1,
  OpenWithSessionRef: 2,
  GetSessionRef: 3,
  AVCCommand: 4,
  AVCCommandInGen: 5,
  UpdateAVCCommandTimeout: 6,
  MakeP2PInputConnection: 7,
  BreakP2PInputConnection: 8,
  MakeP2POutputConnection: 9,
  BreakP2POutputConnection: 10,
  CreateAsyncAVCCommand: 11,
  SubmitAsyncAVCCommand: 12,
  CancelAsyncAVCCommand: 13,
  ReleaseAsyncAVCCommand: 14,
  ReinitAsyncAVCCommand: 15,
  NumCommands: 16,
};

declare const airship_acipc_cr_sync_operation: {
  AIRSHIP_ACIPC_CR_SYNC_PROCESS_HI_UPDATE: 1,
};

declare const tUSBHostPortType: {
  Standard: 0,
  Captive: 1,
  Internal: 2,
  Accessory: 3,
  ExpressCard: 4,
  C: 5,
  Unknown: 6,
};

declare const EXDisplayPipeIndicator: {
  CAM: 0,
  MIC: 1,
  MIC_ALT_ACCESSIBILITY: 2,
  CAM_ALT_FACEID: 3,
  CAM_ALT_FACEID_DELAYED: 4,
  COUNT: 5,
};

declare const kdebug_live_flags_t: {
  NOWRAP: 2,
  WRAPPED: 8,
};

declare const EXBrightMessageType: {
  kLoadALSSCalibration: 0,
};

declare const csselr_cache_level: {
  L1: 0,
  L2: 2,
  L3: 4,
  L4: 6,
  L5: 8,
  L6: 10,
  L7: 12,
};

declare const IOCircularDataQueueCreateOptions: {
  Consumer: 1,
  Producer: 2,
};

declare const tUSBHostPowerSourceType: {
  StaticPool: 0,
  SMC: 1,
  Hardware: 2,
};

declare const IOUSBHostCILinkState: {
  U0: 0,
  U1: 1,
  U2: 2,
  U3: 3,
  Disabled: 4,
  RxDetect: 5,
  Inactive: 6,
  Polling: 7,
  Recovery: 8,
  Reset: 9,
  Compliance: 10,
  Test: 11,
  Resume: 15,
};

declare const NVRAMPartitionType: {
  TypeUnknown: 0,
  System: 1,
  Common: 2,
};

declare const tDescriptorType: {
  Device: 1,
  Configuration: 2,
  String: 3,
  Interface: 4,
  Endpoint: 5,
  DeviceQualifier: 6,
  OtherSpeedConfiguration: 7,
  InterfacePower: 8,
  OTG: 9,
  Debug: 10,
  InterfaceAssociation: 11,
  BOS: 15,
  DeviceCapability: 16,
  Hub: 41,
  SuperSpeedHub: 42,
  SuperSpeedUSBEndpointCompanion: 48,
  SuperSpeedPlusIsochronousEndpointCompanion: 49,
};

declare const cluster_type_t: {
  CLUSTER_TYPE_INVALID: -1,
  CLUSTER_TYPE_SMP: 0,
  CLUSTER_TYPE_E: 1,
  CLUSTER_TYPE_P: 2,
  MAX_CPU_TYPES: 3,
};

declare const ataOpcode: {
  NoOp: 0,
  FnExecIO: 1,
  PIFnExecIO: 2,
  FnRegAccess: 3,
  FnQFlush: 4,
  FnBusReset: 5,
};

declare const tcp_connection_client_accurate_ecn_state_t: {
  tcp_connection_client_accurate_ecn_invalid: 0,
  tcp_connection_client_accurate_ecn_feature_disabled: 1,
  tcp_connection_client_accurate_ecn_feature_enabled: 2,
  tcp_connection_client_classic_ecn_available: 3,
  tcp_connection_client_ecn_not_available: 4,
  tcp_connection_client_accurate_ecn_negotiation_blackholed: 5,
  tcp_connection_client_accurate_ecn_ace_bleaching_detected: 6,
  tcp_connection_client_accurate_ecn_negotiation_success: 7,
  tcp_connection_client_accurate_ecn_negotiation_success_ect_mangling_detected: 8,
  tcp_connection_client_accurate_ecn_negotiation_success_ect_bleaching_detected: 9,
};

declare const IOLockState: {
  Unlocked: 0,
  Locked: 1,
};

declare const ex_cb_action_t: {
  RERUN: 0,
  NONE: 1,
};

declare const thread_snapshot_wait_flags: {
  None: 0,
  KernelMutex: 1,
  PortReceive: 2,
  PortSetReceive: 3,
  PortSend: 4,
  PortSendInTransit: 5,
  Semaphore: 6,
  KernelRWLockRead: 7,
  KernelRWLockWrite: 8,
  KernelRWLockUpgrade: 9,
  UserLock: 10,
  PThreadMutex: 11,
  PThreadRWLockRead: 12,
  PThreadRWLockWrite: 13,
  PThreadCondVar: 14,
  ParkedWorkQueue: 15,
  WorkloopSyncWait: 16,
  OnProcess: 17,
  SleepWithInheritor: 18,
  Eventlink: 19,
  Compressor: 20,
  ParkedBoundWorkQueue: 21,
  PageBusy: 22,
  PagerInit: 23,
  PagerReady: 24,
  PagingActivity: 25,
  MappingInProgress: 26,
  MemoryBlocked: 27,
  PagingInProgress: 28,
  PageInThrottle: 29,
  ExclaveCore: 30,
  ExclaveKit: 31,
};

declare const mph_panic_flags_t: {
  NESTED_PANIC: 1,
  COMPANION_PROC_INITIATED_PANIC: 2,
  STACKSHOT_SUCCEEDED: 4,
  STACKSHOT_DATA_COMPRESSED: 8,
  STACKSHOT_FAILED_DEBUGGERSYNC: 16,
  STACKSHOT_FAILED_ERROR: 32,
  STACKSHOT_FAILED_INCOMPLETE: 64,
  STACKSHOT_FAILED_NESTED: 128,
  COREDUMP_COMPLETE: 256,
  COREDUMP_FAILED: 512,
  STACKSHOT_KERNEL_ONLY: 1024,
  STACKSHOT_FAILED_COMPRESS: 2048,
  ENCRYPTED_COREDUMP_SKIPPED: 4096,
  KERNEL_COREDUMP_SKIPPED_EXCLUDE_REGIONS_UNAVAILABLE: 8192,
  COREFILE_UNLINKED: 16384,
  INCOHERENT_PANICLOG: 32768,
  USERSPACE_INITIATED_PANIC: 65536,
  INTEGRATED_COPROC_INITIATED_PANIC: 131072,
};

declare const eph_panic_flags_t: {
  COREDUMP_COMPLETE: 1,
  STACKSHOT_SUCCEEDED: 2,
  STACKSHOT_FAILED_DEBUGGERSYNC: 4,
  STACKSHOT_FAILED_ERROR: 8,
  STACKSHOT_FAILED_INCOMPLETE: 16,
  STACKSHOT_FAILED_NESTED: 32,
  NESTED_PANIC: 64,
  BUTTON_RESET_PANIC: 128,
  COMPANION_PROC_INITIATED_PANIC: 256,
  COREDUMP_FAILED: 512,
  COMPRESS_FAILED: 1024,
  STACKSHOT_DATA_COMPRESSED: 2048,
  ENCRYPTED_COREDUMP_SKIPPED: 4096,
  KERNEL_COREDUMP_SKIPPED_EXCLUDE_REGIONS_UNAVAILABLE: 8192,
  COREFILE_UNLINKED: 16384,
  INCOHERENT_PANICLOG: 32768,
  EXCLAVE_PANIC: 65536,
  USERSPACE_INITIATED_PANIC: 131072,
  INTEGRATED_COPROC_INITIATED_PANIC: 262144,
};

declare const telemetry_notice_t: {
  BASE: 0,
  KERNEL_MICROSTACKSHOT: 1,
};

declare const microstackshot_flags_t: {
  GET_KERNEL_MICROSTACKSHOT: 8,
  GET_MICROSTACKSHOT: 16,
  GLOBAL_MICROSTACKSHOT_ENABLE: 32,
  GLOBAL_MICROSTACKSHOT_DISABLE: 64,
  SET_MICROSTACKSHOT_MARK: 128,
};

declare const stackshot_flags_t: {
  GET_DQ: 1,
  SAVE_LOADINFO: 2,
  GET_GLOBAL_MEM_STATS: 4,
  SAVE_KEXT_LOADINFO: 8,
  ACTIVE_KERNEL_THREADS_ONLY: 256,
  GET_BOOT_PROFILE: 512,
  DO_COMPRESS: 1024,
  SAVE_IMP_DONATION_PIDS: 8192,
  SAVE_IN_KERNEL_BUFFER: 16384,
  RETRIEVE_EXISTING_BUFFER: 32768,
  KCDATA_FORMAT: 65536,
  ENABLE_BT_FAULTING: 131072,
  COLLECT_DELTA_SNAPSHOT: 262144,
  COLLECT_SHAREDCACHE_LAYOUT: 524288,
  TRYLOCK: 1048576,
  ENABLE_UUID_FAULTING: 2097152,
  FROM_PANIC: 4194304,
  NO_IO_STATS: 8388608,
  THREAD_WAITINFO: 16777216,
  THREAD_GROUP: 33554432,
  SAVE_JETSAM_COALITIONS: 67108864,
  INSTRS_CYCLES: 134217728,
  ASID: 268435456,
  PAGE_TABLES: 536870912,
  DISABLE_LATENCY_INFO: 1073741824,
  SAVE_DYLD_COMPACTINFO: 2147483648,
  INCLUDE_DRIVER_THREADS_IN_KERNEL: 4294967296,
  EXCLAVES: 8589934592,
  SKIP_EXCLAVES: 17179869184,
};

declare const micro_snapshot_flags: {
  InterruptRecord: 1,
  TimerArmingRecord: 2,
  UserMode: 4,
  IORecord: 8,
  PMIRecord: 16,
  MACFRecord: 32,
  KernelThread: 64,
};

declare const airship_acipc_ipc_error_flag: {
  DEVICE_SIGNALLED: 1,
  UNEXPECTED_TRANSPORT_REVOCATION: 2,
  SYSTEM_FAILURE: 4,
  UNEXPECTED_IPC_STATUS: 8,
  UNEXPECTED_SLEEP_STATUS: 16,
  RUNNING_TIMEOUT: 32,
  BAD_TR_TI_UPDATE: 64,
  BAD_INPLACE_COMPLETION: 128,
  BAD_CR_HI_UPDATE: 256,
  BAD_CD: 512,
};

declare const hvg_hcall_dump_option_t: {
  HVG_HCALL_DUMP_OPTION_REGULAR: 1,
};

declare const kdebug_coproc_flags_t: {
  KDCP_CONTINUOUS_TIME: 1,
};

declare const sptm_guest_stage1_tlb_op_t: {
  ASIDE1IS: 0,
  VAE1IS: 1,
  VAAE1IS: 2,
  VAALE1IS: 3,
  VALE1IS: 4,
  VMALLE1IS: 5,
  RVAE1IS: 6,
  RVAAE1IS: 7,
  RVAALE1IS: 8,
  RVALE1IS: 9,
  INVALID: 10,
};

declare const lck_wake_action_t: {
  EFAULT: 0,
  O_NOT_TRANSFER_PUSH: 1,
};

declare const tIOPCIAccessOptions: {
  kIOPCIAccessLatencyTolerantHint: 1,
};

declare const os_log_coproc_reg_t: {
  os_log_coproc_register_memory: 0,
  os_log_coproc_register_harvest_fs_ftab: 1,
};

declare const generic_snapshot_flags: {
  User64_p: 1,
  Kernel64_p: 2,
};

declare const ataUnitID: {
  Invalid: -1,
  Device0: 0,
  Device1: 1,
};

declare const airship_daleipc_channel_state: {
  UNAVAILABLE: 0,
  AVAILABLE: 1,
  STARTED: 2,
  STOPPED: 3,
  DEAD: 4,
};

declare const tUSBHostConnectorType: {
  A: 0,
  MiniAB: 1,
  ExpressCard: 2,
  USB3A: 3,
  USB3B: 4,
  USB3MicroB: 5,
  USB3MicroAB: 6,
  USB3PowerB: 7,
  USBTypeC: 9,
  Unknown: 254,
  Proprietary: 255,
};

declare const airship_acipc_tr_sync_operation: {
  FLUSH_TRANSFERS: 1,
  PROCESS_TI_UPDATE: 2,
  FETCH_COMPLETIONS: 4,
};

declare const IOUSBGetEndpointDescriptorOptions: {
  Original: 0,
  CurrentPolicy: 1,
};

declare const atapiConfig: {
  DRQSlow: 0,
  IRQPacket: 1,
  DRQFast: 16,
  Unknown: 17,
};

declare const airship_driver_power_state: {
  ACTIVE: 0,
  DEVICE_SLEEP: 1,
  HOST_SLEEP: 2,
  HOST_SLEEP_WAIT: 3,
  HOST_WAKE_WAIT: 4,
};

declare const SCSIParallelFeature: {
  WideDataTransfer: 0,
  SynchronousDataTransfer: 1,
  QuickArbitrationAndSelection: 2,
  DoubleTransitionDataTransfers: 3,
  InformationUnitTransfers: 4,
  TotalFeatureCount: 5,
};

declare const tIOPCIDeviceResetOptions: {
  None: 0,
  Terminate: 1,
};

declare const mach_assert_type_t: {
  T_DEFAULT: 0,
  T_3P: 1,
  T_3S: 2,
  T_3U: 3,
};

declare const pal_hib_restore_stage_t: {
  pal_hib_restore_stage_dram_pages: 0,
  pal_hib_restore_stage_preview_pages: 1,
  pal_hib_restore_stage_handoff_data: 2,
};

declare const thread_call_priority_t: {
  HIGH: 0,
  KERNEL: 1,
  USER: 2,
  LOW: 3,
  KERNEL_HIGH: 4,
};

declare const cs_launch_type_t: {
  NONE: 0,
  SYSTEM_SERVICE: 1,
  SYSDIAGNOSE: 2,
  APPLICATION: 3,
};

declare const tEndpointUsageType: {
  InterruptPeriodic: 0,
  InterruptNotification: 1,
  InterruptReserved1: 2,
  InterruptReserved2: 3,
  IsocData: 0,
  IsocFeedback: 1,
  IsocImplicit: 2,
  IsocReserved: 3,
};

declare const socd_client_trace_code_xnu_t: {
  PANIC: 0,
  START_IOKIT: 1,
  PLATFORM_ACTION: 2,
  PM_SET_POWER_STATE: 3,
  PM_INFORM_POWER_CHANGE: 4,
  STACKSHOT: 5,
  PM_SET_POWER_STATE_ACK: 6,
  PM_INFORM_POWER_CHANGE_ACK: 7,
  KERNEL_STATE_PANIC: 8,
  MAX: 9,
};

declare const SCSIParallelMessages: {
  TASK_COMPLETE: 0,
  EXTENDED_MESSAGE: 1,
  SAVE_DATA_POINTER: 2,
  RESTORE_POINTERS: 3,
  DISCONNECT: 4,
  INITIATOR_DETECTED_ERROR: 5,
  MESSAGE_REJECT: 7,
  NO_OPERATION: 8,
  MESSAGE_PARITY_ERROR: 9,
  IGNORE_WIDE_RESIDUE: 35,
  QAS_REQUEST: 85,
  IDENTIFY: 128,
  MODIFY_DATA_POINTER: 0,
  SYNCHONOUS_DATA_TRANSFER_REQUEST: 1,
  WIDE_DATA_TRANSFER_REQUEST: 3,
  PARALLEL_PROTOCOL_REQUEST: 4,
  ACA: 36,
  HEAD_OF_QUEUE: 33,
  LINKED_COMMAND_COMPLETE: 10,
  ORDERED: 34,
  SIMPLE: 32,
  ABORT_TASK: 13,
  ABORT_TASK_SET: 6,
  CLEAR_ACA: 22,
  CLEAR_TASK_SET: 14,
  LOGICAL_UNIT_RESET: 23,
  TARGET_RESET: 12,
};

declare const tInternalUSBHostConnectionSpeed: {
  Low: 0,
  Full: 1,
  High: 2,
  Super: 3,
  SuperPlus: 4,
  SuperPlusBy2: 5,
  Count: 6,
};

declare const in6_clat46_evhdlr_code_t: {
  V4_FLOW: 0,
  V6_ADDR_CONFFAIL: 1,
};

declare const hv_volatile_state_t: {
  HV_DEBUG_STATE: 0,
};

declare const nfs_supported_kerberos_etypes: {
  DES3_CBC_SHA1_KD: 16,
  AES128_CTS_HMAC_SHA1_96: 17,
  AES256_CTS_HMAC_SHA1_96: 18,
};

declare const IODebuggerLockState: {
  kIODebuggerLockTaken: 1,
};

declare const kdebug_flags_t: {
  PIDCHECK: 16,
  MAPINIT: 32,
  PIDEXCLUDE: 64,
  LP64: 256,
  CONTINUOUS_TIME: 512,
  DISABLE_COPROCS: 1024,
  MATCH_DISABLE: 2048,
  TYPEFILTER_CHECK: 4194304,
  DEBUGID_64: 8388608,
  BUFINIT: -2147483648,
};

declare const ex_cb_class_t: {
  ILLEGAL_INSTR_SET: 0,
  MAX: 1,
};

declare const _IOAudioDevicePowerState: {
  Sleep: 0,
  Idle: 1,
  Active: 2,
};

declare const tEndpointSynchronizationType: {
  None: 0,
  Asynchronous: 1,
  Adaptive: 2,
  Synchronous: 3,
};

declare const airship_buffer_direction: {
  IN: 0,
  OUT: 1,
  INOUT: 2,
};

declare const ecc_flags_t: {
  NONE: 0,
  IS_CORRECTABLE: 1,
  DB_CORRUPTED: 2,
  IS_TEST_ERROR: 4,
  DB_ONLY: 8,
  REMOVE_ADDR: 16,
};

declare const nfstype: {
  NON: 0,
  REG: 1,
  DIR: 2,
  BLK: 3,
  CHR: 4,
  LNK: 5,
  SOCK: 6,
  FIFO: 7,
  ATTRDIR: 8,
  NAMEDATTR: 9,
};

declare const IOFWSBP2UserClientCommandCodes: {
  Open: 0,
  Close: 1,
  CreateLogin: 2,
  ReleaseLogin: 3,
  SubmitLogin: 4,
  SubmitLogout: 5,
  SetLoginFlags: 6,
  GetMaxCommandBlockSize: 7,
  GetLoginID: 8,
  SetReconnectTime: 9,
  SetMaxPayloadSize: 10,
  CreateORB: 11,
  ReleaseORB: 12,
  SubmitORB: 13,
  SetCommandFlags: 14,
  SetMaxORBPayloadSize: 15,
  SetCommandTimeout: 16,
  SetCommandGeneration: 17,
  SetToDummy: 18,
  SetCommandBuffersAsRanges: 19,
  ReleaseCommandBuffers: 20,
  SetCommandBlock: 21,
  CreateMgmtORB: 22,
  ReleaseMgmtORB: 23,
  SubmitMgmtORB: 24,
  MgmtORBSetCommandFunction: 25,
  MgmtORBSetManageeORB: 26,
  MgmtORBSetManageeLogin: 27,
  MgmtORBSetResponseBuffer: 28,
  LSIWorkaroundSetCommandBuffersAsRanges: 29,
  MgmtORBLSIWorkaroundSyncBuffersForOutput: 30,
  MgmtORBLSIWorkaroundSyncBuffersForInput: 31,
  OpenWithSessionRef: 32,
  GetSessionRef: 33,
  RingDoorbell: 34,
  EnableUnsolicitedStatus: 35,
  SetBusyTimeoutRegisterValue: 36,
  SetORBRefCon: 37,
  SetPassword: 38,
  SetMessageCallback: 39,
  SetLoginCallback: 40,
  SetLogoutCallback: 41,
  SetUnsolicitedStatusNotify: 42,
  SetStatusNotify: 43,
  SetMgmtORBCallback: 44,
  SubmitFetchAgentReset: 45,
  SetFetchAgentWriteCompletion: 46,
  NumCommands: 47,
};

declare const tUSBHostPortConnectable: {
  Not: 0,
  kUSBHostPortConnectable: 1,
};

declare const lck_sleep_action_t: {
  DEFAULT: 0,
  UNLOCK: 1,
  SHARED: 2,
  EXCLUSIVE: 4,
  SPIN: 8,
  PROMOTED_PRI: 16,
  SPIN_ALWAYS: 32,
};

declare const airship_acipc_ring_state_detail_flag: {
  UNAVAILABLE_EXECSTAGE: 1,
  UNAVAILABLE_CONFLICT: 2,
  UNAVAILABLE_DEPENDENCY: 4,
  DEAD_OPENREJECT: 8,
  DEAD_BYREQUEST: 16,
  DEAD_DEVICERESET: 32,
  DEAD_EXECSTAGE: 64,
};

declare const cpu_event: {
  CPU_BOOT_REQUESTED: 0,
  CPU_BOOTED: 1,
  CPU_ACTIVE: 2,
  CLUSTER_ACTIVE: 3,
  CPU_EXIT_REQUESTED: 4,
  CPU_DOWN: 5,
  CLUSTER_EXIT_REQUESTED: 6,
  CPU_EXITED: 7,
  PLATFORM_QUIESCE: 8,
  PLATFORM_ACTIVE: 9,
  PLATFORM_HALT_RESTART: 10,
  PLATFORM_PANIC: 11,
  PLATFORM_PANIC_SYNC: 12,
  PLATFORM_PRE_SLEEP: 13,
  PLATFORM_POST_RESUME: 14,
};

declare const kd_callback_type: {
  KDEBUG_ENABLED: 0,
  KDEBUG_DISABLED: 1,
  SYNC_FLUSH: 2,
  TYPEFILTER_CHANGED: 3,
  SNAPSHOT_STATE: 4,
};

declare const tIOPCIDeviceResetTypes: {
  HotReset: 1,
  WarmReset: 2,
  WarmResetDisable: 4,
  WarmResetEnable: 8,
  FunctionReset: 16,
};

declare const priority_queue_entry_sched_modifier_t: {
  NONE: 0,
  PREEMPTED: 1,
};

declare const ataFlags: {
  bATAFlagQuiesce: 20,
  bATAFlagNoIRQ: 19,
  bATAFlag48BitLBA: 18,
  bATAFlagDMAQueued: 17,
  bATAFlagOverlapped: 16,
  bATAFlagUseConfigSpeed: 15,
  bATAFlagByteSwap: 14,
  bATAFlagIORead: 13,
  bATAFlagIOWrite: 12,
  bATAFlagTFAccessResult: 8,
  bATAFlagUseDMA: 7,
  bATAFlagProtocolATAPI: 5,
  bATAFlagImmediate: 1,
  bATAFlagTFAccess: 0,
  mATAFlagQuiesce: 1048576,
  mATAFlagUseNoIRQ: 524288,
  mATAFlag48BitLBA: 262144,
  mATAFlagDMAQueued: 131072,
  mATAFlagOverlapped: 65536,
  mATAFlagUseConfigSpeed: 32768,
  mATAFlagByteSwap: 16384,
  mATAFlagIORead: 8192,
  mATAFlagIOWrite: 4096,
  mATAFlagTFAccessResult: 256,
  mATAFlagUseDMA: 128,
  mATAFlagProtocolATAPI: 32,
  mATAFlagImmediate: 2,
  mATAFlagTFAccess: 1,
};

declare const airship_driver_power_target: {
  ACTIVE: 0,
  ACTIVE_PREVENTING_DEVICE_SLEEP: 1,
  HOST_SLEEP: 2,
};

declare const airship_acipc_tr_enqueue_option: {
  AIRSHIP_ACIPC_TR_ENQUEUE_OPTION_CHAIN: 1,
};

declare const if_netem_model_t: {
  ULL: 0,
  LC: 1,
};

declare const backtrace_flags_t: {
  NONE: 0,
  KERN_INTERRUPTED: 1,
};

declare const airship_acipc_cr_mirror_element_type: {
  COMPLETION_RECORD: 0,
  RAW_DESCRIPTOR: 1,
};

declare const socd_client_trace_class_t: {
  XNU: 0,
  WDT: 1,
  SOC: 2,
  MAX: 3,
};

declare const EFI_RESET_TYPE: {
  Cold: 0,
  Warm: 1,
  Shutdown: 2,
};

declare const tDeviceCapabilityType: {
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

declare const libsptm_cpu_state_t: {
  SPTM_INTERRUPTED: 0,
  PANIC_SPIN: 1,
};

declare const hv_trap_type_t: {
  ASK_: 0,
  HREAD_: 1,
};

declare const IOPCISaveDeviceStateOptions: {
  kPCIConfigShadowPermanent: -2147483648,
};

declare const gssd_nametype: {
  STRING_NAME: 0,
  EXPORT: 1,
  ANONYMOUS: 2,
  HOSTBASED: 3,
  USER: 4,
  MACHINE_UID: 5,
  STRING_UID: 6,
  KRB5_PRINCIPAL: 7,
  KRB5_REFERRAL: 8,
  NTLM_PRINCIPAL: 9,
  NTLM_BLOB: 10,
  UUID: 11,
};

declare const airship_acipc_ring_state: {
  UNAVAILABLE: 0,
  AVAILABLE: 1,
  OPENING: 2,
  OPEN: 3,
  CLOSING: 4,
  LIMBO: 5,
  DEAD_UNSETTLED: 6,
  DEAD_SETTLED: 7,
  EDISCONNECTED: 8,
};

declare const IOPCIMemoryRange: {
  BAR0: 0,
  BAR1: 1,
  BAR2: 2,
  BAR3: 3,
  BAR4: 4,
  BAR5: 5,
  ExpansionROM: 6,
};

declare const libsptm_error_t: {
  SUCCESS: 0,
  NOT_INITTED: 1,
  INVALID_ARG: 2,
  TYPE_MISMATCH: 3,
  FAILURE: 4,
};

declare const EFI_MEMORY_TYPE: {
  ReservedMemoryType: 0,
  LoaderCode: 1,
  LoaderData: 2,
  BootServicesCode: 3,
  BootServicesData: 4,
  RuntimeServicesCode: 5,
  RuntimeServicesData: 6,
  ConventionalMemory: 7,
  UnusableMemory: 8,
  ACPIReclaimMemory: 9,
  ACPIMemoryNVS: 10,
  MemoryMappedIO: 11,
  MemoryMappedIOPortSpace: 12,
  PalCode: 13,
  MaxMemoryType: 14,
};

declare const TerminationState: {
  NotTerminated: 0,
  NeedsTermination: 1,
  Terminated: 2,
};

declare const airship_acipc_health_status_flag: {
  AIRSHIP_ACIPC_HEALTH_STATUS_ERROR_DOORBELL_COORDINATOR: 1,
};

declare const kf_override_flag_t: {
  SERIAL_OVRD: 2,
  PMAPV_OVRD: 4,
  MATV_OVRD: 8,
  STACKSHOT_OVRD: 16,
  COMPRSV_OVRD: 32,
  INTERRUPT_MASKED_DEBUG_OVRD: 64,
  TRAPTRACE_OVRD: 128,
  IOTRACE_OVRD: 256,
  INTERRUPT_MASKED_DEBUG_STACKSHOT_OVRD: 512,
  SCHED_HYGIENE_DEBUG_PMC_OVRD: 1024,
  MACH_ASSERT_OVRD: 2048,
  MADVISE_FREE_DEBUG_OVRD: 4096,
  DISABLE_FP_POPC_ON_PGFLT: 8192,
  DISABLE_PROD_TRC_VALIDATION: 16384,
  IO_TIMEOUT_OVRD: 32768,
  PREEMPTION_DISABLED_DEBUG_OVRD: 65536,
  DISABLE_PROCREF_TRACKING_OVRD: 131072,
};

declare const hvg_hcall_code_t: {
  TRIGGER_DUMP: 1,
  SET_COREDUMP_DATA: 2,
  GET_MABS_OFFSET: 3,
  GET_BOOTSESSIONUUID: 4,
  VCPU_WFK: 5,
  VCPU_KICK: 6,
  COUNT: 7,
};

declare const IOUSBHostCIEndpointState: {
  Destroyed: 0,
  Halted: 1,
  Paused: 2,
  Active: 3,
};

declare const sptm_frame_type_t: {
  SPTM_UNTYPED: 0,
  SPTM_UNUSED: 1,
  SPTM_DEFAULT: 2,
  SPTM_RO: 3,
  SPTM_CODE: 4,
  SPTM_TXM_CODE: 5,
  SPTM_XNU_CODE: 6,
  SPTM_XNU_CODE_DBG_RW: 7,
  SPTM_KERNEL_ROOT_TABLE: 8,
  SPTM_PAGE_TABLE: 9,
  SPTM_IOMMU_BOOTSTRAP: 10,
  XNU_DEFAULT: 11,
  XNU_RO: 12,
  XNU_RO_DBG_RW: 13,
  XNU_USER_EXEC: 14,
  XNU_USER_DEBUG: 15,
  XNU_USER_JIT: 16,
  XNU_USER_ROOT_TABLE: 17,
  XNU_SHARED_ROOT_TABLE: 18,
  XNU_PAGE_TABLE: 19,
  XNU_PAGE_TABLE_SHARED: 20,
  XNU_PAGE_TABLE_ROZONE: 21,
  XNU_PAGE_TABLE_COMMPAGE: 22,
  XNU_IOMMU: 23,
  XNU_ROZONE: 24,
  XNU_IO: 25,
  XNU_PROTECTED_IO: 26,
  XNU_COMMPAGE_RW: 27,
  XNU_COMMPAGE_RO: 28,
  XNU_COMMPAGE_RX: 29,
  XNU_TAG_STORAGE: 30,
  XNU_STAGE2_ROOT_TABLE: 31,
  XNU_STAGE2_PAGE_TABLE: 32,
  XNU_KERNEL_RESTRICTED: 33,
  XNU_RESERVED_1: 34,
  XNU_RESERVED_2: 35,
  XNU_RESTRICTED_IO: 36,
  XNU_RESTRICTED_IO_TELEMETRY: 37,
  XNU_SUBPAGE_USER_ROOT_TABLES: 38,
  TXM_DEFAULT: 39,
  TXM_RO: 40,
  TXM_RW: 41,
  TXM_CPU_STACK: 42,
  TXM_THREAD_STACK: 43,
  TXM_ADDRESS_SPACE_TABLE: 44,
  TXM_MALLOC_PAGE: 45,
  TXM_FREE_LIST: 46,
  TXM_SLAB_TRUST_CACHE: 47,
  TXM_SLAB_PROFILE: 48,
  TXM_SLAB_CODE_SIGNATURE: 49,
  TXM_SLAB_CODE_REGION: 50,
  TXM_SLAB_ADDRESS_SPACE: 51,
  TXM_BUCKET_1024: 52,
  TXM_BUCKET_2048: 53,
  TXM_BUCKET_4096: 54,
  TXM_BUCKET_8192: 55,
  TXM_BULK_DATA: 56,
  TXM_BULK_DATA_READ_ONLY: 57,
  TXM_LOG: 58,
  TXM_SEP_SECURE_CHANNEL: 59,
  SK_DEFAULT: 60,
  SK_SHARED_RO: 61,
  SK_SHARED_RW: 62,
  SK_IO: 63,
  N_FRAME_TYPES: 64,
  FRAME_TYPE_INVALID: 65,
  FRAME_TYPE_ANY: 66,
};

declare const IOPCIBARType: {
  M32: 0,
  IO: 1,
  M64: 4,
  M32PF: 8,
  M64PF: 12,
};

declare class __Reply__mach_gss_unhold_cred_t {
  constructor(init?: __Reply__mach_gss_unhold_cred_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
  major_stat: number;
  minor_stat: number;
}

declare class __Reply__mach_gss_hold_cred_t {
  constructor(init?: __Reply__mach_gss_hold_cred_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
  major_stat: number;
  minor_stat: number;
}

declare class __Reply__mach_gss_init_sec_context_v3_t {
  constructor(init?: __Reply__mach_gss_init_sec_context_v3_t);
  Head: mach_msg_header_t;
  msgh_body: mach_msg_body_t;
  key: mach_msg_ool_descriptor_t;
  outtoken: mach_msg_ool_descriptor_t;
  NDR: NDR_record_t;
  gssd_flags: number;
  context: number;
  cred_handle: number;
  ret_flags: number;
  keyCnt: number;
  outtokenCnt: number;
  displaynameOffset: number;
  displaynameCnt: number;
  displayname: unknown /* const array */;
  major_stat: number;
  minor_stat: number;
}

declare class __Reply__mach_gss_init_sec_context_v2_t {
  constructor(init?: __Reply__mach_gss_init_sec_context_v2_t);
  Head: mach_msg_header_t;
  msgh_body: mach_msg_body_t;
  key: mach_msg_ool_descriptor_t;
  outtoken: mach_msg_ool_descriptor_t;
  NDR: NDR_record_t;
  gssd_flags: number;
  context: number;
  cred_handle: number;
  ret_flags: number;
  keyCnt: number;
  outtokenCnt: number;
  displaynameOffset: number;
  displaynameCnt: number;
  displayname: unknown /* const array */;
  major_stat: number;
  minor_stat: number;
}

declare class __Reply__mach_gss_log_error_t {
  constructor(init?: __Reply__mach_gss_log_error_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class __Request__mach_gss_hold_cred_t {
  constructor(init?: __Request__mach_gss_hold_cred_t);
  Head: mach_msg_header_t;
  msgh_body: mach_msg_body_t;
  princ: mach_msg_ool_descriptor_t;
  NDR: NDR_record_t;
  mech: interop.Enum<typeof gssd_mechtype>;
  nt: interop.Enum<typeof gssd_nametype>;
  princCnt: number;
}

declare class __Request__mach_gss_log_error_t {
  constructor(init?: __Request__mach_gss_log_error_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  mntOffset: number;
  mntCnt: number;
  mnt: unknown /* const array */;
  uid: number;
  sourceOffset: number;
  sourceCnt: number;
  source: unknown /* const array */;
  major_stat: number;
  minor_stat: number;
}

declare class __Request__mach_gss_init_sec_context_t {
  constructor(init?: __Request__mach_gss_init_sec_context_t);
  Head: mach_msg_header_t;
  msgh_body: mach_msg_body_t;
  intoken: mach_msg_ool_descriptor_t;
  NDR: NDR_record_t;
  mech: interop.Enum<typeof gssd_mechtype>;
  intokenCnt: number;
  uid: number;
  princ_namestrOffset: number;
  princ_namestrCnt: number;
  princ_namestr: unknown /* const array */;
  svc_namestrOffset: number;
  svc_namestrCnt: number;
  svc_namestr: unknown /* const array */;
  flags: number;
  gssd_flags: number;
  context: number;
  cred_handle: number;
}

declare class __OSMallocTag__ {
  constructor(init?: __OSMallocTag__);
}

declare class sha1_ctxt {
  constructor(init?: sha1_ctxt);
  h: unnamed_11444704629501519341;
  c: unnamed_16186558334874051404;
  m: unnamed_16283433901440427056;
  count: number;
}

declare class in6_defrouter {
  constructor(init?: in6_defrouter);
  rtaddr: sockaddr_in6;
  flags: number;
  stateflags: number;
  rtlifetime: number;
  expire: number;
  if_index: number;
}

declare class arm_vfpsaved_state {
  constructor(init?: arm_vfpsaved_state);
}

declare class perfcontrol_state {
  constructor(init?: perfcontrol_state);
  opaque: unknown /* const array */;
}

declare class __Request__kextd_ping_t {
  constructor(init?: __Request__kextd_ping_t);
  Head: mach_msg_header_t;
}

declare class catch_exc_subsystem {
  constructor(init?: catch_exc_subsystem);
  server: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  start: number;
  end: number;
  maxsize: number;
  reserved: number;
  routine: unknown /* const array */;
}

declare class __Request__arcade_upcall_t {
  constructor(init?: __Request__arcade_upcall_t);
  Head: mach_msg_header_t;
  msgh_body: mach_msg_body_t;
  path: mach_msg_ool_descriptor_t;
  NDR: NDR_record_t;
  pathCnt: number;
  offset: number;
}

declare class __Reply__audit_triggers_t {
  constructor(init?: __Reply__audit_triggers_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class __Request__audit_triggers_t {
  constructor(init?: __Request__audit_triggers_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  flags: number;
}

declare class __Reply__mach_exception_raise_state_identity_t {
  constructor(init?: __Reply__mach_exception_raise_state_identity_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
  flavor: number;
  new_stateCnt: number;
  new_state: unknown /* const array */;
}

declare class __Request__mach_exception_raise_state_t {
  constructor(init?: __Request__mach_exception_raise_state_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  exception: number;
  codeCnt: number;
  code: unknown /* const array */;
  flavor: number;
  old_stateCnt: number;
  old_state: unknown /* const array */;
}

declare class __Request__mach_exception_raise_t {
  constructor(init?: __Request__mach_exception_raise_t);
  Head: mach_msg_header_t;
  msgh_body: mach_msg_body_t;
  thread: mach_msg_port_descriptor_t;
  task: mach_msg_port_descriptor_t;
  NDR: NDR_record_t;
  exception: number;
  codeCnt: number;
  code: unknown /* const array */;
}

declare class catch_mach_exc_subsystem {
  constructor(init?: catch_mach_exc_subsystem);
  server: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  start: number;
  end: number;
  maxsize: number;
  reserved: number;
  routine: unknown /* const array */;
}

declare class __Reply__vfs_resolve_reparent_with_audit_token_t {
  constructor(init?: __Reply__vfs_resolve_reparent_with_audit_token_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class __Reply__vfs_resolve_dir_t {
  constructor(init?: __Reply__vfs_resolve_dir_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class __Request__vfs_resolve_reparent_with_audit_token_t {
  constructor(init?: __Request__vfs_resolve_reparent_with_audit_token_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  req_id: number;
  op: number;
  path: unknown /* const array */;
  dest_path: unknown /* const array */;
  req_atoken: audit_token_t;
}

declare class __Request__nspace_resolve_path_t {
  constructor(init?: __Request__nspace_resolve_path_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  req_id: number;
  pid: number;
  op: number;
  path: unknown /* const array */;
}

declare class __Request__nspace_handle_t {
  constructor(init?: __Request__nspace_handle_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  pid: number;
  path: unknown /* const array */;
}

declare class __Reply__check_task_access_t {
  constructor(init?: __Reply__check_task_access_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class __Request__find_code_signature_t {
  constructor(init?: __Request__find_code_signature_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  new_pid: number;
}

declare class __Request__sysdiagnose_notification_with_audit_token_t {
  constructor(init?: __Request__sysdiagnose_notification_with_audit_token_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  flags: number;
}

declare class __Reply__mcc_memory_error_notification_t {
  constructor(init?: __Reply__mcc_memory_error_notification_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class __Request__mcc_memory_error_notification_t {
  constructor(init?: __Request__mcc_memory_error_notification_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  event: mcc_ecc_event_t;
}

declare class __Request__memory_error_notification_t {
  constructor(init?: __Request__memory_error_notification_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  event: ecc_event_t;
}

declare class shared_region_range_np {
  constructor(init?: shared_region_range_np);
  srr_address: number;
  srr_size: number;
}

declare class __Reply__upl_commit_range_t {
  constructor(init?: __Reply__upl_commit_range_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
  empty: number;
}

declare class __Reply__upl_commit_t {
  constructor(init?: __Reply__upl_commit_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class __Reply__upl_abort_range_t {
  constructor(init?: __Reply__upl_abort_range_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
  empty: number;
}

declare class __Reply__telemetry_notification_t {
  constructor(init?: __Reply__telemetry_notification_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class __Request__telemetry_notification_t {
  constructor(init?: __Request__telemetry_notification_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  flags: number;
}

declare class coalition_notification_subsystem {
  constructor(init?: coalition_notification_subsystem);
  server: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  start: number;
  end: number;
  maxsize: number;
  reserved: number;
  routine: unknown /* const array */;
}

declare class __Reply__fairplayd_arcade_request_t {
  constructor(init?: __Reply__fairplayd_arcade_request_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class __Reply__iocompressionstats_notification_t {
  constructor(init?: __Reply__iocompressionstats_notification_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class __Request__iocompressionstats_notification_t {
  constructor(init?: __Request__iocompressionstats_notification_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  flags: number;
}

declare class __Reply__doubleagent_list_xattrs_t {
  constructor(init?: __Reply__doubleagent_list_xattrs_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
  err: number;
  result: list_xattrs_result;
}

declare class __Reply__doubleagent_lookup_xattr_t {
  constructor(init?: __Reply__doubleagent_lookup_xattr_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
  err: number;
  value_offset: number;
  value_length: number;
}

declare class __Request__doubleagent_list_xattrs_t {
  constructor(init?: __Request__doubleagent_list_xattrs_t);
  Head: mach_msg_header_t;
  msgh_body: mach_msg_body_t;
  file_port: mach_msg_port_descriptor_t;
  NDR: NDR_record_t;
  file_size: number;
}

declare class __Reply__doubleagent_allocate_xattr_t {
  constructor(init?: __Reply__doubleagent_allocate_xattr_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
  err: number;
  value_offset: number;
}

declare class __Request__doubleagent_lookup_xattr_t {
  constructor(init?: __Request__doubleagent_lookup_xattr_t);
  Head: mach_msg_header_t;
  msgh_body: mach_msg_body_t;
  file_port: mach_msg_port_descriptor_t;
  NDR: NDR_record_t;
  file_size: number;
  nameOffset: number;
  nameCnt: number;
  name: unknown /* const array */;
}

declare class __Reply__mach_notify_send_once_t {
  constructor(init?: __Reply__mach_notify_send_once_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class __Reply__mach_notify_port_deleted_t {
  constructor(init?: __Reply__mach_notify_port_deleted_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class __Request__mach_notify_dead_name_t {
  constructor(init?: __Request__mach_notify_dead_name_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  name: number;
}

declare class console_ops {
  constructor(init?: console_ops);
  putc: (p1: number, p2: boolean) => void | null;
  getc: (p1: boolean) => number | null;
}

declare class ipc_object {
  constructor(init?: ipc_object);
}

declare class airship_daleipc_uplink_packet_completion {
  constructor(init?: airship_daleipc_uplink_packet_completion);
  size: number;
  tag: number;
  channel_id: number;
}

declare class daleipc_device_controller {
  constructor(init?: daleipc_device_controller);
}

declare class daleipc_channel_controller {
  constructor(init?: daleipc_channel_controller);
}

declare class airship_acipc_doorbell {
  constructor(init?: airship_acipc_doorbell);
}

declare class __Request__mach_gss_accept_sec_context_t {
  constructor(init?: __Request__mach_gss_accept_sec_context_t);
  Head: mach_msg_header_t;
  msgh_body: mach_msg_body_t;
  intoken: mach_msg_ool_descriptor_t;
  NDR: NDR_record_t;
  intokenCnt: number;
  svc_namestrOffset: number;
  svc_namestrCnt: number;
  svc_namestr: unknown /* const array */;
  gssd_flags: number;
  context: number;
  cred_handle: number;
}

declare class airship_acipc_cr_mirror_element {
  constructor(init?: airship_acipc_cr_mirror_element);
  type: interop.Enum<typeof airship_acipc_cr_mirror_element_type>;
  data: airship_acipc_cr_mirror_element_data;
}

declare class airship_acipc_cr_mirror_raw_descriptor {
  constructor(init?: airship_acipc_cr_mirror_raw_descriptor);
  bytes: unknown /* const array */;
}

declare class airship_acipc_cr {
  constructor(init?: airship_acipc_cr);
}

declare class airship_acipc_tr {
  constructor(init?: airship_acipc_tr);
}

declare class airship_interrupt {
  constructor(init?: airship_interrupt);
}

declare class airship_client {
  constructor(init?: airship_client);
}

declare class airship_device_transport {
  constructor(init?: airship_device_transport);
}

declare class DTSavedScope {
  constructor(init?: DTSavedScope);
  nextScope: interop.Pointer;
  scope: interop.Pointer;
  entry: interop.Pointer;
  index: number;
}

declare class OpaqueDTEntry {
  constructor(init?: OpaqueDTEntry);
  nProperties: number;
  nChildren: number;
}

declare class EFI_SYSTEM_TABLE_64 {
  constructor(init?: EFI_SYSTEM_TABLE_64);
  Hdr: EFI_TABLE_HEADER;
  FirmwareVendor: number;
  FirmwareRevision: number;
  __pad: number;
  ConsoleInHandle: number;
  ConIn: number;
  ConsoleOutHandle: number;
  ConOut: number;
  StandardErrorHandle: number;
  StdErr: number;
  RuntimeServices: number;
  BootServices: number;
  NumberOfTableEntries: number;
  ConfigurationTable: number;
}

declare class EFI_CONFIGURATION_TABLE_64 {
  constructor(init?: EFI_CONFIGURATION_TABLE_64);
  VendorGuid: EFI_GUID;
  VendorTable: number;
}

declare class EFI_RUNTIME_SERVICES_64 {
  constructor(init?: EFI_RUNTIME_SERVICES_64);
  Hdr: EFI_TABLE_HEADER;
  GetTime: number;
  SetTime: number;
  GetWakeupTime: number;
  SetWakeupTime: number;
  SetVirtualAddressMap: number;
  ConvertPointer: number;
  GetVariable: number;
  GetNextVariableName: number;
  SetVariable: number;
  GetNextHighMonotonicCount: number;
  ResetSystem: number;
}

declare class EFI_TIME_CAPABILITIES {
  constructor(init?: EFI_TIME_CAPABILITIES);
  Resolution: number;
  Accuracy: number;
  SetsToZero: number;
}

declare class EFI_MEMORY_DESCRIPTOR {
  constructor(init?: EFI_MEMORY_DESCRIPTOR);
  Type: number;
  Pad: number;
  PhysicalStart: number;
  VirtualStart: number;
  NumberOfPages: number;
  Attribute: number;
}

declare class EFI_GUID {
  constructor(init?: EFI_GUID);
  Data1: number;
  Data2: number;
  Data3: number;
  Data4: unknown /* const array */;
}

declare class boot_args {
  constructor(init?: boot_args);
  Revision: number;
  Version: number;
  efiMode: number;
  debugMode: number;
  flags: number;
  CommandLine: unknown /* const array */;
  MemoryMap: number;
  MemoryMapSize: number;
  MemoryMapDescriptorSize: number;
  MemoryMapDescriptorVersion: number;
  VideoV1: Boot_VideoV1;
  deviceTreeP: number;
  deviceTreeLength: number;
  kaddr: number;
  ksize: number;
  efiRuntimeServicesPageStart: number;
  efiRuntimeServicesPageCount: number;
  efiRuntimeServicesVirtualPageStart: number;
  efiSystemTable: number;
  kslide: number;
  performanceDataStart: number;
  performanceDataSize: number;
  keyStoreDataStart: number;
  keyStoreDataSize: number;
  bootMemStart: number;
  bootMemSize: number;
  PhysicalMemorySize: number;
  FSBFrequency: number;
  pciConfigSpaceBaseAddress: number;
  pciConfigSpaceStartBusNumber: number;
  pciConfigSpaceEndBusNumber: number;
  csrActiveConfig: number;
  csrCapabilities: number;
  boot_SMC_plimit: number;
  bootProgressMeterStart: number;
  bootProgressMeterEnd: number;
  Video: Boot_Video;
  apfsDataStart: number;
  apfsDataSize: number;
  KC_hdrs_vaddr: number;
  arvRootHashStart: number;
  arvRootHashSize: number;
  arvManifestStart: number;
  arvManifestSize: number;
  bsARVRootHashStart: number;
  bsARVRootHashSize: number;
  bsARVManifestStart: number;
  bsARVManifestSize: number;
  __reserved4: unknown /* const array */;
}

declare class boot_icon_element {
  constructor(init?: boot_icon_element);
  width: number;
  height: number;
  y_offset_from_center: number;
  data_size: number;
  __reserved1: unknown /* const array */;
  data: unknown /* const array */;
}

declare class Boot_Video {
  constructor(init?: Boot_Video);
  v_display: number;
  v_rowBytes: number;
  v_width: number;
  v_height: number;
  v_depth: number;
  v_rotate: number;
  v_resv_byte: unknown /* const array */;
  v_resv: unknown /* const array */;
  v_baseAddr: number;
}

declare class Boot_VideoV1 {
  constructor(init?: Boot_VideoV1);
  v_baseAddr: number;
  v_display: number;
  v_rowBytes: number;
  v_width: number;
  v_height: number;
  v_depth: number;
}

declare class specinfo {
  constructor(init?: specinfo);
  si_hashchain: interop.Pointer;
  si_specnext: interop.Pointer;
  si_flags: number;
  si_rdev: number;
  si_opencount: number;
  si_size: number;
  si_lastr: number;
  si_devsize: number;
  si_initted: number;
  si_throttleable: number;
  si_isssd: number;
  si_devbsdunit: number;
  si_throttle_mask: number;
  si_mountingowner: number;
}

declare class pal_hib_ctx {
  constructor(init?: pal_hib_ctx);
}

declare class static_if_key_false {
  constructor(init?: static_if_key_false);
  key: static_if_key;
}

declare class static_if_key_true {
  constructor(init?: static_if_key_true);
  key: static_if_key;
}

declare class __Reply__lockd_ping_t {
  constructor(init?: __Reply__lockd_ping_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class __Reply__lockd_request_t {
  constructor(init?: __Reply__lockd_request_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class __Request__lockd_shutdown_t {
  constructor(init?: __Request__lockd_shutdown_t);
  Head: mach_msg_header_t;
}

declare class __Request__lockd_ping_t {
  constructor(init?: __Request__lockd_ping_t);
  Head: mach_msg_header_t;
}

declare class kd_threadmap {
  constructor(init?: kd_threadmap);
  thread: number;
  valid: number;
  command: unknown /* const array */;
}

declare class kd_regtype {
  constructor(init?: kd_regtype);
  type: number;
  value1: number;
  value2: number;
  value3: number;
  value4: number;
}

declare class kd_cpumap_ext {
  constructor(init?: kd_cpumap_ext);
  cpu_id: number;
  flags: number;
  name: unknown /* const array */;
}

declare class kbufinfo_t {
  constructor(init?: kbufinfo_t);
  nkdbufs: number;
  nolog: number;
  flags: number;
  nkdthreads: number;
  bufid: number;
}

declare class thread {
  constructor(init?: thread);
}

declare class sflt_filter_ext {
  constructor(init?: sflt_filter_ext);
  sf_ext_len: number;
  sf_ext_accept: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number | null;
  sf_ext_rsvd: unknown /* const array */;
}

declare class partinfo {
  constructor(init?: partinfo);
  disklab: interop.Pointer;
  part: interop.Pointer;
}

declare class partition {
  constructor(init?: partition);
  p_size: number;
  p_offset: number;
  p_fsize: number;
  p_fstype: number;
  p_frag: number;
  __partition_u1: unnamed_6650140264646410345;
}

declare class disklabel {
  constructor(init?: disklabel);
  d_magic: number;
  d_type: number;
  d_subtype: number;
  d_typename: unknown /* const array */;
  d_un: unnamed_14374843138598068828;
  d_secsize: number;
  d_nsectors: number;
  d_ntracks: number;
  d_ncylinders: number;
  d_secpercyl: number;
  d_secperunit: number;
  d_sparespertrack: number;
  d_sparespercyl: number;
  d_acylinders: number;
  d_rpm: number;
  d_interleave: number;
  d_trackskew: number;
  d_cylskew: number;
  d_headswitch: number;
  d_trkseek: number;
  d_flags: number;
  d_drivedata: unknown /* const array */;
  d_spare: unknown /* const array */;
  d_magic2: number;
  d_checksum: number;
  d_npartitions: number;
  d_bbsize: number;
  d_sbsize: number;
  d_partitions: partition;
}

declare class unnamed_3271796597595602678 {
  constructor(init?: unnamed_3271796597595602678);
  tqe_next: interop.Pointer;
  tqe_prev: interop.Pointer;
}

declare class timex {
  constructor(init?: timex);
  modes: number;
  offset: number;
  freq: number;
  maxerror: number;
  esterror: number;
  status: number;
  constant: number;
  precision: number;
  tolerance: number;
  ppsfreq: number;
  jitter: number;
  shift: number;
  stabil: number;
  jitcnt: number;
  calcnt: number;
  errcnt: number;
  stbcnt: number;
}

declare class ntptimeval {
  constructor(init?: ntptimeval);
  time: timespec;
  maxerror: number;
  esterror: number;
  tai: number;
  time_state: number;
}

declare class thsc_time_cpi {
  constructor(init?: thsc_time_cpi);
  ttci_instructions: number;
  ttci_cycles: number;
  ttci_user_time_mach: number;
  ttci_system_time_mach: number;
}

declare class thsc_cpi {
  constructor(init?: thsc_cpi);
  tcpi_instructions: number;
  tcpi_cycles: number;
}

declare class mkfifoat_args {
  constructor(init?: mkfifoat_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  mode_l_: unknown /* const array */;
  mode: number;
  mode_r_: unknown /* const array */;
}

declare class map_with_linking_np_args {
  constructor(init?: map_with_linking_np_args);
  regions_l_: unknown /* const array */;
  regions: number;
  regions_r_: unknown /* const array */;
  region_count_l_: unknown /* const array */;
  region_count: number;
  region_count_r_: unknown /* const array */;
  link_info_l_: unknown /* const array */;
  link_info: number;
  link_info_r_: unknown /* const array */;
  link_info_size_l_: unknown /* const array */;
  link_info_size: number;
  link_info_size_r_: unknown /* const array */;
}

declare class debug_syscall_reject_args {
  constructor(init?: debug_syscall_reject_args);
  packed_selectors_l_: unknown /* const array */;
  packed_selectors: number;
  packed_selectors_r_: unknown /* const array */;
}

declare class proc_info_extended_id_args {
  constructor(init?: proc_info_extended_id_args);
  callnum_l_: unknown /* const array */;
  callnum: number;
  callnum_r_: unknown /* const array */;
  pid_l_: unknown /* const array */;
  pid: number;
  pid_r_: unknown /* const array */;
  flavor_l_: unknown /* const array */;
  flavor: number;
  flavor_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
  ext_id_l_: unknown /* const array */;
  ext_id: number;
  ext_id_r_: unknown /* const array */;
  arg_l_: unknown /* const array */;
  arg: number;
  arg_r_: unknown /* const array */;
  buffer_l_: unknown /* const array */;
  buffer: number;
  buffer_r_: unknown /* const array */;
  buffersize_l_: unknown /* const array */;
  buffersize: number;
  buffersize_r_: unknown /* const array */;
}

declare class ulock_wait2_args {
  constructor(init?: ulock_wait2_args);
  operation_l_: unknown /* const array */;
  operation: number;
  operation_r_: unknown /* const array */;
  addr_l_: unknown /* const array */;
  addr: number;
  addr_r_: unknown /* const array */;
  value_l_: unknown /* const array */;
  value: number;
  value_r_: unknown /* const array */;
  timeout_l_: unknown /* const array */;
  timeout: number;
  timeout_r_: unknown /* const array */;
  value2_l_: unknown /* const array */;
  value2: number;
  value2_r_: unknown /* const array */;
}

declare class kd_event_matcher {
  constructor(init?: kd_event_matcher);
  kem_debugid: number;
  kem_padding: number;
  kem_args: unknown /* const array */;
}

declare class pwritev_args {
  constructor(init?: pwritev_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  iovp_l_: unknown /* const array */;
  iovp: number;
  iovp_r_: unknown /* const array */;
  iovcnt_l_: unknown /* const array */;
  iovcnt: number;
  iovcnt_r_: unknown /* const array */;
  offset_l_: unknown /* const array */;
  offset: number;
  offset_r_: unknown /* const array */;
}

declare class setattrlistat_args {
  constructor(init?: setattrlistat_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  alist_l_: unknown /* const array */;
  alist: number;
  alist_r_: unknown /* const array */;
  attributeBuffer_l_: unknown /* const array */;
  attributeBuffer: number;
  attributeBuffer_r_: unknown /* const array */;
  bufferSize_l_: unknown /* const array */;
  bufferSize: number;
  bufferSize_r_: unknown /* const array */;
  options_l_: unknown /* const array */;
  options: number;
  options_r_: unknown /* const array */;
}

declare class terminate_with_payload_args {
  constructor(init?: terminate_with_payload_args);
  pid_l_: unknown /* const array */;
  pid: number;
  pid_r_: unknown /* const array */;
  reason_namespace_l_: unknown /* const array */;
  reason_namespace: number;
  reason_namespace_r_: unknown /* const array */;
  reason_code_l_: unknown /* const array */;
  reason_code: number;
  reason_code_r_: unknown /* const array */;
  payload_l_: unknown /* const array */;
  payload: number;
  payload_r_: unknown /* const array */;
  payload_size_l_: unknown /* const array */;
  payload_size: number;
  payload_size_r_: unknown /* const array */;
  reason_string_l_: unknown /* const array */;
  reason_string: number;
  reason_string_r_: unknown /* const array */;
  reason_flags_l_: unknown /* const array */;
  reason_flags: number;
  reason_flags_r_: unknown /* const array */;
}

declare class ulock_wake_args {
  constructor(init?: ulock_wake_args);
  operation_l_: unknown /* const array */;
  operation: number;
  operation_r_: unknown /* const array */;
  addr_l_: unknown /* const array */;
  addr: number;
  addr_r_: unknown /* const array */;
  wake_value_l_: unknown /* const array */;
  wake_value: number;
  wake_value_r_: unknown /* const array */;
}

declare class getentropy_args {
  constructor(init?: getentropy_args);
  buffer_l_: unknown /* const array */;
  buffer: number;
  buffer_r_: unknown /* const array */;
  size_l_: unknown /* const array */;
  size: number;
  size_r_: unknown /* const array */;
}

declare class work_interval_ctl_args {
  constructor(init?: work_interval_ctl_args);
  operation_l_: unknown /* const array */;
  operation: number;
  operation_r_: unknown /* const array */;
  work_interval_id_l_: unknown /* const array */;
  work_interval_id: number;
  work_interval_id_r_: unknown /* const array */;
  arg_l_: unknown /* const array */;
  arg: number;
  arg_r_: unknown /* const array */;
  len_l_: unknown /* const array */;
  len: number;
  len_r_: unknown /* const array */;
}

declare class mach_eventlink_signal_wait_until_args {
  constructor(init?: mach_eventlink_signal_wait_until_args);
  eventlink_port_l_: unknown /* const array */;
  eventlink_port: number;
  eventlink_port_r_: unknown /* const array */;
  wait_count_l_: unknown /* const array */;
  wait_count: number;
  wait_count_r_: unknown /* const array */;
  signal_count_l_: unknown /* const array */;
  signal_count: number;
  signal_count_r_: unknown /* const array */;
  deadline_l_: unknown /* const array */;
  deadline: number;
  deadline_r_: unknown /* const array */;
  clock_id_l_: unknown /* const array */;
  clock_id: number;
  clock_id_r_: unknown /* const array */;
  option_l_: unknown /* const array */;
  option: number;
  option_r_: unknown /* const array */;
}

declare class mach_eventlink_signal_args {
  constructor(init?: mach_eventlink_signal_args);
  eventlink_port_l_: unknown /* const array */;
  eventlink_port: number;
  eventlink_port_r_: unknown /* const array */;
  signal_count_l_: unknown /* const array */;
  signal_count: number;
  signal_count_r_: unknown /* const array */;
}

declare class guarded_open_dprotected_np_args {
  constructor(init?: guarded_open_dprotected_np_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  guard_l_: unknown /* const array */;
  guard: number;
  guard_r_: unknown /* const array */;
  guardflags_l_: unknown /* const array */;
  guardflags: number;
  guardflags_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
  dpclass_l_: unknown /* const array */;
  dpclass: number;
  dpclass_r_: unknown /* const array */;
  dpflags_l_: unknown /* const array */;
  dpflags: number;
  dpflags_r_: unknown /* const array */;
  mode_l_: unknown /* const array */;
  mode: number;
  mode_r_: unknown /* const array */;
}

declare class openbyid_np_args {
  constructor(init?: openbyid_np_args);
  fsid_l_: unknown /* const array */;
  fsid: number;
  fsid_r_: unknown /* const array */;
  objid_l_: unknown /* const array */;
  objid: number;
  objid_r_: unknown /* const array */;
  oflags_l_: unknown /* const array */;
  oflags: number;
  oflags_r_: unknown /* const array */;
}

declare class bsdthread_ctl_args {
  constructor(init?: bsdthread_ctl_args);
  cmd_l_: unknown /* const array */;
  cmd: number;
  cmd_r_: unknown /* const array */;
  arg1_l_: unknown /* const array */;
  arg1: number;
  arg1_r_: unknown /* const array */;
  arg2_l_: unknown /* const array */;
  arg2: number;
  arg2_r_: unknown /* const array */;
  arg3_l_: unknown /* const array */;
  arg3: number;
  arg3_r_: unknown /* const array */;
}

declare class proc_trace_log_args {
  constructor(init?: proc_trace_log_args);
  pid_l_: unknown /* const array */;
  pid: number;
  pid_r_: unknown /* const array */;
  uniqueid_l_: unknown /* const array */;
  uniqueid: number;
  uniqueid_r_: unknown /* const array */;
}

declare class symlinkat_args {
  constructor(init?: symlinkat_args);
  path1_l_: unknown /* const array */;
  path1: number;
  path1_r_: unknown /* const array */;
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  path2_l_: unknown /* const array */;
  path2: number;
  path2_r_: unknown /* const array */;
}

declare class readlinkat_args {
  constructor(init?: readlinkat_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  buf_l_: unknown /* const array */;
  buf: number;
  buf_r_: unknown /* const array */;
  bufsize_l_: unknown /* const array */;
  bufsize: number;
  bufsize_r_: unknown /* const array */;
}

declare class fstatat64_args {
  constructor(init?: fstatat64_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  ub_l_: unknown /* const array */;
  ub: number;
  ub_r_: unknown /* const array */;
  flag_l_: unknown /* const array */;
  flag: number;
  flag_r_: unknown /* const array */;
}

declare class fstatat_args {
  constructor(init?: fstatat_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  ub_l_: unknown /* const array */;
  ub: number;
  ub_r_: unknown /* const array */;
  flag_l_: unknown /* const array */;
  flag: number;
  flag_r_: unknown /* const array */;
}

declare class renameat_args {
  constructor(init?: renameat_args);
  fromfd_l_: unknown /* const array */;
  fromfd: number;
  fromfd_r_: unknown /* const array */;
  from_l_: unknown /* const array */;
  from: number;
  from_r_: unknown /* const array */;
  tofd_l_: unknown /* const array */;
  tofd: number;
  tofd_r_: unknown /* const array */;
  to_l_: unknown /* const array */;
  to: number;
  to_r_: unknown /* const array */;
}

declare class openat_nocancel_args {
  constructor(init?: openat_nocancel_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
  mode_l_: unknown /* const array */;
  mode: number;
  mode_r_: unknown /* const array */;
}

declare class clonefileat_args {
  constructor(init?: clonefileat_args);
  src_dirfd_l_: unknown /* const array */;
  src_dirfd: number;
  src_dirfd_r_: unknown /* const array */;
  src_l_: unknown /* const array */;
  src: number;
  src_r_: unknown /* const array */;
  dst_dirfd_l_: unknown /* const array */;
  dst_dirfd: number;
  dst_dirfd_r_: unknown /* const array */;
  dst_l_: unknown /* const array */;
  dst: number;
  dst_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
}

declare class getattrlistbulk_args {
  constructor(init?: getattrlistbulk_args);
  dirfd_l_: unknown /* const array */;
  dirfd: number;
  dirfd_r_: unknown /* const array */;
  alist_l_: unknown /* const array */;
  alist: number;
  alist_r_: unknown /* const array */;
  attributeBuffer_l_: unknown /* const array */;
  attributeBuffer: number;
  attributeBuffer_r_: unknown /* const array */;
  bufferSize_l_: unknown /* const array */;
  bufferSize: number;
  bufferSize_r_: unknown /* const array */;
  options_l_: unknown /* const array */;
  options: number;
  options_r_: unknown /* const array */;
}

declare class sfi_ctl_args {
  constructor(init?: sfi_ctl_args);
  operation_l_: unknown /* const array */;
  operation: number;
  operation_r_: unknown /* const array */;
  sfi_class_l_: unknown /* const array */;
  sfi_class: number;
  sfi_class_r_: unknown /* const array */;
  time_l_: unknown /* const array */;
  time: number;
  time_r_: unknown /* const array */;
  out_time_l_: unknown /* const array */;
  out_time: number;
  out_time_r_: unknown /* const array */;
}

declare class telemetry_args {
  constructor(init?: telemetry_args);
  cmd_l_: unknown /* const array */;
  cmd: number;
  cmd_r_: unknown /* const array */;
  deadline_l_: unknown /* const array */;
  deadline: number;
  deadline_r_: unknown /* const array */;
  interval_l_: unknown /* const array */;
  interval: number;
  interval_r_: unknown /* const array */;
  leeway_l_: unknown /* const array */;
  leeway: number;
  leeway_r_: unknown /* const array */;
  arg4_l_: unknown /* const array */;
  arg4: number;
  arg4_r_: unknown /* const array */;
  arg5_l_: unknown /* const array */;
  arg5: number;
  arg5_r_: unknown /* const array */;
}

declare class guarded_close_np_args {
  constructor(init?: guarded_close_np_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  guard_l_: unknown /* const array */;
  guard: number;
  guard_r_: unknown /* const array */;
}

declare class guarded_open_np_args {
  constructor(init?: guarded_open_np_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  guard_l_: unknown /* const array */;
  guard: number;
  guard_r_: unknown /* const array */;
  guardflags_l_: unknown /* const array */;
  guardflags: number;
  guardflags_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
  mode_l_: unknown /* const array */;
  mode: number;
  mode_r_: unknown /* const array */;
}

declare class kas_info_args {
  constructor(init?: kas_info_args);
  selector_l_: unknown /* const array */;
  selector: number;
  selector_r_: unknown /* const array */;
  value_l_: unknown /* const array */;
  value: number;
  value_r_: unknown /* const array */;
  size_l_: unknown /* const array */;
  size: number;
  size_r_: unknown /* const array */;
}

declare class pid_suspend_args {
  constructor(init?: pid_suspend_args);
  pid_l_: unknown /* const array */;
  pid: number;
  pid_r_: unknown /* const array */;
}

declare class fileport_makefd_args {
  constructor(init?: fileport_makefd_args);
  port_l_: unknown /* const array */;
  port: number;
  port_r_: unknown /* const array */;
}

declare class audit_session_join_args {
  constructor(init?: audit_session_join_args);
  port_l_: unknown /* const array */;
  port: number;
  port_r_: unknown /* const array */;
}

declare class fsgetpath_args {
  constructor(init?: fsgetpath_args);
  buf_l_: unknown /* const array */;
  buf: number;
  buf_r_: unknown /* const array */;
  bufsize_l_: unknown /* const array */;
  bufsize: number;
  bufsize_r_: unknown /* const array */;
  fsid_l_: unknown /* const array */;
  fsid: number;
  fsid_r_: unknown /* const array */;
  objid_l_: unknown /* const array */;
  objid: number;
  objid_r_: unknown /* const array */;
}

declare class __mac_mount_args {
  constructor(init?: __mac_mount_args);
  type_l_: unknown /* const array */;
  type: number;
  type_r_: unknown /* const array */;
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
  data_l_: unknown /* const array */;
  data: number;
  data_r_: unknown /* const array */;
  mac_p_l_: unknown /* const array */;
  mac_p: number;
  mac_p_r_: unknown /* const array */;
}

declare class __sigwait_nocancel_args {
  constructor(init?: __sigwait_nocancel_args);
  set_l_: unknown /* const array */;
  set: number;
  set_r_: unknown /* const array */;
  sig_l_: unknown /* const array */;
  sig: number;
  sig_r_: unknown /* const array */;
}

declare class aio_suspend_nocancel_args {
  constructor(init?: aio_suspend_nocancel_args);
  aiocblist_l_: unknown /* const array */;
  aiocblist: number;
  aiocblist_r_: unknown /* const array */;
  nent_l_: unknown /* const array */;
  nent: number;
  nent_r_: unknown /* const array */;
  timeoutp_l_: unknown /* const array */;
  timeoutp: number;
  timeoutp_r_: unknown /* const array */;
}

declare class sem_wait_nocancel_args {
  constructor(init?: sem_wait_nocancel_args);
  sem_l_: unknown /* const array */;
  sem: number;
  sem_r_: unknown /* const array */;
}

declare class poll_nocancel_args {
  constructor(init?: poll_nocancel_args);
  fds_l_: unknown /* const array */;
  fds: number;
  fds_r_: unknown /* const array */;
  nfds_l_: unknown /* const array */;
  nfds: number;
  nfds_r_: unknown /* const array */;
  timeout_l_: unknown /* const array */;
  timeout: number;
  timeout_r_: unknown /* const array */;
}

declare class fsync_nocancel_args {
  constructor(init?: fsync_nocancel_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
}

declare class fcntl_nocancel_args {
  constructor(init?: fcntl_nocancel_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  cmd_l_: unknown /* const array */;
  cmd: number;
  cmd_r_: unknown /* const array */;
  arg_l_: unknown /* const array */;
  arg: number;
  arg_r_: unknown /* const array */;
}

declare class msync_nocancel_args {
  constructor(init?: msync_nocancel_args);
  addr_l_: unknown /* const array */;
  addr: number;
  addr_r_: number;
  len_l_: unknown /* const array */;
  len: number;
  len_r_: number;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
}

declare class wait4_nocancel_args {
  constructor(init?: wait4_nocancel_args);
  pid_l_: unknown /* const array */;
  pid: number;
  pid_r_: unknown /* const array */;
  status_l_: unknown /* const array */;
  status: number;
  status_r_: unknown /* const array */;
  options_l_: unknown /* const array */;
  options: number;
  options_r_: unknown /* const array */;
  rusage_l_: unknown /* const array */;
  rusage: number;
  rusage_r_: unknown /* const array */;
}

declare class close_nocancel_args {
  constructor(init?: close_nocancel_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
}

declare class open_nocancel_args {
  constructor(init?: open_nocancel_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
  mode_l_: unknown /* const array */;
  mode: number;
  mode_r_: unknown /* const array */;
}

declare class read_nocancel_args {
  constructor(init?: read_nocancel_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  cbuf_l_: unknown /* const array */;
  cbuf: number;
  cbuf_r_: unknown /* const array */;
  nbyte_l_: unknown /* const array */;
  nbyte: number;
  nbyte_r_: unknown /* const array */;
}

declare class pselect_nocancel_args {
  constructor(init?: pselect_nocancel_args);
  nd_l_: unknown /* const array */;
  nd: number;
  nd_r_: unknown /* const array */;
  in_l_: unknown /* const array */;
  in: number;
  in_r_: unknown /* const array */;
  ou_l_: unknown /* const array */;
  ou: number;
  ou_r_: unknown /* const array */;
  ex_l_: unknown /* const array */;
  ex: number;
  ex_r_: unknown /* const array */;
  ts_l_: unknown /* const array */;
  ts: number;
  ts_r_: unknown /* const array */;
  mask_l_: unknown /* const array */;
  mask: number;
  mask_r_: unknown /* const array */;
}

declare class ledger_args {
  constructor(init?: ledger_args);
  cmd_l_: unknown /* const array */;
  cmd: number;
  cmd_r_: unknown /* const array */;
  arg1_l_: unknown /* const array */;
  arg1: number;
  arg1_r_: unknown /* const array */;
  arg2_l_: unknown /* const array */;
  arg2: number;
  arg2_r_: unknown /* const array */;
  arg3_l_: unknown /* const array */;
  arg3: number;
  arg3_r_: unknown /* const array */;
}

declare class lchown_args {
  constructor(init?: lchown_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  owner_l_: unknown /* const array */;
  owner: number;
  owner_r_: unknown /* const array */;
  group_l_: unknown /* const array */;
  group: number;
  group_r_: unknown /* const array */;
}

declare class auditctl_args {
  constructor(init?: auditctl_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
}

declare class getauid_args {
  constructor(init?: getauid_args);
  auid_l_: unknown /* const array */;
  auid: number;
  auid_r_: unknown /* const array */;
}

declare class auditon_args {
  constructor(init?: auditon_args);
  cmd_l_: unknown /* const array */;
  cmd: number;
  cmd_r_: unknown /* const array */;
  data_l_: unknown /* const array */;
  data: number;
  data_r_: unknown /* const array */;
  length_l_: unknown /* const array */;
  length: number;
  length_r_: unknown /* const array */;
}

declare class statfs64_args {
  constructor(init?: statfs64_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  buf_l_: unknown /* const array */;
  buf: number;
  buf_r_: unknown /* const array */;
}

declare class stat64_extended_args {
  constructor(init?: stat64_extended_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  ub_l_: unknown /* const array */;
  ub: number;
  ub_r_: unknown /* const array */;
  xsecurity_l_: unknown /* const array */;
  xsecurity: number;
  xsecurity_r_: unknown /* const array */;
  xsecurity_size_l_: unknown /* const array */;
  xsecurity_size: number;
  xsecurity_size_r_: unknown /* const array */;
}

declare class lstat64_args {
  constructor(init?: lstat64_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  ub_l_: unknown /* const array */;
  ub: number;
  ub_r_: unknown /* const array */;
}

declare class fstat64_args {
  constructor(init?: fstat64_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  ub_l_: unknown /* const array */;
  ub: number;
  ub_r_: unknown /* const array */;
}

declare class stat64_args {
  constructor(init?: stat64_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  ub_l_: unknown /* const array */;
  ub: number;
  ub_r_: unknown /* const array */;
}

declare class proc_info_args {
  constructor(init?: proc_info_args);
  callnum_l_: unknown /* const array */;
  callnum: number;
  callnum_r_: unknown /* const array */;
  pid_l_: unknown /* const array */;
  pid: number;
  pid_r_: unknown /* const array */;
  flavor_l_: unknown /* const array */;
  flavor: number;
  flavor_r_: unknown /* const array */;
  arg_l_: unknown /* const array */;
  arg: number;
  arg_r_: unknown /* const array */;
  buffer_l_: unknown /* const array */;
  buffer: number;
  buffer_r_: unknown /* const array */;
  buffersize_l_: unknown /* const array */;
  buffersize: number;
  buffersize_r_: unknown /* const array */;
}

declare class __sigwait_args {
  constructor(init?: __sigwait_args);
  set_l_: unknown /* const array */;
  set: number;
  set_r_: unknown /* const array */;
  sig_l_: unknown /* const array */;
  sig: number;
  sig_r_: unknown /* const array */;
}

declare class munlockall_args {
  constructor(init?: munlockall_args);
  how_l_: unknown /* const array */;
  how: number;
  how_r_: unknown /* const array */;
}

declare class mlockall_args {
  constructor(init?: mlockall_args);
  how_l_: unknown /* const array */;
  how: number;
  how_r_: unknown /* const array */;
}

declare class aio_write_args {
  constructor(init?: aio_write_args);
  aiocbp_l_: unknown /* const array */;
  aiocbp: number;
  aiocbp_r_: unknown /* const array */;
}

declare class aio_suspend_args {
  constructor(init?: aio_suspend_args);
  aiocblist_l_: unknown /* const array */;
  aiocblist: number;
  aiocblist_r_: unknown /* const array */;
  nent_l_: unknown /* const array */;
  nent: number;
  nent_r_: unknown /* const array */;
  timeoutp_l_: unknown /* const array */;
  timeoutp: number;
  timeoutp_r_: unknown /* const array */;
}

declare class aio_fsync_args {
  constructor(init?: aio_fsync_args);
  op_l_: unknown /* const array */;
  op: number;
  op_r_: unknown /* const array */;
  aiocbp_l_: unknown /* const array */;
  aiocbp: number;
  aiocbp_r_: unknown /* const array */;
}

declare class settid_with_pid_args {
  constructor(init?: settid_with_pid_args);
  pid_l_: unknown /* const array */;
  pid: number;
  pid_r_: unknown /* const array */;
  assume_l_: unknown /* const array */;
  assume: number;
  assume_r_: unknown /* const array */;
}

declare class shared_region_check_np_args {
  constructor(init?: shared_region_check_np_args);
  start_address_l_: unknown /* const array */;
  start_address: number;
  start_address_r_: unknown /* const array */;
}

declare class mkdir_extended_args {
  constructor(init?: mkdir_extended_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  uid_l_: unknown /* const array */;
  uid: number;
  uid_r_: unknown /* const array */;
  gid_l_: unknown /* const array */;
  gid: number;
  gid_r_: unknown /* const array */;
  mode_l_: unknown /* const array */;
  mode: number;
  mode_r_: unknown /* const array */;
  xsecurity_l_: unknown /* const array */;
  xsecurity: number;
  xsecurity_r_: unknown /* const array */;
}

declare class mkfifo_extended_args {
  constructor(init?: mkfifo_extended_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  uid_l_: unknown /* const array */;
  uid: number;
  uid_r_: unknown /* const array */;
  gid_l_: unknown /* const array */;
  gid: number;
  gid_r_: unknown /* const array */;
  mode_l_: unknown /* const array */;
  mode: number;
  mode_r_: unknown /* const array */;
  xsecurity_l_: unknown /* const array */;
  xsecurity: number;
  xsecurity_r_: unknown /* const array */;
}

declare class setsgroups_args {
  constructor(init?: setsgroups_args);
  setlen_l_: unknown /* const array */;
  setlen: number;
  setlen_r_: unknown /* const array */;
  guidset_l_: unknown /* const array */;
  guidset: number;
  guidset_r_: unknown /* const array */;
}

declare class gettid_args {
  constructor(init?: gettid_args);
  uidp_l_: unknown /* const array */;
  uidp: number;
  uidp_r_: unknown /* const array */;
  gidp_l_: unknown /* const array */;
  gidp: number;
  gidp_r_: unknown /* const array */;
}

declare class fchmod_extended_args {
  constructor(init?: fchmod_extended_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  uid_l_: unknown /* const array */;
  uid: number;
  uid_r_: unknown /* const array */;
  gid_l_: unknown /* const array */;
  gid: number;
  gid_r_: unknown /* const array */;
  mode_l_: unknown /* const array */;
  mode: number;
  mode_r_: unknown /* const array */;
  xsecurity_l_: unknown /* const array */;
  xsecurity: number;
  xsecurity_r_: unknown /* const array */;
}

declare class fstat_extended_args {
  constructor(init?: fstat_extended_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  ub_l_: unknown /* const array */;
  ub: number;
  ub_r_: unknown /* const array */;
  xsecurity_l_: unknown /* const array */;
  xsecurity: number;
  xsecurity_r_: unknown /* const array */;
  xsecurity_size_l_: unknown /* const array */;
  xsecurity_size: number;
  xsecurity_size_r_: unknown /* const array */;
}

declare class stat_extended_args {
  constructor(init?: stat_extended_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  ub_l_: unknown /* const array */;
  ub: number;
  ub_r_: unknown /* const array */;
  xsecurity_l_: unknown /* const array */;
  xsecurity: number;
  xsecurity_r_: unknown /* const array */;
  xsecurity_size_l_: unknown /* const array */;
  xsecurity_size: number;
  xsecurity_size_r_: unknown /* const array */;
}

declare class umask_extended_args {
  constructor(init?: umask_extended_args);
  newmask_l_: unknown /* const array */;
  newmask: number;
  newmask_r_: unknown /* const array */;
  xsecurity_l_: unknown /* const array */;
  xsecurity: number;
  xsecurity_r_: unknown /* const array */;
}

declare class sysctlbyname_args {
  constructor(init?: sysctlbyname_args);
  name_l_: unknown /* const array */;
  name: number;
  name_r_: unknown /* const array */;
  namelen_l_: unknown /* const array */;
  namelen: number;
  namelen_r_: unknown /* const array */;
  old_l_: unknown /* const array */;
  old: number;
  old_r_: unknown /* const array */;
  oldlenp_l_: unknown /* const array */;
  oldlenp: number;
  oldlenp_r_: unknown /* const array */;
  new_l_: unknown /* const array */;
  new: number;
  new_r_: unknown /* const array */;
  newlen_l_: unknown /* const array */;
  newlen: number;
  newlen_r_: unknown /* const array */;
}

declare class sem_trywait_args {
  constructor(init?: sem_trywait_args);
  sem_l_: unknown /* const array */;
  sem: number;
  sem_r_: unknown /* const array */;
}

declare class sem_unlink_args {
  constructor(init?: sem_unlink_args);
  name_l_: unknown /* const array */;
  name: number;
  name_r_: unknown /* const array */;
}

declare class minherit_args {
  constructor(init?: minherit_args);
  addr_l_: unknown /* const array */;
  addr: number;
  addr_r_: number;
  len_l_: unknown /* const array */;
  len: number;
  len_r_: number;
  inherit_l_: unknown /* const array */;
  inherit: number;
  inherit_r_: unknown /* const array */;
}

declare class initgroups_args {
  constructor(init?: initgroups_args);
  gidsetsize_l_: unknown /* const array */;
  gidsetsize: number;
  gidsetsize_r_: unknown /* const array */;
  gidset_l_: unknown /* const array */;
  gidset: number;
  gidset_r_: unknown /* const array */;
  gmuid_l_: unknown /* const array */;
  gmuid: number;
  gmuid_r_: unknown /* const array */;
}

declare class listxattr_args {
  constructor(init?: listxattr_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  namebuf_l_: unknown /* const array */;
  namebuf: number;
  namebuf_r_: unknown /* const array */;
  bufsize_l_: unknown /* const array */;
  bufsize: number;
  bufsize_r_: unknown /* const array */;
  options_l_: unknown /* const array */;
  options: number;
  options_r_: unknown /* const array */;
}

declare class fgetxattr_args {
  constructor(init?: fgetxattr_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  attrname_l_: unknown /* const array */;
  attrname: number;
  attrname_r_: unknown /* const array */;
  value_l_: unknown /* const array */;
  value: number;
  value_r_: unknown /* const array */;
  size_l_: unknown /* const array */;
  size: number;
  size_r_: unknown /* const array */;
  position_l_: unknown /* const array */;
  position: number;
  position_r_: unknown /* const array */;
  options_l_: unknown /* const array */;
  options: number;
  options_r_: unknown /* const array */;
}

declare class fgetattrlist_args {
  constructor(init?: fgetattrlist_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  alist_l_: unknown /* const array */;
  alist: number;
  alist_r_: unknown /* const array */;
  attributeBuffer_l_: unknown /* const array */;
  attributeBuffer: number;
  attributeBuffer_r_: unknown /* const array */;
  bufferSize_l_: unknown /* const array */;
  bufferSize: number;
  bufferSize_r_: unknown /* const array */;
  options_l_: unknown /* const array */;
  options: number;
  options_r_: unknown /* const array */;
}

declare class delete_args {
  constructor(init?: delete_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
}

declare class exchangedata_args {
  constructor(init?: exchangedata_args);
  path1_l_: unknown /* const array */;
  path1: number;
  path1_r_: unknown /* const array */;
  path2_l_: unknown /* const array */;
  path2: number;
  path2_r_: unknown /* const array */;
  options_l_: unknown /* const array */;
  options: number;
  options_r_: unknown /* const array */;
}

declare class getattrlist_args {
  constructor(init?: getattrlist_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  alist_l_: unknown /* const array */;
  alist: number;
  alist_r_: unknown /* const array */;
  attributeBuffer_l_: unknown /* const array */;
  attributeBuffer: number;
  attributeBuffer_r_: unknown /* const array */;
  bufferSize_l_: unknown /* const array */;
  bufferSize: number;
  bufferSize_r_: unknown /* const array */;
  options_l_: unknown /* const array */;
  options: number;
  options_r_: unknown /* const array */;
}

declare class openat_dprotected_np_args {
  constructor(init?: openat_dprotected_np_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
  class_l_: unknown /* const array */;
  class: number;
  class_r_: unknown /* const array */;
  dpflags_l_: unknown /* const array */;
  dpflags: number;
  dpflags_r_: unknown /* const array */;
  mode_l_: unknown /* const array */;
  mode: number;
  mode_r_: unknown /* const array */;
  authfd_l_: unknown /* const array */;
  authfd: number;
  authfd_r_: unknown /* const array */;
}

declare class open_dprotected_np_args {
  constructor(init?: open_dprotected_np_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
  class_l_: unknown /* const array */;
  class: number;
  class_r_: unknown /* const array */;
  dpflags_l_: unknown /* const array */;
  dpflags: number;
  dpflags_r_: unknown /* const array */;
  mode_l_: unknown /* const array */;
  mode: number;
  mode_r_: unknown /* const array */;
}

declare class mlock_args {
  constructor(init?: mlock_args);
  addr_l_: unknown /* const array */;
  addr: number;
  addr_r_: number;
  len_l_: unknown /* const array */;
  len: number;
  len_r_: number;
}

declare class sysctl_args {
  constructor(init?: sysctl_args);
  name_l_: unknown /* const array */;
  name: number;
  name_r_: unknown /* const array */;
  namelen_l_: unknown /* const array */;
  namelen: number;
  namelen_r_: unknown /* const array */;
  old_l_: unknown /* const array */;
  old: number;
  old_r_: unknown /* const array */;
  oldlenp_l_: unknown /* const array */;
  oldlenp: number;
  oldlenp_r_: unknown /* const array */;
  new_l_: unknown /* const array */;
  new: number;
  new_r_: unknown /* const array */;
  newlen_l_: unknown /* const array */;
  newlen: number;
  newlen_r_: unknown /* const array */;
}

declare class ftruncate_args {
  constructor(init?: ftruncate_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  length_l_: unknown /* const array */;
  length: number;
  length_r_: unknown /* const array */;
}

declare class truncate_args {
  constructor(init?: truncate_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  length_l_: unknown /* const array */;
  length: number;
  length_r_: unknown /* const array */;
}

declare class mmap_args {
  constructor(init?: mmap_args);
  addr_l_: unknown /* const array */;
  addr: number;
  addr_r_: number;
  len_l_: unknown /* const array */;
  len: number;
  len_r_: number;
  prot_l_: unknown /* const array */;
  prot: number;
  prot_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  pos_l_: unknown /* const array */;
  pos: number;
  pos_r_: unknown /* const array */;
}

declare class getdirentries_args {
  constructor(init?: getdirentries_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  buf_l_: unknown /* const array */;
  buf: number;
  buf_r_: unknown /* const array */;
  count_l_: unknown /* const array */;
  count: number;
  count_r_: unknown /* const array */;
  basep_l_: unknown /* const array */;
  basep: number;
  basep_r_: unknown /* const array */;
}

declare class pathconf_args {
  constructor(init?: pathconf_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  name_l_: unknown /* const array */;
  name: number;
  name_r_: unknown /* const array */;
}

declare class lstat_args {
  constructor(init?: lstat_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  ub_l_: unknown /* const array */;
  ub: number;
  ub_r_: unknown /* const array */;
}

declare class fstat_args {
  constructor(init?: fstat_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  ub_l_: unknown /* const array */;
  ub: number;
  ub_r_: unknown /* const array */;
}

declare class stat_args {
  constructor(init?: stat_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  ub_l_: unknown /* const array */;
  ub: number;
  ub_r_: unknown /* const array */;
}

declare class panic_with_data_args {
  constructor(init?: panic_with_data_args);
  uuid_l_: unknown /* const array */;
  uuid: number;
  uuid_r_: unknown /* const array */;
  addr_l_: unknown /* const array */;
  addr: number;
  addr_r_: unknown /* const array */;
  len_l_: unknown /* const array */;
  len: number;
  len_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
  msg_l_: unknown /* const array */;
  msg: number;
  msg_r_: unknown /* const array */;
}

declare class csops_audittoken_args {
  constructor(init?: csops_audittoken_args);
  pid_l_: unknown /* const array */;
  pid: number;
  pid_r_: unknown /* const array */;
  ops_l_: unknown /* const array */;
  ops: number;
  ops_r_: unknown /* const array */;
  useraddr_l_: unknown /* const array */;
  useraddr: number;
  useraddr_r_: unknown /* const array */;
  usersize_l_: unknown /* const array */;
  usersize: number;
  usersize_r_: unknown /* const array */;
  uaudittoken_l_: unknown /* const array */;
  uaudittoken: number;
  uaudittoken_r_: unknown /* const array */;
}

declare class unmount_args {
  constructor(init?: unmount_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
}

declare class fstatfs_args {
  constructor(init?: fstatfs_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  buf_l_: unknown /* const array */;
  buf: number;
  buf_r_: unknown /* const array */;
}

declare class statfs_args {
  constructor(init?: statfs_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  buf_l_: unknown /* const array */;
  buf: number;
  buf_r_: unknown /* const array */;
}

declare class pread_args {
  constructor(init?: pread_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  buf_l_: unknown /* const array */;
  buf: number;
  buf_r_: unknown /* const array */;
  nbyte_l_: unknown /* const array */;
  nbyte: number;
  nbyte_r_: unknown /* const array */;
  offset_l_: unknown /* const array */;
  offset: number;
  offset_r_: unknown /* const array */;
}

declare class setsid_args {
  constructor(init?: setsid_args);
  dummy: number;
}

declare class gethostuuid_args {
  constructor(init?: gethostuuid_args);
  uuid_buf_l_: unknown /* const array */;
  uuid_buf: number;
  uuid_buf_r_: unknown /* const array */;
  timeoutp_l_: unknown /* const array */;
  timeoutp: number;
  timeoutp_r_: unknown /* const array */;
}

declare class adjtime_args {
  constructor(init?: adjtime_args);
  delta_l_: unknown /* const array */;
  delta: number;
  delta_r_: unknown /* const array */;
  olddelta_l_: unknown /* const array */;
  olddelta: number;
  olddelta_r_: unknown /* const array */;
}

declare class mkdir_args {
  constructor(init?: mkdir_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  mode_l_: unknown /* const array */;
  mode: number;
  mode_r_: unknown /* const array */;
}

declare class rename_args {
  constructor(init?: rename_args);
  from_l_: unknown /* const array */;
  from: number;
  from_r_: unknown /* const array */;
  to_l_: unknown /* const array */;
  to: number;
  to_r_: unknown /* const array */;
}

declare class setreuid_args {
  constructor(init?: setreuid_args);
  ruid_l_: unknown /* const array */;
  ruid: number;
  ruid_r_: unknown /* const array */;
  euid_l_: unknown /* const array */;
  euid: number;
  euid_r_: unknown /* const array */;
}

declare class fchmod_args {
  constructor(init?: fchmod_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  mode_l_: unknown /* const array */;
  mode: number;
  mode_r_: unknown /* const array */;
}

declare class settimeofday_args {
  constructor(init?: settimeofday_args);
  tv_l_: unknown /* const array */;
  tv: number;
  tv_r_: unknown /* const array */;
  tzp_l_: unknown /* const array */;
  tzp: number;
  tzp_r_: unknown /* const array */;
}

declare class readv_args {
  constructor(init?: readv_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  iovp_l_: unknown /* const array */;
  iovp: number;
  iovp_r_: unknown /* const array */;
  iovcnt_l_: unknown /* const array */;
  iovcnt: number;
  iovcnt_r_: unknown /* const array */;
}

declare class setpriority_args {
  constructor(init?: setpriority_args);
  which_l_: unknown /* const array */;
  which: number;
  which_r_: unknown /* const array */;
  who_l_: unknown /* const array */;
  who: number;
  who_r_: unknown /* const array */;
  prio_l_: unknown /* const array */;
  prio: number;
  prio_r_: unknown /* const array */;
}

declare class fcntl_args {
  constructor(init?: fcntl_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  cmd_l_: unknown /* const array */;
  cmd: number;
  cmd_r_: unknown /* const array */;
  arg_l_: unknown /* const array */;
  arg: number;
  arg_r_: unknown /* const array */;
}

declare class dup2_args {
  constructor(init?: dup2_args);
  from_l_: unknown /* const array */;
  from: number;
  from_r_: unknown /* const array */;
  to_l_: unknown /* const array */;
  to: number;
  to_r_: unknown /* const array */;
}

declare class getitimer_args {
  constructor(init?: getitimer_args);
  which_l_: unknown /* const array */;
  which: number;
  which_r_: unknown /* const array */;
  itv_l_: unknown /* const array */;
  itv: number;
  itv_r_: unknown /* const array */;
}

declare class setpgid_args {
  constructor(init?: setpgid_args);
  pid_l_: unknown /* const array */;
  pid: number;
  pid_r_: unknown /* const array */;
  pgid_l_: unknown /* const array */;
  pgid: number;
  pgid_r_: unknown /* const array */;
}

declare class getpgrp_args {
  constructor(init?: getpgrp_args);
  dummy: number;
}

declare class mprotect_args {
  constructor(init?: mprotect_args);
  addr_l_: unknown /* const array */;
  addr: number;
  addr_r_: number;
  len_l_: unknown /* const array */;
  len: number;
  len_r_: number;
  prot_l_: unknown /* const array */;
  prot: number;
  prot_r_: unknown /* const array */;
}

declare class munmap_args {
  constructor(init?: munmap_args);
  addr_l_: unknown /* const array */;
  addr: number;
  addr_r_: number;
  len_l_: unknown /* const array */;
  len: number;
  len_r_: number;
}

declare class msync_args {
  constructor(init?: msync_args);
  addr_l_: unknown /* const array */;
  addr: number;
  addr_r_: number;
  len_l_: unknown /* const array */;
  len: number;
  len_r_: number;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
}

declare class chroot_args {
  constructor(init?: chroot_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
}

declare class execve_args {
  constructor(init?: execve_args);
  fname_l_: unknown /* const array */;
  fname: number;
  fname_r_: unknown /* const array */;
  argp_l_: unknown /* const array */;
  argp: number;
  argp_r_: unknown /* const array */;
  envp_l_: unknown /* const array */;
  envp: number;
  envp_r_: unknown /* const array */;
}

declare class ioctl_args {
  constructor(init?: ioctl_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  com_l_: unknown /* const array */;
  com: number;
  com_r_: unknown /* const array */;
  data_l_: unknown /* const array */;
  data: number;
  data_r_: unknown /* const array */;
}

declare class __Request__vfs_resolve_dir_t {
  constructor(init?: __Request__vfs_resolve_dir_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  req_id: number;
  pid: number;
  op: number;
  file_name: unknown /* const array */;
  path: unknown /* const array */;
}

declare class sigaltstack_args {
  constructor(init?: sigaltstack_args);
  nss_l_: unknown /* const array */;
  nss: number;
  nss_r_: unknown /* const array */;
  oss_l_: unknown /* const array */;
  oss: number;
  oss_r_: unknown /* const array */;
}

declare class sigpending_args {
  constructor(init?: sigpending_args);
  osv_l_: unknown /* const array */;
  osv: number;
  osv_r_: unknown /* const array */;
}

declare class setauid_args {
  constructor(init?: setauid_args);
  auid_l_: unknown /* const array */;
  auid: number;
  auid_r_: unknown /* const array */;
}

declare class sigaction_args {
  constructor(init?: sigaction_args);
  signum_l_: unknown /* const array */;
  signum: number;
  signum_r_: unknown /* const array */;
  nsa_l_: unknown /* const array */;
  nsa: number;
  nsa_r_: unknown /* const array */;
  osa_l_: unknown /* const array */;
  osa: number;
  osa_r_: unknown /* const array */;
}

declare class getppid_args {
  constructor(init?: getppid_args);
  dummy: number;
}

declare class thread_selfcounts_args {
  constructor(init?: thread_selfcounts_args);
  kind_l_: unknown /* const array */;
  kind: number;
  kind_r_: unknown /* const array */;
  buf_l_: unknown /* const array */;
  buf: number;
  buf_r_: unknown /* const array */;
  size_l_: unknown /* const array */;
  size: number;
  size_r_: unknown /* const array */;
}

declare class crossarch_trap_args {
  constructor(init?: crossarch_trap_args);
  name_l_: unknown /* const array */;
  name: number;
  name_r_: unknown /* const array */;
}

declare class geteuid_args {
  constructor(init?: geteuid_args);
  dummy: number;
}

declare class setuid_args {
  constructor(init?: setuid_args);
  uid_l_: unknown /* const array */;
  uid: number;
  uid_r_: unknown /* const array */;
}

declare class chmod_args {
  constructor(init?: chmod_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  mode_l_: unknown /* const array */;
  mode: number;
  mode_r_: unknown /* const array */;
}

declare class __Request__nspace_resolve_cancel_t {
  constructor(init?: __Request__nspace_resolve_cancel_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  req_id: number;
}

declare class mknod_args {
  constructor(init?: mknod_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  mode_l_: unknown /* const array */;
  mode: number;
  mode_r_: unknown /* const array */;
  dev_l_: unknown /* const array */;
  dev: number;
  dev_r_: unknown /* const array */;
}

declare class link_args {
  constructor(init?: link_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  link_l_: unknown /* const array */;
  link: number;
  link_r_: unknown /* const array */;
}

declare class close_args {
  constructor(init?: close_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
}

declare class fork_args {
  constructor(init?: fork_args);
  dummy: number;
}

declare class getdirentries64_args {
  constructor(init?: getdirentries64_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  buf_l_: unknown /* const array */;
  buf: number;
  buf_r_: unknown /* const array */;
  bufsize_l_: unknown /* const array */;
  bufsize: number;
  bufsize_r_: unknown /* const array */;
  position_l_: unknown /* const array */;
  position: number;
  position_r_: unknown /* const array */;
}

declare class user_timespec {
  constructor(init?: user_timespec);
  tv_sec: number;
  tv_nsec: number;
}

declare class user32_timeval {
  constructor(init?: user32_timeval);
  tv_sec: number;
  tv_usec: number;
}

declare class user64_timeval {
  constructor(init?: user64_timeval);
  tv_sec: number;
  tv_usec: number;
}

declare class user32_timex {
  constructor(init?: user32_timex);
  modes: number;
  offset: number;
  freq: number;
  maxerror: number;
  esterror: number;
  status: number;
  constant: number;
  precision: number;
  tolerance: number;
  ppsfreq: number;
  jitter: number;
  shift: number;
  stabil: number;
  jitcnt: number;
  calcnt: number;
  errcnt: number;
  stbcnt: number;
}

declare class user64_itimerval {
  constructor(init?: user64_itimerval);
  it_interval: number;
  it_value: number;
}

declare class user32_timespec {
  constructor(init?: user32_timespec);
  tv_sec: number;
  tv_nsec: number;
}

declare class nameidata {
  constructor(init?: nameidata);
}

declare class unnamed_10245855161319644490 {
  constructor(init?: unnamed_10245855161319644490);
  : number;
  tss: sel;
  : number;
  type: number;
  dpl: number;
  present: number;
  : number;
}

declare class unnamed_6634344154655524512 {
  constructor(init?: unnamed_6634344154655524512);
  limit00: number;
  base00: number;
  base16: number;
  type: number;
  dpl: number;
  present: number;
  limit16: number;
  : number;
  granular: number;
  base24: number;
}

declare class unnamed_10401702111739085484 {
  constructor(init?: unnamed_10401702111739085484);
  rpl: number;
  ti: number;
  index: number;
}

declare class __Reply__upl_abort_t {
  constructor(init?: __Reply__upl_abort_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class intr_gate {
  constructor(init?: intr_gate);
  offset00: number;
  seg: sel;
  : number;
  type: number;
  dpl: number;
  present: number;
  offset16: number;
}

declare class trap_gate {
  constructor(init?: trap_gate);
  offset00: number;
  seg: sel;
  : number;
  type: number;
  dpl: number;
  present: number;
  offset16: number;
}

declare class kev_netevent_clat46_data {
  constructor(init?: kev_netevent_clat46_data);
  clat46_event_code: interop.Enum<typeof in6_clat46_evhdlr_code_t>;
  epid: number;
  euuid: unknown /* const array */;
}

declare class opaque_ipfilter {
  constructor(init?: opaque_ipfilter);
}

declare class ipf_filter {
  constructor(init?: ipf_filter);
  cookie: interop.Pointer;
  name: string | null;
  ipf_input: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => number | null;
  ipf_output: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ipf_detach: (p1: interop.PointerConvertible) => void | null;
}

declare class ipf_pktopts {
  constructor(init?: ipf_pktopts);
  ippo_flags: number;
  ippo_mcast_ifnet: interop.Pointer;
  ippo_mcast_loop: number;
  ippo_mcast_ttl: number;
}

declare class mptcp_symptoms_ask_uuid {
  constructor(init?: mptcp_symptoms_ask_uuid);
  cmd: number;
  uuid: unknown /* const array */;
  priority: number;
}

declare class unnamed_16554362605418422834 {
  constructor(init?: unnamed_16554362605418422834);
  sa_wifi_status: number;
  sa_cell_status: number;
}

declare class symptoms_advisory {
  constructor(init?: symptoms_advisory);
}

declare class mptcp_flow {
  constructor(init?: mptcp_flow);
  flow_len: number;
  flow_tcpci_offset: number;
  flow_flags: number;
  flow_cid: number;
  flow_src: sockaddr_storage;
  flow_dst: sockaddr_storage;
  flow_relseq: number;
  flow_soerror: number;
  flow_probecnt: number;
  flow_ci: conninfo_tcp;
}

declare class tcp_measure_bw_burst {
  constructor(init?: tcp_measure_bw_burst);
  min_burst_size: number;
  max_burst_size: number;
}

declare class open_args {
  constructor(init?: open_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
  mode_l_: unknown /* const array */;
  mode: number;
  mode_r_: unknown /* const array */;
}

declare class tcp_info {
  constructor(init?: tcp_info);
  tcpi_state: number;
  tcpi_options: number;
  tcpi_snd_wscale: number;
  tcpi_rcv_wscale: number;
  tcpi_flags: number;
  tcpi_rto: number;
  tcpi_snd_mss: number;
  tcpi_rcv_mss: number;
  tcpi_rttcur: number;
  tcpi_srtt: number;
  tcpi_rttvar: number;
  tcpi_rttbest: number;
  tcpi_snd_ssthresh: number;
  tcpi_snd_cwnd: number;
  tcpi_rcv_space: number;
  tcpi_snd_wnd: number;
  tcpi_snd_nxt: number;
  tcpi_rcv_nxt: number;
  tcpi_last_outif: number;
  tcpi_snd_sbbytes: number;
  tcpi_txpackets: number;
  tcpi_txbytes: number;
  tcpi_txretransmitbytes: number;
  tcpi_txunacked: number;
  tcpi_rxpackets: number;
  tcpi_rxbytes: number;
  tcpi_rxduplicatebytes: number;
  tcpi_rxoutoforderbytes: number;
  tcpi_snd_bw: number;
  tcpi_synrexmits: number;
  tcpi_unused1: number;
  tcpi_unused2: number;
  tcpi_cell_rxpackets: number;
  tcpi_cell_rxbytes: number;
  tcpi_cell_txpackets: number;
  tcpi_cell_txbytes: number;
  tcpi_wifi_rxpackets: number;
  tcpi_wifi_rxbytes: number;
  tcpi_wifi_txpackets: number;
  tcpi_wifi_txbytes: number;
  tcpi_wired_rxpackets: number;
  tcpi_wired_rxbytes: number;
  tcpi_wired_txpackets: number;
  tcpi_wired_txbytes: number;
  tcpi_connstatus: tcp_conn_status;
  tcpi_tfo_cookie_req: number;
  tcpi_tfo_cookie_rcv: number;
  tcpi_tfo_syn_loss: number;
  tcpi_tfo_syn_data_sent: number;
  tcpi_tfo_syn_data_acked: number;
  tcpi_tfo_syn_data_rcv: number;
  tcpi_tfo_cookie_req_rcv: number;
  tcpi_tfo_cookie_sent: number;
  tcpi_tfo_cookie_invalid: number;
  tcpi_tfo_cookie_wrong: number;
  tcpi_tfo_no_cookie_rcv: number;
  tcpi_tfo_heuristics_disable: number;
  tcpi_tfo_send_blackhole: number;
  tcpi_tfo_recv_blackhole: number;
  tcpi_tfo_onebyte_proxy: number;
  tcpi_ecn_client_setup: number;
  tcpi_ecn_server_setup: number;
  tcpi_ecn_success: number;
  tcpi_ecn_lost_syn: number;
  tcpi_ecn_lost_synack: number;
  tcpi_local_peer: number;
  tcpi_if_cell: number;
  tcpi_if_wifi: number;
  tcpi_if_wired: number;
  tcpi_if_wifi_infra: number;
  tcpi_if_wifi_awdl: number;
  tcpi_snd_background: number;
  tcpi_rcv_background: number;
  tcpi_l4s_enabled: number;
  tcpi_ecn_recv_ce: number;
  tcpi_ecn_recv_cwr: number;
  tcpi_rcvoopack: number;
  tcpi_pawsdrop: number;
  tcpi_sack_recovery_episode: number;
  tcpi_reordered_pkts: number;
  tcpi_dsack_sent: number;
  tcpi_dsack_recvd: number;
  tcpi_flowhash: number;
  tcpi_txretransmitpackets: number;
  tcpi_rcv_srtt: number;
  tcpi_client_accecn_state: number;
  tcpi_server_accecn_state: number;
  tcpi_ecn_capable_packets_sent: number;
  tcpi_ecn_capable_packets_acked: number;
  tcpi_ecn_capable_packets_marked: number;
  tcpi_ecn_capable_packets_lost: number;
  tcpi_received_ce_packets: number;
  tcpi_received_ect0_bytes: number;
  tcpi_received_ect1_bytes: number;
  tcpi_received_ce_bytes: number;
  tcpi_delivered_ect0_bytes: number;
  tcpi_delivered_ect1_bytes: number;
  tcpi_delivered_ce_bytes: number;
  tcpi_flow_control_total_time: number;
  tcpi_rcvwnd_limited_total_time: number;
  tcpi_pacing_rate: number;
  tcpi_max_pacing_rate: number;
}

declare class unnamed_6282570355603500895 {
  constructor(init?: unnamed_6282570355603500895);
  probe_activated: number;
  write_probe_failed: number;
  read_probe_failed: number;
  conn_probe_failed: number;
}

declare class EXDisplayPipeHealthStats {
  constructor(init?: EXDisplayPipeHealthStats);
  globalhealth: number;
  scldriver: number;
  scadriver: number;
  scaalgorithm: number;
  pipe: number;
  link: number;
  brightness: number;
  tconcrc: number;
  tconhealth: number;
  tconhpd: number;
  dcptransporthealth: number;
  silhealth: number;
}

declare class kdebug_trace_args {
  constructor(init?: kdebug_trace_args);
  code_l_: unknown /* const array */;
  code: number;
  code_r_: unknown /* const array */;
  arg1_l_: unknown /* const array */;
  arg1: number;
  arg1_r_: unknown /* const array */;
  arg2_l_: unknown /* const array */;
  arg2: number;
  arg2_r_: unknown /* const array */;
  arg3_l_: unknown /* const array */;
  arg3: number;
  arg3_r_: unknown /* const array */;
  arg4_l_: unknown /* const array */;
  arg4: number;
  arg4_r_: unknown /* const array */;
}

declare class unnamed_11654989967691793079 {
  constructor(init?: unnamed_11654989967691793079);
  prevTimebase: number;
  prevTimestamp: number;
  currTimebase: number;
  currTimestamp: number;
  timeDiff: number;
  timebaseDiff: number;
}

declare class EXDisplayPipeStatus {
  constructor(init?: EXDisplayPipeStatus);
  displayedSwapID: number;
  validDisplayedID: boolean;
  poweredOn: boolean;
  indicators: unknown /* const array */;
  health_report: EXDisplayPipeHealthReport;
  cancelledQueue: unknown /* const array */;
  droppedQueue: unknown /* const array */;
  cancelledCount: number;
  droppedCount: number;
}

declare class EXDisplayPipeIndicatorParams {
  constructor(init?: EXDisplayPipeIndicatorParams);
  x: number;
  y: number;
  alpha: number;
}

declare class KeyValueMask {
  constructor(init?: KeyValueMask);
  key: Key;
  mask: number;
}

declare class OSAction_IOHIDEventService__CopyEvent_LocalIVars {
  constructor(init?: OSAction_IOHIDEventService__CopyEvent_LocalIVars);
}

declare class OSAction_IOHIDEventService__CopyEvent_IVars {
  constructor(init?: OSAction_IOHIDEventService__CopyEvent_IVars);
}

declare class OSAction_IOHIDEventService__SetLED_LocalIVars {
  constructor(init?: OSAction_IOHIDEventService__SetLED_LocalIVars);
}

declare class OSAction_IOHIDEventService__SetLED_IVars {
  constructor(init?: OSAction_IOHIDEventService__SetLED_IVars);
}

declare class IOHIDEventService_IVars {
  constructor(init?: IOHIDEventService_IVars);
}

declare class IOHIDDigitizerStylusData {
  constructor(init?: IOHIDDigitizerStylusData);
}

declare class unnamed_1315594572584186897 {
  constructor(init?: unnamed_1315594572584186897);
  contextLock: number;
  state: number;
  owner: interop.Pointer;
  version: number;
  structSize: number;
  reserved: unknown /* const array */;
}

declare class IOHIDInterface_LocalIVars {
  constructor(init?: IOHIDInterface_LocalIVars);
}

declare class route_in6_old {
  constructor(init?: route_in6_old);
  ro_rt: interop.Pointer;
  ro_flags: number;
  ro_dst: sockaddr_in6;
}

declare class IOHIDInterface_IVars {
  constructor(init?: IOHIDInterface_IVars);
}

declare class unnamed_4405217834203024098 {
  constructor(init?: unnamed_4405217834203024098);
  connectionHandle: number;
  randomNumber: unknown /* const array */;
  ediv: number;
}

declare class unnamed_3744489281634571913 {
  constructor(init?: unnamed_3744489281634571913);
  length: number;
  data: unknown /* const array */;
}

declare class unnamed_12873340176224763681 {
  constructor(init?: unnamed_12873340176224763681);
  connectionHandle: number;
}

declare class quotactl_args {
  constructor(init?: quotactl_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  cmd_l_: unknown /* const array */;
  cmd: number;
  cmd_r_: unknown /* const array */;
  uid_l_: unknown /* const array */;
  uid: number;
  uid_r_: unknown /* const array */;
  arg_l_: unknown /* const array */;
  arg: number;
  arg_r_: unknown /* const array */;
}

declare class unnamed_6485530394947655174 {
  constructor(init?: unnamed_6485530394947655174);
  error: number;
  connectionHandle: number;
  page: number;
  maxPage: number;
  lmpFeatures: BluetoothHCISupportedFeatures;
}

declare class unnamed_14685552697123847232 {
  constructor(init?: unnamed_14685552697123847232);
  connectionHandle: number;
  packetType: number;
}

declare class unnamed_6695955528974737229 {
  constructor(init?: unnamed_6695955528974737229);
  connectionHandle: number;
  keyFlag: number;
}

declare class __pthread_kill_args {
  constructor(init?: __pthread_kill_args);
  thread_port_l_: unknown /* const array */;
  thread_port: number;
  thread_port_r_: unknown /* const array */;
  sig_l_: unknown /* const array */;
  sig: number;
  sig_r_: unknown /* const array */;
}

declare class unnamed_6359250257130217676 {
  constructor(init?: unnamed_6359250257130217676);
  connectionHandle: number;
}

declare class unnamed_16133518678232883090 {
  constructor(init?: unnamed_16133518678232883090);
  deviceAddress: BluetoothDeviceAddress;
  linkKey: BluetoothKey;
}

declare class unnamed_1915220244854016506 {
  constructor(init?: unnamed_1915220244854016506);
  numLinkKeys: number;
  linkKeys: unknown /* const array */;
}

declare class unnamed_14545234515013782280 {
  constructor(init?: unnamed_14545234515013782280);
  connectionHandle: number;
  maxSlots: number;
}

declare class unnamed_17721848110713871053 {
  constructor(init?: unnamed_17721848110713871053);
  connectionHandle: number;
  clockOffset: number;
}

declare class sigsuspend_nocancel_args {
  constructor(init?: sigsuspend_nocancel_args);
  mask_l_: unknown /* const array */;
  mask: number;
  mask_r_: unknown /* const array */;
}

declare class unnamed_6892037542614408509 {
  constructor(init?: unnamed_6892037542614408509);
  connectionHandle: number;
  supportedFeaturesInfo: BluetoothHCIExtendedFeaturesInfo;
}

declare class unnamed_13095299419804297735 {
  constructor(init?: unnamed_13095299419804297735);
  connectionHandle: number;
  supportedFeatures: BluetoothHCISupportedFeatures;
}

declare class unnamed_8000284967430889214 {
  constructor(init?: unnamed_8000284967430889214);
  connectionHandle: number;
  reason: number;
}

declare class unnamed_16146361739545037460 {
  constructor(init?: unnamed_16146361739545037460);
  connectionHandle: number;
  connInterval: number;
  connLatency: number;
  supervisionTimeout: number;
}

declare class unnamed_3122674365946667703 {
  constructor(init?: unnamed_3122674365946667703);
  connectionHandle: number;
  role: number;
  peerAddressType: number;
  peerAddress: BluetoothDeviceAddress;
  localResolvablePrivateAddress: BluetoothDeviceAddress;
  peerResolvablePrivateAddress: BluetoothDeviceAddress;
  connInterval: number;
  connLatency: number;
  supervisionTimeout: number;
  masterClockAccuracy: number;
}

declare class ntp_gettime_args {
  constructor(init?: ntp_gettime_args);
  ntvp_l_: unknown /* const array */;
  ntvp: number;
  ntvp_r_: unknown /* const array */;
}

declare class unnamed_10512273311661733268 {
  constructor(init?: unnamed_10512273311661733268);
  connectionHandle: number;
  role: number;
  peerAddressType: number;
  peerAddress: BluetoothDeviceAddress;
  connInterval: number;
  connLatency: number;
  supervisionTimeout: number;
  masterClockAccuracy: number;
}

declare class unnamed_17379390117004970666 {
  constructor(init?: unnamed_17379390117004970666);
  connectionHandle: number;
  deviceAddress: BluetoothDeviceAddress;
  linkType: number;
  encryptionMode: number;
}

declare class unnamed_825325064729843511 {
  constructor(init?: unnamed_825325064729843511);
  handle: number;
  mode: number;
  afhMap: unknown /* const array */;
}

declare class unnamed_13908932035459226953 {
  constructor(init?: unnamed_13908932035459226953);
  data: unknown /* const array */;
}

declare class unnamed_9763661715145603623 {
  constructor(init?: unnamed_9763661715145603623);
  deviceAddress: BluetoothDeviceAddress;
  notificationType: number;
}

declare class unnamed_14352815353189537517 {
  constructor(init?: unnamed_14352815353189537517);
  deviceAddress: BluetoothDeviceAddress;
  passkey: number;
}

declare class unnamed_17760397736649477487 {
  constructor(init?: unnamed_17760397736649477487);
  hash: BluetoothHCISimplePairingOOBData;
  randomizer: BluetoothHCISimplePairingOOBData;
}

declare class unnamed_11170576992091453114 {
  constructor(init?: unnamed_11170576992091453114);
  data: unknown /* const array */;
}

declare class unnamed_8907571703094486488 {
  constructor(init?: unnamed_8907571703094486488);
  outFECRequired: number;
  extendedInquiryResponse: BluetoothHCIExtendedInquiryResponse;
}

declare class unnamed_12184568112118927398 {
  constructor(init?: unnamed_12184568112118927398);
  data: unknown /* const array */;
}

declare class unnamed_6656109843928510805 {
  constructor(init?: unnamed_6656109843928510805);
  results: unknown /* const array */;
  count: number;
}

declare class unnamed_12004043623014703245 {
  constructor(init?: unnamed_12004043623014703245);
  deviceAddress: BluetoothDeviceAddress;
  pageScanRepetitionMode: number;
  reserved: number;
  classOfDevice: number;
  clockOffset: number;
  RSSIValue: number;
}

declare class unnamed_9502991268943117136 {
  constructor(init?: unnamed_9502991268943117136);
  productID: number;
  vendorID: number;
  type: number;
  productName: unknown /* const array */;
  vendorName: unknown /* const array */;
  totalDataBytesSent: number;
  totalSCOBytesSent: number;
  totalDataBytesReceived: number;
  totalSCOBytesReceived: number;
}

declare class unnamed_5063178359264227978 {
  constructor(init?: unnamed_5063178359264227978);
  handle: number;
  timeout: number;
}

declare class unnamed_174160992361959040 {
  constructor(init?: unnamed_174160992361959040);
  handle: number;
  level: number;
}

declare class unnamed_8883058337753654942 {
  constructor(init?: unnamed_8883058337753654942);
  count: number;
  codes: unknown /* const array */;
}

declare class unnamed_5695680544649957972 {
  constructor(init?: unnamed_5695680544649957972);
  ACLDataPacketLength: number;
  SCODataPacketLength: number;
  totalNumACLDataPackets: number;
  totalNumSCODataPackets: number;
}

declare class unnamed_10563187139034436309 {
  constructor(init?: unnamed_10563187139034436309);
  manufacturerName: number;
  lmpVersion: number;
  lmpSubVersion: number;
  hciVersion: number;
  hciRevision: number;
}

declare class unnamed_17200267137875338337 {
  constructor(init?: unnamed_17200267137875338337);
  handle: number;
  clock: number;
  accuracy: number;
}

declare class unnamed_12771175986842419775 {
  constructor(init?: unnamed_12771175986842419775);
  transmitBandwidth: number;
  receiveBandwidth: number;
  transmitCodingFormat: number;
  receiveCodingFormat: number;
  transmitCodecFrameSize: number;
  receiveCodecFrameSize: number;
  inputBandwidth: number;
  outputBandwidth: number;
  inputCodingFormat: number;
  outputCodingFormat: number;
  inputCodedDataSize: number;
  outputCodedDataSize: number;
  inputPCMDataFormat: number;
  outputPCMDataFormat: number;
  inputPCMSamplePayloadMSBPosition: number;
  outputPCMSamplePayloadMSBPosition: number;
  inputDataPath: number;
  outputDataPath: number;
  inputTransportUnitSize: number;
  outputTransportUnitSize: number;
  maxLatency: number;
  packetType: number;
  retransmissionEffort: number;
}

declare class unnamed_7050890988361481334 {
  constructor(init?: unnamed_7050890988361481334);
  transmitBandwidth: number;
  receiveBandwidth: number;
  maxLatency: number;
  voiceSetting: number;
  retransmissionEffort: number;
  packetType: number;
}

declare class unnamed_9518647771440607728 {
  constructor(init?: unnamed_9518647771440607728);
  flags: number;
  serviceType: number;
  tokenRate: number;
  peakBandwidth: number;
  latency: number;
  delayVariation: number;
}

declare class unnamed_17340048297115027307 {
  constructor(init?: unnamed_17340048297115027307);
  settings: number;
  handle: number;
}

declare class unnamed_14655595527810739837 {
  constructor(init?: unnamed_14655595527810739837);
  handle: number;
  keySize: number;
}

declare class unnamed_17049932793282015549 {
  constructor(init?: unnamed_17049932793282015549);
  handle: number;
  RSSIValue: number;
}

declare class unnamed_17363652340809838133 {
  constructor(init?: unnamed_17363652340809838133);
  count: number;
  handle: number;
}

declare class airship_buffer {
  constructor(init?: airship_buffer);
}

declare class unnamed_1011781940521745346 {
  constructor(init?: unnamed_1011781940521745346);
  data: unknown /* const array */;
}

declare class unnamed_15126106188599157768 {
  constructor(init?: unnamed_15126106188599157768);
  page: number;
  maxPage: number;
  data: unknown /* const array */;
}

declare class unnamed_12710453468875713864 {
  constructor(init?: unnamed_12710453468875713864);
  data: unknown /* const array */;
}

declare class cl_direct_read_lock {
  constructor(init?: cl_direct_read_lock);
}

declare class ungraftdmg_args {
  constructor(init?: ungraftdmg_args);
  mountdir_l_: unknown /* const array */;
  mountdir: number;
  mountdir_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
}

declare class unnamed_12722572568254980039 {
  constructor(init?: unnamed_12722572568254980039);
  data: unknown /* const array */;
}

declare class unnamed_14485107667129898935 {
  constructor(init?: unnamed_14485107667129898935);
  data: unknown /* const array */;
}

declare class sem_close_args {
  constructor(init?: sem_close_args);
  sem_l_: unknown /* const array */;
  sem: number;
  sem_r_: unknown /* const array */;
}

declare class unnamed_2894202839658864712 {
  constructor(init?: unnamed_2894202839658864712);
  data: unknown /* const array */;
}

declare class unnamed_9513934731600801000 {
  constructor(init?: unnamed_9513934731600801000);
  data: unknown /* const array */;
}

declare class searchfs_args {
  constructor(init?: searchfs_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  searchblock_l_: unknown /* const array */;
  searchblock: number;
  searchblock_r_: unknown /* const array */;
  nummatches_l_: unknown /* const array */;
  nummatches: number;
  nummatches_r_: unknown /* const array */;
  scriptcode_l_: unknown /* const array */;
  scriptcode: number;
  scriptcode_r_: unknown /* const array */;
  options_l_: unknown /* const array */;
  options: number;
  options_r_: unknown /* const array */;
  state_l_: unknown /* const array */;
  state: number;
  state_r_: unknown /* const array */;
}

declare class _AVCUnitPlugs {
  constructor(init?: _AVCUnitPlugs);
  numIsochInPlugs: number;
  numIsochOutPlugs: number;
  numExternalInPlugs: number;
  numExternalOutPlugs: number;
  isochInPlugRecord: unknown /* const array */;
  isochOutPlugRecord: unknown /* const array */;
  externalInPlugRecord: unknown /* const array */;
  externalOutPlugRecord: unknown /* const array */;
}

declare class _AVCUnitPlugRecord {
  constructor(init?: _AVCUnitPlugRecord);
  connectionCount: number;
}

declare class _AVCSubunitPlugRecord {
  constructor(init?: _AVCSubunitPlugRecord);
  plugSignalFormat: number;
  connectionCount: number;
}

declare class _AVCGetTargetPlugConnectionOutParams {
  constructor(init?: _AVCGetTargetPlugConnectionOutParams);
  connectedSubunitTypeAndID: number;
  connectedPlugType: interop.Enum<typeof IOFWAVCPlugTypes>;
  connectedPlugNum: number;
  lockConnection: number;
  permConnection: number;
}

declare class _AVCGetTargetPlugConnectionInParams {
  constructor(init?: _AVCGetTargetPlugConnectionInParams);
  subunitTypeAndID: number;
  plugType: interop.Enum<typeof IOFWAVCPlugTypes>;
  plugNum: number;
}

declare class IOAudioClientBufferExtendedInfo {
  constructor(init?: IOAudioClientBufferExtendedInfo);
  bufferSetID: number;
  paramBuffer: interop.Pointer;
  paramBufferDescriptor: interop.Pointer;
  paramBufferMap: interop.Pointer;
  unmappedParamBuffer: interop.Pointer;
  mNextExtended: interop.Pointer;
}

declare class IOAudioFormatNotification {
  constructor(init?: IOAudioFormatNotification);
}

declare class IOAudioEnginePosition {
  constructor(init?: IOAudioEnginePosition);
  fSampleFrame: number;
  fLoopCount: number;
}

declare class IOHistReportInfo {
  constructor(init?: IOHistReportInfo);
  bucketWidth: number;
  elem: interop.Pointer;
}

declare class IOUSBHostInterface_IVars {
  constructor(init?: IOUSBHostInterface_IVars);
}

declare class IOUSBHostDevice_LocalIVars {
  constructor(init?: IOUSBHostDevice_LocalIVars);
}

declare class madvise_args {
  constructor(init?: madvise_args);
  addr_l_: unknown /* const array */;
  addr: number;
  addr_r_: number;
  len_l_: unknown /* const array */;
  len: number;
  len_r_: number;
  behav_l_: unknown /* const array */;
  behav: number;
  behav_r_: unknown /* const array */;
}

declare class IOUSBHostPipe_IVars {
  constructor(init?: IOUSBHostPipe_IVars);
}

declare class IOUSBStandardEndpointDescriptors {
  constructor(init?: IOUSBStandardEndpointDescriptors);
  bcdUSB: number;
  descriptor: IOUSBEndpointDescriptor;
  ssCompanionDescriptor: IOUSBSuperSpeedEndpointCompanionDescriptor;
  sspCompanionDescriptor: IOUSBSuperSpeedPlusIsochronousEndpointCompanionDescriptor;
}

declare class tPacketFilterMetadata {
  constructor(init?: tPacketFilterMetadata);
  deviceAddress: number;
  interfaceClass: number;
  interfaceSubclass: number;
  interfaceProtocol: number;
  interfaceAltSetting: number;
  endpointAddress: number;
  endpointType: number;
  speed: number;
  vid: number;
  pid: number;
  locationID: number;
}

declare class IOUSBHostIOSourceClientRecordLink {
  constructor(init?: IOUSBHostIOSourceClientRecordLink);
  le_next: interop.Pointer;
  le_prev: interop.Pointer;
}

declare class IOUSBHostIOSourceClientRecordList {
  constructor(init?: IOUSBHostIOSourceClientRecordList);
  lh_first: interop.Pointer;
}

declare class audit_session_port_args {
  constructor(init?: audit_session_port_args);
  asid_l_: unknown /* const array */;
  asid: number;
  asid_r_: unknown /* const array */;
  portnamep_l_: unknown /* const array */;
  portnamep: number;
  portnamep_r_: unknown /* const array */;
}

declare class IOUSBHostIsochronousTransaction {
  constructor(init?: IOUSBHostIsochronousTransaction);
  status: number;
  requestCount: number;
  offset: number;
  completeCount: number;
  timeStamp: UnsignedWide;
  options: number;
}

declare class __Reply__find_code_signature_t {
  constructor(init?: __Reply__find_code_signature_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class IOUSBHostCompletion {
  constructor(init?: IOUSBHostCompletion);
  owner: interop.Pointer;
  action: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => void | null;
  parameter: interop.Pointer;
}

declare class IOUSBHostCIMessage {
  constructor(init?: IOUSBHostCIMessage);
  control: number;
  data0: number;
  data1: number;
}

declare class DeviceRequestSetSELData {
  constructor(init?: DeviceRequestSetSELData);
  u1Sel: number;
  u1Pel: number;
  u2Sel: number;
  u2Pel: number;
}

declare class HubDescriptor {
  constructor(init?: HubDescriptor);
  bLength: number;
  bDescriptorType: number;
  bNumberPorts: number;
  wHubCharacteristics: number;
  bPowerOnToPowerGood: number;
  bHubControllerCurrent: number;
  deviceRemovable: unknown /* const array */;
  reserved: unknown /* const array */;
}

declare class SuperSpeedPlusIsochronousEndpointCompanionDescriptor {
  constructor(init?: SuperSpeedPlusIsochronousEndpointCompanionDescriptor);
  bLength: number;
  bDescriptorType: number;
  wReserved: number;
  dwBytesPerInterval: number;
}

declare class InterfaceAssociationDescriptor {
  constructor(init?: InterfaceAssociationDescriptor);
  bLength: number;
  bDescriptorType: number;
  bFirstInterface: number;
  bInterfaceCount: number;
  bFunctionClass: number;
  bFunctionSubClass: number;
  bFunctionProtocol: number;
  iFunction: number;
}

declare class BillboardCapabilityDescriptor {
  constructor(init?: BillboardCapabilityDescriptor);
  bLength: number;
  bDescriptorType: number;
  bDevCapabilityType: number;
  iAddtionalInfoURL: number;
  bNumberOfAlternateModes: number;
  bPreferredAlternateMode: number;
  VCONNPower: number;
  bmConfigured: unknown /* const array */;
  bcdVersion: number;
  bAdditonalFailureInfo: number;
  bReserved: number;
  altModeCapabilities: interop.Pointer;
}

declare class ContainerIDCapabilityDescriptor {
  constructor(init?: ContainerIDCapabilityDescriptor);
  bLength: number;
  bDescriptorType: number;
  bDevCapabilityType: number;
  bReserved: number;
  containerID: unknown /* const array */;
}

declare class SuperSpeedUSBDeviceCapabilityDescriptor {
  constructor(init?: SuperSpeedUSBDeviceCapabilityDescriptor);
  bLength: number;
  bDescriptorType: number;
  bDevCapabilityType: number;
  bmAttributes: number;
  wSpeedsSupported: number;
  bFunctionalitySupport: number;
  bU1DevExitLat: number;
  bU2DevExitLat: number;
}

declare class InterfaceDescriptor {
  constructor(init?: InterfaceDescriptor);
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

declare class ConfigurationDescriptor {
  constructor(init?: ConfigurationDescriptor);
  bLength: number;
  bDescriptorType: number;
  wTotalLength: number;
  bNumInterfaces: number;
  bConfigurationValue: number;
  iConfiguration: number;
  bmAttributes: number;
  bMaxPower: number;
}

declare class Descriptor {
  constructor(init?: Descriptor);
  bLength: number;
  bDescriptorType: number;
}

declare class IOFBCursorControlAttribute {
  constructor(init?: IOFBCursorControlAttribute);
  inst: interop.Pointer;
  ref: interop.Pointer;
  callouts: interop.Pointer;
  reserved: unknown /* const array */;
}

declare class IOFBController {
  constructor(init?: IOFBController);
}

declare class OpaqueIOCommandID {
  constructor(init?: OpaqueIOCommandID);
}

declare class _VSLService {
  constructor(init?: _VSLService);
}

declare class IOMbufQueue {
  constructor(init?: IOMbufQueue);
}

declare class mbuf_stat {
  constructor(init?: mbuf_stat);
  mbufs: number;
  clusters: number;
  clfree: number;
  drops: number;
  wait: number;
  drain: number;
  mtypes: unknown /* const array */;
  mcfail: number;
  mpfail: number;
  msize: number;
  mclbytes: number;
  minclsize: number;
  mlen: number;
  mhlen: number;
  bigclusters: number;
  bigclfree: number;
  bigmclbytes: number;
}

declare class unnamed_4007094476083325336 {
  constructor(init?: unnamed_4007094476083325336);
  data: unknown /* const array */;
}

declare class RomScan {
  constructor(init?: RomScan);
}

declare class IOInterruptVector {
  constructor(init?: IOInterruptVector);
  interruptActive: number;
  interruptDisabledSoft: number;
  interruptDisabledHard: number;
  interruptRegistered: number;
  interruptLock: interop.Pointer;
  nub: interop.Pointer;
  source: number;
  target: interop.Pointer;
  handler: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number) => void | null;
  refCon: interop.Pointer;
  sharedController: interop.Pointer;
}

declare class IONVRAMDescriptor {
  constructor(init?: IONVRAMDescriptor);
  format: number;
  marker: number;
  bridgeCount: number;
  busNum: number;
  bridgeDevices: number;
  functionNum: number;
  deviceNum: number;
}

declare class unnamed_12713508752774757029 {
  constructor(init?: unnamed_12713508752774757029);
  offset: number;
  function: number;
  device: number;
  bus: number;
  segment: number;
  reserved: number;
}

declare class unnamed_3028334284839788733 {
  constructor(init?: unnamed_3028334284839788733);
  device: interop.Pointer;
  op: number;
  result: interop.Pointer;
  arg: interop.Pointer;
}

declare class IOPCIPhysicalAddress {
  constructor(init?: IOPCIPhysicalAddress);
  physHi: IOPCIAddressSpace;
  physLo: number;
  physMid: number;
  lengthLo: number;
  lengthHi: number;
}

declare class unnamed_17672180226118855821 {
  constructor(init?: unnamed_17672180226118855821);
  registerNum: number;
  functionNum: number;
  deviceNum: number;
  busNum: number;
  space: number;
  resv: number;
  t: number;
  prefetch: number;
  reloc: number;
}

declare class IOPCIDevice_IVars {
  constructor(init?: IOPCIDevice_IVars);
}

declare class ScrollAccelInfo {
  constructor(init?: ScrollAccelInfo);
}

declare class unnamed_2475899045996132323 {
  constructor(init?: unnamed_2475899045996132323);
  usage: number;
  reserved1: number;
  stringIndex: number;
  reserved2: number;
  designatorIndex: number;
  reserved3: number;
}

declare class unnamed_10261520394563487748 {
  constructor(init?: unnamed_10261520394563487748);
  usage: number;
  reserved1: number;
  stringIndex: number;
  reserved2: number;
  designatorIndex: number;
  reserved3: number;
}

declare class unnamed_13574595766822801905 {
  constructor(init?: unnamed_13574595766822801905);
  usageMin: number;
  usageMax: number;
  stringMin: number;
  stringMax: number;
  designatorMin: number;
  designatorMax: number;
}

declare class HIDCollectionNode {
  constructor(init?: HIDCollectionNode);
  collectionUsage: number;
  collectionUsagePage: number;
  parent: number;
  numberOfChildren: number;
  nextSibling: number;
  firstChild: number;
}

declare class HIDCapabilities {
  constructor(init?: HIDCapabilities);
  usage: number;
  usagePage: number;
  inputReportByteLength: number;
  outputReportByteLength: number;
  featureReportByteLength: number;
  numberCollectionNodes: number;
  numberInputButtonCaps: number;
  numberInputValueCaps: number;
  numberOutputButtonCaps: number;
  numberOutputValueCaps: number;
  numberFeatureButtonCaps: number;
  numberFeatureValueCaps: number;
}

declare class HIDUsageAndPage {
  constructor(init?: HIDUsageAndPage);
  usage: number;
  usagePage: number;
}

declare class IOFWDuplicateGUIDStruct {
  constructor(init?: IOFWDuplicateGUIDStruct);
  fNextGUID: interop.Pointer;
  fGUID: number;
  fLastGenSeen: number;
}

declare class IOFWNodeScan {
  constructor(init?: IOFWNodeScan);
  fControl: interop.Pointer;
  fAddr: FWAddressStruct;
  fBuf: unknown /* const array */;
  fSelfIDs: interop.Pointer;
  fNumSelfIDs: number;
  fROMSize: number;
  fRead: number;
  fCmd: interop.Pointer;
  fLockCmd: interop.Pointer;
  generation: number;
  fIRMBitBucketOld: number;
  fIRMBitBucketNew: number;
  fIRMisBad: boolean;
  speedChecking: boolean;
  fContenderNeedsChecking: boolean;
  fIRMCheckingRead: boolean;
  fIRMCheckingLock: boolean;
  fRetriesBumped: number;
  fMustNotBeRoot: boolean;
}

declare class FWMultiIsochReceiveListenerParamsStruct {
  constructor(init?: FWMultiIsochReceiveListenerParamsStruct);
  maxLatencyInFireWireCycles: number;
  expectedStreamBitRate: number;
  clientPacketReturnLatencyInFireWireCycles: number;
}

declare class IOFWCmdQ {
  constructor(init?: IOFWCmdQ);
  fHead: interop.Pointer;
  fTail: interop.Pointer;
  executeQueue: (p1: boolean) => boolean | null;
  headChanged: (p1: interop.PointerConvertible) => number | null;
  : number;
}

declare class OSDictionary {
  constructor(init?: OSDictionary);
}

declare class sptm_consistent_debug {
  constructor(init?: sptm_consistent_debug);
  magic: number;
  version: number;
  is_panic: number;
  exception_number: number;
  first_esr: number;
  first_elr: number;
  first_far: number;
  panic_string_addr_phys: number;
  panic_source: number;
  panic_string: unknown /* const array */;
}

declare class debug_trailer {
  constructor(init?: debug_trailer);
  sptm_consistent_debug: interop.Pointer;
  translated: number;
}

declare class unnamed_5864893492845929824 {
  constructor(init?: unnamed_5864893492845929824);
  paddr: number;
  papt_pte_template: number;
  num_mappings: number;
  options: number;
}

declare class sptm_io_range_t {
  constructor(init?: sptm_io_range_t);
  addr: number;
  len: number;
  type: interop.Enum<typeof sptm_frame_type_t>;
}

declare class sptm_guest_dispatch_gpr_t {
  constructor(init?: sptm_guest_dispatch_gpr_t);
  x: unknown /* const array */;
  fp: number;
  lr: number;
}

declare class sptm_guest_dispatch_vec_t {
  constructor(init?: sptm_guest_dispatch_vec_t);
}

declare class sptm_guest_dispatch_neon_t {
  constructor(init?: sptm_guest_dispatch_neon_t);
  cptr_el2: number;
  fpsr: number;
  fpcr: number;
}

declare class debug_header {
  constructor(init?: debug_header);
  magic: number;
  version: number;
  count: number;
  resvd: number;
  image: interop.Pointer;
}

declare class sptm_bootstrap_args_xnu_t {
  constructor(init?: sptm_bootstrap_args_xnu_t);
  sptm_prev_ptes: number;
  physmap_base: number;
  physmap_end: number;
  first_avail_phys: number;
  phys_slide_papt: number;
  phys_slide_size: number;
  txm_thread_stacks: interop.Pointer;
  num_txm_thread_stacks: number;
  cpu_stack_papt_start: number;
  cpu_stack_papt_end: number;
  executables_papt_start: number;
  executables_papt_end: number;
  debug_header: interop.Pointer;
  num_asids: number;
  random_seed: unknown /* const array */;
  random_seed_length: number;
  sk_bootstrapped: boolean;
  sk_carveout_size: number;
  sptm_variant: interop.Enum<typeof sptm_bootstrap_args_xnu_t::(unnamed at /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX26.0.sdk/System/Library/Frameworks/Kernel.framework/Headers/platform/sptm/sptm_xnu.h:323:2)>;
  xnu_triggered_panic: interop.Pointer;
  libsptm_state: sptm_client_state;
  auxkc_base: number;
  auxkc_mh: number;
  auxkc_end: number;
  timestamp_sk_bootstrap: number;
  timestamp_xnu_bootstrap: number;
  timestamp_txm_bootstrap: number;
  reserved1: interop.Pointer;
  hib_scratch_page_paddr: number;
  sptm_pmap_io_ranges: number;
  sptm_pmap_io_ranges_count: number;
  sptm_pmap_io_filters: number;
  sptm_pmap_io_filters_count: number;
  feature_flags: number;
}

declare class unnamed_2522939467278126486 {
  constructor(init?: unnamed_2522939467278126486);
  sk_flags: number;
}

declare class sptm_retype_params_t {
  constructor(init?: sptm_retype_params_t);
}

declare class AirshipDaleBasebandTraceInfo {
  constructor(init?: AirshipDaleBasebandTraceInfo);
  version: number;
  trace_code_count: number;
  trace_code_size: number;
  min_trace_buffer_size: number;
  max_trace_buffer_size: number;
  snapshot_buffer_size: number;
  max_trace_buffers_in_flight: number;
}

declare class AirshipDaleBasebandDeviceTimeMeasurement {
  constructor(init?: AirshipDaleBasebandDeviceTimeMeasurement);
  seq: number;
  duration: number;
  ap_time: number;
  frc_time: number;
  host_begin_abs_time: number;
  host_begin_continuous_time: number;
}

declare class cpuid_mwait_leaf_t {
  constructor(init?: cpuid_mwait_leaf_t);
  linesize_min: number;
  linesize_max: number;
  extensions: number;
  sub_Cstates: number;
}

declare class pfkeystat {
  constructor(init?: pfkeystat);
  out_total: number;
  out_bytes: number;
  out_msgtype: unknown /* const array */;
  out_invlen: number;
  out_invver: number;
  out_invmsgtype: number;
  out_tooshort: number;
  out_nomem: number;
  out_dupext: number;
  out_invexttype: number;
  out_invsatype: number;
  out_invaddr: number;
  in_total: number;
  in_bytes: number;
  in_msgtype: unknown /* const array */;
  in_msgtarget: unknown /* const array */;
  in_nomem: number;
  sockerr: number;
}

declare class unnamed_13120103969405328411 {
  constructor(init?: unnamed_13120103969405328411);
  xbb_base: string | null;
  xbb_size: number;
  xbb_len: number;
}

declare class xdrbuf {
  constructor(init?: xdrbuf);
  xb_u: unnamed_11714727163374491480;
  xb_ptr: string | null;
  xb_left: number;
  xb_growsize: number;
  xb_type: interop.Enum<typeof xdrbuf_type>;
  xb_flags: number;
}

declare class nfs_testmapid {
  constructor(init?: nfs_testmapid);
  ntm_lookup: number;
  ntm_grpflag: number;
  ntm_id: number;
  pad: number;
  ntm_guid: guid_t;
  ntm_name: unknown /* const array */;
}

declare class lockd_ans {
  constructor(init?: lockd_ans);
  la_version: number;
  la_errno: number;
  la_xid: number;
  la_flags: number;
  la_pid: number;
  la_start: number;
  la_len: number;
  la_fh_len: number;
  la_fh: unknown /* const array */;
}

declare class unnamed_13569257746074412783 {
  constructor(init?: unnamed_13569257746074412783);
  errs_common: unknown /* const array */;
  errs_unknown: number;
}

declare class nfs_user_stat_path_rec {
  constructor(init?: nfs_user_stat_path_rec);
  rec_type: number;
  path: unknown /* const array */;
}

declare class nfs_user_stat_desc {
  constructor(init?: nfs_user_stat_desc);
  rec_vers: number;
  rec_count: number;
}

declare class nfs_export_stat_desc {
  constructor(init?: nfs_export_stat_desc);
  rec_vers: number;
  rec_count: number;
}

declare class nfs_export_args {
  constructor(init?: nfs_export_args);
  nxa_fsid: number;
  nxa_expid: number;
  nxa_fspath: number;
  nxa_exppath: number;
  nxa_flags: number;
  nxa_netcount: number;
  nxa_nets: number;
}

declare class nfs_export_net_args {
  constructor(init?: nfs_export_net_args);
  nxna_flags: number;
  nxna_cred: xucred;
  nxna_addr: sockaddr_storage;
  nxna_mask: sockaddr_storage;
  nxna_sec: nfs_sec;
}

declare class user_nfsd_args {
  constructor(init?: user_nfsd_args);
  sock: number;
  name: number;
  namelen: number;
}

declare class user_nfs_args {
  constructor(init?: user_nfs_args);
  version: number;
  addr: number;
  addrlen: number;
  sotype: number;
  proto: number;
  fh: number;
  fhsize: number;
  flags: number;
  wsize: number;
  rsize: number;
  readdirsize: number;
  timeo: number;
  retrans: number;
  maxgrouplist: number;
  readahead: number;
  leaseterm: number;
  deadthresh: number;
  hostname: number;
  acregmin: number;
  acregmax: number;
  acdirmin: number;
  acdirmax: number;
  auth: number;
  deadtimeout: number;
}

declare class nfs_args {
  constructor(init?: nfs_args);
  version: number;
  addr: number;
  addrlen: number;
  sotype: number;
  proto: number;
  fh: number;
  fhsize: number;
  flags: number;
  wsize: number;
  rsize: number;
  readdirsize: number;
  timeo: number;
  retrans: number;
  maxgrouplist: number;
  readahead: number;
  leaseterm: number;
  deadthresh: number;
  hostname: number;
  acregmin: number;
  acregmax: number;
  acdirmin: number;
  acdirmax: number;
  auth: number;
  deadtimeout: number;
}

declare class nfs_etype {
  constructor(init?: nfs_etype);
  count: number;
  selected: number;
  etypes: unknown /* const array */;
}

declare class nfs_fsid {
  constructor(init?: nfs_fsid);
  major: number;
  minor: number;
}

declare class iff_filter {
  constructor(init?: iff_filter);
  iff_cookie: interop.Pointer;
  iff_name: string | null;
  iff_protocol: number;
  iff_input: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number | null;
  iff_output: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number | null;
  iff_event: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => void | null;
  iff_ioctl: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: interop.PointerConvertible) => number | null;
  iff_detached: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
}

declare class ipsec_stats_param {
  constructor(init?: ipsec_stats_param);
  utsp_packets: number;
  utsp_bytes: number;
  utsp_errors: number;
}

declare class if_protolistreq {
  constructor(init?: if_protolistreq);
  ifpl_name: unknown /* const array */;
  ifpl_count: number;
  ifpl_reserved: number;
  ifpl_list: interop.Pointer;
}

declare class if_tdmreq {
  constructor(init?: if_tdmreq);
  iftdm_name: unknown /* const array */;
  iftdm_len: number;
  iftdm_table: interop.Pointer;
}

declare class if_clat46req {
  constructor(init?: if_clat46req);
  ifclat46_name: unknown /* const array */;
  ifclat46_addr: if_ipv6_address;
}

declare class if_nat64req {
  constructor(init?: if_nat64req);
  ifnat64_name: unknown /* const array */;
  ifnat64_prefixes: unknown /* const array */;
}

declare class if_netidreq {
  constructor(init?: if_netidreq);
  ifnetid_name: unknown /* const array */;
  ifnetid_len: number;
  ifnetid: unknown /* const array */;
}

declare class kev_dl_rrc_state {
  constructor(init?: kev_dl_rrc_state);
  link_data: net_event_data;
  rrc_state: number;
}

declare class if_agentidsreq {
  constructor(init?: if_agentidsreq);
  ifar_name: unknown /* const array */;
  ifar_count: number;
  ifar_uuids: interop.Pointer;
}

declare class if_agentidreq {
  constructor(init?: if_agentidreq);
  ifar_name: unknown /* const array */;
  ifar_uuid: unknown /* const array */;
}

declare class if_throttlereq {
  constructor(init?: if_throttlereq);
  ifthr_name: unknown /* const array */;
  ifthr_level: number;
}

declare class sync_args {
  constructor(init?: sync_args);
  dummy: number;
}

declare class kev_dl_node_absence {
  constructor(init?: kev_dl_node_absence);
  link_data: net_event_data;
  sin6_node_address: sockaddr_in6;
  sdl_node_address: sockaddr_dl;
}

declare class if_linkparamsreq {
  constructor(init?: if_linkparamsreq);
  iflpr_name: unknown /* const array */;
  iflpr_flags: number;
  iflpr_output_sched: number;
  iflpr_output_tbr_rate: number;
  iflpr_output_tbr_percent: number;
  iflpr_input_tbr_rate: number;
  iflpr_output_bw: if_bandwidths;
  iflpr_input_bw: if_bandwidths;
  iflpr_output_lt: if_latencies;
  iflpr_input_lt: if_latencies;
  iflpr_input_netem: if_netem_params;
  iflpr_output_netem: if_netem_params;
}

declare class kev_dl_link_quality_metric_data {
  constructor(init?: kev_dl_link_quality_metric_data);
  link_data: net_event_data;
  link_quality_metric: number;
}

declare class if_lim_perf_stat {
  constructor(init?: if_lim_perf_stat);
  lim_dl_max_bandwidth: number;
  lim_ul_max_bandwidth: number;
  lim_total_txpkts: number;
  lim_total_rxpkts: number;
  lim_total_retxpkts: number;
  lim_packet_loss_percent: number;
  lim_total_oopkts: number;
  lim_packet_ooo_percent: number;
  lim_rtt_variance: number;
  lim_rtt_average: number;
  lim_rtt_min: number;
  lim_conn_timeouts: number;
  lim_conn_attempts: number;
  lim_conn_timeout_percent: number;
  lim_bk_txpkts: number;
  lim_dl_detected: number;
  lim_ul_detected: number;
}

declare class if_tcp_ecn_perf_stat {
  constructor(init?: if_tcp_ecn_perf_stat);
  total_txpkts: number;
  total_rxmitpkts: number;
  total_rxpkts: number;
  total_oopkts: number;
  total_reorderpkts: number;
  rtt_avg: number;
  rtt_var: number;
  sack_episodes: number;
  rxmit_drop: number;
  rst_drop: number;
  oo_percent: number;
  reorder_percent: number;
  rxmit_percent: number;
}

declare class if_latencies {
  constructor(init?: if_latencies);
  eff_lt: number;
  max_lt: number;
}

declare class vlanreq {
  constructor(init?: vlanreq);
  vlr_parent: unknown /* const array */;
  vlr_tag: number;
}

declare class kev_netevent_apnfallbk_data {
  constructor(init?: kev_netevent_apnfallbk_data);
  epid: number;
  euuid: unknown /* const array */;
}

declare class route_old {
  constructor(init?: route_old);
  ro_rt: interop.Pointer;
  ro_flags: number;
  ro_dst: sockaddr;
}

declare class ifnet_attach_proto_param {
  constructor(init?: ifnet_attach_proto_param);
  demux_array: interop.Pointer;
  demux_count: number;
  input: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: string) => number | null;
  pre_output: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: string, p7: string) => number | null;
  event: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void | null;
  ioctl: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible) => number | null;
  detached: (p1: interop.PointerConvertible, p2: number) => number | null;
  resolve: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number) => number | null;
  send_arp: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible) => number | null;
}

declare class ifnet_init_params {
  constructor(init?: ifnet_init_params);
  uniqueid: interop.Pointer;
  uniqueid_len: number;
  name: string | null;
  unit: number;
  family: number;
  type: number;
  output: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  demux: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: interop.PointerConvertible) => number | null;
  add_proto: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number) => number | null;
  del_proto: (p1: interop.PointerConvertible, p2: number) => number | null;
  check_multi: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  framer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: string, p5: string) => number | null;
  softc: interop.Pointer;
  ioctl: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  set_bpf_tap: (p1: interop.PointerConvertible, p2: number, p3: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number) => number | null;
  detach: (p1: interop.PointerConvertible) => void | null;
  event: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  broadcast_addr: interop.Pointer;
  broadcast_len: number;
}

declare class pwrite_args {
  constructor(init?: pwrite_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  buf_l_: unknown /* const array */;
  buf: number;
  buf_r_: unknown /* const array */;
  nbyte_l_: unknown /* const array */;
  nbyte: number;
  nbyte_r_: unknown /* const array */;
  offset_l_: unknown /* const array */;
  offset: number;
  offset_r_: unknown /* const array */;
}

declare class ifnet_stat_increment_param {
  constructor(init?: ifnet_stat_increment_param);
  packets_in: number;
  bytes_in: number;
  errors_in: number;
  packets_out: number;
  bytes_out: number;
  errors_out: number;
  collisions: number;
  dropped: number;
}

declare class kev_msg {
  constructor(init?: kev_msg);
}

declare class settid_args {
  constructor(init?: settid_args);
  uid_l_: unknown /* const array */;
  uid: number;
  uid_r_: unknown /* const array */;
  gid_l_: unknown /* const array */;
  gid: number;
  gid_r_: unknown /* const array */;
}

declare class read_args {
  constructor(init?: read_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  cbuf_l_: unknown /* const array */;
  cbuf: number;
  cbuf_r_: unknown /* const array */;
  nbyte_l_: unknown /* const array */;
  nbyte: number;
  nbyte_r_: unknown /* const array */;
}

declare class bpf_setup_args {
  constructor(init?: bpf_setup_args);
  bsa_uuid: unknown /* const array */;
  bsa_ifname: unknown /* const array */;
}

declare class gpu_descriptor {
  constructor(init?: gpu_descriptor);
  gpu_id: number;
  gpu_max_domains: number;
}

declare class task_restartable_range_t {
  constructor(init?: task_restartable_range_t);
  location: number;
  length: number;
  recovery_offs: number;
  flags: number;
}

declare class ledger_limit_args {
  constructor(init?: ledger_limit_args);
  lla_name: unknown /* const array */;
  lla_limit: number;
  lla_refill_period: number;
}

declare class ledger_entry_info {
  constructor(init?: ledger_entry_info);
  lei_balance: number;
  lei_credit: number;
  lei_debit: number;
  lei_limit: number;
  lei_refill_period: number;
  lei_last_refill: number;
}

declare class ledger_info {
  constructor(init?: ledger_info);
  li_name: unknown /* const array */;
  li_id: number;
  li_entries: number;
}

declare class nfs_exphandle {
  constructor(init?: nfs_exphandle);
  nxh_version: number;
  nxh_fsid: number;
  nxh_expid: number;
  nxh_flags: number;
  nxh_reserved: number;
  nxh_fidlen: number;
}

declare class ecc_event_t {
  constructor(init?: ecc_event_t);
  version: interop.Enum<typeof ecc_version_t>;
  flags: interop.Enum<typeof ecc_flags_t>;
  physaddr: number;
  ce_count: number;
  vendor: number;
  reserved: unknown /* const array */;
}

declare class kern_work_interval_workload_id_args {
  constructor(init?: kern_work_interval_workload_id_args);
  wlida_flags: number;
  wlida_wicreate_flags: number;
  wlida_name: string | null;
  wlida_syscall_mask: unknown /* const array */;
}

declare class IOUSBHostIsochronousFrame {
  constructor(init?: IOUSBHostIsochronousFrame);
  status: number;
  requestCount: number;
  completeCount: number;
  reserved: number;
  timeStamp: UnsignedWide;
}

declare class kern_work_interval_args {
  constructor(init?: kern_work_interval_args);
  work_interval_id: number;
  start: number;
  finish: number;
  deadline: number;
  next_start: number;
  notify_flags: number;
  create_flags: number;
  urgency: number;
}

declare class work_interval {
  constructor(init?: work_interval);
}

declare class hvg_hcall_vmcore_file {
  constructor(init?: hvg_hcall_vmcore_file);
  tag: unknown /* const array */;
}

declare class hvg_hcall_output {
  constructor(init?: hvg_hcall_output);
  regs: unknown /* const array */;
}

declare class getsgroups_args {
  constructor(init?: getsgroups_args);
  setlen_l_: unknown /* const array */;
  setlen: number;
  setlen_r_: unknown /* const array */;
  guidset_l_: unknown /* const array */;
  guidset: number;
  guidset_r_: unknown /* const array */;
}

declare class priority_queue_sched_max {
  constructor(init?: priority_queue_sched_max);
  pq_root: interop.Pointer;
}

declare class priority_queue_sched_min {
  constructor(init?: priority_queue_sched_min);
  pq_root: interop.Pointer;
}

declare class fairplay_subsystem {
  constructor(init?: fairplay_subsystem);
  server: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  start: number;
  end: number;
  maxsize: number;
  reserved: number;
  routine: unknown /* const array */;
}

declare class priority_queue_deadline_max {
  constructor(init?: priority_queue_deadline_max);
  pq_root: interop.Pointer;
}

declare class priority_queue_deadline_min {
  constructor(init?: priority_queue_deadline_min);
  pq_root: interop.Pointer;
}

declare class priority_queue_max {
  constructor(init?: priority_queue_max);
  pq_root: interop.Pointer;
  pq_cmp_fn: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
}

declare class graftdmg_args {
  constructor(init?: graftdmg_args);
  dmg_fd_l_: unknown /* const array */;
  dmg_fd: number;
  dmg_fd_r_: unknown /* const array */;
  mountdir_l_: unknown /* const array */;
  mountdir: number;
  mountdir_r_: unknown /* const array */;
  graft_type_l_: unknown /* const array */;
  graft_type: number;
  graft_type_r_: unknown /* const array */;
  gda_l_: unknown /* const array */;
  gda: number;
  gda_r_: unknown /* const array */;
}

declare class priority_queue_min {
  constructor(init?: priority_queue_min);
  pq_root: interop.Pointer;
  pq_cmp_fn: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
}

declare class priority_queue_entry_stable {
  constructor(init?: priority_queue_entry_stable);
  next: interop.Pointer;
  prev: interop.Pointer;
  key: number;
  child: number;
  stamp: number;
}

declare class priority_queue_entry_sched {
  constructor(init?: priority_queue_entry_sched);
  next: interop.Pointer;
  prev: interop.Pointer;
  key: number;
  child: number;
}

declare class priority_queue_entry_deadline {
  constructor(init?: priority_queue_entry_deadline);
  next: interop.Pointer;
  prev: interop.Pointer;
  __key: number;
  child: number;
  deadline: number;
}

declare class priority_queue_entry {
  constructor(init?: priority_queue_entry);
  next: interop.Pointer;
  prev: interop.Pointer;
  __key: number;
  child: number;
}

declare class kpc_running_remote {
  constructor(init?: kpc_running_remote);
  classes: number;
  cfg_target_mask: number;
  cfg_state_mask: number;
}

declare class kpc_config_remote {
  constructor(init?: kpc_config_remote);
  classes: number;
  configv: interop.Pointer;
  pmc_mask: number;
  secure: boolean;
}

declare class cpu_data {
  constructor(init?: cpu_data);
}

declare class backtrace_user_info {
  constructor(init?: backtrace_user_info);
  btui_info: interop.Enum<typeof backtrace_info_t>;
  btui_error: number;
  btui_async_start_index: number;
  btui_async_frame_addr: number;
  btui_next_frame_addr: number;
}

declare class socd_client_trace_entry_t {
  constructor(init?: socd_client_trace_entry_t);
  timestamp: number;
  debugid: number;
  arg1: number;
  arg2: number;
  arg3: number;
  arg4: number;
}

declare class OSKextGrabPgoStruct {
  constructor(init?: OSKextGrabPgoStruct);
  metadata: boolean;
  pSize: interop.Pointer;
  pBuffer: string | null;
  bufferSize: number;
  err: number;
  list_head: list_head;
}

declare class hv_callbacks_t {
  constructor(init?: hv_callbacks_t);
  dispatch: (p1: interop.PointerConvertible) => void | null;
  preempt: (p1: interop.PointerConvertible) => void | null;
  suspend: () => void | null;
  thread_destroy: (p1: interop.PointerConvertible) => void | null;
  task_destroy: (p1: interop.PointerConvertible) => void | null;
  volatile_state: (p1: interop.PointerConvertible, p2: number) => void | null;
  resume: () => void | null;
  memory_pressure: () => void | null;
}

declare class hv_trap_table_t {
  constructor(init?: hv_trap_table_t);
  traps: interop.Pointer;
  trap_count: number;
}

declare class thread_group {
  constructor(init?: thread_group);
}

declare class launch_constraint_data {
  constructor(init?: launch_constraint_data);
  launch_type: interop.Enum<typeof cs_launch_type_t>;
}

declare class __SC_Scatter {
  constructor(init?: __SC_Scatter);
  count: number;
  base: number;
  targetOffset: number;
  spare: number;
}

declare class __SC_GenericBlob {
  constructor(init?: __SC_GenericBlob);
  magic: number;
  length: number;
  data: interop.Pointer;
}

declare class __SC_SuperBlob {
  constructor(init?: __SC_SuperBlob);
  magic: number;
  length: number;
  count: number;
  index: interop.Pointer;
}

declare class __BlobIndex {
  constructor(init?: __BlobIndex);
  type: number;
  offset: number;
}

declare class __throttle_info_handle {
  constructor(init?: __throttle_info_handle);
}

declare class debug_syscall_reject_config_args {
  constructor(init?: debug_syscall_reject_config_args);
  packed_selectors1_l_: unknown /* const array */;
  packed_selectors1: number;
  packed_selectors1_r_: unknown /* const array */;
  packed_selectors2_l_: unknown /* const array */;
  packed_selectors2: number;
  packed_selectors2_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
}

declare class DeviceQualifierDescriptor {
  constructor(init?: DeviceQualifierDescriptor);
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

declare class EFI_SYSTEM_TABLE_32 {
  constructor(init?: EFI_SYSTEM_TABLE_32);
  Hdr: EFI_TABLE_HEADER;
  FirmwareVendor: number;
  FirmwareRevision: number;
  ConsoleInHandle: number;
  ConIn: number;
  ConsoleOutHandle: number;
  ConOut: number;
  StandardErrorHandle: number;
  StdErr: number;
  RuntimeServices: number;
  BootServices: number;
  NumberOfTableEntries: number;
  ConfigurationTable: number;
}

declare class __Reply__vfs_resolve_file_t {
  constructor(init?: __Reply__vfs_resolve_file_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class setprivexec_args {
  constructor(init?: setprivexec_args);
  flag_l_: unknown /* const array */;
  flag: number;
  flag_r_: unknown /* const array */;
}

declare class tcp_notify_ack_complete {
  constructor(init?: tcp_notify_ack_complete);
  notify_pending: number;
  notify_complete_count: number;
  notify_complete_id: unknown /* const array */;
}

declare class daleipc_downlink_controller {
  constructor(init?: daleipc_downlink_controller);
}

declare class __Reply__nspace_handle_t {
  constructor(init?: __Reply__nspace_handle_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
  handler_error: number;
}

declare class fsctl_args {
  constructor(init?: fsctl_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  cmd_l_: unknown /* const array */;
  cmd: number;
  cmd_r_: unknown /* const array */;
  data_l_: unknown /* const array */;
  data: number;
  data_r_: unknown /* const array */;
  options_l_: unknown /* const array */;
  options: number;
  options_r_: unknown /* const array */;
}

declare class getrusage_args {
  constructor(init?: getrusage_args);
  who_l_: unknown /* const array */;
  who: number;
  who_r_: unknown /* const array */;
  rusage_l_: unknown /* const array */;
  rusage: number;
  rusage_r_: unknown /* const array */;
}

declare class acct_args {
  constructor(init?: acct_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
}

declare class airship_acipc_memregion {
  constructor(init?: airship_acipc_memregion);
}

declare class user32_itimerval {
  constructor(init?: user32_itimerval);
  it_interval: user32_timeval;
  it_value: user32_timeval;
}

declare class user64_timex {
  constructor(init?: user64_timex);
  modes: number;
  offset: number;
  freq: number;
  maxerror: number;
  esterror: number;
  status: number;
  constant: number;
  precision: number;
  tolerance: number;
  ppsfreq: number;
  jitter: number;
  shift: number;
  stabil: number;
  jitcnt: number;
  calcnt: number;
  errcnt: number;
  stbcnt: number;
}

declare class setitimer_args {
  constructor(init?: setitimer_args);
  which_l_: unknown /* const array */;
  which: number;
  which_r_: unknown /* const array */;
  itv_l_: unknown /* const array */;
  itv: number;
  itv_r_: unknown /* const array */;
  oitv_l_: unknown /* const array */;
  oitv: number;
  oitv_r_: unknown /* const array */;
}

declare class if_interface_state {
  constructor(init?: if_interface_state);
  valid_bitmask: number;
  rrc_state: number;
  lqm_state: number;
  interface_availability: number;
}

declare class unnamed_11273710022804791198 {
  constructor(init?: unnamed_11273710022804791198);
  connectionHandle: number;
  usedFeatures: BluetoothHCISupportedFeatures;
}

declare class unnamed_10173792744354485346 {
  constructor(init?: unnamed_10173792744354485346);
  handle: number;
  qualityValue: number;
}

declare class OpaqueDTPropertyIterator {
  constructor(init?: OpaqueDTPropertyIterator);
  entry: interop.Pointer;
  currentProperty: interop.Pointer;
  currentIndex: number;
}

declare class if_bandwidths {
  constructor(init?: if_bandwidths);
  eff_bw: number;
  max_bw: number;
}

declare class unnamed_9614755327984743019 {
  constructor(init?: unnamed_9614755327984743019);
  seqNum: bigint;
  wrIndex: bigint;
  generation: bigint;
  rstStatus: bigint;
  wrStatus: bigint;
}

declare class AsyncReportCall {
  constructor(init?: AsyncReportCall);
}

declare class nfs_user_stat_user_rec {
  constructor(init?: nfs_user_stat_user_rec);
  rec_type: number;
  uid: number;
  sock: sockaddr_storage;
  ops: number;
  bytes_read: number;
  bytes_written: number;
  tm_start: number;
  tm_last: number;
}

declare class format_op {
  constructor(init?: format_op);
  df_buf: string | null;
  df_count: number;
  df_startblk: number;
  df_reg: unknown /* const array */;
}

declare class xnu_saved_registers_t {
  constructor(init?: xnu_saved_registers_t);
  fp: number;
  lr: number;
  pc: number;
  sp: number;
}

declare class flistxattr_args {
  constructor(init?: flistxattr_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  namebuf_l_: unknown /* const array */;
  namebuf: number;
  namebuf_r_: unknown /* const array */;
  bufsize_l_: unknown /* const array */;
  bufsize: number;
  bufsize_r_: unknown /* const array */;
  options_l_: unknown /* const array */;
  options: number;
  options_r_: unknown /* const array */;
}

declare class unnamed_15009144603172126793 {
  constructor(init?: unnamed_15009144603172126793);
  iommu_id: number;
  iommu_retype_params: number;
}

declare class IOFramebufferNotificationNotify {
  constructor(init?: IOFramebufferNotificationNotify);
  event: number;
  info: interop.Pointer;
}

declare class sem_post_args {
  constructor(init?: sem_post_args);
  sem_l_: unknown /* const array */;
  sem: number;
  sem_r_: unknown /* const array */;
}

declare class IOUSBHostHIDReportDescriptor {
  constructor(init?: IOUSBHostHIDReportDescriptor);
  hidDescriptorType: number;
  hidDescriptorLengthLo: number;
  hidDescriptorLengthHi: number;
}

declare class __pthread_sigmask_args {
  constructor(init?: __pthread_sigmask_args);
  how_l_: unknown /* const array */;
  how: number;
  how_r_: unknown /* const array */;
  set_l_: unknown /* const array */;
  set: number;
  set_r_: unknown /* const array */;
  oset_l_: unknown /* const array */;
  oset: number;
  oset_r_: unknown /* const array */;
}

declare class __Reply__audit_analytics_t {
  constructor(init?: __Reply__audit_analytics_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class if_tcp_ecn_stat {
  constructor(init?: if_tcp_ecn_stat);
  timestamp: number;
  ecn_client_setup: number;
  ecn_server_setup: number;
  ecn_client_success: number;
  ecn_server_success: number;
  ecn_peer_nosupport: number;
  ecn_syn_lost: number;
  ecn_synack_lost: number;
  ecn_recv_ce: number;
  ecn_recv_ece: number;
  ecn_conn_recv_ce: number;
  ecn_conn_recv_ece: number;
  ecn_conn_plnoce: number;
  ecn_conn_plce: number;
  ecn_conn_noplce: number;
  ecn_fallback_synloss: number;
  ecn_fallback_reorder: number;
  ecn_fallback_ce: number;
  ecn_off_conn: number;
  ecn_total_conn: number;
  ecn_fallback_droprst: number;
  ecn_fallback_droprxmt: number;
  ecn_fallback_synrst: number;
  ecn_on: if_tcp_ecn_perf_stat;
  ecn_off: if_tcp_ecn_perf_stat;
}

declare class _csops_cdhash {
  constructor(init?: _csops_cdhash);
  hash: unknown /* const array */;
  type: number;
}

declare class EFI_TIME {
  constructor(init?: EFI_TIME);
  Year: number;
  Month: number;
  Day: number;
  Hour: number;
  Minute: number;
  Second: number;
  Pad1: number;
  Nanosecond: number;
  TimeZone: number;
  Daylight: number;
  Pad2: number;
}

declare class __pthread_chdir_args {
  constructor(init?: __pthread_chdir_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
}

declare class __Request__mach_gss_init_sec_context_v3_t {
  constructor(init?: __Request__mach_gss_init_sec_context_v3_t);
  Head: mach_msg_header_t;
  msgh_body: mach_msg_body_t;
  intoken: mach_msg_ool_descriptor_t;
  clnt_princ: mach_msg_ool_descriptor_t;
  svc_princ: mach_msg_ool_descriptor_t;
  NDR: NDR_record_t;
  mech: interop.Enum<typeof gssd_mechtype>;
  intokenCnt: number;
  uid: number;
  clnt_nt: interop.Enum<typeof gssd_nametype>;
  clnt_princCnt: number;
  svc_nt: interop.Enum<typeof gssd_nametype>;
  svc_princCnt: number;
  flags: number;
  etypesCnt: number;
  etypes: unknown /* const array */;
  gssd_flags: number;
  context: number;
  cred_handle: number;
}

declare class getdirentriesattr_args {
  constructor(init?: getdirentriesattr_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  alist_l_: unknown /* const array */;
  alist: number;
  alist_r_: unknown /* const array */;
  buffer_l_: unknown /* const array */;
  buffer: number;
  buffer_r_: unknown /* const array */;
  buffersize_l_: unknown /* const array */;
  buffersize: number;
  buffersize_r_: unknown /* const array */;
  count_l_: unknown /* const array */;
  count: number;
  count_r_: unknown /* const array */;
  basep_l_: unknown /* const array */;
  basep: number;
  basep_r_: unknown /* const array */;
  newstate_l_: unknown /* const array */;
  newstate: number;
  newstate_r_: unknown /* const array */;
  options_l_: unknown /* const array */;
  options: number;
  options_r_: unknown /* const array */;
}

declare class fchflags_args {
  constructor(init?: fchflags_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
}

declare class sptm_guest_dispatch_t {
  constructor(init?: sptm_guest_dispatch_t);
  stage2_root_pt: number;
  vtcr: number;
  hcr: number;
  hacr: number;
  hcrx: number;
  sp_el0: number;
  sp_el1: number;
  mdscr_el1: number;
  tpidr_el1: number;
  tpidr_el0: number;
  tpidrro_el0: number;
  par_el1: number;
  csselr_el1: number;
  afpcr_el0: number;
  scxtnum_el0: number;
  neon: sptm_guest_dispatch_neon_t;
  gpr: sptm_guest_dispatch_gpr_t;
  sme: sptm_guest_dispatch_sme_t;
  vec: sptm_guest_dispatch_vec_t;
  cpsr: number;
  pc: number;
  apstate: number;
  flush_local_tlb: boolean;
}

declare class IOHIDDigitizerTouchData {
  constructor(init?: IOHIDDigitizerTouchData);
}

declare class workq_kernreturn_args {
  constructor(init?: workq_kernreturn_args);
  options_l_: unknown /* const array */;
  options: number;
  options_r_: unknown /* const array */;
  item_l_: unknown /* const array */;
  item: number;
  item_r_: unknown /* const array */;
  affinity_l_: unknown /* const array */;
  affinity: number;
  affinity_r_: unknown /* const array */;
  prio_l_: unknown /* const array */;
  prio: number;
  prio_r_: unknown /* const array */;
}

declare class __Reply__arcade_upcall_t {
  constructor(init?: __Reply__arcade_upcall_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
  should_kill: number;
}

declare class readv_nocancel_args {
  constructor(init?: readv_nocancel_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  iovp_l_: unknown /* const array */;
  iovp: number;
  iovp_r_: unknown /* const array */;
  iovcnt_l_: unknown /* const array */;
  iovcnt: number;
  iovcnt_r_: unknown /* const array */;
}

declare class unnamed_5578380239689998826 {
  constructor(init?: unnamed_5578380239689998826);
  connectionHandle: number;
  deviceAddress: BluetoothDeviceAddress;
  role: number;
}

declare class ledger_entry_info_v2 {
  constructor(init?: ledger_entry_info_v2);
  lei_balance: number;
  lei_credit: number;
  lei_debit: number;
  lei_limit: number;
  lei_refill_period: number;
  lei_last_refill: number;
  lei_lifetime_max: number;
  lei_reserved: unknown /* const array */;
}

declare class stack_snapshot_with_config_args {
  constructor(init?: stack_snapshot_with_config_args);
  stackshot_config_version_l_: unknown /* const array */;
  stackshot_config_version: number;
  stackshot_config_version_r_: unknown /* const array */;
  stackshot_config_l_: unknown /* const array */;
  stackshot_config: number;
  stackshot_config_r_: unknown /* const array */;
  stackshot_config_size_l_: unknown /* const array */;
  stackshot_config_size: number;
  stackshot_config_size_r_: unknown /* const array */;
}

declare class kd_cpumap_header {
  constructor(init?: kd_cpumap_header);
  version_no: number;
  cpu_count: number;
}

declare class flock_args {
  constructor(init?: flock_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  how_l_: unknown /* const array */;
  how: number;
  how_r_: unknown /* const array */;
}

declare class unnamed_4332635779667043713 {
  constructor(init?: unnamed_4332635779667043713);
  deviceAddress: BluetoothDeviceAddress;
  deviceName: unknown /* const array */;
}

declare class nd_ifinfo {
  constructor(init?: nd_ifinfo);
  linkmtu: number;
  maxmtu: number;
  basereachable: number;
  reachable: number;
  retrans: number;
  flags: number;
  recalctm: number;
  chlim: number;
  receivedra: number;
  randomseed0: unknown /* const array */;
  randomseed1: unknown /* const array */;
  randomid: unknown /* const array */;
}

declare class unnamed_17926074055869263541 {
  constructor(init?: unnamed_17926074055869263541);
  connectionHandle: number;
  flags: number;
  flowDirection: number;
  serviceType: number;
  tokenRate: number;
  tokenBucketSize: number;
  peakBandwidth: number;
  accessLatency: number;
}

declare class AirshipDaleBasebandErrorInfo {
  constructor(init?: AirshipDaleBasebandErrorInfo);
  error: number;
  param1: number;
  param2: number;
}

declare class fmount_args {
  constructor(init?: fmount_args);
  type_l_: unknown /* const array */;
  type: number;
  type_r_: unknown /* const array */;
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
  data_l_: unknown /* const array */;
  data: number;
  data_r_: unknown /* const array */;
}

declare class info_tuple {
  constructor(init?: info_tuple);
  itpl_proto: number;
  itpl_localaddr: unnamed_17232738562495190869;
  itpl_remoteaddr: unnamed_3012503987243038479;
}

declare class chain_len_stats {
  constructor(init?: chain_len_stats);
  cls_one: number;
  cls_two: number;
  cls_three: number;
  cls_four: number;
  cls_five_or_more: number;
}

declare class bt_params {
  constructor(init?: bt_params);
  rate: number;
  base_local_ts: number;
  base_remote_ts: number;
}

declare class getpid_args {
  constructor(init?: getpid_args);
  dummy: number;
}

declare class __Reply__sysdiagnose_notification_with_audit_token_t {
  constructor(init?: __Reply__sysdiagnose_notification_with_audit_token_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class IOBlockStorageWorkEndArgs {
  constructor(init?: IOBlockStorageWorkEndArgs);
  postCompletionTime: number;
}

declare class system_override_args {
  constructor(init?: system_override_args);
  timeout_l_: unknown /* const array */;
  timeout: number;
  timeout_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
}

declare class fchownat_args {
  constructor(init?: fchownat_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  uid_l_: unknown /* const array */;
  uid: number;
  uid_r_: unknown /* const array */;
  gid_l_: unknown /* const array */;
  gid: number;
  gid_r_: unknown /* const array */;
  flag_l_: unknown /* const array */;
  flag: number;
  flag_r_: unknown /* const array */;
}

declare class in6_prefix {
  constructor(init?: in6_prefix);
  prefix: sockaddr_in6;
  raflags: prf_ra;
  prefixlen: number;
  origin: number;
  vltime: number;
  pltime: number;
  expire: number;
  flags: number;
  refcnt: number;
  if_index: number;
  advrtrs: number;
}

declare class IOExternalMethodDispatch2022 {
  constructor(init?: IOExternalMethodDispatch2022);
  function: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  checkScalarInputCount: number;
  checkStructureInputSize: number;
  checkScalarOutputCount: number;
  checkStructureOutputSize: number;
  allowAsync: number;
  checkEntitlement: string | null;
}

declare class EFI_RUNTIME_SERVICES_32 {
  constructor(init?: EFI_RUNTIME_SERVICES_32);
  Hdr: EFI_TABLE_HEADER;
  GetTime: number;
  SetTime: number;
  GetWakeupTime: number;
  SetWakeupTime: number;
  SetVirtualAddressMap: number;
  ConvertPointer: number;
  GetVariable: number;
  GetNextVariableName: number;
  SetVariable: number;
  GetNextHighMonotonicCount: number;
  ResetSystem: number;
}

declare class IOExternalMethodDispatch {
  constructor(init?: IOExternalMethodDispatch);
  function: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  checkScalarInputCount: number;
  checkStructureInputSize: number;
  checkScalarOutputCount: number;
  checkStructureOutputSize: number;
}

declare class IOExternalTrap {
  constructor(init?: IOExternalTrap);
  object: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  func: number;
}

declare class IOExternalMethod {
  constructor(init?: IOExternalMethod);
  object: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  func: number;
  flags: number;
  count0: number;
  count1: number;
}

declare class unnamed_16523366994273171122 {
  constructor(init?: unnamed_16523366994273171122);
  connectionHandle: number;
  setupParams: BluetoothHCIQualityOfServiceSetupParams;
}

declare class IOInterruptSourcePrivate {
  constructor(init?: IOInterruptSourcePrivate);
}

declare class write_nocancel_args {
  constructor(init?: write_nocancel_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  cbuf_l_: unknown /* const array */;
  cbuf: number;
  cbuf_r_: unknown /* const array */;
  nbyte_l_: unknown /* const array */;
  nbyte: number;
  nbyte_r_: unknown /* const array */;
}

declare class IOServiceStateChangeVars {
  constructor(init?: IOServiceStateChangeVars);
}

declare class IOReportChannelList {
  constructor(init?: IOReportChannelList);
  nchannels: number;
  channels: interop.Pointer;
}

declare class IOReportChannel {
  constructor(init?: IOReportChannel);
  channel_id: number;
  channel_type: IOReportChannelType;
}

declare class mkfifo_args {
  constructor(init?: mkfifo_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  mode_l_: unknown /* const array */;
  mode: number;
  mode_r_: unknown /* const array */;
}

declare class IOReportChannelType {
  constructor(init?: IOReportChannelType);
  report_format: number;
  reserved: number;
  categories: number;
  nelements: number;
  element_idx: number;
}

declare class IOStateReportValues {
  constructor(init?: IOStateReportValues);
  state_id: number;
  intransitions: number;
  upticks: number;
  last_intransition: number;
}

declare class exit_args {
  constructor(init?: exit_args);
  rval_l_: unknown /* const array */;
  rval: number;
  rval_r_: unknown /* const array */;
}

declare class IOSimpleArrayReportValues {
  constructor(init?: IOSimpleArrayReportValues);
  simple_values: unknown /* const array */;
}

declare class IOTrackingCallSiteInfo {
  constructor(init?: IOTrackingCallSiteInfo);
  count: number;
  addressPID: number;
  address: number;
  size: unknown /* const array */;
  btPID: number;
  bt: unknown /* const array */;
}

declare class IODMAMapPageList {
  constructor(init?: IODMAMapPageList);
  pageOffset: number;
  pageListCount: number;
  pageList: interop.Pointer;
}

declare class IODMAMapSpecification {
  constructor(init?: IODMAMapSpecification);
  alignment: number;
  device: interop.Pointer;
  options: number;
  numAddressBits: number;
  resvA: unknown /* const array */;
  resvB: unknown /* const array */;
}

declare class __Request__mach_notify_port_deleted_t {
  constructor(init?: __Request__mach_notify_port_deleted_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  name: number;
}

declare class _IOSimpleLock {
  constructor(init?: _IOSimpleLock);
}

declare class _IORWLock {
  constructor(init?: _IORWLock);
}

declare class _IOLock {
  constructor(init?: _IOLock);
}

declare class ml_cpu_info {
  constructor(init?: ml_cpu_info);
  vector_unit: number;
  cache_line_size: number;
  l1_icache_size: number;
  l1_dcache_size: number;
  l2_settings: number;
  l2_cache_size: number;
  l3_settings: number;
  l3_cache_size: number;
}

declare class ex_cb_state_t {
  constructor(init?: ex_cb_state_t);
  far: number;
}

declare class __lck_rw_t__ {
  constructor(init?: __lck_rw_t__);
}

declare class _lck_grp_ {
  constructor(init?: _lck_grp_);
}

declare class queue_entry {
  constructor(init?: queue_entry);
  next: interop.Pointer;
  prev: interop.Pointer;
}

declare class __lck_mtx_t__ {
  constructor(init?: __lck_mtx_t__);
}

declare class hw_spin_policy {
  constructor(init?: hw_spin_policy);
}

declare class mach_assert_default {
  constructor(init?: mach_assert_default);
  hdr: mach_assert_hdr;
  expr: string | null;
}

declare class mach_assert_hdr {
  constructor(init?: mach_assert_hdr);
  type: interop.Enum<typeof mach_assert_type_t>;
  lineno: number;
  filename: string | null;
}

declare class smrq_tailq_head {
  constructor(init?: smrq_tailq_head);
  first: __smrq_link_t;
  last: interop.Pointer;
}

declare class smrq_list_head {
  constructor(init?: smrq_list_head);
  first: __smrq_link_t;
}

declare class select_args {
  constructor(init?: select_args);
  nd_l_: unknown /* const array */;
  nd: number;
  nd_r_: unknown /* const array */;
  in_l_: unknown /* const array */;
  in: number;
  in_r_: unknown /* const array */;
  ou_l_: unknown /* const array */;
  ou: number;
  ou_r_: unknown /* const array */;
  ex_l_: unknown /* const array */;
  ex: number;
  ex_r_: unknown /* const array */;
  tv_l_: unknown /* const array */;
  tv: number;
  tv_r_: unknown /* const array */;
}

declare class smrq_slist_head {
  constructor(init?: smrq_slist_head);
  first: __smrq_slink_t;
}

declare class __smrq_link_t {
  constructor(init?: __smrq_link_t);
  __smr_ptr: interop.Pointer;
}

declare class smrq_slink {
  constructor(init?: smrq_slink);
  next: __smrq_slink_t;
}

declare class __smrq_slink_t {
  constructor(init?: __smrq_slink_t);
  __smr_ptr: interop.Pointer;
}

declare class smr_node {
  constructor(init?: smr_node);
  smrn_next: interop.Pointer;
  XNU_PTRAUTH_SIGNED_FUNCTION_PTR: unknown /* void (*())(struct smr_node *) (CXTypeKind: 110) */;
}

declare class efi_aurr_extended_panic_log {
  constructor(init?: efi_aurr_extended_panic_log);
  efi_aurr_extended_log_buf: unknown /* const array */;
  efi_aurr_log_tail: number;
  efi_aurr_log_head: number;
}

declare class efi_aurr_panic_header {
  constructor(init?: efi_aurr_panic_header);
  efi_aurr_magic: number;
  efi_aurr_crc: number;
  efi_aurr_version: number;
  efi_aurr_reset_cause: number;
  efi_aurr_reset_log_offset: number;
  efi_aurr_reset_log_len: number;
  efi_aurr_panic_data: interop.Pointer;
}

declare class _dyld_cache_image_text_info {
  constructor(init?: _dyld_cache_image_text_info);
  uuid: unknown /* const array */;
  loadAddress: number;
  textSegmentSize: number;
  pathOffset: number;
}

declare class task_snapshot {
  constructor(init?: task_snapshot);
  snapshot_magic: number;
  pid: number;
  uniqueid: number;
  user_time_in_terminated_threads: number;
  system_time_in_terminated_threads: number;
  shared_cache_identifier: unknown /* const array */;
  shared_cache_slide: number;
  nloadinfos: number;
  suspend_count: number;
  task_size: number;
  faults: number;
  pageins: number;
  cow_faults: number;
  ss_flags: number;
  p_start_sec: number;
  p_start_usec: number;
  p_comm: unknown /* const array */;
  was_throttled: number;
  did_throttle: number;
  latency_qos: number;
  disk_reads_count: number;
  disk_reads_size: number;
  disk_writes_count: number;
  disk_writes_size: number;
  io_priority_count: unknown /* const array */;
  io_priority_size: unknown /* const array */;
  paging_count: number;
  paging_size: number;
  non_paging_count: number;
  non_paging_size: number;
  data_count: number;
  data_size: number;
  metadata_count: number;
  metadata_size: number;
  donating_pid_count: number;
}

declare class unnamed_1464565478962035867 {
  constructor(init?: unnamed_1464565478962035867);
  deviceAddress: BluetoothDeviceAddress;
  linkKey: BluetoothKey;
  keyType: number;
}

declare class cpuid_cache_desc_t {
  constructor(init?: cpuid_cache_desc_t);
  value: number;
  type: interop.Enum<typeof cache_type_t>;
  size: number;
  linesize: number;
  description: string | null;
}

declare class kev_dl_issues {
  constructor(init?: kev_dl_issues);
  link_data: net_event_data;
  modid: unknown /* const array */;
  timestamp: number;
  info: unknown /* const array */;
}

declare class _stickyKeys_ModifierInfo {
  constructor(init?: _stickyKeys_ModifierInfo);
  key: number;
  state: number;
  leftModBit: number;
}

declare class nfs_stateid {
  constructor(init?: nfs_stateid);
  seqid: number;
  other: unknown /* const array */;
}

declare class if_data_extended {
  constructor(init?: if_data_extended);
  ifi_alignerrs: number;
  ifi_dt_bytes: number;
  ifi_fpackets: number;
  ifi_fbytes: number;
  reserved: unknown /* const array */;
}

declare class do_notify_subsystem {
  constructor(init?: do_notify_subsystem);
  server: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  start: number;
  end: number;
  maxsize: number;
  reserved: number;
  routine: unknown /* const array */;
}

declare class fdatasync_args {
  constructor(init?: fdatasync_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
}

declare class chflags_args {
  constructor(init?: chflags_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
}

declare class __semwait_signal_args {
  constructor(init?: __semwait_signal_args);
  cond_sem_l_: unknown /* const array */;
  cond_sem: number;
  cond_sem_r_: unknown /* const array */;
  mutex_sem_l_: unknown /* const array */;
  mutex_sem: number;
  mutex_sem_r_: unknown /* const array */;
  timeout_l_: unknown /* const array */;
  timeout: number;
  timeout_r_: unknown /* const array */;
  relative_l_: unknown /* const array */;
  relative: number;
  relative_r_: unknown /* const array */;
  tv_sec_l_: unknown /* const array */;
  tv_sec: number;
  tv_sec_r_: unknown /* const array */;
  tv_nsec_l_: unknown /* const array */;
  tv_nsec: number;
  tv_nsec_r_: unknown /* const array */;
}

declare class __Reply__coalition_notification_t {
  constructor(init?: __Reply__coalition_notification_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class IOUSBHostInterface_LocalIVars {
  constructor(init?: IOUSBHostInterface_LocalIVars);
}

declare class HIDValueCapabilities {
  constructor(init?: HIDValueCapabilities);
  usagePage: number;
  reportID: number;
  bitField: number;
  collection: number;
  collectionUsage: number;
  collectionUsagePage: number;
  isRange: number;
  isStringRange: number;
  isDesignatorRange: number;
  isAbsolute: number;
  bitSize: number;
  reportCount: number;
  logicalMin: number;
  logicalMax: number;
  physicalMin: number;
  physicalMax: number;
  unitExponent: number;
  units: number;
  startBit: number;
  pbVersion: number;
  u: unnamed_6174747975915617679;
}

declare class kev_mptcp_data {
  constructor(init?: kev_mptcp_data);
  value: number;
}

declare class ifnet_demux_desc {
  constructor(init?: ifnet_demux_desc);
  type: number;
  data: interop.Pointer;
  datalen: number;
}

declare class unnamed_6365138206929857170 {
  constructor(init?: unnamed_6365138206929857170);
  count: number;
  codes: interop.Pointer;
}

declare class _cr0 {
  constructor(init?: _cr0);
  pe: number;
  mp: number;
  em: number;
  ts: number;
  : number;
  ne: number;
  : number;
  wp: number;
  : number;
  am: number;
  : number;
  nw: number;
  cd: number;
  pg: number;
}

declare class bsdthread_create_args {
  constructor(init?: bsdthread_create_args);
  func_l_: unknown /* const array */;
  func: number;
  func_r_: unknown /* const array */;
  func_arg_l_: unknown /* const array */;
  func_arg: number;
  func_arg_r_: unknown /* const array */;
  stack_l_: unknown /* const array */;
  stack: number;
  stack_r_: unknown /* const array */;
  pthread_l_: unknown /* const array */;
  pthread: number;
  pthread_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
}

declare class __Reply__mach_notify_no_senders_t {
  constructor(init?: __Reply__mach_notify_no_senders_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class access_args {
  constructor(init?: access_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
}

declare class IOUSBHostIsochronousTransactionCompletion {
  constructor(init?: IOUSBHostIsochronousTransactionCompletion);
  owner: interop.Pointer;
  action: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => void | null;
  parameter: interop.Pointer;
}

declare class pid_resume_args {
  constructor(init?: pid_resume_args);
  pid_l_: unknown /* const array */;
  pid: number;
  pid_r_: unknown /* const array */;
}

declare class write_args {
  constructor(init?: write_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  cbuf_l_: unknown /* const array */;
  cbuf: number;
  cbuf_r_: unknown /* const array */;
  nbyte_l_: unknown /* const array */;
  nbyte: number;
  nbyte_r_: unknown /* const array */;
}

declare class pivot_root_args {
  constructor(init?: pivot_root_args);
  new_rootfs_path_before_l_: unknown /* const array */;
  new_rootfs_path_before: number;
  new_rootfs_path_before_r_: unknown /* const array */;
  old_rootfs_path_after_l_: unknown /* const array */;
  old_rootfs_path_after: number;
  old_rootfs_path_after_r_: unknown /* const array */;
}

declare class unnamed_10137855456911653764 {
  constructor(init?: unnamed_10137855456911653764);
  connectionHandle: number;
  enable: number;
}

declare class ml_processor_info {
  constructor(init?: ml_processor_info);
  cpu_id: interop.Pointer;
  start_paddr: number;
  supports_nap: number;
  platform_cache_dispatch: interop.Pointer;
  time_base_enable: (p1: interop.PointerConvertible, p2: number) => void | null;
  processor_idle: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void | null;
  idle_tickle: interop.Pointer;
  idle_timer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  idle_timer_refcon: interop.Pointer;
  powergate_stub_addr: number;
  powergate_stub_length: number;
  powergate_latency: number;
  platform_error_handler: (p1: interop.PointerConvertible, p2: number) => void | null;
  regmap_paddr: number;
  phys_id: number;
  log_id: number;
  l2_access_penalty: number;
  cluster_id: number;
  cluster_type: interop.Enum<typeof cluster_type_t>;
  l2_cache_id: number;
  l2_cache_size: number;
  l3_cache_id: number;
  l3_cache_size: number;
}

declare class IOCircularDataQueueDescription {
  constructor(init?: IOCircularDataQueueDescription);
  sentinel: number;
  allocMemSize: number;
  entryDataSize: number;
  memorySize: number;
  numEntries: number;
  dataSize: number;
  padding: number;
}

declare class umask_args {
  constructor(init?: umask_args);
  newmask_l_: unknown /* const array */;
  newmask: number;
  newmask_r_: unknown /* const array */;
}

declare class unnamed_1650381945006561587 {
  constructor(init?: unnamed_1650381945006561587);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  offset: number;
  size: number;
  abort_cond: number;
}

declare class DeviceCapabilityDescriptor {
  constructor(init?: DeviceCapabilityDescriptor);
  bLength: number;
  bDescriptorType: number;
  bDevCapabilityType: number;
}

declare class if_qstatsreq {
  constructor(init?: if_qstatsreq);
  ifqr_name: unknown /* const array */;
  ifqr_grp_idx: number;
  ifqr_slot: number;
  ifqr_buf: interop.Pointer;
  ifqr_len: number;
}

declare class memory_error_notification_subsystem {
  constructor(init?: memory_error_notification_subsystem);
  server: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  start: number;
  end: number;
  maxsize: number;
  reserved: number;
  routine: unknown /* const array */;
}

declare class ptrace_args {
  constructor(init?: ptrace_args);
  req_l_: unknown /* const array */;
  req: number;
  req_r_: unknown /* const array */;
  pid_l_: unknown /* const array */;
  pid: number;
  pid_r_: unknown /* const array */;
  addr_l_: unknown /* const array */;
  addr: number;
  addr_r_: unknown /* const array */;
  data_l_: unknown /* const array */;
  data: number;
  data_r_: unknown /* const array */;
}

declare class ulock_wait_args {
  constructor(init?: ulock_wait_args);
  operation_l_: unknown /* const array */;
  operation: number;
  operation_r_: unknown /* const array */;
  addr_l_: unknown /* const array */;
  addr: number;
  addr_r_: unknown /* const array */;
  value_l_: unknown /* const array */;
  value: number;
  value_r_: unknown /* const array */;
  timeout_l_: unknown /* const array */;
  timeout: number;
  timeout_r_: unknown /* const array */;
}

declare class OSAction_IOHIDDevice__CompleteReport_LocalIVars {
  constructor(init?: OSAction_IOHIDDevice__CompleteReport_LocalIVars);
}

declare class kqueue_workloop_ctl_args {
  constructor(init?: kqueue_workloop_ctl_args);
  cmd_l_: unknown /* const array */;
  cmd: number;
  cmd_r_: unknown /* const array */;
  options_l_: unknown /* const array */;
  options: number;
  options_r_: unknown /* const array */;
  addr_l_: unknown /* const array */;
  addr: number;
  addr_r_: unknown /* const array */;
  sz_l_: unknown /* const array */;
  sz: number;
  sz_r_: unknown /* const array */;
}

declare class ldt_desc {
  constructor(init?: ldt_desc);
  limit00: number;
  base00: number;
  base16: number;
  type: number;
  : number;
  present: number;
  limit16: number;
  : number;
  granular: number;
  base24: number;
}

declare class process_policy_args {
  constructor(init?: process_policy_args);
  scope_l_: unknown /* const array */;
  scope: number;
  scope_r_: unknown /* const array */;
  action_l_: unknown /* const array */;
  action: number;
  action_r_: unknown /* const array */;
  policy_l_: unknown /* const array */;
  policy: number;
  policy_r_: unknown /* const array */;
  policy_subtype_l_: unknown /* const array */;
  policy_subtype: number;
  policy_subtype_r_: unknown /* const array */;
  attrp_l_: unknown /* const array */;
  attrp: number;
  attrp_r_: unknown /* const array */;
  target_pid_l_: unknown /* const array */;
  target_pid: number;
  target_pid_r_: unknown /* const array */;
  target_threadid_l_: unknown /* const array */;
  target_threadid: number;
  target_threadid_r_: unknown /* const array */;
}

declare class socd_client_hdr_t {
  constructor(init?: socd_client_hdr_t);
  version: number;
  boot_time: number;
  kernel_uuid: unknown /* const array */;
  primary_kernelcache_uuid: unknown /* const array */;
}

declare class __Reply__mach_exception_raise_t {
  constructor(init?: __Reply__mach_exception_raise_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class unnamed_6429230732574079190 {
  constructor(init?: unnamed_6429230732574079190);
  deviceAddress: BluetoothDeviceAddress;
  classOfDevice: number;
  linkType: number;
}

declare class IOAudioClientBuffer {
  constructor(init?: IOAudioClientBuffer);
  userClient: interop.Pointer;
  audioStream: interop.Pointer;
  sourceBuffer: interop.Pointer;
  sourceBufferDescriptor: interop.Pointer;
  sourceBufferMap: interop.Pointer;
  unmappedSourceBuffer: interop.Pointer;
  numSampleFrames: number;
  numChannels: number;
  mixedPosition: IOAudioEnginePosition;
  mNextBuffer32: interop.Pointer;
  nextClip: interop.Pointer;
  previousClip: interop.Pointer;
  nextClient: interop.Pointer;
  bufferDataDescriptor: interop.Pointer;
}

declare class task_access_subsystem {
  constructor(init?: task_access_subsystem);
  server: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  start: number;
  end: number;
  maxsize: number;
  reserved: number;
  routine: unknown /* const array */;
}

declare class DebugKeyAction {
  constructor(init?: DebugKeyAction);
  debugArgRequired: boolean;
  mask: number;
  action: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  parameter: interop.Pointer;
}

declare class unnamed_1928797655933787480 {
  constructor(init?: unnamed_1928797655933787480);
  connectionHandle: number;
  mode: number;
  modeInterval: number;
}

declare class setregid_args {
  constructor(init?: setregid_args);
  rgid_l_: unknown /* const array */;
  rgid: number;
  rgid_r_: unknown /* const array */;
  egid_l_: unknown /* const array */;
  egid: number;
  egid_r_: unknown /* const array */;
}

declare class RAW_header {
  constructor(init?: RAW_header);
  version_no: number;
  thread_count: number;
  TOD_secs: number;
  TOD_usecs: number;
}

declare class priority_queue_sched_stable_min {
  constructor(init?: priority_queue_sched_stable_min);
  pq_root: interop.Pointer;
}

declare class __semwait_signal_nocancel_args {
  constructor(init?: __semwait_signal_nocancel_args);
  cond_sem_l_: unknown /* const array */;
  cond_sem: number;
  cond_sem_r_: unknown /* const array */;
  mutex_sem_l_: unknown /* const array */;
  mutex_sem: number;
  mutex_sem_r_: unknown /* const array */;
  timeout_l_: unknown /* const array */;
  timeout: number;
  timeout_r_: unknown /* const array */;
  relative_l_: unknown /* const array */;
  relative: number;
  relative_r_: unknown /* const array */;
  tv_sec_l_: unknown /* const array */;
  tv_sec: number;
  tv_sec_r_: unknown /* const array */;
  tv_nsec_l_: unknown /* const array */;
  tv_nsec: number;
  tv_nsec_r_: unknown /* const array */;
}

declare class pipe_args {
  constructor(init?: pipe_args);
  dummy: number;
}

declare class mkdirat_args {
  constructor(init?: mkdirat_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  mode_l_: unknown /* const array */;
  mode: number;
  mode_r_: unknown /* const array */;
}

declare class sptm_client_state {
  constructor(init?: sptm_client_state);
  version: number;
  n_papt_ranges: interop.Pointer;
  papt_ranges: interop.Pointer;
  first_phys: number;
  last_phys: number;
  first_papt: number;
  last_papt: number;
  root_table_paddr: number;
  frame_table: interop.Pointer;
  frame_type_params: interop.Pointer;
  pt_attr_table: interop.Pointer;
  cpu_features: number;
  n_io_ranges: number;
  io_frame_table: interop.Pointer;
  sptm_first_tag_storage_paddr: number;
  sptm_last_tag_storage_paddr: number;
  sptm_panicking_cpu_id: interop.Pointer;
  trace_buffer: interop.Pointer;
  percpu_dispatch_state: interop.Pointer;
  max_cpus: number;
  percpu_xnu_saved_state: interop.Pointer;
  feature_flags: number;
  allowed_io_frame_table: interop.Pointer;
  sptm_n_allowed_io_ranges: number;
  sptm_pmap_io_ranges: interop.Pointer;
  sptm_pmap_io_ranges_count: number;
  sptm_panicking_domain_id: interop.Pointer;
  reserved: unknown /* const array */;
}

declare class smrq_link {
  constructor(init?: smrq_link);
  next: __smrq_link_t;
  prev: interop.Pointer;
}

declare class BillboardAltModeCapability {
  constructor(init?: BillboardAltModeCapability);
  wSVID: number;
  bAlternateMode: number;
  iAlternateModeString: number;
}

declare class __Request__ktrace_background_available_t {
  constructor(init?: __Request__ktrace_background_available_t);
  Head: mach_msg_header_t;
}

declare class OSAction_IOHIDEventService__SetUserProperties_IVars {
  constructor(init?: OSAction_IOHIDEventService__SetUserProperties_IVars);
}

declare class nfsclntstats {
  constructor(init?: nfsclntstats);
  attrcache_hits: number;
  attrcache_misses: number;
  lookupcache_hits: number;
  lookupcache_misses: number;
  direofcache_hits: number;
  direofcache_misses: number;
  accesscache_hits: number;
  accesscache_misses: number;
  biocache_reads: number;
  read_bios: number;
  read_physios: number;
  biocache_writes: number;
  write_bios: number;
  write_physios: number;
  biocache_readlinks: number;
  readlink_bios: number;
  biocache_readdirs: number;
  readdir_bios: number;
  rpccntv3: unknown /* const array */;
  nlmcnt: unnamed_16013633380207743845;
  opcntv4: unknown /* const array */;
  cbopcntv4: unknown /* const array */;
  rpcretries: number;
  rpcrequests: number;
  rpctimeouts: number;
  rpcunexpected: number;
  rpcinvalid: number;
  pageins: number;
  pageouts: number;
  nfs_errs: unnamed_16383752996827423413;
}

declare class unnamed_11298389882924342544 {
  constructor(init?: unnamed_11298389882924342544);
  revision: number;
  variant: number;
  : number;
  se_imp: number;
  pcsr_imp: number;
  nsuhd_imp: number;
  : number;
  version: number;
  ctx_cmps: number;
  brps: number;
  wrps: number;
}

declare class fstatfs64_args {
  constructor(init?: fstatfs64_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  buf_l_: unknown /* const array */;
  buf: number;
  buf_r_: unknown /* const array */;
}

declare class __pthread_canceled_args {
  constructor(init?: __pthread_canceled_args);
  action_l_: unknown /* const array */;
  action: number;
  action_r_: unknown /* const array */;
}

declare class unnamed_3786139793914571324 {
  constructor(init?: unnamed_3786139793914571324);
  deviceAddress: BluetoothDeviceAddress;
  ioCapability: number;
  OOBDataPresence: number;
  authenticationRequirements: number;
}

declare class poll_args {
  constructor(init?: poll_args);
  fds_l_: unknown /* const array */;
  fds: number;
  fds_r_: unknown /* const array */;
  nfds_l_: unknown /* const array */;
  nfds: number;
  nfds_r_: unknown /* const array */;
  timeout_l_: unknown /* const array */;
  timeout: number;
  timeout_r_: unknown /* const array */;
}

declare class unnamed_18225267902874970143 {
  constructor(init?: unnamed_18225267902874970143);
  deviceAddress: BluetoothDeviceAddress;
  pageScanRepetitionMode: number;
}

declare class smr {
  constructor(init?: smr);
}

declare class waitid_args {
  constructor(init?: waitid_args);
  idtype_l_: unknown /* const array */;
  idtype: interop.Enum<typeof idtype_t>;
  idtype_r_: unknown /* const array */;
  id_l_: unknown /* const array */;
  id: number;
  id_r_: unknown /* const array */;
  infop_l_: unknown /* const array */;
  infop: number;
  infop_r_: unknown /* const array */;
  options_l_: unknown /* const array */;
  options: number;
  options_r_: unknown /* const array */;
}

declare class DeviceRequest {
  constructor(init?: DeviceRequest);
  bmRequestType: number;
  bRequest: number;
  wValue: number;
  wIndex: number;
  wLength: number;
}

declare class __Request__mach_voucher_attr_control_create_mach_voucher_t {
  constructor(init?: __Request__mach_voucher_attr_control_create_mach_voucher_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  recipesCnt: number;
  recipes: unknown /* const array */;
}

declare class call_gate {
  constructor(init?: call_gate);
  offset00: number;
  seg: sel;
  argcnt: number;
  : number;
  type: number;
  dpl: number;
  present: number;
  offset16: number;
}

declare class reboot_args {
  constructor(init?: reboot_args);
  opt_l_: unknown /* const array */;
  opt: number;
  opt_r_: unknown /* const array */;
  msg_l_: unknown /* const array */;
  msg: number;
  msg_r_: unknown /* const array */;
}

declare class IOUSBIsochronousFrame {
  constructor(init?: IOUSBIsochronousFrame);
  status: number;
  requestCount: number;
  completeCount: number;
  reserved: number;
  timeStamp: number;
}

declare class static_if_key {
  constructor(init?: static_if_key);
  sik_enable_count: number;
  sik_init_value: boolean;
  sik_modified: boolean;
  sik_entries_count: number;
  sik_entries_head: interop.Pointer;
  sik_modified_next: interop.Pointer;
}

declare class receive_sysdiagnose_notification_subsystem {
  constructor(init?: receive_sysdiagnose_notification_subsystem);
  server: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  start: number;
  end: number;
  maxsize: number;
  reserved: number;
  routine: unknown /* const array */;
}

declare class __Reply__doubleagent_remove_xattr_t {
  constructor(init?: __Reply__doubleagent_remove_xattr_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
  err: number;
  is_empty: number;
}

declare class mach_assert_3x {
  constructor(init?: mach_assert_3x);
  hdr: mach_assert_hdr;
  a: string | null;
  op: string | null;
  b: string | null;
}

declare class IOUSBHostIOSourceClientRecord {
  constructor(init?: IOUSBHostIOSourceClientRecord);
  forClient: interop.Pointer;
  outstandingIO: number;
  link: IOUSBHostIOSourceClientRecordLink;
}

declare class static_if_entry {
  constructor(init?: static_if_entry);
  sie_base: number;
  sie_target: number;
  sie_link: number;
}

declare class unnamed_3348046912707628850 {
  constructor(init?: unnamed_3348046912707628850);
  provider: interop.Pointer;
  busNum: number;
}

declare class ip_px_smpx_s {
  constructor(init?: ip_px_smpx_s);
  array: interop.Pointer;
  data: interop.Pointer;
  datalen: number;
}

declare class freadlink_args {
  constructor(init?: freadlink_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  buf_l_: unknown /* const array */;
  buf: number;
  buf_r_: unknown /* const array */;
  bufsize_l_: unknown /* const array */;
  bufsize: number;
  bufsize_r_: unknown /* const array */;
}

declare class ataRegisterImage {
  constructor(init?: ataRegisterImage);
  taskFile: ataTaskFile;
  ataDataRegister: number;
  ataAltSDevCReg: number;
}

declare class __Request__doubleagent_remove_xattr_t {
  constructor(init?: __Request__doubleagent_remove_xattr_t);
  Head: mach_msg_header_t;
  msgh_body: mach_msg_body_t;
  file_port: mach_msg_port_descriptor_t;
  NDR: NDR_record_t;
  file_size: number;
  nameOffset: number;
  nameCnt: number;
  name: unknown /* const array */;
}

declare class unnamed_5627948592258299541 {
  constructor(init?: unnamed_5627948592258299541);
  error: number;
  connectionHandle: number;
  lmpFeatures: BluetoothHCISupportedFeatures;
}

declare class mincore_args {
  constructor(init?: mincore_args);
  addr_l_: unknown /* const array */;
  addr: number;
  addr_r_: number;
  len_l_: unknown /* const array */;
  len: number;
  len_r_: number;
  vec_l_: unknown /* const array */;
  vec: number;
  vec_r_: unknown /* const array */;
}

declare class mpsc_queue_chain {
  constructor(init?: mpsc_queue_chain);
  mpqc_next: unknown /* _Atomic(struct mpsc_queue_chain *) (CXTypeKind: 177) */;
}

declare class __Reply__vfs_resolve_file_with_audit_token_t {
  constructor(init?: __Reply__vfs_resolve_file_with_audit_token_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class __Request__mach_exception_raise_state_identity_t {
  constructor(init?: __Request__mach_exception_raise_state_identity_t);
  Head: mach_msg_header_t;
  msgh_body: mach_msg_body_t;
  thread: mach_msg_port_descriptor_t;
  task: mach_msg_port_descriptor_t;
  NDR: NDR_record_t;
  exception: number;
  codeCnt: number;
  code: unknown /* const array */;
  flavor: number;
  old_stateCnt: number;
  old_state: unknown /* const array */;
}

declare class lio_listio_args {
  constructor(init?: lio_listio_args);
  mode_l_: unknown /* const array */;
  mode: number;
  mode_r_: unknown /* const array */;
  aiocblist_l_: unknown /* const array */;
  aiocblist: number;
  aiocblist_r_: unknown /* const array */;
  nent_l_: unknown /* const array */;
  nent: number;
  nent_r_: unknown /* const array */;
  sigp_l_: unknown /* const array */;
  sigp: number;
  sigp_r_: unknown /* const array */;
}

declare class __lck_spin_t__ {
  constructor(init?: __lck_spin_t__);
}

declare class unnamed_4373168148114552859 {
  constructor(init?: unnamed_4373168148114552859);
  handle: number;
  timeout: number;
}

declare class __Request__mach_gss_init_sec_context_v2_t {
  constructor(init?: __Request__mach_gss_init_sec_context_v2_t);
  Head: mach_msg_header_t;
  msgh_body: mach_msg_body_t;
  intoken: mach_msg_ool_descriptor_t;
  clnt_princ: mach_msg_ool_descriptor_t;
  svc_princ: mach_msg_ool_descriptor_t;
  NDR: NDR_record_t;
  mech: interop.Enum<typeof gssd_mechtype>;
  intokenCnt: number;
  uid: number;
  clnt_nt: interop.Enum<typeof gssd_nametype>;
  clnt_princCnt: number;
  svc_nt: interop.Enum<typeof gssd_nametype>;
  svc_princCnt: number;
  flags: number;
  gssd_flags: number;
  context: number;
  cred_handle: number;
}

declare class lz4_hash_entry_t {
  constructor(init?: lz4_hash_entry_t);
  offset: number;
  word: number;
}

declare class __Reply__kextd_ping_t {
  constructor(init?: __Reply__kextd_ping_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class airship_daleipc_channel_transfer_completion {
  constructor(init?: airship_daleipc_channel_transfer_completion);
  size: number;
  tag: number;
}

declare class vm_pressure_monitor_args {
  constructor(init?: vm_pressure_monitor_args);
  wait_for_pressure_l_: unknown /* const array */;
  wait_for_pressure: number;
  wait_for_pressure_r_: unknown /* const array */;
  nsecs_monitored_l_: unknown /* const array */;
  nsecs_monitored: number;
  nsecs_monitored_r_: unknown /* const array */;
  pages_reclaimed_l_: unknown /* const array */;
  pages_reclaimed: number;
  pages_reclaimed_r_: unknown /* const array */;
}

declare class user64_timespec {
  constructor(init?: user64_timespec);
  tv_sec: number;
  tv_nsec: number;
}

declare class unnamed_8317762995543166574 {
  constructor(init?: unnamed_8317762995543166574);
  flags: number;
  txWindowSize: number;
  maxTransmit: number;
  retransmissionTimeout: number;
  monitorTimeout: number;
  maxPDUPayloadSize: number;
}

declare class doubleagent_subsystem {
  constructor(init?: doubleagent_subsystem);
  server: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  start: number;
  end: number;
  maxsize: number;
  reserved: number;
  routine: unknown /* const array */;
}

declare class getfsstat_args {
  constructor(init?: getfsstat_args);
  buf_l_: unknown /* const array */;
  buf: number;
  buf_r_: unknown /* const array */;
  bufsize_l_: unknown /* const array */;
  bufsize: number;
  bufsize_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
}

declare class vc_progress_user_options {
  constructor(init?: vc_progress_user_options);
  options: number;
  x_pos: number;
  y_pos: number;
  resv: unknown /* const array */;
}

declare class IOPMPowerState {
  constructor(init?: IOPMPowerState);
  version: number;
  capabilityFlags: number;
  outputPowerCharacter: number;
  inputPowerRequirement: number;
  staticPower: number;
  stateOrder: number;
  powerToAttain: number;
  timeToAttain: number;
  settleUpTime: number;
  timeToLower: number;
  settleDownTime: number;
  powerDomainBudget: number;
}

declare class readlink_args {
  constructor(init?: readlink_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  buf_l_: unknown /* const array */;
  buf: number;
  buf_r_: unknown /* const array */;
  count_l_: unknown /* const array */;
  count: number;
  count_r_: unknown /* const array */;
}

declare class __Reply__mach_gss_accept_sec_context_v2_t {
  constructor(init?: __Reply__mach_gss_accept_sec_context_v2_t);
  Head: mach_msg_header_t;
  msgh_body: mach_msg_body_t;
  key: mach_msg_ool_descriptor_t;
  outtoken: mach_msg_ool_descriptor_t;
  NDR: NDR_record_t;
  gssd_flags: number;
  context: number;
  cred_handle: number;
  flags: number;
  uid: number;
  gidsCnt: number;
  gids: unknown /* const array */;
  keyCnt: number;
  outtokenCnt: number;
  major_stat: number;
  minor_stat: number;
}

declare class nfs_uquad {
  constructor(init?: nfs_uquad);
  nfsuquad: unknown /* const array */;
}

declare class getattrlistat_args {
  constructor(init?: getattrlistat_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  alist_l_: unknown /* const array */;
  alist: number;
  alist_r_: unknown /* const array */;
  attributeBuffer_l_: unknown /* const array */;
  attributeBuffer: number;
  attributeBuffer_r_: unknown /* const array */;
  bufferSize_l_: unknown /* const array */;
  bufferSize: number;
  bufferSize_r_: unknown /* const array */;
  options_l_: unknown /* const array */;
  options: number;
  options_r_: unknown /* const array */;
}

declare class symlink_args {
  constructor(init?: symlink_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  link_l_: unknown /* const array */;
  link: number;
  link_r_: unknown /* const array */;
}

declare class kd_buf {
  constructor(init?: kd_buf);
  timestamp: number;
  arg1: number;
  arg2: number;
  arg3: number;
  arg4: number;
  arg5: number;
  debugid: number;
  cpuid: number;
  unused: number;
}

declare class conninfo_tcp {
  constructor(init?: conninfo_tcp);
  tcpci_tcp_info: tcp_info;
}

declare class ifnet_stats_param {
  constructor(init?: ifnet_stats_param);
  packets_in: number;
  bytes_in: number;
  multicasts_in: number;
  errors_in: number;
  packets_out: number;
  bytes_out: number;
  multicasts_out: number;
  errors_out: number;
  collisions: number;
  dropped: number;
  no_protocol: number;
}

declare class airship_monitor {
  constructor(init?: airship_monitor);
}

declare class unnamed_10995956406557057234 {
  constructor(init?: unnamed_10995956406557057234);
  data: unknown /* const array */;
}

declare class __Request__check_task_access_with_flavor_t {
  constructor(init?: __Request__check_task_access_with_flavor_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  calling_pid: number;
  calling_gid: number;
  target_pid: number;
  flavor: number;
}

declare class lstat64_extended_args {
  constructor(init?: lstat64_extended_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  ub_l_: unknown /* const array */;
  ub: number;
  ub_r_: unknown /* const array */;
  xsecurity_l_: unknown /* const array */;
  xsecurity: number;
  xsecurity_r_: unknown /* const array */;
  xsecurity_size_l_: unknown /* const array */;
  xsecurity_size: number;
  xsecurity_size_r_: unknown /* const array */;
}

declare class IOHIDEventService_LocalIVars {
  constructor(init?: IOHIDEventService_LocalIVars);
}

declare class __Request__check_task_access_t {
  constructor(init?: __Request__check_task_access_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  calling_pid: number;
  calling_gid: number;
  target_pid: number;
}

declare class thread_selfusage_args {
  constructor(init?: thread_selfusage_args);
  dummy: number;
}

declare class OSAction_IOHIDEventService__SetUserProperties_LocalIVars {
  constructor(init?: OSAction_IOHIDEventService__SetUserProperties_LocalIVars);
}

declare class pselect_args {
  constructor(init?: pselect_args);
  nd_l_: unknown /* const array */;
  nd: number;
  nd_r_: unknown /* const array */;
  in_l_: unknown /* const array */;
  in: number;
  in_r_: unknown /* const array */;
  ou_l_: unknown /* const array */;
  ou: number;
  ou_r_: unknown /* const array */;
  ex_l_: unknown /* const array */;
  ex: number;
  ex_r_: unknown /* const array */;
  ts_l_: unknown /* const array */;
  ts: number;
  ts_r_: unknown /* const array */;
  mask_l_: unknown /* const array */;
  mask: number;
  mask_r_: unknown /* const array */;
}

declare class daleipc_uplink_controller {
  constructor(init?: daleipc_uplink_controller);
}

declare class unnamed_1054070753012500092 {
  constructor(init?: unnamed_1054070753012500092);
  connectionHandle: number;
}

declare class IOAudioClientBufferExtendedInfo64 {
  constructor(init?: IOAudioClientBufferExtendedInfo64);
  mAudioClientBufferExtended32: IOAudioClientBufferExtendedInfo;
  mUnmappedParamBuffer64: number;
  mNextExtended64: interop.Pointer;
}

declare class unnamed_10878146617443663444 {
  constructor(init?: unnamed_10878146617443663444);
  scanInterval: number;
  scanWindow: number;
}

declare class nfsrvstats {
  constructor(init?: nfsrvstats);
  srvrpccntv3: unknown /* const array */;
  srvrpc_errs: number;
  srv_errs: number;
  srvcache_inproghits: number;
  srvcache_idemdonehits: number;
  srvcache_nonidemdonehits: number;
  srvcache_misses: number;
  srvvop_writes: number;
  nfs_errs: unnamed_13569257746074412783;
}

declare class EXDisplayPipeHealthReport {
  constructor(init?: EXDisplayPipeHealthReport);
  sca_driver_health: EXDisplayPipeHealthRecord;
  sca_algorithm_health: EXDisplayPipeHealthRecord;
  scl_health: EXDisplayPipeHealthRecord;
  pipe_health: EXDisplayPipeHealthRecord;
  link_health: EXDisplayPipeHealthRecord;
  health: boolean;
}

declare class futimes_args {
  constructor(init?: futimes_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  tptr_l_: unknown /* const array */;
  tptr: number;
  tptr_r_: unknown /* const array */;
}

declare class unnamed_13710605761154041948 {
  constructor(init?: unnamed_13710605761154041948);
  connectionHandle: number;
  lmpVersion: number;
  manufacturerName: number;
  lmpSubversion: number;
}

declare class __Request__mach_gss_unhold_cred_t {
  constructor(init?: __Request__mach_gss_unhold_cred_t);
  Head: mach_msg_header_t;
  msgh_body: mach_msg_body_t;
  princ: mach_msg_ool_descriptor_t;
  NDR: NDR_record_t;
  mech: interop.Enum<typeof gssd_mechtype>;
  nt: interop.Enum<typeof gssd_nametype>;
  princCnt: number;
}

declare class log_data_args {
  constructor(init?: log_data_args);
  tag_l_: unknown /* const array */;
  tag: number;
  tag_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
  buffer_l_: unknown /* const array */;
  buffer: number;
  buffer_r_: unknown /* const array */;
  size_l_: unknown /* const array */;
  size: number;
  size_r_: unknown /* const array */;
}

declare class unnamed_13971610946563607911 {
  constructor(init?: unnamed_13971610946563607911);
  transmitBandwidth: number;
  receiveBandwidth: number;
  transmitCodingFormat: number;
  receiveCodingFormat: number;
  transmitCodecFrameSize: number;
  receiveCodecFrameSize: number;
  inputBandwidth: number;
  outputBandwidth: number;
  inputCodingFormat: number;
  outputCodingFormat: number;
  inputCodedDataSize: number;
  outputCodedDataSize: number;
  inputPCMDataFormat: number;
  outputPCMDataFormat: number;
  inputPCMSamplePayloadMSBPosition: number;
  outputPCMSamplePayloadMSBPosition: number;
  inputDataPath: number;
  outputDataPath: number;
  inputTransportUnitSize: number;
  outputTransportUnitSize: number;
  maxLatency: number;
  packetType: number;
  retransmissionEffort: number;
}

declare class EXDisplayPipeSecureTEStatus {
  constructor(init?: EXDisplayPipeSecureTEStatus);
  healthRecord: EXDisplayPipeHealthRecord;
  errorCount: number;
  lastErrorTimestamp: number;
  maxConsecutiveErrors: number;
  lastErrorVal: number;
  enabled: boolean;
  errorInfo: unknown /* const array */;
  errorInfoCount: number;
}

declare class posix_spawn_args {
  constructor(init?: posix_spawn_args);
  pid_l_: unknown /* const array */;
  pid: number;
  pid_r_: unknown /* const array */;
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  adesc_l_: unknown /* const array */;
  adesc: number;
  adesc_r_: unknown /* const array */;
  argv_l_: unknown /* const array */;
  argv: number;
  argv_r_: unknown /* const array */;
  envp_l_: unknown /* const array */;
  envp: number;
  envp_r_: unknown /* const array */;
}

declare class thread_selfid_args {
  constructor(init?: thread_selfid_args);
  dummy: number;
}

declare class IOInterruptAccountingData {
  constructor(init?: IOInterruptAccountingData);
}

declare class memorystatus_available_memory_args {
  constructor(init?: memorystatus_available_memory_args);
  dummy: number;
}

declare class HIDButtonCapabilities {
  constructor(init?: HIDButtonCapabilities);
  usagePage: number;
  reportID: number;
  bitField: number;
  collection: number;
  collectionUsage: number;
  collectionUsagePage: number;
  isRange: number;
  isStringRange: number;
  isDesignatorRange: number;
  isAbsolute: number;
  unitExponent: number;
  units: number;
  startBit: number;
  pbVersion: number;
  u: unnamed_17870239474130978603;
}

declare class ntp_adjtime_args {
  constructor(init?: ntp_adjtime_args);
  tp_l_: unknown /* const array */;
  tp: number;
  tp_r_: unknown /* const array */;
}

declare class open_extended_args {
  constructor(init?: open_extended_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
  uid_l_: unknown /* const array */;
  uid: number;
  uid_r_: unknown /* const array */;
  gid_l_: unknown /* const array */;
  gid: number;
  gid_r_: unknown /* const array */;
  mode_l_: unknown /* const array */;
  mode: number;
  mode_r_: unknown /* const array */;
  xsecurity_l_: unknown /* const array */;
  xsecurity: number;
  xsecurity_r_: unknown /* const array */;
}

declare class unnamed_3521018383531812804 {
  constructor(init?: unnamed_3521018383531812804);
  login: interop.Pointer;
  generation: number;
  status: number;
  reconnectStatusBlock: interop.Pointer;
  reconnectStatusBlockLength: number;
}

declare class _notifyMsg {
  constructor(init?: _notifyMsg);
  h: mach_msg_header_t;
}

declare class unnamed_10338689098814162510 {
  constructor(init?: unnamed_10338689098814162510);
  un_d_boot0: string | null;
  un_d_boot1: string | null;
}

declare class thread_snapshot {
  constructor(init?: thread_snapshot);
  snapshot_magic: number;
  nkern_frames: number;
  nuser_frames: number;
  wait_event: number;
  continuation: number;
  thread_id: number;
  user_time: number;
  system_time: number;
  state: number;
  priority: number;
  sched_pri: number;
  sched_flags: number;
  ss_flags: number;
  ts_qos: number;
  ts_rqos: number;
  ts_rqos_override: number;
  io_tier: number;
  _reserved: unknown /* const array */;
  disk_reads_count: number;
  disk_reads_size: number;
  disk_writes_count: number;
  disk_writes_size: number;
  io_priority_count: unknown /* const array */;
  io_priority_size: unknown /* const array */;
  paging_count: number;
  paging_size: number;
  non_paging_count: number;
  non_paging_size: number;
  data_count: number;
  data_size: number;
  metadata_count: number;
  metadata_size: number;
  voucher_identifier: number;
  total_syscalls: number;
  pth_name: unknown /* const array */;
}

declare class __Reply__lockd_shutdown_t {
  constructor(init?: __Reply__lockd_shutdown_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class __Request__lockd_request_t {
  constructor(init?: __Request__lockd_request_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  vers: number;
  flags: number;
  xid: number;
  flk_start: number;
  flk_len: number;
  flk_pid: number;
  flk_type: number;
  flk_whence: number;
  sock_address: unknown /* const array */;
  cred: unknown /* const array */;
  fh_len: number;
  fh: unknown /* const array */;
}

declare class chdir_args {
  constructor(init?: chdir_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
}

declare class sptm_disjoint_op_t {
  constructor(init?: sptm_disjoint_op_t);
  root_pt_paddr: number;
  vaddr: number;
  pte_template: number;
}

declare class guarded_writev_np_args {
  constructor(init?: guarded_writev_np_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  guard_l_: unknown /* const array */;
  guard: number;
  guard_r_: unknown /* const array */;
  iovp_l_: unknown /* const array */;
  iovp: number;
  iovp_r_: unknown /* const array */;
  iovcnt_l_: unknown /* const array */;
  iovcnt: number;
  iovcnt_r_: unknown /* const array */;
}

declare class oslog_coproc_reg_args {
  constructor(init?: oslog_coproc_reg_args);
  uuid_l_: unknown /* const array */;
  uuid: number;
  uuid_r_: unknown /* const array */;
  file_path_l_: unknown /* const array */;
  file_path: number;
  file_path_r_: unknown /* const array */;
  file_path_len_l_: unknown /* const array */;
  file_path_len: number;
  file_path_len_r_: unknown /* const array */;
}

declare class unnamed_16383752996827423413 {
  constructor(init?: unnamed_16383752996827423413);
  errs_common: unknown /* const array */;
  errs_v4: unknown /* const array */;
  errs_unknown: number;
}

declare class renameatx_np_args {
  constructor(init?: renameatx_np_args);
  fromfd_l_: unknown /* const array */;
  fromfd: number;
  fromfd_r_: unknown /* const array */;
  from_l_: unknown /* const array */;
  from: number;
  from_r_: unknown /* const array */;
  tofd_l_: unknown /* const array */;
  tofd: number;
  tofd_r_: unknown /* const array */;
  to_l_: unknown /* const array */;
  to: number;
  to_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
}

declare class airship_acipc_cr_mirror_completion_record {
  constructor(init?: airship_acipc_cr_mirror_completion_record);
  desctype: number;
  tr_id: number;
  io_count: number;
  first_tag: number;
}

declare class IOHistogramReportValues {
  constructor(init?: IOHistogramReportValues);
  bucket_hits: number;
  bucket_min: number;
  bucket_max: number;
  bucket_sum: number;
}

declare class kern_work_interval_create_args {
  constructor(init?: kern_work_interval_create_args);
  wica_id: number;
  wica_port: number;
  wica_create_flags: number;
}

declare class IOReportInterestList {
  constructor(init?: IOReportInterestList);
  ninterests: number;
  interests: interop.Pointer;
}

declare class IOTVector {
  constructor(init?: IOTVector);
  pc: interop.Pointer;
  toc: number;
}

declare class IOBlockStorageWorkFlags {
  constructor(init?: IOBlockStorageWorkFlags);
  isRead: boolean;
  isLowPriority: boolean;
  ioSize: number;
}

declare class getpriority_args {
  constructor(init?: getpriority_args);
  which_l_: unknown /* const array */;
  which: number;
  which_r_: unknown /* const array */;
  who_l_: unknown /* const array */;
  who: number;
  who_r_: unknown /* const array */;
}

declare class swapon_args {
  constructor(init?: swapon_args);
  dummy: number;
}

declare class shared_region_map_and_slide_2_np_args {
  constructor(init?: shared_region_map_and_slide_2_np_args);
  files_count_l_: unknown /* const array */;
  files_count: number;
  files_count_r_: unknown /* const array */;
  files_l_: unknown /* const array */;
  files: number;
  files_r_: unknown /* const array */;
  mappings_count_l_: unknown /* const array */;
  mappings_count: number;
  mappings_count_r_: unknown /* const array */;
  mappings_u_l_: unknown /* const array */;
  mappings_u: number;
  mappings_u_r_: unknown /* const array */;
}

declare class kdebug_trace_string_args {
  constructor(init?: kdebug_trace_string_args);
  debugid_l_: unknown /* const array */;
  debugid: number;
  debugid_r_: unknown /* const array */;
  str_id_l_: unknown /* const array */;
  str_id: number;
  str_id_r_: unknown /* const array */;
  str_l_: unknown /* const array */;
  str: number;
  str_r_: unknown /* const array */;
}

declare class unnamed_17393539693913510561 {
  constructor(init?: unnamed_17393539693913510561);
  numberOfReponses: number;
  deviceAddress: BluetoothDeviceAddress;
  pageScanRepetitionMode: number;
  reserved: number;
  classOfDevice: number;
  clockOffset: number;
  RSSIValue: number;
  extendedInquiryResponse: BluetoothHCIExtendedInquiryResponse;
}

declare class unnamed_10328243768668227060 {
  constructor(init?: unnamed_10328243768668227060);
  ifscope: number;
}

declare class _stickyKeys_ToggleInfo {
  constructor(init?: _stickyKeys_ToggleInfo);
  size: number;
  toggleModifier: number;
  repetitionsToToggle: number;
  expireInterval: UnsignedWide;
  currentCount: number;
  deadlines: unknown /* const array */;
}

declare class unnamed_1064201811267050249 {
  constructor(init?: unnamed_1064201811267050249);
  debug_arch_version: number;
  trace_extn_version: number;
  perf_extn_version: number;
  brps: number;
  reserved0: number;
  wrps: number;
  reserved1: number;
  ctx_cmps: number;
  reserved32: number;
}

declare class unnamed_3848994726849950940 {
  constructor(init?: unnamed_3848994726849950940);
  sa_unused: number;
}

declare class if_netem_params {
  constructor(init?: if_netem_params);
  ifnetem_model: interop.Enum<typeof if_netem_model_t>;
  ifnetem_bandwidth_bps: number;
  ifnetem_latency_ms: number;
  ifnetem_jitter_ms: number;
  ifnetem_corruption_p: number;
  ifnetem_duplication_p: number;
  ifnetem_loss_p_gr_gl: number;
  ifnetem_loss_p_gr_bl: number;
  ifnetem_loss_p_bl_br: number;
  ifnetem_loss_p_bl_gr: number;
  ifnetem_loss_p_br_bl: number;
  ifnetem_loss_recovery_ms: number;
  ifnetem_reordering_p: number;
  ifnetem_output_ival_ms: number;
}

declare class IOUSBHostBundledCompletion {
  constructor(init?: IOUSBHostBundledCompletion);
  owner: interop.Pointer;
  action: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible) => void | null;
  parameter: interop.Pointer;
}

declare class unnamed_17808017554962453887 {
  constructor(init?: unnamed_17808017554962453887);
  eph_x86_power_state: number;
  eph_x86_efi_boot_state: number;
  eph_x86_system_state: number;
  eph_x86_unused_bits: number;
}

declare class unnamed_15298435409180286407 {
  constructor(init?: unnamed_15298435409180286407);
  deviceAddress: BluetoothDeviceAddress;
  pageScanRepetitionMode: number;
  pageScanPeriodMode: number;
  pageScanMode: number;
  classOfDevice: number;
  clockOffset: number;
}

declare class EFI_CONFIGURATION_TABLE_32 {
  constructor(init?: EFI_CONFIGURATION_TABLE_32);
  VendorGuid: EFI_GUID;
  VendorTable: number;
}

declare class kevent_id_args {
  constructor(init?: kevent_id_args);
  id_l_: unknown /* const array */;
  id: number;
  id_r_: unknown /* const array */;
  changelist_l_: unknown /* const array */;
  changelist: number;
  changelist_r_: unknown /* const array */;
  nchanges_l_: unknown /* const array */;
  nchanges: number;
  nchanges_r_: unknown /* const array */;
  eventlist_l_: unknown /* const array */;
  eventlist: number;
  eventlist_r_: unknown /* const array */;
  nevents_l_: unknown /* const array */;
  nevents: number;
  nevents_r_: unknown /* const array */;
  data_out_l_: unknown /* const array */;
  data_out: number;
  data_out_r_: unknown /* const array */;
  data_available_l_: unknown /* const array */;
  data_available: number;
  data_available_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
}

declare class __Reply__nspace_resolve_cancel_t {
  constructor(init?: __Reply__nspace_resolve_cancel_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class setxattr_args {
  constructor(init?: setxattr_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  attrname_l_: unknown /* const array */;
  attrname: number;
  attrname_r_: unknown /* const array */;
  value_l_: unknown /* const array */;
  value: number;
  value_r_: unknown /* const array */;
  size_l_: unknown /* const array */;
  size: number;
  size_r_: unknown /* const array */;
  position_l_: unknown /* const array */;
  position: number;
  position_r_: unknown /* const array */;
  options_l_: unknown /* const array */;
  options: number;
  options_r_: unknown /* const array */;
}

declare class __mac_getfsstat_args {
  constructor(init?: __mac_getfsstat_args);
  buf_l_: unknown /* const array */;
  buf: number;
  buf_r_: unknown /* const array */;
  bufsize_l_: unknown /* const array */;
  bufsize: number;
  bufsize_r_: unknown /* const array */;
  mac_l_: unknown /* const array */;
  mac: number;
  mac_r_: unknown /* const array */;
  macsize_l_: unknown /* const array */;
  macsize: number;
  macsize_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
}

declare class unnamed_1217890641751780249 {
  constructor(init?: unnamed_1217890641751780249);
  login: interop.Pointer;
  generation: number;
  status: number;
  loginResponse: interop.Pointer;
  statusBlock: interop.Pointer;
  statusBlockLength: number;
}

declare class fchmodat_args {
  constructor(init?: fchmodat_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  mode_l_: unknown /* const array */;
  mode: number;
  mode_r_: unknown /* const array */;
  flag_l_: unknown /* const array */;
  flag: number;
  flag_r_: unknown /* const array */;
}

declare class ifmibdata_supplemental {
  constructor(init?: ifmibdata_supplemental);
  ifmd_traffic_class: if_traffic_class;
  ifmd_data_extended: if_data_extended;
  ifmd_packet_stats: if_packet_stats;
  ifmd_rxpoll_stats: if_rxpoll_stats;
  ifmd_netif_stats: if_netif_stats;
}

declare class guarded_kqueue_np_args {
  constructor(init?: guarded_kqueue_np_args);
  guard_l_: unknown /* const array */;
  guard: number;
  guard_r_: unknown /* const array */;
  guardflags_l_: unknown /* const array */;
  guardflags: number;
  guardflags_r_: unknown /* const array */;
}

declare class unnamed_16222007263645768418 {
  constructor(init?: unnamed_16222007263645768418);
  usageMin: number;
  usageMax: number;
  stringMin: number;
  stringMax: number;
  designatorMin: number;
  designatorMax: number;
}

declare class getsid_args {
  constructor(init?: getsid_args);
  pid_l_: unknown /* const array */;
  pid: number;
  pid_r_: unknown /* const array */;
}

declare class fpathconf_args {
  constructor(init?: fpathconf_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  name_l_: unknown /* const array */;
  name: number;
  name_r_: unknown /* const array */;
}

declare class SuperSpeedHubDescriptor {
  constructor(init?: SuperSpeedHubDescriptor);
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

declare class setaudit_addr_args {
  constructor(init?: setaudit_addr_args);
  auditinfo_addr_l_: unknown /* const array */;
  auditinfo_addr: number;
  auditinfo_addr_r_: unknown /* const array */;
  length_l_: unknown /* const array */;
  length: number;
  length_r_: unknown /* const array */;
}

declare class fsgetpath_ext_args {
  constructor(init?: fsgetpath_ext_args);
  buf_l_: unknown /* const array */;
  buf: number;
  buf_r_: unknown /* const array */;
  bufsize_l_: unknown /* const array */;
  bufsize: number;
  bufsize_r_: unknown /* const array */;
  fsid_l_: unknown /* const array */;
  fsid: number;
  fsid_r_: unknown /* const array */;
  objid_l_: unknown /* const array */;
  objid: number;
  objid_r_: unknown /* const array */;
  options_l_: unknown /* const array */;
  options: number;
  options_r_: unknown /* const array */;
}

declare class Key {
  constructor(init?: Key);
  _value: number;
  _modified: boolean;
  Key: unknown /* int () (CXTypeKind: 110) */;
  isTopRow: unknown /* _Bool () (CXTypeKind: 110) */;
}

declare class vnode_attr {
  constructor(init?: vnode_attr);
}

declare class priority_queue_sched_stable_max {
  constructor(init?: priority_queue_sched_stable_max);
  pq_root: interop.Pointer;
}

declare class kevent_qos_args {
  constructor(init?: kevent_qos_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  changelist_l_: unknown /* const array */;
  changelist: number;
  changelist_r_: unknown /* const array */;
  nchanges_l_: unknown /* const array */;
  nchanges: number;
  nchanges_r_: unknown /* const array */;
  eventlist_l_: unknown /* const array */;
  eventlist: number;
  eventlist_r_: unknown /* const array */;
  nevents_l_: unknown /* const array */;
  nevents: number;
  nevents_r_: unknown /* const array */;
  data_out_l_: unknown /* const array */;
  data_out: number;
  data_out_r_: unknown /* const array */;
  data_available_l_: unknown /* const array */;
  data_available: number;
  data_available_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
}

declare class IOReportElement {
  constructor(init?: IOReportElement);
  provider_id: number;
  channel_id: number;
  channel_type: IOReportChannelType;
  timestamp: number;
  values: IOReportElementValues;
}

declare class unnamed_6646578211250444178 {
  constructor(init?: unnamed_6646578211250444178);
  handle: number;
  lmp_handle: number;
  reserved: number;
}

declare class _lck_grp_attr_ {
  constructor(init?: _lck_grp_attr_);
}

declare class __Reply__mach_gss_lookup_t {
  constructor(init?: __Reply__mach_gss_lookup_t);
  Head: mach_msg_header_t;
  msgh_body: mach_msg_body_t;
  gssd_session_port: mach_msg_port_descriptor_t;
}

declare class IOPCIDevice_LocalIVars {
  constructor(init?: IOPCIDevice_LocalIVars);
}

declare class lstat_extended_args {
  constructor(init?: lstat_extended_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  ub_l_: unknown /* const array */;
  ub: number;
  ub_r_: unknown /* const array */;
  xsecurity_l_: unknown /* const array */;
  xsecurity: number;
  xsecurity_r_: unknown /* const array */;
  xsecurity_size_l_: unknown /* const array */;
  xsecurity_size: number;
  xsecurity_size_r_: unknown /* const array */;
}

declare class ffsctl_args {
  constructor(init?: ffsctl_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  cmd_l_: unknown /* const array */;
  cmd: number;
  cmd_r_: unknown /* const array */;
  data_l_: unknown /* const array */;
  data: number;
  data_r_: unknown /* const array */;
  options_l_: unknown /* const array */;
  options: number;
  options_r_: unknown /* const array */;
}

declare class AsyncPendingTrans {
  constructor(init?: AsyncPendingTrans);
  fHandler: interop.Pointer;
  fAltHandler: interop.Pointer;
  fTCode: number;
  fInUse: boolean;
}

declare class sockaddr_inifscope {
  constructor(init?: sockaddr_inifscope);
  sin_len: number;
  sin_family: number;
  sin_port: number;
  sin_addr: in_addr;
  un: unnamed_3771936424973120145;
}

declare class IOStateReportInfo {
  constructor(init?: IOStateReportInfo);
  curr_state: number;
  update_ts: number;
  elem: interop.Pointer;
}

declare class unnamed_3364203081172218251 {
  constructor(init?: unnamed_3364203081172218251);
  usage: number;
  reserved1: number;
  stringIndex: number;
  reserved2: number;
  designatorIndex: number;
  reserved3: number;
}

declare class pread_nocancel_args {
  constructor(init?: pread_nocancel_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  buf_l_: unknown /* const array */;
  buf: number;
  buf_r_: unknown /* const array */;
  nbyte_l_: unknown /* const array */;
  nbyte: number;
  nbyte_r_: unknown /* const array */;
  offset_l_: unknown /* const array */;
  offset: number;
  offset_r_: unknown /* const array */;
}

declare class unnamed_13100592752473707061 {
  constructor(init?: unnamed_13100592752473707061);
  login: interop.Pointer;
  generation: number;
  status: number;
  statusBlock: interop.Pointer;
  statusBlockLength: number;
}

declare class if_order {
  constructor(init?: if_order);
  ifo_count: number;
  ifo_reserved: number;
  ifo_ordered_indices: number;
}

declare class linkat_args {
  constructor(init?: linkat_args);
  fd1_l_: unknown /* const array */;
  fd1: number;
  fd1_r_: unknown /* const array */;
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  fd2_l_: unknown /* const array */;
  fd2: number;
  fd2_r_: unknown /* const array */;
  link_l_: unknown /* const array */;
  link: number;
  link_r_: unknown /* const array */;
  flag_l_: unknown /* const array */;
  flag: number;
  flag_r_: unknown /* const array */;
}

declare class unnamed_11520913712954248184 {
  constructor(init?: unnamed_11520913712954248184);
  deviceAddress: BluetoothDeviceAddress;
  hostSupportedFeatures: BluetoothHCISupportedFeatures;
}

declare class lseek_args {
  constructor(init?: lseek_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  offset_l_: unknown /* const array */;
  offset: number;
  offset_r_: unknown /* const array */;
  whence_l_: unknown /* const array */;
  whence: number;
  whence_r_: unknown /* const array */;
}

declare class preadv_nocancel_args {
  constructor(init?: preadv_nocancel_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  iovp_l_: unknown /* const array */;
  iovp: number;
  iovp_r_: unknown /* const array */;
  iovcnt_l_: unknown /* const array */;
  iovcnt: number;
  iovcnt_r_: unknown /* const array */;
  offset_l_: unknown /* const array */;
  offset: number;
  offset_r_: unknown /* const array */;
}

declare class iocompressionstats_notification_subsystem {
  constructor(init?: iocompressionstats_notification_subsystem);
  server: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  start: number;
  end: number;
  maxsize: number;
  reserved: number;
  routine: unknown /* const array */;
}

declare class IOReportElementValues {
  constructor(init?: IOReportElementValues);
  v: unknown /* const array */;
}

declare class fstat64_extended_args {
  constructor(init?: fstat64_extended_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  ub_l_: unknown /* const array */;
  ub: number;
  ub_r_: unknown /* const array */;
  xsecurity_l_: unknown /* const array */;
  xsecurity: number;
  xsecurity_r_: unknown /* const array */;
  xsecurity_size_l_: unknown /* const array */;
  xsecurity_size: number;
  xsecurity_size_r_: unknown /* const array */;
}

declare class IOCircularDataQueueEntryHeader {
  constructor(init?: IOCircularDataQueueEntryHeader);
  sentinel: number;
  _pad: number;
  data: unknown /* const array */;
}

declare class unnamed_7294244045061937404 {
  constructor(init?: unnamed_7294244045061937404);
  deviceAddress: BluetoothDeviceAddress;
  pageScanMode: number;
}

declare class __disable_threadsignal_args {
  constructor(init?: __disable_threadsignal_args);
  value_l_: unknown /* const array */;
  value: number;
  value_r_: unknown /* const array */;
}

declare class revoke_args {
  constructor(init?: revoke_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
}

declare class mknodat_args {
  constructor(init?: mknodat_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  mode_l_: unknown /* const array */;
  mode: number;
  mode_r_: unknown /* const array */;
  dev_l_: unknown /* const array */;
  dev: number;
  dev_r_: unknown /* const array */;
}

declare class getwgroups_args {
  constructor(init?: getwgroups_args);
  setlen_l_: unknown /* const array */;
  setlen: number;
  setlen_r_: unknown /* const array */;
  guidset_l_: unknown /* const array */;
  guidset: number;
  guidset_r_: unknown /* const array */;
}

declare class nfsd_args {
  constructor(init?: nfsd_args);
  sock: number;
  name: number;
  namelen: number;
}

declare class undelete_args {
  constructor(init?: undelete_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
}

declare class data_desc {
  constructor(init?: data_desc);
  limit00: number;
  base00: number;
  base16: number;
  type: number;
  dpl: number;
  present: number;
  limit16: number;
  : number;
  stksz: number;
  granular: number;
  base24: number;
}

declare class chown_args {
  constructor(init?: chown_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  uid_l_: unknown /* const array */;
  uid: number;
  uid_r_: unknown /* const array */;
  gid_l_: unknown /* const array */;
  gid: number;
  gid_r_: unknown /* const array */;
}

declare class removexattr_args {
  constructor(init?: removexattr_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  attrname_l_: unknown /* const array */;
  attrname: number;
  attrname_r_: unknown /* const array */;
  options_l_: unknown /* const array */;
  options: number;
  options_r_: unknown /* const array */;
}

declare class kqueue_args {
  constructor(init?: kqueue_args);
  dummy: number;
}

declare class unnamed_12637277973368066917 {
  constructor(init?: unnamed_12637277973368066917);
  connectionHandle: number;
  maxTransmitLatency: number;
  maxReceiveLatency: number;
  minRemoteTimeout: number;
  minLocalTimeout: number;
}

declare class SuperSpeedEndpointCompanionDescriptor {
  constructor(init?: SuperSpeedEndpointCompanionDescriptor);
  bLength: number;
  bDescriptorType: number;
  bMaxBurst: number;
  bmAttributes: number;
  wBytesPerInterval: number;
}

declare class arcade_upcall_subsystem {
  constructor(init?: arcade_upcall_subsystem);
  server: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  start: number;
  end: number;
  maxsize: number;
  reserved: number;
  routine: unknown /* const array */;
}

declare class unnamed_5239407480510953743 {
  constructor(init?: unnamed_5239407480510953743);
  connectionHandle: number;
}

declare class __Reply__mach_notify_port_destroyed_t {
  constructor(init?: __Reply__mach_notify_port_destroyed_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class mach_eventlink_wait_until_args {
  constructor(init?: mach_eventlink_wait_until_args);
  eventlink_port_l_: unknown /* const array */;
  eventlink_port: number;
  eventlink_port_r_: unknown /* const array */;
  wait_count_l_: unknown /* const array */;
  wait_count: number;
  wait_count_r_: unknown /* const array */;
  deadline_l_: unknown /* const array */;
  deadline: number;
  deadline_r_: unknown /* const array */;
  clock_id_l_: unknown /* const array */;
  clock_id: number;
  clock_id_r_: unknown /* const array */;
  option_l_: unknown /* const array */;
  option: number;
  option_r_: unknown /* const array */;
}

declare class rt_addrinfo_ext {
  constructor(init?: rt_addrinfo_ext);
  rtix_info: rt_addrinfo;
  rtix_tiny_addr: unknown /* const array */;
  rtix_next_tiny: number;
}

declare class bpf_comp_hdr {
  constructor(init?: bpf_comp_hdr);
  bh_tstamp: timeval32;
  bh_caplen: number;
  bh_datalen: number;
  bh_hdrlen: number;
  bh_complen: number;
  bh_padding: number;
}

declare class dup_args {
  constructor(init?: dup_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
}

declare class fileport_makeport_args {
  constructor(init?: fileport_makeport_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  portnamep_l_: unknown /* const array */;
  portnamep: number;
  portnamep_r_: unknown /* const array */;
}

declare class rmdir_args {
  constructor(init?: rmdir_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
}

declare class unnamed_10844994020169998523 {
  constructor(init?: unnamed_10844994020169998523);
  deviceAddress: BluetoothDeviceAddress;
  numericValue: number;
}

declare class setgid_args {
  constructor(init?: setgid_args);
  gid_l_: unknown /* const array */;
  gid: number;
  gid_r_: unknown /* const array */;
}

declare class __Request__fairplayd_arcade_request_t {
  constructor(init?: __Request__fairplayd_arcade_request_t);
  Head: mach_msg_header_t;
  msgh_body: mach_msg_body_t;
  arcade_reg_port: mach_msg_port_descriptor_t;
}

declare class munlock_args {
  constructor(init?: munlock_args);
  addr_l_: unknown /* const array */;
  addr: number;
  addr_r_: number;
  len_l_: unknown /* const array */;
  len: number;
  len_r_: number;
}

declare class EFI_TABLE_HEADER {
  constructor(init?: EFI_TABLE_HEADER);
  Signature: number;
  Revision: number;
  HeaderSize: number;
  CRC32: number;
  Reserved: number;
}

declare class tcp_conn_status {
  constructor(init?: tcp_conn_status);
}

declare class sigprocmask_args {
  constructor(init?: sigprocmask_args);
  how_l_: unknown /* const array */;
  how: number;
  how_r_: unknown /* const array */;
  mask_l_: unknown /* const array */;
  mask: number;
  mask_r_: unknown /* const array */;
  omask_l_: unknown /* const array */;
  omask: number;
  omask_r_: unknown /* const array */;
}

declare class EXDisplayPipeHealthRecord {
  constructor(init?: EXDisplayPipeHealthRecord);
  timestamp: number;
  health: boolean;
}

declare class IOCircularDataQueueMemory {
  constructor(init?: IOCircularDataQueueMemory);
  sentinel: number;
  _padding: number;
  entries: unknown /* const array */;
}

declare class syscp_ID_instructions_feat_1_reg {
  constructor(init?: syscp_ID_instructions_feat_1_reg);
  endianness_support: number;
  exception_1_support: number;
  exception_2_support: number;
  sign_zero_ext_support: number;
  if_then_support: number;
  immediate_support: number;
  interworking_support: number;
  jazelle_support: number;
}

declare class lockf {
  constructor(init?: lockf);
  lf_flags: number;
  lf_type: number;
  lf_start: number;
  lf_end: number;
  lf_id: string | null;
  lf_head: interop.Pointer;
  lf_vnode: interop.Pointer;
  lf_next: interop.Pointer;
  lf_blkhd: locklist;
  lf_block: unnamed_3271796597595602678;
  lf_owner: interop.Pointer;
}

declare class getdtablesize_args {
  constructor(init?: getdtablesize_args);
  dummy: number;
}

declare class mptcp_symptoms_answer {
  constructor(init?: mptcp_symptoms_answer);
  advisory: symptoms_advisory;
  uuid: unknown /* const array */;
  rssi: number;
}

declare class IOExternalAsyncMethod {
  constructor(init?: IOExternalAsyncMethod);
  object: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  func: number;
  flags: number;
  count0: number;
  count1: number;
}

declare class unnamed_8193567900268426915 {
  constructor(init?: unnamed_8193567900268426915);
  usage: number;
  reserved1: number;
  stringIndex: number;
  reserved2: number;
  designatorIndex: number;
  reserved3: number;
}

declare class faccessat_args {
  constructor(init?: faccessat_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  amode_l_: unknown /* const array */;
  amode: number;
  amode_r_: unknown /* const array */;
  flag_l_: unknown /* const array */;
  flag: number;
  flag_r_: unknown /* const array */;
}

declare class _AVCConnectTargetPlugsOutParams {
  constructor(init?: _AVCConnectTargetPlugsOutParams);
  sourcePlugNum: number;
  destPlugNum: number;
}

declare class net_qos_guideline_args {
  constructor(init?: net_qos_guideline_args);
  param_l_: unknown /* const array */;
  param: number;
  param_r_: unknown /* const array */;
  param_len_l_: unknown /* const array */;
  param_len: number;
  param_len_r_: unknown /* const array */;
}

declare class __Reply__mach_notify_dead_name_t {
  constructor(init?: __Reply__mach_notify_dead_name_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class EfiMemoryRange {
  constructor(init?: EfiMemoryRange);
  Type: number;
  Pad: number;
  PhysicalStart: number;
  VirtualStart: number;
  NumberOfPages: number;
  Attribute: number;
}

declare class conninfo_mptcp {
  constructor(init?: conninfo_mptcp);
  mptcpci_len: number;
  mptcpci_flow_offset: number;
  mptcpci_nflows: number;
  mptcpci_state: number;
  mptcpci_mpte_flags: number;
  mptcpci_flags: number;
  mptcpci_ltoken: number;
  mptcpci_rtoken: number;
  mptcpci_notsent_lowat: number;
  mptcpci_snduna: number;
  mptcpci_sndnxt: number;
  mptcpci_sndmax: number;
  mptcpci_lidsn: number;
  mptcpci_sndwnd: number;
  mptcpci_rcvnxt: number;
  mptcpci_ridsn: number;
  mptcpci_rcvwnd: number;
  mptcpci_mpte_addrid: number;
  mptcpci_flows: unknown /* const array */;
}

declare class __CodeDirectory {
  constructor(init?: __CodeDirectory);
  magic: number;
  length: number;
  version: number;
  flags: number;
  hashOffset: number;
  identOffset: number;
  nSpecialSlots: number;
  nCodeSlots: number;
  codeLimit: number;
  hashSize: number;
  hashType: number;
  platform: number;
  pageSize: number;
  spare2: number;
  end_earliest: unknown /* const array */;
  scatterOffset: number;
  end_withScatter: unknown /* const array */;
  teamOffset: number;
  end_withTeam: unknown /* const array */;
  spare3: number;
  codeLimit64: number;
  end_withCodeLimit64: unknown /* const array */;
  execSegBase: number;
  execSegLimit: number;
  execSegFlags: number;
  end_withExecSeg: unknown /* const array */;
  runtime: number;
  preEncryptOffset: number;
  end_withPreEncryptOffset: unknown /* const array */;
  linkageHashType: number;
  linkageApplicationType: number;
  linkageApplicationSubType: number;
  linkageOffset: number;
  linkageSize: number;
  end_withLinkage: unknown /* const array */;
}

declare class if_rxpoll_stats {
  constructor(init?: if_rxpoll_stats);
  ifi_poll_off_req: number;
  ifi_poll_off_err: number;
  ifi_poll_on_req: number;
  ifi_poll_on_err: number;
  ifi_poll_wakeups_avg: number;
  ifi_poll_wakeups_lowat: number;
  ifi_poll_wakeups_hiwat: number;
  ifi_poll_packets: number;
  ifi_poll_packets_avg: number;
  ifi_poll_packets_min: number;
  ifi_poll_packets_max: number;
  ifi_poll_packets_lowat: number;
  ifi_poll_packets_hiwat: number;
  ifi_poll_bytes: number;
  ifi_poll_bytes_avg: number;
  ifi_poll_bytes_min: number;
  ifi_poll_bytes_max: number;
  ifi_poll_bytes_lowat: number;
  ifi_poll_bytes_hiwat: number;
  ifi_poll_packets_limit: number;
  ifi_poll_interval_time: number;
}

declare class mptcp_itf_stats {
  constructor(init?: mptcp_itf_stats);
  ifindex: number;
  switches: number;
  is_expensive: number;
  mpis_txbytes: number;
  mpis_rxbytes: number;
  mpis_wifi_txbytes: number;
  mpis_wifi_rxbytes: number;
  mpis_wired_txbytes: number;
  mpis_wired_rxbytes: number;
  mpis_cell_txbytes: number;
  mpis_cell_rxbytes: number;
}

declare class locklist {
  constructor(init?: locklist);
  tqh_first: interop.Pointer;
  tqh_last: interop.Pointer;
}

declare class getlogin_args {
  constructor(init?: getlogin_args);
  namebuf_l_: unknown /* const array */;
  namebuf: number;
  namebuf_r_: unknown /* const array */;
  namelen_l_: unknown /* const array */;
  namelen: number;
  namelen_r_: unknown /* const array */;
}

declare class __Reply__mach_voucher_attr_control_create_mach_voucher_t {
  constructor(init?: __Reply__mach_voucher_attr_control_create_mach_voucher_t);
  Head: mach_msg_header_t;
  msgh_body: mach_msg_body_t;
  voucher: mach_msg_port_descriptor_t;
}

declare class DTMemoryMapRange {
  constructor(init?: DTMemoryMapRange);
  paddr: number;
  length: number;
}

declare class vfs_purge_args {
  constructor(init?: vfs_purge_args);
  dummy: number;
}

declare class bsdthread_terminate_args {
  constructor(init?: bsdthread_terminate_args);
  stackaddr_l_: unknown /* const array */;
  stackaddr: number;
  stackaddr_r_: unknown /* const array */;
  freesize_l_: unknown /* const array */;
  freesize: number;
  freesize_r_: unknown /* const array */;
  port_l_: unknown /* const array */;
  port: number;
  port_r_: unknown /* const array */;
  sema_or_ulock_l_: unknown /* const array */;
  sema_or_ulock: number;
  sema_or_ulock_r_: unknown /* const array */;
}

declare class in6_ondireq {
  constructor(init?: in6_ondireq);
  ifname: unknown /* const array */;
  ndi: unnamed_7506672353382092904;
}

declare class setgroups_args {
  constructor(init?: setgroups_args);
  gidsetsize_l_: unknown /* const array */;
  gidsetsize: number;
  gidsetsize_r_: unknown /* const array */;
  gidset_l_: unknown /* const array */;
  gidset: number;
  gidset_r_: unknown /* const array */;
}

declare class kevent_args {
  constructor(init?: kevent_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  changelist_l_: unknown /* const array */;
  changelist: number;
  changelist_r_: unknown /* const array */;
  nchanges_l_: unknown /* const array */;
  nchanges: number;
  nchanges_r_: unknown /* const array */;
  eventlist_l_: unknown /* const array */;
  eventlist: number;
  eventlist_r_: unknown /* const array */;
  nevents_l_: unknown /* const array */;
  nevents: number;
  nevents_r_: unknown /* const array */;
  timeout_l_: unknown /* const array */;
  timeout: number;
  timeout_r_: unknown /* const array */;
}

declare class thsc_time_energy_cpi {
  constructor(init?: thsc_time_energy_cpi);
  ttec_instructions: number;
  ttec_cycles: number;
  ttec_user_time_mach: number;
  ttec_system_time_mach: number;
  ttec_energy_nj: number;
}

declare class kev_dl_node_presence {
  constructor(init?: kev_dl_node_presence);
  link_data: net_event_data;
  sin6_node_address: sockaddr_in6;
  sdl_node_address: sockaddr_dl;
  rssi: number;
  link_quality_metric: number;
  node_proximity_metric: number;
  node_service_info: unknown /* const array */;
}

declare class _evScreen {
  constructor(init?: _evScreen);
}

declare class __mach_bridge_remote_time_args {
  constructor(init?: __mach_bridge_remote_time_args);
  local_timestamp_l_: unknown /* const array */;
  local_timestamp: number;
  local_timestamp_r_: unknown /* const array */;
}

declare class sfi_pidctl_args {
  constructor(init?: sfi_pidctl_args);
  operation_l_: unknown /* const array */;
  operation: number;
  operation_r_: unknown /* const array */;
  pid_l_: unknown /* const array */;
  pid: number;
  pid_r_: unknown /* const array */;
  sfi_flags_l_: unknown /* const array */;
  sfi_flags: number;
  sfi_flags_r_: unknown /* const array */;
  out_sfi_flags_l_: unknown /* const array */;
  out_sfi_flags: number;
  out_sfi_flags_r_: unknown /* const array */;
}

declare class __lck_attr__ {
  constructor(init?: __lck_attr__);
}

declare class access_extended_args {
  constructor(init?: access_extended_args);
  entries_l_: unknown /* const array */;
  entries: number;
  entries_r_: unknown /* const array */;
  size_l_: unknown /* const array */;
  size: number;
  size_r_: unknown /* const array */;
  results_l_: unknown /* const array */;
  results: number;
  results_r_: unknown /* const array */;
  uid_l_: unknown /* const array */;
  uid: number;
  uid_r_: unknown /* const array */;
}

declare class telemetry_notification_subsystem {
  constructor(init?: telemetry_notification_subsystem);
  server: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  start: number;
  end: number;
  maxsize: number;
  reserved: number;
  routine: unknown /* const array */;
}

declare class mount_args {
  constructor(init?: mount_args);
  type_l_: unknown /* const array */;
  type: number;
  type_r_: unknown /* const array */;
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
  data_l_: unknown /* const array */;
  data: number;
  data_r_: unknown /* const array */;
}

declare class OpaqueDTEntryIterator {
  constructor(init?: OpaqueDTEntryIterator);
  outerScope: interop.Pointer;
  currentScope: interop.Pointer;
  currentEntry: interop.Pointer;
  savedScope: interop.Pointer;
  currentIndex: number;
}

declare class trust_cache_entry1 {
  constructor(init?: trust_cache_entry1);
  cdhash: unknown /* const array */;
  hash_type: number;
  flags: number;
}

declare class rtstat_64 {
  constructor(init?: rtstat_64);
  rts_badredirect: number;
  rts_dynamic: number;
  rts_newgateway: number;
  rts_unreach: number;
  rts_wildcard: number;
  rts_badrtgwroute: number;
}

declare class unnamed_11961482558713411480 {
  constructor(init?: unnamed_11961482558713411480);
  connectionHandle: number;
}

declare class getgid_args {
  constructor(init?: getgid_args);
  dummy: number;
}

declare class in6_ndifreq {
  constructor(init?: in6_ndifreq);
  ifname: unknown /* const array */;
  ifindex: number;
}

declare class vnop_advlock_args {
  constructor(init?: vnop_advlock_args);
}

declare class usrctl_args {
  constructor(init?: usrctl_args);
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
}

declare class sigsuspend_args {
  constructor(init?: sigsuspend_args);
  mask_l_: unknown /* const array */;
  mask: number;
  mask_r_: unknown /* const array */;
}

declare class os_fault_with_payload_args {
  constructor(init?: os_fault_with_payload_args);
  reason_namespace_l_: unknown /* const array */;
  reason_namespace: number;
  reason_namespace_r_: unknown /* const array */;
  reason_code_l_: unknown /* const array */;
  reason_code: number;
  reason_code_r_: unknown /* const array */;
  payload_l_: unknown /* const array */;
  payload: number;
  payload_r_: unknown /* const array */;
  payload_size_l_: unknown /* const array */;
  payload_size: number;
  payload_size_r_: unknown /* const array */;
  reason_string_l_: unknown /* const array */;
  reason_string: number;
  reason_string_r_: unknown /* const array */;
  reason_flags_l_: unknown /* const array */;
  reason_flags: number;
  reason_flags_r_: unknown /* const array */;
}

declare class fsync_args {
  constructor(init?: fsync_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
}

declare class sptm_call_regs_t {
  constructor(init?: sptm_call_regs_t);
  x0: number;
  x1: number;
  x2: number;
  x3: number;
  x4: number;
  x5: number;
  x6: number;
  x7: number;
}

declare class __Request__sysdiagnose_notification_t {
  constructor(init?: __Request__sysdiagnose_notification_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  flags: number;
}

declare class unnamed_17559510431102801758 {
  constructor(init?: unnamed_17559510431102801758);
  deviceAddress: BluetoothDeviceAddress;
}

declare class daleipc_network_clock_controller {
  constructor(init?: daleipc_network_clock_controller);
}

declare class __Request__coalition_notification_t {
  constructor(init?: __Request__coalition_notification_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  id: number;
  flags: number;
}

declare class receive_vfs_nspace_subsystem {
  constructor(init?: receive_vfs_nspace_subsystem);
  server: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  start: number;
  end: number;
  maxsize: number;
  reserved: number;
  routine: unknown /* const array */;
}

declare class preadv_args {
  constructor(init?: preadv_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  iovp_l_: unknown /* const array */;
  iovp: number;
  iovp_r_: unknown /* const array */;
  iovcnt_l_: unknown /* const array */;
  iovcnt: number;
  iovcnt_r_: unknown /* const array */;
  offset_l_: unknown /* const array */;
  offset: number;
  offset_r_: unknown /* const array */;
}

declare class __Reply__check_task_access_with_flavor_t {
  constructor(init?: __Reply__check_task_access_with_flavor_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class cpuid_xsave_leaf_t {
  constructor(init?: cpuid_xsave_leaf_t);
  extended_state: unknown /* const array */;
}

declare class IOUSBHostPipe_LocalIVars {
  constructor(init?: IOUSBHostPipe_LocalIVars);
}

declare class clock_reply_subsystem {
  constructor(init?: clock_reply_subsystem);
  server: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  start: number;
  end: number;
  maxsize: number;
  reserved: number;
  routine: unknown /* const array */;
}

declare class nfs_filehandle {
  constructor(init?: nfs_filehandle);
  nfh_len: number;
  nfh_xh: nfs_exphandle;
  nfh_fid: unknown /* const array */;
  nfh_fhp: interop.Pointer;
}

declare class IOAudioClientBuffer64 {
  constructor(init?: IOAudioClientBuffer64);
  mAudioClientBuffer32: IOAudioClientBuffer;
  mUnmappedSourceBuffer64: number;
  mNextBuffer64: interop.Pointer;
}

declare class unnamed_16984036581783024317 {
  constructor(init?: unnamed_16984036581783024317);
  ACLDataPacketLength: number;
  totalNumACLDataPackets: number;
}

declare class getaudit_addr_args {
  constructor(init?: getaudit_addr_args);
  auditinfo_addr_l_: unknown /* const array */;
  auditinfo_addr: number;
  auditinfo_addr_r_: unknown /* const array */;
  length_l_: unknown /* const array */;
  length: number;
  length_r_: unknown /* const array */;
}

declare class netsvctype_dscp_map {
  constructor(init?: netsvctype_dscp_map);
}

declare class __lck_mtx_ext_t__ {
  constructor(init?: __lck_mtx_ext_t__);
}

declare class aio_return_args {
  constructor(init?: aio_return_args);
  aiocbp_l_: unknown /* const array */;
  aiocbp: number;
  aiocbp_r_: unknown /* const array */;
}

declare class HIDValueCaps {
  constructor(init?: HIDValueCaps);
  usagePage: number;
  reportID: number;
  bitField: number;
  collection: number;
  collectionUsage: number;
  collectionUsagePage: number;
  isRange: number;
  isStringRange: number;
  isDesignatorRange: number;
  isAbsolute: number;
  startBit: number;
  bitSize: number;
  reportCount: number;
  logicalMin: number;
  logicalMax: number;
  physicalMin: number;
  physicalMax: number;
  u: unnamed_11897257300510808881;
}

declare class kd_cpumap {
  constructor(init?: kd_cpumap);
  cpu_id: number;
  flags: number;
  name: unknown /* const array */;
}

declare class getgroups_args {
  constructor(init?: getgroups_args);
  gidsetsize_l_: unknown /* const array */;
  gidsetsize: number;
  gidsetsize_r_: unknown /* const array */;
  gidset_l_: unknown /* const array */;
  gidset: number;
  gidset_r_: unknown /* const array */;
}

declare class unnamed_15070889580481282394 {
  constructor(init?: unnamed_15070889580481282394);
  z: unknown /* const array */;
  p: unknown /* const array */;
}

declare class DeviceTreeNodeProperty {
  constructor(init?: DeviceTreeNodeProperty);
  name: unknown /* const array */;
  length: number;
}

declare class if_traffic_class {
  constructor(init?: if_traffic_class);
  ifi_ibepackets: number;
  ifi_ibebytes: number;
  ifi_obepackets: number;
  ifi_obebytes: number;
  ifi_ibkpackets: number;
  ifi_ibkbytes: number;
  ifi_obkpackets: number;
  ifi_obkbytes: number;
  ifi_ivipackets: number;
  ifi_ivibytes: number;
  ifi_ovipackets: number;
  ifi_ovibytes: number;
  ifi_ivopackets: number;
  ifi_ivobytes: number;
  ifi_ovopackets: number;
  ifi_ovobytes: number;
  ifi_ipvpackets: number;
  ifi_ipvbytes: number;
  ifi_opvpackets: number;
  ifi_opvbytes: number;
}

declare class __Request__mach_notify_no_senders_t {
  constructor(init?: __Request__mach_notify_no_senders_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  mscount: number;
}

declare class ifnet_attach_proto_param_v2 {
  constructor(init?: ifnet_attach_proto_param_v2);
  demux_array: interop.Pointer;
  demux_count: number;
  input: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  pre_output: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: string, p7: string) => number | null;
  event: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void | null;
  ioctl: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible) => number | null;
  detached: (p1: interop.PointerConvertible, p2: number) => number | null;
  resolve: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number) => number | null;
  send_arp: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible) => number | null;
}

declare class backtrace_control {
  constructor(init?: backtrace_control);
  btc_flags: interop.Enum<typeof backtrace_flags_t>;
  btc_frame_addr: number;
  btc_user_thread: interop.Pointer;
  btc_user_copy: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => number | null;
  btc_user_copy_context: interop.Pointer;
  btc_addr_offset: number;
}

declare class circle_queue_head {
  constructor(init?: circle_queue_head);
  head: interop.Pointer;
}

declare class IOACPIAddressSpaceDescriptor {
  constructor(init?: IOACPIAddressSpaceDescriptor);
  resourceType: number;
  generalFlags: number;
  typeSpecificFlags: number;
  reserved1: number;
  granularity: number;
  minAddressRange: number;
  maxAddressRange: number;
  translationOffset: number;
  addressLength: number;
  reserved2: number;
  reserved3: number;
  reserved4: number;
}

declare class unnamed_6984174266375345627 {
  constructor(init?: unnamed_6984174266375345627);
  connectionHandle: number;
  transmissionInterval: number;
  retransmissionWindow: number;
  receivePacketLength: number;
  transmitPacketLength: number;
}

declare class OSObjectUserVars {
  constructor(init?: OSObjectUserVars);
}

declare class BOSDescriptor {
  constructor(init?: BOSDescriptor);
  bLength: number;
  bDescriptorType: number;
  wTotalLength: number;
  bNumDeviceCaps: number;
}

declare class macos_panic_header {
  constructor(init?: macos_panic_header);
  mph_magic: number;
  mph_crc: number;
  mph_version: number;
  mph_padding: number;
  mph_panic_flags: interop.Enum<typeof mph_panic_flags_t>;
  mph_panic_log_offset: number;
  mph_panic_log_len: number;
  mph_stackshot_offset: number;
  mph_stackshot_len: number;
  mph_other_log_offset: number;
  mph_other_log_len: number;
  mph_roots_installed: number;
  mph_data: interop.Pointer;
}

declare class unnamed_7837601036402508668 {
  constructor(init?: unnamed_7837601036402508668);
  length: number;
  data: unknown /* const array */;
}

declare class __Request__vfs_resolve_file_t {
  constructor(init?: __Request__vfs_resolve_file_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  req_id: number;
  pid: number;
  op: number;
  offset: number;
  size: number;
  path: unknown /* const array */;
}

declare class task_read_for_pid_args {
  constructor(init?: task_read_for_pid_args);
  target_tport_l_: unknown /* const array */;
  target_tport: number;
  target_tport_r_: unknown /* const array */;
  pid_l_: unknown /* const array */;
  pid: number;
  pid_r_: unknown /* const array */;
  t_l_: unknown /* const array */;
  t: number;
  t_r_: unknown /* const array */;
}

declare class unnamed_5027695301846269373 {
  constructor(init?: unnamed_5027695301846269373);
  results: unknown /* const array */;
  count: number;
}

declare class unnamed_17714015121045366557 {
  constructor(init?: unnamed_17714015121045366557);
  data: unknown /* const array */;
}

declare class priority_queue {
  constructor(init?: priority_queue);
}

declare class unnamed_1254637360707554498 {
  constructor(init?: unnamed_1254637360707554498);
  registerNum: number;
  functionNum: number;
  deviceNum: number;
  busNum: number;
  registerNumExtended: number;
  resv: number;
}

declare class in6_route_info {
  constructor(init?: in6_route_info);
  prefix: in6_addr;
  prefixlen: number;
  defrtrs: number;
}

declare class IOInterruptAccountingReporter {
  constructor(init?: IOInterruptAccountingReporter);
}

declare class __pthread_fchdir_args {
  constructor(init?: __pthread_fchdir_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
}

declare class IOHIDDevice_IVars {
  constructor(init?: IOHIDDevice_IVars);
}

declare class __Reply__memory_error_notification_t {
  constructor(init?: __Reply__memory_error_notification_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class unlink_args {
  constructor(init?: unlink_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
}

declare class in6_ndireq {
  constructor(init?: in6_ndireq);
  ifname: unknown /* const array */;
  ndi: nd_ifinfo;
}

declare class fchdir_args {
  constructor(init?: fchdir_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
}

declare class kdebug_trace64_args {
  constructor(init?: kdebug_trace64_args);
  code_l_: unknown /* const array */;
  code: number;
  code_r_: unknown /* const array */;
  arg1_l_: unknown /* const array */;
  arg1: number;
  arg1_r_: unknown /* const array */;
  arg2_l_: unknown /* const array */;
  arg2: number;
  arg2_r_: unknown /* const array */;
  arg3_l_: unknown /* const array */;
  arg3: number;
  arg3_r_: unknown /* const array */;
  arg4_l_: unknown /* const array */;
  arg4: number;
  arg4_r_: unknown /* const array */;
}

declare class auditpipe_ioctl_preselect {
  constructor(init?: auditpipe_ioctl_preselect);
  aip_auid: number;
  aip_mask: au_mask;
}

declare class ipv6_prefix {
  constructor(init?: ipv6_prefix);
  ipv6_prefix: in6_addr;
  prefix_len: number;
}

declare class getpgid_args {
  constructor(init?: getpgid_args);
  pid_l_: unknown /* const array */;
  pid: number;
  pid_r_: unknown /* const array */;
}

declare class if_ipv6_address {
  constructor(init?: if_ipv6_address);
  v6_address: in6_addr;
  v6_prefixlen: number;
}

declare class audit_args {
  constructor(init?: audit_args);
  record_l_: unknown /* const array */;
  record: number;
  record_r_: unknown /* const array */;
  length_l_: unknown /* const array */;
  length: number;
  length_r_: unknown /* const array */;
}

declare class __pthread_markcancel_args {
  constructor(init?: __pthread_markcancel_args);
  thread_port_l_: unknown /* const array */;
  thread_port: number;
  thread_port_r_: unknown /* const array */;
}

declare class StringDescriptor {
  constructor(init?: StringDescriptor);
  bLength: number;
  bDescriptorType: number;
  bString: unknown /* const array */;
}

declare class nfs_sec {
  constructor(init?: nfs_sec);
  count: number;
  flavors: unknown /* const array */;
}

declare class unlinkat_args {
  constructor(init?: unlinkat_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  flag_l_: unknown /* const array */;
  flag: number;
  flag_r_: unknown /* const array */;
}

declare class setwgroups_args {
  constructor(init?: setwgroups_args);
  setlen_l_: unknown /* const array */;
  setlen: number;
  setlen_r_: unknown /* const array */;
  guidset_l_: unknown /* const array */;
  guidset: number;
  guidset_r_: unknown /* const array */;
}

declare class unnamed_7918682949767724152 {
  constructor(init?: unnamed_7918682949767724152);
  userCallback: number;
  userRefCon: number;
  internalRefCon: number;
  asyncIDRefCon: number;
  reserved: number;
}

declare class __Reply__mach_voucher_attr_control_get_values_t {
  constructor(init?: __Reply__mach_voucher_attr_control_get_values_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
  value_handlesCnt: number;
  value_handles: unknown /* const array */;
}

declare class code_desc {
  constructor(init?: code_desc);
  limit00: number;
  base00: number;
  base16: number;
  type: number;
  dpl: number;
  present: number;
  limit16: number;
  : number;
  Lflag: number;
  opsz: number;
  granular: number;
  base24: number;
}

declare class bsdthread_register_args {
  constructor(init?: bsdthread_register_args);
  threadstart_l_: unknown /* const array */;
  threadstart: number;
  threadstart_r_: unknown /* const array */;
  wqthread_l_: unknown /* const array */;
  wqthread: number;
  wqthread_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
  stack_addr_hint_l_: unknown /* const array */;
  stack_addr_hint: number;
  stack_addr_hint_r_: unknown /* const array */;
  targetconc_ptr_l_: unknown /* const array */;
  targetconc_ptr: number;
  targetconc_ptr_r_: unknown /* const array */;
  dispatchqueue_offset_l_: unknown /* const array */;
  dispatchqueue_offset: number;
  dispatchqueue_offset_r_: unknown /* const array */;
  tsd_offset_l_: unknown /* const array */;
  tsd_offset: number;
  tsd_offset_r_: unknown /* const array */;
}

declare class KeyAttribute {
  constructor(init?: KeyAttribute);
  _flags: number;
  KeyAttribute: (p1: number) => number | null;
}

declare class copyfile_args {
  constructor(init?: copyfile_args);
  from_l_: unknown /* const array */;
  from: number;
  from_r_: unknown /* const array */;
  to_l_: unknown /* const array */;
  to: number;
  to_r_: unknown /* const array */;
  mode_l_: unknown /* const array */;
  mode: number;
  mode_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
}

declare class bpf_comp_stats {
  constructor(init?: bpf_comp_stats);
  bcs_total_read: number;
  bcs_total_size: number;
  bcs_total_hdr_size: number;
  bcs_count_no_common_prefix: number;
  bcs_count_compressed_prefix: number;
  bcs_total_compressed_prefix_size: number;
  bcs_max_compressed_prefix_size: number;
}

declare class sflt_filter {
  constructor(init?: sflt_filter);
  sf_handle: number;
  sf_flags: number;
  sf_name: string | null;
  sf_unregistered: (p1: number) => void | null;
  sf_attach: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  sf_detach: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  sf_notify: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => void | null;
  sf_getpeername: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  sf_getsockname: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  sf_data_in: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: number) => number | null;
  sf_data_out: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: number) => number | null;
  sf_connect_in: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  sf_connect_out: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  sf_bind: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  sf_setoption: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  sf_getoption: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  sf_listen: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  sf_ioctl: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: string) => number | null;
  sf_ext: sflt_filter_ext;
}

declare class _IORecursiveLock {
  constructor(init?: _IORecursiveLock);
}

declare class __Reply__mach_exception_raise_state_t {
  constructor(init?: __Reply__mach_exception_raise_state_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
  flavor: number;
  new_stateCnt: number;
  new_state: unknown /* const array */;
}

declare class setrlimit_args {
  constructor(init?: setrlimit_args);
  which_l_: unknown /* const array */;
  which: number;
  which_r_: unknown /* const array */;
  rlp_l_: unknown /* const array */;
  rlp: number;
  rlp_r_: unknown /* const array */;
}

declare class unnamed_5606102264819608990 {
  constructor(init?: unnamed_5606102264819608990);
  transmitBandWidth: number;
  receiveBandWidth: number;
  maxLatency: number;
  voiceSetting: number;
  retransmissionEffort: number;
  packetType: number;
}

declare class rt_msghdr_common {
  constructor(init?: rt_msghdr_common);
  rtm_msglen: number;
  rtm_version: number;
  rtm_type: number;
  rtm_index: number;
  rtm_flags: number;
  rtm_addrs: number;
  rtm_pid: number;
  rtm_seq: number;
  rtm_errno: number;
  rtm_use: number;
}

declare class waitid_nocancel_args {
  constructor(init?: waitid_nocancel_args);
  idtype_l_: unknown /* const array */;
  idtype: interop.Enum<typeof idtype_t>;
  idtype_r_: unknown /* const array */;
  id_l_: unknown /* const array */;
  id: number;
  id_r_: unknown /* const array */;
  infop_l_: unknown /* const array */;
  infop: number;
  infop_r_: unknown /* const array */;
  options_l_: unknown /* const array */;
  options: number;
  options_r_: unknown /* const array */;
}

declare class __Reply__ktrace_background_available_t {
  constructor(init?: __Reply__ktrace_background_available_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class if_netif_stats {
  constructor(init?: if_netif_stats);
  ifn_rx_mit_interval: number;
  ifn_rx_mit_mode: number;
  ifn_rx_mit_packets_avg: number;
  ifn_rx_mit_packets_min: number;
  ifn_rx_mit_packets_max: number;
  ifn_rx_mit_bytes_avg: number;
  ifn_rx_mit_bytes_min: number;
  ifn_rx_mit_bytes_max: number;
  ifn_rx_mit_cfg_idx: number;
  ifn_rx_mit_cfg_packets_lowat: number;
  ifn_rx_mit_cfg_packets_hiwat: number;
  ifn_rx_mit_cfg_bytes_lowat: number;
  ifn_rx_mit_cfg_bytes_hiwat: number;
  ifn_rx_mit_cfg_interval: number;
}

declare class __Request__vfs_resolve_file_with_audit_token_t {
  constructor(init?: __Request__vfs_resolve_file_with_audit_token_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  req_id: number;
  op: number;
  offset: number;
  size: number;
  path: unknown /* const array */;
  req_atoken: audit_token_t;
}

declare class IOExternalMethodArgumentsOpaque {
  constructor(init?: IOExternalMethodArgumentsOpaque);
}

declare class unnamed_13857940943358947447 {
  constructor(init?: unnamed_13857940943358947447);
  transmitBandwidth: number;
  receiveBandwidth: number;
  maxLatency: number;
  contentFormat: number;
  retransmissionEffort: number;
  packetType: number;
}

declare class fs_snapshot_args {
  constructor(init?: fs_snapshot_args);
  op_l_: unknown /* const array */;
  op: number;
  op_r_: unknown /* const array */;
  dirfd_l_: unknown /* const array */;
  dirfd: number;
  dirfd_r_: unknown /* const array */;
  name1_l_: unknown /* const array */;
  name1: number;
  name1_r_: unknown /* const array */;
  name2_l_: unknown /* const array */;
  name2: number;
  name2_r_: unknown /* const array */;
  data_l_: unknown /* const array */;
  data: number;
  data_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
}

declare class nfs_export_stat_rec {
  constructor(init?: nfs_export_stat_rec);
  path: unknown /* const array */;
  ops: number;
  bytes_read: number;
  bytes_written: number;
}

declare class getxattr_args {
  constructor(init?: getxattr_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  attrname_l_: unknown /* const array */;
  attrname: number;
  attrname_r_: unknown /* const array */;
  value_l_: unknown /* const array */;
  value: number;
  value_r_: unknown /* const array */;
  size_l_: unknown /* const array */;
  size: number;
  size_r_: unknown /* const array */;
  position_l_: unknown /* const array */;
  position: number;
  position_r_: unknown /* const array */;
  options_l_: unknown /* const array */;
  options: number;
  options_r_: unknown /* const array */;
}

declare class IOSimpleReportValues {
  constructor(init?: IOSimpleReportValues);
  simple_value: number;
  reserved1: number;
  reserved2: number;
  reserved3: number;
}

declare class __mac_execve_args {
  constructor(init?: __mac_execve_args);
  fname_l_: unknown /* const array */;
  fname: number;
  fname_r_: unknown /* const array */;
  argp_l_: unknown /* const array */;
  argp: number;
  argp_r_: unknown /* const array */;
  envp_l_: unknown /* const array */;
  envp: number;
  envp_r_: unknown /* const array */;
  mac_p_l_: unknown /* const array */;
  mac_p: number;
  mac_p_r_: unknown /* const array */;
}

declare class user_nfs_export_args {
  constructor(init?: user_nfs_export_args);
  nxa_fsid: number;
  nxa_expid: number;
  nxa_fspath: number;
  nxa_exppath: number;
  nxa_flags: number;
  nxa_netcount: number;
  nxa_nets: number;
}

declare class kevent64_args {
  constructor(init?: kevent64_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  changelist_l_: unknown /* const array */;
  changelist: number;
  changelist_r_: unknown /* const array */;
  nchanges_l_: unknown /* const array */;
  nchanges: number;
  nchanges_r_: unknown /* const array */;
  eventlist_l_: unknown /* const array */;
  eventlist: number;
  eventlist_r_: unknown /* const array */;
  nevents_l_: unknown /* const array */;
  nevents: number;
  nevents_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
  timeout_l_: unknown /* const array */;
  timeout: number;
  timeout_r_: unknown /* const array */;
}

declare class unnamed_12636272579211584056 {
  constructor(init?: unnamed_12636272579211584056);
  indicator: interop.Enum<typeof EXDisplayPipeIndicator>;
  x: number;
  y: number;
  w: number;
  h: number;
  alpha: number;
  enabled: boolean;
  populated: boolean;
}

declare class embedded_panic_header {
  constructor(init?: embedded_panic_header);
  eph_magic: number;
  eph_crc: number;
  eph_version: number;
  eph_panic_flags: interop.Enum<typeof eph_panic_flags_t>;
  eph_panic_log_offset: number;
  eph_panic_log_len: number;
  eph_stackshot_offset: number;
  eph_stackshot_len: number;
  eph_other_log_offset: number;
  eph_other_log_len: number;
  eph_os_version: unknown /* const array */;
  eph_macos_version: unknown /* const array */;
  eph_bootsessionuuid_string: unknown /* const array */;
  eph_roots_installed: number;
  eph_ext_paniclog_offset: number;
  eph_ext_paniclog_len: number;
  eph_panic_initiator_offset: number;
  eph_panic_initiator_len: number;
}

declare class fsetxattr_args {
  constructor(init?: fsetxattr_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  attrname_l_: unknown /* const array */;
  attrname: number;
  attrname_r_: unknown /* const array */;
  value_l_: unknown /* const array */;
  value: number;
  value_r_: unknown /* const array */;
  size_l_: unknown /* const array */;
  size: number;
  size_r_: unknown /* const array */;
  position_l_: unknown /* const array */;
  position: number;
  position_r_: unknown /* const array */;
  options_l_: unknown /* const array */;
  options: number;
  options_r_: unknown /* const array */;
}

declare class micro_snapshot {
  constructor(init?: micro_snapshot);
  snapshot_magic: number;
  ms_cpu: number;
  ms_time: number;
  ms_time_microsecs: number;
  ms_flags: number;
  ms_opaque_flags: number;
}

declare class csops_args {
  constructor(init?: csops_args);
  pid_l_: unknown /* const array */;
  pid: number;
  pid_r_: unknown /* const array */;
  ops_l_: unknown /* const array */;
  ops: number;
  ops_r_: unknown /* const array */;
  useraddr_l_: unknown /* const array */;
  useraddr: number;
  useraddr_r_: unknown /* const array */;
  usersize_l_: unknown /* const array */;
  usersize: number;
  usersize_r_: unknown /* const array */;
}

declare class aio_error_args {
  constructor(init?: aio_error_args);
  aiocbp_l_: unknown /* const array */;
  aiocbp: number;
  aiocbp_r_: unknown /* const array */;
}

declare class i386_cpu_info {
  constructor(init?: i386_cpu_info);
  cpuid_vendor: unknown /* const array */;
  cpuid_brand_string: unknown /* const array */;
  cpuid_model_string: string | null;
  cpuid_type: number;
  cpuid_family: number;
  cpuid_model: number;
  cpuid_extmodel: number;
  cpuid_extfamily: number;
  cpuid_stepping: number;
  cpuid_features: number;
  cpuid_extfeatures: number;
  cpuid_signature: number;
  cpuid_brand: number;
  cpuid_processor_flag: number;
  cache_size: unknown /* const array */;
  cache_linesize: number;
  cache_info: unknown /* const array */;
  cpuid_cores_per_package: number;
  cpuid_logical_per_package: number;
  cache_sharing: unknown /* const array */;
  cache_partitions: unknown /* const array */;
  cpuid_cpu_type: number;
  cpuid_cpu_subtype: number;
  cpuid_mwait_leaf: cpuid_mwait_leaf_t;
  cpuid_thermal_leaf: cpuid_thermal_leaf_t;
  cpuid_arch_perf_leaf: cpuid_arch_perf_leaf_t;
  unused: unknown /* const array */;
  cpuid_cache_linesize: number;
  cpuid_cache_L2_associativity: number;
  cpuid_cache_size: number;
  cpuid_address_bits_physical: number;
  cpuid_address_bits_virtual: number;
  cpuid_microcode_version: number;
  cpuid_tlb: unknown /* const array */;
  cpuid_stlb: number;
  core_count: number;
  thread_count: number;
  cpuid_max_basic: number;
  cpuid_max_ext: number;
  cpuid_cpufamily: number;
  cpuid_mwait_leafp: interop.Pointer;
  cpuid_thermal_leafp: interop.Pointer;
  cpuid_arch_perf_leafp: interop.Pointer;
  cpuid_xsave_leafp: interop.Pointer;
  cpuid_leaf7_features: number;
  cpuid_leaf7_extfeatures: number;
  cpuid_tsc_leaf: cpuid_tsc_leaf_t;
  cpuid_xsave_leaf: unknown /* const array */;
}

declare class unnamed_9573910560995373467 {
  constructor(init?: unnamed_9573910560995373467);
  seqNum: bigint;
  dataSize: bigint;
  generation: bigint;
  _reserved: bigint;
  wrStatus: bigint;
}

declare class kdebug_typefilter_args {
  constructor(init?: kdebug_typefilter_args);
  addr_l_: unknown /* const array */;
  addr: number;
  addr_r_: unknown /* const array */;
  size_l_: unknown /* const array */;
  size: number;
  size_r_: unknown /* const array */;
}

declare class TransducerData {
  constructor(init?: TransducerData);
}

declare class getuid_args {
  constructor(init?: getuid_args);
  dummy: number;
}

declare class fremovexattr_args {
  constructor(init?: fremovexattr_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  attrname_l_: unknown /* const array */;
  attrname: number;
  attrname_r_: unknown /* const array */;
  options_l_: unknown /* const array */;
  options: number;
  options_r_: unknown /* const array */;
}

declare class __Request__vfs_resolve_dir_with_audit_token_t {
  constructor(init?: __Request__vfs_resolve_dir_with_audit_token_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  req_id: number;
  op: number;
  file_name: unknown /* const array */;
  path: unknown /* const array */;
  req_atoken: audit_token_t;
}

declare class airship_acipc_tr_transfer_completion {
  constructor(init?: airship_acipc_tr_transfer_completion);
  io_result: interop.Enum<typeof airship_acipc_io_result>;
  cr_id: number;
  status_code: number;
  descriptor_type: number;
  size: number;
  client_data: number;
  last_completed_transfer: boolean;
  last_in_chain: boolean;
  next_tag: number;
}

declare class IOReportInterest {
  constructor(init?: IOReportInterest);
  provider_id: number;
  channel: IOReportChannel;
}

declare class funmount_args {
  constructor(init?: funmount_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
}

declare class unnamed_18045901316761299192 {
  constructor(init?: unnamed_18045901316761299192);
  role: number;
  handle: number;
}

declare class fsetattrlist_args {
  constructor(init?: fsetattrlist_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  alist_l_: unknown /* const array */;
  alist: number;
  alist_r_: unknown /* const array */;
  attributeBuffer_l_: unknown /* const array */;
  attributeBuffer: number;
  attributeBuffer_r_: unknown /* const array */;
  bufferSize_l_: unknown /* const array */;
  bufferSize: number;
  bufferSize_r_: unknown /* const array */;
  options_l_: unknown /* const array */;
  options: number;
  options_r_: unknown /* const array */;
}

declare class _iopol_param_t {
  constructor(init?: _iopol_param_t);
  iop_scope: number;
  iop_iotype: number;
  iop_policy: number;
}

declare class record_system_event_args {
  constructor(init?: record_system_event_args);
  type_l_: unknown /* const array */;
  type: number;
  type_r_: unknown /* const array */;
  subsystem_l_: unknown /* const array */;
  subsystem: number;
  subsystem_r_: unknown /* const array */;
  event_l_: unknown /* const array */;
  event: number;
  event_r_: unknown /* const array */;
  payload_l_: unknown /* const array */;
  payload: number;
  payload_r_: unknown /* const array */;
}

declare class IOHIDDevice_LocalIVars {
  constructor(init?: IOHIDDevice_LocalIVars);
}

declare class sptm_trace_buffer_t {
  constructor(init?: sptm_trace_buffer_t);
  write_index: number;
  buffer: unknown /* const array */;
}

declare class IOUSBHostIsochronousCompletion {
  constructor(init?: IOUSBHostIsochronousCompletion);
  owner: interop.Pointer;
  action: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => void | null;
  parameter: interop.Pointer;
}

declare class BillboardAltModeCapabilityCompatibility {
  constructor(init?: BillboardAltModeCapabilityCompatibility);
  wSVID: number;
  dwAlternateMode: number;
  iAlternateModeString: number;
}

declare class bpf_hdr_ext {
  constructor(init?: bpf_hdr_ext);
  bh_tstamp: timeval32;
  bh_caplen: number;
  bh_datalen: number;
  bh_hdrlen: number;
  bh_complen: number;
  bh_flags: number;
  bh_pid: number;
  bh_comm: unknown /* const array */;
  bh_pktflags: number;
  bh_trace_tag: number;
  bh_svc: number;
  bh_flowid: number;
  bh_unsent_bytes: number;
  bh_unsent_snd: number;
  bh_comp_gencnt: number;
}

declare class _dyld_cache_header {
  constructor(init?: _dyld_cache_header);
  magic: unknown /* const array */;
  mappingOffset: number;
  mappingCount: number;
  imagesOffset: number;
  imagesCount: number;
  dyldBaseAddress: number;
  codeSignatureOffset: number;
  codeSignatureSize: number;
  slideInfoOffset: number;
  slideInfoSize: number;
  localSymbolsOffset: number;
  localSymbolsSize: number;
  uuid: unknown /* const array */;
  cacheType: number;
  branchPoolsOffset: number;
  branchPoolsCount: number;
  accelerateInfoAddr: number;
  accelerateInfoSize: number;
  imagesTextOffset: number;
  imagesTextCount: number;
  dylibsImageGroupAddr: number;
  dylibsImageGroupSize: number;
  otherImageGroupAddr: number;
  otherImageGroupSize: number;
  progClosuresAddr: number;
  progClosuresSize: number;
  progClosuresTrieAddr: number;
  progClosuresTrieSize: number;
  platform: number;
  formatVersion: number;
  dylibsExpectedOnDisk: number;
  simulator: number;
  locallyBuiltCache: number;
  padding: number;
}

declare class __Reply__nspace_resolve_path_t {
  constructor(init?: __Reply__nspace_resolve_path_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
  resolve_error: number;
}

declare class getegid_args {
  constructor(init?: getegid_args);
  dummy: number;
}

declare class __Request__mach_notify_send_once_t {
  constructor(init?: __Request__mach_notify_send_once_t);
  Head: mach_msg_header_t;
}

declare class IOKitDiagnosticsParameters {
  constructor(init?: IOKitDiagnosticsParameters);
  size: number;
  value: number;
  options: number;
  tag: number;
  zsize: number;
  reserved: unknown /* const array */;
}

declare class user32_ntptimeval {
  constructor(init?: user32_ntptimeval);
  time: user32_timespec;
  maxerror: number;
  esterror: number;
  tai: number;
  time_state: number;
}

declare class ATAPICmdPacket {
  constructor(init?: ATAPICmdPacket);
  atapiPacketSize: number;
  atapiCommandByte: unknown /* const array */;
}

declare class user_timeval {
  constructor(init?: user_timeval);
  tv_sec: number;
  tv_usec: number;
}

declare class MD5_CTX {
  constructor(init?: MD5_CTX);
  state: unknown /* const array */;
  count: unknown /* const array */;
  buffer: unknown /* const array */;
}

declare class pwrite_nocancel_args {
  constructor(init?: pwrite_nocancel_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  buf_l_: unknown /* const array */;
  buf: number;
  buf_r_: unknown /* const array */;
  nbyte_l_: unknown /* const array */;
  nbyte: number;
  nbyte_r_: unknown /* const array */;
  offset_l_: unknown /* const array */;
  offset: number;
  offset_r_: unknown /* const array */;
}

declare class __Reply__mach_gss_accept_sec_context_t {
  constructor(init?: __Reply__mach_gss_accept_sec_context_t);
  Head: mach_msg_header_t;
  msgh_body: mach_msg_body_t;
  key: mach_msg_ool_descriptor_t;
  outtoken: mach_msg_ool_descriptor_t;
  NDR: NDR_record_t;
  context: number;
  cred_handle: number;
  flags: number;
  uid: number;
  gidsCnt: number;
  gids: unknown /* const array */;
  keyCnt: number;
  outtokenCnt: number;
  major_stat: number;
  minor_stat: number;
}

declare class writev_args {
  constructor(init?: writev_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  iovp_l_: unknown /* const array */;
  iovp: number;
  iovp_r_: unknown /* const array */;
  iovcnt_l_: unknown /* const array */;
  iovcnt: number;
  iovcnt_r_: unknown /* const array */;
}

declare class IOCircularDataQueueMemoryCursor {
  constructor(init?: IOCircularDataQueueMemoryCursor);
  generation: number;
  position: number;
  sequenceNum: number;
}

declare class issetugid_args {
  constructor(init?: issetugid_args);
  dummy: number;
}

declare class thread_call {
  constructor(init?: thread_call);
}

declare class SuperSpeedPlusUSBDeviceCapabilityDescriptor {
  constructor(init?: SuperSpeedPlusUSBDeviceCapabilityDescriptor);
  bLength: number;
  bDescriptorType: number;
  bDevCapabilityType: number;
  bReserved: number;
  bmAttributes: number;
  wFunctionalitySupport: number;
  wReserved: number;
  bmSublinkSpeedAttr: interop.Pointer;
}

declare class HIDCaps {
  constructor(init?: HIDCaps);
  usage: number;
  usagePage: number;
  inputReportByteLength: number;
  outputReportByteLength: number;
  featureReportByteLength: number;
  numberCollectionNodes: number;
  numberInputButtonCaps: number;
  numberInputValueCaps: number;
  numberOutputButtonCaps: number;
  numberOutputValueCaps: number;
  numberFeatureButtonCaps: number;
  numberFeatureValueCaps: number;
}

declare class if_linkheuristics {
  constructor(init?: if_linkheuristics);
  iflh_link_heuristics_cnt: number;
  iflh_link_heuristics_time: number;
  iflh_congested_link_cnt: number;
  iflh_congested_link_time: number;
  iflh_lqm_good_cnt: number;
  iflh_lqm_good_time: number;
  iflh_lqm_poor_cnt: number;
  iflh_lqm_poor_time: number;
  iflh_lqm_min_viable_cnt: number;
  iflh_lqm_min_viable_time: number;
  iflh_lqm_bad_cnt: number;
  iflh_lqm_bad_time: number;
  iflh_tcp_linkheur_stealthdrop: number;
  iflh_tcp_linkheur_noackpri: number;
  iflh_tcp_linkheur_comprxmt: number;
  iflh_tcp_linkheur_synrxmt: number;
  iflh_tcp_linkheur_rxmtfloor: number;
  iflh_udp_linkheur_stealthdrop: number;
}

declare class gettimeofday_args {
  constructor(init?: gettimeofday_args);
  tp_l_: unknown /* const array */;
  tp: number;
  tp_r_: unknown /* const array */;
  tzp_l_: unknown /* const array */;
  tzp: number;
  tzp_r_: unknown /* const array */;
  mach_absolute_time_l_: unknown /* const array */;
  mach_absolute_time: number;
  mach_absolute_time_r_: unknown /* const array */;
}

declare class conninfo_multipathtcp {
  constructor(init?: conninfo_multipathtcp);
  mptcpci_subflow_count: number;
  mptcpci_switch_count: number;
  mptcpci_subflow_connids: unknown /* const array */;
  mptcpci_init_rxbytes: number;
  mptcpci_init_txbytes: number;
  mptcpci_itfstats: unknown /* const array */;
  mptcpci_flags: number;
}

declare class ether_vlan_header {
  constructor(init?: ether_vlan_header);
  evl_dhost: unknown /* const array */;
  evl_shost: unknown /* const array */;
  evl_encap_proto: number;
  evl_tag: number;
  evl_proto: number;
}

declare class __Request__mach_gss_lookup_t {
  constructor(init?: __Request__mach_gss_lookup_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  uid: number;
  asid: number;
}

declare class unnamed_16013633380207743845 {
  constructor(init?: unnamed_16013633380207743845);
  nlm_lock: number;
  nlm_test: number;
  nlm_unlock: number;
}

declare class if_nsreq {
  constructor(init?: if_nsreq);
  ifnsr_name: unknown /* const array */;
  ifnsr_family: number;
  ifnsr_len: number;
  ifnsr_flags: number;
  ifnsr_data: unknown /* const array */;
}

declare class mcc_ecc_event_t {
  constructor(init?: mcc_ecc_event_t);
  version: interop.Enum<typeof mcc_ecc_version_t>;
  flags: interop.Enum<typeof mcc_flags_t>;
  status: number;
  amcc: number;
  plane: number;
  bank: number;
  way: number;
  index: number;
  bit_off_cl: number;
  bit_off_within_hcl: number;
}

declare class aio_read_args {
  constructor(init?: aio_read_args);
  aiocbp_l_: unknown /* const array */;
  aiocbp: number;
  aiocbp_r_: unknown /* const array */;
}

declare class unnamed_9139678767609557297 {
  constructor(init?: unnamed_9139678767609557297);
  transmitBandWidth: number;
  receiveBandWidth: number;
  transmitCodingFormat: number;
  receiveCodingFormat: number;
  transmitCodecFrameSize: number;
  receiveCodecFrameSize: number;
  inputBandwidth: number;
  outputBandwidth: number;
  inputCodingFormat: number;
  outputCodingFormat: number;
  inputCodedDataSize: number;
  outputCodedDataSize: number;
  inputPCMDataFormat: number;
  outputPCMDataFormat: number;
  inputPCMSampelPayloadMSBPosition: number;
  outputPCMSampelPayloadMSBPosition: number;
  inputDataPath: number;
  outputDataPath: number;
  inputTransportUnitSize: number;
  outputTransportUnitSize: number;
  maxLatency: number;
  voiceSetting: number;
  retransmissionEffort: number;
  packetType: number;
}

declare class oslog_coproc_args {
  constructor(init?: oslog_coproc_args);
  buff_l_: unknown /* const array */;
  buff: number;
  buff_r_: unknown /* const array */;
  buff_len_l_: unknown /* const array */;
  buff_len: number;
  buff_len_r_: unknown /* const array */;
  type_l_: unknown /* const array */;
  type: number;
  type_r_: unknown /* const array */;
  uuid_l_: unknown /* const array */;
  uuid: number;
  uuid_r_: unknown /* const array */;
  timestamp_l_: unknown /* const array */;
  timestamp: number;
  timestamp_r_: unknown /* const array */;
  offset_l_: unknown /* const array */;
  offset: number;
  offset_r_: unknown /* const array */;
  stream_log_l_: unknown /* const array */;
  stream_log: number;
  stream_log_r_: unknown /* const array */;
}

declare class FWSegment {
  constructor(init?: FWSegment);
  address: FWAddressStruct;
  length: number;
}

declare class nfserr_info {
  constructor(init?: nfserr_info);
  nei_name: string | null;
  nei_error: number;
  nei_index: number;
}

declare class objc_bp_assist_cfg_np_args {
  constructor(init?: objc_bp_assist_cfg_np_args);
  adr_l_: unknown /* const array */;
  adr: number;
  adr_r_: unknown /* const array */;
  ctl_l_: unknown /* const array */;
  ctl: number;
  ctl_r_: unknown /* const array */;
}

declare class nosys_args {
  constructor(init?: nosys_args);
  dummy: number;
}

declare class sptm_guest_dispatch_sme_t {
  constructor(init?: sptm_guest_dispatch_sme_t);
  tpidr2_el0: number;
  smpri_el1: number;
  svcr: number;
}

declare class IOUSBHostHIDDescriptor {
  constructor(init?: IOUSBHostHIDDescriptor);
}

declare class user64_ntptimeval {
  constructor(init?: user64_ntptimeval);
  time: user64_timespec;
  maxerror: number;
  esterror: number;
  tai: number;
  time_state: number;
}

declare class sptm_trace_t {
  constructor(init?: sptm_trace_t);
  trace_id: number;
  trace_type: number;
  dispatch_id: number;
  cpu_id: number;
}

declare class getrlimit_args {
  constructor(init?: getrlimit_args);
  which_l_: unknown /* const array */;
  which: number;
  which_r_: unknown /* const array */;
  rlp_l_: unknown /* const array */;
  rlp: number;
  rlp_r_: unknown /* const array */;
}

declare class setattrlist_args {
  constructor(init?: setattrlist_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  alist_l_: unknown /* const array */;
  alist: number;
  alist_r_: unknown /* const array */;
  attributeBuffer_l_: unknown /* const array */;
  attributeBuffer: number;
  attributeBuffer_r_: unknown /* const array */;
  bufferSize_l_: unknown /* const array */;
  bufferSize: number;
  bufferSize_r_: unknown /* const array */;
  options_l_: unknown /* const array */;
  options: number;
  options_r_: unknown /* const array */;
}

declare class image_params {
  constructor(init?: image_params);
  ip_user_fname: number;
  ip_user_argv: number;
  ip_user_envv: number;
  ip_seg: number;
  ip_vp: interop.Pointer;
  ip_vattr: interop.Pointer;
  ip_origvattr: interop.Pointer;
  ip_origcputype: number;
  ip_origcpusubtype: number;
  ip_vdata: string | null;
  ip_flags: number;
  ip_argc: number;
  ip_envc: number;
  ip_applec: number;
  ip_startargv: string | null;
  ip_endargv: string | null;
  ip_endenvv: string | null;
  ip_strings: string | null;
  ip_strendp: string | null;
  ip_subsystem_root_path: string | null;
  ip_argspace: number;
  ip_strspace: number;
  ip_arch_offset: number;
  ip_arch_size: number;
  ip_interp_buffer: unknown /* const array */;
  ip_interp_sugid_fd: number;
  ip_vfs_context: interop.Pointer;
  ip_ndp: interop.Pointer;
  ip_new_thread: number;
  ip_execlabelp: interop.Pointer;
  ip_scriptlabelp: interop.Pointer;
  ip_scriptvp: interop.Pointer;
  ip_csflags: number;
  ip_mac_return: number;
  ip_px_sa: interop.Pointer;
  ip_px_sfa: interop.Pointer;
  ip_px_spa: interop.Pointer;
  ip_free_map: number;
  ip_px_smpx: ip_px_smpx_s;
  ip_px_persona: interop.Pointer;
  ip_px_pcred_info: interop.Pointer;
  ip_cs_error: interop.Pointer;
  ip_inherited_shared_region_id: string | null;
  ip_dyld_fsid: number;
  ip_dyld_fsobjid: number;
  ip_inherited_jop_pid: number;
  ip_simulator_binary: number;
}

declare class ataTaskFile {
  constructor(init?: ataTaskFile);
  ataTFFeatures: number;
  ataTFCount: number;
  ataTFSector: number;
  ataTFCylLo: number;
  ataTFCylHigh: number;
  ataTFSDH: number;
  ataTFCommand: number;
}

declare class unnamed_7443987149512840025 {
  constructor(init?: unnamed_7443987149512840025);
  connectionHandle: number;
  deviceAddress: BluetoothDeviceAddress;
  linkType: number;
  transmissionInterval: number;
  retransmissionWindow: number;
  receivePacketLength: number;
  transmitPacketLength: number;
  airMode: number;
}

declare class in6_nbrinfo {
  constructor(init?: in6_nbrinfo);
  ifname: unknown /* const array */;
  addr: in6_addr;
  asked: number;
  isrouter: number;
  state: number;
  expire: number;
}

declare class __Request__audit_analytics_t {
  constructor(init?: __Request__audit_analytics_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  caller_idOffset: number;
  caller_idCnt: number;
  caller_id: unknown /* const array */;
  caller_nameOffset: number;
  caller_nameCnt: number;
  caller_name: unknown /* const array */;
}

declare class __Reply__sysdiagnose_notification_t {
  constructor(init?: __Reply__sysdiagnose_notification_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class ecc_event {
  constructor(init?: ecc_event);
  id: number;
  count: number;
  data: unknown /* const array */;
}

declare class setegid_args {
  constructor(init?: setegid_args);
  egid_l_: unknown /* const array */;
  egid: number;
  egid_r_: unknown /* const array */;
}

declare class workq_open_args {
  constructor(init?: workq_open_args);
  dummy: number;
}

declare class unnamed_15433866698738595994 {
  constructor(init?: unnamed_15433866698738595994);
  linkType: number;
}

declare class cpuid_tsc_leaf_t {
  constructor(init?: cpuid_tsc_leaf_t);
  numerator: number;
  denominator: number;
}

declare class audit_session_self_args {
  constructor(init?: audit_session_self_args);
  dummy: number;
}

declare class unnamed_9302259702586539480 {
  constructor(init?: unnamed_9302259702586539480);
  oldtss: sel;
  : number;
  esp0: number;
  ss0: sel;
  : number;
  esp1: number;
  ss1: sel;
  : number;
  esp2: number;
  ss2: sel;
  : number;
  cr3: number;
  eip: number;
  eflags: number;
  eax: number;
  ecx: number;
  edx: number;
  ebx: number;
  esp: number;
  ebp: number;
  esi: number;
  edi: number;
  es: sel;
  : number;
  cs: sel;
  : number;
  ss: sel;
  : number;
  ds: sel;
  : number;
  fs: sel;
  : number;
  gs: sel;
  : number;
  ldt: sel;
  : number;
  t: number;
  : number;
  io_bmap: number;
}

declare class unnamed_5424080561640605351 {
  constructor(init?: unnamed_5424080561640605351);
  error: number;
}

declare class trust_cache_module1 {
  constructor(init?: trust_cache_module1);
  version: number;
  uuid: unknown /* const array */;
  num_entries: number;
  entries: interop.Pointer;
}

declare class sem_open_args {
  constructor(init?: sem_open_args);
  name_l_: unknown /* const array */;
  name: number;
  name_r_: unknown /* const array */;
  oflag_l_: unknown /* const array */;
  oflag: number;
  oflag_r_: unknown /* const array */;
  mode_l_: unknown /* const array */;
  mode: number;
  mode_r_: unknown /* const array */;
  value_l_: unknown /* const array */;
  value: number;
  value_r_: unknown /* const array */;
}

declare class rt_msghdr_ext {
  constructor(init?: rt_msghdr_ext);
  rtm_msglen: number;
  rtm_version: number;
  rtm_type: number;
  rtm_index: number;
  rtm_flags: number;
  rtm_reserved: number;
  rtm_addrs: number;
  rtm_pid: number;
  rtm_seq: number;
  rtm_errno: number;
  rtm_use: number;
  rtm_inits: number;
  rtm_rmx: rt_metrics;
  rtm_ri: rt_reach_info;
}

declare class writev_nocancel_args {
  constructor(init?: writev_nocancel_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  iovp_l_: unknown /* const array */;
  iovp: number;
  iovp_r_: unknown /* const array */;
  iovcnt_l_: unknown /* const array */;
  iovcnt: number;
  iovcnt_r_: unknown /* const array */;
}

declare class airship_driver {
  constructor(init?: airship_driver);
}

declare class mpsc_queue_head {
  constructor(init?: mpsc_queue_head);
  mpqh_head: mpsc_queue_chain;
  mpqh_tail: unknown /* _Atomic(struct mpsc_queue_chain *) (CXTypeKind: 177) */;
}

declare class arm_debug_info_t {
  constructor(init?: arm_debug_info_t);
  memory_mapped_core_debug: number;
  coprocessor_core_debug: number;
  num_watchpoint_pairs: number;
  num_breakpoint_pairs: number;
}

declare class unnamed_16186450300110611679 {
  constructor(init?: unnamed_16186450300110611679);
  flags: number;
  serviceType: number;
  tokenRate: number;
  tokenBucketSize: number;
  peakBandwidth: number;
  latency: number;
  delayVariation: number;
}

declare class IOFBCursorControlCallouts {
  constructor(init?: IOFBCursorControlCallouts);
  setCursorImage: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  setCursorState: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: boolean) => number | null;
  reserved: unknown /* const array */;
}

declare class arm_saved_state {
  constructor(init?: arm_saved_state);
}

declare class _AVCConnectTargetPlugsInParams {
  constructor(init?: _AVCConnectTargetPlugsInParams);
  sourceSubunitTypeAndID: number;
  sourcePlugType: interop.Enum<typeof IOFWAVCPlugTypes>;
  sourcePlugNum: number;
  destSubunitTypeAndID: number;
  destPlugType: interop.Enum<typeof IOFWAVCPlugTypes>;
  destPlugNum: number;
  lockConnection: number;
  permConnection: number;
}

declare class EndpointDescriptor {
  constructor(init?: EndpointDescriptor);
  bLength: number;
  bDescriptorType: number;
  bEndpointAddress: number;
  bmAttributes: number;
  wMaxPacketSize: number;
  bInterval: number;
}

declare class iopolicysys_args {
  constructor(init?: iopolicysys_args);
  cmd_l_: unknown /* const array */;
  cmd: number;
  cmd_r_: unknown /* const array */;
  arg_l_: unknown /* const array */;
  arg: number;
  arg_r_: unknown /* const array */;
}

declare class lockd_notify {
  constructor(init?: lockd_notify);
  ln_version: number;
  ln_flags: number;
  ln_pad: number;
  ln_addrcount: number;
  ln_addr: interop.Pointer;
}

declare class if_packet_stats {
  constructor(init?: if_packet_stats);
  ifi_tcp_badformat: number;
  ifi_tcp_unspecv6: number;
  ifi_tcp_synfin: number;
  ifi_tcp_badformatipsec: number;
  ifi_tcp_noconnnolist: number;
  ifi_tcp_noconnlist: number;
  ifi_tcp_listbadsyn: number;
  ifi_tcp_icmp6unreach: number;
  ifi_tcp_deprecate6: number;
  ifi_tcp_rstinsynrcv: number;
  ifi_tcp_ooopacket: number;
  ifi_tcp_dospacket: number;
  ifi_tcp_cleanup: number;
  ifi_tcp_synwindow: number;
  reserved: unknown /* const array */;
  ifi_udp_port_unreach: number;
  ifi_udp_faithprefix: number;
  ifi_udp_port0: number;
  ifi_udp_badlength: number;
  ifi_udp_badchksum: number;
  ifi_udp_badmcast: number;
  ifi_udp_cleanup: number;
  ifi_udp_badipsec: number;
  _reserved: unknown /* const array */;
}

declare class airship_daleipc_downlink_packet_completion {
  constructor(init?: airship_daleipc_downlink_packet_completion);
  tag: number;
  data_length: number;
  data_offset: number;
  channel_id: number;
  checksum: number;
  protocol: number;
  drop: number;
  ignore: number;
  error: number;
  wake_packet: number;
}

declare class unnamed_12707122223376989547 {
  constructor(init?: unnamed_12707122223376989547);
  attr_idx: number;
  flags: number;
}

declare class kpc_get_counters_remote {
  constructor(init?: kpc_get_counters_remote);
  classes: number;
  nb_counters: number;
  buf_stride: number;
  buf: interop.Pointer;
}

declare class IOUSBHostDevice_IVars {
  constructor(init?: IOUSBHostDevice_IVars);
}

declare class pwritev_nocancel_args {
  constructor(init?: pwritev_nocancel_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  iovp_l_: unknown /* const array */;
  iovp: number;
  iovp_r_: unknown /* const array */;
  iovcnt_l_: unknown /* const array */;
  iovcnt: number;
  iovcnt_r_: unknown /* const array */;
  offset_l_: unknown /* const array */;
  offset: number;
  offset_r_: unknown /* const array */;
}

declare class BillboardAltModeCapabilityDescriptor {
  constructor(init?: BillboardAltModeCapabilityDescriptor);
  bLength: number;
  bDescriptorType: number;
  bDevCapabilityType: number;
  bIndex: number;
  dwAlternateModeVdo: number;
}

declare class __Request__upl_abort_t {
  constructor(init?: __Request__upl_abort_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  abort_cond: number;
}

declare class IOAudioStreamFormatDesc {
  constructor(init?: IOAudioStreamFormatDesc);
}

declare class hvg_hcall_args {
  constructor(init?: hvg_hcall_args);
  args: unknown /* const array */;
}

declare class shm_unlink_args {
  constructor(init?: shm_unlink_args);
  name_l_: unknown /* const array */;
  name: number;
  name_r_: unknown /* const array */;
}

declare class cpuid_arch_perf_leaf_t {
  constructor(init?: cpuid_arch_perf_leaf_t);
  version: number;
  number: number;
  width: number;
  events_number: number;
  events: number;
  fixed_number: number;
  fixed_width: number;
}

declare class setlogin_args {
  constructor(init?: setlogin_args);
  namebuf_l_: unknown /* const array */;
  namebuf: number;
  namebuf_r_: unknown /* const array */;
}

declare class __Reply__vfs_resolve_dir_with_audit_token_t {
  constructor(init?: __Reply__vfs_resolve_dir_with_audit_token_t);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  RetCode: number;
}

declare class cpuid_thermal_leaf_t {
  constructor(init?: cpuid_thermal_leaf_t);
  sensor: number;
  dynamic_acceleration: number;
  invariant_APIC_timer: number;
  core_power_limits: number;
  fine_grain_clock_mod: number;
  package_thermal_intr: number;
  thresholds: number;
  ACNT_MCNT: number;
  hardware_feedback: number;
  energy_policy: number;
}

declare class openat_args {
  constructor(init?: openat_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
  mode_l_: unknown /* const array */;
  mode: number;
  mode_r_: unknown /* const array */;
}

declare class IOExternalMethodArguments {
  constructor(init?: IOExternalMethodArguments);
  version: number;
  selector: number;
  asyncWakePort: number;
  asyncReference: interop.Pointer;
  asyncReferenceCount: number;
  scalarInput: interop.Pointer;
  scalarInputCount: number;
  structureInput: interop.Pointer;
  structureInputSize: number;
  structureInputDescriptor: interop.Pointer;
  scalarOutput: interop.Pointer;
  scalarOutputCount: number;
  structureOutput: interop.Pointer;
  structureOutputSize: number;
  structureOutputDescriptor: interop.Pointer;
  structureOutputDescriptorSize: number;
  __reservedA: number;
  structureVariableOutputData: interop.Pointer;
  __reserved: unknown /* const array */;
}

declare class unnamed_11975482992842642533 {
  constructor(init?: unnamed_11975482992842642533);
  usageMin: number;
  usageMax: number;
  stringMin: number;
  stringMax: number;
  designatorMin: number;
  designatorMax: number;
}

declare class if_description {
  constructor(init?: if_description);
  ifd_maxlen: number;
  ifd_len: number;
  ifd_desc: interop.Pointer;
}

declare class abort_with_payload_args {
  constructor(init?: abort_with_payload_args);
  reason_namespace_l_: unknown /* const array */;
  reason_namespace: number;
  reason_namespace_r_: unknown /* const array */;
  reason_code_l_: unknown /* const array */;
  reason_code: number;
  reason_code_r_: unknown /* const array */;
  payload_l_: unknown /* const array */;
  payload: number;
  payload_r_: unknown /* const array */;
  payload_size_l_: unknown /* const array */;
  payload_size: number;
  payload_size_r_: unknown /* const array */;
  reason_string_l_: unknown /* const array */;
  reason_string: number;
  reason_string_r_: unknown /* const array */;
  reason_flags_l_: unknown /* const array */;
  reason_flags: number;
  reason_flags_r_: unknown /* const array */;
}

declare class sigreturn_args {
  constructor(init?: sigreturn_args);
  uctx_l_: unknown /* const array */;
  uctx: number;
  uctx_r_: unknown /* const array */;
  infostyle_l_: unknown /* const array */;
  infostyle: number;
  infostyle_r_: unknown /* const array */;
  token_l_: unknown /* const array */;
  token: number;
  token_r_: unknown /* const array */;
}

declare class USB20ExtensionCapabilityDescriptor {
  constructor(init?: USB20ExtensionCapabilityDescriptor);
  bLength: number;
  bDescriptorType: number;
  bDevCapabilityType: number;
  bmAttributes: number;
}

declare class audit_triggers_subsystem {
  constructor(init?: audit_triggers_subsystem);
  server: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  start: number;
  end: number;
  maxsize: number;
  reserved: number;
  routine: unknown /* const array */;
}

declare class __Request__mach_gss_accept_sec_context_v2_t {
  constructor(init?: __Request__mach_gss_accept_sec_context_v2_t);
  Head: mach_msg_header_t;
  msgh_body: mach_msg_body_t;
  intoken: mach_msg_ool_descriptor_t;
  svc_princ: mach_msg_ool_descriptor_t;
  NDR: NDR_record_t;
  intokenCnt: number;
  svc_nt: interop.Enum<typeof gssd_nametype>;
  svc_princCnt: number;
  gssd_flags: number;
  context: number;
  cred_handle: number;
}

declare class nfs_specdata {
  constructor(init?: nfs_specdata);
  specdata1: number;
  specdata2: number;
}

declare class __Request__doubleagent_allocate_xattr_t {
  constructor(init?: __Request__doubleagent_allocate_xattr_t);
  Head: mach_msg_header_t;
  msgh_body: mach_msg_body_t;
  file_port: mach_msg_port_descriptor_t;
  NDR: NDR_record_t;
  file_size: number;
  nameOffset: number;
  nameCnt: number;
  name: unknown /* const array */;
  size: number;
  options: number;
}

declare class guarded_pwrite_np_args {
  constructor(init?: guarded_pwrite_np_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  guard_l_: unknown /* const array */;
  guard: number;
  guard_r_: unknown /* const array */;
  buf_l_: unknown /* const array */;
  buf: number;
  buf_r_: unknown /* const array */;
  nbyte_l_: unknown /* const array */;
  nbyte: number;
  nbyte_r_: unknown /* const array */;
  offset_l_: unknown /* const array */;
  offset: number;
  offset_r_: unknown /* const array */;
}

declare class DeviceDescriptor {
  constructor(init?: DeviceDescriptor);
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

declare class AsyncCommitCall {
  constructor(init?: AsyncCommitCall);
}

declare class kill_args {
  constructor(init?: kill_args);
  pid_l_: unknown /* const array */;
  pid: number;
  pid_r_: unknown /* const array */;
  signum_l_: unknown /* const array */;
  signum: number;
  signum_r_: unknown /* const array */;
  posix_l_: unknown /* const array */;
  posix: number;
  posix_r_: unknown /* const array */;
}

declare class list_head {
  constructor(init?: list_head);
  prev: interop.Pointer;
  next: interop.Pointer;
}

declare class componentname {
  constructor(init?: componentname);
}

declare class kev_dl_low_power_mode {
  constructor(init?: kev_dl_low_power_mode);
  link_data: net_event_data;
  low_power_event: number;
}

declare class if_nexusreq {
  constructor(init?: if_nexusreq);
  ifnr_name: unknown /* const array */;
  ifnr_flags: number;
  ifnr_netif: unknown /* const array */;
  ifnr_flowswitch: unknown /* const array */;
  ifnr_reserved: unknown /* const array */;
}

declare class unnamed_7506672353382092904 {
  constructor(init?: unnamed_7506672353382092904);
  linkmtu: number;
  maxmtu: number;
  basereachable: number;
  reachable: number;
  retrans: number;
  flags: number;
  recalctm: number;
  chlim: number;
  receivedra: number;
  collision_count: number;
}

declare class __Request__mach_voucher_attr_control_get_values_t {
  constructor(init?: __Request__mach_voucher_attr_control_get_values_t);
  Head: mach_msg_header_t;
  msgh_body: mach_msg_body_t;
  voucher: mach_msg_port_descriptor_t;
  NDR: NDR_record_t;
  value_handlesCnt: number;
}

declare class rt_reach_info {
  constructor(init?: rt_reach_info);
  ri_refcnt: number;
  ri_probes: number;
  ri_snd_expire: number;
  ri_rcv_expire: number;
  ri_rssi: number;
  ri_lqm: number;
  ri_npm: number;
}

declare class utimes_args {
  constructor(init?: utimes_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  tptr_l_: unknown /* const array */;
  tptr: number;
  tptr_r_: unknown /* const array */;
}

declare class unnamed_230683991592103003 {
  constructor(init?: unnamed_230683991592103003);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  offset: number;
  size: number;
  cntrl_flags: number;
  page_listCnt: number;
  page_list: unknown /* const array */;
}

declare class ifnet_stats_per_flow {
  constructor(init?: ifnet_stats_per_flow);
  bk_txpackets: number;
  txpackets: number;
  rxpackets: number;
  txretransmitbytes: number;
  rxoutoforderbytes: number;
  rxmitpkts: number;
  rcvoopack: number;
  pawsdrop: number;
  sack_recovery_episodes: number;
  reordered_pkts: number;
  dsack_sent: number;
  dsack_recvd: number;
  srtt: number;
  rttupdated: number;
  rttvar: number;
  rttmin: number;
  bw_sndbw_max: number;
  bw_rcvbw_max: number;
  ecn_recv_ece: number;
  ecn_recv_ce: number;
  ecn_flags: number;
  ipv4: number;
  local: number;
  connreset: number;
  conntimeout: number;
  rxmit_drop: number;
  ecn_fallback_synloss: number;
  ecn_fallback_droprst: number;
  ecn_fallback_droprxmt: number;
  ecn_fallback_ce: number;
  ecn_fallback_reorder: number;
  _reserved_6: number;
  _reserved_16: number;
  _reserved_32: number;
  linkheur_noackpri: number;
  linkheur_comprxmt: number;
  linkheur_synrxmt: number;
  linkheur_rxmtfloor: number;
}

declare class fchown_args {
  constructor(init?: fchown_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  uid_l_: unknown /* const array */;
  uid: number;
  uid_r_: unknown /* const array */;
  gid_l_: unknown /* const array */;
  gid: number;
  gid_r_: unknown /* const array */;
}

declare class unnamed_3364053345864614681 {
  constructor(init?: unnamed_3364053345864614681);
  coprocessor_core_debug: number;
  coprocessor_secure_debug: number;
  memory_mapped_core_debug: number;
  coprocessor_trace_debug: number;
  memory_mapped_trace_debug: number;
  microcontroller_debug: number;
}

declare class change_fdguard_np_args {
  constructor(init?: change_fdguard_np_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  guard_l_: unknown /* const array */;
  guard: number;
  guard_r_: unknown /* const array */;
  guardflags_l_: unknown /* const array */;
  guardflags: number;
  guardflags_r_: unknown /* const array */;
  nguard_l_: unknown /* const array */;
  nguard: number;
  nguard_r_: unknown /* const array */;
  nguardflags_l_: unknown /* const array */;
  nguardflags: number;
  nguardflags_r_: unknown /* const array */;
  fdflagsp_l_: unknown /* const array */;
  fdflagsp: number;
  fdflagsp_r_: unknown /* const array */;
}

declare class chmod_extended_args {
  constructor(init?: chmod_extended_args);
  path_l_: unknown /* const array */;
  path: number;
  path_r_: unknown /* const array */;
  uid_l_: unknown /* const array */;
  uid: number;
  uid_r_: unknown /* const array */;
  gid_l_: unknown /* const array */;
  gid: number;
  gid_r_: unknown /* const array */;
  mode_l_: unknown /* const array */;
  mode: number;
  mode_r_: unknown /* const array */;
  xsecurity_l_: unknown /* const array */;
  xsecurity: number;
  xsecurity_r_: unknown /* const array */;
}

declare class arm_feature_bits_t {
  constructor(init?: arm_feature_bits_t);
  el0_not_implemented: number;
  el0_aarch64_only: number;
  el0_aarch32_and_64: number;
  el1_not_implemented: number;
  el1_aarch64_only: number;
  el1_aarch32_and_64: number;
  el2_not_implemented: number;
  el2_aarch64_only: number;
  el2_aarch32_and_64: number;
  el3_not_implemented: number;
  el3_aarch64_only: number;
  el3_aarch32_and_64: number;
  reserved: number;
}

declare class PlatformCapabilityDescriptor {
  constructor(init?: PlatformCapabilityDescriptor);
  bLength: number;
  bDescriptorType: number;
  bDevCapabilityType: number;
  bReserved: number;
  uuidPlatformCapability: unknown /* const array */;
}

declare class HIDButtonCaps {
  constructor(init?: HIDButtonCaps);
  usagePage: number;
  reportID: number;
  bitField: number;
  collection: number;
  collectionUsage: number;
  collectionUsagePage: number;
  isRange: number;
  isStringRange: number;
  isDesignatorRange: number;
  isAbsolute: number;
  startBit: number;
  u: unnamed_9604849382947085229;
}

declare class airship_acipc_boot {
  constructor(init?: airship_acipc_boot);
}

declare class aio_cancel_args {
  constructor(init?: aio_cancel_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  aiocbp_l_: unknown /* const array */;
  aiocbp: number;
  aiocbp_r_: unknown /* const array */;
}

declare class EXBrightMessage {
  constructor(init?: EXBrightMessage);
  type: interop.Enum<typeof EXBrightMessageType>;
  arg0: number;
  arg1: number;
}

declare class seteuid_args {
  constructor(init?: seteuid_args);
  euid_l_: unknown /* const array */;
  euid: number;
  euid_r_: unknown /* const array */;
}

declare class __Request__mach_notify_port_destroyed_t {
  constructor(init?: __Request__mach_notify_port_destroyed_t);
  Head: mach_msg_header_t;
  msgh_body: mach_msg_body_t;
  rights: mach_msg_port_descriptor_t;
}

declare class kd_callback {
  constructor(init?: kd_callback);
  func: (p1: interop.PointerConvertible, p2: interop.Enum<typeof kd_callback_type>, p3: interop.PointerConvertible) => void | null;
  context: interop.Pointer;
  iop_name: unknown /* const array */;
}

declare class wait4_args {
  constructor(init?: wait4_args);
  pid_l_: unknown /* const array */;
  pid: number;
  pid_r_: unknown /* const array */;
  status_l_: unknown /* const array */;
  status: number;
  status_r_: unknown /* const array */;
  options_l_: unknown /* const array */;
  options: number;
  options_r_: unknown /* const array */;
  rusage_l_: unknown /* const array */;
  rusage: number;
  rusage_r_: unknown /* const array */;
}

declare class sem_wait_args {
  constructor(init?: sem_wait_args);
  sem_l_: unknown /* const array */;
  sem: number;
  sem_r_: unknown /* const array */;
}

declare class unnamed_1788228608663847795 {
  constructor(init?: unnamed_1788228608663847795);
  Head: mach_msg_header_t;
  NDR: NDR_record_t;
  page_listCnt: number;
  page_list: unknown /* const array */;
}

declare class proc_rlimit_control_args {
  constructor(init?: proc_rlimit_control_args);
  pid_l_: unknown /* const array */;
  pid: number;
  pid_r_: unknown /* const array */;
  flavor_l_: unknown /* const array */;
  flavor: number;
  flavor_r_: unknown /* const array */;
  arg_l_: unknown /* const array */;
  arg: number;
  arg_r_: unknown /* const array */;
}

declare class fclonefileat_args {
  constructor(init?: fclonefileat_args);
  src_fd_l_: unknown /* const array */;
  src_fd: number;
  src_fd_r_: unknown /* const array */;
  dst_dirfd_l_: unknown /* const array */;
  dst_dirfd: number;
  dst_dirfd_r_: unknown /* const array */;
  dst_l_: unknown /* const array */;
  dst: number;
  dst_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
}

declare class task_inspect_for_pid_args {
  constructor(init?: task_inspect_for_pid_args);
  target_tport_l_: unknown /* const array */;
  target_tport: number;
  target_tport_r_: unknown /* const array */;
  pid_l_: unknown /* const array */;
  pid: number;
  pid_r_: unknown /* const array */;
  t_l_: unknown /* const array */;
  t: number;
  t_r_: unknown /* const array */;
}

declare class ledger_template_info {
  constructor(init?: ledger_template_info);
  lti_name: unknown /* const array */;
  lti_group: unknown /* const array */;
  lti_units: unknown /* const array */;
}

declare class unnamed_804236958011088931 {
  constructor(init?: unnamed_804236958011088931);
  usageMin: number;
  usageMax: number;
  stringMin: number;
  stringMax: number;
  designatorMin: number;
  designatorMax: number;
}

declare class unnamed_3717948029633192216 {
  constructor(init?: unnamed_3717948029633192216);
  numLinkKeysRead: number;
  maxNumLinkKeysAllowedInDevice: number;
}

declare class shm_open_args {
  constructor(init?: shm_open_args);
  name_l_: unknown /* const array */;
  name: number;
  name_r_: unknown /* const array */;
  oflag_l_: unknown /* const array */;
  oflag: number;
  oflag_r_: unknown /* const array */;
  mode_l_: unknown /* const array */;
  mode: number;
  mode_r_: unknown /* const array */;
}

declare class smrq_stailq_head {
  constructor(init?: smrq_stailq_head);
  first: __smrq_slink_t;
  last: interop.Pointer;
}

declare class IOHIDReportHandler {
  constructor(init?: IOHIDReportHandler);
}

declare class if_descreq {
  constructor(init?: if_descreq);
  ifdr_name: unknown /* const array */;
  ifdr_len: number;
  ifdr_desc: unknown /* const array */;
}

declare class OSAction_IOHIDDevice__CompleteReport_IVars {
  constructor(init?: OSAction_IOHIDDevice__CompleteReport_IVars);
}

declare class __Reply__mach_gss_init_sec_context_t {
  constructor(init?: __Reply__mach_gss_init_sec_context_t);
  Head: mach_msg_header_t;
  msgh_body: mach_msg_body_t;
  key: mach_msg_ool_descriptor_t;
  outtoken: mach_msg_ool_descriptor_t;
  NDR: NDR_record_t;
  context: number;
  cred_handle: number;
  ret_flags: number;
  keyCnt: number;
  outtokenCnt: number;
  major_stat: number;
  minor_stat: number;
}

declare class select_nocancel_args {
  constructor(init?: select_nocancel_args);
  nd_l_: unknown /* const array */;
  nd: number;
  nd_r_: unknown /* const array */;
  in_l_: unknown /* const array */;
  in: number;
  in_r_: unknown /* const array */;
  ou_l_: unknown /* const array */;
  ou: number;
  ou_r_: unknown /* const array */;
  ex_l_: unknown /* const array */;
  ex: number;
  ex_r_: unknown /* const array */;
  tv_l_: unknown /* const array */;
  tv: number;
  tv_r_: unknown /* const array */;
}

declare class xbpf_d {
  constructor(init?: xbpf_d);
  bd_structsize: number;
  bd_dev_minor: number;
  bd_sig: number;
  bd_slen: number;
  bd_hlen: number;
  bd_bufsize: number;
  bd_pid: number;
  bd_promisc: number;
  bd_immediate: number;
  bd_hdrcmplt: number;
  bd_async: number;
  bd_headdrop: number;
  bd_direction: number;
  bh_compreq: number;
  bh_compenabled: number;
  bd_exthdr: number;
  bd_trunc: number;
  bd_pkthdrv2: number;
  bd_batch_write: number;
  bd_divert_in: number;
  bd_padding: number;
  bd_rcount: number;
  bd_dcount: number;
  bd_fcount: number;
  bd_wcount: number;
  bd_wdcount: number;
  bd_ifname: unknown /* const array */;
  bd_comp_count: number;
  bd_comp_size: number;
  bd_scnt: number;
  bd_hcnt: number;
  bd_read_count: number;
  bd_fsize: number;
}

declare class IOCircularDataQueue {
  constructor(init?: IOCircularDataQueue);
  queueCursor: IOCircularDataQueueMemoryCursor;
  OS_PTRAUTH_SIGNED_PTR: unknown /* struct IOCircularDataQueueMemory *() (CXTypeKind: 110) */;
  queueHeaderShadow: IOCircularDataQueueDescription;
}

declare class getfsstat64_args {
  constructor(init?: getfsstat64_args);
  buf_l_: unknown /* const array */;
  buf: number;
  buf_r_: unknown /* const array */;
  bufsize_l_: unknown /* const array */;
  bufsize: number;
  bufsize_r_: unknown /* const array */;
  flags_l_: unknown /* const array */;
  flags: number;
  flags_r_: unknown /* const array */;
}

declare class guarded_write_np_args {
  constructor(init?: guarded_write_np_args);
  fd_l_: unknown /* const array */;
  fd: number;
  fd_r_: unknown /* const array */;
  guard_l_: unknown /* const array */;
  guard: number;
  guard_r_: unknown /* const array */;
  cbuf_l_: unknown /* const array */;
  cbuf: number;
  cbuf_r_: unknown /* const array */;
  nbyte_l_: unknown /* const array */;
  nbyte: number;
  nbyte_r_: unknown /* const array */;
}

type arm_cpuid_id_aa64dfr0_el1Descriptor = 
  | { debug_feature: unnamed_1064201811267050249 }
  | { value: number };

declare class arm_cpuid_id_aa64dfr0_el1 {
  constructor(init?: arm_cpuid_id_aa64dfr0_el1Descriptor);
  debug_feature: unnamed_1064201811267050249;
  value: number;
}

type unnamed_16283433901440427056Descriptor = 
  | { b8: unknown /* const array */ }
  | { b32: unknown /* const array */ };

declare class unnamed_16283433901440427056 {
  constructor(init?: unnamed_16283433901440427056Descriptor);
  b8: unknown /* const array */;
  b32: unknown /* const array */;
}

type unnamed_16186558334874051404Descriptor = 
  | { b8: unknown /* const array */ }
  | { b32: unknown /* const array */ }
  | { b64: unknown /* const array */ };

declare class unnamed_16186558334874051404 {
  constructor(init?: unnamed_16186558334874051404Descriptor);
  b8: unknown /* const array */;
  b32: unknown /* const array */;
  b64: unknown /* const array */;
}

type arm_debug_dbgdidrDescriptor = 
  | { debug_id: unnamed_11298389882924342544 }
  | { value: number };

declare class arm_debug_dbgdidr {
  constructor(init?: arm_debug_dbgdidrDescriptor);
  debug_id: unnamed_11298389882924342544;
  value: number;
}

type arm_cpuid_id_dfr0Descriptor = 
  | { debug_feature: unnamed_3364053345864614681 }
  | { value: number };

declare class arm_cpuid_id_dfr0 {
  constructor(init?: arm_cpuid_id_dfr0Descriptor);
  debug_feature: unnamed_3364053345864614681;
  value: number;
}

type __ReplyUnion__kextd_kernel_request_subsystemDescriptor = 
  | { Reply_kextd_ping: __Reply__kextd_ping_t };

declare class __ReplyUnion__kextd_kernel_request_subsystem {
  constructor(init?: __ReplyUnion__kextd_kernel_request_subsystemDescriptor);
  Reply_kextd_ping: __Reply__kextd_ping_t;
}

type __RequestUnion__kextd_kernel_request_subsystemDescriptor = 
  | { Request_kextd_ping: __Request__kextd_ping_t };

declare class __RequestUnion__kextd_kernel_request_subsystem {
  constructor(init?: __RequestUnion__kextd_kernel_request_subsystemDescriptor);
  Request_kextd_ping: __Request__kextd_ping_t;
}

type __RequestUnion__catch_exc_subsystemDescriptor = 
  | { Request_exception_raise: __Request__exception_raise_t }
  | { Request_exception_raise_state: __Request__exception_raise_state_t }
  | { Request_exception_raise_state_identity: __Request__exception_raise_state_identity_t };

declare class __RequestUnion__catch_exc_subsystem {
  constructor(init?: __RequestUnion__catch_exc_subsystemDescriptor);
  Request_exception_raise: __Request__exception_raise_t;
  Request_exception_raise_state: __Request__exception_raise_state_t;
  Request_exception_raise_state_identity: __Request__exception_raise_state_identity_t;
}

type __RequestUnion__receive_vfs_nspace_subsystemDescriptor = 
  | { Request_nspace_handle: __Request__nspace_handle_t }
  | { Request_nspace_resolve_cancel: __Request__nspace_resolve_cancel_t }
  | { Request_nspace_resolve_path: __Request__nspace_resolve_path_t }
  | { Request_vfs_resolve_file: __Request__vfs_resolve_file_t }
  | { Request_vfs_resolve_dir: __Request__vfs_resolve_dir_t }
  | { Request_vfs_resolve_file_with_audit_token: __Request__vfs_resolve_file_with_audit_token_t }
  | { Request_vfs_resolve_dir_with_audit_token: __Request__vfs_resolve_dir_with_audit_token_t }
  | { Request_vfs_resolve_reparent_with_audit_token: __Request__vfs_resolve_reparent_with_audit_token_t };

declare class __RequestUnion__receive_vfs_nspace_subsystem {
  constructor(init?: __RequestUnion__receive_vfs_nspace_subsystemDescriptor);
  Request_nspace_handle: __Request__nspace_handle_t;
  Request_nspace_resolve_cancel: __Request__nspace_resolve_cancel_t;
  Request_nspace_resolve_path: __Request__nspace_resolve_path_t;
  Request_vfs_resolve_file: __Request__vfs_resolve_file_t;
  Request_vfs_resolve_dir: __Request__vfs_resolve_dir_t;
  Request_vfs_resolve_file_with_audit_token: __Request__vfs_resolve_file_with_audit_token_t;
  Request_vfs_resolve_dir_with_audit_token: __Request__vfs_resolve_dir_with_audit_token_t;
  Request_vfs_resolve_reparent_with_audit_token: __Request__vfs_resolve_reparent_with_audit_token_t;
}

type __RequestUnion__arcade_upcall_subsystemDescriptor = 
  | { Request_arcade_upcall: __Request__arcade_upcall_t };

declare class __RequestUnion__arcade_upcall_subsystem {
  constructor(init?: __RequestUnion__arcade_upcall_subsystemDescriptor);
  Request_arcade_upcall: __Request__arcade_upcall_t;
}

type __RequestUnion__audit_triggers_subsystemDescriptor = 
  | { Request_audit_triggers: __Request__audit_triggers_t }
  | { Request_audit_analytics: __Request__audit_analytics_t };

declare class __RequestUnion__audit_triggers_subsystem {
  constructor(init?: __RequestUnion__audit_triggers_subsystemDescriptor);
  Request_audit_triggers: __Request__audit_triggers_t;
  Request_audit_analytics: __Request__audit_analytics_t;
}

type __ReplyUnion__mach_voucher_attr_control_subsystemDescriptor = 
  | { Reply_mach_voucher_attr_control_get_values: __Reply__mach_voucher_attr_control_get_values_t }
  | { Reply_mach_voucher_attr_control_create_mach_voucher: __Reply__mach_voucher_attr_control_create_mach_voucher_t };

declare class __ReplyUnion__mach_voucher_attr_control_subsystem {
  constructor(init?: __ReplyUnion__mach_voucher_attr_control_subsystemDescriptor);
  Reply_mach_voucher_attr_control_get_values: __Reply__mach_voucher_attr_control_get_values_t;
  Reply_mach_voucher_attr_control_create_mach_voucher: __Reply__mach_voucher_attr_control_create_mach_voucher_t;
}

type __RequestUnion__mach_voucher_attr_control_subsystemDescriptor = 
  | { Request_mach_voucher_attr_control_get_values: __Request__mach_voucher_attr_control_get_values_t }
  | { Request_mach_voucher_attr_control_create_mach_voucher: __Request__mach_voucher_attr_control_create_mach_voucher_t };

declare class __RequestUnion__mach_voucher_attr_control_subsystem {
  constructor(init?: __RequestUnion__mach_voucher_attr_control_subsystemDescriptor);
  Request_mach_voucher_attr_control_get_values: __Request__mach_voucher_attr_control_get_values_t;
  Request_mach_voucher_attr_control_create_mach_voucher: __Request__mach_voucher_attr_control_create_mach_voucher_t;
}

type __RequestUnion__catch_mach_exc_subsystemDescriptor = 
  | { Request_mach_exception_raise: __Request__mach_exception_raise_t }
  | { Request_mach_exception_raise_state: __Request__mach_exception_raise_state_t }
  | { Request_mach_exception_raise_state_identity: __Request__mach_exception_raise_state_identity_t };

declare class __RequestUnion__catch_mach_exc_subsystem {
  constructor(init?: __RequestUnion__catch_mach_exc_subsystemDescriptor);
  Request_mach_exception_raise: __Request__mach_exception_raise_t;
  Request_mach_exception_raise_state: __Request__mach_exception_raise_state_t;
  Request_mach_exception_raise_state_identity: __Request__mach_exception_raise_state_identity_t;
}

type __ReplyUnion__send_vfs_nspace_subsystemDescriptor = 
  | { Reply_send_nspace_handle: __Reply__nspace_handle_t }
  | { Reply_send_nspace_resolve_cancel: __Reply__nspace_resolve_cancel_t }
  | { Reply_send_nspace_resolve_path: __Reply__nspace_resolve_path_t }
  | { Reply_send_vfs_resolve_file: __Reply__vfs_resolve_file_t }
  | { Reply_send_vfs_resolve_dir: __Reply__vfs_resolve_dir_t }
  | { Reply_send_vfs_resolve_file_with_audit_token: __Reply__vfs_resolve_file_with_audit_token_t }
  | { Reply_send_vfs_resolve_dir_with_audit_token: __Reply__vfs_resolve_dir_with_audit_token_t }
  | { Reply_send_vfs_resolve_reparent_with_audit_token: __Reply__vfs_resolve_reparent_with_audit_token_t };

declare class __ReplyUnion__send_vfs_nspace_subsystem {
  constructor(init?: __ReplyUnion__send_vfs_nspace_subsystemDescriptor);
  Reply_send_nspace_handle: __Reply__nspace_handle_t;
  Reply_send_nspace_resolve_cancel: __Reply__nspace_resolve_cancel_t;
  Reply_send_nspace_resolve_path: __Reply__nspace_resolve_path_t;
  Reply_send_vfs_resolve_file: __Reply__vfs_resolve_file_t;
  Reply_send_vfs_resolve_dir: __Reply__vfs_resolve_dir_t;
  Reply_send_vfs_resolve_file_with_audit_token: __Reply__vfs_resolve_file_with_audit_token_t;
  Reply_send_vfs_resolve_dir_with_audit_token: __Reply__vfs_resolve_dir_with_audit_token_t;
  Reply_send_vfs_resolve_reparent_with_audit_token: __Reply__vfs_resolve_reparent_with_audit_token_t;
}

type __ReplyUnion__task_access_subsystemDescriptor = 
  | { Reply_check_task_access: __Reply__check_task_access_t }
  | { Reply_find_code_signature: __Reply__find_code_signature_t }
  | { Reply_check_task_access_with_flavor: __Reply__check_task_access_with_flavor_t };

declare class __ReplyUnion__task_access_subsystem {
  constructor(init?: __ReplyUnion__task_access_subsystemDescriptor);
  Reply_check_task_access: __Reply__check_task_access_t;
  Reply_find_code_signature: __Reply__find_code_signature_t;
  Reply_check_task_access_with_flavor: __Reply__check_task_access_with_flavor_t;
}

type __RequestUnion__task_access_subsystemDescriptor = 
  | { Request_check_task_access: __Request__check_task_access_t }
  | { Request_find_code_signature: __Request__find_code_signature_t }
  | { Request_check_task_access_with_flavor: __Request__check_task_access_with_flavor_t };

declare class __RequestUnion__task_access_subsystem {
  constructor(init?: __RequestUnion__task_access_subsystemDescriptor);
  Request_check_task_access: __Request__check_task_access_t;
  Request_find_code_signature: __Request__find_code_signature_t;
  Request_check_task_access_with_flavor: __Request__check_task_access_with_flavor_t;
}

type __RequestUnion__send_ktrace_background_subsystemDescriptor = 
  | { Request_send_ktrace_background_available: __Request__ktrace_background_available_t };

declare class __RequestUnion__send_ktrace_background_subsystem {
  constructor(init?: __RequestUnion__send_ktrace_background_subsystemDescriptor);
  Request_send_ktrace_background_available: __Request__ktrace_background_available_t;
}

type __RequestUnion__memory_error_notification_subsystemDescriptor = 
  | { Request_memory_error_notification: __Request__memory_error_notification_t }
  | { Request_mcc_memory_error_notification: __Request__mcc_memory_error_notification_t };

declare class __RequestUnion__memory_error_notification_subsystem {
  constructor(init?: __RequestUnion__memory_error_notification_subsystemDescriptor);
  Request_memory_error_notification: __Request__memory_error_notification_t;
  Request_mcc_memory_error_notification: __Request__mcc_memory_error_notification_t;
}

type __ReplyUnion__telemetry_notification_subsystemDescriptor = 
  | { Reply_telemetry_notification: __Reply__telemetry_notification_t };

declare class __ReplyUnion__telemetry_notification_subsystem {
  constructor(init?: __ReplyUnion__telemetry_notification_subsystemDescriptor);
  Reply_telemetry_notification: __Reply__telemetry_notification_t;
}

type arm_isa_feat1_regDescriptor = 
  | { value: number }
  | { field: syscp_ID_instructions_feat_1_reg };

declare class arm_isa_feat1_reg {
  constructor(init?: arm_isa_feat1_regDescriptor);
  value: number;
  field: syscp_ID_instructions_feat_1_reg;
}

type __RequestUnion__telemetry_notification_subsystemDescriptor = 
  | { Request_telemetry_notification: __Request__telemetry_notification_t };

declare class __RequestUnion__telemetry_notification_subsystem {
  constructor(init?: __RequestUnion__telemetry_notification_subsystemDescriptor);
  Request_telemetry_notification: __Request__telemetry_notification_t;
}

type __ReplyUnion__coalition_notification_subsystemDescriptor = 
  | { Reply_coalition_notification: __Reply__coalition_notification_t };

declare class __ReplyUnion__coalition_notification_subsystem {
  constructor(init?: __ReplyUnion__coalition_notification_subsystemDescriptor);
  Reply_coalition_notification: __Reply__coalition_notification_t;
}

type __ReplyUnion__fairplay_subsystemDescriptor = 
  | { Reply_fairplayd_arcade_request: __Reply__fairplayd_arcade_request_t };

declare class __ReplyUnion__fairplay_subsystem {
  constructor(init?: __ReplyUnion__fairplay_subsystemDescriptor);
  Reply_fairplayd_arcade_request: __Reply__fairplayd_arcade_request_t;
}

type __RequestUnion__gssd_mach_subsystemDescriptor = 
  | { Request_mach_gss_init_sec_context: __Request__mach_gss_init_sec_context_t }
  | { Request_mach_gss_accept_sec_context: __Request__mach_gss_accept_sec_context_t }
  | { Request_mach_gss_log_error: __Request__mach_gss_log_error_t }
  | { Request_mach_gss_init_sec_context_v2: __Request__mach_gss_init_sec_context_v2_t }
  | { Request_mach_gss_accept_sec_context_v2: __Request__mach_gss_accept_sec_context_v2_t }
  | { Request_mach_gss_init_sec_context_v3: __Request__mach_gss_init_sec_context_v3_t }
  | { Request_mach_gss_hold_cred: __Request__mach_gss_hold_cred_t }
  | { Request_mach_gss_unhold_cred: __Request__mach_gss_unhold_cred_t }
  | { Request_mach_gss_lookup: __Request__mach_gss_lookup_t };

declare class __RequestUnion__gssd_mach_subsystem {
  constructor(init?: __RequestUnion__gssd_mach_subsystemDescriptor);
  Request_mach_gss_init_sec_context: __Request__mach_gss_init_sec_context_t;
  Request_mach_gss_accept_sec_context: __Request__mach_gss_accept_sec_context_t;
  Request_mach_gss_log_error: __Request__mach_gss_log_error_t;
  Request_mach_gss_init_sec_context_v2: __Request__mach_gss_init_sec_context_v2_t;
  Request_mach_gss_accept_sec_context_v2: __Request__mach_gss_accept_sec_context_v2_t;
  Request_mach_gss_init_sec_context_v3: __Request__mach_gss_init_sec_context_v3_t;
  Request_mach_gss_hold_cred: __Request__mach_gss_hold_cred_t;
  Request_mach_gss_unhold_cred: __Request__mach_gss_unhold_cred_t;
  Request_mach_gss_lookup: __Request__mach_gss_lookup_t;
}

type __ReplyUnion__doubleagent_subsystemDescriptor = 
  | { Reply_doubleagent_lookup_xattr: __Reply__doubleagent_lookup_xattr_t }
  | { Reply_doubleagent_allocate_xattr: __Reply__doubleagent_allocate_xattr_t }
  | { Reply_doubleagent_list_xattrs: __Reply__doubleagent_list_xattrs_t }
  | { Reply_doubleagent_remove_xattr: __Reply__doubleagent_remove_xattr_t };

declare class __ReplyUnion__doubleagent_subsystem {
  constructor(init?: __ReplyUnion__doubleagent_subsystemDescriptor);
  Reply_doubleagent_lookup_xattr: __Reply__doubleagent_lookup_xattr_t;
  Reply_doubleagent_allocate_xattr: __Reply__doubleagent_allocate_xattr_t;
  Reply_doubleagent_list_xattrs: __Reply__doubleagent_list_xattrs_t;
  Reply_doubleagent_remove_xattr: __Reply__doubleagent_remove_xattr_t;
}

type __RequestUnion__doubleagent_subsystemDescriptor = 
  | { Request_doubleagent_lookup_xattr: __Request__doubleagent_lookup_xattr_t }
  | { Request_doubleagent_allocate_xattr: __Request__doubleagent_allocate_xattr_t }
  | { Request_doubleagent_list_xattrs: __Request__doubleagent_list_xattrs_t }
  | { Request_doubleagent_remove_xattr: __Request__doubleagent_remove_xattr_t };

declare class __RequestUnion__doubleagent_subsystem {
  constructor(init?: __RequestUnion__doubleagent_subsystemDescriptor);
  Request_doubleagent_lookup_xattr: __Request__doubleagent_lookup_xattr_t;
  Request_doubleagent_allocate_xattr: __Request__doubleagent_allocate_xattr_t;
  Request_doubleagent_list_xattrs: __Request__doubleagent_list_xattrs_t;
  Request_doubleagent_remove_xattr: __Request__doubleagent_remove_xattr_t;
}

type __ReplyUnion__do_notify_subsystemDescriptor = 
  | { Reply_mach_notify_port_deleted: __Reply__mach_notify_port_deleted_t }
  | { Reply_mach_notify_port_destroyed: __Reply__mach_notify_port_destroyed_t }
  | { Reply_mach_notify_no_senders: __Reply__mach_notify_no_senders_t }
  | { Reply_mach_notify_send_once: __Reply__mach_notify_send_once_t }
  | { Reply_mach_notify_dead_name: __Reply__mach_notify_dead_name_t };

declare class __ReplyUnion__do_notify_subsystem {
  constructor(init?: __ReplyUnion__do_notify_subsystemDescriptor);
  Reply_mach_notify_port_deleted: __Reply__mach_notify_port_deleted_t;
  Reply_mach_notify_port_destroyed: __Reply__mach_notify_port_destroyed_t;
  Reply_mach_notify_no_senders: __Reply__mach_notify_no_senders_t;
  Reply_mach_notify_send_once: __Reply__mach_notify_send_once_t;
  Reply_mach_notify_dead_name: __Reply__mach_notify_dead_name_t;
}

type __RequestUnion__do_notify_subsystemDescriptor = 
  | { Request_mach_notify_port_deleted: __Request__mach_notify_port_deleted_t }
  | { Request_mach_notify_port_destroyed: __Request__mach_notify_port_destroyed_t }
  | { Request_mach_notify_no_senders: __Request__mach_notify_no_senders_t }
  | { Request_mach_notify_send_once: __Request__mach_notify_send_once_t }
  | { Request_mach_notify_dead_name: __Request__mach_notify_dead_name_t };

declare class __RequestUnion__do_notify_subsystem {
  constructor(init?: __RequestUnion__do_notify_subsystemDescriptor);
  Request_mach_notify_port_deleted: __Request__mach_notify_port_deleted_t;
  Request_mach_notify_port_destroyed: __Request__mach_notify_port_destroyed_t;
  Request_mach_notify_no_senders: __Request__mach_notify_no_senders_t;
  Request_mach_notify_send_once: __Request__mach_notify_send_once_t;
  Request_mach_notify_dead_name: __Request__mach_notify_dead_name_t;
}

type airship_acipc_cr_mirror_element_dataDescriptor = 
  | { completion_record: airship_acipc_cr_mirror_completion_record }
  | { raw_descriptor: airship_acipc_cr_mirror_raw_descriptor };

declare class airship_acipc_cr_mirror_element_data {
  constructor(init?: airship_acipc_cr_mirror_element_dataDescriptor);
  completion_record: airship_acipc_cr_mirror_completion_record;
  raw_descriptor: airship_acipc_cr_mirror_raw_descriptor;
}

type __ReplyUnion__arcade_upcall_subsystemDescriptor = 
  | { Reply_arcade_upcall: __Reply__arcade_upcall_t };

declare class __ReplyUnion__arcade_upcall_subsystem {
  constructor(init?: __ReplyUnion__arcade_upcall_subsystemDescriptor);
  Reply_arcade_upcall: __Reply__arcade_upcall_t;
}

type EFI_GUID_UNIONDescriptor = 
  | { Guid: EFI_GUID }
  | { Raw: unknown /* const array */ };

declare class EFI_GUID_UNION {
  constructor(init?: EFI_GUID_UNIONDescriptor);
  Guid: EFI_GUID;
  Raw: unknown /* const array */;
}

type __ReplyUnion__upl_subsystemDescriptor = 
  | { Reply_upl_abort: __Reply__upl_abort_t }
  | { Reply_upl_abort_range: __Reply__upl_abort_range_t }
  | { Reply_upl_commit: __Reply__upl_commit_t }
  | { Reply_upl_commit_range: __Reply__upl_commit_range_t };

declare class __ReplyUnion__upl_subsystem {
  constructor(init?: __ReplyUnion__upl_subsystemDescriptor);
  Reply_upl_abort: __Reply__upl_abort_t;
  Reply_upl_abort_range: __Reply__upl_abort_range_t;
  Reply_upl_commit: __Reply__upl_commit_t;
  Reply_upl_commit_range: __Reply__upl_commit_range_t;
}

type __ReplyUnion__lockd_mach_subsystemDescriptor = 
  | { Reply_lockd_request: __Reply__lockd_request_t }
  | { Reply_lockd_ping: __Reply__lockd_ping_t }
  | { Reply_lockd_shutdown: __Reply__lockd_shutdown_t };

declare class __ReplyUnion__lockd_mach_subsystem {
  constructor(init?: __ReplyUnion__lockd_mach_subsystemDescriptor);
  Reply_lockd_request: __Reply__lockd_request_t;
  Reply_lockd_ping: __Reply__lockd_ping_t;
  Reply_lockd_shutdown: __Reply__lockd_shutdown_t;
}

type __RequestUnion__lockd_mach_subsystemDescriptor = 
  | { Request_lockd_request: __Request__lockd_request_t }
  | { Request_lockd_ping: __Request__lockd_ping_t }
  | { Request_lockd_shutdown: __Request__lockd_shutdown_t };

declare class __RequestUnion__lockd_mach_subsystem {
  constructor(init?: __RequestUnion__lockd_mach_subsystemDescriptor);
  Request_lockd_request: __Request__lockd_request_t;
  Request_lockd_ping: __Request__lockd_ping_t;
  Request_lockd_shutdown: __Request__lockd_shutdown_t;
}

type unnamed_14374843138598068828Descriptor = 
  | { un_d_packname: unknown /* const array */ }
  | { un_b: unnamed_10338689098814162510 };

declare class unnamed_14374843138598068828 {
  constructor(init?: unnamed_14374843138598068828Descriptor);
  un_d_packname: unknown /* const array */;
  un_b: unnamed_10338689098814162510;
}

type idt_entryDescriptor = 
  | { trap_gate: trap_gate }
  | { intr_gate: intr_gate }
  | { task_gate: task_gate };

declare class idt_entry {
  constructor(init?: idt_entryDescriptor);
  trap_gate: trap_gate;
  intr_gate: intr_gate;
  task_gate: task_gate;
}

type gdt_entryDescriptor = 
  | { code: code_desc }
  | { data: data_desc }
  | { ldt: ldt_desc }
  | { call_gate: call_gate }
  | { task_gate: task_gate }
  | { task_state: tss_desc };

declare class gdt_entry {
  constructor(init?: gdt_entryDescriptor);
  code: code_desc;
  data: data_desc;
  ldt: ldt_desc;
  call_gate: call_gate;
  task_gate: task_gate;
  task_state: tss_desc;
}

type sockaddr_in_4_6Descriptor = 
  | { sa: sockaddr }
  | { sah: __sockaddr_header }
  | { sin: sockaddr_in }
  | { sin6: sockaddr_in6 };

declare class sockaddr_in_4_6 {
  constructor(init?: sockaddr_in_4_6Descriptor);
  sa: sockaddr;
  sah: __sockaddr_header;
  sin: sockaddr_in;
  sin6: sockaddr_in6;
}

type unnamed_12749400625580214499Descriptor = 
  | { sa_nwk_status_int: number };

declare class unnamed_12749400625580214499 {
  constructor(init?: unnamed_12749400625580214499Descriptor);
  sa_nwk_status_int: number;
}

type unnamed_3012503987243038479Descriptor = 
  | { _itpl_sa: sockaddr }
  | { _itpl_sah: __sockaddr_header }
  | { _itpl_sin: sockaddr_in }
  | { _itpl_sin6: sockaddr_in6 };

declare class unnamed_3012503987243038479 {
  constructor(init?: unnamed_3012503987243038479Descriptor);
  _itpl_sa: sockaddr;
  _itpl_sah: __sockaddr_header;
  _itpl_sin: sockaddr_in;
  _itpl_sin6: sockaddr_in6;
}

type unnamed_17232738562495190869Descriptor = 
  | { _itpl_sa: sockaddr }
  | { _itpl_sah: __sockaddr_header }
  | { _itpl_sin: sockaddr_in }
  | { _itpl_sin6: sockaddr_in6 };

declare class unnamed_17232738562495190869 {
  constructor(init?: unnamed_17232738562495190869Descriptor);
  _itpl_sa: sockaddr;
  _itpl_sah: __sockaddr_header;
  _itpl_sin: sockaddr_in;
  _itpl_sin6: sockaddr_in6;
}

type unnamed_11635418716625211500Descriptor = 
  | { queueStateVal: unknown /* volatile _Atomic(unsigned __int128) (CXTypeKind: 177) */ }
  | { __queueState: IOCircularDataQueueState };

declare class unnamed_11635418716625211500 {
  constructor(init?: unnamed_11635418716625211500Descriptor);
  queueStateVal: unknown /* volatile _Atomic(unsigned __int128) (CXTypeKind: 177) */;
  __queueState: IOCircularDataQueueState;
}

type IOCircularDataQueueStateDescriptor = 
  | { val: bigint }
  | { fields: unnamed_9614755327984743019 };

declare class IOCircularDataQueueState {
  constructor(init?: IOCircularDataQueueStateDescriptor);
  val: bigint;
  fields: unnamed_9614755327984743019;
}

type IOCircularDataQueueEntryHeaderInfoDescriptor = 
  | { val: bigint }
  | { fields: unnamed_9573910560995373467 };

declare class IOCircularDataQueueEntryHeaderInfo {
  constructor(init?: IOCircularDataQueueEntryHeaderInfoDescriptor);
  val: bigint;
  fields: unnamed_9573910560995373467;
}

type IOACPIAddressDescriptor = 
  | { addr64: number }
  | { pci: unnamed_12713508752774757029 };

declare class IOACPIAddress {
  constructor(init?: IOACPIAddressDescriptor);
  addr64: number;
  pci: unnamed_12713508752774757029;
}

type IOPCIAddressSpaceDescriptor = 
  | { bits: number }
  | { s: unnamed_17672180226118855821 }
  | { es: unnamed_1254637360707554498 };

declare class IOPCIAddressSpace {
  constructor(init?: IOPCIAddressSpaceDescriptor);
  bits: number;
  s: unnamed_17672180226118855821;
  es: unnamed_1254637360707554498;
}

type unnamed_11897257300510808881Descriptor = 
  | { range: unnamed_16222007263645768418 }
  | { notRange: unnamed_10261520394563487748 };

declare class unnamed_11897257300510808881 {
  constructor(init?: unnamed_11897257300510808881Descriptor);
  range: unnamed_16222007263645768418;
  notRange: unnamed_10261520394563487748;
}

type unnamed_9604849382947085229Descriptor = 
  | { range: unnamed_804236958011088931 }
  | { notRange: unnamed_8193567900268426915 };

declare class unnamed_9604849382947085229 {
  constructor(init?: unnamed_9604849382947085229Descriptor);
  range: unnamed_804236958011088931;
  notRange: unnamed_8193567900268426915;
}

type unnamed_17503374868355305097Descriptor = 
  | { params: unknown /* const array */ };

declare class unnamed_17503374868355305097 {
  constructor(init?: unnamed_17503374868355305097Descriptor);
  params: unknown /* const array */;
}

type unnamed_11714727163374491480Descriptor = 
  | { xb_buffer: unnamed_13120103969405328411 };

declare class unnamed_11714727163374491480 {
  constructor(init?: unnamed_11714727163374491480Descriptor);
  xb_buffer: unnamed_13120103969405328411;
}

type nfs_quadconvertDescriptor = 
  | { lval: unknown /* const array */ }
  | { qval: number };

declare class nfs_quadconvert {
  constructor(init?: nfs_quadconvertDescriptor);
  lval: unknown /* const array */;
  qval: number;
}

type __RequestUnion__upl_subsystemDescriptor = 
  | { Request_upl_abort: __Request__upl_abort_t }
  | { Request_upl_abort_range: unnamed_1650381945006561587 }
  | { Request_upl_commit: unnamed_1788228608663847795 }
  | { Request_upl_commit_range: unnamed_230683991592103003 };

declare class __RequestUnion__upl_subsystem {
  constructor(init?: __RequestUnion__upl_subsystemDescriptor);
  Request_upl_abort: __Request__upl_abort_t;
  Request_upl_abort_range: unnamed_1650381945006561587;
  Request_upl_commit: unnamed_1788228608663847795;
  Request_upl_commit_range: unnamed_230683991592103003;
}

type __ReplyUnion__iocompressionstats_notification_subsystemDescriptor = 
  | { Reply_iocompressionstats_notification: __Reply__iocompressionstats_notification_t };

declare class __ReplyUnion__iocompressionstats_notification_subsystem {
  constructor(init?: __ReplyUnion__iocompressionstats_notification_subsystemDescriptor);
  Reply_iocompressionstats_notification: __Reply__iocompressionstats_notification_t;
}

type __ReplyUnion__audit_triggers_subsystemDescriptor = 
  | { Reply_audit_triggers: __Reply__audit_triggers_t }
  | { Reply_audit_analytics: __Reply__audit_analytics_t };

declare class __ReplyUnion__audit_triggers_subsystem {
  constructor(init?: __ReplyUnion__audit_triggers_subsystemDescriptor);
  Reply_audit_triggers: __Reply__audit_triggers_t;
  Reply_audit_analytics: __Reply__audit_analytics_t;
}

type unnamed_3771936424973120145Descriptor = 
  | { sin_zero: unknown /* const array */ }
  | { _in_index: unnamed_10328243768668227060 };

declare class unnamed_3771936424973120145 {
  constructor(init?: unnamed_3771936424973120145Descriptor);
  sin_zero: unknown /* const array */;
  _in_index: unnamed_10328243768668227060;
}

type __RequestUnion__coalition_notification_subsystemDescriptor = 
  | { Request_coalition_notification: __Request__coalition_notification_t };

declare class __RequestUnion__coalition_notification_subsystem {
  constructor(init?: __RequestUnion__coalition_notification_subsystemDescriptor);
  Request_coalition_notification: __Request__coalition_notification_t;
}

type ldt_entryDescriptor = 
  | { code: code_desc }
  | { data: data_desc }
  | { call_gate: call_gate }
  | { task_gate: task_gate };

declare class ldt_entry {
  constructor(init?: ldt_entryDescriptor);
  code: code_desc;
  data: data_desc;
  call_gate: call_gate;
  task_gate: task_gate;
}

type __ReplyUnion__catch_mach_exc_subsystemDescriptor = 
  | { Reply_mach_exception_raise: __Reply__mach_exception_raise_t }
  | { Reply_mach_exception_raise_state: __Reply__mach_exception_raise_state_t }
  | { Reply_mach_exception_raise_state_identity: __Reply__mach_exception_raise_state_identity_t };

declare class __ReplyUnion__catch_mach_exc_subsystem {
  constructor(init?: __ReplyUnion__catch_mach_exc_subsystemDescriptor);
  Reply_mach_exception_raise: __Reply__mach_exception_raise_t;
  Reply_mach_exception_raise_state: __Reply__mach_exception_raise_state_t;
  Reply_mach_exception_raise_state_identity: __Reply__mach_exception_raise_state_identity_t;
}

type sptm_update_disjoint_multipage_op_tDescriptor = 
  | { per_paddr_header: unnamed_5864893492845929824 }
  | { disjoint_op: sptm_disjoint_op_t };

declare class sptm_update_disjoint_multipage_op_t {
  constructor(init?: sptm_update_disjoint_multipage_op_tDescriptor);
  per_paddr_header: unnamed_5864893492845929824;
  disjoint_op: sptm_disjoint_op_t;
}

type unnamed_6650140264646410345Descriptor = 
  | { cpg: number }
  | { sgs: number };

declare class unnamed_6650140264646410345 {
  constructor(init?: unnamed_6650140264646410345Descriptor);
  cpg: number;
  sgs: number;
}

type vm32_size_struct_tDescriptor = 
  | { UNSAFE: number };

declare class vm32_size_struct_t {
  constructor(init?: vm32_size_struct_tDescriptor);
  UNSAFE: number;
}

type __RequestUnion__fairplay_subsystemDescriptor = 
  | { Request_fairplayd_arcade_request: __Request__fairplayd_arcade_request_t };

declare class __RequestUnion__fairplay_subsystem {
  constructor(init?: __RequestUnion__fairplay_subsystemDescriptor);
  Request_fairplayd_arcade_request: __Request__fairplayd_arcade_request_t;
}

type unnamed_867739513131058950Descriptor = 
  | { eph_x86_do_not_use: number };

declare class unnamed_867739513131058950 {
  constructor(init?: unnamed_867739513131058950Descriptor);
  eph_x86_do_not_use: number;
}

type __ReplyUnion__catch_exc_subsystemDescriptor = 
  | { Reply_exception_raise: __Reply__exception_raise_t }
  | { Reply_exception_raise_state: __Reply__exception_raise_state_t }
  | { Reply_exception_raise_state_identity: __Reply__exception_raise_state_identity_t };

declare class __ReplyUnion__catch_exc_subsystem {
  constructor(init?: __ReplyUnion__catch_exc_subsystemDescriptor);
  Reply_exception_raise: __Reply__exception_raise_t;
  Reply_exception_raise_state: __Reply__exception_raise_state_t;
  Reply_exception_raise_state_identity: __Reply__exception_raise_state_identity_t;
}

type __RequestUnion__send_vfs_nspace_subsystemDescriptor = 
  | { Request_send_nspace_handle: __Request__nspace_handle_t }
  | { Request_send_nspace_resolve_cancel: __Request__nspace_resolve_cancel_t }
  | { Request_send_nspace_resolve_path: __Request__nspace_resolve_path_t }
  | { Request_send_vfs_resolve_file: __Request__vfs_resolve_file_t }
  | { Request_send_vfs_resolve_dir: __Request__vfs_resolve_dir_t }
  | { Request_send_vfs_resolve_file_with_audit_token: __Request__vfs_resolve_file_with_audit_token_t }
  | { Request_send_vfs_resolve_dir_with_audit_token: __Request__vfs_resolve_dir_with_audit_token_t }
  | { Request_send_vfs_resolve_reparent_with_audit_token: __Request__vfs_resolve_reparent_with_audit_token_t };

declare class __RequestUnion__send_vfs_nspace_subsystem {
  constructor(init?: __RequestUnion__send_vfs_nspace_subsystemDescriptor);
  Request_send_nspace_handle: __Request__nspace_handle_t;
  Request_send_nspace_resolve_cancel: __Request__nspace_resolve_cancel_t;
  Request_send_nspace_resolve_path: __Request__nspace_resolve_path_t;
  Request_send_vfs_resolve_file: __Request__vfs_resolve_file_t;
  Request_send_vfs_resolve_dir: __Request__vfs_resolve_dir_t;
  Request_send_vfs_resolve_file_with_audit_token: __Request__vfs_resolve_file_with_audit_token_t;
  Request_send_vfs_resolve_dir_with_audit_token: __Request__vfs_resolve_dir_with_audit_token_t;
  Request_send_vfs_resolve_reparent_with_audit_token: __Request__vfs_resolve_reparent_with_audit_token_t;
}

type unnamed_15850245440478902285Descriptor = 
  | { sa_nwk_status: number };

declare class unnamed_15850245440478902285 {
  constructor(init?: unnamed_15850245440478902285Descriptor);
  sa_nwk_status: number;
}

type arm_feature0_reg_tDescriptor = 
  | { field: arm_feature_bits_t }
  | { value: number };

declare class arm_feature0_reg_t {
  constructor(init?: arm_feature0_reg_tDescriptor);
  field: arm_feature_bits_t;
  value: number;
}

type unnamed_6687071577879841066Descriptor = 
  | { headerInfoVal: unknown /* volatile _Atomic(unsigned __int128) (CXTypeKind: 177) */ }
  | { __headerInfo: IOCircularDataQueueEntryHeaderInfo };

declare class unnamed_6687071577879841066 {
  constructor(init?: unnamed_6687071577879841066Descriptor);
  headerInfoVal: unknown /* volatile _Atomic(unsigned __int128) (CXTypeKind: 177) */;
  __headerInfo: IOCircularDataQueueEntryHeaderInfo;
}

type vm_size_struct_tDescriptor = 
  | { UNSAFE: number };

declare class vm_size_struct_t {
  constructor(init?: vm_size_struct_tDescriptor);
  UNSAFE: number;
}

type unnamed_17393587275662477423Descriptor = 
  | { q: unknown /* const array */ };

declare class unnamed_17393587275662477423 {
  constructor(init?: unnamed_17393587275662477423Descriptor);
  q: unknown /* const array */;
}

type __RequestUnion__iocompressionstats_notification_subsystemDescriptor = 
  | { Request_iocompressionstats_notification: __Request__iocompressionstats_notification_t };

declare class __RequestUnion__iocompressionstats_notification_subsystem {
  constructor(init?: __RequestUnion__iocompressionstats_notification_subsystemDescriptor);
  Request_iocompressionstats_notification: __Request__iocompressionstats_notification_t;
}

type __ReplyUnion__receive_vfs_nspace_subsystemDescriptor = 
  | { Reply_nspace_handle: __Reply__nspace_handle_t }
  | { Reply_nspace_resolve_cancel: __Reply__nspace_resolve_cancel_t }
  | { Reply_nspace_resolve_path: __Reply__nspace_resolve_path_t }
  | { Reply_vfs_resolve_file: __Reply__vfs_resolve_file_t }
  | { Reply_vfs_resolve_dir: __Reply__vfs_resolve_dir_t }
  | { Reply_vfs_resolve_file_with_audit_token: __Reply__vfs_resolve_file_with_audit_token_t }
  | { Reply_vfs_resolve_dir_with_audit_token: __Reply__vfs_resolve_dir_with_audit_token_t }
  | { Reply_vfs_resolve_reparent_with_audit_token: __Reply__vfs_resolve_reparent_with_audit_token_t };

declare class __ReplyUnion__receive_vfs_nspace_subsystem {
  constructor(init?: __ReplyUnion__receive_vfs_nspace_subsystemDescriptor);
  Reply_nspace_handle: __Reply__nspace_handle_t;
  Reply_nspace_resolve_cancel: __Reply__nspace_resolve_cancel_t;
  Reply_nspace_resolve_path: __Reply__nspace_resolve_path_t;
  Reply_vfs_resolve_file: __Reply__vfs_resolve_file_t;
  Reply_vfs_resolve_dir: __Reply__vfs_resolve_dir_t;
  Reply_vfs_resolve_file_with_audit_token: __Reply__vfs_resolve_file_with_audit_token_t;
  Reply_vfs_resolve_dir_with_audit_token: __Reply__vfs_resolve_dir_with_audit_token_t;
  Reply_vfs_resolve_reparent_with_audit_token: __Reply__vfs_resolve_reparent_with_audit_token_t;
}

type __RequestUnion__receive_sysdiagnose_notification_subsystemDescriptor = 
  | { Request_sysdiagnose_notification: __Request__sysdiagnose_notification_t }
  | { Request_sysdiagnose_notification_with_audit_token: __Request__sysdiagnose_notification_with_audit_token_t };

declare class __RequestUnion__receive_sysdiagnose_notification_subsystem {
  constructor(init?: __RequestUnion__receive_sysdiagnose_notification_subsystemDescriptor);
  Request_sysdiagnose_notification: __Request__sysdiagnose_notification_t;
  Request_sysdiagnose_notification_with_audit_token: __Request__sysdiagnose_notification_with_audit_token_t;
}

type unnamed_17870239474130978603Descriptor = 
  | { range: unnamed_13574595766822801905 }
  | { notRange: unnamed_3364203081172218251 };

declare class unnamed_17870239474130978603 {
  constructor(init?: unnamed_17870239474130978603Descriptor);
  range: unnamed_13574595766822801905;
  notRange: unnamed_3364203081172218251;
}

type unnamed_9008164211909323487Descriptor = 
  | { pad_field: number };

declare class unnamed_9008164211909323487 {
  constructor(init?: unnamed_9008164211909323487Descriptor);
  pad_field: number;
}

type unnamed_11444704629501519341Descriptor = 
  | { b8: unknown /* const array */ }
  | { b32: unknown /* const array */ };

declare class unnamed_11444704629501519341 {
  constructor(init?: unnamed_11444704629501519341Descriptor);
  b8: unknown /* const array */;
  b32: unknown /* const array */;
}

type __ReplyUnion__gssd_mach_subsystemDescriptor = 
  | { Reply_mach_gss_init_sec_context: __Reply__mach_gss_init_sec_context_t }
  | { Reply_mach_gss_accept_sec_context: __Reply__mach_gss_accept_sec_context_t }
  | { Reply_mach_gss_log_error: __Reply__mach_gss_log_error_t }
  | { Reply_mach_gss_init_sec_context_v2: __Reply__mach_gss_init_sec_context_v2_t }
  | { Reply_mach_gss_accept_sec_context_v2: __Reply__mach_gss_accept_sec_context_v2_t }
  | { Reply_mach_gss_init_sec_context_v3: __Reply__mach_gss_init_sec_context_v3_t }
  | { Reply_mach_gss_hold_cred: __Reply__mach_gss_hold_cred_t }
  | { Reply_mach_gss_unhold_cred: __Reply__mach_gss_unhold_cred_t }
  | { Reply_mach_gss_lookup: __Reply__mach_gss_lookup_t };

declare class __ReplyUnion__gssd_mach_subsystem {
  constructor(init?: __ReplyUnion__gssd_mach_subsystemDescriptor);
  Reply_mach_gss_init_sec_context: __Reply__mach_gss_init_sec_context_t;
  Reply_mach_gss_accept_sec_context: __Reply__mach_gss_accept_sec_context_t;
  Reply_mach_gss_log_error: __Reply__mach_gss_log_error_t;
  Reply_mach_gss_init_sec_context_v2: __Reply__mach_gss_init_sec_context_v2_t;
  Reply_mach_gss_accept_sec_context_v2: __Reply__mach_gss_accept_sec_context_v2_t;
  Reply_mach_gss_init_sec_context_v3: __Reply__mach_gss_init_sec_context_v3_t;
  Reply_mach_gss_hold_cred: __Reply__mach_gss_hold_cred_t;
  Reply_mach_gss_unhold_cred: __Reply__mach_gss_unhold_cred_t;
  Reply_mach_gss_lookup: __Reply__mach_gss_lookup_t;
}

type vm32_addr_struct_tDescriptor = 
  | { UNSAFE: number };

declare class vm32_addr_struct_t {
  constructor(init?: vm32_addr_struct_tDescriptor);
  UNSAFE: number;
}

type dt_entryDescriptor = 
  | { code: code_desc }
  | { data: data_desc }
  | { ldt: ldt_desc }
  | { task_state: tss_desc }
  | { call_gate: call_gate }
  | { trap_gate: trap_gate }
  | { intr_gate: intr_gate }
  | { task_gate: task_gate };

declare class dt_entry {
  constructor(init?: dt_entryDescriptor);
  code: code_desc;
  data: data_desc;
  ldt: ldt_desc;
  task_state: tss_desc;
  call_gate: call_gate;
  trap_gate: trap_gate;
  intr_gate: intr_gate;
  task_gate: task_gate;
}

type __ReplyUnion__receive_sysdiagnose_notification_subsystemDescriptor = 
  | { Reply_sysdiagnose_notification: __Reply__sysdiagnose_notification_t }
  | { Reply_sysdiagnose_notification_with_audit_token: __Reply__sysdiagnose_notification_with_audit_token_t };

declare class __ReplyUnion__receive_sysdiagnose_notification_subsystem {
  constructor(init?: __ReplyUnion__receive_sysdiagnose_notification_subsystemDescriptor);
  Reply_sysdiagnose_notification: __Reply__sysdiagnose_notification_t;
  Reply_sysdiagnose_notification_with_audit_token: __Reply__sysdiagnose_notification_with_audit_token_t;
}

type vm_addr_struct_tDescriptor = 
  | { UNSAFE: number };

declare class vm_addr_struct_t {
  constructor(init?: vm_addr_struct_tDescriptor);
  UNSAFE: number;
}

type unnamed_16803006733224326053Descriptor = 
  | { asid: number }
  | { vmid: number };

declare class unnamed_16803006733224326053 {
  constructor(init?: unnamed_16803006733224326053Descriptor);
  asid: number;
  vmid: number;
}

type __ReplyUnion__send_ktrace_background_subsystemDescriptor = 
  | { Reply_send_ktrace_background_available: __Reply__ktrace_background_available_t };

declare class __ReplyUnion__send_ktrace_background_subsystem {
  constructor(init?: __ReplyUnion__send_ktrace_background_subsystemDescriptor);
  Reply_send_ktrace_background_available: __Reply__ktrace_background_available_t;
}

type unnamed_10414494865187495339Descriptor = 
  | { level: number }
  | { raw: number };

declare class unnamed_10414494865187495339 {
  constructor(init?: unnamed_10414494865187495339Descriptor);
  level: number;
  raw: number;
}

type unnamed_6174747975915617679Descriptor = 
  | { range: unnamed_11975482992842642533 }
  | { notRange: unnamed_2475899045996132323 };

declare class unnamed_6174747975915617679 {
  constructor(init?: unnamed_6174747975915617679Descriptor);
  range: unnamed_11975482992842642533;
  notRange: unnamed_2475899045996132323;
}

type __ReplyUnion__memory_error_notification_subsystemDescriptor = 
  | { Reply_memory_error_notification: __Reply__memory_error_notification_t }
  | { Reply_mcc_memory_error_notification: __Reply__mcc_memory_error_notification_t };

declare class __ReplyUnion__memory_error_notification_subsystem {
  constructor(init?: __ReplyUnion__memory_error_notification_subsystemDescriptor);
  Reply_memory_error_notification: __Reply__memory_error_notification_t;
  Reply_mcc_memory_error_notification: __Reply__mcc_memory_error_notification_t;
}

declare function panic(string: string): void;

declare function kern_feature_override(fmask: interop.Enum<typeof kf_override_flag_t>): number;

declare function OSUnserializeBinary(buffer: interop.PointerConvertible, bufferSize: number): interop.Pointer;

declare function vm_kernel_addrhide(addr: number, hide_addr: interop.PointerConvertible): void;

declare function vm_kernel_addrperm_external(addr: number, perm_addr: interop.PointerConvertible): void;

declare function vm_kernel_unslide_or_perm_external(addr: number, perm_addr: interop.PointerConvertible): void;

declare function vm_kernel_addrhash(addr: number): number;

declare function thread_has_thread_name(th: number): number;

declare function thread_set_thread_name(th: number, name: string): void;

declare function current_thread(): number;

declare function thread_tid(thread: number): number;

declare function thread_reference(thread: number): void;

declare function thread_deallocate(thread: number): void;

declare function kernel_thread_start(continuation: (p1: interop.PointerConvertible, p2: number) => void, parameter: interop.PointerConvertible, new_thread: interop.PointerConvertible): number;

declare function Assert(file: string, line: number, expression: string): void;

declare function task_reference(p1: number): void;

declare function task_deallocate(p1: number): void;

declare function task_is_driver(task: number): boolean;

declare function task_name_deallocate_mig(task_name: number): void;

declare function task_policy_set_deallocate_mig(task_policy_set: number): void;

declare function task_policy_get_deallocate_mig(task_policy_get: number): void;

declare function task_inspect_deallocate_mig(task_inspect: number): void;

declare function task_read_deallocate_mig(task_read: number): void;

declare function task_suspension_token_deallocate(token: number): void;

declare function task_self_region_footprint(): number;

declare function task_self_region_footprint_set(newval: number): void;

declare function task_self_region_info_flags(): number;

declare function task_self_region_info_flags_set(newval: number): number;

declare function task_ledgers_footprint(ledger: number, ledger_resident: interop.PointerConvertible, ledger_compressed: interop.PointerConvertible): void;

declare function task_set_memory_ownership_transfer(task: number, value: number): void;

declare function clock_get_calendar_microtime(secs: interop.PointerConvertible, microsecs: interop.PointerConvertible): void;

declare function clock_get_calendar_absolute_and_microtime(secs: interop.PointerConvertible, microsecs: interop.PointerConvertible, abstime: interop.PointerConvertible): void;

declare function clock_get_calendar_nanotime(secs: interop.PointerConvertible, nanosecs: interop.PointerConvertible): void;

declare function clock_get_system_microtime(secs: interop.PointerConvertible, microsecs: interop.PointerConvertible): void;

declare function clock_get_system_nanotime(secs: interop.PointerConvertible, nanosecs: interop.PointerConvertible): void;

declare function clock_timebase_info(info: interop.PointerConvertible): void;

declare function clock_get_uptime(result: interop.PointerConvertible): void;

declare function clock_interval_to_deadline(interval: number, scale_factor: number, result: interop.PointerConvertible): void;

declare function nanoseconds_to_deadline(interval: number, result: interop.PointerConvertible): void;

declare function clock_interval_to_absolutetime_interval(interval: number, scale_factor: number, result: interop.PointerConvertible): void;

declare function clock_absolutetime_interval_to_deadline(abstime: number, result: interop.PointerConvertible): void;

declare function clock_continuoustime_interval_to_deadline(abstime: number, result: interop.PointerConvertible): void;

declare function clock_delay_until(deadline: number): void;

declare function absolutetime_to_nanoseconds(abstime: number, result: interop.PointerConvertible): void;

declare function nanoseconds_to_absolutetime(nanoseconds: number, result: interop.PointerConvertible): void;

declare function absolutetime_to_microtime(abstime: number, secs: interop.PointerConvertible, microsecs: interop.PointerConvertible): void;

declare function absolutetime_to_continuoustime(abstime: number): number;

declare function continuoustime_to_absolutetime(conttime: number): number;

declare function thread_get_current_cpuid(): number;

declare function thread_block(continuation: (p1: interop.PointerConvertible, p2: number) => void): number;

declare function thread_block_parameter(continuation: (p1: interop.PointerConvertible, p2: number) => void, parameter: interop.PointerConvertible): number;

declare function assert_wait(event: interop.PointerConvertible, interruptible: number): number;

declare function assert_wait_timeout(event: interop.PointerConvertible, interruptible: number, interval: number, scale_factor: number): number;

declare function assert_wait_timeout_with_leeway(event: interop.PointerConvertible, interruptible: number, urgency: number, interval: number, leeway: number, scale_factor: number): number;

declare function assert_wait_deadline(event: interop.PointerConvertible, interruptible: number, deadline: number): number;

declare function assert_wait_deadline_with_leeway(event: interop.PointerConvertible, interruptible: number, urgency: number, deadline: number, leeway: number): number;

declare function thread_wakeup_prim(event: interop.PointerConvertible, one_thread: number, result: number): number;

declare function thread_wakeup_nthreads_prim(event: interop.PointerConvertible, nthreads: number, result: number): number;

declare function thread_wakeup_thread(event: interop.PointerConvertible, thread: number): number;

declare function preemption_enabled(): number;

declare function lck_attr_alloc_init(): interop.Pointer;

declare function lck_attr_setdefault(attr: interop.PointerConvertible): void;

declare function lck_attr_setdebug(attr: interop.PointerConvertible): void;

declare function lck_attr_cleardebug(attr: interop.PointerConvertible): void;

declare function lck_attr_free(attr: interop.PointerConvertible): void;

declare function lck_grp_attr_alloc_init(): interop.Pointer;

declare function lck_grp_attr_setdefault(attr: interop.PointerConvertible): void;

declare function lck_grp_attr_setstat(attr: interop.PointerConvertible): void;

declare function lck_grp_attr_free(attr: interop.PointerConvertible): void;

declare function lck_grp_alloc_init(grp_name: string, attr: interop.PointerConvertible): interop.Pointer;

declare function lck_grp_free(grp: interop.PointerConvertible): void;

declare function lck_mtx_alloc_init(grp: interop.PointerConvertible, attr: interop.PointerConvertible): interop.Pointer;

declare function lck_mtx_init(lck: interop.PointerConvertible, grp: interop.PointerConvertible, attr: interop.PointerConvertible): void;

declare function lck_mtx_lock(lck: interop.PointerConvertible): void;

declare function lck_mtx_unlock(lck: interop.PointerConvertible): void;

declare function lck_mtx_destroy(lck: interop.PointerConvertible, grp: interop.PointerConvertible): void;

declare function lck_mtx_free(lck: interop.PointerConvertible, grp: interop.PointerConvertible): void;

declare function lck_mtx_sleep(lck: interop.PointerConvertible, lck_sleep_action: interop.Enum<typeof lck_sleep_action_t>, event: interop.PointerConvertible, interruptible: number): number;

declare function lck_mtx_sleep_deadline(lck: interop.PointerConvertible, lck_sleep_action: interop.Enum<typeof lck_sleep_action_t>, event: interop.PointerConvertible, interruptible: number, deadline: number): number;

declare function lck_mtx_assert(lck: interop.PointerConvertible, type: number): void;

declare function lck_rw_alloc_init(grp: interop.PointerConvertible, attr: interop.PointerConvertible): interop.Pointer;

declare function lck_rw_init(lck: interop.PointerConvertible, grp: interop.PointerConvertible, attr: interop.PointerConvertible): void;

declare function lck_rw_free(lck: interop.PointerConvertible, grp: interop.PointerConvertible): void;

declare function lck_rw_destroy(lck: interop.PointerConvertible, grp: interop.PointerConvertible): void;

declare function lck_rw_lock(lck: interop.PointerConvertible, lck_rw_type: number): void;

declare function lck_rw_try_lock(lck: interop.PointerConvertible, lck_rw_type: number): number;

declare function lck_rw_unlock(lck: interop.PointerConvertible, lck_rw_type: number): void;

declare function lck_rw_lock_shared(lck: interop.PointerConvertible): void;

declare function lck_rw_lock_shared_to_exclusive(lck: interop.PointerConvertible): number;

declare function lck_rw_unlock_shared(lck: interop.PointerConvertible): void;

declare function lck_rw_lock_exclusive(lck: interop.PointerConvertible): void;

declare function lck_rw_lock_exclusive_to_shared(lck: interop.PointerConvertible): void;

declare function lck_rw_unlock_exclusive(lck: interop.PointerConvertible): void;

declare function lck_rw_sleep(lck: interop.PointerConvertible, lck_sleep_action: interop.Enum<typeof lck_sleep_action_t>, event: interop.PointerConvertible, interruptible: number): number;

declare function lck_rw_sleep_deadline(lck: interop.PointerConvertible, lck_sleep_action: interop.Enum<typeof lck_sleep_action_t>, event: interop.PointerConvertible, interruptible: number, deadline: number): number;

declare function lck_spin_alloc_init(grp: interop.PointerConvertible, attr: interop.PointerConvertible): interop.Pointer;

declare function lck_spin_init(lck: interop.PointerConvertible, grp: interop.PointerConvertible, attr: interop.PointerConvertible): void;

declare function lck_spin_lock(lck: interop.PointerConvertible): void;

declare function lck_spin_lock_grp(lck: interop.PointerConvertible, grp: interop.PointerConvertible): void;

declare function lck_spin_unlock(lck: interop.PointerConvertible): void;

declare function lck_spin_destroy(lck: interop.PointerConvertible, grp: interop.PointerConvertible): void;

declare function lck_spin_free(lck: interop.PointerConvertible, grp: interop.PointerConvertible): void;

declare function lck_spin_sleep(lck: interop.PointerConvertible, lck_sleep_action: interop.Enum<typeof lck_sleep_action_t>, event: interop.PointerConvertible, interruptible: number): number;

declare function lck_spin_sleep_grp(lck: interop.PointerConvertible, lck_sleep_action: interop.Enum<typeof lck_sleep_action_t>, event: interop.PointerConvertible, interruptible: number, grp: interop.PointerConvertible): number;

declare function lck_spin_sleep_deadline(lck: interop.PointerConvertible, lck_sleep_action: interop.Enum<typeof lck_sleep_action_t>, event: interop.PointerConvertible, interruptible: number, deadline: number): number;

declare function mach_msg_send_from_kernel_proper(msg: interop.PointerConvertible, send_size: number): number;

declare function kernel_mach_msg_send_with_builder(descriptor_count: number, payload_size: number, builder: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void): number;

declare function mach_msg_rpc_from_kernel_proper(msg: interop.PointerConvertible, send_size: number, rcv_size: number): number;

declare function mach_msg_destroy_from_kernel_proper(msg: interop.PointerConvertible): void;

declare function crc32(crc: number, bufp: interop.PointerConvertible, len: number): number;

declare function copyin(uaddr: number, kaddr: interop.PointerConvertible, len: number): number;

declare function copyout(kaddr: interop.PointerConvertible, udaddr: number, len: number): number;

declare function ffs(p1: number): number;

declare function ffsll(p1: number): number;

declare function fls(p1: number): number;

declare function flsll(p1: number): number;

declare function random(): number;

declare function scanc(p1: number, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number): number;

declare function strtol(p1: string, p2: interop.PointerConvertible, p3: number): number;

declare function strtoul(p1: string, p2: interop.PointerConvertible, p3: number): number;

declare function strtoq(p1: string, p2: interop.PointerConvertible, p3: number): number;

declare function strtouq(p1: string, p2: interop.PointerConvertible, p3: number): number;

declare function strsep(p1: interop.PointerConvertible, p2: string): string;

declare function memchr(p1: interop.PointerConvertible, p2: number, p3: number): interop.Pointer;

declare function url_decode(str: string): void;

declare function ruby_snprintf(p1: string, count: number, p3: string): number;

declare function scnprintf(p1: string, count: number, p3: string): number;

declare function tsnprintf(dst: string, count: number, fmt: string): string;

declare function vtsnprintf(dst: string, count: number, fmt: string, ap: string): string;

declare function __builtin___sprintf_chk(bufp: string): number;

declare function sscanf(p1: string, p2: string): number;

declare function printf(p1: string): number;

declare function crc32(crc: number, bufp: interop.PointerConvertible, len: number): number;

declare function copystr(kfaddr: interop.PointerConvertible, kdaddr: interop.PointerConvertible, len: number, done: interop.PointerConvertible): number;

declare function copyinstr(uaddr: number, kaddr: interop.PointerConvertible, len: number, done: interop.PointerConvertible): number;

declare function copyoutstr(kaddr: interop.PointerConvertible, udaddr: number, len: number, done: interop.PointerConvertible): number;

declare function vsscanf(p1: string, p2: string, p3: string): number;

declare function vprintf(p1: string, p2: string): number;

declare function ruby_vsnprintf(p1: string, p2: number, p3: string, p4: string): number;

declare function vscnprintf(p1: string, p2: number, p3: string, p4: string): number;

declare function __builtin___vsprintf_chk(bufp: string): number;

declare function invalidate_icache(p1: number, p2: number, p3: number): void;

declare function flush_dcache(p1: number, p2: number, p3: number): void;

declare function invalidate_icache64(p1: number, p2: number, p3: number): void;

declare function flush_dcache64(p1: number, p2: number, p3: number): void;

declare function _doprnt(format: string, arg: interop.PointerConvertible, lputc: (p1: number) => void, radix: number): void;

declare function ml_cpu_signal(cpu_id: number): void;

declare function ml_cpu_signal_deferred_adjust_timer(nanosecs: number): void;

declare function ml_cpu_signal_deferred_get_timer(): number;

declare function ml_cpu_signal_deferred(cpu_id: number): void;

declare function ml_cpu_signal_retract(cpu_id: number): void;

declare function ml_init_interrupt(): void;

declare function ml_get_interrupts_enabled(): number;

declare function ml_set_interrupts_enabled_with_debug(enable: number, debug: number): number;

declare function ml_set_interrupts_enabled(enable: number): number;

declare function ml_early_set_interrupts_enabled(enable: number): number;

declare function sched_perfcontrol_ml_set_interrupts_without_measurement(enable: number): number;

declare function sched_perfcontrol_abandon_preemption_disable_measurement(): void;

declare function ml_at_interrupt_context(): number;

declare function ml_cause_interrupt(): void;

declare function siq_init(): void;

declare function siq_cpu_init(): void;

declare function ex_cb_register(cb_class: interop.Enum<typeof ex_cb_class_t>, cb: (p1: interop.Enum<typeof ex_cb_class_t>, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => interop.Enum<typeof ex_cb_action_t>, refcon: interop.PointerConvertible): number;

declare function ex_cb_invoke(cb_class: interop.Enum<typeof ex_cb_class_t>, far: number): interop.Enum<typeof ex_cb_action_t>;

declare function ml_get_cpu_count(): number;

declare function ml_get_cpu_number_type(cluster_type: interop.Enum<typeof cluster_type_t>, logical: boolean, available: boolean): number;

declare function ml_get_cluster_number_type(cluster_type: interop.Enum<typeof cluster_type_t>): number;

declare function ml_cpu_cache_sharing(level: number, cluster_type: interop.Enum<typeof cluster_type_t>, include_all_cpu_types: boolean): number;

declare function ml_get_cpu_types(): number;

declare function ml_get_boot_cpu_number(): number;

declare function ml_get_cpu_number(phys_id: number): number;

declare function ml_get_cpu_number_local(): number;

declare function ml_get_cluster_number(phys_id: number): number;

declare function ml_get_max_cpu_number(): number;

declare function ml_get_max_cluster_number(): number;

declare function ml_get_first_cpu_id(cluster_id: number): number;

declare function ml_get_die_id(cluster_id: number): number;

declare function ml_get_die_cluster_id(cluster_id: number): number;

declare function ml_get_max_die_id(): number;

declare function ml_get_cluster_number_local(): number;

declare function ml_get_boot_cluster_type(): interop.Enum<typeof cluster_type_t>;

declare function ml_map_cpu_pio(): void;

declare function ml_processor_register(ml_processor_info: interop.PointerConvertible, processor: interop.PointerConvertible, ipi_handler: interop.PointerConvertible, pmi_handler: interop.PointerConvertible): number;

declare function ml_lockdown_handler_register(p1: (p1: interop.PointerConvertible) => void, p2: interop.PointerConvertible): number;

declare function ml_mcache_flush_callback_register(func: (p1: interop.PointerConvertible) => number, service: interop.PointerConvertible): number;

declare function ml_mcache_flush(): number;

declare function ml_static_vtop(p1: number): number;

declare function ml_static_verify_page_protections(base: number, size: number, prot: number): number;

declare function ml_static_ptovirt(p1: number): number;

declare function ml_get_abstime_offset(): number;

declare function ml_get_conttime_offset(): number;

declare function ml_probe_read(paddr: number, val: interop.PointerConvertible): number;

declare function ml_probe_read_64(paddr: number, val: interop.PointerConvertible): number;

declare function ml_phys_read_byte(paddr: number): number;

declare function ml_phys_read_byte_64(paddr: number): number;

declare function ml_phys_read_half(paddr: number): number;

declare function ml_phys_read_half_64(paddr: number): number;

declare function ml_phys_read(paddr: number): number;

declare function ml_phys_read_64(paddr: number): number;

declare function ml_phys_read_word(paddr: number): number;

declare function ml_phys_read_word_64(paddr: number): number;

declare function ml_phys_read_double(paddr: number): number;

declare function ml_phys_read_double_64(paddr: number): number;

declare function ml_phys_write_byte(paddr: number, data: number): void;

declare function ml_phys_write_byte_64(paddr: number, data: number): void;

declare function ml_phys_write_half(paddr: number, data: number): void;

declare function ml_phys_write_half_64(paddr: number, data: number): void;

declare function ml_phys_write(paddr: number, data: number): void;

declare function ml_phys_write_64(paddr: number, data: number): void;

declare function ml_phys_write_word(paddr: number, data: number): void;

declare function ml_phys_write_word_64(paddr: number, data: number): void;

declare function ml_phys_write_double(paddr: number, data: number): void;

declare function ml_phys_write_double_64(paddr: number, data: number): void;

declare function ml_static_mfree(p1: number, p2: number): void;

declare function ml_static_protect(start: number, size: number, new_prot: number): number;

declare function ml_vtophys(vaddr: number): number;

declare function ml_cpu_get_info(ml_cpu_info: interop.PointerConvertible): void;

declare function ml_cpu_get_info_type(ml_cpu_info: interop.PointerConvertible, cluster_type: interop.Enum<typeof cluster_type_t>): void;

declare function ml_page_protection_type(): number;

declare function bzero_phys(phys_address: number, length: number): void;

declare function bzero_phys_nc(src64: number, bytes: number): void;

declare function bzero_phys_with_options(src: number, bytes: number, options: number): void;

declare function ml_thread_policy(thread: number, policy_id: number, policy_info: number): void;

declare function ml_set_max_cpus(max_cpus: number): void;

declare function ml_wait_max_cpus(): number;

declare function ml_get_machine_mem(): number;

declare function ml_cpu_init_completed(): void;

declare function ml_cpu_up(): void;

declare function ml_cpu_down(): void;

declare function ml_find_next_up_processor(): number;

declare function ml_cpu_up_update_counts(cpu_id: number): void;

declare function ml_cpu_down_update_counts(cpu_id: number): void;

declare function ml_arm_sleep(): void;

declare function ml_get_wake_timebase(): number;

declare function ml_get_conttime_wake_time(): number;

declare function ml_get_time_since_reset(): number;

declare function ml_set_reset_time(wake_time: number): void;

declare function ml_stack_remaining(): number;

declare function arm_debug_read_dscr(): number;

declare function set_be_bit(): number;

declare function clr_be_bit(): number;

declare function be_tracing(): number;

declare function cpu_broadcast_xcall(p1: interop.PointerConvertible, p2: number, p3: (p1: interop.PointerConvertible) => void, p4: interop.PointerConvertible): number;

declare function cpu_broadcast_xcall_simple(p1: number, p2: (p1: interop.PointerConvertible) => void, p3: interop.PointerConvertible): number;

declare function cpu_xcall(p1: number, p2: (p1: interop.PointerConvertible) => void, p3: interop.PointerConvertible): number;

declare function cpu_immediate_xcall(p1: number, p2: (p1: interop.PointerConvertible) => void, p3: interop.PointerConvertible): number;

declare function machine_timeout_suspended(): number;

declare function ml_get_power_state(p1: interop.PointerConvertible, p2: interop.PointerConvertible): void;

declare function get_arm_cpu_version(): number;

declare function user_cont_hwclock_allowed(): number;

declare function user_timebase_type(): number;

declare function ml_thread_is64bit(thread: number): number;

declare function ml_feature_supported(feature_bit: number): boolean;

declare function ml_set_align_checking(): void;

declare function wfe_timeout_configure(): void;

declare function wfe_timeout_init(): void;

declare function ml_timer_evaluate(): void;

declare function ml_timer_forced_evaluation(): number;

declare function ml_gpu_stat_update(p1: number): void;

declare function ml_gpu_stat(p1: number): number;

declare function ml_hibernate_active_pre(): void;

declare function ml_hibernate_active_post(): void;

declare function ml_report_minor_badness(badness_id: number): void;

declare function cpu_event_register_callback(fn: (p1: interop.PointerConvertible, p2: interop.Enum<typeof cpu_event>, p3: number) => boolean, param: interop.PointerConvertible): void;

declare function cpu_event_unregister_callback(fn: (p1: interop.PointerConvertible, p2: interop.Enum<typeof cpu_event>, p3: number) => boolean): void;

declare function cpu_event_debug_log(event: interop.Enum<typeof cpu_event>, cpu_or_cluster: number): void;

declare function dump_cpu_event_log(printf_func: (p1: string) => number): void;

declare function ml_io_read(iovaddr: number, iovsz: number): number;

declare function ml_io_read8(iovaddr: number): number;

declare function ml_io_read16(iovaddr: number): number;

declare function ml_io_read32(iovaddr: number): number;

declare function ml_io_read64(iovaddr: number): number;

declare function ml_io_read_cpu_reg(io_vaddr: number, io_sz: number, logical_cpu: number): number;

declare function ml_io_write(vaddr: number, val: number, size: number): void;

declare function ml_io_write8(vaddr: number, val: number): void;

declare function ml_io_write16(vaddr: number, val: number): void;

declare function ml_io_write32(vaddr: number, val: number): void;

declare function ml_io_write64(vaddr: number, val: number): void;

declare function IOLockAlloc(): interop.Pointer;

declare function IOLockFree(lock: interop.PointerConvertible): void;

declare function IOLockGetMachLock(lock: interop.PointerConvertible): interop.Pointer;

declare function IOLockLock(lock: interop.PointerConvertible): void;

declare function IOLockTryLock(lock: interop.PointerConvertible): number;

declare function IOLockUnlock(lock: interop.PointerConvertible): void;

declare function IOLockInitWithState(lock: interop.PointerConvertible, state: interop.Enum<typeof IOLockState>): void;

declare function IORecursiveLockAlloc(): interop.Pointer;

declare function IORecursiveLockFree(lock: interop.PointerConvertible): void;

declare function IORecursiveLockGetMachLock(lock: interop.PointerConvertible): interop.Pointer;

declare function IORecursiveLockLock(lock: interop.PointerConvertible): void;

declare function IORecursiveLockTryLock(lock: interop.PointerConvertible): number;

declare function IORecursiveLockUnlock(lock: interop.PointerConvertible): void;

declare function IORecursiveLockHaveLock(lock: interop.PointerConvertible): number;

declare function IORecursiveLockSleep(_lock: interop.PointerConvertible, event: interop.PointerConvertible, interType: number): number;

declare function IORecursiveLockSleepDeadline(_lock: interop.PointerConvertible, event: interop.PointerConvertible, deadline: UnsignedWide, interType: number): number;

declare function IORecursiveLockWakeup(_lock: interop.PointerConvertible, event: interop.PointerConvertible, oneThread: boolean): void;

declare function IORWLockAlloc(): interop.Pointer;

declare function IORWLockFree(lock: interop.PointerConvertible): void;

declare function IORWLockGetMachLock(lock: interop.PointerConvertible): interop.Pointer;

declare function IORWLockRead(lock: interop.PointerConvertible): void;

declare function IORWLockTryRead(lock: interop.PointerConvertible): void;

declare function IORWLockWrite(lock: interop.PointerConvertible): void;

declare function IORWLockTryWrite(lock: interop.PointerConvertible): void;

declare function IORWLockUnlock(lock: interop.PointerConvertible): void;

declare function IOSimpleLockAlloc(): interop.Pointer;

declare function IOSimpleLockFree(lock: interop.PointerConvertible): void;

declare function IOSimpleLockGetMachLock(lock: interop.PointerConvertible): interop.Pointer;

declare function IOSimpleLockInit(lock: interop.PointerConvertible): void;

declare function IOSimpleLockDestroy(lock: interop.PointerConvertible): void;

declare function IOSimpleLockLock(lock: interop.PointerConvertible): void;

declare function IOSimpleLockTryLock(lock: interop.PointerConvertible): number;

declare function IOSimpleLockUnlock(lock: interop.PointerConvertible): void;

declare function IOPrintPlane(plane: interop.PointerConvertible): void;

declare function OSPrintMemory(): void;

declare function thread_call_enter(call: interop.PointerConvertible): number;

declare function thread_call_enter1(call: interop.PointerConvertible, param1: interop.PointerConvertible): number;

declare function thread_call_enter_delayed(call: interop.PointerConvertible, deadline: number): number;

declare function thread_call_enter1_delayed(call: interop.PointerConvertible, param1: interop.PointerConvertible, deadline: number): number;

declare function thread_call_cancel(call: interop.PointerConvertible): number;

declare function thread_call_cancel_wait(call: interop.PointerConvertible): number;

declare function thread_call_allocate(func: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, param0: interop.PointerConvertible): interop.Pointer;

declare function thread_call_allocate_with_priority(func: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, param0: interop.PointerConvertible, pri: interop.Enum<typeof thread_call_priority_t>): interop.Pointer;

declare function thread_call_allocate_with_options(func: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, param0: interop.PointerConvertible, pri: interop.Enum<typeof thread_call_priority_t>, options: number): interop.Pointer;

declare function thread_call_free(call: interop.PointerConvertible): number;

declare function thread_call_isactive(call: interop.PointerConvertible): number;

declare function IOServiceOrdering(inObj1: interop.PointerConvertible, inObj2: interop.PointerConvertible, ref: interop.PointerConvertible): number;

declare function nullop(): number;

declare function nulldev(): number;

declare function enoioctl(): number;

declare function enosys(): number;

declare function enxio(): number;

declare function eopnotsupp(): number;

declare function hashinit(count: number, type: number, hashmask: interop.PointerConvertible): interop.Pointer;

declare function hashdestroy(p1: interop.PointerConvertible, type: number, hashmask: number): void;

declare function ovbcopy(from: interop.PointerConvertible, to: interop.PointerConvertible, len: number): void;

declare function fubyte(addr: number): number;

declare function fuibyte(addr: number): number;

declare function subyte(addr: number, byte: number): number;

declare function suibyte(addr: number, byte: number): number;

declare function fuword(addr: number): number;

declare function fuiword(addr: number): number;

declare function suword(addr: number, word: number): number;

declare function suiword(addr: number, word: number): number;

declare function useracc(addr: number, len: number, prot: number): number;

declare function bsd_timeout(p1: (p1: interop.PointerConvertible) => void, arg: interop.PointerConvertible, ts: interop.PointerConvertible): void;

declare function bsd_untimeout(p1: (p1: interop.PointerConvertible) => void, arg: interop.PointerConvertible): void;

declare function set_fsblocksize(p1: interop.PointerConvertible): void;

declare function tvtoabstime(p1: interop.PointerConvertible): number;

declare function tstoabstime(p1: interop.PointerConvertible): number;

declare function throttle_info_create(): interop.Pointer;

declare function throttle_info_mount_ref(mp: interop.PointerConvertible, throttle_info: interop.PointerConvertible): void;

declare function throttle_info_mount_rel(mp: interop.PointerConvertible): void;

declare function throttle_info_release(throttle_info: interop.PointerConvertible): void;

declare function throttle_info_update(throttle_info: interop.PointerConvertible, flags: number): void;

declare function throttle_lowpri_io(sleep_amount: number): number;

declare function throttle_lowpri_io_will_be_throttled(sleep_amount: number): number;

declare function throttle_set_thread_io_policy(policy: number): void;

declare function throttle_get_thread_effective_io_policy(): number;

declare function throttle_thread_io_tier_above_metadata(): number;

declare function throttle_info_ref_by_mask(throttle_mask: number, throttle_info_handle: interop.PointerConvertible): number;

declare function throttle_info_rel_by_mask(throttle_info_handle: interop.PointerConvertible): void;

declare function throttle_info_update_by_mask(throttle_info_handle: interop.PointerConvertible, flags: number): void;

declare function throttle_info_disable_throttle(devno: number, isfusion: number): void;

declare function throttle_info_io_will_be_throttled(throttle_info_handle: interop.PointerConvertible, policy: number): number;

declare function nop_create(ap: interop.PointerConvertible): number;

declare function err_create(ap: interop.PointerConvertible): number;

declare function nop_whiteout(ap: interop.PointerConvertible): number;

declare function err_whiteout(ap: interop.PointerConvertible): number;

declare function nop_mknod(ap: interop.PointerConvertible): number;

declare function err_mknod(ap: interop.PointerConvertible): number;

declare function nop_open(ap: interop.PointerConvertible): number;

declare function err_open(ap: interop.PointerConvertible): number;

declare function nop_close(ap: interop.PointerConvertible): number;

declare function err_close(ap: interop.PointerConvertible): number;

declare function nop_access(ap: interop.PointerConvertible): number;

declare function err_access(ap: interop.PointerConvertible): number;

declare function nop_getattr(ap: interop.PointerConvertible): number;

declare function err_getattr(ap: interop.PointerConvertible): number;

declare function nop_setattr(ap: interop.PointerConvertible): number;

declare function err_setattr(ap: interop.PointerConvertible): number;

declare function nop_read(ap: interop.PointerConvertible): number;

declare function err_read(ap: interop.PointerConvertible): number;

declare function nop_write(ap: interop.PointerConvertible): number;

declare function err_write(ap: interop.PointerConvertible): number;

declare function nop_ioctl(ap: interop.PointerConvertible): number;

declare function err_ioctl(ap: interop.PointerConvertible): number;

declare function nop_select(ap: interop.PointerConvertible): number;

declare function err_select(ap: interop.PointerConvertible): number;

declare function nop_exchange(ap: interop.PointerConvertible): number;

declare function err_exchange(ap: interop.PointerConvertible): number;

declare function nop_revoke(ap: interop.PointerConvertible): number;

declare function err_revoke(ap: interop.PointerConvertible): number;

declare function nop_mmap(ap: interop.PointerConvertible): number;

declare function err_mmap(ap: interop.PointerConvertible): number;

declare function nop_fsync(ap: interop.PointerConvertible): number;

declare function err_fsync(ap: interop.PointerConvertible): number;

declare function nop_remove(ap: interop.PointerConvertible): number;

declare function err_remove(ap: interop.PointerConvertible): number;

declare function nop_link(ap: interop.PointerConvertible): number;

declare function err_link(ap: interop.PointerConvertible): number;

declare function nop_rename(ap: interop.PointerConvertible): number;

declare function err_rename(ap: interop.PointerConvertible): number;

declare function nop_mkdir(ap: interop.PointerConvertible): number;

declare function err_mkdir(ap: interop.PointerConvertible): number;

declare function nop_rmdir(ap: interop.PointerConvertible): number;

declare function err_rmdir(ap: interop.PointerConvertible): number;

declare function nop_symlink(ap: interop.PointerConvertible): number;

declare function err_symlink(ap: interop.PointerConvertible): number;

declare function nop_readdir(ap: interop.PointerConvertible): number;

declare function err_readdir(ap: interop.PointerConvertible): number;

declare function nop_readdirattr(ap: interop.PointerConvertible): number;

declare function err_readdirattr(ap: interop.PointerConvertible): number;

declare function nop_readlink(ap: interop.PointerConvertible): number;

declare function err_readlink(ap: interop.PointerConvertible): number;

declare function nop_inactive(ap: interop.PointerConvertible): number;

declare function err_inactive(ap: interop.PointerConvertible): number;

declare function nop_reclaim(ap: interop.PointerConvertible): number;

declare function err_reclaim(ap: interop.PointerConvertible): number;

declare function nop_strategy(ap: interop.PointerConvertible): number;

declare function err_strategy(ap: interop.PointerConvertible): number;

declare function nop_pathconf(ap: interop.PointerConvertible): number;

declare function err_pathconf(ap: interop.PointerConvertible): number;

declare function nop_advlock(ap: interop.PointerConvertible): number;

declare function err_advlock(ap: interop.PointerConvertible): number;

declare function nop_allocate(ap: interop.PointerConvertible): number;

declare function err_allocate(ap: interop.PointerConvertible): number;

declare function nop_bwrite(ap: interop.PointerConvertible): number;

declare function err_bwrite(ap: interop.PointerConvertible): number;

declare function nop_pagein(ap: interop.PointerConvertible): number;

declare function err_pagein(ap: interop.PointerConvertible): number;

declare function nop_pageout(ap: interop.PointerConvertible): number;

declare function err_pageout(ap: interop.PointerConvertible): number;

declare function nop_searchfs(ap: interop.PointerConvertible): number;

declare function err_searchfs(ap: interop.PointerConvertible): number;

declare function nop_copyfile(ap: interop.PointerConvertible): number;

declare function err_copyfile(ap: interop.PointerConvertible): number;

declare function nop_blktooff(ap: interop.PointerConvertible): number;

declare function err_blktooff(ap: interop.PointerConvertible): number;

declare function nop_offtoblk(ap: interop.PointerConvertible): number;

declare function err_offtoblk(ap: interop.PointerConvertible): number;

declare function nop_blockmap(ap: interop.PointerConvertible): number;

declare function err_blockmap(ap: interop.PointerConvertible): number;

declare function nop_monitor(ap: interop.PointerConvertible): number;

declare function err_monitor(ap: interop.PointerConvertible): number;

declare function extmod_statistics_incr_task_for_pid(target: number): void;

declare function extmod_statistics_incr_thread_set_state(target: number): void;

declare function extmod_statistics_incr_thread_create(target: number): void;

declare function hv_support_init(): void;

declare function hv_get_support(): number;

declare function hv_set_task_target(target: interop.PointerConvertible): void;

declare function hv_set_thread_target(target: interop.PointerConvertible): void;

declare function hv_get_task_target(): interop.Pointer;

declare function hv_get_thread_target(): interop.Pointer;

declare function hv_get_volatile_state(state: interop.Enum<typeof hv_volatile_state_t>): number;

declare function hv_set_traps(trap_type: interop.Enum<typeof hv_trap_type_t>, traps: interop.PointerConvertible, trap_count: number): number;

declare function hv_release_traps(trap_type: interop.Enum<typeof hv_trap_type_t>): void;

declare function hv_set_callbacks(callbacks: hv_callbacks_t): number;

declare function hv_release_callbacks(): void;

declare function hv_suspend(): void;

declare function hv_resume(): void;

declare function hv_task_trap(index: number, arg: number): number;

declare function hv_thread_trap(index: number, arg: number): number;

declare function hv_ast_pending(): number;

declare function hv_trace_guest_enter(vcpu_id: number, vcpu_regs: interop.PointerConvertible): void;

declare function hv_trace_guest_exit(vcpu_id: number, vcpu_regs: interop.PointerConvertible, reason: number): void;

declare function hv_trace_guest_error(vcpu_id: number, vcpu_regs: interop.PointerConvertible, failure: number, error: number): void;

declare function host_self(): number;

declare function host_priv_self(): number;

declare function backtrace_user_copy_error(ctx: interop.PointerConvertible, dst: interop.PointerConvertible, src: number, size: number): number;

declare function backtrace(bt: interop.PointerConvertible, btlen: number, ctl: interop.PointerConvertible, info_out: interop.PointerConvertible): number;

declare function backtrace_packed(packing: interop.Enum<typeof backtrace_pack_t>, bt: interop.PointerConvertible, btsize: number, ctl: interop.PointerConvertible, info_out: interop.PointerConvertible): number;

declare function backtrace_pack(packing: interop.Enum<typeof backtrace_pack_t>, dst: interop.PointerConvertible, dst_size: number, src: interop.PointerConvertible, src_len: number): number;

declare function backtrace_unpack(packing: interop.Enum<typeof backtrace_pack_t>, dst: interop.PointerConvertible, dst_len: number, src: interop.PointerConvertible, src_size: number): number;

declare function backtrace_user(bt: interop.PointerConvertible, btlen: number, ctl: interop.PointerConvertible, info_out: interop.PointerConvertible): number;

declare function kpc_register_cpu(cpu_data: interop.PointerConvertible): void;

declare function kpc_unregister_cpu(cpu_data: interop.PointerConvertible): void;

declare function kpc_init(): void;

declare function kpc_arch_init(): void;

declare function kpc_get_classes(): number;

declare function kpc_get_running(): number;

declare function kpc_get_pmu_version(): number;

declare function kpc_set_running(classes: number): number;

declare function kpc_get_cpu_counters(all_cpus: number, classes: number, curcpu: interop.PointerConvertible, buf: interop.PointerConvertible): number;

declare function kpc_get_shadow_counters(all_cpus: number, classes: number, curcpu: interop.PointerConvertible, buf: interop.PointerConvertible): number;

declare function kpc_get_curthread_counters(inoutcount: interop.PointerConvertible, buf: interop.PointerConvertible): number;

declare function kpc_get_counter_count(classes: number): number;

declare function kpc_get_config_count(classes: number): number;

declare function kpc_get_thread_counting(): number;

declare function kpc_set_thread_counting(classes: number): number;

declare function kpc_get_config(classes: number, current_config: interop.PointerConvertible): number;

declare function kpc_set_config(classes: number, new_config: interop.PointerConvertible): number;

declare function kpc_get_period(classes: number, period: interop.PointerConvertible): number;

declare function kpc_set_period(classes: number, period: interop.PointerConvertible): number;

declare function kpc_get_actionid(classes: number, actionid: interop.PointerConvertible): number;

declare function kpc_set_actionid(classes: number, actionid: interop.PointerConvertible): number;

declare function kpc_thread_create(thread: number): void;

declare function kpc_thread_destroy(thread: number): void;

declare function kpc_counterbuf_alloc(): interop.Pointer;

declare function kpc_counterbuf_free(p1: interop.PointerConvertible): void;

declare function kpc_get_counterbuf_size(): number;

declare function kpc_thread_ast_handler(thread: number): void;

declare function kpc_force_all_ctrs(task: number, val: number): number;

declare function kpc_get_force_all_ctrs(): number;

declare function kpc_force_all_ctrs_arch(task: number, val: number): number;

declare function kpc_set_sw_inc(mask: number): number;

declare function kpc_register_pm_handler(handler: (p1: number) => void): number;

declare function kpc_reserve_pm_counters(pmc_mask: number, handler: (p1: number) => void, custom_config: number): number;

declare function kpc_release_pm_counters(): void;

declare function kpc_pm_acknowledge(available_to_pm: number): void;

declare function kpc_multiple_clients(): number;

declare function kpc_controls_fixed_counters(): number;

declare function kpc_controls_counter(ctr: number): number;

declare function kpc_idle(): void;

declare function kpc_idle_exit(): void;

declare function kpc_get_all_cpus_counters(classes: number, curcpu: interop.PointerConvertible, buf: interop.PointerConvertible): number;

declare function kpc_get_curcpu_counters(classes: number, curcpu: interop.PointerConvertible, buf: interop.PointerConvertible): number;

declare function kpc_get_fixed_counters(counterv: interop.PointerConvertible): number;

declare function kpc_get_configurable_counters(counterv: interop.PointerConvertible, pmc_mask: number): number;

declare function kpc_is_running_fixed(): number;

declare function kpc_is_running_configurable(pmc_mask: number): number;

declare function kpc_fixed_count(): number;

declare function kpc_configurable_count(): number;

declare function kpc_fixed_config_count(): number;

declare function kpc_configurable_config_count(pmc_mask: number): number;

declare function kpc_rawpmu_config_count(): number;

declare function kpc_get_fixed_config(configv: interop.PointerConvertible): number;

declare function kpc_get_configurable_config(configv: interop.PointerConvertible, pmc_mask: number): number;

declare function kpc_get_rawpmu_config(configv: interop.PointerConvertible): number;

declare function kpc_fixed_max(): number;

declare function kpc_configurable_max(): number;

declare function kpc_set_config_arch(mp_config: interop.PointerConvertible): number;

declare function kpc_set_period_arch(mp_config: interop.PointerConvertible): number;

declare function kpc_sample_kperf(actionid: number, counter: number, config: number, count: number, pc: number, flags: interop.Enum<typeof kperf_kpc_flags_t>): void;

declare function kpc_set_running_arch(mp_config: interop.PointerConvertible): number;

declare function kpc_popcount(value: number): number;

declare function kpc_get_configurable_pmc_mask(classes: number): number;

declare function get_address_from_kext_map(fsize: number): number;

declare function kext_alloc_init(): void;

declare function kext_alloc(addr: interop.PointerConvertible, size: number, fixed: number): number;

declare function kext_free(addr: number, size: number): void;

declare function kext_receipt(addrp: interop.PointerConvertible, sizep: interop.PointerConvertible): number;

declare function kext_receipt_set_queried(): number;

declare function priority_queue_init(pq: interop.PointerConvertible): void;

declare function priority_queue_insert(pq: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function priority_queue_remove(pq: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function priority_queue_entry_decreased(pq: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function priority_queue_entry_increased(pq: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function _priority_queue_destroy(pq: interop.PointerConvertible, offset: number, cb: (p1: interop.PointerConvertible) => void): void;

declare function priority_queue_insert(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function _priority_queue_remove_root(que: interop.PointerConvertible): interop.Pointer;

declare function priority_queue_remove(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function priority_queue_entry_decreased(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function priority_queue_entry_increased(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function _priority_queue_destroy(pq: interop.PointerConvertible, offset: number, cb: (p1: interop.PointerConvertible) => void): void;

declare function priority_queue_insert(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function _priority_queue_remove_root(que: interop.PointerConvertible): interop.Pointer;

declare function priority_queue_remove(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function priority_queue_entry_decreased(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function priority_queue_entry_increased(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function _priority_queue_destroy(pq: interop.PointerConvertible, offset: number, cb: (p1: interop.PointerConvertible) => void): void;

declare function priority_queue_insert(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function _priority_queue_remove_root(que: interop.PointerConvertible): interop.Pointer;

declare function priority_queue_remove(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function priority_queue_entry_decreased(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function priority_queue_entry_increased(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function _priority_queue_destroy(pq: interop.PointerConvertible, offset: number, cb: (p1: interop.PointerConvertible) => void): void;

declare function priority_queue_insert(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function _priority_queue_remove_root(que: interop.PointerConvertible): interop.Pointer;

declare function priority_queue_remove(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function priority_queue_entry_decreased(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function priority_queue_entry_increased(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function _priority_queue_destroy(pq: interop.PointerConvertible, offset: number, cb: (p1: interop.PointerConvertible) => void): void;

declare function priority_queue_insert(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function _priority_queue_remove_root(que: interop.PointerConvertible): interop.Pointer;

declare function priority_queue_remove(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function priority_queue_entry_decreased(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function priority_queue_entry_increased(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function _priority_queue_destroy(pq: interop.PointerConvertible, offset: number, cb: (p1: interop.PointerConvertible) => void): void;

declare function priority_queue_insert(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function _priority_queue_remove_root(que: interop.PointerConvertible): interop.Pointer;

declare function priority_queue_remove(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function priority_queue_entry_decreased(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function priority_queue_entry_increased(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function _priority_queue_destroy(pq: interop.PointerConvertible, offset: number, cb: (p1: interop.PointerConvertible) => void): void;

declare function priority_queue_insert(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function _priority_queue_remove_root(que: interop.PointerConvertible): interop.Pointer;

declare function priority_queue_remove(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function priority_queue_entry_decreased(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function priority_queue_entry_increased(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function _priority_queue_destroy(pq: interop.PointerConvertible, offset: number, cb: (p1: interop.PointerConvertible) => void): void;

declare function priority_queue_insert(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function _priority_queue_remove_root(que: interop.PointerConvertible): interop.Pointer;

declare function priority_queue_remove(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function priority_queue_entry_decreased(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function priority_queue_entry_increased(que: interop.PointerConvertible, elt: interop.PointerConvertible): boolean;

declare function kern_work_interval_create(thread: number, create_params: interop.PointerConvertible): number;

declare function kern_work_interval_get_flags_from_port(port_name: number, flags: interop.PointerConvertible): number;

declare function kern_port_name_to_work_interval(name: number, work_interval: interop.PointerConvertible): number;

declare function kern_work_interval_get_policy(work_interval: interop.PointerConvertible, policy: interop.PointerConvertible, priority: interop.PointerConvertible): number;

declare function kern_work_interval_release(work_interval: interop.PointerConvertible): void;

declare function kern_work_interval_explicit_join(thread: number, work_interval: interop.PointerConvertible): number;

declare function kern_work_interval_destroy(thread: number, work_interval_id: number): number;

declare function kern_work_interval_join(thread: number, port_name: number): number;

declare function kern_work_interval_notify(thread: number, kwi_args: interop.PointerConvertible): number;

declare function kern_work_interval_set_name(port_name: number, name: string, len: number): number;

declare function kern_work_interval_set_workload_id(port_name: number, workload_id_args: interop.PointerConvertible): number;

declare function kcdata_estimate_required_buffer_size(num_items: number, payload_size: number): number;

declare function kcdata_memory_get_used_bytes(kcd: interop.PointerConvertible): number;

declare function kcdata_memory_get_uncompressed_bytes(kcd: interop.PointerConvertible): number;

declare function kcdata_memcpy(data: interop.PointerConvertible, dst_addr: number, src_addr: interop.PointerConvertible, size: number): number;

declare function kcdata_bzero(data: interop.PointerConvertible, dst_addr: number, size: number): number;

declare function kcdata_get_memory_addr(data: interop.PointerConvertible, type: number, size: number, user_addr: interop.PointerConvertible): number;

declare function kcdata_get_memory_addr_for_array(data: interop.PointerConvertible, type_of_element: number, size_of_element: number, count: number, user_addr: interop.PointerConvertible): number;

declare function kern_ecc_poll_register(poll_func: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number, max_errors: number): number;

declare function task_restartable_ranges_register(task: number, ranges: interop.PointerConvertible, count: number): number;

declare function task_restartable_ranges_synchronize(task: number): number;

declare function mach_bridge_remote_time(p1: number): number;

declare function hv_support_init(): void;

declare function hv_get_support(): number;

declare function hv_set_task_target(target: interop.PointerConvertible): void;

declare function hv_set_thread_target(target: interop.PointerConvertible): void;

declare function hv_get_task_target(): interop.Pointer;

declare function hv_get_thread_target(): interop.Pointer;

declare function gpu_describe(p1: interop.PointerConvertible): void;

declare function gpu_accumulate_time(scope: number, gpu_id: number, gpu_domain: number, gpu_accumulated_ns: number, gpu_tstamp_ns: number): number;

declare function io_rate_update(io_rate_flags: number, read_ops_delta: number, write_ops_delta: number, read_bytes_delta: number, write_bytes_delta: number): number;

declare function io_rate_update_register(p1: (p1: number, p2: number, p3: number, p4: number, p5: number) => number): void;

declare function gpu_submission_telemetry(gpu_ncmds_total: number, gpu_noutstanding: number, gpu_busy_ns_total: number, gpu_cycles: number, gpu_telemetry_valid_flags: number, gpu_telemetry_misc: number): void;

declare function gpu_fceiling_cb_register(p1: (p1: number, p2: number) => number): void;

declare function ifnet_allocate(init: interop.PointerConvertible, interface: interop.PointerConvertible): number;

declare function ifnet_reference(interface: interop.PointerConvertible): number;

declare function ifnet_release(interface: interop.PointerConvertible): number;

declare function ifnet_attach(interface: interop.PointerConvertible, ll_addr: interop.PointerConvertible): number;

declare function ifnet_detach(interface: interop.PointerConvertible): number;

declare function ifnet_interface_family_find(module_string: string, family_id: interop.PointerConvertible): number;

declare function ifnet_softc(interface: interop.PointerConvertible): interop.Pointer;

declare function ifnet_name(interface: interop.PointerConvertible): string;

declare function ifnet_family(interface: interop.PointerConvertible): number;

declare function ifnet_unit(interface: interop.PointerConvertible): number;

declare function ifnet_index(interface: interop.PointerConvertible): number;

declare function ifnet_set_flags(interface: interop.PointerConvertible, new_flags: number, mask: number): number;

declare function ifnet_flags(interface: interop.PointerConvertible): number;

declare function ifnet_set_capabilities_supported(interface: interop.PointerConvertible, new_caps: number, mask: number): number;

declare function ifnet_capabilities_supported(interface: interop.PointerConvertible): number;

declare function ifnet_set_capabilities_enabled(interface: interop.PointerConvertible, new_caps: number, mask: number): number;

declare function ifnet_capabilities_enabled(interface: interop.PointerConvertible): number;

declare function ifnet_set_offload(interface: interop.PointerConvertible, offload: number): number;

declare function ifnet_set_offload_enabled(interface: interop.PointerConvertible, offload: number): number;

declare function ifnet_offload(interface: interop.PointerConvertible): number;

declare function ifnet_set_tso_mtu(interface: interop.PointerConvertible, family: number, mtuLen: number): number;

declare function ifnet_get_tso_mtu(interface: interop.PointerConvertible, family: number, mtuLen: interop.PointerConvertible): number;

declare function ifnet_set_wake_flags(interface: interop.PointerConvertible, properties: number, mask: number): number;

declare function ifnet_get_wake_flags(interface: interop.PointerConvertible): number;

declare function ifnet_set_link_mib_data(interface: interop.PointerConvertible, mibData: interop.PointerConvertible, mibLen: number): number;

declare function ifnet_get_link_mib_data(interface: interop.PointerConvertible, mibData: interop.PointerConvertible, mibLen: interop.PointerConvertible): number;

declare function ifnet_get_link_mib_data_length(interface: interop.PointerConvertible): number;

declare function ifnet_attach_protocol(interface: interop.PointerConvertible, protocol_family: number, proto_details: interop.PointerConvertible): number;

declare function ifnet_attach_protocol_v2(interface: interop.PointerConvertible, protocol_family: number, proto_details: interop.PointerConvertible): number;

declare function ifnet_detach_protocol(interface: interop.PointerConvertible, protocol_family: number): number;

declare function ifnet_output(interface: interop.PointerConvertible, protocol_family: number, packet: interop.PointerConvertible, route: interop.PointerConvertible, dest: interop.PointerConvertible): number;

declare function ifnet_output_raw(interface: interop.PointerConvertible, protocol_family: number, packet: interop.PointerConvertible): number;

declare function ifnet_input(interface: interop.PointerConvertible, first_packet: interop.PointerConvertible, stats: interop.PointerConvertible): number;

declare function ifnet_ioctl(interface: interop.PointerConvertible, protocol: number, ioctl_code: number, ioctl_arg: interop.PointerConvertible): number;

declare function ifnet_event(interface: interop.PointerConvertible, event_ptr: interop.PointerConvertible): number;

declare function ifnet_set_mtu(interface: interop.PointerConvertible, mtu: number): number;

declare function ifnet_mtu(interface: interop.PointerConvertible): number;

declare function ifnet_type(interface: interop.PointerConvertible): number;

declare function ifnet_set_addrlen(interface: interop.PointerConvertible, addrlen: number): number;

declare function ifnet_addrlen(interface: interop.PointerConvertible): number;

declare function ifnet_set_hdrlen(interface: interop.PointerConvertible, hdrlen: number): number;

declare function ifnet_hdrlen(interface: interop.PointerConvertible): number;

declare function ifnet_set_metric(interface: interop.PointerConvertible, metric: number): number;

declare function ifnet_metric(interface: interop.PointerConvertible): number;

declare function ifnet_set_baudrate(interface: interop.PointerConvertible, baudrate: number): number;

declare function ifnet_baudrate(interface: interop.PointerConvertible): number;

declare function ifnet_stat_increment(interface: interop.PointerConvertible, counts: interop.PointerConvertible): number;

declare function ifnet_stat_increment_in(interface: interop.PointerConvertible, packets_in: number, bytes_in: number, errors_in: number): number;

declare function ifnet_stat_increment_out(interface: interop.PointerConvertible, packets_out: number, bytes_out: number, errors_out: number): number;

declare function ifnet_set_stat(interface: interop.PointerConvertible, stats: interop.PointerConvertible): number;

declare function ifnet_stat(interface: interop.PointerConvertible, out_stats: interop.PointerConvertible): number;

declare function ifnet_set_promiscuous(interface: interop.PointerConvertible, on: number): number;

declare function ifnet_touch_lastchange(interface: interop.PointerConvertible): number;

declare function ifnet_lastchange(interface: interop.PointerConvertible, last_change: interop.PointerConvertible): number;

declare function ifnet_get_address_list(interface: interop.PointerConvertible, addresses: interop.PointerConvertible): number;

declare function ifnet_get_address_list_with_count(interface: interop.PointerConvertible, addresses: interop.PointerConvertible, addresses_count: interop.PointerConvertible): number;

declare function ifnet_get_address_list_family(interface: interop.PointerConvertible, addresses: interop.PointerConvertible, family: number): number;

declare function ifnet_free_address_list(addresses: interop.PointerConvertible): void;

declare function ifnet_set_lladdr(interface: interop.PointerConvertible, lladdr: interop.PointerConvertible, lladdr_len: number): number;

declare function ifnet_lladdr_copy_bytes(interface: interop.PointerConvertible, lladdr: interop.PointerConvertible, length: number): number;

declare function ifnet_llbroadcast_copy_bytes(interface: interop.PointerConvertible, addr: interop.PointerConvertible, bufferlen: number, out_len: interop.PointerConvertible): number;

declare function ifnet_resolve_multicast(ifp: interop.PointerConvertible, proto_addr: interop.PointerConvertible, ll_addr: interop.PointerConvertible, ll_len: number): number;

declare function ifnet_add_multicast(interface: interop.PointerConvertible, maddr: interop.PointerConvertible, multicast: interop.PointerConvertible): number;

declare function ifnet_remove_multicast(multicast: interop.PointerConvertible): number;

declare function ifnet_get_multicast_list(interface: interop.PointerConvertible, addresses: interop.PointerConvertible): number;

declare function ifnet_free_multicast_list(multicasts: interop.PointerConvertible): void;

declare function ifnet_find_by_name(ifname: string, interface: interop.PointerConvertible): number;

declare function ifnet_list_get(family: number, interfaces: interop.PointerConvertible, count: interop.PointerConvertible): number;

declare function ifnet_list_free(interfaces: interop.PointerConvertible): void;

declare function ifaddr_reference(ifaddr: interop.PointerConvertible): number;

declare function ifaddr_release(ifaddr: interop.PointerConvertible): number;

declare function ifaddr_address(ifaddr: interop.PointerConvertible, out_addr: interop.PointerConvertible, addr_size: number): number;

declare function ifaddr_address_family(ifaddr: interop.PointerConvertible): number;

declare function ifaddr_dstaddress(ifaddr: interop.PointerConvertible, out_dstaddr: interop.PointerConvertible, dstaddr_size: number): number;

declare function ifaddr_netmask(ifaddr: interop.PointerConvertible, out_netmask: interop.PointerConvertible, netmask_size: number): number;

declare function ifaddr_ifnet(ifaddr: interop.PointerConvertible): interop.Pointer;

declare function ifaddr_withaddr(address: interop.PointerConvertible): interop.Pointer;

declare function ifaddr_withdstaddr(destination: interop.PointerConvertible): interop.Pointer;

declare function ifaddr_withnet(net: interop.PointerConvertible): interop.Pointer;

declare function ifaddr_withroute(flags: number, destination: interop.PointerConvertible, gateway: interop.PointerConvertible): interop.Pointer;

declare function ifaddr_findbestforaddr(addr: interop.PointerConvertible, interface: interop.PointerConvertible): interop.Pointer;

declare function ifaddr_get_ia6_flags(ifaddr: interop.PointerConvertible, out_flags: interop.PointerConvertible): number;

declare function ifmaddr_reference(ifmaddr: interop.PointerConvertible): number;

declare function ifmaddr_release(ifmaddr: interop.PointerConvertible): number;

declare function ifmaddr_address(ifmaddr: interop.PointerConvertible, out_multicast: interop.PointerConvertible, addr_size: number): number;

declare function ifmaddr_lladdress(ifmaddr: interop.PointerConvertible, out_link_layer_multicast: interop.PointerConvertible, addr_size: number): number;

declare function ifmaddr_ifnet(ifmaddr: interop.PointerConvertible): interop.Pointer;

declare function ether_family_init(): number;

declare function ether_demux(interface: interop.PointerConvertible, packet: interop.PointerConvertible, header: string, protocol: interop.PointerConvertible): number;

declare function ether_add_proto(interface: interop.PointerConvertible, protocol: number, demux_list: interop.PointerConvertible, demux_count: number): number;

declare function ether_del_proto(interface: interop.PointerConvertible, protocol: number): number;

declare function ether_frameout(interface: interop.PointerConvertible, packet: interop.PointerConvertible, dest: interop.PointerConvertible, dest_lladdr: string, frame_type: string): number;

declare function ether_ioctl(interface: interop.PointerConvertible, command: number, data: interop.PointerConvertible): number;

declare function ether_check_multi(ifp: interop.PointerConvertible, multicast: interop.PointerConvertible): number;

declare function proto_input(protocol: number, packet: interop.PointerConvertible): number;

declare function proto_inject(protocol: number, packet: interop.PointerConvertible): number;

declare function proto_register_plumber(proto_fam: number, if_fam: number, plumb: (p1: interop.PointerConvertible, p2: number) => number, unplumb: (p1: interop.PointerConvertible, p2: number) => void): number;

declare function proto_unregister_plumber(proto_fam: number, if_fam: number): void;

declare function iflt_attach(interface: interop.PointerConvertible, filter: interop.PointerConvertible, filter_ref: interop.PointerConvertible): number;

declare function iflt_detach(filter_ref: interop.PointerConvertible): void;

declare function net_init_add(init_func: () => void): number;

declare function nfsclnt(request: number, argstructp: interop.PointerConvertible): number;

declare function xb_init(p1: interop.PointerConvertible, p2: interop.Enum<typeof xdrbuf_type>): void;

declare function xb_init_buffer(p1: interop.PointerConvertible, p2: string, p3: number): void;

declare function xb_cleanup(p1: interop.PointerConvertible): void;

declare function xb_malloc(p1: number): interop.Pointer;

declare function xb_realloc(p1: interop.PointerConvertible, p2: number, p3: number): interop.Pointer;

declare function xb_free(p1: interop.PointerConvertible): void;

declare function xb_free_size(p1: interop.PointerConvertible, p2: number): void;

declare function xb_grow(p1: interop.PointerConvertible): number;

declare function xb_set_cur_buf_len(p1: interop.PointerConvertible): void;

declare function xb_buffer_base(p1: interop.PointerConvertible): string;

declare function xb_advance(p1: interop.PointerConvertible, p2: number): number;

declare function xb_offset(p1: interop.PointerConvertible): number;

declare function xb_seek(p1: interop.PointerConvertible, p2: number): number;

declare function xb_add_bytes(p1: interop.PointerConvertible, p2: string, p3: number, p4: number): number;

declare function xb_get_bytes(p1: interop.PointerConvertible, p2: string, p3: number, p4: number): number;

declare function rdmsr_carefully(msr: number, lo: interop.PointerConvertible, hi: interop.PointerConvertible): number;

declare function cpuid_cputype(): number;

declare function cpuid_cpusubtype(): number;

declare function cpuid_cpu_display(p1: string): void;

declare function cpuid_feature_display(p1: string): void;

declare function cpuid_extfeature_display(p1: string): void;

declare function cpuid_get_feature_names(p1: number, p2: string, p3: number): string;

declare function cpuid_get_extfeature_names(p1: number, p2: string, p3: number): string;

declare function cpuid_get_leaf7_feature_names(p1: number, p2: string, p3: number): string;

declare function cpuid_get_leaf7_extfeature_names(p1: number, p2: string, p3: number): string;

declare function cpuid_features(): number;

declare function cpuid_extfeatures(): number;

declare function cpuid_leaf7_features(): number;

declare function cpuid_leaf7_extfeatures(): number;

declare function cpuid_family(): number;

declare function cpuid_cpufamily(): number;

declare function cpuid_info(): interop.Pointer;

declare function cpuid_set_info(): void;

declare function cpuid_vmm_present(): number;

declare function cpuid_vmm_family(): number;

declare function cpuid_vmm_get_kvm_features(): number;

declare function cpuid_vmm_get_applepv_features(): number;

declare function ml_get_interrupts_enabled(): number;

declare function ml_set_interrupts_enabled(enable: number): number;

declare function ml_early_set_interrupts_enabled(enable: number): number;

declare function ml_at_interrupt_context(): number;

declare function bzero_phys(phys_address: number, length: number): void;

declare function ml_stack_remaining(): number;

declare function host_vmxon(exclusive: number): number;

declare function host_vmxoff(): void;

declare function sptm_retype(paddr: number, current_type: interop.Enum<typeof sptm_frame_type_t>, new_type: interop.Enum<typeof sptm_frame_type_t>, retype_params: sptm_retype_params_t): void;

declare function libsptm_init(statep: interop.PointerConvertible): interop.Enum<typeof libsptm_error_t>;

declare function sptm_kvtophys(vaddr: number, paddrp: interop.PointerConvertible): interop.Enum<typeof libsptm_error_t>;

declare function sptm_phystokv(paddr: number, vaddrp: interop.PointerConvertible): interop.Enum<typeof libsptm_error_t>;

declare function sptm_get_vaddr_type(vaddr: number, frame_typep: interop.PointerConvertible): interop.Enum<typeof libsptm_error_t>;

declare function sptm_get_paddr_type(paddr: number, frame_typep: interop.PointerConvertible): interop.Enum<typeof libsptm_error_t>;

declare function sptm_paddr_is_last_mapping(paddr: number, refcnt_type: interop.Enum<typeof libsptm_refcnt_type_t>, is_lastp: interop.PointerConvertible): interop.Enum<typeof libsptm_error_t>;

declare function sptm_panic_source(panic_domain_id: interop.PointerConvertible): interop.Enum<typeof libsptm_error_t>;

declare function sptm_get_cpu_state(sptm_logical_cpu_id: number, state_type: interop.Enum<typeof libsptm_cpu_state_t>, state: interop.PointerConvertible): interop.Enum<typeof libsptm_error_t>;

declare function sptm_get_panicking_cpu_id(sptm_logical_cpu_id: interop.PointerConvertible): interop.Enum<typeof libsptm_error_t>;

declare function sptm_features_available(features: number, available: interop.PointerConvertible): interop.Enum<typeof libsptm_error_t>;

declare function _sptm_pre_entry_hook(): void;

declare function _sptm_post_exit_hook(): void;

declare function _sk_pre_entry_hook(): void;

declare function _sk_post_exit_hook(): void;

declare function sptm_lockdown(): void;

declare function sptm_lockdown_xnu(): void;

declare function sptm_init_xnu_fixups_complete(): void;

declare function sptm_disable_kernel_mode_cpa2(): void;

declare function sptm_xnu_panic_begin(): void;

declare function sptm_map_page(root_pt_paddr: number, vaddr: number, new_pte: number): number;

declare function sptm_map_table(root_pt_paddr: number, vaddr: number, target_level: number, new_tte: number): void;

declare function sptm_unmap_table(root_pt_paddr: number, vaddr: number, target_level: number): void;

declare function sptm_surt_alloc(surt_frame: number, surt_index: number, attr_idx: number, flags: number, asid: number): void;

declare function sptm_surt_free(surt_frame: number, surt_index: number): void;

declare function sptm_update_region(root_pt_paddr: number, start_vaddr: number, num_mappings: number, pte_templates_pa: number, options: number): number;

declare function sptm_update_disjoint(paddr: number, disjoint_ops_pa: number, num_mappings: number, options: number): number;

declare function sptm_update_disjoint_multipage(multipage_ops_pa: number, num_entries: number): number;

declare function sptm_unmap_region(root_pt_paddr: number, start_vaddr: number, num_mappings: number, options: number): void;

declare function sptm_unmap_disjoint(paddr: number, disjoint_ops_pa: number, num_mappings: number): void;

declare function sptm_configure_shared_region(shared_root_pt_paddr: number, start_vaddr: number, page_count: number): void;

declare function sptm_set_shared_region(user_root_pt_paddr: number, shared_root_pt_paddr: number): void;

declare function sptm_nest_region(user_root_pt_paddr: number, shared_root_pt_paddr: number, start_vaddr: number, page_count: number): void;

declare function sptm_unnest_region(user_root_pt_paddr: number, shared_root_pt_paddr: number, start_vaddr: number, page_count: number): void;

declare function sptm_configure_root(root_pt_paddr: number, flags: number, mask: number): void;

declare function sptm_switch_root(root_pt_paddr: number, override_flags: number, override_mask: number): number;

declare function sptm_guest_va_to_ipa(stage2_root_pt_paddr: number, gva: number): number;

declare function sptm_guest_stage1_tlb_op(stage2_root_pt_paddr: number, op: interop.Enum<typeof sptm_guest_stage1_tlb_op_t>, param: number): void;

declare function sptm_guest_stage2_tlb_op(stage2_root_pt_paddr: number, aligned_vaddr: number, num_mappings: number, last_level_only: boolean): void;

declare function sptm_guest_exit(stage2_root_pt_paddr: number): void;

declare function sptm_guest_dispatch(guest_state_paddr: number): void;

declare function sptm_register_xnu_exc_return(return_addr: number): void;

declare function sptm_register_cpu(physical_id: number): void;

declare function sptm_slide_region(target_papt_start: number, num_mappings: number): void;

declare function sptm_cpu_id(physical_id: number): number;

declare function sptm_iofilter_protected_write(paddr: number, value: number, width: number): void;

declare function txm_enter(endpoint_id: number, argsp: interop.PointerConvertible): number;

declare function txm_resume(thread_stack_paddr: number): void;

declare function sptm_resume_from_exception(): void;

declare function sk_resume(): void;

declare function sk_enter(endpoint_id: number, argsp: interop.PointerConvertible): number;

declare function sptm_check_inflight(paddr: number, is_inflightp: interop.PointerConvertible): interop.Enum<typeof libsptm_error_t>;

declare function sptm_get_table_mapping_count(table_paddr: number, mapping_countp: interop.PointerConvertible): interop.Enum<typeof libsptm_error_t>;

declare function sptm_prefetch_fte(paddr: number): interop.Enum<typeof libsptm_error_t>;

declare function sptm_trace_copy_traces(sptm_cpu_id: number, dst_buffer: interop.PointerConvertible, max_num_traces: number, read_index: interop.PointerConvertible, num_traces_copied: interop.PointerConvertible): interop.Enum<typeof libsptm_error_t>;

declare function sptm_trace_num_new_traces(sptm_cpu_id: number, prev_state: interop.PointerConvertible, num_new_traces: interop.PointerConvertible): interop.Enum<typeof libsptm_error_t>;

declare function sptm_copy_callee_saved_state(sptm_logical_cpu_id: number, regp: interop.PointerConvertible): interop.Enum<typeof libsptm_error_t>;

declare function sptm_get_info(info: interop.Enum<typeof sptm_info_t>, arg: number, output: interop.PointerConvertible): interop.Enum<typeof libsptm_error_t>;

declare function IOMalloc(size: number): interop.Pointer;

declare function IOMallocZero(size: number): interop.Pointer;

declare function IOFree(address: interop.PointerConvertible, size: number): void;

declare function IOMallocAligned(size: number, alignment: number): interop.Pointer;

declare function IOFreeAligned(address: interop.PointerConvertible, size: number): void;

declare function IOMallocContiguous(size: number, alignment: number, physicalAddress: interop.PointerConvertible): interop.Pointer;

declare function IOFreeContiguous(address: interop.PointerConvertible, size: number): void;

declare function IOMallocPageable(size: number, alignment: number): interop.Pointer;

declare function IOMallocPageableZero(size: number, alignment: number): interop.Pointer;

declare function IOFreePageable(address: interop.PointerConvertible, size: number): void;

declare function IOMallocData(size: number): interop.Pointer;

declare function IOMallocZeroData(size: number): interop.Pointer;

declare function IOMallocDataSharable(size: number): interop.Pointer;

declare function IOMallocZeroDataSharable(size: number): interop.Pointer;

declare function IOFreeData(address: interop.PointerConvertible, size: number): void;

declare function IOFreeDataSharable(address: interop.PointerConvertible, size: number): void;

declare function IOMappedRead8(address: number): number;

declare function IOMappedRead16(address: number): number;

declare function IOMappedRead32(address: number): number;

declare function IOMappedRead64(address: number): number;

declare function IOMappedWrite8(address: number, value: number): void;

declare function IOMappedWrite16(address: number, value: number): void;

declare function IOMappedWrite32(address: number, value: number): void;

declare function IOMappedWrite64(address: number, value: number): void;

declare function IOSetProcessorCacheMode(task: number, address: number, length: number, cacheMode: number): number;

declare function IOFlushProcessorCache(task: number, address: number, length: number): number;

declare function IOCreateThread(function$: (p1: interop.PointerConvertible) => void, argument: interop.PointerConvertible): number;

declare function IOExitThread(): void;

declare function IOSleep(milliseconds: number): void;

declare function IOSleepWithLeeway(intervalMilliseconds: number, leewayMilliseconds: number): void;

declare function IODelay(microseconds: number): void;

declare function IOPause(nanoseconds: number): void;

declare function IOLog(format: string): void;

declare function IOLogv(format: string, ap: string): void;

declare function IOFindNameForValue(value: number, namedValueArray: interop.PointerConvertible): string;

declare function IOFindValueForName(string: string, regValueArray: interop.PointerConvertible, value: interop.PointerConvertible): number;

declare function Debugger(reason: string): void;

declare function IOBSDNameMatching(name: string): interop.Pointer;

declare function IOOFPathMatching(path: string, buf: string, maxLen: number): interop.Pointer;

declare function IOSizeToAlignment(size: number): number;

declare function IOAlignmentToSize(align: number): number;

declare function IOGetTime(clock_time: interop.PointerConvertible): void;

declare function IOMapperIOVMAlloc(pages: number): number;

declare function IOMapperIOVMFree(addr: number, pages: number): void;

declare function IOMapperInsertPage(addr: number, offset: number, page: number): number;

declare function HIDOpenReportDescriptor(hidReportDescriptor: interop.PointerConvertible, descriptorLength: number, preparsedDataRef: interop.PointerConvertible, flags: number): number;

declare function HIDCloseReportDescriptor(preparsedDataRef: interop.PointerConvertible): number;

declare function HIDGetButtonCaps(reportType: number, buttonCaps: interop.PointerConvertible, buttonCapsSize: interop.PointerConvertible, preparsedDataRef: interop.PointerConvertible): number;

declare function HIDGetButtonCapabilities(reportType: number, buttonCaps: interop.PointerConvertible, buttonCapsSize: interop.PointerConvertible, preparsedDataRef: interop.PointerConvertible): number;

declare function HIDGetCaps(preparsedDataRef: interop.PointerConvertible, capabilities: interop.PointerConvertible): number;

declare function HIDGetCapabilities(preparsedDataRef: interop.PointerConvertible, capabilities: interop.PointerConvertible): number;

declare function HIDGetCollectionNodes(collectionNodes: interop.PointerConvertible, collectionNodesSize: interop.PointerConvertible, preparsedDataRef: interop.PointerConvertible): number;

declare function HIDGetScaledUsageValue(reportType: number, usagePage: number, collection: number, usage: number, usageValue: interop.PointerConvertible, preparsedDataRef: interop.PointerConvertible, report: interop.PointerConvertible, reportLength: number): number;

declare function HIDGetSpecificButtonCaps(reportType: number, usagePage: number, collection: number, usage: number, buttonCaps: interop.PointerConvertible, buttonCapsSize: interop.PointerConvertible, preparsedDataRef: interop.PointerConvertible): number;

declare function HIDGetSpecificButtonCapabilities(reportType: number, usagePage: number, collection: number, usage: number, buttonCaps: interop.PointerConvertible, buttonCapsSize: interop.PointerConvertible, preparsedDataRef: interop.PointerConvertible): number;

declare function HIDGetSpecificValueCaps(reportType: number, usagePage: number, collection: number, usage: number, valueCaps: interop.PointerConvertible, valueCapsSize: interop.PointerConvertible, preparsedDataRef: interop.PointerConvertible): number;

declare function HIDGetSpecificValueCapabilities(reportType: number, usagePage: number, collection: number, usage: number, valueCaps: interop.PointerConvertible, valueCapsSize: interop.PointerConvertible, preparsedDataRef: interop.PointerConvertible): number;

declare function HIDGetButtonsOnPage(reportType: number, usagePage: number, collection: number, usageList: interop.PointerConvertible, usageListSize: interop.PointerConvertible, preparsedDataRef: interop.PointerConvertible, report: interop.PointerConvertible, reportLength: number): number;

declare function HIDGetButtons(reportType: number, collection: number, usageList: interop.PointerConvertible, usageListSize: interop.PointerConvertible, preparsedDataRef: interop.PointerConvertible, report: interop.PointerConvertible, reportLength: number): number;

declare function HIDGetNextButtonInfo(reportType: number, usagePage: number, usage: number, collection: interop.PointerConvertible, reportID: interop.PointerConvertible, preparsedDataRef: interop.PointerConvertible): number;

declare function HIDGetNextUsageValueInfo(reportType: number, usagePage: number, usage: number, collection: interop.PointerConvertible, reportID: interop.PointerConvertible, preparsedDataRef: interop.PointerConvertible): number;

declare function HIDGetReportLength(reportType: number, reportID: number, reportLength: interop.PointerConvertible, preparsedDataRef: interop.PointerConvertible): number;

declare function HIDGetUsageValue(reportType: number, usagePage: number, collection: number, usage: number, usageValue: interop.PointerConvertible, preparsedDataRef: interop.PointerConvertible, report: interop.PointerConvertible, reportLength: number): number;

declare function HIDGetUsageValueArray(reportType: number, usagePage: number, collection: number, usage: number, usageValueBuffer: interop.PointerConvertible, usageValueBufferSize: number, preparsedDataRef: interop.PointerConvertible, report: interop.PointerConvertible, reportLength: number): number;

declare function HIDGetValueCaps(reportType: number, valueCaps: interop.PointerConvertible, valueCapsSize: interop.PointerConvertible, preparsedDataRef: interop.PointerConvertible): number;

declare function HIDGetValueCapabilities(reportType: number, valueCaps: interop.PointerConvertible, valueCapsSize: interop.PointerConvertible, preparsedDataRef: interop.PointerConvertible): number;

declare function HIDInitReport(reportType: number, reportID: number, preparsedDataRef: interop.PointerConvertible, report: interop.PointerConvertible, reportLength: number): number;

declare function HIDMaxUsageListLength(reportType: number, usagePage: number, preparsedDataRef: interop.PointerConvertible): number;

declare function HIDSetScaledUsageValue(reportType: number, usagePage: number, collection: number, usage: number, usageValue: number, preparsedDataRef: interop.PointerConvertible, report: interop.PointerConvertible, reportLength: number): number;

declare function HIDSetButtons(reportType: number, usagePage: number, collection: number, usageList: interop.PointerConvertible, usageListSize: interop.PointerConvertible, preparsedDataRef: interop.PointerConvertible, report: interop.PointerConvertible, reportLength: number): number;

declare function HIDSetUsageValue(reportType: number, usagePage: number, collection: number, usage: number, usageValue: number, preparsedDataRef: interop.PointerConvertible, report: interop.PointerConvertible, reportLength: number): number;

declare function HIDSetUsageValueArray(reportType: number, usagePage: number, collection: number, usage: number, usageValueBuffer: interop.PointerConvertible, usageValueBufferLength: number, preparsedDataRef: interop.PointerConvertible, report: interop.PointerConvertible, reportLength: number): number;

declare function HIDUsageListDifference(previousUsageList: interop.PointerConvertible, currentUsageList: interop.PointerConvertible, breakUsageList: interop.PointerConvertible, makeUsageList: interop.PointerConvertible, usageListsSize: number): number;

declare function HIDSetButton(reportType: number, usagePage: number, collection: number, usage: number, preparsedDataRef: interop.PointerConvertible, report: interop.PointerConvertible, reportLength: number): number;

declare function registerSleepWakeInterest(p1: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: number) => number, p2: interop.PointerConvertible, p3: interop.PointerConvertible): interop.Pointer;

declare function registerPrioritySleepWakeInterest(handler: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: number) => number, self: interop.PointerConvertible, ref: interop.PointerConvertible): interop.Pointer;

declare function acknowledgeSleepWakeNotification(p1: interop.PointerConvertible): number;

declare function vetoSleepWakeNotification(PMrefcon: interop.PointerConvertible): number;

declare function PEGetMachineName(name: string, maxLength: number): number;

declare function PEGetModelName(name: string, maxLength: number): number;

declare function PEGetTargetName(name: string, maxLength: number): number;

declare function PEGetProductName(name: string, maxLength: number): number;

declare function PEGetPlatformEpoch(): number;

declare function PEHaltRestart(type: number): number;

declare function PESavePanicInfo(buffer: interop.PointerConvertible, length: number): number;

declare function PESavePanicInfoAction(buffer: interop.PointerConvertible, offset: number, length: number): void;

declare function PEGetGMTTimeOfDay(): number;

declare function PESetGMTTimeOfDay(secs: number): void;

declare function PEGetUTCTimeOfDay(secs: interop.PointerConvertible, usecs: interop.PointerConvertible): void;

declare function PESetUTCTimeOfDay(secs: number, usecs: number): void;

declare function PEWriteNVRAMBooleanProperty(symbol: string, value: number): number;

declare function PEWriteNVRAMProperty(symbol: string, value: interop.PointerConvertible, len: number): number;

declare function PEWriteNVRAMPropertyWithCopy(symbol: string, value: interop.PointerConvertible, len: number): number;

declare function PEReadNVRAMProperty(symbol: string, value: interop.PointerConvertible, len: interop.PointerConvertible): number;

declare function PEReadNVRAMBooleanProperty(symbol: string, value: interop.PointerConvertible): number;

declare function PERemoveNVRAMProperty(symbol: string): number;

declare function PESyncNVRAM(): number;

declare function PEGetCoprocessorVersion(): interop.Enum<typeof coprocessor_type_t>;

declare function IODeviceTreeAlloc(dtTop: interop.PointerConvertible): interop.Pointer;

declare function IODTMatchNubWithKeys(nub: interop.PointerConvertible, keys: string): boolean;

declare function IODTCompareNubName(regEntry: interop.PointerConvertible, name: interop.PointerConvertible, matchingName: interop.PointerConvertible): boolean;

declare function IODTCompareNubName(regEntry: interop.PointerConvertible, name: interop.PointerConvertible, p3: number): boolean;

declare function IODTFindMatchingEntries(from: interop.PointerConvertible, options: number, keys: string): interop.Pointer;

declare function IODTSetResolving(regEntry: interop.PointerConvertible, compareFunc: (p1: number, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number, locationFunc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void): void;

declare function IODTGetCellCounts(regEntry: interop.PointerConvertible, sizeCount: interop.PointerConvertible, addressCount: interop.PointerConvertible): void;

declare function IODTResolveAddressCell(regEntry: interop.PointerConvertible, cellsIn: interop.Pointer, phys: interop.PointerConvertible, len: interop.PointerConvertible): boolean;

declare function IODTResolveAddressing(regEntry: interop.PointerConvertible, addressPropertyName: string, parent: interop.PointerConvertible): interop.Pointer;

declare function IODTMakeNVDescriptor(regEntry: interop.PointerConvertible, hdr: interop.PointerConvertible): number;

declare function IODTFindSlotName(regEntry: interop.PointerConvertible, deviceNumber: number): interop.Pointer;

declare function IODTInterruptControllerName(regEntry: interop.PointerConvertible): interop.Pointer;

declare function IODTMapInterrupts(regEntry: interop.PointerConvertible): boolean;

declare function IODTGetInterruptOptions(regEntry: interop.PointerConvertible, source: number, options: interop.PointerConvertible): number;

declare function IONDRVLibrariesInitialize(provider: interop.PointerConvertible): number;

declare function IOCircularDataQueueCreateWithEntries(options: interop.Enum<typeof IOCircularDataQueueCreateOptions>, numEntries: number, entrySize: number, pQueue: interop.PointerConvertible): number;

declare function IOCircularDataQueueCopyMemoryDescriptor(queue: interop.PointerConvertible): interop.Pointer;

declare function IOCircularDataQueueDestroy(pQueue: interop.PointerConvertible): number;

declare function IOCircularDataQueueEnqueue(queue: interop.PointerConvertible, data: interop.PointerConvertible, dataSize: number): number;

declare function IOCircularDataQueueGetLatest(queue: interop.PointerConvertible, data: interop.PointerConvertible, size: interop.PointerConvertible): number;

declare function IOCircularDataQueueCopyLatest(queue: interop.PointerConvertible, data: interop.PointerConvertible, size: interop.PointerConvertible): number;

declare function IOCircularDataQueueGetNext(queue: interop.PointerConvertible, data: interop.PointerConvertible, size: interop.PointerConvertible): number;

declare function IOCircularDataQueueCopyNext(queue: interop.PointerConvertible, data: interop.PointerConvertible, size: interop.PointerConvertible): number;

declare function IOCircularDataQueueGetPrevious(queue: interop.PointerConvertible, data: interop.PointerConvertible, size: interop.PointerConvertible): number;

declare function IOCircularDataQueueCopyPrevious(queue: interop.PointerConvertible, data: interop.PointerConvertible, size: interop.PointerConvertible): number;

declare function IOCircularDataQueueIsCurrentDataValid(queue: interop.PointerConvertible): number;

declare function IOCircularDataQueueSetCursorLatest(queue: interop.PointerConvertible): number;

declare function IOCircularDataQueueGetCurrent(queue: interop.PointerConvertible, data: interop.PointerConvertible, size: interop.PointerConvertible): number;

declare function IOCircularDataQueueCopyCurrent(queue: interop.PointerConvertible, data: interop.PointerConvertible, size: interop.PointerConvertible): number;

declare function IOCircularDataQueueGetLatestWithBlock(queue: interop.PointerConvertible, handler: (p1: interop.PointerConvertible, p2: number) => void): number;

declare function IOCircularDataQueueGetNextWithBlock(queue: interop.PointerConvertible, handler: (p1: interop.PointerConvertible, p2: number) => void): number;

declare function IOCircularDataQueueGetPreviousWithBlock(queue: interop.PointerConvertible, handler: (p1: interop.PointerConvertible, p2: number) => void): number;

declare function FWComputeCRC16(pQuads: interop.PointerConvertible, numQuads: number): number;

declare function FWUpdateCRC16(crc16: number, quad: number): number;

declare function AddFWCycleTimeToFWCycleTime(cycleTime1: number, cycleTime2: number): number;

declare function SubtractFWCycleTimeFromFWCycleTime(cycleTime1: number, cycleTime2: number): number;

declare function IOFWGetAbsoluteTime(result: interop.PointerConvertible): void;

declare function mbuf_data_len(mbuf: interop.PointerConvertible, out_buf: interop.PointerConvertible, out_len: interop.PointerConvertible): number;

declare function mbuf_data(mbuf: interop.PointerConvertible): interop.Pointer;

declare function mbuf_datastart(mbuf: interop.PointerConvertible): interop.Pointer;

declare function mbuf_setdata(mbuf: interop.PointerConvertible, data: interop.PointerConvertible, len: number): number;

declare function mbuf_align_32(mbuf: interop.PointerConvertible, len: number): number;

declare function mbuf_data_to_physical(ptr: interop.PointerConvertible): number;

declare function mbuf_get(how: number, type: number, mbuf: interop.PointerConvertible): number;

declare function mbuf_gethdr(how: number, type: number, mbuf: interop.PointerConvertible): number;

declare function mbuf_attachcluster(how: number, type: number, mbuf: interop.PointerConvertible, extbuf: string, extfree: (p1: string, p2: number, p3: string) => void, extsize: number, extarg: string): number;

declare function mbuf_alloccluster(how: number, size: interop.PointerConvertible, addr: interop.PointerConvertible): number;

declare function mbuf_freecluster(addr: string, size: number): void;

declare function mbuf_getcluster(how: number, type: number, size: number, mbuf: interop.PointerConvertible): number;

declare function mbuf_mclget(how: number, type: number, mbuf: interop.PointerConvertible): number;

declare function mbuf_allocpacket(how: number, packetlen: number, maxchunks: interop.PointerConvertible, mbuf: interop.PointerConvertible): number;

declare function mbuf_allocpacket_list(numpkts: number, how: number, packetlen: number, maxchunks: interop.PointerConvertible, mbuf: interop.PointerConvertible): number;

declare function mbuf_getpacket(how: number, mbuf: interop.PointerConvertible): number;

declare function mbuf_free(mbuf: interop.PointerConvertible): interop.Pointer;

declare function mbuf_freem(mbuf: interop.PointerConvertible): void;

declare function mbuf_freem_list(mbuf: interop.PointerConvertible): number;

declare function mbuf_leadingspace(mbuf: interop.PointerConvertible): number;

declare function mbuf_trailingspace(mbuf: interop.PointerConvertible): number;

declare function mbuf_copym(src: interop.PointerConvertible, offset: number, len: number, how: number, new_mbuf: interop.PointerConvertible): number;

declare function mbuf_dup(src: interop.PointerConvertible, how: number, new_mbuf: interop.PointerConvertible): number;

declare function mbuf_prepend(mbuf: interop.PointerConvertible, len: number, how: number): number;

declare function mbuf_split(src: interop.PointerConvertible, offset: number, how: number, new_mbuf: interop.PointerConvertible): number;

declare function mbuf_pullup(mbuf: interop.PointerConvertible, len: number): number;

declare function mbuf_pulldown(src: interop.PointerConvertible, offset: interop.PointerConvertible, length: number, location: interop.PointerConvertible): number;

declare function mbuf_adj(mbuf: interop.PointerConvertible, len: number): void;

declare function mbuf_adjustlen(mbuf: interop.PointerConvertible, amount: number): number;

declare function mbuf_concatenate(dst: interop.PointerConvertible, src: interop.PointerConvertible): interop.Pointer;

declare function mbuf_copydata(mbuf: interop.PointerConvertible, offset: number, length: number, out_data: interop.PointerConvertible): number;

declare function mbuf_copyback(mbuf: interop.PointerConvertible, offset: number, length: number, data: interop.PointerConvertible, how: number): number;

declare function mbuf_mclhasreference(mbuf: interop.PointerConvertible): number;

declare function mbuf_next(mbuf: interop.PointerConvertible): interop.Pointer;

declare function mbuf_setnext(mbuf: interop.PointerConvertible, next: interop.PointerConvertible): number;

declare function mbuf_nextpkt(mbuf: interop.PointerConvertible): interop.Pointer;

declare function mbuf_setnextpkt(mbuf: interop.PointerConvertible, nextpkt: interop.PointerConvertible): void;

declare function mbuf_len(mbuf: interop.PointerConvertible): number;

declare function mbuf_setlen(mbuf: interop.PointerConvertible, len: number): void;

declare function mbuf_maxlen(mbuf: interop.PointerConvertible): number;

declare function mbuf_type(mbuf: interop.PointerConvertible): number;

declare function mbuf_settype(mbuf: interop.PointerConvertible, new_type: number): number;

declare function mbuf_flags(mbuf: interop.PointerConvertible): number;

declare function mbuf_setflags(mbuf: interop.PointerConvertible, flags: number): number;

declare function mbuf_setflags_mask(mbuf: interop.PointerConvertible, flags: number, mask: number): number;

declare function mbuf_copy_pkthdr(dest: interop.PointerConvertible, src: interop.PointerConvertible): number;

declare function mbuf_pkthdr_len(mbuf: interop.PointerConvertible): number;

declare function mbuf_pkthdr_setlen(mbuf: interop.PointerConvertible, len: number): void;

declare function mbuf_pkthdr_adjustlen(mbuf: interop.PointerConvertible, amount: number): void;

declare function mbuf_pkthdr_rcvif(mbuf: interop.PointerConvertible): interop.Pointer;

declare function mbuf_pkthdr_setrcvif(mbuf: interop.PointerConvertible, ifp: interop.PointerConvertible): number;

declare function mbuf_pkthdr_header(mbuf: interop.PointerConvertible): interop.Pointer;

declare function mbuf_pkthdr_setheader(mbuf: interop.PointerConvertible, header: interop.PointerConvertible): void;

declare function mbuf_inbound_modified(mbuf: interop.PointerConvertible): void;

declare function mbuf_outbound_finalize(mbuf: interop.PointerConvertible, protocol_family: number, protocol_offset: number): void;

declare function mbuf_set_vlan_tag(mbuf: interop.PointerConvertible, vlan: number): number;

declare function mbuf_get_vlan_tag(mbuf: interop.PointerConvertible, vlan: interop.PointerConvertible): number;

declare function mbuf_clear_vlan_tag(mbuf: interop.PointerConvertible): number;

declare function mbuf_get_csum_requested(mbuf: interop.PointerConvertible, request: interop.PointerConvertible, value: interop.PointerConvertible): number;

declare function mbuf_get_tso_requested(mbuf: interop.PointerConvertible, request: interop.PointerConvertible, mss: interop.PointerConvertible): number;

declare function mbuf_clear_csum_requested(mbuf: interop.PointerConvertible): number;

declare function mbuf_set_csum_performed(mbuf: interop.PointerConvertible, flags: number, value: number): number;

declare function mbuf_get_mlen(): number;

declare function mbuf_get_mhlen(): number;

declare function mbuf_get_minclsize(): number;

declare function mbuf_clear_csum_performed(mbuf: interop.PointerConvertible): number;

declare function mbuf_inet_cksum(mbuf: interop.PointerConvertible, protocol: number, offset: number, length: number, csum: interop.PointerConvertible): number;

declare function mbuf_inet6_cksum(mbuf: interop.PointerConvertible, protocol: number, offset: number, length: number, csum: interop.PointerConvertible): number;

declare function mbuf_tag_id_find(module_string: string, module_id: interop.PointerConvertible): number;

declare function mbuf_tag_allocate(mbuf: interop.PointerConvertible, module_id: number, type: number, length: number, how: number, data_p: interop.PointerConvertible): number;

declare function mbuf_tag_find(mbuf: interop.PointerConvertible, module_id: number, type: number, length: interop.PointerConvertible, data_p: interop.PointerConvertible): number;

declare function mbuf_tag_free(mbuf: interop.PointerConvertible, module_id: number, type: number): void;

declare function mbuf_stats(stats: interop.PointerConvertible): void;

declare function mbuf_get_traffic_class(mbuf: interop.PointerConvertible): interop.Enum<typeof mbuf_traffic_class_t>;

declare function mbuf_set_traffic_class(mbuf: interop.PointerConvertible, tc: interop.Enum<typeof mbuf_traffic_class_t>): number;

declare function mbuf_is_traffic_class_privileged(mbuf: interop.PointerConvertible): number;

declare function _IONDRVLibrariesInitialize(provider: interop.PointerConvertible): number;

declare function _IONDRVLibrariesFinalize(provider: interop.PointerConvertible): number;

declare function RegistryEntryIDCopy(entryID: interop.PointerConvertible, to: interop.PointerConvertible): number;

declare function RegistryEntryIDInit(entryID: interop.PointerConvertible): number;

declare function RegistryEntryIDCompare(id1: interop.PointerConvertible, id2: interop.PointerConvertible): number;

declare function RegistryPropertyGetSize(entryID: interop.PointerConvertible, propertyName: string, propertySize: interop.PointerConvertible): number;

declare function RegistryPropertyGet(entryID: interop.PointerConvertible, propertyName: string, propertyValue: interop.PointerConvertible, propertySize: interop.PointerConvertible): number;

declare function RegistryPropertyCreate(entryID: interop.PointerConvertible, propertyName: string, propertyValue: interop.PointerConvertible, propertySize: number): number;

declare function RegistryPropertyDelete(entryID: interop.PointerConvertible, propertyName: string): number;

declare function RegistryPropertySet(entryID: interop.PointerConvertible, propertyName: string, propertyValue: interop.PointerConvertible, propertySize: number): number;

declare function RegistryPropertyGetMod(entry: interop.PointerConvertible, name: string, modifiers: interop.PointerConvertible): number;

declare function RegistryPropertySetMod(entry: interop.PointerConvertible, name: string, modifiers: number): number;

declare function RegistryPropertyIterateCreate(entry: interop.PointerConvertible, cookie: interop.PointerConvertible): number;

declare function RegistryPropertyIterateDispose(cookie: interop.PointerConvertible): number;

declare function RegistryPropertyIterate(cookie: interop.PointerConvertible, foundProperty: string, done: interop.PointerConvertible): number;

declare function RegistryEntryIterateCreate(cookie: interop.PointerConvertible): number;

declare function RegistryEntryIterateDispose(cookie: interop.PointerConvertible): number;

declare function RegistryEntryIterate(cookie: interop.PointerConvertible, relationship: number, foundEntry: interop.PointerConvertible, done: interop.PointerConvertible): number;

declare function RegistryCStrEntryToName(entryID: interop.PointerConvertible, parentEntry: interop.PointerConvertible, nameComponent: string, done: interop.PointerConvertible): number;

declare function RegistryCStrEntryLookup(parentEntry: interop.PointerConvertible, path: string, newEntry: interop.PointerConvertible): number;

declare function RegistryEntryIDDispose(entryID: interop.PointerConvertible): number;

declare function VSLNewInterruptService(serviceDevice: interop.PointerConvertible, serviceType: number, serviceID: interop.PointerConvertible): number;

declare function VSLDisposeInterruptService(serviceID: interop.PointerConvertible): number;

declare function VSLDoInterruptService(serviceID: interop.PointerConvertible): number;

declare function VSLPrepareCursorForHardwareCursor(cursorRef: interop.PointerConvertible, hardwareDescriptor: interop.PointerConvertible, hwCursorInfo: interop.PointerConvertible): number;

declare function agdcGTraceToken(fb: interop.PointerConvertible, line: number, useController: boolean, fnID: number, fnType: number, tag1: number, arg1: number, tag2: number, arg2: number, tag3: number, arg3: number): void;

declare function IOUSBHostCIMessageStatusToIOReturn(status: interop.Enum<typeof IOUSBHostCIMessageStatus>): number;

declare function IOUSBHostCIMessageStatusFromIOReturn(status: number): interop.Enum<typeof IOUSBHostCIMessageStatus>;

declare function IOUSBHostCILinkStateEnabled(linkState: interop.Enum<typeof IOUSBHostCILinkState>): boolean;

declare function IOUSBHostCIMessageTypeToString(type: interop.Enum<typeof IOUSBHostCIMessageType>): string;

declare function IOUSBHostCIMessageStatusToString(status: interop.Enum<typeof IOUSBHostCIMessageStatus>): string;

declare function IOUSBHostCILinkStateToString(linkState: interop.Enum<typeof IOUSBHostCILinkState>): string;

declare function IOUSBHostCIDeviceSpeedToString(speed: interop.Enum<typeof IOUSBHostCIDeviceSpeed>): string;

declare function IOUSBHostCIExceptionTypeToString(exceptionType: interop.Enum<typeof IOUSBHostCIExceptionType>): string;

declare function IOUSBHostCIControllerStateToString(controllerState: interop.Enum<typeof IOUSBHostCIControllerState>): string;

declare function IOUSBHostCIPortStateToString(portState: interop.Enum<typeof IOUSBHostCIPortState>): string;

declare function IOUSBHostCIDeviceStateToString(deviceState: interop.Enum<typeof IOUSBHostCIDeviceState>): string;

declare function IOUSBHostCIEndpointStateToString(endpointState: interop.Enum<typeof IOUSBHostCIEndpointState>): string;

declare function UInt64mult(A: number, B: number): number;

declare function IOAF_Int8ToFloat32(src: interop.PointerConvertible, dest: interop.PointerConvertible, count: number): void;

declare function IOAF_NativeInt16ToFloat32(src: interop.PointerConvertible, dest: interop.PointerConvertible, count: number): void;

declare function IOAF_SwapInt16ToFloat32(src: interop.PointerConvertible, dest: interop.PointerConvertible, count: number): void;

declare function IOAF_NativeInt24ToFloat32(src: interop.PointerConvertible, dest: interop.PointerConvertible, count: number): void;

declare function IOAF_SwapInt24ToFloat32(src: interop.PointerConvertible, dest: interop.PointerConvertible, count: number): void;

declare function IOAF_NativeInt32ToFloat32(src: interop.PointerConvertible, dest: interop.PointerConvertible, count: number): void;

declare function IOAF_SwapInt32ToFloat32(src: interop.PointerConvertible, dest: interop.PointerConvertible, count: number): void;

declare function IOAF_Float32ToInt8(src: interop.PointerConvertible, dest: interop.PointerConvertible, count: number): void;

declare function IOAF_Float32ToNativeInt16(src: interop.PointerConvertible, dest: interop.PointerConvertible, count: number): void;

declare function IOAF_Float32ToSwapInt16(src: interop.PointerConvertible, dest: interop.PointerConvertible, count: number): void;

declare function IOAF_Float32ToNativeInt24(src: interop.PointerConvertible, dest: interop.PointerConvertible, count: number): void;

declare function IOAF_Float32ToSwapInt24(src: interop.PointerConvertible, dest: interop.PointerConvertible, count: number): void;

declare function IOAF_Float32ToNativeInt32(src: interop.PointerConvertible, dest: interop.PointerConvertible, count: number): void;

declare function IOAF_Float32ToSwapInt32(src: interop.PointerConvertible, dest: interop.PointerConvertible, count: number): void;

declare function IOAF_bcopy_WriteCombine(src: interop.PointerConvertible, dest: interop.PointerConvertible, count: number): void;

declare function _isQueueMemoryCorrupted(queue: interop.PointerConvertible): boolean;

declare function destroyQueueMem(queue: interop.PointerConvertible): number;

declare function _reset(queue: interop.PointerConvertible): number;

declare function _enqueueInternal(queue: interop.PointerConvertible, data: interop.PointerConvertible, dataSize: number, earlyExitForTesting: number): number;

declare function enqueueQueueMem(queue: interop.PointerConvertible, data: interop.PointerConvertible, dataSize: number): number;

declare function isDataEntryValidInQueueMem(queue: interop.PointerConvertible): number;

declare function setCursorLatestInQueueMem(queue: interop.PointerConvertible): number;

declare function _getLatestInQueueMemInternal(queue: interop.PointerConvertible, data: interop.PointerConvertible, size: interop.PointerConvertible, copyMem: boolean): number;

declare function getLatestInQueueMem(queue: interop.PointerConvertible, data: interop.PointerConvertible, size: interop.PointerConvertible): number;

declare function copyLatestInQueueMem(queue: interop.PointerConvertible, data: interop.PointerConvertible, size: interop.PointerConvertible): number;

declare function _getNextInQueueMemInternal(queue: interop.PointerConvertible, data: interop.PointerConvertible, size: interop.PointerConvertible, copyMem: boolean): number;

declare function getNextInQueueMem(queue: interop.PointerConvertible, data: interop.PointerConvertible, size: interop.PointerConvertible): number;

declare function copyNextInQueueMem(queue: interop.PointerConvertible, data: interop.PointerConvertible, size: interop.PointerConvertible): number;

declare function _getPrevInQueueMemInternal(queue: interop.PointerConvertible, data: interop.PointerConvertible, size: interop.PointerConvertible, copyMem: boolean): number;

declare function getPrevInQueueMem(queue: interop.PointerConvertible, data: interop.PointerConvertible, size: interop.PointerConvertible): number;

declare function copyPrevInQueueMem(queue: interop.PointerConvertible, data: interop.PointerConvertible, size: interop.PointerConvertible): number;

declare function _getCurrentInQueueMemInternal(queue: interop.PointerConvertible, data: interop.PointerConvertible, size: interop.PointerConvertible, copyMem: boolean): number;

declare function getCurrentInQueueMem(queue: interop.PointerConvertible, data: interop.PointerConvertible, size: interop.PointerConvertible): number;

declare function copyCurrentInQueueMem(queue: interop.PointerConvertible, data: interop.PointerConvertible, size: interop.PointerConvertible): number;

declare function _initCursor(queue: interop.PointerConvertible): void;

declare function IOCircularDataQueueCreateWithEntries(options: interop.Enum<typeof IOCircularDataQueueCreateOptions>, numEntries: number, entrySize: number, pQueue: interop.PointerConvertible): number;

declare function IOCircularDataQueueCopyMemoryDescriptor(queue: interop.PointerConvertible): interop.Pointer;

declare function IOCircularDataQueueDestroy(pQueue: interop.PointerConvertible): number;

declare function IOCircularDataQueueEnqueue(queue: interop.PointerConvertible, data: interop.PointerConvertible, dataSize: number): number;

declare function IOCircularDataQueueGetLatest(queue: interop.PointerConvertible, data: interop.PointerConvertible, size: interop.PointerConvertible): number;

declare function IOCircularDataQueueCopyLatest(queue: interop.PointerConvertible, data: interop.PointerConvertible, size: interop.PointerConvertible): number;

declare function IOCircularDataQueueGetNext(queue: interop.PointerConvertible, data: interop.PointerConvertible, size: interop.PointerConvertible): number;

declare function IOCircularDataQueueCopyNext(queue: interop.PointerConvertible, data: interop.PointerConvertible, size: interop.PointerConvertible): number;

declare function IOCircularDataQueueGetPrevious(queue: interop.PointerConvertible, data: interop.PointerConvertible, size: interop.PointerConvertible): number;

declare function IOCircularDataQueueCopyPrevious(queue: interop.PointerConvertible, data: interop.PointerConvertible, size: interop.PointerConvertible): number;

declare function IOCircularDataQueueIsCurrentDataValid(queue: interop.PointerConvertible): number;

declare function IOCircularDataQueueSetCursorLatest(queue: interop.PointerConvertible): number;

declare function IOCircularDataQueueGetCurrent(queue: interop.PointerConvertible, data: interop.PointerConvertible, size: interop.PointerConvertible): number;

declare function IOCircularDataQueueCopyCurrent(queue: interop.PointerConvertible, data: interop.PointerConvertible, size: interop.PointerConvertible): number;

declare function vDSP_conv(vDSP_signal: interop.Pointer, vDSP_signalStride: number, vDSP_filter: interop.Pointer, vDSP_strideFilter: number, vDSP_result: interop.Pointer, vDSP_strideResult: number, vDSP_lenResult: number, vDSP_lenFilter: number, temp: string): void;

declare function vDSP_deq22(vDSP_input1: interop.Pointer, vDSP_stride1: number, vDSP_input2: interop.Pointer, vDSP_result: interop.Pointer, vDSP_strideResult: number, vDSP_size: number): void;

declare function vDSP_maxmgv(vDSP_input1: interop.Pointer, vDSP_stride1: number, vDSP_result: interop.Pointer, vDSP_size: number): void;

declare function vDSP_rmsqv(vDSP_input1: interop.Pointer, vDSP_stride1: number, vDSP_result: interop.Pointer, vDSP_size: number): void;

declare function vDSP_svesq(vDSP_input1: interop.Pointer, vDSP_stride1: number, vDSP_result: interop.Pointer, vDSP_size: number): void;

declare function vDSP_svs(vDSP_input1: interop.Pointer, vDSP_stride1: number, vDSP_result: interop.Pointer, vDSP_size: number): void;

declare function vDSP_vabs(vDSP_input1: interop.Pointer, vDSP_stride1: number, vDSP_result: interop.Pointer, vDSP_strideResult: number, vDSP_size: number): void;

declare function vDSP_vadd(vDSP_input1: interop.Pointer, vDSP_stride1: number, vDSP_input2: interop.Pointer, vDSP_stride2: number, vDSP_result: interop.Pointer, vDSP_strideResult: number, vDSP_size: number): void;

declare function vDSP_vdiv(vDSP_input1: interop.Pointer, vDSP_stride1: number, vDSP_input2: interop.Pointer, vDSP_stride2: number, vDSP_result: interop.Pointer, vDSP_strideResult: number, vDSP_size: number): void;

declare function vDSP_vfix32(vDSP_input1: interop.PointerConvertible, vDSP_stride1: number, vDSP_input2: interop.PointerConvertible, vDSP_stride2: number, vDSP_size: number): void;

declare function vDSP_vfix16(vDSP_input1: interop.PointerConvertible, vDSP_stride1: number, vDSP_input2: interop.PointerConvertible, vDSP_stride2: number, vDSP_size: number): void;

declare function vDSP_vflt32(vDSP_input1: interop.PointerConvertible, vDSP_stride1: number, vDSP_input2: interop.PointerConvertible, vDSP_stride2: number, vDSP_size: number): void;

declare function vDSP_vflt16(vDSP_input1: interop.PointerConvertible, vDSP_stride1: number, vDSP_input2: interop.PointerConvertible, vDSP_stride2: number, vDSP_size: number): void;

declare function vDSP_vsmfix24(vDSP_input1: interop.Pointer, vDSP_stride1: number, vDSP_input2: interop.Pointer, vDSP_input3: interop.PointerConvertible, vDSP_stride2: number, vDSP_size: number): void;

declare function vDSP_vsmfixu24(vDSP_input1: interop.Pointer, vDSP_stride1: number, vDSP_input2: interop.Pointer, vDSP_input3: interop.PointerConvertible, vDSP_stride2: number, vDSP_size: number): void;

declare function vDSP_vflt24(vDSP_input1: interop.PointerConvertible, vDSP_stride1: number, vDSP_input2: interop.PointerConvertible, vDSP_stride2: number, vDSP_size: number): void;

declare function vDSP_vfltu24(vDSP_input1: interop.PointerConvertible, vDSP_stride1: number, vDSP_input2: interop.PointerConvertible, vDSP_stride2: number, vDSP_size: number): void;

declare function vDSP_vma(vDSP_input1: interop.Pointer, vDSP_stride1: number, vDSP_input2: interop.Pointer, vDSP_stride2: number, vDSP_input3: interop.Pointer, vDSP_stride3: number, vDSP_result: interop.Pointer, vDSP_strideResult: number, vDSP_size: number): void;

declare function vDSP_vmul(vDSP_input1: interop.Pointer, vDSP_stride1: number, vDSP_input2: interop.Pointer, vDSP_stride2: number, vDSP_result: interop.Pointer, vDSP_strideResult: number, vDSP_size: number): void;

declare function vDSP_vsmul(vDSP_input1: interop.Pointer, vDSP_stride1: number, vDSP_input2: interop.Pointer, vDSP_result: interop.Pointer, vDSP_strideResult: number, vDSP_size: number): void;

declare function vDSP_vsub(vDSP_input1: interop.Pointer, vDSP_stride1: number, vDSP_input2: interop.Pointer, vDSP_stride2: number, vDSP_result: interop.Pointer, vDSP_strideResult: number, vDSP_size: number): void;

declare function vDSP_biquad2_CreateSetup(p1: interop.PointerConvertible, p2: number, p3: number): interop.Pointer;

declare function vDSP_biquad2_DestroySetup(p1: interop.PointerConvertible): void;

declare function vDSP_biquad2(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number): void;

declare function vDSP_biquad2_ResetState(p1: interop.PointerConvertible): void;

declare function vDSP_biquad2_CopyState(p1: interop.PointerConvertible, p2: interop.PointerConvertible): void;

declare function vS64FullMulOdd(vA: unknown /* vector */, vB: unknown /* vector */): unknown /* vector */;

declare function vU64FullMulOdd(vA: unknown /* vector */, vB: unknown /* vector */): unknown /* vector */;

declare function vU128Sub(vA: unknown /* vector */, vB: unknown /* vector */): unknown /* vector */;

declare function vU128SubS(vA: unknown /* vector */, vB: unknown /* vector */): unknown /* vector */;

declare function vS128Sub(vA: unknown /* vector */, vB: unknown /* vector */): unknown /* vector */;

declare function vS128SubS(vA: unknown /* vector */, vB: unknown /* vector */): unknown /* vector */;

declare function vU128Add(vA: unknown /* vector */, vB: unknown /* vector */): unknown /* vector */;

declare function vU128AddS(vA: unknown /* vector */, vB: unknown /* vector */): unknown /* vector */;

declare function vS128Add(vA: unknown /* vector */, vB: unknown /* vector */): unknown /* vector */;

declare function vS128AddS(vA: unknown /* vector */, vB: unknown /* vector */): unknown /* vector */;

declare function vLL128Shift(vA: unknown /* vector */, vShiftFactor: unknown /* vector */): unknown /* vector */;

declare function vLR128Shift(vA: unknown /* vector */, vShiftFactor: unknown /* vector */): unknown /* vector */;

declare function vA128Shift(vA: unknown /* vector */, vShiftFactor: unknown /* vector */): unknown /* vector */;

declare function expf(p1: number): number;

declare function logf(p1: number): number;

declare function log10f(p1: number): number;

declare function sqrtf(p1: number): number;

declare function sinf(p1: number): number;

declare function cosf(p1: number): number;

declare function __sinpif(p1: number): number;

declare function __cospif(p1: number): number;

declare function vvexpf(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): void;

declare function inet_arp_lookup(interface: interop.PointerConvertible, ip_dest: interop.PointerConvertible, ll_dest: interop.PointerConvertible, ll_dest_len: number, hint: interop.PointerConvertible, packet: interop.PointerConvertible): number;

declare function inet_arp_handle_input(ifp: interop.PointerConvertible, arpop: number, sender_hw: interop.PointerConvertible, sender_ip: interop.PointerConvertible, target_ip: interop.PointerConvertible): number;

declare function inet_arp_init_ifaddr(interface: interop.PointerConvertible, ipaddr: interop.PointerConvertible): void;

declare function ipf_addv4(filter: interop.PointerConvertible, filter_ref: interop.PointerConvertible): number;

declare function ipf_addv6(filter: interop.PointerConvertible, filter_ref: interop.PointerConvertible): number;

declare function ipf_remove(filter_ref: interop.PointerConvertible): number;

declare function ipf_inject_input(data: interop.PointerConvertible, filter_ref: interop.PointerConvertible): number;

declare function ipf_inject_output(data: interop.PointerConvertible, filter_ref: interop.PointerConvertible, options: interop.PointerConvertible): number;

declare function kdp_register_send_receive(send: (p1: interop.PointerConvertible, p2: number) => void, receive: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => void): void;

declare function kdp_unregister_send_receive(send: (p1: interop.PointerConvertible, p2: number) => void, receive: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => void): void;

declare function kdp_register_callout(fn: (p1: interop.PointerConvertible, p2: interop.Enum<typeof kdp_event_t>) => void, arg: interop.PointerConvertible): void;

declare function lz4_encode_2gb(dst_ptr: interop.PointerConvertible, dst_size: number, src_ptr: interop.PointerConvertible, src_begin: interop.PointerConvertible, src_size: number, hash_table: unknown /* const array */, skip_final_literals: number): void;

declare function lz4_decode(dst_ptr: interop.PointerConvertible, dst_begin: interop.PointerConvertible, dst_end: interop.PointerConvertible, src_ptr: interop.PointerConvertible, src_end: interop.PointerConvertible): number;

declare function lz4_decode_asm(dst_ptr: interop.PointerConvertible, dst_begin: interop.PointerConvertible, dst_end: interop.PointerConvertible, src_ptr: interop.PointerConvertible, src_end: interop.PointerConvertible): number;

declare function lz4raw_encode_buffer(dst_buffer: interop.PointerConvertible, dst_size: number, src_buffer: interop.PointerConvertible, src_size: number, hash_table: unknown /* const array */): number;

declare function lz4raw_decode_buffer(dst_buffer: interop.PointerConvertible, dst_size: number, src_buffer: interop.PointerConvertible, src_size: number, work: interop.PointerConvertible): number;

declare function WKdm_decompress_4k(src_buf: interop.PointerConvertible, dest_buf: interop.PointerConvertible, scratch: interop.PointerConvertible, bytes: number): void;

declare function WKdm_compress_4k(src_buf: interop.PointerConvertible, dest_buf: interop.PointerConvertible, scratch: interop.PointerConvertible, limit: number): number;

declare function WKdm_decompress_16k(src_buf: interop.PointerConvertible, dest_buf: interop.PointerConvertible, scratch: interop.PointerConvertible, bytes: number): void;

declare function WKdm_compress_16k(src_buf: interop.PointerConvertible, dest_buf: interop.PointerConvertible, scratch: interop.PointerConvertible, limit: number): number;

declare function nosys(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function exit(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): void;

declare function fork(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function read(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function write(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function open(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_close(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function wait4(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function link(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function unlink(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_chdir(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_fchdir(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function mknod(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function chmod(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function chown(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function getfsstat(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function getpid(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function setuid(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function getuid(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function geteuid(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function ptrace(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function access(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function chflags(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function fchflags(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sync(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function kill(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_crossarch_trap(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function getppid(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_dup(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function pipe(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function getegid(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sigaction(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function getgid(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sigprocmask(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function getlogin(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function setlogin(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function acct(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sigpending(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sigaltstack(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function ioctl(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function reboot(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function revoke(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function symlink(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function readlink(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function execve(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function umask(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function chroot(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function msync(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function oslog_coproc_reg(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function oslog_coproc(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function munmap(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function mprotect(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function madvise(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function mincore(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function getgroups(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function setgroups(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function getpgrp(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function setpgid(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function setitimer(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function swapon(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function getitimer(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_getdtablesize(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_dup2(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_fcntl(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function select(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function fsync(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function setpriority(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function getpriority(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sigsuspend(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function gettimeofday(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function getrusage(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function readv(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function writev(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function settimeofday(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function fchown(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function fchmod(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function setreuid(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function setregid(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function rename(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_flock(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function mkfifo(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function mkdir(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function rmdir(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function utimes(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function futimes(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function adjtime(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function gethostuuid(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function setsid(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function getpgid(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function setprivexec(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function pread(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function pwrite(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function statfs(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function fstatfs(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function unmount(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function funmount(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function quotactl(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function mount(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function csops(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function csops_audittoken(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function waitid(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function kdebug_typefilter(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function kdebug_trace_string(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function kdebug_trace64(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function kdebug_trace(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function setgid(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function setegid(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function seteuid(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sigreturn(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_panic_with_data(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function thread_selfcounts(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function fdatasync(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function stat(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_fstat(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function lstat(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function pathconf(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_fpathconf(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function getrlimit(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function setrlimit(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function getdirentries(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function mmap(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function lseek(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function truncate(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function ftruncate(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sysctl(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function mlock(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function munlock(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function undelete(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function open_dprotected_np(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function fsgetpath_ext(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function openat_dprotected_np(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function getattrlist(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function setattrlist(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function getdirentriesattr(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function exchangedata(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function searchfs(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function delete(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function copyfile(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function fgetattrlist(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function fsetattrlist(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function poll(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function getxattr(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function fgetxattr(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function setxattr(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function fsetxattr(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function removexattr(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function fremovexattr(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function listxattr(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function flistxattr(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function fsctl(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function initgroups(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function posix_spawn(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function ffsctl(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function minherit(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function shm_open(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function shm_unlink(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sem_open(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sem_close(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sem_unlink(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sem_wait(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sem_trywait(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sem_post(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_sysctlbyname(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function open_extended(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function umask_extended(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function stat_extended(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function lstat_extended(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_fstat_extended(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function chmod_extended(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function fchmod_extended(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function access_extended(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_settid(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function gettid(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function setsgroups(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function getsgroups(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function setwgroups(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function getwgroups(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function mkfifo_extended(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function mkdir_extended(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function shared_region_check_np(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function vm_pressure_monitor(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function getsid(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_settid_with_pid(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function aio_fsync(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function aio_return(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function aio_suspend(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function aio_cancel(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function aio_error(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function aio_read(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function aio_write(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function lio_listio(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function iopolicysys(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function process_policy(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function mlockall(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function munlockall(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function issetugid(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function __pthread_kill(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function __pthread_sigmask(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function __sigwait(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function __disable_threadsignal(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function __pthread_markcancel(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function __pthread_canceled(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function __semwait_signal(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function proc_info(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function stat64(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_fstat64(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function lstat64(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function stat64_extended(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function lstat64_extended(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_fstat64_extended(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function getdirentries64(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function statfs64(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function fstatfs64(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function getfsstat64(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function __pthread_chdir(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function __pthread_fchdir(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function audit(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function auditon(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function getauid(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function setauid(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function getaudit_addr(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function setaudit_addr(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function auditctl(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function bsdthread_create(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function bsdthread_terminate(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function kqueue(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function kevent(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function lchown(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function bsdthread_register(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function workq_open(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function workq_kernreturn(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function kevent64(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function thread_selfid(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function ledger(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function kevent_qos(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function kevent_id(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function __mac_execve(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function pselect(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function pselect_nocancel(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function read_nocancel(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function write_nocancel(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function open_nocancel(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_close_nocancel(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function wait4_nocancel(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function msync_nocancel(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_fcntl_nocancel(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function select_nocancel(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function fsync_nocancel(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sigsuspend_nocancel(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function readv_nocancel(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function writev_nocancel(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function pread_nocancel(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function pwrite_nocancel(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function waitid_nocancel(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function poll_nocancel(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sem_wait_nocancel(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function aio_suspend_nocancel(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function __sigwait_nocancel(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function __semwait_signal_nocancel(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function __mac_mount(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function __mac_getfsstat(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function fsgetpath(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function audit_session_self(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function audit_session_join(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_fileport_makeport(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_fileport_makefd(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function audit_session_port(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function pid_suspend(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function pid_resume(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function kas_info(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function guarded_open_np(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function guarded_close_np(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function guarded_kqueue_np(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function change_fdguard_np(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function usrctl(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function proc_rlimit_control(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function telemetry(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function system_override(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function vfs_purge(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sfi_ctl(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sfi_pidctl(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function getattrlistbulk(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function clonefileat(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function openat(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function openat_nocancel(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function renameat(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function faccessat(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function fchmodat(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function fchownat(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function fstatat(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function fstatat64(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function linkat(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function unlinkat(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function readlinkat(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function symlinkat(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function mkdirat(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function getattrlistat(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function proc_trace_log(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function bsdthread_ctl(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function openbyid_np(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function thread_selfusage(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function guarded_open_dprotected_np(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function guarded_write_np(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function guarded_pwrite_np(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function guarded_writev_np(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function renameatx_np(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function stack_snapshot_with_config(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function mach_eventlink_signal(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function mach_eventlink_wait_until(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function mach_eventlink_signal_wait_until(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function work_interval_ctl(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function getentropy(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_ulock_wait(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_ulock_wake(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function fclonefileat(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function fs_snapshot(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function terminate_with_payload(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function abort_with_payload(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function setattrlistat(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function net_qos_guideline(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function fmount(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function ntp_adjtime(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function ntp_gettime(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function os_fault_with_payload(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function kqueue_workloop_ctl(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function __mach_bridge_remote_time(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function log_data(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function memorystatus_available_memory(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function objc_bp_assist_cfg_np(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function shared_region_map_and_slide_2_np(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function pivot_root(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function task_inspect_for_pid(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function task_read_for_pid(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_preadv(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_pwritev(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_preadv_nocancel(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_pwritev_nocancel(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_ulock_wait2(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function proc_info_extended_id(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function debug_syscall_reject(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_debug_syscall_reject_config(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function graftdmg(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function map_with_linking_np(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function freadlink(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function sys_record_system_event(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function mkfifoat(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function mknodat(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function ungraftdmg(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function MD5Init(p1: interop.PointerConvertible): void;

declare function MD5Update(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number): void;

declare function MD5Final(p1: unknown /* const array */, p2: interop.PointerConvertible): void;

declare function kdebug_using_continuous_time(): boolean;

declare function kdebug_timestamp_from_absolute(abstime: number): number;

declare function kdebug_timestamp_from_continuous(conttime: number): number;

declare function kdebug_timestamp(): number;

declare function kdebug_debugid_enabled(debugid: number): boolean;

declare function kdebug_debugid_explicitly_enabled(debugid: number): boolean;

declare function kdebug_commpage_state(): number;

declare function kdebug_register_coproc(name: string, flags: interop.Enum<typeof kdebug_coproc_flags_t>, callback: (p1: interop.PointerConvertible, p2: interop.Enum<typeof kd_callback_type>, p3: interop.PointerConvertible) => void, context: interop.PointerConvertible): number;

declare function kernel_debug_enter(coreid: number, debugid: number, timestamp: number, arg1: number, arg2: number, arg3: number, arg4: number, threadid: number): void;

declare function kernel_debug_register_callback(callback: kd_callback): number;

declare function kernel_debug(debugid: number, arg1: number, arg2: number, arg3: number, arg4: number, arg5: number): void;

declare function kernel_debug1(debugid: number, arg1: number, arg2: number, arg3: number, arg4: number, arg5: number): void;

declare function kernel_debug_flags(debugid: number, arg1: number, arg2: number, arg3: number, arg4: number, flags: interop.Enum<typeof kdebug_emit_flags_t>): void;

declare function kernel_debug_filtered(debugid: number, arg1: number, arg2: number, arg3: number, arg4: number): void;

declare function sock_accept(so: interop.PointerConvertible, from: interop.PointerConvertible, fromlen: number, flags: number, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => void, cookie: interop.PointerConvertible, new_so: interop.PointerConvertible): number;

declare function sock_bind(so: interop.PointerConvertible, to: interop.PointerConvertible): number;

declare function sock_connect(so: interop.PointerConvertible, to: interop.PointerConvertible, flags: number): number;

declare function sock_getpeername(so: interop.PointerConvertible, peername: interop.PointerConvertible, peernamelen: number): number;

declare function sock_getsockname(so: interop.PointerConvertible, sockname: interop.PointerConvertible, socknamelen: number): number;

declare function sock_getsockopt(so: interop.PointerConvertible, level: number, optname: number, optval: interop.PointerConvertible, optlen: interop.PointerConvertible): number;

declare function sock_ioctl(so: interop.PointerConvertible, request: number, argp: interop.PointerConvertible): number;

declare function sock_setsockopt(so: interop.PointerConvertible, level: number, optname: number, optval: interop.PointerConvertible, optlen: number): number;

declare function sock_listen(so: interop.PointerConvertible, backlog: number): number;

declare function sock_receive(so: interop.PointerConvertible, msg: interop.PointerConvertible, flags: number, recvdlen: interop.PointerConvertible): number;

declare function sock_receivembuf(so: interop.PointerConvertible, msg: interop.PointerConvertible, data: interop.PointerConvertible, flags: number, recvlen: interop.PointerConvertible): number;

declare function sock_send(so: interop.PointerConvertible, msg: interop.PointerConvertible, flags: number, sentlen: interop.PointerConvertible): number;

declare function sock_sendmbuf(so: interop.PointerConvertible, msg: interop.PointerConvertible, data: interop.PointerConvertible, flags: number, sentlen: interop.PointerConvertible): number;

declare function sock_shutdown(so: interop.PointerConvertible, how: number): number;

declare function sock_socket(domain: number, type: number, protocol: number, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => void, cookie: interop.PointerConvertible, new_so: interop.PointerConvertible): number;

declare function sock_close(so: interop.PointerConvertible): void;

declare function sock_retain(so: interop.PointerConvertible): void;

declare function sock_release(so: interop.PointerConvertible): void;

declare function sock_setpriv(so: interop.PointerConvertible, on: number): number;

declare function sock_isconnected(so: interop.PointerConvertible): number;

declare function sock_isnonblocking(so: interop.PointerConvertible): number;

declare function sock_gettype(so: interop.PointerConvertible, domain: interop.PointerConvertible, type: interop.PointerConvertible, protocol: interop.PointerConvertible): number;

declare function sflt_register(filter: interop.PointerConvertible, domain: number, type: number, protocol: number): number;

declare function sflt_unregister(handle: number): number;

declare function sflt_attach(socket: interop.PointerConvertible, handle: number): number;

declare function sflt_detach(socket: interop.PointerConvertible, handle: number): number;

declare function sock_inject_data_in(so: interop.PointerConvertible, from: interop.PointerConvertible, data: interop.PointerConvertible, control: interop.PointerConvertible, flags: number): number;

declare function sock_inject_data_out(so: interop.PointerConvertible, to: interop.PointerConvertible, data: interop.PointerConvertible, control: interop.PointerConvertible, flags: number): number;

declare function sockopt_direction(sopt: interop.PointerConvertible): number;

declare function sockopt_level(sopt: interop.PointerConvertible): number;

declare function sockopt_name(sopt: interop.PointerConvertible): number;

declare function sockopt_valsize(sopt: interop.PointerConvertible): number;

declare function sockopt_copyin(sopt: interop.PointerConvertible, data: interop.PointerConvertible, length: number): number;

declare function sockopt_copyout(sopt: interop.PointerConvertible, data: interop.PointerConvertible, length: number): number;

declare function ubc_blktooff(p1: interop.PointerConvertible, p2: number): number;

declare function ubc_offtoblk(p1: interop.PointerConvertible, p2: number): number;

declare function ubc_getsize(p1: interop.PointerConvertible): number;

declare function ubc_setsize(p1: interop.PointerConvertible, p2: number): number;

declare function ubc_getcred(p1: interop.PointerConvertible): interop.Pointer;

declare function ubc_setthreadcred(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function ubc_msync(p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: number): number;

declare function ubc_pages_resident(p1: interop.PointerConvertible): number;

declare function ubc_page_op(p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible): number;

declare function ubc_range_op(p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: interop.PointerConvertible): number;

declare function cluster_update_state(p1: interop.PointerConvertible, p2: number, p3: number, p4: number): void;

declare function advisory_read(p1: interop.PointerConvertible, p2: number, p3: number, p4: number): number;

declare function advisory_read_ext(p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number, p6: interop.PointerConvertible, p7: number): number;

declare function cluster_read(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number): number;

declare function cluster_read_ext(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number, p6: interop.PointerConvertible): number;

declare function cluster_write(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: number, p6: number, p7: number): number;

declare function cluster_write_ext(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: number, p6: number, p7: number, p8: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number, p9: interop.PointerConvertible): number;

declare function cluster_pageout(p1: interop.PointerConvertible, p2: number, upl_offset_t: number, p4: number, p5: number, p6: number, p7: number): number;

declare function cluster_pageout_ext(p1: interop.PointerConvertible, p2: number, upl_offset_t: number, p4: number, p5: number, p6: number, p7: number, p8: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number, p9: interop.PointerConvertible): number;

declare function cluster_pagein(p1: interop.PointerConvertible, p2: number, upl_offset_t: number, p4: number, p5: number, p6: number, p7: number): number;

declare function cluster_pagein_ext(p1: interop.PointerConvertible, p2: number, upl_offset_t: number, p4: number, p5: number, p6: number, p7: number, p8: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number, p9: interop.PointerConvertible): number;

declare function cluster_push(p1: interop.PointerConvertible, p2: number): number;

declare function cluster_push_ext(p1: interop.PointerConvertible, p2: number, p3: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number, p4: interop.PointerConvertible): number;

declare function cluster_push_err(p1: interop.PointerConvertible, p2: number, p3: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number, p4: interop.PointerConvertible, p5: interop.PointerConvertible): number;

declare function cluster_bp(p1: interop.PointerConvertible): number;

declare function cluster_bp_ext(p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number, p3: interop.PointerConvertible): number;

declare function cluster_zero(p1: number, upl_offset_t: number, p3: number, p4: interop.PointerConvertible): void;

declare function cluster_copy_upl_data(p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible): number;

declare function cluster_copy_ubc_data(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number): number;

declare function cluster_lock_direct_read(vp: interop.PointerConvertible, exclusive: number): interop.Pointer;

declare function cluster_unlock_direct_read(lck: interop.PointerConvertible): void;

declare function ubc_create_upl(p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: number): number;

declare function ubc_upl_map(p1: number, p2: interop.PointerConvertible): number;

declare function ubc_upl_unmap(p1: number): number;

declare function ubc_upl_map_range(p1: number, p2: number, p3: number, p4: number, p5: interop.PointerConvertible): number;

declare function ubc_upl_unmap_range(p1: number, p2: number, p3: number): number;

declare function ubc_upl_commit(p1: number): number;

declare function ubc_upl_commit_range(p1: number, upl_offset_t: number, upl_size_t: number, p4: number): number;

declare function ubc_upl_abort(p1: number, p2: number): number;

declare function ubc_upl_abort_range(p1: number, upl_offset_t: number, upl_size_t: number, p4: number): number;

declare function ubc_upl_range_needed(p1: number, p2: number, p3: number): void;

declare function ubc_upl_pageinfo(p1: number): interop.Pointer;

declare function ubc_upl_maxbufsize(): number;

declare function is_file_clean(p1: interop.PointerConvertible, p2: number): number;

declare function mach_to_bsd_errno(mach_err: number): number;

declare function read_random(buffer: interop.PointerConvertible, numBytes: number): void;

declare function read_frandom(buffer: interop.PointerConvertible, numBytes: number): void;

declare function write_random(buffer: interop.PointerConvertible, numBytes: number): number;

declare function lockd_request(server: number, vers: number, flags: number, xid: number, flk_start: number, flk_len: number, flk_pid: number, flk_type: number, flk_whence: number, sock_address: unknown /* const array */, cred: unknown /* const array */, fh_len: number, fh: unknown /* const array */): number;

declare function lockd_ping(server: number): number;

declare function lockd_shutdown(server: number): number;

declare function static_if_boot_arg_uint64(args: string, name: string, defval: number): number;

declare function __static_if_key_delta(key: interop.PointerConvertible, delta: number): void;

declare function __hib_assert(file: string, line: number, expression: string): void;

declare function pal_hib_map(virt: number, phys: number): number;

declare function pal_hib_restore_pal_state(src: interop.PointerConvertible): void;

declare function pal_hib_init(): void;

declare function pal_hib_write_hook(): void;

declare function pal_hib_resume_init(palHibCtx: interop.PointerConvertible, map: interop.PointerConvertible, nextFree: interop.PointerConvertible): void;

declare function pal_hib_restored_page(palHibCtx: interop.PointerConvertible, stage: interop.Enum<typeof pal_hib_restore_stage_t>, ppnum: number): void;

declare function pal_hib_patchup(palHibCtx: interop.PointerConvertible): void;

declare function pal_hib_teardown_pmap_structs(unneeded_start: interop.PointerConvertible, unneeded_end: interop.PointerConvertible): void;

declare function pal_hib_rebuild_pmap_structs(): void;

declare function pal_hib_decompress_page(src: interop.PointerConvertible, dst: interop.PointerConvertible, scratch: interop.PointerConvertible, compressedSize: number): void;

declare function spec_ebadf(p1: interop.PointerConvertible): number;

declare function spec_lookup(p1: interop.PointerConvertible): number;

declare function spec_open(p1: interop.PointerConvertible): number;

declare function spec_close(p1: interop.PointerConvertible): number;

declare function spec_read(p1: interop.PointerConvertible): number;

declare function spec_write(p1: interop.PointerConvertible): number;

declare function spec_ioctl(p1: interop.PointerConvertible): number;

declare function spec_select(p1: interop.PointerConvertible): number;

declare function spec_fsync(p1: interop.PointerConvertible): number;

declare function spec_strategy(p1: interop.PointerConvertible): number;

declare function spec_pathconf(p1: interop.PointerConvertible): number;

declare function devfs_make_node_clone(dev: number, chrblk: number, uid: number, gid: number, perms: number, clone: (p1: number, p2: number) => number, fmt: string): interop.Pointer;

declare function devfs_make_node(dev: number, chrblk: number, uid: number, gid: number, perms: number, fmt: string): interop.Pointer;

declare function devfs_remove(handle: interop.PointerConvertible): void;

declare function fifo_ebadf(p1: interop.PointerConvertible): number;

declare function fifo_lookup(p1: interop.PointerConvertible): number;

declare function fifo_open(p1: interop.PointerConvertible): number;

declare function fifo_close(p1: interop.PointerConvertible): number;

declare function fifo_read(p1: interop.PointerConvertible): number;

declare function fifo_write(p1: interop.PointerConvertible): number;

declare function fifo_ioctl(p1: interop.PointerConvertible): number;

declare function fifo_select(p1: interop.PointerConvertible): number;

declare function fifo_inactive(p1: interop.PointerConvertible): number;

declare function fifo_pathconf(p1: interop.PointerConvertible): number;

declare function fifo_advlock(p1: interop.PointerConvertible): number;

declare function hfs_relconverter(encoding: number): number;

declare function hfs_getconverter(encoding: number, get_unicode: interop.PointerConvertible, get_hfsname: interop.PointerConvertible): number;

declare function hfs_addconverter(kmod_id: number, encoding: number, get_unicode: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number, get_hfsname: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number): number;

declare function hfs_remconverter(kmod_id: number, encoding: number): number;

declare function hfs_pickencoding(src: interop.PointerConvertible, len: number): number;

declare function hfs_getencodingbias(): number;

declare function hfs_setencodingbias(bias: number): void;

declare function mac_roman_to_utf8(hfs_str: unknown /* const array */, maxDstLen: number, actualDstLen: interop.PointerConvertible, dstStr: interop.PointerConvertible): number;

declare function utf8_to_mac_roman(srcLen: number, srcStr: interop.PointerConvertible, dstStr: unknown /* const array */): number;

declare function mac_roman_to_unicode(hfs_str: unknown /* const array */, uni_str: interop.PointerConvertible, maxCharLen: number, usedCharLen: interop.PointerConvertible): number;

declare function unicode_to_mac_roman(uni_str: interop.PointerConvertible, unicodeChars: number, hfs_str: unknown /* const array */): number;

declare function cninit(): void;

declare function __builtin___sprintf_chk(str: string): number;

declare function switch_to_serial_console(): number;

declare function switch_to_old_console(p1: number): void;

declare function console_is_serial(): number;

declare function serial_init(): number;

declare function serial_putc(p1: number): void;

declare function serial_getc(): number;

declare function console_write_unbuffered(p1: number): void;

declare function SecureDTInit(base: interop.PointerConvertible, size: number): void;

declare function SecureDTIsLockedDown(): boolean;

declare function SecureDTEntryIsEqual(ref1: interop.PointerConvertible, ref2: interop.PointerConvertible): number;

declare function SecureDTFindEntry(propName: string, propValue: string, entryH: interop.PointerConvertible): number;

declare function SecureDTFindNodeWithPropertyEqualToValue(propertyName: string, propertyValue: interop.PointerConvertible, propertyValueSize: number, devicetreeNode: interop.PointerConvertible): number;

declare function SecureDTFindNodeWithPhandle(phandle: number, devicetreeNode: interop.PointerConvertible): number;

declare function SecureDTFindNodeWithStringProperty(propertyName: string, propertyValue: string, devicetreeNode: interop.PointerConvertible): number;

declare function SecureDTLookupEntry(searchPoint: interop.PointerConvertible, pathName: string, foundEntry: interop.PointerConvertible): number;

declare function SecureDTInitEntryIterator(startEntry: interop.PointerConvertible, iter: interop.PointerConvertible): number;

declare function SecureDTEnterEntry(iterator: interop.PointerConvertible, childEntry: interop.PointerConvertible): number;

declare function SecureDTExitEntry(iterator: interop.PointerConvertible, currentPosition: interop.PointerConvertible): number;

declare function SecureDTIterateEntries(iterator: interop.PointerConvertible, nextEntry: interop.PointerConvertible): number;

declare function SecureDTRestartEntryIteration(iterator: interop.PointerConvertible): number;

declare function SecureDTGetProperty(entry: interop.PointerConvertible, propertyName: string, propertyValue: interop.PointerConvertible, propertySize: interop.PointerConvertible): number;

declare function SecureDTGetPropertyRegion(entry: interop.PointerConvertible, propertyName: string, propertyValue: interop.PointerConvertible, propertySize: interop.PointerConvertible, region_start: number, region_size: number): number;

declare function SecureDTInitPropertyIterator(entry: interop.PointerConvertible, iter: interop.PointerConvertible): number;

declare function SecureDTIterateProperties(iterator: interop.PointerConvertible, foundProperty: interop.PointerConvertible): number;

declare function SecureDTRestartPropertyIteration(iterator: interop.PointerConvertible): number;

declare function airship_strerror(code: interop.Enum<typeof airship_result>): string;

declare function airship_get_ipc_error_description(protocol: interop.PointerConvertible, error: number): string;

declare function airship_device_transport_create_with_iopcidevice(device: interop.PointerConvertible): interop.Pointer;

declare function airship_device_transport_destroy(transport: interop.PointerConvertible): void;

declare function airship_device_transport_suspend(transport: interop.PointerConvertible): void;

declare function airship_device_transport_resume(transport: interop.PointerConvertible): void;

declare function airship_driver_probe_device(transport: interop.PointerConvertible, vendor_id: number, device_id: number): interop.Pointer;

declare function airship_driver_create(protocol: interop.PointerConvertible): interop.Pointer;

declare function airship_driver_destroy(driver: interop.PointerConvertible): void;

declare function airship_driver_set_configuration(driver: interop.PointerConvertible, config: interop.PointerConvertible): void;

declare function airship_driver_set_queue(driver: interop.PointerConvertible, role: interop.PointerConvertible, queue: interop.PointerConvertible): void;

declare function airship_driver_set_exec_stage_change_handler(driver: interop.PointerConvertible, handler: () => void): void;

declare function airship_driver_set_power_state_change_handler(driver: interop.PointerConvertible, handler: () => void): void;

declare function airship_driver_set_ipc_error_handler(driver: interop.PointerConvertible, handler: () => void): void;

declare function airship_driver_activate(driver: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_driver_enter_reset(driver: interop.PointerConvertible): void;

declare function airship_driver_exit_reset(driver: interop.PointerConvertible): void;

declare function airship_driver_set_transport(driver: interop.PointerConvertible, transport: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_driver_clear_transport(driver: interop.PointerConvertible): void;

declare function airship_driver_get_exec_stage(driver: interop.PointerConvertible): number;

declare function airship_driver_probe_exec_stage(driver: interop.PointerConvertible): void;

declare function airship_driver_set_power_target(driver: interop.PointerConvertible, target: interop.Enum<typeof airship_driver_power_target>): void;

declare function airship_driver_get_power_state(driver: interop.PointerConvertible): interop.Enum<typeof airship_driver_power_state>;

declare function airship_driver_get_error_state(driver: interop.PointerConvertible): number;

declare function airship_monitor_set_queue(monitor: interop.PointerConvertible, queue: interop.PointerConvertible): void;

declare function airship_monitor_set_event_handler(monitor: interop.PointerConvertible, handler: () => void): void;

declare function airship_monitor_set_cancel_handler(monitor: interop.PointerConvertible, handler: () => void): void;

declare function airship_monitor_activate(monitor: interop.PointerConvertible): void;

declare function airship_monitor_suspend(monitor: interop.PointerConvertible): void;

declare function airship_monitor_resume(monitor: interop.PointerConvertible): void;

declare function airship_monitor_cancel(monitor: interop.PointerConvertible): void;

declare function airship_monitor_destroy(monitor: interop.PointerConvertible): void;

declare function airship_monitor_wait(monitor: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_monitor_timedwait(monitor: interop.PointerConvertible, timeout_msec: number): interop.Enum<typeof airship_result>;

declare function airship_monitor_wait_interruptible(monitor: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_monitor_timedwait_interruptible(monitor: interop.PointerConvertible, timeout_msec: number): interop.Enum<typeof airship_result>;

declare function airship_monitor_set_criterion(monitor: interop.PointerConvertible, comparator: interop.Enum<typeof airship_monitor_comparator>, comparand: number, mask: number): void;

declare function airship_client_create_direct(driver: interop.PointerConvertible, name: interop.PointerConvertible): interop.Pointer;

declare function airship_client_destroy(client: interop.PointerConvertible): void;

declare function airship_client_acquire_resource(client: interop.PointerConvertible, resource_name: interop.PointerConvertible, selector: number): interop.Enum<typeof airship_result>;

declare function airship_client_release_resource(client: interop.PointerConvertible, resource_name: interop.PointerConvertible, selector: number): void;

declare function airship_client_create_resource_monitor(client: interop.PointerConvertible, resource_name: interop.PointerConvertible, selector: number): interop.Pointer;

declare function airship_client_create_exec_stage_monitor(client: interop.PointerConvertible): interop.Pointer;

declare function airship_client_get_exec_stage(client: interop.PointerConvertible): number;

declare function airship_buffer_create(client: interop.PointerConvertible, size: number, dir: interop.Enum<typeof airship_buffer_direction>): interop.Pointer;

declare function airship_buffer_create_with_iomd(client: interop.PointerConvertible, iomd: interop.PointerConvertible, dir: interop.Enum<typeof airship_buffer_direction>): interop.Pointer;

declare function airship_buffer_destroy(buffer: interop.PointerConvertible): void;

declare function airship_buffer_get_size(buffer: interop.PointerConvertible): number;

declare function airship_buffer_get_addr(buffer: interop.PointerConvertible): interop.Pointer;

declare function airship_buffer_read(buffer: interop.PointerConvertible, dst: interop.PointerConvertible, offset: number, length: number): interop.Enum<typeof airship_result>;

declare function airship_buffer_write(buffer: interop.PointerConvertible, src: interop.PointerConvertible, offset: number, length: number): interop.Enum<typeof airship_result>;

declare function airship_buffer_map(buffer: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_interrupt_create(client: interop.PointerConvertible, name: interop.PointerConvertible, selector: number): interop.Pointer;

declare function airship_interrupt_destroy(interrupt: interop.PointerConvertible): void;

declare function airship_interrupt_set_queue(interrupt: interop.PointerConvertible, queue: interop.PointerConvertible): void;

declare function airship_interrupt_set_event_handler(interrupt: interop.PointerConvertible, handler: () => void): void;

declare function airship_interrupt_set_cancel_handler(interrupt: interop.PointerConvertible, handler: () => void): void;

declare function airship_interrupt_get_device_vector(interrupt: interop.PointerConvertible): number;

declare function airship_interrupt_activate(interrupt: interop.PointerConvertible): void;

declare function airship_interrupt_suspend(interrupt: interop.PointerConvertible): void;

declare function airship_interrupt_resume(interrupt: interop.PointerConvertible): void;

declare function airship_interrupt_cancel(interrupt: interop.PointerConvertible): void;

declare function airship_acipc_get_ipc_error_description(error: number): string;

declare function airship_acipc_get_health_status(client: interop.PointerConvertible, detail: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_acipc_boot_create(client: interop.PointerConvertible, name: interop.PointerConvertible): interop.Pointer;

declare function airship_acipc_boot_destroy(boot: interop.PointerConvertible): void;

declare function airship_acipc_boot_get_state(boot: interop.PointerConvertible, out_detail: interop.PointerConvertible): interop.Enum<typeof airship_acipc_boot_state>;

declare function airship_acipc_boot_create_state_monitor(boot: interop.PointerConvertible): interop.Pointer;

declare function airship_acipc_boot_read_register(boot: interop.PointerConvertible, register_name: interop.PointerConvertible, register_offset: number, register_length: number, dst: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_acipc_boot_write_register(boot: interop.PointerConvertible, register_name: interop.PointerConvertible, register_offset: number, register_length: number, src: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_acipc_boot_send_image(boot: interop.PointerConvertible, image: interop.PointerConvertible, image_offset: number, image_length: number): interop.Enum<typeof airship_result>;

declare function airship_acipc_boot_get_image_response(boot: interop.PointerConvertible, out_code: interop.PointerConvertible): interop.Enum<typeof airship_acipc_boot_image_response>;

declare function airship_acipc_boot_probe_image_response(boot: interop.PointerConvertible): void;

declare function airship_acipc_boot_reset(boot: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_acipc_tr_create(client: interop.PointerConvertible, name: interop.PointerConvertible, selector: number): interop.Pointer;

declare function airship_acipc_tr_destroy(tr: interop.PointerConvertible): void;

declare function airship_acipc_tr_get_size(tr: interop.PointerConvertible): number;

declare function airship_acipc_tr_set_size(tr: interop.PointerConvertible, count: number): void;

declare function airship_acipc_tr_get_backing_ring_size(tr: interop.PointerConvertible): number;

declare function airship_acipc_tr_set_backing_ring_size(tr: interop.PointerConvertible, count: number): void;

declare function airship_acipc_tr_get_transfer_footer_size(tr: interop.PointerConvertible): number;

declare function airship_acipc_tr_set_transfer_footer_size(tr: interop.PointerConvertible, length: number): void;

declare function airship_acipc_tr_get_completion_footer_size(tr: interop.PointerConvertible): number;

declare function airship_acipc_tr_set_completion_footer_size(tr: interop.PointerConvertible, length: number): void;

declare function airship_acipc_tr_get_nominal_transfer_size(tr: interop.PointerConvertible): number;

declare function airship_acipc_tr_get_completion_ring(tr: interop.PointerConvertible, out_selector: interop.PointerConvertible): interop.Pointer;

declare function airship_acipc_tr_set_completion_ring(tr: interop.PointerConvertible, name: interop.PointerConvertible, selector: number): void;

declare function airship_acipc_tr_get_completion_group(tr: interop.PointerConvertible, out_selector: interop.PointerConvertible): interop.Pointer;

declare function airship_acipc_tr_set_completion_group(tr: interop.PointerConvertible, name: interop.PointerConvertible, selector: number): void;

declare function airship_acipc_tr_get_out_of_order(tr: interop.PointerConvertible): boolean;

declare function airship_acipc_tr_get_in_place(tr: interop.PointerConvertible): boolean;

declare function airship_acipc_tr_set_open_clientdata(tr: interop.PointerConvertible, data: interop.PointerConvertible, length: number): void;

declare function airship_acipc_tr_get_trid(tr: interop.PointerConvertible): number;

declare function airship_acipc_tr_get_name(tr: interop.PointerConvertible): interop.Pointer;

declare function airship_acipc_tr_get_selector(tr: interop.PointerConvertible): number;

declare function airship_acipc_tr_set_doorbell_moderation(tr: interop.PointerConvertible, interval_usec: number, leeway_usec: number): void;

declare function airship_acipc_tr_set_mode(tr: interop.PointerConvertible, mode: interop.Enum<typeof airship_acipc_tr_mode_t>): void;

declare function airship_acipc_tr_set_interrupt(tr: interop.PointerConvertible, interrupt: interop.PointerConvertible, selector: number): void;

declare function airship_acipc_tr_activate(tr: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_acipc_tr_get_state(tr: interop.PointerConvertible, out_detail: interop.PointerConvertible): interop.Enum<typeof airship_acipc_ring_state>;

declare function airship_acipc_tr_create_state_monitor(tr: interop.PointerConvertible): interop.Pointer;

declare function airship_acipc_tr_open(tr: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_acipc_tr_close(tr: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_acipc_tr_sync(tr: interop.PointerConvertible, flags: number): void;

declare function airship_acipc_tr_create_sync_monitor(tr: interop.PointerConvertible): interop.Pointer;

declare function airship_acipc_tr_reset(tr: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_acipc_tr_synthesize_reset_completions(tr: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_acipc_tr_disconnect(tr: interop.PointerConvertible): void;

declare function airship_acipc_tr_enqueue_transfer(tr: interop.PointerConvertible, tag: number, flags: number, extbuf: interop.PointerConvertible, extbuf_offset: number, extbuf_length: number, header: interop.PointerConvertible, header_length: number, footer: interop.PointerConvertible, footer_length: number): interop.Enum<typeof airship_result>;

declare function airship_acipc_tr_get_free_space(tr: interop.PointerConvertible): number;

declare function airship_acipc_tr_create_free_space_monitor(tr: interop.PointerConvertible): interop.Pointer;

declare function airship_acipc_tr_get_first_free_tag(tr: interop.PointerConvertible): number;

declare function airship_acipc_tr_get_transfer_completion(tr: interop.PointerConvertible, tag: number, out_completion: interop.PointerConvertible, out_header: interop.PointerConvertible, header_size: number, out_footer: interop.PointerConvertible, footer_size: number): interop.Enum<typeof airship_result>;

declare function airship_acipc_tr_get_completed_transfer_count(tr: interop.PointerConvertible): number;

declare function airship_acipc_tr_get_first_completed_tag(tr: interop.PointerConvertible): number;

declare function airship_acipc_tr_consume_transfers(tr: interop.PointerConvertible, tag: number, count: number): interop.Enum<typeof airship_result>;

declare function airship_acipc_cr_create(client: interop.PointerConvertible, name: interop.PointerConvertible, selector: number): interop.Pointer;

declare function airship_acipc_cr_destroy(cr: interop.PointerConvertible): void;

declare function airship_acipc_cr_get_backing_ring_size(cr: interop.PointerConvertible): number;

declare function airship_acipc_cr_set_backing_ring_size(cr: interop.PointerConvertible, count: number): void;

declare function airship_acipc_cr_get_footer_size(cr: interop.PointerConvertible): number;

declare function airship_acipc_cr_set_footer_size(cr: interop.PointerConvertible, length: number): void;

declare function airship_acipc_cr_get_completion_group(cr: interop.PointerConvertible, out_selector: interop.PointerConvertible): interop.Pointer;

declare function airship_acipc_cr_set_completion_group(cr: interop.PointerConvertible, name: interop.PointerConvertible, selector: number): void;

declare function airship_acipc_cr_get_mirror_enabled(cr: interop.PointerConvertible): boolean;

declare function airship_acipc_cr_set_mirror_enabled(cr: interop.PointerConvertible, enable: boolean): void;

declare function airship_acipc_cr_set_open_clientdata(cr: interop.PointerConvertible, data: interop.PointerConvertible, length: number): void;

declare function airship_acipc_cr_get_crid(cr: interop.PointerConvertible): number;

declare function airship_acipc_cr_get_name(cr: interop.PointerConvertible): interop.Pointer;

declare function airship_acipc_cr_get_selector(cr: interop.PointerConvertible): number;

declare function airship_acipc_cr_set_doorbell_moderation(cr: interop.PointerConvertible, interval_usec: number, leeway_usec: number): void;

declare function airship_acipc_cr_set_interrupt(cr: interop.PointerConvertible, interrupt: interop.PointerConvertible, selector: number): void;

declare function airship_acipc_cr_activate(cr: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_acipc_cr_get_state(cr: interop.PointerConvertible, out_detail: interop.PointerConvertible): interop.Enum<typeof airship_acipc_ring_state>;

declare function airship_acipc_cr_create_state_monitor(cr: interop.PointerConvertible): interop.Pointer;

declare function airship_acipc_cr_open(cr: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_acipc_cr_close(cr: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_acipc_cr_reset(cr: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_acipc_cr_sync(cr: interop.PointerConvertible, flags: number): void;

declare function airship_acipc_cr_create_sync_monitor(cr: interop.PointerConvertible): interop.Pointer;

declare function airship_acipc_cr_get_mirror_element(cr: interop.PointerConvertible, index: number, out_element: interop.PointerConvertible, out_header: interop.PointerConvertible, header_size: number, out_footer: interop.PointerConvertible, footer_size: number): interop.Enum<typeof airship_result>;

declare function airship_acipc_cr_get_mirror_count(cr: interop.PointerConvertible): number;

declare function airship_acipc_cr_consume_mirror_elements(cr: interop.PointerConvertible, count: number): interop.Enum<typeof airship_result>;

declare function airship_acipc_memregion_create(client: interop.PointerConvertible, name: interop.PointerConvertible, selector: number): interop.Pointer;

declare function airship_acipc_memregion_destroy(region: interop.PointerConvertible): void;

declare function airship_acipc_memregion_set_backing_memory(region: interop.PointerConvertible, buffer: interop.PointerConvertible, offset: number, length: number): void;

declare function airship_acipc_memregion_set_map_clientdata(region: interop.PointerConvertible, data: interop.PointerConvertible, length: number): void;

declare function airship_acipc_memregion_activate(region: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_acipc_memregion_get_state(region: interop.PointerConvertible, out_detail: interop.PointerConvertible): interop.Enum<typeof airship_acipc_memregion_state>;

declare function airship_acipc_memregion_create_state_monitor(region: interop.PointerConvertible): interop.Pointer;

declare function airship_acipc_memregion_map(region: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_acipc_memregion_unmap(region: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_acipc_memregion_reset(region: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_acipc_doorbell_create(client: interop.PointerConvertible, name: interop.PointerConvertible, selector: number): interop.Pointer;

declare function airship_acipc_doorbell_destroy(doorbell: interop.PointerConvertible): void;

declare function airship_acipc_doorbell_get_bank(doorbell: interop.PointerConvertible): number;

declare function airship_acipc_doorbell_get_offset(doorbell: interop.PointerConvertible): number;

declare function airship_acipc_doorbell_get_width(doorbell: interop.PointerConvertible): number;

declare function airship_acipc_doorbell_activate(doorbell: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_acipc_doorbell_open(doorbell: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_acipc_doorbell_close(doorbell: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_acipc_doorbell_schedule_update(doorbell: interop.PointerConvertible, interval_us: number, leeway_us: number, value: number): interop.Enum<typeof airship_result>;

declare function airship_acipc_doorbell_write(doorbell: interop.PointerConvertible, value: number): interop.Enum<typeof airship_result>;

declare function airship_acipc_doorbell_schedule_update_shared(doorbell: interop.PointerConvertible, interval_us: number, leeway_us: number): interop.Enum<typeof airship_result>;

declare function airship_acipc_doorbell_write_shared(doorbell: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_daleipc_get_ipc_error_description(error: number): string;

declare function airship_daleipc_create_channel_controller(client: interop.PointerConvertible, channel_name: interop.PointerConvertible): interop.Pointer;

declare function airship_daleipc_channel_controller_destroy(channel_ctrl: interop.PointerConvertible): void;

declare function airship_daleipc_channel_controller_activate(channel_ctrl: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_daleipc_channel_controller_create_sync_monitor(channel_ctrl: interop.PointerConvertible): interop.Pointer;

declare function airship_daleipc_channel_controller_create_state_monitor(channel_ctrl: interop.PointerConvertible): interop.Pointer;

declare function airship_daleipc_channel_controller_get_mtu_size(channel_ctrl: interop.PointerConvertible): number;

declare function airship_daleipc_channel_controller_get_channel_size(channel_ctrl: interop.PointerConvertible): number;

declare function airship_daleipc_channel_controller_get_free_space(channel_ctrl: interop.PointerConvertible): number;

declare function airship_daleipc_channel_controller_create_free_space_monitor(channel_ctrl: interop.PointerConvertible): interop.Pointer;

declare function airship_daleipc_channel_controller_enqueue_transfer(channel_ctrl: interop.PointerConvertible, buffer: interop.PointerConvertible, offset: number, length: number, tag: number): interop.Enum<typeof airship_result>;

declare function airship_daleipc_channel_controller_sync(channel_ctrl: interop.PointerConvertible, flags: number): void;

declare function airship_daleipc_channel_controller_get_completed_transfer_count(channel_ctrl: interop.PointerConvertible): number;

declare function airship_daleipc_channel_controller_get_transfer_completion(channel_ctrl: interop.PointerConvertible, index: number, out_completion: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_daleipc_channel_controller_consume_transfers(channel_ctrl: interop.PointerConvertible, count: number): interop.Enum<typeof airship_result>;

declare function airship_daleipc_channel_controller_synthesize_reset_completions(channel_ctrl: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_daleipc_create_uplink_controller(client: interop.PointerConvertible, channel_name: interop.PointerConvertible): interop.Pointer;

declare function airship_daleipc_uplink_controller_destroy(uplink_ctrl: interop.PointerConvertible): void;

declare function airship_daleipc_uplink_controller_activate(uplink_ctrl: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_daleipc_uplink_controller_create_sync_monitor(uplink_ctrl: interop.PointerConvertible): interop.Pointer;

declare function airship_daleipc_uplink_controller_get_free_space(uplink_ctrl: interop.PointerConvertible): number;

declare function airship_daleipc_uplink_controller_enqueue_iosk_packet(uplink_ctrl: interop.PointerConvertible, extbuf: interop.PointerConvertible, extbuf_offset: number, length: number, tag: number, channel_id: number): interop.Enum<typeof airship_result>;

declare function airship_daleipc_uplink_controller_sync(uplink_ctrl: interop.PointerConvertible): void;

declare function airship_daleipc_uplink_controller_get_completed_packet_count(uplink_ctrl: interop.PointerConvertible): number;

declare function airship_daleipc_uplink_controller_get_packet_completion(uplink_ctrl: interop.PointerConvertible, index: number, out_completion: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_daleipc_uplink_controller_consume_packets(uplink_ctrl: interop.PointerConvertible, count: number): interop.Enum<typeof airship_result>;

declare function airship_daleipc_uplink_controller_synthesize_reset_completions(uplink_ctrl: interop.PointerConvertible): void;

declare function airship_daleipc_uplink_controller_get_channel_size(uplink_ctrl: interop.PointerConvertible): number;

declare function airship_daleipc_create_downlink_controller(client: interop.PointerConvertible, channel_name: interop.PointerConvertible): interop.Pointer;

declare function airship_daleipc_downlink_controller_destroy(downlink_ctrl: interop.PointerConvertible): void;

declare function airship_daleipc_downlink_controller_activate(downlink_ctrl: interop.PointerConvertible, buffer_size: number): interop.Enum<typeof airship_result>;

declare function airship_daleipc_downlink_controller_create_sync_monitor(downlink_ctrl: interop.PointerConvertible): interop.Pointer;

declare function airship_daleipc_downlink_controller_get_free_space(downlink_ctrl: interop.PointerConvertible): number;

declare function airship_daleipc_downlink_controller_enqueue_iosk_packet_buffer(downlink_ctrl: interop.PointerConvertible, buffer: interop.PointerConvertible, tag: number): interop.Enum<typeof airship_result>;

declare function airship_daleipc_downlink_controller_sync(downlink_ctrl: interop.PointerConvertible): void;

declare function airship_daleipc_downlink_controller_get_completed_packet_count(downlink_ctrl: interop.PointerConvertible): number;

declare function airship_daleipc_downlink_controller_get_packet_completion(downlink_ctrl: interop.PointerConvertible, index: number, out_completion: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_daleipc_downlink_controller_consume_packets(downlink_ctrl: interop.PointerConvertible, count: number): interop.Enum<typeof airship_result>;

declare function airship_daleipc_downlink_controller_synthesize_reset_completions(downlink_ctrl: interop.PointerConvertible): void;

declare function airship_daleipc_downlink_controller_get_channel_size(downlink_ctrl: interop.PointerConvertible): number;

declare function airship_daleipc_create_device_controller(client: interop.PointerConvertible, channel_name: interop.PointerConvertible): interop.Pointer;

declare function airship_daleipc_device_controller_destroy(device_ctrl: interop.PointerConvertible): void;

declare function airship_daleipc_device_controller_activate(device_ctrl: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_daleipc_device_controller_get_device_timings(device_ctrl: interop.PointerConvertible, frc: interop.PointerConvertible, ap: interop.PointerConvertible, host_begin_abs: interop.PointerConvertible, host_end_abs: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_daleipc_create_network_clock_controller(client: interop.PointerConvertible, channel_name: interop.PointerConvertible): interop.Pointer;

declare function airship_daleipc_network_clock_controller_destroy(network_clock_ctrl: interop.PointerConvertible): void;

declare function airship_daleipc_network_clock_controller_activate(network_clock_ctrl: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_daleipc_network_clock_controller_create_clock_monitor(network_clock_ctrl: interop.PointerConvertible): interop.Pointer;

declare function airship_daleipc_network_clock_controller_get_network_clock_updates(network_clock_ctrl: interop.PointerConvertible, frc: interop.PointerConvertible, ap: interop.PointerConvertible, host_begin_abs: interop.PointerConvertible, host_end_abs: interop.PointerConvertible): interop.Enum<typeof airship_result>;

declare function airship_daleipc_network_clock_controller_reset(network_clock_ctrl: interop.PointerConvertible): void;

declare function do_mach_notify_port_deleted(notify: number, name: number): number;

declare function do_mach_notify_port_destroyed(notify: number, rights: number): number;

declare function do_mach_notify_no_senders(notify: number, mscount: number): number;

declare function do_mach_notify_send_once(notify: number): number;

declare function do_mach_notify_dead_name(notify: number, name: number): number;

declare function notify_server(InHeadP: interop.PointerConvertible, OutHeadP: interop.PointerConvertible): number;

declare function notify_server_routine(InHeadP: interop.PointerConvertible): (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void;

declare function doubleagent_lookup_xattr(server: number, file_port: number, file_size: number, name: unknown /* const array */, err: interop.PointerConvertible, value_offset: interop.PointerConvertible, value_length: interop.PointerConvertible): number;

declare function doubleagent_allocate_xattr(server: number, file_port: number, file_size: number, name: unknown /* const array */, size: number, options: number, err: interop.PointerConvertible, value_offset: interop.PointerConvertible): number;

declare function doubleagent_list_xattrs(server: number, file_port: number, file_size: number, err: interop.PointerConvertible, result: interop.PointerConvertible): number;

declare function doubleagent_remove_xattr(server: number, file_port: number, file_size: number, name: unknown /* const array */, err: interop.PointerConvertible, is_empty: interop.PointerConvertible): number;

declare function doubleagent_server(InHeadP: interop.PointerConvertible, OutHeadP: interop.PointerConvertible): number;

declare function doubleagent_server_routine(InHeadP: interop.PointerConvertible): (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void;

declare function iocompressionstats_notification(iocompressionstats_port: number, flags: number): number;

declare function iocompressionstats_notification_server(InHeadP: interop.PointerConvertible, OutHeadP: interop.PointerConvertible): number;

declare function iocompressionstats_notification_server_routine(InHeadP: interop.PointerConvertible): (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void;

declare function fairplayd_arcade_request(fairplayd_port: number, arcade_reg_port: number): number;

declare function fairplay_server(InHeadP: interop.PointerConvertible, OutHeadP: interop.PointerConvertible): number;

declare function fairplay_server_routine(InHeadP: interop.PointerConvertible): (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void;

declare function coalition_notification(coalition_port: number, id: number, flags: number): number;

declare function coalition_notification_server(InHeadP: interop.PointerConvertible, OutHeadP: interop.PointerConvertible): number;

declare function coalition_notification_server_routine(InHeadP: interop.PointerConvertible): (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void;

declare function telemetry_notification(telemetry_port: number, flags: number): number;

declare function telemetry_notification_server(InHeadP: interop.PointerConvertible, OutHeadP: interop.PointerConvertible): number;

declare function telemetry_notification_server_routine(InHeadP: interop.PointerConvertible): (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void;

declare function upl_abort(upl_object: number, abort_cond: number): number;

declare function upl_abort_range(upl_object: number, offset: number, size: number, abort_cond: number, empty: interop.PointerConvertible): number;

declare function upl_commit(upl_object: number, page_list: number, page_listCnt: number): number;

declare function upl_commit_range(upl_object: number, offset: number, size: number, cntrl_flags: number, page_list: number, page_listCnt: number, empty: interop.PointerConvertible): number;

declare function memory_error_notification(memory_error_port: number, event: ecc_event_t, atoken: audit_token_t): number;

declare function mcc_memory_error_notification(memory_error_port: number, event: mcc_ecc_event_t, atoken: audit_token_t): number;

declare function memory_error_notification_server(InHeadP: interop.PointerConvertible, OutHeadP: interop.PointerConvertible): number;

declare function memory_error_notification_server_routine(InHeadP: interop.PointerConvertible): (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void;

declare function send_ktrace_background_available(ktrace_background_port: number): number;

declare function clock_alarm_reply(alarm_port: number, alarm_code: number, alarm_type: number, alarm_time: mach_timespec): number;

declare function clock_reply_server(InHeadP: interop.PointerConvertible, OutHeadP: interop.PointerConvertible): number;

declare function clock_reply_server_routine(InHeadP: interop.PointerConvertible): (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void;

declare function receive_sysdiagnose_notification(sysdiagnose_port: number, flags: number): number;

declare function receive_sysdiagnose_notification_with_audit_token(sysdiagnose_port: number, flags: number, atoken: audit_token_t): number;

declare function sysdiagnose_notification_server(InHeadP: interop.PointerConvertible, OutHeadP: interop.PointerConvertible): number;

declare function sysdiagnose_notification_server_routine(InHeadP: interop.PointerConvertible): (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void;

declare function check_task_access(task_access_port: number, calling_pid: number, calling_gid: number, target_pid: number): number;

declare function find_code_signature(task_access_port: number, new_pid: number): number;

declare function check_task_access_with_flavor(task_access_port: number, calling_pid: number, calling_gid: number, target_pid: number, flavor: number): number;

declare function send_nspace_handle(nspace_handler_port: number, pid: number, path: unknown /* const array */, handler_error: interop.PointerConvertible): number;

declare function send_nspace_resolve_cancel(nspace_handler_port: number, req_id: number): number;

declare function send_nspace_resolve_path(nspace_handler_port: number, req_id: number, pid: number, op: number, path: unknown /* const array */, resolve_error: interop.PointerConvertible): number;

declare function send_vfs_resolve_file(nspace_handler_port: number, req_id: number, pid: number, op: number, offset: number, size: number, path: unknown /* const array */): number;

declare function send_vfs_resolve_dir(nspace_handler_port: number, req_id: number, pid: number, op: number, file_name: unknown /* const array */, path: unknown /* const array */): number;

declare function send_vfs_resolve_file_with_audit_token(nspace_handler_port: number, req_id: number, op: number, offset: number, size: number, path: unknown /* const array */, req_atoken: audit_token_t): number;

declare function send_vfs_resolve_dir_with_audit_token(nspace_handler_port: number, req_id: number, op: number, file_name: unknown /* const array */, path: unknown /* const array */, req_atoken: audit_token_t): number;

declare function send_vfs_resolve_reparent_with_audit_token(nspace_handler_port: number, req_id: number, op: number, path: unknown /* const array */, dest_path: unknown /* const array */, req_atoken: audit_token_t): number;

declare function catch_mach_exception_raise(exception_port: number, thread: number, task: number, exception: number, code: interop.PointerConvertible, codeCnt: number): number;

declare function catch_mach_exception_raise_state(exception_port: number, exception: number, code: interop.PointerConvertible, codeCnt: number, flavor: interop.PointerConvertible, old_state: interop.PointerConvertible, old_stateCnt: number, new_state: interop.PointerConvertible, new_stateCnt: interop.PointerConvertible): number;

declare function catch_mach_exception_raise_state_identity(exception_port: number, thread: number, task: number, exception: number, code: interop.PointerConvertible, codeCnt: number, flavor: interop.PointerConvertible, old_state: interop.PointerConvertible, old_stateCnt: number, new_state: interop.PointerConvertible, new_stateCnt: interop.PointerConvertible): number;

declare function mach_exc_server(InHeadP: interop.PointerConvertible, OutHeadP: interop.PointerConvertible): number;

declare function mach_exc_server_routine(InHeadP: interop.PointerConvertible): (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void;

declare function mach_voucher_attr_control_get_values(control: number, voucher: number, value_handles: interop.PointerConvertible, value_handlesCnt: interop.PointerConvertible): number;

declare function mach_voucher_attr_control_create_mach_voucher(control: number, recipes: interop.PointerConvertible, recipesCnt: number, voucher: interop.PointerConvertible): number;

declare function audit_triggers(audit_port: number, flags: number): number;

declare function audit_analytics(audit_port: number, caller_id: string, caller_name: string): number;

declare function audit_triggers_server(InHeadP: interop.PointerConvertible, OutHeadP: interop.PointerConvertible): number;

declare function audit_triggers_server_routine(InHeadP: interop.PointerConvertible): (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void;

declare function arcade_upcall(arcade_upcall: number, path: number, pathCnt: number, offset: number, should_kill: interop.PointerConvertible): number;

declare function arcade_upcall_server(InHeadP: interop.PointerConvertible, OutHeadP: interop.PointerConvertible): number;

declare function arcade_upcall_server_routine(InHeadP: interop.PointerConvertible): (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void;

declare function receive_nspace_handle(nspace_handler_port: number, pid: number, path: unknown /* const array */, handler_error: interop.PointerConvertible): number;

declare function receive_nspace_resolve_cancel(nspace_handler_port: number, req_id: number): number;

declare function receive_nspace_resolve_path(nspace_handler_port: number, req_id: number, pid: number, op: number, path: unknown /* const array */, resolve_error: interop.PointerConvertible): number;

declare function receive_vfs_resolve_file(nspace_handler_port: number, req_id: number, pid: number, op: number, offset: number, size: number, path: unknown /* const array */): number;

declare function receive_vfs_resolve_dir(nspace_handler_port: number, req_id: number, pid: number, op: number, file_name: unknown /* const array */, path: unknown /* const array */): number;

declare function receive_vfs_resolve_file_with_audit_token(nspace_handler_port: number, req_id: number, op: number, offset: number, size: number, path: unknown /* const array */, req_atoken: audit_token_t, atoken: audit_token_t): number;

declare function receive_vfs_resolve_dir_with_audit_token(nspace_handler_port: number, req_id: number, op: number, file_name: unknown /* const array */, path: unknown /* const array */, req_atoken: audit_token_t, atoken: audit_token_t): number;

declare function receive_vfs_resolve_reparent_with_audit_token(nspace_handler_port: number, req_id: number, op: number, path: unknown /* const array */, dest_path: unknown /* const array */, req_atoken: audit_token_t, atoken: audit_token_t): number;

declare function vfs_nspace_server(InHeadP: interop.PointerConvertible, OutHeadP: interop.PointerConvertible): number;

declare function vfs_nspace_server_routine(InHeadP: interop.PointerConvertible): (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void;

declare function check_task_access(task_access_port: number, calling_pid: number, calling_gid: number, target_pid: number, caller_cred: audit_token_t): number;

declare function find_code_signature(task_access_port: number, new_pid: number): number;

declare function check_task_access_with_flavor(task_access_port: number, calling_pid: number, calling_gid: number, target_pid: number, flavor: number, caller_cred: audit_token_t): number;

declare function task_access_server(InHeadP: interop.PointerConvertible, OutHeadP: interop.PointerConvertible): number;

declare function task_access_server_routine(InHeadP: interop.PointerConvertible): (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void;

declare function catch_exception_raise(exception_port: number, thread: number, task: number, exception: number, code: interop.PointerConvertible, codeCnt: number): number;

declare function catch_exception_raise_state(exception_port: number, exception: number, code: interop.PointerConvertible, codeCnt: number, flavor: interop.PointerConvertible, old_state: interop.PointerConvertible, old_stateCnt: number, new_state: interop.PointerConvertible, new_stateCnt: interop.PointerConvertible): number;

declare function catch_exception_raise_state_identity(exception_port: number, thread: number, task: number, exception: number, code: interop.PointerConvertible, codeCnt: number, flavor: interop.PointerConvertible, old_state: interop.PointerConvertible, old_stateCnt: number, new_state: interop.PointerConvertible, new_stateCnt: interop.PointerConvertible): number;

declare function exc_server(InHeadP: interop.PointerConvertible, OutHeadP: interop.PointerConvertible): number;

declare function exc_server_routine(InHeadP: interop.PointerConvertible): (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void;

declare function os_log_create(subsystem: string, category: string): NSObject;

declare function os_log_type_enabled(log: NSObject, OS_LOG_TYPE_INFO: number): boolean;

declare function os_log_type_enabled(log: NSObject, OS_LOG_TYPE_DEBUG: number): boolean;

declare function os_log_coprocessor(buff: interop.PointerConvertible, buff_len: number, type: interop.Enum<typeof os_log_type_t>, uuid: string, timestamp: number, offset: number, stream_log: boolean): boolean;

declare function os_log_coprocessor_register(uuid: string, file_path: string, copy: boolean): void;

declare function os_log_coprocessor_register_with_type(uuid: string, file_path: string, register_type: interop.Enum<typeof os_log_coproc_reg_t>): void;

declare function _os_log_internal(dso: interop.PointerConvertible, log: NSObject, type: interop.Enum<typeof os_log_type_t>, message: string): void;

declare function _os_log_internal_driverKit(dso: interop.PointerConvertible, log: NSObject, type: interop.Enum<typeof os_log_type_t>, message: string): number;

declare function _os_log_at_time(dso: interop.PointerConvertible, log: NSObject, type: interop.Enum<typeof os_log_type_t>, ts: number, message: string): void;

declare function kextd_ping(server: number): number;

declare function KUNCUserNotificationDisplayNotice(noticeTimeout: number, flags: number, iconPath: string, soundPath: string, localizationPath: string, alertHeader: string, alertMessage: string, defaultButtonTitle: string): number;

declare function KUNCUserNotificationDisplayAlert(alertTimeout: number, flags: number, iconPath: string, soundPath: string, localizationPath: string, alertHeader: string, alertMessage: string, defaultButtonTitle: string, alternateButtonTitle: string, otherButtonTitle: string, responseFlags: interop.PointerConvertible): number;

declare function KUNCExecute(executionPath: string, openAsUser: number, pathExecutionType: number): number;

declare function KUNCGetNotificationID(): number;

declare function KUNCUserNotificationDisplayFromBundle(notificationID: number, bundleIdentifier: string, fileName: string, fileExtension: string, messageKey: string, tokenString: string, callback: (p1: number, p2: number, p3: interop.PointerConvertible) => void, contextKey: number): number;

declare function machine_do_debugid(): void;

declare function machine_arm_debug_info(): interop.Pointer;

declare function machine_do_mvfpid(): void;

declare function machine_arm_mvfp_info(): interop.Pointer;

declare function machine_read_midr(): number;

declare function machine_read_clidr(): number;

declare function machine_read_ccsidr(): number;

declare function machine_write_csselr(level: interop.Enum<typeof csselr_cache_level>, type: interop.Enum<typeof csselr_cache_type>): void;

declare function get_user_regs(p1: number): interop.Pointer;

declare function find_user_regs(p1: number): interop.Pointer;

declare function find_kern_regs(p1: number): interop.Pointer;

declare function find_user_vfp(p1: number): interop.Pointer;

declare function find_debug_state32(p1: number): interop.Pointer;

declare function find_or_allocate_debug_state32(p1: number): interop.Pointer;

declare function find_debug_state64(p1: number): interop.Pointer;

declare function find_or_allocate_debug_state64(p1: number): interop.Pointer;

declare function set_user_neon_reg(p1: number, p2: number, p3: bigint): void;

declare function act_thread_csave(): interop.Pointer;

declare function act_thread_catt(ctx: interop.PointerConvertible): void;

declare function act_thread_cfree(ctx: interop.PointerConvertible): void;

declare function machine_read_isa_feat1(): arm_isa_feat1_reg;

declare function nd6_lookup_ipv6(interface: interop.PointerConvertible, ip6_dest: interop.PointerConvertible, ll_dest: interop.PointerConvertible, ll_dest_len: number, hint: interop.PointerConvertible, packet: interop.PointerConvertible): number;

declare function random_buf(buf: interop.PointerConvertible, buflen: number): number;

declare function SHA1Init(p1: interop.PointerConvertible): void;

declare function SHA1Update(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number): void;

declare function SHA1Final(p1: interop.PointerConvertible, p2: interop.PointerConvertible): void;

declare function OSMalloc_Tagalloc(name: string, flags: number): interop.Pointer;

declare function OSMalloc_Tagfree(tag: interop.PointerConvertible): void;

declare function OSMalloc(size: number, tag: interop.PointerConvertible): interop.Pointer;

declare function OSMalloc_nowait(size: number, tag: interop.PointerConvertible): interop.Pointer;

declare function OSMalloc_noblock(size: number, tag: interop.PointerConvertible): interop.Pointer;

declare function OSFree(addr: interop.PointerConvertible, size: number, tag: interop.PointerConvertible): void;

declare function OSPrintMemory(): void;

declare function sysctlbyname(p1: string, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number): number;

declare function OSCompareAndSwap64(oldValue: number, newValue: number, address: interop.PointerConvertible): number;

declare function OSAddAtomic64(theAmount: number, address: interop.PointerConvertible): number;

declare function OSCompareAndSwap(oldValue: number, newValue: number, address: interop.PointerConvertible): number;

declare function OSCompareAndSwapPtr(oldValue: interop.PointerConvertible, newValue: interop.PointerConvertible, address: interop.PointerConvertible): number;

declare function OSAddAtomic(amount: number, address: interop.PointerConvertible): number;

declare function OSAddAtomic16(amount: number, address: interop.PointerConvertible): number;

declare function OSAddAtomic8(amount: number, address: interop.PointerConvertible): number;

declare function OSIncrementAtomic(address: interop.PointerConvertible): number;

declare function OSIncrementAtomic16(address: interop.PointerConvertible): number;

declare function OSIncrementAtomic8(address: interop.PointerConvertible): number;

declare function OSDecrementAtomic(address: interop.PointerConvertible): number;

declare function OSDecrementAtomic16(address: interop.PointerConvertible): number;

declare function OSDecrementAtomic8(address: interop.PointerConvertible): number;

declare function OSBitAndAtomic(mask: number, address: interop.PointerConvertible): number;

declare function OSBitAndAtomic16(mask: number, address: interop.PointerConvertible): number;

declare function OSBitAndAtomic8(mask: number, address: interop.PointerConvertible): number;

declare function OSBitOrAtomic(mask: number, address: interop.PointerConvertible): number;

declare function OSBitOrAtomic16(mask: number, address: interop.PointerConvertible): number;

declare function OSBitOrAtomic8(mask: number, address: interop.PointerConvertible): number;

declare function OSBitXorAtomic(mask: number, address: interop.PointerConvertible): number;

declare function OSBitXorAtomic16(mask: number, address: interop.PointerConvertible): number;

declare function OSBitXorAtomic8(mask: number, address: interop.PointerConvertible): number;

declare function OSTestAndSet(bit: number, startAddress: interop.PointerConvertible): number;

declare function OSTestAndClear(bit: number, startAddress: interop.PointerConvertible): number;

declare function OSSynchronizeIO(): void;

declare function mach_gss_init_sec_context(server: number, mech: interop.Enum<typeof gssd_mechtype>, intoken: interop.PointerConvertible, intokenCnt: number, uid: number, princ_namestr: string, svc_namestr: string, flags: number, gssd_flags: number, context: interop.PointerConvertible, cred_handle: interop.PointerConvertible, ret_flags: interop.PointerConvertible, key: interop.PointerConvertible, keyCnt: interop.PointerConvertible, outtoken: interop.PointerConvertible, outtokenCnt: interop.PointerConvertible, major_stat: interop.PointerConvertible, minor_stat: interop.PointerConvertible): number;

declare function mach_gss_accept_sec_context(server: number, intoken: interop.PointerConvertible, intokenCnt: number, svc_namestr: string, gssd_flags: number, context: interop.PointerConvertible, cred_handle: interop.PointerConvertible, flags: interop.PointerConvertible, uid: interop.PointerConvertible, gids: interop.PointerConvertible, gidsCnt: interop.PointerConvertible, key: interop.PointerConvertible, keyCnt: interop.PointerConvertible, outtoken: interop.PointerConvertible, outtokenCnt: interop.PointerConvertible, major_stat: interop.PointerConvertible, minor_stat: interop.PointerConvertible): number;

declare function mach_gss_log_error(server: number, mnt: string, uid: number, source: string, major_stat: number, minor_stat: number): number;

declare function mach_gss_init_sec_context_v2(server: number, mech: interop.Enum<typeof gssd_mechtype>, intoken: interop.PointerConvertible, intokenCnt: number, uid: number, clnt_nt: interop.Enum<typeof gssd_nametype>, clnt_princ: interop.PointerConvertible, clnt_princCnt: number, svc_nt: interop.Enum<typeof gssd_nametype>, svc_princ: interop.PointerConvertible, svc_princCnt: number, flags: number, gssd_flags: interop.PointerConvertible, context: interop.PointerConvertible, cred_handle: interop.PointerConvertible, ret_flags: interop.PointerConvertible, key: interop.PointerConvertible, keyCnt: interop.PointerConvertible, outtoken: interop.PointerConvertible, outtokenCnt: interop.PointerConvertible, displayname: string, major_stat: interop.PointerConvertible, minor_stat: interop.PointerConvertible): number;

declare function mach_gss_accept_sec_context_v2(server: number, intoken: interop.PointerConvertible, intokenCnt: number, svc_nt: interop.Enum<typeof gssd_nametype>, svc_princ: interop.PointerConvertible, svc_princCnt: number, gssd_flags: interop.PointerConvertible, context: interop.PointerConvertible, cred_handle: interop.PointerConvertible, flags: interop.PointerConvertible, uid: interop.PointerConvertible, gids: interop.PointerConvertible, gidsCnt: interop.PointerConvertible, key: interop.PointerConvertible, keyCnt: interop.PointerConvertible, outtoken: interop.PointerConvertible, outtokenCnt: interop.PointerConvertible, major_stat: interop.PointerConvertible, minor_stat: interop.PointerConvertible): number;

declare function mach_gss_init_sec_context_v3(server: number, mech: interop.Enum<typeof gssd_mechtype>, intoken: interop.PointerConvertible, intokenCnt: number, uid: number, clnt_nt: interop.Enum<typeof gssd_nametype>, clnt_princ: interop.PointerConvertible, clnt_princCnt: number, svc_nt: interop.Enum<typeof gssd_nametype>, svc_princ: interop.PointerConvertible, svc_princCnt: number, flags: number, etypes: interop.PointerConvertible, etypesCnt: number, gssd_flags: interop.PointerConvertible, context: interop.PointerConvertible, cred_handle: interop.PointerConvertible, ret_flags: interop.PointerConvertible, key: interop.PointerConvertible, keyCnt: interop.PointerConvertible, outtoken: interop.PointerConvertible, outtokenCnt: interop.PointerConvertible, displayname: string, major_stat: interop.PointerConvertible, minor_stat: interop.PointerConvertible): number;

declare function mach_gss_hold_cred(server: number, mech: interop.Enum<typeof gssd_mechtype>, nt: interop.Enum<typeof gssd_nametype>, princ: interop.PointerConvertible, princCnt: number, major_stat: interop.PointerConvertible, minor_stat: interop.PointerConvertible): number;

declare function mach_gss_unhold_cred(server: number, mech: interop.Enum<typeof gssd_mechtype>, nt: interop.Enum<typeof gssd_nametype>, princ: interop.PointerConvertible, princCnt: number, major_stat: interop.PointerConvertible, minor_stat: interop.PointerConvertible): number;

declare function mach_gss_lookup(server: number, uid: number, asid: number, gssd_session_port: interop.PointerConvertible): number;

declare function mach_bridge_register_regwrite_timestamp_callback(func: (p1: number) => void): void;

declare function serial_keyboard_init(): void;

declare function serial_keyboard_start(): void;

declare function serial_keyboard_poll(): void;

declare function console_init(): void;

declare function _serial_getc(wait: boolean): number;

declare function _vcgetc(wait: boolean): number;

declare function console_is_serial(): number;

declare function switch_to_serial_console(): number;

declare function switch_to_video_console(): number;

declare function switch_to_old_console(old_console: number): void;


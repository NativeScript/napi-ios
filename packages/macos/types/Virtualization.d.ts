/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./AppKit.d.ts" />
/// <reference path="./Runtime.d.ts" />

declare const VZErrorDomain: string;

declare const VZMacAuxiliaryStorageInitializationOptions: {
  VZMacAuxiliaryStorageInitializationOptionAllowOverwrite: 1,
};

declare const VZDiskImageCachingMode: {
  Automatic: 0,
  Uncached: 1,
  Cached: 2,
};

declare const VZVirtualMachineState: {
  Stopped: 0,
  Running: 1,
  Paused: 2,
  Error: 3,
  Starting: 4,
  Pausing: 5,
  Resuming: 6,
  Stopping: 7,
  Saving: 8,
  Restoring: 9,
};

declare const VZEFIVariableStoreInitializationOptions: {
  VZEFIVariableStoreInitializationOptionAllowOverwrite: 1,
};

declare const VZDiskSynchronizationMode: {
  Full: 0,
  None: 1,
};

declare const VZDiskImageSynchronizationMode: {
  Full: 1,
  Fsync: 2,
  None: 3,
};

declare const VZErrorCode: {
  Internal: 1,
  InvalidVirtualMachineConfiguration: 2,
  InvalidVirtualMachineState: 3,
  InvalidVirtualMachineStateTransition: 4,
  InvalidDiskImage: 5,
  VirtualMachineLimitExceeded: 6,
  NetworkError: 7,
  OutOfDiskSpace: 8,
  OperationCancelled: 9,
  NotSupported: 10,
  Save: 11,
  Restore: 12,
  RestoreImageCatalogLoadFailed: 10001,
  InvalidRestoreImageCatalog: 10002,
  NoSupportedRestoreImagesInCatalog: 10003,
  RestoreImageLoadFailed: 10004,
  InvalidRestoreImage: 10005,
  InstallationRequiresUpdate: 10006,
  InstallationFailed: 10007,
  NetworkBlockDeviceNegotiationFailed: 20001,
  NetworkBlockDeviceDisconnected: 20002,
  USBControllerNotFound: 30001,
  DeviceAlreadyAttached: 30002,
  DeviceInitializationFailure: 30003,
  DeviceNotFound: 30004,
};

declare const VZLinuxRosettaAvailability: {
  NotSupported: 0,
  NotInstalled: 1,
  Installed: 2,
};

declare interface VZVirtioSocketListenerDelegate extends NSObjectProtocol {
  listenerShouldAcceptNewConnectionFromSocketDevice?(listener: VZVirtioSocketListener, connection: VZVirtioSocketConnection, socketDevice: VZVirtioSocketDevice): boolean;
}

declare class VZVirtioSocketListenerDelegate extends NativeObject implements VZVirtioSocketListenerDelegate {
}

declare interface VZVirtioConsoleDeviceDelegate extends NSObjectProtocol {
  consoleDeviceDidOpenPort?(consoleDevice: VZVirtioConsoleDevice, consolePort: VZVirtioConsolePort): void;

  consoleDeviceDidClosePort?(consoleDevice: VZVirtioConsoleDevice, consolePort: VZVirtioConsolePort): void;
}

declare class VZVirtioConsoleDeviceDelegate extends NativeObject implements VZVirtioConsoleDeviceDelegate {
}

declare interface VZNetworkBlockDeviceStorageDeviceAttachmentDelegate extends NSObjectProtocol {
  attachmentWasConnected?(attachment: VZNetworkBlockDeviceStorageDeviceAttachment): void;

  attachmentDidEncounterError?(attachment: VZNetworkBlockDeviceStorageDeviceAttachment, error: NSError): void;
}

declare class VZNetworkBlockDeviceStorageDeviceAttachmentDelegate extends NativeObject implements VZNetworkBlockDeviceStorageDeviceAttachmentDelegate {
}

declare interface VZVirtualMachineDelegate extends NSObjectProtocol {
  guestDidStopVirtualMachine?(virtualMachine: VZVirtualMachine): void;

  virtualMachineDidStopWithError?(virtualMachine: VZVirtualMachine, error: NSError): void;

  virtualMachineNetworkDeviceAttachmentWasDisconnectedWithError?(virtualMachine: VZVirtualMachine, networkDevice: VZNetworkDevice, error: NSError): void;
}

declare class VZVirtualMachineDelegate extends NativeObject implements VZVirtualMachineDelegate {
}

declare interface VZUSBDevice extends NSObjectProtocol {
  readonly usbController: VZUSBController;

  readonly uuid: NSUUID;
}

declare class VZUSBDevice extends NativeObject implements VZUSBDevice {
}

declare interface VZGraphicsDisplayObserver extends NSObjectProtocol {
  displayDidBeginReconfiguration?(display: VZGraphicsDisplay): void;

  displayDidEndReconfiguration?(display: VZGraphicsDisplay): void;
}

declare class VZGraphicsDisplayObserver extends NativeObject implements VZGraphicsDisplayObserver {
}

declare interface VZUSBDeviceConfiguration extends NSObjectProtocol {
  uuid: NSUUID;

  setUuid(uuid: NSUUID): void;
}

declare class VZUSBDeviceConfiguration extends NativeObject implements VZUSBDeviceConfiguration {
}

declare class VZSharedDirectory extends NSObject {
  initWithURLReadOnly(url: NSURL, readOnly: boolean): this;

  readonly URL: NSURL;

  readonly readOnly: boolean;

  isReadOnly(): boolean;
}

declare class VZBridgedNetworkDeviceAttachment extends VZNetworkDeviceAttachment {
  initWithInterface(interface: VZBridgedNetworkInterface): this;

  readonly interface: VZBridgedNetworkInterface;
}

declare class VZMacOSRestoreImage extends NSObject {
  static loadFileURLCompletionHandler(fileURL: NSURL, completionHandler: (p1: VZMacOSRestoreImage, p2: NSError) => void | null): void;

  static fetchLatestSupportedWithCompletionHandler(completionHandler: (p1: VZMacOSRestoreImage, p2: NSError) => void | null): void;

  readonly supported: boolean;

  readonly URL: NSURL;

  readonly buildVersion: string;

  readonly operatingSystemVersion: NSOperatingSystemVersion;

  readonly mostFeaturefulSupportedConfiguration: VZMacOSConfigurationRequirements;

  isSupported(): boolean;
}

declare class VZLinuxRosettaUnixSocketCachingOptions extends VZLinuxRosettaCachingOptions {
  initWithPathError(path: string, error: interop.PointerConvertible): this;

  init(): this;

  readonly path: string;

  static readonly maximumPathLength: number;
}

declare class VZLinuxRosettaCachingOptions extends NSObject {
}

declare class VZVirtualMachineView extends NSView {
  virtualMachine: VZVirtualMachine;

  capturesSystemKeys: boolean;

  automaticallyReconfiguresDisplay: boolean;

  setVirtualMachine(virtualMachine: VZVirtualMachine | null): void;

  setCapturesSystemKeys(capturesSystemKeys: boolean): void;

  setAutomaticallyReconfiguresDisplay(automaticallyReconfiguresDisplay: boolean): void;
}

declare class VZVirtioSoundDeviceInputStreamConfiguration extends VZVirtioSoundDeviceStreamConfiguration {
  init(): this;

  source: VZAudioInputStreamSource;

  setSource(source: VZAudioInputStreamSource | null): void;
}

declare class VZVirtioSoundDeviceStreamConfiguration extends NSObject implements NSCopying {
  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class VZVirtioSocketListener extends NSObject {
  delegate: VZVirtioSocketListenerDelegate;

  setDelegate(delegate: VZVirtioSocketListenerDelegate | null): void;
}

declare class VZVirtioSocketDeviceConfiguration extends VZSocketDeviceConfiguration {
  init(): this;
}

declare class VZVirtioNetworkDeviceConfiguration extends VZNetworkDeviceConfiguration {
  init(): this;
}

declare class VZVirtioGraphicsScanout extends VZGraphicsDisplay {
}

declare class VZVirtioGraphicsDeviceConfiguration extends VZGraphicsDeviceConfiguration {
  init(): this;

  get scanouts(): NSArray;
  set scanouts(value: NSArray<interop.Object> | Array<interop.Object>);

  setScanouts(scanouts: NSArray<interop.Object> | Array<interop.Object>): void;
}

declare class VZVirtioGraphicsDevice extends VZGraphicsDevice {
}

declare class VZVirtioConsolePortConfigurationArray extends NSObject implements NSCopying {
  maximumPortCount: number;

  objectAtIndexedSubscript(portIndex: number): VZVirtioConsolePortConfiguration;

  setObjectAtIndexedSubscript(configuration: VZVirtioConsolePortConfiguration | null, portIndex: number): void;

  setMaximumPortCount(maximumPortCount: number): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class VZVirtioConsolePortConfiguration extends VZConsolePortConfiguration {
  init(): this;

  name: string;

  isConsole: boolean;

  setName(name: string | null): void;

  setIsConsole(isConsole: boolean): void;
}

declare class VZVirtioConsoleDevice extends VZConsoleDevice {
  delegate: VZVirtioConsoleDeviceDelegate;

  readonly ports: VZVirtioConsolePortArray;

  setDelegate(delegate: VZVirtioConsoleDeviceDelegate | null): void;
}

declare class VZVirtioConsolePortArray extends NSObject {
  objectAtIndexedSubscript(portIndex: number): VZVirtioConsolePort;

  readonly maximumPortCount: number;
}

declare class VZVirtioConsolePort extends NSObject {
  readonly name: string;

  attachment: VZSerialPortAttachment;

  setAttachment(attachment: VZSerialPortAttachment | null): void;
}

declare class VZUSBMassStorageDeviceConfiguration extends VZStorageDeviceConfiguration implements VZUSBDeviceConfiguration {
  initWithAttachment(attachment: VZStorageDeviceAttachment): this;

  uuid: NSUUID;

  setUuid(uuid: NSUUID): void;

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

declare class VZUSBMassStorageDevice extends VZStorageDevice implements VZUSBDevice {
  initWithConfiguration(configuration: VZUSBMassStorageDeviceConfiguration): this;

  readonly usbController: VZUSBController;

  readonly uuid: NSUUID;

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

declare class VZVirtualMachineStartOptions extends NSObject {
}

declare class VZUSBKeyboardConfiguration extends VZKeyboardConfiguration {
  init(): this;
}

declare class VZUSBController extends NSObject {
  attachDeviceCompletionHandler(device: VZUSBDevice, completionHandler: (p1: NSError) => void | null): void;

  detachDeviceCompletionHandler(device: VZUSBDevice, completionHandler: (p1: NSError) => void | null): void;

  readonly usbDevices: NSArray;
}

declare class VZSocketDeviceConfiguration extends NSObject implements NSCopying {
  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class VZSerialPortConfiguration extends NSObject implements NSCopying {
  attachment: VZSerialPortAttachment;

  setAttachment(attachment: VZSerialPortAttachment | null): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class VZNetworkDeviceConfiguration extends NSObject implements NSCopying {
  MACAddress: VZMACAddress;

  attachment: VZNetworkDeviceAttachment;

  setMACAddress(MACAddress: VZMACAddress): void;

  setAttachment(attachment: VZNetworkDeviceAttachment | null): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class VZMacGraphicsDeviceConfiguration extends VZGraphicsDeviceConfiguration {
  init(): this;

  get displays(): NSArray;
  set displays(value: NSArray<interop.Object> | Array<interop.Object>);

  setDisplays(displays: NSArray<interop.Object> | Array<interop.Object>): void;
}

declare class VZNetworkDevice extends NSObject {
  attachment: VZNetworkDeviceAttachment;

  setAttachment(attachment: VZNetworkDeviceAttachment | null): void;
}

declare class VZStorageDeviceConfiguration extends NSObject implements NSCopying {
  readonly attachment: VZStorageDeviceAttachment;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class VZNetworkDeviceAttachment extends NSObject {
}

declare class VZMultipleDirectoryShare extends VZDirectoryShare {
  init(): this;

  initWithDirectories(directories: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): this;

  readonly directories: NSDictionary;

  static validateNameError(name: string, error: interop.PointerConvertible): boolean;

  static canonicalizedNameFromName(name: string): string;
}

declare class VZMemoryBalloonDevice extends NSObject {
}

declare class VZMacTrackpadConfiguration extends VZPointingDeviceConfiguration {
  init(): this;
}

declare class VZMacOSBootLoader extends VZBootLoader {
  init(): this;
}

declare class VZMacHardwareModel extends NSObject implements NSCopying {
  initWithDataRepresentation(dataRepresentation: NSData): this;

  readonly dataRepresentation: NSData;

  readonly supported: boolean;

  isSupported(): boolean;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class VZLinuxRosettaDirectoryShare extends VZDirectoryShare {
  initWithError(error: interop.PointerConvertible): this;

  static installRosettaWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  options: VZLinuxRosettaCachingOptions;

  static readonly availability: interop.Enum<typeof VZLinuxRosettaAvailability>;

  setOptions(options: VZLinuxRosettaCachingOptions): void;
}

declare class VZKeyboardConfiguration extends NSObject implements NSCopying {
  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class VZGenericPlatformConfiguration extends VZPlatformConfiguration {
  init(): this;

  machineIdentifier: VZGenericMachineIdentifier;

  static readonly nestedVirtualizationSupported: boolean;

  nestedVirtualizationEnabled: boolean;

  setMachineIdentifier(machineIdentifier: VZGenericMachineIdentifier): void;

  static isNestedVirtualizationSupported(): boolean;

  isNestedVirtualizationEnabled(): boolean;

  setNestedVirtualizationEnabled(nestedVirtualizationEnabled: boolean): void;
}

declare class VZGenericMachineIdentifier extends NSObject implements NSCopying {
  init(): this;

  initWithDataRepresentation(dataRepresentation: NSData): this;

  readonly dataRepresentation: NSData;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class VZFileSerialPortAttachment extends VZSerialPortAttachment {
  initWithURLAppendError(url: NSURL, shouldAppend: boolean, error: interop.PointerConvertible): this;

  readonly URL: NSURL;

  readonly append: boolean;
}

declare class VZFileHandleSerialPortAttachment extends VZSerialPortAttachment {
  initWithFileHandleForReadingFileHandleForWriting(fileHandleForReading: NSFileHandle | null, fileHandleForWriting: NSFileHandle | null): this;

  readonly fileHandleForReading: NSFileHandle;

  readonly fileHandleForWriting: NSFileHandle;
}

declare class VZSerialPortAttachment extends NSObject {
}

declare class VZEntropyDeviceConfiguration extends NSObject implements NSCopying {
  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class VZEFIVariableStore extends NSObject {
  initWithURL(URL: NSURL): this;

  initCreatingVariableStoreAtURLOptionsError(URL: NSURL, options: interop.Enum<typeof VZEFIVariableStoreInitializationOptions>, error: interop.PointerConvertible): this;

  readonly URL: NSURL;
}

declare class VZDiskImageStorageDeviceAttachment extends VZStorageDeviceAttachment {
  initWithURLReadOnlyError(url: NSURL, readOnly: boolean, error: interop.PointerConvertible): this;

  initWithURLReadOnlyCachingModeSynchronizationModeError(url: NSURL, readOnly: boolean, cachingMode: interop.Enum<typeof VZDiskImageCachingMode>, synchronizationMode: interop.Enum<typeof VZDiskImageSynchronizationMode>, error: interop.PointerConvertible): this;

  readonly URL: NSURL;

  readonly readOnly: boolean;

  readonly cachingMode: interop.Enum<typeof VZDiskImageCachingMode>;

  readonly synchronizationMode: interop.Enum<typeof VZDiskImageSynchronizationMode>;

  isReadOnly(): boolean;
}

declare class VZDiskBlockDeviceStorageDeviceAttachment extends VZStorageDeviceAttachment {
  initWithFileHandleReadOnlySynchronizationModeError(fileHandle: NSFileHandle, readOnly: boolean, synchronizationMode: interop.Enum<typeof VZDiskSynchronizationMode>, error: interop.PointerConvertible): this;

  readonly fileHandle: NSFileHandle;

  readonly readOnly: boolean;

  readonly synchronizationMode: interop.Enum<typeof VZDiskSynchronizationMode>;

  isReadOnly(): boolean;
}

declare class VZStorageDeviceAttachment extends NSObject {
}

declare class VZConsoleDeviceConfiguration extends NSObject implements NSCopying {
  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class VZConsoleDevice extends NSObject {
}

declare class VZBootLoader extends NSObject implements NSCopying {
  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class VZAudioInputStreamSource extends NSObject {
}

declare class VZAudioDeviceConfiguration extends NSObject implements NSCopying {
  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class VZMacGraphicsDisplayConfiguration extends VZGraphicsDisplayConfiguration {
  initWithWidthInPixelsHeightInPixelsPixelsPerInch(widthInPixels: number, heightInPixels: number, pixelsPerInch: number): this;

  initForScreenSizeInPoints(screen: NSScreen, sizeInPoints: CGSize): this;

  widthInPixels: number;

  heightInPixels: number;

  pixelsPerInch: number;

  setWidthInPixels(widthInPixels: number): void;

  setHeightInPixels(heightInPixels: number): void;

  setPixelsPerInch(pixelsPerInch: number): void;
}

declare class VZVirtioTraditionalMemoryBalloonDevice extends VZMemoryBalloonDevice {
  targetVirtualMachineMemorySize: number;

  setTargetVirtualMachineMemorySize(targetVirtualMachineMemorySize: number): void;
}

declare class VZBridgedNetworkInterface extends NSObject {
  static readonly networkInterfaces: NSArray;

  readonly identifier: string;

  readonly localizedDisplayName: string;
}

declare class VZXHCIController extends VZUSBController {
}

declare class VZLinuxBootLoader extends VZBootLoader {
  initWithKernelURL(kernelURL: NSURL): this;

  kernelURL: NSURL;

  commandLine: string;

  initialRamdiskURL: NSURL;

  setKernelURL(kernelURL: NSURL): void;

  setCommandLine(commandLine: string): void;

  setInitialRamdiskURL(initialRamdiskURL: NSURL | null): void;
}

declare class VZUSBControllerConfiguration extends NSObject implements NSCopying {
  get usbDevices(): NSArray;
  set usbDevices(value: NSArray<interop.Object> | Array<interop.Object>);

  setUsbDevices(usbDevices: NSArray<interop.Object> | Array<interop.Object>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class VZVirtioEntropyDeviceConfiguration extends VZEntropyDeviceConfiguration {
  init(): this;
}

declare class VZConsolePortConfiguration extends NSObject implements NSCopying {
  attachment: VZSerialPortAttachment;

  setAttachment(attachment: VZSerialPortAttachment | null): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class VZVirtioBlockDeviceConfiguration extends VZStorageDeviceConfiguration {
  initWithAttachment(attachment: VZStorageDeviceAttachment): this;

  static validateBlockDeviceIdentifierError(blockDeviceIdentifier: string, error: interop.PointerConvertible): boolean;

  blockDeviceIdentifier: string;

  setBlockDeviceIdentifier(blockDeviceIdentifier: string): void;
}

declare class VZVirtualMachineConfiguration extends NSObject implements NSCopying {
  bootLoader: VZBootLoader;

  memorySize: number;

  CPUCount: number;

  platform: VZPlatformConfiguration;

  get audioDevices(): NSArray;
  set audioDevices(value: NSArray<interop.Object> | Array<interop.Object>);

  get consoleDevices(): NSArray;
  set consoleDevices(value: NSArray<interop.Object> | Array<interop.Object>);

  get directorySharingDevices(): NSArray;
  set directorySharingDevices(value: NSArray<interop.Object> | Array<interop.Object>);

  get entropyDevices(): NSArray;
  set entropyDevices(value: NSArray<interop.Object> | Array<interop.Object>);

  get memoryBalloonDevices(): NSArray;
  set memoryBalloonDevices(value: NSArray<interop.Object> | Array<interop.Object>);

  get networkDevices(): NSArray;
  set networkDevices(value: NSArray<interop.Object> | Array<interop.Object>);

  get serialPorts(): NSArray;
  set serialPorts(value: NSArray<interop.Object> | Array<interop.Object>);

  get socketDevices(): NSArray;
  set socketDevices(value: NSArray<interop.Object> | Array<interop.Object>);

  get storageDevices(): NSArray;
  set storageDevices(value: NSArray<interop.Object> | Array<interop.Object>);

  get keyboards(): NSArray;
  set keyboards(value: NSArray<interop.Object> | Array<interop.Object>);

  get pointingDevices(): NSArray;
  set pointingDevices(value: NSArray<interop.Object> | Array<interop.Object>);

  get graphicsDevices(): NSArray;
  set graphicsDevices(value: NSArray<interop.Object> | Array<interop.Object>);

  get usbControllers(): NSArray;
  set usbControllers(value: NSArray<interop.Object> | Array<interop.Object>);

  setBootLoader(bootLoader: VZBootLoader | null): void;

  setMemorySize(memorySize: number): void;

  setCPUCount(CPUCount: number): void;

  setPlatform(platform: VZPlatformConfiguration): void;

  setAudioDevices(audioDevices: NSArray<interop.Object> | Array<interop.Object>): void;

  setConsoleDevices(consoleDevices: NSArray<interop.Object> | Array<interop.Object>): void;

  setDirectorySharingDevices(directorySharingDevices: NSArray<interop.Object> | Array<interop.Object>): void;

  setEntropyDevices(entropyDevices: NSArray<interop.Object> | Array<interop.Object>): void;

  setMemoryBalloonDevices(memoryBalloonDevices: NSArray<interop.Object> | Array<interop.Object>): void;

  setNetworkDevices(networkDevices: NSArray<interop.Object> | Array<interop.Object>): void;

  setSerialPorts(serialPorts: NSArray<interop.Object> | Array<interop.Object>): void;

  setSocketDevices(socketDevices: NSArray<interop.Object> | Array<interop.Object>): void;

  setStorageDevices(storageDevices: NSArray<interop.Object> | Array<interop.Object>): void;

  setKeyboards(keyboards: NSArray<interop.Object> | Array<interop.Object>): void;

  setPointingDevices(pointingDevices: NSArray<interop.Object> | Array<interop.Object>): void;

  setGraphicsDevices(graphicsDevices: NSArray<interop.Object> | Array<interop.Object>): void;

  setUsbControllers(usbControllers: NSArray<interop.Object> | Array<interop.Object>): void;

  validateWithError(error: interop.PointerConvertible): boolean;

  validateSaveRestoreSupportWithError(error: interop.PointerConvertible): boolean;

  static readonly minimumAllowedMemorySize: number;

  static readonly maximumAllowedMemorySize: number;

  static readonly minimumAllowedCPUCount: number;

  static readonly maximumAllowedCPUCount: number;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class VZSpiceAgentPortAttachment extends VZSerialPortAttachment {
  init(): this;

  sharesClipboard: boolean;

  static readonly spiceAgentPortName: string;

  setSharesClipboard(sharesClipboard: boolean): void;
}

declare class VZVirtioGraphicsScanoutConfiguration extends VZGraphicsDisplayConfiguration {
  initWithWidthInPixelsHeightInPixels(widthInPixels: number, heightInPixels: number): this;

  widthInPixels: number;

  heightInPixels: number;

  setWidthInPixels(widthInPixels: number): void;

  setHeightInPixels(heightInPixels: number): void;
}

declare class VZEFIBootLoader extends VZBootLoader {
  init(): this;

  variableStore: VZEFIVariableStore;

  setVariableStore(variableStore: VZEFIVariableStore | null): void;
}

declare class VZNetworkBlockDeviceStorageDeviceAttachment extends VZStorageDeviceAttachment {
  initWithURLTimeoutForcedReadOnlySynchronizationModeError(URL: NSURL, timeout: number, forcedReadOnly: boolean, synchronizationMode: interop.Enum<typeof VZDiskSynchronizationMode>, error: interop.PointerConvertible): this;

  initWithURLError(URL: NSURL, error: interop.PointerConvertible): this;

  static validateURLError(URL: NSURL, error: interop.PointerConvertible): boolean;

  readonly URL: NSURL;

  readonly timeout: number;

  readonly forcedReadOnly: boolean;

  readonly synchronizationMode: interop.Enum<typeof VZDiskSynchronizationMode>;

  delegate: VZNetworkBlockDeviceStorageDeviceAttachmentDelegate;

  isForcedReadOnly(): boolean;

  setDelegate(delegate: VZNetworkBlockDeviceStorageDeviceAttachmentDelegate | null): void;
}

declare class VZMACAddress extends NSObject implements NSCopying {
  initWithEthernetAddress(ethernetAddress: ether_addr): this;

  initWithString(string: string): this;

  static randomLocallyAdministeredAddress<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  readonly ethernetAddress: ether_addr;

  readonly string: string;

  readonly isBroadcastAddress: boolean;

  readonly isMulticastAddress: boolean;

  readonly isUnicastAddress: boolean;

  readonly isLocallyAdministeredAddress: boolean;

  readonly isUniversallyAdministeredAddress: boolean;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class VZHostAudioOutputStreamSink extends VZAudioOutputStreamSink {
  init(): this;
}

declare class VZMemoryBalloonDeviceConfiguration extends NSObject implements NSCopying {
  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class VZVirtioConsoleDeviceSerialPortConfiguration extends VZSerialPortConfiguration {
  init(): this;
}

declare class VZHostAudioInputStreamSource extends VZAudioInputStreamSource {
  init(): this;
}

declare class VZStorageDevice extends NSObject {
}

declare class VZVirtioSoundDeviceOutputStreamConfiguration extends VZVirtioSoundDeviceStreamConfiguration {
  init(): this;

  sink: VZAudioOutputStreamSink;

  setSink(sink: VZAudioOutputStreamSink | null): void;
}

declare class VZVirtioSoundDeviceConfiguration extends VZAudioDeviceConfiguration {
  init(): this;

  get streams(): NSArray;
  set streams(value: NSArray<interop.Object> | Array<interop.Object>);

  setStreams(streams: NSArray<interop.Object> | Array<interop.Object>): void;
}

declare class VZGraphicsDeviceConfiguration extends NSObject implements NSCopying {
  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class VZXHCIControllerConfiguration extends VZUSBControllerConfiguration {
  init(): this;
}

declare class VZSingleDirectoryShare extends VZDirectoryShare {
  initWithDirectory(directory: VZSharedDirectory): this;

  readonly directory: VZSharedDirectory;
}

declare class VZDirectorySharingDeviceConfiguration extends NSObject implements NSCopying {
  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class VZVirtioSocketDevice extends VZSocketDevice {
  setSocketListenerForPort(listener: VZVirtioSocketListener, port: number): void;

  removeSocketListenerForPort(port: number): void;

  connectToPortCompletionHandler(port: number, completionHandler: (p1: VZVirtioSocketConnection, p2: NSError) => void | null): void;
}

declare class VZMacOSVirtualMachineStartOptions extends VZVirtualMachineStartOptions {
  startUpFromMacOSRecovery: boolean;

  setStartUpFromMacOSRecovery(startUpFromMacOSRecovery: boolean): void;
}

declare class VZAudioOutputStreamSink extends NSObject {
}

declare class VZMacAuxiliaryStorage extends NSObject {
  initWithURL(URL: NSURL): this;

  initCreatingStorageAtURLHardwareModelOptionsError(URL: NSURL, hardwareModel: VZMacHardwareModel, options: interop.Enum<typeof VZMacAuxiliaryStorageInitializationOptions>, error: interop.PointerConvertible): this;

  readonly URL: NSURL;

  initWithContentsOfURL(URL: NSURL): this;
}

declare class VZVirtioFileSystemDeviceConfiguration extends VZDirectorySharingDeviceConfiguration {
  initWithTag(tag: string): this;

  static validateTagError(tag: string, error: interop.PointerConvertible): boolean;

  tag: string;

  share: VZDirectoryShare;

  static readonly macOSGuestAutomountTag: string;

  setTag(tag: string): void;

  setShare(share: VZDirectoryShare | null): void;
}

declare class VZVirtioSocketConnection extends NSObject {
  readonly destinationPort: number;

  readonly sourcePort: number;

  readonly fileDescriptor: number;

  close(): void;
}

declare class VZMacGraphicsDisplay extends VZGraphicsDisplay {
  readonly pixelsPerInch: number;
}

declare class VZVirtioFileSystemDevice extends VZDirectorySharingDevice {
  readonly tag: string;

  share: VZDirectoryShare;

  setShare(share: VZDirectoryShare | null): void;
}

declare class VZMacKeyboardConfiguration extends VZKeyboardConfiguration {
  init(): this;
}

declare class VZPlatformConfiguration extends NSObject implements NSCopying {
  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class VZLinuxRosettaAbstractSocketCachingOptions extends VZLinuxRosettaCachingOptions {
  initWithNameError(name: string, error: interop.PointerConvertible): this;

  readonly name: string;

  static readonly maximumNameLength: number;
}

declare class VZMacOSConfigurationRequirements extends NSObject {
  readonly hardwareModel: VZMacHardwareModel;

  readonly minimumSupportedCPUCount: number;

  readonly minimumSupportedMemorySize: number;
}

declare class VZVirtioConsoleDeviceConfiguration extends VZConsoleDeviceConfiguration {
  init(): this;

  readonly ports: VZVirtioConsolePortConfigurationArray;
}

declare class VZDirectorySharingDevice extends NSObject {
}

declare class VZGraphicsDisplayConfiguration extends NSObject implements NSCopying {
  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class VZVirtualMachine extends NSObject {
  initWithConfiguration(configuration: VZVirtualMachineConfiguration): this;

  initWithConfigurationQueue(configuration: VZVirtualMachineConfiguration, queue: NSObject): this;

  static readonly supported: boolean;

  readonly state: interop.Enum<typeof VZVirtualMachineState>;

  delegate: VZVirtualMachineDelegate;

  readonly canStart: boolean;

  readonly canStop: boolean;

  readonly canPause: boolean;

  readonly canResume: boolean;

  readonly canRequestStop: boolean;

  readonly consoleDevices: NSArray;

  readonly directorySharingDevices: NSArray;

  readonly graphicsDevices: NSArray;

  readonly memoryBalloonDevices: NSArray;

  readonly networkDevices: NSArray;

  readonly socketDevices: NSArray;

  readonly usbControllers: NSArray;

  startWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  startWithOptionsCompletionHandler(options: VZVirtualMachineStartOptions, completionHandler: (p1: NSError) => void | null): void;

  stopWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  pauseWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  resumeWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  restoreMachineStateFromURLCompletionHandler(saveFileURL: NSURL, completionHandler: (p1: NSError) => void | null): void;

  saveMachineStateToURLCompletionHandler(saveFileURL: NSURL, completionHandler: (p1: NSError) => void | null): void;

  requestStopWithError(error: interop.PointerConvertible): boolean;

  static isSupported(): boolean;

  setDelegate(delegate: VZVirtualMachineDelegate | null): void;
}

declare class VZVirtioTraditionalMemoryBalloonDeviceConfiguration extends VZMemoryBalloonDeviceConfiguration {
  init(): this;
}

declare class VZDirectoryShare extends NSObject {
}

declare class VZMacGraphicsDevice extends VZGraphicsDevice {
}

declare class VZNATNetworkDeviceAttachment extends VZNetworkDeviceAttachment {
  init(): this;
}

declare class VZNVMExpressControllerDeviceConfiguration extends VZStorageDeviceConfiguration {
  initWithAttachment(attachment: VZStorageDeviceAttachment): this;
}

declare class VZPointingDeviceConfiguration extends NSObject implements NSCopying {
  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class VZSocketDevice extends NSObject {
}

declare class VZGraphicsDisplay extends NSObject {
  readonly sizeInPixels: CGSize;

  reconfigureWithSizeInPixelsError(sizeInPixels: CGSize, error: interop.PointerConvertible): boolean;

  reconfigureWithConfigurationError(configuration: VZGraphicsDisplayConfiguration, error: interop.PointerConvertible): boolean;

  addObserver(observer: VZGraphicsDisplayObserver): void;

  removeObserver(observer: VZGraphicsDisplayObserver): void;
}

declare class VZMacOSInstaller extends NSObject {
  initWithVirtualMachineRestoreImageURL(virtualMachine: VZVirtualMachine, restoreImageFileURL: NSURL): this;

  installWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  readonly progress: NSProgress;

  readonly virtualMachine: VZVirtualMachine;

  readonly restoreImageURL: NSURL;
}

declare class VZMacPlatformConfiguration extends VZPlatformConfiguration {
  init(): this;

  hardwareModel: VZMacHardwareModel;

  machineIdentifier: VZMacMachineIdentifier;

  auxiliaryStorage: VZMacAuxiliaryStorage;

  setHardwareModel(hardwareModel: VZMacHardwareModel): void;

  setMachineIdentifier(machineIdentifier: VZMacMachineIdentifier): void;

  setAuxiliaryStorage(auxiliaryStorage: VZMacAuxiliaryStorage | null): void;
}

declare class VZUSBScreenCoordinatePointingDeviceConfiguration extends VZPointingDeviceConfiguration {
  init(): this;
}

declare class VZGraphicsDevice extends NSObject {
  readonly displays: NSArray;
}

declare class VZFileHandleNetworkDeviceAttachment extends VZNetworkDeviceAttachment {
  initWithFileHandle(fileHandle: NSFileHandle): this;

  readonly fileHandle: NSFileHandle;

  maximumTransmissionUnit: number;

  setMaximumTransmissionUnit(maximumTransmissionUnit: number): void;
}

declare class VZMacMachineIdentifier extends NSObject implements NSCopying {
  init(): this;

  initWithDataRepresentation(dataRepresentation: NSData): this;

  readonly dataRepresentation: NSData;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}


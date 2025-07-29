/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const FSKitVersionString: interop.Pointer;

declare const FSOperationIDUnspecified: number;

declare const FSDirectoryVerifierInitial: number;

declare const FSKitErrorDomain: string;

declare const FSKitVersionNumber: number;

declare const FSDirectoryCookieInitial: number;

declare const FSExtentType: {
  Data: 0,
  ZeroFill: 1,
};

declare const FSPreallocateFlags: {
  Contiguous: 2,
  All: 4,
  Persist: 8,
  FromEOF: 16,
};

declare const FSSetXattrPolicy: {
  AlwaysSet: 0,
  MustCreate: 1,
  MustReplace: 2,
  Delete: 3,
};

declare const FSVolumeCaseFormat: {
  Sensitive: 0,
  Insensitive: 1,
  InsensitiveCasePreserving: 2,
};

declare const FSMatchResult: {
  NotRecognized: 0,
  Recognized: 1,
  UsableButLimited: 2,
  Usable: 3,
};

declare const FSContainerState: {
  NotReady: 0,
  Blocked: 1,
  Ready: 2,
  Active: 3,
};

declare const FSAccessMask: {
  ReadData: 2,
  ListDirectory: 2,
  WriteData: 4,
  AddFile: 4,
  Execute: 8,
  Search: 8,
  Delete: 16,
  AppendData: 32,
  AddSubdirectory: 32,
  DeleteChild: 64,
  ReadAttributes: 128,
  WriteAttributes: 256,
  ReadXattr: 512,
  WriteXattr: 1024,
  ReadSecurity: 2048,
  WriteSecurity: 4096,
  TakeOwnership: 8192,
};

declare const FSErrorCode: {
  ModuleLoadFailed: 4500,
  ResourceUnrecognized: 4501,
  ResourceDamaged: 4502,
  ResourceUnusable: 4503,
  StatusOperationInProgress: 4504,
  StatusOperationPaused: 4505,
  InvalidDirectoryCookie: 4506,
};

declare const FSItemDeactivationOptions: {
  Never: 0,
  Always: -1,
  ForRemovedItems: 1,
  ForPreallocatedItems: 2,
};

declare const FSCompleteIOFlags: {
  Read: 256,
  Write: 512,
  Async: 1024,
};

declare const FSDeactivateOptions: {
  FSDeactivateOptionsForce: 1,
};

declare const FSVolumeOpenModes: {
  Read: 1,
  Write: 2,
};

declare const FSItemType: {
  Unknown: 0,
  File: 1,
  Directory: 2,
  Symlink: 3,
  FIFO: 4,
  CharDevice: 5,
  BlockDevice: 6,
  Socket: 7,
};

declare const FSSyncFlags: {
  FSSyncFlagsWait: 1,
  No: 2,
  D: 4,
};

declare const FSItemID: {
  Invalid: 0,
  ParentOfRoot: 1,
  RootDirectory: 2,
};

declare const FSItemAttribute: {
  Type: 1,
  Mode: 2,
  LinkCount: 4,
  UID: 8,
  GID: 16,
  Flags: 32,
  Size: 64,
  AllocSize: 128,
  FileID: 256,
  ParentID: 512,
  AccessTime: 1024,
  ModifyTime: 2048,
  ChangeTime: 4096,
  BirthTime: 8192,
  BackupTime: 16384,
  AddedTime: 32768,
  SupportsLimitedXAttrs: 65536,
  InhibitKernelOffloadedIO: 131072,
};

declare const FSBlockmapFlags: {
  Read: 256,
  Write: 512,
};

declare function fs_errorForPOSIXError(p1: number): NSError;

declare function fs_errorForMachError(errorCode: number): NSError;

declare function fs_errorForCocoaError(errorCode: number): NSError;

declare interface FSVolumeKernelOffloadedIOOperations extends NSObjectProtocol {
  blockmapFileOffsetLengthFlagsOperationIDPackerReplyHandler(file: FSItem, offset: number, length: number, flags: interop.Enum<typeof FSBlockmapFlags>, operationID: number, packer: FSExtentPacker, reply: (p1: NSError) => void | null): void;

  completeIOForFileOffsetLengthStatusFlagsOperationIDReplyHandler(file: FSItem, offset: number, length: number, status: NSError, flags: interop.Enum<typeof FSCompleteIOFlags>, operationID: number, reply: (p1: NSError) => void | null): void;

  createFileNamedInDirectoryAttributesPackerReplyHandler(name: FSFileName, directory: FSItem, attributes: FSItemSetAttributesRequest, packer: FSExtentPacker, reply: (p1: FSItem, p2: FSFileName, p3: NSError) => void | null): void;

  lookupItemNamedInDirectoryPackerReplyHandler(name: FSFileName, directory: FSItem, packer: FSExtentPacker, reply: (p1: FSItem, p2: FSFileName, p3: NSError) => void | null): void;

  preallocateSpaceForFileAtOffsetLengthFlagsPackerReplyHandler?(file: FSItem, offset: number, length: number, flags: interop.Enum<typeof FSPreallocateFlags>, packer: FSExtentPacker, reply: (p1: number, p2: NSError) => void | null): void;
}

declare class FSVolumeKernelOffloadedIOOperations extends NativeObject implements FSVolumeKernelOffloadedIOOperations {
}

declare interface FSVolumePreallocateOperations extends NSObjectProtocol {
  preallocateInhibited?: boolean;

  preallocateSpaceForItemAtOffsetLengthFlagsReplyHandler(item: FSItem, offset: number, length: number, flags: interop.Enum<typeof FSPreallocateFlags>, reply: (p1: number, p2: NSError) => void | null): void;

  isPreallocateInhibited?(): boolean;

  setPreallocateInhibited?(preallocateInhibited: boolean): void;
}

declare class FSVolumePreallocateOperations extends NativeObject implements FSVolumePreallocateOperations {
}

declare interface FSVolumeRenameOperations extends NSObjectProtocol {
  volumeRenameInhibited?: boolean;

  setVolumeNameReplyHandler(name: FSFileName, reply: (p1: FSFileName, p2: NSError) => void | null): void;

  isVolumeRenameInhibited?(): boolean;

  setVolumeRenameInhibited?(volumeRenameInhibited: boolean): void;
}

declare class FSVolumeRenameOperations extends NativeObject implements FSVolumeRenameOperations {
}

declare interface FSVolumeAccessCheckOperations extends NSObjectProtocol {
  accessCheckInhibited?: boolean;

  checkAccessToItemRequestedAccessReplyHandler(theItem: FSItem, access: interop.Enum<typeof FSAccessMask>, reply: (p1: boolean, p2: NSError) => void | null): void;

  isAccessCheckInhibited?(): boolean;

  setAccessCheckInhibited?(accessCheckInhibited: boolean): void;
}

declare class FSVolumeAccessCheckOperations extends NativeObject implements FSVolumeAccessCheckOperations {
}

declare interface FSVolumeXattrOperations extends NSObjectProtocol {
  xattrOperationsInhibited?: boolean;

  supportedXattrNamesForItem?(item: FSItem): NSArray;

  getXattrNamedOfItemReplyHandler(name: FSFileName, item: FSItem, reply: (p1: NSData, p2: NSError) => void | null): void;

  setXattrNamedToDataOnItemPolicyReplyHandler(name: FSFileName, value: NSData | null, item: FSItem, policy: interop.Enum<typeof FSSetXattrPolicy>, reply: (p1: NSError) => void | null): void;

  listXattrsOfItemReplyHandler(item: FSItem, reply: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): void;

  setXattrOperationsInhibited?(xattrOperationsInhibited: boolean): void;
}

declare class FSVolumeXattrOperations extends NativeObject implements FSVolumeXattrOperations {
}

declare interface FSVolumeOperations extends NSObjectProtocol, FSVolumePathConfOperations {
  readonly supportedVolumeCapabilities: FSVolumeSupportedCapabilities;

  readonly volumeStatistics: FSStatFSResult;

  mountWithOptionsReplyHandler(options: FSTaskOptions, reply: (p1: NSError) => void | null): void;

  unmountWithReplyHandler(reply: () => void): void;

  synchronizeWithFlagsReplyHandler(flags: interop.Enum<typeof FSSyncFlags>, reply: (p1: NSError) => void | null): void;

  getAttributesOfItemReplyHandler(desiredAttributes: FSItemGetAttributesRequest, item: FSItem, reply: (p1: FSItemAttributes, p2: NSError) => void | null): void;

  setAttributesOnItemReplyHandler(newAttributes: FSItemSetAttributesRequest, item: FSItem, reply: (p1: FSItemAttributes, p2: NSError) => void | null): void;

  lookupItemNamedInDirectoryReplyHandler(name: FSFileName, directory: FSItem, reply: (p1: FSItem, p2: FSFileName, p3: NSError) => void | null): void;

  reclaimItemReplyHandler(item: FSItem, reply: (p1: NSError) => void | null): void;

  readSymbolicLinkReplyHandler(item: FSItem, reply: (p1: FSFileName, p2: NSError) => void | null): void;

  createItemNamedTypeInDirectoryAttributesReplyHandler(name: FSFileName, type: interop.Enum<typeof FSItemType>, directory: FSItem, newAttributes: FSItemSetAttributesRequest, reply: (p1: FSItem, p2: FSFileName, p3: NSError) => void | null): void;

  createSymbolicLinkNamedInDirectoryAttributesLinkContentsReplyHandler(name: FSFileName, directory: FSItem, newAttributes: FSItemSetAttributesRequest, contents: FSFileName, reply: (p1: FSItem, p2: FSFileName, p3: NSError) => void | null): void;

  createLinkToItemNamedInDirectoryReplyHandler(item: FSItem, name: FSFileName, directory: FSItem, reply: (p1: FSFileName, p2: NSError) => void | null): void;

  removeItemNamedFromDirectoryReplyHandler(item: FSItem, name: FSFileName, directory: FSItem, reply: (p1: NSError) => void | null): void;

  renameItemInDirectoryNamedToNewNameInDirectoryOverItemReplyHandler(item: FSItem, sourceDirectory: FSItem, sourceName: FSFileName, destinationName: FSFileName, destinationDirectory: FSItem, overItem: FSItem | null, reply: (p1: FSFileName, p2: NSError) => void | null): void;

  enumerateDirectoryStartingAtCookieVerifierProvidingAttributesUsingPackerReplyHandler(directory: FSItem, cookie: number, verifier: number, attributes: FSItemGetAttributesRequest | null, packer: FSDirectoryEntryPacker, reply: (p1: number, p2: NSError) => void | null): void;

  activateWithOptionsReplyHandler(options: FSTaskOptions, reply: (p1: FSItem, p2: NSError) => void | null): void;

  deactivateWithOptionsReplyHandler(options: interop.Enum<typeof FSDeactivateOptions>, reply: (p1: NSError) => void | null): void;
}

declare class FSVolumeOperations extends NativeObject implements FSVolumeOperations {
}

declare interface FSManageableResourceMaintenanceOperations extends NSObjectProtocol {
  startCheckWithTaskOptionsError(task: FSTask, options: FSTaskOptions, error: interop.PointerConvertible): NSProgress | null;

  startFormatWithTaskOptionsError(task: FSTask, options: FSTaskOptions, error: interop.PointerConvertible): NSProgress | null;
}

declare class FSManageableResourceMaintenanceOperations extends NativeObject implements FSManageableResourceMaintenanceOperations {
}

declare interface FSFileSystemBase extends NSObjectProtocol {
  containerStatus: FSContainerStatus;

  wipeResourceCompletionHandler(resource: FSBlockDeviceResource, completion: (p1: NSError) => void | null): void;

  setContainerStatus(containerStatus: FSContainerStatus): void;
}

declare class FSFileSystemBase extends NativeObject implements FSFileSystemBase {
}

declare interface FSUnaryFileSystemOperations extends NSObjectProtocol {
  probeResourceReplyHandler(resource: FSResource, replyHandler: (p1: FSProbeResult, p2: NSError) => void | null): void;

  loadResourceOptionsReplyHandler(resource: FSResource, options: FSTaskOptions, replyHandler: (p1: FSVolume, p2: NSError) => void | null): void;

  unloadResourceOptionsReplyHandler(resource: FSResource, options: FSTaskOptions, reply: (p1: NSError) => void | null): void;

  didFinishLoading?(): void;
}

declare class FSUnaryFileSystemOperations extends NativeObject implements FSUnaryFileSystemOperations {
}

declare interface FSVolumeItemDeactivation extends NSObjectProtocol {
  readonly itemDeactivationPolicy: interop.Enum<typeof FSItemDeactivationOptions>;

  deactivateItemReplyHandler(item: FSItem, reply: (p1: NSError) => void | null): void;
}

declare class FSVolumeItemDeactivation extends NativeObject implements FSVolumeItemDeactivation {
}

declare interface FSVolumeReadWriteOperations extends NSObjectProtocol {
  readFromFileOffsetLengthIntoBufferReplyHandler(item: FSItem, offset: number, length: number, buffer: FSMutableFileDataBuffer, reply: (p1: number, p2: NSError) => void | null): void;

  writeContentsToFileAtOffsetReplyHandler(contents: NSData, item: FSItem, offset: number, reply: (p1: number, p2: NSError) => void | null): void;
}

declare class FSVolumeReadWriteOperations extends NativeObject implements FSVolumeReadWriteOperations {
}

declare interface FSVolumePathConfOperations extends NSObjectProtocol {
  readonly maximumLinkCount: number;

  readonly maximumNameLength: number;

  readonly restrictsOwnershipChanges: boolean;

  readonly truncatesLongNames: boolean;

  readonly maximumXattrSize?: number;

  readonly maximumXattrSizeInBits?: number;

  readonly maximumFileSize?: number;

  readonly maximumFileSizeInBits?: number;
}

declare class FSVolumePathConfOperations extends NativeObject implements FSVolumePathConfOperations {
}

declare interface FSVolumeOpenCloseOperations extends NSObjectProtocol {
  openCloseInhibited?: boolean;

  openItemWithModesReplyHandler(item: FSItem, modes: interop.Enum<typeof FSVolumeOpenModes>, reply: (p1: NSError) => void | null): void;

  closeItemKeepingModesReplyHandler(item: FSItem, modes: interop.Enum<typeof FSVolumeOpenModes>, reply: (p1: NSError) => void | null): void;

  isOpenCloseInhibited?(): boolean;

  setOpenCloseInhibited?(openCloseInhibited: boolean): void;
}

declare class FSVolumeOpenCloseOperations extends NativeObject implements FSVolumeOpenCloseOperations {
}

declare class FSFileName extends NSObject implements NSSecureCoding, NSCopying {
  readonly data: NSData;

  readonly string: string;

  readonly debugDescription: string;

  initWithCString(name: string): this;

  initWithBytesLength(bytes: string, length: number): this;

  initWithData(name: NSData): this;

  initWithString(name: string): this;

  static nameWithCString<This extends abstract new (...args: any) => any>(this: This, name: string): InstanceType<This>;

  static nameWithBytesLength<This extends abstract new (...args: any) => any>(this: This, bytes: string, length: number): InstanceType<This>;

  static nameWithData<This extends abstract new (...args: any) => any>(this: This, name: NSData): InstanceType<This>;

  static nameWithString<This extends abstract new (...args: any) => any>(this: This, name: string): InstanceType<This>;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class FSExtentPacker extends NSObject {
  packExtentWithResourceTypeLogicalOffsetPhysicalOffsetLength(resource: FSBlockDeviceResource, type: interop.Enum<typeof FSExtentType>, logicalOffset: number, physicalOffset: number, length: number): boolean;
}

declare class FSContainerStatus extends NSObject implements NSCopying {
  readonly state: interop.Enum<typeof FSContainerState>;

  readonly status: NSError;

  static readonly active: FSContainerStatus;

  static activeWithStatus<This extends abstract new (...args: any) => any>(this: This, errorStatus: NSError): InstanceType<This>;

  static blockedWithStatus<This extends abstract new (...args: any) => any>(this: This, errorStatus: NSError): InstanceType<This>;

  static notReadyWithStatus<This extends abstract new (...args: any) => any>(this: This, errorStatus: NSError): InstanceType<This>;

  static readonly ready: FSContainerStatus;

  static readyWithStatus<This extends abstract new (...args: any) => any>(this: This, errorStatus: NSError): InstanceType<This>;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class FSUnaryFileSystem extends NSObject implements FSFileSystemBase {
  containerStatus: FSContainerStatus;

  wipeResourceCompletionHandler(resource: FSBlockDeviceResource, completion: (p1: NSError) => void | null): void;

  setContainerStatus(containerStatus: FSContainerStatus): void;

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

declare class FSVolume extends NSObject {
  readonly volumeID: FSVolumeIdentifier;

  name: FSFileName;

  initWithVolumeIDVolumeName(volumeID: FSVolumeIdentifier, volumeName: FSFileName): this;

  setName(name: FSFileName): void;
}

declare class FSDirectoryEntryPacker extends NSObject {
  packEntryWithNameItemTypeItemIDNextCookieAttributes(name: FSFileName, itemType: interop.Enum<typeof FSItemType>, itemID: interop.Enum<typeof FSItemID>, nextCookie: number, attributes: FSItemAttributes | null): boolean;
}

declare class FSBlockDeviceResource extends FSResource {
  readonly BSDName: string;

  readonly writable: boolean;

  readonly blockSize: number;

  readonly blockCount: number;

  readonly physicalBlockSize: number;

  readIntoStartingAtLengthCompletionHandler(buffer: interop.PointerConvertible, offset: number, length: number, completionHandler: (p1: number, p2: NSError) => void | null): void;

  readIntoStartingAtLengthError(buffer: interop.PointerConvertible, offset: number, length: number, error: interop.PointerConvertible): number;

  writeFromStartingAtLengthCompletionHandler(buffer: interop.PointerConvertible, offset: number, length: number, completionHandler: (p1: number, p2: NSError) => void | null): void;

  writeFromStartingAtLengthError(buffer: interop.PointerConvertible, offset: number, length: number, error: interop.PointerConvertible): number;

  metadataReadIntoStartingAtLengthError(buffer: interop.PointerConvertible, offset: number, length: number, error: interop.PointerConvertible): boolean;

  metadataWriteFromStartingAtLengthError(buffer: interop.PointerConvertible, offset: number, length: number, error: interop.PointerConvertible): boolean;

  delayedMetadataWriteFromStartingAtLengthError(buffer: interop.PointerConvertible, offset: number, length: number, error: interop.PointerConvertible): boolean;

  metadataFlushWithError(error: interop.PointerConvertible): boolean;

  asynchronousMetadataFlushWithError(error: interop.PointerConvertible): boolean;

  metadataClearWithDelayedWritesError(rangesToClear: NSArray<interop.Object> | Array<interop.Object>, withDelayedWrites: boolean, error: interop.PointerConvertible): boolean;

  metadataPurgeError(rangesToPurge: NSArray<interop.Object> | Array<interop.Object>, error: interop.PointerConvertible): boolean;

  isWritable(): boolean;
}

declare class FSMetadataRange extends NSObject {
  readonly startOffset: number;

  readonly segmentLength: number;

  readonly segmentCount: number;

  initWithOffsetSegmentLengthSegmentCount(startOffset: number, segmentLength: number, segmentCount: number): this;

  static rangeWithOffsetSegmentLengthSegmentCount<This extends abstract new (...args: any) => any>(this: This, startOffset: number, segmentLength: number, segmentCount: number): InstanceType<This>;
}

declare class FSTaskOptions extends NSObject {
  readonly taskOptions: NSArray;

  urlForOption(option: string): NSURL | null;
}

declare class FSTask extends NSObject {
  logMessage(str: string): void;

  didCompleteWithError(error: NSError | null): void;
}

declare class FSItem extends NSObject {
}

declare class FSContainerIdentifier extends FSEntityIdentifier {
  readonly volumeIdentifier: FSVolumeIdentifier;
}

declare class FSEntityIdentifier extends NSObject implements NSCopying, NSSecureCoding {
  init(): this;

  initWithUUID(uuid: NSUUID): this;

  initWithUUIDQualifier(uuid: NSUUID, qualifier: number): this;

  initWithUUIDData(uuid: NSUUID, qualifierData: NSData): this;

  uuid: NSUUID;

  qualifier: NSData;

  setUuid(uuid: NSUUID): void;

  setQualifier(qualifier: NSData | null): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class FSMutableFileDataBuffer extends NSObject {
  readonly length: number;

  mutableBytes(): interop.Pointer;
}

declare class FSItemGetAttributesRequest extends NSObject implements NSSecureCoding {
  wantedAttributes: interop.Enum<typeof FSItemAttribute>;

  isAttributeWanted(attribute: interop.Enum<typeof FSItemAttribute>): boolean;

  setWantedAttributes(wantedAttributes: interop.Enum<typeof FSItemAttribute>): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class FSResource extends NSObject implements NSSecureCoding {
  readonly revoked: boolean;

  makeProxy(): this;

  revoke(): void;

  isRevoked(): boolean;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class FSVolumeSupportedCapabilities extends NSObject implements NSSecureCoding {
  supportsPersistentObjectIDs: boolean;

  supportsSymbolicLinks: boolean;

  supportsHardLinks: boolean;

  supportsJournal: boolean;

  supportsActiveJournal: boolean;

  doesNotSupportRootTimes: boolean;

  supportsSparseFiles: boolean;

  supportsZeroRuns: boolean;

  supportsFastStatFS: boolean;

  supports2TBFiles: boolean;

  supportsOpenDenyModes: boolean;

  supportsHiddenFiles: boolean;

  doesNotSupportVolumeSizes: boolean;

  supports64BitObjectIDs: boolean;

  supportsDocumentID: boolean;

  doesNotSupportImmutableFiles: boolean;

  doesNotSupportSettingFilePermissions: boolean;

  supportsSharedSpace: boolean;

  supportsVolumeGroups: boolean;

  caseFormat: interop.Enum<typeof FSVolumeCaseFormat>;

  setSupportsPersistentObjectIDs(supportsPersistentObjectIDs: boolean): void;

  setSupportsSymbolicLinks(supportsSymbolicLinks: boolean): void;

  setSupportsHardLinks(supportsHardLinks: boolean): void;

  setSupportsJournal(supportsJournal: boolean): void;

  setSupportsActiveJournal(supportsActiveJournal: boolean): void;

  setDoesNotSupportRootTimes(doesNotSupportRootTimes: boolean): void;

  setSupportsSparseFiles(supportsSparseFiles: boolean): void;

  setSupportsZeroRuns(supportsZeroRuns: boolean): void;

  setSupportsFastStatFS(supportsFastStatFS: boolean): void;

  setSupports2TBFiles(supports2TBFiles: boolean): void;

  setSupportsOpenDenyModes(supportsOpenDenyModes: boolean): void;

  setSupportsHiddenFiles(supportsHiddenFiles: boolean): void;

  setDoesNotSupportVolumeSizes(doesNotSupportVolumeSizes: boolean): void;

  setSupports64BitObjectIDs(supports64BitObjectIDs: boolean): void;

  setSupportsDocumentID(supportsDocumentID: boolean): void;

  setDoesNotSupportImmutableFiles(doesNotSupportImmutableFiles: boolean): void;

  setDoesNotSupportSettingFilePermissions(doesNotSupportSettingFilePermissions: boolean): void;

  setSupportsSharedSpace(supportsSharedSpace: boolean): void;

  setSupportsVolumeGroups(supportsVolumeGroups: boolean): void;

  setCaseFormat(caseFormat: interop.Enum<typeof FSVolumeCaseFormat>): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class FSClient extends NSObject {
  static readonly sharedInstance: FSClient;

  fetchInstalledExtensionsWithCompletionHandler(completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): void;
}

declare class FSItemAttributes extends NSObject implements NSSecureCoding {
  invalidateAllProperties(): void;

  uid: number;

  gid: number;

  mode: number;

  type: interop.Enum<typeof FSItemType>;

  linkCount: number;

  flags: number;

  size: number;

  allocSize: number;

  fileID: interop.Enum<typeof FSItemID>;

  parentID: interop.Enum<typeof FSItemID>;

  supportsLimitedXAttrs: boolean;

  inhibitKernelOffloadedIO: boolean;

  modifyTime: timespec;

  addedTime: timespec;

  changeTime: timespec;

  accessTime: timespec;

  birthTime: timespec;

  backupTime: timespec;

  isValid(attribute: interop.Enum<typeof FSItemAttribute>): boolean;

  setUid(uid: number): void;

  setGid(gid: number): void;

  setMode(mode: number): void;

  setType(type: interop.Enum<typeof FSItemType>): void;

  setLinkCount(linkCount: number): void;

  setFlags(flags: number): void;

  setSize(size: number): void;

  setAllocSize(allocSize: number): void;

  setFileID(fileID: interop.Enum<typeof FSItemID>): void;

  setParentID(parentID: interop.Enum<typeof FSItemID>): void;

  setSupportsLimitedXAttrs(supportsLimitedXAttrs: boolean): void;

  setInhibitKernelOffloadedIO(inhibitKernelOffloadedIO: boolean): void;

  setModifyTime(modifyTime: timespec): void;

  setAddedTime(addedTime: timespec): void;

  setChangeTime(changeTime: timespec): void;

  setAccessTime(accessTime: timespec): void;

  setBirthTime(birthTime: timespec): void;

  setBackupTime(backupTime: timespec): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class FSModuleIdentity extends NSObject {
  readonly bundleIdentifier: string;

  readonly url: NSURL;

  readonly enabled: boolean;

  isEnabled(): boolean;
}

declare class FSStatFSResult extends NSObject implements NSSecureCoding {
  blockSize: number;

  ioSize: number;

  totalBlocks: number;

  availableBlocks: number;

  freeBlocks: number;

  usedBlocks: number;

  totalBytes: number;

  availableBytes: number;

  freeBytes: number;

  usedBytes: number;

  totalFiles: number;

  freeFiles: number;

  fileSystemSubType: number;

  readonly fileSystemTypeName: string;

  initWithFileSystemTypeName(fileSystemTypeName: string): this;

  setBlockSize(blockSize: number): void;

  setIoSize(ioSize: number): void;

  setTotalBlocks(totalBlocks: number): void;

  setAvailableBlocks(availableBlocks: number): void;

  setFreeBlocks(freeBlocks: number): void;

  setUsedBlocks(usedBlocks: number): void;

  setTotalBytes(totalBytes: number): void;

  setAvailableBytes(availableBytes: number): void;

  setFreeBytes(freeBytes: number): void;

  setUsedBytes(usedBytes: number): void;

  setTotalFiles(totalFiles: number): void;

  setFreeFiles(freeFiles: number): void;

  setFileSystemSubType(fileSystemSubType: number): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class FSProbeResult extends NSObject implements NSSecureCoding {
  readonly result: interop.Enum<typeof FSMatchResult>;

  readonly name: string;

  readonly containerID: FSContainerIdentifier;

  static readonly notRecognizedProbeResult: FSProbeResult;

  static recognizedProbeResultWithNameContainerID<This extends abstract new (...args: any) => any>(this: This, name: string, containerID: FSContainerIdentifier): InstanceType<This>;

  static readonly usableButLimitedProbeResult: FSProbeResult;

  static usableButLimitedProbeResultWithNameContainerID<This extends abstract new (...args: any) => any>(this: This, name: string, containerID: FSContainerIdentifier): InstanceType<This>;

  static usableProbeResultWithNameContainerID<This extends abstract new (...args: any) => any>(this: This, name: string, containerID: FSContainerIdentifier): InstanceType<This>;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class FSVolumeIdentifier extends FSEntityIdentifier {
}

declare class FSItemSetAttributesRequest extends FSItemAttributes {
  consumedAttributes: interop.Enum<typeof FSItemAttribute>;

  wasAttributeConsumed(attribute: interop.Enum<typeof FSItemAttribute>): boolean;

  setConsumedAttributes(consumedAttributes: interop.Enum<typeof FSItemAttribute>): void;
}


/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const NSFileProviderPendingSetDidChange: string;

declare const NSFileProviderErrorItemKey: string;

declare const NSFileProviderErrorCollidingItemKey: string;

declare const NSFileProviderErrorDomain: string;

declare const NSFileProviderInitialPageSortedByDate: NSData;

declare const NSFileProviderUserInfoExperimentIDKey: string;

declare const NSFileProviderDomainDidChange: string;

declare const NSFileProviderErrorNonExistentItemIdentifierKey: string;

declare const NSFileProviderRootContainerItemIdentifier: string;

declare const NSFileProviderInitialPageSortedByName: NSData;

declare const NSFileProviderTrashContainerItemIdentifier: string;

declare const NSFileProviderMaterializedSetDidChange: string;

declare const NSFileProviderWorkingSetContainerItemIdentifier: string;

declare const NSFileProviderFavoriteRankUnranked: number;

declare const NSFileProviderTestingOperationType: {
  Ingestion: 0,
  Lookup: 1,
  Creation: 2,
  Modification: 3,
  Deletion: 4,
  ContentFetch: 5,
  ChildrenEnumeration: 6,
  CollisionResolution: 7,
};

declare const NSFileProviderDeleteItemOptions: {
  NSFileProviderDeleteItemRecursive: 1,
};

declare const NSFileProviderDomainRemovalMode: {
  NSFileProviderDomainRemovalModeRemoveAll: 0,
};

declare const NSFileProviderModifyItemOptions: {
  MayAlreadyExist: 1,
  FailOnConflict: 2,
  IsImmediateUploadRequestByPresentingApplication: 4,
};

declare const NSFileProviderKnownFolders: {
  Desktop: 1,
  Documents: 2,
};

declare const NSFileProviderErrorCode: {
  NotAuthenticated: -1000,
  FilenameCollision: -1001,
  SyncAnchorExpired: -1002,
  PageExpired: -1002,
  InsufficientQuota: -1003,
  ServerUnreachable: -1004,
  NoSuchItem: -1005,
  DeletionRejected: -1006,
  DirectoryNotEmpty: -1007,
  ProviderNotFound: -2001,
  CannotSynchronize: -2005,
  NonEvictableChildren: -2006,
  UnsyncedEdits: -2007,
  NonEvictable: -2008,
  ExcludedFromSync: -2010,
  DomainDisabled: -2011,
  ProviderDomainTemporarilyUnavailable: -2012,
  ProviderDomainNotFound: -2013,
  ApplicationExtensionNotFound: -2014,
  LocalVersionConflictingWithServer: -2015,
};

declare const NSFileProviderDomainTestingModes: {
  AlwaysEnabled: 1,
  Interactive: 2,
};

declare const NSFileProviderTestingOperationSide: {
  Disk: 0,
  FileProvider: 1,
};

declare const NSFileProviderContentPolicy: {
  Inherited: 0,
  DownloadLazilyAndEvictOnRemoteUpdate: 2,
};

declare const NSFileProviderItemCapabilities: {
  Reading: 1,
  Writing: 2,
  Reparenting: 4,
  Renaming: 8,
  Trashing: 16,
  Deleting: 32,
  Evicting: 64,
  AddingSubItems: 2,
  ContentEnumerating: 1,
  All: 63,
};

declare const NSFileProviderItemFields: {
  Contents: 1,
  Filename: 2,
  ParentItemIdentifier: 4,
  LastUsedDate: 8,
  TagData: 16,
  FavoriteRank: 32,
  CreationDate: 64,
  ContentModificationDate: 128,
  FileSystemFlags: 256,
  ExtendedAttributes: 512,
  TypeAndCreator: 1024,
};

declare const NSFileProviderCreateItemOptions: {
  MayAlreadyExist: 1,
  DeletionConflicted: 2,
};

declare const NSFileProviderFileSystemFlags: {
  UserExecutable: 1,
  UserReadable: 2,
  UserWritable: 4,
  Hidden: 8,
  PathExtensionHidden: 16,
};

declare class NSFileProviderTypeAndCreator {
  constructor(init?: NSFileProviderTypeAndCreator);
  type: number;
  creator: number;
}

declare interface NSFileProviderTestingCollisionResolution extends NSFileProviderTestingOperation {
  readonly side: interop.Enum<typeof NSFileProviderTestingOperationSide>;

  readonly renamedItem: NSFileProviderItem;
}

declare class NSFileProviderTestingCollisionResolution extends NativeObject implements NSFileProviderTestingCollisionResolution {
}

declare interface NSFileProviderTestingModification extends NSFileProviderTestingOperation {
  readonly targetSide: interop.Enum<typeof NSFileProviderTestingOperationSide>;

  readonly sourceItem: NSFileProviderItem;

  readonly targetItemIdentifier: string;

  readonly targetItemBaseVersion: NSFileProviderItemVersion;

  readonly changedFields: interop.Enum<typeof NSFileProviderItemFields>;

  readonly domainVersion: NSFileProviderDomainVersion;
}

declare class NSFileProviderTestingModification extends NativeObject implements NSFileProviderTestingModification {
}

declare interface NSFileProviderTestingCreation extends NSFileProviderTestingOperation {
  readonly targetSide: interop.Enum<typeof NSFileProviderTestingOperationSide>;

  readonly sourceItem: NSFileProviderItem;

  readonly domainVersion: NSFileProviderDomainVersion;
}

declare class NSFileProviderTestingCreation extends NativeObject implements NSFileProviderTestingCreation {
}

declare interface NSFileProviderTestingLookup extends NSFileProviderTestingOperation {
  readonly side: interop.Enum<typeof NSFileProviderTestingOperationSide>;

  readonly itemIdentifier: string;
}

declare class NSFileProviderTestingLookup extends NativeObject implements NSFileProviderTestingLookup {
}

declare interface NSFileProviderTestingIngestion extends NSFileProviderTestingOperation {
  readonly side: interop.Enum<typeof NSFileProviderTestingOperationSide>;

  readonly itemIdentifier: string;

  readonly item: NSFileProviderItem;
}

declare class NSFileProviderTestingIngestion extends NativeObject implements NSFileProviderTestingIngestion {
}

declare interface NSFileProviderTestingOperation extends NSObjectProtocol {
  readonly type: interop.Enum<typeof NSFileProviderTestingOperationType>;

  asIngestion(): NSFileProviderTestingIngestion;

  asLookup(): NSFileProviderTestingLookup;

  asCreation(): NSFileProviderTestingCreation;

  asModification(): NSFileProviderTestingModification;

  asDeletion(): NSFileProviderTestingDeletion;

  asContentFetch(): NSFileProviderTestingContentFetch;

  asChildrenEnumeration(): NSFileProviderTestingChildrenEnumeration;

  asCollisionResolution(): NSFileProviderTestingCollisionResolution;
}

declare class NSFileProviderTestingOperation extends NativeObject implements NSFileProviderTestingOperation {
}

declare interface NSFileProviderCustomAction extends NSObjectProtocol {
  performActionWithIdentifierOnItemsWithIdentifiersCompletionHandler(actionIdentifier: string, itemIdentifiers: NSArray<interop.Object> | Array<interop.Object>, completionHandler: (p1: NSError) => void | null): NSProgress;
}

declare class NSFileProviderCustomAction extends NativeObject implements NSFileProviderCustomAction {
}

declare interface NSFileProviderReplicatedExtension extends NSObjectProtocol, NSFileProviderEnumerating {
  initWithDomain(domain: NSFileProviderDomain): this;

  invalidate(): void;

  itemForIdentifierRequestCompletionHandler(identifier: string, request: NSFileProviderRequest, completionHandler: (p1: NSFileProviderItem, p2: NSError) => void | null): NSProgress;

  fetchContentsForItemWithIdentifierVersionRequestCompletionHandler(itemIdentifier: string, requestedVersion: NSFileProviderItemVersion | null, request: NSFileProviderRequest, completionHandler: (p1: NSURL, p2: NSFileProviderItem, p3: NSError) => void | null): NSProgress;

  createItemBasedOnTemplateFieldsContentsOptionsRequestCompletionHandler(itemTemplate: NSFileProviderItem, fields: interop.Enum<typeof NSFileProviderItemFields>, url: NSURL | null, options: interop.Enum<typeof NSFileProviderCreateItemOptions>, request: NSFileProviderRequest, completionHandler: (p1: NSFileProviderItem, p2: interop.Enum<typeof NSFileProviderItemFields>, p3: boolean, p4: NSError) => void | null): NSProgress;

  modifyItemBaseVersionChangedFieldsContentsOptionsRequestCompletionHandler(item: NSFileProviderItem, version: NSFileProviderItemVersion, changedFields: interop.Enum<typeof NSFileProviderItemFields>, newContents: NSURL | null, options: interop.Enum<typeof NSFileProviderModifyItemOptions>, request: NSFileProviderRequest, completionHandler: (p1: NSFileProviderItem, p2: interop.Enum<typeof NSFileProviderItemFields>, p3: boolean, p4: NSError) => void | null): NSProgress;

  deleteItemWithIdentifierBaseVersionOptionsRequestCompletionHandler(identifier: string, version: NSFileProviderItemVersion, options: interop.Enum<typeof NSFileProviderDeleteItemOptions>, request: NSFileProviderRequest, completionHandler: (p1: NSError) => void | null): NSProgress;

  importDidFinishWithCompletionHandler?(completionHandler: () => void): void;

  materializedItemsDidChangeWithCompletionHandler?(completionHandler: () => void): void;

  pendingItemsDidChangeWithCompletionHandler?(completionHandler: () => void): void;
}

declare class NSFileProviderReplicatedExtension extends NativeObject implements NSFileProviderReplicatedExtension {
}

declare interface NSFileProviderEnumerator extends NSObjectProtocol {
  invalidate(): void;

  enumerateItemsForObserverStartingAtPage(observer: NSFileProviderEnumerationObserver, page: NSData): void;

  enumerateChangesForObserverFromSyncAnchor?(observer: NSFileProviderChangeObserver, syncAnchor: NSData): void;

  currentSyncAnchorWithCompletionHandler?(completionHandler: (p1: NSData) => void | null): void;
}

declare class NSFileProviderEnumerator extends NativeObject implements NSFileProviderEnumerator {
}

declare interface NSFileProviderThumbnailing extends NSObjectProtocol {
  fetchThumbnailsForItemIdentifiersRequestedSizePerThumbnailCompletionHandlerCompletionHandler(itemIdentifiers: NSArray<interop.Object> | Array<interop.Object>, size: CGSize, perThumbnailCompletionHandler: (p1: string, p2: NSData, p3: NSError) => void | null, completionHandler: (p1: NSError) => void | null): NSProgress;
}

declare class NSFileProviderThumbnailing extends NativeObject implements NSFileProviderThumbnailing {
}

declare interface NSFileProviderTestingDeletion extends NSFileProviderTestingOperation {
  readonly targetSide: interop.Enum<typeof NSFileProviderTestingOperationSide>;

  readonly sourceItemIdentifier: string;

  readonly targetItemIdentifier: string;

  readonly targetItemBaseVersion: NSFileProviderItemVersion;

  readonly domainVersion: NSFileProviderDomainVersion;
}

declare class NSFileProviderTestingDeletion extends NativeObject implements NSFileProviderTestingDeletion {
}

declare interface NSFileProviderTestingContentFetch extends NSFileProviderTestingOperation {
  readonly side: interop.Enum<typeof NSFileProviderTestingOperationSide>;

  readonly itemIdentifier: string;
}

declare class NSFileProviderTestingContentFetch extends NativeObject implements NSFileProviderTestingContentFetch {
}

declare interface NSFileProviderItemDecorating extends NSFileProviderItem {
  readonly decorations: NSArray;
}

declare class NSFileProviderItemDecorating extends NativeObject implements NSFileProviderItemDecorating {
}

declare interface NSFileProviderItem extends NSObjectProtocol {
  readonly itemIdentifier: string;

  readonly parentItemIdentifier: string;

  readonly filename: string;

  readonly contentType?: UTType;

  readonly typeIdentifier?: string;

  readonly typeAndCreator?: NSFileProviderTypeAndCreator;

  readonly capabilities?: interop.Enum<typeof NSFileProviderItemCapabilities>;

  readonly fileSystemFlags?: interop.Enum<typeof NSFileProviderFileSystemFlags>;

  readonly documentSize?: NSNumber;

  readonly childItemCount?: NSNumber;

  readonly creationDate?: NSDate;

  readonly contentModificationDate?: NSDate;

  readonly extendedAttributes?: NSDictionary;

  readonly lastUsedDate?: NSDate;

  readonly tagData?: NSData;

  readonly favoriteRank?: NSNumber;

  readonly trashed?: boolean;

  readonly uploaded?: boolean;

  readonly uploading?: boolean;

  readonly uploadingError?: NSError;

  readonly downloaded?: boolean;

  readonly downloading?: boolean;

  readonly downloadingError?: NSError;

  readonly mostRecentVersionDownloaded?: boolean;

  readonly shared?: boolean;

  readonly sharedByCurrentUser?: boolean;

  readonly ownerNameComponents?: NSPersonNameComponents;

  readonly mostRecentEditorNameComponents?: NSPersonNameComponents;

  readonly versionIdentifier?: NSData;

  readonly itemVersion?: NSFileProviderItemVersion;

  readonly symlinkTargetPath?: string;

  readonly userInfo?: NSDictionary;

  readonly contentPolicy?: interop.Enum<typeof NSFileProviderContentPolicy>;

  isTrashed?(): boolean;

  isUploaded?(): boolean;

  isUploading?(): boolean;

  isDownloaded?(): boolean;

  isDownloading?(): boolean;

  isMostRecentVersionDownloaded?(): boolean;

  isShared?(): boolean;

  isSharedByCurrentUser?(): boolean;
}

declare class NSFileProviderItem extends NativeObject implements NSFileProviderItem {
}

declare interface NSFileProviderServicing extends NSObjectProtocol {
  supportedServiceSourcesForItemIdentifierCompletionHandler(itemIdentifier: string, completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): NSProgress;
}

declare class NSFileProviderServicing extends NativeObject implements NSFileProviderServicing {
}

declare interface NSFileProviderPendingSetEnumerator extends NSFileProviderEnumerator {
  readonly domainVersion: NSFileProviderDomainVersion;

  readonly refreshInterval: number;

  readonly maximumSizeReached: boolean;

  isMaximumSizeReached(): boolean;
}

declare class NSFileProviderPendingSetEnumerator extends NativeObject implements NSFileProviderPendingSetEnumerator {
}

declare interface NSFileProviderChangeObserver extends NSObjectProtocol {
  didUpdateItems(updatedItems: NSArray<interop.Object> | Array<interop.Object>): void;

  didDeleteItemsWithIdentifiers(deletedItemIdentifiers: NSArray<interop.Object> | Array<interop.Object>): void;

  finishEnumeratingChangesUpToSyncAnchorMoreComing(anchor: NSData, moreComing: boolean): void;

  finishEnumeratingWithError(error: NSError): void;

  readonly suggestedBatchSize?: number;
}

declare class NSFileProviderChangeObserver extends NativeObject implements NSFileProviderChangeObserver {
}

declare interface NSFileProviderTestingChildrenEnumeration extends NSFileProviderTestingOperation {
  readonly side: interop.Enum<typeof NSFileProviderTestingOperationSide>;

  readonly itemIdentifier: string;
}

declare class NSFileProviderTestingChildrenEnumeration extends NativeObject implements NSFileProviderTestingChildrenEnumeration {
}

declare interface NSFileProviderIncrementalContentFetching extends NSObjectProtocol {
  fetchContentsForItemWithIdentifierVersionUsingExistingContentsAtURLExistingVersionRequestCompletionHandler(itemIdentifier: string, requestedVersion: NSFileProviderItemVersion | null, existingContents: NSURL, existingVersion: NSFileProviderItemVersion, request: NSFileProviderRequest, completionHandler: (p1: NSURL, p2: NSFileProviderItem, p3: NSError) => void | null): NSProgress;
}

declare class NSFileProviderIncrementalContentFetching extends NativeObject implements NSFileProviderIncrementalContentFetching {
}

declare interface NSFileProviderServiceSource {
  readonly serviceName: string;

  makeListenerEndpointAndReturnError(error: interop.PointerConvertible): NSXPCListenerEndpoint;

  readonly restricted?: boolean;

  isRestricted?(): boolean;
}

declare class NSFileProviderServiceSource extends NativeObject implements NSFileProviderServiceSource {
}

declare interface NSFileProviderEnumerationObserver extends NSObjectProtocol {
  didEnumerateItems(updatedItems: NSArray<interop.Object> | Array<interop.Object>): void;

  finishEnumeratingUpToPage(nextPage: NSData | null): void;

  finishEnumeratingWithError(error: NSError): void;

  readonly suggestedPageSize?: number;
}

declare class NSFileProviderEnumerationObserver extends NativeObject implements NSFileProviderEnumerationObserver {
}

declare interface NSFileProviderDomainState extends NSObjectProtocol {
  readonly domainVersion: NSFileProviderDomainVersion;

  readonly userInfo: NSDictionary;
}

declare class NSFileProviderDomainState extends NativeObject implements NSFileProviderDomainState {
}

declare interface NSFileProviderEnumerating extends NSObjectProtocol {
  enumeratorForContainerItemIdentifierRequestError(containerItemIdentifier: string, request: NSFileProviderRequest, error: interop.PointerConvertible): NSFileProviderEnumerator;
}

declare class NSFileProviderEnumerating extends NativeObject implements NSFileProviderEnumerating {
}

declare class NSFileProviderManager extends NSObject {
  static readonly defaultManager: NSFileProviderManager;

  static managerForDomain<This extends abstract new (...args: any) => any>(this: This, domain: NSFileProviderDomain): InstanceType<This>;

  signalEnumeratorForContainerItemIdentifierCompletionHandler(containerItemIdentifier: string, completion: (p1: NSError) => void | null): void;

  getUserVisibleURLForItemIdentifierCompletionHandler(itemIdentifier: string, completionHandler: (p1: NSURL, p2: NSError) => void | null): void;

  static getIdentifierForUserVisibleFileAtURLCompletionHandler(url: NSURL, completionHandler: (p1: string, p2: string, p3: NSError) => void | null): void;

  registerURLSessionTaskForItemWithIdentifierCompletionHandler(task: NSURLSessionTask, identifier: string, completion: (p1: NSError) => void | null): void;

  readonly providerIdentifier: string;

  readonly documentStorageURL: NSURL;

  temporaryDirectoryURLWithError(error: interop.PointerConvertible): NSURL;

  static writePlaceholderAtURLWithMetadataError(placeholderURL: NSURL, metadata: NSFileProviderItem, error: interop.PointerConvertible): boolean;

  static placeholderURLForURL(url: NSURL): NSURL;

  static addDomainCompletionHandler(domain: NSFileProviderDomain, completionHandler: (p1: NSError) => void | null): void;

  static removeDomainCompletionHandler(domain: NSFileProviderDomain, completionHandler: (p1: NSError) => void | null): void;

  static removeDomainModeCompletionHandler(domain: NSFileProviderDomain, mode: interop.Enum<typeof NSFileProviderDomainRemovalMode>, completionHandler: (p1: NSURL, p2: NSError) => void | null): void;

  static getDomainsWithCompletionHandler(completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): void;

  static removeAllDomainsWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  signalErrorResolvedCompletionHandler(error: NSError, completionHandler: (p1: NSError) => void | null): void;

  globalProgressForKind(kind: string): NSProgress;

  enumeratorForMaterializedItems(): NSFileProviderEnumerator;

  enumeratorForPendingItems(): NSFileProviderPendingSetEnumerator;

  static importDomainFromDirectoryAtURLCompletionHandler(domain: NSFileProviderDomain, url: NSURL, completionHandler: (p1: NSError) => void | null): void;

  reimportItemsBelowItemWithIdentifierCompletionHandler(itemIdentifier: string, completionHandler: (p1: NSError) => void | null): void;

  requestModificationOfFieldsForItemWithIdentifierOptionsCompletionHandler(fields: interop.Enum<typeof NSFileProviderItemFields>, itemIdentifier: string, options: interop.Enum<typeof NSFileProviderModifyItemOptions>, completionHandler: (p1: NSError) => void | null): void;

  evictItemWithIdentifierCompletionHandler(itemIdentifier: string, completionHandler: (p1: NSError) => void | null): void;

  waitForChangesOnItemsBelowItemWithIdentifierCompletionHandler(itemIdentifier: string, completionHandler: (p1: NSError) => void | null): void;

  waitForStabilizationWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  getServiceWithNameItemIdentifierCompletionHandler(serviceName: string, itemIdentifier: string, completionHandler: (p1: NSFileProviderService, p2: NSError) => void | null): void;

  listAvailableTestingOperationsWithError(error: interop.PointerConvertible): NSArray;

  runTestingOperationsError(operations: NSArray<interop.Object> | Array<interop.Object>, error: interop.PointerConvertible): NSDictionary;
}

declare class NSFileProviderDomainVersion extends NSObject implements NSSecureCoding {
  next(): NSFileProviderDomainVersion;

  compare(otherVersion: NSFileProviderDomainVersion): interop.Enum<typeof NSComparisonResult>;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class NSFileProviderDomain extends NSObject {
  initWithIdentifierDisplayNamePathRelativeToDocumentStorage(identifier: string, displayName: string, pathRelativeToDocumentStorage: string): this;

  initWithIdentifierDisplayName(identifier: string, displayName: string): this;

  readonly identifier: string;

  readonly displayName: string;

  readonly pathRelativeToDocumentStorage: string;

  readonly userEnabled: boolean;

  readonly replicated: boolean;

  testingModes: interop.Enum<typeof NSFileProviderDomainTestingModes>;

  readonly backingStoreIdentity: NSData;

  supportsSyncingTrash: boolean;

  isReplicated(): boolean;

  setTestingModes(testingModes: interop.Enum<typeof NSFileProviderDomainTestingModes>): void;

  setSupportsSyncingTrash(supportsSyncingTrash: boolean): void;
}

declare class NSFileProviderItemVersion extends NSObject {
  static readonly beforeFirstSyncComponent: NSData;

  initWithContentVersionMetadataVersion(contentVersion: NSData, metadataVersion: NSData): this;

  readonly contentVersion: NSData;

  readonly metadataVersion: NSData;
}

declare class NSFileProviderRequest extends NSObject {
  readonly isSystemRequest: boolean;

  readonly isFileViewerRequest: boolean;

  readonly domainVersion: NSFileProviderDomainVersion;
}

declare class NSFileProviderExtension extends NSObject {
  itemForIdentifierError(identifier: string, error: interop.PointerConvertible): NSFileProviderItem;

  URLForItemWithPersistentIdentifier(identifier: string): NSURL;

  persistentIdentifierForItemAtURL(url: NSURL): string;

  providePlaceholderAtURLCompletionHandler(url: NSURL, completionHandler: (p1: NSError) => void | null): void;

  startProvidingItemAtURLCompletionHandler(url: NSURL, completionHandler: (p1: NSError) => void | null): void;

  stopProvidingItemAtURL(url: NSURL): void;

  itemChangedAtURL(url: NSURL): void;

  static writePlaceholderAtURLWithMetadataError(placeholderURL: NSURL, metadata: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, error: interop.PointerConvertible): boolean;

  static placeholderURLForURL(url: NSURL): NSURL;

  readonly providerIdentifier: string;

  readonly documentStorageURL: NSURL;

  readonly domain: NSFileProviderDomain;

  enumeratorForContainerItemIdentifierError(containerItemIdentifier: string, error: interop.PointerConvertible): NSFileProviderEnumerator;

  importDocumentAtURLToParentItemIdentifierCompletionHandler(fileURL: NSURL, parentItemIdentifier: string, completionHandler: (p1: NSFileProviderItem, p2: NSError) => void | null): void;

  createDirectoryWithNameInParentItemIdentifierCompletionHandler(directoryName: string, parentItemIdentifier: string, completionHandler: (p1: NSFileProviderItem, p2: NSError) => void | null): void;

  renameItemWithIdentifierToNameCompletionHandler(itemIdentifier: string, itemName: string, completionHandler: (p1: NSFileProviderItem, p2: NSError) => void | null): void;

  reparentItemWithIdentifierToParentItemWithIdentifierNewNameCompletionHandler(itemIdentifier: string, parentItemIdentifier: string, newName: string | null, completionHandler: (p1: NSFileProviderItem, p2: NSError) => void | null): void;

  trashItemWithIdentifierCompletionHandler(itemIdentifier: string, completionHandler: (p1: NSFileProviderItem, p2: NSError) => void | null): void;

  untrashItemWithIdentifierToParentItemIdentifierCompletionHandler(itemIdentifier: string, parentItemIdentifier: string | null, completionHandler: (p1: NSFileProviderItem, p2: NSError) => void | null): void;

  deleteItemWithIdentifierCompletionHandler(itemIdentifier: string, completionHandler: (p1: NSError) => void | null): void;

  setLastUsedDateForItemIdentifierCompletionHandler(lastUsedDate: NSDate | null, itemIdentifier: string, completionHandler: (p1: NSFileProviderItem, p2: NSError) => void | null): void;

  setTagDataForItemIdentifierCompletionHandler(tagData: NSData | null, itemIdentifier: string, completionHandler: (p1: NSFileProviderItem, p2: NSError) => void | null): void;

  setFavoriteRankForItemIdentifierCompletionHandler(favoriteRank: NSNumber | null, itemIdentifier: string, completionHandler: (p1: NSFileProviderItem, p2: NSError) => void | null): void;

  supportedServiceSourcesForItemIdentifierError(itemIdentifier: string, error: interop.PointerConvertible): NSArray;

  fetchThumbnailsForItemIdentifiersRequestedSizePerThumbnailCompletionHandlerCompletionHandler(itemIdentifiers: NSArray<interop.Object> | Array<interop.Object>, size: CGSize, perThumbnailCompletionHandler: (p1: string, p2: NSData, p3: NSError) => void | null, completionHandler: (p1: NSError) => void | null): NSProgress;
}


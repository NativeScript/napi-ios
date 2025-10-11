/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const NSFileProviderMaterializedSetDidChange: string;

declare const NSFileProviderErrorNonExistentItemIdentifierKey: string;

declare const NSFileProviderErrorDomain: string;

declare const NSFileProviderUserInfoExperimentIDKey: string;

declare const NSFileProviderWorkingSetContainerItemIdentifier: string;

declare const NSFileProviderDomainDidChange: string;

declare const NSFileProviderErrorItemKey: string;

declare const NSFileProviderPendingSetDidChange: string;

declare const NSFileProviderTrashContainerItemIdentifier: string;

declare const NSFileProviderInitialPageSortedByName: NSData;

declare const NSFileProviderFavoriteRankUnranked: number;

declare const NSFileProviderInitialPageSortedByDate: NSData;

declare const NSFileProviderRootContainerItemIdentifier: string;

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

declare const NSFileProviderKnownFolders: {
  Desktop: 1,
  Documents: 2,
};

declare const NSFileProviderFileSystemFlags: {
  UserExecutable: 1,
  UserReadable: 2,
  UserWritable: 4,
  Hidden: 8,
  PathExtensionHidden: 16,
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

declare const NSFileProviderItemCapabilities: {
  Reading: 1,
  Writing: 2,
  Reparenting: 4,
  Renaming: 8,
  Trashing: 16,
  Deleting: 32,
  Evicting: 64,
  ExcludingFromSync: 128,
  AddingSubItems: 2,
  ContentEnumerating: 1,
  All: 63,
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
  ProviderTranslocated: -2002,
  OlderExtensionVersionRunning: -2003,
  NewerExtensionVersionFound: -2004,
  CannotSynchronize: -2005,
  NonEvictableChildren: -2006,
  UnsyncedEdits: -2007,
  NonEvictable: -2008,
  VersionNoLongerAvailable: -2009,
  ExcludedFromSync: -2010,
  DomainDisabled: -2011,
  ProviderDomainTemporarilyUnavailable: -2012,
  ProviderDomainNotFound: -2013,
  ApplicationExtensionNotFound: -2014,
  LocalVersionConflictingWithServer: -2015,
};

declare const NSFileProviderDomainRemovalMode: {
  RemoveAll: 0,
  PreserveDirtyUserData: 1,
  PreserveDownloadedUserData: 2,
};

declare const NSFileProviderContentPolicy: {
  Inherited: 0,
  DownloadLazily: 1,
  DownloadLazilyAndEvictOnRemoteUpdate: 2,
  DownloadEagerlyAndKeepDownloaded: 3,
};

declare const NSFileProviderModifyItemOptions: {
  MayAlreadyExist: 1,
  FailOnConflict: 2,
  IsImmediateUploadRequestByPresentingApplication: 4,
};

declare const NSFileProviderDomainTestingModes: {
  AlwaysEnabled: 1,
  Interactive: 2,
};

declare const NSFileProviderTestingOperationSide: {
  Disk: 0,
  FileProvider: 1,
};

declare const NSFileProviderManagerDisconnectionOptions: {
  NSFileProviderManagerDisconnectionOptionsTemporary: 1,
};

declare const NSFileProviderVolumeUnsupportedReason: {
  None: 0,
  Unknown: 1,
  NonAPFS: 2,
  NonEncrypted: 4,
  ReadOnly: 8,
  Network: 16,
  Quarantined: 32,
};

declare const NSFileProviderCreateItemOptions: {
  MayAlreadyExist: 1,
  DeletionConflicted: 2,
};

declare const NSFileProviderFetchContentsOptions: {
  NSFileProviderFetchContentsOptionsStrictVersioning: 1,
};

declare const NSFileProviderMaterializationFlags: {
  NSFileProviderMaterializationFlagsKnownSparseRanges: 1,
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

declare interface NSFileProviderTestingChildrenEnumeration extends NSFileProviderTestingOperation {
  readonly side: interop.Enum<typeof NSFileProviderTestingOperationSide>;

  readonly itemIdentifier: string;
}

declare class NSFileProviderTestingChildrenEnumeration extends NativeObject implements NSFileProviderTestingChildrenEnumeration {
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

declare interface NSFileProviderSearching extends NSObjectProtocol {
  searchEnumeratorForStringSearchRequest(request: NSFileProviderStringSearchRequest): NSFileProviderSearchEnumerator;
}

declare class NSFileProviderSearching extends NativeObject implements NSFileProviderSearching {
}

declare interface NSFileProviderSearchResult {
  readonly itemIdentifier: string;

  readonly filename: string;

  readonly creationDate: NSDate;

  readonly contentModificationDate: NSDate;

  readonly lastUsedDate: NSDate;

  readonly contentType: UTType;

  readonly documentSize: NSNumber;
}

declare class NSFileProviderSearchResult extends NativeObject implements NSFileProviderSearchResult {
}

declare interface NSFileProviderPartialContentFetching extends NSObjectProtocol {
  fetchPartialContentsForItemWithIdentifierVersionRequestMinimalRangeAligningToOptionsCompletionHandler(itemIdentifier: string, requestedVersion: NSFileProviderItemVersion, request: NSFileProviderRequest, requestedRange: _NSRange, alignment: number, options: interop.Enum<typeof NSFileProviderFetchContentsOptions>, completionHandler: (p1: NSURL, p2: NSFileProviderItem, p3: _NSRange, p4: interop.Enum<typeof NSFileProviderMaterializationFlags>, p5: NSError) => void | null): NSProgress;
}

declare class NSFileProviderPartialContentFetching extends NativeObject implements NSFileProviderPartialContentFetching {
}

declare interface NSFileProviderTestingIngestion extends NSFileProviderTestingOperation {
  readonly side: interop.Enum<typeof NSFileProviderTestingOperationSide>;

  readonly itemIdentifier: string;

  readonly item: NSFileProviderItem;
}

declare class NSFileProviderTestingIngestion extends NativeObject implements NSFileProviderTestingIngestion {
}

declare interface NSFileProviderDomainState extends NSObjectProtocol {
  readonly domainVersion: NSFileProviderDomainVersion;

  readonly userInfo: NSDictionary;
}

declare class NSFileProviderDomainState extends NativeObject implements NSFileProviderDomainState {
}

declare interface NSFileProviderUserInteractionSuppressing extends NSObjectProtocol {
  setInteractionSuppressedForIdentifier(suppression: boolean, suppressionIdentifier: string): void;

  isInteractionSuppressedForIdentifier(suppressionIdentifier: string): boolean;
}

declare class NSFileProviderUserInteractionSuppressing extends NativeObject implements NSFileProviderUserInteractionSuppressing {
}

declare interface NSFileProviderEnumerating extends NSObjectProtocol {
  enumeratorForContainerItemIdentifierRequestError(containerItemIdentifier: string, request: NSFileProviderRequest, error: interop.PointerConvertible): NSFileProviderEnumerator;
}

declare class NSFileProviderEnumerating extends NativeObject implements NSFileProviderEnumerating {
}

declare interface NSFileProviderPendingSetEnumerator extends NSFileProviderEnumerator {
  readonly domainVersion: NSFileProviderDomainVersion;

  readonly refreshInterval: number;

  readonly maximumSizeReached: boolean;

  isMaximumSizeReached(): boolean;
}

declare class NSFileProviderPendingSetEnumerator extends NativeObject implements NSFileProviderPendingSetEnumerator {
}

declare interface NSFileProviderEnumerator extends NSObjectProtocol {
  invalidate(): void;

  enumerateItemsForObserverStartingAtPage(observer: NSFileProviderEnumerationObserver, page: NSData): void;

  enumerateChangesForObserverFromSyncAnchor?(observer: NSFileProviderChangeObserver, syncAnchor: NSData): void;

  currentSyncAnchorWithCompletionHandler?(completionHandler: (p1: NSData) => void | null): void;
}

declare class NSFileProviderEnumerator extends NativeObject implements NSFileProviderEnumerator {
}

declare interface NSFileProviderEnumerationObserver extends NSObjectProtocol {
  didEnumerateItems(updatedItems: NSArray<interop.Object> | Array<interop.Object>): void;

  finishEnumeratingUpToPage(nextPage: NSData | null): void;

  finishEnumeratingWithError(error: NSError): void;

  readonly suggestedPageSize?: number;
}

declare class NSFileProviderEnumerationObserver extends NativeObject implements NSFileProviderEnumerationObserver {
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

declare interface NSFileProviderServicing extends NSObjectProtocol {
  supportedServiceSourcesForItemIdentifierCompletionHandler(itemIdentifier: string, completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): NSProgress;
}

declare class NSFileProviderServicing extends NativeObject implements NSFileProviderServicing {
}

declare interface NSFileProviderExternalVolumeHandling extends NSObjectProtocol {
  shouldConnectExternalDomainWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;
}

declare class NSFileProviderExternalVolumeHandling extends NativeObject implements NSFileProviderExternalVolumeHandling {
}

declare interface NSFileProviderThumbnailing extends NSObjectProtocol {
  fetchThumbnailsForItemIdentifiersRequestedSizePerThumbnailCompletionHandlerCompletionHandler(itemIdentifiers: NSArray<interop.Object> | Array<interop.Object>, size: CGSize, perThumbnailCompletionHandler: (p1: string, p2: NSData, p3: NSError) => void | null, completionHandler: (p1: NSError) => void | null): NSProgress;
}

declare class NSFileProviderThumbnailing extends NativeObject implements NSFileProviderThumbnailing {
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

declare interface NSFileProviderTestingDeletion extends NSFileProviderTestingOperation {
  readonly targetSide: interop.Enum<typeof NSFileProviderTestingOperationSide>;

  readonly sourceItemIdentifier: string;

  readonly targetItemIdentifier: string;

  readonly targetItemBaseVersion: NSFileProviderItemVersion;

  readonly domainVersion: NSFileProviderDomainVersion;
}

declare class NSFileProviderTestingDeletion extends NativeObject implements NSFileProviderTestingDeletion {
}

declare interface NSFileProviderSearchEnumerator extends NSObjectProtocol {
  invalidate(): void;

  enumerateSearchResultsForObserverStartingAtPage(observer: NSFileProviderSearchEnumerationObserver, page: NSData | null): void;
}

declare class NSFileProviderSearchEnumerator extends NativeObject implements NSFileProviderSearchEnumerator {
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

declare interface NSFileProviderIncrementalContentFetching extends NSObjectProtocol {
  fetchContentsForItemWithIdentifierVersionUsingExistingContentsAtURLExistingVersionRequestCompletionHandler(itemIdentifier: string, requestedVersion: NSFileProviderItemVersion | null, existingContents: NSURL, existingVersion: NSFileProviderItemVersion, request: NSFileProviderRequest, completionHandler: (p1: NSURL, p2: NSFileProviderItem, p3: NSError) => void | null): NSProgress;
}

declare class NSFileProviderIncrementalContentFetching extends NativeObject implements NSFileProviderIncrementalContentFetching {
}

declare interface NSFileProviderTestingLookup extends NSFileProviderTestingOperation {
  readonly side: interop.Enum<typeof NSFileProviderTestingOperationSide>;

  readonly itemIdentifier: string;
}

declare class NSFileProviderTestingLookup extends NativeObject implements NSFileProviderTestingLookup {
}

declare interface NSFileProviderSearchEnumerationObserver extends NSObjectProtocol {
  didEnumerateSearchResults(searchResults: NSArray<interop.Object> | Array<interop.Object>): void;

  finishEnumeratingUpToPage(nextPage: NSData | null): void;

  finishEnumeratingWithError(error: NSError): void;

  readonly maximumNumberOfResultsPerPage: number;
}

declare class NSFileProviderSearchEnumerationObserver extends NativeObject implements NSFileProviderSearchEnumerationObserver {
}

declare interface NSFileProviderKnownFolderSupporting extends NSObjectProtocol {
  getKnownFolderLocationsCompletionHandler(knownFolders: interop.Enum<typeof NSFileProviderKnownFolders>, completionHandler: (p1: NSFileProviderKnownFolderLocations, p2: NSError) => void | null): void;
}

declare class NSFileProviderKnownFolderSupporting extends NativeObject implements NSFileProviderKnownFolderSupporting {
}

declare interface NSFileProviderCustomAction extends NSObjectProtocol {
  performActionWithIdentifierOnItemsWithIdentifiersCompletionHandler(actionIdentifier: string, itemIdentifiers: NSArray<interop.Object> | Array<interop.Object>, completionHandler: (p1: NSError) => void | null): NSProgress;
}

declare class NSFileProviderCustomAction extends NativeObject implements NSFileProviderCustomAction {
}

declare interface NSFileProviderServiceSource {
  readonly serviceName: string;

  makeListenerEndpointAndReturnError(error: interop.PointerConvertible): NSXPCListenerEndpoint;

  readonly restricted?: boolean;

  isRestricted?(): boolean;
}

declare class NSFileProviderServiceSource extends NativeObject implements NSFileProviderServiceSource {
}

declare interface NSFileProviderItem extends NSObjectProtocol {
  readonly itemIdentifier: string;

  readonly parentItemIdentifier: string;

  readonly filename: string;

  readonly contentType?: UTType;

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

  readonly itemVersion?: NSFileProviderItemVersion;

  readonly symlinkTargetPath?: string;

  readonly userInfo?: NSDictionary;

  readonly contentPolicy?: interop.Enum<typeof NSFileProviderContentPolicy>;

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

declare class NSFileProviderStringSearchRequest extends NSObject {
  readonly query: string;

  readonly desiredNumberOfResults: number;
}

declare class NSFileProviderRequest extends NSObject {
  readonly isSystemRequest: boolean;

  readonly isFileViewerRequest: boolean;

  readonly requestingExecutable: NSURL;

  readonly domainVersion: NSFileProviderDomainVersion;
}

declare class NSFileProviderDomain extends NSObject {
  initWithIdentifierDisplayName(identifier: string, displayName: string): this;

  initWithDisplayNameUserInfoVolumeURL(displayName: string, userInfo: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, volumeURL: NSURL | null): this;

  readonly identifier: string;

  readonly displayName: string;

  readonly disconnected: boolean;

  readonly userEnabled: boolean;

  hidden: boolean;

  readonly replicated: boolean;

  testingModes: interop.Enum<typeof NSFileProviderDomainTestingModes>;

  readonly backingStoreIdentity: NSData;

  supportsSyncingTrash: boolean;

  readonly volumeUUID: NSUUID;

  get userInfo(): NSDictionary;
  set userInfo(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  readonly replicatedKnownFolders: interop.Enum<typeof NSFileProviderKnownFolders>;

  supportedKnownFolders: interop.Enum<typeof NSFileProviderKnownFolders>;

  supportsStringSearchRequest: boolean;

  isDisconnected(): boolean;

  isHidden(): boolean;

  setHidden(hidden: boolean): void;

  isReplicated(): boolean;

  setTestingModes(testingModes: interop.Enum<typeof NSFileProviderDomainTestingModes>): void;

  setSupportsSyncingTrash(supportsSyncingTrash: boolean): void;

  setUserInfo(userInfo: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): void;

  setSupportedKnownFolders(supportedKnownFolders: interop.Enum<typeof NSFileProviderKnownFolders>): void;

  setSupportsStringSearchRequest(supportsStringSearchRequest: boolean): void;
}

declare class NSFileProviderDomainVersion extends NSObject implements NSSecureCoding {
  next(): NSFileProviderDomainVersion;

  compare(otherVersion: NSFileProviderDomainVersion): interop.Enum<typeof NSComparisonResult>;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class NSFileProviderKnownFolderLocations extends NSObject {
  shouldCreateBinaryCompatibilitySymlink: boolean;

  desktopLocation: NSFileProviderKnownFolderLocation;

  documentsLocation: NSFileProviderKnownFolderLocation;

  init(): this;

  setShouldCreateBinaryCompatibilitySymlink(shouldCreateBinaryCompatibilitySymlink: boolean): void;

  setDesktopLocation(desktopLocation: NSFileProviderKnownFolderLocation | null): void;

  setDocumentsLocation(documentsLocation: NSFileProviderKnownFolderLocation | null): void;
}

declare class NSFileProviderKnownFolderLocation extends NSObject {
  initWithParentItemIdentifierFilename(parentItemIdentifier: string, filename: string): this;

  initWithExistingItemIdentifier(existingItemIdentifier: string): this;
}

declare class NSFileProviderItemVersion extends NSObject {
  static readonly beforeFirstSyncComponent: NSData;

  initWithContentVersionMetadataVersion(contentVersion: NSData, metadataVersion: NSData): this;

  readonly contentVersion: NSData;

  readonly metadataVersion: NSData;
}

declare class NSFileProviderManager extends NSObject {
  static managerForDomain<This extends abstract new (...args: any) => any>(this: This, domain: NSFileProviderDomain): InstanceType<This>;

  signalEnumeratorForContainerItemIdentifierCompletionHandler(containerItemIdentifier: string, completion: (p1: NSError) => void | null): void;

  getUserVisibleURLForItemIdentifierCompletionHandler(itemIdentifier: string, completionHandler: (p1: NSURL, p2: NSError) => void | null): void;

  static getIdentifierForUserVisibleFileAtURLCompletionHandler(url: NSURL, completionHandler: (p1: string, p2: string, p3: NSError) => void | null): void;

  registerURLSessionTaskForItemWithIdentifierCompletionHandler(task: NSURLSessionTask, identifier: string, completion: (p1: NSError) => void | null): void;

  temporaryDirectoryURLWithError(error: interop.PointerConvertible): NSURL;

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

  disconnectWithReasonOptionsCompletionHandler(localizedReason: string, options: interop.Enum<typeof NSFileProviderManagerDisconnectionOptions>, completionHandler: (p1: NSError) => void | null): void;

  reconnectWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  requestDownloadForItemWithIdentifierRequestedRangeCompletionHandler(itemIdentifier: string, rangeToMaterialize: _NSRange, completionHandler: (p1: NSError) => void | null): void;

  stateDirectoryURLWithError(error: interop.PointerConvertible): NSURL;

  static checkDomainsCanBeStoredOnVolumeAtURLUnsupportedReasonError(eligible: interop.PointerConvertible, url: NSURL, unsupportedReason: interop.PointerConvertible, error: interop.PointerConvertible): boolean;

  requestDiagnosticCollectionForItemWithIdentifierErrorReasonCompletionHandler(itemIdentifier: string, errorReason: NSError, completionHandler: (p1: NSError) => void | null): void;

  getServiceWithNameItemIdentifierCompletionHandler(serviceName: string, itemIdentifier: string, completionHandler: (p1: NSFileProviderService, p2: NSError) => void | null): void;

  listAvailableTestingOperationsWithError(error: interop.PointerConvertible): NSArray;

  runTestingOperationsError(operations: NSArray<interop.Object> | Array<interop.Object>, error: interop.PointerConvertible): NSDictionary;

  claimKnownFoldersLocalizedReasonCompletionHandler(knownFolders: NSFileProviderKnownFolderLocations, localizedReason: string, completionHandler: (p1: NSError) => void | null): void;

  releaseKnownFoldersLocalizedReasonCompletionHandler(knownFolders: interop.Enum<typeof NSFileProviderKnownFolders>, localizedReason: string, completionHandler: (p1: NSError) => void | null): void;
}


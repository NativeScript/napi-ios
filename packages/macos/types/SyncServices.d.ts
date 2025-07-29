/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const ISyncInvalidArgumentsException: string;

declare const ISyncInvalidSchemaException: string;

declare const ISyncSessionDriverFatalError: number;

declare const ISyncSessionDriverRegistrationError: number;

declare const ISyncSessionUserCanceledSessionError: number;

declare const ISyncErrorDomain: string;

declare const ISyncRecordEntityNameKey: string;

declare const ISyncUnsupportedEntityException: string;

declare const ISyncInvalidRecordsKey: string;

declare const ISyncInvalidRecordReasonsKey: string;

declare const ISyncInvalidRecordIdentifiersKey: string;

declare const ISyncSessionCancelledException: string;

declare const ISyncServerUnavailableException: string;

declare const ISyncAvailabilityChangedNotification: string;

declare const ISyncClientTypePeer: string;

declare const ISyncChangePropertyValueIsDefaultKey: string;

declare const ISyncChangePropertyValueKey: string;

declare const ISyncChangePropertyNameKey: string;

declare const ISyncChangePropertyClear: string;

declare const ISyncChangePropertySet: string;

declare const ISyncInvalidEntityException: string;

declare const ISyncClientTypeDevice: string;

declare const ISyncChangePropertyActionKey: string;

declare const ISyncSessionDriverPullFailureError: number;

declare const ISyncClientTypeServer: string;

declare const ISyncInvalidRecordException: string;

declare const ISyncClientTypeApplication: string;

declare const ISyncSessionUnavailableException: string;

declare const ISyncSessionClientAlreadySyncingError: number;

declare const ISyncServerDisabledReason: {
  None: 1000,
  ByPreference: 1001,
  SharedNetworkHome: 1002,
  Unresponsive: 1003,
  Unknown: 1004,
};

declare const ISyncSessionDriverChangeResult: {
  Refused: 0,
  Accepted: 1,
  Ignored: 2,
  Error: 3,
};

declare const __ISyncChangeType: {
  None: 0,
  Add: 1,
  Modify: 2,
  Delete: 3,
};

declare const ISyncSessionDriverMode: {
  Fast: 1,
  Slow: 2,
  Refresh: 3,
};

declare const __ISyncStatus: {
  Running: 1,
  Success: 2,
  Warnings: 3,
  Errors: 4,
  Cancelled: 5,
  Failed: 6,
  Never: 7,
};

declare interface NSPersistentStoreCoordinatorSyncing extends NSObjectProtocol {
  managedObjectContextsToMonitorWhenSyncingPersistentStoreCoordinator?(coordinator: NSPersistentStoreCoordinator): NSArray;

  managedObjectContextsToReloadAfterSyncingPersistentStoreCoordinator?(coordinator: NSPersistentStoreCoordinator): NSArray;

  persistentStoreCoordinatorShouldStartSyncing?(coordinator: NSPersistentStoreCoordinator): boolean;

  persistentStoreCoordinatorWillPushChangesInSyncSession?(coordinator: NSPersistentStoreCoordinator, session: ISyncSession): void;

  persistentStoreCoordinatorDidPushChangesInSyncSession?(coordinator: NSPersistentStoreCoordinator, session: ISyncSession): void;

  persistentStoreCoordinatorWillPullChangesInSyncSession?(coordinator: NSPersistentStoreCoordinator, session: ISyncSession): void;

  persistentStoreCoordinatorDidPullChangesInSyncSession?(coordinator: NSPersistentStoreCoordinator, session: ISyncSession): void;

  persistentStoreCoordinatorDidFinishSyncSession?(coordinator: NSPersistentStoreCoordinator, session: ISyncSession): void;

  persistentStoreCoordinatorDidCancelSyncSessionError?(coordinator: NSPersistentStoreCoordinator, session: ISyncSession, error: NSError): void;

  persistentStoreCoordinatorWillPushRecordForManagedObjectInSyncSession?(coordinator: NSPersistentStoreCoordinator, record: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, managedObject: NSManagedObject, session: ISyncSession): NSDictionary;

  persistentStoreCoordinatorWillDeleteRecordWithIdentifierInSyncSession?(coordinator: NSPersistentStoreCoordinator, identifier: string, session: ISyncSession): boolean;

  persistentStoreCoordinatorWillApplyChangeToManagedObjectInSyncSession?(coordinator: NSPersistentStoreCoordinator, change: ISyncChange, managedObject: NSManagedObject, session: ISyncSession): ISyncChange;

  persistentStoreCoordinatorDidApplyChangeToManagedObjectInSyncSession?(coordinator: NSPersistentStoreCoordinator, change: ISyncChange, managedObject: NSManagedObject, session: ISyncSession): void;

  persistentStoreCoordinatorDidCommitChangesInSyncSession?(coordinator: NSPersistentStoreCoordinator, changes: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, session: ISyncSession): void;
}

declare class NSPersistentStoreCoordinatorSyncing extends NativeObject implements NSPersistentStoreCoordinatorSyncing {
}

declare interface ISyncSessionDriverDataSource {
  clientIdentifier(): string;

  clientDescriptionURL(): NSURL;

  schemaBundleURLs(): NSArray;

  preferredSyncModeForEntityName(entity: string): interop.Enum<typeof ISyncSessionDriverMode>;

  recordsForEntityNameMoreComingError(entity: string, moreComing: interop.PointerConvertible, outError: interop.PointerConvertible): NSDictionary;

  applyChangeForEntityNameRemappedRecordIdentifierFormattedRecordError(change: ISyncChange, entityName: string, outRecordIdentifier: interop.PointerConvertible, outRecord: interop.PointerConvertible, outError: interop.PointerConvertible): interop.Enum<typeof ISyncSessionDriverChangeResult>;

  deleteAllRecordsForEntityNameError(entityName: string, outError: interop.PointerConvertible): boolean;

  entityNamesToSync?(): NSArray;

  entityNamesToPull?(): NSArray;

  sessionBeginTimeout?(): number;

  sessionPullChangesTimeout?(): number;

  lastAnchorForEntityName?(entityName: string): string;

  nextAnchorForEntityName?(entityName: string): string;

  changedRecordsForEntityNameMoreComingError?(entity: string, moreComing: interop.PointerConvertible, outError: interop.PointerConvertible): NSDictionary;

  changesForEntityNameMoreComingError?(entity: string, moreComing: interop.PointerConvertible, outError: interop.PointerConvertible): NSArray;

  identifiersForRecordsToDeleteForEntityNameMoreComingError?(entityName: string, moreComing: interop.PointerConvertible, outError: interop.PointerConvertible): NSArray;
}

declare class ISyncSessionDriverDataSource extends NativeObject implements ISyncSessionDriverDataSource {
}

declare interface ISyncFiltering extends NSCoding {
  isEqual(anotherFilter: interop.Object): boolean;

  supportedEntityNames(): NSArray;

  shouldApplyRecordWithRecordIdentifier(record: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, recordId: string): boolean;
}

declare class ISyncFiltering extends NativeObject implements ISyncFiltering {
}

declare class ISyncSession extends NSObject {
  static beginSessionWithClientEntityNamesBeforeDate(client: ISyncClient, entityNames: NSArray<interop.Object> | Array<interop.Object>, date: NSDate): ISyncSession;

  static beginSessionInBackgroundWithClientEntityNamesTargetSelector(client: ISyncClient, entityNames: NSArray<interop.Object> | Array<interop.Object>, target: interop.Object, selector: string): void;

  static cancelPreviousBeginSessionWithClient(client: ISyncClient): void;

  static beginSessionWithClientEntityNamesBeforeDateLastAnchors(client: ISyncClient, entityNames: NSArray<interop.Object> | Array<interop.Object>, date: NSDate, anchors: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): ISyncSession;

  static beginSessionInBackgroundWithClientEntityNamesTargetSelectorLastAnchors(client: ISyncClient, entityNames: NSArray<interop.Object> | Array<interop.Object>, target: interop.Object, selector: string, anchors: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  clientDidResetEntityNames(entityNames: NSArray<interop.Object> | Array<interop.Object>): void;

  clientWantsToPushAllRecordsForEntityNames(entityNames: NSArray<interop.Object> | Array<interop.Object>): void;

  shouldPushChangesForEntityName(entityName: string): boolean;

  shouldPushAllRecordsForEntityName(entityName: string): boolean;

  shouldPullChangesForEntityName(entityName: string): boolean;

  shouldReplaceAllRecordsOnClientForEntityName(entityName: string): boolean;

  pushChange(change: ISyncChange): void;

  pushChangesFromRecordWithIdentifier(record: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, recordId: string): void;

  deleteRecordWithIdentifier(recordId: string): void;

  clientLostRecordWithIdentifierShouldReplaceOnNextSync(recordId: string, flag: boolean): void;

  clientFinishedPushingChangesWithNextAnchors(anchors: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  prepareToPullChangesForEntityNamesBeforeDate(entityNames: NSArray<interop.Object> | Array<interop.Object>, date: NSDate): boolean;

  prepareToPullChangesInBackgroundForEntityNamesTargetSelector(entityNames: NSArray<interop.Object> | Array<interop.Object>, target: interop.Object, selector: string): void;

  changeEnumeratorForEntityNames(entityNames: NSArray<interop.Object> | Array<interop.Object>): NSEnumerator;

  clientAcceptedChangesForRecordWithIdentifierFormattedRecordNewRecordIdentifier(recordId: string, formattedRecord: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, recordId_: string): void;

  clientRefusedChangesForRecordWithIdentifier(recordId: string): void;

  clientCommittedAcceptedChanges(): void;

  clientCommittedAcceptedChangesWithNextAnchors(anchors: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  clientChangedRecordIdentifiers(oldToNew: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  isCancelled(): boolean;

  cancelSyncing(): void;

  finishSyncing(): void;

  clientInfoForRecordWithIdentifier(recordId: string): interop.Object;

  setClientInfoForRecordWithIdentifier(clientInfo: NSCoding, recordId: string): void;

  snapshotOfRecordsInTruth(): ISyncRecordSnapshot;

  ping(): void;
}

declare class ISyncChange extends NSObject {
  static changeWithTypeRecordIdentifierChanges(type: number, recordIdentifier: string, changes: NSArray<interop.Object> | Array<interop.Object>): interop.Object;

  initWithChangeTypeRecordIdentifierChanges(type: number, recordIdentifier: string, changes: NSArray<interop.Object> | Array<interop.Object>): this;

  type(): number;

  recordIdentifier(): string;

  record(): NSDictionary;

  changes(): NSArray;
}

declare class ISyncClient extends NSObject {
  clientIdentifier(): string;

  clientType(): string;

  displayName(): string;

  setDisplayName(displayName: string): void;

  imagePath(): string;

  setImagePath(path: string): void;

  supportedEntityNames(): NSArray;

  canPushChangesForEntityName(entityName: string): boolean;

  canPullChangesForEntityName(entityName: string): boolean;

  lastSyncDateForEntityName(entityName: string): NSDate;

  lastSyncStatusForEntityName(entityName: string): number;

  enabledEntityNames(): NSArray;

  isEnabledForEntityName(entityName: string): boolean;

  setEnabledForEntityNames(flag: boolean, entityNames: NSArray<interop.Object> | Array<interop.Object>): void;

  formatsRelationships(): boolean;

  setFormatsRelationships(flag: boolean): void;

  shouldReplaceClientRecordsForEntityName(entityName: string): boolean;

  setShouldReplaceClientRecordsForEntityNames(flag: boolean, entityNames: NSArray<interop.Object> | Array<interop.Object>): void;

  objectForKey(key: string): interop.Object;

  setObjectForKey(value: NSCoding, key: string): void;

  filters(): NSArray;

  setFilters(filters: NSArray<interop.Object> | Array<interop.Object>): void;

  shouldSynchronizeWithClientsOfType(clientType: string): boolean;

  setShouldSynchronizeWithClientsOfType(flag: boolean, clientType: string): void;

  syncAlertToolPath(): string;

  setSyncAlertToolPath(path: string): void;

  setSyncAlertHandlerSelector(handler: interop.Object, selector: string): void;
}

declare class ISyncFilter extends NSObject {
  static filterMatchingAllFilters(filters: NSArray<interop.Object> | Array<interop.Object>): ISyncFiltering;

  static filterMatchingAtLeastOneFilter(filters: NSArray<interop.Object> | Array<interop.Object>): ISyncFiltering;
}

declare class ISyncSessionDriver extends NSObject {
  static sessionDriverWithDataSource(dataSource: ISyncSessionDriverDataSource): ISyncSessionDriver;

  sync(): boolean;

  startAsynchronousSync(outError: interop.PointerConvertible): boolean;

  lastError(): NSError;

  dataSource(): ISyncSessionDriverDataSource;

  setDelegate(delegate: interop.Object): void;

  delegate(): interop.Object;

  setHandlesSyncAlerts(yesOrNo: boolean): void;

  handlesSyncAlerts(): boolean;

  client(): ISyncClient;

  session(): ISyncSession;

  finishSyncing(): void;
}

declare class ISyncRecordReference extends NSObject implements NSCoding {
  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ISyncManager extends NSObject {
  static sharedManager(): ISyncManager;

  isEnabled(): boolean;

  syncDisabledReason(): NSError;

  clientWithIdentifier(clientId: string): ISyncClient;

  registerClientWithIdentifierDescriptionFilePath(clientId: string, descriptionFilePath: string): ISyncClient;

  unregisterClient(client: ISyncClient): void;

  registerSchemaWithBundlePath(bundlePath: string): boolean;

  unregisterSchemaWithName(schemaName: string): void;

  clientWithIdentifierNeedsSyncing(clientId: string, flag: boolean): void;

  snapshotOfRecordsInTruthWithEntityNamesUsingIdentifiersForClient(entityNames: NSArray<interop.Object> | Array<interop.Object>, client: ISyncClient): ISyncRecordSnapshot;

  addRequestMode(mode: string): void;

  removeRequestMode(mode: string): void;

  requestModes(): NSArray;
}

declare class ISyncRecordSnapshot extends NSObject {
  recordsWithIdentifiers(recordIds: NSArray<interop.Object> | Array<interop.Object>): NSDictionary;

  targetIdentifiersForRelationshipNameWithSourceIdentifier(relationshipName: string, sourceId: string): NSArray;

  sourceIdentifiersForRelationshipNameWithTargetIdentifier(relationshipName: string, sourceId: string): NSArray;

  recordsWithMatchingAttributes(attributes: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): NSDictionary;

  recordReferenceForRecordWithIdentifier(identifier: string): ISyncRecordReference;

  recordIdentifierForReferenceIsModified(reference: ISyncRecordReference, pModified: interop.PointerConvertible): string;
}


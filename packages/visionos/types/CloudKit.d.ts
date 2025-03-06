/// <reference types="@nativescript/objc-node-api" />

declare const CKSyncEnginePendingDatabaseChangeType: {
  Save: 0,
  Delete: 1,
};

declare const CKSyncEngineEventType: {
  StateUpdate: 0,
  AccountChange: 1,
  FetchedDatabaseChanges: 2,
  FetchedRecordZoneChanges: 3,
  SentDatabaseChanges: 4,
  SentRecordZoneChanges: 5,
  WillFetchChanges: 6,
  WillFetchRecordZoneChanges: 7,
  DidFetchRecordZoneChanges: 8,
  DidFetchChanges: 9,
  WillSendChanges: 10,
  DidSendChanges: 11,
};

declare const CKSyncEngineZoneDeletionReason: {
  Deleted: 0,
  Purged: 1,
  EncryptedDataReset: 2,
};

declare const CKSyncEngineAccountChangeType: {
  SignIn: 0,
  SignOut: 1,
  SwitchAccounts: 2,
};

declare const CKSyncEngineSyncReason: {
  Scheduled: 0,
  Manual: 1,
};

declare const CKSyncEnginePendingRecordZoneChangeType: {
  Save: 0,
  Delete: 1,
};

declare interface CKRecordValue extends NSObject {
}

declare class CKRecordValue extends NativeObject implements CKRecordValue {
}


/// <reference types="@nativescript/objc-node-api" />

declare const NSFetchRequestExpressionType: interop.Enum<typeof NSExpressionType>;

declare const NSPersistentHistoryTokenExpiredError: number;

declare const NSEntityMigrationPolicyError: number;

declare const NSMigrationManagerDestinationStoreError: number;

declare const NSMigrationManagerSourceStoreError: number;

declare const NSMigrationMissingMappingModelError: number;

declare const NSPersistentStoreTimeoutError: number;

declare const NSPersistentStoreOperationError: number;

declare const NSCoreDataError: number;

declare const NSPersistentStoreSaveConflictsError: number;

declare const NSPersistentStoreIncompleteSaveError: number;

declare const NSPersistentStoreIncompatibleSchemaError: number;

declare const NSPersistentStoreTypeMismatchError: number;

declare const NSPersistentStoreInvalidTypeError: number;

declare const NSManagedObjectReferentialIntegrityError: number;

declare const NSPersistentStoreCoordinatorLockingError: number;

declare const NSManagedObjectContextLockingError: number;

declare const NSValidationInvalidURIError: number;

declare const NSValidationStringTooLongError: number;

declare const NSValidationInvalidDateError: number;

declare const NSValidationDateTooSoonError: number;

declare const NSValidationNumberTooLargeError: number;

declare const NSValidationRelationshipDeniedDeleteError: number;

declare const NSValidationRelationshipExceedsMaximumCountError: number;

declare const NSValidationRelationshipLacksMinimumCountError: number;

declare const NSValidationMissingMandatoryPropertyError: number;

declare const NSValidationMultipleErrorsError: number;

declare const NSManagedObjectConstraintValidationError: number;

declare const NSCoreDataVersionNumber: number;

declare const NSInferredMappingModelError: number;

declare const NSPersistentStoreModelVersionChecksumKey: string;

declare const NSMigrationError: number;

declare const NSStagedMigrationBackwardMigrationError: number;

declare const NSMigrationMissingSourceModelError: number;

declare const NSPersistentStoreIncompatibleVersionHashError: number;

declare const NSManagedObjectConstraintMergeError: number;

declare const NSExternalRecordImportError: number;

declare const NSManagedObjectModelReferenceNotFoundError: number;

declare const NSStagedMigrationFrameworkVersionMismatchError: number;

declare const NSValidationStringTooShortError: number;

declare const NSManagedObjectExternalRelationshipError: number;

declare const NSManagedObjectMergeError: number;

declare const NSPersistentStoreOpenError: number;

declare const NSPersistentStoreSaveError: number;

declare const NSMigrationConstraintViolationError: number;

declare const NSValidationNumberTooSmallError: number;

declare const NSValidationStringPatternMatchingError: number;

declare const NSMigrationCancelledError: number;

declare const NSPersistentStoreUnsupportedRequestTypeError: number;

declare const NSSQLiteError: number;

declare const NSValidationDateTooLateError: number;

declare const NSManagedObjectValidationError: number;

declare const NSSnapshotEventType: {
  UndoInsertion: 2,
  UndoDeletion: 4,
  UndoUpdate: 8,
  Rollback: 16,
  Refresh: 32,
  MergePolicy: 64,
};

declare const NSDeleteRule: {
  NoAction: 0,
  Nullify: 1,
  Cascade: 2,
  Deny: 3,
};

declare const NSPersistentStoreRequestType: {
  Fetch: 1,
  Save: 2,
};

declare const NSPersistentCloudKitContainerSchemaInitializationOptions: {
  None: 0,
  DryRun: 2,
  PrintSchema: 4,
};

declare const NSFetchRequestResultType: {
  NSManagedObjectResultType: 0,
  ID: 1,
};

declare const NSEntityMappingType: {
  Undefined: 0,
  Custom: 1,
  Add: 2,
  Remove: 3,
  Copy: 4,
  Transform: 5,
};

declare const NSAttributeType: {
  Undefined: 0,
  Integer16: 100,
  Integer32: 200,
  Integer64: 300,
  Decimal: 400,
  Double: 500,
  Float: 600,
  String: 700,
  Boolean: 800,
  Date: 900,
  BinaryData: 1000,
};

declare const NSMergePolicyType: {
  Error: 0,
  MergeByPropertyStoreTrump: 1,
  MergeByPropertyObjectTrump: 2,
  Overwrite: 3,
  Rollback: 4,
};

declare interface NSFetchRequestResult extends NSObject {
}

declare class NSFetchRequestResult extends NativeObject implements NSFetchRequestResult {
}

declare interface NSFetchedResultsSectionInfo {
  readonly name: string;

  readonly indexTitle: string;

  readonly numberOfObjects: number;

  readonly objects: NSArray;
}

declare class NSFetchedResultsSectionInfo extends NativeObject implements NSFetchedResultsSectionInfo {
}

declare interface NSFetchedResultsControllerDelegate extends NSObject {
  controllerDidChangeObjectAtIndexPathForChangeTypeNewIndexPath?(controller: interop.Object, anObject: interop.Object, indexPath: NSIndexPath | null, type: interop.Enum<typeof NSFetchedResultsChangeType>, newIndexPath: NSIndexPath | null): void;

  controllerDidChangeSectionAtIndexForChangeType?(controller: interop.Object, sectionInfo: NSFetchedResultsSectionInfo, sectionIndex: number, type: interop.Enum<typeof NSFetchedResultsChangeType>): void;

  controllerWillChangeContent?(controller: interop.Object): void;

  controllerDidChangeContent?(controller: interop.Object): void;
}

declare class NSFetchedResultsControllerDelegate extends NativeObject implements NSFetchedResultsControllerDelegate {
}


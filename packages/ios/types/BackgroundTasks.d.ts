/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const BGTaskSchedulerErrorDomain: string;

declare const BGTaskSchedulerErrorCode: {
  Unavailable: 1,
  TooManyPendingTaskRequests: 2,
  NotPermitted: 3,
};

declare class BGTask extends NSObject {
  readonly identifier: string;

  expirationHandler: () => void;

  setTaskCompletedWithSuccess(success: boolean): void;

  setExpirationHandler(expirationHandler: () => void | null): void;
}

declare class BGHealthResearchTask extends BGProcessingTask {
}

declare class BGProcessingTaskRequest extends BGTaskRequest {
  initWithIdentifier(identifier: string): this;

  requiresNetworkConnectivity: boolean;

  requiresExternalPower: boolean;

  setRequiresNetworkConnectivity(requiresNetworkConnectivity: boolean): void;

  setRequiresExternalPower(requiresExternalPower: boolean): void;
}

declare class BGTaskScheduler extends NSObject {
  static readonly sharedScheduler: BGTaskScheduler;

  registerForTaskWithIdentifierUsingQueueLaunchHandler(identifier: string, queue: NSObject | null, launchHandler: (p1: BGTask) => void): boolean;

  submitTaskRequestError(taskRequest: BGTaskRequest, error: interop.PointerConvertible): boolean;

  cancelTaskRequestWithIdentifier(identifier: string): void;

  cancelAllTaskRequests(): void;

  getPendingTaskRequestsWithCompletionHandler(completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>) => void): void;
}

declare class BGHealthResearchTaskRequest extends BGProcessingTaskRequest {
  protectionTypeOfRequiredData: string;

  setProtectionTypeOfRequiredData(protectionTypeOfRequiredData: string): void;
}

declare class BGAppRefreshTask extends BGTask {
}

declare class BGTaskRequest extends NSObject implements NSCopying {
  readonly identifier: string;

  earliestBeginDate: NSDate;

  setEarliestBeginDate(earliestBeginDate: NSDate | null): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class BGProcessingTask extends BGTask {
}

declare class BGAppRefreshTaskRequest extends BGTaskRequest {
  initWithIdentifier(identifier: string): this;
}


/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./Foundation.d.ts" />

declare const MXErrorDomain: string;

declare const MXErrorCode: {
  InvalidID: 0,
  MaxCount: 1,
  PastDeadline: 2,
  Duplicated: 3,
  Unknown: 4,
  InternalFailure: 5,
};

declare function _MXSignpostMetricsSnapshot(): interop.Pointer;

declare interface MXMetricManagerSubscriber extends NSObjectProtocol {
  didReceiveMetricPayloads?(payloads: NSArray<interop.Object> | Array<interop.Object>): void;

  didReceiveDiagnosticPayloads?(payloads: NSArray<interop.Object> | Array<interop.Object>): void;
}

declare class MXMetricManagerSubscriber extends NativeObject implements MXMetricManagerSubscriber {
}

declare class MXMetric extends NSObject implements NSSecureCoding {
  JSONRepresentation(): NSData;

  DictionaryRepresentation(): NSDictionary;

  dictionaryRepresentation(): NSDictionary;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class MXCellularConditionMetric extends MXMetric {
  readonly histogrammedCellularConditionTime: MXHistogram;
}

declare class MXDiagnosticPayload extends NSObject implements NSSecureCoding {
  readonly cpuExceptionDiagnostics: NSArray;

  readonly diskWriteExceptionDiagnostics: NSArray;

  readonly hangDiagnostics: NSArray;

  readonly appLaunchDiagnostics: NSArray;

  readonly crashDiagnostics: NSArray;

  readonly timeStampBegin: NSDate;

  readonly timeStampEnd: NSDate;

  JSONRepresentation(): NSData;

  dictionaryRepresentation(): NSDictionary;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class MXMemoryMetric extends MXMetric {
  readonly peakMemoryUsage: NSMeasurement;

  readonly averageSuspendedMemory: MXAverage;
}

declare class MXCallStackTree extends NSObject implements NSSecureCoding {
  JSONRepresentation(): NSData;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class MXHistogramBucket<UnitType = interop.Object> extends NSObject implements NSSecureCoding {
  readonly bucketStart: NSMeasurement;

  readonly bucketEnd: NSMeasurement;

  readonly bucketCount: number;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class MXBackgroundExitData extends NSObject implements NSSecureCoding {
  readonly cumulativeNormalAppExitCount: number;

  readonly cumulativeMemoryResourceLimitExitCount: number;

  readonly cumulativeCPUResourceLimitExitCount: number;

  readonly cumulativeMemoryPressureExitCount: number;

  readonly cumulativeBadAccessExitCount: number;

  readonly cumulativeAbnormalExitCount: number;

  readonly cumulativeIllegalInstructionExitCount: number;

  readonly cumulativeAppWatchdogExitCount: number;

  readonly cumulativeSuspendedWithLockedFileExitCount: number;

  readonly cumulativeBackgroundTaskAssertionTimeoutExitCount: number;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class MXNetworkTransferMetric extends MXMetric {
  readonly cumulativeWifiUpload: NSMeasurement;

  readonly cumulativeWifiDownload: NSMeasurement;

  readonly cumulativeCellularUpload: NSMeasurement;

  readonly cumulativeCellularDownload: NSMeasurement;
}

declare class MXGPUMetric extends MXMetric {
  readonly cumulativeGPUTime: NSMeasurement;
}

declare class MXDiagnostic extends NSObject implements NSSecureCoding {
  readonly metaData: MXMetaData;

  readonly applicationVersion: string;

  readonly signpostData: NSArray;

  JSONRepresentation(): NSData;

  dictionaryRepresentation(): NSDictionary;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class MXAverage<UnitType = interop.Object> extends NSObject implements NSSecureCoding {
  readonly averageMeasurement: NSMeasurement;

  readonly sampleCount: number;

  readonly standardDeviation: number;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class MXDiskWriteExceptionDiagnostic extends MXDiagnostic {
  readonly callStackTree: MXCallStackTree;

  readonly totalWritesCaused: NSMeasurement;
}

declare class MXAppLaunchMetric extends MXMetric {
  readonly histogrammedTimeToFirstDraw: MXHistogram;

  readonly histogrammedApplicationResumeTime: MXHistogram;

  readonly histogrammedOptimizedTimeToFirstDraw: MXHistogram;

  readonly histogrammedExtendedLaunch: MXHistogram;
}

declare class MXAnimationMetric extends MXMetric {
  readonly scrollHitchTimeRatio: NSMeasurement;

  readonly hitchTimeRatio: NSMeasurement;
}

declare class MXDiskIOMetric extends MXMetric {
  readonly cumulativeLogicalWrites: NSMeasurement;
}

declare class MXCPUExceptionDiagnostic extends MXDiagnostic {
  readonly callStackTree: MXCallStackTree;

  readonly totalCPUTime: NSMeasurement;

  readonly totalSampledTime: NSMeasurement;
}

declare class MXAppResponsivenessMetric extends MXMetric {
  readonly histogrammedApplicationHangTime: MXHistogram;
}

declare class MXCPUMetric extends MXMetric {
  readonly cumulativeCPUTime: NSMeasurement;

  readonly cumulativeCPUInstructions: NSMeasurement;
}

declare class MXLocationActivityMetric extends MXMetric {
  readonly cumulativeBestAccuracyTime: NSMeasurement;

  readonly cumulativeBestAccuracyForNavigationTime: NSMeasurement;

  readonly cumulativeNearestTenMetersAccuracyTime: NSMeasurement;

  readonly cumulativeHundredMetersAccuracyTime: NSMeasurement;

  readonly cumulativeKilometerAccuracyTime: NSMeasurement;

  readonly cumulativeThreeKilometersAccuracyTime: NSMeasurement;
}

declare class MXSignpostMetric extends MXMetric {
  readonly signpostName: string;

  readonly signpostCategory: string;

  readonly signpostIntervalData: MXSignpostIntervalData;

  readonly totalCount: number;
}

declare class MXHistogram<UnitType = interop.Object> extends NSObject implements NSSecureCoding {
  readonly totalBucketCount: number;

  readonly bucketEnumerator: NSEnumerator;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class MXUnitSignalBars extends NSDimension {
  static readonly bars: MXUnitSignalBars;
}

declare class MXMetricPayload extends NSObject implements NSSecureCoding {
  readonly latestApplicationVersion: string;

  readonly includesMultipleApplicationVersions: boolean;

  readonly timeStampBegin: NSDate;

  readonly timeStampEnd: NSDate;

  readonly cpuMetrics: MXCPUMetric;

  readonly gpuMetrics: MXGPUMetric;

  readonly cellularConditionMetrics: MXCellularConditionMetric;

  readonly applicationTimeMetrics: MXAppRunTimeMetric;

  readonly locationActivityMetrics: MXLocationActivityMetric;

  readonly networkTransferMetrics: MXNetworkTransferMetric;

  readonly applicationLaunchMetrics: MXAppLaunchMetric;

  readonly applicationResponsivenessMetrics: MXAppResponsivenessMetric;

  readonly diskIOMetrics: MXDiskIOMetric;

  readonly memoryMetrics: MXMemoryMetric;

  readonly displayMetrics: MXDisplayMetric;

  readonly animationMetrics: MXAnimationMetric;

  readonly applicationExitMetrics: MXAppExitMetric;

  readonly diskSpaceUsageMetrics: MXDiskSpaceUsageMetric;

  readonly signpostMetrics: NSArray;

  readonly metaData: MXMetaData;

  JSONRepresentation(): NSData;

  DictionaryRepresentation(): NSDictionary;

  dictionaryRepresentation(): NSDictionary;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class MXDiskSpaceUsageMetric extends MXMetric {
  readonly totalBinaryFileSize: NSMeasurement;

  readonly totalBinaryFileCount: number;

  readonly totalDataFileSize: NSMeasurement;

  readonly totalDataFileCount: number;

  readonly totalCacheFolderSize: NSMeasurement;

  readonly totalCloneSize: NSMeasurement;

  readonly totalDiskSpaceUsedSize: NSMeasurement;

  readonly totalDiskSpaceCapacity: NSMeasurement;
}

declare class MXAppRunTimeMetric extends MXMetric {
  readonly cumulativeForegroundTime: NSMeasurement;

  readonly cumulativeBackgroundTime: NSMeasurement;

  readonly cumulativeBackgroundAudioTime: NSMeasurement;

  readonly cumulativeBackgroundLocationTime: NSMeasurement;
}

declare class MXHangDiagnostic extends MXDiagnostic {
  readonly callStackTree: MXCallStackTree;

  readonly hangDuration: NSMeasurement;
}

declare class MXMetricManager extends NSObject {
  readonly pastPayloads: NSArray;

  readonly pastDiagnosticPayloads: NSArray;

  static readonly sharedManager: MXMetricManager;

  static makeLogHandleWithCategory(category: string): NSObject;

  addSubscriber(subscriber: MXMetricManagerSubscriber): void;

  removeSubscriber(subscriber: MXMetricManagerSubscriber): void;

  static extendLaunchMeasurementForTaskIDError(taskID: string, error: interop.PointerConvertible): boolean;

  static finishExtendedLaunchMeasurementForTaskIDError(taskID: string, error: interop.PointerConvertible): boolean;
}

declare class MXCrashDiagnostic extends MXDiagnostic {
  readonly callStackTree: MXCallStackTree;

  readonly terminationReason: string;

  readonly virtualMemoryRegionInfo: string;

  readonly exceptionType: NSNumber;

  readonly exceptionCode: NSNumber;

  readonly signal: NSNumber;

  readonly exceptionReason: MXCrashDiagnosticObjectiveCExceptionReason;
}

declare class MXCrashDiagnosticObjectiveCExceptionReason extends NSObject implements NSSecureCoding {
  readonly composedMessage: string;

  readonly formatString: string;

  readonly arguments$: NSArray;

  readonly exceptionType: string;

  readonly className: string;

  readonly exceptionName: string;

  JSONRepresentation(): NSData;

  dictionaryRepresentation(): NSDictionary;

  arguments(): NSArray;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class MXSignpostRecord extends NSObject implements NSSecureCoding {
  readonly subsystem: string;

  readonly category: string;

  readonly name: string;

  readonly beginTimeStamp: NSDate;

  readonly endTimeStamp: NSDate;

  readonly duration: NSMeasurement;

  readonly isInterval: boolean;

  JSONRepresentation(): NSData;

  dictionaryRepresentation(): NSDictionary;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class MXAppExitMetric extends MXMetric {
  readonly foregroundExitData: MXForegroundExitData;

  readonly backgroundExitData: MXBackgroundExitData;
}

declare class MXForegroundExitData extends NSObject implements NSSecureCoding {
  readonly cumulativeNormalAppExitCount: number;

  readonly cumulativeMemoryResourceLimitExitCount: number;

  readonly cumulativeBadAccessExitCount: number;

  readonly cumulativeAbnormalExitCount: number;

  readonly cumulativeIllegalInstructionExitCount: number;

  readonly cumulativeAppWatchdogExitCount: number;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class MXMetaData extends NSObject implements NSSecureCoding {
  readonly regionFormat: string;

  readonly osVersion: string;

  readonly deviceType: string;

  readonly applicationBuildVersion: string;

  readonly platformArchitecture: string;

  readonly lowPowerModeEnabled: boolean;

  readonly isTestFlightApp: boolean;

  readonly pid: number;

  readonly bundleIdentifier: string;

  JSONRepresentation(): NSData;

  DictionaryRepresentation(): NSDictionary;

  dictionaryRepresentation(): NSDictionary;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class MXUnitAveragePixelLuminance extends NSDimension {
  static readonly apl: MXUnitAveragePixelLuminance;
}

declare class MXDisplayMetric extends MXMetric {
  readonly averagePixelLuminance: MXAverage;
}

declare class MXSignpostIntervalData extends NSObject implements NSSecureCoding {
  readonly histogrammedSignpostDuration: MXHistogram;

  readonly cumulativeCPUTime: NSMeasurement;

  readonly averageMemory: MXAverage;

  readonly cumulativeLogicalWrites: NSMeasurement;

  readonly cumulativeHitchTimeRatio: NSMeasurement;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class MXAppLaunchDiagnostic extends MXDiagnostic {
  readonly callStackTree: MXCallStackTree;

  readonly launchDuration: NSMeasurement;
}


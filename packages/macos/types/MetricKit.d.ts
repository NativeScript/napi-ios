/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare interface MXMetricManagerSubscriber extends NSObjectProtocol {
  didReceiveDiagnosticPayloads?(payloads: NSArray<interop.Object> | Array<interop.Object>): void;
}

declare class MXMetricManagerSubscriber extends NativeObject implements MXMetricManagerSubscriber {
}

declare class MXDiagnosticPayload extends NSObject implements NSSecureCoding {
  readonly cpuExceptionDiagnostics: NSArray;

  readonly diskWriteExceptionDiagnostics: NSArray;

  readonly hangDiagnostics: NSArray;

  readonly crashDiagnostics: NSArray;

  readonly timeStampBegin: NSDate;

  readonly timeStampEnd: NSDate;

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

declare class MXHistogramBucket<UnitType = interop.Object> extends NSObject implements NSSecureCoding {
  readonly bucketStart: NSMeasurement;

  readonly bucketEnd: NSMeasurement;

  readonly bucketCount: number;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class MXCallStackTree extends NSObject implements NSSecureCoding {
  JSONRepresentation(): NSData;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
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

declare class MXDiskWriteExceptionDiagnostic extends MXDiagnostic {
  readonly callStackTree: MXCallStackTree;

  readonly totalWritesCaused: NSMeasurement;
}

declare class MXMetricManager extends NSObject {
  readonly pastDiagnosticPayloads: NSArray;

  static readonly sharedManager: MXMetricManager;

  static makeLogHandleWithCategory(category: string): NSObject;

  addSubscriber(subscriber: MXMetricManagerSubscriber): void;

  removeSubscriber(subscriber: MXMetricManagerSubscriber): void;
}

declare class MXHangDiagnostic extends MXDiagnostic {
  readonly callStackTree: MXCallStackTree;

  readonly hangDuration: NSMeasurement;
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

  JSONRepresentation(): NSData;

  dictionaryRepresentation(): NSDictionary;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class MXHistogram<UnitType = interop.Object> extends NSObject implements NSSecureCoding {
  readonly totalBucketCount: number;

  readonly bucketEnumerator: NSEnumerator;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
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

declare class MXCPUExceptionDiagnostic extends MXDiagnostic {
  readonly callStackTree: MXCallStackTree;

  readonly totalCPUTime: NSMeasurement;

  readonly totalSampledTime: NSMeasurement;
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


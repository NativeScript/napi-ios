/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const CMErrorDomain: string;

declare const CMHeadphoneActivityStatus: {
  Disconnected: 0,
  Connected: 1,
};

declare const CMWaterSubmersionDepthState: {
  Unknown: 0,
  NotSubmerged: 100,
  SubmergedShallow: 200,
  SubmergedDeep: 300,
  ApproachingMaxDepth: 400,
  PastMaxDepth: 500,
  SensorDepthError: 600,
};

declare const CMDeviceMotionSensorLocation: {
  Default: 0,
  HeadphoneLeft: 1,
  HeadphoneRight: 2,
};

declare const CMAttitudeReferenceFrame: {
  Arbitrary: 1,
  ArbitraryCorrected: 2,
  MagneticNorth: 4,
  TrueNorth: 8,
};

declare const CMAuthorizationStatus: {
  NotDetermined: 0,
  Restricted: 1,
  Denied: 2,
  Authorized: 3,
};

declare const CMError: {
  NULL: 100,
  DeviceRequiresMovement: 101,
  TrueNorthNotAvailable: 102,
  Unknown: 103,
  MotionActivityNotAvailable: 104,
  MotionActivityNotAuthorized: 105,
  MotionActivityNotEntitled: 106,
  InvalidParameter: 107,
  InvalidAction: 108,
  NotAvailable: 109,
  NotEntitled: 110,
  NotAuthorized: 111,
  NilData: 112,
  Size: 113,
};

declare const CMHighFrequencyHeartRateDataConfidence: {
  Low: 0,
  Medium: 1,
  High: 2,
  Highest: 3,
};

declare const CMOdometerOriginDevice: {
  Unknown: 0,
  Local: 1,
  Remote: 2,
};

declare const CMPedometerEventType: {
  Pause: 0,
  Resume: 1,
};

declare const CMWaterSubmersionState: {
  Unknown: 0,
  NotSubmerged: 1,
  Submerged: 2,
};

declare const CMMotionActivityConfidence: {
  Low: 0,
  Medium: 1,
  High: 2,
};

declare const CMFallDetectionEventUserResolution: {
  Confirmed: 0,
  Dismissed: 1,
  Rejected: 2,
  Unresponsive: 3,
};

declare const CMMagneticFieldCalibrationAccuracy: {
  Uncalibrated: -1,
  Low: 0,
  Medium: 1,
  High: 2,
};

declare class CMCalibratedMagneticField {
  constructor(init?: CMCalibratedMagneticField);
  field: CMMagneticField;
  accuracy: interop.Enum<typeof CMMagneticFieldCalibrationAccuracy>;
}

declare class CMMagneticField {
  constructor(init?: CMMagneticField);
  x: number;
  y: number;
  z: number;
}

declare class CMAcceleration {
  constructor(init?: CMAcceleration);
  x: number;
  y: number;
  z: number;
}

declare class CMQuaternion {
  constructor(init?: CMQuaternion);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class CMRotationMatrix {
  constructor(init?: CMRotationMatrix);
  m11: number;
  m12: number;
  m13: number;
  m21: number;
  m22: number;
  m23: number;
  m31: number;
  m32: number;
  m33: number;
}

declare class CMRotationRate {
  constructor(init?: CMRotationRate);
  x: number;
  y: number;
  z: number;
}

declare interface CMWaterSubmersionManagerDelegate extends NSObjectProtocol {
  managerDidUpdateEvent(manager: CMWaterSubmersionManager, event: CMWaterSubmersionEvent): void;

  managerDidUpdateMeasurement(manager: CMWaterSubmersionManager, measurement: CMWaterSubmersionMeasurement): void;

  managerDidUpdateTemperature(manager: CMWaterSubmersionManager, measurement: CMWaterTemperature): void;

  managerErrorOccurred(manager: CMWaterSubmersionManager, error: NSError): void;
}

declare class CMWaterSubmersionManagerDelegate extends NativeObject implements CMWaterSubmersionManagerDelegate {
}

declare class CMWaterSubmersionEvent extends NSObject implements NSSecureCoding, NSCopying {
  readonly date: NSDate;

  readonly state: interop.Enum<typeof CMWaterSubmersionState>;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class CMStepCounter extends NSObject {
  static isStepCountingAvailable(): boolean;

  queryStepCountStartingFromToToQueueWithHandler(start: NSDate, end: NSDate, queue: NSOperationQueue, handler: (p1: number, p2: NSError) => void): void;

  startStepCountingUpdatesToQueueUpdateOnWithHandler(queue: NSOperationQueue, stepCounts: number, handler: (p1: number, p2: NSDate, p3: NSError) => void): void;

  stopStepCountingUpdates(): void;
}

declare class CMPedometerEvent extends NSObject implements NSSecureCoding, NSCopying {
  readonly date: NSDate;

  readonly type: interop.Enum<typeof CMPedometerEventType>;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class CMAttitude extends NSObject implements NSCopying, NSSecureCoding {
  readonly roll: number;

  readonly pitch: number;

  readonly yaw: number;

  readonly rotationMatrix: CMRotationMatrix;

  readonly quaternion: CMQuaternion;

  multiplyByInverseOfAttitude(attitude: CMAttitude): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CMAccelerometerData extends CMLogItem {
  readonly acceleration: CMAcceleration;
}

declare class CMLogItem extends NSObject implements NSSecureCoding, NSCopying {
  readonly timestamp: number;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class CMBatchedSensorManager extends NSObject {
  static readonly authorizationStatus: interop.Enum<typeof CMAuthorizationStatus>;

  static readonly accelerometerSupported: boolean;

  readonly accelerometerActive: boolean;

  readonly accelerometerDataFrequency: number;

  readonly accelerometerBatch: NSArray;

  startAccelerometerUpdates(): void;

  startAccelerometerUpdatesWithHandler(handler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): void;

  stopAccelerometerUpdates(): void;

  static readonly deviceMotionSupported: boolean;

  readonly deviceMotionDataFrequency: number;

  readonly deviceMotionActive: boolean;

  readonly deviceMotionBatch: NSArray;

  startDeviceMotionUpdates(): void;

  startDeviceMotionUpdatesWithHandler(handler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): void;

  stopDeviceMotionUpdates(): void;

  static isAccelerometerSupported(): boolean;

  isAccelerometerActive(): boolean;

  static isDeviceMotionSupported(): boolean;

  isDeviceMotionActive(): boolean;
}

declare class CMDeviceMotion extends CMLogItem {
  readonly attitude: CMAttitude;

  readonly rotationRate: CMRotationRate;

  readonly gravity: CMAcceleration;

  readonly userAcceleration: CMAcceleration;

  readonly magneticField: CMCalibratedMagneticField;

  readonly sensorLocation: interop.Enum<typeof CMDeviceMotionSensorLocation>;
}

declare class CMTremorResult extends NSObject implements NSCopying, NSSecureCoding {
  readonly startDate: NSDate;

  readonly endDate: NSDate;

  readonly percentUnknown: number;

  readonly percentNone: number;

  readonly percentSlight: number;

  readonly percentMild: number;

  readonly percentModerate: number;

  readonly percentStrong: number;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CMAbsoluteAltitudeData extends CMLogItem {
  readonly altitude: number;

  readonly accuracy: number;

  readonly precision: number;
}

declare class CMAmbientPressureData extends CMLogItem {
  readonly pressure: NSMeasurement;

  readonly temperature: NSMeasurement;
}

declare class CMGyroData extends CMLogItem {
  readonly rotationRate: CMRotationRate;
}

declare class CMRotationRateData extends CMLogItem {
  readonly rotationRate: CMRotationRate;
}

declare class CMRecordedAccelerometerData extends CMAccelerometerData {
  readonly identifier: number;

  readonly startDate: NSDate;
}

declare class CMOdometerData extends NSObject implements NSSecureCoding, NSCopying {
  readonly startDate: NSDate;

  readonly endDate: NSDate;

  readonly deltaDistance: number;

  readonly deltaDistanceAccuracy: number;

  readonly speed: number;

  readonly speedAccuracy: number;

  readonly gpsDate: NSDate;

  readonly deltaAltitude: number;

  readonly verticalAccuracy: number;

  readonly originDevice: interop.Enum<typeof CMOdometerOriginDevice>;

  readonly slope: NSNumber;

  readonly maxAbsSlope: NSNumber;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class CMWaterSubmersionMeasurement extends NSObject implements NSSecureCoding, NSCopying {
  readonly date: NSDate;

  readonly depth: NSMeasurement;

  readonly pressure: NSMeasurement;

  readonly surfacePressure: NSMeasurement;

  readonly submersionState: interop.Enum<typeof CMWaterSubmersionDepthState>;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class CMWaterTemperature extends NSObject implements NSSecureCoding, NSCopying {
  readonly date: NSDate;

  readonly temperature: NSMeasurement;

  readonly temperatureUncertainty: NSMeasurement;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class CMWaterSubmersionManager extends NSObject {
  delegate: CMWaterSubmersionManagerDelegate;

  static readonly waterSubmersionAvailable: boolean;

  static readonly authorizationStatus: interop.Enum<typeof CMAuthorizationStatus>;

  readonly maximumDepth: NSMeasurement;

  setDelegate(delegate: CMWaterSubmersionManagerDelegate | null): void;
}

declare class CMRecordedRotationRateData extends CMRotationRateData {
  readonly startDate: NSDate;
}

declare class CMMotionManager extends NSObject {
  accelerometerUpdateInterval: number;

  readonly accelerometerAvailable: boolean;

  readonly accelerometerActive: boolean;

  readonly accelerometerData: CMAccelerometerData;

  startAccelerometerUpdates(): void;

  startAccelerometerUpdatesToQueueWithHandler(queue: NSOperationQueue, handler: (p1: CMAccelerometerData, p2: NSError) => void): void;

  stopAccelerometerUpdates(): void;

  gyroUpdateInterval: number;

  readonly gyroAvailable: boolean;

  readonly gyroActive: boolean;

  readonly gyroData: CMGyroData;

  startGyroUpdates(): void;

  startGyroUpdatesToQueueWithHandler(queue: NSOperationQueue, handler: (p1: CMGyroData, p2: NSError) => void): void;

  stopGyroUpdates(): void;

  deviceMotionUpdateInterval: number;

  static availableAttitudeReferenceFrames(): interop.Enum<typeof CMAttitudeReferenceFrame>;

  readonly attitudeReferenceFrame: interop.Enum<typeof CMAttitudeReferenceFrame>;

  readonly deviceMotionAvailable: boolean;

  readonly deviceMotionActive: boolean;

  readonly deviceMotion: CMDeviceMotion;

  startDeviceMotionUpdates(): void;

  startDeviceMotionUpdatesToQueueWithHandler(queue: NSOperationQueue, handler: (p1: CMDeviceMotion, p2: NSError) => void): void;

  startDeviceMotionUpdatesUsingReferenceFrame(referenceFrame: interop.Enum<typeof CMAttitudeReferenceFrame>): void;

  startDeviceMotionUpdatesUsingReferenceFrameToQueueWithHandler(referenceFrame: interop.Enum<typeof CMAttitudeReferenceFrame>, queue: NSOperationQueue, handler: (p1: CMDeviceMotion, p2: NSError) => void): void;

  stopDeviceMotionUpdates(): void;

  showsDeviceMovementDisplay: boolean;

  setAccelerometerUpdateInterval(accelerometerUpdateInterval: number): void;

  isAccelerometerAvailable(): boolean;

  isAccelerometerActive(): boolean;

  setGyroUpdateInterval(gyroUpdateInterval: number): void;

  isGyroAvailable(): boolean;

  isGyroActive(): boolean;

  setDeviceMotionUpdateInterval(deviceMotionUpdateInterval: number): void;

  isDeviceMotionAvailable(): boolean;

  isDeviceMotionActive(): boolean;

  setShowsDeviceMovementDisplay(showsDeviceMovementDisplay: boolean): void;
}


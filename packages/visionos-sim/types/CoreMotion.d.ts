/// <reference types="@nativescript/objc-node-api" />

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

declare const CMFallDetectionEventUserResolution: {
  Confirmed: 0,
  Dismissed: 1,
  Rejected: 2,
  Unresponsive: 3,
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

declare const CMMagneticFieldCalibrationAccuracy: {
  Uncalibrated: -1,
  Low: 0,
  Medium: 1,
  High: 2,
};

declare const CMMotionActivityConfidence: {
  Low: 0,
  Medium: 1,
  High: 2,
};

declare const CMWaterSubmersionState: {
  Unknown: 0,
  NotSubmerged: 1,
  Submerged: 2,
};

declare class CMQuaternion {
  constructor(init?: CMQuaternion);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class CMRotationRate {
  constructor(init?: CMRotationRate);
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

declare class CMCalibratedMagneticField {
  constructor(init?: CMCalibratedMagneticField);
  field: CMMagneticField;
  accuracy: interop.Enum<typeof CMMagneticFieldCalibrationAccuracy>;
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

declare class CMMagneticField {
  constructor(init?: CMMagneticField);
  x: number;
  y: number;
  z: number;
}

declare class CMBatchedSensorManager extends NSObject {
  static readonly authorizationStatus: interop.Enum<typeof CMAuthorizationStatus>;

  static readonly isAccelerometerSupported: boolean;

  readonly isAccelerometerActive: boolean;

  readonly accelerometerDataFrequency: number;

  readonly accelerometerBatch: NSArray;

  startAccelerometerUpdates(): void;

  startAccelerometerUpdatesWithHandler(handler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): void;

  stopAccelerometerUpdates(): void;

  static readonly isDeviceMotionSupported: boolean;

  readonly deviceMotionDataFrequency: number;

  readonly isDeviceMotionActive: boolean;

  readonly deviceMotionBatch: NSArray;

  startDeviceMotionUpdates(): void;

  startDeviceMotionUpdatesWithHandler(handler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): void;

  stopDeviceMotionUpdates(): void;
}


/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const CLTimeIntervalMax: number;

declare const CLLocationDistanceMax: number;

declare const kCLLocationAccuracyThreeKilometers: number;

declare const kCLLocationAccuracyNearestTenMeters: number;

declare const kCLLocationAccuracyBest: number;

declare const kCLLocationAccuracyBestForNavigation: number;

declare const kCLDistanceFilterNone: number;

declare const kCLLocationAccuracyReduced: number;

declare const kCLLocationCoordinate2DInvalid: CLLocationCoordinate2D;

declare const kCLLocationAccuracyKilometer: number;

declare const kCLLocationAccuracyHundredMeters: number;

declare class CLLocationCoordinate2D {
  constructor(init?: CLLocationCoordinate2D);
  latitude: number;
  longitude: number;
}

declare function CLLocationCoordinate2DIsValid(coord: CLLocationCoordinate2D): boolean;

declare function CLLocationCoordinate2DMake(latitude: number, longitude: number): CLLocationCoordinate2D;

declare class CLLocationSourceInformation extends NSObject implements NSCopying, NSSecureCoding {
  initWithSoftwareSimulationStateAndExternalAccessoryState(isSoftware: boolean, isAccessory: boolean): this;

  readonly isSimulatedBySoftware: boolean;

  readonly isProducedByAccessory: boolean;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CLFloor extends NSObject implements NSCopying, NSSecureCoding {
  readonly level: number;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CLLocation extends NSObject implements NSCopying, NSSecureCoding {
  initWithLatitudeLongitude(latitude: number, longitude: number): this;

  initWithCoordinateAltitudeHorizontalAccuracyVerticalAccuracyTimestamp(coordinate: CLLocationCoordinate2D, altitude: number, hAccuracy: number, vAccuracy: number, timestamp: NSDate): this;

  initWithCoordinateAltitudeHorizontalAccuracyVerticalAccuracyCourseSpeedTimestamp(coordinate: CLLocationCoordinate2D, altitude: number, hAccuracy: number, vAccuracy: number, course: number, speed: number, timestamp: NSDate): this;

  initWithCoordinateAltitudeHorizontalAccuracyVerticalAccuracyCourseCourseAccuracySpeedSpeedAccuracyTimestamp(coordinate: CLLocationCoordinate2D, altitude: number, hAccuracy: number, vAccuracy: number, course: number, courseAccuracy: number, speed: number, speedAccuracy: number, timestamp: NSDate): this;

  initWithCoordinateAltitudeHorizontalAccuracyVerticalAccuracyCourseCourseAccuracySpeedSpeedAccuracyTimestampSourceInfo(coordinate: CLLocationCoordinate2D, altitude: number, hAccuracy: number, vAccuracy: number, course: number, courseAccuracy: number, speed: number, speedAccuracy: number, timestamp: NSDate, sourceInfo: CLLocationSourceInformation): this;

  readonly coordinate: CLLocationCoordinate2D;

  readonly altitude: number;

  readonly ellipsoidalAltitude: number;

  readonly horizontalAccuracy: number;

  readonly verticalAccuracy: number;

  readonly course: number;

  readonly courseAccuracy: number;

  readonly speed: number;

  readonly speedAccuracy: number;

  readonly timestamp: NSDate;

  readonly floor: CLFloor;

  readonly sourceInformation: CLLocationSourceInformation;

  getDistanceFrom(location: CLLocation): number;

  distanceFromLocation(location: CLLocation): number;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}


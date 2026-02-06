/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const kCLErrorUserInfoAlternateRegionKey: string;

declare const kCLErrorDomain: string;

declare const kCLHeadingFilterNone: number;

declare const CLServiceSessionAuthorizationRequirement: {
  None: 0,
  WhenInUse: 1,
  Always: 2,
};

declare const CLActivityType: {
  Other: 1,
  AutomotiveNavigation: 2,
  Fitness: 3,
  OtherNavigation: 4,
  Airborne: 5,
};

declare const CLDeviceOrientation: {
  Unknown: 0,
  Portrait: 1,
  PortraitUpsideDown: 2,
  LandscapeLeft: 3,
  LandscapeRight: 4,
  FaceUp: 5,
  FaceDown: 6,
};

declare const CLLiveUpdateConfiguration: {
  Default: 0,
  AutomotiveNavigation: 1,
  OtherNavigation: 2,
  Fitness: 3,
  Airborne: 4,
};

declare const CLError: {
  LocationUnknown: 0,
  Denied: 1,
  Network: 2,
  HeadingFailure: 3,
  RegionMonitoringDenied: 4,
  RegionMonitoringFailure: 5,
  RegionMonitoringSetupDelayed: 6,
  RegionMonitoringResponseDelayed: 7,
  GeocodeFoundNoResult: 8,
  GeocodeFoundPartialResult: 9,
  GeocodeCanceled: 10,
  DeferredFailed: 11,
  DeferredNotUpdatingLocation: 12,
  DeferredAccuracyTooLow: 13,
  DeferredDistanceFiltered: 14,
  DeferredCanceled: 15,
  RangingUnavailable: 16,
  RangingFailure: 17,
  PromptDeclined: 18,
  HistoricalLocationError: 19,
};

declare const CLAuthorizationStatus: {
  NotDetermined: 0,
  Restricted: 1,
  Denied: 2,
  AuthorizedWhenInUse: 4,
};

declare const CLAccuracyAuthorization: {
  Full: 0,
  Reduced: 1,
};

declare const CLMonitoringState: {
  Unknown: 0,
  Satisfied: 1,
  Unsatisfied: 2,
};

declare interface CLLocationManagerDelegate extends NSObjectProtocol {
  locationManagerDidUpdateLocations?(manager: CLLocationManager, locations: NSArray<interop.Object> | Array<interop.Object>): void;

  locationManagerDidFailWithError?(manager: CLLocationManager, error: NSError): void;

  locationManagerDidChangeAuthorization?(manager: CLLocationManager): void;

  locationManagerDidPauseLocationUpdates?(manager: CLLocationManager): void;

  locationManagerDidResumeLocationUpdates?(manager: CLLocationManager): void;

  locationManagerDidFinishDeferredUpdatesWithError?(manager: CLLocationManager, error: NSError | null): void;
}

declare class CLLocationManagerDelegate extends NativeObject implements CLLocationManagerDelegate {
}

declare class CLServiceSessionDiagnostic extends NSObject {
  readonly authorizationDenied: boolean;

  readonly authorizationDeniedGlobally: boolean;

  readonly authorizationRestricted: boolean;

  readonly insufficientlyInUse: boolean;

  readonly serviceSessionRequired: boolean;

  readonly fullAccuracyDenied: boolean;

  readonly alwaysAuthorizationDenied: boolean;

  readonly authorizationRequestInProgress: boolean;
}

declare class CLBackgroundActivitySession extends NSObject {
  invalidate(): void;

  static backgroundActivitySession<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  static backgroundActivitySessionWithQueueHandler<This extends abstract new (...args: any) => any>(this: This, queue: NSObject, handler: (p1: CLBackgroundActivitySessionDiagnostic) => void): InstanceType<This>;
}

declare class CLBackgroundActivitySessionDiagnostic extends NSObject {
  readonly authorizationDenied: boolean;

  readonly authorizationDeniedGlobally: boolean;

  readonly authorizationRestricted: boolean;

  readonly insufficientlyInUse: boolean;

  readonly serviceSessionRequired: boolean;

  readonly authorizationRequestInProgress: boolean;
}

declare class CLPlacemark extends NSObject implements NSCopying, NSSecureCoding {
  initWithPlacemark(placemark: CLPlacemark): this;

  readonly location: CLLocation;

  readonly timeZone: NSTimeZone;

  readonly name: string;

  readonly thoroughfare: string;

  readonly subThoroughfare: string;

  readonly locality: string;

  readonly subLocality: string;

  readonly administrativeArea: string;

  readonly subAdministrativeArea: string;

  readonly postalCode: string;

  readonly ISOcountryCode: string;

  readonly country: string;

  readonly inlandWater: string;

  readonly ocean: string;

  readonly areasOfInterest: NSArray;

  readonly postalAddress: CNPostalAddress;

  static placemarkWithLocationNamePostalAddress<This extends abstract new (...args: any) => any>(this: This, location: CLLocation, name: string | null, postalAddress: CNPostalAddress | null): InstanceType<This>;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CLLocationManager extends NSObject {
  static locationServicesEnabled(): boolean;

  static headingAvailable(): boolean;

  static significantLocationChangeMonitoringAvailable(): boolean;

  static isMonitoringAvailableForClass(regionClass: interop.Object): boolean;

  static regionMonitoringAvailable(): boolean;

  static regionMonitoringEnabled(): boolean;

  static isRangingAvailable(): boolean;

  readonly authorizationStatus: interop.Enum<typeof CLAuthorizationStatus>;

  static authorizationStatus(): interop.Enum<typeof CLAuthorizationStatus>;

  readonly accuracyAuthorization: interop.Enum<typeof CLAccuracyAuthorization>;

  readonly authorizedForWidgetUpdates: boolean;

  delegate: CLLocationManagerDelegate;

  activityType: interop.Enum<typeof CLActivityType>;

  distanceFilter: number;

  desiredAccuracy: number;

  pausesLocationUpdatesAutomatically: boolean;

  showsBackgroundLocationIndicator: boolean;

  readonly location: CLLocation;

  readonly headingAvailable: boolean;

  requestWhenInUseAuthorization(): void;

  requestTemporaryFullAccuracyAuthorizationWithPurposeKeyCompletion(purposeKey: string, completion: (p1: NSError) => void | null): void;

  requestTemporaryFullAccuracyAuthorizationWithPurposeKey(purposeKey: string): void;

  startUpdatingLocation(): void;

  stopUpdatingLocation(): void;

  requestLocation(): void;

  isAuthorizedForWidgetUpdates(): boolean;

  setDelegate(delegate: CLLocationManagerDelegate | null): void;

  setActivityType(activityType: interop.Enum<typeof CLActivityType>): void;

  setDistanceFilter(distanceFilter: number): void;

  setDesiredAccuracy(desiredAccuracy: number): void;

  setPausesLocationUpdatesAutomatically(pausesLocationUpdatesAutomatically: boolean): void;

  setShowsBackgroundLocationIndicator(showsBackgroundLocationIndicator: boolean): void;
}

declare class CLLocationUpdater extends NSObject {
  static liveUpdaterWithQueueHandler<This extends abstract new (...args: any) => any>(this: This, queue: NSObject, handler: (p1: CLUpdate) => void | null): InstanceType<This>;

  static liveUpdaterWithConfigurationQueueHandler<This extends abstract new (...args: any) => any>(this: This, configuration: interop.Enum<typeof CLLiveUpdateConfiguration>, queue: NSObject, handler: (p1: CLUpdate) => void | null): InstanceType<This>;

  resume(): void;

  pause(): void;

  invalidate(): void;
}

declare class CLUpdate extends NSObject {
  readonly authorizationDenied: boolean;

  readonly authorizationDeniedGlobally: boolean;

  readonly authorizationRestricted: boolean;

  readonly isStationary: boolean;

  readonly stationary: boolean;

  readonly insufficientlyInUse: boolean;

  readonly locationUnavailable: boolean;

  readonly accuracyLimited: boolean;

  readonly serviceSessionRequired: boolean;

  readonly authorizationRequestInProgress: boolean;

  readonly location: CLLocation | null;
}

declare class CLGeocoder extends NSObject {
  readonly geocoding: boolean;

  reverseGeocodeLocationCompletionHandler(location: CLLocation, completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void): void;

  reverseGeocodeLocationPreferredLocaleCompletionHandler(location: CLLocation, locale: NSLocale | null, completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void): void;

  geocodeAddressStringInRegionCenteredAtInRegionRadiusPreferredLocaleCompletionHandler(addressString: string, centroid: CLLocationCoordinate2D, radius: number, locale: NSLocale | null, completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void): void;

  geocodeAddressStringCompletionHandler(addressString: string, completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void): void;

  cancelGeocode(): void;

  isGeocoding(): boolean;

  geocodePostalAddressCompletionHandler(postalAddress: CNPostalAddress, completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void): void;

  geocodePostalAddressPreferredLocaleCompletionHandler(postalAddress: CNPostalAddress, locale: NSLocale | null, completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void): void;
}

declare class CLServiceSession extends NSObject {
  static sessionRequiringAuthorization(authorizationRequirement: interop.Enum<typeof CLServiceSessionAuthorizationRequirement>): CLServiceSession;

  static sessionRequiringAuthorizationQueueHandler(authorizationRequirement: interop.Enum<typeof CLServiceSessionAuthorizationRequirement>, queue: NSObject, handler: (p1: CLServiceSessionDiagnostic) => void): CLServiceSession;

  static sessionRequiringAuthorizationFullAccuracyPurposeKey(authorizationRequirement: interop.Enum<typeof CLServiceSessionAuthorizationRequirement>, purposeKey: string): CLServiceSession;

  static sessionRequiringAuthorizationFullAccuracyPurposeKeyQueueHandler(authorizationRequirement: interop.Enum<typeof CLServiceSessionAuthorizationRequirement>, purposeKey: string, queue: NSObject, handler: (p1: CLServiceSessionDiagnostic) => void): CLServiceSession;

  invalidate(): void;
}


/// <reference types="@nativescript/objc-node-api" />

declare const kCLHeadingFilterNone: number;

declare const kCLErrorDomain: string;

declare const kCLLocationAccuracyThreeKilometers: number;

declare const kCLLocationAccuracyBest: number;

declare const kCLLocationAccuracyNearestTenMeters: number;

declare const kCLDistanceFilterNone: number;

declare const kCLLocationAccuracyHundredMeters: number;

declare const kCLLocationAccuracyKilometer: number;

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

declare const CLDeviceOrientation: {
  Unknown: 0,
  Portrait: 1,
  PortraitUpsideDown: 2,
  LandscapeLeft: 3,
  LandscapeRight: 4,
  FaceUp: 5,
  FaceDown: 6,
};

declare const CLActivityType: {
  Other: 1,
  AutomotiveNavigation: 2,
  Fitness: 3,
  OtherNavigation: 4,
};

declare const CLLiveUpdateConfiguration: {
  Default: 0,
  AutomotiveNavigation: 1,
  OtherNavigation: 2,
  Fitness: 3,
  Airborne: 4,
};

declare const CLAuthorizationStatus: {
  NotDetermined: 0,
  Restricted: 1,
  Denied: 2,
};

declare const CLServiceSessionAuthorizationRequirement: {
  None: 0,
  WhenInUse: 1,
  Always: 2,
};

declare const CLMonitoringState: {
  Unknown: 0,
  Satisfied: 1,
  Unsatisfied: 2,
};

declare const CLAccuracyAuthorization: {
  Full: 0,
  Reduced: 1,
};

declare class CLLocationCoordinate2D {
  constructor(init?: CLLocationCoordinate2D);
  latitude: number;
  longitude: number;
}

declare interface CLLocationManagerDelegate extends NSObject {
  locationManagerDidFailWithError?(manager: interop.Object, error: NSError): void;
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

declare class CLServiceSession extends NSObject {
  static sessionRequiringAuthorization(authorizationRequirement: interop.Enum<typeof CLServiceSessionAuthorizationRequirement>): CLServiceSession;

  static sessionRequiringAuthorizationQueueHandler(authorizationRequirement: interop.Enum<typeof CLServiceSessionAuthorizationRequirement>, queue: interop.Object, handler: (p1: CLServiceSessionDiagnostic) => void): CLServiceSession;

  static sessionRequiringAuthorizationFullAccuracyPurposeKey(authorizationRequirement: interop.Enum<typeof CLServiceSessionAuthorizationRequirement>, purposeKey: string): CLServiceSession;

  static sessionRequiringAuthorizationFullAccuracyPurposeKeyQueueHandler(authorizationRequirement: interop.Enum<typeof CLServiceSessionAuthorizationRequirement>, purposeKey: string, queue: interop.Object, handler: (p1: CLServiceSessionDiagnostic) => void): CLServiceSession;

  invalidate(): void;
}


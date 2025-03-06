/// <reference types="@nativescript/objc-node-api" />

declare const MKPointOfInterestCategorySurfing: string;

declare const MKPointOfInterestCategorySpa: string;

declare const MKPointOfInterestCategorySkating: string;

declare const MKPointOfInterestCategorySkatePark: string;

declare const MKPointOfInterestCategoryRVPark: string;

declare const MKPointOfInterestCategoryRockClimbing: string;

declare const MKPointOfInterestCategoryMusicVenue: string;

declare const MKPointOfInterestCategoryMiniGolf: string;

declare const MKPointOfInterestCategoryLandmark: string;

declare const MKPointOfInterestCategoryKayaking: string;

declare const MKPointOfInterestCategoryHiking: string;

declare const MKPointOfInterestCategoryFortress: string;

declare const MKPointOfInterestCategoryFairground: string;

declare const MKPointOfInterestCategoryDistillery: string;

declare const MKPointOfInterestCategoryConventionCenter: string;

declare const MKPointOfInterestCategoryBeauty: string;

declare const MKPointOfInterestCategoryBasketball: string;

declare const MKPointOfInterestCategoryAutomotiveRepair: string;

declare const MKPointOfInterestCategoryAnimalService: string;

declare const MKPointOfInterestCategoryTennis: string;

declare const MKPointOfInterestCategoryCastle: string;

declare const MKPointOfInterestCategoryBowling: string;

declare const MKPointOfInterestCategoryFishing: string;

declare const MKPointOfInterestCategorySoccer: string;

declare const MKErrorDomain: string;

declare const MKPointOfInterestCategoryBaseball: string;

declare const MKPointOfInterestCategoryNationalMonument: string;

declare const MKPointOfInterestCategoryGoKart: string;

declare const MKPointOfInterestCategorySkiing: string;

declare const MKPointOfInterestCategoryPlanetarium: string;

declare const MKAnnotationCalloutInfoDidChangeNotification: string;

declare const MKPointOfInterestCategorySwimming: string;

declare const MKPointOfInterestCategoryMailbox: string;

declare const MKPointOfInterestCategoryVolleyball: string;

declare const MKPointOfInterestCategoryGolf: string;

declare const MKLocalSearchRegionPriority: {
  Default: 0,
  Required: 1,
};

declare const MKMapElevationStyle: {
  Flat: 0,
  Realistic: 1,
};

declare const MKDirectionsRoutePreference: {
  Any: 0,
  Avoid: 1,
};

declare const MKStandardMapEmphasisStyle: {
  Default: 0,
  Muted: 1,
};

declare const MKAddressFilterOption: {
  Country: 1,
  AdministrativeArea: 2,
  SubAdministrativeArea: 4,
  Locality: 8,
  SubLocality: 16,
  PostalCode: 32,
};

declare const MKMapItemDetailSelectionAccessoryCalloutStyle: {
  Automatic: 0,
  Full: 1,
  Compact: 2,
};

declare class MKMapSize {
  constructor(init?: MKMapSize);
  width: number;
  height: number;
}

declare class MKCoordinateRegion {
  constructor(init?: MKCoordinateRegion);
  center: CLLocationCoordinate2D;
  span: MKCoordinateSpan;
}

declare class MKCoordinateSpan {
  constructor(init?: MKCoordinateSpan);
  latitudeDelta: number;
  longitudeDelta: number;
}

declare class MKMapRect {
  constructor(init?: MKMapRect);
  origin: MKMapPoint;
  size: MKMapSize;
}

declare class MKMapPoint {
  constructor(init?: MKMapPoint);
  x: number;
  y: number;
}

declare class MKTileOverlayPath {
  constructor(init?: MKTileOverlayPath);
  x: number;
  y: number;
  z: number;
  contentScaleFactor: number;
}

declare function MKCoordinateRegionMakeWithDistance(centerCoordinate: CLLocationCoordinate2D, latitudinalMeters: number, longitudinalMeters: number): MKCoordinateRegion;

declare interface MKMapItemDetailViewControllerDelegate extends NSObject {
  mapItemDetailViewControllerDidFinish(detailViewController: MKMapItemDetailViewController): void;
}

declare class MKMapItemDetailViewControllerDelegate extends NativeObject implements MKMapItemDetailViewControllerDelegate {
}

declare interface MKAnnotation extends NSObject {
  readonly coordinate: CLLocationCoordinate2D;

  readonly title?: string;

  readonly subtitle?: string;
}

declare class MKAnnotation extends NativeObject implements MKAnnotation {
}

declare interface MKMapViewDelegate extends NSObject {
  mapViewRegionWillChangeAnimated?(mapView: interop.Object, animated: boolean): void;

  mapViewRegionDidChangeAnimated?(mapView: interop.Object, animated: boolean): void;

  mapViewWillStartLoadingMap?(mapView: interop.Object): void;

  mapViewDidFinishLoadingMap?(mapView: interop.Object): void;

  mapViewDidFailLoadingMapWithError?(mapView: interop.Object, error: NSError): void;

  mapViewViewForAnnotation?(mapView: interop.Object, annotation: MKAnnotation): interop.Object;

  mapViewDidAddAnnotationViews?(mapView: interop.Object, views: NSArray<interop.Object> | Array<interop.Object>): void;

  mapViewAnnotationViewCalloutAccessoryControlTapped?(mapView: interop.Object, view: interop.Object, control: interop.Object): void;

  mapViewSelectionAccessoryForAnnotation?(mapView: interop.Object, annotation: MKAnnotation): MKSelectionAccessory;
}

declare class MKMapViewDelegate extends NativeObject implements MKMapViewDelegate {
}

declare class MKMapItemAnnotation extends NSObject implements MKAnnotation {
  initWithMapItem(mapItem: interop.Object): this;

  readonly mapItem: interop.Object;

  readonly coordinate: CLLocationCoordinate2D;

  readonly title: string;

  readonly subtitle: string;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  isProxy(): boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  zone(): interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class MKMapItemDetailSelectionAccessoryPresentationStyle extends NSObject {
  static automaticWithPresentationViewController(presentationViewController: interop.Object | null): MKMapItemDetailSelectionAccessoryPresentationStyle;

  static readonly callout: MKMapItemDetailSelectionAccessoryPresentationStyle;

  static calloutWithCalloutStyle(style: interop.Enum<typeof MKMapItemDetailSelectionAccessoryCalloutStyle>): MKMapItemDetailSelectionAccessoryPresentationStyle;

  static sheetPresentedFromViewController(viewController: interop.Object): MKMapItemDetailSelectionAccessoryPresentationStyle;

  static readonly openInMaps: MKMapItemDetailSelectionAccessoryPresentationStyle;
}

declare class MKSelectionAccessory extends NSObject {
  static mapItemDetailWithPresentationStyle(presentationStyle: MKMapItemDetailSelectionAccessoryPresentationStyle): MKSelectionAccessory;
}

declare class MKAddressFilter extends NSObject implements NSSecureCoding, NSCopying {
  static readonly filterIncludingAll: MKAddressFilter;

  static readonly filterExcludingAll: MKAddressFilter;

  initIncludingOptions(options: interop.Enum<typeof MKAddressFilterOption>): this;

  initExcludingOptions(options: interop.Enum<typeof MKAddressFilterOption>): this;

  includesOptions(options: interop.Enum<typeof MKAddressFilterOption>): boolean;

  excludesOptions(options: interop.Enum<typeof MKAddressFilterOption>): boolean;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class MKMapItemDetailViewController extends UIViewController {
  mapItem: interop.Object;

  delegate: MKMapItemDetailViewControllerDelegate;

  initWithMapItemDisplaysMap(mapItem: interop.Object | null, displaysMap: boolean): this;

  initWithMapItem(mapItem: interop.Object | null): this;
}

declare class MKMapItemRequest extends NSObject {
  initWithMapItemIdentifier(identifier: MKMapItemIdentifier): this;

  initWithMapFeatureAnnotation(mapFeatureAnnotation: interop.Object): this;

  getMapItemWithCompletionHandler(completionHandler: (p1: interop.Object, p2: NSError) => void | null): void;

  cancel(): void;

  readonly mapItemIdentifier: MKMapItemIdentifier;

  readonly mapFeatureAnnotation: interop.Object;

  readonly featureAnnotation: interop.Object;

  readonly isCancelled: boolean;

  readonly isLoading: boolean;
}

declare class MKMapItemIdentifier extends NSObject implements NSCopying, NSSecureCoding {
  initWithIdentifierString(string: string): this;

  readonly identifierString: string;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}


/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./UIKit.d.ts" />

declare const CPMaximumMessageItemImageSize: CGSize;

declare const CPMaximumNumberOfGridImages: number;

declare const CarPlayErrorDomain: string;

declare const CPButtonMaximumImageSize: CGSize;

declare const CPTemplateApplicationDashboardSceneSessionRoleApplication: string;

declare const CPMaximumListSectionImageSize: CGSize;

declare const CPTemplateApplicationSceneSessionRoleApplication: string;

declare const CPGridTemplateMaximumItems: number;

declare const CPNowPlayingButtonMaximumImageSize: CGSize;

declare const CPTemplateApplicationInstrumentClusterSceneSessionRoleApplication: string;

declare const CPNavigationAlertMinimumDuration: number;

declare const CPMessageLeadingItem: {
  None: 0,
  Pin: 1,
  Star: 2,
};

declare const CPTripEstimateStyle: {
  Light: 0,
  Dark: 1,
};

declare const CPManeuverDisplayStyle: {
  Default: 0,
  LeadingSymbol: 1,
  TrailingSymbol: 2,
  SymbolOnly: 3,
  InstructionOnly: 4,
};

declare const CPPanDirection: {
  None: 0,
  Left: 1,
  Right: 2,
  Up: 4,
  Down: 8,
};

declare const CPNavigationAlertDismissalContext: {
  Timeout: 0,
  UserDismissed: 1,
  SystemDismissed: 2,
};

declare const CPManeuverState: {
  Continue: 0,
  Initial: 1,
  Prepare: 2,
  Execute: 3,
};

declare const CPJunctionType: {
  Intersection: 0,
  Roundabout: 1,
};

declare const CPLaneStatus: {
  NotGood: 0,
  Good: 1,
  Preferred: 2,
};

declare const CPInformationTemplateLayout: {
  Leading: 0,
  TwoColumn: 1,
};

declare const CPBarButtonType: {
  Text: 0,
  Image: 1,
};

declare const CPAssistantCellActionType: {
  PlayMedia: 0,
  StartCall: 1,
};

declare const CPBarButtonStyle: {
  None: 0,
  Rounded: 1,
};

declare const CPContentStyle: {
  Light: 1,
  Dark: 2,
};

declare const CPInstrumentClusterSetting: {
  Unspecified: 0,
  Enabled: 1,
  Disabled: 2,
  UserPreference: 3,
};

declare const CPTrafficSide: {
  Right: 0,
  Left: 1,
};

declare const CPLimitableUserInterface: {
  Keyboard: 1,
  Lists: 2,
};

declare const CPAssistantCellPosition: {
  Top: 0,
  Bottom: 1,
};

declare const CPTimeRemainingColor: {
  Default: 0,
  Green: 1,
  Orange: 2,
  Red: 3,
};

declare const CPListItemPlayingIndicatorLocation: {
  Leading: 0,
  Trailing: 1,
};

declare const CPTripPauseReason: {
  Arrived: 1,
  Loading: 2,
  Locating: 3,
  Rerouting: 4,
  ProceedToRoute: 5,
};

declare const CPMessageTrailingItem: {
  None: 0,
  Mute: 1,
};

declare const CPManeuverType: {
  NoTurn: 0,
  LeftTurn: 1,
  RightTurn: 2,
  StraightAhead: 3,
  UTurn: 4,
  FollowRoad: 5,
  EnterRoundabout: 6,
  ExitRoundabout: 7,
  OffRamp: 8,
  OnRamp: 9,
  ArriveEndOfNavigation: 10,
  StartRoute: 11,
  ArriveAtDestination: 12,
  KeepLeft: 13,
  KeepRight: 14,
  Enter_Ferry: 15,
  ExitFerry: 16,
  ChangeFerry: 17,
  StartRouteWithUTurn: 18,
  UTurnAtRoundabout: 19,
  LeftTurnAtEnd: 20,
  RightTurnAtEnd: 21,
  HighwayOffRampLeft: 22,
  HighwayOffRampRight: 23,
  ArriveAtDestinationLeft: 24,
  ArriveAtDestinationRight: 25,
  UTurnWhenPossible: 26,
  ArriveEndOfDirections: 27,
  RoundaboutExit1: 28,
  RoundaboutExit2: 29,
  RoundaboutExit3: 30,
  RoundaboutExit4: 31,
  RoundaboutExit5: 32,
  RoundaboutExit6: 33,
  RoundaboutExit7: 34,
  RoundaboutExit8: 35,
  RoundaboutExit9: 36,
  RoundaboutExit10: 37,
  RoundaboutExit11: 38,
  RoundaboutExit12: 39,
  RoundaboutExit13: 40,
  RoundaboutExit14: 41,
  RoundaboutExit15: 42,
  RoundaboutExit16: 43,
  RoundaboutExit17: 44,
  RoundaboutExit18: 45,
  RoundaboutExit19: 46,
  SharpLeftTurn: 47,
  SharpRightTurn: 48,
  SlightLeftTurn: 49,
  SlightRightTurn: 50,
  ChangeHighway: 51,
  ChangeHighwayLeft: 52,
  ChangeHighwayRight: 53,
};

declare const CPListItemAccessoryType: {
  None: 0,
  DisclosureIndicator: 1,
  Cloud: 2,
};

declare const CPTextButtonStyle: {
  Normal: 0,
  Cancel: 1,
  Confirm: 2,
};

declare const CPAlertActionStyle: {
  Default: 0,
  Cancel: 1,
  Destructive: 2,
};

declare const CPAssistantCellVisibility: {
  Off: 0,
  WhileLimitedUIActive: 1,
  Always: 2,
};

declare interface CPTemplateApplicationSceneDelegate extends UISceneDelegate {
  templateApplicationSceneDidConnectInterfaceControllerToWindow?(templateApplicationScene: CPTemplateApplicationScene, interfaceController: CPInterfaceController, window: CPWindow): void;

  templateApplicationSceneDidConnectInterfaceController?(templateApplicationScene: CPTemplateApplicationScene, interfaceController: CPInterfaceController): void;

  templateApplicationSceneDidDisconnectInterfaceControllerFromWindow?(templateApplicationScene: CPTemplateApplicationScene, interfaceController: CPInterfaceController, window: CPWindow): void;

  templateApplicationSceneDidDisconnectInterfaceController?(templateApplicationScene: CPTemplateApplicationScene, interfaceController: CPInterfaceController): void;

  templateApplicationSceneDidSelectNavigationAlert?(templateApplicationScene: CPTemplateApplicationScene, navigationAlert: CPNavigationAlert): void;

  templateApplicationSceneDidSelectManeuver?(templateApplicationScene: CPTemplateApplicationScene, maneuver: CPManeuver): void;

  contentStyleDidChange?(contentStyle: interop.Enum<typeof UIUserInterfaceStyle>): void;
}

declare class CPTemplateApplicationSceneDelegate extends NativeObject implements CPTemplateApplicationSceneDelegate {
}

declare interface CPSearchTemplateDelegate extends NSObjectProtocol {
  searchTemplateUpdatedSearchTextCompletionHandler(searchTemplate: CPSearchTemplate, searchText: string, completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>) => void): void;

  searchTemplateSelectedResultCompletionHandler(searchTemplate: CPSearchTemplate, item: CPListItem, completionHandler: () => void): void;

  searchTemplateSearchButtonPressed?(searchTemplate: CPSearchTemplate): void;
}

declare class CPSearchTemplateDelegate extends NativeObject implements CPSearchTemplateDelegate {
}

declare interface CPPointOfInterestTemplateDelegate extends NSObjectProtocol {
  pointOfInterestTemplateDidChangeMapRegion(pointOfInterestTemplate: CPPointOfInterestTemplate, region: MKCoordinateRegion): void;

  pointOfInterestTemplateDidSelectPointOfInterest?(pointOfInterestTemplate: CPPointOfInterestTemplate, pointOfInterest: CPPointOfInterest): void;
}

declare class CPPointOfInterestTemplateDelegate extends NativeObject implements CPPointOfInterestTemplateDelegate {
}

declare interface CPMapTemplateDelegate extends NSObjectProtocol {
  mapTemplateShouldProvideNavigationMetadata?(mapTemplate: CPMapTemplate): boolean;

  mapTemplateShouldShowNotificationForManeuver?(mapTemplate: CPMapTemplate, maneuver: CPManeuver): boolean;

  mapTemplateShouldUpdateNotificationForManeuverWithTravelEstimates?(mapTemplate: CPMapTemplate, maneuver: CPManeuver, travelEstimates: CPTravelEstimates): boolean;

  mapTemplateShouldShowNotificationForNavigationAlert?(mapTemplate: CPMapTemplate, navigationAlert: CPNavigationAlert): boolean;

  mapTemplateDidShowPanningInterface?(mapTemplate: CPMapTemplate): void;

  mapTemplateWillDismissPanningInterface?(mapTemplate: CPMapTemplate): void;

  mapTemplateDidDismissPanningInterface?(mapTemplate: CPMapTemplate): void;

  mapTemplatePanBeganWithDirection?(mapTemplate: CPMapTemplate, direction: interop.Enum<typeof CPPanDirection>): void;

  mapTemplatePanEndedWithDirection?(mapTemplate: CPMapTemplate, direction: interop.Enum<typeof CPPanDirection>): void;

  mapTemplatePanWithDirection?(mapTemplate: CPMapTemplate, direction: interop.Enum<typeof CPPanDirection>): void;

  mapTemplateDidBeginPanGesture?(mapTemplate: CPMapTemplate): void;

  mapTemplateDidUpdatePanGestureWithTranslationVelocity?(mapTemplate: CPMapTemplate, translation: CGPoint, velocity: CGPoint): void;

  mapTemplateDidEndPanGestureWithVelocity?(mapTemplate: CPMapTemplate, velocity: CGPoint): void;

  mapTemplateWillShowNavigationAlert?(mapTemplate: CPMapTemplate, navigationAlert: CPNavigationAlert): void;

  mapTemplateDidShowNavigationAlert?(mapTemplate: CPMapTemplate, navigationAlert: CPNavigationAlert): void;

  mapTemplateWillDismissNavigationAlertDismissalContext?(mapTemplate: CPMapTemplate, navigationAlert: CPNavigationAlert, dismissalContext: interop.Enum<typeof CPNavigationAlertDismissalContext>): void;

  mapTemplateDidDismissNavigationAlertDismissalContext?(mapTemplate: CPMapTemplate, navigationAlert: CPNavigationAlert, dismissalContext: interop.Enum<typeof CPNavigationAlertDismissalContext>): void;

  mapTemplateSelectedPreviewForTripUsingRouteChoice?(mapTemplate: CPMapTemplate, trip: CPTrip, routeChoice: CPRouteChoice): void;

  mapTemplateStartedTripUsingRouteChoice?(mapTemplate: CPMapTemplate, trip: CPTrip, routeChoice: CPRouteChoice): void;

  mapTemplateDidCancelNavigation?(mapTemplate: CPMapTemplate): void;

  mapTemplateDisplayStyleForManeuver?(mapTemplate: CPMapTemplate, maneuver: CPManeuver): interop.Enum<typeof CPManeuverDisplayStyle>;
}

declare class CPMapTemplateDelegate extends NativeObject implements CPMapTemplateDelegate {
}

declare interface CPInterfaceControllerDelegate extends NSObjectProtocol {
  templateWillAppearAnimated?(aTemplate: CPTemplate, animated: boolean): void;

  templateDidAppearAnimated?(aTemplate: CPTemplate, animated: boolean): void;

  templateWillDisappearAnimated?(aTemplate: CPTemplate, animated: boolean): void;

  templateDidDisappearAnimated?(aTemplate: CPTemplate, animated: boolean): void;
}

declare class CPInterfaceControllerDelegate extends NativeObject implements CPInterfaceControllerDelegate {
}

declare interface CPSelectableListItem extends CPListTemplateItem {
  handler: (p1: CPSelectableListItem, p2: () => void) => void;

  setHandler(handler: (p1: CPSelectableListItem, p2: () => void) => void | null): void;
}

declare class CPSelectableListItem extends NativeObject implements CPSelectableListItem {
}

declare interface CPNowPlayingTemplateObserver extends NSObjectProtocol {
  nowPlayingTemplateUpNextButtonTapped?(nowPlayingTemplate: CPNowPlayingTemplate): void;

  nowPlayingTemplateAlbumArtistButtonTapped?(nowPlayingTemplate: CPNowPlayingTemplate): void;
}

declare class CPNowPlayingTemplateObserver extends NativeObject implements CPNowPlayingTemplateObserver {
}

declare interface CPTemplateApplicationInstrumentClusterSceneDelegate extends UISceneDelegate {
  templateApplicationInstrumentClusterSceneDidConnectInstrumentClusterController?(templateApplicationInstrumentClusterScene: CPTemplateApplicationInstrumentClusterScene, instrumentClusterController: CPInstrumentClusterController): void;

  templateApplicationInstrumentClusterSceneDidDisconnectInstrumentClusterController?(templateApplicationInstrumentClusterScene: CPTemplateApplicationInstrumentClusterScene, instrumentClusterController: CPInstrumentClusterController): void;

  contentStyleDidChange?(contentStyle: interop.Enum<typeof UIUserInterfaceStyle>): void;
}

declare class CPTemplateApplicationInstrumentClusterSceneDelegate extends NativeObject implements CPTemplateApplicationInstrumentClusterSceneDelegate {
}

declare interface CPTemplateApplicationDashboardSceneDelegate extends UISceneDelegate {
  templateApplicationDashboardSceneDidConnectDashboardControllerToWindow?(templateApplicationDashboardScene: CPTemplateApplicationDashboardScene, dashboardController: CPDashboardController, window: UIWindow): void;

  templateApplicationDashboardSceneDidDisconnectDashboardControllerFromWindow?(templateApplicationDashboardScene: CPTemplateApplicationDashboardScene, dashboardController: CPDashboardController, window: UIWindow): void;
}

declare class CPTemplateApplicationDashboardSceneDelegate extends NativeObject implements CPTemplateApplicationDashboardSceneDelegate {
}

declare interface CPListTemplateItem extends NSObjectProtocol {
  readonly text: string;

  userInfo: interop.Object;

  enabled: boolean;

  setUserInfo(userInfo: interop.Object | null): void;

  isEnabled(): boolean;

  setEnabled(enabled: boolean): void;
}

declare class CPListTemplateItem extends NativeObject implements CPListTemplateItem {
}

declare interface CPTabBarTemplateDelegate extends NSObjectProtocol {
  tabBarTemplateDidSelectTemplate(tabBarTemplate: CPTabBarTemplate, selectedTemplate: CPTemplate): void;
}

declare class CPTabBarTemplateDelegate extends NativeObject implements CPTabBarTemplateDelegate {
}

declare interface CPBarButtonProviding extends NSObjectProtocol {
  get leadingNavigationBarButtons(): NSArray;
  set leadingNavigationBarButtons(value: NSArray<interop.Object> | Array<interop.Object>);

  get trailingNavigationBarButtons(): NSArray;
  set trailingNavigationBarButtons(value: NSArray<interop.Object> | Array<interop.Object>);

  backButton: CPBarButton;

  setLeadingNavigationBarButtons(leadingNavigationBarButtons: NSArray<interop.Object> | Array<interop.Object>): void;

  setTrailingNavigationBarButtons(trailingNavigationBarButtons: NSArray<interop.Object> | Array<interop.Object>): void;

  setBackButton(backButton: CPBarButton | null): void;
}

declare class CPBarButtonProviding extends NativeObject implements CPBarButtonProviding {
}

declare interface CPSessionConfigurationDelegate extends NSObjectProtocol {
  sessionConfigurationLimitedUserInterfacesChanged?(sessionConfiguration: CPSessionConfiguration, limitedUserInterfaces: interop.Enum<typeof CPLimitableUserInterface>): void;

  sessionConfigurationContentStyleChanged?(sessionConfiguration: CPSessionConfiguration, contentStyle: interop.Enum<typeof CPContentStyle>): void;
}

declare class CPSessionConfigurationDelegate extends NativeObject implements CPSessionConfigurationDelegate {
}

declare interface CPListTemplateDelegate extends NSObjectProtocol {
  listTemplateDidSelectListItemCompletionHandler(listTemplate: CPListTemplate, item: CPListItem, completionHandler: () => void): void;
}

declare class CPListTemplateDelegate extends NativeObject implements CPListTemplateDelegate {
}

declare interface CPInstrumentClusterControllerDelegate extends NSObjectProtocol {
  instrumentClusterControllerDidConnectWindow(instrumentClusterWindow: UIWindow): void;

  instrumentClusterControllerDidDisconnectWindow(instrumentClusterWindow: UIWindow): void;

  instrumentClusterControllerDidZoomIn?(instrumentClusterController: CPInstrumentClusterController): void;

  instrumentClusterControllerDidZoomOut?(instrumentClusterController: CPInstrumentClusterController): void;

  instrumentClusterControllerDidChangeCompassSetting?(instrumentClusterController: CPInstrumentClusterController, compassSetting: interop.Enum<typeof CPInstrumentClusterSetting>): void;

  instrumentClusterControllerDidChangeSpeedLimitSetting?(instrumentClusterController: CPInstrumentClusterController, speedLimitSetting: interop.Enum<typeof CPInstrumentClusterSetting>): void;
}

declare class CPInstrumentClusterControllerDelegate extends NativeObject implements CPInstrumentClusterControllerDelegate {
}

declare interface CPApplicationDelegate extends UIApplicationDelegate {
  applicationDidConnectCarInterfaceControllerToWindow(application: UIApplication, interfaceController: CPInterfaceController, window: CPWindow): void;

  applicationDidDisconnectCarInterfaceControllerFromWindow(application: UIApplication, interfaceController: CPInterfaceController, window: CPWindow): void;

  applicationDidSelectNavigationAlert?(application: UIApplication, navigationAlert: CPNavigationAlert): void;

  applicationDidSelectManeuver?(application: UIApplication, maneuver: CPManeuver): void;
}

declare class CPApplicationDelegate extends NativeObject implements CPApplicationDelegate {
}

declare class CPGridTemplate extends CPTemplate implements CPBarButtonProviding {
  initWithTitleGridButtons(title: string | null, gridButtons: NSArray<interop.Object> | Array<interop.Object>): this;

  readonly gridButtons: NSArray;

  updateGridButtons(gridButtons: NSArray<interop.Object> | Array<interop.Object>): void;

  readonly title: string;

  updateTitle(title: string): void;

  get leadingNavigationBarButtons(): NSArray;
  set leadingNavigationBarButtons(value: NSArray<interop.Object> | Array<interop.Object>);

  get trailingNavigationBarButtons(): NSArray;
  set trailingNavigationBarButtons(value: NSArray<interop.Object> | Array<interop.Object>);

  backButton: CPBarButton;

  setLeadingNavigationBarButtons(leadingNavigationBarButtons: NSArray<interop.Object> | Array<interop.Object>): void;

  setTrailingNavigationBarButtons(trailingNavigationBarButtons: NSArray<interop.Object> | Array<interop.Object>): void;

  setBackButton(backButton: CPBarButton | null): void;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class CPVoiceControlState extends NSObject implements NSSecureCoding {
  initWithIdentifierTitleVariantsImageRepeats(identifier: string, titleVariants: NSArray<interop.Object> | Array<interop.Object> | null, image: UIImage | null, repeats: boolean): this;

  readonly titleVariants: NSArray;

  readonly image: UIImage;

  readonly identifier: string;

  readonly repeats: boolean;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CPSessionConfiguration extends NSObject {
  initWithDelegate(delegate: CPSessionConfigurationDelegate): this;

  readonly limitedUserInterfaces: interop.Enum<typeof CPLimitableUserInterface>;

  readonly contentStyle: interop.Enum<typeof CPContentStyle>;

  delegate: CPSessionConfigurationDelegate | null;

  setDelegate(delegate: CPSessionConfigurationDelegate | null): void;
}

declare class CPPointOfInterestTemplate extends CPTemplate implements CPBarButtonProviding {
  initWithTitlePointsOfInterestSelectedIndex(title: string, pointsOfInterest: NSArray<interop.Object> | Array<interop.Object>, selectedIndex: number): this;

  title: string;

  setPointsOfInterestSelectedIndex(pointsOfInterest: NSArray<interop.Object> | Array<interop.Object>, selectedIndex: number): void;

  readonly pointsOfInterest: NSArray;

  selectedIndex: number;

  pointOfInterestDelegate: CPPointOfInterestTemplateDelegate;

  setTitle(title: string): void;

  setSelectedIndex(selectedIndex: number): void;

  setPointOfInterestDelegate(pointOfInterestDelegate: CPPointOfInterestTemplateDelegate | null): void;

  get leadingNavigationBarButtons(): NSArray;
  set leadingNavigationBarButtons(value: NSArray<interop.Object> | Array<interop.Object>);

  get trailingNavigationBarButtons(): NSArray;
  set trailingNavigationBarButtons(value: NSArray<interop.Object> | Array<interop.Object>);

  backButton: CPBarButton;

  setLeadingNavigationBarButtons(leadingNavigationBarButtons: NSArray<interop.Object> | Array<interop.Object>): void;

  setTrailingNavigationBarButtons(trailingNavigationBarButtons: NSArray<interop.Object> | Array<interop.Object>): void;

  setBackButton(backButton: CPBarButton | null): void;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class CPPointOfInterest extends NSObject implements NSSecureCoding {
  initWithLocationTitleSubtitleSummaryDetailTitleDetailSubtitleDetailSummaryPinImageSelectedPinImage(location: MKMapItem, title: string, subtitle: string | null, summary: string | null, detailTitle: string | null, detailSubtitle: string | null, detailSummary: string | null, pinImage: UIImage | null, selectedPinImage: UIImage | null): this;

  initWithLocationTitleSubtitleSummaryDetailTitleDetailSubtitleDetailSummaryPinImage(location: MKMapItem, title: string, subtitle: string | null, summary: string | null, detailTitle: string | null, detailSubtitle: string | null, detailSummary: string | null, pinImage: UIImage | null): this;

  static readonly pinImageSize: CGSize;

  static readonly selectedPinImageSize: CGSize;

  location: MKMapItem;

  title: string;

  subtitle: string;

  summary: string;

  detailTitle: string;

  detailSubtitle: string;

  detailSummary: string;

  pinImage: UIImage;

  selectedPinImage: UIImage;

  primaryButton: CPTextButton;

  secondaryButton: CPTextButton;

  userInfo: interop.Object;

  setLocation(location: MKMapItem): void;

  setTitle(title: string): void;

  setSubtitle(subtitle: string | null): void;

  setSummary(summary: string | null): void;

  setDetailTitle(detailTitle: string | null): void;

  setDetailSubtitle(detailSubtitle: string | null): void;

  setDetailSummary(detailSummary: string | null): void;

  setPinImage(pinImage: UIImage | null): void;

  setSelectedPinImage(selectedPinImage: UIImage): void;

  setPrimaryButton(primaryButton: CPTextButton | null): void;

  setSecondaryButton(secondaryButton: CPTextButton | null): void;

  setUserInfo(userInfo: interop.Object | null): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CPNowPlayingTemplate extends CPTemplate {
  static readonly sharedTemplate: CPNowPlayingTemplate;

  addObserver(observer: CPNowPlayingTemplateObserver): void;

  removeObserver(observer: CPNowPlayingTemplateObserver): void;

  readonly nowPlayingButtons: NSArray;

  upNextButtonEnabled: boolean;

  upNextTitle: string;

  albumArtistButtonEnabled: boolean;

  updateNowPlayingButtons(nowPlayingButtons: NSArray<interop.Object> | Array<interop.Object>): void;

  nowPlayingMode: CPNowPlayingMode;

  isUpNextButtonEnabled(): boolean;

  setUpNextButtonEnabled(upNextButtonEnabled: boolean): void;

  setUpNextTitle(upNextTitle: string): void;

  isAlbumArtistButtonEnabled(): boolean;

  setAlbumArtistButtonEnabled(albumArtistButtonEnabled: boolean): void;

  setNowPlayingMode(nowPlayingMode: CPNowPlayingMode): void;
}

declare class CPNowPlayingSportsClock extends NSObject implements NSSecureCoding {
  initWithElapsedTimePaused(elapsedTime: number, paused: boolean): this;

  initWithTimeRemainingPaused(timeRemaining: number, paused: boolean): this;

  readonly timeValue: number;

  readonly paused: boolean;

  readonly countsUp: boolean;

  isPaused(): boolean;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CPNowPlayingMode extends NSObject implements NSSecureCoding {
  static readonly defaultNowPlayingMode: CPNowPlayingMode;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CPNowPlayingMoreButton extends CPNowPlayingButton {
}

declare class CPNowPlayingButton extends NSObject implements NSSecureCoding {
  initWithHandler(handler: (p1: CPNowPlayingButton) => void | null): this;

  enabled: boolean;

  selected: boolean;

  isEnabled(): boolean;

  setEnabled(enabled: boolean): void;

  isSelected(): boolean;

  setSelected(selected: boolean): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CPMessageComposeBarButton extends CPBarButton {
  init(): this;

  static new<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  initWithImage(image: UIImage): this;
}

declare class CPMapTemplate extends CPTemplate implements CPBarButtonProviding {
  guidanceBackgroundColor: UIColor;

  tripEstimateStyle: interop.Enum<typeof CPTripEstimateStyle>;

  get mapButtons(): NSArray;
  set mapButtons(value: NSArray<interop.Object> | Array<interop.Object>);

  showTripPreviewsTextConfiguration(tripPreviews: NSArray<interop.Object> | Array<interop.Object>, textConfiguration: CPTripPreviewTextConfiguration | null): void;

  showTripPreviewsSelectedTripTextConfiguration(tripPreviews: NSArray<interop.Object> | Array<interop.Object>, selectedTrip: CPTrip | null, textConfiguration: CPTripPreviewTextConfiguration | null): void;

  showRouteChoicesPreviewForTripTextConfiguration(tripPreview: CPTrip, textConfiguration: CPTripPreviewTextConfiguration | null): void;

  hideTripPreviews(): void;

  updateTravelEstimatesForTrip(estimates: CPTravelEstimates, trip: CPTrip): void;

  updateTravelEstimatesForTripWithTimeRemainingColor(estimates: CPTravelEstimates, trip: CPTrip, timeRemainingColor: interop.Enum<typeof CPTimeRemainingColor>): void;

  startNavigationSessionForTrip(trip: CPTrip): CPNavigationSession;

  automaticallyHidesNavigationBar: boolean;

  hidesButtonsWithNavigationBar: boolean;

  mapDelegate: CPMapTemplateDelegate;

  showPanningInterfaceAnimated(animated: boolean): void;

  dismissPanningInterfaceAnimated(animated: boolean): void;

  readonly panningInterfaceVisible: boolean;

  readonly currentNavigationAlert: CPNavigationAlert;

  presentNavigationAlertAnimated(navigationAlert: CPNavigationAlert, animated: boolean): void;

  dismissNavigationAlertAnimatedCompletion(animated: boolean, completion: (p1: boolean) => void): void;

  setGuidanceBackgroundColor(guidanceBackgroundColor: UIColor): void;

  setTripEstimateStyle(tripEstimateStyle: interop.Enum<typeof CPTripEstimateStyle>): void;

  setMapButtons(mapButtons: NSArray<interop.Object> | Array<interop.Object>): void;

  setAutomaticallyHidesNavigationBar(automaticallyHidesNavigationBar: boolean): void;

  setHidesButtonsWithNavigationBar(hidesButtonsWithNavigationBar: boolean): void;

  setMapDelegate(mapDelegate: CPMapTemplateDelegate | null): void;

  isPanningInterfaceVisible(): boolean;

  get leadingNavigationBarButtons(): NSArray;
  set leadingNavigationBarButtons(value: NSArray<interop.Object> | Array<interop.Object>);

  get trailingNavigationBarButtons(): NSArray;
  set trailingNavigationBarButtons(value: NSArray<interop.Object> | Array<interop.Object>);

  backButton: CPBarButton;

  setLeadingNavigationBarButtons(leadingNavigationBarButtons: NSArray<interop.Object> | Array<interop.Object>): void;

  setTrailingNavigationBarButtons(trailingNavigationBarButtons: NSArray<interop.Object> | Array<interop.Object>): void;

  setBackButton(backButton: CPBarButton | null): void;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class CPNavigationAlert extends NSObject implements NSSecureCoding {
  initWithTitleVariantsSubtitleVariantsImageSetPrimaryActionSecondaryActionDuration(titleVariants: NSArray<interop.Object> | Array<interop.Object>, subtitleVariants: NSArray<interop.Object> | Array<interop.Object> | null, imageSet: CPImageSet | null, primaryAction: CPAlertAction, secondaryAction: CPAlertAction | null, duration: number): this;

  initWithTitleVariantsSubtitleVariantsImagePrimaryActionSecondaryActionDuration(titleVariants: NSArray<interop.Object> | Array<interop.Object>, subtitleVariants: NSArray<interop.Object> | Array<interop.Object> | null, image: UIImage | null, primaryAction: CPAlertAction, secondaryAction: CPAlertAction | null, duration: number): this;

  updateTitleVariantsSubtitleVariants(newTitleVariants: NSArray<interop.Object> | Array<interop.Object>, newSubtitleVariants: NSArray<interop.Object> | Array<interop.Object>): void;

  readonly titleVariants: NSArray;

  readonly subtitleVariants: NSArray;

  readonly imageSet: CPImageSet;

  readonly image: UIImage;

  readonly primaryAction: CPAlertAction;

  readonly secondaryAction: CPAlertAction;

  readonly duration: number;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CPManeuver extends NSObject implements NSCopying, NSSecureCoding {
  symbolSet: CPImageSet;

  cardBackgroundColor: UIColor;

  symbolImage: UIImage;

  junctionImage: UIImage;

  get instructionVariants(): NSArray;
  set instructionVariants(value: NSArray<interop.Object> | Array<interop.Object>);

  initialTravelEstimates: CPTravelEstimates;

  get attributedInstructionVariants(): NSArray;
  set attributedInstructionVariants(value: NSArray<interop.Object> | Array<interop.Object>);

  dashboardSymbolImage: UIImage;

  dashboardJunctionImage: UIImage;

  get dashboardInstructionVariants(): NSArray;
  set dashboardInstructionVariants(value: NSArray<interop.Object> | Array<interop.Object>);

  get dashboardAttributedInstructionVariants(): NSArray;
  set dashboardAttributedInstructionVariants(value: NSArray<interop.Object> | Array<interop.Object>);

  notificationSymbolImage: UIImage;

  get notificationInstructionVariants(): NSArray;
  set notificationInstructionVariants(value: NSArray<interop.Object> | Array<interop.Object>);

  get notificationAttributedInstructionVariants(): NSArray;
  set notificationAttributedInstructionVariants(value: NSArray<interop.Object> | Array<interop.Object>);

  maneuverType: interop.Enum<typeof CPManeuverType>;

  get roadFollowingManeuverVariants(): NSArray;
  set roadFollowingManeuverVariants(value: NSArray<interop.Object> | Array<interop.Object>);

  trafficSide: interop.Enum<typeof CPTrafficSide>;

  junctionType: interop.Enum<typeof CPJunctionType>;

  junctionExitAngle: NSMeasurement;

  junctionElementAngles: NSSet;

  linkedLaneGuidance: CPLaneGuidance;

  highwayExitLabel: string;

  userInfo: interop.Object;

  setSymbolSet(symbolSet: CPImageSet): void;

  setCardBackgroundColor(cardBackgroundColor: UIColor): void;

  setSymbolImage(symbolImage: UIImage | null): void;

  setJunctionImage(junctionImage: UIImage | null): void;

  setInstructionVariants(instructionVariants: NSArray<interop.Object> | Array<interop.Object>): void;

  setInitialTravelEstimates(initialTravelEstimates: CPTravelEstimates | null): void;

  setAttributedInstructionVariants(attributedInstructionVariants: NSArray<interop.Object> | Array<interop.Object>): void;

  setDashboardSymbolImage(dashboardSymbolImage: UIImage): void;

  setDashboardJunctionImage(dashboardJunctionImage: UIImage): void;

  setDashboardInstructionVariants(dashboardInstructionVariants: NSArray<interop.Object> | Array<interop.Object>): void;

  setDashboardAttributedInstructionVariants(dashboardAttributedInstructionVariants: NSArray<interop.Object> | Array<interop.Object>): void;

  setNotificationSymbolImage(notificationSymbolImage: UIImage): void;

  setNotificationInstructionVariants(notificationInstructionVariants: NSArray<interop.Object> | Array<interop.Object>): void;

  setNotificationAttributedInstructionVariants(notificationAttributedInstructionVariants: NSArray<interop.Object> | Array<interop.Object>): void;

  setManeuverType(maneuverType: interop.Enum<typeof CPManeuverType>): void;

  setRoadFollowingManeuverVariants(roadFollowingManeuverVariants: NSArray<interop.Object> | Array<interop.Object>): void;

  setTrafficSide(trafficSide: interop.Enum<typeof CPTrafficSide>): void;

  setJunctionType(junctionType: interop.Enum<typeof CPJunctionType>): void;

  setJunctionExitAngle(junctionExitAngle: NSMeasurement): void;

  setJunctionElementAngles(junctionElementAngles: NSSet): void;

  setLinkedLaneGuidance(linkedLaneGuidance: CPLaneGuidance): void;

  setHighwayExitLabel(highwayExitLabel: string): void;

  setUserInfo(userInfo: interop.Object | null): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CPLaneGuidance extends NSObject implements NSCopying, NSSecureCoding {
  get lanes(): NSArray;
  set lanes(value: NSArray<interop.Object> | Array<interop.Object>);

  get instructionVariants(): NSArray;
  set instructionVariants(value: NSArray<interop.Object> | Array<interop.Object>);

  setLanes(lanes: NSArray<interop.Object> | Array<interop.Object>): void;

  setInstructionVariants(instructionVariants: NSArray<interop.Object> | Array<interop.Object>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CPListItem extends NSObject implements CPSelectableListItem {
  initWithTextDetailTextImageAccessoryImageAccessoryType(text: string | null, detailText: string | null, image: UIImage | null, accessoryImage: UIImage | null, accessoryType: interop.Enum<typeof CPListItemAccessoryType>): this;

  initWithTextDetailTextImage(text: string | null, detailText: string | null, image: UIImage | null): this;

  initWithTextDetailText(text: string | null, detailText: string | null): this;

  enabled: boolean;

  accessoryType: interop.Enum<typeof CPListItemAccessoryType>;

  explicitContent: boolean;

  playbackProgress: number;

  playing: boolean;

  playingIndicatorLocation: interop.Enum<typeof CPListItemPlayingIndicatorLocation>;

  static readonly maximumImageSize: CGSize;

  setDetailText(detailText: string | null): void;

  setImage(image: UIImage | null): void;

  setAccessoryImage(accessoryImage: UIImage | null): void;

  setText(text: string): void;

  handler: (p1: CPSelectableListItem, p2: () => void) => void;

  readonly text: string;

  userInfo: interop.Object;

  readonly detailText: string;

  readonly image: UIImage;

  readonly accessoryImage: UIImage;

  readonly showsDisclosureIndicator: boolean;

  showsExplicitLabel: boolean;

  isEnabled(): boolean;

  setEnabled(enabled: boolean): void;

  setAccessoryType(accessoryType: interop.Enum<typeof CPListItemAccessoryType>): void;

  isExplicitContent(): boolean;

  setExplicitContent(explicitContent: boolean): void;

  setPlaybackProgress(playbackProgress: number): void;

  isPlaying(): boolean;

  setPlaying(playing: boolean): void;

  setPlayingIndicatorLocation(playingIndicatorLocation: interop.Enum<typeof CPListItemPlayingIndicatorLocation>): void;

  setHandler(handler: (p1: CPSelectableListItem, p2: () => void) => void): void;

  setUserInfo(userInfo: interop.Object | null): void;

  setShowsExplicitLabel(showsExplicitLabel: boolean): void;

  initWithTextDetailTextImageShowsDisclosureIndicator(text: string | null, detailText: string | null, image: UIImage | null, showsDisclosureIndicator: boolean): this;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class CPListImageRowItem extends NSObject implements CPSelectableListItem {
  initWithTextImages(text: string, images: NSArray<interop.Object> | Array<interop.Object>): this;

  initWithTextImagesImageTitles(text: string, images: NSArray<interop.Object> | Array<interop.Object>, imageTitles: NSArray<interop.Object> | Array<interop.Object>): this;

  text: string;

  userInfo: interop.Object;

  handler: (p1: CPSelectableListItem, p2: () => void) => void;

  enabled: boolean;

  readonly gridImages: NSArray;

  updateImages(gridImages: NSArray<interop.Object> | Array<interop.Object>): void;

  get imageTitles(): NSArray;
  set imageTitles(value: NSArray<interop.Object> | Array<interop.Object>);

  listImageRowHandler: (p1: CPListImageRowItem, p2: number, p3: () => void) => void;

  static readonly maximumImageSize: CGSize;

  setText(text: string | null): void;

  setUserInfo(userInfo: interop.Object | null): void;

  setHandler(handler: (p1: CPSelectableListItem, p2: () => void) => void): void;

  isEnabled(): boolean;

  setEnabled(enabled: boolean): void;

  setImageTitles(imageTitles: NSArray<interop.Object> | Array<interop.Object>): void;

  setListImageRowHandler(listImageRowHandler: (p1: CPListImageRowItem, p2: number, p3: () => void) => void | null): void;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class CPAlertAction extends NSObject implements NSSecureCoding {
  initWithTitleStyleHandler(title: string, style: interop.Enum<typeof CPAlertActionStyle>, handler: (p1: CPAlertAction) => void): this;

  initWithTitleColorHandler(title: string, color: UIColor, handler: (p1: CPAlertAction) => void): this;

  readonly title: string;

  readonly style: interop.Enum<typeof CPAlertActionStyle>;

  readonly handler: (p1: CPAlertAction) => void;

  readonly color: UIColor;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CPInterfaceController extends NSObject {
  delegate: CPInterfaceControllerDelegate | null;

  prefersDarkUserInterfaceStyle: boolean;

  setRootTemplateAnimatedCompletion(rootTemplate: CPTemplate, animated: boolean, completion: (p1: boolean, p2: NSError) => void | null): void;

  pushTemplateAnimatedCompletion(templateToPush: CPTemplate, animated: boolean, completion: (p1: boolean, p2: NSError) => void | null): void;

  popTemplateAnimatedCompletion(animated: boolean, completion: (p1: boolean, p2: NSError) => void | null): void;

  popToRootTemplateAnimatedCompletion(animated: boolean, completion: (p1: boolean, p2: NSError) => void | null): void;

  popToTemplateAnimatedCompletion(targetTemplate: CPTemplate, animated: boolean, completion: (p1: boolean, p2: NSError) => void | null): void;

  presentTemplateAnimatedCompletion(templateToPresent: CPTemplate, animated: boolean, completion: (p1: boolean, p2: NSError) => void | null): void;

  dismissTemplateAnimatedCompletion(animated: boolean, completion: (p1: boolean, p2: NSError) => void | null): void;

  readonly presentedTemplate: CPTemplate;

  readonly rootTemplate: CPTemplate;

  readonly topTemplate: CPTemplate;

  readonly templates: NSArray;

  readonly carTraitCollection: UITraitCollection;

  setRootTemplateAnimated(rootTemplate: CPTemplate, animated: boolean): void;

  pushTemplateAnimated(templateToPush: CPTemplate, animated: boolean): void;

  popTemplateAnimated(animated: boolean): void;

  popToRootTemplateAnimated(animated: boolean): void;

  popToTemplateAnimated(targetTemplate: CPTemplate, animated: boolean): void;

  presentTemplateAnimated(templateToPresent: CPTemplate, animated: boolean): void;

  dismissTemplateAnimated(animated: boolean): void;

  setDelegate(delegate: CPInterfaceControllerDelegate | null): void;

  setPrefersDarkUserInterfaceStyle(prefersDarkUserInterfaceStyle: boolean): void;
}

declare class CPInformationTemplate extends CPTemplate implements CPBarButtonProviding {
  initWithTitleLayoutItemsActions(title: string, layout: interop.Enum<typeof CPInformationTemplateLayout>, items: NSArray<interop.Object> | Array<interop.Object>, actions: NSArray<interop.Object> | Array<interop.Object>): this;

  readonly layout: interop.Enum<typeof CPInformationTemplateLayout>;

  title: string;

  get items(): NSArray;
  set items(value: NSArray<interop.Object> | Array<interop.Object>);

  get actions(): NSArray;
  set actions(value: NSArray<interop.Object> | Array<interop.Object>);

  setTitle(title: string): void;

  setItems(items: NSArray<interop.Object> | Array<interop.Object>): void;

  setActions(actions: NSArray<interop.Object> | Array<interop.Object>): void;

  get leadingNavigationBarButtons(): NSArray;
  set leadingNavigationBarButtons(value: NSArray<interop.Object> | Array<interop.Object>);

  get trailingNavigationBarButtons(): NSArray;
  set trailingNavigationBarButtons(value: NSArray<interop.Object> | Array<interop.Object>);

  backButton: CPBarButton;

  setLeadingNavigationBarButtons(leadingNavigationBarButtons: NSArray<interop.Object> | Array<interop.Object>): void;

  setTrailingNavigationBarButtons(trailingNavigationBarButtons: NSArray<interop.Object> | Array<interop.Object>): void;

  setBackButton(backButton: CPBarButton | null): void;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class CPTextButton extends NSObject {
  initWithTitleTextStyleHandler(title: string, textStyle: interop.Enum<typeof CPTextButtonStyle>, handler: (p1: CPTextButton) => void | null): this;

  title: string;

  textStyle: interop.Enum<typeof CPTextButtonStyle>;

  setTitle(title: string): void;

  setTextStyle(textStyle: interop.Enum<typeof CPTextButtonStyle>): void;
}

declare class CPImageSet extends NSObject implements NSSecureCoding {
  initWithLightContentImageDarkContentImage(lightImage: UIImage, darkImage: UIImage): this;

  readonly lightContentImage: UIImage;

  readonly darkContentImage: UIImage;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CPGridButton extends NSObject implements NSSecureCoding {
  initWithTitleVariantsImageHandler(titleVariants: NSArray<interop.Object> | Array<interop.Object>, image: UIImage, handler: (p1: CPGridButton) => void | null): this;

  enabled: boolean;

  readonly image: UIImage;

  readonly titleVariants: NSArray;

  isEnabled(): boolean;

  setEnabled(enabled: boolean): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CPContactMessageButton extends CPButton {
  initWithPhoneOrEmail(phoneOrEmail: string): this;

  readonly phoneOrEmail: string;
}

declare class CPContactCallButton extends CPButton {
  initWithHandler(handler: (p1: CPButton) => void | null): this;
}

declare class CPButton extends NSObject {
  initWithImageHandler(image: UIImage, handler: (p1: CPButton) => void | null): this;

  readonly image: UIImage;

  title: string;

  enabled: boolean;

  setTitle(title: string | null): void;

  isEnabled(): boolean;

  setEnabled(enabled: boolean): void;
}

declare class CPTemplate extends NSObject implements NSSecureCoding {
  userInfo: interop.Object;

  tabTitle: string;

  tabImage: UIImage;

  tabSystemItem: interop.Enum<typeof UITabBarSystemItem>;

  showsTabBadge: boolean;

  setUserInfo(userInfo: interop.Object | null): void;

  setTabTitle(tabTitle: string): void;

  setTabImage(tabImage: UIImage): void;

  setTabSystemItem(tabSystemItem: interop.Enum<typeof UITabBarSystemItem>): void;

  setShowsTabBadge(showsTabBadge: boolean): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CPVoiceControlTemplate extends CPTemplate {
  initWithVoiceControlStates(voiceControlStates: NSArray<interop.Object> | Array<interop.Object>): this;

  readonly voiceControlStates: NSArray;

  activateVoiceControlStateWithIdentifier(identifier: string): void;

  readonly activeStateIdentifier: string;
}

declare class CPMessageListItem extends NSObject implements CPListTemplateItem {
  initWithConversationIdentifierTextLeadingConfigurationTrailingConfigurationDetailTextTrailingText(conversationIdentifier: string, text: string, leadingConfiguration: CPMessageListItemLeadingConfiguration, trailingConfiguration: CPMessageListItemTrailingConfiguration | null, detailText: string | null, trailingText: string | null): this;

  initWithFullNamePhoneOrEmailAddressLeadingConfigurationTrailingConfigurationDetailTextTrailingText(fullName: string, phoneOrEmailAddress: string, leadingConfiguration: CPMessageListItemLeadingConfiguration, trailingConfiguration: CPMessageListItemTrailingConfiguration | null, detailText: string | null, trailingText: string | null): this;

  text: string;

  conversationIdentifier: string;

  phoneOrEmailAddress: string;

  leadingConfiguration: CPMessageListItemLeadingConfiguration;

  trailingConfiguration: CPMessageListItemTrailingConfiguration;

  detailText: string;

  trailingText: string;

  enabled: boolean;

  userInfo: interop.Object;

  setText(text: string | null): void;

  setConversationIdentifier(conversationIdentifier: string | null): void;

  setPhoneOrEmailAddress(phoneOrEmailAddress: string | null): void;

  setLeadingConfiguration(leadingConfiguration: CPMessageListItemLeadingConfiguration): void;

  setTrailingConfiguration(trailingConfiguration: CPMessageListItemTrailingConfiguration | null): void;

  setDetailText(detailText: string | null): void;

  setTrailingText(trailingText: string | null): void;

  isEnabled(): boolean;

  setEnabled(enabled: boolean): void;

  setUserInfo(userInfo: interop.Object | null): void;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class CPMessageListItemTrailingConfiguration extends NSObject {
  readonly trailingItem: interop.Enum<typeof CPMessageTrailingItem>;

  readonly trailingImage: UIImage;

  initWithTrailingItemTrailingImage(trailingItem: interop.Enum<typeof CPMessageTrailingItem>, trailingImage: UIImage | null): this;
}

declare class CPNowPlayingAddToLibraryButton extends CPNowPlayingButton {
}

declare class CPInstrumentClusterController extends NSObject {
  delegate: CPInstrumentClusterControllerDelegate | null;

  readonly instrumentClusterWindow: UIWindow;

  readonly speedLimitSetting: interop.Enum<typeof CPInstrumentClusterSetting>;

  readonly compassSetting: interop.Enum<typeof CPInstrumentClusterSetting>;

  get inactiveDescriptionVariants(): NSArray;
  set inactiveDescriptionVariants(value: NSArray<interop.Object> | Array<interop.Object>);

  get attributedInactiveDescriptionVariants(): NSArray;
  set attributedInactiveDescriptionVariants(value: NSArray<interop.Object> | Array<interop.Object>);

  setDelegate(delegate: CPInstrumentClusterControllerDelegate | null): void;

  setInactiveDescriptionVariants(inactiveDescriptionVariants: NSArray<interop.Object> | Array<interop.Object>): void;

  setAttributedInactiveDescriptionVariants(attributedInactiveDescriptionVariants: NSArray<interop.Object> | Array<interop.Object>): void;
}

declare class CPNowPlayingSportsTeamLogo extends NSObject implements NSSecureCoding {
  initWithTeamLogo(teamLogo: UIImage): this;

  initWithTeamInitials(teamInitials: string): this;

  readonly logo: UIImage;

  readonly initials: string;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CPListSection extends NSObject implements NSSecureCoding {
  initWithItemsHeaderSectionIndexTitle(items: NSArray<interop.Object> | Array<interop.Object>, header: string | null, sectionIndexTitle: string | null): this;

  initWithItemsHeaderHeaderSubtitleHeaderImageHeaderButtonSectionIndexTitle(items: NSArray<interop.Object> | Array<interop.Object>, header: string, headerSubtitle: string | null, headerImage: UIImage | null, headerButton: CPButton | null, sectionIndexTitle: string | null): this;

  initWithItems(items: NSArray<interop.Object> | Array<interop.Object>): this;

  readonly header: string;

  readonly headerSubtitle: string;

  headerImage: UIImage;

  readonly headerButton: CPButton;

  readonly sectionIndexTitle: string;

  readonly items: NSArray;

  indexOfItem(item: CPListTemplateItem): number;

  itemAtIndex(index: number): CPListTemplateItem;

  setHeaderImage(headerImage: UIImage): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CPListTemplate extends CPTemplate implements CPBarButtonProviding {
  initWithTitleSections(title: string | null, sections: NSArray<interop.Object> | Array<interop.Object>): this;

  initWithTitleSectionsAssistantCellConfiguration(title: string | null, sections: NSArray<interop.Object> | Array<interop.Object>, assistantCellConfiguration: CPAssistantCellConfiguration | null): this;

  delegate: CPListTemplateDelegate;

  static readonly maximumItemCount: number;

  static readonly maximumSectionCount: number;

  readonly sections: NSArray;

  readonly title: string;

  updateSections(sections: NSArray<interop.Object> | Array<interop.Object>): void;

  readonly sectionCount: number;

  readonly itemCount: number;

  indexPathForItem(item: CPListTemplateItem): NSIndexPath;

  get emptyViewTitleVariants(): NSArray;
  set emptyViewTitleVariants(value: NSArray<interop.Object> | Array<interop.Object>);

  get emptyViewSubtitleVariants(): NSArray;
  set emptyViewSubtitleVariants(value: NSArray<interop.Object> | Array<interop.Object>);

  showsSpinnerWhileEmpty: boolean;

  assistantCellConfiguration: CPAssistantCellConfiguration;

  setDelegate(delegate: CPListTemplateDelegate): void;

  setEmptyViewTitleVariants(emptyViewTitleVariants: NSArray<interop.Object> | Array<interop.Object>): void;

  setEmptyViewSubtitleVariants(emptyViewSubtitleVariants: NSArray<interop.Object> | Array<interop.Object>): void;

  setShowsSpinnerWhileEmpty(showsSpinnerWhileEmpty: boolean): void;

  setAssistantCellConfiguration(assistantCellConfiguration: CPAssistantCellConfiguration): void;

  get leadingNavigationBarButtons(): NSArray;
  set leadingNavigationBarButtons(value: NSArray<interop.Object> | Array<interop.Object>);

  get trailingNavigationBarButtons(): NSArray;
  set trailingNavigationBarButtons(value: NSArray<interop.Object> | Array<interop.Object>);

  backButton: CPBarButton;

  setLeadingNavigationBarButtons(leadingNavigationBarButtons: NSArray<interop.Object> | Array<interop.Object>): void;

  setTrailingNavigationBarButtons(trailingNavigationBarButtons: NSArray<interop.Object> | Array<interop.Object>): void;

  setBackButton(backButton: CPBarButton | null): void;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class CPInformationItem extends NSObject implements NSSecureCoding {
  initWithTitleDetail(title: string | null, detail: string | null): this;

  readonly title: string;

  readonly detail: string;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CPRouteChoice extends NSObject implements NSCopying, NSSecureCoding {
  initWithSummaryVariantsAdditionalInformationVariantsSelectionSummaryVariants(summaryVariants: NSArray<interop.Object> | Array<interop.Object>, additionalInformationVariants: NSArray<interop.Object> | Array<interop.Object>, selectionSummaryVariants: NSArray<interop.Object> | Array<interop.Object>): this;

  readonly summaryVariants: NSArray;

  readonly selectionSummaryVariants: NSArray;

  readonly additionalInformationVariants: NSArray;

  userInfo: interop.Object;

  setUserInfo(userInfo: interop.Object | null): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CPNowPlayingSportsEventStatus extends NSObject implements NSSecureCoding {
  initWithEventStatusTextEventStatusImageEventClock(eventStatusText: NSArray<interop.Object> | Array<interop.Object> | null, eventStatusImage: UIImage | null, eventClock: CPNowPlayingSportsClock | null): this;

  readonly eventStatusText: NSArray;

  readonly eventClock: CPNowPlayingSportsClock;

  readonly eventStatusImage: UIImage;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CPNavigationSession extends NSObject {
  pauseTripForReasonDescription(reason: interop.Enum<typeof CPTripPauseReason>, description: string | null): void;

  pauseTripForReasonDescriptionTurnCardColor(reason: interop.Enum<typeof CPTripPauseReason>, description: string | null, turnCardColor: UIColor | null): void;

  resumeTripWithUpdatedRouteInformation(routeInformation: CPRouteInformation): void;

  finishTrip(): void;

  cancelTrip(): void;

  get upcomingManeuvers(): NSArray;
  set upcomingManeuvers(value: NSArray<interop.Object> | Array<interop.Object>);

  currentLaneGuidance: CPLaneGuidance;

  addManeuvers(maneuvers: NSArray<interop.Object> | Array<interop.Object>): void;

  addLaneGuidances(laneGuidances: NSArray<interop.Object> | Array<interop.Object>): void;

  get currentRoadNameVariants(): NSArray;
  set currentRoadNameVariants(value: NSArray<interop.Object> | Array<interop.Object>);

  maneuverState: interop.Enum<typeof CPManeuverState>;

  readonly trip: CPTrip;

  updateTravelEstimatesForManeuver(estimates: CPTravelEstimates, maneuver: CPManeuver): void;

  setUpcomingManeuvers(upcomingManeuvers: NSArray<interop.Object> | Array<interop.Object>): void;

  setCurrentLaneGuidance(currentLaneGuidance: CPLaneGuidance): void;

  setCurrentRoadNameVariants(currentRoadNameVariants: NSArray<interop.Object> | Array<interop.Object>): void;

  setManeuverState(maneuverState: interop.Enum<typeof CPManeuverState>): void;
}

declare class CPTripPreviewTextConfiguration extends NSObject implements NSSecureCoding {
  initWithStartButtonTitleAdditionalRoutesButtonTitleOverviewButtonTitle(startButtonTitle: string | null, additionalRoutesButtonTitle: string | null, overviewButtonTitle: string | null): this;

  readonly startButtonTitle: string;

  readonly additionalRoutesButtonTitle: string;

  readonly overviewButtonTitle: string;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CPLane extends NSObject implements NSCopying, NSSecureCoding {
  init(): this;

  initWithAngles(angles: NSArray<interop.Object> | Array<interop.Object>): this;

  initWithAnglesHighlightedAngleIsPreferred(angles: NSArray<interop.Object> | Array<interop.Object>, highlightedAngle: NSMeasurement, preferred: boolean): this;

  status: interop.Enum<typeof CPLaneStatus>;

  setStatus(status: interop.Enum<typeof CPLaneStatus>): void;

  primaryAngle: NSMeasurement;

  readonly highlightedAngle: NSMeasurement;

  get secondaryAngles(): NSArray;
  set secondaryAngles(value: NSArray<interop.Object> | Array<interop.Object>);

  readonly angles: NSArray;

  setPrimaryAngle(primaryAngle: NSMeasurement): void;

  setSecondaryAngles(secondaryAngles: NSArray<interop.Object> | Array<interop.Object>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CPActionSheetTemplate extends CPTemplate {
  initWithTitleMessageActions(title: string | null, message: string | null, actions: NSArray<interop.Object> | Array<interop.Object>): this;

  readonly title: string;

  readonly message: string;

  readonly actions: NSArray;
}

declare class CPTravelEstimates extends NSObject implements NSSecureCoding {
  initWithDistanceRemainingTimeRemaining(distance: NSMeasurement, time: number): this;

  initWithDistanceRemainingDistanceRemainingToDisplayTimeRemaining(distanceRemaining: NSMeasurement, distanceRemainingToDisplay: NSMeasurement, time: number): this;

  readonly distanceRemainingToDisplay: NSMeasurement;

  readonly distanceRemaining: NSMeasurement;

  readonly timeRemaining: number;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CPNowPlayingModeSports extends CPNowPlayingMode implements NSSecureCoding {
  initWithLeftTeamRightTeamEventStatusBackgroundArtwork(leftTeam: CPNowPlayingSportsTeam, rightTeam: CPNowPlayingSportsTeam, eventStatus: CPNowPlayingSportsEventStatus | null, backgroundArtwork: UIImage | null): this;

  readonly leftTeam: CPNowPlayingSportsTeam;

  readonly rightTeam: CPNowPlayingSportsTeam;

  readonly eventStatus: CPNowPlayingSportsEventStatus;

  readonly backgroundArtwork: UIImage;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CPNowPlayingRepeatButton extends CPNowPlayingButton {
}

declare class CPAssistantCellConfiguration extends NSObject implements NSSecureCoding {
  initWithPositionVisibilityAssistantAction(position: interop.Enum<typeof CPAssistantCellPosition>, visibility: interop.Enum<typeof CPAssistantCellVisibility>, assistantAction: interop.Enum<typeof CPAssistantCellActionType>): this;

  readonly position: interop.Enum<typeof CPAssistantCellPosition>;

  readonly visibility: interop.Enum<typeof CPAssistantCellVisibility>;

  readonly assistantAction: interop.Enum<typeof CPAssistantCellActionType>;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CPTabBarTemplate extends CPTemplate {
  initWithTemplates(templates: NSArray<interop.Object> | Array<interop.Object>): this;

  delegate: CPTabBarTemplateDelegate;

  static readonly maximumTabCount: number;

  readonly templates: NSArray;

  readonly selectedTemplate: CPTemplate;

  updateTemplates(newTemplates: NSArray<interop.Object> | Array<interop.Object>): void;

  selectTemplate(newTemplate: CPTemplate): void;

  selectTemplateAtIndex(index: number): void;

  setDelegate(delegate: CPTabBarTemplateDelegate | null): void;
}

declare class CPBarButton extends NSObject implements NSSecureCoding {
  initWithImageHandler(image: UIImage, handler: (p1: CPBarButton) => void | null): this;

  initWithTitleHandler(title: string, handler: (p1: CPBarButton) => void | null): this;

  enabled: boolean;

  buttonStyle: interop.Enum<typeof CPBarButtonStyle>;

  image: UIImage;

  title: string;

  initWithTypeHandler(type: interop.Enum<typeof CPBarButtonType>, handler: (p1: CPBarButton) => void | null): this;

  readonly buttonType: interop.Enum<typeof CPBarButtonType>;

  isEnabled(): boolean;

  setEnabled(enabled: boolean): void;

  setButtonStyle(buttonStyle: interop.Enum<typeof CPBarButtonStyle>): void;

  setImage(image: UIImage | null): void;

  setTitle(title: string | null): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CPDashboardButton extends NSObject implements NSSecureCoding {
  initWithTitleVariantsSubtitleVariantsImageHandler(titleVariants: NSArray<interop.Object> | Array<interop.Object>, subtitleVariants: NSArray<interop.Object> | Array<interop.Object>, image: UIImage, handler: (p1: CPDashboardButton) => void | null): this;

  readonly image: UIImage;

  readonly titleVariants: NSArray;

  readonly subtitleVariants: NSArray;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CPContactDirectionsButton extends CPButton {
  initWithHandler(handler: (p1: CPButton) => void | null): this;
}

declare class CPNowPlayingSportsTeam extends NSObject implements NSSecureCoding {
  initWithNameLogoTeamStandingsEventScorePossessionIndicatorFavorite(name: string, logo: CPNowPlayingSportsTeamLogo, teamStandings: string | null, eventScore: string, possessionIndicator: UIImage | null, favorite: boolean): this;

  readonly name: string;

  readonly logo: CPNowPlayingSportsTeamLogo;

  readonly teamStandings: string;

  readonly eventScore: string;

  readonly possessionIndicator: UIImage;

  readonly favorite: boolean;

  isFavorite(): boolean;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CPContact extends NSObject implements NSSecureCoding {
  initWithNameImage(name: string, image: UIImage): this;

  name: string;

  image: UIImage;

  get actions(): NSArray;
  set actions(value: NSArray<interop.Object> | Array<interop.Object>);

  subtitle: string;

  informativeText: string;

  setName(name: string): void;

  setImage(image: UIImage): void;

  setActions(actions: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setSubtitle(subtitle: string | null): void;

  setInformativeText(informativeText: string | null): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CPInformationRatingItem extends CPInformationItem {
  initWithRatingMaximumRatingTitleDetail(rating: NSNumber | null, maximumRating: NSNumber | null, title: string | null, detail: string | null): this;

  readonly rating: NSNumber;

  readonly maximumRating: NSNumber;
}

declare class CPMapButton extends NSObject implements NSSecureCoding {
  initWithHandler(handler: (p1: CPMapButton) => void | null): this;

  enabled: boolean;

  hidden: boolean;

  image: UIImage;

  focusedImage: UIImage;

  isEnabled(): boolean;

  setEnabled(enabled: boolean): void;

  isHidden(): boolean;

  setHidden(hidden: boolean): void;

  setImage(image: UIImage | null): void;

  setFocusedImage(focusedImage: UIImage | null): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CPMessageListItemLeadingConfiguration extends NSObject {
  readonly unread: boolean;

  readonly leadingItem: interop.Enum<typeof CPMessageLeadingItem>;

  readonly leadingImage: UIImage;

  initWithLeadingItemLeadingImageUnread(leadingItem: interop.Enum<typeof CPMessageLeadingItem>, leadingImage: UIImage | null, unread: boolean): this;

  isUnread(): boolean;
}

// @ts-ignore ClassDecl.tsIgnore
declare class CPTemplateApplicationScene extends UIScene {
  // @ts-ignore MemberDecl.tsIgnore
  delegate: CPTemplateApplicationSceneDelegate;

  readonly interfaceController: CPInterfaceController;

  readonly carWindow: CPWindow;

  readonly contentStyle: interop.Enum<typeof UIUserInterfaceStyle>;

  // @ts-ignore MemberDecl.tsIgnore
  setDelegate(delegate: CPTemplateApplicationSceneDelegate | null): void;
}

// @ts-ignore ClassDecl.tsIgnore
declare class CPTemplateApplicationInstrumentClusterScene extends UIScene {
  // @ts-ignore MemberDecl.tsIgnore
  delegate: CPTemplateApplicationInstrumentClusterSceneDelegate;

  readonly instrumentClusterController: CPInstrumentClusterController;

  readonly contentStyle: interop.Enum<typeof UIUserInterfaceStyle>;

  // @ts-ignore MemberDecl.tsIgnore
  setDelegate(delegate: CPTemplateApplicationInstrumentClusterSceneDelegate | null): void;
}

declare class CPContactTemplate extends CPTemplate implements CPBarButtonProviding {
  initWithContact(contact: CPContact): this;

  contact: CPContact;

  setContact(contact: CPContact): void;

  get leadingNavigationBarButtons(): NSArray;
  set leadingNavigationBarButtons(value: NSArray<interop.Object> | Array<interop.Object>);

  get trailingNavigationBarButtons(): NSArray;
  set trailingNavigationBarButtons(value: NSArray<interop.Object> | Array<interop.Object>);

  backButton: CPBarButton;

  setLeadingNavigationBarButtons(leadingNavigationBarButtons: NSArray<interop.Object> | Array<interop.Object>): void;

  setTrailingNavigationBarButtons(trailingNavigationBarButtons: NSArray<interop.Object> | Array<interop.Object>): void;

  setBackButton(backButton: CPBarButton | null): void;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class CPAlertTemplate extends CPTemplate {
  initWithTitleVariantsActions(titleVariants: NSArray<interop.Object> | Array<interop.Object>, actions: NSArray<interop.Object> | Array<interop.Object>): this;

  readonly titleVariants: NSArray;

  static readonly maximumActionCount: number;

  readonly actions: NSArray;
}

// @ts-ignore ClassDecl.tsIgnore
declare class CPTemplateApplicationDashboardScene extends UIScene {
  // @ts-ignore MemberDecl.tsIgnore
  delegate: CPTemplateApplicationDashboardSceneDelegate;

  readonly dashboardController: CPDashboardController;

  readonly dashboardWindow: UIWindow;

  // @ts-ignore MemberDecl.tsIgnore
  setDelegate(delegate: CPTemplateApplicationDashboardSceneDelegate | null): void;
}

declare class CPNowPlayingPlaybackRateButton extends CPNowPlayingButton {
}

declare class CPNowPlayingImageButton extends CPNowPlayingButton {
  initWithImageHandler(image: UIImage, handler: (p1: CPNowPlayingButton) => void | null): this;

  readonly image: UIImage;
}

declare class CPTrip extends NSObject implements NSSecureCoding {
  initWithOriginDestinationRouteChoices(origin: MKMapItem, destination: MKMapItem, routeChoices: NSArray<interop.Object> | Array<interop.Object>): this;

  readonly origin: MKMapItem;

  readonly destination: MKMapItem;

  readonly routeChoices: NSArray;

  userInfo: interop.Object;

  get destinationNameVariants(): NSArray;
  set destinationNameVariants(value: NSArray<interop.Object> | Array<interop.Object>);

  setUserInfo(userInfo: interop.Object | null): void;

  setDestinationNameVariants(destinationNameVariants: NSArray<interop.Object> | Array<interop.Object>): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CPSearchTemplate extends CPTemplate {
  delegate: CPSearchTemplateDelegate;

  setDelegate(delegate: CPSearchTemplateDelegate | null): void;
}

declare class CPNowPlayingShuffleButton extends CPNowPlayingButton {
}

declare class CPDashboardController extends NSObject {
  get shortcutButtons(): NSArray;
  set shortcutButtons(value: NSArray<interop.Object> | Array<interop.Object>);

  setShortcutButtons(shortcutButtons: NSArray<interop.Object> | Array<interop.Object>): void;
}

declare class CPWindow extends UIWindow {
  readonly mapButtonSafeAreaLayoutGuide: UILayoutGuide;

  templateApplicationScene: CPTemplateApplicationScene;

  setTemplateApplicationScene(templateApplicationScene: CPTemplateApplicationScene | null): void;
}

declare class CPRouteInformation extends NSObject {
  initWithManeuversLaneGuidancesCurrentManeuversCurrentLaneGuidanceTripTravelEstimatesManeuverTravelEstimates(maneuvers: NSArray<interop.Object> | Array<interop.Object>, laneGuidances: NSArray<interop.Object> | Array<interop.Object>, currentManeuvers: NSArray<interop.Object> | Array<interop.Object>, currentLaneGuidance: CPLaneGuidance, tripTravelEstimates: CPTravelEstimates, maneuverTravelEstimates: CPTravelEstimates): this;

  readonly maneuvers: NSArray;

  readonly laneGuidances: NSArray;

  readonly currentManeuvers: NSArray;

  readonly currentLaneGuidance: CPLaneGuidance;

  readonly tripTravelEstimates: CPTravelEstimates;

  readonly maneuverTravelEstimates: CPTravelEstimates;
}


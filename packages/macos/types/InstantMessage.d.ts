/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const IMAVRunning: number;

declare const IMAVRequested: number;

declare const IMCapabilityVideoConference: string;

declare const IMCapabilityAudioConference: string;

declare const IMCapabilityFileSharing: string;

declare const IMCapabilityFileTransfer: string;

declare const IMPersonAVBusyKey: string;

declare const IMPersonPictureDataKey: string;

declare const IMPersonEmailKey: string;

declare const IMPersonLastNameKey: string;

declare const IMPersonFirstNameKey: string;

declare const IMPersonIdleSinceKey: string;

declare const IMPersonStatusMessageKey: string;

declare const IMPersonStatusKey: string;

declare const IMPersonScreenNameKey: string;

declare const IMPersonStatusNoStatus: number;

declare const IMPersonStatusAway: number;

declare const IMServiceStatusLoggedIn: number;

declare const IMServiceStatusLoggingIn: number;

declare const IMServiceStatusLoggingOut: number;

declare const IMServiceStatusDisconnected: number;

declare const IMPersonInfoChangedNotification: string;

declare const IMPersonStatusChangedNotification: string;

declare const IMAVPending: number;

declare const IMServiceStatusLoggedOut: number;

declare const IMServiceStatusChangedNotification: string;

declare const IMAVShuttingDown: number;

declare const IMPersonStatusOffline: number;

declare const IMVideoOptimizationDefault: number;

declare const IMVideoOptimizationStills: number;

declare const IMAVInactive: number;

declare const IMCapabilityDirectIM: string;

declare const IMStatusImagesChangedAppearanceNotification: string;

declare const IMPersonStatusIdle: number;

declare const IMPersonServiceNameKey: string;

declare const IMPersonStatusAvailable: number;

declare const IMCapabilityText: string;

declare const IMAVManagerStateChangedNotification: string;

declare const IMVideoOptimizationReplacement: number;

declare const IMAVManagerURLToShareChangedNotification: string;

declare const IMPersonStatusUnknown: number;

declare const IMAVStartingUp: number;

declare const IMMyStatusChangedNotification: string;

declare const IMPersonCapabilitiesKey: string;

declare function IMComparePersonStatus(status: number, compareTo: number): interop.Enum<typeof NSComparisonResult>;

declare class IMAVManager extends NSObject {
  static sharedAVManager(): IMAVManager;

  state(): number;

  URLToShare(): NSURL;

  setVideoDataSource(dataSource: interop.Object): void;

  videoDataSource(): interop.Object;

  setVideoOptimizationOptions(options: number): void;

  videoOptimizationOptions(): number;

  setNumberOfAudioChannels(count: number): void;

  numberOfAudioChannels(): number;

  audioDeviceUID(): string;

  audioDeviceChannels(): NSArray;

  controlBar(): IMAVControlBar;

  start(): void;

  stop(): void;
}

declare class IMService extends NSObject {
  static imageNameForStatus(status: number): string;

  static allServices(): NSArray;

  static serviceWithName(name: string): IMService;

  static notificationCenter(): NSNotificationCenter;

  static myStatus(): number;

  static myIdleTime(): NSDate;

  localizedName(): string;

  localizedShortName(): string;

  name(): string;

  status(): number;

  infoForScreenName(screenName: string): NSDictionary;

  infoForAllScreenNames(): NSArray;

  infoForPreferredScreenNames(): NSArray;

  peopleWithScreenName(screenName: string): NSArray;

  screenNamesForPerson(person: ABPerson): NSArray;

  static imageURLForStatus(status: number): NSURL;
}

declare class IMAVControlBar extends NSObject {
  controls(): NSArray;

  addControl(control: IMAVControl): void;

  removeControl(control: IMAVControl): void;

  removeAllControls(): void;
}

declare class IMAVButton extends IMAVControl {
  state(): number;

  setState(value: number): void;

  static playPauseButton(): IMAVButton;

  static forwardButton(): IMAVButton;

  static backwardButton(): IMAVButton;

  static muteButton(): IMAVButton;
}

declare class IMAVSlider extends IMAVControl {
  minValue(): number;

  setMinValue(aDouble: number): void;

  maxValue(): number;

  setMaxValue(aDouble: number): void;

  static timeSlider(): IMAVSlider;
}

declare class IMAVControl extends NSObject {
  target(): interop.Object;

  setTarget(anObject: interop.Object): void;

  action(): string;

  setAction(aSelector: string): void;

  tag(): number;

  setTag(anInt: number): void;

  isEnabled(): boolean;

  setEnabled(flag: boolean): void;

  integerValue(): number;

  setIntegerValue(anInteger: number): void;

  intValue(): number;

  setIntValue(anInt: number): void;

  floatValue(): number;

  setFloatValue(aFloat: number): void;

  doubleValue(): number;

  setDoubleValue(aDouble: number): void;
}


/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const SRSensorOdometer: string;

declare const SRPhotoplethysmogramSampleUsageBackgroundSystem: string;

declare const SRPhotoplethysmogramSampleUsageDeepBreathing: string;

declare const SRPhotoplethysmogramSampleUsageForegroundHeartRate: string;

declare const SRPhotoplethysmogramOpticalSampleConditionUnreliableNoise: string;

declare const SRDeviceUsageCategoryStickers: string;

declare const SRDeviceUsageCategoryFoodAndDrink: string;

declare const SRDeviceUsageCategoryCatalogs: string;

declare const SRDeviceUsageCategoryMedical: string;

declare const SRDeviceUsageCategoryFinance: string;

declare const SRDeviceUsageCategoryHealthAndFitness: string;

declare const SRDeviceUsageCategoryNavigation: string;

declare const SRDeviceUsageCategoryTravel: string;

declare const SRDeviceUsageCategoryWeather: string;

declare const SRDeviceUsageCategoryGames: string;

declare const SRErrorDomain: string;

declare const SRSensorAcousticSettings: string;

declare const SRSensorPhotoplethysmogram: string;

declare const SRSensorElectrocardiogram: string;

declare const SRSensorMediaEvents: string;

declare const SRSensorKeyboardMetrics: string;

declare const SRSensorPedometerData: string;

declare const SRSensorRotationRate: string;

declare const SRSensorAccelerometer: string;

declare const SRSensorMessagesUsageReport: string;

declare const SRSensorAmbientLightSensor: string;

declare const SRDeviceUsageCategoryProductivity: string;

declare const SRDeviceUsageCategoryBusiness: string;

declare const SRDeviceUsageCategoryShopping: string;

declare const SRDeviceUsageCategoryNewsstand: string;

declare const SRDeviceUsageCategoryMusic: string;

declare const SRDeviceUsageCategoryReference: string;

declare const SRDeviceUsageCategoryDeveloperTools: string;

declare const SRSensorDeviceUsageReport: string;

declare const SRSensorSiriSpeechMetrics: string;

declare const SRSensorFaceMetrics: string;

declare const SRSensorWristTemperature: string;

declare const SRDeviceUsageCategoryLifestyle: string;

declare const SRDeviceUsageCategoryEntertainment: string;

declare const SRDeviceUsageCategorySocialNetworking: string;

declare const SRSensorAmbientPressure: string;

declare const SRDeviceUsageCategoryMiscellaneous: string;

declare const SRDeviceUsageCategoryNews: string;

declare const SRDeviceUsageCategorySports: string;

declare const SRPhotoplethysmogramOpticalSampleConditionSignalSaturation: string;

declare const SRSensorHeartRate: string;

declare const SRSensorTelephonySpeechMetrics: string;

declare const SRDeviceUsageCategoryBooks: string;

declare const SRPhotoplethysmogramSampleUsageForegroundBloodOxygen: string;

declare const SRSensorSleepSessions: string;

declare const SRDeviceUsageCategoryKids: string;

declare const SRSensorPhoneUsageReport: string;

declare const SRSensorOnWristState: string;

declare const SRDeviceUsageCategoryGraphicsAndDesign: string;

declare const SRDeviceUsageCategoryUtilities: string;

declare const SRDeviceUsageCategoryEducation: string;

declare const SRDeviceUsageCategoryPhotoAndVideo: string;

declare const SRSensorVisits: string;

declare const SRAcousticSettingsAccessibilityHeadphoneAccommodationsMediaEnhanceBoosting: {
  Slight: 1,
  Moderate: 2,
  Strong: 3,
};

declare const SRAcousticSettingsAccessibilityHeadphoneAccommodationsMediaEnhanceTuning: {
  BalancedTone: 1,
  VocalRange: 2,
  Brightness: 3,
};

declare const SRElectrocardiogramLead: {
  RightArmMinusLeft: 1,
  LeftArmMinusRight: 2,
};

declare const SRElectrocardiogramDataFlags: {
  None: 0,
  SignalInvalid: 1,
  CrownTouched: 2,
};

declare const SRElectrocardiogramSessionGuidance: {
  Guided: 1,
  Unguided: 2,
};

declare const SRElectrocardiogramSessionState: {
  Begin: 1,
  Active: 2,
  End: 3,
};

declare const SRMediaEventType: {
  On: 1,
  Off: 2,
};

declare const SRWristLocation: {
  Left: 0,
  Right: 1,
};

declare const SRKeyboardMetricsSentimentCategory: {
  Absolutist: 0,
  Down: 1,
  Death: 2,
  Anxiety: 3,
  Anger: 4,
  Health: 5,
  Positive: 6,
  Sad: 7,
  LowEnergy: 8,
  Confused: 9,
};

declare const SRNotificationEvent: {
  Unknown: 0,
  Received: 1,
  DefaultAction: 2,
  SupplementaryAction: 3,
  Clear: 4,
  NotificationCenterClearAll: 5,
  Removed: 6,
  Hide: 7,
  LongLook: 8,
  Silence: 9,
  AppLaunch: 10,
  Expired: 11,
  BannerPulldown: 12,
  TapCoalesce: 13,
  Deduped: 14,
  DeviceActivated: 15,
  DeviceUnlocked: 16,
};

declare const SRTextInputSessionType: {
  Keyboard: 1,
  ThirdPartyKeyboard: 2,
  Pencil: 3,
  Dictation: 4,
};

declare const SRLocationCategory: {
  Unknown: 0,
  Home: 1,
  Work: 2,
  School: 3,
  Gym: 4,
};

declare const SRAmbientLightSensorPlacement: {
  Unknown: 0,
  FrontTop: 1,
  FrontBottom: 2,
  FrontRight: 3,
  FrontLeft: 4,
  FrontTopRight: 5,
  FrontTopLeft: 6,
  FrontBottomRight: 7,
  FrontBottomLeft: 8,
};

declare const SRErrorCode: {
  InvalidEntitlement: 0,
  NoAuthorization: 1,
  DataInaccessible: 2,
  FetchRequestInvalid: 3,
  PromptDeclined: 4,
};

declare const SRAuthorizationStatus: {
  NotDetermined: 0,
  Authorized: 1,
  Denied: 2,
};

declare const SRAcousticSettingsAccessibilityHeadphoneAccommodationsMediaEnhanceApplication: {
  None: 1,
  Phone: 2,
  Media: 3,
  PhoneAndMedia: 4,
};

declare const SRDeletionReason: {
  UserInitiated: 0,
  LowDiskSpace: 1,
  AgeLimit: 2,
  NoInterestedClients: 3,
  SystemInitiated: 4,
};

declare const SRCrownOrientation: {
  Left: 0,
  Right: 1,
};

declare const SRWristTemperatureCondition: {
  None: 0,
  OffWrist: 1,
  OnCharger: 2,
  InMotion: 4,
};

declare const SRSpeechMetricsSessionFlags: {
  Default: 0,
  BypassVoiceProcessing: 1,
};

declare const SRAcousticSettingsAccessibilityBackgroundSoundsName: {
  BalancedNoise: 1,
  BrightNoise: 2,
  DarkNoise: 3,
  Ocean: 4,
  Rain: 5,
  Stream: 6,
  Night: 7,
  Fire: 8,
  Babble: 9,
  Steam: 10,
  Airplane: 11,
  Boat: 12,
  Bus: 13,
  Train: 14,
  RainOnRoof: 15,
  QuietNight: 16,
};

declare const SRFaceMetricsContext: {
  DeviceUnlock: 1,
  MessagingAppUsage: 2,
};

declare const SRAcousticSettingsSampleLifetime: {
  EightDays: 1,
  UntilUserDeletes: 2,
};

declare class SRAmbientLightChromaticity {
  constructor(init?: SRAmbientLightChromaticity);
  x: number;
  y: number;
}

declare function SRAbsoluteTimeGetCurrent(): number;

declare function SRAbsoluteTimeFromContinuousTime(cont: number): number;

declare function SRAbsoluteTimeToCFAbsoluteTime(sr: number): number;

declare function SRAbsoluteTimeFromCFAbsoluteTime(cf: number): number;

declare interface SRSensorReaderDelegate extends NSObjectProtocol {
  sensorReaderFetchingRequestDidFetchResult?(reader: SRSensorReader, fetchRequest: SRFetchRequest, result: SRFetchResult): boolean;

  sensorReaderDidCompleteFetch?(reader: SRSensorReader, fetchRequest: SRFetchRequest): void;

  sensorReaderFetchingRequestFailedWithError?(reader: SRSensorReader, fetchRequest: SRFetchRequest, error: NSError): void;

  sensorReaderDidChangeAuthorizationStatus?(reader: SRSensorReader, authorizationStatus: interop.Enum<typeof SRAuthorizationStatus>): void;

  sensorReaderWillStartRecording?(reader: SRSensorReader): void;

  sensorReaderStartRecordingFailedWithError?(reader: SRSensorReader, error: NSError): void;

  sensorReaderDidStopRecording?(reader: SRSensorReader): void;

  sensorReaderStopRecordingFailedWithError?(reader: SRSensorReader, error: NSError): void;

  sensorReaderDidFetchDevices?(reader: SRSensorReader, devices: NSArray<interop.Object> | Array<interop.Object>): void;

  sensorReaderFetchDevicesDidFailWithError?(reader: SRSensorReader, error: NSError): void;
}

declare class SRSensorReaderDelegate extends NativeObject implements SRSensorReaderDelegate {
}

declare class SRAudioLevel extends NSObject implements NSCopying, NSSecureCoding {
  readonly timeRange: CMTimeRange;

  readonly loudness: number;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SRWristDetection extends NSObject {
  readonly onWrist: boolean;

  readonly wristLocation: interop.Enum<typeof SRWristLocation>;

  readonly crownOrientation: interop.Enum<typeof SRCrownOrientation>;

  readonly onWristDate: NSDate;

  readonly offWristDate: NSDate;
}

declare class SRSleepSession extends NSObject implements NSCopying, NSSecureCoding {
  readonly startDate: NSDate;

  readonly duration: number;

  readonly identifier: string;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SRAcousticSettings extends NSObject implements NSSecureCoding, NSCopying {
  readonly environmentalSoundMeasurementsEnabled: boolean;

  readonly audioExposureSampleLifetime: interop.Enum<typeof SRAcousticSettingsSampleLifetime>;

  readonly headphoneSafetyAudioLevel: NSNumber;

  readonly musicEQSettings: SRAcousticSettingsMusicEQ;

  readonly accessibilitySettings: SRAcousticSettingsAccessibility;

  isEnvironmentalSoundMeasurementsEnabled(): boolean;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class SRAcousticSettingsAccessibility extends NSObject implements NSSecureCoding, NSCopying {
  readonly leftRightBalance: number;

  readonly monoAudioEnabled: boolean;

  readonly backgroundSounds: SRAcousticSettingsAccessibilityBackgroundSounds;

  readonly headphoneAccommodations: SRAcousticSettingsAccessibilityHeadphoneAccommodations;

  isMonoAudioEnabled(): boolean;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class SRAcousticSettingsAccessibilityHeadphoneAccommodations extends NSObject implements NSSecureCoding, NSCopying {
  readonly enabled: boolean;

  readonly mediaEnhanceTuning: interop.Enum<typeof SRAcousticSettingsAccessibilityHeadphoneAccommodationsMediaEnhanceTuning>;

  readonly mediaEnhanceBoosting: interop.Enum<typeof SRAcousticSettingsAccessibilityHeadphoneAccommodationsMediaEnhanceBoosting>;

  readonly mediaEnhanceApplication: interop.Enum<typeof SRAcousticSettingsAccessibilityHeadphoneAccommodationsMediaEnhanceApplication>;

  isEnabled(): boolean;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class SRAcousticSettingsAccessibilityBackgroundSounds extends NSObject implements NSSecureCoding, NSCopying {
  readonly enabled: boolean;

  readonly soundName: interop.Enum<typeof SRAcousticSettingsAccessibilityBackgroundSoundsName>;

  readonly relativeVolume: number;

  readonly playWithMediaEnabled: boolean;

  readonly relativeVolumeWithMedia: number;

  readonly stopOnLockEnabled: boolean;

  isEnabled(): boolean;

  isPlayWithMediaEnabled(): boolean;

  isStopOnLockEnabled(): boolean;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class SRAcousticSettingsMusicEQ extends NSObject implements NSSecureCoding, NSCopying {
  readonly soundCheckEnabled: boolean;

  readonly lateNightModeEnabled: boolean;

  isSoundCheckEnabled(): boolean;

  isLateNightModeEnabled(): boolean;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class SRPhotoplethysmogramSample extends NSObject implements NSCopying, NSSecureCoding {
  readonly startDate: NSDate;

  readonly nanosecondsSinceStart: number;

  readonly usage: NSArray;

  readonly opticalSamples: NSArray;

  readonly accelerometerSamples: NSArray;

  readonly temperature: NSMeasurement;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SRPhotoplethysmogramOpticalSample extends NSObject implements NSCopying, NSSecureCoding {
  readonly emitter: number;

  readonly activePhotodiodeIndexes: NSIndexSet;

  readonly signalIdentifier: number;

  readonly nominalWavelength: NSMeasurement;

  readonly effectiveWavelength: NSMeasurement;

  readonly samplingFrequency: NSMeasurement;

  readonly nanosecondsSinceStart: number;

  readonly normalizedReflectance: NSNumber;

  readonly whiteNoise: NSNumber;

  readonly pinkNoise: NSNumber;

  readonly backgroundNoise: NSNumber;

  readonly backgroundNoiseOffset: NSNumber;

  readonly conditions: NSArray;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SRElectrocardiogramSample extends NSObject implements NSCopying, NSSecureCoding {
  readonly date: NSDate;

  readonly frequency: NSMeasurement;

  readonly session: SRElectrocardiogramSession;

  readonly lead: interop.Enum<typeof SRElectrocardiogramLead>;

  readonly data: NSArray;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SRElectrocardiogramSession extends NSObject implements NSCopying, NSSecureCoding {
  readonly state: interop.Enum<typeof SRElectrocardiogramSessionState>;

  readonly sessionGuidance: interop.Enum<typeof SRElectrocardiogramSessionGuidance>;

  readonly identifier: string;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SRFaceMetrics extends NSObject implements NSCopying, NSSecureCoding {
  readonly version: string;

  readonly sessionIdentifier: string;

  readonly context: interop.Enum<typeof SRFaceMetricsContext>;

  readonly faceAnchor: ARFaceAnchor;

  readonly wholeFaceExpressions: NSArray;

  readonly partialFaceExpressions: NSArray;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SRMediaEvent extends NSObject implements NSCopying, NSSecureCoding {
  readonly mediaIdentifier: string;

  readonly eventType: interop.Enum<typeof SRMediaEventType>;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SRWristTemperatureSession extends NSObject implements NSCopying, NSSecureCoding {
  readonly startDate: NSDate;

  readonly duration: number;

  readonly version: string;

  readonly temperatures: NSEnumerator;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SRWristTemperature extends NSObject implements NSCopying, NSSecureCoding {
  readonly timestamp: NSDate;

  readonly value: NSMeasurement;

  readonly condition: interop.Enum<typeof SRWristTemperatureCondition>;

  readonly errorEstimate: NSMeasurement;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SRMessagesUsageReport extends NSObject {
  readonly duration: number;

  readonly totalOutgoingMessages: number;

  readonly totalIncomingMessages: number;

  readonly totalUniqueContacts: number;
}

declare class SRWebUsage extends NSObject {
  readonly totalUsageTime: number;
}

declare class SRDeviceUsageReport extends NSObject {
  readonly duration: number;

  readonly applicationUsageByCategory: NSDictionary;

  readonly notificationUsageByCategory: NSDictionary;

  readonly webUsageByCategory: NSDictionary;

  readonly totalScreenWakes: number;

  readonly totalUnlocks: number;

  readonly totalUnlockDuration: number;

  readonly version: string;
}

declare class SRSensorReader extends NSObject {
  initWithSensor(sensor: string): this;

  startRecording(): void;

  stopRecording(): void;

  fetchDevices(): void;

  fetch(request: SRFetchRequest): void;

  readonly authorizationStatus: interop.Enum<typeof SRAuthorizationStatus>;

  readonly sensor: string;

  delegate: SRSensorReaderDelegate | null;

  static requestAuthorizationForSensorsCompletion(sensors: NSSet, completion: (p1: NSError) => void | null): void;

  setDelegate(delegate: SRSensorReaderDelegate | null): void;
}

declare class SRFetchRequest extends NSObject {
  from: number;

  to: number;

  device: SRDevice;

  setFrom(from: number): void;

  setTo(to: number): void;

  setDevice(device: SRDevice): void;
}

declare class SRNotificationUsage extends NSObject {
  readonly bundleIdentifier: string;

  readonly event: interop.Enum<typeof SRNotificationEvent>;
}

declare class SRKeyboardProbabilityMetric<UnitType = interop.Object> extends NSObject {
  readonly distributionSampleValues: NSArray;
}

declare class SRSpeechExpression extends NSObject implements NSCopying, NSSecureCoding {
  readonly version: string;

  readonly timeRange: CMTimeRange;

  readonly confidence: number;

  readonly mood: number;

  readonly valence: number;

  readonly activation: number;

  readonly dominance: number;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SRSpeechMetrics extends NSObject implements NSCopying, NSSecureCoding {
  readonly sessionIdentifier: string;

  readonly sessionFlags: interop.Enum<typeof SRSpeechMetricsSessionFlags>;

  readonly timestamp: NSDate;

  readonly timeSinceAudioStart: number;

  readonly audioLevel: SRAudioLevel;

  readonly speechRecognition: SFSpeechRecognitionResult;

  readonly soundClassification: SNClassificationResult;

  readonly speechExpression: SRSpeechExpression;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SRElectrocardiogramData extends NSObject implements NSCopying, NSSecureCoding {
  readonly flags: interop.Enum<typeof SRElectrocardiogramDataFlags>;

  readonly value: NSMeasurement;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SRFetchResult<SampleType = interop.Object> extends NSObject implements NSCopying {
  readonly sample: SampleType;

  readonly timestamp: number;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class SRFaceMetricsExpression extends NSObject implements NSCopying, NSSecureCoding {
  readonly identifier: string;

  readonly value: number;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SRDevice extends NSObject implements NSSecureCoding, NSCopying {
  static readonly currentDevice: SRDevice;

  readonly name: string;

  readonly model: string;

  readonly systemName: string;

  readonly systemVersion: string;

  readonly productType: string;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class SRPhotoplethysmogramAccelerometerSample extends NSObject implements NSCopying, NSSecureCoding {
  readonly nanosecondsSinceStart: number;

  readonly samplingFrequency: NSMeasurement;

  readonly x: NSMeasurement;

  readonly y: NSMeasurement;

  readonly z: NSMeasurement;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SRDeletionRecord extends NSObject implements NSSecureCoding {
  readonly startTime: number;

  readonly endTime: number;

  readonly reason: interop.Enum<typeof SRDeletionReason>;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SRKeyboardMetrics extends NSObject {
  readonly duration: number;

  readonly keyboardIdentifier: string;

  readonly version: string;

  readonly width: NSMeasurement;

  readonly height: NSMeasurement;

  readonly inputModes: NSArray;

  readonly sessionIdentifiers: NSArray;

  readonly totalWords: number;

  readonly totalAlteredWords: number;

  readonly totalTaps: number;

  readonly totalDrags: number;

  readonly totalDeletes: number;

  readonly totalEmojis: number;

  readonly totalPaths: number;

  readonly totalPathTime: number;

  readonly totalPathLength: NSMeasurement;

  readonly totalAutoCorrections: number;

  readonly totalSpaceCorrections: number;

  readonly totalRetroCorrections: number;

  readonly totalTranspositionCorrections: number;

  readonly totalInsertKeyCorrections: number;

  readonly totalSkipTouchCorrections: number;

  readonly totalNearKeyCorrections: number;

  readonly totalSubstitutionCorrections: number;

  readonly totalHitTestCorrections: number;

  readonly totalTypingDuration: number;

  readonly upErrorDistance: SRKeyboardProbabilityMetric;

  readonly downErrorDistance: SRKeyboardProbabilityMetric;

  readonly spaceUpErrorDistance: SRKeyboardProbabilityMetric;

  readonly spaceDownErrorDistance: SRKeyboardProbabilityMetric;

  readonly deleteUpErrorDistance: SRKeyboardProbabilityMetric;

  readonly deleteDownErrorDistance: SRKeyboardProbabilityMetric;

  readonly shortWordCharKeyUpErrorDistance: SRKeyboardProbabilityMetric;

  readonly shortWordCharKeyDownErrorDistance: SRKeyboardProbabilityMetric;

  readonly touchDownUp: SRKeyboardProbabilityMetric;

  readonly spaceTouchDownUp: SRKeyboardProbabilityMetric;

  readonly deleteTouchDownUp: SRKeyboardProbabilityMetric;

  readonly shortWordCharKeyTouchDownUp: SRKeyboardProbabilityMetric;

  readonly touchDownDown: SRKeyboardProbabilityMetric;

  readonly touchUpDown: SRKeyboardProbabilityMetric;

  readonly charKeyToPrediction: SRKeyboardProbabilityMetric;

  readonly shortWordCharKeyToCharKey: SRKeyboardProbabilityMetric;

  readonly charKeyToAnyTapKey: SRKeyboardProbabilityMetric;

  readonly anyTapToCharKey: SRKeyboardProbabilityMetric;

  readonly spaceToCharKey: SRKeyboardProbabilityMetric;

  readonly charKeyToSpaceKey: SRKeyboardProbabilityMetric;

  readonly spaceToDeleteKey: SRKeyboardProbabilityMetric;

  readonly deleteToSpaceKey: SRKeyboardProbabilityMetric;

  readonly spaceToSpaceKey: SRKeyboardProbabilityMetric;

  readonly spaceToShiftKey: SRKeyboardProbabilityMetric;

  readonly spaceToPlaneChangeKey: SRKeyboardProbabilityMetric;

  readonly spaceToPredictionKey: SRKeyboardProbabilityMetric;

  readonly deleteToCharKey: SRKeyboardProbabilityMetric;

  readonly charKeyToDelete: SRKeyboardProbabilityMetric;

  readonly deleteToDelete: SRKeyboardProbabilityMetric;

  readonly deleteToShiftKey: SRKeyboardProbabilityMetric;

  readonly deleteToPlaneChangeKey: SRKeyboardProbabilityMetric;

  readonly anyTapToPlaneChangeKey: SRKeyboardProbabilityMetric;

  readonly planeChangeToAnyTap: SRKeyboardProbabilityMetric;

  readonly charKeyToPlaneChangeKey: SRKeyboardProbabilityMetric;

  readonly planeChangeKeyToCharKey: SRKeyboardProbabilityMetric;

  readonly pathErrorDistanceRatio: NSArray;

  readonly deleteToPath: SRKeyboardProbabilityMetric;

  readonly pathToDelete: SRKeyboardProbabilityMetric;

  readonly spaceToPath: SRKeyboardProbabilityMetric;

  readonly pathToSpace: SRKeyboardProbabilityMetric;

  readonly pathToPath: SRKeyboardProbabilityMetric;

  readonly longWordUpErrorDistance: NSArray;

  readonly longWordDownErrorDistance: NSArray;

  readonly longWordTouchDownUp: NSArray;

  readonly longWordTouchDownDown: NSArray;

  readonly longWordTouchUpDown: NSArray;

  readonly deleteToDeletes: NSArray;

  readonly totalPauses: number;

  readonly totalPathPauses: number;

  readonly typingSpeed: number;

  readonly pathTypingSpeed: number;

  readonly totalTypingEpisodes: number;

  wordCountForSentimentCategory(category: interop.Enum<typeof SRKeyboardMetricsSentimentCategory>): number;

  emojiCountForSentimentCategory(category: interop.Enum<typeof SRKeyboardMetricsSentimentCategory>): number;
}

declare class SRApplicationUsage extends NSObject {
  readonly bundleIdentifier: string;

  readonly usageTime: number;

  readonly reportApplicationIdentifier: string;

  readonly textInputSessions: NSArray;

  readonly supplementalCategories: NSArray;

  readonly relativeStartTime: number;
}

declare class SRVisit extends NSObject {
  readonly distanceFromHome: number;

  readonly arrivalDateInterval: NSDateInterval;

  readonly departureDateInterval: NSDateInterval;

  readonly locationCategory: interop.Enum<typeof SRLocationCategory>;

  readonly identifier: NSUUID;
}

declare class SRAmbientLightSample extends NSObject {
  readonly placement: interop.Enum<typeof SRAmbientLightSensorPlacement>;

  readonly chromaticity: SRAmbientLightChromaticity;

  readonly lux: NSMeasurement;
}

declare class SRSupplementalCategory extends NSObject implements NSCopying, NSSecureCoding {
  readonly identifier: string;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SRPhoneUsageReport extends NSObject {
  readonly duration: number;

  readonly totalOutgoingCalls: number;

  readonly totalIncomingCalls: number;

  readonly totalUniqueContacts: number;

  readonly totalPhoneCallDuration: number;
}

declare class SRTextInputSession extends NSObject {
  readonly duration: number;

  readonly sessionType: interop.Enum<typeof SRTextInputSessionType>;

  readonly sessionIdentifier: string;
}


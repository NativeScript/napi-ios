/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const MAMusicHapticsManagerActiveStatusDidChangeNotification: string;

declare const MAMediaCharacteristicTranscribesSpokenDialogForAccessibility: interop.Pointer;

declare const MAMediaCharacteristicDescribesMusicAndSoundForAccessibility: interop.Pointer;

declare const kMACaptionAppearanceSettingsChangedNotification: interop.Pointer;

declare const MAMediaCharacteristicDescribesVideoForAccessibility: interop.Pointer;

declare const kMADimFlashingLightsChangedNotification: interop.Pointer;

declare const kMAAudibleMediaSettingsChangedNotification: interop.Pointer;

declare const MACaptionAppearanceFontStyle: {
  Default: 0,
  MonospacedWithSerif: 1,
  ProportionalWithSerif: 2,
  MonospacedWithoutSerif: 3,
  ProportionalWithoutSerif: 4,
  Casual: 5,
  Cursive: 6,
  SmallCapital: 7,
};

declare const MACaptionAppearanceBehavior: {
  Value: 0,
  ContentIfAvailable: 1,
};

declare const MACaptionAppearanceTextEdgeStyle: {
  Undefined: 0,
  None: 1,
  Raised: 2,
  Depressed: 3,
  Uniform: 4,
  DropShadow: 5,
};

declare const MACaptionAppearanceDomain: {
  Default: 0,
  User: 1,
};

declare const MACaptionAppearanceDisplayType: {
  ForcedOnly: 0,
  Automatic: 1,
  AlwaysOn: 2,
};

declare function MACaptionAppearanceDidDisplayCaptions(strings: interop.Object): void;

declare function MACaptionAppearanceAddSelectedLanguage(domain: interop.Enum<typeof MACaptionAppearanceDomain>, language: interop.Object): boolean;

declare function MACaptionAppearanceCopySelectedLanguages(domain: interop.Enum<typeof MACaptionAppearanceDomain>): interop.Object;

declare function MACaptionAppearanceGetDisplayType(domain: interop.Enum<typeof MACaptionAppearanceDomain>): interop.Enum<typeof MACaptionAppearanceDisplayType>;

declare function MACaptionAppearanceSetDisplayType(domain: interop.Enum<typeof MACaptionAppearanceDomain>, displayType: interop.Enum<typeof MACaptionAppearanceDisplayType>): void;

declare function MACaptionAppearanceCopyPreferredCaptioningMediaCharacteristics(domain: interop.Enum<typeof MACaptionAppearanceDomain>): interop.Object;

declare function MACaptionAppearanceIsCustomized(domain: interop.Enum<typeof MACaptionAppearanceDomain>): boolean;

declare function MACaptionAppearanceCopyForegroundColor(domain: interop.Enum<typeof MACaptionAppearanceDomain>, behavior: interop.PointerConvertible): interop.Object;

declare function MACaptionAppearanceCopyBackgroundColor(domain: interop.Enum<typeof MACaptionAppearanceDomain>, behavior: interop.PointerConvertible): interop.Object;

declare function MACaptionAppearanceCopyWindowColor(domain: interop.Enum<typeof MACaptionAppearanceDomain>, behavior: interop.PointerConvertible): interop.Object;

declare function MACaptionAppearanceGetForegroundOpacity(domain: interop.Enum<typeof MACaptionAppearanceDomain>, behavior: interop.PointerConvertible): number;

declare function MACaptionAppearanceGetBackgroundOpacity(domain: interop.Enum<typeof MACaptionAppearanceDomain>, behavior: interop.PointerConvertible): number;

declare function MACaptionAppearanceGetWindowOpacity(domain: interop.Enum<typeof MACaptionAppearanceDomain>, behavior: interop.PointerConvertible): number;

declare function MACaptionAppearanceGetWindowRoundedCornerRadius(domain: interop.Enum<typeof MACaptionAppearanceDomain>, behavior: interop.PointerConvertible): number;

declare function MACaptionAppearanceCopyFontDescriptorForStyle(domain: interop.Enum<typeof MACaptionAppearanceDomain>, behavior: interop.PointerConvertible, fontStyle: interop.Enum<typeof MACaptionAppearanceFontStyle>): interop.Object;

declare function MACaptionAppearanceGetRelativeCharacterSize(domain: interop.Enum<typeof MACaptionAppearanceDomain>, behavior: interop.PointerConvertible): number;

declare function MACaptionAppearanceGetTextEdgeStyle(domain: interop.Enum<typeof MACaptionAppearanceDomain>, behavior: interop.PointerConvertible): interop.Enum<typeof MACaptionAppearanceTextEdgeStyle>;

declare function MACaptionAppearanceCopyProfileIDs(): interop.Object;

declare function MACaptionAppearanceSetActiveProfileID(profileID: interop.Object): void;

declare function MACaptionAppearanceCopyActiveProfileID(): interop.Object;

declare function MACaptionAppearanceCopyProfileName(profileID: interop.Object): interop.Object;

declare function MACaptionAppearanceExecuteBlockForProfileID(profileID: interop.Object, aBlock: () => void): void;

declare function MAAudibleMediaCopyPreferredCharacteristics(): interop.Object;

declare function MAImageCaptioningCopyCaption(url: interop.Object, error: interop.PointerConvertible): interop.Object;

declare function MAImageCaptioningSetCaption(url: interop.Object, string: interop.Object, error: interop.PointerConvertible): boolean;

declare function MAImageCaptioningCopyMetadataTagPath(): interop.Object;

declare function MADimFlashingLightsEnabled(): boolean;

declare class MAFlashingLightsProcessor extends NSObject {
  canProcessSurface(surface: interop.Object): boolean;

  processSurfaceOutSurfaceTimestampOptions(inSurface: interop.Object, outSurface: interop.Object, timestamp: number, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): MAFlashingLightsProcessorResult;
}

declare class MAMusicHapticsManager extends NSObject {
  static readonly sharedManager: MAMusicHapticsManager;

  readonly isActive: boolean;

  checkHapticTrackAvailabilityForMediaMatchingCodeCompletionHandler(internationalStandardRecordingCode: string, completionHandler: (p1: boolean) => void | null): void;

  addStatusObserver(statusHandler: (p1: string, p2: boolean) => void): NSCopying;

  removeStatusObserver(registrationToken: NSCopying): void;
}

declare class MAFlashingLightsProcessorResult extends NSObject {
  readonly surfaceProcessed: boolean;

  readonly mitigationLevel: number;

  readonly intensityLevel: number;
}


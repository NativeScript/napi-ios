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

declare function MACaptionAppearanceDidDisplayCaptions(strings: interop.PointerConvertible): void;

declare function MACaptionAppearanceAddSelectedLanguage(domain: interop.Enum<typeof MACaptionAppearanceDomain>, language: interop.PointerConvertible): boolean;

declare function MACaptionAppearanceCopySelectedLanguages(domain: interop.Enum<typeof MACaptionAppearanceDomain>): interop.Pointer;

declare function MACaptionAppearanceGetDisplayType(domain: interop.Enum<typeof MACaptionAppearanceDomain>): interop.Enum<typeof MACaptionAppearanceDisplayType>;

declare function MACaptionAppearanceSetDisplayType(domain: interop.Enum<typeof MACaptionAppearanceDomain>, displayType: interop.Enum<typeof MACaptionAppearanceDisplayType>): void;

declare function MACaptionAppearanceCopyPreferredCaptioningMediaCharacteristics(domain: interop.Enum<typeof MACaptionAppearanceDomain>): interop.Pointer;

declare function MACaptionAppearanceIsCustomized(domain: interop.Enum<typeof MACaptionAppearanceDomain>): boolean;

declare function MACaptionAppearanceCopyForegroundColor(domain: interop.Enum<typeof MACaptionAppearanceDomain>, behavior: interop.PointerConvertible): interop.Pointer;

declare function MACaptionAppearanceCopyBackgroundColor(domain: interop.Enum<typeof MACaptionAppearanceDomain>, behavior: interop.PointerConvertible): interop.Pointer;

declare function MACaptionAppearanceCopyWindowColor(domain: interop.Enum<typeof MACaptionAppearanceDomain>, behavior: interop.PointerConvertible): interop.Pointer;

declare function MACaptionAppearanceGetForegroundOpacity(domain: interop.Enum<typeof MACaptionAppearanceDomain>, behavior: interop.PointerConvertible): number;

declare function MACaptionAppearanceGetBackgroundOpacity(domain: interop.Enum<typeof MACaptionAppearanceDomain>, behavior: interop.PointerConvertible): number;

declare function MACaptionAppearanceGetWindowOpacity(domain: interop.Enum<typeof MACaptionAppearanceDomain>, behavior: interop.PointerConvertible): number;

declare function MACaptionAppearanceGetWindowRoundedCornerRadius(domain: interop.Enum<typeof MACaptionAppearanceDomain>, behavior: interop.PointerConvertible): number;

declare function MACaptionAppearanceCopyFontDescriptorForStyle(domain: interop.Enum<typeof MACaptionAppearanceDomain>, behavior: interop.PointerConvertible, fontStyle: interop.Enum<typeof MACaptionAppearanceFontStyle>): interop.Pointer;

declare function MACaptionAppearanceGetRelativeCharacterSize(domain: interop.Enum<typeof MACaptionAppearanceDomain>, behavior: interop.PointerConvertible): number;

declare function MACaptionAppearanceGetTextEdgeStyle(domain: interop.Enum<typeof MACaptionAppearanceDomain>, behavior: interop.PointerConvertible): interop.Enum<typeof MACaptionAppearanceTextEdgeStyle>;

declare function MAAudibleMediaCopyPreferredCharacteristics(): interop.Pointer;

declare function MAImageCaptioningCopyCaption(url: interop.PointerConvertible, error: interop.PointerConvertible): interop.Pointer;

declare function MAImageCaptioningSetCaption(url: interop.PointerConvertible, string: interop.PointerConvertible, error: interop.PointerConvertible): boolean;

declare function MAImageCaptioningCopyMetadataTagPath(): interop.Pointer;

declare function MADimFlashingLightsEnabled(): boolean;

declare class MAFlashingLightsProcessor extends NSObject {
  canProcessSurface(surface: interop.PointerConvertible): boolean;

  processSurfaceOutSurfaceTimestampOptions(inSurface: interop.PointerConvertible, outSurface: interop.PointerConvertible, timestamp: number, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): MAFlashingLightsProcessorResult;
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


/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const CXCallDirectoryPhoneNumberMax: number;

declare class CXProviderConfiguration extends NSObject implements NSCopying {
  readonly localizedName: string;

  ringtoneSound: string;

  iconTemplateImageData: NSData;

  maximumCallGroups: number;

  maximumCallsPerCallGroup: number;

  includesCallsInRecents: boolean;

  supportsVideo: boolean;

  supportsAudioTranslation: boolean;

  supportedHandleTypes: NSSet;

  init(): this;

  initWithLocalizedName(localizedName: string): this;

  setRingtoneSound(ringtoneSound: string | null): void;

  setIconTemplateImageData(iconTemplateImageData: NSData | null): void;

  setMaximumCallGroups(maximumCallGroups: number): void;

  setMaximumCallsPerCallGroup(maximumCallsPerCallGroup: number): void;

  setIncludesCallsInRecents(includesCallsInRecents: boolean): void;

  setSupportsVideo(supportsVideo: boolean): void;

  setSupportsAudioTranslation(supportsAudioTranslation: boolean): void;

  setSupportedHandleTypes(supportedHandleTypes: NSSet): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}


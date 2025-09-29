/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const AEAssessmentErrorDomain: string;

declare const AEAssessmentErrorCode: {
  Unknown: 1,
  UnsupportedPlatform: 2,
  MultipleParticipantsNotSupported: 3,
  ConfigurationUpdatesNotSupported: 4,
};

declare const AEAutocorrectMode: {
  None: 0,
  Spelling: 1,
  Punctuation: 2,
};

declare interface AEAssessmentSessionDelegate extends NSObjectProtocol {
  assessmentSessionDidBegin?(session: AEAssessmentSession): void;

  assessmentSessionFailedToBeginWithError?(session: AEAssessmentSession, error: NSError): void;

  assessmentSessionWasInterruptedWithError?(session: AEAssessmentSession, error: NSError): void;

  assessmentSessionDidEnd?(session: AEAssessmentSession): void;

  assessmentSessionDidUpdate?(session: AEAssessmentSession): void;

  assessmentSessionFailedToUpdateToConfigurationError?(session: AEAssessmentSession, configuration: AEAssessmentConfiguration, error: NSError): void;
}

declare class AEAssessmentSessionDelegate extends NativeObject implements AEAssessmentSessionDelegate {
}

declare class AEAssessmentConfiguration extends NSObject implements NSCopying {
  autocorrectMode: interop.Enum<typeof AEAutocorrectMode>;

  allowsSpellCheck: boolean;

  allowsPredictiveKeyboard: boolean;

  allowsKeyboardShortcuts: boolean;

  allowsActivityContinuation: boolean;

  allowsDictation: boolean;

  allowsAccessibilitySpeech: boolean;

  allowsPasswordAutoFill: boolean;

  allowsContinuousPathKeyboard: boolean;

  readonly mainParticipantConfiguration: AEAssessmentParticipantConfiguration;

  readonly configurationsByApplication: NSDictionary;

  setConfigurationForApplication(configuration: AEAssessmentParticipantConfiguration, application: AEAssessmentApplication): void;

  removeApplication(application: AEAssessmentApplication): void;

  setAutocorrectMode(autocorrectMode: interop.Enum<typeof AEAutocorrectMode>): void;

  setAllowsSpellCheck(allowsSpellCheck: boolean): void;

  setAllowsPredictiveKeyboard(allowsPredictiveKeyboard: boolean): void;

  setAllowsKeyboardShortcuts(allowsKeyboardShortcuts: boolean): void;

  setAllowsActivityContinuation(allowsActivityContinuation: boolean): void;

  setAllowsDictation(allowsDictation: boolean): void;

  setAllowsAccessibilitySpeech(allowsAccessibilitySpeech: boolean): void;

  setAllowsPasswordAutoFill(allowsPasswordAutoFill: boolean): void;

  setAllowsContinuousPathKeyboard(allowsContinuousPathKeyboard: boolean): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class AEAssessmentApplication extends NSObject implements NSCopying {
  readonly bundleIdentifier: string;

  initWithBundleIdentifier(bundleIdentifier: string): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class AEAssessmentSession extends NSObject {
  static readonly supportsMultipleParticipants: boolean;

  static readonly supportsConfigurationUpdates: boolean;

  delegate: AEAssessmentSessionDelegate;

  readonly configuration: AEAssessmentConfiguration;

  readonly active: boolean;

  initWithConfiguration(configuration: AEAssessmentConfiguration): this;

  begin(): void;

  end(): void;

  updateToConfiguration(configuration: AEAssessmentConfiguration): void;

  setDelegate(delegate: AEAssessmentSessionDelegate | null): void;

  isActive(): boolean;
}

declare class AEAssessmentParticipantConfiguration extends NSObject implements NSCopying {
  allowsNetworkAccess: boolean;

  get configurationInfo(): NSDictionary;
  set configurationInfo(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  init(): this;

  static new<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  setAllowsNetworkAccess(allowsNetworkAccess: boolean): void;

  setConfigurationInfo(configurationInfo: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}


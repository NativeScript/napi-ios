/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const SAErrorDomain: string;

declare const SAErrorCode: {
  NotAuthorized: 1,
  NotAllowed: 2,
  InvalidArgument: 3,
  OperationFailed: 4,
};

declare const SACrashDetectionEventResponse: {
  Attempted: 0,
  Disabled: 1,
};

declare const SAAuthorizationStatus: {
  NotDetermined: 0,
  Denied: 1,
  Authorized: 2,
};

declare const SAEmergencyResponseManagerVoiceCallStatus: {
  Dialing: 0,
  Active: 1,
  Disconnected: 2,
  Failed: 3,
};

declare interface SAEmergencyResponseDelegate extends NSObjectProtocol {
  emergencyResponseManagerDidUpdateVoiceCallStatus?(emergencyResponseManager: SAEmergencyResponseManager, voiceCallStatus: interop.Enum<typeof SAEmergencyResponseManagerVoiceCallStatus>): void;
}

declare class SAEmergencyResponseDelegate extends NativeObject implements SAEmergencyResponseDelegate {
}

declare interface SACrashDetectionDelegate extends NSObjectProtocol {
  crashDetectionManagerDidDetectEvent?(crashDetectionManager: SACrashDetectionManager, event: SACrashDetectionEvent): void;
}

declare class SACrashDetectionDelegate extends NativeObject implements SACrashDetectionDelegate {
}

declare class SAEmergencyResponseManager extends NSObject {
  delegate: SAEmergencyResponseDelegate | null;

  dialVoiceCallToPhoneNumberCompletionHandler(phoneNumber: string, handler: (p1: boolean, p2: NSError) => void | null): void;

  setDelegate(delegate: SAEmergencyResponseDelegate | null): void;
}

declare class SACrashDetectionManager extends NSObject {
  static readonly available: boolean;

  readonly authorizationStatus: interop.Enum<typeof SAAuthorizationStatus>;

  delegate: SACrashDetectionDelegate | null;

  requestAuthorizationWithCompletionHandler(handler: (p1: interop.Enum<typeof SAAuthorizationStatus>, p2: NSError) => void | null): void;

  static isAvailable(): boolean;

  setDelegate(delegate: SACrashDetectionDelegate | null): void;
}

declare class SACrashDetectionEvent extends NSObject implements NSSecureCoding, NSCopying {
  readonly date: NSDate;

  readonly response: interop.Enum<typeof SACrashDetectionEventResponse>;

  readonly location: CLLocation;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}


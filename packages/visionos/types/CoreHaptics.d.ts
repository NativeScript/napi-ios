/// <reference types="@nativescript/objc-node-api" />

declare const CoreHapticsErrorDomain: string;

declare const CHHapticEngineFinishedAction: {
  StopEngine: 1,
  LeaveEngineRunning: 2,
};

declare const CHHapticEngineStoppedReason: {
  AudioSessionInterrupt: 1,
  ApplicationSuspended: 2,
  IdleTimeout: 3,
  NotifyWhenFinished: 4,
  EngineDestroyed: 5,
  GameControllerDisconnect: 6,
  SystemError: -1,
};

declare class CHHapticParameterCurve extends NSObject {
  readonly parameterID: string;

  relativeTime: number;

  readonly controlPoints: NSArray;

  initWithParameterIDControlPointsRelativeTime(parameterID: string, controlPoints: NSArray<interop.Object> | Array<interop.Object>, relativeTime: number): this;
}


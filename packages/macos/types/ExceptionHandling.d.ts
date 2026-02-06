/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const NSHandleOtherExceptionMask: number;

declare const NSHandleUncaughtSystemExceptionMask: number;

declare const NSLogUncaughtSystemExceptionMask: number;

declare const NSUncaughtRuntimeErrorException: string;

declare const NSUncaughtSystemExceptionException: string;

declare const NSLogOtherExceptionMask: number;

declare const NSHangOnUncaughtExceptionMask: number;

declare const NSHandleUncaughtRuntimeErrorMask: number;

declare const NSHangOnTopLevelExceptionMask: number;

declare const NSStackTraceKey: string;

declare const NSHangOnOtherExceptionMask: number;

declare const NSLogTopLevelExceptionMask: number;

declare const NSHangOnUncaughtRuntimeErrorMask: number;

declare const NSLogUncaughtRuntimeErrorMask: number;

declare const NSHangOnUncaughtSystemExceptionMask: number;

declare const NSHandleTopLevelExceptionMask: number;

declare const NSHandleUncaughtExceptionMask: number;

declare const NSLogUncaughtExceptionMask: number;

declare function NSExceptionHandlerResume(): void;

declare class NSExceptionHandler extends NSObject {
  static defaultExceptionHandler(): NSExceptionHandler;

  setExceptionHandlingMask(aMask: number): void;

  exceptionHandlingMask(): number;

  setExceptionHangingMask(aMask: number): void;

  exceptionHangingMask(): number;

  setDelegate(anObject: interop.Object): void;

  delegate(): interop.Object;
}


/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const BEEligibilityContext: {
  BEEligibilityContextWebBrowser: 0,
};

declare class BEAvailability extends NSObject {
  static isEligibleForContextCompletionHandler(context: interop.Enum<typeof BEEligibilityContext>, completionHandler: (p1: boolean, p2: NSError) => void | null): void;
}


/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./UIKit.d.ts" />

declare class HKActivityRingView extends UIView {
  activitySummary: HKActivitySummary;

  setActivitySummaryAnimated(activitySummary: HKActivitySummary | null, animated: boolean): void;

  setActivitySummary(activitySummary: HKActivitySummary | null): void;
}


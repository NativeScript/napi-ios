/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./UIKit.d.ts" />

declare class STScreenTimeConfigurationObserver extends NSObject {
  initWithUpdateQueue(updateQueue: NSObject): this;

  startObserving(): void;

  stopObserving(): void;

  readonly configuration: STScreenTimeConfiguration;
}

declare class STScreenTimeConfiguration extends NSObject {
  readonly enforcesChildRestrictions: boolean;
}

declare class STWebHistory extends NSObject {
  initWithBundleIdentifierProfileIdentifierError(bundleIdentifier: string, profileIdentifier: string | null, error: interop.PointerConvertible): this;

  initWithProfileIdentifier(profileIdentifier: string | null): this;

  initWithBundleIdentifierError(bundleIdentifier: string, error: interop.PointerConvertible): this;

  fetchHistoryDuringIntervalCompletionHandler(interval: NSDateInterval, completionHandler: (p1: NSSet, p2: NSError) => void | null): void;

  fetchAllHistoryWithCompletionHandler(completionHandler: (p1: NSSet, p2: NSError) => void | null): void;

  deleteHistoryForURL(url: NSURL): void;

  deleteHistoryDuringInterval(interval: NSDateInterval): void;

  deleteAllHistory(): void;
}

declare class STWebpageController extends UIViewController {
  suppressUsageRecording: boolean;

  URL: NSURL;

  URLIsPlayingVideo: boolean;

  URLIsPictureInPicture: boolean;

  readonly URLIsBlocked: boolean;

  profileIdentifier: string;

  setBundleIdentifierError(bundleIdentifier: string, error: interop.PointerConvertible): boolean;

  setSuppressUsageRecording(suppressUsageRecording: boolean): void;

  setURL(URL: NSURL | null): void;

  setURLIsPlayingVideo(URLIsPlayingVideo: boolean): void;

  setURLIsPictureInPicture(URLIsPictureInPicture: boolean): void;

  setProfileIdentifier(profileIdentifier: string | null): void;
}


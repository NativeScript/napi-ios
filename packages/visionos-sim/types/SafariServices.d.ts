/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./UIKit.d.ts" />

declare const SFExtensionProfileKey: string;

declare const SFExtensionMessageKey: string;

declare const SFErrorDomain: string;

declare const SSReadingListErrorDomain: string;

declare const SFErrorCode: {
  NoExtensionFound: 1,
  NoAttachmentFound: 2,
  LoadingInterrupted: 3,
  InternalError: 4,
  MissingEntitlement: 5,
};

declare const SSReadingListErrorCode: {
  SSReadingListErrorURLSchemeNotAllowed: 1,
};

declare interface SFAddToHomeScreenActivityItem extends NSObjectProtocol {
  readonly URL: NSURL;

  readonly title: string;

  readonly iconItemProvider?: NSItemProvider;

  getWebAppManifestWithCompletionHandler?(completionHandler: (p1: BEWebAppManifest) => void | null): void;

  getHomeScreenWebAppInfoWithCompletionHandler?(completionHandler: (p1: SFAddToHomeScreenInfo) => void | null): void;
}

declare class SFAddToHomeScreenActivityItem extends NativeObject implements SFAddToHomeScreenActivityItem {
}

declare class SFAddToHomeScreenInfo extends NSObject implements NSCopying {
  initWithManifest(manifest: BEWebAppManifest): this;

  readonly manifest: BEWebAppManifest;

  get websiteCookies(): NSArray;
  set websiteCookies(value: NSArray<interop.Object> | Array<interop.Object>);

  setWebsiteCookies(websiteCookies: NSArray<interop.Object> | Array<interop.Object>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class SFContentBlockerState extends NSObject {
  readonly enabled: boolean;

  isEnabled(): boolean;
}

declare class SFSafariViewControllerConfiguration extends NSObject implements NSCopying {
  entersReaderIfAvailable: boolean;

  eventAttribution: UIEventAttribution;

  setEntersReaderIfAvailable(entersReaderIfAvailable: boolean): void;

  setEventAttribution(eventAttribution: UIEventAttribution): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class SFContentBlockerManager extends NSObject {
  static reloadContentBlockerWithIdentifierCompletionHandler(identifier: string, completionHandler: (p1: NSError) => void | null): void;

  static getStateOfContentBlockerWithIdentifierCompletionHandler(identifier: string, completionHandler: (p1: SFContentBlockerState, p2: NSError) => void | null): void;
}

declare class SFSafariViewController extends UIViewController {
  initWithURLConfiguration(URL: NSURL, configuration: SFSafariViewControllerConfiguration): this;

  initWithURL(URL: NSURL): this;

  readonly configuration: SFSafariViewControllerConfiguration;
}

declare class SSReadingList extends NSObject {
  static defaultReadingList(): SSReadingList;

  static supportsURL(URL: NSURL): boolean;

  addReadingListItemWithURLTitlePreviewTextError(URL: NSURL, title: string | null, previewText: string | null, error: interop.PointerConvertible): boolean;
}

declare class SFSafariSettings extends NSObject {
  static openExportBrowsingDataSettingsWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;
}


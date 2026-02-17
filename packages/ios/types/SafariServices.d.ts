/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./UIKit.d.ts" />
/// <reference path="./Runtime.d.ts" />

declare const SFExtensionProfileKey: string;

declare const SFExtensionMessageKey: string;

declare const SFContentBlockerErrorDomain: string;

declare const SFErrorDomain: string;

declare const SSReadingListErrorDomain: string;

declare const SFAuthenticationErrorDomain: string;

declare const SFSafariViewControllerDismissButtonStyle: {
  Done: 0,
  Close: 1,
  Cancel: 2,
};

declare const SFAuthenticationError: {
  SFAuthenticationErrorCanceledLogin: 1,
};

declare const SFContentBlockerErrorCode: {
  NoExtensionFound: 1,
  NoAttachmentFound: 2,
  LoadingInterrupted: 3,
};

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

declare interface SFSafariViewControllerDelegate extends NSObjectProtocol {
  safariViewControllerActivityItemsForURLTitle?(controller: SFSafariViewController, URL: NSURL, title: string | null): NSArray;

  safariViewControllerExcludedActivityTypesForURLTitle?(controller: SFSafariViewController, URL: NSURL, title: string | null): NSArray;

  safariViewControllerDidFinish?(controller: SFSafariViewController): void;

  safariViewControllerDidCompleteInitialLoad?(controller: SFSafariViewController, didLoadSuccessfully: boolean): void;

  safariViewControllerInitialLoadDidRedirectToURL?(controller: SFSafariViewController, URL: NSURL): void;

  safariViewControllerWillOpenInBrowser?(controller: SFSafariViewController): void;
}

declare class SFSafariViewControllerDelegate extends NativeObject implements SFSafariViewControllerDelegate {
}

declare interface SFAddToHomeScreenActivityItem extends NSObjectProtocol {
  readonly URL: NSURL;

  readonly title: string;

  readonly iconItemProvider?: NSItemProvider;

  getWebAppManifestWithCompletionHandler?(completionHandler: (p1: BEWebAppManifest) => void | null): void;

  getHomeScreenWebAppInfoWithCompletionHandler?(completionHandler: (p1: SFAddToHomeScreenInfo) => void | null): void;
}

declare class SFAddToHomeScreenActivityItem extends NativeObject implements SFAddToHomeScreenActivityItem {
}

declare class SFSafariViewController extends UIViewController {
  initWithURLConfiguration(URL: NSURL, configuration: SFSafariViewControllerConfiguration): this;

  initWithURLEntersReaderIfAvailable(URL: NSURL, entersReaderIfAvailable: boolean): this;

  initWithURL(URL: NSURL): this;

  delegate: SFSafariViewControllerDelegate;

  readonly configuration: SFSafariViewControllerConfiguration;

  preferredBarTintColor: UIColor;

  preferredControlTintColor: UIColor;

  dismissButtonStyle: interop.Enum<typeof SFSafariViewControllerDismissButtonStyle>;

  static prewarmConnectionsToURLs(URLs: NSArray<interop.Object> | Array<interop.Object>): SFSafariViewControllerPrewarmingToken;

  setDelegate(delegate: SFSafariViewControllerDelegate): void;

  setPreferredBarTintColor(preferredBarTintColor: UIColor): void;

  setPreferredControlTintColor(preferredControlTintColor: UIColor): void;

  setDismissButtonStyle(dismissButtonStyle: interop.Enum<typeof SFSafariViewControllerDismissButtonStyle>): void;
}

declare class SFSafariViewControllerDataStore extends NSObject {
  static readonly defaultDataStore: SFSafariViewControllerDataStore;

  clearWebsiteDataWithCompletionHandler(completion: () => void | null): void;
}

declare class SFSafariViewControllerActivityButton extends NSObject implements NSCopying, NSSecureCoding {
  initWithTemplateImageExtensionIdentifier(templateImage: UIImage, extensionIdentifier: string): this;

  readonly templateImage: UIImage;

  readonly extensionIdentifier: string;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SFContentBlockerManager extends NSObject {
  static reloadContentBlockerWithIdentifierCompletionHandler(identifier: string, completionHandler: (p1: NSError) => void | null): void;

  static getStateOfContentBlockerWithIdentifierCompletionHandler(identifier: string, completionHandler: (p1: SFContentBlockerState, p2: NSError) => void | null): void;
}

declare class SFAuthenticationSession extends NSObject {
  initWithURLCallbackURLSchemeCompletionHandler(URL: NSURL, callbackURLScheme: string | null, completionHandler: (p1: NSURL, p2: NSError) => void): this;

  start(): boolean;

  cancel(): void;
}

declare class SFAddToHomeScreenInfo extends NSObject implements NSCopying {
  initWithManifest(manifest: BEWebAppManifest): this;

  readonly manifest: BEWebAppManifest;

  get websiteCookies(): NSArray;
  set websiteCookies(value: NSArray<interop.Object> | Array<interop.Object>);

  setWebsiteCookies(websiteCookies: NSArray<interop.Object> | Array<interop.Object>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class SFSafariSettings extends NSObject {
  static openExportBrowsingDataSettingsWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;
}

declare class SFContentBlockerState extends NSObject {
  readonly enabled: boolean;

  isEnabled(): boolean;
}

declare class SSReadingList extends NSObject {
  static defaultReadingList(): SSReadingList;

  static supportsURL(URL: NSURL): boolean;

  addReadingListItemWithURLTitlePreviewTextError(URL: NSURL, title: string | null, previewText: string | null, error: interop.PointerConvertible): boolean;
}

declare class SFSafariViewControllerPrewarmingToken extends NSObject {
  invalidate(): void;
}

declare class SFSafariViewControllerConfiguration extends NSObject implements NSCopying {
  entersReaderIfAvailable: boolean;

  barCollapsingEnabled: boolean;

  activityButton: SFSafariViewControllerActivityButton;

  eventAttribution: UIEventAttribution;

  setEntersReaderIfAvailable(entersReaderIfAvailable: boolean): void;

  setBarCollapsingEnabled(barCollapsingEnabled: boolean): void;

  setActivityButton(activityButton: SFSafariViewControllerActivityButton): void;

  setEventAttribution(eventAttribution: UIEventAttribution): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}


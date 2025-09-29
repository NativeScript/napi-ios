/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./AppKit.d.ts" />

declare const _SFSafariServicesVersion: interop.Enum<typeof SFSafariServicesVersion>;

declare const _SFSafariServicesAvailable: interop.Pointer;

declare const SFExtensionProfileKey: string;

declare const SFErrorDomain: string;

declare const SFExtensionMessageKey: string;

declare const SFErrorCode: {
  NoExtensionFound: 1,
  NoAttachmentFound: 2,
  LoadingInterrupted: 3,
};

declare const SFSafariServicesVersion: {
  Version10_0: 0,
  Version10_1: 1,
  Version11_0: 2,
  Version12_0: 3,
  Version12_1: 4,
  Version13_0: 5,
};

declare interface SFSafariExtensionHandling extends NSObjectProtocol {
  messageReceivedWithNameFromPageUserInfo?(messageName: string, page: SFSafariPage, userInfo: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): void;

  messageReceivedFromContainingAppWithNameUserInfo?(messageName: string, userInfo: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): void;

  toolbarItemClickedInWindow?(window: SFSafariWindow): void;

  validateToolbarItemInWindowValidationHandler?(window: SFSafariWindow, validationHandler: (p1: boolean, p2: string) => void): void;

  contextMenuItemSelectedWithCommandInPageUserInfo?(command: string, page: SFSafariPage, userInfo: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): void;

  validateContextMenuItemWithCommandInPageUserInfoValidationHandler?(command: string, page: SFSafariPage, userInfo: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, validationHandler: (p1: boolean, p2: string) => void | null): void;

  popoverWillShowInWindow?(window: SFSafariWindow): void;

  popoverDidCloseInWindow?(window: SFSafariWindow): void;

  popoverViewController?(): SFSafariExtensionViewController;

  additionalRequestHeadersForURLCompletionHandler?(url: NSURL, completionHandler: (p1: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>) => void | null): void;

  contentBlockerWithIdentifierBlockedResourcesWithURLsOnPage?(contentBlockerIdentifier: string, urls: NSArray<interop.Object> | Array<interop.Object>, page: SFSafariPage): void;

  pageWillNavigateToURL?(page: SFSafariPage, url: NSURL | null): void;
}

declare class SFSafariExtensionHandling extends NativeObject implements SFSafariExtensionHandling {
}

declare class SFSafariTab extends NSObject implements NSCopying, NSSecureCoding {
  getActivePageWithCompletionHandler(completionHandler: (p1: SFSafariPage) => void | null): void;

  getPagesWithCompletionHandler(completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>) => void | null): void;

  getContainingWindowWithCompletionHandler(completionHandler: (p1: SFSafariWindow) => void | null): void;

  activateWithCompletionHandler(completionHandler: () => void | null): void;

  navigateToURL(url: NSURL): void;

  close(): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SFSafariApplication extends NSObject {
  static getActiveWindowWithCompletionHandler(completionHandler: (p1: SFSafariWindow) => void | null): void;

  static getAllWindowsWithCompletionHandler(completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>) => void): void;

  static openWindowWithURLCompletionHandler(url: NSURL, completionHandler: (p1: SFSafariWindow) => void | null): void;

  static setToolbarItemsNeedUpdate(): void;

  static getHostApplicationWithCompletionHandler(completionHandler: (p1: NSRunningApplication) => void): void;

  static showPreferencesForExtensionWithIdentifierCompletionHandler(identifier: string, completionHandler: (p1: NSError) => void | null): void;

  static dispatchMessageWithNameToExtensionWithIdentifierUserInfoCompletionHandler(messageName: string, identifier: string, userInfo: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, completionHandler: (p1: NSError) => void | null): void;
}

declare class SFUniversalLink extends NSObject {
  initWithWebpageURL(url: NSURL): this;

  readonly webpageURL: NSURL;

  readonly applicationURL: NSURL;

  enabled: boolean;

  isEnabled(): boolean;

  setEnabled(enabled: boolean): void;
}

declare class SFSafariWindow extends NSObject implements NSCopying, NSSecureCoding {
  getActiveTabWithCompletionHandler(completionHandler: (p1: SFSafariTab) => void | null): void;

  getAllTabsWithCompletionHandler(completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>) => void): void;

  openTabWithURLMakeActiveIfPossibleCompletionHandler(url: NSURL, activateTab: boolean, completionHandler: (p1: SFSafariTab) => void | null): void;

  getToolbarItemWithCompletionHandler(completionHandler: (p1: SFSafariToolbarItem) => void | null): void;

  close(): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SFSafariPage extends NSObject implements NSCopying, NSSecureCoding {
  dispatchMessageToScriptWithNameUserInfo(messageName: string, userInfo: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): void;

  reload(): void;

  getPagePropertiesWithCompletionHandler(completionHandler: (p1: SFSafariPageProperties) => void | null): void;

  getContainingTabWithCompletionHandler(completionHandler: (p1: SFSafariTab) => void): void;

  getScreenshotOfVisibleAreaWithCompletionHandler(completionHandler: (p1: NSImage) => void | null): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SFSafariToolbarItem extends NSObject implements NSCopying, NSSecureCoding {
  setEnabledWithBadgeText(enabled: boolean, badgeText: string | null): void;

  setEnabled(enabled: boolean): void;

  setBadgeText(badgeText: string | null): void;

  setImage(image: NSImage | null): void;

  setLabel(label: string | null): void;

  showPopover(): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SFSafariPageProperties extends NSObject {
  readonly url: NSURL;

  readonly title: string;

  readonly usesPrivateBrowsing: boolean;

  readonly active: boolean;

  isActive(): boolean;
}

declare class SFSafariExtensionState extends NSObject {
  readonly enabled: boolean;

  isEnabled(): boolean;
}

declare class SFSafariExtensionManager extends NSObject {
  static getStateOfSafariExtensionWithIdentifierCompletionHandler(identifier: string, completionHandler: (p1: SFSafariExtensionState, p2: NSError) => void | null): void;
}

declare class SFContentBlockerState extends NSObject {
  readonly enabled: boolean;

  isEnabled(): boolean;
}

declare class SFContentBlockerManager extends NSObject {
  static reloadContentBlockerWithIdentifierCompletionHandler(identifier: string, completionHandler: (p1: NSError) => void | null): void;

  static getStateOfContentBlockerWithIdentifierCompletionHandler(identifier: string, completionHandler: (p1: SFContentBlockerState, p2: NSError) => void | null): void;
}

declare class SFSafariExtensionHandler extends NSObject implements NSExtensionRequestHandling, SFSafariExtensionHandling {
  beginRequestWithExtensionContext(context: NSExtensionContext): void;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;

  messageReceivedWithNameFromPageUserInfo(messageName: string, page: SFSafariPage, userInfo: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): void;

  messageReceivedFromContainingAppWithNameUserInfo(messageName: string, userInfo: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): void;

  toolbarItemClickedInWindow(window: SFSafariWindow): void;

  validateToolbarItemInWindowValidationHandler(window: SFSafariWindow, validationHandler: (p1: boolean, p2: string) => void): void;

  contextMenuItemSelectedWithCommandInPageUserInfo(command: string, page: SFSafariPage, userInfo: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): void;

  validateContextMenuItemWithCommandInPageUserInfoValidationHandler(command: string, page: SFSafariPage, userInfo: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, validationHandler: (p1: boolean, p2: string) => void | null): void;

  popoverWillShowInWindow(window: SFSafariWindow): void;

  popoverDidCloseInWindow(window: SFSafariWindow): void;

  popoverViewController(): SFSafariExtensionViewController;

  additionalRequestHeadersForURLCompletionHandler(url: NSURL, completionHandler: (p1: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>) => void | null): void;

  contentBlockerWithIdentifierBlockedResourcesWithURLsOnPage(contentBlockerIdentifier: string, urls: NSArray<interop.Object> | Array<interop.Object>, page: SFSafariPage): void;

  pageWillNavigateToURL(page: SFSafariPage, url: NSURL | null): void;
}

declare class SFSafariExtensionViewController extends NSViewController {
  dismissPopover(): void;
}

declare class SFSafariExtension extends NSObject {
  static getBaseURIWithCompletionHandler(completionHandler: (p1: NSURL) => void | null): void;
}


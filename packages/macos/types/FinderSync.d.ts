/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./Foundation.d.ts" />

declare const FIMenuKind: {
  ContextualMenuForItems: 0,
  ContextualMenuForContainer: 1,
  ContextualMenuForSidebar: 2,
  ToolbarItemMenu: 3,
};

declare interface FIFinderSyncProtocol {
  menuForMenuKind?(menu: interop.Enum<typeof FIMenuKind>): NSMenu;

  beginObservingDirectoryAtURL?(url: NSURL): void;

  endObservingDirectoryAtURL?(url: NSURL): void;

  requestBadgeIdentifierForURL?(url: NSURL): void;

  readonly toolbarItemName?: string;

  readonly toolbarItemImage?: NSImage;

  readonly toolbarItemToolTip?: string;

  supportedServiceNamesForItemWithURL?(itemURL: NSURL): NSArray;

  makeListenerEndpointForServiceNameItemURLAndReturnError?(serviceName: string, itemURL: NSURL, error: interop.PointerConvertible): NSXPCListenerEndpoint;

  valuesForAttributesForItemWithURLCompletion?(attributes: NSArray<interop.Object> | Array<interop.Object>, itemURL: NSURL, completion: (p1: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, p2: NSError) => void | null): void;
}

declare class FIFinderSyncProtocol extends NativeObject implements FIFinderSyncProtocol {
}

declare class FIFinderSync extends NSObject implements FIFinderSyncProtocol, NSExtensionRequestHandling {
  menuForMenuKind(menu: interop.Enum<typeof FIMenuKind>): NSMenu;

  beginObservingDirectoryAtURL(url: NSURL): void;

  endObservingDirectoryAtURL(url: NSURL): void;

  requestBadgeIdentifierForURL(url: NSURL): void;

  readonly toolbarItemName: string;

  readonly toolbarItemImage: NSImage;

  readonly toolbarItemToolTip: string;

  supportedServiceNamesForItemWithURL(itemURL: NSURL): NSArray;

  makeListenerEndpointForServiceNameItemURLAndReturnError(serviceName: string, itemURL: NSURL, error: interop.PointerConvertible): NSXPCListenerEndpoint;

  valuesForAttributesForItemWithURLCompletion(attributes: NSArray<interop.Object> | Array<interop.Object>, itemURL: NSURL, completion: (p1: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, p2: NSError) => void | null): void;

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
}

declare class FIFinderSyncController extends NSExtensionContext {
  static defaultController<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  directoryURLs: NSSet;

  setBadgeImageLabelForBadgeIdentifier(image: NSImage, label: string | null, badgeID: string): void;

  setBadgeIdentifierForURL(badgeID: string, url: NSURL): void;

  targetedURL(): NSURL;

  selectedItemURLs(): NSArray;

  lastUsedDateForItemWithURL(itemURL: NSURL): NSDate;

  setLastUsedDateForItemWithURLCompletion(lastUsedDate: NSDate, itemURL: NSURL, completion: (p1: NSError) => void): void;

  tagDataForItemWithURL(itemURL: NSURL): NSData;

  setTagDataForItemWithURLCompletion(tagData: NSData | null, itemURL: NSURL, completion: (p1: NSError) => void): void;

  static readonly extensionEnabled: boolean;

  static showExtensionManagementInterface(): void;

  setDirectoryURLs(directoryURLs: NSSet | null): void;

  static isExtensionEnabled(): boolean;
}


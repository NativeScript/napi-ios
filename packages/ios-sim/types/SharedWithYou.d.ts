/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./UIKit.d.ts" />
/// <reference path="./Runtime.d.ts" />

declare const SWCollaborationMetadataTypeIdentifier: string;

declare const SWAttributionViewBackgroundStyle: {
  Default: 0,
  Color: 1,
  Material: 2,
};

declare const SWAttributionViewHorizontalAlignment: {
  Default: 0,
  Leading: 1,
  Center: 2,
  Trailing: 3,
};

declare const SWAttributionViewDisplayContext: {
  Summary: 0,
  Detail: 1,
};

declare const SWHighlightPersistenceEventTrigger: {
  Created: 1,
  Deleted: 2,
  Renamed: 3,
  Moved: 4,
};

declare const SWHighlightChangeEventTrigger: {
  Edit: 1,
  Comment: 2,
};

declare const SWHighlightCenterErrorCode: {
  NoError: 0,
  InternalError: 1,
  InvalidURL: 2,
  AccessDenied: 3,
};

declare const SWHighlightMembershipEventTrigger: {
  Added: 1,
  Removed: 2,
};

declare interface SWCollaborationViewDelegate extends NSObjectProtocol {
  collaborationViewShouldPresentPopover?(collaborationView: SWCollaborationView): boolean;

  collaborationViewWillPresentPopover?(collaborationView: SWCollaborationView): void;

  collaborationViewDidDismissPopover?(collaborationView: SWCollaborationView): void;
}

declare class SWCollaborationViewDelegate extends NativeObject implements SWCollaborationViewDelegate {
}

declare interface SWHighlightCenterDelegate extends NSObjectProtocol {
  highlightCenterHighlightsDidChange(highlightCenter: SWHighlightCenter): void;
}

declare class SWHighlightCenterDelegate extends NativeObject implements SWHighlightCenterDelegate {
}

declare interface SWHighlightEvent extends NSObjectProtocol, NSSecureCoding, NSCopying {
  readonly highlightURL: NSURL;
}

declare class SWHighlightEvent extends NativeObject implements SWHighlightEvent {
}

declare class SWRemoveParticipantAlertController extends UIViewController {
  static alertControllerWithParticipantHighlight<This extends abstract new (...args: any) => any>(this: This, participant: SWPerson, highlight: SWCollaborationHighlight): InstanceType<This>;
}

declare class SWAttributionView extends UIView {
  highlight: SWHighlight;

  displayContext: interop.Enum<typeof SWAttributionViewDisplayContext>;

  horizontalAlignment: interop.Enum<typeof SWAttributionViewHorizontalAlignment>;

  backgroundStyle: interop.Enum<typeof SWAttributionViewBackgroundStyle>;

  preferredMaxLayoutWidth: number;

  readonly highlightMenu: UIMenu;

  menuTitleForHideAction: string;

  supplementalMenu: UIMenu;

  setHighlight(highlight: SWHighlight | null): void;

  setDisplayContext(displayContext: interop.Enum<typeof SWAttributionViewDisplayContext>): void;

  setHorizontalAlignment(horizontalAlignment: interop.Enum<typeof SWAttributionViewHorizontalAlignment>): void;

  setBackgroundStyle(backgroundStyle: interop.Enum<typeof SWAttributionViewBackgroundStyle>): void;

  setPreferredMaxLayoutWidth(preferredMaxLayoutWidth: number): void;

  setMenuTitleForHideAction(menuTitleForHideAction: string | null): void;

  setSupplementalMenu(supplementalMenu: UIMenu | null): void;
}

declare class SWHighlightPersistenceEvent extends NSObject implements SWHighlightEvent {
  readonly persistenceEventTrigger: interop.Enum<typeof SWHighlightPersistenceEventTrigger>;

  initWithHighlightTrigger(highlight: SWHighlight, trigger: interop.Enum<typeof SWHighlightPersistenceEventTrigger>): this;

  readonly highlightURL: NSURL;

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

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class SWHighlight extends NSObject implements NSSecureCoding, NSCopying {
  readonly identifier: NSCopying;

  readonly URL: NSURL;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class SWHighlightCenter extends NSObject {
  delegate: SWHighlightCenterDelegate;

  readonly highlights: NSArray;

  static readonly highlightCollectionTitle: string;

  static readonly systemCollaborationSupportAvailable: boolean;

  getHighlightForURLCompletionHandler(URL: NSURL, completionHandler: (p1: SWHighlight, p2: NSError) => void | null): void;

  collaborationHighlightForIdentifierError(collaborationIdentifier: string, error: interop.PointerConvertible): SWCollaborationHighlight | null;

  getCollaborationHighlightForURLCompletionHandler(URL: NSURL, completionHandler: (p1: SWCollaborationHighlight, p2: NSError) => void | null): void;

  postNoticeForHighlightEvent(event: SWHighlightEvent): void;

  clearNoticesForHighlight(highlight: SWCollaborationHighlight): void;

  getSignedIdentityProofForCollaborationHighlightUsingDataCompletionHandler(collaborationHighlight: SWCollaborationHighlight, data: NSData, completionHandler: (p1: SWSignedPersonIdentityProof, p2: NSError) => void | null): void;

  setDelegate(delegate: SWHighlightCenterDelegate | null): void;

  static isSystemCollaborationSupportAvailable(): boolean;
}

declare class SWCollaborationView extends UIView {
  cloudSharingDelegate: UICloudSharingControllerDelegate | null;

  setContentView(detailViewListContentView: UIView): void;

  initWithItemProvider(itemProvider: NSItemProvider): this;

  activeParticipantCount: number;

  delegate: SWCollaborationViewDelegate | null;

  headerTitle: string;

  headerSubtitle: string;

  headerImage: UIImage;

  cloudSharingControllerDelegate: UICloudSharingControllerDelegate | null;

  dismissPopover(completion: () => void | null): void;

  manageButtonTitle: string;

  setShowManageButton(showManageButton: boolean): void;

  setCloudSharingDelegate(cloudSharingDelegate: UICloudSharingControllerDelegate | null): void;

  setActiveParticipantCount(activeParticipantCount: number): void;

  setDelegate(delegate: SWCollaborationViewDelegate | null): void;

  setHeaderTitle(headerTitle: string): void;

  setHeaderSubtitle(headerSubtitle: string): void;

  setHeaderImage(headerImage: UIImage): void;

  setCloudSharingControllerDelegate(cloudSharingControllerDelegate: UICloudSharingControllerDelegate | null): void;

  setManageButtonTitle(manageButtonTitle: string): void;
}

declare class SWHighlightMembershipEvent extends NSObject implements SWHighlightEvent {
  readonly membershipEventTrigger: interop.Enum<typeof SWHighlightMembershipEventTrigger>;

  initWithHighlightTrigger(highlight: SWHighlight, trigger: interop.Enum<typeof SWHighlightMembershipEventTrigger>): this;

  readonly highlightURL: NSURL;

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

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class SWHighlightMentionEvent extends NSObject implements SWHighlightEvent {
  readonly mentionedPersonHandle: string;

  initWithHighlightMentionedPersonCloudKitShareHandle(highlight: SWHighlight, handle: string): this;

  initWithHighlightMentionedPersonIdentity(highlight: SWHighlight, identity: SWPersonIdentity): this;

  readonly highlightURL: NSURL;

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

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class SWHighlightChangeEvent extends NSObject implements SWHighlightEvent {
  readonly changeEventTrigger: interop.Enum<typeof SWHighlightChangeEventTrigger>;

  initWithHighlightTrigger(highlight: SWHighlight, trigger: interop.Enum<typeof SWHighlightChangeEventTrigger>): this;

  readonly highlightURL: NSURL;

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

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class SWCollaborationHighlight extends SWHighlight implements NSSecureCoding, NSCopying {
  readonly collaborationIdentifier: string;

  readonly title: string;

  readonly creationDate: NSDate;

  readonly contentType: UTType;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}


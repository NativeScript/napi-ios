/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const SharedWithYouCoreVersionString: interop.Pointer;

declare const SharedWithYouCoreVersionNumber: number;

declare const UTCollaborationOptionsTypeIdentifier: string;

declare interface SWCollaborationActionHandler extends NSObjectProtocol {
  collaborationCoordinatorHandleStartCollaborationAction(coordinator: SWCollaborationCoordinator, action: SWStartCollaborationAction): void;

  collaborationCoordinatorHandleUpdateCollaborationParticipantsAction(coordinator: SWCollaborationCoordinator, action: SWUpdateCollaborationParticipantsAction): void;
}

declare class SWCollaborationActionHandler extends NativeObject implements SWCollaborationActionHandler {
}

declare class SWSignedPersonIdentityProof extends SWPersonIdentityProof {
  initWithPersonIdentityProofSignatureData(personIdentityProof: SWPersonIdentityProof, data: NSData): this;

  readonly signatureData: NSData;
}

declare class SWPerson extends NSObject implements NSSecureCoding {
  initWithHandleIdentityDisplayNameThumbnailImageData(handle: string | null, identity: SWPersonIdentity | null, displayName: string, thumbnailImageData: NSData | null): this;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SWCollaborationShareOptions extends NSObject implements NSCopying, NSSecureCoding {
  get optionsGroups(): NSArray;
  set optionsGroups(value: NSArray<interop.Object> | Array<interop.Object>);

  summary: string;

  initWithOptionsGroupsSummary(optionsGroups: NSArray<interop.Object> | Array<interop.Object>, summary: string): this;

  initWithOptionsGroups(optionsGroups: NSArray<interop.Object> | Array<interop.Object>): this;

  static shareOptionsWithOptionsGroupsSummary(optionsGroups: NSArray<interop.Object> | Array<interop.Object>, summary: string): SWCollaborationShareOptions;

  static shareOptionsWithOptionsGroups(optionsGroups: NSArray<interop.Object> | Array<interop.Object>): SWCollaborationShareOptions;

  initWithCoder(coder: NSCoder): this;

  setOptionsGroups(optionsGroups: NSArray<interop.Object> | Array<interop.Object>): void;

  setSummary(summary: string): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;
}

declare class SWCollaborationOptionsPickerGroup extends SWCollaborationOptionsGroup {
  selectedOptionIdentifier: string;

  setSelectedOptionIdentifier(selectedOptionIdentifier: string): void;
}

declare class SWCollaborationOptionsGroup extends NSObject implements NSCopying, NSSecureCoding {
  title: string;

  readonly identifier: string;

  footer: string;

  get options(): NSArray;
  set options(value: NSArray<interop.Object> | Array<interop.Object>);

  initWithIdentifierOptions(identifier: string, options: NSArray<interop.Object> | Array<interop.Object>): this;

  static optionsGroupWithIdentifierOptions(identifier: string, options: NSArray<interop.Object> | Array<interop.Object>): SWCollaborationOptionsGroup;

  setTitle(title: string): void;

  setFooter(footer: string): void;

  setOptions(options: NSArray<interop.Object> | Array<interop.Object>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SWCollaborationOption extends NSObject implements NSCopying, NSSecureCoding {
  title: string;

  readonly identifier: string;

  subtitle: string;

  selected: boolean;

  get requiredOptionsIdentifiers(): NSArray;
  set requiredOptionsIdentifiers(value: NSArray<interop.Object> | Array<interop.Object>);

  initWithTitleIdentifier(title: string, identifier: string): this;

  static optionWithTitleIdentifier(title: string, identifier: string): SWCollaborationOption;

  setTitle(title: string): void;

  setSubtitle(subtitle: string): void;

  isSelected(): boolean;

  setSelected(selected: boolean): void;

  setRequiredOptionsIdentifiers(requiredOptionsIdentifiers: NSArray<interop.Object> | Array<interop.Object>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SWCollaborationCoordinator extends NSObject {
  static readonly sharedCoordinator: SWCollaborationCoordinator;

  actionHandler: SWCollaborationActionHandler | null;

  setActionHandler(actionHandler: SWCollaborationActionHandler | null): void;
}

declare class SWAction extends NSObject implements NSCopying, NSSecureCoding {
  readonly uuid: NSUUID;

  readonly complete: boolean;

  fulfill(): void;

  fail(): void;

  isComplete(): boolean;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SWCollaborationMetadata extends NSObject implements NSSecureCoding, NSCopying, NSMutableCopying {
  readonly collaborationIdentifier: string;

  readonly localIdentifier: string;

  title: string;

  defaultShareOptions: SWCollaborationShareOptions;

  userSelectedShareOptions: SWCollaborationShareOptions;

  initiatorHandle: string;

  initiatorNameComponents: NSPersonNameComponents;

  initWithLocalIdentifier(localIdentifier: string): this;

  initWithCollaborationIdentifier(collaborationIdentifier: string): this;

  setTitle(title: string | null): void;

  setDefaultShareOptions(defaultShareOptions: SWCollaborationShareOptions | null): void;

  setUserSelectedShareOptions(userSelectedShareOptions: SWCollaborationShareOptions | null): void;

  setInitiatorHandle(initiatorHandle: string | null): void;

  setInitiatorNameComponents(initiatorNameComponents: NSPersonNameComponents | null): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  mutableCopyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class SWPersonIdentity extends NSObject implements NSSecureCoding, NSCopying {
  readonly rootHash: NSData;

  initWithRootHash(rootHash: NSData): this;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class SWPersonIdentityProof extends NSObject implements NSSecureCoding, NSCopying {
  readonly inclusionHashes: NSArray;

  readonly publicKey: NSData;

  readonly publicKeyIndex: number;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class SWStartCollaborationAction extends SWAction implements NSSecureCoding, NSCopying {
  readonly collaborationMetadata: SWCollaborationMetadata;

  fulfillUsingURLCollaborationIdentifier(url: NSURL, collaborationIdentifier: string): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class SWUpdateCollaborationParticipantsAction extends SWAction implements NSSecureCoding, NSCopying {
  readonly collaborationMetadata: SWCollaborationMetadata;

  readonly addedIdentities: NSArray;

  readonly removedIdentities: NSArray;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}


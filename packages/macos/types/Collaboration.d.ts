/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare class CBIdentityPicker extends NSObject {
  title: string;

  allowsMultipleSelection: boolean;

  runModal(): number;

  runModalForWindowModalDelegateDidEndSelectorContextInfo(window: NSWindow, delegate: interop.Object | null, didEndSelector: string | null, contextInfo: interop.PointerConvertible): void;

  runModalForWindowCompletionHandler(window: NSWindow, completionHandler: (p1: number) => void | null): void;

  readonly identities: NSArray;

  setTitle(title: string | null): void;

  setAllowsMultipleSelection(allowsMultipleSelection: boolean): void;
}

declare class CBGroupIdentity extends CBIdentity {
  static groupIdentityWithPosixGIDAuthority(gid: number, authority: CBIdentityAuthority): CBGroupIdentity;

  readonly posixGID: number;

  readonly members: NSArray;

  readonly memberIdentities: NSArray;
}

declare class CBIdentityAuthority extends NSObject {
  static localIdentityAuthority(): CBIdentityAuthority;

  static managedIdentityAuthority(): CBIdentityAuthority;

  static defaultIdentityAuthority(): CBIdentityAuthority;

  static identityAuthorityWithCSIdentityAuthority(CSIdentityAuthority: interop.Object): CBIdentityAuthority;

  readonly CSIdentityAuthority: interop.Object;

  readonly localizedName: string;
}

declare class CBIdentity extends NSObject implements NSCoding, NSCopying {
  static identityWithNameAuthority(name: string, authority: CBIdentityAuthority): CBIdentity;

  static identityWithUniqueIdentifierAuthority(uuid: NSUUID, authority: CBIdentityAuthority): CBIdentity;

  static identityWithUUIDStringAuthority(uuid: string, authority: CBIdentityAuthority): CBIdentity;

  static identityWithPersistentReference(data: NSData): CBIdentity;

  static identityWithCSIdentity(csIdentity: interop.Object): CBIdentity;

  readonly authority: CBIdentityAuthority;

  readonly uniqueIdentifier: NSUUID;

  readonly UUIDString: string;

  readonly fullName: string;

  readonly posixName: string;

  readonly aliases: NSArray;

  readonly emailAddress: string;

  readonly image: NSImage;

  readonly persistentReference: NSData;

  readonly hidden: boolean;

  isMemberOfGroup(group: CBGroupIdentity): boolean;

  readonly CSIdentity: interop.Object;

  isHidden(): boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class CBUserIdentity extends CBIdentity implements NSCoding, NSCopying {
  static userIdentityWithPosixUIDAuthority(uid: number, authority: CBIdentityAuthority): CBUserIdentity;

  readonly posixUID: number;

  readonly certificate: interop.Object;

  readonly enabled: boolean;

  authenticateWithPassword(password: string): boolean;

  isEnabled(): boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}


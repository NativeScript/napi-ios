/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./AppKit.d.ts" />

declare const SFDisplayViewException: string;

declare const SFCertificateViewDisclosureStateDidChange: string;

declare const SFAuthorizationPluginViewUserShortNameKey: string;

declare const SFAuthorizationPluginViewUserNameKey: string;

declare const SFViewType: {
  IdentityAnd: 0,
  SFViewTypeCredentials: 1,
};

declare const SFAuthorizationViewState: {
  Startup: 0,
  ViewLocked: 1,
  ViewInProgress: 2,
  ViewUnlocked: 3,
};

declare const SFButtonType: {
  Cancel: 0,
  OK: 1,
  Back: 0,
  Login: 1,
};

declare class SFCertificatePanel extends NSPanel {
  static sharedCertificatePanel(): SFCertificatePanel;

  runModalForTrustShowGroup(trust: interop.PointerConvertible, showGroup: boolean): number;

  runModalForCertificatesShowGroup(certificates: NSArray<interop.Object> | Array<interop.Object>, showGroup: boolean): number;

  beginSheetForWindowModalDelegateDidEndSelectorContextInfoTrustShowGroup(docWindow: NSWindow, delegate: interop.Object, didEndSelector: string, contextInfo: interop.PointerConvertible, trust: interop.PointerConvertible, showGroup: boolean): void;

  beginSheetForWindowModalDelegateDidEndSelectorContextInfoCertificatesShowGroup(docWindow: NSWindow, delegate: interop.Object, didEndSelector: string, contextInfo: interop.PointerConvertible, certificates: NSArray<interop.Object> | Array<interop.Object>, showGroup: boolean): void;

  setPolicies(policies: interop.Object): void;

  policies(): NSArray;

  setDefaultButtonTitle(title: string): void;

  setAlternateButtonTitle(title: string): void;

  setShowsHelp(showsHelp: boolean): void;

  showsHelp(): boolean;

  setHelpAnchor(anchor: string): void;

  helpAnchor(): string;

  certificateView(): SFCertificateView;
}

declare class SFKeychainSettingsPanel extends NSPanel {
  static sharedKeychainSettingsPanel(): SFKeychainSettingsPanel;

  runModalForSettingsKeychain(settings: interop.PointerConvertible, keychain: interop.PointerConvertible): number;

  beginSheetForWindowModalDelegateDidEndSelectorContextInfoSettingsKeychain(docWindow: NSWindow, delegate: interop.Object, didEndSelector: string, contextInfo: interop.PointerConvertible, settings: interop.PointerConvertible, keychain: interop.PointerConvertible): void;
}

declare class SFChooseIdentityTableCellView extends NSTableCellView {
  issuerTextField: NSTextField;

  setIssuerTextField(issuerTextField: NSTextField): void;
}

declare class SFAuthorizationPluginView extends NSObject {
  initWithCallbacksAndEngineRef(callbacks: interop.PointerConvertible, engineRef: interop.PointerConvertible): this;

  engineRef(): interop.Pointer;

  callbacks(): interop.Pointer;

  buttonPressed(inButtonType: interop.Enum<typeof SFButtonType>): void;

  lastError(): NSError;

  didActivate(): void;

  willActivateWithUser(inUserInformation: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  didDeactivate(): void;

  firstKeyView(): NSView;

  firstResponder(): NSResponder;

  lastKeyView(): NSView;

  setEnabled(inEnabled: boolean): void;

  viewForType(inType: interop.Enum<typeof SFViewType>): NSView;

  displayView(): void;

  setButtonEnabled(inButtonType: interop.Enum<typeof SFButtonType>, inEnabled: boolean): void;

  updateView(): void;
}

declare class SFAuthorizationView extends NSView {
  setString(authorizationString: string): void;

  setAuthorizationRights(authorizationRights: interop.PointerConvertible): void;

  authorizationRights(): interop.Pointer;

  authorization(): SFAuthorization;

  updateStatus(inSender: interop.Object): boolean;

  setAutoupdate(autoupdate: boolean): void;

  setAutoupdateInterval(autoupdate: boolean, interval: number): void;

  authorizationState(): interop.Enum<typeof SFAuthorizationViewState>;

  setEnabled(enabled: boolean): void;

  isEnabled(): boolean;

  setFlags(flags: interop.Enum<typeof AuthorizationFlags>): void;

  setDelegate(delegate: interop.Object): void;

  delegate(): interop.Object;

  authorize(inSender: interop.Object): boolean;

  deauthorize(inSender: interop.Object): boolean;
}

declare class SFCertificateTrustPanel extends SFCertificatePanel {
  static sharedCertificateTrustPanel(): SFCertificateTrustPanel;

  runModalForTrustMessage(trust: interop.PointerConvertible, message: string): number;

  beginSheetForWindowModalDelegateDidEndSelectorContextInfoTrustMessage(docWindow: NSWindow, delegate: interop.Object, didEndSelector: string, contextInfo: interop.PointerConvertible, trust: interop.PointerConvertible, message: string): void;

  setInformativeText(informativeText: string): void;

  informativeText(): string;
}

declare class SFCertificateView extends NSVisualEffectView {
  setCertificate(certificate: interop.PointerConvertible): void;

  certificate(): interop.Pointer;

  setPolicies(policies: interop.Object): void;

  policies(): NSArray;

  setEditableTrust(editable: boolean): void;

  isEditable(): boolean;

  setDisplayTrust(display: boolean): void;

  isTrustDisplayed(): boolean;

  saveTrustSettings(): void;

  setDisplayDetails(display: boolean): void;

  detailsDisplayed(): boolean;

  setDetailsDisclosed(disclosed: boolean): void;

  detailsDisclosed(): boolean;

  setPoliciesDisclosed(disclosed: boolean): void;

  policiesDisclosed(): boolean;
}

// @ts-ignore ClassDecl.tsIgnore
declare class SFKeychainSavePanel extends NSSavePanel {
  static sharedKeychainSavePanel(): SFKeychainSavePanel;

  // @ts-ignore MemberDecl.tsIgnore
  runModalForDirectoryFile(path: string, name: string): number;

  setPassword(password: string): void;

  keychain(): interop.Pointer;

  error(): NSError;

  // @ts-ignore MemberDecl.tsIgnore
  beginSheetForDirectoryFileModalForWindowModalDelegateDidEndSelectorContextInfo(path: string, name: string, docWindow: NSWindow, delegate: interop.Object, didEndSelector: string, contextInfo: interop.PointerConvertible): void;
}

declare class SFChooseIdentityPanel extends NSPanel {
  static sharedChooseIdentityPanel(): SFChooseIdentityPanel;

  runModalForIdentitiesMessage(identities: NSArray<interop.Object> | Array<interop.Object>, message: string): number;

  beginSheetForWindowModalDelegateDidEndSelectorContextInfoIdentitiesMessage(docWindow: NSWindow, delegate: interop.Object, didEndSelector: string, contextInfo: interop.PointerConvertible, identities: NSArray<interop.Object> | Array<interop.Object>, message: string): void;

  identity(): interop.Pointer;

  setPolicies(policies: interop.Object): void;

  policies(): NSArray;

  setDefaultButtonTitle(title: string): void;

  setAlternateButtonTitle(title: string): void;

  setShowsHelp(showsHelp: boolean): void;

  showsHelp(): boolean;

  setHelpAnchor(anchor: string): void;

  helpAnchor(): string;

  setInformativeText(informativeText: string): void;

  informativeText(): string;

  setDomain(domainString: string): void;

  domain(): string;
}


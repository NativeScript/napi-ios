/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./UIKit.d.ts" />

declare const PKIdentityErrorDomain: string;

declare const PKMerchantCategoryCodeNone: number;

declare const PKStoredValuePassBalanceTypeLoyaltyPoints: string;

declare const PKStoredValuePassBalanceTypeCash: string;

declare const PKPassLibraryRecoveredPassesUserInfoKey: string;

declare const PKPassLibrarySerialNumberUserInfoKey: string;

declare const PKPassLibraryPassTypeIdentifierUserInfoKey: string;

declare const PKPassLibraryRemovedPassInfosUserInfoKey: string;

declare const PKPassLibraryAddedPassesUserInfoKey: string;

declare const PKPassLibraryDidChangeNotification: string;

declare const PKAddSecureElementPassErrorDomain: string;

declare const PKDisbursementErrorDomain: string;

declare const PKPaymentErrorPostalAddressUserInfoKey: string;

declare const PKContactFieldEmailAddress: string;

declare const PKPaymentNetworkHimyan: string;

declare const PKPaymentNetworkMeeza: string;

declare const PKPaymentNetworkTmoney: string;

declare const PKPaymentNetworkPostFinance: string;

declare const PKPaymentNetworkNanaco: string;

declare const PKPaymentNetworkGirocard: string;

declare const PKPaymentNetworkVPay: string;

declare const PKPaymentNetworkVisa: string;

declare const PKPaymentNetworkSuica: string;

declare const PKPaymentNetworkQuicPay: string;

declare const PKPaymentNetworkMir: string;

declare const PKPaymentNetworkMasterCard: string;

declare const PKPaymentNetworkMaestro: string;

declare const PKPaymentNetworkMada: string;

declare const PKPaymentNetworkJCB: string;

declare const PKPaymentNetworkInterac: string;

declare const PKPaymentNetworkIDCredit: string;

declare const PKPaymentNetworkElo: string;

declare const PKPaymentNetworkEftpos: string;

declare const PKPaymentNetworkDiscover: string;

declare const PKPaymentNetworkBancontact: string;

declare const PKContactFieldName: string;

declare const PKPaymentNetworkBancomat: string;

declare const PKPaymentNetworkBarcode: string;

declare const PKPaymentNetworkBankAxept: string;

declare const PKPaymentErrorDomain: string;

declare const PKPaymentNetworkAmex: string;

declare const PKPaymentNetworkPrivateLabel: string;

declare const PKPaymentNetworkPagoBancomat: string;

declare const PKPaymentErrorContactFieldUserInfoKey: string;

declare const PKEncryptionSchemeRSA_V2: string;

declare const PKContactFieldPostalAddress: string;

declare const PKPassLibraryRemotePaymentPassesDidChangeNotification: string;

declare const PKPaymentNetworkCarteBancaires: string;

declare const PKPassLibraryReplacementPassesUserInfoKey: string;

declare const PKPaymentNetworkChinaUnionPay: string;

declare const PKDisbursementErrorContactFieldUserInfoKey: string;

declare const PKPaymentNetworkNAPAS: string;

declare const PKPaymentNetworkDankort: string;

declare const PKPaymentNetworkJaywan: string;

declare const PKPaymentNetworkWaon: string;

declare const PKPaymentNetworkElectron: string;

declare const PKPaymentNetworkCartesBancaires: string;

declare const PKContactFieldPhoneticName: string;

declare const PKEncryptionSchemeECC_V2: string;

declare const PKShareSecureElementPassErrorDomain: string;

declare const PKContactFieldPhoneNumber: string;

declare const PKPassKitErrorDomain: string;

declare const PKPaymentNetworkCarteBancaire: string;

declare const PKPayLaterDisplayStyle: {
  Standard: 0,
  Badge: 1,
  Checkout: 2,
  Price: 3,
};

declare const PKIdentityError: {
  Unknown: 0,
  NotSupported: 1,
  Cancelled: 2,
  NetworkUnavailable: 3,
  NoElementsRequested: 4,
  RequestAlreadyInProgress: 5,
  InvalidNonce: 6,
  InvalidElement: 7,
  RegionNotSupported: 8,
};

declare const PKVehicleConnectionErrorCode: {
  Unknown: 0,
  SessionUnableToStart: 1,
  SessionNotActive: 2,
};

declare const PKAddPassButtonStyle: {
  PKAddPassButtonStyleBlack: 0,
  Outline: 1,
};

declare const PKPaymentMethodType: {
  Unknown: 0,
  Debit: 1,
  Credit: 2,
  Prepaid: 3,
  Store: 4,
  EMoney: 5,
};

declare const PKApplePayLaterAvailability: {
  Available: 0,
  UnavailableItemIneligible: 1,
  UnavailableRecurringTransaction: 2,
};

declare const PKShippingType: {
  Shipping: 0,
  Delivery: 1,
  StorePickup: 2,
  ServicePickup: 3,
};

declare const PKPaymentSummaryItemType: {
  Final: 0,
  Pending: 1,
};

declare const PKAddSecureElementPassErrorCode: {
  Generic: 0,
  Unknown: 0,
  UserCanceled: 1,
  Unavailable: 2,
  InvalidConfiguration: 3,
  DeviceNotSupported: 4,
  DeviceNotReady: 5,
  OSVersionNotSupported: 6,
};

declare const PKAddPaymentPassError: {
  Unsupported: 0,
  UserCancelled: 1,
  SystemCancelled: 2,
};

declare const PKPaymentPassActivationState: {
  Activated: 0,
  RequiresActivation: 1,
  Activating: 2,
  Suspended: 3,
  Deactivated: 4,
};

declare const PKSecureElementPassActivationState: {
  Activated: 0,
  RequiresActivation: 1,
  Activating: 2,
  Suspended: 3,
  Deactivated: 4,
};

declare const PKPassType: {
  Barcode: 0,
  SecureElement: 1,
  Payment: 1,
  Any: -1,
};

declare const PKRadioTechnology: {
  None: 0,
  NFC: 1,
  Bluetooth: 2,
};

declare const PKPaymentButtonStyle: {
  White: 0,
  WhiteOutline: 1,
  Black: 2,
  Automatic: 3,
};

declare const PKAutomaticPassPresentationSuppressionResult: {
  NotSupported: 0,
  AlreadyPresenting: 1,
  Denied: 2,
  Cancelled: 3,
  Success: 4,
};

declare const PKBarcodeEventConfigurationDataType: {
  Unknown: 0,
  SigningKeyMaterial: 1,
  SigningCertificate: 2,
};

declare const PKPassKitErrorCode: {
  UnknownError: -1,
  InvalidDataError: 1,
  UnsupportedVersionError: 2,
  InvalidSignature: 3,
  NotEntitledError: 4,
};

declare const PKVehicleConnectionSessionConnectionState: {
  Disconnected: 0,
  Connected: 1,
  Connecting: 2,
  FailedToConnect: 3,
};

declare const PKAddressField: {
  None: 0,
  PostalAddress: 1,
  Phone: 2,
  Email: 4,
  Name: 8,
  All: 15,
};

declare const PKIssuerProvisioningExtensionAuthorizationResult: {
  Canceled: 0,
  Authorized: 1,
};

declare const PKIdentityButtonStyle: {
  PKIdentityButtonStyleBlack: 0,
  Outline: 1,
};

declare const PKIdentityButtonLabel: {
  VerifyIdentity: 0,
  Verify: 1,
  VerifyAge: 2,
  Continue: 3,
};

declare const PKMerchantCapability: {
  Capability3DS: 1,
  CapabilityEMV: 2,
  CapabilityCredit: 4,
  CapabilityDebit: 8,
  CapabilityInstantFundsOut: 128,
};

declare const PKShareSecureElementPassResult: {
  Canceled: 0,
  Shared: 1,
  Failed: 2,
};

declare const PKAddPaymentPassStyle: {
  Payment: 0,
  Access: 1,
};

declare const PKShippingContactEditingMode: {
  Available: 1,
  StorePickup: 2,
  Enabled: 1,
};

declare const PKPaymentAuthorizationStatus: {
  Success: 0,
  Failure: 1,
  InvalidBillingPostalAddress: 2,
  InvalidShippingPostalAddress: 3,
  InvalidShippingContact: 4,
  PINRequired: 5,
  PINIncorrect: 6,
  PINLockout: 7,
};

declare const PKPaymentErrorCode: {
  Unknown: -1,
  ShippingContactInvalid: 1,
  BillingContactInvalid: 2,
  ShippingAddressUnserviceable: 3,
  CouponCodeInvalid: 4,
  CouponCodeExpired: 5,
};

declare const PKPassLibraryAddPassesStatus: {
  DidAdd: 0,
  ShouldReview: 1,
  DidCancelAdd: 2,
};

declare const PKPayLaterAction: {
  LearnMore: 0,
  Calculator: 1,
};

declare const PKShareSecureElementPassErrorCode: {
  Unknown: 0,
  Setup: 1,
};

declare const PKDisbursementErrorCode: {
  Unknown: -1,
  UnsupportedCard: 1,
  RecipientContactInvalid: 2,
};

declare const PKPaymentButtonType: {
  Plain: 0,
  Buy: 1,
  SetUp: 2,
  InStore: 3,
  Donate: 4,
  Checkout: 5,
  Book: 6,
  Subscribe: 7,
  Reload: 8,
  AddMoney: 9,
  TopUp: 10,
  Order: 11,
  Rent: 12,
  Support: 13,
  Contribute: 14,
  Tip: 15,
  Continue: 16,
};

declare const PKAddShareablePassConfigurationPrimaryAction: {
  Add: 0,
  Share: 1,
};

declare function PKPayLaterValidateAmount(amount: NSDecimalNumber, currencyCode: string, completion: (p1: boolean) => void): void;

declare interface PKIdentityDocumentDescriptor extends NSObjectProtocol {
  readonly elements: NSArray;

  intentToStoreForElement(element: PKIdentityElement): PKIdentityIntentToStore;

  addElementsWithIntentToStore(elements: NSArray<interop.Object> | Array<interop.Object>, intentToStore: PKIdentityIntentToStore): void;
}

declare class PKIdentityDocumentDescriptor extends NativeObject implements PKIdentityDocumentDescriptor {
}

declare interface PKShareSecureElementPassViewControllerDelegate extends NSObjectProtocol {
  shareSecureElementPassViewControllerDidFinishWithResult(controller: PKShareSecureElementPassViewController, result: interop.Enum<typeof PKShareSecureElementPassResult>): void;

  shareSecureElementPassViewControllerDidCreateShareURLActivationCode?(controller: PKShareSecureElementPassViewController, universalShareURL: NSURL | null, activationCode: string | null): void;
}

declare class PKShareSecureElementPassViewControllerDelegate extends NativeObject implements PKShareSecureElementPassViewControllerDelegate {
}

declare interface PKIssuerProvisioningExtensionAuthorizationProviding extends NSObjectProtocol {
  completionHandler: (p1: interop.Enum<typeof PKIssuerProvisioningExtensionAuthorizationResult>) => void;

  setCompletionHandler(completionHandler: (p1: interop.Enum<typeof PKIssuerProvisioningExtensionAuthorizationResult>) => void | null): void;
}

declare class PKIssuerProvisioningExtensionAuthorizationProviding extends NativeObject implements PKIssuerProvisioningExtensionAuthorizationProviding {
}

declare interface PKPaymentAuthorizationControllerDelegate extends NSObjectProtocol {
  paymentAuthorizationControllerDidFinish(controller: PKPaymentAuthorizationController): void;

  paymentAuthorizationControllerDidAuthorizePaymentHandler?(controller: PKPaymentAuthorizationController, payment: PKPayment, completion: (p1: PKPaymentAuthorizationResult) => void): void;

  paymentAuthorizationControllerDidAuthorizePaymentCompletion?(controller: PKPaymentAuthorizationController, payment: PKPayment, completion: (p1: interop.Enum<typeof PKPaymentAuthorizationStatus>) => void): void;

  paymentAuthorizationControllerWillAuthorizePayment?(controller: PKPaymentAuthorizationController): void;

  paymentAuthorizationControllerDidRequestMerchantSessionUpdate?(controller: PKPaymentAuthorizationController, handler: (p1: PKPaymentRequestMerchantSessionUpdate) => void): void;

  paymentAuthorizationControllerDidChangeCouponCodeHandler?(controller: PKPaymentAuthorizationController, couponCode: string, completion: (p1: PKPaymentRequestCouponCodeUpdate) => void): void;

  paymentAuthorizationControllerDidSelectShippingMethodHandler?(controller: PKPaymentAuthorizationController, shippingMethod: PKShippingMethod, completion: (p1: PKPaymentRequestShippingMethodUpdate) => void): void;

  paymentAuthorizationControllerDidSelectShippingContactHandler?(controller: PKPaymentAuthorizationController, contact: PKContact, completion: (p1: PKPaymentRequestShippingContactUpdate) => void): void;

  paymentAuthorizationControllerDidSelectPaymentMethodHandler?(controller: PKPaymentAuthorizationController, paymentMethod: PKPaymentMethod, completion: (p1: PKPaymentRequestPaymentMethodUpdate) => void): void;

  paymentAuthorizationControllerDidSelectShippingMethodCompletion?(controller: PKPaymentAuthorizationController, shippingMethod: PKShippingMethod, completion: (p1: interop.Enum<typeof PKPaymentAuthorizationStatus>, p2: NSArray<interop.Object> | Array<interop.Object>) => void): void;

  paymentAuthorizationControllerDidSelectShippingContactCompletion?(controller: PKPaymentAuthorizationController, contact: PKContact, completion: (p1: interop.Enum<typeof PKPaymentAuthorizationStatus>, p2: NSArray<interop.Object> | Array<interop.Object>, p3: NSArray<interop.Object> | Array<interop.Object>) => void): void;

  paymentAuthorizationControllerDidSelectPaymentMethodCompletion?(controller: PKPaymentAuthorizationController, paymentMethod: PKPaymentMethod, completion: (p1: NSArray<interop.Object> | Array<interop.Object>) => void): void;

  presentationWindowForPaymentAuthorizationController?(controller: PKPaymentAuthorizationController): UIWindow;
}

declare class PKPaymentAuthorizationControllerDelegate extends NativeObject implements PKPaymentAuthorizationControllerDelegate {
}

declare interface PKPayLaterViewDelegate extends NSObjectProtocol {
  payLaterViewDidUpdateHeight(view: PKPayLaterView): void;
}

declare class PKPayLaterViewDelegate extends NativeObject implements PKPayLaterViewDelegate {
}

declare interface PKPaymentAuthorizationViewControllerDelegate extends NSObjectProtocol {
  paymentAuthorizationViewControllerDidFinish(controller: PKPaymentAuthorizationViewController): void;

  paymentAuthorizationViewControllerDidAuthorizePaymentHandler?(controller: PKPaymentAuthorizationViewController, payment: PKPayment, completion: (p1: PKPaymentAuthorizationResult) => void): void;

  paymentAuthorizationViewControllerWillAuthorizePayment?(controller: PKPaymentAuthorizationViewController): void;

  paymentAuthorizationViewControllerDidRequestMerchantSessionUpdate?(controller: PKPaymentAuthorizationViewController, handler: (p1: PKPaymentRequestMerchantSessionUpdate) => void): void;

  paymentAuthorizationViewControllerDidChangeCouponCodeHandler?(controller: PKPaymentAuthorizationViewController, couponCode: string, completion: (p1: PKPaymentRequestCouponCodeUpdate) => void): void;

  paymentAuthorizationViewControllerDidSelectShippingMethodHandler?(controller: PKPaymentAuthorizationViewController, shippingMethod: PKShippingMethod, completion: (p1: PKPaymentRequestShippingMethodUpdate) => void): void;

  paymentAuthorizationViewControllerDidSelectShippingContactHandler?(controller: PKPaymentAuthorizationViewController, contact: PKContact, completion: (p1: PKPaymentRequestShippingContactUpdate) => void): void;

  paymentAuthorizationViewControllerDidSelectPaymentMethodHandler?(controller: PKPaymentAuthorizationViewController, paymentMethod: PKPaymentMethod, completion: (p1: PKPaymentRequestPaymentMethodUpdate) => void): void;

  paymentAuthorizationViewControllerDidAuthorizePaymentCompletion?(controller: PKPaymentAuthorizationViewController, payment: PKPayment, completion: (p1: interop.Enum<typeof PKPaymentAuthorizationStatus>) => void): void;

  paymentAuthorizationViewControllerDidSelectShippingMethodCompletion?(controller: PKPaymentAuthorizationViewController, shippingMethod: PKShippingMethod, completion: (p1: interop.Enum<typeof PKPaymentAuthorizationStatus>, p2: NSArray<interop.Object> | Array<interop.Object>) => void): void;

  paymentAuthorizationViewControllerDidSelectShippingAddressCompletion?(controller: PKPaymentAuthorizationViewController, address: interop.Object, completion: (p1: interop.Enum<typeof PKPaymentAuthorizationStatus>, p2: NSArray<interop.Object> | Array<interop.Object>, p3: NSArray<interop.Object> | Array<interop.Object>) => void): void;

  paymentAuthorizationViewControllerDidSelectShippingContactCompletion?(controller: PKPaymentAuthorizationViewController, contact: PKContact, completion: (p1: interop.Enum<typeof PKPaymentAuthorizationStatus>, p2: NSArray<interop.Object> | Array<interop.Object>, p3: NSArray<interop.Object> | Array<interop.Object>) => void): void;

  paymentAuthorizationViewControllerDidSelectPaymentMethodCompletion?(controller: PKPaymentAuthorizationViewController, paymentMethod: PKPaymentMethod, completion: (p1: NSArray<interop.Object> | Array<interop.Object>) => void): void;
}

declare class PKPaymentAuthorizationViewControllerDelegate extends NativeObject implements PKPaymentAuthorizationViewControllerDelegate {
}

declare interface PKPaymentInformationRequestHandling {
  handleInformationRequestCompletion(infoRequest: PKBarcodeEventMetadataRequest, completion: (p1: PKBarcodeEventMetadataResponse) => void): void;

  handleSignatureRequestCompletion(signatureRequest: PKBarcodeEventSignatureRequest, completion: (p1: PKBarcodeEventSignatureResponse) => void): void;

  handleConfigurationRequestCompletion(configurationRequest: PKBarcodeEventConfigurationRequest, completion: () => void): void;
}

declare class PKPaymentInformationRequestHandling extends NativeObject implements PKPaymentInformationRequestHandling {
}

declare interface PKAddSecureElementPassViewControllerDelegate extends NSObjectProtocol {
  addSecureElementPassViewControllerDidFinishAddingSecureElementPassError?(controller: PKAddSecureElementPassViewController, pass: PKSecureElementPass | null, error: NSError | null): void;

  addSecureElementPassViewControllerDidFinishAddingSecureElementPassesError(controller: PKAddSecureElementPassViewController, passes: NSArray<interop.Object> | Array<interop.Object> | null, error: NSError | null): void;
}

declare class PKAddSecureElementPassViewControllerDelegate extends NativeObject implements PKAddSecureElementPassViewControllerDelegate {
}

declare interface PKVehicleConnectionDelegate extends NSObjectProtocol {
  sessionDidChangeConnectionState(newState: interop.Enum<typeof PKVehicleConnectionSessionConnectionState>): void;

  sessionDidReceiveData(data: NSData): void;
}

declare class PKVehicleConnectionDelegate extends NativeObject implements PKVehicleConnectionDelegate {
}

declare interface PKAddPaymentPassViewControllerDelegate extends NSObjectProtocol {
  addPaymentPassViewControllerGenerateRequestWithCertificateChainNonceNonceSignatureCompletionHandler(controller: PKAddPaymentPassViewController, certificates: NSArray<interop.Object> | Array<interop.Object>, nonce: NSData, nonceSignature: NSData, handler: (p1: PKAddPaymentPassRequest) => void): void;

  addPaymentPassViewControllerDidFinishAddingPaymentPassError(controller: PKAddPaymentPassViewController, pass: PKPaymentPass | null, error: NSError | null): void;
}

declare class PKAddPaymentPassViewControllerDelegate extends NativeObject implements PKAddPaymentPassViewControllerDelegate {
}

declare interface PKAddPassesViewControllerDelegate extends NSObjectProtocol {
  addPassesViewControllerDidFinish?(controller: PKAddPassesViewController): void;
}

declare class PKAddPassesViewControllerDelegate extends NativeObject implements PKAddPassesViewControllerDelegate {
}

declare class PKIdentityRequest extends NSObject {
  descriptor: PKIdentityDocumentDescriptor;

  nonce: NSData;

  merchantIdentifier: string;

  setDescriptor(descriptor: PKIdentityDocumentDescriptor | null): void;

  setNonce(nonce: NSData | null): void;

  setMerchantIdentifier(merchantIdentifier: string | null): void;
}

declare class PKIdentityIntentToStore extends NSObject implements NSCopying {
  static readonly willNotStoreIntent: PKIdentityIntentToStore;

  static readonly mayStoreIntent: PKIdentityIntentToStore;

  static mayStoreIntentForDays<This extends abstract new (...args: any) => any>(this: This, days: number): InstanceType<This>;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class PKIdentityElement extends NSObject implements NSCopying {
  static readonly givenNameElement: PKIdentityElement;

  static readonly familyNameElement: PKIdentityElement;

  static readonly portraitElement: PKIdentityElement;

  static readonly addressElement: PKIdentityElement;

  static readonly issuingAuthorityElement: PKIdentityElement;

  static readonly documentIssueDateElement: PKIdentityElement;

  static readonly documentExpirationDateElement: PKIdentityElement;

  static readonly documentDHSComplianceStatusElement: PKIdentityElement;

  static readonly documentNumberElement: PKIdentityElement;

  static readonly drivingPrivilegesElement: PKIdentityElement;

  static readonly ageElement: PKIdentityElement;

  static readonly dateOfBirthElement: PKIdentityElement;

  static readonly sexElement: PKIdentityElement;

  static ageThresholdElementWithAge<This extends abstract new (...args: any) => any>(this: This, age: number): InstanceType<This>;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class PKIdentityDriversLicenseDescriptor extends NSObject implements PKIdentityDocumentDescriptor {
  readonly elements: NSArray;

  intentToStoreForElement(element: PKIdentityElement): PKIdentityIntentToStore;

  addElementsWithIntentToStore(elements: NSArray<interop.Object> | Array<interop.Object>, intentToStore: PKIdentityIntentToStore): void;

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

declare class PKIdentityAuthorizationController extends NSObject {
  checkCanRequestDocumentCompletion(descriptor: PKIdentityDocumentDescriptor, completion: (p1: boolean) => void): void;

  requestDocumentCompletion(request: PKIdentityRequest, completion: (p1: PKIdentityDocument, p2: NSError) => void | null): void;

  cancelRequest(): void;
}

declare class PKVehicleConnectionSession extends NSObject {
  readonly delegate: PKVehicleConnectionDelegate | null;

  readonly connectionStatus: interop.Enum<typeof PKVehicleConnectionSessionConnectionState>;

  static sessionForPassDelegateCompletion(pass: PKSecureElementPass, delegate: PKVehicleConnectionDelegate, completion: (p1: PKVehicleConnectionSession, p2: NSError) => void | null): void;

  sendDataError(message: NSData, error: interop.PointerConvertible): boolean;

  invalidate(): void;
}

declare class PKIssuerProvisioningExtensionPassEntry extends NSObject {
  readonly identifier: string;

  readonly title: string;

  readonly art: interop.Object;
}

declare class PKIssuerProvisioningExtensionHandler extends NSObject {
  statusWithCompletion(completion: (p1: PKIssuerProvisioningExtensionStatus) => void): void;

  passEntriesWithCompletion(completion: (p1: NSArray<interop.Object> | Array<interop.Object>) => void): void;

  remotePassEntriesWithCompletion(completion: (p1: NSArray<interop.Object> | Array<interop.Object>) => void): void;

  generateAddPaymentPassRequestForPassEntryWithIdentifierConfigurationCertificateChainNonceNonceSignatureCompletionHandler(identifier: string, configuration: PKAddPaymentPassRequestConfiguration, certificates: NSArray<interop.Object> | Array<interop.Object>, nonce: NSData, nonceSignature: NSData, completion: (p1: PKAddPaymentPassRequest) => void | null): void;
}

declare class PKAddIdentityDocumentConfiguration extends PKAddSecureElementPassConfiguration {
  static configurationForMetadataCompletion(metadata: PKIdentityDocumentMetadata, completion: (p1: PKAddIdentityDocumentConfiguration, p2: NSError) => void | null): void;

  readonly metadata: PKIdentityDocumentMetadata;
}

declare class PKJapanIndividualNumberCardMetadata extends PKIdentityDocumentMetadata {
  initWithProvisioningCredentialIdentifierSharingInstanceIdentifierCardTemplateIdentifierPreview(credentialIdentifier: string, sharingInstanceIdentifier: string, templateIdentifier: string, preview: PKAddPassMetadataPreview): this;

  initWithProvisioningCredentialIdentifierSharingInstanceIdentifierCardConfigurationIdentifierPreview(credentialIdentifier: string, sharingInstanceIdentifier: string, templateIdentifier: string, preview: PKAddPassMetadataPreview): this;

  authenticationPassword: string;

  signingPassword: string;

  preview: PKAddPassMetadataPreview;

  setAuthenticationPassword(authenticationPassword: string | null): void;

  setSigningPassword(signingPassword: string | null): void;

  setPreview(preview: PKAddPassMetadataPreview): void;
}

declare class PKShareablePassMetadata extends NSObject {
  initWithProvisioningCredentialIdentifierCardConfigurationIdentifierSharingInstanceIdentifierPassThumbnailImageOwnerDisplayNameLocalizedDescription(credentialIdentifier: string, cardConfigurationIdentifier: string, sharingInstanceIdentifier: string, passThumbnailImage: interop.Object, ownerDisplayName: string, localizedDescription: string): this;

  initWithProvisioningCredentialIdentifierSharingInstanceIdentifierPassThumbnailImageOwnerDisplayNameLocalizedDescriptionAccountHashTemplateIdentifierRelyingPartyIdentifierRequiresUnifiedAccessCapableDevice(credentialIdentifier: string, sharingInstanceIdentifier: string, passThumbnailImage: interop.Object, ownerDisplayName: string, localizedDescription: string, accountHash: string, templateIdentifier: string, relyingPartyIdentifier: string, requiresUnifiedAccessCapableDevice: boolean): this;

  initWithProvisioningCredentialIdentifierSharingInstanceIdentifierCardTemplateIdentifierPreview(credentialIdentifier: string, sharingInstanceIdentifier: string, templateIdentifier: string, preview: PKShareablePassMetadataPreview): this;

  initWithProvisioningCredentialIdentifierSharingInstanceIdentifierCardConfigurationIdentifierPreview(credentialIdentifier: string, sharingInstanceIdentifier: string, templateIdentifier: string, preview: PKShareablePassMetadataPreview): this;

  readonly credentialIdentifier: string;

  readonly sharingInstanceIdentifier: string;

  readonly templateIdentifier: string;

  readonly cardTemplateIdentifier: string;

  readonly cardConfigurationIdentifier: string;

  requiresUnifiedAccessCapableDevice: boolean;

  serverEnvironmentIdentifier: string;

  readonly preview: PKShareablePassMetadataPreview;

  readonly passThumbnailImage: interop.Object;

  readonly localizedDescription: string;

  readonly ownerDisplayName: string;

  accountHash: string;

  relyingPartyIdentifier: string;

  setRequiresUnifiedAccessCapableDevice(requiresUnifiedAccessCapableDevice: boolean): void;

  setServerEnvironmentIdentifier(serverEnvironmentIdentifier: string): void;

  setAccountHash(accountHash: string): void;

  setRelyingPartyIdentifier(relyingPartyIdentifier: string): void;
}

declare class PKShareablePassMetadataPreview extends PKAddPassMetadataPreview {
  initWithTemplateIdentifier(templateIdentifier: string): this;

  static previewWithTemplateIdentifier<This extends abstract new (...args: any) => any>(this: This, templateIdentifier: string): InstanceType<This>;

  ownerDisplayName: string;

  readonly provisioningTemplateIdentifier: string;

  setOwnerDisplayName(ownerDisplayName: string | null): void;
}

declare class PKPaymentMerchantSession extends NSObject {
  initWithDictionary(dictionary: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): this;
}

declare class PKAddSecureElementPassConfiguration extends NSObject {
  issuerIdentifier: string;

  localizedDescription: string;

  setIssuerIdentifier(issuerIdentifier: string | null): void;

  setLocalizedDescription(localizedDescription: string | null): void;
}

declare class PKAddPassMetadataPreview extends NSObject {
  initWithPassThumbnailLocalizedDescription(passThumbnail: interop.Object, description: string): this;

  static previewWithPassThumbnailLocalizedDescription<This extends abstract new (...args: any) => any>(this: This, passThumbnail: interop.Object, description: string): InstanceType<This>;

  readonly passThumbnailImage: interop.Object;

  readonly localizedDescription: string;
}

declare class PKPaymentInformationEventExtension extends NSObject {
}

declare class PKBarcodeEventSignatureResponse extends NSObject {
  initWithSignedData(signedData: NSData): this;

  signedData: NSData;

  setSignedData(signedData: NSData): void;
}

declare class PKBarcodeEventSignatureRequest extends NSObject {
  readonly deviceAccountIdentifier: string;

  readonly transactionIdentifier: string;

  readonly barcodeIdentifier: string;

  readonly rawMerchantName: string;

  readonly merchantName: string;

  readonly transactionDate: NSDate;

  readonly currencyCode: string;

  readonly amount: NSNumber;

  readonly transactionStatus: string;

  readonly partialSignature: NSData;
}

declare class PKBarcodeEventMetadataResponse extends NSObject {
  initWithPaymentInformation(paymentInformation: NSData): this;

  paymentInformation: NSData;

  setPaymentInformation(paymentInformation: NSData): void;
}

declare class PKBarcodeEventMetadataRequest extends NSObject {
  readonly deviceAccountIdentifier: string;

  readonly lastUsedBarcodeIdentifier: string;
}

declare class PKAddPassesViewController extends UIViewController {
  initWithPass(pass: PKPass): this;

  initWithPasses(passes: NSArray<interop.Object> | Array<interop.Object>): this;

  initWithIssuerDataSignatureError(issuerData: NSData, signature: NSData, error: interop.PointerConvertible): this;

  static canAddPasses(): boolean;

  delegate: PKAddPassesViewControllerDelegate;

  setDelegate(delegate: PKAddPassesViewControllerDelegate | null): void;
}

declare class PKAddPassButton extends UIButton {
  static addPassButtonWithStyle<This extends abstract new (...args: any) => any>(this: This, addPassButtonStyle: interop.Enum<typeof PKAddPassButtonStyle>): InstanceType<This>;

  initWithAddPassButtonStyle(style: interop.Enum<typeof PKAddPassButtonStyle>): this;

  addPassButtonStyle: interop.Enum<typeof PKAddPassButtonStyle>;

  setAddPassButtonStyle(addPassButtonStyle: interop.Enum<typeof PKAddPassButtonStyle>): void;
}

declare class PKPaymentAuthorizationController extends NSObject {
  static canMakePayments(): boolean;

  static canMakePaymentsUsingNetworks(supportedNetworks: NSArray<interop.Object> | Array<interop.Object>): boolean;

  static canMakePaymentsUsingNetworksCapabilities(supportedNetworks: NSArray<interop.Object> | Array<interop.Object>, capabilties: interop.Enum<typeof PKMerchantCapability>): boolean;

  delegate: PKPaymentAuthorizationControllerDelegate;

  initWithPaymentRequest(request: PKPaymentRequest): this;

  presentWithCompletion(completion: (p1: boolean) => void | null): void;

  dismissWithCompletion(completion: () => void | null): void;

  static supportsDisbursements(): boolean;

  static supportsDisbursementsUsingNetworks(supportedNetworks: NSArray<interop.Object> | Array<interop.Object>): boolean;

  static supportsDisbursementsUsingNetworksCapabilities(supportedNetworks: NSArray<interop.Object> | Array<interop.Object>, capabilties: interop.Enum<typeof PKMerchantCapability>): boolean;

  initWithDisbursementRequest(request: PKDisbursementRequest): this;

  setDelegate(delegate: PKPaymentAuthorizationControllerDelegate | null): void;
}

declare class PKPaymentAuthorizationViewController extends UIViewController {
  static canMakePayments(): boolean;

  static canMakePaymentsUsingNetworks(supportedNetworks: NSArray<interop.Object> | Array<interop.Object>): boolean;

  static canMakePaymentsUsingNetworksCapabilities(supportedNetworks: NSArray<interop.Object> | Array<interop.Object>, capabilties: interop.Enum<typeof PKMerchantCapability>): boolean;

  delegate: PKPaymentAuthorizationViewControllerDelegate;

  initWithPaymentRequest(request: PKPaymentRequest): this;

  static supportsDisbursements(): boolean;

  static supportsDisbursementsUsingNetworks(supportedNetworks: NSArray<interop.Object> | Array<interop.Object>): boolean;

  static supportsDisbursementsUsingNetworksCapabilities(supportedNetworks: NSArray<interop.Object> | Array<interop.Object>, capabilities: interop.Enum<typeof PKMerchantCapability>): boolean;

  initWithDisbursementRequest(request: PKDisbursementRequest): this;

  setDelegate(delegate: PKPaymentAuthorizationViewControllerDelegate | null): void;
}

declare class PKPaymentMethod extends NSObject {
  readonly displayName: string;

  readonly network: string;

  readonly type: interop.Enum<typeof PKPaymentMethodType>;

  readonly paymentPass: PKPaymentPass;

  readonly secureElementPass: PKSecureElementPass;

  readonly billingAddress: CNContact;
}

declare class PKPayment extends NSObject {
  readonly token: PKPaymentToken;

  readonly billingContact: PKContact;

  readonly billingAddress: interop.Object;

  readonly shippingContact: PKContact;

  readonly shippingAddress: interop.Object;

  readonly shippingMethod: PKShippingMethod;
}

declare class PKPaymentRequestCouponCodeUpdate extends PKPaymentRequestUpdate {
  initWithErrorsPaymentSummaryItemsShippingMethods(errors: NSArray<interop.Object> | Array<interop.Object> | null, paymentSummaryItems: NSArray<interop.Object> | Array<interop.Object>, shippingMethods: NSArray<interop.Object> | Array<interop.Object>): this;

  get errors(): NSArray;
  set errors(value: NSArray<interop.Object> | Array<interop.Object>);

  setErrors(errors: NSArray<interop.Object> | Array<interop.Object> | null): void;
}

declare class PKPaymentRequestMerchantSessionUpdate extends NSObject {
  initWithStatusMerchantSession(status: interop.Enum<typeof PKPaymentAuthorizationStatus>, session: PKPaymentMerchantSession | null): this;

  status: interop.Enum<typeof PKPaymentAuthorizationStatus>;

  session: PKPaymentMerchantSession;

  setStatus(status: interop.Enum<typeof PKPaymentAuthorizationStatus>): void;

  setSession(session: PKPaymentMerchantSession | null): void;
}

declare class PKPaymentRequestShippingMethodUpdate extends PKPaymentRequestUpdate {
}

declare class PKPaymentRequestShippingContactUpdate extends PKPaymentRequestUpdate {
  initWithErrorsPaymentSummaryItemsShippingMethods(errors: NSArray<interop.Object> | Array<interop.Object> | null, paymentSummaryItems: NSArray<interop.Object> | Array<interop.Object>, shippingMethods: NSArray<interop.Object> | Array<interop.Object>): this;

  get shippingMethods(): NSArray;
  set shippingMethods(value: NSArray<interop.Object> | Array<interop.Object>);

  get errors(): NSArray;
  set errors(value: NSArray<interop.Object> | Array<interop.Object>);

  setShippingMethods(shippingMethods: NSArray<interop.Object> | Array<interop.Object>): void;

  setErrors(errors: NSArray<interop.Object> | Array<interop.Object> | null): void;
}

declare class PKPaymentRequestUpdate extends NSObject {
  initWithPaymentSummaryItems(paymentSummaryItems: NSArray<interop.Object> | Array<interop.Object>): this;

  status: interop.Enum<typeof PKPaymentAuthorizationStatus>;

  get paymentSummaryItems(): NSArray;
  set paymentSummaryItems(value: NSArray<interop.Object> | Array<interop.Object>);

  get shippingMethods(): NSArray;
  set shippingMethods(value: NSArray<interop.Object> | Array<interop.Object>);

  get multiTokenContexts(): NSArray;
  set multiTokenContexts(value: NSArray<interop.Object> | Array<interop.Object>);

  recurringPaymentRequest: PKRecurringPaymentRequest;

  automaticReloadPaymentRequest: PKAutomaticReloadPaymentRequest;

  deferredPaymentRequest: PKDeferredPaymentRequest;

  setStatus(status: interop.Enum<typeof PKPaymentAuthorizationStatus>): void;

  setPaymentSummaryItems(paymentSummaryItems: NSArray<interop.Object> | Array<interop.Object>): void;

  setShippingMethods(shippingMethods: NSArray<interop.Object> | Array<interop.Object>): void;

  setMultiTokenContexts(multiTokenContexts: NSArray<interop.Object> | Array<interop.Object>): void;

  setRecurringPaymentRequest(recurringPaymentRequest: PKRecurringPaymentRequest): void;

  setAutomaticReloadPaymentRequest(automaticReloadPaymentRequest: PKAutomaticReloadPaymentRequest): void;

  setDeferredPaymentRequest(deferredPaymentRequest: PKDeferredPaymentRequest): void;
}

declare class PKPaymentRequest extends NSObject {
  static availableNetworks(): NSArray;

  static paymentContactInvalidErrorWithContactFieldLocalizedDescription(field: string, localizedDescription: string | null): NSError;

  static paymentShippingAddressInvalidErrorWithKeyLocalizedDescription(postalAddressKey: string, localizedDescription: string | null): NSError;

  static paymentBillingAddressInvalidErrorWithKeyLocalizedDescription(postalAddressKey: string, localizedDescription: string | null): NSError;

  static paymentShippingAddressUnserviceableErrorWithLocalizedDescription(localizedDescription: string | null): NSError;

  static paymentCouponCodeInvalidErrorWithLocalizedDescription(localizedDescription: string | null): NSError;

  static paymentCouponCodeExpiredErrorWithLocalizedDescription(localizedDescription: string | null): NSError;

  merchantIdentifier: string;

  countryCode: string;

  get supportedNetworks(): NSArray;
  set supportedNetworks(value: NSArray<interop.Object> | Array<interop.Object>);

  merchantCapabilities: interop.Enum<typeof PKMerchantCapability>;

  supportsCouponCode: boolean;

  couponCode: string;

  merchantCategoryCode: number;

  get paymentSummaryItems(): NSArray;
  set paymentSummaryItems(value: NSArray<interop.Object> | Array<interop.Object>);

  currencyCode: string;

  requiredBillingContactFields: NSSet;

  requiredBillingAddressFields: interop.Enum<typeof PKAddressField>;

  billingContact: PKContact;

  requiredShippingContactFields: NSSet;

  requiredShippingAddressFields: interop.Enum<typeof PKAddressField>;

  shippingContact: PKContact;

  get shippingMethods(): NSArray;
  set shippingMethods(value: NSArray<interop.Object> | Array<interop.Object>);

  shippingType: interop.Enum<typeof PKShippingType>;

  shippingContactEditingMode: interop.Enum<typeof PKShippingContactEditingMode>;

  applicationData: NSData;

  supportedCountries: NSSet;

  shippingAddress: interop.Object;

  billingAddress: interop.Object;

  get multiTokenContexts(): NSArray;
  set multiTokenContexts(value: NSArray<interop.Object> | Array<interop.Object>);

  recurringPaymentRequest: PKRecurringPaymentRequest;

  automaticReloadPaymentRequest: PKAutomaticReloadPaymentRequest;

  deferredPaymentRequest: PKDeferredPaymentRequest;

  applePayLaterAvailability: interop.Enum<typeof PKApplePayLaterAvailability>;

  setMerchantIdentifier(merchantIdentifier: string): void;

  setCountryCode(countryCode: string): void;

  setSupportedNetworks(supportedNetworks: NSArray<interop.Object> | Array<interop.Object>): void;

  setMerchantCapabilities(merchantCapabilities: interop.Enum<typeof PKMerchantCapability>): void;

  setSupportsCouponCode(supportsCouponCode: boolean): void;

  setCouponCode(couponCode: string): void;

  setMerchantCategoryCode(merchantCategoryCode: number): void;

  setPaymentSummaryItems(paymentSummaryItems: NSArray<interop.Object> | Array<interop.Object>): void;

  setCurrencyCode(currencyCode: string): void;

  setRequiredBillingContactFields(requiredBillingContactFields: NSSet): void;

  setRequiredBillingAddressFields(requiredBillingAddressFields: interop.Enum<typeof PKAddressField>): void;

  setBillingContact(billingContact: PKContact | null): void;

  setRequiredShippingContactFields(requiredShippingContactFields: NSSet): void;

  setRequiredShippingAddressFields(requiredShippingAddressFields: interop.Enum<typeof PKAddressField>): void;

  setShippingContact(shippingContact: PKContact | null): void;

  setShippingMethods(shippingMethods: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setShippingType(shippingType: interop.Enum<typeof PKShippingType>): void;

  setShippingContactEditingMode(shippingContactEditingMode: interop.Enum<typeof PKShippingContactEditingMode>): void;

  setApplicationData(applicationData: NSData | null): void;

  setSupportedCountries(supportedCountries: NSSet | null): void;

  setShippingAddress(shippingAddress: interop.Object): void;

  setBillingAddress(billingAddress: interop.Object): void;

  setMultiTokenContexts(multiTokenContexts: NSArray<interop.Object> | Array<interop.Object>): void;

  setRecurringPaymentRequest(recurringPaymentRequest: PKRecurringPaymentRequest): void;

  setAutomaticReloadPaymentRequest(automaticReloadPaymentRequest: PKAutomaticReloadPaymentRequest): void;

  setDeferredPaymentRequest(deferredPaymentRequest: PKDeferredPaymentRequest): void;

  setApplePayLaterAvailability(applePayLaterAvailability: interop.Enum<typeof PKApplePayLaterAvailability>): void;
}

declare class PKDeferredPaymentRequest extends NSObject {
  paymentDescription: string;

  deferredBilling: PKDeferredPaymentSummaryItem;

  billingAgreement: string;

  managementURL: NSURL;

  tokenNotificationURL: NSURL;

  freeCancellationDate: NSDate;

  freeCancellationDateTimeZone: NSTimeZone;

  initWithPaymentDescriptionDeferredBillingManagementURL(paymentDescription: string, deferredBilling: PKDeferredPaymentSummaryItem, managementURL: NSURL): this;

  setPaymentDescription(paymentDescription: string): void;

  setDeferredBilling(deferredBilling: PKDeferredPaymentSummaryItem): void;

  setBillingAgreement(billingAgreement: string | null): void;

  setManagementURL(managementURL: NSURL): void;

  setTokenNotificationURL(tokenNotificationURL: NSURL | null): void;

  setFreeCancellationDate(freeCancellationDate: NSDate | null): void;

  setFreeCancellationDateTimeZone(freeCancellationDateTimeZone: NSTimeZone | null): void;
}

declare class PKRecurringPaymentRequest extends NSObject {
  paymentDescription: string;

  regularBilling: PKRecurringPaymentSummaryItem;

  trialBilling: PKRecurringPaymentSummaryItem;

  billingAgreement: string;

  managementURL: NSURL;

  tokenNotificationURL: NSURL;

  initWithPaymentDescriptionRegularBillingManagementURL(paymentDescription: string, regularBilling: PKRecurringPaymentSummaryItem, managementURL: NSURL): this;

  setPaymentDescription(paymentDescription: string): void;

  setRegularBilling(regularBilling: PKRecurringPaymentSummaryItem): void;

  setTrialBilling(trialBilling: PKRecurringPaymentSummaryItem | null): void;

  setBillingAgreement(billingAgreement: string | null): void;

  setManagementURL(managementURL: NSURL): void;

  setTokenNotificationURL(tokenNotificationURL: NSURL | null): void;
}

declare class PKShippingMethod extends PKPaymentSummaryItem {
  identifier: string;

  detail: string;

  dateComponentsRange: PKDateComponentsRange;

  setIdentifier(identifier: string | null): void;

  setDetail(detail: string | null): void;

  setDateComponentsRange(dateComponentsRange: PKDateComponentsRange | null): void;
}

declare class PKDateComponentsRange extends NSObject implements NSCopying, NSSecureCoding {
  initWithStartDateComponentsEndDateComponents(startDateComponents: NSDateComponents, endDateComponents: NSDateComponents): this;

  readonly startDateComponents: NSDateComponents;

  readonly endDateComponents: NSDateComponents;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class PKRecurringPaymentSummaryItem extends PKPaymentSummaryItem {
  startDate: NSDate;

  intervalUnit: interop.Enum<typeof NSCalendarUnit>;

  intervalCount: number;

  endDate: NSDate;

  setStartDate(startDate: NSDate | null): void;

  setIntervalUnit(intervalUnit: interop.Enum<typeof NSCalendarUnit>): void;

  setIntervalCount(intervalCount: number): void;

  setEndDate(endDate: NSDate | null): void;
}

declare class PKContact extends NSObject {
  name: NSPersonNameComponents;

  postalAddress: CNPostalAddress;

  phoneNumber: CNPhoneNumber;

  emailAddress: string;

  supplementarySubLocality: string;

  setName(name: NSPersonNameComponents | null): void;

  setPostalAddress(postalAddress: CNPostalAddress | null): void;

  setPhoneNumber(phoneNumber: CNPhoneNumber | null): void;

  setEmailAddress(emailAddress: string | null): void;

  setSupplementarySubLocality(supplementarySubLocality: string | null): void;
}

declare class PKObject extends NSObject {
}

declare class PKAddCarKeyPassConfiguration extends PKAddSecureElementPassConfiguration {
  init(): this;

  password: string;

  supportedRadioTechnologies: interop.Enum<typeof PKRadioTechnology>;

  manufacturerIdentifier: string;

  provisioningTemplateIdentifier: string;

  setPassword(password: string): void;

  setSupportedRadioTechnologies(supportedRadioTechnologies: interop.Enum<typeof PKRadioTechnology>): void;

  setManufacturerIdentifier(manufacturerIdentifier: string): void;

  setProvisioningTemplateIdentifier(provisioningTemplateIdentifier: string | null): void;
}

declare class PKSecureElementPass extends PKPass {
  readonly primaryAccountIdentifier: string;

  readonly primaryAccountNumberSuffix: string;

  readonly deviceAccountIdentifier: string;

  readonly deviceAccountNumberSuffix: string;

  readonly passActivationState: interop.Enum<typeof PKSecureElementPassActivationState>;

  readonly devicePassIdentifier: string;

  readonly pairedTerminalIdentifier: string;
}

declare class PKPaymentRequestPaymentMethodUpdate extends PKPaymentRequestUpdate {
  initWithErrorsPaymentSummaryItems(errors: NSArray<interop.Object> | Array<interop.Object> | null, paymentSummaryItems: NSArray<interop.Object> | Array<interop.Object>): this;

  get errors(): NSArray;
  set errors(value: NSArray<interop.Object> | Array<interop.Object>);

  setErrors(errors: NSArray<interop.Object> | Array<interop.Object> | null): void;
}

declare class PKAddShareablePassConfiguration extends PKAddSecureElementPassConfiguration {
  static configurationForPassMetadataProvisioningPolicyIdentifierPrimaryActionCompletion(passMetadata: NSArray<interop.Object> | Array<interop.Object>, provisioningPolicyIdentifier: string, action: interop.Enum<typeof PKAddShareablePassConfigurationPrimaryAction>, completion: (p1: PKAddShareablePassConfiguration, p2: NSError) => void | null): void;

  static configurationForPassMetadataPrimaryActionCompletion(passMetadata: NSArray<interop.Object> | Array<interop.Object>, action: interop.Enum<typeof PKAddShareablePassConfigurationPrimaryAction>, completion: (p1: PKAddShareablePassConfiguration, p2: NSError) => void | null): void;

  readonly primaryAction: interop.Enum<typeof PKAddShareablePassConfigurationPrimaryAction>;

  readonly credentialsMetadata: NSArray;

  readonly provisioningPolicyIdentifier: string;
}

declare class PKSuicaPassProperties extends PKTransitPassProperties {
  static passPropertiesForPass<This extends abstract new (...args: any) => any>(this: This, pass: PKPass): InstanceType<This>;

  readonly transitBalance: NSDecimalNumber;

  readonly transitBalanceCurrencyCode: string;

  readonly inStation: boolean;

  readonly inShinkansenStation: boolean;

  readonly balanceAllowedForCommute: boolean;

  readonly lowBalanceGateNotificationEnabled: boolean;

  readonly greenCarTicketUsed: boolean;

  readonly blacklisted: boolean;

  isInStation(): boolean;

  isInShinkansenStation(): boolean;

  isBalanceAllowedForCommute(): boolean;

  isLowBalanceGateNotificationEnabled(): boolean;

  isGreenCarTicketUsed(): boolean;

  isBlacklisted(): boolean;
}

declare class PKLabeledValue extends NSObject {
  initWithLabelValue(label: string, value: string): this;

  readonly label: string;

  readonly value: string;
}

declare class PKAutomaticReloadPaymentRequest extends NSObject {
  paymentDescription: string;

  automaticReloadBilling: PKAutomaticReloadPaymentSummaryItem;

  billingAgreement: string;

  managementURL: NSURL;

  tokenNotificationURL: NSURL;

  initWithPaymentDescriptionAutomaticReloadBillingManagementURL(paymentDescription: string, automaticReloadBilling: PKAutomaticReloadPaymentSummaryItem, managementURL: NSURL): this;

  setPaymentDescription(paymentDescription: string): void;

  setAutomaticReloadBilling(automaticReloadBilling: PKAutomaticReloadPaymentSummaryItem): void;

  setBillingAgreement(billingAgreement: string | null): void;

  setManagementURL(managementURL: NSURL): void;

  setTokenNotificationURL(tokenNotificationURL: NSURL | null): void;
}

declare class PKInstantFundsOutFeeSummaryItem extends PKPaymentSummaryItem {
}

declare class PKPaymentPass extends PKSecureElementPass {
  readonly activationState: interop.Enum<typeof PKPaymentPassActivationState>;
}

declare class PKIdentityButton extends UIControl {
  static buttonWithLabelStyle<This extends abstract new (...args: any) => any>(this: This, label: interop.Enum<typeof PKIdentityButtonLabel>, style: interop.Enum<typeof PKIdentityButtonStyle>): InstanceType<This>;

  initWithLabelStyle(label: interop.Enum<typeof PKIdentityButtonLabel>, style: interop.Enum<typeof PKIdentityButtonStyle>): this;

  cornerRadius: number;

  setCornerRadius(cornerRadius: number): void;
}

declare class PKIdentityDocument extends NSObject {
  readonly encryptedData: NSData;
}

declare class PKAddPaymentPassRequestConfiguration extends NSObject {
  initWithEncryptionScheme(encryptionScheme: string): this;

  readonly encryptionScheme: string;

  style: interop.Enum<typeof PKAddPaymentPassStyle>;

  cardholderName: string;

  primaryAccountSuffix: string;

  get cardDetails(): NSArray;
  set cardDetails(value: NSArray<interop.Object> | Array<interop.Object>);

  localizedDescription: string;

  primaryAccountIdentifier: string;

  paymentNetwork: string;

  productIdentifiers: NSSet;

  requiresFelicaSecureElement: boolean;

  setStyle(style: interop.Enum<typeof PKAddPaymentPassStyle>): void;

  setCardholderName(cardholderName: string | null): void;

  setPrimaryAccountSuffix(primaryAccountSuffix: string | null): void;

  setCardDetails(cardDetails: NSArray<interop.Object> | Array<interop.Object>): void;

  setLocalizedDescription(localizedDescription: string | null): void;

  setPrimaryAccountIdentifier(primaryAccountIdentifier: string | null): void;

  setPaymentNetwork(paymentNetwork: string | null): void;

  setProductIdentifiers(productIdentifiers: NSSet): void;

  setRequiresFelicaSecureElement(requiresFelicaSecureElement: boolean): void;
}

declare class PKStoredValuePassProperties extends NSObject {
  static passPropertiesForPass<This extends abstract new (...args: any) => any>(this: This, pass: PKPass): InstanceType<This>;

  readonly blacklisted: boolean;

  readonly blocked: boolean;

  readonly expirationDate: NSDate;

  readonly balances: NSArray;

  isBlacklisted(): boolean;

  isBlocked(): boolean;
}

declare class PKIssuerProvisioningExtensionPaymentPassEntry extends PKIssuerProvisioningExtensionPassEntry {
  initWithIdentifierTitleArtAddRequestConfiguration(identifier: string, title: string, art: interop.Object, configuration: PKAddPaymentPassRequestConfiguration): this;

  readonly addRequestConfiguration: PKAddPaymentPassRequestConfiguration;
}

declare class PKAddPaymentPassRequest extends NSObject {
  init(): this;

  encryptedPassData: NSData;

  activationData: NSData;

  ephemeralPublicKey: NSData;

  wrappedKey: NSData;

  setEncryptedPassData(encryptedPassData: NSData | null): void;

  setActivationData(activationData: NSData | null): void;

  setEphemeralPublicKey(ephemeralPublicKey: NSData | null): void;

  setWrappedKey(wrappedKey: NSData | null): void;
}

declare class PKAddSecureElementPassViewController extends UIViewController {
  static canAddSecureElementPassWithConfiguration(configuration: PKAddSecureElementPassConfiguration): boolean;

  initWithConfigurationDelegate(configuration: PKAddSecureElementPassConfiguration, delegate: PKAddSecureElementPassViewControllerDelegate | null): this;

  delegate: PKAddSecureElementPassViewControllerDelegate;

  setDelegate(delegate: PKAddSecureElementPassViewControllerDelegate | null): void;
}

declare class PKTransitPassProperties extends PKStoredValuePassProperties {
  readonly transitBalance: NSDecimalNumber;

  readonly transitBalanceCurrencyCode: string;

  readonly blacklisted: boolean;

  readonly expirationDate: NSDate;

  readonly blocked: boolean;

  readonly inStation: boolean;

  isBlacklisted(): boolean;

  isBlocked(): boolean;

  isInStation(): boolean;
}

declare class PKPassLibrary extends NSObject {
  static isPassLibraryAvailable(): boolean;

  static requestAutomaticPassPresentationSuppressionWithResponseHandler(responseHandler: (p1: interop.Enum<typeof PKAutomaticPassPresentationSuppressionResult>) => void): number;

  static endAutomaticPassPresentationSuppressionWithRequestToken(requestToken: number): void;

  static isSuppressingAutomaticPassPresentation(): boolean;

  static isPaymentPassActivationAvailable(): boolean;

  isPaymentPassActivationAvailable(): boolean;

  readonly secureElementPassActivationAvailable: boolean;

  passes(): NSArray;

  passWithPassTypeIdentifierSerialNumber(identifier: string, serialNumber: string): PKPass;

  passesWithReaderIdentifier(readerIdentifier: string): NSSet;

  passesOfType(passType: interop.Enum<typeof PKPassType>): NSArray;

  remotePaymentPasses(): NSArray;

  readonly remoteSecureElementPasses: NSArray;

  removePass(pass: PKPass): void;

  containsPass(pass: PKPass): boolean;

  replacePassWithPass(pass: PKPass): boolean;

  addPassesWithCompletionHandler(passes: NSArray<interop.Object> | Array<interop.Object>, completion: (p1: interop.Enum<typeof PKPassLibraryAddPassesStatus>) => void | null): void;

  openPaymentSetup(): void;

  presentPaymentPass(pass: PKPaymentPass): void;

  presentSecureElementPass(pass: PKSecureElementPass): void;

  canAddPaymentPassWithPrimaryAccountIdentifier(primaryAccountIdentifier: string): boolean;

  canAddSecureElementPassWithPrimaryAccountIdentifier(primaryAccountIdentifier: string): boolean;

  canAddFelicaPass(): boolean;

  activatePaymentPassWithActivationDataCompletion(paymentPass: PKPaymentPass, activationData: NSData, completion: (p1: boolean, p2: NSError) => void | null): void;

  activatePaymentPassWithActivationCodeCompletion(paymentPass: PKPaymentPass, activationCode: string, completion: (p1: boolean, p2: NSError) => void | null): void;

  activateSecureElementPassWithActivationDataCompletion(secureElementPass: PKSecureElementPass, activationData: NSData, completion: (p1: boolean, p2: NSError) => void | null): void;

  signDataWithSecureElementPassCompletion(signData: NSData, secureElementPass: PKSecureElementPass, completion: (p1: NSData, p2: NSData, p3: NSError) => void | null): void;

  encryptedServiceProviderDataForSecureElementPassCompletion(secureElementPass: PKSecureElementPass, completion: (p1: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, p2: NSError) => void | null): void;

  serviceProviderDataForSecureElementPassCompletion(secureElementPass: PKSecureElementPass, completion: (p1: NSData, p2: NSError) => void | null): void;

  isSecureElementPassActivationAvailable(): boolean;
}

declare class PKAutomaticReloadPaymentSummaryItem extends PKPaymentSummaryItem {
  thresholdAmount: NSDecimalNumber;

  setThresholdAmount(thresholdAmount: NSDecimalNumber): void;
}

declare class PKStoredValuePassBalance extends NSObject {
  readonly amount: NSDecimalNumber;

  readonly currencyCode: string;

  readonly balanceType: string;

  readonly expiryDate: NSDate;

  isEqualToBalance(balance: PKStoredValuePassBalance): boolean;
}

declare class PKIdentityNationalIDCardDescriptor extends NSObject implements PKIdentityDocumentDescriptor {
  regionCode: string;

  setRegionCode(regionCode: string): void;

  readonly elements: NSArray;

  intentToStoreForElement(element: PKIdentityElement): PKIdentityIntentToStore;

  addElementsWithIntentToStore(elements: NSArray<interop.Object> | Array<interop.Object>, intentToStore: PKIdentityIntentToStore): void;

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

declare class PKShareSecureElementPassViewController extends UIViewController {
  initWithSecureElementPassDelegate(pass: PKSecureElementPass, delegate: PKShareSecureElementPassViewControllerDelegate | null): this;

  delegate: PKShareSecureElementPassViewControllerDelegate;

  promptToShareURL: boolean;

  setDelegate(delegate: PKShareSecureElementPassViewControllerDelegate | null): void;

  setPromptToShareURL(promptToShareURL: boolean): void;
}

declare class PKIdentityDocumentMetadata extends NSObject {
  readonly credentialIdentifier: string;

  readonly sharingInstanceIdentifier: string;

  readonly cardTemplateIdentifier: string;

  readonly cardConfigurationIdentifier: string;

  serverEnvironmentIdentifier: string;

  setServerEnvironmentIdentifier(serverEnvironmentIdentifier: string): void;
}

declare class PKPaymentTokenContext extends NSObject {
  merchantIdentifier: string;

  externalIdentifier: string;

  merchantName: string;

  merchantDomain: string;

  amount: NSDecimalNumber;

  initWithMerchantIdentifierExternalIdentifierMerchantNameMerchantDomainAmount(merchantIdentifier: string, externalIdentifier: string, merchantName: string, merchantDomain: string | null, amount: NSDecimalNumber): this;

  setMerchantIdentifier(merchantIdentifier: string): void;

  setExternalIdentifier(externalIdentifier: string): void;

  setMerchantName(merchantName: string): void;

  setMerchantDomain(merchantDomain: string | null): void;

  setAmount(amount: NSDecimalNumber): void;
}

declare class PKBarcodeEventConfigurationRequest extends NSObject {
  readonly deviceAccountIdentifier: string;

  readonly configurationData: NSData;

  readonly configurationDataType: interop.Enum<typeof PKBarcodeEventConfigurationDataType>;
}

declare class PKDisbursementSummaryItem extends PKPaymentSummaryItem {
}

declare class PKDeferredPaymentSummaryItem extends PKPaymentSummaryItem {
  deferredDate: NSDate;

  setDeferredDate(deferredDate: NSDate): void;
}

declare class PKPaymentAuthorizationResult extends NSObject {
  initWithStatusErrors(status: interop.Enum<typeof PKPaymentAuthorizationStatus>, errors: NSArray<interop.Object> | Array<interop.Object> | null): this;

  status: interop.Enum<typeof PKPaymentAuthorizationStatus>;

  get errors(): NSArray;
  set errors(value: NSArray<interop.Object> | Array<interop.Object>);

  orderDetails: PKPaymentOrderDetails;

  setStatus(status: interop.Enum<typeof PKPaymentAuthorizationStatus>): void;

  setErrors(errors: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setOrderDetails(orderDetails: PKPaymentOrderDetails): void;
}

declare class PKPaymentSummaryItem extends NSObject {
  static summaryItemWithLabelAmount<This extends abstract new (...args: any) => any>(this: This, label: string, amount: NSDecimalNumber): InstanceType<This>;

  static summaryItemWithLabelAmountType<This extends abstract new (...args: any) => any>(this: This, label: string, amount: NSDecimalNumber, type: interop.Enum<typeof PKPaymentSummaryItemType>): InstanceType<This>;

  label: string;

  amount: NSDecimalNumber;

  type: interop.Enum<typeof PKPaymentSummaryItemType>;

  setLabel(label: string): void;

  setAmount(amount: NSDecimalNumber): void;

  setType(type: interop.Enum<typeof PKPaymentSummaryItemType>): void;
}

declare class PKAddPaymentPassViewController extends UIViewController {
  static canAddPaymentPass(): boolean;

  initWithRequestConfigurationDelegate(configuration: PKAddPaymentPassRequestConfiguration, delegate: PKAddPaymentPassViewControllerDelegate | null): this;

  delegate: PKAddPaymentPassViewControllerDelegate;

  setDelegate(delegate: PKAddPaymentPassViewControllerDelegate | null): void;
}

declare class PKPaymentButton extends UIButton {
  static buttonWithTypeStyle<This extends abstract new (...args: any) => any>(this: This, buttonType: interop.Enum<typeof PKPaymentButtonType>, buttonStyle: interop.Enum<typeof PKPaymentButtonStyle>): InstanceType<This>;

  initWithPaymentButtonTypePaymentButtonStyle(type: interop.Enum<typeof PKPaymentButtonType>, style: interop.Enum<typeof PKPaymentButtonStyle>): this;

  cornerRadius: number;

  setCornerRadius(cornerRadius: number): void;
}

declare class PKIssuerProvisioningExtensionStatus extends NSObject {
  init(): this;

  requiresAuthentication: boolean;

  passEntriesAvailable: boolean;

  remotePassEntriesAvailable: boolean;

  setRequiresAuthentication(requiresAuthentication: boolean): void;

  setPassEntriesAvailable(passEntriesAvailable: boolean): void;

  setRemotePassEntriesAvailable(remotePassEntriesAvailable: boolean): void;
}

declare class PKPaymentToken extends NSObject {
  readonly paymentMethod: PKPaymentMethod;

  readonly paymentInstrumentName: string;

  readonly paymentNetwork: string;

  readonly transactionIdentifier: string;

  readonly paymentData: NSData;
}

declare class PKPayLaterView extends UIView {
  initWithAmountCurrencyCode(amount: NSDecimalNumber, currencyCode: string): this;

  delegate: PKPayLaterViewDelegate;

  amount: NSDecimalNumber;

  currencyCode: string;

  displayStyle: interop.Enum<typeof PKPayLaterDisplayStyle>;

  action: interop.Enum<typeof PKPayLaterAction>;

  setDelegate(delegate: PKPayLaterViewDelegate): void;

  setAmount(amount: NSDecimalNumber): void;

  setCurrencyCode(currencyCode: string): void;

  setDisplayStyle(displayStyle: interop.Enum<typeof PKPayLaterDisplayStyle>): void;

  setAction(action: interop.Enum<typeof PKPayLaterAction>): void;
}

declare class PKPaymentOrderDetails extends NSObject {
  initWithOrderTypeIdentifierOrderIdentifierWebServiceURLAuthenticationToken(orderTypeIdentifier: string, orderIdentifier: string, webServiceURL: NSURL, authenticationToken: string): this;

  orderTypeIdentifier: string;

  orderIdentifier: string;

  webServiceURL: NSURL;

  authenticationToken: string;

  setOrderTypeIdentifier(orderTypeIdentifier: string): void;

  setOrderIdentifier(orderIdentifier: string): void;

  setWebServiceURL(webServiceURL: NSURL): void;

  setAuthenticationToken(authenticationToken: string): void;
}

declare class PKPass extends PKObject {
  initWithDataError(data: NSData, error: interop.PointerConvertible): this;

  readonly passType: interop.Enum<typeof PKPassType>;

  readonly paymentPass: PKPaymentPass;

  readonly secureElementPass: PKSecureElementPass;

  readonly serialNumber: string;

  readonly passTypeIdentifier: string;

  readonly webServiceURL: NSURL;

  readonly authenticationToken: string;

  readonly icon: UIImage;

  readonly localizedName: string;

  readonly localizedDescription: string;

  readonly organizationName: string;

  readonly relevantDate: NSDate;

  readonly relevantDates: NSArray;

  readonly userInfo: NSDictionary;

  readonly passURL: NSURL;

  readonly remotePass: boolean;

  readonly deviceName: string;

  localizedValueForFieldKey(key: string): interop.Object;

  isRemotePass(): boolean;
}

declare class PKDisbursementRequest extends NSObject {
  merchantIdentifier: string;

  regionCode: string;

  get supportedNetworks(): NSArray;
  set supportedNetworks(value: NSArray<interop.Object> | Array<interop.Object>);

  merchantCapabilities: interop.Enum<typeof PKMerchantCapability>;

  get summaryItems(): NSArray;
  set summaryItems(value: NSArray<interop.Object> | Array<interop.Object>);

  currencyCode: string;

  get requiredRecipientContactFields(): NSArray;
  set requiredRecipientContactFields(value: NSArray<interop.Object> | Array<interop.Object>);

  recipientContact: PKContact;

  get supportedRegions(): NSArray;
  set supportedRegions(value: NSArray<interop.Object> | Array<interop.Object>);

  applicationData: NSData;

  initWithMerchantIdentifierCurrencyCodeRegionCodeSupportedNetworksMerchantCapabilitiesSummaryItems(merchantIdentifier: string, currencyCode: string, regionCode: string, supportedNetworks: NSArray<interop.Object> | Array<interop.Object>, merchantCapabilities: interop.Enum<typeof PKMerchantCapability>, summaryItems: NSArray<interop.Object> | Array<interop.Object>): this;

  static disbursementContactInvalidErrorWithContactFieldLocalizedDescription(field: string, localizedDescription: string | null): NSError;

  static disbursementCardUnsupportedError(): NSError;

  setMerchantIdentifier(merchantIdentifier: string): void;

  setRegionCode(regionCode: string): void;

  setSupportedNetworks(supportedNetworks: NSArray<interop.Object> | Array<interop.Object>): void;

  setMerchantCapabilities(merchantCapabilities: interop.Enum<typeof PKMerchantCapability>): void;

  setSummaryItems(summaryItems: NSArray<interop.Object> | Array<interop.Object>): void;

  setCurrencyCode(currencyCode: string): void;

  setRequiredRecipientContactFields(requiredRecipientContactFields: NSArray<interop.Object> | Array<interop.Object>): void;

  setRecipientContact(recipientContact: PKContact | null): void;

  setSupportedRegions(supportedRegions: NSArray<interop.Object> | Array<interop.Object>): void;

  setApplicationData(applicationData: NSData | null): void;
}


/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Foundation.d.ts" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./AppKit.d.ts" />

declare const ASAuthorizationProviderExtensionSigningAlgorithmEd25519: NSNumber;

declare const ASAuthorizationProviderExtensionSigningAlgorithmES384: NSNumber;

declare const ASAuthorizationProviderExtensionSigningAlgorithmES256: NSNumber;

declare const ASAuthorizationProviderExtensionEncryptionAlgorithmHPKE_P256_SHA256_AES_GCM_256: NSNumber;

declare const ASAuthorizationSecurityKeyPublicKeyCredentialDescriptorTransportUSB: string;

declare const ASCOSEAlgorithmIdentifierES256: number;

declare const ASAuthorizationPublicKeyCredentialResidentKeyPreferencePreferred: string;

declare const ASAuthorizationPublicKeyCredentialAttestationKindDirect: string;

declare const ASAuthorizationPublicKeyCredentialUserVerificationPreferenceDiscouraged: string;

declare const ASAuthorizationErrorDomain: string;

declare const ASAuthorizationAppleIDProviderCredentialRevokedNotification: string;

declare const ASAuthorizationOperationLogout: string;

declare const ASAuthorizationOperationRefresh: string;

declare const ASAuthorizationScopeEmail: string;

declare const ASAuthorizationScopeFullName: string;

declare const ASAuthorizationSecurityKeyPublicKeyCredentialDescriptorTransportBluetooth: string;

declare const ASAuthorizationPublicKeyCredentialAttestationKindNone: string;

declare const ASWebAuthenticationSessionErrorDomain: string;

declare const ASAuthorizationProviderAuthorizationOperationDirectRequest: string;

declare const ASAuthorizationPublicKeyCredentialAttestationKindEnterprise: string;

declare const ASAuthorizationPublicKeyCredentialUserVerificationPreferencePreferred: string;

declare const ASAuthorizationProviderAuthorizationOperationConfigurationRemoved: string;

declare const ASAuthorizationPublicKeyCredentialUserVerificationPreferenceRequired: string;

declare const ASAuthorizationPublicKeyCredentialAttestationKindIndirect: string;

declare const ASAuthorizationProviderExtensionEncryptionAlgorithmHPKE_P384_SHA384_AES_GCM_256: NSNumber;

declare const ASAuthorizationOperationImplicit: string;

declare const ASAuthorizationProviderExtensionEncryptionAlgorithmECDHE_A256GCM: NSNumber;

declare const ASAuthorizationSecurityKeyPublicKeyCredentialDescriptorTransportNFC: string;

declare const ASAuthorizationPublicKeyCredentialResidentKeyPreferenceDiscouraged: string;

declare const ASAuthorizationProviderExtensionEncryptionAlgorithmHPKE_Curve25519_SHA256_ChachaPoly: NSNumber;

declare const ASAuthorizationPublicKeyCredentialResidentKeyPreferenceRequired: string;

declare const ASCOSEEllipticCurveIdentifierP256: number;

declare const ASExtensionErrorDomain: string;

declare const ASCredentialIdentityStoreErrorDomain: string;

declare const ASAuthorizationOperationLogin: string;

declare const ASAuthorizationProviderExtensionPlatformSSOProtocolVersion: {
  Version1_0: 0,
  Version2_0: 1,
};

declare const ASAuthorizationProviderExtensionAuthenticationMethod: {
  Password: 1,
  UserSecureEnclaveKey: 2,
  SmartCard: 3,
};

declare const ASAuthorizationProviderExtensionKeyType: {
  UserDeviceSigning: 1,
  UserDeviceEncryption: 2,
  UserSecureEnclaveKey: 3,
  SharedDeviceSigning: 4,
  SharedDeviceEncryption: 5,
  CurrentDeviceSigning: 10,
  CurrentDeviceEncryption: 11,
  UserSmartCard: 20,
};

declare const ASAuthorizationPlatformPublicKeyCredentialRegistrationRequestStyle: {
  Standard: 0,
  Conditional: 1,
};

declare const ASAuthorizationPublicKeyCredentialLargeBlobAssertionOperation: {
  Read: 0,
  Write: 1,
};

declare const ASAuthorizationAppleIDButtonStyle: {
  White: 0,
  WhiteOutline: 1,
  Black: 2,
};

declare const ASCredentialRequestType: {
  Password: 0,
  PasskeyAssertion: 1,
  PasskeyRegistration: 2,
  OneTimeCode: 3,
};

declare const ASAuthorizationControllerRequestOptions: {
  ASAuthorizationControllerRequestOptionPreferImmediatelyAvailableCredentials: 1,
};

declare const ASCredentialServiceIdentifierType: {
  Domain: 0,
  URL: 1,
};

declare const ASCredentialIdentityTypes: {
  All: 0,
  Password: 1,
  Passkey: 2,
  OneTimeCode: 4,
};

declare const ASWebAuthenticationSessionErrorCode: {
  CanceledLogin: 1,
  PresentationContextNotProvided: 2,
  PresentationContextInvalid: 3,
};

declare const ASUserDetectionStatus: {
  Unsupported: 0,
  Unknown: 1,
  LikelyReal: 2,
};

declare const ASAuthorizationPublicKeyCredentialLargeBlobSupportRequirement: {
  Required: 0,
  Preferred: 1,
};

declare const ASAuthorizationProviderExtensionRequestOptions: {
  None: 0,
  UserInteractionEnabled: 1,
  RegistrationRepair: 2,
  RegistrationSharedDeviceKeys: 4,
  RegistrationDeviceKeyMigration: 8,
  StrongerKeyAvailable: 16,
  UserKeyInvalid: 32,
};

declare const ASAuthorizationAppleIDProviderCredentialState: {
  Revoked: 0,
  Authorized: 1,
  NotFound: 2,
  Transferred: 3,
};

declare const ASUserAgeRange: {
  Unknown: 0,
  Child: 1,
  NotChild: 2,
};

declare const ASExtensionErrorCode: {
  Failed: 0,
  UserCanceled: 1,
  UserInteractionRequired: 100,
  CredentialIdentityNotFound: 101,
  MatchedExcludedCredential: 102,
};

declare const ASAuthorizationProviderExtensionRegistrationResult: {
  Success: 0,
  Failed: 1,
  UserInterfaceRequired: 2,
  FailedNoRetry: 3,
};

declare const ASAuthorizationAppleIDButtonType: {
  SignIn: 0,
  Continue: 1,
  SignUp: 2,
  Default: 0,
};

declare const ASAuthorizationWebBrowserPublicKeyCredentialManagerAuthorizationState: {
  Authorized: 0,
  Denied: 1,
  NotDetermined: 2,
};

declare const ASAuthorizationError: {
  Unknown: 1000,
  Canceled: 1001,
  InvalidResponse: 1002,
  NotHandled: 1003,
  Failed: 1004,
  NotInteractive: 1005,
  MatchedExcludedCredential: 1006,
  CredentialImport: 1007,
  CredentialExport: 1008,
};

declare const ASAuthorizationProviderExtensionUserSecureEnclaveKeyBiometricPolicy: {
  None: 0,
  TouchIDOrWatchCurrentSet: 1,
  TouchIDOrWatchAny: 2,
  ReuseDuringUnlock: 4,
  PasswordFallback: 8,
};

declare const ASAuthorizationProviderExtensionSupportedGrantTypes: {
  None: 0,
  Password: 1,
  JWTBearer: 2,
  SAML1_1: 4,
  SAML2_0: 8,
};

declare const ASCredentialIdentityStoreErrorCode: {
  InternalError: 0,
  StoreDisabled: 1,
  StoreBusy: 2,
};

declare const ASPublicKeyCredentialClientDataCrossOriginValue: {
  NotSet: 0,
  CrossOrigin: 1,
  SameOriginWithAncestors: 2,
};

declare const ASAuthorizationProviderExtensionFederationType: {
  None: 0,
  WSTrust: 1,
  DynamicWSTrust: 2,
};

declare const ASAuthorizationPublicKeyCredentialAttachment: {
  ASAuthorizationPublicKeyCredentialAttachmentPlatform: 0,
  Cross: 1,
};

declare function ASAuthorizationAllSupportedPublicKeyCredentialDescriptorTransports(): NSArray;

declare interface ASAuthorizationProviderExtensionRegistrationHandler extends NSObjectProtocol {
  beginDeviceRegistrationUsingLoginManagerOptionsCompletion(loginManager: ASAuthorizationProviderExtensionLoginManager, options: interop.Enum<typeof ASAuthorizationProviderExtensionRequestOptions>, completion: (p1: interop.Enum<typeof ASAuthorizationProviderExtensionRegistrationResult>) => void): void;

  beginUserRegistrationUsingLoginManagerUserNameAuthenticationMethodOptionsCompletion(loginManager: ASAuthorizationProviderExtensionLoginManager, userName: string | null, authenticationMethod: interop.Enum<typeof ASAuthorizationProviderExtensionAuthenticationMethod>, options: interop.Enum<typeof ASAuthorizationProviderExtensionRequestOptions>, completion: (p1: interop.Enum<typeof ASAuthorizationProviderExtensionRegistrationResult>) => void): void;

  registrationDidComplete?(): void;

  registrationDidCancel?(): void;

  supportedGrantTypes?(): interop.Enum<typeof ASAuthorizationProviderExtensionSupportedGrantTypes>;

  protocolVersion?(): interop.Enum<typeof ASAuthorizationProviderExtensionPlatformSSOProtocolVersion>;

  readonly supportedDeviceSigningAlgorithms?: NSArray;

  readonly supportedDeviceEncryptionAlgorithms?: NSArray;

  readonly supportedUserSecureEnclaveKeySigningAlgorithms?: NSArray;

  keyWillRotateForKeyTypeNewKeyLoginManagerCompletion?(keyType: interop.Enum<typeof ASAuthorizationProviderExtensionKeyType>, newKey: interop.Object, loginManager: ASAuthorizationProviderExtensionLoginManager, completion: (p1: boolean) => void): void;
}

declare class ASAuthorizationProviderExtensionRegistrationHandler extends NativeObject implements ASAuthorizationProviderExtensionRegistrationHandler {
}

declare interface ASAuthorizationWebBrowserSecurityKeyPublicKeyCredentialRegistrationRequest {
  readonly clientData: ASPublicKeyCredentialClientData;
}

declare class ASAuthorizationWebBrowserSecurityKeyPublicKeyCredentialRegistrationRequest extends NativeObject implements ASAuthorizationWebBrowserSecurityKeyPublicKeyCredentialRegistrationRequest {
}

declare interface ASAuthorizationWebBrowserSecurityKeyPublicKeyCredentialProvider {
  createCredentialRegistrationRequestWithClientDataDisplayNameNameUserID(clientData: ASPublicKeyCredentialClientData, displayName: string, name: string, userID: NSData): ASAuthorizationSecurityKeyPublicKeyCredentialRegistrationRequest;

  createCredentialAssertionRequestWithClientData(clientData: ASPublicKeyCredentialClientData): ASAuthorizationSecurityKeyPublicKeyCredentialAssertionRequest;
}

declare class ASAuthorizationWebBrowserSecurityKeyPublicKeyCredentialProvider extends NativeObject implements ASAuthorizationWebBrowserSecurityKeyPublicKeyCredentialProvider {
}

declare interface ASAuthorizationWebBrowserSecurityKeyPublicKeyCredentialAssertionRequest {
  readonly clientData: ASPublicKeyCredentialClientData;
}

declare class ASAuthorizationWebBrowserSecurityKeyPublicKeyCredentialAssertionRequest extends NativeObject implements ASAuthorizationWebBrowserSecurityKeyPublicKeyCredentialAssertionRequest {
}

declare interface ASAuthorizationWebBrowserExternallyAuthenticatableRequest extends NSObjectProtocol {
  authenticatedContext: LAContext;

  setAuthenticatedContext(authenticatedContext: LAContext | null): void;
}

declare class ASAuthorizationWebBrowserExternallyAuthenticatableRequest extends NativeObject implements ASAuthorizationWebBrowserExternallyAuthenticatableRequest {
}

declare interface ASAuthorizationPublicKeyCredentialAssertionRequest extends NSObjectProtocol, NSSecureCoding, NSCopying {
  challenge: NSData;

  relyingPartyIdentifier: string;

  get allowedCredentials(): NSArray;
  set allowedCredentials(value: NSArray<interop.Object> | Array<interop.Object>);

  userVerificationPreference: string;

  setChallenge(challenge: NSData): void;

  setRelyingPartyIdentifier(relyingPartyIdentifier: string): void;

  setAllowedCredentials(allowedCredentials: NSArray<interop.Object> | Array<interop.Object>): void;

  setUserVerificationPreference(userVerificationPreference: string): void;
}

declare class ASAuthorizationPublicKeyCredentialAssertionRequest extends NativeObject implements ASAuthorizationPublicKeyCredentialAssertionRequest {
}

declare interface ASAuthorizationPublicKeyCredentialDescriptor extends NSObjectProtocol, NSSecureCoding, NSCopying {
  credentialID: NSData;

  setCredentialID(credentialID: NSData): void;
}

declare class ASAuthorizationPublicKeyCredentialDescriptor extends NativeObject implements ASAuthorizationPublicKeyCredentialDescriptor {
}

declare interface ASAuthorizationPublicKeyCredentialAssertion extends ASPublicKeyCredential {
  readonly rawAuthenticatorData: NSData;

  readonly userID: NSData;

  readonly signature: NSData;
}

declare class ASAuthorizationPublicKeyCredentialAssertion extends NativeObject implements ASAuthorizationPublicKeyCredentialAssertion {
}

declare interface ASCredentialRequest extends NSObjectProtocol, NSSecureCoding, NSCopying {
  readonly type: interop.Enum<typeof ASCredentialRequestType>;

  readonly credentialIdentity: ASCredentialIdentity;
}

declare class ASCredentialRequest extends NativeObject implements ASCredentialRequest {
}

declare interface ASAuthorizationPublicKeyCredentialRegistrationRequest extends NSObjectProtocol, NSSecureCoding, NSCopying {
  readonly relyingPartyIdentifier: string;

  userID: NSData;

  name: string;

  displayName: string;

  challenge: NSData;

  userVerificationPreference: string;

  attestationPreference: string;

  setUserID(userID: NSData): void;

  setName(name: string): void;

  setDisplayName(displayName: string | null): void;

  setChallenge(challenge: NSData): void;

  setUserVerificationPreference(userVerificationPreference: string): void;

  setAttestationPreference(attestationPreference: string): void;
}

declare class ASAuthorizationPublicKeyCredentialRegistrationRequest extends NativeObject implements ASAuthorizationPublicKeyCredentialRegistrationRequest {
}

declare interface ASAuthorizationControllerPresentationContextProviding extends NSObjectProtocol {
  presentationAnchorForAuthorizationController(controller: ASAuthorizationController): NSWindow;
}

declare class ASAuthorizationControllerPresentationContextProviding extends NativeObject implements ASAuthorizationControllerPresentationContextProviding {
}

declare interface ASAuthorizationControllerDelegate extends NSObjectProtocol {
  authorizationControllerDidCompleteWithAuthorization?(controller: ASAuthorizationController, authorization: ASAuthorization): void;

  authorizationControllerDidCompleteWithError?(controller: ASAuthorizationController, error: NSError): void;
}

declare class ASAuthorizationControllerDelegate extends NativeObject implements ASAuthorizationControllerDelegate {
}

declare interface ASAuthorizationProvider extends NSObjectProtocol {
}

declare class ASAuthorizationProvider extends NativeObject implements ASAuthorizationProvider {
}

declare interface ASCredentialIdentity extends NSObjectProtocol {
  readonly serviceIdentifier: ASCredentialServiceIdentifier;

  readonly user: string;

  readonly recordIdentifier: string;

  rank: number;

  setRank(rank: number): void;
}

declare class ASCredentialIdentity extends NativeObject implements ASCredentialIdentity {
}

declare interface ASAuthorizationCredential extends NSObjectProtocol, NSCopying, NSSecureCoding {
}

declare class ASAuthorizationCredential extends NativeObject implements ASAuthorizationCredential {
}

declare interface ASWebAuthenticationSessionWebBrowserSessionHandling {
  beginHandlingWebAuthenticationSessionRequest(request: ASWebAuthenticationSessionRequest): void;

  cancelWebAuthenticationSessionRequest(request: ASWebAuthenticationSessionRequest): void;
}

declare class ASWebAuthenticationSessionWebBrowserSessionHandling extends NativeObject implements ASWebAuthenticationSessionWebBrowserSessionHandling {
}

declare interface ASWebAuthenticationSessionRequestDelegate extends NSObjectProtocol {
  authenticationSessionRequestDidCompleteWithCallbackURL?(authenticationSessionRequest: ASWebAuthenticationSessionRequest, callbackURL: NSURL): void;

  authenticationSessionRequestDidCancelWithError?(authenticationSessionRequest: ASWebAuthenticationSessionRequest, error: NSError): void;
}

declare class ASWebAuthenticationSessionRequestDelegate extends NativeObject implements ASWebAuthenticationSessionRequestDelegate {
}

declare interface ASWebAuthenticationPresentationContextProviding extends NSObjectProtocol {
  presentationAnchorForWebAuthenticationSession(session: ASWebAuthenticationSession): NSWindow;
}

declare class ASWebAuthenticationPresentationContextProviding extends NativeObject implements ASWebAuthenticationPresentationContextProviding {
}

declare interface ASAuthorizationPublicKeyCredentialRegistration extends ASPublicKeyCredential {
  readonly rawAttestationObject: NSData;
}

declare class ASAuthorizationPublicKeyCredentialRegistration extends NativeObject implements ASAuthorizationPublicKeyCredentialRegistration {
}

declare interface ASAuthorizationProviderExtensionAuthorizationRequestHandler extends NSObjectProtocol {
  beginAuthorizationWithRequest(request: ASAuthorizationProviderExtensionAuthorizationRequest): void;

  cancelAuthorizationWithRequest?(request: ASAuthorizationProviderExtensionAuthorizationRequest): void;
}

declare class ASAuthorizationProviderExtensionAuthorizationRequestHandler extends NativeObject implements ASAuthorizationProviderExtensionAuthorizationRequestHandler {
}

declare interface ASPublicKeyCredential extends ASAuthorizationCredential {
  readonly rawClientDataJSON: NSData;

  readonly credentialID: NSData;
}

declare class ASPublicKeyCredential extends NativeObject implements ASPublicKeyCredential {
}

declare interface ASAuthorizationWebBrowserPlatformPublicKeyCredentialProvider {
  createCredentialRegistrationRequestWithClientDataNameUserID(clientData: ASPublicKeyCredentialClientData, name: string, userID: NSData): ASAuthorizationPlatformPublicKeyCredentialRegistrationRequest;

  createCredentialRegistrationRequestWithClientDataNameUserIDRequestStyle(clientData: ASPublicKeyCredentialClientData, name: string, userID: NSData, requestStyle: interop.Enum<typeof ASAuthorizationPlatformPublicKeyCredentialRegistrationRequestStyle>): ASAuthorizationPlatformPublicKeyCredentialRegistrationRequest;

  createCredentialAssertionRequestWithClientData(clientData: ASPublicKeyCredentialClientData): ASAuthorizationPlatformPublicKeyCredentialAssertionRequest;
}

declare class ASAuthorizationWebBrowserPlatformPublicKeyCredentialProvider extends NativeObject implements ASAuthorizationWebBrowserPlatformPublicKeyCredentialProvider {
}

declare interface ASAuthorizationWebBrowserPlatformPublicKeyCredentialAssertionRequest {
  readonly clientData: ASPublicKeyCredentialClientData;

  shouldShowHybridTransport: boolean;

  setShouldShowHybridTransport(shouldShowHybridTransport: boolean): void;
}

declare class ASAuthorizationWebBrowserPlatformPublicKeyCredentialAssertionRequest extends NativeObject implements ASAuthorizationWebBrowserPlatformPublicKeyCredentialAssertionRequest {
}

declare interface ASAuthorizationWebBrowserPlatformPublicKeyCredentialRegistrationRequest {
  readonly clientData: ASPublicKeyCredentialClientData;

  get excludedCredentials(): NSArray;
  set excludedCredentials(value: NSArray<interop.Object> | Array<interop.Object>);

  shouldShowHybridTransport: boolean;

  setExcludedCredentials(excludedCredentials: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setShouldShowHybridTransport(shouldShowHybridTransport: boolean): void;
}

declare class ASAuthorizationWebBrowserPlatformPublicKeyCredentialRegistrationRequest extends NativeObject implements ASAuthorizationWebBrowserPlatformPublicKeyCredentialRegistrationRequest {
}

declare class ASAuthorizationPublicKeyCredentialPRFAssertionInput extends NSObject {
  initWithInputValuesPerCredentialInputValues(inputValues: ASAuthorizationPublicKeyCredentialPRFAssertionInputValues | null, perCredentialInputValues: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): this;

  readonly inputValues: ASAuthorizationPublicKeyCredentialPRFAssertionInputValues;

  readonly perCredentialInputValues: NSDictionary;
}

declare class ASAuthorizationPublicKeyCredentialPRFAssertionInputValues extends NSObject {
  initWithSaltInput1SaltInput2(saltInput1: NSData, saltInput2: NSData | null): this;

  readonly saltInput1: NSData;

  readonly saltInput2: NSData;
}

declare class ASPasskeyRegistrationCredentialExtensionInput extends NSObject implements NSCopying, NSSecureCoding {
  readonly largeBlob: ASAuthorizationPublicKeyCredentialLargeBlobRegistrationInput;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ASPasskeyAssertionCredentialExtensionInput extends NSObject implements NSCopying, NSSecureCoding {
  readonly largeBlob: ASAuthorizationPublicKeyCredentialLargeBlobAssertionInput;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ASPasskeyAssertionCredentialExtensionOutput extends NSObject implements NSCopying, NSSecureCoding {
  initWithLargeBlobOutput(largeBlob: ASAuthorizationPublicKeyCredentialLargeBlobAssertionOutput | null): this;

  readonly largeBlobAssertionOutput: ASAuthorizationPublicKeyCredentialLargeBlobAssertionOutput;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ASWebAuthenticationSessionCallback extends NSObject {
  static callbackWithCustomScheme<This extends abstract new (...args: any) => any>(this: This, customScheme: string): InstanceType<This>;

  static callbackWithHTTPSHostPath<This extends abstract new (...args: any) => any>(this: This, host: string, path: string): InstanceType<This>;

  matchesURL(url: NSURL): boolean;
}

declare class ASSettingsHelper extends NSObject {
  static openCredentialProviderAppSettingsWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  static openVerificationCodeAppSettingsWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  static requestToTurnOnCredentialProviderExtensionWithCompletionHandler(completionHandler: (p1: boolean) => void): void;
}

declare class ASPasskeyCredentialIdentity extends NSObject implements NSCopying, NSSecureCoding, ASCredentialIdentity {
  initWithRelyingPartyIdentifierUserNameCredentialIDUserHandleRecordIdentifier(relyingPartyIdentifier: string, userName: string, credentialID: NSData, userHandle: NSData, recordIdentifier: string | null): this;

  static identityWithRelyingPartyIdentifierUserNameCredentialIDUserHandleRecordIdentifier<This extends abstract new (...args: any) => any>(this: This, relyingPartyIdentifier: string, userName: string, credentialID: NSData, userHandle: NSData, recordIdentifier: string | null): InstanceType<This>;

  readonly relyingPartyIdentifier: string;

  readonly userName: string;

  readonly credentialID: NSData;

  readonly userHandle: NSData;

  readonly recordIdentifier: string;

  rank: number;

  setRank(rank: number): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  readonly serviceIdentifier: ASCredentialServiceIdentifier;

  readonly user: string;

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

declare class ASAuthorizationProviderExtensionLoginConfiguration extends NSObject {
  initWithClientIDIssuerTokenEndpointURLJwksEndpointURLAudience(clientID: string, issuer: string, tokenEndpointURL: NSURL, jwksEndpointURL: NSURL, audience: string | null): this;

  static configurationWithOpenIDConfigurationURLClientIDIssuerCompletion(openIDConfigurationURL: NSURL, clientID: string, issuer: string | null, completion: (p1: ASAuthorizationProviderExtensionLoginConfiguration, p2: NSError) => void | null): void;

  invalidCredentialPredicate: string;

  accountDisplayName: string;

  readonly clientID: string;

  readonly issuer: string;

  audience: string;

  tokenEndpointURL: NSURL;

  jwksEndpointURL: NSURL;

  get jwksTrustedRootCertificates(): NSArray;
  set jwksTrustedRootCertificates(value: NSArray<interop.Object> | Array<interop.Object>);

  deviceContext: NSData;

  userSecureEnclaveKeyBiometricPolicy: interop.Enum<typeof ASAuthorizationProviderExtensionUserSecureEnclaveKeyBiometricPolicy>;

  nonceEndpointURL: NSURL;

  nonceResponseKeypath: string;

  serverNonceClaimName: string;

  get customNonceRequestValues(): NSArray;
  set customNonceRequestValues(value: NSArray<interop.Object> | Array<interop.Object>);

  setCustomAssertionRequestHeaderClaimsReturningError(claims: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, error: interop.PointerConvertible): boolean;

  setCustomAssertionRequestBodyClaimsReturningError(claims: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, error: interop.PointerConvertible): boolean;

  additionalScopes: string;

  additionalAuthorizationScopes: string;

  includePreviousRefreshTokenInLoginRequest: boolean;

  previousRefreshTokenClaimName: string;

  customRequestJWTParameterName: string;

  get customLoginRequestValues(): NSArray;
  set customLoginRequestValues(value: NSArray<interop.Object> | Array<interop.Object>);

  setCustomLoginRequestHeaderClaimsReturningError(claims: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, error: interop.PointerConvertible): boolean;

  setCustomLoginRequestBodyClaimsReturningError(claims: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, error: interop.PointerConvertible): boolean;

  uniqueIdentifierClaimName: string;

  groupRequestClaimName: string;

  groupResponseClaimName: string;

  get kerberosTicketMappings(): NSArray;
  set kerberosTicketMappings(value: NSArray<interop.Object> | Array<interop.Object>);

  refreshEndpointURL: NSURL;

  get customRefreshRequestValues(): NSArray;
  set customRefreshRequestValues(value: NSArray<interop.Object> | Array<interop.Object>);

  setCustomRefreshRequestHeaderClaimsReturningError(claims: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, error: interop.PointerConvertible): boolean;

  setCustomRefreshRequestBodyClaimsReturningError(claims: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, error: interop.PointerConvertible): boolean;

  federationType: interop.Enum<typeof ASAuthorizationProviderExtensionFederationType>;

  federationRequestURN: string;

  federationMEXURL: NSURL;

  federationUserPreauthenticationURL: NSURL;

  federationMEXURLKeypath: string;

  federationPredicate: string;

  get customFederationUserPreauthenticationRequestValues(): NSArray;
  set customFederationUserPreauthenticationRequestValues(value: NSArray<interop.Object> | Array<interop.Object>);

  loginRequestEncryptionPublicKey: interop.Object;

  loginRequestEncryptionAPVPrefix: NSData;

  loginRequestEncryptionAlgorithm: NSNumber;

  loginRequestHPKEPreSharedKey: NSData;

  loginRequestHPKEPreSharedKeyID: NSData;

  keyEndpointURL: NSURL;

  get customKeyExchangeRequestValues(): NSArray;
  set customKeyExchangeRequestValues(value: NSArray<interop.Object> | Array<interop.Object>);

  setCustomKeyExchangeRequestHeaderClaimsReturningError(claims: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, error: interop.PointerConvertible): boolean;

  setCustomKeyExchangeRequestBodyClaimsReturningError(claims: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, error: interop.PointerConvertible): boolean;

  get customKeyRequestValues(): NSArray;
  set customKeyRequestValues(value: NSArray<interop.Object> | Array<interop.Object>);

  setCustomKeyRequestHeaderClaimsReturningError(claims: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, error: interop.PointerConvertible): boolean;

  setCustomKeyRequestBodyClaimsReturningError(claims: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, error: interop.PointerConvertible): boolean;

  hpkePreSharedKey: NSData;

  hpkePreSharedKeyID: NSData;

  hpkeAuthPublicKey: interop.Object;

  setInvalidCredentialPredicate(invalidCredentialPredicate: string | null): void;

  setAccountDisplayName(accountDisplayName: string | null): void;

  setAudience(audience: string): void;

  setTokenEndpointURL(tokenEndpointURL: NSURL): void;

  setJwksEndpointURL(jwksEndpointURL: NSURL): void;

  setJwksTrustedRootCertificates(jwksTrustedRootCertificates: NSArray<interop.Object> | Array<interop.Object>): void;

  setDeviceContext(deviceContext: NSData): void;

  setUserSecureEnclaveKeyBiometricPolicy(userSecureEnclaveKeyBiometricPolicy: interop.Enum<typeof ASAuthorizationProviderExtensionUserSecureEnclaveKeyBiometricPolicy>): void;

  setNonceEndpointURL(nonceEndpointURL: NSURL): void;

  setNonceResponseKeypath(nonceResponseKeypath: string): void;

  setServerNonceClaimName(serverNonceClaimName: string): void;

  setCustomNonceRequestValues(customNonceRequestValues: NSArray<interop.Object> | Array<interop.Object>): void;

  setAdditionalScopes(additionalScopes: string): void;

  setAdditionalAuthorizationScopes(additionalAuthorizationScopes: string): void;

  setIncludePreviousRefreshTokenInLoginRequest(includePreviousRefreshTokenInLoginRequest: boolean): void;

  setPreviousRefreshTokenClaimName(previousRefreshTokenClaimName: string): void;

  setCustomRequestJWTParameterName(customRequestJWTParameterName: string): void;

  setCustomLoginRequestValues(customLoginRequestValues: NSArray<interop.Object> | Array<interop.Object>): void;

  setUniqueIdentifierClaimName(uniqueIdentifierClaimName: string): void;

  setGroupRequestClaimName(groupRequestClaimName: string): void;

  setGroupResponseClaimName(groupResponseClaimName: string): void;

  setKerberosTicketMappings(kerberosTicketMappings: NSArray<interop.Object> | Array<interop.Object>): void;

  setRefreshEndpointURL(refreshEndpointURL: NSURL): void;

  setCustomRefreshRequestValues(customRefreshRequestValues: NSArray<interop.Object> | Array<interop.Object>): void;

  setFederationType(federationType: interop.Enum<typeof ASAuthorizationProviderExtensionFederationType>): void;

  setFederationRequestURN(federationRequestURN: string): void;

  setFederationMEXURL(federationMEXURL: NSURL): void;

  setFederationUserPreauthenticationURL(federationUserPreauthenticationURL: NSURL): void;

  setFederationMEXURLKeypath(federationMEXURLKeypath: string): void;

  setFederationPredicate(federationPredicate: string): void;

  setCustomFederationUserPreauthenticationRequestValues(customFederationUserPreauthenticationRequestValues: NSArray<interop.Object> | Array<interop.Object>): void;

  setLoginRequestEncryptionPublicKey(loginRequestEncryptionPublicKey: interop.Object): void;

  setLoginRequestEncryptionAPVPrefix(loginRequestEncryptionAPVPrefix: NSData): void;

  setLoginRequestEncryptionAlgorithm(loginRequestEncryptionAlgorithm: NSNumber): void;

  setLoginRequestHPKEPreSharedKey(loginRequestHPKEPreSharedKey: NSData): void;

  setLoginRequestHPKEPreSharedKeyID(loginRequestHPKEPreSharedKeyID: NSData): void;

  setKeyEndpointURL(keyEndpointURL: NSURL): void;

  setCustomKeyExchangeRequestValues(customKeyExchangeRequestValues: NSArray<interop.Object> | Array<interop.Object>): void;

  setCustomKeyRequestValues(customKeyRequestValues: NSArray<interop.Object> | Array<interop.Object>): void;

  setHpkePreSharedKey(hpkePreSharedKey: NSData): void;

  setHpkePreSharedKeyID(hpkePreSharedKeyID: NSData): void;

  setHpkeAuthPublicKey(hpkeAuthPublicKey: interop.Object): void;
}

declare class ASPublicKeyCredentialClientData extends NSObject {
  initWithChallengeOrigin(challenge: NSData, origin: string): this;

  challenge: NSData;

  origin: string;

  topOrigin: string;

  crossOrigin: interop.Enum<typeof ASPublicKeyCredentialClientDataCrossOriginValue>;

  setChallenge(challenge: NSData): void;

  setOrigin(origin: string): void;

  setTopOrigin(topOrigin: string | null): void;

  setCrossOrigin(crossOrigin: interop.Enum<typeof ASPublicKeyCredentialClientDataCrossOriginValue>): void;
}

declare class ASAuthorizationSecurityKeyPublicKeyCredentialRegistrationRequest extends ASAuthorizationRequest implements ASAuthorizationPublicKeyCredentialRegistrationRequest {
  get credentialParameters(): NSArray;
  set credentialParameters(value: NSArray<interop.Object> | Array<interop.Object>);

  get excludedCredentials(): NSArray;
  set excludedCredentials(value: NSArray<interop.Object> | Array<interop.Object>);

  residentKeyPreference: string;

  setCredentialParameters(credentialParameters: NSArray<interop.Object> | Array<interop.Object>): void;

  setExcludedCredentials(excludedCredentials: NSArray<interop.Object> | Array<interop.Object>): void;

  setResidentKeyPreference(residentKeyPreference: string): void;

  readonly relyingPartyIdentifier: string;

  userID: NSData;

  name: string;

  displayName: string;

  challenge: NSData;

  userVerificationPreference: string;

  attestationPreference: string;

  setUserID(userID: NSData): void;

  setName(name: string): void;

  setDisplayName(displayName: string | null): void;

  setChallenge(challenge: NSData): void;

  setUserVerificationPreference(userVerificationPreference: string): void;

  setAttestationPreference(attestationPreference: string): void;

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

declare class ASAuthorizationSecurityKeyPublicKeyCredentialProvider extends NSObject implements ASAuthorizationProvider {
  initWithRelyingPartyIdentifier(relyingPartyIdentifier: string): this;

  createCredentialRegistrationRequestWithChallengeDisplayNameNameUserID(challenge: NSData, displayName: string, name: string, userID: NSData): ASAuthorizationSecurityKeyPublicKeyCredentialRegistrationRequest;

  createCredentialAssertionRequestWithChallenge(challenge: NSData): ASAuthorizationSecurityKeyPublicKeyCredentialAssertionRequest;

  readonly relyingPartyIdentifier: string;

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

declare class ASAuthorizationSecurityKeyPublicKeyCredentialAssertionRequest extends ASAuthorizationRequest implements ASAuthorizationPublicKeyCredentialAssertionRequest {
  get allowedCredentials(): NSArray;
  set allowedCredentials(value: NSArray<interop.Object> | Array<interop.Object>);

  appID: string;

  setAllowedCredentials(allowedCredentials: NSArray<interop.Object> | Array<interop.Object>): void;

  setAppID(appID: string | null): void;

  challenge: NSData;

  relyingPartyIdentifier: string;

  userVerificationPreference: string;

  setChallenge(challenge: NSData): void;

  setRelyingPartyIdentifier(relyingPartyIdentifier: string): void;

  setUserVerificationPreference(userVerificationPreference: string): void;

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

declare class ASAuthorizationSecurityKeyPublicKeyCredentialDescriptor extends NSObject implements ASAuthorizationPublicKeyCredentialDescriptor {
  initWithCredentialIDTransports(credentialID: NSData, allowedTransports: NSArray<interop.Object> | Array<interop.Object>): this;

  get transports(): NSArray;
  set transports(value: NSArray<interop.Object> | Array<interop.Object>);

  setTransports(transports: NSArray<interop.Object> | Array<interop.Object>): void;

  credentialID: NSData;

  setCredentialID(credentialID: NSData): void;

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

declare class ASAuthorizationPublicKeyCredentialLargeBlobRegistrationOutput extends NSObject implements NSCopying, NSSecureCoding {
  readonly isSupported: boolean;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ASAuthorizationPlatformPublicKeyCredentialRegistrationRequest extends ASAuthorizationRequest implements ASAuthorizationPublicKeyCredentialRegistrationRequest {
  largeBlob: ASAuthorizationPublicKeyCredentialLargeBlobRegistrationInput;

  prf: ASAuthorizationPublicKeyCredentialPRFRegistrationInput;

  requestStyle: interop.Enum<typeof ASAuthorizationPlatformPublicKeyCredentialRegistrationRequestStyle>;

  setLargeBlob(largeBlob: ASAuthorizationPublicKeyCredentialLargeBlobRegistrationInput): void;

  setPrf(prf: ASAuthorizationPublicKeyCredentialPRFRegistrationInput): void;

  setRequestStyle(requestStyle: interop.Enum<typeof ASAuthorizationPlatformPublicKeyCredentialRegistrationRequestStyle>): void;

  readonly relyingPartyIdentifier: string;

  userID: NSData;

  name: string;

  displayName: string;

  challenge: NSData;

  userVerificationPreference: string;

  attestationPreference: string;

  setUserID(userID: NSData): void;

  setName(name: string): void;

  setDisplayName(displayName: string | null): void;

  setChallenge(challenge: NSData): void;

  setUserVerificationPreference(userVerificationPreference: string): void;

  setAttestationPreference(attestationPreference: string): void;

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

declare class ASAuthorizationPublicKeyCredentialLargeBlobRegistrationInput extends NSObject {
  initWithSupportRequirement(requirement: interop.Enum<typeof ASAuthorizationPublicKeyCredentialLargeBlobSupportRequirement>): this;

  supportRequirement: interop.Enum<typeof ASAuthorizationPublicKeyCredentialLargeBlobSupportRequirement>;

  setSupportRequirement(supportRequirement: interop.Enum<typeof ASAuthorizationPublicKeyCredentialLargeBlobSupportRequirement>): void;
}

// @ts-ignore ClassDecl.tsIgnore
declare class ASCredentialProviderViewController extends NSViewController {
  // @ts-ignore MemberDecl.tsIgnore
  readonly extensionContext: ASCredentialProviderExtensionContext;

  prepareCredentialListForServiceIdentifiers(serviceIdentifiers: NSArray<interop.Object> | Array<interop.Object>): void;

  prepareCredentialListForServiceIdentifiersRequestParameters(serviceIdentifiers: NSArray<interop.Object> | Array<interop.Object>, requestParameters: ASPasskeyCredentialRequestParameters): void;

  prepareOneTimeCodeCredentialListForServiceIdentifiers(serviceIdentifiers: NSArray<interop.Object> | Array<interop.Object>): void;

  provideCredentialWithoutUserInteractionForIdentity(credentialIdentity: ASPasswordCredentialIdentity): void;

  provideCredentialWithoutUserInteractionForRequest(credentialRequest: ASCredentialRequest): void;

  prepareInterfaceToProvideCredentialForIdentity(credentialIdentity: ASPasswordCredentialIdentity): void;

  prepareInterfaceToProvideCredentialForRequest(credentialRequest: ASCredentialRequest): void;

  prepareInterfaceForExtensionConfiguration(): void;

  prepareInterfaceForPasskeyRegistration(registrationRequest: ASCredentialRequest): void;

  performPasskeyRegistrationWithoutUserInteractionIfPossible(registrationRequest: ASPasskeyCredentialRequest): void;
}

declare class ASAuthorizationProviderExtensionAuthorizationRequest extends NSObject {
  doNotHandle(): void;

  cancel(): void;

  complete(): void;

  completeWithHTTPAuthorizationHeaders(httpAuthorizationHeaders: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  completeWithHTTPResponseHttpBody(httpResponse: NSHTTPURLResponse, httpBody: NSData | null): void;

  completeWithAuthorizationResult(authorizationResult: ASAuthorizationProviderExtensionAuthorizationResult): void;

  completeWithError(error: NSError): void;

  presentAuthorizationViewControllerWithCompletion(completion: (p1: boolean, p2: NSError) => void | null): void;

  readonly url: NSURL;

  readonly requestedOperation: string;

  readonly httpHeaders: NSDictionary;

  readonly httpBody: NSData;

  readonly realm: string;

  readonly extensionData: NSDictionary;

  readonly callerBundleIdentifier: string;

  readonly authorizationOptions: NSDictionary;

  readonly callerManaged: boolean;

  readonly callerTeamIdentifier: string;

  readonly localizedCallerDisplayName: string;

  readonly callerAuditToken: NSData;

  readonly userInterfaceEnabled: boolean;

  readonly loginManager: ASAuthorizationProviderExtensionLoginManager;

  isCallerManaged(): boolean;

  isUserInterfaceEnabled(): boolean;
}

declare class ASAuthorizationSingleSignOnProvider extends NSObject implements ASAuthorizationProvider {
  static authorizationProviderWithIdentityProviderURL<This extends abstract new (...args: any) => any>(this: This, url: NSURL): InstanceType<This>;

  createRequest(): ASAuthorizationSingleSignOnRequest;

  readonly url: NSURL;

  readonly canPerformAuthorization: boolean;

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

declare class ASAuthorizationPasswordProvider extends NSObject implements ASAuthorizationProvider {
  createRequest(): ASAuthorizationPasswordRequest;

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

declare class ASAuthorizationPasswordRequest extends ASAuthorizationRequest {
}

declare class ASAuthorizationAppleIDProvider extends NSObject implements ASAuthorizationProvider {
  createRequest(): ASAuthorizationAppleIDRequest;

  getCredentialStateForUserIDCompletion(userID: string, completion: (p1: interop.Enum<typeof ASAuthorizationAppleIDProviderCredentialState>, p2: NSError) => void | null): void;

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

declare class ASAuthorizationOpenIDRequest extends ASAuthorizationRequest {
  get requestedScopes(): NSArray;
  set requestedScopes(value: NSArray<interop.Object> | Array<interop.Object>);

  state: string;

  nonce: string;

  requestedOperation: string;

  setRequestedScopes(requestedScopes: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setState(state: string | null): void;

  setNonce(nonce: string | null): void;

  setRequestedOperation(requestedOperation: string): void;
}

declare class ASAuthorizationAppleIDCredential extends NSObject implements ASAuthorizationCredential {
  readonly user: string;

  readonly state: string;

  readonly authorizedScopes: NSArray;

  readonly authorizationCode: NSData;

  readonly identityToken: NSData;

  readonly email: string;

  readonly fullName: NSPersonNameComponents;

  readonly realUserStatus: interop.Enum<typeof ASUserDetectionStatus>;

  readonly userAgeRange: interop.Enum<typeof ASUserAgeRange>;

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

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ASAuthorization extends NSObject {
  readonly provider: ASAuthorizationProvider;

  readonly credential: ASAuthorizationCredential;
}

declare class ASPasswordCredentialIdentity extends NSObject implements NSCopying, NSSecureCoding, ASCredentialIdentity {
  initWithServiceIdentifierUserRecordIdentifier(serviceIdentifier: ASCredentialServiceIdentifier, user: string, recordIdentifier: string | null): this;

  static identityWithServiceIdentifierUserRecordIdentifier<This extends abstract new (...args: any) => any>(this: This, serviceIdentifier: ASCredentialServiceIdentifier, user: string, recordIdentifier: string | null): InstanceType<This>;

  readonly serviceIdentifier: ASCredentialServiceIdentifier;

  readonly user: string;

  readonly recordIdentifier: string;

  rank: number;

  setRank(rank: number): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

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

declare class ASCredentialIdentityStoreState extends NSObject {
  readonly enabled: boolean;

  readonly supportsIncrementalUpdates: boolean;

  isEnabled(): boolean;
}

declare class ASCredentialIdentityStore extends NSObject {
  static readonly sharedStore: ASCredentialIdentityStore;

  getCredentialIdentityStoreStateWithCompletion(completion: (p1: ASCredentialIdentityStoreState) => void): void;

  getCredentialIdentitiesForServiceCredentialIdentityTypesCompletionHandler(serviceIdentifier: ASCredentialServiceIdentifier | null, credentialIdentityTypes: interop.Enum<typeof ASCredentialIdentityTypes>, completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>) => void): void;

  saveCredentialIdentitiesCompletion(credentialIdentities: NSArray<interop.Object> | Array<interop.Object>, completion: (p1: boolean, p2: NSError) => void | null): void;

  saveCredentialIdentityEntriesCompletion(credentialIdentities: NSArray<interop.Object> | Array<interop.Object>, completion: (p1: boolean, p2: NSError) => void | null): void;

  removeCredentialIdentitiesCompletion(credentialIdentities: NSArray<interop.Object> | Array<interop.Object>, completion: (p1: boolean, p2: NSError) => void | null): void;

  removeCredentialIdentityEntriesCompletion(credentialIdentities: NSArray<interop.Object> | Array<interop.Object>, completion: (p1: boolean, p2: NSError) => void | null): void;

  removeAllCredentialIdentitiesWithCompletion(completion: (p1: boolean, p2: NSError) => void | null): void;

  replaceCredentialIdentitiesWithIdentitiesCompletion(newCredentialIdentities: NSArray<interop.Object> | Array<interop.Object>, completion: (p1: boolean, p2: NSError) => void | null): void;

  replaceCredentialIdentityEntriesCompletion(newCredentialIdentities: NSArray<interop.Object> | Array<interop.Object>, completion: (p1: boolean, p2: NSError) => void | null): void;
}

declare class ASWebAuthenticationSessionWebBrowserSessionManager extends NSObject {
  static readonly sharedManager: ASWebAuthenticationSessionWebBrowserSessionManager;

  sessionHandler: ASWebAuthenticationSessionWebBrowserSessionHandling;

  readonly wasLaunchedByAuthenticationServices: boolean;

  setSessionHandler(sessionHandler: ASWebAuthenticationSessionWebBrowserSessionHandling): void;
}

declare class ASWebAuthenticationSessionRequest extends NSObject implements NSSecureCoding, NSCopying {
  readonly UUID: NSUUID;

  readonly URL: NSURL;

  readonly callbackURLScheme: string;

  readonly shouldUseEphemeralSession: boolean;

  delegate: ASWebAuthenticationSessionRequestDelegate;

  readonly additionalHeaderFields: NSDictionary;

  readonly callback: ASWebAuthenticationSessionCallback;

  cancelWithError(error: NSError): void;

  completeWithCallbackURL(url: NSURL): void;

  setDelegate(delegate: ASWebAuthenticationSessionRequestDelegate | null): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class ASAuthorizationPlatformPublicKeyCredentialDescriptor extends NSObject implements ASAuthorizationPublicKeyCredentialDescriptor {
  initWithCredentialID(credentialID: NSData): this;

  credentialID: NSData;

  setCredentialID(credentialID: NSData): void;

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

declare class ASCredentialProviderExtensionContext extends NSExtensionContext {
  completeRequestWithSelectedCredentialCompletionHandler(credential: ASPasswordCredential, completionHandler: (p1: boolean) => void | null): void;

  completeAssertionRequestWithSelectedPasskeyCredentialCompletionHandler(credential: ASPasskeyAssertionCredential, completionHandler: (p1: boolean) => void | null): void;

  completeRegistrationRequestWithSelectedPasskeyCredentialCompletionHandler(credential: ASPasskeyRegistrationCredential, completionHandler: (p1: boolean) => void | null): void;

  completeOneTimeCodeRequestWithSelectedCredentialCompletionHandler(credential: ASOneTimeCodeCredential, completionHandler: (p1: boolean) => void | null): void;

  completeExtensionConfigurationRequest(): void;

  cancelRequestWithError(error: NSError): void;
}

declare class ASAuthorizationAppleIDRequest extends ASAuthorizationOpenIDRequest {
  user: string;

  setUser(user: string | null): void;
}

declare class ASAuthorizationSingleSignOnCredential extends NSObject implements ASAuthorizationCredential {
  readonly state: string;

  readonly accessToken: NSData;

  readonly identityToken: NSData;

  readonly authorizedScopes: NSArray;

  readonly authenticatedResponse: NSHTTPURLResponse;

  readonly privateKeys: NSArray;

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

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ASPasswordCredential extends NSObject implements ASAuthorizationCredential {
  initWithUserPassword(user: string, password: string): this;

  static credentialWithUserPassword<This extends abstract new (...args: any) => any>(this: This, user: string, password: string): InstanceType<This>;

  readonly user: string;

  readonly password: string;

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

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ASCredentialServiceIdentifier extends NSObject implements NSCopying, NSSecureCoding {
  initWithIdentifierType(identifier: string, type: interop.Enum<typeof ASCredentialServiceIdentifierType>): this;

  readonly identifier: string;

  readonly type: interop.Enum<typeof ASCredentialServiceIdentifierType>;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ASAuthorizationWebBrowserPlatformPublicKeyCredential extends NSObject {
  readonly name: string;

  readonly customTitle: string;

  readonly relyingParty: string;

  readonly credentialID: NSData;

  readonly userHandle: NSData;

  readonly providerName: string;
}

declare class ASAuthorizationRequest extends NSObject implements NSCopying, NSSecureCoding {
  readonly provider: ASAuthorizationProvider;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ASAuthorizationSingleSignOnRequest extends ASAuthorizationOpenIDRequest {
  get authorizationOptions(): NSArray;
  set authorizationOptions(value: NSArray<interop.Object> | Array<interop.Object>);

  userInterfaceEnabled: boolean;

  setAuthorizationOptions(authorizationOptions: NSArray<interop.Object> | Array<interop.Object>): void;

  isUserInterfaceEnabled(): boolean;

  setUserInterfaceEnabled(userInterfaceEnabled: boolean): void;
}

declare class ASAuthorizationController extends NSObject {
  readonly authorizationRequests: NSArray;

  delegate: ASAuthorizationControllerDelegate;

  presentationContextProvider: ASAuthorizationControllerPresentationContextProviding;

  initWithAuthorizationRequests(authorizationRequests: NSArray<interop.Object> | Array<interop.Object>): this;

  performRequests(): void;

  performRequestsWithOptions(options: interop.Enum<typeof ASAuthorizationControllerRequestOptions>): void;

  cancel(): void;

  setDelegate(delegate: ASAuthorizationControllerDelegate | null): void;

  setPresentationContextProvider(presentationContextProvider: ASAuthorizationControllerPresentationContextProviding): void;
}

declare class ASOneTimeCodeCredentialRequest extends NSObject implements ASCredentialRequest {
  initWithCredentialIdentity(credentialIdentity: ASOneTimeCodeCredentialIdentity): this;

  readonly type: interop.Enum<typeof ASCredentialRequestType>;

  readonly credentialIdentity: ASCredentialIdentity;

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

declare class ASAuthorizationPublicKeyCredentialParameters extends NSObject implements NSSecureCoding, NSCopying {
  initWithAlgorithm(algorithm: number): this;

  readonly algorithm: number;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class ASAuthorizationPlatformPublicKeyCredentialAssertionRequest extends ASAuthorizationRequest implements ASAuthorizationPublicKeyCredentialAssertionRequest {
  get allowedCredentials(): NSArray;
  set allowedCredentials(value: NSArray<interop.Object> | Array<interop.Object>);

  largeBlob: ASAuthorizationPublicKeyCredentialLargeBlobAssertionInput;

  prf: ASAuthorizationPublicKeyCredentialPRFAssertionInput;

  setAllowedCredentials(allowedCredentials: NSArray<interop.Object> | Array<interop.Object>): void;

  setLargeBlob(largeBlob: ASAuthorizationPublicKeyCredentialLargeBlobAssertionInput): void;

  setPrf(prf: ASAuthorizationPublicKeyCredentialPRFAssertionInput | null): void;

  challenge: NSData;

  relyingPartyIdentifier: string;

  userVerificationPreference: string;

  setChallenge(challenge: NSData): void;

  setRelyingPartyIdentifier(relyingPartyIdentifier: string): void;

  setUserVerificationPreference(userVerificationPreference: string): void;

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

declare class ASOneTimeCodeCredentialIdentity extends NSObject implements NSCopying, NSSecureCoding, ASCredentialIdentity {
  initWithServiceIdentifierLabelRecordIdentifier(serviceIdentifier: ASCredentialServiceIdentifier, label: string, recordIdentifier: string | null): this;

  readonly label: string;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  readonly serviceIdentifier: ASCredentialServiceIdentifier;

  readonly user: string;

  readonly recordIdentifier: string;

  rank: number;

  setRank(rank: number): void;

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

declare class ASAuthorizationProviderExtensionLoginManager extends NSObject {
  readonly deviceRegistered: boolean;

  readonly userRegistered: boolean;

  readonly registrationToken: string;

  readonly extensionData: NSDictionary;

  loginUserName: string;

  readonly userLoginConfiguration: ASAuthorizationProviderExtensionUserLoginConfiguration;

  saveUserLoginConfigurationError(userLoginConfiguration: ASAuthorizationProviderExtensionUserLoginConfiguration, error: interop.PointerConvertible): boolean;

  get ssoTokens(): NSDictionary;
  set ssoTokens(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  readonly loginConfiguration: ASAuthorizationProviderExtensionLoginConfiguration;

  saveLoginConfigurationError(loginConfiguration: ASAuthorizationProviderExtensionLoginConfiguration, error: interop.PointerConvertible): boolean;

  saveCertificateKeyType(certificate: interop.Object, keyType: interop.Enum<typeof ASAuthorizationProviderExtensionKeyType>): void;

  copyKeyForKeyType(keyType: interop.Enum<typeof ASAuthorizationProviderExtensionKeyType>): interop.Object;

  copyIdentityForKeyType(keyType: interop.Enum<typeof ASAuthorizationProviderExtensionKeyType>): interop.Object;

  beginKeyRotationForKeyType(keyType: interop.Enum<typeof ASAuthorizationProviderExtensionKeyType>): interop.Object;

  completeKeyRotationForKeyType(keyType: interop.Enum<typeof ASAuthorizationProviderExtensionKeyType>): void;

  userNeedsReauthenticationWithCompletion(completion: (p1: NSError) => void | null): void;

  deviceRegistrationsNeedsRepair(): void;

  userRegistrationsNeedsRepair(): void;

  decryptionKeysNeedRepair(): void;

  resetKeys(): void;

  resetDeviceKeys(): void;

  resetUserSecureEnclaveKey(): void;

  attestKeyClientDataHashCompletion(keyType: interop.Enum<typeof ASAuthorizationProviderExtensionKeyType>, clientDataHash: NSData, completion: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): void;

  attestPendingKeyClientDataHashCompletion(keyType: interop.Enum<typeof ASAuthorizationProviderExtensionKeyType>, clientDataHash: NSData, completion: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): void;

  presentRegistrationViewControllerWithCompletion(completion: (p1: NSError) => void | null): void;

  isDeviceRegistered(): boolean;

  isUserRegistered(): boolean;

  setLoginUserName(loginUserName: string): void;

  setSsoTokens(ssoTokens: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): void;
}

declare class ASAuthorizationWebBrowserPublicKeyCredentialManager extends NSObject {
  init(): this;

  requestAuthorizationForPublicKeyCredentials(completionHandler: (p1: interop.Enum<typeof ASAuthorizationWebBrowserPublicKeyCredentialManagerAuthorizationState>) => void): void;

  platformCredentialsForRelyingPartyCompletionHandler(relyingParty: string, completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>) => void): void;

  readonly authorizationStateForPlatformCredentials: interop.Enum<typeof ASAuthorizationWebBrowserPublicKeyCredentialManagerAuthorizationState>;
}

declare class ASPasskeyAssertionCredential extends NSObject implements ASAuthorizationCredential {
  initWithUserHandleRelyingPartySignatureClientDataHashAuthenticatorDataCredentialID(userHandle: NSData, relyingParty: string, signature: NSData, clientDataHash: NSData, authenticatorData: NSData, credentialID: NSData): this;

  initWithUserHandleRelyingPartySignatureClientDataHashAuthenticatorDataCredentialIDExtensionOutput(userHandle: NSData, relyingParty: string, signature: NSData, clientDataHash: NSData, authenticatorData: NSData, credentialID: NSData, extensionOutput: ASPasskeyAssertionCredentialExtensionOutput | null): this;

  static credentialWithUserHandleRelyingPartySignatureClientDataHashAuthenticatorDataCredentialID<This extends abstract new (...args: any) => any>(this: This, userHandle: NSData, relyingParty: string, signature: NSData, clientDataHash: NSData, authenticatorData: NSData, credentialID: NSData): InstanceType<This>;

  readonly userHandle: NSData;

  readonly relyingParty: string;

  readonly signature: NSData;

  readonly clientDataHash: NSData;

  readonly authenticatorData: NSData;

  readonly credentialID: NSData;

  extensionOutput: ASPasskeyAssertionCredentialExtensionOutput;

  setExtensionOutput(extensionOutput: ASPasskeyAssertionCredentialExtensionOutput): void;

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

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ASAuthorizationProviderExtensionKerberosMapping extends NSObject {
  ticketKeyPath: string;

  messageBufferKeyName: string;

  realmKeyName: string;

  serviceNameKeyName: string;

  clientNameKeyName: string;

  encryptionKeyTypeKeyName: string;

  sessionKeyKeyName: string;

  setTicketKeyPath(ticketKeyPath: string | null): void;

  setMessageBufferKeyName(messageBufferKeyName: string | null): void;

  setRealmKeyName(realmKeyName: string | null): void;

  setServiceNameKeyName(serviceNameKeyName: string | null): void;

  setClientNameKeyName(clientNameKeyName: string | null): void;

  setEncryptionKeyTypeKeyName(encryptionKeyTypeKeyName: string | null): void;

  setSessionKeyKeyName(sessionKeyKeyName: string | null): void;
}

declare class ASPasskeyRegistrationCredential extends NSObject implements ASAuthorizationCredential {
  initWithRelyingPartyClientDataHashCredentialIDAttestationObject(relyingParty: string, clientDataHash: NSData, credentialID: NSData, attestationObject: NSData): this;

  initWithRelyingPartyClientDataHashCredentialIDAttestationObjectExtensionOutput(relyingParty: string, clientDataHash: NSData, credentialID: NSData, attestationObject: NSData, extensionOutput: ASPasskeyRegistrationCredentialExtensionOutput | null): this;

  static credentialWithRelyingPartyClientDataHashCredentialIDAttestationObject<This extends abstract new (...args: any) => any>(this: This, relyingParty: string, clientDataHash: NSData, credentialID: NSData, attestationObject: NSData): InstanceType<This>;

  readonly relyingParty: string;

  readonly clientDataHash: NSData;

  readonly credentialID: NSData;

  readonly attestationObject: NSData;

  extensionOutput: ASPasskeyRegistrationCredentialExtensionOutput;

  setExtensionOutput(extensionOutput: ASPasskeyRegistrationCredentialExtensionOutput): void;

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

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ASAuthorizationPublicKeyCredentialPRFRegistrationInput extends NSObject {
  static checkForSupport<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  initWithInputValues(inputValues: ASAuthorizationPublicKeyCredentialPRFAssertionInputValues | null): this;

  readonly shouldCheckForSupport: boolean;

  readonly inputValues: ASAuthorizationPublicKeyCredentialPRFAssertionInputValues;
}

declare class ASAuthorizationPlatformPublicKeyCredentialRegistration extends NSObject implements ASAuthorizationPublicKeyCredentialRegistration {
  readonly attachment: interop.Enum<typeof ASAuthorizationPublicKeyCredentialAttachment>;

  readonly largeBlob: ASAuthorizationPublicKeyCredentialLargeBlobRegistrationOutput;

  readonly prf: ASAuthorizationPublicKeyCredentialPRFRegistrationOutput;

  readonly rawAttestationObject: NSData;

  readonly rawClientDataJSON: NSData;

  readonly credentialID: NSData;

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

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ASAuthorizationPublicKeyCredentialPRFRegistrationOutput extends NSObject {
  readonly isSupported: boolean;

  readonly first: NSData;

  readonly second: NSData;
}

declare class ASOneTimeCodeCredential extends NSObject implements ASAuthorizationCredential {
  static credentialWithCode<This extends abstract new (...args: any) => any>(this: This, code: string): InstanceType<This>;

  initWithCode(code: string): this;

  readonly code: string;

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

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ASAuthorizationProviderExtensionAuthorizationResult extends NSObject {
  initWithHTTPAuthorizationHeaders(httpAuthorizationHeaders: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): this;

  initWithHTTPResponseHttpBody(httpResponse: NSHTTPURLResponse, httpBody: NSData | null): this;

  get httpAuthorizationHeaders(): NSDictionary;
  set httpAuthorizationHeaders(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  httpResponse: NSHTTPURLResponse;

  httpBody: NSData;

  get privateKeys(): NSArray;
  set privateKeys(value: NSArray<interop.Object> | Array<interop.Object>);

  setHttpAuthorizationHeaders(httpAuthorizationHeaders: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): void;

  setHttpResponse(httpResponse: NSHTTPURLResponse | null): void;

  setHttpBody(httpBody: NSData | null): void;

  setPrivateKeys(privateKeys: NSArray<interop.Object> | Array<interop.Object>): void;
}

declare class ASAuthorizationSecurityKeyPublicKeyCredentialAssertion extends NSObject implements ASAuthorizationPublicKeyCredentialAssertion {
  readonly appID: boolean;

  readonly rawAuthenticatorData: NSData;

  readonly userID: NSData;

  readonly signature: NSData;

  readonly rawClientDataJSON: NSData;

  readonly credentialID: NSData;

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

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ASAuthorizationPublicKeyCredentialLargeBlobAssertionOutput extends NSObject {
  readonly readData: NSData;

  readonly didWrite: boolean;
}

declare class ASAuthorizationPlatformPublicKeyCredentialAssertion extends NSObject implements ASAuthorizationPublicKeyCredentialAssertion {
  readonly attachment: interop.Enum<typeof ASAuthorizationPublicKeyCredentialAttachment>;

  readonly largeBlob: ASAuthorizationPublicKeyCredentialLargeBlobAssertionOutput;

  readonly prf: ASAuthorizationPublicKeyCredentialPRFAssertionOutput;

  readonly rawAuthenticatorData: NSData;

  readonly userID: NSData;

  readonly signature: NSData;

  readonly rawClientDataJSON: NSData;

  readonly credentialID: NSData;

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

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ASAuthorizationProviderExtensionUserLoginConfiguration extends NSObject {
  loginUserName: string;

  initWithLoginUserName(loginUserName: string): this;

  setCustomAssertionRequestHeaderClaimsReturningError(claims: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, error: interop.PointerConvertible): boolean;

  setCustomAssertionRequestBodyClaimsReturningError(claims: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, error: interop.PointerConvertible): boolean;

  setCustomLoginRequestHeaderClaimsReturningError(claims: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, error: interop.PointerConvertible): boolean;

  setCustomLoginRequestBodyClaimsReturningError(claims: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, error: interop.PointerConvertible): boolean;

  setLoginUserName(loginUserName: string): void;
}

declare class ASPasskeyCredentialRequestParameters extends NSObject implements NSSecureCoding, NSCopying {
  readonly relyingPartyIdentifier: string;

  readonly clientDataHash: NSData;

  readonly userVerificationPreference: string;

  readonly allowedCredentials: NSArray;

  readonly extensionInput: ASPasskeyAssertionCredentialExtensionInput;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class ASAuthorizationSecurityKeyPublicKeyCredentialRegistration extends NSObject implements ASAuthorizationPublicKeyCredentialRegistration {
  readonly transports: NSArray;

  readonly rawAttestationObject: NSData;

  readonly rawClientDataJSON: NSData;

  readonly credentialID: NSData;

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

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ASAuthorizationAppleIDButton extends NSControl implements NSAccessibilityButton {
  static buttonWithTypeStyle<This extends abstract new (...args: any) => any>(this: This, type: interop.Enum<typeof ASAuthorizationAppleIDButtonType>, style: interop.Enum<typeof ASAuthorizationAppleIDButtonStyle>): InstanceType<This>;

  initWithAuthorizationButtonTypeAuthorizationButtonStyle(type: interop.Enum<typeof ASAuthorizationAppleIDButtonType>, style: interop.Enum<typeof ASAuthorizationAppleIDButtonStyle>): this;

  cornerRadius: number;

  setCornerRadius(cornerRadius: number): void;

  accessibilityLabel: string;

  accessibilityPerformPress(): boolean;

  accessibilityFrame: CGRect;

  accessibilityParent: interop.Object;

  isAccessibilityFocused(): boolean;

  accessibilityIdentifier: string;

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

declare class ASPasswordCredentialRequest extends NSObject implements ASCredentialRequest {
  initWithCredentialIdentity(credentialIdentity: ASPasswordCredentialIdentity): this;

  static requestWithCredentialIdentity<This extends abstract new (...args: any) => any>(this: This, credentialIdentity: ASPasswordCredentialIdentity): InstanceType<This>;

  readonly type: interop.Enum<typeof ASCredentialRequestType>;

  readonly credentialIdentity: ASCredentialIdentity;

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

declare class ASAuthorizationPublicKeyCredentialLargeBlobAssertionInput extends NSObject {
  initWithOperation(operation: interop.Enum<typeof ASAuthorizationPublicKeyCredentialLargeBlobAssertionOperation>): this;

  readonly operation: interop.Enum<typeof ASAuthorizationPublicKeyCredentialLargeBlobAssertionOperation>;

  dataToWrite: NSData;

  setDataToWrite(dataToWrite: NSData | null): void;
}

declare class ASAuthorizationPublicKeyCredentialPRFAssertionOutput extends NSObject {
  readonly first: NSData;

  readonly second: NSData;
}

declare class ASAuthorizationPlatformPublicKeyCredentialProvider extends NSObject implements ASAuthorizationProvider {
  initWithRelyingPartyIdentifier(relyingPartyIdentifier: string): this;

  createCredentialRegistrationRequestWithChallengeNameUserID(challenge: NSData, name: string, userID: NSData): ASAuthorizationPlatformPublicKeyCredentialRegistrationRequest;

  createCredentialRegistrationRequestWithChallengeNameUserIDRequestStyle(challenge: NSData, name: string, userID: NSData, requestStyle: interop.Enum<typeof ASAuthorizationPlatformPublicKeyCredentialRegistrationRequestStyle>): ASAuthorizationPlatformPublicKeyCredentialRegistrationRequest;

  createCredentialAssertionRequestWithChallenge(challenge: NSData): ASAuthorizationPlatformPublicKeyCredentialAssertionRequest;

  readonly relyingPartyIdentifier: string;

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

declare class ASPasskeyRegistrationCredentialExtensionOutput extends NSObject implements NSCopying, NSSecureCoding {
  initWithLargeBlobOutput(largeBlob: ASAuthorizationPublicKeyCredentialLargeBlobRegistrationOutput | null): this;

  readonly largeBlobRegistrationOutput: ASAuthorizationPublicKeyCredentialLargeBlobRegistrationOutput;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ASPasskeyCredentialRequest extends NSObject implements ASCredentialRequest {
  initWithCredentialIdentityClientDataHashUserVerificationPreferenceSupportedAlgorithms(credentialIdentity: ASPasskeyCredentialIdentity, clientDataHash: NSData, userVerificationPreference: string, supportedAlgorithms: NSArray<interop.Object> | Array<interop.Object>): this;

  initWithCredentialIdentityClientDataHashUserVerificationPreferenceSupportedAlgorithmsAssertionExtensionInput(credentialIdentity: ASPasskeyCredentialIdentity, clientDataHash: NSData, userVerificationPreference: string, supportedAlgorithms: NSArray<interop.Object> | Array<interop.Object>, assertionExtensionInput: ASPasskeyAssertionCredentialExtensionInput | null): this;

  initWithCredentialIdentityClientDataHashUserVerificationPreferenceSupportedAlgorithmsRegistrationExtensionInput(credentialIdentity: ASPasskeyCredentialIdentity, clientDataHash: NSData, userVerificationPreference: string, supportedAlgorithms: NSArray<interop.Object> | Array<interop.Object>, registrationExtensionInput: ASPasskeyRegistrationCredentialExtensionInput | null): this;

  static requestWithCredentialIdentityClientDataHashUserVerificationPreferenceSupportedAlgorithms<This extends abstract new (...args: any) => any>(this: This, credentialIdentity: ASPasskeyCredentialIdentity, clientDataHash: NSData, userVerificationPreference: string, supportedAlgorithms: NSArray<interop.Object> | Array<interop.Object>): InstanceType<This>;

  readonly clientDataHash: NSData;

  userVerificationPreference: string;

  readonly supportedAlgorithms: NSArray;

  readonly excludedCredentials: NSArray;

  readonly assertionExtensionInput: ASPasskeyAssertionCredentialExtensionInput;

  readonly registrationExtensionInput: ASPasskeyRegistrationCredentialExtensionInput;

  setUserVerificationPreference(userVerificationPreference: string): void;

  readonly type: interop.Enum<typeof ASCredentialRequestType>;

  readonly credentialIdentity: ASCredentialIdentity;

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

declare class ASWebAuthenticationSession extends NSObject {
  initWithURLCallbackURLSchemeCompletionHandler(URL: NSURL, callbackURLScheme: string | null, completionHandler: (p1: NSURL, p2: NSError) => void): this;

  initWithURLCallbackCompletionHandler(URL: NSURL, callback: ASWebAuthenticationSessionCallback, completionHandler: (p1: NSURL, p2: NSError) => void): this;

  presentationContextProvider: ASWebAuthenticationPresentationContextProviding | null;

  prefersEphemeralWebBrowserSession: boolean;

  get additionalHeaderFields(): NSDictionary;
  set additionalHeaderFields(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  readonly canStart: boolean;

  start(): boolean;

  cancel(): void;

  setPresentationContextProvider(presentationContextProvider: ASWebAuthenticationPresentationContextProviding | null): void;

  setPrefersEphemeralWebBrowserSession(prefersEphemeralWebBrowserSession: boolean): void;

  setAdditionalHeaderFields(additionalHeaderFields: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): void;
}


/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const LATouchIDAuthenticationMaximumAllowableReuseDuration: number;

declare const LAErrorDomain: string;

declare const LARightState: {
  Unknown: 0,
  Authorizing: 1,
  Authorized: 2,
  NotAuthorized: 3,
};

declare const LAError: {
  AuthenticationFailed: -1,
  UserCancel: -2,
  UserFallback: -3,
  SystemCancel: -4,
  PasscodeNotSet: -5,
  TouchIDNotAvailable: -6,
  TouchIDNotEnrolled: -7,
  TouchIDLockout: -8,
  AppCancel: -9,
  InvalidContext: -10,
  BiometryNotAvailable: -6,
  BiometryNotEnrolled: -7,
  BiometryLockout: -8,
  NotInteractive: -1004,
  WatchNotAvailable: -11,
  CompanionNotAvailable: -11,
  BiometryNotPaired: -12,
  BiometryDisconnected: -13,
  InvalidDimensions: -14,
};

declare const LAPolicy: {
  WithBiometrics: 1,
  LAPolicyDeviceOwnerAuthentication: 2,
  WithWatch: 3,
  WithCompanion: 3,
  WithBiometricsOrWatch: 4,
  WithBiometricsOrCompanion: 4,
};

declare const LACredentialType: {
  ApplicationPassword: 0,
  SmartCardPIN: -3,
};

declare const LABiometryType: {
  TypeNone: 0,
  None: 0,
  TypeTouchID: 1,
  TypeFaceID: 2,
  TypeOpticID: 4,
};

declare const LAAccessControlOperation: {
  CreateItem: 0,
  UseItem: 1,
  CreateKey: 2,
  UseKeySign: 3,
  UseKeyDecrypt: 4,
  UseKeyKeyExchange: 5,
};

declare const LACompanionType: {
  LACompanionTypeWatch: 1,
};

declare interface LAEnvironmentObserver extends NSObjectProtocol {
  environmentStateDidChangeFromOldState?(environment: LAEnvironment, oldState: LAEnvironmentState): void;
}

declare class LAEnvironmentObserver extends NativeObject implements LAEnvironmentObserver {
}

declare class LASecret extends NSObject {
  loadDataWithCompletion(handler: (p1: NSData, p2: NSError) => void | null): void;
}

declare class LARightStore extends NSObject {
  static readonly sharedStore: LARightStore;

  rightForIdentifierCompletion(identifier: string, handler: (p1: LAPersistedRight, p2: NSError) => void | null): void;

  saveRightIdentifierCompletion(right: LARight, identifier: string, handler: (p1: LAPersistedRight, p2: NSError) => void | null): void;

  saveRightIdentifierSecretCompletion(right: LARight, identifier: string, secret: NSData, handler: (p1: LAPersistedRight, p2: NSError) => void | null): void;

  removeRightCompletion(right: LAPersistedRight, handler: (p1: NSError) => void | null): void;

  removeRightForIdentifierCompletion(identifier: string, handler: (p1: NSError) => void | null): void;

  removeAllRightsWithCompletion(handler: (p1: NSError) => void | null): void;
}

declare class LABiometryFallbackRequirement extends NSObject {
  static readonly defaultRequirement: LABiometryFallbackRequirement;

  static readonly devicePasscodeRequirement: LABiometryFallbackRequirement;
}

declare class LAPublicKey extends NSObject {
  exportBytesWithCompletion(handler: (p1: NSData, p2: NSError) => void | null): void;

  encryptDataSecKeyAlgorithmCompletion(data: NSData, algorithm: interop.PointerConvertible, handler: (p1: NSData, p2: NSError) => void | null): void;

  canEncryptUsingSecKeyAlgorithm(algorithm: interop.PointerConvertible): boolean;

  verifyDataSignatureSecKeyAlgorithmCompletion(signedData: NSData, signature: NSData, algorithm: interop.PointerConvertible, handler: (p1: NSError) => void | null): void;

  canVerifyUsingSecKeyAlgorithm(algorithm: interop.PointerConvertible): boolean;
}

declare class LAPrivateKey extends NSObject {
  readonly publicKey: LAPublicKey;

  signDataSecKeyAlgorithmCompletion(data: NSData, algorithm: interop.PointerConvertible, handler: (p1: NSData, p2: NSError) => void | null): void;

  canSignUsingSecKeyAlgorithm(algorithm: interop.PointerConvertible): boolean;

  decryptDataSecKeyAlgorithmCompletion(data: NSData, algorithm: interop.PointerConvertible, handler: (p1: NSData, p2: NSError) => void | null): void;

  canDecryptUsingSecKeyAlgorithm(algorithm: interop.PointerConvertible): boolean;

  exchangeKeysWithPublicKeySecKeyAlgorithmSecKeyParametersCompletion(publicKey: NSData, algorithm: interop.PointerConvertible, parameters: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, handler: (p1: NSData, p2: NSError) => void | null): void;

  canExchangeKeysUsingSecKeyAlgorithm(algorithm: interop.PointerConvertible): boolean;
}

declare class LAPersistedRight extends LARight {
  readonly key: LAPrivateKey;

  readonly secret: LASecret;
}

declare class LARight extends NSObject {
  readonly state: interop.Enum<typeof LARightState>;

  tag: number;

  init(): this;

  initWithRequirement(requirement: LAAuthenticationRequirement): this;

  authorizeWithLocalizedReasonCompletion(localizedReason: string, handler: (p1: NSError) => void | null): void;

  checkCanAuthorizeWithCompletion(handler: (p1: NSError) => void | null): void;

  deauthorizeWithCompletion(handler: () => void): void;

  setTag(tag: number): void;

  authorizeWithLocalizedReasonInPresentationContextCompletion(localizedReason: string, presentationContext: NSWindow, handler: (p1: NSError) => void | null): void;
}

declare class LAEnvironmentMechanismCompanion extends LAEnvironmentMechanism {
  readonly type: interop.Enum<typeof LACompanionType>;

  readonly stateHash: NSData;
}

declare class LAEnvironmentMechanismBiometry extends LAEnvironmentMechanism {
  readonly biometryType: interop.Enum<typeof LABiometryType>;

  readonly isEnrolled: boolean;

  readonly isLockedOut: boolean;

  readonly stateHash: NSData;

  readonly builtInSensorInaccessible: boolean;
}

declare class LADomainStateCompanion extends NSObject {
  readonly availableCompanionTypes: NSSet;

  readonly stateHash: NSData;

  stateHashForCompanionType(companionType: interop.Enum<typeof LACompanionType>): NSData | null;
}

declare class LADomainStateBiometry extends NSObject {
  readonly biometryType: interop.Enum<typeof LABiometryType>;

  readonly stateHash: NSData;
}

declare class LAContext extends NSObject {
  canEvaluatePolicyError(policy: interop.Enum<typeof LAPolicy>, error: interop.PointerConvertible): boolean;

  evaluatePolicyLocalizedReasonReply(policy: interop.Enum<typeof LAPolicy>, localizedReason: string, reply: (p1: boolean, p2: NSError) => void | null): void;

  invalidate(): void;

  setCredentialType(credential: NSData | null, type: interop.Enum<typeof LACredentialType>): boolean;

  isCredentialSet(type: interop.Enum<typeof LACredentialType>): boolean;

  evaluateAccessControlOperationLocalizedReasonReply(accessControl: interop.Object, operation: interop.Enum<typeof LAAccessControlOperation>, localizedReason: string, reply: (p1: boolean, p2: NSError) => void | null): void;

  localizedFallbackTitle: string;

  maxBiometryFailures: NSNumber;

  localizedCancelTitle: string;

  touchIDAuthenticationAllowableReuseDuration: number;

  localizedReason: string;

  interactionNotAllowed: boolean;

  readonly biometryType: interop.Enum<typeof LABiometryType>;

  readonly evaluatedPolicyDomainState: NSData;

  readonly domainState: LADomainState;

  setLocalizedFallbackTitle(localizedFallbackTitle: string | null): void;

  setMaxBiometryFailures(maxBiometryFailures: NSNumber | null): void;

  setLocalizedCancelTitle(localizedCancelTitle: string | null): void;

  setTouchIDAuthenticationAllowableReuseDuration(touchIDAuthenticationAllowableReuseDuration: number): void;

  setLocalizedReason(localizedReason: string): void;

  setInteractionNotAllowed(interactionNotAllowed: boolean): void;
}

declare class LAEnvironmentMechanismUserPassword extends LAEnvironmentMechanism {
  readonly isSet: boolean;
}

declare class LAEnvironment extends NSObject {
  addObserver(observer: LAEnvironmentObserver): void;

  removeObserver(observer: LAEnvironmentObserver): void;

  static readonly currentUser: LAEnvironment;

  readonly state: LAEnvironmentState;
}

declare class LAEnvironmentMechanism extends NSObject {
  readonly isUsable: boolean;

  readonly localizedName: string;

  readonly iconSystemName: string;
}

declare class LAAuthenticationRequirement extends NSObject {
  static readonly defaultRequirement: LAAuthenticationRequirement;

  static readonly biometryRequirement: LAAuthenticationRequirement;

  static readonly biometryCurrentSetRequirement: LAAuthenticationRequirement;

  static biometryRequirementWithFallback<This extends abstract new (...args: any) => any>(this: This, fallback: LABiometryFallbackRequirement): InstanceType<This>;
}

declare class LAEnvironmentState extends NSObject implements NSCopying {
  readonly biometry: LAEnvironmentMechanismBiometry;

  readonly userPassword: LAEnvironmentMechanismUserPassword;

  readonly companions: NSArray;

  readonly allMechanisms: NSArray;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class LADomainState extends NSObject {
  readonly biometry: LADomainStateBiometry;

  readonly companion: LADomainStateCompanion;

  readonly stateHash: NSData;
}


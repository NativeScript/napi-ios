/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const VSErrorInfoKeyUnsupportedProviderIdentifier: string;

declare const VSErrorInfoKeyAccountProviderResponse: string;

declare const VSErrorInfoKeySAMLResponse: string;

declare const VSErrorDomain: string;

declare const VSCheckAccessOptionPrompt: string;

declare const VSOpenTVProviderSettingsURLString: string;

declare const VSAccountProviderAuthenticationSchemeSAML: string;

declare const VSErrorInfoKeySAMLResponseStatus: string;

declare const VSAccountProviderAuthenticationSchemeAPI: string;

declare const VSOriginatingDeviceCategory: {
  Mobile: 0,
  Other: 1,
};

declare const VSSubscriptionAccessLevel: {
  Unknown: 0,
  FreeWithAccount: 1,
  Paid: 2,
};

declare const VSUserAccountQueryOptions: {
  None: 0,
  AllDevices: 1,
};

declare const VSAccountAccessStatus: {
  NotDetermined: 0,
  Restricted: 1,
  Denied: 2,
  Granted: 3,
};

declare const VSUserAccountType: {
  Free: 0,
  Paid: 1,
};

declare const VSErrorCode: {
  AccessNotGranted: 0,
  UnsupportedProvider: 1,
  UserCancelled: 2,
  ServiceTemporarilyUnavailable: 3,
  ProviderRejected: 4,
  InvalidVerificationToken: 5,
  Rejected: 6,
  Unsupported: 7,
};

declare interface VSAccountManagerDelegate extends NSObjectProtocol {
  accountManagerPresentViewController(accountManager: VSAccountManager, viewController: UIViewController): void;

  accountManagerDismissViewController(accountManager: VSAccountManager, viewController: UIViewController): void;

  accountManagerShouldAuthenticateAccountProviderWithIdentifier?(accountManager: VSAccountManager, accountProviderIdentifier: string): boolean;
}

declare class VSAccountManagerDelegate extends NativeObject implements VSAccountManagerDelegate {
}

declare class VSUserAccountManager extends NSObject {
  static readonly sharedUserAccountManager: VSUserAccountManager;

  updateUserAccountCompletion(account: VSUserAccount, completion: (p1: NSError) => void | null): void;

  queryUserAccountsWithOptionsCompletion(options: interop.Enum<typeof VSUserAccountQueryOptions>, completion: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): void;
}

declare class VSAccountMetadataRequest extends NSObject {
  channelIdentifier: string;

  get supportedAccountProviderIdentifiers(): NSArray;
  set supportedAccountProviderIdentifiers(value: NSArray<interop.Object> | Array<interop.Object>);

  get featuredAccountProviderIdentifiers(): NSArray;
  set featuredAccountProviderIdentifiers(value: NSArray<interop.Object> | Array<interop.Object>);

  verificationToken: string;

  includeAccountProviderIdentifier: boolean;

  includeAuthenticationExpirationDate: boolean;

  localizedVideoTitle: string;

  interruptionAllowed: boolean;

  forceAuthentication: boolean;

  get attributeNames(): NSArray;
  set attributeNames(value: NSArray<interop.Object> | Array<interop.Object>);

  get supportedAuthenticationSchemes(): NSArray;
  set supportedAuthenticationSchemes(value: NSArray<interop.Object> | Array<interop.Object>);

  accountProviderAuthenticationToken: string;

  get applicationAccountProviders(): NSArray;
  set applicationAccountProviders(value: NSArray<interop.Object> | Array<interop.Object>);

  setChannelIdentifier(channelIdentifier: string | null): void;

  setSupportedAccountProviderIdentifiers(supportedAccountProviderIdentifiers: NSArray<interop.Object> | Array<interop.Object>): void;

  setFeaturedAccountProviderIdentifiers(featuredAccountProviderIdentifiers: NSArray<interop.Object> | Array<interop.Object>): void;

  setVerificationToken(verificationToken: string | null): void;

  setIncludeAccountProviderIdentifier(includeAccountProviderIdentifier: boolean): void;

  setIncludeAuthenticationExpirationDate(includeAuthenticationExpirationDate: boolean): void;

  setLocalizedVideoTitle(localizedVideoTitle: string | null): void;

  isInterruptionAllowed(): boolean;

  setInterruptionAllowed(interruptionAllowed: boolean): void;

  setForceAuthentication(forceAuthentication: boolean): void;

  setAttributeNames(attributeNames: NSArray<interop.Object> | Array<interop.Object>): void;

  setSupportedAuthenticationSchemes(supportedAuthenticationSchemes: NSArray<interop.Object> | Array<interop.Object>): void;

  setAccountProviderAuthenticationToken(accountProviderAuthenticationToken: string | null): void;

  setApplicationAccountProviders(applicationAccountProviders: NSArray<interop.Object> | Array<interop.Object> | null): void;
}

declare class VSAccountMetadata extends NSObject {
  readonly accountProviderIdentifier: string;

  readonly authenticationExpirationDate: NSDate;

  readonly verificationData: NSData;

  readonly SAMLAttributeQueryResponse: string;

  readonly accountProviderResponse: VSAccountProviderResponse;
}

declare class VSAccountApplicationProvider extends NSObject {
  initWithLocalizedDisplayNameIdentifier(localizedDisplayName: string, identifier: string): this;

  readonly localizedDisplayName: string;

  readonly identifier: string;
}

declare class VSUserAccount extends NSObject {
  updateURL: NSURL;

  requiresSystemTrust: boolean;

  accountProviderIdentifier: string;

  identifier: string;

  accountType: interop.Enum<typeof VSUserAccountType>;

  signedOut: boolean;

  subscriptionBillingCycleEndDate: NSDate;

  get tierIdentifiers(): NSArray;
  set tierIdentifiers(value: NSArray<interop.Object> | Array<interop.Object>);

  billingIdentifier: string;

  authenticationData: string;

  readonly fromCurrentDevice: boolean;

  readonly deviceCategory: interop.Enum<typeof VSOriginatingDeviceCategory>;

  appleSubscription: VSAppleSubscription;

  initWithAccountTypeUpdateURL(accountType: interop.Enum<typeof VSUserAccountType>, url: NSURL | null): this;

  setUpdateURL(updateURL: NSURL | null): void;

  setRequiresSystemTrust(requiresSystemTrust: boolean): void;

  setAccountProviderIdentifier(accountProviderIdentifier: string | null): void;

  setIdentifier(identifier: string | null): void;

  setAccountType(accountType: interop.Enum<typeof VSUserAccountType>): void;

  isSignedOut(): boolean;

  setSignedOut(signedOut: boolean): void;

  setSubscriptionBillingCycleEndDate(subscriptionBillingCycleEndDate: NSDate | null): void;

  setTierIdentifiers(tierIdentifiers: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setBillingIdentifier(billingIdentifier: string | null): void;

  setAuthenticationData(authenticationData: string | null): void;

  isFromCurrentDevice(): boolean;

  setAppleSubscription(appleSubscription: VSAppleSubscription | null): void;
}

declare class VSSubscription extends NSObject {
  expirationDate: NSDate;

  accessLevel: interop.Enum<typeof VSSubscriptionAccessLevel>;

  get tierIdentifiers(): NSArray;
  set tierIdentifiers(value: NSArray<interop.Object> | Array<interop.Object>);

  billingIdentifier: string;

  setExpirationDate(expirationDate: NSDate | null): void;

  setAccessLevel(accessLevel: interop.Enum<typeof VSSubscriptionAccessLevel>): void;

  setTierIdentifiers(tierIdentifiers: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setBillingIdentifier(billingIdentifier: string | null): void;
}

declare class VSAccountManagerResult extends NSObject {
  cancel(): void;
}

declare class VSSubscriptionRegistrationCenter extends NSObject {
  static defaultSubscriptionRegistrationCenter(): VSSubscriptionRegistrationCenter;

  setCurrentSubscription(currentSubscription: VSSubscription | null): void;
}

declare class VSAccountProviderResponse extends NSObject {
  readonly authenticationScheme: string;

  readonly status: string;

  readonly body: string;
}

declare class VSAccountManager extends NSObject {
  delegate: VSAccountManagerDelegate | null;

  checkAccessStatusWithOptionsCompletionHandler(options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, completionHandler: (p1: interop.Enum<typeof VSAccountAccessStatus>, p2: NSError) => void | null): void;

  enqueueAccountMetadataRequestCompletionHandler(request: VSAccountMetadataRequest, completionHandler: (p1: VSAccountMetadata, p2: NSError) => void | null): VSAccountManagerResult;

  setDelegate(delegate: VSAccountManagerDelegate | null): void;
}

declare class VSAppleSubscription extends NSObject {
  customerID: string;

  get productCodes(): NSArray;
  set productCodes(value: NSArray<interop.Object> | Array<interop.Object>);

  initWithCustomerIDProductCodes(customerID: string, productCodes: NSArray<interop.Object> | Array<interop.Object>): this;

  setCustomerID(customerID: string): void;

  setProductCodes(productCodes: NSArray<interop.Object> | Array<interop.Object>): void;
}


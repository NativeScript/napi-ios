/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const ACErrorDomain: string;

declare const ACTencentWeiboAppIdKey: string;

declare const ACFacebookAudienceOnlyMe: string;

declare const ACFacebookAudienceEveryone: string;

declare const ACFacebookAudienceKey: string;

declare const ACFacebookPermissionsKey: string;

declare const ACAccountTypeIdentifierTencentWeibo: string;

declare const ACAccountTypeIdentifierSinaWeibo: string;

declare const ACFacebookAppIdKey: string;

declare const ACAccountStoreDidChangeNotification: string;

declare const ACAccountTypeIdentifierFacebook: string;

declare const ACFacebookAudienceFriends: string;

declare const ACAccountTypeIdentifierTwitter: string;

declare const ACErrorCode: {
  Unknown: 1,
  AccountMissingRequiredProperty: 2,
  AccountAuthenticationFailed: 3,
  AccountTypeInvalid: 4,
  AccountAlreadyExists: 5,
  AccountNotFound: 6,
  PermissionDenied: 7,
  AccessInfoInvalid: 8,
  ClientPermissionDenied: 9,
  AccessDeniedByProtectionPolicy: 10,
  CredentialNotFound: 11,
  FetchCredentialFailed: 12,
  StoreCredentialFailed: 13,
  RemoveCredentialFailed: 14,
  UpdatingNonexistentAccount: 15,
  InvalidClientBundleID: 16,
  DeniedByPlugin: 17,
  CoreDataSaveFailed: 18,
  FailedSerializingAccountInfo: 19,
  InvalidCommand: 20,
  MissingTransportMessageID: 21,
  CredentialItemNotFound: 22,
  CredentialItemNotExpired: 23,
};

declare const ACAccountCredentialRenewResult: {
  Renewed: 0,
  Rejected: 1,
  Failed: 2,
};

declare class ACAccount extends NSObject {
  initWithAccountType(type: ACAccountType): this;

  readonly identifier: string;

  accountType: ACAccountType;

  accountDescription: string;

  username: string;

  readonly userFullName: string;

  credential: ACAccountCredential;

  setAccountType(accountType: ACAccountType): void;

  setAccountDescription(accountDescription: string): void;

  setUsername(username: string): void;

  setCredential(credential: ACAccountCredential): void;
}

declare class ACAccountType extends NSObject {
  readonly accountTypeDescription: string;

  readonly identifier: string;

  readonly accessGranted: boolean;
}

declare class ACAccountStore extends NSObject {
  readonly accounts: NSArray;

  accountWithIdentifier(identifier: string): ACAccount;

  accountTypeWithAccountTypeIdentifier(typeIdentifier: string): ACAccountType;

  accountsWithAccountType(accountType: ACAccountType): NSArray;

  saveAccountWithCompletionHandler(account: ACAccount, completionHandler: (p1: boolean, p2: NSError) => void): void;

  requestAccessToAccountsWithTypeWithCompletionHandler(accountType: ACAccountType, handler: (p1: boolean, p2: NSError) => void): void;

  requestAccessToAccountsWithTypeOptionsCompletion(accountType: ACAccountType, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, completion: (p1: boolean, p2: NSError) => void): void;

  renewCredentialsForAccountCompletion(account: ACAccount, completionHandler: (p1: interop.Enum<typeof ACAccountCredentialRenewResult>, p2: NSError) => void): void;

  removeAccountWithCompletionHandler(account: ACAccount, completionHandler: (p1: boolean, p2: NSError) => void): void;
}

declare class ACAccountCredential extends NSObject {
  initWithOAuthTokenTokenSecret(token: string, secret: string): this;

  initWithOAuth2TokenRefreshTokenExpiryDate(token: string, refreshToken: string, expiryDate: NSDate): this;

  oauthToken: string;

  setOauthToken(oauthToken: string): void;
}


/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./UIKit.d.ts" />

declare const SKStoreProductParameterAdNetworkAttributionSignature: string;

declare const SKStoreProductParameterCampaignToken: string;

declare const SKStoreProductParameterAffiliateToken: string;

declare const SKStoreProductParameterCustomProductPageIdentifier: string;

declare const SKStoreProductParameterProductIdentifier: string;

declare const SKStoreProductParameterITunesItemIdentifier: string;

declare const SKReceiptPropertyIsVolumePurchase: string;

declare const SKErrorDomain: string;

declare const SKDownloadTimeRemainingUnknown: number;

declare const SKCloudServiceSetupMessageIdentifierPlayMusic: string;

declare const SKCloudServiceSetupMessageIdentifierConnect: string;

declare const SKCloudServiceSetupMessageIdentifierJoin: string;

declare const SKCloudServiceSetupOptionsITunesItemIdentifierKey: string;

declare const SKCloudServiceSetupOptionsActionKey: string;

declare const SKStoreProductParameterAdNetworkVersion: string;

declare const SKStoreProductParameterAdNetworkSourceAppStoreIdentifier: string;

declare const SKStoreProductParameterAdNetworkTimestamp: string;

declare const SKStoreProductParameterAdNetworkNonce: string;

declare const SKStoreProductParameterAdNetworkIdentifier: string;

declare const SKStoreProductParameterAdNetworkCampaignIdentifier: string;

declare const SKAdNetworkCoarseConversionValueHigh: string;

declare const SKCloudServiceSetupMessageIdentifierAddMusic: string;

declare const SKStorefrontIdentifierDidChangeNotification: string;

declare const SKCloudServiceSetupOptionsCampaignTokenKey: string;

declare const SKCloudServiceSetupOptionsAffiliateTokenKey: string;

declare const SKANErrorDomain: string;

declare const SKStoreProductParameterAdNetworkSourceIdentifier: string;

declare const SKCloudServiceSetupOptionsMessageIdentifierKey: string;

declare const SKStoreProductParameterAdvertisingPartnerToken: string;

declare const SKAdNetworkCoarseConversionValueMedium: string;

declare const SKStoreProductParameterProviderToken: string;

declare const SKCloudServiceCapabilitiesDidChangeNotification: string;

declare const SKAdNetworkCoarseConversionValueLow: string;

declare const SKReceiptPropertyIsRevoked: string;

declare const SKStorefrontCountryCodeDidChangeNotification: string;

declare const SKReceiptPropertyIsExpired: string;

declare const SKCloudServiceSetupActionSubscribe: string;

declare const SKProductStorePromotionVisibility: {
  Default: 0,
  Show: 1,
  Hide: 2,
};

declare const SKProductPeriodUnit: {
  Day: 0,
  Week: 1,
  Month: 2,
  Year: 3,
};

declare const SKDownloadState: {
  Waiting: 0,
  Active: 1,
  Paused: 2,
  Finished: 3,
  Failed: 4,
  Cancelled: 5,
};

declare const SKCloudServiceCapability: {
  None: 0,
  MusicCatalogPlayback: 1,
  MusicCatalogSubscriptionEligible: 2,
  AddToCloudMusicLibrary: 256,
};

declare const SKErrorCode: {
  Unknown: 0,
  ClientInvalid: 1,
  PaymentCancelled: 2,
  PaymentInvalid: 3,
  PaymentNotAllowed: 4,
  StoreProductNotAvailable: 5,
  CloudServicePermissionDenied: 6,
  CloudServiceNetworkConnectionFailed: 7,
  CloudServiceRevoked: 8,
  PrivacyAcknowledgementRequired: 9,
  UnauthorizedRequestData: 10,
  InvalidOfferIdentifier: 11,
  InvalidSignature: 12,
  MissingOfferParams: 13,
  InvalidOfferPrice: 14,
  OverlayCancelled: 15,
  OverlayInvalidConfiguration: 16,
  OverlayTimeout: 17,
  IneligibleForOffer: 18,
  UnsupportedPlatform: 19,
  OverlayPresentedInBackgroundScene: 20,
};

declare const SKCloudServiceAuthorizationStatus: {
  NotDetermined: 0,
  Denied: 1,
  Restricted: 2,
  Authorized: 3,
};

declare const SKOverlayPosition: {
  SKOverlayPositionBottom: 0,
  Raised: 1,
};

declare const SKANError: {
  ImpressionMissingRequiredValue: 0,
  Unsupported: 1,
  AdNetworkIdMissing: 2,
  MismatchedSourceAppId: 3,
  ImpressionNotFound: 4,
  InvalidCampaignId: 5,
  InvalidConversionValue: 6,
  InvalidSourceAppId: 7,
  InvalidAdvertisedAppId: 8,
  InvalidVersion: 9,
  Unknown: 10,
  ImpressionTooShort: 11,
};

declare const SKProductDiscountPaymentMode: {
  PayAsYouGo: 0,
  PayUpFront: 1,
  FreeTrial: 2,
};

declare const SKPaymentTransactionState: {
  Purchasing: 0,
  Purchased: 1,
  Failed: 2,
  Restored: 3,
  Deferred: 4,
};

declare const SKProductDiscountType: {
  Introductory: 0,
  Subscription: 1,
};

declare function SKTerminateForInvalidReceipt(): void;

declare interface SKPaymentTransactionObserver extends NSObjectProtocol {
  paymentQueueUpdatedTransactions(queue: SKPaymentQueue, transactions: NSArray<interop.Object> | Array<interop.Object>): void;

  paymentQueueRemovedTransactions?(queue: SKPaymentQueue, transactions: NSArray<interop.Object> | Array<interop.Object>): void;

  paymentQueueRestoreCompletedTransactionsFailedWithError?(queue: SKPaymentQueue, error: NSError): void;

  paymentQueueRestoreCompletedTransactionsFinished?(queue: SKPaymentQueue): void;

  paymentQueueUpdatedDownloads?(queue: SKPaymentQueue, downloads: NSArray<interop.Object> | Array<interop.Object>): void;

  paymentQueueShouldAddStorePaymentForProduct?(queue: SKPaymentQueue, payment: SKPayment, product: SKProduct): boolean;

  paymentQueueDidChangeStorefront?(queue: SKPaymentQueue): void;

  paymentQueueDidRevokeEntitlementsForProductIdentifiers?(queue: SKPaymentQueue, productIdentifiers: NSArray<interop.Object> | Array<interop.Object>): void;
}

declare class SKPaymentTransactionObserver extends NativeObject implements SKPaymentTransactionObserver {
}

declare interface SKOverlayDelegate extends NSObjectProtocol {
  storeOverlayDidFailToLoadWithError?(overlay: SKOverlay, error: NSError): void;

  storeOverlayWillStartPresentation?(overlay: SKOverlay, transitionContext: SKOverlayTransitionContext): void;

  storeOverlayDidFinishPresentation?(overlay: SKOverlay, transitionContext: SKOverlayTransitionContext): void;

  storeOverlayWillStartDismissal?(overlay: SKOverlay, transitionContext: SKOverlayTransitionContext): void;

  storeOverlayDidFinishDismissal?(overlay: SKOverlay, transitionContext: SKOverlayTransitionContext): void;
}

declare class SKOverlayDelegate extends NativeObject implements SKOverlayDelegate {
}

declare interface SKPaymentQueueDelegate extends NSObjectProtocol {
  paymentQueueShouldContinueTransactionInStorefront?(paymentQueue: SKPaymentQueue, transaction: SKPaymentTransaction, newStorefront: SKStorefront): boolean;

  paymentQueueShouldShowPriceConsent?(paymentQueue: SKPaymentQueue): boolean;
}

declare class SKPaymentQueueDelegate extends NativeObject implements SKPaymentQueueDelegate {
}

declare interface SKStoreProductViewControllerDelegate extends NSObjectProtocol {
  productViewControllerDidFinish?(viewController: SKStoreProductViewController): void;
}

declare class SKStoreProductViewControllerDelegate extends NativeObject implements SKStoreProductViewControllerDelegate {
}

declare interface SKProductsRequestDelegate extends SKRequestDelegate {
  productsRequestDidReceiveResponse(request: SKProductsRequest, response: SKProductsResponse): void;
}

declare class SKProductsRequestDelegate extends NativeObject implements SKProductsRequestDelegate {
}

declare interface SKCloudServiceSetupViewControllerDelegate extends NSObjectProtocol {
  cloudServiceSetupViewControllerDidDismiss?(cloudServiceSetupViewController: SKCloudServiceSetupViewController): void;
}

declare class SKCloudServiceSetupViewControllerDelegate extends NativeObject implements SKCloudServiceSetupViewControllerDelegate {
}

declare interface SKDownloaderExtension extends BAManagedDownloaderExtension {
}

declare class SKDownloaderExtension extends NativeObject implements SKDownloaderExtension {
}

declare interface SKRequestDelegate extends NSObjectProtocol {
  requestDidFinish?(request: SKRequest): void;

  requestDidFailWithError?(request: SKRequest, error: NSError): void;
}

declare class SKRequestDelegate extends NativeObject implements SKRequestDelegate {
}

declare class SKPaymentTransaction extends NSObject {
  readonly error: NSError;

  readonly originalTransaction: SKPaymentTransaction;

  readonly payment: SKPayment;

  readonly downloads: NSArray;

  readonly transactionDate: NSDate;

  readonly transactionIdentifier: string;

  readonly transactionReceipt: NSData;

  readonly transactionState: interop.Enum<typeof SKPaymentTransactionState>;
}

declare class SKOverlayConfiguration extends NSObject {
}

declare class SKDownload extends NSObject {
  readonly state: interop.Enum<typeof SKDownloadState>;

  readonly downloadState: interop.Enum<typeof SKDownloadState>;

  readonly contentLength: number;

  readonly expectedContentLength: number;

  readonly contentIdentifier: string;

  readonly contentURL: NSURL;

  readonly contentVersion: string;

  readonly error: NSError;

  readonly progress: number;

  readonly timeRemaining: number;

  readonly transaction: SKPaymentTransaction;
}

declare class SKProductsResponse extends NSObject {
  readonly products: NSArray;

  readonly invalidProductIdentifiers: NSArray;
}

declare class SKCloudServiceSetupViewController extends UIViewController {
  delegate: SKCloudServiceSetupViewControllerDelegate;

  loadWithOptionsCompletionHandler(options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, completionHandler: (p1: boolean, p2: NSError) => void | null): void;

  setDelegate(delegate: SKCloudServiceSetupViewControllerDelegate | null): void;
}

declare class SKStoreReviewController extends NSObject {
  static requestReview(): void;

  static requestReviewInScene(windowScene: UIWindowScene): void;
}

declare class SKStoreProductViewController extends UIViewController {
  delegate: SKStoreProductViewControllerDelegate;

  loadProductWithParametersCompletionBlock(parameters: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, block: (p1: boolean, p2: NSError) => void | null): void;

  loadProductWithParametersImpressionCompletionBlock(parameters: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, impression: SKAdImpression, block: (p1: boolean, p2: NSError) => void | null): void;

  setDelegate(delegate: SKStoreProductViewControllerDelegate): void;
}

declare class SKStorefront extends NSObject {
  readonly countryCode: string;

  readonly identifier: string;
}

declare class SKReceiptRefreshRequest extends SKRequest {
  initWithReceiptProperties(properties: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): this;

  readonly receiptProperties: NSDictionary;
}

declare class SKProductStorePromotionController extends NSObject {
  static defaultController<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  fetchStorePromotionVisibilityForProductCompletionHandler(product: SKProduct, completionHandler: (p1: interop.Enum<typeof SKProductStorePromotionVisibility>, p2: NSError) => void | null): void;

  updateStorePromotionVisibilityForProductCompletionHandler(promotionVisibility: interop.Enum<typeof SKProductStorePromotionVisibility>, product: SKProduct, completionHandler: (p1: NSError) => void | null): void;

  fetchStorePromotionOrderWithCompletionHandler(completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): void;

  updateStorePromotionOrderCompletionHandler(promotionOrder: NSArray<interop.Object> | Array<interop.Object>, completionHandler: (p1: NSError) => void | null): void;
}

declare class SKRequest extends NSObject {
  delegate: SKRequestDelegate;

  cancel(): void;

  start(): void;

  setDelegate(delegate: SKRequestDelegate | null): void;
}

declare class SKProductDiscount extends NSObject {
  readonly price: NSDecimalNumber;

  readonly priceLocale: NSLocale;

  readonly identifier: string;

  readonly subscriptionPeriod: SKProductSubscriptionPeriod;

  readonly numberOfPeriods: number;

  readonly paymentMode: interop.Enum<typeof SKProductDiscountPaymentMode>;

  readonly type: interop.Enum<typeof SKProductDiscountType>;
}

declare class SKProductSubscriptionPeriod extends NSObject {
  readonly numberOfUnits: number;

  readonly unit: interop.Enum<typeof SKProductPeriodUnit>;
}

declare class SKPaymentQueue extends NSObject {
  delegate: SKPaymentQueueDelegate;

  readonly storefront: SKStorefront;

  static defaultQueue<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  static canMakePayments(): boolean;

  addPayment(payment: SKPayment): void;

  restoreCompletedTransactions(): void;

  restoreCompletedTransactionsWithApplicationUsername(username: string | null): void;

  finishTransaction(transaction: SKPaymentTransaction): void;

  startDownloads(downloads: NSArray<interop.Object> | Array<interop.Object>): void;

  pauseDownloads(downloads: NSArray<interop.Object> | Array<interop.Object>): void;

  resumeDownloads(downloads: NSArray<interop.Object> | Array<interop.Object>): void;

  cancelDownloads(downloads: NSArray<interop.Object> | Array<interop.Object>): void;

  addTransactionObserver(observer: SKPaymentTransactionObserver): void;

  removeTransactionObserver(observer: SKPaymentTransactionObserver): void;

  readonly transactionObservers: NSArray;

  readonly transactions: NSArray;

  showPriceConsentIfNeeded(): void;

  presentCodeRedemptionSheet(): void;

  setDelegate(delegate: SKPaymentQueueDelegate | null): void;
}

declare class SKPaymentDiscount extends NSObject {
  initWithIdentifierKeyIdentifierNonceSignatureTimestamp(identifier: string, keyIdentifier: string, nonce: NSUUID, signature: string, timestamp: NSNumber): this;

  readonly identifier: string;

  readonly keyIdentifier: string;

  readonly nonce: NSUUID;

  readonly signature: string;

  readonly timestamp: NSNumber;
}

declare class SKOverlayAppConfiguration extends SKOverlayConfiguration {
  initWithAppIdentifierPosition(appIdentifier: string, position: interop.Enum<typeof SKOverlayPosition>): this;

  appIdentifier: string;

  campaignToken: string;

  providerToken: string;

  customProductPageIdentifier: string;

  latestReleaseID: string;

  position: interop.Enum<typeof SKOverlayPosition>;

  userDismissible: boolean;

  setAdditionalValueForKey(value: interop.Object | null, key: string): void;

  additionalValueForKey(key: string): interop.Object;

  setAdImpression(impression: SKAdImpression): void;

  setAppIdentifier(appIdentifier: string): void;

  setCampaignToken(campaignToken: string | null): void;

  setProviderToken(providerToken: string | null): void;

  setCustomProductPageIdentifier(customProductPageIdentifier: string): void;

  setLatestReleaseID(latestReleaseID: string): void;

  setPosition(position: interop.Enum<typeof SKOverlayPosition>): void;

  setUserDismissible(userDismissible: boolean): void;
}

declare class SKOverlay extends NSObject {
  initWithConfiguration(configuration: SKOverlayConfiguration): this;

  presentInScene(scene: UIWindowScene): void;

  static dismissOverlayInScene(scene: UIWindowScene): void;

  delegate: SKOverlayDelegate;

  readonly configuration: SKOverlayConfiguration;

  setDelegate(delegate: SKOverlayDelegate | null): void;
}

declare class SKCloudServiceController extends NSObject {
  static authorizationStatus(): interop.Enum<typeof SKCloudServiceAuthorizationStatus>;

  static requestAuthorization(completionHandler: (p1: interop.Enum<typeof SKCloudServiceAuthorizationStatus>) => void): void;

  requestCapabilitiesWithCompletionHandler(completionHandler: (p1: interop.Enum<typeof SKCloudServiceCapability>, p2: NSError) => void | null): void;

  requestStorefrontCountryCodeWithCompletionHandler(completionHandler: (p1: string, p2: NSError) => void | null): void;

  requestStorefrontIdentifierWithCompletionHandler(completionHandler: (p1: string, p2: NSError) => void | null): void;

  requestUserTokenForDeveloperTokenCompletionHandler(developerToken: string, completionHandler: (p1: string, p2: NSError) => void | null): void;

  requestPersonalizationTokenForClientTokenWithCompletionHandler(clientToken: string, completionHandler: (p1: string, p2: NSError) => void | null): void;
}

declare class SKArcadeService extends NSObject {
  static registerArcadeAppWithRandomFromLibRandomFromLibLengthResultHandler(randomFromLib: NSData, randomFromLibLength: number, resultHandler: (p1: NSData, p2: number, p3: NSData, p4: number, p5: NSError) => void | null): void;

  static arcadeSubscriptionStatusWithNonceResultHandler(nonce: number, resultHandler: (p1: NSData, p2: number, p3: NSData, p4: number, p5: NSError) => void | null): void;

  static repairArcadeApp(): void;
}

declare class SKAdNetwork extends NSObject {
  static startImpressionCompletionHandler(impression: SKAdImpression, completion: (p1: NSError) => void | null): void;

  static endImpressionCompletionHandler(impression: SKAdImpression, completion: (p1: NSError) => void | null): void;

  static registerAppForAdNetworkAttribution(): void;

  static updateConversionValue(conversionValue: number): void;

  static updatePostbackConversionValueCompletionHandler(conversionValue: number, completion: (p1: NSError) => void | null): void;

  static updatePostbackConversionValueCoarseValueCompletionHandler(fineValue: number, coarseValue: string, completion: (p1: NSError) => void | null): void;

  static updatePostbackConversionValueCoarseValueLockWindowCompletionHandler(fineValue: number, coarseValue: string, lockWindow: boolean, completion: (p1: NSError) => void | null): void;
}

declare class SKAdImpression extends NSObject {
  initWithSourceAppStoreItemIdentifierAdvertisedAppStoreItemIdentifierAdNetworkIdentifierAdCampaignIdentifierAdImpressionIdentifierTimestampSignatureVersion(sourceAppStoreItemIdentifier: NSNumber, advertisedAppStoreItemIdentifier: NSNumber, adNetworkIdentifier: string, adCampaignIdentifier: NSNumber, adImpressionIdentifier: string, timestamp: NSNumber, signature: string, version: string): this;

  sourceAppStoreItemIdentifier: NSNumber;

  advertisedAppStoreItemIdentifier: NSNumber;

  adNetworkIdentifier: string;

  adCampaignIdentifier: NSNumber;

  sourceIdentifier: NSNumber;

  adImpressionIdentifier: string;

  adType: string;

  adDescription: string;

  adPurchaserName: string;

  timestamp: NSNumber;

  signature: string;

  version: string;

  setSourceAppStoreItemIdentifier(sourceAppStoreItemIdentifier: NSNumber): void;

  setAdvertisedAppStoreItemIdentifier(advertisedAppStoreItemIdentifier: NSNumber): void;

  setAdNetworkIdentifier(adNetworkIdentifier: string): void;

  setAdCampaignIdentifier(adCampaignIdentifier: NSNumber): void;

  setSourceIdentifier(sourceIdentifier: NSNumber): void;

  setAdImpressionIdentifier(adImpressionIdentifier: string): void;

  setAdType(adType: string | null): void;

  setAdDescription(adDescription: string | null): void;

  setAdPurchaserName(adPurchaserName: string | null): void;

  setTimestamp(timestamp: NSNumber): void;

  setSignature(signature: string): void;

  setVersion(version: string): void;
}

declare class SKPayment extends NSObject implements NSCopying, NSMutableCopying {
  static paymentWithProduct<This extends abstract new (...args: any) => any>(this: This, product: SKProduct): InstanceType<This>;

  static paymentWithProductIdentifier(identifier: string): interop.Object;

  readonly productIdentifier: string;

  readonly requestData: NSData;

  readonly quantity: number;

  readonly applicationUsername: string;

  readonly simulatesAskToBuyInSandbox: boolean;

  readonly paymentDiscount: SKPaymentDiscount;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  mutableCopyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class SKOverlayTransitionContext extends NSObject {
  addAnimationBlock(block: () => void): void;

  readonly startFrame: CGRect;

  readonly endFrame: CGRect;
}

declare class SKOverlayAppClipConfiguration extends SKOverlayConfiguration {
  initWithPosition(position: interop.Enum<typeof SKOverlayPosition>): this;

  campaignToken: string;

  providerToken: string;

  customProductPageIdentifier: string;

  latestReleaseID: string;

  position: interop.Enum<typeof SKOverlayPosition>;

  setAdditionalValueForKey(value: interop.Object | null, key: string): void;

  additionalValueForKey(key: string): interop.Object;

  setCampaignToken(campaignToken: string | null): void;

  setProviderToken(providerToken: string | null): void;

  setCustomProductPageIdentifier(customProductPageIdentifier: string): void;

  setLatestReleaseID(latestReleaseID: string): void;

  setPosition(position: interop.Enum<typeof SKOverlayPosition>): void;
}

declare class SKProduct extends NSObject {
  readonly localizedDescription: string;

  readonly localizedTitle: string;

  readonly price: NSDecimalNumber;

  readonly priceLocale: NSLocale;

  readonly productIdentifier: string;

  readonly isDownloadable: boolean;

  readonly isFamilyShareable: boolean;

  readonly downloadContentLengths: NSArray;

  readonly contentVersion: string;

  readonly downloadContentVersion: string;

  readonly subscriptionPeriod: SKProductSubscriptionPeriod;

  readonly introductoryPrice: SKProductDiscount;

  readonly subscriptionGroupIdentifier: string;

  readonly discounts: NSArray;
}

// @ts-ignore ClassDecl.tsIgnore
declare class SKProductsRequest extends SKRequest {
  initWithProductIdentifiers(productIdentifiers: NSSet): this;

  // @ts-ignore MemberDecl.tsIgnore
  delegate: SKProductsRequestDelegate;

  // @ts-ignore MemberDecl.tsIgnore
  setDelegate(delegate: SKProductsRequestDelegate | null): void;
}

// @ts-ignore ClassDecl.tsIgnore
declare class SKMutablePayment extends SKPayment {
  // @ts-ignore MemberDecl.tsIgnore
  applicationUsername: string;

  // @ts-ignore MemberDecl.tsIgnore
  paymentDiscount: SKPaymentDiscount;

  // @ts-ignore MemberDecl.tsIgnore
  productIdentifier: string;

  // @ts-ignore MemberDecl.tsIgnore
  quantity: number;

  // @ts-ignore MemberDecl.tsIgnore
  requestData: NSData;

  // @ts-ignore MemberDecl.tsIgnore
  simulatesAskToBuyInSandbox: boolean;

  setApplicationUsername(applicationUsername: string | null): void;

  setPaymentDiscount(paymentDiscount: SKPaymentDiscount | null): void;

  setProductIdentifier(productIdentifier: string): void;

  setQuantity(quantity: number): void;

  setRequestData(requestData: NSData | null): void;

  setSimulatesAskToBuyInSandbox(simulatesAskToBuyInSandbox: boolean): void;
}


/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const SKReceiptPropertyIsVolumePurchase: string;

declare const SKErrorDomain: string;

declare const SKANErrorDomain: string;

declare const SKReceiptPropertyIsRevoked: string;

declare const SKReceiptPropertyIsExpired: string;

declare const SKPaymentTransactionState: {
  Purchasing: 0,
  Purchased: 1,
  Failed: 2,
  Restored: 3,
  Deferred: 4,
};

declare const SKProductPeriodUnit: {
  Day: 0,
  Week: 1,
  Month: 2,
  Year: 3,
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

declare interface SKRequestDelegate extends NSObjectProtocol {
  requestDidFinish?(request: SKRequest): void;

  requestDidFailWithError?(request: SKRequest, error: NSError): void;
}

declare class SKRequestDelegate extends NativeObject implements SKRequestDelegate {
}

declare interface SKProductsRequestDelegate extends SKRequestDelegate {
  productsRequestDidReceiveResponse(request: SKProductsRequest, response: SKProductsResponse): void;
}

declare class SKProductsRequestDelegate extends NativeObject implements SKProductsRequestDelegate {
}

declare interface SKDownloaderExtension extends BAManagedDownloaderExtension {
}

declare class SKDownloaderExtension extends NativeObject implements SKDownloaderExtension {
}

declare class SKPaymentTransaction extends NSObject {
  readonly error: NSError;

  readonly originalTransaction: SKPaymentTransaction;

  readonly payment: SKPayment;

  readonly transactionDate: NSDate;

  readonly transactionIdentifier: string;

  readonly transactionState: interop.Enum<typeof SKPaymentTransactionState>;
}

declare class SKOverlayConfiguration extends NSObject {
}

declare class SKProductsResponse extends NSObject {
  readonly products: NSArray;

  readonly invalidProductIdentifiers: NSArray;
}

declare class SKStoreReviewController extends NSObject {
  static requestReviewInScene(windowScene: UIWindowScene): void;
}

declare class SKStorefront extends NSObject {
  readonly countryCode: string;

  readonly identifier: string;
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

  readonly downloadContentVersion: string;

  readonly subscriptionPeriod: SKProductSubscriptionPeriod;

  readonly introductoryPrice: SKProductDiscount;

  readonly subscriptionGroupIdentifier: string;

  readonly discounts: NSArray;
}

declare class SKProductSubscriptionPeriod extends NSObject {
  readonly numberOfUnits: number;

  readonly unit: interop.Enum<typeof SKProductPeriodUnit>;
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

declare class SKRequest extends NSObject {
  delegate: SKRequestDelegate;

  cancel(): void;

  start(): void;

  setDelegate(delegate: SKRequestDelegate | null): void;
}

declare class SKArcadeService extends NSObject {
  static registerArcadeAppWithRandomFromLibRandomFromLibLengthResultHandler(randomFromLib: NSData, randomFromLibLength: number, resultHandler: (p1: NSData, p2: number, p3: NSData, p4: number, p5: NSError) => void | null): void;

  static arcadeSubscriptionStatusWithNonceResultHandler(nonce: number, resultHandler: (p1: NSData, p2: number, p3: NSData, p4: number, p5: NSError) => void | null): void;

  static repairArcadeApp(): void;
}

declare class SKPaymentDiscount extends NSObject {
  initWithIdentifierKeyIdentifierNonceSignatureTimestamp(identifier: string, keyIdentifier: string, nonce: NSUUID, signature: string, timestamp: NSNumber): this;

  readonly identifier: string;

  readonly keyIdentifier: string;

  readonly nonce: NSUUID;

  readonly signature: string;

  readonly timestamp: NSNumber;
}

declare class SKPayment extends NSObject implements NSCopying, NSMutableCopying {
  static paymentWithProduct<This extends abstract new (...args: any) => any>(this: This, product: SKProduct): InstanceType<This>;

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
}

declare class SKReceiptRefreshRequest extends SKRequest {
  initWithReceiptProperties(properties: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): this;

  readonly receiptProperties: NSDictionary;
}

// @ts-ignore ClassDecl.tsIgnore
declare class SKProductsRequest extends SKRequest {
  initWithProductIdentifiers(productIdentifiers: NSSet): this;

  // @ts-ignore MemberDecl.tsIgnore
  delegate: SKProductsRequestDelegate;

  setDelegate(delegate: SKRequestDelegate | null): void;
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

declare class SKProductDiscount extends NSObject {
  readonly price: NSDecimalNumber;

  readonly priceLocale: NSLocale;

  readonly identifier: string;

  readonly subscriptionPeriod: SKProductSubscriptionPeriod;

  readonly numberOfPeriods: number;

  readonly paymentMode: interop.Enum<typeof SKProductDiscountPaymentMode>;

  readonly type: interop.Enum<typeof SKProductDiscountType>;
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

  addTransactionObserver(observer: SKPaymentTransactionObserver): void;

  removeTransactionObserver(observer: SKPaymentTransactionObserver): void;

  readonly transactionObservers: NSArray;

  readonly transactions: NSArray;

  showPriceConsentIfNeeded(): void;

  presentCodeRedemptionSheet(): void;

  setDelegate(delegate: SKPaymentQueueDelegate | null): void;
}


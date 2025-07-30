/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./Foundation.d.ts" />

declare const ILMessageFilterErrorDomain: string;

declare const ILClassificationAction: {
  None: 0,
  ReportNotJunk: 1,
  ReportJunk: 2,
  ReportJunkAndBlockSender: 3,
};

declare const ILMessageFilterSubAction: {
  None: 0,
  TransactionalOthers: 10000,
  TransactionalFinance: 10001,
  TransactionalOrders: 10002,
  TransactionalReminders: 10003,
  TransactionalHealth: 10004,
  TransactionalWeather: 10005,
  TransactionalCarrier: 10006,
  TransactionalRewards: 10007,
  TransactionalPublicServices: 10008,
  PromotionalOthers: 20000,
  PromotionalOffers: 20001,
  PromotionalCoupons: 20002,
};

declare const ILMessageFilterError: {
  System: 1,
  InvalidNetworkURL: 2,
  NetworkURLUnauthorized: 3,
  NetworkRequestFailed: 4,
  RedundantNetworkDeferral: 5,
};

declare const ILMessageFilterAction: {
  None: 0,
  Allow: 1,
  Junk: 2,
  Filter: 2,
  Promotion: 3,
  Transaction: 4,
};

declare interface ILMessageFilterQueryHandling extends NSObjectProtocol {
  handleQueryRequestContextCompletion(queryRequest: ILMessageFilterQueryRequest, context: ILMessageFilterExtensionContext, completion: (p1: ILMessageFilterQueryResponse) => void): void;
}

declare class ILMessageFilterQueryHandling extends NativeObject implements ILMessageFilterQueryHandling {
}

declare interface ILMessageFilterCapabilitiesQueryHandling extends NSObjectProtocol {
  handleCapabilitiesQueryRequestContextCompletion(capabilitiesQueryRequest: ILMessageFilterCapabilitiesQueryRequest, context: ILMessageFilterExtensionContext, completion: (p1: ILMessageFilterCapabilitiesQueryResponse) => void): void;
}

declare class ILMessageFilterCapabilitiesQueryHandling extends NativeObject implements ILMessageFilterCapabilitiesQueryHandling {
}

declare class ILNetworkResponse extends NSObject implements NSSecureCoding {
  readonly urlResponse: NSHTTPURLResponse;

  readonly data: NSData;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ILMessageFilterExtensionContext extends NSExtensionContext {
  deferQueryRequestToNetworkWithCompletion(completion: (p1: ILNetworkResponse, p2: NSError) => void | null): void;
}

declare class ILClassificationRequest extends NSObject implements NSSecureCoding {
  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ILClassificationResponse extends NSObject implements NSSecureCoding {
  readonly action: interop.Enum<typeof ILClassificationAction>;

  userString: string;

  get userInfo(): NSDictionary;
  set userInfo(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  initWithClassificationAction(action: interop.Enum<typeof ILClassificationAction>): this;

  setUserString(userString: string): void;

  setUserInfo(userInfo: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ILMessageCommunication extends ILCommunication {
  readonly messageBody: string;

  isEqualToMessageCommunication(communication: ILMessageCommunication): boolean;
}

declare class ILCallCommunication extends ILCommunication {
  isEqualToCallCommunication(communication: ILCallCommunication): boolean;
}

declare class ILCommunication extends NSObject implements NSSecureCoding {
  readonly sender: string;

  readonly dateReceived: NSDate;

  isEqualToCommunication(communication: ILCommunication): boolean;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ILMessageFilterCapabilitiesQueryResponse extends NSObject implements NSSecureCoding {
  get transactionalSubActions(): NSArray;
  set transactionalSubActions(value: NSArray<interop.Object> | Array<interop.Object>);

  get promotionalSubActions(): NSArray;
  set promotionalSubActions(value: NSArray<interop.Object> | Array<interop.Object>);

  setTransactionalSubActions(transactionalSubActions: NSArray<interop.Object> | Array<interop.Object>): void;

  setPromotionalSubActions(promotionalSubActions: NSArray<interop.Object> | Array<interop.Object>): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ILMessageFilterQueryRequest extends NSObject implements NSSecureCoding {
  readonly sender: string;

  readonly messageBody: string;

  readonly receiverISOCountryCode: string;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ILCallClassificationRequest extends ILClassificationRequest implements NSSecureCoding {
  readonly callCommunications: NSArray;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ILMessageFilterCapabilitiesQueryRequest extends NSObject implements NSSecureCoding {
  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ILMessageFilterExtension extends NSObject {
}

declare class ILMessageClassificationRequest extends ILClassificationRequest implements NSSecureCoding {
  readonly messageCommunications: NSArray;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ILMessageFilterQueryResponse extends NSObject implements NSSecureCoding {
  action: interop.Enum<typeof ILMessageFilterAction>;

  subAction: interop.Enum<typeof ILMessageFilterSubAction>;

  setAction(action: interop.Enum<typeof ILMessageFilterAction>): void;

  setSubAction(subAction: interop.Enum<typeof ILMessageFilterSubAction>): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}


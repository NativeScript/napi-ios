/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare class THClient extends NSObject {
  init(): this;

  retrieveAllCredentials(completion: (p1: NSSet, p2: NSError) => void | null): void;

  retrieveAllActiveCredentials(completion: (p1: NSSet, p2: NSError) => void | null): void;

  deleteCredentialsForBorderAgentCompletion(borderAgentID: NSData, completion: (p1: NSError) => void | null): void;

  retrieveCredentialsForBorderAgentCompletion(borderAgentID: NSData, completion: (p1: THCredentials, p2: NSError) => void | null): void;

  storeCredentialsForBorderAgentActiveOperationalDataSetCompletion(borderAgentID: NSData, activeOperationalDataSet: NSData, completion: (p1: NSError) => void | null): void;

  retrievePreferredCredentials(completion: (p1: THCredentials, p2: NSError) => void | null): void;

  retrieveCredentialsForExtendedPANIDCompletion(extendedPANID: NSData, completion: (p1: THCredentials, p2: NSError) => void | null): void;

  checkPreferredNetworkForActiveOperationalDatasetCompletion(activeOperationalDataSet: NSData, completion: (p1: boolean) => void): void;

  isPreferredNetworkAvailableWithCompletion(completion: (p1: boolean) => void): void;
}

declare class THCredentials extends NSObject implements NSSecureCoding {
  readonly networkName: string;

  readonly extendedPANID: NSData;

  readonly borderAgentID: NSData;

  readonly activeOperationalDataSet: NSData;

  readonly networkKey: NSData;

  readonly PSKC: NSData;

  channel: number;

  readonly panID: NSData;

  readonly creationDate: NSDate;

  readonly lastModificationDate: NSDate;

  setChannel(channel: number): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}


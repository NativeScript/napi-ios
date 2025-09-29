/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./Foundation.d.ts" />

declare const OSLogMessageComponentArgumentCategory: {
  Undefined: 0,
  Data: 1,
  Double: 2,
  Int64: 3,
  String: 4,
  UInt64: 5,
};

declare const OSLogEntryStoreCategory: {
  Undefined: 0,
  Metadata: 1,
  ShortTerm: 2,
  LongTermAuto: 3,
  LongTerm1: 4,
  LongTerm3: 5,
  LongTerm7: 6,
  LongTerm14: 7,
  LongTerm30: 8,
};

declare const OSLogEnumeratorOptions: {
  OSLogEnumeratorReverse: 1,
};

declare const OSLogStoreScope: {
  OSLogStoreCurrentProcessIdentifier: 1,
};

declare const OSLogEntryLogLevel: {
  Undefined: 0,
  Debug: 1,
  Info: 2,
  Notice: 3,
  Error: 4,
  Fault: 5,
};

declare const OSLogEntrySignpostType: {
  Undefined: 0,
  IntervalBegin: 1,
  IntervalEnd: 2,
  Event: 3,
};

declare interface OSLogEntryWithPayload {
  readonly category: string;

  readonly components: NSArray;

  readonly formatString: string;

  readonly subsystem: string;
}

declare class OSLogEntryWithPayload extends NativeObject implements OSLogEntryWithPayload {
}

declare interface OSLogEntryFromProcess {
  readonly activityIdentifier: number;

  readonly process: string;

  readonly processIdentifier: number;

  readonly sender: string;

  readonly threadIdentifier: number;
}

declare class OSLogEntryFromProcess extends NativeObject implements OSLogEntryFromProcess {
}

declare class OSLogPosition extends NSObject {
}

declare class OSLogEntryLog extends OSLogEntry implements OSLogEntryFromProcess, OSLogEntryWithPayload {
  readonly level: interop.Enum<typeof OSLogEntryLogLevel>;

  readonly activityIdentifier: number;

  readonly process: string;

  readonly processIdentifier: number;

  readonly sender: string;

  readonly threadIdentifier: number;

  readonly category: string;

  readonly components: NSArray;

  readonly formatString: string;

  readonly subsystem: string;
}

declare class OSLogEntryActivity extends OSLogEntry implements OSLogEntryFromProcess {
  readonly parentActivityIdentifier: number;

  readonly activityIdentifier: number;

  readonly process: string;

  readonly processIdentifier: number;

  readonly sender: string;

  readonly threadIdentifier: number;
}

declare class OSLogEntryBoundary extends OSLogEntry {
}

declare class OSLogMessageComponent extends NSObject implements NSSecureCoding {
  readonly formatSubstring: string;

  readonly placeholder: string;

  readonly argumentCategory: interop.Enum<typeof OSLogMessageComponentArgumentCategory>;

  readonly argumentDataValue: NSData;

  readonly argumentDoubleValue: number;

  readonly argumentInt64Value: number;

  readonly argumentNumberValue: NSNumber;

  readonly argumentStringValue: string;

  readonly argumentUInt64Value: number;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class OSLogEnumerator extends NSEnumerator {
}

declare class OSLogEntrySignpost extends OSLogEntry implements OSLogEntryFromProcess, OSLogEntryWithPayload {
  readonly signpostIdentifier: number;

  readonly signpostName: string;

  readonly signpostType: interop.Enum<typeof OSLogEntrySignpostType>;

  readonly activityIdentifier: number;

  readonly process: string;

  readonly processIdentifier: number;

  readonly sender: string;

  readonly threadIdentifier: number;

  readonly category: string;

  readonly components: NSArray;

  readonly formatString: string;

  readonly subsystem: string;
}

declare class OSLogEntry extends NSObject {
  readonly composedMessage: string;

  readonly date: NSDate;

  readonly storeCategory: interop.Enum<typeof OSLogEntryStoreCategory>;
}

declare class OSLogStore extends NSObject {
  static storeWithScopeError<This extends abstract new (...args: any) => any>(this: This, scope: interop.Enum<typeof OSLogStoreScope>, error: interop.PointerConvertible): InstanceType<This>;

  static storeWithURLError<This extends abstract new (...args: any) => any>(this: This, url: NSURL, error: interop.PointerConvertible): InstanceType<This>;

  entriesEnumeratorWithOptionsPositionPredicateError(options: interop.Enum<typeof OSLogEnumeratorOptions>, position: OSLogPosition | null, predicate: NSPredicate | null, error: interop.PointerConvertible): OSLogEnumerator;

  entriesEnumeratorAndReturnError(error: interop.PointerConvertible): OSLogEnumerator;

  positionWithDate(date: NSDate): OSLogPosition;

  positionWithTimeIntervalSinceEnd(seconds: number): OSLogPosition;

  positionWithTimeIntervalSinceLatestBoot(seconds: number): OSLogPosition;
}


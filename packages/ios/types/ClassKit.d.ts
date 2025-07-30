/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const CLSContextTopicArtsAndMusic: string;

declare const CLSContextTopicComputerScienceAndEngineering: string;

declare const CLSContextTopicSocialScience: string;

declare const CLSContextTopicWorldLanguage: string;

declare const CLSContextTopicScience: string;

declare const CLSContextTopicMath: string;

declare const CLSErrorUnderlyingErrorsKey: string;

declare const CLSErrorObjectKey: string;

declare const CLSContextTopicLiteracyAndWriting: string;

declare const CLSPredicateKeyPathIdentifier: string;

declare const CLSErrorCodeDomain: string;

declare const CLSPredicateKeyPathParent: string;

declare const CLSPredicateKeyPathTopic: string;

declare const CLSPredicateKeyPathTitle: string;

declare const CLSPredicateKeyPathDateCreated: string;

declare const CLSContextTopicHealthAndFitness: string;

declare const CLSErrorSuccessfulObjectsKey: string;

declare const CLSPredicateKeyPathUniversalLinkURL: string;

declare const CLSProgressReportingCapabilityKind: {
  Duration: 0,
  Percent: 1,
  Binary: 2,
  Quantity: 3,
  Score: 4,
};

declare const CLSContextType: {
  None: 0,
  App: 1,
  Chapter: 2,
  Section: 3,
  Level: 4,
  Page: 5,
  Task: 6,
  Challenge: 7,
  Quiz: 8,
  Exercise: 9,
  Lesson: 10,
  Book: 11,
  Game: 12,
  Document: 13,
  Audio: 14,
  Video: 15,
  Course: 16,
  Custom: 17,
};

declare const CLSBinaryValueType: {
  TrueFalse: 0,
  PassFail: 1,
  YesNo: 2,
  CorrectIncorrect: 3,
};

declare const CLSErrorCode: {
  None: 0,
  ClassKitUnavailable: 1,
  InvalidArgument: 2,
  InvalidModification: 3,
  AuthorizationDenied: 4,
  DatabaseInaccessible: 5,
  Limits: 6,
  InvalidCreate: 7,
  InvalidUpdate: 8,
  PartialFailure: 9,
  InvalidAccountCredentials: 10,
};

declare interface CLSContextProvider {
  updateDescendantsOfContextCompletion(context: CLSContext, completion: (p1: NSError) => void | null): void;
}

declare class CLSContextProvider extends NativeObject implements CLSContextProvider {
}

declare interface CLSDataStoreDelegate extends NSObjectProtocol {
  createContextForIdentifierParentContextParentIdentifierPath(identifier: string, parentContext: CLSContext, parentIdentifierPath: NSArray<interop.Object> | Array<interop.Object>): CLSContext;
}

declare class CLSDataStoreDelegate extends NativeObject implements CLSDataStoreDelegate {
}

declare class CLSActivityItem extends CLSObject {
  title: string;

  readonly identifier: string;

  setTitle(title: string): void;
}

declare class CLSProgressReportingCapability extends CLSObject {
  readonly kind: interop.Enum<typeof CLSProgressReportingCapabilityKind>;

  readonly details: string;

  initWithKindDetails(kind: interop.Enum<typeof CLSProgressReportingCapabilityKind>, details: string | null): this;
}

declare class CLSScoreItem extends CLSActivityItem {
  score: number;

  maxScore: number;

  initWithIdentifierTitleScoreMaxScore(identifier: string, title: string, score: number, maxScore: number): this;

  setScore(score: number): void;

  setMaxScore(maxScore: number): void;
}

declare class CLSQuantityItem extends CLSActivityItem {
  quantity: number;

  initWithIdentifierTitle(identifier: string, title: string): this;

  setQuantity(quantity: number): void;
}

declare class CLSDataStore extends NSObject {
  static readonly shared: CLSDataStore;

  readonly mainAppContext: CLSContext;

  readonly activeContext: CLSContext;

  readonly runningActivity: CLSActivity;

  delegate: CLSDataStoreDelegate;

  saveWithCompletion(completion: (p1: NSError) => void | null): void;

  completeAllAssignedActivitiesMatching(contextPath: NSArray<interop.Object> | Array<interop.Object>): void;

  setDelegate(delegate: CLSDataStoreDelegate | null): void;

  contextsMatchingPredicateCompletion(predicate: NSPredicate, completion: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): void;

  contextsMatchingIdentifierPathCompletion(identifierPath: NSArray<interop.Object> | Array<interop.Object>, completion: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void | null): void;

  removeContext(context: CLSContext): void;

  fetchActivityForURLCompletion(url: NSURL, completion: (p1: CLSActivity, p2: NSError) => void | null): void;
}

declare class CLSObject extends NSObject implements NSSecureCoding {
  readonly dateCreated: NSDate;

  readonly dateLastModified: NSDate;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CLSBinaryItem extends CLSActivityItem {
  value: boolean;

  readonly valueType: interop.Enum<typeof CLSBinaryValueType>;

  initWithIdentifierTitleType(identifier: string, title: string, valueType: interop.Enum<typeof CLSBinaryValueType>): this;

  setValue(value: boolean): void;
}

declare class CLSActivity extends CLSObject {
  progress: number;

  readonly duration: number;

  primaryActivityItem: CLSActivityItem;

  addProgressRangeFromStartToEnd(start: number, end: number): void;

  addAdditionalActivityItem(activityItem: CLSActivityItem): void;

  readonly additionalActivityItems: NSArray;

  setProgress(progress: number): void;

  setPrimaryActivityItem(primaryActivityItem: CLSActivityItem | null): void;

  readonly started: boolean;

  start(): void;

  stop(): void;

  removeAllActivityItems(): void;

  isStarted(): boolean;
}

declare class CLSContext extends CLSObject {
  readonly identifierPath: NSArray;

  readonly identifier: string;

  universalLinkURL: NSURL;

  readonly type: interop.Enum<typeof CLSContextType>;

  customTypeName: string;

  title: string;

  displayOrder: number;

  topic: string;

  assignable: boolean;

  suggestedAge: _NSRange;

  suggestedCompletionTime: _NSRange;

  readonly progressReportingCapabilities: NSSet;

  summary: string;

  thumbnail: interop.Object;

  initWithTypeIdentifierTitle(type: interop.Enum<typeof CLSContextType>, identifier: string, title: string): this;

  readonly active: boolean;

  becomeActive(): void;

  resignActive(): void;

  setType(type: interop.Enum<typeof CLSContextType>): void;

  addProgressReportingCapabilities(capabilities: NSSet): void;

  resetProgressReportingCapabilities(): void;

  setUniversalLinkURL(universalLinkURL: NSURL | null): void;

  setCustomTypeName(customTypeName: string | null): void;

  setTitle(title: string): void;

  setDisplayOrder(displayOrder: number): void;

  setTopic(topic: string | null): void;

  isAssignable(): boolean;

  setAssignable(assignable: boolean): void;

  setSuggestedAge(suggestedAge: _NSRange): void;

  setSuggestedCompletionTime(suggestedCompletionTime: _NSRange): void;

  setSummary(summary: string | null): void;

  setThumbnail(thumbnail: interop.Object | null): void;

  isActive(): boolean;

  readonly parent: CLSContext;

  removeFromParent(): void;

  addChildContext(child: CLSContext): void;

  descendantMatchingIdentifierPathCompletion(identifierPath: NSArray<interop.Object> | Array<interop.Object>, completion: (p1: CLSContext, p2: NSError) => void | null): void;

  readonly navigationChildContexts: NSArray;

  addNavigationChildContext(child: CLSContext): void;

  removeNavigationChildContext(child: CLSContext): void;

  readonly currentActivity: CLSActivity;

  createNewActivity(): CLSActivity;
}


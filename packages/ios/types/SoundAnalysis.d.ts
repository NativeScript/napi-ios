/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const SNClassifierIdentifierVersion1: string;

declare const SNErrorDomain: string;

declare const SNErrorCode: {
  UnknownError: 1,
  OperationFailed: 2,
  InvalidFormat: 3,
  InvalidModel: 4,
  InvalidFile: 5,
};

declare const SNTimeDurationConstraintType: {
  Enumerated: 1,
  Range: 2,
};

declare interface SNResultsObserving extends NSObjectProtocol {
  requestDidProduceResult(request: SNRequest, result: SNResult): void;

  requestDidFailWithError?(request: SNRequest, error: NSError): void;

  requestDidComplete?(request: SNRequest): void;
}

declare class SNResultsObserving extends NativeObject implements SNResultsObserving {
}

declare interface SNResult extends NSObjectProtocol {
}

declare class SNResult extends NativeObject implements SNResult {
}

declare interface SNRequest extends NSObjectProtocol {
}

declare class SNRequest extends NativeObject implements SNRequest {
}

declare class SNClassification extends NSObject {
  readonly identifier: string;

  readonly confidence: number;
}

declare class SNAudioFileAnalyzer extends NSObject {
  initWithURLError(url: NSURL, error: interop.PointerConvertible): this;

  addRequestWithObserverError(request: SNRequest, observer: SNResultsObserving, error: interop.PointerConvertible): boolean;

  removeRequest(request: SNRequest): void;

  removeAllRequests(): void;

  analyze(): void;

  analyzeWithCompletionHandler(completionHandler: (p1: boolean) => void): void;

  cancelAnalysis(): void;
}

declare class SNClassificationResult extends NSObject implements SNResult {
  readonly classifications: NSArray;

  readonly timeRange: CMTimeRange;

  classificationForIdentifier(identifier: string): SNClassification;

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

declare class SNAudioStreamAnalyzer extends NSObject {
  initWithFormat(format: AVAudioFormat): this;

  addRequestWithObserverError(request: SNRequest, observer: SNResultsObserving, error: interop.PointerConvertible): boolean;

  removeRequest(request: SNRequest): void;

  removeAllRequests(): void;

  analyzeAudioBufferAtAudioFramePosition(audioBuffer: AVAudioBuffer, audioFramePosition: number): void;

  completeAnalysis(): void;
}

declare class SNTimeDurationConstraint extends NSObject {
  readonly type: interop.Enum<typeof SNTimeDurationConstraintType>;

  readonly enumeratedDurations: NSArray;

  readonly durationRange: CMTimeRange;

  initWithEnumeratedDurations(enumeratedDurations: NSArray<interop.Object> | Array<interop.Object>): this;

  initWithDurationRange(durationRange: CMTimeRange): this;
}

declare class SNClassifySoundRequest extends NSObject implements SNRequest {
  overlapFactor: number;

  windowDuration: CMTime;

  readonly windowDurationConstraint: SNTimeDurationConstraint;

  readonly knownClassifications: NSArray;

  initWithMLModelError(mlModel: MLModel, error: interop.PointerConvertible): this;

  initWithClassifierIdentifierError(classifierIdentifier: string, error: interop.PointerConvertible): this;

  setOverlapFactor(overlapFactor: number): void;

  setWindowDuration(windowDuration: CMTime): void;

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


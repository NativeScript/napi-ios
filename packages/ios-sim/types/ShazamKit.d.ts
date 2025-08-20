/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const SHMediaItemConfidence: string;

declare const SHMediaItemMatchOffset: string;

declare const SHErrorDomain: string;

declare const SHMediaItemCreationDate: string;

declare const SHMediaItemFrequencySkewRanges: string;

declare const SHMediaItemTimeRanges: string;

declare const SHMediaItemISRC: string;

declare const SHMediaItemVideoURL: string;

declare const SHMediaItemAppleMusicID: string;

declare const SHMediaItemWebURL: string;

declare const SHMediaItemArtist: string;

declare const SHMediaItemSubtitle: string;

declare const SHMediaItemTitle: string;

declare const SHMediaItemShazamID: string;

declare const SHMediaItemAppleMusicURL: string;

declare const SHMediaItemFrequencySkew: string;

declare const SHMediaItemArtworkURL: string;

declare const SHMediaItemGenres: string;

declare const SHMediaItemExplicitContent: string;

declare const SHErrorCode: {
  InvalidAudioFormat: 100,
  AudioDiscontinuity: 101,
  SignatureInvalid: 200,
  SignatureDurationInvalid: 201,
  MatchAttemptFailed: 202,
  CustomCatalogInvalid: 300,
  CustomCatalogInvalidURL: 301,
  MediaLibrarySyncFailed: 400,
  InternalError: 500,
  MediaItemFetchFailed: 600,
};

declare interface SHSessionDelegate extends NSObjectProtocol {
  sessionDidFindMatch?(session: SHSession, match: SHMatch): void;

  sessionDidNotFindMatchForSignatureError?(session: SHSession, signature: SHSignature, error: NSError | null): void;
}

declare class SHSessionDelegate extends NativeObject implements SHSessionDelegate {
}

declare class SHMediaLibrary extends NSObject {
  static readonly defaultLibrary: SHMediaLibrary;

  addMediaItemsCompletionHandler(mediaItems: NSArray<interop.Object> | Array<interop.Object>, completionHandler: (p1: NSError) => void | null): void;
}

declare class SHSession extends NSObject {
  readonly catalog: SHCatalog;

  delegate: SHSessionDelegate | null;

  init(): this;

  initWithCatalog(catalog: SHCatalog): this;

  matchStreamingBufferAtTime(buffer: AVAudioPCMBuffer, time: AVAudioTime | null): void;

  matchSignature(signature: SHSignature): void;

  setDelegate(delegate: SHSessionDelegate | null): void;
}

declare class SHMatch extends NSObject implements NSSecureCoding {
  readonly mediaItems: NSArray;

  readonly querySignature: SHSignature;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SHMediaItem extends NSObject implements NSSecureCoding, NSCopying {
  readonly shazamID: string;

  readonly title: string;

  readonly subtitle: string;

  readonly artist: string;

  readonly genres: NSArray;

  readonly appleMusicID: string;

  readonly appleMusicURL: NSURL;

  readonly webURL: NSURL;

  readonly artworkURL: NSURL;

  readonly videoURL: NSURL;

  readonly explicitContent: boolean;

  readonly isrc: string;

  readonly timeRanges: NSArray;

  readonly frequencySkewRanges: NSArray;

  readonly creationDate: NSDate;

  static mediaItemWithProperties<This extends abstract new (...args: any) => any>(this: This, properties: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): InstanceType<This>;

  static fetchMediaItemWithShazamIDCompletionHandler(shazamID: string, completionHandler: (p1: SHMediaItem, p2: NSError) => void | null): void;

  valueForProperty(property: string): interop.Object;

  objectForKeyedSubscript(key: string): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class SHRange extends NSObject implements NSSecureCoding, NSCopying {
  readonly lowerBound: number;

  readonly upperBound: number;

  static rangeWithLowerBoundUpperBound<This extends abstract new (...args: any) => any>(this: This, lowerBound: number, upperBound: number): InstanceType<This>;

  initWithLowerBoundUpperBound(lowerBound: number, upperBound: number): this;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class SHSignature extends NSObject implements NSSecureCoding, NSCopying {
  readonly duration: number;

  readonly dataRepresentation: NSData;

  static signatureWithDataRepresentationError(dataRepresentation: NSData, error: interop.PointerConvertible): SHSignature;

  initWithDataRepresentationError(dataRepresentation: NSData, error: interop.PointerConvertible): this;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class SHCatalog extends NSObject {
  readonly minimumQuerySignatureDuration: number;

  readonly maximumQuerySignatureDuration: number;
}

declare class SHSignatureGenerator extends NSObject {
  static generateSignatureFromAssetCompletionHandler(asset: AVAsset, completionHandler: (p1: SHSignature, p2: NSError) => void | null): void;

  appendBufferAtTimeError(buffer: AVAudioPCMBuffer, time: AVAudioTime | null, error: interop.PointerConvertible): boolean;

  signature(): SHSignature;
}

declare class SHMatchedMediaItem extends SHMediaItem implements NSSecureCoding {
  readonly frequencySkew: number;

  readonly matchOffset: number;

  readonly predictedCurrentMatchOffset: number;

  readonly confidence: number;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SHCustomCatalog extends SHCatalog {
  readonly dataRepresentation: NSData;

  addReferenceSignatureRepresentingMediaItemsError(signature: SHSignature, mediaItems: NSArray<interop.Object> | Array<interop.Object>, error: interop.PointerConvertible): boolean;

  addCustomCatalogFromURLError(customCatalogURL: NSURL, error: interop.PointerConvertible): boolean;

  writeToURLError(destinationURL: NSURL, error: interop.PointerConvertible): boolean;

  static new<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  init(): this;

  initWithDataRepresentationError(dataRepresentation: NSData, error: interop.PointerConvertible): this;
}


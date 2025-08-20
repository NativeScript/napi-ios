/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const QLThumbnailErrorDomain: string;

declare const QLThumbnailError: {
  GenerationFailed: 0,
  SavingToURLFailed: 1,
  NoCachedThumbnail: 2,
  NoCloudThumbnail: 3,
  RequestInvalid: 4,
  RequestCancelled: 5,
};

declare const QLThumbnailGenerationRequestRepresentationTypes: {
  Icon: 1,
  LowQualityThumbnail: 2,
  Thumbnail: 4,
  All: -1,
};

declare const QLThumbnailRepresentationType: {
  Icon: 0,
  LowQualityThumbnail: 1,
  Thumbnail: 2,
};

declare class QLFileThumbnailRequest extends NSObject {
  readonly maximumSize: CGSize;

  readonly minimumSize: CGSize;

  readonly scale: number;

  readonly fileURL: NSURL;
}

declare class QLThumbnailGenerationRequest extends NSObject implements NSCopying, NSSecureCoding {
  initWithFileAtURLSizeScaleRepresentationTypes(url: NSURL, size: CGSize, scale: number, representationTypes: interop.Enum<typeof QLThumbnailGenerationRequestRepresentationTypes>): this;

  contentType: UTType;

  minimumDimension: number;

  iconMode: boolean;

  readonly size: CGSize;

  readonly scale: number;

  readonly representationTypes: interop.Enum<typeof QLThumbnailGenerationRequestRepresentationTypes>;

  setContentType(contentType: UTType | null): void;

  setMinimumDimension(minimumDimension: number): void;

  setIconMode(iconMode: boolean): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class QLThumbnailRepresentation extends NSObject {
  readonly type: interop.Enum<typeof QLThumbnailRepresentationType>;

  readonly CGImage: interop.Pointer;

  readonly UIImage: UIImage;

  readonly contentRect: CGRect;
}

declare class QLThumbnailProvider extends NSObject {
  provideThumbnailForFileRequestCompletionHandler(request: QLFileThumbnailRequest, handler: (p1: QLThumbnailReply, p2: NSError) => void | null): void;
}

declare class QLThumbnailGenerator extends NSObject {
  static readonly sharedGenerator: QLThumbnailGenerator;

  generateBestRepresentationForRequestCompletionHandler(request: QLThumbnailGenerationRequest, completionHandler: (p1: QLThumbnailRepresentation, p2: NSError) => void | null): void;

  generateRepresentationsForRequestUpdateHandler(request: QLThumbnailGenerationRequest, updateHandler: (p1: QLThumbnailRepresentation, p2: interop.Enum<typeof QLThumbnailRepresentationType>, p3: NSError) => void | null): void;

  cancelRequest(request: QLThumbnailGenerationRequest): void;

  saveBestRepresentationForRequestToFileAtURLAsContentTypeCompletionHandler(request: QLThumbnailGenerationRequest, fileURL: NSURL, contentType: UTType, completionHandler: (p1: NSError) => void | null): void;

  saveBestRepresentationForRequestToFileAtURLWithContentTypeCompletionHandler(request: QLThumbnailGenerationRequest, fileURL: NSURL, contentType: string, completionHandler: (p1: NSError) => void | null): void;
}

declare class QLThumbnailReply extends NSObject {
  extensionBadge: string;

  static replyWithContextSizeDrawingBlock<This extends abstract new (...args: any) => any>(this: This, contextSize: CGSize, drawingBlock: (p1: interop.PointerConvertible) => boolean): InstanceType<This>;

  static replyWithContextSizeCurrentContextDrawingBlock<This extends abstract new (...args: any) => any>(this: This, contextSize: CGSize, drawingBlock: () => boolean): InstanceType<This>;

  static replyWithImageFileURL<This extends abstract new (...args: any) => any>(this: This, fileURL: NSURL): InstanceType<This>;

  setExtensionBadge(extensionBadge: string): void;
}


/// <reference types="@nativescript/objc-node-api" />

declare const kQLThumbnailOptionIconModeKey: interop.Pointer;

declare const kQLPreviewContentIDScheme: interop.Pointer;

declare const kQLPreviewPropertyAttachmentsKey: interop.Pointer;

declare const kQLPreviewPropertyAttachmentDataKey: interop.Pointer;

declare const kQLPreviewPropertyMIMETypeKey: interop.Pointer;

declare const kQLPreviewPropertyStringEncodingKey: interop.Pointer;

declare const kQLPreviewPropertyHeightKey: interop.Pointer;

declare const kQLThumbnailPropertyBaseBundlePathKey: interop.Pointer;

declare const kQLPreviewPropertyTextEncodingNameKey: interop.Pointer;

declare const kQLPreviewPropertyBaseBundlePathKey: interop.Pointer;

declare const kQLPreviewPropertyCursorKey: interop.Pointer;

declare const kQLThumbnailOptionScaleFactorKey: interop.Pointer;

declare const kQLPreviewOptionCursorKey: interop.Pointer;

declare const kQLPreviewPropertyWidthKey: interop.Pointer;

declare const kQLThumbnailPropertyExtensionKey: interop.Pointer;

declare const kQLThumbnailPropertyBadgeImageKey: interop.Pointer;

declare const kQLPreviewPropertyDisplayNameKey: interop.Pointer;

declare const kQLPreviewPropertyPDFStyleKey: interop.Pointer;

declare const QLPreviewPDFStyle: {
  Standard: 0,
  PagesWithThumbnailsOnRight: 3,
  PagesWithThumbnailsOnLeft: 4,
};

declare class __QLThumbnail {
  constructor(init?: __QLThumbnail);
}

declare class __QLPreviewRequest {
  constructor(init?: __QLPreviewRequest);
}

declare class __QLThumbnailRequest {
  constructor(init?: __QLThumbnailRequest);
}

declare function QLThumbnailRequestGetTypeID(): number;

declare function QLThumbnailRequestCopyURL(thumbnail: interop.Object): interop.Object;

declare function QLThumbnailRequestCopyOptions(thumbnail: interop.Object): interop.Object;

declare function QLThumbnailRequestCopyContentUTI(thumbnail: interop.Object): interop.Object;

declare function QLThumbnailRequestGetMaximumSize(thumbnail: interop.Object): CGSize;

declare function QLThumbnailRequestGetGeneratorBundle(thumbnail: interop.Object): interop.Object;

declare function QLThumbnailRequestSetDocumentObject(thumbnail: interop.Object, object: interop.PointerConvertible, callbacks: interop.PointerConvertible): void;

declare function QLThumbnailRequestGetDocumentObject(thumbnail: interop.Object): interop.Pointer;

declare function QLThumbnailRequestSetImage(thumbnail: interop.Object, image: interop.Object, properties: interop.Object): void;

declare function QLThumbnailRequestSetImageWithData(thumbnail: interop.Object, data: interop.Object, properties: interop.Object): void;

declare function QLThumbnailRequestCreateContext(thumbnail: interop.Object, size: CGSize, isBitmap: number, properties: interop.Object): interop.Object;

declare function QLThumbnailRequestFlushContext(thumbnail: interop.Object, context: interop.Object): void;

declare function QLThumbnailRequestSetImageAtURL(thumbnail: interop.Object, url: interop.Object, properties: interop.Object): void;

declare function QLThumbnailRequestSetThumbnailWithDataRepresentation(thumbnail: interop.Object, data: interop.Object, contentTypeUTI: interop.Object, previewProperties: interop.Object, properties: interop.Object): void;

declare function QLThumbnailRequestSetThumbnailWithURLRepresentation(thumbnail: interop.Object, url: interop.Object, contentTypeUTI: interop.Object, previewProperties: interop.Object, properties: interop.Object): void;

declare function QLThumbnailRequestIsCancelled(thumbnail: interop.Object): number;

declare function QLPreviewRequestGetTypeID(): number;

declare function QLPreviewRequestCopyURL(preview: interop.Object): interop.Object;

declare function QLPreviewRequestCopyOptions(preview: interop.Object): interop.Object;

declare function QLPreviewRequestCopyContentUTI(preview: interop.Object): interop.Object;

declare function QLPreviewRequestGetGeneratorBundle(preview: interop.Object): interop.Object;

declare function QLPreviewRequestSetDocumentObject(preview: interop.Object, object: interop.PointerConvertible, callbacks: interop.PointerConvertible): void;

declare function QLPreviewRequestGetDocumentObject(preview: interop.Object): interop.Pointer;

declare function QLPreviewRequestIsCancelled(preview: interop.Object): number;

declare function QLPreviewRequestSetDataRepresentation(preview: interop.Object, data: interop.Object, contentTypeUTI: interop.Object, properties: interop.Object): void;

declare function QLPreviewRequestSetURLRepresentation(preview: interop.Object, url: interop.Object, contentTypeUTI: interop.Object, properties: interop.Object): void;

declare function QLPreviewRequestCreateContext(preview: interop.Object, size: CGSize, isBitmap: number, properties: interop.Object): interop.Object;

declare function QLPreviewRequestCreatePDFContext(preview: interop.Object, mediaBox: interop.PointerConvertible, auxiliaryInfo: interop.Object, properties: interop.Object): interop.Object;

declare function QLPreviewRequestFlushContext(preview: interop.Object, context: interop.Object): void;

declare function QLThumbnailImageCreate(allocator: interop.Object, url: interop.Object, maxThumbnailSize: CGSize, options: interop.Object): interop.Object;

declare function QLThumbnailGetTypeID(): number;

declare function QLThumbnailCreate(allocator: interop.Object, url: interop.Object, maxThumbnailSize: CGSize, options: interop.Object): interop.Object;

declare function QLThumbnailCopyDocumentURL(thumbnail: interop.Object): interop.Object;

declare function QLThumbnailGetMaximumSize(thumbnail: interop.Object): CGSize;

declare function QLThumbnailCopyOptions(thumbnail: interop.Object): interop.Object;

declare function QLThumbnailDispatchAsync(thumbnail: interop.Object, queue: NSObject, completion: () => void): void;

declare function QLThumbnailCopyImage(thumbnail: interop.Object): interop.Object;

declare function QLThumbnailGetContentRect(thumbnail: interop.Object): CGRect;

declare function QLThumbnailCancel(thumbnail: interop.Object): void;

declare function QLThumbnailIsCancelled(thumbnail: interop.Object): number;


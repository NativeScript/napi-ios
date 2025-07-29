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

declare function QLThumbnailRequestCopyURL(thumbnail: interop.PointerConvertible): interop.Pointer;

declare function QLThumbnailRequestCopyOptions(thumbnail: interop.PointerConvertible): interop.Pointer;

declare function QLThumbnailRequestCopyContentUTI(thumbnail: interop.PointerConvertible): interop.Pointer;

declare function QLThumbnailRequestGetMaximumSize(thumbnail: interop.PointerConvertible): CGSize;

declare function QLThumbnailRequestGetGeneratorBundle(thumbnail: interop.PointerConvertible): interop.Pointer;

declare function QLThumbnailRequestSetDocumentObject(thumbnail: interop.PointerConvertible, object: interop.PointerConvertible, callbacks: interop.PointerConvertible): void;

declare function QLThumbnailRequestGetDocumentObject(thumbnail: interop.PointerConvertible): interop.Pointer;

declare function QLThumbnailRequestSetImage(thumbnail: interop.PointerConvertible, image: interop.PointerConvertible, properties: interop.PointerConvertible): void;

declare function QLThumbnailRequestSetImageWithData(thumbnail: interop.PointerConvertible, data: interop.PointerConvertible, properties: interop.PointerConvertible): void;

declare function QLThumbnailRequestCreateContext(thumbnail: interop.PointerConvertible, size: CGSize, isBitmap: number, properties: interop.PointerConvertible): interop.Pointer;

declare function QLThumbnailRequestFlushContext(thumbnail: interop.PointerConvertible, context: interop.PointerConvertible): void;

declare function QLThumbnailRequestSetImageAtURL(thumbnail: interop.PointerConvertible, url: interop.PointerConvertible, properties: interop.PointerConvertible): void;

declare function QLThumbnailRequestSetThumbnailWithDataRepresentation(thumbnail: interop.PointerConvertible, data: interop.PointerConvertible, contentTypeUTI: interop.PointerConvertible, previewProperties: interop.PointerConvertible, properties: interop.PointerConvertible): void;

declare function QLThumbnailRequestSetThumbnailWithURLRepresentation(thumbnail: interop.PointerConvertible, url: interop.PointerConvertible, contentTypeUTI: interop.PointerConvertible, previewProperties: interop.PointerConvertible, properties: interop.PointerConvertible): void;

declare function QLThumbnailRequestIsCancelled(thumbnail: interop.PointerConvertible): number;

declare function QLPreviewRequestGetTypeID(): number;

declare function QLPreviewRequestCopyURL(preview: interop.PointerConvertible): interop.Pointer;

declare function QLPreviewRequestCopyOptions(preview: interop.PointerConvertible): interop.Pointer;

declare function QLPreviewRequestCopyContentUTI(preview: interop.PointerConvertible): interop.Pointer;

declare function QLPreviewRequestGetGeneratorBundle(preview: interop.PointerConvertible): interop.Pointer;

declare function QLPreviewRequestSetDocumentObject(preview: interop.PointerConvertible, object: interop.PointerConvertible, callbacks: interop.PointerConvertible): void;

declare function QLPreviewRequestGetDocumentObject(preview: interop.PointerConvertible): interop.Pointer;

declare function QLPreviewRequestIsCancelled(preview: interop.PointerConvertible): number;

declare function QLPreviewRequestSetDataRepresentation(preview: interop.PointerConvertible, data: interop.PointerConvertible, contentTypeUTI: interop.PointerConvertible, properties: interop.PointerConvertible): void;

declare function QLPreviewRequestSetURLRepresentation(preview: interop.PointerConvertible, url: interop.PointerConvertible, contentTypeUTI: interop.PointerConvertible, properties: interop.PointerConvertible): void;

declare function QLPreviewRequestCreateContext(preview: interop.PointerConvertible, size: CGSize, isBitmap: number, properties: interop.PointerConvertible): interop.Pointer;

declare function QLPreviewRequestCreatePDFContext(preview: interop.PointerConvertible, mediaBox: interop.PointerConvertible, auxiliaryInfo: interop.PointerConvertible, properties: interop.PointerConvertible): interop.Pointer;

declare function QLPreviewRequestFlushContext(preview: interop.PointerConvertible, context: interop.PointerConvertible): void;

declare function QLThumbnailImageCreate(allocator: interop.PointerConvertible, url: interop.PointerConvertible, maxThumbnailSize: CGSize, options: interop.PointerConvertible): interop.Pointer;

declare function QLThumbnailGetTypeID(): number;

declare function QLThumbnailCreate(allocator: interop.PointerConvertible, url: interop.PointerConvertible, maxThumbnailSize: CGSize, options: interop.PointerConvertible): interop.Pointer;

declare function QLThumbnailCopyDocumentURL(thumbnail: interop.PointerConvertible): interop.Pointer;

declare function QLThumbnailGetMaximumSize(thumbnail: interop.PointerConvertible): CGSize;

declare function QLThumbnailCopyOptions(thumbnail: interop.PointerConvertible): interop.Pointer;

declare function QLThumbnailDispatchAsync(thumbnail: interop.PointerConvertible, queue: NSObject, completion: () => void): void;

declare function QLThumbnailCopyImage(thumbnail: interop.PointerConvertible): interop.Pointer;

declare function QLThumbnailGetContentRect(thumbnail: interop.PointerConvertible): CGRect;

declare function QLThumbnailCancel(thumbnail: interop.PointerConvertible): void;

declare function QLThumbnailIsCancelled(thumbnail: interop.PointerConvertible): number;


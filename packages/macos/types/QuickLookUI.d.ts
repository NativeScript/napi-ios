/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./AppKit.d.ts" />

declare const QLPreviewViewStyle: {
  Normal: 0,
  Compact: 1,
};

declare interface QLPreviewPanelDataSource {
  numberOfPreviewItemsInPreviewPanel(panel: QLPreviewPanel): number;

  previewPanelPreviewItemAtIndex(panel: QLPreviewPanel, index: number): QLPreviewItem;
}

declare class QLPreviewPanelDataSource extends NativeObject implements QLPreviewPanelDataSource {
}

declare interface QLPreviewPanelDelegate extends NSWindowDelegate {
  previewPanelHandleEvent?(panel: QLPreviewPanel, event: NSEvent): boolean;

  previewPanelSourceFrameOnScreenForPreviewItem?(panel: QLPreviewPanel, item: QLPreviewItem): CGRect;

  previewPanelTransitionImageForPreviewItemContentRect?(panel: QLPreviewPanel, item: QLPreviewItem, contentRect: interop.PointerConvertible): interop.Object;
}

declare class QLPreviewPanelDelegate extends NativeObject implements QLPreviewPanelDelegate {
}

declare interface QLPreviewItem extends NSObjectProtocol {
  readonly previewItemURL: NSURL;

  readonly previewItemTitle?: string;

  readonly previewItemDisplayState?: interop.Object;
}

declare class QLPreviewItem extends NativeObject implements QLPreviewItem {
}

declare interface QLPreviewingController extends NSObjectProtocol {
  preparePreviewOfSearchableItemWithIdentifierQueryStringCompletionHandler?(identifier: string, queryString: string | null, handler: (p1: NSError) => void | null): void;

  preparePreviewOfFileAtURLCompletionHandler?(url: NSURL, handler: (p1: NSError) => void | null): void;

  providePreviewForFileRequestCompletionHandler?(request: QLFilePreviewRequest, handler: (p1: QLPreviewReply, p2: NSError) => void | null): void;
}

declare class QLPreviewingController extends NativeObject implements QLPreviewingController {
}

declare class QLPreviewReplyAttachment extends NSObject {
  readonly data: NSData;

  readonly contentType: UTType;

  initWithDataContentType(data: NSData, contentType: UTType): this;
}

// @ts-ignore ClassDecl.tsIgnore
declare class QLPreviewView extends NSView {
  initWithFrameStyle(frame: CGRect, style: interop.Enum<typeof QLPreviewViewStyle>): this;

  // @ts-ignore MemberDecl.tsIgnore
  initWithFrame(frame: CGRect): this;

  previewItem: QLPreviewItem;

  refreshPreviewItem(): void;

  displayState: interop.Object;

  close(): void;

  shouldCloseWithWindow: boolean;

  autostarts: boolean;

  setPreviewItem(previewItem: QLPreviewItem): void;

  setDisplayState(displayState: interop.Object): void;

  setShouldCloseWithWindow(shouldCloseWithWindow: boolean): void;

  setAutostarts(autostarts: boolean): void;
}

declare class QLPreviewProvider extends NSObject implements NSExtensionRequestHandling {
  beginRequestWithExtensionContext(context: NSExtensionContext): void;

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

declare class QLPreviewReply extends NSObject {
  stringEncoding: number;

  get attachments(): NSDictionary;
  set attachments(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  title: string;

  initWithContextSizeIsBitmapDrawingBlock(contextSize: CGSize, isBitmap: boolean, drawingBlock: (p1: interop.PointerConvertible, p2: QLPreviewReply, p3: interop.PointerConvertible) => boolean | null): this;

  initWithFileURL(fileURL: NSURL): this;

  initWithDataOfContentTypeContentSizeDataCreationBlock(contentType: UTType, contentSize: CGSize, dataCreationBlock: (p1: QLPreviewReply, p2: interop.PointerConvertible) => NSData | null): this;

  setStringEncoding(stringEncoding: number): void;

  setAttachments(attachments: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  setTitle(title: string): void;

  initForPDFWithPageSizeDocumentCreationBlock(defaultPageSize: CGSize, documentCreationBlock: (p1: QLPreviewReply, p2: interop.PointerConvertible) => PDFDocument | null): this;
}

declare class QLFilePreviewRequest extends NSObject {
  readonly fileURL: NSURL;
}

// @ts-ignore ClassDecl.tsIgnore
declare class QLPreviewPanel extends NSPanel {
  static sharedPreviewPanel(): QLPreviewPanel;

  static sharedPreviewPanelExists(): boolean;

  readonly currentController: interop.Object;

  updateController(): void;

  dataSource: QLPreviewPanelDataSource;

  reloadData(): void;

  refreshCurrentPreviewItem(): void;

  currentPreviewItemIndex: number;

  readonly currentPreviewItem: QLPreviewItem;

  displayState: interop.Object;

  // @ts-ignore MemberDecl.tsIgnore
  delegate: interop.Object;

  enterFullScreenModeWithOptions(screen: NSScreen, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): boolean;

  exitFullScreenModeWithOptions(options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  readonly inFullScreenMode: boolean;

  setDataSource(dataSource: QLPreviewPanelDataSource): void;

  setCurrentPreviewItemIndex(currentPreviewItemIndex: number): void;

  setDisplayState(displayState: interop.Object): void;

  // @ts-ignore MemberDecl.tsIgnore
  setDelegate(delegate: interop.Object): void;

  isInFullScreenMode(): boolean;
}


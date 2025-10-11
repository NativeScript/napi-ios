/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./UIKit.d.ts" />

declare const MSMessagesErrorDomain: string;

declare const MSStickersErrorDomain: string;

declare const MSMessagesAppPresentationStyle: {
  Compact: 0,
  Expanded: 1,
  Transcript: 2,
};

declare const MSStickerSize: {
  Small: 0,
  Regular: 1,
  Large: 2,
};

declare const MSMessageErrorCode: {
  Unknown: -1,
  FileNotFound: 1,
  FileUnreadable: 2,
  ImproperFileType: 3,
  ImproperFileURL: 4,
  StickerFileImproperFileAttributes: 5,
  StickerFileImproperFileSize: 6,
  StickerFileImproperFileFormat: 7,
  URLExceedsMaxSize: 8,
  SendWithoutRecentInteraction: 9,
  SendWhileNotVisible: 10,
  APIUnavailableInPresentationContext: 11,
};

declare const MSMessagesAppPresentationContext: {
  Messages: 0,
  Media: 1,
};

declare interface MSMessagesAppTranscriptPresentation {
  contentSizeThatFits(size: CGSize): CGSize;

  readonly messageTintColor: UIColor;

  readonly messageCornerRadius: number;

  invalidateMessageTintColor(): void;
}

declare class MSMessagesAppTranscriptPresentation extends NativeObject implements MSMessagesAppTranscriptPresentation {
}

declare interface MSStickerBrowserViewDataSource extends NSObjectProtocol {
  numberOfStickersInStickerBrowserView(stickerBrowserView: MSStickerBrowserView): number;

  stickerBrowserViewStickerAtIndex(stickerBrowserView: MSStickerBrowserView, index: number): MSSticker;
}

declare class MSStickerBrowserViewDataSource extends NativeObject implements MSStickerBrowserViewDataSource {
}

declare class MSSession extends NSObject implements NSSecureCoding {
  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class MSMessageLiveLayout extends MSMessageLayout {
  initWithAlternateLayout(alternateLayout: MSMessageTemplateLayout): this;

  readonly alternateLayout: MSMessageTemplateLayout;
}

// @ts-ignore ClassDecl.tsIgnore
declare class MSMessage extends NSObject implements NSCopying, NSSecureCoding {
  init(): this;

  initWithSession(session: MSSession): this;

  readonly session: MSSession;

  readonly pending: boolean;

  readonly senderParticipantIdentifier: NSUUID;

  layout: MSMessageLayout;

  URL: NSURL;

  shouldExpire: boolean;

  accessibilityLabel: string;

  summaryText: string;

  error: NSError;

  isPending(): boolean;

  setLayout(layout: MSMessageLayout | null): void;

  setURL(URL: NSURL | null): void;

  setShouldExpire(shouldExpire: boolean): void;

  // @ts-ignore MemberDecl.tsIgnore
  setAccessibilityLabel(accessibilityLabel: string | null): void;

  setSummaryText(summaryText: string | null): void;

  setError(error: NSError | null): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class MSMessagesAppViewController extends UIViewController implements MSMessagesAppTranscriptPresentation {
  readonly activeConversation: MSConversation;

  readonly presentationStyle: interop.Enum<typeof MSMessagesAppPresentationStyle>;

  readonly presentationContext: interop.Enum<typeof MSMessagesAppPresentationContext>;

  requestPresentationStyle(presentationStyle: interop.Enum<typeof MSMessagesAppPresentationStyle>): void;

  willBecomeActiveWithConversation(conversation: MSConversation): void;

  didBecomeActiveWithConversation(conversation: MSConversation): void;

  willResignActiveWithConversation(conversation: MSConversation): void;

  didResignActiveWithConversation(conversation: MSConversation): void;

  dismiss(): void;

  willSelectMessageConversation(message: MSMessage, conversation: MSConversation): void;

  didSelectMessageConversation(message: MSMessage, conversation: MSConversation): void;

  didReceiveMessageConversation(message: MSMessage, conversation: MSConversation): void;

  didStartSendingMessageConversation(message: MSMessage, conversation: MSConversation): void;

  didCancelSendingMessageConversation(message: MSMessage, conversation: MSConversation): void;

  willTransitionToPresentationStyle(presentationStyle: interop.Enum<typeof MSMessagesAppPresentationStyle>): void;

  didTransitionToPresentationStyle(presentationStyle: interop.Enum<typeof MSMessagesAppPresentationStyle>): void;

  contentSizeThatFits(size: CGSize): CGSize;

  readonly messageTintColor: UIColor;

  readonly messageCornerRadius: number;

  invalidateMessageTintColor(): void;
}

declare class MSSticker extends NSObject {
  initWithContentsOfFileURLLocalizedDescriptionError(fileURL: NSURL, localizedDescription: string, error: interop.PointerConvertible): this;

  readonly imageFileURL: NSURL;

  readonly localizedDescription: string;
}

declare class MSMessageTemplateLayout extends MSMessageLayout {
  caption: string;

  subcaption: string;

  trailingCaption: string;

  trailingSubcaption: string;

  image: UIImage;

  mediaFileURL: NSURL;

  imageTitle: string;

  imageSubtitle: string;

  setCaption(caption: string | null): void;

  setSubcaption(subcaption: string | null): void;

  setTrailingCaption(trailingCaption: string | null): void;

  setTrailingSubcaption(trailingSubcaption: string | null): void;

  setImage(image: UIImage | null): void;

  setMediaFileURL(mediaFileURL: NSURL | null): void;

  setImageTitle(imageTitle: string | null): void;

  setImageSubtitle(imageSubtitle: string | null): void;
}

declare class MSStickerBrowserView extends UIView {
  initWithFrame(frame: CGRect): this;

  initWithFrameStickerSize(frame: CGRect, stickerSize: interop.Enum<typeof MSStickerSize>): this;

  readonly stickerSize: interop.Enum<typeof MSStickerSize>;

  dataSource: MSStickerBrowserViewDataSource;

  contentOffset: CGPoint;

  contentInset: UIEdgeInsets;

  setContentOffsetAnimated(contentOffset: CGPoint, animated: boolean): void;

  reloadData(): void;

  setDataSource(dataSource: MSStickerBrowserViewDataSource | null): void;

  setContentOffset(contentOffset: CGPoint): void;

  setContentInset(contentInset: UIEdgeInsets): void;
}

declare class MSStickerBrowserViewController extends UIViewController implements MSStickerBrowserViewDataSource {
  initWithStickerSize(stickerSize: interop.Enum<typeof MSStickerSize>): this;

  readonly stickerBrowserView: MSStickerBrowserView;

  readonly stickerSize: interop.Enum<typeof MSStickerSize>;

  numberOfStickersInStickerBrowserView(stickerBrowserView: MSStickerBrowserView): number;

  stickerBrowserViewStickerAtIndex(stickerBrowserView: MSStickerBrowserView, index: number): MSSticker;

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

declare class MSStickerView extends UIView {
  initWithFrameSticker(frame: CGRect, sticker: MSSticker | null): this;

  sticker: MSSticker;

  readonly animationDuration: number;

  startAnimating(): void;

  stopAnimating(): void;

  isAnimating(): boolean;

  setSticker(sticker: MSSticker | null): void;
}

declare class MSMessageLayout extends NSObject implements NSCopying {
  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class MSConversation extends NSObject {
  readonly localParticipantIdentifier: NSUUID;

  readonly remoteParticipantIdentifiers: NSArray;

  readonly selectedMessage: MSMessage;

  insertMessageCompletionHandler(message: MSMessage, completionHandler: (p1: NSError) => void | null): void;

  insertStickerCompletionHandler(sticker: MSSticker, completionHandler: (p1: NSError) => void | null): void;

  insertTextCompletionHandler(text: string, completionHandler: (p1: NSError) => void | null): void;

  insertAttachmentWithAlternateFilenameCompletionHandler(URL: NSURL, filename: string | null, completionHandler: (p1: NSError) => void | null): void;

  sendMessageCompletionHandler(message: MSMessage, completionHandler: (p1: NSError) => void | null): void;

  sendStickerCompletionHandler(sticker: MSSticker, completionHandler: (p1: NSError) => void | null): void;

  sendTextCompletionHandler(text: string, completionHandler: (p1: NSError) => void | null): void;

  sendAttachmentWithAlternateFilenameCompletionHandler(URL: NSURL, filename: string | null, completionHandler: (p1: NSError) => void | null): void;
}


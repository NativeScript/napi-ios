/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./UIKit.d.ts" />
/// <reference path="./Runtime.d.ts" />

declare const SLServiceTypeFacebook: string;

declare const SLServiceTypeTwitter: string;

declare const SLServiceTypeLinkedIn: string;

declare const SLServiceTypeTencentWeibo: string;

declare const SLServiceTypeSinaWeibo: string;

declare const SLComposeViewControllerResult: {
  Cancelled: 0,
  Done: 1,
};

declare const SLRequestMethod: {
  GET: 0,
  POST: 1,
  DELETE: 2,
  PUT: 3,
};

declare class SLComposeViewController extends UIViewController {
  static isAvailableForServiceType(serviceType: string): boolean;

  static composeViewControllerForServiceType(serviceType: string): SLComposeViewController;

  readonly serviceType: string;

  setInitialText(text: string): boolean;

  addImage(image: UIImage): boolean;

  removeAllImages(): boolean;

  addURL(url: NSURL): boolean;

  removeAllURLs(): boolean;

  completionHandler: (p1: interop.Enum<typeof SLComposeViewControllerResult>) => void;

  setCompletionHandler(completionHandler: (p1: interop.Enum<typeof SLComposeViewControllerResult>) => void): void;
}

declare class SLRequest extends NSObject {
  static requestForServiceTypeRequestMethodURLParameters(serviceType: string, requestMethod: interop.Enum<typeof SLRequestMethod>, url: NSURL, parameters: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): SLRequest;

  account: ACAccount;

  readonly requestMethod: interop.Enum<typeof SLRequestMethod>;

  readonly URL: NSURL;

  readonly parameters: NSDictionary;

  addMultipartDataWithNameTypeFilename(data: NSData, name: string, type: string, filename: string): void;

  preparedURLRequest(): NSURLRequest;

  performRequestWithHandler(handler: (p1: NSData, p2: NSHTTPURLResponse, p3: NSError) => void): void;

  setAccount(account: ACAccount): void;
}

declare class SLComposeSheetConfigurationItem extends NSObject {
  init(): this;

  title: string;

  value: string;

  valuePending: boolean;

  tapHandler: () => void;

  setTitle(title: string): void;

  setValue(value: string): void;

  setValuePending(valuePending: boolean): void;

  setTapHandler(tapHandler: () => void): void;
}

declare class SLComposeServiceViewController extends UIViewController implements UITextViewDelegate {
  presentationAnimationDidFinish(): void;

  readonly textView: UITextView;

  readonly contentText: string;

  placeholder: string;

  didSelectPost(): void;

  didSelectCancel(): void;

  cancel(): void;

  isContentValid(): boolean;

  validateContent(): void;

  charactersRemaining: NSNumber;

  configurationItems(): NSArray;

  reloadConfigurationItems(): void;

  pushConfigurationViewController(viewController: UIViewController): void;

  popConfigurationViewController(): void;

  loadPreviewView(): UIView;

  autoCompletionViewController: UIViewController;

  setPlaceholder(placeholder: string): void;

  setCharactersRemaining(charactersRemaining: NSNumber): void;

  setAutoCompletionViewController(autoCompletionViewController: UIViewController): void;

  textViewShouldBeginEditing(textView: UITextView): boolean;

  textViewShouldEndEditing(textView: UITextView): boolean;

  textViewDidBeginEditing(textView: UITextView): void;

  textViewDidEndEditing(textView: UITextView): void;

  textViewShouldChangeTextInRangeReplacementText(textView: UITextView, range: _NSRange, text: string): boolean;

  textViewShouldChangeTextInRangesReplacementText(textView: UITextView, ranges: NSArray<interop.Object> | Array<interop.Object>, text: string): boolean;

  textViewDidChange(textView: UITextView): void;

  textViewDidChangeSelection(textView: UITextView): void;

  textViewEditMenuForTextInRangeSuggestedActions(textView: UITextView, range: _NSRange, suggestedActions: NSArray<interop.Object> | Array<interop.Object>): UIMenu;

  textViewEditMenuForTextInRangesSuggestedActions(textView: UITextView, ranges: NSArray<interop.Object> | Array<interop.Object>, suggestedActions: NSArray<interop.Object> | Array<interop.Object>): UIMenu;

  textViewWillPresentEditMenuWithAnimator(textView: UITextView, animator: UIEditMenuInteractionAnimating): void;

  textViewWillDismissEditMenuWithAnimator(textView: UITextView, animator: UIEditMenuInteractionAnimating): void;

  textViewPrimaryActionForTextItemDefaultAction(textView: UITextView, textItem: UITextItem, defaultAction: UIAction): UIAction;

  textViewMenuConfigurationForTextItemDefaultMenu(textView: UITextView, textItem: UITextItem, defaultMenu: UIMenu): UITextItemMenuConfiguration;

  textViewTextItemMenuWillDisplayForTextItemAnimator(textView: UITextView, textItem: UITextItem, animator: UIContextMenuInteractionAnimating): void;

  textViewTextItemMenuWillEndForTextItemAnimator(textView: UITextView, textItem: UITextItem, animator: UIContextMenuInteractionAnimating): void;

  textViewWritingToolsWillBegin(textView: UITextView): void;

  textViewWritingToolsDidEnd(textView: UITextView): void;

  textViewWritingToolsIgnoredRangesInEnclosingRange(textView: UITextView, enclosingRange: _NSRange): NSArray;

  textViewShouldInteractWithURLInRangeInteraction(textView: UITextView, URL: NSURL, characterRange: _NSRange, interaction: interop.Enum<typeof UITextItemInteraction>): boolean;

  textViewShouldInteractWithTextAttachmentInRangeInteraction(textView: UITextView, textAttachment: NSTextAttachment, characterRange: _NSRange, interaction: interop.Enum<typeof UITextItemInteraction>): boolean;

  textViewShouldInteractWithURLInRange(textView: UITextView, URL: NSURL, characterRange: _NSRange): boolean;

  textViewShouldInteractWithTextAttachmentInRange(textView: UITextView, textAttachment: NSTextAttachment, characterRange: _NSRange): boolean;

  textViewWillBeginFormattingWithViewController(textView: UITextView, viewController: UITextFormattingViewController): void;

  textViewDidBeginFormattingWithViewController(textView: UITextView, viewController: UITextFormattingViewController): void;

  textViewWillEndFormattingWithViewController(textView: UITextView, viewController: UITextFormattingViewController): void;

  textViewDidEndFormattingWithViewController(textView: UITextView, viewController: UITextFormattingViewController): void;

  textViewInsertInputSuggestion(textView: UITextView, inputSuggestion: UIInputSuggestion): void;

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

  scrollViewDidScroll(scrollView: UIScrollView): void;

  scrollViewDidZoom(scrollView: UIScrollView): void;

  scrollViewWillBeginDragging(scrollView: UIScrollView): void;

  scrollViewWillEndDraggingWithVelocityTargetContentOffset(scrollView: UIScrollView, velocity: CGPoint, targetContentOffset: interop.PointerConvertible): void;

  scrollViewDidEndDraggingWillDecelerate(scrollView: UIScrollView, decelerate: boolean): void;

  scrollViewWillBeginDecelerating(scrollView: UIScrollView): void;

  scrollViewDidEndDecelerating(scrollView: UIScrollView): void;

  scrollViewDidEndScrollingAnimation(scrollView: UIScrollView): void;

  viewForZoomingInScrollView(scrollView: UIScrollView): UIView;

  scrollViewWillBeginZoomingWithView(scrollView: UIScrollView, view: UIView | null): void;

  scrollViewDidEndZoomingWithViewAtScale(scrollView: UIScrollView, view: UIView | null, scale: number): void;

  scrollViewShouldScrollToTop(scrollView: UIScrollView): boolean;

  scrollViewDidScrollToTop(scrollView: UIScrollView): void;

  scrollViewDidChangeAdjustedContentInset(scrollView: UIScrollView): void;
}


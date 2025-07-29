/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./AppKit.d.ts" />

declare const SLServiceTypeTencentWeibo: string;

declare const SLServiceTypeSinaWeibo: string;

declare const SLServiceTypeTwitter: string;

declare const SLServiceTypeLinkedIn: string;

declare const SLServiceTypeFacebook: string;

declare const SLRequestMethod: {
  GET: 0,
  POST: 1,
  DELETE: 2,
  PUT: 3,
};

declare class SLRequest extends NSObject {
  static requestForServiceTypeRequestMethodURLParameters(serviceType: string, requestMethod: interop.Enum<typeof SLRequestMethod>, url: NSURL, parameters: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): SLRequest;

  account: ACAccount;

  readonly requestMethod: interop.Enum<typeof SLRequestMethod>;

  readonly URL: NSURL;

  readonly parameters: NSDictionary;

  addMultipartDataWithNameTypeFilename(data: NSData, name: string, type: string, filename: string): void;

  addMultipartDataWithNameType(data: NSData, name: string, type: string): void;

  preparedURLRequest(): NSURLRequest;

  performRequestWithHandler(handler: (p1: NSData, p2: NSHTTPURLResponse, p3: NSError) => void): void;

  setAccount(account: ACAccount): void;
}

declare class SLComposeServiceViewController extends NSViewController implements NSTextViewDelegate {
  presentationAnimationDidFinish(): void;

  readonly textView: NSTextView;

  readonly contentText: string;

  placeholder: string;

  didSelectPost(): void;

  didSelectCancel(): void;

  cancel(): void;

  isContentValid(): boolean;

  validateContent(): void;

  charactersRemaining: NSNumber;

  setPlaceholder(placeholder: string): void;

  setCharactersRemaining(charactersRemaining: NSNumber): void;

  textViewClickedOnLinkAtIndex(textView: NSTextView, link: interop.Object, charIndex: number): boolean;

  textViewClickedOnCellInRectAtIndex(textView: NSTextView, cell: NSTextAttachmentCell, cellFrame: CGRect, charIndex: number): void;

  textViewDoubleClickedOnCellInRectAtIndex(textView: NSTextView, cell: NSTextAttachmentCell, cellFrame: CGRect, charIndex: number): void;

  textViewDraggedCellInRectEventAtIndex(view: NSTextView, cell: NSTextAttachmentCell, rect: CGRect, event: NSEvent, charIndex: number): void;

  textViewWritablePasteboardTypesForCellAtIndex(view: NSTextView, cell: NSTextAttachmentCell, charIndex: number): NSArray;

  textViewWriteCellAtIndexToPasteboardType(view: NSTextView, cell: NSTextAttachmentCell, charIndex: number, pboard: NSPasteboard, type: string): boolean;

  textViewWillChangeSelectionFromCharacterRangeToCharacterRange(textView: NSTextView, oldSelectedCharRange: _NSRange, newSelectedCharRange: _NSRange): _NSRange;

  textViewWillChangeSelectionFromCharacterRangesToCharacterRanges(textView: NSTextView, oldSelectedCharRanges: NSArray<interop.Object> | Array<interop.Object>, newSelectedCharRanges: NSArray<interop.Object> | Array<interop.Object>): NSArray;

  textViewShouldChangeTextInRangesReplacementStrings(textView: NSTextView, affectedRanges: NSArray<interop.Object> | Array<interop.Object>, replacementStrings: NSArray<interop.Object> | Array<interop.Object> | null): boolean;

  textViewShouldChangeTypingAttributesToAttributes(textView: NSTextView, oldTypingAttributes: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, newTypingAttributes: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): NSDictionary;

  textViewDidChangeSelection(notification: NSNotification): void;

  textViewDidChangeTypingAttributes(notification: NSNotification): void;

  textViewWillDisplayToolTipForCharacterAtIndex(textView: NSTextView, tooltip: string, characterIndex: number): string;

  textViewCompletionsForPartialWordRangeIndexOfSelectedItem(textView: NSTextView, words: NSArray<interop.Object> | Array<interop.Object>, charRange: _NSRange, index: interop.PointerConvertible): NSArray;

  textViewShouldChangeTextInRangeReplacementString(textView: NSTextView, affectedCharRange: _NSRange, replacementString: string | null): boolean;

  textViewDoCommandBySelector(textView: NSTextView, commandSelector: string): boolean;

  textViewShouldSetSpellingStateRange(textView: NSTextView, value: number, affectedCharRange: _NSRange): number;

  textViewMenuForEventAtIndex(view: NSTextView, menu: NSMenu, event: NSEvent, charIndex: number): NSMenu;

  textViewWillCheckTextInRangeOptionsTypes(view: NSTextView, range: _NSRange, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, checkingTypes: interop.PointerConvertible): NSDictionary;

  textViewDidCheckTextInRangeTypesOptionsResultsOrthographyWordCount(view: NSTextView, range: _NSRange, checkingTypes: number, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, results: NSArray<interop.Object> | Array<interop.Object>, orthography: NSOrthography, wordCount: number): NSArray;

  textViewURLForContentsOfTextAttachmentAtIndex(textView: NSTextView, textAttachment: NSTextAttachment, charIndex: number): NSURL;

  textViewWillShowSharingServicePickerForItems(textView: NSTextView, servicePicker: NSSharingServicePicker, items: NSArray<interop.Object> | Array<interop.Object>): NSSharingServicePicker;

  undoManagerForTextView(view: NSTextView): NSUndoManager;

  textViewShouldUpdateTouchBarItemIdentifiers(textView: NSTextView, identifiers: NSArray<interop.Object> | Array<interop.Object>): NSArray;

  textViewCandidatesForSelectedRange(textView: NSTextView, selectedRange: _NSRange): NSArray;

  textViewShouldSelectCandidateAtIndex(textView: NSTextView, index: number): boolean;

  textViewWritingToolsWillBegin(textView: NSTextView): void;

  textViewWritingToolsDidEnd(textView: NSTextView): void;

  textViewWritingToolsIgnoredRangesInEnclosingRange(textView: NSTextView, enclosingRange: _NSRange): NSArray;

  textViewClickedOnLink(textView: NSTextView, link: interop.Object): boolean;

  textViewClickedOnCellInRect(textView: NSTextView, cell: NSTextAttachmentCell, cellFrame: CGRect): void;

  textViewDoubleClickedOnCellInRect(textView: NSTextView, cell: NSTextAttachmentCell, cellFrame: CGRect): void;

  textViewDraggedCellInRectEvent(view: NSTextView, cell: NSTextAttachmentCell, rect: CGRect, event: NSEvent): void;

  textShouldBeginEditing(textObject: NSText): boolean;

  textShouldEndEditing(textObject: NSText): boolean;

  textDidBeginEditing(notification: NSNotification): void;

  textDidEndEditing(notification: NSNotification): void;

  textDidChange(notification: NSNotification): void;

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


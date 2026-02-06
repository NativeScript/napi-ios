/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./UIKit.d.ts" />

declare const BEAccessibilitySelectionChangedNotification: number;

declare const BEAccessibilityTraitVisited: number;

declare const BEAccessibilityTraitReadOnly: number;

declare const BEAccessibilityTraitRadioButton: number;

declare const BEAccessibilityTraitPopUpButton: number;

declare const BEAccessibilityTraitMenuItem: number;

declare const BEAccessibilityValueChangedNotification: number;

declare const BETextDocumentRequestOptions: {
  None: 0,
  Text: 1,
  AttributedText: 2,
  TextRects: 4,
  MarkedTextRects: 32,
  AutocorrectedRanges: 128,
};

declare const BESelectionFlags: {
  SelectionFlagsNone: 0,
  WordIsNearTap: 1,
  SelectionFlipped: 2,
  PhraseBoundaryChanged: 4,
};

declare const BEGestureType: {
  Loupe: 0,
  OneFingerTap: 1,
  DoubleTapAndHold: 2,
  DoubleTap: 3,
  OneFingerDoubleTap: 8,
  OneFingerTripleTap: 9,
  TwoFingerSingleTap: 10,
  TwoFingerRangedSelectGesture: 11,
  IMPhraseBoundaryDrag: 14,
  ForceTouch: 15,
};

declare const BEScrollViewScrollUpdatePhase: {
  Began: 0,
  Changed: 1,
  Ended: 2,
  Cancelled: 3,
};

declare const BETextReplacementOptions: {
  None: 0,
  AddUnderline: 1,
};

declare const BEAccessibilityPressedState: {
  Undefined: 0,
  False: 1,
  True: 2,
  Mixed: 3,
};

declare const BEKeyPressState: {
  Down: 1,
  Up: 2,
};

declare const BESelectionTouchPhase: {
  Started: 0,
  Moved: 1,
  Ended: 2,
  EndedMovingForward: 3,
  EndedMovingBackward: 4,
  EndedNotMoving: 5,
};

declare const BEKeyModifierFlags: {
  None: 0,
  Shift: 1,
  CapsLock: 2,
};

declare const BEAccessibilityContainerType: {
  None: 0,
  Landmark: 1,
  Table: 2,
  List: 4,
  Fieldset: 8,
  Dialog: 16,
  Tree: 32,
  Frame: 64,
  Article: 128,
  SemanticGroup: 256,
  ScrollArea: 512,
  Alert: 1024,
  DescriptionList: 2048,
};

declare class BEDirectionalTextRange {
  constructor(init?: BEDirectionalTextRange);
  offset: number;
  length: number;
}

declare interface BEResponderEditActions extends UIResponderStandardEditActions {
  share?(sender: interop.Object | null): void;

  addShortcut?(sender: interop.Object | null): void;

  lookup?(sender: interop.Object | null): void;

  findSelected?(sender: interop.Object | null): void;

  promptForReplace?(sender: interop.Object | null): void;

  replace?(sender: interop.Object | null): void;

  translate?(sender: interop.Object | null): void;

  transliterateChinese?(sender: interop.Object | null): void;
}

declare class BEResponderEditActions extends NativeObject implements BEResponderEditActions {
}

declare interface BETextInputDelegate {
  shouldDeferEventHandlingToSystemForTextInputContext(textInput: BETextInput, keyEventContext: BEKeyEntryContext): boolean;

  textInputSetCandidateSuggestions(textInput: BETextInput, suggestions: NSArray<interop.Object> | Array<interop.Object> | null): void;

  selectionWillChangeForTextInput(textInput: BETextInput): void;

  selectionDidChangeForTextInput(textInput: BETextInput): void;

  textInputDeferReplaceTextActionToSystem(textInput: BETextInput, sender: interop.Object): void;

  invalidateTextEntryContextForTextInput(textInput: BETextInput): void;
}

declare class BETextInputDelegate extends NativeObject implements BETextInputDelegate {
}

declare interface BETextInput extends UIKeyInput, BETextSelectionDirectionNavigation, BEResponderEditActions {
  asyncInputDelegate: BETextInputDelegate;

  canPerformActionWithSender(action: string, sender: interop.Object | null): boolean;

  readonly editable: boolean;

  handleKeyEntryWithCompletionHandler(entry: BEKeyEntry, completionHandler: (p1: BEKeyEntry, p2: boolean) => void): void;

  shiftKeyStateChangedFromStateToState(oldState: interop.Enum<typeof BEKeyModifierFlags>, newState: interop.Enum<typeof BEKeyModifierFlags>): void;

  textInRange(range: UITextRange): string;

  offsetFromPositionToPosition(from: UITextPosition, toPosition: UITextPosition): number;

  setBaseWritingDirectionForRange(writingDirection: interop.Enum<typeof NSWritingDirection>, range: UITextRange): void;

  deleteInDirectionToGranularity(direction: interop.Enum<typeof UITextStorageDirection>, granularity: interop.Enum<typeof UITextGranularity>): void;

  transposeCharactersAroundSelection(): void;

  replaceTextWithTextOptionsCompletionHandler(originalText: string, replacementText: string, options: interop.Enum<typeof BETextReplacementOptions>, completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>) => void): void;

  requestTextContextForAutocorrectionWithCompletionHandler(completionHandler: (p1: BETextDocumentContext) => void): void;

  requestTextRectsForStringWithCompletionHandler(input: string, completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>) => void): void;

  readonly automaticallyPresentEditMenu: boolean;

  requestPreferredArrowDirectionForEditMenuWithCompletionHandler(completionHandler: (p1: interop.Enum<typeof UIEditMenuArrowDirection>) => void): void;

  systemWillPresentEditMenuWithAnimator(animator: UIEditMenuInteractionAnimating): void;

  systemWillDismissEditMenuWithAnimator(animator: UIEditMenuInteractionAnimating): void;

  readonly extendedTextInputTraits: BEExtendedTextInputTraits;

  textStylingAtPositionInDirection(position: UITextPosition, direction: interop.Enum<typeof UITextStorageDirection>): NSDictionary;

  readonly replaceAllowed: boolean;

  replaceSelectedTextWithText(text: string, replacementText: string): void;

  updateCurrentSelectionToFromGestureInState(point: CGPoint, gestureType: interop.Enum<typeof BEGestureType>, state: interop.Enum<typeof UIGestureRecognizerState>): void;

  setSelectionFromPointToPointGestureState(from: CGPoint, to: CGPoint, gesture: interop.Enum<typeof BEGestureType>, state: interop.Enum<typeof UIGestureRecognizerState>): void;

  adjustSelectionBoundaryToPointTouchPhaseBaseIsStartFlags(point: CGPoint, touch: interop.Enum<typeof BESelectionTouchPhase>, boundaryIsStart: boolean, flags: interop.Enum<typeof BESelectionFlags>): void;

  textInteractionGestureShouldBeginAtPoint(gestureType: interop.Enum<typeof BEGestureType>, point: CGPoint): boolean;

  readonly selectionContainerViewBelowText?: UIView;

  readonly selectionContainerViewAboveText?: UIView;

  readonly selectedText: string;

  selectedTextRange: UITextRange;

  readonly selectionAtDocumentStart: boolean;

  caretRectForPosition(position: UITextPosition): CGRect;

  selectionRectsForRange(range: UITextRange): NSArray;

  selectWordForReplacement(): void;

  updateSelectionWithExtentPointBoundaryCompletionHandler(point: CGPoint, granularity: interop.Enum<typeof UITextGranularity>, completionHandler: (p1: boolean) => void): void;

  selectTextInGranularityAtPointCompletionHandler(granularity: interop.Enum<typeof UITextGranularity>, point: CGPoint, completionHandler: () => void): void;

  selectPositionAtPointCompletionHandler(point: CGPoint, completionHandler: () => void): void;

  selectPositionAtPointWithContextRequestCompletionHandler(point: CGPoint, request: BETextDocumentRequest, completionHandler: (p1: BETextDocumentContext) => void): void;

  adjustSelectionByRangeCompletionHandler(range: BEDirectionalTextRange, completionHandler: () => void): void;

  moveByOffset(offset: number): void;

  moveSelectionAtBoundaryInStorageDirectionCompletionHandler(granularity: interop.Enum<typeof UITextGranularity>, direction: interop.Enum<typeof UITextStorageDirection>, completionHandler: () => void): void;

  selectTextForEditMenuWithLocationInViewCompletionHandler(locationInView: CGPoint, completionHandler: (p1: boolean, p2: string, p3: _NSRange) => void | null): void;

  readonly markedText: string;

  readonly attributedMarkedText: NSAttributedString;

  readonly markedTextRange: UITextRange;

  readonly hasMarkedText: boolean;

  setMarkedTextSelectedRange(markedText: string | null, selectedRange: _NSRange): void;

  setAttributedMarkedTextSelectedRange(markedText: NSAttributedString | null, selectedRange: _NSRange): void;

  unmarkText(): void;

  isPointNearMarkedText(point: CGPoint): boolean;

  requestDocumentContextCompletionHandler(request: BETextDocumentRequest, completionHandler: (p1: BETextDocumentContext) => void): void;

  willInsertFinalDictationResult(): void;

  replaceDictatedTextWithText(oldText: string, newText: string): void;

  didInsertFinalDictationResult(): void;

  alternativesForSelectedText(): NSArray;

  addTextAlternatives(alternatives: BETextAlternatives): void;

  insertTextAlternatives(alternatives: BETextAlternatives): void;

  removeTextAlternatives?(): void;

  insertTextPlaceholderWithSizeCompletionHandler(size: CGSize, completionHandler: (p1: UITextPlaceholder) => void): void;

  removeTextPlaceholderWillInsertTextCompletionHandler(placeholder: UITextPlaceholder, willInsertText: boolean, completionHandler: () => void): void;

  insertTextSuggestion(textSuggestion: BETextSuggestion): void;

  readonly textInputView: UIView;

  readonly textFirstRect: CGRect;

  readonly textLastRect: CGRect;

  readonly unobscuredContentRect: CGRect;

  readonly unscaledView: UIView;

  readonly selectionClipRect: CGRect;

  autoscrollToPoint(point: CGPoint): void;

  cancelAutoscroll(): void;

  keyboardWillDismiss?(): void;

  setAsyncInputDelegate(asyncInputDelegate: BETextInputDelegate | null): void;

  isEditable(): boolean;

  isReplaceAllowed(): boolean;

  setSelectedTextRange(selectedTextRange: UITextRange | null): void;

  isSelectionAtDocumentStart(): boolean;
}

declare class BETextInput extends NativeObject implements BETextInput {
}

declare interface BEExtendedTextInputTraits extends UITextInputTraits {
  readonly singleLineDocument?: boolean;

  readonly typingAdaptationEnabled?: boolean;

  readonly insertionPointColor?: UIColor;

  readonly selectionHandleColor?: UIColor;

  readonly selectionHighlightColor?: UIColor;

  isSingleLineDocument?(): boolean;

  isTypingAdaptationEnabled?(): boolean;
}

declare class BEExtendedTextInputTraits extends NativeObject implements BEExtendedTextInputTraits {
}

declare interface BEScrollViewDelegate extends UIScrollViewDelegate {
  scrollViewHandleScrollUpdateCompletion?(scrollView: BEScrollView, scrollUpdate: BEScrollViewScrollUpdate, completion: (p1: boolean) => void): void;

  parentScrollViewForScrollView?(scrollView: BEScrollView): BEScrollView;
}

declare class BEScrollViewDelegate extends NativeObject implements BEScrollViewDelegate {
}

declare interface BETextSelectionDirectionNavigation {
  moveInLayoutDirection(direction: interop.Enum<typeof UITextLayoutDirection>): void;

  extendInLayoutDirection(direction: interop.Enum<typeof UITextLayoutDirection>): void;

  moveInStorageDirectionByGranularity(direction: interop.Enum<typeof UITextStorageDirection>, granularity: interop.Enum<typeof UITextGranularity>): void;

  extendInStorageDirectionByGranularity(direction: interop.Enum<typeof UITextStorageDirection>, granularity: interop.Enum<typeof UITextGranularity>): void;
}

declare class BETextSelectionDirectionNavigation extends NativeObject implements BETextSelectionDirectionNavigation {
}

declare interface BEAccessibilityTextMarkerSupport extends NSObjectProtocol {
  accessibilityBoundsForTextMarkerRange(range: BEAccessibilityTextMarkerRange): CGRect;

  accessibilityContentForTextMarkerRange(range: BEAccessibilityTextMarkerRange): string;

  accessibilityTextMarkerRangeForCurrentSelection(): BEAccessibilityTextMarkerRange;

  accessibilityTextMarkerRange(): BEAccessibilityTextMarkerRange;

  accessibilityNextTextMarker(marker: BEAccessibilityTextMarker): BEAccessibilityTextMarker;

  accessibilityPreviousTextMarker(marker: BEAccessibilityTextMarker): BEAccessibilityTextMarker;

  accessibilityLineEndMarkerForMarker(marker: BEAccessibilityTextMarker): BEAccessibilityTextMarker;

  accessibilityLineStartMarkerForMarker(marker: BEAccessibilityTextMarker): BEAccessibilityTextMarker;

  accessibilityMarkerForPoint(point: CGPoint): BEAccessibilityTextMarker;

  accessibilityTextMarkerForPosition(position: number): BEAccessibilityTextMarker;

  accessibilityTextMarkerRangeForRange(range: _NSRange): BEAccessibilityTextMarkerRange;

  accessibilityRangeForTextMarkerRange(range: BEAccessibilityTextMarkerRange): _NSRange;
}

declare class BEAccessibilityTextMarkerSupport extends NativeObject implements BEAccessibilityTextMarkerSupport {
}

declare interface BETextInteractionDelegate {
  systemWillChangeSelectionForInteraction(textInteraction: BETextInteraction): void;

  systemDidChangeSelectionForInteraction(textInteraction: BETextInteraction): void;
}

declare class BETextInteractionDelegate extends NativeObject implements BETextInteractionDelegate {
}

declare class BEAccessibilityTextMarkerRange extends NSObject implements NSCopying, NSSecureCoding {
  startMarker: BEAccessibilityTextMarker;

  endMarker: BEAccessibilityTextMarker;

  setStartMarker(startMarker: BEAccessibilityTextMarker): void;

  setEndMarker(endMarker: BEAccessibilityTextMarker): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class BEAccessibilityTextMarker extends NSObject implements NSCopying, NSSecureCoding {
  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class BEWebAppManifest extends NSObject {
  initWithJSONDataManifestURL(jsonData: NSData, manifestURL: NSURL): this;

  readonly jsonData: NSData;

  readonly manifestURL: NSURL;
}

declare class BETextDocumentRequest extends NSObject {
  options: interop.Enum<typeof BETextDocumentRequestOptions>;

  surroundingGranularity: interop.Enum<typeof UITextGranularity>;

  granularityCount: number;

  setOptions(options: interop.Enum<typeof BETextDocumentRequestOptions>): void;

  setSurroundingGranularity(surroundingGranularity: interop.Enum<typeof UITextGranularity>): void;

  setGranularityCount(granularityCount: number): void;
}

declare class BEKeyEntryContext extends NSObject {
  readonly keyEntry: BEKeyEntry;

  documentEditable: boolean;

  shouldInsertCharacter: boolean;

  shouldEvaluateForInputSystemHandling: boolean;

  initWithKeyEntry(keyEntry: BEKeyEntry): this;

  isDocumentEditable(): boolean;

  setDocumentEditable(documentEditable: boolean): void;

  setShouldInsertCharacter(shouldInsertCharacter: boolean): void;

  setShouldEvaluateForInputSystemHandling(shouldEvaluateForInputSystemHandling: boolean): void;
}

declare class BETextInteraction extends NSObject implements UIInteraction {
  delegate: BETextInteractionDelegate | null;

  addShortcutForTextFromRect(text: string, presentationRect: CGRect): void;

  shareTextFromRect(text: string, presentationRect: CGRect): void;

  showDictionaryForTextInContextDefiningTextInRangeFromRect(textWithContext: string, range: _NSRange, presentationRect: CGRect): void;

  translateTextFromRect(text: string, presentationRect: CGRect): void;

  showReplacementsForText(text: string): void;

  transliterateChineseForText(text: string): void;

  presentEditMenuForSelection(): void;

  dismissEditMenuForSelection(): void;

  editabilityChanged(): void;

  refreshKeyboardUI(): void;

  selectionChangedWithGestureAtPointGestureStateFlags(point: CGPoint, gestureType: interop.Enum<typeof BEGestureType>, gestureState: interop.Enum<typeof UIGestureRecognizerState>, flags: interop.Enum<typeof BESelectionFlags>): void;

  selectionBoundaryAdjustedToPointTouchPhaseFlags(point: CGPoint, touch: interop.Enum<typeof BESelectionTouchPhase>, flags: interop.Enum<typeof BESelectionFlags>): void;

  readonly textSelectionDisplayInteraction: UITextSelectionDisplayInteraction;

  contextMenuInteractionDelegate: UIContextMenuInteractionDelegate | null;

  readonly contextMenuInteraction: UIContextMenuInteraction;

  setDelegate(delegate: BETextInteractionDelegate | null): void;

  setContextMenuInteractionDelegate(contextMenuInteractionDelegate: UIContextMenuInteractionDelegate | null): void;

  readonly view: UIView;

  willMoveToView(view: UIView | null): void;

  didMoveToView(view: UIView | null): void;

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

declare class BEAutoFillTextSuggestion extends BETextSuggestion {
  readonly contents: NSDictionary;
}

declare class BETextSuggestion extends NSObject {
  initWithInputText(inputText: string): this;

  readonly inputText: string;
}

declare class BETextAlternatives extends NSObject {
  readonly primaryString: string;

  readonly alternativeStrings: NSArray;
}

declare class BEKeyEntry extends NSObject {
  readonly key: UIKey;

  readonly state: interop.Enum<typeof BEKeyPressState>;

  readonly keyRepeating: boolean;

  readonly timestamp: number;

  isKeyRepeating(): boolean;
}

declare class BEScrollViewScrollUpdate extends NSObject {
  readonly timestamp: number;

  readonly phase: interop.Enum<typeof BEScrollViewScrollUpdatePhase>;

  locationInView(view: UIView | null): CGPoint;

  translationInView(view: UIView | null): CGPoint;
}

declare class BEAccessibilityRemoteHostElement extends NSObject {
  initWithIdentifierRemotePid(identifier: string, remotePid: number): this;

  accessibilityContainer: interop.Object | null;

  setAccessibilityContainer(accessibilityContainer: interop.Object | null): void;
}

// @ts-ignore ClassDecl.tsIgnore
declare class BEScrollView extends UIScrollView {
  // @ts-ignore MemberDecl.tsIgnore
  delegate: BEScrollViewDelegate;

  setDelegate(delegate: UIScrollViewDelegate | null): void;
  setDelegate(delegate: BEScrollViewDelegate | null): void;
}

declare class BETextDocumentContext extends NSObject {
  initWithSelectedTextContextBeforeContextAfterMarkedTextSelectedRangeInMarkedText(selectedText: string | null, contextBefore: string | null, contextAfter: string | null, markedText: string | null, selectedRangeInMarkedText: _NSRange): this;

  initWithAttributedSelectedTextContextBeforeContextAfterMarkedTextSelectedRangeInMarkedText(selectedText: NSAttributedString | null, contextBefore: NSAttributedString | null, contextAfter: NSAttributedString | null, markedText: NSAttributedString | null, selectedRangeInMarkedText: _NSRange): this;

  addTextRectForCharacterRange(rect: CGRect, range: _NSRange): void;

  get autocorrectedRanges(): NSArray;
  set autocorrectedRanges(value: NSArray<interop.Object> | Array<interop.Object>);

  setAutocorrectedRanges(autocorrectedRanges: NSArray<interop.Object> | Array<interop.Object>): void;
}

declare class BEAccessibilityRemoteElement extends NSObject {
  initWithIdentifierHostPid(identifier: string, hostPid: number): this;
}


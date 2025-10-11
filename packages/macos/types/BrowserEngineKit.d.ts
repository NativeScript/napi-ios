/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

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

declare const BEAccessibilityPressedState: {
  Undefined: 0,
  False: 1,
  True: 2,
  Mixed: 3,
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

declare const BESelectionFlags: {
  SelectionFlagsNone: 0,
  WordIsNearTap: 1,
  SelectionFlipped: 2,
  PhraseBoundaryChanged: 4,
};

declare const BESelectionTouchPhase: {
  Started: 0,
  Moved: 1,
  Ended: 2,
  EndedMovingForward: 3,
  EndedMovingBackward: 4,
  EndedNotMoving: 5,
};

declare interface BEProcessCapabilityGrant extends NSObjectProtocol {
  invalidate(): boolean;

  readonly valid: boolean;

  isValid(): boolean;
}

declare class BEProcessCapabilityGrant extends NativeObject implements BEProcessCapabilityGrant {
}

declare interface BETextInputDelegate {
  shouldDeferEventHandlingToSystemForTextInputContext(textInput: BETextInput, keyEventContext: interop.Object): boolean;

  textInputSetCandidateSuggestions(textInput: BETextInput, suggestions: NSArray<interop.Object> | Array<interop.Object> | null): void;

  selectionWillChangeForTextInput(textInput: BETextInput): void;

  selectionDidChangeForTextInput(textInput: BETextInput): void;

  textInputDeferReplaceTextActionToSystem(textInput: BETextInput, sender: interop.Object): void;

  invalidateTextEntryContextForTextInput(textInput: BETextInput): void;
}

declare class BETextInputDelegate extends NativeObject implements BETextInputDelegate {
}

declare interface BEExtensionProcess extends NSObjectProtocol {
  invalidate(): void;

  makeLibXPCConnectionError(error: interop.PointerConvertible): NSObject;
}

declare class BEExtensionProcess extends NativeObject implements BEExtensionProcess {
}

declare interface BETextInteractionDelegate {
  systemWillChangeSelectionForInteraction(textInteraction: interop.Object): void;

  systemDidChangeSelectionForInteraction(textInteraction: interop.Object): void;
}

declare class BETextInteractionDelegate extends NativeObject implements BETextInteractionDelegate {
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

declare class BEProcessCapability extends NSObject {
  static background<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  static foreground<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  static suspended<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  requestWithError(error: interop.PointerConvertible): BEProcessCapabilityGrant;
}

declare class BETextSuggestion extends NSObject {
  initWithInputText(inputText: string): this;

  readonly inputText: string;
}

declare class BETextAlternatives extends NSObject {
  readonly primaryString: string;

  readonly alternativeStrings: NSArray;
}

declare class BEWebContentProcess extends NSObject {
  static webContentProcessWithInterruptionHandlerCompletion(interruptionHandler: () => void, completion: (p1: BEWebContentProcess, p2: NSError) => void | null): void;

  static webContentProcessWithBundleIDInterruptionHandlerCompletion(bundleID: string, interruptionHandler: () => void, completion: (p1: BEWebContentProcess, p2: NSError) => void | null): void;

  invalidate(): void;

  makeLibXPCConnectionError(error: interop.PointerConvertible): NSObject;

  grantCapabilityError(capability: BEProcessCapability, error: interop.PointerConvertible): BEProcessCapabilityGrant;
}

declare class BERenderingProcess extends NSObject {
  static renderingProcessWithInterruptionHandlerCompletion(interruptionHandler: () => void, completion: (p1: BERenderingProcess, p2: NSError) => void | null): void;

  static renderingProcessWithBundleIDInterruptionHandlerCompletion(bundleID: string, interruptionHandler: () => void, completion: (p1: BERenderingProcess, p2: NSError) => void | null): void;

  invalidate(): void;

  makeLibXPCConnectionError(error: interop.PointerConvertible): NSObject;

  grantCapabilityError(capability: BEProcessCapability, error: interop.PointerConvertible): BEProcessCapabilityGrant;
}

declare class BENetworkingProcess extends NSObject {
  static networkProcessWithInterruptionHandlerCompletion(interruptionHandler: () => void, completion: (p1: BENetworkingProcess, p2: NSError) => void | null): void;

  static networkProcessWithBundleIDInterruptionHandlerCompletion(bundleID: string, interruptionHandler: () => void, completion: (p1: BENetworkingProcess, p2: NSError) => void | null): void;

  invalidate(): void;

  makeLibXPCConnectionError(error: interop.PointerConvertible): NSObject;

  grantCapabilityError(capability: BEProcessCapability, error: interop.PointerConvertible): BEProcessCapabilityGrant;
}


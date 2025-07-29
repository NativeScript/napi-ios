/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./AppKit.d.ts" />
/// <reference path="./Runtime.d.ts" />

declare const IMKCandidatesOpacityAttributeName: string;

declare const kIMKLocateCandidatesRightHint: number;

declare const kIMKLocateCandidatesAboveHint: number;

declare const kIMKSingleColumnScrollingCandidatePanel: number;

declare const IMKDelegateClass: string;

declare const IMKControllerClass: string;

declare const IMKModeDictionary: string;

declare const kIMKSingleRowSteppingCandidatePanel: number;

declare const kIMKMain: number;

declare const IMKCandidatesSendServerKeyEventFirst: string;

declare const kIMKLocateCandidatesBelowHint: number;

declare const kIMKCommandMenuItemName: string;

declare const kIMKCommandClientName: string;

declare const kIMKAnnotation: number;

declare const kIMKSubList: number;

declare const kIMKLocateCandidatesLeftHint: number;

declare const kIMKScrollingGridCandidatePanel: number;

declare interface IMKStateSetting {
  activateServer(sender: interop.Object): void;

  deactivateServer(sender: interop.Object): void;

  valueForTagClient(tag: number, sender: interop.Object): interop.Object;

  setValueForTagClient(value: interop.Object, tag: number, sender: interop.Object): void;

  modes(sender: interop.Object): NSDictionary;

  recognizedEvents(sender: interop.Object): number;

  showPreferences(sender: interop.Object): void;
}

declare class IMKStateSetting extends NativeObject implements IMKStateSetting {
}

declare interface IMKMouseHandling {
  mouseDownOnCharacterIndexCoordinateWithModifierContinueTrackingClient(index: number, point: CGPoint, flags: number, keepTracking: interop.PointerConvertible, sender: interop.Object): boolean;

  mouseUpOnCharacterIndexCoordinateWithModifierClient(index: number, point: CGPoint, flags: number, sender: interop.Object): boolean;

  mouseMovedOnCharacterIndexCoordinateWithModifierClient(index: number, point: CGPoint, flags: number, sender: interop.Object): boolean;
}

declare class IMKMouseHandling extends NativeObject implements IMKMouseHandling {
}

declare class IMKCandidates extends NSResponder {
  initWithServerPanelType(server: IMKServer, panelType: number): this;

  initWithServerPanelTypeStyleType(server: IMKServer, panelType: number, style: number): this;

  panelType(): number;

  setPanelType(panelType: number): void;

  show(locationHint: number): void;

  hide(): void;

  isVisible(): boolean;

  updateCandidates(): void;

  showAnnotation(annotationString: NSAttributedString): void;

  showSublistSubListDelegate(candidates: NSArray<interop.Object> | Array<interop.Object>, delegate: interop.Object): void;

  candidateFrame(): CGRect;

  setSelectionKeys(keyCodes: NSArray<interop.Object> | Array<interop.Object>): void;

  selectionKeys(): NSArray;

  setSelectionKeysKeylayout(layout: interop.PointerConvertible): void;

  selectionKeysKeylayout(): interop.Pointer;

  setAttributes(attributes: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  attributes(): NSDictionary;

  setDismissesAutomatically(flag: boolean): void;

  dismissesAutomatically(): boolean;

  selectedCandidate(): number;

  setCandidateFrameTopLeft(point: CGPoint): void;

  showChild(): void;

  hideChild(): void;

  attachChildToCandidateType(child: IMKCandidates, candidateIdentifier: number, theType: number): void;

  detachChild(candidateIdentifier: number): void;

  setCandidateData(candidatesArray: NSArray<interop.Object> | Array<interop.Object>): void;

  selectCandidateWithIdentifier(candidateIdentifier: number): boolean;

  selectCandidate(candidateIdentifier: number): void;

  showCandidates(): void;

  candidateStringIdentifier(candidateString: interop.Object): number;

  selectedCandidateString(): NSAttributedString;

  candidateIdentifierAtLineNumber(lineNumber: number): number;

  lineNumberForCandidateWithIdentifier(candidateIdentifier: number): number;

  clearSelection(): void;
}

declare class IMKServer extends NSObject implements IMKServerProxy {
  initWithNameBundleIdentifier(name: string, bundleIdentifier: string): this;

  initWithNameControllerClassDelegateClass(name: string, controllerClassID: interop.Object, delegateClassID: interop.Object): this;

  bundle(): NSBundle;

  paletteWillTerminate(): boolean;

  lastKeyEventWasDeadKey(): boolean;
}

declare class IMKInputController extends NSObject implements IMKStateSetting, IMKMouseHandling {
  initWithServerDelegateClient(server: IMKServer, delegate: interop.Object, inputClient: interop.Object): this;

  updateComposition(): void;

  cancelComposition(): void;

  compositionAttributesAtRange(range: _NSRange): NSMutableDictionary;

  selectionRange(): _NSRange;

  replacementRange(): _NSRange;

  markForStyleAtRange(style: number, range: _NSRange): NSDictionary;

  doCommandBySelectorCommandDictionary(aSelector: string, infoDictionary: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  hidePalettes(): void;

  menu(): NSMenu;

  delegate(): interop.Object;

  setDelegate(newDelegate: interop.Object): void;

  server(): IMKServer;

  client(): IMKTextInput;

  inputControllerWillClose(): void;

  annotationSelectedForCandidate(annotationString: NSAttributedString, candidateString: NSAttributedString): void;

  candidateSelectionChanged(candidateString: NSAttributedString): void;

  candidateSelected(candidateString: NSAttributedString): void;

  activateServer(sender: interop.Object): void;

  deactivateServer(sender: interop.Object): void;

  valueForTagClient(tag: number, sender: interop.Object): interop.Object;

  setValueForTagClient(value: interop.Object, tag: number, sender: interop.Object): void;

  modes(sender: interop.Object): NSDictionary;

  recognizedEvents(sender: interop.Object): number;

  showPreferences(sender: interop.Object): void;

  mouseDownOnCharacterIndexCoordinateWithModifierContinueTrackingClient(index: number, point: CGPoint, flags: number, keepTracking: interop.PointerConvertible, sender: interop.Object): boolean;

  mouseUpOnCharacterIndexCoordinateWithModifierClient(index: number, point: CGPoint, flags: number, sender: interop.Object): boolean;

  mouseMovedOnCharacterIndexCoordinateWithModifierClient(index: number, point: CGPoint, flags: number, sender: interop.Object): boolean;
}


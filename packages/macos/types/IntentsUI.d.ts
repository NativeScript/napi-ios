/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./AppKit.d.ts" />

declare const IntentsUIVersionString: interop.Pointer;

declare const IntentsUIVersionNumber: number;

declare const INUIAddVoiceShortcutButtonStyle: {
  White: 0,
  WhiteOutline: 1,
  Black: 2,
  BlackOutline: 3,
  Automatic: 4,
  AutomaticOutline: 5,
};

declare interface INUIAddVoiceShortcutButtonDelegate extends NSObjectProtocol {
  presentAddVoiceShortcutViewControllerForAddVoiceShortcutButton(addVoiceShortcutViewController: INUIAddVoiceShortcutViewController, addVoiceShortcutButton: INUIAddVoiceShortcutButton): void;

  presentEditVoiceShortcutViewControllerForAddVoiceShortcutButton(editVoiceShortcutViewController: INUIEditVoiceShortcutViewController, addVoiceShortcutButton: INUIAddVoiceShortcutButton): void;
}

declare class INUIAddVoiceShortcutButtonDelegate extends NativeObject implements INUIAddVoiceShortcutButtonDelegate {
}

declare interface INUIAddVoiceShortcutViewControllerDelegate extends NSObjectProtocol {
  addVoiceShortcutViewControllerDidFinishWithVoiceShortcutError(controller: INUIAddVoiceShortcutViewController, voiceShortcut: INVoiceShortcut | null, error: NSError | null): void;

  addVoiceShortcutViewControllerDidCancel(controller: INUIAddVoiceShortcutViewController): void;
}

declare class INUIAddVoiceShortcutViewControllerDelegate extends NativeObject implements INUIAddVoiceShortcutViewControllerDelegate {
}

declare interface INUIEditVoiceShortcutViewControllerDelegate extends NSObjectProtocol {
  editVoiceShortcutViewControllerDidUpdateVoiceShortcutError(controller: INUIEditVoiceShortcutViewController, voiceShortcut: INVoiceShortcut | null, error: NSError | null): void;

  editVoiceShortcutViewControllerDidDeleteVoiceShortcutWithIdentifier(controller: INUIEditVoiceShortcutViewController, deletedVoiceShortcutIdentifier: NSUUID): void;

  editVoiceShortcutViewControllerDidCancel(controller: INUIEditVoiceShortcutViewController): void;
}

declare class INUIEditVoiceShortcutViewControllerDelegate extends NativeObject implements INUIEditVoiceShortcutViewControllerDelegate {
}

declare class INUIEditVoiceShortcutViewController extends NSViewController {
  delegate: INUIEditVoiceShortcutViewControllerDelegate;

  initWithVoiceShortcut(voiceShortcut: INVoiceShortcut): this;

  setDelegate(delegate: INUIEditVoiceShortcutViewControllerDelegate | null): void;
}

declare class INUIAddVoiceShortcutButton extends NSButton {
  initWithStyle(style: interop.Enum<typeof INUIAddVoiceShortcutButtonStyle>): this;

  style: interop.Enum<typeof INUIAddVoiceShortcutButtonStyle>;

  delegate: INUIAddVoiceShortcutButtonDelegate | null;

  shortcut: INShortcut;

  cornerRadius: number;

  setStyle(style: interop.Enum<typeof INUIAddVoiceShortcutButtonStyle>): void;

  setDelegate(delegate: INUIAddVoiceShortcutButtonDelegate | null): void;

  setShortcut(shortcut: INShortcut | null): void;

  setCornerRadius(cornerRadius: number): void;
}

declare class INUIAddVoiceShortcutViewController extends NSViewController {
  delegate: INUIAddVoiceShortcutViewControllerDelegate;

  initWithShortcut(shortcut: INShortcut): this;

  setDelegate(delegate: INUIAddVoiceShortcutViewControllerDelegate | null): void;
}


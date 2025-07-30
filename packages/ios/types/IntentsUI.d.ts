/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./UIKit.d.ts" />

declare const IntentsUIVersionString: interop.Pointer;

declare const IntentsUIVersionNumber: number;

declare const INUIInteractiveBehavior: {
  None: 0,
  NextView: 1,
  Launch: 2,
  GenericAction: 3,
};

declare const INUIAddVoiceShortcutButtonStyle: {
  White: 0,
  WhiteOutline: 1,
  Black: 2,
  BlackOutline: 3,
  Automatic: 4,
  AutomaticOutline: 5,
};

declare const INUIHostedViewContext: {
  SiriSnippet: 0,
  MapsCard: 1,
};

declare interface INUIAddVoiceShortcutViewControllerDelegate extends NSObjectProtocol {
  addVoiceShortcutViewControllerDidFinishWithVoiceShortcutError(controller: INUIAddVoiceShortcutViewController, voiceShortcut: INVoiceShortcut | null, error: NSError | null): void;

  addVoiceShortcutViewControllerDidCancel(controller: INUIAddVoiceShortcutViewController): void;
}

declare class INUIAddVoiceShortcutViewControllerDelegate extends NativeObject implements INUIAddVoiceShortcutViewControllerDelegate {
}

declare interface INUIAddVoiceShortcutButtonDelegate extends NSObjectProtocol {
  presentAddVoiceShortcutViewControllerForAddVoiceShortcutButton(addVoiceShortcutViewController: INUIAddVoiceShortcutViewController, addVoiceShortcutButton: INUIAddVoiceShortcutButton): void;

  presentEditVoiceShortcutViewControllerForAddVoiceShortcutButton(editVoiceShortcutViewController: INUIEditVoiceShortcutViewController, addVoiceShortcutButton: INUIAddVoiceShortcutButton): void;
}

declare class INUIAddVoiceShortcutButtonDelegate extends NativeObject implements INUIAddVoiceShortcutButtonDelegate {
}

declare interface INUIHostedViewSiriProviding extends NSObjectProtocol {
  readonly displaysMap?: boolean;

  readonly displaysMessage?: boolean;

  readonly displaysPaymentTransaction?: boolean;
}

declare class INUIHostedViewSiriProviding extends NativeObject implements INUIHostedViewSiriProviding {
}

declare interface INUIHostedViewControlling extends NSObjectProtocol {
  configureWithInteractionContextCompletion?(interaction: INInteraction, context: interop.Enum<typeof INUIHostedViewContext>, completion: (p1: CGSize) => void): void;

  configureViewForParametersOfInteractionInteractiveBehaviorContextCompletion?(parameters: NSSet, interaction: INInteraction, interactiveBehavior: interop.Enum<typeof INUIInteractiveBehavior>, context: interop.Enum<typeof INUIHostedViewContext>, completion: (p1: boolean, p2: NSSet, p3: CGSize) => void): void;
}

declare class INUIHostedViewControlling extends NativeObject implements INUIHostedViewControlling {
}

declare interface INUIEditVoiceShortcutViewControllerDelegate extends NSObjectProtocol {
  editVoiceShortcutViewControllerDidUpdateVoiceShortcutError(controller: INUIEditVoiceShortcutViewController, voiceShortcut: INVoiceShortcut | null, error: NSError | null): void;

  editVoiceShortcutViewControllerDidDeleteVoiceShortcutWithIdentifier(controller: INUIEditVoiceShortcutViewController, deletedVoiceShortcutIdentifier: NSUUID): void;

  editVoiceShortcutViewControllerDidCancel(controller: INUIEditVoiceShortcutViewController): void;
}

declare class INUIEditVoiceShortcutViewControllerDelegate extends NativeObject implements INUIEditVoiceShortcutViewControllerDelegate {
}

declare class INUIEditVoiceShortcutViewController extends UIViewController {
  delegate: INUIEditVoiceShortcutViewControllerDelegate;

  initWithVoiceShortcut(voiceShortcut: INVoiceShortcut): this;

  setDelegate(delegate: INUIEditVoiceShortcutViewControllerDelegate | null): void;
}

declare class INUIAddVoiceShortcutViewController extends UIViewController {
  delegate: INUIAddVoiceShortcutViewControllerDelegate;

  initWithShortcut(shortcut: INShortcut): this;

  setDelegate(delegate: INUIAddVoiceShortcutViewControllerDelegate | null): void;
}

declare class INUIAddVoiceShortcutButton extends UIButton {
  initWithStyle(style: interop.Enum<typeof INUIAddVoiceShortcutButtonStyle>): this;

  readonly style: interop.Enum<typeof INUIAddVoiceShortcutButtonStyle>;

  setStyle(style: interop.Enum<typeof INUIAddVoiceShortcutButtonStyle>): void;

  delegate: INUIAddVoiceShortcutButtonDelegate | null;

  shortcut: INShortcut;

  cornerRadius: number;

  setDelegate(delegate: INUIAddVoiceShortcutButtonDelegate | null): void;

  setShortcut(shortcut: INShortcut | null): void;

  setCornerRadius(cornerRadius: number): void;
}


/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./AppKit.d.ts" />

declare const DREraseIcon: string;

declare const DRBurnIcon: string;

declare const DRBurnSetupPanelDefaultButtonDefaultTitle: string;

declare const DRSetupPanelSelectedDeviceKey: string;

declare const kEraseSessionProgressDialogOptionsCurrentVersion: number;

declare const kDREraseProgressSetupCallbacksCurrentVersion: number;

declare const kEraseSessionSetupDialogDontHandleReservations: number;

declare const kBurnSessionProgressDialogDisplayVerboseProgress: number;

declare const kBurnSessionSetupDialogAllowTestBurns: number;

declare const kBurnSessionSetupDialogDontHandleReservations: number;

declare const kBurnSessionSetupDialogForceClosedDiscs: number;

declare const kBurnSessionSetupDialogDefaultOptions: number;

declare const kDRBurnSessionOK: number;

declare const kDRBurnSessionCancel: number;

declare const DRSetupPanelDeviceSelectionChangedNotification: string;

declare const kDRBurnProgressSetupCallbacksCurrentVersion: number;

declare const kDREraseSessionOK: number;

declare const kBurnSessionProgressDialogOptionsCurrentVersion: number;

declare const kDRBurnSessionSetupCallbacksCurrentVersion: number;

declare const kEraseSessionSetupDialogOptionsCurrentVersion: number;

declare const kDREraseSessionCancel: number;

declare const DREraseProgressPanelDidFinishNotification: string;

declare const DREraseProgressPanelWillBeginNotification: string;

declare const kDREraseSessionSetupCallbacksCurrentVersion: number;

declare const DRBurnProgressPanelWillBeginNotification: string;

declare const kEraseSessionProgressDialogDefaultOptions: number;

declare const kBurnSessionSetupDialogOptionsCurrentVersion: number;

declare const DRBurnProgressPanelDidFinishNotification: string;

declare const kEraseSessionSetupDialogDefaultOptions: number;

declare const kBurnSessionProgressDialogDefaultOptions: number;

declare class DREraseSessionProgressDialogOptions {
  constructor(init?: DREraseSessionProgressDialogOptions);
  version: number;
  dialogOptionFlags: number;
  description: interop.Object | null;
}

declare class DREraseSessionSetupCallbacks {
  constructor(init?: DREraseSessionSetupCallbacks);
  version: number;
  deviceShouldBeTarget: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  containsSuitableMedia: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  deviceSelectionChanged: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
}

declare class DREraseSessionSetupDialogOptions {
  constructor(init?: DREraseSessionSetupDialogOptions);
  version: number;
  dialogOptionFlags: number;
}

declare class __DREraseSession {
  constructor(init?: __DREraseSession);
}

declare class DRBurnSessionSetupCallbacks {
  constructor(init?: DRBurnSessionSetupCallbacks);
  version: number;
  deviceShouldBeTarget: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  containsSuitableMedia: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  deviceSelectionChanged: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
}

declare class __DRBurnSession {
  constructor(init?: __DRBurnSession);
}

declare class DRBurnSessionProgressDialogOptions {
  constructor(init?: DRBurnSessionProgressDialogOptions);
  version: number;
  dialogOptionFlags: number;
  description: interop.Object | null;
}

declare class DRBurnSessionSetupDialogOptions {
  constructor(init?: DRBurnSessionSetupDialogOptions);
  version: number;
  dialogOptionFlags: number;
  defaultButtonTitle: interop.Object | null;
}

declare class DRBurnSessionProgressCallbacks {
  constructor(init?: DRBurnSessionProgressCallbacks);
  version: number;
  progressWillBegin: (p1: interop.PointerConvertible) => void | null;
  progressDidFinish: (p1: interop.PointerConvertible) => void | null;
  burnDidFinish: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
}

declare class DREraseSessionProgressCallbacks {
  constructor(init?: DREraseSessionProgressCallbacks);
  version: number;
  progressWillBegin: (p1: interop.PointerConvertible) => void | null;
  progressDidFinish: (p1: interop.PointerConvertible) => void | null;
  eraseDidFinish: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
}

declare function DRBurnSessionGetTypeID(): number;

declare function DRBurnSessionCreate(): interop.Object;

declare function DRBurnSessionSetBurn(burnSession: interop.Object, burn: interop.Object): void;

declare function DRBurnSessionGetBurn(burnSession: interop.Object): interop.Object;

declare function DRBurnSessionSetupDialog(burnSession: interop.Object, options: interop.PointerConvertible, setupCallbacks: interop.PointerConvertible): number;

declare function DRBurnSessionBeginProgressDialog(burnSession: interop.Object, layout: interop.Object, options: interop.PointerConvertible, progressCallbacks: interop.PointerConvertible): void;

declare function DREraseSessionGetTypeID(): number;

declare function DREraseSessionCreate(): interop.Object;

declare function DREraseSessionSetErase(eraseSession: interop.Object, erase: interop.Object): void;

declare function DREraseSessionGetErase(eraseSession: interop.Object): interop.Object;

declare function DREraseSessionSetupDialog(eraseSession: interop.Object, options: interop.PointerConvertible, setupCallbacks: interop.PointerConvertible): number;

declare function DREraseSessionBeginProgressDialog(eraseSession: interop.Object, options: interop.PointerConvertible, progressCallbacks: interop.PointerConvertible): void;

declare class DREraseSetupPanel extends DRSetupPanel {
  static setupPanel(): DREraseSetupPanel;

  eraseObject(): DRErase;

  eraseType(sender: interop.Object): void;
}

declare class DREraseProgressPanel extends NSPanel {
  static progressPanel(): DREraseProgressPanel;

  beginProgressSheetForEraseModalForWindow(erase: DRErase, docWindow: NSWindow): void;

  beginProgressPanelForErase(erase: DRErase): void;

  setDescription(description: string): void;

  readonly description: string;
}

declare class DRBurnProgressPanel extends NSPanel {
  static progressPanel(): DRBurnProgressPanel;

  beginProgressSheetForBurnLayoutModalForWindow(burn: DRBurn, layout: interop.Object, docWindow: NSWindow): void;

  beginProgressPanelForBurnLayout(burn: DRBurn, layout: interop.Object): void;

  setDescription(description: string): void;

  readonly description: string;

  setVerboseProgressStatus(verbose: boolean): void;

  verboseProgressStatus(): boolean;

  stopBurn(sender: interop.Object): void;
}

// @ts-ignore ClassDecl.tsIgnore
declare class DRSetupPanel extends NSPanel {
  initWithNibName(nibName: string): this;

  runSetupPanel(): number;

  beginSetupSheetForWindowModalDelegateDidEndSelectorContextInfo(owner: NSWindow, modalDelegate: interop.Object, didEndSelector: string, contextInfo: interop.PointerConvertible): void;

  ok(sender: interop.Object): void;

  cancel(sender: interop.Object): void;

  eject(sender: interop.Object): void;

  open(sender: interop.Object): void;

  // @ts-ignore MemberDecl.tsIgnore
  close(sender: interop.Object): void;

  deviceSelectionChanged(device: DRDevice): void;

  mediaStateChanged(status: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): boolean;

  setupForDisplay(): void;
}

declare class DRBurnSetupPanel extends DRSetupPanel {
  static setupPanel(): DRBurnSetupPanel;

  setDefaultButtonTitle(title: string): void;

  setCanSelectTestBurn(flag: boolean): void;

  setCanSelectAppendableMedia(flag: boolean): void;

  burnObject(): DRBurn;

  expand(sender: interop.Object): void;

  burnSpeed(sender: interop.Object): void;

  appendable(sender: interop.Object): void;

  completionAction(sender: interop.Object): void;

  testBurn(sender: interop.Object): void;

  verifyBurn(sender: interop.Object): void;
}


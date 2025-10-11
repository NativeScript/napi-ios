/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const NSPrefPaneHelpMenuAnchorKey: string;

declare const NSPrefPaneHelpMenuInfoPListKey: string;

declare const NSPreferencePaneSwitchToPaneNotification: string;

declare const NSPreferencePaneCancelUnselectNotification: string;

declare const NSPreferencePrefPaneIsAvailableNotification: string;

declare const NSPreferencePaneDoUnselectNotification: string;

declare const NSPreferencePaneUpdateHelpMenuNotification: string;

declare const NSPrefPaneHelpMenuTitleKey: string;

declare const NSPreferencePaneUnselectReply: {
  Cancel: 0,
  Now: 1,
  Later: 2,
};

declare class NSPreferencePane extends NSObject {
  initWithBundle(bundle: NSBundle): this;

  readonly bundle: NSBundle;

  loadMainView(): NSView;

  mainViewDidLoad(): void;

  readonly mainNibName: string;

  assignMainView(): void;

  willSelect(): void;

  didSelect(): void;

  readonly shouldUnselect: interop.Enum<typeof NSPreferencePaneUnselectReply>;

  replyToShouldUnselect(shouldUnselect: boolean): void;

  willUnselect(): void;

  didUnselect(): void;

  mainView: NSView;

  initialKeyView: NSView;

  firstKeyView: NSView;

  lastKeyView: NSView;

  readonly autoSaveTextFields: boolean;

  readonly selected: boolean;

  updateHelpMenuWithArray(inArrayOfMenuItems: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setMainView(mainView: NSView): void;

  setInitialKeyView(initialKeyView: NSView | null): void;

  setFirstKeyView(firstKeyView: NSView | null): void;

  setLastKeyView(lastKeyView: NSView | null): void;

  isSelected(): boolean;
}


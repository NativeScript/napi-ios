/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const InstallerState_Choice_CustomLocation: string;

declare const InstallerState_Choice_Identifier: string;

declare const InstallerState_Choice_Installed: string;

declare const InstallerSectionDirection: {
  Forward: 0,
  Backward: 1,
  Undefined: 2,
};

declare class InstallerPane_Private {
  constructor(init?: InstallerPane_Private);
}

declare class InstallerState_Private {
  constructor(init?: InstallerState_Private);
}

declare class InstallerSection_Private {
  constructor(init?: InstallerSection_Private);
}

declare class InstallerSection extends NSObject {
  readonly bundle: NSBundle;

  readonly title: string;

  readonly firstPane: InstallerPane;

  readonly shouldLoad: boolean;

  willLoadMainNib(): void;

  didLoadMainNib(): void;

  sharedDictionary(): NSMutableDictionary;

  readonly installerState: InstallerState;

  readonly activePane: InstallerPane;

  gotoPane(pane: InstallerPane): boolean;
}

declare class InstallerPane extends NSObject {
  contentView: NSView;

  initialKeyView: NSView;

  firstKeyView: NSView;

  lastKeyView: NSView;

  nextPane: InstallerPane;

  initWithSection(parent: interop.Object): this;

  readonly title: string;

  readonly section: InstallerSection;

  willEnterPane(dir: interop.Enum<typeof InstallerSectionDirection>): void;

  didEnterPane(dir: interop.Enum<typeof InstallerSectionDirection>): void;

  shouldExitPane(dir: interop.Enum<typeof InstallerSectionDirection>): boolean;

  willExitPane(dir: interop.Enum<typeof InstallerSectionDirection>): void;

  didExitPane(dir: interop.Enum<typeof InstallerSectionDirection>): void;

  nextEnabled: boolean;

  previousEnabled: boolean;

  readonly gotoNextPane: boolean;

  readonly gotoPreviousPane: boolean;

  setContentView(contentView: NSView): void;

  setInitialKeyView(initialKeyView: NSView): void;

  setFirstKeyView(firstKeyView: NSView): void;

  setLastKeyView(lastKeyView: NSView): void;

  setNextPane(nextPane: InstallerPane): void;

  setNextEnabled(nextEnabled: boolean): void;

  setPreviousEnabled(previousEnabled: boolean): void;
}

declare class InstallerState extends NSObject {
  readonly licenseAgreed: boolean;

  readonly licenseAgreedLanguage: string;

  readonly targetVolumePath: string;

  readonly targetPath: string;

  readonly choiceDictionaries: NSArray;

  choiceDictionaryForIdentifier(choiceIdentifier: string): NSDictionary;

  readonly installStarted: boolean;

  readonly installSucceeded: boolean;
}


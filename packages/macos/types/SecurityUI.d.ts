/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare class SFCertificatePresentation extends NSObject {
  initWithTrust(trust: interop.Object): this;

  presentSheetInWindowDismissHandler(window: NSWindow, dismissHandler: () => void | null): void;

  dismissSheet(): void;

  readonly trust: interop.Object;

  title: string;

  message: string;

  helpURL: NSURL;

  setTitle(title: string | null): void;

  setMessage(message: string | null): void;

  setHelpURL(helpURL: NSURL | null): void;
}


/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare class SFCertificatePresentation extends NSObject {
  initWithTrust(trust: interop.PointerConvertible): this;

  presentSheetInViewControllerDismissHandler(viewController: UIViewController, dismissHandler: () => void | null): void;

  dismissSheet(): void;

  readonly trust: interop.Pointer;

  title: string;

  message: string;

  helpURL: NSURL;

  setTitle(title: string | null): void;

  setMessage(message: string | null): void;

  setHelpURL(helpURL: NSURL | null): void;
}


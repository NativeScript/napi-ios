/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./AppKit.d.ts" />

declare interface EXHostViewControllerDelegate extends NSObjectProtocol {
  hostViewControllerDidActivate?(viewController: EXHostViewController): void;

  hostViewControllerWillDeactivateError?(viewController: EXHostViewController, error: NSError | null): void;
}

declare class EXHostViewControllerDelegate extends NativeObject implements EXHostViewControllerDelegate {
}

declare class EXAppExtensionBrowserViewController extends NSViewController {
}

declare class EXHostViewController extends NSViewController {
  delegate: EXHostViewControllerDelegate;

  placeholderView: NSView;

  makeXPCConnectionWithError(error: interop.PointerConvertible): NSXPCConnection;

  setDelegate(delegate: EXHostViewControllerDelegate | null): void;

  setPlaceholderView(placeholderView: NSView): void;
}


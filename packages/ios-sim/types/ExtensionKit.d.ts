/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./UIKit.d.ts" />

declare interface EXHostViewControllerDelegate extends NSObjectProtocol {
  hostViewControllerDidActivate?(viewController: EXHostViewController): void;

  hostViewControllerWillDeactivateError?(viewController: EXHostViewController, error: NSError | null): void;
}

declare class EXHostViewControllerDelegate extends NativeObject implements EXHostViewControllerDelegate {
}

declare class EXAppExtensionBrowserViewController extends UIViewController {
}

declare class EXHostViewController extends UIViewController {
  delegate: EXHostViewControllerDelegate;

  placeholderView: UIView;

  makeXPCConnectionWithError(error: interop.PointerConvertible): NSXPCConnection;

  setDelegate(delegate: EXHostViewControllerDelegate | null): void;

  setPlaceholderView(placeholderView: UIView): void;
}


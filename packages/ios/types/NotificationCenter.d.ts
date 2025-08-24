/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const NCUpdateResult: {
  NewData: 0,
  NoData: 1,
  Failed: 2,
};

declare const NCWidgetDisplayMode: {
  Compact: 0,
  Expanded: 1,
};

declare interface NCWidgetProviding extends NSObjectProtocol {
  widgetPerformUpdateWithCompletionHandler?(completionHandler: (p1: interop.Enum<typeof NCUpdateResult>) => void): void;

  widgetActiveDisplayModeDidChangeWithMaximumSize?(activeDisplayMode: interop.Enum<typeof NCWidgetDisplayMode>, maxSize: CGSize): void;

  widgetMarginInsetsForProposedMarginInsets?(defaultMarginInsets: UIEdgeInsets): UIEdgeInsets;
}

declare class NCWidgetProviding extends NativeObject implements NCWidgetProviding {
}

declare class NCWidgetController extends NSObject {
  static widgetController<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  setHasContentForWidgetWithBundleIdentifier(flag: boolean, bundleID: string): void;
}


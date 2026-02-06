/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./AppKit.d.ts" />
/// <reference path="./Runtime.d.ts" />

declare const NCUpdateResult: {
  NewData: 0,
  NoData: 1,
  Failed: 2,
};

declare interface NCWidgetSearchViewDelegate extends NSObjectProtocol {
  widgetSearchSearchForTermMaxResults(controller: NCWidgetSearchViewController, searchTerm: string, max: number): void;

  widgetSearchTermCleared(controller: NCWidgetSearchViewController): void;

  widgetSearchResultSelected(controller: NCWidgetSearchViewController, object: interop.Object): void;
}

declare class NCWidgetSearchViewDelegate extends NativeObject implements NCWidgetSearchViewDelegate {
}

declare interface NCWidgetListViewDelegate extends NSObjectProtocol {
  widgetListViewControllerForRow(list: NCWidgetListViewController, row: number): NSViewController;

  widgetListPerformAddAction?(list: NCWidgetListViewController): void;

  widgetListShouldReorderRow?(list: NCWidgetListViewController, row: number): boolean;

  widgetListDidReorderRowToRow?(list: NCWidgetListViewController, row: number, newIndex: number): void;

  widgetListShouldRemoveRow?(list: NCWidgetListViewController, row: number): boolean;

  widgetListDidRemoveRow?(list: NCWidgetListViewController, row: number): void;
}

declare class NCWidgetListViewDelegate extends NativeObject implements NCWidgetListViewDelegate {
}

declare interface NCWidgetProviding extends NSExtensionRequestHandling {
  widgetPerformUpdateWithCompletionHandler?(completionHandler: (p1: interop.Enum<typeof NCUpdateResult>) => void): void;

  widgetMarginInsetsForProposedMarginInsets?(defaultMarginInset: NSEdgeInsets): NSEdgeInsets;

  readonly widgetAllowsEditing?: boolean;

  widgetDidBeginEditing?(): void;

  widgetDidEndEditing?(): void;
}

declare class NCWidgetProviding extends NativeObject implements NCWidgetProviding {
}

declare class NCWidgetListViewController extends NSViewController {
  delegate: NCWidgetListViewDelegate;

  get contents(): NSArray;
  set contents(value: NSArray<interop.Object> | Array<interop.Object>);

  minimumVisibleRowCount: number;

  hasDividerLines: boolean;

  editing: boolean;

  showsAddButtonWhenEditing: boolean;

  viewControllerAtRowMakeIfNecessary(row: number, makeIfNecesary: boolean): NSViewController;

  rowForViewController(viewController: NSViewController): number;

  setDelegate(delegate: NCWidgetListViewDelegate | null): void;

  setContents(contents: NSArray<interop.Object> | Array<interop.Object>): void;

  setMinimumVisibleRowCount(minimumVisibleRowCount: number): void;

  setHasDividerLines(hasDividerLines: boolean): void;

  setEditing(editing: boolean): void;

  setShowsAddButtonWhenEditing(showsAddButtonWhenEditing: boolean): void;
}

declare class NCWidgetSearchViewController extends NSViewController {
  delegate: NCWidgetSearchViewDelegate;

  get searchResults(): NSArray;
  set searchResults(value: NSArray<interop.Object> | Array<interop.Object>);

  searchDescription: string;

  searchResultsPlaceholderString: string;

  searchResultKeyPath: string;

  setDelegate(delegate: NCWidgetSearchViewDelegate | null): void;

  setSearchResults(searchResults: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setSearchDescription(searchDescription: string | null): void;

  setSearchResultsPlaceholderString(searchResultsPlaceholderString: string | null): void;

  setSearchResultKeyPath(searchResultKeyPath: string | null): void;
}

declare class NCWidgetController extends NSObject {
  static widgetController<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  static defaultWidgetController(): NCWidgetController;

  setHasContentForWidgetWithBundleIdentifier(flag: boolean, bundleID: string): void;
}


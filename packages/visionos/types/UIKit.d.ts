/// <reference types="@nativescript/objc-node-api" />

declare interface UIFocusEnvironment extends NSObject {
  readonly preferredFocusEnvironments: NSArray;

  setNeedsFocusUpdate(): void;

  updateFocusIfNeeded(): void;

  shouldUpdateFocusInContext(context: interop.Object): boolean;

  didUpdateFocusInContextWithAnimationCoordinator(context: interop.Object, coordinator: interop.Object): void;
}

declare class UIFocusEnvironment extends NativeObject implements UIFocusEnvironment {
}

declare interface UIInteraction extends NSObject {
  readonly view: interop.Object;

  willMoveToView(view: interop.Object | null): void;

  didMoveToView(view: interop.Object | null): void;
}

declare class UIInteraction extends NativeObject implements UIInteraction {
}

declare interface UICoordinateSpace extends NSObject {
}

declare class UICoordinateSpace extends NativeObject implements UICoordinateSpace {
}

declare interface UIFocusItem extends UIFocusEnvironment {
  readonly canBecomeFocused: boolean;

  readonly focusItemDeferralMode?: interop.Enum<typeof UIFocusItemDeferralMode>;
}

declare class UIFocusItem extends NativeObject implements UIFocusItem {
}

declare interface UIFocusItemContainer extends NSObject {
  readonly coordinateSpace: UICoordinateSpace;

  focusItemsInRect(rect: CGRect): NSArray;
}

declare class UIFocusItemContainer extends NativeObject implements UIFocusItemContainer {
}


/// <reference types="@nativescript/objc-node-api" />

declare const TNSSideDrawerVersionString: interop.Pointer;

declare const TNSSideDrawerVersionNumber: number;

declare const TKSideDrawerPosition: {
  Left: 0,
  Right: 1,
  Top: 2,
  Bottom: 3,
};

declare const TKSideDrawerTransitionType: {
  SlideInOnTop: 0,
  Reveal: 1,
  Push: 2,
  SlideAlong: 3,
  ReverseSlideOut: 4,
  ScaleUp: 5,
  FadeIn: 6,
  ScaleDownPusher: 7,
  Custom: 8,
};

declare interface TKSideDrawerDelegate extends NSObject {
  sideDrawerDidSelectItemAtIndexPath?(sideDrawer: TKSideDrawer, indexPath: NSIndexPath): void;

  willShowSideDrawer?(sideDrawer: TKSideDrawer): void;

  didShowSideDrawer?(sideDrawer: TKSideDrawer): void;

  willDismissSideDrawer?(sideDrawer: TKSideDrawer): void;

  didDismissSideDrawer?(sideDrawer: TKSideDrawer): void;

  didPanSideDrawer?(sideDrawer: TKSideDrawer): void;

  sideDrawerViewForHeaderInSection?(sideDrawer: TKSideDrawer, sectionIndex: number): interop.Object;

  sideDrawerHeightForItemAtIndexPath?(sideDrawer: TKSideDrawer, indexPath: NSIndexPath): number;

  sideDrawerUpdateVisualsForItemAtIndexPath?(sideDrawer: TKSideDrawer, indexPath: NSIndexPath): void;

  sideDrawerUpdateVisualsForSection?(sideDrawer: TKSideDrawer, sectionIndex: number): void;

  sideDrawerCellForItemAtIndexPath?(sideDrawer: TKSideDrawer, indexPath: NSIndexPath): interop.Object;
}

declare class TKSideDrawerDelegate extends NativeObject implements TKSideDrawerDelegate {
}

declare class TKSideDrawerView extends UIView {
  hostview: interop.Object;

  readonly sideDrawers: NSArray;

  readonly defaultSideDrawer: TKSideDrawer;

  mainView: interop.Object;

  attachDrawerToWindow(): void;

  detachDrawerFromWindow(): void;

  initWithFrameMainView(frame: CGRect, mainView: interop.Object): this;

  addSideDrawerAtPosition(position: interop.Enum<typeof TKSideDrawerPosition>): TKSideDrawer;

  addSideDrawer(sideDrawer: TKSideDrawer): void;

  removeSideDrawer(sideDrawer: TKSideDrawer): void;

  removeAllSideDrawers(): void;
}

declare class TKSideDrawer extends NativeObject {
  content: interop.Object;

  theme: interop.Object;

  allowScroll: boolean;

  cancelTransition: boolean;

  allowEdgeSwipe: boolean;

  edgeSwipeTreshold: number;

  allowGestures: boolean;

  title: string;

  position: interop.Enum<typeof TKSideDrawerPosition>;

  width: number;

  transitionManager: interop.Object;

  transition: interop.Enum<typeof TKSideDrawerTransitionType>;

  transitionDuration: number;

  headerView: interop.Object;

  footerView: interop.Object;

  delegate: TKSideDrawerDelegate;

  readonly style: interop.Object;

  readonly hostview: interop.Object;

  readonly isVisible: boolean;

  readonly sections: NSArray;

  attachGesturesToView(view: interop.Object): void;

  detachGesturesFromView(view: interop.Object): void;

  static findSideDrawerAtIndexForViewController(index: number, viewController: interop.Object): TKSideDrawer;

  show(): void;

  showWithTransition(transition: interop.Enum<typeof TKSideDrawerTransitionType>): void;

  dismiss(): void;

  addSection(section: interop.Object): void;

  addSectionWithTitle(title: string): interop.Object;

  addSectionWithTitleImage(title: string, image: interop.Object): interop.Object;

  removeSection(section: interop.Object): void;

  removeAllSections(): void;

  insertSectionAtIndex(section: interop.Object, index: number): void;

  selectItemAtIndexPath(indexPath: NSIndexPath): void;
}


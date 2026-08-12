#import "NativeScriptUIView.h"
#import "NativeScriptUIKitHost.h"
#import "Fabric/NativeScriptUIViewComponentView.h"
#import <QuartzCore/QuartzCore.h>
#import <React/UIView+React.h>
#import <objc/runtime.h>

#if __has_include(<React/RCTSurfaceTouchHandler.h>)
#import <React/RCTSurfaceTouchHandler.h>
#endif
#if __has_include(<React/RCTConversions.h>) && \
    __has_include(<react/renderer/core/LayoutMetrics.h>)
#import <React/RCTConversions.h>
#include <react/renderer/core/LayoutMetrics.h>
#define NATIVESCRIPT_RN_FABRIC_LAYOUT_METRICS_AVAILABLE 1
#else
#define NATIVESCRIPT_RN_FABRIC_LAYOUT_METRICS_AVAILABLE 0
#endif

static id NativeScriptNSObjectFromHandle(NSString* handle) {
  if (handle == nil || handle.length == 0) {
    return nil;
  }

  const char* text = handle.UTF8String;
  if (text == nullptr || text[0] == '\0') {
    return nil;
  }

  char* end = nullptr;
  unsigned long long address = strtoull(text, &end, 0);
  if (address == 0 || end == text || (end != nullptr && *end != '\0')) {
    return nil;
  }

  id object = reinterpret_cast<id>(static_cast<uintptr_t>(address));
  return object;
}

static UIView* NativeScriptUIViewFromHandle(NSString* handle) {
  id object = NativeScriptNSObjectFromHandle(handle);
  if (object == nil || ![object isKindOfClass:UIView.class]) {
    return nil;
  }

  return static_cast<UIView*>(object);
}

static UIViewController* NativeScriptUIViewControllerFromHandle(NSString* handle) {
  id object = NativeScriptNSObjectFromHandle(handle);
  if (object == nil || ![object isKindOfClass:UIViewController.class]) {
    return nil;
  }

  return static_cast<UIViewController*>(object);
}

static NSString* NativeScriptHandleFromNSObject(id object) {
  if (object == nil) {
    return @"";
  }

  return [NSString stringWithFormat:@"%p", object];
}

static const void* NativeScriptFabricOriginalSuperviewKey =
    &NativeScriptFabricOriginalSuperviewKey;
static const void* NativeScriptFabricOriginalIndexKey =
    &NativeScriptFabricOriginalIndexKey;

static void (*NativeScriptOriginalUIViewRemoveFromSuperview)(UIView*, SEL);
static void (*NativeScriptOriginalUIViewAddSubview)(UIView*, SEL, UIView*);
static void (*NativeScriptOriginalUIViewInsertSubviewAtIndex)(UIView*, SEL, UIView*, NSInteger);
static void (*NativeScriptOriginalUIViewInsertSubviewAboveSubview)(UIView*, SEL, UIView*, UIView*);
static void (*NativeScriptOriginalUIViewInsertSubviewBelowSubview)(UIView*, SEL, UIView*, UIView*);
static void (*NativeScriptOriginalRCTViewComponentViewUnmountChild)(id, SEL, UIView*, NSInteger);
static NSUInteger NativeScriptFabricTopologyRestoreDepth;

static NSHashTable<UIView*>* NativeScriptRelocatedFabricChildrenTable() {
  static NSHashTable<UIView*>* children;
  if (children == nil) {
    children = [[NSHashTable alloc] initWithOptions:NSPointerFunctionsWeakMemory capacity:0];
  }
  return children;
}

static BOOL NativeScriptViewConformsToRCTComponentViewProtocol(UIView* view) {
  static Protocol* componentViewProtocol;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    componentViewProtocol = NSProtocolFromString(@"RCTComponentViewProtocol");
  });
  return view != nil && componentViewProtocol != nil &&
      [view conformsToProtocol:componentViewProtocol];
}

static UIView* NativeScriptCurrentContainerViewForComponentView(UIView* view) {
  if (view == nil) {
    return nil;
  }

  SEL nativeScriptSelector = NSSelectorFromString(@"nativeScriptCurrentContainerView");
  if ([view respondsToSelector:nativeScriptSelector]) {
    IMP implementation = [view methodForSelector:nativeScriptSelector];
    if (implementation != nullptr) {
      UIView* (*nativeScriptCurrentContainerView)(id, SEL) =
          reinterpret_cast<UIView* (*)(id, SEL)>(implementation);
      UIView* containerView = nativeScriptCurrentContainerView(view, nativeScriptSelector);
      if (containerView != nil) {
        return containerView;
      }
    }
  }

  SEL selector = NSSelectorFromString(@"currentContainerView");
  if (![view respondsToSelector:selector]) {
    return view;
  }

  IMP implementation = [view methodForSelector:selector];
  if (implementation == nullptr) {
    return view;
  }

  UIView* (*currentContainerView)(id, SEL) =
      reinterpret_cast<UIView* (*)(id, SEL)>(implementation);
  UIView* containerView = currentContainerView(view, selector);
  return containerView ?: view;
}

static BOOL NativeScriptSuperviewIsFabricComponentContainer(UIView* superview) {
  if (superview == nil) {
    return NO;
  }

  if (NativeScriptViewConformsToRCTComponentViewProtocol(superview)) {
    return YES;
  }

  UIView* current = superview.superview;
  NSUInteger depth = 0;
  while (current != nil && depth < 4) {
    if (NativeScriptViewConformsToRCTComponentViewProtocol(current) &&
        NativeScriptCurrentContainerViewForComponentView(current) == superview) {
      return YES;
    }
    current = current.superview;
    depth += 1;
  }

  return NO;
}

static UIView* NativeScriptOriginalFabricSuperviewForView(UIView* view) {
  NSValue* superview =
      static_cast<NSValue*>(objc_getAssociatedObject(view, NativeScriptFabricOriginalSuperviewKey));
  return superview == nil ? nil : static_cast<UIView*>(superview.nonretainedObjectValue);
}

static NSUInteger NativeScriptOriginalFabricIndexForView(UIView* view) {
  NSNumber* index =
      static_cast<NSNumber*>(objc_getAssociatedObject(view, NativeScriptFabricOriginalIndexKey));
  return index == nil ? NSNotFound : index.unsignedIntegerValue;
}

static UIViewController* NativeScriptFabricResponderControllerForView(UIView* view) {
  UIResponder* responder = view;
  while (responder != nil) {
    responder = responder.nextResponder;
    if ([responder isKindOfClass:UIViewController.class]) {
      return static_cast<UIViewController*>(responder);
    }
  }

  return nil;
}

static BOOL NativeScriptFabricControllerIsTransitioning(UIViewController* controller) {
  UIViewController* current = controller;
  NSUInteger depth = 0;
  while (current != nil && depth < 16) {
    if (current.transitionCoordinator != nil || current.isBeingPresented ||
        current.isBeingDismissed || current.isMovingToParentViewController ||
        current.isMovingFromParentViewController) {
      return YES;
    }

    UINavigationController* navigationController = current.navigationController;
    if (navigationController != nil &&
        (navigationController.transitionCoordinator != nil ||
         navigationController.isBeingPresented || navigationController.isBeingDismissed ||
         navigationController.isMovingToParentViewController ||
         navigationController.isMovingFromParentViewController)) {
      return YES;
    }

    UITabBarController* tabBarController = current.tabBarController;
    if (tabBarController != nil &&
        (tabBarController.transitionCoordinator != nil || tabBarController.isBeingPresented ||
         tabBarController.isBeingDismissed || tabBarController.isMovingToParentViewController ||
         tabBarController.isMovingFromParentViewController)) {
      return YES;
    }

    current = current.parentViewController;
    depth += 1;
  }

  return NO;
}

static BOOL NativeScriptFabricRestoreWouldCrossActiveControllerTransition(UIView* child,
                                                                         UIView* superview) {
  if (child == nil || superview == nil || child.superview == superview) {
    return NO;
  }

  UIViewController* childController = NativeScriptFabricResponderControllerForView(child);
  UIViewController* targetController = NativeScriptFabricResponderControllerForView(superview);
  if (childController == nil || targetController == nil || childController == targetController) {
    return NO;
  }

  if (child.window != nil && superview.window != nil && child.window != superview.window) {
    return YES;
  }

  return NativeScriptFabricControllerIsTransitioning(childController) ||
      NativeScriptFabricControllerIsTransitioning(targetController);
}

static void NativeScriptClearFabricRelocationRecord(UIView* view) {
  if (view == nil) {
    return;
  }

  objc_setAssociatedObject(view, NativeScriptFabricOriginalSuperviewKey, nil,
                           OBJC_ASSOCIATION_ASSIGN);
  objc_setAssociatedObject(view, NativeScriptFabricOriginalIndexKey, nil,
                           OBJC_ASSOCIATION_ASSIGN);
  [NativeScriptRelocatedFabricChildrenTable() removeObject:view];
}

static void NativeScriptClearFabricRelocationRecordIfRestored(UIView* view) {
  UIView* originalSuperview = NativeScriptOriginalFabricSuperviewForView(view);
  if (originalSuperview == nil || view.superview != originalSuperview) {
    return;
  }

  NSUInteger expectedIndex = NativeScriptOriginalFabricIndexForView(view);
  NSUInteger actualIndex = [originalSuperview.subviews indexOfObject:view];
  if (expectedIndex == NSNotFound || actualIndex == expectedIndex) {
    NativeScriptClearFabricRelocationRecord(view);
  }
}

static void NativeScriptRecordFabricParentBeforeMove(UIView* view) {
  if (view == nil || NativeScriptFabricTopologyRestoreDepth > 0 ||
      !NativeScriptViewConformsToRCTComponentViewProtocol(view)) {
    return;
  }

  UIView* existingOriginalSuperview = NativeScriptOriginalFabricSuperviewForView(view);
  if (existingOriginalSuperview != nil) {
    NativeScriptClearFabricRelocationRecordIfRestored(view);
    return;
  }

  UIView* originalSuperview = view.superview;
  if (!NativeScriptSuperviewIsFabricComponentContainer(originalSuperview)) {
    return;
  }

  NSUInteger originalIndex = [originalSuperview.subviews indexOfObject:view];
  if (originalIndex == NSNotFound) {
    return;
  }

  objc_setAssociatedObject(view, NativeScriptFabricOriginalSuperviewKey,
                           [NSValue valueWithNonretainedObject:originalSuperview],
                           OBJC_ASSOCIATION_RETAIN_NONATOMIC);
  objc_setAssociatedObject(view, NativeScriptFabricOriginalIndexKey, @(originalIndex),
                           OBJC_ASSOCIATION_RETAIN_NONATOMIC);
  [NativeScriptRelocatedFabricChildrenTable() addObject:view];
}

static void NativeScriptFabricGuardRemoveFromSuperview(UIView* view, SEL selector) {
  NativeScriptRecordFabricParentBeforeMove(view);
  NativeScriptOriginalUIViewRemoveFromSuperview(view, selector);
  NativeScriptClearFabricRelocationRecordIfRestored(view);
}

static void NativeScriptFabricGuardAddSubview(UIView* view,
                                              SEL selector,
                                              UIView* subview) {
  NativeScriptRecordFabricParentBeforeMove(subview);
  NativeScriptOriginalUIViewAddSubview(view, selector, subview);
  NativeScriptClearFabricRelocationRecordIfRestored(subview);
}

static void NativeScriptFabricGuardInsertSubviewAtIndex(UIView* view,
                                                        SEL selector,
                                                        UIView* subview,
                                                        NSInteger index) {
  NativeScriptRecordFabricParentBeforeMove(subview);
  NativeScriptOriginalUIViewInsertSubviewAtIndex(view, selector, subview, index);
  NativeScriptClearFabricRelocationRecordIfRestored(subview);
}

static void NativeScriptFabricGuardInsertSubviewAboveSubview(UIView* view,
                                                             SEL selector,
                                                             UIView* subview,
                                                             UIView* siblingSubview) {
  NativeScriptRecordFabricParentBeforeMove(subview);
  NativeScriptOriginalUIViewInsertSubviewAboveSubview(view, selector, subview, siblingSubview);
  NativeScriptClearFabricRelocationRecordIfRestored(subview);
}

static void NativeScriptFabricGuardInsertSubviewBelowSubview(UIView* view,
                                                             SEL selector,
                                                             UIView* subview,
                                                             UIView* siblingSubview) {
  NativeScriptRecordFabricParentBeforeMove(subview);
  NativeScriptOriginalUIViewInsertSubviewBelowSubview(view, selector, subview, siblingSubview);
  NativeScriptClearFabricRelocationRecordIfRestored(subview);
}

static NSArray<UIView*>* NativeScriptRelocatedFabricChildrenForSuperview(UIView* superview) {
  if (superview == nil) {
    return @[];
  }

  NSMutableArray<UIView*>* children = [NSMutableArray array];
  for (UIView* child in NativeScriptRelocatedFabricChildrenTable()) {
    if (NativeScriptOriginalFabricSuperviewForView(child) == superview) {
      [children addObject:child];
    }
  }

  [children sortUsingComparator:^NSComparisonResult(UIView* left, UIView* right) {
    NSUInteger leftIndex = NativeScriptOriginalFabricIndexForView(left);
    NSUInteger rightIndex = NativeScriptOriginalFabricIndexForView(right);
    if (leftIndex < rightIndex) {
      return NSOrderedAscending;
    }
    if (leftIndex > rightIndex) {
      return NSOrderedDescending;
    }
    return NSOrderedSame;
  }];
  return children;
}

static BOOL NativeScriptRestoreFabricChildToSuperviewAtIndex(UIView* child,
                                                             UIView* superview,
                                                             NSUInteger index) {
  if (child == nil || superview == nil) {
    return NO;
  }

  if (NativeScriptFabricRestoreWouldCrossActiveControllerTransition(child, superview)) {
    return NO;
  }

  [child retain];
  NativeScriptFabricTopologyRestoreDepth += 1;
  @try {
    NSUInteger targetIndex = MIN(index, superview.subviews.count);
    [superview insertSubview:child atIndex:targetIndex];
  } @finally {
    NativeScriptFabricTopologyRestoreDepth -= 1;
    [child release];
  }
  return YES;
}

static BOOL NativeScriptRestoreFabricChildrenForUnmount(UIView* expectedSuperview,
                                                        UIView* child,
                                                        NSInteger index,
                                                        NSSet<NSNumber*>* pendingUnmountTags,
                                                        NSArray<UIView*>* mountedChildLedger) {
  if (expectedSuperview == nil) {
    return NO;
  }

  BOOL shouldHandleUnmountInRuntime = NO;
  NSArray<UIView*>* relocatedChildren =
      NativeScriptRelocatedFabricChildrenForSuperview(expectedSuperview);
  for (UIView* relocatedChild in relocatedChildren) {
    NSUInteger expectedIndex = NativeScriptOriginalFabricIndexForView(relocatedChild);
    if (expectedIndex == NSNotFound) {
      continue;
    }

    // RNS invariant: a view Fabric has unmounted (or is unmounting in THIS
    // transaction) may never be re-attached. `pendingUnmountTags` covers the
    // case where the relocation record is created mid-transaction (a sibling
    // unmount's synchronous reconcile reparenting this child) after Fabric
    // already resolved this container's Remove/Delete mutations for it;
    // `mountedChildLedger` catches the same invariant reactively for any
    // relocated child no longer tracked as mounted (already unmounted).
    if ([pendingUnmountTags containsObject:@(relocatedChild.tag)] ||
        (mountedChildLedger != nil &&
         ![mountedChildLedger containsObject:relocatedChild])) {
      continue;
    }

    if (NativeScriptRestoreFabricChildToSuperviewAtIndex(relocatedChild, expectedSuperview,
                                                        expectedIndex)) {
      NativeScriptClearFabricRelocationRecordIfRestored(relocatedChild);
    } else if (relocatedChild == child) {
      shouldHandleUnmountInRuntime = YES;
    }
  }

  if (child == nil || child.superview != expectedSuperview || index < 0) {
    return shouldHandleUnmountInRuntime;
  }

  NSUInteger actualIndex = [expectedSuperview.subviews indexOfObject:child];
  NSUInteger expectedIndex = static_cast<NSUInteger>(index);
  if (actualIndex != NSNotFound && actualIndex != expectedIndex &&
      expectedIndex <= expectedSuperview.subviews.count) {
    if (NativeScriptRestoreFabricChildToSuperviewAtIndex(child, expectedSuperview,
                                                        expectedIndex)) {
      NativeScriptClearFabricRelocationRecordIfRestored(child);
    } else {
      shouldHandleUnmountInRuntime = YES;
    }
  }
  return shouldHandleUnmountInRuntime;
}

static void NativeScriptFabricUnmountRelocatedChildInRuntime(UIView* child) {
  if (child == nil) {
    return;
  }

  [child retain];
  if (child.superview != nil) {
    if (NativeScriptOriginalUIViewRemoveFromSuperview != nullptr) {
      NativeScriptOriginalUIViewRemoveFromSuperview(child, @selector(removeFromSuperview));
    } else {
      [child removeFromSuperview];
    }
  }
  NativeScriptClearFabricRelocationRecord(child);
  [child release];
}

static void NativeScriptFabricGuardRCTViewComponentViewUnmountChild(id parent,
                                                                    SEL selector,
                                                                    UIView* child,
                                                                    NSInteger index) {
  UIView* expectedSuperview =
      NativeScriptCurrentContainerViewForComponentView(static_cast<UIView*>(parent));
  // Generic plain-RCTComponentView unmount funnel: no per-container
  // pending-unmount-tag/ledger tracking exists here (that is NativeScriptUIView-
  // specific state), so pass nil for both — behavior is unchanged from before.
  if (NativeScriptRestoreFabricChildrenForUnmount(expectedSuperview, child, index, nil, nil)) {
    NativeScriptFabricUnmountRelocatedChildInRuntime(child);
    return;
  }
  NativeScriptOriginalRCTViewComponentViewUnmountChild(parent, selector, child, index);
  NativeScriptClearFabricRelocationRecord(child);
}

static void NativeScriptInstallFabricReparentingGuard() {
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    Method removeMethod = class_getInstanceMethod(UIView.class, @selector(removeFromSuperview));
    if (removeMethod != nullptr) {
      NativeScriptOriginalUIViewRemoveFromSuperview =
          reinterpret_cast<void (*)(UIView*, SEL)>(method_getImplementation(removeMethod));
      method_setImplementation(removeMethod,
                               reinterpret_cast<IMP>(NativeScriptFabricGuardRemoveFromSuperview));
    }

    Method addMethod = class_getInstanceMethod(UIView.class, @selector(addSubview:));
    if (addMethod != nullptr) {
      NativeScriptOriginalUIViewAddSubview =
          reinterpret_cast<void (*)(UIView*, SEL, UIView*)>(method_getImplementation(addMethod));
      method_setImplementation(addMethod, reinterpret_cast<IMP>(NativeScriptFabricGuardAddSubview));
    }

    Method insertAtIndexMethod =
        class_getInstanceMethod(UIView.class, @selector(insertSubview:atIndex:));
    if (insertAtIndexMethod != nullptr) {
      NativeScriptOriginalUIViewInsertSubviewAtIndex =
          reinterpret_cast<void (*)(UIView*, SEL, UIView*, NSInteger)>(
              method_getImplementation(insertAtIndexMethod));
      method_setImplementation(
          insertAtIndexMethod,
          reinterpret_cast<IMP>(NativeScriptFabricGuardInsertSubviewAtIndex));
    }

    Method insertAboveMethod =
        class_getInstanceMethod(UIView.class, @selector(insertSubview:aboveSubview:));
    if (insertAboveMethod != nullptr) {
      NativeScriptOriginalUIViewInsertSubviewAboveSubview =
          reinterpret_cast<void (*)(UIView*, SEL, UIView*, UIView*)>(
              method_getImplementation(insertAboveMethod));
      method_setImplementation(
          insertAboveMethod,
          reinterpret_cast<IMP>(NativeScriptFabricGuardInsertSubviewAboveSubview));
    }

    Method insertBelowMethod =
        class_getInstanceMethod(UIView.class, @selector(insertSubview:belowSubview:));
    if (insertBelowMethod != nullptr) {
      NativeScriptOriginalUIViewInsertSubviewBelowSubview =
          reinterpret_cast<void (*)(UIView*, SEL, UIView*, UIView*)>(
              method_getImplementation(insertBelowMethod));
      method_setImplementation(
          insertBelowMethod,
          reinterpret_cast<IMP>(NativeScriptFabricGuardInsertSubviewBelowSubview));
    }

    Class rctViewComponentView = NSClassFromString(@"RCTViewComponentView");
    SEL unmountSelector = NSSelectorFromString(@"unmountChildComponentView:index:");
    Method unmountMethod = class_getInstanceMethod(rctViewComponentView, unmountSelector);
    if (unmountMethod != nullptr) {
      NativeScriptOriginalRCTViewComponentViewUnmountChild =
          reinterpret_cast<void (*)(id, SEL, UIView*, NSInteger)>(
              method_getImplementation(unmountMethod));
      method_setImplementation(
          unmountMethod,
          reinterpret_cast<IMP>(NativeScriptFabricGuardRCTViewComponentViewUnmountChild));
    }
  });
}

static BOOL NativeScriptChildrenViewHasVisibleChild(UIView* childrenView,
                                                   UIView* sentinel,
                                                   UIView* owner) {
  if (childrenView == nil) {
    return NO;
  }

  for (UIView* subview in childrenView.subviews) {
    if (subview == sentinel || subview.hidden || subview.alpha <= 0.01) {
      continue;
    }
    if (subview == owner) {
      if (NativeScriptChildrenViewHasVisibleChild(subview, sentinel, owner)) {
        return YES;
      }
      continue;
    }

    return YES;
  }

  return NO;
}

static NSUInteger NativeScriptVisibleDescendantCount(UIView* view,
                                                     UIView* sentinel,
                                                     UIView* owner,
                                                     NSUInteger depth) {
  if (view == nil || depth > 32 || view.hidden || view.alpha <= 0.01) {
    return 0;
  }

  NSUInteger count = (view == sentinel || view == owner) ? 0 : 1;
  for (UIView* subview in view.subviews) {
    count += NativeScriptVisibleDescendantCount(subview, sentinel, owner, depth + 1);
  }

  return count;
}

static NSUInteger NativeScriptChildrenViewVisibleDescendantCount(UIView* childrenView,
                                                                 UIView* sentinel,
                                                                 UIView* owner) {
  if (childrenView == nil) {
    return 0;
  }

  NSUInteger count = 0;
  for (UIView* subview in childrenView.subviews) {
    count += NativeScriptVisibleDescendantCount(subview, sentinel, owner, 0);
  }

  return count;
}

static UIViewController* NativeScriptTopMostViewControllerForWindow(UIView* view) {
  UIViewController* controller = view.window.rootViewController;
  while (controller.presentedViewController != nil &&
         !controller.presentedViewController.isBeingDismissed) {
    controller = controller.presentedViewController;
  }
  return controller;
}

static UIViewController* NativeScriptNearestViewController(UIView* view, UIViewController* excludedController) {
  UIResponder* responder = view;
  while (responder != nil) {
    responder = responder.nextResponder;
    if ([responder isKindOfClass:UIViewController.class] &&
        responder != excludedController) {
      return static_cast<UIViewController*>(responder);
    }
  }

  UIViewController* controller = NativeScriptTopMostViewControllerForWindow(view);
  return controller == excludedController ? nil : controller;
}

static UIViewController* NativeScriptNearestResponderViewController(UIView* view,
                                                                    UIViewController* excludedController) {
  UIResponder* responder = view;
  while (responder != nil) {
    responder = responder.nextResponder;
    if ([responder isKindOfClass:UIViewController.class] &&
        responder != excludedController) {
      return static_cast<UIViewController*>(responder);
    }
  }

  return nil;
}

static UIViewController* NativeScriptReactViewControllerForView(UIView* view) {
  if (view == nil) {
    return nil;
  }

  UIViewController* controller = view.reactViewController;
  return controller;
}

static UIView* NativeScriptReactSuperviewForView(UIView* view) {
  if (view == nil) {
    return nil;
  }

  return view.reactSuperview ?: view.superview;
}

static UIViewController* NativeScriptClosestReactViewControllerForView(UIView* view,
                                                                       UIViewController* excludedController) {
  UIViewController* controller = NativeScriptReactViewControllerForView(view);
  if (controller != nil && controller != excludedController) {
    return controller;
  }

  UIView* parentView = NativeScriptReactSuperviewForView(view);
  NSUInteger depth = 0;
  while (parentView != nil && parentView != view && depth < 64) {
    controller = NativeScriptReactViewControllerForView(parentView);
    if (controller != nil && controller != excludedController) {
      return controller;
    }

    UIView* nextParentView = NativeScriptReactSuperviewForView(parentView);
    if (nextParentView == parentView) {
      break;
    }

    parentView = nextParentView;
    depth += 1;
  }

  return nil;
}

static BOOL NativeScriptControllerHierarchyContainsController(UIViewController* rootController,
                                                              UIViewController* controller,
                                                              NSUInteger depth) {
  if (rootController == nil || controller == nil || depth > 32) {
    return NO;
  }

  if (rootController == controller) {
    return YES;
  }

  if ([rootController isKindOfClass:UINavigationController.class]) {
    for (UIViewController* child in static_cast<UINavigationController*>(rootController).viewControllers) {
      if (NativeScriptControllerHierarchyContainsController(child, controller, depth + 1)) {
        return YES;
      }
    }
  }

  if ([rootController isKindOfClass:UITabBarController.class]) {
    for (UIViewController* child in static_cast<UITabBarController*>(rootController).viewControllers) {
      if (NativeScriptControllerHierarchyContainsController(child, controller, depth + 1)) {
        return YES;
      }
    }
  }

  if ([rootController isKindOfClass:UISplitViewController.class]) {
    for (UIViewController* child in static_cast<UISplitViewController*>(rootController).viewControllers) {
      if (NativeScriptControllerHierarchyContainsController(child, controller, depth + 1)) {
        return YES;
      }
    }
  }

  for (UIViewController* child in rootController.childViewControllers) {
    if (NativeScriptControllerHierarchyContainsController(child, controller, depth + 1)) {
      return YES;
    }
  }

  return NativeScriptControllerHierarchyContainsController(
      rootController.presentedViewController, controller, depth + 1);
}

static BOOL NativeScriptControllerHierarchyContainsController(UIViewController* rootController,
                                                              UIViewController* controller) {
  return NativeScriptControllerHierarchyContainsController(rootController, controller, 0);
}

static BOOL NativeScriptViewIsDescendantOfView(UIView* view, UIView* ancestor) {
  UIView* current = view;
  while (current != nil) {
    if (current == ancestor) {
      return YES;
    }
    current = current.superview;
  }
  return NO;
}

static BOOL NativeScriptViewHasHiddenUIKitAncestor(UIView* view) {
  UIView* current = view;
  while (current != nil) {
    if (current.hidden || current.alpha <= 0.01 || current.accessibilityElementsHidden) {
      return YES;
    }
    current = current.superview;
  }
  return NO;
}

static BOOL NativeScriptViewHasGestureRecognizer(UIView* view, UIGestureRecognizer* recognizer) {
  if (view == nil || recognizer == nil) {
    return NO;
  }

  for (UIGestureRecognizer* existingRecognizer in view.gestureRecognizers) {
    if (existingRecognizer == recognizer) {
      return YES;
    }
  }

  return NO;
}

static UIView* NativeScriptGestureRecognizerAttachedView(id recognizer) {
  if (recognizer == nil || ![recognizer isKindOfClass:UIGestureRecognizer.class]) {
    return nil;
  }

  return static_cast<UIGestureRecognizer*>(recognizer).view;
}

static BOOL NativeScriptGestureRecognizerHasActiveTouches(id recognizer) {
  if (recognizer == nil || ![recognizer isKindOfClass:UIGestureRecognizer.class]) {
    return NO;
  }

  UIGestureRecognizer* gesture = static_cast<UIGestureRecognizer*>(recognizer);
  if (gesture.state == UIGestureRecognizerStateBegan ||
      gesture.state == UIGestureRecognizerStateChanged) {
    return YES;
  }

  return gesture.state == UIGestureRecognizerStatePossible && gesture.numberOfTouches > 0;
}

static BOOL NativeScriptTouchDebugEnabled() {
  const char* enabled = getenv("NS_NS_TOUCH_DEBUG");
  return enabled != nullptr && enabled[0] == '1';
}

static BOOL NativeScriptFabricDebugEnabled() {
  const char* enabled = getenv("NS_NS_FABRIC_DEBUG");
  return enabled != nullptr && enabled[0] != '\0' && strcmp(enabled, "0") != 0;
}

static void NativeScriptFabricDebugLog(NSString* format, ...) {
  if (!NativeScriptFabricDebugEnabled()) {
    return;
  }

  va_list args;
  va_start(args, format);
  NSString* message = [[NSString alloc] initWithFormat:format arguments:args];
  va_end(args);
  NSLog(@"[NS_NS_FABRIC_DEBUG] %@", message);
  [message release];
}

static NSString* NativeScriptFabricDebugChildEventSummary(
    NSDictionary<NSString*, id>* event) {
  if (event == nil) {
    return @"<nil>";
  }

  return [NSString stringWithFormat:@"idx=%@ ownerComponent=%@ ownerContainer=%@ ownerNative=%@ ownerChildren=%@ ownerController=%@ component=%@ container=%@ native=%@ children=%@ controller=%@",
                                    event[@"index"] ?: @"",
                                    event[@"ownerComponentViewHandle"] ?: @"",
                                    event[@"ownerContainerViewHandle"] ?: @"",
                                    event[@"ownerNativeViewHandle"] ?: @"",
                                    event[@"ownerChildrenViewHandle"] ?: @"",
                                    event[@"ownerControllerHandle"] ?: @"",
                                    event[@"componentViewHandle"] ?: @"",
                                    event[@"containerViewHandle"] ?: @"",
                                    event[@"nativeViewHandle"] ?: @"",
                                    event[@"childrenViewHandle"] ?: @"",
                                    event[@"controllerHandle"] ?: @""];
}

static NSString* NativeScriptTouchDebugViewSummary(UIView* view) {
  if (view == nil) {
    return @"<nil>";
  }

  NSMutableString* recognizers = [NSMutableString string];
  for (UIGestureRecognizer* recognizer in view.gestureRecognizers) {
    if (recognizers.length > 0) {
      [recognizers appendString:@","];
    }
    [recognizers appendFormat:@"%@:%p", NSStringFromClass(recognizer.class), recognizer];
  }

  return [NSString stringWithFormat:@"%@:%p frame=%@ hidden=%d alpha=%.2f ui=%d window=%p gr=[%@]",
                                    NSStringFromClass(view.class),
                                    view,
                                    NSStringFromCGRect(view.frame),
                                    view.hidden,
                                    view.alpha,
                                    view.userInteractionEnabled,
                                    view.window,
                                    recognizers];
}

static NSString* NativeScriptTouchDebugAncestorSummary(UIView* view) {
  NSMutableArray<NSString*>* parts = [NSMutableArray array];
  UIView* current = view;
  NSUInteger depth = 0;
  while (current != nil && depth < 12) {
    [parts addObject:NativeScriptTouchDebugViewSummary(current)];
    current = current.superview;
    depth += 1;
  }
  return [parts componentsJoinedByString:@" <- "];
}

static BOOL NativeScriptViewHasSurfaceTouchHandler(UIView* view, id ignoredRecognizer) {
#if __has_include(<React/RCTSurfaceTouchHandler.h>)
  for (UIGestureRecognizer* recognizer in view.gestureRecognizers) {
    if (recognizer != ignoredRecognizer && [recognizer isKindOfClass:RCTSurfaceTouchHandler.class]) {
      return YES;
    }
  }
#endif

  return NO;
}

static BOOL NativeScriptViewHasOnlySurfaceTouchHandlers(UIView* view) {
#if __has_include(<React/RCTSurfaceTouchHandler.h>)
  if (view == nil || view.gestureRecognizers.count == 0) {
    return NO;
  }

  for (UIGestureRecognizer* recognizer in view.gestureRecognizers) {
    if (![recognizer isKindOfClass:RCTSurfaceTouchHandler.class]) {
      return NO;
    }
  }

  return YES;
#else
  return NO;
#endif
}

static BOOL NativeScriptViewClassIsUIKitControllerBoundary(UIView* view) {
  if (view == nil) {
    return NO;
  }

  NSString* className = NSStringFromClass(view.class);
  return [className containsString:@"UINavigationTransitionView"] ||
      [className containsString:@"UITransitionView"] ||
      [className containsString:@"UIViewControllerWrapperView"] ||
      [className containsString:@"UILayoutContainerView"];
}

static BOOL NativeScriptViewIsHostHitTestPlumbing(UIView* view) {
  if (view == nil || [view isKindOfClass:UIControl.class]) {
    return NO;
  }

  NSString* className = NSStringFromClass(view.class);
  const BOOL isNativeScriptHost = [className isEqualToString:@"NativeScriptUIView"] ||
      [className isEqualToString:@"NativeScriptUIViewComponentView"];
  const BOOL isPlainSurfaceHost =
      [className isEqualToString:@"UIView"] &&
      (view.gestureRecognizers.count == 0 || NativeScriptViewHasOnlySurfaceTouchHandlers(view)) &&
      view.subviews.count > 0;

  if (!isNativeScriptHost && !isPlainSurfaceHost) {
    return NO;
  }

  return view.gestureRecognizers.count == 0 || NativeScriptViewHasOnlySurfaceTouchHandlers(view);
}

static BOOL NativeScriptViewHasUIKitControllerBoundaryAncestor(UIView* view,
                                                               UIView* stopView) {
  UIView* current = view.superview;
  NSUInteger depth = 0;
  while (current != nil && current != stopView && depth < 16) {
    if (NativeScriptViewClassIsUIKitControllerBoundary(current)) {
      return YES;
    }

    current = current.superview;
    depth += 1;
  }

  return NO;
}

static BOOL NativeScriptViewHasSurfaceTouchHandlerInAncestorChain(UIView* view,
                                                                  id ignoredRecognizer) {
#if __has_include(<React/RCTSurfaceTouchHandler.h>)
  UIView* current = view.superview;
  NSUInteger depth = 0;
  while (current != nil && depth < 32) {
    if (current.hidden || current.alpha <= 0.01 || !current.userInteractionEnabled ||
        current.window == nil || current.window != view.window) {
      return NO;
    }
    if (NativeScriptViewClassIsUIKitControllerBoundary(current)) {
      return NO;
    }
    for (UIGestureRecognizer* recognizer in current.gestureRecognizers) {
      if (recognizer != ignoredRecognizer && [recognizer isKindOfClass:RCTSurfaceTouchHandler.class]) {
        if (NativeScriptViewHasUIKitControllerBoundaryAncestor(current, nil)) {
          return NO;
        }

        return YES;
      }
    }
    current = current.superview;
    depth += 1;
  }
#endif

  return NO;
}

static void NativeScriptUpdateSurfaceTouchHandlerOriginsInAncestorChain(UIView* view,
                                                                        id ignoredRecognizer) {
#if __has_include(<React/RCTSurfaceTouchHandler.h>)
  if (view == nil || view.window == nil) {
    return;
  }

  UIView* current = view.superview;
  NSUInteger depth = 0;
  while (current != nil && depth < 32) {
    if (current.hidden || current.alpha <= 0.01 || !current.userInteractionEnabled ||
        current.window == nil || current.window != view.window) {
      return;
    }
    if (NativeScriptViewClassIsUIKitControllerBoundary(current)) {
      return;
    }

    CGPoint origin = [current convertPoint:CGPointZero toView:current.window];
    for (UIGestureRecognizer* recognizer in current.gestureRecognizers) {
      if (recognizer == ignoredRecognizer || ![recognizer isKindOfClass:RCTSurfaceTouchHandler.class]) {
        continue;
      }

      if (NativeScriptViewHasUIKitControllerBoundaryAncestor(current, nil)) {
        continue;
      }

      ((RCTSurfaceTouchHandler*)recognizer).viewOriginOffset = origin;
    }

    current = current.superview;
    depth += 1;
  }
#endif
}

static void NativeScriptUpdateSurfaceTouchHandlerOrigins(UIView* view, id ignoredRecognizer) {
#if __has_include(<React/RCTSurfaceTouchHandler.h>)
  if (view == nil || view.window == nil) {
    return;
  }

  CGPoint origin = [view convertPoint:CGPointZero toView:view.window];
  for (UIGestureRecognizer* recognizer in view.gestureRecognizers) {
    if (recognizer == ignoredRecognizer || ![recognizer isKindOfClass:RCTSurfaceTouchHandler.class]) {
      continue;
    }

    ((RCTSurfaceTouchHandler*)recognizer).viewOriginOffset = origin;
  }
#endif
}

static BOOL NativeScriptShouldForwardControllerAppearance(UIViewController* controller) {
  return controller != nil && controller.view != nil && controller.view.window != nil;
}

static BOOL NativeScriptHostedViewContainsControllerView(UIView* hostedView,
                                                         UIViewController* controller) {
  return hostedView != nil && controller != nil && controller.view != nil &&
      NativeScriptViewIsDescendantOfView(controller.view, hostedView);
}

static CGRect NativeScriptEffectiveTabBarHitBounds(UITabBar* tabBar) {
  CGRect bounds = tabBar.bounds;
  CGSize fittingSize = [tabBar sizeThatFits:CGSizeMake(bounds.size.width, bounds.size.height)];
  CGFloat maximumHeight = MAX(fittingSize.height + 32, 96);

  if (bounds.size.height > maximumHeight) {
    bounds.origin.y = CGRectGetMaxY(bounds) - maximumHeight;
    bounds.size.height = maximumHeight;
  }

  return CGRectInset(bounds, -24, -16);
}

static CGRect NativeScriptTabBarWindowHitFrame(UITabBar* tabBar, UIWindow* window) {
  if (tabBar == nil) {
    return CGRectNull;
  }

  if (window != nil) {
    return [tabBar convertRect:tabBar.bounds toView:window];
  }

  if (tabBar.superview != nil) {
    return [tabBar.superview convertRect:tabBar.frame toView:nil];
  }

  return tabBar.frame;
}

static CGRect NativeScriptTabBarWindowHitBounds(UITabBar* tabBar, UIWindow* window) {
  CGRect frame = NativeScriptTabBarWindowHitFrame(tabBar, window);
  if (CGRectIsNull(frame)) {
    return frame;
  }

  const CGFloat topEdge = window != nil ? window.safeAreaInsets.top + 20 : 64;
  CGSize fittingSize = [tabBar sizeThatFits:CGSizeMake(frame.size.width, frame.size.height)];
  const CGFloat maximumHeight = MAX(fittingSize.height + 32, 96);
  if (frame.size.height > maximumHeight) {
    if (CGRectGetMinY(frame) <= topEdge) {
      frame.size.height = maximumHeight;
    } else {
      frame.origin.y = CGRectGetMaxY(frame) - maximumHeight;
      frame.size.height = maximumHeight;
    }
  }

  frame = CGRectInset(frame, -24, 0);
  if (CGRectGetMinY(frame) <= topEdge) {
    frame.origin.y -= 16;
    frame.size.height += 16;
  } else {
    frame.origin.y -= 16;
    frame.size.height += 32;
  }
  return frame;
}

static BOOL NativeScriptPointInsideTabBarHitArea(UITabBar* tabBar, UIWindow* window,
                                                 CGPoint windowPoint) {
  if (tabBar == nil || tabBar.hidden || tabBar.alpha <= 0.01 ||
      !tabBar.userInteractionEnabled) {
    return NO;
  }

  CGRect frameHitBounds = NativeScriptTabBarWindowHitBounds(tabBar, window);
  if (!CGRectContainsPoint(frameHitBounds, windowPoint)) {
    return NO;
  }

  CGPoint localPoint = [tabBar convertPoint:windowPoint fromView:window];
  if (CGRectContainsPoint(NativeScriptEffectiveTabBarHitBounds(tabBar), localPoint)) {
    return YES;
  }

  return YES;
}

static UITabBar* NativeScriptVisibleControllerTabBarAtPoint(UIViewController* controller,
                                                            UIWindow* window,
                                                            CGPoint windowPoint) {
  if (controller == nil) {
    return nil;
  }

  UIViewController* presentedController = controller.presentedViewController;
  if (presentedController != nil && !presentedController.isBeingDismissed) {
    UITabBar* presentedTabBar =
        NativeScriptVisibleControllerTabBarAtPoint(presentedController, window, windowPoint);
    if (presentedTabBar != nil) {
      return presentedTabBar;
    }
  }

  NSArray<UIViewController*>* childControllers = controller.childViewControllers;
  for (UIViewController* childController in [childControllers reverseObjectEnumerator]) {
    UITabBar* childTabBar =
        NativeScriptVisibleControllerTabBarAtPoint(childController, window, windowPoint);
    if (childTabBar != nil) {
      return childTabBar;
    }
  }

  if ([controller isKindOfClass:UITabBarController.class]) {
    UITabBarController* tabBarController = static_cast<UITabBarController*>(controller);
    UITabBar* tabBar = tabBarController.tabBar;
    if (NativeScriptPointInsideTabBarHitArea(tabBar, window, windowPoint)) {
      return tabBar;
    }
  }

  return nil;
}

static UITabBar* NativeScriptVisibleWindowTabBarAtPoint(UIWindow* window, CGPoint windowPoint) {
  if (window == nil) {
    return nil;
  }

  UITabBar* controllerTabBar =
      NativeScriptVisibleControllerTabBarAtPoint(window.rootViewController, window, windowPoint);
  if (controllerTabBar != nil) {
    return controllerTabBar;
  }

  return nil;
}

static UITabBar* NativeScriptVisibleTabBarAtPoint(UIView* root, UIWindow* window,
                                                  CGPoint windowPoint) {
  if (root == nil) {
    return nil;
  }

  if ([root isKindOfClass:UIWindow.class]) {
    return NativeScriptVisibleWindowTabBarAtPoint(static_cast<UIWindow*>(root), windowPoint);
  }

  if ([root isKindOfClass:UITabBar.class]) {
    UITabBar* tabBar = static_cast<UITabBar*>(root);
    if (NativeScriptPointInsideTabBarHitArea(tabBar, window, windowPoint)) {
      return static_cast<UITabBar*>(root);
    }
  }

  for (UIView* subview in [root.subviews reverseObjectEnumerator]) {
    UITabBar* tabBar = NativeScriptVisibleTabBarAtPoint(subview, window, windowPoint);
    if (tabBar != nil) {
      return tabBar;
    }
  }

  return nil;
}

static UIView* NativeScriptHitTestTabBarAtPoint(UIView* root, UIWindow* window,
                                                CGPoint windowPoint, UIEvent* event) {
  UITabBar* tabBar = NativeScriptVisibleTabBarAtPoint(root, window, windowPoint);
  if (tabBar == nil) {
    return nil;
  }

  CGPoint tabBarPoint = [tabBar convertPoint:windowPoint fromView:window];
  if (!CGRectContainsPoint(NativeScriptEffectiveTabBarHitBounds(tabBar), tabBarPoint) &&
      CGRectContainsPoint(NativeScriptTabBarWindowHitBounds(tabBar, window), windowPoint)) {
    tabBarPoint = CGPointMake(windowPoint.x - tabBar.frame.origin.x,
                              windowPoint.y - tabBar.frame.origin.y);
  }
  UIView* tabBarHitView = [tabBar hitTest:tabBarPoint withEvent:event];
  if (tabBarHitView == tabBar &&
      CGRectContainsPoint(NativeScriptTabBarWindowHitBounds(tabBar, window), windowPoint)) {
    CGPoint fallbackPoint = CGPointMake(windowPoint.x - tabBar.frame.origin.x,
                                        windowPoint.y - tabBar.frame.origin.y);
    UIView* fallbackHitView = [tabBar hitTest:fallbackPoint withEvent:event];
    if (fallbackHitView != nil && fallbackHitView != tabBar) {
      return fallbackHitView;
    }
  }
  return tabBarHitView ?: tabBar;
}
#if NATIVESCRIPT_RN_FABRIC_LAYOUT_METRICS_AVAILABLE
static const facebook::react::LayoutMetrics*
NativeScriptLayoutMetricsForFabricComponentView(id object);
#endif

// The box Yoga gave `view`, when that is knowable. Only Fabric component views
// carry a Yoga box; for every other view (a host's children view, a
// UIViewController's view, UIKit's own transition containers) Yoga knows
// nothing, which is exactly the case the hosted fill exists to compensate for.
static BOOL NativeScriptFabricLayoutFrameForView(UIView* view, CGRect* outFrame) {
#if NATIVESCRIPT_RN_FABRIC_LAYOUT_METRICS_AVAILABLE
  if (view == nil || !NativeScriptViewConformsToRCTComponentViewProtocol(view)) {
    return NO;
  }
  const facebook::react::LayoutMetrics* metrics =
      NativeScriptLayoutMetricsForFabricComponentView(view);
  if (metrics == nullptr) {
    return NO;
  }
  const CGRect frame = RCTCGRectFromRect(metrics->frame);
  if (frame.size.width <= 0 && frame.size.height <= 0) {
    return NO;
  }
  if (outFrame != nullptr) {
    *outFrame = frame;
  }
  return YES;
#else
  (void)view;
  (void)outFrame;
  return NO;
#endif
}

static BOOL NativeScriptFabricLayoutSizeForView(UIView* view, CGSize* outSize) {
  CGRect frame = CGRectZero;
  if (!NativeScriptFabricLayoutFrameForView(view, &frame)) {
    return NO;
  }
  if (outSize != nullptr) {
    *outSize = frame.size;
  }
  return YES;
}

static BOOL NativeScriptSubviewShouldFillParent(UIView* parent, UIView* child) {
  if (parent == nil || child == nil) {
    return NO;
  }

  const CGRect parentBounds = parent.bounds;
  const CGRect childFrame = child.frame;
  if (parentBounds.size.width <= 0) {
    return NO;
  }

  if ([parent isKindOfClass:UIScrollView.class]) {
    return fabs(childFrame.origin.x) < 1 && fabs(childFrame.origin.y) < 1 &&
        fabs(childFrame.size.width - parentBounds.size.width) < 2 &&
        childFrame.size.height > 0 && childFrame.size.height < parentBounds.size.height - 2;
  }

  if (fabs(childFrame.origin.x) >= 1 || fabs(childFrame.origin.y) >= 1) {
    return NO;
  }

  CGSize parentLayoutSize = CGSizeZero;
  CGSize childLayoutSize = CGSizeZero;
  if (NativeScriptFabricLayoutSizeForView(parent, &parentLayoutSize) &&
      NativeScriptFabricLayoutSizeForView(child, &childLayoutSize)) {
    // Yoga laid both of these out, so it owns the relationship between them.
    // Re-stretch only the children Yoga itself stretched flush to the parent's
    // box -- those are the ones that must follow the parent when the hosted
    // fill grows it past its Yoga size. A child Yoga deliberately sized smaller
    // (an explicit width/height, a self-sized header item) is the author's
    // layout and must survive untouched.
    //
    // Both sides of this test read Yoga's boxes rather than the live frames, so
    // the decision is stable no matter what has already been done to the frames
    // by an earlier fill or by UIKit autoresizing.
    return fabs(childLayoutSize.width - parentLayoutSize.width) < 2 &&
           fabs(childLayoutSize.height - parentLayoutSize.height) < 2;
  }

  return childFrame.size.width <= 0 ||
         fabs(childFrame.size.width - parentBounds.size.width) < 2;
}

static CGRect NativeScriptHostedSubviewFillFrame(UIView* parent) {
  CGRect frame = parent.bounds;
  if ([parent isKindOfClass:UIScrollView.class]) {
    frame.origin = CGPointZero;
  }
  return frame;
}

#if NATIVESCRIPT_RN_FABRIC_LAYOUT_METRICS_AVAILABLE
static const facebook::react::LayoutMetrics*
NativeScriptLayoutMetricsForFabricComponentView(id object) {
  Class currentClass = object_getClass(object);
  while (currentClass != Nil) {
    Ivar layoutMetricsIvar = class_getInstanceVariable(currentClass, "_layoutMetrics");
    if (layoutMetricsIvar != nullptr) {
      ptrdiff_t offset = ivar_getOffset(layoutMetricsIvar);
      if (offset < 0) {
        return nullptr;
      }
      auto* storage = reinterpret_cast<const uint8_t*>(object) + offset;
      return reinterpret_cast<const facebook::react::LayoutMetrics*>(storage);
    }
    currentClass = class_getSuperclass(currentClass);
  }
  return nullptr;
}

#endif

static void NativeScriptAppendRectSnapshot(NSMutableString* key, CGRect rect) {
  [key appendFormat:@"%.3f,%.3f,%.3f,%.3f",
                    static_cast<double>(rect.origin.x),
                    static_cast<double>(rect.origin.y),
                    static_cast<double>(rect.size.width),
                    static_cast<double>(rect.size.height)];
}

static NSUInteger NativeScriptVisibleSubviewCountExcludingSentinel(UIView* view, UIView* sentinel) {
  NSUInteger count = 0;
  for (UIView* subview in view.subviews) {
    if (subview != sentinel) {
      count += 1;
    }
  }
  return count;
}

static void NativeScriptAppendSubviewTopology(NSMutableString* key,
                                              UIView* root,
                                              UIView* sentinel,
                                              NSUInteger depth,
                                              NSUInteger maxDepth) {
  if (root == nil || depth > maxDepth) {
    return;
  }

  [key appendFormat:@"<%p:%lu", root, static_cast<unsigned long>(
      NativeScriptVisibleSubviewCountExcludingSentinel(root, sentinel))];
  for (UIView* subview in root.subviews) {
    if (subview == sentinel) {
      continue;
    }

    [key appendFormat:@"|%p:%d:%.3f:%lu:",
                      subview,
                      subview.hidden ? 1 : 0,
                      static_cast<double>(subview.alpha),
                      static_cast<unsigned long>(
                          NativeScriptVisibleSubviewCountExcludingSentinel(subview, sentinel))];
    NativeScriptAppendRectSnapshot(key, subview.frame);
    [key appendString:@":"];
    NativeScriptAppendRectSnapshot(key, subview.bounds);

    if (depth < maxDepth) {
      NativeScriptAppendSubviewTopology(key, subview, sentinel, depth + 1, maxDepth);
    }
  }
  [key appendString:@">"];
}

static NSString* NativeScriptDetachedChildrenLayoutSnapshotKey(UIView* childrenView,
                                                               UIView* sentinel) {
  if (childrenView == nil) {
    return @"";
  }

  NSMutableString* key = [NSMutableString stringWithCapacity:160];
  [key appendFormat:@"%p|%p|", childrenView, childrenView.window];
  NativeScriptAppendRectSnapshot(key, childrenView.bounds);
  [key appendFormat:@"|%lu", static_cast<unsigned long>(
      NativeScriptVisibleSubviewCountExcludingSentinel(childrenView, sentinel))];

  for (UIView* subview in childrenView.subviews) {
    if (subview == sentinel) {
      continue;
    }

    [key appendFormat:@"|%p:%lu:%d:%.3f:",
                      subview,
                      static_cast<unsigned long>(subview.autoresizingMask),
                      subview.hidden ? 1 : 0,
                      static_cast<double>(subview.alpha)];
    NativeScriptAppendRectSnapshot(key, subview.frame);
    [key appendString:@":"];
    NativeScriptAppendRectSnapshot(key, subview.bounds);
  }

  [key appendString:@"|tree:"];
  NativeScriptAppendSubviewTopology(key, childrenView, sentinel, 0, 3);

  return key;
}

static NSString* NativeScriptDetachedChildrenDisplaySnapshotKey(UIView* childrenView,
                                                                UIView* sentinel) {
  if (childrenView == nil) {
    return @"";
  }

  NSMutableString* key = [NSMutableString stringWithCapacity:220];
  [key appendFormat:@"%p|%p|%p|",
                    childrenView,
                    childrenView.superview,
                    childrenView.window];
  NativeScriptAppendRectSnapshot(key, childrenView.frame);
  [key appendString:@"|"];
  NativeScriptAppendRectSnapshot(key, childrenView.bounds);
  NativeScriptAppendSubviewTopology(key, childrenView, sentinel, 0, 2);
  return key;
}

static void NativeScriptInvalidateHostedSubviewDisplay(UIView* view,
                                                       UIView* sentinel,
                                                       NSUInteger depth) {
  if (view == nil || view == sentinel || depth > 10) {
    return;
  }

  [view setNeedsDisplay];
  [view.layer setNeedsDisplay];

  if (depth == 0) {
    [view setNeedsLayout];
  }

  NSArray<UIView*>* subviews = [view.subviews copy];
  for (UIView* subview in subviews) {
    NativeScriptInvalidateHostedSubviewDisplay(subview, sentinel, depth + 1);
  }
  [subviews release];
}

static void NativeScriptFlushHostedSubviewDisplay(UIView* view,
                                                  UIView* sentinel,
                                                  NSUInteger depth) {
  if (view == nil || view == sentinel || depth > 10) {
    return;
  }

  [view.layer displayIfNeeded];

  NSArray<UIView*>* subviews = [view.subviews copy];
  for (UIView* subview in subviews) {
    NativeScriptFlushHostedSubviewDisplay(subview, sentinel, depth + 1);
  }
  [subviews release];
}

static BOOL NativeScriptLayoutHostedSubviewChain(UIView* root,
                                                 UIView* sentinel,
                                                 NSUInteger depth);

static BOOL NativeScriptLayoutHostedSubviewChain(UIView* root,
                                                 UIView* sentinel,
                                                 NSUInteger depth) {
  if (root == nil || root == sentinel || depth > 12) {
    return NO;
  }

  BOOL didMutate = NO;
  const CGRect bounds = NativeScriptHostedSubviewFillFrame(root);
  for (UIView* subview in root.subviews) {
    if (subview == sentinel) {
      continue;
    }
    if (!NativeScriptSubviewShouldFillParent(root, subview)) {
      continue;
    }

    // Deliberately NOT written into Fabric's cached layout metrics: the fill is
    // a presentation-only override of a box Yoga under-sized, and Fabric's
    // cache has to keep reporting Yoga's truth. Writing the filled frame back
    // made the override permanent -- Fabric then believed the view was already
    // laid out, so the real Yoga frame was never applied again and any hosted
    // element with its own size was pinned to the host's bounds forever.
    BOOL didMutateSubview = NO;
    if (!CGRectEqualToRect(subview.frame, bounds)) {
      subview.frame = bounds;
      didMutateSubview = YES;
    }
    const UIViewAutoresizing flexibleSizeMask =
        UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    if (subview.autoresizingMask != flexibleSizeMask) {
      subview.autoresizingMask = flexibleSizeMask;
      didMutateSubview = YES;
    }
    if (didMutateSubview) {
      [subview setNeedsLayout];
      didMutate = YES;
    }
    didMutate = NativeScriptLayoutHostedSubviewChain(subview, sentinel, depth + 1) || didMutate;
  }

  return didMutate;
}

static UIView* NativeScriptHitTestVisibleDescendantOutsideBounds(
    UIView* view,
    CGPoint point,
    UIEvent* event,
    NSUInteger depth) {
  if (view == nil || depth > 16 || view.hidden || view.alpha <= 0.01 ||
      !view.userInteractionEnabled || view.window == nil) {
    return nil;
  }

  NSArray<UIView*>* subviews = [view.subviews copy];
  for (UIView* subview in [subviews reverseObjectEnumerator]) {
    if (subview.hidden || subview.alpha <= 0.01 || !subview.userInteractionEnabled ||
        subview.window == nil) {
      continue;
    }

    CGPoint subviewPoint = [subview convertPoint:point fromView:view];
    const BOOL subviewIsHostPlumbing = NativeScriptViewIsHostHitTestPlumbing(subview);
    UIView* hitView = nil;
    if (!subviewIsHostPlumbing) {
      hitView = [subview hitTest:subviewPoint withEvent:event];
      if (hitView != nil && !NativeScriptViewIsHostHitTestPlumbing(hitView)) {
        [subviews release];
        return hitView;
      }
    }

    hitView =
        NativeScriptHitTestVisibleDescendantOutsideBounds(subview, subviewPoint, event, depth + 1);
    if (hitView != nil && !NativeScriptViewIsHostHitTestPlumbing(hitView)) {
      [subviews release];
      return hitView;
    }
  }
  [subviews release];

  return nil;
}

static BOOL NativeScriptHostedOwnerViewPointInsideExcludingHost(UIView* ownerView,
                                                                UIView* hostView,
                                                                CGPoint point,
                                                                UIEvent* event,
                                                                NSUInteger depth) {
  if (ownerView == nil || hostView == nil || depth > 16 || ownerView.hidden ||
      ownerView.alpha <= 0.01 || !ownerView.userInteractionEnabled ||
      ownerView.window == nil) {
    return NO;
  }

  NSArray<UIView*>* subviews = [ownerView.subviews copy];
  for (UIView* subview in [subviews reverseObjectEnumerator]) {
    if (subview == hostView || NativeScriptViewIsDescendantOfView(hostView, subview) ||
        subview.hidden || subview.alpha <= 0.01 || !subview.userInteractionEnabled ||
        subview.window == nil) {
      continue;
    }

    CGPoint subviewPoint = [subview convertPoint:point fromView:ownerView];
    const BOOL subviewIsHostPlumbing = NativeScriptViewIsHostHitTestPlumbing(subview);
    if ((!subviewIsHostPlumbing && [subview pointInside:subviewPoint withEvent:event]) ||
        NativeScriptHostedOwnerViewPointInsideExcludingHost(
            subview, hostView, subviewPoint, event, depth + 1)) {
      [subviews release];
      return YES;
    }
  }
  [subviews release];

  return NO;
}

static UIView* NativeScriptHostedOwnerViewHitTestExcludingHost(UIView* ownerView,
                                                               UIView* hostView,
                                                               CGPoint point,
                                                               UIEvent* event,
                                                               NSUInteger depth) {
  if (ownerView == nil || hostView == nil || depth > 16 || ownerView.hidden ||
      ownerView.alpha <= 0.01 || !ownerView.userInteractionEnabled ||
      ownerView.window == nil) {
    return nil;
  }

  NSArray<UIView*>* subviews = [ownerView.subviews copy];
  for (UIView* subview in [subviews reverseObjectEnumerator]) {
    if (subview == hostView || NativeScriptViewIsDescendantOfView(hostView, subview) ||
        subview.hidden || subview.alpha <= 0.01 || !subview.userInteractionEnabled ||
        subview.window == nil) {
      continue;
    }

    CGPoint subviewPoint = [subview convertPoint:point fromView:ownerView];
    const BOOL subviewIsHostPlumbing = NativeScriptViewIsHostHitTestPlumbing(subview);
    UIView* hitView = nil;
    if (!subviewIsHostPlumbing) {
      hitView = [subview hitTest:subviewPoint withEvent:event];
      if (hitView != nil && !NativeScriptViewIsHostHitTestPlumbing(hitView)) {
        [subviews release];
        return hitView;
      }
    }

    hitView =
        NativeScriptHostedOwnerViewHitTestExcludingHost(subview, hostView, subviewPoint, event, depth + 1);
    if (hitView != nil && !NativeScriptViewIsHostHitTestPlumbing(hitView)) {
      [subviews release];
      return hitView;
    }
  }
  [subviews release];

  return nil;
}

@class NativeScriptUIView;
@class NativeScriptDetachedChildrenLayoutObserver;

@interface NativeScriptDetachedChildrenLayoutObserver : NSObject
- (instancetype)initWithView:(UIView*)view owner:(NativeScriptUIView*)owner;
- (void)invalidate;
@end

static const void* NativeScriptDetachedChildrenOwnerKey =
    &NativeScriptDetachedChildrenOwnerKey;
static const void* NativeScriptDetachedChildrenLayoutObserverKey =
    &NativeScriptDetachedChildrenLayoutObserverKey;
static const void* NativeScriptHostedViewOwnerKey = &NativeScriptHostedViewOwnerKey;

static NativeScriptUIView* NativeScriptDetachedChildrenOwner(UIView* view) {
  id owner = view == nil ? nil : objc_getAssociatedObject(view, NativeScriptDetachedChildrenOwnerKey);
  if (owner == nil || ![owner isKindOfClass:NativeScriptUIView.class]) {
    return nil;
  }

  return static_cast<NativeScriptUIView*>(owner);
}

static void NativeScriptSetDetachedChildrenOwner(UIView* view, NativeScriptUIView* owner) {
  if (view == nil) {
    return;
  }

  id existingObserver =
      objc_getAssociatedObject(view, NativeScriptDetachedChildrenLayoutObserverKey);
  if (existingObserver != nil && [existingObserver respondsToSelector:@selector(invalidate)]) {
    [existingObserver performSelector:@selector(invalidate)];
    objc_setAssociatedObject(view, NativeScriptDetachedChildrenLayoutObserverKey, nil,
                             OBJC_ASSOCIATION_RETAIN_NONATOMIC);
  }

  objc_setAssociatedObject(
      view, NativeScriptDetachedChildrenOwnerKey, owner, OBJC_ASSOCIATION_ASSIGN);

  if (owner != nil) {
    id observer = [[[NativeScriptDetachedChildrenLayoutObserver alloc] initWithView:view
                                                                              owner:owner]
        autorelease];
    objc_setAssociatedObject(view, NativeScriptDetachedChildrenLayoutObserverKey, observer,
                             OBJC_ASSOCIATION_RETAIN_NONATOMIC);
  }
}

static NativeScriptUIView* NativeScriptHostedViewOwner(UIView* view) {
  id owner = view == nil ? nil : objc_getAssociatedObject(view, NativeScriptHostedViewOwnerKey);
  if (owner == nil || ![owner isKindOfClass:NativeScriptUIView.class]) {
    return nil;
  }

  return static_cast<NativeScriptUIView*>(owner);
}

static void NativeScriptSetHostedViewOwner(UIView* view, NativeScriptUIView* owner) {
  if (view == nil) {
    return;
  }

  objc_setAssociatedObject(view, NativeScriptHostedViewOwnerKey, owner, OBJC_ASSOCIATION_ASSIGN);
}

@interface NativeScriptUIView ()
- (void)attachDetachedChildrenTouchHandlerIfNeeded;
- (void)attachViewControllerIfPossible;
- (void)detachDetachedChildrenTouchHandler;
- (void)detachViewControllerIfOwnedByHost;
- (void)dismissViewControllerPresentationIfNeeded;
- (void)applyNativeViewLayoutMode;
- (void)deactivateNativeViewHostConstraints;
- (void)invalidateDetachedChildrenDisplay;
- (void)invalidateDetachedChildrenDisplayIfNeeded;
- (void)invalidateDetachedChildrenDisplaySnapshot;
- (void)invalidateDetachedChildrenLayoutSnapshot;
- (void)invalidateHostReadySnapshot;
- (void)installDetachedChildrenTouchSentinelIfNeeded;
- (BOOL)flushDetachedChildrenDisplay;
- (BOOL)layoutDetachedChildrenViewSubviewsAndReturnMutation;
- (void)notifyHostReadyIfNeeded;
- (void)refreshCollectedChildrenHostIfNeeded;
- (BOOL)refreshDetachedChildrenHost;
- (void)refreshDetachedChildrenSentinelAttachment;
- (void)refreshUIKitHostAfterNativeAttachment;
- (NSString*)fabricMountedChildLifecycleKeyForEvent:(NSDictionary<NSString*, id>*)event;
- (void)replayFabricMountedChildrenAsMountEventsIfNeeded;
- (void)scheduleUIKitHostMountedLifecycleIfNeeded;
- (void)scheduleUIKitHostPropsTransactionCommitIfNeeded;
- (void)setNeedsUIKitHostRefreshAfterNativeAttachment;
- (void)updateDetachedChildrenTouchHandlerOrigin;
- (NSDictionary<NSString*, NSString*>*)uikitHostHandles;
- (void)runUIKitHostLifecycle:(NSString*)phase event:(NSDictionary<NSString*, id>*)event;
- (NSString*)fabricTransactionJsonWithModifiedChildren:(BOOL)hasModifiedChildren
                                         modifiedProps:(BOOL)hasModifiedProps;
@end

@implementation NativeScriptDetachedChildrenLayoutObserver {
  UIView* _view;
  NativeScriptUIView* _owner;
  BOOL _observing;
  BOOL _refreshing;
}

- (instancetype)initWithView:(UIView*)view owner:(NativeScriptUIView*)owner {
  if (self = [super init]) {
    _view = [view retain];
    _owner = owner;
    if (_view != nil) {
      [_view addObserver:self forKeyPath:@"bounds" options:0 context:nil];
      [_view addObserver:self forKeyPath:@"frame" options:0 context:nil];
      _observing = YES;
    }
  }
  return self;
}

- (void)dealloc {
  [self invalidate];
  [_view release];
  [super dealloc];
}

- (void)invalidate {
  if (!_observing || _view == nil) {
    _owner = nil;
    return;
  }

  @try {
    [_view removeObserver:self forKeyPath:@"bounds"];
    [_view removeObserver:self forKeyPath:@"frame"];
  } @catch (__unused NSException* exception) {
  }
  _observing = NO;
  _owner = nil;
}

- (void)observeValueForKeyPath:(NSString*)keyPath
                      ofObject:(id)object
                        change:(NSDictionary<NSKeyValueChangeKey, id>*)change
                       context:(void*)context {
  (void)change;
  (void)context;
  if (object != _view ||
      (![keyPath isEqualToString:@"bounds"] && ![keyPath isEqualToString:@"frame"])) {
    [super observeValueForKeyPath:keyPath ofObject:object change:change context:context];
    return;
  }

  NativeScriptUIView* owner = _owner;
  if (owner == nil || _refreshing) {
    return;
  }

  _refreshing = YES;
  @try {
    [owner refreshDetachedChildrenHost];
  } @finally {
    _refreshing = NO;
  }
}

@end

@interface NativeScriptDetachedChildrenTouchSentinel : UIView
@property(nonatomic, assign) NativeScriptUIView* owner;
@end

@implementation NativeScriptDetachedChildrenTouchSentinel

- (BOOL)pointInside:(CGPoint)point withEvent:(UIEvent*)event {
  return NO;
}

- (UIView*)hitTest:(CGPoint)point withEvent:(UIEvent*)event {
  return nil;
}

- (void)didMoveToWindow {
  [super didMoveToWindow];
  [self.owner refreshDetachedChildrenSentinelAttachment];
}

- (void)didMoveToSuperview {
  [super didMoveToSuperview];
  [self.owner refreshDetachedChildrenSentinelAttachment];
}

- (void)layoutSubviews {
  [super layoutSubviews];
  [self.owner refreshDetachedChildrenSentinelAttachment];
}

@end

@implementation NativeScriptUIView {
  UIView* _nativeView;
  UIView* _childrenView;
  UIViewController* _viewController;
  UIViewController* _attachedViewControllerParent;
  id _detachedTouchHandler;
  UIView* _detachedTouchHandlerView;
  UIWindow* _detachedTouchHandlerWindow;
  NativeScriptDetachedChildrenTouchSentinel* _detachedTouchSentinel;
  NSString* _lastDetachedChildrenLayoutKey;
  NSString* _lastDetachedChildrenDisplayKey;
  NSString* _lastHostReadyKey;
  NSString* _lastHostReadyShallowKey;
  NSMutableArray<UIView*>* _fabricMountedChildComponentViews;
  NSMutableArray<UIView*>* _collectedChildComponentViews;
  NSMutableSet<NSString*>* _fabricMountedChildLifecycleKeys;
  NSMutableSet<NSNumber*>* _fabricPendingUnmountTagsForCurrentTransaction;
  NSArray<NSLayoutConstraint*>* _nativeViewHostConstraints;
  UIWindow* _lastUIKitHostAttachmentWindow;
  BOOL _hasCreatedUIKitHost;
  // CHANGE 1 (native one-shot `mounted` delivery): set exactly once, the
  // first time this host's creation succeeds, guarding the one-shot
  // dispatch_async in -scheduleUIKitHostMountedLifecycleIfNeeded so a host
  // never gets more than one native-initiated "mounted" lifecycle delivery.
  // Reset alongside _hasCreatedUIKitHost (see -setHostId: and -init).
  BOOL _hasDeliveredMountedLifecycle;
  BOOL _hasReplayedFabricTransactionAfterHostCreation;
  BOOL _isNotifyingHostReady;
  BOOL _isRefreshingUIKitHostAfterNativeAttachment;
  BOOL _needsUIKitHostRefreshAfterNativeAttachment;
  // SEAM D STAGE 0: unified Fabric transactionCommitted delivery token -- see
  // the fabricTransactionDeliveryToken/advanceFabricTransactionDeliveryToken
  // contract in the header. Replaces the historical, independently-bumped
  // _uikitHostPropsTransactionCommitToken (this class) plus ComponentView's
  // now-deleted _mountingTransactionToken and
  // _fabricTransactionCommitFallbackToken.
  NSUInteger _fabricTransactionDeliveryToken;
}

- (instancetype)initWithFrame:(CGRect)frame {
  NativeScriptInstallFabricReparentingGuard();
  self = [super initWithFrame:frame];
  if (self != nil) {
    // Fabric bool props default to false. JS sends true for ordinary controller
    // and native-view hosts, so keep native pre-prop values aligned with
    // codegen and avoid attaching externally owned views before React delivers
    // props.
    _attachControllerToParent = NO;
    _attachNativeView = NO;
    // _hasCreatedUIKitHost is zero-initialized to NO like every other ivar
    // here; _hasDeliveredMountedLifecycle mirrors it explicitly so the
    // CHANGE 1 one-shot guard's reset is documented alongside the ivar it
    // tracks (see -setHostId: for the other reset site).
    _hasDeliveredMountedLifecycle = NO;
    _needsUIKitHostRefreshAfterNativeAttachment = YES;
    _fabricMountedChildComponentViews = [NSMutableArray new];
    _collectedChildComponentViews = [NSMutableArray new];
    _fabricMountedChildLifecycleKeys = [NSMutableSet new];
  }
  return self;
}

- (void)dealloc {
  _fabricTransactionDeliveryToken += 1;
  [self dismissViewControllerPresentationIfNeeded];
  [self detachViewControllerIfOwnedByHost];
  [self detachDetachedChildrenTouchHandler];
  _detachedTouchSentinel.owner = nil;
  [_detachedTouchSentinel removeFromSuperview];
  [_detachedTouchSentinel release];
  [self deactivateNativeViewHostConstraints];
  if (NativeScriptHostedViewOwner(_nativeView) == self) {
    NativeScriptSetHostedViewOwner(_nativeView, nil);
  }
  [_nativeView removeFromSuperview];
  [_nativeView release];
  if (NativeScriptDetachedChildrenOwner(_childrenView) == self) {
    NativeScriptSetDetachedChildrenOwner(_childrenView, nil);
  }
  [_childrenView release];
  [_viewController release];
  [_detachedTouchHandler release];
  [_detachedTouchHandlerView release];
  [_nativeViewHandle release];
  [_childrenViewHandle release];
  [_controllerHandle release];
  [_hostId release];
  [_hostReadyId release];
  [_debugName release];
  [_uikitHostPropsJson release];
  [_onHostReady release];
  [_lastDetachedChildrenLayoutKey release];
  [_lastDetachedChildrenDisplayKey release];
  [_lastHostReadyKey release];
  [_lastHostReadyShallowKey release];
  [_fabricMountedChildComponentViews release];
  [_collectedChildComponentViews release];
  [_fabricMountedChildLifecycleKeys release];
  [_fabricPendingUnmountTagsForCurrentTransaction release];
  [super dealloc];
}

- (void)invalidateDetachedChildrenLayoutSnapshot {
  [_lastDetachedChildrenLayoutKey release];
  _lastDetachedChildrenLayoutKey = nil;
}

- (void)invalidateDetachedChildrenDisplaySnapshot {
  [_lastDetachedChildrenDisplayKey release];
  _lastDetachedChildrenDisplayKey = nil;
}

- (void)invalidateDetachedChildrenDisplay {
  if (_childrenView == nil) {
    return;
  }

  NativeScriptInvalidateHostedSubviewDisplay(_childrenView, _detachedTouchSentinel, 0);
  [_lastDetachedChildrenDisplayKey release];
  _lastDetachedChildrenDisplayKey =
      [NativeScriptDetachedChildrenDisplaySnapshotKey(_childrenView, _detachedTouchSentinel) copy];
}

- (void)invalidateDetachedChildrenDisplayIfNeeded {
  if (_childrenView == nil) {
    return;
  }

  NSString* displayKey =
      NativeScriptDetachedChildrenDisplaySnapshotKey(_childrenView, _detachedTouchSentinel);
  if ([_lastDetachedChildrenDisplayKey isEqualToString:displayKey]) {
    return;
  }

  NativeScriptInvalidateHostedSubviewDisplay(_childrenView, _detachedTouchSentinel, 0);
  [_lastDetachedChildrenDisplayKey release];
  _lastDetachedChildrenDisplayKey = [displayKey copy];
}

- (BOOL)flushDetachedChildrenDisplay {
  if (_childrenView == nil || _childrenView.window == nil) {
    return NO;
  }

  [self layoutDetachedChildrenViewSubviewsIfNeeded];
  NativeScriptInvalidateHostedSubviewDisplay(_childrenView, _detachedTouchSentinel, 0);
  [_childrenView setNeedsLayout];
  [_childrenView layoutIfNeeded];
  NativeScriptFlushHostedSubviewDisplay(_childrenView, _detachedTouchSentinel, 0);
  [_lastDetachedChildrenDisplayKey release];
  _lastDetachedChildrenDisplayKey =
      [NativeScriptDetachedChildrenDisplaySnapshotKey(_childrenView, _detachedTouchSentinel) copy];
  return NativeScriptChildrenViewHasVisibleChild(_childrenView, _detachedTouchSentinel, self);
}

- (void)invalidateHostReadySnapshot {
  [_lastHostReadyKey release];
  _lastHostReadyKey = nil;
  [_lastHostReadyShallowKey release];
  _lastHostReadyShallowKey = nil;
}

- (void)setHostId:(NSString*)hostId {
  if ((_hostId == hostId) || [_hostId isEqualToString:hostId]) {
    return;
  }

  NativeScriptFabricDebugLog(@"setHostId owner=%p debug=%@ previous=%@ next=%@ window=%p super=%@:%p propsJson=%d",
                             self,
                             _debugName ?: @"",
                             _hostId ?: @"",
                             hostId ?: @"",
                             self.window,
                             self.superview == nil ? @"nil" : NSStringFromClass(self.superview.class),
                             self.superview,
                             _uikitHostPropsJson.length > 0);

  NSString* previousHostId = [_hostId copy];
  if (previousHostId.length > 0) {
    NativeScriptRunUIKitHostLifecycle(previousHostId, @"dispose", nil);
  }
  [previousHostId release];

  [_hostId release];
  _hostId = [hostId copy];
  _fabricTransactionDeliveryToken += 1;
  _hasCreatedUIKitHost = NO;
  _hasDeliveredMountedLifecycle = NO;
  _hasReplayedFabricTransactionAfterHostCreation = NO;
  [_fabricMountedChildLifecycleKeys removeAllObjects];
  [self setNeedsUIKitHostRefreshAfterNativeAttachment];
  [self invalidateHostReadySnapshot];
  [self mountUIKitHostIfNeeded];
  [self notifyHostReadyIfNeeded];
}

- (void)setHostReadyId:(NSString*)hostReadyId {
  if ((_hostReadyId == hostReadyId) || [_hostReadyId isEqualToString:hostReadyId]) {
    return;
  }

  [_hostReadyId release];
  _hostReadyId = [hostReadyId copy];
  [self invalidateHostReadySnapshot];
  [self notifyHostReadyIfNeeded];
}

- (void)setFabricLifecycleCallbacks:(BOOL)fabricLifecycleCallbacks {
  if (_fabricLifecycleCallbacks == fabricLifecycleCallbacks) {
    return;
  }

  _fabricLifecycleCallbacks = fabricLifecycleCallbacks;
  if (!_fabricLifecycleCallbacks) {
    [_fabricMountedChildLifecycleKeys removeAllObjects];
    return;
  }

  [self replayFabricMountedChildrenAsMountEventsIfNeeded];
  [self replayFabricTransactionAfterHostCreationIfNeeded];
}

- (void)setOnHostReady:(RCTDirectEventBlock)onHostReady {
  if (_onHostReady == onHostReady) {
    return;
  }

  [_onHostReady release];
  _onHostReady = [onHostReady copy];
  [self notifyHostReadyIfNeeded];
}

- (void)setIgnoreHostReadyWindowAttachment:(BOOL)ignoreHostReadyWindowAttachment {
  if (_ignoreHostReadyWindowAttachment == ignoreHostReadyWindowAttachment) {
    return;
  }

  _ignoreHostReadyWindowAttachment = ignoreHostReadyWindowAttachment;
  [self invalidateHostReadySnapshot];
  [self notifyHostReadyIfNeeded];
}

- (void)clearNativeViewAttachmentIfOwnedByHost {
  if (_nativeView == nil || NativeScriptHostedViewOwner(_nativeView) != self) {
    return;
  }

  [self setNeedsUIKitHostRefreshAfterNativeAttachment];
  [self deactivateNativeViewHostConstraints];
  NativeScriptSetHostedViewOwner(_nativeView, nil);
  if (_nativeView.superview == self) {
    [_nativeView removeFromSuperview];
  }
  [_nativeView release];
  _nativeView = nil;
  [self setNeedsLayout];
  [self notifyHostReadyIfNeeded];
  [self refreshUIKitHostAfterNativeAttachment];
}

- (void)setNativeViewHandle:(NSString*)nativeViewHandle {
  const BOOL sameHandle = (_nativeViewHandle == nativeViewHandle) ||
      [_nativeViewHandle isEqualToString:nativeViewHandle];
  if (!sameHandle) {
    [_nativeViewHandle release];
    _nativeViewHandle = [nativeViewHandle copy];
  }
  if (!_attachNativeView) {
    [self clearNativeViewAttachmentIfOwnedByHost];
    [self notifyHostReadyIfNeeded];
    return;
  }
  const BOOL mustClearDetachedControllerView =
      _detachControllerView && _viewController != nil && _nativeView == _viewController.view;
  if (sameHandle && (_nativeView != nil || _nativeViewHandle.length == 0) &&
      !mustClearDetachedControllerView) {
    return;
  }

  UIView* nativeView = NativeScriptUIViewFromHandle(_nativeViewHandle);
  if (nativeView == nil && _nativeViewHandle.length == 0 && !_detachControllerView &&
      _viewController != nil) {
    nativeView = _viewController.view;
  }
  [self setNativeView:nativeView];
}

- (void)setChildrenViewHandle:(NSString*)childrenViewHandle {
  const BOOL sameHandle = (_childrenViewHandle == childrenViewHandle) ||
      [_childrenViewHandle isEqualToString:childrenViewHandle];
  if (sameHandle && (_childrenView != nil || _childrenViewHandle.length == 0)) {
    return;
  }

  if (!sameHandle) {
    [_childrenViewHandle release];
    _childrenViewHandle = [childrenViewHandle copy];
  }
  [self setChildrenView:NativeScriptUIViewFromHandle(_childrenViewHandle)];
}

- (void)setControllerHandle:(NSString*)controllerHandle {
  const BOOL sameHandle = (_controllerHandle == controllerHandle) ||
      [_controllerHandle isEqualToString:controllerHandle];
  if (sameHandle && (_viewController != nil || _controllerHandle.length == 0)) {
    return;
  }

  if (!sameHandle) {
    [_controllerHandle release];
    _controllerHandle = [controllerHandle copy];
  }
  [self setViewController:NativeScriptUIViewControllerFromHandle(_controllerHandle)];
}

- (void)setAttachNativeView:(BOOL)attachNativeView {
  if (_attachNativeView == attachNativeView) {
    return;
  }

  _attachNativeView = attachNativeView;
  if (!_attachNativeView) {
    [self clearNativeViewAttachmentIfOwnedByHost];
    [self notifyHostReadyIfNeeded];
    return;
  }

  if (_nativeViewHandle.length > 0) {
    [self setNativeViewHandle:_nativeViewHandle];
  } else if (!_detachControllerView && _viewController != nil) {
    [self setNativeView:_viewController.view];
  }
}

- (void)setDetachControllerView:(BOOL)detachControllerView {
  if (_detachControllerView == detachControllerView) {
    return;
  }

  if (detachControllerView) {
    [self detachViewControllerIfOwnedByHost];
    if (_viewController != nil && _nativeView == _viewController.view) {
      [self setNativeView:nil];
    }
  }

  _detachControllerView = detachControllerView;

  if (!_detachControllerView && _viewController != nil) {
    if (_attachNativeView && _nativeViewHandle.length == 0) {
      [self setNativeView:_viewController.view];
    }
    [self attachViewControllerIfPossible];
  }
}

- (void)setAttachControllerToParent:(BOOL)attachControllerToParent {
  if (_attachControllerToParent == attachControllerToParent) {
    return;
  }

  if (!attachControllerToParent) {
    [self detachViewControllerIfOwnedByHost];
  }

  _attachControllerToParent = attachControllerToParent;

  if (_attachControllerToParent) {
    [self attachViewControllerIfPossible];
  }
}

- (void)setCollectChildren:(BOOL)collectChildren {
  if (_collectChildren == collectChildren) {
    return;
  }

  _collectChildren = collectChildren;
  [self setNeedsUIKitHostRefreshAfterNativeAttachment];
  if (_collectChildren) {
    if (_childrenView != nil) {
      NSArray<UIView*>* subviews = [_childrenView.subviews copy];
      for (UIView* subview in subviews) {
        if (subview == _detachedTouchSentinel) {
          continue;
        }
        [subview removeFromSuperview];
        if (![_collectedChildComponentViews containsObject:subview]) {
          [_collectedChildComponentViews addObject:subview];
        }
      }
      [subviews release];
    }
    [self detachDetachedChildrenTouchHandler];
    [self invalidateDetachedChildrenLayoutSnapshot];
    [self invalidateDetachedChildrenDisplaySnapshot];
    [self invalidateHostReadySnapshot];
    [self refreshCollectedChildrenHostIfNeeded];
    return;
  }

  if (_childrenView != nil && _collectedChildComponentViews.count > 0) {
    NSArray<UIView*>* collectedChildren = [_collectedChildComponentViews copy];
    [_collectedChildComponentViews removeAllObjects];
    for (UIView* child in collectedChildren) {
      [_childrenView addSubview:child];
    }
    [collectedChildren release];
  }
  [self layoutDetachedChildrenViewSubviewsIfNeeded];
  [self invalidateDetachedChildrenDisplay];
  [self installDetachedChildrenTouchSentinelIfNeeded];
  [self attachDetachedChildrenTouchHandlerIfNeeded];
  [self notifyHostReadyIfNeeded];
  [self refreshUIKitHostAfterNativeAttachment];
}

- (void)setDetachControllerFromParent:(BOOL)detachControllerFromParent {
  if (_detachControllerFromParent == detachControllerFromParent) {
    return;
  }

  if (detachControllerFromParent) {
    [self detachViewController];
    _attachedViewControllerParent = nil;
  }

  _detachControllerFromParent = detachControllerFromParent;

  if (!_detachControllerFromParent) {
    [self attachViewControllerIfPossible];
  }
}

- (void)setDebugName:(NSString*)debugName {
  if ((_debugName == debugName) || [_debugName isEqualToString:debugName]) {
    return;
  }

  [_debugName release];
  _debugName = [debugName copy];
}

- (void)setUikitHostPropsJson:(NSString*)uikitHostPropsJson {
  if ((_uikitHostPropsJson == uikitHostPropsJson) ||
      [_uikitHostPropsJson isEqualToString:uikitHostPropsJson]) {
    return;
  }

  [_uikitHostPropsJson release];
  _uikitHostPropsJson = [uikitHostPropsJson copy];
}

- (NSUInteger)fabricTransactionDeliveryToken {
  return _fabricTransactionDeliveryToken;
}

- (NSUInteger)advanceFabricTransactionDeliveryToken {
  return ++_fabricTransactionDeliveryToken;
}

- (void)scheduleUIKitHostPropsTransactionCommitIfNeeded {
  if (_hostId.length == 0 || _updateRevision <= 0) {
    return;
  }

  // SEAM D STAGE 0: never schedule this out-of-band props-revision commit
  // while a Fabric mounting transaction is applying mutations to the owning
  // ComponentView -- mountingTransactionDidMount is the legitimate initiator
  // (RNS parity: RNSScreenStack.mm:1352-1370 delivers exactly-once,
  // dispatch_async'd, ordered after layout -- NOT synchronously) and it
  // already observes _hasModifiedPropsInCurrentTransaction (set alongside
  // this same updateRevision bump; see updateProps/
  // applyNativeScriptUIKitHostProps) so it delivers this same props-modified
  // commit itself once the transaction finishes. Scheduling here too just
  // guarantees a duplicate delivery one runloop turn later -- this was
  // producer #2 of the measured 4-6x per-pop transactionCommitted
  // redelivery. Out of a transaction (the worklet-driven
  // nativeScriptApplyUIKitHostPropsForFabricTag path, where didMount never
  // fires) this remains the only delivery, so keep scheduling there. Mirrors
  // the identical in-transaction skip already used by
  // replayFabricTransactionAfterHostCreationIfNeeded above.
  UIView* componentView = self.fabricComponentView;
  if ([componentView isKindOfClass:NativeScriptUIViewComponentView.class] &&
      ((NativeScriptUIViewComponentView*)componentView).isApplyingMountingTransaction) {
    return;
  }

  const NSUInteger transactionToken = [self advanceFabricTransactionDeliveryToken];
  dispatch_async(dispatch_get_main_queue(), ^{
    if (self->_fabricTransactionDeliveryToken != transactionToken ||
        self->_hostId.length == 0) {
      return;
    }

    [self notifyFabricTransactionCommittedWithModifiedChildren:NO modifiedProps:YES];
  });
}

- (void)setUpdateRevision:(NSInteger)updateRevision {
  if (_updateRevision == updateRevision) {
    return;
  }

  _updateRevision = updateRevision;
  if (_updateRevision > 0) {
    // REVERTED (cold-launch host-profile burst fix, attempt #1): deferring
    // this crossing via dispatch_async + a coalescing token (mirroring
    // -scheduleUIKitHostPropsTransactionCommitIfNeeded below) DID collapse
    // the redundant cold-launch "update" bursts, but itest's `pop-slide`
    // content-discipline gate caught a real regression from it: deferring
    // "update" (which runs the adapter's stack reconcile -- the thing that
    // arms a pop's content-slide) by even one runloop turn let a
    // synchronous transactionCommitted/pop-transition step elsewhere run
    // BEFORE the reconcile it depended on, so ~half of a 10-pop cycle
    // dropped the content slide (POP_DID_NOT_SLIDE, slides=5/10). The
    // adjacent transactionCommitted token-coalescing survives (that path
    // was already async before this pass and is unaffected); only this
    // synchronous "update" delivery is restored to its original,
    // known-correct-ordering behavior. See NS_NS_HOST_PROFILE findings in
    // the cold-launch task writeup for the still-real redundant-crossing
    // cost this leaves unresolved.
    [self runUIKitHostLifecycle:@"update"];
    [self scheduleUIKitHostPropsTransactionCommitIfNeeded];
  }
}

- (void)setMountedRevision:(NSInteger)mountedRevision {
  if (_mountedRevision == mountedRevision) {
    return;
  }

  _mountedRevision = mountedRevision;
  if (_mountedRevision > 0) {
    [self runUIKitHostLifecycle:@"mounted"];
  }
}

- (NSString*)description {
  if (_debugName.length == 0) {
    return [super description];
  }

  NSString* description = [super description];
  if ([description hasSuffix:@">"]) {
    return [[description substringToIndex:description.length - 1]
        stringByAppendingFormat:@"; debugName = %@>", _debugName];
  }
  return [description stringByAppendingFormat:@" debugName = %@", _debugName];
}

- (NSDictionary<NSString*, id>*)hostReadyEventWithHasChildren:(BOOL)hasChildren
                                       visibleDescendantCount:(NSUInteger)visibleDescendantCount
                                               attachedWindow:(UIWindow*)attachedWindow {
  NSString* readyId = _hostReadyId.length > 0 ? _hostReadyId : _hostId;
  if (readyId.length == 0) {
    return nil;
  }

  NSMutableDictionary<NSString*, id>* event = [NSMutableDictionary dictionaryWithCapacity:9];
  event[@"hostReadyId"] = readyId;
  event[@"hostId"] = _hostId ?: @"";
  event[@"componentViewHandle"] = NativeScriptHandleFromNSObject(self.superview);
  event[@"nativeViewHandle"] =
      _nativeView != nil ? NativeScriptHandleFromNSObject(_nativeView) : (_nativeViewHandle ?: @"");
  event[@"childrenViewHandle"] = NativeScriptHandleFromNSObject(_childrenView);
  event[@"controllerHandle"] = NativeScriptHandleFromNSObject(_viewController);
  event[@"hasChildren"] = @(hasChildren);
  event[@"visibleDescendantCount"] = @(visibleDescendantCount);
  event[@"windowAttached"] = @(attachedWindow != nil);
  return event;
}

- (UIWindow*)hostReadyAttachedWindow {
  return _childrenView.window ?: _nativeView.window ?: _viewController.view.window ?: self.window;
}

- (NSString*)nativeMountInfoJson {
  NSMutableDictionary<NSString*, NSString*>* info =
      [NSMutableDictionary dictionaryWithCapacity:2];
  UIView* componentView = _fabricComponentView ?: self.superview;
  if (componentView != nil) {
    info[@"fabricComponentViewHandle"] = NativeScriptHandleFromNSObject(componentView);
  }
  info[@"fabricContainerViewHandle"] = NativeScriptHandleFromNSObject(self);

  if (![NSJSONSerialization isValidJSONObject:info]) {
    return nil;
  }

  NSError* error = nil;
  NSData* data = [NSJSONSerialization dataWithJSONObject:info options:0 error:&error];
  if (data == nil) {
    return nil;
  }

  return [[[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding] autorelease];
}

- (NSString*)hostReadyShallowKeyWithHasChildren:(BOOL)hasChildren
                                 attachedWindow:(UIWindow*)attachedWindow {
  NSString* readyId = _hostReadyId.length > 0 ? _hostReadyId : _hostId;
  if (readyId.length == 0) {
    return nil;
  }

  void* windowKey = _ignoreHostReadyWindowAttachment ? NULL : (void*)attachedWindow;
  NSMutableString* key = [NSMutableString stringWithCapacity:220];
  [key appendFormat:@"%@|%@|%@|%@|%@|%@|%p|",
                    readyId ?: @"",
                    _hostId ?: @"",
                    _nativeView != nil ? NativeScriptHandleFromNSObject(_nativeView)
                                       : (_nativeViewHandle ?: @""),
                    NativeScriptHandleFromNSObject(_childrenView),
                    NativeScriptHandleFromNSObject(_viewController),
                    hasChildren ? @"1" : @"0",
                    windowKey];
  NativeScriptAppendSubviewTopology(key, _childrenView, _detachedTouchSentinel, 0, 2);
  return key;
}

- (void)notifyHostReadyIfNeeded {
  static BOOL isDeliveringHostReady;
  if (isDeliveringHostReady) {
    return;
  }

  if (_isNotifyingHostReady) {
    return;
  }

  const BOOL hasChildren =
      NativeScriptChildrenViewHasVisibleChild(_childrenView, _detachedTouchSentinel, self);
  if (!hasChildren) {
    return;
  }

  UIWindow* attachedWindow = [self hostReadyAttachedWindow];
  if (attachedWindow == nil && !_emitOffWindowHostReady) {
    return;
  }

  NSString* shallowKey = [self hostReadyShallowKeyWithHasChildren:hasChildren
                                                   attachedWindow:attachedWindow];
  if (shallowKey == nil) {
    return;
  }
  if (_lastHostReadyKey != nil && [_lastHostReadyShallowKey isEqualToString:shallowKey]) {
    return;
  }

  const NSUInteger visibleDescendantCount =
      NativeScriptChildrenViewVisibleDescendantCount(_childrenView, _detachedTouchSentinel, self);
  NSDictionary<NSString*, id>* event =
      [self hostReadyEventWithHasChildren:hasChildren
                   visibleDescendantCount:visibleDescendantCount
                           attachedWindow:attachedWindow];
  if (event == nil) {
    return;
  }

  NSString* key = [NSString
      stringWithFormat:@"%@|%@|%@|%@|%@|%@|%@|%@",
                       event[@"hostReadyId"] ?: @"",
                       event[@"hostId"] ?: @"",
                       event[@"nativeViewHandle"] ?: @"",
                       event[@"childrenViewHandle"] ?: @"",
                       event[@"controllerHandle"] ?: @"",
                       [event[@"hasChildren"] boolValue] ? @"1" : @"0",
                       [event[@"windowAttached"] boolValue] ? @"1" : @"0",
                       event[@"visibleDescendantCount"] ?: @(0)];
  if ([_lastHostReadyKey isEqualToString:key]) {
    [_lastHostReadyShallowKey release];
    _lastHostReadyShallowKey = [shallowKey copy];
    return;
  }

  [_lastHostReadyKey release];
  _lastHostReadyKey = [key copy];
  [_lastHostReadyShallowKey release];
  _lastHostReadyShallowKey = [shallowKey copy];

  _isNotifyingHostReady = YES;
  isDeliveringHostReady = YES;
  @try {
    if (_hostId.length > 0 && [NSJSONSerialization isValidJSONObject:event]) {
      NSError* error = nil;
      NSData* eventData = [NSJSONSerialization dataWithJSONObject:event options:0 error:&error];
      if (eventData != nil) {
        NSString* eventJson = [[NSString alloc] initWithData:eventData
                                                    encoding:NSUTF8StringEncoding];
        [self runUIKitHostLifecycle:@"hostReady" transactionJson:eventJson];
        [eventJson release];
      }
    }

    if (_onHostReady != nil) {
      _onHostReady(event);
    }
    if ([_hostReadyDelegate respondsToSelector:@selector(nativeScriptUIView:didHostReady:)]) {
      [_hostReadyDelegate nativeScriptUIView:self didHostReady:event];
    }
  } @finally {
    isDeliveringHostReady = NO;
    _isNotifyingHostReady = NO;
  }
}

- (void)refreshUIKitHostAfterNativeAttachment {
  UIWindow* currentWindow = self.window;
  if (currentWindow == nil) {
    return;
  }

  if (_hostId.length == 0 ||
      _disableUIKitHostWindowAttachRefresh ||
      _isRefreshingUIKitHostAfterNativeAttachment) {
    return;
  }

  if (!_needsUIKitHostRefreshAfterNativeAttachment &&
      _lastUIKitHostAttachmentWindow == currentWindow) {
    return;
  }

  _lastUIKitHostAttachmentWindow = currentWindow;
  _needsUIKitHostRefreshAfterNativeAttachment = NO;
  _isRefreshingUIKitHostAfterNativeAttachment = YES;
  @try {
    [self runUIKitHostLifecycle:@"refresh"
                transactionJson:[self fabricTransactionJsonWithModifiedChildren:NO
                                                                  modifiedProps:NO]];
  } @finally {
    _isRefreshingUIKitHostAfterNativeAttachment = NO;
  }
}

- (void)setNeedsUIKitHostRefreshAfterNativeAttachment {
  _needsUIKitHostRefreshAfterNativeAttachment = YES;
}

- (void)applyUIKitHostHandles:(NSDictionary<NSString*, NSString*>*)handles {
  if (handles == nil) {
    return;
  }

  // CHANGE 1 (native one-shot `mounted` delivery): snapshot BEFORE flipping
  // _hasCreatedUIKitHost below, so this is YES only the very first time this
  // host's handles are ever applied.
  const BOOL firstCreation = !_hasCreatedUIKitHost;
  _hasCreatedUIKitHost = YES;
  NSString* nativeViewHandle = handles[@"nativeViewHandle"];
  NSString* childrenViewHandle = handles[@"childrenViewHandle"];
  NSString* controllerHandle = handles[@"controllerHandle"];
  UIViewController* nextController =
      controllerHandle.length > 0 ? NativeScriptUIViewControllerFromHandle(controllerHandle) : nil;
  UIView* nextNativeView =
      nativeViewHandle.length > 0 ? NativeScriptUIViewFromHandle(nativeViewHandle) : nil;
  const BOOL nativeViewIsDetachedControllerView =
      _detachControllerView && nextController != nil && nextNativeView == nextController.view;

  if (nativeViewIsDetachedControllerView) {
    if (controllerHandle.length > 0) {
      self.controllerHandle = controllerHandle;
    }
    if (childrenViewHandle.length > 0) {
      self.childrenViewHandle = childrenViewHandle;
    }
    if (_attachNativeView && nativeViewHandle.length > 0) {
      self.nativeViewHandle = nativeViewHandle;
    } else if (!_attachNativeView && nativeViewHandle.length > 0) {
      [_nativeViewHandle release];
      _nativeViewHandle = [nativeViewHandle copy];
      [self notifyHostReadyIfNeeded];
    }
  } else {
    if (_attachNativeView && nativeViewHandle.length > 0) {
      self.nativeViewHandle = nativeViewHandle;
    } else if (!_attachNativeView && nativeViewHandle.length > 0) {
      [_nativeViewHandle release];
      _nativeViewHandle = [nativeViewHandle copy];
      [self notifyHostReadyIfNeeded];
    }
    if (childrenViewHandle.length > 0) {
      self.childrenViewHandle = childrenViewHandle;
    }
    if (controllerHandle.length > 0) {
      self.controllerHandle = controllerHandle;
    }
  }
  [self notifyHostReadyIfNeeded];

  if (firstCreation) {
    [self scheduleUIKitHostMountedLifecycleIfNeeded];
  }
}

// CHANGE 1 (native one-shot `mounted` delivery): today the ONLY delivery of
// the "mounted" lifecycle phase is JS-render-initiated -- a successful
// prepareUIKitHostOnUI resolution bumps nativeHostRevision, which flows into
// the mountedRevision native prop, whose setter (-setMountedRevision: above)
// calls -runUIKitHostLifecycle:@"mounted". That crossing runs on the render
// path and, prior to this change, had to keep polling every props revision
// forever (see index.ts prepareUIKitHostOnUI) purely so this one lifecycle
// call would eventually fire once host creation actually succeeded --
// contending for runtimeMutex_ against the Fabric mount that starts a pop.
// Deliver "mounted" from here instead, the moment host creation succeeds,
// with no dependency on any JS render round-trip. JS's own handler stays
// unconditionally safe with BOTH sources still live (this one-shot AND the
// existing render-driven fallback, until Change 2 gates the fallback off):
// phase "mounted" is idempotent there (`if (!host.hasMounted) { ... }`, see
// index.ts), and -setMountedRevision: above already dedupes identical
// revisions, so a later, redundant delivery from the still-live JS polling
// fallback is a harmless no-op.
- (void)scheduleUIKitHostMountedLifecycleIfNeeded {
  if (_hostId.length == 0 || _hasDeliveredMountedLifecycle) {
    return;
  }

  // Snapshot _hostId so the block below can detect this host being reused
  // for a different screen/hostId (-setHostId:) before the dispatch runs --
  // mirrors -scheduleUIKitHostPropsTransactionCommitIfNeeded's token guard,
  // just keyed on hostId-plus-a-bool rather than a monotonic counter. Do NOT
  // reuse _fabricTransactionDeliveryToken here: it is bumped on every
  // transactionCommitted delivery (see
  // -notifyFabricTransactionCommittedWithModifiedChildren:...) and would
  // cancel this pending "mounted" delivery before it ever ran.
  NSString* scheduledHostId = [_hostId copy];
  dispatch_async(dispatch_get_main_queue(), ^{
    if (![self->_hostId isEqualToString:scheduledHostId] ||
        !self->_hasCreatedUIKitHost || self->_hasDeliveredMountedLifecycle) {
      [scheduledHostId release];
      return;
    }

    self->_hasDeliveredMountedLifecycle = YES;
    [self runUIKitHostLifecycle:@"mounted"];
    [scheduledHostId release];
  });
}

- (void)replayFabricTransactionAfterHostCreationIfNeeded {
  if (!_fabricLifecycleCallbacks || !_hasCreatedUIKitHost ||
      _hasReplayedFabricTransactionAfterHostCreation) {
    return;
  }

  UIView* componentView = self.fabricComponentView;
  if ([componentView isKindOfClass:NativeScriptUIViewComponentView.class] &&
      ((NativeScriptUIViewComponentView*)componentView).isApplyingMountingTransaction) {
    // The host was created lazily while this mounting transaction is still
    // applying mutations, so the mounted-children snapshot may be partial
    // (host creation triggers on the FIRST child mount). Skip the replay:
    // mountingTransactionDidMount delivers the complete transaction once.
    NativeScriptFabricDebugLog(@"replayTransactionAfterHost skip-mid-transaction owner=%p debug=%@ hostId=%@",
                               self,
                               _debugName ?: @"",
                               _hostId ?: @"");
    return;
  }

  NSArray<NSDictionary<NSString*, id>*>* mountedChildren = [self fabricMountedChildrenSnapshot];
  NativeScriptFabricDebugLog(@"replayTransactionAfterHost owner=%p debug=%@ hostId=%@ childCount=%lu replayed=%d",
                             self,
                             _debugName ?: @"",
                             _hostId ?: @"",
                             static_cast<unsigned long>(mountedChildren.count),
                             _hasReplayedFabricTransactionAfterHostCreation);
  if (mountedChildren.count == 0) {
    return;
  }

  _hasReplayedFabricTransactionAfterHostCreation = YES;
  [self notifyFabricTransactionCommittedWithModifiedChildren:YES modifiedProps:YES];
}

- (NSString*)fabricMountedChildLifecycleKeyForEvent:(NSDictionary<NSString*, id>*)event {
  NSString* componentViewHandle =
      [event[@"componentViewHandle"] isKindOfClass:NSString.class] ? event[@"componentViewHandle"] : @"";
  NSString* containerViewHandle =
      [event[@"containerViewHandle"] isKindOfClass:NSString.class] ? event[@"containerViewHandle"] : @"";
  NSString* nativeViewHandle =
      [event[@"nativeViewHandle"] isKindOfClass:NSString.class] ? event[@"nativeViewHandle"] : @"";
  NSString* childrenViewHandle =
      [event[@"childrenViewHandle"] isKindOfClass:NSString.class] ? event[@"childrenViewHandle"] : @"";
  NSString* controllerHandle =
      [event[@"controllerHandle"] isKindOfClass:NSString.class] ? event[@"controllerHandle"] : @"";
  NSNumber* index = [event[@"index"] isKindOfClass:NSNumber.class] ? event[@"index"] : @(NSNotFound);

  if (componentViewHandle.length == 0 && containerViewHandle.length == 0 &&
      nativeViewHandle.length == 0 && childrenViewHandle.length == 0 &&
      controllerHandle.length == 0) {
    return nil;
  }

  return [NSString stringWithFormat:@"%@|%@|%@|%@|%@|%@",
                                    componentViewHandle,
                                    containerViewHandle,
                                    nativeViewHandle,
                                    childrenViewHandle,
                                    controllerHandle,
                                    index];
}

- (void)replayFabricMountedChildrenAsMountEventsIfNeeded {
  if (_hostId.length == 0 || !_fabricLifecycleCallbacks || !_hasCreatedUIKitHost) {
    NativeScriptFabricDebugLog(@"replayChildren skip owner=%p debug=%@ hostId=%@ callbacks=%d created=%d",
                               self,
                               _debugName ?: @"",
                               _hostId ?: @"",
                               _fabricLifecycleCallbacks,
                               _hasCreatedUIKitHost);
    return;
  }

  NSArray<NSDictionary<NSString*, id>*>* mountedChildren = [self fabricMountedChildrenSnapshot];
  NativeScriptFabricDebugLog(@"replayChildren begin owner=%p debug=%@ hostId=%@ count=%lu deliveredKeys=%lu",
                             self,
                             _debugName ?: @"",
                             _hostId ?: @"",
                             static_cast<unsigned long>(mountedChildren.count),
                             static_cast<unsigned long>(_fabricMountedChildLifecycleKeys.count));
  for (NSDictionary<NSString*, id>* event in mountedChildren) {
    NSString* childKey = [self fabricMountedChildLifecycleKeyForEvent:event];
    if (childKey.length == 0 || [_fabricMountedChildLifecycleKeys containsObject:childKey]) {
      NativeScriptFabricDebugLog(@"replayChildren ignore owner=%p debug=%@ hostId=%@ key=%@ event={%@}",
                                 self,
                                 _debugName ?: @"",
                                 _hostId ?: @"",
                                 childKey ?: @"",
                                 NativeScriptFabricDebugChildEventSummary(event));
      continue;
    }

    [_fabricMountedChildLifecycleKeys addObject:childKey];
    NativeScriptFabricDebugLog(@"replayChildren mount owner=%p debug=%@ hostId=%@ key=%@ event={%@}",
                               self,
                               _debugName ?: @"",
                               _hostId ?: @"",
                               childKey,
                               NativeScriptFabricDebugChildEventSummary(event));
    [self runUIKitHostLifecycle:@"mountChild" event:event];
  }
}

- (void)mountUIKitHostIfNeeded {
  if (_hostId.length == 0 || _hasCreatedUIKitHost) {
    NativeScriptFabricDebugLog(@"mountUIKitHost skip owner=%p debug=%@ hostId=%@ hasCreated=%d window=%p",
                               self,
                               _debugName ?: @"",
                               _hostId ?: @"",
                               _hasCreatedUIKitHost,
                               self.window);
    return;
  }

  NSString* nativeMountInfoJson = [self nativeMountInfoJson];
  NativeScriptFabricDebugLog(@"mountUIKitHost create owner=%p debug=%@ hostId=%@ window=%p super=%@:%p propsJson=%d nativeInfo=%@",
                             self,
                             _debugName ?: @"",
                             _hostId ?: @"",
                             self.window,
                             self.superview == nil ? @"nil" : NSStringFromClass(self.superview.class),
                             self.superview,
                             _uikitHostPropsJson.length > 0,
                             nativeMountInfoJson ?: @"");
  NSDictionary<NSString*, NSString*>* handles = NativeScriptCreateUIKitHostWithInfo(
      _hostId, _uikitHostPropsJson, nativeMountInfoJson);
  NativeScriptFabricDebugLog(@"mountUIKitHost result owner=%p debug=%@ hostId=%@ handles=%@",
                             self,
                             _debugName ?: @"",
                             _hostId ?: @"",
                             handles ?: @{});
  if (handles != nil) {
    [self applyUIKitHostHandles:handles];
    [self replayFabricMountedChildrenAsMountEventsIfNeeded];
    [self replayFabricTransactionAfterHostCreationIfNeeded];
    return;
  }
}

- (void)runUIKitHostLifecycle:(NSString*)phase transactionJson:(NSString*)transactionJson {
  if (_hostId.length == 0 || phase.length == 0) {
    return;
  }

  [self mountUIKitHostIfNeeded];
  NSDictionary<NSString*, NSString*>* handles =
      transactionJson.length > 0
          ? NativeScriptRunUIKitHostLifecycleWithInfo(_hostId, phase, _uikitHostPropsJson,
                                                      transactionJson, [self nativeMountInfoJson])
          : NativeScriptRunUIKitHostLifecycleWithInfo(_hostId, phase, _uikitHostPropsJson, nil,
                                                      [self nativeMountInfoJson]);
  [self applyUIKitHostHandles:handles];
}

- (void)runUIKitHostLifecycle:(NSString*)phase {
  [self runUIKitHostLifecycle:phase transactionJson:nil];
}

- (void)runUIKitHostLifecycle:(NSString*)phase event:(NSDictionary<NSString*, id>*)event {
  if (event == nil || ![NSJSONSerialization isValidJSONObject:event]) {
    [self runUIKitHostLifecycle:phase transactionJson:nil];
    return;
  }

  NSError* error = nil;
  NSData* eventData = [NSJSONSerialization dataWithJSONObject:event options:0 error:&error];
  if (eventData == nil) {
    [self runUIKitHostLifecycle:phase transactionJson:nil];
    return;
  }

  NSString* eventJson = [[NSString alloc] initWithData:eventData
                                              encoding:NSUTF8StringEncoding];
  [self runUIKitHostLifecycle:phase transactionJson:eventJson];
  [eventJson release];
}

- (NSDictionary<NSString*, NSString*>*)uikitHostHandles {
  return @{
    @"componentViewHandle" : NativeScriptHandleFromNSObject(self.superview),
    @"containerViewHandle" : NativeScriptHandleFromNSObject(self),
    @"nativeViewHandle" :
        _nativeView != nil ? NativeScriptHandleFromNSObject(_nativeView) : (_nativeViewHandle ?: @""),
    @"childrenViewHandle" : NativeScriptHandleFromNSObject(_childrenView),
    @"controllerHandle" : NativeScriptHandleFromNSObject(_viewController),
  };
}

- (NSDictionary<NSString*, id>*)fabricChildEventForComponentView:(UIView*)componentView
                                              childContainerView:(UIView*)childContainerView
                                                           index:(NSInteger)index {
  NSDictionary<NSString*, NSString*>* ownerHandles = [self uikitHostHandles];
  NSDictionary<NSString*, NSString*>* childHandles = @{};
  if ([childContainerView isKindOfClass:NativeScriptUIView.class]) {
    childHandles = [static_cast<NativeScriptUIView*>(childContainerView) uikitHostHandles];
  }

  return @{
    @"index" : @(index),
    @"ownerComponentViewHandle" : NativeScriptHandleFromNSObject(self.superview),
    @"ownerContainerViewHandle" : NativeScriptHandleFromNSObject(self),
    @"ownerNativeViewHandle" : ownerHandles[@"nativeViewHandle"] ?: @"",
    @"ownerChildrenViewHandle" : ownerHandles[@"childrenViewHandle"] ?: @"",
    @"ownerControllerHandle" : ownerHandles[@"controllerHandle"] ?: @"",
    @"componentViewHandle" : NativeScriptHandleFromNSObject(componentView),
    @"containerViewHandle" : NativeScriptHandleFromNSObject(childContainerView),
    @"nativeViewHandle" : childHandles[@"nativeViewHandle"] ?: @"",
    @"childrenViewHandle" : childHandles[@"childrenViewHandle"] ?: @"",
    @"controllerHandle" : childHandles[@"controllerHandle"] ?: @"",
  };
}

- (void)notifyFabricMountingTransactionWillMount {
  [self runUIKitHostLifecycle:@"mountingTransactionWillMount"];
}

- (void)notifyFabricChildMounted:(UIView*)componentView
               childContainerView:(UIView*)childContainerView
                            index:(NSInteger)index {
  NSDictionary<NSString*, id>* event = [self fabricChildEventForComponentView:componentView
                                                           childContainerView:childContainerView
                                                                        index:index];
  NSString* childKey = [self fabricMountedChildLifecycleKeyForEvent:event];
  NativeScriptFabricDebugLog(@"notifyChildMounted owner=%p debug=%@ hostId=%@ created=%d key=%@ event={%@}",
                             self,
                             _debugName ?: @"",
                             _hostId ?: @"",
                             _hasCreatedUIKitHost,
                             childKey ?: @"",
                             NativeScriptFabricDebugChildEventSummary(event));
  if (_hostId.length > 0 && childKey.length > 0) {
    [_fabricMountedChildLifecycleKeys addObject:childKey];
  }
  [self runUIKitHostLifecycle:@"mountChild" event:event];
  if (!_hasCreatedUIKitHost) {
    [_fabricMountedChildLifecycleKeys removeObject:childKey];
  }
}

- (void)notifyFabricChildUnmounted:(UIView*)componentView
                 childContainerView:(UIView*)childContainerView
                              index:(NSInteger)index {
  NSDictionary<NSString*, id>* event = [self fabricChildEventForComponentView:componentView
                                                           childContainerView:childContainerView
                                                                        index:index];
  NSString* childKey = [self fabricMountedChildLifecycleKeyForEvent:event];
  [self runUIKitHostLifecycle:@"unmountChild" event:event];
  [_fabricMountedChildLifecycleKeys removeObject:childKey];
}

- (NSArray<NSDictionary<NSString*, id>*>*)fabricMountedChildrenSnapshot {
  NSMutableArray<UIView*>* mountedChildren = [NSMutableArray array];
  void (^appendChildren)(NSArray<UIView*>*) = ^(NSArray<UIView*>* children) {
    for (UIView* child in children) {
      if (child == nil || [mountedChildren containsObject:child]) {
        continue;
      }
      [mountedChildren addObject:child];
    }
  };

  appendChildren(_fabricMountedChildComponentViews);
  if (_collectChildren) {
    appendChildren(_collectedChildComponentViews);
    appendChildren(NativeScriptRelocatedFabricChildrenForSuperview(_childrenView ?: self));
    if (_childrenView != nil) {
      appendChildren(_childrenView.subviews);
    }
    appendChildren(self.subviews);
  } else if (_childrenView != nil) {
    appendChildren(_childrenView.subviews);
    appendChildren(NativeScriptRelocatedFabricChildrenForSuperview(_childrenView));
    if (_childrenView != self && NativeScriptViewIsDescendantOfView(self, _childrenView)) {
      appendChildren(self.subviews);
    }
  } else {
    appendChildren(self.subviews);
    appendChildren(NativeScriptRelocatedFabricChildrenForSuperview(self));
  }

  NSMutableArray<NSDictionary<NSString*, id>*>* snapshot =
      [NSMutableArray arrayWithCapacity:mountedChildren.count];
  NSInteger childIndex = 0;

  for (UIView* child in mountedChildren) {
    if (child == nil || child == self || child == _nativeView || child == _childrenView ||
        child == _detachedTouchSentinel) {
      continue;
    }

    [snapshot addObject:[self
                            fabricChildEventForComponentView:child
                                          childContainerView:
                                              NativeScriptCurrentContainerViewForComponentView(child)
                                                       index:childIndex]];
    childIndex += 1;
  }

  return snapshot;
}

- (void)setChildrenView:(UIView*)childrenView {
  if (_childrenView == childrenView) {
    return;
  }

  [self setNeedsUIKitHostRefreshAfterNativeAttachment];
  [self detachDetachedChildrenTouchHandler];
  _detachedTouchSentinel.owner = nil;
  [_detachedTouchSentinel removeFromSuperview];
  [_detachedTouchSentinel release];
  _detachedTouchSentinel = nil;
  [self invalidateDetachedChildrenLayoutSnapshot];
  [self invalidateDetachedChildrenDisplaySnapshot];
  [self invalidateHostReadySnapshot];
  if (NativeScriptDetachedChildrenOwner(_childrenView) == self) {
    NativeScriptSetDetachedChildrenOwner(_childrenView, nil);
  }
  [_childrenView release];
  _childrenView = [childrenView retain];
  NativeScriptSetDetachedChildrenOwner(_childrenView, self);
  [self moveReactSubviewsToChildrenView];
  if (_mountChildrenDirectlyToChildrenView) {
    if (_layoutDirectChildrenToChildrenViewBounds) {
      NativeScriptLayoutHostedSubviewChain(_childrenView, _detachedTouchSentinel, 0);
    }
    [self invalidateHostReadySnapshot];
    [self notifyHostReadyIfNeeded];
    return;
  }
  [self invalidateDetachedChildrenDisplay];
  [self installDetachedChildrenTouchSentinelIfNeeded];
  [self attachDetachedChildrenTouchHandlerIfNeeded];
  [self notifyHostReadyIfNeeded];
}

- (void)deactivateNativeViewHostConstraints {
  if (_nativeViewHostConstraints == nil) {
    return;
  }

  [NSLayoutConstraint deactivateConstraints:_nativeViewHostConstraints];
  [_nativeViewHostConstraints release];
  _nativeViewHostConstraints = nil;
}

- (void)applyNativeViewLayoutMode {
  if (_nativeView == nil) {
    [self deactivateNativeViewHostConstraints];
    return;
  }

  const BOOL nativeViewIsOwnedByHost = _nativeView.superview == self;
  if (!nativeViewIsOwnedByHost) {
    [self deactivateNativeViewHostConstraints];
    return;
  }

  if (!_pinNativeViewToHost) {
    [self deactivateNativeViewHostConstraints];
    _nativeView.translatesAutoresizingMaskIntoConstraints = YES;
    if (!CGRectEqualToRect(_nativeView.frame, self.bounds)) {
      _nativeView.frame = self.bounds;
    }
    _nativeView.autoresizingMask =
        UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    return;
  }

  if (!CGRectEqualToRect(_nativeView.frame, self.bounds)) {
    _nativeView.frame = self.bounds;
  }

  if (_nativeViewHostConstraints != nil) {
    BOOL hasInactiveConstraint = NO;
    for (NSLayoutConstraint* constraint in _nativeViewHostConstraints) {
      if (!constraint.active) {
        hasInactiveConstraint = YES;
        break;
      }
    }
    if (hasInactiveConstraint) {
      [NSLayoutConstraint activateConstraints:_nativeViewHostConstraints];
    }
    return;
  }

  _nativeView.translatesAutoresizingMaskIntoConstraints = NO;
  _nativeViewHostConstraints = [[NSArray alloc] initWithObjects:
      [_nativeView.topAnchor constraintEqualToAnchor:self.topAnchor],
      [_nativeView.bottomAnchor constraintEqualToAnchor:self.bottomAnchor],
      [_nativeView.leadingAnchor constraintEqualToAnchor:self.leadingAnchor],
      [_nativeView.trailingAnchor constraintEqualToAnchor:self.trailingAnchor],
      nil];
  [NSLayoutConstraint activateConstraints:_nativeViewHostConstraints];
}

- (void)layoutHostedViewControllerViewIfNeeded {
  if (_viewController == nil || _nativeView != _viewController.view ||
      _nativeView.superview != self) {
    return;
  }

  [self applyNativeViewLayoutMode];
  [_nativeView setNeedsLayout];
  [_nativeView layoutIfNeeded];
}

- (void)setPinNativeViewToHost:(BOOL)pinNativeViewToHost {
  if (_pinNativeViewToHost == pinNativeViewToHost) {
    return;
  }

  _pinNativeViewToHost = pinNativeViewToHost;
  [self applyNativeViewLayoutMode];
  [self layoutHostedViewControllerViewIfNeeded];
  [self setNeedsLayout];
}

- (void)setDetachedChildrenContentOffsetX:(CGFloat)detachedChildrenContentOffsetX {
  if (_detachedChildrenContentOffsetX == detachedChildrenContentOffsetX) {
    return;
  }

  _detachedChildrenContentOffsetX = detachedChildrenContentOffsetX;
  [self invalidateDetachedChildrenLayoutSnapshot];
  [self invalidateDetachedChildrenDisplaySnapshot];
  [self setNeedsLayout];
}

- (void)setDetachedChildrenContentOffsetY:(CGFloat)detachedChildrenContentOffsetY {
  if (_detachedChildrenContentOffsetY == detachedChildrenContentOffsetY) {
    return;
  }

  _detachedChildrenContentOffsetY = detachedChildrenContentOffsetY;
  [self invalidateDetachedChildrenLayoutSnapshot];
  [self invalidateDetachedChildrenDisplaySnapshot];
  [self setNeedsLayout];
}

- (void)setExternalDetachedChildrenOwner:(BOOL)externalDetachedChildrenOwner {
  if (_externalDetachedChildrenOwner == externalDetachedChildrenOwner) {
    return;
  }

  _externalDetachedChildrenOwner = externalDetachedChildrenOwner;
  [self invalidateHostReadySnapshot];
  [self setNeedsLayout];
}

- (void)setMountChildrenDirectlyToChildrenView:(BOOL)mountChildrenDirectlyToChildrenView {
  if (_mountChildrenDirectlyToChildrenView == mountChildrenDirectlyToChildrenView) {
    return;
  }

  _mountChildrenDirectlyToChildrenView = mountChildrenDirectlyToChildrenView;
  [self detachDetachedChildrenTouchHandler];
  _detachedTouchSentinel.owner = nil;
  [_detachedTouchSentinel removeFromSuperview];
  [_detachedTouchSentinel release];
  _detachedTouchSentinel = nil;
  [self invalidateDetachedChildrenLayoutSnapshot];
  [self invalidateDetachedChildrenDisplaySnapshot];
  [self invalidateHostReadySnapshot];
  [self moveReactSubviewsToChildrenView];
  [self refreshDetachedChildrenHost];
  [self setNeedsLayout];
  [self notifyHostReadyIfNeeded];
}

- (void)setLayoutDirectChildrenToChildrenViewBounds:(BOOL)layoutDirectChildrenToChildrenViewBounds {
  if (_layoutDirectChildrenToChildrenViewBounds == layoutDirectChildrenToChildrenViewBounds) {
    return;
  }

  _layoutDirectChildrenToChildrenViewBounds = layoutDirectChildrenToChildrenViewBounds;
  [self invalidateDetachedChildrenLayoutSnapshot];
  [self setNeedsLayout];
  [self refreshDetachedChildrenHost];
}

- (void)setNativeView:(UIView*)nativeView {
  if (_nativeView == nativeView) {
    return;
  }

  [self setNeedsUIKitHostRefreshAfterNativeAttachment];
  const BOOL nextNativeViewIsDetachedControllerView =
      _detachControllerView && _viewController != nil && nativeView == _viewController.view;
  if (NativeScriptHostedViewOwner(_nativeView) == self) {
    NativeScriptSetHostedViewOwner(_nativeView, nil);
  }
  [self deactivateNativeViewHostConstraints];
  if (!(_detachControllerView && _viewController != nil && _nativeView == _viewController.view)) {
    [_nativeView removeFromSuperview];
  }
  [_nativeView release];
  _nativeView = nil;

  if (nativeView == nil) {
    return;
  }

  _nativeView = [nativeView retain];
  NativeScriptSetHostedViewOwner(_nativeView, self);
  const BOOL nextNativeViewIsExternallyWindowOwned =
      nextNativeViewIsDetachedControllerView && nativeView.superview != nil &&
      nativeView.superview != self && nativeView.window != nil;
  if (nextNativeViewIsExternallyWindowOwned) {
    [self moveReactSubviewsToChildrenView];
    [self refreshDetachedChildrenHost];
    [_nativeView setNeedsDisplay];
    [_nativeView.layer setNeedsDisplay];
    [self setNeedsLayout];
    [self notifyHostReadyIfNeeded];
    [self refreshUIKitHostAfterNativeAttachment];
    return;
  }
  [_nativeView removeFromSuperview];
  [super insertSubview:_nativeView atIndex:0];
  [self applyNativeViewLayoutMode];
  [self moveReactSubviewsToChildrenView];
  [_nativeView setNeedsDisplay];
  [_nativeView.layer setNeedsDisplay];
  [self setNeedsLayout];
  [self notifyHostReadyIfNeeded];
  [self refreshUIKitHostAfterNativeAttachment];
}

// Upstream react-native-screens hosting shape: the Fabric-managed host view
// IS the controller's view, so UIKit containment (push/pop/present) moves the
// mounted React children wholesale and no child reparenting, readiness
// certification, or repair walking is required. The controller retains its
// view (this container) while the container retains the controller; the cycle
// is broken by restoreAdoptedControllerViewIfNeeded from prepareForRecycle,
// controller replacement, or the adopt flag turning off.
- (void)adoptAsControllerViewIfNeeded {
  if (!_adoptHostViewAsControllerView || _viewController == nil) {
    return;
  }
  if (_viewController.viewLoaded && _viewController.view == self) {
    return;
  }
  _viewController.view = self;
  // If the controller is already the visible top of a navigation controller,
  // UIKit captured its PREVIOUS view (e.g. a throwaway created before adoption
  // completed, as happens for the root installed via setViewControllers). Just
  // reassigning controller.view does not swap what UIKit displays, so the
  // adopted container stays orphaned/blank. Force a re-display by re-setting
  // the navigation stack. Gated on window==nil so it runs only until UIKit
  // actually displays us (then this is a no-op).
  UINavigationController* nav = _viewController.navigationController;
  if (nav != nil && nav.topViewController == _viewController &&
      self.window == nil && nav.view.window != nil) {
    NSArray* vcs = nav.viewControllers;
    [nav setViewControllers:vcs animated:NO];
  }
  [self notifyHostReadyIfNeeded];
}

- (void)restoreAdoptedControllerViewIfNeeded {
  if (_viewController == nil || !_viewController.viewLoaded ||
      _viewController.view != self) {
    return;
  }
  UIView* replacement = [[UIView alloc] initWithFrame:self.frame];
  replacement.autoresizingMask =
      UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
  _viewController.view = replacement;
  [replacement release];
}

// Once a UINavigationController owns the adopted controller, UIKit (not
// Fabric) is responsible for sizing this view as part of push/pop
// transitions and safe-area/navigation-bar layout. Fabric must stop forcing
// its own frame in that state or the two layout systems fight each other.
//
// BUT: only defer to UIKit once UIKit has ACTUALLY sized this container to a
// positive-size frame. A root screen set via -setViewControllers: (no push
// transition to lay it out) would otherwise stay 0x0 forever and render blank,
// because navigationController != nil the instant it becomes the root. While
// the frame is still empty, let Fabric seed the size from its Yoga bounds;
// once UIKit owns a real frame we stop fighting it (push/pop transitions and
// nav-bar/safe-area layout all leave a positive frame, so this only unblocks
// the initial cold-size case).
- (BOOL)isAdoptedControllerViewOwnedByNavigationController {
  return _adoptHostViewAsControllerView && _viewController != nil &&
         _viewController.navigationController != nil &&
         !CGRectIsEmpty(self.frame);
}

// PURE predicate (no side effects — unlike shouldDeferContainerFrameToNavigationController,
// and without isAdoptedControllerViewOwnedByNavigationController's empty-frame
// guard). RNS parity (RNSScreen.mm updateLayoutMetrics ~1348-1371): once a
// UINavigationController owns the adopted controller, UIKit — not Yoga — is
// authoritative for this container's frame, from the instant adoption+nav
// membership are both true (not just once UIKit has produced a non-empty
// frame). Used by the Fabric ComponentView to decide whether to apply Yoga's
// resolved layout metrics to the view at all.
- (BOOL)containerFrameIsUIKitDrivenByNavigationController {
  return _adoptHostViewAsControllerView && _viewController != nil &&
         _viewController.navigationController != nil;
}

// Returns YES if the Fabric host should stop applying its own frame (UIKit
// owns it). When the adopted controller is under a navigation controller but
// UIKit has not sized us yet — e.g. the root installed via
// setViewControllers:animated:NO, which gets no push-transition layout pass —
// seed the frame from the navigation controller's content bounds so the
// screen is never left 0x0/blank; UIKit refines it on its next layout.
- (BOOL)shouldDeferContainerFrameToNavigationController {
  if (!_adoptHostViewAsControllerView || _viewController == nil) {
    return NO;
  }
  // Self-heal: this container is marked adopted and owns a controller, but the
  // controller's view is no longer us (a restore swapped in a throwaway view,
  // or the controller was re-driven). Re-assert adoption so the controller
  // displays our real (content-bearing) container instead of an empty view.
  if (_viewController.isViewLoaded && _viewController.view != self) {
    [self adoptAsControllerViewIfNeeded];
    [self setNeedsLayout];
  }
  if (_viewController.navigationController == nil) {
    return NO;
  }
  if (CGRectIsEmpty(self.frame)) {
    UIView* navView = _viewController.navigationController.view;
    if (navView != nil && !CGRectIsEmpty(navView.bounds)) {
      self.frame = navView.bounds;
      self.autoresizingMask =
          UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
      [self setNeedsLayout];
    }
  }
  // NOTE: do NOT push the adopted size feedback from here. This predicate is
  // reachable from pointInside:/hitTest: (touch delivery), and the size
  // feedback push now commits shadow-tree state SYNCHRONOUSLY
  // (unstable_Immediate) to match RNSScreen -updateBounds; firing that during
  // touch delivery would run a Fabric commit mid-gesture. RNS only pushes its
  // size feedback from -layoutSubviews (see updateBounds's caller). The
  // empty-frame seeding above already calls [self setNeedsLayout], so
  // -layoutSubviews will perform the push on this container's next layout
  // pass regardless.
  return YES;
}

- (void)setAdoptHostViewAsControllerView:(BOOL)adoptHostViewAsControllerView {
  if (_adoptHostViewAsControllerView == adoptHostViewAsControllerView) {
    return;
  }
  if (!adoptHostViewAsControllerView) {
    [self restoreAdoptedControllerViewIfNeeded];
  }
  _adoptHostViewAsControllerView = adoptHostViewAsControllerView;
  if (adoptHostViewAsControllerView) {
    [self adoptAsControllerViewIfNeeded];
  }
}

- (void)setViewController:(UIViewController*)viewController {
  if (_viewController == viewController) {
    return;
  }

  [self setNeedsUIKitHostRefreshAfterNativeAttachment];
  [self restoreAdoptedControllerViewIfNeeded];
  [self detachViewControllerIfOwnedByHost];
  [_viewController release];
  _viewController = [viewController retain];
  _attachedViewControllerParent = nil;
  if (_adoptHostViewAsControllerView) {
    // Adoption replaces the internal containment machinery: the container is
    // the controller's view, so hosting the controller view inside the
    // container (attachNativeView/detachControllerView) does not apply.
    [self adoptAsControllerViewIfNeeded];
    [self setNeedsLayout];
    [self notifyHostReadyIfNeeded];
    return;
  }
  if (_detachControllerFromParent) {
    [self detachViewController];
    _attachedViewControllerParent = nil;
  }
  if (_detachControllerView) {
    if (_viewController != nil && _nativeView == _viewController.view) {
      [self setNativeView:nil];
    }
    return;
  }
  if (_attachNativeView && _nativeViewHandle.length == 0) {
    [self setNativeView:_viewController.view];
  }
  // Defer containment until didMove/layout/update refreshes so all host props,
  // especially detachControllerFromParent, have been applied for this commit.
  [self layoutHostedViewControllerViewIfNeeded];
  [self setNeedsLayout];
  [self notifyHostReadyIfNeeded];
}

- (void)attachViewControllerIfPossible {
  if (!_attachControllerToParent || _detachControllerFromParent || _detachControllerView ||
      _viewController == nil || _viewController.presentingViewController != nil ||
      _viewController.isBeingPresented || _viewController.isBeingDismissed || self.window == nil) {
    return;
  }

  UIViewController* parent = NativeScriptNearestViewController(self, _viewController);
  UIViewController* rootController = self.window.rootViewController;
  if (parent == nil || parent == _viewController) {
    return;
  }

  if (_viewController.parentViewController == parent &&
      (rootController == nil ||
       NativeScriptControllerHierarchyContainsController(rootController, _viewController))) {
    return;
  }

  if (_viewController.parentViewController != nil) {
    if (_attachedViewControllerParent == nil ||
        _viewController.parentViewController != _attachedViewControllerParent) {
      return;
    }
    [self detachViewControllerIfOwnedByHost];
    if (_viewController.parentViewController != nil) {
      return;
    }
  }

  UIView* hostedViewToReinsert = nil;
  NSUInteger hostedViewIndex = NSNotFound;
  if (_nativeView.superview == self &&
      NativeScriptHostedViewContainsControllerView(_nativeView, _viewController)) {
    hostedViewToReinsert = [_nativeView retain];
    hostedViewIndex = [self.subviews indexOfObject:hostedViewToReinsert];
    [self deactivateNativeViewHostConstraints];
    [hostedViewToReinsert removeFromSuperview];
  }

  const BOOL shouldForwardAppearance =
      hostedViewToReinsert == nil && NativeScriptShouldForwardControllerAppearance(_viewController);
  if (shouldForwardAppearance) {
    [_viewController beginAppearanceTransition:YES animated:NO];
  }

  [parent addChildViewController:_viewController];
  _attachedViewControllerParent = parent;
  if (hostedViewToReinsert != nil) {
    NSUInteger targetIndex =
        hostedViewIndex == NSNotFound ? 0 : MIN(hostedViewIndex, self.subviews.count);
    [super insertSubview:hostedViewToReinsert atIndex:targetIndex];
  }
  [self layoutHostedViewControllerViewIfNeeded];
  [_viewController didMoveToParentViewController:parent];
  [self layoutHostedViewControllerViewIfNeeded];

  if (shouldForwardAppearance) {
    [_viewController endAppearanceTransition];
  }
  [hostedViewToReinsert release];
}

- (void)detachViewController {
  if (_viewController == nil || _viewController.parentViewController == nil) {
    return;
  }

  UIView* hostedViewToReinsert = nil;
  NSUInteger hostedViewIndex = NSNotFound;
  if (_nativeView.superview == self &&
      NativeScriptHostedViewContainsControllerView(_nativeView, _viewController)) {
    hostedViewToReinsert = [_nativeView retain];
    hostedViewIndex = [self.subviews indexOfObject:hostedViewToReinsert];
  }

  const BOOL shouldForwardAppearance =
      hostedViewToReinsert == nil && NativeScriptShouldForwardControllerAppearance(_viewController);
  if (shouldForwardAppearance) {
    [_viewController beginAppearanceTransition:NO animated:NO];
  }

  [_viewController willMoveToParentViewController:nil];
  [hostedViewToReinsert removeFromSuperview];
  [_viewController removeFromParentViewController];
  if (hostedViewToReinsert != nil) {
    NSUInteger targetIndex =
        hostedViewIndex == NSNotFound ? 0 : MIN(hostedViewIndex, self.subviews.count);
    [super insertSubview:hostedViewToReinsert atIndex:targetIndex];
  }

  if (shouldForwardAppearance) {
    [_viewController endAppearanceTransition];
  }
  [hostedViewToReinsert release];
}

- (void)detachViewControllerIfOwnedByHost {
  if (_viewController == nil || _attachedViewControllerParent == nil) {
    return;
  }

  if (_viewController.parentViewController != _attachedViewControllerParent) {
    _attachedViewControllerParent = nil;
    return;
  }

  [self detachViewController];
  _attachedViewControllerParent = nil;
}

- (void)dismissViewControllerPresentationIfNeeded {
  if (_viewController == nil) {
    return;
  }

  UIViewController* presentedController = _viewController.presentedViewController;
  if (presentedController != nil && !presentedController.isBeingDismissed) {
    [_viewController dismissViewControllerAnimated:NO completion:nil];
  }

  UIViewController* presentationController = _viewController;
  UIViewController* navigationController = _viewController.navigationController;
  if (navigationController != nil && navigationController.presentingViewController != nil) {
    presentationController = navigationController;
  }

  if (presentationController.presentingViewController != nil &&
      !presentationController.isBeingDismissed) {
    [presentationController dismissViewControllerAnimated:NO completion:nil];
  }
}

- (void)moveReactSubviewsToChildrenView {
  if (_childrenView == nil) {
    return;
  }

  NSArray<UIView*>* subviews = [self.subviews copy];
  for (UIView* subview in subviews) {
    if (subview == _nativeView || subview == _childrenView) {
      continue;
    }
    if (_collectChildren) {
      [subview removeFromSuperview];
      if (![_collectedChildComponentViews containsObject:subview]) {
        [_collectedChildComponentViews addObject:subview];
      }
      continue;
    }
    [_childrenView addSubview:subview];
  }
  [subviews release];
  if (_collectChildren) {
    [self detachDetachedChildrenTouchHandler];
    [self invalidateDetachedChildrenLayoutSnapshot];
    [self invalidateDetachedChildrenDisplaySnapshot];
    [self invalidateHostReadySnapshot];
    [self refreshCollectedChildrenHostIfNeeded];
    return;
  }
  if (_mountChildrenDirectlyToChildrenView) {
    if (_layoutDirectChildrenToChildrenViewBounds) {
      NativeScriptLayoutHostedSubviewChain(_childrenView, _detachedTouchSentinel, 0);
    }
    [self detachDetachedChildrenTouchHandler];
    [self invalidateDetachedChildrenLayoutSnapshot];
    [self invalidateDetachedChildrenDisplaySnapshot];
    [self invalidateHostReadySnapshot];
    [self notifyHostReadyIfNeeded];
    return;
  }
  [self layoutDetachedChildrenViewSubviewsIfNeeded];
  [self invalidateDetachedChildrenDisplay];
  [self installDetachedChildrenTouchSentinelIfNeeded];
  [self attachDetachedChildrenTouchHandlerIfNeeded];
  [self notifyHostReadyIfNeeded];
}

- (void)insertSubview:(UIView*)view atIndex:(NSInteger)index {
  if (_childrenView != nil && view != _nativeView && view != _childrenView) {
    if (_collectChildren) {
      if (view.superview != nil) {
        [view removeFromSuperview];
      }
      if (![_collectedChildComponentViews containsObject:view]) {
        NSUInteger targetIndex =
            MIN(static_cast<NSUInteger>(MAX(index, 0)), _collectedChildComponentViews.count);
        [_collectedChildComponentViews insertObject:view atIndex:targetIndex];
      }
      [self detachDetachedChildrenTouchHandler];
      [self invalidateDetachedChildrenLayoutSnapshot];
      [self invalidateDetachedChildrenDisplaySnapshot];
      [self invalidateHostReadySnapshot];
      [self refreshCollectedChildrenHostIfNeeded];
      return;
    }

    NSUInteger targetIndex =
        MIN(static_cast<NSUInteger>(MAX(index, 0)), _childrenView.subviews.count);
    [_childrenView insertSubview:view atIndex:targetIndex];
    if (_mountChildrenDirectlyToChildrenView) {
      if (_layoutDirectChildrenToChildrenViewBounds) {
        NativeScriptLayoutHostedSubviewChain(_childrenView, _detachedTouchSentinel, 0);
      }
      [self detachDetachedChildrenTouchHandler];
      [self invalidateDetachedChildrenLayoutSnapshot];
      [self invalidateDetachedChildrenDisplaySnapshot];
      [self invalidateHostReadySnapshot];
      [self notifyHostReadyIfNeeded];
      return;
    }
    [self layoutDetachedChildrenViewSubviewsIfNeeded];
    [self invalidateDetachedChildrenDisplay];
    [self installDetachedChildrenTouchSentinelIfNeeded];
    [self attachDetachedChildrenTouchHandlerIfNeeded];
    [self notifyHostReadyIfNeeded];
    return;
  }
  [super insertSubview:view atIndex:index];
  [self notifyHostReadyIfNeeded];
}

- (NSArray<UIView*>*)collectedChildComponentViews {
  return _collectedChildComponentViews;
}

- (void)recordFabricChildComponentViewMounted:(UIView*)view index:(NSInteger)index {
  if (view == nil || view == self || view == _nativeView || view == _childrenView ||
      view == _detachedTouchSentinel) {
    return;
  }

  if ([_fabricMountedChildComponentViews containsObject:view]) {
    [_fabricMountedChildComponentViews removeObject:view];
  }

  NSUInteger targetIndex =
      MIN(static_cast<NSUInteger>(MAX(index, 0)), _fabricMountedChildComponentViews.count);
  [_fabricMountedChildComponentViews insertObject:view atIndex:targetIndex];
}

- (void)recordFabricChildComponentViewUnmounted:(UIView*)view {
  if (view == nil) {
    return;
  }

  [_fabricMountedChildComponentViews removeObject:view];
}

- (void)clearFabricChildComponentViewRecords {
  [_fabricMountedChildComponentViews removeAllObjects];
}

- (void)clearFabricRelocationRecordForUnmountedChildComponentView:(UIView*)view {
  NativeScriptClearFabricRelocationRecord(view);
}

- (void)markFabricChildComponentViewTagsPendingUnmountForCurrentTransaction:
    (NSSet<NSNumber*>*)tags {
  if (tags.count == 0) {
    return;
  }
  if (_fabricPendingUnmountTagsForCurrentTransaction == nil) {
    _fabricPendingUnmountTagsForCurrentTransaction = [NSMutableSet new];
  }
  [_fabricPendingUnmountTagsForCurrentTransaction unionSet:tags];
}

- (void)clearFabricChildComponentViewTagsPendingUnmountForCurrentTransaction {
  [_fabricPendingUnmountTagsForCurrentTransaction removeAllObjects];
}

- (void)restoreFabricChildComponentViewsForUnmount:(UIView*)view index:(NSInteger)index {
  UIView* expectedSuperview = nil;
  if (_collectChildren) {
    expectedSuperview = _childrenView ?: self;
  } else if (view != nil && view.superview == _childrenView) {
    expectedSuperview = _childrenView;
  } else {
    expectedSuperview = self;
  }

  NativeScriptRestoreFabricChildrenForUnmount(expectedSuperview, view, index,
                                              _fabricPendingUnmountTagsForCurrentTransaction,
                                              _fabricMountedChildComponentViews);
}

- (BOOL)unmountCollectedChildComponentView:(UIView*)view {
  if (view == nil || ![_collectedChildComponentViews containsObject:view]) {
    return NO;
  }

  [view retain];
  [_collectedChildComponentViews removeObject:view];
  [view removeFromSuperview];
  NativeScriptClearFabricRelocationRecord(view);
  [view release];
  [self invalidateHostReadySnapshot];
  [self invalidateDetachedChildrenDisplaySnapshot];
  [self refreshCollectedChildrenHostIfNeeded];
  return YES;
}

- (void)refreshCollectedChildrenHostIfNeeded {
  if (_collectChildren && _hostId.length > 0) {
    [self runUIKitHostLifecycle:@"refresh"
                transactionJson:[self fabricTransactionJsonWithModifiedChildren:YES
                                                                  modifiedProps:NO]];
  }
}

- (void)layoutDetachedChildrenViewSubviewsIfNeeded {
  [self layoutDetachedChildrenViewSubviewsAndReturnMutation];
}

- (void)notifyFabricTransactionCommitted {
  [self notifyFabricTransactionCommittedWithModifiedChildren:NO modifiedProps:NO];
}

- (NSString*)fabricTransactionJsonWithModifiedChildren:(BOOL)hasModifiedChildren
                                         modifiedProps:(BOOL)hasModifiedProps {
  return [self fabricTransactionJsonWithModifiedChildren:hasModifiedChildren
                                           modifiedProps:hasModifiedProps
                                               mutations:nil];
}

- (NSString*)fabricTransactionJsonWithModifiedChildren:(BOOL)hasModifiedChildren
                                         modifiedProps:(BOOL)hasModifiedProps
                                             mutations:(NSArray<NSDictionary<NSString*, id>*>*)mutations {
  NSDictionary<NSString*, id>* transaction = @{
    @"children" : [self fabricMountedChildrenSnapshot],
    @"hasModifiedChildren" : @(hasModifiedChildren),
    @"hasModifiedProps" : @(hasModifiedProps),
    @"mutations" : mutations ?: @[],
    // SEAM D STAGE 0 follow-up: surface the shared delivery token (bumped
    // exactly-once per ACTUAL delivery by the notifyFabricTransactionCommitted
    // funnel below) so JS-side host consumers can derive an O(1)
    // per-host commit-sequence predicate instead of re-deriving readiness
    // by walking view state on every call.
    @"deliveryToken" : @(_fabricTransactionDeliveryToken),
  };
  NSError* error = nil;
  NSData* transactionData =
      [NSJSONSerialization dataWithJSONObject:transaction options:0 error:&error];
  NSString* transactionJson = transactionData != nil
      ? [[[NSString alloc] initWithData:transactionData encoding:NSUTF8StringEncoding] autorelease]
      : nil;
  return transactionJson;
}

- (void)notifyFabricTransactionCommittedWithModifiedChildren:(BOOL)hasModifiedChildren
                                               modifiedProps:(BOOL)hasModifiedProps {
  [self notifyFabricTransactionCommittedWithModifiedChildren:hasModifiedChildren
                                               modifiedProps:hasModifiedProps
                                                   mutations:nil];
}

- (void)notifyFabricTransactionCommittedWithModifiedChildren:(BOOL)hasModifiedChildren
                                               modifiedProps:(BOOL)hasModifiedProps
                                                   mutations:(NSArray<NSDictionary<NSString*, id>*>*)mutations {
  // SEAM D STAGE 0: this is the single funnel every producer of a
  // `transactionCommitted` delivery converges on (ComponentView's
  // mountingTransactionDidMount sync/async paths, its mount-op fallback, this
  // class's props-revision path, the host-creation replay, and the
  // no-mutation callers below). Bump the shared delivery token on every
  // ACTUAL delivery so any other producer's still-pending deferred schedule
  // (captured via -advanceFabricTransactionDeliveryToken before this one
  // fired) observes a mismatch and no-ops instead of redelivering the same
  // commit a second time.
  _fabricTransactionDeliveryToken += 1;
  NSArray<NSDictionary<NSString*, id>*>* mountedChildren = [self fabricMountedChildrenSnapshot];
  NativeScriptFabricDebugLog(@"notifyTransaction owner=%p debug=%@ hostId=%@ created=%d modifiedChildren=%d modifiedProps=%d childCount=%lu",
                             self,
                             _debugName ?: @"",
                             _hostId ?: @"",
                             _hasCreatedUIKitHost,
                             hasModifiedChildren,
                             hasModifiedProps,
                             static_cast<unsigned long>(mountedChildren.count));
  for (NSDictionary<NSString*, id>* event in mountedChildren) {
    NativeScriptFabricDebugLog(@"notifyTransaction child owner=%p debug=%@ hostId=%@ event={%@}",
                               self,
                               _debugName ?: @"",
                               _hostId ?: @"",
                               NativeScriptFabricDebugChildEventSummary(event));
  }
  NSString* transactionJson =
      [self fabricTransactionJsonWithModifiedChildren:hasModifiedChildren
                                        modifiedProps:hasModifiedProps
                                            mutations:mutations];
  [self runUIKitHostLifecycle:@"transactionCommitted" transactionJson:transactionJson];
}

- (BOOL)layoutDetachedChildrenViewSubviewsAndReturnMutation {
  if (_childrenView == nil || _mountChildrenDirectlyToChildrenView) {
    return NO;
  }

  NSString* layoutKey =
      NativeScriptDetachedChildrenLayoutSnapshotKey(_childrenView, _detachedTouchSentinel);
  if ([_lastDetachedChildrenLayoutKey isEqualToString:layoutKey]) {
    return NO;
  }

  BOOL didMutate = NO;
  CGRect bounds = _childrenView.bounds;
  const CGPoint contentOffset =
      CGPointMake(_detachedChildrenContentOffsetX, _detachedChildrenContentOffsetY);
  if (!CGPointEqualToPoint(bounds.origin, contentOffset)) {
    bounds.origin = contentOffset;
    _childrenView.bounds = bounds;
    didMutate = YES;
  }
  for (UIView* subview in _childrenView.subviews) {
    if (subview == _detachedTouchSentinel) {
      if (!CGRectEqualToRect(subview.frame, CGRectZero)) {
        subview.frame = CGRectZero;
        didMutate = YES;
      }
      continue;
    }

    // A subview under Auto Layout ownership (translatesAutoresizingMaskIntoConstraints
    // == NO) manages its own frame via constraints. This fill pass must never write
    // its frame or stamp a flexible autoresizing mask onto it: doing so both fights
    // Auto Layout for the initial size AND — once a flexible mask is set — makes
    // UIKit's own -[UIView(Geometry) _resizeWithOldSuperviewSize:] re-stretch the
    // view on every subsequent superview bounds change (the "decays after a few
    // interactions" behavior). Engine-owned slot containers (ScreenFooter,
    // FullWindowOverlay) set TAMIC = NO precisely to claim this exemption.
    if (!subview.translatesAutoresizingMaskIntoConstraints) {
      continue;
    }

    if (_preserveDetachedChildrenLayout) {
      continue;
    }

    BOOL didMutateSubview = NO;
    if (!CGRectEqualToRect(subview.frame, bounds)) {
      subview.frame = bounds;
      didMutateSubview = YES;
    }
    const UIViewAutoresizing flexibleSizeMask =
        UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    if (subview.autoresizingMask != flexibleSizeMask) {
      subview.autoresizingMask = flexibleSizeMask;
      didMutateSubview = YES;
    }
    if (didMutateSubview) {
      [subview setNeedsLayout];
      didMutate = YES;
    }
    didMutate =
        NativeScriptLayoutHostedSubviewChain(subview, _detachedTouchSentinel, 0) || didMutate;
  }

  [_lastDetachedChildrenLayoutKey release];
  _lastDetachedChildrenLayoutKey = [NativeScriptDetachedChildrenLayoutSnapshotKey(
      _childrenView, _detachedTouchSentinel) copy];
  return didMutate;
}

- (BOOL)refreshDetachedChildrenHost {
  if (_childrenView == nil) {
    return NO;
  }

  if (_mountChildrenDirectlyToChildrenView) {
    if (_layoutDirectChildrenToChildrenViewBounds) {
      NativeScriptLayoutHostedSubviewChain(_childrenView, _detachedTouchSentinel, 0);
    }
    [self detachDetachedChildrenTouchHandler];
    [self invalidateDetachedChildrenDisplayIfNeeded];
    [self invalidateHostReadySnapshot];
    [self notifyHostReadyIfNeeded];
    return NativeScriptChildrenViewHasVisibleChild(_childrenView, _detachedTouchSentinel, self);
  }

  [self layoutDetachedChildrenViewSubviewsIfNeeded];
  [self installDetachedChildrenTouchSentinelIfNeeded];
  [self attachDetachedChildrenTouchHandlerIfNeeded];
  [self updateDetachedChildrenTouchHandlerOrigin];
  [self invalidateDetachedChildrenDisplayIfNeeded];
  [self notifyHostReadyIfNeeded];

  return NativeScriptChildrenViewHasVisibleChild(_childrenView, _detachedTouchSentinel, self);
}

- (void)refreshDetachedChildrenSentinelAttachment {
  if (_childrenView == nil) {
    return;
  }

  if (_mountChildrenDirectlyToChildrenView) {
    if (_layoutDirectChildrenToChildrenViewBounds) {
      NativeScriptLayoutHostedSubviewChain(_childrenView, _detachedTouchSentinel, 0);
    }
    [self detachDetachedChildrenTouchHandler];
    [self invalidateDetachedChildrenDisplaySnapshot];
    return;
  }

  [self layoutDetachedChildrenViewSubviewsIfNeeded];
  [self attachDetachedChildrenTouchHandlerIfNeeded];
  [self updateDetachedChildrenTouchHandlerOrigin];
  [self invalidateDetachedChildrenDisplayIfNeeded];
}

- (void)installDetachedChildrenTouchSentinelIfNeeded {
  if (_childrenView == nil || _detachedTouchSentinel != nil ||
      _mountChildrenDirectlyToChildrenView) {
    return;
  }

  NativeScriptDetachedChildrenTouchSentinel* sentinel =
      [[NativeScriptDetachedChildrenTouchSentinel alloc] initWithFrame:CGRectZero];
  sentinel.owner = self;
  sentinel.hidden = YES;
  sentinel.userInteractionEnabled = NO;
  sentinel.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
  _detachedTouchSentinel = sentinel;
  [_childrenView addSubview:sentinel];
}

- (void)attachDetachedChildrenTouchHandlerIfNeeded {
  if (_disableDetachedChildrenTouchHandler || _mountChildrenDirectlyToChildrenView) {
    [self detachDetachedChildrenTouchHandler];
    return;
  }

  if (_childrenView == nil) {
    return;
  }

  UIView* touchView = _childrenView;
  const BOOL shouldUseNativeControllerTouchSurface =
      _nativeView != nil &&
      _nativeView.window != nil &&
      NativeScriptHostedViewContainsControllerView(_nativeView, _viewController);

  if (shouldUseNativeControllerTouchSurface) {
    touchView = _nativeView;
  }

  if (NativeScriptGestureRecognizerHasActiveTouches(_detachedTouchHandler)) {
    _detachedTouchHandlerWindow = _detachedTouchHandlerView.window;
    [self updateDetachedChildrenTouchHandlerOrigin];
    if (NativeScriptTouchDebugEnabled()) {
      NSLog(@"[NS_TOUCH_DEBUG] preserve active handler owner=%p current=%@ next=%@ handler=%@",
            self,
            NativeScriptTouchDebugViewSummary(_detachedTouchHandlerView),
            NativeScriptTouchDebugViewSummary(touchView),
            _detachedTouchHandler);
    }
    return;
  }

  if (touchView.hidden || touchView.alpha <= 0.01 || touchView.window == nil) {
    if (_detachedTouchHandler != nil && _detachedTouchHandlerView == touchView) {
      _detachedTouchHandlerWindow = touchView.window;
      [self updateDetachedChildrenTouchHandlerOrigin];
      if (NativeScriptTouchDebugEnabled()) {
        NSLog(@"[NS_TOUCH_DEBUG] preserve hidden/window owner=%p touch=%@", self,
              NativeScriptTouchDebugViewSummary(touchView));
      }
      return;
    }
    if (NativeScriptTouchDebugEnabled()) {
      NSLog(@"[NS_TOUCH_DEBUG] detach hidden/window owner=%p touch=%@", self,
            NativeScriptTouchDebugViewSummary(touchView));
    }
    [self detachDetachedChildrenTouchHandler];
    return;
  }

  if (NativeScriptViewHasSurfaceTouchHandlerInAncestorChain(touchView, _detachedTouchHandler)) {
    NativeScriptUpdateSurfaceTouchHandlerOriginsInAncestorChain(touchView, _detachedTouchHandler);
    if (NativeScriptTouchDebugEnabled()) {
      NSLog(@"[NS_TOUCH_DEBUG] skip attach ancestor handler owner=%p touch-chain=%@",
            self, NativeScriptTouchDebugAncestorSummary(touchView));
    }
    [self detachDetachedChildrenTouchHandler];
    return;
  }

  touchView.userInteractionEnabled = YES;

  if (NativeScriptViewHasSurfaceTouchHandler(touchView, _detachedTouchHandler)) {
    if (NativeScriptTouchDebugEnabled()) {
      NSLog(@"[NS_TOUCH_DEBUG] skip attach own handler owner=%p touch=%@", self,
            NativeScriptTouchDebugViewSummary(touchView));
    }
    NativeScriptUpdateSurfaceTouchHandlerOrigins(touchView, _detachedTouchHandler);
    [self detachDetachedChildrenTouchHandler];
    return;
  }

  if (_detachedTouchHandler != nil) {
    UIView* attachedTouchHandlerView =
        NativeScriptGestureRecognizerAttachedView(_detachedTouchHandler);
    if (_detachedTouchHandlerView == touchView && attachedTouchHandlerView == nil) {
      if ([_detachedTouchHandler respondsToSelector:@selector(attachToView:)]) {
        [_detachedTouchHandler attachToView:touchView];
      } else {
        [touchView addGestureRecognizer:_detachedTouchHandler];
      }
      _detachedTouchHandlerWindow = touchView.window;
      [self updateDetachedChildrenTouchHandlerOrigin];
      if (NativeScriptTouchDebugEnabled()) {
        NSLog(@"[NS_TOUCH_DEBUG] reattached detached handler owner=%p touch=%@ handler=%@",
              self, NativeScriptTouchDebugViewSummary(touchView), _detachedTouchHandler);
      }
      return;
    }
    if (_detachedTouchHandlerView == touchView &&
        attachedTouchHandlerView == touchView &&
        NativeScriptViewHasGestureRecognizer(touchView, _detachedTouchHandler)) {
      _detachedTouchHandlerWindow = touchView.window;
      [self updateDetachedChildrenTouchHandlerOrigin];
      return;
    }

    [self detachDetachedChildrenTouchHandler];
  }

  if (_detachedTouchHandler != nil) {
    [self updateDetachedChildrenTouchHandlerOrigin];
    return;
  }

#if __has_include(<React/RCTSurfaceTouchHandler.h>)
  RCTSurfaceTouchHandler* surfaceTouchHandler = [RCTSurfaceTouchHandler new];
  [surfaceTouchHandler attachToView:touchView];
  _detachedTouchHandler = surfaceTouchHandler;
  _detachedTouchHandlerView = [touchView retain];
  _detachedTouchHandlerWindow = touchView.window;
  [self updateDetachedChildrenTouchHandlerOrigin];
  if (NativeScriptTouchDebugEnabled()) {
    NSLog(@"[NS_TOUCH_DEBUG] attached detached handler owner=%p touch=%@ handler=%@",
          self, NativeScriptTouchDebugViewSummary(touchView), surfaceTouchHandler);
  }
  return;
#endif
}

- (void)updateDetachedChildrenTouchHandlerOrigin {
#if __has_include(<React/RCTSurfaceTouchHandler.h>)
  if (_detachedTouchHandler == nil || _detachedTouchHandlerView == nil ||
      ![_detachedTouchHandler isKindOfClass:RCTSurfaceTouchHandler.class]) {
    return;
  }

  CGPoint origin = CGPointZero;
  if (_detachedTouchHandlerView.window != nil) {
    origin = [_detachedTouchHandlerView convertPoint:CGPointZero
                                             toView:_detachedTouchHandlerView.window];
  }

  ((RCTSurfaceTouchHandler*)_detachedTouchHandler).viewOriginOffset = origin;
#endif
}

- (void)detachDetachedChildrenTouchHandler {
  if (_detachedTouchHandler == nil || _detachedTouchHandlerView == nil) {
    [_detachedTouchHandler release];
    _detachedTouchHandler = nil;
    [_detachedTouchHandlerView release];
    _detachedTouchHandlerView = nil;
    _detachedTouchHandlerWindow = nil;
    return;
  }

  UIView* attachedTouchHandlerView =
      NativeScriptGestureRecognizerAttachedView(_detachedTouchHandler);
  UIView* detachView =
      attachedTouchHandlerView != nil ? attachedTouchHandlerView : _detachedTouchHandlerView;

  if ([_detachedTouchHandler respondsToSelector:@selector(detachFromView:)]) {
    if (NativeScriptViewHasGestureRecognizer(detachView, _detachedTouchHandler)) {
      [_detachedTouchHandler detachFromView:detachView];
    }
  }

  [_detachedTouchHandler release];
  _detachedTouchHandler = nil;
  [_detachedTouchHandlerView release];
  _detachedTouchHandlerView = nil;
  _detachedTouchHandlerWindow = nil;
}

- (BOOL)hostedContentPointInside:(CGPoint)point withEvent:(UIEvent*)event {
  if ([super pointInside:point withEvent:event] && ![self shouldHideEmptyFabricHostWrapper]) {
    return YES;
  }

  if (_externalDetachedChildrenOwner) {
    return NO;
  }

  UIView* hostedViews[] = { _nativeView, _childrenView };
  for (NSUInteger index = 0; index < 2; index += 1) {
    UIView* hostedView = hostedViews[index];
    if (hostedView == nil || hostedView == self ||
        (index == 1 && hostedView == _nativeView) ||
        hostedView.hidden || hostedView.alpha <= 0.01 ||
        !hostedView.userInteractionEnabled || hostedView.window == nil) {
      continue;
    }

    CGPoint hostedPoint = [hostedView convertPoint:point fromView:self];
    if (NativeScriptViewIsDescendantOfView(self, hostedView)) {
      if (NativeScriptHostedOwnerViewPointInsideExcludingHost(
              hostedView, self, hostedPoint, event, 0)) {
        return YES;
      }
      continue;
    }
    if ([hostedView pointInside:hostedPoint withEvent:event]) {
      return YES;
    }
  }

  if (self.window != nil) {
    CGPoint windowPoint = [self convertPoint:point toView:self.window];
    UITabBar* tabBar = NativeScriptVisibleTabBarAtPoint(self.window, self.window, windowPoint);
    if (tabBar != nil && NativeScriptViewIsDescendantOfView(tabBar, self)) {
      return YES;
    }
  }

  return NO;
}

- (UIView*)hostedContentHitTest:(CGPoint)point withEvent:(UIEvent*)event {
  if (self.window != nil) {
    CGPoint windowPoint = [self convertPoint:point toView:self.window];
    UIView* hostedViews[] = { _nativeView, _childrenView };
    for (NSUInteger index = 0; index < 2; index += 1) {
      UIView* hostedView = hostedViews[index];
      if (hostedView == nil || hostedView == self ||
          (index == 1 && hostedView == _nativeView) ||
          hostedView.hidden || hostedView.alpha <= 0.01 ||
          !hostedView.userInteractionEnabled || hostedView.window == nil) {
        continue;
      }

      UIView* tabBarHitView =
          NativeScriptHitTestTabBarAtPoint(hostedView, self.window, windowPoint, event);
      if (tabBarHitView != nil) {
        return tabBarHitView;
      }
    }
  }

  UIView* hitView = [super hitTest:point withEvent:event];
  if (hitView != nil && hitView != self) {
    const BOOL hitViewIsTransparentHostWrapper =
        [hitView isKindOfClass:NativeScriptUIView.class] &&
        [static_cast<NativeScriptUIView*>(hitView) shouldHideEmptyFabricHostWrapper];
    const BOOL hitViewIsHostPlumbing = NativeScriptViewIsHostHitTestPlumbing(hitView);
    if (hitViewIsTransparentHostWrapper || hitViewIsHostPlumbing) {
      if (NativeScriptTouchDebugEnabled()) {
        NSLog(@"[NS_TOUCH_DEBUG] skip super host plumbing owner=%p point=%@ hit-chain=%@",
              self, NSStringFromCGPoint(point), NativeScriptTouchDebugAncestorSummary(hitView));
      }
      hitView = nil;
    } else {
      if (NativeScriptTouchDebugEnabled()) {
        NSLog(@"[NS_TOUCH_DEBUG] hit super child owner=%p point=%@ hit-chain=%@",
              self, NSStringFromCGPoint(point), NativeScriptTouchDebugAncestorSummary(hitView));
      }
      return hitView;
    }
  }

  if (_externalDetachedChildrenOwner) {
    return hitView;
  }

  UIView* hostedViews[] = { _nativeView, _childrenView };
  for (NSUInteger index = 0; index < 2; index += 1) {
    UIView* hostedView = hostedViews[index];
    if (hostedView == nil || hostedView == self ||
        (index == 1 && hostedView == _nativeView) ||
        hostedView.hidden || hostedView.alpha <= 0.01 ||
        !hostedView.userInteractionEnabled || hostedView.window == nil) {
      continue;
    }

    CGPoint hostedPoint = [hostedView convertPoint:point fromView:self];
    UIView* hostedHitView = NativeScriptViewIsDescendantOfView(self, hostedView)
        ? NativeScriptHostedOwnerViewHitTestExcludingHost(hostedView, self, hostedPoint, event, 0)
        : [hostedView hitTest:hostedPoint withEvent:event];
    if (hostedHitView == nil || NativeScriptViewIsHostHitTestPlumbing(hostedHitView)) {
      UIView* descendantHitView =
          NativeScriptHitTestVisibleDescendantOutsideBounds(hostedView, hostedPoint, event, 0);
      if (descendantHitView != nil) {
        hostedHitView = descendantHitView;
      }
    }
    if (hostedHitView != nil) {
      if (NativeScriptViewIsHostHitTestPlumbing(hostedHitView)) {
        if (NativeScriptTouchDebugEnabled()) {
          NSLog(@"[NS_TOUCH_DEBUG] skip hosted host plumbing owner=%p point=%@ hosted=%@ hostedPoint=%@ hit-chain=%@",
                self,
                NSStringFromCGPoint(point),
                NativeScriptTouchDebugViewSummary(hostedView),
                NSStringFromCGPoint(hostedPoint),
                NativeScriptTouchDebugAncestorSummary(hostedHitView));
        }
        continue;
      }
      if (NativeScriptTouchDebugEnabled()) {
        NSLog(@"[NS_TOUCH_DEBUG] hit hosted owner=%p point=%@ hosted=%@ hostedPoint=%@ hit-chain=%@",
              self,
              NSStringFromCGPoint(point),
              NativeScriptTouchDebugViewSummary(hostedView),
              NSStringFromCGPoint(hostedPoint),
              NativeScriptTouchDebugAncestorSummary(hostedHitView));
      }
      return hostedHitView;
    }
  }

  if (NativeScriptTouchDebugEnabled() && hitView != nil) {
    NSLog(@"[NS_TOUCH_DEBUG] hit wrapper owner=%p point=%@ wrapper=%@",
          self, NSStringFromCGPoint(point), NativeScriptTouchDebugViewSummary(hitView));
  }
  if (hitView == self &&
      ([self shouldHideEmptyFabricHostWrapper] || NativeScriptViewIsHostHitTestPlumbing(self))) {
    return nil;
  }
  return hitView;
}

- (BOOL)hostedViewIsDetachedFromHostWrapper:(UIView*)hostedView {
  if (self.window == nil || NativeScriptViewHasHiddenUIKitAncestor(self) ||
      hostedView == nil || hostedView == self || hostedView.window == nil ||
      hostedView.hidden || hostedView.alpha <= 0.01) {
    return NO;
  }

  return !NativeScriptViewIsDescendantOfView(hostedView, self);
}

- (BOOL)hasVisibleSubviewMountedInHostWrapper {
  for (UIView* subview in self.subviews) {
    if (subview == _detachedTouchSentinel || subview.hidden || subview.alpha <= 0.01) {
      continue;
    }
    return YES;
  }

  return NO;
}

- (BOOL)shouldHideEmptyFabricHostWrapper {
  UIView* componentView = self.superview;
  if (componentView != nil && (_childrenView == componentView || _nativeView == componentView)) {
    return NO;
  }

  if ([self hasVisibleSubviewMountedInHostWrapper]) {
    return NO;
  }

  const BOOL hasDetachedHostedContent =
      [self hostedViewIsDetachedFromHostWrapper:_nativeView] ||
      (_childrenView != _nativeView && [self hostedViewIsDetachedFromHostWrapper:_childrenView]);
  const BOOL hasExternalDetachedChildrenOwner =
      _externalDetachedChildrenOwner && (_nativeView != nil || _childrenView != nil);

  return hasDetachedHostedContent || hasExternalDetachedChildrenOwner;
}

- (NSArray*)accessibilityElements {
  // Hit testing may need to route through this Fabric shell to reach a UIKit
  // child that was moved under an external owner. Accessibility should not:
  // UIKit already exposes that child through its real visible hierarchy, and
  // re-exporting it here gives XCTest/VoiceOver two owners for the same subtree.
  return [super accessibilityElements];
}

- (NSInteger)accessibilityElementCount {
  NSArray* elements = [self accessibilityElements];
  if (elements.count > 0) {
    return static_cast<NSInteger>(elements.count);
  }

  return [super accessibilityElementCount];
}

- (id)accessibilityElementAtIndex:(NSInteger)index {
  NSArray* elements = [self accessibilityElements];
  if (index >= 0 && static_cast<NSUInteger>(index) < elements.count) {
    return elements[static_cast<NSUInteger>(index)];
  }

  return [super accessibilityElementAtIndex:index];
}

- (NSInteger)indexOfAccessibilityElement:(id)element {
  NSArray* elements = [self accessibilityElements];
  NSUInteger index = [elements indexOfObject:element];
  if (index != NSNotFound) {
    return static_cast<NSInteger>(index);
  }

  return [super indexOfAccessibilityElement:element];
}

- (BOOL)pointInside:(CGPoint)point withEvent:(UIEvent*)event {
  return [self hostedContentPointInside:point withEvent:event];
}

- (UIView*)hitTest:(CGPoint)point withEvent:(UIEvent*)event {
  return [self hostedContentHitTest:point withEvent:event];
}

- (void)didMoveToWindow {
  [super didMoveToWindow];
  [self mountUIKitHostIfNeeded];
  [self attachViewControllerIfPossible];
  [self refreshUIKitHostAfterNativeAttachment];
  [self attachDetachedChildrenTouchHandlerIfNeeded];
  [self updateDetachedChildrenTouchHandlerOrigin];
  [self invalidateDetachedChildrenDisplayIfNeeded];
  [self notifyHostReadyIfNeeded];
}

- (void)pushAdoptedSizeFeedbackIfNeeded {
  // Adoption size feedback: once UIKit resolves the adopted screen's size, push
  // it into the Fabric shadow tree so Yoga re-lays-out the hosted subtree to
  // match (replaces the manual repair walk for adopted screens). This mirrors
  // RNSScreen -updateBounds, including which size it feeds back — see below.
  if (!_adoptHostViewAsControllerView) {
    return;
  }
  UINavigationController* nav = _viewController.navigationController;
  UIView* navView = nav.view;
  UIWindow* window = navView.window ?: self.window;
  // STEP 3c (self.bounds.size, matching RNSScreen.mm:147 exactly) was tried
  // and reverted: it regressed the 5-launch matrix (2/5 failures reproducing
  // the half-height/gray-gap symptom this whole fix targets). Root cause:
  // self.bounds can be transiently half-height/short at the moment this fires
  // (e.g. mid root-install/first-layout before UIKit has settled this
  // container's real frame), and with Step 4 now refusing to let Yoga's
  // layout metrics drive the frame while under a nav controller, there is no
  // other mechanism to correct a bad size once it is baked into the shadow
  // tree. The WINDOW's bounds are the stable full-screen size and don't have
  // that failure mode, so keep preferring them (this is a fidelity refinement
  // vs. RNSScreen, not the core synchronous-commit fix — see Step 3c note in
  // the plan).
  CGSize size = (window != nil && !CGRectIsEmpty(window.bounds))
                    ? window.bounds.size
                    : ((navView != nil && !CGRectIsEmpty(navView.bounds))
                           ? navView.bounds.size
                           : self.bounds.size);
  if (size.width <= 0 || size.height <= 0) {
    return;
  }
  UIView* component = _fabricComponentView;
  if ([component
          respondsToSelector:@selector(pushAdoptedContainerSizeToShadowTree:)]) {
    [(id)component pushAdoptedContainerSizeToShadowTree:size];
  }
  // RNS parity (RNSScreen.mm:155-156): request another layout pass on the
  // navigation controller's view after pushing the size feedback. The state
  // commit above triggers a later Fabric layout of the hosted subtree, but
  // UIKit's own layout pass (nav bar / safe area / container view sizing)
  // needs to be re-run too so it settles alongside the new content size.
  //
  // STAGE 2 (A2) — but NOT while a navigation transition is in flight. During
  // the stock interactive edge back-swipe this method runs on every frame (via
  // layoutSubviews), and forcing an extra layout pass on the CLOSING nav view
  // each frame is a mid-transition write that re-strands the revealed screen
  // (blank, no dim/parallax) — the native twin of the JS mid-transition layout
  // writes §4F removed, which never covered this path. The shadow-tree size push
  // above is kept (Yoga still re-lays the hosted subtree); only the redundant
  // per-frame nav relayout is deferred until the transition settles. Plain
  // property read (no bridged coordinator block), so no hang risk.
  if (nav.transitionCoordinator == nil) {
    [nav.view setNeedsLayout];
  }
}

- (void)layoutSubviews {
  [super layoutSubviews];
  [self pushAdoptedSizeFeedbackIfNeeded];
  const BOOL ownsNativeViewAsSubview = _nativeView != nil && _nativeView.superview == self;
  const BOOL didResizeNativeView =
      ownsNativeViewAsSubview && !_pinNativeViewToHost &&
      !CGRectEqualToRect(_nativeView.frame, self.bounds);
  if (didResizeNativeView) {
    _nativeView.frame = self.bounds;
  }
  [self applyNativeViewLayoutMode];
  if (_pinNativeViewToHost || didResizeNativeView) {
    [self layoutHostedViewControllerViewIfNeeded];
  }
  [self attachViewControllerIfPossible];
  if (_mountChildrenDirectlyToChildrenView && _layoutDirectChildrenToChildrenViewBounds) {
    NativeScriptLayoutHostedSubviewChain(_childrenView, _detachedTouchSentinel, 0);
  }
  [self layoutDetachedChildrenViewSubviewsIfNeeded];
  [self installDetachedChildrenTouchSentinelIfNeeded];
  [self attachDetachedChildrenTouchHandlerIfNeeded];
  [self updateDetachedChildrenTouchHandlerOrigin];
  [self invalidateDetachedChildrenDisplayIfNeeded];
  [self notifyHostReadyIfNeeded];
}

@end

static BOOL NativeScriptRefreshOwner(NativeScriptUIView* owner) {
  if (owner == nil) {
    return NO;
  }

  static NSMutableSet<NSValue*>* refreshingOwners;
  if (refreshingOwners == nil) {
    refreshingOwners = [NSMutableSet new];
  }

  NSValue* ownerKey = [NSValue valueWithNonretainedObject:owner];
  if ([refreshingOwners containsObject:ownerKey]) {
    return NO;
  }

  [refreshingOwners addObject:ownerKey];
  BOOL refreshedDetachedChildren = NO;
  @try {
    [owner attachViewControllerIfPossible];
    [owner runUIKitHostLifecycle:@"refresh"
                 transactionJson:[owner fabricTransactionJsonWithModifiedChildren:NO
                                                                    modifiedProps:NO]];
    refreshedDetachedChildren = [owner refreshDetachedChildrenHost];
  } @finally {
    [refreshingOwners removeObject:ownerKey];
  }
  return refreshedDetachedChildren;
}

static BOOL NativeScriptInvalidateHostReadyOwner(NativeScriptUIView* owner) {
  if (owner == nil) {
    return NO;
  }

  [owner invalidateHostReadySnapshot];
  [owner notifyHostReadyIfNeeded];
  return YES;
}

static BOOL NativeScriptFlushOwnerDisplay(NativeScriptUIView* owner) {
  if (owner == nil) {
    return NO;
  }

  return [owner flushDetachedChildrenDisplay];
}

static BOOL NativeScriptRefreshUIKitHostOwnersInAncestorChain(UIView* root) {
  BOOL refreshed = NO;
  UIView* current = root;
  NSUInteger depth = 0;

  while (current != nil && depth < 24) {
    if ([current isKindOfClass:NativeScriptUIView.class]) {
      refreshed = NativeScriptRefreshOwner(static_cast<NativeScriptUIView*>(current)) || refreshed;
    }

    refreshed = NativeScriptRefreshOwner(NativeScriptDetachedChildrenOwner(current)) || refreshed;
    refreshed = NativeScriptRefreshOwner(NativeScriptHostedViewOwner(current)) || refreshed;

    current = current.superview;
    depth += 1;
  }

  return refreshed;
}

static BOOL NativeScriptFlushUIKitHostOwnersInAncestorChain(UIView* root) {
  BOOL flushed = NO;
  UIView* current = root;
  NSUInteger depth = 0;

  while (current != nil && depth < 24) {
    if ([current isKindOfClass:NativeScriptUIView.class]) {
      flushed = NativeScriptFlushOwnerDisplay(static_cast<NativeScriptUIView*>(current)) || flushed;
    }

    flushed = NativeScriptFlushOwnerDisplay(NativeScriptDetachedChildrenOwner(current)) || flushed;
    flushed = NativeScriptFlushOwnerDisplay(NativeScriptHostedViewOwner(current)) || flushed;

    current = current.superview;
    depth += 1;
  }

  return flushed;
}

static BOOL NativeScriptRefreshUIKitHostSubviews(UIView* root, NSUInteger depth) {
  if (root == nil || depth > 24) {
    return NO;
  }

  BOOL refreshed = NO;
  if ([root isKindOfClass:NativeScriptUIView.class]) {
    refreshed = NativeScriptRefreshOwner(static_cast<NativeScriptUIView*>(root)) || refreshed;
  }

  refreshed = NativeScriptRefreshOwner(NativeScriptDetachedChildrenOwner(root)) || refreshed;
  refreshed = NativeScriptRefreshOwner(NativeScriptHostedViewOwner(root)) || refreshed;

  if ([root isKindOfClass:NativeScriptDetachedChildrenTouchSentinel.class]) {
    NativeScriptDetachedChildrenTouchSentinel* sentinel =
        static_cast<NativeScriptDetachedChildrenTouchSentinel*>(root);
    refreshed = NativeScriptRefreshOwner(sentinel.owner) || refreshed;
  }

  NSArray<UIView*>* subviews = [root.subviews copy];
  for (UIView* subview in subviews) {
    refreshed = NativeScriptRefreshUIKitHostSubviews(subview, depth + 1) || refreshed;
  }
  [subviews release];

  return refreshed;
}

static BOOL NativeScriptFlushUIKitHostSubviews(UIView* root, NSUInteger depth) {
  if (root == nil || depth > 24) {
    return NO;
  }

  BOOL flushed = NO;
  if ([root isKindOfClass:NativeScriptUIView.class]) {
    flushed = NativeScriptFlushOwnerDisplay(static_cast<NativeScriptUIView*>(root)) || flushed;
  }

  flushed = NativeScriptFlushOwnerDisplay(NativeScriptDetachedChildrenOwner(root)) || flushed;
  flushed = NativeScriptFlushOwnerDisplay(NativeScriptHostedViewOwner(root)) || flushed;

  if ([root isKindOfClass:NativeScriptDetachedChildrenTouchSentinel.class]) {
    NativeScriptDetachedChildrenTouchSentinel* sentinel =
        static_cast<NativeScriptDetachedChildrenTouchSentinel*>(root);
    flushed = NativeScriptFlushOwnerDisplay(sentinel.owner) || flushed;
  }

  NSArray<UIView*>* subviews = [root.subviews copy];
  for (UIView* subview in subviews) {
    flushed = NativeScriptFlushUIKitHostSubviews(subview, depth + 1) || flushed;
  }
  [subviews release];

  return flushed;
}

static NativeScriptUIView* NativeScriptUIKitHostOwnerForView(UIView* view) {
  if (view == nil) {
    return nil;
  }

  if ([view isKindOfClass:NativeScriptUIView.class]) {
    return static_cast<NativeScriptUIView*>(view);
  }

  NativeScriptUIView* owner = NativeScriptDetachedChildrenOwner(view);
  if (owner != nil) {
    return owner;
  }

  owner = NativeScriptHostedViewOwner(view);
  if (owner != nil) {
    return owner;
  }

  UIView* current = view.superview;
  NSUInteger depth = 0;
  while (current != nil && depth < 24) {
    if ([current isKindOfClass:NativeScriptUIView.class]) {
      return static_cast<NativeScriptUIView*>(current);
    }
    owner = NativeScriptDetachedChildrenOwner(current);
    if (owner != nil) {
      return owner;
    }
    owner = NativeScriptHostedViewOwner(current);
    if (owner != nil) {
      return owner;
    }
    current = current.superview;
    depth += 1;
  }

  return nil;
}

BOOL NativeScriptRefreshUIKitHostView(NSString* viewHandle) {
  if (![NSThread isMainThread]) {
    return NO;
  }

  UIView* view = NativeScriptUIViewFromHandle(viewHandle);
  if (view == nil) {
    return NO;
  }

  NativeScriptUIView* owner = NativeScriptUIKitHostOwnerForView(view);
  if (owner != nil) {
    return NativeScriptRefreshOwner(owner);
  }

  return NativeScriptRefreshUIKitHostSubviews(view, 0);
}

BOOL NativeScriptRefreshUIKitHostViewOwner(NSString* viewHandle) {
  if (![NSThread isMainThread]) {
    return NO;
  }

  UIView* view = NativeScriptUIViewFromHandle(viewHandle);
  if (view == nil) {
    return NO;
  }

  return NativeScriptRefreshUIKitHostOwnersInAncestorChain(view);
}

BOOL NativeScriptRefreshUIKitHostViewDirectOwner(NSString* viewHandle) {
  if (![NSThread isMainThread]) {
    return NO;
  }

  UIView* view = NativeScriptUIViewFromHandle(viewHandle);
  if (view == nil) {
    return NO;
  }

  return NativeScriptRefreshOwner(NativeScriptUIKitHostOwnerForView(view));
}

BOOL NativeScriptInvalidateUIKitHostReadyOwner(NSString* viewHandle) {
  if (![NSThread isMainThread]) {
    return NO;
  }

  UIView* view = NativeScriptUIViewFromHandle(viewHandle);
  if (view == nil) {
    return NO;
  }

  return NativeScriptInvalidateHostReadyOwner(NativeScriptDetachedChildrenOwner(view)) ||
         NativeScriptInvalidateHostReadyOwner(NativeScriptHostedViewOwner(view));
}

BOOL NativeScriptNotifyUIKitAccessibilityLayoutChanged(NSString* viewHandle) {
  if (![NSThread isMainThread]) {
    return NO;
  }

  UIView* view = NativeScriptUIViewFromHandle(viewHandle);
  if (view == nil) {
    return NO;
  }

  UIAccessibilityPostNotification(UIAccessibilityLayoutChangedNotification, view);
  return YES;
}

BOOL NativeScriptFlushUIKitHostView(NSString* viewHandle) {
  if (![NSThread isMainThread]) {
    return NO;
  }

  UIView* view = NativeScriptUIViewFromHandle(viewHandle);
  if (view == nil) {
    return NO;
  }

  NativeScriptUIView* owner = NativeScriptUIKitHostOwnerForView(view);
  BOOL flushed = NativeScriptFlushOwnerDisplay(owner);
  flushed = NativeScriptFlushUIKitHostSubviews(view, 0) || flushed;
  if (flushed) {
    [CATransaction flush];
  }
  return flushed;
}

BOOL NativeScriptFlushUIKitHostViewOwner(NSString* viewHandle) {
  if (![NSThread isMainThread]) {
    return NO;
  }

  UIView* view = NativeScriptUIViewFromHandle(viewHandle);
  if (view == nil) {
    return NO;
  }

  const BOOL flushed = NativeScriptFlushUIKitHostOwnersInAncestorChain(view);
  if (flushed) {
    [CATransaction flush];
  }
  return flushed;
}

NSDictionary<NSString*, NSString*>* NativeScriptUIKitHostHandlesForView(NSString* viewHandle) {
  if (![NSThread isMainThread]) {
    return @{};
  }

  UIView* view = NativeScriptUIViewFromHandle(viewHandle);
  NativeScriptUIView* owner = NativeScriptUIKitHostOwnerForView(view);
  return owner == nil ? @{} : [owner uikitHostHandles];
}

NSDictionary<NSString*, NSString*>* NativeScriptUIKitHostOwnerHandlesForView(NSString* viewHandle) {
  if (![NSThread isMainThread]) {
    return @{};
  }

  UIView* view = NativeScriptUIViewFromHandle(viewHandle);
  NativeScriptUIView* owner = NativeScriptUIKitHostOwnerForView(view);
  if (owner == nil) {
    return @{};
  }

  UIView* current = owner.superview;
  NSUInteger depth = 0;
  while (current != nil && depth < 24) {
    NativeScriptUIView* parentOwner = NativeScriptUIKitHostOwnerForView(current);
    if (parentOwner != nil && parentOwner != owner) {
      return [parentOwner uikitHostHandles];
    }
    current = current.superview;
    depth += 1;
  }

  return @{};
}

NSArray<UIView*>* NativeScriptCollectedUIKitHostChildren(NSString* viewHandle) {
  if (![NSThread isMainThread]) {
    return @[];
  }

  UIView* view = NativeScriptUIViewFromHandle(viewHandle);
  NativeScriptUIView* owner = NativeScriptUIKitHostOwnerForView(view);
  return owner == nil ? @[] : [owner collectedChildComponentViews];
}

NSString* NativeScriptNearestViewControllerForView(NSString* viewHandle) {
  if (![NSThread isMainThread]) {
    return nil;
  }

  UIView* view = NativeScriptUIViewFromHandle(viewHandle);
  if (view == nil) {
    return nil;
  }

  UIViewController* controller = NativeScriptClosestReactViewControllerForView(view, nil);
  if (controller == nil) {
    controller = NativeScriptNearestViewController(view, nil);
  }

  return NativeScriptHandleFromNSObject(controller);
}

BOOL NativeScriptAttachViewControllerToNearestParent(NSString* controllerHandle,
                                                     NSString* viewHandle,
                                                     BOOL allowRootParent) {
  if (![NSThread isMainThread]) {
    return NO;
  }

  UIViewController* controller = NativeScriptUIViewControllerFromHandle(controllerHandle);
  UIView* view = NativeScriptUIViewFromHandle(viewHandle);
  if (controller == nil || view == nil || view.window == nil) {
    return NO;
  }

  UIViewController* parent = NativeScriptClosestReactViewControllerForView(view, controller);
  if (parent == nil) {
    parent = NativeScriptNearestResponderViewController(view, controller);
  }
  if (parent == nil || parent == controller) {
    return NO;
  }
  if (!allowRootParent && parent == view.window.rootViewController) {
    return NO;
  }

  if (controller.parentViewController == parent) {
    return NO;
  }

  if (controller.parentViewController != nil) {
    [controller willMoveToParentViewController:nil];
    [controller removeFromParentViewController];
  }

  [parent addChildViewController:controller];
  [controller didMoveToParentViewController:parent];
  return YES;
}

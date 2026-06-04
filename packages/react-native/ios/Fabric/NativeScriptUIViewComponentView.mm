#import "NativeScriptUIViewComponentView.h"

#import <React/RCTFabricComponentsPlugins.h>
#import <react/renderer/components/NativeScriptNativeApiSpec/ComponentDescriptors.h>
#import <react/renderer/components/NativeScriptNativeApiSpec/Props.h>

#import "NativeScriptUIView.h"

using namespace facebook::react;

static BOOL NativeScriptFabricViewIsDescendantOfView(UIView* view, UIView* ancestor) {
  UIView* current = view;
  while (current != nil) {
    if (current == ancestor) {
      return YES;
    }
    current = current.superview;
  }
  return NO;
}

static UITabBar* NativeScriptFabricVisibleTabBarAtPoint(
    UIView* root,
    UIWindow* window,
    CGPoint windowPoint) {
  if (root.hidden || root.alpha <= 0.01 || !root.userInteractionEnabled) {
    return nil;
  }

  if ([root isKindOfClass:UITabBar.class]) {
    CGPoint localPoint = [root convertPoint:windowPoint fromView:window];
    if ([root pointInside:localPoint withEvent:nil]) {
      return static_cast<UITabBar*>(root);
    }
  }

  for (UIView* subview in [root.subviews reverseObjectEnumerator]) {
    UITabBar* tabBar = NativeScriptFabricVisibleTabBarAtPoint(subview, window, windowPoint);
    if (tabBar != nil) {
      return tabBar;
    }
  }

  return nil;
}

@implementation NativeScriptUIViewComponentView {
  NativeScriptUIView* _containerView;
  NSString* _debugName;
}

- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const NativeScriptUIViewProps>();
    _props = defaultProps;

    _containerView = [[NativeScriptUIView alloc] initWithFrame:self.bounds];
    _containerView.autoresizingMask =
        UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    self.contentView = _containerView;
  }

  return self;
}

- (void)dealloc {
  [_debugName release];
  [_containerView release];
  [super dealloc];
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

- (void)mountChildComponentView:(UIView<RCTComponentViewProtocol>*)childComponentView
                          index:(NSInteger)index {
  [_containerView insertSubview:childComponentView atIndex:index];
}

- (void)unmountChildComponentView:(UIView<RCTComponentViewProtocol>*)childComponentView
                            index:(NSInteger)index {
  [childComponentView removeFromSuperview];
}

- (UIView*)hitTest:(CGPoint)point withEvent:(UIEvent*)event {
  UIView* hitView = [super hitTest:point withEvent:event];
  if (hitView == nil || self.window == nil) {
    return hitView;
  }

  CGPoint windowPoint = [self convertPoint:point toView:self.window];
  UITabBar* tabBar =
      NativeScriptFabricVisibleTabBarAtPoint(self.window, self.window, windowPoint);
  if (tabBar != nil) {
    if (NativeScriptFabricViewIsDescendantOfView(tabBar, self)) {
      CGPoint tabBarPoint = [tabBar convertPoint:windowPoint fromView:self.window];
      UIView* tabBarHitView = [tabBar hitTest:tabBarPoint withEvent:event];
      if (tabBarHitView != nil) {
        return tabBarHitView;
      }
    }
    if (!NativeScriptFabricViewIsDescendantOfView(self, tabBar)) {
      return nil;
    }
  }

  return hitView;
}

- (void)updateProps:(Props::Shared const&)props oldProps:(Props::Shared const&)oldProps {
  const auto oldViewProps = std::static_pointer_cast<const NativeScriptUIViewProps>(_props);
  const auto newViewProps = std::static_pointer_cast<const NativeScriptUIViewProps>(props);
  const std::string oldNativeViewHandle = oldViewProps->nativeViewHandle;
  const std::string newNativeViewHandle = newViewProps->nativeViewHandle;
  const std::string oldChildrenViewHandle = oldViewProps->childrenViewHandle;
  const std::string newChildrenViewHandle = newViewProps->childrenViewHandle;
  const std::string oldControllerHandle = oldViewProps->controllerHandle;
  const std::string newControllerHandle = newViewProps->controllerHandle;
  const std::string oldDebugName = oldViewProps->debugName;
  const std::string newDebugName = newViewProps->debugName;
  const std::string oldHostId = oldViewProps->hostId;
  const std::string newHostId = newViewProps->hostId;

  [super updateProps:props oldProps:oldProps];

  if (oldDebugName != newDebugName) {
    NSString* debugName =
        newDebugName.empty() ? nil : [NSString stringWithUTF8String:newDebugName.c_str()];
    [_debugName release];
    _debugName = [debugName copy];
    _containerView.debugName = debugName;
  }

  if (oldNativeViewHandle != newNativeViewHandle) {
    NSString* nativeViewHandle = newNativeViewHandle.empty()
                                     ? nil
                                     : [NSString stringWithUTF8String:newNativeViewHandle.c_str()];
    _containerView.nativeViewHandle = nativeViewHandle;
  }

  if (oldChildrenViewHandle != newChildrenViewHandle) {
    NSString* childrenViewHandle =
        newChildrenViewHandle.empty()
            ? nil
            : [NSString stringWithUTF8String:newChildrenViewHandle.c_str()];
    _containerView.childrenViewHandle = childrenViewHandle;
  }

  if (oldControllerHandle != newControllerHandle) {
    NSString* controllerHandle =
        newControllerHandle.empty()
            ? nil
            : [NSString stringWithUTF8String:newControllerHandle.c_str()];
    _containerView.controllerHandle = controllerHandle;
  }

  if (oldHostId != newHostId) {
    NSString* hostId =
        newHostId.empty() ? nil : [NSString stringWithUTF8String:newHostId.c_str()];
    _containerView.hostId = hostId;
  }
}

- (void)prepareForRecycle {
  [super prepareForRecycle];
  [_debugName release];
  _debugName = nil;
  _containerView.debugName = nil;
  _containerView.nativeViewHandle = nil;
  _containerView.childrenViewHandle = nil;
  _containerView.controllerHandle = nil;
  _containerView.hostId = nil;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
  return concreteComponentDescriptorProvider<NativeScriptUIViewComponentDescriptor>();
}

@end

Class<RCTComponentViewProtocol> NativeScriptUIViewCls(void) {
  return NativeScriptUIViewComponentView.class;
}

#import "NativeScriptUIViewComponentView.h"

#import <React/RCTFabricComponentsPlugins.h>
#import <react/renderer/components/NativeScriptNativeApiSpec/ComponentDescriptors.h>
#import <react/renderer/components/NativeScriptNativeApiSpec/Props.h>

#import "NativeScriptUIView.h"

using namespace facebook::react;

@implementation NativeScriptUIViewComponentView {
  NativeScriptUIView* _containerView;
}

+ (void)load {
  [super load];
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
  [_containerView release];
  [super dealloc];
}

- (void)updateProps:(Props::Shared const&)props oldProps:(Props::Shared const&)oldProps {
  const auto oldViewProps = std::static_pointer_cast<const NativeScriptUIViewProps>(_props);
  const auto newViewProps = std::static_pointer_cast<const NativeScriptUIViewProps>(props);
  const std::string oldNativeViewHandle = oldViewProps->nativeViewHandle;
  const std::string newNativeViewHandle = newViewProps->nativeViewHandle;

  [super updateProps:props oldProps:oldProps];

  if (oldNativeViewHandle != newNativeViewHandle) {
    NSString* nativeViewHandle = newNativeViewHandle.empty()
                                     ? nil
                                     : [NSString stringWithUTF8String:newNativeViewHandle.c_str()];
    _containerView.nativeViewHandle = nativeViewHandle;
  }
}

- (void)prepareForRecycle {
  [super prepareForRecycle];
  _containerView.nativeViewHandle = nil;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
  return concreteComponentDescriptorProvider<NativeScriptUIViewComponentDescriptor>();
}

@end

Class<RCTComponentViewProtocol> NativeScriptUIViewCls(void) {
  return NativeScriptUIViewComponentView.class;
}

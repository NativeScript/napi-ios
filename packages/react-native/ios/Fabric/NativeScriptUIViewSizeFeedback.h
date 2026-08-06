#pragma once

// UIKit -> shadow-tree size feedback for the NativeScriptUIView Fabric
// component. Generalizes upstream react-native-screens' RNSScreenState:
// when the host view is adopted as a UIViewController's view and UIKit sizes
// it (a pushed/root screen under a UINavigationController), the resolved size
// is pushed into a custom shadow-node State; the custom ComponentDescriptor's
// adopt() reads that size and calls YogaLayoutableShadowNode::setSize(), so
// Yoga re-lays-out the hosted React subtree at the real UIKit size WITHOUT any
// manual per-view repair walk. The generic codegen'd component ships an empty
// StateData and cannot do this; this custom shadow node/state/descriptor
// replaces it (the ComponentView's +componentDescriptorProvider returns the
// descriptor below, which is authoritative for components that have a native
// ComponentView).

#include <react/renderer/components/NativeScriptNativeApiSpec/EventEmitters.h>
#include <react/renderer/components/NativeScriptNativeApiSpec/Props.h>
#include <react/renderer/components/NativeScriptNativeApiSpec/ShadowNodes.h>
#include <react/renderer/components/view/ConcreteViewShadowNode.h>
#include <react/renderer/components/view/YogaLayoutableShadowNode.h>
#include <react/renderer/core/ConcreteComponentDescriptor.h>
#include <react/renderer/core/graphicsConversions.h>
#include <react/renderer/graphics/Float.h>
#include <react/renderer/graphics/Size.h>

#include <memory>

namespace facebook {
namespace react {

// State data carrying the UIKit-resolved container size. Mirrors the iOS
// (non-Android) shape of RNSScreenState — a plain value with a Shared alias
// and the two constructors Fabric needs.
class JSI_EXPORT NativeScriptUIViewSizeStateData final {
 public:
  using Shared = std::shared_ptr<const NativeScriptUIViewSizeStateData>;

  NativeScriptUIViewSizeStateData() {}
  explicit NativeScriptUIViewSizeStateData(Size frameSize_)
      : frameSize(frameSize_) {}

  Size frameSize{};
};

// Reuse the codegen'd component name so this shadow node's ComponentHandle
// matches the generated one; the ComponentView's provider then replaces the
// generated descriptor for the exact same component.
using NativeScriptUIViewSizedShadowNode = ConcreteViewShadowNode<
    NativeScriptUIViewComponentName,
    NativeScriptUIViewProps,
    NativeScriptUIViewEventEmitter,
    NativeScriptUIViewSizeStateData>;

class NativeScriptUIViewSizedComponentDescriptor final
    : public ConcreteComponentDescriptor<NativeScriptUIViewSizedShadowNode> {
 public:
  using ConcreteComponentDescriptor::ConcreteComponentDescriptor;

  void adopt(ShadowNode& shadowNode) const override {
    auto& layoutableShadowNode =
        static_cast<YogaLayoutableShadowNode&>(shadowNode);

    auto state = std::static_pointer_cast<
        const NativeScriptUIViewSizedShadowNode::ConcreteState>(
        shadowNode.getState());
    auto stateData = state->getData();

    // A non-zero state size means UIKit has resolved the adopted container's
    // size; force the Yoga node to that size so the hosted subtree lays out
    // to the real dimensions. Zero size (default / non-adopted) leaves Yoga
    // to compute the layout normally.
    if (stateData.frameSize.width != 0 && stateData.frameSize.height != 0) {
      layoutableShadowNode.setSize(
          Size{stateData.frameSize.width, stateData.frameSize.height});
    }

    ConcreteComponentDescriptor::adopt(shadowNode);
  }
};

}  // namespace react
}  // namespace facebook

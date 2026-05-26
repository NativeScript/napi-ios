import NativeScript from '@nativescript/react-native';

export const UIKitContainer = NativeScript.defineUIKitContainer<{
  backgroundColor?: UIColor;
}>({
  name: 'UIKitContainer',
  layout: {sizing: 'fill'},
  create() {
    const rootView = UIView.new();
    const childrenView = UIView.new();
    childrenView.frame = rootView.bounds;
    childrenView.autoresizingMask =
      UIViewAutoresizing.FlexibleWidth |
      UIViewAutoresizing.FlexibleHeight;
    rootView.addSubview(childrenView);
    return {rootView, childrenView};
  },
  update(view, props) {
    view.rootView.backgroundColor =
      props.backgroundColor ?? UIColor.clearColor;
  },
});

import NativeScript from '@nativescript/react-native';

export const UIKitIntrinsicLabel = NativeScript.defineUIKitView<
  {text: string},
  UILabel
>({
  name: 'UIKitIntrinsicLabel',
  layout: {
    sizing: 'intrinsic',
    defaultSize: {width: 1, height: 1},
  },
  create() {
    return UILabel.new();
  },
  update(label, props, _previous, ctx) {
    label.text = props.text;
    ctx?.invalidateLayout();
  },
});

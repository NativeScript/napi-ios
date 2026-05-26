import NativeScript from '@nativescript/react-native';

export const UIKitSwitch = NativeScript.defineUIKitView<
  {
    value: boolean;
    onValueChange?: (value: boolean) => void;
  },
  UISwitch
>({
  name: 'UIKitSwitch',
  layout: {sizing: 'intrinsic'},
  create(ctx) {
    const view = UISwitch.new();
    ctx.targetAction(view, UIControlEvents.ValueChanged, () => {
      ctx.emit('onValueChange', view.on);
    });
    return view;
  },
  update(view, props) {
    if (view.on !== props.value) {
      view.setOnAnimated(props.value, false);
    }
  },
});

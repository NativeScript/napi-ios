import NativeScript from '@nativescript/react-native';

export const UIKitViewControllerHost = NativeScript.defineUIViewController<{
  backgroundColor?: UIColor;
}>({
  name: 'UIKitViewControllerHost',
  layout: {sizing: 'fill'},
  createController() {
    return UIViewController.new();
  },
  update(controller, props) {
    controller.view.backgroundColor =
      props.backgroundColor ?? UIColor.systemBackgroundColor;
  },
});

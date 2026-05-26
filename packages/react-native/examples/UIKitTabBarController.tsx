import NativeScript from '@nativescript/react-native';

export type UIKitTabBarItem = {
  title: string;
  systemItem?: interop.Enum<typeof UITabBarSystemItem>;
};

export const UIKitTabBarControllerHost = NativeScript.defineUIViewController<{
  items: UIKitTabBarItem[];
  selectedIndex?: number;
}>({
  name: 'UIKitTabBarControllerHost',
  layout: {sizing: 'fill'},
  createController() {
    return UITabBarController.new();
  },
  update(controller, props) {
    const children = (props.items ?? []).map((item) => {
      const child = UIViewController.new();
      child.view.backgroundColor = UIColor.systemBackgroundColor;
      child.tabBarItem =
        item.systemItem == null
          ? UITabBarItem.alloc().initWithTitleImageTag(item.title, null, 0)
          : UITabBarItem.alloc().initWithTabBarSystemItemTag(item.systemItem, 0);
      return child;
    });

    controller.viewControllers = NSArray.arrayWithArray(children);
    controller.selectedIndex = Math.min(
      Math.max(props.selectedIndex ?? 0, 0),
      Math.max(children.length - 1, 0),
    );
  },
});

import NativeScript from '@nativescript/react-native';

export type QuickLookPreviewItem = {
  path: string;
};

const quickLookState = new WeakMap<QLPreviewController, {items: QuickLookPreviewItem[]}>();

export const QuickLookPreviewControllerHost = NativeScript.defineUIViewController<{
  items: QuickLookPreviewItem[];
}>({
  name: 'QuickLookPreviewControllerHost',
  layout: {sizing: 'fill'},
  createController(ctx) {
    NativeScript.loadFramework('QuickLook');
    const PreviewController =
      NativeScript.getClass<typeof QLPreviewController>('QLPreviewController');
    if (!PreviewController) {
      throw new Error('QLPreviewController is not available');
    }

    const controller = PreviewController.new();
    const state = {items: ctx.items ?? []};
    quickLookState.set(controller, state);

    const dataSource = NativeScript.createDelegate<QLPreviewControllerDataSource>(
      'QLPreviewControllerDataSource',
      {
        numberOfPreviewItemsInPreviewController() {
          return state.items.length;
        },
        previewControllerPreviewItemAtIndex(_controller, index) {
          const item = state.items[index];
          return item ? NSURL.fileURLWithPath(item.path) : null;
        },
      },
      {owner: ctx},
    );

    controller.dataSource = dataSource;
    ctx.dispose(() => {
      controller.dataSource = null;
      quickLookState.delete(controller);
    });

    return controller;
  },
  update(controller, props) {
    const state = quickLookState.get(controller);
    if (state) {
      state.items = props.items ?? [];
    }
    controller.reloadData();
  },
});

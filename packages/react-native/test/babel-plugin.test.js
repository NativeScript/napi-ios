const assert = require('assert');
const babel = require('@babel/core');
const plugin = require('../plugin/babel-plugin');

function transform(source) {
  return babel.transformSync(source, {
    ast: false,
    babelrc: false,
    configFile: false,
    plugins: [plugin],
  }).code;
}

const source = `
import NativeScript, {
  defineUIKitContainer,
  defineUIKitView,
  defineUIViewController,
} from '@nativescript/react-native';

defineUIKitView({
  create() {
    return UIView.new();
  },
  update: (view) => view.setNeedsLayout(),
});

NativeScript.defineUIViewController({
  createController() {
    return UIViewController.new();
  },
  mounted(controller) {
    controller.view.setNeedsLayout();
  },
  dispose() {},
});

defineUIKitContainer({
  create() {
    return {rootView: UIView.new(), childrenView: UIView.new()};
  },
});
`;

const output = transform(source);
const workletDirectiveCount = (output.match(/"worklet";/g) || []).length;
assert.strictEqual(workletDirectiveCount, 6);
assert(output.includes('create() {\n    "worklet";'));
assert(output.includes('update: view => {\n    "worklet";'));
assert(output.includes('createController() {\n    "worklet";'));

console.log('babel plugin tests passed');

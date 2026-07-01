const assert = require('assert');
const fs = require('fs');
const path = require('path');

const packageRoot = path.resolve(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(packageRoot, relativePath), 'utf8');
}

const nativeComponent = read('src/NativeScriptUIViewNativeComponent.ts');
assert(
  nativeComponent.includes('DirectEventHandler'),
  'NativeScriptUIViewNativeComponent should use a generated direct event type',
);
assert(
  nativeComponent.includes('hostReadyId?: string'),
  'NativeScriptUIViewNativeComponent should expose a stable readiness identity prop',
);
assert(
  nativeComponent.includes('onHostReady?: DirectEventHandler'),
  'NativeScriptUIViewNativeComponent should expose onHostReady',
);
assert(
  nativeComponent.includes('hasChildren: boolean'),
  'onHostReady should report whether RN children are attached',
);

const declarations = read('src/index.d.ts');
assert(
  declarations.includes('export type UIKitHostReadyEvent'),
  'public declarations should export UIKitHostReadyEvent',
);
assert(
  declarations.includes('onHostReady?: (event: UIKitHostReadyEvent) => void'),
  'public host props should expose onHostReady',
);

const index = read('src/index.ts');
assert(
  index.includes('hostReadyId: hostId'),
  'defineUIKitHost should pass a stable hostReadyId to the native host view',
);
assert(
  index.includes('onHostReady'),
  'defineUIKitHost should forward onHostReady to NativeScriptUIView',
);

const header = read('ios/NativeScriptUIView.h');
assert(
  header.includes('@property(nonatomic, copy) NSString* hostReadyId'),
  'NativeScriptUIView should store the readiness identity',
);
assert(
  header.includes('onHostReady'),
  'NativeScriptUIView should expose a Paper host-ready event block',
);

const manager = read('ios/NativeScriptUIViewManager.mm');
assert(
  manager.includes('RCT_EXPORT_VIEW_PROPERTY(hostReadyId, NSString)'),
  'Paper manager should export hostReadyId',
);
assert(
  manager.includes('RCT_EXPORT_VIEW_PROPERTY(onHostReady, RCTDirectEventBlock)'),
  'Paper manager should export onHostReady',
);

const fabricView = read('ios/Fabric/NativeScriptUIViewComponentView.mm');
assert(
  fabricView.includes('EventEmitters.h'),
  'Fabric component should import generated event emitters',
);
assert(
  fabricView.includes('onHostReady('),
  'Fabric component should emit onHostReady',
);

console.log('uikit host ready API tests passed');

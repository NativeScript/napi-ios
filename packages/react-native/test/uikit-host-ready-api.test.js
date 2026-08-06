const assert = require('assert');
const fs = require('fs');
const path = require('path');

const packageRoot = path.resolve(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(packageRoot, relativePath), 'utf8');
}

// Strip C/ObjC/TS comments so "must not ship RNS-specific hooks" assertions
// match against shipped code rather than RNS-parity documentation, which
// legitimately cites upstream sources (e.g. "RNS parity (RNSScreen.mm:155)").
function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/[^\n]*/g, '');
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
  nativeComponent.includes('emitOffWindowHostReady?: boolean'),
  'NativeScriptUIViewNativeComponent should expose explicit off-window host-ready policy',
);
assert(
  nativeComponent.includes('ignoreHostReadyWindowAttachment?: boolean'),
  'NativeScriptUIViewNativeComponent should expose window-attachment host-ready dedupe policy',
);
assert(
  nativeComponent.includes('onHostReady?: DirectEventHandler'),
  'NativeScriptUIViewNativeComponent should expose onHostReady',
);
assert(
  nativeComponent.includes('hasChildren: boolean'),
  'onHostReady should report whether RN children are attached',
);
assert(
  nativeComponent.includes('componentViewHandle: string'),
  'onHostReady should expose the Fabric component view handle',
);
assert(
  nativeComponent.includes('visibleDescendantCount: Int32') &&
    nativeComponent.includes('windowAttached: boolean'),
  'onHostReady should report windowed/deep descendant readiness',
);

const declarations = read('src/index.ts');
assert(
  declarations.includes('export type UIKitHostReadyEvent'),
  'public declarations should export UIKitHostReadyEvent',
);
assert(
  declarations.includes('onHostReady?: (event: UIKitHostReadyEvent) => void'),
  'public host props should expose onHostReady',
);
assert(
  declarations.includes('emitOffWindowHostReady?: boolean'),
  'public host props should expose explicit off-window host-ready policy',
);
assert(
  declarations.includes('ignoreHostReadyWindowAttachment?: boolean'),
  'public host props should expose window-attachment host-ready dedupe policy',
);
assert(
  declarations.includes('componentViewHandle: string'),
  'public host-ready event should expose the Fabric component view handle',
);
assert(
  declarations.includes('hostReady?: (') &&
    declarations.includes('event: UIKitHostReadyEvent'),
  'UIKit host definitions should expose a UI-worklet hostReady lifecycle',
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
assert(
  index.includes('const emitOffWindowHostReady = props.emitOffWindowHostReady === true') &&
    index.includes('emitOffWindowHostReady,'),
  'defineUIKitHost should forward explicit off-window host-ready policy to NativeScriptUIView',
);
assert(
  index.includes(
    'const ignoreHostReadyWindowAttachment =\n      props.ignoreHostReadyWindowAttachment === true;',
  ) && index.includes('ignoreHostReadyWindowAttachment,'),
  'defineUIKitHost should forward host-ready window-attachment dedupe policy to NativeScriptUIView',
);
assert(
  index.includes('const hostReadyHost = definition.hostReady') &&
    index.includes('function parseUIKitHostReadyEventJson') &&
    index.includes('phase === "hostReady"') &&
    index.includes('host.hostReady?.(nextProps, hostReadyEvent, host.previousProps)') &&
    index.includes('hostReadyHost?.('),
  'defineUIKitHost should dispatch host-ready directly through the UI-worklet lifecycle',
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
assert(
  header.includes('@property(nonatomic, assign) BOOL emitOffWindowHostReady'),
  'NativeScriptUIView should store explicit off-window host-ready policy',
);
assert(
  header.includes(
    '@property(nonatomic, assign) BOOL ignoreHostReadyWindowAttachment',
  ),
  'NativeScriptUIView should store host-ready window-attachment dedupe policy',
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
assert(
  manager.includes('RCT_EXPORT_VIEW_PROPERTY(emitOffWindowHostReady, BOOL)'),
  'Paper manager should export explicit off-window host-ready policy',
);
assert(
  manager.includes(
    'RCT_EXPORT_VIEW_PROPERTY(ignoreHostReadyWindowAttachment, BOOL)',
  ),
  'Paper manager should export host-ready window-attachment dedupe policy',
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
assert(
  fabricView.includes('NSDictionary<NSString*, id>* _pendingHostReadyEvent;') &&
    fabricView.includes('if (_eventEmitter == nullptr)') &&
    fabricView.includes('_pendingHostReadyEvent = [event copy];') &&
    fabricView.includes('- (void)updateEventEmitter:(const EventEmitter::Shared&)eventEmitter') &&
    fabricView.includes('[self emitHostReadyEvent:event];'),
  'Fabric component should replay hostReady events emitted before Fabric installs an event emitter',
);
assert(
  fabricView.includes('.visibleDescendantCount = [event[@"visibleDescendantCount"] intValue]') &&
    fabricView.includes('.windowAttached = [event[@"windowAttached"] boolValue]'),
  'Fabric host-ready events should forward window/deep-descendant readiness',
);
assert(
  fabricView.includes(
    '.componentViewHandle = RCTStringFromNSString(event[@"componentViewHandle"] ?: @""),',
  ),
  'Fabric host-ready events should forward the component view handle',
);
assert(
  fabricView.includes('oldViewProps->emitOffWindowHostReady') &&
    fabricView.includes('_containerView.emitOffWindowHostReady = newEmitOffWindowHostReady;') &&
    fabricView.includes('_containerView.emitOffWindowHostReady = NO;'),
  'Fabric component should forward and recycle explicit off-window host-ready policy',
);
assert(
  fabricView.includes('oldViewProps->ignoreHostReadyWindowAttachment') &&
    fabricView.includes(
      '_containerView.ignoreHostReadyWindowAttachment =\n        newIgnoreHostReadyWindowAttachment;',
    ) &&
    fabricView.includes('_containerView.ignoreHostReadyWindowAttachment = NO;'),
  'Fabric component should forward and recycle host-ready window-attachment dedupe policy',
);

const hostView = read('ios/NativeScriptUIView.mm');
const nativeApiModule = read('ios/NativeScriptNativeApiModule.mm');
const runtimeSource = read('src/index.ts');
const hostViewCode = stripComments(hostView);
const nativeApiModuleCode = stripComments(nativeApiModule);
const runtimeSourceCode = stripComments(runtimeSource);
assert(
  // NS_RNS_TRACE (trace macro) and NSRNS (RNS symbol prefix) must never appear
  // at all -- not even in comments -- since they only exist to ship a hook.
  !hostView.includes('NS_RNS_TRACE') &&
    !hostView.includes('NSRNS') &&
    !nativeApiModule.includes('NS_RNS_TRACE') &&
    !nativeApiModule.includes('NSRNS') &&
    !runtimeSource.includes('NS_RNS_TRACE') &&
    !runtimeSource.includes('NSRNS') &&
    // The RNSScreen* classes must not be referenced by shipped code, but the
    // parity-documented sources legitimately cite RNSScreen.mm in comments;
    // check only the comment-stripped code for a live class reference.
    !hostViewCode.includes('RNSScreen') &&
    !nativeApiModuleCode.includes('RNSScreen') &&
    !runtimeSourceCode.includes('RNSScreen'),
  'Generic UIKit host runtime should not ship react-native-screens-specific trace hooks',
);
assert(
  runtimeSource.includes('__nativeScriptUIKitHostTraceEvents') &&
    runtimeSource.includes('[NativeScript UIKitHost]'),
  'UIKit host runtime tracing should use generic NativeScript naming',
);
const lifecycleIndex = hostView.indexOf(
  '[self runUIKitHostLifecycle:@"hostReady" transactionJson:eventJson];',
);
const eventBlockIndex = hostView.indexOf('if (_onHostReady != nil)');
assert(
  lifecycleIndex >= 0 && lifecycleIndex < eventBlockIndex,
  'NativeScriptUIView should notify UI-worklet hostReady before the React onHostReady event',
);
assert(
  hostView.includes('NativeScriptChildrenViewVisibleDescendantCount') &&
    hostView.includes('event[@"componentViewHandle"] = NativeScriptHandleFromNSObject(self.superview);') &&
    hostView.includes('event[@"visibleDescendantCount"] = @(visibleDescendantCount);') &&
    hostView.includes('event[@"windowAttached"] = @(attachedWindow != nil);') &&
    hostView.includes(
      'return _childrenView.window ?: _nativeView.window ?: _viewController.view.window ?: self.window;',
    ) &&
    hostView.includes('[event[@"windowAttached"] boolValue] ? @"1" : @"0"') &&
    hostView.includes('event[@"visibleDescendantCount"] ?: @(0)'),
  'NativeScriptUIView should re-emit host-ready when window/deep descendant readiness changes without handle changes',
);
assert(
  index.includes('componentViewHandle: stringValue(event.componentViewHandle)'),
  'UI-worklet host-ready parser should expose componentViewHandle',
);
assert(
  hostView.includes(
    'event[@"nativeViewHandle"] =\n      _nativeView != nil ? NativeScriptHandleFromNSObject(_nativeView) : (_nativeViewHandle ?: @"");',
  ) &&
    hostView.includes(
      '_nativeView != nil ? NativeScriptHandleFromNSObject(_nativeView)\n                                       : (_nativeViewHandle ?: @"")',
    ) &&
    hostView.includes(
      '@"nativeViewHandle" :\n        _nativeView != nil ? NativeScriptHandleFromNSObject(_nativeView) : (_nativeViewHandle ?: @""),',
    ),
  'NativeScriptUIView should publish the stored native view handle when a controller view is intentionally detached from the host wrapper',
);
assert(
  hostView.includes('NSString* _lastHostReadyShallowKey') &&
    hostView.includes('NativeScriptAppendSubviewTopology') &&
    hostView.includes(
      '- (NSString*)hostReadyShallowKeyWithHasChildren:(BOOL)hasChildren\n                                 attachedWindow:(UIWindow*)attachedWindow',
    ) &&
    hostView.includes(
      'if (_lastHostReadyKey != nil && [_lastHostReadyShallowKey isEqualToString:shallowKey])',
    ) &&
    hostView.includes('_lastHostReadyShallowKey = [shallowKey copy];'),
  'NativeScriptUIView should skip duplicate host-ready deep descendant walks when shallow host topology is unchanged',
);
const shallowKeyStart = hostView.indexOf(
  '- (NSString*)hostReadyShallowKeyWithHasChildren:',
);
const shallowKeyEnd = hostView.indexOf('- (void)notifyHostReadyIfNeeded', shallowKeyStart);
const shallowKeySource = hostView.slice(shallowKeyStart, shallowKeyEnd);
assert(
  !shallowKeySource.includes('NativeScriptHandleFromNSObject(self.superview)'),
  'NativeScriptUIView should not re-emit host-ready just because UIKit reattached the Fabric wrapper under a different same-window superview',
);
assert(
  hostView.includes('UIWindow* attachedWindow = [self hostReadyAttachedWindow];') &&
    hostView.includes('if (attachedWindow == nil && !_emitOffWindowHostReady)') &&
    hostView.includes('attachedWindow:attachedWindow'),
  'NativeScriptUIView should suppress transient detached host-ready events unless the host explicitly opts in',
);
assert(
  hostView.includes(
    '- (void)setIgnoreHostReadyWindowAttachment:(BOOL)ignoreHostReadyWindowAttachment',
  ) &&
    hostView.includes(
      'void* windowKey = _ignoreHostReadyWindowAttachment ? NULL : (void*)attachedWindow;',
    ) &&
    hostView.includes('windowKey];'),
  'NativeScriptUIView should be able to dedupe host-ready snapshots across window attach for hosts that already certified off-window content',
);

console.log('uikit host ready API tests passed');

// BatchOps.mm — iteration-5 Stage 2: the native subtree-fill walker
// (dev-notes/perf/iteration-5-batching-design.md §B.6, the `kind 4`
// `fillSubviews` op). Moves the pure-geometry recursive walk performed by
// the adapter's `layoutHostedReactSubviews` / `enableHostedInteraction` /
// `layoutHostedSubviewChain` (packages/react-native-screens/src/
// NativeScriptScreenStack.tsx :2638/:2621/:2597 at the design's pin; the
// design's own line refs were :2609/:2592/:2568 against a slightly earlier
// snapshot of the same file) into ONE native crossing instead of ~4-8
// per hosted view. Every decision mirrored below is pure geometry, cited
// from the exact JS it replaces -- see each function's comment.
//
// Textually included by the Hermes engine JSI translation unit (see the
// #include block near the top of that file), same convention as every
// other shared bridge TU. Must
// appear AFTER host_objects/Object.mm (for NativeApiObjectHostObject) and
// AFTER ObjCBridge.mm (for makeString) -- both already true at the include
// site chosen (immediately before HostObject.mm's own #include).
//
// Scope note: the design's §B.6/B.8 describes this as one kind (`4`) of a
// larger generic `__applyOps` op-list executor whose other kinds (0/1/2/3/5
// -- property set/call/allocInit/read/makeDictionary) are Stage 3+ work, out
// of scope this iteration. Rather than stand up the generic op-list
// plumbing now to host a single op, this file exposes the walker directly
// as its own host function, `__nsFillHostedSubtree` -- a deliberate,
// documented narrowing of B.8's `__applyOps` entry point to exactly what
// Stage 2 needs. Stage 3 can fold this into the generic executor's kind-4
// handler without changing this function's body.
//
// Threading/locking (design §B.8, NativeScriptNativeApiModule.mm:960-985):
// this runs on main, under the worklet runtimeMutex_, exactly like every
// other crossing from a host lifecycle call -- no dispatch_sync to main, no
// semaphores, no afterScreenUpdates:YES snapshot APIs. Every call below is a
// plain synchronous UIKit property get/set; nothing here can block.
//
// Never calls -description anywhere (the hazard fixed in 33b583af) -- the
// one error string this file can produce uses NSException.name (a plain
// NSString property, not a description call) and static literals only.

namespace nativescript {

// Both walkers below are pure UIKit code (UIView/UIScrollView/UIWindow).
// This shared TU is compiled into BOTH the Hermes and the V8/napi-cli
// backends, and the V8/napi-cli backend also targets non-iOS platforms
// (macOS/tvOS/visionOS via the standalone CLI build) that either lack
// UIKit entirely or -- unlike the Hermes path's CocoaPods/Xcode-project
// build, which gets an implicit UIKit import from its target's prefix
// header -- never import it in this translation unit at all. Guarded
// the same way as the codebase's existing UIKit-only code (see
// host_objects/Appearance.mm's `#if TARGET_OS_IPHONE`); the matching
// __nsFillHostedSubtree/__nsScanAttachedContentPresence registrations in
// HostObject.mm carry the identical guard, so on a non-iOS build these
// two ops are simply absent (`typeof api.__nsFillHostedSubtree !==
// 'function'`) and every JS call site already fails open to its
// original walk in that case -- never a crash, never new behavior.
#if TARGET_OS_IPHONE

// Mirrors `isNativeScrollView` (NativeScriptScreenStack.tsx :2565).
inline bool NsFillIsScrollView(UIView* view) {
  return view != nil && [view isKindOfClass:[UIScrollView class]];
}

// Mirrors `shouldFillHostedSubview` (:2577).
inline bool NsFillShouldFillSubview(UIView* rootView, UIView* subview) {
  if (rootView == nil || subview == nil) {
    return false;
  }
  CGRect parentBounds = rootView.bounds;
  CGFloat parentWidth = parentBounds.size.width;
  if (parentWidth <= 0) {
    return false;
  }
  CGRect frame = subview.frame;
  CGFloat childWidth = frame.size.width;
  return fabs(frame.origin.x) < 1 && fabs(frame.origin.y) < 1 &&
         (childWidth <= 0 || fabs(childWidth - parentWidth) < 2);
}

// Mirrors `layoutHostedSubviewChain` (:2597) -- depth cap 8 (fill),
// UIScrollView subtrees stop the recursion, autoresizingMask = 18
// (flexible width | flexible height, `flexibleSizeMask()` :2559-:2563).
inline void NsFillSubviewChain(UIView* rootView, int depth) {
  if (rootView == nil || depth > 8 || NsFillIsScrollView(rootView)) {
    return;
  }
  NSArray<UIView*>* subviews = rootView.subviews;
  CGRect rootBounds = rootView.bounds;
  for (UIView* subview in subviews) {
    if (subview == nil || !NsFillShouldFillSubview(rootView, subview)) {
      continue;
    }
    subview.frame = rootBounds;
    subview.autoresizingMask =
        UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    NsFillSubviewChain(subview, depth + 1);
  }
}

// Mirrors `enableHostedInteraction` (:2621) -- depth cap 12.
inline void NsFillEnableInteraction(UIView* rootView, int depth) {
  if (rootView == nil || depth > 12) {
    return;
  }
  rootView.userInteractionEnabled = YES;
  NSArray<UIView*>* subviews = rootView.subviews;
  for (UIView* subview in subviews) {
    NsFillEnableInteraction(subview, depth + 1);
  }
}

struct NsFillResult {
  bool ok;
  double boundsW;
  double boundsH;
  double count;
  double firstChildCount;
  double firstFrameW;
  double firstFrameH;
};

// The op body -- mirrors `layoutHostedReactSubviews`'s FILL section
// (:2690-:2702; the memo CHECK above it, and the memo STORE below it, both
// stay in JS untouched -- see the JS call site's comment). `rootView` is
// the screen controller's `.view` (resolved by the JS caller before this is
// invoked, exactly as today). Returns the primitive signature inputs
// (:2652-:2678) read BEFORE the fill mutates anything -- bounds w/h,
// direct-subview count, first-child subview count, first-subview frame w/h
// -- so a caller that wants them never needs a second crossing.
inline NsFillResult NsFillHostedSubtree(UIView* rootView) {
  NsFillResult result{false, -1, -1, 0, 0, -1, -1};
  if (rootView == nil) {
    return result;
  }

  NSArray<UIView*>* subviews = rootView.subviews;
  NSUInteger count = subviews.count;
  CGRect bounds = rootView.bounds;
  UIView* firstSub = count > 0 ? subviews[0] : nil;
  NSUInteger firstChildCount = firstSub != nil ? firstSub.subviews.count : 0;
  CGSize firstFrameSize = firstSub != nil ? firstSub.frame.size : CGSizeZero;

  result.ok = true;
  result.boundsW = bounds.size.width;
  result.boundsH = bounds.size.height;
  result.count = (double)count;
  result.firstChildCount = (double)firstChildCount;
  result.firstFrameW = firstSub != nil ? firstFrameSize.width : -1;
  result.firstFrameH = firstSub != nil ? firstFrameSize.height : -1;

  NsFillEnableInteraction(rootView, 0);

  for (UIView* subview in subviews) {
    if (subview == nil) {
      continue;
    }
    subview.frame = bounds;
    subview.autoresizingMask =
        UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    NsFillSubviewChain(subview, 0);
  }

  return result;
}

// jsi-facing entry point: builds the `[err, boundsW, boundsH, count,
// firstChildCount, firstFrameW, firstFrameH]` return array. Never throws --
// a bad argument or an ObjC exception mid-walk becomes a non-empty `err`
// string (matching the engine's swallow-don't-abort rule, e.g.
// `configureSearchBar`'s comment in the adapter), never a JS exception.
inline Value NsFillHostedSubtreeReturnArray(Runtime& runtime,
                                            const std::string& err,
                                            const NsFillResult& result) {
  Array out(runtime, 7);
  out.setValueAtIndex(runtime, 0, makeString(runtime, err));
  out.setValueAtIndex(runtime, 1, Value(result.boundsW));
  out.setValueAtIndex(runtime, 2, Value(result.boundsH));
  out.setValueAtIndex(runtime, 3, Value(result.count));
  out.setValueAtIndex(runtime, 4, Value(result.firstChildCount));
  out.setValueAtIndex(runtime, 5, Value(result.firstFrameW));
  out.setValueAtIndex(runtime, 6, Value(result.firstFrameH));
  return out;
}

inline Value NsFillHostedSubtreeHostFunction(Runtime& runtime, const Value&,
                                             const Value* args, size_t count) {
  NsFillResult empty{false, -1, -1, 0, 0, -1, -1};
  if (count < 1 || !args[0].isObject()) {
    return NsFillHostedSubtreeReturnArray(runtime, "bad-arg", empty);
  }
  id object = NativeApiObjectHostObject::nativeObjectFromValue(runtime, args[0]);
  if (object == nil || ![object isKindOfClass:[UIView class]]) {
    return NsFillHostedSubtreeReturnArray(runtime, "not-a-view", empty);
  }

  UIView* rootView = (UIView*)object;
  NsFillResult result = empty;
  std::string err;
  @try {
    result = NsFillHostedSubtree(rootView);
  } @catch (NSException* exception) {
    // NSException.name is a plain NSString property read, never a
    // -description call (the hazard fixed in 33b583af).
    NSString* name = exception.name ?: @"NSException";
    err = std::string("exc:") + (name.UTF8String ?: "unknown");
    result = empty;
  }

  return NsFillHostedSubtreeReturnArray(runtime, err, result);
}

// iteration-6 JOB 2: the tabs host content-presence scan walker.
//
// Mirrors the tabs adapter's `attachedDescendantContentPresence` /
// `selectedTabAttachedContentPresence` (react-native-screens-nativescript-
// tabs-snapshot repo, src/components/tabs/native-script/NativeScriptTabs.ios.tsx
// :2128-:2262 at this op's pin -- the PRESENCE-only, early-exit variant, not
// the exact-count `attachedDescendantContentCounts` sibling which is only
// used by exported test utilities, never on the cold-launch hot path). A
// read-only recursive tree walk computing two booleans (does the subtree
// have >=1 visible descendant? >=1 interactive descendant?), depth cap 16,
// early-exit the instant BOTH are true.
//
// This is the walk that dominates the tabs host's cold-launch
// `mountChild`/`transactionCommitted` crossing counts (663/87/1067/455
// measured pre-fix, dev-notes/perf/iteration-4-phases.md +
// iteration-5a-results.md): at first commit, content frames often still
// read zero-size until layout catches up, so the early-exit rarely fires
// and the walk runs close to the full freshly-mounted subtree, at ~5-7
// crossings per node (subviews array fetch + hidden + alpha + window +
// frame + userInteractionEnabled + accessibilityElementsHidden, each a
// separate FFI round-trip through the JS-side `arrayCount`/`arrayItem`
// helpers). One native crossing replaces the whole walk.
//
// Read-only: never mutates any view (unlike NsFillHostedSubtree above).
// Never calls -description (33b583af).
struct NsContentPresenceResult {
  bool ok;
  bool visible;
  bool interactive;
};

// Mirrors `selectedTabSubviewWindowIsCompatible` + the per-subview
// hidden/alpha/frame/interactive checks inside
// `attachedDescendantContentPresence`'s loop body verbatim.
inline void NsScanContentPresenceRecurse(UIView* view, UIWindow* rootWindow,
                                         bool* visible, bool* interactive,
                                         int depth) {
  if (view == nil || depth > 16 || (*visible && *interactive)) {
    return;
  }
  NSArray<UIView*>* subviews = view.subviews;
  for (UIView* subview in subviews) {
    if (*visible && *interactive) {
      return;
    }
    if (subview == nil || subview.hidden || subview.alpha <= 0.01) {
      continue;
    }
    UIWindow* subviewWindow = subview.window;
    if (rootWindow != nil && subviewWindow != nil &&
        subviewWindow != rootWindow) {
      continue;
    }

    CGRect frame = subview.frame;
    if (isfinite(frame.size.width) && frame.size.width > 0 &&
        isfinite(frame.size.height) && frame.size.height > 0) {
      *visible = true;
      if (subview.userInteractionEnabled &&
          !subview.accessibilityElementsHidden) {
        *interactive = true;
      }
    }

    NsScanContentPresenceRecurse(subview, rootWindow, visible, interactive,
                                 depth + 1);
  }
}

// Mirrors `selectedTabAttachedContentPresence` -- the root window is read
// ONCE (`view?.window ?? null`) and threaded down unchanged through the
// whole recursion, exactly like the JS.
inline NsContentPresenceResult NsScanAttachedContentPresence(
    UIView* rootView) {
  NsContentPresenceResult result{false, false, false};
  if (rootView == nil) {
    return result;
  }
  UIWindow* rootWindow = rootView.window;
  bool visible = false;
  bool interactive = false;
  NsScanContentPresenceRecurse(rootView, rootWindow, &visible, &interactive,
                               0);
  result.ok = true;
  result.visible = visible;
  result.interactive = interactive;
  return result;
}

// jsi-facing entry point: `[err, visible(0/1), interactive(0/1)]`. Never
// throws -- a bad argument or an ObjC exception mid-walk becomes a
// non-empty `err` string, never a JS exception (same convention as
// NsFillHostedSubtreeHostFunction above).
inline Value NsScanAttachedContentPresenceReturnArray(
    Runtime& runtime, const std::string& err,
    const NsContentPresenceResult& result) {
  Array out(runtime, 3);
  out.setValueAtIndex(runtime, 0, makeString(runtime, err));
  out.setValueAtIndex(runtime, 1, Value(result.visible ? 1 : 0));
  out.setValueAtIndex(runtime, 2, Value(result.interactive ? 1 : 0));
  return out;
}

inline Value NsScanAttachedContentPresenceHostFunction(Runtime& runtime,
                                                        const Value&,
                                                        const Value* args,
                                                        size_t count) {
  NsContentPresenceResult empty{false, false, false};
  if (count < 1 || !args[0].isObject()) {
    return NsScanAttachedContentPresenceReturnArray(runtime, "bad-arg", empty);
  }
  id object = NativeApiObjectHostObject::nativeObjectFromValue(runtime, args[0]);
  if (object == nil || ![object isKindOfClass:[UIView class]]) {
    return NsScanAttachedContentPresenceReturnArray(runtime, "not-a-view",
                                                     empty);
  }

  UIView* rootView = (UIView*)object;
  NsContentPresenceResult result = empty;
  std::string err;
  @try {
    result = NsScanAttachedContentPresence(rootView);
  } @catch (NSException* exception) {
    // NSException.name is a plain NSString property read, never a
    // -description call (the hazard fixed in 33b583af).
    NSString* name = exception.name ?: @"NSException";
    err = std::string("exc:") + (name.UTF8String ?: "unknown");
    result = empty;
  }

  return NsScanAttachedContentPresenceReturnArray(runtime, err, result);
}

// iteration-8: the native tabs `mountChild` embedded-navigation-controller
// resolver. Mirrors `embeddedNavigationControllerRecordOnView` +
// `embeddedNavigationControllerRecordInMountedTabsChildSubviewTree` +
// `embeddedNavigationControllerRecordForMountedTabsChild`'s SECOND
// (descendant-BFS) pass -- react-native-screens-nativescript-tabs-snapshot
// repo, src/components/tabs/native-script/NativeScriptTabs.ios.tsx
// :1975/:4196/:4313-:4327 at this op's pin. This is the walk that dominates
// the tabs host's cold-launch `mountChild` crossing count (663 measured,
// dev-notes/perf/iteration-4-phases.md + iteration-6-measurement.md): up to
// 16 mount-child candidates, each BFS-scanned (queue cap 64, subview
// fan-out cap 16/node) for an ancestor/descendant carrying a stored
// UINavigationController, at ~1-2 crossings per visited node. One native
// crossing replaces the whole scan across ALL candidates.
//
// Two-tier associated-object lookup (mirrors `associatedObjectForKey` +
// its `ASSOCIATED_HANDLE_SUFFIX`/`ASSOCIATED_VALUE_SUFFIX` convention
// exactly): tier 1 reads `<key>.NativeScriptHandle`; if that is a non-empty
// NSString, it is parsed as a pointer address (same grammar as
// `interop.object`'s string branch -- see `parseIntegerTextToUintptr` in
// Callbacks.mm, decimal or `0x`-prefixed hex, optional leading `-`) and
// cast back to `id` (an intentionally UNSAFE raw-pointer resolution --
// this is the SAME risk profile as the existing JS `nativeObjectFromHandle`
// mechanism this mirrors, not a new one introduced here) -- and that tier's
// result (possibly nil, if the address failed to parse) is returned
// WITHOUT falling through to tier 2, exactly matching
// `associatedObjectForKey`'s `if (typeof handle === 'string' && ...) return
// nativeObjectFromHandle(handle);` (a non-empty handle string always short-
// circuits, even to a nil result). Only when tier 1 has no handle string at
// all does tier 2 read `<key>.NativeScriptValue` directly. The association
// KEY derivation (`sel_registerName((key + suffix).c_str())`) matches
// TypeConv.mm's `interop.set/getAssociatedObject` exactly -- these read the
// SAME `objc_getAssociatedObject` slots that mechanism writes.
//
// Deliberate, documented narrowing vs the JS original: the JS-expando tier
// (`view.__nativeScriptNavigationController` etc, checked BEFORE the
// associated-object read in `embeddedNavigationControllerRecordOnView`) is
// not replicated here. This native walker operates on raw `id`s reached via
// live view-hierarchy traversal, never through a JS proxy wrapper -- there
// is no JS object identity for an expando to have been set on in the first
// place (the same reason JS expandos on NS proxies never round-trip, see
// the codebase's "Memo expando/proxy trap" precedent) -- so that tier is
// unreachable dead code in this call shape, not a behavior change.
//
// nextResponder-chain fallback tier (mirrors `nextResponderForObject`):
// only reachable for `UIResponder`-kind receivers (UIView/UIViewController,
// the only two candidate shapes this system ever produces), reading the
// plain `.nextResponder` property (the JS's function-call branch is
// unreachable for a real UIResponder -- `nextResponder` bridges as a
// property, never a callable -- so only the JS's property-read fallback
// branch applies here).
inline id NsAssociatedObjectForKey(id object, const char* key) {
  if (object == nil) {
    return nil;
  }

  std::string handleKey = std::string(key) + ".NativeScriptHandle";
  id handleAssoc =
      objc_getAssociatedObject(object, sel_registerName(handleKey.c_str()));
  if ([handleAssoc isKindOfClass:[NSString class]]) {
    NSString* handleStr = (NSString*)handleAssoc;
    if (handleStr.length > 0) {
      uintptr_t address = 0;
      const char* utf8 = handleStr.UTF8String;
      std::string text = utf8 != nullptr ? std::string(utf8) : std::string();
      if (parseIntegerTextToUintptr(text, &address) && address != 0) {
        return (__bridge id)(void*)address;
      }
      // Non-empty handle string that failed to resolve: matches JS's
      // `nativeObjectFromHandle` returning null WITHOUT falling through to
      // the `.NativeScriptValue` tier -- see the comment above.
      return nil;
    }
  }

  std::string valueKey = std::string(key) + ".NativeScriptValue";
  return objc_getAssociatedObject(object, sel_registerName(valueKey.c_str()));
}

struct NsEmbeddedNavRecord {
  bool ok;
  id containerView;
  id navigationController;
  id navigationView;
};

// Mirrors `embeddedNavigationControllerRecordOnView` (tabs snapshot
// :1975-:2023 at this op's pin) verbatim, minus the dead JS-expando tier
// (see the block comment above).
inline NsEmbeddedNavRecord NsEmbeddedNavRecordOnView(id view) {
  NsEmbeddedNavRecord empty{false, nil, nil, nil};
  if (view == nil) {
    return empty;
  }

  id navigationController = NsAssociatedObjectForKey(
      view, "react-native-screens.NativeScriptStackNavigationController");
  if (navigationController != nil &&
      [navigationController
          respondsToSelector:@selector(popToRootViewControllerAnimated:)]) {
    id containerView = NsAssociatedObjectForKey(
        view, "react-native-screens.NativeScriptStackContainerView");
    if (containerView == nil) {
      containerView = view;
    }
    id navigationView = NsAssociatedObjectForKey(
        view,
        "react-native-screens.NativeScriptStackEmbeddedNavigationView");
    if (navigationView == nil &&
        [navigationController isKindOfClass:[UIViewController class]]) {
      navigationView = ((UIViewController*)navigationController).view;
    }
    return NsEmbeddedNavRecord{true, containerView, navigationController,
                               navigationView};
  }

  id responder = nil;
  if ([view isKindOfClass:[UIResponder class]]) {
    responder = ((UIResponder*)view).nextResponder;
  }
  if (responder != nil &&
      [responder
          respondsToSelector:@selector(popToRootViewControllerAnimated:)]) {
    id responderView = nil;
    if ([responder isKindOfClass:[UIViewController class]]) {
      responderView = ((UIViewController*)responder).view;
    }
    return NsEmbeddedNavRecord{true, view, responder, responderView};
  }

  return empty;
}

// Mirrors `embeddedNavigationControllerRecordInMountedTabsChildSubviewTree`
// (:4196-:4240 at this op's pin) -- BFS, queue cap 64 nodes PROCESSED
// (matching the JS's `cursor < 64`, not a cap on total enqueued), subview
// fan-out capped to 16 children per node
// (`Math.min(arrayCount(subviews), 16)`). The JS's unused
// `_navigationControllerRecordForHost` parameter (a per-descendant host-
// record probe the JS's own comment says was already tried and reverted
// for being ~900ms/mount -- "No per-descendant host-record probe") is
// correctly NOT replicated here; it is dead code in the JS too.
inline NsEmbeddedNavRecord NsEmbeddedNavRecordInSubviewTree(id rootView) {
  NsEmbeddedNavRecord empty{false, nil, nil, nil};
  if (rootView == nil) {
    return empty;
  }

  NSMutableArray* queue = [NSMutableArray arrayWithObject:rootView];
  NSUInteger cursor = 0;

  while (cursor < queue.count && cursor < 64) {
    id view = queue[cursor];
    cursor += 1;
    if (view == nil) {
      continue;
    }

    NsEmbeddedNavRecord directRecord = NsEmbeddedNavRecordOnView(view);
    if (directRecord.ok && directRecord.navigationController != nil) {
      return directRecord;
    }

    // A mount-child candidate can be a UIViewController (no `.subviews`,
    // matching JS's `view.subviews` reading `undefined` off a controller
    // and `arrayCount` treating that as 0) as well as a UIView.
    if (![view isKindOfClass:[UIView class]]) {
      continue;
    }
    NSArray<UIView*>* subviews = ((UIView*)view).subviews;
    NSUInteger subviewCount = subviews.count;
    if (subviewCount > 16) {
      subviewCount = 16;
    }
    for (NSUInteger i = 0; i < subviewCount; i++) {
      UIView* subview = subviews[i];
      if (subview != nil) {
        [queue addObject:subview];
      }
    }
  }

  return empty;
}

// Wraps a (possibly nil) resolved native object exactly like
// `interop.object`/`interop.getAssociatedObject` do (TypeConv.mm) -- same
// `nativeObjectReturnTypeForClass` classification +
// `convertNativeReturnValue` construction, so the JS side gets back a
// normal live host-object wrapper, indistinguishable from one produced by
// any other native call.
inline Value NsWrapMaybeNativeObject(
    Runtime& runtime, const std::shared_ptr<NativeApiBridge>& bridge,
    id object) {
  if (object == nil) {
    return Value::null();
  }
  NativeApiType type = nativeObjectReturnTypeForClass(object_getClass(object));
  id boxed = object;
  return convertNativeReturnValue(runtime, bridge, type, &boxed);
}

// jsi-facing entry point: `[err, ok(0/1), containerView, navigationController,
// navigationView]`. `err !== ''` means the op itself failed (bad argument or
// a native exception) -- the JS caller must fall back to its original
// per-candidate loop, same convention as the two walkers above. `err === ''`
// with `ok === 0` is a TRUSTED negative (the scan ran cleanly across every
// candidate and found nothing) -- the JS caller must NOT re-run the
// original walk in that case, or the crossing-count win is lost. Never
// calls -description (33b583af).
inline Value NsResolveEmbeddedNavRecordReturnArray(
    Runtime& runtime, const std::shared_ptr<NativeApiBridge>& bridge,
    const std::string& err, const NsEmbeddedNavRecord& record) {
  Array out(runtime, 5);
  out.setValueAtIndex(runtime, 0, makeString(runtime, err));
  out.setValueAtIndex(runtime, 1, Value(record.ok ? 1 : 0));
  out.setValueAtIndex(runtime, 2,
                      NsWrapMaybeNativeObject(runtime, bridge, record.containerView));
  out.setValueAtIndex(
      runtime, 3,
      NsWrapMaybeNativeObject(runtime, bridge, record.navigationController));
  out.setValueAtIndex(runtime, 4,
                      NsWrapMaybeNativeObject(runtime, bridge, record.navigationView));
  return out;
}

inline Value NsResolveEmbeddedNavigationControllerHostFunction(
    Runtime& runtime, const std::shared_ptr<NativeApiBridge>& bridge,
    const Value* args, size_t count) {
  NsEmbeddedNavRecord empty{false, nil, nil, nil};
  if (count < 1 || !args[0].isObject() ||
      !args[0].asObject(runtime).isArray(runtime)) {
    return NsResolveEmbeddedNavRecordReturnArray(runtime, bridge, "bad-arg",
                                                 empty);
  }

  Array candidates = args[0].asObject(runtime).getArray(runtime);
  size_t candidateCount = candidates.size(runtime);

  NsEmbeddedNavRecord result = empty;
  std::string err;
  @try {
    for (size_t index = 0; index < candidateCount; index += 1) {
      Value candidateValue = candidates.getValueAtIndex(runtime, index);
      if (!candidateValue.isObject()) {
        continue;
      }
      id candidate = NativeApiObjectHostObject::nativeObjectFromValue(
          runtime, candidateValue);
      if (candidate == nil) {
        continue;
      }
      NsEmbeddedNavRecord record = NsEmbeddedNavRecordInSubviewTree(candidate);
      if (record.ok && record.navigationController != nil) {
        result = record;
        break;
      }
    }
  } @catch (NSException* exception) {
    // NSException.name is a plain NSString property read, never a
    // -description call (the hazard fixed in 33b583af).
    NSString* name = exception.name ?: @"NSException";
    err = std::string("exc:") + (name.UTF8String ?: "unknown");
    result = empty;
  }

  return NsResolveEmbeddedNavRecordReturnArray(runtime, bridge, err, result);
}

#endif  // TARGET_OS_IPHONE

}  // namespace nativescript

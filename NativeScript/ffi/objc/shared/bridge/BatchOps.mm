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
// Textually included by NativeApiJsi.mm (see the #include block near the
// top of that file), same convention as every other shared bridge TU. Must
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

}  // namespace nativescript

#include "NativeScriptNativeApiModule.h"

#import <Foundation/Foundation.h>
#import <TargetConditionals.h>
#import <UIKit/UIKit.h>

#include <atomic>
#include <memory>
#include <mutex>
#include <utility>
#include <dispatch/dispatch.h>
#import <objc/runtime.h>

#include "NativeApiJsiReactNative.h"
#include "../native-api/ffi/shared/bridge/InteropProfiler.h"
#include "NativeScriptUIKitHost.h"
#import "Fabric/NativeScriptUIViewComponentView.h"

#import <React/RCTBridge+Private.h>
#import <React/RCTBridgeConstants.h>
#import <React/RCTConvert.h>
#if __has_include(<React/RCTComponentViewProtocol.h>) && \
    __has_include(<react/renderer/components/view/YogaStylableProps.h>)
#import <React/RCTComponentViewProtocol.h>
#include <react/renderer/components/view/YogaStylableProps.h>
#define NATIVESCRIPT_RN_FABRIC_VIEW_TRAITS_AVAILABLE 1
#else
#define NATIVESCRIPT_RN_FABRIC_VIEW_TRAITS_AVAILABLE 0
#endif
#import <React/RCTImageLoader.h>
#import <React/RCTImageSource.h>
#import <React/RCTResizeMode.h>
#import <ReactCommon/RCTTurboModule.h>
#include <worklets/Compat/Holders.h>
#include <worklets/WorkletRuntime/WorkletRuntime.h>

namespace {

std::string pathForResource(NSBundle* bundle, NSString* name, NSString* type) {
  if (bundle == nil) {
    return "";
  }
  NSString* path = [bundle pathForResource:name ofType:type];
  return path != nil ? path.UTF8String : "";
}

std::string bundledMetadataPath() {
#if TARGET_OS_SIMULATOR
#if defined(__x86_64__)
  NSString* metadataName = @"metadata.ios-sim.x86_64";
#else
  NSString* metadataName = @"metadata.ios-sim.arm64";
#endif
#else
  NSString* metadataName = @"metadata.ios.arm64";
#endif

  std::string path = pathForResource([NSBundle mainBundle], metadataName, @"nsmd");
  if (!path.empty()) {
    return path;
  }

  Class providerClass = NSClassFromString(@"NativeScriptNativeApiModuleProvider");
  NSBundle* providerBundle = providerClass != Nil ? [NSBundle bundleForClass:providerClass] : nil;
  NSString* resourceBundlePath = [providerBundle pathForResource:@"NativeScriptNativeApi"
                                                          ofType:@"bundle"];
  NSBundle* resourceBundle =
      resourceBundlePath != nil ? [NSBundle bundleWithPath:resourceBundlePath] : nil;

  path = pathForResource(resourceBundle, metadataName, @"nsmd");
  if (!path.empty()) {
    return path;
  }

  return pathForResource(resourceBundle, @"metadata", @"nsmd");
}

void writeSmokeMarkerIfRequested(const char* stage) {
  const char* enabled = getenv("NATIVESCRIPT_RN_TURBO_SMOKE_MARKER");
  if (enabled == nullptr || enabled[0] == '\0') {
    return;
  }

  NSString* path =
      [NSTemporaryDirectory() stringByAppendingPathComponent:@"NativeScriptNativeApiSmoke.marker"];
  NSString* content = [NSString stringWithFormat:@"stage=%s\n", stage != nullptr ? stage : ""];
  [content writeToFile:path atomically:YES encoding:NSUTF8StringEncoding error:nil];
}

bool writeSmokeMarkerContentIfRequested(const std::string& content) {
  const char* enabled = getenv("NATIVESCRIPT_RN_TURBO_SMOKE_MARKER");
  if (enabled == nullptr || enabled[0] == '\0') {
    return false;
  }

  NSString* path =
      [NSTemporaryDirectory() stringByAppendingPathComponent:@"NativeScriptNativeApiSmoke.marker"];
  NSString* nativeContent = [[NSString alloc] initWithBytes:content.data()
                                                     length:content.size()
                                                   encoding:NSUTF8StringEncoding];
  if (nativeContent == nil) {
    nativeContent = @"";
  }

  BOOL ok = [nativeContent writeToFile:path atomically:YES encoding:NSUTF8StringEncoding error:nil];
#if !__has_feature(objc_arc)
  [nativeContent release];
#endif
  return ok == YES;
}

bool nativeApiInstalled(facebook::jsi::Runtime& runtime) {
  return runtime.global().hasProperty(runtime, "__nativeScriptNativeApi");
}

NSString* nativeScriptHandleFromNSObject(id object) {
  if (object == nil) {
    return @"";
  }

  return [NSString stringWithFormat:@"%p", object];
}

id nativeScriptNSObjectFromHandle(NSString* handle) {
  if (handle == nil || handle.length == 0) {
    return nil;
  }

  const char* text = handle.UTF8String;
  if (text == nullptr || text[0] == '\0') {
    return nil;
  }

  char* end = nullptr;
  unsigned long long address = strtoull(text, &end, 0);
  if (address == 0 || end == text || (end != nullptr && *end != '\0')) {
    return nil;
  }

  return reinterpret_cast<id>(static_cast<uintptr_t>(address));
}

NSString* nativeScriptStringFromJSIValue(facebook::jsi::Runtime& runtime,
                                         const facebook::jsi::Value& value) {
  if (!value.isString()) {
    return nil;
  }

  std::string text = value.asString(runtime).utf8(runtime);
  return [NSString stringWithUTF8String:text.c_str()];
}

id nativeScriptObjCSelectorArgumentFromJSIValue(facebook::jsi::Runtime& runtime,
                                               const facebook::jsi::Value& value) {
  if (value.isNull() || value.isUndefined()) {
    return [NSNull null];
  }
  if (value.isBool()) {
    return [NSNumber numberWithBool:value.getBool() ? YES : NO];
  }
  if (value.isNumber()) {
    return [NSNumber numberWithDouble:value.getNumber()];
  }
  if (value.isString()) {
    NSString* text = nativeScriptStringFromJSIValue(runtime, value);
    id object = nativeScriptNSObjectFromHandle(text);
    return object != nil ? object : text;
  }
  if (value.isObject()) {
    facebook::jsi::Object object = value.asObject(runtime);
    if (object.isArray(runtime)) {
      facebook::jsi::Array array = object.asArray(runtime);
      size_t length = array.length(runtime);
      NSMutableArray<id>* result = [NSMutableArray arrayWithCapacity:length];
      for (size_t index = 0; index < length; index += 1) {
        id item =
            nativeScriptObjCSelectorArgumentFromJSIValue(runtime, array.getValueAtIndex(runtime, index));
        [result addObject:item != nil ? item : [NSNull null]];
      }
      return result;
    }
  }

  return [NSNull null];
}

NSArray<id>* nativeScriptObjCSelectorArgumentsFromJSIValue(
    facebook::jsi::Runtime& runtime,
    const facebook::jsi::Value& value) {
  if (!value.isObject()) {
    return @[];
  }

  facebook::jsi::Object object = value.asObject(runtime);
  if (!object.isArray(runtime)) {
    return @[];
  }

  facebook::jsi::Array array = object.asArray(runtime);
  size_t length = array.length(runtime);
  NSMutableArray<id>* result = [NSMutableArray arrayWithCapacity:length];
  for (size_t index = 0; index < length; index += 1) {
    id argument =
        nativeScriptObjCSelectorArgumentFromJSIValue(runtime, array.getValueAtIndex(runtime, index));
    [result addObject:argument != nil ? argument : [NSNull null]];
  }
  return result;
}

const char* nativeScriptSkipObjCTypeQualifiers(const char* type) {
  if (type == nullptr) {
    return "";
  }

  while (*type == 'r' || *type == 'n' || *type == 'N' || *type == 'o' ||
         *type == 'O' || *type == 'R' || *type == 'V') {
    type += 1;
  }
  return type;
}

BOOL nativeScriptSetInvocationArgument(NSInvocation* invocation,
                                       const char* rawType,
                                       id value,
                                       NSUInteger index) {
  const char* type = nativeScriptSkipObjCTypeQualifiers(rawType);
  const char code = type[0];

  if (code == '@' || code == '#') {
    id object = value == [NSNull null] ? nil : value;
    [invocation setArgument:&object atIndex:index];
    return YES;
  }

  NSNumber* number = [value isKindOfClass:NSNumber.class] ? (NSNumber*)value : nil;
  if (number == nil) {
    return NO;
  }

  switch (code) {
    case 'B': {
      bool boolValue = number.boolValue;
      [invocation setArgument:&boolValue atIndex:index];
      return YES;
    }
    case 'c': {
      BOOL boolValue = number.boolValue ? YES : NO;
      [invocation setArgument:&boolValue atIndex:index];
      return YES;
    }
    case 'i': {
      int intValue = number.intValue;
      [invocation setArgument:&intValue atIndex:index];
      return YES;
    }
    case 's': {
      short shortValue = number.shortValue;
      [invocation setArgument:&shortValue atIndex:index];
      return YES;
    }
    case 'l': {
      long longValue = number.longValue;
      [invocation setArgument:&longValue atIndex:index];
      return YES;
    }
    case 'q': {
      long long longLongValue = number.longLongValue;
      [invocation setArgument:&longLongValue atIndex:index];
      return YES;
    }
    case 'C': {
      unsigned char charValue = number.unsignedCharValue;
      [invocation setArgument:&charValue atIndex:index];
      return YES;
    }
    case 'I': {
      unsigned int intValue = number.unsignedIntValue;
      [invocation setArgument:&intValue atIndex:index];
      return YES;
    }
    case 'S': {
      unsigned short shortValue = number.unsignedShortValue;
      [invocation setArgument:&shortValue atIndex:index];
      return YES;
    }
    case 'L': {
      unsigned long longValue = number.unsignedLongValue;
      [invocation setArgument:&longValue atIndex:index];
      return YES;
    }
    case 'Q': {
      unsigned long long longLongValue = number.unsignedLongLongValue;
      [invocation setArgument:&longLongValue atIndex:index];
      return YES;
    }
    case 'f': {
      float floatValue = number.floatValue;
      [invocation setArgument:&floatValue atIndex:index];
      return YES;
    }
    case 'd': {
      double doubleValue = number.doubleValue;
      [invocation setArgument:&doubleValue atIndex:index];
      return YES;
    }
    default:
      return NO;
  }
}

facebook::jsi::Value nativeScriptJSIValueFromInvocationReturn(
    facebook::jsi::Runtime& runtime,
    NSInvocation* invocation,
    const char* rawType) {
  const char* type = nativeScriptSkipObjCTypeQualifiers(rawType);
  const char code = type[0];

  if (code == 'v') {
    return facebook::jsi::Value(true);
  }
  if (code == '@' || code == '#') {
    __unsafe_unretained id object = nil;
    [invocation getReturnValue:&object];
    if (object == nil) {
      return facebook::jsi::Value::null();
    }
    NSString* handle = nativeScriptHandleFromNSObject(object);
    return facebook::jsi::String::createFromUtf8(runtime, handle.UTF8String);
  }
  if (code == 'B') {
    bool boolValue = false;
    [invocation getReturnValue:&boolValue];
    return facebook::jsi::Value(boolValue);
  }
  if (code == 'c') {
    BOOL boolValue = NO;
    [invocation getReturnValue:&boolValue];
    return facebook::jsi::Value(boolValue == YES);
  }
  if (code == 'i') {
    int intValue = 0;
    [invocation getReturnValue:&intValue];
    return facebook::jsi::Value(static_cast<double>(intValue));
  }
  if (code == 's') {
    short shortValue = 0;
    [invocation getReturnValue:&shortValue];
    return facebook::jsi::Value(static_cast<double>(shortValue));
  }
  if (code == 'l') {
    long longValue = 0;
    [invocation getReturnValue:&longValue];
    return facebook::jsi::Value(static_cast<double>(longValue));
  }
  if (code == 'q') {
    long long longLongValue = 0;
    [invocation getReturnValue:&longLongValue];
    return facebook::jsi::Value(static_cast<double>(longLongValue));
  }
  if (code == 'C') {
    unsigned char charValue = 0;
    [invocation getReturnValue:&charValue];
    return facebook::jsi::Value(static_cast<double>(charValue));
  }
  if (code == 'I') {
    unsigned int intValue = 0;
    [invocation getReturnValue:&intValue];
    return facebook::jsi::Value(static_cast<double>(intValue));
  }
  if (code == 'S') {
    unsigned short shortValue = 0;
    [invocation getReturnValue:&shortValue];
    return facebook::jsi::Value(static_cast<double>(shortValue));
  }
  if (code == 'L') {
    unsigned long longValue = 0;
    [invocation getReturnValue:&longValue];
    return facebook::jsi::Value(static_cast<double>(longValue));
  }
  if (code == 'Q') {
    unsigned long long longLongValue = 0;
    [invocation getReturnValue:&longLongValue];
    return facebook::jsi::Value(static_cast<double>(longLongValue));
  }
  if (code == 'f') {
    float floatValue = 0;
    [invocation getReturnValue:&floatValue];
    return facebook::jsi::Value(static_cast<double>(floatValue));
  }
  if (code == 'd') {
    double doubleValue = 0;
    [invocation getReturnValue:&doubleValue];
    return facebook::jsi::Value(doubleValue);
  }

  return facebook::jsi::Value(true);
}

facebook::jsi::Value nativeScriptInvokeObjCSelectorFromHandles(
    facebook::jsi::Runtime& runtime,
    NSString* targetHandle,
    NSString* selectorName,
    NSArray<id>* arguments) {
  id target = nativeScriptNSObjectFromHandle(targetHandle);
  if (target == nil || selectorName.length == 0) {
    return facebook::jsi::Value(false);
  }

  SEL selector = NSSelectorFromString(selectorName);
  if (selector == nil || ![target respondsToSelector:selector]) {
    return facebook::jsi::Value(false);
  }

  NSMethodSignature* signature = [target methodSignatureForSelector:selector];
  if (signature == nil) {
    return facebook::jsi::Value(false);
  }

  NSUInteger expectedArguments = signature.numberOfArguments >= 2
      ? signature.numberOfArguments - 2
      : 0;
  if (arguments.count != expectedArguments) {
    return facebook::jsi::Value(false);
  }

  NSInvocation* invocation = [NSInvocation invocationWithMethodSignature:signature];
  invocation.target = target;
  invocation.selector = selector;
  for (NSUInteger index = 0; index < expectedArguments; index += 1) {
    if (!nativeScriptSetInvocationArgument(
            invocation,
            [signature getArgumentTypeAtIndex:index + 2],
            arguments[index],
            index + 2)) {
      return facebook::jsi::Value(false);
    }
  }

  [invocation invoke];
  return nativeScriptJSIValueFromInvocationReturn(
      runtime, invocation, signature.methodReturnType);
}

#if NATIVESCRIPT_RN_FABRIC_VIEW_TRAITS_AVAILABLE
void setOptionalYogaFloat(facebook::jsi::Runtime& runtime,
                          facebook::jsi::Object& object,
                          const char* name,
                          facebook::yoga::FloatOptional value) {
  if (value.isDefined()) {
    object.setProperty(runtime, name, static_cast<double>(value.unwrap()));
    return;
  }

  object.setProperty(runtime, name, facebook::jsi::Value::null());
}

void setRectProperties(facebook::jsi::Runtime& runtime,
                       facebook::jsi::Object& object,
                       const char* prefix,
                       const facebook::react::Rect& rect) {
  std::string xName = std::string(prefix) + "X";
  std::string yName = std::string(prefix) + "Y";
  std::string widthName = std::string(prefix) + "Width";
  std::string heightName = std::string(prefix) + "Height";

  object.setProperty(runtime, xName.c_str(), static_cast<double>(rect.origin.x));
  object.setProperty(runtime, yName.c_str(), static_cast<double>(rect.origin.y));
  object.setProperty(runtime, widthName.c_str(), static_cast<double>(rect.size.width));
  object.setProperty(runtime, heightName.c_str(), static_cast<double>(rect.size.height));
}

const facebook::react::LayoutMetrics* layoutMetricsForFabricComponentView(id object) {
  Class currentClass = object_getClass(object);

  while (currentClass != Nil) {
    Ivar layoutMetricsIvar = class_getInstanceVariable(currentClass, "_layoutMetrics");
    if (layoutMetricsIvar != nullptr) {
      ptrdiff_t offset = ivar_getOffset(layoutMetricsIvar);
      if (offset >= 0) {
        auto* storage = reinterpret_cast<const uint8_t*>(object) + offset;
        return reinterpret_cast<const facebook::react::LayoutMetrics*>(storage);
      }
      return nullptr;
    }

    currentClass = class_getSuperclass(currentClass);
  }

  return nullptr;
}

bool classHierarchyHasInstanceVariable(id object, const char* ivarName) {
  if (object == nil || ivarName == nullptr) {
    return false;
  }

  Class currentClass = object_getClass(object);
  while (currentClass != Nil) {
    if (class_getInstanceVariable(currentClass, ivarName) != nullptr) {
      return true;
    }
    currentClass = class_getSuperclass(currentClass);
  }

  return false;
}
#endif

facebook::jsi::Value reactFabricViewLayoutTraitsForHandle(
    facebook::jsi::Runtime& runtime,
    NSString* nativeHandle) {
  facebook::jsi::Object traits(runtime);
  traits.setProperty(runtime, "isFabricComponentView", false);
  traits.setProperty(runtime, "hasYogaStyle", false);
  traits.setProperty(runtime, "hasLayoutMetrics", false);
  traits.setProperty(runtime, "flex", facebook::jsi::Value::null());
  traits.setProperty(runtime, "flexGrow", facebook::jsi::Value::null());
  traits.setProperty(runtime, "flexShrink", facebook::jsi::Value::null());

  id object = nativeScriptNSObjectFromHandle(nativeHandle);
  if (object == nil || ![object isKindOfClass:UIView.class]) {
    return traits;
  }

  UIView* view = (UIView*)object;
  traits.setProperty(runtime, "frameX", static_cast<double>(view.frame.origin.x));
  traits.setProperty(runtime, "frameY", static_cast<double>(view.frame.origin.y));
  traits.setProperty(runtime, "frameWidth", static_cast<double>(view.frame.size.width));
  traits.setProperty(runtime, "frameHeight", static_cast<double>(view.frame.size.height));

#if NATIVESCRIPT_RN_FABRIC_VIEW_TRAITS_AVAILABLE
  const facebook::react::LayoutMetrics* layoutMetrics =
      layoutMetricsForFabricComponentView(object);
  const bool hasPropsStorage = classHierarchyHasInstanceVariable(object, "_props");
  const bool hasConcreteFabricStorage = layoutMetrics != nullptr || hasPropsStorage;
  if (!hasConcreteFabricStorage ||
      ![object conformsToProtocol:@protocol(RCTComponentViewProtocol)]) {
    return traits;
  }

  traits.setProperty(runtime, "isFabricComponentView", true);

  if (layoutMetrics != nullptr) {
    traits.setProperty(runtime, "hasLayoutMetrics", true);
    setRectProperties(runtime, traits, "layoutMetricsFrame", layoutMetrics->frame);
    setRectProperties(runtime, traits, "layoutMetricsContentFrame",
                      layoutMetrics->getContentFrame());
  }

  if (!hasPropsStorage) {
    return traits;
  }

  id<RCTComponentViewProtocol> componentView = (id<RCTComponentViewProtocol>)object;
  auto props = [componentView props];
  auto yogaProps =
      std::dynamic_pointer_cast<const facebook::react::YogaStylableProps>(props);
  if (yogaProps == nullptr) {
    return traits;
  }

  traits.setProperty(runtime, "hasYogaStyle", true);
  setOptionalYogaFloat(runtime, traits, "flex", yogaProps->yogaStyle.flex());
  setOptionalYogaFloat(runtime, traits, "flexGrow", yogaProps->yogaStyle.flexGrow());
  setOptionalYogaFloat(runtime, traits, "flexShrink", yogaProps->yogaStyle.flexShrink());
#endif

  return traits;
}

RCTImageLoader* currentReactImageLoader() {
  RCTBridge* bridge = [RCTBridge currentBridge];
  if (bridge == nil) {
    return nil;
  }

  RCTImageLoader* imageLoader = nil;
  if ([bridge respondsToSelector:@selector(imageLoader)]) {
    imageLoader = bridge.imageLoader;
  }
  if (imageLoader == nil &&
      [bridge respondsToSelector:@selector(moduleForName:lazilyLoadIfNecessary:)]) {
    id module = [bridge moduleForName:@"RCTImageLoader" lazilyLoadIfNecessary:YES];
    if ([module isKindOfClass:RCTImageLoader.class]) {
      imageLoader = (RCTImageLoader*)module;
    }
  }
  return imageLoader;
}

id nativeScriptReactSurfacePresenter() {
  RCTBridge* bridge = [RCTBridge currentBridge];
  if (bridge == nil) {
    return nil;
  }

  SEL selector = NSSelectorFromString(@"surfacePresenter");
  if ([bridge respondsToSelector:selector]) {
    IMP implementation = [bridge methodForSelector:selector];
    if (implementation != nullptr) {
      id (*surfacePresenter)(id, SEL) =
          reinterpret_cast<id (*)(id, SEL)>(implementation);
      id presenter = surfacePresenter(bridge, selector);
      if (presenter != nil) {
        return presenter;
      }
    }
  }

  @try {
    return [bridge valueForKey:@"surfacePresenter"];
  } @catch (__unused NSException* exception) {
    return nil;
  }
}

UIView* nativeScriptReactFabricComponentViewForTag(NSInteger tag) {
  // Lock hierarchy (see runUIKitHostFunction / nativeScriptApplyUIKitHostPropsForFabricTag
  // below): no code that may run with the worklet runtime's runtimeMutex_ held
  // (i.e. anything reachable from worklet JS) may block waiting on the main
  // queue. An off-main caller here is a programming error -- matches the
  // no-op-off-main pattern used by every other entry point in
  // NativeScriptUIView.mm.
  if (![NSThread isMainThread]) {
    return nil;
  }

  NativeScriptUIViewComponentView* nativeScriptComponentView =
      [NativeScriptUIViewComponentView nativeScriptComponentViewForReactTag:tag];
  if (nativeScriptComponentView != nil) {
    return nativeScriptComponentView;
  }

  id presenter = nativeScriptReactSurfacePresenter();
  SEL findSelector = NSSelectorFromString(@"findComponentViewWithTag_DO_NOT_USE_DEPRECATED:");
  if (presenter != nil && [presenter respondsToSelector:findSelector]) {
    IMP implementation = [presenter methodForSelector:findSelector];
    if (implementation != nullptr) {
      id (*findComponentView)(id, SEL, NSInteger) =
          reinterpret_cast<id (*)(id, SEL, NSInteger)>(implementation);
      id componentView = findComponentView(presenter, findSelector, tag);
      if ([componentView isKindOfClass:UIView.class]) {
        return static_cast<UIView*>(componentView);
      }
    }
  }

  nativeScriptComponentView =
      [NativeScriptUIViewComponentView nativeScriptComponentViewForReactTag:tag];
  if (nativeScriptComponentView != nil) {
    return nativeScriptComponentView;
  }

  RCTBridge* bridge = [RCTBridge currentBridge];
  id uiManager = nil;
  SEL uiManagerSelector = NSSelectorFromString(@"uiManager");
  if (bridge != nil && [bridge respondsToSelector:uiManagerSelector]) {
    IMP implementation = [bridge methodForSelector:uiManagerSelector];
    if (implementation != nullptr) {
      id (*getUIManager)(id, SEL) = reinterpret_cast<id (*)(id, SEL)>(implementation);
      uiManager = getUIManager(bridge, uiManagerSelector);
    }
  }

  SEL viewSelector = NSSelectorFromString(@"viewForReactTag:");
  if (uiManager != nil && [uiManager respondsToSelector:viewSelector]) {
    IMP implementation = [uiManager methodForSelector:viewSelector];
    if (implementation != nullptr) {
      id (*viewForReactTag)(id, SEL, NSNumber*) =
          reinterpret_cast<id (*)(id, SEL, NSNumber*)>(implementation);
      id view = viewForReactTag(uiManager, viewSelector, @(tag));
      if ([view isKindOfClass:UIView.class]) {
        return static_cast<UIView*>(view);
      }
    }
  }

  return nil;
}

// Lock hierarchy (the AB-BA rule enforced across this file): MAIN may
// synchronously block waiting on the worklet runtime's runtimeMutex_ -- that
// is this codebase's synchronous host-lifecycle design (see
// runUIKitHostFunction below, which calls into WorkletRuntime::runSync and
// blocks main until the worklet body finishes). The converse must NEVER
// happen: no code that may run with runtimeMutex_ held -- i.e. anything
// reachable from worklet JS, including this function when it is invoked
// off-main from a worklet body -- may block waiting on the main queue.
// dispatch_sync(main) here used to do exactly that: worklet JS holds
// runtimeMutex_ while calling this off-main, dispatch_sync blocks that same
// thread on main, and main is concurrently blocked acquiring runtimeMutex_
// inside runSync -- a classic AB-BA deadlock. So the off-main path below is
// fire-and-forget: dispatch_async to main and return nil immediately. Every
// call is preserved and applied in order (nothing is coalesced/dropped) --
// an earlier per-tag-coalescing variant of this fix was tried and reverted
// because skipping intermediate applies could skip real, order-dependent
// side effects in applyNativeScriptUIKitHostProps: (transaction-commit
// scheduling, frame refresh), which surfaced as permanently blank screen
// content after sustained rapid navigation. Plain dispatch_async trades
// that correctness risk for a slower (but bounded, self-draining) main
// queue under heavy load. The JSI wrapper
// (__nativeScriptApplyUIKitHostPropsForFabricTag above) already maps
// nil/empty handles to a JS null, and JS callers fall back to
// previously-known handles (see index.ts's prepareUIKitHostOnUI /
// applyUIKitHostPropsForFabricTagOnUI bootstrap chain) until the async
// main-thread application completes and a subsequent update delivers the
// real handles.
//
// Corollary: any code that may run with runtimeMutex_ held on main must
// NEVER call snapshotViewAfterScreenUpdates:YES,
// drawViewHierarchyInRect:afterScreenUpdates:YES,
// resizableSnapshotViewFromRect:...afterScreenUpdates:YES, or any other
// CARenderServerCapture*-backed API. Those synchronously round-trip to the
// render server, and frame finalization there can transitively depend on
// the RN JS thread -- which may itself be parked on this same runtimeMutex_
// inside runOnUISync -- producing the identical AB-BA deadlock described
// above (confirmed in the react-native-screens fork's
// RNSScreenNativeScriptController.setViewToSnapshot worklet).
NSDictionary<NSString*, NSString*>* nativeScriptApplyUIKitHostPropsForFabricTag(
    NSInteger tag,
    NSDictionary<NSString*, id>* props) {
  if (![NSThread isMainThread]) {
    NSDictionary<NSString*, id>* retainedProps = [props retain];
    dispatch_async(dispatch_get_main_queue(), ^{
      nativeScriptApplyUIKitHostPropsForFabricTag(tag, retainedProps);
      [retainedProps release];
    });
    return nil;
  }

  UIView* componentView = nativeScriptReactFabricComponentViewForTag(tag);
  if (![componentView isKindOfClass:NativeScriptUIViewComponentView.class]) {
    return @{};
  }

  return [static_cast<NativeScriptUIViewComponentView*>(componentView)
      applyNativeScriptUIKitHostProps:props];
}

UIImage* imageWithRenderingMode(UIImage* image, bool isTemplate) {
  if (image == nil) {
    return nil;
  }

  return [image imageWithRenderingMode:isTemplate ? UIImageRenderingModeAlwaysTemplate
                                                  : UIImageRenderingModeAlwaysOriginal];
}

std::mutex& nativeScriptWorkletRuntimeMutex() {
  static std::mutex mutex;
  return mutex;
}

std::weak_ptr<worklets::WorkletRuntime>& nativeScriptWorkletRuntime() {
  static std::weak_ptr<worklets::WorkletRuntime> runtime;
  return runtime;
}

std::atomic<bool>& nativeScriptWorkletRuntimeAcceptsCallbacks() {
  static std::atomic<bool> accepts{false};
  return accepts;
}

std::atomic<uint64_t>& nativeScriptWorkletRuntimeGeneration() {
  static std::atomic<uint64_t> generation{1};
  return generation;
}

std::shared_ptr<worklets::WorkletRuntime> getNativeScriptWorkletRuntime() {
  std::lock_guard<std::mutex> lock(nativeScriptWorkletRuntimeMutex());
  return nativeScriptWorkletRuntime().lock();
}

void setNativeScriptWorkletRuntimeAcceptsCallbacks(bool accepts) {
  nativeScriptWorkletRuntimeAcceptsCallbacks().store(accepts, std::memory_order_release);
}

uint64_t prepareNativeScriptWorkletRuntime(std::shared_ptr<worklets::WorkletRuntime> runtime) {
  std::lock_guard<std::mutex> lock(nativeScriptWorkletRuntimeMutex());
  auto current = nativeScriptWorkletRuntime().lock();
  if (current == runtime) {
    return nativeScriptWorkletRuntimeGeneration().load(std::memory_order_acquire);
  }

  nativeScriptWorkletRuntimeAcceptsCallbacks().store(false, std::memory_order_release);
  nativeScriptWorkletRuntime() = std::move(runtime);
  return nativeScriptWorkletRuntimeGeneration().fetch_add(1, std::memory_order_acq_rel) + 1;
}

bool nativeScriptWorkletRuntimeCallbacksAllowed() {
  return nativeScriptWorkletRuntimeAcceptsCallbacks().load(std::memory_order_acquire) &&
      getNativeScriptWorkletRuntime() != nullptr;
}

bool nativeScriptWorkletRuntimeCallbacksAllowed(uint64_t generation) {
  return nativeScriptWorkletRuntimeAcceptsCallbacks().load(std::memory_order_acquire) &&
      nativeScriptWorkletRuntimeGeneration().load(std::memory_order_acquire) == generation &&
      getNativeScriptWorkletRuntime() != nullptr;
}

void logNativeScriptWorkletRuntimeException(const char* context, const std::exception& error) {
  NSLog(@"[NativeScriptNativeApi] %s threw: %s", context, error.what());
}

void logNativeScriptWorkletRuntimeUnknownException(const char* context) {
  NSLog(@"[NativeScriptNativeApi] %s threw an unknown exception", context);
}

void markNativeScriptWorkletRuntimeInvalidating() {
  setNativeScriptWorkletRuntimeAcceptsCallbacks(false);
}

void installNativeScriptBridgeInvalidationObserver() {
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    NSNotificationCenter* center = [NSNotificationCenter defaultCenter];
    [center addObserverForName:RCTBridgeWillBeInvalidatedNotification
                        object:nil
                         queue:nil
                    usingBlock:^(__unused NSNotification* notification) {
                      markNativeScriptWorkletRuntimeInvalidating();
                    }];
    [center addObserverForName:RCTBridgeWillInvalidateModulesNotification
                        object:nil
                         queue:nil
                    usingBlock:^(__unused NSNotification* notification) {
                      markNativeScriptWorkletRuntimeInvalidating();
                    }];
  });
}

NSString* stringProperty(facebook::jsi::Runtime& runtime, facebook::jsi::Object& object,
                         const char* name) {
  auto value = object.getProperty(runtime, name);
  if (!value.isString()) {
    return nil;
  }
  std::string text = value.getString(runtime).utf8(runtime);
  return [NSString stringWithUTF8String:text.c_str()];
}

id imageSourceFromJSIValue(facebook::jsi::Runtime& runtime,
                           const facebook::jsi::Value& value,
                           const std::shared_ptr<facebook::react::CallInvoker>& jsInvoker) {
  if (value.isString()) {
    std::string uri = value.asString(runtime).utf8(runtime);
    return @{@"uri" : [NSString stringWithUTF8String:uri.c_str()]};
  }

  id object =
      facebook::react::TurboModuleConvertUtils::convertJSIValueToObjCObject(
          runtime, value, jsInvoker, YES);
  return object == nil || object == [NSNull null] ? nil : object;
}

void callImageLoadCallback(
    std::weak_ptr<worklets::WorkletRuntime> workletRuntimeWeak,
    uint64_t workletRuntimeGeneration,
    std::shared_ptr<facebook::jsi::Function> callback,
    UIImage* image,
    NSString* errorMessage) {
  UIImage* retainedImage = image != nil ? [image retain] : nil;
  std::string imageHandle =
      retainedImage != nil ? nativeScriptHandleFromNSObject(retainedImage).UTF8String : "";
  std::string errorText = errorMessage.UTF8String != nullptr ? errorMessage.UTF8String : "";

  if (!nativeScriptWorkletRuntimeCallbacksAllowed(workletRuntimeGeneration)) {
    [retainedImage release];
    return;
  }

  auto runtimeStrong = workletRuntimeWeak.lock();
  if (runtimeStrong == nullptr) {
    [retainedImage release];
    return;
  }

  runtimeStrong->schedule(
      [callback = std::move(callback), imageHandle = std::move(imageHandle),
       errorText = std::move(errorText), retainedImage, workletRuntimeGeneration](
          facebook::jsi::Runtime& runtime) mutable {
        if (!nativeScriptWorkletRuntimeCallbacksAllowed(workletRuntimeGeneration)) {
          dispatch_async(dispatch_get_main_queue(), ^{
            [retainedImage release];
          });
          return;
        }

        facebook::jsi::Value imageValue =
            imageHandle.empty()
                ? facebook::jsi::Value::null()
                : facebook::jsi::Value(
                      runtime,
                      facebook::jsi::String::createFromUtf8(runtime, imageHandle));
        facebook::jsi::Value errorValue =
            errorText.empty()
                ? facebook::jsi::Value::null()
                : facebook::jsi::Value(
                      runtime,
                      facebook::jsi::String::createFromUtf8(runtime, errorText));
        callback->call(runtime, imageValue, errorValue);
        dispatch_async(dispatch_get_main_queue(), ^{
          [retainedImage release];
        });
      });
}

NSDictionary<NSString*, NSString*>* handlesFromJSIValue(facebook::jsi::Runtime& runtime,
                                                        facebook::jsi::Value&& result) {
  if (!result.isObject()) {
    return nil;
  }

  auto resultObject = result.asObject(runtime);
  NSMutableDictionary<NSString*, NSString*>* handles =
      [NSMutableDictionary dictionaryWithCapacity:3];
  NSString* nativeViewHandle = stringProperty(runtime, resultObject, "nativeViewHandle");
  NSString* childrenViewHandle = stringProperty(runtime, resultObject, "childrenViewHandle");
  NSString* controllerHandle = stringProperty(runtime, resultObject, "controllerHandle");

  if (nativeViewHandle.length > 0) {
    handles[@"nativeViewHandle"] = nativeViewHandle;
  }
  if (childrenViewHandle.length > 0) {
    handles[@"childrenViewHandle"] = childrenViewHandle;
  }
  if (controllerHandle.length > 0) {
    handles[@"controllerHandle"] = controllerHandle;
  }
  return handles;
}

// NS_NS_HOST_PROFILE=1 logs every host lifecycle crossing over the threshold
// so transaction-time cost can be attributed per host/phase.
struct NativeScriptHostCallProfiler {
  CFAbsoluteTime start;
  NSString* hostId;
  NSString* phase;
  BOOL enabled;
  NativeScriptHostCallProfiler(NSString* aHostId, NSString* aPhase)
      : start(0), hostId(aHostId), phase(aPhase) {
    static const BOOL profileEnabled = getenv("NS_NS_HOST_PROFILE") != nullptr;
    enabled = profileEnabled;
    if (enabled) {
      start = CFAbsoluteTimeGetCurrent();
    }
  }
  ~NativeScriptHostCallProfiler() {
    if (!enabled) {
      return;
    }
    const double ms = (CFAbsoluteTimeGetCurrent() - start) * 1000.0;
    if (ms >= 2.0) {
      NSLog(@"NS_NS_HOST_PROFILE %@ phase=%@ ms=%.1f", hostId ?: @"?",
            phase.length > 0 ? phase : @"create", ms);
    }
  }
};

// Lock hierarchy (enforced across this file, see
// nativeScriptApplyUIKitHostPropsForFabricTag above for the other
// direction): this function is main-thread-only (guarded below) and calls
// into WorkletRuntime::runSync, which blocks the calling (main) thread until
// it acquires the worklet runtime's runtimeMutex_ and the worklet body
// finishes running. That is fine -- MAIN is allowed to synchronously wait on
// the worklet mutex; this is our synchronous host-lifecycle design. What is
// NOT allowed is the converse: nothing that may run with runtimeMutex_ held
// (i.e. anything reachable from the worklet body invoked via runSync below,
// including any host function it calls back into) may wait on the main
// queue (no dispatch_sync/dispatch_get_main_queue with wait, no semaphores,
// no waitUntilDone:YES) -- doing so while main is here waiting on
// runtimeMutex_ is exactly the AB-BA deadlock this file's off-main paths are
// written to avoid.
//
// The same rule extends to any synchronous render-server capture API:
// snapshotViewAfterScreenUpdates:YES,
// drawViewHierarchyInRect:afterScreenUpdates:YES,
// resizableSnapshotViewFromRect:...afterScreenUpdates:YES, and any other
// CARenderServerCapture*-backed call are just as forbidden as
// dispatch_sync(main) for code reachable from a worklet body running with
// runtimeMutex_ held -- the render server's post-update frame can depend on
// the RN JS thread, which may be the very thread parked on runtimeMutex_
// here in runSync.
NSDictionary<NSString*, NSString*>* runUIKitHostFunction(NSString* hostId, NSString* phase,
                                                         NSString* propsJson,
                                                         NSString* transactionJson,
                                                         NSString* nativeMountInfoJson,
                                                         const char* globalName,
                                                         const char* logAction) {
  if (hostId.length == 0 || ![NSThread isMainThread]) {
    return nil;
  }
  NativeScriptHostCallProfiler profiler(hostId, phase);
  const uint64_t profileInteropCallsStart =
      ::nsInteropProfiler::gCalls.load(std::memory_order_relaxed);
  const uint64_t profileInteropNsStart =
      ::nsInteropProfiler::gNs.load(std::memory_order_relaxed);

  if (!nativeScriptWorkletRuntimeCallbacksAllowed()) {
    return nil;
  }

  auto workletRuntime = getNativeScriptWorkletRuntime();
  if (workletRuntime == nullptr) {
    return nil;
  }

  std::string hostIdString = hostId.UTF8String != nullptr ? hostId.UTF8String : "";
  if (hostIdString.empty()) {
    return nil;
  }

  std::string phaseString = phase.UTF8String != nullptr ? phase.UTF8String : "";
  std::string propsJsonString =
      propsJson.UTF8String != nullptr ? propsJson.UTF8String : "";
  std::string transactionJsonString =
      transactionJson.UTF8String != nullptr ? transactionJson.UTF8String : "";
  std::string nativeMountInfoJsonString =
      nativeMountInfoJson.UTF8String != nullptr ? nativeMountInfoJson.UTF8String : "";
  try {
    static const bool profileHostCallsInnerFlag = getenv("NS_NS_HOST_PROFILE") != nullptr;
    const bool profileHostCallsInner = profileHostCallsInnerFlag;
    CFAbsoluteTime lambdaStart = 0;
    NSDictionary<NSString*, NSString*>* result = workletRuntime->runSync(
        [hostIdString = std::move(hostIdString), phaseString = std::move(phaseString),
         propsJsonString = std::move(propsJsonString),
         transactionJsonString = std::move(transactionJsonString),
         nativeMountInfoJsonString = std::move(nativeMountInfoJsonString),
         globalName, &lambdaStart,
         profileHostCallsInner](facebook::jsi::Runtime& runtime) -> NSDictionary<NSString*, NSString*>* {
          if (profileHostCallsInner) {
            lambdaStart = CFAbsoluteTimeGetCurrent();
          }
          auto global = runtime.global();
          auto functionValue = global.getProperty(runtime, globalName);
          if (!functionValue.isObject()) {
            return nil;
          }

          auto functionObject = functionValue.asObject(runtime);
          if (!functionObject.isFunction(runtime)) {
            return nil;
          }

          auto function = functionObject.asFunction(runtime);
          auto hostIdValue = facebook::jsi::String::createFromUtf8(runtime, hostIdString);
          auto propsJsonValue = facebook::jsi::String::createFromUtf8(runtime, propsJsonString);
          if (phaseString.empty()) {
            auto nativeMountInfoJsonValue =
                facebook::jsi::String::createFromUtf8(runtime, nativeMountInfoJsonString);
            if (!propsJsonString.empty() && !nativeMountInfoJsonString.empty()) {
              return handlesFromJSIValue(
                  runtime, function.call(runtime, hostIdValue, propsJsonValue,
                                         nativeMountInfoJsonValue));
            }
            if (!nativeMountInfoJsonString.empty()) {
              auto emptyPropsJsonValue = facebook::jsi::String::createFromUtf8(runtime, "");
              return handlesFromJSIValue(
                  runtime, function.call(runtime, hostIdValue, emptyPropsJsonValue,
                                         nativeMountInfoJsonValue));
            }
            if (!propsJsonString.empty()) {
              return handlesFromJSIValue(
                  runtime, function.call(runtime, hostIdValue, propsJsonValue));
            }
            return handlesFromJSIValue(runtime, function.call(runtime, hostIdValue));
          }

          auto phaseValue = facebook::jsi::String::createFromUtf8(runtime, phaseString);
          auto transactionJsonValue =
              facebook::jsi::String::createFromUtf8(runtime, transactionJsonString);
          auto nativeMountInfoJsonValue =
              facebook::jsi::String::createFromUtf8(runtime, nativeMountInfoJsonString);
          if (!propsJsonString.empty() && !transactionJsonString.empty() &&
              !nativeMountInfoJsonString.empty()) {
            return handlesFromJSIValue(
                runtime, function.call(runtime, hostIdValue, phaseValue, propsJsonValue,
                                       transactionJsonValue, nativeMountInfoJsonValue));
          }
          if (!transactionJsonString.empty() && !nativeMountInfoJsonString.empty()) {
            auto emptyPropsJsonValue = facebook::jsi::String::createFromUtf8(runtime, "");
            return handlesFromJSIValue(
                runtime, function.call(runtime, hostIdValue, phaseValue, emptyPropsJsonValue,
                                       transactionJsonValue, nativeMountInfoJsonValue));
          }
          if (!propsJsonString.empty() && !nativeMountInfoJsonString.empty()) {
            auto emptyTransactionJsonValue = facebook::jsi::String::createFromUtf8(runtime, "");
            return handlesFromJSIValue(
                runtime, function.call(runtime, hostIdValue, phaseValue, propsJsonValue,
                                       emptyTransactionJsonValue, nativeMountInfoJsonValue));
          }
          if (!nativeMountInfoJsonString.empty()) {
            auto emptyPropsJsonValue = facebook::jsi::String::createFromUtf8(runtime, "");
            auto emptyTransactionJsonValue = facebook::jsi::String::createFromUtf8(runtime, "");
            return handlesFromJSIValue(
                runtime, function.call(runtime, hostIdValue, phaseValue, emptyPropsJsonValue,
                                       emptyTransactionJsonValue, nativeMountInfoJsonValue));
          }
          if (!propsJsonString.empty() && !transactionJsonString.empty()) {
            return handlesFromJSIValue(runtime,
                                       function.call(runtime, hostIdValue, phaseValue,
                                                     propsJsonValue, transactionJsonValue));
          }
          if (!propsJsonString.empty()) {
            return handlesFromJSIValue(
                runtime, function.call(runtime, hostIdValue, phaseValue, propsJsonValue));
          }
          if (!transactionJsonString.empty()) {
            auto emptyPropsJsonValue = facebook::jsi::String::createFromUtf8(runtime, "");
            return handlesFromJSIValue(runtime,
                                       function.call(runtime, hostIdValue, phaseValue,
                                                     emptyPropsJsonValue, transactionJsonValue));
          }

          return handlesFromJSIValue(runtime, function.call(runtime, hostIdValue, phaseValue));
        });
    if (profileHostCallsInner && lambdaStart > 0) {
      const double innerMs = (CFAbsoluteTimeGetCurrent() - lambdaStart) * 1000.0;
      if (innerMs >= 2.0) {
        const uint64_t callsNow = ::nsInteropProfiler::gCalls.load(std::memory_order_relaxed);
        const uint64_t nsNow = ::nsInteropProfiler::gNs.load(std::memory_order_relaxed);
        NSLog(@"NS_NS_HOST_PROFILE_INNER %@ phase=%@ jsMs=%.1f interopCalls=%llu interopMs=%.1f",
              hostId, phase.length > 0 ? phase : @"create", innerMs,
              (unsigned long long)(callsNow - profileInteropCallsStart),
              (double)(nsNow - profileInteropNsStart) / 1e6);
      }
    }
    return result;
  } catch (const std::exception& error) {
    NSLog(@"NativeScript failed to %s UIKit host %@: %s", logAction, hostId, error.what());
  } catch (...) {
    NSLog(@"NativeScript failed to %s UIKit host %@", logAction, hostId);
  }
  return nil;
}

}  // namespace

NSDictionary<NSString*, NSString*>* NativeScriptCreateUIKitHost(NSString* hostId,
                                                                NSString* propsJson) {
  return runUIKitHostFunction(hostId, nil, propsJson, nil, nil,
                              "__nativeScriptCreateUIKitHostFromNative", "create");
}

NSDictionary<NSString*, NSString*>* NativeScriptCreateUIKitHostWithInfo(
    NSString* hostId, NSString* propsJson, NSString* nativeMountInfoJson) {
  return runUIKitHostFunction(hostId, nil, propsJson, nil, nativeMountInfoJson,
                              "__nativeScriptCreateUIKitHostFromNative", "create");
}

NSDictionary<NSString*, NSString*>* NativeScriptRunUIKitHostLifecycle(NSString* hostId,
                                                                      NSString* phase,
                                                                      NSString* propsJson) {
  return runUIKitHostFunction(hostId, phase, propsJson, nil, nil,
                              "__nativeScriptRunUIKitHostLifecycleFromNative", "run");
}

NSDictionary<NSString*, NSString*>* NativeScriptRunUIKitHostLifecycleWithInfo(
    NSString* hostId,
    NSString* phase,
    NSString* propsJson,
    NSString* transactionJson,
    NSString* nativeMountInfoJson) {
  return runUIKitHostFunction(hostId, phase, propsJson, transactionJson, nativeMountInfoJson,
                              "__nativeScriptRunUIKitHostLifecycleFromNative", "run");
}

namespace facebook::react {

NativeScriptNativeApiModule::NativeScriptNativeApiModule(std::shared_ptr<CallInvoker> jsInvoker)
    : NativeScriptNativeApiCxxSpec(jsInvoker), jsInvoker_(std::move(jsInvoker)) {}

bool NativeScriptNativeApiModule::install(jsi::Runtime& runtime, std::string metadataPath) {
  writeSmokeMarkerIfRequested("install:resolve-metadata");
  std::string resolvedMetadataPath = metadataPath.empty() ? bundledMetadataPath() : metadataPath;
  const char* metadataPathArg =
      resolvedMetadataPath.empty() ? nullptr : resolvedMetadataPath.c_str();

  writeSmokeMarkerIfRequested("install:before-jsi");
  auto config =
      nativescript::MakeReactNativeNativeApiJsiConfig(
          jsInvoker_, nullptr, metadataPathArg, nullptr, "__nativeScriptNativeApi");
  config.installGlobalSymbols = false;
  config.invokeCallbacksOnNativeCallerThread = false;
  nativescript::InstallNativeApiJSI(runtime, config);
  writeSmokeMarkerIfRequested("install:after-jsi");
  return isInstalled(runtime);
}

bool NativeScriptNativeApiModule::installWorkletRuntime(jsi::Runtime& runtime,
                                                        jsi::Object runtimeHolder,
                                                        std::string metadataPath) {
  writeSmokeMarkerIfRequested("installWorkletRuntime:headers");
  if (!runtimeHolder.hasNativeState<worklets::WorkletRuntimeHolder>(runtime)) {
    writeSmokeMarkerIfRequested("installWorkletRuntime:no-holder");
    return false;
  }

  auto holder = runtimeHolder.getNativeState<worklets::WorkletRuntimeHolder>(runtime);
  if (holder == nullptr || holder->runtime_ == nullptr) {
    writeSmokeMarkerIfRequested("installWorkletRuntime:null-runtime");
    return false;
  }

  installNativeScriptBridgeInvalidationObserver();
  uint64_t workletRuntimeGeneration = prepareNativeScriptWorkletRuntime(holder->runtime_);

  std::string resolvedMetadataPath = metadataPath.empty() ? bundledMetadataPath() : metadataPath;
  auto jsInvoker = jsInvoker_;
  auto workletRuntimeRef = holder->runtime_;
  return holder->runtime_->runSync(
      [jsInvoker = std::move(jsInvoker), resolvedMetadataPath = std::move(resolvedMetadataPath),
       workletRuntimeRef = std::move(workletRuntimeRef), workletRuntimeGeneration](
          jsi::Runtime& workletRuntime) -> bool {
        if (!nativeApiInstalled(workletRuntime)) {
          std::weak_ptr<worklets::WorkletRuntime> workletRuntimeWeak(workletRuntimeRef);
          const char* metadataPathArg =
              resolvedMetadataPath.empty() ? nullptr : resolvedMetadataPath.c_str();
          auto config =
              nativescript::MakeReactNativeNativeApiJsiConfig(
                  jsInvoker, nullptr, metadataPathArg, nullptr, "__nativeScriptNativeApi");
          config.installGlobalSymbols = false;
          config.invokeCallbacksOnNativeCallerThread = true;
          config.callbackInvocationAllowed = [workletRuntimeGeneration]() {
            return nativeScriptWorkletRuntimeCallbacksAllowed(workletRuntimeGeneration);
          };
          config.runtimeCallbackInvoker =
              [workletRuntimeWeak, workletRuntimeGeneration](
                  std::function<void()> task) mutable {
                if (!nativeScriptWorkletRuntimeCallbacksAllowed(workletRuntimeGeneration)) {
                  return;
                }
                auto runtimeStrong = workletRuntimeWeak.lock();
                if (runtimeStrong == nullptr) {
                  return;
                }

                // Execute the callback inline on the calling thread under the
                // worklet runtime's recursive mutex, exactly like the host
                // lifecycle runSync paths. The previous schedule-and-wait
                // design blocked the caller (usually the main thread) on a
                // 2-second semaphore and PROCEEDED WITHOUT the callback when
                // it timed out: bursts of UIKit delegate callbacks during
                // interactive dismissal serialized into multi-second freezes
                // and silently dropped dismissal bookkeeping, wedging
                // navigation state. runSync is reentrant for nested
                // callbacks on a thread that already holds the runtime and
                // never drops the invocation.
                try {
                  runtimeStrong->runSync(
                      [&task, workletRuntimeGeneration](jsi::Runtime&) {
                        if (nativeScriptWorkletRuntimeCallbacksAllowed(
                                workletRuntimeGeneration)) {
                          task();
                        }
                      });
                } catch (const std::exception& error) {
                  logNativeScriptWorkletRuntimeException(
                      "runtimeCallbackInvoker", error);
                } catch (...) {
                  logNativeScriptWorkletRuntimeUnknownException(
                      "runtimeCallbackInvoker");
                }
              };
          nativescript::InstallNativeApiJSI(workletRuntime, config);
          // Worklet-runtime logging bridge: os_log is otherwise unreachable
          // from the UI/worklet runtime (neither NSLog nor console.warn there
          // surface), so install a host function that forwards to NSLog. Lets
          // fork worklet code emit debuggable output via globalThis.__nsLog(...).
          workletRuntimeRef->runSync([](facebook::jsi::Runtime& logRuntime) {
            logRuntime.global().setProperty(
                logRuntime, "__nsLog",
                facebook::jsi::Function::createFromHostFunction(
                    logRuntime,
                    facebook::jsi::PropNameID::forAscii(logRuntime, "__nsLog"),
                    1,
                    [](facebook::jsi::Runtime& rt, const facebook::jsi::Value&,
                       const facebook::jsi::Value* args,
                       size_t count) -> facebook::jsi::Value {
                      if (count > 0 && args[0].isString()) {
                        std::string msg = args[0].getString(rt).utf8(rt);
                        NSLog(@"%s", msg.c_str());
                      }
                      return facebook::jsi::Value::undefined();
                    }));
          });
          // Always-on interop-call counter: unlike __nsInteropCalls below,
          // this does NOT require NS_NS_HOST_PROFILE and does not read
          // nsInteropProfiler::gCalls (which only increments under that
          // flag). It reads gCallsAlways, a plain unconditional atomic
          // incremented on every interop dispatch with no timing and no
          // profiling side effects -- a trustworthy signal for pop-perf
          // gating without perturbing the call volume it measures.
          workletRuntimeRef->runSync([](facebook::jsi::Runtime& counterRuntime) {
            counterRuntime.global().setProperty(
                counterRuntime, "__nsInteropCallCount",
                facebook::jsi::Function::createFromHostFunction(
                    counterRuntime,
                    facebook::jsi::PropNameID::forAscii(counterRuntime,
                                                        "__nsInteropCallCount"),
                    0,
                    [](facebook::jsi::Runtime&, const facebook::jsi::Value&,
                       const facebook::jsi::Value*, size_t) {
                      return facebook::jsi::Value(
                          (double)::nsInteropProfiler::gCallsAlways.load(
                              std::memory_order_relaxed));
                    }));
          });
          if (getenv("NS_NS_HOST_PROFILE") != nullptr) {
            workletRuntimeRef->runSync([](facebook::jsi::Runtime& profileRuntime) {
              profileRuntime.global().setProperty(profileRuntime,
                                                  "__NS_NS_HOST_PROFILE", true);
              // Absolute bridged-call counter so worklet-side section timers
              // can attribute interop call counts to JS sections.
              profileRuntime.global().setProperty(
                  profileRuntime, "__nsInteropCalls",
                  facebook::jsi::Function::createFromHostFunction(
                      profileRuntime,
                      facebook::jsi::PropNameID::forAscii(profileRuntime,
                                                          "__nsInteropCalls"),
                      0,
                      [](facebook::jsi::Runtime&, const facebook::jsi::Value&,
                         const facebook::jsi::Value*, size_t) {
                        return facebook::jsi::Value(
                            (double)::nsInteropProfiler::gCalls.load(
                                std::memory_order_relaxed));
                      }));
            });
          }
        }

	        setNativeScriptWorkletRuntimeAcceptsCallbacks(true);

		        std::weak_ptr<worklets::WorkletRuntime> mainQueueWorkletRuntimeWeak(workletRuntimeRef);
		        auto dispatchAsyncOnMainQueue = jsi::Function::createFromHostFunction(
		            workletRuntime,
		            jsi::PropNameID::forAscii(
		                workletRuntime,
		                "__nativeScriptDispatchAsyncOnMainQueue"),
		            1,
		            [mainQueueWorkletRuntimeWeak, workletRuntimeGeneration](
		                jsi::Runtime& runtime, const jsi::Value&, const jsi::Value* args,
		                size_t count) -> jsi::Value {
		              if (count < 1 || !args[0].isObject() ||
		                  !args[0].asObject(runtime).isFunction(runtime)) {
		                return false;
		              }
		              if (!nativeScriptWorkletRuntimeCallbacksAllowed(workletRuntimeGeneration)) {
		                return false;
		              }

		              auto callback = std::make_shared<jsi::Function>(
		                  args[0].asObject(runtime).asFunction(runtime));
		              dispatch_async(dispatch_get_main_queue(), ^{
		                if (!nativeScriptWorkletRuntimeCallbacksAllowed(workletRuntimeGeneration)) {
		                  return;
		                }
		                auto runtimeStrong = mainQueueWorkletRuntimeWeak.lock();
		                if (runtimeStrong == nullptr) {
		                  return;
		                }
		                runtimeStrong->schedule(
			                    [callback, workletRuntimeGeneration](jsi::Runtime& runtime) {
			                      if (!nativeScriptWorkletRuntimeCallbacksAllowed(
			                              workletRuntimeGeneration)) {
			                        return;
			                      }
			                      try {
			                        callback->call(runtime);
			                      } catch (const std::exception& error) {
			                        logNativeScriptWorkletRuntimeException(
			                            "dispatchAsyncOnMainQueue", error);
			                      } catch (...) {
			                        logNativeScriptWorkletRuntimeUnknownException(
			                            "dispatchAsyncOnMainQueue");
			                      }
			                    });
		              });
		              return true;
		            });
		        workletRuntime.global().setProperty(
		            workletRuntime,
		            "__nativeScriptDispatchAsyncOnMainQueue",
		            std::move(dispatchAsyncOnMainQueue));

		        auto refreshUIKitHostView = jsi::Function::createFromHostFunction(
		            workletRuntime,
		            jsi::PropNameID::forAscii(workletRuntime, "__nativeScriptRefreshUIKitHostView"),
            1,
            [](jsi::Runtime& runtime, const jsi::Value&, const jsi::Value* args,
               size_t count) -> jsi::Value {
              if (count < 1 || !args[0].isString()) {
                return false;
              }

              std::string handle = args[0].asString(runtime).utf8(runtime);
              NSString* nativeHandle = [NSString stringWithUTF8String:handle.c_str()];
              return NativeScriptRefreshUIKitHostView(nativeHandle) == YES;
            });
		        workletRuntime.global().setProperty(
		            workletRuntime, "__nativeScriptRefreshUIKitHostView", std::move(refreshUIKitHostView));

		        auto refreshUIKitHostViewOwner = jsi::Function::createFromHostFunction(
		            workletRuntime,
		            jsi::PropNameID::forAscii(
		                workletRuntime,
		                "__nativeScriptRefreshUIKitHostViewOwner"),
		            1,
		            [](jsi::Runtime& runtime, const jsi::Value&, const jsi::Value* args,
		               size_t count) -> jsi::Value {
		              if (count < 1 || !args[0].isString()) {
		                return false;
		              }

		              std::string handle = args[0].asString(runtime).utf8(runtime);
		              NSString* nativeHandle = [NSString stringWithUTF8String:handle.c_str()];
		              return NativeScriptRefreshUIKitHostViewOwner(nativeHandle) == YES;
		            });
		        workletRuntime.global().setProperty(
		            workletRuntime,
		            "__nativeScriptRefreshUIKitHostViewOwner",
		            std::move(refreshUIKitHostViewOwner));

		        auto refreshUIKitHostViewDirectOwner = jsi::Function::createFromHostFunction(
		            workletRuntime,
		            jsi::PropNameID::forAscii(
		                workletRuntime,
		                "__nativeScriptRefreshUIKitHostViewDirectOwner"),
		            1,
		            [](jsi::Runtime& runtime, const jsi::Value&, const jsi::Value* args,
		               size_t count) -> jsi::Value {
		              if (count < 1 || !args[0].isString()) {
		                return false;
		              }

		              std::string handle = args[0].asString(runtime).utf8(runtime);
		              NSString* nativeHandle = [NSString stringWithUTF8String:handle.c_str()];
		              return NativeScriptRefreshUIKitHostViewDirectOwner(nativeHandle) == YES;
		            });
		        workletRuntime.global().setProperty(
		            workletRuntime,
		            "__nativeScriptRefreshUIKitHostViewDirectOwner",
		            std::move(refreshUIKitHostViewDirectOwner));

		        auto invalidateUIKitHostReadyOwner = jsi::Function::createFromHostFunction(
		            workletRuntime,
		            jsi::PropNameID::forAscii(
		                workletRuntime,
		                "__nativeScriptInvalidateUIKitHostReadyOwner"),
		            1,
		            [](jsi::Runtime& runtime, const jsi::Value&, const jsi::Value* args,
		               size_t count) -> jsi::Value {
		              if (count < 1 || !args[0].isString()) {
		                return false;
		              }

		              std::string handle = args[0].asString(runtime).utf8(runtime);
		              NSString* nativeHandle = [NSString stringWithUTF8String:handle.c_str()];
		              return NativeScriptInvalidateUIKitHostReadyOwner(nativeHandle) == YES;
		            });
			        workletRuntime.global().setProperty(
			            workletRuntime,
			            "__nativeScriptInvalidateUIKitHostReadyOwner",
			            std::move(invalidateUIKitHostReadyOwner));

            auto notifyUIKitAccessibilityLayoutChanged = jsi::Function::createFromHostFunction(
                workletRuntime,
                jsi::PropNameID::forAscii(
                    workletRuntime,
                    "__nativeScriptNotifyUIKitAccessibilityLayoutChanged"),
                1,
                [](jsi::Runtime& runtime, const jsi::Value&, const jsi::Value* args,
                   size_t count) -> jsi::Value {
                  if (count < 1 || !args[0].isString()) {
                    return false;
                  }

                  std::string handle = args[0].asString(runtime).utf8(runtime);
                  NSString* nativeHandle = [NSString stringWithUTF8String:handle.c_str()];
                  return NativeScriptNotifyUIKitAccessibilityLayoutChanged(nativeHandle) == YES;
                });
            workletRuntime.global().setProperty(
                workletRuntime,
                "__nativeScriptNotifyUIKitAccessibilityLayoutChanged",
                std::move(notifyUIKitAccessibilityLayoutChanged));

				        auto flushUIKitHostView = jsi::Function::createFromHostFunction(
				            workletRuntime,
				            jsi::PropNameID::forAscii(workletRuntime, "__nativeScriptFlushUIKitHostView"),
		            1,
		            [](jsi::Runtime& runtime, const jsi::Value&, const jsi::Value* args,
		               size_t count) -> jsi::Value {
		              if (count < 1 || !args[0].isString()) {
		                return false;
		              }

		              std::string handle = args[0].asString(runtime).utf8(runtime);
		              NSString* nativeHandle = [NSString stringWithUTF8String:handle.c_str()];
		              return NativeScriptFlushUIKitHostView(nativeHandle) == YES;
		            });
				        workletRuntime.global().setProperty(
				            workletRuntime,
				            "__nativeScriptFlushUIKitHostView",
				            std::move(flushUIKitHostView));

			        auto flushUIKitHostViewOwner = jsi::Function::createFromHostFunction(
			            workletRuntime,
			            jsi::PropNameID::forAscii(
			                workletRuntime,
			                "__nativeScriptFlushUIKitHostViewOwner"),
			            1,
			            [](jsi::Runtime& runtime, const jsi::Value&, const jsi::Value* args,
			               size_t count) -> jsi::Value {
			              if (count < 1 || !args[0].isString()) {
			                return false;
			              }

			              std::string handle = args[0].asString(runtime).utf8(runtime);
			              NSString* nativeHandle = [NSString stringWithUTF8String:handle.c_str()];
			              return NativeScriptFlushUIKitHostViewOwner(nativeHandle) == YES;
			            });
				        workletRuntime.global().setProperty(
				            workletRuntime,
				            "__nativeScriptFlushUIKitHostViewOwner",
				            std::move(flushUIKitHostViewOwner));

			        auto uikitHostHandlesForView = jsi::Function::createFromHostFunction(
			            workletRuntime,
			            jsi::PropNameID::forAscii(
			                workletRuntime,
			                "__nativeScriptUIKitHostHandlesForView"),
			            1,
			            [](jsi::Runtime& runtime, const jsi::Value&, const jsi::Value* args,
			               size_t count) -> jsi::Value {
			              if (count < 1 || !args[0].isString()) {
			                return jsi::Value::null();
			              }

			              std::string handle = args[0].asString(runtime).utf8(runtime);
			              NSString* nativeHandle = [NSString stringWithUTF8String:handle.c_str()];
			              NSDictionary<NSString*, NSString*>* handles =
			                  NativeScriptUIKitHostHandlesForView(nativeHandle);
			              jsi::Object result(runtime);
			              result.setProperty(
			                  runtime,
			                  "componentViewHandle",
			                  jsi::String::createFromUtf8(
			                      runtime, (handles[@"componentViewHandle"] ?: @"").UTF8String));
			              result.setProperty(
			                  runtime,
			                  "containerViewHandle",
			                  jsi::String::createFromUtf8(
			                      runtime, (handles[@"containerViewHandle"] ?: @"").UTF8String));
			              result.setProperty(
			                  runtime,
			                  "nativeViewHandle",
			                  jsi::String::createFromUtf8(
			                      runtime, (handles[@"nativeViewHandle"] ?: @"").UTF8String));
			              result.setProperty(
			                  runtime,
			                  "childrenViewHandle",
			                  jsi::String::createFromUtf8(
			                      runtime, (handles[@"childrenViewHandle"] ?: @"").UTF8String));
			              result.setProperty(
			                  runtime,
			                  "controllerHandle",
			                  jsi::String::createFromUtf8(
			                      runtime, (handles[@"controllerHandle"] ?: @"").UTF8String));
			              return result;
			            });
	        workletRuntime.global().setProperty(
	            workletRuntime,
	            "__nativeScriptUIKitHostHandlesForView",
	            std::move(uikitHostHandlesForView));

			        auto uikitHostOwnerHandlesForView = jsi::Function::createFromHostFunction(
			            workletRuntime,
			            jsi::PropNameID::forAscii(
			                workletRuntime,
			                "__nativeScriptUIKitHostOwnerHandlesForView"),
			            1,
			            [](jsi::Runtime& runtime, const jsi::Value&, const jsi::Value* args,
			               size_t count) -> jsi::Value {
			              if (count < 1 || !args[0].isString()) {
			                return jsi::Value::null();
			              }

			              std::string handle = args[0].asString(runtime).utf8(runtime);
			              NSString* nativeHandle = [NSString stringWithUTF8String:handle.c_str()];
			              NSDictionary<NSString*, NSString*>* handles =
			                  NativeScriptUIKitHostOwnerHandlesForView(nativeHandle);
			              jsi::Object result(runtime);
			              result.setProperty(
			                  runtime,
			                  "componentViewHandle",
			                  jsi::String::createFromUtf8(
			                      runtime, (handles[@"componentViewHandle"] ?: @"").UTF8String));
			              result.setProperty(
			                  runtime,
			                  "containerViewHandle",
			                  jsi::String::createFromUtf8(
			                      runtime, (handles[@"containerViewHandle"] ?: @"").UTF8String));
			              result.setProperty(
			                  runtime,
			                  "nativeViewHandle",
			                  jsi::String::createFromUtf8(
			                      runtime, (handles[@"nativeViewHandle"] ?: @"").UTF8String));
			              result.setProperty(
			                  runtime,
			                  "childrenViewHandle",
			                  jsi::String::createFromUtf8(
			                      runtime, (handles[@"childrenViewHandle"] ?: @"").UTF8String));
			              result.setProperty(
			                  runtime,
			                  "controllerHandle",
			                  jsi::String::createFromUtf8(
			                      runtime, (handles[@"controllerHandle"] ?: @"").UTF8String));
			              return result;
			            });
	        workletRuntime.global().setProperty(
	            workletRuntime,
	            "__nativeScriptUIKitHostOwnerHandlesForView",
	            std::move(uikitHostOwnerHandlesForView));

	        auto applyUIKitHostPropsForFabricTag = jsi::Function::createFromHostFunction(
	            workletRuntime,
	            jsi::PropNameID::forAscii(
	                workletRuntime,
	                "__nativeScriptApplyUIKitHostPropsForFabricTag"),
	            2,
	            [jsInvoker](jsi::Runtime& runtime, const jsi::Value&, const jsi::Value* args,
	               size_t count) -> jsi::Value {
	              if (count < 2 || !args[0].isNumber() || !args[1].isObject()) {
	                return jsi::Value::null();
	              }

	              NSInteger tag = static_cast<NSInteger>(args[0].getNumber());
	              id converted =
	                  facebook::react::TurboModuleConvertUtils::convertJSIValueToObjCObject(
	                      runtime, args[1], jsInvoker, YES);
	              NSDictionary<NSString*, id>* props =
	                  [converted isKindOfClass:NSDictionary.class]
	                      ? static_cast<NSDictionary<NSString*, id>*>(converted)
	                      : nil;
	              NSDictionary<NSString*, NSString*>* handles =
	                  nativeScriptApplyUIKitHostPropsForFabricTag(tag, props);
	              if (handles == nil || handles.count == 0) {
	                return jsi::Value::null();
	              }

	              jsi::Object result(runtime);
	              result.setProperty(
	                  runtime,
	                  "componentViewHandle",
	                  jsi::String::createFromUtf8(
	                      runtime, (handles[@"componentViewHandle"] ?: @"").UTF8String));
	              result.setProperty(
	                  runtime,
	                  "containerViewHandle",
	                  jsi::String::createFromUtf8(
	                      runtime, (handles[@"containerViewHandle"] ?: @"").UTF8String));
	              result.setProperty(
	                  runtime,
	                  "nativeViewHandle",
	                  jsi::String::createFromUtf8(
	                      runtime, (handles[@"nativeViewHandle"] ?: @"").UTF8String));
	              result.setProperty(
	                  runtime,
	                  "childrenViewHandle",
	                  jsi::String::createFromUtf8(
	                      runtime, (handles[@"childrenViewHandle"] ?: @"").UTF8String));
	              result.setProperty(
	                  runtime,
	                  "controllerHandle",
	                  jsi::String::createFromUtf8(
	                      runtime, (handles[@"controllerHandle"] ?: @"").UTF8String));
	              return result;
	            });
	        workletRuntime.global().setProperty(
	            workletRuntime,
	            "__nativeScriptApplyUIKitHostPropsForFabricTag",
	            std::move(applyUIKitHostPropsForFabricTag));

			        auto collectedUIKitHostChildren = jsi::Function::createFromHostFunction(
			            workletRuntime,
			            jsi::PropNameID::forAscii(
	                workletRuntime,
	                "__nativeScriptCollectedUIKitHostChildren"),
	            1,
	            [](jsi::Runtime& runtime, const jsi::Value&, const jsi::Value* args,
	               size_t count) -> jsi::Value {
	              if (count < 1 || !args[0].isString()) {
	                return jsi::Value::null();
	              }

	              std::string handle = args[0].asString(runtime).utf8(runtime);
	              NSString* nativeHandle = [NSString stringWithUTF8String:handle.c_str()];
	              NSArray<UIView*>* children = NativeScriptCollectedUIKitHostChildren(nativeHandle);
	              NSString* childrenHandle = nativeScriptHandleFromNSObject(children);
	              return facebook::jsi::String::createFromUtf8(
	                  runtime, childrenHandle.UTF8String);
	            });
	        workletRuntime.global().setProperty(
	            workletRuntime,
	            "__nativeScriptCollectedUIKitHostChildren",
	            std::move(collectedUIKitHostChildren));

	        auto reactFabricViewLayoutTraits = jsi::Function::createFromHostFunction(
	            workletRuntime,
	            jsi::PropNameID::forAscii(
	                workletRuntime,
	                "__nativeScriptReactFabricViewLayoutTraits"),
	            1,
	            [](jsi::Runtime& runtime, const jsi::Value&, const jsi::Value* args,
	               size_t count) -> jsi::Value {
	              if (count < 1 || !args[0].isString()) {
	                return jsi::Value::null();
	              }

	              std::string handle = args[0].asString(runtime).utf8(runtime);
	              NSString* nativeHandle = [NSString stringWithUTF8String:handle.c_str()];
	              return reactFabricViewLayoutTraitsForHandle(runtime, nativeHandle);
	            });
	        workletRuntime.global().setProperty(
	            workletRuntime,
	            "__nativeScriptReactFabricViewLayoutTraits",
	            std::move(reactFabricViewLayoutTraits));

	        auto nearestViewControllerForView =
	            jsi::Function::createFromHostFunction(
	                workletRuntime,
	                jsi::PropNameID::forAscii(
	                    workletRuntime,
	                    "__nativeScriptNearestViewControllerForView"),
	                1,
	                [](jsi::Runtime& runtime, const jsi::Value&, const jsi::Value* args,
	                   size_t count) -> jsi::Value {
	                  if (count < 1 || !args[0].isString()) {
	                    return jsi::Value::null();
	                  }

	                  std::string view = args[0].asString(runtime).utf8(runtime);
	                  NSString* viewHandle = [NSString stringWithUTF8String:view.c_str()];
	                  NSString* controllerHandle =
	                      NativeScriptNearestViewControllerForView(viewHandle);
	                  if (controllerHandle.length == 0) {
	                    return jsi::Value::null();
	                  }
	                  return jsi::String::createFromUtf8(
	                      runtime, controllerHandle.UTF8String);
	                });
	        workletRuntime.global().setProperty(
	            workletRuntime,
	            "__nativeScriptNearestViewControllerForView",
	            std::move(nearestViewControllerForView));

	        auto attachViewControllerToNearestParent =
	            jsi::Function::createFromHostFunction(
	                workletRuntime,
	                jsi::PropNameID::forAscii(
	                    workletRuntime,
	                    "__nativeScriptAttachViewControllerToNearestParent"),
	                2,
	                [](jsi::Runtime& runtime, const jsi::Value&, const jsi::Value* args,
	                   size_t count) -> jsi::Value {
	                  if (count < 2 || !args[0].isString() || !args[1].isString()) {
	                    return false;
	                  }

	                  std::string controller = args[0].asString(runtime).utf8(runtime);
	                  std::string view = args[1].asString(runtime).utf8(runtime);
	                  BOOL allowRootParent =
	                      count > 2 && args[2].isBool() && args[2].getBool() ? YES : NO;
	                  NSString* controllerHandle =
	                      [NSString stringWithUTF8String:controller.c_str()];
	                  NSString* viewHandle = [NSString stringWithUTF8String:view.c_str()];
	                  return NativeScriptAttachViewControllerToNearestParent(
	                             controllerHandle, viewHandle, allowRootParent) == YES;
	                });
	        workletRuntime.global().setProperty(
	            workletRuntime,
	            "__nativeScriptAttachViewControllerToNearestParent",
	            std::move(attachViewControllerToNearestParent));

	        auto invokeObjCSelector =
	            jsi::Function::createFromHostFunction(
	                workletRuntime,
	                jsi::PropNameID::forAscii(
	                    workletRuntime,
	                    "__nativeScriptInvokeObjCSelector"),
	                3,
	                [](jsi::Runtime& runtime, const jsi::Value&, const jsi::Value* args,
	                   size_t count) -> jsi::Value {
	                  if (count < 2 || !args[0].isString() || !args[1].isString()) {
	                    return false;
	                  }

	                  NSString* targetHandle =
	                      nativeScriptStringFromJSIValue(runtime, args[0]);
	                  NSString* selectorName =
	                      nativeScriptStringFromJSIValue(runtime, args[1]);
	                  NSArray<id>* selectorArguments =
	                      count > 2
	                          ? nativeScriptObjCSelectorArgumentsFromJSIValue(
	                                runtime, args[2])
	                          : @[];
	                  return nativeScriptInvokeObjCSelectorFromHandles(
	                      runtime, targetHandle, selectorName, selectorArguments);
	                });
	        workletRuntime.global().setProperty(
	            workletRuntime,
	            "__nativeScriptInvokeObjCSelector",
	            std::move(invokeObjCSelector));

	        std::weak_ptr<worklets::WorkletRuntime> imageWorkletRuntimeWeak(workletRuntimeRef);
	        auto loadImage = jsi::Function::createFromHostFunction(
	            workletRuntime,
	            jsi::PropNameID::forAscii(workletRuntime, "__nativeScriptLoadReactImage"),
	            3,
	            [jsInvoker, imageWorkletRuntimeWeak, workletRuntimeGeneration](
                    jsi::Runtime& runtime, const jsi::Value&, const jsi::Value* args,
                    size_t count) -> jsi::Value {
	              if (count < 3 || !args[2].isObject() ||
	                  !args[2].asObject(runtime).isFunction(runtime)) {
	                return false;
	              }

	              id jsonSource = imageSourceFromJSIValue(runtime, args[0], jsInvoker);
	              if (jsonSource == nil) {
	                return false;
	              }

	              RCTImageSource* imageSource = [RCTConvert RCTImageSource:jsonSource];
	              RCTImageLoader* imageLoader = currentReactImageLoader();
	              if (imageSource == nil || imageLoader == nil) {
	                return false;
	              }

	              bool isTemplate = count > 1 && args[1].isBool() && args[1].getBool();
	              auto callback = std::make_shared<jsi::Function>(
	                  args[2].asObject(runtime).asFunction(runtime));

	              [imageLoader loadImageWithURLRequest:imageSource.request
	                                              size:imageSource.size
	                                             scale:imageSource.scale
	                                           clipped:YES
	                                        resizeMode:RCTResizeModeCenter
	                                     progressBlock:^(int64_t, int64_t) {
	                                     }
	                                  partialLoadBlock:^(UIImage*) {
	                                  }
	                                   completionBlock:^(NSError* error, UIImage* image) {
		                                     dispatch_async(dispatch_get_main_queue(), ^{
		                                       UIImage* renderedImage =
		                                           imageWithRenderingMode(image, isTemplate);
		                                       callImageLoadCallback(
		                                           imageWorkletRuntimeWeak,
                                                   workletRuntimeGeneration,
                                                   callback,
                                                   renderedImage,
		                                           error.localizedDescription);
		                                     });
		                                   }];
	              return true;
	            });
	        workletRuntime.global().setProperty(
	            workletRuntime, "__nativeScriptLoadReactImage", std::move(loadImage));
	        return nativeApiInstalled(workletRuntime);
	      });
	}

bool NativeScriptNativeApiModule::isInstalled(jsi::Runtime& runtime) {
  return nativeApiInstalled(runtime);
}

std::string NativeScriptNativeApiModule::defaultMetadataPath(jsi::Runtime&) {
  return bundledMetadataPath();
}

std::string NativeScriptNativeApiModule::getRuntimeBackend(jsi::Runtime&) {
  writeSmokeMarkerIfRequested("getRuntimeBackend");
  return "hermes-jsi";
}

bool NativeScriptNativeApiModule::__writeTestMarker(jsi::Runtime&, std::string content) {
  return writeSmokeMarkerContentIfRequested(content);
}

}  // namespace facebook::react

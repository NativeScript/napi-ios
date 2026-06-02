#include "NativeApiJSC.h"

#ifdef TARGET_ENGINE_JSC

#include "NativeApiJSCRuntime.h"
#include "SignatureDispatch.h"

namespace nativescript {

namespace {

using nativescript::engine::Array;
using nativescript::engine::ArrayBuffer;
using nativescript::engine::BigInt;
using nativescript::engine::Function;
using nativescript::engine::HostObject;
using nativescript::engine::MutableBuffer;
using nativescript::engine::Object;
using nativescript::engine::PropNameID;
using nativescript::engine::Runtime;
using nativescript::engine::String;
using nativescript::engine::StringBuffer;
using nativescript::engine::Value;
using nativescript::engine::JSError;
using metagen::MDMemberFlag;
using metagen::MDMetadataReader;
using metagen::MDSectionOffset;
using metagen::MDTypeKind;

// clang-format off
#define NATIVESCRIPT_NATIVE_API_BACKEND_NAME "jsc"
#include "../shared/bridge/ObjCBridge.mm"
// clang-format on
#define NATIVESCRIPT_NATIVE_API_RETAIN_RUNTIME 1
#define NATIVESCRIPT_NATIVE_API_HAS_ENGINE_SELECTOR_GROUP_FUNCTION 1

std::shared_ptr<Runtime> retainNativeApiRuntime(Runtime& runtime) {
  return std::make_shared<Runtime>(runtime.state());
}

void SetNativeApiObjectPrototype(Runtime& runtime, Object& object,
                                       const Object& prototype) {
  JSObjectSetPrototype(runtime.context(), object.local(runtime),
                       prototype.local(runtime));
}

// clang-format off
#include "../shared/bridge/HostObjects.mm"
#include "../shared/bridge/Callbacks.mm"
#include "../shared/bridge/TypeConv.mm"
#include "../shared/bridge/Invocation.mm"
#include "../shared/bridge/ClassBuilder.mm"
#include "../shared/bridge/HostObject.mm"
// clang-format on

struct NativeApiSelectorGroupData {
  NativeApiSelectorGroupData(
      std::shared_ptr<engine::jscengine::RuntimeState> state,
      std::shared_ptr<NativeApiBridge> bridge, Class lookupClass,
      bool receiverIsClass,
      std::shared_ptr<std::vector<NativeApiSelectorGroupEntry>>
          selectors,
      std::shared_ptr<
          std::vector<std::shared_ptr<NativeApiPreparedObjCInvocation>>>
          preparedInvocations,
      std::weak_ptr<NativeApiObjectHostObject> boundReceiver = {},
      std::shared_ptr<NativeApiObjectLifetimeState> boundReceiverState =
          nullptr)
      : state(state),
        bridge(std::move(bridge)),
        lookupClass(lookupClass),
        receiverIsClass(receiverIsClass),
        selectors(std::move(selectors)),
        preparedInvocations(std::move(preparedInvocations)),
        boundReceiver(std::move(boundReceiver)),
        boundReceiverState(std::move(boundReceiverState)),
        runtime(state) {}

  std::shared_ptr<engine::jscengine::RuntimeState> state;
  std::shared_ptr<NativeApiBridge> bridge;
  Class lookupClass = Nil;
  bool receiverIsClass = false;
  std::shared_ptr<std::vector<NativeApiSelectorGroupEntry>> selectors;
  std::shared_ptr<
      std::vector<std::shared_ptr<NativeApiPreparedObjCInvocation>>>
      preparedInvocations;
  std::weak_ptr<NativeApiObjectHostObject> boundReceiver;
  std::shared_ptr<NativeApiObjectLifetimeState> boundReceiverState;
  // Reused per call (avoids per-call shared_ptr refcount + dispatch-superclass
  // probe on the hot path).
  Runtime runtime;
  Class cachedReceiverClass = Nil;
  Class cachedDispatchClass = Nil;
};

std::string jscValueToUtf8(Runtime& runtime, JSValueRef value) {
  JSValueRef exception = nullptr;
  JSStringRef string = JSValueToStringCopy(runtime.context(), value, &exception);
  if (string == nullptr || exception != nullptr) {
    if (string != nullptr) {
      JSStringRelease(string);
    }
    return {};
  }
  std::string result = engine::jscengine::stringToUtf8(string);
  JSStringRelease(string);
  return result;
}

bool jscNumberValue(Runtime& runtime, JSValueRef value, double* result) {
  if (result == nullptr) {
    return false;
  }
  JSValueRef exception = nullptr;
  double converted = JSValueToNumber(runtime.context(), value, &exception);
  if (exception != nullptr) {
    return false;
  }
  *result = converted;
  return true;
}

template <typename T>
std::shared_ptr<T> jscHostObject(Runtime& runtime, JSValueRef value) {
  if (value == nullptr || !JSValueIsObject(runtime.context(), value)) {
    return nullptr;
  }
  JSValueRef exception = nullptr;
  JSObjectRef object = JSValueToObject(runtime.context(), value, &exception);
  if (exception != nullptr || object == nullptr) {
    return nullptr;
  }
  auto* holder = static_cast<engine::jscengine::HostObjectHolder*>(
      JSObjectGetPrivate(object));
  if (holder == nullptr ||
      holder->typeToken != engine::jscengine::hostObjectTypeToken<T>()) {
    return nullptr;
  }
  return std::static_pointer_cast<T>(holder->hostObject);
}

template <typename T>
T* jscHostObjectRaw(Runtime& runtime, JSValueRef value) {
  if (value == nullptr || !JSValueIsObject(runtime.context(), value)) {
    return nullptr;
  }
  JSValueRef exception = nullptr;
  JSObjectRef object = JSValueToObject(runtime.context(), value, &exception);
  if (exception != nullptr || object == nullptr) {
    return nullptr;
  }
  auto* holder = static_cast<engine::jscengine::HostObjectHolder*>(
      JSObjectGetPrivate(object));
  if (holder == nullptr ||
      holder->typeToken != engine::jscengine::hostObjectTypeToken<T>()) {
    return nullptr;
  }
  return static_cast<T*>(holder->hostObject.get());
}

id jscNativeObjectArgument(Runtime& runtime,
                           const std::shared_ptr<NativeApiBridge>& bridge,
                           const NativeApiType& type, JSValueRef value,
                           NativeApiArgumentFrame& frame) {
  if (value == nullptr || JSValueIsNull(runtime.context(), value) ||
      JSValueIsUndefined(runtime.context(), value)) {
    return nil;
  }
  if (JSValueIsString(runtime.context(), value)) {
    std::string utf8 = jscValueToUtf8(runtime, value);
    id string = type.kind == metagen::mdTypeNSMutableStringObject
                    ? [[NSMutableString alloc] initWithBytes:utf8.data()
                                                      length:utf8.size()
                                                    encoding:NSUTF8StringEncoding]
                    : [[NSString alloc] initWithBytes:utf8.data()
                                               length:utf8.size()
                                             encoding:NSUTF8StringEncoding];
    if (string != nil) {
      frame.addObject(string);
    }
    return string;
  }
  if (JSValueIsBoolean(runtime.context(), value)) {
    return [NSNumber numberWithBool:JSValueToBoolean(runtime.context(), value)];
  }
  if (JSValueIsNumber(runtime.context(), value)) {
    double converted = 0;
    if (jscNumberValue(runtime, value, &converted)) {
      return [NSNumber numberWithDouble:converted];
    }
  }
  if (!JSValueIsObject(runtime.context(), value)) {
    return nil;
  }
  if (auto objectHost = jscHostObject<NativeApiObjectHostObject>(runtime, value)) {
    return objectHost->object();
  }
  if (auto classHost = jscHostObject<NativeApiClassHostObject>(runtime, value)) {
    return static_cast<id>(classHost->nativeClass());
  }
  if (auto protocolHost =
          jscHostObject<NativeApiProtocolHostObject>(runtime, value)) {
    return static_cast<id>(protocolHost->nativeProtocol());
  }
  if (auto pointerHost =
          jscHostObject<NativeApiPointerHostObject>(runtime, value)) {
    return static_cast<id>(pointerHost->pointer());
  }
  if (auto referenceHost =
          jscHostObject<NativeApiReferenceHostObject>(runtime, value)) {
    return static_cast<id>(referenceHost->data());
  }
  if (auto structHost =
          jscHostObject<NativeApiStructObjectHostObject>(runtime, value)) {
    return static_cast<id>(structHost->data());
  }

  JSValueRef exception = nullptr;
  JSObjectRef object = JSValueToObject(runtime.context(), value, &exception);
  if (exception == nullptr && object != nullptr) {
    JSStringRef property = engine::jscengine::makeJSString("__nativeApiClass");
    JSValueRef wrappedClassValue =
        JSObjectGetProperty(runtime.context(), object, property, nullptr);
    JSStringRelease(property);
    if (auto classHost =
            jscHostObject<NativeApiClassHostObject>(runtime,
                                                    wrappedClassValue)) {
      return static_cast<id>(classHost->nativeClass());
    }
  }

  Value wrapped = Value::borrowed(runtime, value);
  return objectFromEngineValue(runtime, bridge, wrapped, frame,
                               type.kind ==
                                   metagen::mdTypeNSMutableStringObject);
}

Class jscNativeClassArgument(Runtime& runtime, JSValueRef value) {
  if (value == nullptr || JSValueIsNull(runtime.context(), value) ||
      JSValueIsUndefined(runtime.context(), value)) {
    return Nil;
  }
  if (auto classHost = jscHostObject<NativeApiClassHostObject>(runtime, value)) {
    return classHost->nativeClass();
  }
  if (JSValueIsObject(runtime.context(), value)) {
    JSValueRef exception = nullptr;
    JSObjectRef object = JSValueToObject(runtime.context(), value, &exception);
    if (exception == nullptr && object != nullptr) {
      JSStringRef property = engine::jscengine::makeJSString("__nativeApiClass");
      JSValueRef wrappedClassValue =
          JSObjectGetProperty(runtime.context(), object, property, nullptr);
      JSStringRelease(property);
      if (auto classHost =
              jscHostObject<NativeApiClassHostObject>(runtime,
                                                      wrappedClassValue)) {
        return classHost->nativeClass();
      }
    }
  }
  Value wrapped = Value::borrowed(runtime, value);
  return classFromEngineValue(runtime, wrapped);
}

bool readJSCEngineSelectorArgument(Runtime& runtime, JSValueRef value,
                                   SEL* result) {
  if (result == nullptr) {
    return false;
  }
  if (value == nullptr || JSValueIsNull(runtime.context(), value) ||
      JSValueIsUndefined(runtime.context(), value)) {
    *result = nullptr;
    return true;
  }
  if (!JSValueIsString(runtime.context(), value)) {
    return false;
  }
  std::string selectorName = jscValueToUtf8(runtime, value);
  *result = sel_registerName(selectorName.c_str());
  return true;
}

template <typename T>
bool writeJSCNumber(Runtime& runtime, JSValueRef value, void* target) {
  double converted = 0;
  if (!jscNumberValue(runtime, value, &converted)) {
    return false;
  }
  *static_cast<T*>(target) = static_cast<T>(converted);
  return true;
}

bool prepareJSCEngineArgument(
    Runtime& runtime, const std::shared_ptr<NativeApiBridge>& bridge,
    const NativeApiType& type, JSValueRef value,
    NativeApiArgumentFrame& frame, size_t index) {
  ffi_type* ffiType = ffiTypeForEngineArgument(type);
  size_t size =
      ffiType != nullptr && ffiType->size > 0 ? ffiType->size : nativeSizeForType(type);
  void* target = frame.storageAt(index, size);

  switch (type.kind) {
    case metagen::mdTypeBool:
      if (!JSValueIsBoolean(runtime.context(), value)) {
        return false;
      }
      *static_cast<uint8_t*>(target) =
          JSValueToBoolean(runtime.context(), value) ? 1 : 0;
      return true;
    case metagen::mdTypeChar:
      return writeJSCNumber<int8_t>(runtime, value, target);
    case metagen::mdTypeUChar:
    case metagen::mdTypeUInt8:
      return writeJSCNumber<uint8_t>(runtime, value, target);
    case metagen::mdTypeSShort:
      return writeJSCNumber<int16_t>(runtime, value, target);
    case metagen::mdTypeUShort:
      if (JSValueIsString(runtime.context(), value)) {
        std::string text = jscValueToUtf8(runtime, value);
        if (text.size() != 1) {
          return false;
        }
        *static_cast<uint16_t*>(target) =
            static_cast<uint16_t>(static_cast<unsigned char>(text[0]));
        return true;
      }
      return writeJSCNumber<uint16_t>(runtime, value, target);
    case metagen::mdTypeSInt:
      return writeJSCNumber<int32_t>(runtime, value, target);
    case metagen::mdTypeUInt:
      return writeJSCNumber<uint32_t>(runtime, value, target);
    case metagen::mdTypeSLong:
    case metagen::mdTypeSInt64:
      return writeJSCNumber<int64_t>(runtime, value, target);
    case metagen::mdTypeULong:
    case metagen::mdTypeUInt64:
      return writeJSCNumber<uint64_t>(runtime, value, target);
    case metagen::mdTypeFloat:
      return writeJSCNumber<float>(runtime, value, target);
    case metagen::mdTypeDouble:
      return writeJSCNumber<double>(runtime, value, target);
    case metagen::mdTypeSelector:
      return readJSCEngineSelectorArgument(runtime, value,
                                           static_cast<SEL*>(target));
    case metagen::mdTypeClass: {
      Class cls = jscNativeClassArgument(runtime, value);
      if (cls == Nil) {
        return false;
      }
      *static_cast<Class*>(target) = cls;
      return true;
    }
    case metagen::mdTypeAnyObject:
    case metagen::mdTypeProtocolObject:
    case metagen::mdTypeClassObject:
    case metagen::mdTypeInstanceObject:
    case metagen::mdTypeNSStringObject:
    case metagen::mdTypeNSMutableStringObject:
      *static_cast<id*>(target) =
          jscNativeObjectArgument(runtime, bridge, type, value, frame);
      return true;
    default:
      break;
  }

  Value wrapped = Value::borrowed(runtime, value);
  convertEngineFfiArgument(runtime, bridge, type, wrapped, target, frame);
  return true;
}

JSValueRef jscInteger64Value(Runtime& runtime, int64_t value) {
  constexpr int64_t maxSafeInteger = 9007199254740991LL;
  constexpr int64_t minSafeInteger = -9007199254740991LL;
  if (value >= minSafeInteger && value <= maxSafeInteger) {
    return JSValueMakeNumber(runtime.context(), static_cast<double>(value));
  }
  Value bigint = BigInt::fromInt64(runtime, value);
  return bigint.local(runtime);
}

JSValueRef jscUnsignedInteger64Value(Runtime& runtime, uint64_t value) {
  constexpr uint64_t maxSafeInteger = 9007199254740991ULL;
  if (value <= maxSafeInteger) {
    return JSValueMakeNumber(runtime.context(), static_cast<double>(value));
  }
  Value bigint = BigInt::fromUint64(runtime, value);
  return bigint.local(runtime);
}

JSValueRef setJSCEngineObjectReturn(
    Runtime& runtime, const std::shared_ptr<NativeApiBridge>& bridge,
    const NativeApiType& type, id object) {
  if (object == nil) {
    return JSValueMakeNull(runtime.context());
  }
  Value roundTrip =
      findCachedNativeObjectReturn(runtime, bridge, type, object);
  if (!roundTrip.isUndefined()) {
    JSValueRef result = roundTrip.local(runtime);
    if (type.returnOwned) {
      [object release];
    }
    return result;
  }
  if (nativeObjectReturnMayCoerceToString(type) &&
      nativeObjectIsStringLike(object)) {
    std::string utf8 = utf8StringFromNSString(static_cast<NSString*>(object));
    if (type.returnOwned) {
      [object release];
    }
    JSStringRef string = engine::jscengine::makeJSString(utf8);
    JSValueRef result = JSValueMakeString(runtime.context(), string);
    JSStringRelease(string);
    return result;
  }
  if ([object isKindOfClass:[NSNull class]]) {
    if (type.returnOwned) {
      [object release];
    }
    return JSValueMakeNull(runtime.context());
  }
  if ([object isKindOfClass:[NSNumber class]] &&
      ![object isKindOfClass:[NSDecimalNumber class]]) {
    NSNumber* number = static_cast<NSNumber*>(object);
    const char* objCType = [number objCType];
    bool isBool = CFGetTypeID((__bridge CFTypeRef)number) ==
                      CFBooleanGetTypeID() ||
                  (objCType != nullptr &&
                   std::strcmp(objCType, @encode(BOOL)) == 0);
    JSValueRef result =
        isBool ? JSValueMakeBoolean(runtime.context(), [number boolValue])
               : JSValueMakeNumber(runtime.context(), [number doubleValue]);
    if (type.returnOwned) {
      [object release];
    }
    return result;
  }

  if (const NativeApiSymbol* classSymbol =
          bridge->findClassForRuntimePointer((void*)object)) {
    Value result = makeNativeClassValue(runtime, bridge, *classSymbol);
    if (type.returnOwned) {
      [object release];
    }
    return result.local(runtime);
  }
  if (const NativeApiSymbol* protocolSymbol =
          bridge->findProtocolForRuntimePointer((void*)object)) {
    Value result = makeNativeProtocolValue(runtime, bridge, *protocolSymbol);
    if (type.returnOwned) {
      [object release];
    }
    return result.local(runtime);
  }
  Value result = makeNativeObjectValue(runtime, bridge, object, type.returnOwned);
  return result.local(runtime);
}

JSValueRef setJSCEngineReturnValue(
    Runtime& runtime, const std::shared_ptr<NativeApiBridge>& bridge,
    NativeApiType type, void* value, const std::string& selectorName) {
  switch (type.kind) {
    case metagen::mdTypeVoid:
      return JSValueMakeUndefined(runtime.context());
    case metagen::mdTypeBool:
      return JSValueMakeBoolean(runtime.context(),
                                *static_cast<uint8_t*>(value) != 0);
    case metagen::mdTypeChar:
      return JSValueMakeNumber(runtime.context(),
                               *static_cast<int8_t*>(value));
    case metagen::mdTypeUChar:
    case metagen::mdTypeUInt8:
      return JSValueMakeNumber(runtime.context(),
                               *static_cast<uint8_t*>(value));
    case metagen::mdTypeSShort:
      return JSValueMakeNumber(runtime.context(),
                               *static_cast<int16_t*>(value));
    case metagen::mdTypeUShort: {
      uint16_t raw = *static_cast<uint16_t*>(value);
      if (raw >= 32 && raw <= 126) {
        char buffer[2] = {static_cast<char>(raw), '\0'};
        JSStringRef string = engine::jscengine::makeJSString(buffer);
        JSValueRef result = JSValueMakeString(runtime.context(), string);
        JSStringRelease(string);
        return result;
      }
      return JSValueMakeNumber(runtime.context(), raw);
    }
    case metagen::mdTypeSInt:
      return JSValueMakeNumber(runtime.context(),
                               *static_cast<int32_t*>(value));
    case metagen::mdTypeUInt:
      return JSValueMakeNumber(runtime.context(),
                               *static_cast<uint32_t*>(value));
    case metagen::mdTypeSLong:
    case metagen::mdTypeSInt64:
      return jscInteger64Value(runtime, *static_cast<int64_t*>(value));
    case metagen::mdTypeULong:
    case metagen::mdTypeUInt64:
      return jscUnsignedInteger64Value(runtime,
                                       *static_cast<uint64_t*>(value));
    case metagen::mdTypeFloat:
      return JSValueMakeNumber(runtime.context(), *static_cast<float*>(value));
    case metagen::mdTypeDouble:
      return JSValueMakeNumber(runtime.context(), *static_cast<double*>(value));
    case metagen::mdTypeClass: {
      Class cls = *static_cast<Class*>(value);
      if (cls == nil) {
        return JSValueMakeNull(runtime.context());
      }
      const char* name = class_getName(cls);
      NativeApiSymbol symbol{
          .kind = NativeApiSymbolKind::Class,
          .offset = MD_SECTION_OFFSET_NULL,
          .name = name != nullptr ? name : "",
          .runtimeName = name != nullptr ? name : "",
      };
      if (const NativeApiSymbol* found = bridge->findClass(symbol.name)) {
        symbol = *found;
      }
      Value result = makeNativeClassValue(runtime, bridge, std::move(symbol));
      return result.local(runtime);
    }
    case metagen::mdTypeAnyObject:
    case metagen::mdTypeProtocolObject:
    case metagen::mdTypeClassObject:
    case metagen::mdTypeInstanceObject:
    case metagen::mdTypeNSStringObject:
    case metagen::mdTypeNSMutableStringObject:
      if ((selectorName == "valueForKey:" ||
           selectorName == "valueForKeyPath:") &&
          isObjectiveCObjectType(type)) {
        type.kind = metagen::mdTypeAnyObject;
      }
      return setJSCEngineObjectReturn(runtime, bridge, type,
                                      *static_cast<id*>(value));
    case metagen::mdTypeSelector: {
      SEL selector = *static_cast<SEL*>(value);
      const char* selectorNameValue =
          selector != nullptr ? sel_getName(selector) : nullptr;
      if (selectorNameValue == nullptr) {
        return JSValueMakeNull(runtime.context());
      }
      JSStringRef string = engine::jscengine::makeJSString(selectorNameValue);
      JSValueRef result = JSValueMakeString(runtime.context(), string);
      JSStringRelease(string);
      return result;
    }
    default:
      break;
  }
  Value result = convertNativeReturnValue(runtime, bridge, type, value);
  return result.local(runtime);
}

// --- GSD (Generated Signature Dispatch) for JSC ---
// GsdObjCContext is the engine-neutral interface the generated invokers use:
// it reads JS arguments and writes the JS return value via the JSC API. The
// readers/setters mirror JSC's generic conversions exactly; any value not in
// the fast representation makes a reader return false so the invoker falls
// back to the fully correct generic path. Number readers require an actual
// JS number so coercion edge cases (numeric strings, single-char unichar
// arguments) defer to the generic path.
struct GsdObjCContext;
using ObjCGsdInvoker = bool (*)(GsdObjCContext&);
struct ObjCGsdDispatchEntry {
  uint64_t dispatchId;
  ObjCGsdInvoker invoker;
};

struct GsdObjCContext {
  Runtime& runtime;
  const std::shared_ptr<NativeApiBridge>& bridge;
  id self;
  SEL selector;
  JSContextRef context;
  const JSValueRef* arguments;
  const NativeApiType& returnType;
  JSValueRef result = nullptr;
  const Value* valueArguments = nullptr;
  bool materializeValueResult = false;
  Value valueResult = Value::undefined();

  template <typename Invocation>
  void invokeNative(Invocation&& invocation) {
    performGeneratedObjCInvocation(runtime, bridge, [&]() { invocation(); });
  }

  bool readNumber(size_t i, double* out) {
    if (valueArguments != nullptr) {
      const Value& v = valueArguments[i];
      if (!v.isNumber()) return false;
      *out = v.getNumber();
      return true;
    }
    JSValueRef v = arguments[i];
    if (!JSValueIsNumber(context, v)) return false;
    JSValueRef exception = nullptr;
    double converted = JSValueToNumber(context, v, &exception);
    if (exception != nullptr) return false;
    *out = converted;
    return true;
  }
  bool readBool(size_t i, uint8_t* out) {
    if (valueArguments != nullptr) {
      const Value& v = valueArguments[i];
      if (!v.isBool()) return false;
      *out = v.getBool() ? 1 : 0;
      return true;
    }
    JSValueRef v = arguments[i];
    if (!JSValueIsBoolean(context, v)) return false;
    *out = JSValueToBoolean(context, v) ? 1 : 0;
    return true;
  }
  template <class T>
  bool readSigned(size_t i, T* out) {
    double tmp = 0;
    if (!readNumber(i, &tmp)) return false;
    *out = static_cast<T>(tmp);
    return true;
  }
  template <class T>
  bool readUnsigned(size_t i, T* out) {
    double tmp = 0;
    if (!readNumber(i, &tmp)) return false;
    *out = static_cast<T>(tmp);
    return true;
  }
  bool readFloat(size_t i, float* out) {
    double tmp = 0;
    if (!readNumber(i, &tmp)) return false;
    *out = static_cast<float>(tmp);
    return true;
  }
  bool readDouble(size_t i, double* out) { return readNumber(i, out); }
  bool readSelector(size_t i, SEL* out) {
    if (valueArguments != nullptr) {
      return readFastEngineSelectorArgument(runtime, valueArguments[i], out);
    }
    return readJSCEngineSelectorArgument(runtime, arguments[i], out);
  }
  bool readClass(size_t i, Class* out) {
    if (valueArguments != nullptr) {
      Class cls = classFromEngineValue(runtime, valueArguments[i]);
      if (cls == Nil) return false;
      *out = cls;
      return true;
    }
    if (auto* c = jscHostObjectRaw<NativeApiClassHostObject>(
            runtime, arguments[i])) {
      *out = c->nativeClass();
      return true;
    }
    Class cls = jscNativeClassArgument(runtime, arguments[i]);
    if (cls == Nil) return false;
    *out = cls;
    return true;
  }
  bool readObject(size_t i, id* out) {
    if (valueArguments != nullptr) {
      const Value& v = valueArguments[i];
      if (v.isNull() || v.isUndefined()) {
        *out = nil;
        return true;
      }
      if (!v.isObject()) return false;
      Object object = v.asObject(runtime);
      if (object.isHostObject<NativeApiObjectHostObject>(runtime)) {
        *out = object.getHostObject<NativeApiObjectHostObject>(runtime)->object();
        return true;
      }
      if (object.isHostObject<NativeApiClassHostObject>(runtime)) {
        *out = static_cast<id>(
            object.getHostObject<NativeApiClassHostObject>(runtime)->nativeClass());
        return true;
      }
      Class cls = classFromEngineValue(runtime, v);
      if (cls != Nil) {
        *out = static_cast<id>(cls);
        return true;
      }
      if (object.isHostObject<NativeApiProtocolHostObject>(runtime)) {
        *out = static_cast<id>(
            object.getHostObject<NativeApiProtocolHostObject>(runtime)
                ->nativeProtocol());
        return true;
      }
      return false;
    }
    JSValueRef v = arguments[i];
    if (v == nullptr || JSValueIsNull(context, v) ||
        JSValueIsUndefined(context, v)) {
      *out = nil;
      return true;
    }
    if (auto* h = jscHostObjectRaw<NativeApiObjectHostObject>(runtime, v)) {
      *out = h->object();
      return true;
    }
    if (auto* c = jscHostObjectRaw<NativeApiClassHostObject>(runtime, v)) {
      *out = static_cast<id>(c->nativeClass());
      return true;
    }
    if (JSValueIsObject(context, v)) {
      Class cls = jscNativeClassArgument(runtime, v);
      if (cls != Nil) {
        *out = static_cast<id>(cls);
        return true;
      }
    }
    if (auto* p = jscHostObjectRaw<NativeApiProtocolHostObject>(runtime, v)) {
      *out = static_cast<id>(p->nativeProtocol());
      return true;
    }
    return false;
  }

  void setVoid() {
    if (materializeValueResult) {
      valueResult = Value::undefined();
      return;
    }
    result = JSValueMakeUndefined(context);
  }
  void setBool(bool v) {
    if (materializeValueResult) {
      valueResult = Value(v);
      return;
    }
    result = JSValueMakeBoolean(context, v);
  }
  void setInt32(int32_t v) {
    if (materializeValueResult) {
      valueResult = Value(static_cast<double>(v));
      return;
    }
    result = JSValueMakeNumber(context, v);
  }
  void setUInt32(uint32_t v) {
    if (materializeValueResult) {
      valueResult = Value(static_cast<double>(v));
      return;
    }
    result = JSValueMakeNumber(context, v);
  }
  void setUInt16(uint16_t v) {
    if (materializeValueResult) {
      if (v >= 32 && v <= 126) {
        valueResult = makeString(runtime, std::string(1, static_cast<char>(v)));
      } else {
        valueResult = Value(static_cast<double>(v));
      }
      return;
    }
    if (v >= 32 && v <= 126) {
      char buffer[2] = {static_cast<char>(v), '\0'};
      JSStringRef string = engine::jscengine::makeJSString(buffer);
      result = JSValueMakeString(context, string);
      JSStringRelease(string);
    } else {
      result = JSValueMakeNumber(context, v);
    }
  }
  void setInt64(int64_t v) {
    if (materializeValueResult) {
      valueResult = signedInteger64ToEngineValue(runtime, v);
      return;
    }
    result = jscInteger64Value(runtime, v);
  }
  void setUInt64(uint64_t v) {
    if (materializeValueResult) {
      valueResult = unsignedInteger64ToEngineValue(runtime, v);
      return;
    }
    result = jscUnsignedInteger64Value(runtime, v);
  }
  void setDouble(double v) {
    if (materializeValueResult) {
      valueResult = Value(v);
      return;
    }
    result = JSValueMakeNumber(context, v);
  }
  void setSelector(SEL v) {
    const char* name = v != nullptr ? sel_getName(v) : nullptr;
    if (materializeValueResult) {
      valueResult = name != nullptr ? makeString(runtime, name) : Value::null();
      return;
    }
    if (name == nullptr) {
      result = JSValueMakeNull(context);
      return;
    }
    JSStringRef string = engine::jscengine::makeJSString(name);
    result = JSValueMakeString(context, string);
    JSStringRelease(string);
  }
  void setClass(Class v) {
    if (materializeValueResult) {
      if (v == nil) {
        valueResult = Value::null();
        return;
      }
      const char* name = class_getName(v);
      NativeApiSymbol symbol{
          .kind = NativeApiSymbolKind::Class,
          .offset = MD_SECTION_OFFSET_NULL,
          .name = name != nullptr ? name : "",
          .runtimeName = name != nullptr ? name : "",
      };
      if (const NativeApiSymbol* found = bridge->findClass(symbol.name)) {
        symbol = *found;
      }
      valueResult = makeNativeClassValue(runtime, bridge, std::move(symbol));
      return;
    }
    if (v == nil) {
      result = JSValueMakeNull(context);
      return;
    }
    const char* name = class_getName(v);
    NativeApiSymbol symbol{
        .kind = NativeApiSymbolKind::Class,
        .offset = MD_SECTION_OFFSET_NULL,
        .name = name != nullptr ? name : "",
        .runtimeName = name != nullptr ? name : "",
    };
    if (const NativeApiSymbol* found = bridge->findClass(symbol.name)) {
      symbol = *found;
    }
    Value classValue = makeNativeClassValue(runtime, bridge, std::move(symbol));
    result = classValue.local(runtime);
  }
  void setObject(id obj) {
    if (materializeValueResult) {
      valueResult = convertNativeReturnValue(runtime, bridge, returnType, &obj);
      return;
    }
    result = setJSCEngineObjectReturn(runtime, bridge, returnType, obj);
  }
};

// Close the anonymous namespace so the generated dispatch table lives in
// namespace nativescript. GsdObjCContext/ObjCGsdDispatchEntry remain reachable
// via the unnamed namespace's implicit using-directive.
}  // namespace (temporary close for GSD .inc)

#if defined(__has_include)
#if __has_include("GeneratedGsdSignatureDispatch.inc")
#include "GeneratedGsdSignatureDispatch.inc"
#endif
#endif

#ifndef NS_HAS_GENERATED_SIGNATURE_GSD_DISPATCH
inline constexpr ObjCGsdDispatchEntry kGeneratedObjCGsdDispatchEntries[] = {
    {0, nullptr}};
#endif

ObjCGsdInvoker lookupObjCGsdInvoker(uint64_t dispatchId) {
  if (!isGeneratedDispatchEnabled()) {
    return nullptr;
  }
  return lookupDispatchInvoker<ObjCGsdDispatchEntry, ObjCGsdInvoker>(
      kGeneratedObjCGsdDispatchEntries, dispatchId);
}

namespace {  // reopen anonymous namespace

// --- End GSD ---

void* lookupGeneratedEngineObjCGsdInvoker(uint64_t dispatchId) {
  return reinterpret_cast<void*>(lookupObjCGsdInvoker(dispatchId));
}

bool tryCallGeneratedEngineObjCSelector(
    Runtime& runtime, const std::shared_ptr<NativeApiBridge>& bridge,
    id receiver, const NativeApiPreparedObjCInvocation& prepared,
    const Value* args, size_t count, Class dispatchSuperClass, Value* result) {
  const bool dispatchingNativeCallToUI = shouldDispatchNativeCallToUI();
  if (result == nullptr || receiver == nil ||
      !prepared.gsdEngineCallable || dispatchSuperClass != Nil ||
      count != prepared.gsdEngineArgumentCount || dispatchingNativeCallToUI) {
    return false;
  }

  auto invoker = reinterpret_cast<ObjCGsdInvoker>(prepared.engineInvoker);
  GsdObjCContext ctx{runtime,  bridge,    receiver, prepared.selector,
                     runtime.context(), nullptr,    prepared.signature.returnType};
  ctx.valueArguments = args;
  ctx.materializeValueResult = true;
  if (!invoker(ctx)) {
    return false;
  }
  *result = std::move(ctx.valueResult);
  return true;
}

JSValueRef setJSCEnginePreparedObjCResult(
    Runtime& runtime, const std::shared_ptr<NativeApiBridge>& bridge,
    id receiver, const NativeApiPreparedObjCInvocation& prepared,
    const std::shared_ptr<NativeApiObjectHostObject>& receiverHostObject,
    const std::optional<Object>& initializerClassWrapper,
    size_t providedCount, const JSValueRef arguments[],
    Class dispatchSuperClass) {
  const NativeApiSignature& signature = prepared.signature;
  if (receiver == nil || signature.variadic ||
      unsupportedEngineType(signature.returnType)) {
    throw JSError(runtime,
                  "Objective-C selector is not supported by JSC engine: " +
                      prepared.selectorName);
  }

  const bool isNSErrorOutMethod = prepared.isNSErrorOutMethod;
  if (isNSErrorOutMethod) {
    size_t expected = signature.argumentTypes.size();
    if (providedCount > expected || providedCount + 1 < expected) {
      throw JSError(
          runtime, "Actual arguments count: \"" + std::to_string(providedCount) +
                       "\". Expected: \"" + std::to_string(expected) + "\".");
    }
  } else if (providedCount != signature.argumentTypes.size()) {
    throw JSError(
        runtime, "Actual arguments count: \"" + std::to_string(providedCount) +
                     "\". Expected: \"" +
                     std::to_string(signature.argumentTypes.size()) + "\".");
  }

  // GSD fast path: the generated invoker reads args directly from the JSC
  // arguments, calls objc_msgSend with a typed cast, and produces the JS
  // return value — bypassing all generic marshalling.
  const bool dispatchingNativeCallToUI = shouldDispatchNativeCallToUI();
  if (prepared.gsdEngineCallable && dispatchSuperClass == Nil &&
      providedCount == prepared.gsdEngineArgumentCount &&
      !initializerClassWrapper && !isNSErrorOutMethod &&
      !dispatchingNativeCallToUI) {
    auto invoker = reinterpret_cast<ObjCGsdInvoker>(prepared.engineInvoker);
    GsdObjCContext ctx{runtime,  bridge,    receiver, prepared.selector,
                       runtime.context(), arguments, signature.returnType};
    if (invoker(ctx)) {
      return ctx.result;
    }
  }

  if (dispatchSuperClass == Nil && !initializerClassWrapper &&
      providedCount <= 2) {
    Value fastArgs[2];
    for (size_t i = 0; i < providedCount; i++) {
      fastArgs[i] = Value::borrowed(runtime, arguments[i]);
    }
    Value fastResult;
    if (tryCallFastEngineObjCSelector(runtime, bridge, receiver, prepared,
                                      fastArgs, providedCount, Nil,
                                      &fastResult)) {
      return fastResult.local(runtime);
    }
  }

  NativeApiArgumentFrame frame(signature.argumentTypes.size());
  for (size_t i = 0; i < providedCount; i++) {
    if (!prepareJSCEngineArgument(runtime, bridge, signature.argumentTypes[i],
                                  arguments[i], frame, i)) {
      throw JSError(runtime,
                    "Objective-C argument is not supported by JSC engine: " +
                        prepared.selectorName);
    }
  }

  const bool hasImplicitNSErrorOutArg =
      isNSErrorOutMethod && providedCount + 1 == signature.argumentTypes.size();
  NSError* implicitNSError = nil;
  if (hasImplicitNSErrorOutArg) {
    size_t outArgIndex = signature.argumentTypes.size() - 1;
    void* target = frame.storageAt(outArgIndex, sizeof(NSError**));
    NSError** implicitNSErrorOutArg = &implicitNSError;
    *static_cast<void**>(target) = implicitNSErrorOutArg;
  }

  NativeApiPointerFrame values(signature.argumentTypes.size() + 2);
  size_t valueIndex = 0;
  struct objc_super superReceiver = {receiver, dispatchSuperClass};
  struct objc_super* superReceiverPtr = &superReceiver;
  if (dispatchSuperClass != Nil) {
    values.set(valueIndex++, &superReceiverPtr);
  } else {
    values.set(valueIndex++, &receiver);
  }
  values.set(valueIndex++, const_cast<SEL*>(&prepared.selector));
  for (size_t i = 0; i < signature.argumentTypes.size(); i++) {
    values.set(valueIndex++, frame.values()[i]);
  }

  NativeApiReturnStorage returnStorage(
      nativeSizeForType(signature.returnType));
  bool retainedReturn = false;
  performNativeInvocation(runtime, bridge->nativeInvocationInvoker(), [&]() {
    if (prepared.preparedInvoker != nullptr && dispatchSuperClass == Nil) {
      prepared.preparedInvoker(reinterpret_cast<void*>(objc_msgSend),
                               values.data(), returnStorage.data());
    } else {
#if defined(__x86_64__)
      bool isStret = signature.returnType.ffiType->size > 16 &&
                     signature.returnType.ffiType->type == FFI_TYPE_STRUCT;
      void* target = dispatchSuperClass != Nil
                         ? (isStret ? FFI_FN(objc_msgSendSuper_stret)
                                    : FFI_FN(objc_msgSendSuper))
                         : (isStret ? FFI_FN(objc_msgSend_stret)
                                    : FFI_FN(objc_msgSend));
      ffi_call(const_cast<ffi_cif*>(&signature.cif), target,
               returnStorage.data(), values.data());
#else
      ffi_call(const_cast<ffi_cif*>(&signature.cif),
               dispatchSuperClass != Nil ? FFI_FN(objc_msgSendSuper)
                                         : FFI_FN(objc_msgSend),
               returnStorage.data(), values.data());
#endif
    }
    if (dispatchingNativeCallToUI && !signature.returnType.returnOwned &&
        isObjectiveCObjectType(signature.returnType)) {
      id object = *reinterpret_cast<id*>(returnStorage.data());
      if (object != nil) {
        [object retain];
        retainedReturn = true;
      }
    }
  });

  NativeApiType returnType = signature.returnType;
  if (retainedReturn) {
    returnType.returnOwned = true;
  }
  if (hasImplicitNSErrorOutArg && implicitNSError != nil) {
    const char* errorMessage = [[implicitNSError description] UTF8String];
    throw JSError(
        runtime, errorMessage != nullptr ? errorMessage : "Unknown NSError");
  }
  if (initializerClassWrapper) {
    id resultObject = nil;
    if (isObjectiveCObjectType(returnType)) {
      resultObject = *static_cast<id*>(returnStorage.data());
    }
    if (receiverHostObject != nullptr && resultObject != receiver) {
      receiverHostObject->disownObject(receiver);
    }
    if (resultObject != nil) {
      bridge->setObjectExpando(runtime, resultObject,
                               "__nativeApiClassWrapper",
                               Value(runtime, *initializerClassWrapper));
    }
  }
  return setJSCEngineReturnValue(runtime, bridge, returnType,
                                 returnStorage.data(), prepared.selectorName);
}

JSValueRef NativeApiSelectorGroupCall(
    JSContextRef context, JSObjectRef function, JSObjectRef thisObject,
    size_t argumentCount, const JSValueRef arguments[], JSValueRef* exception) {
  auto* data =
      static_cast<NativeApiSelectorGroupData*>(JSObjectGetPrivate(function));
  if (data == nullptr || data->selectors == nullptr ||
      data->preparedInvocations == nullptr) {
    return JSValueMakeUndefined(context);
  }

  Runtime& runtime = data->runtime;
  try {
    NativeApiRoundTripCacheFrameGuard roundTripFrame(data->bridge);
    if (argumentCount >= data->selectors->size() ||
        (*data->selectors)[argumentCount].selectorName.empty()) {
      throw JSError(runtime,
                    "Objective-C selector is not available for the provided arguments "
                    "count.");
    }

    NativeApiSelectorGroupEntry& entry = (*data->selectors)[argumentCount];
    auto& prepared = (*data->preparedInvocations)[argumentCount];
    Class selectorLookupClass = data->lookupClass;
    id receiver = data->receiverIsClass ? static_cast<id>(data->lookupClass) : nil;
    std::shared_ptr<NativeApiObjectHostObject> receiverHostObject;
    if (!data->receiverIsClass) {
      if (data->boundReceiverState != nullptr) {
        receiver = data->boundReceiverState->object();
        if (receiver == nil) {
          throw JSError(runtime,
                        "Objective-C selector requires a native receiver.");
        }
      } else if (thisObject != nullptr) {
        auto* holder = static_cast<engine::jscengine::HostObjectHolder*>(
            JSObjectGetPrivate(thisObject));
        if (holder != nullptr &&
            holder->typeToken ==
                engine::jscengine::hostObjectTypeToken<
                    NativeApiObjectHostObject>()) {
          receiver =
              static_cast<NativeApiObjectHostObject*>(holder->hostObject.get())
                  ->object();
        }
      }
    }
    if (receiver == nil) {
      throw JSError(runtime,
                    "Objective-C selector requires a native receiver.");
    }

    const bool propertyGetterCall =
        entry.hasMember && entry.member.property && argumentCount == 0;
    const std::string* selectorNamePtr = &entry.selectorName;
    const NativeApiMember* selectedMember =
        entry.hasMember ? &entry.member : nullptr;
    bool callTargetCanPrepare = true;
    if (prepared == nullptr || propertyGetterCall) {
      NativeApiSelectorGroupCallTarget callTarget = selectorGroupMemberForCall(
          receiver, selectorLookupClass, data->receiverIsClass, entry,
          argumentCount);
      selectorNamePtr = callTarget.selectorName;
      selectedMember = callTarget.member;
      callTargetCanPrepare = callTarget.canPrepare;
      if (prepared != nullptr && prepared->selectorName != *selectorNamePtr) {
        prepared = nullptr;
      }
    }
    const std::string& selectorName =
        prepared != nullptr && !propertyGetterCall ? prepared->selectorName
                                                   : *selectorNamePtr;

    if (data->receiverIsClass) {
      Class methodClass = prepared != nullptr ? prepared->receiverClass : Nil;
      if (methodClass == Nil) {
        SEL selector = sel_registerName(selectorName.c_str());
        methodClass =
            NativeApiClassHostObject::classRespondingToClassSelector(
                data->lookupClass, selector);
      }
      if (methodClass == Nil) {
        throw JSError(runtime,
                      "Objective-C selector is not available: " +
                          entry.selectorName);
      }
      selectorLookupClass = methodClass;
      receiver = static_cast<id>(methodClass);
    }
    if (propertyGetterCall && !callTargetCanPrepare) {
      return callObjCSelector(runtime, data->bridge, receiver,
                              data->receiverIsClass, selectorName,
                              selectedMember, nullptr, 0)
          .local(runtime);
    }

    if (prepared == nullptr) {
      if (!data->receiverIsClass) {
        SEL selector = sel_registerName(selectorName.c_str());
        if (class_getInstanceMethod(selectorLookupClass, selector) == nullptr) {
          Class receiverClass = object_getClass(receiver);
          if (class_getInstanceMethod(receiverClass, selector) != nullptr) {
            selectorLookupClass = receiverClass;
          }
        }
      }
      prepared = prepareNativeApiObjCInvocation(
          runtime, data->bridge, selectorLookupClass, data->receiverIsClass,
          selectorName, selectedMember);
      // Look up the engine-neutral GSD invoker for this signature.
      if (prepared->engineInvoker == nullptr) {
        uint64_t dispatchId = dispatchIdForEngineSignature(
            prepared->signature, SignatureCallKind::ObjCMethod);
        if (auto gsdInvoker = lookupObjCGsdInvoker(dispatchId)) {
          prepared->engineInvoker = reinterpret_cast<void*>(gsdInvoker);
          configureGeneratedEngineObjCInvocation(*prepared);
        }
      }
    }

    std::optional<Object> initializerClassWrapper;
    if (!data->receiverIsClass && prepared->isInitMethod) {
      if (!receiverHostObject) {
        if (data->boundReceiverState != nullptr) {
          if (auto boundReceiver = data->boundReceiver.lock()) {
            receiverHostObject = std::move(boundReceiver);
          }
        } else if (thisObject != nullptr) {
          auto* holder = static_cast<engine::jscengine::HostObjectHolder*>(
              JSObjectGetPrivate(thisObject));
          if (holder != nullptr &&
              holder->typeToken ==
                  engine::jscengine::hostObjectTypeToken<
                      NativeApiObjectHostObject>()) {
            receiverHostObject =
                std::static_pointer_cast<NativeApiObjectHostObject>(
                    holder->hostObject);
          }
        }
      }
      Value classWrapperValue = data->bridge->findObjectExpando(
          runtime, receiver, "__nativeApiClassWrapper");
      if (classWrapperValue.isObject()) {
        initializerClassWrapper.emplace(classWrapperValue.asObject(runtime));
      }
      data->bridge->forgetRoundTripValue(receiver);
      data->bridge->forgetObjectExpandos(receiver);
    }

    Class dispatchClass = Nil;
    if (!data->receiverIsClass) {
      Class receiverClass = object_getClass(receiver);
      if (receiverClass == data->cachedReceiverClass) {
        dispatchClass = data->cachedDispatchClass;
      } else {
        dispatchClass = dispatchSuperclassForEngineDerivedReceiver(
            receiver, data->lookupClass);
        data->cachedReceiverClass = receiverClass;
        data->cachedDispatchClass = dispatchClass;
      }
    }
    return setJSCEnginePreparedObjCResult(
        runtime, data->bridge, receiver, *prepared, receiverHostObject,
        initializerClassWrapper, argumentCount, arguments, dispatchClass);
  } catch (const std::exception& error) {
    engine::jscengine::setException(context, exception, error);
    return JSValueMakeUndefined(context);
  }
}

void NativeApiSelectorGroupFinalize(JSObjectRef function) {
  delete static_cast<NativeApiSelectorGroupData*>(
      JSObjectGetPrivate(function));
}

JSClassRef NativeApiSelectorGroupFunctionClass(Runtime& runtime) {
  auto state = runtime.state();
  if (state->selectorGroupFunctionClass == nullptr) {
    JSClassDefinition definition = kJSClassDefinitionEmpty;
    definition.className = "NativeScriptEngineSelectorGroupFunction";
    definition.callAsFunction = NativeApiSelectorGroupCall;
    definition.finalize = NativeApiSelectorGroupFinalize;
    state->selectorGroupFunctionClass = JSClassCreate(&definition);
  }
  return state->selectorGroupFunctionClass;
}

Function CreateNativeApiSelectorGroupFunctionImpl(
    Runtime& runtime, std::shared_ptr<NativeApiBridge> bridge,
    Class lookupClass, bool receiverIsClass,
    std::shared_ptr<std::vector<NativeApiSelectorGroupEntry>> selectors,
    std::shared_ptr<
        std::vector<std::shared_ptr<NativeApiPreparedObjCInvocation>>>
        preparedInvocations,
    std::weak_ptr<NativeApiObjectHostObject> boundReceiver,
    std::shared_ptr<NativeApiObjectLifetimeState> boundReceiverState =
        nullptr) {
  auto* data = new NativeApiSelectorGroupData(
      runtime.state(), std::move(bridge), lookupClass, receiverIsClass,
      std::move(selectors), std::move(preparedInvocations),
      std::move(boundReceiver), std::move(boundReceiverState));
  JSObjectRef function =
      JSObjectMake(runtime.context(),
                   NativeApiSelectorGroupFunctionClass(runtime), data);
  engine::jscengine::setFunctionPrototype(runtime.context(), function);

  JSStringRef property = engine::jscengine::makeJSString("name");
  JSStringRef functionName =
      engine::jscengine::makeJSString("__nativeSelectorGroup");
  JSValueRef value = JSValueMakeString(runtime.context(), functionName);
  JSObjectSetProperty(runtime.context(), function, property, value,
                      kJSPropertyAttributeReadOnly, nullptr);
  JSStringRelease(functionName);
  JSStringRelease(property);

  Value functionValue(runtime, function);
  return functionValue.asObject(runtime).asFunction(runtime);
}

Function CreateNativeApiSelectorGroupFunction(
    Runtime& runtime, std::shared_ptr<NativeApiBridge> bridge,
    Class lookupClass, bool receiverIsClass,
    std::shared_ptr<std::vector<NativeApiSelectorGroupEntry>> selectors,
    std::shared_ptr<
        std::vector<std::shared_ptr<NativeApiPreparedObjCInvocation>>>
        preparedInvocations) {
  return CreateNativeApiSelectorGroupFunctionImpl(
      runtime, std::move(bridge), lookupClass, receiverIsClass,
      std::move(selectors), std::move(preparedInvocations), {}, nullptr);
}

Function CreateNativeApiBoundSelectorGroupFunction(
    Runtime& runtime, std::shared_ptr<NativeApiBridge> bridge, Class lookupClass,
    std::shared_ptr<NativeApiObjectHostObject> receiverHostObject,
    std::shared_ptr<std::vector<NativeApiSelectorGroupEntry>> selectors,
    std::shared_ptr<
        std::vector<std::shared_ptr<NativeApiPreparedObjCInvocation>>>
        preparedInvocations) {
  return CreateNativeApiSelectorGroupFunctionImpl(
      runtime, std::move(bridge), lookupClass, false, std::move(selectors),
      std::move(preparedInvocations), receiverHostObject,
      receiverHostObject != nullptr ? receiverHostObject->lifetimeState()
                                    : nullptr);
}

}  // namespace

#include "../shared/bridge/Install.mm"

void InstallNativeApi(JSGlobalContextRef context, const NativeApiConfig& config) {
  if (context == nullptr) {
    return;
  }
  Runtime runtime(context);
  InstallNativeApi(runtime, config);
}

}  // namespace nativescript

extern "C" void NativeScriptInstallNativeApi(JSGlobalContextRef context,
                                                const char* metadataPath) {
  nativescript::NativeApiConfig config;
  config.metadataPath = metadataPath;
  nativescript::InstallNativeApi(context, config);
}

#endif  // TARGET_ENGINE_JSC

#include "NativeApiQuickJS.h"

#ifdef TARGET_ENGINE_QUICKJS

#include "NativeApiQuickJSRuntime.h"
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
#define NATIVESCRIPT_NATIVE_API_HOST_EXPLICIT_OVERRIDE 1
#define NATIVESCRIPT_NATIVE_API_BACKEND_NAME "quickjs"
#include "../shared/bridge/ObjCBridge.mm"
// clang-format on

#define NATIVESCRIPT_NATIVE_API_HAS_ENGINE_LAZY_GLOBALS 1
#define NATIVESCRIPT_NATIVE_API_RETAIN_RUNTIME 1
#define NATIVESCRIPT_NATIVE_API_HAS_ENGINE_SELECTOR_GROUP_FUNCTION 1

static JSValue NativeApiLazyGlobalGetter(JSContext* context, JSValueConst, int,
                                                JSValueConst*, int, JSValueConst* data) {
  JSValue global = JS_GetGlobalObject(context);
  JSValue resolver = JS_GetPropertyStr(context, global, "__nativeScriptResolveNativeApiLazyGlobal");
  if (!JS_IsFunction(context, resolver)) {
    JS_FreeValue(context, resolver);
    JS_FreeValue(context, global);
    return JS_UNDEFINED;
  }

  JSValueConst args[] = {data[0], data[1]};
  JSValue result = JS_Call(context, resolver, global, 2, args);
  JS_FreeValue(context, resolver);
  if (JS_IsException(result)) {
    JS_FreeValue(context, global);
    return result;
  }

  JSAtom atom = JS_ValueToAtom(context, data[0]);
  if (atom != JS_ATOM_NULL) {
    JS_DefinePropertyValue(context, global, atom, JS_DupValue(context, result),
                           JS_PROP_CONFIGURABLE | JS_PROP_WRITABLE);
    JS_FreeAtom(context, atom);
  }
  JS_FreeValue(context, global);
  return result;
}

// Assigning over a lazy global must behave like a plain global assignment
// (@nativescript/core writes shims such as global.System); replace the
// accessor with an ordinary writable property instead of throwing
// "no setter for property".
static JSValue NativeApiLazyGlobalSetter(JSContext* context, JSValueConst, int argc,
                                                JSValueConst* argv, int, JSValueConst* data) {
  JSValue global = JS_GetGlobalObject(context);
  JSAtom atom = JS_ValueToAtom(context, data[0]);
  if (atom != JS_ATOM_NULL) {
    JSValue value = argc > 0 ? JS_DupValue(context, argv[0]) : JS_UNDEFINED;
    JS_DefinePropertyValue(context, global, atom, value, JS_PROP_C_W_E);
    JS_FreeAtom(context, atom);
  }
  JS_FreeValue(context, global);
  return JS_UNDEFINED;
}

bool InstallNativeApiLazyGlobal(Runtime& runtime, std::shared_ptr<NativeApiBridge>,
                                      const std::string& name, const std::string& kind,
                                      bool force) {
  if (name.empty() || kind.empty()) {
    return false;
  }

  JSContext* context = runtime.context();
  JSValue global = JS_GetGlobalObject(context);
  JSAtom atom = JS_NewAtomLen(context, name.data(), name.size());
  if (atom == JS_ATOM_NULL) {
    JS_FreeValue(context, global);
    return false;
  }

  int hasProperty = JS_HasProperty(context, global, atom);
  if (!force && hasProperty > 0) {
    JS_FreeAtom(context, atom);
    JS_FreeValue(context, global);
    return false;
  }
  if (hasProperty < 0) {
    JS_FreeAtom(context, atom);
    JS_FreeValue(context, global);
    return false;
  }

  JSValue data[] = {
      JS_NewStringLen(context, name.data(), name.size()),
      JS_NewStringLen(context, kind.data(), kind.size()),
  };
  if (JS_IsException(data[0]) || JS_IsException(data[1])) {
    JS_FreeValue(context, data[0]);
    JS_FreeValue(context, data[1]);
    JS_FreeAtom(context, atom);
    JS_FreeValue(context, global);
    return false;
  }

  JSValue getter = JS_NewCFunctionData(context, NativeApiLazyGlobalGetter, 0, 0, 2, data);
  JSValue setter = JS_NewCFunctionData(context, NativeApiLazyGlobalSetter, 1, 0, 2, data);
  JS_FreeValue(context, data[0]);
  JS_FreeValue(context, data[1]);
  if (JS_IsException(getter) || JS_IsException(setter)) {
    JS_FreeValue(context, getter);
    JS_FreeValue(context, setter);
    JS_FreeAtom(context, atom);
    JS_FreeValue(context, global);
    return false;
  }

  int status = JS_DefinePropertyGetSet(context, global, atom, getter, setter, JS_PROP_CONFIGURABLE);
  JS_FreeAtom(context, atom);
  JS_FreeValue(context, global);
  return status >= 0;
}

void SetNativeApiObjectPrototype(Runtime& runtime, Object& object,
                                       const Object& prototype) {
  JSValue objectValue = object.local(runtime);
  JSValue prototypeValue = prototype.local(runtime);
  int status = JS_SetPrototype(runtime.context(), objectValue, prototypeValue);
  JS_FreeValue(runtime.context(), prototypeValue);
  JS_FreeValue(runtime.context(), objectValue);
  if (status < 0) {
    throw JSError(runtime, "QuickJS prototype assignment failed.");
  }
}

// clang-format off
#include "../shared/bridge/HostObjects.mm"
// clang-format on

std::shared_ptr<Runtime> retainNativeApiRuntime(Runtime& runtime) {
  return std::make_shared<Runtime>(runtime.state());
}

// clang-format off
#include "../shared/bridge/Callbacks.mm"
#include "../shared/bridge/TypeConv.mm"
#include "../shared/bridge/Invocation.mm"
#include "../shared/bridge/ClassBuilder.mm"
#include "../shared/bridge/HostObject.mm"
// clang-format on

struct NativeApiSelectorGroupData {
  NativeApiSelectorGroupData(
      std::shared_ptr<engine::quickjsengine::RuntimeState> state,
      std::shared_ptr<NativeApiBridge> bridge, Class lookupClass,
      bool receiverIsClass,
      std::shared_ptr<std::vector<NativeApiSelectorGroupEntry>>
          selectors,
      std::shared_ptr<
          std::vector<std::shared_ptr<NativeApiPreparedObjCInvocation>>>
          preparedInvocations)
      : state(std::move(state)),
        bridge(std::move(bridge)),
        lookupClass(lookupClass),
        receiverIsClass(receiverIsClass),
        selectors(std::move(selectors)),
        preparedInvocations(std::move(preparedInvocations)) {}

  std::shared_ptr<engine::quickjsengine::RuntimeState> state;
  std::shared_ptr<NativeApiBridge> bridge;
  Class lookupClass = Nil;
  bool receiverIsClass = false;
  std::shared_ptr<std::vector<NativeApiSelectorGroupEntry>> selectors;
  std::shared_ptr<
      std::vector<std::shared_ptr<NativeApiPreparedObjCInvocation>>>
      preparedInvocations;
};

std::string quickJSValueToUtf8(JSContext* context, JSValueConst value) {
  size_t length = 0;
  const char* text = JS_ToCStringLen(context, &length, value);
  if (text == nullptr) {
    return {};
  }
  std::string result(text, length);
  JS_FreeCString(context, text);
  return result;
}

bool quickJSNumberValue(JSContext* context, JSValueConst value,
                        double* result) {
  if (result == nullptr) {
    return false;
  }
  double converted = 0;
  if (JS_ToFloat64(context, &converted, value) < 0) {
    return false;
  }
  *result = converted;
  return true;
}

template <typename T>
std::shared_ptr<T> quickJSHostObject(Runtime& runtime, JSValueConst value) {
  if (!JS_IsObject(value)) {
    return nullptr;
  }
  engine::quickjsengine::ensureClasses(runtime);
  auto* holder = static_cast<engine::quickjsengine::HostObjectHolder*>(
      JS_GetOpaque(value, engine::quickjsengine::gHostClassId));
  if (holder == nullptr ||
      holder->typeToken != engine::quickjsengine::hostObjectTypeToken<T>()) {
    return nullptr;
  }
  return std::static_pointer_cast<T>(holder->hostObject);
}

id quickJSNativeObjectArgument(
    Runtime& runtime, const std::shared_ptr<NativeApiBridge>& bridge,
    const NativeApiType& type, JSValueConst value,
    NativeApiArgumentFrame& frame) {
  JSContext* context = runtime.context();
  if (JS_IsNull(value) || JS_IsUndefined(value)) {
    return nil;
  }
  if (JS_IsString(value)) {
    std::string utf8 = quickJSValueToUtf8(context, value);
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
  if (JS_IsBool(value)) {
    return [NSNumber numberWithBool:JS_ToBool(context, value) != 0];
  }
  if (JS_IsNumber(value) || JS_IsBigInt(context, value)) {
    double converted = 0;
    if (quickJSNumberValue(context, value, &converted)) {
      return [NSNumber numberWithDouble:converted];
    }
  }
  if (!JS_IsObject(value)) {
    return nil;
  }
  if (auto objectHost =
          quickJSHostObject<NativeApiObjectHostObject>(runtime, value)) {
    return objectHost->object();
  }
  if (auto classHost =
          quickJSHostObject<NativeApiClassHostObject>(runtime, value)) {
    return static_cast<id>(classHost->nativeClass());
  }
  if (auto protocolHost =
          quickJSHostObject<NativeApiProtocolHostObject>(runtime, value)) {
    return static_cast<id>(protocolHost->nativeProtocol());
  }
  if (auto pointerHost =
          quickJSHostObject<NativeApiPointerHostObject>(runtime, value)) {
    return static_cast<id>(pointerHost->pointer());
  }
  if (auto referenceHost =
          quickJSHostObject<NativeApiReferenceHostObject>(runtime, value)) {
    return static_cast<id>(referenceHost->data());
  }
  if (auto structHost =
          quickJSHostObject<NativeApiStructObjectHostObject>(runtime, value)) {
    return static_cast<id>(structHost->data());
  }

  JSValue wrappedClassValue =
      JS_GetPropertyStr(context, value, "__nativeApiClass");
  if (!JS_IsException(wrappedClassValue)) {
    if (auto classHost = quickJSHostObject<NativeApiClassHostObject>(
            runtime, wrappedClassValue)) {
      JS_FreeValue(context, wrappedClassValue);
      return static_cast<id>(classHost->nativeClass());
    }
  }
  JS_FreeValue(context, wrappedClassValue);

  Value wrapped = Value::borrowed(runtime, value);
  return objectFromEngineValue(runtime, bridge, wrapped, frame,
                               type.kind ==
                                   metagen::mdTypeNSMutableStringObject);
}

Class quickJSNativeClassArgument(Runtime& runtime, JSValueConst value) {
  if (JS_IsNull(value) || JS_IsUndefined(value)) {
    return Nil;
  }
  if (auto classHost =
          quickJSHostObject<NativeApiClassHostObject>(runtime, value)) {
    return classHost->nativeClass();
  }
  if (JS_IsObject(value)) {
    JSValue wrappedClassValue =
        JS_GetPropertyStr(runtime.context(), value, "__nativeApiClass");
    if (!JS_IsException(wrappedClassValue)) {
      if (auto classHost = quickJSHostObject<NativeApiClassHostObject>(
              runtime, wrappedClassValue)) {
        JS_FreeValue(runtime.context(), wrappedClassValue);
        return classHost->nativeClass();
      }
    }
    JS_FreeValue(runtime.context(), wrappedClassValue);
  }
  Value wrapped = Value::borrowed(runtime, value);
  return classFromEngineValue(runtime, wrapped);
}

bool readQuickJSEngineSelectorArgument(Runtime& runtime, JSValueConst value,
                                       SEL* result) {
  if (result == nullptr) {
    return false;
  }
  if (JS_IsNull(value) || JS_IsUndefined(value)) {
    *result = nullptr;
    return true;
  }
  if (!JS_IsString(value)) {
    return false;
  }
  std::string selectorName = quickJSValueToUtf8(runtime.context(), value);
  *result = sel_registerName(selectorName.c_str());
  return true;
}

template <typename T>
bool writeQuickJSNumber(JSContext* context, JSValueConst value, void* target) {
  double converted = 0;
  if (!quickJSNumberValue(context, value, &converted)) {
    return false;
  }
  *static_cast<T*>(target) = static_cast<T>(converted);
  return true;
}

bool prepareQuickJSEngineArgument(
    Runtime& runtime, const std::shared_ptr<NativeApiBridge>& bridge,
    const NativeApiType& type, JSValueConst value,
    NativeApiArgumentFrame& frame, size_t index) {
  ffi_type* ffiType = ffiTypeForEngineArgument(type);
  size_t size =
      ffiType != nullptr && ffiType->size > 0 ? ffiType->size : nativeSizeForType(type);
  void* target = frame.storageAt(index, size);
  JSContext* context = runtime.context();

  switch (type.kind) {
    case metagen::mdTypeBool:
      if (!JS_IsBool(value)) {
        return false;
      }
      *static_cast<uint8_t*>(target) = JS_ToBool(context, value) != 0 ? 1 : 0;
      return true;
    case metagen::mdTypeChar:
      return writeQuickJSNumber<int8_t>(context, value, target);
    case metagen::mdTypeUChar:
    case metagen::mdTypeUInt8:
      return writeQuickJSNumber<uint8_t>(context, value, target);
    case metagen::mdTypeSShort:
      return writeQuickJSNumber<int16_t>(context, value, target);
    case metagen::mdTypeUShort:
      if (JS_IsString(value)) {
        std::string text = quickJSValueToUtf8(context, value);
        if (text.size() != 1) {
          return false;
        }
        *static_cast<uint16_t*>(target) =
            static_cast<uint16_t>(static_cast<unsigned char>(text[0]));
        return true;
      }
      return writeQuickJSNumber<uint16_t>(context, value, target);
    case metagen::mdTypeSInt: {
      int32_t converted = 0;
      if (JS_ToInt32(context, &converted, value) < 0) {
        return false;
      }
      *static_cast<int32_t*>(target) = converted;
      return true;
    }
    case metagen::mdTypeUInt: {
      uint32_t converted = 0;
      if (JS_ToUint32(context, &converted, value) < 0) {
        return false;
      }
      *static_cast<uint32_t*>(target) = converted;
      return true;
    }
    case metagen::mdTypeSLong:
    case metagen::mdTypeSInt64: {
      int64_t converted = 0;
      if (JS_ToInt64Ext(context, &converted, value) < 0) {
        return false;
      }
      *static_cast<int64_t*>(target) = converted;
      return true;
    }
    case metagen::mdTypeULong:
    case metagen::mdTypeUInt64: {
      uint64_t converted = 0;
      if (JS_IsBigInt(context, value)) {
        if (JS_ToBigUint64(context, &converted, value) < 0) {
          return false;
        }
      } else {
        int64_t signedValue = 0;
        if (JS_ToInt64Ext(context, &signedValue, value) < 0) {
          return false;
        }
        converted = static_cast<uint64_t>(signedValue);
      }
      *static_cast<uint64_t*>(target) = converted;
      return true;
    }
    case metagen::mdTypeFloat:
      return writeQuickJSNumber<float>(context, value, target);
    case metagen::mdTypeDouble:
      return writeQuickJSNumber<double>(context, value, target);
    case metagen::mdTypeSelector:
      return readQuickJSEngineSelectorArgument(runtime, value,
                                               static_cast<SEL*>(target));
    case metagen::mdTypeClass: {
      Class cls = quickJSNativeClassArgument(runtime, value);
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
          quickJSNativeObjectArgument(runtime, bridge, type, value, frame);
      return true;
    default:
      break;
  }

  Value wrapped = Value::borrowed(runtime, value);
  convertEngineFfiArgument(runtime, bridge, type, wrapped, target, frame);
  return true;
}

JSValue quickJSInteger64Value(Runtime& runtime, int64_t value) {
  constexpr int64_t maxSafeInteger = 9007199254740991LL;
  constexpr int64_t minSafeInteger = -9007199254740991LL;
  if (value >= minSafeInteger && value <= maxSafeInteger) {
    return JS_NewFloat64(runtime.context(), static_cast<double>(value));
  }
  return JS_NewBigInt64(runtime.context(), value);
}

JSValue quickJSUnsignedInteger64Value(Runtime& runtime, uint64_t value) {
  constexpr uint64_t maxSafeInteger = 9007199254740991ULL;
  if (value <= maxSafeInteger) {
    return JS_NewFloat64(runtime.context(), static_cast<double>(value));
  }
  return JS_NewBigUint64(runtime.context(), value);
}

JSValue setQuickJSEngineObjectReturn(
    Runtime& runtime, const std::shared_ptr<NativeApiBridge>& bridge,
    NativeApiType type, id object) {
  JSContext* context = runtime.context();
  if (object == nil || [object isKindOfClass:[NSNull class]]) {
    if (object != nil && type.returnOwned) {
      [object release];
    }
    return JS_NULL;
  }
  if ([object respondsToSelector:@selector(UTF8String)] &&
      (type.kind == metagen::mdTypeAnyObject ||
       type.kind == metagen::mdTypeNSStringObject)) {
    std::string utf8 = utf8StringFromNSString(static_cast<NSString*>(object));
    if (type.returnOwned) {
      [object release];
    }
    return JS_NewStringLen(context, utf8.data(), utf8.size());
  }
  if ([object isKindOfClass:[NSNumber class]] &&
      ![object isKindOfClass:[NSDecimalNumber class]]) {
    NSNumber* number = static_cast<NSNumber*>(object);
    const char* objCType = [number objCType];
    bool isBool = CFGetTypeID((__bridge CFTypeRef)number) ==
                      CFBooleanGetTypeID() ||
                  (objCType != nullptr &&
                   std::strcmp(objCType, @encode(BOOL)) == 0);
    JSValue result = isBool ? JS_NewBool(context, [number boolValue])
                            : JS_NewFloat64(context, [number doubleValue]);
    if (type.returnOwned) {
      [object release];
    }
    return result;
  }

  Value roundTrip = bridge->findRoundTripValue(runtime, object);
  if (!roundTrip.isUndefined()) {
    JSValue result = roundTrip.local(runtime);
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

JSValue setQuickJSEngineReturnValue(
    Runtime& runtime, const std::shared_ptr<NativeApiBridge>& bridge,
    NativeApiType type, void* value, const std::string& selectorName) {
  JSContext* context = runtime.context();
  switch (type.kind) {
    case metagen::mdTypeVoid:
      return JS_UNDEFINED;
    case metagen::mdTypeBool:
      return JS_NewBool(context, *static_cast<uint8_t*>(value) != 0);
    case metagen::mdTypeChar:
      return JS_NewInt32(context, *static_cast<int8_t*>(value));
    case metagen::mdTypeUChar:
    case metagen::mdTypeUInt8:
      return JS_NewUint32(context, *static_cast<uint8_t*>(value));
    case metagen::mdTypeSShort:
      return JS_NewInt32(context, *static_cast<int16_t*>(value));
    case metagen::mdTypeUShort: {
      uint16_t raw = *static_cast<uint16_t*>(value);
      if (raw >= 32 && raw <= 126) {
        char buffer[2] = {static_cast<char>(raw), '\0'};
        return JS_NewStringLen(context, buffer, 1);
      }
      return JS_NewUint32(context, raw);
    }
    case metagen::mdTypeSInt:
      return JS_NewInt32(context, *static_cast<int32_t*>(value));
    case metagen::mdTypeUInt:
      return JS_NewUint32(context, *static_cast<uint32_t*>(value));
    case metagen::mdTypeSLong:
    case metagen::mdTypeSInt64:
      return quickJSInteger64Value(runtime, *static_cast<int64_t*>(value));
    case metagen::mdTypeULong:
    case metagen::mdTypeUInt64:
      return quickJSUnsignedInteger64Value(runtime,
                                           *static_cast<uint64_t*>(value));
    case metagen::mdTypeFloat:
      return JS_NewFloat64(context, *static_cast<float*>(value));
    case metagen::mdTypeDouble:
      return JS_NewFloat64(context, *static_cast<double*>(value));
    case metagen::mdTypeClass: {
      Class cls = *static_cast<Class*>(value);
      if (cls == nil) {
        return JS_NULL;
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
      return setQuickJSEngineObjectReturn(runtime, bridge, type,
                                          *static_cast<id*>(value));
    case metagen::mdTypeSelector: {
      SEL selector = *static_cast<SEL*>(value);
      const char* selectorNameValue =
          selector != nullptr ? sel_getName(selector) : nullptr;
      if (selectorNameValue == nullptr) {
        return JS_NULL;
      }
      return JS_NewString(context, selectorNameValue);
    }
    default:
      break;
  }
  Value result = convertNativeReturnValue(runtime, bridge, type, value);
  return result.local(runtime);
}

// --- GSD (Generated Signature Dispatch) for QuickJS ---
// GsdObjCContext is the engine-neutral interface the generated invokers use:
// it reads JS arguments and writes the JS return value via the QuickJS API.
// Readers require an actual JS number so coercion edge cases defer to the
// fully correct generic path.
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
  JSContext* context;
  JSValueConst* arguments;
  const NativeApiType& returnType;
  JSValue result = JS_UNDEFINED;

  bool readNumber(size_t i, double* out) {
    JSValueConst v = arguments[i];
    if (!JS_IsNumber(v)) return false;
    return quickJSNumberValue(context, v, out);
  }
  bool readBool(size_t i, uint8_t* out) {
    JSValueConst v = arguments[i];
    if (!JS_IsBool(v)) return false;
    *out = JS_ToBool(context, v) != 0 ? 1 : 0;
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
    return readQuickJSEngineSelectorArgument(runtime, arguments[i], out);
  }
  bool readClass(size_t i, Class* out) {
    Class cls = quickJSNativeClassArgument(runtime, arguments[i]);
    if (cls == Nil) return false;
    *out = cls;
    return true;
  }
  bool readObject(size_t i, id* out) {
    JSValueConst v = arguments[i];
    if (JS_IsNull(v) || JS_IsUndefined(v)) {
      *out = nil;
      return true;
    }
    if (auto h = quickJSHostObject<NativeApiObjectHostObject>(runtime, v)) {
      *out = h->object();
      return true;
    }
    if (auto c = quickJSHostObject<NativeApiClassHostObject>(runtime, v)) {
      *out = static_cast<id>(c->nativeClass());
      return true;
    }
    if (auto p = quickJSHostObject<NativeApiProtocolHostObject>(runtime, v)) {
      *out = static_cast<id>(p->nativeProtocol());
      return true;
    }
    return false;
  }

  void setVoid() { result = JS_UNDEFINED; }
  void setBool(bool v) { result = JS_NewBool(context, v); }
  void setInt32(int32_t v) { result = JS_NewInt32(context, v); }
  void setUInt32(uint32_t v) { result = JS_NewUint32(context, v); }
  void setUInt16(uint16_t v) {
    if (v >= 32 && v <= 126) {
      char buffer[2] = {static_cast<char>(v), '\0'};
      result = JS_NewStringLen(context, buffer, 1);
    } else {
      result = JS_NewUint32(context, v);
    }
  }
  void setInt64(int64_t v) { result = quickJSInteger64Value(runtime, v); }
  void setUInt64(uint64_t v) {
    result = quickJSUnsignedInteger64Value(runtime, v);
  }
  void setDouble(double v) { result = JS_NewFloat64(context, v); }
  void setSelector(SEL v) {
    const char* name = v != nullptr ? sel_getName(v) : nullptr;
    result = name == nullptr ? JS_NULL : JS_NewString(context, name);
  }
  void setClass(Class v) {
    if (v == nil) {
      result = JS_NULL;
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
    result = setQuickJSEngineObjectReturn(runtime, bridge, returnType, obj);
  }
};

// Close the anonymous namespace so the generated dispatch table lives in
// namespace nativescript; GsdObjCContext/ObjCGsdDispatchEntry stay reachable
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

JSValue setQuickJSEnginePreparedObjCResult(
    Runtime& runtime, const std::shared_ptr<NativeApiBridge>& bridge,
    id receiver, const NativeApiPreparedObjCInvocation& prepared,
    const std::shared_ptr<NativeApiObjectHostObject>& receiverHostObject,
    const std::optional<Object>& initializerClassWrapper,
    size_t providedCount, JSValueConst arguments[],
    Class dispatchSuperClass) {
  const NativeApiSignature& signature = prepared.signature;
  if (receiver == nil || signature.variadic ||
      unsupportedEngineType(signature.returnType)) {
    throw JSError(runtime,
                  "Objective-C selector is not supported by QuickJS engine: " +
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

  // GSD fast path: the generated invoker reads args directly from the QuickJS
  // arguments, calls objc_msgSend with a typed cast, and produces the JS
  // return value — bypassing all generic marshalling.
  if (prepared.engineInvoker != nullptr && dispatchSuperClass == Nil &&
      !initializerClassWrapper && !isNSErrorOutMethod &&
      !shouldDispatchNativeCallToUI()) {
    auto invoker = reinterpret_cast<ObjCGsdInvoker>(prepared.engineInvoker);
    GsdObjCContext ctx{runtime,           bridge,    receiver, prepared.selector,
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
    if (!prepareQuickJSEngineArgument(runtime, bridge,
                                      signature.argumentTypes[i],
                                      arguments[i], frame, i)) {
      throw JSError(runtime,
                    "Objective-C argument is not supported by QuickJS engine: " +
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
  bool dispatchingNativeCallToUI = shouldDispatchNativeCallToUI();
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
  return setQuickJSEngineReturnValue(runtime, bridge, returnType,
                                     returnStorage.data(),
                                     prepared.selectorName);
}

static JSClassID gNativeApiSelectorGroupDataClassId = 0;

void NativeApiSelectorGroupFinalize(JSRuntime*, JSValue value) {
  auto* data = static_cast<NativeApiSelectorGroupData*>(
      JS_GetOpaque(value, gNativeApiSelectorGroupDataClassId));
  delete data;
}

void EnsureNativeApiSelectorGroupClass(Runtime& runtime) {
  JSRuntime* jsRuntime = JS_GetRuntime(runtime.context());
  if (gNativeApiSelectorGroupDataClassId == 0) {
    JS_NewClassID(jsRuntime, &gNativeApiSelectorGroupDataClassId);
  }

  auto state = runtime.state();
  if (!state->selectorGroupDataClassRegistered) {
    JSClassDef definition = {};
    definition.class_name = "NativeScriptEngineSelectorGroupData";
    definition.finalizer = NativeApiSelectorGroupFinalize;
    JS_NewClass(jsRuntime, gNativeApiSelectorGroupDataClassId,
                &definition);
    state->selectorGroupDataClassRegistered = true;
  }
}

JSValue NativeApiSelectorGroupCall(JSContext* context, JSValue thisValue,
                                          int argc, JSValue* argv, int,
                                          JSValue* dataValues) {
  auto* data = static_cast<NativeApiSelectorGroupData*>(
      JS_GetOpaque(dataValues[0], gNativeApiSelectorGroupDataClassId));
  if (data == nullptr || data->selectors == nullptr ||
      data->preparedInvocations == nullptr) {
    return JS_UNDEFINED;
  }

  Runtime runtime(data->state);
  try {
    size_t count = argc > 0 ? static_cast<size_t>(argc) : 0;
    if (count >= data->selectors->size() ||
        (*data->selectors)[count].selectorName.empty()) {
      throw JSError(runtime,
                    "Objective-C selector is not available for the provided arguments "
                    "count.");
    }

    const NativeApiSelectorGroupEntry& entry = (*data->selectors)[count];
    auto& prepared = (*data->preparedInvocations)[count];
    Class selectorLookupClass = data->lookupClass;
    id receiver = nil;
    std::shared_ptr<NativeApiObjectHostObject> receiverHostObject;
    if (data->receiverIsClass) {
      Class methodClass = prepared != nullptr ? prepared->receiverClass : Nil;
      if (methodClass == Nil) {
        SEL selector = sel_registerName(entry.selectorName.c_str());
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
    } else {
      receiverHostObject =
          quickJSHostObject<NativeApiObjectHostObject>(runtime, thisValue);
      if (receiverHostObject != nullptr) {
        receiver = receiverHostObject->object();
      }
    }
    if (receiver == nil) {
      throw JSError(runtime,
                    "Objective-C selector requires a native receiver.");
    }

    if (!data->receiverIsClass) {
      SEL selector = sel_registerName(entry.selectorName.c_str());
      if (class_getInstanceMethod(selectorLookupClass, selector) == nullptr) {
        Class receiverClass = object_getClass(receiver);
        if (class_getInstanceMethod(receiverClass, selector) != nullptr) {
          selectorLookupClass = receiverClass;
        }
      }
    }

    if (prepared == nullptr) {
      prepared = prepareNativeApiObjCInvocation(
          runtime, data->bridge, selectorLookupClass, data->receiverIsClass,
          entry.selectorName, entry.hasMember ? &entry.member : nullptr);
      // Look up the engine-neutral GSD invoker for this signature.
      if (prepared->engineInvoker == nullptr) {
        uint64_t dispatchId = dispatchIdForEngineSignature(
            prepared->signature, SignatureCallKind::ObjCMethod);
        if (auto gsdInvoker = lookupObjCGsdInvoker(dispatchId)) {
          prepared->engineInvoker = reinterpret_cast<void*>(gsdInvoker);
        }
      }
    }

    std::optional<Object> initializerClassWrapper;
    if (!data->receiverIsClass && prepared->isInitMethod) {
      Value classWrapperValue = data->bridge->findObjectExpando(
          runtime, receiver, "__nativeApiClassWrapper");
      if (classWrapperValue.isObject()) {
        initializerClassWrapper.emplace(classWrapperValue.asObject(runtime));
      }
      data->bridge->forgetRoundTripValue(receiver);
      data->bridge->forgetObjectExpandos(receiver);
    }

    Class dispatchClass = data->receiverIsClass
                              ? Nil
                              : dispatchSuperclassForEngineDerivedReceiver(
                                    receiver, data->lookupClass);
    return setQuickJSEnginePreparedObjCResult(
        runtime, data->bridge, receiver, *prepared, receiverHostObject,
        initializerClassWrapper, count, argv, dispatchClass);
  } catch (const std::exception& error) {
    return engine::quickjsengine::throwError(context, error);
  }
}

Function CreateNativeApiSelectorGroupFunction(
    Runtime& runtime, std::shared_ptr<NativeApiBridge> bridge,
    Class lookupClass, bool receiverIsClass,
    std::shared_ptr<std::vector<NativeApiSelectorGroupEntry>> selectors,
    std::shared_ptr<
        std::vector<std::shared_ptr<NativeApiPreparedObjCInvocation>>>
        preparedInvocations) {
  EnsureNativeApiSelectorGroupClass(runtime);
  auto* data = new NativeApiSelectorGroupData(
      runtime.state(), std::move(bridge), lookupClass, receiverIsClass,
      std::move(selectors), std::move(preparedInvocations));

  JSValue dataObject =
      JS_NewObjectClass(runtime.context(),
                        gNativeApiSelectorGroupDataClassId);
  if (JS_IsException(dataObject)) {
    delete data;
    throw JSError(runtime, "QuickJS selector group allocation failed.");
  }
  JS_SetOpaque(dataObject, data);

  JSValue function =
      JS_NewCFunctionData(runtime.context(), NativeApiSelectorGroupCall,
                          0, 0, 1, &dataObject);
  JS_FreeValue(runtime.context(), dataObject);
  if (JS_IsException(function)) {
    throw JSError(runtime, "QuickJS selector group function allocation failed.");
  }

  JSValue nameValue = JS_NewStringLen(runtime.context(), "__nativeSelectorGroup",
                                      std::strlen("__nativeSelectorGroup"));
  JS_DefinePropertyValueStr(runtime.context(), function, "name", nameValue,
                            JS_PROP_CONFIGURABLE);
  Value functionValue(runtime, function);
  Function result = functionValue.asObject(runtime).asFunction(runtime);
  JS_FreeValue(runtime.context(), function);
  return result;
}

}  // namespace

#include "../shared/bridge/Install.mm"

void InstallNativeApi(JSContext* context, const NativeApiConfig& config) {
  if (context == nullptr) {
    return;
  }
  auto state = engine::quickjsengine::stateForContext(context);
  nativescript::engine::Runtime runtime(state);
  engine::quickjsengine::ensureClasses(runtime);
  InstallNativeApi(runtime, config);
}

}  // namespace nativescript

extern "C" void NativeScriptInstallNativeApi(JSContext* context, const char* metadataPath) {
  nativescript::NativeApiConfig config;
  config.metadataPath = metadataPath;
  nativescript::InstallNativeApi(context, config);
}

#endif  // TARGET_ENGINE_QUICKJS

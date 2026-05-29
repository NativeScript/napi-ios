#include "NativeApiV8.h"

#ifdef TARGET_ENGINE_V8

#include "NativeApiV8Runtime.h"
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
#define NATIVESCRIPT_NATIVE_API_BACKEND_NAME "v8"
#include "../shared/bridge/ObjCBridge.mm"
// clang-format on

#define NATIVESCRIPT_NATIVE_API_HAS_ENGINE_LAZY_GLOBALS 1
#define NATIVESCRIPT_NATIVE_API_HAS_ENGINE_SELECTOR_GROUP_FUNCTION 1
#define NATIVESCRIPT_NATIVE_API_RETAIN_RUNTIME 1
#define NATIVESCRIPT_NATIVE_API_RUNTIME_SCOPE 1

struct NativeApiLazyGlobalData {
  NativeApiLazyGlobalData(v8::Isolate* isolate, const std::string& name,
                            const std::string& kind) {
    nameValue.Reset(isolate, engine::v8engine::makeV8String(isolate, name));
    kindValue.Reset(isolate, engine::v8engine::makeV8String(isolate, kind));
  }

  ~NativeApiLazyGlobalData() {
    nameValue.Reset();
    kindValue.Reset();
  }

  v8::Global<v8::String> nameValue;
  v8::Global<v8::String> kindValue;
};

std::shared_ptr<Runtime> retainNativeApiRuntime(Runtime& runtime) {
  return std::make_shared<Runtime>(runtime.state());
}

class NativeApiRuntimeScope final {
 public:
  explicit NativeApiRuntimeScope(Runtime& runtime)
      : locker_(runtime.isolate()),
        isolateScope_(runtime.isolate()),
        handleScope_(runtime.isolate()),
        context_(runtime.context()),
        contextScope_(context_) {}

 private:
  v8::Locker locker_;
  v8::Isolate::Scope isolateScope_;
  v8::HandleScope handleScope_;
  v8::Local<v8::Context> context_;
  v8::Context::Scope contextScope_;
};

void NativeApiLazyGlobalGetter(v8::Local<v8::Name>,
                                 const v8::PropertyCallbackInfo<v8::Value>& info) {
  v8::Isolate* isolate = info.GetIsolate();
  v8::HandleScope handleScope(isolate);
  v8::Local<v8::Context> context = isolate->GetCurrentContext();
  if (!info.Data()->IsExternal()) {
    return;
  }

  auto* data = static_cast<NativeApiLazyGlobalData*>(info.Data().As<v8::External>()->Value());
  if (data == nullptr) {
    return;
  }
  v8::Local<v8::String> nameValue = data->nameValue.Get(isolate);
  v8::Local<v8::String> kindValue = data->kindValue.Get(isolate);

  v8::Local<v8::Object> global = context->Global();
  v8::Local<v8::Value> resolverValue;
  if (!global
           ->Get(context, engine::v8engine::makeV8String(
                              isolate, "__nativeScriptResolveNativeApiLazyGlobal"))
           .ToLocal(&resolverValue) ||
      !resolverValue->IsFunction()) {
    return;
  }

  v8::TryCatch tryCatch(isolate);
  v8::Local<v8::Value> args[] = {nameValue, kindValue};
  v8::Local<v8::Value> result;
  if (!resolverValue.As<v8::Function>()->Call(context, global, 2, args).ToLocal(&result)) {
    if (tryCatch.HasCaught()) {
      isolate->ThrowException(tryCatch.Exception());
    }
    return;
  }
  if (global->Delete(context, nameValue).FromMaybe(false)) {
    global->DefineOwnProperty(context, nameValue, result, v8::DontEnum).FromMaybe(false);
  }
  info.GetReturnValue().Set(result);
}

bool InstallNativeApiLazyGlobal(Runtime& runtime, std::shared_ptr<NativeApiBridge>,
                                      const std::string& name, const std::string& kind,
                                      bool force) {
  if (name.empty() || kind.empty()) {
    return false;
  }

  v8::Isolate* isolate = runtime.isolate();
  v8::EscapableHandleScope handleScope(isolate);
  v8::Local<v8::Context> context = runtime.context();
  v8::Local<v8::Object> global = context->Global();
  v8::Local<v8::String> property = engine::v8engine::makeV8String(isolate, name);
  if (!force && global->HasOwnProperty(context, property).FromMaybe(false)) {
    return false;
  }

  auto data = std::make_shared<NativeApiLazyGlobalData>(isolate, name, kind);
  v8::Local<v8::External> external = v8::External::New(isolate, data.get());

  bool installed = global
                       ->SetNativeDataProperty(context, property, NativeApiLazyGlobalGetter,
                                               nullptr, external, v8::DontEnum)
                       .FromMaybe(false);
  if (installed) {
    runtime.state()->retainedNativeData.push_back(std::move(data));
  }
  return installed;
}

void SetNativeApiObjectPrototype(Runtime& runtime, Object& object,
                                       const Object& prototype) {
  v8::TryCatch tryCatch(runtime.isolate());
  if (!object.local(runtime)
           ->SetPrototypeV2(runtime.context(), prototype.local(runtime))
           .FromMaybe(false)) {
    throw JSError(runtime,
                  engine::v8engine::currentExceptionMessage(runtime.isolate(),
                                                            tryCatch));
  }
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
      std::shared_ptr<engine::v8engine::RuntimeState> state,
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

  std::shared_ptr<engine::v8engine::RuntimeState> state;
  std::shared_ptr<NativeApiBridge> bridge;
  Class lookupClass = Nil;
  bool receiverIsClass = false;
  std::shared_ptr<std::vector<NativeApiSelectorGroupEntry>> selectors;
  std::shared_ptr<
      std::vector<std::shared_ptr<NativeApiPreparedObjCInvocation>>>
      preparedInvocations;
};

std::string v8StringToUtf8(v8::Isolate* isolate,
                           v8::Local<v8::Value> value) {
  v8::String::Utf8Value utf8(isolate, value);
  return *utf8 != nullptr ? std::string(*utf8, utf8.length()) : std::string();
}

template <typename T>
std::shared_ptr<T> v8HostObject(Runtime& runtime, v8::Local<v8::Value> value) {
  if (value.IsEmpty() || !value->IsObject()) {
    return nullptr;
  }
  v8::Local<v8::Object> object = value.As<v8::Object>();
  if (object->InternalFieldCount() < 1) {
    return nullptr;
  }
  auto* holder = static_cast<engine::v8engine::HostObjectHolder*>(
      object->GetAlignedPointerFromInternalField(0));
  if (holder == nullptr ||
      holder->typeToken != engine::v8engine::hostObjectTypeToken<T>()) {
    return nullptr;
  }
  return std::static_pointer_cast<T>(holder->hostObject);
}

id v8NativeObjectArgument(Runtime& runtime,
                          const std::shared_ptr<NativeApiBridge>& bridge,
                          const NativeApiType& type,
                          v8::Local<v8::Value> value,
                          NativeApiArgumentFrame& frame) {
  v8::Isolate* isolate = runtime.isolate();
  if (value.IsEmpty() || value->IsNullOrUndefined()) {
    return nil;
  }
  if (value->IsString()) {
    std::string utf8 = v8StringToUtf8(isolate, value);
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
  if (value->IsBoolean()) {
    return [NSNumber numberWithBool:value->BooleanValue(isolate)];
  }
  if (value->IsNumber()) {
    return [NSNumber numberWithDouble:value->NumberValue(runtime.context())
                                          .FromMaybe(0)];
  }
  if (!value->IsObject()) {
    return nil;
  }
  if (auto objectHost =
          v8HostObject<NativeApiObjectHostObject>(runtime, value)) {
    return objectHost->object();
  }
  if (auto classHost = v8HostObject<NativeApiClassHostObject>(runtime, value)) {
    return static_cast<id>(classHost->nativeClass());
  }
  if (auto protocolHost =
          v8HostObject<NativeApiProtocolHostObject>(runtime, value)) {
    return static_cast<id>(protocolHost->nativeProtocol());
  }
  if (auto pointerHost =
          v8HostObject<NativeApiPointerHostObject>(runtime, value)) {
    return static_cast<id>(pointerHost->pointer());
  }
  if (auto referenceHost =
          v8HostObject<NativeApiReferenceHostObject>(runtime, value)) {
    return static_cast<id>(referenceHost->data());
  }
  if (auto structHost =
          v8HostObject<NativeApiStructObjectHostObject>(runtime, value)) {
    return static_cast<id>(structHost->data());
  }

  v8::Local<v8::Value> wrappedClassValue;
  if (value.As<v8::Object>()
          ->Get(runtime.context(),
                engine::v8engine::makeV8String(isolate, "__nativeApiClass"))
          .ToLocal(&wrappedClassValue)) {
    if (auto classHost =
            v8HostObject<NativeApiClassHostObject>(runtime, wrappedClassValue)) {
      return static_cast<id>(classHost->nativeClass());
    }
  }

  Value wrapped = Value::borrowed(runtime, value);
  return objectFromEngineValue(runtime, bridge, wrapped, frame,
                               type.kind ==
                                   metagen::mdTypeNSMutableStringObject);
}

Class v8NativeClassArgument(Runtime& runtime, v8::Local<v8::Value> value) {
  if (value.IsEmpty() || value->IsNullOrUndefined()) {
    return Nil;
  }
  if (auto classHost = v8HostObject<NativeApiClassHostObject>(runtime, value)) {
    return classHost->nativeClass();
  }
  if (value->IsObject()) {
    v8::Local<v8::Value> wrappedClassValue;
    if (value.As<v8::Object>()
            ->Get(runtime.context(),
                  engine::v8engine::makeV8String(runtime.isolate(),
                                                 "__nativeApiClass"))
            .ToLocal(&wrappedClassValue)) {
      if (auto classHost =
              v8HostObject<NativeApiClassHostObject>(runtime,
                                                     wrappedClassValue)) {
        return classHost->nativeClass();
      }
    }
  }
  Value wrapped = Value::borrowed(runtime, value);
  return classFromEngineValue(runtime, wrapped);
}

bool readV8EngineSelectorArgument(Runtime& runtime, v8::Local<v8::Value> value,
                                  SEL* result) {
  if (result == nullptr) {
    return false;
  }
  if (value.IsEmpty() || value->IsNullOrUndefined()) {
    *result = nullptr;
    return true;
  }
  if (!value->IsString()) {
    return false;
  }
  std::string selectorName = v8StringToUtf8(runtime.isolate(), value);
  *result = sel_registerName(selectorName.c_str());
  return true;
}

bool prepareV8EngineArgument(
    Runtime& runtime, const std::shared_ptr<NativeApiBridge>& bridge,
    const NativeApiType& type, v8::Local<v8::Value> value,
    NativeApiArgumentFrame& frame, size_t index) {
  ffi_type* ffiType = ffiTypeForEngineArgument(type);
  size_t size =
      ffiType != nullptr && ffiType->size > 0 ? ffiType->size : nativeSizeForType(type);
  void* target = frame.storageAt(index, size);

  switch (type.kind) {
    case metagen::mdTypeBool:
      if (!value->IsBoolean()) {
        return false;
      }
      *static_cast<uint8_t*>(target) =
          value->BooleanValue(runtime.isolate()) ? 1 : 0;
      return true;
    case metagen::mdTypeChar: {
      int32_t converted = 0;
      if (!value->Int32Value(runtime.context()).To(&converted)) {
        return false;
      }
      *static_cast<int8_t*>(target) = static_cast<int8_t>(converted);
      return true;
    }
    case metagen::mdTypeUChar:
    case metagen::mdTypeUInt8: {
      uint32_t converted = 0;
      if (!value->Uint32Value(runtime.context()).To(&converted)) {
        return false;
      }
      *static_cast<uint8_t*>(target) = static_cast<uint8_t>(converted);
      return true;
    }
    case metagen::mdTypeSShort: {
      int32_t converted = 0;
      if (!value->Int32Value(runtime.context()).To(&converted)) {
        return false;
      }
      *static_cast<int16_t*>(target) = static_cast<int16_t>(converted);
      return true;
    }
    case metagen::mdTypeUShort: {
      if (value->IsString()) {
        std::string text = v8StringToUtf8(runtime.isolate(), value);
        if (text.size() != 1) {
          return false;
        }
        *static_cast<uint16_t*>(target) =
            static_cast<uint16_t>(static_cast<unsigned char>(text[0]));
        return true;
      }
      uint32_t converted = 0;
      if (!value->Uint32Value(runtime.context()).To(&converted)) {
        return false;
      }
      *static_cast<uint16_t*>(target) = static_cast<uint16_t>(converted);
      return true;
    }
    case metagen::mdTypeSInt:
      return value->Int32Value(runtime.context()).To(
          static_cast<int32_t*>(target));
    case metagen::mdTypeUInt:
      return value->Uint32Value(runtime.context()).To(
          static_cast<uint32_t*>(target));
    case metagen::mdTypeSLong:
    case metagen::mdTypeSInt64: {
      if (value->IsBigInt()) {
        bool lossless = false;
        *static_cast<int64_t*>(target) =
            value.As<v8::BigInt>()->Int64Value(&lossless);
        return true;
      }
      return value->IntegerValue(runtime.context()).To(
          static_cast<int64_t*>(target));
    }
    case metagen::mdTypeULong:
    case metagen::mdTypeUInt64: {
      if (value->IsBigInt()) {
        bool lossless = false;
        *static_cast<uint64_t*>(target) =
            value.As<v8::BigInt>()->Uint64Value(&lossless);
        return true;
      }
      int64_t converted = 0;
      if (!value->IntegerValue(runtime.context()).To(&converted)) {
        return false;
      }
      *static_cast<uint64_t*>(target) = static_cast<uint64_t>(converted);
      return true;
    }
    case metagen::mdTypeFloat: {
      double converted = 0;
      if (!value->NumberValue(runtime.context()).To(&converted)) {
        return false;
      }
      *static_cast<float*>(target) = static_cast<float>(converted);
      return true;
    }
    case metagen::mdTypeDouble:
      return value->NumberValue(runtime.context()).To(
          static_cast<double*>(target));
    case metagen::mdTypeSelector:
      return readV8EngineSelectorArgument(runtime, value,
                                          static_cast<SEL*>(target));
    case metagen::mdTypeClass: {
      Class cls = v8NativeClassArgument(runtime, value);
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
          v8NativeObjectArgument(runtime, bridge, type, value, frame);
      return true;
    default:
      break;
  }

  Value wrapped = Value::borrowed(runtime, value);
  convertEngineFfiArgument(runtime, bridge, type, wrapped, target, frame);
  return true;
}

v8::Local<v8::Value> v8Integer64Value(v8::Isolate* isolate, int64_t value) {
  constexpr int64_t maxSafeInteger = 9007199254740991LL;
  constexpr int64_t minSafeInteger = -9007199254740991LL;
  if (value >= minSafeInteger && value <= maxSafeInteger) {
    return v8::Number::New(isolate, static_cast<double>(value));
  }
  return v8::BigInt::New(isolate, value);
}

v8::Local<v8::Value> v8UnsignedInteger64Value(v8::Isolate* isolate,
                                              uint64_t value) {
  constexpr uint64_t maxSafeInteger = 9007199254740991ULL;
  if (value <= maxSafeInteger) {
    return v8::Number::New(isolate, static_cast<double>(value));
  }
  return v8::BigInt::NewFromUnsigned(isolate, value);
}

bool setV8EngineObjectReturn(
    Runtime& runtime, const std::shared_ptr<NativeApiBridge>& bridge,
    NativeApiType type, id object,
    const v8::FunctionCallbackInfo<v8::Value>& info) {
  v8::Isolate* isolate = runtime.isolate();
  if (object == nil) {
    info.GetReturnValue().Set(v8::Null(isolate));
    return true;
  }
  if ([object isKindOfClass:[NSNull class]]) {
    if (type.returnOwned) {
      [object release];
    }
    info.GetReturnValue().Set(v8::Null(isolate));
    return true;
  }
  if ([object respondsToSelector:@selector(UTF8String)] &&
      (type.kind == metagen::mdTypeAnyObject ||
       type.kind == metagen::mdTypeNSStringObject)) {
    std::string utf8 = utf8StringFromNSString(static_cast<NSString*>(object));
    if (type.returnOwned) {
      [object release];
    }
    info.GetReturnValue().Set(engine::v8engine::makeV8String(isolate, utf8));
    return true;
  }
  if ([object isKindOfClass:[NSNumber class]] &&
      ![object isKindOfClass:[NSDecimalNumber class]]) {
    NSNumber* number = static_cast<NSNumber*>(object);
    const char* objCType = [number objCType];
    bool isBool = CFGetTypeID((__bridge CFTypeRef)number) ==
                      CFBooleanGetTypeID() ||
                  (objCType != nullptr &&
                   std::strcmp(objCType, @encode(BOOL)) == 0);
    if (isBool) {
      info.GetReturnValue().Set(v8::Boolean::New(isolate, [number boolValue]));
    } else {
      info.GetReturnValue().Set(v8::Number::New(isolate, [number doubleValue]));
    }
    if (type.returnOwned) {
      [object release];
    }
    return true;
  }

  Value roundTrip = bridge->findRoundTripValue(runtime, object);
  if (!roundTrip.isUndefined()) {
    info.GetReturnValue().Set(roundTrip.local(runtime));
    if (type.returnOwned) {
      [object release];
    }
    return true;
  }
  if (const NativeApiSymbol* classSymbol =
          bridge->findClassForRuntimePointer((void*)object)) {
    Value result = makeNativeClassValue(runtime, bridge, *classSymbol);
    info.GetReturnValue().Set(result.local(runtime));
    if (type.returnOwned) {
      [object release];
    }
    return true;
  }
  if (const NativeApiSymbol* protocolSymbol =
          bridge->findProtocolForRuntimePointer((void*)object)) {
    Value result = makeNativeProtocolValue(runtime, bridge, *protocolSymbol);
    info.GetReturnValue().Set(result.local(runtime));
    if (type.returnOwned) {
      [object release];
    }
    return true;
  }
  Value result = makeNativeObjectValue(runtime, bridge, object, type.returnOwned);
  info.GetReturnValue().Set(result.local(runtime));
  return true;
}

bool setV8EngineReturnValue(
    Runtime& runtime, const std::shared_ptr<NativeApiBridge>& bridge,
    NativeApiType type, void* value, const std::string& selectorName,
    const v8::FunctionCallbackInfo<v8::Value>& info) {
  v8::Isolate* isolate = runtime.isolate();
  switch (type.kind) {
    case metagen::mdTypeVoid:
      info.GetReturnValue().Set(v8::Undefined(isolate));
      return true;
    case metagen::mdTypeBool:
      info.GetReturnValue().Set(
          v8::Boolean::New(isolate, *static_cast<uint8_t*>(value) != 0));
      return true;
    case metagen::mdTypeChar:
      info.GetReturnValue().Set(
          v8::Integer::New(isolate, *static_cast<int8_t*>(value)));
      return true;
    case metagen::mdTypeUChar:
    case metagen::mdTypeUInt8:
      info.GetReturnValue().Set(v8::Integer::NewFromUnsigned(
          isolate, *static_cast<uint8_t*>(value)));
      return true;
    case metagen::mdTypeSShort:
      info.GetReturnValue().Set(
          v8::Integer::New(isolate, *static_cast<int16_t*>(value)));
      return true;
    case metagen::mdTypeUShort: {
      uint16_t raw = *static_cast<uint16_t*>(value);
      if (raw >= 32 && raw <= 126) {
        char buffer[2] = {static_cast<char>(raw), '\0'};
        info.GetReturnValue().Set(engine::v8engine::makeV8String(isolate, buffer));
      } else {
        info.GetReturnValue().Set(v8::Integer::NewFromUnsigned(isolate, raw));
      }
      return true;
    }
    case metagen::mdTypeSInt:
      info.GetReturnValue().Set(
          v8::Integer::New(isolate, *static_cast<int32_t*>(value)));
      return true;
    case metagen::mdTypeUInt:
      info.GetReturnValue().Set(v8::Integer::NewFromUnsigned(
          isolate, *static_cast<uint32_t*>(value)));
      return true;
    case metagen::mdTypeSLong:
    case metagen::mdTypeSInt64:
      info.GetReturnValue().Set(
          v8Integer64Value(isolate, *static_cast<int64_t*>(value)));
      return true;
    case metagen::mdTypeULong:
    case metagen::mdTypeUInt64:
      info.GetReturnValue().Set(
          v8UnsignedInteger64Value(isolate, *static_cast<uint64_t*>(value)));
      return true;
    case metagen::mdTypeFloat:
      info.GetReturnValue().Set(
          v8::Number::New(isolate, *static_cast<float*>(value)));
      return true;
    case metagen::mdTypeDouble:
      info.GetReturnValue().Set(
          v8::Number::New(isolate, *static_cast<double*>(value)));
      return true;
    case metagen::mdTypeClass: {
      Class cls = *static_cast<Class*>(value);
      if (cls == nil) {
        info.GetReturnValue().Set(v8::Null(isolate));
        return true;
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
      info.GetReturnValue().Set(result.local(runtime));
      return true;
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
      return setV8EngineObjectReturn(runtime, bridge, type,
                                     *static_cast<id*>(value), info);
    case metagen::mdTypeSelector: {
      SEL selector = *static_cast<SEL*>(value);
      const char* selectorNameValue =
          selector != nullptr ? sel_getName(selector) : nullptr;
      if (selectorNameValue == nullptr) {
        info.GetReturnValue().Set(v8::Null(isolate));
      } else {
        info.GetReturnValue().Set(
            engine::v8engine::makeV8String(isolate, selectorNameValue));
      }
      return true;
    }
    default:
      break;
  }
  Value result = convertNativeReturnValue(runtime, bridge, type, value);
  info.GetReturnValue().Set(result.local(runtime));
  return true;
}

void setV8EnginePreparedObjCResult(
    Runtime& runtime, const std::shared_ptr<NativeApiBridge>& bridge,
    id receiver, const NativeApiPreparedObjCInvocation& prepared,
    const std::shared_ptr<NativeApiObjectHostObject>& receiverHostObject,
    const std::optional<Object>& initializerClassWrapper,
    const v8::FunctionCallbackInfo<v8::Value>& info,
    Class dispatchSuperClass) {
  const NativeApiSignature& signature = prepared.signature;
  if (receiver == nil || signature.variadic ||
      unsupportedEngineType(signature.returnType)) {
    throw JSError(runtime,
                  "Objective-C selector is not supported by V8 engine: " +
                      prepared.selectorName);
  }

  const bool isNSErrorOutMethod = isNSErrorOutEngineMethodSignature(signature);
  const size_t providedCount = static_cast<size_t>(info.Length());
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

  if (dispatchSuperClass == Nil && !initializerClassWrapper &&
      providedCount <= 2) {
    Value fastArgs[2];
    for (size_t i = 0; i < providedCount; i++) {
      fastArgs[i] = Value::borrowed(runtime, info[static_cast<int>(i)]);
    }
    Value fastResult;
    if (tryCallFastEngineObjCSelector(runtime, bridge, receiver, prepared,
                                      fastArgs, providedCount, Nil,
                                      &fastResult)) {
      info.GetReturnValue().Set(fastResult.local(runtime));
      return;
    }
  }

  NativeApiArgumentFrame frame(signature.argumentTypes.size());
  for (size_t i = 0; i < providedCount; i++) {
    if (!prepareV8EngineArgument(runtime, bridge, signature.argumentTypes[i],
                                 info[static_cast<int>(i)], frame, i)) {
      throw JSError(runtime,
                    "Objective-C argument is not supported by V8 engine: " +
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
  setV8EngineReturnValue(runtime, bridge, returnType, returnStorage.data(),
                         prepared.selectorName, info);
}

void NativeApiSelectorGroupCallback(
    const v8::FunctionCallbackInfo<v8::Value>& info) {
  auto* data = static_cast<NativeApiSelectorGroupData*>(
      info.Data().As<v8::External>()->Value());
  if (data == nullptr || data->selectors == nullptr ||
      data->preparedInvocations == nullptr) {
    return;
  }

  Runtime runtime(data->state);
  v8::HandleScope handleScope(runtime.isolate());
  try {
    size_t count = static_cast<size_t>(info.Length());
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
          v8HostObject<NativeApiObjectHostObject>(runtime, info.This());
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
    }

    std::optional<Object> initializerClassWrapper;
    if (!data->receiverIsClass &&
        prepared->selectorName.rfind("init", 0) == 0) {
      Value classWrapperValue = data->bridge->findObjectExpando(
          runtime, receiver, "__nativeApiClassWrapper");
      if (classWrapperValue.isObject()) {
        initializerClassWrapper.emplace(classWrapperValue.asObject(runtime));
      }
      data->bridge->forgetRoundTripValue(receiver);
      data->bridge->forgetObjectExpandos(receiver);
    }

    // For JS-extended receivers, dispatch from the immediate native
    // superclass so native-derived overrides are honored (not the method's
    // defining ancestor, which would skip intermediate native overrides).
    Class dispatchClass = data->receiverIsClass
                              ? Nil
                              : dispatchSuperclassForEngineDerivedReceiver(
                                    receiver, data->lookupClass);
    setV8EnginePreparedObjCResult(runtime, data->bridge, receiver, *prepared,
                                  receiverHostObject, initializerClassWrapper,
                                  info, dispatchClass);
  } catch (const std::exception& exception) {
    engine::v8engine::throwV8Exception(info.GetIsolate(), exception);
  }
}

Function CreateNativeApiSelectorGroupFunction(
    Runtime& runtime, std::shared_ptr<NativeApiBridge> bridge,
    Class lookupClass, bool receiverIsClass,
    std::shared_ptr<std::vector<NativeApiSelectorGroupEntry>> selectors,
    std::shared_ptr<
        std::vector<std::shared_ptr<NativeApiPreparedObjCInvocation>>>
        preparedInvocations) {
  auto data = std::make_shared<NativeApiSelectorGroupData>(
      runtime.state(), std::move(bridge), lookupClass, receiverIsClass,
      std::move(selectors), std::move(preparedInvocations));
  auto* rawData = data.get();
  runtime.state()->retainedNativeData.push_back(std::move(data));

  v8::Local<v8::External> external =
      v8::External::New(runtime.isolate(), rawData);
  v8::Local<v8::FunctionTemplate> functionTemplate =
      v8::FunctionTemplate::New(runtime.isolate(),
                                NativeApiSelectorGroupCallback, external);
  v8::Local<v8::Function> function =
      functionTemplate->GetFunction(runtime.context()).ToLocalChecked();
  function->SetName(
      engine::v8engine::makeV8String(runtime.isolate(), "__nativeSelectorGroup"));
  Value functionValue(runtime, function);
  return functionValue.asObject(runtime).asFunction(runtime);
}

}  // namespace

#include "../shared/bridge/Install.mm"

void InstallNativeApi(v8::Isolate* isolate, v8::Local<v8::Context> context,
                        const NativeApiConfig& config) {
  if (isolate == nullptr || context.IsEmpty()) {
    return;
  }
  v8::Locker locker(isolate);
  v8::Isolate::Scope isolateScope(isolate);
  v8::HandleScope handleScope(isolate);
  v8::Context::Scope contextScope(context);
  Runtime runtime(isolate, context);
  InstallNativeApi(runtime, config);
}

}  // namespace nativescript

extern "C" void NativeScriptInstallNativeApi(v8::Isolate* isolate, v8::Local<v8::Context> context,
                                               const char* metadataPath) {
  nativescript::NativeApiConfig config;
  config.metadataPath = metadataPath;
  nativescript::InstallNativeApi(isolate, context, config);
}

#endif  // TARGET_ENGINE_V8

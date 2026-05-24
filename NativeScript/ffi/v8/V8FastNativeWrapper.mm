#include "V8FastNativeApiPrivate.h"

#ifdef TARGET_ENGINE_V8

#if V8_MAJOR_VERSION >= 14
#define NS_V8_INTERCEPTED v8::Intercepted
#define NS_V8_RETURN_YES return v8::Intercepted::kYes
#define NS_V8_RETURN_NO return v8::Intercepted::kNo
#define NS_V8_SETTER_INFO v8::PropertyCallbackInfo<void>
#else
#define NS_V8_INTERCEPTED void
#define NS_V8_RETURN_YES return
#define NS_V8_RETURN_NO return
#define NS_V8_SETTER_INFO v8::PropertyCallbackInfo<v8::Value>
#endif

namespace nativescript {
namespace {

napi_env envFromHandlerData(v8::Local<v8::Value> data) {
  if (data.IsEmpty() || !data->IsExternal()) {
    return nullptr;
  }

  return static_cast<napi_env>(data.As<v8::External>()->Value());
}

thread_local bool isDefiningNativeWrapperProperty = false;

class NativeWrapperPropertyDefinitionGuard {
 public:
  NativeWrapperPropertyDefinitionGuard()
      : previous_(isDefiningNativeWrapperProperty) {
    isDefiningNativeWrapperProperty = true;
  }

  ~NativeWrapperPropertyDefinitionGuard() {
    isDefiningNativeWrapperProperty = previous_;
  }

 private:
  bool previous_;
};

bool definePlainValueProperty(v8::Local<v8::Context> context,
                              v8::Local<v8::Object> object,
                              v8::Local<v8::Name> property,
                              v8::Local<v8::Value> value) {
  NativeWrapperPropertyDefinitionGuard guard;
  return object->CreateDataProperty(context, property, value).FromMaybe(false);
}

bool isInternalNativeProperty(v8::Isolate* isolate,
                              v8::Local<v8::Name> property) {
  if (property.IsEmpty() || !property->IsString()) {
    return true;
  }

  v8::String::Utf8Value name(isolate, property);
  if (*name == nullptr) {
    return true;
  }

  return strcmp(*name, "napi_external") == 0 ||
         strcmp(*name, "napi_typetag") == 0 ||
         strcmp(*name, kV8NativePointerProperty) == 0;
}

NS_V8_INTERCEPTED nativeWrapperNamedSetter(
    v8::Local<v8::Name> property, v8::Local<v8::Value> value,
    const NS_V8_SETTER_INFO& info) {
  if (isDefiningNativeWrapperProperty) {
    NS_V8_RETURN_NO;
  }

  napi_env env = envFromHandlerData(info.Data());
  v8::Local<v8::Object> holder = info.Holder();

  if (env != nullptr && !isInternalNativeProperty(info.GetIsolate(), property)) {
    id nativeObject = tryReadWrappedReference(env, holder);
    if (nativeObject != nil) {
      transferOwnershipToNative(env, v8impl::JsValueFromV8LocalValue(holder),
                                nativeObject);
    }
  }

  definePlainValueProperty(info.GetIsolate()->GetCurrentContext(), holder,
                           property, value);
  NS_V8_RETURN_YES;
}

NS_V8_INTERCEPTED nativeWrapperIndexedGetter(
    uint32_t index, const v8::PropertyCallbackInfo<v8::Value>& info) {
  napi_env env = envFromHandlerData(info.Data());
  if (env == nullptr) {
    NS_V8_RETURN_NO;
  }

  id nativeObject = tryReadWrappedReference(env, info.Holder());
  if (nativeObject == nil || ![nativeObject isKindOfClass:[NSArray class]]) {
    NS_V8_RETURN_NO;
  }

  @try {
    id value = reinterpret_cast<id (*)(id, SEL, NSUInteger)>(objc_msgSend)(
        nativeObject, @selector(objectAtIndex:), static_cast<NSUInteger>(index));
    if (value == nil) {
      info.GetReturnValue().Set(v8::Null(info.GetIsolate()));
      NS_V8_RETURN_YES;
    }

    v8::Local<v8::Value> fastValue;
    if (TryFastConvertV8FoundationObject(env, value, &fastValue)) {
      info.GetReturnValue().Set(fastValue);
      NS_V8_RETURN_YES;
    }

    ObjCBridgeState* state = ObjCBridgeState::InstanceData(env);
    napi_value result = nullptr;
    if (state != nullptr) {
      result = state->findCachedObjectWrapper(env, value);
      if (result == nullptr) {
        result = state->getObject(env, value, kUnownedObject, 0, nullptr);
      }
    }
    if (result != nullptr) {
      info.GetReturnValue().Set(v8impl::V8LocalValueFromJsValue(result));
      NS_V8_RETURN_YES;
    }
  } @catch (NSException* exception) {
    std::string message = exception.description.UTF8String;
    NativeScriptException nativeScriptException(message);
    throwNativeScriptExceptionToV8(env, info.GetIsolate(),
                                   nativeScriptException);
    NS_V8_RETURN_YES;
  }

  NS_V8_RETURN_NO;
}

NS_V8_INTERCEPTED nativeWrapperIndexedSetter(
    uint32_t index, v8::Local<v8::Value> value,
    const NS_V8_SETTER_INFO& info) {
  napi_env env = envFromHandlerData(info.Data());
  if (env == nullptr) {
    NS_V8_RETURN_NO;
  }

  id nativeObject = tryReadWrappedReference(env, info.Holder());
  if (nativeObject == nil ||
      ![nativeObject respondsToSelector:@selector(setObject:atIndexedSubscript:)]) {
    NS_V8_RETURN_NO;
  }

  id nativeValue = nil;
  if (!TryFastConvertV8Argument(env, mdTypeAnyObject, value, &nativeValue)) {
    NS_V8_RETURN_NO;
  }

  @try {
    reinterpret_cast<void (*)(id, SEL, id, NSUInteger)>(objc_msgSend)(
        nativeObject, @selector(setObject:atIndexedSubscript:), nativeValue,
        static_cast<NSUInteger>(index));
    NS_V8_RETURN_YES;
  } @catch (NSException* exception) {
    std::string message = exception.description.UTF8String;
    NativeScriptException nativeScriptException(message);
    throwNativeScriptExceptionToV8(env, info.GetIsolate(),
                                   nativeScriptException);
    NS_V8_RETURN_YES;
  }
}

v8::Local<v8::ObjectTemplate> nativeWrapperObjectTemplate(napi_env env) {
  v8::Isolate* isolate = env->isolate;
  static thread_local v8::Persistent<v8::ObjectTemplate> objectTemplate;
  static thread_local v8::Isolate* templateIsolate = nullptr;
  static thread_local napi_env templateEnv = nullptr;

  if (objectTemplate.IsEmpty() || templateIsolate != isolate ||
      templateEnv != env) {
    objectTemplate.Reset();
    templateIsolate = isolate;
    templateEnv = env;
    v8::Local<v8::ObjectTemplate> created = v8::ObjectTemplate::New(isolate);
    created->SetInternalFieldCount(kV8NativeWrapperFieldCount);
    v8::Local<v8::External> envData = v8::External::New(isolate, env);
    v8::PropertyHandlerFlags namedFlags =
        static_cast<v8::PropertyHandlerFlags>(
            static_cast<int>(v8::PropertyHandlerFlags::kNonMasking) |
            static_cast<int>(v8::PropertyHandlerFlags::kOnlyInterceptStrings));
    created->SetHandler(v8::NamedPropertyHandlerConfiguration(
        nullptr, nativeWrapperNamedSetter, nullptr, nullptr, nullptr, envData,
        namedFlags));
    created->SetHandler(v8::IndexedPropertyHandlerConfiguration(
        nativeWrapperIndexedGetter, nativeWrapperIndexedSetter, nullptr,
        nullptr, nullptr, envData));
    objectTemplate.Reset(isolate, created);
  }

  return v8::Local<v8::ObjectTemplate>::New(isolate, objectTemplate);
}

}  // namespace

napi_value CreateV8NativeWrapperObject(napi_env env) {
  if (env == nullptr) {
    return nullptr;
  }

  v8::EscapableHandleScope scope(env->isolate);
  v8::Local<v8::Object> object;
  if (!nativeWrapperObjectTemplate(env)->NewInstance(env->context())
           .ToLocal(&object)) {
    return nullptr;
  }
  object->SetAlignedPointerInInternalField(kV8NativeWrapperMarkerField,
                                           nativeWrapperMarker());

  return v8impl::JsValueFromV8LocalValue(scope.Escape(object));
}

}  // namespace nativescript

#undef NS_V8_INTERCEPTED
#undef NS_V8_RETURN_YES
#undef NS_V8_RETURN_NO
#undef NS_V8_SETTER_INFO

#endif  // TARGET_ENGINE_V8

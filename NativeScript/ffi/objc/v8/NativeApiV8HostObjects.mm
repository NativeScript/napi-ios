#include "NativeApiV8Runtime.h"
#include "../shared/NativeApiStackValueArray.h"

#ifdef TARGET_ENGINE_V8

namespace nativescript {
namespace engine {

namespace v8engine {

Value valueFromLocal(Runtime& runtime, v8::Local<v8::Value> value) { return Value(runtime, value); }

// V8's named-property interceptors run BEFORE prototype-chain lookup, so a
// JS-subclass accessor defined on the prototype (not the host object itself)
// would otherwise be shadowed by the interceptor. These let the get/set
// interceptors below check the prototype chain first and defer to it when a
// descriptor is found there.
bool findPrototypeDescriptor(Runtime& runtime, v8::Local<v8::Object> object,
                             v8::Local<v8::Name> property,
                             v8::Local<v8::Object>* descriptorOut) {
  v8::TryCatch tryCatch(runtime.isolate());
  v8::Local<v8::Value> currentValue = object->GetPrototypeV2();
  for (size_t depth = 0; depth < 64 && currentValue->IsObject(); depth++) {
    v8::Local<v8::Object> current = currentValue.As<v8::Object>();
    v8::Local<v8::Value> descriptorValue;
    if (!current->GetOwnPropertyDescriptor(runtime.context(), property)
             .ToLocal(&descriptorValue)) {
      throw JSError(runtime,
                    currentExceptionMessage(runtime.isolate(), tryCatch));
    }
    if (descriptorValue->IsObject()) {
      *descriptorOut = descriptorValue.As<v8::Object>();
      return true;
    }
    currentValue = current->GetPrototypeV2();
  }
  return false;
}

bool tryResolvePrototypeGet(Runtime& runtime, v8::Local<v8::Object> object,
                            v8::Local<v8::Object> receiver,
                            v8::Local<v8::Name> property,
                            v8::Local<v8::Value>* resultOut) {
  v8::Local<v8::Object> descriptor;
  if (!findPrototypeDescriptor(runtime, object, property, &descriptor)) {
    return false;
  }

  v8::TryCatch tryCatch(runtime.isolate());
  v8::Local<v8::String> getKey = makeV8String(runtime.isolate(), "get");
  v8::Local<v8::Value> getterValue;
  if (!descriptor->Get(runtime.context(), getKey).ToLocal(&getterValue)) {
    throw JSError(runtime, currentExceptionMessage(runtime.isolate(), tryCatch));
  }
  if (getterValue->IsFunction()) {
    v8::Local<v8::Value> result;
    if (!getterValue.As<v8::Function>()
             ->Call(runtime.context(), receiver, 0, nullptr)
             .ToLocal(&result)) {
      throw JSError(runtime,
                    currentExceptionMessage(runtime.isolate(), tryCatch));
    }
    *resultOut = result;
    return true;
  }

  v8::Local<v8::String> valueKey = makeV8String(runtime.isolate(), "value");
  bool hasValue =
      descriptor->HasOwnProperty(runtime.context(), valueKey).FromMaybe(false);
  if (hasValue) {
    v8::Local<v8::Value> value;
    if (!descriptor->Get(runtime.context(), valueKey).ToLocal(&value)) {
      throw JSError(runtime,
                    currentExceptionMessage(runtime.isolate(), tryCatch));
    }
    *resultOut = value;
    return true;
  }

  *resultOut = v8::Undefined(runtime.isolate());
  return true;
}

bool tryInvokePrototypeSetter(Runtime& runtime, v8::Local<v8::Object> object,
                              v8::Local<v8::Object> receiver,
                              v8::Local<v8::Name> property,
                              v8::Local<v8::Value> value) {
  v8::Local<v8::Object> descriptor;
  if (!findPrototypeDescriptor(runtime, object, property, &descriptor)) {
    return false;
  }

  v8::TryCatch tryCatch(runtime.isolate());
  v8::Local<v8::String> setKey = makeV8String(runtime.isolate(), "set");
  v8::Local<v8::Value> setterValue;
  if (!descriptor->Get(runtime.context(), setKey).ToLocal(&setterValue)) {
    throw JSError(runtime, currentExceptionMessage(runtime.isolate(), tryCatch));
  }
  if (!setterValue->IsFunction()) {
    return false;
  }

  v8::Local<v8::Value> args[] = {value};
  v8::Local<v8::Value> ignored;
  if (!setterValue.As<v8::Function>()
           ->Call(runtime.context(), receiver, 1, args)
           .ToLocal(&ignored)) {
    throw JSError(runtime, currentExceptionMessage(runtime.isolate(), tryCatch));
  }
  return true;
}

v8::Local<v8::ObjectTemplate> hostObjectTemplate(Runtime& runtime) {
  auto state = runtime.state();
  if (state->hostObjectTemplate.IsEmpty()) {
    v8::Local<v8::ObjectTemplate> objectTemplate = v8::ObjectTemplate::New(runtime.isolate());
    objectTemplate->SetInternalFieldCount(1);
    // toString must be own property to override Object.prototype.toString
    // when using kNonMasking interceptor.
    objectTemplate->Set(
        makeV8String(runtime.isolate(), "toString"),
        v8::FunctionTemplate::New(runtime.isolate(),
            [](const v8::FunctionCallbackInfo<v8::Value>& info) {
              v8::Local<v8::Object> self = info.This();
              if (self.IsEmpty() || self->InternalFieldCount() < 1) return;
              auto* holder = static_cast<HostObjectHolder*>(
                  self->GetAlignedPointerFromInternalField(0));
              if (holder == nullptr || holder->hostObject == nullptr) return;
              Runtime rt(holder->state);
              try {
                Value toStr = holder->hostObject->get(rt, PropNameID("toString"));
                if (!toStr.isUndefined()) {
                  v8::Local<v8::Value> v8Val = toStr.local(rt);
                  if (v8Val->IsFunction()) {
                    v8::Local<v8::Value> result;
                    if (v8Val.As<v8::Function>()->Call(rt.context(), self, 0, nullptr)
                            .ToLocal(&result)) {
                      info.GetReturnValue().Set(result);
                      return;
                    }
                  }
                }
              } catch (...) {}
            }),
        v8::DontEnum);
    objectTemplate->SetHandler(v8::NamedPropertyHandlerConfiguration(
        [](v8::Local<v8::Name> property,
           const v8::PropertyCallbackInfo<v8::Value>& info) -> v8::Intercepted {
          auto* holder =
              static_cast<HostObjectHolder*>(info.Holder()->GetAlignedPointerFromInternalField(0));
          if (holder == nullptr || holder->hostObject == nullptr) {
            return v8::Intercepted::kNo;
          }
          // Fast path: skip symbols entirely (they never match our properties).
          if (!property->IsString()) {
            return v8::Intercepted::kNo;
          }
          Runtime runtime(holder->state);
          try {
            v8::Isolate* isolate = info.GetIsolate();
            v8::String::Utf8Value utf8(isolate, property);
            if (*utf8 == nullptr) {
              return v8::Intercepted::kNo;
            }
            Value result = holder->hostObject->get(
                runtime, PropNameID(std::string(*utf8, utf8.length())));
            if (!result.isUndefined()) {
              info.GetReturnValue().Set(result.local(runtime));
              return v8::Intercepted::kYes;
            }
          } catch (const std::exception& exception) {
            throwV8Exception(info.GetIsolate(), exception);
            return v8::Intercepted::kYes;
          }
          return v8::Intercepted::kNo;
        },
        [](v8::Local<v8::Name> property, v8::Local<v8::Value> value,
           const v8::PropertyCallbackInfo<void>& info) -> v8::Intercepted {
          auto* holder =
              static_cast<HostObjectHolder*>(info.Holder()->GetAlignedPointerFromInternalField(0));
          if (holder == nullptr || holder->hostObject == nullptr) {
            return v8::Intercepted::kNo;
          }
          Runtime runtime(holder->state);
          try {
            bool handled = holder->hostObject->set(
                runtime, PropNameID(propertyNameToUtf8(info.GetIsolate(), property)),
                Value(runtime, value));
            return handled ? v8::Intercepted::kYes : v8::Intercepted::kNo;
          } catch (const std::exception& exception) {
            throwV8Exception(info.GetIsolate(), exception);
            return v8::Intercepted::kYes;
          }
        },
        nullptr, nullptr,
        [](const v8::PropertyCallbackInfo<v8::Array>& info) {
          auto* holder =
              static_cast<HostObjectHolder*>(info.Holder()->GetAlignedPointerFromInternalField(0));
          if (holder == nullptr || holder->hostObject == nullptr) {
            return;
          }
          Runtime runtime(holder->state);
          try {
            auto propertyNames = holder->hostObject->getPropertyNames(runtime);
            v8::Local<v8::Array> result =
                v8::Array::New(info.GetIsolate(), static_cast<int>(propertyNames.size()));
            for (size_t i = 0; i < propertyNames.size(); i++) {
              std::string name = propertyNames[i].utf8(runtime);
              result
                  ->Set(runtime.context(), static_cast<uint32_t>(i),
                        makeV8String(info.GetIsolate(), name))
                  .FromMaybe(false);
            }
            info.GetReturnValue().Set(result);
          } catch (const std::exception& exception) {
            throwV8Exception(info.GetIsolate(), exception);
          }
        },
        v8::Local<v8::Value>(), v8::PropertyHandlerFlags::kNone));
    objectTemplate->SetHandler(v8::IndexedPropertyHandlerConfiguration(
        [](uint32_t index, const v8::PropertyCallbackInfo<v8::Value>& info) -> v8::Intercepted {
          auto* holder =
              static_cast<HostObjectHolder*>(info.Holder()->GetAlignedPointerFromInternalField(0));
          if (holder == nullptr || holder->hostObject == nullptr) {
            return v8::Intercepted::kNo;
          }
          Runtime runtime(holder->state);
          try {
            Value result = holder->hostObject->get(runtime, PropNameID(std::to_string(index)));
            if (!result.isUndefined()) {
              info.GetReturnValue().Set(result.local(runtime));
              return v8::Intercepted::kYes;
            }
          } catch (const std::exception& exception) {
            throwV8Exception(info.GetIsolate(), exception);
            return v8::Intercepted::kYes;
          }
          return v8::Intercepted::kNo;
        },
        [](uint32_t index, v8::Local<v8::Value> value,
           const v8::PropertyCallbackInfo<void>& info) -> v8::Intercepted {
          auto* holder =
              static_cast<HostObjectHolder*>(info.Holder()->GetAlignedPointerFromInternalField(0));
          if (holder == nullptr || holder->hostObject == nullptr) {
            return v8::Intercepted::kNo;
          }
          Runtime runtime(holder->state);
          try {
            holder->hostObject->set(runtime, PropNameID(std::to_string(index)),
                                    Value(runtime, value));
            return v8::Intercepted::kYes;
          } catch (const std::exception& exception) {
            throwV8Exception(info.GetIsolate(), exception);
            return v8::Intercepted::kYes;
          }
        },
        nullptr, nullptr, nullptr, v8::Local<v8::Value>(),
        v8::PropertyHandlerFlags::kNone));
    state->hostObjectTemplate.Reset(runtime.isolate(), objectTemplate);
  }
  return state->hostObjectTemplate.Get(runtime.isolate());
}

// Template for native object instances — uses kNonMasking so V8 checks
// prototype chain first (methods/properties installed there are found
// without calling the interceptor).
v8::Local<v8::ObjectTemplate> nativeObjectTemplate(Runtime& runtime) {
  auto state = runtime.state();
  if (state->nativeObjectTemplate.IsEmpty()) {
    v8::Local<v8::ObjectTemplate> objectTemplate = v8::ObjectTemplate::New(runtime.isolate());
    objectTemplate->SetInternalFieldCount(1);
    // toString must be own property to override Object.prototype.toString
    objectTemplate->Set(
        makeV8String(runtime.isolate(), "toString"),
        v8::FunctionTemplate::New(runtime.isolate(),
            [](const v8::FunctionCallbackInfo<v8::Value>& info) {
              v8::Local<v8::Object> self = info.This();
              if (self.IsEmpty() || self->InternalFieldCount() < 1) return;
              auto* holder = static_cast<HostObjectHolder*>(
                  self->GetAlignedPointerFromInternalField(0));
              if (holder == nullptr || holder->hostObject == nullptr) return;
              Runtime rt(holder->state);
              try {
                Value toStr = holder->hostObject->get(rt, PropNameID("toString"));
                if (!toStr.isUndefined()) {
                  v8::Local<v8::Value> v8Val = toStr.local(rt);
                  if (v8Val->IsFunction()) {
                    v8::Local<v8::Value> result;
                    if (v8Val.As<v8::Function>()->Call(rt.context(), self, 0, nullptr)
                            .ToLocal(&result)) {
                      info.GetReturnValue().Set(result);
                      return;
                    }
                  }
                }
              } catch (...) {}
            }),
        v8::DontEnum);
    objectTemplate->SetHandler(v8::NamedPropertyHandlerConfiguration(
        [](v8::Local<v8::Name> property,
           const v8::PropertyCallbackInfo<v8::Value>& info) -> v8::Intercepted {
          auto* holder =
              static_cast<HostObjectHolder*>(info.Holder()->GetAlignedPointerFromInternalField(0));
          if (holder == nullptr || holder->hostObject == nullptr) {
            return v8::Intercepted::kNo;
          }
          if (!property->IsString()) {
            return v8::Intercepted::kNo;
          }
          Runtime runtime(holder->state);
          try {
            v8::Isolate* isolate = info.GetIsolate();
            v8::String::Utf8Value utf8(isolate, property);
            if (*utf8 == nullptr) {
              return v8::Intercepted::kNo;
            }
            v8::Local<v8::Object> holderObject = info.Holder();
            v8::Local<v8::Object> receiver =
                info.This()->IsObject() ? info.This().As<v8::Object>() : holderObject;
            v8::Local<v8::Value> prototypeResult;
            if (tryResolvePrototypeGet(runtime, holderObject, receiver,
                                       property, &prototypeResult)) {
              info.GetReturnValue().Set(prototypeResult);
              return v8::Intercepted::kYes;
            }
            Value result = holder->hostObject->get(
                runtime, PropNameID(std::string(*utf8, utf8.length())));
            if (!result.isUndefined()) {
              info.GetReturnValue().Set(result.local(runtime));
              return v8::Intercepted::kYes;
            }
          } catch (const std::exception& exception) {
            throwV8Exception(info.GetIsolate(), exception);
            return v8::Intercepted::kYes;
          }
          return v8::Intercepted::kNo;
        },
        [](v8::Local<v8::Name> property, v8::Local<v8::Value> value,
           const v8::PropertyCallbackInfo<void>& info) -> v8::Intercepted {
          auto* holder =
              static_cast<HostObjectHolder*>(info.Holder()->GetAlignedPointerFromInternalField(0));
          if (holder == nullptr || holder->hostObject == nullptr) {
            return v8::Intercepted::kNo;
          }
          if (!property->IsString()) {
            return v8::Intercepted::kNo;
          }
          Runtime runtime(holder->state);
          try {
            v8::Isolate* isolate = info.GetIsolate();
            v8::String::Utf8Value utf8(isolate, property);
            if (*utf8 == nullptr) {
              return v8::Intercepted::kNo;
            }
            v8::Local<v8::Object> holderObject = info.Holder();
            v8::Local<v8::Object> receiver =
                info.This()->IsObject() ? info.This().As<v8::Object>() : holderObject;
            if (tryInvokePrototypeSetter(runtime, holderObject, receiver,
                                         property, value)) {
              return v8::Intercepted::kYes;
            }
            bool handled = holder->hostObject->set(
                runtime, PropNameID(std::string(*utf8, utf8.length())),
                Value(runtime, value));
            return handled ? v8::Intercepted::kYes : v8::Intercepted::kNo;
          } catch (const std::exception& exception) {
            throwV8Exception(info.GetIsolate(), exception);
            return v8::Intercepted::kYes;
          }
        },
        nullptr, nullptr, nullptr, v8::Local<v8::Value>(),
        v8::PropertyHandlerFlags::kNonMasking));
    objectTemplate->SetHandler(v8::IndexedPropertyHandlerConfiguration(
        [](uint32_t index, const v8::PropertyCallbackInfo<v8::Value>& info) -> v8::Intercepted {
          auto* holder =
              static_cast<HostObjectHolder*>(info.Holder()->GetAlignedPointerFromInternalField(0));
          if (holder == nullptr || holder->hostObject == nullptr) {
            return v8::Intercepted::kNo;
          }
          Runtime runtime(holder->state);
          try {
            Value result = holder->hostObject->get(runtime, PropNameID(std::to_string(index)));
            if (!result.isUndefined()) {
              info.GetReturnValue().Set(result.local(runtime));
              return v8::Intercepted::kYes;
            }
          } catch (const std::exception& exception) {
            throwV8Exception(info.GetIsolate(), exception);
            return v8::Intercepted::kYes;
          }
          return v8::Intercepted::kNo;
        },
        [](uint32_t index, v8::Local<v8::Value> value,
           const v8::PropertyCallbackInfo<void>& info) -> v8::Intercepted {
          auto* holder =
              static_cast<HostObjectHolder*>(info.Holder()->GetAlignedPointerFromInternalField(0));
          if (holder == nullptr || holder->hostObject == nullptr) {
            return v8::Intercepted::kNo;
          }
          Runtime runtime(holder->state);
          try {
            holder->hostObject->set(runtime, PropNameID(std::to_string(index)),
                                    Value(runtime, value));
            return v8::Intercepted::kYes;
          } catch (const std::exception& exception) {
            throwV8Exception(info.GetIsolate(), exception);
            return v8::Intercepted::kYes;
          }
        },
        nullptr, nullptr, nullptr, v8::Local<v8::Value>(),
        v8::PropertyHandlerFlags::kNonMasking));
    state->nativeObjectTemplate.Reset(runtime.isolate(), objectTemplate);
  }
  return state->nativeObjectTemplate.Get(runtime.isolate());
}

void hostObjectWeakCallback(const v8::WeakCallbackInfo<HostObjectHolder>& info) {
  untrackRuntimeAllocation(info.GetIsolate(), info.GetParameter());
  delete info.GetParameter();
}

void functionWeakCallback(const v8::WeakCallbackInfo<FunctionHolder>& info) {
  untrackRuntimeAllocation(info.GetIsolate(), info.GetParameter());
  delete info.GetParameter();
}

}  // namespace v8engine

Object Object::createFromHostObjectWithToken(Runtime& runtime, std::shared_ptr<HostObject> host,
                                             const void* typeToken) {
  v8::Local<v8::Object> object =
      v8engine::hostObjectTemplate(runtime)->NewInstance(runtime.context()).ToLocalChecked();
  auto* holder = new v8engine::HostObjectHolder(runtime.state(), std::move(host), typeToken);
  v8engine::trackRuntimeAllocation(runtime.isolate(), holder);
  object->SetAlignedPointerInInternalField(0, holder);
  holder->object.Reset(runtime.isolate(), object);
  holder->object.SetWeak(holder, v8engine::hostObjectWeakCallback,
                         v8::WeakCallbackType::kParameter);
  return Object::fromValueStorage(Value(runtime, object).storage_);
}

Object Object::createNativeInstanceWithToken(Runtime& runtime, std::shared_ptr<HostObject> host,
                                             const void* typeToken) {
  v8::Local<v8::Object> object =
      v8engine::nativeObjectTemplate(runtime)->NewInstance(runtime.context()).ToLocalChecked();
  auto* holder = new v8engine::HostObjectHolder(runtime.state(), std::move(host), typeToken);
  v8engine::trackRuntimeAllocation(runtime.isolate(), holder);
  object->SetAlignedPointerInInternalField(0, holder);
  holder->object.Reset(runtime.isolate(), object);
  holder->object.SetWeak(holder, v8engine::hostObjectWeakCallback,
                         v8::WeakCallbackType::kParameter);
  return Object::fromValueStorage(Value(runtime, object).storage_);
}

Function Function::createFromHostFunction(Runtime& runtime, const PropNameID& name, unsigned int,
                                          HostFunctionType callback) {
  auto* holder = new v8engine::FunctionHolder(runtime.state(), std::move(callback));
  v8engine::trackRuntimeAllocation(runtime.isolate(), holder);
  v8::Local<v8::External> data = v8::External::New(runtime.isolate(), holder);
  v8::Local<v8::FunctionTemplate> functionTemplate = v8::FunctionTemplate::New(
      runtime.isolate(),
      [](const v8::FunctionCallbackInfo<v8::Value>& info) {
        auto* holder =
            static_cast<v8engine::FunctionHolder*>(info.Data().As<v8::External>()->Value());
        Runtime runtime(holder->state);
        StackValueArray<Value, 8> args(static_cast<size_t>(info.Length()));
        for (int i = 0; i < info.Length(); i++) {
          args.emplace(static_cast<size_t>(i), Value::borrowed(runtime, info[i]));
        }
        try {
          Value thisValue = Value::borrowed(runtime, info.This());
          Value result = holder->callback(runtime, thisValue, args.size() == 0 ? nullptr : args.data(),
                                          args.size());
          info.GetReturnValue().Set(result.local(runtime));
        } catch (const std::exception& exception) {
          v8engine::throwV8Exception(info.GetIsolate(), exception);
        }
      },
      data);
  v8::Local<v8::Function> function =
      functionTemplate->GetFunction(runtime.context()).ToLocalChecked();
  std::string functionName = name.utf8(runtime);
  if (!functionName.empty()) {
    function->SetName(v8engine::makeV8String(runtime.isolate(), functionName));
  }
  holder->function.Reset(runtime.isolate(), function);
  holder->function.SetWeak(holder, v8engine::functionWeakCallback,
                           v8::WeakCallbackType::kParameter);
  return Function(Object::fromValueStorage(Value(runtime, function).storage_));
}

}  // namespace engine
}  // namespace nativescript

#endif  // TARGET_ENGINE_V8

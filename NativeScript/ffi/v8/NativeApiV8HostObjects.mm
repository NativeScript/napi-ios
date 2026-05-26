#include "NativeApiV8Runtime.h"

#ifdef TARGET_ENGINE_V8

namespace facebook {
namespace jsi {

namespace v8direct {

Value valueFromLocal(Runtime& runtime, v8::Local<v8::Value> value) { return Value(runtime, value); }

v8::Local<v8::ObjectTemplate> hostObjectTemplate(Runtime& runtime) {
  auto state = runtime.state();
  if (state->hostObjectTemplate.IsEmpty()) {
    v8::Local<v8::ObjectTemplate> objectTemplate = v8::ObjectTemplate::New(runtime.isolate());
    objectTemplate->SetInternalFieldCount(1);
    objectTemplate->SetHandler(v8::NamedPropertyHandlerConfiguration(
        [](v8::Local<v8::Name> property,
           const v8::PropertyCallbackInfo<v8::Value>& info) -> v8::Intercepted {
          auto* holder =
              static_cast<HostObjectHolder*>(info.Holder()->GetAlignedPointerFromInternalField(0));
          if (holder == nullptr || holder->hostObject == nullptr) {
            return v8::Intercepted::kNo;
          }
          Runtime runtime(holder->state);
          try {
            Value result = holder->hostObject->get(
                runtime, PropNameID(propertyNameToUtf8(info.GetIsolate(), property)));
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
            holder->hostObject->set(runtime,
                                    PropNameID(propertyNameToUtf8(info.GetIsolate(), property)),
                                    Value(runtime, value));
            return v8::Intercepted::kYes;
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
        nullptr, nullptr, nullptr, v8::Local<v8::Value>(), v8::PropertyHandlerFlags::kNone));
    state->hostObjectTemplate.Reset(runtime.isolate(), objectTemplate);
  }
  return state->hostObjectTemplate.Get(runtime.isolate());
}

void hostObjectWeakCallback(const v8::WeakCallbackInfo<HostObjectHolder>& info) {
  delete info.GetParameter();
}

void functionWeakCallback(const v8::WeakCallbackInfo<FunctionHolder>& info) {
  delete info.GetParameter();
}

}  // namespace v8direct

Object Object::createFromHostObjectWithToken(Runtime& runtime, std::shared_ptr<HostObject> host,
                                             const void* typeToken) {
  v8::Local<v8::Object> object =
      v8direct::hostObjectTemplate(runtime)->NewInstance(runtime.context()).ToLocalChecked();
  auto* holder = new v8direct::HostObjectHolder(runtime.state(), std::move(host), typeToken);
  object->SetAlignedPointerInInternalField(0, holder);
  holder->object.Reset(runtime.isolate(), object);
  holder->object.SetWeak(holder, v8direct::hostObjectWeakCallback,
                         v8::WeakCallbackType::kParameter);
  return Object::fromValueStorage(Value(runtime, object).storage_);
}

Function Function::createFromHostFunction(Runtime& runtime, const PropNameID& name, unsigned int,
                                          HostFunctionType callback) {
  auto* holder = new v8direct::FunctionHolder(runtime.state(), std::move(callback));
  v8::Local<v8::External> data = v8::External::New(runtime.isolate(), holder);
  v8::Local<v8::FunctionTemplate> functionTemplate = v8::FunctionTemplate::New(
      runtime.isolate(),
      [](const v8::FunctionCallbackInfo<v8::Value>& info) {
        auto* holder =
            static_cast<v8direct::FunctionHolder*>(info.Data().As<v8::External>()->Value());
        Runtime runtime(holder->state);
        std::vector<Value> args;
        args.reserve(info.Length());
        for (int i = 0; i < info.Length(); i++) {
          args.push_back(Value(runtime, info[i]));
        }
        try {
          Value thisValue(runtime, info.This());
          Value result = holder->callback(runtime, thisValue, args.empty() ? nullptr : args.data(),
                                          args.size());
          info.GetReturnValue().Set(result.local(runtime));
        } catch (const std::exception& exception) {
          v8direct::throwV8Exception(info.GetIsolate(), exception);
        }
      },
      data);
  v8::Local<v8::Function> function =
      functionTemplate->GetFunction(runtime.context()).ToLocalChecked();
  std::string functionName = name.utf8(runtime);
  if (!functionName.empty()) {
    function->SetName(v8direct::makeV8String(runtime.isolate(), functionName));
  }
  holder->function.Reset(runtime.isolate(), function);
  holder->function.SetWeak(holder, v8direct::functionWeakCallback,
                           v8::WeakCallbackType::kParameter);
  return Function(Object::fromValueStorage(Value(runtime, function).storage_));
}

}  // namespace jsi
}  // namespace facebook

#endif  // TARGET_ENGINE_V8

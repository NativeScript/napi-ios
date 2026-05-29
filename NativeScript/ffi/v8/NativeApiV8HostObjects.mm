#include "NativeApiV8Runtime.h"

#ifdef TARGET_ENGINE_V8

namespace nativescript {
namespace engine {

namespace v8engine {

Value valueFromLocal(Runtime& runtime, v8::Local<v8::Value> value) { return Value(runtime, value); }

template <size_t InlineCount>
class StackValueArray {
 public:
  explicit StackValueArray(size_t count) : count_(count) {
    if (count_ > InlineCount) {
      values_ = static_cast<Value*>(::operator new(sizeof(Value) * count_));
    } else {
      values_ = reinterpret_cast<Value*>(inlineStorage_);
    }
  }

  ~StackValueArray() {
    for (size_t i = 0; i < constructed_; i++) {
      values_[i].~Value();
    }
    if (count_ > InlineCount) {
      ::operator delete(values_);
    }
  }

  StackValueArray(const StackValueArray&) = delete;
  StackValueArray& operator=(const StackValueArray&) = delete;

  void emplace(size_t index, Value&& value) {
    new (&values_[index]) Value(std::move(value));
    constructed_++;
  }

  Value* data() { return count_ == 0 ? nullptr : values_; }
  size_t size() const { return count_; }

 private:
  size_t count_ = 0;
  size_t constructed_ = 0;
  Value* values_ = nullptr;
  alignas(Value) unsigned char inlineStorage_[sizeof(Value) * InlineCount];
};

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
        v8::Local<v8::Value>(), v8::PropertyHandlerFlags::kNonMasking));
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

}  // namespace v8engine

Object Object::createFromHostObjectWithToken(Runtime& runtime, std::shared_ptr<HostObject> host,
                                             const void* typeToken) {
  v8::Local<v8::Object> object =
      v8engine::hostObjectTemplate(runtime)->NewInstance(runtime.context()).ToLocalChecked();
  auto* holder = new v8engine::HostObjectHolder(runtime.state(), std::move(host), typeToken);
  object->SetAlignedPointerInInternalField(0, holder);
  holder->object.Reset(runtime.isolate(), object);
  holder->object.SetWeak(holder, v8engine::hostObjectWeakCallback,
                         v8::WeakCallbackType::kParameter);
  return Object::fromValueStorage(Value(runtime, object).storage_);
}

Function Function::createFromHostFunction(Runtime& runtime, const PropNameID& name, unsigned int,
                                          HostFunctionType callback) {
  auto* holder = new v8engine::FunctionHolder(runtime.state(), std::move(callback));
  v8::Local<v8::External> data = v8::External::New(runtime.isolate(), holder);
  v8::Local<v8::FunctionTemplate> functionTemplate = v8::FunctionTemplate::New(
      runtime.isolate(),
      [](const v8::FunctionCallbackInfo<v8::Value>& info) {
        auto* holder =
            static_cast<v8engine::FunctionHolder*>(info.Data().As<v8::External>()->Value());
        Runtime runtime(holder->state);
        v8engine::StackValueArray<8> args(static_cast<size_t>(info.Length()));
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

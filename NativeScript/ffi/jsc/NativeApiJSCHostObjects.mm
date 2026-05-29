#include "NativeApiJSCRuntime.h"

#ifdef TARGET_ENGINE_JSC

namespace nativescript {
namespace engine {

namespace jscengine {

JSClassRef hostClass(Runtime& runtime);
JSClassRef functionClass(Runtime& runtime);
void setFunctionPrototype(JSGlobalContextRef context, JSObjectRef function);

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

JSValueRef hostGetProperty(JSContextRef context, JSObjectRef object, JSStringRef propertyName,
                           JSValueRef* exception) {
  auto* holder = static_cast<HostObjectHolder*>(JSObjectGetPrivate(object));
  if (holder == nullptr || holder->hostObject == nullptr) {
    return nullptr;
  }
  Runtime runtime(holder->state);
  try {
    Value result = holder->hostObject->get(runtime, PropNameID(stringToUtf8(propertyName)));
    return result.isUndefined() ? nullptr : result.local(runtime);
  } catch (const std::exception& error) {
    setException(context, exception, error);
    return JSValueMakeUndefined(context);
  }
}

bool hostSetProperty(JSContextRef context, JSObjectRef object, JSStringRef propertyName,
                     JSValueRef value, JSValueRef* exception) {
  auto* holder = static_cast<HostObjectHolder*>(JSObjectGetPrivate(object));
  if (holder == nullptr || holder->hostObject == nullptr) {
    return false;
  }
  Runtime runtime(holder->state);
  try {
    holder->hostObject->set(runtime, PropNameID(stringToUtf8(propertyName)),
                            Value::borrowed(runtime, value));
    return true;
  } catch (const std::exception& error) {
    setException(context, exception, error);
    return true;
  }
}

void hostGetPropertyNames(JSContextRef, JSObjectRef object,
                          JSPropertyNameAccumulatorRef propertyNames) {
  auto* holder = static_cast<HostObjectHolder*>(JSObjectGetPrivate(object));
  if (holder == nullptr || holder->hostObject == nullptr) {
    return;
  }
  Runtime runtime(holder->state);
  try {
    for (const auto& property : holder->hostObject->getPropertyNames(runtime)) {
      JSStringRef name = makeJSString(property.utf8(runtime));
      JSPropertyNameAccumulatorAddName(propertyNames, name);
      JSStringRelease(name);
    }
  } catch (const std::exception&) {
  }
}

void hostFinalize(JSObjectRef object) {
  delete static_cast<HostObjectHolder*>(JSObjectGetPrivate(object));
}

JSValueRef functionCall(JSContextRef context, JSObjectRef function, JSObjectRef thisObject,
                        size_t argumentCount, const JSValueRef arguments[], JSValueRef* exception) {
  auto* holder = static_cast<FunctionHolder*>(JSObjectGetPrivate(function));
  if (holder == nullptr || !holder->callback) {
    return JSValueMakeUndefined(context);
  }
  Runtime runtime(holder->state);
  StackValueArray<8> args(argumentCount);
  for (size_t i = 0; i < argumentCount; i++) {
    args.emplace(i, Value::borrowed(runtime, arguments[i]));
  }
  try {
    Value thisValue = Value::borrowed(runtime, thisObject);
    Value result =
        holder->callback(runtime, thisValue, args.size() == 0 ? nullptr : args.data(),
                         args.size());
    return result.local(runtime);
  } catch (const std::exception& error) {
    setException(context, exception, error);
    return JSValueMakeUndefined(context);
  }
}

void functionFinalize(JSObjectRef object) {
  delete static_cast<FunctionHolder*>(JSObjectGetPrivate(object));
}

JSClassRef hostClass(Runtime& runtime) {
  auto state = runtime.state();
  if (state->hostClass == nullptr) {
    JSClassDefinition definition = kJSClassDefinitionEmpty;
    definition.className = "NativeScriptEngineHostObject";
    definition.getProperty = hostGetProperty;
    definition.setProperty = hostSetProperty;
    definition.getPropertyNames = hostGetPropertyNames;
    definition.finalize = hostFinalize;
    state->hostClass = JSClassCreate(&definition);
  }
  return state->hostClass;
}

JSClassRef functionClass(Runtime& runtime) {
  auto state = runtime.state();
  if (state->functionClass == nullptr) {
    JSClassDefinition definition = kJSClassDefinitionEmpty;
    definition.className = "NativeScriptEngineFunction";
    definition.callAsFunction = functionCall;
    definition.finalize = functionFinalize;
    state->functionClass = JSClassCreate(&definition);
  }
  return state->functionClass;
}

void setFunctionPrototype(JSGlobalContextRef context, JSObjectRef function) {
  if (context == nullptr || function == nullptr) {
    return;
  }

  JSValueRef exception = nullptr;
  JSStringRef functionName = makeJSString("Function");
  JSValueRef functionValue =
      JSObjectGetProperty(context, JSContextGetGlobalObject(context), functionName, &exception);
  JSStringRelease(functionName);
  if (exception != nullptr || functionValue == nullptr ||
      !JSValueIsObject(context, functionValue)) {
    return;
  }

  exception = nullptr;
  JSObjectRef functionConstructor = JSValueToObject(context, functionValue, &exception);
  if (exception != nullptr || functionConstructor == nullptr) {
    return;
  }

  JSStringRef prototypeName = makeJSString("prototype");
  JSValueRef prototypeValue =
      JSObjectGetProperty(context, functionConstructor, prototypeName, &exception);
  JSStringRelease(prototypeName);
  if (exception != nullptr || prototypeValue == nullptr ||
      !JSValueIsObject(context, prototypeValue)) {
    return;
  }

  JSObjectSetPrototype(context, function, prototypeValue);
}

}  // namespace jscengine

Object Object::createFromHostObjectWithToken(Runtime& runtime, std::shared_ptr<HostObject> host,
                                             const void* typeToken) {
  auto* holder = new jscengine::HostObjectHolder(runtime.state(), std::move(host), typeToken);
  JSObjectRef object = JSObjectMake(runtime.context(), jscengine::hostClass(runtime), holder);
  return Object::fromValueStorage(Value(runtime, object).storage_);
}

Function Function::createFromHostFunction(Runtime& runtime, const PropNameID& name, unsigned int,
                                          HostFunctionType callback) {
  auto* holder = new jscengine::FunctionHolder(runtime.state(), std::move(callback));
  JSObjectRef function = JSObjectMake(runtime.context(), jscengine::functionClass(runtime), holder);
  jscengine::setFunctionPrototype(runtime.context(), function);
  std::string functionName = name.utf8(runtime);
  if (!functionName.empty()) {
    JSStringRef property = jscengine::makeJSString("name");
    JSStringRef valueString = jscengine::makeJSString(functionName);
    JSValueRef value = JSValueMakeString(runtime.context(), valueString);
    JSObjectSetProperty(runtime.context(), function, property, value, kJSPropertyAttributeReadOnly,
                        nullptr);
    JSStringRelease(valueString);
    JSStringRelease(property);
  }
  return Function(Object::fromValueStorage(Value(runtime, function).storage_));
}

}  // namespace engine
}  // namespace nativescript

#endif  // TARGET_ENGINE_JSC

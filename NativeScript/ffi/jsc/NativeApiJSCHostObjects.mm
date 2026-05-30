#include "NativeApiJSCRuntime.h"

#ifdef TARGET_ENGINE_JSC

namespace facebook {
namespace jsi {

namespace jscdirect {

JSClassRef hostClass(Runtime& runtime);
JSClassRef functionClass(Runtime& runtime);

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
    holder->hostObject->set(runtime, PropNameID(stringToUtf8(propertyName)), Value(runtime, value));
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
  std::vector<Value> args;
  args.reserve(argumentCount);
  for (size_t i = 0; i < argumentCount; i++) {
    args.emplace_back(runtime, arguments[i]);
  }
  try {
    Value thisValue(runtime, thisObject);
    Value result =
        holder->callback(runtime, thisValue, args.empty() ? nullptr : args.data(), args.size());
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
    definition.className = "NativeScriptDirectHostObject";
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
    definition.className = "NativeScriptDirectFunction";
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

}  // namespace jscdirect

Object Object::createFromHostObjectWithToken(Runtime& runtime, std::shared_ptr<HostObject> host,
                                             const void* typeToken) {
  auto* holder = new jscdirect::HostObjectHolder(runtime.state(), std::move(host), typeToken);
  JSObjectRef object = JSObjectMake(runtime.context(), jscdirect::hostClass(runtime), holder);
  return Object::fromValueStorage(Value(runtime, object).storage_);
}

Function Function::createFromHostFunction(Runtime& runtime, const PropNameID& name, unsigned int,
                                          HostFunctionType callback) {
  auto* holder = new jscdirect::FunctionHolder(runtime.state(), std::move(callback));
  JSObjectRef function = JSObjectMake(runtime.context(), jscdirect::functionClass(runtime), holder);
  jscdirect::setFunctionPrototype(runtime.context(), function);
  std::string functionName = name.utf8(runtime);
  if (!functionName.empty()) {
    JSStringRef property = jscdirect::makeJSString("name");
    JSStringRef valueString = jscdirect::makeJSString(functionName);
    JSValueRef value = JSValueMakeString(runtime.context(), valueString);
    JSObjectSetProperty(runtime.context(), function, property, value, kJSPropertyAttributeReadOnly,
                        nullptr);
    JSStringRelease(valueString);
    JSStringRelease(property);
  }
  return Function(Object::fromValueStorage(Value(runtime, function).storage_));
}

}  // namespace jsi
}  // namespace facebook

#endif  // TARGET_ENGINE_JSC

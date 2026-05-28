#include "NativeApiQuickJSRuntime.h"

#ifdef TARGET_ENGINE_QUICKJS

namespace nativescript {
namespace direct {

namespace quickjsdirect {

JSClassID gHostClassId = 0;
JSClassID gFunctionClassId = 0;

namespace {
std::mutex& runtimeStatesMutex() {
  static auto* mutex = new std::mutex();
  return *mutex;
}

std::unordered_map<JSContext*, std::shared_ptr<RuntimeState>>& runtimeStates() {
  static auto* states = new std::unordered_map<JSContext*, std::shared_ptr<RuntimeState>>();
  return *states;
}
}  // namespace

std::shared_ptr<RuntimeState> stateForContext(JSContext* context) {
  std::lock_guard<std::mutex> lock(runtimeStatesMutex());
  auto& states = runtimeStates();
  auto it = states.find(context);
  if (it != states.end()) {
    return it->second;
  }
  auto state = std::make_shared<RuntimeState>(context);
  states[context] = state;
  return state;
}

static JSValue nativeHostGet(JSContext* ctx, JSValueConst obj, JSAtom atom, JSValueConst receiver) {
  (void)receiver;
  Runtime runtime(stateForContext(ctx));
  auto* holder = static_cast<HostObjectHolder*>(JS_GetOpaque(obj, gHostClassId));
  if (holder == nullptr || holder->hostObject == nullptr) {
    return JS_UNDEFINED;
  }
  try {
    Value result = holder->hostObject->get(runtime, PropNameID(atomToUtf8(ctx, atom)));
    return result.local(runtime);
  } catch (const std::exception& error) {
    return throwError(ctx, error);
  }
}

static int nativeHostSet(JSContext* ctx, JSValueConst obj, JSAtom atom, JSValueConst value,
                         JSValueConst, int) {
  Runtime runtime(stateForContext(ctx));
  auto* holder = static_cast<HostObjectHolder*>(JS_GetOpaque(obj, gHostClassId));
  if (holder == nullptr || holder->hostObject == nullptr) {
    return 0;
  }
  try {
    holder->hostObject->set(runtime, PropNameID(atomToUtf8(ctx, atom)), Value(runtime, value));
    return 1;
  } catch (const std::exception& error) {
    throwError(ctx, error);
    return -1;
  }
}

static int nativeHostHas(JSContext* ctx, JSValueConst obj, JSAtom atom) {
  Runtime runtime(stateForContext(ctx));
  auto* holder = static_cast<HostObjectHolder*>(JS_GetOpaque(obj, gHostClassId));
  if (holder == nullptr || holder->hostObject == nullptr) {
    return 0;
  }
  try {
    auto names = holder->hostObject->getPropertyNames(runtime);
    std::string requested = atomToUtf8(ctx, atom);
    for (const auto& name : names) {
      if (name.utf8(runtime) == requested) {
        return 1;
      }
    }
  } catch (const std::exception&) {
  }
  return 0;
}

static int nativeHostOwnNames(JSContext* ctx, JSPropertyEnum** ptab, uint32_t* plen,
                              JSValueConst obj) {
  Runtime runtime(stateForContext(ctx));
  auto* holder = static_cast<HostObjectHolder*>(JS_GetOpaque(obj, gHostClassId));
  if (holder == nullptr || holder->hostObject == nullptr) {
    *ptab = nullptr;
    *plen = 0;
    return 0;
  }
  auto names = holder->hostObject->getPropertyNames(runtime);
  *plen = static_cast<uint32_t>(names.size());
  *ptab = static_cast<JSPropertyEnum*>(js_mallocz(ctx, sizeof(JSPropertyEnum) * names.size()));
  for (uint32_t i = 0; i < *plen; i++) {
    (*ptab)[i].is_enumerable = true;
    (*ptab)[i].atom = JS_NewAtom(ctx, names[i].utf8(runtime).c_str());
  }
  return 0;
}

static void nativeHostFinalize(JSRuntime*, JSValue value) {
  auto* holder = static_cast<HostObjectHolder*>(JS_GetOpaque(value, gHostClassId));
  delete holder;
}

static JSValue invokeFunctionHolder(JSContext* ctx, FunctionHolder* holder, JSValueConst thisValue,
                                    int argc, JSValueConst* argv) {
  Runtime runtime(stateForContext(ctx));
  if (holder == nullptr || !holder->callback) {
    return JS_UNDEFINED;
  }
  std::vector<Value> args;
  args.reserve(argc);
  for (int i = 0; i < argc; i++) {
    args.emplace_back(runtime, argv[i]);
  }
  try {
    Value self(runtime, thisValue);
    Value result =
        holder->callback(runtime, self, args.empty() ? nullptr : args.data(), args.size());
    return result.local(runtime);
  } catch (const std::exception& error) {
    return throwError(ctx, error);
  }
}

static JSValue nativeFunctionCall(JSContext* ctx, JSValue function, JSValue thisValue, int argc,
                                  JSValue* argv, int) {
  auto* holder = static_cast<FunctionHolder*>(JS_GetOpaque(function, gFunctionClassId));
  return invokeFunctionHolder(ctx, holder, thisValue, argc, argv);
}

static JSValue nativeFunctionCallData(JSContext* ctx, JSValue thisValue, int argc, JSValue* argv,
                                      int, JSValue* data) {
  auto* holder = static_cast<FunctionHolder*>(JS_GetOpaque(data[0], gFunctionClassId));
  return invokeFunctionHolder(ctx, holder, thisValue, argc, argv);
}

static void nativeFunctionFinalize(JSRuntime*, JSValue value) {
  auto* holder = static_cast<FunctionHolder*>(JS_GetOpaque(value, gFunctionClassId));
  delete holder;
}

static JSClassExoticMethods hostExoticMethods = {
    .get_own_property = nullptr,
    .get_own_property_names = nativeHostOwnNames,
    .delete_property = nullptr,
    .define_own_property = nullptr,
    .has_property = nativeHostHas,
    .get_property = nativeHostGet,
    .set_property = nativeHostSet,
};

void ensureClasses(Runtime& runtime) {
  auto state = runtime.state();
  JSRuntime* rt = JS_GetRuntime(runtime.context());
  if (gHostClassId == 0) {
    JS_NewClassID(rt, &gHostClassId);
  }
  if (!state->hostClassRegistered) {
    JSClassDef def = {};
    def.class_name = "NativeScriptDirectHostObject";
    def.exotic = &hostExoticMethods;
    def.finalizer = nativeHostFinalize;
    JS_NewClass(rt, gHostClassId, &def);
    JS_SetClassProto(runtime.context(), gHostClassId, JS_NewObject(runtime.context()));
    state->hostClassRegistered = true;
  }
  if (gFunctionClassId == 0) {
    JS_NewClassID(rt, &gFunctionClassId);
  }
  if (!state->functionClassRegistered) {
    JSClassDef def = {};
    def.class_name = "NativeScriptDirectFunction";
    def.call = nativeFunctionCall;
    def.finalizer = nativeFunctionFinalize;
    JS_NewClass(rt, gFunctionClassId, &def);
    JS_SetClassProto(runtime.context(), gFunctionClassId, JS_NewObject(runtime.context()));
    state->functionClassRegistered = true;
  }
}

}  // namespace quickjsdirect

quickjsdirect::HostObjectHolder* Object::hostObjectHolder(Runtime& runtime) const {
  quickjsdirect::ensureClasses(runtime);
  JSValue object = local(runtime);
  auto* holder = static_cast<quickjsdirect::HostObjectHolder*>(
      JS_GetOpaque(object, quickjsdirect::gHostClassId));
  JS_FreeValue(runtime.context(), object);
  return holder;
}

Object Object::createFromHostObjectWithToken(Runtime& runtime, std::shared_ptr<HostObject> host,
                                             const void* typeToken) {
  quickjsdirect::ensureClasses(runtime);
  auto* holder = new quickjsdirect::HostObjectHolder(runtime.state(), std::move(host), typeToken);
  JSValue object = JS_NewObjectClass(runtime.context(), quickjsdirect::gHostClassId);
  JS_SetOpaque(object, holder);
  Object result = Object::fromValueStorage(Value(runtime, object).storage_);
  JS_FreeValue(runtime.context(), object);
  return result;
}

Function Function::createFromHostFunction(Runtime& runtime, const PropNameID& name,
                                          unsigned int parameterCount, HostFunctionType callback) {
  quickjsdirect::ensureClasses(runtime);
  auto* holder = new quickjsdirect::FunctionHolder(runtime.state(), std::move(callback));
  JSValue data = JS_NewObjectClass(runtime.context(), quickjsdirect::gFunctionClassId);
  if (JS_IsException(data)) {
    delete holder;
    throw JSError(runtime, "QuickJS host function data allocation failed.");
  }
  JS_SetOpaque(data, holder);

  JSValue function = JS_NewCFunctionData(runtime.context(), quickjsdirect::nativeFunctionCallData,
                                         static_cast<int>(parameterCount), 0, 1, &data);
  JS_FreeValue(runtime.context(), data);
  if (JS_IsException(function)) {
    throw JSError(runtime, "QuickJS host function allocation failed.");
  }

  std::string functionName = name.utf8(runtime);
  JSValue nameValue = JS_NewStringLen(runtime.context(), functionName.data(), functionName.size());
  JS_DefinePropertyValueStr(runtime.context(), function, "name", nameValue, JS_PROP_CONFIGURABLE);
  Function result = Function(Object::fromValueStorage(Value(runtime, function).storage_));
  JS_FreeValue(runtime.context(), function);
  return result;
}

}  // namespace direct
}  // namespace nativescript

#endif  // TARGET_ENGINE_QUICKJS

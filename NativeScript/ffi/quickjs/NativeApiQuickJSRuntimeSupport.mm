// Included by NativeApiQuickJS.mm inside the NativeScript anonymous namespace.

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
                           JS_PROP_CONFIGURABLE);
    JS_FreeAtom(context, atom);
  }
  JS_FreeValue(context, global);
  return result;
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
  JS_FreeValue(context, data[0]);
  JS_FreeValue(context, data[1]);
  if (JS_IsException(getter)) {
    JS_FreeAtom(context, atom);
    JS_FreeValue(context, global);
    return false;
  }

  int status =
      JS_DefinePropertyGetSet(context, global, atom, getter, JS_UNDEFINED, JS_PROP_CONFIGURABLE);
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

std::shared_ptr<Runtime> retainNativeApiRuntime(Runtime& runtime) {
  return std::make_shared<Runtime>(runtime.state());
}

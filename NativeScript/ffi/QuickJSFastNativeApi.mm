#include "QuickJSFastNativeApi.h"

#ifdef TARGET_ENGINE_QUICKJS

#include <quickjs.h>
#include <sys/queue.h>

#include <cassert>
#include <vector>

#include "CFunction.h"
#include "ClassMember.h"
#include "MetadataReader.h"
#include "ObjCBridge.h"
#include "mimalloc.h"
#include "quicks-runtime.h"

#ifndef SLIST_FOREACH_SAFE
#define SLIST_FOREACH_SAFE(var, head, field, tvar) \
  for ((var) = SLIST_FIRST((head));                \
       (var) && ((tvar) = SLIST_NEXT((var), field), 1); (var) = (tvar))
#endif

enum QuickJSFastHandleType {
  kQuickJSFastHandleStackAllocated,
  kQuickJSFastHandleHeapAllocated,
};

struct QuickJSFastHandle {
  JSValue value;
  SLIST_ENTRY(QuickJSFastHandle) node;
  QuickJSFastHandleType type;
};

struct napi_handle_scope__ {
  LIST_ENTRY(napi_handle_scope__) node;
  SLIST_HEAD(, QuickJSFastHandle) handleList;
  bool escapeCalled;
  QuickJSFastHandle stackHandles[8];
  int handleCount;
  QuickJSFastHandleType type;
};

struct napi_ref__ {
  JSValue value;
  LIST_ENTRY(napi_ref__) node;
  uint8_t referenceCount;
};

struct napi_env__ {
  JSValue referenceSymbolValue;
  napi_runtime runtime;
  JSContext* context;
  LIST_HEAD(, napi_handle_scope__) handleScopeList;
};

namespace {

enum QuickJSFastNativeKind : int {
  kQuickJSFastObjCMethod = 1,
  kQuickJSFastObjCGetter = 2,
  kQuickJSFastObjCSetter = 3,
  kQuickJSFastObjCReadOnlySetter = 4,
  kQuickJSFastCFunction = 5,
};

inline JSValue ToJSValue(napi_value value) {
  return value != nullptr ? *reinterpret_cast<JSValue*>(value) : JS_UNDEFINED;
}

bool readPointerData(JSContext* context, JSValue value, void** result) {
  if (result == nullptr) {
    return false;
  }

  uint64_t raw = 0;
  if (JS_ToBigUint64(context, &raw, value) != 0) {
    *result = nullptr;
    return false;
  }

  *result = reinterpret_cast<void*>(static_cast<uintptr_t>(raw));
  return true;
}

bool isCompatCFunction(napi_env env, void* data) {
  auto* bridgeState = nativescript::ObjCBridgeState::InstanceData(env);
  if (bridgeState == nullptr || data == nullptr) {
    return true;
  }

  auto offset = static_cast<MDSectionOffset>(reinterpret_cast<uintptr_t>(data));
  const char* name = bridgeState->metadata->getString(offset);
  return strcmp(name, "dispatch_async") == 0 ||
         strcmp(name, "dispatch_get_current_queue") == 0 ||
         strcmp(name, "dispatch_get_global_queue") == 0 ||
         strcmp(name, "UIApplicationMain") == 0 ||
         strcmp(name, "NSApplicationMain") == 0;
}

class QuickJSFastStackHandleScope {
 public:
  explicit QuickJSFastStackHandleScope(napi_env env) : env_(env) {
    scope_.type = kQuickJSFastHandleStackAllocated;
    scope_.handleCount = 0;
    scope_.escapeCalled = false;
    SLIST_INIT(&scope_.handleList);
    LIST_INSERT_HEAD(&env_->handleScopeList, &scope_, node);
  }

  ~QuickJSFastStackHandleScope() { close(); }

  void close() {
    if (closed_) {
      return;
    }

    assert(LIST_FIRST(&env_->handleScopeList) == &scope_ &&
           "QuickJS fast native handle scope should follow FILO rule.");
    QuickJSFastHandle *handle, *tempHandle;
    SLIST_FOREACH_SAFE(handle, &scope_.handleList, node, tempHandle) {
      JS_FreeValue(env_->context, handle->value);
      handle->value = JS_UNDEFINED;
      SLIST_REMOVE(&scope_.handleList, handle, QuickJSFastHandle, node);
      if (handle->type == kQuickJSFastHandleHeapAllocated) {
        mi_free(handle);
      }
    }
    LIST_REMOVE(&scope_, node);
    closed_ = true;
  }

 private:
  napi_env env_ = nullptr;
  napi_handle_scope__ scope_{};
  bool closed_ = false;
};

JSValue callFastNative(JSContext* context, JSValueConst thisValue, int argc,
                       JSValueConst* argv, int magic, JSValue* funcData) {
  napi_env env = static_cast<napi_env>(JS_GetContextOpaque(context));
  if (env == nullptr) {
    return JS_UNDEFINED;
  }

  void* data = nullptr;
  if (!readPointerData(context, funcData[0], &data)) {
    return JS_UNDEFINED;
  }

  bool useGlobalValue = false;
  JSValue effectiveThis = thisValue;
  if (JS_IsUndefined(effectiveThis)) {
    useGlobalValue = true;
    effectiveThis = JS_GetGlobalObject(context);
  }

  napi_value stackArgs[16];
  std::vector<napi_value> heapArgs;
  napi_value* napiArgs = stackArgs;
  if (argc > 16) {
    heapArgs.resize(static_cast<size_t>(argc));
    napiArgs = heapArgs.data();
  }
  for (int i = 0; i < argc; i++) {
    napiArgs[i] = reinterpret_cast<napi_value>(&argv[i]);
  }

  QuickJSFastStackHandleScope scope(env);

  napi_value jsThis = reinterpret_cast<napi_value>(&effectiveThis);
  napi_value result = nullptr;
  switch (magic) {
    case kQuickJSFastObjCMethod:
      result = nativescript::ObjCClassMember::jsCallDirect(
          env, static_cast<nativescript::ObjCClassMember*>(data), jsThis,
          static_cast<size_t>(argc), napiArgs);
      break;

    case kQuickJSFastObjCGetter:
      result = nativescript::ObjCClassMember::jsGetterDirect(
          env, static_cast<nativescript::ObjCClassMember*>(data), jsThis);
      break;

    case kQuickJSFastObjCSetter: {
      JSValue undefined = JS_UNDEFINED;
      napi_value value =
          argc > 0 ? reinterpret_cast<napi_value>(&argv[0])
                   : reinterpret_cast<napi_value>(&undefined);
      result = nativescript::ObjCClassMember::jsSetterDirect(
          env, static_cast<nativescript::ObjCClassMember*>(data), jsThis,
          value);
      break;
    }

    case kQuickJSFastObjCReadOnlySetter:
      result = nativescript::ObjCClassMember::jsReadOnlySetterDirect(env);
      break;

    case kQuickJSFastCFunction:
      result = nativescript::CFunction::jsCallDirect(
          env, static_cast<MDSectionOffset>(reinterpret_cast<uintptr_t>(data)),
          static_cast<size_t>(argc), napiArgs);
      break;

    default:
      break;
  }

  JSValue returnValue = JS_UNDEFINED;
  if (result != nullptr) {
    returnValue = JS_DupValue(context, ToJSValue(result));
  }

  scope.close();

  if (useGlobalValue) {
    JS_FreeValue(context, effectiveThis);
  }

  if (JS_HasException(context)) {
    JS_FreeValue(context, returnValue);
    return JS_Throw(context, JS_GetException(context));
  }

  return returnValue;
}

JSValue makeFastFunction(JSContext* context, int kind, void* data) {
  JSValue dataValue = JS_NewBigUint64(
      context, static_cast<uint64_t>(reinterpret_cast<uintptr_t>(data)));
  JSValue functionValue =
      JS_NewCFunctionData(context, callFastNative, 0, kind, 1, &dataValue);
  JS_FreeValue(context, dataValue);
  return functionValue;
}

bool defineFastProperty(napi_env env, napi_value object,
                        const napi_property_descriptor* descriptor,
                        JSValue value, JSValue getter, JSValue setter) {
  JSContext* context = qjs_get_context(env);
  if (context == nullptr || object == nullptr || descriptor == nullptr) {
    return false;
  }

  JSAtom key = 0;
  if (descriptor->name != nullptr) {
    key = JS_ValueToAtom(context, ToJSValue(descriptor->name));
  } else if (descriptor->utf8name != nullptr) {
    key = JS_NewAtom(context, descriptor->utf8name);
  } else {
    return false;
  }

  JSValue jsObject = ToJSValue(object);
  if (!JS_IsObject(jsObject)) {
    JS_FreeAtom(context, key);
    return false;
  }

  int flags =
      JS_PROP_HAS_WRITABLE | JS_PROP_HAS_ENUMERABLE | JS_PROP_HAS_CONFIGURABLE;
  if ((descriptor->attributes & napi_writable) != 0 ||
      !JS_IsUndefined(getter) || !JS_IsUndefined(setter)) {
    flags |= JS_PROP_WRITABLE;
  }
  if ((descriptor->attributes & napi_enumerable) != 0) {
    flags |= JS_PROP_ENUMERABLE;
  }
  if ((descriptor->attributes & napi_configurable) != 0) {
    flags |= JS_PROP_CONFIGURABLE;
  }

  if (!JS_IsUndefined(value)) {
    flags |= JS_PROP_HAS_VALUE;
  }
  if (!JS_IsUndefined(getter)) {
    flags |= JS_PROP_HAS_GET;
  }
  if (!JS_IsUndefined(setter)) {
    flags |= JS_PROP_HAS_SET;
  }

  int status = JS_DefineProperty(context, jsObject, key, value, getter, setter,
                                 flags);
  JS_FreeAtom(context, key);
  return status >= 0;
}

}  // namespace

extern "C" bool nativescript_quickjs_try_define_fast_native_property(
    napi_env env, napi_value object,
    const napi_property_descriptor* descriptor) {
  if (env == nullptr || object == nullptr || descriptor == nullptr) {
    return false;
  }

  JSContext* context = qjs_get_context(env);
  if (context == nullptr) {
    return false;
  }

  if (descriptor->method == nativescript::ObjCClassMember::jsCall &&
      descriptor->data != nullptr) {
    JSValue function =
        makeFastFunction(context, kQuickJSFastObjCMethod, descriptor->data);
    return !JS_IsException(function) &&
           defineFastProperty(env, object, descriptor, function,
                              JS_UNDEFINED, JS_UNDEFINED);
  }

  if (descriptor->method == nativescript::CFunction::jsCall &&
      descriptor->data != nullptr &&
      !isCompatCFunction(env, descriptor->data)) {
    JSValue function =
        makeFastFunction(context, kQuickJSFastCFunction, descriptor->data);
    return !JS_IsException(function) &&
           defineFastProperty(env, object, descriptor, function,
                              JS_UNDEFINED, JS_UNDEFINED);
  }

  if (descriptor->getter == nativescript::ObjCClassMember::jsGetter &&
      descriptor->data != nullptr) {
    JSValue getter =
        makeFastFunction(context, kQuickJSFastObjCGetter, descriptor->data);
    if (JS_IsException(getter)) {
      return false;
    }

    JSValue setter = JS_UNDEFINED;
    if (descriptor->setter == nativescript::ObjCClassMember::jsSetter) {
      setter =
          makeFastFunction(context, kQuickJSFastObjCSetter, descriptor->data);
      if (JS_IsException(setter)) {
        return false;
      }
    } else if (descriptor->setter ==
               nativescript::ObjCClassMember::jsReadOnlySetter) {
      setter = makeFastFunction(context, kQuickJSFastObjCReadOnlySetter,
                                descriptor->data);
      if (JS_IsException(setter)) {
        return false;
      }
    } else if (descriptor->setter != nullptr) {
      return false;
    }

    return defineFastProperty(env, object, descriptor, JS_UNDEFINED, getter,
                              setter);
  }

  return false;
}

#endif  // TARGET_ENGINE_QUICKJS

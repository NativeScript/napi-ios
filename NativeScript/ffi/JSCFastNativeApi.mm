#include "JSCFastNativeApi.h"

#ifdef TARGET_ENGINE_JSC

#import <Foundation/Foundation.h>

#include <vector>

#include "CFunction.h"
#include "ClassMember.h"
#include "MetadataReader.h"
#include "ObjCBridge.h"
#include "jsc-api.h"

namespace nativescript {
namespace {

enum class JSCFastNativeKind : uint8_t {
  ObjCMethod = 1,
  ObjCGetter = 2,
  ObjCSetter = 3,
  ObjCReadOnlySetter = 4,
  CFunction = 5,
};

struct JSCFastNativeBinding {
  napi_env env = nullptr;
  JSCFastNativeKind kind = JSCFastNativeKind::ObjCMethod;
  void* data = nullptr;
};

inline JSValueRef ToJSValue(napi_value value) {
  return reinterpret_cast<JSValueRef>(value);
}

inline napi_value ToNapi(JSValueRef value) {
  return reinterpret_cast<napi_value>(const_cast<OpaqueJSValue*>(value));
}

class ScopedJSString {
 public:
  explicit ScopedJSString(const char* value)
      : value_(JSStringCreateWithUTF8CString(value != nullptr ? value : "")) {}

  ~ScopedJSString() {
    if (value_ != nullptr) {
      JSStringRelease(value_);
    }
  }

  operator JSStringRef() const { return value_; }

 private:
  JSStringRef value_ = nullptr;
};

bool isCompatCFunction(napi_env env, void* data) {
  ObjCBridgeState* bridgeState = ObjCBridgeState::InstanceData(env);
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

void initializeFastFunction(JSContextRef ctx, JSObjectRef object) {
  JSObjectRef global = JSContextGetGlobalObject(ctx);
  JSValueRef functionCtorValue =
      JSObjectGetProperty(ctx, global, ScopedJSString("Function"), nullptr);
  JSObjectRef functionCtor = JSValueToObject(ctx, functionCtorValue, nullptr);
  if (functionCtor == nullptr) {
    return;
  }

  JSValueRef functionPrototype =
      JSObjectGetProperty(ctx, functionCtor, ScopedJSString("prototype"), nullptr);
  JSObjectRef functionPrototypeObject =
      JSValueToObject(ctx, functionPrototype, nullptr);
  if (functionPrototypeObject != nullptr) {
    JSObjectSetPrototype(ctx, object, functionPrototype);
    for (const char* name : {"bind", "call", "apply"}) {
      ScopedJSString propertyName(name);
      JSValueRef property =
          JSObjectGetProperty(ctx, functionPrototypeObject, propertyName, nullptr);
      if (property != nullptr && !JSValueIsUndefined(ctx, property)) {
        JSObjectSetProperty(ctx, object, propertyName, property,
                            kJSPropertyAttributeDontEnum, nullptr);
      }
    }
  }
}

JSValueRef callFastFunction(JSContextRef ctx, JSObjectRef function,
                            JSObjectRef thisObject, size_t argumentCount,
                            const JSValueRef arguments[],
                            JSValueRef* exception) {
  auto* binding =
      static_cast<JSCFastNativeBinding*>(JSObjectGetPrivate(function));
  if (binding == nullptr || binding->env == nullptr) {
    return JSValueMakeUndefined(ctx);
  }

  napi_env env = binding->env;
  env->last_error.error_code = napi_ok;
  env->last_error.engine_error_code = 0;
  env->last_error.engine_reserved = nullptr;

  JSValueRef effectiveThis =
      thisObject != nullptr ? thisObject : JSContextGetGlobalObject(ctx);
  napi_value stackArgs[16];
  std::vector<napi_value> heapArgs;
  napi_value* argv = stackArgs;
  if (argumentCount > 16) {
    heapArgs.resize(argumentCount);
    argv = heapArgs.data();
  }
  for (size_t i = 0; i < argumentCount; i++) {
    argv[i] = ToNapi(arguments[i]);
  }
  napi_value jsThis = ToNapi(effectiveThis);
  napi_value result = nullptr;

  switch (binding->kind) {
    case JSCFastNativeKind::ObjCMethod:
      result = ObjCClassMember::jsCallDirect(
          env, static_cast<ObjCClassMember*>(binding->data), jsThis,
          argumentCount, argv);
      break;

    case JSCFastNativeKind::ObjCGetter:
      result = ObjCClassMember::jsGetterDirect(
          env, static_cast<ObjCClassMember*>(binding->data), jsThis);
      break;

    case JSCFastNativeKind::ObjCSetter: {
      JSValueRef undefined = JSValueMakeUndefined(ctx);
      napi_value value =
          argumentCount > 0 ? ToNapi(arguments[0]) : ToNapi(undefined);
      result = ObjCClassMember::jsSetterDirect(
          env, static_cast<ObjCClassMember*>(binding->data), jsThis, value);
      break;
    }

    case JSCFastNativeKind::ObjCReadOnlySetter:
      result = ObjCClassMember::jsReadOnlySetterDirect(env);
      break;

    case JSCFastNativeKind::CFunction:
      result = CFunction::jsCallDirect(
          env, static_cast<MDSectionOffset>(
                   reinterpret_cast<uintptr_t>(binding->data)),
          argumentCount, argv);
      break;
  }

  if (env->last_exception != nullptr) {
    if (exception != nullptr) {
      *exception = env->last_exception;
    }
    env->last_exception = nullptr;
    return JSValueMakeUndefined(ctx);
  }

  return result != nullptr ? ToJSValue(result) : JSValueMakeUndefined(ctx);
}

void finalizeFastFunction(JSObjectRef object) {
  delete static_cast<JSCFastNativeBinding*>(JSObjectGetPrivate(object));
}

JSClassRef fastFunctionClass() {
  static JSClassRef cls = [] {
    JSClassDefinition definition = kJSClassDefinitionEmpty;
    definition.className = "NativeScriptFastNativeFunction";
    definition.initialize = initializeFastFunction;
    definition.callAsFunction = callFastFunction;
    definition.finalize = finalizeFastFunction;
    return JSClassCreate(&definition);
  }();
  return cls;
}

JSObjectRef makeFastFunction(napi_env env, JSCFastNativeKind kind,
                             void* data) {
  auto* binding = new JSCFastNativeBinding{env, kind, data};
  JSObjectRef function = JSObjectMake(env->context, fastFunctionClass(), binding);
  if (function == nullptr) {
    delete binding;
  }
  return function;
}

bool setDescriptorValue(JSContextRef ctx, JSObjectRef descriptor,
                        const char* name, JSValueRef value) {
  JSValueRef exception = nullptr;
  JSObjectSetProperty(ctx, descriptor, ScopedJSString(name), value,
                      kJSPropertyAttributeNone, &exception);
  return exception == nullptr;
}

bool defineProperty(napi_env env, napi_value object,
                    const napi_property_descriptor* descriptor,
                    JSValueRef propertyName, JSObjectRef value,
                    JSObjectRef getter, JSObjectRef setter) {
  JSContextRef ctx = env->context;
  JSValueRef objectValue = ToJSValue(object);
  if (!JSValueIsObject(ctx, objectValue)) {
    return false;
  }

  JSObjectRef jsObject = JSValueToObject(ctx, objectValue, nullptr);
  JSObjectRef propertyDescriptor = JSObjectMake(ctx, nullptr, nullptr);
  if (propertyDescriptor == nullptr) {
    return false;
  }

  if (!setDescriptorValue(ctx, propertyDescriptor, "configurable",
                          JSValueMakeBoolean(
                              ctx, (descriptor->attributes &
                                    napi_configurable) != 0)) ||
      !setDescriptorValue(ctx, propertyDescriptor, "enumerable",
                          JSValueMakeBoolean(
                              ctx, (descriptor->attributes &
                                    napi_enumerable) != 0))) {
    return false;
  }

  if (getter != nullptr || setter != nullptr) {
    if (getter != nullptr &&
        !setDescriptorValue(ctx, propertyDescriptor, "get", getter)) {
      return false;
    }
    if (setter != nullptr &&
        !setDescriptorValue(ctx, propertyDescriptor, "set", setter)) {
      return false;
    }
  } else if (value != nullptr) {
    if (!setDescriptorValue(ctx, propertyDescriptor, "writable",
                            JSValueMakeBoolean(
                                ctx, (descriptor->attributes &
                                      napi_writable) != 0)) ||
        !setDescriptorValue(ctx, propertyDescriptor, "value", value)) {
      return false;
    }
  } else {
    return false;
  }

  JSObjectRef global = JSContextGetGlobalObject(ctx);
  JSValueRef objectCtorValue =
      JSObjectGetProperty(ctx, global, ScopedJSString("Object"), nullptr);
  JSObjectRef objectCtor = JSValueToObject(ctx, objectCtorValue, nullptr);
  if (objectCtor == nullptr) {
    return false;
  }

  JSValueRef definePropertyValue =
      JSObjectGetProperty(ctx, objectCtor, ScopedJSString("defineProperty"),
                          nullptr);
  JSObjectRef definePropertyFunction =
      JSValueToObject(ctx, definePropertyValue, nullptr);
  if (definePropertyFunction == nullptr) {
    return false;
  }

  JSValueRef args[] = {jsObject, propertyName, propertyDescriptor};
  JSValueRef exception = nullptr;
  JSObjectCallAsFunction(ctx, definePropertyFunction, objectCtor, 3, args,
                         &exception);
  return exception == nullptr;
}

bool makePropertyName(napi_env env, const napi_property_descriptor* descriptor,
                      JSValueRef* propertyName) {
  if (descriptor->utf8name != nullptr) {
    *propertyName =
        JSValueMakeString(env->context, ScopedJSString(descriptor->utf8name));
    return true;
  }
  if (descriptor->name != nullptr) {
    *propertyName = ToJSValue(descriptor->name);
    return true;
  }
  return false;
}

}  // namespace

bool JSCTryDefineFastNativeProperty(
    napi_env env, napi_value object,
    const napi_property_descriptor* descriptor) {
  if (env == nullptr || object == nullptr || descriptor == nullptr) {
    return false;
  }

  JSValueRef propertyName = nullptr;
  if (!makePropertyName(env, descriptor, &propertyName)) {
    return false;
  }

  if (descriptor->method == ObjCClassMember::jsCall &&
      descriptor->data != nullptr) {
    JSObjectRef function = makeFastFunction(
        env, JSCFastNativeKind::ObjCMethod, descriptor->data);
    return function != nullptr &&
           defineProperty(env, object, descriptor, propertyName, function,
                          nullptr, nullptr);
  }

  if (descriptor->method == CFunction::jsCall && descriptor->data != nullptr &&
      !isCompatCFunction(env, descriptor->data)) {
    JSObjectRef function = makeFastFunction(
        env, JSCFastNativeKind::CFunction, descriptor->data);
    return function != nullptr &&
           defineProperty(env, object, descriptor, propertyName, function,
                          nullptr, nullptr);
  }

  if (descriptor->getter == ObjCClassMember::jsGetter &&
      descriptor->data != nullptr) {
    JSObjectRef getter = makeFastFunction(
        env, JSCFastNativeKind::ObjCGetter, descriptor->data);
    JSObjectRef setter = nullptr;
    if (descriptor->setter == ObjCClassMember::jsSetter) {
      setter = makeFastFunction(env, JSCFastNativeKind::ObjCSetter,
                                descriptor->data);
    } else if (descriptor->setter == ObjCClassMember::jsReadOnlySetter) {
      setter = makeFastFunction(env, JSCFastNativeKind::ObjCReadOnlySetter,
                                descriptor->data);
    } else if (descriptor->setter != nullptr) {
      return false;
    }

    return getter != nullptr &&
           (descriptor->setter == nullptr || setter != nullptr) &&
           defineProperty(env, object, descriptor, propertyName, nullptr,
                          getter, setter);
  }

  return false;
}

}  // namespace nativescript

#endif  // TARGET_ENGINE_JSC

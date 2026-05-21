#include "JSCFastNativeApi.h"

#ifdef TARGET_ENGINE_JSC

#import <Foundation/Foundation.h>

#include <cmath>
#include <cstdlib>
#include <cstring>
#include <string>
#include <unordered_map>
#include <vector>

#include "CFunction.h"
#include "ClassMember.h"
#include "MetadataReader.h"
#include "ObjCBridge.h"
#include "TypeConv.h"
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

SEL cachedSelectorForName(const char* selectorName, size_t length) {
  struct LastSelectorCacheEntry {
    std::string name;
    SEL selector = nullptr;
  };

  static thread_local LastSelectorCacheEntry lastSelector;
  if (lastSelector.selector != nullptr && lastSelector.name.size() == length &&
      memcmp(lastSelector.name.data(), selectorName, length) == 0) {
    return lastSelector.selector;
  }

  static thread_local std::unordered_map<std::string, SEL> selectorCache;
  std::string key(selectorName, length);
  auto cached = selectorCache.find(key);
  if (cached != selectorCache.end()) {
    lastSelector.name = cached->first;
    lastSelector.selector = cached->second;
    return cached->second;
  }

  SEL selector = sel_registerName(key.c_str());
  if (selectorCache.size() < 4096) {
    auto inserted = selectorCache.emplace(std::move(key), selector);
    lastSelector.name = inserted.first->first;
  } else {
    lastSelector.name.assign(selectorName, length);
  }
  lastSelector.selector = selector;
  return selector;
}

bool readJSCStringUTF8(napi_env env, JSValueRef jsValue, const char** out,
                       size_t* outLength, char* stackBuffer,
                       size_t stackCapacity, std::vector<char>* heapBuffer) {
  if (env == nullptr || jsValue == nullptr || out == nullptr ||
      outLength == nullptr || stackBuffer == nullptr || heapBuffer == nullptr) {
    return false;
  }

  JSValueRef exception = nullptr;
  JSStringRef str = JSValueToStringCopy(env->context, jsValue, &exception);
  if (exception != nullptr || str == nullptr) {
    env->last_exception = exception;
    return false;
  }

  const size_t maxLength = JSStringGetMaximumUTF8CStringSize(str);
  char* buffer = stackBuffer;
  size_t capacity = stackCapacity;
  if (maxLength > stackCapacity) {
    heapBuffer->assign(maxLength, '\0');
    buffer = heapBuffer->data();
    capacity = heapBuffer->size();
  }

  const size_t copied = JSStringGetUTF8CString(str, buffer, capacity);
  JSStringRelease(str);
  if (copied == 0) {
    return false;
  }

  *out = buffer;
  *outLength = copied - 1;
  return true;
}

NSString* makeNSStringFromJSCString(napi_env env, JSValueRef jsValue,
                                    bool mutableString) {
  if (env == nullptr || jsValue == nullptr) {
    return nil;
  }

  JSValueRef exception = nullptr;
  JSStringRef str = JSValueToStringCopy(env->context, jsValue, &exception);
  if (exception != nullptr || str == nullptr) {
    env->last_exception = exception;
    return nil;
  }

  const size_t length = JSStringGetLength(str);
  const JSChar* chars = JSStringGetCharactersPtr(str);
  NSString* result =
      [[[NSString alloc] initWithCharacters:reinterpret_cast<const unichar*>(chars)
                                     length:length] autorelease];
  JSStringRelease(str);
  if (result == nil) {
    result = @"";
  }
  if (mutableString) {
    return [[[NSMutableString alloc] initWithString:result] autorelease];
  }
  return result;
}

id normalizeWrappedNativeObject(napi_env env, MDTypeKind kind, void* wrapped) {
  if (wrapped == nullptr) {
    return nil;
  }

  auto bridgeState = ObjCBridgeState::InstanceData(env);
  if (bridgeState != nullptr) {
    for (const auto& entry : bridgeState->classes) {
      ObjCClass* bridgedClass = entry.second;
      if (bridgedClass == wrapped && bridgedClass->nativeClass != nil) {
        return (id)bridgedClass->nativeClass;
      }
    }

    if (kind == mdTypeProtocolObject || kind == mdTypeAnyObject) {
      for (const auto& entry : bridgeState->protocols) {
        ObjCProtocol* bridgedProtocol = entry.second;
        if (bridgedProtocol != wrapped) {
          continue;
        }

        Protocol* runtimeProtocol = objc_getProtocol(bridgedProtocol->name.c_str());
        if (runtimeProtocol != nil) {
          return (id)runtimeProtocol;
        }
        break;
      }
    }
  }

  return static_cast<id>(wrapped);
}

bool tryFastConvertJSCObjectArgument(napi_env env, MDTypeKind kind,
                                     JSValueRef jsValue, void* result) {
  if (env == nullptr || jsValue == nullptr || result == nullptr) {
    return false;
  }

  if (JSValueIsNull(env->context, jsValue) ||
      JSValueIsUndefined(env->context, jsValue)) {
    if (kind == mdTypeClass) {
      *reinterpret_cast<Class*>(result) = Nil;
    } else {
      *reinterpret_cast<id*>(result) = nil;
    }
    return true;
  }

  if (JSValueIsString(env->context, jsValue) &&
      (kind == mdTypeAnyObject || kind == mdTypeNSStringObject ||
       kind == mdTypeNSMutableStringObject)) {
    *reinterpret_cast<id*>(result) = makeNSStringFromJSCString(
        env, jsValue, kind == mdTypeNSMutableStringObject);
    return true;
  }

  if (kind == mdTypeAnyObject && JSValueIsBoolean(env->context, jsValue)) {
    *reinterpret_cast<id*>(result) =
        [NSNumber numberWithBool:JSValueToBoolean(env->context, jsValue)];
    return true;
  }

  if (kind == mdTypeAnyObject && JSValueIsNumber(env->context, jsValue)) {
    JSValueRef exception = nullptr;
    double converted = JSValueToNumber(env->context, jsValue, &exception);
    if (exception != nullptr) {
      env->last_exception = exception;
      return false;
    }
    *reinterpret_cast<id*>(result) = [NSNumber numberWithDouble:converted];
    return true;
  }

  if (!JSValueIsObject(env->context, jsValue)) {
    return false;
  }

  void* wrapped = nullptr;
  if (!nativescript_jsc_try_unwrap_native(env, ToNapi(jsValue), &wrapped) ||
      wrapped == nullptr) {
    return false;
  }

  if (kind == mdTypeClass) {
    id nativeObject = static_cast<id>(wrapped);
    if (!object_isClass(nativeObject)) {
      return false;
    }
    *reinterpret_cast<Class*>(result) = static_cast<Class>(wrapped);
    return true;
  }

  *reinterpret_cast<id*>(result) =
      normalizeWrappedNativeObject(env, kind, wrapped);
  return true;
}

}  // namespace

bool TryFastConvertJSCArgument(napi_env env, MDTypeKind kind, napi_value value,
                               void* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  JSContextRef ctx = env->context;
  JSValueRef jsValue = ToJSValue(value);
  switch (kind) {
    case mdTypeBool:
      if (!JSValueIsBoolean(ctx, jsValue)) {
        return false;
      }
      *reinterpret_cast<uint8_t*>(result) =
          JSValueToBoolean(ctx, jsValue) ? static_cast<uint8_t>(1) : static_cast<uint8_t>(0);
      return true;

    case mdTypeChar:
    case mdTypeUChar:
    case mdTypeUInt8:
    case mdTypeSShort:
    case mdTypeSInt:
    case mdTypeUInt:
    case mdTypeFloat:
    case mdTypeDouble: {
      if (!JSValueIsNumber(ctx, jsValue)) {
        return false;
      }
      JSValueRef exception = nullptr;
      double converted = JSValueToNumber(ctx, jsValue, &exception);
      if (exception != nullptr) {
        env->last_exception = exception;
        return false;
      }
      if (std::isnan(converted) || std::isinf(converted)) {
        converted = 0.0;
      }
      switch (kind) {
        case mdTypeChar:
          *reinterpret_cast<int8_t*>(result) = static_cast<int8_t>(converted);
          break;
        case mdTypeUChar:
        case mdTypeUInt8:
          *reinterpret_cast<uint8_t*>(result) = static_cast<uint8_t>(converted);
          break;
        case mdTypeSShort:
          *reinterpret_cast<int16_t*>(result) = static_cast<int16_t>(converted);
          break;
        case mdTypeSInt:
          *reinterpret_cast<int32_t*>(result) = static_cast<int32_t>(converted);
          break;
        case mdTypeUInt:
          *reinterpret_cast<uint32_t*>(result) = static_cast<uint32_t>(converted);
          break;
        case mdTypeFloat:
          *reinterpret_cast<float*>(result) = static_cast<float>(converted);
          break;
        case mdTypeDouble:
          *reinterpret_cast<double*>(result) = converted;
          break;
        default:
          break;
      }
      return true;
    }

    case mdTypeUShort:
      if (JSValueIsString(ctx, jsValue)) {
        JSValueRef exception = nullptr;
        JSStringRef str = JSValueToStringCopy(ctx, jsValue, &exception);
        if (exception != nullptr || str == nullptr) {
          env->last_exception = exception;
          return false;
        }
        const size_t length = JSStringGetLength(str);
        if (length != 1) {
          JSStringRelease(str);
          napi_throw_type_error(env, nullptr, "Expected a single-character string.");
          return false;
        }
        *reinterpret_cast<uint16_t*>(result) =
            static_cast<uint16_t>(JSStringGetCharactersPtr(str)[0]);
        JSStringRelease(str);
        return true;
      }
      if (JSValueIsNumber(ctx, jsValue)) {
        JSValueRef exception = nullptr;
        double converted = JSValueToNumber(ctx, jsValue, &exception);
        if (exception != nullptr) {
          env->last_exception = exception;
          return false;
        }
        *reinterpret_cast<uint16_t*>(result) = static_cast<uint16_t>(converted);
        return true;
      }
      return false;

    case mdTypeSLong:
    case mdTypeSInt64:
    case mdTypeULong:
    case mdTypeUInt64:
      if (JSValueIsNumber(ctx, jsValue)) {
        JSValueRef exception = nullptr;
        double converted = JSValueToNumber(ctx, jsValue, &exception);
        if (exception != nullptr) {
          env->last_exception = exception;
          return false;
        }
        if (std::isnan(converted) || std::isinf(converted)) {
          converted = 0.0;
        }
        if (kind == mdTypeSLong || kind == mdTypeSInt64) {
          *reinterpret_cast<int64_t*>(result) = static_cast<int64_t>(converted);
        } else {
          *reinterpret_cast<uint64_t*>(result) = static_cast<uint64_t>(converted);
        }
        return true;
      }
      if (__builtin_available(macOS 15.0, iOS 18.0, *)) {
        if (!JSValueIsBigInt(ctx, jsValue)) {
          return false;
        }
        JSValueRef exception = nullptr;
        if (kind == mdTypeSLong || kind == mdTypeSInt64) {
          *reinterpret_cast<int64_t*>(result) =
              JSValueToInt64(ctx, jsValue, &exception);
        } else {
          *reinterpret_cast<uint64_t*>(result) =
              JSValueToUInt64(ctx, jsValue, &exception);
        }
        if (exception != nullptr) {
          env->last_exception = exception;
          return false;
        }
        return true;
      }
      if (kind == mdTypeSLong || kind == mdTypeSInt64) {
        bool lossless = false;
        return napi_get_value_bigint_int64(env, value, reinterpret_cast<int64_t*>(result),
                                           &lossless) == napi_ok;
      }
      {
        bool lossless = false;
        return napi_get_value_bigint_uint64(env, value, reinterpret_cast<uint64_t*>(result),
                                            &lossless) == napi_ok;
      }

    case mdTypeSelector: {
      SEL* selector = reinterpret_cast<SEL*>(result);
      if (JSValueIsNull(ctx, jsValue) || JSValueIsUndefined(ctx, jsValue)) {
        *selector = nullptr;
        return true;
      }
      if (!JSValueIsString(ctx, jsValue)) {
        return false;
      }

      constexpr size_t kStackCapacity = 256;
      char stackBuffer[kStackCapacity];
      std::vector<char> heapBuffer;
      const char* selectorName = nullptr;
      size_t selectorLength = 0;
      if (!readJSCStringUTF8(env, jsValue, &selectorName, &selectorLength,
                             stackBuffer, kStackCapacity, &heapBuffer)) {
        return false;
      }
      *selector = cachedSelectorForName(selectorName, selectorLength);
      return true;
    }

    case mdTypeClass:
    case mdTypeAnyObject:
    case mdTypeProtocolObject:
    case mdTypeClassObject:
    case mdTypeInstanceObject:
    case mdTypeNSStringObject:
    case mdTypeNSMutableStringObject:
      if (tryFastConvertJSCObjectArgument(env, kind, jsValue, result)) {
        return true;
      }
      return TryFastConvertNapiArgument(env, kind, value, result);

    default:
      return false;
  }
}

bool TryFastConvertJSCReturnValue(napi_env env, MDTypeKind kind,
                                  const void* value, napi_value* result) {
  if (env == nullptr || result == nullptr) {
    return false;
  }

  JSContextRef ctx = env->context;
  JSValueRef jsValue = nullptr;
  switch (kind) {
    case mdTypeVoid:
      jsValue = JSValueMakeNull(ctx);
      break;

    case mdTypeBool:
      if (value == nullptr) {
        return false;
      }
      jsValue = JSValueMakeBoolean(
          ctx, *reinterpret_cast<const uint8_t*>(value) != 0);
      break;

    case mdTypeChar: {
      if (value == nullptr) {
        return false;
      }
      const int8_t raw = *reinterpret_cast<const int8_t*>(value);
      jsValue = raw == 0 || raw == 1
                    ? JSValueMakeBoolean(ctx, raw == 1)
                    : JSValueMakeNumber(ctx, raw);
      break;
    }

    case mdTypeUChar:
    case mdTypeUInt8: {
      if (value == nullptr) {
        return false;
      }
      const uint8_t raw = *reinterpret_cast<const uint8_t*>(value);
      jsValue = raw == 0 || raw == 1
                    ? JSValueMakeBoolean(ctx, raw == 1)
                    : JSValueMakeNumber(ctx, raw);
      break;
    }

    case mdTypeSShort:
      if (value == nullptr) {
        return false;
      }
      jsValue = JSValueMakeNumber(ctx, *reinterpret_cast<const int16_t*>(value));
      break;

    case mdTypeUShort: {
      if (value == nullptr) {
        return false;
      }
      const uint16_t raw = *reinterpret_cast<const uint16_t*>(value);
      if (raw >= 32 && raw <= 126) {
        const char buffer[2] = {static_cast<char>(raw), '\0'};
        jsValue = JSValueMakeString(ctx, ScopedJSString(buffer));
      } else {
        jsValue = JSValueMakeNumber(ctx, raw);
      }
      break;
    }

    case mdTypeSInt:
      if (value == nullptr) {
        return false;
      }
      jsValue = JSValueMakeNumber(ctx, *reinterpret_cast<const int32_t*>(value));
      break;

    case mdTypeUInt:
      if (value == nullptr) {
        return false;
      }
      jsValue = JSValueMakeNumber(ctx, *reinterpret_cast<const uint32_t*>(value));
      break;

    case mdTypeSLong:
    case mdTypeSInt64: {
      if (value == nullptr) {
        return false;
      }
      const int64_t raw = *reinterpret_cast<const int64_t*>(value);
      constexpr int64_t kMaxSafeInteger = 9007199254740991LL;
      if (raw > kMaxSafeInteger || raw < -kMaxSafeInteger) {
        napi_value bigint = nullptr;
        if (napi_create_bigint_int64(env, raw, &bigint) == napi_ok) {
          *result = bigint;
          return true;
        }
      }
      jsValue = JSValueMakeNumber(ctx, static_cast<double>(raw));
      break;
    }

    case mdTypeULong:
    case mdTypeUInt64: {
      if (value == nullptr) {
        return false;
      }
      const uint64_t raw = *reinterpret_cast<const uint64_t*>(value);
      constexpr uint64_t kMaxSafeInteger = 9007199254740991ULL;
      if (raw > kMaxSafeInteger) {
        napi_value bigint = nullptr;
        if (napi_create_bigint_uint64(env, raw, &bigint) == napi_ok) {
          *result = bigint;
          return true;
        }
      }
      jsValue = JSValueMakeNumber(ctx, static_cast<double>(raw));
      break;
    }

    case mdTypeFloat:
      if (value == nullptr) {
        return false;
      }
      jsValue = JSValueMakeNumber(ctx, *reinterpret_cast<const float*>(value));
      break;

    case mdTypeDouble:
      if (value == nullptr) {
        return false;
      }
      jsValue = JSValueMakeNumber(ctx, *reinterpret_cast<const double*>(value));
      break;

    default:
      return false;
  }

  *result = ToNapi(jsValue);
  return true;
}

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

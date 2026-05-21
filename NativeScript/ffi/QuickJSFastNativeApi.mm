#include "QuickJSFastNativeApi.h"

#ifdef TARGET_ENGINE_QUICKJS

#import <Foundation/Foundation.h>

#include <quickjs.h>
#include <sys/queue.h>

#include <cassert>
#include <cmath>
#include <cstring>
#include <string>
#include <unordered_map>
#include <vector>

#include "CFunction.h"
#include "ClassMember.h"
#include "MetadataReader.h"
#include "ObjCBridge.h"
#include "TypeConv.h"
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

struct QuickJSFastExternalInfo {
  void* data;
  void* finalizeHint;
  napi_finalize finalizeCallback;
};

struct QuickJSFastAtoms {
  JSAtom napi_external;
  JSAtom registerFinalizer;
  JSAtom constructor;
  JSAtom prototype;
  JSAtom napi_buffer;
  JSAtom NAPISymbolFor;
  JSAtom object;
  JSAtom freeze;
  JSAtom seal;
  JSAtom Symbol;
  JSAtom length;
  JSAtom is;
  JSAtom byteLength;
  JSAtom buffer;
  JSAtom byteOffset;
  JSAtom name;
  JSAtom napi_typetag;
  JSAtom weakref;
};

struct napi_runtime__ {
  JSRuntime* runtime;
  JSClassID constructorClassId;
  JSClassID functionClassId;
  JSClassID externalClassId;
  JSClassID napiHostObjectClassId;
  JSClassID napiObjectClassId;
};

struct napi_env__ {
  JSValue referenceSymbolValue;
  napi_runtime runtime;
  JSContext* context;
  LIST_HEAD(, napi_handle_scope__) handleScopeList;
  LIST_HEAD(, napi_ref__) referencesList;
  bool isThrowNull;
  QuickJSFastExternalInfo* instanceData;
  JSValue finalizationRegistry;
  napi_extended_error_info last_error;
  QuickJSFastAtoms atoms;
  QuickJSFastExternalInfo* gcBefore;
  QuickJSFastExternalInfo* gcAfter;
  int js_enter_state;
  int64_t usedMemory;
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

namespace nativescript {

namespace {

inline bool readQuickJSNumber(JSValue value, double* result) {
  if (result == nullptr) {
    return false;
  }

  const int tag = JS_VALUE_GET_NORM_TAG(value);
  if (tag == JS_TAG_INT) {
    *result = static_cast<double>(JS_VALUE_GET_INT(value));
    return true;
  }
  if (tag == JS_TAG_FLOAT64) {
    *result = JS_VALUE_GET_FLOAT64(value);
    return true;
  }
  return false;
}

inline bool readQuickJSInt64(JSContext* context, JSValue value,
                             int64_t* result) {
  if (context == nullptr || result == nullptr) {
    return false;
  }

  const int tag = JS_VALUE_GET_NORM_TAG(value);
  if (tag == JS_TAG_INT) {
    *result = static_cast<int64_t>(JS_VALUE_GET_INT(value));
    return true;
  }
  if (tag == JS_TAG_FLOAT64) {
    const double converted = JS_VALUE_GET_FLOAT64(value);
    if (std::isnan(converted) || std::isinf(converted)) {
      *result = 0;
      return true;
    }
    *result = static_cast<int64_t>(converted);
    return true;
  }
  if (JS_IsBigInt(context, value)) {
    return JS_ToBigInt64(context, result, value) == 0;
  }
  return false;
}

inline bool readQuickJSUInt64(JSContext* context, JSValue value,
                              uint64_t* result) {
  if (context == nullptr || result == nullptr) {
    return false;
  }

  const int tag = JS_VALUE_GET_NORM_TAG(value);
  if (tag == JS_TAG_INT) {
    *result = static_cast<uint64_t>(
        static_cast<int64_t>(JS_VALUE_GET_INT(value)));
    return true;
  }
  if (tag == JS_TAG_FLOAT64) {
    const double converted = JS_VALUE_GET_FLOAT64(value);
    if (std::isnan(converted) || std::isinf(converted)) {
      *result = 0;
      return true;
    }
    *result = static_cast<uint64_t>(converted);
    return true;
  }
  if (JS_IsBigInt(context, value)) {
    return JS_ToBigUint64(context, result, value) == 0;
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

id normalizeWrappedNativeObject(napi_env env, MDTypeKind kind, void* wrapped) {
  if (wrapped == nullptr) {
    return nil;
  }

  auto* bridgeState = ObjCBridgeState::InstanceData(env);
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

        Protocol* runtimeProtocol =
            objc_getProtocol(bridgedProtocol->name.c_str());
        if (runtimeProtocol != nil) {
          return (id)runtimeProtocol;
        }
        break;
      }
    }
  }

  return static_cast<id>(wrapped);
}

bool tryFastUnwrapQuickJSNativeObject(napi_env env, JSValue jsValue,
                                      void** result) {
  if (env == nullptr || result == nullptr || !JS_IsObject(jsValue)) {
    return false;
  }

  *result = nullptr;
  JSPropertyDescriptor descriptor{};
  int wrapped = JS_GetOwnProperty(env->context, &descriptor, jsValue,
                                  env->atoms.napi_external);
  if (wrapped <= 0) {
    return false;
  }

  auto* externalInfo = static_cast<QuickJSFastExternalInfo*>(
      JS_GetOpaque(descriptor.value, env->runtime->externalClassId));
  if (externalInfo != nullptr && externalInfo->data != nullptr) {
    *result = externalInfo->data;
  }

  JS_FreeValue(env->context, descriptor.value);
  return *result != nullptr;
}

bool tryFastConvertQuickJSObjectArgument(napi_env env, MDTypeKind kind,
                                         JSValue jsValue, void* result) {
  if (env == nullptr || result == nullptr) {
    return false;
  }

  if (JS_IsNull(jsValue) || JS_IsUndefined(jsValue)) {
    if (kind == mdTypeClass) {
      *reinterpret_cast<Class*>(result) = Nil;
    } else {
      *reinterpret_cast<id*>(result) = nil;
    }
    return true;
  }

  if (JS_IsString(jsValue) &&
      (kind == mdTypeAnyObject || kind == mdTypeNSStringObject ||
       kind == mdTypeNSMutableStringObject)) {
    size_t length = 0;
    const char* chars = JS_ToCStringLen(env->context, &length, jsValue);
    if (chars == nullptr) {
      return false;
    }

    NSString* string =
        [[[NSString alloc] initWithBytes:chars
                                  length:length
                                encoding:NSUTF8StringEncoding] autorelease];
    JS_FreeCString(env->context, chars);
    if (string == nil) {
      string = @"";
    }
    if (kind == mdTypeNSMutableStringObject) {
      string = [[[NSMutableString alloc] initWithString:string] autorelease];
    }
    *reinterpret_cast<id*>(result) = string;
    return true;
  }

  if (kind == mdTypeAnyObject && JS_IsBool(jsValue)) {
    *reinterpret_cast<id*>(result) =
        [NSNumber numberWithBool:JS_VALUE_GET_BOOL(jsValue)];
    return true;
  }

  if (kind == mdTypeAnyObject) {
    double number = 0.0;
    if (readQuickJSNumber(jsValue, &number)) {
      *reinterpret_cast<id*>(result) = [NSNumber numberWithDouble:number];
      return true;
    }
  }

  void* wrapped = nullptr;
  if (!tryFastUnwrapQuickJSNativeObject(env, jsValue, &wrapped)) {
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

bool TryFastConvertQuickJSArgument(napi_env env, MDTypeKind kind,
                                   napi_value value, void* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  JSContext* context = qjs_get_context(env);
  if (context == nullptr) {
    return false;
  }

  JSValue jsValue = ToJSValue(value);
  switch (kind) {
    case mdTypeBool:
      if (!JS_IsBool(jsValue)) {
        return false;
      }
      *reinterpret_cast<uint8_t*>(result) =
          JS_VALUE_GET_BOOL(jsValue) ? static_cast<uint8_t>(1) : static_cast<uint8_t>(0);
      return true;

    case mdTypeChar:
    case mdTypeUChar:
    case mdTypeUInt8:
    case mdTypeSShort:
    case mdTypeSInt:
    case mdTypeUInt:
    case mdTypeFloat:
    case mdTypeDouble: {
      double converted = 0.0;
      if (!readQuickJSNumber(jsValue, &converted)) {
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
      if (JS_IsString(jsValue)) {
        size_t length = 0;
        const char* str = JS_ToCStringLen(context, &length, jsValue);
        if (str == nullptr) {
          return false;
        }
        if (length != 1) {
          JS_FreeCString(context, str);
          napi_throw_type_error(env, nullptr, "Expected a single-character string.");
          return false;
        }
        *reinterpret_cast<uint16_t*>(result) = static_cast<uint8_t>(str[0]);
        JS_FreeCString(context, str);
        return true;
      }
      {
        double converted = 0.0;
        if (!readQuickJSNumber(jsValue, &converted)) {
          return false;
        }
        *reinterpret_cast<uint16_t*>(result) = static_cast<uint16_t>(converted);
        return true;
      }

    case mdTypeSLong:
    case mdTypeSInt64:
      return readQuickJSInt64(context, jsValue,
                              reinterpret_cast<int64_t*>(result));

    case mdTypeULong:
    case mdTypeUInt64:
      return readQuickJSUInt64(context, jsValue,
                               reinterpret_cast<uint64_t*>(result));

    case mdTypeSelector: {
      SEL* selector = reinterpret_cast<SEL*>(result);
      if (JS_IsNull(jsValue) || JS_IsUndefined(jsValue)) {
        *selector = nullptr;
        return true;
      }
      if (!JS_IsString(jsValue)) {
        return false;
      }
      size_t length = 0;
      const char* selectorName = JS_ToCStringLen(context, &length, jsValue);
      if (selectorName == nullptr) {
        return false;
      }
      *selector = cachedSelectorForName(selectorName, length);
      JS_FreeCString(context, selectorName);
      return true;
    }

    case mdTypeClass:
    case mdTypeAnyObject:
    case mdTypeProtocolObject:
    case mdTypeClassObject:
    case mdTypeInstanceObject:
    case mdTypeNSStringObject:
    case mdTypeNSMutableStringObject:
      if (tryFastConvertQuickJSObjectArgument(env, kind, jsValue, result)) {
        return true;
      }
      return TryFastConvertNapiArgument(env, kind, value, result);

    default:
      return false;
  }
}

bool TryFastConvertQuickJSReturnValue(napi_env env, MDTypeKind kind,
                                      const void* value, napi_value* result) {
  if (env == nullptr || result == nullptr) {
    return false;
  }

  JSContext* context = qjs_get_context(env);
  if (context == nullptr) {
    return false;
  }

  JSValue jsValue = JS_UNDEFINED;
  switch (kind) {
    case mdTypeVoid:
      jsValue = JS_NULL;
      break;

    case mdTypeBool:
      if (value == nullptr) {
        return false;
      }
      jsValue = JS_NewBool(context, *reinterpret_cast<const uint8_t*>(value) != 0);
      break;

    case mdTypeChar: {
      if (value == nullptr) {
        return false;
      }
      const int8_t raw = *reinterpret_cast<const int8_t*>(value);
      jsValue = raw == 0 || raw == 1 ? JS_NewBool(context, raw == 1)
                                     : JS_NewInt32(context, raw);
      break;
    }

    case mdTypeUChar:
    case mdTypeUInt8: {
      if (value == nullptr) {
        return false;
      }
      const uint8_t raw = *reinterpret_cast<const uint8_t*>(value);
      jsValue = raw == 0 || raw == 1 ? JS_NewBool(context, raw == 1)
                                     : JS_NewUint32(context, raw);
      break;
    }

    case mdTypeSShort:
      if (value == nullptr) {
        return false;
      }
      jsValue = JS_NewInt32(context, *reinterpret_cast<const int16_t*>(value));
      break;

    case mdTypeUShort: {
      if (value == nullptr) {
        return false;
      }
      const uint16_t raw = *reinterpret_cast<const uint16_t*>(value);
      if (raw >= 32 && raw <= 126) {
        const char buffer[1] = {static_cast<char>(raw)};
        jsValue = JS_NewStringLen(context, buffer, 1);
      } else {
        jsValue = JS_NewUint32(context, raw);
      }
      break;
    }

    case mdTypeSInt:
      if (value == nullptr) {
        return false;
      }
      jsValue = JS_NewInt32(context, *reinterpret_cast<const int32_t*>(value));
      break;

    case mdTypeUInt:
      if (value == nullptr) {
        return false;
      }
      jsValue = JS_NewUint32(context, *reinterpret_cast<const uint32_t*>(value));
      break;

    case mdTypeSLong:
    case mdTypeSInt64: {
      if (value == nullptr) {
        return false;
      }
      const int64_t raw = *reinterpret_cast<const int64_t*>(value);
      constexpr int64_t kMaxSafeInteger = 9007199254740991LL;
      jsValue = raw > kMaxSafeInteger || raw < -kMaxSafeInteger
                    ? JS_NewBigInt64(context, raw)
                    : JS_NewInt64(context, raw);
      break;
    }

    case mdTypeULong:
    case mdTypeUInt64: {
      if (value == nullptr) {
        return false;
      }
      const uint64_t raw = *reinterpret_cast<const uint64_t*>(value);
      constexpr uint64_t kMaxSafeInteger = 9007199254740991ULL;
      jsValue = raw > kMaxSafeInteger
                    ? JS_NewBigUint64(context, raw)
                    : JS_NewInt64(context, static_cast<int64_t>(raw));
      break;
    }

    case mdTypeFloat:
      if (value == nullptr) {
        return false;
      }
      jsValue = JS_NewFloat64(context, *reinterpret_cast<const float*>(value));
      break;

    case mdTypeDouble:
      if (value == nullptr) {
        return false;
      }
      jsValue = JS_NewFloat64(context, *reinterpret_cast<const double*>(value));
      break;

    default:
      return false;
  }

  if (JS_IsException(jsValue)) {
    return false;
  }

  return qjs_create_scoped_value(env, jsValue, result) == napi_ok;
}

}  // namespace nativescript

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

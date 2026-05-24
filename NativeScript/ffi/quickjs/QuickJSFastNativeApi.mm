#include "QuickJSFastNativeApi.h"

#ifdef TARGET_ENGINE_QUICKJS

#import <Foundation/Foundation.h>

#include <objc/message.h>
#include <quickjs.h>
#include <sys/queue.h>

#include <cassert>
#include <cmath>
#include <cstring>
#include <string>
#include <unordered_map>
#include <vector>

#include "ffi/napi/CFunction.h"
#include "ffi/napi/ClassBuilder.h"
#include "ffi/napi/ClassMember.h"
#include "EngineDirectCall.h"
#include "ffi/napi/Interop.h"
#include "MetadataReader.h"
#include "ffi/napi/NativeScriptException.h"
#include "ffi/napi/ObjCBridge.h"
#include "SignatureDispatch.h"
#include "ffi/napi/TypeConv.h"
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

enum class QuickJSEngineDirectResult {
  NotHandled,
  Handled,
  Failed,
};

JSValue throwQuickJSPendingException(JSContext* context, const char* message) {
  if (context == nullptr) {
    return JS_EXCEPTION;
  }
  if (JS_HasException(context)) {
    return JS_Throw(context, JS_GetException(context));
  }
  return JS_ThrowInternalError(context, "%s", message);
}

inline bool needsRoundTripCacheFrame(nativescript::Cif* cif) {
  return cif != nullptr && cif->generatedDispatchHasRoundTripCacheArgument;
}

class QuickJSFastRoundTripCacheFrameGuard {
 public:
  QuickJSFastRoundTripCacheFrameGuard(
      napi_env env, nativescript::ObjCBridgeState* bridgeState,
      nativescript::Cif* cif)
      : env_(env), bridgeState_(bridgeState),
        active_(needsRoundTripCacheFrame(cif) && bridgeState != nullptr) {
    if (active_) {
      bridgeState_->beginRoundTripCacheFrame(env_);
    }
  }

  ~QuickJSFastRoundTripCacheFrameGuard() {
    if (active_) {
      bridgeState_->endRoundTripCacheFrame(env_);
    }
  }

 private:
  napi_env env_ = nullptr;
  nativescript::ObjCBridgeState* bridgeState_ = nullptr;
  bool active_ = false;
};

inline JSValue ToJSValue(napi_value value) {
  return value != nullptr ? *reinterpret_cast<JSValue*>(value) : JS_UNDEFINED;
}

bool tryFastUnwrapQuickJSNativeObject(napi_env env, JSValue jsValue,
                                      void** result) {
  if (env == nullptr || result == nullptr || !JS_IsObject(jsValue)) {
    return false;
  }

  *result = nullptr;
  auto* directInfo = static_cast<QuickJSFastExternalInfo*>(
      JS_GetOpaque(jsValue, env->runtime->napiObjectClassId));
  if (directInfo != nullptr && directInfo->data != nullptr) {
    *result = directInfo->data;
    return true;
  }

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

class QuickJSFastReturnStorage {
 public:
  explicit QuickJSFastReturnStorage(nativescript::Cif* cif) {
    size_t size = 0;
    if (cif != nullptr) {
      size = cif->rvalueLength;
      if (size == 0 && cif->cif.rtype != nullptr) {
        size = cif->cif.rtype->size;
      }
    }
    if (size == 0) {
      size = sizeof(void*);
    }

    if (size <= kInlineSize) {
      data_ = inlineBuffer_;
      memset(data_, 0, size);
      return;
    }

    data_ = malloc(size);
    if (data_ != nullptr) {
      memset(data_, 0, size);
    }
  }

  ~QuickJSFastReturnStorage() {
    if (data_ != nullptr && data_ != inlineBuffer_) {
      free(data_);
    }
  }

  bool valid() const { return data_ != nullptr; }
  void* get() const { return data_; }

 private:
  static constexpr size_t kInlineSize = 32;
  alignas(max_align_t) unsigned char inlineBuffer_[kInlineSize];
  void* data_ = nullptr;
};

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

bool makeQuickJSRawReturnValue(JSContext* context, MDTypeKind kind,
                               const void* value, JSValue* result) {
  if (context == nullptr || result == nullptr) {
    return false;
  }

  switch (kind) {
    case mdTypeVoid:
      *result = JS_UNDEFINED;
      return true;

    case mdTypeBool:
      if (value == nullptr) return false;
      *result = JS_NewBool(context, *reinterpret_cast<const uint8_t*>(value) != 0);
      return true;

    case mdTypeChar: {
      if (value == nullptr) return false;
      const int8_t raw = *reinterpret_cast<const int8_t*>(value);
      *result = raw == 0 || raw == 1 ? JS_NewBool(context, raw == 1)
                                     : JS_NewInt32(context, raw);
      return true;
    }

    case mdTypeUChar:
    case mdTypeUInt8: {
      if (value == nullptr) return false;
      const uint8_t raw = *reinterpret_cast<const uint8_t*>(value);
      *result = raw == 0 || raw == 1 ? JS_NewBool(context, raw == 1)
                                     : JS_NewUint32(context, raw);
      return true;
    }

    case mdTypeSShort:
      if (value == nullptr) return false;
      *result = JS_NewInt32(context, *reinterpret_cast<const int16_t*>(value));
      return true;

    case mdTypeUShort: {
      if (value == nullptr) return false;
      const uint16_t raw = *reinterpret_cast<const uint16_t*>(value);
      if (raw >= 32 && raw <= 126) {
        const char buffer[1] = {static_cast<char>(raw)};
        *result = JS_NewStringLen(context, buffer, 1);
      } else {
        *result = JS_NewUint32(context, raw);
      }
      return !JS_IsException(*result);
    }

    case mdTypeSInt:
      if (value == nullptr) return false;
      *result = JS_NewInt32(context, *reinterpret_cast<const int32_t*>(value));
      return true;

    case mdTypeUInt:
      if (value == nullptr) return false;
      *result = JS_NewUint32(context, *reinterpret_cast<const uint32_t*>(value));
      return true;

    case mdTypeSLong:
    case mdTypeSInt64: {
      if (value == nullptr) return false;
      const int64_t raw = *reinterpret_cast<const int64_t*>(value);
      constexpr int64_t kMaxSafeInteger = 9007199254740991LL;
      *result = raw > kMaxSafeInteger || raw < -kMaxSafeInteger
                    ? JS_NewBigInt64(context, raw)
                    : JS_NewInt64(context, raw);
      return !JS_IsException(*result);
    }

    case mdTypeULong:
    case mdTypeUInt64: {
      if (value == nullptr) return false;
      const uint64_t raw = *reinterpret_cast<const uint64_t*>(value);
      constexpr uint64_t kMaxSafeInteger = 9007199254740991ULL;
      *result = raw > kMaxSafeInteger
                    ? JS_NewBigUint64(context, raw)
                    : JS_NewInt64(context, static_cast<int64_t>(raw));
      return !JS_IsException(*result);
    }

    case mdTypeFloat:
      if (value == nullptr) return false;
      *result = JS_NewFloat64(context, *reinterpret_cast<const float*>(value));
      return !JS_IsException(*result);

    case mdTypeDouble:
      if (value == nullptr) return false;
      *result = JS_NewFloat64(context, *reinterpret_cast<const double*>(value));
      return !JS_IsException(*result);

    default:
      return false;
  }
}

bool makeQuickJSNSStringValue(JSContext* context, NSString* string,
                              JSValue* result) {
  if (context == nullptr || result == nullptr) {
    return false;
  }

  if (string == nil) {
    *result = JS_NULL;
    return true;
  }

  NSUInteger length = [string length];
  std::vector<char16_t> chars(length > 0 ? length : 1);
  if (length > 0) {
    [string getCharacters:reinterpret_cast<unichar*>(chars.data())
                    range:NSMakeRange(0, length)];
  }

  *result = JS_NewString16(context,
                           reinterpret_cast<const uint16_t*>(chars.data()),
                           static_cast<int>(length));
  return !JS_IsException(*result);
}

bool makeQuickJSBoxedObjectValue(JSContext* context, id obj, JSValue* result) {
  if (context == nullptr || result == nullptr) {
    return false;
  }

  if (obj == nil || obj == [NSNull null]) {
    *result = JS_NULL;
    return true;
  }

  if ([obj isKindOfClass:[NSString class]]) {
    return makeQuickJSNSStringValue(context, (NSString*)obj, result);
  }

  if ([obj isKindOfClass:[NSNumber class]] &&
      ![obj isKindOfClass:[NSDecimalNumber class]]) {
    if (CFGetTypeID((CFTypeRef)obj) == CFBooleanGetTypeID()) {
      *result = JS_NewBool(context, [obj boolValue]);
    } else {
      *result = JS_NewFloat64(context, [obj doubleValue]);
    }
    return !JS_IsException(*result);
  }

  return false;
}

bool duplicateQuickJSNapiResult(JSContext* context, napi_value value,
                                JSValue* result) {
  if (context == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  *result = JS_DupValue(context, ToJSValue(value));
  return true;
}

bool canMakeQuickJSRawReturnValue(MDTypeKind kind) {
  switch (kind) {
    case mdTypeVoid:
    case mdTypeBool:
    case mdTypeChar:
    case mdTypeUChar:
    case mdTypeUInt8:
    case mdTypeSShort:
    case mdTypeUShort:
    case mdTypeSInt:
    case mdTypeUInt:
    case mdTypeSLong:
    case mdTypeULong:
    case mdTypeSInt64:
    case mdTypeUInt64:
    case mdTypeFloat:
    case mdTypeDouble:
      return true;
    default:
      return false;
  }
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

id resolveQuickJSSelf(napi_env env, napi_value jsThis,
                      nativescript::ObjCClassMember* member) {
  id self = nil;
  auto* state = nativescript::ObjCBridgeState::InstanceData(env);

  if (jsThis != nullptr) {
    void* wrapped = nullptr;
    if (tryFastUnwrapQuickJSNativeObject(env, ToJSValue(jsThis), &wrapped) &&
        wrapped != nullptr) {
      return static_cast<id>(wrapped);
    }
  }

  if (state != nullptr && jsThis != nullptr) {
    state->tryResolveBridgedTypeConstructor(env, jsThis, &self);
  }

  if (self == nil && jsThis != nullptr) {
    napi_unwrap(env, jsThis, reinterpret_cast<void**>(&self));
  }

  if (self != nil) {
    return self;
  }

  if (member != nullptr && member->cls != nullptr &&
      member->cls->nativeClass != nil) {
    if (member->classMethod) {
      return static_cast<id>(member->cls->nativeClass);
    }

    napi_valuetype jsType = napi_undefined;
    if (jsThis != nullptr && napi_typeof(env, jsThis, &jsType) == napi_ok &&
        jsType == napi_function) {
      return static_cast<id>(member->cls->nativeClass);
    }
  }

  return nil;
}

nativescript::Cif* quickJSMemberCif(
    napi_env env, nativescript::ObjCClassMember* member,
    nativescript::EngineDirectMemberKind kind,
    nativescript::MethodDescriptor** descriptorOut) {
  if (member == nullptr || descriptorOut == nullptr) {
    return nullptr;
  }

  switch (kind) {
    case nativescript::EngineDirectMemberKind::Method:
      if (!member->overloads.empty()) {
        return nullptr;
      }
      *descriptorOut = &member->methodOrGetter;
      if (member->cif == nullptr) {
        member->cif = member->bridgeState->getMethodCif(
            env, member->methodOrGetter.signatureOffset);
      }
      return member->cif;

    case nativescript::EngineDirectMemberKind::Getter:
      *descriptorOut = &member->methodOrGetter;
      if (member->cif == nullptr) {
        member->cif = member->bridgeState->getMethodCif(
            env, member->methodOrGetter.signatureOffset);
      }
      return member->cif;

    case nativescript::EngineDirectMemberKind::Setter:
      *descriptorOut = &member->setter;
      if (member->setterCif == nullptr) {
        member->setterCif = member->bridgeState->getMethodCif(
            env, member->setter.signatureOffset);
      }
      return member->setterCif;
  }
}

bool receiverClassRequiresQuickJSSuperCall(Class receiverClass) {
  static thread_local Class lastReceiverClass = nil;
  static thread_local bool lastRequiresSuperCall = false;
  if (receiverClass == lastReceiverClass) {
    return lastRequiresSuperCall;
  }

  static thread_local std::unordered_map<Class, bool> superCallCache;
  auto cached = superCallCache.find(receiverClass);
  if (cached != superCallCache.end()) {
    lastReceiverClass = receiverClass;
    lastRequiresSuperCall = cached->second;
    return cached->second;
  }

  const bool requiresSuperCall =
      receiverClass != nil &&
      class_conformsToProtocol(receiverClass,
                               @protocol(ObjCBridgeClassBuilderProtocol));
  superCallCache.emplace(receiverClass, requiresSuperCall);
  lastReceiverClass = receiverClass;
  lastRequiresSuperCall = requiresSuperCall;
  return requiresSuperCall;
}

inline bool selectorEndsWith(SEL selector, const char* suffix) {
  if (selector == nullptr || suffix == nullptr) {
    return false;
  }
  const char* selectorName = sel_getName(selector);
  if (selectorName == nullptr) {
    return false;
  }

  const size_t selectorLength = std::strlen(selectorName);
  const size_t suffixLength = std::strlen(suffix);
  return selectorLength >= suffixLength &&
         std::strcmp(selectorName + selectorLength - suffixLength, suffix) == 0;
}

inline bool computeQuickJSNSErrorOutSignature(SEL selector,
                                              nativescript::Cif* cif) {
  if (cif == nullptr || cif->argc == 0 || cif->argTypes.empty() ||
      !selectorEndsWith(selector, "error:")) {
    return false;
  }
  auto lastArgType = cif->argTypes[cif->argc - 1];
  return lastArgType != nullptr && lastArgType->type == &ffi_type_pointer;
}

inline bool isQuickJSNSErrorOutSignature(
    nativescript::MethodDescriptor* descriptor, nativescript::Cif* cif) {
  if (descriptor == nullptr) {
    return computeQuickJSNSErrorOutSignature(nullptr, cif);
  }

  if (!descriptor->nserrorOutSignatureCached) {
    descriptor->nserrorOutSignature =
        computeQuickJSNSErrorOutSignature(descriptor->selector, cif);
    descriptor->nserrorOutSignatureCached = true;
  }
  return descriptor->nserrorOutSignature;
}

inline bool isQuickJSBlockFallbackSelector(SEL selector) {
  return selector == @selector(methodWithSimpleBlock:) ||
         selector == @selector(methodRetainingBlock:) ||
         selector == @selector(methodWithBlock:) ||
         selector == @selector(methodWithComplexBlock:);
}

nativescript::ObjCEngineDirectInvoker ensureQuickJSObjCEngineDirectInvoker(
    nativescript::Cif* cif, nativescript::MethodDescriptor* descriptor,
    uint8_t dispatchFlags) {
  if (cif == nullptr || descriptor == nullptr || cif->signatureHash == 0) {
    return nullptr;
  }

  if (!descriptor->dispatchLookupCached ||
      descriptor->dispatchLookupSignatureHash != cif->signatureHash ||
      descriptor->dispatchLookupFlags != dispatchFlags) {
    descriptor->dispatchLookupSignatureHash = cif->signatureHash;
    descriptor->dispatchLookupFlags = dispatchFlags;
    descriptor->dispatchId = nativescript::composeSignatureDispatchId(
        cif->signatureHash, nativescript::SignatureCallKind::ObjCMethod,
        dispatchFlags);
    descriptor->preparedInvoker = reinterpret_cast<void*>(
        nativescript::lookupObjCPreparedInvoker(descriptor->dispatchId));
    descriptor->napiInvoker = reinterpret_cast<void*>(
        nativescript::lookupObjCNapiInvoker(descriptor->dispatchId));
    descriptor->engineDirectInvoker = reinterpret_cast<void*>(
        nativescript::lookupObjCEngineDirectInvoker(descriptor->dispatchId));
    descriptor->dispatchLookupCached = true;
  }

  return reinterpret_cast<nativescript::ObjCEngineDirectInvoker>(
      descriptor->engineDirectInvoker);
}

nativescript::CFunctionEngineDirectInvoker
ensureQuickJSCFunctionEngineDirectInvoker(nativescript::CFunction* function,
                                          nativescript::Cif* cif) {
  if (function == nullptr || cif == nullptr || cif->signatureHash == 0) {
    if (function != nullptr) {
      function->dispatchLookupCached = true;
      function->dispatchLookupSignatureHash = 0;
      function->dispatchId = 0;
      function->preparedInvoker = nullptr;
      function->napiInvoker = nullptr;
      function->engineDirectInvoker = nullptr;
      function->v8Invoker = nullptr;
    }
    return nullptr;
  }

  if (!function->dispatchLookupCached ||
      function->dispatchLookupSignatureHash != cif->signatureHash) {
    function->dispatchLookupSignatureHash = cif->signatureHash;
    function->dispatchId = nativescript::composeSignatureDispatchId(
        cif->signatureHash, nativescript::SignatureCallKind::CFunction,
        function->dispatchFlags);
    function->preparedInvoker = reinterpret_cast<void*>(
        nativescript::lookupCFunctionPreparedInvoker(function->dispatchId));
    function->napiInvoker = reinterpret_cast<void*>(
        nativescript::lookupCFunctionNapiInvoker(function->dispatchId));
    function->engineDirectInvoker = reinterpret_cast<void*>(
        nativescript::lookupCFunctionEngineDirectInvoker(function->dispatchId));
    function->dispatchLookupCached = true;
  }

  return reinterpret_cast<nativescript::CFunctionEngineDirectInvoker>(
      function->engineDirectInvoker);
}

bool makeQuickJSObjCReturnValue(
    JSContext* context, napi_env env, nativescript::ObjCClassMember* member,
    nativescript::MethodDescriptor* descriptor, nativescript::Cif* cif,
    id self, bool receiverIsClass, napi_value jsThis, void* rvalue,
    bool propertyAccess, JSValue* result) {
  if (context == nullptr || env == nullptr || member == nullptr ||
      descriptor == nullptr || cif == nullptr || cif->returnType == nullptr ||
      result == nullptr) {
    return false;
  }

  if (makeQuickJSRawReturnValue(context, cif->returnType->kind, rvalue,
                                result)) {
    return true;
  }

  const char* selectorName = sel_getName(descriptor->selector);
  if (selectorName != nullptr && strcmp(selectorName, "class") == 0) {
    QuickJSFastStackHandleScope scope(env);
    napi_value converted = nullptr;
    if (!propertyAccess && !receiverIsClass) {
      converted = jsThis;
      napi_get_named_property(env, jsThis, "constructor", &converted);
    } else {
      id classObject = receiverIsClass ? self : (id)object_getClass(self);
      converted =
          member->bridgeState->getObject(env, classObject,
                                         nativescript::kUnownedObject, 0, nullptr);
    }
    bool ok = duplicateQuickJSNapiResult(context, converted, result);
    scope.close();
    return ok;
  }

  if (cif->returnType->kind == mdTypeInstanceObject) {
    QuickJSFastStackHandleScope scope(env);
    napi_value constructor = jsThis;
    if (!receiverIsClass) {
      napi_get_named_property(env, jsThis, "constructor", &constructor);
    }
    id obj = *reinterpret_cast<id*>(rvalue);
    napi_value converted =
        obj != nil ? member->bridgeState->findCachedObjectWrapper(env, obj)
                   : nullptr;
    if (converted == nullptr) {
      converted = member->bridgeState->getObject(
          env, obj, constructor,
          member->returnOwned ? nativescript::kOwnedObject
                              : nativescript::kUnownedObject);
    }
    bool ok = false;
    if (converted != nullptr) {
      ok = duplicateQuickJSNapiResult(context, converted, result);
    } else {
      *result = JS_NULL;
      ok = true;
    }
    scope.close();
    return ok;
  }

  if (cif->returnType->kind == mdTypeNSStringObject) {
    return makeQuickJSNSStringValue(
        context, *reinterpret_cast<NSString* const*>(rvalue), result);
  }

  if (cif->returnType->kind == mdTypeAnyObject) {
    id obj = *reinterpret_cast<id*>(rvalue);
    if (receiverIsClass && obj != nil) {
      Class receiverClass = static_cast<Class>(self);
      if ((receiverClass == [NSString class] ||
           receiverClass == [NSMutableString class]) &&
          selectorName != nullptr &&
          (strcmp(selectorName, "string") == 0 ||
           strcmp(selectorName, "stringWithString:") == 0 ||
           strcmp(selectorName, "stringWithCapacity:") == 0)) {
        QuickJSFastStackHandleScope scope(env);
        napi_value converted =
            member->bridgeState->getObject(env, obj, jsThis,
                                           nativescript::kUnownedObject);
        bool ok = duplicateQuickJSNapiResult(context, converted, result);
        scope.close();
        return ok;
      }
    }

    if (obj != nil && ![obj isKindOfClass:[NSString class]] &&
        ![obj isKindOfClass:[NSNumber class]] &&
        ![obj isKindOfClass:[NSNull class]]) {
      QuickJSFastStackHandleScope scope(env);
      napi_value cached = member->bridgeState->findCachedObjectWrapper(env, obj);
      if (cached != nullptr) {
        bool ok = duplicateQuickJSNapiResult(context, cached, result);
        scope.close();
        return ok;
      }
      scope.close();
    }

    if (makeQuickJSBoxedObjectValue(context, obj, result)) {
      return true;
    }
  }

  QuickJSFastStackHandleScope scope(env);
  napi_value fastResult = nullptr;
  if (nativescript::TryFastConvertEngineReturnValue(
          env, cif->returnType->kind, rvalue, &fastResult)) {
    bool ok = duplicateQuickJSNapiResult(context, fastResult, result);
    scope.close();
    return ok;
  }

  napi_value converted = cif->returnType->toJS(
      env, rvalue, member->returnOwned ? nativescript::kReturnOwned : 0);
  bool ok = duplicateQuickJSNapiResult(context, converted, result);
  scope.close();
  return ok;
}

bool makeQuickJSCFunctionReturnValue(JSContext* context, napi_env env,
                                     nativescript::CFunction* function,
                                     nativescript::Cif* cif, void* rvalue,
                                     JSValue* result) {
  if (context == nullptr || env == nullptr || cif == nullptr ||
      cif->returnType == nullptr || result == nullptr) {
    return false;
  }

  if (makeQuickJSRawReturnValue(context, cif->returnType->kind, rvalue,
                                result)) {
    return true;
  }

  if (cif->returnType->kind == mdTypeNSStringObject) {
    return makeQuickJSNSStringValue(
        context, *reinterpret_cast<NSString* const*>(rvalue), result);
  }
  if (cif->returnType->kind == mdTypeAnyObject &&
      makeQuickJSBoxedObjectValue(context, *reinterpret_cast<id const*>(rvalue),
                                  result)) {
    return true;
  }

  QuickJSFastStackHandleScope scope(env);
  napi_value fastResult = nullptr;
  if (nativescript::TryFastConvertEngineReturnValue(
          env, cif->returnType->kind, rvalue, &fastResult)) {
    bool ok = duplicateQuickJSNapiResult(context, fastResult, result);
    scope.close();
    return ok;
  }

  uint32_t toJSFlags = nativescript::kCStringAsReference;
  if (function != nullptr && (function->dispatchFlags & 1) != 0) {
    toJSFlags |= nativescript::kReturnOwned;
  }
  napi_value converted = cif->returnType->toJS(env, rvalue, toJSFlags);
  bool ok = duplicateQuickJSNapiResult(context, converted, result);
  scope.close();
  return ok;
}

QuickJSEngineDirectResult tryCallQuickJSObjCEngineDirect(
    JSContext* context, napi_env env, nativescript::ObjCClassMember* member,
    napi_value jsThis, int argc, const napi_value* argv,
    nativescript::EngineDirectMemberKind kind, JSValue* result) {
  if (context == nullptr || env == nullptr || member == nullptr ||
      member->bridgeState == nullptr || argc < 0 || result == nullptr) {
    return QuickJSEngineDirectResult::NotHandled;
  }

  nativescript::MethodDescriptor* descriptor = nullptr;
  nativescript::Cif* cif = quickJSMemberCif(env, member, kind, &descriptor);
  if (cif == nullptr || cif->isVariadic || cif->returnType == nullptr) {
    return QuickJSEngineDirectResult::NotHandled;
  }

  const bool canUseGeneratedInvoker =
      cif->signatureHash != 0 && static_cast<unsigned int>(argc) == cif->argc;
  auto invoker = canUseGeneratedInvoker
      ? ensureQuickJSObjCEngineDirectInvoker(
            cif, descriptor, descriptor->dispatchFlags)
      : nullptr;

  if (isQuickJSNSErrorOutSignature(descriptor, cif) ||
      isQuickJSBlockFallbackSelector(descriptor->selector)) {
    return QuickJSEngineDirectResult::NotHandled;
  }

  id self = resolveQuickJSSelf(env, jsThis, member);
  if (self == nil) {
    return QuickJSEngineDirectResult::NotHandled;
  }

  const bool receiverIsClass = object_isClass(self);
  Class receiverClass = receiverIsClass ? static_cast<Class>(self) : object_getClass(self);
  if (receiverClassRequiresQuickJSSuperCall(receiverClass)) {
    return QuickJSEngineDirectResult::NotHandled;
  }

  QuickJSFastReturnStorage rvalueStorage(cif);
  if (!rvalueStorage.valid()) {
    return QuickJSEngineDirectResult::NotHandled;
  }

  void* rvalue = rvalueStorage.get();
  QuickJSFastRoundTripCacheFrameGuard roundTripCacheFrame(
      env, member->bridgeState, cif);
  bool didInvoke = false;
  @try {
    if (invoker != nullptr) {
      didInvoke = invoker(env, cif, reinterpret_cast<void*>(objc_msgSend), self,
                          descriptor->selector, argv, rvalue);
    } else {
      didInvoke = nativescript::InvokeObjCMemberEngineDirectDynamic(
          env, cif, self, receiverIsClass, descriptor,
          descriptor->dispatchFlags, static_cast<size_t>(argc), argv, rvalue);
    }
  } @catch (NSException* exception) {
    std::string message = exception.description.UTF8String;
    nativescript::NativeScriptException nativeScriptException(message);
    nativeScriptException.ReThrowToJS(env);
    return QuickJSEngineDirectResult::Failed;
  }

  if (!didInvoke) {
    if (invoker == nullptr && JS_HasException(context)) {
      return QuickJSEngineDirectResult::Failed;
    }
    return QuickJSEngineDirectResult::NotHandled;
  }

  if (!makeQuickJSObjCReturnValue(
          context, env, member, descriptor, cif, self, receiverIsClass,
          jsThis, rvalue, kind != nativescript::EngineDirectMemberKind::Method,
          result)) {
    return QuickJSEngineDirectResult::Failed;
  }

  return QuickJSEngineDirectResult::Handled;
}

QuickJSEngineDirectResult tryCallQuickJSCFunctionEngineDirect(
    JSContext* context, napi_env env, MDSectionOffset offset, int argc,
    const napi_value* argv, JSValue* result) {
  if (context == nullptr || env == nullptr || argc < 0 || result == nullptr) {
    return QuickJSEngineDirectResult::NotHandled;
  }

  auto* bridgeState = nativescript::ObjCBridgeState::InstanceData(env);
  if (bridgeState == nullptr || isCompatCFunction(env, reinterpret_cast<void*>(
                                           static_cast<uintptr_t>(offset)))) {
    return QuickJSEngineDirectResult::NotHandled;
  }

  auto* function = bridgeState->getCFunction(env, offset);
  auto* cif = function != nullptr ? function->cif : nullptr;
  if (function == nullptr || cif == nullptr || cif->isVariadic ||
      cif->returnType == nullptr) {
    return QuickJSEngineDirectResult::NotHandled;
  }

  const bool canUseGeneratedInvoker =
      cif->signatureHash != 0 && static_cast<unsigned int>(argc) == cif->argc;
  auto invoker = canUseGeneratedInvoker
      ? ensureQuickJSCFunctionEngineDirectInvoker(function, cif)
      : nullptr;

  bool didInvoke = false;
  QuickJSFastRoundTripCacheFrameGuard roundTripCacheFrame(
      env, bridgeState, cif);
  QuickJSFastReturnStorage rvalueStorage(cif);
  if (!rvalueStorage.valid()) {
    return QuickJSEngineDirectResult::NotHandled;
  }
  void* rvalue = rvalueStorage.get();
  @try {
    if (invoker != nullptr) {
      didInvoke = invoker(env, cif, function->fnptr, argv, rvalue);
    } else {
      didInvoke = nativescript::InvokeCFunctionEngineDirectDynamic(
          env, function, cif, static_cast<size_t>(argc), argv, rvalue);
    }
  } @catch (NSException* exception) {
    std::string message = exception.description.UTF8String;
    nativescript::NativeScriptException nativeScriptException(message);
    nativeScriptException.ReThrowToJS(env);
    return QuickJSEngineDirectResult::Failed;
  }

  if (!didInvoke) {
    if (invoker == nullptr && JS_HasException(context)) {
      return QuickJSEngineDirectResult::Failed;
    }
    return QuickJSEngineDirectResult::NotHandled;
  }

  if (!makeQuickJSCFunctionReturnValue(context, env, function, cif, rvalue,
                                       result)) {
    return QuickJSEngineDirectResult::Failed;
  }

  return QuickJSEngineDirectResult::Handled;
}

JSValue callFastNative(JSContext* context, JSValueConst thisValue, int argc,
                       JSValueConst* argv, int magic, JSValue* funcData) {
  napi_env env = static_cast<napi_env>(JS_GetContextOpaque(context));
  if (env == nullptr) {
    return JS_UNDEFINED;
  }

  auto* externalInfo = static_cast<QuickJSFastExternalInfo*>(
      JS_GetOpaque(funcData[0], env->runtime->externalClassId));
  void* data = externalInfo != nullptr ? externalInfo->data : nullptr;
  if (data == nullptr) {
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

  napi_value jsThis = reinterpret_cast<napi_value>(&effectiveThis);
  JSValue directReturn = JS_UNDEFINED;
  QuickJSEngineDirectResult directResult =
      QuickJSEngineDirectResult::NotHandled;
  switch (magic) {
    case kQuickJSFastObjCMethod:
      directResult = tryCallQuickJSObjCEngineDirect(
          context, env, static_cast<nativescript::ObjCClassMember*>(data),
          jsThis, argc, napiArgs,
          nativescript::EngineDirectMemberKind::Method, &directReturn);
      break;
    case kQuickJSFastObjCGetter:
      directResult = tryCallQuickJSObjCEngineDirect(
          context, env, static_cast<nativescript::ObjCClassMember*>(data),
          jsThis, 0, nullptr,
          nativescript::EngineDirectMemberKind::Getter, &directReturn);
      break;
    case kQuickJSFastObjCSetter: {
      JSValue undefined = JS_UNDEFINED;
      napi_value value =
          argc > 0 ? reinterpret_cast<napi_value>(&argv[0])
                   : reinterpret_cast<napi_value>(&undefined);
      directResult = tryCallQuickJSObjCEngineDirect(
          context, env, static_cast<nativescript::ObjCClassMember*>(data),
          jsThis, 1, &value,
          nativescript::EngineDirectMemberKind::Setter, &directReturn);
      break;
    }
    case kQuickJSFastCFunction:
      directResult = tryCallQuickJSCFunctionEngineDirect(
          context, env,
          static_cast<MDSectionOffset>(reinterpret_cast<uintptr_t>(data)),
          argc, napiArgs, &directReturn);
      break;
    default:
      break;
  }

  if (directResult == QuickJSEngineDirectResult::Handled) {
    if (useGlobalValue) {
      JS_FreeValue(context, effectiveThis);
    }
    if (JS_HasException(context)) {
      JS_FreeValue(context, directReturn);
      return JS_Throw(context, JS_GetException(context));
    }
    return directReturn;
  }

  if (directResult == QuickJSEngineDirectResult::Failed) {
    if (useGlobalValue) {
      JS_FreeValue(context, effectiveThis);
    }
    JS_FreeValue(context, directReturn);
    return throwQuickJSPendingException(
        context, "NativeScript fast native call failed.");
  }

  if (JS_HasException(context)) {
    JSValue staleException = JS_GetException(context);
    JS_FreeValue(context, staleException);
  }

  QuickJSFastStackHandleScope scope(env);

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
          env,
          static_cast<MDSectionOffset>(reinterpret_cast<uintptr_t>(data)),
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

JSValue makeFastFunction(napi_env env, int kind, void* data) {
  if (env == nullptr || env->context == nullptr) {
    return JS_EXCEPTION;
  }

  JSContext* context = env->context;
  auto* externalInfo = static_cast<QuickJSFastExternalInfo*>(
      mi_malloc(sizeof(QuickJSFastExternalInfo)));
  if (externalInfo == nullptr) {
    return JS_EXCEPTION;
  }
  externalInfo->data = data;
  externalInfo->finalizeHint = nullptr;
  externalInfo->finalizeCallback = nullptr;

  JSValue dataValue =
      JS_NewObjectClass(context, static_cast<int>(env->runtime->externalClassId));
  if (JS_IsException(dataValue)) {
    mi_free(externalInfo);
    return JS_EXCEPTION;
  }
  if (JS_SetOpaque(dataValue, externalInfo) != 0) {
    mi_free(externalInfo);
    JS_FreeValue(context, dataValue);
    return JS_EXCEPTION;
  }

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

inline bool readQuickJSFiniteNumber(JSValue value, double* result) {
  if (!readQuickJSNumber(value, result)) {
    return false;
  }
  if (std::isnan(*result) || std::isinf(*result)) {
    *result = 0.0;
  }
  return true;
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
    id cachedNative = bridgeState->nativeObjectForBridgeWrapper(wrapped);
    if (cachedNative != nil) {
      return cachedNative;
    }

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
  auto* directInfo = static_cast<QuickJSFastExternalInfo*>(
      JS_GetOpaque(jsValue, env->runtime->napiObjectClassId));
  if (directInfo != nullptr && directInfo->data != nullptr) {
    *result = directInfo->data;
    return true;
  }

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
      nativeObject = normalizeWrappedNativeObject(env, kind, wrapped);
    }
    if (!object_isClass(nativeObject)) {
      return false;
    }
    *reinterpret_cast<Class*>(result) = static_cast<Class>(nativeObject);
    return true;
  }

  *reinterpret_cast<id*>(result) =
      normalizeWrappedNativeObject(env, kind, wrapped);
  return true;
}

}  // namespace

bool TryFastConvertQuickJSBoolArgument(napi_env env, napi_value value,
                                       uint8_t* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  JSValue jsValue = ToJSValue(value);
  if (!JS_IsBool(jsValue)) {
    return false;
  }
  *result = JS_VALUE_GET_BOOL(jsValue) ? static_cast<uint8_t>(1)
                                       : static_cast<uint8_t>(0);
  return true;
}

bool TryFastConvertQuickJSDoubleArgument(napi_env env, napi_value value,
                                         double* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }
  return readQuickJSFiniteNumber(ToJSValue(value), result);
}

bool TryFastConvertQuickJSFloatArgument(napi_env env, napi_value value,
                                        float* result) {
  double converted = 0.0;
  if (!TryFastConvertQuickJSDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<float>(converted);
  return true;
}

bool TryFastConvertQuickJSInt8Argument(napi_env env, napi_value value,
                                       int8_t* result) {
  double converted = 0.0;
  if (!TryFastConvertQuickJSDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<int8_t>(converted);
  return true;
}

bool TryFastConvertQuickJSUInt8Argument(napi_env env, napi_value value,
                                        uint8_t* result) {
  double converted = 0.0;
  if (!TryFastConvertQuickJSDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<uint8_t>(converted);
  return true;
}

bool TryFastConvertQuickJSInt16Argument(napi_env env, napi_value value,
                                        int16_t* result) {
  double converted = 0.0;
  if (!TryFastConvertQuickJSDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<int16_t>(converted);
  return true;
}

bool TryFastConvertQuickJSUInt16Argument(napi_env env, napi_value value,
                                         uint16_t* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  JSValue jsValue = ToJSValue(value);
  if (JS_IsString(jsValue)) {
    size_t length = 0;
    const char* str = JS_ToCStringLen(env->context, &length, jsValue);
    if (str == nullptr) {
      return false;
    }
    if (length != 1) {
      JS_FreeCString(env->context, str);
      napi_throw_type_error(env, nullptr, "Expected a single-character string.");
      return false;
    }
    *result = static_cast<uint8_t>(str[0]);
    JS_FreeCString(env->context, str);
    return true;
  }

  double converted = 0.0;
  if (!readQuickJSFiniteNumber(jsValue, &converted)) {
    return false;
  }
  *result = static_cast<uint16_t>(converted);
  return true;
}

bool TryFastConvertQuickJSInt32Argument(napi_env env, napi_value value,
                                        int32_t* result) {
  double converted = 0.0;
  if (!TryFastConvertQuickJSDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<int32_t>(converted);
  return true;
}

bool TryFastConvertQuickJSUInt32Argument(napi_env env, napi_value value,
                                         uint32_t* result) {
  double converted = 0.0;
  if (!TryFastConvertQuickJSDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<uint32_t>(converted);
  return true;
}

bool TryFastConvertQuickJSInt64Argument(napi_env env, napi_value value,
                                        int64_t* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }
  return readQuickJSInt64(env->context, ToJSValue(value), result);
}

bool TryFastConvertQuickJSUInt64Argument(napi_env env, napi_value value,
                                         uint64_t* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }
  return readQuickJSUInt64(env->context, ToJSValue(value), result);
}

bool TryFastConvertQuickJSSelectorArgument(napi_env env, napi_value value,
                                           SEL* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  JSValue jsValue = ToJSValue(value);
  if (JS_IsNull(jsValue) || JS_IsUndefined(jsValue)) {
    *result = nullptr;
    return true;
  }
  if (!JS_IsString(jsValue)) {
    return false;
  }

  size_t length = 0;
  const char* selectorName = JS_ToCStringLen(env->context, &length, jsValue);
  if (selectorName == nullptr) {
    return false;
  }
  *result = cachedSelectorForName(selectorName, length);
  JS_FreeCString(env->context, selectorName);
  return true;
}

bool TryFastConvertQuickJSObjectArgument(napi_env env, MDTypeKind kind,
                                         napi_value value, void* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }
  if (Pointer::isInstance(env, value) || Reference::isInstance(env, value)) {
    if (TryFastConvertNapiArgument(env, kind, value, result)) {
      return true;
    }
    if (kind == mdTypeClass) {
      void* data = nullptr;
      if (Pointer::isInstance(env, value)) {
        Pointer* pointer = Pointer::unwrap(env, value);
        data = pointer != nullptr ? pointer->data : nullptr;
      } else {
        Reference* reference = Reference::unwrap(env, value);
        data = reference != nullptr ? reference->data : nullptr;
      }
      id nativeObject = static_cast<id>(data);
      if (nativeObject != nil && object_isClass(nativeObject)) {
        *reinterpret_cast<Class*>(result) = static_cast<Class>(nativeObject);
        return true;
      }
    }
    return false;
  }
  if (tryFastConvertQuickJSObjectArgument(env, kind, ToJSValue(value),
                                          result)) {
    if (kind != mdTypeClass) {
      napi_valuetype valueType = napi_undefined;
      if (napi_typeof(env, value, &valueType) == napi_ok &&
          valueType == napi_object) {
        id nativeObject = *reinterpret_cast<id*>(result);
        ObjCBridgeState* bridgeState = ObjCBridgeState::InstanceData(env);
        if (nativeObject != nil && bridgeState != nullptr &&
            bridgeState->hasRoundTripCacheFrame()) {
          bridgeState->cacheRoundTripObject(env, nativeObject, value);
        }
      }
    }
    return true;
  }
  return TryFastConvertNapiArgument(env, kind, value, result);
}

bool TryFastConvertQuickJSArgument(napi_env env, MDTypeKind kind,
                                   napi_value value, void* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  switch (kind) {
    case mdTypeBool:
      return TryFastConvertQuickJSBoolArgument(
          env, value, reinterpret_cast<uint8_t*>(result));
    case mdTypeChar:
      return TryFastConvertQuickJSInt8Argument(
          env, value, reinterpret_cast<int8_t*>(result));
    case mdTypeUChar:
    case mdTypeUInt8:
      return TryFastConvertQuickJSUInt8Argument(
          env, value, reinterpret_cast<uint8_t*>(result));
    case mdTypeSShort:
      return TryFastConvertQuickJSInt16Argument(
          env, value, reinterpret_cast<int16_t*>(result));
    case mdTypeUShort:
      return TryFastConvertQuickJSUInt16Argument(
          env, value, reinterpret_cast<uint16_t*>(result));
    case mdTypeSInt:
      return TryFastConvertQuickJSInt32Argument(
          env, value, reinterpret_cast<int32_t*>(result));
    case mdTypeUInt:
      return TryFastConvertQuickJSUInt32Argument(
          env, value, reinterpret_cast<uint32_t*>(result));
    case mdTypeSLong:
    case mdTypeSInt64:
      return TryFastConvertQuickJSInt64Argument(
          env, value, reinterpret_cast<int64_t*>(result));
    case mdTypeULong:
    case mdTypeUInt64:
      return TryFastConvertQuickJSUInt64Argument(
          env, value, reinterpret_cast<uint64_t*>(result));
    case mdTypeFloat:
      return TryFastConvertQuickJSFloatArgument(
          env, value, reinterpret_cast<float*>(result));
    case mdTypeDouble:
      return TryFastConvertQuickJSDoubleArgument(
          env, value, reinterpret_cast<double*>(result));
    case mdTypeSelector:
      return TryFastConvertQuickJSSelectorArgument(
          env, value, reinterpret_cast<SEL*>(result));
    case mdTypeClass:
    case mdTypeAnyObject:
    case mdTypeProtocolObject:
    case mdTypeClassObject:
    case mdTypeInstanceObject:
    case mdTypeNSStringObject:
    case mdTypeNSMutableStringObject:
      if (TryFastConvertQuickJSObjectArgument(env, kind, value, result)) {
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
      jsValue = JS_UNDEFINED;
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
        makeFastFunction(env, kQuickJSFastObjCMethod, descriptor->data);
    return !JS_IsException(function) &&
           defineFastProperty(env, object, descriptor, function,
                              JS_UNDEFINED, JS_UNDEFINED);
  }

  if (descriptor->method == nativescript::CFunction::jsCall &&
      descriptor->data != nullptr &&
      !isCompatCFunction(env, descriptor->data)) {
    JSValue function =
        makeFastFunction(env, kQuickJSFastCFunction, descriptor->data);
    return !JS_IsException(function) &&
           defineFastProperty(env, object, descriptor, function,
                              JS_UNDEFINED, JS_UNDEFINED);
  }

  if (descriptor->getter == nativescript::ObjCClassMember::jsGetter &&
      descriptor->data != nullptr) {
    JSValue getter =
        makeFastFunction(env, kQuickJSFastObjCGetter, descriptor->data);
    if (JS_IsException(getter)) {
      return false;
    }

    JSValue setter = JS_UNDEFINED;
    if (descriptor->setter == nativescript::ObjCClassMember::jsSetter) {
      setter =
          makeFastFunction(env, kQuickJSFastObjCSetter, descriptor->data);
      if (JS_IsException(setter)) {
        return false;
      }
    } else if (descriptor->setter ==
               nativescript::ObjCClassMember::jsReadOnlySetter) {
      setter = makeFastFunction(env, kQuickJSFastObjCReadOnlySetter,
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

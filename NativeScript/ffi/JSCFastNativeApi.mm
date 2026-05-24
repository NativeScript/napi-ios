#include "JSCFastNativeApi.h"

#ifdef TARGET_ENGINE_JSC

#import <Foundation/Foundation.h>

#include <objc/message.h>
#include <cmath>
#include <cstdlib>
#include <cstring>
#include <string>
#include <unordered_map>
#include <vector>

#include "CFunction.h"
#include "ClassBuilder.h"
#include "ClassMember.h"
#include "EngineDirectCall.h"
#include "Interop.h"
#include "MetadataReader.h"
#include "NativeScriptException.h"
#include "Object.h"
#include "ObjCBridge.h"
#include "SignatureDispatch.h"
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

enum class JSCEngineDirectResult {
  NotHandled,
  Handled,
  Failed,
};

inline bool needsRoundTripCacheFrame(Cif* cif) {
  return cif != nullptr && cif->generatedDispatchHasRoundTripCacheArgument;
}

class JSCFastRoundTripCacheFrameGuard {
 public:
  JSCFastRoundTripCacheFrameGuard(napi_env env, ObjCBridgeState* bridgeState,
                                  Cif* cif)
      : env_(env), bridgeState_(bridgeState),
        active_(needsRoundTripCacheFrame(cif) && bridgeState != nullptr) {
    if (active_) {
      bridgeState_->beginRoundTripCacheFrame(env_);
    }
  }

  ~JSCFastRoundTripCacheFrameGuard() {
    if (active_) {
      bridgeState_->endRoundTripCacheFrame(env_);
    }
  }

 private:
  napi_env env_ = nullptr;
  ObjCBridgeState* bridgeState_ = nullptr;
  bool active_ = false;
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

class JSCFastReturnStorage {
 public:
  explicit JSCFastReturnStorage(Cif* cif) {
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
      std::memset(data_, 0, size);
      return;
    }

    data_ = std::malloc(size);
    if (data_ != nullptr) {
      std::memset(data_, 0, size);
    }
  }

  ~JSCFastReturnStorage() {
    if (data_ != nullptr && data_ != inlineBuffer_) {
      std::free(data_);
    }
  }

  bool valid() const { return data_ != nullptr; }
  void* get() const { return data_; }

 private:
  static constexpr size_t kInlineSize = 32;
  alignas(max_align_t) unsigned char inlineBuffer_[kInlineSize];
  void* data_ = nullptr;
};

bool canMakeJSCRawReturnValue(MDTypeKind kind) {
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

bool makeJSCRawReturnValue(napi_env env, MDTypeKind kind, const void* value,
                           JSValueRef* result) {
  if (env == nullptr || result == nullptr) {
    return false;
  }

  JSContextRef ctx = env->context;
  switch (kind) {
    case mdTypeVoid:
      *result = JSValueMakeUndefined(ctx);
      return true;

    case mdTypeBool:
      if (value == nullptr) return false;
      *result = JSValueMakeBoolean(
          ctx, *reinterpret_cast<const uint8_t*>(value) != 0);
      return true;

    case mdTypeChar: {
      if (value == nullptr) return false;
      const int8_t raw = *reinterpret_cast<const int8_t*>(value);
      *result = raw == 0 || raw == 1 ? JSValueMakeBoolean(ctx, raw == 1)
                                     : JSValueMakeNumber(ctx, raw);
      return true;
    }

    case mdTypeUChar:
    case mdTypeUInt8: {
      if (value == nullptr) return false;
      const uint8_t raw = *reinterpret_cast<const uint8_t*>(value);
      *result = raw == 0 || raw == 1 ? JSValueMakeBoolean(ctx, raw == 1)
                                     : JSValueMakeNumber(ctx, raw);
      return true;
    }

    case mdTypeSShort:
      if (value == nullptr) return false;
      *result = JSValueMakeNumber(ctx, *reinterpret_cast<const int16_t*>(value));
      return true;

    case mdTypeUShort: {
      if (value == nullptr) return false;
      const uint16_t raw = *reinterpret_cast<const uint16_t*>(value);
      if (raw >= 32 && raw <= 126) {
        const char buffer[2] = {static_cast<char>(raw), '\0'};
        *result = JSValueMakeString(ctx, ScopedJSString(buffer));
      } else {
        *result = JSValueMakeNumber(ctx, raw);
      }
      return true;
    }

    case mdTypeSInt:
      if (value == nullptr) return false;
      *result = JSValueMakeNumber(ctx, *reinterpret_cast<const int32_t*>(value));
      return true;

    case mdTypeUInt:
      if (value == nullptr) return false;
      *result = JSValueMakeNumber(ctx, *reinterpret_cast<const uint32_t*>(value));
      return true;

    case mdTypeSLong:
    case mdTypeSInt64: {
      if (value == nullptr) return false;
      const int64_t raw = *reinterpret_cast<const int64_t*>(value);
      constexpr int64_t kMaxSafeInteger = 9007199254740991LL;
      if (raw > kMaxSafeInteger || raw < -kMaxSafeInteger) {
        napi_value bigint = nullptr;
        if (napi_create_bigint_int64(env, raw, &bigint) == napi_ok) {
          *result = ToJSValue(bigint);
          return true;
        }
      }
      *result = JSValueMakeNumber(ctx, static_cast<double>(raw));
      return true;
    }

    case mdTypeULong:
    case mdTypeUInt64: {
      if (value == nullptr) return false;
      const uint64_t raw = *reinterpret_cast<const uint64_t*>(value);
      constexpr uint64_t kMaxSafeInteger = 9007199254740991ULL;
      if (raw > kMaxSafeInteger) {
        napi_value bigint = nullptr;
        if (napi_create_bigint_uint64(env, raw, &bigint) == napi_ok) {
          *result = ToJSValue(bigint);
          return true;
        }
      }
      *result = JSValueMakeNumber(ctx, static_cast<double>(raw));
      return true;
    }

    case mdTypeFloat:
      if (value == nullptr) return false;
      *result = JSValueMakeNumber(ctx, *reinterpret_cast<const float*>(value));
      return true;

    case mdTypeDouble:
      if (value == nullptr) return false;
      *result = JSValueMakeNumber(ctx, *reinterpret_cast<const double*>(value));
      return true;

    default:
      return false;
  }
}

bool makeJSCNSStringValue(napi_env env, NSString* string, JSValueRef* result) {
  if (env == nullptr || result == nullptr) {
    return false;
  }

  if (string == nil) {
    *result = JSValueMakeNull(env->context);
    return true;
  }

  NSUInteger length = [string length];
  std::vector<char16_t> chars(length > 0 ? length : 1);
  if (length > 0) {
    [string getCharacters:reinterpret_cast<unichar*>(chars.data())
                    range:NSMakeRange(0, length)];
  }

  JSStringRef jsString = JSStringCreateWithCharacters(
      reinterpret_cast<const JSChar*>(chars.data()), length);
  if (jsString == nullptr) {
    return false;
  }
  *result = JSValueMakeString(env->context, jsString);
  JSStringRelease(jsString);
  return true;
}

bool makeJSCBoxedObjectValue(napi_env env, id obj, JSValueRef* result) {
  if (env == nullptr || result == nullptr) {
    return false;
  }

  if (obj == nil || obj == [NSNull null]) {
    *result = JSValueMakeNull(env->context);
    return true;
  }

  if ([obj isKindOfClass:[NSString class]]) {
    return makeJSCNSStringValue(env, (NSString*)obj, result);
  }

  if ([obj isKindOfClass:[NSNumber class]] &&
      ![obj isKindOfClass:[NSDecimalNumber class]]) {
    if (CFGetTypeID((CFTypeRef)obj) == CFBooleanGetTypeID()) {
      *result = JSValueMakeBoolean(env->context, [obj boolValue]);
    } else {
      *result = JSValueMakeNumber(env->context, [obj doubleValue]);
    }
    return true;
  }

  return false;
}

id resolveJSCSelf(napi_env env, napi_value jsThis, ObjCClassMember* member) {
  id self = nil;
  ObjCBridgeState* state = ObjCBridgeState::InstanceData(env);

  if (jsThis != nullptr) {
    void* wrapped = nullptr;
    if (nativescript_jsc_try_unwrap_native(env, jsThis, &wrapped) &&
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

Cif* jscMemberCif(napi_env env, ObjCClassMember* member,
                  EngineDirectMemberKind kind,
                  MethodDescriptor** descriptorOut) {
  if (member == nullptr || descriptorOut == nullptr) {
    return nullptr;
  }

  switch (kind) {
    case EngineDirectMemberKind::Method:
      if (!member->overloads.empty()) {
        return nullptr;
      }
      *descriptorOut = &member->methodOrGetter;
      if (member->cif == nullptr) {
        member->cif = member->bridgeState->getMethodCif(
            env, member->methodOrGetter.signatureOffset);
      }
      return member->cif;

    case EngineDirectMemberKind::Getter:
      *descriptorOut = &member->methodOrGetter;
      if (member->cif == nullptr) {
        member->cif = member->bridgeState->getMethodCif(
            env, member->methodOrGetter.signatureOffset);
      }
      return member->cif;

    case EngineDirectMemberKind::Setter:
      *descriptorOut = &member->setter;
      if (member->setterCif == nullptr) {
        member->setterCif = member->bridgeState->getMethodCif(
            env, member->setter.signatureOffset);
      }
      return member->setterCif;
  }
}

bool receiverClassRequiresJSCSuperCall(Class receiverClass) {
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

inline bool computeJSCNSErrorOutSignature(SEL selector, Cif* cif) {
  if (cif == nullptr || cif->argc == 0 || cif->argTypes.empty() ||
      !selectorEndsWith(selector, "error:")) {
    return false;
  }
  auto lastArgType = cif->argTypes[cif->argc - 1];
  return lastArgType != nullptr && lastArgType->type == &ffi_type_pointer;
}

inline bool isJSCNSErrorOutSignature(MethodDescriptor* descriptor, Cif* cif) {
  if (descriptor == nullptr) {
    return computeJSCNSErrorOutSignature(nullptr, cif);
  }

  if (!descriptor->nserrorOutSignatureCached) {
    descriptor->nserrorOutSignature =
        computeJSCNSErrorOutSignature(descriptor->selector, cif);
    descriptor->nserrorOutSignatureCached = true;
  }
  return descriptor->nserrorOutSignature;
}

inline bool isJSCBlockFallbackSelector(SEL selector) {
  return selector == @selector(methodWithSimpleBlock:) ||
         selector == @selector(methodRetainingBlock:) ||
         selector == @selector(methodWithBlock:) ||
         selector == @selector(methodWithComplexBlock:);
}

ObjCEngineDirectInvoker ensureJSCObjCEngineDirectInvoker(
    Cif* cif, MethodDescriptor* descriptor, uint8_t dispatchFlags) {
  if (cif == nullptr || descriptor == nullptr || cif->signatureHash == 0) {
    return nullptr;
  }

  if (!descriptor->dispatchLookupCached ||
      descriptor->dispatchLookupSignatureHash != cif->signatureHash ||
      descriptor->dispatchLookupFlags != dispatchFlags) {
    descriptor->dispatchLookupSignatureHash = cif->signatureHash;
    descriptor->dispatchLookupFlags = dispatchFlags;
    descriptor->dispatchId = composeSignatureDispatchId(
        cif->signatureHash, SignatureCallKind::ObjCMethod, dispatchFlags);
    descriptor->preparedInvoker =
        reinterpret_cast<void*>(lookupObjCPreparedInvoker(descriptor->dispatchId));
    descriptor->napiInvoker =
        reinterpret_cast<void*>(lookupObjCNapiInvoker(descriptor->dispatchId));
    descriptor->engineDirectInvoker =
        reinterpret_cast<void*>(lookupObjCEngineDirectInvoker(descriptor->dispatchId));
    descriptor->dispatchLookupCached = true;
  }

  return reinterpret_cast<ObjCEngineDirectInvoker>(
      descriptor->engineDirectInvoker);
}

CFunctionEngineDirectInvoker ensureJSCCFunctionEngineDirectInvoker(
    CFunction* function, Cif* cif) {
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
    function->dispatchId = composeSignatureDispatchId(
        cif->signatureHash, SignatureCallKind::CFunction,
        function->dispatchFlags);
    function->preparedInvoker =
        reinterpret_cast<void*>(lookupCFunctionPreparedInvoker(function->dispatchId));
    function->napiInvoker =
        reinterpret_cast<void*>(lookupCFunctionNapiInvoker(function->dispatchId));
    function->engineDirectInvoker = reinterpret_cast<void*>(
        lookupCFunctionEngineDirectInvoker(function->dispatchId));
    function->dispatchLookupCached = true;
  }

  return reinterpret_cast<CFunctionEngineDirectInvoker>(
      function->engineDirectInvoker);
}

bool makeJSCObjCReturnValue(napi_env env, ObjCClassMember* member,
                            MethodDescriptor* descriptor, Cif* cif, id self,
                            bool receiverIsClass, napi_value jsThis,
                            void* rvalue, bool propertyAccess,
                            JSValueRef* result) {
  if (env == nullptr || member == nullptr || descriptor == nullptr ||
      cif == nullptr || cif->returnType == nullptr || result == nullptr) {
    return false;
  }

  if (makeJSCRawReturnValue(env, cif->returnType->kind, rvalue, result)) {
    return true;
  }

  const char* selectorName = sel_getName(descriptor->selector);
  if (selectorName != nullptr && std::strcmp(selectorName, "class") == 0) {
    if (!propertyAccess && !receiverIsClass) {
      napi_value constructor = jsThis;
      napi_get_named_property(env, jsThis, "constructor", &constructor);
      *result = ToJSValue(constructor);
      return true;
    }

    id classObject = receiverIsClass ? self : (id)object_getClass(self);
    napi_value converted =
        member->bridgeState->getObject(env, classObject, kUnownedObject, 0, nullptr);
    if (converted == nullptr) {
      return false;
    }
    *result = ToJSValue(converted);
    return true;
  }

  if (cif->returnType->kind == mdTypeInstanceObject) {
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
          env, obj, constructor, member->returnOwned ? kOwnedObject : kUnownedObject);
    }
    *result = converted != nullptr ? ToJSValue(converted) : JSValueMakeNull(env->context);
    return true;
  }

  if (cif->returnType->kind == mdTypeNSStringObject) {
    return makeJSCNSStringValue(
        env, *reinterpret_cast<NSString* const*>(rvalue), result);
  }

  if (cif->returnType->kind == mdTypeAnyObject) {
    id obj = *reinterpret_cast<id*>(rvalue);
    if (receiverIsClass && obj != nil) {
      Class receiverClass = static_cast<Class>(self);
      if ((receiverClass == [NSString class] ||
           receiverClass == [NSMutableString class]) &&
          selectorName != nullptr &&
          (std::strcmp(selectorName, "string") == 0 ||
           std::strcmp(selectorName, "stringWithString:") == 0 ||
           std::strcmp(selectorName, "stringWithCapacity:") == 0)) {
        napi_value converted =
            member->bridgeState->getObject(env, obj, jsThis, kUnownedObject);
        if (converted == nullptr) {
          return false;
        }
        *result = ToJSValue(converted);
        return true;
      }
    }

    if (obj != nil && ![obj isKindOfClass:[NSString class]] &&
        ![obj isKindOfClass:[NSNumber class]] &&
        ![obj isKindOfClass:[NSNull class]]) {
      napi_value cached = member->bridgeState->findCachedObjectWrapper(env, obj);
      if (cached != nullptr) {
        *result = ToJSValue(cached);
        return true;
      }
    }

    if (makeJSCBoxedObjectValue(env, obj, result)) {
      return true;
    }
  }

  napi_value fastResult = nullptr;
  if (TryFastConvertEngineReturnValue(env, cif->returnType->kind, rvalue,
                                      &fastResult)) {
    *result = ToJSValue(fastResult);
    return true;
  }

  napi_value converted =
      cif->returnType->toJS(env, rvalue, member->returnOwned ? kReturnOwned : 0);
  if (converted == nullptr) {
    return false;
  }
  *result = ToJSValue(converted);
  return true;
}

bool makeJSCCFunctionReturnValue(napi_env env, CFunction* function, Cif* cif,
                                 void* rvalue, JSValueRef* result) {
  if (env == nullptr || cif == nullptr || cif->returnType == nullptr ||
      result == nullptr) {
    return false;
  }

  if (makeJSCRawReturnValue(env, cif->returnType->kind, rvalue, result)) {
    return true;
  }

  if (cif->returnType->kind == mdTypeNSStringObject) {
    return makeJSCNSStringValue(
        env, *reinterpret_cast<NSString* const*>(rvalue), result);
  }
  if (cif->returnType->kind == mdTypeAnyObject &&
      makeJSCBoxedObjectValue(env, *reinterpret_cast<id const*>(rvalue), result)) {
    return true;
  }

  napi_value fastResult = nullptr;
  if (TryFastConvertEngineReturnValue(env, cif->returnType->kind, rvalue,
                                      &fastResult)) {
    *result = ToJSValue(fastResult);
    return true;
  }

  uint32_t toJSFlags = kCStringAsReference;
  if (function != nullptr && (function->dispatchFlags & 1) != 0) {
    toJSFlags |= kReturnOwned;
  }
  napi_value converted = cif->returnType->toJS(env, rvalue, toJSFlags);
  if (converted == nullptr) {
    return false;
  }
  *result = ToJSValue(converted);
  return true;
}

JSCEngineDirectResult tryCallJSCObjCEngineDirect(
    napi_env env, ObjCClassMember* member, napi_value jsThis, size_t argc,
    const napi_value* argv, EngineDirectMemberKind kind, JSValueRef* result) {
  if (env == nullptr || member == nullptr || member->bridgeState == nullptr ||
      result == nullptr) {
    return JSCEngineDirectResult::NotHandled;
  }

  MethodDescriptor* descriptor = nullptr;
  Cif* cif = jscMemberCif(env, member, kind, &descriptor);
  if (cif == nullptr || cif->isVariadic || cif->returnType == nullptr) {
    return JSCEngineDirectResult::NotHandled;
  }

  const bool canUseGeneratedInvoker =
      cif->signatureHash != 0 && argc == cif->argc;
  ObjCEngineDirectInvoker invoker = canUseGeneratedInvoker
      ? ensureJSCObjCEngineDirectInvoker(cif, descriptor,
                                         descriptor->dispatchFlags)
      : nullptr;

  if (isJSCNSErrorOutSignature(descriptor, cif) ||
      isJSCBlockFallbackSelector(descriptor->selector)) {
    return JSCEngineDirectResult::NotHandled;
  }

  id self = resolveJSCSelf(env, jsThis, member);
  if (self == nil) {
    return JSCEngineDirectResult::NotHandled;
  }

  const bool receiverIsClass = object_isClass(self);
  Class receiverClass = receiverIsClass ? static_cast<Class>(self) : object_getClass(self);
  if (receiverClassRequiresJSCSuperCall(receiverClass)) {
    return JSCEngineDirectResult::NotHandled;
  }

  JSCFastReturnStorage rvalueStorage(cif);
  if (!rvalueStorage.valid()) {
    return JSCEngineDirectResult::NotHandled;
  }

  void* rvalue = rvalueStorage.get();
  JSCFastRoundTripCacheFrameGuard roundTripCacheFrame(
      env, member->bridgeState, cif);
  bool didInvoke = false;
  @try {
    if (invoker != nullptr) {
      didInvoke = invoker(env, cif, reinterpret_cast<void*>(objc_msgSend), self,
                          descriptor->selector, argv, rvalue);
    } else {
      didInvoke = InvokeObjCMemberEngineDirectDynamic(
          env, cif, self, receiverIsClass, descriptor,
          descriptor->dispatchFlags, argc, argv, rvalue);
    }
  } @catch (NSException* exception) {
    std::string message = exception.description.UTF8String;
    NativeScriptException nativeScriptException(message);
    nativeScriptException.ReThrowToJS(env);
    return JSCEngineDirectResult::Failed;
  }

  if (!didInvoke) {
    if (invoker == nullptr && env->last_exception != nullptr) {
      return JSCEngineDirectResult::Failed;
    }
    return JSCEngineDirectResult::NotHandled;
  }

  if (!makeJSCObjCReturnValue(env, member, descriptor, cif, self,
                              receiverIsClass, jsThis, rvalue,
                              kind != EngineDirectMemberKind::Method, result)) {
    return JSCEngineDirectResult::Failed;
  }

  return JSCEngineDirectResult::Handled;
}

JSCEngineDirectResult tryCallJSCCFunctionEngineDirect(
    napi_env env, MDSectionOffset offset, size_t argc, const napi_value* argv,
    JSValueRef* result) {
  if (env == nullptr || result == nullptr) {
    return JSCEngineDirectResult::NotHandled;
  }

  ObjCBridgeState* bridgeState = ObjCBridgeState::InstanceData(env);
  if (bridgeState == nullptr ||
      isCompatCFunction(env, reinterpret_cast<void*>(
                                 static_cast<uintptr_t>(offset)))) {
    return JSCEngineDirectResult::NotHandled;
  }

  CFunction* function = bridgeState->getCFunction(env, offset);
  Cif* cif = function != nullptr ? function->cif : nullptr;
  if (function == nullptr || cif == nullptr || cif->isVariadic ||
      cif->returnType == nullptr) {
    return JSCEngineDirectResult::NotHandled;
  }

  const bool canUseGeneratedInvoker =
      cif->signatureHash != 0 && argc == cif->argc;
  CFunctionEngineDirectInvoker invoker = canUseGeneratedInvoker
      ? ensureJSCCFunctionEngineDirectInvoker(function, cif)
      : nullptr;

  bool didInvoke = false;
  JSCFastRoundTripCacheFrameGuard roundTripCacheFrame(env, bridgeState, cif);
  JSCFastReturnStorage rvalueStorage(cif);
  if (!rvalueStorage.valid()) {
    return JSCEngineDirectResult::NotHandled;
  }
  void* rvalue = rvalueStorage.get();
  @try {
    if (invoker != nullptr) {
      didInvoke = invoker(env, cif, function->fnptr, argv, rvalue);
    } else {
      didInvoke = InvokeCFunctionEngineDirectDynamic(
          env, function, cif, argc, argv, rvalue);
    }
  } @catch (NSException* exception) {
    std::string message = exception.description.UTF8String;
    NativeScriptException nativeScriptException(message);
    nativeScriptException.ReThrowToJS(env);
    return JSCEngineDirectResult::Failed;
  }

  if (!didInvoke) {
    if (invoker == nullptr && env->last_exception != nullptr) {
      return JSCEngineDirectResult::Failed;
    }
    return JSCEngineDirectResult::NotHandled;
  }

  if (!makeJSCCFunctionReturnValue(env, function, cif, rvalue, result)) {
    return JSCEngineDirectResult::Failed;
  }

  return JSCEngineDirectResult::Handled;
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
  if (binding == nullptr) {
    napi_env env = napi_env__::get(const_cast<JSGlobalContextRef>(ctx));
    if (env != nullptr) {
      JSValueRef bindingValue =
          JSObjectGetPropertyForKey(ctx, function, env->function_info_symbol,
                                    nullptr);
      if (bindingValue != nullptr && JSValueIsObject(ctx, bindingValue)) {
        JSObjectRef bindingObject = JSValueToObject(ctx, bindingValue, nullptr);
        if (bindingObject != nullptr) {
          binding = static_cast<JSCFastNativeBinding*>(
              JSObjectGetPrivate(bindingObject));
        }
      }
    }
  }
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
  JSValueRef directResult = nullptr;
  JSCEngineDirectResult directCallResult = JSCEngineDirectResult::NotHandled;
  switch (binding->kind) {
    case JSCFastNativeKind::ObjCMethod:
      directCallResult = tryCallJSCObjCEngineDirect(
          env, static_cast<ObjCClassMember*>(binding->data), jsThis,
          argumentCount, argv, EngineDirectMemberKind::Method,
          &directResult);
      break;
    case JSCFastNativeKind::ObjCGetter:
      directCallResult = tryCallJSCObjCEngineDirect(
          env, static_cast<ObjCClassMember*>(binding->data), jsThis, 0,
          nullptr, EngineDirectMemberKind::Getter, &directResult);
      break;
    case JSCFastNativeKind::ObjCSetter: {
      JSValueRef undefined = JSValueMakeUndefined(ctx);
      napi_value value =
          argumentCount > 0 ? ToNapi(arguments[0]) : ToNapi(undefined);
      directCallResult = tryCallJSCObjCEngineDirect(
          env, static_cast<ObjCClassMember*>(binding->data), jsThis, 1,
          &value, EngineDirectMemberKind::Setter, &directResult);
      break;
    }
    case JSCFastNativeKind::CFunction:
      directCallResult = tryCallJSCCFunctionEngineDirect(
          env,
          static_cast<MDSectionOffset>(
              reinterpret_cast<uintptr_t>(binding->data)),
          argumentCount, argv, &directResult);
      break;
    default:
      break;
  }

  if (directCallResult == JSCEngineDirectResult::Handled) {
    if (env->last_exception != nullptr) {
      if (exception != nullptr) {
        *exception = env->last_exception;
      }
      env->last_exception = nullptr;
      return JSValueMakeUndefined(ctx);
    }
    return directResult != nullptr ? directResult : JSValueMakeUndefined(ctx);
  }

  if (directCallResult == JSCEngineDirectResult::Failed) {
    if (env->last_exception == nullptr) {
      napi_throw_error(env, "NativeScriptException",
                       "NativeScript fast native call failed.");
    }
    if (exception != nullptr) {
      *exception = env->last_exception;
    }
    env->last_exception = nullptr;
    return JSValueMakeUndefined(ctx);
  }

  env->last_exception = nullptr;

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
    definition.className = "NativeScriptFastNativeBinding";
    definition.finalize = finalizeFastFunction;
    return JSClassCreate(&definition);
  }();
  return cls;
}

JSObjectRef makeFastFunction(napi_env env, JSCFastNativeKind kind, void* data,
                             const char* name) {
  auto* binding = new JSCFastNativeBinding{env, kind, data};
  ScopedJSString functionName(name != nullptr ? name : "");
  JSObjectRef function = JSObjectMakeFunctionWithCallback(
      env->context, name != nullptr ? static_cast<JSStringRef>(functionName)
                                    : nullptr,
      callFastFunction);
  if (function == nullptr) {
    delete binding;
    return nullptr;
  }

  JSObjectRef bindingObject =
      JSObjectMake(env->context, fastFunctionClass(), binding);
  if (bindingObject == nullptr) {
    delete binding;
    return nullptr;
  }
  JSObjectSetPropertyForKey(env->context, function, env->function_info_symbol,
                            bindingObject,
                            kJSPropertyAttributeDontEnum |
                                kJSPropertyAttributeReadOnly |
                                kJSPropertyAttributeDontDelete,
                            nullptr);
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

bool TryFastConvertJSCBoolArgument(napi_env env, napi_value value,
                                   uint8_t* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  JSValueRef jsValue = ToJSValue(value);
  if (!JSValueIsBoolean(env->context, jsValue)) {
    return false;
  }
  *result = JSValueToBoolean(env->context, jsValue) ? static_cast<uint8_t>(1)
                                                    : static_cast<uint8_t>(0);
  return true;
}

bool TryFastConvertJSCDoubleArgument(napi_env env, napi_value value,
                                     double* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  JSValueRef jsValue = ToJSValue(value);
  if (!JSValueIsNumber(env->context, jsValue)) {
    return false;
  }
  JSValueRef exception = nullptr;
  double converted = JSValueToNumber(env->context, jsValue, &exception);
  if (exception != nullptr) {
    env->last_exception = exception;
    return false;
  }
  if (std::isnan(converted) || std::isinf(converted)) {
    converted = 0.0;
  }
  *result = converted;
  return true;
}

bool TryFastConvertJSCFloatArgument(napi_env env, napi_value value,
                                    float* result) {
  double converted = 0.0;
  if (!TryFastConvertJSCDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<float>(converted);
  return true;
}

bool TryFastConvertJSCInt8Argument(napi_env env, napi_value value,
                                   int8_t* result) {
  double converted = 0.0;
  if (!TryFastConvertJSCDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<int8_t>(converted);
  return true;
}

bool TryFastConvertJSCUInt8Argument(napi_env env, napi_value value,
                                    uint8_t* result) {
  double converted = 0.0;
  if (!TryFastConvertJSCDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<uint8_t>(converted);
  return true;
}

bool TryFastConvertJSCInt16Argument(napi_env env, napi_value value,
                                    int16_t* result) {
  double converted = 0.0;
  if (!TryFastConvertJSCDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<int16_t>(converted);
  return true;
}

bool TryFastConvertJSCUInt16Argument(napi_env env, napi_value value,
                                     uint16_t* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  JSContextRef ctx = env->context;
  JSValueRef jsValue = ToJSValue(value);
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
    *result = static_cast<uint16_t>(JSStringGetCharactersPtr(str)[0]);
    JSStringRelease(str);
    return true;
  }

  double converted = 0.0;
  if (!TryFastConvertJSCDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<uint16_t>(converted);
  return true;
}

bool TryFastConvertJSCInt32Argument(napi_env env, napi_value value,
                                    int32_t* result) {
  double converted = 0.0;
  if (!TryFastConvertJSCDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<int32_t>(converted);
  return true;
}

bool TryFastConvertJSCUInt32Argument(napi_env env, napi_value value,
                                     uint32_t* result) {
  double converted = 0.0;
  if (!TryFastConvertJSCDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<uint32_t>(converted);
  return true;
}

bool TryFastConvertJSCInt64Argument(napi_env env, napi_value value,
                                    int64_t* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  JSContextRef ctx = env->context;
  JSValueRef jsValue = ToJSValue(value);
  if (JSValueIsNumber(ctx, jsValue)) {
    double converted = 0.0;
    if (!TryFastConvertJSCDoubleArgument(env, value, &converted)) {
      return false;
    }
    *result = static_cast<int64_t>(converted);
    return true;
  }

  if (__builtin_available(macOS 15.0, iOS 18.0, *)) {
    if (!JSValueIsBigInt(ctx, jsValue)) {
      return false;
    }
    JSValueRef exception = nullptr;
    *result = JSValueToInt64(ctx, jsValue, &exception);
    if (exception != nullptr) {
      env->last_exception = exception;
      return false;
    }
    return true;
  }

  bool lossless = false;
  return napi_get_value_bigint_int64(env, value, result, &lossless) == napi_ok;
}

bool TryFastConvertJSCUInt64Argument(napi_env env, napi_value value,
                                     uint64_t* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  JSContextRef ctx = env->context;
  JSValueRef jsValue = ToJSValue(value);
  if (JSValueIsNumber(ctx, jsValue)) {
    double converted = 0.0;
    if (!TryFastConvertJSCDoubleArgument(env, value, &converted)) {
      return false;
    }
    *result = static_cast<uint64_t>(converted);
    return true;
  }

  if (__builtin_available(macOS 15.0, iOS 18.0, *)) {
    if (!JSValueIsBigInt(ctx, jsValue)) {
      return false;
    }
    JSValueRef exception = nullptr;
    *result = JSValueToUInt64(ctx, jsValue, &exception);
    if (exception != nullptr) {
      env->last_exception = exception;
      return false;
    }
    return true;
  }

  bool lossless = false;
  return napi_get_value_bigint_uint64(env, value, result, &lossless) == napi_ok;
}

bool TryFastConvertJSCSelectorArgument(napi_env env, napi_value value,
                                       SEL* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  JSValueRef jsValue = ToJSValue(value);
  if (JSValueIsNull(env->context, jsValue) ||
      JSValueIsUndefined(env->context, jsValue)) {
    *result = nullptr;
    return true;
  }
  if (!JSValueIsString(env->context, jsValue)) {
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
  *result = cachedSelectorForName(selectorName, selectorLength);
  return true;
}

bool TryFastConvertJSCObjectArgument(napi_env env, MDTypeKind kind,
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
  if (tryFastConvertJSCObjectArgument(env, kind, ToJSValue(value), result)) {
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
      if (TryFastConvertJSCObjectArgument(env, kind, value, result)) {
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
      jsValue = JSValueMakeUndefined(ctx);
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
        env, JSCFastNativeKind::ObjCMethod, descriptor->data,
        descriptor->utf8name);
    return function != nullptr &&
           defineProperty(env, object, descriptor, propertyName, function,
                          nullptr, nullptr);
  }

  if (descriptor->method == CFunction::jsCall && descriptor->data != nullptr &&
      !isCompatCFunction(env, descriptor->data)) {
    JSObjectRef function = makeFastFunction(
        env, JSCFastNativeKind::CFunction, descriptor->data,
        descriptor->utf8name);
    return function != nullptr &&
           defineProperty(env, object, descriptor, propertyName, function,
                          nullptr, nullptr);
  }

  if (descriptor->getter == ObjCClassMember::jsGetter &&
      descriptor->data != nullptr) {
    JSObjectRef getter = makeFastFunction(
        env, JSCFastNativeKind::ObjCGetter, descriptor->data,
        descriptor->utf8name);
    JSObjectRef setter = nullptr;
    if (descriptor->setter == ObjCClassMember::jsSetter) {
      setter = makeFastFunction(env, JSCFastNativeKind::ObjCSetter,
                                descriptor->data, descriptor->utf8name);
    } else if (descriptor->setter == ObjCClassMember::jsReadOnlySetter) {
      setter = makeFastFunction(env, JSCFastNativeKind::ObjCReadOnlySetter,
                                descriptor->data, descriptor->utf8name);
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

#include "V8FastNativeApiPrivate.h"

#ifdef TARGET_ENGINE_V8

namespace nativescript {
namespace {
inline size_t alignUpSize(size_t value, size_t alignment) {
  if (alignment == 0) {
    return value;
  }
  return ((value + alignment - 1) / alignment) * alignment;
}

size_t getCifArgumentStorageSize(Cif* cif, unsigned int argumentIndex,
                                 unsigned int implicitArgumentCount) {
  if (cif == nullptr || cif->cif.arg_types == nullptr) {
    return sizeof(void*);
  }

  const unsigned int ffiIndex = argumentIndex + implicitArgumentCount;
  if (ffiIndex >= cif->cif.nargs) {
    return sizeof(void*);
  }

  ffi_type* ffiArgType = cif->cif.arg_types[ffiIndex];
  size_t storageSize = ffiArgType != nullptr ? ffiArgType->size : 0;
  return storageSize != 0 ? storageSize : sizeof(void*);
}

size_t getCifArgumentStorageAlign(Cif* cif, unsigned int argumentIndex,
                                  unsigned int implicitArgumentCount) {
  if (cif == nullptr || cif->cif.arg_types == nullptr) {
    return alignof(void*);
  }

  const unsigned int ffiIndex = argumentIndex + implicitArgumentCount;
  if (ffiIndex >= cif->cif.nargs) {
    return alignof(void*);
  }

  ffi_type* ffiArgType = cif->cif.arg_types[ffiIndex];
  size_t alignment = ffiArgType != nullptr ? ffiArgType->alignment : 0;
  return alignment != 0 ? alignment : alignof(void*);
}

class V8CifArgumentStorage {
 public:
  V8CifArgumentStorage(Cif* cif, unsigned int implicitArgumentCount) {
    if (cif == nullptr || cif->argc == 0) {
      return;
    }

    buffers_.resize(cif->argc, nullptr);

    size_t totalSize = 0;
    for (unsigned int i = 0; i < cif->argc; i++) {
      const size_t storageAlign = getCifArgumentStorageAlign(cif, i, implicitArgumentCount);
      const size_t storageSize = getCifArgumentStorageSize(cif, i, implicitArgumentCount);
      totalSize = alignUpSize(totalSize, storageAlign);
      totalSize += storageSize;
    }

    if (totalSize == 0) {
      totalSize = sizeof(void*);
    }

    storageBase_ = totalSize <= kInlineSize ? inlineBuffer_ : malloc(totalSize);
    if (storageBase_ == nullptr) {
      valid_ = false;
      return;
    }

    memset(storageBase_, 0, totalSize);

    size_t offset = 0;
    for (unsigned int i = 0; i < cif->argc; i++) {
      const size_t storageAlign = getCifArgumentStorageAlign(cif, i, implicitArgumentCount);
      const size_t storageSize = getCifArgumentStorageSize(cif, i, implicitArgumentCount);
      offset = alignUpSize(offset, storageAlign);
      buffers_[i] = static_cast<void*>(static_cast<unsigned char*>(storageBase_) + offset);
      offset += storageSize;
    }
  }

  ~V8CifArgumentStorage() {
    if (storageBase_ != nullptr && storageBase_ != inlineBuffer_) {
      free(storageBase_);
    }
  }

  bool valid() const { return valid_; }

  void* at(unsigned int index) const {
    if (index >= buffers_.size()) {
      return nullptr;
    }
    return buffers_[index];
  }

 private:
  static constexpr size_t kInlineSize = 256;
  alignas(max_align_t) unsigned char inlineBuffer_[kInlineSize];
  void* storageBase_ = nullptr;
  bool valid_ = true;
  std::vector<void*> buffers_;
};

inline napi_env envFromCurrentContext(v8::Isolate* isolate) {
  (void)isolate;
  return nullptr;
}

id resolveSelf(napi_env env, v8::Local<v8::Value> jsThisValue, ObjCClassMember* method) {
  id self = nil;
  ObjCBridgeState* state =
      method != nullptr ? method->bridgeState : ObjCBridgeState::InstanceData(env);

  if (!jsThisValue.IsEmpty() && jsThisValue->IsObject()) {
    v8::Local<v8::Object> jsThisObject = jsThisValue.As<v8::Object>();
    if (isV8NativeWrapperObject(jsThisObject)) {
      self = tryReadWrappedReference(env, jsThisObject);
      if (self != nil) {
        return self;
      }
    }
  }

  self = tryUnwrapV8NativeObject(env, jsThisValue);
  if (self != nil) {
    return self;
  }

  napi_value jsThis = v8impl::JsValueFromV8LocalValue(jsThisValue);

  if (state != nullptr && jsThis != nullptr) {
    state->tryResolveBridgedTypeConstructor(env, jsThis, &self);
  }

  if (self == nil && jsThis != nullptr) {
    void* unwrapped = nullptr;
    if (napi_unwrap(env, jsThis, &unwrapped) == napi_ok) {
      self = static_cast<id>(unwrapped);
    }
  }

  if (self == nil && jsThis != nullptr) {
    napi_value nativePointerValue = nullptr;
    if (napi_get_named_property(env, jsThis, kV8NativePointerProperty, &nativePointerValue) ==
            napi_ok &&
        Pointer::isInstance(env, nativePointerValue)) {
      Pointer* nativePointer = Pointer::unwrap(env, nativePointerValue);
      if (nativePointer != nullptr && nativePointer->data != nullptr) {
        self = static_cast<id>(nativePointer->data);
      }
    }
  }

  if (self != nil) {
    return self;
  }

  bool shouldUseClassFallback = false;
  if (method != nullptr && method->cls != nullptr && method->cls->nativeClass != nil) {
    if (method->classMethod) {
      shouldUseClassFallback = true;
    }

    if (!jsThisValue.IsEmpty() && jsThisValue->IsFunction() && jsThis != nullptr) {
      bool isSameConstructor = true;
      napi_value definingConstructor = nullptr;
      if (method->cls->constructor != nullptr) {
        napi_get_reference_value(env, method->cls->constructor,
                                 &definingConstructor);
      }
      if (definingConstructor != nullptr &&
          napi_strict_equals(env, jsThis, definingConstructor,
                             &isSameConstructor) == napi_ok &&
          !isSameConstructor) {
        shouldUseClassFallback = false;
      } else {
        shouldUseClassFallback = true;
      }
    } else if (!method->classMethod && !jsThisValue.IsEmpty() &&
               jsThisValue->IsFunction()) {
      shouldUseClassFallback = true;
    }
  }

  if (shouldUseClassFallback) {
    return (id)method->cls->nativeClass;
  }

  throwV8Error(env != nullptr ? env->isolate : nullptr,
               "There was no native counterpart to the JavaScript object. Native API was "
               "called with a likely plain object.");
  return nil;
}

bool receiverClassRequiresSuperCall(Class receiverClass);

bool receiverRequiresSuperCall(id self, bool classMethod) {
  if (self == nil) {
    return false;
  }

  Class receiverClass = classMethod ? (Class)self : object_getClass(self);
  return receiverClassRequiresSuperCall(receiverClass);
}

ObjCV8Invoker ensureObjCV8Invoker(Cif* cif, MethodDescriptor* descriptor, uint8_t dispatchFlags) {
  if (cif == nullptr || descriptor == nullptr || cif->signatureHash == 0 ||
      cif->skipGeneratedNapiDispatch) {
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
    descriptor->v8Invoker = reinterpret_cast<void*>(lookupObjCV8Invoker(descriptor->dispatchId));
    descriptor->dispatchLookupCached = true;
  }

  return reinterpret_cast<ObjCV8Invoker>(descriptor->v8Invoker);
}

CFunctionV8Invoker ensureCFunctionV8Invoker(CFunction* function, Cif* cif) {
  if (function == nullptr || cif == nullptr || cif->signatureHash == 0 ||
      cif->skipGeneratedNapiDispatch) {
    return nullptr;
  }

  if (!function->dispatchLookupCached ||
      function->dispatchLookupSignatureHash != cif->signatureHash) {
    function->dispatchLookupSignatureHash = cif->signatureHash;
    function->dispatchId = composeSignatureDispatchId(
        cif->signatureHash, SignatureCallKind::CFunction, function->dispatchFlags);
    function->preparedInvoker =
        reinterpret_cast<void*>(lookupCFunctionPreparedInvoker(function->dispatchId));
    function->napiInvoker =
        reinterpret_cast<void*>(lookupCFunctionNapiInvoker(function->dispatchId));
    function->v8Invoker = reinterpret_cast<void*>(lookupCFunctionV8Invoker(function->dispatchId));
    function->dispatchLookupCached = true;
  }

  return reinterpret_cast<CFunctionV8Invoker>(function->v8Invoker);
}

inline bool selectorEndsWith(SEL selector, const char* suffix) {
  if (selector == nullptr || suffix == nullptr) {
    return false;
  }

  const char* selectorName = sel_getName(selector);
  if (selectorName == nullptr) {
    return false;
  }

  size_t selectorLength = strlen(selectorName);
  size_t suffixLength = strlen(suffix);
  if (selectorLength < suffixLength) {
    return false;
  }

  return strcmp(selectorName + selectorLength - suffixLength, suffix) == 0;
}

inline bool computeNSErrorOutMethodSignature(SEL selector, Cif* cif) {
  if (cif == nullptr || cif->argc == 0 || cif->argTypes.empty()) {
    return false;
  }

  if (!selectorEndsWith(selector, "error:")) {
    return false;
  }

  auto lastArgType = cif->argTypes[cif->argc - 1];
  return lastArgType != nullptr && lastArgType->type == &ffi_type_pointer;
}

inline bool isNSErrorOutMethodSignature(MethodDescriptor* descriptor, Cif* cif) {
  if (descriptor == nullptr) {
    return computeNSErrorOutMethodSignature(nullptr, cif);
  }

  if (!descriptor->nserrorOutSignatureCached) {
    descriptor->nserrorOutSignature =
        computeNSErrorOutMethodSignature(descriptor->selector, cif);
    descriptor->nserrorOutSignatureCached = true;
  }
  return descriptor->nserrorOutSignature;
}

inline void throwArgumentsCountError(v8::Isolate* isolate, size_t actualCount,
                                     size_t expectedCount) {
  std::string message = "Actual arguments count: \"" + std::to_string(actualCount) +
                        "\". Expected: \"" + std::to_string(expectedCount) + "\".";
  throwV8Error(isolate, message.c_str());
}

bool canConvertV8ValueToType(napi_env env, v8::Local<v8::Value> value,
                             std::shared_ptr<TypeConv> typeConv) {
  if (env == nullptr || typeConv == nullptr || value.IsEmpty()) {
    return false;
  }

  if (value->IsNullOrUndefined()) {
    return true;
  }

  switch (typeConv->kind) {
    case mdTypeBool:
      return value->IsBoolean() || value->IsNumber();

    case mdTypeChar:
    case mdTypeUChar:
      return value->IsBoolean() || value->IsNumber() || value->IsBigInt();

    case mdTypeSShort:
      return value->IsNumber() || value->IsBigInt();

    case mdTypeUShort:
      if (value->IsString()) {
        return value.As<v8::String>()->Length() == 1;
      }
      return value->IsNumber() || value->IsBigInt();

    case mdTypeSInt:
    case mdTypeUInt:
    case mdTypeSLong:
    case mdTypeULong:
    case mdTypeSInt64:
    case mdTypeUInt64:
    case mdTypeFloat:
    case mdTypeDouble:
      return value->IsNumber() || value->IsBigInt();

    case mdTypeString:
      return value->IsString() || value->IsObject();

    case mdTypeAnyObject:
      return value->IsObject() || value->IsFunction() || value->IsString() || value->IsNumber() ||
             value->IsBoolean() || value->IsBigInt();

    case mdTypeClass:
    case mdTypeClassObject:
    case mdTypeProtocolObject:
      return value->IsFunction() || value->IsObject();

    case mdTypeInstanceObject:
      return value->IsObject() || value->IsFunction() || value->IsString() || value->IsNumber() ||
             value->IsBoolean() || value->IsBigInt();

    case mdTypeNSStringObject:
    case mdTypeNSMutableStringObject:
      return value->IsString() || value->IsObject();

    case mdTypeSelector:
      return value->IsString();

    case mdTypePointer:
    case mdTypeOpaquePointer:
      return value->IsObject() || value->IsFunction() || value->IsBigInt() || value->IsString();

    case mdTypeStruct:
      return value->IsObject();

    case mdTypeBlock:
    case mdTypeFunctionPointer:
      return value->IsFunction() || value->IsNullOrUndefined();

    default:
      return false;
  }
}

int scoreV8ValueForType(v8::Local<v8::Value> value, std::shared_ptr<TypeConv> typeConv) {
  if (typeConv == nullptr || value.IsEmpty()) {
    return 0;
  }

  switch (typeConv->kind) {
    case mdTypeBool:
      return value->IsBoolean() ? 2 : 0;
    case mdTypeSInt:
    case mdTypeUInt:
    case mdTypeSLong:
    case mdTypeULong:
    case mdTypeSInt64:
    case mdTypeUInt64:
    case mdTypeFloat:
    case mdTypeDouble:
      return value->IsNumber() || value->IsBigInt() ? 2 : 0;
    case mdTypeString:
    case mdTypeNSStringObject:
    case mdTypeNSMutableStringObject:
      return value->IsString() ? 2 : 0;
    default:
      return 1;
  }
}

Cif* resolveMethodDescriptorCif(napi_env env, ObjCClassMember* method,
                                MethodDescriptor* descriptor, Cif** cacheSlot,
                                bool receiverIsClass, Class receiverClass) {
  if (env == nullptr || method == nullptr || descriptor == nullptr || cacheSlot == nullptr) {
    return nullptr;
  }

  Cif* cached = *cacheSlot;
  if (cached != nullptr) {
    return cached;
  }

  Method runtimeMethod = receiverIsClass
                             ? class_getClassMethod(receiverClass, descriptor->selector)
                             : class_getInstanceMethod(receiverClass, descriptor->selector);
  Cif* resolved = nullptr;
  if (runtimeMethod != nullptr) {
    resolved = method->bridgeState->getMethodCif(env, runtimeMethod);
  }
  if (resolved == nullptr) {
    resolved = method->bridgeState->getMethodCif(env, descriptor->signatureOffset);
  }

  *cacheSlot = resolved;
  return resolved;
}

bool selectV8MethodOverload(napi_env env, const v8::FunctionCallbackInfo<v8::Value>& info,
                            ObjCClassMember* method, id self, MethodDescriptor** selectedMethod,
                            Cif** selectedCif) {
  if (env == nullptr || method == nullptr || self == nil || selectedMethod == nullptr ||
      selectedCif == nullptr) {
    return false;
  }

  *selectedMethod = &method->methodOrGetter;

  if (method->overloads.empty() && method->cif != nullptr) {
    *selectedCif = method->cif;
    return true;
  }

  const bool receiverIsClass = object_isClass(self);
  Class receiverClass = receiverIsClass ? (Class)self : object_getClass(self);
  *selectedCif = resolveMethodDescriptorCif(env, method, &method->methodOrGetter, &method->cif,
                                            receiverIsClass, receiverClass);

  if (method->overloads.empty()) {
    return *selectedCif != nullptr;
  }

  struct Candidate {
    MethodDescriptor* descriptor;
    Cif* cif;
    int score;
  };

  std::vector<Candidate> candidates;
  const size_t actualArgc = static_cast<size_t>(info.Length());
  auto tryAddCandidate = [&](MethodDescriptor* descriptor, Cif* cif) {
    if (descriptor == nullptr || cif == nullptr || cif->argc != actualArgc) {
      return;
    }

    int score = 0;
    for (size_t i = 0; i < actualArgc; i++) {
      if (!canConvertV8ValueToType(env, info[static_cast<int>(i)], cif->argTypes[i])) {
        return;
      }
      score += scoreV8ValueForType(info[static_cast<int>(i)], cif->argTypes[i]);
    }

    candidates.push_back(Candidate{descriptor, cif, score});
  };

  tryAddCandidate(&method->methodOrGetter, *selectedCif);
  for (auto& overload : method->overloads) {
    Cif* overloadCif =
        resolveMethodDescriptorCif(env, method, &overload.method, &overload.cif, receiverIsClass,
                                   receiverClass);
    tryAddCandidate(&overload.method, overloadCif);
  }

  if (!candidates.empty()) {
    Candidate* best = &candidates[0];
    for (auto& candidate : candidates) {
      if (candidate.score > best->score) {
        best = &candidate;
      }
    }
    *selectedMethod = best->descriptor;
    *selectedCif = best->cif;
  }

  return *selectedCif != nullptr;
}

bool receiverClassRequiresSuperCall(Class receiverClass) {
  if (receiverClass == nil) {
    return false;
  }

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

  bool requiresSuperCall =
      class_conformsToProtocol(receiverClass, @protocol(ObjCBridgeClassBuilderProtocol));
  superCallCache.emplace(receiverClass, requiresSuperCall);
  lastReceiverClass = receiverClass;
  lastRequiresSuperCall = requiresSuperCall;
  return requiresSuperCall;
}

bool invokeObjCPreparedOrFfi(napi_env env, Cif* cif, id self, bool classMethod,
                             MethodDescriptor* descriptor, uint8_t dispatchFlags, void** avalues,
                             void* rvalue) {
  if (cif == nullptr || descriptor == nullptr) {
    return false;
  }

  Class receiverClass = classMethod ? (Class)self : object_getClass(self);
  const bool supercall = receiverClassRequiresSuperCall(receiverClass);
  if (supercall && classMethod) {
    ObjCBridgeState* state = ObjCBridgeState::InstanceData(env);
    ClassBuilder* builder =
        state != nullptr ? static_cast<ClassBuilder*>(state->classesByPointer[self]) : nullptr;
    if (builder != nullptr && !builder->isFinal) {
      builder->build();
    }
  }

#if defined(__x86_64__)
  bool isStret = cif->returnType->type->size > 16 && cif->returnType->type->type == FFI_TYPE_STRUCT;
#endif

  @try {
    if (!supercall) {
      auto invoker = ensureObjCV8Invoker(cif, descriptor, dispatchFlags);
      auto preparedInvoker =
          descriptor != nullptr ? reinterpret_cast<ObjCPreparedInvoker>(descriptor->preparedInvoker)
                                : nullptr;
      if (preparedInvoker != nullptr) {
        preparedInvoker((void*)objc_msgSend, avalues, rvalue);
        return true;
      }

#if defined(__x86_64__)
      ffi_call(&cif->cif, isStret ? FFI_FN(objc_msgSend_stret) : FFI_FN(objc_msgSend), rvalue,
               avalues);
#else
      ffi_call(&cif->cif, FFI_FN(objc_msgSend), rvalue, avalues);
#endif
      (void)invoker;
    } else {
      Class superClass = classMethod ? class_getSuperclass(object_getClass((id)receiverClass))
                                     : class_getSuperclass(receiverClass);
      struct objc_super superobj = {self, superClass};
      auto superobjPtr = &superobj;
      avalues[0] = (void*)&superobjPtr;
#if defined(__x86_64__)
      ffi_call(&cif->cif, isStret ? FFI_FN(objc_msgSendSuper_stret) : FFI_FN(objc_msgSendSuper),
               rvalue, avalues);
#else
      ffi_call(&cif->cif, FFI_FN(objc_msgSendSuper), rvalue, avalues);
#endif
    }
  } @catch (NSException* exception) {
    std::string message = exception.description.UTF8String;
    NativeScriptException nativeScriptException(message);
    throwNativeScriptExceptionToV8(env, env != nullptr ? env->isolate : nullptr,
                                  nativeScriptException);
    return false;
  }

  return true;
}

void setObjCReturnValue(napi_env env, const v8::FunctionCallbackInfo<v8::Value>& info,
                        ObjCClassMember* method, MethodDescriptor* descriptor, Cif* cif, id self,
                        bool receiverIsClass, void* rvalue, bool propertyAccess) {
  if (cif == nullptr || method == nullptr || descriptor == nullptr) {
    return;
  }

  if (cif->returnType->kind == mdTypeVoid) {
    info.GetReturnValue().Set(v8::Undefined(info.GetIsolate()));
    return;
  }

  v8::Local<v8::Value> fastResult;
  if (TryFastConvertV8ReturnValue(env, cif->returnType->kind, rvalue, &fastResult)) {
    info.GetReturnValue().Set(fastResult);
    return;
  }

  if (cif->returnType->kind == mdTypeNSStringObject &&
      TryFastConvertV8NSStringReturnValue(env, rvalue, &fastResult)) {
    info.GetReturnValue().Set(fastResult);
    return;
  }

  napi_value jsThis = v8impl::JsValueFromV8LocalValue(info.This());
  const char* selectorName = sel_getName(descriptor->selector);
  if (selectorName != nullptr && strcmp(selectorName, "class") == 0) {
    if (!propertyAccess && !receiverIsClass) {
      napi_value constructor = jsThis;
      napi_get_named_property(env, jsThis, "constructor", &constructor);
      info.GetReturnValue().Set(v8impl::V8LocalValueFromJsValue(constructor));
      return;
    }

    id classObject = receiverIsClass ? self : (id)object_getClass(self);
    napi_value result =
        method->bridgeState->getObject(env, classObject, kUnownedObject, 0, nullptr);
    info.GetReturnValue().Set(v8impl::V8LocalValueFromJsValue(result));
    return;
  }

  if (cif->returnType->kind == mdTypeInstanceObject) {
    napi_value constructor = jsThis;
    if (!receiverIsClass) {
      napi_get_named_property(env, jsThis, "constructor", &constructor);
    }
    id obj = *((id*)rvalue);
    if (obj != nil) {
      ObjCBridgeState* state = ObjCBridgeState::InstanceData(env);
      if (state != nullptr) {
        if (napi_value cached = state->findCachedObjectWrapper(env, obj);
            cached != nullptr) {
          info.GetReturnValue().Set(v8impl::V8LocalValueFromJsValue(cached));
          return;
        }
      }
    }
    napi_value result = method->bridgeState->getObject(
        env, obj, constructor, method->returnOwned ? kOwnedObject : kUnownedObject);
    info.GetReturnValue().Set(v8impl::V8LocalValueFromJsValue(result));
    return;
  }

  if (cif->returnType->kind == mdTypeAnyObject && receiverIsClass) {
    id obj = *((id*)rvalue);
    Class receiverClass = (Class)self;
    if (obj != nil &&
        (receiverClass == [NSString class] || receiverClass == [NSMutableString class]) &&
        selectorName != nullptr &&
        (strcmp(selectorName, "string") == 0 || strcmp(selectorName, "stringWithString:") == 0 ||
         strcmp(selectorName, "stringWithCapacity:") == 0)) {
      napi_value result = method->bridgeState->getObject(env, obj, jsThis, kUnownedObject);
      info.GetReturnValue().Set(v8impl::V8LocalValueFromJsValue(result));
      return;
    }
  }

  if (cif->returnType->kind == mdTypeAnyObject ||
      cif->returnType->kind == mdTypeInstanceObject ||
      cif->returnType->kind == mdTypeProtocolObject ||
      cif->returnType->kind == mdTypeClassObject) {
    id obj = *((id*)rvalue);
    if (obj != nil && ![obj isKindOfClass:[NSString class]] &&
        ![obj isKindOfClass:[NSNumber class]] && ![obj isKindOfClass:[NSNull class]]) {
      ObjCBridgeState* state = ObjCBridgeState::InstanceData(env);
      if (state != nullptr) {
        if (napi_value cached = state->findCachedObjectWrapper(env, obj);
            cached != nullptr) {
          info.GetReturnValue().Set(v8impl::V8LocalValueFromJsValue(cached));
          return;
        }
      }
    }
  }

  napi_value result = cif->returnType->toJS(env, rvalue, method->returnOwned ? kReturnOwned : 0);
  info.GetReturnValue().Set(v8impl::V8LocalValueFromJsValue(result));
}

bool invokeObjCSlow(napi_env env, const v8::FunctionCallbackInfo<v8::Value>& info,
                    ObjCClassMember* method, MethodDescriptor* descriptor, Cif* cif, id self,
                    bool receiverIsClass, bool propertyAccess) {
  EngineDirectReturnStorage rvalueStorage(cif);
  if (!rvalueStorage.valid()) {
    throwV8Error(info.GetIsolate(),
                 "Unable to allocate return value storage for Objective-C call.");
    return false;
  }

  V8CifArgumentStorage argStorage(cif, 2);
  if (!argStorage.valid()) {
    throwV8Error(info.GetIsolate(),
                 "Unable to allocate argument storage for Objective-C call.");
    return false;
  }

  void* avalues[cif->cif.nargs];
  avalues[0] = (void*)&self;
  avalues[1] = (void*)&descriptor->selector;

  const size_t actualArgc = static_cast<size_t>(info.Length());
  const bool hasImplicitNSErrorOutArg =
      !cif->isVariadic && isNSErrorOutMethodSignature(descriptor, cif) &&
      actualArgc + 1 == cif->argc;
  NSError* implicitNSError = nil;

  bool shouldFreeAny = false;
  bool shouldFree[cif->argc];
  v8::Local<v8::Value> undefinedValue = v8::Undefined(info.GetIsolate());

  for (unsigned int i = 0; i < cif->argc; i++) {
    shouldFree[i] = false;
    avalues[i + 2] = argStorage.at(i);
    if (hasImplicitNSErrorOutArg && i == cif->argc - 1) {
      NSError** implicitNSErrorOutArg = &implicitNSError;
      *reinterpret_cast<void**>(avalues[i + 2]) = implicitNSErrorOutArg;
      continue;
    }

    v8::Local<v8::Value> argValue = i < actualArgc ? info[i] : undefinedValue;
    if (!TryFastConvertV8Argument(env, cif->argTypes[i]->kind, argValue, avalues[i + 2])) {
      cif->argTypes[i]->toNative(env, v8impl::JsValueFromV8LocalValue(argValue), avalues[i + 2],
                                 &shouldFree[i], &shouldFreeAny);
    }
  }

  void* rvalue = rvalueStorage.get();
  const bool didInvoke = invokeObjCPreparedOrFfi(env, cif, self, receiverIsClass, descriptor,
                                                 descriptor->dispatchFlags, avalues, rvalue);

  if (shouldFreeAny) {
    for (unsigned int i = 0; i < cif->argc; i++) {
      if (shouldFree[i]) {
        cif->argTypes[i]->free(env, *((void**)avalues[i + 2]));
      }
    }
  }

  if (!didInvoke) {
    return false;
  }

  if (hasImplicitNSErrorOutArg && implicitNSError != nil) {
    const char* errorMessage = [[implicitNSError description] UTF8String];
    NativeScriptException nativeScriptException(errorMessage != nullptr ? errorMessage
                                                                        : "Unknown NSError");
    throwNativeScriptExceptionToV8(env, info.GetIsolate(), nativeScriptException);
    return false;
  }

  setObjCReturnValue(env, info, method, descriptor, cif, self, receiverIsClass, rvalue,
                     propertyAccess);
  return true;
}

bool invokeObjCFast(napi_env env, const v8::FunctionCallbackInfo<v8::Value>& info,
                    ObjCClassMember* method, MethodDescriptor* descriptor, Cif* cif, id self,
                    bool propertyAccess) {
  if (env == nullptr || method == nullptr || descriptor == nullptr || cif == nullptr) {
    return false;
  }

  const bool receiverIsClass = object_isClass(self);
  Class receiverClass = receiverIsClass ? (Class)self : object_getClass(self);
  const bool requiresSuperCall = receiverClassRequiresSuperCall(receiverClass);
  const size_t actualArgc = static_cast<size_t>(info.Length());
  const bool isNSErrorOutMethod = isNSErrorOutMethodSignature(descriptor, cif);
  if (!cif->isVariadic && isNSErrorOutMethod) {
    if (actualArgc > cif->argc || actualArgc + 1 < cif->argc) {
      throwArgumentsCountError(info.GetIsolate(), actualArgc, cif->argc);
      return false;
    }
  }
  const bool hasImplicitNSErrorOutArg =
      isNSErrorOutMethod && !cif->isVariadic && actualArgc + 1 == cif->argc;
  const bool canUseGeneratedDispatch = !isNSErrorOutMethod && !requiresSuperCall;
  ObjCV8Invoker invoker =
      canUseGeneratedDispatch ? ensureObjCV8Invoker(cif, descriptor, descriptor->dispatchFlags)
                              : nullptr;
  if (invoker == nullptr) {
    return invokeObjCSlow(env, info, method, descriptor, cif, self, receiverIsClass,
                          propertyAccess);
  }

  const bool generatedDispatchSetsReturnDirectly =
      cif->generatedDispatchSetsV8ReturnDirectly;
  const bool generatedDispatchUsesObjectReturnStorage =
      !generatedDispatchSetsReturnDirectly && cif->generatedDispatchUsesObjectReturnStorage;
  const bool needsRoundTripCache = cif->generatedDispatchHasRoundTripCacheArgument;
  std::optional<EngineDirectRoundTripCacheFrameGuard> roundTripCacheFrame;
  if (needsRoundTripCache) {
    roundTripCacheFrame.emplace(env, method->bridgeState, true);
  }

  std::optional<EngineDirectReturnStorage> rvalueStorage;
  id objectRvalue = nil;
  void* rvalue = nullptr;
  if (generatedDispatchUsesObjectReturnStorage) {
    rvalue = &objectRvalue;
  } else if (!generatedDispatchSetsReturnDirectly) {
    rvalueStorage.emplace(cif);
    if (!rvalueStorage->valid()) {
      throwV8Error(info.GetIsolate(),
                   "Unable to allocate return value storage for Objective-C call.");
      return false;
    }
    rvalue = rvalueStorage->get();
  }

  bool didInvoke = false;
  bool didSetReturnValue = false;
  @try {
    didInvoke = invoker(env, cif, (void*)objc_msgSend, self, descriptor->selector,
                        method->bridgeState, method->returnOwned, receiverIsClass,
                        propertyAccess, info, rvalue, &didSetReturnValue);
  } @catch (NSException* exception) {
    std::string message = exception.description.UTF8String;
    NativeScriptException nativeScriptException(message);
    throwNativeScriptExceptionToV8(env, info.GetIsolate(), nativeScriptException);
    return false;
  }

  if (!didInvoke) {
    return invokeObjCSlow(env, info, method, descriptor, cif, self, receiverIsClass,
                          propertyAccess);
  }

  if (!didSetReturnValue) {
    setObjCReturnValue(env, info, method, descriptor, cif, self, receiverIsClass, rvalue,
                       propertyAccess);
  }
  return true;
}

void v8ObjCMethodCallback(const v8::FunctionCallbackInfo<v8::Value>& info) {
  auto* method = static_cast<ObjCClassMember*>(info.Data().As<v8::External>()->Value());
  napi_env env = method != nullptr && method->bridgeState != nullptr
                     ? method->bridgeState->env
                     : envFromCurrentContext(info.GetIsolate());
  if (env == nullptr || method == nullptr) {
    return;
  }

  id self = resolveSelf(env, info.This(), method);
  if (self == nil) {
    return;
  }

  MethodDescriptor* descriptor = nullptr;
  Cif* cif = nullptr;
  if (!selectV8MethodOverload(env, info, method, self, &descriptor, &cif)) {
    throwV8Error(info.GetIsolate(), "Unable to resolve native call signature.");
    return;
  }

  invokeObjCFast(env, info, method, descriptor, cif, self, false);
}

void v8ObjCGetterCallback(const v8::FunctionCallbackInfo<v8::Value>& info) {
  auto* method = static_cast<ObjCClassMember*>(info.Data().As<v8::External>()->Value());
  napi_env env = method != nullptr && method->bridgeState != nullptr
                     ? method->bridgeState->env
                     : envFromCurrentContext(info.GetIsolate());
  if (env == nullptr || method == nullptr) {
    return;
  }

  id self = resolveSelf(env, info.This(), method);
  if (self == nil) {
    return;
  }

  Cif* cif = method->cif;
  if (cif == nullptr) {
    cif = method->cif =
        method->bridgeState->getMethodCif(env, method->methodOrGetter.signatureOffset);
  }

  invokeObjCFast(env, info, method, &method->methodOrGetter, cif, self, true);
}

void v8ObjCSetterCallback(const v8::FunctionCallbackInfo<v8::Value>& info) {
  auto* method = static_cast<ObjCClassMember*>(info.Data().As<v8::External>()->Value());
  napi_env env = method != nullptr && method->bridgeState != nullptr
                     ? method->bridgeState->env
                     : envFromCurrentContext(info.GetIsolate());
  if (env == nullptr || method == nullptr) {
    return;
  }

  id self = resolveSelf(env, info.This(), method);
  if (self == nil) {
    return;
  }

  Cif* cif = method->setterCif;
  if (cif == nullptr) {
    cif = method->setterCif =
        method->bridgeState->getMethodCif(env, method->setter.signatureOffset);
  }

  invokeObjCFast(env, info, method, &method->setter, cif, self, true);
}

void v8ReadOnlySetterCallback(const v8::FunctionCallbackInfo<v8::Value>& info) {
  auto* method = info.Data().IsEmpty()
                     ? nullptr
                     : static_cast<ObjCClassMember*>(info.Data().As<v8::External>()->Value());
  napi_env env = method != nullptr && method->bridgeState != nullptr
                     ? method->bridgeState->env
                     : envFromCurrentContext(info.GetIsolate());
  throwV8Error(info.GetIsolate(), "Attempted to assign to readonly property.");
}

void setCFunctionReturnValue(napi_env env, const v8::FunctionCallbackInfo<v8::Value>& info,
                             CFunction* function, Cif* cif, void* rvalue) {
  if (cif == nullptr) {
    return;
  }

  if (cif->returnType->kind == mdTypeVoid) {
    info.GetReturnValue().Set(v8::Undefined(info.GetIsolate()));
    return;
  }

  v8::Local<v8::Value> fastResult;
  if (TryFastConvertV8ReturnValue(env, cif->returnType->kind, rvalue, &fastResult)) {
    info.GetReturnValue().Set(fastResult);
    return;
  }

  if (cif->returnType->kind == mdTypeNSStringObject &&
      TryFastConvertV8NSStringReturnValue(env, rvalue, &fastResult)) {
    info.GetReturnValue().Set(fastResult);
    return;
  }

  uint32_t toJSFlags = kCStringAsReference;
  if (function != nullptr && (function->dispatchFlags & 1) != 0) {
    toJSFlags |= kReturnOwned;
  }

  napi_value result = cif->returnType->toJS(env, rvalue, toJSFlags);
  info.GetReturnValue().Set(v8impl::V8LocalValueFromJsValue(result));
}

bool invokeCFunctionSlow(napi_env env, const v8::FunctionCallbackInfo<v8::Value>& info,
                         CFunction* function, Cif* cif) {
  if (function == nullptr || cif == nullptr) {
    return false;
  }

  void* avalues[cif->argc];
  bool shouldFreeAny = false;
  bool shouldFree[cif->argc];
  v8::Local<v8::Value> undefinedValue = v8::Undefined(info.GetIsolate());

  for (unsigned int i = 0; i < cif->argc; i++) {
    shouldFree[i] = false;
    avalues[i] = cif->avalues[i];
    v8::Local<v8::Value> argValue =
        i < static_cast<unsigned int>(info.Length()) ? info[i] : undefinedValue;
    if (!TryFastConvertV8Argument(env, cif->argTypes[i]->kind, argValue, avalues[i])) {
      cif->argTypes[i]->toNative(env, v8impl::JsValueFromV8LocalValue(argValue), avalues[i],
                                 &shouldFree[i], &shouldFreeAny);
    }
  }

  auto preparedInvoker = reinterpret_cast<CFunctionPreparedInvoker>(function->preparedInvoker);

  @try {
    if (preparedInvoker != nullptr) {
      preparedInvoker(function->fnptr, avalues, cif->rvalue);
    } else {
      ffi_call(&cif->cif, FFI_FN(function->fnptr), cif->rvalue, avalues);
    }
  } @catch (NSException* exception) {
    std::string message = exception.description.UTF8String;
    NativeScriptException nativeScriptException(message);
    throwNativeScriptExceptionToV8(env, info.GetIsolate(), nativeScriptException);
    return false;
  }

  if (shouldFreeAny) {
    void* returnPointerValue = nullptr;
    const bool returnIsPointer =
        cif->returnType != nullptr && cif->returnType->type == &ffi_type_pointer;
    if (returnIsPointer && cif->rvalue != nullptr) {
      returnPointerValue = *((void**)cif->rvalue);
    }

    for (unsigned int i = 0; i < cif->argc; i++) {
      if (shouldFree[i]) {
        if (returnPointerValue != nullptr && avalues[i] != nullptr) {
          void* argPointerValue = *((void**)avalues[i]);
          if (argPointerValue == returnPointerValue) {
            continue;
          }
        }
        cif->argTypes[i]->free(env, *((void**)avalues[i]));
      }
    }
  }

  setCFunctionReturnValue(env, info, function, cif, cif->rvalue);
  return true;
}

void v8CFunctionCallback(const v8::FunctionCallbackInfo<v8::Value>& info) {
  auto* binding = info.Data().IsEmpty()
                      ? nullptr
                      : static_cast<V8CFunctionBinding*>(info.Data().As<v8::External>()->Value());
  ObjCBridgeState* bridgeState = binding != nullptr ? binding->bridgeState : nullptr;
  napi_env env = bridgeState != nullptr ? bridgeState->env : envFromCurrentContext(info.GetIsolate());
  CFunction* function = binding != nullptr ? binding->function : nullptr;
  if (function == nullptr && bridgeState != nullptr && binding != nullptr) {
    function = bridgeState->getCFunction(env, binding->offset);
    binding->function = function;
  }
  if (env == nullptr || function == nullptr) {
    return;
  }

  Cif* cif = function != nullptr ? function->cif : nullptr;
  CFunctionV8Invoker invoker = ensureCFunctionV8Invoker(function, cif);

  bool didInvoke = false;
  bool didSetReturnValue = false;
  if (invoker != nullptr) {
    @try {
      didInvoke = invoker(env, cif, function->fnptr, info, cif->rvalue, &didSetReturnValue);
    } @catch (NSException* exception) {
      std::string message = exception.description.UTF8String;
      NativeScriptException nativeScriptException(message);
      throwNativeScriptExceptionToV8(env, info.GetIsolate(), nativeScriptException);
      return;
    }
  }

  if (!didInvoke) {
    invokeCFunctionSlow(env, info, function, cif);
    return;
  }

  if (!didSetReturnValue) {
    setCFunctionReturnValue(env, info, function, cif, cif->rvalue);
  }
}

bool isCompatLibdispatchFunction(ObjCBridgeState* bridgeState, MDSectionOffset offset) {
  if (bridgeState == nullptr) {
    return false;
  }

  const char* name = bridgeState->metadata->getString(offset);
  return strcmp(name, "dispatch_async") == 0 || strcmp(name, "dispatch_get_current_queue") == 0 ||
         strcmp(name, "dispatch_get_global_queue") == 0 || strcmp(name, "UIApplicationMain") == 0 ||
         strcmp(name, "NSApplicationMain") == 0;
}

bool defineV8FunctionProperty(napi_env env, v8::Local<v8::Object> object,
                              v8::Local<v8::Name> propertyName, v8::Local<v8::Function> function,
                              napi_property_attributes attributes) {
  v8::PropertyDescriptor descriptor(function, (attributes & napi_writable) != 0);
  descriptor.set_enumerable((attributes & napi_enumerable) != 0);
  descriptor.set_configurable((attributes & napi_configurable) != 0);

  return object->DefineProperty(env->context(), propertyName, descriptor).FromMaybe(false);
}

bool defineV8AccessorProperty(napi_env env, v8::Local<v8::Object> object,
                              v8::Local<v8::Name> propertyName, v8::Local<v8::Function> getter,
                              v8::Local<v8::Function> setter, napi_property_attributes attributes) {
  v8::PropertyDescriptor descriptor(getter, setter);
  descriptor.set_enumerable((attributes & napi_enumerable) != 0);
  descriptor.set_configurable((attributes & napi_configurable) != 0);

  return object->DefineProperty(env->context(), propertyName, descriptor).FromMaybe(false);
}

}  // namespace

bool V8TryDefineFastNativeProperty(napi_env env, v8::Local<v8::Object> object,
                                   v8::Local<v8::Name> propertyName,
                                   const napi_property_descriptor* descriptor) {
#if !NS_GSD_BACKEND_V8
  return false;
#else
  if (env == nullptr || descriptor == nullptr) {
    return false;
  }

  v8::Local<v8::Context> context = env->context();

  if (descriptor->method == ObjCClassMember::jsCall) {
    auto* method = static_cast<ObjCClassMember*>(descriptor->data);
    if (method == nullptr || !method->overloads.empty()) {
      return false;
    }

    Cif* cif = method->cif;
    if (cif == nullptr) {
      cif = method->cif =
          method->bridgeState->getMethodCif(env, method->methodOrGetter.signatureOffset);
    }

    v8::Local<v8::Function> function;
    if (!v8::Function::New(context, v8ObjCMethodCallback, v8::External::New(env->isolate, method))
             .ToLocal(&function)) {
      return false;
    }

    return defineV8FunctionProperty(env, object, propertyName, function, descriptor->attributes);
  }

  if (descriptor->method == CFunction::jsCall) {
    auto offset = static_cast<MDSectionOffset>(reinterpret_cast<uintptr_t>(descriptor->data));
    ObjCBridgeState* bridgeState = ObjCBridgeState::InstanceData(env);
    if (isCompatLibdispatchFunction(bridgeState, offset)) {
      return false;
    }

    if (bridgeState == nullptr) {
      return false;
    }

    auto* binding = new V8CFunctionBinding{bridgeState, offset, nullptr};
    v8::Local<v8::Function> functionValue;
    if (!v8::Function::New(context, v8CFunctionCallback, v8::External::New(env->isolate, binding))
             .ToLocal(&functionValue)) {
      delete binding;
      return false;
    }

    return defineV8FunctionProperty(env, object, propertyName, functionValue,
                                    descriptor->attributes);
  }

  if (descriptor->getter == ObjCClassMember::jsGetter && descriptor->data != nullptr) {
    auto* method = static_cast<ObjCClassMember*>(descriptor->data);
    Cif* getterCif = method->cif;
    if (getterCif == nullptr) {
      getterCif = method->cif =
          method->bridgeState->getMethodCif(env, method->methodOrGetter.signatureOffset);
    }

    v8::Local<v8::Function> getter;
    if (!v8::Function::New(context, v8ObjCGetterCallback, v8::External::New(env->isolate, method))
             .ToLocal(&getter)) {
      return false;
    }

    v8::Local<v8::Function> setter;
    if (descriptor->setter == ObjCClassMember::jsReadOnlySetter) {
      if (!v8::Function::New(context, v8ReadOnlySetterCallback,
                             v8::External::New(env->isolate, method))
               .ToLocal(&setter)) {
        return false;
      }
    } else if (descriptor->setter == ObjCClassMember::jsSetter) {
      Cif* setterCif = method->setterCif;
      if (setterCif == nullptr) {
        setterCif = method->setterCif =
            method->bridgeState->getMethodCif(env, method->setter.signatureOffset);
      }
      if (!v8::Function::New(context, v8ObjCSetterCallback, v8::External::New(env->isolate, method))
               .ToLocal(&setter)) {
        return false;
      }
    } else if (descriptor->setter != nullptr) {
      return false;
    }

    return defineV8AccessorProperty(env, object, propertyName, getter, setter,
                                    descriptor->attributes);
  }

  return false;
#endif
}

}  // namespace nativescript

#endif  // TARGET_ENGINE_V8

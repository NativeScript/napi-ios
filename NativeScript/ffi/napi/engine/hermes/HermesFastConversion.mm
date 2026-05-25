#include "HermesFastNativeApiPrivate.h"

#ifdef TARGET_ENGINE_HERMES

namespace nativescript {
namespace {
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

bool tryFastConvertHermesSelectorArgument(napi_env env, napi_value value,
                                          SEL* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  struct SelectorArgumentCacheEntry {
    napi_env env = nullptr;
    uint64_t rawValue = 0;
    SEL selector = nullptr;
  };

  static thread_local SelectorArgumentCacheEntry lastSelectorArgument;
  const uint64_t rawValue = hermesRawValueBits(value);
  if (rawValue != 0 && lastSelectorArgument.env == env &&
      lastSelectorArgument.rawValue == rawValue &&
      lastSelectorArgument.selector != nullptr) {
    *result = lastSelectorArgument.selector;
    return true;
  }

  constexpr size_t kStackCapacity = 256;
  char stackBuffer[kStackCapacity];
  size_t length = 0;
  napi_status status = napi_get_value_string_utf8(
      env, value, stackBuffer, kStackCapacity, &length);
  if (status == napi_ok && length + 1 < kStackCapacity) {
    SEL selector = cachedSelectorForName(stackBuffer, length);
    lastSelectorArgument = {env, rawValue, selector};
    *result = selector;
    return true;
  }

  if (status == napi_ok || status == napi_string_expected) {
    if (status == napi_string_expected) {
      napi_valuetype valueType = napi_undefined;
      if (napi_typeof(env, value, &valueType) == napi_ok &&
          (valueType == napi_null || valueType == napi_undefined)) {
        *result = nullptr;
        return true;
      }
      return false;
    }

    if (napi_get_value_string_utf8(env, value, nullptr, 0, &length) !=
        napi_ok) {
      return false;
    }

    std::vector<char> heapBuffer(length + 1, '\0');
    if (napi_get_value_string_utf8(env, value, heapBuffer.data(),
                                   heapBuffer.size(), &length) != napi_ok) {
      return false;
    }
    SEL selector = cachedSelectorForName(heapBuffer.data(), length);
    lastSelectorArgument = {env, rawValue, selector};
    *result = selector;
    return true;
  }

  return false;
}

bool tryFastConvertHermesStringToNSStringArgument(napi_env env,
                                                  napi_value value,
                                                  id* result,
                                                  bool mutableString) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  if (mutableString) {
    constexpr size_t kStackUtf16Capacity = 128;
    char16_t utf16Stack[kStackUtf16Capacity];
    char16_t* utf16Buffer = utf16Stack;
    size_t utf16Capacity = kStackUtf16Capacity;
    size_t utf16Length = 0;
    if (napi_get_value_string_utf16(env, value, utf16Buffer, utf16Capacity,
                                    &utf16Length) != napi_ok) {
      return false;
    }

    std::vector<char16_t> utf16Heap;
    if (utf16Length + 1 >= utf16Capacity) {
      if (napi_get_value_string_utf16(env, value, nullptr, 0, &utf16Length) !=
          napi_ok) {
        return false;
      }
      utf16Heap.resize(utf16Length + 1, 0);
      utf16Buffer = utf16Heap.data();
      utf16Capacity = utf16Heap.size();
      if (napi_get_value_string_utf16(env, value, utf16Buffer, utf16Capacity,
                                      &utf16Length) != napi_ok) {
        return false;
      }
    }

    *result =
        [[[NSMutableString alloc]
            initWithCharacters:reinterpret_cast<const unichar*>(utf16Buffer)
                        length:utf16Length] autorelease];
    return true;
  }

  constexpr size_t kStackUtf8Capacity = 256;
  char utf8Stack[kStackUtf8Capacity];
  char* utf8Buffer = utf8Stack;
  size_t utf8Capacity = kStackUtf8Capacity;
  size_t utf8Length = 0;
  if (napi_get_value_string_utf8(env, value, utf8Buffer, utf8Capacity,
                                 &utf8Length) != napi_ok) {
    return false;
  }

  std::vector<char> utf8Heap;
  if (utf8Length + 1 >= utf8Capacity) {
    if (napi_get_value_string_utf8(env, value, nullptr, 0, &utf8Length) !=
        napi_ok) {
      return false;
    }
    utf8Heap.resize(utf8Length + 1, '\0');
    utf8Buffer = utf8Heap.data();
    utf8Capacity = utf8Heap.size();
    if (napi_get_value_string_utf8(env, value, utf8Buffer, utf8Capacity,
                                   &utf8Length) != napi_ok) {
      return false;
    }
  }

  id stringValue = [[[NSString alloc] initWithBytes:utf8Buffer
                                             length:utf8Length
                                           encoding:NSUTF8StringEncoding]
      autorelease];
  *result = stringValue != nil ? stringValue : [NSString string];
  return true;
}

id resolveCachedHermesHandleObject(napi_env env, void* handle) {
  if (env == nullptr || handle == nullptr) {
    return nil;
  }

  ObjCBridgeState* bridgeState = ObjCBridgeState::InstanceData(env);
  if (bridgeState == nullptr) {
    return nil;
  }

  napi_value cachedValue = bridgeState->getCachedHandleObject(env, handle);
  if (cachedValue == nullptr) {
    return nil;
  }

  void* wrapped = nullptr;
  if (napi_unwrap(env, cachedValue, &wrapped) == napi_ok && wrapped != nullptr) {
    bridgeState->cacheRoundTripObject(env, static_cast<id>(wrapped), cachedValue);
    return static_cast<id>(wrapped);
  }

  bool hasNativePointer = false;
  if (napi_has_named_property(env, cachedValue, kHermesNativePointerProperty,
                              &hasNativePointer) == napi_ok &&
      hasNativePointer) {
    napi_value nativePointerValue = nullptr;
    if (napi_get_named_property(env, cachedValue, kHermesNativePointerProperty,
                                &nativePointerValue) == napi_ok) {
      if (Pointer::isInstance(env, nativePointerValue)) {
        Pointer* pointer = Pointer::unwrap(env, nativePointerValue);
        if (pointer != nullptr && pointer->data != nullptr) {
          bridgeState->cacheRoundTripObject(
              env, static_cast<id>(pointer->data), cachedValue);
          return static_cast<id>(pointer->data);
        }
      } else {
        void* nativePointer = nullptr;
        if (napi_get_value_external(env, nativePointerValue,
                                    &nativePointer) == napi_ok &&
            nativePointer != nullptr) {
          bridgeState->cacheRoundTripObject(
              env, static_cast<id>(nativePointer), cachedValue);
          return static_cast<id>(nativePointer);
        }
      }
    }
  }

  return nil;
}

bool tryFastUnwrapHermesObjectArgument(napi_env env, MDTypeKind kind,
                                       napi_value value, void* result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  struct ObjectArgumentCacheEntry {
    napi_env env = nullptr;
    uint64_t rawValue = 0;
    id nativeObject = nil;
    bool classObject = false;
    ObjCBridgeState* bridgeState = nullptr;
    uint64_t objectRefsGeneration = 0;
  };

  static thread_local ObjectArgumentCacheEntry objectArgumentCache[8];
  static thread_local unsigned int nextObjectArgumentCacheSlot = 0;
  static thread_local ObjectArgumentCacheEntry lastObjectArgument;

  const uint64_t rawValue = hermesRawValueBits(value);
  if (rawValue != 0) {
    if (lastObjectArgument.env == env &&
        lastObjectArgument.rawValue == rawValue &&
        lastObjectArgument.nativeObject != nil) {
      bool lastValid = lastObjectArgument.classObject;
      if (!lastValid && lastObjectArgument.bridgeState != nullptr &&
          lastObjectArgument.objectRefsGeneration != 0 &&
          lastObjectArgument.bridgeState->currentObjectRefsGeneration() ==
              lastObjectArgument.objectRefsGeneration) {
        lastValid = true;
      }

      if (lastValid) {
        if (kind == mdTypeClass) {
          if (!lastObjectArgument.classObject) {
            return false;
          }
          *reinterpret_cast<Class*>(result) =
              static_cast<Class>(lastObjectArgument.nativeObject);
          return true;
        }

        *reinterpret_cast<id*>(result) = lastObjectArgument.nativeObject;
        return true;
      }
      lastObjectArgument.rawValue = 0;
    }

    for (auto& entry : objectArgumentCache) {
      if (entry.env != env || entry.rawValue != rawValue ||
          entry.nativeObject == nil) {
        continue;
      }

      if (!entry.classObject) {
        if (entry.bridgeState == nullptr ||
            entry.objectRefsGeneration == 0 ||
            entry.bridgeState->currentObjectRefsGeneration() !=
                entry.objectRefsGeneration) {
          entry.rawValue = 0;
          continue;
        }
      }

      if (kind == mdTypeClass) {
        if (!entry.classObject) {
          return false;
        }
        lastObjectArgument = entry;
        *reinterpret_cast<Class*>(result) =
            static_cast<Class>(entry.nativeObject);
        return true;
      }

      lastObjectArgument = entry;
      *reinterpret_cast<id*>(result) = entry.nativeObject;
      return true;
    }
  }

  auto rememberObjectArgument = [&](id nativeObject,
                                    ObjCBridgeState* bridgeState) {
    if (nativeObject == nil || rawValue == 0) {
      return;
    }

    const bool classObject = object_isClass(nativeObject);
    uint64_t objectRefsGeneration = 0;
    if (!classObject) {
      if (bridgeState == nullptr) {
        bridgeState = ObjCBridgeState::InstanceData(env);
      }
      if (bridgeState == nullptr) {
        return;
      }
      if (!bridgeState->hasObjectRef(nativeObject)) {
        return;
      }
      objectRefsGeneration = bridgeState->currentObjectRefsGeneration();
    }

    auto& entry = objectArgumentCache[nextObjectArgumentCacheSlot++ & 7];
    entry.env = env;
    entry.rawValue = rawValue;
    entry.nativeObject = nativeObject;
    entry.classObject = classObject;
    entry.bridgeState = bridgeState;
    entry.objectRefsGeneration = objectRefsGeneration;
    lastObjectArgument = entry;
  };

  auto setPointerLikeObject = [&](void* data) -> bool {
    id nativeObject = nil;
    if (id cachedObject = resolveCachedHermesHandleObject(env, data);
        cachedObject != nil) {
      nativeObject = cachedObject;
      rememberObjectArgument(nativeObject, nullptr);
    } else {
      nativeObject = static_cast<id>(data);
    }

    if (kind == mdTypeClass) {
      if (nativeObject == nil || !object_isClass(nativeObject)) {
        return false;
      }
      *reinterpret_cast<Class*>(result) = static_cast<Class>(nativeObject);
      return true;
    }

    *reinterpret_cast<id*>(result) = nativeObject;
    return true;
  };

  ObjCBridgeState* bridgeState = nullptr;
  if (kind == mdTypeClass) {
    bridgeState = ObjCBridgeState::InstanceData(env);
    Class bridgedClass = nil;
    if (bridgeState != nullptr &&
        bridgeState->tryResolveBridgedClassConstructor(env, value,
                                                       &bridgedClass) &&
        bridgedClass != nil) {
      rememberObjectArgument(static_cast<id>(bridgedClass), bridgeState);
      *reinterpret_cast<Class*>(result) = bridgedClass;
      return true;
    }
  } else {
    bridgeState = ObjCBridgeState::InstanceData(env);
    id bridgedType = nil;
    if (bridgeState != nullptr &&
        bridgeState->tryResolveBridgedTypeConstructor(env, value,
                                                     &bridgedType) &&
        bridgedType != nil) {
      rememberObjectArgument(bridgedType, bridgeState);
      *reinterpret_cast<id*>(result) = bridgedType;
      return true;
    }
  }

  if (Pointer::isInstance(env, value)) {
    Pointer* pointer = Pointer::unwrap(env, value);
    return setPointerLikeObject(pointer != nullptr ? pointer->data : nullptr);
  }

  if (Reference::isInstance(env, value)) {
    Reference* reference = Reference::unwrap(env, value);
    return setPointerLikeObject(reference != nullptr ? reference->data : nullptr);
  }

  void* wrapped = nullptr;
  if (napi_unwrap(env, value, &wrapped) != napi_ok || wrapped == nullptr) {
    return false;
  }

  if (kind == mdTypeClass) {
    id nativeObject = static_cast<id>(wrapped);
    ObjCBridgeState* bridgeState = nullptr;
    if (!object_isClass(nativeObject)) {
      bridgeState = ObjCBridgeState::InstanceData(env);
      if (bridgeState != nullptr) {
        id normalizedObject = bridgeState->nativeObjectForBridgeWrapper(wrapped);
        if (normalizedObject != nil) {
          nativeObject = normalizedObject;
        }
      }
    }
    if (!object_isClass(nativeObject)) {
      return false;
    }
    rememberObjectArgument(nativeObject, bridgeState);
    *reinterpret_cast<Class*>(result) = static_cast<Class>(nativeObject);
    return true;
  }

  id nativeObject = static_cast<id>(wrapped);
  if (bridgeState == nullptr) {
    bridgeState = ObjCBridgeState::InstanceData(env);
  }
  if (bridgeState != nullptr && bridgeState->hasRoundTripCacheFrame()) {
    bridgeState->cacheRoundTripObject(env, nativeObject, value);
  }
  rememberObjectArgument(nativeObject, nullptr);
  *reinterpret_cast<id*>(result) = nativeObject;
  return true;
}


bool tryFastConvertHermesNSStringReturnValue(napi_env env, NSString* str,
                                             napi_value* result) {
  if (env == nullptr || result == nullptr || str == nil) {
    return false;
  }

  const NSUInteger length = [str length];
  constexpr NSUInteger kStackCapacity = 256;
  char16_t stackBuffer[kStackCapacity];
  char16_t* buffer = stackBuffer;

  if (length > kStackCapacity) {
    buffer = static_cast<char16_t*>(
        std::malloc(sizeof(char16_t) * static_cast<size_t>(length)));
    if (buffer == nullptr) {
      return false;
    }
  }

  if (length > 0) {
    [str getCharacters:reinterpret_cast<unichar*>(buffer)
                 range:NSMakeRange(0, length)];
  }

  napi_status status = napi_create_string_utf16(
      env, buffer, static_cast<size_t>(length), result);
  if (buffer != stackBuffer) {
    std::free(buffer);
  }

  return status == napi_ok;
}

bool tryFastConvertHermesBoxedPrimitiveReturnValue(
    napi_env env, Cif* cif, id value, napi_value* result,
    bool* recognizedFoundationObject = nullptr) {
  if (recognizedFoundationObject != nullptr) {
    *recognizedFoundationObject = false;
  }
  if (env == nullptr || result == nullptr || value == nil) {
    return false;
  }

  Class valueClass = object_getClass(value);
  static thread_local Class lastNonBoxedPrimitiveClasses[8] = {};
  static thread_local unsigned int nextNonBoxedPrimitiveClassSlot = 0;
  for (Class cachedClass : lastNonBoxedPrimitiveClasses) {
    if (cachedClass == valueClass) {
      return false;
    }
  }

  if ([value isKindOfClass:[NSNumber class]]) {
    if (recognizedFoundationObject != nullptr) {
      *recognizedFoundationObject = true;
    }
    if ([value isKindOfClass:[NSDecimalNumber class]]) {
      return false;
    }
    if (CFGetTypeID((CFTypeRef)value) == CFBooleanGetTypeID()) {
      *result = makeHermesRawBoolValue(cif, [value boolValue] == YES);
      return true;
    }
    *result = makeHermesRawNumberValue(cif, [value doubleValue]);
    return true;
  }

  if ([value isKindOfClass:[NSNull class]]) {
    if (recognizedFoundationObject != nullptr) {
      *recognizedFoundationObject = true;
    }
    return napi_get_null(env, result) == napi_ok;
  }

  if (valueClass != nil) {
    lastNonBoxedPrimitiveClasses[nextNonBoxedPrimitiveClassSlot++ & 7] =
        valueClass;
  }

  return false;
}

bool tryFastConvertHermesFoundationObject(napi_env env, Cif* cif, id value,
                                          napi_value* result,
                                          bool* recognizedFoundationObject = nullptr) {
  if (recognizedFoundationObject != nullptr) {
    *recognizedFoundationObject = false;
  }
  if (env == nullptr || result == nullptr || value == nil) {
    return false;
  }

  Class valueClass = object_getClass(value);
  static thread_local Class lastNonFoundationObjectClasses[8] = {};
  static thread_local unsigned int nextNonFoundationObjectClassSlot = 0;
  for (Class cachedClass : lastNonFoundationObjectClasses) {
    if (cachedClass == valueClass) {
      return false;
    }
  }

  if ([value isKindOfClass:[NSString class]]) {
    if (recognizedFoundationObject != nullptr) {
      *recognizedFoundationObject = true;
    }
    return tryFastConvertHermesNSStringReturnValue(
        env, static_cast<NSString*>(value), result);
  }

  if (tryFastConvertHermesBoxedPrimitiveReturnValue(
          env, cif, value, result, recognizedFoundationObject)) {
    return true;
  }

  if (recognizedFoundationObject == nullptr ||
      !*recognizedFoundationObject) {
    lastNonFoundationObjectClasses[nextNonFoundationObjectClassSlot++ & 7] =
        valueClass;
  }

  return false;
}

inline bool isHermesNSStringFactorySelector(SEL selector) {
  return selector == @selector(string) ||
         selector == @selector(stringWithString:) ||
         selector == @selector(stringWithCapacity:);
}

inline bool isHermesNSStringFactoryClass(Class cls) {
  return cls == [NSString class] || cls == [NSMutableString class];
}

inline bool shouldWrapHermesNSStringFactoryReturn(SEL selector,
                                                  bool classMethod,
                                                  bool receiverIsClass,
                                                  id self,
                                                  Class declaredClass) {
  if (!classMethod || !isHermesNSStringFactorySelector(selector)) {
    return false;
  }

  if (isHermesNSStringFactoryClass(declaredClass)) {
    return true;
  }

  if (!receiverIsClass || self == nil) {
    return false;
  }

  return isHermesNSStringFactoryClass(static_cast<Class>(self));
}

}  // namespace

napi_value makeHermesObjCReturnValue(napi_env env, ObjCClassMember* member,
                                     MethodDescriptor* descriptor, Cif* cif,
                                     id self, bool receiverIsClass,
                                     napi_value jsThis, void* rvalue,
                                     bool propertyAccess) {
  if (member == nullptr || descriptor == nullptr || cif == nullptr ||
      cif->returnType == nullptr) {
    return nullptr;
  }

  napi_value fastResult = nullptr;
  if (TryFastConvertHermesReturnValue(env, cif, cif->returnType->kind, rvalue,
                                      &fastResult)) {
    return fastResult;
  }

  if (descriptor->selector == @selector(class)) {
    if (!propertyAccess && !receiverIsClass) {
      napi_value constructor = jsThis;
      napi_get_named_property(env, jsThis, "constructor", &constructor);
      return constructor;
    }

    id classObject = receiverIsClass ? self : static_cast<id>(object_getClass(self));
    return member->bridgeState->getObject(env, classObject, kUnownedObject, 0, nullptr);
  }

  if (cif->returnType->kind == mdTypeAnyObject ||
      cif->returnType->kind == mdTypeNSStringObject ||
      cif->returnType->kind == mdTypeNSMutableStringObject) {
    id obj = *reinterpret_cast<id*>(rvalue);
    Class declaredClass = member->cls != nullptr ? member->cls->nativeClass : nil;
    if (obj != nil && shouldWrapHermesNSStringFactoryReturn(
                          descriptor->selector, member->classMethod,
                          receiverIsClass, self, declaredClass)) {
      return member->bridgeState->getObject(env, obj, jsThis, kUnownedObject);
    }
  }

  if (cif->returnType->kind == mdTypeInstanceObject) {
    id obj = *reinterpret_cast<id*>(rvalue);
    napi_value boxedPrimitiveResult = nullptr;
    if (tryFastConvertHermesBoxedPrimitiveReturnValue(
            env, cif, obj, &boxedPrimitiveResult)) {
      return boxedPrimitiveResult;
    }

    if (obj != nil) {
      ObjCBridgeState* state = member->bridgeState;
      if (state != nullptr) {
        if (napi_value cached = state->findCachedObjectWrapper(env, obj);
            cached != nullptr) {
          return cached;
        }
      }
    }

    napi_value constructor = jsThis;
    if (!receiverIsClass) {
      napi_get_named_property(env, jsThis, "constructor", &constructor);
    }

    return member->bridgeState->getObject(
        env, obj, constructor, member->returnOwned ? kOwnedObject : kUnownedObject);
  }

  if (cif->returnType->kind == mdTypeAnyObject ||
      cif->returnType->kind == mdTypeProtocolObject ||
      cif->returnType->kind == mdTypeClassObject) {
    id obj = *reinterpret_cast<id*>(rvalue);
    napi_value foundationResult = nullptr;
    bool recognizedFoundationObject = false;
    if (tryFastConvertHermesFoundationObject(
            env, cif, obj, &foundationResult, &recognizedFoundationObject)) {
      return foundationResult;
    }

    if (obj != nil && !recognizedFoundationObject) {
      ObjCBridgeState* state = member->bridgeState;
      if (state != nullptr) {
        if (napi_value cached = state->findCachedObjectWrapper(env, obj);
            cached != nullptr) {
          return cached;
        }
      }
    }
  }

  if (cif->returnType->kind == mdTypeNSStringObject) {
    NSString* str = *reinterpret_cast<NSString**>(rvalue);
    napi_value stringResult = nullptr;
    if (tryFastConvertHermesNSStringReturnValue(env, str, &stringResult)) {
      return stringResult;
    }
  }

  return cif->returnType->toJS(env, rvalue,
                               member->returnOwned ? kReturnOwned : 0);
}

napi_value makeHermesCFunctionReturnValue(napi_env env, CFunction* function,
                                          Cif* cif, void* rvalue) {
  if (cif == nullptr || cif->returnType == nullptr) {
    return nullptr;
  }

  napi_value fastResult = nullptr;
  if (TryFastConvertHermesReturnValue(env, cif, cif->returnType->kind, rvalue,
                                      &fastResult)) {
    return fastResult;
  }

  if (cif->returnType->kind == mdTypeNSStringObject) {
    NSString* str = *reinterpret_cast<NSString**>(rvalue);
    napi_value stringResult = nullptr;
    if (tryFastConvertHermesNSStringReturnValue(env, str, &stringResult)) {
      return stringResult;
    }
  } else if (cif->returnType->kind == mdTypeInstanceObject) {
    id obj = *reinterpret_cast<id*>(rvalue);
    napi_value boxedPrimitiveResult = nullptr;
    if (tryFastConvertHermesBoxedPrimitiveReturnValue(
            env, cif, obj, &boxedPrimitiveResult)) {
      return boxedPrimitiveResult;
    }
  } else if (cif->returnType->kind == mdTypeAnyObject ||
             cif->returnType->kind == mdTypeProtocolObject ||
             cif->returnType->kind == mdTypeClassObject) {
    id obj = *reinterpret_cast<id*>(rvalue);
    napi_value foundationResult = nullptr;
    if (tryFastConvertHermesFoundationObject(env, cif, obj, &foundationResult)) {
      return foundationResult;
    }
  }

  uint32_t toJSFlags = kCStringAsReference;
  if (function != nullptr && (function->dispatchFlags & 1) != 0) {
    toJSFlags |= kReturnOwned;
  }
  return cif->returnType->toJS(env, rvalue, toJSFlags);
}

bool TryFastSetHermesGeneratedObjCObjectReturnValue(
    napi_env env, Cif* cif, const HermesObjCReturnContext* context,
    SEL selector, MDTypeKind kind, id value, napi_value* result) {
  if (env == nullptr || cif == nullptr || cif->returnType == nullptr ||
      context == nullptr || result == nullptr) {
    return false;
  }

  ObjCBridgeState* bridgeState =
      static_cast<ObjCBridgeState*>(context->bridgeState);
  if (bridgeState == nullptr) {
    return false;
  }

  if (value == nil && selector != @selector(class)) {
    return napi_get_null(env, result) == napi_ok;
  }

  if (selector == @selector(class)) {
    if (!context->propertyAccess && !context->receiverIsClass &&
        context->jsThis != nullptr) {
      napi_value constructor = context->jsThis;
      napi_get_named_property(env, context->jsThis, "constructor", &constructor);
      *result = constructor;
      return true;
    }

    id classObject = context->receiverIsClass
                         ? context->self
                         : static_cast<id>(object_getClass(context->self));
    *result = bridgeState->getObject(env, classObject, kUnownedObject, 0, nullptr);
    return *result != nullptr;
  }

  if (kind == mdTypeInstanceObject) {
    napi_value boxedPrimitiveResult = nullptr;
    if (tryFastConvertHermesBoxedPrimitiveReturnValue(
            env, cif, value, &boxedPrimitiveResult)) {
      *result = boxedPrimitiveResult;
      return true;
    }

    if (value != nil) {
      if (napi_value cached = bridgeState->findCachedObjectWrapper(env, value);
          cached != nullptr) {
        *result = cached;
        return true;
      }
    }

    napi_value constructor = context->jsThis;
    if (!context->receiverIsClass && context->jsThis != nullptr) {
      napi_get_named_property(env, context->jsThis, "constructor", &constructor);
    }

    *result = bridgeState->getObject(
        env, value, constructor,
        context->returnOwned ? kOwnedObject : kUnownedObject);
    return *result != nullptr;
  }

  if ((kind == mdTypeAnyObject || kind == mdTypeNSStringObject ||
       kind == mdTypeNSMutableStringObject) &&
      value != nil && shouldWrapHermesNSStringFactoryReturn(
                          selector, context->classMethod,
                          context->receiverIsClass, context->self,
                          context->declaredClass)) {
    *result =
        bridgeState->getObject(env, value, context->jsThis, kUnownedObject);
    return *result != nullptr;
  }

  if (kind == mdTypeNSStringObject) {
    return tryFastConvertHermesNSStringReturnValue(
        env, static_cast<NSString*>(value), result);
  }

  if (kind == mdTypeAnyObject || kind == mdTypeProtocolObject ||
      kind == mdTypeClassObject) {
    napi_value foundationResult = nullptr;
    bool recognizedFoundationObject = false;
    if (tryFastConvertHermesFoundationObject(
            env, cif, value, &foundationResult, &recognizedFoundationObject)) {
      *result = foundationResult;
      return true;
    }

    if (value != nil && !recognizedFoundationObject) {
      if (napi_value cached = bridgeState->findCachedObjectWrapper(env, value);
          cached != nullptr) {
        *result = cached;
        return true;
      }
    }
  }

  uint32_t toJSFlags = context->returnOwned ? kReturnOwned : 0;
  *result = cif->returnType->toJS(env, &value, toJSFlags);
  return *result != nullptr;
}

bool TryFastConvertHermesBoolArgument(napi_env env, napi_value value,
                                      uint8_t* result) {
  if (value == nullptr || result == nullptr) {
    return false;
  }

  const uint64_t raw = *reinterpret_cast<const uint64_t*>(value);
  if (!isHermesBool(raw)) {
    return false;
  }
  *result = (raw & kHermesBoolBit) != 0 ? static_cast<uint8_t>(1)
                                        : static_cast<uint8_t>(0);
  return true;
}

bool TryFastConvertHermesDoubleArgument(napi_env env, napi_value value,
                                        double* result) {
  return readHermesFiniteNumber(value, result);
}

bool TryFastConvertHermesFloatArgument(napi_env env, napi_value value,
                                       float* result) {
  double converted = 0.0;
  if (!TryFastConvertHermesDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<float>(converted);
  return true;
}

bool TryFastConvertHermesInt8Argument(napi_env env, napi_value value,
                                      int8_t* result) {
  double converted = 0.0;
  if (!TryFastConvertHermesDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<int8_t>(converted);
  return true;
}

bool TryFastConvertHermesUInt8Argument(napi_env env, napi_value value,
                                       uint8_t* result) {
  double converted = 0.0;
  if (!TryFastConvertHermesDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<uint8_t>(converted);
  return true;
}

bool TryFastConvertHermesInt16Argument(napi_env env, napi_value value,
                                       int16_t* result) {
  double converted = 0.0;
  if (!TryFastConvertHermesDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<int16_t>(converted);
  return true;
}

bool TryFastConvertHermesUInt16Argument(napi_env env, napi_value value,
                                        uint16_t* result) {
  if (value == nullptr || result == nullptr) {
    return false;
  }

  double converted = 0.0;
  if (readHermesFiniteNumber(value, &converted)) {
    *result = static_cast<uint16_t>(converted);
    return true;
  }
  return TryFastConvertNapiUInt16Argument(env, value, result);
}

bool TryFastConvertHermesInt32Argument(napi_env env, napi_value value,
                                       int32_t* result) {
  double converted = 0.0;
  if (!TryFastConvertHermesDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<int32_t>(converted);
  return true;
}

bool TryFastConvertHermesUInt32Argument(napi_env env, napi_value value,
                                        uint32_t* result) {
  double converted = 0.0;
  if (!TryFastConvertHermesDoubleArgument(env, value, &converted)) {
    return false;
  }
  *result = static_cast<uint32_t>(converted);
  return true;
}

bool TryFastConvertHermesInt64Argument(napi_env env, napi_value value,
                                       int64_t* result) {
  if (value == nullptr || result == nullptr) {
    return false;
  }

  double converted = 0.0;
  if (readHermesFiniteNumber(value, &converted)) {
    *result = static_cast<int64_t>(converted);
    return true;
  }

  bool lossless = false;
  return napi_get_value_bigint_int64(env, value, result, &lossless) == napi_ok &&
         lossless;
}

bool TryFastConvertHermesUInt64Argument(napi_env env, napi_value value,
                                        uint64_t* result) {
  if (value == nullptr || result == nullptr) {
    return false;
  }

  double converted = 0.0;
  if (readHermesFiniteNumber(value, &converted)) {
    *result = static_cast<uint64_t>(converted);
    return true;
  }

  bool lossless = false;
  return napi_get_value_bigint_uint64(env, value, result, &lossless) == napi_ok &&
         lossless;
}

bool TryFastConvertHermesSelectorArgument(napi_env env, napi_value value,
                                          SEL* result) {
  return tryFastConvertHermesSelectorArgument(env, value, result);
}

bool TryFastConvertHermesObjectArgument(napi_env env, MDTypeKind kind,
                                        napi_value value, void* result) {
  if (value == nullptr || result == nullptr) {
    return false;
  }

  const bool isNSStringKind =
      kind == mdTypeNSStringObject || kind == mdTypeNSMutableStringObject;
  if (kind != mdTypeClass && !isNSStringKind) {
    const uint64_t raw = hermesRawValueBits(value);
    if (isHermesBool(raw)) {
      *reinterpret_cast<id*>(result) =
          [NSNumber numberWithBool:(raw & kHermesBoolBit) != 0];
      return true;
    }
    if (isHermesNumber(raw)) {
      *reinterpret_cast<id*>(result) =
          [NSNumber numberWithDouble:hermesRawToDouble(raw)];
      return true;
    }
  }

  if (tryFastUnwrapHermesObjectArgument(env, kind, value, result)) {
    return true;
  }
  return false;
}

bool TryFastConvertHermesPointerArgument(napi_env env, MDTypeKind kind,
                                         napi_value value, void** result) {
  if (env == nullptr || value == nullptr || result == nullptr) {
    return false;
  }

  napi_valuetype valueType = napi_undefined;
  if (napi_typeof(env, value, &valueType) != napi_ok) {
    return false;
  }

  if (kind == mdTypeBlock) {
    if (valueType == napi_null || valueType == napi_undefined) {
      *result = nullptr;
      return true;
    }
    return false;
  }

  switch (valueType) {
    case napi_null:
    case napi_undefined:
      *result = nullptr;
      return true;

    case napi_bigint: {
      uint64_t raw = 0;
      bool lossless = false;
      if (napi_get_value_bigint_uint64(env, value, &raw, &lossless) !=
          napi_ok) {
        return false;
      }
      *result = reinterpret_cast<void*>(raw);
      return true;
    }

    case napi_external:
      return napi_get_value_external(env, value, result) == napi_ok;

    case napi_function:
    case napi_object: {
      ObjCBridgeState* bridgeState = ObjCBridgeState::InstanceData(env);
      if (bridgeState != nullptr) {
        id bridgedType = nil;
        if (bridgeState->tryResolveBridgedTypeConstructor(env, value,
                                                         &bridgedType) &&
            bridgedType != nil) {
          *result = static_cast<void*>(bridgedType);
          return true;
        }
      }

      if (Pointer::isInstance(env, value)) {
        Pointer* pointer = Pointer::unwrap(env, value);
        *result = pointer != nullptr ? pointer->data : nullptr;
        return true;
      }

      if (Reference::isInstance(env, value)) {
        Reference* reference = Reference::unwrap(env, value);
        if (reference == nullptr || reference->data == nullptr) {
          return false;
        }
        *result = reference->data;
        return true;
      }

      void* wrapped = nullptr;
      if (napi_unwrap(env, value, &wrapped) == napi_ok && wrapped != nullptr) {
        if (bridgeState != nullptr) {
          id nativeObject = bridgeState->nativeObjectForBridgeWrapper(wrapped);
          if (nativeObject != nil) {
            *result = static_cast<void*>(nativeObject);
            return true;
          }
        }

        *result = wrapped;
        return true;
      }

      bool hasNativePointer = false;
      if (valueType == napi_object &&
          napi_has_named_property(env, value, kHermesNativePointerProperty,
                                  &hasNativePointer) == napi_ok &&
          hasNativePointer) {
        napi_value nativePointerValue = nullptr;
        if (napi_get_named_property(env, value, kHermesNativePointerProperty,
                                    &nativePointerValue) == napi_ok &&
            nativePointerValue != nullptr) {
          if (Pointer::isInstance(env, nativePointerValue)) {
            Pointer* pointer = Pointer::unwrap(env, nativePointerValue);
            *result = pointer != nullptr ? pointer->data : nullptr;
            return true;
          }
          return napi_get_value_external(env, nativePointerValue, result) ==
                 napi_ok;
        }
      }

      return false;
    }

    default:
      return false;
  }
}

bool TryFastConvertHermesArgument(napi_env env, MDTypeKind kind,
                                  napi_value value, void* result) {
  if (value == nullptr || result == nullptr) {
    return false;
  }

  switch (kind) {
    case mdTypeBool:
      return TryFastConvertHermesBoolArgument(
          env, value, reinterpret_cast<uint8_t*>(result));
    case mdTypeChar:
      return TryFastConvertHermesInt8Argument(
          env, value, reinterpret_cast<int8_t*>(result));
    case mdTypeUChar:
    case mdTypeUInt8:
      return TryFastConvertHermesUInt8Argument(
          env, value, reinterpret_cast<uint8_t*>(result));
    case mdTypeSShort:
      return TryFastConvertHermesInt16Argument(
          env, value, reinterpret_cast<int16_t*>(result));
    case mdTypeUShort:
      return TryFastConvertHermesUInt16Argument(
          env, value, reinterpret_cast<uint16_t*>(result));
    case mdTypeSInt:
      return TryFastConvertHermesInt32Argument(
          env, value, reinterpret_cast<int32_t*>(result));
    case mdTypeUInt:
      return TryFastConvertHermesUInt32Argument(
          env, value, reinterpret_cast<uint32_t*>(result));
    case mdTypeSLong:
    case mdTypeSInt64:
      return TryFastConvertHermesInt64Argument(
          env, value, reinterpret_cast<int64_t*>(result));
    case mdTypeULong:
    case mdTypeUInt64:
      return TryFastConvertHermesUInt64Argument(
          env, value, reinterpret_cast<uint64_t*>(result));
    case mdTypeFloat:
      return TryFastConvertHermesFloatArgument(
          env, value, reinterpret_cast<float*>(result));
    case mdTypeDouble:
      return TryFastConvertHermesDoubleArgument(
          env, value, reinterpret_cast<double*>(result));
    case mdTypeSelector:
      return TryFastConvertHermesSelectorArgument(
          env, value, reinterpret_cast<SEL*>(result));
    case mdTypeClass:
    case mdTypeAnyObject:
    case mdTypeProtocolObject:
    case mdTypeClassObject:
    case mdTypeInstanceObject:
    case mdTypeNSStringObject:
    case mdTypeNSMutableStringObject:
      if (TryFastConvertHermesObjectArgument(env, kind, value, result)) {
        return true;
      }
      if (kind != mdTypeClass &&
          tryFastConvertHermesStringToNSStringArgument(
              env, value, reinterpret_cast<id*>(result),
              kind == mdTypeNSMutableStringObject)) {
        return true;
      }
      return TryFastConvertNapiArgument(env, kind, value, result);

    case mdTypePointer:
    case mdTypeOpaquePointer:
    case mdTypeBlock:
    case mdTypeFunctionPointer:
      return TryFastConvertHermesPointerArgument(
          env, kind, value, reinterpret_cast<void**>(result));

    default:
      return false;
  }
}

bool TryFastConvertHermesReturnValue(napi_env env, Cif* cif, MDTypeKind kind,
                                     const void* value, napi_value* result) {
  if (env == nullptr || result == nullptr) {
    return false;
  }

  switch (kind) {
    case mdTypeVoid:
      return napi_get_null(env, result) == napi_ok;

    case mdTypeBool:
      if (value == nullptr) {
        return false;
      }
      *result =
          makeHermesRawBoolValue(
              cif, *reinterpret_cast<const uint8_t*>(value) != 0);
      return true;

    case mdTypeChar: {
      if (value == nullptr) {
        return false;
      }
      const int8_t raw = *reinterpret_cast<const int8_t*>(value);
      if (raw == 0 || raw == 1) {
        *result = makeHermesRawBoolValue(cif, raw == 1);
        return true;
      }
      *result = makeHermesRawNumberValue(cif, static_cast<double>(raw));
      return true;
    }

    case mdTypeUChar:
    case mdTypeUInt8: {
      if (value == nullptr) {
        return false;
      }
      const uint8_t raw = *reinterpret_cast<const uint8_t*>(value);
      if (raw == 0 || raw == 1) {
        *result = makeHermesRawBoolValue(cif, raw == 1);
        return true;
      }
      *result = makeHermesRawNumberValue(cif, static_cast<double>(raw));
      return true;
    }

    case mdTypeSShort:
      if (value == nullptr) {
        return false;
      }
      *result = makeHermesRawNumberValue(cif,
          static_cast<double>(*reinterpret_cast<const int16_t*>(value)));
      return true;

    case mdTypeUShort: {
      if (value == nullptr) {
        return false;
      }
      const uint16_t raw = *reinterpret_cast<const uint16_t*>(value);
      if (raw >= 32 && raw <= 126) {
        const char buffer[2] = {static_cast<char>(raw), '\0'};
        return napi_create_string_utf8(env, buffer, 1, result) == napi_ok;
      }
      *result = makeHermesRawNumberValue(cif, static_cast<double>(raw));
      return true;
    }

    case mdTypeSInt:
      if (value == nullptr) {
        return false;
      }
      *result = makeHermesRawNumberValue(cif,
          static_cast<double>(*reinterpret_cast<const int32_t*>(value)));
      return true;

    case mdTypeUInt:
      if (value == nullptr) {
        return false;
      }
      *result = makeHermesRawNumberValue(cif,
          static_cast<double>(*reinterpret_cast<const uint32_t*>(value)));
      return true;

    case mdTypeSLong:
    case mdTypeSInt64: {
      if (value == nullptr) {
        return false;
      }
      const int64_t raw = *reinterpret_cast<const int64_t*>(value);
      constexpr int64_t kMaxSafeInteger = 9007199254740991LL;
      if (raw > kMaxSafeInteger || raw < -kMaxSafeInteger) {
        return napi_create_bigint_int64(env, raw, result) == napi_ok;
      }
      *result = makeHermesRawNumberValue(cif, static_cast<double>(raw));
      return true;
    }

    case mdTypeULong:
    case mdTypeUInt64: {
      if (value == nullptr) {
        return false;
      }
      const uint64_t raw = *reinterpret_cast<const uint64_t*>(value);
      constexpr uint64_t kMaxSafeInteger = 9007199254740991ULL;
      if (raw > kMaxSafeInteger) {
        return napi_create_bigint_uint64(env, raw, result) == napi_ok;
      }
      *result = makeHermesRawNumberValue(cif, static_cast<double>(raw));
      return true;
    }

    case mdTypeFloat:
      if (value == nullptr) {
        return false;
      }
      *result = makeHermesRawNumberValue(cif,
          static_cast<double>(*reinterpret_cast<const float*>(value)));
      return true;

    case mdTypeDouble:
      if (value == nullptr) {
        return false;
      }
      *result = makeHermesRawNumberValue(cif,
          *reinterpret_cast<const double*>(value));
      return true;

    default:
      return false;
  }
}

bool TryFastConvertHermesReturnValue(napi_env env, MDTypeKind kind,
                                     const void* value, napi_value* result) {
  return TryFastConvertHermesReturnValue(env, nullptr, kind, value, result);
}

}  // namespace nativescript

#endif  // TARGET_ENGINE_HERMES

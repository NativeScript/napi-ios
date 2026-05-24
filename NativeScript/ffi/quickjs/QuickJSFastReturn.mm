#include "QuickJSFastNativeApiPrivate.h"

#ifdef TARGET_ENGINE_QUICKJS

namespace {

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
      *result =
          JS_NewBool(context, *reinterpret_cast<const uint8_t*>(value) != 0);
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

}  // namespace

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
                                         nativescript::kUnownedObject, 0,
                                         nullptr);
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

#endif  // TARGET_ENGINE_QUICKJS

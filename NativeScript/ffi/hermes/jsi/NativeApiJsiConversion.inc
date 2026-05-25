std::string stringPropertyOrEmpty(Runtime& runtime, const Object& object,
                                  const char* name);
void* pointerFromSymbolLikeObject(Runtime& runtime, const Object& object);

id objectFromJsiValue(Runtime& runtime,
                      const std::shared_ptr<NativeApiJsiBridge>& bridge,
                      const Value& value, NativeApiJsiArgumentFrame& frame,
                      bool mutableString) {
  if (value.isNull() || value.isUndefined()) {
    return nil;
  }
  if (value.isString()) {
    std::string utf8 = value.asString(runtime).utf8(runtime);
    id string = mutableString
                    ? [[NSMutableString alloc] initWithBytes:utf8.data()
                                                      length:utf8.size()
                                                    encoding:NSUTF8StringEncoding]
                    : [[NSString alloc] initWithBytes:utf8.data()
                                               length:utf8.size()
                                             encoding:NSUTF8StringEncoding];
    frame.addObject(string);
    return string;
  }
  if (value.isBool()) {
    return [NSNumber numberWithBool:value.getBool()];
  }
  if (value.isNumber()) {
    return [NSNumber numberWithDouble:value.getNumber()];
  }
  if (value.isObject()) {
    Object object = value.asObject(runtime);
    if (object.isHostObject<NativeApiObjectHostObject>(runtime)) {
      return object.getHostObject<NativeApiObjectHostObject>(runtime)->object();
    }
    if (Class cls = nativeClassFromJsiObject(runtime, object)) {
      return static_cast<id>(cls);
    }
    if (object.isHostObject<NativeApiProtocolHostObject>(runtime)) {
      return static_cast<id>(
          object.getHostObject<NativeApiProtocolHostObject>(runtime)
              ->nativeProtocol());
    }
    if (void* symbolPointer = pointerFromSymbolLikeObject(runtime, object)) {
      return static_cast<id>(symbolPointer);
    }
    if (object.isHostObject<NativeApiPointerHostObject>(runtime)) {
      return static_cast<id>(
          object.getHostObject<NativeApiPointerHostObject>(runtime)->pointer());
    }
    if (object.isHostObject<NativeApiReferenceHostObject>(runtime)) {
      return static_cast<id>(
          object.getHostObject<NativeApiReferenceHostObject>(runtime)->data());
    }
    if (object.isHostObject<NativeApiStructObjectHostObject>(runtime)) {
      return static_cast<id>(
          object.getHostObject<NativeApiStructObjectHostObject>(runtime)->data());
    }

    Value getTimeValue = object.getProperty(runtime, "getTime");
    Value toISOStringValue = object.getProperty(runtime, "toISOString");
    if (getTimeValue.isObject() &&
        getTimeValue.asObject(runtime).isFunction(runtime) &&
        toISOStringValue.isObject() &&
        toISOStringValue.asObject(runtime).isFunction(runtime)) {
      Value millisValue = getTimeValue.asObject(runtime)
                              .asFunction(runtime)
                              .callWithThis(runtime, object, nullptr, 0);
      if (millisValue.isNumber()) {
        NSDate* date = [NSDate dateWithTimeIntervalSince1970:millisValue.getNumber() / 1000.0];
        bridge->rememberRoundTripValue(runtime, date, value);
        return date;
      }
    }

    Value valueOfValue = object.getProperty(runtime, "valueOf");
    if (valueOfValue.isObject() &&
        valueOfValue.asObject(runtime).isFunction(runtime)) {
      Value primitiveValue = valueOfValue.asObject(runtime)
                                 .asFunction(runtime)
                                 .callWithThis(runtime, object, nullptr, 0);
      if (primitiveValue.isString() || primitiveValue.isBool() ||
          primitiveValue.isNumber()) {
        return objectFromJsiValue(runtime, bridge, primitiveValue, frame,
                                  mutableString);
      }
    }

    const uint8_t* bytes = nullptr;
    size_t byteLength = 0;
    if (readJsiBuffer(runtime, object, &bytes, &byteLength)) {
      NSData* data = [NSData dataWithBytes:bytes length:byteLength];
      bridge->rememberRoundTripValue(runtime, data, value);
      return data;
    }

    if (object.isArray(runtime)) {
      Array array = object.getArray(runtime);
      NSMutableArray* nativeArray =
          [NSMutableArray arrayWithCapacity:array.size(runtime)];
      for (size_t i = 0; i < array.size(runtime); i++) {
        id element = objectFromJsiValue(runtime, bridge,
                                        array.getValueAtIndex(runtime, i),
                                        frame, false);
        [nativeArray addObject:element != nil ? element : [NSNull null]];
      }
      bridge->rememberRoundTripValue(runtime, nativeArray, value);
      return nativeArray;
    }

    Value lengthValue = object.getProperty(runtime, "length");
    if (lengthValue.isNumber() && std::isfinite(lengthValue.getNumber()) &&
        lengthValue.getNumber() >= 0) {
      size_t length = static_cast<size_t>(std::floor(lengthValue.getNumber()));
      NSMutableArray* nativeArray = [NSMutableArray arrayWithCapacity:length];
      for (size_t i = 0; i < length; i++) {
        std::string key = std::to_string(i);
        id element = objectFromJsiValue(
            runtime, bridge, object.getProperty(runtime, key.c_str()), frame,
            false);
        [nativeArray addObject:element != nil ? element : [NSNull null]];
      }
      bridge->rememberRoundTripValue(runtime, nativeArray, value);
      return nativeArray;
    }

    Value entriesValue = object.getProperty(runtime, "entries");
    Value sizeValue = object.getProperty(runtime, "size");
    Value getValue = object.getProperty(runtime, "get");
    if (entriesValue.isObject() &&
        entriesValue.asObject(runtime).isFunction(runtime) &&
        sizeValue.isNumber() && getValue.isObject() &&
        getValue.asObject(runtime).isFunction(runtime)) {
      Object arrayCtor = runtime.global().getPropertyAsObject(runtime, "Array");
      Function arrayFrom = arrayCtor.getPropertyAsFunction(runtime, "from");
      Value iterator = entriesValue.asObject(runtime)
                           .asFunction(runtime)
                           .callWithThis(runtime, object, nullptr, 0);
      Value pairsValue = arrayFrom.call(runtime, iterator);
      if (pairsValue.isObject() && pairsValue.asObject(runtime).isArray(runtime)) {
        Array pairs = pairsValue.asObject(runtime).getArray(runtime);
        NSMutableDictionary* nativeMap =
            [NSMutableDictionary dictionaryWithCapacity:pairs.size(runtime)];
        for (size_t i = 0; i < pairs.size(runtime); i++) {
          Value pairValue = pairs.getValueAtIndex(runtime, i);
          if (!pairValue.isObject() ||
              !pairValue.asObject(runtime).isArray(runtime)) {
            continue;
          }
          Array pair = pairValue.asObject(runtime).getArray(runtime);
          if (pair.size(runtime) < 2) {
            continue;
          }
          id key = objectFromJsiValue(runtime, bridge,
                                      pair.getValueAtIndex(runtime, 0),
                                      frame, false);
          id nativeValue = objectFromJsiValue(runtime, bridge,
                                              pair.getValueAtIndex(runtime, 1),
                                              frame, false);
          if (key != nil) {
            [nativeMap setObject:nativeValue != nil ? nativeValue : [NSNull null]
                          forKey:key];
          }
        }
        bridge->rememberRoundTripValue(runtime, nativeMap, value);
        return nativeMap;
      }
    }

    NSMutableDictionary* dictionary = [NSMutableDictionary dictionary];
    Array propertyNames = object.getPropertyNames(runtime);
    for (size_t i = 0; i < propertyNames.size(runtime); i++) {
      Value propertyNameValue = propertyNames.getValueAtIndex(runtime, i);
      if (!propertyNameValue.isString()) {
        continue;
      }
      std::string key = propertyNameValue.asString(runtime).utf8(runtime);
      Value propertyValue = object.getProperty(runtime, key.c_str());
      if (propertyValue.isUndefined()) {
        continue;
      }
      id nativeValue =
          objectFromJsiValue(runtime, bridge, propertyValue, frame, false);
      NSString* nativeKey = [NSString stringWithUTF8String:key.c_str()];
      if (nativeKey != nil) {
        [dictionary setObject:nativeValue != nil ? nativeValue : [NSNull null]
                       forKey:nativeKey];
      }
    }
    bridge->rememberRoundTripValue(runtime, dictionary, value);
    return dictionary;
  }
  throw facebook::jsi::JSError(runtime,
                               "Value cannot be converted to Objective-C object.");
}

std::string utf8StringFromNSString(NSString* string) {
  if (string == nil) {
    return "";
  }
  NSUInteger length = [string lengthOfBytesUsingEncoding:NSUTF8StringEncoding];
  std::string result(length, '\0');
  NSUInteger usedLength = 0;
  NSRange remainingRange = NSMakeRange(0, 0);
  BOOL ok = [string getBytes:result.data()
                   maxLength:length
                  usedLength:&usedLength
                    encoding:NSUTF8StringEncoding
                     options:0
                       range:NSMakeRange(0, string.length)
              remainingRange:&remainingRange];
  if (!ok) {
    return string.UTF8String ?: "";
  }
  result.resize(usedLength);
  return result;
}

bool readNativePointerProperty(Runtime& runtime, const Object& object,
                               void** pointer) {
  if (pointer == nullptr) {
    return false;
  }

  Value nativePointerObjectValue =
      object.getProperty(runtime, "__nativeApiPointerObject");
  if (nativePointerObjectValue.isObject()) {
    Object nativePointerObject = nativePointerObjectValue.asObject(runtime);
    if (nativePointerObject.isHostObject<NativeApiPointerHostObject>(
            runtime)) {
      *pointer = nativePointerObject
                     .getHostObject<NativeApiPointerHostObject>(runtime)
                     ->pointer();
      return true;
    }
  }

  Value nativePointerValue =
      object.getProperty(runtime, "__nativeApiPointer");
  if (nativePointerValue.isNumber()) {
    *pointer = reinterpret_cast<void*>(
        static_cast<uintptr_t>(nativePointerValue.getNumber()));
    return true;
  }

  Value nativeAddressValue = object.getProperty(runtime, "nativeAddress");
  if (nativeAddressValue.isNumber()) {
    *pointer = reinterpret_cast<void*>(
        static_cast<uintptr_t>(nativeAddressValue.getNumber()));
    return true;
  }

  return false;
}

std::string stringPropertyOrEmpty(Runtime& runtime, const Object& object,
                                  const char* name) {
  if (name == nullptr || !object.hasProperty(runtime, name)) {
    return "";
  }
  Value value = object.getProperty(runtime, name);
  return value.isString() ? value.asString(runtime).utf8(runtime) : "";
}

void* pointerFromSymbolLikeObject(Runtime& runtime, const Object& object) {
  std::string kind = stringPropertyOrEmpty(runtime, object, "kind");
  if (kind != "class" && kind != "protocol") {
    return nullptr;
  }

  std::string runtimeName = stringPropertyOrEmpty(runtime, object, "runtimeName");
  if (runtimeName.empty()) {
    runtimeName = stringPropertyOrEmpty(runtime, object, "name");
  }
  if (runtimeName.empty()) {
    return nullptr;
  }

  if (kind == "class") {
    return objc_lookUpClass(runtimeName.c_str());
  }
  return lookupProtocolByNativeName(runtimeName);
}

void* pointerFromJsiValue(Runtime& runtime, const Value& value,
                          NativeApiJsiArgumentFrame& frame) {
  if (value.isNull() || value.isUndefined()) {
    return nullptr;
  }
  if (value.isNumber()) {
    return reinterpret_cast<void*>(static_cast<uintptr_t>(value.getNumber()));
  }
  if (value.isObject()) {
    Object object = value.asObject(runtime);
    if (object.isHostObject<NativeApiPointerHostObject>(runtime)) {
      return object.getHostObject<NativeApiPointerHostObject>(runtime)->pointer();
    }
    if (object.isHostObject<NativeApiObjectHostObject>(runtime)) {
      return object.getHostObject<NativeApiObjectHostObject>(runtime)->object();
    }
    if (Class cls = nativeClassFromJsiObject(runtime, object)) {
      return cls;
    }
    if (object.isHostObject<NativeApiProtocolHostObject>(runtime)) {
      return object.getHostObject<NativeApiProtocolHostObject>(runtime)
          ->nativeProtocol();
    }
    if (void* symbolPointer = pointerFromSymbolLikeObject(runtime, object)) {
      return symbolPointer;
    }
    if (object.isHostObject<NativeApiReferenceHostObject>(runtime)) {
      auto reference =
          object.getHostObject<NativeApiReferenceHostObject>(runtime);
      if (reference->data() == nullptr) {
        reference->ensureStorage(runtime, reference->type(), frame);
      }
      return reference->data();
    }
    if (object.isHostObject<NativeApiStructObjectHostObject>(runtime)) {
      return object.getHostObject<NativeApiStructObjectHostObject>(runtime)->data();
    }
    void* nativePointer = nullptr;
    if (readNativePointerProperty(runtime, object, &nativePointer)) {
      return nativePointer;
    }
    const uint8_t* bytes = nullptr;
    size_t byteLength = 0;
    if (readJsiBuffer(runtime, object, &bytes, &byteLength)) {
      return const_cast<uint8_t*>(bytes);
    }
  }
  if (value.isString()) {
    std::string utf8 = value.asString(runtime).utf8(runtime);
    char* string = strdup(utf8.c_str());
    return string;
  }
  throw facebook::jsi::JSError(runtime, "Value cannot be converted to pointer.");
}

bool readPointerLikeValue(Runtime& runtime, const Value& value, void** pointer) {
  if (pointer == nullptr || !value.isObject()) {
    return false;
  }
  Object object = value.asObject(runtime);
  if (object.isHostObject<NativeApiPointerHostObject>(runtime)) {
    *pointer = object.getHostObject<NativeApiPointerHostObject>(runtime)->pointer();
    return true;
  }
  if (object.isHostObject<NativeApiReferenceHostObject>(runtime)) {
    *pointer = object.getHostObject<NativeApiReferenceHostObject>(runtime)->data();
    return true;
  }
  if (object.isHostObject<NativeApiStructObjectHostObject>(runtime)) {
    *pointer = object.getHostObject<NativeApiStructObjectHostObject>(runtime)->data();
    return true;
  }
  if (object.isHostObject<NativeApiObjectHostObject>(runtime)) {
    *pointer = object.getHostObject<NativeApiObjectHostObject>(runtime)->object();
    return true;
  }
  if (Class cls = nativeClassFromJsiObject(runtime, object)) {
    *pointer = cls;
    return true;
  }
  if (object.isHostObject<NativeApiProtocolHostObject>(runtime)) {
    *pointer =
        object.getHostObject<NativeApiProtocolHostObject>(runtime)->nativeProtocol();
    return true;
  }
  if (void* symbolPointer = pointerFromSymbolLikeObject(runtime, object)) {
    *pointer = symbolPointer;
    return true;
  }
  return readNativePointerProperty(runtime, object, pointer);
}

template <typename T>
void writeNumericArgument(Runtime& runtime, const Value& value, void* target,
                          const char* typeName) {
  const Value* numericValue = &value;
  Value primitiveValue = Value::undefined();
  if (value.isObject()) {
    Object object = value.asObject(runtime);
    Value valueOfValue = object.getProperty(runtime, "valueOf");
    if (valueOfValue.isObject() &&
        valueOfValue.asObject(runtime).isFunction(runtime)) {
      primitiveValue = valueOfValue.asObject(runtime)
                           .asFunction(runtime)
                           .callWithThis(runtime, object, nullptr, 0);
      numericValue = &primitiveValue;
    }
  }

  if (!numericValue->isNumber() && !numericValue->isBool()) {
    throw facebook::jsi::JSError(runtime,
                                 std::string("Expected numeric ") + typeName +
                                     " argument.");
  }
  double number = numericValue->isBool() ? (numericValue->getBool() ? 1.0 : 0.0)
                                         : numericValue->getNumber();
  *static_cast<T*>(target) = static_cast<T>(number);
}

void convertJsiArgument(Runtime& runtime,
                        const std::shared_ptr<NativeApiJsiBridge>& bridge,
                        const NativeApiJsiType& type,
                        const Value& value, void* target,
                        NativeApiJsiArgumentFrame& frame);

Value convertNativeReturnValue(Runtime& runtime,
                               const std::shared_ptr<NativeApiJsiBridge>& bridge,
                               const NativeApiJsiType& type, void* value);

Class classFromJsiValue(Runtime& runtime, const Value& value);
Protocol* protocolFromJsiValue(Runtime& runtime, const Value& value);

std::optional<size_t> parseArrayIndexProperty(const std::string& property) {
  if (property.empty()) {
    return std::nullopt;
  }
  size_t index = 0;
  for (char c : property) {
    if (!std::isdigit(static_cast<unsigned char>(c))) {
      return std::nullopt;
    }
    size_t digit = static_cast<size_t>(c - '0');
    if (index > (std::numeric_limits<size_t>::max() - digit) / 10) {
      return std::nullopt;
    }
    index = (index * 10) + digit;
  }
  return index;
}

size_t referenceElementStride(const NativeApiJsiType& type) {
  return std::max<size_t>(nativeSizeForType(type), 1);
}

void convertAggregateArgument(Runtime& runtime,
                              const std::shared_ptr<NativeApiJsiBridge>& bridge,
                              const NativeApiJsiType& type,
                              const Value& value, void* target,
                              NativeApiJsiArgumentFrame& frame) {
  size_t size = nativeSizeForType(type);
  if (size == 0) {
    return;
  }

  std::memset(target, 0, size);
  if (value.isNull() || value.isUndefined()) {
    return;
  }

  if (value.isObject()) {
    Object object = value.asObject(runtime);
    if (object.isHostObject<NativeApiStructObjectHostObject>(runtime)) {
      auto structObject = object.getHostObject<NativeApiStructObjectHostObject>(runtime);
      if (structObject->data() != nullptr) {
        std::memcpy(target, structObject->data(),
                    std::min(size, static_cast<size_t>(structObject->info()->size)));
      }
      return;
    }
    if (object.isHostObject<NativeApiReferenceHostObject>(runtime)) {
      void* data = object.getHostObject<NativeApiReferenceHostObject>(runtime)->data();
      if (data != nullptr) {
        std::memcpy(target, data, size);
      }
      return;
    }
    if (object.isHostObject<NativeApiPointerHostObject>(runtime)) {
      void* data = object.getHostObject<NativeApiPointerHostObject>(runtime)->pointer();
      if (data != nullptr) {
        std::memcpy(target, data, size);
      }
      return;
    }

    const uint8_t* bytes = nullptr;
    size_t byteLength = 0;
    if (readJsiBuffer(runtime, object, &bytes, &byteLength)) {
      if (bytes != nullptr) {
        std::memcpy(target, bytes, std::min(byteLength, size));
      }
      return;
    }
  }

  if (type.aggregateInfo == nullptr) {
    throw facebook::jsi::JSError(runtime, "Missing native struct metadata.");
  }
  if (!value.isObject()) {
    throw facebook::jsi::JSError(runtime, "Expected struct descriptor object.");
  }

  Object object = value.asObject(runtime);
  for (const auto& field : type.aggregateInfo->fields) {
    bool hasField = object.hasProperty(runtime, field.name.c_str());
    if (!hasField) {
      continue;
    }
    Value fieldValue = object.getProperty(runtime, field.name.c_str());
    void* fieldTarget = static_cast<uint8_t*>(target) + field.offset;
    convertJsiArgument(runtime, bridge, field.type, fieldValue, fieldTarget,
                       frame);
  }
}

void convertIndexedAggregateArgument(Runtime& runtime,
                                     const std::shared_ptr<NativeApiJsiBridge>& bridge,
                                     const NativeApiJsiType& type,
                                     const Value& value, void* target,
                                     NativeApiJsiArgumentFrame& frame) {
  size_t size = nativeSizeForType(type);
  std::memset(target, 0, size);
  if (value.isNull() || value.isUndefined()) {
    return;
  }
  if (value.isObject()) {
    const uint8_t* bytes = nullptr;
    size_t byteLength = 0;
    if (readJsiBuffer(runtime, value.asObject(runtime), &bytes, &byteLength)) {
      if (bytes != nullptr) {
        std::memcpy(target, bytes, std::min(byteLength, size));
      }
      return;
    }
  }
  if (!value.isObject() || !value.asObject(runtime).isArray(runtime)) {
    throw facebook::jsi::JSError(runtime, "Expected array, ArrayBuffer, or typed array.");
  }

  Array array = value.asObject(runtime).getArray(runtime);
  size_t elementSize = type.elementType != nullptr ? nativeSizeForType(*type.elementType) : 0;
  if (elementSize == 0 || type.elementType == nullptr) {
    throw facebook::jsi::JSError(runtime, "Invalid native array element type.");
  }
  size_t count = std::min<size_t>(type.arraySize, array.size(runtime));
  for (size_t i = 0; i < count; i++) {
    void* slot = static_cast<uint8_t*>(target) + (i * elementSize);
    convertJsiArgument(runtime, bridge, *type.elementType,
                       array.getValueAtIndex(runtime, i), slot, frame);
  }
}

void convertJsiFfiArgument(Runtime& runtime,
                           const std::shared_ptr<NativeApiJsiBridge>& bridge,
                           const NativeApiJsiType& type, const Value& value,
                           void* target, NativeApiJsiArgumentFrame& frame) {
  if (type.kind != metagen::mdTypeArray) {
    convertJsiArgument(runtime, bridge, type, value, target, frame);
    return;
  }

  void* pointer = nullptr;
  if (!value.isNull() && !value.isUndefined()) {
    if (value.isObject()) {
      Object object = value.asObject(runtime);
      if (!readPointerLikeValue(runtime, value, &pointer)) {
        const uint8_t* bytes = nullptr;
        size_t byteLength = 0;
        if (readJsiBuffer(runtime, object, &bytes, &byteLength)) {
          pointer = const_cast<uint8_t*>(bytes);
        }
      }
    }

    if (pointer == nullptr) {
      size_t byteLength = nativeSizeForType(type);
      void* buffer = frame.addBuffer(byteLength);
      convertIndexedAggregateArgument(runtime, bridge, type, value, buffer,
                                      frame);
      pointer = buffer;
    }
  }

  *static_cast<void**>(target) = pointer;
}

void convertJsiArgument(Runtime& runtime,
                        const std::shared_ptr<NativeApiJsiBridge>& bridge,
                        const NativeApiJsiType& type,
                        const Value& value, void* target,
                        NativeApiJsiArgumentFrame& frame) {
  if (unsupportedJsiType(type)) {
    throw facebook::jsi::JSError(runtime,
                                 "This native signature is not supported by "
                                 "the pure JSI bridge yet.");
  }

  switch (type.kind) {
    case metagen::mdTypeBool:
      if (!value.isNumber() && !value.isBool()) {
        throw facebook::jsi::JSError(runtime,
                                     "Expected boolean or numeric argument.");
      }
      *static_cast<uint8_t*>(target) =
          value.isBool() ? static_cast<uint8_t>(value.getBool())
                         : static_cast<uint8_t>(value.getNumber() != 0);
      break;
    case metagen::mdTypeChar:
      writeNumericArgument<int8_t>(runtime, value, target, "int8");
      break;
    case metagen::mdTypeUChar:
    case metagen::mdTypeUInt8:
      writeNumericArgument<uint8_t>(runtime, value, target, "uint8");
      break;
    case metagen::mdTypeSShort:
      writeNumericArgument<int16_t>(runtime, value, target, "int16");
      break;
    case metagen::mdTypeUShort:
      if (value.isString()) {
        std::string text = value.asString(runtime).utf8(runtime);
        if (text.size() != 1) {
          throw facebook::jsi::JSError(
              runtime, "Expected a single-character string.");
        }
        *static_cast<uint16_t*>(target) =
            static_cast<uint16_t>(static_cast<unsigned char>(text[0]));
      } else {
        writeNumericArgument<uint16_t>(runtime, value, target, "uint16");
      }
      break;
    case metagen::mdTypeSInt:
      writeNumericArgument<int32_t>(runtime, value, target, "int32");
      break;
    case metagen::mdTypeUInt:
      writeNumericArgument<uint32_t>(runtime, value, target, "uint32");
      break;
    case metagen::mdTypeSLong:
    case metagen::mdTypeSInt64:
      writeNumericArgument<int64_t>(runtime, value, target, "int64");
      break;
    case metagen::mdTypeULong:
    case metagen::mdTypeUInt64:
      writeNumericArgument<uint64_t>(runtime, value, target, "uint64");
      break;
    case metagen::mdTypeFloat:
      writeNumericArgument<float>(runtime, value, target, "float");
      break;
    case metagen::mdTypeDouble:
      writeNumericArgument<double>(runtime, value, target, "double");
      break;
    case metagen::mdTypeString: {
      if (value.isNull() || value.isUndefined()) {
        *static_cast<char**>(target) = nullptr;
        break;
      }
      if (value.isObject()) {
        Object object = value.asObject(runtime);
        void* pointer = nullptr;
        if (readPointerLikeValue(runtime, value, &pointer)) {
          *static_cast<char**>(target) = static_cast<char*>(pointer);
          break;
        }
        const uint8_t* bytes = nullptr;
        size_t byteLength = 0;
        if (readJsiBuffer(runtime, object, &bytes, &byteLength)) {
          *static_cast<char**>(target) =
              reinterpret_cast<char*>(const_cast<uint8_t*>(bytes));
          break;
        }
        Value valueOfValue = object.getProperty(runtime, "valueOf");
        if (valueOfValue.isObject() &&
            valueOfValue.asObject(runtime).isFunction(runtime)) {
          Value primitive = valueOfValue.asObject(runtime)
                                .asFunction(runtime)
                                .callWithThis(runtime, object, nullptr, 0);
          if (primitive.isString()) {
            std::string utf8 = primitive.asString(runtime).utf8(runtime);
            char* string = strdup(utf8.c_str());
            *static_cast<char**>(target) = string;
            break;
          }
        }
      }
      if (!value.isString()) {
        throw facebook::jsi::JSError(runtime, "Expected string argument.");
      }
      std::string utf8 = value.asString(runtime).utf8(runtime);
      char* string = strdup(utf8.c_str());
      *static_cast<char**>(target) = string;
      break;
    }
    case metagen::mdTypeAnyObject:
    case metagen::mdTypeProtocolObject:
    case metagen::mdTypeClassObject:
    case metagen::mdTypeInstanceObject:
    case metagen::mdTypeNSStringObject:
    case metagen::mdTypeNSMutableStringObject: {
      id object = objectFromJsiValue(
          runtime, bridge, value, frame,
          type.kind == metagen::mdTypeNSMutableStringObject);
      *static_cast<id*>(target) = object;
      break;
    }
    case metagen::mdTypeClass: {
      *static_cast<Class*>(target) = classFromJsiValue(runtime, value);
      break;
    }
    case metagen::mdTypeSelector: {
      if (value.isNull() || value.isUndefined()) {
        *static_cast<SEL*>(target) = nullptr;
        break;
      }
      if (!value.isString()) {
        throw facebook::jsi::JSError(runtime, "Expected selector string.");
      }
      std::string selectorName = value.asString(runtime).utf8(runtime);
      *static_cast<SEL*>(target) = sel_registerName(selectorName.c_str());
      break;
    }
    case metagen::mdTypePointer:
      if (value.isObject()) {
        Object object = value.asObject(runtime);
        if (object.isHostObject<NativeApiReferenceHostObject>(runtime)) {
          auto reference = object.getHostObject<NativeApiReferenceHostObject>(runtime);
          if (reference->data() == nullptr && type.elementType != nullptr) {
            reference->ensureStorage(runtime, *type.elementType, frame);
          } else if (reference->data() == nullptr) {
            reference->ensureStorage(runtime, reference->type(), frame);
          }
          void* pointer = reference->data();
          frame.rememberRoundTripValue(bridge, runtime, pointer, value);
          *static_cast<void**>(target) = pointer;
          break;
        }
        if (object.isHostObject<NativeApiStructObjectHostObject>(runtime)) {
          void* pointer =
              object.getHostObject<NativeApiStructObjectHostObject>(runtime)
                  ->data();
          frame.rememberRoundTripValue(bridge, runtime, pointer, value);
          *static_cast<void**>(target) = pointer;
          break;
        }
        const uint8_t* bytes = nullptr;
        size_t byteLength = 0;
        if (readJsiBuffer(runtime, object, &bytes, &byteLength)) {
          void* pointer = const_cast<uint8_t*>(bytes);
          frame.rememberRoundTripValue(bridge, runtime, pointer, value);
          *static_cast<void**>(target) = pointer;
          break;
        }
      }
      *static_cast<void**>(target) = pointerFromJsiValue(runtime, value, frame);
      break;
    case metagen::mdTypeOpaquePointer:
      *static_cast<void**>(target) = pointerFromJsiValue(runtime, value, frame);
      break;
    case metagen::mdTypeBlock:
    case metagen::mdTypeFunctionPointer: {
      if (value.isObject()) {
        Object object = value.asObject(runtime);
        void* nativePointer = nullptr;
        if (readNativePointerProperty(runtime, object, &nativePointer)) {
          *static_cast<void**>(target) = nativePointer;
          break;
        }
        if (object.isFunction(runtime)) {
          auto callback = createJsiCallback(
              runtime, bridge, type, object.asFunction(runtime),
              type.kind == metagen::mdTypeBlock);
          void* pointer = callback->functionPointer();
          if (type.kind == metagen::mdTypeBlock) {
            frame.addLifetime(callback);
            frame.rememberRoundTripValue(bridge, runtime, pointer, value);
          } else {
            bridge->rememberRoundTripValue(runtime, pointer, value);
          }
          try {
            object.setProperty(runtime, "__nativeApiPointerObject",
                               createPointer(runtime, bridge, pointer));
            object.setProperty(
                runtime, "__nativeApiPointer",
                static_cast<double>(reinterpret_cast<uintptr_t>(pointer)));
          } catch (const std::exception&) {
          }
          *static_cast<void**>(target) = pointer;
          break;
        }
      }
      *static_cast<void**>(target) = pointerFromJsiValue(runtime, value, frame);
      break;
    }
    case metagen::mdTypeStruct:
      convertAggregateArgument(runtime, bridge, type, value, target, frame);
      break;
    case metagen::mdTypeArray:
    case metagen::mdTypeVector:
    case metagen::mdTypeExtVector:
    case metagen::mdTypeComplex:
      convertIndexedAggregateArgument(runtime, bridge, type, value, target,
                                      frame);
      break;
    default:
      throw facebook::jsi::JSError(runtime, "Unsupported JSI argument type.");
  }
}

Value convertNativeReturnValue(Runtime& runtime,
                               const std::shared_ptr<NativeApiJsiBridge>& bridge,
                               const NativeApiJsiType& type, void* value) {
  if (unsupportedJsiType(type)) {
    throw facebook::jsi::JSError(runtime,
                                 "This native return type is not supported by "
                                 "the pure JSI bridge yet.");
  }

  switch (type.kind) {
    case metagen::mdTypeVoid:
      return Value::undefined();
    case metagen::mdTypeBool:
      return *static_cast<uint8_t*>(value) != 0;
    case metagen::mdTypeChar:
      return static_cast<double>(*static_cast<int8_t*>(value));
    case metagen::mdTypeUChar:
    case metagen::mdTypeUInt8:
      return static_cast<double>(*static_cast<uint8_t*>(value));
    case metagen::mdTypeSShort:
      return static_cast<double>(*static_cast<int16_t*>(value));
    case metagen::mdTypeUShort: {
      uint16_t raw = *static_cast<uint16_t*>(value);
      if (raw >= 32 && raw <= 126) {
        char buffer[2] = {static_cast<char>(raw), '\0'};
        return String::createFromUtf8(runtime, buffer);
      }
      return static_cast<double>(raw);
    }
    case metagen::mdTypeSInt:
      return static_cast<double>(*static_cast<int32_t*>(value));
    case metagen::mdTypeUInt:
      return static_cast<double>(*static_cast<uint32_t*>(value));
    case metagen::mdTypeSLong:
    case metagen::mdTypeSInt64:
      return signedInteger64ToJsiValue(runtime, *static_cast<int64_t*>(value));
    case metagen::mdTypeULong:
    case metagen::mdTypeUInt64:
      return unsignedInteger64ToJsiValue(runtime,
                                         *static_cast<uint64_t*>(value));
    case metagen::mdTypeFloat:
      return static_cast<double>(*static_cast<float*>(value));
    case metagen::mdTypeDouble:
      return *static_cast<double*>(value);
    case metagen::mdTypeString: {
      const char* string = *static_cast<const char**>(value);
      if (string == nullptr) {
        return Value::null();
      }
      NativeApiJsiType cStringType =
          primitiveInteropType(metagen::mdTypeChar);
      return Object::createFromHostObject(
          runtime, std::make_shared<NativeApiReferenceHostObject>(
                       bridge, cStringType, const_cast<char*>(string), false));
    }
    case metagen::mdTypeClass: {
      Class cls = *static_cast<Class*>(value);
      if (cls == nil) {
        return Value::null();
      }
      const char* name = class_getName(cls);
      NativeApiSymbol symbol{
          .kind = NativeApiSymbolKind::Class,
          .offset = MD_SECTION_OFFSET_NULL,
          .name = name != nullptr ? name : "",
          .runtimeName = name != nullptr ? name : "",
      };
      if (const NativeApiSymbol* found = bridge->findClass(symbol.name)) {
        symbol = *found;
      }
      return makeNativeClassValue(runtime, bridge, std::move(symbol));
    }
    case metagen::mdTypeAnyObject:
    case metagen::mdTypeProtocolObject:
    case metagen::mdTypeClassObject:
    case metagen::mdTypeInstanceObject:
    case metagen::mdTypeNSStringObject:
    case metagen::mdTypeNSMutableStringObject: {
      id object = *static_cast<id*>(value);
      if (object == nil) {
        return Value::null();
      }
      if ([object isKindOfClass:[NSNull class]]) {
        if (type.returnOwned) {
          [object release];
        }
        return Value::null();
      }
      if ([object respondsToSelector:@selector(UTF8String)]) {
        bool untypedObject = type.kind == metagen::mdTypeAnyObject;
        bool explicitNSString = type.kind == metagen::mdTypeNSStringObject;
        if (untypedObject || explicitNSString) {
          std::string utf8 = utf8StringFromNSString(static_cast<NSString*>(object));
          if (type.returnOwned) {
            [object release];
          }
          return makeString(runtime, utf8);
        }
      }
      if ([object isKindOfClass:[NSNumber class]] &&
          ![object isKindOfClass:[NSDecimalNumber class]]) {
        NSNumber* number = static_cast<NSNumber*>(object);
        const char* objCType = [number objCType];
        bool isBool = CFGetTypeID((__bridge CFTypeRef)number) ==
                          CFBooleanGetTypeID() ||
                      (objCType != nullptr &&
                       std::strcmp(objCType, @encode(BOOL)) == 0);
        Value result = isBool ? Value(static_cast<bool>([number boolValue]))
                              : Value([number doubleValue]);
        if (type.returnOwned) {
          [object release];
        }
        return result;
      }
      Value roundTrip = bridge->findRoundTripValue(runtime, object);
      if (!roundTrip.isUndefined()) {
        if (type.returnOwned) {
          [object release];
        }
        return roundTrip;
      }
      if (const NativeApiSymbol* classSymbol =
              bridge->findClassForRuntimePointer((void*)object)) {
        return makeNativeClassValue(runtime, bridge, *classSymbol);
      }
      if (const NativeApiSymbol* protocolSymbol =
              bridge->findProtocolForRuntimePointer((void*)object)) {
        return makeNativeProtocolValue(runtime, bridge, *protocolSymbol);
      }
      return makeNativeObjectValue(runtime, bridge, object, type.returnOwned);
    }
    case metagen::mdTypeSelector: {
      SEL selector = *static_cast<SEL*>(value);
      const char* selectorName = selector != nullptr ? sel_getName(selector) : nullptr;
      return selectorName != nullptr ? makeString(runtime, selectorName)
                                     : Value::null();
    }
    case metagen::mdTypePointer:
    case metagen::mdTypeOpaquePointer: {
      void* pointer = *static_cast<void**>(value);
      if (pointer == nullptr) {
        return Value::null();
      }
      if (const NativeApiSymbol* classSymbol =
              bridge->findClassForRuntimePointer(pointer)) {
        return makeNativeClassValue(runtime, bridge, *classSymbol);
      }
      if (const NativeApiSymbol* protocolSymbol =
              bridge->findProtocolForRuntimePointer(pointer)) {
        return makeNativeProtocolValue(runtime, bridge, *protocolSymbol);
      }
      if (type.kind == metagen::mdTypePointer && type.elementType != nullptr) {
        std::shared_ptr<Value> backingValue;
        Value roundTrip = bridge->findRoundTripValue(runtime, pointer);
        if (!roundTrip.isUndefined()) {
          backingValue = std::make_shared<Value>(runtime, roundTrip);
        }
        return Object::createFromHostObject(
            runtime, std::make_shared<NativeApiReferenceHostObject>(
                         bridge, *type.elementType, pointer, false, 0, nullptr,
                         std::move(backingValue)));
      }
      return createPointer(runtime, bridge, pointer);
    }
    case metagen::mdTypeBlock:
    case metagen::mdTypeFunctionPointer: {
      void* pointer = *static_cast<void**>(value);
      if (pointer == nullptr) {
        return Value::null();
      }
      Value roundTrip = bridge->findRoundTripValue(runtime, pointer);
      if (!roundTrip.isUndefined()) {
        return roundTrip;
      }
      return wrapNativeFunctionPointer(runtime, bridge, type, pointer,
                                       type.kind == metagen::mdTypeBlock);
    }
    case metagen::mdTypeStruct:
      if (type.aggregateInfo == nullptr) {
        return ArrayBuffer(
            runtime, std::make_shared<NativeApiMutableBuffer>(
                         value, nativeSizeForType(type)));
      }
      return Object::createFromHostObject(
          runtime, std::make_shared<NativeApiStructObjectHostObject>(
                       bridge, type.aggregateInfo, value, true));
    case metagen::mdTypeArray:
    case metagen::mdTypeVector:
    case metagen::mdTypeExtVector:
    case metagen::mdTypeComplex: {
      Array result(runtime, type.arraySize);
      if (type.elementType == nullptr) {
        return result;
      }
      size_t elementSize = nativeSizeForType(*type.elementType);
      auto base = static_cast<uint8_t*>(value);
      for (uint16_t i = 0; i < type.arraySize; i++) {
        result.setValueAtIndex(
            runtime, i,
            convertNativeReturnValue(runtime, bridge, *type.elementType,
                                     base + (static_cast<size_t>(i) * elementSize)));
      }
      return result;
    }
    default:
      throw facebook::jsi::JSError(runtime, "Unsupported JSI return type.");
  }
}

void NativeApiReferenceHostObject::ensureStorage(
    Runtime& runtime, NativeApiJsiType type, NativeApiJsiArgumentFrame& frame,
    size_t elements) {
  size_t elementCount = std::max<size_t>(elements, 1);
  NativeApiJsiType storageType = std::move(type);
  size_t stride = std::max<size_t>(nativeSizeForType(storageType), 1);
  size_t required = std::max<size_t>(stride * elementCount, sizeof(void*));
  type_ = std::move(storageType);

  if (data_ == nullptr) {
    data_ = calloc(1, required);
    ownsData_ = true;
    byteLength_ = required;
  } else if (ownsData_ && byteLength_ < required) {
    void* expanded = realloc(data_, required);
    if (expanded == nullptr) {
      throw std::bad_alloc();
    }
    std::memset(static_cast<uint8_t*>(expanded) + byteLength_, 0,
                required - byteLength_);
    data_ = expanded;
    byteLength_ = required;
  }

  if (data_ != nullptr && pendingValue_ != nullptr) {
    Value pending(runtime, *pendingValue_);
    convertJsiArgument(runtime, bridge_, type_, pending, data_, frame);
    pendingValue_.reset();
  }
}

Value NativeApiReferenceHostObject::get(Runtime& runtime,
                                        const PropNameID& name) {
  std::string property = name.utf8(runtime);
  if (property == "kind") {
    return makeString(runtime, "reference");
  }
  if (property == "address") {
    return static_cast<double>(reinterpret_cast<uintptr_t>(data_));
  }
  if (property == "value") {
    if (data_ == nullptr) {
      if (pendingValue_ != nullptr) {
        return Value(runtime, *pendingValue_);
      }
      return Value::undefined();
    }
    return convertNativeReturnValue(runtime, bridge_, type_, data_);
  }
  if (auto index = parseArrayIndexProperty(property)) {
    if (data_ == nullptr) {
      return Value::undefined();
    }
    void* slot = static_cast<uint8_t*>(data_) +
                 (*index * referenceElementStride(type_));
    return convertNativeReturnValue(runtime, bridge_, type_, slot);
  }
  if (property == "toString") {
    void* data = data_;
    return Function::createFromHostFunction(
        runtime, PropNameID::forAscii(runtime, "toString"), 0,
        [data](Runtime& runtime, const Value&, const Value*, size_t) -> Value {
          char address[32] = {};
          snprintf(address, sizeof(address), "%p", data);
          return makeString(runtime,
                            "<Reference: " + std::string(address) + ">");
        });
  }
  return Value::undefined();
}

void NativeApiReferenceHostObject::set(Runtime& runtime,
                                       const PropNameID& name,
                                       const Value& value) {
  std::string property = name.utf8(runtime);
  auto index = parseArrayIndexProperty(property);
  if (property != "value" && !index) {
    return;
  }
  size_t slotIndex = index.value_or(0);
  NativeApiJsiArgumentFrame frame(1);
  if (data_ == nullptr) {
    if (slotIndex == 0) {
      pendingValue_ = std::make_shared<Value>(runtime, value);
      return;
    }
    ensureStorage(runtime, type_, frame, slotIndex + 1);
  }
  pendingValue_.reset();
  void* slot = static_cast<uint8_t*>(data_) +
               (slotIndex * referenceElementStride(type_));
  convertJsiArgument(runtime, bridge_, type_, value, slot, frame);
}

Value NativeApiStructObjectHostObject::get(Runtime& runtime,
                                           const PropNameID& name) {
  std::string property = name.utf8(runtime);
  if (property == "kind") {
    return makeString(runtime, info_ != nullptr && info_->isUnion ? "union" : "struct");
  }
  if (property == "name") {
    return makeString(runtime, info_ != nullptr ? info_->name : "");
  }
  if (property == "sizeof") {
    return static_cast<double>(info_ != nullptr ? info_->size : 0);
  }
  if (property == "address") {
    return static_cast<double>(reinterpret_cast<uintptr_t>(data_));
  }
  if (property == "toString") {
    auto info = info_;
    return Function::createFromHostFunction(
        runtime, PropNameID::forAscii(runtime, "toString"), 0,
        [info](Runtime& runtime, const Value&, const Value*, size_t) -> Value {
          return makeString(runtime,
                            std::string("[NativeApiJsi ") +
                                (info != nullptr && info->isUnion ? "Union " : "Struct ") +
                                (info != nullptr ? info->name : "") + "]");
        });
  }

  if (info_ != nullptr && data_ != nullptr) {
    for (const auto& field : info_->fields) {
      if (field.name != property) {
        continue;
      }
      void* fieldData = static_cast<uint8_t*>(data_) + field.offset;
      if (field.type.kind == metagen::mdTypeStruct &&
          field.type.aggregateInfo != nullptr) {
        return Object::createFromHostObject(
            runtime, std::make_shared<NativeApiStructObjectHostObject>(
                         bridge_, field.type.aggregateInfo, fieldData, false,
                         ownedData_, backingValue_));
      }
      return convertNativeReturnValue(runtime, bridge_, field.type, fieldData);
    }
  }
  return Value::undefined();
}

void NativeApiStructObjectHostObject::set(Runtime& runtime,
                                          const PropNameID& name,
                                          const Value& value) {
  std::string property = name.utf8(runtime);
  if (info_ == nullptr || data_ == nullptr) {
    throw facebook::jsi::JSError(runtime, "Struct is not initialized.");
  }
  for (const auto& field : info_->fields) {
    if (field.name != property) {
      continue;
    }
    NativeApiJsiArgumentFrame frame(1);
    convertJsiArgument(runtime, bridge_, field.type, value,
                       static_cast<uint8_t*>(data_) + field.offset, frame);
    return;
  }
  throw facebook::jsi::JSError(runtime, "No native struct field: " + property);
}

std::vector<PropNameID> NativeApiStructObjectHostObject::getPropertyNames(
    Runtime& runtime) {
  std::vector<PropNameID> names;
  addPropertyName(runtime, names, "kind");
  addPropertyName(runtime, names, "name");
  addPropertyName(runtime, names, "sizeof");
  addPropertyName(runtime, names, "address");
  addPropertyName(runtime, names, "toString");
  if (info_ != nullptr) {
    for (const auto& field : info_->fields) {
      addPropertyName(runtime, names, field.name.c_str());
    }
  }
  return names;
}

NativeApiJsiType primitiveInteropType(MDTypeKind kind) {
  NativeApiJsiType type;
  type.kind = kind;
  type.ffiType = ffiTypeForJsiKind(kind);
  type.supported = type.ffiType != nullptr;
  return type;
}

std::optional<NativeApiJsiType> primitiveInteropTypeFromCode(int32_t code) {
  MDTypeKind kind = static_cast<MDTypeKind>(code);
  switch (kind) {
    case metagen::mdTypeVoid:
    case metagen::mdTypeBool:
    case metagen::mdTypeChar:
    case metagen::mdTypeUChar:
    case metagen::mdTypeUInt8:
    case metagen::mdTypeSShort:
    case metagen::mdTypeUShort:
    case metagen::mdTypeSInt:
    case metagen::mdTypeUInt:
    case metagen::mdTypeSLong:
    case metagen::mdTypeULong:
    case metagen::mdTypeSInt64:
    case metagen::mdTypeUInt64:
    case metagen::mdTypeFloat:
    case metagen::mdTypeDouble:
    case metagen::mdTypeString:
    case metagen::mdTypeAnyObject:
    case metagen::mdTypeProtocolObject:
    case metagen::mdTypeClass:
    case metagen::mdTypeSelector:
    case metagen::mdTypePointer:
    case metagen::mdTypeOpaquePointer:
    case metagen::mdTypeBlock:
    case metagen::mdTypeFunctionPointer:
      return primitiveInteropType(kind);
    default:
      return std::nullopt;
  }
}

std::optional<NativeApiJsiType> interopTypeFromValue(
    Runtime& runtime, const std::shared_ptr<NativeApiJsiBridge>& bridge,
    const Value& value) {
  if (value.isNumber()) {
    return primitiveInteropTypeFromCode(static_cast<int32_t>(value.getNumber()));
  }

  if (!value.isObject()) {
    return std::nullopt;
  }

  Object object = value.asObject(runtime);
  Value typeCodeValue = object.getProperty(runtime, "__nativeApiTypeCode");
  if (typeCodeValue.isNumber()) {
    return primitiveInteropTypeFromCode(
        static_cast<int32_t>(typeCodeValue.getNumber()));
  }
  Value valueOfValue = object.getProperty(runtime, "valueOf");
  if (valueOfValue.isObject() &&
      valueOfValue.asObject(runtime).isFunction(runtime)) {
    Value primitive =
        valueOfValue.asObject(runtime).asFunction(runtime).callWithThis(
            runtime, object, nullptr, 0);
    if (primitive.isNumber()) {
      return primitiveInteropTypeFromCode(
          static_cast<int32_t>(primitive.getNumber()));
    }
  }

  Class descriptorClass = nativeClassFromJsiObject(runtime, object);
  if (descriptorClass == Nil &&
      stringPropertyOrEmpty(runtime, object, "kind") == "class") {
    descriptorClass =
        static_cast<Class>(pointerFromSymbolLikeObject(runtime, object));
  }
  if (descriptorClass != Nil) {
    return nativeObjectReturnTypeForClass(descriptorClass);
  }

  if (object.isHostObject<NativeApiStructObjectHostObject>(runtime)) {
    auto structObject = object.getHostObject<NativeApiStructObjectHostObject>(runtime);
    NativeApiJsiType type;
    type.kind = metagen::mdTypeStruct;
    type.aggregateInfo = structObject->info();
    type.aggregateOffset = type.aggregateInfo != nullptr
                               ? type.aggregateInfo->offset
                               : MD_SECTION_OFFSET_NULL;
    type.aggregateIsUnion = type.aggregateInfo != nullptr &&
                            type.aggregateInfo->isUnion;
    type.ffiType = type.aggregateInfo != nullptr && type.aggregateInfo->ffi != nullptr
                       ? &type.aggregateInfo->ffi->type
                       : nullptr;
    type.supported = type.ffiType != nullptr;
    return type;
  }

  Value kindValue = object.getProperty(runtime, "kind");
  if (kindValue.isString()) {
    std::string kindName = kindValue.asString(runtime).utf8(runtime);
    if (kindName == "pointer") {
      return primitiveInteropType(metagen::mdTypePointer);
    }
    if (kindName == "reference") {
      return primitiveInteropType(metagen::mdTypePointer);
    }
    if (kindName == "class") {
      return nativeObjectReturnType(metagen::mdTypeInstanceObject);
    }
    if (kindName == "selector") {
      return primitiveInteropType(metagen::mdTypeSelector);
    }
    if (kindName == "protocol") {
      return primitiveInteropType(metagen::mdTypeProtocolObject);
    }
    if (kindName == "block") {
      return primitiveInteropType(metagen::mdTypeBlock);
    }
    if (kindName == "functionPointer") {
      return primitiveInteropType(metagen::mdTypeFunctionPointer);
    }
    if (kindName == "functionReference") {
      return primitiveInteropType(metagen::mdTypeFunctionPointer);
    }
  }
  Value offsetValue = object.getProperty(runtime, "metadataOffset");
  if (kindValue.isString() && offsetValue.isNumber()) {
    std::string kindName = kindValue.asString(runtime).utf8(runtime);
    if (kindName == "struct" || kindName == "union") {
      bool isUnion = kindName == "union";
      auto info = bridge->aggregateInfoFor(
          static_cast<MDSectionOffset>(offsetValue.getNumber()), isUnion);
      NativeApiJsiType type;
      type.kind = metagen::mdTypeStruct;
      type.aggregateInfo = info;
      type.aggregateOffset = info != nullptr ? info->offset : MD_SECTION_OFFSET_NULL;
      type.aggregateIsUnion = isUnion;
      type.ffiType = info != nullptr && info->ffi != nullptr ? &info->ffi->type : nullptr;
      type.supported = type.ffiType != nullptr;
      return type;
    }
  }

  return std::nullopt;
}

Value makeAggregateConstructor(Runtime& runtime,
                               const std::shared_ptr<NativeApiJsiBridge>& bridge,
                               const NativeApiSymbol& symbol) {
  auto info = bridge->aggregateInfoFor(symbol);
  auto constructor = Function::createFromHostFunction(
      runtime, PropNameID::forAscii(runtime, symbol.name.c_str()), 1,
      [bridge, symbol, info](Runtime& runtime, const Value&, const Value* args,
                             size_t count) -> Value {
        if (info == nullptr) {
          throw facebook::jsi::JSError(runtime,
                                       "Native aggregate metadata is unavailable: " +
                                           symbol.name);
        }

        NativeApiJsiType type;
        type.kind = metagen::mdTypeStruct;
        type.aggregateInfo = info;
        type.aggregateOffset = info->offset;
        type.aggregateIsUnion = info->isUnion;
        type.ffiType = info->ffi != nullptr ? &info->ffi->type : nullptr;
        type.supported = type.ffiType != nullptr;

        if (count > 0 && args[0].isObject()) {
          void* pointer = nullptr;
          if (readPointerLikeValue(runtime, args[0], &pointer) && pointer != nullptr) {
            return Object::createFromHostObject(
                runtime, std::make_shared<NativeApiStructObjectHostObject>(
                             bridge, info, pointer, false, nullptr,
                             std::make_shared<Value>(runtime, args[0])));
          }
        }

        std::vector<unsigned char> storage(info->size, 0);
        if (count > 0) {
          NativeApiJsiArgumentFrame frame(1);
          convertAggregateArgument(runtime, bridge, type, args[0],
                                   storage.data(), frame);
        }
        return Object::createFromHostObject(
            runtime, std::make_shared<NativeApiStructObjectHostObject>(
                         bridge, info, storage.data(), true));
      });

  constructor.setProperty(runtime, "kind",
                          makeString(runtime, symbol.kind == NativeApiSymbolKind::Union
                                                   ? "union"
                                                   : "struct"));
  constructor.setProperty(runtime, "runtimeName", makeString(runtime, symbol.runtimeName));
  constructor.setProperty(runtime, "metadataOffset", static_cast<double>(symbol.offset));
  constructor.setProperty(runtime, "sizeof",
                          static_cast<double>(info != nullptr ? info->size : 0));
  constructor.setProperty(
      runtime, "equals",
      Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "equals"), 2,
          [bridge, info](Runtime& runtime, const Value&, const Value* args,
                         size_t count) -> Value {
            if (info == nullptr || count < 2) {
              return false;
            }

            NativeApiJsiType type;
            type.kind = metagen::mdTypeStruct;
            type.aggregateInfo = info;
            type.aggregateOffset = info->offset;
            type.aggregateIsUnion = info->isUnion;
            type.ffiType = info->ffi != nullptr ? &info->ffi->type : nullptr;
            type.supported = type.ffiType != nullptr;

            std::vector<unsigned char> left(info->size, 0);
            std::vector<unsigned char> right(info->size, 0);
            try {
              NativeApiJsiArgumentFrame leftFrame(1);
              convertAggregateArgument(runtime, bridge, type, args[0],
                                       left.data(), leftFrame);
              NativeApiJsiArgumentFrame rightFrame(1);
              convertAggregateArgument(runtime, bridge, type, args[1],
                                       right.data(), rightFrame);
            } catch (const std::exception&) {
              return false;
            }

            return std::memcmp(left.data(), right.data(), info->size) == 0;
          }));
  Array fields(runtime, info != nullptr ? info->fields.size() : 0);
  if (info != nullptr) {
    for (size_t i = 0; i < info->fields.size(); i++) {
      fields.setValueAtIndex(runtime, i, makeString(runtime, info->fields[i].name));
    }
  }
  constructor.setProperty(runtime, "fields", fields);
  return constructor;
}

size_t sizeofInteropType(Runtime& runtime,
                         const std::shared_ptr<NativeApiJsiBridge>& bridge,
                         const Value& value) {
  if (auto type = interopTypeFromValue(runtime, bridge, value)) {
    return nativeSizeForType(*type);
  }

  if (value.isObject()) {
    Object object = value.asObject(runtime);
    if (object.isHostObject<NativeApiPointerHostObject>(runtime) ||
        object.isHostObject<NativeApiReferenceHostObject>(runtime) ||
        object.isHostObject<NativeApiObjectHostObject>(runtime) ||
        nativeClassFromJsiObject(runtime, object) != Nil) {
      return sizeof(void*);
    }
    void* nativePointer = nullptr;
    if (readNativePointerProperty(runtime, object, &nativePointer)) {
      return sizeof(void*);
    }
    Value sizeValue = object.getProperty(runtime, "sizeof");
    if (sizeValue.isNumber()) {
      return static_cast<size_t>(sizeValue.getNumber());
    }
  }

  throw facebook::jsi::JSError(runtime, "Invalid type for interop.sizeof.");
}

Object createPointer(Runtime& runtime,
                     const std::shared_ptr<NativeApiJsiBridge>& bridge,
                     void* pointer, bool adopted) {
  if (!adopted && bridge != nullptr) {
    Value cached = bridge->findPointerValue(runtime, pointer);
    if (cached.isObject()) {
      return cached.asObject(runtime);
    }
  }

  Object result = Object::createFromHostObject(
      runtime,
      std::make_shared<NativeApiPointerHostObject>(bridge, pointer, "pointer",
                                                   adopted));
  if (!adopted && bridge != nullptr) {
    bridge->rememberPointerValue(runtime, pointer, Value(runtime, result));
  }
  return result;
}

void installInteropHasInstance(Runtime& runtime, Function& constructor,
                               const char* kind) {
  Value symbolCtorValue = runtime.global().getProperty(runtime, "Symbol");
  if (!symbolCtorValue.isObject()) {
    return;
  }

  Object symbolCtor = symbolCtorValue.asObject(runtime);
  Value hasInstanceValue = symbolCtor.getProperty(runtime, "hasInstance");
  if (!hasInstanceValue.isSymbol()) {
    return;
  }

  try {
    Object objectCtor = runtime.global().getPropertyAsObject(runtime, "Object");
    Function defineProperty =
        objectCtor.getPropertyAsFunction(runtime, "defineProperty");
    Object descriptor(runtime);
    descriptor.setProperty(runtime, "configurable", true);
    descriptor.setProperty(
        runtime, "value",
        Function::createFromHostFunction(
            runtime, PropNameID::forAscii(runtime, "Symbol.hasInstance"), 1,
            [kind = std::string(kind)](Runtime& runtime, const Value&,
                                       const Value* args, size_t count) -> Value {
              if (count < 1 || !args[0].isObject()) {
                return false;
              }

              Object object = args[0].asObject(runtime);
              Value kindValue = object.getProperty(runtime, "kind");
              return kindValue.isString() &&
                     kindValue.asString(runtime).utf8(runtime) == kind;
            }));
    defineProperty.call(runtime, constructor, hasInstanceValue, descriptor);
  } catch (const std::exception&) {
  }
}

Class classFromJsiValue(Runtime& runtime, const Value& value) {
  if (value.isString()) {
    std::string name = value.asString(runtime).utf8(runtime);
    return objc_lookUpClass(name.c_str());
  }
  if (!value.isObject()) {
    return Nil;
  }
  Object object = value.asObject(runtime);
  if (Class cls = nativeClassFromJsiObject(runtime, object)) {
    return cls;
  }
  if (stringPropertyOrEmpty(runtime, object, "kind") == "class") {
    if (void* pointer = pointerFromSymbolLikeObject(runtime, object)) {
      return static_cast<Class>(pointer);
    }
  }
  if (object.isHostObject<NativeApiObjectHostObject>(runtime)) {
    id nativeObject = object.getHostObject<NativeApiObjectHostObject>(runtime)->object();
    return nativeObject != nil ? object_getClass(nativeObject) : Nil;
  }
  return Nil;
}

Protocol* protocolFromJsiValue(Runtime& runtime, const Value& value) {
  if (value.isString()) {
    std::string name = value.asString(runtime).utf8(runtime);
    Protocol* protocol = objc_getProtocol(name.c_str());
    if (protocol == nullptr) {
      constexpr const char* suffix = "Protocol";
      if (name.size() > std::strlen(suffix) &&
          name.compare(name.size() - std::strlen(suffix), std::strlen(suffix),
                       suffix) == 0) {
        protocol = objc_getProtocol(
            name.substr(0, name.size() - std::strlen(suffix)).c_str());
      }
    }
    return protocol;
  }
  if (!value.isObject()) {
    return nullptr;
  }
  Object object = value.asObject(runtime);
  if (object.isHostObject<NativeApiProtocolHostObject>(runtime)) {
    return object.getHostObject<NativeApiProtocolHostObject>(runtime)
        ->nativeProtocol();
  }
  if (stringPropertyOrEmpty(runtime, object, "kind") == "protocol") {
    return static_cast<Protocol*>(pointerFromSymbolLikeObject(runtime, object));
  }
  if (object.isHostObject<NativeApiPointerHostObject>(runtime)) {
    return static_cast<Protocol*>(
        object.getHostObject<NativeApiPointerHostObject>(runtime)->pointer());
  }
  void* nativePointer = nullptr;
  if (readNativePointerProperty(runtime, object, &nativePointer)) {
    return static_cast<Protocol*>(nativePointer);
  }
  Value nameValue = object.getProperty(runtime, "name");
  if (nameValue.isString()) {
    return protocolFromJsiValue(runtime, nameValue);
  }
  return nullptr;
}

Object createInteropObject(Runtime& runtime,
                           const std::shared_ptr<NativeApiJsiBridge>& bridge) {
  Object interop(runtime);
  Object types(runtime);
  auto setType = [&](const char* name, MDTypeKind kind) {
    Object type(runtime);
    double code = static_cast<double>(kind);
    type.setProperty(runtime, "__nativeApiTypeCode", code);
    type.setProperty(
        runtime, "valueOf",
        Function::createFromHostFunction(
            runtime, PropNameID::forAscii(runtime, "valueOf"), 0,
            [code](Runtime&, const Value&, const Value*, size_t) -> Value {
              return code;
            }));
    type.setProperty(
        runtime, "toString",
        Function::createFromHostFunction(
            runtime, PropNameID::forAscii(runtime, "toString"), 0,
            [code](Runtime& runtime, const Value&, const Value*, size_t) -> Value {
              char text[32] = {};
              snprintf(text, sizeof(text), "%d", static_cast<int>(code));
              return makeString(runtime, text);
            }));
    types.setProperty(runtime, name, type);
  };
  setType("void", metagen::mdTypeVoid);
  setType("bool", metagen::mdTypeBool);
  setType("int8", metagen::mdTypeChar);
  setType("uint8", metagen::mdTypeUInt8);
  setType("int16", metagen::mdTypeSShort);
  setType("uint16", metagen::mdTypeUShort);
  setType("int32", metagen::mdTypeSInt);
  setType("uint32", metagen::mdTypeUInt);
  setType("int64", metagen::mdTypeSInt64);
  setType("uint64", metagen::mdTypeUInt64);
  setType("float", metagen::mdTypeFloat);
  setType("double", metagen::mdTypeDouble);
  setType("UTF8CString", metagen::mdTypeString);
  setType("unichar", metagen::mdTypeUShort);
  setType("id", metagen::mdTypeAnyObject);
  setType("class", metagen::mdTypeClass);
  setType("protocol", metagen::mdTypeProtocolObject);
  setType("SEL", metagen::mdTypeSelector);
  setType("selector", metagen::mdTypeSelector);
  setType("pointer", metagen::mdTypePointer);
  setType("block", metagen::mdTypeBlock);
  setType("functionPointer", metagen::mdTypeFunctionPointer);
  interop.setProperty(runtime, "types", types);

  Function pointerConstructor = Function::createFromHostFunction(
      runtime, PropNameID::forAscii(runtime, "Pointer"), 1,
      [bridge](Runtime& runtime, const Value&, const Value* args,
               size_t count) -> Value {
            if (count > 0 && args[0].isObject()) {
              Object object = args[0].asObject(runtime);
              if (object.isHostObject<NativeApiPointerHostObject>(runtime)) {
                return Value(runtime, object);
              }
            }
            void* pointer = nullptr;
            if (count > 0 && !args[0].isNull() && !args[0].isUndefined()) {
              auto readAddress = [&](const Value& value,
                                     uintptr_t* address) -> bool {
                auto readAddressFromString = [&](const Value& source) -> bool {
                  try {
                    Value stringCtorValue =
                        runtime.global().getProperty(runtime, "String");
                    if (!stringCtorValue.isObject() ||
                        !stringCtorValue.asObject(runtime).isFunction(runtime)) {
                      return false;
                    }
                    Value stringValue =
                        stringCtorValue.asObject(runtime).asFunction(runtime)
                            .call(runtime, source);
                    if (!stringValue.isString()) {
                      return false;
                    }
                    return parseIntegerTextToUintptr(
                        stringValue.asString(runtime).utf8(runtime), address);
                  } catch (const std::exception&) {
                    return false;
                  }
                };

                if (value.isNumber()) {
                  double number = value.getNumber();
                  if (!std::isfinite(number)) {
                    return false;
                  }
                  *address = static_cast<uintptr_t>(
                      static_cast<int64_t>(number));
                  return true;
                }
                if (value.isBigInt()) {
                  if (readAddressFromString(value)) {
                    return true;
                  }
                  BigInt bigint = value.getBigInt(runtime);
                  return parseBigIntToUintptr(runtime, bigint, address);
                }
                if (value.isObject()) {
                  Object object = value.asObject(runtime);
                  Value valueOfValue = object.getProperty(runtime, "valueOf");
                  if (valueOfValue.isObject() &&
                      valueOfValue.asObject(runtime).isFunction(runtime)) {
                    Value primitive = valueOfValue.asObject(runtime)
                                          .asFunction(runtime)
                                          .callWithThis(runtime, object, nullptr, 0);
                    if (primitive.isNumber()) {
                      double number = primitive.getNumber();
                      if (!std::isfinite(number)) {
                        return false;
                      }
                      *address = static_cast<uintptr_t>(
                          static_cast<int64_t>(number));
                      return true;
                    }
                    if (primitive.isBigInt()) {
                      if (readAddressFromString(primitive)) {
                        return true;
                      }
                      BigInt bigint = primitive.getBigInt(runtime);
                      return parseBigIntToUintptr(runtime, bigint, address);
                    }
                  }
                  return readAddressFromString(value);
                }
                return false;
              };

              uintptr_t address = 0;
              if (!readAddress(args[0], &address)) {
                throw facebook::jsi::JSError(runtime,
                                             "Pointer expects a numeric address.");
              }
              pointer = reinterpret_cast<void*>(address);
            }
            return createPointer(runtime, bridge, pointer);
      });
  Object pointerPrototype(runtime);
  pointerPrototype.setProperty(runtime, "constructor", pointerConstructor);
  pointerConstructor.setProperty(runtime, "prototype", pointerPrototype);
  installInteropHasInstance(runtime, pointerConstructor, "pointer");
  pointerConstructor.setProperty(runtime, "kind", makeString(runtime, "pointer"));
  pointerConstructor.setProperty(runtime, "sizeof",
                                 static_cast<double>(sizeof(void*)));
  interop.setProperty(runtime, "Pointer", pointerConstructor);

  Function functionReferenceConstructor = Function::createFromHostFunction(
      runtime, PropNameID::forAscii(runtime, "FunctionReference"), 1,
      [](Runtime& runtime, const Value&, const Value* args,
         size_t count) -> Value {
        if (count < 1 || !args[0].isObject()) {
          throw facebook::jsi::JSError(
              runtime, "FunctionReference expects a function.");
        }

        Object object = args[0].asObject(runtime);
        if (!object.isFunction(runtime)) {
          throw facebook::jsi::JSError(
              runtime, "FunctionReference expects a function.");
        }

        Function function = object.asFunction(runtime);
        function.setProperty(runtime, "kind",
                             makeString(runtime, "functionReference"));
        function.setProperty(runtime, "sizeof",
                             static_cast<double>(sizeof(void*)));
        return function;
      });
  Object functionReferencePrototype(runtime);
  functionReferencePrototype.setProperty(runtime, "constructor",
                                         functionReferenceConstructor);
  functionReferenceConstructor.setProperty(runtime, "prototype",
                                           functionReferencePrototype);
  installInteropHasInstance(runtime, functionReferenceConstructor,
                            "functionReference");
  functionReferenceConstructor.setProperty(runtime, "kind",
                                           makeString(runtime,
                                                      "functionReference"));
  functionReferenceConstructor.setProperty(runtime, "sizeof",
                                           static_cast<double>(sizeof(void*)));
  interop.setProperty(runtime, "FunctionReference",
                      functionReferenceConstructor);

  Function referenceConstructor = Function::createFromHostFunction(
      runtime, PropNameID::forAscii(runtime, "Reference"), 2,
      [bridge](Runtime& runtime, const Value&, const Value* args,
               size_t count) -> Value {
            NativeApiJsiType type = primitiveInteropType(metagen::mdTypePointer);
            bool firstArgumentIsType = false;
            if (count > 1) {
              firstArgumentIsType = true;
            } else if (count == 1 && args[0].isObject()) {
              Object object = args[0].asObject(runtime);
              Value typeCodeValue =
                  object.getProperty(runtime, "__nativeApiTypeCode");
              Value kindValue = object.getProperty(runtime, "kind");
              firstArgumentIsType =
                  typeCodeValue.isNumber() || object.isFunction(runtime) ||
                  nativeClassFromJsiObject(runtime, object) != Nil ||
                  (kindValue.isString() &&
                   (kindValue.asString(runtime).utf8(runtime) == "class" ||
                    kindValue.asString(runtime).utf8(runtime) == "protocol"));
            }
            std::optional<NativeApiJsiType> requestedType =
                firstArgumentIsType
                    ? interopTypeFromValue(runtime, bridge, args[0])
                    : std::nullopt;
            bool hasType = firstArgumentIsType && requestedType.has_value();
            if (hasType) {
              type = *requestedType;
            }

            void* data = nullptr;
            bool ownsData = false;
            size_t byteLength = 0;
            std::shared_ptr<Value> pendingValue;
            if (hasType) {
              bool usesExternalStorage = false;
              Value valueToStore = Value::undefined();
              if (count > 1) {
                valueToStore = Value(runtime, args[1]);
                if (args[1].isObject()) {
                  Object object = args[1].asObject(runtime);
                  if (object.isHostObject<NativeApiPointerHostObject>(runtime)) {
                    data = object
                               .getHostObject<NativeApiPointerHostObject>(
                                   runtime)
                               ->pointer();
                    usesExternalStorage = true;
                  } else if (object.isHostObject<NativeApiReferenceHostObject>(
                                 runtime)) {
                    auto reference =
                        object.getHostObject<NativeApiReferenceHostObject>(
                            runtime);
                    data = reference->data();
                    if (data != nullptr) {
                      usesExternalStorage = true;
                    } else {
                      valueToStore = object.getProperty(runtime, "value");
                    }
                  } else if (type.kind == metagen::mdTypeStruct &&
                             object.isHostObject<
                                 NativeApiStructObjectHostObject>(runtime)) {
                    data = object
                               .getHostObject<
                                   NativeApiStructObjectHostObject>(runtime)
                               ->data();
                    usesExternalStorage = true;
                  } else if (type.kind == metagen::mdTypePointer ||
                             type.kind == metagen::mdTypeOpaquePointer ||
                             type.kind == metagen::mdTypeBlock ||
                             type.kind == metagen::mdTypeFunctionPointer) {
                    void* nativePointer = nullptr;
                    if (readNativePointerProperty(runtime, object,
                                                  &nativePointer)) {
                      data = nativePointer;
                      usesExternalStorage = true;
                    }
                  }
                }
              }
              if (!usesExternalStorage) {
                byteLength = std::max<size_t>(nativeSizeForType(type),
                                              sizeof(void*));
                data = calloc(1, byteLength);
                if (data == nullptr) {
                  throw std::bad_alloc();
                }
                ownsData = true;
                if (count > 1) {
                  NativeApiJsiArgumentFrame frame(1);
                  convertJsiArgument(runtime, bridge, type, valueToStore, data,
                                     frame);
                }
              }
            } else if (count > 0) {
              pendingValue = std::make_shared<Value>(runtime, args[0]);
            }

            if (ownsData && data == nullptr) {
              throw std::bad_alloc();
            }
            return Object::createFromHostObject(
                runtime, std::make_shared<NativeApiReferenceHostObject>(
                             bridge, type, data, ownsData, byteLength,
                             std::move(pendingValue)));
      });
  Object referencePrototype(runtime);
  referencePrototype.setProperty(runtime, "constructor", referenceConstructor);
  referenceConstructor.setProperty(runtime, "prototype", referencePrototype);
  installInteropHasInstance(runtime, referenceConstructor, "reference");
  referenceConstructor.setProperty(runtime, "kind",
                                   makeString(runtime, "reference"));
  referenceConstructor.setProperty(runtime, "sizeof",
                                   static_cast<double>(sizeof(void*)));
  interop.setProperty(runtime, "Reference", referenceConstructor);

  interop.setProperty(
      runtime, "sizeof",
      Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "sizeof"), 1,
          [bridge](Runtime& runtime, const Value&, const Value* args,
                   size_t count) -> Value {
            if (count < 1) {
              throw facebook::jsi::JSError(runtime, "sizeof expects a type.");
            }
            return static_cast<double>(sizeofInteropType(runtime, bridge, args[0]));
          }));

  interop.setProperty(
      runtime, "alloc",
      Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "alloc"), 1,
          [bridge](Runtime& runtime, const Value&, const Value* args,
                   size_t count) -> Value {
            if (count < 1 || !args[0].isNumber()) {
              throw facebook::jsi::JSError(runtime, "alloc expects a byte size.");
            }
            size_t size = static_cast<size_t>(std::max<double>(0, args[0].getNumber()));
            return createPointer(runtime, bridge, calloc(1, size), false);
          }));

  interop.setProperty(
      runtime, "free",
      Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "free"), 1,
          [](Runtime& runtime, const Value&, const Value* args,
             size_t count) -> Value {
            if (count < 1 || !args[0].isObject()) {
              return Value::undefined();
            }
            Object object = args[0].asObject(runtime);
            if (!object.isHostObject<NativeApiPointerHostObject>(runtime)) {
              return Value::undefined();
            }
            auto pointer = object.getHostObject<NativeApiPointerHostObject>(runtime);
            void* raw = pointer->pointer();
            if (raw != nullptr) {
              free(raw);
              pointer->clearWithoutFree();
            }
            return Value::undefined();
          }));

  interop.setProperty(
      runtime, "adopt",
      Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "adopt"), 1,
          [](Runtime& runtime, const Value&, const Value* args,
             size_t count) -> Value {
            if (count < 1 || !args[0].isObject()) {
              throw facebook::jsi::JSError(runtime, "adopt expects a Pointer.");
            }
            Object object = args[0].asObject(runtime);
            if (!object.isHostObject<NativeApiPointerHostObject>(runtime)) {
              throw facebook::jsi::JSError(runtime, "adopt expects a Pointer.");
            }
            object.getHostObject<NativeApiPointerHostObject>(runtime)->adopt();
            return Value(runtime, object);
          }));

  interop.setProperty(
      runtime, "handleof",
      Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "handleof"), 1,
          [bridge](Runtime& runtime, const Value&, const Value* args,
                   size_t count) -> Value {
            if (count < 1 || args[0].isNull() || args[0].isUndefined()) {
              return Value::null();
            }
            if (args[0].isString()) {
              std::string utf8 = args[0].asString(runtime).utf8(runtime);
              char* data = strdup(utf8.c_str());
              return createPointer(runtime, bridge, data);
            }
            if (!args[0].isObject()) {
              return Value::null();
            }
            Object object = args[0].asObject(runtime);
            if (object.isHostObject<NativeApiPointerHostObject>(runtime)) {
              return Value(runtime, object);
            }
            if (object.isHostObject<NativeApiReferenceHostObject>(runtime)) {
              void* data =
                  object.getHostObject<NativeApiReferenceHostObject>(runtime)->data();
              if (data == nullptr) {
                throw facebook::jsi::JSError(
                    runtime, "Cannot get handle of empty Reference.");
              }
              return createPointer(runtime, bridge, data);
            }
            if (object.isHostObject<NativeApiStructObjectHostObject>(runtime)) {
              auto structObject =
                  object.getHostObject<NativeApiStructObjectHostObject>(runtime);
              if (structObject->backingValue() != nullptr) {
                return Value(runtime, *structObject->backingValue());
              }
              return createPointer(runtime, bridge, structObject->data());
            }
            if (object.isHostObject<NativeApiObjectHostObject>(runtime)) {
              return createPointer(
                  runtime, bridge,
                  object.getHostObject<NativeApiObjectHostObject>(runtime)
                      ->object());
            }
            if (Class cls = nativeClassFromJsiObject(runtime, object)) {
              return createPointer(runtime, bridge, cls);
            }
            if (object.isHostObject<NativeApiProtocolHostObject>(runtime)) {
              return createPointer(
                  runtime, bridge,
                  object.getHostObject<NativeApiProtocolHostObject>(runtime)
                      ->nativeProtocol());
            }
            if (void* symbolPointer = pointerFromSymbolLikeObject(runtime, object)) {
              return createPointer(runtime, bridge, symbolPointer);
            }
            void* nativePointer = nullptr;
            if (readNativePointerProperty(runtime, object, &nativePointer)) {
              return createPointer(runtime, bridge, nativePointer);
            }
            Value kindValue = object.getProperty(runtime, "kind");
            if (kindValue.isString() &&
                kindValue.asString(runtime).utf8(runtime) == "functionReference") {
              throw facebook::jsi::JSError(
                  runtime, "Cannot get handle of uninitialized FunctionReference.");
            }
            Value nativeName = object.getProperty(runtime, "nativeName");
            if (nativeName.isString()) {
              std::string name = nativeName.asString(runtime).utf8(runtime);
              void* symbol = dlsym(bridge->selfDl(), name.c_str());
              if (symbol != nullptr) {
                return createPointer(runtime, bridge, symbol);
              }
            }
            return Value::null();
          }));

  interop.setProperty(
      runtime, "stringFromCString",
      Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "stringFromCString"), 2,
          [](Runtime& runtime, const Value&, const Value* args,
             size_t count) -> Value {
            if (count < 1 || args[0].isNull() || args[0].isUndefined()) {
              return Value::null();
            }
            NativeApiJsiArgumentFrame frame(1);
            const char* data =
                static_cast<const char*>(pointerFromJsiValue(runtime, args[0], frame));
            if (data == nullptr) {
              return Value::null();
            }
            if (count > 1 && args[1].isNumber()) {
              size_t length = static_cast<size_t>(std::max<double>(0, args[1].getNumber()));
              return String::createFromUtf8(runtime,
                                            reinterpret_cast<const uint8_t*>(data),
                                            length);
            }
            return makeString(runtime, data);
          }));

  interop.setProperty(
      runtime, "bufferFromData",
      Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "bufferFromData"), 1,
          [](Runtime& runtime, const Value&, const Value* args,
             size_t count) -> Value {
            if (count < 1 || !args[0].isObject()) {
              throw facebook::jsi::JSError(runtime, "Invalid data.");
            }
            Object object = args[0].asObject(runtime);
            if (object.isArrayBuffer(runtime)) {
              return Value(runtime, object);
            }
            id native = nil;
            if (object.isHostObject<NativeApiObjectHostObject>(runtime)) {
              native = object.getHostObject<NativeApiObjectHostObject>(runtime)->object();
            } else if (object.isHostObject<NativeApiPointerHostObject>(runtime)) {
              native = static_cast<id>(
                  object.getHostObject<NativeApiPointerHostObject>(runtime)->pointer());
            }
            if (native == nil || ![native isKindOfClass:[NSData class]]) {
              throw facebook::jsi::JSError(runtime, "Invalid data.");
            }
            NSData* data = static_cast<NSData*>(native);
            return ArrayBuffer(
                runtime, std::make_shared<NativeApiMutableBuffer>(
                             data.bytes, static_cast<size_t>(data.length)));
          }));

  interop.setProperty(
      runtime, "addMethod",
      Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "addMethod"), 2,
          [](Runtime& runtime, const Value&, const Value*, size_t) -> Value {
            throw facebook::jsi::JSError(
                runtime,
                "interop.addMethod requires the JSI class builder layer.");
          }));
  interop.setProperty(
      runtime, "addProtocol",
      Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "addProtocol"), 2,
          [](Runtime& runtime, const Value&, const Value* args,
             size_t count) -> Value {
            if (count < 2) {
              throw facebook::jsi::JSError(
                  runtime, "interop.addProtocol expects class and protocol.");
            }
            Class cls = classFromJsiValue(runtime, args[0]);
            Protocol* protocol = protocolFromJsiValue(runtime, args[1]);
            if (cls == Nil || protocol == nullptr) {
              return false;
            }
            return class_addProtocol(cls, protocol);
          }));

  return interop;
}

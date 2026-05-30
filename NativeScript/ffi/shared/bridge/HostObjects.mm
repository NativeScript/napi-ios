// HostObject::set returns bool on engines whose interceptors can defer an
// unhandled set to the JS prototype chain. JSI's HostObject::set is void, so
// the Hermes backend defines NATIVESCRIPT_NATIVE_API_HOST_SET_VOID and the
// set overrides below collapse their return type/values accordingly.
#ifdef NATIVESCRIPT_NATIVE_API_HOST_SET_VOID
using NativeApiHostSetResult = void;
#define NATIVE_API_SET_RETURN(handled) return
#else
using NativeApiHostSetResult = bool;
#define NATIVE_API_SET_RETURN(handled) return (handled)
#endif

class NativeApiPointerHostObject final
    : public HostObject,
      public std::enable_shared_from_this<NativeApiPointerHostObject> {
 public:
  NativeApiPointerHostObject(std::shared_ptr<NativeApiBridge> bridge,
                             void* pointer, std::string kind = "pointer",
                             bool adopted = false)
      : bridge_(std::move(bridge)),
        pointer_(pointer),
        kind_(std::move(kind)),
        adopted_(adopted) {}

  ~NativeApiPointerHostObject() override {
    if (adopted_ && pointer_ != nullptr) {
      if (bridge_ != nullptr) {
        bridge_->forgetPointerValue(pointer_);
      }
      free(pointer_);
      pointer_ = nullptr;
    }
  }

  void* pointer() const { return pointer_; }
  bool adopted() const { return adopted_; }
  void adopt() { adopted_ = true; }
  void clearWithoutFree() {
    if (bridge_ != nullptr) {
      bridge_->forgetPointerValue(pointer_);
    }
    pointer_ = nullptr;
    adopted_ = false;
  }

  Value get(Runtime& runtime, const PropNameID& name) override {
    std::string property = name.utf8(runtime);
    if (property == "kind") {
      return makeString(runtime, kind_);
    }
    if (property == "address") {
      return static_cast<double>(reinterpret_cast<uintptr_t>(pointer_));
    }
    if (property == "adopted") {
      return adopted_;
    }
    if (property == "takeRetainedValue" || property == "takeUnretainedValue") {
      bool retained = property == "takeRetainedValue";
      std::weak_ptr<NativeApiPointerHostObject> weakSelf = shared_from_this();
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, property.c_str()), 0,
          [weakSelf, retained](Runtime& runtime, const Value&, const Value*,
                               size_t) -> Value {
            auto self = weakSelf.lock();
            if (!self || self->pointer_ == nullptr || self->consumed_) {
              throw JSError(runtime, "Unmanaged value has already been consumed.");
            }
            id object = static_cast<id>(self->pointer_);
            self->consumed_ = true;
            self->pointer_ = nullptr;
            self->adopted_ = false;
            return makeNativeObjectValue(runtime, self->bridge_, object, retained);
          });
    }
    if (property == "add" || property == "subtract") {
      void* pointer = pointer_;
      bool add = property == "add";
      auto bridge = bridge_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, property.c_str()), 1,
          [bridge, pointer, add](Runtime& runtime, const Value&,
                                 const Value* args, size_t count) -> Value {
            if (count < 1 || !args[0].isNumber()) {
              throw JSError(runtime, "Pointer offset must be a number.");
            }
            intptr_t offset = static_cast<intptr_t>(args[0].getNumber());
            intptr_t base = reinterpret_cast<intptr_t>(pointer);
            void* result = reinterpret_cast<void*>(add ? base + offset : base - offset);
            return createPointer(runtime, bridge, result);
          });
    }
    if (property == "toNumber") {
      void* pointer = pointer_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "toNumber"), 0,
          [pointer](Runtime&, const Value&, const Value*, size_t) -> Value {
            return static_cast<double>(reinterpret_cast<uintptr_t>(pointer));
          });
    }
    if (property == "toBigInt") {
      void* pointer = pointer_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "toBigInt"), 0,
          [pointer](Runtime& runtime, const Value&, const Value*, size_t) -> Value {
            return BigInt::fromUint64(
                runtime,
                static_cast<uint64_t>(reinterpret_cast<uintptr_t>(pointer)));
          });
    }
    if (property == "toHexString" || property == "toDecimalString") {
      void* pointer = pointer_;
      bool hex = property == "toHexString";
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, property.c_str()), 0,
          [pointer, hex](Runtime& runtime, const Value&, const Value*, size_t) -> Value {
            if (hex) {
              char text[2 + sizeof(uintptr_t) * 2 + 1] = {};
              snprintf(text, sizeof(text), "0x%llx",
                       static_cast<unsigned long long>(
                           reinterpret_cast<uintptr_t>(pointer)));
              return makeString(runtime, text);
            } else {
              char text[32] = {};
              snprintf(text, sizeof(text), "%lld",
                       static_cast<long long>(reinterpret_cast<intptr_t>(pointer)));
              return makeString(runtime, text);
            }
          });
    }
    if (property == "toString") {
      void* pointer = pointer_;
      std::string kind = kind_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "toString"), 0,
          [pointer, kind](Runtime& runtime, const Value&, const Value*,
                          size_t) -> Value {
            char address[32] = {};
            snprintf(address, sizeof(address), "%p", pointer);
            if (kind == "pointer") {
              return makeString(runtime,
                                "<Pointer: " + std::string(address) + ">");
            }
            return makeString(runtime, "[NativeApi " + kind + " " +
                                           std::string(address) + "]");
          });
    }
    return Value::undefined();
  }

  std::vector<PropNameID> getPropertyNames(Runtime& runtime) override {
    std::vector<PropNameID> names;
    names.reserve(3);
    addPropertyName(runtime, names, "kind");
    addPropertyName(runtime, names, "address");
    addPropertyName(runtime, names, "adopted");
    addPropertyName(runtime, names, "takeRetainedValue");
    addPropertyName(runtime, names, "takeUnretainedValue");
    addPropertyName(runtime, names, "add");
    addPropertyName(runtime, names, "subtract");
    addPropertyName(runtime, names, "toNumber");
    addPropertyName(runtime, names, "toBigInt");
    addPropertyName(runtime, names, "toHexString");
    addPropertyName(runtime, names, "toDecimalString");
    addPropertyName(runtime, names, "toString");
    return names;
  }

 private:
  std::shared_ptr<NativeApiBridge> bridge_;
  void* pointer_ = nullptr;
  std::string kind_;
  bool adopted_ = false;
  bool consumed_ = false;
};

class NativeApiReferenceHostObject final : public HostObject {
 public:
  NativeApiReferenceHostObject(std::shared_ptr<NativeApiBridge> bridge,
                               NativeApiType type, void* data, bool ownsData,
                               size_t byteLength = 0,
                               std::shared_ptr<Value> pendingValue = nullptr,
                               std::shared_ptr<Value> backingValue = nullptr)
      : bridge_(std::move(bridge)),
        type_(std::move(type)),
        data_(data),
        ownsData_(ownsData),
        byteLength_(byteLength),
        pendingValue_(std::move(pendingValue)),
        backingValue_(std::move(backingValue)) {}

  ~NativeApiReferenceHostObject() override {
    if (ownsData_ && data_ != nullptr) {
      free(data_);
      data_ = nullptr;
    }
  }

  void* data() const { return data_; }
  const NativeApiType& type() const { return type_; }
  void ensureStorage(Runtime& runtime, NativeApiType type,
                     NativeApiArgumentFrame& frame, size_t elements = 1);

  Value get(Runtime& runtime, const PropNameID& name) override;
  NativeApiHostSetResult set(Runtime& runtime, const PropNameID& name, const Value& value) override;
  std::vector<PropNameID> getPropertyNames(Runtime& runtime) override {
    std::vector<PropNameID> names;
    addPropertyName(runtime, names, "kind");
    addPropertyName(runtime, names, "value");
    addPropertyName(runtime, names, "address");
    addPropertyName(runtime, names, "toString");
    return names;
  }

 private:
  std::shared_ptr<NativeApiBridge> bridge_;
  NativeApiType type_;
  void* data_ = nullptr;
  bool ownsData_ = false;
  size_t byteLength_ = 0;
  std::shared_ptr<Value> pendingValue_;
  std::shared_ptr<Value> backingValue_;
};

class NativeApiStructObjectHostObject final : public HostObject {
 public:
  NativeApiStructObjectHostObject(
      std::shared_ptr<NativeApiBridge> bridge,
      std::shared_ptr<NativeApiAggregateInfo> info,
      const void* data = nullptr, bool ownsData = true,
      std::shared_ptr<std::vector<unsigned char>> storageOwner = nullptr,
      std::shared_ptr<Value> backingValue = nullptr)
      : bridge_(std::move(bridge)),
        info_(std::move(info)),
        ownedData_(std::move(storageOwner)),
        backingValue_(std::move(backingValue)),
        ownsData_(ownsData) {
    size_t size = info_ != nullptr ? info_->size : 0;
    if (ownedData_ != nullptr) {
      data_ = const_cast<void*>(data);
      ownsData_ = false;
    } else if (ownsData_) {
      ownedData_ = std::make_shared<std::vector<unsigned char>>(size, 0);
      if (data != nullptr && size > 0) {
        std::memcpy(ownedData_->data(), data, size);
      }
      data_ = ownedData_->empty() ? nullptr : ownedData_->data();
    } else {
      data_ = const_cast<void*>(data);
    }
  }

  void* data() const { return data_; }
  std::shared_ptr<NativeApiAggregateInfo> info() const { return info_; }
  std::shared_ptr<std::vector<unsigned char>> storageOwner() const {
    return ownedData_;
  }
  std::shared_ptr<Value> backingValue() const { return backingValue_; }

  Value get(Runtime& runtime, const PropNameID& name) override;
  NativeApiHostSetResult set(Runtime& runtime, const PropNameID& name, const Value& value) override;
  std::vector<PropNameID> getPropertyNames(Runtime& runtime) override;

 private:
  std::shared_ptr<NativeApiBridge> bridge_;
  std::shared_ptr<NativeApiAggregateInfo> info_;
  std::shared_ptr<std::vector<unsigned char>> ownedData_;
  std::shared_ptr<Value> backingValue_;
  void* data_ = nullptr;
  bool ownsData_ = true;
};

class NativeApiFastEnumerationIteratorHostObject final : public HostObject {
 public:
  NativeApiFastEnumerationIteratorHostObject(
      std::shared_ptr<NativeApiBridge> bridge, id<NSFastEnumeration> collection)
      : bridge_(std::move(bridge)), collection_(collection) {
    [(id)collection_ retain];
  }

  ~NativeApiFastEnumerationIteratorHostObject() override {
    [(id)collection_ release];
    collection_ = nil;
  }

  Value get(Runtime& runtime, const PropNameID& name) override {
    std::string property = name.utf8(runtime);
    if (property == "next") {
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "next"), 0,
          [this](Runtime& runtime, const Value&, const Value*, size_t) -> Value {
            return next(runtime);
          });
    }
    return Value::undefined();
  }

  std::vector<PropNameID> getPropertyNames(Runtime& runtime) override {
    std::vector<PropNameID> names;
    addPropertyName(runtime, names, "next");
    return names;
  }

 private:
  Value next(Runtime& runtime) {
    Object result(runtime);
    if (done_ || collection_ == nil) {
      result.setProperty(runtime, "done", true);
      return result;
    }

    if (stackIndex_ >= stackLength_) {
      stackLength_ = [collection_ countByEnumeratingWithState:&state_
                                                      objects:stack_
                                                        count:16];
      stackIndex_ = 0;
      if (stackLength_ == 0) {
        done_ = true;
        result.setProperty(runtime, "done", true);
        return result;
      }
    }

    id value = state_.itemsPtr[stackIndex_++];
    NativeApiType valueType = nativeObjectReturnTypeForClass(object_getClass(value));
    result.setProperty(runtime, "value",
                       convertNativeReturnValue(runtime, bridge_, valueType, &value));
    result.setProperty(runtime, "done", false);
    return result;
  }

  std::shared_ptr<NativeApiBridge> bridge_;
  id<NSFastEnumeration> collection_ = nil;
  NSFastEnumerationState state_ = {};
  id __unsafe_unretained stack_[16] = {};
  NSUInteger stackLength_ = 0;
  NSUInteger stackIndex_ = 0;
  bool done_ = false;
};

NativeApiSymbol nativeApiSymbolForRuntimeClass(
    const std::shared_ptr<NativeApiBridge>& bridge, Class cls) {
  const char* name = cls != Nil ? class_getName(cls) : "";
  if (bridge != nullptr) {
    if (const NativeApiSymbol* symbol = bridge->findClassForRuntimePointer(cls)) {
      return *symbol;
    }
    if (const NativeApiSymbol* symbol = bridge->findClassForRuntimeClass(cls)) {
      return *symbol;
    }
    if (name != nullptr) {
      if (const NativeApiSymbol* symbol = bridge->findClass(name)) {
        return *symbol;
      }
    }
  }

  return NativeApiSymbol{
      .kind = NativeApiSymbolKind::Class,
      .offset = MD_SECTION_OFFSET_NULL,
      .name = name != nullptr ? name : "",
      .runtimeName = name != nullptr ? name : "",
  };
}

class NativeApiSuperHostObject final : public HostObject {
 public:
  NativeApiSuperHostObject(std::shared_ptr<NativeApiBridge> bridge,
                           id receiver, Class dispatchClass)
      : bridge_(std::move(bridge)),
        receiver_(receiver),
        dispatchClass_(dispatchClass) {
    if (receiver_ != nil) {
      [receiver_ retain];
    }
  }

  ~NativeApiSuperHostObject() override {
    if (receiver_ != nil) {
      [receiver_ release];
      receiver_ = nil;
    }
  }

  Value get(Runtime& runtime, const PropNameID& name) override {
    std::string property = name.utf8(runtime);
    if (property == "kind") {
      return makeString(runtime, "super");
    }
    if (property == "toString") {
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "toString"), 0,
          [](Runtime& runtime, const Value&, const Value*, size_t) -> Value {
            return makeString(runtime, "[NativeApiSuper]");
          });
    }
    if (receiver_ == nil || dispatchClass_ == Nil) {
      return Value::undefined();
    }

    if (const NativeApiSymbol* symbol =
            bridge_->findClassForRuntimeClass(dispatchClass_)) {
      const auto& members = bridge_->membersForClass(*symbol);
      if (const NativeApiMember* propertyMember =
              selectPropertyMember(members, property, false)) {
        SEL selector = sel_getUid(propertyMember->selectorName.c_str());
        if (class_getInstanceMethod(dispatchClass_, selector) != nullptr) {
          return callObjCSelector(runtime, bridge_, receiver_, false,
                                  propertyMember->selectorName, propertyMember,
                                  nullptr, 0, dispatchClass_);
        }
      }

      if (hasMethodMember(members, property, false)) {
        auto bridge = bridge_;
        id receiver = receiver_;
        Class dispatchClass = dispatchClass_;
        std::string memberName = property;
        return Function::createFromHostFunction(
            runtime, PropNameID::forAscii(runtime, property.c_str()), 0,
            [bridge, receiver, dispatchClass, memberName](
                Runtime& runtime, const Value&, const Value* args,
                size_t count) -> Value {
              const NativeApiSymbol* symbol =
                  bridge->findClassForRuntimeClass(dispatchClass);
              if (symbol == nullptr) {
                throw JSError(
                    runtime, "Objective-C metadata is not available for super.");
              }
              const NativeApiMember* selected = selectMethodMember(
                  bridge->membersForClass(*symbol), memberName, false, count);
              if (selected == nullptr) {
                throw JSError(
                    runtime, "Objective-C super selector is not available: " +
                                 memberName);
              }
              return callObjCSelector(runtime, bridge, receiver, false,
                                      selected->selectorName, selected, args,
                                      count, dispatchClass);
            });
      }
    }

    return Value::undefined();
  }

  NativeApiHostSetResult set(Runtime& runtime, const PropNameID& name, const Value& value) override {
    std::string property = name.utf8(runtime);
    if (receiver_ == nil || dispatchClass_ == Nil) {
      throw JSError(runtime, "Cannot set property on nil super.");
    }

    if (const NativeApiSymbol* symbol =
            bridge_->findClassForRuntimeClass(dispatchClass_)) {
      const auto& members = bridge_->membersForClass(*symbol);
      if (const NativeApiMember* propertyMember =
              selectWritablePropertyMember(members, property, false)) {
        if (propertyMember->readonly ||
            propertyMember->setterSelectorName.empty()) {
          throw JSError(
              runtime, "Attempted to assign to readonly property.");
        }
        NativeApiMember setterMember = *propertyMember;
        setterMember.selectorName = propertyMember->setterSelectorName;
        setterMember.signatureOffset = propertyMember->setterSignatureOffset;
        Value args[] = {Value(runtime, value)};
        callObjCSelector(runtime, bridge_, receiver_, false,
                         setterMember.selectorName, &setterMember, args, 1,
                         dispatchClass_);
        NATIVE_API_SET_RETURN(true);
      }
    }

    std::string setterSelectorName = setterSelectorForProperty(property);
    SEL selector = sel_getUid(setterSelectorName.c_str());
    if (class_getInstanceMethod(dispatchClass_, selector) != nullptr) {
      Value args[] = {Value(runtime, value)};
      callObjCSelector(runtime, bridge_, receiver_, false, setterSelectorName,
                       nullptr, args, 1, dispatchClass_);
      NATIVE_API_SET_RETURN(true);
    }

    throw JSError(runtime,
                                 "No writable native super property: " +
                                     property);
  }

  std::vector<PropNameID> getPropertyNames(Runtime& runtime) override {
    std::vector<PropNameID> names;
    addPropertyName(runtime, names, "kind");
    addPropertyName(runtime, names, "toString");
    return names;
  }

 private:
  std::shared_ptr<NativeApiBridge> bridge_;
  id receiver_ = nil;
  Class dispatchClass_ = Nil;
};

struct NativeApiRuntimeMember {
  std::string name;
  std::string selectorName;
  size_t argumentCount = 0;
};

std::vector<NativeApiRuntimeMember> runtimeMembersForClass(Class cls,
                                                                 bool staticMembers) {
  std::vector<NativeApiRuntimeMember> members;
  if (cls == Nil) {
    return members;
  }

  std::unordered_set<std::string> seen;
  Class current = staticMembers ? object_getClass(cls) : cls;
  while (current != Nil) {
    unsigned int methodCount = 0;
    Method* methods = class_copyMethodList(current, &methodCount);
    for (unsigned int i = 0; i < methodCount; i++) {
      SEL selector = method_getName(methods[i]);
      const char* selectorName = selector != nullptr ? sel_getName(selector) : nullptr;
      if (selectorName == nullptr || selectorName[0] == '\0') {
        continue;
      }

      std::string selectorString(selectorName);
      std::string name = jsifySelector(selectorString.c_str());
      if (name.empty()) {
        continue;
      }

      size_t argumentCount = selectorArgumentCount(selectorString);
      std::string key = name + "\x1f" + std::to_string(argumentCount);
      if (!seen.insert(key).second) {
        continue;
      }

      members.push_back(NativeApiRuntimeMember{
          .name = std::move(name),
          .selectorName = std::move(selectorString),
          .argumentCount = argumentCount,
      });
    }
    if (methods != nullptr) {
      free(methods);
    }
    current = class_getSuperclass(current);
  }

  return members;
}

bool hasRuntimeMemberForName(Class cls, bool staticMembers,
                             const std::string& name) {
  auto members = runtimeMembersForClass(cls, staticMembers);
  for (const auto& member : members) {
    if (member.name == name) {
      return true;
    }
  }
  return false;
}

std::optional<std::string> selectRuntimeSelectorForName(
    Class cls, bool staticMembers, const std::string& name, size_t count) {
  auto members = runtimeMembersForClass(cls, staticMembers);
  for (const auto& member : members) {
    if (member.name == name && member.argumentCount == count) {
      return member.selectorName;
    }
  }
  return std::nullopt;
}

Array runtimeMembersArray(Runtime& runtime, Class cls, bool staticMembers) {
  auto members = runtimeMembersForClass(cls, staticMembers);
  Array result(runtime, members.size());
  for (size_t i = 0; i < members.size(); i++) {
    const auto& member = members[i];
    Object descriptor(runtime);
    descriptor.setProperty(runtime, "name", makeString(runtime, member.name));
    descriptor.setProperty(runtime, "selectorName",
                           makeString(runtime, member.selectorName));
    descriptor.setProperty(runtime, "argumentCount",
                           static_cast<double>(member.argumentCount));
    descriptor.setProperty(runtime, "property", false);
    descriptor.setProperty(runtime, "readonly", false);
    descriptor.setProperty(runtime, "setterSelectorName", makeString(runtime, ""));
    result.setValueAtIndex(runtime, i, descriptor);
  }
  return result;
}

class NativeApiObjectHostObject final
    : public HostObject,
      public std::enable_shared_from_this<NativeApiObjectHostObject> {
 public:
  NativeApiObjectHostObject(std::shared_ptr<NativeApiBridge> bridge,
                            id object, bool ownsObject)
      : bridge_(std::move(bridge)), object_(object), ownsObject_(ownsObject) {
    if (object_ != nil && !ownsObject_) {
      [object_ retain];
      ownsObject_ = true;
    }
  }

  ~NativeApiObjectHostObject() override {
    if (ownsObject_ && object_ != nil) {
      [object_ release];
      object_ = nil;
    }
  }

  id object() const { return object_; }

  // Store a JS-owned property as a bridge expando (read back by get()). Used by
  // engine adapters whose exotic property storage doesn't fall back to own
  // properties when the host set handler defers.
  void storeOwnExpando(Runtime& runtime, const std::string& property,
                       const Value& value) {
    if (object_ != nil) {
      bridge_->setObjectExpando(runtime, object_, property, value);
    }
  }

  void disownObject(id expected) {
    if (object_ == expected) {
      ownsObject_ = false;
      object_ = nil;
    }
  }

  static bool isInitializerSelector(const std::string& selectorName) {
    return selectorName.rfind("init", 0) == 0;
  }

  static id nativeObjectFromValue(Runtime& runtime, const Value& value) {
    if (!value.isObject()) {
      return nil;
    }
    Object object = value.asObject(runtime);
    if (!object.isHostObject<NativeApiObjectHostObject>(runtime)) {
      return nil;
    }
    return object.getHostObject<NativeApiObjectHostObject>(runtime)->object();
  }

  static Value descriptionString(Runtime& runtime, id object) {
    NSString* description = nil;
    performDirectObjCInvocation(runtime, [&]() {
      description = [(object != nil ? [object description] : @"<nil>") copy];
    });
    std::string text = description.UTF8String ?: "";
    [description release];
    return makeString(runtime, text);
  }

  Value callObjectSelector(Runtime& runtime, const std::string& selectorName,
                           const NativeApiMember* member, const Value* args,
                           size_t count, Class dispatchSuperClass = Nil) {
    id receiver = object_;
    if (receiver == nil) {
      throw JSError(runtime,
                                   "Cannot send Objective-C selector to nil.");
    }

    const bool initializer = isInitializerSelector(selectorName);
    std::optional<Object> classWrapper;
    if (initializer) {
      Value classWrapperValue = bridge_->findObjectExpando(
          runtime, receiver, "__nativeApiClassWrapper");
      if (classWrapperValue.isObject()) {
        classWrapper.emplace(classWrapperValue.asObject(runtime));
      }
      bridge_->forgetRoundTripValue(runtime, receiver);
      bridge_->forgetObjectExpandos(receiver);
    }

    Value result =
        callObjCSelector(runtime, bridge_, receiver, false, selectorName, member,
                         args, count, dispatchSuperClass);
    if (initializer) {
      id resultObject = nativeObjectFromValue(runtime, result);
      disownObject(receiver);
      if (resultObject != nil) {
        // Re-adopt the init result on this host object so that JS overrides
        // returning `this` still have a valid native object.
        object_ = resultObject;
        ownsObject_ = true;
        [object_ retain];
        if (classWrapper) {
          bridge_->setObjectExpando(runtime, resultObject,
                                    "__nativeApiClassWrapper",
                                    Value(runtime, *classWrapper));
          if (result.isObject()) {
            Value prototypeValue = classWrapper->getProperty(runtime, "prototype");
            if (prototypeValue.isObject()) {
              Object resultValue = result.asObject(runtime);
              Object prototype = prototypeValue.asObject(runtime);
              SetNativeApiObjectPrototype(runtime, resultValue, prototype);
            }
          }
        }
      }
    }
    return result;
  }

  Value callPreparedObjectSelector(
      Runtime& runtime, const std::string& selectorName,
      const NativeApiPreparedObjCInvocation& prepared, const Value* args,
      size_t count, Class dispatchSuperClass = Nil) {
    id receiver = object_;
    if (receiver == nil) {
      throw JSError(runtime,
                    "Cannot send Objective-C selector to nil.");
    }

    const bool initializer = isInitializerSelector(selectorName);
    std::optional<Object> classWrapper;
    if (initializer) {
      Value classWrapperValue = bridge_->findObjectExpando(
          runtime, receiver, "__nativeApiClassWrapper");
      if (classWrapperValue.isObject()) {
        classWrapper.emplace(classWrapperValue.asObject(runtime));
      }
      bridge_->forgetRoundTripValue(runtime, receiver);
      bridge_->forgetObjectExpandos(receiver);
    }

    Value result = callPreparedObjCSelector(
        runtime, bridge_, receiver, false, prepared, args, count,
        dispatchSuperClass);
    if (initializer) {
      id resultObject = nativeObjectFromValue(runtime, result);
      disownObject(receiver);
      if (resultObject != nil) {
        // Re-adopt the init result on this host object so that JS overrides
        // returning `this` still have a valid native object.
        object_ = resultObject;
        ownsObject_ = true;
        [object_ retain];
        if (classWrapper) {
          bridge_->setObjectExpando(runtime, resultObject,
                                    "__nativeApiClassWrapper",
                                    Value(runtime, *classWrapper));
          if (result.isObject()) {
            Value prototypeValue = classWrapper->getProperty(runtime, "prototype");
            if (prototypeValue.isObject()) {
              Object resultValue = result.asObject(runtime);
              Object prototype = prototypeValue.asObject(runtime);
              SetNativeApiObjectPrototype(runtime, resultValue, prototype);
            }
          }
        }
      }
    }
    return result;
  }

  Value prototypeFunctionForProperty(Runtime& runtime,
                                     const std::string& property) {
    if (object_ == nil || property.empty()) {
      return Value::undefined();
    }

    Value classWrapperValue = bridge_->findObjectExpando(
        runtime, object_, "__nativeApiClassWrapper");
    if (!classWrapperValue.isObject()) {
      classWrapperValue = bridge_->findClassValue(runtime, object_getClass(object_));
    }
    if (!classWrapperValue.isObject()) {
      if (const NativeApiSymbol* symbol =
              bridge_->findClassForRuntimeClass(object_getClass(object_))) {
        classWrapperValue = bridge_->findClassValue(
            runtime, objc_lookUpClass(symbol->runtimeName.c_str()));
      }
    }
    if (!classWrapperValue.isObject()) {
      return Value::undefined();
    }

    Object classWrapper = classWrapperValue.asObject(runtime);
    Value prototypeValue = classWrapper.getProperty(runtime, "prototype");
    if (!prototypeValue.isObject()) {
      return Value::undefined();
    }

    Object objectConstructor =
        runtime.global().getPropertyAsObject(runtime, "Object");
    Function getOwnPropertyDescriptor =
        objectConstructor.getPropertyAsFunction(runtime,
                                                "getOwnPropertyDescriptor");
    Function getPrototypeOf =
        objectConstructor.getPropertyAsFunction(runtime, "getPrototypeOf");
    Value propertyName = makeString(runtime, property);
    Value currentValue(runtime, prototypeValue);

    for (size_t depth = 0; depth < 64 && currentValue.isObject(); depth++) {
      Object current = currentValue.asObject(runtime);
      Value descriptorValue =
          getOwnPropertyDescriptor.call(runtime, Value(runtime, current),
                                        propertyName);
      if (descriptorValue.isObject()) {
        Value functionValue =
            descriptorValue.asObject(runtime).getProperty(runtime, "value");
        if (functionValue.isObject() &&
            functionValue.asObject(runtime).isFunction(runtime)) {
          bridge_->setObjectExpando(runtime, object_, property, functionValue);
          return functionValue;
        }
        return Value::undefined();
      }
      currentValue =
          getPrototypeOf.call(runtime, Value(runtime, current));
    }

    return Value::undefined();
  }

  // Invoke a JS-prototype getter accessor with this instance as the receiver.
  // Sets *found and returns the resolved value.
  Value resolveEnginePrototypeGetter(Runtime& runtime,
                                     const std::string& property, bool* found) {
    *found = false;
    if (object_ == nil || property.empty()) {
      return Value::undefined();
    }
    Value classWrapperValue =
        bridge_->findObjectExpando(runtime, object_, "__nativeApiClassWrapper");
    if (!classWrapperValue.isObject()) {
      classWrapperValue =
          bridge_->findClassValue(runtime, object_getClass(object_));
    }
    if (!classWrapperValue.isObject()) {
      return Value::undefined();
    }
    Value prototypeValue =
        classWrapperValue.asObject(runtime).getProperty(runtime, "prototype");
    if (!prototypeValue.isObject()) {
      return Value::undefined();
    }
    Object objectConstructor =
        runtime.global().getPropertyAsObject(runtime, "Object");
    Function getOwnPropertyDescriptor =
        objectConstructor.getPropertyAsFunction(runtime, "getOwnPropertyDescriptor");
    Function getPrototypeOf =
        objectConstructor.getPropertyAsFunction(runtime, "getPrototypeOf");
    Value propertyName = makeString(runtime, property);
    Value currentValue(runtime, prototypeValue);
    for (size_t depth = 0; depth < 64 && currentValue.isObject(); depth++) {
      Object current = currentValue.asObject(runtime);
      Value descriptorValue = getOwnPropertyDescriptor.call(
          runtime, Value(runtime, current), propertyName);
      if (descriptorValue.isObject()) {
        Object descriptor = descriptorValue.asObject(runtime);
        Value getterValue = descriptor.getProperty(runtime, "get");
        if (getterValue.isObject() &&
            getterValue.asObject(runtime).isFunction(runtime)) {
          Value thisValue = bridge_->findRoundTripValue(runtime, object_);
          if (thisValue.isObject()) {
            *found = true;
            return getterValue.asObject(runtime).asFunction(runtime).callWithThis(
                runtime, thisValue.asObject(runtime),
                static_cast<const Value*>(nullptr), static_cast<size_t>(0));
          }
        }
        Value dataValue = descriptor.getProperty(runtime, "value");
        if (!dataValue.isUndefined()) {
          *found = true;
          return dataValue;
        }
        return Value::undefined();
      }
      currentValue = getPrototypeOf.call(runtime, Value(runtime, current));
    }
    return Value::undefined();
  }

  // Invoke a JS-prototype setter accessor with this instance as the receiver.
  // Returns true when a setter was found and invoked.
  bool invokeEnginePrototypeSetter(Runtime& runtime, const std::string& property,
                                   const Value& value) {
    if (object_ == nil || property.empty()) {
      return false;
    }
    Value classWrapperValue =
        bridge_->findObjectExpando(runtime, object_, "__nativeApiClassWrapper");
    if (!classWrapperValue.isObject()) {
      classWrapperValue =
          bridge_->findClassValue(runtime, object_getClass(object_));
    }
    if (!classWrapperValue.isObject()) {
      return false;
    }
    Value prototypeValue =
        classWrapperValue.asObject(runtime).getProperty(runtime, "prototype");
    if (!prototypeValue.isObject()) {
      return false;
    }
    Object objectConstructor =
        runtime.global().getPropertyAsObject(runtime, "Object");
    Function getOwnPropertyDescriptor =
        objectConstructor.getPropertyAsFunction(runtime, "getOwnPropertyDescriptor");
    Function getPrototypeOf =
        objectConstructor.getPropertyAsFunction(runtime, "getPrototypeOf");
    Value propertyName = makeString(runtime, property);
    Value currentValue(runtime, prototypeValue);
    for (size_t depth = 0; depth < 64 && currentValue.isObject(); depth++) {
      Object current = currentValue.asObject(runtime);
      Value descriptorValue = getOwnPropertyDescriptor.call(
          runtime, Value(runtime, current), propertyName);
      if (descriptorValue.isObject()) {
        Value setterValue =
            descriptorValue.asObject(runtime).getProperty(runtime, "set");
        if (setterValue.isObject() &&
            setterValue.asObject(runtime).isFunction(runtime)) {
          Value thisValue = bridge_->findRoundTripValue(runtime, object_);
          if (thisValue.isObject()) {
            Value args[] = {Value(runtime, value)};
            setterValue.asObject(runtime).asFunction(runtime).callWithThis(
                runtime, thisValue.asObject(runtime),
                static_cast<const Value*>(args), static_cast<size_t>(1));
            return true;
          }
        }
        return false;
      }
      currentValue = getPrototypeOf.call(runtime, Value(runtime, current));
    }
    return false;
  }

  Value get(Runtime& runtime, const PropNameID& name) override {
    std::string property = name.utf8(runtime);

    // Fast path: check expando cache first (hot path for method calls).
    Value expando = bridge_->findObjectExpando(runtime, object_, property);
    if (!expando.isUndefined()) {
      return expando;
    }

    if (property == "kind") {
      return makeString(runtime, "object");
    }
    if (property == "className") {
      return makeString(runtime, object_ != nil ? object_getClassName(object_) : "");
    }
    if (property == "nativeAddress") {
      char address[32] = {};
      snprintf(address, sizeof(address), "%p", object_);
      return makeString(runtime, address);
    }
    if (property == "class") {
      auto bridge = bridge_;
      id object = object_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "class"), 0,
          [bridge, object](Runtime& runtime, const Value&, const Value*,
                           size_t) -> Value {
            if (object == nil) {
              return Value::undefined();
            }
            Value classWrapper = bridge->findObjectExpando(
                runtime, object, "__nativeApiClassWrapper");
            if (classWrapper.isObject()) {
              return classWrapper;
            }
            NativeApiSymbol symbol =
                nativeApiSymbolForRuntimeClass(bridge, object_getClass(object));
            return makeNativeClassValue(runtime, bridge, std::move(symbol));
          });
    }
    if (property == "constructor") {
      if (object_ == nil) {
        return Value::undefined();
      }
      Value classWrapper = bridge_->findObjectExpando(
          runtime, object_, "__nativeApiClassWrapper");
      if (classWrapper.isObject()) {
        return classWrapper;
      }
      NativeApiSymbol symbol =
          nativeApiSymbolForRuntimeClass(bridge_, object_getClass(object_));
      return makeNativeClassValue(runtime, bridge_, std::move(symbol));
    }
    if (property == "superclass") {
      if (object_ == nil) {
        return Value::undefined();
      }
      Class superclass = class_getSuperclass(object_getClass(object_));
      if (superclass == Nil) {
        return Value::null();
      }
      NativeApiSymbol symbol = nativeApiSymbolForRuntimeClass(bridge_, superclass);
      return makeNativeClassValue(runtime, bridge_, std::move(symbol));
    }
    if (property == "super") {
      Class dispatchClass =
          object_ != nil ? class_getSuperclass(object_getClass(object_)) : Nil;
      return Object::createFromHostObject(
          runtime,
          std::make_shared<NativeApiSuperHostObject>(bridge_, object_,
                                                     dispatchClass));
    }
    if (property == "invoke" || property == "send") {
      auto bridge = bridge_;
      id object = object_;
      std::weak_ptr<NativeApiObjectHostObject> weakSelf = shared_from_this();
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, property.c_str()), 1,
          [bridge, object, weakSelf](Runtime& runtime, const Value&,
                                     const Value* args,
                                     size_t count) -> Value {
            std::string selectorName =
                readStringArg(runtime, args, count, 0, "selector");
            if (auto self = weakSelf.lock()) {
              return self->callObjectSelector(runtime, selectorName, nullptr,
                                              args + 1, count - 1);
            }
              return callObjCSelector(runtime, bridge, object, false, selectorName,
                                    nullptr, args + 1, count - 1);
          });
    }
    if (property == "takeRetainedValue" || property == "takeUnretainedValue") {
      bool retained = property == "takeRetainedValue";
      std::weak_ptr<NativeApiObjectHostObject> weakSelf = shared_from_this();
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, property.c_str()), 0,
          [weakSelf, retained](Runtime& runtime, const Value&, const Value*,
                               size_t) -> Value {
            auto self = weakSelf.lock();
            if (!self || self->object_ == nil || self->consumed_) {
              throw JSError(runtime, "Unmanaged value has already been consumed.");
            }

            id object = self->object_;
            if (self->bridge_ != nullptr) {
              self->bridge_->forgetRoundTripValue(runtime, object);
            }
            if (self->ownsObject_) {
              [object release];
            }
            self->object_ = nil;
            self->ownsObject_ = false;
            self->consumed_ = true;
            return makeNativeObjectValue(runtime, self->bridge_, object, retained);
          });
    }
    if (property == "toString") {
      id object = object_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "toString"), 0,
          [object](Runtime& runtime, const Value&, const Value*, size_t) -> Value {
            return NativeApiObjectHostObject::descriptionString(runtime, object);
              });
    }
    if (property == "description") {
      return descriptionString(runtime, object_);
    }
    if (property == "URL" && object_ != nil &&
        [object_ respondsToSelector:@selector(URL)]) {
      return callObjectSelector(runtime, "URL", nullptr, nullptr, 0);
    }
    if (property == "Symbol.iterator" ||
        property == "Symbol(Symbol.iterator)" ||
        property == "@@iterator") {
      auto bridge = bridge_;
      id object = object_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "Symbol.iterator"), 0,
          [bridge, object](Runtime& runtime, const Value&, const Value*,
                           size_t) -> Value {
            if (object == nil ||
                ![object conformsToProtocol:@protocol(NSFastEnumeration)]) {
              throw JSError(
                  runtime, "Object does not conform to NSFastEnumeration.");
            }
            return Object::createFromHostObject(
                runtime,
                std::make_shared<NativeApiFastEnumerationIteratorHostObject>(
                    bridge, static_cast<id<NSFastEnumeration>>(object)));
          });
    }

#if TARGET_OS_OSX
    if (property == "initWithRedGreenBlueAlpha") {
      Class nsColorClass = NSClassFromString(@"NSColor");
      if (object_ != nil && nsColorClass != Nil &&
          [object_ isKindOfClass:nsColorClass]) {
        auto bridge = bridge_;
        return Function::createFromHostFunction(
            runtime, PropNameID::forAscii(runtime, property.c_str()), 4,
            [bridge, nsColorClass](Runtime& runtime, const Value&,
                                   const Value* args, size_t count) -> Value {
              const char* selectors[] = {
                  "colorWithSRGBRed:green:blue:alpha:",
                  "colorWithCalibratedRed:green:blue:alpha:",
                  "colorWithDeviceRed:green:blue:alpha:",
              };
              for (const char* selectorName : selectors) {
                if (class_getClassMethod(nsColorClass,
                                         sel_getUid(selectorName)) != nullptr) {
                  return callObjCSelector(runtime, bridge,
                                          static_cast<id>(nsColorClass), true,
                                          selectorName, nullptr, args, count);
                }
              }
              throw JSError(
                  runtime, "NSColor RGB initializer is not available.");
            });
      }
    }
#endif

    if (property == "initWithFireDateIntervalTargetSelectorUserInfoRepeats") {
      Class timerClass = NSClassFromString(@"NSTimer");
      if (object_ != nil && timerClass != Nil &&
          [object_ isKindOfClass:timerClass]) {
        auto bridge = bridge_;
        return Function::createFromHostFunction(
            runtime, PropNameID::forAscii(runtime, property.c_str()), 6,
            [bridge, timerClass](Runtime& runtime, const Value&,
                                 const Value* args, size_t count) -> Value {
              if (count < 6) {
                throw JSError(
                    runtime, "NSTimer initializer expects six arguments.");
              }
              return callObjCSelector(
                  runtime, bridge, static_cast<id>(timerClass), true,
                  "timerWithTimeInterval:target:selector:userInfo:repeats:",
                  nullptr, args + 1, count - 1);
            });
      }
    }

    if (object_ != nil && [object_ isKindOfClass:[NSArray class]]) {
      NSArray* array = static_cast<NSArray*>(object_);
      if (property == "length") {
        return static_cast<double>(array.count);
      }
      if (property == "objectAtIndex") {
        auto bridge = bridge_;
        std::weak_ptr<NativeApiObjectHostObject> weakSelf =
            shared_from_this();
        Function function = Function::createFromHostFunction(
            runtime, PropNameID::forAscii(runtime, "objectAtIndex"), 1,
            [bridge, weakSelf](Runtime& runtime, const Value&,
                               const Value* args, size_t count) -> Value {
              auto self = weakSelf.lock();
              if (!self || self->object_ == nil ||
                  ![self->object_ isKindOfClass:[NSArray class]]) {
                throw JSError(runtime,
                              "Cannot send objectAtIndex to nil array.");
              }
              if (count < 1 || !args[0].isNumber()) {
                throw JSError(runtime,
                              "objectAtIndex expects a numeric index.");
              }

              NSArray* array = static_cast<NSArray*>(self->object_);
              NSUInteger index =
                  static_cast<NSUInteger>(args[0].getNumber());
              id element = nil;
              performDirectObjCInvocation(runtime, [&]() {
                element = [array objectAtIndex:index];
              });
              NativeApiType elementType = nativeObjectReturnType();
              return convertNativeReturnValue(runtime, bridge, elementType,
                                              &element);
            });
        Value functionValue(runtime, function);
        bridge_->setObjectExpando(runtime, object_, property, functionValue);
        return functionValue;
      }
      if (auto index = parseArrayIndexProperty(property)) {
        if (*index >= array.count) {
          return Value::undefined();
        }
        id element = [array objectAtIndex:*index];
        NativeApiType elementType = nativeObjectReturnType();
        return convertNativeReturnValue(runtime, bridge_, elementType, &element);
      }
    }

    if (object_ != nil && property == "length" &&
        ![object_ respondsToSelector:@selector(length)]) {
      return Value::undefined();
    }
    if (object_ != nil && property == "count" &&
        ![object_ respondsToSelector:@selector(count)]) {
      return Value::undefined();
    }

    // For JS-extended instances, metadata property accessors live on the
    // prototype chain (native accessors plus any JS overrides), so defer to the
    // engine instead of reading the native property here and shadowing a JS
    // override.
    bool isEngineExtendedInstance =
        object_ != nil &&
        class_conformsToProtocol(object_getClass(object_),
                                 @protocol(NativeApiClassBuilderProtocol));

    if (object_ != nil && !isEngineExtendedInstance) {
      if (const NativeApiSymbol* symbol =
              bridge_->findClassForRuntimeClass(object_getClass(object_))) {
        const auto& members = bridge_->membersForClass(*symbol);
        if (const NativeApiMember* propertyMember =
                selectPropertyMember(members, property, false)) {
          SEL selector = sel_getUid(propertyMember->selectorName.c_str());
          if ([object_ respondsToSelector:selector]) {
            return callObjectSelector(runtime, propertyMember->selectorName,
                                      propertyMember, nullptr, 0);
          }
          std::string booleanSelectorName =
              booleanGetterSelectorForProperty(property);
          if (booleanSelectorName != propertyMember->selectorName) {
            SEL booleanSelector = sel_getUid(booleanSelectorName.c_str());
            if ([object_ respondsToSelector:booleanSelector]) {
              NativeApiMember getterMember = *propertyMember;
              getterMember.selectorName = booleanSelectorName;
              return callObjectSelector(runtime, getterMember.selectorName,
                                        &getterMember, nullptr, 0);
            }
          }
        }

        // Resolve metadata methods to a freshly created host function that
        // dispatches the right overload by argument count. This keeps full
        // metadata-driven marshalling while staying reliably callable in a
        // method-call context (a prototype selector-group function injected
        // through the property interceptor is not).
        if (hasMethodMember(members, property, false)) {
          auto bridge = bridge_;
          std::weak_ptr<NativeApiObjectHostObject> weakSelf =
              shared_from_this();
          std::string memberName = property;
          // Cache the prepared invocation per argument count so the metadata
          // and ObjC signatures are parsed once instead of on every call.
          auto preparedCache = std::make_shared<std::unordered_map<
              size_t,
              std::pair<std::string,
                        std::shared_ptr<NativeApiPreparedObjCInvocation>>>>();
          Value methodFunction = Function::createFromHostFunction(
              runtime, PropNameID::forAscii(runtime, property.c_str()), 0,
              [bridge, weakSelf, memberName, preparedCache](
                  Runtime& runtime, const Value&, const Value* args,
                  size_t count) -> Value {
                auto self = weakSelf.lock();
                if (!self || self->object_ == nil) {
                  throw JSError(runtime,
                                "Cannot send Objective-C selector to nil.");
                }
                auto cached = preparedCache->find(count);
                if (cached == preparedCache->end()) {
                  const NativeApiSymbol* symbol =
                      bridge->findClassForRuntimeClass(
                          object_getClass(self->object_));
                  if (symbol == nullptr) {
                    throw JSError(
                        runtime,
                        "Objective-C metadata is not available for object.");
                  }
                  const auto& classMembers = bridge->membersForClass(*symbol);
                  const NativeApiMember* selected =
                      selectMethodMember(classMembers, memberName, false, count);
                  if (selected == nullptr) {
                    // NSError-out methods (selector ending in "error:") may be
                    // called with the trailing error argument omitted.
                    if (const NativeApiMember* withError = selectMethodMember(
                            classMembers, memberName, false, count + 1)) {
                      const std::string& sel = withError->selectorName;
                      if (sel.size() >= 6 &&
                          sel.compare(sel.size() - 6, 6, "error:") == 0) {
                        selected = withError;
                      }
                    }
                  }
                  if (selected == nullptr) {
                    throw JSError(
                        runtime,
                        "Objective-C selector is not available for the provided "
                        "arguments count: " +
                            memberName);
                  }
                  auto prepared = prepareNativeApiObjCInvocation(
                      runtime, bridge, object_getClass(self->object_), false,
                      selected->selectorName, selected);
                  cached = preparedCache
                               ->emplace(count, std::make_pair(
                                                    selected->selectorName,
                                                    std::move(prepared)))
                               .first;
                }
                return self->callPreparedObjectSelector(
                    runtime, cached->second.first, *cached->second.second, args,
                    count);
              });
          // Cache the resolved host function so repeated method access does not
          // reallocate it on every call (hot path).
          bridge_->setObjectExpando(runtime, object_, property, methodFunction);
          return methodFunction;
        }
      }
    }

    Value prototypeFunction = prototypeFunctionForProperty(runtime, property);
    if (!prototypeFunction.isUndefined()) {
      return prototypeFunction;
    }

    // JS-subclassed instances own their members in JS (prototype accessors and
    // methods); defer so the engine resolves them instead of the bridge
    // returning a registered getter IMP as a raw callable.
    if (isEngineExtendedInstance) {
#ifdef NATIVESCRIPT_NATIVE_API_HOST_EXPLICIT_OVERRIDE
      // Engines whose exotic property handler invokes prototype accessors with
      // the wrong receiver need the JS-prototype getter resolved here with this
      // instance as the receiver.
      bool found = false;
      Value resolved = resolveEnginePrototypeGetter(runtime, property, &found);
      if (found) {
        return resolved;
      }
#endif
      return Value::undefined();
    }

    if (object_ != nil) {
      // A runtime ObjC property (e.g. from a protocol the concrete, non-metadata
      // class adopts) must be invoked as a getter, not returned as a callable.
      if (objc_property_t prop =
              class_getProperty(object_getClass(object_), property.c_str())) {
        std::string getter = property;
        if (char* customGetter = property_copyAttributeValue(prop, "G")) {
          getter = customGetter;
          free(customGetter);
        }
        return callObjectSelector(runtime, getter, nullptr, nullptr, 0);
      }
    }

    if (object_ != nil &&
        hasRuntimeMemberForName(object_getClass(object_), false, property)) {
      std::weak_ptr<NativeApiObjectHostObject> weakSelf = shared_from_this();
      std::string memberName = property;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, property.c_str()), 0,
          [weakSelf, memberName](Runtime& runtime, const Value&,
                                 const Value* args, size_t count) -> Value {
            auto self = weakSelf.lock();
            if (!self || self->object_ == nil) {
              throw JSError(runtime,
                            "Cannot send Objective-C selector to nil.");
            }
            auto selectorName = selectRuntimeSelectorForName(
                object_getClass(self->object_), false, memberName, count);
            if (!selectorName) {
              throw JSError(runtime,
                            "Objective-C selector is not available: " +
                                memberName);
            }
            return self->callObjectSelector(runtime, *selectorName, nullptr,
                                            args, count);
          });
    }

    return Value::undefined();
  }

  NativeApiHostSetResult set(Runtime& runtime, const PropNameID& name, const Value& value) override {
    std::string property = name.utf8(runtime);
    if (object_ == nil) {
      throw JSError(runtime, "Cannot set property on nil object.");
    }

    if (const NativeApiSymbol* symbol =
            bridge_->findClassForRuntimeClass(object_getClass(object_))) {
      const auto& members = bridge_->membersForClass(*symbol);
      if (const NativeApiMember* propertyMember =
              selectWritablePropertyMember(members, property, false)) {
        if (propertyMember->readonly) {
          throw JSError(
              runtime, "Attempted to assign to readonly property.");
        }
        NativeApiMember setterMember = *propertyMember;
        setterMember.selectorName = propertyMember->setterSelectorName;
        setterMember.signatureOffset = propertyMember->setterSignatureOffset;
        Value args[] = {Value(runtime, value)};
        callObjCSelector(runtime, bridge_, object_, false,
                         setterMember.selectorName, &setterMember, args, 1);
        NATIVE_API_SET_RETURN(true);
      }
    }

    // For JS-subclassed instances, an unknown property is owned by the JS
    // prototype (e.g. a JS-defined accessor); defer so the engine runs it instead of
    // shadowing it with a bridge expando.
    if (class_conformsToProtocol(object_getClass(object_),
                                 @protocol(NativeApiClassBuilderProtocol))) {
#ifdef NATIVESCRIPT_NATIVE_API_HOST_EXPLICIT_OVERRIDE
      // Engines whose exotic property storage doesn't fall back to own
      // properties need the JS-owned set resolved here: invoke a JS-prototype
      // setter if present, otherwise store the value as a bridge expando.
      if (!invokeEnginePrototypeSetter(runtime, property, value)) {
        storeOwnExpando(runtime, property, value);
      }
      NATIVE_API_SET_RETURN(true);
#else
      NATIVE_API_SET_RETURN(false);
#endif
    }

    bridge_->setObjectExpando(runtime, object_, property, value);
    NATIVE_API_SET_RETURN(true);
  }

  std::vector<PropNameID> getPropertyNames(Runtime& runtime) override {
    std::vector<PropNameID> names;
    names.reserve(6);
    addPropertyName(runtime, names, "kind");
    addPropertyName(runtime, names, "className");
    addPropertyName(runtime, names, "nativeAddress");
    addPropertyName(runtime, names, "constructor");
    addPropertyName(runtime, names, "superclass");
    addPropertyName(runtime, names, "super");
    addPropertyName(runtime, names, "invoke");
    addPropertyName(runtime, names, "send");
    addPropertyName(runtime, names, "takeRetainedValue");
    addPropertyName(runtime, names, "takeUnretainedValue");
    addPropertyName(runtime, names, "toString");
    return names;
  }

 private:
  std::shared_ptr<NativeApiBridge> bridge_;
  id object_ = nil;
  bool ownsObject_ = false;
  bool consumed_ = false;
};

class NativeApiClassHostObject final : public HostObject {
 public:
  NativeApiClassHostObject(std::shared_ptr<NativeApiBridge> bridge,
                           NativeApiSymbol symbol)
      : bridge_(std::move(bridge)), symbol_(std::move(symbol)) {}

  Class nativeClass() const {
    return objc_lookUpClass(symbol_.runtimeName.c_str());
  }

  static Class classRespondingToClassSelector(Class cls, SEL selector) {
    for (Class current = cls; current != Nil;
         current = class_getSuperclass(current)) {
      if (class_getClassMethod(current, selector) != nullptr) {
        return current;
      }
    }
    return Nil;
  }

  Value get(Runtime& runtime, const PropNameID& name) override {
    std::string property = name.utf8(runtime);
    if (property == "kind") {
      return makeString(runtime, "class");
    }
    if (property == "name") {
      return makeString(runtime, symbol_.name);
    }
    if (property == "runtimeName") {
      return makeString(runtime, symbol_.runtimeName);
    }
    if (property == "available") {
      return objc_lookUpClass(symbol_.runtimeName.c_str()) != nil;
    }
	    if (property == "metadataOffset") {
	      return static_cast<double>(symbol_.offset);
	    }
	    if (property == "__superclass") {
	      if (symbol_.superclassOffset == MD_SECTION_OFFSET_NULL) {
	        return Value::undefined();
	      }
	      const NativeApiSymbol* superclass =
	          bridge_->findClassByOffset(symbol_.superclassOffset);
	      if (superclass == nullptr) {
	        return Value::undefined();
	      }
	      return makeNativeClassValue(runtime, bridge_, *superclass);
	    }
	    if (property == "__runtimeStaticMembers" ||
	        property == "__runtimeInstanceMembers") {
	      return runtimeMembersArray(runtime, nativeClass(),
	                                 property == "__runtimeStaticMembers");
	    }
	    if (property == "__staticMembers" || property == "__instanceMembers") {
	      bool staticMembers = property == "__staticMembers";
      const auto& members = bridge_->surfaceMembersForClass(symbol_);
      Array result(runtime, members.size());
      size_t index = 0;
      for (const auto& member : members) {
        bool memberIsStatic =
            (member.flags & metagen::mdMemberStatic) != 0;
        if (memberIsStatic != staticMembers) {
          continue;
        }
        Object descriptor(runtime);
        descriptor.setProperty(runtime, "name", makeString(runtime, member.name));
        descriptor.setProperty(runtime, "selectorName",
                               makeString(runtime, member.selectorName));
        descriptor.setProperty(
            runtime, "argumentCount",
            static_cast<double>(selectorArgumentCount(member.selectorName)));
        descriptor.setProperty(runtime, "property", member.property);
        descriptor.setProperty(runtime, "readonly", member.readonly);
        descriptor.setProperty(runtime, "signatureOffset",
                               static_cast<double>(member.signatureOffset));
        descriptor.setProperty(
            runtime, "setterSignatureOffset",
            static_cast<double>(member.setterSignatureOffset));
        descriptor.setProperty(runtime, "flags",
                               static_cast<double>(member.flags));
        descriptor.setProperty(runtime, "setterSelectorName",
                               makeString(runtime, member.setterSelectorName));
        result.setValueAtIndex(runtime, index++, descriptor);
      }
      Array compact(runtime, index);
      for (size_t i = 0; i < index; i++) {
        compact.setValueAtIndex(runtime, i, result.getValueAtIndex(runtime, i));
      }
      return compact;
    }
    if (property == "toString") {
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "toString"), 0,
          [symbol = symbol_](Runtime& runtime, const Value&,
                             const Value*, size_t) -> Value {
            return makeString(runtime,
                              "[NativeApiClass " + symbol.name + "]");
          });
    }
    if (property == "construct" || property == "alloc" || property == "new") {
      auto bridge = bridge_;
      auto symbol = symbol_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, property), 0,
          [bridge, symbol, property](Runtime& runtime, const Value&,
                                     const Value* args, size_t count) -> Value {
            Class cls = objc_lookUpClass(symbol.runtimeName.c_str());
            if (cls == nil) {
              throw JSError(
                  runtime, "Objective-C class is not available: " + symbol.name);
            }

            id result = nil;
            if (property == "construct" && count == 1) {
              void* pointer = nullptr;
              if (args[0].isNumber()) {
                pointer = reinterpret_cast<void*>(
                    static_cast<uintptr_t>(args[0].getNumber()));
              } else if (args[0].isObject()) {
                Object object = args[0].asObject(runtime);
                if (object.isHostObject<NativeApiPointerHostObject>(runtime)) {
                  pointer = object
                                .getHostObject<NativeApiPointerHostObject>(
                                    runtime)
                                ->pointer();
                } else if (object.isHostObject<NativeApiReferenceHostObject>(
                               runtime)) {
                  pointer = object
                                .getHostObject<NativeApiReferenceHostObject>(
                                    runtime)
                                ->data();
                } else if (object.isHostObject<NativeApiObjectHostObject>(
                               runtime)) {
                  pointer = object
                                .getHostObject<NativeApiObjectHostObject>(
                                    runtime)
                                ->object();
                }
              }
              return makeNativeObjectValue(runtime, bridge,
                                           static_cast<id>(pointer), false);
            }

            if (property == "new") {
              if (count != 0) {
                throw JSError(
                    runtime, "new does not take arguments; use invoke for an "
                             "explicit Objective-C selector.");
              }
              performDirectObjCInvocation(runtime,
                                          [&]() { result = [[cls alloc] init]; });
            } else {
              if (count != 0) {
                throw JSError(
                    runtime, "alloc does not take arguments; call invoke on the "
                             "allocated object for an explicit init selector.");
              }
              performDirectObjCInvocation(runtime,
                                          [&]() { result = [cls alloc]; });
            }

            return makeNativeObjectValue(runtime, bridge, result, true);
          });
    }
    if (property == "invoke" || property == "send") {
      auto bridge = bridge_;
      auto symbol = symbol_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, property.c_str()), 1,
          [bridge, symbol](Runtime& runtime, const Value&, const Value* args,
                           size_t count) -> Value {
            std::string selectorName =
                readStringArg(runtime, args, count, 0, "selector");
            Class cls = objc_lookUpClass(symbol.runtimeName.c_str());
            if (cls == nil) {
              throw JSError(
                  runtime, "Objective-C class is not available: " + symbol.name);
            }
            return callObjCSelector(runtime, bridge, static_cast<id>(cls), true,
                                    selectorName, nullptr, args + 1,
                                    count - 1);
          });
    }

    const auto& members = bridge_->membersForClass(symbol_);
    if (const NativeApiMember* propertyMember =
            selectWritablePropertyMember(members, property, true)) {
      auto bridge = bridge_;
      auto symbol = symbol_;
      Class cls = objc_lookUpClass(symbol.runtimeName.c_str());
      if (cls == nil) {
        throw JSError(
            runtime, "Objective-C class is not available: " + symbol.name);
      }
      SEL selector = sel_getUid(propertyMember->selectorName.c_str());
      Class dispatchClass = classRespondingToClassSelector(cls, selector);
      if (dispatchClass != Nil) {
        return callObjCSelector(runtime, bridge, static_cast<id>(dispatchClass), true,
                                propertyMember->selectorName, propertyMember,
                                nullptr, 0);
      }
    }

    if (hasMethodMember(members, property, true)) {
      auto bridge = bridge_;
      auto symbol = symbol_;
      std::string memberName = property;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, property.c_str()), 0,
          [bridge, symbol, memberName](Runtime& runtime, const Value&,
                                       const Value* args,
                                       size_t count) -> Value {
            Class cls = objc_lookUpClass(symbol.runtimeName.c_str());
            if (cls == nil) {
              throw JSError(
                  runtime, "Objective-C class is not available: " + symbol.name);
            }
            const NativeApiMember* selected = selectMethodMember(
                bridge->membersForClass(symbol), memberName, true, count);
            if (selected == nullptr) {
              throw JSError(
                  runtime, "Objective-C selector is not available: " +
                               memberName);
            }
            SEL selector = sel_getUid(selected->selectorName.c_str());
            Class dispatchClass =
                NativeApiClassHostObject::classRespondingToClassSelector(
                    cls, selector);
            if (dispatchClass == Nil) {
              throw JSError(runtime,
                            "Objective-C selector is not available: " +
                                selected->selectorName);
            }
            return callObjCSelector(runtime, bridge,
                                    static_cast<id>(dispatchClass), true,
                                    selected->selectorName, selected, args,
                                    count);
          });
    }

    return Value::undefined();
  }

  NativeApiHostSetResult set(Runtime& runtime, const PropNameID& name, const Value& value) override {
    std::string property = name.utf8(runtime);
    Class cls = objc_lookUpClass(symbol_.runtimeName.c_str());
    if (cls == nil) {
      throw JSError(
          runtime, "Objective-C class is not available: " + symbol_.name);
    }

    const auto& members = bridge_->membersForClass(symbol_);
    if (const NativeApiMember* propertyMember =
            selectPropertyMember(members, property, true)) {
      if (propertyMember->readonly) {
        throw JSError(
            runtime, "Attempted to assign to readonly property.");
      }
      NativeApiMember setterMember = *propertyMember;
      setterMember.selectorName = propertyMember->setterSelectorName;
      setterMember.signatureOffset = propertyMember->setterSignatureOffset;
      SEL selector = sel_getUid(setterMember.selectorName.c_str());
      Class dispatchClass = classRespondingToClassSelector(cls, selector);
      if (dispatchClass == Nil) {
        throw JSError(runtime,
                      "Objective-C selector is not available: " +
                          setterMember.selectorName);
      }
      Value args[] = {Value(runtime, value)};
      callObjCSelector(runtime, bridge_, static_cast<id>(dispatchClass), true,
                       setterMember.selectorName, &setterMember, args, 1);
      NATIVE_API_SET_RETURN(true);
    }

    throw JSError(runtime,
                                 "No writable native property: " + property);
  }

  std::vector<PropNameID> getPropertyNames(Runtime& runtime) override {
    std::vector<PropNameID> names;
    names.reserve(8);
    addPropertyName(runtime, names, "kind");
    addPropertyName(runtime, names, "name");
    addPropertyName(runtime, names, "runtimeName");
    addPropertyName(runtime, names, "available");
    addPropertyName(runtime, names, "metadataOffset");
    addPropertyName(runtime, names, "toString");
    addPropertyName(runtime, names, "construct");
    addPropertyName(runtime, names, "alloc");
    addPropertyName(runtime, names, "new");
    addPropertyName(runtime, names, "invoke");
    addPropertyName(runtime, names, "send");
    return names;
  }

 private:
  std::shared_ptr<NativeApiBridge> bridge_;
  NativeApiSymbol symbol_;
};

Value makeNativeObjectValue(Runtime& runtime,
                            const std::shared_ptr<NativeApiBridge>& bridge,
                            id object, bool ownsObject) {
  if (object == nil) {
    return Value::null();
  }

  Value cached = bridge->findRoundTripValue(runtime, object);
  if (!cached.isUndefined()) {
    // A consumed wrapper (e.g. an alloc'd placeholder singleton already passed
    // to an initializer) must not be reused: drop the stale entry and re-wrap.
    auto cachedHost =
        cached.isObject()
            ? cached.asObject(runtime).getHostObject<NativeApiObjectHostObject>(runtime)
            : nullptr;
    if (cachedHost == nullptr || cachedHost->object() != nil) {
      if (ownsObject) {
        [object release];
      }
      return cached;
    }
    bridge->forgetRoundTripValue(runtime, object);
  }

  Object result = Object::createFromHostObject(
      runtime,
      std::make_shared<NativeApiObjectHostObject>(bridge, object, ownsObject));
  Value prototypeValue = Value::undefined();
  Value classWrapperValue =
      bridge->findObjectExpando(runtime, object, "__nativeApiClassWrapper");
  if (classWrapperValue.isObject()) {
    Object classWrapper = classWrapperValue.asObject(runtime);
    prototypeValue = classWrapper.getProperty(runtime, "prototype");
  }
  if (!prototypeValue.isObject()) {
    prototypeValue = bridge->findClassPrototype(runtime, object_getClass(object));
  }
  if (prototypeValue.isObject()) {
    Object prototype = prototypeValue.asObject(runtime);
    SetNativeApiObjectPrototype(runtime, result, prototype);
  }
  bridge->rememberRoundTripValue(runtime, object, Value(runtime, result));
  return result;
}

Value globalNativeSymbolValue(Runtime& runtime, const NativeApiSymbol& symbol,
                              const char* expectedKind) {
  Object global = runtime.global();
  Value cacheValue = global.getProperty(
      runtime, "__nativeScriptNativeApiGlobalCache");
  if (!cacheValue.isObject()) {
    return Value::undefined();
  }

  Object cache = cacheValue.asObject(runtime);
  auto readCache = [&](const std::string& name) -> Value {
    if (name.empty()) {
      return Value::undefined();
    }

    Value value = cache.getProperty(runtime, name.c_str());
    if (!value.isObject()) {
      return Value::undefined();
    }

    try {
      Object object = value.asObject(runtime);
      Value kindValue = object.getProperty(runtime, "kind");
      if (kindValue.isString() &&
          kindValue.asString(runtime).utf8(runtime) == expectedKind) {
        return value;
      }
    } catch (const std::exception&) {
    }

    return Value::undefined();
  };

  Value value = readCache(symbol.name);
  if (!value.isUndefined()) {
    return value;
  }
  if (symbol.runtimeName != symbol.name) {
    value = readCache(symbol.runtimeName);
    if (!value.isUndefined()) {
      return value;
    }
  }

  try {
    if (std::strcmp(expectedKind, "class") == 0) {
      Value classResolverValue = global.getProperty(
          runtime, "__nativeScriptResolveNativeApiClassWrapper");
      if (classResolverValue.isObject() &&
          classResolverValue.asObject(runtime).isFunction(runtime)) {
        Function classResolver =
            classResolverValue.asObject(runtime).asFunction(runtime);
        auto resolveClassWrapper = [&](const std::string& name) -> Value {
          if (name.empty()) {
            return Value::undefined();
          }
          Value resolved = classResolver.call(runtime, makeString(runtime, name));
          return resolved.isObject() ? std::move(resolved) : Value::undefined();
        };

        value = resolveClassWrapper(symbol.name);
        if (!value.isUndefined()) {
          return value;
        }
        if (symbol.runtimeName != symbol.name) {
          value = resolveClassWrapper(symbol.runtimeName);
          if (!value.isUndefined()) {
            return value;
          }
        }
      }
    }

    Value resolverValue =
        global.getProperty(runtime, "__nativeScriptResolveNativeApiGlobal");
    if (resolverValue.isObject() &&
        resolverValue.asObject(runtime).isFunction(runtime)) {
      Function resolver = resolverValue.asObject(runtime).asFunction(runtime);
      auto resolveGlobal = [&](const std::string& name) -> Value {
        if (name.empty()) {
          return Value::undefined();
        }
        Value resolved = resolver.call(runtime, makeString(runtime, name),
                                       makeString(runtime, expectedKind));
        if (resolved.isObject()) {
          return resolved;
        }
        return Value::undefined();
      };

      value = resolveGlobal(symbol.name);
      if (!value.isUndefined()) {
        return value;
      }
      if (symbol.runtimeName != symbol.name) {
        value = resolveGlobal(symbol.runtimeName);
        if (!value.isUndefined()) {
          return value;
        }
      }
    }
  } catch (const std::exception&) {
  }

  return Value::undefined();
}

Value makeNativeClassValue(Runtime& runtime,
                           const std::shared_ptr<NativeApiBridge>& bridge,
                           NativeApiSymbol symbol) {
  Class cls = objc_lookUpClass(symbol.runtimeName.c_str());
  Value cachedClass = bridge->findClassValue(runtime, cls);
  if (!cachedClass.isUndefined()) {
    return cachedClass;
  }
  Value globalValue = globalNativeSymbolValue(runtime, symbol, "class");
  if (!globalValue.isUndefined()) {
    return globalValue;
  }
  return Object::createFromHostObject(
      runtime,
      std::make_shared<NativeApiClassHostObject>(bridge, std::move(symbol)));
}

Protocol* lookupProtocolByNativeName(const std::string& name) {
  Protocol* protocol = objc_getProtocol(name.c_str());
  if (protocol != nullptr) {
    return protocol;
  }
  constexpr const char* suffix = "Protocol";
  size_t suffixLength = std::strlen(suffix);
  if (name.size() > suffixLength &&
      name.compare(name.size() - suffixLength, suffixLength, suffix) == 0) {
    protocol = objc_getProtocol(
        name.substr(0, name.size() - suffixLength).c_str());
  }
  return protocol;
}

class NativeApiProtocolHostObject final : public HostObject {
 public:
  NativeApiProtocolHostObject(std::shared_ptr<NativeApiBridge> bridge,
                              NativeApiSymbol symbol)
      : bridge_(std::move(bridge)), symbol_(std::move(symbol)) {}

  Protocol* nativeProtocol() const {
    Protocol* protocol = lookupProtocolByNativeName(symbol_.runtimeName);
    if (protocol == nullptr && symbol_.runtimeName != symbol_.name) {
      protocol = lookupProtocolByNativeName(symbol_.name);
    }
    return protocol;
  }

  const NativeApiSymbol& symbol() const { return symbol_; }

  Value get(Runtime& runtime, const PropNameID& name) override {
    std::string property = name.utf8(runtime);
    if (property == "kind") {
      return makeString(runtime, "protocol");
    }
    if (property == "name") {
      return makeString(runtime, symbol_.name);
    }
    if (property == "runtimeName") {
      return makeString(runtime, symbol_.runtimeName);
    }
    if (property == "available") {
      return nativeProtocol() != nullptr;
    }
    if (property == "metadataOffset") {
      return static_cast<double>(symbol_.offset);
    }
    if (property == "nativeAddress") {
      return static_cast<double>(
          reinterpret_cast<uintptr_t>(nativeProtocol()));
    }
    if (property == "prototype") {
      Object prototype(runtime);
      for (const auto& member : bridge_->membersForProtocol(symbol_)) {
        if (prototype.hasProperty(runtime, member.name.c_str())) {
          continue;
        }
        if (member.property) {
          defineProtocolProperty(runtime, prototype, member, false);
        } else {
          prototype.setProperty(runtime, member.name.c_str(),
                                makeProtocolMemberFunction(runtime, member,
                                                           false));
        }
      }
      return prototype;
    }
    if (property == "toString") {
      auto symbol = symbol_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "toString"), 0,
          [symbol](Runtime& runtime, const Value&, const Value*, size_t) -> Value {
            return makeString(runtime,
                              "[NativeApiProtocol " + symbol.name + "]");
          });
    }
    const auto& members = bridge_->membersForProtocol(symbol_);
    if (const NativeApiMember* propertyMember =
            selectPropertyMember(members, property, true)) {
      return makeProtocolPropertyGetter(runtime, *propertyMember, true);
    }
    if (const NativeApiMember* propertyMember =
            selectPropertyMember(members, property, false)) {
      return makeProtocolPropertyGetter(runtime, *propertyMember, true);
    }
    for (const auto& member : members) {
      if (member.property || member.name != property) {
        continue;
      }
      bool memberIsStatic = (member.flags & metagen::mdMemberStatic) != 0;
      if (memberIsStatic) {
        return makeProtocolMemberFunction(runtime, member, true);
      }
    }
    for (const auto& member : members) {
      if (member.property || member.name != property) {
        continue;
      }
      bool memberIsStatic = (member.flags & metagen::mdMemberStatic) != 0;
      if (!memberIsStatic) {
        return makeProtocolMemberFunction(runtime, member, true);
      }
    }
    return Value::undefined();
  }

  std::vector<PropNameID> getPropertyNames(Runtime& runtime) override {
    std::vector<PropNameID> names;
    addPropertyName(runtime, names, "kind");
    addPropertyName(runtime, names, "name");
    addPropertyName(runtime, names, "runtimeName");
    addPropertyName(runtime, names, "available");
    addPropertyName(runtime, names, "metadataOffset");
    addPropertyName(runtime, names, "nativeAddress");
    addPropertyName(runtime, names, "prototype");
    addPropertyName(runtime, names, "toString");
    for (const auto& member : bridge_->membersForProtocol(symbol_)) {
      addPropertyName(runtime, names, member.name.c_str());
    }
    return names;
  }

 private:
  static Class classReceiverFromThis(Runtime& runtime, const Value& thisValue) {
    if (!thisValue.isObject()) {
      return Nil;
    }

    Object object = thisValue.asObject(runtime);
    if (object.isHostObject<NativeApiClassHostObject>(runtime)) {
      return object.getHostObject<NativeApiClassHostObject>(runtime)->nativeClass();
    }

    Value wrappedClass = object.getProperty(runtime, "__nativeApiClass");
    if (wrappedClass.isObject()) {
      Object wrappedObject = wrappedClass.asObject(runtime);
      if (wrappedObject.isHostObject<NativeApiClassHostObject>(runtime)) {
        return wrappedObject.getHostObject<NativeApiClassHostObject>(runtime)
            ->nativeClass();
      }
    }

    Value kindValue = object.getProperty(runtime, "kind");
    if (kindValue.isString() &&
        kindValue.asString(runtime).utf8(runtime) == "class") {
      Value runtimeNameValue = object.getProperty(runtime, "runtimeName");
      if (!runtimeNameValue.isString()) {
        runtimeNameValue = object.getProperty(runtime, "name");
      }
      if (runtimeNameValue.isString()) {
        std::string runtimeName =
            runtimeNameValue.asString(runtime).utf8(runtime);
        return objc_lookUpClass(runtimeName.c_str());
      }
    }

    return Nil;
  }

  id objectReceiverFromThis(Runtime& runtime, const Value& thisValue) const {
    if (!thisValue.isObject()) {
      return nil;
    }

    Object object = thisValue.asObject(runtime);
    if (object.isHostObject<NativeApiObjectHostObject>(runtime)) {
      return object.getHostObject<NativeApiObjectHostObject>(runtime)->object();
    }

    return nil;
  }

  Value makeProtocolMemberFunction(Runtime& runtime, NativeApiMember member,
                                   bool receiverIsClass) const {
    auto bridge = bridge_;
    return Function::createFromHostFunction(
        runtime, PropNameID::forAscii(runtime, member.name.c_str()), 0,
        [bridge, member, receiverIsClass](Runtime& runtime,
                                          const Value& thisValue,
                                          const Value* args,
                                          size_t count) -> Value {
          id receiver = nil;
          if (receiverIsClass) {
            receiver = static_cast<id>(
                classReceiverFromThis(runtime, thisValue));
          } else if (thisValue.isObject()) {
            Object object = thisValue.asObject(runtime);
            if (object.isHostObject<NativeApiObjectHostObject>(runtime)) {
              receiver = object.getHostObject<NativeApiObjectHostObject>(runtime)
                             ->object();
            }
          }

          if (receiver == nil) {
            throw JSError(
                runtime, "Protocol member requires a native receiver.");
          }
          return callObjCSelector(runtime, bridge, receiver, receiverIsClass,
                                  member.selectorName, &member, args, count);
        });
  }

  Value makeProtocolPropertyGetter(Runtime& runtime, NativeApiMember member,
                                   bool receiverIsClass) const {
    auto bridge = bridge_;
    return Function::createFromHostFunction(
        runtime, PropNameID::forAscii(runtime, member.name.c_str()), 0,
        [bridge, member, receiverIsClass](Runtime& runtime,
                                          const Value& thisValue,
                                          const Value*, size_t) -> Value {
          id receiver = nil;
          if (receiverIsClass) {
            receiver = static_cast<id>(
                classReceiverFromThis(runtime, thisValue));
          } else if (thisValue.isObject()) {
            Object object = thisValue.asObject(runtime);
            if (object.isHostObject<NativeApiObjectHostObject>(runtime)) {
              receiver = object.getHostObject<NativeApiObjectHostObject>(runtime)
                             ->object();
            }
          }

          if (receiver == nil) {
            throw JSError(
                runtime, "Protocol property requires a native receiver.");
          }
          return callObjCSelector(runtime, bridge, receiver, receiverIsClass,
                                  member.selectorName, &member, nullptr, 0);
        });
  }

  Value makeProtocolPropertySetter(Runtime& runtime, NativeApiMember member,
                                   bool receiverIsClass) const {
    auto bridge = bridge_;
    return Function::createFromHostFunction(
        runtime, PropNameID::forAscii(runtime, member.setterSelectorName.c_str()),
        1,
        [bridge, member, receiverIsClass](Runtime& runtime,
                                          const Value& thisValue,
                                          const Value* args,
                                          size_t count) -> Value {
          id receiver = nil;
          if (receiverIsClass) {
            receiver = static_cast<id>(
                classReceiverFromThis(runtime, thisValue));
          } else if (thisValue.isObject()) {
            Object object = thisValue.asObject(runtime);
            if (object.isHostObject<NativeApiObjectHostObject>(runtime)) {
              receiver = object.getHostObject<NativeApiObjectHostObject>(runtime)
                             ->object();
            }
          }

          if (receiver == nil) {
            throw JSError(
                runtime, "Protocol property requires a native receiver.");
          }
          if (count < 1) {
            throw JSError(
                runtime, "Protocol property setter expects a value.");
          }

          NativeApiMember setterMember = member;
          setterMember.selectorName = member.setterSelectorName;
          setterMember.signatureOffset = member.setterSignatureOffset;
          return callObjCSelector(runtime, bridge, receiver, receiverIsClass,
                                  setterMember.selectorName, &setterMember,
                                  args, 1);
        });
  }

  void defineProtocolProperty(Runtime& runtime, Object& target,
                              const NativeApiMember& member,
                              bool receiverIsClass) const {
    try {
      Object objectCtor = runtime.global().getPropertyAsObject(runtime, "Object");
      Function defineProperty =
          objectCtor.getPropertyAsFunction(runtime, "defineProperty");
      Object descriptor(runtime);
      descriptor.setProperty(runtime, "configurable", true);
      descriptor.setProperty(runtime, "enumerable", true);
      descriptor.setProperty(runtime, "get",
                             makeProtocolPropertyGetter(runtime, member,
                                                        receiverIsClass));
      if (!member.readonly && !member.setterSelectorName.empty()) {
        descriptor.setProperty(runtime, "set",
                               makeProtocolPropertySetter(runtime, member,
                                                          receiverIsClass));
      }
      defineProperty.call(runtime, target, makeString(runtime, member.name),
                          descriptor);
    } catch (const std::exception&) {
    }
  }

  std::shared_ptr<NativeApiBridge> bridge_;
  NativeApiSymbol symbol_;
};

Value makeNativeProtocolValue(Runtime& runtime,
                              const std::shared_ptr<NativeApiBridge>& bridge,
                              NativeApiSymbol symbol) {
  Value globalValue = globalNativeSymbolValue(runtime, symbol, "protocol");
  if (!globalValue.isUndefined()) {
    return globalValue;
  }
  return Object::createFromHostObject(
      runtime,
      std::make_shared<NativeApiProtocolHostObject>(bridge, std::move(symbol)));
}

Class nativeClassFromEngineObject(Runtime& runtime, const Object& object) {
  if (object.isHostObject<NativeApiClassHostObject>(runtime)) {
    return object.getHostObject<NativeApiClassHostObject>(runtime)->nativeClass();
  }

  Value wrappedClass = object.getProperty(runtime, "__nativeApiClass");
  if (wrappedClass.isObject()) {
    Object wrappedObject = wrappedClass.asObject(runtime);
    if (wrappedObject.isHostObject<NativeApiClassHostObject>(runtime)) {
      return wrappedObject.getHostObject<NativeApiClassHostObject>(runtime)
          ->nativeClass();
    }
  }
  return Nil;
}

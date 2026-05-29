thread_local bool gDispatchNativeCallsToUI = false;
thread_local bool gExecutingDispatchedUINativeCall = false;
thread_local int gSynchronousNativeInvocationDepth = 0;
thread_local int gNativeCallerThreadEngineCallbackDepth = 0;
thread_local std::vector<std::string*> gNativeCallbackExceptionCaptureStack;
std::atomic<int> gActiveSynchronousNativeInvocationDepth{0};
static char gNativeApiV8ExtendedClassKey;

void markNativeApiV8ExtendedClass(Class cls) {
  if (cls == Nil) {
    return;
  }
  objc_setAssociatedObject(cls, &gNativeApiV8ExtendedClassKey, @YES,
                           OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

bool isNativeApiV8ExtendedClass(Class cls) {
  Class current = cls;
  while (current != Nil) {
    if (objc_getAssociatedObject(current, &gNativeApiV8ExtendedClassKey) != nil) {
      return true;
    }
    current = class_getSuperclass(current);
  }
  return false;
}

class ScopedNativeApiUINativeCallDispatch final {
 public:
  ScopedNativeApiUINativeCallDispatch()
      : previous_(gDispatchNativeCallsToUI) {
    gDispatchNativeCallsToUI = true;
  }

  ~ScopedNativeApiUINativeCallDispatch() {
    gDispatchNativeCallsToUI = previous_;
  }

 private:
  bool previous_ = false;
};

bool shouldDispatchNativeCallToUI() {
  return gDispatchNativeCallsToUI && ![NSThread isMainThread];
}

class ScopedNativeApiSynchronousInvocation final {
 public:
  ScopedNativeApiSynchronousInvocation() {
    gSynchronousNativeInvocationDepth += 1;
    gActiveSynchronousNativeInvocationDepth.fetch_add(1,
                                                      std::memory_order_acq_rel);
  }

  ~ScopedNativeApiSynchronousInvocation() {
    gSynchronousNativeInvocationDepth -= 1;
    gActiveSynchronousNativeInvocationDepth.fetch_sub(1,
                                                      std::memory_order_acq_rel);
  }
};

class ScopedNativeCallerThreadEngineCallback final {
 public:
  ScopedNativeCallerThreadEngineCallback() {
    gNativeCallerThreadEngineCallbackDepth += 1;
  }

  ~ScopedNativeCallerThreadEngineCallback() {
    gNativeCallerThreadEngineCallbackDepth -= 1;
  }

  ScopedNativeCallerThreadEngineCallback(
      const ScopedNativeCallerThreadEngineCallback&) = delete;
  ScopedNativeCallerThreadEngineCallback& operator=(
      const ScopedNativeCallerThreadEngineCallback&) = delete;
};

class ScopedNativeCallbackExceptionCapture final {
 public:
  explicit ScopedNativeCallbackExceptionCapture(std::string* message)
      : message_(message) {
    gNativeCallbackExceptionCaptureStack.push_back(message_);
  }

  ~ScopedNativeCallbackExceptionCapture() {
    if (!gNativeCallbackExceptionCaptureStack.empty() &&
        gNativeCallbackExceptionCaptureStack.back() == message_) {
      gNativeCallbackExceptionCaptureStack.pop_back();
    }
  }

  ScopedNativeCallbackExceptionCapture(
      const ScopedNativeCallbackExceptionCapture&) = delete;
  ScopedNativeCallbackExceptionCapture& operator=(
      const ScopedNativeCallbackExceptionCapture&) = delete;

 private:
  std::string* message_ = nullptr;
};

bool recordNativeCallbackException(const std::string& message) {
  if (gNativeCallbackExceptionCaptureStack.empty()) {
    return false;
  }

  std::string* captured = gNativeCallbackExceptionCaptureStack.back();
  if (captured == nullptr) {
    return false;
  }

  if (captured->empty()) {
    *captured = message;
  }
  return true;
}

template <typename Invocation>
void performNativeInvocation(Runtime& runtime,
                             const std::function<void(std::function<void()>)>&
                                 invoker,
                             Invocation&& invocation) {
  NSString* exceptionDescription = nil;
  std::string callbackException;
  auto run = [&]() {
    ScopedNativeApiSynchronousInvocation synchronousInvocation;
    ScopedNativeCallbackExceptionCapture callbackExceptionCapture(
        &callbackException);
    @try {
      invocation();
    } @catch (NSException* exception) {
      exceptionDescription = [exception.description copy];
    }
  };

  bool skipInvoker = gNativeCallerThreadEngineCallbackDepth > 0;
  if (shouldDispatchNativeCallToUI()) {
    dispatch_sync(dispatch_get_main_queue(), ^{
      bool previous = gExecutingDispatchedUINativeCall;
      gExecutingDispatchedUINativeCall = true;
      if (invoker && !skipInvoker) {
        invoker(run);
      } else {
        run();
      }
      gExecutingDispatchedUINativeCall = previous;
    });
  } else if (invoker && !skipInvoker) {
    invoker(run);
  } else {
    run();
  }

  if (exceptionDescription != nil) {
    std::string message = exceptionDescription.UTF8String ?: "";
    [exceptionDescription release];
    throw JSError(runtime, message);
  }
  if (!callbackException.empty()) {
    throw JSError(runtime, callbackException);
  }
}

template <typename Invocation>
void performDirectObjCInvocation(Runtime& runtime, Invocation&& invocation) {
  NSString* exceptionDescription = nil;
  auto run = [&]() {
    @try {
      invocation();
    } @catch (NSException* exception) {
      exceptionDescription = [exception.description copy];
    }
  };

  if (shouldDispatchNativeCallToUI()) {
    dispatch_sync(dispatch_get_main_queue(), ^{
      bool previous = gExecutingDispatchedUINativeCall;
      gExecutingDispatchedUINativeCall = true;
      run();
      gExecutingDispatchedUINativeCall = previous;
    });
  } else {
    run();
  }

  if (exceptionDescription != nil) {
    std::string message = exceptionDescription.UTF8String ?: "";
    [exceptionDescription release];
    throw JSError(runtime, message);
  }
}

enum class NativeApiSymbolKind {
  Class,
  Function,
  Constant,
  Protocol,
  Enum,
  Struct,
  Union,
};

struct NativeApiSymbol {
  NativeApiSymbolKind kind;
  MDSectionOffset offset = 0;
  MDSectionOffset superclassOffset = MD_SECTION_OFFSET_NULL;
  std::string name;
  std::string runtimeName;
};

struct NativeApiMember {
  std::string name;
  std::string selectorName;
  std::string setterSelectorName;
  MDSectionOffset signatureOffset = MD_SECTION_OFFSET_NULL;
  MDSectionOffset setterSignatureOffset = MD_SECTION_OFFSET_NULL;
  MDMemberFlag flags = metagen::mdMemberFlagNull;
  bool property = false;
  bool readonly = false;
};

struct NativeApiV8AggregateInfo;

struct NativeApiV8FfiType {
  ffi_type type = {};
  std::vector<ffi_type*> elements;

  NativeApiV8FfiType() {
    type.type = FFI_TYPE_STRUCT;
    type.size = 0;
    type.alignment = 0;
    type.elements = nullptr;
  }

  void finalize() {
    elements.push_back(nullptr);
    type.elements = elements.data();
  }
};

struct NativeApiV8Type {
  MDTypeKind kind = metagen::mdTypeVoid;
  ffi_type* ffiType = &ffi_type_void;
  bool supported = true;
  bool returnOwned = false;
  MDSectionOffset signatureOffset = MD_SECTION_OFFSET_NULL;
  MDSectionOffset aggregateOffset = MD_SECTION_OFFSET_NULL;
  bool aggregateIsUnion = false;
  uint16_t arraySize = 0;
  std::shared_ptr<NativeApiV8Type> elementType;
  std::shared_ptr<NativeApiV8AggregateInfo> aggregateInfo;
  std::shared_ptr<NativeApiV8FfiType> ownedFfiType;
};

struct NativeApiV8AggregateField {
  std::string name;
  uint16_t offset = 0;
  NativeApiV8Type type;
};

struct NativeApiV8AggregateInfo {
  std::string name;
  uint16_t size = 0;
  bool isUnion = false;
  MDSectionOffset offset = MD_SECTION_OFFSET_NULL;
  std::vector<NativeApiV8AggregateField> fields;
  std::shared_ptr<NativeApiV8FfiType> ffi;
};

std::string jsifySelector(const char* selector) {
  std::string jsifiedSelector;
  bool nextUpper = false;
  for (const char* c = selector; c != nullptr && *c != '\0'; c++) {
    if (*c == ':') {
      nextUpper = true;
    } else if (nextUpper) {
      jsifiedSelector += static_cast<char>(toupper(*c));
      nextUpper = false;
    } else {
      jsifiedSelector += *c;
    }
  }
  return jsifiedSelector;
}

std::string booleanGetterSelectorForProperty(const std::string& property) {
  if (property.empty()) {
    return property;
  }

  std::string selector = "is";
  selector += static_cast<char>(toupper(property[0]));
  selector += property.substr(1);
  return selector;
}

std::string setterSelectorForProperty(const std::string& property) {
  if (property.empty()) {
    return property;
  }

  std::string selector = "set";
  selector += static_cast<char>(toupper(property[0]));
  selector += property.substr(1);
  selector += ":";
  return selector;
}

size_t selectorArgumentCount(const std::string& selector) {
  return static_cast<size_t>(
      std::count(selector.begin(), selector.end(), ':'));
}

const NativeApiMember* selectMethodMember(
    const std::vector<NativeApiMember>& members, const std::string& property,
    bool staticMethod, size_t argumentCount) {
  for (const auto& member : members) {
    if (member.property || member.name != property) {
      continue;
    }

    bool memberIsStatic = (member.flags & metagen::mdMemberStatic) != 0;
    if (memberIsStatic != staticMethod) {
      continue;
    }

    if (selectorArgumentCount(member.selectorName) == argumentCount) {
      return &member;
    }
  }
  return nullptr;
}

bool hasMethodMember(const std::vector<NativeApiMember>& members,
                     const std::string& property, bool staticMethod) {
  for (const auto& member : members) {
    if (member.property || member.name != property) {
      continue;
    }
    bool memberIsStatic = (member.flags & metagen::mdMemberStatic) != 0;
    if (memberIsStatic == staticMethod) {
      return true;
    }
  }
  return false;
}

const NativeApiMember* selectPropertyMember(
    const std::vector<NativeApiMember>& members, const std::string& property,
    bool staticMethod) {
  for (const auto& member : members) {
    if (!member.property || member.name != property) {
      continue;
    }

    bool memberIsStatic = (member.flags & metagen::mdMemberStatic) != 0;
    if (memberIsStatic == staticMethod) {
      return &member;
    }
  }
  return nullptr;
}

const NativeApiMember* selectWritablePropertyMember(
    const std::vector<NativeApiMember>& members, const std::string& property,
    bool staticMethod) {
  const NativeApiMember* propertyMember = nullptr;
  for (const auto& member : members) {
    if (!member.property || member.name != property) {
      continue;
    }

    bool memberIsStatic = (member.flags & metagen::mdMemberStatic) != 0;
    if (memberIsStatic != staticMethod) {
      continue;
    }

    if (propertyMember == nullptr) {
      propertyMember = &member;
    }
    if (!member.readonly && !member.setterSelectorName.empty()) {
      return &member;
    }
  }
  return propertyMember;
}

void skipMetadataEngineType(MDMetadataReader* metadata, MDSectionOffset* offset);
Protocol* lookupProtocolByNativeName(const std::string& name);

inline uintptr_t normalizeRuntimePointer(uintptr_t pointer) {
#if INTPTR_MAX == INT64_MAX
  return pointer & 0x0000FFFFFFFFFFFFULL;
#else
  return pointer;
#endif
}

class NativeApiV8Bridge {
 public:
  explicit NativeApiV8Bridge(const NativeApiV8Config& config)
      : metadata_(loadMetadata(config)),
        scheduler_(config.scheduler),
        nativeInvocationInvoker_(config.nativeInvocationInvoker),
        nativeCallbackInvoker_(config.nativeCallbackInvoker),
        jsThreadCallbackInvoker_(config.jsThreadCallbackInvoker),
        invokeCallbacksOnNativeCallerThread_(
            config.invokeCallbacksOnNativeCallerThread) {
    selfDl_ = dlopen(nullptr, RTLD_NOW);
    buildSymbolIndexes();
  }

  ~NativeApiV8Bridge() {
    if (selfDl_ != nullptr) {
      dlclose(selfDl_);
    }
  }

  MDMetadataReader* metadata() const { return metadata_.get(); }

  void* selfDl() const { return selfDl_; }

  const NativeApiSymbol* find(const std::string& name) const {
    auto it = symbolsByName_.find(name);
    return it != symbolsByName_.end() ? &it->second : nullptr;
  }

	  const NativeApiSymbol* findClass(const std::string& name) const {
	    const NativeApiSymbol* symbol = find(name);
	    if (symbol != nullptr && symbol->kind == NativeApiSymbolKind::Class) {
	      return symbol;
	    }
	    auto it = classSymbolsByRuntimeName_.find(name);
	    return it != classSymbolsByRuntimeName_.end() ? &it->second : nullptr;
	  }

	  const NativeApiSymbol* findClassByOffset(MDSectionOffset offset) const {
	    auto it = classSymbolsByOffset_.find(offset);
	    return it != classSymbolsByOffset_.end() ? &it->second : nullptr;
	  }

	  const NativeApiSymbol* findClassForRuntimeClass(Class cls) const {
    Class current = cls;
    while (current != Nil) {
      const char* name = class_getName(current);
      if (name != nullptr) {
        if (const NativeApiSymbol* symbol = findClass(name)) {
          return symbol;
        }
      }
      current = class_getSuperclass(current);
    }
    return nullptr;
  }

  const NativeApiSymbol* findClassForRuntimePointer(void* pointer) const {
    if (pointer == nullptr) {
      return nullptr;
    }

    auto it = classSymbolsByRuntimePointer_.find(
        normalizeRuntimePointer(reinterpret_cast<uintptr_t>(pointer)));
    return it != classSymbolsByRuntimePointer_.end() ? &it->second : nullptr;
  }

  const NativeApiSymbol* findProtocolForRuntimePointer(void* pointer) const {
    if (pointer == nullptr) {
      return nullptr;
    }

    auto it = protocolSymbolsByRuntimePointer_.find(
        normalizeRuntimePointer(reinterpret_cast<uintptr_t>(pointer)));
    return it != protocolSymbolsByRuntimePointer_.end() ? &it->second : nullptr;
  }

  const NativeApiSymbol* findFunction(const std::string& name) const {
    auto it = functionSymbolsByName_.find(name);
    return it != functionSymbolsByName_.end() ? &it->second : nullptr;
  }

  void rememberRoundTripValue(Runtime& runtime, const void* native,
                              const Value& value) {
    if (native == nullptr) {
      return;
    }
    uintptr_t key =
        normalizeRuntimePointer(reinterpret_cast<uintptr_t>(native));
    {
      std::lock_guard<std::mutex> lock(roundTripValuesMutex_);
      roundTripValues_[key] = std::make_shared<Value>(runtime, value);
    }
    rootRoundTripValue(runtime, key, value);
  }

  Value findRoundTripValue(Runtime& runtime, const void* native) {
    if (native == nullptr) {
      return Value::undefined();
    }
    uintptr_t key =
        normalizeRuntimePointer(reinterpret_cast<uintptr_t>(native));
    Value rooted = findRootedRoundTripValue(runtime, key);
    if (!rooted.isUndefined()) {
      return rooted;
    }
    std::lock_guard<std::mutex> lock(roundTripValuesMutex_);
    auto it = roundTripValues_.find(key);
    if (it == roundTripValues_.end() || it->second == nullptr) {
      return Value::undefined();
    }
    return Value(runtime, *it->second);
  }

  void forgetRoundTripValue(Runtime& runtime, const void* native) {
    if (native == nullptr) {
      return;
    }
    uintptr_t key =
        normalizeRuntimePointer(reinterpret_cast<uintptr_t>(native));
    bool rooted = false;
    {
      std::lock_guard<std::mutex> lock(roundTripValuesMutex_);
      roundTripValues_.erase(key);
      rooted = rootedRoundTripValues_.erase(key) > 0;
    }
    if (rooted) {
      unrootRoundTripValue(runtime, key);
    }
  }

  void forgetRoundTripValue(const void* native) {
    if (native == nullptr) {
      return;
    }
    std::lock_guard<std::mutex> lock(roundTripValuesMutex_);
    roundTripValues_.erase(
        normalizeRuntimePointer(reinterpret_cast<uintptr_t>(native)));
  }

  void rememberClassValue(Runtime& runtime, Class cls, const Value& value) {
    if (cls == Nil) {
      return;
    }
    classValues_[normalizeRuntimePointer(reinterpret_cast<uintptr_t>(cls))] =
        std::make_shared<Value>(runtime, value);
  }

  Value findClassValue(Runtime& runtime, Class cls) const {
    if (cls == Nil) {
      return Value::undefined();
    }
    auto it = classValues_.find(
        normalizeRuntimePointer(reinterpret_cast<uintptr_t>(cls)));
    if (it == classValues_.end() || it->second == nullptr) {
      return Value::undefined();
    }
    return Value(runtime, *it->second);
  }

  void rememberClassPrototype(Runtime& runtime, Class cls, const Value& value) {
    if (cls == Nil) {
      return;
    }
    classPrototypes_[normalizeRuntimePointer(reinterpret_cast<uintptr_t>(cls))] =
        std::make_shared<Value>(runtime, value);
  }

  Value findClassPrototype(Runtime& runtime, Class cls) const {
    if (cls == Nil) {
      return Value::undefined();
    }
    auto it = classPrototypes_.find(
        normalizeRuntimePointer(reinterpret_cast<uintptr_t>(cls)));
    if (it == classPrototypes_.end() || it->second == nullptr) {
      return Value::undefined();
    }
    return Value(runtime, *it->second);
  }

  void setObjectExpando(Runtime& runtime, const void* native,
                        const std::string& property, const Value& value) {
    if (native == nullptr || property.empty()) {
      return;
    }
    objectExpandos_[normalizeRuntimePointer(reinterpret_cast<uintptr_t>(native))]
                  [property] = std::make_shared<Value>(runtime, value);
  }

  Value findObjectExpando(Runtime& runtime, const void* native,
                          const std::string& property) const {
    if (native == nullptr || property.empty()) {
      return Value::undefined();
    }
    auto objectIt = objectExpandos_.find(
        normalizeRuntimePointer(reinterpret_cast<uintptr_t>(native)));
    if (objectIt == objectExpandos_.end()) {
      return Value::undefined();
    }
    auto propertyIt = objectIt->second.find(property);
    if (propertyIt == objectIt->second.end() || propertyIt->second == nullptr) {
      return Value::undefined();
    }
    return Value(runtime, *propertyIt->second);
  }

  void forgetObjectExpandos(const void* native) {
    if (native == nullptr) {
      return;
    }
    objectExpandos_.erase(
        normalizeRuntimePointer(reinterpret_cast<uintptr_t>(native)));
  }

  void rememberPointerValue(Runtime& runtime, const void* native,
                            const Value& value) {
    pointerValues_[reinterpret_cast<uintptr_t>(native)] =
        std::make_shared<Value>(runtime, value);
  }

  Value findPointerValue(Runtime& runtime, const void* native) const {
    auto it = pointerValues_.find(reinterpret_cast<uintptr_t>(native));
    if (it == pointerValues_.end() || it->second == nullptr) {
      return Value::undefined();
    }
    return Value(runtime, *it->second);
  }

  void forgetPointerValue(const void* native) {
    if (native == nullptr) {
      return;
    }
    pointerValues_.erase(reinterpret_cast<uintptr_t>(native));
  }

  const NativeApiSymbol* findConstant(const std::string& name) const {
    auto it = constantSymbolsByName_.find(name);
    return it != constantSymbolsByName_.end() ? &it->second : nullptr;
  }

  const NativeApiSymbol* findProtocol(const std::string& name) const {
    const NativeApiSymbol* symbol = find(name);
    if (symbol != nullptr && symbol->kind == NativeApiSymbolKind::Protocol) {
      return symbol;
    }
    auto it = protocolSymbolsByRuntimeName_.find(name);
    return it != protocolSymbolsByRuntimeName_.end() ? &it->second : nullptr;
  }

  const NativeApiSymbol* findEnum(const std::string& name) const {
    auto it = enumSymbolsByName_.find(name);
    return it != enumSymbolsByName_.end() ? &it->second : nullptr;
  }

  const NativeApiSymbol* findStruct(const std::string& name) const {
    auto it = structSymbolsByName_.find(name);
    return it != structSymbolsByName_.end() ? &it->second : nullptr;
  }

  const NativeApiSymbol* findUnion(const std::string& name) const {
    auto it = unionSymbolsByName_.find(name);
    return it != unionSymbolsByName_.end() ? &it->second : nullptr;
  }

  const NativeApiSymbol* findAggregate(const std::string& name) const {
    const NativeApiSymbol* symbol = findStruct(name);
    if (symbol != nullptr) {
      return symbol;
    }
    return findUnion(name);
  }

  size_t classCount() const { return classNames_.size(); }
  size_t functionCount() const { return functionNames_.size(); }
  size_t constantCount() const { return constantNames_.size(); }
  size_t protocolCount() const { return protocolNames_.size(); }
  size_t enumCount() const { return enumNames_.size(); }
  size_t structCount() const { return structNames_.size(); }
  size_t unionCount() const { return unionNames_.size(); }

  const std::vector<std::string>& classNames() const { return classNames_; }
  const std::vector<std::string>& functionNames() const { return functionNames_; }
  const std::vector<std::string>& constantNames() const { return constantNames_; }
  const std::vector<std::string>& protocolNames() const { return protocolNames_; }
  const std::vector<std::string>& enumNames() const { return enumNames_; }
  const std::vector<std::string>& structNames() const { return structNames_; }
  const std::vector<std::string>& unionNames() const { return unionNames_; }
  std::shared_ptr<NativeApiV8Scheduler> scheduler() const { return scheduler_; }
  const std::function<void(std::function<void()>)>& nativeInvocationInvoker()
      const {
    return nativeInvocationInvoker_;
  }
  const std::function<void(std::function<void()>)>& nativeCallbackInvoker()
      const {
    return nativeCallbackInvoker_;
  }
  const std::function<void(std::function<void()>)>& jsThreadCallbackInvoker()
      const {
    return jsThreadCallbackInvoker_;
  }
  bool invokeCallbacksOnNativeCallerThread() const {
    return invokeCallbacksOnNativeCallerThread_;
  }
  std::thread::id jsThreadId() const { return jsThreadId_; }

  void retainEngineLifetime(std::shared_ptr<void> lifetime) {
    if (lifetime == nullptr) {
      return;
    }
    std::lock_guard<std::mutex> lock(retainedLifetimesMutex_);
    retainedLifetimes_.push_back(std::move(lifetime));
  }

  std::string roundTripRootKey(uintptr_t key) const {
    char buffer[32] = {};
    snprintf(buffer, sizeof(buffer), "p%llx",
             static_cast<unsigned long long>(key));
    return buffer;
  }

  Object roundTripRootObject(Runtime& runtime) const {
    static constexpr const char* kRootName =
        "__nativeScriptNativeApiRoundTripValues";
    Object global = runtime.global();
    if (global.hasProperty(runtime, kRootName)) {
      Value existing = global.getProperty(runtime, kRootName);
      if (existing.isObject()) {
        return existing.asObject(runtime);
      }
    }

    Object root(runtime);
    global.setProperty(runtime, kRootName, root);
    return root;
  }

  void rootRoundTripValue(Runtime& runtime, uintptr_t key, const Value& value) {
    roundTripRootObject(runtime)
        .setProperty(runtime, roundTripRootKey(key).c_str(), value);
    std::lock_guard<std::mutex> lock(roundTripValuesMutex_);
    rootedRoundTripValues_.insert(key);
  }

  Value findRootedRoundTripValue(Runtime& runtime, uintptr_t key) {
    {
      std::lock_guard<std::mutex> lock(roundTripValuesMutex_);
      if (rootedRoundTripValues_.find(key) == rootedRoundTripValues_.end()) {
        return Value::undefined();
      }
    }
    Object root = roundTripRootObject(runtime);
    return root.getProperty(runtime, roundTripRootKey(key).c_str());
  }

  void unrootRoundTripValue(Runtime& runtime, uintptr_t key) {
    roundTripRootObject(runtime)
        .setProperty(runtime, roundTripRootKey(key).c_str(), Value::undefined());
  }

  const std::vector<NativeApiMember>& membersForClass(
      const NativeApiSymbol& symbol) const {
    auto cached = membersByClassOffset_.find(symbol.offset);
    if (cached != membersByClassOffset_.end()) {
      return cached->second;
    }

    auto inserted = membersByClassOffset_.emplace(
        symbol.offset, readMembersForClassHierarchy(symbol));
    return inserted.first->second;
  }

  const std::vector<NativeApiMember>& surfaceMembersForClass(
      const NativeApiSymbol& symbol) const {
    auto cached = surfaceMembersByClassOffset_.find(symbol.offset);
    if (cached != surfaceMembersByClassOffset_.end()) {
      return cached->second;
    }

    auto inserted = surfaceMembersByClassOffset_.emplace(
        symbol.offset, readSurfaceMembersForClass(symbol));
    return inserted.first->second;
  }

  const std::vector<NativeApiMember>& membersForProtocol(
      const NativeApiSymbol& symbol) const {
    auto cached = membersByProtocolOffset_.find(symbol.offset);
    if (cached != membersByProtocolOffset_.end()) {
      return cached->second;
    }

    auto inserted = membersByProtocolOffset_.emplace(
        symbol.offset, readMembersForProtocolHierarchy(symbol.offset));
    return inserted.first->second;
  }

  std::shared_ptr<NativeApiV8AggregateInfo> aggregateInfoFor(
      MDSectionOffset aggregateOffset, bool isUnion);

  std::shared_ptr<NativeApiV8AggregateInfo> aggregateInfoFor(
      const NativeApiSymbol& symbol) {
    return aggregateInfoFor(symbol.offset,
                            symbol.kind == NativeApiSymbolKind::Union);
  }

 private:
  static std::unique_ptr<MDMetadataReader> loadMetadataFromFile(
      const char* metadataPath) {
    const char* path = metadataPath != nullptr ? metadataPath : "metadata.nsmd";
    FILE* file = fopen(path, "rb");
    if (file == nullptr) {
      throw std::runtime_error(std::string("metadata.nsmd not found: ") + path);
    }

    fseek(file, 0, SEEK_END);
    long size = ftell(file);
    fseek(file, 0, SEEK_SET);
    if (size <= 0) {
      fclose(file);
      throw std::runtime_error(std::string("metadata.nsmd is empty: ") + path);
    }

    void* buffer = malloc(static_cast<size_t>(size));
    if (buffer == nullptr) {
      fclose(file);
      throw std::bad_alloc();
    }

    size_t read = fread(buffer, 1, static_cast<size_t>(size), file);
    fclose(file);
    if (read != static_cast<size_t>(size)) {
      free(buffer);
      throw std::runtime_error(std::string("failed to read metadata: ") + path);
    }

    return std::make_unique<MDMetadataReader>(buffer, true);
  }

  static std::unique_ptr<MDMetadataReader> loadMetadata(
      const NativeApiV8Config& config) {
    if (config.metadataPtr != nullptr &&
        *static_cast<const char*>(config.metadataPtr) != '\0') {
#ifdef EMBED_METADATA_SIZE
      return std::make_unique<MDMetadataReader>((void*)embedded_metadata);
#else
      return std::make_unique<MDMetadataReader>(
          const_cast<void*>(config.metadataPtr));
#endif
    }

#ifdef EMBED_METADATA_SIZE
    if (config.metadataPath == nullptr) {
      return std::make_unique<MDMetadataReader>((void*)embedded_metadata);
    }
#endif

    unsigned long segmentSize = 0;
    auto segmentData = getsegmentdata(
        reinterpret_cast<const mach_header_64*>(_dyld_get_image_header(0)),
        "__objc_metadata", &segmentSize);
    if (segmentData != nullptr && segmentSize > 0) {
      return std::make_unique<MDMetadataReader>(segmentData);
    }

    return loadMetadataFromFile(config.metadataPath);
  }

  void addSymbol(NativeApiSymbolKind kind, MDSectionOffset offset,
                 const char* name, const char* runtimeName = nullptr,
                 MDSectionOffset superclassOffset = MD_SECTION_OFFSET_NULL) {
    if (name == nullptr || name[0] == '\0') {
      return;
    }

    NativeApiSymbol symbol{
        .kind = kind,
        .offset = offset,
        .superclassOffset = superclassOffset,
        .name = name,
        .runtimeName = runtimeName != nullptr ? runtimeName : name,
    };

    switch (kind) {
      case NativeApiSymbolKind::Class:
        classNames_.push_back(symbol.name);
        break;
      case NativeApiSymbolKind::Function:
        functionNames_.push_back(symbol.name);
        functionSymbolsByName_[symbol.name] = symbol;
        break;
      case NativeApiSymbolKind::Constant:
        constantNames_.push_back(symbol.name);
        constantSymbolsByName_[symbol.name] = symbol;
        break;
      case NativeApiSymbolKind::Protocol:
        protocolNames_.push_back(symbol.name);
        break;
      case NativeApiSymbolKind::Enum:
        enumNames_.push_back(symbol.name);
        enumSymbolsByName_[symbol.name] = symbol;
        break;
      case NativeApiSymbolKind::Struct:
        structNames_.push_back(symbol.name);
        structSymbolsByName_[symbol.name] = symbol;
        break;
      case NativeApiSymbolKind::Union:
        unionNames_.push_back(symbol.name);
        unionSymbolsByName_[symbol.name] = symbol;
        break;
    }

    symbolsByName_[symbol.name] = symbol;
    if (kind == NativeApiSymbolKind::Class) {
      classSymbolsByOffset_[symbol.offset] = symbol;
      classSymbolsByRuntimeName_[symbol.runtimeName] = symbol;
      Class cls = objc_lookUpClass(symbol.runtimeName.c_str());
      if (cls != Nil) {
        classSymbolsByRuntimePointer_[normalizeRuntimePointer(
            reinterpret_cast<uintptr_t>(cls))] = symbol;
      }
    } else if (kind == NativeApiSymbolKind::Protocol) {
      protocolSymbolsByOffset_[symbol.offset] = symbol;
      protocolSymbolsByRuntimeName_[symbol.runtimeName] = symbol;
      auto rememberProtocolRuntimeName = [&](const std::string& runtimeName) {
        if (runtimeName.empty()) {
          return;
        }
        protocolSymbolsByRuntimeName_[runtimeName] = symbol;
        Protocol* runtimeProtocol = lookupProtocolByNativeName(runtimeName);
        if (runtimeProtocol != nullptr) {
          protocolSymbolsByRuntimePointer_[normalizeRuntimePointer(
              reinterpret_cast<uintptr_t>(runtimeProtocol))] = symbol;
        }
      };
      if (symbol.name.size() > 9 &&
          std::isdigit(static_cast<unsigned char>(symbol.name.back()))) {
        size_t digitsStart = symbol.name.size();
        while (digitsStart > 0 &&
               std::isdigit(static_cast<unsigned char>(symbol.name[digitsStart - 1]))) {
          digitsStart--;
        }
        constexpr const char* protocolSuffix = "Protocol";
        size_t protocolSuffixLength = std::strlen(protocolSuffix);
        if (digitsStart > protocolSuffixLength &&
            symbol.name.compare(digitsStart - protocolSuffixLength,
                                protocolSuffixLength, protocolSuffix) == 0) {
          rememberProtocolRuntimeName(
              symbol.name.substr(0, digitsStart - protocolSuffixLength));
        }
      }
      Protocol* protocol = lookupProtocolByNativeName(symbol.runtimeName);
      if (protocol == nullptr && symbol.runtimeName != symbol.name) {
        protocol = lookupProtocolByNativeName(symbol.name);
      }
      if (protocol != nullptr) {
        protocolSymbolsByRuntimePointer_[normalizeRuntimePointer(
            reinterpret_cast<uintptr_t>(protocol))] = symbol;
      }
    } else if (kind == NativeApiSymbolKind::Struct) {
      structSymbolsByOffset_[symbol.offset] = symbol;
    } else if (kind == NativeApiSymbolKind::Union) {
      unionSymbolsByOffset_[symbol.offset] = symbol;
    }
  }

  void addAggregateAliases(NativeApiSymbolKind kind, MDSectionOffset offset,
                           const std::string& name) {
    if (name.empty()) {
      return;
    }

    if (!name.empty() && name[0] == '_') {
      std::string alias = name.substr(1);
      if (!alias.empty() && symbolsByName_.find(alias) == symbolsByName_.end()) {
        addSymbol(kind, offset, alias.c_str(), name.c_str());
      }
    }

    constexpr const char* suffix = "Struct";
    if (name.size() < std::strlen(suffix) ||
        name.compare(name.size() - std::strlen(suffix), std::strlen(suffix),
                     suffix) != 0) {
      std::string alias = name + suffix;
      if (symbolsByName_.find(alias) == symbolsByName_.end()) {
        addSymbol(kind, offset, alias.c_str(), name.c_str());
      }
    }
  }

  void buildSymbolIndexes() {
    if (metadata_ == nullptr) {
      return;
    }

    indexConstants();
    indexEnums();
    indexFunctions();
    indexProtocols();
    indexClasses();
    indexStructs();
    indexUnions();
  }

  static void skipConstantValue(MDMetadataReader* metadata,
                                MDSectionOffset& offset,
                                metagen::MDVariableEvalKind evalKind) {
    switch (evalKind) {
      case metagen::mdEvalNone:
        skipMetadataEngineType(metadata, &offset);
        break;
      case metagen::mdEvalInt64:
        offset += sizeof(int64_t);
        break;
      case metagen::mdEvalDouble:
        offset += sizeof(double);
        break;
      case metagen::mdEvalString:
        offset += sizeof(MDSectionOffset);
        break;
    }
  }

  void indexConstants() {
    MDSectionOffset offset = metadata_->constantsOffset;
    while (offset < metadata_->enumsOffset) {
      MDSectionOffset originalOffset = offset;
      addSymbol(NativeApiSymbolKind::Constant, originalOffset,
                metadata_->getString(offset));
      offset += sizeof(MDSectionOffset);
      auto evalKind = metadata_->getVariableEvalKind(offset);
      offset += sizeof(metagen::MDVariableEvalKind);
      skipConstantValue(metadata_.get(), offset, evalKind);
    }
  }

  void indexEnums() {
    MDSectionOffset offset = metadata_->enumsOffset;
    while (offset < metadata_->signaturesOffset) {
      MDSectionOffset originalOffset = offset;
      addSymbol(NativeApiSymbolKind::Enum, originalOffset,
                metadata_->getString(offset));
      offset += sizeof(MDSectionOffset);

      bool next = true;
      while (next) {
        auto nameOffset = metadata_->getOffset(offset);
        next = (nameOffset & metagen::mdSectionOffsetNext) != 0;
        offset += sizeof(MDSectionOffset);
        offset += sizeof(int64_t);
      }
    }
  }

  void indexFunctions() {
    MDSectionOffset offset = metadata_->functionsOffset;
    while (offset < metadata_->protocolsOffset) {
      MDSectionOffset originalOffset = offset;
      addSymbol(NativeApiSymbolKind::Function, originalOffset,
                metadata_->getString(offset));
      offset += sizeof(MDSectionOffset);
      offset += sizeof(MDSectionOffset);
      offset += sizeof(metagen::MDFunctionFlag);
    }
  }

  void indexProtocols() {
    MDSectionOffset offset = metadata_->protocolsOffset;
    while (offset < metadata_->classesOffset) {
      MDSectionOffset originalOffset = offset;
      auto nameOffset = metadata_->getOffset(offset);
      offset += sizeof(MDSectionOffset);
      bool next = (nameOffset & metagen::mdSectionOffsetNext) != 0;
      nameOffset &= ~metagen::mdSectionOffsetNext;
      addSymbol(NativeApiSymbolKind::Protocol, originalOffset,
                metadata_->resolveString(nameOffset));

      while (next) {
        auto protocolOffset = metadata_->getOffset(offset);
        offset += sizeof(MDSectionOffset);
        next = (protocolOffset & metagen::mdSectionOffsetNext) != 0;
      }

      next = true;
      while (next) {
        auto flags = metadata_->getMemberFlag(offset);
        next = (flags & metagen::mdMemberNext) != 0;
        offset += sizeof(flags);
        if (flags == metagen::mdMemberFlagNull) {
          break;
        }

        skipMember(flags, offset);
      }
    }
  }

  void indexClasses() {
    MDSectionOffset offset = metadata_->classesOffset;
    while (offset < metadata_->structsOffset) {
      MDSectionOffset originalOffset = offset;
      auto nameOffset = metadata_->getOffset(offset);
      offset += sizeof(MDSectionOffset);
      auto runtimeNameOffset = metadata_->getOffset(offset);
      offset += sizeof(MDSectionOffset);
      bool hasProtocols = (nameOffset & metagen::mdSectionOffsetNext) != 0;
      nameOffset &= ~metagen::mdSectionOffsetNext;

      auto name = metadata_->resolveString(nameOffset);
      const char* runtimeName = name;
      if (runtimeNameOffset != MD_SECTION_OFFSET_NULL) {
        runtimeName = metadata_->resolveString(runtimeNameOffset);
      }

      while (hasProtocols) {
        auto protocolOffset = metadata_->getOffset(offset);
        offset += sizeof(MDSectionOffset);
        hasProtocols = (protocolOffset & metagen::mdSectionOffsetNext) != 0;
      }

      auto superclass = metadata_->getOffset(offset);
      offset += sizeof(superclass);
      MDSectionOffset superclassOffset =
          superclass & ~metagen::mdSectionOffsetNext;
      if (superclassOffset != MD_SECTION_OFFSET_NULL) {
        superclassOffset += metadata_->classesOffset;
      }

      addSymbol(NativeApiSymbolKind::Class, originalOffset, name, runtimeName,
                superclassOffset);

      bool next = (superclass & metagen::mdSectionOffsetNext) != 0;
      while (next) {
        auto flags = metadata_->getMemberFlag(offset);
        next = (flags & metagen::mdMemberNext) != 0;
        offset += sizeof(flags);
        skipMember(flags, offset);
      }
    }
  }

  void skipAggregateFields(MDSectionOffset& offset, bool isUnion) const {
    bool next = true;
    while (next) {
      MDSectionOffset nameOffset = metadata_->getOffset(offset);
      offset += sizeof(MDSectionOffset);
      next = (nameOffset & metagen::mdSectionOffsetNext) != 0;
      nameOffset &= ~metagen::mdSectionOffsetNext;
      if (nameOffset == MD_SECTION_OFFSET_NULL) {
        break;
      }
      if (!isUnion) {
        offset += sizeof(uint16_t);
      }
      skipMetadataEngineType(metadata_.get(), &offset);
    }
  }

  void indexStructs() {
    MDSectionOffset offset = metadata_->structsOffset;
    while (offset < metadata_->unionsOffset) {
      if (metadata_->getOffset(offset) == 0) {
        break;
      }
      MDSectionOffset originalOffset = offset;
      const char* name = metadata_->getString(offset);
      offset += sizeof(MDSectionOffset);
      offset += sizeof(uint16_t);
      addSymbol(NativeApiSymbolKind::Struct, originalOffset, name);
      addAggregateAliases(NativeApiSymbolKind::Struct, originalOffset,
                          name != nullptr ? name : "");
      skipAggregateFields(offset, false);
    }
  }

  void indexUnions() {
    MDSectionOffset offset = metadata_->unionsOffset;
    while (metadata_->getOffset(offset) != 0) {
      MDSectionOffset originalOffset = offset;
      const char* name = metadata_->getString(offset);
      offset += sizeof(MDSectionOffset);
      offset += sizeof(uint16_t);
      addSymbol(NativeApiSymbolKind::Union, originalOffset, name);
      addAggregateAliases(NativeApiSymbolKind::Union, originalOffset,
                          name != nullptr ? name : "");
      skipAggregateFields(offset, true);
    }
  }

  void skipMember(MDMemberFlag flags, MDSectionOffset& offset) const {
    if ((flags & metagen::mdMemberProperty) != 0) {
      bool readonly = (flags & metagen::mdMemberReadonly) != 0;
      offset += sizeof(MDSectionOffset);
      offset += sizeof(MDSectionOffset);
      offset += sizeof(MDSectionOffset);
      if (!readonly) {
        offset += sizeof(MDSectionOffset);
        offset += sizeof(MDSectionOffset);
      }
      return;
    }

    offset += sizeof(MDSectionOffset);
    offset += sizeof(MDSectionOffset);
  }

  std::vector<MDSectionOffset> readProtocolOffsetsForClass(
      MDSectionOffset classOffset, MDSectionOffset* memberOffset = nullptr,
      MDSectionOffset* superclassOffsetOut = nullptr) const {
    std::vector<MDSectionOffset> protocols;
    if (metadata_ == nullptr || classOffset == MD_SECTION_OFFSET_NULL) {
      return protocols;
    }

    MDSectionOffset offset = classOffset;
    auto nameOffset = metadata_->getOffset(offset);
    offset += sizeof(MDSectionOffset);
    offset += sizeof(MDSectionOffset);
    bool hasProtocols = (nameOffset & metagen::mdSectionOffsetNext) != 0;

    while (hasProtocols) {
      auto protocolOffset = metadata_->getOffset(offset);
      offset += sizeof(MDSectionOffset);
      hasProtocols = (protocolOffset & metagen::mdSectionOffsetNext) != 0;
      protocolOffset &= ~metagen::mdSectionOffsetNext;
      if (protocolOffset != MD_SECTION_OFFSET_NULL) {
        protocols.push_back(protocolOffset + metadata_->protocolsOffset);
      }
    }

    auto superclass = metadata_->getOffset(offset);
    offset += sizeof(superclass);
    const bool hasMembers = (superclass & metagen::mdSectionOffsetNext) != 0;
    if (superclassOffsetOut != nullptr) {
      MDSectionOffset superclassOffset =
          superclass & ~metagen::mdSectionOffsetNext;
      *superclassOffsetOut =
          superclassOffset != MD_SECTION_OFFSET_NULL
              ? superclassOffset + metadata_->classesOffset
              : MD_SECTION_OFFSET_NULL;
    }
    if (memberOffset != nullptr) {
      *memberOffset = hasMembers ? offset : MD_SECTION_OFFSET_NULL;
    }
    return protocols;
  }

  std::vector<NativeApiMember> readOwnMembersForClass(
      MDSectionOffset classOffset) const {
    std::vector<NativeApiMember> members;
    if (metadata_ == nullptr || classOffset == MD_SECTION_OFFSET_NULL) {
      return members;
    }

    MDSectionOffset memberOffset = MD_SECTION_OFFSET_NULL;
    for (MDSectionOffset protocolOffset :
         readProtocolOffsetsForClass(classOffset, &memberOffset)) {
      auto protocol = protocolSymbolsByOffset_.find(protocolOffset);
      if (protocol == protocolSymbolsByOffset_.end()) {
        continue;
      }
      const auto& protocolMembers = membersForProtocol(protocol->second);
      members.insert(members.end(), protocolMembers.begin(),
                     protocolMembers.end());
    }

    if (memberOffset != MD_SECTION_OFFSET_NULL) {
      std::vector<NativeApiMember> ownMembers =
          readMembersAtOffset(memberOffset);
      members.insert(members.end(), ownMembers.begin(), ownMembers.end());
    }
    return members;
  }

  std::vector<NativeApiMember> readMembersForClass(
      MDSectionOffset classOffset) const {
    std::vector<NativeApiMember> members;
    if (metadata_ == nullptr || classOffset == MD_SECTION_OFFSET_NULL) {
      return members;
    }

    MDSectionOffset offset = classOffset;
    auto nameOffset = metadata_->getOffset(offset);
    offset += sizeof(MDSectionOffset);
    offset += sizeof(MDSectionOffset);
    bool hasProtocols = (nameOffset & metagen::mdSectionOffsetNext) != 0;

    while (hasProtocols) {
      auto protocolOffset = metadata_->getOffset(offset);
      offset += sizeof(MDSectionOffset);
      hasProtocols = (protocolOffset & metagen::mdSectionOffsetNext) != 0;
    }

    auto superclass = metadata_->getOffset(offset);
    offset += sizeof(superclass);

    bool next = (superclass & metagen::mdSectionOffsetNext) != 0;
    while (next) {
      auto flags = metadata_->getMemberFlag(offset);
      next = (flags & metagen::mdMemberNext) != 0;
      offset += sizeof(flags);
      if (flags == metagen::mdMemberFlagNull) {
        break;
      }

      NativeApiMember member;
      member.flags = flags;
      if ((flags & metagen::mdMemberProperty) != 0) {
        member.property = true;
        member.readonly = (flags & metagen::mdMemberReadonly) != 0;
        member.name = metadata_->getString(offset);
        offset += sizeof(MDSectionOffset);
        member.selectorName = metadata_->getString(offset);
        offset += sizeof(MDSectionOffset);
        member.signatureOffset =
            metadata_->signaturesOffset + metadata_->getOffset(offset);
        offset += sizeof(MDSectionOffset);

        if (!member.readonly) {
          member.setterSelectorName = metadata_->getString(offset);
          offset += sizeof(MDSectionOffset);
          member.setterSignatureOffset =
              metadata_->signaturesOffset + metadata_->getOffset(offset);
          offset += sizeof(MDSectionOffset);
        }
      } else {
        member.selectorName = metadata_->getString(offset);
        offset += sizeof(MDSectionOffset);
        member.signatureOffset =
            metadata_->signaturesOffset + metadata_->getOffset(offset);
        offset += sizeof(MDSectionOffset);
        member.name = jsifySelector(member.selectorName.c_str());
      }
      members.push_back(std::move(member));
    }

    return members;
  }

  static bool memberIsStatic(const NativeApiMember& member) {
    return (member.flags & metagen::mdMemberStatic) != 0;
  }

  static bool sameMemberSlot(const NativeApiMember& lhs,
                             const NativeApiMember& rhs) {
    return lhs.name == rhs.name && lhs.property == rhs.property &&
           memberIsStatic(lhs) == memberIsStatic(rhs);
  }

  static bool sameMethodSelector(const NativeApiMember& lhs,
                                 const NativeApiMember& rhs) {
    return !lhs.property && !rhs.property && sameMemberSlot(lhs, rhs) &&
           lhs.selectorName == rhs.selectorName;
  }

  static const NativeApiMember* findPropertyMember(
      const std::vector<NativeApiMember>& members,
      const NativeApiMember& candidate) {
    for (const auto& member : members) {
      if (member.property && sameMemberSlot(member, candidate)) {
        return &member;
      }
    }
    return nullptr;
  }

  static bool selectorExistsInMembers(
      const std::vector<NativeApiMember>& members,
      const NativeApiMember& candidate) {
    for (const auto& member : members) {
      if (sameMethodSelector(member, candidate)) {
        return true;
      }
    }
    return false;
  }

  static bool shouldSkipPropertyOverride(
      const NativeApiMember* inherited, const NativeApiMember& member) {
    if (inherited == nullptr || !inherited->property) {
      return false;
    }

    bool sameGetter = inherited->selectorName == member.selectorName;
    bool sameSetter =
        inherited->setterSelectorName == member.setterSelectorName;
    if ((!inherited->readonly && member.readonly) ||
        (inherited->readonly == member.readonly && sameGetter &&
         (member.readonly || sameSetter))) {
      return true;
    }
    return false;
  }

  static void appendSurfaceMember(
      std::vector<NativeApiMember>& surface,
      const std::vector<NativeApiMember>& inheritedMembers,
      const NativeApiMember& member) {
    if (member.name.empty()) {
      return;
    }

    if (member.property) {
      const NativeApiMember* inherited =
          findPropertyMember(inheritedMembers, member);
      if (shouldSkipPropertyOverride(inherited, member)) {
        return;
      }

      for (auto& existing : surface) {
        if (!existing.property || !sameMemberSlot(existing, member)) {
          continue;
        }
        if (existing.readonly && !member.readonly) {
          existing = member;
        }
        return;
      }
      surface.push_back(member);
      return;
    }

    const bool keepInheritedMethod =
        member.name == "alloc" || member.name == "toString" ||
        member.name == "superclass";
    if (!keepInheritedMethod &&
        selectorExistsInMembers(inheritedMembers, member)) {
      return;
    }
    if (selectorExistsInMembers(surface, member)) {
      return;
    }
    surface.push_back(member);
  }

  std::vector<NativeApiMember> readSurfaceMembersForClass(
      const NativeApiSymbol& symbol) const {
    std::vector<NativeApiMember> inheritedMembers;
    if (symbol.superclassOffset != MD_SECTION_OFFSET_NULL) {
      auto superclass = classSymbolsByOffset_.find(symbol.superclassOffset);
      if (superclass != classSymbolsByOffset_.end()) {
        const auto& inherited = surfaceMembersForClass(superclass->second);
        inheritedMembers.insert(inheritedMembers.end(), inherited.begin(),
                                inherited.end());
      }
    }

    std::vector<NativeApiMember> surface;
    for (const auto& member : readOwnMembersForClass(symbol.offset)) {
      appendSurfaceMember(surface, inheritedMembers, member);
    }
    return surface;
  }

  std::vector<NativeApiMember> readMembersAtOffset(
      MDSectionOffset& offset) const {
    std::vector<NativeApiMember> members;
    bool next = true;
    while (next) {
      auto flags = metadata_->getMemberFlag(offset);
      next = (flags & metagen::mdMemberNext) != 0;
      offset += sizeof(flags);
      if (flags == metagen::mdMemberFlagNull) {
        break;
      }

      NativeApiMember member;
      member.flags = flags;
      if ((flags & metagen::mdMemberProperty) != 0) {
        member.property = true;
        member.readonly = (flags & metagen::mdMemberReadonly) != 0;
        member.name = metadata_->getString(offset);
        offset += sizeof(MDSectionOffset);
        member.selectorName = metadata_->getString(offset);
        offset += sizeof(MDSectionOffset);
        member.signatureOffset =
            metadata_->signaturesOffset + metadata_->getOffset(offset);
        offset += sizeof(MDSectionOffset);

        if (!member.readonly) {
          member.setterSelectorName = metadata_->getString(offset);
          offset += sizeof(MDSectionOffset);
          member.setterSignatureOffset =
              metadata_->signaturesOffset + metadata_->getOffset(offset);
          offset += sizeof(MDSectionOffset);
        }
      } else {
        member.selectorName = metadata_->getString(offset);
        offset += sizeof(MDSectionOffset);
        member.signatureOffset =
            metadata_->signaturesOffset + metadata_->getOffset(offset);
        offset += sizeof(MDSectionOffset);
        member.name = jsifySelector(member.selectorName.c_str());
      }
      members.push_back(std::move(member));
    }
    return members;
  }

  std::vector<NativeApiMember> readMembersForProtocolHierarchy(
      MDSectionOffset protocolOffset) const {
    std::vector<NativeApiMember> members;
    if (metadata_ == nullptr || protocolOffset == MD_SECTION_OFFSET_NULL) {
      return members;
    }

    MDSectionOffset offset = protocolOffset;
    auto nameOffset = metadata_->getOffset(offset);
    offset += sizeof(MDSectionOffset);
    bool hasProtocols = (nameOffset & metagen::mdSectionOffsetNext) != 0;

    while (hasProtocols) {
      auto inheritedOffset = metadata_->getOffset(offset);
      offset += sizeof(MDSectionOffset);
      hasProtocols = (inheritedOffset & metagen::mdSectionOffsetNext) != 0;
      inheritedOffset &= ~metagen::mdSectionOffsetNext;
      if (inheritedOffset == MD_SECTION_OFFSET_NULL) {
        continue;
      }

      MDSectionOffset absoluteOffset =
          inheritedOffset + metadata_->protocolsOffset;
      auto inheritedSymbol = protocolSymbolsByOffset_.find(absoluteOffset);
      if (inheritedSymbol != protocolSymbolsByOffset_.end()) {
        const auto& inheritedMembers =
            membersForProtocol(inheritedSymbol->second);
        members.insert(members.end(), inheritedMembers.begin(),
                       inheritedMembers.end());
      }
    }

    std::vector<NativeApiMember> ownMembers = readMembersAtOffset(offset);
    members.insert(members.end(), ownMembers.begin(), ownMembers.end());
    return members;
  }

  std::vector<NativeApiMember> readMembersForClassHierarchy(
      const NativeApiSymbol& symbol) const {
    std::vector<NativeApiMember> members = readOwnMembersForClass(symbol.offset);
    if (symbol.superclassOffset == MD_SECTION_OFFSET_NULL) {
      return members;
    }

    auto superclass = classSymbolsByOffset_.find(symbol.superclassOffset);
    if (superclass != classSymbolsByOffset_.end()) {
      const auto& inheritedMembers = membersForClass(superclass->second);
      members.insert(members.end(), inheritedMembers.begin(),
                     inheritedMembers.end());
    }
    return members;
  }

  std::unique_ptr<MDMetadataReader> metadata_;
  void* selfDl_ = nullptr;
  std::unordered_map<std::string, NativeApiSymbol> symbolsByName_;
  std::unordered_map<std::string, NativeApiSymbol> functionSymbolsByName_;
  std::unordered_map<std::string, NativeApiSymbol> constantSymbolsByName_;
  std::unordered_map<std::string, NativeApiSymbol> enumSymbolsByName_;
  std::unordered_map<std::string, NativeApiSymbol> structSymbolsByName_;
  std::unordered_map<std::string, NativeApiSymbol> unionSymbolsByName_;
  std::unordered_map<std::string, NativeApiSymbol> classSymbolsByRuntimeName_;
  std::unordered_map<std::string, NativeApiSymbol> protocolSymbolsByRuntimeName_;
  std::unordered_map<uintptr_t, NativeApiSymbol> classSymbolsByRuntimePointer_;
  std::unordered_map<uintptr_t, NativeApiSymbol> protocolSymbolsByRuntimePointer_;
  mutable std::mutex roundTripValuesMutex_;
  std::unordered_map<uintptr_t, std::shared_ptr<Value>> roundTripValues_;
  std::unordered_set<uintptr_t> rootedRoundTripValues_;
  std::unordered_map<uintptr_t, std::shared_ptr<Value>> classValues_;
  std::unordered_map<uintptr_t, std::shared_ptr<Value>> classPrototypes_;
  std::unordered_map<uintptr_t, std::shared_ptr<Value>> pointerValues_;
  std::unordered_map<uintptr_t,
                     std::unordered_map<std::string, std::shared_ptr<Value>>>
      objectExpandos_;
  std::unordered_map<MDSectionOffset, NativeApiSymbol> classSymbolsByOffset_;
  std::unordered_map<MDSectionOffset, NativeApiSymbol> protocolSymbolsByOffset_;
  std::vector<std::string> classNames_;
  std::vector<std::string> functionNames_;
  std::vector<std::string> constantNames_;
  std::vector<std::string> protocolNames_;
  std::vector<std::string> enumNames_;
  std::vector<std::string> structNames_;
  std::vector<std::string> unionNames_;
  std::shared_ptr<NativeApiV8Scheduler> scheduler_;
  std::function<void(std::function<void()>)> nativeInvocationInvoker_;
  std::function<void(std::function<void()>)> nativeCallbackInvoker_;
  std::function<void(std::function<void()>)> jsThreadCallbackInvoker_;
  bool invokeCallbacksOnNativeCallerThread_ = false;
  mutable std::unordered_map<MDSectionOffset, std::vector<NativeApiMember>>
      membersByClassOffset_;
  mutable std::unordered_map<MDSectionOffset, std::vector<NativeApiMember>>
      surfaceMembersByClassOffset_;
  mutable std::unordered_map<MDSectionOffset, std::vector<NativeApiMember>>
      membersByProtocolOffset_;
  std::unordered_map<MDSectionOffset, NativeApiSymbol> structSymbolsByOffset_;
  std::unordered_map<MDSectionOffset, NativeApiSymbol> unionSymbolsByOffset_;
  std::unordered_map<MDSectionOffset, std::shared_ptr<NativeApiV8AggregateInfo>>
      aggregateInfoByOffset_;
  std::unordered_set<MDSectionOffset> aggregateInfoInProgress_;
  std::thread::id jsThreadId_ = std::this_thread::get_id();
  std::mutex retainedLifetimesMutex_;
  std::vector<std::shared_ptr<void>> retainedLifetimes_;
};

Value makeString(Runtime& runtime, const std::string& value) {
  return String::createFromUtf8(runtime, value);
}

std::string readStringArg(Runtime& runtime, const Value* args, size_t count,
                          size_t index, const char* argumentName) {
  if (index >= count || !args[index].isString()) {
    throw JSError(
        runtime, std::string(argumentName) + " must be a string.");
  }
  return args[index].asString(runtime).utf8(runtime);
}

const char* kindName(NativeApiSymbolKind kind) {
  switch (kind) {
    case NativeApiSymbolKind::Class:
      return "class";
    case NativeApiSymbolKind::Function:
      return "function";
    case NativeApiSymbolKind::Constant:
      return "constant";
    case NativeApiSymbolKind::Protocol:
      return "protocol";
    case NativeApiSymbolKind::Enum:
      return "enum";
    case NativeApiSymbolKind::Struct:
      return "struct";
    case NativeApiSymbolKind::Union:
      return "union";
  }
  return "unknown";
}

Array namesToArray(Runtime& runtime, const std::vector<std::string>& names) {
  Array result(runtime, names.size());
  for (size_t i = 0; i < names.size(); i++) {
    result.setValueAtIndex(runtime, i, makeString(runtime, names[i]));
  }
  return result;
}

void addPropertyName(Runtime& runtime, std::vector<PropNameID>& names,
                     const char* name) {
  names.push_back(PropNameID::forAscii(runtime, name));
}

class NativeApiPointerHostObject;
class NativeApiObjectHostObject;
class NativeApiClassHostObject;
class NativeApiProtocolHostObject;
class NativeApiV8ArgumentFrame;
struct NativeApiV8PreparedCFunctionInvocation;
struct NativeApiV8PreparedObjCInvocation;

Value callCFunction(Runtime& runtime,
                    const std::shared_ptr<NativeApiV8Bridge>& bridge,
                    const NativeApiSymbol& symbol, const Value* args,
                    size_t count);
Value callCFunction(
    Runtime& runtime, const std::shared_ptr<NativeApiV8Bridge>& bridge,
    const std::shared_ptr<NativeApiV8PreparedCFunctionInvocation>& prepared,
    const Value* args, size_t count);

Value callObjCSelector(Runtime& runtime,
                       const std::shared_ptr<NativeApiV8Bridge>& bridge,
                       id receiver, bool receiverIsClass,
                       const std::string& selectorName,
                       const NativeApiMember* member,
                       const Value* args, size_t count,
                       Class dispatchSuperClass = Nil);

std::shared_ptr<NativeApiV8PreparedObjCInvocation>
prepareNativeApiV8ObjCInvocation(
    Runtime& runtime, const std::shared_ptr<NativeApiV8Bridge>& bridge,
    Class lookupClass, bool receiverIsClass, const std::string& selectorName,
    const NativeApiMember* member);

Value callPreparedObjCSelector(
    Runtime& runtime, const std::shared_ptr<NativeApiV8Bridge>& bridge,
    id receiver, bool receiverIsClass,
    const NativeApiV8PreparedObjCInvocation& prepared, const Value* args,
    size_t count, Class dispatchSuperClass = Nil);

Value makeNativeObjectValue(Runtime& runtime,
                            const std::shared_ptr<NativeApiV8Bridge>& bridge,
                            id object, bool ownsObject);

Value makeNativeClassValue(Runtime& runtime,
                           const std::shared_ptr<NativeApiV8Bridge>& bridge,
                           NativeApiSymbol symbol);

Object symbolToObject(Runtime& runtime, const NativeApiSymbol& symbol) {
  Object result(runtime);
  result.setProperty(runtime, "kind", makeString(runtime, kindName(symbol.kind)));
  result.setProperty(runtime, "name", makeString(runtime, symbol.name));
  result.setProperty(runtime, "runtimeName",
                     makeString(runtime, symbol.runtimeName));
  result.setProperty(runtime, "metadataOffset",
                     static_cast<double>(symbol.offset));

  if (symbol.kind == NativeApiSymbolKind::Class) {
    Class cls = objc_lookUpClass(symbol.runtimeName.c_str());
    result.setProperty(runtime, "available", cls != nil);
    if (cls != nil) {
      char address[32] = {};
      snprintf(address, sizeof(address), "%p", cls);
      result.setProperty(runtime, "nativeAddress", makeString(runtime, address));
    }
  } else if (symbol.kind == NativeApiSymbolKind::Struct ||
             symbol.kind == NativeApiSymbolKind::Union) {
    result.setProperty(runtime, "available", true);
  }

  return result;
}

size_t nativeSizeForType(const NativeApiV8Type& type);
std::optional<size_t> parseArrayIndexProperty(const std::string& property);

NativeApiV8Type nativeObjectReturnType(
    MDTypeKind kind = metagen::mdTypeAnyObject) {
  NativeApiV8Type type;
  type.kind = kind;
  type.ffiType = &ffi_type_pointer;
  type.supported = true;
  return type;
}

NativeApiV8Type nativeObjectReturnTypeForClass(Class cls) {
  if (cls != Nil) {
    const char* name = class_getName(cls);
    if (name != nullptr && std::strcmp(name, "NSString") == 0) {
      return nativeObjectReturnType(metagen::mdTypeNSStringObject);
    }
    if (name != nullptr && std::strcmp(name, "NSMutableString") == 0) {
      return nativeObjectReturnType(metagen::mdTypeNSMutableStringObject);
    }
  }
  return nativeObjectReturnType(metagen::mdTypeInstanceObject);
}

Value convertNativeReturnValue(Runtime& runtime,
                               const std::shared_ptr<NativeApiV8Bridge>& bridge,
                               const NativeApiV8Type& type, void* value);
Object createPointer(Runtime& runtime,
                     const std::shared_ptr<NativeApiV8Bridge>& bridge,
                     void* pointer, bool adopted = false);

NativeApiV8Type primitiveInteropType(MDTypeKind kind);

bool isObjectiveCObjectType(const NativeApiJsiType& type) {
  switch (type.kind) {
    case metagen::mdTypeAnyObject:
    case metagen::mdTypeProtocolObject:
    case metagen::mdTypeClassObject:
    case metagen::mdTypeInstanceObject:
    case metagen::mdTypeNSStringObject:
    case metagen::mdTypeNSMutableStringObject:
      return true;
    default:
      return false;
  }
}

#ifndef NATIVESCRIPT_NATIVE_API_RETAIN_RUNTIME
std::shared_ptr<Runtime> retainNativeApiJsiRuntime(Runtime& runtime) {
  return std::shared_ptr<Runtime>(&runtime, [](Runtime*) {});
}
#endif

#ifndef NATIVESCRIPT_NATIVE_API_RUNTIME_SCOPE
class NativeApiJsiRuntimeScope final {
 public:
  explicit NativeApiJsiRuntimeScope(Runtime&) {}
};
#endif

struct NativeApiJsiSignature {
  ffi_cif cif = {};
  NativeApiJsiType returnType;
  std::vector<NativeApiJsiType> argumentTypes;
  std::vector<ffi_type*> ffiTypes;
  std::string selectorName;
  bool variadic = false;
  bool prepared = false;
  unsigned int implicitArgumentCount = 0;
};

enum class NativeApiJsiCallbackThreadPolicy {
  Default,
  UI,
  JS,
};

NativeApiJsiCallbackThreadPolicy readJsiCallbackThreadPolicy(
    Runtime& runtime, Object& functionObject) {
  constexpr const char* propertyName = "__nativeScriptCallbackThread";
  try {
    if (!functionObject.hasProperty(runtime, propertyName)) {
      return NativeApiJsiCallbackThreadPolicy::Default;
    }
    Value policyValue = functionObject.getProperty(runtime, propertyName);
    if (!policyValue.isString()) {
      return NativeApiJsiCallbackThreadPolicy::Default;
    }
    std::string policy = policyValue.asString(runtime).utf8(runtime);
    if (policy == "ui") {
      return NativeApiJsiCallbackThreadPolicy::UI;
    }
    if (policy == "js") {
      return NativeApiJsiCallbackThreadPolicy::JS;
    }
  } catch (const std::exception&) {
  }
  return NativeApiJsiCallbackThreadPolicy::Default;
}

bool selectorEndsWithNSErrorParam(const std::string& selectorName) {
  constexpr const char* suffix = "error:";
  size_t suffixLength = std::strlen(suffix);
  return selectorName.size() >= suffixLength &&
         selectorName.compare(selectorName.size() - suffixLength, suffixLength,
                              suffix) == 0;
}

bool isNSErrorOutJsiMethodSignature(const NativeApiJsiSignature& signature) {
  if (signature.argumentTypes.empty() || signature.variadic ||
      !selectorEndsWithNSErrorParam(signature.selectorName)) {
    return false;
  }

  return signature.argumentTypes.back().kind == metagen::mdTypePointer;
}

bool isNSErrorOutJsiMethodCallback(const NativeApiJsiSignature& signature) {
  return signature.returnType.kind == metagen::mdTypeBool &&
         signature.implicitArgumentCount >= 2 &&
         isNSErrorOutJsiMethodSignature(signature);
}

class NativeApiJsiArgumentFrame {
 public:
  explicit NativeApiJsiArgumentFrame(size_t count) : storage_(count), values_(count) {}

  ~NativeApiJsiArgumentFrame() {
    for (char* string : ownedCStrings_) {
      free(string);
    }
    for (void* buffer : ownedBuffers_) {
      free(buffer);
    }
    for (id object : ownedObjects_) {
      [object release];
    }
    for (const auto& entry : temporaryRoundTripValues_) {
      if (entry.first != nullptr) {
        entry.first->forgetRoundTripValue(entry.second);
      }
    }
    ownedLifetimes_.clear();
  }

  void* storageAt(size_t index, size_t size) {
    storage_[index].assign(std::max<size_t>(size, sizeof(void*)), 0);
    values_[index] = storage_[index].data();
    return values_[index];
  }

  void addCString(char* value) { ownedCStrings_.push_back(value); }
  void* addBuffer(size_t size) {
    void* buffer = calloc(1, std::max<size_t>(size, 1));
    if (buffer == nullptr) {
      throw std::bad_alloc();
    }
    ownedBuffers_.push_back(buffer);
    return buffer;
  }
  void addObject(id value) { ownedObjects_.push_back(value); }
  void addLifetime(std::shared_ptr<void> value) {
    if (value != nullptr) {
      ownedLifetimes_.push_back(std::move(value));
    }
  }
  void rememberRoundTripValue(
      const std::shared_ptr<NativeApiJsiBridge>& bridge, Runtime& runtime,
      const void* native, const Value& value) {
    if (bridge == nullptr || native == nullptr) {
      return;
    }
    bridge->rememberRoundTripValue(runtime, native, value);
    temporaryRoundTripValues_.push_back({bridge, native});
  }
  void** values() { return values_.empty() ? nullptr : values_.data(); }

 private:
  std::vector<std::vector<unsigned char>> storage_;
  std::vector<void*> values_;
  std::vector<char*> ownedCStrings_;
  std::vector<void*> ownedBuffers_;
  std::vector<id> ownedObjects_;
  std::vector<std::shared_ptr<void>> ownedLifetimes_;
  std::vector<std::pair<std::shared_ptr<NativeApiJsiBridge>, const void*>>
      temporaryRoundTripValues_;
};

class NativeApiMutableBuffer final : public MutableBuffer {
 public:
  explicit NativeApiMutableBuffer(size_t size) : data_(size) {}
  NativeApiMutableBuffer(const void* data, size_t size) : data_(size) {
    if (data != nullptr && size > 0) {
      std::memcpy(data_.data(), data, size);
    }
  }

  size_t size() const override { return data_.size(); }
  uint8_t* data() override { return data_.empty() ? nullptr : data_.data(); }

 private:
  std::vector<uint8_t> data_;
};

void convertJsiArgument(Runtime& runtime,
                        const std::shared_ptr<NativeApiJsiBridge>& bridge,
                        const NativeApiJsiType& type,
                        const Value& value, void* target,
                        NativeApiJsiArgumentFrame& frame);

Value convertNativeReturnValue(Runtime& runtime,
                               const std::shared_ptr<NativeApiJsiBridge>& bridge,
                               const NativeApiJsiType& type, void* value);

Value wrapNativeFunctionPointer(Runtime& runtime,
                                const std::shared_ptr<NativeApiJsiBridge>& bridge,
                                const NativeApiJsiType& type, void* pointer,
                                bool block);

bool isObjectiveCObjectType(const NativeApiJsiType& type);

struct NativeApiJsiBlockDescriptor {
  unsigned long reserved = 0;
  unsigned long size = 0;
  void (*copyHelper)(void*, void*) = nullptr;
  void (*disposeHelper)(void*) = nullptr;
  const char* signature = nullptr;
};

struct NativeApiJsiBlockLiteral {
  void* isa = nullptr;
  int flags = 0;
  int reserved = 0;
  void* invoke = nullptr;
  NativeApiJsiBlockDescriptor* descriptor = nullptr;
  void* callback = nullptr;
};

constexpr int kNativeApiJsiBlockNeedsFree = (1 << 24);
constexpr int kNativeApiJsiBlockHasCopyDispose = (1 << 25);
constexpr int kNativeApiJsiBlockRefCountOne = (1 << 1);
constexpr int kNativeApiJsiBlockHasSignature = (1 << 30);

void* nativeApiJsiStackBlockIsa() {
  static void* isa = dlsym(RTLD_DEFAULT, "_NSConcreteStackBlock");
  if (isa == nullptr) {
    isa = dlsym(RTLD_DEFAULT, "_NSConcreteMallocBlock");
  }
  return isa;
}

void nativeApiJsiBlockCopy(void* dst, void* src);
void nativeApiJsiBlockDispose(void* src);

std::string objcEncodingForJsiType(const NativeApiJsiType& type) {
  switch (type.kind) {
    case metagen::mdTypeVoid:
      return "v";
    case metagen::mdTypeBool:
      return "B";
    case metagen::mdTypeChar:
      return "c";
    case metagen::mdTypeUChar:
    case metagen::mdTypeUInt8:
      return "C";
    case metagen::mdTypeSShort:
      return "s";
    case metagen::mdTypeUShort:
      return "S";
    case metagen::mdTypeSInt:
      return "i";
    case metagen::mdTypeUInt:
      return "I";
    case metagen::mdTypeSLong:
    case metagen::mdTypeSInt64:
      return "q";
    case metagen::mdTypeULong:
    case metagen::mdTypeUInt64:
      return "Q";
    case metagen::mdTypeFloat:
      return "f";
    case metagen::mdTypeDouble:
      return "d";
    case metagen::mdTypeString:
      return "*";
    case metagen::mdTypeAnyObject:
    case metagen::mdTypeProtocolObject:
    case metagen::mdTypeInstanceObject:
    case metagen::mdTypeNSStringObject:
    case metagen::mdTypeNSMutableStringObject:
      return "@";
    case metagen::mdTypeClassObject:
    case metagen::mdTypeClass:
      return "#";
    case metagen::mdTypeSelector:
      return ":";
    case metagen::mdTypeBlock:
      return "@?";
    case metagen::mdTypeFunctionPointer:
      return "^?";
    case metagen::mdTypePointer:
    case metagen::mdTypeOpaquePointer:
      if (type.elementType != nullptr &&
          type.elementType->kind != metagen::mdTypeVoid) {
        return "^" + objcEncodingForJsiType(*type.elementType);
      }
      return "^v";
    case metagen::mdTypeStruct:
      return "{" +
             (type.aggregateInfo != nullptr ? type.aggregateInfo->name
                                            : std::string("?")) +
             "=}";
    case metagen::mdTypeArray:
      return "[" + std::to_string(type.arraySize) +
             (type.elementType != nullptr ? objcEncodingForJsiType(*type.elementType)
                                          : std::string("?")) +
             "]";
    case metagen::mdTypeVector:
    case metagen::mdTypeExtVector:
    case metagen::mdTypeComplex:
      return type.elementType != nullptr ? objcEncodingForJsiType(*type.elementType)
                                         : "?";
    default:
      return "?";
  }
}

std::string objcBlockSignatureForJsiSignature(
    const NativeApiJsiSignature& signature) {
  std::string encoding = objcEncodingForJsiType(signature.returnType);
  encoding += "@?";
  for (const auto& argType : signature.argumentTypes) {
    encoding += objcEncodingForJsiType(argType);
  }
  return encoding;
}

std::string objcMethodSignatureForJsiSignature(
    const NativeApiJsiSignature& signature) {
  std::string encoding = objcEncodingForJsiType(signature.returnType);
  encoding += "@:";
  for (const auto& argType : signature.argumentTypes) {
    encoding += objcEncodingForJsiType(argType);
  }
  return encoding;
}

[[noreturn]] void throwNativeApiJsiCallbackException(
    const std::string& message) {
  NSString* reason = [NSString stringWithUTF8String:message.c_str()];
  @throw [NSException exceptionWithName:@"NativeScriptJSICallbackException"
                                 reason:reason
                               userInfo:nil];
}

class NativeApiJsiCallback;

void nativeApiJsiCallbackTrampoline(ffi_cif* cif, void* ret, void* args[],
                                    void* data);

std::atomic<int> gActiveNativeThreadJsiCallbacks{0};

class NativeApiJsiCallback final
    : public std::enable_shared_from_this<NativeApiJsiCallback> {
 public:
  NativeApiJsiCallback(Runtime& runtime,
                       std::shared_ptr<NativeApiJsiBridge> bridge,
                       std::shared_ptr<NativeApiJsiSignature> signature,
                       Function function, bool block,
                       NativeApiJsiCallbackThreadPolicy threadPolicy =
                           NativeApiJsiCallbackThreadPolicy::Default,
                       bool bindThis = false)
      : runtimeOwner_(retainNativeApiJsiRuntime(runtime)),
        runtime_(runtimeOwner_.get()),
        bridge_(std::move(bridge)),
        signature_(std::move(signature)),
        function_(std::make_shared<Function>(std::move(function))),
        block_(block),
        threadPolicy_(threadPolicy),
        bindThis_(bindThis) {
    closure_ = static_cast<ffi_closure*>(
        ffi_closure_alloc(sizeof(ffi_closure), &executable_));
    if (closure_ == nullptr || executable_ == nullptr ||
        signature_ == nullptr || !signature_->prepared) {
      throw facebook::jsi::JSError(runtime,
                                   "Unable to allocate native JSI callback.");
    }

    ffi_status status = ffi_prep_closure_loc(
        closure_, &signature_->cif, nativeApiJsiCallbackTrampoline, this,
        executable_);
    if (status != FFI_OK) {
      ffi_closure_free(closure_);
      closure_ = nullptr;
      executable_ = nullptr;
      throw facebook::jsi::JSError(runtime,
                                   "Unable to prepare native JSI callback.");
    }

    if (block_) {
      blockSignature_ = objcBlockSignatureForJsiSignature(*signature_);
      descriptor_ = std::make_unique<NativeApiJsiBlockDescriptor>();
      descriptor_->reserved = 0;
      descriptor_->size = sizeof(NativeApiJsiBlockLiteral);
      descriptor_->copyHelper = nativeApiJsiBlockCopy;
      descriptor_->disposeHelper = nativeApiJsiBlockDispose;
      descriptor_->signature = blockSignature_.c_str();

      blockLiteral_ = std::make_unique<NativeApiJsiBlockLiteral>();
      blockLiteral_->isa = nativeApiJsiStackBlockIsa();
      blockLiteral_->flags = kNativeApiJsiBlockHasCopyDispose |
                             kNativeApiJsiBlockHasSignature;
      blockLiteral_->invoke = executable_;
      blockLiteral_->descriptor = descriptor_.get();
      blockLiteral_->callback = this;
    }
  }

  ~NativeApiJsiCallback() {
    if (closure_ != nullptr) {
      ffi_closure_free(closure_);
      closure_ = nullptr;
      executable_ = nullptr;
    }
  }

  void* functionPointer() const {
    return block_ && blockLiteral_ != nullptr
               ? static_cast<void*>(blockLiteral_.get())
               : executable_;
  }

  const NativeApiJsiSignature& signature() const { return *signature_; }

  void retainBlockCopy(const void* blockPointer) {
    if (!block_) {
      return;
    }
    auto self = shared_from_this();
    if (bridge_ != nullptr && runtime_ != nullptr && function_ != nullptr &&
        blockPointer != nullptr) {
      bridge_->rememberRoundTripValue(*runtime_, blockPointer,
                                      Value(*runtime_, *function_));
    }
    std::lock_guard<std::mutex> lock(retainedBlockCopiesMutex_);
    retainedBlockCopies_.push_back({blockPointer, std::move(self)});
  }

  void releaseBlockCopy(const void* blockPointer) {
    if (!block_) {
      return;
    }
    std::shared_ptr<NativeApiJsiCallback> keepAlive;
    try {
      keepAlive = shared_from_this();
    } catch (const std::bad_weak_ptr&) {
      return;
    }
    std::lock_guard<std::mutex> lock(retainedBlockCopiesMutex_);
    auto it = retainedBlockCopies_.end();
    if (blockPointer != nullptr) {
      it = std::find_if(
          retainedBlockCopies_.begin(), retainedBlockCopies_.end(),
          [blockPointer](const RetainedBlockCopy& retained) {
            return retained.blockPointer == blockPointer;
          });
    }
    if (it == retainedBlockCopies_.end() && !retainedBlockCopies_.empty()) {
      it = retainedBlockCopies_.end() - 1;
    }
    if (it != retainedBlockCopies_.end()) {
      if (bridge_ != nullptr && it->blockPointer != nullptr) {
        bridge_->forgetRoundTripValue(it->blockPointer);
      }
      retainedBlockCopies_.erase(it);
    }
  }

  void invoke(void* ret, void* args[]) {
    if (runtime_ == nullptr || function_ == nullptr || signature_ == nullptr) {
      throwNativeApiJsiCallbackException("Invalid JSI callback.");
    }

    std::string error;
    auto call = [&]() { invokeOnCurrentThread(ret, args, &error); };
    const auto& nativeCallbackInvoker = bridge_->nativeCallbackInvoker();
    const auto& jsThreadCallbackInvoker = bridge_->jsThreadCallbackInvoker();
    bool currentThreadIsJs =
        std::this_thread::get_id() == bridge_->jsThreadId();

    auto callOnNativeCallerThread = [&]() {
      ScopedNativeCallerThreadJsiCallback callbackScope;
      call();
    };
    auto callOnUIThread = [&]() {
      auto runOnUIThread = [&]() {
        bool previous = gExecutingDispatchedUINativeCall;
        gExecutingDispatchedUINativeCall = true;
        callOnNativeCallerThread();
        gExecutingDispatchedUINativeCall = previous;
      };
      if ([NSThread isMainThread]) {
        runOnUIThread();
      } else {
        dispatch_sync(dispatch_get_main_queue(), ^{
          runOnUIThread();
        });
      }
    };
    auto callOnJSThread = [&]() {
      if (currentThreadIsJs) {
        call();
        return;
      }
      if (jsThreadCallbackInvoker) {
        jsThreadCallbackInvoker(call);
        return;
      }
      if (auto scheduler = bridge_->scheduler()) {
        dispatch_semaphore_t done = dispatch_semaphore_create(0);
        scheduler->invokeOnJS([call, done]() mutable {
          call();
          dispatch_semaphore_signal(done);
        });
        dispatch_semaphore_wait(done, DISPATCH_TIME_FOREVER);
        return;
      }
      error = "Native callback was invoked off the JS thread without a JS scheduler.";
    };

    if (threadPolicy_ == NativeApiJsiCallbackThreadPolicy::UI) {
      callOnUIThread();
      if (!error.empty()) {
        if (!recordNativeCallbackException(error)) {
          throwNativeApiJsiCallbackException(error);
        }
      }
      return;
    }
    if (threadPolicy_ == NativeApiJsiCallbackThreadPolicy::JS) {
      callOnJSThread();
      if (!error.empty()) {
        if (!recordNativeCallbackException(error)) {
          throwNativeApiJsiCallbackException(error);
        }
      }
      return;
    }

    bool returnsVoid = signature_->returnType.kind == metagen::mdTypeVoid;
    bool activeSynchronousNativeInvocation =
        gActiveSynchronousNativeInvocationDepth.load(
            std::memory_order_acquire) > 0;
    bool nativeCallerThreadCallback =
        !currentThreadIsJs &&
        (block_ || (activeSynchronousNativeInvocation && !returnsVoid));
    bool direct = currentThreadIsJs ||
                  gExecutingDispatchedUINativeCall ||
                  gSynchronousNativeInvocationDepth > 0 ||
                  nativeCallerThreadCallback ||
                  (!nativeCallbackInvoker &&
                   activeSynchronousNativeInvocation);
    bool waitForNativeThreadCallback =
        currentThreadIsJs && nativeCallbackInvoker &&
        gActiveNativeThreadJsiCallbacks.load(std::memory_order_acquire) > 0;
    if (direct && !waitForNativeThreadCallback) {
      if (nativeCallerThreadCallback) {
        callOnNativeCallerThread();
      } else {
        call();
      }
    } else if (!currentThreadIsJs && returnsVoid && block_ &&
               jsThreadCallbackInvoker) {
      jsThreadCallbackInvoker(call);
    } else if (nativeCallbackInvoker) {
      bool nativeThreadCallback = !currentThreadIsJs;
      if (nativeThreadCallback) {
        gActiveNativeThreadJsiCallbacks.fetch_add(1,
                                                  std::memory_order_acq_rel);
      }
      try {
        nativeCallbackInvoker(call);
      } catch (...) {
        if (nativeThreadCallback) {
          gActiveNativeThreadJsiCallbacks.fetch_sub(
              1, std::memory_order_acq_rel);
        }
        throw;
      }
      if (nativeThreadCallback) {
        gActiveNativeThreadJsiCallbacks.fetch_sub(1,
                                                  std::memory_order_acq_rel);
      }
    } else if (auto scheduler = bridge_->scheduler()) {
      dispatch_semaphore_t done = dispatch_semaphore_create(0);
      scheduler->invokeOnJS([call, done]() mutable {
        call();
        dispatch_semaphore_signal(done);
      });
      dispatch_semaphore_wait(done, DISPATCH_TIME_FOREVER);
    } else {
      error = "Native callback was invoked off the JS thread without a JS scheduler.";
    }

    if (!error.empty()) {
      if (!recordNativeCallbackException(error)) {
        throwNativeApiJsiCallbackException(error);
      }
    }
  }

 private:
  void invokeOnCurrentThread(void* ret, void* args[], std::string* error) {
    try {
      NativeApiJsiRuntimeScope runtimeScope(*runtime_);
      size_t nativeArgOffset = signature_->implicitArgumentCount;
      std::vector<Value> jsArgs;
      jsArgs.reserve(signature_->argumentTypes.size());
      for (size_t i = 0; i < signature_->argumentTypes.size(); i++) {
        jsArgs.emplace_back(convertNativeReturnValue(
            *runtime_, bridge_, signature_->argumentTypes[i],
            args[i + nativeArgOffset]));
      }

      Value result = Value::undefined();
      if (bindThis_ && nativeArgOffset >= 1) {
        id self = *static_cast<id*>(args[0]);
        Value thisValue =
            makeNativeObjectValue(*runtime_, bridge_, self, false);
        Object thisObject = thisValue.isObject()
                                ? thisValue.asObject(*runtime_)
                                : Object(*runtime_);
        result =
            jsArgs.empty()
                ? function_->callWithThis(*runtime_, thisObject)
                : function_->callWithThis(
                      *runtime_, thisObject,
                      static_cast<const Value*>(jsArgs.data()),
                      static_cast<size_t>(jsArgs.size()));
      } else {
        result =
            jsArgs.empty()
                ? function_->call(*runtime_)
                : function_->call(*runtime_,
                                  static_cast<const Value*>(jsArgs.data()),
                                  static_cast<size_t>(jsArgs.size()));
      }
      storeReturnValue(result, ret);
      if (std::this_thread::get_id() == bridge_->jsThreadId()) {
        runtime_->drainMicrotasks();
      }
    } catch (const std::exception& exception) {
      if (isNSErrorOutJsiMethodCallback(*signature_)) {
        zeroReturnValue(ret);
        populateNSErrorOutArgument(args, exception.what());
        return;
      }
      if (error != nullptr) {
        *error = exception.what();
      }
      zeroReturnValue(ret);
    } catch (...) {
      if (isNSErrorOutJsiMethodCallback(*signature_)) {
        zeroReturnValue(ret);
        populateNSErrorOutArgument(args, "Unknown exception in native JSI callback.");
        return;
      }
      if (error != nullptr) {
        *error = "Unknown exception in native JSI callback.";
      }
      zeroReturnValue(ret);
    }
  }

  void populateNSErrorOutArgument(void* args[], const char* message) {
    if (args == nullptr || signature_ == nullptr ||
        signature_->argumentTypes.empty()) {
      return;
    }

    size_t outArgIndex = signature_->implicitArgumentCount +
                         signature_->argumentTypes.size() - 1;
    void* outArgValue = args[outArgIndex];
    NSError** outError =
        outArgValue != nullptr ? *reinterpret_cast<NSError***>(outArgValue)
                               : nullptr;
    if (outError == nullptr) {
      return;
    }

    NSString* nsMessage =
        message != nullptr ? [NSString stringWithUTF8String:message] : nil;
    if (nsMessage == nil) {
      nsMessage = @"JS error";
    }
    NSDictionary* userInfo = @{NSLocalizedDescriptionKey : nsMessage};
    *outError = [NSError errorWithDomain:@"TNSErrorDomain"
                                    code:1
                                userInfo:userInfo];
  }

  void zeroReturnValue(void* ret) {
    if (ret == nullptr || signature_ == nullptr ||
        signature_->returnType.kind == metagen::mdTypeVoid) {
      return;
    }
    size_t size = nativeSizeForType(signature_->returnType);
    if (size > 0) {
      std::memset(ret, 0, size);
    }
  }

  void storeReturnValue(const Value& result, void* ret) {
    if (ret == nullptr ||
        signature_->returnType.kind == metagen::mdTypeVoid) {
      return;
    }

    zeroReturnValue(ret);
    if (result.isUndefined() || result.isNull()) {
      return;
    }
    const auto& returnType = signature_->returnType;
    if (returnType.kind == metagen::mdTypeString && result.isString()) {
      std::string utf8 = result.asString(*runtime_).utf8(*runtime_);
      *static_cast<char**>(ret) = strdup(utf8.c_str());
      return;
    }
    if ((returnType.kind == metagen::mdTypePointer ||
         returnType.kind == metagen::mdTypeOpaquePointer) &&
        result.isString()) {
      std::string utf8 = result.asString(*runtime_).utf8(*runtime_);
      *static_cast<void**>(ret) = strdup(utf8.c_str());
      return;
    }

    NativeApiJsiArgumentFrame frame(1);
    convertJsiArgument(*runtime_, bridge_, returnType, result, ret, frame);
    if (isObjectiveCObjectType(returnType)) {
      id object = *static_cast<id*>(ret);
      if (object != nil) {
        [object retain];
        [object autorelease];
      }
    }
  }

  std::shared_ptr<Runtime> runtimeOwner_;
  Runtime* runtime_ = nullptr;
  std::shared_ptr<NativeApiJsiBridge> bridge_;
  std::shared_ptr<NativeApiJsiSignature> signature_;
  std::shared_ptr<Function> function_;
  bool block_ = false;
  NativeApiJsiCallbackThreadPolicy threadPolicy_ =
      NativeApiJsiCallbackThreadPolicy::Default;
  bool bindThis_ = false;
  ffi_closure* closure_ = nullptr;
  void* executable_ = nullptr;
  std::string blockSignature_;
  std::unique_ptr<NativeApiJsiBlockDescriptor> descriptor_;
  std::unique_ptr<NativeApiJsiBlockLiteral> blockLiteral_;
  struct RetainedBlockCopy {
    const void* blockPointer = nullptr;
    std::shared_ptr<NativeApiJsiCallback> lifetime;
  };
  std::mutex retainedBlockCopiesMutex_;
  std::vector<RetainedBlockCopy> retainedBlockCopies_;
};

void nativeApiJsiBlockCopy(void* dst, void* src) {
  auto* dstBlock = static_cast<NativeApiJsiBlockLiteral*>(dst);
  auto* srcBlock = static_cast<NativeApiJsiBlockLiteral*>(src);
  if (dstBlock == nullptr || srcBlock == nullptr ||
      srcBlock->callback == nullptr) {
    return;
  }
  dstBlock->callback = srcBlock->callback;
  static_cast<NativeApiJsiCallback*>(srcBlock->callback)
      ->retainBlockCopy(dstBlock);
}

void nativeApiJsiBlockDispose(void* src) {
  auto* block = static_cast<NativeApiJsiBlockLiteral*>(src);
  if (block == nullptr || block->callback == nullptr) {
    return;
  }
  static_cast<NativeApiJsiCallback*>(block->callback)->releaseBlockCopy(block);
  block->callback = nullptr;
}

void nativeApiJsiCallbackTrampoline(ffi_cif*, void* ret, void* args[],
                                    void* data) {
  auto callback = static_cast<NativeApiJsiCallback*>(data);
  if (callback == nullptr) {
    return;
  }
  @try {
    callback->invoke(ret, args);
  } @catch (NSException* exception) {
    const char* description =
        exception.description != nil ? exception.description.UTF8String : nullptr;
    std::string message = description != nullptr
                              ? description
                              : "Objective-C exception in native JSI callback.";
    if (!recordNativeCallbackException(message)) {
      @throw;
    }
  }
}

size_t nativeSizeForType(const NativeApiJsiType& type) {
  switch (type.kind) {
    case metagen::mdTypeStruct:
      if (type.aggregateInfo != nullptr) {
        return type.aggregateInfo->size;
      }
      break;
    case metagen::mdTypeArray:
      if (type.elementType != nullptr) {
        return nativeSizeForType(*type.elementType) *
               static_cast<size_t>(type.arraySize);
      }
      break;
    case metagen::mdTypeVector:
    case metagen::mdTypeExtVector:
    case metagen::mdTypeComplex:
      if (type.elementType != nullptr) {
        size_t lanes = std::max<size_t>(type.arraySize, 1);
        size_t abiLanes = lanes == 3 ? 4 : lanes;
        return nativeSizeForType(*type.elementType) * abiLanes;
      }
      break;
    default:
      break;
  }

  if (type.ffiType != nullptr && type.ffiType->size > 0) {
    return type.ffiType->size;
  }
  if (type.ffiType == &ffi_type_void) {
    return 0;
  }
  return sizeof(void*);
}

Value signedInteger64ToJsiValue(Runtime& runtime, int64_t value) {
  constexpr int64_t maxSafeInteger = 9007199254740991LL;
  constexpr int64_t minSafeInteger = -9007199254740991LL;
  if (value >= minSafeInteger && value <= maxSafeInteger) {
    return static_cast<double>(value);
  }
  return BigInt::fromInt64(runtime, value);
}

Value unsignedInteger64ToJsiValue(Runtime& runtime, uint64_t value) {
  constexpr uint64_t maxSafeInteger = 9007199254740991ULL;
  if (value <= maxSafeInteger) {
    return static_cast<double>(value);
  }
  return BigInt::fromUint64(runtime, value);
}

bool parseIntegerTextToUintptr(const std::string& text, uintptr_t* address) {
  if (address == nullptr) {
    return false;
  }
  if (text.empty()) {
    return false;
  }

  char* end = nullptr;
  if (text[0] == '-') {
    long long signedValue = std::strtoll(text.c_str(), &end, 10);
    if (end == nullptr || *end != '\0') {
      return false;
    }
    *address = static_cast<uintptr_t>(static_cast<intptr_t>(signedValue));
    return true;
  }

  int base = 10;
  const char* start = text.c_str();
  if (text.size() > 2 && text[0] == '0' &&
      (text[1] == 'x' || text[1] == 'X')) {
    base = 16;
  }
  unsigned long long unsignedValue = std::strtoull(start, &end, base);
  if (end == nullptr || *end != '\0') {
    return false;
  }
  *address = static_cast<uintptr_t>(unsignedValue);
  return true;
}

bool parseBigIntToUintptr(Runtime& runtime, const BigInt& bigint,
                          uintptr_t* address) {
  return parseIntegerTextToUintptr(bigint.toString(runtime, 10).utf8(runtime),
                                   address);
}

bool readJsiBuffer(Runtime& runtime, const Object& object, const uint8_t** data,
                   size_t* byteLength) {
  if (data == nullptr || byteLength == nullptr) {
    return false;
  }

  if (object.isArrayBuffer(runtime)) {
    ArrayBuffer buffer = object.getArrayBuffer(runtime);
    *data = buffer.data(runtime);
    *byteLength = buffer.size(runtime);
    return true;
  }

  Value bufferValue = object.getProperty(runtime, "buffer");
  if (!bufferValue.isObject()) {
    return false;
  }
  Object bufferObject = bufferValue.asObject(runtime);
  if (!bufferObject.isArrayBuffer(runtime)) {
    return false;
  }

  size_t byteOffset = 0;
  size_t viewByteLength = 0;
  Value offsetValue = object.getProperty(runtime, "byteOffset");
  if (offsetValue.isNumber()) {
    byteOffset = static_cast<size_t>(std::max<double>(0, offsetValue.getNumber()));
  }
  Value lengthValue = object.getProperty(runtime, "byteLength");
  if (lengthValue.isNumber()) {
    viewByteLength = static_cast<size_t>(std::max<double>(0, lengthValue.getNumber()));
  }

  ArrayBuffer buffer = bufferObject.getArrayBuffer(runtime);
  if (byteOffset > buffer.size(runtime)) {
    return false;
  }
  if (viewByteLength == 0 || byteOffset + viewByteLength > buffer.size(runtime)) {
    viewByteLength = buffer.size(runtime) - byteOffset;
  }
  *data = buffer.data(runtime) + byteOffset;
  *byteLength = viewByteLength;
  return true;
}

uint32_t rawTypeKind(MDTypeKind kind) {
  return static_cast<uint32_t>(kind);
}

MDTypeKind stripTypeFlags(MDTypeKind kind) {
  uint32_t raw = rawTypeKind(kind);
  raw &= ~static_cast<uint32_t>(metagen::mdTypeFlagNext);
  raw &= ~static_cast<uint32_t>(metagen::mdTypeFlagVariadic);
  return static_cast<MDTypeKind>(raw);
}

size_t alignUp(size_t value, size_t alignment) {
  if (alignment == 0) {
    return value;
  }
  return ((value + alignment - 1) / alignment) * alignment;
}

ffi_type* ffiTypeForJsiKind(MDTypeKind kind) {
  switch (kind) {
    case metagen::mdTypeChar:
      return &ffi_type_sint8;
    case metagen::mdTypeUChar:
    case metagen::mdTypeUInt8:
    case metagen::mdTypeBool:
      return &ffi_type_uint8;
    case metagen::mdTypeSShort:
      return &ffi_type_sint16;
    case metagen::mdTypeUShort:
      return &ffi_type_uint16;
    case metagen::mdTypeSInt:
      return &ffi_type_sint32;
    case metagen::mdTypeUInt:
      return &ffi_type_uint32;
    case metagen::mdTypeSLong:
    case metagen::mdTypeSInt64:
      return &ffi_type_sint64;
    case metagen::mdTypeULong:
    case metagen::mdTypeUInt64:
      return &ffi_type_uint64;
    case metagen::mdTypeFloat:
      return &ffi_type_float;
    case metagen::mdTypeDouble:
      return &ffi_type_double;
    case metagen::mdTypeVoid:
      return &ffi_type_void;
    case metagen::mdTypeString:
    case metagen::mdTypeAnyObject:
    case metagen::mdTypeProtocolObject:
    case metagen::mdTypeClassObject:
    case metagen::mdTypeInstanceObject:
    case metagen::mdTypeNSStringObject:
    case metagen::mdTypeNSMutableStringObject:
    case metagen::mdTypeClass:
    case metagen::mdTypeSelector:
    case metagen::mdTypePointer:
    case metagen::mdTypeOpaquePointer:
    case metagen::mdTypeBlock:
    case metagen::mdTypeFunctionPointer:
      return &ffi_type_pointer;
    default:
      return nullptr;
  }
}

bool isSupportedJsiKind(MDTypeKind kind) {
  switch (kind) {
    default:
      return ffiTypeForJsiKind(kind) != nullptr;
  }
}

void skipMetadataJsiTypePayload(MDMetadataReader* metadata, MDSectionOffset* offset,
                                MDTypeKind kind);

void skipMetadataJsiType(MDMetadataReader* metadata, MDSectionOffset* offset) {
  MDTypeKind kind = stripTypeFlags(metadata->getTypeKind(*offset));
  *offset += sizeof(MDTypeKind);
  skipMetadataJsiTypePayload(metadata, offset, kind);
}

void skipMetadataJsiTypePayload(MDMetadataReader* metadata, MDSectionOffset* offset,
                                MDTypeKind kind) {
  switch (kind) {
    case metagen::mdTypeClassObject: {
      auto classOffset = metadata->getOffset(*offset);
      *offset += sizeof(MDSectionOffset);
      bool next = (classOffset & metagen::mdSectionOffsetNext) != 0;
      while (next) {
        auto protocolOffset = metadata->getOffset(*offset);
        *offset += sizeof(MDSectionOffset);
        next = (protocolOffset & metagen::mdSectionOffsetNext) != 0;
      }
      break;
    }
    case metagen::mdTypeProtocolObject: {
      bool next = true;
      while (next) {
        auto protocolOffset = metadata->getOffset(*offset);
        *offset += sizeof(MDSectionOffset);
        next = (protocolOffset & metagen::mdSectionOffsetNext) != 0;
      }
      break;
    }
    case metagen::mdTypeArray:
    case metagen::mdTypeVector:
    case metagen::mdTypeExtVector:
    case metagen::mdTypeComplex:
      *offset += sizeof(uint16_t);
      skipMetadataJsiType(metadata, offset);
      break;
    case metagen::mdTypeStruct:
      *offset += sizeof(MDSectionOffset);
      break;
    case metagen::mdTypePointer:
      skipMetadataJsiType(metadata, offset);
      break;
    case metagen::mdTypeBlock:
    case metagen::mdTypeFunctionPointer:
      *offset += sizeof(MDSectionOffset);
      break;
    default:
      break;
  }
}

NativeApiJsiType parseMetadataJsiType(MDMetadataReader* metadata,
                                      MDSectionOffset* offset,
                                      NativeApiJsiBridge* bridge) {
  MDTypeKind rawKind = metadata->getTypeKind(*offset);
  MDTypeKind kind = stripTypeFlags(rawKind);
  *offset += sizeof(MDTypeKind);

  NativeApiJsiType type;
  type.kind = kind;

  switch (kind) {
    case metagen::mdTypeArray: {
      type.arraySize = metadata->getArraySize(*offset);
      *offset += sizeof(uint16_t);
      type.elementType =
          std::make_shared<NativeApiJsiType>(
              parseMetadataJsiType(metadata, offset, bridge));
      auto ffiOwner = std::make_shared<NativeApiJsiFfiType>();
      ffiOwner->elements.reserve(static_cast<size_t>(type.arraySize) + 1);
      ffi_type* elementFfiType = type.elementType->ffiType != nullptr
                                     ? type.elementType->ffiType
                                     : &ffi_type_pointer;
      for (uint16_t i = 0; i < type.arraySize; i++) {
        ffiOwner->elements.push_back(elementFfiType);
      }
      ffiOwner->finalize();
      type.ownedFfiType = ffiOwner;
      type.ffiType = &ffiOwner->type;
      type.supported = type.elementType->supported;
      return type;
    }
    case metagen::mdTypeVector:
    case metagen::mdTypeExtVector:
    case metagen::mdTypeComplex: {
      type.arraySize = metadata->getArraySize(*offset);
      *offset += sizeof(uint16_t);
      type.elementType =
          std::make_shared<NativeApiJsiType>(
              parseMetadataJsiType(metadata, offset, bridge));
      auto ffiOwner = std::make_shared<NativeApiJsiFfiType>();
#if defined(FFI_TYPE_EXT_VECTOR)
      ffiOwner->type.type =
          kind == metagen::mdTypeComplex ? FFI_TYPE_COMPLEX : FFI_TYPE_EXT_VECTOR;
#else
      ffiOwner->type.type =
          kind == metagen::mdTypeComplex ? FFI_TYPE_COMPLEX : FFI_TYPE_STRUCT;
#endif
      ffi_type* elementFfiType = type.elementType->ffiType != nullptr
                                     ? type.elementType->ffiType
                                     : &ffi_type_float;
      size_t lanes = std::max<size_t>(type.arraySize, 1);
      size_t abiLanes = lanes == 3 ? 4 : lanes;
      size_t elementSize = std::max<size_t>(elementFfiType->size, sizeof(float));
      size_t elementAlignment =
          std::max<size_t>(elementFfiType->alignment, static_cast<size_t>(1));
      ffiOwner->elements.reserve(abiLanes + 1);
      for (size_t i = 0; i < abiLanes; i++) {
        ffiOwner->elements.push_back(elementFfiType);
      }
      ffiOwner->finalize();
      size_t vectorAlignment = elementAlignment;
      if (kind != metagen::mdTypeComplex) {
        size_t packedSize = abiLanes * elementSize;
        size_t preferredAlignment = packedSize >= 16 ? 16 : packedSize;
        vectorAlignment = std::max(vectorAlignment, preferredAlignment);
      }
      vectorAlignment = std::min<size_t>(vectorAlignment, 16);
      ffiOwner->type.alignment = static_cast<unsigned short>(vectorAlignment);
      ffiOwner->type.size = alignUp(abiLanes * elementSize, vectorAlignment);
      type.ownedFfiType = ffiOwner;
      type.ffiType = &ffiOwner->type;
      type.supported = type.elementType->supported;
      return type;
    }
    case metagen::mdTypeStruct: {
      auto structOffset = metadata->getOffset(*offset);
      *offset += sizeof(MDSectionOffset);
      bool isUnion = (structOffset & metagen::mdSectionOffsetNext) != 0;
      structOffset &= ~metagen::mdSectionOffsetNext;
      if (structOffset == MD_SECTION_OFFSET_NULL || bridge == nullptr) {
        type.kind = metagen::mdTypePointer;
        type.ffiType = &ffi_type_pointer;
        type.supported = true;
        return type;
      }

      MDSectionOffset absoluteOffset =
          structOffset + (isUnion ? metadata->unionsOffset : metadata->structsOffset);
      type.aggregateOffset = absoluteOffset;
      type.aggregateIsUnion = isUnion;
      type.aggregateInfo = bridge->aggregateInfoFor(absoluteOffset, isUnion);
      type.ffiType = type.aggregateInfo != nullptr && type.aggregateInfo->ffi != nullptr
                         ? &type.aggregateInfo->ffi->type
                         : nullptr;
      type.supported = type.ffiType != nullptr;
      return type;
    }
    case metagen::mdTypePointer:
      type.elementType =
          std::make_shared<NativeApiJsiType>(
              parseMetadataJsiType(metadata, offset, bridge));
      type.ffiType = &ffi_type_pointer;
      type.supported = true;
      return type;
    case metagen::mdTypeBlock:
    case metagen::mdTypeFunctionPointer:
      type.signatureOffset = metadata->getOffset(*offset) + metadata->signaturesOffset;
      *offset += sizeof(MDSectionOffset);
      type.ffiType = &ffi_type_pointer;
      type.supported = true;
      return type;
    case metagen::mdTypeClassObject: {
      auto classOffset = metadata->getOffset(*offset);
      *offset += sizeof(MDSectionOffset);
      bool next = (classOffset & metagen::mdSectionOffsetNext) != 0;
      while (next) {
        auto protocolOffset = metadata->getOffset(*offset);
        *offset += sizeof(MDSectionOffset);
        next = (protocolOffset & metagen::mdSectionOffsetNext) != 0;
      }
      break;
    }
    case metagen::mdTypeProtocolObject: {
      bool next = true;
      while (next) {
        auto protocolOffset = metadata->getOffset(*offset);
        *offset += sizeof(MDSectionOffset);
        next = (protocolOffset & metagen::mdSectionOffsetNext) != 0;
      }
      break;
    }
    default:
      break;
  }

  type.ffiType = ffiTypeForJsiKind(kind);
  type.supported = type.ffiType != nullptr && isSupportedJsiKind(kind);
  return type;
}

std::shared_ptr<NativeApiJsiAggregateInfo> NativeApiJsiBridge::aggregateInfoFor(
    MDSectionOffset aggregateOffset, bool isUnion) {
  if (metadata_ == nullptr || aggregateOffset == MD_SECTION_OFFSET_NULL) {
    return nullptr;
  }

  auto cached = aggregateInfoByOffset_.find(aggregateOffset);
  if (cached != aggregateInfoByOffset_.end()) {
    return cached->second;
  }

  auto info = std::make_shared<NativeApiJsiAggregateInfo>();
  info->offset = aggregateOffset;
  info->isUnion = isUnion;
  aggregateInfoByOffset_[aggregateOffset] = info;

  if (aggregateInfoInProgress_.find(aggregateOffset) !=
      aggregateInfoInProgress_.end()) {
    auto ffiOwner = std::make_shared<NativeApiJsiFfiType>();
    ffiOwner->elements.push_back(&ffi_type_pointer);
    ffiOwner->finalize();
    info->ffi = ffiOwner;
    return info;
  }

  aggregateInfoInProgress_.insert(aggregateOffset);

  MDSectionOffset offset = aggregateOffset;
  const char* name = metadata_->getString(offset);
  info->name = name != nullptr ? name : "";
  offset += sizeof(MDSectionOffset);
  info->size = metadata_->getArraySize(offset);
  offset += sizeof(uint16_t);

  bool next = true;
  while (next) {
    MDSectionOffset nameOffset = metadata_->getOffset(offset);
    offset += sizeof(MDSectionOffset);
    next = (nameOffset & metagen::mdSectionOffsetNext) != 0;
    nameOffset &= ~metagen::mdSectionOffsetNext;
    if (nameOffset == MD_SECTION_OFFSET_NULL) {
      break;
    }

    NativeApiJsiAggregateField field;
    const char* fieldName = metadata_->resolveString(nameOffset);
    field.name = fieldName != nullptr ? fieldName : "";
    if (!isUnion) {
      field.offset = metadata_->getArraySize(offset);
      offset += sizeof(uint16_t);
    }
    field.type = parseMetadataJsiType(metadata_.get(), &offset, this);
    info->fields.push_back(std::move(field));
  }

  auto ffiOwner = std::make_shared<NativeApiJsiFfiType>();
  if (isUnion) {
    ffi_type* largest = &ffi_type_uint8;
    size_t largestSize = 0;
    for (const auto& field : info->fields) {
      size_t fieldSize = nativeSizeForType(field.type);
      if (field.type.ffiType != nullptr && fieldSize >= largestSize) {
        largest = field.type.ffiType;
        largestSize = fieldSize;
      }
    }
    ffiOwner->elements.push_back(largest);
  } else {
    for (const auto& field : info->fields) {
      ffiOwner->elements.push_back(field.type.ffiType != nullptr
                                       ? field.type.ffiType
                                       : &ffi_type_pointer);
    }
    if (ffiOwner->elements.empty()) {
      ffiOwner->elements.push_back(&ffi_type_uint8);
    }
  }
  ffiOwner->finalize();
  info->ffi = ffiOwner;
  aggregateInfoInProgress_.erase(aggregateOffset);
  return info;
}

ffi_type* ffiTypeForJsiArgument(const NativeApiJsiType& type) {
  switch (type.kind) {
    case metagen::mdTypeArray:
      return &ffi_type_pointer;
    default:
      return type.ffiType != nullptr ? type.ffiType : &ffi_type_pointer;
  }
}

std::optional<NativeApiJsiSignature> parseMetadataJsiSignature(
    MDMetadataReader* metadata, MDSectionOffset signatureOffset,
    unsigned int implicitArgumentCount, NativeApiJsiBridge* bridge,
    bool returnOwned = false) {
  if (metadata == nullptr || signatureOffset == MD_SECTION_OFFSET_NULL) {
    return std::nullopt;
  }

  NativeApiJsiSignature signature;
  signature.implicitArgumentCount = implicitArgumentCount;

  MDSectionOffset offset = signatureOffset;
  MDTypeKind returnKind = metadata->getTypeKind(offset);
  uint32_t returnKindRaw = rawTypeKind(returnKind);
  bool next =
      (returnKindRaw & static_cast<uint32_t>(metagen::mdTypeFlagNext)) != 0;
  signature.variadic =
      (returnKindRaw & static_cast<uint32_t>(metagen::mdTypeFlagVariadic)) != 0;
  signature.returnType = parseMetadataJsiType(metadata, &offset, bridge);
  signature.returnType.returnOwned = returnOwned;

  while (next) {
    MDTypeKind argKind = metadata->getTypeKind(offset);
    next = (rawTypeKind(argKind) &
            static_cast<uint32_t>(metagen::mdTypeFlagNext)) != 0;
    signature.argumentTypes.push_back(parseMetadataJsiType(metadata, &offset, bridge));
  }

  signature.ffiTypes.reserve(signature.argumentTypes.size() +
                             implicitArgumentCount);
  for (unsigned int i = 0; i < implicitArgumentCount; i++) {
    signature.ffiTypes.push_back(&ffi_type_pointer);
  }
  for (const auto& argType : signature.argumentTypes) {
    signature.ffiTypes.push_back(ffiTypeForJsiArgument(argType));
  }

  ffi_status status = ffi_prep_cif(
      &signature.cif, FFI_DEFAULT_ABI,
      static_cast<unsigned int>(signature.ffiTypes.size()),
      signature.returnType.ffiType != nullptr ? signature.returnType.ffiType
                                              : &ffi_type_void,
      signature.ffiTypes.empty() ? nullptr : signature.ffiTypes.data());
  signature.prepared = status == FFI_OK;
  return signature;
}

const char* skipObjCTypeQualifiers(const char* encoding) {
  while (encoding != nullptr && *encoding != '\0' &&
         std::strchr("rnNoORV", *encoding) != nullptr) {
    encoding++;
  }
  return encoding;
}

NativeApiJsiType parseObjCEncodedJsiType(
    const char* encoding, NativeApiJsiBridge* bridge = nullptr) {
  encoding = skipObjCTypeQualifiers(encoding);
  NativeApiJsiType type;

  if (encoding == nullptr || *encoding == '\0') {
    type.kind = metagen::mdTypePointer;
    type.ffiType = &ffi_type_pointer;
    return type;
  }

  switch (*encoding) {
    case 'c':
      type.kind = metagen::mdTypeChar;
      break;
    case 'i':
      type.kind = metagen::mdTypeSInt;
      break;
    case 's':
      type.kind = metagen::mdTypeSShort;
      break;
    case 'l':
    case 'q':
      type.kind = metagen::mdTypeSInt64;
      break;
    case 'C':
      type.kind = metagen::mdTypeUInt8;
      break;
    case 'I':
      type.kind = metagen::mdTypeUInt;
      break;
    case 'S':
      type.kind = metagen::mdTypeUShort;
      break;
    case 'L':
    case 'Q':
      type.kind = metagen::mdTypeUInt64;
      break;
    case 'f':
      type.kind = metagen::mdTypeFloat;
      break;
    case 'd':
      type.kind = metagen::mdTypeDouble;
      break;
    case 'B':
      type.kind = metagen::mdTypeBool;
      break;
    case 'v':
      type.kind = metagen::mdTypeVoid;
      break;
    case '*':
      type.kind = metagen::mdTypeString;
      break;
    case '@':
      if (std::strncmp(encoding, "@\"NSString\"", 11) == 0) {
        type.kind = metagen::mdTypeNSStringObject;
      } else if (std::strncmp(encoding, "@\"NSMutableString\"", 18) == 0) {
        type.kind = metagen::mdTypeNSMutableStringObject;
      } else {
        type.kind = metagen::mdTypeAnyObject;
      }
      break;
    case '#':
      type.kind = metagen::mdTypeClass;
      break;
    case ':':
      type.kind = metagen::mdTypeSelector;
      break;
    case '^':
      type.kind = metagen::mdTypePointer;
      type.elementType = std::make_shared<NativeApiJsiType>(
          parseObjCEncodedJsiType(encoding + 1, bridge));
      type.ffiType = &ffi_type_pointer;
      type.supported = true;
      return type;
    case '{':
    case '(': {
      type.kind = metagen::mdTypeStruct;
      const char* nameStart = encoding + 1;
      const char* nameEnd = nameStart;
      while (*nameEnd != '\0' && *nameEnd != '=' && *nameEnd != '}'
             && *nameEnd != ')') {
        nameEnd++;
      }
      if (bridge != nullptr && nameEnd > nameStart) {
        std::string aggregateName(nameStart,
                                  static_cast<size_t>(nameEnd - nameStart));
        const NativeApiSymbol* symbol =
            *encoding == '(' ? bridge->findUnion(aggregateName)
                             : bridge->findStruct(aggregateName);
        if (symbol == nullptr) {
          symbol = bridge->findAggregate(aggregateName);
        }
        if (symbol != nullptr) {
          type.aggregateOffset = symbol->offset;
          type.aggregateIsUnion = symbol->kind == NativeApiSymbolKind::Union;
          type.aggregateInfo = bridge->aggregateInfoFor(*symbol);
          type.ffiType =
              type.aggregateInfo != nullptr && type.aggregateInfo->ffi != nullptr
                  ? &type.aggregateInfo->ffi->type
                  : nullptr;
          type.supported = type.ffiType != nullptr;
          return type;
        }
      }
      type.supported = false;
      type.ffiType = nullptr;
      return type;
    }
    case '[':
      type.kind = metagen::mdTypeStruct;
      type.supported = false;
      type.ffiType = nullptr;
      return type;
    default:
      type.kind = metagen::mdTypePointer;
      break;
  }

  type.ffiType = ffiTypeForJsiKind(type.kind);
  type.supported = type.ffiType != nullptr;
  return type;
}

std::optional<NativeApiJsiSignature> parseObjCMethodJsiSignature(
    Method method, NativeApiJsiBridge* bridge = nullptr) {
  if (method == nullptr) {
    return std::nullopt;
  }

  NativeApiJsiSignature signature;
  signature.implicitArgumentCount = 2;

  char* returnEncoding = method_copyReturnType(method);
  signature.returnType = parseObjCEncodedJsiType(returnEncoding, bridge);
  if (returnEncoding != nullptr) {
    free(returnEncoding);
  }

  unsigned int totalArgc = method_getNumberOfArguments(method);
  for (unsigned int i = 2; i < totalArgc; i++) {
    char* argEncoding = method_copyArgumentType(method, i);
    signature.argumentTypes.push_back(parseObjCEncodedJsiType(argEncoding, bridge));
    if (argEncoding != nullptr) {
      free(argEncoding);
    }
  }

  signature.ffiTypes.reserve(totalArgc);
  signature.ffiTypes.push_back(&ffi_type_pointer);
  signature.ffiTypes.push_back(&ffi_type_pointer);
  for (const auto& argType : signature.argumentTypes) {
    signature.ffiTypes.push_back(ffiTypeForJsiArgument(argType));
  }

  ffi_status status = ffi_prep_cif(
      &signature.cif, FFI_DEFAULT_ABI,
      static_cast<unsigned int>(signature.ffiTypes.size()),
      signature.returnType.ffiType != nullptr ? signature.returnType.ffiType
                                              : &ffi_type_void,
      signature.ffiTypes.data());
  signature.prepared = status == FFI_OK;
  return signature;
}

bool prepareJsiMethodSignature(NativeApiJsiSignature* signature) {
  if (signature == nullptr) {
    return false;
  }
  signature->implicitArgumentCount = 2;
  signature->ffiTypes.clear();
  signature->ffiTypes.reserve(signature->argumentTypes.size() + 2);
  signature->ffiTypes.push_back(&ffi_type_pointer);
  signature->ffiTypes.push_back(&ffi_type_pointer);
  for (const auto& argType : signature->argumentTypes) {
    ffi_type* ffiType = ffiTypeForJsiArgument(argType);
    if (ffiType == nullptr) {
      signature->prepared = false;
      return false;
    }
    signature->ffiTypes.push_back(ffiType);
  }
  ffi_type* returnFfiType =
      signature->returnType.ffiType != nullptr ? signature->returnType.ffiType
                                               : &ffi_type_void;
  signature->prepared =
      ffi_prep_cif(&signature->cif, FFI_DEFAULT_ABI,
                   static_cast<unsigned int>(signature->ffiTypes.size()),
                   returnFfiType, signature->ffiTypes.data()) == FFI_OK;
  return signature->prepared;
}

bool unsupportedJsiType(const NativeApiJsiType& type) {
  if (type.kind == metagen::mdTypeStruct && type.aggregateInfo != nullptr &&
      type.aggregateInfo->ffi != nullptr) {
    return false;
  }
  return !type.supported || type.ffiType == nullptr;
}

bool signatureSupportedForJsiCallback(const NativeApiJsiSignature& signature) {
  if (!signature.prepared || signature.variadic ||
      unsupportedJsiType(signature.returnType)) {
    return false;
  }
  for (const auto& argType : signature.argumentTypes) {
    if (unsupportedJsiType(argType)) {
      return false;
    }
  }
  return true;
}

std::shared_ptr<NativeApiJsiCallback> createJsiCallback(
    Runtime& runtime, const std::shared_ptr<NativeApiJsiBridge>& bridge,
    const NativeApiJsiType& type, Function function, bool block,
    NativeApiJsiCallbackThreadPolicy threadPolicy =
        NativeApiJsiCallbackThreadPolicy::Default) {
  if (bridge == nullptr || bridge->metadata() == nullptr ||
      type.signatureOffset == MD_SECTION_OFFSET_NULL) {
    throw facebook::jsi::JSError(
        runtime, "Native callback metadata is unavailable.");
  }

  auto parsed = parseMetadataJsiSignature(
      bridge->metadata(), type.signatureOffset, block ? 1 : 0, bridge.get());
  if (!parsed || !signatureSupportedForJsiCallback(*parsed)) {
    throw facebook::jsi::JSError(
        runtime, "Native callback signature is not supported by pure JSI.");
  }

  auto signature =
      std::make_shared<NativeApiJsiSignature>(std::move(*parsed));
  auto callback = std::make_shared<NativeApiJsiCallback>(
      runtime, bridge, std::move(signature), std::move(function), block,
      threadPolicy);
  if (!block) {
    bridge->retainJsiLifetime(callback);
  }
  return callback;
}

std::shared_ptr<NativeApiJsiCallback> createJsiMethodCallback(
    Runtime& runtime, const std::shared_ptr<NativeApiJsiBridge>& bridge,
    const std::string& selectorName, MDSectionOffset signatureOffset,
    Function function, bool returnOwned) {
  if (bridge == nullptr || bridge->metadata() == nullptr ||
      signatureOffset == MD_SECTION_OFFSET_NULL) {
    throw facebook::jsi::JSError(
        runtime, "Native method callback metadata is unavailable.");
  }

  auto parsed = parseMetadataJsiSignature(
      bridge->metadata(), signatureOffset, 2, bridge.get(), returnOwned);
  if (!parsed || !signatureSupportedForJsiCallback(*parsed)) {
    throw facebook::jsi::JSError(
        runtime, "Native method callback signature is not supported by pure JSI.");
  }
  parsed->selectorName = selectorName;

  auto signature =
      std::make_shared<NativeApiJsiSignature>(std::move(*parsed));
  auto callback = std::make_shared<NativeApiJsiCallback>(
      runtime, bridge, std::move(signature), std::move(function), false,
      NativeApiJsiCallbackThreadPolicy::Default, true);
  bridge->retainJsiLifetime(callback);
  return callback;
}

std::shared_ptr<NativeApiJsiCallback> createJsiMethodCallback(
    Runtime& runtime, const std::shared_ptr<NativeApiJsiBridge>& bridge,
    const std::string& selectorName, NativeApiJsiSignature signature,
    Function function) {
  signature.selectorName = selectorName;
  prepareJsiMethodSignature(&signature);
  if (!signatureSupportedForJsiCallback(signature)) {
    throw facebook::jsi::JSError(
        runtime, "Native method callback signature is not supported by pure JSI.");
  }

  auto sharedSignature =
      std::make_shared<NativeApiJsiSignature>(std::move(signature));
  auto callback = std::make_shared<NativeApiJsiCallback>(
      runtime, bridge, std::move(sharedSignature), std::move(function), false,
      NativeApiJsiCallbackThreadPolicy::Default, true);
  bridge->retainJsiLifetime(callback);
  return callback;
}

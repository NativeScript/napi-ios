#include "NativeApiV8.h"

#ifdef TARGET_ENGINE_V8

#import <Foundation/Foundation.h>
#include <dispatch/dispatch.h>
#include <dlfcn.h>
#include <mach-o/dyld.h>
#include <mach-o/getsect.h>
#include <objc/message.h>
#include <objc/runtime.h>

#include <algorithm>
#include <atomic>
#include <cctype>
#include <cmath>
#include <cstdio>
#include <cstdint>
#include <cstdlib>
#include <cstring>
#include <limits>
#include <memory>
#include <mutex>
#include <optional>
#include <stdexcept>
#include <string>
#include <thread>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>

#include "ffi.h"
#include "Metadata.h"
#include "MetadataReader.h"

@protocol NativeApiJsiClassBuilderProtocol
@end

#ifdef EMBED_METADATA_SIZE
extern const unsigned char embedded_metadata[EMBED_METADATA_SIZE];
#endif

namespace facebook {
namespace jsi {

class Runtime;
class Value;
class Object;
class Function;
class Array;
class String;
class BigInt;
class ArrayBuffer;

class JSError : public std::runtime_error {
 public:
  JSError(Runtime&, const std::string& message) : std::runtime_error(message) {}
  explicit JSError(const std::string& message) : std::runtime_error(message) {}
};

class StringBuffer {
 public:
  explicit StringBuffer(std::string value) : value_(std::move(value)) {}
  const char* data() const { return value_.data(); }
  size_t size() const { return value_.size(); }

 private:
  std::string value_;
};

class MutableBuffer {
 public:
  virtual ~MutableBuffer() = default;
  virtual size_t size() const = 0;
  virtual uint8_t* data() = 0;
};

class PropNameID {
 public:
  PropNameID() = default;
  explicit PropNameID(std::string value) : value_(std::move(value)) {}

  static PropNameID forAscii(Runtime&, const char* value) {
    return PropNameID(value != nullptr ? value : "");
  }

  static PropNameID forAscii(Runtime&, const std::string& value) {
    return PropNameID(value);
  }

  std::string utf8(Runtime&) const { return value_; }

 private:
  std::string value_;
};

class HostObject {
 public:
  virtual ~HostObject() = default;
  virtual Value get(Runtime& runtime, const PropNameID& name);
  virtual void set(Runtime& runtime, const PropNameID& name, const Value& value);
  virtual std::vector<PropNameID> getPropertyNames(Runtime& runtime);
};

using HostFunctionType =
    std::function<Value(Runtime&, const Value&, const Value*, size_t)>;

namespace v8direct {

struct RuntimeState {
  explicit RuntimeState(v8::Isolate* isolate,
                        v8::Local<v8::Context> context)
      : isolate(isolate) {
    this->context.Reset(isolate, context);
  }

  ~RuntimeState() { context.Reset(); }

  v8::Local<v8::Context> localContext() const {
    return context.Get(isolate);
  }

  v8::Isolate* isolate = nullptr;
  v8::Global<v8::Context> context;
  v8::Global<v8::ObjectTemplate> hostObjectTemplate;
  std::vector<std::shared_ptr<void>> retainedNativeData;
};

struct ValueStorage {
  enum class Kind {
    Undefined,
    Null,
    Bool,
    Number,
    V8,
  };

  explicit ValueStorage(Kind kind) : kind(kind) {}

  ~ValueStorage() { value.Reset(); }

  Kind kind = Kind::Undefined;
  bool boolValue = false;
  double numberValue = 0;
  v8::Global<v8::Value> value;
};

template <typename T>
const void* hostObjectTypeToken() {
  static int token = 0;
  return &token;
}

struct HostObjectHolder {
  HostObjectHolder(std::shared_ptr<RuntimeState> state,
                   std::shared_ptr<HostObject> hostObject,
                   const void* typeToken)
      : state(std::move(state)),
        hostObject(std::move(hostObject)),
        typeToken(typeToken) {}

  ~HostObjectHolder() {
    object.Reset();
  }

  std::shared_ptr<RuntimeState> state;
  std::shared_ptr<HostObject> hostObject;
  const void* typeToken = nullptr;
  v8::Global<v8::Object> object;
};

struct FunctionHolder {
  FunctionHolder(std::shared_ptr<RuntimeState> state, HostFunctionType callback)
      : state(std::move(state)), callback(std::move(callback)) {}

  ~FunctionHolder() { function.Reset(); }

  std::shared_ptr<RuntimeState> state;
  HostFunctionType callback;
  v8::Global<v8::Function> function;
};

struct ArrayBufferHolder {
  explicit ArrayBufferHolder(std::shared_ptr<MutableBuffer> buffer)
      : buffer(std::move(buffer)) {}

  std::shared_ptr<MutableBuffer> buffer;
  v8::Global<v8::ArrayBuffer> object;
};

inline v8::Local<v8::String> makeV8String(v8::Isolate* isolate,
                                          const std::string& value) {
  return v8::String::NewFromUtf8(isolate, value.c_str(),
                                 v8::NewStringType::kNormal,
                                 static_cast<int>(value.size()))
      .ToLocalChecked();
}

inline std::string toUtf8(v8::Isolate* isolate, v8::Local<v8::Value> value) {
  if (value.IsEmpty()) {
    return {};
  }
  v8::String::Utf8Value utf8(isolate, value);
  return *utf8 != nullptr ? std::string(*utf8, utf8.length()) : std::string();
}

inline std::string propertyNameToUtf8(v8::Isolate* isolate,
                                      v8::Local<v8::Name> property) {
  if (property->IsSymbol() &&
      property.As<v8::Value>()->StrictEquals(
          v8::Symbol::GetIterator(isolate))) {
    return "Symbol.iterator";
  }
  return toUtf8(isolate, property);
}

inline std::string currentExceptionMessage(v8::Isolate* isolate,
                                           v8::TryCatch& tryCatch) {
  if (tryCatch.HasCaught()) {
    return toUtf8(isolate, tryCatch.Exception());
  }
  return "NativeScript direct V8 operation failed.";
}

inline void throwV8Exception(v8::Isolate* isolate,
                             const std::exception& exception) {
  isolate->ThrowException(
      v8::Exception::Error(makeV8String(isolate, exception.what())));
}

}  // namespace v8direct

class Runtime {
 public:
  Runtime(v8::Isolate* isolate, v8::Local<v8::Context> context)
      : state_(std::make_shared<v8direct::RuntimeState>(isolate, context)) {}

  explicit Runtime(std::shared_ptr<v8direct::RuntimeState> state)
      : state_(std::move(state)) {}

  v8::Isolate* isolate() const { return state_->isolate; }
  v8::Local<v8::Context> context() const { return state_->localContext(); }
  std::shared_ptr<v8direct::RuntimeState> state() const { return state_; }

  Object global();

  Value evaluateJavaScript(std::shared_ptr<StringBuffer> buffer,
                           const std::string& sourceURL);

  void drainMicrotasks() {
    isolate()->PerformMicrotaskCheckpoint();
  }

 private:
  std::shared_ptr<v8direct::RuntimeState> state_;
};

class String {
 public:
  String() = default;
  String(Runtime& runtime, v8::Local<v8::String> value);

  static String createFromUtf8(Runtime& runtime, const char* value) {
    return String(runtime,
                  v8direct::makeV8String(runtime.isolate(),
                                         value != nullptr ? value : ""));
  }

  static String createFromUtf8(Runtime& runtime, const std::string& value) {
    return String(runtime, v8direct::makeV8String(runtime.isolate(), value));
  }

  static String createFromUtf8(Runtime& runtime, const uint8_t* value,
                               size_t length) {
    return String(runtime,
                  v8::String::NewFromUtf8(
                      runtime.isolate(),
                      reinterpret_cast<const char*>(value != nullptr ? value : reinterpret_cast<const uint8_t*>("")),
                      v8::NewStringType::kNormal,
                      static_cast<int>(length))
                      .ToLocalChecked());
  }

  std::string utf8(Runtime& runtime) const {
    return v8direct::toUtf8(runtime.isolate(), local(runtime));
  }

  v8::Local<v8::String> local(Runtime& runtime) const {
    return storage_->value.Get(runtime.isolate()).As<v8::String>();
  }

  operator Value() const;

 private:
  friend class Value;
  std::shared_ptr<v8direct::ValueStorage> storage_;
};

class Value {
 public:
  Value() : storage_(std::make_shared<v8direct::ValueStorage>(
                v8direct::ValueStorage::Kind::Undefined)) {}

  Value(bool value)
      : storage_(std::make_shared<v8direct::ValueStorage>(
            v8direct::ValueStorage::Kind::Bool)) {
    storage_->boolValue = value;
  }

  Value(double value)
      : storage_(std::make_shared<v8direct::ValueStorage>(
            v8direct::ValueStorage::Kind::Number)) {
    storage_->numberValue = value;
  }

  Value(int value) : Value(static_cast<double>(value)) {}
  Value(uint32_t value) : Value(static_cast<double>(value)) {}

  Value(Runtime& runtime, const Value& value) : storage_(value.storage_) {}
  Value(Runtime& runtime, Value&& value) : storage_(std::move(value.storage_)) {}
  Value(Runtime& runtime, const String& value) : storage_(value.storage_) {}
  Value(Runtime& runtime, const Object& object);
  Value(Runtime& runtime, const Function& function);
  Value(Runtime& runtime, const Array& array);
  Value(Runtime& runtime, const ArrayBuffer& arrayBuffer);
  Value(Runtime& runtime, const BigInt& bigint);

  static Value undefined() { return Value(); }

  static Value null() {
    Value value;
    value.storage_ = std::make_shared<v8direct::ValueStorage>(
        v8direct::ValueStorage::Kind::Null);
    return value;
  }

  bool isUndefined() const;
  bool isNull() const;
  bool isBool() const;
  bool getBool() const;
  bool isNumber() const;
  double getNumber() const;

  bool isObject() const;
  bool isString() const;
  bool isBigInt() const;
  bool isSymbol() const;

  Object asObject(Runtime& runtime) const;
  String asString(Runtime& runtime) const;
  BigInt getBigInt(Runtime& runtime) const;

  v8::Local<v8::Value> local(Runtime& runtime) const {
    v8::Isolate* isolate = runtime.isolate();
    switch (storage_->kind) {
      case v8direct::ValueStorage::Kind::Undefined:
        return v8::Undefined(isolate);
      case v8direct::ValueStorage::Kind::Null:
        return v8::Null(isolate);
      case v8direct::ValueStorage::Kind::Bool:
        return v8::Boolean::New(isolate, storage_->boolValue);
      case v8direct::ValueStorage::Kind::Number:
        return v8::Number::New(isolate, storage_->numberValue);
      case v8direct::ValueStorage::Kind::V8:
        return storage_->value.Get(isolate);
    }
  }

  Value(Runtime& runtime, v8::Local<v8::Value> value)
      : storage_(std::make_shared<v8direct::ValueStorage>(
            v8direct::ValueStorage::Kind::V8)) {
    storage_->value.Reset(runtime.isolate(), value);
  }

 private:
  friend class Runtime;
  friend class Object;
  friend class String;
  friend class BigInt;
  friend class ArrayBuffer;
  friend class Function;
  friend class Array;

  std::shared_ptr<v8direct::ValueStorage> storage_;
};

class Object {
 public:
  Object() = default;
  explicit Object(Runtime& runtime)
      : storage_(std::make_shared<v8direct::ValueStorage>(
            v8direct::ValueStorage::Kind::V8)) {
    storage_->value.Reset(runtime.isolate(), v8::Object::New(runtime.isolate()));
  }

  static Object fromValueStorage(std::shared_ptr<v8direct::ValueStorage> storage) {
    Object object;
    object.storage_ = std::move(storage);
    return object;
  }

  template <typename T>
  static Object createFromHostObject(Runtime& runtime, std::shared_ptr<T> host) {
    auto baseHost = std::static_pointer_cast<HostObject>(std::move(host));
    return createFromHostObjectWithToken(
        runtime, std::move(baseHost),
        v8direct::hostObjectTypeToken<T>());
  }

  Value getProperty(Runtime& runtime, const char* name) const {
    return getProperty(runtime, v8direct::makeV8String(runtime.isolate(),
                                                      name != nullptr ? name : ""));
  }

  Value getProperty(Runtime& runtime, const std::string& name) const {
    return getProperty(runtime, name.c_str());
  }

  Value getProperty(Runtime& runtime, const Value& key) const {
    return getProperty(runtime, key.local(runtime));
  }

  Value getProperty(Runtime& runtime, v8::Local<v8::Value> key) const {
    v8::TryCatch tryCatch(runtime.isolate());
    v8::Local<v8::Value> result;
    if (!local(runtime)->Get(runtime.context(), key).ToLocal(&result)) {
      throw JSError(runtime,
                    v8direct::currentExceptionMessage(runtime.isolate(), tryCatch));
    }
    return Value(runtime, result);
  }

  Object getPropertyAsObject(Runtime& runtime, const char* name) const {
    return getProperty(runtime, name).asObject(runtime);
  }

  Function getPropertyAsFunction(Runtime& runtime, const char* name) const;

  void setProperty(Runtime& runtime, const char* name, const Value& value) {
    setProperty(runtime,
                v8direct::makeV8String(runtime.isolate(), name != nullptr ? name : ""),
                value);
  }

  void setProperty(Runtime& runtime, const char* name, const String& value) {
    setProperty(runtime, name, Value(runtime, value));
  }

  void setProperty(Runtime& runtime, const char* name, const Object& value) {
    setProperty(runtime, name, Value(runtime, value));
  }

  void setProperty(Runtime& runtime, const char* name, const Function& value);
  void setProperty(Runtime& runtime, const char* name, const Array& value);
  void setProperty(Runtime& runtime, const char* name, const ArrayBuffer& value);
  void setProperty(Runtime& runtime, const char* name, bool value) {
    setProperty(runtime, name, Value(value));
  }
  void setProperty(Runtime& runtime, const char* name, double value) {
    setProperty(runtime, name, Value(value));
  }

  void setProperty(Runtime& runtime, const std::string& name, const Value& value) {
    setProperty(runtime, name.c_str(), value);
  }

  void setProperty(Runtime& runtime, const Value& key, const Value& value) {
    setProperty(runtime, key.local(runtime), value);
  }

  void setProperty(Runtime& runtime, v8::Local<v8::Value> key,
                   const Value& value) {
    v8::TryCatch tryCatch(runtime.isolate());
    if (!local(runtime)->Set(runtime.context(), key, value.local(runtime))
             .FromMaybe(false)) {
      throw JSError(runtime,
                    v8direct::currentExceptionMessage(runtime.isolate(), tryCatch));
    }
  }

  bool hasProperty(Runtime& runtime, const char* name) const {
    v8::TryCatch tryCatch(runtime.isolate());
    return local(runtime)
        ->Has(runtime.context(),
              v8direct::makeV8String(runtime.isolate(),
                                     name != nullptr ? name : ""))
        .FromMaybe(false);
  }

  bool isFunction(Runtime& runtime) const { return local(runtime)->IsFunction(); }
  bool isArray(Runtime& runtime) const { return local(runtime)->IsArray(); }
  bool isArrayBuffer(Runtime& runtime) const {
    return local(runtime)->IsArrayBuffer();
  }

  Function asFunction(Runtime& runtime) const;
  Array getArray(Runtime& runtime) const;
  ArrayBuffer getArrayBuffer(Runtime& runtime) const;
  Array getPropertyNames(Runtime& runtime) const;

  template <typename T>
  bool isHostObject(Runtime& runtime) const {
    auto holder = hostObjectHolder(runtime);
    return holder != nullptr &&
           holder->typeToken == v8direct::hostObjectTypeToken<T>();
  }

  template <typename T>
  std::shared_ptr<T> getHostObject(Runtime& runtime) const {
    auto holder = hostObjectHolder(runtime);
    if (holder == nullptr ||
        holder->typeToken != v8direct::hostObjectTypeToken<T>()) {
      return nullptr;
    }
    return std::static_pointer_cast<T>(holder->hostObject);
  }

  v8::Local<v8::Object> local(Runtime& runtime) const {
    return storage_->value.Get(runtime.isolate()).As<v8::Object>();
  }

  operator Value() const {
    Value value;
    value.storage_ = storage_;
    return value;
  }

 protected:
  friend class Value;
  friend class Runtime;
  friend class Function;
  friend class Array;
  friend class ArrayBuffer;

  explicit Object(std::shared_ptr<v8direct::ValueStorage> storage)
      : storage_(std::move(storage)) {}

  static Object createFromHostObjectWithToken(Runtime& runtime,
                                              std::shared_ptr<HostObject> host,
                                              const void* typeToken);

  v8direct::HostObjectHolder* hostObjectHolder(Runtime& runtime) const {
    v8::Local<v8::Object> object = local(runtime);
    if (object->InternalFieldCount() < 1) {
      return nullptr;
    }
    return static_cast<v8direct::HostObjectHolder*>(
        object->GetAlignedPointerFromInternalField(0));
  }

  std::shared_ptr<v8direct::ValueStorage> storage_;
};

class Function : public Object {
 public:
  Function() = default;
  explicit Function(Object object) : Object(std::move(object.storage_)) {}

  static Function createFromHostFunction(Runtime& runtime,
                                         const PropNameID& name,
                                         unsigned int,
                                         HostFunctionType callback);

  Value call(Runtime& runtime, const Value* args, size_t count) const {
    v8::TryCatch tryCatch(runtime.isolate());
    std::vector<v8::Local<v8::Value>> argv;
    argv.reserve(count);
    for (size_t i = 0; i < count; i++) {
      argv.push_back(args[i].local(runtime));
    }
    v8::Local<v8::Value> result;
    if (!local(runtime)
             .As<v8::Function>()
             ->Call(runtime.context(), runtime.context()->Global(),
                    static_cast<int>(argv.size()), argv.data())
             .ToLocal(&result)) {
      throw JSError(runtime,
                    v8direct::currentExceptionMessage(runtime.isolate(), tryCatch));
    }
    return Value(runtime, result);
  }

  Value call(Runtime& runtime) const {
    return call(runtime, static_cast<const Value*>(nullptr), 0);
  }

  Value call(Runtime& runtime, std::nullptr_t, size_t) const {
    return call(runtime, static_cast<const Value*>(nullptr), 0);
  }

  template <size_t N>
  Value call(Runtime& runtime, const Value (&args)[N], size_t count) const {
    return call(runtime, static_cast<const Value*>(args), count);
  }

  template <typename... Args>
  Value call(Runtime& runtime, Args&&... args) const {
    Value argv[] = {Value(runtime, std::forward<Args>(args))...};
    return call(runtime, static_cast<const Value*>(argv), sizeof...(Args));
  }

  Value callWithThis(Runtime& runtime, const Object& thisObject,
                     const Value* args = nullptr, size_t count = 0) const {
    v8::TryCatch tryCatch(runtime.isolate());
    std::vector<v8::Local<v8::Value>> argv;
    argv.reserve(count);
    for (size_t i = 0; i < count; i++) {
      argv.push_back(args[i].local(runtime));
    }
    v8::Local<v8::Value> result;
    if (!local(runtime)
             .As<v8::Function>()
             ->Call(runtime.context(), thisObject.local(runtime),
                    static_cast<int>(argv.size()), argv.data())
             .ToLocal(&result)) {
      throw JSError(runtime,
                    v8direct::currentExceptionMessage(runtime.isolate(), tryCatch));
    }
    return Value(runtime, result);
  }

  Value callAsConstructor(Runtime& runtime, const Value* args,
                          size_t count) const {
    v8::TryCatch tryCatch(runtime.isolate());
    std::vector<v8::Local<v8::Value>> argv;
    argv.reserve(count);
    for (size_t i = 0; i < count; i++) {
      argv.push_back(args[i].local(runtime));
    }
    v8::Local<v8::Value> result;
    if (!local(runtime)
             .As<v8::Function>()
             ->NewInstance(runtime.context(), static_cast<int>(argv.size()),
                           argv.data())
             .ToLocal(&result)) {
      throw JSError(runtime,
                    v8direct::currentExceptionMessage(runtime.isolate(), tryCatch));
    }
    return Value(runtime, result);
  }

  Value callAsConstructor(Runtime& runtime, std::nullptr_t, size_t) const {
    return callAsConstructor(runtime, static_cast<const Value*>(nullptr), 0);
  }

  template <size_t N>
  Value callAsConstructor(Runtime& runtime, const Value (&args)[N],
                          size_t count) const {
    return callAsConstructor(runtime, static_cast<const Value*>(args), count);
  }

  template <typename... Args>
  Value callAsConstructor(Runtime& runtime, Args&&... args) const {
    Value argv[] = {Value(runtime, std::forward<Args>(args))...};
    return callAsConstructor(runtime, static_cast<const Value*>(argv),
                             sizeof...(Args));
  }

  operator Value() const {
    Value value;
    value.storage_ = storage_;
    return value;
  }
};

class Array : public Object {
 public:
  explicit Array(Runtime& runtime, size_t size)
      : Object(std::make_shared<v8direct::ValueStorage>(
            v8direct::ValueStorage::Kind::V8)) {
    storage_->value.Reset(
        runtime.isolate(),
        v8::Array::New(runtime.isolate(), static_cast<int>(size)));
  }

  explicit Array(Object object) : Object(std::move(object.storage_)) {}

  size_t size(Runtime& runtime) const {
    return local(runtime).As<v8::Array>()->Length();
  }

  Value getValueAtIndex(Runtime& runtime, size_t index) const {
    v8::TryCatch tryCatch(runtime.isolate());
    v8::Local<v8::Value> result;
    if (!local(runtime)
             ->Get(runtime.context(), static_cast<uint32_t>(index))
             .ToLocal(&result)) {
      throw JSError(runtime,
                    v8direct::currentExceptionMessage(runtime.isolate(), tryCatch));
    }
    return Value(runtime, result);
  }

  void setValueAtIndex(Runtime& runtime, size_t index, const Value& value) {
    v8::TryCatch tryCatch(runtime.isolate());
    if (!local(runtime)
             ->Set(runtime.context(), static_cast<uint32_t>(index),
                   value.local(runtime))
             .FromMaybe(false)) {
      throw JSError(runtime,
                    v8direct::currentExceptionMessage(runtime.isolate(), tryCatch));
    }
  }

  void setValueAtIndex(Runtime& runtime, size_t index, const String& value) {
    setValueAtIndex(runtime, index, Value(runtime, value));
  }

  operator Value() const {
    Value value;
    value.storage_ = storage_;
    return value;
  }
};

class BigInt {
 public:
  BigInt() = default;
  BigInt(Runtime& runtime, v8::Local<v8::BigInt> value)
      : storage_(std::make_shared<v8direct::ValueStorage>(
            v8direct::ValueStorage::Kind::V8)) {
    storage_->value.Reset(runtime.isolate(), value);
  }

  static BigInt fromInt64(Runtime& runtime, int64_t value) {
    return BigInt(runtime, v8::BigInt::New(runtime.isolate(), value));
  }

  static BigInt fromUint64(Runtime& runtime, uint64_t value) {
    return BigInt(runtime, v8::BigInt::NewFromUnsigned(runtime.isolate(), value));
  }

  String toString(Runtime& runtime, int radix) const {
    v8::TryCatch tryCatch(runtime.isolate());
    v8::Local<v8::String> result;
    (void)radix;
    if (!local(runtime)->ToString(runtime.context()).ToLocal(&result)) {
      throw JSError(runtime,
                    v8direct::currentExceptionMessage(runtime.isolate(), tryCatch));
    }
    return String(runtime, result);
  }

  v8::Local<v8::BigInt> local(Runtime& runtime) const {
    return storage_->value.Get(runtime.isolate()).As<v8::BigInt>();
  }

  operator Value() const {
    Value value;
    value.storage_ = storage_;
    return value;
  }

 private:
  friend class Value;
  std::shared_ptr<v8direct::ValueStorage> storage_;
};

class ArrayBuffer : public Object {
 public:
  ArrayBuffer(Runtime& runtime, std::shared_ptr<MutableBuffer> buffer)
      : Object(std::make_shared<v8direct::ValueStorage>(
            v8direct::ValueStorage::Kind::V8)) {
    auto holder = new v8direct::ArrayBufferHolder(std::move(buffer));
    auto backingStore = v8::ArrayBuffer::NewBackingStore(
        holder->buffer->data(), holder->buffer->size(),
        [](void*, size_t, void* deleterData) {
          auto* holder = static_cast<v8direct::ArrayBufferHolder*>(deleterData);
          holder->object.Reset();
          delete holder;
        },
        holder);
    v8::Local<v8::ArrayBuffer> arrayBuffer =
        v8::ArrayBuffer::New(runtime.isolate(), std::move(backingStore));
    storage_->value.Reset(runtime.isolate(), arrayBuffer);
    holder->object.Reset(runtime.isolate(), arrayBuffer);
  }

  explicit ArrayBuffer(Object object) : Object(std::move(object.storage_)) {}

  size_t size(Runtime& runtime) const {
    return local(runtime).As<v8::ArrayBuffer>()->ByteLength();
  }

  uint8_t* data(Runtime& runtime) const {
    auto backingStore = local(runtime).As<v8::ArrayBuffer>()->GetBackingStore();
    return static_cast<uint8_t*>(backingStore->Data());
  }

  operator Value() const {
    Value value;
    value.storage_ = storage_;
    return value;
  }
};

inline Value HostObject::get(Runtime&, const PropNameID&) {
  return Value::undefined();
}

inline void HostObject::set(Runtime&, const PropNameID&, const Value&) {}

inline std::vector<PropNameID> HostObject::getPropertyNames(Runtime&) {
  return {};
}

inline String::String(Runtime& runtime, v8::Local<v8::String> value)
    : storage_(std::make_shared<v8direct::ValueStorage>(
          v8direct::ValueStorage::Kind::V8)) {
  storage_->value.Reset(runtime.isolate(), value);
}

inline String::operator Value() const {
  Value value;
  value.storage_ = storage_;
  return value;
}

inline Value::Value(Runtime&, const Object& object) : storage_(object.storage_) {}
inline Value::Value(Runtime&, const Function& function)
    : storage_(function.storage_) {}
inline Value::Value(Runtime&, const Array& array) : storage_(array.storage_) {}
inline Value::Value(Runtime&, const ArrayBuffer& arrayBuffer)
    : storage_(arrayBuffer.storage_) {}
inline Value::Value(Runtime&, const BigInt& bigint) : storage_(bigint.storage_) {}

inline bool Value::isObject() const {
  if (storage_->kind != v8direct::ValueStorage::Kind::V8 ||
      storage_->value.IsEmpty()) {
    return false;
  }
  v8::Isolate* isolate = v8::Isolate::GetCurrent();
  return isolate != nullptr && storage_->value.Get(isolate)->IsObject();
}

inline bool Value::isUndefined() const {
  if (storage_->kind == v8direct::ValueStorage::Kind::Undefined) {
    return true;
  }
  if (storage_->kind != v8direct::ValueStorage::Kind::V8 ||
      storage_->value.IsEmpty()) {
    return false;
  }
  v8::Isolate* isolate = v8::Isolate::GetCurrent();
  return isolate != nullptr && storage_->value.Get(isolate)->IsUndefined();
}

inline bool Value::isNull() const {
  if (storage_->kind == v8direct::ValueStorage::Kind::Null) {
    return true;
  }
  if (storage_->kind != v8direct::ValueStorage::Kind::V8 ||
      storage_->value.IsEmpty()) {
    return false;
  }
  v8::Isolate* isolate = v8::Isolate::GetCurrent();
  return isolate != nullptr && storage_->value.Get(isolate)->IsNull();
}

inline bool Value::isBool() const {
  if (storage_->kind == v8direct::ValueStorage::Kind::Bool) {
    return true;
  }
  if (storage_->kind != v8direct::ValueStorage::Kind::V8 ||
      storage_->value.IsEmpty()) {
    return false;
  }
  v8::Isolate* isolate = v8::Isolate::GetCurrent();
  return isolate != nullptr && storage_->value.Get(isolate)->IsBoolean();
}

inline bool Value::getBool() const {
  if (storage_->kind == v8direct::ValueStorage::Kind::Bool) {
    return storage_->boolValue;
  }
  if (storage_->kind == v8direct::ValueStorage::Kind::V8 &&
      !storage_->value.IsEmpty()) {
    v8::Isolate* isolate = v8::Isolate::GetCurrent();
    if (isolate != nullptr) {
      return storage_->value.Get(isolate)->BooleanValue(isolate);
    }
  }
  return false;
}

inline bool Value::isNumber() const {
  if (storage_->kind == v8direct::ValueStorage::Kind::Number) {
    return true;
  }
  if (storage_->kind != v8direct::ValueStorage::Kind::V8 ||
      storage_->value.IsEmpty()) {
    return false;
  }
  v8::Isolate* isolate = v8::Isolate::GetCurrent();
  return isolate != nullptr && storage_->value.Get(isolate)->IsNumber();
}

inline double Value::getNumber() const {
  if (storage_->kind == v8direct::ValueStorage::Kind::Number) {
    return storage_->numberValue;
  }
  if (storage_->kind == v8direct::ValueStorage::Kind::V8 &&
      !storage_->value.IsEmpty()) {
    v8::Isolate* isolate = v8::Isolate::GetCurrent();
    if (isolate != nullptr) {
      return storage_->value.Get(isolate)
          ->NumberValue(isolate->GetCurrentContext())
          .FromMaybe(0);
    }
  }
  return 0;
}

inline bool Value::isString() const {
  if (storage_->kind != v8direct::ValueStorage::Kind::V8 ||
      storage_->value.IsEmpty()) {
    return false;
  }
  v8::Isolate* isolate = v8::Isolate::GetCurrent();
  return storage_->value.Get(isolate)->IsString();
}

inline bool Value::isBigInt() const {
  if (storage_->kind != v8direct::ValueStorage::Kind::V8 ||
      storage_->value.IsEmpty()) {
    return false;
  }
  v8::Isolate* isolate = v8::Isolate::GetCurrent();
  return storage_->value.Get(isolate)->IsBigInt();
}

inline bool Value::isSymbol() const {
  if (storage_->kind != v8direct::ValueStorage::Kind::V8 ||
      storage_->value.IsEmpty()) {
    return false;
  }
  v8::Isolate* isolate = v8::Isolate::GetCurrent();
  return storage_->value.Get(isolate)->IsSymbol();
}

inline Object Value::asObject(Runtime& runtime) const {
  return Object::fromValueStorage(storage_);
}

inline String Value::asString(Runtime& runtime) const {
  return String(runtime, local(runtime).As<v8::String>());
}

inline BigInt Value::getBigInt(Runtime& runtime) const {
  return BigInt(runtime, local(runtime).As<v8::BigInt>());
}

inline Function Object::getPropertyAsFunction(Runtime& runtime,
                                              const char* name) const {
  return getProperty(runtime, name).asObject(runtime).asFunction(runtime);
}

inline Function Object::asFunction(Runtime& runtime) const {
  return Function(*this);
}

inline Array Object::getArray(Runtime& runtime) const {
  return Array(*this);
}

inline ArrayBuffer Object::getArrayBuffer(Runtime& runtime) const {
  return ArrayBuffer(*this);
}

inline Array Object::getPropertyNames(Runtime& runtime) const {
  v8::TryCatch tryCatch(runtime.isolate());
  v8::Local<v8::Array> result;
    if (!local(runtime)->GetPropertyNames(runtime.context()).ToLocal(&result)) {
    throw JSError(runtime,
                  v8direct::currentExceptionMessage(runtime.isolate(), tryCatch));
  }
  return Array(Object::fromValueStorage(Value(runtime, result).storage_));
}

inline void Object::setProperty(Runtime& runtime, const char* name,
                                const Function& value) {
  setProperty(runtime, name, Value(runtime, value));
}

inline void Object::setProperty(Runtime& runtime, const char* name,
                                const Array& value) {
  setProperty(runtime, name, Value(runtime, value));
}

inline void Object::setProperty(Runtime& runtime, const char* name,
                                const ArrayBuffer& value) {
  setProperty(runtime, name, Value(runtime, value));
}

namespace v8direct {

inline Value valueFromLocal(Runtime& runtime, v8::Local<v8::Value> value) {
  return Value(runtime, value);
}

inline v8::Local<v8::ObjectTemplate> hostObjectTemplate(Runtime& runtime) {
  auto state = runtime.state();
  if (state->hostObjectTemplate.IsEmpty()) {
    v8::Local<v8::ObjectTemplate> objectTemplate =
        v8::ObjectTemplate::New(runtime.isolate());
    objectTemplate->SetInternalFieldCount(1);
    objectTemplate->SetHandler(v8::NamedPropertyHandlerConfiguration(
        [](v8::Local<v8::Name> property,
           const v8::PropertyCallbackInfo<v8::Value>& info)
            -> v8::Intercepted {
          auto* holder = static_cast<HostObjectHolder*>(
              info.Holder()->GetAlignedPointerFromInternalField(0));
          if (holder == nullptr || holder->hostObject == nullptr) {
            return v8::Intercepted::kNo;
          }
          Runtime runtime(holder->state);
          try {
            Value result = holder->hostObject->get(
                runtime,
                PropNameID(propertyNameToUtf8(info.GetIsolate(), property)));
            if (!result.isUndefined()) {
              info.GetReturnValue().Set(result.local(runtime));
              return v8::Intercepted::kYes;
            }
          } catch (const std::exception& exception) {
            throwV8Exception(info.GetIsolate(), exception);
            return v8::Intercepted::kYes;
          }
          return v8::Intercepted::kNo;
        },
        [](v8::Local<v8::Name> property, v8::Local<v8::Value> value,
           const v8::PropertyCallbackInfo<void>& info)
            -> v8::Intercepted {
          auto* holder = static_cast<HostObjectHolder*>(
              info.Holder()->GetAlignedPointerFromInternalField(0));
          if (holder == nullptr || holder->hostObject == nullptr) {
            return v8::Intercepted::kNo;
          }
          Runtime runtime(holder->state);
          try {
            holder->hostObject->set(
                runtime,
                PropNameID(propertyNameToUtf8(info.GetIsolate(), property)),
                Value(runtime, value));
            return v8::Intercepted::kYes;
          } catch (const std::exception& exception) {
            throwV8Exception(info.GetIsolate(), exception);
            return v8::Intercepted::kYes;
          }
        },
        nullptr, nullptr,
        [](const v8::PropertyCallbackInfo<v8::Array>& info) {
          auto* holder = static_cast<HostObjectHolder*>(
              info.Holder()->GetAlignedPointerFromInternalField(0));
          if (holder == nullptr || holder->hostObject == nullptr) {
            return;
          }
          Runtime runtime(holder->state);
          try {
            auto propertyNames = holder->hostObject->getPropertyNames(runtime);
            v8::Local<v8::Array> result = v8::Array::New(
                info.GetIsolate(), static_cast<int>(propertyNames.size()));
            for (size_t i = 0; i < propertyNames.size(); i++) {
              std::string name = propertyNames[i].utf8(runtime);
              result
                  ->Set(runtime.context(), static_cast<uint32_t>(i),
                        makeV8String(info.GetIsolate(), name))
                  .FromMaybe(false);
            }
            info.GetReturnValue().Set(result);
          } catch (const std::exception& exception) {
            throwV8Exception(info.GetIsolate(), exception);
          }
        },
        v8::Local<v8::Value>(), v8::PropertyHandlerFlags::kNone));
    objectTemplate->SetHandler(v8::IndexedPropertyHandlerConfiguration(
        [](uint32_t index, const v8::PropertyCallbackInfo<v8::Value>& info)
            -> v8::Intercepted {
          auto* holder = static_cast<HostObjectHolder*>(
              info.Holder()->GetAlignedPointerFromInternalField(0));
          if (holder == nullptr || holder->hostObject == nullptr) {
            return v8::Intercepted::kNo;
          }
          Runtime runtime(holder->state);
          try {
            Value result = holder->hostObject->get(
                runtime, PropNameID(std::to_string(index)));
            if (!result.isUndefined()) {
              info.GetReturnValue().Set(result.local(runtime));
              return v8::Intercepted::kYes;
            }
          } catch (const std::exception& exception) {
            throwV8Exception(info.GetIsolate(), exception);
            return v8::Intercepted::kYes;
          }
          return v8::Intercepted::kNo;
        },
        [](uint32_t index, v8::Local<v8::Value> value,
           const v8::PropertyCallbackInfo<void>& info)
            -> v8::Intercepted {
          auto* holder = static_cast<HostObjectHolder*>(
              info.Holder()->GetAlignedPointerFromInternalField(0));
          if (holder == nullptr || holder->hostObject == nullptr) {
            return v8::Intercepted::kNo;
          }
          Runtime runtime(holder->state);
          try {
            holder->hostObject->set(runtime, PropNameID(std::to_string(index)),
                                    Value(runtime, value));
            return v8::Intercepted::kYes;
          } catch (const std::exception& exception) {
            throwV8Exception(info.GetIsolate(), exception);
            return v8::Intercepted::kYes;
          }
        },
        nullptr, nullptr, nullptr, v8::Local<v8::Value>(),
        v8::PropertyHandlerFlags::kNone));
    state->hostObjectTemplate.Reset(runtime.isolate(), objectTemplate);
  }
  return state->hostObjectTemplate.Get(runtime.isolate());
}

inline void hostObjectWeakCallback(
    const v8::WeakCallbackInfo<HostObjectHolder>& info) {
  delete info.GetParameter();
}

inline void functionWeakCallback(
    const v8::WeakCallbackInfo<FunctionHolder>& info) {
  delete info.GetParameter();
}

}  // namespace v8direct

inline Object Object::createFromHostObjectWithToken(
    Runtime& runtime, std::shared_ptr<HostObject> host, const void* typeToken) {
  v8::Local<v8::Object> object =
      v8direct::hostObjectTemplate(runtime)->NewInstance(runtime.context())
          .ToLocalChecked();
  auto* holder = new v8direct::HostObjectHolder(runtime.state(), std::move(host),
                                                typeToken);
  object->SetAlignedPointerInInternalField(0, holder);
  holder->object.Reset(runtime.isolate(), object);
  holder->object.SetWeak(holder, v8direct::hostObjectWeakCallback,
                         v8::WeakCallbackType::kParameter);
  return Object::fromValueStorage(Value(runtime, object).storage_);
}

inline Function Function::createFromHostFunction(Runtime& runtime,
                                                 const PropNameID& name,
                                                 unsigned int,
                                                 HostFunctionType callback) {
  auto* holder =
      new v8direct::FunctionHolder(runtime.state(), std::move(callback));
  v8::Local<v8::External> data = v8::External::New(runtime.isolate(), holder);
  v8::Local<v8::FunctionTemplate> functionTemplate = v8::FunctionTemplate::New(
      runtime.isolate(),
      [](const v8::FunctionCallbackInfo<v8::Value>& info) {
        auto* holder =
            static_cast<v8direct::FunctionHolder*>(
                info.Data().As<v8::External>()->Value());
        Runtime runtime(holder->state);
        std::vector<Value> args;
        args.reserve(info.Length());
        for (int i = 0; i < info.Length(); i++) {
          args.push_back(Value(runtime, info[i]));
        }
        try {
          Value thisValue(runtime, info.This());
          Value result = holder->callback(
              runtime, thisValue, args.empty() ? nullptr : args.data(),
              args.size());
          info.GetReturnValue().Set(result.local(runtime));
        } catch (const std::exception& exception) {
          v8direct::throwV8Exception(info.GetIsolate(), exception);
        }
      },
      data);
  v8::Local<v8::Function> function =
      functionTemplate->GetFunction(runtime.context()).ToLocalChecked();
  std::string functionName = name.utf8(runtime);
  if (!functionName.empty()) {
    function->SetName(v8direct::makeV8String(runtime.isolate(), functionName));
  }
  holder->function.Reset(runtime.isolate(), function);
  holder->function.SetWeak(holder, v8direct::functionWeakCallback,
                           v8::WeakCallbackType::kParameter);
  return Function(Object::fromValueStorage(Value(runtime, function).storage_));
}

inline Object Runtime::global() {
  return Object::fromValueStorage(Value(*this, context()->Global()).storage_);
}

inline Value Runtime::evaluateJavaScript(std::shared_ptr<StringBuffer> buffer,
                                         const std::string& sourceURL) {
  v8::TryCatch tryCatch(isolate());
  v8::Local<v8::String> source = v8::String::NewFromUtf8(
      isolate(), buffer != nullptr ? buffer->data() : "",
      v8::NewStringType::kNormal,
      buffer != nullptr ? static_cast<int>(buffer->size()) : 0)
                                      .ToLocalChecked();
  v8::Local<v8::String> resourceName = v8direct::makeV8String(isolate(), sourceURL);
  v8::ScriptOrigin origin(resourceName);
  v8::Local<v8::Script> script;
  if (!v8::Script::Compile(context(), source, &origin).ToLocal(&script)) {
    throw JSError(*this, v8direct::currentExceptionMessage(isolate(), tryCatch));
  }
  v8::Local<v8::Value> result;
  if (!script->Run(context()).ToLocal(&result)) {
    throw JSError(*this, v8direct::currentExceptionMessage(isolate(), tryCatch));
  }
  return Value(*this, result);
}

}  // namespace jsi
}  // namespace facebook

namespace nativescript {

using NativeApiJsiConfig = NativeApiDirectConfig;
using NativeApiJsiScheduler = NativeApiDirectScheduler;

namespace {

using facebook::jsi::Array;
using facebook::jsi::ArrayBuffer;
using facebook::jsi::BigInt;
using facebook::jsi::Function;
using facebook::jsi::HostObject;
using facebook::jsi::MutableBuffer;
using facebook::jsi::Object;
using facebook::jsi::PropNameID;
using facebook::jsi::Runtime;
using facebook::jsi::String;
using facebook::jsi::StringBuffer;
using facebook::jsi::Value;
using metagen::MDMemberFlag;
using metagen::MDMetadataReader;
using metagen::MDSectionOffset;
using metagen::MDTypeKind;

#include "../hermes/jsi/NativeApiJsiBridge.inc"

#define NATIVESCRIPT_NATIVE_API_HAS_ENGINE_LAZY_GLOBALS 1
#define NATIVESCRIPT_NATIVE_API_RETAIN_RUNTIME 1
#define NATIVESCRIPT_NATIVE_API_RUNTIME_SCOPE 1

struct NativeApiV8LazyGlobalData {
  NativeApiV8LazyGlobalData(v8::Isolate* isolate, const std::string& name,
                            const std::string& kind) {
    nameValue.Reset(isolate, facebook::jsi::v8direct::makeV8String(isolate, name));
    kindValue.Reset(isolate, facebook::jsi::v8direct::makeV8String(isolate, kind));
  }

  ~NativeApiV8LazyGlobalData() {
    nameValue.Reset();
    kindValue.Reset();
  }

  v8::Global<v8::String> nameValue;
  v8::Global<v8::String> kindValue;
};

std::shared_ptr<Runtime> retainNativeApiJsiRuntime(Runtime& runtime) {
  return std::make_shared<Runtime>(runtime.state());
}

class NativeApiJsiRuntimeScope final {
 public:
  explicit NativeApiJsiRuntimeScope(Runtime& runtime)
      : locker_(runtime.isolate()),
        isolateScope_(runtime.isolate()),
        handleScope_(runtime.isolate()),
        context_(runtime.context()),
        contextScope_(context_) {}

 private:
  v8::Locker locker_;
  v8::Isolate::Scope isolateScope_;
  v8::HandleScope handleScope_;
  v8::Local<v8::Context> context_;
  v8::Context::Scope contextScope_;
};

void NativeApiV8LazyGlobalGetter(
    v8::Local<v8::Name>, const v8::PropertyCallbackInfo<v8::Value>& info) {
  v8::Isolate* isolate = info.GetIsolate();
  v8::HandleScope handleScope(isolate);
  v8::Local<v8::Context> context = isolate->GetCurrentContext();
  if (!info.Data()->IsExternal()) {
    return;
  }

  auto* data = static_cast<NativeApiV8LazyGlobalData*>(
      info.Data().As<v8::External>()->Value());
  if (data == nullptr) {
    return;
  }
  v8::Local<v8::String> nameValue = data->nameValue.Get(isolate);
  v8::Local<v8::String> kindValue = data->kindValue.Get(isolate);

  v8::Local<v8::Object> global = context->Global();
  v8::Local<v8::Value> resolverValue;
  if (!global
           ->Get(context,
                 facebook::jsi::v8direct::makeV8String(
                     isolate, "__nativeScriptResolveNativeApiLazyGlobal"))
           .ToLocal(&resolverValue) ||
      !resolverValue->IsFunction()) {
    return;
  }

  v8::TryCatch tryCatch(isolate);
  v8::Local<v8::Value> args[] = {nameValue, kindValue};
  v8::Local<v8::Value> result;
  if (!resolverValue.As<v8::Function>()
           ->Call(context, global, 2, args)
           .ToLocal(&result)) {
    if (tryCatch.HasCaught()) {
      isolate->ThrowException(tryCatch.Exception());
    }
    return;
  }
  global->DefineOwnProperty(context, nameValue, result, v8::DontEnum)
      .FromMaybe(false);
  info.GetReturnValue().Set(result);
}

bool InstallNativeApiEngineLazyGlobal(
    Runtime& runtime, std::shared_ptr<NativeApiJsiBridge>,
    const std::string& name, const std::string& kind, bool force) {
  if (name.empty() || kind.empty()) {
    return false;
  }

  v8::Isolate* isolate = runtime.isolate();
  v8::EscapableHandleScope handleScope(isolate);
  v8::Local<v8::Context> context = runtime.context();
  v8::Local<v8::Object> global = context->Global();
  v8::Local<v8::String> property =
      facebook::jsi::v8direct::makeV8String(isolate, name);
  if (!force && global->HasOwnProperty(context, property).FromMaybe(false)) {
    return false;
  }

  auto data = std::make_shared<NativeApiV8LazyGlobalData>(isolate, name, kind);
  v8::Local<v8::External> external = v8::External::New(isolate, data.get());

  bool installed = global
      ->SetNativeDataProperty(context, property, NativeApiV8LazyGlobalGetter,
                              nullptr, external, v8::DontEnum)
      .FromMaybe(false);
  if (installed) {
    runtime.state()->retainedNativeData.push_back(std::move(data));
  }
  return installed;
}

#include "../hermes/jsi/NativeApiJsiHostObjects.inc"
#include "../hermes/jsi/NativeApiJsiCallbacks.inc"
#include "../hermes/jsi/NativeApiJsiConversion.inc"
#include "../hermes/jsi/NativeApiJsiInvocation.inc"
#include "../hermes/jsi/NativeApiJsiClassBuilder.inc"
#include "../hermes/jsi/NativeApiJsiHostObject.inc"

}  // namespace

#include "../hermes/jsi/NativeApiJsiInstall.inc"

void InstallNativeApiV8(v8::Isolate* isolate, v8::Local<v8::Context> context,
                        const NativeApiV8Config& config) {
  if (isolate == nullptr || context.IsEmpty()) {
    return;
  }
  v8::Locker locker(isolate);
  v8::Isolate::Scope isolateScope(isolate);
  v8::HandleScope handleScope(isolate);
  v8::Context::Scope contextScope(context);
  Runtime runtime(isolate, context);
  InstallNativeApiJSI(runtime, config);
}

}  // namespace nativescript

extern "C" void NativeScriptInstallNativeApiV8(v8::Isolate* isolate,
                                                v8::Local<v8::Context> context,
                                                const char* metadataPath) {
  nativescript::NativeApiV8Config config;
  config.metadataPath = metadataPath;
  nativescript::InstallNativeApiV8(isolate, context, config);
}

#endif  // TARGET_ENGINE_V8

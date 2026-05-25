#include "NativeApiQuickJS.h"

#ifdef TARGET_ENGINE_QUICKJS

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

namespace quickjsdirect {

template <typename T>
const void* hostObjectTypeToken() {
  static int token = 0;
  return &token;
}

struct RuntimeState {
  explicit RuntimeState(JSContext* context) : context(context) {}
  JSContext* context = nullptr;
  bool hostClassRegistered = false;
  bool functionClassRegistered = false;
};

static JSClassID gHostClassId = 0;
static JSClassID gFunctionClassId = 0;
static std::mutex gRuntimeStatesMutex;
static std::unordered_map<JSContext*, std::shared_ptr<RuntimeState>>
    gRuntimeStates;

inline std::shared_ptr<RuntimeState> stateForContext(JSContext* context) {
  std::lock_guard<std::mutex> lock(gRuntimeStatesMutex);
  auto it = gRuntimeStates.find(context);
  if (it != gRuntimeStates.end()) {
    return it->second;
  }
  auto state = std::make_shared<RuntimeState>(context);
  gRuntimeStates[context] = state;
  return state;
}

struct ValueStorage {
  enum class Kind {
    Undefined,
    Null,
    Bool,
    Number,
    QuickJS,
  };

  explicit ValueStorage(Kind kind) : kind(kind) {}
  ~ValueStorage() {
    if (context != nullptr && !JS_IsUninitialized(value)) {
      JS_FreeValue(context, value);
    }
  }

  Kind kind = Kind::Undefined;
  bool boolValue = false;
  double numberValue = 0;
  JSContext* context = nullptr;
  JSValue value = JS_UNINITIALIZED;
};

struct HostObjectHolder {
  HostObjectHolder(std::shared_ptr<RuntimeState> state,
                   std::shared_ptr<HostObject> hostObject,
                   const void* typeToken)
      : state(std::move(state)),
        hostObject(std::move(hostObject)),
        typeToken(typeToken) {}
  std::shared_ptr<RuntimeState> state;
  std::shared_ptr<HostObject> hostObject;
  const void* typeToken = nullptr;
};

struct FunctionHolder {
  FunctionHolder(std::shared_ptr<RuntimeState> state, HostFunctionType callback)
      : state(std::move(state)), callback(std::move(callback)) {}
  std::shared_ptr<RuntimeState> state;
  HostFunctionType callback;
};

struct ArrayBufferHolder {
  explicit ArrayBufferHolder(std::shared_ptr<MutableBuffer> buffer)
      : buffer(std::move(buffer)) {}
  std::shared_ptr<MutableBuffer> buffer;
};

inline std::string valueToUtf8(JSContext* context, JSValueConst value) {
  size_t length = 0;
  const char* cString = JS_ToCStringLen(context, &length, value);
  if (cString == nullptr) {
    return {};
  }
  std::string result(cString, length);
  JS_FreeCString(context, cString);
  return result;
}

inline std::string atomToUtf8(JSContext* context, JSAtom atom) {
  const char* cString = JS_AtomToCString(context, atom);
  if (cString == nullptr) {
    return {};
  }
  std::string result(cString);
  JS_FreeCString(context, cString);
  return result;
}

inline JSValue throwError(JSContext* context, const std::exception& error) {
  return JS_ThrowTypeError(context, "%s", error.what());
}

}  // namespace quickjsdirect

class Runtime {
 public:
  explicit Runtime(JSContext* context)
      : state_(quickjsdirect::stateForContext(context)) {}
  explicit Runtime(std::shared_ptr<quickjsdirect::RuntimeState> state)
      : state_(std::move(state)) {}
  JSContext* context() const { return state_->context; }
  std::shared_ptr<quickjsdirect::RuntimeState> state() const { return state_; }
  Object global();
  Value evaluateJavaScript(std::shared_ptr<StringBuffer> buffer,
                           const std::string& sourceURL);
  void drainMicrotasks() {
    JSContext* ctx = context();
    JSRuntime* rt = JS_GetRuntime(ctx);
    JSContext* jobCtx = nullptr;
    while (JS_ExecutePendingJob(rt, &jobCtx) > 0) {
    }
  }

 private:
  std::shared_ptr<quickjsdirect::RuntimeState> state_;
};

class String {
 public:
  String() = default;
  String(Runtime& runtime, JSValue value);
  static String createFromUtf8(Runtime& runtime, const char* value) {
    return String(runtime, JS_NewString(runtime.context(),
                                        value != nullptr ? value : ""));
  }
  static String createFromUtf8(Runtime& runtime, const std::string& value) {
    return String(runtime,
                  JS_NewStringLen(runtime.context(), value.data(), value.size()));
  }
  static String createFromUtf8(Runtime& runtime, const uint8_t* value,
                               size_t length) {
    return String(runtime,
                  JS_NewStringLen(runtime.context(),
                                  reinterpret_cast<const char*>(value), length));
  }
  std::string utf8(Runtime& runtime) const;
  JSValue local(Runtime& runtime) const;
  operator Value() const;

 private:
  friend class Value;
  std::shared_ptr<quickjsdirect::ValueStorage> storage_;
};

class Value {
 public:
  Value()
      : storage_(std::make_shared<quickjsdirect::ValueStorage>(
            quickjsdirect::ValueStorage::Kind::Undefined)) {}
  Value(bool value)
      : storage_(std::make_shared<quickjsdirect::ValueStorage>(
            quickjsdirect::ValueStorage::Kind::Bool)) {
    storage_->boolValue = value;
  }
  Value(double value)
      : storage_(std::make_shared<quickjsdirect::ValueStorage>(
            quickjsdirect::ValueStorage::Kind::Number)) {
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
  Value(Runtime& runtime, JSValue value)
      : storage_(std::make_shared<quickjsdirect::ValueStorage>(
            quickjsdirect::ValueStorage::Kind::QuickJS)) {
    storage_->context = runtime.context();
    storage_->value = JS_DupValue(runtime.context(), value);
  }

  static Value undefined() { return Value(); }
  static Value null() {
    Value value;
    value.storage_ = std::make_shared<quickjsdirect::ValueStorage>(
        quickjsdirect::ValueStorage::Kind::Null);
    return value;
  }
  bool isUndefined() const {
    return storage_->kind == quickjsdirect::ValueStorage::Kind::Undefined ||
           (storage_->kind == quickjsdirect::ValueStorage::Kind::QuickJS &&
            JS_IsUndefined(storage_->value));
  }
  bool isNull() const {
    return storage_->kind == quickjsdirect::ValueStorage::Kind::Null ||
           (storage_->kind == quickjsdirect::ValueStorage::Kind::QuickJS &&
            JS_IsNull(storage_->value));
  }
  bool isBool() const {
    return storage_->kind == quickjsdirect::ValueStorage::Kind::Bool ||
           (storage_->kind == quickjsdirect::ValueStorage::Kind::QuickJS &&
            JS_IsBool(storage_->value));
  }
  bool getBool() const {
    if (storage_->kind == quickjsdirect::ValueStorage::Kind::Bool) {
      return storage_->boolValue;
    }
    if (storage_->kind == quickjsdirect::ValueStorage::Kind::QuickJS) {
      return JS_ToBool(storage_->context, storage_->value) != 0;
    }
    return false;
  }
  bool isNumber() const {
    return storage_->kind == quickjsdirect::ValueStorage::Kind::Number ||
           (storage_->kind == quickjsdirect::ValueStorage::Kind::QuickJS &&
            JS_IsNumber(storage_->value));
  }
  double getNumber() const {
    if (storage_->kind == quickjsdirect::ValueStorage::Kind::Number) {
      return storage_->numberValue;
    }
    if (storage_->kind == quickjsdirect::ValueStorage::Kind::QuickJS) {
      double value = 0;
      JS_ToFloat64(storage_->context, &value, storage_->value);
      return value;
    }
    return 0;
  }
  bool isObject() const {
    return storage_->kind == quickjsdirect::ValueStorage::Kind::QuickJS &&
           JS_IsObject(storage_->value);
  }
  bool isString() const {
    return storage_->kind == quickjsdirect::ValueStorage::Kind::QuickJS &&
           JS_IsString(storage_->value);
  }
  bool isBigInt() const {
    return storage_->kind == quickjsdirect::ValueStorage::Kind::QuickJS &&
           JS_IsBigInt(storage_->context, storage_->value);
  }
  bool isSymbol() const {
    return storage_->kind == quickjsdirect::ValueStorage::Kind::QuickJS &&
           JS_IsSymbol(storage_->value);
  }

  Object asObject(Runtime& runtime) const;
  String asString(Runtime& runtime) const;
  BigInt getBigInt(Runtime& runtime) const;

  JSValue local(Runtime& runtime) const {
    switch (storage_->kind) {
      case quickjsdirect::ValueStorage::Kind::Undefined:
        return JS_UNDEFINED;
      case quickjsdirect::ValueStorage::Kind::Null:
        return JS_NULL;
      case quickjsdirect::ValueStorage::Kind::Bool:
        return JS_NewBool(runtime.context(), storage_->boolValue);
      case quickjsdirect::ValueStorage::Kind::Number:
        return JS_NewFloat64(runtime.context(), storage_->numberValue);
      case quickjsdirect::ValueStorage::Kind::QuickJS:
        return JS_DupValue(runtime.context(), storage_->value);
    }
  }

 private:
  friend class Runtime;
  friend class Object;
  friend class String;
  friend class BigInt;
  friend class ArrayBuffer;
  friend class Function;
  friend class Array;
  std::shared_ptr<quickjsdirect::ValueStorage> storage_;
};

class Object {
 public:
  Object() = default;
  explicit Object(Runtime& runtime)
      : storage_(std::make_shared<quickjsdirect::ValueStorage>(
            quickjsdirect::ValueStorage::Kind::QuickJS)) {
    storage_->context = runtime.context();
    storage_->value = JS_NewObject(runtime.context());
  }
  static Object fromValueStorage(
      std::shared_ptr<quickjsdirect::ValueStorage> storage) {
    Object object;
    object.storage_ = std::move(storage);
    return object;
  }
  template <typename T>
  static Object createFromHostObject(Runtime& runtime, std::shared_ptr<T> host) {
    auto baseHost = std::static_pointer_cast<HostObject>(std::move(host));
    return createFromHostObjectWithToken(
        runtime, std::move(baseHost),
        quickjsdirect::hostObjectTypeToken<T>());
  }

  Value getProperty(Runtime& runtime, const char* name) const {
    JSValue object = local(runtime);
    JSValue result = JS_GetPropertyStr(runtime.context(), object,
                                       name != nullptr ? name : "");
    JS_FreeValue(runtime.context(), object);
    if (JS_IsException(result)) {
      throw JSError(runtime, "QuickJS property get failed.");
    }
    Value value(runtime, result);
    JS_FreeValue(runtime.context(), result);
    return value;
  }
  Value getProperty(Runtime& runtime, const std::string& name) const {
    return getProperty(runtime, name.c_str());
  }
  Value getProperty(Runtime& runtime, const Value& key) const {
    JSValue object = local(runtime);
    JSValue keyValue = key.local(runtime);
    JSAtom atom = JS_ValueToAtom(runtime.context(), keyValue);
    JS_FreeValue(runtime.context(), keyValue);
    JSValue result = atom == JS_ATOM_NULL
                         ? JS_UNDEFINED
                         : JS_GetProperty(runtime.context(), object, atom);
    if (atom != JS_ATOM_NULL) {
      JS_FreeAtom(runtime.context(), atom);
    }
    JS_FreeValue(runtime.context(), object);
    if (JS_IsException(result)) {
      throw JSError(runtime, "QuickJS property get failed.");
    }
    Value value(runtime, result);
    JS_FreeValue(runtime.context(), result);
    return value;
  }
  Object getPropertyAsObject(Runtime& runtime, const char* name) const {
    return getProperty(runtime, name).asObject(runtime);
  }
  Function getPropertyAsFunction(Runtime& runtime, const char* name) const;

  void setProperty(Runtime& runtime, const char* name, const Value& value) {
    JSValue object = local(runtime);
    JSValue localValue = value.local(runtime);
    int status = JS_SetPropertyStr(runtime.context(), object,
                                   name != nullptr ? name : "", localValue);
    JS_FreeValue(runtime.context(), object);
    if (status < 0) {
      throw JSError(runtime, "QuickJS property set failed.");
    }
  }
  void setProperty(Runtime& runtime, const char* name, const String& value) {
    setProperty(runtime, name, Value(runtime, value));
  }
  void setProperty(Runtime& runtime, const char* name, const Object& value) {
    setProperty(runtime, name, Value(runtime, value));
  }
  void setProperty(Runtime& runtime, const char* name, const Function& value);
  void setProperty(Runtime& runtime, const char* name, const Array& value);
  void setProperty(Runtime& runtime, const char* name,
                   const ArrayBuffer& value);
  void setProperty(Runtime& runtime, const char* name, bool value) {
    setProperty(runtime, name, Value(value));
  }
  void setProperty(Runtime& runtime, const char* name, double value) {
    setProperty(runtime, name, Value(value));
  }
  void setProperty(Runtime& runtime, const std::string& name,
                   const Value& value) {
    setProperty(runtime, name.c_str(), value);
  }
  void setProperty(Runtime& runtime, const Value& key, const Value& value) {
    JSValue object = local(runtime);
    JSValue keyValue = key.local(runtime);
    JSAtom atom = JS_ValueToAtom(runtime.context(), keyValue);
    JS_FreeValue(runtime.context(), keyValue);
    JSValue localValue = value.local(runtime);
    int status = atom == JS_ATOM_NULL
                     ? -1
                     : JS_SetProperty(runtime.context(), object, atom, localValue);
    if (atom != JS_ATOM_NULL) {
      JS_FreeAtom(runtime.context(), atom);
    }
    JS_FreeValue(runtime.context(), object);
    if (status < 0) {
      throw JSError(runtime, "QuickJS property set failed.");
    }
  }
  bool hasProperty(Runtime& runtime, const char* name) const {
    JSValue object = local(runtime);
    JSAtom atom = JS_NewAtom(runtime.context(), name != nullptr ? name : "");
    int result = JS_HasProperty(runtime.context(), object, atom);
    JS_FreeAtom(runtime.context(), atom);
    JS_FreeValue(runtime.context(), object);
    return result > 0;
  }
  bool isFunction(Runtime& runtime) const {
    JSValue object = local(runtime);
    bool result = JS_IsFunction(runtime.context(), object);
    JS_FreeValue(runtime.context(), object);
    return result;
  }
  bool isArray(Runtime& runtime) const {
    JSValue object = local(runtime);
    int result = JS_IsArray(runtime.context(), object);
    JS_FreeValue(runtime.context(), object);
    return result > 0;
  }
  bool isArrayBuffer(Runtime& runtime) const {
    JSValue object = local(runtime);
    bool result = JS_IsArrayBuffer(object);
    JS_FreeValue(runtime.context(), object);
    return result;
  }
  Function asFunction(Runtime& runtime) const;
  Array getArray(Runtime& runtime) const;
  ArrayBuffer getArrayBuffer(Runtime& runtime) const;
  Array getPropertyNames(Runtime& runtime) const;

  template <typename T>
  bool isHostObject(Runtime& runtime) const {
    auto holder = hostObjectHolder(runtime);
    return holder != nullptr &&
           holder->typeToken == quickjsdirect::hostObjectTypeToken<T>();
  }
  template <typename T>
  std::shared_ptr<T> getHostObject(Runtime& runtime) const {
    auto holder = hostObjectHolder(runtime);
    if (holder == nullptr ||
        holder->typeToken != quickjsdirect::hostObjectTypeToken<T>()) {
      return nullptr;
    }
    return std::static_pointer_cast<T>(holder->hostObject);
  }
  JSValue local(Runtime& runtime) const {
    return JS_DupValue(runtime.context(), storage_->value);
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
  explicit Object(std::shared_ptr<quickjsdirect::ValueStorage> storage)
      : storage_(std::move(storage)) {}
  static Object createFromHostObjectWithToken(Runtime& runtime,
                                              std::shared_ptr<HostObject> host,
                                              const void* typeToken);
  quickjsdirect::HostObjectHolder* hostObjectHolder(Runtime& runtime) const;
  std::shared_ptr<quickjsdirect::ValueStorage> storage_;
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
    JSValue function = local(runtime);
    JSValue global = JS_GetGlobalObject(runtime.context());
    std::vector<JSValue> argv;
    argv.reserve(count);
    for (size_t i = 0; i < count; i++) {
      argv.push_back(args[i].local(runtime));
    }
    JSValue result = JS_Call(runtime.context(), function, global,
                             static_cast<int>(argv.size()),
                             argv.empty() ? nullptr : argv.data());
    for (auto& arg : argv) {
      JS_FreeValue(runtime.context(), arg);
    }
    JS_FreeValue(runtime.context(), global);
    JS_FreeValue(runtime.context(), function);
    if (JS_IsException(result)) {
      throw JSError(runtime, "QuickJS function call failed.");
    }
    Value value(runtime, result);
    JS_FreeValue(runtime.context(), result);
    return value;
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
    JSValue function = local(runtime);
    JSValue thisValue = thisObject.local(runtime);
    std::vector<JSValue> argv;
    argv.reserve(count);
    for (size_t i = 0; i < count; i++) {
      argv.push_back(args[i].local(runtime));
    }
    JSValue result = JS_Call(runtime.context(), function, thisValue,
                             static_cast<int>(argv.size()),
                             argv.empty() ? nullptr : argv.data());
    for (auto& arg : argv) {
      JS_FreeValue(runtime.context(), arg);
    }
    JS_FreeValue(runtime.context(), thisValue);
    JS_FreeValue(runtime.context(), function);
    if (JS_IsException(result)) {
      throw JSError(runtime, "QuickJS function call failed.");
    }
    Value value(runtime, result);
    JS_FreeValue(runtime.context(), result);
    return value;
  }
  Value callAsConstructor(Runtime& runtime, const Value* args,
                          size_t count) const {
    JSValue function = local(runtime);
    std::vector<JSValue> argv;
    argv.reserve(count);
    for (size_t i = 0; i < count; i++) {
      argv.push_back(args[i].local(runtime));
    }
    JSValue result = JS_CallConstructor(runtime.context(), function,
                                        static_cast<int>(argv.size()),
                                        argv.empty() ? nullptr : argv.data());
    for (auto& arg : argv) {
      JS_FreeValue(runtime.context(), arg);
    }
    JS_FreeValue(runtime.context(), function);
    if (JS_IsException(result)) {
      throw JSError(runtime, "QuickJS constructor call failed.");
    }
    Value value(runtime, result);
    JS_FreeValue(runtime.context(), result);
    return value;
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
};

class Array : public Object {
 public:
  explicit Array(Runtime& runtime, size_t size)
      : Object(std::make_shared<quickjsdirect::ValueStorage>(
            quickjsdirect::ValueStorage::Kind::QuickJS)) {
    storage_->context = runtime.context();
    storage_->value = JS_NewArray(runtime.context());
    JS_SetPropertyStr(runtime.context(), storage_->value, "length",
                      JS_NewUint32(runtime.context(), static_cast<uint32_t>(size)));
  }
  explicit Array(Object object) : Object(std::move(object.storage_)) {}
  size_t size(Runtime& runtime) const {
    Value length = getProperty(runtime, "length");
    return length.isNumber()
               ? static_cast<size_t>(std::max<double>(0, length.getNumber()))
               : 0;
  }
  Value getValueAtIndex(Runtime& runtime, size_t index) const {
    JSValue object = local(runtime);
    JSValue result = JS_GetPropertyUint32(runtime.context(), object,
                                          static_cast<uint32_t>(index));
    JS_FreeValue(runtime.context(), object);
    if (JS_IsException(result)) {
      throw JSError(runtime, "QuickJS array get failed.");
    }
    Value value(runtime, result);
    JS_FreeValue(runtime.context(), result);
    return value;
  }
  void setValueAtIndex(Runtime& runtime, size_t index, const Value& value) {
    JSValue object = local(runtime);
    JSValue localValue = value.local(runtime);
    int status = JS_SetPropertyUint32(runtime.context(), object,
                                      static_cast<uint32_t>(index), localValue);
    JS_FreeValue(runtime.context(), object);
    if (status < 0) {
      throw JSError(runtime, "QuickJS array set failed.");
    }
  }
  void setValueAtIndex(Runtime& runtime, size_t index, const String& value) {
    setValueAtIndex(runtime, index, Value(runtime, value));
  }
};

class BigInt {
 public:
  BigInt() = default;
  BigInt(Runtime& runtime, JSValue value)
      : storage_(std::make_shared<quickjsdirect::ValueStorage>(
            quickjsdirect::ValueStorage::Kind::QuickJS)) {
    storage_->context = runtime.context();
    storage_->value = JS_DupValue(runtime.context(), value);
  }
  static BigInt fromInt64(Runtime& runtime, int64_t value) {
    JSValue result = JS_NewBigInt64(runtime.context(), value);
    BigInt bigint(runtime, result);
    JS_FreeValue(runtime.context(), result);
    return bigint;
  }
  static BigInt fromUint64(Runtime& runtime, uint64_t value) {
    JSValue result = JS_NewBigUint64(runtime.context(), value);
    BigInt bigint(runtime, result);
    JS_FreeValue(runtime.context(), result);
    return bigint;
  }
  String toString(Runtime& runtime, int) const;
  JSValue local(Runtime& runtime) const {
    return JS_DupValue(runtime.context(), storage_->value);
  }
  operator Value() const {
    Value value;
    value.storage_ = storage_;
    return value;
  }

 private:
  friend class Value;
  std::shared_ptr<quickjsdirect::ValueStorage> storage_;
};

class ArrayBuffer : public Object {
 public:
  ArrayBuffer(Runtime& runtime, std::shared_ptr<MutableBuffer> buffer)
      : Object(std::make_shared<quickjsdirect::ValueStorage>(
            quickjsdirect::ValueStorage::Kind::QuickJS)) {
    auto* holder = new quickjsdirect::ArrayBufferHolder(std::move(buffer));
    storage_->context = runtime.context();
    storage_->value = JS_NewArrayBuffer(
        runtime.context(), holder->buffer->data(), holder->buffer->size(),
        [](JSRuntime*, void* opaque, void*) {
          delete static_cast<quickjsdirect::ArrayBufferHolder*>(opaque);
        },
        holder, false);
  }
  explicit ArrayBuffer(Object object) : Object(std::move(object.storage_)) {}
  size_t size(Runtime& runtime) const {
    JSValue object = local(runtime);
    size_t size = 0;
    JS_GetArrayBuffer(runtime.context(), &size, object);
    JS_FreeValue(runtime.context(), object);
    return size;
  }
  uint8_t* data(Runtime& runtime) const {
    JSValue object = local(runtime);
    size_t size = 0;
    uint8_t* data = JS_GetArrayBuffer(runtime.context(), &size, object);
    JS_FreeValue(runtime.context(), object);
    return data;
  }
};

inline Value HostObject::get(Runtime&, const PropNameID&) {
  return Value::undefined();
}
inline void HostObject::set(Runtime&, const PropNameID&, const Value&) {}
inline std::vector<PropNameID> HostObject::getPropertyNames(Runtime&) {
  return {};
}
inline String::String(Runtime& runtime, JSValue value)
    : storage_(std::make_shared<quickjsdirect::ValueStorage>(
          quickjsdirect::ValueStorage::Kind::QuickJS)) {
  storage_->context = runtime.context();
  storage_->value = JS_DupValue(runtime.context(), value);
}
inline std::string String::utf8(Runtime& runtime) const {
  JSValue value = local(runtime);
  std::string result = quickjsdirect::valueToUtf8(runtime.context(), value);
  JS_FreeValue(runtime.context(), value);
  return result;
}
inline JSValue String::local(Runtime& runtime) const {
  return JS_DupValue(runtime.context(), storage_->value);
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
inline Object Value::asObject(Runtime&) const {
  return Object::fromValueStorage(storage_);
}
inline String Value::asString(Runtime& runtime) const {
  JSValue value = local(runtime);
  String result(runtime, value);
  JS_FreeValue(runtime.context(), value);
  return result;
}
inline BigInt Value::getBigInt(Runtime& runtime) const {
  JSValue value = local(runtime);
  BigInt result(runtime, value);
  JS_FreeValue(runtime.context(), value);
  return result;
}
inline Function Object::getPropertyAsFunction(Runtime& runtime,
                                              const char* name) const {
  return getProperty(runtime, name).asObject(runtime).asFunction(runtime);
}
inline Function Object::asFunction(Runtime&) const { return Function(*this); }
inline Array Object::getArray(Runtime&) const { return Array(*this); }
inline ArrayBuffer Object::getArrayBuffer(Runtime&) const {
  return ArrayBuffer(*this);
}
inline Array Object::getPropertyNames(Runtime& runtime) const {
  JSValue object = local(runtime);
  JSPropertyEnum* properties = nullptr;
  uint32_t count = 0;
  int status = JS_GetOwnPropertyNames(
      runtime.context(), &properties, &count, object,
      JS_GPN_STRING_MASK | JS_GPN_SYMBOL_MASK | JS_GPN_ENUM_ONLY);
  JS_FreeValue(runtime.context(), object);
  if (status < 0) {
    throw JSError(runtime, "QuickJS property names failed.");
  }
  Array result(runtime, count);
  for (uint32_t i = 0; i < count; i++) {
    JSValue nameValue = JS_AtomToValue(runtime.context(), properties[i].atom);
    result.setValueAtIndex(runtime, i, Value(runtime, nameValue));
    JS_FreeValue(runtime.context(), nameValue);
    JS_FreeAtom(runtime.context(), properties[i].atom);
  }
  js_free(runtime.context(), properties);
  return result;
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

namespace quickjsdirect {

static JSValue nativeHostGet(JSContext* ctx, JSValueConst obj, JSAtom atom,
                             JSValueConst receiver) {
  (void)receiver;
  Runtime runtime(stateForContext(ctx));
  auto* holder =
      static_cast<HostObjectHolder*>(JS_GetOpaque(obj, gHostClassId));
  if (holder == nullptr || holder->hostObject == nullptr) {
    return JS_UNDEFINED;
  }
  try {
    Value result =
        holder->hostObject->get(runtime, PropNameID(atomToUtf8(ctx, atom)));
    return result.local(runtime);
  } catch (const std::exception& error) {
    return throwError(ctx, error);
  }
}

static int nativeHostSet(JSContext* ctx, JSValueConst obj, JSAtom atom,
                         JSValueConst value, JSValueConst, int) {
  Runtime runtime(stateForContext(ctx));
  auto* holder =
      static_cast<HostObjectHolder*>(JS_GetOpaque(obj, gHostClassId));
  if (holder == nullptr || holder->hostObject == nullptr) {
    return 0;
  }
  try {
    holder->hostObject->set(runtime, PropNameID(atomToUtf8(ctx, atom)),
                            Value(runtime, value));
    return 1;
  } catch (const std::exception& error) {
    throwError(ctx, error);
    return -1;
  }
}

static int nativeHostHas(JSContext* ctx, JSValueConst obj, JSAtom atom) {
  Runtime runtime(stateForContext(ctx));
  auto* holder =
      static_cast<HostObjectHolder*>(JS_GetOpaque(obj, gHostClassId));
  if (holder == nullptr || holder->hostObject == nullptr) {
    return 0;
  }
  try {
    auto names = holder->hostObject->getPropertyNames(runtime);
    std::string requested = atomToUtf8(ctx, atom);
    for (const auto& name : names) {
      if (name.utf8(runtime) == requested) {
        return 1;
      }
    }
  } catch (const std::exception&) {
  }
  return 0;
}

static int nativeHostOwnNames(JSContext* ctx, JSPropertyEnum** ptab,
                              uint32_t* plen, JSValueConst obj) {
  Runtime runtime(stateForContext(ctx));
  auto* holder =
      static_cast<HostObjectHolder*>(JS_GetOpaque(obj, gHostClassId));
  if (holder == nullptr || holder->hostObject == nullptr) {
    *ptab = nullptr;
    *plen = 0;
    return 0;
  }
  auto names = holder->hostObject->getPropertyNames(runtime);
  *plen = static_cast<uint32_t>(names.size());
  *ptab = static_cast<JSPropertyEnum*>(
      js_mallocz(ctx, sizeof(JSPropertyEnum) * names.size()));
  for (uint32_t i = 0; i < *plen; i++) {
    (*ptab)[i].is_enumerable = true;
    (*ptab)[i].atom = JS_NewAtom(ctx, names[i].utf8(runtime).c_str());
  }
  return 0;
}

static void nativeHostFinalize(JSRuntime*, JSValue value) {
  auto* holder = static_cast<HostObjectHolder*>(
      JS_GetOpaque(value, gHostClassId));
  delete holder;
}

static JSValue invokeFunctionHolder(JSContext* ctx, FunctionHolder* holder,
                                    JSValueConst thisValue, int argc,
                                    JSValueConst* argv) {
  Runtime runtime(stateForContext(ctx));
  if (holder == nullptr || !holder->callback) {
    return JS_UNDEFINED;
  }
  std::vector<Value> args;
  args.reserve(argc);
  for (int i = 0; i < argc; i++) {
    args.emplace_back(runtime, argv[i]);
  }
  try {
    Value self(runtime, thisValue);
    Value result = holder->callback(runtime, self,
                                    args.empty() ? nullptr : args.data(),
                                    args.size());
    return result.local(runtime);
  } catch (const std::exception& error) {
    return throwError(ctx, error);
  }
}

static JSValue nativeFunctionCall(JSContext* ctx, JSValue function,
                                  JSValue thisValue, int argc, JSValue* argv,
                                  int) {
  auto* holder = static_cast<FunctionHolder*>(
      JS_GetOpaque(function, gFunctionClassId));
  return invokeFunctionHolder(ctx, holder, thisValue, argc, argv);
}

static JSValue nativeFunctionCallData(JSContext* ctx, JSValue thisValue,
                                      int argc, JSValue* argv, int,
                                      JSValue* data) {
  auto* holder = static_cast<FunctionHolder*>(
      JS_GetOpaque(data[0], gFunctionClassId));
  return invokeFunctionHolder(ctx, holder, thisValue, argc, argv);
}

static void nativeFunctionFinalize(JSRuntime*, JSValue value) {
  auto* holder = static_cast<FunctionHolder*>(
      JS_GetOpaque(value, gFunctionClassId));
  delete holder;
}

static JSClassExoticMethods hostExoticMethods = {
    .get_own_property = nullptr,
    .get_own_property_names = nativeHostOwnNames,
    .delete_property = nullptr,
    .define_own_property = nullptr,
    .has_property = nativeHostHas,
    .get_property = nativeHostGet,
    .set_property = nativeHostSet,
};

inline void ensureClasses(Runtime& runtime) {
  auto state = runtime.state();
  JSRuntime* rt = JS_GetRuntime(runtime.context());
  if (gHostClassId == 0) {
    JS_NewClassID(rt, &gHostClassId);
  }
  if (!state->hostClassRegistered) {
    JSClassDef def = {};
    def.class_name = "NativeScriptDirectHostObject";
    def.exotic = &hostExoticMethods;
    def.finalizer = nativeHostFinalize;
    JS_NewClass(rt, gHostClassId, &def);
    JS_SetClassProto(runtime.context(), gHostClassId,
                     JS_NewObject(runtime.context()));
    state->hostClassRegistered = true;
  }
  if (gFunctionClassId == 0) {
    JS_NewClassID(rt, &gFunctionClassId);
  }
  if (!state->functionClassRegistered) {
    JSClassDef def = {};
    def.class_name = "NativeScriptDirectFunction";
    def.call = nativeFunctionCall;
    def.finalizer = nativeFunctionFinalize;
    JS_NewClass(rt, gFunctionClassId, &def);
    JS_SetClassProto(runtime.context(), gFunctionClassId,
                     JS_NewObject(runtime.context()));
    state->functionClassRegistered = true;
  }
}

}  // namespace quickjsdirect

inline quickjsdirect::HostObjectHolder* Object::hostObjectHolder(
    Runtime& runtime) const {
  quickjsdirect::ensureClasses(runtime);
  JSValue object = local(runtime);
  auto* holder = static_cast<quickjsdirect::HostObjectHolder*>(
      JS_GetOpaque(object, quickjsdirect::gHostClassId));
  JS_FreeValue(runtime.context(), object);
  return holder;
}

inline Object Object::createFromHostObjectWithToken(
    Runtime& runtime, std::shared_ptr<HostObject> host, const void* typeToken) {
  quickjsdirect::ensureClasses(runtime);
  auto* holder = new quickjsdirect::HostObjectHolder(runtime.state(),
                                                     std::move(host), typeToken);
  JSValue object = JS_NewObjectClass(runtime.context(),
                                     quickjsdirect::gHostClassId);
  JS_SetOpaque(object, holder);
  Object result = Object::fromValueStorage(Value(runtime, object).storage_);
  JS_FreeValue(runtime.context(), object);
  return result;
}

inline Function Function::createFromHostFunction(Runtime& runtime,
                                                 const PropNameID& name,
                                                 unsigned int parameterCount,
                                                 HostFunctionType callback) {
  quickjsdirect::ensureClasses(runtime);
  auto* holder = new quickjsdirect::FunctionHolder(runtime.state(),
                                                   std::move(callback));
  JSValue data = JS_NewObjectClass(runtime.context(),
                                   quickjsdirect::gFunctionClassId);
  if (JS_IsException(data)) {
    delete holder;
    throw JSError(runtime, "QuickJS host function data allocation failed.");
  }
  JS_SetOpaque(data, holder);

  JSValue function = JS_NewCFunctionData(
      runtime.context(), quickjsdirect::nativeFunctionCallData,
      static_cast<int>(parameterCount), 0, 1, &data);
  JS_FreeValue(runtime.context(), data);
  if (JS_IsException(function)) {
    throw JSError(runtime, "QuickJS host function allocation failed.");
  }

  std::string functionName = name.utf8(runtime);
  JSValue nameValue = JS_NewStringLen(runtime.context(), functionName.data(),
                                      functionName.size());
  JS_DefinePropertyValueStr(runtime.context(), function, "name", nameValue,
                            JS_PROP_CONFIGURABLE);
  Function result = Function(Object::fromValueStorage(
      Value(runtime, function).storage_));
  JS_FreeValue(runtime.context(), function);
  return result;
}

inline String BigInt::toString(Runtime& runtime, int) const {
  JSValue value = local(runtime);
  JSValue stringValue = JS_ToString(runtime.context(), value);
  JS_FreeValue(runtime.context(), value);
  String result(runtime, stringValue);
  JS_FreeValue(runtime.context(), stringValue);
  return result;
}

inline Object Runtime::global() {
  JSValue global = JS_GetGlobalObject(context());
  Object result = Object::fromValueStorage(Value(*this, global).storage_);
  JS_FreeValue(context(), global);
  return result;
}

inline Value Runtime::evaluateJavaScript(std::shared_ptr<StringBuffer> buffer,
                                         const std::string& sourceURL) {
  JSValue result = JS_Eval(context(), buffer != nullptr ? buffer->data() : "",
                           buffer != nullptr ? buffer->size() : 0,
                           sourceURL.c_str(), JS_EVAL_TYPE_GLOBAL);
  if (JS_IsException(result)) {
    throw JSError(*this, "QuickJS script evaluation failed.");
  }
  Value value(*this, result);
  JS_FreeValue(context(), result);
  return value;
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

static JSValue NativeApiQuickJSLazyGlobalGetter(JSContext* context,
                                                JSValueConst,
                                                int,
                                                JSValueConst*,
                                                int,
                                                JSValueConst* data) {
  JSValue global = JS_GetGlobalObject(context);
  JSValue resolver =
      JS_GetPropertyStr(context, global,
                        "__nativeScriptResolveNativeApiLazyGlobal");
  if (!JS_IsFunction(context, resolver)) {
    JS_FreeValue(context, resolver);
    JS_FreeValue(context, global);
    return JS_UNDEFINED;
  }

  JSValueConst args[] = {data[0], data[1]};
  JSValue result = JS_Call(context, resolver, global, 2, args);
  JS_FreeValue(context, resolver);
  if (JS_IsException(result)) {
    JS_FreeValue(context, global);
    return result;
  }

  JSAtom atom = JS_ValueToAtom(context, data[0]);
  if (atom != JS_ATOM_NULL) {
    JS_DefinePropertyValue(context, global, atom, JS_DupValue(context, result),
                           JS_PROP_CONFIGURABLE);
    JS_FreeAtom(context, atom);
  }
  JS_FreeValue(context, global);
  return result;
}

bool InstallNativeApiEngineLazyGlobal(
    Runtime& runtime, std::shared_ptr<NativeApiJsiBridge>,
    const std::string& name, const std::string& kind, bool force) {
  if (name.empty() || kind.empty()) {
    return false;
  }

  JSContext* context = runtime.context();
  JSValue global = JS_GetGlobalObject(context);
  JSAtom atom = JS_NewAtomLen(context, name.data(), name.size());
  if (atom == JS_ATOM_NULL) {
    JS_FreeValue(context, global);
    return false;
  }

  int hasProperty = JS_HasProperty(context, global, atom);
  if (!force && hasProperty > 0) {
    JS_FreeAtom(context, atom);
    JS_FreeValue(context, global);
    return false;
  }
  if (hasProperty < 0) {
    JS_FreeAtom(context, atom);
    JS_FreeValue(context, global);
    return false;
  }

  JSValue data[] = {
      JS_NewStringLen(context, name.data(), name.size()),
      JS_NewStringLen(context, kind.data(), kind.size()),
  };
  if (JS_IsException(data[0]) || JS_IsException(data[1])) {
    JS_FreeValue(context, data[0]);
    JS_FreeValue(context, data[1]);
    JS_FreeAtom(context, atom);
    JS_FreeValue(context, global);
    return false;
  }

  JSValue getter = JS_NewCFunctionData(
      context, NativeApiQuickJSLazyGlobalGetter, 0, 0, 2, data);
  JS_FreeValue(context, data[0]);
  JS_FreeValue(context, data[1]);
  if (JS_IsException(getter)) {
    JS_FreeAtom(context, atom);
    JS_FreeValue(context, global);
    return false;
  }

  int status = JS_DefinePropertyGetSet(context, global, atom, getter,
                                       JS_UNDEFINED, JS_PROP_CONFIGURABLE);
  JS_FreeAtom(context, atom);
  JS_FreeValue(context, global);
  return status >= 0;
}

#include "../hermes/jsi/NativeApiJsiHostObjects.inc"

std::shared_ptr<Runtime> retainNativeApiJsiRuntime(Runtime& runtime) {
  return std::make_shared<Runtime>(runtime.state());
}

#include "../hermes/jsi/NativeApiJsiCallbacks.inc"
#include "../hermes/jsi/NativeApiJsiConversion.inc"
#include "../hermes/jsi/NativeApiJsiInvocation.inc"
#include "../hermes/jsi/NativeApiJsiClassBuilder.inc"
#include "../hermes/jsi/NativeApiJsiHostObject.inc"

}  // namespace

#include "../hermes/jsi/NativeApiJsiInstall.inc"

void InstallNativeApiQuickJS(JSContext* context,
                             const NativeApiQuickJSConfig& config) {
  if (context == nullptr) {
    return;
  }
  auto state = facebook::jsi::quickjsdirect::stateForContext(context);
  facebook::jsi::Runtime runtime(state);
  facebook::jsi::quickjsdirect::ensureClasses(runtime);
  InstallNativeApiJSI(runtime, config);
}

}  // namespace nativescript

extern "C" void NativeScriptInstallNativeApiQuickJS(JSContext* context,
                                                     const char* metadataPath) {
  nativescript::NativeApiQuickJSConfig config;
  config.metadataPath = metadataPath;
  nativescript::InstallNativeApiQuickJS(context, config);
}

#endif  // TARGET_ENGINE_QUICKJS

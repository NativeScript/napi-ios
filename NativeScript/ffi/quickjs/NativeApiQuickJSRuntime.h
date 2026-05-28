#ifndef NATIVESCRIPT_FFI_QUICKJS_NATIVE_API_QUICKJS_RUNTIME_H
#define NATIVESCRIPT_FFI_QUICKJS_NATIVE_API_QUICKJS_RUNTIME_H

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
#include <cstdint>
#include <cstdio>
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

#include "Metadata.h"
#include "MetadataReader.h"
#include "ffi.h"
#include "quickjs.h"

@protocol NativeApiDirectClassBuilderProtocol
@end

#ifdef EMBED_METADATA_SIZE
extern const unsigned char embedded_metadata[EMBED_METADATA_SIZE];
#endif

namespace nativescript {
namespace direct {

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
  static PropNameID forAscii(Runtime&, const std::string& value) { return PropNameID(value); }
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

using HostFunctionType = std::function<Value(Runtime&, const Value&, const Value*, size_t)>;

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

extern JSClassID gHostClassId;
extern JSClassID gFunctionClassId;

std::shared_ptr<RuntimeState> stateForContext(JSContext* context);

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
  HostObjectHolder(std::shared_ptr<RuntimeState> state, std::shared_ptr<HostObject> hostObject,
                   const void* typeToken)
      : state(std::move(state)), hostObject(std::move(hostObject)), typeToken(typeToken) {}
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
  explicit ArrayBufferHolder(std::shared_ptr<MutableBuffer> buffer) : buffer(std::move(buffer)) {}
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

void ensureClasses(Runtime& runtime);

}  // namespace quickjsdirect

class Runtime {
 public:
  explicit Runtime(JSContext* context) : state_(quickjsdirect::stateForContext(context)) {}
  explicit Runtime(std::shared_ptr<quickjsdirect::RuntimeState> state) : state_(std::move(state)) {}
  JSContext* context() const { return state_->context; }
  std::shared_ptr<quickjsdirect::RuntimeState> state() const { return state_; }
  Object global();
  Value evaluateJavaScript(std::shared_ptr<StringBuffer> buffer, const std::string& sourceURL);
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
    return String(runtime, JS_NewString(runtime.context(), value != nullptr ? value : ""));
  }
  static String createFromUtf8(Runtime& runtime, const std::string& value) {
    return String(runtime, JS_NewStringLen(runtime.context(), value.data(), value.size()));
  }
  static String createFromUtf8(Runtime& runtime, const uint8_t* value, size_t length) {
    return String(runtime,
                  JS_NewStringLen(runtime.context(), reinterpret_cast<const char*>(value), length));
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
    value.storage_ =
        std::make_shared<quickjsdirect::ValueStorage>(quickjsdirect::ValueStorage::Kind::Null);
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
  static Object fromValueStorage(std::shared_ptr<quickjsdirect::ValueStorage> storage) {
    Object object;
    object.storage_ = std::move(storage);
    return object;
  }
  template <typename T>
  static Object createFromHostObject(Runtime& runtime, std::shared_ptr<T> host) {
    auto baseHost = std::static_pointer_cast<HostObject>(std::move(host));
    return createFromHostObjectWithToken(runtime, std::move(baseHost),
                                         quickjsdirect::hostObjectTypeToken<T>());
  }

  Value getProperty(Runtime& runtime, const char* name) const {
    JSValue object = local(runtime);
    JSValue result = JS_GetPropertyStr(runtime.context(), object, name != nullptr ? name : "");
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
    JSValue result =
        atom == JS_ATOM_NULL ? JS_UNDEFINED : JS_GetProperty(runtime.context(), object, atom);
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
    int status =
        JS_SetPropertyStr(runtime.context(), object, name != nullptr ? name : "", localValue);
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
    JSValue object = local(runtime);
    JSValue keyValue = key.local(runtime);
    JSAtom atom = JS_ValueToAtom(runtime.context(), keyValue);
    JS_FreeValue(runtime.context(), keyValue);
    JSValue localValue = value.local(runtime);
    int status =
        atom == JS_ATOM_NULL ? -1 : JS_SetProperty(runtime.context(), object, atom, localValue);
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
    return holder != nullptr && holder->typeToken == quickjsdirect::hostObjectTypeToken<T>();
  }
  template <typename T>
  std::shared_ptr<T> getHostObject(Runtime& runtime) const {
    auto holder = hostObjectHolder(runtime);
    if (holder == nullptr || holder->typeToken != quickjsdirect::hostObjectTypeToken<T>()) {
      return nullptr;
    }
    return std::static_pointer_cast<T>(holder->hostObject);
  }
  JSValue local(Runtime& runtime) const { return JS_DupValue(runtime.context(), storage_->value); }
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
  static Object createFromHostObjectWithToken(Runtime& runtime, std::shared_ptr<HostObject> host,
                                              const void* typeToken);
  quickjsdirect::HostObjectHolder* hostObjectHolder(Runtime& runtime) const;
  std::shared_ptr<quickjsdirect::ValueStorage> storage_;
};

class Function : public Object {
 public:
  Function() = default;
  explicit Function(Object object) : Object(std::move(object.storage_)) {}
  static Function createFromHostFunction(Runtime& runtime, const PropNameID& name, unsigned int,
                                         HostFunctionType callback);
  Value call(Runtime& runtime, const Value* args, size_t count) const {
    JSValue function = local(runtime);
    JSValue global = JS_GetGlobalObject(runtime.context());
    std::vector<JSValue> argv;
    argv.reserve(count);
    for (size_t i = 0; i < count; i++) {
      argv.push_back(args[i].local(runtime));
    }
    JSValue result = JS_Call(runtime.context(), function, global, static_cast<int>(argv.size()),
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
  Value callWithThis(Runtime& runtime, const Object& thisObject, const Value* args = nullptr,
                     size_t count = 0) const {
    JSValue function = local(runtime);
    JSValue thisValue = thisObject.local(runtime);
    std::vector<JSValue> argv;
    argv.reserve(count);
    for (size_t i = 0; i < count; i++) {
      argv.push_back(args[i].local(runtime));
    }
    JSValue result = JS_Call(runtime.context(), function, thisValue, static_cast<int>(argv.size()),
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
  Value callAsConstructor(Runtime& runtime, const Value* args, size_t count) const {
    JSValue function = local(runtime);
    std::vector<JSValue> argv;
    argv.reserve(count);
    for (size_t i = 0; i < count; i++) {
      argv.push_back(args[i].local(runtime));
    }
    JSValue result = JS_CallConstructor(runtime.context(), function, static_cast<int>(argv.size()),
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
  Value callAsConstructor(Runtime& runtime, const Value (&args)[N], size_t count) const {
    return callAsConstructor(runtime, static_cast<const Value*>(args), count);
  }
  template <typename... Args>
  Value callAsConstructor(Runtime& runtime, Args&&... args) const {
    Value argv[] = {Value(runtime, std::forward<Args>(args))...};
    return callAsConstructor(runtime, static_cast<const Value*>(argv), sizeof...(Args));
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
    return length.isNumber() ? static_cast<size_t>(std::max<double>(0, length.getNumber())) : 0;
  }
  Value getValueAtIndex(Runtime& runtime, size_t index) const {
    JSValue object = local(runtime);
    JSValue result = JS_GetPropertyUint32(runtime.context(), object, static_cast<uint32_t>(index));
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
    int status =
        JS_SetPropertyUint32(runtime.context(), object, static_cast<uint32_t>(index), localValue);
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
  JSValue local(Runtime& runtime) const { return JS_DupValue(runtime.context(), storage_->value); }
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
}  // namespace direct
}  // namespace nativescript

#endif  // TARGET_ENGINE_QUICKJS

#endif  // NATIVESCRIPT_FFI_QUICKJS_NATIVE_API_QUICKJS_RUNTIME_H

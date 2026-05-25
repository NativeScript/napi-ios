#include "NativeApiJSC.h"

#ifdef TARGET_ENGINE_JSC

#import <Foundation/Foundation.h>
#include <JavaScriptCore/JSTypedArray.h>
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

namespace jscdirect {

inline std::string stringToUtf8(JSStringRef string) {
  if (string == nullptr) {
    return {};
  }
  size_t capacity = JSStringGetMaximumUTF8CStringSize(string);
  std::string result(capacity, '\0');
  size_t written = JSStringGetUTF8CString(string, result.data(), capacity);
  if (written == 0) {
    return {};
  }
  result.resize(written - 1);
  return result;
}

inline JSStringRef makeJSString(const std::string& value) {
  NSString* string =
      [[NSString alloc] initWithBytes:value.data()
                               length:value.size()
                             encoding:NSUTF8StringEncoding];
  if (string == nil) {
    return JSStringCreateWithUTF8CString(value.c_str());
  }

  NSUInteger length = [string length];
  std::vector<JSChar> characters(length);
  if (length > 0) {
    [string getCharacters:characters.data() range:NSMakeRange(0, length)];
  }
  [string release];
  return JSStringCreateWithCharacters(characters.data(), length);
}

inline JSStringRef makeJSString(const char* value) {
  return JSStringCreateWithUTF8CString(value != nullptr ? value : "");
}

inline std::string valueToUtf8(JSContextRef context, JSValueRef value) {
  if (value == nullptr) {
    return {};
  }
  JSValueRef exception = nullptr;
  JSStringRef string = JSValueToStringCopy(context, value, &exception);
  if (string == nullptr || exception != nullptr) {
    if (string != nullptr) {
      JSStringRelease(string);
    }
    return {};
  }
  std::string result = stringToUtf8(string);
  JSStringRelease(string);
  return result;
}

inline JSValueRef makeError(JSContextRef context, const std::string& message) {
  JSStringRef string = makeJSString(message);
  JSValueRef argument = JSValueMakeString(context, string);
  JSStringRelease(string);
  JSValueRef exception = nullptr;
  JSObjectRef error = JSObjectMakeError(context, 1, &argument, &exception);
  if (error != nullptr && exception == nullptr) {
    return error;
  }
  return argument;
}

inline void setException(JSContextRef context, JSValueRef* exception,
                         const std::exception& error) {
  if (exception != nullptr) {
    *exception = makeError(context, error.what());
  }
}

struct RuntimeState {
  explicit RuntimeState(JSGlobalContextRef context) : context(context) {}

  ~RuntimeState() {
    if (hostClass != nullptr) {
      JSClassRelease(hostClass);
    }
    if (functionClass != nullptr) {
      JSClassRelease(functionClass);
    }
  }

  JSGlobalContextRef context = nullptr;
  JSClassRef hostClass = nullptr;
  JSClassRef functionClass = nullptr;
};

struct ValueStorage {
  enum class Kind {
    Undefined,
    Null,
    Bool,
    Number,
    JSC,
  };

  explicit ValueStorage(Kind kind) : kind(kind) {}

  ~ValueStorage() {
    if (context != nullptr && value != nullptr) {
      JSValueUnprotect(context, value);
    }
  }

  Kind kind = Kind::Undefined;
  bool boolValue = false;
  double numberValue = 0;
  JSGlobalContextRef context = nullptr;
  JSValueRef value = nullptr;
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

}  // namespace jscdirect

class Runtime {
 public:
  explicit Runtime(JSGlobalContextRef context)
      : state_(std::make_shared<jscdirect::RuntimeState>(context)) {}

  explicit Runtime(std::shared_ptr<jscdirect::RuntimeState> state)
      : state_(std::move(state)) {}

  JSGlobalContextRef context() const { return state_->context; }
  std::shared_ptr<jscdirect::RuntimeState> state() const { return state_; }

  Object global();
  Value evaluateJavaScript(std::shared_ptr<StringBuffer> buffer,
                           const std::string& sourceURL);
  void drainMicrotasks() {}

 private:
  std::shared_ptr<jscdirect::RuntimeState> state_;
};

class String {
 public:
  String() = default;
  String(Runtime& runtime, JSStringRef string);

  static String createFromUtf8(Runtime& runtime, const char* value) {
    JSStringRef string = jscdirect::makeJSString(value);
    String result(runtime, string);
    JSStringRelease(string);
    return result;
  }

  static String createFromUtf8(Runtime& runtime, const std::string& value) {
    JSStringRef string = jscdirect::makeJSString(value);
    String result(runtime, string);
    JSStringRelease(string);
    return result;
  }

  static String createFromUtf8(Runtime& runtime, const uint8_t* value,
                               size_t length) {
    std::string text(reinterpret_cast<const char*>(value), length);
    return createFromUtf8(runtime, text);
  }

  std::string utf8(Runtime& runtime) const;
  JSValueRef local(Runtime& runtime) const { return storage_->value; }
  operator Value() const;

 private:
  friend class Value;
  std::shared_ptr<jscdirect::ValueStorage> storage_;
};

class Value {
 public:
  Value()
      : storage_(std::make_shared<jscdirect::ValueStorage>(
            jscdirect::ValueStorage::Kind::Undefined)) {}

  Value(bool value)
      : storage_(std::make_shared<jscdirect::ValueStorage>(
            jscdirect::ValueStorage::Kind::Bool)) {
    storage_->boolValue = value;
  }

  Value(double value)
      : storage_(std::make_shared<jscdirect::ValueStorage>(
            jscdirect::ValueStorage::Kind::Number)) {
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
  Value(Runtime& runtime, JSValueRef value)
      : storage_(std::make_shared<jscdirect::ValueStorage>(
            jscdirect::ValueStorage::Kind::JSC)) {
    storage_->context = runtime.context();
    storage_->value = value != nullptr ? value : JSValueMakeUndefined(runtime.context());
    JSValueProtect(runtime.context(), storage_->value);
  }

  static Value undefined() { return Value(); }
  static Value null() {
    Value value;
    value.storage_ = std::make_shared<jscdirect::ValueStorage>(
        jscdirect::ValueStorage::Kind::Null);
    return value;
  }

  bool isUndefined() const {
    return storage_->kind == jscdirect::ValueStorage::Kind::Undefined ||
           (storage_->kind == jscdirect::ValueStorage::Kind::JSC &&
            JSValueIsUndefined(storage_->context, storage_->value));
  }
  bool isNull() const {
    return storage_->kind == jscdirect::ValueStorage::Kind::Null ||
           (storage_->kind == jscdirect::ValueStorage::Kind::JSC &&
            JSValueIsNull(storage_->context, storage_->value));
  }
  bool isBool() const {
    return storage_->kind == jscdirect::ValueStorage::Kind::Bool ||
           (storage_->kind == jscdirect::ValueStorage::Kind::JSC &&
            JSValueIsBoolean(storage_->context, storage_->value));
  }
  bool getBool() const {
    if (storage_->kind == jscdirect::ValueStorage::Kind::Bool) {
      return storage_->boolValue;
    }
    if (storage_->kind == jscdirect::ValueStorage::Kind::JSC) {
      return JSValueToBoolean(storage_->context, storage_->value);
    }
    return false;
  }
  bool isNumber() const {
    return storage_->kind == jscdirect::ValueStorage::Kind::Number ||
           (storage_->kind == jscdirect::ValueStorage::Kind::JSC &&
            JSValueIsNumber(storage_->context, storage_->value));
  }
  double getNumber() const {
    if (storage_->kind == jscdirect::ValueStorage::Kind::Number) {
      return storage_->numberValue;
    }
    if (storage_->kind == jscdirect::ValueStorage::Kind::JSC) {
      return JSValueToNumber(storage_->context, storage_->value, nullptr);
    }
    return 0;
  }

  bool isObject() const {
    return storage_->kind == jscdirect::ValueStorage::Kind::JSC &&
           JSValueIsObject(storage_->context, storage_->value);
  }
  bool isString() const {
    return storage_->kind == jscdirect::ValueStorage::Kind::JSC &&
           JSValueIsString(storage_->context, storage_->value);
  }
  bool isBigInt() const {
    if (storage_->kind != jscdirect::ValueStorage::Kind::JSC) {
      return false;
    }
    if (__builtin_available(macOS 15.0, iOS 18.0, *)) {
      return JSValueIsBigInt(storage_->context, storage_->value);
    }
    return false;
  }
  bool isSymbol() const {
    return storage_->kind == jscdirect::ValueStorage::Kind::JSC &&
           JSValueIsSymbol(storage_->context, storage_->value);
  }

  Object asObject(Runtime& runtime) const;
  String asString(Runtime& runtime) const;
  BigInt getBigInt(Runtime& runtime) const;

  JSValueRef local(Runtime& runtime) const {
    switch (storage_->kind) {
      case jscdirect::ValueStorage::Kind::Undefined:
        return JSValueMakeUndefined(runtime.context());
      case jscdirect::ValueStorage::Kind::Null:
        return JSValueMakeNull(runtime.context());
      case jscdirect::ValueStorage::Kind::Bool:
        return JSValueMakeBoolean(runtime.context(), storage_->boolValue);
      case jscdirect::ValueStorage::Kind::Number:
        return JSValueMakeNumber(runtime.context(), storage_->numberValue);
      case jscdirect::ValueStorage::Kind::JSC:
        return storage_->value;
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
  std::shared_ptr<jscdirect::ValueStorage> storage_;
};

class Object {
 public:
  Object() = default;
  explicit Object(Runtime& runtime)
      : storage_(std::make_shared<jscdirect::ValueStorage>(
            jscdirect::ValueStorage::Kind::JSC)) {
    storage_->context = runtime.context();
    storage_->value = JSObjectMake(runtime.context(), nullptr, nullptr);
    JSValueProtect(runtime.context(), storage_->value);
  }

  static Object fromValueStorage(std::shared_ptr<jscdirect::ValueStorage> storage) {
    Object object;
    object.storage_ = std::move(storage);
    return object;
  }

  template <typename T>
  static Object createFromHostObject(Runtime& runtime, std::shared_ptr<T> host) {
    auto baseHost = std::static_pointer_cast<HostObject>(std::move(host));
    return createFromHostObjectWithToken(
        runtime, std::move(baseHost),
        jscdirect::hostObjectTypeToken<T>());
  }

  Value getProperty(Runtime& runtime, const char* name) const {
    JSStringRef property = jscdirect::makeJSString(name);
    JSValueRef exception = nullptr;
    JSValueRef result =
        JSObjectGetProperty(runtime.context(), local(runtime), property, &exception);
    JSStringRelease(property);
    if (exception != nullptr) {
      throw JSError(runtime, jscdirect::valueToUtf8(runtime.context(), exception));
    }
    return Value(runtime, result);
  }

  Value getProperty(Runtime& runtime, const std::string& name) const {
    return getProperty(runtime, name.c_str());
  }

  Value getProperty(Runtime& runtime, const Value& key) const {
    JSValueRef exception = nullptr;
    JSValueRef result =
        JSObjectGetPropertyForKey(runtime.context(), local(runtime),
                                  key.local(runtime), &exception);
    if (exception != nullptr) {
      throw JSError(runtime, jscdirect::valueToUtf8(runtime.context(), exception));
    }
    return Value(runtime, result);
  }

  Object getPropertyAsObject(Runtime& runtime, const char* name) const {
    return getProperty(runtime, name).asObject(runtime);
  }

  Function getPropertyAsFunction(Runtime& runtime, const char* name) const;

  void setProperty(Runtime& runtime, const char* name, const Value& value) {
    JSStringRef property = jscdirect::makeJSString(name);
    JSValueRef exception = nullptr;
    JSObjectSetProperty(runtime.context(), local(runtime), property,
                        value.local(runtime), kJSPropertyAttributeNone,
                        &exception);
    JSStringRelease(property);
    if (exception != nullptr) {
      throw JSError(runtime, jscdirect::valueToUtf8(runtime.context(), exception));
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
    JSValueRef exception = nullptr;
    JSObjectSetPropertyForKey(runtime.context(), local(runtime), key.local(runtime),
                              value.local(runtime), kJSPropertyAttributeNone,
                              &exception);
    if (exception != nullptr) {
      throw JSError(runtime, jscdirect::valueToUtf8(runtime.context(), exception));
    }
  }

  bool hasProperty(Runtime& runtime, const char* name) const {
    JSStringRef property = jscdirect::makeJSString(name);
    bool result = JSObjectHasProperty(runtime.context(), local(runtime), property);
    JSStringRelease(property);
    return result;
  }

  bool isFunction(Runtime& runtime) const {
    return JSObjectIsFunction(runtime.context(), local(runtime));
  }

  bool isArray(Runtime& runtime) const {
    JSStringRef name = jscdirect::makeJSString("Array");
    JSValueRef constructorValue =
        JSObjectGetProperty(runtime.context(),
                            JSContextGetGlobalObject(runtime.context()), name,
                            nullptr);
    JSStringRelease(name);
    if (constructorValue == nullptr ||
        !JSValueIsObject(runtime.context(), constructorValue)) {
      return false;
    }
    JSObjectRef constructor =
        JSValueToObject(runtime.context(), constructorValue, nullptr);
    JSValueRef exception = nullptr;
    bool result = JSValueIsInstanceOfConstructor(runtime.context(),
                                                local(runtime), constructor,
                                                &exception);
    return exception == nullptr && result;
  }

  bool isArrayBuffer(Runtime& runtime) const {
    JSValueRef exception = nullptr;
    JSTypedArrayType type =
        JSValueGetTypedArrayType(runtime.context(), storage_->value, &exception);
    return exception == nullptr && type == kJSTypedArrayTypeArrayBuffer;
  }

  Function asFunction(Runtime& runtime) const;
  Array getArray(Runtime& runtime) const;
  ArrayBuffer getArrayBuffer(Runtime& runtime) const;
  Array getPropertyNames(Runtime& runtime) const;

  template <typename T>
  bool isHostObject(Runtime& runtime) const {
    auto holder = hostObjectHolder(runtime);
    return holder != nullptr &&
           holder->typeToken == jscdirect::hostObjectTypeToken<T>();
  }

  template <typename T>
  std::shared_ptr<T> getHostObject(Runtime& runtime) const {
    auto holder = hostObjectHolder(runtime);
    if (holder == nullptr ||
        holder->typeToken != jscdirect::hostObjectTypeToken<T>()) {
      return nullptr;
    }
    return std::static_pointer_cast<T>(holder->hostObject);
  }

  JSObjectRef local(Runtime& runtime) const {
    return reinterpret_cast<JSObjectRef>(const_cast<OpaqueJSValue*>(storage_->value));
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

  explicit Object(std::shared_ptr<jscdirect::ValueStorage> storage)
      : storage_(std::move(storage)) {}

  static Object createFromHostObjectWithToken(Runtime& runtime,
                                              std::shared_ptr<HostObject> host,
                                              const void* typeToken);

  jscdirect::HostObjectHolder* hostObjectHolder(Runtime& runtime) const {
    return static_cast<jscdirect::HostObjectHolder*>(
        JSObjectGetPrivate(local(runtime)));
  }

  std::shared_ptr<jscdirect::ValueStorage> storage_;
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
    std::vector<JSValueRef> argv;
    argv.reserve(count);
    for (size_t i = 0; i < count; i++) {
      argv.push_back(args[i].local(runtime));
    }
    JSValueRef exception = nullptr;
    JSValueRef result = JSObjectCallAsFunction(
        runtime.context(), local(runtime), JSContextGetGlobalObject(runtime.context()),
        argv.size(), argv.empty() ? nullptr : argv.data(), &exception);
    if (exception != nullptr) {
      throw JSError(runtime, jscdirect::valueToUtf8(runtime.context(), exception));
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
    std::vector<JSValueRef> argv;
    argv.reserve(count);
    for (size_t i = 0; i < count; i++) {
      argv.push_back(args[i].local(runtime));
    }
    JSValueRef exception = nullptr;
    JSValueRef result = JSObjectCallAsFunction(
        runtime.context(), local(runtime), thisObject.local(runtime), argv.size(),
        argv.empty() ? nullptr : argv.data(), &exception);
    if (exception != nullptr) {
      throw JSError(runtime, jscdirect::valueToUtf8(runtime.context(), exception));
    }
    return Value(runtime, result);
  }

  Value callAsConstructor(Runtime& runtime, const Value* args,
                          size_t count) const {
    std::vector<JSValueRef> argv;
    argv.reserve(count);
    for (size_t i = 0; i < count; i++) {
      argv.push_back(args[i].local(runtime));
    }
    JSValueRef exception = nullptr;
    JSValueRef result = JSObjectCallAsConstructor(
        runtime.context(), local(runtime), argv.size(),
        argv.empty() ? nullptr : argv.data(), &exception);
    if (exception != nullptr) {
      throw JSError(runtime, jscdirect::valueToUtf8(runtime.context(), exception));
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
};

class Array : public Object {
 public:
  explicit Array(Runtime& runtime, size_t size)
      : Object(std::make_shared<jscdirect::ValueStorage>(
            jscdirect::ValueStorage::Kind::JSC)) {
    std::vector<JSValueRef> initial(size, JSValueMakeUndefined(runtime.context()));
    JSValueRef exception = nullptr;
    storage_->context = runtime.context();
    storage_->value =
        JSObjectMakeArray(runtime.context(), initial.size(), initial.data(), &exception);
    if (exception != nullptr) {
      throw JSError(runtime, jscdirect::valueToUtf8(runtime.context(), exception));
    }
    JSValueProtect(runtime.context(), storage_->value);
  }

  explicit Array(Object object) : Object(std::move(object.storage_)) {}

  size_t size(Runtime& runtime) const {
    Value length = getProperty(runtime, "length");
    return length.isNumber()
               ? static_cast<size_t>(std::max<double>(0, length.getNumber()))
               : 0;
  }

  Value getValueAtIndex(Runtime& runtime, size_t index) const {
    JSValueRef exception = nullptr;
    JSValueRef result = JSObjectGetPropertyAtIndex(
        runtime.context(), local(runtime), static_cast<unsigned>(index), &exception);
    if (exception != nullptr) {
      throw JSError(runtime, jscdirect::valueToUtf8(runtime.context(), exception));
    }
    return Value(runtime, result);
  }

  void setValueAtIndex(Runtime& runtime, size_t index, const Value& value) {
    JSValueRef exception = nullptr;
    JSObjectSetPropertyAtIndex(runtime.context(), local(runtime),
                               static_cast<unsigned>(index), value.local(runtime),
                               &exception);
    if (exception != nullptr) {
      throw JSError(runtime, jscdirect::valueToUtf8(runtime.context(), exception));
    }
  }
  void setValueAtIndex(Runtime& runtime, size_t index, const String& value) {
    setValueAtIndex(runtime, index, Value(runtime, value));
  }
};

class BigInt {
 public:
  BigInt() = default;
  BigInt(Runtime& runtime, JSValueRef value)
      : storage_(std::make_shared<jscdirect::ValueStorage>(
            jscdirect::ValueStorage::Kind::JSC)) {
    storage_->context = runtime.context();
    storage_->value = value;
    JSValueProtect(runtime.context(), storage_->value);
  }

  static BigInt fromInt64(Runtime& runtime, int64_t value) {
    JSValueRef exception = nullptr;
    JSValueRef result = nullptr;
    if (__builtin_available(macOS 15.0, iOS 18.0, *)) {
      result = JSBigIntCreateWithInt64(runtime.context(), value, &exception);
    }
    if (result == nullptr || exception != nullptr) {
      result = JSValueMakeNumber(runtime.context(), static_cast<double>(value));
    }
    return BigInt(runtime, result);
  }

  static BigInt fromUint64(Runtime& runtime, uint64_t value) {
    JSValueRef exception = nullptr;
    JSValueRef result = nullptr;
    if (__builtin_available(macOS 15.0, iOS 18.0, *)) {
      result = JSBigIntCreateWithUInt64(runtime.context(), value, &exception);
    }
    if (result == nullptr || exception != nullptr) {
      result = JSValueMakeNumber(runtime.context(), static_cast<double>(value));
    }
    return BigInt(runtime, result);
  }

  String toString(Runtime& runtime, int) const {
    JSValueRef exception = nullptr;
    JSStringRef string = JSValueToStringCopy(runtime.context(), local(runtime), &exception);
    if (string == nullptr || exception != nullptr) {
      throw JSError(runtime, jscdirect::valueToUtf8(runtime.context(), exception));
    }
    String result(runtime, string);
    JSStringRelease(string);
    return result;
  }

  JSValueRef local(Runtime& runtime) const { return storage_->value; }

  operator Value() const {
    Value value;
    value.storage_ = storage_;
    return value;
  }

 private:
  friend class Value;
  std::shared_ptr<jscdirect::ValueStorage> storage_;
};

class ArrayBuffer : public Object {
 public:
  ArrayBuffer(Runtime& runtime, std::shared_ptr<MutableBuffer> buffer)
      : Object(std::make_shared<jscdirect::ValueStorage>(
            jscdirect::ValueStorage::Kind::JSC)) {
    auto* holder = new jscdirect::ArrayBufferHolder(std::move(buffer));
    JSValueRef exception = nullptr;
    storage_->context = runtime.context();
    storage_->value = JSObjectMakeArrayBufferWithBytesNoCopy(
        runtime.context(), holder->buffer->data(), holder->buffer->size(),
        [](void*, void* deallocatorContext) {
          delete static_cast<jscdirect::ArrayBufferHolder*>(deallocatorContext);
        },
        holder, &exception);
    if (exception != nullptr) {
      delete holder;
      throw JSError(runtime, jscdirect::valueToUtf8(runtime.context(), exception));
    }
    JSValueProtect(runtime.context(), storage_->value);
  }

  explicit ArrayBuffer(Object object) : Object(std::move(object.storage_)) {}

  size_t size(Runtime& runtime) const {
    JSValueRef exception = nullptr;
    return JSObjectGetArrayBufferByteLength(runtime.context(), local(runtime),
                                            &exception);
  }

  uint8_t* data(Runtime& runtime) const {
    JSValueRef exception = nullptr;
    return static_cast<uint8_t*>(
        JSObjectGetArrayBufferBytesPtr(runtime.context(), local(runtime),
                                       &exception));
  }
};

inline Value HostObject::get(Runtime&, const PropNameID&) {
  return Value::undefined();
}
inline void HostObject::set(Runtime&, const PropNameID&, const Value&) {}
inline std::vector<PropNameID> HostObject::getPropertyNames(Runtime&) {
  return {};
}

inline String::String(Runtime& runtime, JSStringRef string)
    : storage_(std::make_shared<jscdirect::ValueStorage>(
          jscdirect::ValueStorage::Kind::JSC)) {
  storage_->context = runtime.context();
  storage_->value = JSValueMakeString(runtime.context(), string);
  JSValueProtect(runtime.context(), storage_->value);
}

inline std::string String::utf8(Runtime& runtime) const {
  return jscdirect::valueToUtf8(runtime.context(), storage_->value);
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
  JSValueRef exception = nullptr;
  JSStringRef string = JSValueToStringCopy(runtime.context(), local(runtime), &exception);
  if (string == nullptr || exception != nullptr) {
    throw JSError(runtime, jscdirect::valueToUtf8(runtime.context(), exception));
  }
  String result(runtime, string);
  JSStringRelease(string);
  return result;
}

inline BigInt Value::getBigInt(Runtime& runtime) const {
  return BigInt(runtime, local(runtime));
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
  JSPropertyNameArrayRef propertyNames =
      JSObjectCopyPropertyNames(runtime.context(), local(runtime));
  size_t count = JSPropertyNameArrayGetCount(propertyNames);
  Array result(runtime, count);
  for (size_t i = 0; i < count; i++) {
    JSStringRef name = JSPropertyNameArrayGetNameAtIndex(propertyNames, i);
    result.setValueAtIndex(runtime, i, String(runtime, name));
  }
  JSPropertyNameArrayRelease(propertyNames);
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

namespace jscdirect {

inline JSClassRef hostClass(Runtime& runtime);
inline JSClassRef functionClass(Runtime& runtime);

inline JSValueRef hostGetProperty(JSContextRef context, JSObjectRef object,
                                  JSStringRef propertyName,
                                  JSValueRef* exception) {
  auto* holder = static_cast<HostObjectHolder*>(JSObjectGetPrivate(object));
  if (holder == nullptr || holder->hostObject == nullptr) {
    return nullptr;
  }
  Runtime runtime(holder->state);
  try {
    Value result =
        holder->hostObject->get(runtime, PropNameID(stringToUtf8(propertyName)));
    return result.isUndefined() ? nullptr : result.local(runtime);
  } catch (const std::exception& error) {
    setException(context, exception, error);
    return JSValueMakeUndefined(context);
  }
}

inline bool hostSetProperty(JSContextRef context, JSObjectRef object,
                            JSStringRef propertyName, JSValueRef value,
                            JSValueRef* exception) {
  auto* holder = static_cast<HostObjectHolder*>(JSObjectGetPrivate(object));
  if (holder == nullptr || holder->hostObject == nullptr) {
    return false;
  }
  Runtime runtime(holder->state);
  try {
    holder->hostObject->set(runtime, PropNameID(stringToUtf8(propertyName)),
                            Value(runtime, value));
    return true;
  } catch (const std::exception& error) {
    setException(context, exception, error);
    return true;
  }
}

inline void hostGetPropertyNames(JSContextRef, JSObjectRef object,
                                 JSPropertyNameAccumulatorRef propertyNames) {
  auto* holder = static_cast<HostObjectHolder*>(JSObjectGetPrivate(object));
  if (holder == nullptr || holder->hostObject == nullptr) {
    return;
  }
  Runtime runtime(holder->state);
  try {
    for (const auto& property : holder->hostObject->getPropertyNames(runtime)) {
      JSStringRef name = makeJSString(property.utf8(runtime));
      JSPropertyNameAccumulatorAddName(propertyNames, name);
      JSStringRelease(name);
    }
  } catch (const std::exception&) {
  }
}

inline void hostFinalize(JSObjectRef object) {
  delete static_cast<HostObjectHolder*>(JSObjectGetPrivate(object));
}

inline JSValueRef functionCall(JSContextRef context, JSObjectRef function,
                               JSObjectRef thisObject, size_t argumentCount,
                               const JSValueRef arguments[],
                               JSValueRef* exception) {
  auto* holder = static_cast<FunctionHolder*>(JSObjectGetPrivate(function));
  if (holder == nullptr || !holder->callback) {
    return JSValueMakeUndefined(context);
  }
  Runtime runtime(holder->state);
  std::vector<Value> args;
  args.reserve(argumentCount);
  for (size_t i = 0; i < argumentCount; i++) {
    args.emplace_back(runtime, arguments[i]);
  }
  try {
    Value thisValue(runtime, thisObject);
    Value result = holder->callback(
        runtime, thisValue, args.empty() ? nullptr : args.data(), args.size());
    return result.local(runtime);
  } catch (const std::exception& error) {
    setException(context, exception, error);
    return JSValueMakeUndefined(context);
  }
}

inline void functionFinalize(JSObjectRef object) {
  delete static_cast<FunctionHolder*>(JSObjectGetPrivate(object));
}

inline JSClassRef hostClass(Runtime& runtime) {
  auto state = runtime.state();
  if (state->hostClass == nullptr) {
    JSClassDefinition definition = kJSClassDefinitionEmpty;
    definition.className = "NativeScriptDirectHostObject";
    definition.getProperty = hostGetProperty;
    definition.setProperty = hostSetProperty;
    definition.getPropertyNames = hostGetPropertyNames;
    definition.finalize = hostFinalize;
    state->hostClass = JSClassCreate(&definition);
  }
  return state->hostClass;
}

inline JSClassRef functionClass(Runtime& runtime) {
  auto state = runtime.state();
  if (state->functionClass == nullptr) {
    JSClassDefinition definition = kJSClassDefinitionEmpty;
    definition.className = "NativeScriptDirectFunction";
    definition.callAsFunction = functionCall;
    definition.finalize = functionFinalize;
    state->functionClass = JSClassCreate(&definition);
  }
  return state->functionClass;
}

inline void setFunctionPrototype(JSGlobalContextRef context, JSObjectRef function) {
  if (context == nullptr || function == nullptr) {
    return;
  }

  JSValueRef exception = nullptr;
  JSStringRef functionName = makeJSString("Function");
  JSValueRef functionValue = JSObjectGetProperty(
      context, JSContextGetGlobalObject(context), functionName, &exception);
  JSStringRelease(functionName);
  if (exception != nullptr || functionValue == nullptr ||
      !JSValueIsObject(context, functionValue)) {
    return;
  }

  exception = nullptr;
  JSObjectRef functionConstructor =
      JSValueToObject(context, functionValue, &exception);
  if (exception != nullptr || functionConstructor == nullptr) {
    return;
  }

  JSStringRef prototypeName = makeJSString("prototype");
  JSValueRef prototypeValue =
      JSObjectGetProperty(context, functionConstructor, prototypeName, &exception);
  JSStringRelease(prototypeName);
  if (exception != nullptr || prototypeValue == nullptr ||
      !JSValueIsObject(context, prototypeValue)) {
    return;
  }

  JSObjectSetPrototype(context, function, prototypeValue);
}

}  // namespace jscdirect

inline Object Object::createFromHostObjectWithToken(
    Runtime& runtime, std::shared_ptr<HostObject> host, const void* typeToken) {
  auto* holder = new jscdirect::HostObjectHolder(runtime.state(), std::move(host),
                                                 typeToken);
  JSObjectRef object =
      JSObjectMake(runtime.context(), jscdirect::hostClass(runtime), holder);
  return Object::fromValueStorage(Value(runtime, object).storage_);
}

inline Function Function::createFromHostFunction(Runtime& runtime,
                                                 const PropNameID& name,
                                                 unsigned int,
                                                 HostFunctionType callback) {
  auto* holder =
      new jscdirect::FunctionHolder(runtime.state(), std::move(callback));
  JSObjectRef function =
      JSObjectMake(runtime.context(), jscdirect::functionClass(runtime), holder);
  jscdirect::setFunctionPrototype(runtime.context(), function);
  std::string functionName = name.utf8(runtime);
  if (!functionName.empty()) {
    JSStringRef property = jscdirect::makeJSString("name");
    JSStringRef valueString = jscdirect::makeJSString(functionName);
    JSValueRef value = JSValueMakeString(runtime.context(), valueString);
    JSObjectSetProperty(runtime.context(), function, property, value,
                        kJSPropertyAttributeReadOnly, nullptr);
    JSStringRelease(valueString);
    JSStringRelease(property);
  }
  return Function(Object::fromValueStorage(Value(runtime, function).storage_));
}

inline Object Runtime::global() {
  return Object::fromValueStorage(
      Value(*this, JSContextGetGlobalObject(context())).storage_);
}

inline Value Runtime::evaluateJavaScript(std::shared_ptr<StringBuffer> buffer,
                                         const std::string& sourceURL) {
  JSStringRef source = JSStringCreateWithUTF8CString(
      buffer != nullptr ? std::string(buffer->data(), buffer->size()).c_str()
                        : "");
  JSStringRef url = jscdirect::makeJSString(sourceURL);
  JSValueRef exception = nullptr;
  JSValueRef result = JSEvaluateScript(context(), source, nullptr, url, 1,
                                       &exception);
  JSStringRelease(source);
  JSStringRelease(url);
  if (exception != nullptr) {
    throw JSError(*this, jscdirect::valueToUtf8(context(), exception));
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
#include "../hermes/jsi/NativeApiJsiHostObjects.inc"
#define NATIVESCRIPT_NATIVE_API_RETAIN_RUNTIME 1

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

void InstallNativeApiJSC(JSGlobalContextRef context,
                         const NativeApiJSCConfig& config) {
  if (context == nullptr) {
    return;
  }
  Runtime runtime(context);
  InstallNativeApiJSI(runtime, config);
}

}  // namespace nativescript

extern "C" void NativeScriptInstallNativeApiJSC(JSGlobalContextRef context,
                                                 const char* metadataPath) {
  nativescript::NativeApiJSCConfig config;
  config.metadataPath = metadataPath;
  nativescript::InstallNativeApiJSC(context, config);
}

#endif  // TARGET_ENGINE_JSC

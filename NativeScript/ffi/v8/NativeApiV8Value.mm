#include "NativeApiV8Runtime.h"

#ifdef TARGET_ENGINE_V8

namespace nativescript {
namespace engine {

Value HostObject::get(Runtime&, const PropNameID&) { return Value::undefined(); }

bool HostObject::set(Runtime&, const PropNameID&, const Value&) { return true; }

std::vector<PropNameID> HostObject::getPropertyNames(Runtime&) { return {}; }

String::String(Runtime& runtime, v8::Local<v8::String> value)
    : storage_(std::make_shared<v8engine::ValueStorage>(v8engine::ValueStorage::Kind::V8)) {
  storage_->value.Reset(runtime.isolate(), value);
}

String::operator Value() const {
  Value value;
  value.storage_ = storage_;
  return value;
}

Value::Value(Runtime&, const Object& object) : storage_(object.storage_) {}
Value::Value(Runtime&, const Function& function) : storage_(function.storage_) {}
Value::Value(Runtime&, const Array& array) : storage_(array.storage_) {}
Value::Value(Runtime&, const ArrayBuffer& arrayBuffer) : storage_(arrayBuffer.storage_) {}
Value::Value(Runtime&, const BigInt& bigint) : storage_(bigint.storage_) {}

bool Value::isObject() const {
  if (storage_->kind == v8engine::ValueStorage::Kind::V8Borrowed) {
    return !storage_->borrowedValue.IsEmpty() && storage_->borrowedValue->IsObject();
  }
  if (storage_->kind != v8engine::ValueStorage::Kind::V8 || storage_->value.IsEmpty()) {
    return false;
  }
  v8::Isolate* isolate = v8::Isolate::GetCurrent();
  return isolate != nullptr && storage_->value.Get(isolate)->IsObject();
}

bool Value::isUndefined() const {
  if (storage_->kind == v8engine::ValueStorage::Kind::Undefined) {
    return true;
  }
  if (storage_->kind == v8engine::ValueStorage::Kind::V8Borrowed) {
    return storage_->borrowedValue.IsEmpty() || storage_->borrowedValue->IsUndefined();
  }
  if (storage_->kind != v8engine::ValueStorage::Kind::V8 || storage_->value.IsEmpty()) {
    return false;
  }
  v8::Isolate* isolate = v8::Isolate::GetCurrent();
  return isolate != nullptr && storage_->value.Get(isolate)->IsUndefined();
}

bool Value::isNull() const {
  if (storage_->kind == v8engine::ValueStorage::Kind::Null) {
    return true;
  }
  if (storage_->kind == v8engine::ValueStorage::Kind::V8Borrowed) {
    return !storage_->borrowedValue.IsEmpty() && storage_->borrowedValue->IsNull();
  }
  if (storage_->kind != v8engine::ValueStorage::Kind::V8 || storage_->value.IsEmpty()) {
    return false;
  }
  v8::Isolate* isolate = v8::Isolate::GetCurrent();
  return isolate != nullptr && storage_->value.Get(isolate)->IsNull();
}

bool Value::isBool() const {
  if (storage_->kind == v8engine::ValueStorage::Kind::Bool) {
    return true;
  }
  if (storage_->kind == v8engine::ValueStorage::Kind::V8Borrowed) {
    return !storage_->borrowedValue.IsEmpty() && storage_->borrowedValue->IsBoolean();
  }
  if (storage_->kind != v8engine::ValueStorage::Kind::V8 || storage_->value.IsEmpty()) {
    return false;
  }
  v8::Isolate* isolate = v8::Isolate::GetCurrent();
  return isolate != nullptr && storage_->value.Get(isolate)->IsBoolean();
}

bool Value::getBool() const {
  if (storage_->kind == v8engine::ValueStorage::Kind::Bool) {
    return storage_->boolValue;
  }
  if (storage_->kind == v8engine::ValueStorage::Kind::V8Borrowed) {
    v8::Isolate* isolate = v8::Isolate::GetCurrent();
    return isolate != nullptr && !storage_->borrowedValue.IsEmpty()
               ? storage_->borrowedValue->BooleanValue(isolate)
               : false;
  }
  if (storage_->kind == v8engine::ValueStorage::Kind::V8 && !storage_->value.IsEmpty()) {
    v8::Isolate* isolate = v8::Isolate::GetCurrent();
    if (isolate != nullptr) {
      return storage_->value.Get(isolate)->BooleanValue(isolate);
    }
  }
  return false;
}

bool Value::isNumber() const {
  if (storage_->kind == v8engine::ValueStorage::Kind::Number) {
    return true;
  }
  if (storage_->kind == v8engine::ValueStorage::Kind::V8Borrowed) {
    return !storage_->borrowedValue.IsEmpty() && storage_->borrowedValue->IsNumber();
  }
  if (storage_->kind != v8engine::ValueStorage::Kind::V8 || storage_->value.IsEmpty()) {
    return false;
  }
  v8::Isolate* isolate = v8::Isolate::GetCurrent();
  return isolate != nullptr && storage_->value.Get(isolate)->IsNumber();
}

double Value::getNumber() const {
  if (storage_->kind == v8engine::ValueStorage::Kind::Number) {
    return storage_->numberValue;
  }
  if (storage_->kind == v8engine::ValueStorage::Kind::V8Borrowed) {
    v8::Isolate* isolate = v8::Isolate::GetCurrent();
    if (isolate != nullptr && !storage_->borrowedValue.IsEmpty()) {
      return storage_->borrowedValue->NumberValue(isolate->GetCurrentContext()).FromMaybe(0);
    }
    return 0;
  }
  if (storage_->kind == v8engine::ValueStorage::Kind::V8 && !storage_->value.IsEmpty()) {
    v8::Isolate* isolate = v8::Isolate::GetCurrent();
    if (isolate != nullptr) {
      return storage_->value.Get(isolate)->NumberValue(isolate->GetCurrentContext()).FromMaybe(0);
    }
  }
  return 0;
}

bool Value::isString() const {
  if (storage_->kind == v8engine::ValueStorage::Kind::V8Borrowed) {
    return !storage_->borrowedValue.IsEmpty() && storage_->borrowedValue->IsString();
  }
  if (storage_->kind != v8engine::ValueStorage::Kind::V8 || storage_->value.IsEmpty()) {
    return false;
  }
  v8::Isolate* isolate = v8::Isolate::GetCurrent();
  return storage_->value.Get(isolate)->IsString();
}

bool Value::isBigInt() const {
  if (storage_->kind == v8engine::ValueStorage::Kind::V8Borrowed) {
    return !storage_->borrowedValue.IsEmpty() && storage_->borrowedValue->IsBigInt();
  }
  if (storage_->kind != v8engine::ValueStorage::Kind::V8 || storage_->value.IsEmpty()) {
    return false;
  }
  v8::Isolate* isolate = v8::Isolate::GetCurrent();
  return storage_->value.Get(isolate)->IsBigInt();
}

bool Value::isSymbol() const {
  if (storage_->kind == v8engine::ValueStorage::Kind::V8Borrowed) {
    return !storage_->borrowedValue.IsEmpty() && storage_->borrowedValue->IsSymbol();
  }
  if (storage_->kind != v8engine::ValueStorage::Kind::V8 || storage_->value.IsEmpty()) {
    return false;
  }
  v8::Isolate* isolate = v8::Isolate::GetCurrent();
  return storage_->value.Get(isolate)->IsSymbol();
}

Object Value::asObject(Runtime& runtime) const { return Object::fromValueStorage(storage_); }

String Value::asString(Runtime& runtime) const {
  return String(runtime, local(runtime).As<v8::String>());
}

BigInt Value::getBigInt(Runtime& runtime) const {
  return BigInt(runtime, local(runtime).As<v8::BigInt>());
}

Function Object::getPropertyAsFunction(Runtime& runtime, const char* name) const {
  return getProperty(runtime, name).asObject(runtime).asFunction(runtime);
}

Function Object::asFunction(Runtime& runtime) const { return Function(*this); }

Array Object::getArray(Runtime& runtime) const { return Array(*this); }

ArrayBuffer Object::getArrayBuffer(Runtime& runtime) const { return ArrayBuffer(*this); }

Array Object::getPropertyNames(Runtime& runtime) const {
  v8::TryCatch tryCatch(runtime.isolate());
  v8::Local<v8::Array> result;
  if (!local(runtime)->GetPropertyNames(runtime.context()).ToLocal(&result)) {
    throw JSError(runtime, v8engine::currentExceptionMessage(runtime.isolate(), tryCatch));
  }
  return Array(Object::fromValueStorage(Value(runtime, result).storage_));
}

void Object::setProperty(Runtime& runtime, const char* name, const Function& value) {
  setProperty(runtime, name, Value(runtime, value));
}

void Object::setProperty(Runtime& runtime, const char* name, const Array& value) {
  setProperty(runtime, name, Value(runtime, value));
}

void Object::setProperty(Runtime& runtime, const char* name, const ArrayBuffer& value) {
  setProperty(runtime, name, Value(runtime, value));
}

}  // namespace engine
}  // namespace nativescript

#endif  // TARGET_ENGINE_V8

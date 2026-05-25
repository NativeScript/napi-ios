#include "NativeApiV8Runtime.h"

#ifdef TARGET_ENGINE_V8

namespace facebook {
namespace jsi {

Object Runtime::global() {
  return Object::fromValueStorage(Value(*this, context()->Global()).storage_);
}

Value Runtime::evaluateJavaScript(std::shared_ptr<StringBuffer> buffer,
                                  const std::string& sourceURL) {
  v8::TryCatch tryCatch(isolate());
  v8::Local<v8::String> source =
      v8::String::NewFromUtf8(isolate(), buffer != nullptr ? buffer->data() : "",
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

#endif  // TARGET_ENGINE_V8

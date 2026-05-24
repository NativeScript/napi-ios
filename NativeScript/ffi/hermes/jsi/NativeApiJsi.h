#ifndef NATIVE_API_JSI_H
#define NATIVE_API_JSI_H

#include <functional>
#include <memory>
#include <utility>

#include <jsi/jsi.h>

namespace nativescript {

class NativeApiJsiScheduler {
 public:
  virtual ~NativeApiJsiScheduler() = default;
  virtual void invokeOnJS(std::function<void()> task) = 0;
  virtual void invokeOnUI(std::function<void()> task) = 0;
};

struct NativeApiJsiConfig {
  const char* metadataPath = nullptr;
  const void* metadataPtr = nullptr;
  const char* globalName = "__nativeScriptNativeApi";
  std::shared_ptr<NativeApiJsiScheduler> scheduler = nullptr;
};

facebook::jsi::Object CreateNativeApiJSI(
    facebook::jsi::Runtime& runtime,
    const NativeApiJsiConfig& config = NativeApiJsiConfig{});

void InstallNativeApiJSI(
    facebook::jsi::Runtime& runtime,
    const NativeApiJsiConfig& config = NativeApiJsiConfig{});

}  // namespace nativescript

extern "C" void NativeScriptInstallNativeApiJSI(
    facebook::jsi::Runtime* runtime, const char* metadataPath);

#endif  // NATIVE_API_JSI_H

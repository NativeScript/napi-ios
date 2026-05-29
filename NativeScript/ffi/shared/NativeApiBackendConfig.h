#ifndef NATIVESCRIPT_FFI_SHARED_NATIVE_API_BACKEND_CONFIG_H
#define NATIVESCRIPT_FFI_SHARED_NATIVE_API_BACKEND_CONFIG_H

#include <functional>
#include <memory>

namespace nativescript {

class NativeApiBackendScheduler {
 public:
  virtual ~NativeApiBackendScheduler() = default;
  virtual void invokeOnJS(std::function<void()> task) = 0;
  virtual void invokeOnUI(std::function<void()> task) = 0;
};

struct NativeApiBackendConfig {
  const char* metadataPath = nullptr;
  const void* metadataPtr = nullptr;
  const char* globalName = "__nativeScriptNativeApi";
  std::shared_ptr<NativeApiBackendScheduler> scheduler = nullptr;
  std::function<void(std::function<void()>)> nativeInvocationInvoker = nullptr;
  std::function<void(std::function<void()>)> nativeCallbackInvoker = nullptr;
  std::function<void(std::function<void()>)> jsThreadCallbackInvoker = nullptr;
  bool invokeCallbacksOnNativeCallerThread = false;
  bool installGlobalSymbols = false;
};

}  // namespace nativescript

#endif  // NATIVESCRIPT_FFI_SHARED_NATIVE_API_BACKEND_CONFIG_H

#ifndef NATIVESCRIPT_FFI_QUICKJS_NATIVE_API_QUICKJS_H
#define NATIVESCRIPT_FFI_QUICKJS_NATIVE_API_QUICKJS_H

#include "ffi/shared/NativeApiBackendConfig.h"
#include "quickjs.h"

namespace nativescript {

using NativeApiQuickJSScheduler = NativeApiBackendScheduler;
using NativeApiQuickJSConfig = NativeApiBackendConfig;

void InstallNativeApiQuickJS(JSContext* context,
                             const NativeApiQuickJSConfig& config =
                                 NativeApiQuickJSConfig{});

}  // namespace nativescript

extern "C" void NativeScriptInstallNativeApiQuickJS(JSContext* context,
                                                     const char* metadataPath);

#endif  // NATIVESCRIPT_FFI_QUICKJS_NATIVE_API_QUICKJS_H

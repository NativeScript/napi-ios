#ifndef NATIVESCRIPT_FFI_JSC_NATIVE_API_JSC_H
#define NATIVESCRIPT_FFI_JSC_NATIVE_API_JSC_H

#include "ffi/shared/NativeApiBackendConfig.h"
#include <JavaScriptCore/JavaScript.h>

namespace nativescript {

using NativeApiJSCScheduler = NativeApiBackendScheduler;
using NativeApiJSCConfig = NativeApiBackendConfig;

void InstallNativeApiJSC(JSGlobalContextRef context,
                         const NativeApiJSCConfig& config = NativeApiJSCConfig{});

}  // namespace nativescript

extern "C" void NativeScriptInstallNativeApiJSC(JSGlobalContextRef context,
                                                 const char* metadataPath);

#endif  // NATIVESCRIPT_FFI_JSC_NATIVE_API_JSC_H

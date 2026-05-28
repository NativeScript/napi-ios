#ifndef NATIVESCRIPT_FFI_JSC_NATIVE_API_JSC_H
#define NATIVESCRIPT_FFI_JSC_NATIVE_API_JSC_H

#include "ffi/direct/NativeApiDirect.h"
#include <JavaScriptCore/JavaScript.h>

namespace nativescript {

using NativeApiJSCConfig = NativeApiDirectConfig;

void InstallNativeApiJSC(JSGlobalContextRef context,
                         const NativeApiJSCConfig& config = NativeApiJSCConfig{});

}  // namespace nativescript

extern "C" void NativeScriptInstallNativeApiJSC(JSGlobalContextRef context,
                                                 const char* metadataPath);

#endif  // NATIVESCRIPT_FFI_JSC_NATIVE_API_JSC_H

#ifndef NATIVESCRIPT_FFI_QUICKJS_NATIVE_API_QUICKJS_H
#define NATIVESCRIPT_FFI_QUICKJS_NATIVE_API_QUICKJS_H

#include "ffi/shared/direct/NativeApiDirect.h"
#include "quickjs.h"

namespace nativescript {

using NativeApiQuickJSConfig = NativeApiDirectConfig;

void InstallNativeApiQuickJS(JSContext* context,
                             const NativeApiQuickJSConfig& config =
                                 NativeApiQuickJSConfig{});

}  // namespace nativescript

extern "C" void NativeScriptInstallNativeApiQuickJS(JSContext* context,
                                                     const char* metadataPath);

#endif  // NATIVESCRIPT_FFI_QUICKJS_NATIVE_API_QUICKJS_H

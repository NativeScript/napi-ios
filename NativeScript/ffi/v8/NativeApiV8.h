#ifndef NATIVESCRIPT_FFI_V8_NATIVE_API_V8_H
#define NATIVESCRIPT_FFI_V8_NATIVE_API_V8_H

#include "ffi/shared/NativeApiBackendConfig.h"
#include "v8.h"

namespace nativescript {

using NativeApiV8Scheduler = NativeApiBackendScheduler;
using NativeApiV8Config = NativeApiBackendConfig;

void InstallNativeApiV8(v8::Isolate* isolate,
                        v8::Local<v8::Context> context,
                        const NativeApiV8Config& config = NativeApiV8Config{});

}  // namespace nativescript

extern "C" void NativeScriptInstallNativeApiV8(v8::Isolate* isolate,
                                                v8::Local<v8::Context> context,
                                                const char* metadataPath);

#endif  // NATIVESCRIPT_FFI_V8_NATIVE_API_V8_H

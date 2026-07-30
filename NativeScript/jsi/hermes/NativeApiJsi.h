#ifndef NATIVE_API_JSI_H
#define NATIVE_API_JSI_H

#include <jsi/jsi.h>

#include "jsi/shared/NativeApiBackendConfig.h"

namespace nativescript {

using NativeApiJsiScheduler = NativeApiBackendScheduler;
using NativeApiJsiConfig = NativeApiBackendConfig;

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

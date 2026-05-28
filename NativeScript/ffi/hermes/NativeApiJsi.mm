#include "NativeApiJsi.h"

#ifdef TARGET_ENGINE_HERMES

#import <Foundation/Foundation.h>
#include <dispatch/dispatch.h>
#include <dlfcn.h>
#include <mach-o/dyld.h>
#include <mach-o/getsect.h>
#include <objc/message.h>
#include <objc/runtime.h>

#include <algorithm>
#include <atomic>
#include <cctype>
#include <cmath>
#include <cstdint>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <limits>
#include <memory>
#include <mutex>
#include <optional>
#include <stdexcept>
#include <string>
#include <thread>
#include <unordered_map>
#include <unordered_set>
#include <vector>

#include "Metadata.h"
#include "MetadataReader.h"
#include "ffi.h"
#include "NativeApiJsiSignatureDispatch.h"

@protocol NativeApiDirectClassBuilderProtocol
@end

#ifdef EMBED_METADATA_SIZE
extern const unsigned char embedded_metadata[EMBED_METADATA_SIZE];
#endif

namespace nativescript {
namespace {

using facebook::jsi::Array;
using facebook::jsi::ArrayBuffer;
using facebook::jsi::BigInt;
using facebook::jsi::Function;
using facebook::jsi::HostObject;
using facebook::jsi::MutableBuffer;
using facebook::jsi::Object;
using facebook::jsi::PropNameID;
using facebook::jsi::Runtime;
using facebook::jsi::String;
using facebook::jsi::StringBuffer;
using facebook::jsi::Value;
using facebook::jsi::JSError;

using NativeApiDirectConfig = NativeApiJsiConfig;
using NativeApiDirectScheduler = NativeApiJsiScheduler;
using metagen::MDMemberFlag;
using metagen::MDMetadataReader;
using metagen::MDSectionOffset;
using metagen::MDTypeKind;

// clang-format off
#define NATIVESCRIPT_NATIVE_API_DIRECT_RUNTIME_NAME "jsi"
#define NATIVESCRIPT_NATIVE_API_DIRECT_BACKEND_NAME "hermes"
#include "ffi/direct/NativeApiDirectBridge.h"
#include "ffi/direct/NativeApiDirectHostObjects.h"
#include "ffi/direct/NativeApiDirectCallbacks.h"
#include "ffi/direct/NativeApiDirectConversion.h"
#include "ffi/direct/NativeApiDirectInvocation.h"
#include "ffi/direct/NativeApiDirectClassBuilder.h"
#include "ffi/direct/NativeApiDirectHostObject.h"
// clang-format on

}  // namespace

#include "ffi/direct/NativeApiDirectInstall.h"

Object CreateNativeApiJSI(Runtime& runtime, const NativeApiJsiConfig& config) {
  return CreateNativeApiDirect(runtime, config);
}

void InstallNativeApiJSI(Runtime& runtime, const NativeApiJsiConfig& config) {
  InstallNativeApiDirect(runtime, config);
}

}  // namespace nativescript

extern "C" void NativeScriptInstallNativeApiJSI(facebook::jsi::Runtime* runtime,
                                                const char* metadataPath) {
  if (runtime == nullptr) {
    return;
  }
  nativescript::NativeApiJsiConfig config;
  config.metadataPath = metadataPath;
  nativescript::InstallNativeApiJSI(*runtime, config);
}

#endif  // TARGET_ENGINE_HERMES

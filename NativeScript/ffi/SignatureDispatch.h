#ifndef NS_SIGNATURE_DISPATCH_H
#define NS_SIGNATURE_DISPATCH_H

#include <objc/runtime.h>

#include <cmath>
#include <cstddef>
#include <cstdint>
#include <cstdlib>
#include <cstring>

#include "Cif.h"
#include "js_native_api.h"
#ifdef TARGET_ENGINE_V8
#include <v8.h>
#endif

namespace nativescript {

enum class SignatureCallKind : uint8_t {
  ObjCMethod = 1,
  CFunction = 2,
  BlockInvoke = 3,
};

using ObjCPreparedInvoker = void (*)(void* fnptr, void** avalues, void* rvalue);
using CFunctionPreparedInvoker = void (*)(void* fnptr, void** avalues,
                                          void* rvalue);
using BlockPreparedInvoker = void (*)(void* fnptr, void** avalues,
                                      void* rvalue);
using ObjCNapiInvoker = bool (*)(napi_env env, Cif* cif, void* fnptr, id self,
                                 SEL selector, const napi_value* argv,
                                 void* rvalue);
using CFunctionNapiInvoker = bool (*)(napi_env env, Cif* cif, void* fnptr,
                                      const napi_value* argv, void* rvalue);

#ifdef TARGET_ENGINE_V8
using ObjCV8Invoker = bool (*)(napi_env env, Cif* cif, void* fnptr, id self,
                               SEL selector,
                               const v8::FunctionCallbackInfo<v8::Value>& info,
                               void* rvalue);
using CFunctionV8Invoker =
    bool (*)(napi_env env, Cif* cif, void* fnptr,
             const v8::FunctionCallbackInfo<v8::Value>& info, void* rvalue);
#endif

struct ObjCDispatchEntry {
  uint64_t dispatchId;
  ObjCPreparedInvoker invoker;
};

struct CFunctionDispatchEntry {
  uint64_t dispatchId;
  CFunctionPreparedInvoker invoker;
};

struct BlockDispatchEntry {
  uint64_t dispatchId;
  BlockPreparedInvoker invoker;
};

struct ObjCNapiDispatchEntry {
  uint64_t dispatchId;
  ObjCNapiInvoker invoker;
};

struct CFunctionNapiDispatchEntry {
  uint64_t dispatchId;
  CFunctionNapiInvoker invoker;
};

#ifdef TARGET_ENGINE_V8
struct ObjCV8DispatchEntry {
  uint64_t dispatchId;
  ObjCV8Invoker invoker;
};

struct CFunctionV8DispatchEntry {
  uint64_t dispatchId;
  CFunctionV8Invoker invoker;
};
#endif

inline constexpr uint64_t kSignatureHashOffsetBasis = 14695981039346656037ull;
inline constexpr uint64_t kSignatureHashPrime = 1099511628211ull;

inline uint64_t hashBytesFnv1a(const void* data, size_t size,
                               uint64_t seed = kSignatureHashOffsetBasis) {
  const auto* bytes = static_cast<const uint8_t*>(data);
  uint64_t hash = seed;
  for (size_t i = 0; i < size; i++) {
    hash ^= static_cast<uint64_t>(bytes[i]);
    hash *= kSignatureHashPrime;
  }
  return hash;
}

inline uint64_t composeSignatureDispatchId(uint64_t signatureHash,
                                           SignatureCallKind kind,
                                           uint8_t flags) {
  const uint8_t kindByte = static_cast<uint8_t>(kind);
  uint64_t hash = hashBytesFnv1a(&kindByte, sizeof(kindByte));
  hash = hashBytesFnv1a(&flags, sizeof(flags), hash);
  return hashBytesFnv1a(&signatureHash, sizeof(signatureHash), hash);
}

#ifdef TARGET_ENGINE_V8
static_assert(sizeof(v8::Local<v8::Value>) == sizeof(napi_value),
              "Cannot convert between v8::Local<v8::Value> and napi_value");

inline napi_value v8LocalValueToNapiValue(v8::Local<v8::Value> local) {
  return reinterpret_cast<napi_value>(*local);
}
#endif

}  // namespace nativescript

#ifndef NS_GSD_BACKEND_V8
#ifdef TARGET_ENGINE_V8
#define NS_GSD_BACKEND_V8 1
#else
#define NS_GSD_BACKEND_V8 0
#endif
#endif

#ifndef NS_GSD_BACKEND_NAPI
#if NS_GSD_BACKEND_V8
#define NS_GSD_BACKEND_NAPI 0
#else
#define NS_GSD_BACKEND_NAPI 1
#endif
#endif

#if NS_GSD_BACKEND_V8 && !defined(TARGET_ENGINE_V8)
#error "NS_GSD_BACKEND_V8 requires TARGET_ENGINE_V8"
#endif

#ifndef NS_HAS_GENERATED_SIGNATURE_DISPATCH
#define NS_HAS_GENERATED_SIGNATURE_DISPATCH 0
#endif

#ifndef NS_HAS_GENERATED_SIGNATURE_NAPI_DISPATCH
#define NS_HAS_GENERATED_SIGNATURE_NAPI_DISPATCH 0
#endif

#ifndef NS_HAS_GENERATED_SIGNATURE_V8_DISPATCH
#define NS_HAS_GENERATED_SIGNATURE_V8_DISPATCH 0
#endif

#if defined(__has_include)
#if __has_include("GeneratedSignatureDispatch.inc")
#include "GeneratedSignatureDispatch.inc"
#endif
#endif

#if !NS_HAS_GENERATED_SIGNATURE_DISPATCH
namespace nativescript {
inline constexpr ObjCDispatchEntry kGeneratedObjCDispatchEntries[] = {
    {0, nullptr}};
inline constexpr CFunctionDispatchEntry kGeneratedCFunctionDispatchEntries[] = {
    {0, nullptr}};
inline constexpr BlockDispatchEntry kGeneratedBlockDispatchEntries[] = {
    {0, nullptr}};
}  // namespace nativescript
#endif

#if !NS_HAS_GENERATED_SIGNATURE_NAPI_DISPATCH
namespace nativescript {
inline constexpr ObjCNapiDispatchEntry kGeneratedObjCNapiDispatchEntries[] = {
    {0, nullptr}};
inline constexpr CFunctionNapiDispatchEntry
    kGeneratedCFunctionNapiDispatchEntries[] = {{0, nullptr}};
}  // namespace nativescript
#endif

#if defined(TARGET_ENGINE_V8) && !NS_HAS_GENERATED_SIGNATURE_V8_DISPATCH
namespace nativescript {
inline constexpr ObjCV8DispatchEntry kGeneratedObjCV8DispatchEntries[] = {
    {0, nullptr}};
inline constexpr CFunctionV8DispatchEntry
    kGeneratedCFunctionV8DispatchEntries[] = {{0, nullptr}};
}  // namespace nativescript
#endif

namespace nativescript {

template <typename Entry, typename Invoker, size_t N>
inline Invoker lookupDispatchInvoker(const Entry (&entries)[N],
                                     uint64_t dispatchId) {
  if (dispatchId == 0 || N <= 1) {
    return nullptr;
  }

  size_t low = 1;
  size_t high = N;
  while (low < high) {
    const size_t mid = low + ((high - low) >> 1);
    const uint64_t midId = entries[mid].dispatchId;
    if (midId < dispatchId) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  if (low < N && entries[low].dispatchId == dispatchId) {
    return entries[low].invoker;
  }
  return nullptr;
}

inline bool isGeneratedDispatchEnabled() {
  static const bool enabled = []() {
    const char* disableFlag = std::getenv("NS_DISABLE_GSD");
    if (disableFlag == nullptr || disableFlag[0] == '\0') {
      return true;
    }
    return !(disableFlag[0] == '0' && disableFlag[1] == '\0');
  }();
  return enabled;
}

inline ObjCPreparedInvoker lookupObjCPreparedInvoker(uint64_t dispatchId) {
  if (!isGeneratedDispatchEnabled()) {
    return nullptr;
  }
  return lookupDispatchInvoker<ObjCDispatchEntry, ObjCPreparedInvoker>(
      kGeneratedObjCDispatchEntries, dispatchId);
}

inline CFunctionPreparedInvoker lookupCFunctionPreparedInvoker(
    uint64_t dispatchId) {
  if (!isGeneratedDispatchEnabled()) {
    return nullptr;
  }
  return lookupDispatchInvoker<CFunctionDispatchEntry,
                               CFunctionPreparedInvoker>(
      kGeneratedCFunctionDispatchEntries, dispatchId);
}

inline BlockPreparedInvoker lookupBlockPreparedInvoker(uint64_t dispatchId) {
  if (!isGeneratedDispatchEnabled()) {
    return nullptr;
  }
  return lookupDispatchInvoker<BlockDispatchEntry, BlockPreparedInvoker>(
      kGeneratedBlockDispatchEntries, dispatchId);
}

inline ObjCNapiInvoker lookupObjCNapiInvoker(uint64_t dispatchId) {
  if (!isGeneratedDispatchEnabled()) {
    return nullptr;
  }
  return lookupDispatchInvoker<ObjCNapiDispatchEntry, ObjCNapiInvoker>(
      kGeneratedObjCNapiDispatchEntries, dispatchId);
}

inline CFunctionNapiInvoker lookupCFunctionNapiInvoker(uint64_t dispatchId) {
  if (!isGeneratedDispatchEnabled()) {
    return nullptr;
  }
  return lookupDispatchInvoker<CFunctionNapiDispatchEntry,
                               CFunctionNapiInvoker>(
      kGeneratedCFunctionNapiDispatchEntries, dispatchId);
}

#ifdef TARGET_ENGINE_V8
inline ObjCV8Invoker lookupObjCV8Invoker(uint64_t dispatchId) {
  if (!isGeneratedDispatchEnabled()) {
    return nullptr;
  }
  return lookupDispatchInvoker<ObjCV8DispatchEntry, ObjCV8Invoker>(
      kGeneratedObjCV8DispatchEntries, dispatchId);
}

inline CFunctionV8Invoker lookupCFunctionV8Invoker(uint64_t dispatchId) {
  if (!isGeneratedDispatchEnabled()) {
    return nullptr;
  }
  return lookupDispatchInvoker<CFunctionV8DispatchEntry, CFunctionV8Invoker>(
      kGeneratedCFunctionV8DispatchEntries, dispatchId);
}
#endif

}  // namespace nativescript

#endif  // NS_SIGNATURE_DISPATCH_H

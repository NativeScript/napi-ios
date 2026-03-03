#ifndef NS_SIGNATURE_DISPATCH_H
#define NS_SIGNATURE_DISPATCH_H

#include <objc/runtime.h>

#include <cmath>
#include <cstddef>
#include <cstdint>

#include "Cif.h"
#include "js_native_api.h"

namespace nativescript {

enum class SignatureCallKind : uint8_t {
  ObjCMethod = 1,
  CFunction = 2,
};

using ObjCPreparedInvoker = void (*)(void* fnptr, void** avalues, void* rvalue);
using CFunctionPreparedInvoker = void (*)(void* fnptr, void** avalues,
                                          void* rvalue);
using ObjCNapiInvoker = bool (*)(napi_env env, Cif* cif, void* fnptr, id self,
                                 SEL selector, const napi_value* argv,
                                 void* rvalue);
using CFunctionNapiInvoker = bool (*)(napi_env env, Cif* cif, void* fnptr,
                                      const napi_value* argv, void* rvalue);

struct ObjCDispatchEntry {
  uint64_t dispatchId;
  ObjCPreparedInvoker invoker;
};

struct CFunctionDispatchEntry {
  uint64_t dispatchId;
  CFunctionPreparedInvoker invoker;
};

struct ObjCNapiDispatchEntry {
  uint64_t dispatchId;
  ObjCNapiInvoker invoker;
};

struct CFunctionNapiDispatchEntry {
  uint64_t dispatchId;
  CFunctionNapiInvoker invoker;
};

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

}  // namespace nativescript

#ifndef NS_HAS_GENERATED_SIGNATURE_DISPATCH
#define NS_HAS_GENERATED_SIGNATURE_DISPATCH 0
#endif

#ifndef NS_HAS_GENERATED_SIGNATURE_NAPI_DISPATCH
#define NS_HAS_GENERATED_SIGNATURE_NAPI_DISPATCH 0
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

inline ObjCPreparedInvoker lookupObjCPreparedInvoker(uint64_t dispatchId) {
  return lookupDispatchInvoker<ObjCDispatchEntry, ObjCPreparedInvoker>(
      kGeneratedObjCDispatchEntries, dispatchId);
}

inline CFunctionPreparedInvoker lookupCFunctionPreparedInvoker(
    uint64_t dispatchId) {
  return lookupDispatchInvoker<CFunctionDispatchEntry, CFunctionPreparedInvoker>(
      kGeneratedCFunctionDispatchEntries, dispatchId);
}

inline ObjCNapiInvoker lookupObjCNapiInvoker(uint64_t dispatchId) {
  return lookupDispatchInvoker<ObjCNapiDispatchEntry, ObjCNapiInvoker>(
      kGeneratedObjCNapiDispatchEntries, dispatchId);
}

inline CFunctionNapiInvoker lookupCFunctionNapiInvoker(uint64_t dispatchId) {
  return lookupDispatchInvoker<CFunctionNapiDispatchEntry, CFunctionNapiInvoker>(
      kGeneratedCFunctionNapiDispatchEntries, dispatchId);
}

}  // namespace nativescript

#endif  // NS_SIGNATURE_DISPATCH_H

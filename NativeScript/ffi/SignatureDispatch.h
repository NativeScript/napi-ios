#ifndef NS_SIGNATURE_DISPATCH_H
#define NS_SIGNATURE_DISPATCH_H

#include <cstddef>
#include <cstdint>
#include <objc/runtime.h>

namespace nativescript {

enum class SignatureCallKind : uint8_t {
  ObjCMethod = 1,
  CFunction = 2,
};

using ObjCPreparedInvoker = void (*)(void* fnptr, void** avalues, void* rvalue);
using CFunctionPreparedInvoker = void (*)(void* fnptr, void** avalues, void* rvalue);

struct ObjCDispatchEntry {
  uint64_t dispatchId;
  ObjCPreparedInvoker invoker;
};

struct CFunctionDispatchEntry {
  uint64_t dispatchId;
  CFunctionPreparedInvoker invoker;
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

#include "GeneratedSignatureDispatch.inc"

namespace nativescript {

inline ObjCPreparedInvoker lookupObjCPreparedInvoker(uint64_t dispatchId) {
  for (const auto& entry : kGeneratedObjCDispatchEntries) {
    if (entry.dispatchId == dispatchId) {
      return entry.invoker;
    }
  }
  return nullptr;
}

inline CFunctionPreparedInvoker lookupCFunctionPreparedInvoker(uint64_t dispatchId) {
  for (const auto& entry : kGeneratedCFunctionDispatchEntries) {
    if (entry.dispatchId == dispatchId) {
      return entry.invoker;
    }
  }
  return nullptr;
}

}  // namespace nativescript

#endif  // NS_SIGNATURE_DISPATCH_H

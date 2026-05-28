#ifndef NATIVESCRIPT_FFI_DIRECT_NATIVE_API_DIRECT_SIGNATURE_DISPATCH_H
#define NATIVESCRIPT_FFI_DIRECT_NATIVE_API_DIRECT_SIGNATURE_DISPATCH_H

#include "SignatureDispatchCore.h"

#ifndef NS_GSD_BACKEND_DIRECT_PREPARED
#define NS_GSD_BACKEND_DIRECT_PREPARED 0
#endif

#ifndef NS_GSD_BACKEND_V8
#define NS_GSD_BACKEND_V8 0
#endif

#ifndef NS_GSD_BACKEND_JSC
#define NS_GSD_BACKEND_JSC 0
#endif

#ifndef NS_GSD_BACKEND_QUICKJS
#define NS_GSD_BACKEND_QUICKJS 0
#endif

#ifndef NS_GSD_BACKEND_HERMES
#define NS_GSD_BACKEND_HERMES 0
#endif

#ifndef NS_GSD_BACKEND_NAPI
#define NS_GSD_BACKEND_NAPI 0
#endif

#ifndef NS_GSD_BACKEND_ENGINE_DIRECT
#define NS_GSD_BACKEND_ENGINE_DIRECT 0
#endif

#ifndef NS_HAS_GENERATED_SIGNATURE_DISPATCH
#define NS_HAS_GENERATED_SIGNATURE_DISPATCH 0
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

namespace nativescript {

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

}  // namespace nativescript

#endif  // NATIVESCRIPT_FFI_DIRECT_NATIVE_API_DIRECT_SIGNATURE_DISPATCH_H

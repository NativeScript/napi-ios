#ifndef TYPE_CONV_H
#define TYPE_CONV_H

#include <iostream>

#include "MetadataReader.h"
#include "ffi.h"
#include "js_native_api.h"
#include "objc/runtime.h"
#ifdef TARGET_ENGINE_V8
#include <v8.h>
#endif

using namespace metagen;

namespace nativescript {

typedef enum ConvertToJSFlags : uint32_t {
  kReturnOwned = 1 << 0,
  kBlockParam = 1 << 1,
  kStructZeroCopy = 1 << 2,
  kCStringAsReference = 1 << 3,
  kCFunctionObjectReturn = 1 << 4,
} ConvertToJSFlags;

class TypeConv {
 public:
  static std::shared_ptr<TypeConv> Make(napi_env env, const char** encoding);
  static std::shared_ptr<TypeConv> Make(napi_env env, MDMetadataReader* reader,
                                        MDSectionOffset* offset,
                                        uint8_t opaquePointers = 0);

  ffi_type* type;
  MDTypeKind kind = mdTypeChar;

  virtual napi_value toJS(napi_env env, void* value, uint32_t flags = 0) {
    return nullptr;
  }

  virtual void toNative(napi_env env, napi_value value, void* result,
                        bool* shouldFree, bool* shouldFreeAny) {}

  virtual void free(napi_env env, void* value) {}

  virtual ffi_type* ffiTypeForArgument() { return type; }

  virtual void encode(std::string* encoding) {}
};

// Fast-path conversion for known metadata kinds used by generated dispatch
// wrappers. Returns true only when conversion is fully handled and written to
// `result`. Returns false when caller should fall back to TypeConv::toNative.
bool TryFastConvertNapiArgument(napi_env env, MDTypeKind kind, napi_value value,
                                void* result);

// Fast direct conversion for uint16_t / unichar arguments used by generated
// dispatch wrappers. Supports both numeric values and single-character JS
// strings.
bool TryFastConvertNapiUInt16Argument(napi_env env, napi_value value,
                                      uint16_t* result);

#ifdef TARGET_ENGINE_V8
// V8-only variants used by generated dispatch wrappers. These skip the
// Node-API callback/argument layer for primitive conversions and fall back to
// the regular TypeConv path for complex values.
bool TryFastConvertV8Argument(napi_env env, MDTypeKind kind,
                              v8::Local<v8::Value> value, void* result);
bool TryFastConvertV8UInt16Argument(napi_env env, v8::Local<v8::Value> value,
                                    uint16_t* result);
bool TryFastConvertV8ReturnValue(napi_env env, MDTypeKind kind,
                                 const void* value,
                                 v8::Local<v8::Value>* result);
#endif

#ifdef TARGET_ENGINE_JSC
// JSC-only conversion used by generated dispatch wrappers. The value is the
// JavaScriptCore JSValueRef carried through the fast-native callback, not a
// value copied through napi_get_cb_info.
bool TryFastConvertJSCArgument(napi_env env, MDTypeKind kind, napi_value value,
                               void* result);
bool TryFastConvertJSCBoolArgument(napi_env env, napi_value value,
                                   uint8_t* result);
bool TryFastConvertJSCInt8Argument(napi_env env, napi_value value,
                                   int8_t* result);
bool TryFastConvertJSCUInt8Argument(napi_env env, napi_value value,
                                    uint8_t* result);
bool TryFastConvertJSCInt16Argument(napi_env env, napi_value value,
                                    int16_t* result);
bool TryFastConvertJSCUInt16Argument(napi_env env, napi_value value,
                                     uint16_t* result);
bool TryFastConvertJSCInt32Argument(napi_env env, napi_value value,
                                    int32_t* result);
bool TryFastConvertJSCUInt32Argument(napi_env env, napi_value value,
                                     uint32_t* result);
bool TryFastConvertJSCInt64Argument(napi_env env, napi_value value,
                                    int64_t* result);
bool TryFastConvertJSCUInt64Argument(napi_env env, napi_value value,
                                     uint64_t* result);
bool TryFastConvertJSCFloatArgument(napi_env env, napi_value value,
                                    float* result);
bool TryFastConvertJSCDoubleArgument(napi_env env, napi_value value,
                                     double* result);
bool TryFastConvertJSCSelectorArgument(napi_env env, napi_value value,
                                       SEL* result);
bool TryFastConvertJSCObjectArgument(napi_env env, MDTypeKind kind,
                                     napi_value value, void* result);
bool TryFastConvertJSCReturnValue(napi_env env, MDTypeKind kind,
                                  const void* value, napi_value* result);
#endif

#ifdef TARGET_ENGINE_QUICKJS
// QuickJS-only conversion used by generated dispatch wrappers. The value is
// the raw JSValue slot passed to the QuickJS C callback.
bool TryFastConvertQuickJSArgument(napi_env env, MDTypeKind kind,
                                   napi_value value, void* result);
bool TryFastConvertQuickJSReturnValue(napi_env env, MDTypeKind kind,
                                      const void* value, napi_value* result);
#endif

#ifdef TARGET_ENGINE_HERMES
// Hermes-only conversion used by generated dispatch wrappers. The value points
// at the PinnedHermesValue slot supplied by Hermes' native trampoline.
bool TryFastConvertHermesArgument(napi_env env, MDTypeKind kind,
                                  napi_value value, void* result);
bool TryFastConvertHermesReturnValue(napi_env env, MDTypeKind kind,
                                     const void* value, napi_value* result);
#endif

inline bool TryFastConvertEngineReturnValue(napi_env env, MDTypeKind kind,
                                            const void* value,
                                            napi_value* result) {
#ifdef TARGET_ENGINE_JSC
  return TryFastConvertJSCReturnValue(env, kind, value, result);
#elif defined(TARGET_ENGINE_QUICKJS)
  return TryFastConvertQuickJSReturnValue(env, kind, value, result);
#elif defined(TARGET_ENGINE_HERMES)
  return TryFastConvertHermesReturnValue(env, kind, value, result);
#else
  return false;
#endif
}

// Cleanup function to clear thread-local struct type caches
void clearStructTypeCaches();

}  // namespace nativescript

#endif /* TYPE_CONV_H */

#include "Block.h"
#import <Foundation/Foundation.h>
#include "Interop.h"
#include "ObjCBridge.h"
#include "js_native_api.h"
#include "js_native_api_types.h"
#include "node_api_util.h"
#include "objc/runtime.h"
#include <cstring>
#include <unordered_map>

struct Block_descriptor_1 {
  unsigned long int reserved;  // NULL
  unsigned long int size;      // sizeof(struct Block_literal_1)
  // optional helper functions
  void (*copy_helper)(void* dst, void* src);  // IFF (1<<25)
  void (*dispose_helper)(void* src);          // IFF (1<<25)
  // required ABI.2010.3.16
  const char* signature;  // IFF (1<<30)
};

struct Block_literal_1 {
  void* isa;  // initialized to &_NSConcreteStackBlock or &_NSConcreteGlobalBlock
  int flags;
  int reserved;
  void* invoke;
  Block_descriptor_1* descriptor;
  // imported variables
  nativescript::Closure* closure;
};

namespace {

constexpr int kBlockNeedsFree = (1 << 24);
constexpr int kBlockHasCopyDispose = (1 << 25);
constexpr int kBlockRefCountOne = (1 << 1);
std::unordered_map<void*, napi_ref> g_blockToJsFunction;

void block_copy(void* dest, void* src) {
  auto dst = static_cast<Block_literal_1*>(dest);
  auto source = static_cast<Block_literal_1*>(src);
  dst->closure = source->closure;
}

void block_release(void* src) {
  auto block = static_cast<Block_literal_1*>(src);
  if (block == nullptr) {
    return;
  }

  if (block->closure != nullptr && block->closure->env != nullptr) {
    auto it = g_blockToJsFunction.find(block);
    if (it != g_blockToJsFunction.end()) {
      napi_delete_reference(block->closure->env, it->second);
      g_blockToJsFunction.erase(it);
    }
  }

  if (block->closure != nullptr) {
    delete block->closure;
    block->closure = nullptr;
  }
}

Block_descriptor_1 kBlockDescriptor = {
    .reserved = 0,
    .size = sizeof(Block_literal_1),
    .copy_helper = block_copy,
    .dispose_helper = block_release,
    .signature = nullptr,
};

inline napi_value getCachedBlockJsFunction(napi_env env, void* blockPtr) {
  auto it = g_blockToJsFunction.find(blockPtr);
  if (it == g_blockToJsFunction.end()) {
    return nullptr;
  }
  napi_value value = nativescript::get_ref_value(env, it->second);
  if (value == nullptr) {
    napi_delete_reference(env, it->second);
    g_blockToJsFunction.erase(it);
  }
  return value;
}

inline void cacheBlockJsFunction(napi_env env, void* blockPtr, napi_value jsFunction) {
  if (blockPtr == nullptr || jsFunction == nullptr) {
    return;
  }
  if (g_blockToJsFunction.find(blockPtr) != g_blockToJsFunction.end()) {
    return;
  }
  // Keep this weak so callback identity can round-trip without preventing GC.
  g_blockToJsFunction[blockPtr] = nativescript::make_ref(env, jsFunction, 0);
}

}  // namespace

void block_finalize(napi_env env, void* data, void* hint) {
  auto block = static_cast<Block_literal_1*>(data);
  if (block == nullptr) {
    return;
  }

  auto it = g_blockToJsFunction.find(block);
  if (it != g_blockToJsFunction.end()) {
    napi_delete_reference(env, it->second);
    g_blockToJsFunction.erase(it);
  }

  if (block->closure != nullptr) {
    delete block->closure;
    block->closure = nullptr;
  }

  free(block);
}

namespace nativescript {

void* mallocBlockISA = nullptr;
void* stackBlockISA = nullptr;

id registerBlock(napi_env env, Closure* closure, napi_value callback) {
  auto block = static_cast<Block_literal_1*>(malloc(sizeof(Block_literal_1)));
  memset(block, 0, sizeof(Block_literal_1));

  if (mallocBlockISA == nullptr) {
    mallocBlockISA = dlsym(RTLD_DEFAULT, "_NSConcreteMallocBlock");
  }

  if (stackBlockISA == nullptr) {
    stackBlockISA = dlsym(RTLD_DEFAULT, "_NSConcreteStackBlock");
  }

  block->isa = mallocBlockISA != nullptr ? mallocBlockISA : stackBlockISA;
  block->flags = kBlockNeedsFree | kBlockHasCopyDispose | kBlockRefCountOne;
  block->reserved = 0;
  block->invoke = closure->fnptr;
  block->descriptor = &kBlockDescriptor;
  block->closure = closure;

  closure->func = make_ref(env, callback, 1);

  // Expose the native block pointer on the JS callback so interop.handleof/sizeof
  // can resolve pointers for blocks that round-trip through Objective-C.
  napi_value ptrExternal;
  napi_create_external(env, block, nullptr, nullptr, &ptrExternal);
  napi_set_named_property(env, callback, "__ns_native_ptr", ptrExternal);

  auto bridgeState = ObjCBridgeState::InstanceData(env);

#ifndef ENABLE_JS_RUNTIME
  if (napiSupportsThreadsafeFunctions(bridgeState->self_dl)) {
    napi_value workName;
    napi_create_string_utf8(env, "Block", NAPI_AUTO_LENGTH, &workName);
    napi_create_threadsafe_function(env, callback, nullptr, workName, 0, 1, nullptr, nullptr,
                                    closure, Closure::callBlockFromMainThread, &closure->tsfn);
    if (closure->tsfn) napi_unref_threadsafe_function(env, closure->tsfn);
  }
#endif  // ENABLE_JS_RUNTIME

  cacheBlockJsFunction(env, block, callback);

  return (id)block;
}

NAPI_FUNCTION(registerBlock) {
  NAPI_CALLBACK_BEGIN(2)

  char enc[256];
  NAPI_GUARD(napi_get_value_string_utf8(env, argv[0], enc, 256, nullptr)) {
    NAPI_THROW_LAST_ERROR
    return nullptr;
  }

  napi_value callback = argv[1];

  auto closure = new Closure(enc, true);
  closure->env = env;
  registerBlock(env, closure, callback);

  return callback;
}

napi_value FunctionPointer::wrap(napi_env env, void* function, metagen::MDSectionOffset offset,
                                 bool isBlock) {
  if (isBlock) {
    napi_value cached = getCachedBlockJsFunction(env, function);
    if (cached != nullptr) {
      return cached;
    }
  }

  FunctionPointer* ref = new FunctionPointer();
  ref->function = function;
  ref->offset = offset;

  ObjCBridgeState* bridgeState = ObjCBridgeState::InstanceData(env);

  if (isBlock) {
    ref->cif = bridgeState->getBlockCif(env, offset);
  } else {
    ref->cif = bridgeState->getCFunctionCif(env, offset);
  }

  napi_value result;
  napi_create_function(env, isBlock ? "objcBlockWrapper" : "cFunctionWrapper", NAPI_AUTO_LENGTH,
                       isBlock ? jsCallAsBlock : jsCallAsCFunction, ref, &result);

  // Allow fast pointer extraction when JS function wrappers are passed back to native.
  napi_ref nativePointerRef;
  napi_wrap(env, result, function, nullptr, nullptr, &nativePointerRef);
  (void)nativePointerRef;

  // Keep raw pointer metadata without overriding the function callback data.
  // Overriding callback data breaks JS invocation for wrapped function pointers.
  napi_value ptrExternal;
  napi_create_external(env, function, nullptr, nullptr, &ptrExternal);
  napi_property_descriptor ptrProp = {
      .utf8name = "__ns_native_ptr",
      .method = nullptr,
      .getter = nullptr,
      .setter = nullptr,
      .value = ptrExternal,
      .attributes = napi_default,
      .data = nullptr,
  };
  napi_define_properties(env, result, 1, &ptrProp);

  napi_ref jsRef;
  napi_add_finalizer(env, result, ref, FunctionPointer::finalize, nullptr, &jsRef);

  return result;
}

void FunctionPointer::finalize(napi_env env, void* finalize_data, void* finalize_hint) {
  auto ref = (FunctionPointer*)finalize_data;
  delete ref;
}

napi_value FunctionPointer::jsCallAsCFunction(napi_env env, napi_callback_info cbinfo) {
  FunctionPointer* ref;

  napi_get_cb_info(env, cbinfo, nullptr, nullptr, nullptr, (void**)&ref);

  auto cif = ref->cif;

  size_t argc = cif->argc;
  napi_get_cb_info(env, cbinfo, &argc, cif->argv, nullptr, nullptr);

  void* avalues[cif->argc];
  void* rvalue = cif->rvalue;

  bool shouldFreeAny = false;
  bool shouldFree[cif->argc];

  if (cif->argc > 0) {
    for (unsigned int i = 0; i < cif->argc; i++) {
      shouldFree[i] = false;
      avalues[i] = cif->avalues[i];
      cif->argTypes[i]->toNative(env, cif->argv[i], avalues[i], &shouldFree[i], &shouldFreeAny);
    }
  }

  ffi_call(&cif->cif, FFI_FN(ref->function), rvalue, avalues);

  if (shouldFreeAny) {
    for (unsigned int i = 0; i < cif->argc; i++) {
      if (shouldFree[i]) {
        cif->argTypes[i]->free(env, *((void**)avalues[i]));
      }
    }
  }

  return cif->returnType->toJS(env, rvalue);
}

napi_value FunctionPointer::jsCallAsBlock(napi_env env, napi_callback_info cbinfo) {
  FunctionPointer* ref;

  napi_get_cb_info(env, cbinfo, nullptr, nullptr, nullptr, (void**)&ref);

  Block_literal_1* block = (Block_literal_1*)ref->function;
  auto cif = ref->cif;

  size_t argc = cif->argc;
  napi_get_cb_info(env, cbinfo, &argc, cif->argv, nullptr, nullptr);

  void* avalues[cif->cif.nargs];
  void* rvalue = cif->rvalue;

  bool shouldFreeAny = false;
  bool shouldFree[cif->argc];

  avalues[0] = &block;

  if (cif->argc > 0) {
    for (unsigned int i = 0; i < cif->argc; i++) {
      shouldFree[i] = false;
      avalues[i + 1] = cif->avalues[i];
      cif->argTypes[i]->toNative(env, cif->argv[i], avalues[i + 1], &shouldFree[i], &shouldFreeAny);
    }
  }

  ffi_call(&cif->cif, FFI_FN(block->invoke), rvalue, avalues);

  if (shouldFreeAny) {
    for (unsigned int i = 0; i < cif->argc; i++) {
      if (shouldFree[i]) {
        cif->argTypes[i]->free(env, *((void**)avalues[i + 1]));
      }
    }
  }

  return cif->returnType->toJS(env, rvalue);
}

}  // namespace nativescript

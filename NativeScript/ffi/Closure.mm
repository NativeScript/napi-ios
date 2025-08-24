#include "Closure.h"
#include "AutoreleasePool.h"
#include "Metadata.h"
#include "MetadataReader.h"
#include "ObjCBridge.h"
#include "TypeConv.h"
#include "Util.h"
#include "ffi/NativeScriptException.h"
#include "js_native_api.h"
#include "js_native_api_types.h"
#ifdef ENABLE_JS_RUNTIME
#include "jsr.h"
#endif
#include "node_api_util.h"
#include "objc/message.h"

#include <Foundation/Foundation.h>
#include <cassert>
#include <condition_variable>
#include <mutex>

namespace nativescript {

inline void JSCallbackInner(Closure* closure, napi_value func, napi_value thisArg, napi_value* argv,
                            size_t argc, bool* done, void* ret) {
  napi_env env = closure->env;

  napi_value result;

  napi_get_and_clear_last_exception(env, &result);

  napi_status status = napi_call_function(env, thisArg, func, argc, argv, &result);

  if (done != NULL) *done = true;

  // If the call failed, we need to create an error object and throw it in native
  // Likely it will circle back to JS. We have try/catch around all native calls from JS,
  // so those are likely to catch it.
  if (status != napi_ok) {
    napi_get_and_clear_last_exception(env, &result);
    napi_valuetype resultType;
    napi_typeof(env, result, &resultType);

    if (resultType != napi_object) {
      napi_value code, msg;
      napi_create_string_utf8(env, "NativeScriptException", NAPI_AUTO_LENGTH, &code);
      napi_create_string_utf8(env,
                              "Unable to obtain the error thrown by the JS implemented closure",
                              NAPI_AUTO_LENGTH, &msg);
      napi_create_error(env, code, msg, &result);
    }

    NativeScriptException::OnUncaughtError(env, result);
  }

  // Even if call was failed and result is just undefined, let's still try to
  // fill the return value memory with something so that it doesn't crash.
  bool shouldFree;
  closure->returnType->toNative(env, result, ret, &shouldFree, &shouldFree);
}

// Bridge calls from Objective-C to JavaScript.
// Opposite of what native_call.cc does - but a lot of type conversion logic
// is reused, just in reverse.
void JSMethodCallback(ffi_cif* cif, void* ret, void* args[], void* data) {
  Closure* closure = (Closure*)data;
  napi_env env = closure->env;

#ifdef ENABLE_JS_RUNTIME
  NapiScope scope(env);
#endif

  auto bridgeState = ObjCBridgeState::InstanceData(env);

  napi_value constructor = get_ref_value(env, closure->thisConstructor);

  id self = *(id*)args[0];
  napi_value thisArg = bridgeState->getObject(env, self, constructor);
  if (thisArg == nil) {
    NSLog(@"ObjC->JS: thisArg is nil, the JS object was probably garbage "
          @"collected");
  }

  napi_value func;
  if (closure->func != nullptr) {
    func = get_ref_value(env, closure->func);
  } else {
    napi_get_named_property(env, thisArg, closure->propertyName.c_str(), &func);
  }

  napi_valuetype funcType;
  napi_typeof(env, func, &funcType);
  if (funcType != napi_function) {
    std::string errmsg = "Property " + closure->propertyName + " is not a function, cannot call it";
    napi_throw_error(env, nullptr, errmsg.c_str());
    return;
  }

  napi_value argv[cif->nargs - 2];
  for (int i = 2; i < cif->nargs; i++) {
    argv[i - 2] = closure->argTypes[i]->toJS(env, args[i], 0);
  }

  JSCallbackInner(closure, func, thisArg, argv, cif->nargs - 2, nullptr, ret);
}

struct JSBlockCallContext {
  ffi_cif* cif;
  void* ret;
  void** args;
  std::mutex mutex;
  std::condition_variable cv;
  bool done;
};

void Closure::callBlockFromMainThread(napi_env env, napi_value js_cb, void* context, void* data) {
  auto closure = (Closure*)context;
  auto ctx = (JSBlockCallContext*)data;

  napi_value func = get_ref_value(env, closure->func);

  napi_value thisArg;
  napi_get_global(env, &thisArg);

  napi_value argv[ctx->cif->nargs - 1];
  for (int i = 0; i < ctx->cif->nargs - 1; i++) {
    argv[i] = closure->argTypes[i]->toJS(env, ctx->args[i + 1], 0);
  }

  JSCallbackInner(closure, func, thisArg, argv, ctx->cif->nargs - 1, &ctx->done, ctx->ret);

  ctx->cv.notify_one();
}

void JSBlockCallback(ffi_cif* cif, void* ret, void* args[], void* data) {
  Closure* closure = (Closure*)data;
  napi_env env = closure->env;

#ifdef ENABLE_JS_RUNTIME
  NapiScope scope(env);
#endif

  auto currentThreadId = std::this_thread::get_id();

  JSBlockCallContext ctx;
  ctx.cif = cif;
  ctx.ret = ret;
  ctx.args = args;
  ctx.done = false;

  if (currentThreadId == closure->jsThreadId) {
    Closure::callBlockFromMainThread(env, get_ref_value(env, closure->func), closure, &ctx);
  } else {
#ifndef ENABLE_JS_RUNTIME
    if (!closure->tsfn) {
      assert(false && "Threadsafe functions are not supported");
    }

    napi_acquire_threadsafe_function(closure->tsfn);
    std::unique_lock<std::mutex> lock(ctx.mutex);
    napi_call_threadsafe_function(closure->tsfn, &ctx, napi_tsfn_blocking);
    ctx.cv.wait(lock, [&ctx] { return ctx.done; });
    napi_release_threadsafe_function(closure->tsfn, napi_tsfn_release);
#else
    NSLog(@"Threadsafe functions are not supported");
    // assert(false && "Threadsafe functions are not supported");
    Closure::callBlockFromMainThread(env, get_ref_value(env, closure->func), closure, &ctx);
#endif  // ENABLE_JS_RUNTIME
  }
}

Closure::Closure(std::string encoding, bool isBlock) {
  auto signature = [NSMethodSignature signatureWithObjCTypes:encoding.c_str()];
  size_t argc = signature.numberOfArguments;

  const char* rtypeEncoding = signature.methodReturnType;
  returnType = TypeConv::Make(env, &rtypeEncoding);

  int skipArgs = isBlock ? 1 : 0;

  ffi_type* rtype = this->returnType->type;
  ffi_type** atypes = (ffi_type**)malloc(sizeof(ffi_type*) * (argc + skipArgs));

  if (isBlock) {
    atypes[0] = &ffi_type_pointer;
  }

  for (int i = 0; i < argc; i++) {
    const char* argenc = [signature getArgumentTypeAtIndex:i];
    auto argTypeInfo = TypeConv::Make(env, &argenc);
    atypes[i + skipArgs] = argTypeInfo->type;
    this->argTypes.push_back(argTypeInfo);
  }

  ffi_status status = ffi_prep_cif(&cif, FFI_DEFAULT_ABI, (int)argc + skipArgs, rtype, atypes);

  if (status != FFI_OK) {
    std::cout << "ffi_prep_cif failed" << std::endl;
    return;
  }

  closure = (ffi_closure*)ffi_closure_alloc(sizeof(ffi_closure), &fnptr);

  ffi_prep_closure_loc(closure, &cif, isBlock ? JSBlockCallback : JSMethodCallback, this, fnptr);
}

Closure::Closure(MDMetadataReader* reader, MDSectionOffset offset, bool isBlock,
                 std::string* encoding, bool isMethod, bool isGetter, bool isSetter) {
  this->isGetter = isGetter;
  this->isSetter = isSetter;

  auto returnTypeKind = reader->getTypeKind(offset);
  bool next = ((MDTypeFlag)returnTypeKind & mdTypeFlagNext) != 0;

  returnType = TypeConv::Make(env, reader, &offset);

  if (encoding != nullptr) returnType->encode(encoding);

  ffi_type* rtype = returnType->type;
  ffi_type** atypes = nullptr;

  if (isMethod && encoding != nullptr) {
    const char* argenc = "@";
    *encoding += argenc;
    argTypes.push_back(TypeConv::Make(env, &argenc));
    argenc = ":";
    *encoding += argenc;
    argTypes.push_back(TypeConv::Make(env, &argenc));
  }

  while (next) {
    auto argTypeKind = reader->getTypeKind(offset);
    next = ((MDTypeFlag)argTypeKind & mdTypeFlagNext) != 0;
    auto argTypeInfo = TypeConv::Make(env, reader, &offset);
    if (encoding != nullptr) argTypeInfo->encode(encoding);
    argTypes.push_back(argTypeInfo);
  }

  auto skipArgs = isBlock ? 1 : 0;

  if (!argTypes.empty() || isBlock) {
    atypes = (ffi_type**)malloc(sizeof(ffi_type*) * (argTypes.size() + skipArgs));
    if (isBlock) {
      atypes[0] = &ffi_type_pointer;
    }
    for (int i = 0; i < argTypes.size(); i++) {
      atypes[i + skipArgs] = argTypes[i]->type;
    }
  }

  ffi_status status =
      ffi_prep_cif(&cif, FFI_DEFAULT_ABI, argTypes.size() + skipArgs, rtype, atypes);

  if (status != FFI_OK) {
    std::cout << "Failed to prepare CIF, libffi returned error:" << status << std::endl;
  }

  closure = (ffi_closure*)ffi_closure_alloc(sizeof(ffi_closure), &fnptr);

  ffi_prep_closure_loc(closure, &cif, isBlock ? JSBlockCallback : JSMethodCallback, this, fnptr);
}

Closure::~Closure() {
  if (func != nullptr) {
    napi_delete_reference(env, func);
  }
#ifndef ENABLE_JS_RUNTIME
  if (tsfn != nullptr) {
    napi_release_threadsafe_function(tsfn, napi_tsfn_abort);
  }
#endif  // ENABLE_JS_RUNTIME
  ffi_closure_free(closure);
}

}  // namespace nativescript

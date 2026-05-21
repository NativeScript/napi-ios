#include "CFunction.h"
#include <dispatch/dispatch.h>
#include <cstring>
#include <vector>
#include "Block.h"
#include "ClassMember.h"
#include "HermesFastCallbackInfo.h"
#include "Interop.h"
#include "ObjCBridge.h"
#include "SignatureDispatch.h"
#include "ffi/NativeScriptException.h"
#include "ffi/Tasks.h"
#ifdef ENABLE_JS_RUNTIME
#include "jsr.h"
#endif

namespace nativescript {

namespace {

inline bool unwrapCompatNativeHandleForCFunction(napi_env env, napi_value value, void** out) {
  if (value == nullptr || out == nullptr) {
    return false;
  }

  if (Pointer::isInstance(env, value)) {
    Pointer* ptr = Pointer::unwrap(env, value);
    *out = ptr != nullptr ? ptr->data : nullptr;
    return ptr != nullptr;
  }

  if (Reference::isInstance(env, value)) {
    Reference* ref = Reference::unwrap(env, value);
    *out = ref != nullptr ? ref->data : nullptr;
    return ref != nullptr;
  }

  napi_valuetype valueType = napi_undefined;
  if (napi_typeof(env, value, &valueType) != napi_ok) {
    return false;
  }

  if (valueType == napi_bigint) {
    uint64_t raw = 0;
    bool lossless = false;
    if (napi_get_value_bigint_uint64(env, value, &raw, &lossless) != napi_ok) {
      return false;
    }
    *out = reinterpret_cast<void*>(static_cast<uintptr_t>(raw));
    return true;
  }

  if (valueType == napi_external) {
    return napi_get_value_external(env, value, out) == napi_ok;
  }

  if (valueType != napi_object && valueType != napi_function) {
    return false;
  }

  bool hasNativePointer = false;
  if (napi_has_named_property(env, value, "__ns_native_ptr", &hasNativePointer) == napi_ok &&
      hasNativePointer) {
    napi_value nativePointerValue = nullptr;
    if (napi_get_named_property(env, value, "__ns_native_ptr", &nativePointerValue) == napi_ok &&
        napi_get_value_external(env, nativePointerValue, out) == napi_ok && *out != nullptr) {
      return true;
    }
  }

  return napi_unwrap(env, value, out) == napi_ok && *out != nullptr;
}

inline napi_value createCompatDispatchQueueWrapperForCFunction(napi_env env,
                                                               dispatch_queue_t queue) {
  if (queue == nullptr) {
    napi_value nullValue = nullptr;
    napi_get_null(env, &nullValue);
    return nullValue;
  }

  return Pointer::create(env, reinterpret_cast<void*>(queue));
}

inline napi_value tryCallCompatLibdispatchFunction(napi_env env, size_t argc,
                                                   const napi_value* argv,
                                                   const char* functionName) {
  if (strcmp(functionName, "dispatch_get_global_queue") == 0) {
    int64_t identifier = 0;
    if (argc > 0) {
      napi_valuetype identifierType = napi_undefined;
      if (napi_typeof(env, argv[0], &identifierType) == napi_ok && identifierType == napi_bigint) {
        bool lossless = false;
        if (napi_get_value_bigint_int64(env, argv[0], &identifier, &lossless) != napi_ok) {
          napi_throw_type_error(env, nullptr,
                                "dispatch_get_global_queue expects a numeric identifier.");
          return nullptr;
        }
      } else {
        napi_value coercedIdentifier = nullptr;
        if (napi_coerce_to_number(env, argv[0], &coercedIdentifier) != napi_ok ||
            napi_get_value_int64(env, coercedIdentifier, &identifier) != napi_ok) {
          napi_throw_type_error(env, nullptr,
                                "dispatch_get_global_queue expects a numeric identifier.");
          return nullptr;
        }
      }
    }

    uint64_t flags = 0;
    if (argc > 1) {
      napi_valuetype flagsType = napi_undefined;
      if (napi_typeof(env, argv[1], &flagsType) == napi_ok && flagsType == napi_bigint) {
        bool lossless = false;
        if (napi_get_value_bigint_uint64(env, argv[1], &flags, &lossless) != napi_ok) {
          napi_throw_type_error(env, nullptr, "dispatch_get_global_queue expects numeric flags.");
          return nullptr;
        }
      } else {
        napi_value coercedFlags = nullptr;
        int64_t signedFlags = 0;
        if (napi_coerce_to_number(env, argv[1], &coercedFlags) != napi_ok ||
            napi_get_value_int64(env, coercedFlags, &signedFlags) != napi_ok) {
          napi_throw_type_error(env, nullptr, "dispatch_get_global_queue expects numeric flags.");
          return nullptr;
        }
        flags = static_cast<uint64_t>(signedFlags);
      }
    }

    return createCompatDispatchQueueWrapperForCFunction(
        env, dispatch_get_global_queue(identifier, flags));
  }

  if (strcmp(functionName, "dispatch_get_current_queue") == 0) {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
    return createCompatDispatchQueueWrapperForCFunction(env, dispatch_get_current_queue());
#pragma clang diagnostic pop
  }

  if (strcmp(functionName, "dispatch_async") == 0) {
    if (argc < 2) {
      napi_throw_type_error(env, nullptr, "dispatch_async expects a queue and callback.");
      return nullptr;
    }

    void* queueHandle = nullptr;
    if (!unwrapCompatNativeHandleForCFunction(env, argv[0], &queueHandle) ||
        queueHandle == nullptr) {
      napi_throw_type_error(env, nullptr, "dispatch_async expects a native queue handle.");
      return nullptr;
    }

    napi_valuetype callbackType = napi_undefined;
    if (napi_typeof(env, argv[1], &callbackType) != napi_ok || callbackType != napi_function) {
      napi_throw_type_error(env, nullptr, "dispatch_async expects a function callback.");
      return nullptr;
    }

    auto closure = new Closure(env, std::string("v"), true);
    id block = registerBlock(env, closure, argv[1]);
    dispatch_block_t dispatchBlock = (dispatch_block_t)block;

    dispatch_async(reinterpret_cast<dispatch_queue_t>(queueHandle), dispatchBlock);
    [block release];

    napi_value undefinedValue = nullptr;
    napi_get_undefined(env, &undefinedValue);
    return undefinedValue;
  }

  return nullptr;
}

}  // namespace

inline void ensureCFunctionDispatchLookup(CFunction* function, Cif* cif) {
  if (function == nullptr || cif == nullptr || cif->signatureHash == 0) {
    if (function != nullptr) {
      function->dispatchLookupCached = true;
      function->dispatchLookupSignatureHash = 0;
      function->dispatchId = 0;
      function->preparedInvoker = nullptr;
      function->napiInvoker = nullptr;
      function->engineDirectInvoker = nullptr;
      function->v8Invoker = nullptr;
    }
    return;
  }

  if (function->dispatchLookupCached &&
      function->dispatchLookupSignatureHash == cif->signatureHash) {
    return;
  }

  function->dispatchLookupSignatureHash = cif->signatureHash;
  function->dispatchId = composeSignatureDispatchId(
      cif->signatureHash, SignatureCallKind::CFunction, function->dispatchFlags);
  function->preparedInvoker =
      reinterpret_cast<void*>(lookupCFunctionPreparedInvoker(function->dispatchId));
  function->napiInvoker = reinterpret_cast<void*>(lookupCFunctionNapiInvoker(function->dispatchId));
  function->engineDirectInvoker =
      reinterpret_cast<void*>(lookupCFunctionEngineDirectInvoker(function->dispatchId));
#ifdef TARGET_ENGINE_V8
  function->v8Invoker = reinterpret_cast<void*>(lookupCFunctionV8Invoker(function->dispatchId));
#endif
  function->dispatchLookupCached = true;
}

void ObjCBridgeState::registerFunctionGlobals(napi_env env, napi_value global) {
  MDSectionOffset offset = metadata->functionsOffset;
  while (offset < metadata->protocolsOffset) {
    MDSectionOffset originalOffset = offset;
    auto name = metadata->getString(offset);
    offset += sizeof(MDSectionOffset);
    offset += sizeof(MDSectionOffset);
    offset += sizeof(MDFunctionFlag);

    napi_property_descriptor prop = {
        .utf8name = name,
        .method = CFunction::jsCall,
        .getter = nullptr,
        .setter = nullptr,
        .value = nullptr,
        .attributes = (napi_property_attributes)(napi_enumerable | napi_configurable),
        .data = (void*)((size_t)originalOffset),
    };

    napi_define_properties(env, global, 1, &prop);
  }
}

CFunction* ObjCBridgeState::getCFunction(napi_env env, MDSectionOffset offset) {
  auto cached = cFunctionCache.find(offset);
  if (cached != cFunctionCache.end()) {
    return cached->second;
  }

  auto sigOffset =
      metadata->signaturesOffset + metadata->getOffset(offset + sizeof(MDSectionOffset));
  MDFunctionFlag functionFlags = metadata->getFunctionFlag(offset + sizeof(MDSectionOffset) * 2);

  auto cFunction = new CFunction(dlsym(self_dl, metadata->getString(offset)));
  cFunction->bridgeState = this;
  cFunction->cif = getCFunctionCif(env, sigOffset);
  cFunction->dispatchFlags = (functionFlags & mdFunctionReturnOwned) != 0 ? 1 : 0;
  cFunctionCache[offset] = cFunction;

  return cFunction;
}

napi_value CFunction::jsCall(napi_env env, napi_callback_info cbinfo) {
#ifdef TARGET_ENGINE_HERMES
  if (auto* fastInfo = TryGetHermesFastCallbackInfo(env, cbinfo)) {
    napi_value stackArgs[16];
    std::vector<napi_value> heapArgs;
    napi_value* args = stackArgs;
    const size_t actualArgc = fastInfo->argc;
    if (actualArgc > 16) {
      heapArgs.resize(actualArgc);
      args = heapArgs.data();
    }
    for (size_t i = 0; i < actualArgc; i++) {
      args[i] = HermesFastArg(fastInfo, i);
    }

    return jsCallDirect(
        env, static_cast<MDSectionOffset>(reinterpret_cast<uintptr_t>(fastInfo->data)),
        actualArgc, args);
  }
#endif

  void* _offset = nullptr;
  size_t actualArgc = 16;
  napi_value stackArgs[16];

  napi_get_cb_info(env, cbinfo, &actualArgc, stackArgs, nullptr, &_offset);

  MDSectionOffset offset = (MDSectionOffset)((size_t)_offset);

  if (actualArgc > 16) {
    std::vector<napi_value> dynamicArgs(actualArgc);
    size_t retryArgc = actualArgc;
    napi_get_cb_info(env, cbinfo, &retryArgc, dynamicArgs.data(), nullptr, nullptr);
    dynamicArgs.resize(retryArgc);
    return jsCallDirect(env, offset, retryArgc, dynamicArgs.data());
  }

  return jsCallDirect(env, offset, actualArgc, stackArgs);
}

napi_value CFunction::jsCallDirect(napi_env env, MDSectionOffset offset,
                                   size_t actualArgc,
                                   const napi_value* callArgs) {
  auto bridgeState = ObjCBridgeState::InstanceData(env);
  if (bridgeState == nullptr) {
    napi_throw_error(env, "NativeScriptException", "Missing Objective-C bridge state.");
    return nullptr;
  }

  auto name = bridgeState->metadata->getString(offset);

  if (strcmp(name, "dispatch_async") == 0 || strcmp(name, "dispatch_get_current_queue") == 0 ||
      strcmp(name, "dispatch_get_global_queue") == 0) {
    return tryCallCompatLibdispatchFunction(env, actualArgc, callArgs, name);
  }

  auto func = bridgeState->getCFunction(env, offset);

  auto cif = func->cif;
  ensureCFunctionDispatchLookup(func, cif);
  auto preparedInvoker = reinterpret_cast<CFunctionPreparedInvoker>(func->preparedInvoker);
  auto napiInvoker = reinterpret_cast<CFunctionNapiInvoker>(func->napiInvoker);
  auto engineDirectInvoker =
      reinterpret_cast<CFunctionEngineDirectInvoker>(func->engineDirectInvoker);

  MDFunctionFlag functionFlags =
      bridgeState->metadata->getFunctionFlag(offset + sizeof(MDSectionOffset) * 2);

  const napi_value* invocationArgs = nullptr;
  std::vector<napi_value> paddedArgs;
  if (cif->argc > 0) {
    invocationArgs = callArgs;
    if (actualArgc != cif->argc) {
      napi_value jsUndefined = nullptr;
      napi_get_undefined(env, &jsUndefined);
      paddedArgs.assign(cif->argc, jsUndefined);
      size_t copyArgc = actualArgc < cif->argc ? actualArgc : cif->argc;
      if (copyArgc > 0) {
        memcpy(paddedArgs.data(), callArgs, copyArgc * sizeof(napi_value));
      }
      invocationArgs = paddedArgs.data();
    }
  }

  uint32_t toJSFlags = kCStringAsReference;
  if ((functionFlags & mdFunctionReturnOwned) != 0) {
    toJSFlags |= kReturnOwned;
  }

  const bool isMainEntrypoint =
      strcmp(name, "UIApplicationMain") == 0 || strcmp(name, "NSApplicationMain") == 0;

  if ((engineDirectInvoker != nullptr ||
       (napiInvoker != nullptr && !cif->skipGeneratedNapiDispatch)) &&
      !isMainEntrypoint) {
    @try {
      bool invoked = engineDirectInvoker != nullptr
                         ? engineDirectInvoker(env, cif, func->fnptr, invocationArgs, cif->rvalue)
                         : napiInvoker(env, cif, func->fnptr, invocationArgs, cif->rvalue);
      if (!invoked) {
        return nullptr;
      }
    } @catch (NSException* exception) {
      std::string message = exception.description.UTF8String;
      NSLog(@"ObjC->JS: Exception in CFunction (direct): %s", message.c_str());
      nativescript::NativeScriptException nativeScriptException(message);
      nativeScriptException.ReThrowToJS(env);
      return nullptr;
    }

    napi_value fastResult = nullptr;
    if (TryFastConvertEngineReturnValue(env, cif->returnType->kind, cif->rvalue,
                                        &fastResult)) {
      return fastResult;
    }
    return cif->returnType->toJS(env, cif->rvalue, toJSFlags);
  }

  void* avalues[cif->argc];
  void* rvalue = cif->rvalue;

  bool shouldFreeAny = false;
  bool shouldFree[cif->argc];

  if (cif->argc > 0) {
    for (unsigned int i = 0; i < cif->argc; i++) {
      shouldFree[i] = false;
      avalues[i] = cif->avalues[i];
      cif->argTypes[i]->toNative(env, invocationArgs[i], avalues[i], &shouldFree[i],
                                 &shouldFreeAny);
    }
  }

#ifdef ENABLE_JS_RUNTIME
  if (isMainEntrypoint) {
    void** avaluesPtr = new void*[cif->argc];
    memcpy(avaluesPtr, avalues, cif->argc * sizeof(void*));

    Tasks::Register([env, cif, func, preparedInvoker, rvalue, avaluesPtr]() {
      void* avalues[cif->argc];
      memcpy(avalues, avaluesPtr, cif->argc * sizeof(void*));
      delete[] avaluesPtr;

      @try {
        if (preparedInvoker != nullptr) {
          preparedInvoker(func->fnptr, avalues, rvalue);
        } else {
          ffi_call(&cif->cif, FFI_FN(func->fnptr), rvalue, avalues);
        }
      } @catch (NSException* exception) {
        NapiScope scope(env);
        std::string message = exception.description.UTF8String;
        NSLog(@"ObjC->JS: Exception in CFunction (task): %s", message.c_str());
        nativescript::NativeScriptException nativeScriptException(message);
        nativeScriptException.ReThrowToJS(env);
      }
    });

    return nullptr;
  }
#endif

  @try {
    if (preparedInvoker != nullptr) {
      preparedInvoker(func->fnptr, avalues, rvalue);
    } else {
      ffi_call(&cif->cif, FFI_FN(func->fnptr), rvalue, avalues);
    }
  } @catch (NSException* exception) {
    std::string message = exception.description.UTF8String;
    NSLog(@"ObjC->JS: Exception in CFunction: %s", message.c_str());
    nativescript::NativeScriptException nativeScriptException(message);
    nativeScriptException.ReThrowToJS(env);
    return nullptr;
  }

  if (shouldFreeAny) {
    void* returnPointerValue = nullptr;
    bool returnIsPointer = cif->returnType != nullptr && cif->returnType->type == &ffi_type_pointer;
    if (returnIsPointer && rvalue != nullptr) {
      returnPointerValue = *((void**)rvalue);
    }

    for (unsigned int i = 0; i < cif->argc; i++) {
      if (shouldFree[i]) {
        if (returnPointerValue != nullptr && avalues[i] != nullptr) {
          void* argPointerValue = *((void**)avalues[i]);
          if (argPointerValue == returnPointerValue) {
            continue;
          }
        }
        cif->argTypes[i]->free(env, *((void**)avalues[i]));
      }
    }
  }

  napi_value fastResult = nullptr;
  if (TryFastConvertEngineReturnValue(env, cif->returnType->kind, rvalue,
                                      &fastResult)) {
    return fastResult;
  }
  return cif->returnType->toJS(env, rvalue, toJSFlags);
}

CFunction::~CFunction() { cif = nullptr; }

}  // namespace nativescript

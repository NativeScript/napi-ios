#include "CFunction.h"
#include "ClassMember.h"
#include "ObjCBridge.h"
#include "SignatureDispatch.h"
#include "ffi/NativeScriptException.h"
#include "ffi/Tasks.h"
#include <cstring>
#include <vector>
#ifdef ENABLE_JS_RUNTIME
#include "jsr.h"
#endif

namespace nativescript {

inline void ensureCFunctionDispatchLookup(CFunction* function, Cif* cif) {
  if (function == nullptr || cif == nullptr || cif->signatureHash == 0) {
    if (function != nullptr) {
      function->dispatchLookupCached = true;
      function->dispatchLookupSignatureHash = 0;
      function->dispatchId = 0;
      function->preparedInvoker = nullptr;
      function->napiInvoker = nullptr;
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
  function->napiInvoker =
      reinterpret_cast<void*>(lookupCFunctionNapiInvoker(function->dispatchId));
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
  cFunction->cif = getCFunctionCif(env, sigOffset);
  cFunction->dispatchFlags = (functionFlags & mdFunctionReturnOwned) != 0 ? 1 : 0;
  cFunctionCache[offset] = cFunction;

  return cFunction;
}

napi_value CFunction::jsCall(napi_env env, napi_callback_info cbinfo) {
  void* _offset;

  napi_get_cb_info(env, cbinfo, nullptr, nullptr, nullptr, &_offset);

  auto bridgeState = ObjCBridgeState::InstanceData(env);
  MDSectionOffset offset = (MDSectionOffset)((size_t)_offset);

  auto name = bridgeState->metadata->getString(offset);

  auto func = bridgeState->getCFunction(env, offset);

  auto cif = func->cif;
  ensureCFunctionDispatchLookup(func, cif);
  auto preparedInvoker = reinterpret_cast<CFunctionPreparedInvoker>(func->preparedInvoker);
  auto napiInvoker = reinterpret_cast<CFunctionNapiInvoker>(func->napiInvoker);

  MDFunctionFlag functionFlags = bridgeState->metadata->getFunctionFlag(
      offset + sizeof(MDSectionOffset) * 2);

  const napi_value* invocationArgs = nullptr;
  std::vector<napi_value> dynamicArgs;
  std::vector<napi_value> paddedArgs;
  napi_value stackArgs[16];
  if (cif->argc > 0) {
    size_t actualArgc = 16;
    napi_get_cb_info(env, cbinfo, &actualArgc, stackArgs, nullptr, nullptr);

    const napi_value* callArgs = stackArgs;
    if (actualArgc > 16) {
      dynamicArgs.resize(actualArgc);
      size_t retryArgc = actualArgc;
      napi_get_cb_info(env, cbinfo, &retryArgc, dynamicArgs.data(), nullptr, nullptr);
      dynamicArgs.resize(retryArgc);
      actualArgc = retryArgc;
      callArgs = dynamicArgs.data();
    }

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

  if (napiInvoker != nullptr && !isMainEntrypoint) {
    @try {
      if (!napiInvoker(env, cif, func->fnptr, invocationArgs, cif->rvalue)) {
        return nullptr;
      }
    } @catch (NSException* exception) {
      std::string message = exception.description.UTF8String;
      NSLog(@"ObjC->JS: Exception in CFunction (direct): %s", message.c_str());
      nativescript::NativeScriptException nativeScriptException(message);
      nativeScriptException.ReThrowToJS(env);
      return nullptr;
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

  return cif->returnType->toJS(env, rvalue, toJSFlags);
}

CFunction::~CFunction() { cif = nullptr; }

}  // namespace nativescript

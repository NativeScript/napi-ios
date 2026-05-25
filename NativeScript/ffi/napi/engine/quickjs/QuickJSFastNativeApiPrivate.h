#ifndef NS_QUICKJS_FAST_NATIVE_API_PRIVATE_H
#define NS_QUICKJS_FAST_NATIVE_API_PRIVATE_H

#include "QuickJSFastNativeApi.h"

#ifdef TARGET_ENGINE_QUICKJS

#import <Foundation/Foundation.h>

#include <objc/message.h>
#include <quickjs.h>
#include <sys/queue.h>

#include <cassert>
#include <cmath>
#include <cstring>
#include <string>
#include <unordered_map>
#include <vector>

#include "ffi/napi/CFunction.h"
#include "ffi/napi/ClassBuilder.h"
#include "ffi/napi/ClassMember.h"
#include "EngineDirectCall.h"
#include "InvocationSupport.h"
#include "ffi/napi/Interop.h"
#include "MetadataReader.h"
#include "runtime/NativeScriptException.h"
#include "ffi/napi/ObjCBridge.h"
#include "SignatureDispatch.h"
#include "ffi/napi/TypeConv.h"
#include "mimalloc.h"
#include "quicks-runtime.h"

#ifndef SLIST_FOREACH_SAFE
#define SLIST_FOREACH_SAFE(var, head, field, tvar) \
  for ((var) = SLIST_FIRST((head));                \
       (var) && ((tvar) = SLIST_NEXT((var), field), 1); (var) = (tvar))
#endif

enum QuickJSFastHandleType {
  kQuickJSFastHandleStackAllocated,
  kQuickJSFastHandleHeapAllocated,
};

struct QuickJSFastHandle {
  JSValue value;
  SLIST_ENTRY(QuickJSFastHandle) node;
  QuickJSFastHandleType type;
};

struct napi_handle_scope__ {
  LIST_ENTRY(napi_handle_scope__) node;
  SLIST_HEAD(, QuickJSFastHandle) handleList;
  bool escapeCalled;
  QuickJSFastHandle stackHandles[8];
  int handleCount;
  QuickJSFastHandleType type;
};

struct napi_ref__ {
  JSValue value;
  LIST_ENTRY(napi_ref__) node;
  uint8_t referenceCount;
};

struct QuickJSFastExternalInfo {
  void* data;
  void* finalizeHint;
  napi_finalize finalizeCallback;
};

struct QuickJSFastAtoms {
  JSAtom napi_external;
  JSAtom registerFinalizer;
  JSAtom constructor;
  JSAtom prototype;
  JSAtom napi_buffer;
  JSAtom NAPISymbolFor;
  JSAtom object;
  JSAtom freeze;
  JSAtom seal;
  JSAtom Symbol;
  JSAtom length;
  JSAtom is;
  JSAtom byteLength;
  JSAtom buffer;
  JSAtom byteOffset;
  JSAtom name;
  JSAtom napi_typetag;
  JSAtom weakref;
};

struct napi_runtime__ {
  JSRuntime* runtime;
  JSClassID constructorClassId;
  JSClassID functionClassId;
  JSClassID externalClassId;
  JSClassID napiHostObjectClassId;
  JSClassID napiObjectClassId;
};

struct napi_env__ {
  JSValue referenceSymbolValue;
  napi_runtime runtime;
  JSContext* context;
  LIST_HEAD(, napi_handle_scope__) handleScopeList;
  LIST_HEAD(, napi_ref__) referencesList;
  bool isThrowNull;
  QuickJSFastExternalInfo* instanceData;
  JSValue finalizationRegistry;
  napi_extended_error_info last_error;
  QuickJSFastAtoms atoms;
  QuickJSFastExternalInfo* gcBefore;
  QuickJSFastExternalInfo* gcAfter;
  int js_enter_state;
  int64_t usedMemory;
};

enum QuickJSFastNativeKind : int {
  kQuickJSFastObjCMethod = 1,
  kQuickJSFastObjCGetter = 2,
  kQuickJSFastObjCSetter = 3,
  kQuickJSFastObjCReadOnlySetter = 4,
  kQuickJSFastCFunction = 5,
};

enum class QuickJSEngineDirectResult {
  NotHandled,
  Handled,
  Failed,
};

inline JSValue ToJSValue(napi_value value) {
  return value != nullptr ? *reinterpret_cast<JSValue*>(value) : JS_UNDEFINED;
}

class QuickJSFastStackHandleScope {
 public:
  explicit QuickJSFastStackHandleScope(napi_env env) : env_(env) {
    scope_.type = kQuickJSFastHandleStackAllocated;
    scope_.handleCount = 0;
    scope_.escapeCalled = false;
    SLIST_INIT(&scope_.handleList);
    LIST_INSERT_HEAD(&env_->handleScopeList, &scope_, node);
  }

  ~QuickJSFastStackHandleScope() { close(); }

  void close() {
    if (closed_) {
      return;
    }

    assert(LIST_FIRST(&env_->handleScopeList) == &scope_ &&
           "QuickJS fast native handle scope should follow FILO rule.");
    QuickJSFastHandle *handle, *tempHandle;
    SLIST_FOREACH_SAFE(handle, &scope_.handleList, node, tempHandle) {
      JS_FreeValue(env_->context, handle->value);
      handle->value = JS_UNDEFINED;
      SLIST_REMOVE(&scope_.handleList, handle, QuickJSFastHandle, node);
      if (handle->type == kQuickJSFastHandleHeapAllocated) {
        mi_free(handle);
      }
    }
    LIST_REMOVE(&scope_, node);
    closed_ = true;
  }

 private:
  napi_env env_ = nullptr;
  napi_handle_scope__ scope_{};
  bool closed_ = false;
};

bool makeQuickJSObjCReturnValue(
    JSContext* context, napi_env env, nativescript::ObjCClassMember* member,
    nativescript::MethodDescriptor* descriptor, nativescript::Cif* cif,
    id self, bool receiverIsClass, napi_value jsThis, void* rvalue,
    bool propertyAccess, JSValue* result);

bool makeQuickJSCFunctionReturnValue(JSContext* context, napi_env env,
                                     nativescript::CFunction* function,
                                     nativescript::Cif* cif, void* rvalue,
                                     JSValue* result);

namespace nativescript {

bool TryUnwrapQuickJSNativeObjectFast(napi_env env, JSValue jsValue,
                                      void** result);

}  // namespace nativescript

#endif  // TARGET_ENGINE_QUICKJS

#endif  // NS_QUICKJS_FAST_NATIVE_API_PRIVATE_H

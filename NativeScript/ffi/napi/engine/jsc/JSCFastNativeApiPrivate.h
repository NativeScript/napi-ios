#ifndef NS_JSC_FAST_NATIVE_API_PRIVATE_H
#define NS_JSC_FAST_NATIVE_API_PRIVATE_H

#include "JSCFastNativeApi.h"

#ifdef TARGET_ENGINE_JSC

#import <Foundation/Foundation.h>

#include <objc/message.h>
#include <cmath>
#include <cstdlib>
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
#include "ffi/napi/Object.h"
#include "ffi/napi/ObjCBridge.h"
#include "SignatureDispatch.h"
#include "ffi/napi/TypeConv.h"
#include "jsc-api.h"

namespace nativescript {

enum class JSCFastNativeKind : uint8_t {
  ObjCMethod = 1,
  ObjCGetter = 2,
  ObjCSetter = 3,
  ObjCReadOnlySetter = 4,
  CFunction = 5,
};

enum class JSCEngineDirectResult {
  NotHandled,
  Handled,
  Failed,
};

struct JSCFastNativeBinding {
  napi_env env = nullptr;
  JSCFastNativeKind kind = JSCFastNativeKind::ObjCMethod;
  void* data = nullptr;
};

inline JSValueRef ToJSValue(napi_value value) {
  return reinterpret_cast<JSValueRef>(value);
}

inline napi_value ToNapi(JSValueRef value) {
  return reinterpret_cast<napi_value>(const_cast<OpaqueJSValue*>(value));
}

class ScopedJSString {
 public:
  explicit ScopedJSString(const char* value)
      : value_(JSStringCreateWithUTF8CString(value != nullptr ? value : "")) {}

  ~ScopedJSString() {
    if (value_ != nullptr) {
      JSStringRelease(value_);
    }
  }

  operator JSStringRef() const { return value_; }

 private:
  JSStringRef value_ = nullptr;
};

bool makeJSCObjCReturnValue(napi_env env, ObjCClassMember* member,
                            MethodDescriptor* descriptor, Cif* cif, id self,
                            bool receiverIsClass, napi_value jsThis,
                            void* rvalue, bool propertyAccess,
                            JSValueRef* result);

bool makeJSCCFunctionReturnValue(napi_env env, CFunction* function, Cif* cif,
                                 void* rvalue, JSValueRef* result);

}  // namespace nativescript

#endif  // TARGET_ENGINE_JSC

#endif  // NS_JSC_FAST_NATIVE_API_PRIVATE_H

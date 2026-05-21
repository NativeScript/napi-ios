#ifndef NS_ENGINE_DIRECT_CALL_H
#define NS_ENGINE_DIRECT_CALL_H

#include <cstddef>
#include <cstdint>

#include <objc/objc.h>

#include "MetadataReader.h"
#include "js_native_api.h"

namespace nativescript {

using metagen::MDSectionOffset;

class CFunction;
class Cif;
class ObjCClassMember;
struct MethodDescriptor;

enum class EngineDirectMemberKind : uint8_t {
  Method,
  Getter,
  Setter,
};

napi_value TryCallObjCMemberEngineDirect(napi_env env, ObjCClassMember* member,
                                         napi_value jsThis, size_t actualArgc,
                                         const napi_value* rawArgs,
                                         EngineDirectMemberKind kind,
                                         bool* handled);

napi_value TryCallCFunctionEngineDirect(napi_env env, MDSectionOffset offset,
                                        size_t actualArgc,
                                        const napi_value* rawArgs,
                                        bool* handled);

bool InvokeObjCMemberEngineDirectDynamic(napi_env env, Cif* cif, id self,
                                         bool receiverIsClass,
                                         MethodDescriptor* descriptor,
                                         uint8_t dispatchFlags,
                                         size_t actualArgc,
                                         const napi_value* rawArgs,
                                         void* rvalue);

bool InvokeCFunctionEngineDirectDynamic(napi_env env, CFunction* function,
                                        Cif* cif, size_t actualArgc,
                                        const napi_value* rawArgs,
                                        void* rvalue);

}  // namespace nativescript

#endif  // NS_ENGINE_DIRECT_CALL_H

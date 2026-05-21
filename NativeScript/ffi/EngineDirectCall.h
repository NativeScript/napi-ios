#ifndef NS_ENGINE_DIRECT_CALL_H
#define NS_ENGINE_DIRECT_CALL_H

#include <cstddef>
#include <cstdint>

#include "MetadataReader.h"
#include "js_native_api.h"

namespace nativescript {

using metagen::MDSectionOffset;

class ObjCClassMember;

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

}  // namespace nativescript

#endif  // NS_ENGINE_DIRECT_CALL_H

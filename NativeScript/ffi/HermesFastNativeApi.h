#ifndef NS_HERMES_FAST_NATIVE_API_H
#define NS_HERMES_FAST_NATIVE_API_H

#include <cstddef>

#include "EngineDirectCall.h"
#include "MetadataReader.h"
#include "js_native_api.h"

#ifdef TARGET_ENGINE_HERMES

namespace nativescript {

class ObjCClassMember;

napi_value TryCallHermesObjCMemberFast(napi_env env, ObjCClassMember* member,
                                       napi_value jsThis, size_t actualArgc,
                                       const napi_value* rawArgs,
                                       EngineDirectMemberKind kind,
                                       bool* handled);

napi_value TryCallHermesCFunctionFast(napi_env env, MDSectionOffset offset,
                                      size_t actualArgc,
                                      const napi_value* rawArgs,
                                      bool* handled);

}  // namespace nativescript

#endif  // TARGET_ENGINE_HERMES

#endif  // NS_HERMES_FAST_NATIVE_API_H

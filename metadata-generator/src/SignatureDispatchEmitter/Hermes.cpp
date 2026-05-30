#include "SignatureDispatchEmitter/Shared.h"

#include <sstream>
#include <vector>

namespace metagen::signature_dispatch {

std::string makeHermesDirectReturnWrapperName(DispatchKind kind, size_t index) {
  std::ostringstream stream;
  stream << "dh";
  switch (kind) {
    case DispatchKind::ObjCMethod:
      stream << "o";
      break;
    case DispatchKind::CFunction:
      stream << "c";
      break;
    case DispatchKind::BlockInvoke:
      stream << "b";
      break;
  }
  stream << toBase36(index);
  return stream.str();
}

std::string makeHermesFrameDirectReturnWrapperName(DispatchKind kind,
                                                   size_t index) {
  std::ostringstream stream;
  stream << "hf";
  switch (kind) {
    case DispatchKind::ObjCMethod:
      stream << "o";
      break;
    case DispatchKind::CFunction:
      stream << "c";
      break;
    case DispatchKind::BlockInvoke:
      stream << "b";
      break;
  }
  stream << toBase36(index);
  return stream.str();
}

bool canSetHermesReturnDirectly(MDTypeKind kind) {
  switch (kind) {
    case mdTypeVoid:
    case mdTypeBool:
    case mdTypeChar:
    case mdTypeUChar:
    case mdTypeUInt8:
    case mdTypeSShort:
    case mdTypeUShort:
    case mdTypeSInt:
    case mdTypeUInt:
    case mdTypeSLong:
    case mdTypeULong:
    case mdTypeSInt64:
    case mdTypeUInt64:
    case mdTypeFloat:
    case mdTypeDouble:
      return true;
    default:
      return false;
  }
}

bool canSetHermesObjCReturnDirectly(MDTypeKind kind) {
  if (canSetHermesReturnDirectly(kind)) {
    return true;
  }

  switch (kind) {
    case mdTypeAnyObject:
    case mdTypeProtocolObject:
    case mdTypeClassObject:
    case mdTypeInstanceObject:
    case mdTypeNSStringObject:
    case mdTypeNSMutableStringObject:
      return true;
    default:
      return false;
  }
}

void writeHermesDirectReturnValue(std::ostringstream& out, DispatchKind dispatchKind,
                                  MDTypeKind kind,
                                  const std::string& valueExpr) {
  // Emits an open failure branch; the caller appends cleanup and `return false`.
  switch (kind) {
    case mdTypeVoid:
      out << "  if (!SetHermesGeneratedVoidReturn(env, result)) {\n";
      break;
    case mdTypeBool:
      out << "  if (!SetHermesGeneratedBoolReturn(cif, result, " << valueExpr
          << " != 0)) {\n";
      break;
    case mdTypeChar:
      out << "  if (!SetHermesGeneratedInt8Return(cif, result, static_cast<int8_t>("
          << valueExpr << "))) {\n";
      break;
    case mdTypeUChar:
    case mdTypeUInt8:
      out << "  if (!SetHermesGeneratedUInt8Return(cif, result, static_cast<uint8_t>("
          << valueExpr << "))) {\n";
      break;
    case mdTypeSShort:
      out << "  if (!SetHermesGeneratedInt16Return(cif, result, static_cast<int16_t>("
          << valueExpr << "))) {\n";
      break;
    case mdTypeUShort:
      out << "  if (!SetHermesGeneratedUInt16Return(env, cif, result, "
             "static_cast<uint16_t>("
          << valueExpr << "))) {\n";
      break;
    case mdTypeSInt:
      out << "  if (!SetHermesGeneratedInt32Return(cif, result, static_cast<int32_t>("
          << valueExpr << "))) {\n";
      break;
    case mdTypeUInt:
      out << "  if (!SetHermesGeneratedUInt32Return(cif, result, static_cast<uint32_t>("
          << valueExpr << "))) {\n";
      break;
    case mdTypeSLong:
    case mdTypeSInt64:
      out << "  if (!SetHermesGeneratedInt64Return(env, cif, result, "
             "static_cast<int64_t>("
          << valueExpr << "))) {\n";
      break;
    case mdTypeULong:
    case mdTypeUInt64:
      out << "  if (!SetHermesGeneratedUInt64Return(env, cif, result, "
             "static_cast<uint64_t>("
          << valueExpr << "))) {\n";
      break;
    case mdTypeFloat:
    case mdTypeDouble:
      out << "  if (!SetHermesGeneratedDoubleReturn(cif, result, static_cast<double>("
          << valueExpr << "))) {\n";
      break;
    case mdTypeAnyObject:
    case mdTypeProtocolObject:
    case mdTypeClassObject:
    case mdTypeInstanceObject:
    case mdTypeNSStringObject:
    case mdTypeNSMutableStringObject:
      if (dispatchKind == DispatchKind::ObjCMethod) {
        out << "  if (!TryFastSetHermesGeneratedObjCObjectReturnValue("
               "env, cif, returnContext, selector, cif->returnType->kind, "
            << valueExpr << ", result)) {\n";
      } else {
        out << "  if (!TryFastConvertHermesReturnValue(env, cif, "
               "cif->returnType->kind, &"
            << valueExpr << ", result)) {\n";
      }
      break;
    default:
      out << "  if (!TryFastConvertHermesReturnValue(env, cif, static_cast<MDTypeKind>("
          << static_cast<int>(kind) << "), &" << valueExpr << ", result)) {\n";
      break;
  }
}
bool canUseHermesDirectReturnWrapper(DispatchKind kind,
                                     const MDSignature* signature,
                                     HermesDirectReturnCallSite callSite) {
  if (callSite == HermesDirectReturnCallSite::FastCallback &&
      kind == DispatchKind::BlockInvoke) {
    return false;
  }

  if (signature == nullptr || signature->returnType == nullptr) {
    return false;
  }

  const bool canSetReturnDirectly =
      kind == DispatchKind::ObjCMethod
          ? canSetHermesObjCReturnDirectly(signature->returnType->kind)
          : canSetHermesReturnDirectly(signature->returnType->kind);
  if (!canSetReturnDirectly) {
    return false;
  }

  for (const auto* arg : signature->arguments) {
    if (arg == nullptr || argKindMayNeedCleanup(arg->kind)) {
      return false;
    }
  }

  return true;
}
const char* hermesFrameRawConverterForKind(MDTypeKind kind) {
  switch (kind) {
    case mdTypeBool:
      return "TryFastConvertHermesGeneratedBoolRawArgument";
    case mdTypeChar:
      return "TryFastConvertHermesGeneratedInt8RawArgument";
    case mdTypeUChar:
    case mdTypeUInt8:
      return "TryFastConvertHermesGeneratedUInt8RawArgument";
    case mdTypeSShort:
      return "TryFastConvertHermesGeneratedInt16RawArgument";
    case mdTypeUShort:
      return "TryFastConvertHermesGeneratedUInt16RawArgument";
    case mdTypeSInt:
      return "TryFastConvertHermesGeneratedInt32RawArgument";
    case mdTypeUInt:
      return "TryFastConvertHermesGeneratedUInt32RawArgument";
    case mdTypeSLong:
    case mdTypeSInt64:
      return "TryFastConvertHermesGeneratedInt64RawArgument";
    case mdTypeULong:
    case mdTypeUInt64:
      return "TryFastConvertHermesGeneratedUInt64RawArgument";
    case mdTypeFloat:
      return "TryFastConvertHermesGeneratedFloatRawArgument";
    case mdTypeDouble:
      return "TryFastConvertHermesGeneratedDoubleRawArgument";
    default:
      return nullptr;
  }
}
void writeHermesFrameArgConversion(std::ostringstream& out,
                                   const MDTypeInfo* type, size_t index) {
  if (type == nullptr) {
    out << "  return false;\n";
    return;
  }

  if (const char* rawConverter = hermesFrameRawConverterForKind(type->kind)) {
    out << "  if (!" << rawConverter << "(argRaw" << index << ", &arg"
        << index << ")) {\n";
    out << "    napi_value argValue" << index
        << " = hermesDispatchFrameArg(argsBase, " << index << ");\n";
    out << "    bool ignoredShouldFree = false;\n";
    out << "    bool ignoredShouldFreeAny = false;\n";
    out << "    cif->argTypes[" << index << "]->toNative(env, argValue"
        << index << ", &arg" << index
        << ", &ignoredShouldFree, &ignoredShouldFreeAny);\n";
    out << "  }\n";
    return;
  }

  writeEngineDirectArgConversion(
      out, type, index, "argValue" + std::to_string(index));
}
void writeHermesDirectReturnWrapper(std::ostringstream& out, DispatchKind kind,
                                    const std::string& wrapperName,
                                    const MDSignature* signature) {
  if (!canUseHermesDirectReturnWrapper(
          kind, signature, HermesDirectReturnCallSite::FastCallback)) {
    return;
  }

  std::string returnType;
  if (!mapTypeToCpp(signature->returnType, &returnType, true)) {
    return;
  }

  std::vector<const MDTypeInfo*> argTypeInfos;
  std::vector<std::string> argTypes;
  argTypes.reserve(signature->arguments.size());
  argTypeInfos.reserve(signature->arguments.size());
  for (const auto* arg : signature->arguments) {
    std::string argType;
    if (!mapTypeToCpp(arg, &argType, false)) {
      return;
    }
    argTypeInfos.push_back(arg);
    argTypes.push_back(argType);
  }

  out << "static inline bool " << wrapperName
      << "(napi_env env, Cif* cif, void* fnptr, ";
  if (kind == DispatchKind::ObjCMethod) {
    out << "id self, SEL selector, "
           "const HermesObjCReturnContext* returnContext, ";
  }
  out << "const napi_value* argv, napi_value* result) {\n";

  out << "  using Fn = " << returnType << " (*)(";
  bool first = true;
  if (kind == DispatchKind::ObjCMethod) {
    out << "id, SEL";
    first = false;
  }
  for (const auto& argType : argTypes) {
    if (!first) {
      out << ", ";
    }
    out << argType;
    first = false;
  }
  out << ");\n";
  out << "  auto fn = reinterpret_cast<Fn>(fnptr);\n";

  std::vector<size_t> cleanupArgIndexes;
  cleanupArgIndexes.reserve(argTypes.size());
  for (size_t i = 0; i < argTypes.size(); i++) {
    if (argKindMayNeedCleanup(argTypeInfos[i]->kind)) {
      cleanupArgIndexes.push_back(i);
    }
  }
  const bool hasCleanupArgs = !cleanupArgIndexes.empty();
  if (hasCleanupArgs) {
    out << "  bool shouldFreeAny = false;\n";
  }
  if (returnType != "void") {
    out << "  " << returnType << " nativeResult{};\n";
  }

  for (size_t i = 0; i < argTypes.size(); i++) {
    out << "  " << argTypes[i] << " arg" << i << "{};\n";
    if (argKindMayNeedCleanup(argTypeInfos[i]->kind)) {
      out << "  bool shouldFree" << i << " = false;\n";
    }
  }

  if (hasCleanupArgs) {
    out << "  auto cleanupManagedArgs = [&]() {\n";
    out << "    if (shouldFreeAny) {\n";
    if (kind == DispatchKind::CFunction && returnType != "void") {
      out << "      void* returnPointerValue = nullptr;\n";
      out << "      if (cif->returnType != nullptr && cif->returnType->type == "
             "&ffi_type_pointer) {\n";
      out << "        returnPointerValue = "
             "*reinterpret_cast<void**>(&nativeResult);\n";
      out << "      }\n";
    }
    for (const auto i : cleanupArgIndexes) {
      out << "      if (shouldFree" << i << ") {\n";
      if (kind == DispatchKind::CFunction && returnType != "void") {
        out << "        if (returnPointerValue != nullptr && "
               "*reinterpret_cast<void**>(&arg"
            << i << ") == returnPointerValue) {\n";
        out << "        } else {\n";
        out << "          cif->argTypes[" << i
            << "]->free(env, *reinterpret_cast<void**>(&arg" << i << "));\n";
        out << "        }\n";
      } else {
        out << "        cif->argTypes[" << i
            << "]->free(env, *reinterpret_cast<void**>(&arg" << i << "));\n";
      }
      out << "      }\n";
    }
    out << "    }\n";
    out << "  };\n";
  }

  for (size_t i = 0; i < argTypes.size(); i++) {
    writeEngineDirectArgConversion(out, argTypeInfos[i], i, "");
  }

  std::ostringstream callExpr;
  callExpr << "fn(";
  bool hasAnyCallArg = false;
  if (kind == DispatchKind::ObjCMethod) {
    callExpr << "self, selector";
    hasAnyCallArg = true;
  }
  for (size_t i = 0; i < argTypes.size(); i++) {
    if (hasAnyCallArg) {
      callExpr << ", ";
    }
    callExpr << "arg" << i;
    hasAnyCallArg = true;
  }
  callExpr << ")";

  if (returnType == "void") {
    out << "  " << callExpr.str() << ";\n";
    writeHermesDirectReturnValue(out, kind, signature->returnType->kind, "");
  } else {
    out << "  nativeResult = " << callExpr.str() << ";\n";
    writeHermesDirectReturnValue(out, kind, signature->returnType->kind,
                                 "nativeResult");
  }
  if (hasCleanupArgs) {
    out << "    cleanupManagedArgs();\n";
  }
  out << "    return false;\n";
  out << "  }\n";
  if (hasCleanupArgs) {
    out << "  cleanupManagedArgs();\n";
  }
  out << "  return true;\n";
  out << "}\n\n";
}

void writeHermesFrameDirectReturnWrapper(std::ostringstream& out,
                                         DispatchKind kind,
                                         const std::string& wrapperName,
                                         const MDSignature* signature) {
  if (!canUseHermesDirectReturnWrapper(kind, signature,
                                       HermesDirectReturnCallSite::Frame)) {
    return;
  }

  std::string returnType;
  if (!mapTypeToCpp(signature->returnType, &returnType, true)) {
    return;
  }

  std::vector<const MDTypeInfo*> argTypeInfos;
  std::vector<std::string> argTypes;
  argTypes.reserve(signature->arguments.size());
  argTypeInfos.reserve(signature->arguments.size());
  for (const auto* arg : signature->arguments) {
    std::string argType;
    if (!mapTypeToCpp(arg, &argType, false)) {
      return;
    }
    argTypeInfos.push_back(arg);
    argTypes.push_back(argType);
  }

  out << "static inline bool " << wrapperName
      << "(napi_env env, Cif* cif, void* fnptr, ";
  if (kind == DispatchKind::ObjCMethod) {
    out << "id self, SEL selector, "
           "const HermesObjCReturnContext* returnContext, ";
  } else if (kind == DispatchKind::BlockInvoke) {
    out << "void* block, ";
  }
  out << "const uint64_t* argsBase, napi_value* result) {\n";

  out << "  using Fn = " << returnType << " (*)(";
  bool first = true;
  if (kind == DispatchKind::ObjCMethod) {
    out << "id, SEL";
    first = false;
  } else if (kind == DispatchKind::BlockInvoke) {
    out << "void*";
    first = false;
  }
  for (const auto& argType : argTypes) {
    if (!first) {
      out << ", ";
    }
    out << argType;
    first = false;
  }
  out << ");\n";
  out << "  auto fn = reinterpret_cast<Fn>(fnptr);\n";

  std::vector<size_t> cleanupArgIndexes;
  cleanupArgIndexes.reserve(argTypes.size());
  for (size_t i = 0; i < argTypes.size(); i++) {
    if (argKindMayNeedCleanup(argTypeInfos[i]->kind)) {
      cleanupArgIndexes.push_back(i);
    }
  }
  const bool hasCleanupArgs = !cleanupArgIndexes.empty();
  if (hasCleanupArgs) {
    out << "  bool shouldFreeAny = false;\n";
  }
  if (returnType != "void") {
    out << "  " << returnType << " nativeResult{};\n";
  }

  for (size_t i = 0; i < argTypes.size(); i++) {
    if (hermesFrameRawConverterForKind(argTypeInfos[i]->kind) != nullptr) {
      out << "  uint64_t argRaw" << i
          << " = hermesDispatchFrameRawArg(argsBase, " << i << ");\n";
    } else {
      out << "  napi_value argValue" << i
          << " = hermesDispatchFrameArg(argsBase, " << i << ");\n";
    }
    out << "  " << argTypes[i] << " arg" << i << "{};\n";
    if (argKindMayNeedCleanup(argTypeInfos[i]->kind)) {
      out << "  bool shouldFree" << i << " = false;\n";
    }
  }

  if (hasCleanupArgs) {
    out << "  auto cleanupManagedArgs = [&]() {\n";
    out << "    if (shouldFreeAny) {\n";
    if (kind != DispatchKind::ObjCMethod && returnType != "void") {
      out << "      void* returnPointerValue = nullptr;\n";
      out << "      if (cif->returnType != nullptr && cif->returnType->type == "
             "&ffi_type_pointer) {\n";
      out << "        returnPointerValue = "
             "*reinterpret_cast<void**>(&nativeResult);\n";
      out << "      }\n";
    }
    for (const auto i : cleanupArgIndexes) {
      out << "      if (shouldFree" << i << ") {\n";
      if (kind != DispatchKind::ObjCMethod && returnType != "void") {
        out << "        if (returnPointerValue != nullptr && "
               "*reinterpret_cast<void**>(&arg"
            << i << ") == returnPointerValue) {\n";
        out << "        } else {\n";
        out << "          cif->argTypes[" << i
            << "]->free(env, *reinterpret_cast<void**>(&arg" << i << "));\n";
        out << "        }\n";
      } else {
        out << "        cif->argTypes[" << i
            << "]->free(env, *reinterpret_cast<void**>(&arg" << i << "));\n";
      }
      out << "      }\n";
    }
    out << "    }\n";
    out << "  };\n";
  }

  for (size_t i = 0; i < argTypes.size(); i++) {
    writeHermesFrameArgConversion(out, argTypeInfos[i], i);
  }

  std::ostringstream callExpr;
  callExpr << "fn(";
  bool hasAnyCallArg = false;
  if (kind == DispatchKind::ObjCMethod) {
    callExpr << "self, selector";
    hasAnyCallArg = true;
  } else if (kind == DispatchKind::BlockInvoke) {
    callExpr << "block";
    hasAnyCallArg = true;
  }
  for (size_t i = 0; i < argTypes.size(); i++) {
    if (hasAnyCallArg) {
      callExpr << ", ";
    }
    callExpr << "arg" << i;
    hasAnyCallArg = true;
  }
  callExpr << ")";

  if (returnType == "void") {
    out << "  " << callExpr.str() << ";\n";
    writeHermesDirectReturnValue(out, kind, signature->returnType->kind, "");
  } else {
    out << "  nativeResult = " << callExpr.str() << ";\n";
    writeHermesDirectReturnValue(out, kind, signature->returnType->kind,
                                 "nativeResult");
  }
  if (hasCleanupArgs) {
    out << "    cleanupManagedArgs();\n";
  }
  out << "    return false;\n";
  out << "  }\n";
  if (hasCleanupArgs) {
    out << "  cleanupManagedArgs();\n";
  }
  out << "  return true;\n";
  out << "}\n\n";
}

}  // namespace metagen::signature_dispatch

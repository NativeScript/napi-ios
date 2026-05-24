#include "SignatureDispatchEmitter/Shared.h"

#include <sstream>
#include <string>
#include <vector>

namespace metagen::signature_dispatch {

std::string makeEngineDirectWrapperName(DispatchKind kind, size_t index) {
  std::ostringstream stream;
  stream << "de";
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
const char* engineDirectConverterMacroForKind(MDTypeKind kind) {
  switch (kind) {
    case mdTypeBool:
      return "NS_GSD_ENGINE_DIRECT_CONVERT_BOOL_ARGUMENT";
    case mdTypeChar:
      return "NS_GSD_ENGINE_DIRECT_CONVERT_INT8_ARGUMENT";
    case mdTypeUChar:
    case mdTypeUInt8:
      return "NS_GSD_ENGINE_DIRECT_CONVERT_UINT8_ARGUMENT";
    case mdTypeSShort:
      return "NS_GSD_ENGINE_DIRECT_CONVERT_INT16_ARGUMENT";
    case mdTypeUShort:
      return "NS_GSD_ENGINE_DIRECT_CONVERT_UINT16_ARGUMENT";
    case mdTypeSInt:
      return "NS_GSD_ENGINE_DIRECT_CONVERT_INT32_ARGUMENT";
    case mdTypeUInt:
      return "NS_GSD_ENGINE_DIRECT_CONVERT_UINT32_ARGUMENT";
    case mdTypeSLong:
    case mdTypeSInt64:
      return "NS_GSD_ENGINE_DIRECT_CONVERT_INT64_ARGUMENT";
    case mdTypeULong:
    case mdTypeUInt64:
      return "NS_GSD_ENGINE_DIRECT_CONVERT_UINT64_ARGUMENT";
    case mdTypeFloat:
      return "NS_GSD_ENGINE_DIRECT_CONVERT_FLOAT_ARGUMENT";
    case mdTypeDouble:
      return "NS_GSD_ENGINE_DIRECT_CONVERT_DOUBLE_ARGUMENT";
    case mdTypeSelector:
      return "NS_GSD_ENGINE_DIRECT_CONVERT_SELECTOR_ARGUMENT";
    case mdTypeClass:
    case mdTypeAnyObject:
    case mdTypeProtocolObject:
    case mdTypeClassObject:
    case mdTypeInstanceObject:
    case mdTypeNSStringObject:
    case mdTypeNSMutableStringObject:
      return "NS_GSD_ENGINE_DIRECT_CONVERT_OBJECT_ARGUMENT";
    default:
      return "NS_GSD_ENGINE_DIRECT_CONVERT_ARGUMENT";
  }
}

bool engineDirectConverterTakesKind(MDTypeKind kind) {
  switch (kind) {
    case mdTypeClass:
    case mdTypeAnyObject:
    case mdTypeProtocolObject:
    case mdTypeClassObject:
    case mdTypeInstanceObject:
    case mdTypeNSStringObject:
    case mdTypeNSMutableStringObject:
      return true;
    default:
      return engineDirectConverterMacroForKind(kind) ==
             std::string("NS_GSD_ENGINE_DIRECT_CONVERT_ARGUMENT");
  }
}
void writeEngineDirectArgConversion(std::ostringstream& out,
                                    const MDTypeInfo* type, size_t index,
                                    const std::string& valueExpr = "") {
  if (type == nullptr) {
    out << "  return false;\n";
    return;
  }

  const std::string argValue =
      valueExpr.empty() ? "argv[" + std::to_string(index) + "]" : valueExpr;
  const char* converter = engineDirectConverterMacroForKind(type->kind);
  out << "  if (!" << converter << "(env, ";
  if (engineDirectConverterTakesKind(type->kind)) {
    out << "static_cast<MDTypeKind>(" << static_cast<int>(type->kind)
        << "), ";
  }
  out << argValue << ", &arg" << index << ")) {\n";
  if (argKindMayNeedCleanup(type->kind)) {
    out << "    cif->argTypes[" << index << "]->toNative(env, " << argValue
        << ", &arg" << index << ", &shouldFree" << index
        << ", &shouldFreeAny);\n";
  } else {
    out << "    bool ignoredShouldFree = false;\n";
    out << "    bool ignoredShouldFreeAny = false;\n";
    out << "    cif->argTypes[" << index << "]->toNative(env, " << argValue
        << ", &arg" << index
        << ", &ignoredShouldFree, &ignoredShouldFreeAny);\n";
  }
  out << "  }\n";
}

void writeEngineDirectConverterMacros(std::ostringstream& out) {
  out << "#if NS_GSD_BACKEND_JSC\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_ARGUMENT "
         "TryFastConvertJSCArgument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_BOOL_ARGUMENT "
         "TryFastConvertJSCBoolArgument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_INT8_ARGUMENT "
         "TryFastConvertJSCInt8Argument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_UINT8_ARGUMENT "
         "TryFastConvertJSCUInt8Argument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_INT16_ARGUMENT "
         "TryFastConvertJSCInt16Argument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_UINT16_ARGUMENT "
         "TryFastConvertJSCUInt16Argument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_INT32_ARGUMENT "
         "TryFastConvertJSCInt32Argument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_UINT32_ARGUMENT "
         "TryFastConvertJSCUInt32Argument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_INT64_ARGUMENT "
         "TryFastConvertJSCInt64Argument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_UINT64_ARGUMENT "
         "TryFastConvertJSCUInt64Argument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_FLOAT_ARGUMENT "
         "TryFastConvertJSCFloatArgument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_DOUBLE_ARGUMENT "
         "TryFastConvertJSCDoubleArgument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_SELECTOR_ARGUMENT "
         "TryFastConvertJSCSelectorArgument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_OBJECT_ARGUMENT "
         "TryFastConvertJSCObjectArgument\n";
  out << "#elif NS_GSD_BACKEND_QUICKJS\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_ARGUMENT "
         "TryFastConvertQuickJSArgument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_BOOL_ARGUMENT "
         "TryFastConvertQuickJSBoolArgument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_INT8_ARGUMENT "
         "TryFastConvertQuickJSInt8Argument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_UINT8_ARGUMENT "
         "TryFastConvertQuickJSUInt8Argument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_INT16_ARGUMENT "
         "TryFastConvertQuickJSInt16Argument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_UINT16_ARGUMENT "
         "TryFastConvertQuickJSUInt16Argument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_INT32_ARGUMENT "
         "TryFastConvertQuickJSInt32Argument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_UINT32_ARGUMENT "
         "TryFastConvertQuickJSUInt32Argument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_INT64_ARGUMENT "
         "TryFastConvertQuickJSInt64Argument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_UINT64_ARGUMENT "
         "TryFastConvertQuickJSUInt64Argument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_FLOAT_ARGUMENT "
         "TryFastConvertQuickJSFloatArgument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_DOUBLE_ARGUMENT "
         "TryFastConvertQuickJSDoubleArgument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_SELECTOR_ARGUMENT "
         "TryFastConvertQuickJSSelectorArgument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_OBJECT_ARGUMENT "
         "TryFastConvertQuickJSObjectArgument\n";
  out << "#elif NS_GSD_BACKEND_HERMES\n";
  writeHermesEngineDirectConverterMacros(out);
  out << "#else\n";
  out << "#error \"No generated signature engine-direct converter selected\"\n";
  out << "#endif\n";
}

void writeHermesEngineDirectConverterMacros(std::ostringstream& out) {
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_ARGUMENT "
         "TryFastConvertHermesArgument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_BOOL_ARGUMENT "
         "TryFastConvertHermesGeneratedBoolArgument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_INT8_ARGUMENT "
         "TryFastConvertHermesGeneratedInt8Argument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_UINT8_ARGUMENT "
         "TryFastConvertHermesGeneratedUInt8Argument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_INT16_ARGUMENT "
         "TryFastConvertHermesGeneratedInt16Argument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_UINT16_ARGUMENT "
         "TryFastConvertHermesGeneratedUInt16Argument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_INT32_ARGUMENT "
         "TryFastConvertHermesGeneratedInt32Argument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_UINT32_ARGUMENT "
         "TryFastConvertHermesGeneratedUInt32Argument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_INT64_ARGUMENT "
         "TryFastConvertHermesGeneratedInt64Argument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_UINT64_ARGUMENT "
         "TryFastConvertHermesGeneratedUInt64Argument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_FLOAT_ARGUMENT "
         "TryFastConvertHermesGeneratedFloatArgument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_DOUBLE_ARGUMENT "
         "TryFastConvertHermesGeneratedDoubleArgument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_SELECTOR_ARGUMENT "
         "TryFastConvertHermesSelectorArgument\n";
  out << "#define NS_GSD_ENGINE_DIRECT_CONVERT_OBJECT_ARGUMENT "
         "TryFastConvertHermesObjectArgument\n";
}

void writeEngineDirectConverterUndefs(std::ostringstream& out) {
  out << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_ARGUMENT\n";
  out << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_BOOL_ARGUMENT\n";
  out << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_INT8_ARGUMENT\n";
  out << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_UINT8_ARGUMENT\n";
  out << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_INT16_ARGUMENT\n";
  out << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_UINT16_ARGUMENT\n";
  out << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_INT32_ARGUMENT\n";
  out << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_UINT32_ARGUMENT\n";
  out << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_INT64_ARGUMENT\n";
  out << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_UINT64_ARGUMENT\n";
  out << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_FLOAT_ARGUMENT\n";
  out << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_DOUBLE_ARGUMENT\n";
  out << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_SELECTOR_ARGUMENT\n";
  out << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_OBJECT_ARGUMENT\n";
}

void writeEngineDirectWrapper(std::ostringstream& out, DispatchKind kind,
                              const std::string& wrapperName,
                              const MDSignature* signature) {
  if (kind == DispatchKind::BlockInvoke) {
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
    out << "id self, SEL selector, ";
  }
  out << "const napi_value* argv, void* rvalue) {\n";

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
    writeEngineDirectArgConversion(out, argTypeInfos[i], i);
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
  } else {
    out << "  nativeResult = " << callExpr.str() << ";\n";
    out << "  *reinterpret_cast<" << returnType
        << "*>(rvalue) = nativeResult;\n";
  }
  if (hasCleanupArgs) {
    out << "  cleanupManagedArgs();\n";
  }
  out << "  return true;\n";
  out << "}\n\n";
}

}  // namespace metagen::signature_dispatch

#include "SignatureDispatchEmitter/Shared.h"

#include <sstream>
#include <vector>

namespace metagen::signature_dispatch {

std::string makeV8WrapperName(DispatchKind kind, size_t index) {
  std::ostringstream stream;
  stream << "dv";
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

bool fastV8ArgConversionNeedsContext(MDTypeKind kind) {
  switch (kind) {
    case mdTypeChar:
    case mdTypeUChar:
    case mdTypeUInt8:
    case mdTypeSShort:
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

bool canSetV8ReturnDirectly(MDTypeKind kind) {
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

bool canTrySetV8ObjectReturnDirectly(MDTypeKind kind) {
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

void writeV8DirectReturnValue(std::ostringstream& out, MDTypeKind kind,
                              const std::string& valueExpr) {
  switch (kind) {
    case mdTypeBool:
      out << "  info.GetReturnValue().Set(" << valueExpr << " != 0);\n";
      break;
    case mdTypeChar:
    case mdTypeSShort:
    case mdTypeSInt:
      out << "  info.GetReturnValue().Set(static_cast<int32_t>(" << valueExpr
          << "));\n";
      break;
    case mdTypeUChar:
    case mdTypeUInt8:
    case mdTypeUInt:
      out << "  info.GetReturnValue().Set(static_cast<uint32_t>(" << valueExpr
          << "));\n";
      break;
    case mdTypeUShort:
      out << "  setV8DispatchUInt16ReturnValue(info.GetIsolate(), info, "
          << "static_cast<uint16_t>(" << valueExpr << "));\n";
      break;
    case mdTypeSLong:
    case mdTypeSInt64:
      out << "  setV8DispatchInt64ReturnValue(info.GetIsolate(), info, "
          << valueExpr << ");\n";
      break;
    case mdTypeULong:
    case mdTypeUInt64:
      out << "  setV8DispatchUInt64ReturnValue(info.GetIsolate(), info, "
          << valueExpr << ");\n";
      break;
    case mdTypeFloat:
    case mdTypeDouble:
      out << "  info.GetReturnValue().Set(static_cast<double>(" << valueExpr
          << "));\n";
      break;
    default:
      break;
  }
}

void writeFastV8ArgConversion(std::ostringstream& out, const MDTypeInfo* type,
                              size_t index, bool hasCleanupArgs) {
  const char* failCleanup = hasCleanupArgs ? "  cleanupManagedArgs();\n" : "";
  if (type == nullptr) {
    out << failCleanup;
    out << "  return false;\n";
    return;
  }

  switch (type->kind) {
    case mdTypeChar: {
      out << "  int32_t tmpArg" << index << " = 0;\n";
      out << "  if (!info[" << index << "]->Int32Value(context).To(&tmpArg"
          << index << ")) {\n";
      if (hasCleanupArgs) {
        out << "    cleanupManagedArgs();\n";
      }
      out << "    return false;\n";
      out << "  }\n";
      out << "  arg" << index << " = static_cast<int8_t>(tmpArg" << index
          << ");\n";
      break;
    }
    case mdTypeUChar:
    case mdTypeUInt8: {
      out << "  uint32_t tmpArg" << index << " = 0;\n";
      out << "  if (!info[" << index << "]->Uint32Value(context).To(&tmpArg"
          << index << ")) {\n";
      if (hasCleanupArgs) {
        out << "    cleanupManagedArgs();\n";
      }
      out << "    return false;\n";
      out << "  }\n";
      out << "  arg" << index << " = static_cast<uint8_t>(tmpArg" << index
          << ");\n";
      break;
    }
    case mdTypeSShort: {
      out << "  int32_t tmpArg" << index << " = 0;\n";
      out << "  if (!info[" << index << "]->Int32Value(context).To(&tmpArg"
          << index << ")) {\n";
      if (hasCleanupArgs) {
        out << "    cleanupManagedArgs();\n";
      }
      out << "    return false;\n";
      out << "  }\n";
      out << "  arg" << index << " = static_cast<int16_t>(tmpArg" << index
          << ");\n";
      break;
    }
    case mdTypeUShort: {
      out << "  if (!TryFastConvertV8UInt16Argument(env, info[" << index
          << "], &arg" << index << ")) {\n";
      if (hasCleanupArgs) {
        out << "    cleanupManagedArgs();\n";
      }
      out << "    return false;\n";
      out << "  }\n";
      break;
    }
    case mdTypeSInt: {
      out << "  if (!info[" << index << "]->Int32Value(context).To(&arg"
          << index << ")) {\n";
      if (hasCleanupArgs) {
        out << "    cleanupManagedArgs();\n";
      }
      out << "    return false;\n";
      out << "  }\n";
      break;
    }
    case mdTypeUInt: {
      out << "  if (!info[" << index << "]->Uint32Value(context).To(&arg"
          << index << ")) {\n";
      if (hasCleanupArgs) {
        out << "    cleanupManagedArgs();\n";
      }
      out << "    return false;\n";
      out << "  }\n";
      break;
    }
    case mdTypeSLong:
    case mdTypeSInt64: {
      out << "  if (info[" << index << "]->IsBigInt()) {\n";
      out << "    bool lossless" << index << " = false;\n";
      out << "    arg" << index << " = info[" << index
          << "].As<v8::BigInt>()->Int64Value(&lossless" << index << ");\n";
      out << "  } else if (!info[" << index
          << "]->IntegerValue(context).To(&arg" << index << ")) {\n";
      if (hasCleanupArgs) {
        out << "    cleanupManagedArgs();\n";
      }
      out << "    return false;\n";
      out << "  }\n";
      break;
    }
    case mdTypeULong:
    case mdTypeUInt64: {
      out << "  if (info[" << index << "]->IsBigInt()) {\n";
      out << "    bool lossless" << index << " = false;\n";
      out << "    arg" << index << " = info[" << index
          << "].As<v8::BigInt>()->Uint64Value(&lossless" << index << ");\n";
      out << "  } else {\n";
      out << "    int64_t signedValue" << index << " = 0;\n";
      out << "    if (!info[" << index
          << "]->IntegerValue(context).To(&signedValue" << index << ")) {\n";
      if (hasCleanupArgs) {
        out << "      cleanupManagedArgs();\n";
      }
      out << "      return false;\n";
      out << "    }\n";
      out << "    arg" << index << " = static_cast<uint64_t>(signedValue"
          << index << ");\n";
      out << "  }\n";
      break;
    }
    case mdTypeFloat: {
      out << "  double tmpArg" << index << " = 0.0;\n";
      out << "  if (!info[" << index << "]->NumberValue(context).To(&tmpArg"
          << index << ")) {\n";
      if (hasCleanupArgs) {
        out << "    cleanupManagedArgs();\n";
      }
      out << "    return false;\n";
      out << "  }\n";
      out << "  arg" << index << " = static_cast<float>(tmpArg" << index
          << ");\n";
      break;
    }
    case mdTypeDouble: {
      out << "  if (!info[" << index << "]->NumberValue(context).To(&arg"
          << index << ")) {\n";
      if (hasCleanupArgs) {
        out << "    cleanupManagedArgs();\n";
      }
      out << "    return false;\n";
      out << "  }\n";
      out << "  if (std::isnan(arg" << index << ") || std::isinf(arg" << index
          << ")) {\n";
      out << "    arg" << index << " = 0.0;\n";
      out << "  }\n";
      break;
    }
    case mdTypeBool: {
      out << "  if (!info[" << index << "]->IsBoolean()) {\n";
      if (hasCleanupArgs) {
        out << "    cleanupManagedArgs();\n";
      }
      out << "    return false;\n";
      out << "  }\n";
      out << "  arg" << index << " = static_cast<uint8_t>(info[" << index
          << "]->BooleanValue(info.GetIsolate()) ? 1 : 0);\n";
      break;
    }
    default:
      out << failCleanup;
      out << "  return false;\n";
      break;
  }
}
void writeV8Wrapper(std::ostringstream& out, DispatchKind kind,
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
    out << "id self, SEL selector, void* bridgeState, bool returnOwned, "
           "bool receiverIsClass, bool propertyAccess, ";
  }
  out << "const v8::FunctionCallbackInfo<v8::Value>& info, void* rvalue, "
         "bool* didSetReturnValue) {\n";
  if (!argTypes.empty()) {
    out << "  if (info.Length() < " << argTypes.size() << ") {\n";
    out << "    return false;\n";
    out << "  }\n";
  }
  bool needsContext = false;
  for (const auto* arg : argTypeInfos) {
    if (arg != nullptr && fastV8ArgConversionNeedsContext(arg->kind)) {
      needsContext = true;
      break;
    }
  }
  if (needsContext) {
    out << "  v8::Local<v8::Context> context = info.GetIsolate()->GetCurrentContext();\n";
  }

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
  std::vector<size_t> noCleanupManagedArgIndexes;
  cleanupArgIndexes.reserve(argTypes.size());
  noCleanupManagedArgIndexes.reserve(argTypes.size());
  for (size_t i = 0; i < argTypes.size(); i++) {
    if (!isFastDirectNapiKind(argTypeInfos[i]->kind)) {
      if (argKindMayNeedCleanup(argTypeInfos[i]->kind)) {
        cleanupArgIndexes.push_back(i);
      } else {
        noCleanupManagedArgIndexes.push_back(i);
      }
    }
  }
  const bool hasCleanupArgs = !cleanupArgIndexes.empty();
  const bool setsReturnDirectly =
      canSetV8ReturnDirectly(signature->returnType->kind);
  const bool triesObjectReturnDirectly =
      kind == DispatchKind::ObjCMethod &&
      canTrySetV8ObjectReturnDirectly(signature->returnType->kind);
  if (hasCleanupArgs) {
    out << "  bool shouldFreeAny = false;\n";
  }
  if (!noCleanupManagedArgIndexes.empty()) {
    out << "  bool ignoredShouldFree = false;\n";
    out << "  bool ignoredShouldFreeAny = false;\n";
  }
  if (returnType != "void") {
    out << "  " << returnType << " nativeResult{};\n";
  }

  for (size_t i = 0; i < argTypes.size(); i++) {
    out << "  " << argTypes[i] << " arg" << i << "{};\n";
    if (!isFastDirectNapiKind(argTypeInfos[i]->kind) &&
        argKindMayNeedCleanup(argTypeInfos[i]->kind)) {
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
    if (isFastDirectNapiKind(argTypeInfos[i]->kind)) {
      writeFastV8ArgConversion(out, argTypeInfos[i], i, hasCleanupArgs);
    } else if (isFastManagedNapiKind(argTypeInfos[i]->kind)) {
      out << "  if (!TryFastConvertV8Argument(env, static_cast<MDTypeKind>("
          << static_cast<int>(argTypeInfos[i]->kind) << "), info[" << i
          << "], &arg" << i << ")) {\n";
      if (argKindMayNeedCleanup(argTypeInfos[i]->kind)) {
        out << "    cif->argTypes[" << i
            << "]->toNative(env, v8LocalValueToNapiValue(info[" << i
            << "]), &arg" << i << ", &shouldFree" << i
            << ", &shouldFreeAny);\n";
      } else {
        out << "    ignoredShouldFree = false;\n";
        out << "    ignoredShouldFreeAny = false;\n";
        out << "    cif->argTypes[" << i
            << "]->toNative(env, v8LocalValueToNapiValue(info[" << i
            << "]), &arg" << i
            << ", &ignoredShouldFree, &ignoredShouldFreeAny);\n";
      }
      out << "  }\n";
    } else {
      if (argKindMayNeedCleanup(argTypeInfos[i]->kind)) {
        out << "  cif->argTypes[" << i
            << "]->toNative(env, v8LocalValueToNapiValue(info[" << i
            << "]), &arg" << i << ", &shouldFree" << i
            << ", &shouldFreeAny);\n";
      } else {
        out << "  ignoredShouldFree = false;\n";
        out << "  ignoredShouldFreeAny = false;\n";
        out << "  cif->argTypes[" << i
            << "]->toNative(env, v8LocalValueToNapiValue(info[" << i
            << "]), &arg" << i
            << ", &ignoredShouldFree, &ignoredShouldFreeAny);\n";
      }
    }
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
    out << "  *didSetReturnValue = true;\n";
  } else if (setsReturnDirectly) {
    out << "  nativeResult = " << callExpr.str() << ";\n";
    writeV8DirectReturnValue(out, signature->returnType->kind, "nativeResult");
    out << "  *didSetReturnValue = true;\n";
  } else if (triesObjectReturnDirectly) {
    out << "  nativeResult = " << callExpr.str() << ";\n";
    out << "  *reinterpret_cast<" << returnType
        << "*>(rvalue) = nativeResult;\n";
    out << "  if (TryFastSetV8GeneratedObjCObjectReturnValue(env, info, cif, bridgeState, self, "
           "selector, nativeResult, returnOwned, receiverIsClass, propertyAccess)) {\n";
    out << "    *didSetReturnValue = true;\n";
    out << "  }\n";
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

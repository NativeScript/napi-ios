#include "SignatureDispatchEmitter.h"

#include <algorithm>
#include <cstdint>
#include <fstream>
#include <iomanip>
#include <sstream>
#include <string>
#include <type_traits>
#include <unordered_map>
#include <unordered_set>
#include <vector>

namespace metagen {
namespace {

enum class DispatchKind : uint8_t {
  ObjCMethod = 1,
  CFunction = 2,
};

struct SignatureUse {
  DispatchKind kind;
  MDSectionOffset signatureOffset;
  uint8_t flags;
};

constexpr uint64_t kFNV64OffsetBasis = 14695981039346656037ull;
constexpr uint64_t kFNV64Prime = 1099511628211ull;

uint64_t hashBytesFnv1a(const void* data, size_t size,
                        uint64_t seed = kFNV64OffsetBasis) {
  const auto* bytes = static_cast<const uint8_t*>(data);
  uint64_t hash = seed;
  for (size_t i = 0; i < size; i++) {
    hash ^= static_cast<uint64_t>(bytes[i]);
    hash *= kFNV64Prime;
  }
  return hash;
}

uint64_t composeDispatchId(uint64_t signatureHash, DispatchKind kind,
                           uint8_t flags) {
  const uint8_t kindByte = static_cast<uint8_t>(kind);
  uint64_t hash = hashBytesFnv1a(&kindByte, sizeof(kindByte));
  hash = hashBytesFnv1a(&flags, sizeof(flags), hash);
  return hashBytesFnv1a(&signatureHash, sizeof(signatureHash), hash);
}

using SignatureMap = std::unordered_map<MDSectionOffset, MDSignature*>;

MDTypeKind canonicalizeSignatureTypeKind(MDTypeKind kind) {
  switch (kind) {
    case mdTypeAnyObject:
    case mdTypeProtocolObject:
    case mdTypeClassObject:
    case mdTypeInstanceObject:
    case mdTypeNSStringObject:
    case mdTypeNSMutableStringObject:
      return mdTypeAnyObject;
    default:
      return kind;
  }
}

template <typename T>
void appendIntegral(uint64_t* hash, std::string* key, T value) {
  using Unsigned = typename std::make_unsigned<T>::type;
  Unsigned unsignedValue = static_cast<Unsigned>(value);
  for (size_t i = 0; i < sizeof(Unsigned); i++) {
    const uint8_t byte = static_cast<uint8_t>((unsignedValue >> (i * 8)) & 0xFF);
    *hash = hashBytesFnv1a(&byte, sizeof(byte), *hash);
    if (key != nullptr) {
      key->push_back(static_cast<char>(byte));
    }
  }
}

bool appendCanonicalSignature(const MDSignature* signature,
                             MDSectionOffset signatureOffset,
                             const SignatureMap& signatures,
                             std::unordered_set<MDSectionOffset>* activeSignatures,
                             uint64_t* hash, std::string* key);

bool appendCanonicalType(const MDTypeInfo* type, const SignatureMap& signatures,
                         std::unordered_set<MDSectionOffset>* activeSignatures,
                         uint64_t* hash, std::string* key) {
  if (type == nullptr || hash == nullptr) {
    return false;
  }

  appendIntegral<uint8_t>(hash, key, 0xB0);
  const MDTypeKind rawKind = type->kind;
  const MDTypeKind canonicalKind = canonicalizeSignatureTypeKind(rawKind);
  appendIntegral<uint8_t>(hash, key, static_cast<uint8_t>(canonicalKind));

  switch (rawKind) {
    case mdTypeArray:
    case mdTypeVector:
    case mdTypeExtVector:
    case mdTypeComplex:
      appendIntegral<uint16_t>(hash, key, type->arraySize);
      if (!appendCanonicalType(type->elementType, signatures, activeSignatures, hash,
                               key)) {
        return false;
      }
      break;

    case mdTypeStruct:
      appendIntegral<MDSectionOffset>(hash, key, type->structOffset);
      break;

    case mdTypePointer:
      if (!appendCanonicalType(type->pointeeType, signatures, activeSignatures,
                               hash, key)) {
        return false;
      }
      break;

    case mdTypeBlock:
    case mdTypeFunctionPointer: {
      const MDSectionOffset nestedSignatureOffset = type->signatureOffset;
      auto nestedIt = signatures.find(nestedSignatureOffset);
      if (nestedSignatureOffset == MD_SECTION_OFFSET_NULL ||
          nestedIt == signatures.end() || nestedIt->second == nullptr) {
        break;
      }

      if (!appendCanonicalSignature(nestedIt->second, nestedSignatureOffset,
                                    signatures, activeSignatures, hash, key)) {
        return false;
      }
      break;
    }

    default:
      break;
  }

  appendIntegral<uint8_t>(hash, key, 0xBF);
  return true;
}

bool appendCanonicalSignature(const MDSignature* signature,
                             MDSectionOffset signatureOffset,
                             const SignatureMap& signatures,
                             std::unordered_set<MDSectionOffset>* activeSignatures,
                             uint64_t* hash, std::string* key) {
  if (signature == nullptr || hash == nullptr || activeSignatures == nullptr) {
    return false;
  }

  const bool trackRecursion = signatureOffset != MD_SECTION_OFFSET_NULL;
  if (trackRecursion) {
    if (activeSignatures->find(signatureOffset) != activeSignatures->end()) {
      appendIntegral<uint8_t>(hash, key, 0xEE);
      return true;
    }
    activeSignatures->insert(signatureOffset);
  }

  appendIntegral<uint8_t>(hash, key, 0xA0);
  appendIntegral<uint8_t>(hash, key, signature->isVariadic ? 1 : 0);

  if (!appendCanonicalType(signature->returnType, signatures, activeSignatures,
                           hash, key)) {
    if (trackRecursion) {
      activeSignatures->erase(signatureOffset);
    }
    return false;
  }

  uint32_t argCount = 0;
  for (const auto* arg : signature->arguments) {
    if (!appendCanonicalType(arg, signatures, activeSignatures, hash, key)) {
      if (trackRecursion) {
        activeSignatures->erase(signatureOffset);
      }
      return false;
    }
    argCount++;
  }

  appendIntegral<uint32_t>(hash, key, argCount);
  appendIntegral<uint8_t>(hash, key, 0xAF);

  if (trackRecursion) {
    activeSignatures->erase(signatureOffset);
  }
  return true;
}

uint64_t signatureHash(const MDSignature* signature,
                       MDSectionOffset signatureOffset,
                       const SignatureMap& signatures,
                       std::string* canonicalKeyOut) {
  if (signature == nullptr) {
    return 0;
  }

  uint64_t hash = kFNV64OffsetBasis;
  std::unordered_set<MDSectionOffset> activeSignatures;
  if (!appendCanonicalSignature(signature, signatureOffset, signatures,
                                &activeSignatures, &hash, canonicalKeyOut)) {
    return 0;
  }
  return hash;
}

bool mapTypeToCpp(const MDTypeInfo* type, std::string* out,
                  bool allowVoid = false);

bool mapPointerPointeeToCpp(const MDTypeInfo* type, std::string* out) {
  if (type == nullptr || out == nullptr) {
    return false;
  }

  switch (type->kind) {
    case mdTypeVoid:
      *out = "void";
      return true;
    case mdTypePointer: {
      std::string nested;
      if (!mapPointerPointeeToCpp(type->pointeeType, &nested)) {
        return false;
      }
      *out = nested + "*";
      return true;
    }
    default:
      return mapTypeToCpp(type, out, false);
  }
}

bool mapTypeToCpp(const MDTypeInfo* type, std::string* out, bool allowVoid) {
  if (type == nullptr || out == nullptr) {
    return false;
  }

  switch (type->kind) {
    case mdTypeVoid:
      if (!allowVoid) {
        return false;
      }
      *out = "void";
      return true;

    case mdTypeBool:
      *out = "uint8_t";
      return true;

    case mdTypeChar:
      *out = "int8_t";
      return true;

    case mdTypeUChar:
    case mdTypeUInt8:
      *out = "uint8_t";
      return true;

    case mdTypeSShort:
      *out = "int16_t";
      return true;

    case mdTypeUShort:
      *out = "uint16_t";
      return true;

    case mdTypeSInt:
      *out = "int32_t";
      return true;

    case mdTypeUInt:
      *out = "uint32_t";
      return true;

    case mdTypeSLong:
    case mdTypeSInt64:
      *out = "int64_t";
      return true;

    case mdTypeULong:
    case mdTypeUInt64:
      *out = "uint64_t";
      return true;

    case mdTypeFloat:
      *out = "float";
      return true;

    case mdTypeDouble:
      *out = "double";
      return true;

    case mdTypeString:
      *out = "char*";
      return true;

    case mdTypeAnyObject:
    case mdTypeProtocolObject:
    case mdTypeClassObject:
    case mdTypeInstanceObject:
    case mdTypeNSStringObject:
    case mdTypeNSMutableStringObject:
      *out = "id";
      return true;

    case mdTypeClass:
      *out = "Class";
      return true;

    case mdTypeSelector:
      *out = "SEL";
      return true;

    case mdTypePointer: {
      std::string pointee;
      if (!mapPointerPointeeToCpp(type->pointeeType, &pointee)) {
        return false;
      }
      *out = pointee + "*";
      return true;
    }

    case mdTypeOpaquePointer:
    case mdTypeBlock:
    case mdTypeFunctionPointer:
      *out = "void*";
      return true;

    default:
      return false;
  }
}

bool isSignatureSupported(const MDSignature* signature) {
  if (signature == nullptr || signature->isVariadic) {
    return false;
  }
  // Keep generated dispatch focused on hot paths and avoid huge wrappers.
  if (signature->arguments.size() > 8) {
    return false;
  }

  std::string unused;
  if (!mapTypeToCpp(signature->returnType, &unused, true)) {
    return false;
  }

  for (const auto* arg : signature->arguments) {
    if (!mapTypeToCpp(arg, &unused, false)) {
      return false;
    }
  }

  return true;
}

std::string toHexLiteral(uint64_t value) {
  std::ostringstream stream;
  stream << "0x" << std::hex << std::setw(16) << std::setfill('0') << value
         << "ULL";
  return stream.str();
}

std::string toBase36(size_t value) {
  std::ostringstream stream;
  if (value == 0) {
    stream << '0';
    return stream.str();
  }

  std::string digits;
  while (value > 0) {
    const size_t digit = value % 36;
    digits.push_back(
        static_cast<char>(digit < 10 ? ('0' + digit) : ('a' + digit - 10)));
    value /= 36;
  }
  std::reverse(digits.begin(), digits.end());
  stream << digits;
  return stream.str();
}

std::string makeNapiWrapperName(DispatchKind kind, size_t index) {
  std::ostringstream stream;
  stream << "d" << (kind == DispatchKind::ObjCMethod ? "o" : "c")
         << toBase36(index);
  return stream.str();
}

bool isFastDirectNapiKind(MDTypeKind kind) {
  switch (kind) {
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

std::string makeWrapperShapeKey(DispatchKind kind, const MDSignature* signature) {
  if (signature == nullptr) {
    return {};
  }

  std::string returnType;
  if (!mapTypeToCpp(signature->returnType, &returnType, true)) {
    return {};
  }

  std::ostringstream key;
  key << static_cast<int>(kind) << "|" << returnType << "|";
  for (const auto* arg : signature->arguments) {
    std::string argType;
    if (!mapTypeToCpp(arg, &argType, false)) {
      return {};
    }

    if (isFastDirectNapiKind(arg->kind)) {
      key << "F" << static_cast<int>(arg->kind);
    } else {
      key << "M" << argType;
    }
    key << "|";
  }

  return key.str();
}

void writeFastNapiArgConversion(std::ostringstream& out, const MDTypeInfo* type,
                                size_t index, bool hasManagedArgs) {
  const char* failCleanup = hasManagedArgs ? "  cleanupManagedArgs();\n" : "";
  if (type == nullptr) {
    out << failCleanup;
    out << "  return false;\n";
    return;
  }

  switch (type->kind) {
    case mdTypeChar: {
      out << "  int32_t tmpArg" << index << " = 0;\n";
      out << "  if (napi_get_value_int32(env, argv[" << index
          << "], &tmpArg" << index << ") != napi_ok) {\n";
      if (hasManagedArgs) {
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
      out << "  if (napi_get_value_uint32(env, argv[" << index
          << "], &tmpArg" << index << ") != napi_ok) {\n";
      if (hasManagedArgs) {
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
      out << "  if (napi_get_value_int32(env, argv[" << index
          << "], &tmpArg" << index << ") != napi_ok) {\n";
      if (hasManagedArgs) {
        out << "    cleanupManagedArgs();\n";
      }
      out << "    return false;\n";
      out << "  }\n";
      out << "  arg" << index << " = static_cast<int16_t>(tmpArg" << index
          << ");\n";
      break;
    }
    case mdTypeUShort: {
      out << "  uint32_t tmpArg" << index << " = 0;\n";
      out << "  if (napi_get_value_uint32(env, argv[" << index
          << "], &tmpArg" << index << ") != napi_ok) {\n";
      if (hasManagedArgs) {
        out << "    cleanupManagedArgs();\n";
      }
      out << "    return false;\n";
      out << "  }\n";
      out << "  arg" << index << " = static_cast<uint16_t>(tmpArg" << index
          << ");\n";
      break;
    }
    case mdTypeSInt: {
      out << "  if (napi_get_value_int32(env, argv[" << index << "], &arg"
          << index << ") != napi_ok) {\n";
      if (hasManagedArgs) {
        out << "    cleanupManagedArgs();\n";
      }
      out << "    return false;\n";
      out << "  }\n";
      break;
    }
    case mdTypeUInt: {
      out << "  if (napi_get_value_uint32(env, argv[" << index << "], &arg"
          << index << ") != napi_ok) {\n";
      if (hasManagedArgs) {
        out << "    cleanupManagedArgs();\n";
      }
      out << "    return false;\n";
      out << "  }\n";
      break;
    }
    case mdTypeSLong:
    case mdTypeSInt64: {
      out << "  if (napi_get_value_int64(env, argv[" << index << "], &arg"
          << index << ") != napi_ok) {\n";
      out << "      bool lossless" << index << " = false;\n";
      out << "      if (napi_get_value_bigint_int64(env, argv[" << index
          << "], &arg" << index << ", &lossless" << index
          << ") != napi_ok) {\n";
      if (hasManagedArgs) {
        out << "        cleanupManagedArgs();\n";
      }
      out << "        return false;\n";
      out << "      }\n";
      out << "  }\n";
      break;
    }
    case mdTypeULong:
    case mdTypeUInt64: {
      out << "  bool lossless" << index << " = false;\n";
      out << "  if (napi_get_value_bigint_uint64(env, argv[" << index
          << "], &arg" << index << ", &lossless" << index
          << ") != napi_ok) {\n";
      out << "      int64_t signedValue" << index << " = 0;\n";
      out << "      if (napi_get_value_int64(env, argv[" << index
          << "], &signedValue" << index << ") != napi_ok) {\n";
      if (hasManagedArgs) {
        out << "        cleanupManagedArgs();\n";
      }
      out << "        return false;\n";
      out << "      }\n";
      out << "      arg" << index << " = static_cast<uint64_t>(signedValue"
          << index << ");\n";
      out << "  }\n";
      break;
    }
    case mdTypeFloat: {
      out << "  double tmpArg" << index << " = 0.0;\n";
      out << "  if (napi_get_value_double(env, argv[" << index
          << "], &tmpArg" << index << ") != napi_ok) {\n";
      if (hasManagedArgs) {
        out << "    cleanupManagedArgs();\n";
      }
      out << "    return false;\n";
      out << "  }\n";
      out << "  arg" << index << " = static_cast<float>(tmpArg" << index
          << ");\n";
      break;
    }
    case mdTypeDouble: {
      out << "  if (napi_get_value_double(env, argv[" << index << "], &arg"
          << index << ") != napi_ok) {\n";
      if (hasManagedArgs) {
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
      out << "  bool boolValue" << index << " = false;\n";
      out << "  if (napi_get_value_bool(env, argv[" << index << "], &boolValue"
          << index << ") != napi_ok) {\n";
      if (hasManagedArgs) {
        out << "    cleanupManagedArgs();\n";
      }
      out << "    return false;\n";
      out << "  }\n";
      out << "  arg" << index << " = static_cast<uint8_t>(boolValue" << index
          << " ? 1 : 0);\n";
      break;
    }
    default:
      out << failCleanup;
      out << "  return false;\n";
      break;
  }
}

void writeNapiWrapper(std::ostringstream& out, DispatchKind kind,
                      const std::string& wrapperName,
                      const MDSignature* signature) {
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
  std::vector<size_t> managedArgIndexes;
  managedArgIndexes.reserve(argTypes.size());
  for (size_t i = 0; i < argTypes.size(); i++) {
    if (!isFastDirectNapiKind(argTypeInfos[i]->kind)) {
      managedArgIndexes.push_back(i);
    }
  }
  const bool hasManagedArgs = !managedArgIndexes.empty();
  if (hasManagedArgs) {
    out << "  bool shouldFreeAny = false;\n";
  }
  if (returnType != "void") {
    out << "  " << returnType << " nativeResult{};\n";
  }

  for (size_t i = 0; i < argTypes.size(); i++) {
    out << "  " << argTypes[i] << " arg" << i << "{};\n";
    if (!isFastDirectNapiKind(argTypeInfos[i]->kind)) {
      out << "  bool shouldFree" << i << " = false;\n";
    }
  }

  if (hasManagedArgs) {
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
    for (const auto i : managedArgIndexes) {
      out << "      if (shouldFree" << i << ") {\n";
      if (kind == DispatchKind::CFunction && returnType != "void") {
        out << "        if (returnPointerValue != nullptr && "
               "*reinterpret_cast<void**>(&arg"
            << i << ") == returnPointerValue) {\n";
        out << "          // Returning an argument pointer keeps ownership with "
               "the return value.\n";
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
      writeFastNapiArgConversion(out, argTypeInfos[i], i, hasManagedArgs);
    } else {
      out << "  cif->argTypes[" << i << "]->toNative(env, argv[" << i
          << "], &arg" << i << ", &shouldFree" << i << ", &shouldFreeAny);\n";
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
  } else {
    out << "  nativeResult = " << callExpr.str() << ";\n";
    out << "  *reinterpret_cast<" << returnType
        << "*>(rvalue) = nativeResult;\n";
  }
  if (hasManagedArgs) {
    out << "  cleanupManagedArgs();\n";
  }

  out << "  return true;\n";
  out << "}\n\n";
}

void collectMethodUses(const std::vector<MDMember*>& members,
                       std::vector<SignatureUse>* uses) {
  if (uses == nullptr) {
    return;
  }

  for (auto* member : members) {
    if (member == nullptr) {
      continue;
    }

    const uint8_t methodFlags =
        (member->flags & mdMemberReturnOwned) != 0 ? 1 : 0;

    if ((member->flags & mdMemberProperty) != 0) {
      if (member->getterSignature != MD_SECTION_OFFSET_NULL) {
        uses->push_back(
            {DispatchKind::ObjCMethod, member->getterSignature, methodFlags});
      }
      if (((member->flags & mdMemberReadonly) == 0) &&
          member->setterSignature != MD_SECTION_OFFSET_NULL) {
        uses->push_back({DispatchKind::ObjCMethod, member->setterSignature, 0});
      }
    } else {
      if (member->signature != MD_SECTION_OFFSET_NULL) {
        uses->push_back(
            {DispatchKind::ObjCMethod, member->signature, methodFlags});
      }
    }
  }
}

}  // namespace

void writeSignatureDispatchBindings(const MDMetadataWriter& writer,
                                    const std::string& outputPath) {
  if (outputPath.empty()) {
    return;
  }

  std::vector<SignatureUse> signatureUses;

  for (const auto& pair : writer.functions.orderedEntries) {
    auto* function = pair.second;
    if (function == nullptr || function->signature == MD_SECTION_OFFSET_NULL) {
      continue;
    }
    const uint8_t flags =
        (function->flags & mdFunctionReturnOwned) != 0 ? 1 : 0;
    signatureUses.push_back(
        {DispatchKind::CFunction, function->signature, flags});
  }

  for (const auto& pair : writer.classes.orderedEntries) {
    auto* cls = pair.second;
    if (cls == nullptr) {
      continue;
    }
    collectMethodUses(cls->members, &signatureUses);
  }

  for (const auto& pair : writer.protocols.orderedEntries) {
    auto* protocol = pair.second;
    if (protocol == nullptr) {
      continue;
    }
    collectMethodUses(protocol->members, &signatureUses);
  }

  std::unordered_map<std::string, std::pair<DispatchKind, const MDSignature*>>
      wrappersByKey;
  std::unordered_map<uint64_t, std::string> objcNapiEntries;
  std::unordered_map<uint64_t, std::string> cFunctionNapiEntries;
  std::unordered_map<uint64_t, std::string> dispatchEncoding;
  std::unordered_set<uint64_t> collidedDispatchIds;

  for (const auto& use : signatureUses) {
    auto signatureIt = writer.signatures.find(use.signatureOffset);
    if (signatureIt == writer.signatures.end()) {
      continue;
    }

    const MDSignature* signature = signatureIt->second;
    if (!isSignatureSupported(signature)) {
      continue;
    }

    std::string canonicalSignatureKey;
    const uint64_t sigHash =
        signatureHash(signature, use.signatureOffset, writer.signatures,
                      &canonicalSignatureKey);
    if (sigHash == 0) {
      continue;
    }
    const uint64_t dispatchId = composeDispatchId(sigHash, use.kind, use.flags);

    auto encodedIt = dispatchEncoding.find(dispatchId);
    if (encodedIt != dispatchEncoding.end() &&
        encodedIt->second != canonicalSignatureKey) {
      collidedDispatchIds.insert(dispatchId);
      objcNapiEntries.erase(dispatchId);
      cFunctionNapiEntries.erase(dispatchId);
      dispatchEncoding.erase(dispatchId);
      continue;
    }
    if (collidedDispatchIds.find(dispatchId) != collidedDispatchIds.end()) {
      continue;
    }
    dispatchEncoding.emplace(dispatchId, canonicalSignatureKey);

    const std::string wrapperKey = makeWrapperShapeKey(use.kind, signature);
    if (wrapperKey.empty()) {
      continue;
    }
    wrappersByKey.emplace(wrapperKey, std::make_pair(use.kind, signature));

    if (use.kind == DispatchKind::ObjCMethod) {
      objcNapiEntries.emplace(dispatchId, wrapperKey);
    } else {
      cFunctionNapiEntries.emplace(dispatchId, wrapperKey);
    }
  }

  std::vector<
      std::pair<std::string, std::pair<DispatchKind, const MDSignature*>>>
      wrappers(wrappersByKey.begin(), wrappersByKey.end());
  std::sort(
      wrappers.begin(), wrappers.end(),
      [](const auto& lhs, const auto& rhs) { return lhs.first < rhs.first; });

  std::unordered_map<std::string, std::string> wrapperNameByKey;
  wrapperNameByKey.reserve(wrappers.size());
  size_t wrapperIndex = 0;
  for (const auto& wrapper : wrappers) {
    wrapperNameByKey.emplace(
        wrapper.first, makeNapiWrapperName(wrapper.second.first, wrapperIndex++));
  }

  std::vector<std::pair<uint64_t, std::string>> sortedObjCNapiEntries(
      objcNapiEntries.begin(), objcNapiEntries.end());
  std::sort(
      sortedObjCNapiEntries.begin(), sortedObjCNapiEntries.end(),
      [](const auto& lhs, const auto& rhs) { return lhs.first < rhs.first; });

  std::vector<std::pair<uint64_t, std::string>> sortedCFunctionNapiEntries(
      cFunctionNapiEntries.begin(), cFunctionNapiEntries.end());
  std::sort(
      sortedCFunctionNapiEntries.begin(), sortedCFunctionNapiEntries.end(),
      [](const auto& lhs, const auto& rhs) { return lhs.first < rhs.first; });

  std::ostringstream generated;
  generated << "#ifndef NS_GENERATED_SIGNATURE_DISPATCH_INC\n";
  generated << "#define NS_GENERATED_SIGNATURE_DISPATCH_INC\n\n";
  generated << "#undef NS_HAS_GENERATED_SIGNATURE_DISPATCH\n";
  generated << "#define NS_HAS_GENERATED_SIGNATURE_DISPATCH 0\n";
  generated << "#undef NS_HAS_GENERATED_SIGNATURE_NAPI_DISPATCH\n";
  generated << "#define NS_HAS_GENERATED_SIGNATURE_NAPI_DISPATCH 1\n\n";
  generated << "namespace nativescript {\n\n";

  for (const auto& wrapper : wrappers) {
    writeNapiWrapper(generated, wrapper.second.first,
                     wrapperNameByKey.at(wrapper.first), wrapper.second.second);
  }

  generated << "inline constexpr ObjCNapiDispatchEntry "
               "kGeneratedObjCNapiDispatchEntries[] = {\n";
  generated << "    {0, nullptr},\n";
  for (const auto& entry : sortedObjCNapiEntries) {
    generated << "    {" << toHexLiteral(entry.first) << ", &"
              << wrapperNameByKey.at(entry.second) << "},\n";
  }
  generated << "};\n\n";

  generated << "inline constexpr CFunctionNapiDispatchEntry "
               "kGeneratedCFunctionNapiDispatchEntries[] = {\n";
  generated << "    {0, nullptr},\n";
  for (const auto& entry : sortedCFunctionNapiEntries) {
    generated << "    {" << toHexLiteral(entry.first) << ", &"
              << wrapperNameByKey.at(entry.second) << "},\n";
  }
  generated << "};\n\n";

  generated << "}  // namespace nativescript\n\n";
  generated << "#endif  // NS_GENERATED_SIGNATURE_DISPATCH_INC\n";

  std::ofstream outFile(outputPath, std::ios::trunc | std::ios::binary);
  outFile << generated.str();
}

}  // namespace metagen

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
  BlockInvoke = 3,
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
    const uint8_t byte =
        static_cast<uint8_t>((unsignedValue >> (i * 8)) & 0xFF);
    *hash = hashBytesFnv1a(&byte, sizeof(byte), *hash);
    if (key != nullptr) {
      key->push_back(static_cast<char>(byte));
    }
  }
}

bool appendCanonicalSignature(
    const MDSignature* signature, MDSectionOffset signatureOffset,
    const SignatureMap& signatures,
    std::unordered_set<MDSectionOffset>* activeSignatures, uint64_t* hash,
    std::string* key);

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
      if (!appendCanonicalType(type->elementType, signatures, activeSignatures,
                               hash, key)) {
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

bool appendCanonicalSignature(
    const MDSignature* signature, MDSectionOffset signatureOffset,
    const SignatureMap& signatures,
    std::unordered_set<MDSectionOffset>* activeSignatures, uint64_t* hash,
    std::string* key) {
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
  stream << "dn";
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

std::string makePreparedWrapperName(DispatchKind kind, size_t index) {
  std::ostringstream stream;
  stream << "dp";
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

bool isFastManagedNapiKind(MDTypeKind kind) {
  switch (kind) {
    case mdTypeAnyObject:
    case mdTypeProtocolObject:
    case mdTypeClassObject:
    case mdTypeInstanceObject:
    case mdTypeNSStringObject:
    case mdTypeNSMutableStringObject:
    case mdTypeSelector:
      return true;
    default:
      return false;
  }
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

bool canSetHermesReturnDirectly(MDTypeKind kind) {
  return canSetV8ReturnDirectly(kind);
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

void writeHermesDirectReturnValue(std::ostringstream& out, DispatchKind dispatchKind,
                                  MDTypeKind kind,
                                  const std::string& valueExpr) {
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

bool argKindMayNeedCleanup(MDTypeKind kind) {
  switch (kind) {
    case mdTypeAnyObject:
    case mdTypeProtocolObject:
    case mdTypeClassObject:
    case mdTypeInstanceObject:
    case mdTypeNSStringObject:
    case mdTypeNSMutableStringObject:
    case mdTypeClass:
    case mdTypeSelector:
      return false;
    default:
      return !isFastDirectNapiKind(kind);
  }
}

enum class HermesDirectReturnCallSite {
  FastCallback,
  Frame,
};

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

std::string makeWrapperShapeKey(DispatchKind kind,
                                const MDSignature* signature) {
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
    } else if (isFastManagedNapiKind(arg->kind)) {
      key << "H" << static_cast<int>(arg->kind);
    } else {
      key << "M" << argType;
    }
    key << "|";
  }

  return key.str();
}

void writeFastNapiArgConversion(std::ostringstream& out, const MDTypeInfo* type,
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
      out << "  if (napi_get_value_int32(env, argv[" << index << "], &tmpArg"
          << index << ") != napi_ok) {\n";
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
      out << "  if (napi_get_value_uint32(env, argv[" << index << "], &tmpArg"
          << index << ") != napi_ok) {\n";
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
      out << "  if (napi_get_value_int32(env, argv[" << index << "], &tmpArg"
          << index << ") != napi_ok) {\n";
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
      out << "  if (!TryFastConvertNapiUInt16Argument(env, argv[" << index
          << "], &arg" << index << ")) {\n";
      if (hasCleanupArgs) {
        out << "    cleanupManagedArgs();\n";
      }
      out << "    return false;\n";
      out << "  }\n";
      break;
    }
    case mdTypeSInt: {
      out << "  if (napi_get_value_int32(env, argv[" << index << "], &arg"
          << index << ") != napi_ok) {\n";
      if (hasCleanupArgs) {
        out << "    cleanupManagedArgs();\n";
      }
      out << "    return false;\n";
      out << "  }\n";
      break;
    }
    case mdTypeUInt: {
      out << "  if (napi_get_value_uint32(env, argv[" << index << "], &arg"
          << index << ") != napi_ok) {\n";
      if (hasCleanupArgs) {
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
      if (hasCleanupArgs) {
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
      if (hasCleanupArgs) {
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
      out << "  if (napi_get_value_double(env, argv[" << index << "], &tmpArg"
          << index << ") != napi_ok) {\n";
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
      out << "  if (napi_get_value_double(env, argv[" << index << "], &arg"
          << index << ") != napi_ok) {\n";
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
      out << "  bool boolValue" << index << " = false;\n";
      out << "  if (napi_get_value_bool(env, argv[" << index << "], &boolValue"
          << index << ") != napi_ok) {\n";
      if (hasCleanupArgs) {
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
        out << "          // Returning an argument pointer keeps ownership "
               "with "
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
      writeFastNapiArgConversion(out, argTypeInfos[i], i, hasCleanupArgs);
    } else if (isFastManagedNapiKind(argTypeInfos[i]->kind)) {
      out << "  if (!TryFastConvertNapiArgument(env, static_cast<MDTypeKind>("
          << static_cast<int>(argTypeInfos[i]->kind) << "), argv[" << i
          << "], &arg" << i << ")) {\n";
      if (argKindMayNeedCleanup(argTypeInfos[i]->kind)) {
        out << "    cif->argTypes[" << i << "]->toNative(env, argv[" << i
            << "], &arg" << i << ", &shouldFree" << i << ", &shouldFreeAny);\n";
      } else {
        out << "    ignoredShouldFree = false;\n";
        out << "    ignoredShouldFreeAny = false;\n";
        out << "    cif->argTypes[" << i << "]->toNative(env, argv[" << i
            << "], &arg" << i
            << ", &ignoredShouldFree, &ignoredShouldFreeAny);\n";
      }
      out << "  }\n";
    } else {
      if (argKindMayNeedCleanup(argTypeInfos[i]->kind)) {
        out << "  cif->argTypes[" << i << "]->toNative(env, argv[" << i
            << "], &arg" << i << ", &shouldFree" << i << ", &shouldFreeAny);\n";
      } else {
        out << "  ignoredShouldFree = false;\n";
        out << "  ignoredShouldFreeAny = false;\n";
        out << "  cif->argTypes[" << i << "]->toNative(env, argv[" << i
            << "], &arg" << i
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

void writePreparedWrapper(std::ostringstream& out, DispatchKind kind,
                          const std::string& wrapperName,
                          const MDSignature* signature) {
  if (kind != DispatchKind::BlockInvoke) {
    return;
  }

  std::string returnType;
  if (!mapTypeToCpp(signature->returnType, &returnType, true)) {
    return;
  }

  std::vector<std::string> argTypes;
  argTypes.reserve(signature->arguments.size());
  for (const auto* arg : signature->arguments) {
    std::string argType;
    if (!mapTypeToCpp(arg, &argType, false)) {
      return;
    }
    argTypes.push_back(argType);
  }

  out << "static inline void " << wrapperName
      << "(void* fnptr, void** avalues, void* rvalue) {\n";
  out << "  using Fn = " << returnType << " (*)(void*";
  for (const auto& argType : argTypes) {
    out << ", " << argType;
  }
  out << ");\n";
  out << "  auto fn = reinterpret_cast<Fn>(fnptr);\n";
  out << "  void* block = *reinterpret_cast<void**>(avalues[0]);\n";
  for (size_t i = 0; i < argTypes.size(); i++) {
    out << "  " << argTypes[i] << " arg" << i << " = *reinterpret_cast<"
        << argTypes[i] << "*>(avalues[" << (i + 1) << "]);\n";
  }

  std::ostringstream callExpr;
  callExpr << "fn(block";
  for (size_t i = 0; i < argTypes.size(); i++) {
    callExpr << ", arg" << i;
  }
  callExpr << ")";

  if (returnType == "void") {
    out << "  " << callExpr.str() << ";\n";
  } else {
    out << "  *reinterpret_cast<" << returnType
        << "*>(rvalue) = " << callExpr.str() << ";\n";
  }
  out << "}\n\n";
}

void collectBlockUsesFromSignature(MDSectionOffset signatureOffset,
                                   const SignatureMap& signatures,
                                   std::unordered_set<MDSectionOffset>* active,
                                   std::vector<SignatureUse>* uses);

void collectBlockUsesFromType(const MDTypeInfo* type,
                              const SignatureMap& signatures,
                              std::unordered_set<MDSectionOffset>* active,
                              std::vector<SignatureUse>* uses) {
  if (type == nullptr || active == nullptr || uses == nullptr) {
    return;
  }

  switch (type->kind) {
    case mdTypeArray:
    case mdTypeVector:
    case mdTypeExtVector:
    case mdTypeComplex:
      collectBlockUsesFromType(type->elementType, signatures, active, uses);
      break;

    case mdTypePointer:
      collectBlockUsesFromType(type->pointeeType, signatures, active, uses);
      break;

    case mdTypeBlock:
      if (type->signatureOffset != MD_SECTION_OFFSET_NULL) {
        uses->push_back({DispatchKind::BlockInvoke, type->signatureOffset, 0});
        collectBlockUsesFromSignature(type->signatureOffset, signatures, active,
                                      uses);
      }
      break;

    case mdTypeFunctionPointer:
      if (type->signatureOffset != MD_SECTION_OFFSET_NULL) {
        collectBlockUsesFromSignature(type->signatureOffset, signatures, active,
                                      uses);
      }
      break;

    default:
      break;
  }
}

void collectBlockUsesFromSignature(MDSectionOffset signatureOffset,
                                   const SignatureMap& signatures,
                                   std::unordered_set<MDSectionOffset>* active,
                                   std::vector<SignatureUse>* uses) {
  if (active == nullptr || uses == nullptr ||
      signatureOffset == MD_SECTION_OFFSET_NULL ||
      active->find(signatureOffset) != active->end()) {
    return;
  }

  auto it = signatures.find(signatureOffset);
  if (it == signatures.end() || it->second == nullptr) {
    return;
  }

  active->insert(signatureOffset);
  const MDSignature* signature = it->second;
  collectBlockUsesFromType(signature->returnType, signatures, active, uses);
  for (const auto* arg : signature->arguments) {
    collectBlockUsesFromType(arg, signatures, active, uses);
  }
  active->erase(signatureOffset);
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

  const auto rootSignatureUses = signatureUses;
  std::unordered_set<MDSectionOffset> activeBlockSignatures;
  for (const auto& use : rootSignatureUses) {
    collectBlockUsesFromSignature(use.signatureOffset, writer.signatures,
                                  &activeBlockSignatures, &signatureUses);
  }

  std::unordered_map<std::string, std::pair<DispatchKind, const MDSignature*>>
      wrappersByKey;
  std::unordered_map<std::string, std::pair<DispatchKind, const MDSignature*>>
      preparedWrappersByKey;
  std::unordered_map<uint64_t, std::string> objcNapiEntries;
  std::unordered_map<uint64_t, std::string> cFunctionNapiEntries;
  std::unordered_map<uint64_t, std::string> objcEngineDirectEntries;
  std::unordered_map<uint64_t, std::string> cFunctionEngineDirectEntries;
  std::unordered_map<uint64_t, std::string> objcV8Entries;
  std::unordered_map<uint64_t, std::string> cFunctionV8Entries;
  std::unordered_map<uint64_t, std::string> objcHermesDirectReturnEntries;
  std::unordered_map<uint64_t, std::string> cFunctionHermesDirectReturnEntries;
  std::unordered_map<uint64_t, std::string> objcHermesFrameDirectReturnEntries;
  std::unordered_map<uint64_t, std::string> cFunctionHermesFrameDirectReturnEntries;
  std::unordered_map<uint64_t, std::string> blockHermesFrameDirectReturnEntries;
  std::unordered_map<uint64_t, std::string> blockPreparedEntries;
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
      objcEngineDirectEntries.erase(dispatchId);
      cFunctionEngineDirectEntries.erase(dispatchId);
      objcV8Entries.erase(dispatchId);
      cFunctionV8Entries.erase(dispatchId);
      objcHermesDirectReturnEntries.erase(dispatchId);
      cFunctionHermesDirectReturnEntries.erase(dispatchId);
      objcHermesFrameDirectReturnEntries.erase(dispatchId);
      cFunctionHermesFrameDirectReturnEntries.erase(dispatchId);
      blockHermesFrameDirectReturnEntries.erase(dispatchId);
      blockPreparedEntries.erase(dispatchId);
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

    if (use.kind == DispatchKind::ObjCMethod) {
      wrappersByKey.emplace(wrapperKey, std::make_pair(use.kind, signature));
      objcNapiEntries.emplace(dispatchId, wrapperKey);
      objcEngineDirectEntries.emplace(dispatchId, wrapperKey);
      objcV8Entries.emplace(dispatchId, wrapperKey);
      if (canUseHermesDirectReturnWrapper(
              use.kind, signature, HermesDirectReturnCallSite::FastCallback)) {
        objcHermesDirectReturnEntries.emplace(dispatchId, wrapperKey);
      }
      if (canUseHermesDirectReturnWrapper(
              use.kind, signature, HermesDirectReturnCallSite::Frame)) {
        objcHermesFrameDirectReturnEntries.emplace(dispatchId, wrapperKey);
      }
    } else if (use.kind == DispatchKind::CFunction) {
      wrappersByKey.emplace(wrapperKey, std::make_pair(use.kind, signature));
      cFunctionNapiEntries.emplace(dispatchId, wrapperKey);
      cFunctionEngineDirectEntries.emplace(dispatchId, wrapperKey);
      cFunctionV8Entries.emplace(dispatchId, wrapperKey);
      if (canUseHermesDirectReturnWrapper(
              use.kind, signature, HermesDirectReturnCallSite::FastCallback)) {
        cFunctionHermesDirectReturnEntries.emplace(dispatchId, wrapperKey);
      }
      if (canUseHermesDirectReturnWrapper(
              use.kind, signature, HermesDirectReturnCallSite::Frame)) {
        cFunctionHermesFrameDirectReturnEntries.emplace(dispatchId, wrapperKey);
      }
    } else if (use.kind == DispatchKind::BlockInvoke) {
      preparedWrappersByKey.emplace(wrapperKey,
                                    std::make_pair(use.kind, signature));
      blockPreparedEntries.emplace(dispatchId, wrapperKey);
      if (canUseHermesDirectReturnWrapper(
              use.kind, signature, HermesDirectReturnCallSite::Frame)) {
        blockHermesFrameDirectReturnEntries.emplace(dispatchId, wrapperKey);
      }
    }
  }

  std::vector<
      std::pair<std::string, std::pair<DispatchKind, const MDSignature*>>>
      wrappers(wrappersByKey.begin(), wrappersByKey.end());
  std::sort(
      wrappers.begin(), wrappers.end(),
      [](const auto& lhs, const auto& rhs) { return lhs.first < rhs.first; });

  std::vector<
      std::pair<std::string, std::pair<DispatchKind, const MDSignature*>>>
      preparedWrappers(preparedWrappersByKey.begin(),
                       preparedWrappersByKey.end());
  std::sort(
      preparedWrappers.begin(), preparedWrappers.end(),
      [](const auto& lhs, const auto& rhs) { return lhs.first < rhs.first; });

  std::unordered_map<std::string, std::string> wrapperNameByKey;
  wrapperNameByKey.reserve(wrappers.size());
  size_t wrapperIndex = 0;
  for (const auto& wrapper : wrappers) {
    wrapperNameByKey.emplace(
        wrapper.first,
        makeNapiWrapperName(wrapper.second.first, wrapperIndex++));
  }

  std::unordered_map<std::string, std::string> v8WrapperNameByKey;
  v8WrapperNameByKey.reserve(wrappers.size());
  size_t v8WrapperIndex = 0;
  for (const auto& wrapper : wrappers) {
    v8WrapperNameByKey.emplace(
        wrapper.first,
        makeV8WrapperName(wrapper.second.first, v8WrapperIndex++));
  }

  std::unordered_map<std::string, std::string> hermesDirectReturnWrapperNameByKey;
  hermesDirectReturnWrapperNameByKey.reserve(wrappers.size());
  size_t hermesDirectReturnWrapperIndex = 0;
  for (const auto& wrapper : wrappers) {
    hermesDirectReturnWrapperNameByKey.emplace(
        wrapper.first,
        makeHermesDirectReturnWrapperName(wrapper.second.first,
                                          hermesDirectReturnWrapperIndex++));
  }

  std::unordered_map<std::string, std::string>
      hermesFrameDirectReturnWrapperNameByKey;
  hermesFrameDirectReturnWrapperNameByKey.reserve(wrappers.size());
  size_t hermesFrameDirectReturnWrapperIndex = 0;
  for (const auto& wrapper : wrappers) {
    hermesFrameDirectReturnWrapperNameByKey.emplace(
        wrapper.first,
        makeHermesFrameDirectReturnWrapperName(
            wrapper.second.first, hermesFrameDirectReturnWrapperIndex++));
  }

  std::unordered_map<std::string, std::string>
      hermesBlockFrameDirectReturnWrapperNameByKey;
  hermesBlockFrameDirectReturnWrapperNameByKey.reserve(preparedWrappers.size());
  for (const auto& wrapper : preparedWrappers) {
    hermesBlockFrameDirectReturnWrapperNameByKey.emplace(
        wrapper.first,
        makeHermesFrameDirectReturnWrapperName(
            wrapper.second.first, hermesFrameDirectReturnWrapperIndex++));
  }

  std::unordered_map<std::string, std::string> engineDirectWrapperNameByKey;
  engineDirectWrapperNameByKey.reserve(wrappers.size());
  size_t engineDirectWrapperIndex = 0;
  for (const auto& wrapper : wrappers) {
    engineDirectWrapperNameByKey.emplace(
        wrapper.first,
        makeEngineDirectWrapperName(wrapper.second.first,
                                    engineDirectWrapperIndex++));
  }

  std::unordered_map<std::string, std::string> preparedWrapperNameByKey;
  preparedWrapperNameByKey.reserve(preparedWrappers.size());
  size_t preparedWrapperIndex = 0;
  for (const auto& wrapper : preparedWrappers) {
    preparedWrapperNameByKey.emplace(
        wrapper.first,
        makePreparedWrapperName(wrapper.second.first, preparedWrapperIndex++));
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

  std::vector<std::pair<uint64_t, std::string>> sortedObjCEngineDirectEntries(
      objcEngineDirectEntries.begin(), objcEngineDirectEntries.end());
  std::sort(sortedObjCEngineDirectEntries.begin(),
            sortedObjCEngineDirectEntries.end(),
            [](const auto& lhs, const auto& rhs) {
              return lhs.first < rhs.first;
            });

  std::vector<std::pair<uint64_t, std::string>>
      sortedCFunctionEngineDirectEntries(cFunctionEngineDirectEntries.begin(),
                                         cFunctionEngineDirectEntries.end());
  std::sort(sortedCFunctionEngineDirectEntries.begin(),
            sortedCFunctionEngineDirectEntries.end(),
            [](const auto& lhs, const auto& rhs) {
              return lhs.first < rhs.first;
            });

  std::vector<std::pair<uint64_t, std::string>> sortedObjCV8Entries(
      objcV8Entries.begin(), objcV8Entries.end());
  std::sort(
      sortedObjCV8Entries.begin(), sortedObjCV8Entries.end(),
      [](const auto& lhs, const auto& rhs) { return lhs.first < rhs.first; });

  std::vector<std::pair<uint64_t, std::string>> sortedCFunctionV8Entries(
      cFunctionV8Entries.begin(), cFunctionV8Entries.end());
  std::sort(
      sortedCFunctionV8Entries.begin(), sortedCFunctionV8Entries.end(),
      [](const auto& lhs, const auto& rhs) { return lhs.first < rhs.first; });

  std::vector<std::pair<uint64_t, std::string>>
      sortedObjCHermesDirectReturnEntries(
          objcHermesDirectReturnEntries.begin(),
          objcHermesDirectReturnEntries.end());
  std::sort(sortedObjCHermesDirectReturnEntries.begin(),
            sortedObjCHermesDirectReturnEntries.end(),
            [](const auto& lhs, const auto& rhs) {
              return lhs.first < rhs.first;
            });

  std::vector<std::pair<uint64_t, std::string>>
      sortedCFunctionHermesDirectReturnEntries(
          cFunctionHermesDirectReturnEntries.begin(),
          cFunctionHermesDirectReturnEntries.end());
  std::sort(sortedCFunctionHermesDirectReturnEntries.begin(),
            sortedCFunctionHermesDirectReturnEntries.end(),
            [](const auto& lhs, const auto& rhs) {
              return lhs.first < rhs.first;
            });

  std::vector<std::pair<uint64_t, std::string>>
      sortedObjCHermesFrameDirectReturnEntries(
          objcHermesFrameDirectReturnEntries.begin(),
          objcHermesFrameDirectReturnEntries.end());
  std::sort(sortedObjCHermesFrameDirectReturnEntries.begin(),
            sortedObjCHermesFrameDirectReturnEntries.end(),
            [](const auto& lhs, const auto& rhs) {
              return lhs.first < rhs.first;
            });

  std::vector<std::pair<uint64_t, std::string>>
      sortedCFunctionHermesFrameDirectReturnEntries(
          cFunctionHermesFrameDirectReturnEntries.begin(),
          cFunctionHermesFrameDirectReturnEntries.end());
  std::sort(sortedCFunctionHermesFrameDirectReturnEntries.begin(),
            sortedCFunctionHermesFrameDirectReturnEntries.end(),
            [](const auto& lhs, const auto& rhs) {
              return lhs.first < rhs.first;
            });

  std::vector<std::pair<uint64_t, std::string>>
      sortedBlockHermesFrameDirectReturnEntries(
          blockHermesFrameDirectReturnEntries.begin(),
          blockHermesFrameDirectReturnEntries.end());
  std::sort(sortedBlockHermesFrameDirectReturnEntries.begin(),
            sortedBlockHermesFrameDirectReturnEntries.end(),
            [](const auto& lhs, const auto& rhs) {
              return lhs.first < rhs.first;
            });

  std::vector<std::pair<uint64_t, std::string>> sortedBlockPreparedEntries(
      blockPreparedEntries.begin(), blockPreparedEntries.end());
  std::sort(
      sortedBlockPreparedEntries.begin(), sortedBlockPreparedEntries.end(),
      [](const auto& lhs, const auto& rhs) { return lhs.first < rhs.first; });

  std::ostringstream generated;
  generated << "#ifndef NS_GENERATED_SIGNATURE_DISPATCH_INC\n";
  generated << "#define NS_GENERATED_SIGNATURE_DISPATCH_INC\n\n";
  generated << "#if NS_GSD_BACKEND_V8 || NS_GSD_BACKEND_NAPI || "
               "NS_GSD_BACKEND_ENGINE_DIRECT\n";
  generated << "#undef NS_HAS_GENERATED_SIGNATURE_DISPATCH\n";
  generated << "#define NS_HAS_GENERATED_SIGNATURE_DISPATCH 1\n";
  generated << "#endif\n";
  generated << "#if NS_GSD_BACKEND_NAPI\n";
  generated << "#undef NS_HAS_GENERATED_SIGNATURE_NAPI_DISPATCH\n";
  generated << "#define NS_HAS_GENERATED_SIGNATURE_NAPI_DISPATCH 1\n";
  generated << "#endif\n";
  generated << "#if NS_GSD_BACKEND_V8\n";
  generated << "#undef NS_HAS_GENERATED_SIGNATURE_V8_DISPATCH\n";
  generated << "#define NS_HAS_GENERATED_SIGNATURE_V8_DISPATCH 1\n";
  generated << "#endif\n";
  generated << "#if NS_GSD_BACKEND_ENGINE_DIRECT\n";
  generated << "#undef NS_HAS_GENERATED_SIGNATURE_ENGINE_DIRECT_DISPATCH\n";
  generated << "#define NS_HAS_GENERATED_SIGNATURE_ENGINE_DIRECT_DISPATCH 1\n";
  generated << "#endif\n\n";
  generated << "#if NS_GSD_BACKEND_HERMES\n";
  generated << "#undef NS_HAS_GENERATED_SIGNATURE_HERMES_DIRECT_RETURN_DISPATCH\n";
  generated << "#define NS_HAS_GENERATED_SIGNATURE_HERMES_DIRECT_RETURN_DISPATCH 1\n";
  generated << "#undef "
               "NS_HAS_GENERATED_SIGNATURE_HERMES_FRAME_DIRECT_RETURN_DISPATCH\n";
  generated << "#define "
               "NS_HAS_GENERATED_SIGNATURE_HERMES_FRAME_DIRECT_RETURN_DISPATCH 1\n";
  generated << "#undef "
               "NS_HAS_GENERATED_SIGNATURE_HERMES_BLOCK_FRAME_DIRECT_RETURN_DISPATCH\n";
  generated << "#define "
               "NS_HAS_GENERATED_SIGNATURE_HERMES_BLOCK_FRAME_DIRECT_RETURN_DISPATCH 1\n";
  generated << "#endif\n\n";
  generated << "namespace nativescript {\n\n";

  generated << "#if NS_GSD_BACKEND_V8 || NS_GSD_BACKEND_NAPI || "
               "NS_GSD_BACKEND_ENGINE_DIRECT\n";
  for (const auto& wrapper : preparedWrappers) {
    writePreparedWrapper(generated, wrapper.second.first,
                         preparedWrapperNameByKey.at(wrapper.first),
                         wrapper.second.second);
  }
  generated << "#endif\n\n";

  generated << "#if NS_GSD_BACKEND_NAPI\n";
  for (const auto& wrapper : wrappers) {
    writeNapiWrapper(generated, wrapper.second.first,
                     wrapperNameByKey.at(wrapper.first), wrapper.second.second);
  }
  generated << "#endif\n\n";

  generated << "#if NS_GSD_BACKEND_ENGINE_DIRECT\n";
  generated << "#if NS_GSD_BACKEND_JSC\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_ARGUMENT "
               "TryFastConvertJSCArgument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_BOOL_ARGUMENT "
               "TryFastConvertJSCBoolArgument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_INT8_ARGUMENT "
               "TryFastConvertJSCInt8Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_UINT8_ARGUMENT "
               "TryFastConvertJSCUInt8Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_INT16_ARGUMENT "
               "TryFastConvertJSCInt16Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_UINT16_ARGUMENT "
               "TryFastConvertJSCUInt16Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_INT32_ARGUMENT "
               "TryFastConvertJSCInt32Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_UINT32_ARGUMENT "
               "TryFastConvertJSCUInt32Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_INT64_ARGUMENT "
               "TryFastConvertJSCInt64Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_UINT64_ARGUMENT "
               "TryFastConvertJSCUInt64Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_FLOAT_ARGUMENT "
               "TryFastConvertJSCFloatArgument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_DOUBLE_ARGUMENT "
               "TryFastConvertJSCDoubleArgument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_SELECTOR_ARGUMENT "
               "TryFastConvertJSCSelectorArgument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_OBJECT_ARGUMENT "
               "TryFastConvertJSCObjectArgument\n";
  generated << "#elif NS_GSD_BACKEND_QUICKJS\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_ARGUMENT "
               "TryFastConvertQuickJSArgument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_BOOL_ARGUMENT "
               "TryFastConvertQuickJSBoolArgument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_INT8_ARGUMENT "
               "TryFastConvertQuickJSInt8Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_UINT8_ARGUMENT "
               "TryFastConvertQuickJSUInt8Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_INT16_ARGUMENT "
               "TryFastConvertQuickJSInt16Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_UINT16_ARGUMENT "
               "TryFastConvertQuickJSUInt16Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_INT32_ARGUMENT "
               "TryFastConvertQuickJSInt32Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_UINT32_ARGUMENT "
               "TryFastConvertQuickJSUInt32Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_INT64_ARGUMENT "
               "TryFastConvertQuickJSInt64Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_UINT64_ARGUMENT "
               "TryFastConvertQuickJSUInt64Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_FLOAT_ARGUMENT "
               "TryFastConvertQuickJSFloatArgument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_DOUBLE_ARGUMENT "
               "TryFastConvertQuickJSDoubleArgument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_SELECTOR_ARGUMENT "
               "TryFastConvertQuickJSSelectorArgument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_OBJECT_ARGUMENT "
               "TryFastConvertQuickJSObjectArgument\n";
  generated << "#elif NS_GSD_BACKEND_HERMES\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_ARGUMENT "
               "TryFastConvertHermesArgument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_BOOL_ARGUMENT "
               "TryFastConvertHermesGeneratedBoolArgument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_INT8_ARGUMENT "
               "TryFastConvertHermesGeneratedInt8Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_UINT8_ARGUMENT "
               "TryFastConvertHermesGeneratedUInt8Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_INT16_ARGUMENT "
               "TryFastConvertHermesGeneratedInt16Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_UINT16_ARGUMENT "
               "TryFastConvertHermesGeneratedUInt16Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_INT32_ARGUMENT "
               "TryFastConvertHermesGeneratedInt32Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_UINT32_ARGUMENT "
               "TryFastConvertHermesGeneratedUInt32Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_INT64_ARGUMENT "
               "TryFastConvertHermesGeneratedInt64Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_UINT64_ARGUMENT "
               "TryFastConvertHermesGeneratedUInt64Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_FLOAT_ARGUMENT "
               "TryFastConvertHermesGeneratedFloatArgument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_DOUBLE_ARGUMENT "
               "TryFastConvertHermesGeneratedDoubleArgument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_SELECTOR_ARGUMENT "
               "TryFastConvertHermesSelectorArgument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_OBJECT_ARGUMENT "
               "TryFastConvertHermesObjectArgument\n";
  generated << "#else\n";
  generated << "#error \"No generated signature engine-direct converter selected\"\n";
  generated << "#endif\n";
  for (const auto& wrapper : wrappers) {
    writeEngineDirectWrapper(generated, wrapper.second.first,
                             engineDirectWrapperNameByKey.at(wrapper.first),
                             wrapper.second.second);
  }
  generated << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_ARGUMENT\n";
  generated << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_BOOL_ARGUMENT\n";
  generated << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_INT8_ARGUMENT\n";
  generated << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_UINT8_ARGUMENT\n";
  generated << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_INT16_ARGUMENT\n";
  generated << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_UINT16_ARGUMENT\n";
  generated << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_INT32_ARGUMENT\n";
  generated << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_UINT32_ARGUMENT\n";
  generated << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_INT64_ARGUMENT\n";
  generated << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_UINT64_ARGUMENT\n";
  generated << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_FLOAT_ARGUMENT\n";
  generated << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_DOUBLE_ARGUMENT\n";
  generated << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_SELECTOR_ARGUMENT\n";
  generated << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_OBJECT_ARGUMENT\n";
  generated << "#endif\n\n";

  generated << "#if NS_GSD_BACKEND_HERMES\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_ARGUMENT "
               "TryFastConvertHermesArgument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_BOOL_ARGUMENT "
               "TryFastConvertHermesGeneratedBoolArgument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_INT8_ARGUMENT "
               "TryFastConvertHermesGeneratedInt8Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_UINT8_ARGUMENT "
               "TryFastConvertHermesGeneratedUInt8Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_INT16_ARGUMENT "
               "TryFastConvertHermesGeneratedInt16Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_UINT16_ARGUMENT "
               "TryFastConvertHermesGeneratedUInt16Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_INT32_ARGUMENT "
               "TryFastConvertHermesGeneratedInt32Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_UINT32_ARGUMENT "
               "TryFastConvertHermesGeneratedUInt32Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_INT64_ARGUMENT "
               "TryFastConvertHermesGeneratedInt64Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_UINT64_ARGUMENT "
               "TryFastConvertHermesGeneratedUInt64Argument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_FLOAT_ARGUMENT "
               "TryFastConvertHermesGeneratedFloatArgument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_DOUBLE_ARGUMENT "
               "TryFastConvertHermesGeneratedDoubleArgument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_SELECTOR_ARGUMENT "
               "TryFastConvertHermesSelectorArgument\n";
  generated << "#define NS_GSD_ENGINE_DIRECT_CONVERT_OBJECT_ARGUMENT "
               "TryFastConvertHermesObjectArgument\n";
  for (const auto& wrapper : wrappers) {
    writeHermesDirectReturnWrapper(
        generated, wrapper.second.first,
        hermesDirectReturnWrapperNameByKey.at(wrapper.first),
        wrapper.second.second);
  }
  for (const auto& wrapper : wrappers) {
    writeHermesFrameDirectReturnWrapper(
        generated, wrapper.second.first,
        hermesFrameDirectReturnWrapperNameByKey.at(wrapper.first),
        wrapper.second.second);
  }
  for (const auto& wrapper : preparedWrappers) {
    writeHermesFrameDirectReturnWrapper(
        generated, wrapper.second.first,
        hermesBlockFrameDirectReturnWrapperNameByKey.at(wrapper.first),
        wrapper.second.second);
  }
  generated << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_ARGUMENT\n";
  generated << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_BOOL_ARGUMENT\n";
  generated << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_INT8_ARGUMENT\n";
  generated << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_UINT8_ARGUMENT\n";
  generated << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_INT16_ARGUMENT\n";
  generated << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_UINT16_ARGUMENT\n";
  generated << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_INT32_ARGUMENT\n";
  generated << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_UINT32_ARGUMENT\n";
  generated << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_INT64_ARGUMENT\n";
  generated << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_UINT64_ARGUMENT\n";
  generated << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_FLOAT_ARGUMENT\n";
  generated << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_DOUBLE_ARGUMENT\n";
  generated << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_SELECTOR_ARGUMENT\n";
  generated << "#undef NS_GSD_ENGINE_DIRECT_CONVERT_OBJECT_ARGUMENT\n";
  generated << "#endif\n\n";

  generated << "#if NS_GSD_BACKEND_V8\n";
  for (const auto& wrapper : wrappers) {
    writeV8Wrapper(generated, wrapper.second.first,
                   v8WrapperNameByKey.at(wrapper.first), wrapper.second.second);
  }
  generated << "#endif\n\n";

  generated << "#if NS_GSD_BACKEND_V8 || NS_GSD_BACKEND_NAPI || "
               "NS_GSD_BACKEND_ENGINE_DIRECT\n";
  generated << "inline constexpr ObjCDispatchEntry "
               "kGeneratedObjCDispatchEntries[] = {\n";
  generated << "    {0, nullptr},\n";
  generated << "};\n\n";

  generated << "inline constexpr CFunctionDispatchEntry "
               "kGeneratedCFunctionDispatchEntries[] = {\n";
  generated << "    {0, nullptr},\n";
  generated << "};\n\n";

  generated << "inline constexpr BlockDispatchEntry "
               "kGeneratedBlockDispatchEntries[] = {\n";
  generated << "    {0, nullptr},\n";
  for (const auto& entry : sortedBlockPreparedEntries) {
    generated << "    {" << toHexLiteral(entry.first) << ", &"
              << preparedWrapperNameByKey.at(entry.second) << "},\n";
  }
  generated << "};\n\n";
  generated << "#endif\n\n";

  generated << "#if NS_GSD_BACKEND_ENGINE_DIRECT\n";
  generated << "inline constexpr ObjCEngineDirectDispatchEntry "
               "kGeneratedObjCEngineDirectDispatchEntries[] = {\n";
  generated << "    {0, nullptr},\n";
  for (const auto& entry : sortedObjCEngineDirectEntries) {
    generated << "    {" << toHexLiteral(entry.first) << ", &"
              << engineDirectWrapperNameByKey.at(entry.second) << "},\n";
  }
  generated << "};\n\n";

  generated << "inline constexpr CFunctionEngineDirectDispatchEntry "
               "kGeneratedCFunctionEngineDirectDispatchEntries[] = {\n";
  generated << "    {0, nullptr},\n";
  for (const auto& entry : sortedCFunctionEngineDirectEntries) {
    generated << "    {" << toHexLiteral(entry.first) << ", &"
              << engineDirectWrapperNameByKey.at(entry.second) << "},\n";
  }
  generated << "};\n";
  generated << "#endif\n\n";

  generated << "#if NS_GSD_BACKEND_HERMES\n";
  generated << "inline constexpr ObjCHermesDirectReturnDispatchEntry "
               "kGeneratedObjCHermesDirectReturnDispatchEntries[] = {\n";
  generated << "    {0, nullptr},\n";
  for (const auto& entry : sortedObjCHermesDirectReturnEntries) {
    generated << "    {" << toHexLiteral(entry.first) << ", &"
              << hermesDirectReturnWrapperNameByKey.at(entry.second)
              << "},\n";
  }
  generated << "};\n\n";

  generated << "inline constexpr CFunctionHermesDirectReturnDispatchEntry "
               "kGeneratedCFunctionHermesDirectReturnDispatchEntries[] = {\n";
  generated << "    {0, nullptr},\n";
  for (const auto& entry : sortedCFunctionHermesDirectReturnEntries) {
    generated << "    {" << toHexLiteral(entry.first) << ", &"
              << hermesDirectReturnWrapperNameByKey.at(entry.second)
              << "},\n";
  }
  generated << "};\n";

  generated << "inline constexpr ObjCHermesFrameDirectReturnDispatchEntry "
               "kGeneratedObjCHermesFrameDirectReturnDispatchEntries[] = {\n";
  generated << "    {0, nullptr},\n";
  for (const auto& entry : sortedObjCHermesFrameDirectReturnEntries) {
    generated << "    {" << toHexLiteral(entry.first) << ", &"
              << hermesFrameDirectReturnWrapperNameByKey.at(entry.second)
              << "},\n";
  }
  generated << "};\n\n";

  generated << "inline constexpr CFunctionHermesFrameDirectReturnDispatchEntry "
               "kGeneratedCFunctionHermesFrameDirectReturnDispatchEntries[] = {\n";
  generated << "    {0, nullptr},\n";
  for (const auto& entry : sortedCFunctionHermesFrameDirectReturnEntries) {
    generated << "    {" << toHexLiteral(entry.first) << ", &"
              << hermesFrameDirectReturnWrapperNameByKey.at(entry.second)
              << "},\n";
  }
  generated << "};\n";

  generated << "inline constexpr BlockHermesFrameDirectReturnDispatchEntry "
               "kGeneratedBlockHermesFrameDirectReturnDispatchEntries[] = {\n";
  generated << "    {0, nullptr},\n";
  for (const auto& entry : sortedBlockHermesFrameDirectReturnEntries) {
    generated << "    {" << toHexLiteral(entry.first) << ", &"
              << hermesBlockFrameDirectReturnWrapperNameByKey.at(entry.second)
              << "},\n";
  }
  generated << "};\n";
  generated << "#endif\n\n";

  generated << "#if NS_GSD_BACKEND_NAPI\n";
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
  generated << "#endif\n\n";

  generated << "#if NS_GSD_BACKEND_V8\n";
  generated << "inline constexpr ObjCV8DispatchEntry "
               "kGeneratedObjCV8DispatchEntries[] = {\n";
  generated << "    {0, nullptr},\n";
  for (const auto& entry : sortedObjCV8Entries) {
    generated << "    {" << toHexLiteral(entry.first) << ", &"
              << v8WrapperNameByKey.at(entry.second) << "},\n";
  }
  generated << "};\n\n";

  generated << "inline constexpr CFunctionV8DispatchEntry "
               "kGeneratedCFunctionV8DispatchEntries[] = {\n";
  generated << "    {0, nullptr},\n";
  for (const auto& entry : sortedCFunctionV8Entries) {
    generated << "    {" << toHexLiteral(entry.first) << ", &"
              << v8WrapperNameByKey.at(entry.second) << "},\n";
  }
  generated << "};\n";
  generated << "#endif\n\n";

  generated << "}  // namespace nativescript\n\n";
  generated << "#endif  // NS_GENERATED_SIGNATURE_DISPATCH_INC\n";

  std::ofstream outFile(outputPath, std::ios::trunc | std::ios::binary);
  outFile << generated.str();
}

}  // namespace metagen

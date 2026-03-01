#include "SignatureDispatchEmitter.h"

#include <algorithm>
#include <cstdint>
#include <fstream>
#include <iomanip>
#include <sstream>
#include <string>
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

uint64_t hashBytesFnv1a(const void* data, size_t size, uint64_t seed = kFNV64OffsetBasis) {
  const auto* bytes = static_cast<const uint8_t*>(data);
  uint64_t hash = seed;
  for (size_t i = 0; i < size; i++) {
    hash ^= static_cast<uint64_t>(bytes[i]);
    hash *= kFNV64Prime;
  }
  return hash;
}

uint64_t composeDispatchId(uint64_t signatureHash, DispatchKind kind, uint8_t flags) {
  const uint8_t kindByte = static_cast<uint8_t>(kind);
  uint64_t hash = hashBytesFnv1a(&kindByte, sizeof(kindByte));
  hash = hashBytesFnv1a(&flags, sizeof(flags), hash);
  return hashBytesFnv1a(&signatureHash, sizeof(signatureHash), hash);
}

uint64_t signatureHash(const MDSignature* signature) {
  if (signature == nullptr) {
    return 0;
  }

  MDSignatureSerde serde;
  const size_t encodedSize = serde.size(const_cast<MDSignature*>(signature));
  if (encodedSize == 0) {
    return kFNV64OffsetBasis;
  }

  std::vector<uint8_t> encoded(encodedSize);
  serde.serialize(const_cast<MDSignature*>(signature), encoded.data());
  return hashBytesFnv1a(encoded.data(), encoded.size());
}

bool mapTypeToCpp(const MDTypeInfo* type, std::string* out, bool allowVoid = false);

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
  stream << "0x" << std::hex << std::setw(16) << std::setfill('0') << value << "ULL";
  return stream.str();
}

std::string makeWrapperName(DispatchKind kind, uint64_t signatureHashValue) {
  std::ostringstream stream;
  stream << "ns_dispatch_" << (kind == DispatchKind::ObjCMethod ? "objc_" : "cfunc_")
         << std::hex << std::setw(16) << std::setfill('0') << signatureHashValue;
  return stream.str();
}

std::string readArgExpression(const std::string& cppType, size_t index) {
  std::ostringstream stream;
  stream << "*reinterpret_cast<" << cppType << "*>(avalues[" << index << "])";
  return stream.str();
}

void writeWrapper(std::ostringstream& out, DispatchKind kind, const std::string& wrapperName,
                  const MDSignature* signature) {
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

  out << "inline void " << wrapperName << "(void* fnptr, void** avalues, void* rvalue) {\n";
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

  std::vector<std::string> callArgs;
  callArgs.reserve(argTypes.size() + (kind == DispatchKind::ObjCMethod ? 2 : 0));
  size_t argIndex = 0;
  if (kind == DispatchKind::ObjCMethod) {
    callArgs.push_back(readArgExpression("id", argIndex++));
    callArgs.push_back(readArgExpression("SEL", argIndex++));
  }
  for (const auto& argType : argTypes) {
    callArgs.push_back(readArgExpression(argType, argIndex++));
  }

  std::ostringstream callExpr;
  callExpr << "fn(";
  for (size_t i = 0; i < callArgs.size(); i++) {
    if (i > 0) {
      callExpr << ", ";
    }
    callExpr << callArgs[i];
  }
  callExpr << ")";

  if (returnType == "void") {
    out << "  " << callExpr.str() << ";\n";
    out << "  (void)rvalue;\n";
  } else {
    out << "  auto result = " << callExpr.str() << ";\n";
    out << "  *reinterpret_cast<" << returnType << "*>(rvalue) = result;\n";
  }

  out << "}\n\n";
}

void collectMethodUses(const std::vector<MDMember*>& members, std::vector<SignatureUse>* uses) {
  if (uses == nullptr) {
    return;
  }

  for (auto* member : members) {
    if (member == nullptr) {
      continue;
    }

    const uint8_t methodFlags = (member->flags & mdMemberReturnOwned) != 0 ? 1 : 0;

    if ((member->flags & mdMemberProperty) != 0) {
      if (member->getterSignature != MD_SECTION_OFFSET_NULL) {
        uses->push_back({DispatchKind::ObjCMethod, member->getterSignature, methodFlags});
      }
      if (((member->flags & mdMemberReadonly) == 0) &&
          member->setterSignature != MD_SECTION_OFFSET_NULL) {
        uses->push_back({DispatchKind::ObjCMethod, member->setterSignature, 0});
      }
    } else {
      if (member->signature != MD_SECTION_OFFSET_NULL) {
        uses->push_back({DispatchKind::ObjCMethod, member->signature, methodFlags});
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
    const uint8_t flags = (function->flags & mdFunctionReturnOwned) != 0 ? 1 : 0;
    signatureUses.push_back({DispatchKind::CFunction, function->signature, flags});
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

  std::unordered_map<std::string, std::pair<DispatchKind, const MDSignature*>> wrappersByKey;
  std::unordered_map<uint64_t, std::string> objcEntries;
  std::unordered_map<uint64_t, std::string> cFunctionEntries;
  std::unordered_map<uint64_t, std::string> dispatchEncoding;
  std::unordered_set<uint64_t> collidedDispatchIds;
  MDSignatureSerde signatureSerde;

  for (const auto& use : signatureUses) {
    auto signatureIt = writer.signatures.find(use.signatureOffset);
    if (signatureIt == writer.signatures.end()) {
      continue;
    }

    const MDSignature* signature = signatureIt->second;
    if (!isSignatureSupported(signature)) {
      continue;
    }

    const uint64_t sigHash = signatureHash(signature);
    const uint64_t dispatchId = composeDispatchId(sigHash, use.kind, use.flags);
    const std::string signatureEncoding = signatureSerde.encode(const_cast<MDSignature*>(signature));

    auto encodedIt = dispatchEncoding.find(dispatchId);
    if (encodedIt != dispatchEncoding.end() && encodedIt->second != signatureEncoding) {
      collidedDispatchIds.insert(dispatchId);
      objcEntries.erase(dispatchId);
      cFunctionEntries.erase(dispatchId);
      dispatchEncoding.erase(dispatchId);
      continue;
    }
    if (collidedDispatchIds.find(dispatchId) != collidedDispatchIds.end()) {
      continue;
    }
    dispatchEncoding.emplace(dispatchId, signatureEncoding);

    std::ostringstream wrapperKeyBuilder;
    wrapperKeyBuilder << static_cast<int>(use.kind) << ":" << sigHash;
    const std::string wrapperKey = wrapperKeyBuilder.str();
    const std::string wrapperName = makeWrapperName(use.kind, sigHash);

    wrappersByKey.emplace(wrapperKey, std::make_pair(use.kind, signature));

    if (use.kind == DispatchKind::ObjCMethod) {
      objcEntries.emplace(dispatchId, wrapperName);
    } else {
      cFunctionEntries.emplace(dispatchId, wrapperName);
    }
  }

  std::vector<std::pair<std::string, std::pair<DispatchKind, const MDSignature*>>> wrappers(
      wrappersByKey.begin(), wrappersByKey.end());
  std::sort(wrappers.begin(), wrappers.end(), [](const auto& lhs, const auto& rhs) {
    return lhs.first < rhs.first;
  });

  std::vector<std::pair<uint64_t, std::string>> sortedObjCEntries(objcEntries.begin(),
                                                                   objcEntries.end());
  std::sort(sortedObjCEntries.begin(), sortedObjCEntries.end(),
            [](const auto& lhs, const auto& rhs) { return lhs.first < rhs.first; });

  std::vector<std::pair<uint64_t, std::string>> sortedCFunctionEntries(cFunctionEntries.begin(),
                                                                        cFunctionEntries.end());
  std::sort(sortedCFunctionEntries.begin(), sortedCFunctionEntries.end(),
            [](const auto& lhs, const auto& rhs) { return lhs.first < rhs.first; });

  std::ostringstream generated;
  generated << "#ifndef NS_GENERATED_SIGNATURE_DISPATCH_INC\n";
  generated << "#define NS_GENERATED_SIGNATURE_DISPATCH_INC\n\n";
  generated << "namespace nativescript {\n\n";

  for (const auto& wrapper : wrappers) {
    writeWrapper(generated, wrapper.second.first,
                 makeWrapperName(wrapper.second.first, signatureHash(wrapper.second.second)),
                 wrapper.second.second);
  }

  generated << "inline constexpr ObjCDispatchEntry kGeneratedObjCDispatchEntries[] = {\n";
  generated << "    {0, nullptr},\n";
  for (const auto& entry : sortedObjCEntries) {
    generated << "    {" << toHexLiteral(entry.first) << ", &" << entry.second << "},\n";
  }
  generated << "};\n\n";

  generated << "inline constexpr CFunctionDispatchEntry kGeneratedCFunctionDispatchEntries[] = {\n";
  generated << "    {0, nullptr},\n";
  for (const auto& entry : sortedCFunctionEntries) {
    generated << "    {" << toHexLiteral(entry.first) << ", &" << entry.second << "},\n";
  }
  generated << "};\n\n";

  generated << "}  // namespace nativescript\n\n";
  generated << "#endif  // NS_GENERATED_SIGNATURE_DISPATCH_INC\n";

  std::ofstream outFile(outputPath, std::ios::trunc | std::ios::binary);
  outFile << generated.str();
}

}  // namespace metagen

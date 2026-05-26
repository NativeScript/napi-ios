#include "SignatureDispatchEmitter.h"
#include "SignatureDispatchEmitter/Shared.h"

#include <algorithm>
#include <fstream>
#include <sstream>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <vector>

namespace metagen {

using namespace signature_dispatch;

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
  writeEngineDirectConverterMacros(generated);
  for (const auto& wrapper : wrappers) {
    writeEngineDirectWrapper(generated, wrapper.second.first,
                             engineDirectWrapperNameByKey.at(wrapper.first),
                             wrapper.second.second);
  }
  writeEngineDirectConverterUndefs(generated);
  generated << "#endif\n\n";

  generated << "#if NS_GSD_BACKEND_HERMES\n";
  writeHermesEngineDirectConverterMacros(generated);
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
  writeEngineDirectConverterUndefs(generated);
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

#include "MetadataWriter.h"

namespace metagen {

size_t MDStringSerde::size(std::string value) { return value.size() + 1; }

void MDStringSerde::serialize(std::string value, void *data) {
  memcpy(data, value.c_str(), value.size() + 1);
}

void MDMetadataWriter::write() {
  for (auto &kv : factory.variables) {
    write(kv.second);
  }

  for (auto &kv : factory.enums) {
    write(kv.second);
  }

  for (auto &kv : factory.structs) {
    write(kv.second);
  }

  for (auto &kv : factory.unions) {
    write(kv.second);
  }

  for (FunctionDecl &decl : factory.functions) {
    write(decl);
  }

  for (auto &kv : factory.protocols) {
    write(kv.second);
  }

  for (auto &kv : factory.classes) {
    write(kv.second);
  }

  for (MDResolvable &res : structResolvables) {
    if (auto declIt = factory.structs.find(res.name);
        declIt != factory.structs.end()) {
      *res.offset = declIt->second.mdOffset;
    }
  }

  for (MDResolvable &res : classResolvables) {
    if (auto declIt = factory.classes.find(res.name);
        declIt != factory.classes.end()) {
      *res.offset = declIt->second.mdOffset;
    }
  }

  for (MDResolvable &res : protocolResolvables) {
    if (auto declIt = factory.protocols.find(res.name);
        declIt != factory.protocols.end()) {
      *res.offset = declIt->second.mdOffset;
    }
  }

  MDSignatureSerde serde;
  for (MDSignatureResolvable &res : signatureResolvables) {
    *res.offset = signatures.add(res.signature, serde.encode(res.signature));
  }
}

std::pair<void *, size_t> MDMetadataWriter::serialize() {
  // Header
  size_t size = MD_HEADER_SIZE;

  // Section Offsets
  // Strings section is always first, offset is just after header
  // so we don't write it here.
  MDSectionOffset section_offsets =
      sizeof(MDSectionOffset) * (MD_NUM_SECTIONS - 1);
  size += section_offsets;

  // Strings
  size += strings.section_size;

  // Constants
  size += constants.section_size;

  // Enums
  size += enums.section_size;

  // Signatures
  size += signatures.section_size;

  // Functions
  size += functions.section_size;

  // Protocols
  size += protocols.section_size;

  // Classes
  size += classes.section_size;

  // Structs
  size += structs.section_size;

  // Unions
  size += unions.section_size;

  // Padding (= 0)
  size += sizeof(MDSectionOffset);

  void *orig_data = malloc(size);
  void *data = orig_data;

  // Header
  memcpy(data, MD_HEADER_MAGIC, MD_HEADER_MAGIC_SIZE);
  ptr_add(&data, MD_HEADER_MAGIC_SIZE);
  uint16_t version = MD_HEADER_VERSION;
  memcpy(data, &version, MD_HEADER_VERSION_SIZE);
  ptr_add(&data, MD_HEADER_VERSION_SIZE);

  // Section Offsets

  MDSectionOffset baseSectionOffset = MD_HEADER_SIZE + section_offsets;

  MDSectionOffset stringsOffset = baseSectionOffset;
  // memcpy(data, &stringsOffset, sizeof(MDSectionOffset));
  // ptr_add(&data, sizeof(MDSectionOffset));

  MDSectionOffset constantsOffset =
      stringsOffset + (MDSectionOffset)strings.section_size;
  memcpy(data, &constantsOffset, sizeof(MDSectionOffset));
  ptr_add(&data, sizeof(MDSectionOffset));

  MDSectionOffset enumsOffset =
      constantsOffset + (MDSectionOffset)constants.section_size;
  memcpy(data, &enumsOffset, sizeof(MDSectionOffset));
  ptr_add(&data, sizeof(MDSectionOffset));

  MDSectionOffset signaturesOffset =
      enumsOffset + (MDSectionOffset)enums.section_size;
  memcpy(data, &signaturesOffset, sizeof(MDSectionOffset));
  ptr_add(&data, sizeof(MDSectionOffset));

  MDSectionOffset functionsOffset =
      signaturesOffset + (MDSectionOffset)signatures.section_size;
  memcpy(data, &functionsOffset, sizeof(MDSectionOffset));
  ptr_add(&data, sizeof(MDSectionOffset));

  MDSectionOffset protocolsOffset =
      functionsOffset + (MDSectionOffset)functions.section_size;
  memcpy(data, &protocolsOffset, sizeof(MDSectionOffset));
  ptr_add(&data, sizeof(MDSectionOffset));

  MDSectionOffset classesOffset = protocolsOffset + (MDSectionOffset)protocols.section_size;
  memcpy(data, &classesOffset, sizeof(MDSectionOffset));
  ptr_add(&data, sizeof(MDSectionOffset));

  MDSectionOffset structsOffset =
      classesOffset + (MDSectionOffset)classes.section_size;
  memcpy(data, &structsOffset, sizeof(MDSectionOffset));
  ptr_add(&data, sizeof(MDSectionOffset));

  MDSectionOffset unionsOffset =
      structsOffset + (MDSectionOffset)structs.section_size;
  memcpy(data, &unionsOffset, sizeof(MDSectionOffset));
  ptr_add(&data, sizeof(MDSectionOffset));

  // Strings
  for (const auto& [_, str] : strings.orderedEntries) {
    size_t serializedSize = strings.serde.size(str);
    strings.serde.serialize(str, data);
    ptr_add(&data, serializedSize);
  }

  // Constants
  for (const auto& [_, constant] : constants.orderedEntries) {
    size_t serializedSize = constants.serde.size(constant);
    constants.serde.serialize(constant, data);
    ptr_add(&data, serializedSize);
  }

  // Enums
  for (const auto& [_, enum_] : enums.orderedEntries) {
    size_t serializedSize = enums.serde.size(enum_);
    enums.serde.serialize(enum_, data);
    ptr_add(&data, serializedSize);
  }

  // Signatures
  for (const auto& [_, signature] : signatures.orderedEntries) {
    size_t serializedSize = signatures.serde.size(signature);
    signatures.serde.serialize(signature, data);
    ptr_add(&data, serializedSize);
  }

  // Functions
  for (const auto& [_, function] : functions.orderedEntries) {
    size_t serializedSize = functions.serde.size(function);
    functions.serde.serialize(function, data);
    ptr_add(&data, serializedSize);
  }

  // Protocols
  for (const auto& [_, protocol] : protocols.orderedEntries) {
    size_t serializedSize = protocols.serde.size(protocol);
    protocols.serde.serialize(protocol, data);
    ptr_add(&data, serializedSize);
  }

  // Classes
  for (const auto& [_, class_] : classes.orderedEntries) {
    size_t serializedSize = classes.serde.size(class_);
    classes.serde.serialize(class_, data);
    ptr_add(&data, serializedSize);
  }

  // Structs
  for (const auto& [_, struct_] : structs.orderedEntries) {
    size_t serializedSize = structs.serde.size(struct_);
    structs.serde.serialize(struct_, data);
    ptr_add(&data, serializedSize);
  }

  // Unions
  for (const auto& [_, union_] : unions.orderedEntries) {
    size_t serializedSize = unions.serde.size(union_);
    unions.serde.serialize(union_, data);
    ptr_add(&data, serializedSize);
  }

  // Padding
  memset(data, 0, sizeof(MDSectionOffset));

  return std::make_pair(orig_data, size);
}

} // namespace metagen

#include "TypeConv.h"
#include "Block.h"
#include "Class.h"
#include "Closure.h"
#include "Interop.h"
#include "JSObject.h"
#include "Metadata.h"
#include "MetadataReader.h"
#include "ObjCBridge.h"
#include "ffi.h"
#include "ffi/Struct.h"
#include "js_native_api.h"
#include "js_native_api_types.h"
#include "node_api_util.h"

#import <CoreFoundation/CoreFoundation.h>
#import <Foundation/Foundation.h>
#include <objc/runtime.h>
#include <stdbool.h>
#include <cstring>
#include <functional>
#include <memory>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <vector>

namespace nativescript {

namespace {
constexpr const char* kProtocolSuffix = "Protocol";

bool stripProtocolSuffix(const char* name, std::string* out) {
  if (name == nullptr || out == nullptr) {
    return false;
  }

  const size_t nameLen = std::strlen(name);
  const size_t suffixLen = std::strlen(kProtocolSuffix);
  if (nameLen <= suffixLen) {
    return false;
  }

  if (std::strcmp(name + (nameLen - suffixLen), kProtocolSuffix) != 0) {
    return false;
  }

  *out = std::string(name, nameLen - suffixLen);
  return !out->empty();
}

bool protocolNamesMatch(const char* metadataName, const char* runtimeName) {
  if (metadataName == nullptr || runtimeName == nullptr) {
    return false;
  }

  if (std::strcmp(metadataName, runtimeName) == 0) {
    return true;
  }

  std::string metadataBase(metadataName);
  std::string runtimeBase(runtimeName);
  stripProtocolSuffix(metadataName, &metadataBase);
  stripProtocolSuffix(runtimeName, &runtimeBase);

  return metadataBase == runtimeBase;
}

MDSectionOffset findProtocolMetadataOffset(MDMetadataReader* metadata, const char* protocolName) {
  if (metadata == nullptr || protocolName == nullptr) {
    return MD_SECTION_OFFSET_NULL;
  }

  MDSectionOffset offset = metadata->protocolsOffset;
  while (offset < metadata->classesOffset) {
    MDSectionOffset originalOffset = offset;

    auto nameOffset = metadata->getOffset(offset);
    offset += sizeof(MDSectionOffset);
    bool next = (nameOffset & mdSectionOffsetNext) != 0;
    nameOffset &= ~mdSectionOffsetNext;

    auto name = metadata->resolveString(nameOffset);
    if (protocolNamesMatch(name, protocolName)) {
      return originalOffset;
    }

    while (next) {
      auto protocolImpl = metadata->getOffset(offset);
      offset += sizeof(MDSectionOffset);
      next = (protocolImpl & mdSectionOffsetNext) != 0;
    }

    next = true;
    while (next) {
      auto flags = metadata->getMemberFlag(offset);
      next = (flags & mdMemberNext) != 0;
      offset += sizeof(flags);

      if (flags == mdMemberFlagNull) {
        break;
      }

      if ((flags & mdMemberProperty) != 0) {
        bool readonly = (flags & mdMemberReadonly) != 0;
        offset += sizeof(MDSectionOffset);  // name
        offset += sizeof(MDSectionOffset);  // getter selector
        offset += sizeof(MDSectionOffset);  // getter signature
        if (!readonly) {
          offset += sizeof(MDSectionOffset);  // setter selector
          offset += sizeof(MDSectionOffset);  // setter signature
        }
      } else {
        offset += sizeof(MDSectionOffset);  // selector
        offset += sizeof(MDSectionOffset);  // signature
      }
    }
  }

  return MD_SECTION_OFFSET_NULL;
}
}  // namespace

// Forward declaration
class StructTypeConv;

// Thread-local storage for tracking structs currently being processed to detect cycles
thread_local std::unordered_set<MDSectionOffset> processingStructs;
thread_local std::unordered_set<std::string> processingEncodingStructs;

// Cache for forward-declared struct types that need deferred resolution
thread_local std::unordered_map<MDSectionOffset, ffi_type*> forwardDeclaredStructs;
thread_local std::unordered_map<std::string, ffi_type*> forwardDeclaredEncodingStructs;

// Cache for StructTypeConv instances to avoid recreating them and handle recursion
thread_local std::unordered_map<MDSectionOffset, std::shared_ptr<StructTypeConv>> structTypeCache;

// Cache for encoding-based structs to handle recursion
thread_local std::unordered_map<std::string, std::shared_ptr<StructTypeConv>> encodingStructCache;

ffi_type* typeFromStruct(napi_env env, const char** encoding) {
  // Extract struct name for cycle detection
  std::string structname;
  const char* nameStart = *encoding + 1;  // skip '{'
  const char* c = nameStart;
  while (*c != '=') {
    structname += *c;
    c++;
  }

  // Check if we're already processing this struct (cycle detection)
  if (processingEncodingStructs.find(structname) != processingEncodingStructs.end()) {
    // Create a forward declaration placeholder
    ffi_type* forwardType = new ffi_type;
    forwardType->type = FFI_TYPE_STRUCT;
    forwardType->size = 0;
    forwardType->alignment = 0;
    forwardType->elements = nullptr;

    // Cache this forward declaration for later resolution
    forwardDeclaredEncodingStructs[structname] = forwardType;

    // Skip the struct encoding
    (*encoding)++;  // skip '{'
    while (**encoding != '}') {
      (*encoding)++;
    }
    (*encoding)++;  // skip '}'

    return forwardType;
  }

  // Check if we already have a forward declaration for this struct
  auto forwardIt = forwardDeclaredEncodingStructs.find(structname);
  if (forwardIt != forwardDeclaredEncodingStructs.end()) {
    // Skip the struct encoding
    (*encoding)++;  // skip '{'
    while (**encoding != '}') {
      (*encoding)++;
    }
    (*encoding)++;  // skip '}'

    return forwardIt->second;
  }

  // Mark this struct as being processed
  processingEncodingStructs.insert(structname);

  ffi_type* type = new ffi_type;
  type->type = FFI_TYPE_STRUCT;
  type->size = 0;
  type->alignment = 0;
  type->elements = nullptr;

  std::vector<ffi_type*> elements;

  (*encoding)++;  // skip '{'

  while (**encoding != '=') {
    (*encoding)++;
  }  // skip name

  (*encoding)++;  // skip '='

  while (**encoding != '}') {
    ffi_type* elementType = TypeConv::Make(env, encoding)->type;
    elements.push_back(elementType);
  }

  (*encoding)++;  // skip '}'

  type->elements = (ffi_type**)malloc(sizeof(ffi_type*) * (elements.size() + 1));
  for (int i = 0; i < elements.size(); i++) {
    type->elements[i] = elements[i];
  }
  // null-terminate the array
  type->elements[elements.size()] = nullptr;

  // If this was a forward declaration, update it with the real layout
  if (forwardIt != forwardDeclaredEncodingStructs.end()) {
    ffi_type* forwardType = forwardIt->second;
    forwardType->type = type->type;
    forwardType->size = type->size;
    forwardType->alignment = type->alignment;
    forwardType->elements = type->elements;

    // Clean up the temporary type and use the forward declaration
    delete type;
    type = forwardType;
    forwardDeclaredEncodingStructs.erase(forwardIt);
  }

  // Remove from processing set
  processingEncodingStructs.erase(structname);

  return type;
}

ffi_type* typeFromStruct(napi_env env, MDMetadataReader* reader, MDSectionOffset structOffset,
                         bool isUnion) {
  // Check if we're already processing this struct (cycle detection)
  if (processingStructs.find(structOffset) != processingStructs.end()) {
    // Create a forward declaration placeholder
    ffi_type* forwardType = new ffi_type;
    forwardType->type = FFI_TYPE_STRUCT;
    forwardType->size = 0;
    forwardType->alignment = 0;
    forwardType->elements = nullptr;

    // Cache this forward declaration for later resolution
    forwardDeclaredStructs[structOffset] = forwardType;
    return forwardType;
  }

  // Check if we already have a forward declaration for this struct
  auto forwardIt = forwardDeclaredStructs.find(structOffset);
  if (forwardIt != forwardDeclaredStructs.end()) {
    return forwardIt->second;
  }

  // Mark this struct as being processed
  processingStructs.insert(structOffset);

  ffi_type* type = new ffi_type;
  type->type = FFI_TYPE_STRUCT;
  type->size = 0;
  type->alignment = 0;
  type->elements = nullptr;

  MDSectionOffset nameOffset = reader->getOffset(structOffset);
  auto name = reader->resolveString(nameOffset);
  bool next = true;
  MDSectionOffset currentOffset = structOffset + sizeof(MDSectionOffset);  // skip name
  currentOffset += sizeof(uint16_t);                                       // skip size

  std::vector<ffi_type*> elements;

  while (next) {
    nameOffset = reader->getOffset(currentOffset);
    next = nameOffset & mdSectionOffsetNext;
    nameOffset &= ~mdSectionOffsetNext;
    if (nameOffset == MD_SECTION_OFFSET_NULL) {
      break;
    }
    currentOffset += sizeof(MDSectionOffset);         // skip name
    if (!isUnion) currentOffset += sizeof(uint16_t);  // skip offset
    ffi_type* elementType = TypeConv::Make(env, reader, &currentOffset, 1)->type;
    elements.push_back(elementType);
  }

  type->elements = (ffi_type**)malloc(sizeof(ffi_type*) * (elements.size() + 1));
  for (int i = 0; i < elements.size(); i++) {
    type->elements[i] = elements[i];
  }
  // null-terminate the array
  type->elements[elements.size()] = nullptr;

  // If this was a forward declaration, update it with the real layout
  if (forwardIt != forwardDeclaredStructs.end()) {
    ffi_type* forwardType = forwardIt->second;
    forwardType->type = type->type;
    forwardType->size = type->size;
    forwardType->alignment = type->alignment;
    forwardType->elements = type->elements;

    // Clean up the temporary type and use the forward declaration
    delete type;
    type = forwardType;
    forwardDeclaredStructs.erase(forwardIt);
  }

  // Remove from processing set
  processingStructs.erase(structOffset);

  return type;
}

static inline size_t getTypedArrayUnitLength(napi_typedarray_type type) {
  switch (type) {
    case napi_int8_array:
    case napi_uint8_array:
    case napi_uint8_clamped_array:
      return 1;
    case napi_int16_array:
    case napi_uint16_array:
      return 2;
    case napi_int32_array:
    case napi_uint32_array:
    case napi_float32_array:
      return 4;
    case napi_float64_array:
    case napi_bigint64_array:
    case napi_biguint64_array:
      return 8;
    default:
      return 0;
  }
}

class VoidTypeConv : public TypeConv {
 public:
  VoidTypeConv() {
    type = &ffi_type_void;
    kind = mdTypeVoid;
  }

  napi_value toJS(napi_env env, void* value, uint32_t flags) override {
    napi_value result;
    napi_get_null(env, &result);
    return result;
  }

  void encode(std::string* encoding) override { *encoding += "v"; }
};

static const std::shared_ptr<VoidTypeConv> voidTypeConv = std::make_shared<VoidTypeConv>();

class SCharTypeConv : public TypeConv {
 public:
  SCharTypeConv() {
    type = &ffi_type_schar;
    kind = mdTypeChar;
  }

  napi_value toJS(napi_env env, void* value, uint32_t flags) override {
    int8_t raw = *(int8_t*)value;
    if (raw == 0 || raw == 1) {
      napi_value result;
      napi_get_boolean(env, raw == 1, &result);
      return result;
    }
    napi_value result;
    napi_create_int32(env, raw, &result);
    return result;
  }

  void toNative(napi_env env, napi_value value, void* result, bool* shouldFree,
                bool* shouldFreeAny) override {
    int32_t val;
    napi_coerce_to_number(env, value, &value);
    napi_get_value_int32(env, value, &val);
    *(int8_t*)result = val;
  }

  void encode(std::string* encoding) override { *encoding += "c"; }
};

static const std::shared_ptr<SCharTypeConv> scharTypeConv = std::make_shared<SCharTypeConv>();

class UCharTypeConv : public TypeConv {
 public:
  UCharTypeConv() {
    type = &ffi_type_uchar;
    kind = mdTypeUChar;
  }

  napi_value toJS(napi_env env, void* value, uint32_t flags) override {
    uint8_t raw = *(uint8_t*)value;
    if (raw == 0 || raw == 1) {
      napi_value result;
      napi_get_boolean(env, raw == 1, &result);
      return result;
    }
    napi_value result;
    napi_create_uint32(env, raw, &result);
    return result;
  }

  void toNative(napi_env env, napi_value value, void* result, bool* shouldFree,
                bool* shouldFreeAny) override {
    uint32_t val;
    napi_coerce_to_number(env, value, &value);
    napi_get_value_uint32(env, value, &val);
    *(uint8_t*)result = val;
  }

  void encode(std::string* encoding) override { *encoding += "C"; }
};

static const std::shared_ptr<UCharTypeConv> ucharTypeConv = std::make_shared<UCharTypeConv>();

class UInt8TypeConv : public TypeConv {
 public:
  UInt8TypeConv() {
    type = &ffi_type_uint8;
    kind = mdTypeUInt8;
  }

  napi_value toJS(napi_env env, void* value, uint32_t flags) override {
    uint8_t raw = *(uint8_t*)value;
    if (raw == 0 || raw == 1) {
      napi_value result;
      napi_get_boolean(env, raw == 1, &result);
      return result;
    }
    napi_value result;
    napi_create_uint32(env, raw, &result);
    return result;
  }

  void toNative(napi_env env, napi_value value, void* result, bool* shouldFree,
                bool* shouldFreeAny) override {
    uint32_t val;
    napi_coerce_to_number(env, value, &value);
    napi_get_value_uint32(env, value, &val);
    *(uint8_t*)result = val;
  }

  void encode(std::string* encoding) override { *encoding += "C"; }
};

static const std::shared_ptr<UInt8TypeConv> uint8TypeConv = std::make_shared<UInt8TypeConv>();

class SInt16TypeConv : public TypeConv {
 public:
  SInt16TypeConv() {
    type = &ffi_type_sshort;
    kind = mdTypeSShort;
  }

  napi_value toJS(napi_env env, void* value, uint32_t flags) override {
    napi_value result;
    napi_create_int32(env, *(int16_t*)value, &result);
    return result;
  }

  void toNative(napi_env env, napi_value value, void* result, bool* shouldFree,
                bool* shouldFreeAny) override {
    int32_t val;
    napi_coerce_to_number(env, value, &value);
    napi_get_value_int32(env, value, &val);
    *(int16_t*)result = val;
  }

  void encode(std::string* encoding) override { *encoding += "s"; }
};

static const std::shared_ptr<SInt16TypeConv> sint16TypeConv = std::make_shared<SInt16TypeConv>();

class UInt16TypeConv : public TypeConv {
 public:
  UInt16TypeConv() {
    type = &ffi_type_ushort;
    kind = mdTypeUShort;
  }

  napi_value toJS(napi_env env, void* value, uint32_t flags) override {
    uint16_t raw = *(uint16_t*)value;
    if (raw >= 32 && raw <= 126) {
      char buffer[2] = {static_cast<char>(raw), '\0'};
      napi_value result;
      napi_create_string_utf8(env, buffer, NAPI_AUTO_LENGTH, &result);
      return result;
    }

    napi_value result;
    napi_create_uint32(env, raw, &result);
    return result;
  }

  void toNative(napi_env env, napi_value value, void* result, bool* shouldFree,
                bool* shouldFreeAny) override {
    napi_valuetype valueType = napi_undefined;
    napi_typeof(env, value, &valueType);

    if (valueType == napi_string) {
      size_t strLen = 0;
      napi_get_value_string_utf16(env, value, nullptr, 0, &strLen);
      if (strLen != 1) {
        napi_throw_type_error(env, nullptr, "Expected a single-character string.");
        *(uint16_t*)result = 0;
        return;
      }

      char16_t chars[2] = {0, 0};
      napi_get_value_string_utf16(env, value, chars, 2, &strLen);
      *(uint16_t*)result = static_cast<uint16_t>(chars[0]);
      return;
    }

    uint32_t val = 0;
    napi_coerce_to_number(env, value, &value);
    napi_get_value_uint32(env, value, &val);
    *(uint16_t*)result = val;
  }

  void encode(std::string* encoding) override { *encoding += "S"; }
};

static const std::shared_ptr<UInt16TypeConv> uint16TypeConv = std::make_shared<UInt16TypeConv>();

class SInt32TypeConv : public TypeConv {
 public:
  SInt32TypeConv() {
    type = &ffi_type_sint;
    kind = mdTypeSInt;
  }

  napi_value toJS(napi_env env, void* value, uint32_t flags) override {
    napi_value result;
    napi_create_int32(env, *(int32_t*)value, &result);
    return result;
  }

  void toNative(napi_env env, napi_value value, void* result, bool* shouldFree,
                bool* shouldFreeAny) override {
    int32_t val;
    napi_coerce_to_number(env, value, &value);
    napi_get_value_int32(env, value, &val);
    *(int32_t*)result = val;
  }

  void encode(std::string* encoding) override { *encoding += "i"; }
};

static const std::shared_ptr<SInt32TypeConv> sint32TypeConv = std::make_shared<SInt32TypeConv>();

class UInt32TypeConv : public TypeConv {
 public:
  UInt32TypeConv() {
    type = &ffi_type_uint;
    kind = mdTypeUInt;
  }

  napi_value toJS(napi_env env, void* value, uint32_t flags) override {
    napi_value result;
    napi_create_uint32(env, *(uint32_t*)value, &result);
    return result;
  }

  void toNative(napi_env env, napi_value value, void* result, bool* shouldFree,
                bool* shouldFreeAny) override {
    uint32_t val;
    napi_coerce_to_number(env, value, &value);
    napi_get_value_uint32(env, value, &val);
    *(uint32_t*)result = val;
  }

  void encode(std::string* encoding) override { *encoding += "I"; }
};

static const std::shared_ptr<UInt32TypeConv> uint32TypeConv = std::make_shared<UInt32TypeConv>();

class SInt64TypeConv : public TypeConv {
 public:
  SInt64TypeConv() {
    type = &ffi_type_sint64;
    kind = mdTypeSInt64;
  }

  napi_value toJS(napi_env env, void* value, uint32_t flags) override {
    napi_value result;
    int64_t val = *(int64_t*)value;
    napi_create_int64(env, val, &result);
    return result;
  }

  void toNative(napi_env env, napi_value value, void* result, bool* shouldFree,
                bool* shouldFreeAny) override {
    napi_valuetype valuetype;
    napi_typeof(env, value, &valuetype);

    switch (valuetype) {
      case napi_number:
        napi_get_value_int64(env, value, (int64_t*)result);
        break;
      case napi_bigint: {
        bool lossless;
        napi_get_value_bigint_int64(env, value, (int64_t*)result, &lossless);
        break;
      }
      case napi_undefined:
      case napi_null:
        *(int64_t*)result = 0;
        break;
      case napi_string:
        *(int64_t*)result = 0;
        break;
      default:
        napi_throw_type_error(env, nullptr, "Expected a number or bigint");
        break;
    }
  }

  void encode(std::string* encoding) override { *encoding += "q"; }
};

static const std::shared_ptr<SInt64TypeConv> sint64TypeConv = std::make_shared<SInt64TypeConv>();

class UInt64TypeConv : public TypeConv {
 public:
  UInt64TypeConv() {
    type = &ffi_type_uint64;
    kind = mdTypeUInt64;
  }

  napi_value toJS(napi_env env, void* value, uint32_t flags) override {
    napi_value result;
    uint64_t val = *(uint64_t*)value;
    napi_create_int64(env, (int64_t)val, &result);
    return result;
  }

  void toNative(napi_env env, napi_value value, void* result, bool* shouldFree,
                bool* shouldFreeAny) override {
    napi_valuetype valuetype;
    napi_typeof(env, value, &valuetype);

    switch (valuetype) {
      case napi_number:
        napi_get_value_int64(env, value, (int64_t*)result);
        break;
      case napi_bigint: {
        bool lossless;
        napi_get_value_bigint_uint64(env, value, (uint64_t*)result, &lossless);
        break;
      }
      case napi_undefined:
      case napi_null:
        *(int64_t*)result = 0;
        break;
      default:
        napi_throw_type_error(env, nullptr, "Expected a number or bigint");
        break;
    }
  }

  void encode(std::string* encoding) override { *encoding += "Q"; }
};

static const std::shared_ptr<UInt64TypeConv> uint64TypeConv = std::make_shared<UInt64TypeConv>();

class UInt128TypeConv : public TypeConv {
 private:
  ffi_type _type = {.size = 0,
                    .alignment = 0,
                    .type = FFI_TYPE_STRUCT,
                    .elements = (ffi_type*[]){
                        &ffi_type_uint64,
                        &ffi_type_uint64,
                        nullptr,
                    }};

 public:
  UInt128TypeConv() {
    type = &_type;
    kind = mdTypeUInt128;
  }

  // TODO

  napi_value toJS(napi_env env, void* value, uint32_t flags) override {
    napi_value result;
    uint64_t val = *(uint64_t*)value;
    napi_create_int64(env, (int64_t)val, &result);
    return result;
  }

  void toNative(napi_env env, napi_value value, void* result, bool* shouldFree,
                bool* shouldFreeAny) override {
    napi_valuetype valuetype;
    napi_typeof(env, value, &valuetype);

    switch (valuetype) {
      case napi_number:
        napi_get_value_int64(env, value, (int64_t*)result);
        break;
      case napi_bigint: {
        bool lossless;
        napi_get_value_bigint_uint64(env, value, (uint64_t*)result, &lossless);
        break;
      }
      default:
        napi_throw_type_error(env, nullptr, "Expected a number or bigint");
        break;
    }
  }
};

static const std::shared_ptr<UInt128TypeConv> uint128TypeConv = std::make_shared<UInt128TypeConv>();

class Float32TypeConv : public TypeConv {
 public:
  Float32TypeConv() {
    type = &ffi_type_float;
    kind = mdTypeFloat;
  }

  napi_value toJS(napi_env env, void* value, uint32_t flags) override {
    napi_value result;
    napi_create_double(env, *(float*)value, &result);
    return result;
  }

  void toNative(napi_env env, napi_value value, void* result, bool* shouldFree,
                bool* shouldFreeAny) override {
    double val;
    napi_coerce_to_number(env, value, &value);
    napi_get_value_double(env, value, &val);
    *(float*)result = val;
  }

  void encode(std::string* encoding) override { *encoding += "f"; }
};

static const std::shared_ptr<Float32TypeConv> float32TypeConv = std::make_shared<Float32TypeConv>();

class Float64TypeConv : public TypeConv {
 public:
  Float64TypeConv() {
    type = &ffi_type_double;
    kind = mdTypeDouble;
  }

  napi_value toJS(napi_env env, void* value, uint32_t flags) override {
    napi_value result;
    napi_create_double(env, *(double*)value, &result);
    return result;
  }

  void toNative(napi_env env, napi_value value, void* result, bool* shouldFree,
                bool* shouldFreeAny) override {
    double val;
    napi_coerce_to_number(env, value, &value);
    napi_get_value_double(env, value, &val);
    if (std::isnan(val) || std::isinf(val)) {
      val = 0.0;
    }
    *(double*)result = val;
  }

  void encode(std::string* encoding) override { *encoding += "d"; }
};

static const std::shared_ptr<Float64TypeConv> float64TypeConv = std::make_shared<Float64TypeConv>();

class BoolTypeConv : public TypeConv {
 public:
  BoolTypeConv() {
    type = &ffi_type_uint8;
    kind = mdTypeBool;
  }

  napi_value toJS(napi_env env, void* value, uint32_t flags) override {
    napi_value result;
    napi_get_boolean(env, *(bool*)value, &result);
    return result;
  }

  void toNative(napi_env env, napi_value value, void* result, bool* shouldFree,
                bool* shouldFreeAny) override {
    bool val;
    napi_coerce_to_bool(env, value, &value);
    napi_get_value_bool(env, value, &val);
    *(bool*)result = val;
  }

  void encode(std::string* encoding) override { *encoding += "B"; }
};

static const std::shared_ptr<BoolTypeConv> boolTypeConv = std::make_shared<BoolTypeConv>();

class PointerTypeConv : public TypeConv {
 public:
  std::shared_ptr<TypeConv> pointeeType = nullptr;

  PointerTypeConv() {
    type = &ffi_type_pointer;
    kind = mdTypePointer;
  }

  PointerTypeConv(std::shared_ptr<TypeConv> pointeeType) : pointeeType(pointeeType) {
    type = &ffi_type_pointer;
    kind = mdTypePointer;
  }

  napi_value toJS(napi_env env, void* value, uint32_t flags) override {
    void* raw = *((void**)value);
    if (raw == nullptr) {
      napi_value nullValue;
      napi_get_null(env, &nullValue);
      return nullValue;
    }

    auto normalizePtr = [](void* ptr) -> uintptr_t {
#if INTPTR_MAX == INT64_MAX
      // Objective-C pointers may carry auth/tag bits on some runtimes.
      // Compare using canonical lower bits for stable lookups.
      return reinterpret_cast<uintptr_t>(ptr) & 0x0000FFFFFFFFFFFFULL;
#else
      return reinterpret_cast<uintptr_t>(ptr);
#endif
    };

    auto bridgeState = ObjCBridgeState::InstanceData(env);
    if (bridgeState != nullptr) {
      auto classIt = bridgeState->mdClassesByPointer.find((Class)raw);
      if (classIt != bridgeState->mdClassesByPointer.end()) {
        auto cls = bridgeState->getClass(env, classIt->second);
        if (cls != nullptr) {
          return get_ref_value(env, cls->constructor);
        }
      } else {
        const uintptr_t rawNormalized = normalizePtr(raw);
        for (const auto& entry : bridgeState->mdClassesByPointer) {
          if (normalizePtr((void*)entry.first) != rawNormalized) {
            continue;
          }

          auto cls = bridgeState->getClass(env, entry.second);
          if (cls != nullptr) {
            return get_ref_value(env, cls->constructor);
          }
        }
      }

      auto protocolIt = bridgeState->mdProtocolsByPointer.find((Protocol*)raw);
      if (protocolIt != bridgeState->mdProtocolsByPointer.end()) {
        auto proto = bridgeState->getProtocol(env, protocolIt->second);
        if (proto != nullptr) {
          return get_ref_value(env, proto->constructor);
        }
      } else {
        const uintptr_t rawNormalized = normalizePtr(raw);
        for (const auto& entry : bridgeState->mdProtocolsByPointer) {
          if (normalizePtr((void*)entry.first) != rawNormalized) {
            continue;
          }

          auto proto = bridgeState->getProtocol(env, entry.second);
          if (proto != nullptr) {
            return get_ref_value(env, proto->constructor);
          }
        }

        // Some protocol pointers come from compile-time @protocol() references
        // and don't always match objc_getProtocol() pointer identity.
        // Resolve them by scanning runtime protocol list and matching by address.
        unsigned int protocolCount = 0;
        Protocol** protocols = objc_copyProtocolList(&protocolCount);
        if (protocols != nullptr) {
          for (unsigned int i = 0; i < protocolCount; i++) {
            Protocol* runtimeProto = protocols[i];
            if (normalizePtr((void*)runtimeProto) != rawNormalized) {
              continue;
            }

            const char* runtimeName = protocol_getName(runtimeProto);
            MDSectionOffset metadataOffset =
                findProtocolMetadataOffset(bridgeState->metadata, runtimeName);
            if (metadataOffset != MD_SECTION_OFFSET_NULL) {
              bridgeState->mdProtocolsByPointer[runtimeProto] = metadataOffset;
              auto proto = bridgeState->getProtocol(env, metadataOffset);
              if (proto != nullptr) {
                ::free(protocols);
                return get_ref_value(env, proto->constructor);
              }
            }

            break;
          }
          ::free(protocols);
        }
      }
    }

    if (pointeeType != nullptr && pointeeType->kind == mdTypeStruct) {
      napi_value referenceValue = Reference::create(env, pointeeType, raw, false);
      if (referenceValue != nullptr) {
        return referenceValue;
      }
    }

    return Pointer::create(env, raw);
  }

  void toNative(napi_env env, napi_value value, void* result, bool* shouldFree,
                bool* shouldFreeAny) override {
    NAPI_PREAMBLE

    void** res = (void**)result;

    auto unwrapKnownNativeHandle = [&](napi_value input, void** out) -> bool {
      void* wrapped = nullptr;
      napi_status unwrapStatus = napi_unwrap(env, input, &wrapped);
      if (unwrapStatus != napi_ok) {
        return false;
      }

      auto bridgeState = ObjCBridgeState::InstanceData(env);
      if (bridgeState != nullptr) {
        for (const auto& entry : bridgeState->classes) {
          auto bridgedClass = entry.second;
          if (bridgedClass == wrapped) {
            *out = (void*)bridgedClass->nativeClass;
            return true;
          }
        }

        for (const auto& entry : bridgeState->protocols) {
          auto bridgedProtocol = entry.second;
          if (bridgedProtocol == wrapped) {
            *out = (void*)objc_getProtocol(bridgedProtocol->name.c_str());
            return true;
          }
        }
      }

      *out = wrapped;
      return true;
    };

    napi_valuetype type;
    napi_typeof(env, value, &type);

    switch (type) {
      case napi_null:
      case napi_undefined:
        *res = nullptr;
        return;

      case napi_bigint: {
        uint64_t val = 0;
        bool lossless = false;
        NAPI_GUARD(napi_get_value_bigint_uint64(env, value, &val, &lossless)) {
          NAPI_THROW_LAST_ERROR
          *res = nullptr;
          return;
        }
        *res = (void*)val;
        return;
      }

      case napi_string: {
        size_t len = 0;
        NAPI_GUARD(napi_get_value_string_utf8(env, value, nullptr, len, &len)) {
          NAPI_THROW_LAST_ERROR
          return;
        }

        char* str = (char*)malloc(len + 1);

        NAPI_GUARD(napi_get_value_string_utf8(env, value, str, len + 1, &len)) {
          NAPI_THROW_LAST_ERROR
          ::free(str);
          return;
        }

        str[len] = '\0';

        bool shouldCreateCFString = pointeeType != nullptr &&
                                    (pointeeType->kind == mdTypeNSStringObject ||
                                     pointeeType->kind == mdTypeNSMutableStringObject);

        if (shouldCreateCFString) {
          CFStringRef cfStr =
              CFStringCreateWithCString(kCFAllocatorDefault, str, kCFStringEncodingUTF8);
          ::free(str);
          *res = (void*)cfStr;
          *shouldFree = true;
          *shouldFreeAny = true;
        } else {
          *res = (void*)str;
          *shouldFree = true;
          *shouldFreeAny = true;
        }
        return;
      }

      case napi_external: {
        NAPI_GUARD(napi_get_value_external(env, value, res)) {
          NAPI_THROW_LAST_ERROR
          *res = nullptr;
          return;
        }
        return;
      }

      case napi_object: {
        if (Pointer::isInstance(env, value)) {
          Pointer* ptr = Pointer::unwrap(env, value);
          *res = ptr->data;
          return;
        }

        if (Reference::isInstance(env, value)) {
          Reference* ref = Reference::unwrap(env, value);
          if (ref->data == nullptr) {
            ref->type = pointeeType;
            ref->data = malloc(pointeeType->type->size);
            ref->ownsData = true;
            if (ref->initValue) {
              napi_value initValue = get_ref_value(env, ref->initValue);
              bool shouldFree;
              ref->type->toNative(env, initValue, ref->data, &shouldFree, &shouldFree);
              napi_delete_reference(env, ref->initValue);
              ref->initValue = nullptr;
            }
          }
          *res = ref->data;
          return;
        }

        if (StructObject::isInstance(env, value)) {
          StructObject* structObj = StructObject::unwrap(env, value);
          if (structObj != nullptr) {
            *res = structObj->data;
          } else
            *res = nullptr;
          return;
        }

        if (unwrapKnownNativeHandle(value, res)) {
          return;
        }

        bool isTypedArray = false;
        napi_is_typedarray(env, value, &isTypedArray);
        if (isTypedArray) {
          void* data;
          size_t length = 0;
          napi_typedarray_type type;
          NAPI_GUARD(
              napi_get_typedarray_info(env, value, &type, &length, &data, nullptr, nullptr)) {
            NAPI_THROW_LAST_ERROR
            *res = nullptr;
            return;
          }

          *res = data;
          return;
        }

        bool isArrayBuffer = false;
        napi_is_arraybuffer(env, value, &isArrayBuffer);
        if (isArrayBuffer) {
          void* data = nullptr;
          size_t byteLength = 0;
          napi_get_arraybuffer_info(env, value, &data, &byteLength);
          *res = data;
          return;
        }
        break;
      }

      case napi_function: {
        if (unwrapKnownNativeHandle(value, res)) {
          return;
        }
        break;
      }

      default:
        napi_throw_error(env, nullptr, "Invalid pointer type");
        *res = nullptr;
        return;
    }

    napi_throw_error(env, nullptr, "Invalid pointer type");
    *res = nullptr;
  }

  void free(napi_env env, void* value) override {
    if (value == nullptr) {
      return;
    }

    bool isCFString = pointeeType != nullptr &&
                      (pointeeType->kind == mdTypeNSStringObject ||
                       pointeeType->kind == mdTypeNSMutableStringObject);

    if (isCFString) {
      CFRelease((CFStringRef)value);
    } else {
      ::free(value);
    }
  }

  void encode(std::string* encoding) override { *encoding += "^v"; }
};

static const std::shared_ptr<PointerTypeConv> pointerTypeConv = std::make_shared<PointerTypeConv>();

class BlockTypeConv : public TypeConv {
 public:
  MDSectionOffset signatureOffset;

  BlockTypeConv(MDSectionOffset signatureOffset) : signatureOffset(signatureOffset) {
    type = &ffi_type_pointer;
    kind = mdTypeBlock;
  }

  napi_value toJS(napi_env env, void* value, uint32_t flags) override {
    void* fn = *((void**)value);
    if (fn == nullptr) {
      napi_value nullValue;
      napi_get_null(env, &nullValue);
      return nullValue;
    }
    return FunctionPointer::wrap(env, fn, signatureOffset, true);
  }

  void toNative(napi_env env, napi_value value, void* result, bool* shouldFree,
                bool* shouldFreeAny) override {
    NAPI_PREAMBLE

    void** res = (void**)result;

    napi_valuetype type;
    napi_typeof(env, value, &type);

    switch (type) {
      case napi_null:
      case napi_undefined:
        *res = nullptr;
        return;

      case napi_bigint: {
        uint64_t val = 0;
        bool lossless = false;
        NAPI_GUARD(napi_get_value_bigint_uint64(env, value, &val, &lossless)) {
          NAPI_THROW_LAST_ERROR
          *res = nullptr;
          return;
        }
        *res = (void*)val;
        return;
      }

      case napi_external: {
        NAPI_GUARD(napi_get_value_external(env, value, res)) {
          NAPI_THROW_LAST_ERROR
          *res = nullptr;
          return;
        }
        return;
      }

      case napi_object: {
        NAPI_GUARD(napi_unwrap(env, value, res)) {
          NAPI_THROW_LAST_ERROR
          *res = nullptr;
          return;
        }
        return;
      }

      case napi_function: {
        if (FunctionReference::isInstance(env, value)) {
          FunctionReference* ref = FunctionReference::unwrap(env, value);
          if (ref == nullptr) {
            napi_throw_error(env, nullptr, "Invalid FunctionReference");
            *res = nullptr;
            return;
          }
          *res = ref->getFunctionPointer(signatureOffset, true);
          return;
        }

        void* wrapped;
        status = napi_unwrap(env, value, &wrapped);
        if (status == napi_ok) {
          *res = wrapped;
          return;
        }

        auto bridgeState = ObjCBridgeState::InstanceData(env);
        auto closure = new Closure(bridgeState->metadata, signatureOffset, true);
        closure->env = env;
        id block = registerBlock(env, closure, value);
        *res = (void*)block;
        *shouldFree = true;
        *shouldFreeAny = true;
        return;
      }

      default:
        napi_throw_error(env, nullptr, "Invalid block pointer type");
        *res = nullptr;
        return;
    }
  }

  void free(napi_env env, void* value) override {
    if (value != nullptr) {
      [(id)value release];
    }
  }

  void encode(std::string* encoding) override { *encoding += "^v"; }
};

void function_pointer_finalize(napi_env env, void* finalize_data, void* finalize_hint) {
  Closure* closure = static_cast<Closure*>(finalize_hint);
  if (closure != nullptr) {
    delete closure;
  }
}

class FunctionPointerTypeConv : public TypeConv {
 public:
  MDSectionOffset signatureOffset;

  FunctionPointerTypeConv(MDSectionOffset signatureOffset) : signatureOffset(signatureOffset) {
    type = &ffi_type_pointer;
    kind = mdTypeFunctionPointer;
  }

  napi_value toJS(napi_env env, void* value, uint32_t flags) override {
    void* fn = *((void**)value);
    if (fn == nullptr) {
      napi_value nullValue;
      napi_get_null(env, &nullValue);
      return nullValue;
    }
    return FunctionPointer::wrap(env, fn, signatureOffset, false);
  }

  void toNative(napi_env env, napi_value value, void* result, bool* shouldFree,
                bool* shouldFreeAny) override {
    NAPI_PREAMBLE

    void** res = (void**)result;

    napi_valuetype type;
    napi_typeof(env, value, &type);

    switch (type) {
      case napi_null:
      case napi_undefined:
        *res = nullptr;
        return;

      case napi_bigint: {
        uint64_t val = 0;
        bool lossless = false;
        NAPI_GUARD(napi_get_value_bigint_uint64(env, value, &val, &lossless)) {
          NAPI_THROW_LAST_ERROR
          *res = nullptr;
          return;
        }
        *res = (void*)val;
        return;
      }

      case napi_external: {
        NAPI_GUARD(napi_get_value_external(env, value, res)) {
          NAPI_THROW_LAST_ERROR
          *res = nullptr;
          return;
        }
        return;
      }

      case napi_object: {
        if (Pointer::isInstance(env, value)) {
          Pointer* ptr = Pointer::unwrap(env, value);
          *res = ptr->data;
        } else if (Reference::isInstance(env, value)) {
          Reference* ref = Reference::unwrap(env, value);
          *res = ref->data;
        } else if (FunctionReference::isInstance(env, value)) {
          FunctionReference* ref = FunctionReference::unwrap(env, value);
          if (ref == nullptr) {
            napi_throw_error(env, nullptr, "Invalid FunctionReference");
            *res = nullptr;
            return;
          }
          *res = ref->getFunctionPointer(signatureOffset, false);
        } else {
          napi_throw_error(env, nullptr, "Invalid function pointer object");
          *res = nullptr;
        }
        return;
      }

      case napi_function: {
        if (FunctionReference::isInstance(env, value)) {
          FunctionReference* ref = FunctionReference::unwrap(env, value);
          if (ref == nullptr) {
            napi_throw_error(env, nullptr, "Invalid FunctionReference");
            *res = nullptr;
            return;
          }
          *res = ref->getFunctionPointer(signatureOffset, false);
          return;
        }

        void* wrapped;
        status = napi_unwrap(env, value, &wrapped);
        if (status == napi_ok) {
          *res = wrapped;
          return;
        }

        auto bridgeState = ObjCBridgeState::InstanceData(env);
        auto closure = new Closure(bridgeState->metadata, signatureOffset, false);
        closure->env = env;
        closure->func = make_ref(env, value);
        napi_remove_wrap(env, value, nullptr);
        napi_ref ref;
        napi_wrap(env, value, closure->fnptr, function_pointer_finalize, closure, &ref);
        *res = (void*)closure->fnptr;
        return;
      }

      default:
        napi_throw_error(env, nullptr, "Invalid block pointer type");
        *res = nullptr;
        return;
    }
  }

  void encode(std::string* encoding) override { *encoding += "^v"; }
};

class StringTypeConv : public TypeConv {
 public:
  StringTypeConv() {
    type = &ffi_type_pointer;
    kind = mdTypeString;
  }

  napi_value toJS(napi_env env, void* cont, uint32_t flags) override {
    void* value = *((void**)cont);
    if (value == nullptr) {
      napi_value null;
      napi_get_null(env, &null);
      return null;
    }
    napi_value result;
    napi_create_string_utf8(env, (char*)value, NAPI_AUTO_LENGTH, &result);
    return result;
  }

  void toNative(napi_env env, napi_value value, void* result, bool* shouldFree,
                bool* shouldFreeAny) override {
    NAPI_PREAMBLE

    napi_valuetype valuetype;
    napi_typeof(env, value, &valuetype);

    if (valuetype == napi_null || valuetype == napi_undefined) {
      *(char**)result = nullptr;
      *shouldFree = false;
      *shouldFreeAny = false;
      return;
    }

    if (valuetype == napi_object) {
      if (Pointer::isInstance(env, value)) {
        Pointer* ptr = Pointer::unwrap(env, value);
        *(char**)result = (char*)ptr->data;
        *shouldFree = false;
        *shouldFreeAny = false;
        return;
      }

      if (Reference::isInstance(env, value)) {
        Reference* ref = Reference::unwrap(env, value);
        *(char**)result = (char*)ref->data;
        *shouldFree = false;
        *shouldFreeAny = false;
        return;
      }

      *(char**)result = nullptr;
      *shouldFree = false;
      *shouldFreeAny = false;
      return;
    }

    char** res = (char**)result;

    *res = nullptr;
    size_t len = 0;

    NAPI_GUARD(napi_get_value_string_utf8(env, value, nullptr, len, &len)) {
      NAPI_THROW_LAST_ERROR
      return;
    }

    *res = (char*)malloc(len + 1);

    NAPI_GUARD(napi_get_value_string_utf8(env, value, *res, len + 1, &len)) {
      NAPI_THROW_LAST_ERROR
      ::free(*res);
      return;
    }

    (*res)[len] = '\0';

    *shouldFree = true;
    *shouldFreeAny = true;
  }

  void free(napi_env env, void* value) override { ::free(value); }

  void encode(std::string* encoding) override { *encoding += "*"; }
};

static const std::shared_ptr<StringTypeConv> stringTypeConv = std::make_shared<StringTypeConv>();

class ObjCObjectTypeConv : public TypeConv {
 public:
  MDSectionOffset classOffset = 0;
  std::vector<MDSectionOffset> protocolOffsets;

  ObjCObjectTypeConv() {
    type = &ffi_type_pointer;
    kind = mdTypeAnyObject;
  }

  ObjCObjectTypeConv(MDSectionOffset classOffset, std::vector<MDSectionOffset> protocolOffsets)
      : classOffset(classOffset), protocolOffsets(protocolOffsets) {
    type = &ffi_type_pointer;
    if (classOffset != 0) {
      kind = mdTypeClassObject;
    } else {
      kind = protocolOffsets.empty() ? mdTypeAnyObject : mdTypeProtocolObject;
    }
  }

  ObjCObjectTypeConv(std::vector<MDSectionOffset> protocolOffsets)
      : protocolOffsets(protocolOffsets) {
    type = &ffi_type_pointer;
    kind = protocolOffsets.empty() ? mdTypeAnyObject : mdTypeProtocolObject;
  }

  napi_value toJS(napi_env env, void* value, uint32_t flags) override {
    id obj = *((id*)value);
    if (obj == nil) {
      napi_value null;
      napi_get_null(env, &null);
      return null;
    }

    // Always unbox NSNull and CFBoolean/NSNumber values (except NSDecimalNumber),
    // so primitive round-trips match historical runtime behavior.
    if ([obj isKindOfClass:[NSNull class]]) {
      napi_value null;
      napi_get_null(env, &null);
      return null;
    }

    if ([obj isKindOfClass:[NSNumber class]] &&
        ![obj isKindOfClass:[NSDecimalNumber class]]) {
      if (CFGetTypeID((CFTypeRef)obj) == CFBooleanGetTypeID()) {
        napi_value result;
        napi_get_boolean(env, [obj boolValue], &result);
        return result;
      }

      napi_value result;
      napi_create_double(env, [obj doubleValue], &result);
      return result;
    }

    // Auto-unbox plain id string values.
    const bool isUntypedObject = classOffset == 0 && protocolOffsets.empty();
    if (isUntypedObject && [obj isKindOfClass:[NSString class]]) {
      NSUInteger length = [obj length];
      std::vector<char16_t> chars(length > 0 ? length : 1);
      if (length > 0) {
        [((NSString*)obj) getCharacters:(unichar*)chars.data() range:NSMakeRange(0, length)];
      }
      napi_value result;
      napi_create_string_utf16(env, length > 0 ? chars.data() : nullptr, length, &result);
      return result;
    }

    auto bridgeState = ObjCBridgeState::InstanceData(env);
    auto existing = bridgeState->objectRefs.find(obj);
    if (existing != bridgeState->objectRefs.end()) {
      return get_ref_value(env, existing->second);
    }

    ObjectOwnership ownership;
    if ((flags & kReturnOwned) != 0) {
      ownership = kOwnedObject;
    } else {
      ownership = kUnownedObject;
    }

    auto object = bridgeState->getObject(env, obj, ownership, classOffset, &protocolOffsets);
    if (object == nullptr) {
      napi_value null;
      napi_get_null(env, &null);
      return null;
    }

    return object;
  }

  void toNative(napi_env env, napi_value value, void* result, bool* shouldFree,
                bool* shouldFreeAny) override {
    NAPI_PREAMBLE

    id* res = (id*)result;

    napi_valuetype type;
    napi_typeof(env, value, &type);

    switch (type) {
      case napi_null:
      case napi_undefined:
        *res = nil;
        return;

      case napi_string: {
        size_t len = 0;
        NAPI_GUARD(napi_get_value_string_utf8(env, value, nullptr, 0, &len)) {
          NAPI_THROW_LAST_ERROR
          return;
        }

        std::vector<char> chars(len + 1);
        NAPI_GUARD(napi_get_value_string_utf8(env, value, chars.data(), len + 1, &len)) {
          NAPI_THROW_LAST_ERROR
          return;
        }

        *res = [[[NSString alloc] initWithBytes:chars.data()
                                         length:len
                                       encoding:NSUTF8StringEncoding] autorelease];
        if (*res == nil) {
          *res = [NSString string];
        }
        break;
      }

      case napi_number: {
        double val = 0;
        NAPI_GUARD(napi_get_value_double(env, value, &val)) {
          NAPI_THROW_LAST_ERROR
          return;
        }
        *res = [NSNumber numberWithDouble:val];
        break;
      }

      case napi_boolean: {
        bool val = false;
        NAPI_GUARD(napi_get_value_bool(env, value, &val)) {
          NAPI_THROW_LAST_ERROR
          return;
        }
        *res = [NSNumber numberWithBool:val];
        break;
      }

      case napi_bigint: {
        int64_t val = 0;
        bool lossless = false;
        NAPI_GUARD(napi_get_value_bigint_int64(env, value, &val, &lossless)) {
          NAPI_THROW_LAST_ERROR
          return;
        }
        *res = [NSNumber numberWithLongLong:val];
        break;
      }

      case napi_external:
        NAPI_GUARD(napi_get_value_external(env, value, (void**)res)) {
          NAPI_THROW_LAST_ERROR
          *res = nil;
          return;
        }
        break;

      case napi_object:
      case napi_function: {
        auto bridgeState = ObjCBridgeState::InstanceData(env);
        auto cacheRoundTrip = [&](id nativeObj) {
          if (nativeObj == nil) {
            return;
          }
          if (bridgeState->objectRefs.find(nativeObj) == bridgeState->objectRefs.end()) {
            bridgeState->objectRefs[nativeObj] = make_ref(env, value);
          }
        };

        if (Pointer::isInstance(env, value)) {
          Pointer* ptr = Pointer::unwrap(env, value);
          *res = (id)ptr->data;
          return;
        }

        if (Reference::isInstance(env, value)) {
          Reference* ref = Reference::unwrap(env, value);
          *res = (id)ref->data;
          return;
        }

        status = napi_unwrap(env, value, (void**)res);

        if (status != napi_ok) {
          bool isArrayBuffer = false;
          napi_is_arraybuffer(env, value, &isArrayBuffer);
          if (isArrayBuffer) {
            void* data = nullptr;
            size_t byteLength = 0;
            napi_get_arraybuffer_info(env, value, &data, &byteLength);
            *res = [NSData dataWithBytes:data length:byteLength];
            cacheRoundTrip(*res);
            return;
          }

          bool isTypedArray = false;
          napi_is_typedarray(env, value, &isTypedArray);
          if (isTypedArray) {
            napi_typedarray_type typedArrayType;
            size_t elementLength = 0;
            void* data = nullptr;
            napi_value arrayBuffer;
            size_t byteOffset = 0;
            napi_get_typedarray_info(env, value, &typedArrayType, &elementLength, &data,
                                     &arrayBuffer, &byteOffset);
            size_t byteLength = elementLength * getTypedArrayUnitLength(typedArrayType);
            *res = [NSData dataWithBytes:data length:byteLength];
            cacheRoundTrip(*res);
            return;
          }

          bool isDataView = false;
          napi_is_dataview(env, value, &isDataView);
          if (isDataView) {
            size_t byteLength = 0;
            void* data = nullptr;
            napi_value arrayBuffer;
            size_t byteOffset = 0;
            napi_get_dataview_info(env, value, &byteLength, &data, &arrayBuffer, &byteOffset);
            *res = [NSData dataWithBytes:data length:byteLength];
            cacheRoundTrip(*res);
            return;
          }

          bool isArray = false;
          napi_is_array(env, value, &isArray);
          if (isArray) {
            uint32_t len = 0;
            napi_get_array_length(env, value, &len);
            *res = [NSMutableArray arrayWithCapacity:len];

            for (uint32_t i = 0; i < len; i++) {
              napi_value elem;
              napi_get_element(env, value, i, &elem);
              id obj = nil;
              toNative(env, elem, (void*)&obj, shouldFree, shouldFreeAny);
              [(*res) addObject:obj != nil ? obj : [NSNull null]];
            }

            cacheRoundTrip(*res);
            return;
          } else {
            napi_value global, jsObject, valueConstructor, DateConstructor, MapConstructor;
            napi_value StringConstructor, NumberConstructor, BooleanConstructor;
            napi_get_global(env, &global);
            napi_get_named_property(env, global, "Object", &jsObject);
            napi_get_named_property(env, global, "Date", &DateConstructor);
            napi_get_named_property(env, global, "Map", &MapConstructor);
            napi_get_named_property(env, global, "String", &StringConstructor);
            napi_get_named_property(env, global, "Number", &NumberConstructor);
            napi_get_named_property(env, global, "Boolean", &BooleanConstructor);
            napi_get_named_property(env, value, "constructor", &valueConstructor);
            bool isEqual;
            napi_strict_equals(env, jsObject, valueConstructor, &isEqual);
            bool isDate;
            napi_strict_equals(env, DateConstructor, valueConstructor, &isDate);
            bool isMap;
            napi_strict_equals(env, MapConstructor, valueConstructor, &isMap);
            bool isStringObject = false;
            bool isNumberObject = false;
            bool isBooleanObject = false;
            napi_strict_equals(env, StringConstructor, valueConstructor, &isStringObject);
            napi_strict_equals(env, NumberConstructor, valueConstructor, &isNumberObject);
            napi_strict_equals(env, BooleanConstructor, valueConstructor, &isBooleanObject);

            if (isStringObject || isNumberObject || isBooleanObject) {
              napi_value valueOfMethod;
              napi_get_named_property(env, value, "valueOf", &valueOfMethod);
              napi_value primitiveValue;
              napi_call_function(env, value, valueOfMethod, 0, nullptr, &primitiveValue);
              toNative(env, primitiveValue, result, shouldFree, shouldFreeAny);
              return;
            }

            if (isDate) {
              // Get the timestamp from the JavaScript Date object
              napi_value getTimeMethod;
              napi_get_named_property(env, value, "getTime", &getTimeMethod);
              napi_value timestamp;
              napi_call_function(env, value, getTimeMethod, 0, nullptr, &timestamp);

              double timeInMilliseconds;
              napi_get_value_double(env, timestamp, &timeInMilliseconds);

              // Convert milliseconds to seconds for NSDate
              NSTimeInterval timeInSeconds = timeInMilliseconds / 1000.0;
              *res = [NSDate dateWithTimeIntervalSince1970:timeInSeconds];
              cacheRoundTrip(*res);
              return;
            }

            if (isMap) {
              *res = [NSMutableDictionary dictionary];

              napi_value entriesMethod;
              napi_get_named_property(env, value, "entries", &entriesMethod);
              napi_value iterator;
              napi_call_function(env, value, entriesMethod, 0, nullptr, &iterator);

              napi_value nextMethod;
              napi_get_named_property(env, iterator, "next", &nextMethod);

              while (true) {
                napi_value step;
                napi_call_function(env, iterator, nextMethod, 0, nullptr, &step);

                napi_value doneValue;
                napi_get_named_property(env, step, "done", &doneValue);
                bool done = false;
                napi_get_value_bool(env, doneValue, &done);
                if (done) {
                  break;
                }

                napi_value tuple;
                napi_get_named_property(env, step, "value", &tuple);
                napi_value keyValue;
                napi_value elementValue;
                napi_get_element(env, tuple, 0, &keyValue);
                napi_get_element(env, tuple, 1, &elementValue);

                id keyObject = nil;
                id valueObject = nil;
                toNative(env, keyValue, (void*)&keyObject, shouldFree, shouldFreeAny);
                toNative(env, elementValue, (void*)&valueObject, shouldFree, shouldFreeAny);

                if (keyObject != nil && valueObject != nil) {
                  [(*res) setObject:valueObject forKey:keyObject];
                }
              }

              cacheRoundTrip(*res);
              return;
            }

            if (!isEqual) {
              *res = jsObjectToId(env, value);
              return;
            }

            bool hasLength = false;
            napi_has_named_property(env, value, "length", &hasLength);
            if (hasLength) {
              napi_value lengthValue;
              napi_get_named_property(env, value, "length", &lengthValue);
              napi_valuetype lengthType = napi_undefined;
              napi_typeof(env, lengthValue, &lengthType);
              if (lengthType == napi_number) {
                uint32_t len = 0;
                napi_get_value_uint32(env, lengthValue, &len);
                *res = [NSMutableArray arrayWithCapacity:len];
                for (uint32_t i = 0; i < len; i++) {
                  bool hasElement = false;
                  napi_has_element(env, value, i, &hasElement);
                  if (!hasElement) {
                    [(*res) addObject:[NSNull null]];
                    continue;
                  }
                  napi_value elem;
                  napi_get_element(env, value, i, &elem);
                  id obj = nil;
                  toNative(env, elem, (void*)&obj, shouldFree, shouldFreeAny);
                  [(*res) addObject:obj != nil ? obj : [NSNull null]];
                }
                cacheRoundTrip(*res);
                return;
              }
            }

            *res = [NSMutableDictionary dictionary];
            napi_value keys;
            napi_get_property_names(env, value, &keys);
            uint32_t len = 0;
            napi_get_array_length(env, keys, &len);

            for (uint32_t i = 0; i < len; i++) {
              napi_value key;
              napi_get_element(env, keys, i, &key);
              char buf[256];
              size_t len = 0;
              napi_get_value_string_utf8(env, key, buf, 256, &len);
              id obj = nil;
              napi_value elem;
              napi_get_property(env, value, key, &elem);
              toNative(env, elem, (void*)&obj, shouldFree, shouldFreeAny);
              if (obj != nil) [(*res) setObject:obj forKey:[NSString stringWithUTF8String:buf]];
            }

            cacheRoundTrip(*res);
            return;
          }
        }

        break;
      }

      default:
        napi_throw_error(env, nullptr, "Invalid object type");
        *res = nil;
        break;
    }
  }

  void free(napi_env env, void* value) override {
    id obj = *((id*)value);
    auto bridgeState = ObjCBridgeState::InstanceData(env);
    bridgeState->unregisterObject(obj);
  }

  void encode(std::string* encoding) override { *encoding += "@"; }
};

static const std::shared_ptr<ObjCObjectTypeConv> objcObjectTypeConv =
    std::make_shared<ObjCObjectTypeConv>();

class ObjCInstanceObjectTypeConv : public ObjCObjectTypeConv {
 public:
  ObjCInstanceObjectTypeConv() {
    type = &ffi_type_pointer;
    kind = mdTypeInstanceObject;
  }
};

static const auto objcInstanceObjectTypeConv = std::make_shared<ObjCInstanceObjectTypeConv>();

class ObjCNSStringObjectTypeConv : public TypeConv {
 public:
  ObjCNSStringObjectTypeConv() {
    type = &ffi_type_pointer;
    kind = mdTypeNSStringObject;
  }

  napi_value toJS(napi_env env, void* value, uint32_t flags) override {
    NSString* str = *((NSString**)value);

    if (str == nullptr) {
      napi_value null;
      napi_get_null(env, &null);
      return null;
    }

    NSUInteger length = [str length];
    std::vector<char16_t> chars(length > 0 ? length : 1);
    if (length > 0) {
      [str getCharacters:(unichar*)chars.data() range:NSMakeRange(0, length)];
    }
    napi_value result;
    napi_create_string_utf16(env, length > 0 ? chars.data() : nullptr, length, &result);
    return result;
  }

  void toNative(napi_env env, napi_value value, void* result, bool* shouldFree,
                bool* shouldFreeAny) override {
    ObjCObjectTypeConv typeConv;
    typeConv.toNative(env, value, result, shouldFree, shouldFreeAny);
  }

  void encode(std::string* encoding) override { *encoding += "@"; }
};

static const std::shared_ptr<ObjCNSStringObjectTypeConv> objcNSStringObjectTypeConv =
    std::make_shared<ObjCNSStringObjectTypeConv>();

class ObjCNSMutableStringObjectTypeConv : public TypeConv {
 public:
  ObjCNSMutableStringObjectTypeConv() {
    type = &ffi_type_pointer;
    kind = mdTypeNSMutableStringObject;
  }

  napi_value toJS(napi_env env, void* value, uint32_t flags) override {
    NSMutableString* str = *((NSMutableString**)value);

    if (str == nullptr) {
      napi_value null;
      napi_get_null(env, &null);
      return null;
    }

    auto bridgeState = ObjCBridgeState::InstanceData(env);
    auto existing = bridgeState->objectRefs.find(str);
    if (existing != bridgeState->objectRefs.end()) {
      return get_ref_value(env, existing->second);
    }

    ObjectOwnership ownership = (flags & kReturnOwned) != 0 ? kOwnedObject : kUnownedObject;
    return bridgeState->getObject(env, str, ownership);
  }

  void toNative(napi_env env, napi_value value, void* result, bool* shouldFree,
                bool* shouldFreeAny) override {
    NAPI_PREAMBLE

    napi_valuetype type;
    napi_typeof(env, value, &type);
    if (type == napi_string) {
      NSMutableString** res = (NSMutableString**)result;

      size_t len = 0;
      NAPI_GUARD(napi_get_value_string_utf16(env, value, nullptr, len, &len)) {
        NAPI_THROW_LAST_ERROR
        return;
      }

      std::vector<char16_t> chars(len + 1);

      NAPI_GUARD(napi_get_value_string_utf16(env, value, chars.data(), len + 1, &len)) {
        NAPI_THROW_LAST_ERROR
        return;
      }

      *res = [[NSMutableString alloc] initWithCharacters:(unichar*)chars.data() length:len];
      return;
    }

    ObjCObjectTypeConv typeConv;
    typeConv.toNative(env, value, result, shouldFree, shouldFreeAny);
  }

  void encode(std::string* encoding) override { *encoding += "@"; }
};

static const std::shared_ptr<ObjCNSMutableStringObjectTypeConv> objcNSMutableStringObjectTypeConv =
    std::make_shared<ObjCNSMutableStringObjectTypeConv>();

class ObjCClassTypeConv : public TypeConv {
 public:
  ObjCClassTypeConv() {
    type = &ffi_type_pointer;
    kind = mdTypeClass;
  }

  napi_value toJS(napi_env env, void* value, uint32_t flags) override {
    Class cls = *((Class*)value);

    if (cls == nullptr) {
      napi_value null;
      napi_get_null(env, &null);
      return null;
    }

    auto bridgeState = ObjCBridgeState::InstanceData(env);

    ObjCClass* bridgedCls = bridgeState->classesByPointer[cls];

    if (bridgedCls == nullptr) {
      napi_value null;
      napi_get_null(env, &null);
      return null;
    }

    napi_value constructor = get_ref_value(env, bridgedCls->constructor);

    return constructor;
  }

  void toNative(napi_env env, napi_value value, void* result, bool* shouldFree,
                bool* shouldFreeAny) override {
    ObjCObjectTypeConv typeConv;
    typeConv.toNative(env, value, result, shouldFree, shouldFreeAny);
  }

  void encode(std::string* encoding) override { *encoding += "#"; }
};

static const std::shared_ptr<ObjCClassTypeConv> objcClassTypeConv =
    std::make_shared<ObjCClassTypeConv>();

char selector_name_buf[256];

class SelectorTypeConv : public TypeConv {
 public:
  SelectorTypeConv() {
    type = &ffi_type_pointer;
    kind = mdTypeSelector;
  }

  napi_value toJS(napi_env env, void* value, uint32_t flags) override {
    napi_value result;
    SEL val = *((SEL*)value);
    napi_create_string_utf8(env, sel_getName(val), NAPI_AUTO_LENGTH, &result);
    return result;
  }

  void toNative(napi_env env, napi_value value, void* result, bool* shouldFree,
                bool* shouldFreeAny) override {
    NAPI_PREAMBLE

    SEL* res = (SEL*)result;

    napi_valuetype type;
    napi_typeof(env, value, &type);

    switch (type) {
      case napi_string:
        NAPI_GUARD(napi_get_value_string_utf8(env, value, selector_name_buf, 256, NULL)) {
          NAPI_THROW_LAST_ERROR
          *res = NULL;
          return;
        }
        *res = sel_registerName(selector_name_buf);
        break;

      case napi_undefined:
      case napi_null:
        *res = NULL;
        return;

      default:
        napi_throw_error(env, nullptr, "Invalid selector type");
        *res = NULL;
        return;
    }
  }

  void encode(std::string* encoding) override { *encoding += ":"; }
};

static const std::shared_ptr<SelectorTypeConv> selectorTypeConv =
    std::make_shared<SelectorTypeConv>();

class StructTypeConv : public TypeConv {
 public:
  MDSectionOffset structOffset;
  StructInfo* info = nullptr;
  bool structInfoSearched = false;

  StructTypeConv(MDSectionOffset structOffset, ffi_type* type) : structOffset(structOffset) {
    this->type = type;
    kind = mdTypeStruct;
  }

  // ~StructTypeConv() { delete type; }

  inline StructInfo* getInfo(napi_env env) {
    if (!structInfoSearched) {
      auto bridgeState = ObjCBridgeState::InstanceData(env);
      info = bridgeState->getStructInfo(env, structOffset);
      structInfoSearched = true;
    }

    return info;
  }

  napi_value toJS(napi_env env, void* value, uint32_t flags) override {
    auto info = getInfo(env);

    if (info == nullptr) {
      napi_value result;
      void* data;
      napi_create_arraybuffer(env, type->size, &data, &result);
      memcpy(data, value, type->size);
      return result;
    } else {
      return StructObject::fromNative(env, info, value, (flags & kStructZeroCopy) == 0);
    }
  }

  void toNative(napi_env env, napi_value value, void* result, bool* shouldFree,
                bool* shouldFreeAny) override {
    NAPI_PREAMBLE

    bool isTypedArray = false;
    napi_is_typedarray(env, value, &isTypedArray);

    if (isTypedArray) {
      void* data;
      size_t length = 0;
      napi_typedarray_type type;
      NAPI_GUARD(napi_get_typedarray_info(env, value, &type, &length, &data, nullptr, nullptr)) {
        NAPI_THROW_LAST_ERROR
        return;
      }

      memcpy(result, data, length * getTypedArrayUnitLength(type));

      return;
    }

    napi_valuetype type;
    napi_typeof(env, value, &type);

    if (type == napi_null || type == napi_undefined) {
      auto info = getInfo(env);

      if (info == nullptr) {
        napi_throw_type_error(env, "TypeError",
                              "Invalid struct type, must be Struct Object, "
                              "Struct Object Descriptor or TypedArray");
        return;
      }

      memset(result, 0, info->size);
      return;
    } else if (type != napi_object) {
      napi_throw_type_error(env, "TypeError",
                            "Invalid struct type, must be Struct Object, "
                            "Struct Object Descriptor or TypedArray");
      return;
    }

    auto structObject = StructObject::unwrap(env, value);
    if (structObject != nullptr) {
      memcpy(result, structObject->data, structObject->info->size);
      return;
    }

    auto info = getInfo(env);

    if (info == nullptr) {
      napi_throw_type_error(env, "TypeError",
                            "Invalid struct type, must be Struct Object or TypedArray");
      return;
    }

    // Serialize directly to previously allocated memory
    StructObject(env, info, value, result);
  }
};

class ArrayTypeConv : public TypeConv {
 public:
  int arraySize;
  std::shared_ptr<TypeConv> elementType;

  ArrayTypeConv(int arraySize, std::shared_ptr<TypeConv> elementType)
      : arraySize(arraySize), elementType(elementType) {
    auto arrayType = new ffi_type();
    arrayType->type = FFI_TYPE_STRUCT;
    arrayType->size = 0;
    arrayType->alignment = 0;
    arrayType->elements = (ffi_type**)malloc(sizeof(ffi_type*) * (arraySize + 1));
    for (int i = 0; i < arraySize; i++) {
      arrayType->elements[i] = elementType->type;
    }
    arrayType->elements[arraySize] = nullptr;
    type = arrayType;
    kind = mdTypeArray;
  }

  napi_value toJS(napi_env env, void* value, uint32_t flags) override {
    napi_value result;
    napi_create_array_with_length(env, arraySize, &result);

    size_t elementSize = elementType != nullptr && elementType->type != nullptr
                             ? elementType->type->size
                             : 0;
    if (elementSize == 0) {
      elementSize = sizeof(void*);
    }

    auto base = static_cast<uint8_t*>(value);
    for (int i = 0; i < arraySize; i++) {
      void* slot = base + (i * elementSize);
      napi_value elementValue = elementType->toJS(env, slot, flags);
      napi_valuetype elementValueType = napi_undefined;
      napi_typeof(env, elementValue, &elementValueType);
      if (elementValueType == napi_boolean) {
        bool boolValue = false;
        napi_get_value_bool(env, elementValue, &boolValue);
        napi_create_uint32(env, boolValue ? 1 : 0, &elementValue);
      }
      napi_set_element(env, result, i, elementValue);
    }
    return result;
  }

  void toNative(napi_env env, napi_value value, void* result, bool* shouldFree,
                bool* shouldFreeAny) override {
    NAPI_PREAMBLE

    size_t elementSize = elementType != nullptr && elementType->type != nullptr
                             ? elementType->type->size
                             : 0;
    if (elementSize == 0) {
      elementSize = sizeof(void*);
    }
    size_t arrayByteSize = elementSize * static_cast<size_t>(arraySize);
    memset(result, 0, arrayByteSize);

    if (Pointer::isInstance(env, value)) {
      Pointer* ptr = Pointer::unwrap(env, value);
      memcpy(result, ptr->data, arrayByteSize);
      return;
    }

    bool isArray = false;
    napi_is_array(env, value, &isArray);
    if (isArray) {
      for (int i = 0; i < arraySize; i++) {
        bool hasElement = false;
        napi_has_element(env, value, i, &hasElement);
        if (!hasElement) {
          continue;
        }

        napi_value elementValue;
        napi_get_element(env, value, i, &elementValue);
        void* slot = static_cast<uint8_t*>(result) + (i * elementSize);
        elementType->toNative(env, elementValue, slot, shouldFree, shouldFreeAny);
      }
      return;
    }

    bool isArrayBuffer = false;
    napi_is_arraybuffer(env, value, &isArrayBuffer);
    if (isArrayBuffer) {
      void* data = nullptr;
      size_t byteLength = 0;
      napi_get_arraybuffer_info(env, value, &data, &byteLength);
      memcpy(result, data, std::min(byteLength, arrayByteSize));
      return;
    }

    void* data;
    size_t length = 0;
    napi_typedarray_type typedArrayType;
    NAPI_GUARD(
        napi_get_typedarray_info(env, value, &typedArrayType, &length, &data, nullptr, nullptr)) {
      NAPI_THROW_LAST_ERROR
      return;
    }

    size_t copyLength = length * getTypedArrayUnitLength(typedArrayType);
    memcpy(result, data, std::min(copyLength, arrayByteSize));
  }

  void encode(std::string* encoding) override {
    *encoding += "[";
    *encoding += std::to_string(arraySize);
    elementType->encode(encoding);
    *encoding += "]";
  }
};

class VectorTypeConv : public TypeConv {
 public:
  // TypeConv elementType;

  VectorTypeConv() {
    // TODO
    type = &ffi_type_pointer;
    kind = mdTypeVector;
  }

  napi_value toJS(napi_env env, void* value, uint32_t flags) override {
    NSLog(@"VectorTypeConv toJS: TODO");
    napi_value result;
    napi_get_null(env, &result);
    return result;
  }

  void toNative(napi_env env, napi_value value, void* result, bool* shouldFree,
                bool* shouldFreeAny) override {
    NSLog(@"VectorTypeConv toNative: TODO");
  }
};

std::shared_ptr<TypeConv> TypeConv::Make(napi_env env, const char** encoding) {
  char first = **encoding;
  bool readonly = false;
  if (first == 'r') {
    readonly = true;
    first = *(++(*encoding));
  }

  switch (first) {
    case 'c':
      (*encoding)++;
      return scharTypeConv;
    case 'i':
      (*encoding)++;
      return sint32TypeConv;
    case 's':
      (*encoding)++;
      return sint16TypeConv;
    case 'l':
    case 'q':
      (*encoding)++;
      return sint64TypeConv;
    case 'C':
      (*encoding)++;
      return uint8TypeConv;
    case 'I':
      (*encoding)++;
      return uint32TypeConv;
    case 'S':
      (*encoding)++;
      return uint16TypeConv;
    case 'L':
    case 'Q':
      (*encoding)++;
      return uint64TypeConv;
    case 'f':
      (*encoding)++;
      return float32TypeConv;
    case 'd':
      (*encoding)++;
      return float64TypeConv;
    case 'B':
      (*encoding)++;
      return boolTypeConv;
    case 'v':
      (*encoding)++;
      return voidTypeConv;
    case '*':
      (*encoding)++;
      return stringTypeConv;
    case '@':
      (*encoding)++;
      return objcObjectTypeConv;
    case '#':
      (*encoding)++;
      return objcClassTypeConv;
    case ':':
      (*encoding)++;
      return selectorTypeConv;
    case '[': {
      char c = **encoding;
      std::string num;
      while ((c = **encoding) >= '0' && c <= '9') {
        num += c;
        (*encoding)++;
      }
      auto arraySize = std::stoi(num);
      auto elementType = TypeConv::Make(env, encoding);
      while (**encoding != ']') {
        (*encoding)++;
      }  // skip array type
      (*encoding)++;  // skip ']'
      return std::make_shared<ArrayTypeConv>(ArrayTypeConv(arraySize, elementType));
    }
    case '{': {
      std::string structname;
      const char* c = *encoding + 1;
      while (*c != '=') {
        structname += *c;
        c++;
      }

      // Check if we already have a cached StructTypeConv for this encoding-based struct
      auto cacheIt = encodingStructCache.find(structname);
      if (cacheIt != encodingStructCache.end()) {
        return cacheIt->second;
      }

      auto bridgeState = ObjCBridgeState::InstanceData(env);
      // NSLog(@"struct: %s, %d", structname.c_str(),
      //       bridgeState->structOffsets[structname]);
      auto structOffset = bridgeState->structOffsets[structname];
      auto type = typeFromStruct(env, encoding);
      auto structTypeConv = std::make_shared<StructTypeConv>(StructTypeConv(structOffset, type));

      // Cache the StructTypeConv
      encodingStructCache[structname] = structTypeConv;

      return structTypeConv;
    }
    case 'b': {
      (*encoding)++;
      char c = **encoding;
      while ((c = **encoding) >= '0' && c <= '9') {
        (*encoding)++;
      }  // skip bits
      return uint64TypeConv;
    }
    case '^':
      (*encoding)++;
      TypeConv::Make(env, encoding);
      return pointerTypeConv;
    case '?':
      // unknown type
      return pointerTypeConv;
    default:
      std::cout << "getTypeInfo unknown encoding: " << *encoding << std::endl;
      return pointerTypeConv;
  }
}

std::shared_ptr<TypeConv> TypeConv::Make(napi_env env, MDMetadataReader* reader,
                                         MDSectionOffset* offset, uint8_t opaquePointers) {
  auto kind = reader->getTypeKind(*offset);
  bool next = (MDTypeFlag)kind & mdTypeFlagNext;
  kind = (MDTypeKind)((kind & ~mdTypeFlagNext) & ~mdTypeFlagVariadic);
  *offset += sizeof(MDTypeKind);

  switch (kind) {
    case mdTypeChar: {
      return scharTypeConv;
    }

    case mdTypeSInt: {
      return sint32TypeConv;
    }

    case mdTypeSShort: {
      return sint16TypeConv;
    }

    case mdTypeSLong:
    case mdTypeSInt64: {
      return sint64TypeConv;
    }

    case mdTypeUInt8: {
      return uint8TypeConv;
    }

    case mdTypeUChar: {
      return ucharTypeConv;
    }

    case mdTypeUInt: {
      return uint32TypeConv;
    }

    case mdTypeUShort: {
      return uint16TypeConv;
    }

    case mdTypeULong:
    case mdTypeUInt64: {
      return uint64TypeConv;
    }

    case mdTypeFloat: {
      return float32TypeConv;
    }

    case mdTypeDouble: {
      return float64TypeConv;
    }

    case mdTypeBool: {
      return boolTypeConv;
    }

    case mdTypeVoid: {
      return voidTypeConv;
    }

    case mdTypeString: {
      return stringTypeConv;
    }

    case mdTypeAnyObject: {
      return objcObjectTypeConv;
    }

    case mdTypeInstanceObject: {
      return objcInstanceObjectTypeConv;
    }

    case mdTypeClassObject: {
      auto classOffset = reader->getOffset(*offset);
      *offset += sizeof(MDSectionOffset);
      bool next = (classOffset & mdSectionOffsetNext) != 0;
      classOffset &= ~mdSectionOffsetNext;
      if (classOffset == MD_SECTION_OFFSET_NULL) {
        classOffset = 0;
      } else {
        classOffset += reader->classesOffset;
      }
      std::vector<MDSectionOffset> protocolOffsets;
      while (next) {
        auto protocolOffset = reader->getOffset(*offset);
        *offset += sizeof(MDSectionOffset);
        next = (protocolOffset & mdSectionOffsetNext) != 0;
        protocolOffset &= ~mdSectionOffsetNext;
        if (protocolOffset == MD_SECTION_OFFSET_NULL) {
          protocolOffset = 0;
        } else {
          protocolOffset += reader->protocolsOffset;
          protocolOffsets.push_back(protocolOffset);
        }
      }
      return std::make_shared<ObjCObjectTypeConv>(classOffset, protocolOffsets);
    }

    case mdTypeProtocolObject: {
      std::vector<MDSectionOffset> protocolOffsets;
      bool next = true;
      while (next) {
        auto protocolOffset = reader->getOffset(*offset);
        *offset += sizeof(MDSectionOffset);
        next = (protocolOffset & mdSectionOffsetNext) != 0;
        protocolOffset &= ~mdSectionOffsetNext;
        if (protocolOffset == MD_SECTION_OFFSET_NULL) {
          protocolOffset = 0;
        } else {
          protocolOffset += reader->protocolsOffset;
          protocolOffsets.push_back(protocolOffset);
        }
      }
      return std::make_shared<ObjCObjectTypeConv>(protocolOffsets);
    }

    case mdTypeNSStringObject: {
      return objcNSStringObjectTypeConv;
    }

    case mdTypeNSMutableStringObject: {
      return objcNSMutableStringObjectTypeConv;
    }

    case mdTypeClass: {
      return objcClassTypeConv;
    }

    case mdTypeSelector: {
      return selectorTypeConv;
    }

    case mdTypeArray: {
      auto arraySize = reader->getArraySize(*offset);
      *offset += sizeof(uint16_t);
      auto elementType = TypeConv::Make(env, reader, offset);
      return std::make_shared<ArrayTypeConv>(ArrayTypeConv(arraySize, elementType));
    }

    case mdTypeStruct: {
      auto structOffset = reader->getOffset(*offset);
      *offset += sizeof(MDSectionOffset);
      auto isUnion = (structOffset & mdSectionOffsetNext) != 0;
      structOffset &= ~mdSectionOffsetNext;
      if (structOffset == MD_SECTION_OFFSET_NULL) {
        return pointerTypeConv;
      }
      structOffset += isUnion ? reader->unionsOffset : reader->structsOffset;
      auto structName = reader->getString(structOffset);

      // Check if we already have a cached StructTypeConv for this struct
      auto cacheIt = structTypeCache.find(structOffset);
      if (cacheIt != structTypeCache.end()) {
        return cacheIt->second;
      }

      // Check if we're currently processing this struct (recursion detection)
      bool isRecursive = processingStructs.find(structOffset) != processingStructs.end();

      ffi_type* type = nullptr;
      if (opaquePointers != 2 && !isRecursive) {
        type = typeFromStruct(env, reader, structOffset, isUnion);
      }

      auto structTypeConv = std::make_shared<StructTypeConv>(structOffset, type);

      // Cache the StructTypeConv to handle recursion and avoid duplicates
      structTypeCache[structOffset] = structTypeConv;

      return structTypeConv;
    }

    case mdTypePointer: {
      auto pointeeType = TypeConv::Make(env, reader, offset, opaquePointers == 1 ? 2 : 0);
      return std::make_shared<PointerTypeConv>(pointeeType);
    }

    case mdTypeOpaquePointer: {
      return pointerTypeConv;
    }

    case mdTypeVector: {
      // TODO
      return std::make_shared<VectorTypeConv>();
    }

    case mdTypeBlock: {
      auto blockSignature = reader->getOffset(*offset) + reader->signaturesOffset;
      *offset += sizeof(MDSectionOffset);
      return std::make_shared<BlockTypeConv>(blockSignature);
    }

    case mdTypeFunctionPointer: {
      auto blockSignature = reader->getOffset(*offset) + reader->signaturesOffset;
      *offset += sizeof(MDSectionOffset);
      return std::make_shared<FunctionPointerTypeConv>(blockSignature);
    }

    case mdTypeUInt128: {
      return uint128TypeConv;
    }

    case mdTypeExtVector: {
      // TODO
      return std::make_shared<VectorTypeConv>();
    }

    case mdTypeComplex: {
      // TODO
      return std::make_shared<VectorTypeConv>();
    }

    default:
      std::cout << "getTypeInfo unknown type kind: " << (int)kind << std::endl;
      return pointerTypeConv;
  }
}

// Cleanup function to clear thread-local caches
void clearStructTypeCaches() {
  processingStructs.clear();
  processingEncodingStructs.clear();
  forwardDeclaredStructs.clear();
  forwardDeclaredEncodingStructs.clear();
  structTypeCache.clear();
  encodingStructCache.clear();
}

}  // namespace nativescript

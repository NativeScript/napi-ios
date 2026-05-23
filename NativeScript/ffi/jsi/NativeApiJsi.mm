#include "NativeApiJsi.h"

#ifdef TARGET_ENGINE_HERMES

#import <Foundation/Foundation.h>
#include <dispatch/dispatch.h>
#include <dlfcn.h>
#include <mach-o/dyld.h>
#include <mach-o/getsect.h>
#include <objc/message.h>
#include <objc/runtime.h>

#include <algorithm>
#include <atomic>
#include <cctype>
#include <cmath>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <limits>
#include <memory>
#include <mutex>
#include <optional>
#include <stdexcept>
#include <string>
#include <thread>
#include <unordered_map>
#include <unordered_set>
#include <vector>

#include "ffi.h"
#include "Metadata.h"
#include "MetadataReader.h"

#ifdef EMBED_METADATA_SIZE
extern const unsigned char embedded_metadata[EMBED_METADATA_SIZE];
#endif

namespace nativescript {
namespace {

using facebook::jsi::Array;
using facebook::jsi::ArrayBuffer;
using facebook::jsi::Function;
using facebook::jsi::HostObject;
using facebook::jsi::MutableBuffer;
using facebook::jsi::Object;
using facebook::jsi::PropNameID;
using facebook::jsi::Runtime;
using facebook::jsi::String;
using facebook::jsi::Value;
using metagen::MDMemberFlag;
using metagen::MDMetadataReader;
using metagen::MDSectionOffset;
using metagen::MDTypeKind;

thread_local bool gDispatchNativeCallsToUI = false;
thread_local bool gExecutingDispatchedUINativeCall = false;
std::atomic<int> gSynchronousNativeInvocationDepth{0};

class ScopedNativeApiUINativeCallDispatch final {
 public:
  ScopedNativeApiUINativeCallDispatch()
      : previous_(gDispatchNativeCallsToUI) {
    gDispatchNativeCallsToUI = true;
  }

  ~ScopedNativeApiUINativeCallDispatch() {
    gDispatchNativeCallsToUI = previous_;
  }

 private:
  bool previous_ = false;
};

bool shouldDispatchNativeCallToUI() {
  return gDispatchNativeCallsToUI && ![NSThread isMainThread];
}

class ScopedNativeApiSynchronousInvocation final {
 public:
  ScopedNativeApiSynchronousInvocation() {
    gSynchronousNativeInvocationDepth.fetch_add(1, std::memory_order_acq_rel);
  }

  ~ScopedNativeApiSynchronousInvocation() {
    gSynchronousNativeInvocationDepth.fetch_sub(1, std::memory_order_acq_rel);
  }
};

template <typename Invocation>
void performNativeInvocation(Runtime& runtime, Invocation&& invocation) {
  NSString* exceptionDescription = nil;
  auto run = [&]() {
    ScopedNativeApiSynchronousInvocation synchronousInvocation;
    @try {
      invocation();
    } @catch (NSException* exception) {
      exceptionDescription = [exception.description copy];
    }
  };

  if (shouldDispatchNativeCallToUI()) {
    dispatch_sync(dispatch_get_main_queue(), ^{
      bool previous = gExecutingDispatchedUINativeCall;
      gExecutingDispatchedUINativeCall = true;
      run();
      gExecutingDispatchedUINativeCall = previous;
    });
  } else {
    run();
  }

  if (exceptionDescription != nil) {
    std::string message = exceptionDescription.UTF8String ?: "";
    [exceptionDescription release];
    throw facebook::jsi::JSError(runtime, message);
  }
}

enum class NativeApiSymbolKind {
  Class,
  Function,
  Constant,
  Protocol,
  Enum,
  Struct,
  Union,
};

struct NativeApiSymbol {
  NativeApiSymbolKind kind;
  MDSectionOffset offset = 0;
  MDSectionOffset superclassOffset = MD_SECTION_OFFSET_NULL;
  std::string name;
  std::string runtimeName;
};

struct NativeApiMember {
  std::string name;
  std::string selectorName;
  std::string setterSelectorName;
  MDSectionOffset signatureOffset = MD_SECTION_OFFSET_NULL;
  MDSectionOffset setterSignatureOffset = MD_SECTION_OFFSET_NULL;
  MDMemberFlag flags = metagen::mdMemberFlagNull;
  bool property = false;
  bool readonly = false;
};

struct NativeApiJsiAggregateInfo;

struct NativeApiJsiFfiType {
  ffi_type type = {};
  std::vector<ffi_type*> elements;

  NativeApiJsiFfiType() {
    type.type = FFI_TYPE_STRUCT;
    type.size = 0;
    type.alignment = 0;
    type.elements = nullptr;
  }

  void finalize() {
    elements.push_back(nullptr);
    type.elements = elements.data();
  }
};

struct NativeApiJsiType {
  MDTypeKind kind = metagen::mdTypeVoid;
  ffi_type* ffiType = &ffi_type_void;
  bool supported = true;
  bool returnOwned = false;
  MDSectionOffset signatureOffset = MD_SECTION_OFFSET_NULL;
  MDSectionOffset aggregateOffset = MD_SECTION_OFFSET_NULL;
  bool aggregateIsUnion = false;
  uint16_t arraySize = 0;
  std::shared_ptr<NativeApiJsiType> elementType;
  std::shared_ptr<NativeApiJsiAggregateInfo> aggregateInfo;
  std::shared_ptr<NativeApiJsiFfiType> ownedFfiType;
};

struct NativeApiJsiAggregateField {
  std::string name;
  uint16_t offset = 0;
  NativeApiJsiType type;
};

struct NativeApiJsiAggregateInfo {
  std::string name;
  uint16_t size = 0;
  bool isUnion = false;
  MDSectionOffset offset = MD_SECTION_OFFSET_NULL;
  std::vector<NativeApiJsiAggregateField> fields;
  std::shared_ptr<NativeApiJsiFfiType> ffi;
};

std::string jsifySelector(const char* selector) {
  std::string jsifiedSelector;
  bool nextUpper = false;
  for (const char* c = selector; c != nullptr && *c != '\0'; c++) {
    if (*c == ':') {
      nextUpper = true;
    } else if (nextUpper) {
      jsifiedSelector += static_cast<char>(toupper(*c));
      nextUpper = false;
    } else {
      jsifiedSelector += *c;
    }
  }
  return jsifiedSelector;
}

std::string setterSelectorForProperty(const std::string& property) {
  if (property.empty()) {
    return property;
  }

  std::string selector = "set";
  selector += static_cast<char>(toupper(property[0]));
  selector += property.substr(1);
  selector += ":";
  return selector;
}

void skipMetadataJsiType(MDMetadataReader* metadata, MDSectionOffset* offset);

class NativeApiJsiBridge {
 public:
  explicit NativeApiJsiBridge(const NativeApiJsiConfig& config)
      : metadata_(loadMetadata(config)), scheduler_(config.scheduler) {
    selfDl_ = dlopen(nullptr, RTLD_NOW);
    buildSymbolIndexes();
  }

  ~NativeApiJsiBridge() {
    if (selfDl_ != nullptr) {
      dlclose(selfDl_);
    }
  }

  MDMetadataReader* metadata() const { return metadata_.get(); }

  void* selfDl() const { return selfDl_; }

  const NativeApiSymbol* find(const std::string& name) const {
    auto it = symbolsByName_.find(name);
    return it != symbolsByName_.end() ? &it->second : nullptr;
  }

  const NativeApiSymbol* findClass(const std::string& name) const {
    const NativeApiSymbol* symbol = find(name);
    if (symbol != nullptr && symbol->kind == NativeApiSymbolKind::Class) {
      return symbol;
    }
    auto it = classSymbolsByRuntimeName_.find(name);
    return it != classSymbolsByRuntimeName_.end() ? &it->second : nullptr;
  }

  const NativeApiSymbol* findFunction(const std::string& name) const {
    const NativeApiSymbol* symbol = find(name);
    return symbol != nullptr && symbol->kind == NativeApiSymbolKind::Function
               ? symbol
               : nullptr;
  }

  const NativeApiSymbol* findConstant(const std::string& name) const {
    const NativeApiSymbol* symbol = find(name);
    return symbol != nullptr && symbol->kind == NativeApiSymbolKind::Constant
               ? symbol
               : nullptr;
  }

  const NativeApiSymbol* findProtocol(const std::string& name) const {
    const NativeApiSymbol* symbol = find(name);
    return symbol != nullptr && symbol->kind == NativeApiSymbolKind::Protocol
               ? symbol
               : nullptr;
  }

  const NativeApiSymbol* findEnum(const std::string& name) const {
    const NativeApiSymbol* symbol = find(name);
    return symbol != nullptr && symbol->kind == NativeApiSymbolKind::Enum
               ? symbol
               : nullptr;
  }

  const NativeApiSymbol* findStruct(const std::string& name) const {
    const NativeApiSymbol* symbol = find(name);
    return symbol != nullptr && symbol->kind == NativeApiSymbolKind::Struct
               ? symbol
               : nullptr;
  }

  const NativeApiSymbol* findUnion(const std::string& name) const {
    const NativeApiSymbol* symbol = find(name);
    return symbol != nullptr && symbol->kind == NativeApiSymbolKind::Union
               ? symbol
               : nullptr;
  }

  const NativeApiSymbol* findAggregate(const std::string& name) const {
    const NativeApiSymbol* symbol = findStruct(name);
    if (symbol != nullptr) {
      return symbol;
    }
    return findUnion(name);
  }

  size_t classCount() const { return classNames_.size(); }
  size_t functionCount() const { return functionNames_.size(); }
  size_t constantCount() const { return constantNames_.size(); }
  size_t protocolCount() const { return protocolNames_.size(); }
  size_t enumCount() const { return enumNames_.size(); }
  size_t structCount() const { return structNames_.size(); }
  size_t unionCount() const { return unionNames_.size(); }

  const std::vector<std::string>& classNames() const { return classNames_; }
  const std::vector<std::string>& functionNames() const { return functionNames_; }
  const std::vector<std::string>& constantNames() const { return constantNames_; }
  const std::vector<std::string>& protocolNames() const { return protocolNames_; }
  const std::vector<std::string>& enumNames() const { return enumNames_; }
  const std::vector<std::string>& structNames() const { return structNames_; }
  const std::vector<std::string>& unionNames() const { return unionNames_; }
  std::shared_ptr<NativeApiJsiScheduler> scheduler() const { return scheduler_; }
  std::thread::id jsThreadId() const { return jsThreadId_; }

  void retainJsiLifetime(std::shared_ptr<void> lifetime) {
    if (lifetime == nullptr) {
      return;
    }
    std::lock_guard<std::mutex> lock(retainedLifetimesMutex_);
    retainedLifetimes_.push_back(std::move(lifetime));
  }

  const std::vector<NativeApiMember>& membersForClass(
      const NativeApiSymbol& symbol) const {
    auto cached = membersByClassOffset_.find(symbol.offset);
    if (cached != membersByClassOffset_.end()) {
      return cached->second;
    }

    auto inserted = membersByClassOffset_.emplace(
        symbol.offset, readMembersForClassHierarchy(symbol));
    return inserted.first->second;
  }

  std::shared_ptr<NativeApiJsiAggregateInfo> aggregateInfoFor(
      MDSectionOffset aggregateOffset, bool isUnion);

  std::shared_ptr<NativeApiJsiAggregateInfo> aggregateInfoFor(
      const NativeApiSymbol& symbol) {
    return aggregateInfoFor(symbol.offset,
                            symbol.kind == NativeApiSymbolKind::Union);
  }

 private:
  static std::unique_ptr<MDMetadataReader> loadMetadataFromFile(
      const char* metadataPath) {
    const char* path = metadataPath != nullptr ? metadataPath : "metadata.nsmd";
    FILE* file = fopen(path, "rb");
    if (file == nullptr) {
      throw std::runtime_error(std::string("metadata.nsmd not found: ") + path);
    }

    fseek(file, 0, SEEK_END);
    long size = ftell(file);
    fseek(file, 0, SEEK_SET);
    if (size <= 0) {
      fclose(file);
      throw std::runtime_error(std::string("metadata.nsmd is empty: ") + path);
    }

    void* buffer = malloc(static_cast<size_t>(size));
    if (buffer == nullptr) {
      fclose(file);
      throw std::bad_alloc();
    }

    size_t read = fread(buffer, 1, static_cast<size_t>(size), file);
    fclose(file);
    if (read != static_cast<size_t>(size)) {
      free(buffer);
      throw std::runtime_error(std::string("failed to read metadata: ") + path);
    }

    return std::make_unique<MDMetadataReader>(buffer, true);
  }

  static std::unique_ptr<MDMetadataReader> loadMetadata(
      const NativeApiJsiConfig& config) {
    if (config.metadataPtr != nullptr &&
        *static_cast<const char*>(config.metadataPtr) != '\0') {
#ifdef EMBED_METADATA_SIZE
      return std::make_unique<MDMetadataReader>((void*)embedded_metadata);
#else
      return std::make_unique<MDMetadataReader>(
          const_cast<void*>(config.metadataPtr));
#endif
    }

#ifdef EMBED_METADATA_SIZE
    if (config.metadataPath == nullptr) {
      return std::make_unique<MDMetadataReader>((void*)embedded_metadata);
    }
#endif

    unsigned long segmentSize = 0;
    auto segmentData = getsegmentdata(
        reinterpret_cast<const mach_header_64*>(_dyld_get_image_header(0)),
        "__objc_metadata", &segmentSize);
    if (segmentData != nullptr && segmentSize > 0) {
      return std::make_unique<MDMetadataReader>(segmentData);
    }

    return loadMetadataFromFile(config.metadataPath);
  }

  void addSymbol(NativeApiSymbolKind kind, MDSectionOffset offset,
                 const char* name, const char* runtimeName = nullptr,
                 MDSectionOffset superclassOffset = MD_SECTION_OFFSET_NULL) {
    if (name == nullptr || name[0] == '\0') {
      return;
    }

    NativeApiSymbol symbol{
        .kind = kind,
        .offset = offset,
        .superclassOffset = superclassOffset,
        .name = name,
        .runtimeName = runtimeName != nullptr ? runtimeName : name,
    };

    switch (kind) {
      case NativeApiSymbolKind::Class:
        classNames_.push_back(symbol.name);
        break;
      case NativeApiSymbolKind::Function:
        functionNames_.push_back(symbol.name);
        break;
      case NativeApiSymbolKind::Constant:
        constantNames_.push_back(symbol.name);
        break;
      case NativeApiSymbolKind::Protocol:
        protocolNames_.push_back(symbol.name);
        break;
      case NativeApiSymbolKind::Enum:
        enumNames_.push_back(symbol.name);
        break;
      case NativeApiSymbolKind::Struct:
        structNames_.push_back(symbol.name);
        break;
      case NativeApiSymbolKind::Union:
        unionNames_.push_back(symbol.name);
        break;
    }

    symbolsByName_[symbol.name] = symbol;
    if (kind == NativeApiSymbolKind::Class) {
      classSymbolsByOffset_[symbol.offset] = symbol;
      classSymbolsByRuntimeName_[symbol.runtimeName] = std::move(symbol);
    } else if (kind == NativeApiSymbolKind::Struct) {
      structSymbolsByOffset_[symbol.offset] = symbol;
    } else if (kind == NativeApiSymbolKind::Union) {
      unionSymbolsByOffset_[symbol.offset] = symbol;
    }
  }

  void addAggregateAliases(NativeApiSymbolKind kind, MDSectionOffset offset,
                           const std::string& name) {
    if (name.empty()) {
      return;
    }

    if (!name.empty() && name[0] == '_') {
      std::string alias = name.substr(1);
      if (!alias.empty() && symbolsByName_.find(alias) == symbolsByName_.end()) {
        addSymbol(kind, offset, alias.c_str(), name.c_str());
      }
    }

    constexpr const char* suffix = "Struct";
    if (name.size() < std::strlen(suffix) ||
        name.compare(name.size() - std::strlen(suffix), std::strlen(suffix),
                     suffix) != 0) {
      std::string alias = name + suffix;
      if (symbolsByName_.find(alias) == symbolsByName_.end()) {
        addSymbol(kind, offset, alias.c_str(), name.c_str());
      }
    }
  }

  void buildSymbolIndexes() {
    if (metadata_ == nullptr) {
      return;
    }

    indexConstants();
    indexEnums();
    indexFunctions();
    indexProtocols();
    indexClasses();
    indexStructs();
    indexUnions();
  }

  static void skipConstantValue(MDMetadataReader* metadata,
                                MDSectionOffset& offset,
                                metagen::MDVariableEvalKind evalKind) {
    switch (evalKind) {
      case metagen::mdEvalNone:
        skipMetadataJsiType(metadata, &offset);
        break;
      case metagen::mdEvalInt64:
        offset += sizeof(int64_t);
        break;
      case metagen::mdEvalDouble:
        offset += sizeof(double);
        break;
      case metagen::mdEvalString:
        offset += sizeof(MDSectionOffset);
        break;
    }
  }

  void indexConstants() {
    MDSectionOffset offset = metadata_->constantsOffset;
    while (offset < metadata_->enumsOffset) {
      MDSectionOffset originalOffset = offset;
      addSymbol(NativeApiSymbolKind::Constant, originalOffset,
                metadata_->getString(offset));
      offset += sizeof(MDSectionOffset);
      auto evalKind = metadata_->getVariableEvalKind(offset);
      offset += sizeof(metagen::MDVariableEvalKind);
      skipConstantValue(metadata_.get(), offset, evalKind);
    }
  }

  void indexEnums() {
    MDSectionOffset offset = metadata_->enumsOffset;
    while (offset < metadata_->signaturesOffset) {
      MDSectionOffset originalOffset = offset;
      addSymbol(NativeApiSymbolKind::Enum, originalOffset,
                metadata_->getString(offset));
      offset += sizeof(MDSectionOffset);

      bool next = true;
      while (next) {
        auto nameOffset = metadata_->getOffset(offset);
        next = (nameOffset & metagen::mdSectionOffsetNext) != 0;
        offset += sizeof(MDSectionOffset);
        offset += sizeof(int64_t);
      }
    }
  }

  void indexFunctions() {
    MDSectionOffset offset = metadata_->functionsOffset;
    while (offset < metadata_->protocolsOffset) {
      MDSectionOffset originalOffset = offset;
      addSymbol(NativeApiSymbolKind::Function, originalOffset,
                metadata_->getString(offset));
      offset += sizeof(MDSectionOffset);
      offset += sizeof(MDSectionOffset);
      offset += sizeof(metagen::MDFunctionFlag);
    }
  }

  void indexProtocols() {
    MDSectionOffset offset = metadata_->protocolsOffset;
    while (offset < metadata_->classesOffset) {
      MDSectionOffset originalOffset = offset;
      auto nameOffset = metadata_->getOffset(offset);
      offset += sizeof(MDSectionOffset);
      bool next = (nameOffset & metagen::mdSectionOffsetNext) != 0;
      nameOffset &= ~metagen::mdSectionOffsetNext;
      addSymbol(NativeApiSymbolKind::Protocol, originalOffset,
                metadata_->resolveString(nameOffset));

      while (next) {
        auto protocolOffset = metadata_->getOffset(offset);
        offset += sizeof(MDSectionOffset);
        next = (protocolOffset & metagen::mdSectionOffsetNext) != 0;
      }

      next = true;
      while (next) {
        auto flags = metadata_->getMemberFlag(offset);
        next = (flags & metagen::mdMemberNext) != 0;
        offset += sizeof(flags);
        if (flags == metagen::mdMemberFlagNull) {
          break;
        }

        skipMember(flags, offset);
      }
    }
  }

  void indexClasses() {
    MDSectionOffset offset = metadata_->classesOffset;
    while (offset < metadata_->structsOffset) {
      MDSectionOffset originalOffset = offset;
      auto nameOffset = metadata_->getOffset(offset);
      offset += sizeof(MDSectionOffset);
      auto runtimeNameOffset = metadata_->getOffset(offset);
      offset += sizeof(MDSectionOffset);
      bool hasProtocols = (nameOffset & metagen::mdSectionOffsetNext) != 0;
      nameOffset &= ~metagen::mdSectionOffsetNext;

      auto name = metadata_->resolveString(nameOffset);
      const char* runtimeName = name;
      if (runtimeNameOffset != MD_SECTION_OFFSET_NULL) {
        runtimeName = metadata_->resolveString(runtimeNameOffset);
      }

      while (hasProtocols) {
        auto protocolOffset = metadata_->getOffset(offset);
        offset += sizeof(MDSectionOffset);
        hasProtocols = (protocolOffset & metagen::mdSectionOffsetNext) != 0;
      }

      auto superclass = metadata_->getOffset(offset);
      offset += sizeof(superclass);
      MDSectionOffset superclassOffset =
          superclass & ~metagen::mdSectionOffsetNext;
      if (superclassOffset != MD_SECTION_OFFSET_NULL) {
        superclassOffset += metadata_->classesOffset;
      }

      addSymbol(NativeApiSymbolKind::Class, originalOffset, name, runtimeName,
                superclassOffset);

      bool next = (superclass & metagen::mdSectionOffsetNext) != 0;
      while (next) {
        auto flags = metadata_->getMemberFlag(offset);
        next = (flags & metagen::mdMemberNext) != 0;
        offset += sizeof(flags);
        skipMember(flags, offset);
      }
    }
  }

  void skipAggregateFields(MDSectionOffset& offset, bool isUnion) const {
    bool next = true;
    while (next) {
      MDSectionOffset nameOffset = metadata_->getOffset(offset);
      offset += sizeof(MDSectionOffset);
      next = (nameOffset & metagen::mdSectionOffsetNext) != 0;
      nameOffset &= ~metagen::mdSectionOffsetNext;
      if (nameOffset == MD_SECTION_OFFSET_NULL) {
        break;
      }
      if (!isUnion) {
        offset += sizeof(uint16_t);
      }
      skipMetadataJsiType(metadata_.get(), &offset);
    }
  }

  void indexStructs() {
    MDSectionOffset offset = metadata_->structsOffset;
    while (offset < metadata_->unionsOffset) {
      if (metadata_->getOffset(offset) == 0) {
        break;
      }
      MDSectionOffset originalOffset = offset;
      const char* name = metadata_->getString(offset);
      offset += sizeof(MDSectionOffset);
      offset += sizeof(uint16_t);
      addSymbol(NativeApiSymbolKind::Struct, originalOffset, name);
      addAggregateAliases(NativeApiSymbolKind::Struct, originalOffset,
                          name != nullptr ? name : "");
      skipAggregateFields(offset, false);
    }
  }

  void indexUnions() {
    MDSectionOffset offset = metadata_->unionsOffset;
    while (metadata_->getOffset(offset) != 0) {
      MDSectionOffset originalOffset = offset;
      const char* name = metadata_->getString(offset);
      offset += sizeof(MDSectionOffset);
      offset += sizeof(uint16_t);
      addSymbol(NativeApiSymbolKind::Union, originalOffset, name);
      addAggregateAliases(NativeApiSymbolKind::Union, originalOffset,
                          name != nullptr ? name : "");
      skipAggregateFields(offset, true);
    }
  }

  void skipMember(MDMemberFlag flags, MDSectionOffset& offset) const {
    if ((flags & metagen::mdMemberProperty) != 0) {
      bool readonly = (flags & metagen::mdMemberReadonly) != 0;
      offset += sizeof(MDSectionOffset);
      offset += sizeof(MDSectionOffset);
      offset += sizeof(MDSectionOffset);
      if (!readonly) {
        offset += sizeof(MDSectionOffset);
        offset += sizeof(MDSectionOffset);
      }
      return;
    }

    offset += sizeof(MDSectionOffset);
    offset += sizeof(MDSectionOffset);
  }

  std::vector<NativeApiMember> readMembersForClass(
      MDSectionOffset classOffset) const {
    std::vector<NativeApiMember> members;
    if (metadata_ == nullptr || classOffset == MD_SECTION_OFFSET_NULL) {
      return members;
    }

    MDSectionOffset offset = classOffset;
    auto nameOffset = metadata_->getOffset(offset);
    offset += sizeof(MDSectionOffset);
    offset += sizeof(MDSectionOffset);
    bool hasProtocols = (nameOffset & metagen::mdSectionOffsetNext) != 0;

    while (hasProtocols) {
      auto protocolOffset = metadata_->getOffset(offset);
      offset += sizeof(MDSectionOffset);
      hasProtocols = (protocolOffset & metagen::mdSectionOffsetNext) != 0;
    }

    auto superclass = metadata_->getOffset(offset);
    offset += sizeof(superclass);

    bool next = (superclass & metagen::mdSectionOffsetNext) != 0;
    while (next) {
      auto flags = metadata_->getMemberFlag(offset);
      next = (flags & metagen::mdMemberNext) != 0;
      offset += sizeof(flags);
      if (flags == metagen::mdMemberFlagNull) {
        break;
      }

      NativeApiMember member;
      member.flags = flags;
      if ((flags & metagen::mdMemberProperty) != 0) {
        member.property = true;
        member.readonly = (flags & metagen::mdMemberReadonly) != 0;
        member.name = metadata_->getString(offset);
        offset += sizeof(MDSectionOffset);
        member.selectorName = metadata_->getString(offset);
        offset += sizeof(MDSectionOffset);
        member.signatureOffset =
            metadata_->signaturesOffset + metadata_->getOffset(offset);
        offset += sizeof(MDSectionOffset);

        if (!member.readonly) {
          member.setterSelectorName = metadata_->getString(offset);
          offset += sizeof(MDSectionOffset);
          member.setterSignatureOffset =
              metadata_->signaturesOffset + metadata_->getOffset(offset);
          offset += sizeof(MDSectionOffset);
        }
      } else {
        member.selectorName = metadata_->getString(offset);
        offset += sizeof(MDSectionOffset);
        member.signatureOffset =
            metadata_->signaturesOffset + metadata_->getOffset(offset);
        offset += sizeof(MDSectionOffset);
        member.name = jsifySelector(member.selectorName.c_str());
      }
      members.push_back(std::move(member));
    }

    return members;
  }

  std::vector<NativeApiMember> readMembersForClassHierarchy(
      const NativeApiSymbol& symbol) const {
    std::vector<NativeApiMember> members = readMembersForClass(symbol.offset);
    if (symbol.superclassOffset == MD_SECTION_OFFSET_NULL) {
      return members;
    }

    auto superclass = classSymbolsByOffset_.find(symbol.superclassOffset);
    if (superclass != classSymbolsByOffset_.end()) {
      const auto& inheritedMembers = membersForClass(superclass->second);
      members.insert(members.end(), inheritedMembers.begin(),
                     inheritedMembers.end());
    }
    return members;
  }

  std::unique_ptr<MDMetadataReader> metadata_;
  void* selfDl_ = nullptr;
  std::unordered_map<std::string, NativeApiSymbol> symbolsByName_;
  std::unordered_map<std::string, NativeApiSymbol> classSymbolsByRuntimeName_;
  std::unordered_map<MDSectionOffset, NativeApiSymbol> classSymbolsByOffset_;
  std::vector<std::string> classNames_;
  std::vector<std::string> functionNames_;
  std::vector<std::string> constantNames_;
  std::vector<std::string> protocolNames_;
  std::vector<std::string> enumNames_;
  std::vector<std::string> structNames_;
  std::vector<std::string> unionNames_;
  std::shared_ptr<NativeApiJsiScheduler> scheduler_;
  mutable std::unordered_map<MDSectionOffset, std::vector<NativeApiMember>>
      membersByClassOffset_;
  std::unordered_map<MDSectionOffset, NativeApiSymbol> structSymbolsByOffset_;
  std::unordered_map<MDSectionOffset, NativeApiSymbol> unionSymbolsByOffset_;
  std::unordered_map<MDSectionOffset, std::shared_ptr<NativeApiJsiAggregateInfo>>
      aggregateInfoByOffset_;
  std::unordered_set<MDSectionOffset> aggregateInfoInProgress_;
  std::thread::id jsThreadId_ = std::this_thread::get_id();
  std::mutex retainedLifetimesMutex_;
  std::vector<std::shared_ptr<void>> retainedLifetimes_;
};

Value makeString(Runtime& runtime, const std::string& value) {
  return String::createFromUtf8(runtime, value);
}

std::string readStringArg(Runtime& runtime, const Value* args, size_t count,
                          size_t index, const char* argumentName) {
  if (index >= count || !args[index].isString()) {
    throw facebook::jsi::JSError(
        runtime, std::string(argumentName) + " must be a string.");
  }
  return args[index].asString(runtime).utf8(runtime);
}

const char* kindName(NativeApiSymbolKind kind) {
  switch (kind) {
    case NativeApiSymbolKind::Class:
      return "class";
    case NativeApiSymbolKind::Function:
      return "function";
    case NativeApiSymbolKind::Constant:
      return "constant";
    case NativeApiSymbolKind::Protocol:
      return "protocol";
    case NativeApiSymbolKind::Enum:
      return "enum";
    case NativeApiSymbolKind::Struct:
      return "struct";
    case NativeApiSymbolKind::Union:
      return "union";
  }
  return "unknown";
}

Array namesToArray(Runtime& runtime, const std::vector<std::string>& names) {
  Array result(runtime, names.size());
  for (size_t i = 0; i < names.size(); i++) {
    result.setValueAtIndex(runtime, i, makeString(runtime, names[i]));
  }
  return result;
}

void addPropertyName(Runtime& runtime, std::vector<PropNameID>& names,
                     const char* name) {
  names.push_back(PropNameID::forAscii(runtime, name));
}

class NativeApiPointerHostObject;
class NativeApiObjectHostObject;
class NativeApiClassHostObject;
class NativeApiProtocolHostObject;

Value callCFunction(Runtime& runtime,
                    const std::shared_ptr<NativeApiJsiBridge>& bridge,
                    const NativeApiSymbol& symbol, const Value* args,
                    size_t count);

Value callObjCSelector(Runtime& runtime,
                       const std::shared_ptr<NativeApiJsiBridge>& bridge,
                       id receiver, bool receiverIsClass,
                       const std::string& selectorName,
                       const NativeApiMember* member,
                       const Value* args, size_t count);

Object symbolToObject(Runtime& runtime, const NativeApiSymbol& symbol) {
  Object result(runtime);
  result.setProperty(runtime, "kind", makeString(runtime, kindName(symbol.kind)));
  result.setProperty(runtime, "name", makeString(runtime, symbol.name));
  result.setProperty(runtime, "runtimeName",
                     makeString(runtime, symbol.runtimeName));
  result.setProperty(runtime, "metadataOffset",
                     static_cast<double>(symbol.offset));

  if (symbol.kind == NativeApiSymbolKind::Class) {
    Class cls = objc_lookUpClass(symbol.runtimeName.c_str());
    result.setProperty(runtime, "available", cls != nil);
    if (cls != nil) {
      char address[32] = {};
      snprintf(address, sizeof(address), "%p", cls);
      result.setProperty(runtime, "nativeAddress", makeString(runtime, address));
    }
  } else if (symbol.kind == NativeApiSymbolKind::Struct ||
             symbol.kind == NativeApiSymbolKind::Union) {
    result.setProperty(runtime, "available", true);
  }

  return result;
}

size_t nativeSizeForType(const NativeApiJsiType& type);

class NativeApiPointerHostObject final : public HostObject {
 public:
  NativeApiPointerHostObject(void* pointer, std::string kind = "pointer",
                             bool adopted = false)
      : pointer_(pointer), kind_(std::move(kind)), adopted_(adopted) {}

  ~NativeApiPointerHostObject() override {
    if (adopted_ && pointer_ != nullptr) {
      free(pointer_);
      pointer_ = nullptr;
    }
  }

  void* pointer() const { return pointer_; }
  bool adopted() const { return adopted_; }
  void adopt() { adopted_ = true; }
  void clearWithoutFree() {
    pointer_ = nullptr;
    adopted_ = false;
  }

  Value get(Runtime& runtime, const PropNameID& name) override {
    std::string property = name.utf8(runtime);
    if (property == "kind") {
      return makeString(runtime, kind_);
    }
    if (property == "address") {
      return static_cast<double>(reinterpret_cast<uintptr_t>(pointer_));
    }
    if (property == "adopted") {
      return adopted_;
    }
    if (property == "add" || property == "subtract") {
      void* pointer = pointer_;
      bool add = property == "add";
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, property.c_str()), 1,
          [pointer, add](Runtime& runtime, const Value&, const Value* args,
                         size_t count) -> Value {
            if (count < 1 || !args[0].isNumber()) {
              throw facebook::jsi::JSError(runtime, "Pointer offset must be a number.");
            }
            intptr_t offset = static_cast<intptr_t>(args[0].getNumber());
            intptr_t base = reinterpret_cast<intptr_t>(pointer);
            void* result = reinterpret_cast<void*>(add ? base + offset : base - offset);
            return Object::createFromHostObject(
                runtime, std::make_shared<NativeApiPointerHostObject>(result));
          });
    }
    if (property == "toNumber") {
      void* pointer = pointer_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "toNumber"), 0,
          [pointer](Runtime&, const Value&, const Value*, size_t) -> Value {
            return static_cast<double>(reinterpret_cast<uintptr_t>(pointer));
          });
    }
    if (property == "toBigInt") {
      void* pointer = pointer_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "toBigInt"), 0,
          [pointer](Runtime& runtime, const Value&, const Value*, size_t) -> Value {
            auto bigIntCtor =
                runtime.global().getPropertyAsFunction(runtime, "BigInt");
            char decimal[32] = {};
            snprintf(decimal, sizeof(decimal), "%llu",
                     static_cast<unsigned long long>(
                         reinterpret_cast<uintptr_t>(pointer)));
            return bigIntCtor.call(runtime, String::createFromUtf8(runtime, decimal));
          });
    }
    if (property == "toHexString" || property == "toDecimalString") {
      void* pointer = pointer_;
      bool hex = property == "toHexString";
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, property.c_str()), 0,
          [pointer, hex](Runtime& runtime, const Value&, const Value*, size_t) -> Value {
            char text[2 + sizeof(uintptr_t) * 2 + 1] = {};
            if (hex) {
              snprintf(text, sizeof(text), "0x%llx",
                       static_cast<unsigned long long>(
                           reinterpret_cast<uintptr_t>(pointer)));
            } else {
              snprintf(text, sizeof(text), "%lld",
                       static_cast<long long>(reinterpret_cast<intptr_t>(pointer)));
            }
            return makeString(runtime, text);
          });
    }
    if (property == "toString") {
      void* pointer = pointer_;
      std::string kind = kind_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "toString"), 0,
          [pointer, kind](Runtime& runtime, const Value&, const Value*,
                          size_t) -> Value {
            char address[32] = {};
            snprintf(address, sizeof(address), "%p", pointer);
            return makeString(runtime, "[NativeApiJsi " + kind + " " +
                                           std::string(address) + "]");
          });
    }
    return Value::undefined();
  }

  std::vector<PropNameID> getPropertyNames(Runtime& runtime) override {
    std::vector<PropNameID> names;
    names.reserve(3);
    addPropertyName(runtime, names, "kind");
    addPropertyName(runtime, names, "address");
    addPropertyName(runtime, names, "adopted");
    addPropertyName(runtime, names, "add");
    addPropertyName(runtime, names, "subtract");
    addPropertyName(runtime, names, "toNumber");
    addPropertyName(runtime, names, "toBigInt");
    addPropertyName(runtime, names, "toHexString");
    addPropertyName(runtime, names, "toDecimalString");
    addPropertyName(runtime, names, "toString");
    return names;
  }

 private:
  void* pointer_ = nullptr;
  std::string kind_;
  bool adopted_ = false;
};

class NativeApiReferenceHostObject final : public HostObject {
 public:
  NativeApiReferenceHostObject(std::shared_ptr<NativeApiJsiBridge> bridge,
                               NativeApiJsiType type, void* data, bool ownsData)
      : bridge_(std::move(bridge)),
        type_(std::move(type)),
        data_(data),
        ownsData_(ownsData) {}

  ~NativeApiReferenceHostObject() override {
    if (ownsData_ && data_ != nullptr) {
      free(data_);
      data_ = nullptr;
    }
  }

  void* data() const { return data_; }
  const NativeApiJsiType& type() const { return type_; }
  void ensureStorage(NativeApiJsiType type) {
    if (data_ == nullptr) {
      type_ = std::move(type);
      data_ = calloc(1, std::max<size_t>(nativeSizeForType(type_), sizeof(void*)));
      ownsData_ = true;
    }
  }

  Value get(Runtime& runtime, const PropNameID& name) override;
  void set(Runtime& runtime, const PropNameID& name, const Value& value) override;
  std::vector<PropNameID> getPropertyNames(Runtime& runtime) override {
    std::vector<PropNameID> names;
    addPropertyName(runtime, names, "kind");
    addPropertyName(runtime, names, "value");
    addPropertyName(runtime, names, "address");
    addPropertyName(runtime, names, "toString");
    return names;
  }

 private:
  std::shared_ptr<NativeApiJsiBridge> bridge_;
  NativeApiJsiType type_;
  void* data_ = nullptr;
  bool ownsData_ = false;
};

class NativeApiStructObjectHostObject final : public HostObject {
 public:
  NativeApiStructObjectHostObject(
      std::shared_ptr<NativeApiJsiBridge> bridge,
      std::shared_ptr<NativeApiJsiAggregateInfo> info,
      const void* data = nullptr, bool ownsData = true)
      : bridge_(std::move(bridge)), info_(std::move(info)), ownsData_(ownsData) {
    size_t size = info_ != nullptr ? info_->size : 0;
    if (ownsData_) {
      ownedData_.assign(size, 0);
      if (data != nullptr && size > 0) {
        std::memcpy(ownedData_.data(), data, size);
      }
      data_ = ownedData_.empty() ? nullptr : ownedData_.data();
    } else {
      data_ = const_cast<void*>(data);
    }
  }

  void* data() const { return data_; }
  std::shared_ptr<NativeApiJsiAggregateInfo> info() const { return info_; }

  Value get(Runtime& runtime, const PropNameID& name) override;
  void set(Runtime& runtime, const PropNameID& name, const Value& value) override;
  std::vector<PropNameID> getPropertyNames(Runtime& runtime) override;

 private:
  std::shared_ptr<NativeApiJsiBridge> bridge_;
  std::shared_ptr<NativeApiJsiAggregateInfo> info_;
  std::vector<unsigned char> ownedData_;
  void* data_ = nullptr;
  bool ownsData_ = true;
};

class NativeApiObjectHostObject final : public HostObject {
 public:
  NativeApiObjectHostObject(std::shared_ptr<NativeApiJsiBridge> bridge,
                            id object, bool ownsObject)
      : bridge_(std::move(bridge)), object_(object), ownsObject_(ownsObject) {
    if (object_ != nil && !ownsObject_) {
      [object_ retain];
      ownsObject_ = true;
    }
  }

  ~NativeApiObjectHostObject() override {
    if (ownsObject_ && object_ != nil) {
      [object_ release];
      object_ = nil;
    }
  }

  id object() const { return object_; }

  Value get(Runtime& runtime, const PropNameID& name) override {
    std::string property = name.utf8(runtime);
    if (property == "kind") {
      return makeString(runtime, "object");
    }
    if (property == "className") {
      return makeString(runtime, object_ != nil ? object_getClassName(object_) : "");
    }
    if (property == "nativeAddress") {
      char address[32] = {};
      snprintf(address, sizeof(address), "%p", object_);
      return makeString(runtime, address);
    }
    if (property == "invoke" || property == "send") {
      auto bridge = bridge_;
      id object = object_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, property.c_str()), 1,
          [bridge, object](Runtime& runtime, const Value&, const Value* args,
                           size_t count) -> Value {
            std::string selectorName =
                readStringArg(runtime, args, count, 0, "selector");
            return callObjCSelector(runtime, bridge, object, false, selectorName,
                                    nullptr, args + 1, count - 1);
          });
    }
    if (property == "toString") {
      id object = object_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "toString"), 0,
          [object](Runtime& runtime, const Value&, const Value*, size_t) -> Value {
            NSString* description =
                object != nil ? [object description] : @"<nil>";
            return makeString(runtime, description.UTF8String ?: "");
          });
    }

    if (object_ != nil) {
      if (const NativeApiSymbol* symbol =
              bridge_->findClass(object_getClassName(object_))) {
        for (const auto& member : bridge_->membersForClass(*symbol)) {
          if ((member.flags & metagen::mdMemberStatic) != 0) {
            continue;
          }
          if (member.name != property) {
            continue;
          }

          if (member.property) {
            return callObjCSelector(runtime, bridge_, object_, false,
                                    member.selectorName, &member, nullptr, 0);
          }

          auto bridge = bridge_;
          id object = object_;
          return Function::createFromHostFunction(
              runtime, PropNameID::forAscii(runtime, property.c_str()),
              member.property ? 0 : 0,
              [bridge, object, member](Runtime& runtime, const Value&,
                                       const Value* args,
                                       size_t count) -> Value {
                return callObjCSelector(runtime, bridge, object, false,
                                        member.selectorName, &member, args,
                                        count);
              });
        }
      }

      SEL selector = sel_getUid(property.c_str());
      Method method = class_getInstanceMethod(object_getClass(object_), selector);
      if (method != nullptr && method_getNumberOfArguments(method) == 2) {
        return callObjCSelector(runtime, bridge_, object_, false, property,
                                nullptr, nullptr, 0);
      }
    }

    return Value::undefined();
  }

  void set(Runtime& runtime, const PropNameID& name, const Value& value) override {
    std::string property = name.utf8(runtime);
    if (object_ == nil) {
      throw facebook::jsi::JSError(runtime, "Cannot set property on nil object.");
    }

    if (const NativeApiSymbol* symbol = bridge_->findClass(object_getClassName(object_))) {
      for (const auto& member : bridge_->membersForClass(*symbol)) {
        if (!member.property || member.readonly ||
            (member.flags & metagen::mdMemberStatic) != 0 ||
            member.name != property) {
          continue;
        }
        NativeApiMember setterMember = member;
        setterMember.selectorName = member.setterSelectorName;
        setterMember.signatureOffset = member.setterSignatureOffset;
        Value args[] = {Value(runtime, value)};
        callObjCSelector(runtime, bridge_, object_, false,
                         setterMember.selectorName, &setterMember, args, 1);
        return;
      }
    }

    std::string setterSelectorName = setterSelectorForProperty(property);
    SEL selector = sel_getUid(setterSelectorName.c_str());
    if (class_getInstanceMethod(object_getClass(object_), selector) != nullptr) {
      Value args[] = {Value(runtime, value)};
      callObjCSelector(runtime, bridge_, object_, false, setterSelectorName,
                       nullptr, args, 1);
      return;
    }

    throw facebook::jsi::JSError(runtime,
                                 "No writable native property: " + property);
  }

  std::vector<PropNameID> getPropertyNames(Runtime& runtime) override {
    std::vector<PropNameID> names;
    names.reserve(6);
    addPropertyName(runtime, names, "kind");
    addPropertyName(runtime, names, "className");
    addPropertyName(runtime, names, "nativeAddress");
    addPropertyName(runtime, names, "invoke");
    addPropertyName(runtime, names, "send");
    addPropertyName(runtime, names, "toString");
    if (object_ != nil) {
      if (const NativeApiSymbol* symbol =
              bridge_->findClass(object_getClassName(object_))) {
        for (const auto& member : bridge_->membersForClass(*symbol)) {
          if ((member.flags & metagen::mdMemberStatic) == 0) {
            addPropertyName(runtime, names, member.name.c_str());
          }
        }
      }
    }
    return names;
  }

 private:
  std::shared_ptr<NativeApiJsiBridge> bridge_;
  id object_ = nil;
  bool ownsObject_ = false;
};

class NativeApiClassHostObject final : public HostObject {
 public:
  NativeApiClassHostObject(std::shared_ptr<NativeApiJsiBridge> bridge,
                           NativeApiSymbol symbol)
      : bridge_(std::move(bridge)), symbol_(std::move(symbol)) {}

  Class nativeClass() const {
    return objc_lookUpClass(symbol_.runtimeName.c_str());
  }

  Value get(Runtime& runtime, const PropNameID& name) override {
    std::string property = name.utf8(runtime);
    if (property == "kind") {
      return makeString(runtime, "class");
    }
    if (property == "name") {
      return makeString(runtime, symbol_.name);
    }
    if (property == "runtimeName") {
      return makeString(runtime, symbol_.runtimeName);
    }
    if (property == "available") {
      return objc_lookUpClass(symbol_.runtimeName.c_str()) != nil;
    }
    if (property == "metadataOffset") {
      return static_cast<double>(symbol_.offset);
    }
    if (property == "toString") {
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "toString"), 0,
          [symbol = symbol_](Runtime& runtime, const Value&,
                             const Value*, size_t) -> Value {
            return makeString(runtime,
                              "[NativeApiJsiClass " + symbol.name + "]");
          });
    }
    if (property == "construct" || property == "alloc" || property == "new") {
      auto bridge = bridge_;
      auto symbol = symbol_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, property), 0,
          [bridge, symbol, property](Runtime& runtime, const Value&,
                                     const Value* args, size_t count) -> Value {
            Class cls = objc_lookUpClass(symbol.runtimeName.c_str());
            if (cls == nil) {
              throw facebook::jsi::JSError(
                  runtime, "Objective-C class is not available: " + symbol.name);
            }

            id result = nil;
            if (property == "new") {
              if (count != 0) {
                throw facebook::jsi::JSError(
                    runtime, "new does not take arguments; use invoke for an "
                             "explicit Objective-C selector.");
              }
              result = [cls new];
            } else {
              if (count != 0) {
                throw facebook::jsi::JSError(
                    runtime, "alloc does not take arguments; call invoke on the "
                             "allocated object for an explicit init selector.");
              }
              result = [cls alloc];
            }

            return Object::createFromHostObject(
                runtime, std::make_shared<NativeApiObjectHostObject>(
                             bridge, result, true));
          });
    }
    if (property == "invoke" || property == "send") {
      auto bridge = bridge_;
      auto symbol = symbol_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, property.c_str()), 1,
          [bridge, symbol](Runtime& runtime, const Value&, const Value* args,
                           size_t count) -> Value {
            std::string selectorName =
                readStringArg(runtime, args, count, 0, "selector");
            Class cls = objc_lookUpClass(symbol.runtimeName.c_str());
            if (cls == nil) {
              throw facebook::jsi::JSError(
                  runtime, "Objective-C class is not available: " + symbol.name);
            }
            return callObjCSelector(runtime, bridge, static_cast<id>(cls), true,
                                    selectorName, nullptr, args + 1,
                                    count - 1);
          });
    }

    for (const auto& member : bridge_->membersForClass(symbol_)) {
      if ((member.flags & metagen::mdMemberStatic) == 0 ||
          member.name != property) {
        continue;
      }

      auto bridge = bridge_;
      auto symbol = symbol_;
      if (member.property) {
        Class cls = objc_lookUpClass(symbol.runtimeName.c_str());
        if (cls == nil) {
          throw facebook::jsi::JSError(
              runtime, "Objective-C class is not available: " + symbol.name);
        }
        return callObjCSelector(runtime, bridge, static_cast<id>(cls), true,
                                member.selectorName, &member, nullptr, 0);
      }
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, property.c_str()), 0,
          [bridge, symbol, member](Runtime& runtime, const Value&,
                                   const Value* args, size_t count) -> Value {
            Class cls = objc_lookUpClass(symbol.runtimeName.c_str());
            if (cls == nil) {
              throw facebook::jsi::JSError(
                  runtime, "Objective-C class is not available: " + symbol.name);
            }
            return callObjCSelector(runtime, bridge, static_cast<id>(cls), true,
                                    member.selectorName, &member, args, count);
          });
    }

    Class cls = objc_lookUpClass(symbol_.runtimeName.c_str());
    if (cls != nil) {
      SEL selector = sel_getUid(property.c_str());
      Method method = class_getClassMethod(cls, selector);
      if (method != nullptr && method_getNumberOfArguments(method) == 2) {
        return callObjCSelector(runtime, bridge_, static_cast<id>(cls), true,
                                property, nullptr, nullptr, 0);
      }
    }

    return Value::undefined();
  }

  std::vector<PropNameID> getPropertyNames(Runtime& runtime) override {
    std::vector<PropNameID> names;
    names.reserve(8);
    addPropertyName(runtime, names, "kind");
    addPropertyName(runtime, names, "name");
    addPropertyName(runtime, names, "runtimeName");
    addPropertyName(runtime, names, "available");
    addPropertyName(runtime, names, "metadataOffset");
    addPropertyName(runtime, names, "toString");
    addPropertyName(runtime, names, "construct");
    addPropertyName(runtime, names, "alloc");
    addPropertyName(runtime, names, "new");
    addPropertyName(runtime, names, "invoke");
    addPropertyName(runtime, names, "send");
    for (const auto& member : bridge_->membersForClass(symbol_)) {
      if ((member.flags & metagen::mdMemberStatic) != 0) {
        addPropertyName(runtime, names, member.name.c_str());
      }
    }
    return names;
  }

 private:
  std::shared_ptr<NativeApiJsiBridge> bridge_;
  NativeApiSymbol symbol_;
};

class NativeApiProtocolHostObject final : public HostObject {
 public:
  explicit NativeApiProtocolHostObject(NativeApiSymbol symbol)
      : symbol_(std::move(symbol)) {}

  Protocol* nativeProtocol() const {
    Protocol* protocol = objc_getProtocol(symbol_.runtimeName.c_str());
    if (protocol == nullptr && symbol_.runtimeName != symbol_.name) {
      protocol = objc_getProtocol(symbol_.name.c_str());
    }
    return protocol;
  }

  Value get(Runtime& runtime, const PropNameID& name) override {
    std::string property = name.utf8(runtime);
    if (property == "kind") {
      return makeString(runtime, "protocol");
    }
    if (property == "name") {
      return makeString(runtime, symbol_.name);
    }
    if (property == "runtimeName") {
      return makeString(runtime, symbol_.runtimeName);
    }
    if (property == "available") {
      return nativeProtocol() != nullptr;
    }
    if (property == "metadataOffset") {
      return static_cast<double>(symbol_.offset);
    }
    if (property == "nativeAddress") {
      return static_cast<double>(
          reinterpret_cast<uintptr_t>(nativeProtocol()));
    }
    if (property == "toString") {
      auto symbol = symbol_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "toString"), 0,
          [symbol](Runtime& runtime, const Value&, const Value*, size_t) -> Value {
            return makeString(runtime,
                              "[NativeApiJsiProtocol " + symbol.name + "]");
          });
    }
    return Value::undefined();
  }

  std::vector<PropNameID> getPropertyNames(Runtime& runtime) override {
    std::vector<PropNameID> names;
    addPropertyName(runtime, names, "kind");
    addPropertyName(runtime, names, "name");
    addPropertyName(runtime, names, "runtimeName");
    addPropertyName(runtime, names, "available");
    addPropertyName(runtime, names, "metadataOffset");
    addPropertyName(runtime, names, "nativeAddress");
    addPropertyName(runtime, names, "toString");
    return names;
  }

 private:
  NativeApiSymbol symbol_;
};

bool isObjectiveCObjectType(const NativeApiJsiType& type) {
  switch (type.kind) {
    case metagen::mdTypeAnyObject:
    case metagen::mdTypeProtocolObject:
    case metagen::mdTypeClassObject:
    case metagen::mdTypeInstanceObject:
    case metagen::mdTypeNSStringObject:
    case metagen::mdTypeNSMutableStringObject:
      return true;
    default:
      return false;
  }
}

struct NativeApiJsiSignature {
  ffi_cif cif = {};
  NativeApiJsiType returnType;
  std::vector<NativeApiJsiType> argumentTypes;
  std::vector<ffi_type*> ffiTypes;
  bool variadic = false;
  bool prepared = false;
  unsigned int implicitArgumentCount = 0;
};

class NativeApiJsiArgumentFrame {
 public:
  explicit NativeApiJsiArgumentFrame(size_t count) : storage_(count), values_(count) {}

  ~NativeApiJsiArgumentFrame() {
    for (char* string : ownedCStrings_) {
      free(string);
    }
    for (id object : ownedObjects_) {
      [object release];
    }
  }

  void* storageAt(size_t index, size_t size) {
    storage_[index].assign(std::max<size_t>(size, sizeof(void*)), 0);
    values_[index] = storage_[index].data();
    return values_[index];
  }

  void addCString(char* value) { ownedCStrings_.push_back(value); }
  void addObject(id value) { ownedObjects_.push_back(value); }
  void** values() { return values_.empty() ? nullptr : values_.data(); }

 private:
  std::vector<std::vector<unsigned char>> storage_;
  std::vector<void*> values_;
  std::vector<char*> ownedCStrings_;
  std::vector<id> ownedObjects_;
};

class NativeApiMutableBuffer final : public MutableBuffer {
 public:
  explicit NativeApiMutableBuffer(size_t size) : data_(size) {}
  NativeApiMutableBuffer(const void* data, size_t size) : data_(size) {
    if (data != nullptr && size > 0) {
      std::memcpy(data_.data(), data, size);
    }
  }

  size_t size() const override { return data_.size(); }
  uint8_t* data() override { return data_.empty() ? nullptr : data_.data(); }

 private:
  std::vector<uint8_t> data_;
};

void convertJsiArgument(Runtime& runtime,
                        const std::shared_ptr<NativeApiJsiBridge>& bridge,
                        const NativeApiJsiType& type,
                        const Value& value, void* target,
                        NativeApiJsiArgumentFrame& frame);

Value convertNativeReturnValue(Runtime& runtime,
                               const std::shared_ptr<NativeApiJsiBridge>& bridge,
                               const NativeApiJsiType& type, void* value);

Value wrapNativeFunctionPointer(Runtime& runtime,
                                const std::shared_ptr<NativeApiJsiBridge>& bridge,
                                const NativeApiJsiType& type, void* pointer,
                                bool block);

bool isObjectiveCObjectType(const NativeApiJsiType& type);

struct NativeApiJsiBlockDescriptor {
  unsigned long reserved = 0;
  unsigned long size = 0;
  void (*copyHelper)(void*, void*) = nullptr;
  void (*disposeHelper)(void*) = nullptr;
  const char* signature = nullptr;
};

struct NativeApiJsiBlockLiteral {
  void* isa = nullptr;
  int flags = 0;
  int reserved = 0;
  void* invoke = nullptr;
  NativeApiJsiBlockDescriptor* descriptor = nullptr;
  void* callback = nullptr;
};

constexpr int kNativeApiJsiBlockNeedsFree = (1 << 24);
constexpr int kNativeApiJsiBlockHasCopyDispose = (1 << 25);
constexpr int kNativeApiJsiBlockRefCountOne = (1 << 1);
constexpr int kNativeApiJsiBlockHasSignature = (1 << 30);

void* nativeApiJsiMallocBlockIsa() {
  static void* isa = dlsym(RTLD_DEFAULT, "_NSConcreteMallocBlock");
  if (isa == nullptr) {
    isa = dlsym(RTLD_DEFAULT, "_NSConcreteStackBlock");
  }
  return isa;
}

void nativeApiJsiBlockCopy(void*, void*) {}

void nativeApiJsiBlockDispose(void*) {}

std::string objcEncodingForJsiType(const NativeApiJsiType& type) {
  switch (type.kind) {
    case metagen::mdTypeVoid:
      return "v";
    case metagen::mdTypeBool:
      return "B";
    case metagen::mdTypeChar:
      return "c";
    case metagen::mdTypeUChar:
    case metagen::mdTypeUInt8:
      return "C";
    case metagen::mdTypeSShort:
      return "s";
    case metagen::mdTypeUShort:
      return "S";
    case metagen::mdTypeSInt:
      return "i";
    case metagen::mdTypeUInt:
      return "I";
    case metagen::mdTypeSLong:
    case metagen::mdTypeSInt64:
      return "q";
    case metagen::mdTypeULong:
    case metagen::mdTypeUInt64:
      return "Q";
    case metagen::mdTypeFloat:
      return "f";
    case metagen::mdTypeDouble:
      return "d";
    case metagen::mdTypeString:
      return "*";
    case metagen::mdTypeAnyObject:
    case metagen::mdTypeProtocolObject:
    case metagen::mdTypeInstanceObject:
    case metagen::mdTypeNSStringObject:
    case metagen::mdTypeNSMutableStringObject:
      return "@";
    case metagen::mdTypeClassObject:
    case metagen::mdTypeClass:
      return "#";
    case metagen::mdTypeSelector:
      return ":";
    case metagen::mdTypeBlock:
      return "@?";
    case metagen::mdTypeFunctionPointer:
      return "^?";
    case metagen::mdTypePointer:
    case metagen::mdTypeOpaquePointer:
      if (type.elementType != nullptr &&
          type.elementType->kind != metagen::mdTypeVoid) {
        return "^" + objcEncodingForJsiType(*type.elementType);
      }
      return "^v";
    case metagen::mdTypeStruct:
      return "{" +
             (type.aggregateInfo != nullptr ? type.aggregateInfo->name
                                            : std::string("?")) +
             "=}";
    case metagen::mdTypeArray:
      return "[" + std::to_string(type.arraySize) +
             (type.elementType != nullptr ? objcEncodingForJsiType(*type.elementType)
                                          : std::string("?")) +
             "]";
    case metagen::mdTypeVector:
    case metagen::mdTypeExtVector:
    case metagen::mdTypeComplex:
      return type.elementType != nullptr ? objcEncodingForJsiType(*type.elementType)
                                         : "?";
    default:
      return "?";
  }
}

std::string objcBlockSignatureForJsiSignature(
    const NativeApiJsiSignature& signature) {
  std::string encoding = objcEncodingForJsiType(signature.returnType);
  encoding += "@?";
  for (const auto& argType : signature.argumentTypes) {
    encoding += objcEncodingForJsiType(argType);
  }
  return encoding;
}

[[noreturn]] void throwNativeApiJsiCallbackException(
    const std::string& message) {
  NSString* reason = [NSString stringWithUTF8String:message.c_str()];
  @throw [NSException exceptionWithName:@"NativeScriptJSICallbackException"
                                 reason:reason
                               userInfo:nil];
}

class NativeApiJsiCallback;

void nativeApiJsiCallbackTrampoline(ffi_cif* cif, void* ret, void* args[],
                                    void* data);

class NativeApiJsiCallback final {
 public:
  NativeApiJsiCallback(Runtime& runtime,
                       std::shared_ptr<NativeApiJsiBridge> bridge,
                       std::shared_ptr<NativeApiJsiSignature> signature,
                       Function function, bool block)
      : runtime_(&runtime),
        bridge_(std::move(bridge)),
        signature_(std::move(signature)),
        function_(std::make_shared<Function>(std::move(function))),
        block_(block) {
    closure_ = static_cast<ffi_closure*>(
        ffi_closure_alloc(sizeof(ffi_closure), &executable_));
    if (closure_ == nullptr || executable_ == nullptr ||
        signature_ == nullptr || !signature_->prepared) {
      throw facebook::jsi::JSError(runtime,
                                   "Unable to allocate native JSI callback.");
    }

    ffi_status status = ffi_prep_closure_loc(
        closure_, &signature_->cif, nativeApiJsiCallbackTrampoline, this,
        executable_);
    if (status != FFI_OK) {
      ffi_closure_free(closure_);
      closure_ = nullptr;
      executable_ = nullptr;
      throw facebook::jsi::JSError(runtime,
                                   "Unable to prepare native JSI callback.");
    }

    if (block_) {
      blockSignature_ = objcBlockSignatureForJsiSignature(*signature_);
      descriptor_ = std::make_unique<NativeApiJsiBlockDescriptor>();
      descriptor_->reserved = 0;
      descriptor_->size = sizeof(NativeApiJsiBlockLiteral);
      descriptor_->copyHelper = nativeApiJsiBlockCopy;
      descriptor_->disposeHelper = nativeApiJsiBlockDispose;
      descriptor_->signature = blockSignature_.c_str();

      blockLiteral_ = std::make_unique<NativeApiJsiBlockLiteral>();
      blockLiteral_->isa = nativeApiJsiMallocBlockIsa();
      blockLiteral_->flags = kNativeApiJsiBlockNeedsFree |
                             kNativeApiJsiBlockHasCopyDispose |
                             kNativeApiJsiBlockRefCountOne |
                             kNativeApiJsiBlockHasSignature;
      blockLiteral_->invoke = executable_;
      blockLiteral_->descriptor = descriptor_.get();
      blockLiteral_->callback = this;
    }
  }

  ~NativeApiJsiCallback() {
    if (closure_ != nullptr) {
      ffi_closure_free(closure_);
      closure_ = nullptr;
      executable_ = nullptr;
    }
  }

  void* functionPointer() const {
    return block_ && blockLiteral_ != nullptr
               ? static_cast<void*>(blockLiteral_.get())
               : executable_;
  }

  void invoke(void* ret, void* args[]) {
    if (runtime_ == nullptr || function_ == nullptr || signature_ == nullptr) {
      throwNativeApiJsiCallbackException("Invalid JSI callback.");
    }

    std::string error;
    auto call = [&]() { invokeOnCurrentThread(ret, args, &error); };
    bool direct = std::this_thread::get_id() == bridge_->jsThreadId() ||
                  gExecutingDispatchedUINativeCall ||
                  gSynchronousNativeInvocationDepth.load(
                      std::memory_order_acquire) > 0;
    if (direct) {
      call();
    } else if (auto scheduler = bridge_->scheduler()) {
      dispatch_semaphore_t done = dispatch_semaphore_create(0);
      scheduler->invokeOnJS([call, done]() mutable {
        call();
        dispatch_semaphore_signal(done);
      });
      dispatch_semaphore_wait(done, DISPATCH_TIME_FOREVER);
    } else {
      error = "Native callback was invoked off the JS thread without a JS scheduler.";
    }

    if (!error.empty()) {
      throwNativeApiJsiCallbackException(error);
    }
  }

 private:
  void invokeOnCurrentThread(void* ret, void* args[], std::string* error) {
    @autoreleasepool {
      try {
        size_t nativeArgOffset = block_ ? 1 : 0;
        std::vector<Value> jsArgs;
        jsArgs.reserve(signature_->argumentTypes.size());
        for (size_t i = 0; i < signature_->argumentTypes.size(); i++) {
          jsArgs.emplace_back(convertNativeReturnValue(
              *runtime_, bridge_, signature_->argumentTypes[i],
              args[i + nativeArgOffset]));
        }

        Value result =
            jsArgs.empty()
                ? function_->call(*runtime_)
                : function_->call(*runtime_,
                                  static_cast<const Value*>(jsArgs.data()),
                                  static_cast<size_t>(jsArgs.size()));
        storeReturnValue(result, ret);
      } catch (const std::exception& exception) {
        if (error != nullptr) {
          *error = exception.what();
        }
        zeroReturnValue(ret);
      } catch (...) {
        if (error != nullptr) {
          *error = "Unknown exception in native JSI callback.";
        }
        zeroReturnValue(ret);
      }
    }
  }

  void zeroReturnValue(void* ret) {
    if (ret == nullptr || signature_ == nullptr ||
        signature_->returnType.kind == metagen::mdTypeVoid) {
      return;
    }
    size_t size = nativeSizeForType(signature_->returnType);
    if (size > 0) {
      std::memset(ret, 0, size);
    }
  }

  void storeReturnValue(const Value& result, void* ret) {
    if (ret == nullptr ||
        signature_->returnType.kind == metagen::mdTypeVoid) {
      return;
    }

    zeroReturnValue(ret);
    const auto& returnType = signature_->returnType;
    if (returnType.kind == metagen::mdTypeString && result.isString()) {
      std::string utf8 = result.asString(*runtime_).utf8(*runtime_);
      *static_cast<char**>(ret) = strdup(utf8.c_str());
      return;
    }
    if ((returnType.kind == metagen::mdTypePointer ||
         returnType.kind == metagen::mdTypeOpaquePointer) &&
        result.isString()) {
      std::string utf8 = result.asString(*runtime_).utf8(*runtime_);
      *static_cast<void**>(ret) = strdup(utf8.c_str());
      return;
    }

    NativeApiJsiArgumentFrame frame(1);
    convertJsiArgument(*runtime_, bridge_, returnType, result, ret, frame);
    if (isObjectiveCObjectType(returnType)) {
      id object = *static_cast<id*>(ret);
      if (object != nil) {
        [object retain];
        [object autorelease];
      }
    }
  }

  Runtime* runtime_ = nullptr;
  std::shared_ptr<NativeApiJsiBridge> bridge_;
  std::shared_ptr<NativeApiJsiSignature> signature_;
  std::shared_ptr<Function> function_;
  bool block_ = false;
  ffi_closure* closure_ = nullptr;
  void* executable_ = nullptr;
  std::string blockSignature_;
  std::unique_ptr<NativeApiJsiBlockDescriptor> descriptor_;
  std::unique_ptr<NativeApiJsiBlockLiteral> blockLiteral_;
};

void nativeApiJsiCallbackTrampoline(ffi_cif*, void* ret, void* args[],
                                    void* data) {
  auto callback = static_cast<NativeApiJsiCallback*>(data);
  if (callback == nullptr) {
    return;
  }
  callback->invoke(ret, args);
}

size_t nativeSizeForType(const NativeApiJsiType& type) {
  switch (type.kind) {
    case metagen::mdTypeStruct:
      if (type.aggregateInfo != nullptr) {
        return type.aggregateInfo->size;
      }
      break;
    case metagen::mdTypeArray:
      if (type.elementType != nullptr) {
        return nativeSizeForType(*type.elementType) *
               static_cast<size_t>(type.arraySize);
      }
      break;
    case metagen::mdTypeVector:
    case metagen::mdTypeExtVector:
    case metagen::mdTypeComplex:
      if (type.elementType != nullptr) {
        size_t lanes = std::max<size_t>(type.arraySize, 1);
        size_t abiLanes = lanes == 3 ? 4 : lanes;
        return nativeSizeForType(*type.elementType) * abiLanes;
      }
      break;
    default:
      break;
  }

  if (type.ffiType != nullptr && type.ffiType->size > 0) {
    return type.ffiType->size;
  }
  if (type.ffiType == &ffi_type_void) {
    return 0;
  }
  return sizeof(void*);
}

bool readJsiBuffer(Runtime& runtime, const Object& object, const uint8_t** data,
                   size_t* byteLength) {
  if (data == nullptr || byteLength == nullptr) {
    return false;
  }

  if (object.isArrayBuffer(runtime)) {
    ArrayBuffer buffer = object.getArrayBuffer(runtime);
    *data = buffer.data(runtime);
    *byteLength = buffer.size(runtime);
    return true;
  }

  Value bufferValue = object.getProperty(runtime, "buffer");
  if (!bufferValue.isObject()) {
    return false;
  }
  Object bufferObject = bufferValue.asObject(runtime);
  if (!bufferObject.isArrayBuffer(runtime)) {
    return false;
  }

  size_t byteOffset = 0;
  size_t viewByteLength = 0;
  Value offsetValue = object.getProperty(runtime, "byteOffset");
  if (offsetValue.isNumber()) {
    byteOffset = static_cast<size_t>(std::max<double>(0, offsetValue.getNumber()));
  }
  Value lengthValue = object.getProperty(runtime, "byteLength");
  if (lengthValue.isNumber()) {
    viewByteLength = static_cast<size_t>(std::max<double>(0, lengthValue.getNumber()));
  }

  ArrayBuffer buffer = bufferObject.getArrayBuffer(runtime);
  if (byteOffset > buffer.size(runtime)) {
    return false;
  }
  if (viewByteLength == 0 || byteOffset + viewByteLength > buffer.size(runtime)) {
    viewByteLength = buffer.size(runtime) - byteOffset;
  }
  *data = buffer.data(runtime) + byteOffset;
  *byteLength = viewByteLength;
  return true;
}

uint32_t rawTypeKind(MDTypeKind kind) {
  return static_cast<uint32_t>(kind);
}

MDTypeKind stripTypeFlags(MDTypeKind kind) {
  uint32_t raw = rawTypeKind(kind);
  raw &= ~static_cast<uint32_t>(metagen::mdTypeFlagNext);
  raw &= ~static_cast<uint32_t>(metagen::mdTypeFlagVariadic);
  return static_cast<MDTypeKind>(raw);
}

size_t alignUp(size_t value, size_t alignment) {
  if (alignment == 0) {
    return value;
  }
  return ((value + alignment - 1) / alignment) * alignment;
}

ffi_type* ffiTypeForJsiKind(MDTypeKind kind) {
  switch (kind) {
    case metagen::mdTypeChar:
      return &ffi_type_sint8;
    case metagen::mdTypeUChar:
    case metagen::mdTypeUInt8:
    case metagen::mdTypeBool:
      return &ffi_type_uint8;
    case metagen::mdTypeSShort:
      return &ffi_type_sint16;
    case metagen::mdTypeUShort:
      return &ffi_type_uint16;
    case metagen::mdTypeSInt:
      return &ffi_type_sint32;
    case metagen::mdTypeUInt:
      return &ffi_type_uint32;
    case metagen::mdTypeSLong:
    case metagen::mdTypeSInt64:
      return &ffi_type_sint64;
    case metagen::mdTypeULong:
    case metagen::mdTypeUInt64:
      return &ffi_type_uint64;
    case metagen::mdTypeFloat:
      return &ffi_type_float;
    case metagen::mdTypeDouble:
      return &ffi_type_double;
    case metagen::mdTypeVoid:
      return &ffi_type_void;
    case metagen::mdTypeString:
    case metagen::mdTypeAnyObject:
    case metagen::mdTypeProtocolObject:
    case metagen::mdTypeClassObject:
    case metagen::mdTypeInstanceObject:
    case metagen::mdTypeNSStringObject:
    case metagen::mdTypeNSMutableStringObject:
    case metagen::mdTypeClass:
    case metagen::mdTypeSelector:
    case metagen::mdTypePointer:
    case metagen::mdTypeOpaquePointer:
    case metagen::mdTypeBlock:
    case metagen::mdTypeFunctionPointer:
      return &ffi_type_pointer;
    default:
      return nullptr;
  }
}

bool isSupportedJsiKind(MDTypeKind kind) {
  switch (kind) {
    default:
      return ffiTypeForJsiKind(kind) != nullptr;
  }
}

void skipMetadataJsiTypePayload(MDMetadataReader* metadata, MDSectionOffset* offset,
                                MDTypeKind kind);

void skipMetadataJsiType(MDMetadataReader* metadata, MDSectionOffset* offset) {
  MDTypeKind kind = stripTypeFlags(metadata->getTypeKind(*offset));
  *offset += sizeof(MDTypeKind);
  skipMetadataJsiTypePayload(metadata, offset, kind);
}

void skipMetadataJsiTypePayload(MDMetadataReader* metadata, MDSectionOffset* offset,
                                MDTypeKind kind) {
  switch (kind) {
    case metagen::mdTypeClassObject: {
      auto classOffset = metadata->getOffset(*offset);
      *offset += sizeof(MDSectionOffset);
      bool next = (classOffset & metagen::mdSectionOffsetNext) != 0;
      while (next) {
        auto protocolOffset = metadata->getOffset(*offset);
        *offset += sizeof(MDSectionOffset);
        next = (protocolOffset & metagen::mdSectionOffsetNext) != 0;
      }
      break;
    }
    case metagen::mdTypeProtocolObject: {
      bool next = true;
      while (next) {
        auto protocolOffset = metadata->getOffset(*offset);
        *offset += sizeof(MDSectionOffset);
        next = (protocolOffset & metagen::mdSectionOffsetNext) != 0;
      }
      break;
    }
    case metagen::mdTypeArray:
    case metagen::mdTypeVector:
    case metagen::mdTypeExtVector:
    case metagen::mdTypeComplex:
      *offset += sizeof(uint16_t);
      skipMetadataJsiType(metadata, offset);
      break;
    case metagen::mdTypeStruct:
      *offset += sizeof(MDSectionOffset);
      break;
    case metagen::mdTypePointer:
      skipMetadataJsiType(metadata, offset);
      break;
    case metagen::mdTypeBlock:
    case metagen::mdTypeFunctionPointer:
      *offset += sizeof(MDSectionOffset);
      break;
    default:
      break;
  }
}

NativeApiJsiType parseMetadataJsiType(MDMetadataReader* metadata,
                                      MDSectionOffset* offset,
                                      NativeApiJsiBridge* bridge) {
  MDTypeKind rawKind = metadata->getTypeKind(*offset);
  MDTypeKind kind = stripTypeFlags(rawKind);
  *offset += sizeof(MDTypeKind);

  NativeApiJsiType type;
  type.kind = kind;

  switch (kind) {
    case metagen::mdTypeArray: {
      type.arraySize = metadata->getArraySize(*offset);
      *offset += sizeof(uint16_t);
      type.elementType =
          std::make_shared<NativeApiJsiType>(
              parseMetadataJsiType(metadata, offset, bridge));
      auto ffiOwner = std::make_shared<NativeApiJsiFfiType>();
      ffiOwner->elements.reserve(static_cast<size_t>(type.arraySize) + 1);
      ffi_type* elementFfiType = type.elementType->ffiType != nullptr
                                     ? type.elementType->ffiType
                                     : &ffi_type_pointer;
      for (uint16_t i = 0; i < type.arraySize; i++) {
        ffiOwner->elements.push_back(elementFfiType);
      }
      ffiOwner->finalize();
      type.ownedFfiType = ffiOwner;
      type.ffiType = &ffiOwner->type;
      type.supported = type.elementType->supported;
      return type;
    }
    case metagen::mdTypeVector:
    case metagen::mdTypeExtVector:
    case metagen::mdTypeComplex: {
      type.arraySize = metadata->getArraySize(*offset);
      *offset += sizeof(uint16_t);
      type.elementType =
          std::make_shared<NativeApiJsiType>(
              parseMetadataJsiType(metadata, offset, bridge));
      auto ffiOwner = std::make_shared<NativeApiJsiFfiType>();
#if defined(FFI_TYPE_EXT_VECTOR)
      ffiOwner->type.type =
          kind == metagen::mdTypeComplex ? FFI_TYPE_COMPLEX : FFI_TYPE_EXT_VECTOR;
#else
      ffiOwner->type.type =
          kind == metagen::mdTypeComplex ? FFI_TYPE_COMPLEX : FFI_TYPE_STRUCT;
#endif
      ffi_type* elementFfiType = type.elementType->ffiType != nullptr
                                     ? type.elementType->ffiType
                                     : &ffi_type_float;
      size_t lanes = std::max<size_t>(type.arraySize, 1);
      size_t abiLanes = lanes == 3 ? 4 : lanes;
      size_t elementSize = std::max<size_t>(elementFfiType->size, sizeof(float));
      size_t elementAlignment =
          std::max<size_t>(elementFfiType->alignment, static_cast<size_t>(1));
      ffiOwner->elements.reserve(abiLanes + 1);
      for (size_t i = 0; i < abiLanes; i++) {
        ffiOwner->elements.push_back(elementFfiType);
      }
      ffiOwner->finalize();
      size_t vectorAlignment = elementAlignment;
      if (kind != metagen::mdTypeComplex) {
        size_t packedSize = abiLanes * elementSize;
        size_t preferredAlignment = packedSize >= 16 ? 16 : packedSize;
        vectorAlignment = std::max(vectorAlignment, preferredAlignment);
      }
      vectorAlignment = std::min<size_t>(vectorAlignment, 16);
      ffiOwner->type.alignment = static_cast<unsigned short>(vectorAlignment);
      ffiOwner->type.size = alignUp(abiLanes * elementSize, vectorAlignment);
      type.ownedFfiType = ffiOwner;
      type.ffiType = &ffiOwner->type;
      type.supported = type.elementType->supported;
      return type;
    }
    case metagen::mdTypeStruct: {
      auto structOffset = metadata->getOffset(*offset);
      *offset += sizeof(MDSectionOffset);
      bool isUnion = (structOffset & metagen::mdSectionOffsetNext) != 0;
      structOffset &= ~metagen::mdSectionOffsetNext;
      if (structOffset == MD_SECTION_OFFSET_NULL || bridge == nullptr) {
        type.kind = metagen::mdTypePointer;
        type.ffiType = &ffi_type_pointer;
        type.supported = true;
        return type;
      }

      MDSectionOffset absoluteOffset =
          structOffset + (isUnion ? metadata->unionsOffset : metadata->structsOffset);
      type.aggregateOffset = absoluteOffset;
      type.aggregateIsUnion = isUnion;
      type.aggregateInfo = bridge->aggregateInfoFor(absoluteOffset, isUnion);
      type.ffiType = type.aggregateInfo != nullptr && type.aggregateInfo->ffi != nullptr
                         ? &type.aggregateInfo->ffi->type
                         : nullptr;
      type.supported = type.ffiType != nullptr;
      return type;
    }
    case metagen::mdTypePointer:
      type.elementType =
          std::make_shared<NativeApiJsiType>(
              parseMetadataJsiType(metadata, offset, bridge));
      type.ffiType = &ffi_type_pointer;
      type.supported = true;
      return type;
    case metagen::mdTypeBlock:
    case metagen::mdTypeFunctionPointer:
      type.signatureOffset = metadata->getOffset(*offset) + metadata->signaturesOffset;
      *offset += sizeof(MDSectionOffset);
      type.ffiType = &ffi_type_pointer;
      type.supported = true;
      return type;
    case metagen::mdTypeClassObject: {
      auto classOffset = metadata->getOffset(*offset);
      *offset += sizeof(MDSectionOffset);
      bool next = (classOffset & metagen::mdSectionOffsetNext) != 0;
      while (next) {
        auto protocolOffset = metadata->getOffset(*offset);
        *offset += sizeof(MDSectionOffset);
        next = (protocolOffset & metagen::mdSectionOffsetNext) != 0;
      }
      break;
    }
    case metagen::mdTypeProtocolObject: {
      bool next = true;
      while (next) {
        auto protocolOffset = metadata->getOffset(*offset);
        *offset += sizeof(MDSectionOffset);
        next = (protocolOffset & metagen::mdSectionOffsetNext) != 0;
      }
      break;
    }
    default:
      break;
  }

  type.ffiType = ffiTypeForJsiKind(kind);
  type.supported = type.ffiType != nullptr && isSupportedJsiKind(kind);
  return type;
}

std::shared_ptr<NativeApiJsiAggregateInfo> NativeApiJsiBridge::aggregateInfoFor(
    MDSectionOffset aggregateOffset, bool isUnion) {
  if (metadata_ == nullptr || aggregateOffset == MD_SECTION_OFFSET_NULL) {
    return nullptr;
  }

  auto cached = aggregateInfoByOffset_.find(aggregateOffset);
  if (cached != aggregateInfoByOffset_.end()) {
    return cached->second;
  }

  auto info = std::make_shared<NativeApiJsiAggregateInfo>();
  info->offset = aggregateOffset;
  info->isUnion = isUnion;
  aggregateInfoByOffset_[aggregateOffset] = info;

  if (aggregateInfoInProgress_.find(aggregateOffset) !=
      aggregateInfoInProgress_.end()) {
    auto ffiOwner = std::make_shared<NativeApiJsiFfiType>();
    ffiOwner->elements.push_back(&ffi_type_pointer);
    ffiOwner->finalize();
    info->ffi = ffiOwner;
    return info;
  }

  aggregateInfoInProgress_.insert(aggregateOffset);

  MDSectionOffset offset = aggregateOffset;
  const char* name = metadata_->getString(offset);
  info->name = name != nullptr ? name : "";
  offset += sizeof(MDSectionOffset);
  info->size = metadata_->getArraySize(offset);
  offset += sizeof(uint16_t);

  bool next = true;
  while (next) {
    MDSectionOffset nameOffset = metadata_->getOffset(offset);
    offset += sizeof(MDSectionOffset);
    next = (nameOffset & metagen::mdSectionOffsetNext) != 0;
    nameOffset &= ~metagen::mdSectionOffsetNext;
    if (nameOffset == MD_SECTION_OFFSET_NULL) {
      break;
    }

    NativeApiJsiAggregateField field;
    const char* fieldName = metadata_->resolveString(nameOffset);
    field.name = fieldName != nullptr ? fieldName : "";
    if (!isUnion) {
      field.offset = metadata_->getArraySize(offset);
      offset += sizeof(uint16_t);
    }
    field.type = parseMetadataJsiType(metadata_.get(), &offset, this);
    info->fields.push_back(std::move(field));
  }

  auto ffiOwner = std::make_shared<NativeApiJsiFfiType>();
  if (isUnion) {
    ffi_type* largest = &ffi_type_uint8;
    size_t largestSize = 0;
    for (const auto& field : info->fields) {
      size_t fieldSize = nativeSizeForType(field.type);
      if (field.type.ffiType != nullptr && fieldSize >= largestSize) {
        largest = field.type.ffiType;
        largestSize = fieldSize;
      }
    }
    ffiOwner->elements.push_back(largest);
  } else {
    for (const auto& field : info->fields) {
      ffiOwner->elements.push_back(field.type.ffiType != nullptr
                                       ? field.type.ffiType
                                       : &ffi_type_pointer);
    }
    if (ffiOwner->elements.empty()) {
      ffiOwner->elements.push_back(&ffi_type_uint8);
    }
  }
  ffiOwner->finalize();
  info->ffi = ffiOwner;
  aggregateInfoInProgress_.erase(aggregateOffset);
  return info;
}

std::optional<NativeApiJsiSignature> parseMetadataJsiSignature(
    MDMetadataReader* metadata, MDSectionOffset signatureOffset,
    unsigned int implicitArgumentCount, NativeApiJsiBridge* bridge,
    bool returnOwned = false) {
  if (metadata == nullptr || signatureOffset == MD_SECTION_OFFSET_NULL) {
    return std::nullopt;
  }

  NativeApiJsiSignature signature;
  signature.implicitArgumentCount = implicitArgumentCount;

  MDSectionOffset offset = signatureOffset;
  MDTypeKind returnKind = metadata->getTypeKind(offset);
  uint32_t returnKindRaw = rawTypeKind(returnKind);
  bool next =
      (returnKindRaw & static_cast<uint32_t>(metagen::mdTypeFlagNext)) != 0;
  signature.variadic =
      (returnKindRaw & static_cast<uint32_t>(metagen::mdTypeFlagVariadic)) != 0;
  signature.returnType = parseMetadataJsiType(metadata, &offset, bridge);
  signature.returnType.returnOwned = returnOwned;

  while (next) {
    MDTypeKind argKind = metadata->getTypeKind(offset);
    next = (rawTypeKind(argKind) &
            static_cast<uint32_t>(metagen::mdTypeFlagNext)) != 0;
    signature.argumentTypes.push_back(parseMetadataJsiType(metadata, &offset, bridge));
  }

  signature.ffiTypes.reserve(signature.argumentTypes.size() +
                             implicitArgumentCount);
  for (unsigned int i = 0; i < implicitArgumentCount; i++) {
    signature.ffiTypes.push_back(&ffi_type_pointer);
  }
  for (const auto& argType : signature.argumentTypes) {
    signature.ffiTypes.push_back(argType.ffiType != nullptr ? argType.ffiType
                                                            : &ffi_type_pointer);
  }

  ffi_status status = ffi_prep_cif(
      &signature.cif, FFI_DEFAULT_ABI,
      static_cast<unsigned int>(signature.ffiTypes.size()),
      signature.returnType.ffiType != nullptr ? signature.returnType.ffiType
                                              : &ffi_type_void,
      signature.ffiTypes.empty() ? nullptr : signature.ffiTypes.data());
  signature.prepared = status == FFI_OK;
  return signature;
}

const char* skipObjCTypeQualifiers(const char* encoding) {
  while (encoding != nullptr && *encoding != '\0' &&
         std::strchr("rnNoORV", *encoding) != nullptr) {
    encoding++;
  }
  return encoding;
}

NativeApiJsiType parseObjCEncodedJsiType(const char* encoding) {
  encoding = skipObjCTypeQualifiers(encoding);
  NativeApiJsiType type;

  if (encoding == nullptr || *encoding == '\0') {
    type.kind = metagen::mdTypePointer;
    type.ffiType = &ffi_type_pointer;
    return type;
  }

  switch (*encoding) {
    case 'c':
      type.kind = metagen::mdTypeChar;
      break;
    case 'i':
      type.kind = metagen::mdTypeSInt;
      break;
    case 's':
      type.kind = metagen::mdTypeSShort;
      break;
    case 'l':
    case 'q':
      type.kind = metagen::mdTypeSInt64;
      break;
    case 'C':
      type.kind = metagen::mdTypeUInt8;
      break;
    case 'I':
      type.kind = metagen::mdTypeUInt;
      break;
    case 'S':
      type.kind = metagen::mdTypeUShort;
      break;
    case 'L':
    case 'Q':
      type.kind = metagen::mdTypeUInt64;
      break;
    case 'f':
      type.kind = metagen::mdTypeFloat;
      break;
    case 'd':
      type.kind = metagen::mdTypeDouble;
      break;
    case 'B':
      type.kind = metagen::mdTypeBool;
      break;
    case 'v':
      type.kind = metagen::mdTypeVoid;
      break;
    case '*':
      type.kind = metagen::mdTypeString;
      break;
    case '@':
      if (std::strncmp(encoding, "@\"NSString\"", 11) == 0) {
        type.kind = metagen::mdTypeNSStringObject;
      } else if (std::strncmp(encoding, "@\"NSMutableString\"", 18) == 0) {
        type.kind = metagen::mdTypeNSMutableStringObject;
      } else {
        type.kind = metagen::mdTypeAnyObject;
      }
      break;
    case '#':
      type.kind = metagen::mdTypeClass;
      break;
    case ':':
      type.kind = metagen::mdTypeSelector;
      break;
    case '^':
      type.kind = metagen::mdTypePointer;
      break;
    case '{':
    case '[':
    case '(':
      type.kind = metagen::mdTypeStruct;
      type.supported = false;
      type.ffiType = nullptr;
      return type;
    default:
      type.kind = metagen::mdTypePointer;
      break;
  }

  type.ffiType = ffiTypeForJsiKind(type.kind);
  type.supported = type.ffiType != nullptr;
  return type;
}

std::optional<NativeApiJsiSignature> parseObjCMethodJsiSignature(Method method) {
  if (method == nullptr) {
    return std::nullopt;
  }

  NativeApiJsiSignature signature;
  signature.implicitArgumentCount = 2;

  char* returnEncoding = method_copyReturnType(method);
  signature.returnType = parseObjCEncodedJsiType(returnEncoding);
  if (returnEncoding != nullptr) {
    free(returnEncoding);
  }

  unsigned int totalArgc = method_getNumberOfArguments(method);
  for (unsigned int i = 2; i < totalArgc; i++) {
    char* argEncoding = method_copyArgumentType(method, i);
    signature.argumentTypes.push_back(parseObjCEncodedJsiType(argEncoding));
    if (argEncoding != nullptr) {
      free(argEncoding);
    }
  }

  signature.ffiTypes.reserve(totalArgc);
  signature.ffiTypes.push_back(&ffi_type_pointer);
  signature.ffiTypes.push_back(&ffi_type_pointer);
  for (const auto& argType : signature.argumentTypes) {
    signature.ffiTypes.push_back(argType.ffiType != nullptr ? argType.ffiType
                                                            : &ffi_type_pointer);
  }

  ffi_status status = ffi_prep_cif(
      &signature.cif, FFI_DEFAULT_ABI,
      static_cast<unsigned int>(signature.ffiTypes.size()),
      signature.returnType.ffiType != nullptr ? signature.returnType.ffiType
                                              : &ffi_type_void,
      signature.ffiTypes.data());
  signature.prepared = status == FFI_OK;
  return signature;
}

bool unsupportedJsiType(const NativeApiJsiType& type) {
  return !type.supported || type.ffiType == nullptr;
}

bool signatureSupportedForJsiCallback(const NativeApiJsiSignature& signature) {
  if (!signature.prepared || signature.variadic ||
      unsupportedJsiType(signature.returnType)) {
    return false;
  }
  for (const auto& argType : signature.argumentTypes) {
    if (unsupportedJsiType(argType)) {
      return false;
    }
  }
  return true;
}

std::shared_ptr<NativeApiJsiCallback> createJsiCallback(
    Runtime& runtime, const std::shared_ptr<NativeApiJsiBridge>& bridge,
    const NativeApiJsiType& type, Function function, bool block) {
  if (bridge == nullptr || bridge->metadata() == nullptr ||
      type.signatureOffset == MD_SECTION_OFFSET_NULL) {
    throw facebook::jsi::JSError(
        runtime, "Native callback metadata is unavailable.");
  }

  auto parsed = parseMetadataJsiSignature(
      bridge->metadata(), type.signatureOffset, block ? 1 : 0, bridge.get());
  if (!parsed || !signatureSupportedForJsiCallback(*parsed)) {
    throw facebook::jsi::JSError(
        runtime, "Native callback signature is not supported by pure JSI.");
  }

  auto signature =
      std::make_shared<NativeApiJsiSignature>(std::move(*parsed));
  auto callback = std::make_shared<NativeApiJsiCallback>(
      runtime, bridge, std::move(signature), std::move(function), block);
  bridge->retainJsiLifetime(callback);
  return callback;
}

id objectFromJsiValue(Runtime& runtime, const Value& value,
                      NativeApiJsiArgumentFrame& frame, bool mutableString) {
  if (value.isNull() || value.isUndefined()) {
    return nil;
  }
  if (value.isString()) {
    std::string utf8 = value.asString(runtime).utf8(runtime);
    id string = mutableString
                    ? [[NSMutableString alloc] initWithUTF8String:utf8.c_str()]
                    : [[NSString alloc] initWithUTF8String:utf8.c_str()];
    frame.addObject(string);
    return string;
  }
  if (value.isBool()) {
    return [NSNumber numberWithBool:value.getBool()];
  }
  if (value.isNumber()) {
    return [NSNumber numberWithDouble:value.getNumber()];
  }
  if (value.isObject()) {
    Object object = value.asObject(runtime);
    if (object.isHostObject<NativeApiObjectHostObject>(runtime)) {
      return object.getHostObject<NativeApiObjectHostObject>(runtime)->object();
    }
    if (object.isHostObject<NativeApiClassHostObject>(runtime)) {
      return static_cast<id>(
          object.getHostObject<NativeApiClassHostObject>(runtime)->nativeClass());
    }
    if (object.isHostObject<NativeApiProtocolHostObject>(runtime)) {
      return static_cast<id>(
          object.getHostObject<NativeApiProtocolHostObject>(runtime)
              ->nativeProtocol());
    }
    if (object.isHostObject<NativeApiPointerHostObject>(runtime)) {
      return static_cast<id>(
          object.getHostObject<NativeApiPointerHostObject>(runtime)->pointer());
    }
    if (object.isHostObject<NativeApiReferenceHostObject>(runtime)) {
      return static_cast<id>(
          object.getHostObject<NativeApiReferenceHostObject>(runtime)->data());
    }
    if (object.isHostObject<NativeApiStructObjectHostObject>(runtime)) {
      return static_cast<id>(
          object.getHostObject<NativeApiStructObjectHostObject>(runtime)->data());
    }

    const uint8_t* bytes = nullptr;
    size_t byteLength = 0;
    if (readJsiBuffer(runtime, object, &bytes, &byteLength)) {
      return [NSData dataWithBytes:bytes length:byteLength];
    }

    if (object.isArray(runtime)) {
      Array array = object.getArray(runtime);
      NSMutableArray* nativeArray =
          [NSMutableArray arrayWithCapacity:array.size(runtime)];
      for (size_t i = 0; i < array.size(runtime); i++) {
        id element = objectFromJsiValue(runtime, array.getValueAtIndex(runtime, i),
                                        frame, false);
        [nativeArray addObject:element != nil ? element : [NSNull null]];
      }
      return nativeArray;
    }

    NSMutableDictionary* dictionary = [NSMutableDictionary dictionary];
    Array propertyNames = object.getPropertyNames(runtime);
    for (size_t i = 0; i < propertyNames.size(runtime); i++) {
      Value propertyNameValue = propertyNames.getValueAtIndex(runtime, i);
      if (!propertyNameValue.isString()) {
        continue;
      }
      std::string key = propertyNameValue.asString(runtime).utf8(runtime);
      Value propertyValue = object.getProperty(runtime, key.c_str());
      if (propertyValue.isUndefined()) {
        continue;
      }
      id nativeValue = objectFromJsiValue(runtime, propertyValue, frame, false);
      NSString* nativeKey = [NSString stringWithUTF8String:key.c_str()];
      if (nativeKey != nil) {
        [dictionary setObject:nativeValue != nil ? nativeValue : [NSNull null]
                       forKey:nativeKey];
      }
    }
    return dictionary;
  }
  throw facebook::jsi::JSError(runtime,
                               "Value cannot be converted to Objective-C object.");
}

bool readNativePointerProperty(Runtime& runtime, const Object& object,
                               void** pointer) {
  if (pointer == nullptr) {
    return false;
  }

  Value nativePointerValue =
      object.getProperty(runtime, "__nativeApiPointer");
  if (nativePointerValue.isNumber()) {
    *pointer = reinterpret_cast<void*>(
        static_cast<uintptr_t>(nativePointerValue.getNumber()));
    return true;
  }

  Value nativeAddressValue = object.getProperty(runtime, "nativeAddress");
  if (nativeAddressValue.isNumber()) {
    *pointer = reinterpret_cast<void*>(
        static_cast<uintptr_t>(nativeAddressValue.getNumber()));
    return true;
  }

  return false;
}

void* pointerFromJsiValue(Runtime& runtime, const Value& value,
                          NativeApiJsiArgumentFrame& frame) {
  if (value.isNull() || value.isUndefined()) {
    return nullptr;
  }
  if (value.isNumber()) {
    return reinterpret_cast<void*>(static_cast<uintptr_t>(value.getNumber()));
  }
  if (value.isObject()) {
    Object object = value.asObject(runtime);
    if (object.isHostObject<NativeApiPointerHostObject>(runtime)) {
      return object.getHostObject<NativeApiPointerHostObject>(runtime)->pointer();
    }
    if (object.isHostObject<NativeApiObjectHostObject>(runtime)) {
      return object.getHostObject<NativeApiObjectHostObject>(runtime)->object();
    }
    if (object.isHostObject<NativeApiClassHostObject>(runtime)) {
      return object.getHostObject<NativeApiClassHostObject>(runtime)->nativeClass();
    }
    if (object.isHostObject<NativeApiProtocolHostObject>(runtime)) {
      return object.getHostObject<NativeApiProtocolHostObject>(runtime)
          ->nativeProtocol();
    }
    if (object.isHostObject<NativeApiReferenceHostObject>(runtime)) {
      return object.getHostObject<NativeApiReferenceHostObject>(runtime)->data();
    }
    if (object.isHostObject<NativeApiStructObjectHostObject>(runtime)) {
      return object.getHostObject<NativeApiStructObjectHostObject>(runtime)->data();
    }
    void* nativePointer = nullptr;
    if (readNativePointerProperty(runtime, object, &nativePointer)) {
      return nativePointer;
    }
    const uint8_t* bytes = nullptr;
    size_t byteLength = 0;
    if (readJsiBuffer(runtime, object, &bytes, &byteLength)) {
      return const_cast<uint8_t*>(bytes);
    }
  }
  if (value.isString()) {
    std::string utf8 = value.asString(runtime).utf8(runtime);
    char* string = strdup(utf8.c_str());
    frame.addCString(string);
    return string;
  }
  throw facebook::jsi::JSError(runtime, "Value cannot be converted to pointer.");
}

template <typename T>
void writeNumericArgument(Runtime& runtime, const Value& value, void* target,
                          const char* typeName) {
  if (!value.isNumber() && !value.isBool()) {
    throw facebook::jsi::JSError(runtime,
                                 std::string("Expected numeric ") + typeName +
                                     " argument.");
  }
  double number = value.isBool() ? (value.getBool() ? 1.0 : 0.0)
                                 : value.getNumber();
  *static_cast<T*>(target) = static_cast<T>(number);
}

void convertJsiArgument(Runtime& runtime,
                        const std::shared_ptr<NativeApiJsiBridge>& bridge,
                        const NativeApiJsiType& type,
                        const Value& value, void* target,
                        NativeApiJsiArgumentFrame& frame);

Value convertNativeReturnValue(Runtime& runtime,
                               const std::shared_ptr<NativeApiJsiBridge>& bridge,
                               const NativeApiJsiType& type, void* value);

void convertAggregateArgument(Runtime& runtime,
                              const std::shared_ptr<NativeApiJsiBridge>& bridge,
                              const NativeApiJsiType& type,
                              const Value& value, void* target,
                              NativeApiJsiArgumentFrame& frame) {
  size_t size = nativeSizeForType(type);
  if (size == 0) {
    return;
  }

  std::memset(target, 0, size);
  if (value.isNull() || value.isUndefined()) {
    return;
  }

  if (value.isObject()) {
    Object object = value.asObject(runtime);
    if (object.isHostObject<NativeApiStructObjectHostObject>(runtime)) {
      auto structObject = object.getHostObject<NativeApiStructObjectHostObject>(runtime);
      if (structObject->data() != nullptr) {
        std::memcpy(target, structObject->data(),
                    std::min(size, static_cast<size_t>(structObject->info()->size)));
      }
      return;
    }
    if (object.isHostObject<NativeApiReferenceHostObject>(runtime)) {
      void* data = object.getHostObject<NativeApiReferenceHostObject>(runtime)->data();
      if (data != nullptr) {
        std::memcpy(target, data, size);
      }
      return;
    }
    if (object.isHostObject<NativeApiPointerHostObject>(runtime)) {
      void* data = object.getHostObject<NativeApiPointerHostObject>(runtime)->pointer();
      if (data != nullptr) {
        std::memcpy(target, data, size);
      }
      return;
    }

    const uint8_t* bytes = nullptr;
    size_t byteLength = 0;
    if (readJsiBuffer(runtime, object, &bytes, &byteLength)) {
      if (bytes != nullptr) {
        std::memcpy(target, bytes, std::min(byteLength, size));
      }
      return;
    }
  }

  if (type.aggregateInfo == nullptr) {
    throw facebook::jsi::JSError(runtime, "Missing native struct metadata.");
  }
  if (!value.isObject()) {
    throw facebook::jsi::JSError(runtime, "Expected struct descriptor object.");
  }

  Object object = value.asObject(runtime);
  for (const auto& field : type.aggregateInfo->fields) {
    if (!object.hasProperty(runtime, field.name.c_str())) {
      continue;
    }
    Value fieldValue = object.getProperty(runtime, field.name.c_str());
    void* fieldTarget = static_cast<uint8_t*>(target) + field.offset;
    convertJsiArgument(runtime, bridge, field.type, fieldValue, fieldTarget,
                       frame);
  }
}

void convertIndexedAggregateArgument(Runtime& runtime,
                                     const std::shared_ptr<NativeApiJsiBridge>& bridge,
                                     const NativeApiJsiType& type,
                                     const Value& value, void* target,
                                     NativeApiJsiArgumentFrame& frame) {
  size_t size = nativeSizeForType(type);
  std::memset(target, 0, size);
  if (value.isNull() || value.isUndefined()) {
    return;
  }
  if (value.isObject()) {
    const uint8_t* bytes = nullptr;
    size_t byteLength = 0;
    if (readJsiBuffer(runtime, value.asObject(runtime), &bytes, &byteLength)) {
      if (bytes != nullptr) {
        std::memcpy(target, bytes, std::min(byteLength, size));
      }
      return;
    }
  }
  if (!value.isObject() || !value.asObject(runtime).isArray(runtime)) {
    throw facebook::jsi::JSError(runtime, "Expected array, ArrayBuffer, or typed array.");
  }

  Array array = value.asObject(runtime).getArray(runtime);
  size_t elementSize = type.elementType != nullptr ? nativeSizeForType(*type.elementType) : 0;
  if (elementSize == 0 || type.elementType == nullptr) {
    throw facebook::jsi::JSError(runtime, "Invalid native array element type.");
  }
  size_t count = std::min<size_t>(type.arraySize, array.size(runtime));
  for (size_t i = 0; i < count; i++) {
    void* slot = static_cast<uint8_t*>(target) + (i * elementSize);
    convertJsiArgument(runtime, bridge, *type.elementType,
                       array.getValueAtIndex(runtime, i), slot, frame);
  }
}

void convertJsiArgument(Runtime& runtime,
                        const std::shared_ptr<NativeApiJsiBridge>& bridge,
                        const NativeApiJsiType& type,
                        const Value& value, void* target,
                        NativeApiJsiArgumentFrame& frame) {
  if (unsupportedJsiType(type)) {
    throw facebook::jsi::JSError(runtime,
                                 "This native signature is not supported by "
                                 "the pure JSI bridge yet.");
  }

  switch (type.kind) {
    case metagen::mdTypeBool:
      if (!value.isNumber() && !value.isBool()) {
        throw facebook::jsi::JSError(runtime,
                                     "Expected boolean or numeric argument.");
      }
      *static_cast<uint8_t*>(target) =
          value.isBool() ? static_cast<uint8_t>(value.getBool())
                         : static_cast<uint8_t>(value.getNumber() != 0);
      break;
    case metagen::mdTypeChar:
      writeNumericArgument<int8_t>(runtime, value, target, "int8");
      break;
    case metagen::mdTypeUChar:
    case metagen::mdTypeUInt8:
      writeNumericArgument<uint8_t>(runtime, value, target, "uint8");
      break;
    case metagen::mdTypeSShort:
      writeNumericArgument<int16_t>(runtime, value, target, "int16");
      break;
    case metagen::mdTypeUShort:
      if (value.isString()) {
        std::string text = value.asString(runtime).utf8(runtime);
        if (text.size() != 1) {
          throw facebook::jsi::JSError(
              runtime, "Expected a single-character string.");
        }
        *static_cast<uint16_t*>(target) =
            static_cast<uint16_t>(static_cast<unsigned char>(text[0]));
      } else {
        writeNumericArgument<uint16_t>(runtime, value, target, "uint16");
      }
      break;
    case metagen::mdTypeSInt:
      writeNumericArgument<int32_t>(runtime, value, target, "int32");
      break;
    case metagen::mdTypeUInt:
      writeNumericArgument<uint32_t>(runtime, value, target, "uint32");
      break;
    case metagen::mdTypeSLong:
    case metagen::mdTypeSInt64:
      writeNumericArgument<int64_t>(runtime, value, target, "int64");
      break;
    case metagen::mdTypeULong:
    case metagen::mdTypeUInt64:
      writeNumericArgument<uint64_t>(runtime, value, target, "uint64");
      break;
    case metagen::mdTypeFloat:
      writeNumericArgument<float>(runtime, value, target, "float");
      break;
    case metagen::mdTypeDouble:
      writeNumericArgument<double>(runtime, value, target, "double");
      break;
    case metagen::mdTypeString: {
      if (value.isNull() || value.isUndefined()) {
        *static_cast<char**>(target) = nullptr;
        break;
      }
      if (!value.isString()) {
        throw facebook::jsi::JSError(runtime, "Expected string argument.");
      }
      std::string utf8 = value.asString(runtime).utf8(runtime);
      char* string = strdup(utf8.c_str());
      frame.addCString(string);
      *static_cast<char**>(target) = string;
      break;
    }
    case metagen::mdTypeAnyObject:
    case metagen::mdTypeProtocolObject:
    case metagen::mdTypeClassObject:
    case metagen::mdTypeInstanceObject:
    case metagen::mdTypeNSStringObject:
    case metagen::mdTypeNSMutableStringObject: {
      id object = objectFromJsiValue(
          runtime, value, frame,
          type.kind == metagen::mdTypeNSMutableStringObject);
      *static_cast<id*>(target) = object;
      break;
    }
    case metagen::mdTypeClass: {
      Class cls = nil;
      if (value.isString()) {
        std::string name = value.asString(runtime).utf8(runtime);
        cls = objc_lookUpClass(name.c_str());
      } else if (value.isObject()) {
        Object object = value.asObject(runtime);
        if (object.isHostObject<NativeApiClassHostObject>(runtime)) {
          cls = object.getHostObject<NativeApiClassHostObject>(runtime)
                    ->nativeClass();
        } else if (object.isHostObject<NativeApiObjectHostObject>(runtime)) {
          id nativeObject =
              object.getHostObject<NativeApiObjectHostObject>(runtime)->object();
          cls = nativeObject != nil ? object_getClass(nativeObject) : nil;
        }
      }
      *static_cast<Class*>(target) = cls;
      break;
    }
    case metagen::mdTypeSelector: {
      if (value.isNull() || value.isUndefined()) {
        *static_cast<SEL*>(target) = nullptr;
        break;
      }
      if (!value.isString()) {
        throw facebook::jsi::JSError(runtime, "Expected selector string.");
      }
      std::string selectorName = value.asString(runtime).utf8(runtime);
      *static_cast<SEL*>(target) = sel_registerName(selectorName.c_str());
      break;
    }
    case metagen::mdTypePointer:
      if (value.isObject()) {
        Object object = value.asObject(runtime);
        if (object.isHostObject<NativeApiReferenceHostObject>(runtime)) {
          auto reference = object.getHostObject<NativeApiReferenceHostObject>(runtime);
          if (type.elementType != nullptr) {
            reference->ensureStorage(*type.elementType);
          }
          *static_cast<void**>(target) = reference->data();
          break;
        }
      }
      *static_cast<void**>(target) = pointerFromJsiValue(runtime, value, frame);
      break;
    case metagen::mdTypeOpaquePointer:
      *static_cast<void**>(target) = pointerFromJsiValue(runtime, value, frame);
      break;
    case metagen::mdTypeBlock:
    case metagen::mdTypeFunctionPointer: {
      if (value.isObject()) {
        Object object = value.asObject(runtime);
        void* nativePointer = nullptr;
        if (readNativePointerProperty(runtime, object, &nativePointer)) {
          *static_cast<void**>(target) = nativePointer;
          break;
        }
        if (object.isFunction(runtime)) {
          auto callback = createJsiCallback(
              runtime, bridge, type, object.asFunction(runtime),
              type.kind == metagen::mdTypeBlock);
          void* pointer = callback->functionPointer();
          try {
            object.setProperty(
                runtime, "__nativeApiPointer",
                static_cast<double>(reinterpret_cast<uintptr_t>(pointer)));
          } catch (const std::exception&) {
          }
          *static_cast<void**>(target) = pointer;
          break;
        }
      }
      *static_cast<void**>(target) = pointerFromJsiValue(runtime, value, frame);
      break;
    }
    case metagen::mdTypeStruct:
      convertAggregateArgument(runtime, bridge, type, value, target, frame);
      break;
    case metagen::mdTypeArray:
    case metagen::mdTypeVector:
    case metagen::mdTypeExtVector:
    case metagen::mdTypeComplex:
      convertIndexedAggregateArgument(runtime, bridge, type, value, target,
                                      frame);
      break;
    default:
      throw facebook::jsi::JSError(runtime, "Unsupported JSI argument type.");
  }
}

Value convertNativeReturnValue(Runtime& runtime,
                               const std::shared_ptr<NativeApiJsiBridge>& bridge,
                               const NativeApiJsiType& type, void* value) {
  if (unsupportedJsiType(type)) {
    throw facebook::jsi::JSError(runtime,
                                 "This native return type is not supported by "
                                 "the pure JSI bridge yet.");
  }

  switch (type.kind) {
    case metagen::mdTypeVoid:
      return Value::undefined();
    case metagen::mdTypeBool:
      return *static_cast<uint8_t*>(value) != 0;
    case metagen::mdTypeChar:
      return static_cast<double>(*static_cast<int8_t*>(value));
    case metagen::mdTypeUChar:
    case metagen::mdTypeUInt8:
      return static_cast<double>(*static_cast<uint8_t*>(value));
    case metagen::mdTypeSShort:
      return static_cast<double>(*static_cast<int16_t*>(value));
    case metagen::mdTypeUShort: {
      uint16_t raw = *static_cast<uint16_t*>(value);
      if (raw >= 32 && raw <= 126) {
        char buffer[2] = {static_cast<char>(raw), '\0'};
        return String::createFromUtf8(runtime, buffer);
      }
      return static_cast<double>(raw);
    }
    case metagen::mdTypeSInt:
      return static_cast<double>(*static_cast<int32_t*>(value));
    case metagen::mdTypeUInt:
      return static_cast<double>(*static_cast<uint32_t*>(value));
    case metagen::mdTypeSLong:
    case metagen::mdTypeSInt64:
      return static_cast<double>(*static_cast<int64_t*>(value));
    case metagen::mdTypeULong:
    case metagen::mdTypeUInt64:
      return static_cast<double>(*static_cast<uint64_t*>(value));
    case metagen::mdTypeFloat:
      return static_cast<double>(*static_cast<float*>(value));
    case metagen::mdTypeDouble:
      return *static_cast<double*>(value);
    case metagen::mdTypeString: {
      const char* string = *static_cast<const char**>(value);
      return string != nullptr ? makeString(runtime, string) : Value::null();
    }
    case metagen::mdTypeAnyObject:
    case metagen::mdTypeProtocolObject:
    case metagen::mdTypeClassObject:
    case metagen::mdTypeInstanceObject:
    case metagen::mdTypeNSStringObject:
    case metagen::mdTypeNSMutableStringObject: {
      id object = *static_cast<id*>(value);
      if (object == nil) {
        return Value::null();
      }
      if ([object isKindOfClass:[NSString class]]) {
        std::string utf8 = [static_cast<NSString*>(object) UTF8String] ?: "";
        if (type.returnOwned) {
          [object release];
        }
        return makeString(runtime, utf8);
      }
      if ([object isKindOfClass:[NSNumber class]]) {
        NSNumber* number = static_cast<NSNumber*>(object);
        const char* objCType = [number objCType];
        bool isBool =
            objCType != nullptr && std::strcmp(objCType, @encode(BOOL)) == 0;
        Value result = isBool ? Value(static_cast<bool>([number boolValue]))
                              : Value([number doubleValue]);
        if (type.returnOwned) {
          [object release];
        }
        return result;
      }
      return Object::createFromHostObject(
          runtime, std::make_shared<NativeApiObjectHostObject>(
                       bridge, object, type.returnOwned));
    }
    case metagen::mdTypeClass: {
      Class cls = *static_cast<Class*>(value);
      if (cls == nil) {
        return Value::null();
      }
      const char* name = class_getName(cls);
      NativeApiSymbol symbol{
          .kind = NativeApiSymbolKind::Class,
          .offset = MD_SECTION_OFFSET_NULL,
          .name = name != nullptr ? name : "",
          .runtimeName = name != nullptr ? name : "",
      };
      if (const NativeApiSymbol* found = bridge->findClass(symbol.name)) {
        symbol = *found;
      }
      return Object::createFromHostObject(
          runtime,
          std::make_shared<NativeApiClassHostObject>(bridge, std::move(symbol)));
    }
    case metagen::mdTypeSelector: {
      SEL selector = *static_cast<SEL*>(value);
      const char* selectorName = selector != nullptr ? sel_getName(selector) : nullptr;
      return selectorName != nullptr ? makeString(runtime, selectorName)
                                     : Value::null();
    }
    case metagen::mdTypePointer:
    case metagen::mdTypeOpaquePointer: {
      void* pointer = *static_cast<void**>(value);
      if (pointer == nullptr) {
        return Value::null();
      }
      return Object::createFromHostObject(
          runtime, std::make_shared<NativeApiPointerHostObject>(pointer));
    }
    case metagen::mdTypeBlock:
    case metagen::mdTypeFunctionPointer: {
      void* pointer = *static_cast<void**>(value);
      if (pointer == nullptr) {
        return Value::null();
      }
      return wrapNativeFunctionPointer(runtime, bridge, type, pointer,
                                       type.kind == metagen::mdTypeBlock);
    }
    case metagen::mdTypeStruct:
      if (type.aggregateInfo == nullptr) {
        return ArrayBuffer(
            runtime, std::make_shared<NativeApiMutableBuffer>(
                         value, nativeSizeForType(type)));
      }
      return Object::createFromHostObject(
          runtime, std::make_shared<NativeApiStructObjectHostObject>(
                       bridge, type.aggregateInfo, value, true));
    case metagen::mdTypeArray:
    case metagen::mdTypeVector:
    case metagen::mdTypeExtVector:
    case metagen::mdTypeComplex: {
      Array result(runtime, type.arraySize);
      if (type.elementType == nullptr) {
        return result;
      }
      size_t elementSize = nativeSizeForType(*type.elementType);
      auto base = static_cast<uint8_t*>(value);
      for (uint16_t i = 0; i < type.arraySize; i++) {
        result.setValueAtIndex(
            runtime, i,
            convertNativeReturnValue(runtime, bridge, *type.elementType,
                                     base + (static_cast<size_t>(i) * elementSize)));
      }
      return result;
    }
    default:
      throw facebook::jsi::JSError(runtime, "Unsupported JSI return type.");
  }
}

Value NativeApiReferenceHostObject::get(Runtime& runtime,
                                        const PropNameID& name) {
  std::string property = name.utf8(runtime);
  if (property == "kind") {
    return makeString(runtime, "reference");
  }
  if (property == "address") {
    return static_cast<double>(reinterpret_cast<uintptr_t>(data_));
  }
  if (property == "value") {
    if (data_ == nullptr) {
      return Value::undefined();
    }
    return convertNativeReturnValue(runtime, bridge_, type_, data_);
  }
  if (property == "toString") {
    void* data = data_;
    return Function::createFromHostFunction(
        runtime, PropNameID::forAscii(runtime, "toString"), 0,
        [data](Runtime& runtime, const Value&, const Value*, size_t) -> Value {
          char address[32] = {};
          snprintf(address, sizeof(address), "%p", data);
          return makeString(runtime, "[NativeApiJsi Reference " +
                                         std::string(address) + "]");
        });
  }
  return Value::undefined();
}

void NativeApiReferenceHostObject::set(Runtime& runtime,
                                       const PropNameID& name,
                                       const Value& value) {
  std::string property = name.utf8(runtime);
  if (property != "value") {
    return;
  }
  if (data_ == nullptr) {
    size_t size = nativeSizeForType(type_);
    data_ = calloc(1, std::max<size_t>(size, sizeof(void*)));
    ownsData_ = true;
  }
  NativeApiJsiArgumentFrame frame(1);
  convertJsiArgument(runtime, bridge_, type_, value, data_, frame);
}

Value NativeApiStructObjectHostObject::get(Runtime& runtime,
                                           const PropNameID& name) {
  std::string property = name.utf8(runtime);
  if (property == "kind") {
    return makeString(runtime, info_ != nullptr && info_->isUnion ? "union" : "struct");
  }
  if (property == "name") {
    return makeString(runtime, info_ != nullptr ? info_->name : "");
  }
  if (property == "sizeof") {
    return static_cast<double>(info_ != nullptr ? info_->size : 0);
  }
  if (property == "address") {
    return static_cast<double>(reinterpret_cast<uintptr_t>(data_));
  }
  if (property == "toString") {
    auto info = info_;
    return Function::createFromHostFunction(
        runtime, PropNameID::forAscii(runtime, "toString"), 0,
        [info](Runtime& runtime, const Value&, const Value*, size_t) -> Value {
          return makeString(runtime,
                            std::string("[NativeApiJsi ") +
                                (info != nullptr && info->isUnion ? "Union " : "Struct ") +
                                (info != nullptr ? info->name : "") + "]");
        });
  }

  if (info_ != nullptr && data_ != nullptr) {
    for (const auto& field : info_->fields) {
      if (field.name != property) {
        continue;
      }
      void* fieldData = static_cast<uint8_t*>(data_) + field.offset;
      return convertNativeReturnValue(runtime, bridge_, field.type, fieldData);
    }
  }
  return Value::undefined();
}

void NativeApiStructObjectHostObject::set(Runtime& runtime,
                                          const PropNameID& name,
                                          const Value& value) {
  std::string property = name.utf8(runtime);
  if (info_ == nullptr || data_ == nullptr) {
    throw facebook::jsi::JSError(runtime, "Struct is not initialized.");
  }
  for (const auto& field : info_->fields) {
    if (field.name != property) {
      continue;
    }
    NativeApiJsiArgumentFrame frame(1);
    convertJsiArgument(runtime, bridge_, field.type, value,
                       static_cast<uint8_t*>(data_) + field.offset, frame);
    return;
  }
  throw facebook::jsi::JSError(runtime, "No native struct field: " + property);
}

std::vector<PropNameID> NativeApiStructObjectHostObject::getPropertyNames(
    Runtime& runtime) {
  std::vector<PropNameID> names;
  addPropertyName(runtime, names, "kind");
  addPropertyName(runtime, names, "name");
  addPropertyName(runtime, names, "sizeof");
  addPropertyName(runtime, names, "address");
  addPropertyName(runtime, names, "toString");
  if (info_ != nullptr) {
    for (const auto& field : info_->fields) {
      addPropertyName(runtime, names, field.name.c_str());
    }
  }
  return names;
}

NativeApiJsiType primitiveInteropType(MDTypeKind kind) {
  NativeApiJsiType type;
  type.kind = kind;
  type.ffiType = ffiTypeForJsiKind(kind);
  type.supported = type.ffiType != nullptr;
  return type;
}

std::optional<NativeApiJsiType> interopTypeFromValue(
    Runtime& runtime, const std::shared_ptr<NativeApiJsiBridge>& bridge,
    const Value& value) {
  if (value.isNumber()) {
    MDTypeKind kind = stripTypeFlags(static_cast<MDTypeKind>(
        static_cast<int32_t>(value.getNumber())));
    switch (kind) {
      case metagen::mdTypeVoid:
      case metagen::mdTypeBool:
      case metagen::mdTypeChar:
      case metagen::mdTypeUChar:
      case metagen::mdTypeUInt8:
      case metagen::mdTypeSShort:
      case metagen::mdTypeUShort:
      case metagen::mdTypeSInt:
      case metagen::mdTypeUInt:
      case metagen::mdTypeSLong:
      case metagen::mdTypeULong:
      case metagen::mdTypeSInt64:
      case metagen::mdTypeUInt64:
      case metagen::mdTypeFloat:
      case metagen::mdTypeDouble:
      case metagen::mdTypeString:
      case metagen::mdTypeAnyObject:
      case metagen::mdTypeClass:
      case metagen::mdTypeSelector:
      case metagen::mdTypePointer:
      case metagen::mdTypeOpaquePointer:
      case metagen::mdTypeBlock:
      case metagen::mdTypeFunctionPointer:
        return primitiveInteropType(kind);
      default:
        return std::nullopt;
    }
  }

  if (!value.isObject()) {
    return std::nullopt;
  }

  Object object = value.asObject(runtime);
  if (object.isHostObject<NativeApiStructObjectHostObject>(runtime)) {
    auto structObject = object.getHostObject<NativeApiStructObjectHostObject>(runtime);
    NativeApiJsiType type;
    type.kind = metagen::mdTypeStruct;
    type.aggregateInfo = structObject->info();
    type.aggregateOffset = type.aggregateInfo != nullptr
                               ? type.aggregateInfo->offset
                               : MD_SECTION_OFFSET_NULL;
    type.aggregateIsUnion = type.aggregateInfo != nullptr &&
                            type.aggregateInfo->isUnion;
    type.ffiType = type.aggregateInfo != nullptr && type.aggregateInfo->ffi != nullptr
                       ? &type.aggregateInfo->ffi->type
                       : nullptr;
    type.supported = type.ffiType != nullptr;
    return type;
  }

  Value kindValue = object.getProperty(runtime, "kind");
  Value offsetValue = object.getProperty(runtime, "metadataOffset");
  if (kindValue.isString() && offsetValue.isNumber()) {
    std::string kindName = kindValue.asString(runtime).utf8(runtime);
    if (kindName == "struct" || kindName == "union") {
      bool isUnion = kindName == "union";
      auto info = bridge->aggregateInfoFor(
          static_cast<MDSectionOffset>(offsetValue.getNumber()), isUnion);
      NativeApiJsiType type;
      type.kind = metagen::mdTypeStruct;
      type.aggregateInfo = info;
      type.aggregateOffset = info != nullptr ? info->offset : MD_SECTION_OFFSET_NULL;
      type.aggregateIsUnion = isUnion;
      type.ffiType = info != nullptr && info->ffi != nullptr ? &info->ffi->type : nullptr;
      type.supported = type.ffiType != nullptr;
      return type;
    }
  }

  return std::nullopt;
}

Value makeAggregateConstructor(Runtime& runtime,
                               const std::shared_ptr<NativeApiJsiBridge>& bridge,
                               const NativeApiSymbol& symbol) {
  auto info = bridge->aggregateInfoFor(symbol);
  auto constructor = Function::createFromHostFunction(
      runtime, PropNameID::forAscii(runtime, symbol.name.c_str()), 1,
      [bridge, symbol, info](Runtime& runtime, const Value&, const Value* args,
                             size_t count) -> Value {
        if (info == nullptr) {
          throw facebook::jsi::JSError(runtime,
                                       "Native aggregate metadata is unavailable: " +
                                           symbol.name);
        }

        NativeApiJsiType type;
        type.kind = metagen::mdTypeStruct;
        type.aggregateInfo = info;
        type.aggregateOffset = info->offset;
        type.aggregateIsUnion = info->isUnion;
        type.ffiType = info->ffi != nullptr ? &info->ffi->type : nullptr;
        type.supported = type.ffiType != nullptr;

        std::vector<unsigned char> storage(info->size, 0);
        if (count > 0) {
          NativeApiJsiArgumentFrame frame(1);
          convertAggregateArgument(runtime, bridge, type, args[0],
                                   storage.data(), frame);
        }
        return Object::createFromHostObject(
            runtime, std::make_shared<NativeApiStructObjectHostObject>(
                         bridge, info, storage.data(), true));
      });

  constructor.setProperty(runtime, "kind",
                          makeString(runtime, symbol.kind == NativeApiSymbolKind::Union
                                                   ? "union"
                                                   : "struct"));
  constructor.setProperty(runtime, "name", makeString(runtime, symbol.name));
  constructor.setProperty(runtime, "runtimeName", makeString(runtime, symbol.runtimeName));
  constructor.setProperty(runtime, "metadataOffset", static_cast<double>(symbol.offset));
  constructor.setProperty(runtime, "sizeof",
                          static_cast<double>(info != nullptr ? info->size : 0));
  Array fields(runtime, info != nullptr ? info->fields.size() : 0);
  if (info != nullptr) {
    for (size_t i = 0; i < info->fields.size(); i++) {
      fields.setValueAtIndex(runtime, i, makeString(runtime, info->fields[i].name));
    }
  }
  constructor.setProperty(runtime, "fields", fields);
  return constructor;
}

size_t sizeofInteropType(Runtime& runtime,
                         const std::shared_ptr<NativeApiJsiBridge>& bridge,
                         const Value& value) {
  if (auto type = interopTypeFromValue(runtime, bridge, value)) {
    return nativeSizeForType(*type);
  }

  if (value.isObject()) {
    Object object = value.asObject(runtime);
    if (object.isHostObject<NativeApiPointerHostObject>(runtime) ||
        object.isHostObject<NativeApiReferenceHostObject>(runtime) ||
        object.isHostObject<NativeApiObjectHostObject>(runtime) ||
        object.isHostObject<NativeApiClassHostObject>(runtime)) {
      return sizeof(void*);
    }
    Value sizeValue = object.getProperty(runtime, "sizeof");
    if (sizeValue.isNumber()) {
      return static_cast<size_t>(sizeValue.getNumber());
    }
  }

  throw facebook::jsi::JSError(runtime, "Invalid type for interop.sizeof.");
}

Object createPointer(Runtime& runtime, void* pointer, bool adopted = false) {
  return Object::createFromHostObject(
      runtime, std::make_shared<NativeApiPointerHostObject>(pointer, "pointer",
                                                            adopted));
}

Class classFromJsiValue(Runtime& runtime, const Value& value) {
  if (value.isString()) {
    std::string name = value.asString(runtime).utf8(runtime);
    return objc_lookUpClass(name.c_str());
  }
  if (!value.isObject()) {
    return Nil;
  }
  Object object = value.asObject(runtime);
  if (object.isHostObject<NativeApiClassHostObject>(runtime)) {
    return object.getHostObject<NativeApiClassHostObject>(runtime)->nativeClass();
  }
  if (object.isHostObject<NativeApiObjectHostObject>(runtime)) {
    id nativeObject = object.getHostObject<NativeApiObjectHostObject>(runtime)->object();
    return nativeObject != nil ? object_getClass(nativeObject) : Nil;
  }
  return Nil;
}

Protocol* protocolFromJsiValue(Runtime& runtime, const Value& value) {
  if (value.isString()) {
    std::string name = value.asString(runtime).utf8(runtime);
    Protocol* protocol = objc_getProtocol(name.c_str());
    if (protocol == nullptr) {
      constexpr const char* suffix = "Protocol";
      if (name.size() > std::strlen(suffix) &&
          name.compare(name.size() - std::strlen(suffix), std::strlen(suffix),
                       suffix) == 0) {
        protocol = objc_getProtocol(
            name.substr(0, name.size() - std::strlen(suffix)).c_str());
      }
    }
    return protocol;
  }
  if (!value.isObject()) {
    return nullptr;
  }
  Object object = value.asObject(runtime);
  if (object.isHostObject<NativeApiProtocolHostObject>(runtime)) {
    return object.getHostObject<NativeApiProtocolHostObject>(runtime)
        ->nativeProtocol();
  }
  if (object.isHostObject<NativeApiPointerHostObject>(runtime)) {
    return static_cast<Protocol*>(
        object.getHostObject<NativeApiPointerHostObject>(runtime)->pointer());
  }
  void* nativePointer = nullptr;
  if (readNativePointerProperty(runtime, object, &nativePointer)) {
    return static_cast<Protocol*>(nativePointer);
  }
  Value nameValue = object.getProperty(runtime, "name");
  if (nameValue.isString()) {
    return protocolFromJsiValue(runtime, nameValue);
  }
  return nullptr;
}

Object createInteropObject(Runtime& runtime,
                           const std::shared_ptr<NativeApiJsiBridge>& bridge) {
  Object interop(runtime);
  Object types(runtime);
  auto setType = [&](const char* name, MDTypeKind kind) {
    types.setProperty(runtime, name, static_cast<double>(kind));
  };
  setType("void", metagen::mdTypeVoid);
  setType("bool", metagen::mdTypeBool);
  setType("int8", metagen::mdTypeChar);
  setType("uint8", metagen::mdTypeUInt8);
  setType("int16", metagen::mdTypeSShort);
  setType("uint16", metagen::mdTypeUShort);
  setType("int32", metagen::mdTypeSInt);
  setType("uint32", metagen::mdTypeUInt);
  setType("int64", metagen::mdTypeSInt64);
  setType("uint64", metagen::mdTypeUInt64);
  setType("float", metagen::mdTypeFloat);
  setType("double", metagen::mdTypeDouble);
  setType("UTF8CString", metagen::mdTypeString);
  setType("unichar", metagen::mdTypeUShort);
  setType("id", metagen::mdTypeAnyObject);
  setType("class", metagen::mdTypeClass);
  setType("SEL", metagen::mdTypeSelector);
  setType("selector", metagen::mdTypeSelector);
  setType("pointer", metagen::mdTypePointer);
  setType("block", metagen::mdTypeBlock);
  setType("functionPointer", metagen::mdTypeFunctionPointer);
  interop.setProperty(runtime, "types", types);

  interop.setProperty(
      runtime, "Pointer",
      Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "Pointer"), 1,
          [](Runtime& runtime, const Value&, const Value* args,
             size_t count) -> Value {
            if (count > 0 && args[0].isObject()) {
              Object object = args[0].asObject(runtime);
              if (object.isHostObject<NativeApiPointerHostObject>(runtime)) {
                return Value(runtime, object);
              }
            }
            void* pointer = nullptr;
            if (count > 0 && !args[0].isNull() && !args[0].isUndefined()) {
              if (!args[0].isNumber()) {
                throw facebook::jsi::JSError(runtime,
                                             "Pointer expects a numeric address.");
              }
              pointer = reinterpret_cast<void*>(
                  static_cast<uintptr_t>(args[0].getNumber()));
            }
            return createPointer(runtime, pointer);
          }));

  interop.setProperty(
      runtime, "Reference",
      Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "Reference"), 2,
          [bridge](Runtime& runtime, const Value&, const Value* args,
                   size_t count) -> Value {
            NativeApiJsiType type = primitiveInteropType(metagen::mdTypePointer);
            bool hasType = count > 0 &&
                           interopTypeFromValue(runtime, bridge, args[0]).has_value();
            if (hasType) {
              type = *interopTypeFromValue(runtime, bridge, args[0]);
            }

            size_t size = hasType ? nativeSizeForType(type) : sizeof(void*);
            void* data = nullptr;
            bool ownsData = false;
            if (hasType) {
              data = calloc(1, std::max<size_t>(size, sizeof(void*)));
              ownsData = true;
              if (count > 1) {
                NativeApiJsiArgumentFrame frame(1);
                convertJsiArgument(runtime, bridge, type, args[1], data, frame);
              }
            }

            return Object::createFromHostObject(
                runtime, std::make_shared<NativeApiReferenceHostObject>(
                             bridge, type, data, ownsData));
          }));

  interop.setProperty(
      runtime, "sizeof",
      Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "sizeof"), 1,
          [bridge](Runtime& runtime, const Value&, const Value* args,
                   size_t count) -> Value {
            if (count < 1) {
              throw facebook::jsi::JSError(runtime, "sizeof expects a type.");
            }
            return static_cast<double>(sizeofInteropType(runtime, bridge, args[0]));
          }));

  interop.setProperty(
      runtime, "alloc",
      Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "alloc"), 1,
          [](Runtime& runtime, const Value&, const Value* args,
             size_t count) -> Value {
            if (count < 1 || !args[0].isNumber()) {
              throw facebook::jsi::JSError(runtime, "alloc expects a byte size.");
            }
            size_t size = static_cast<size_t>(std::max<double>(0, args[0].getNumber()));
            return createPointer(runtime, calloc(1, size), false);
          }));

  interop.setProperty(
      runtime, "free",
      Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "free"), 1,
          [](Runtime& runtime, const Value&, const Value* args,
             size_t count) -> Value {
            if (count < 1 || !args[0].isObject()) {
              return Value::undefined();
            }
            Object object = args[0].asObject(runtime);
            if (!object.isHostObject<NativeApiPointerHostObject>(runtime)) {
              return Value::undefined();
            }
            auto pointer = object.getHostObject<NativeApiPointerHostObject>(runtime);
            void* raw = pointer->pointer();
            if (raw != nullptr) {
              free(raw);
              pointer->clearWithoutFree();
            }
            return Value::undefined();
          }));

  interop.setProperty(
      runtime, "adopt",
      Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "adopt"), 1,
          [](Runtime& runtime, const Value&, const Value* args,
             size_t count) -> Value {
            if (count < 1 || !args[0].isObject()) {
              throw facebook::jsi::JSError(runtime, "adopt expects a Pointer.");
            }
            Object object = args[0].asObject(runtime);
            if (!object.isHostObject<NativeApiPointerHostObject>(runtime)) {
              throw facebook::jsi::JSError(runtime, "adopt expects a Pointer.");
            }
            object.getHostObject<NativeApiPointerHostObject>(runtime)->adopt();
            return Value(runtime, object);
          }));

  interop.setProperty(
      runtime, "handleof",
      Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "handleof"), 1,
          [bridge](Runtime& runtime, const Value&, const Value* args,
                   size_t count) -> Value {
            if (count < 1 || args[0].isNull() || args[0].isUndefined()) {
              return Value::null();
            }
            if (args[0].isString()) {
              std::string utf8 = args[0].asString(runtime).utf8(runtime);
              char* data = strdup(utf8.c_str());
              return createPointer(runtime, data);
            }
            if (!args[0].isObject()) {
              return Value::null();
            }
            Object object = args[0].asObject(runtime);
            if (object.isHostObject<NativeApiPointerHostObject>(runtime)) {
              return Value(runtime, object);
            }
            if (object.isHostObject<NativeApiReferenceHostObject>(runtime)) {
              return createPointer(
                  runtime,
                  object.getHostObject<NativeApiReferenceHostObject>(runtime)->data());
            }
            if (object.isHostObject<NativeApiStructObjectHostObject>(runtime)) {
              return createPointer(
                  runtime,
                  object.getHostObject<NativeApiStructObjectHostObject>(runtime)->data());
            }
            if (object.isHostObject<NativeApiObjectHostObject>(runtime)) {
              return createPointer(
                  runtime,
                  object.getHostObject<NativeApiObjectHostObject>(runtime)->object());
            }
            if (object.isHostObject<NativeApiClassHostObject>(runtime)) {
              return createPointer(
                  runtime,
                  object.getHostObject<NativeApiClassHostObject>(runtime)->nativeClass());
            }
            if (object.isHostObject<NativeApiProtocolHostObject>(runtime)) {
              return createPointer(
                  runtime,
                  object.getHostObject<NativeApiProtocolHostObject>(runtime)
                      ->nativeProtocol());
            }
            void* nativePointer = nullptr;
            if (readNativePointerProperty(runtime, object, &nativePointer)) {
              return createPointer(runtime, nativePointer);
            }
            Value nativeName = object.getProperty(runtime, "nativeName");
            if (nativeName.isString()) {
              std::string name = nativeName.asString(runtime).utf8(runtime);
              void* symbol = dlsym(bridge->selfDl(), name.c_str());
              if (symbol != nullptr) {
                return createPointer(runtime, symbol);
              }
            }
            return Value::null();
          }));

  interop.setProperty(
      runtime, "stringFromCString",
      Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "stringFromCString"), 2,
          [](Runtime& runtime, const Value&, const Value* args,
             size_t count) -> Value {
            if (count < 1 || args[0].isNull() || args[0].isUndefined()) {
              return Value::null();
            }
            NativeApiJsiArgumentFrame frame(1);
            const char* data =
                static_cast<const char*>(pointerFromJsiValue(runtime, args[0], frame));
            if (data == nullptr) {
              return Value::null();
            }
            if (count > 1 && args[1].isNumber()) {
              size_t length = static_cast<size_t>(std::max<double>(0, args[1].getNumber()));
              return String::createFromUtf8(runtime,
                                            reinterpret_cast<const uint8_t*>(data),
                                            length);
            }
            return makeString(runtime, data);
          }));

  interop.setProperty(
      runtime, "bufferFromData",
      Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "bufferFromData"), 1,
          [](Runtime& runtime, const Value&, const Value* args,
             size_t count) -> Value {
            if (count < 1 || !args[0].isObject()) {
              throw facebook::jsi::JSError(runtime, "Invalid data.");
            }
            Object object = args[0].asObject(runtime);
            if (object.isArrayBuffer(runtime)) {
              return Value(runtime, object);
            }
            id native = nil;
            if (object.isHostObject<NativeApiObjectHostObject>(runtime)) {
              native = object.getHostObject<NativeApiObjectHostObject>(runtime)->object();
            } else if (object.isHostObject<NativeApiPointerHostObject>(runtime)) {
              native = static_cast<id>(
                  object.getHostObject<NativeApiPointerHostObject>(runtime)->pointer());
            }
            if (native == nil || ![native isKindOfClass:[NSData class]]) {
              throw facebook::jsi::JSError(runtime, "Invalid data.");
            }
            NSData* data = static_cast<NSData*>(native);
            return ArrayBuffer(
                runtime, std::make_shared<NativeApiMutableBuffer>(
                             data.bytes, static_cast<size_t>(data.length)));
          }));

  interop.setProperty(
      runtime, "addMethod",
      Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "addMethod"), 2,
          [](Runtime& runtime, const Value&, const Value*, size_t) -> Value {
            throw facebook::jsi::JSError(
                runtime,
                "interop.addMethod requires the JSI class builder layer.");
          }));
  interop.setProperty(
      runtime, "addProtocol",
      Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "addProtocol"), 2,
          [](Runtime& runtime, const Value&, const Value* args,
             size_t count) -> Value {
            if (count < 2) {
              throw facebook::jsi::JSError(
                  runtime, "interop.addProtocol expects class and protocol.");
            }
            Class cls = classFromJsiValue(runtime, args[0]);
            Protocol* protocol = protocolFromJsiValue(runtime, args[1]);
            if (cls == Nil || protocol == nullptr) {
              return false;
            }
            return class_addProtocol(cls, protocol);
          }));

  return interop;
}

bool isValidMetadataStringOffset(MDMetadataReader* metadata,
                                 MDSectionOffset offset) {
  if (metadata == nullptr || metadata->constantsOffset < metadata->stringsOffset) {
    return false;
  }
  return offset < metadata->constantsOffset - metadata->stringsOffset;
}

Value enumToObject(Runtime& runtime, MDMetadataReader* metadata,
                   const NativeApiSymbol& symbol) {
  Object result(runtime);
  if (metadata == nullptr || symbol.offset == MD_SECTION_OFFSET_NULL) {
    return result;
  }

  MDSectionOffset offset = symbol.offset + sizeof(MDSectionOffset);
  bool next = true;
  while (next) {
    auto nameOffset = metadata->getOffset(offset);
    next = (nameOffset & metagen::mdSectionOffsetNext) != 0;
    nameOffset &= ~metagen::mdSectionOffsetNext;
    offset += sizeof(MDSectionOffset);

    const char* memberName = metadata->resolveString(nameOffset);
    int64_t value = metadata->getEnumValue(offset);
    offset += sizeof(int64_t);
    result.setProperty(runtime, memberName, static_cast<double>(value));
  }
  return result;
}

Value constantToValue(Runtime& runtime,
                      const std::shared_ptr<NativeApiJsiBridge>& bridge,
                      const NativeApiSymbol& symbol) {
  MDMetadataReader* metadata = bridge->metadata();
  if (metadata == nullptr || symbol.offset == MD_SECTION_OFFSET_NULL) {
    return Value::undefined();
  }

  MDSectionOffset offset = symbol.offset + sizeof(MDSectionOffset);
  auto evalKind = metadata->getVariableEvalKind(offset);
  offset += sizeof(metagen::MDVariableEvalKind);

  switch (evalKind) {
    case metagen::mdEvalInt64:
      return static_cast<double>(metadata->getInt64(offset));
    case metagen::mdEvalDouble:
      return metadata->getDouble(offset);
    case metagen::mdEvalString: {
      auto stringOffset = metadata->getOffset(offset);
      if (isValidMetadataStringOffset(metadata, stringOffset)) {
        return makeString(runtime, metadata->resolveString(stringOffset));
      }

      void* symbolPtr = dlsym(bridge->selfDl(), symbol.name.c_str());
      if (symbolPtr == nullptr) {
        return Value::undefined();
      }

      NativeApiJsiType stringObjectType;
      stringObjectType.kind = metagen::mdTypeNSStringObject;
      stringObjectType.ffiType = &ffi_type_pointer;
      stringObjectType.supported = true;
      return convertNativeReturnValue(runtime, bridge, stringObjectType,
                                      symbolPtr);
    }
    case metagen::mdEvalNone:
      break;
  }

  MDSectionOffset typeOffset = offset;
  NativeApiJsiType type = parseMetadataJsiType(metadata, &typeOffset, bridge.get());
  if (unsupportedJsiType(type)) {
    throw facebook::jsi::JSError(
        runtime, "Native constant type is not supported by pure JSI: " +
                     symbol.name);
  }

  void* symbolPtr = dlsym(bridge->selfDl(), symbol.name.c_str());
  if (symbolPtr == nullptr) {
    return Value::undefined();
  }
  return convertNativeReturnValue(runtime, bridge, type, symbolPtr);
}

void prepareJsiArguments(Runtime& runtime,
                         const std::shared_ptr<NativeApiJsiBridge>& bridge,
                         const NativeApiJsiSignature& signature,
                         const Value* args, size_t count,
                         NativeApiJsiArgumentFrame& frame) {
  if (count != signature.argumentTypes.size()) {
    throw facebook::jsi::JSError(
        runtime, "Actual arguments count: \"" + std::to_string(count) +
                     "\". Expected: \"" +
                     std::to_string(signature.argumentTypes.size()) + "\".");
  }

  for (size_t i = 0; i < signature.argumentTypes.size(); i++) {
    const auto& type = signature.argumentTypes[i];
    size_t size = type.ffiType != nullptr && type.ffiType->size > 0
                      ? type.ffiType->size
                      : nativeSizeForType(type);
    void* target = frame.storageAt(i, size);
    convertJsiArgument(runtime, bridge, type, args[i], target, frame);
  }
}

Value callNativeFunctionPointer(
    Runtime& runtime, const std::shared_ptr<NativeApiJsiBridge>& bridge,
    const NativeApiJsiType& type, void* pointer, bool block, const Value* args,
    size_t count) {
  if (pointer == nullptr) {
    throw facebook::jsi::JSError(runtime, "Native function pointer is null.");
  }
  if (bridge == nullptr || bridge->metadata() == nullptr ||
      type.signatureOffset == MD_SECTION_OFFSET_NULL) {
    throw facebook::jsi::JSError(
        runtime, "Native function pointer metadata is unavailable.");
  }

  auto signature = parseMetadataJsiSignature(
      bridge->metadata(), type.signatureOffset, block ? 1 : 0, bridge.get());
  if (!signature || !signature->prepared || signature->variadic ||
      unsupportedJsiType(signature->returnType)) {
    throw facebook::jsi::JSError(
        runtime,
        "Native function pointer signature is not supported by pure JSI.");
  }

  NativeApiJsiArgumentFrame frame(signature->argumentTypes.size());
  prepareJsiArguments(runtime, bridge, *signature, args, count, frame);

  std::vector<void*> values;
  if (block) {
    values.reserve(signature->argumentTypes.size() + 1);
    values.push_back(&pointer);
    for (size_t i = 0; i < signature->argumentTypes.size(); i++) {
      values.push_back(frame.values()[i]);
    }
  }

  void* callable = pointer;
  if (block) {
    auto literal = static_cast<NativeApiJsiBlockLiteral*>(pointer);
    if (literal == nullptr || literal->invoke == nullptr) {
      throw facebook::jsi::JSError(runtime, "Native block invoke pointer is null.");
    }
    callable = literal->invoke;
  }

  std::vector<unsigned char> returnStorage(
      std::max<size_t>(nativeSizeForType(signature->returnType), sizeof(void*)), 0);
  performNativeInvocation(runtime, [&]() {
    ffi_call(&signature->cif, FFI_FN(callable), returnStorage.data(),
             block ? values.data() : frame.values());
  });

  return convertNativeReturnValue(runtime, bridge, signature->returnType,
                                  returnStorage.data());
}

Value wrapNativeFunctionPointer(Runtime& runtime,
                                const std::shared_ptr<NativeApiJsiBridge>& bridge,
                                const NativeApiJsiType& type, void* pointer,
                                bool block) {
  const char* functionName = block ? "NativeApiJsiBlock" : "NativeApiJsiFunctionPointer";
  auto function = Function::createFromHostFunction(
      runtime, PropNameID::forAscii(runtime, functionName), 0,
      [bridge, type, pointer, block](Runtime& runtime, const Value&,
                                     const Value* args, size_t count) -> Value {
        return callNativeFunctionPointer(runtime, bridge, type, pointer, block,
                                         args, count);
      });
  function.setProperty(runtime, "kind",
                       makeString(runtime, block ? "block" : "functionPointer"));
  function.setProperty(
      runtime, "__nativeApiPointer",
      static_cast<double>(reinterpret_cast<uintptr_t>(pointer)));
  function.setProperty(
      runtime, "nativeAddress",
      static_cast<double>(reinterpret_cast<uintptr_t>(pointer)));
  function.setProperty(
      runtime, "toString",
      Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "toString"), 0,
          [pointer, block](Runtime& runtime, const Value&, const Value*,
                           size_t) -> Value {
            char address[32] = {};
            snprintf(address, sizeof(address), "%p", pointer);
            return makeString(runtime,
                              std::string("[NativeApiJsi ") +
                                  (block ? "Block " : "FunctionPointer ") +
                                  address + "]");
          }));
  return function;
}

Value callCFunction(Runtime& runtime,
                    const std::shared_ptr<NativeApiJsiBridge>& bridge,
                    const NativeApiSymbol& symbol, const Value* args,
                    size_t count) {
  MDMetadataReader* metadata = bridge->metadata();
  if (metadata == nullptr) {
    throw facebook::jsi::JSError(runtime, "Native metadata is not loaded.");
  }

  void* fnptr = dlsym(bridge->selfDl(), symbol.name.c_str());
  if (fnptr == nullptr) {
    throw facebook::jsi::JSError(runtime,
                                 "Native function is not available: " +
                                     symbol.name);
  }

  MDSectionOffset signatureOffset =
      metadata->signaturesOffset +
      metadata->getOffset(symbol.offset + sizeof(MDSectionOffset));
  auto signature = parseMetadataJsiSignature(
      metadata, signatureOffset, 0, bridge.get(),
      (metadata->getFunctionFlag(symbol.offset + sizeof(MDSectionOffset) * 2) &
       metagen::mdFunctionReturnOwned) != 0);
  if (!signature || !signature->prepared || signature->variadic ||
      unsupportedJsiType(signature->returnType)) {
    throw facebook::jsi::JSError(
        runtime, "Native function signature is not supported by pure JSI: " +
                     symbol.name);
  }

  NativeApiJsiArgumentFrame frame(signature->argumentTypes.size());
  prepareJsiArguments(runtime, bridge, *signature, args, count, frame);

  std::vector<unsigned char> returnStorage(
      std::max<size_t>(nativeSizeForType(signature->returnType), sizeof(void*)), 0);
  bool dispatchingNativeCallToUI = shouldDispatchNativeCallToUI();
  bool retainedReturn = false;
  performNativeInvocation(runtime, [&]() {
    ffi_call(&signature->cif, FFI_FN(fnptr), returnStorage.data(),
             frame.values());
    if (dispatchingNativeCallToUI &&
        !signature->returnType.returnOwned &&
        isObjectiveCObjectType(signature->returnType)) {
      id object = *reinterpret_cast<id*>(returnStorage.data());
      if (object != nil) {
        [object retain];
        retainedReturn = true;
      }
    }
  });

  NativeApiJsiType returnType = signature->returnType;
  if (retainedReturn) {
    returnType.returnOwned = true;
  }
  return convertNativeReturnValue(runtime, bridge, returnType,
                                  returnStorage.data());
}

Value callObjCSelector(Runtime& runtime,
                       const std::shared_ptr<NativeApiJsiBridge>& bridge,
                       id receiver, bool receiverIsClass,
                       const std::string& selectorName,
                       const NativeApiMember* member,
                       const Value* args, size_t count) {
  if (receiver == nil) {
    throw facebook::jsi::JSError(runtime,
                                 "Cannot send Objective-C selector to nil.");
  }

  SEL selector = sel_registerName(selectorName.c_str());
  Class receiverClass =
      receiverIsClass ? static_cast<Class>(receiver) : object_getClass(receiver);
  Method method = receiverIsClass ? class_getClassMethod(receiverClass, selector)
                                  : class_getInstanceMethod(receiverClass, selector);
  if (method == nullptr) {
    throw facebook::jsi::JSError(runtime,
                                 "Objective-C selector is not available: " +
                                     selectorName);
  }

  std::optional<NativeApiJsiSignature> signature;
  if (member != nullptr &&
      member->signatureOffset != MD_SECTION_OFFSET_NULL &&
      member->signatureOffset != 0) {
    signature = parseMetadataJsiSignature(
        bridge->metadata(), member->signatureOffset, 2, bridge.get(),
        (member->flags & metagen::mdMemberReturnOwned) != 0);
  }
  if (!signature) {
    signature = parseObjCMethodJsiSignature(method);
  }

  if (!signature || !signature->prepared || signature->variadic ||
      unsupportedJsiType(signature->returnType)) {
    throw facebook::jsi::JSError(
        runtime, "Objective-C signature is not supported by pure JSI: " +
                     selectorName);
  }

  NativeApiJsiArgumentFrame frame(signature->argumentTypes.size());
  prepareJsiArguments(runtime, bridge, *signature, args, count, frame);

  std::vector<void*> values;
  values.reserve(signature->argumentTypes.size() + 2);
  values.push_back(&receiver);
  values.push_back(&selector);
  for (size_t i = 0; i < signature->argumentTypes.size(); i++) {
    values.push_back(frame.values()[i]);
  }

  std::vector<unsigned char> returnStorage(
      std::max<size_t>(nativeSizeForType(signature->returnType), sizeof(void*)), 0);
  bool dispatchingNativeCallToUI = shouldDispatchNativeCallToUI();
  bool retainedReturn = false;
  performNativeInvocation(runtime, [&]() {
#if defined(__x86_64__)
    bool isStret = signature->returnType.ffiType->size > 16 &&
                   signature->returnType.ffiType->type == FFI_TYPE_STRUCT;
    ffi_call(&signature->cif,
             isStret ? FFI_FN(objc_msgSend_stret) : FFI_FN(objc_msgSend),
             returnStorage.data(), values.data());
#else
    ffi_call(&signature->cif, FFI_FN(objc_msgSend), returnStorage.data(),
             values.data());
#endif
    if (dispatchingNativeCallToUI &&
        !signature->returnType.returnOwned &&
        isObjectiveCObjectType(signature->returnType)) {
      id object = *reinterpret_cast<id*>(returnStorage.data());
      if (object != nil) {
        [object retain];
        retainedReturn = true;
      }
    }
  });

  NativeApiJsiType returnType = signature->returnType;
  if (retainedReturn) {
    returnType.returnOwned = true;
  }
  return convertNativeReturnValue(runtime, bridge, returnType,
                                  returnStorage.data());
}

class NativeApiHostObject final : public HostObject {
 public:
  explicit NativeApiHostObject(std::shared_ptr<NativeApiJsiBridge> bridge)
      : bridge_(std::move(bridge)) {}

  Value get(Runtime& runtime, const PropNameID& name) override {
    std::string property = name.utf8(runtime);
    if (property == "runtime") {
      return makeString(runtime, "jsi");
    }
    if (property == "backend") {
      return makeString(runtime, "hermes");
    }
    if (property == "metadata") {
      return metadataObject(runtime);
    }
    if (property == "hasScheduler") {
      return bridge_->scheduler() != nullptr;
    }
    if (property == "interop") {
      return createInteropObject(runtime, bridge_);
    }
    if (property == "runOnUI") {
      auto bridge = bridge_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "runOnUI"), 1,
          [bridge](Runtime& runtime, const Value&, const Value* args,
                   size_t count) -> Value {
            auto scheduler = bridge->scheduler();
            if (scheduler == nullptr) {
              throw facebook::jsi::JSError(
                  runtime,
                  "NativeApiJsi was installed without a UI scheduler.");
            }

            std::shared_ptr<Function> callback;
            if (count > 0 && !args[0].isNull() && !args[0].isUndefined()) {
              if (!args[0].isObject()) {
                throw facebook::jsi::JSError(
                    runtime, "runOnUI expects a function callback.");
              }

              Object callbackObject = args[0].asObject(runtime);
              if (!callbackObject.isFunction(runtime)) {
                throw facebook::jsi::JSError(
                    runtime, "runOnUI expects a function callback.");
              }
              callback = std::make_shared<Function>(
                  callbackObject.asFunction(runtime));
            }

            Runtime* runtimePtr = &runtime;
            auto promiseCtor =
                runtime.global().getPropertyAsFunction(runtime, "Promise");
            return promiseCtor.callAsConstructor(
                runtime,
                Function::createFromHostFunction(
                    runtime, PropNameID::forAscii(runtime, "runOnUIPromise"),
                    2,
                    [scheduler, runtimePtr, callback](
                        Runtime& promiseRuntime, const Value&,
                        const Value* promiseArgs,
                        size_t promiseArgc) -> Value {
                      if (promiseArgc < 2 || !promiseArgs[0].isObject() ||
                          !promiseArgs[1].isObject()) {
                        return Value::undefined();
                      }

                      auto resolve = std::make_shared<Function>(
                          promiseArgs[0].asObject(promiseRuntime)
                              .asFunction(promiseRuntime));
                      auto reject = std::make_shared<Function>(
                          promiseArgs[1].asObject(promiseRuntime)
                              .asFunction(promiseRuntime));
                      if (callback == nullptr) {
                        scheduler->invokeOnUI([scheduler, runtimePtr, resolve]() {
                          scheduler->invokeOnJS([runtimePtr, resolve]() {
                            resolve->call(*runtimePtr);
                          });
                        });
                        return Value::undefined();
                      }

                      scheduler->invokeOnJS([runtimePtr, callback, resolve, reject]() {
                        try {
                          {
                            ScopedNativeApiUINativeCallDispatch uiDispatch;
                            callback->call(*runtimePtr);
                          }
                          resolve->call(*runtimePtr);
                        } catch (const std::exception& error) {
                          reject->call(
                              *runtimePtr,
                              String::createFromUtf8(*runtimePtr, error.what()));
                        }
                      });

                      return Value::undefined();
                    }));
          });
    }
    if (property == "import") {
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "import"), 1,
          [](Runtime& runtime, const Value&, const Value* args,
             size_t count) -> Value {
            std::string path = readStringArg(runtime, args, count, 0, "path");
            std::string frameworkPath = path;
            if (!frameworkPath.empty() && frameworkPath[0] != '/') {
              frameworkPath = "/System/Library/Frameworks/" + frameworkPath +
                              ".framework";
            }

            NSBundle* bundle = [NSBundle
                bundleWithPath:[NSString stringWithUTF8String:frameworkPath.c_str()]];
            if (bundle == nil || ![bundle load]) {
              throw facebook::jsi::JSError(
                  runtime, "Could not load bundle: " + frameworkPath);
            }
            return true;
          });
    }
    if (property == "lookup") {
      auto bridge = bridge_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "lookup"), 1,
          [bridge](Runtime& runtime, const Value&, const Value* args,
                   size_t count) -> Value {
            std::string symbolName =
                readStringArg(runtime, args, count, 0, "name");
            const NativeApiSymbol* symbol = bridge->find(symbolName);
            if (symbol == nullptr) {
              return Value::null();
            }
            return symbolToObject(runtime, *symbol);
          });
    }
    if (property == "getClass") {
      auto bridge = bridge_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "getClass"), 1,
          [bridge](Runtime& runtime, const Value&, const Value* args,
                   size_t count) -> Value {
            std::string className =
                readStringArg(runtime, args, count, 0, "name");
            const NativeApiSymbol* symbol = bridge->findClass(className);
            if (symbol == nullptr) {
              Class cls = objc_lookUpClass(className.c_str());
              if (cls == nil) {
                return Value::null();
              }
              NativeApiSymbol runtimeSymbol{
                  .kind = NativeApiSymbolKind::Class,
                  .offset = MD_SECTION_OFFSET_NULL,
                  .name = className,
                  .runtimeName = className,
              };
              return Object::createFromHostObject(
                  runtime,
                  std::make_shared<NativeApiClassHostObject>(
                      bridge, std::move(runtimeSymbol)));
            }

            return Object::createFromHostObject(
                runtime,
                std::make_shared<NativeApiClassHostObject>(bridge, *symbol));
          });
    }
    if (property == "getFunction") {
      auto bridge = bridge_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "getFunction"), 1,
          [bridge](Runtime& runtime, const Value&, const Value* args,
                   size_t count) -> Value {
            std::string functionName =
                readStringArg(runtime, args, count, 0, "name");
            const NativeApiSymbol* symbol = bridge->findFunction(functionName);
            if (symbol == nullptr) {
              return Value::null();
            }
            auto function = Function::createFromHostFunction(
                runtime, PropNameID::forAscii(runtime, symbol->name), 0,
                [bridge, symbol = *symbol](Runtime& runtime, const Value&,
                                           const Value* args,
                                           size_t count) -> Value {
                  return callCFunction(runtime, bridge, symbol, args, count);
            });
            function.setProperty(runtime, "kind", makeString(runtime, "function"));
            function.setProperty(runtime, "nativeName",
                                 makeString(runtime, symbol->name));
            function.setProperty(runtime, "metadataOffset",
                                 static_cast<double>(symbol->offset));
            return function;
          });
    }
    if (property == "getConstant") {
      auto bridge = bridge_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "getConstant"), 1,
          [bridge](Runtime& runtime, const Value&, const Value* args,
                   size_t count) -> Value {
            std::string constantName =
                readStringArg(runtime, args, count, 0, "name");
            const NativeApiSymbol* symbol = bridge->findConstant(constantName);
            if (symbol == nullptr) {
              return Value::undefined();
            }
            return constantToValue(runtime, bridge, *symbol);
          });
    }
    if (property == "getEnum") {
      auto bridge = bridge_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "getEnum"), 1,
          [bridge](Runtime& runtime, const Value&, const Value* args,
                   size_t count) -> Value {
            std::string enumName = readStringArg(runtime, args, count, 0, "name");
            const NativeApiSymbol* symbol = bridge->findEnum(enumName);
            if (symbol == nullptr) {
              return Value::undefined();
            }
            return enumToObject(runtime, bridge->metadata(), *symbol);
          });
    }
    if (property == "getProtocol") {
      auto bridge = bridge_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, "getProtocol"), 1,
          [bridge](Runtime& runtime, const Value&, const Value* args,
                   size_t count) -> Value {
            std::string protocolName =
                readStringArg(runtime, args, count, 0, "name");
            const NativeApiSymbol* symbol = bridge->findProtocol(protocolName);
            if (symbol == nullptr) {
              Protocol* protocol = objc_getProtocol(protocolName.c_str());
              if (protocol == nullptr) {
                return Value::null();
              }
              NativeApiSymbol runtimeSymbol{
                  .kind = NativeApiSymbolKind::Protocol,
                  .offset = MD_SECTION_OFFSET_NULL,
                  .name = protocolName,
                  .runtimeName = protocolName,
              };
              return Object::createFromHostObject(
                  runtime,
                  std::make_shared<NativeApiProtocolHostObject>(
                      std::move(runtimeSymbol)));
            }
            return Object::createFromHostObject(
                runtime,
                std::make_shared<NativeApiProtocolHostObject>(*symbol));
          });
    }
    if (property == "getStruct" || property == "getUnion") {
      auto bridge = bridge_;
      bool isUnion = property == "getUnion";
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, property.c_str()), 1,
          [bridge, isUnion](Runtime& runtime, const Value&, const Value* args,
                            size_t count) -> Value {
            std::string aggregateName =
                readStringArg(runtime, args, count, 0, "name");
            const NativeApiSymbol* symbol =
                isUnion ? bridge->findUnion(aggregateName)
                        : bridge->findStruct(aggregateName);
            if (symbol == nullptr) {
              return Value::undefined();
            }
            return makeAggregateConstructor(runtime, bridge, *symbol);
          });
    }

    if (const NativeApiSymbol* classSymbol = bridge_->findClass(property)) {
      return Object::createFromHostObject(
          runtime,
          std::make_shared<NativeApiClassHostObject>(bridge_, *classSymbol));
    }

    if (const NativeApiSymbol* functionSymbol = bridge_->findFunction(property)) {
      auto bridge = bridge_;
      return Function::createFromHostFunction(
          runtime, PropNameID::forAscii(runtime, property.c_str()), 0,
          [bridge, symbol = *functionSymbol](Runtime& runtime, const Value&,
                                             const Value* args,
                                             size_t count) -> Value {
            return callCFunction(runtime, bridge, symbol, args, count);
          });
    }

    if (const NativeApiSymbol* constantSymbol = bridge_->findConstant(property)) {
      return constantToValue(runtime, bridge_, *constantSymbol);
    }

    if (const NativeApiSymbol* enumSymbol = bridge_->findEnum(property)) {
      return enumToObject(runtime, bridge_->metadata(), *enumSymbol);
    }

    if (const NativeApiSymbol* protocolSymbol =
            bridge_->findProtocol(property)) {
      return Object::createFromHostObject(
          runtime,
          std::make_shared<NativeApiProtocolHostObject>(*protocolSymbol));
    }

    if (const NativeApiSymbol* aggregateSymbol =
            bridge_->findAggregate(property)) {
      return makeAggregateConstructor(runtime, bridge_, *aggregateSymbol);
    }

    return Value::undefined();
  }

  std::vector<PropNameID> getPropertyNames(Runtime& runtime) override {
    std::vector<PropNameID> names;
    names.reserve(11);
    addPropertyName(runtime, names, "runtime");
    addPropertyName(runtime, names, "backend");
    addPropertyName(runtime, names, "metadata");
    addPropertyName(runtime, names, "hasScheduler");
    addPropertyName(runtime, names, "interop");
    addPropertyName(runtime, names, "runOnUI");
    addPropertyName(runtime, names, "import");
    addPropertyName(runtime, names, "lookup");
    addPropertyName(runtime, names, "getClass");
    addPropertyName(runtime, names, "getFunction");
    addPropertyName(runtime, names, "getConstant");
    addPropertyName(runtime, names, "getEnum");
    addPropertyName(runtime, names, "getProtocol");
    addPropertyName(runtime, names, "getStruct");
    addPropertyName(runtime, names, "getUnion");
    return names;
  }

 private:
  Object metadataObject(Runtime& runtime) const {
    Object metadata(runtime);
    metadata.setProperty(runtime, "classes",
                         static_cast<double>(bridge_->classCount()));
    metadata.setProperty(runtime, "functions",
                         static_cast<double>(bridge_->functionCount()));
    metadata.setProperty(runtime, "constants",
                         static_cast<double>(bridge_->constantCount()));
    metadata.setProperty(runtime, "protocols",
                         static_cast<double>(bridge_->protocolCount()));
    metadata.setProperty(runtime, "enums",
                         static_cast<double>(bridge_->enumCount()));
    metadata.setProperty(runtime, "structs",
                         static_cast<double>(bridge_->structCount()));
    metadata.setProperty(runtime, "unions",
                         static_cast<double>(bridge_->unionCount()));

    metadata.setProperty(
        runtime, "classNames",
        Function::createFromHostFunction(
            runtime, PropNameID::forAscii(runtime, "classNames"), 0,
            [bridge = bridge_](Runtime& runtime, const Value&, const Value*,
                               size_t) -> Value {
              return namesToArray(runtime, bridge->classNames());
            }));
    metadata.setProperty(
        runtime, "functionNames",
        Function::createFromHostFunction(
            runtime, PropNameID::forAscii(runtime, "functionNames"), 0,
            [bridge = bridge_](Runtime& runtime, const Value&, const Value*,
                               size_t) -> Value {
              return namesToArray(runtime, bridge->functionNames());
            }));
    metadata.setProperty(
        runtime, "constantNames",
        Function::createFromHostFunction(
            runtime, PropNameID::forAscii(runtime, "constantNames"), 0,
            [bridge = bridge_](Runtime& runtime, const Value&, const Value*,
                               size_t) -> Value {
              return namesToArray(runtime, bridge->constantNames());
            }));
    metadata.setProperty(
        runtime, "protocolNames",
        Function::createFromHostFunction(
            runtime, PropNameID::forAscii(runtime, "protocolNames"), 0,
            [bridge = bridge_](Runtime& runtime, const Value&, const Value*,
                               size_t) -> Value {
              return namesToArray(runtime, bridge->protocolNames());
            }));
    metadata.setProperty(
        runtime, "enumNames",
        Function::createFromHostFunction(
            runtime, PropNameID::forAscii(runtime, "enumNames"), 0,
            [bridge = bridge_](Runtime& runtime, const Value&, const Value*,
                               size_t) -> Value {
              return namesToArray(runtime, bridge->enumNames());
            }));
    metadata.setProperty(
        runtime, "structNames",
        Function::createFromHostFunction(
            runtime, PropNameID::forAscii(runtime, "structNames"), 0,
            [bridge = bridge_](Runtime& runtime, const Value&, const Value*,
                               size_t) -> Value {
              return namesToArray(runtime, bridge->structNames());
            }));
    metadata.setProperty(
        runtime, "unionNames",
        Function::createFromHostFunction(
            runtime, PropNameID::forAscii(runtime, "unionNames"), 0,
            [bridge = bridge_](Runtime& runtime, const Value&, const Value*,
                               size_t) -> Value {
              return namesToArray(runtime, bridge->unionNames());
            }));
    return metadata;
  }

  std::shared_ptr<NativeApiJsiBridge> bridge_;
};

}  // namespace

Object CreateNativeApiJSI(Runtime& runtime, const NativeApiJsiConfig& config) {
  auto bridge = std::make_shared<NativeApiJsiBridge>(config);
  return Object::createFromHostObject(
      runtime, std::make_shared<NativeApiHostObject>(std::move(bridge)));
}

void InstallAggregateGlobals(Runtime& runtime, Object& api, const char* namesFunction) {
  Value metadataValue = api.getProperty(runtime, "metadata");
  if (!metadataValue.isObject()) {
    return;
  }
  Object metadata = metadataValue.asObject(runtime);
  Value namesValue = metadata.getProperty(runtime, namesFunction);
  if (!namesValue.isObject()) {
    return;
  }
  Object namesObject = namesValue.asObject(runtime);
  if (!namesObject.isFunction(runtime)) {
    return;
  }
  Value namesResult = namesObject.asFunction(runtime).call(runtime);
  if (!namesResult.isObject() || !namesResult.asObject(runtime).isArray(runtime)) {
    return;
  }
  Array names = namesResult.asObject(runtime).getArray(runtime);
  Object global = runtime.global();
  for (size_t i = 0; i < names.size(runtime); i++) {
    Value nameValue = names.getValueAtIndex(runtime, i);
    if (!nameValue.isString()) {
      continue;
    }
    std::string name = nameValue.asString(runtime).utf8(runtime);
    if (name.empty() || global.hasProperty(runtime, name.c_str())) {
      continue;
    }
    try {
      Value aggregate = api.getProperty(runtime, name.c_str());
      if (!aggregate.isUndefined()) {
        global.setProperty(runtime, name.c_str(), aggregate);
      }
    } catch (const std::exception&) {
      // Some React Native globals are read-only even when hasProperty misses
      // them. Keep NativeScript initialization resilient and skip collisions.
    }
  }
}

void InstallNativeApiJSI(Runtime& runtime, const NativeApiJsiConfig& config) {
  const char* globalName = config.globalName != nullptr && config.globalName[0] != '\0'
                               ? config.globalName
                               : "__nativeScriptNativeApi";
  Object api = CreateNativeApiJSI(runtime, config);
  runtime.global().setProperty(runtime, globalName, api);
  runtime.global().setProperty(runtime, "interop",
                               api.getProperty(runtime, "interop"));
  InstallAggregateGlobals(runtime, api, "protocolNames");
  InstallAggregateGlobals(runtime, api, "structNames");
  InstallAggregateGlobals(runtime, api, "unionNames");
}

}  // namespace nativescript

extern "C" void NativeScriptInstallNativeApiJSI(
    facebook::jsi::Runtime* runtime, const char* metadataPath) {
  if (runtime == nullptr) {
    return;
  }
  nativescript::NativeApiJsiConfig config;
  config.metadataPath = metadataPath;
  nativescript::InstallNativeApiJSI(*runtime, config);
}

#endif  // TARGET_ENGINE_HERMES

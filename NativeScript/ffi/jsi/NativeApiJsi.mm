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
#include <cctype>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <memory>
#include <optional>
#include <stdexcept>
#include <string>
#include <unordered_map>
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
using facebook::jsi::Function;
using facebook::jsi::HostObject;
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

template <typename Invocation>
void performNativeInvocation(Runtime& runtime, Invocation&& invocation) {
  NSString* exceptionDescription = nil;
  auto run = [&]() {
    @try {
      invocation();
    } @catch (NSException* exception) {
      exceptionDescription = [exception.description copy];
    }
  };

  if (shouldDispatchNativeCallToUI()) {
    dispatch_sync(dispatch_get_main_queue(), ^{
      run();
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
  Protocol,
  Enum,
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

  size_t classCount() const { return classNames_.size(); }
  size_t functionCount() const { return functionNames_.size(); }
  size_t protocolCount() const { return protocolNames_.size(); }
  size_t enumCount() const { return enumNames_.size(); }

  const std::vector<std::string>& classNames() const { return classNames_; }
  const std::vector<std::string>& functionNames() const { return functionNames_; }
  const std::vector<std::string>& protocolNames() const { return protocolNames_; }
  const std::vector<std::string>& enumNames() const { return enumNames_; }
  std::shared_ptr<NativeApiJsiScheduler> scheduler() const { return scheduler_; }

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
      case NativeApiSymbolKind::Protocol:
        protocolNames_.push_back(symbol.name);
        break;
      case NativeApiSymbolKind::Enum:
        enumNames_.push_back(symbol.name);
        break;
    }

    symbolsByName_[symbol.name] = symbol;
    if (kind == NativeApiSymbolKind::Class) {
      classSymbolsByOffset_[symbol.offset] = symbol;
      classSymbolsByRuntimeName_[symbol.runtimeName] = std::move(symbol);
    }
  }

  void buildSymbolIndexes() {
    if (metadata_ == nullptr) {
      return;
    }

    indexEnums();
    indexFunctions();
    indexProtocols();
    indexClasses();
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
  std::vector<std::string> protocolNames_;
  std::vector<std::string> enumNames_;
  std::shared_ptr<NativeApiJsiScheduler> scheduler_;
  mutable std::unordered_map<MDSectionOffset, std::vector<NativeApiMember>>
      membersByClassOffset_;
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
    case NativeApiSymbolKind::Protocol:
      return "protocol";
    case NativeApiSymbolKind::Enum:
      return "enum";
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
  }

  return result;
}

class NativeApiPointerHostObject final : public HostObject {
 public:
  NativeApiPointerHostObject(void* pointer, std::string kind = "pointer")
      : pointer_(pointer), kind_(std::move(kind)) {}

  void* pointer() const { return pointer_; }

  Value get(Runtime& runtime, const PropNameID& name) override {
    std::string property = name.utf8(runtime);
    if (property == "kind") {
      return makeString(runtime, kind_);
    }
    if (property == "address") {
      return static_cast<double>(reinterpret_cast<uintptr_t>(pointer_));
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
    addPropertyName(runtime, names, "toString");
    return names;
  }

 private:
  void* pointer_ = nullptr;
  std::string kind_;
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

struct NativeApiJsiType {
  MDTypeKind kind = metagen::mdTypeVoid;
  ffi_type* ffiType = &ffi_type_void;
  bool supported = true;
  bool returnOwned = false;
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

MDTypeKind stripTypeFlags(MDTypeKind kind) {
  return static_cast<MDTypeKind>((kind & ~metagen::mdTypeFlagNext) &
                                 ~metagen::mdTypeFlagVariadic);
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
    case metagen::mdTypeBlock:
    case metagen::mdTypeFunctionPointer:
      return false;
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
                                      MDSectionOffset* offset) {
  MDTypeKind rawKind = metadata->getTypeKind(*offset);
  MDTypeKind kind = stripTypeFlags(rawKind);
  *offset += sizeof(MDTypeKind);
  skipMetadataJsiTypePayload(metadata, offset, kind);

  NativeApiJsiType type;
  type.kind = kind;
  type.ffiType = ffiTypeForJsiKind(kind);
  type.supported = type.ffiType != nullptr && isSupportedJsiKind(kind);
  return type;
}

std::optional<NativeApiJsiSignature> parseMetadataJsiSignature(
    MDMetadataReader* metadata, MDSectionOffset signatureOffset,
    unsigned int implicitArgumentCount, bool returnOwned = false) {
  if (metadata == nullptr || signatureOffset == MD_SECTION_OFFSET_NULL) {
    return std::nullopt;
  }

  NativeApiJsiSignature signature;
  signature.implicitArgumentCount = implicitArgumentCount;

  MDSectionOffset offset = signatureOffset;
  MDTypeKind returnKind = metadata->getTypeKind(offset);
  bool next = (returnKind & metagen::mdTypeFlagNext) != 0;
  signature.variadic = (returnKind & metagen::mdTypeFlagVariadic) != 0;
  signature.returnType = parseMetadataJsiType(metadata, &offset);
  signature.returnType.returnOwned = returnOwned;

  while (next) {
    MDTypeKind argKind = metadata->getTypeKind(offset);
    next = (argKind & metagen::mdTypeFlagNext) != 0;
    signature.argumentTypes.push_back(parseMetadataJsiType(metadata, &offset));
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

const char* skipBalancedEncoding(const char* encoding, char open, char close) {
  int depth = 0;
  while (encoding != nullptr && *encoding != '\0') {
    if (*encoding == open) {
      depth++;
    } else if (*encoding == close) {
      depth--;
      if (depth == 0) {
        return encoding + 1;
      }
    }
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
    if (object.isHostObject<NativeApiPointerHostObject>(runtime)) {
      return static_cast<id>(
          object.getHostObject<NativeApiPointerHostObject>(runtime)->pointer());
    }
  }
  throw facebook::jsi::JSError(runtime,
                               "Value cannot be converted to Objective-C object.");
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

void convertJsiArgument(Runtime& runtime, const NativeApiJsiType& type,
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
    case metagen::mdTypeOpaquePointer:
    case metagen::mdTypeBlock:
    case metagen::mdTypeFunctionPointer:
      *static_cast<void**>(target) = pointerFromJsiValue(runtime, value, frame);
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
    case metagen::mdTypeOpaquePointer:
    case metagen::mdTypeBlock:
    case metagen::mdTypeFunctionPointer: {
      void* pointer = *static_cast<void**>(value);
      if (pointer == nullptr) {
        return Value::null();
      }
      return Object::createFromHostObject(
          runtime, std::make_shared<NativeApiPointerHostObject>(pointer));
    }
    default:
      throw facebook::jsi::JSError(runtime, "Unsupported JSI return type.");
  }
}

void prepareJsiArguments(Runtime& runtime, const NativeApiJsiSignature& signature,
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
    void* target = frame.storageAt(i, type.ffiType != nullptr ? type.ffiType->size
                                                              : sizeof(void*));
    convertJsiArgument(runtime, type, args[i], target, frame);
  }
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
      metadata, signatureOffset, 0,
      (metadata->getFunctionFlag(symbol.offset + sizeof(MDSectionOffset) * 2) &
       metagen::mdFunctionReturnOwned) != 0);
  if (!signature || !signature->prepared || signature->variadic ||
      unsupportedJsiType(signature->returnType)) {
    throw facebook::jsi::JSError(
        runtime, "Native function signature is not supported by pure JSI: " +
                     symbol.name);
  }

  NativeApiJsiArgumentFrame frame(signature->argumentTypes.size());
  prepareJsiArguments(runtime, *signature, args, count, frame);

  std::vector<unsigned char> returnStorage(
      std::max<size_t>(signature->returnType.ffiType->size, sizeof(void*)), 0);
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
        bridge->metadata(), member->signatureOffset, 2,
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
  prepareJsiArguments(runtime, *signature, args, count, frame);

  std::vector<void*> values;
  values.reserve(signature->argumentTypes.size() + 2);
  values.push_back(&receiver);
  values.push_back(&selector);
  for (size_t i = 0; i < signature->argumentTypes.size(); i++) {
    values.push_back(frame.values()[i]);
  }

  std::vector<unsigned char> returnStorage(
      std::max<size_t>(signature->returnType.ffiType->size, sizeof(void*)), 0);
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

    return Value::undefined();
  }

  std::vector<PropNameID> getPropertyNames(Runtime& runtime) override {
    std::vector<PropNameID> names;
    names.reserve(9);
    addPropertyName(runtime, names, "runtime");
    addPropertyName(runtime, names, "backend");
    addPropertyName(runtime, names, "metadata");
    addPropertyName(runtime, names, "hasScheduler");
    addPropertyName(runtime, names, "runOnUI");
    addPropertyName(runtime, names, "import");
    addPropertyName(runtime, names, "lookup");
    addPropertyName(runtime, names, "getClass");
    addPropertyName(runtime, names, "getFunction");
    return names;
  }

 private:
  Object metadataObject(Runtime& runtime) const {
    Object metadata(runtime);
    metadata.setProperty(runtime, "classes",
                         static_cast<double>(bridge_->classCount()));
    metadata.setProperty(runtime, "functions",
                         static_cast<double>(bridge_->functionCount()));
    metadata.setProperty(runtime, "protocols",
                         static_cast<double>(bridge_->protocolCount()));
    metadata.setProperty(runtime, "enums",
                         static_cast<double>(bridge_->enumCount()));

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

void InstallNativeApiJSI(Runtime& runtime, const NativeApiJsiConfig& config) {
  const char* globalName = config.globalName != nullptr && config.globalName[0] != '\0'
                               ? config.globalName
                               : "__nativeScriptNativeApi";
  Object api = CreateNativeApiJSI(runtime, config);
  runtime.global().setProperty(runtime, globalName, api);
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

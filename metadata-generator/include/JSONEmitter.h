#pragma once

#include <string>
#include <unordered_map>

#include "IR.h"

namespace metagen {

// Emits one <Framework>.json per framework (format
// "nativescript-metadata-json@1") carrying the metadata the .d.ts corpus
// cannot express: per-symbol/per-member availability for the target platform
// and the native ObjC selector behind each JS-munged member name. Consumed by
// agent-facing tooling (@nativescript/metadata-index) as a sidecar to the
// TSEmitter output.
class JSONEmitter {
 public:
  JSONEmitter(MetadataFactory& factory, std::string outDir)
      : outDir(std::move(outDir)), factory(factory) {}

  void write();

  std::string outDir;
  MetadataFactory& factory;

 private:
  std::unordered_map<std::string, std::string> buffers;

  std::string& ensureBuffer(const std::string& framework);
  void writeSymbolHeader(std::string& out, const std::string& name,
                         const char* kind, const AvailabilityInfo& availability);
  void writeMembers(std::string& out, std::vector<MemberDecl>& members);
};

}  // namespace metagen

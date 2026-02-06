#pragma once

#include "IR.h"
#include "MetadataWriter.h"
#include "Util.h"
#include <algorithm>
#include <assert.h>
#include <clang-c/Index.h>
#include <filesystem>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <vector>

namespace metagen {

class TSLines {
public:
  TSLines() {}

  void write(const std::string& value);
  void newline();
  void enter();
  void exit();

  std::vector<std::string> lines;
  int indentLevel = 0;
};

class TSFile {
public:
  TSFile() {}

  TSFile(std::string name, MetadataFactory *factory)
      : factory(factory), name(name) {}

  std::string typeToString(const TypeSpec &type, bool isStatic, bool isReturn);

  void write(VariableDecl &decl);
  void write(EnumDecl &decl);
  void write(StructDecl &decl);
  void write(UnionDecl &decl);
  void write(FunctionDecl &decl);
  void write(MemberDecl &decl, bool isInterface = false,
             std::vector<std::string> *classTypeParameters = nullptr);
  void write(ProtocolDecl &decl);
  void write(ClassDecl &decl);

  std::string toString();

  inline void import(const std::string& module) { imports.insert(module); }

  MetadataFactory *factory = nullptr;

  std::string name;
  std::unordered_set<std::string> imports;
  TSLines code;
  std::unordered_set<std::string> classReferences;
  std::unordered_set<std::string> protocolReferences;
};

class TSEmitter {
public:
  struct Options {
    Options() : indexMode("all") {}
    std::string indexMode; // all | frameworks-list
    std::vector<std::string> indexFrameworks;
  };

  TSEmitter(MetadataFactory &factory, std::string outDir, Options options = {})
      : outDir(outDir), factory(factory), options(options) {}

  void resolveImports(TSFile &file);

  TSFile& ensureFile(const std::string& framework);

  void write();

  std::string outDir;
  std::unordered_map<std::string, TSFile> files;
  MetadataFactory &factory;
  Options options;
};

} // namespace metagen

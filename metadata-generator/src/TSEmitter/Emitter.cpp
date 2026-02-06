#include "TSEmitter.h"

namespace metagen {

void TSLines::write(const std::string& value) {
  std::string line(static_cast<size_t>(indentLevel) * 2, ' ');
  line += value;
  lines.push_back(line);
}

void TSLines::newline() { lines.push_back(""); }

void TSLines::enter() { indentLevel++; }

void TSLines::exit() { indentLevel--; }

std::string TSFile::toString() {
  std::string result;
  size_t estimatedSize = 64;
  estimatedSize += imports.size() * 32;
  for (const auto& line : code.lines) {
    estimatedSize += line.size() + 1;
  }
  result.reserve(estimatedSize);
  result += "/// <reference types=\"@nativescript/objc-node-api\" />\n";
  for (auto &import : imports) {
    result += "/// <reference path=\"";
    result += import;
    result += "\" />\n";
  }
  result += "\n";
  for (auto &line : code.lines) {
    result += line + "\n";
  }
  return result;
}

void TSEmitter::resolveImports(TSFile &file) {
  for (auto &name : file.classReferences) {
    auto clsIt = factory.classes.find(name);
    if (clsIt != factory.classes.end()) {
      const ClassDecl& cls = clsIt->second;
      if (cls.framework != file.name) {
        file.import("./" + cls.framework + ".d.ts");
      }
    }
  }
}

TSFile& TSEmitter::ensureFile(const std::string& framework) {
  auto [it, _] = files.try_emplace(framework, framework, &factory);
  return it->second;
}

void TSEmitter::write() {
  // Emit code

  for (auto &var : factory.variables) {
    ensureFile(var.second.framework).write(var.second);
  }

  for (auto &enm : factory.enums) {
    ensureFile(enm.second.framework).write(enm.second);
  }

  for (auto &strct : factory.structs) {
    ensureFile(strct.second.framework).write(strct.second);
  }

  for (auto &un : factory.unions) {
    ensureFile(un.second.framework).write(un.second);
  }

  for (auto &func : factory.functions) {
    ensureFile(func.framework).write(func);
  }

  for (auto &proto : factory.protocols) {
    ensureFile(proto.second.framework).write(proto.second);
  }

  for (auto &cls : factory.classes) {
    if (cls.first.empty())
      return;
    ensureFile(cls.second.framework).write(cls.second);
  }

  // Write files

  for (auto &file : files) {
    resolveImports(file.second);

    auto name = outDir + "/" + file.second.name + ".d.ts";
    auto f = std::fopen(name.c_str(), "w");
    std::string code = file.second.toString();
    std::fwrite(code.data(), 1, code.size(), f);
    std::fclose(f);
  }

  // Write index.d.ts based on options
  std::vector<std::string> allFrameworks;
  allFrameworks.reserve(files.size());
  for (auto &file : files) {
    allFrameworks.push_back(file.second.name);
  }
  std::sort(allFrameworks.begin(), allFrameworks.end());

  std::vector<std::string> selectedFrameworks;
  if (options.indexMode == "frameworks-list") {
    selectedFrameworks = options.indexFrameworks;
  } else {
    selectedFrameworks = allFrameworks;
  }

  std::string name = outDir + "/index.d.ts";
  auto f = std::fopen(name.c_str(), "w");
  if (f != nullptr) {
    for (auto &framework : selectedFrameworks) {
      if (!files.contains(framework)) {
        continue;
      }
      std::string line = "/// <reference path=\"./";
      line += framework;
      line += ".d.ts\" />";
      std::fwrite(line.data(), 1, line.size(), f);
      std::fwrite("\n", 1, 1, f);
    }
    std::fclose(f);
  }
}

} // namespace metagen

#pragma once

#include <clang-c/Index.h>
#include <algorithm>
#include <cctype>
#include <string>
#include <vector>

namespace metagen {

inline std::string jsifySelector(const std::string& selector) {
  std::string jsifiedSelector;
  jsifiedSelector.reserve(selector.size());
  bool nextupper = false;
  for (auto c : selector) {
    if (c == ':') {
      nextupper = true;
    } else if (nextupper) {
      jsifiedSelector += toupper(c);
      nextupper = false;
    } else {
      jsifiedSelector += c;
    }
  }
  return jsifiedSelector;
}

inline std::string jsifyName(const std::string& name) {
  if (name == "arguments" || name == "function" || name == "DOMException") {
    return name + "$";
  } else {
    return name;
  }
}

inline std::vector<std::string> splitCamelCase(const std::string& value) {
  std::vector<std::string> result;
  result.reserve(value.size() / 4 + 1);

  std::string current;
  current.reserve(value.size());
  for (auto c : value) {
    if (isupper(c)) {
      if (!current.empty()) {
        result.emplace_back(current);
      }
      current = "";
    }
    current += c;
  }

  if (!current.empty()) {
    result.emplace_back(current);
  }

  return result;
}

inline std::string &rtrim(std::string &s) {
  s.erase(std::find_if(s.rbegin(), s.rend(),
                       [](unsigned char ch) { return !std::isspace(ch); })
              .base(),
          s.end());
  return s;
}

inline std::string stripCInfo(std::string val) {
  if (val.find("const ") == 0) {
    val = val.substr(6);
  }

  if (val.find("__kindof ") == 0) {
    val = val.substr(9);
  }

  if (val.find("struct ") == 0) {
    val = val.substr(7);
  }

  if (val.find("enum ") == 0) {
    val = val.substr(5);
  }

  if (val.find("union ") == 0) {
    val = val.substr(6);
  }

  return val;
}

inline std::string transformStructName(std::string name) {
  auto find = name.find("unnamed at");
  if (find == std::string::npos) {
    find = name.find("anonymous at");
  }
  if (find != std::string::npos) {
    // hash the name
    std::hash<std::string> hasher;
    name = "unnamed_" + std::to_string(hasher(name.substr(find)));
  }
  return name;
}

inline std::string getFrameworkName(CXCursor cursor) {
  CXSourceLocation srcloc = clang_getCursorLocation(cursor);
  CXFile file;
  clang_getFileLocation(srcloc, &file, nullptr, nullptr, nullptr);
  CXString fileName = clang_getFileName(file);
  std::string fileNameStr = clang_getCString(fileName);
  clang_disposeString(fileName);
  auto pos = fileNameStr.find(".framework/");
  if (pos == std::string::npos) {
    return "Runtime";
  }
  std::string frameworkName = fileNameStr.substr(0, pos);
  frameworkName = frameworkName.substr(frameworkName.find_last_of("/") + 1);
  return frameworkName;
}

inline bool isAvailable(CXCursor cursor) {
  // Keep all declarations in metadata, except those that clang marks as
  // inaccessible.
  return clang_getCursorAvailability(cursor) != CXAvailability_NotAccessible;
}

inline bool isSelectorOwned(const std::string& selectorName) {
  return selectorName.find("copy") == 0 ||
         selectorName.find("mutableCopy") == 0 ||
         selectorName.find("new") == 0 || selectorName.find("alloc") == 0;
}

} // namespace metagen

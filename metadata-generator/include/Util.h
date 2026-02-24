#pragma once

#include <clang-c/Index.h>
#include <algorithm>
#include <cctype>
#include <cstring>
#include <cstdlib>
#include <string>
#include <vector>

namespace metagen {

enum class AvailabilityPlatform {
  Unknown,
  IOS,
  MacOS,
  TvOS,
  WatchOS,
  XROS,
};

inline AvailabilityPlatform gAvailabilityPlatform = AvailabilityPlatform::Unknown;
inline int gAvailabilityTargetMajor = -1;
inline int gAvailabilityTargetMinor = -1;

inline AvailabilityPlatform platformFromTargetTriple(const std::string& targetTriple) {
  if (targetTriple.find("macosx") != std::string::npos) return AvailabilityPlatform::MacOS;
  if (targetTriple.find("ios") != std::string::npos) return AvailabilityPlatform::IOS;
  if (targetTriple.find("tvos") != std::string::npos) return AvailabilityPlatform::TvOS;
  if (targetTriple.find("watchos") != std::string::npos) return AvailabilityPlatform::WatchOS;
  if (targetTriple.find("xros") != std::string::npos) return AvailabilityPlatform::XROS;
  return AvailabilityPlatform::Unknown;
}

inline bool parsePlatformVersionFromTargetTriple(const std::string& targetTriple, int& major,
                                                 int& minor) {
  size_t pos = std::string::npos;
  if ((pos = targetTriple.find("macosx")) != std::string::npos) {
    pos += 6;
  } else if ((pos = targetTriple.find("watchos")) != std::string::npos) {
    pos += 7;
  } else if ((pos = targetTriple.find("tvos")) != std::string::npos) {
    pos += 4;
  } else if ((pos = targetTriple.find("xros")) != std::string::npos) {
    pos += 4;
  } else if ((pos = targetTriple.find("ios")) != std::string::npos) {
    pos += 3;
  } else {
    return false;
  }

  if (pos >= targetTriple.size() || !std::isdigit(targetTriple[pos])) {
    return false;
  }

  size_t start = pos;
  while (pos < targetTriple.size() && std::isdigit(targetTriple[pos])) pos++;
  major = std::atoi(targetTriple.substr(start, pos - start).c_str());
  minor = 0;

  if (pos < targetTriple.size() && targetTriple[pos] == '.') {
    pos++;
    size_t minorStart = pos;
    while (pos < targetTriple.size() && std::isdigit(targetTriple[pos])) pos++;
    if (minorStart < pos) {
      minor = std::atoi(targetTriple.substr(minorStart, pos - minorStart).c_str());
    }
  }

  return true;
}

inline void setAvailabilityTargetTriple(const std::string& targetTriple) {
  gAvailabilityPlatform = platformFromTargetTriple(targetTriple);
  gAvailabilityTargetMajor = -1;
  gAvailabilityTargetMinor = -1;

  int major = -1;
  int minor = -1;
  if (parsePlatformVersionFromTargetTriple(targetTriple, major, minor)) {
    gAvailabilityTargetMajor = major;
    gAvailabilityTargetMinor = minor;
  }
}

inline const char* platformNameForAvailability(AvailabilityPlatform platform) {
  switch (platform) {
    case AvailabilityPlatform::IOS:
      return "ios";
    case AvailabilityPlatform::MacOS:
      return "macos";
    case AvailabilityPlatform::TvOS:
      return "tvos";
    case AvailabilityPlatform::WatchOS:
      return "watchos";
    case AvailabilityPlatform::XROS:
      return "xros";
    default:
      return nullptr;
  }
}

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
  auto availability = clang_getCursorAvailability(cursor);
  if (availability != CXAvailability_Available &&
      availability != CXAvailability_Deprecated) {
    return false;
  }

  if (gAvailabilityPlatform == AvailabilityPlatform::Unknown ||
      gAvailabilityTargetMajor < 0) {
    return true;
  }

  int alwaysDeprecated = 0;
  int alwaysUnavailable = 0;
  CXString deprecatedMessage;
  CXString unavailableMessage;
  int availabilityCount = clang_getCursorPlatformAvailability(
      cursor, &alwaysDeprecated, &deprecatedMessage, &alwaysUnavailable,
      &unavailableMessage, nullptr, 0);
  clang_disposeString(deprecatedMessage);
  clang_disposeString(unavailableMessage);
  if (alwaysUnavailable) {
    return false;
  }

  if (availabilityCount <= 0) {
    return true;
  }

  std::vector<CXPlatformAvailability> platformAvailability(
      static_cast<size_t>(availabilityCount));
  clang_getCursorPlatformAvailability(
      cursor, &alwaysDeprecated, &deprecatedMessage, &alwaysUnavailable,
      &unavailableMessage, platformAvailability.data(), availabilityCount);
  clang_disposeString(deprecatedMessage);
  clang_disposeString(unavailableMessage);

  const char* wantedPlatform = platformNameForAvailability(gAvailabilityPlatform);
  bool isCursorAvailableForTarget = true;
  for (auto& item : platformAvailability) {
    const char* platform = clang_getCString(item.Platform);
    if (wantedPlatform != nullptr && platform != nullptr &&
        std::string(platform) == wantedPlatform) {
      if (item.Unavailable) {
        continue;
      }

      const int introducedMajor = item.Introduced.Major;
      const int introducedMinor =
          item.Introduced.Minor >= 0 ? item.Introduced.Minor : 0;
      if (introducedMajor >= 0 &&
          (introducedMajor > gAvailabilityTargetMajor ||
           (introducedMajor == gAvailabilityTargetMajor &&
            introducedMinor > gAvailabilityTargetMinor))) {
        isCursorAvailableForTarget = false;
        break;
      }
    }
  }

  for (auto& item : platformAvailability) {
    clang_disposeCXPlatformAvailability(&item);
  }

  return isCursorAvailableForTarget;
}

inline bool isSelectorOwned(const std::string& selectorName) {
  return selectorName.find("copy") == 0 ||
         selectorName.find("mutableCopy") == 0 ||
         selectorName.find("new") == 0 || selectorName.find("alloc") == 0;
}

inline bool cursorPrettyTextContains(CXCursor cursor, const char* needle) {
  if (needle == nullptr || needle[0] == '\0') {
    return false;
  }

  CXString cxText = clang_getCursorPrettyPrinted(cursor, nullptr);
  const char* text = clang_getCString(cxText);
  const bool contains = text != nullptr && std::strstr(text, needle) != nullptr;
  clang_disposeString(cxText);
  return contains;
}

inline bool cursorTokensContain(CXCursor cursor, const char* tokenText) {
  if (tokenText == nullptr || tokenText[0] == '\0') {
    return false;
  }

  CXTranslationUnit tu = clang_Cursor_getTranslationUnit(cursor);
  if (tu == nullptr) {
    return false;
  }

  CXToken* tokens = nullptr;
  unsigned tokenCount = 0;
  clang_tokenize(tu, clang_getCursorExtent(cursor), &tokens, &tokenCount);

  bool found = false;
  for (unsigned i = 0; i < tokenCount; i++) {
    CXString cxToken = clang_getTokenSpelling(tu, tokens[i]);
    const char* spelling = clang_getCString(cxToken);
    if (spelling != nullptr && std::strcmp(spelling, tokenText) == 0) {
      found = true;
      clang_disposeString(cxToken);
      break;
    }
    clang_disposeString(cxToken);
  }

  if (tokens != nullptr) {
    clang_disposeTokens(tu, tokens, tokenCount);
  }

  return found;
}

inline bool cursorHasReturnsRetainedAttribute(CXCursor cursor) {
  struct ReturnsRetainedSearch {
    bool hasAttribute = false;
    CXCursor cursor;
  } search = {false, cursor};

  clang_visitChildren(
      cursor,
      [](CXCursor child, CXCursor, CXClientData clientData) {
        auto* search = static_cast<ReturnsRetainedSearch*>(clientData);
        if (child.kind == CXCursor_NSReturnsRetained) {
          search->hasAttribute = true;
          return CXChildVisit_Break;
        }

        if (child.kind == CXCursor_UnexposedAttr &&
            (cursorTokensContain(search->cursor, "CF_RETURNS_RETAINED") ||
             cursorPrettyTextContains(search->cursor, "cf_returns_retained"))) {
          search->hasAttribute = true;
          return CXChildVisit_Break;
        }

        return CXChildVisit_Continue;
      },
      &search);

  return search.hasAttribute;
}

} // namespace metagen

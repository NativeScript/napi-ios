#include <stdio.h>

#include <filesystem>
#include <fstream>
#include <iostream>
#include <regex>
#include <sstream>
#include <string>
#include <system_error>
#include <unordered_set>
#include <vector>

inline void ltrim(std::string& s) {
  s.erase(s.begin(), std::find_if(s.begin(), s.end(), [](unsigned char ch) {
            return !std::isspace(ch);
          }));
}

inline void rtrim(std::string& s) {
  s.erase(std::find_if(s.rbegin(), s.rend(),
                       [](unsigned char ch) { return !std::isspace(ch); })
              .base(),
          s.end());
}

inline bool isHeader(std::string& s) {
  return s.ends_with(".h") || s.ends_with(".H");
}

inline bool isModueMap(std::string& s) { return s.ends_with(".modulemap"); }

static void addIncludePath(const std::string& path,
                           std::vector<std::string>& includePaths,
                           std::unordered_set<std::string>& includePathSet) {
  if (includePathSet.emplace(path).second) {
    includePaths.push_back(path);
  }
}

static void addHeaderInclude(const std::string& header,
                             std::vector<std::string>& includes,
                             std::unordered_set<std::string>& includeSet) {
  if (includeSet.emplace(header).second &&
      !header.ends_with("umbrella-arm64.h") &&
      !header.ends_with("umbrella-x86_64.h") &&
      header.find("/platforms/ios/internal/") == std::string::npos &&
      header.find("/usr/include/ffi/") == std::string::npos) {
    includes.push_back(header);
  }
}

static std::error_code CreateUmbrellaHeaderForAmbientModulesInner(
    std::string dir, bool isFrameworksDir,
    std::vector<std::string>& umbrellaHeaders,
    std::vector<std::string>& includePaths,
    std::vector<std::string>& frameworks,
    std::unordered_set<std::string>& umbrellaHeaderSet,
    std::unordered_set<std::string>& includePathSet,
    std::unordered_set<std::string>& frameworkSet, bool isUmbrella = false);

static std::error_code CreateUmbrellaHeaderForAmbientModule(
    std::filesystem::path basePath, bool isFramework, std::string moduleMapPath,
    std::vector<std::string>& umbrellaHeaders,
    std::vector<std::string>& includePaths,
    std::vector<std::string>& frameworks,
    std::unordered_set<std::string>& umbrellaHeaderSet,
    std::unordered_set<std::string>& includePathSet,
    std::unordered_set<std::string>& frameworkSet) {
  std::cerr << "Creating umbrella header for module map: " << moduleMapPath
            << " in " << basePath << std::endl;

  std::ifstream file(moduleMapPath);

  std::string basePathStr = basePath.string();
  addIncludePath(basePathStr, includePaths, includePathSet);

  if (isFramework && frameworkSet.emplace(basePathStr).second) {
    frameworks.push_back(basePath.string());
  }

  std::string line;
  static const std::regex headerRegex(
      R"((umbrella\s+header|header|umbrella|extern\s+module\s+[^"\s]+)\s+\"([^"]+)\")");
  static const std::regex excludeHeaderRegex(R"(exclude\s+header)");
  std::smatch match, match2;

  std::vector<std::string> headers;

  while (std::getline(file, line)) {
    if (std::regex_search(line, match, headerRegex) &&
        !std::regex_search(line, match2, excludeHeaderRegex)) {
      std::string header = match[2];

      // std::cerr << "Found header: " << header << std::endl;

      if (isHeader(header)) {
        std::filesystem::path headerPath =
            isFramework ? basePath / "Headers" / header : basePath / header;

        if (header.starts_with("/")) {
          headerPath = header;
          std::string headerPathOuter = headerPath.string();
          addIncludePath(headerPathOuter, includePaths, includePathSet);
        }

        if (std::filesystem::exists(headerPath)) {
          std::cerr << "Adding modulemap header: " << headerPath.string()
                    << std::endl;
          std::string headerPathStr = headerPath.string();
          addHeaderInclude(headerPathStr, umbrellaHeaders, umbrellaHeaderSet);
        }
      } else if (isModueMap(header)) {
        std::filesystem::path moduleMapPath = basePath / header;
        if (std::error_code code = CreateUmbrellaHeaderForAmbientModule(
                basePath, isFramework, moduleMapPath.string(), umbrellaHeaders,
                includePaths, frameworks, umbrellaHeaderSet, includePathSet,
                frameworkSet))
          return code;
      } else {
        std::filesystem::path headerDir = basePath / header;
        if (std::error_code code = CreateUmbrellaHeaderForAmbientModulesInner(
                headerDir.string(), false, umbrellaHeaders, includePaths,
                frameworks, umbrellaHeaderSet, includePathSet, frameworkSet,
                true))
          return code;
      }
    }
  }

  file.close();

  return std::error_code();
}

static std::error_code CreateUmbrellaHeaderForAmbientModulesInner(
    std::string dir, bool isFrameworksDir,
    std::vector<std::string>& umbrellaHeaders,
    std::vector<std::string>& includePaths,
    std::vector<std::string>& frameworks,
    std::unordered_set<std::string>& umbrellaHeaderSet,
    std::unordered_set<std::string>& includePathSet,
    std::unordered_set<std::string>& frameworkSet, bool isUmbrella) {
  if (dir.find("/usr/include/c++/") != std::string::npos) {
    return std::error_code();
  }

  if (dir.find("/lib/clang/") != std::string::npos) {
    return std::error_code();
  }

  // On macOS SDKs, keep only selected public runtime headers from usr/include
  // so we avoid broad private header parsing while preserving compatibility.
  if (dir.find("/MacOSX.platform/Developer/SDKs/") != std::string::npos &&
      dir.ends_with("/usr/include")) {
    for (const char* subdir : {"objc", "dispatch"}) {
      std::filesystem::path headersPath = std::filesystem::path(dir) / subdir;
      if (std::filesystem::exists(headersPath)) {
        if (std::error_code code = CreateUmbrellaHeaderForAmbientModulesInner(
                headersPath.string(), false, umbrellaHeaders, includePaths,
                frameworks, umbrellaHeaderSet, includePathSet, frameworkSet)) {
          return code;
        }
      }
    }
    return std::error_code();
  }

  if (dir.find("/MacOSX.platform/Developer/SDKs/") != std::string::npos &&
      dir.find("/usr/include/") != std::string::npos &&
      dir.find("/usr/include/objc") == std::string::npos &&
      dir.find("/usr/include/dispatch") == std::string::npos) {
    return std::error_code();
  }

  addIncludePath(dir, includePaths, includePathSet);

  std::filesystem::path moduleMapPath = dir + "/module.modulemap";
  if (std::filesystem::exists(moduleMapPath) && !isUmbrella) {
    if (std::error_code code = CreateUmbrellaHeaderForAmbientModule(
            dir, false, moduleMapPath.string(), umbrellaHeaders, includePaths,
            frameworks, umbrellaHeaderSet, includePathSet, frameworkSet)) {
      return code;
    }

    return std::error_code();
  }

  for (const auto& entry : std::filesystem::directory_iterator(dir)) {
    std::string pathstring = entry.path().string();
    if (entry.is_directory()) {
      // TODO: .xcframework
      if (pathstring.ends_with(".framework") && isFrameworksDir) {
        // These frameworks currently introduce parser-only failures that are
        // not required for app/runtime test metadata generation.
        if (pathstring.ends_with("/DriverKit.framework") ||
            pathstring.ends_with("/Ruby.framework")) {
          continue;
        }
        std::cerr << "Found framework: " << pathstring << std::endl;
        std::filesystem::path moduleMapPath =
            entry.path() / "Modules" / "module.modulemap";
        if (std::filesystem::exists(moduleMapPath)) {
          // try to open Modules/module.modulemap to see which headers to
          // include
          if (std::error_code code = CreateUmbrellaHeaderForAmbientModule(
                  entry.path(), true, moduleMapPath.string(), umbrellaHeaders,
                  includePaths, frameworks, umbrellaHeaderSet, includePathSet,
                  frameworkSet)) {
            return code;
          }
          // If there is Modules but no module.modulemap, then its a Swift
          // framework
        } else if (!std::filesystem::exists(entry.path() / "Modules")) {
          // all headers in Headers/
          std::filesystem::path headersPath = entry.path() / "Headers";
          if (std::filesystem::exists(headersPath)) {
            std::error_code code = CreateUmbrellaHeaderForAmbientModulesInner(
                headersPath, false, umbrellaHeaders, includePaths, frameworks,
                umbrellaHeaderSet, includePathSet, frameworkSet);
            if (code) {
              return code;
            }
          }
        }

        if (std::filesystem::exists(entry.path() / "Frameworks")) {
          if (std::error_code code = CreateUmbrellaHeaderForAmbientModulesInner(
                  entry.path() / "Frameworks", true, umbrellaHeaders,
                  includePaths, frameworks, umbrellaHeaderSet, includePathSet,
                  frameworkSet)) {
            return code;
          }
        }

        if (std::filesystem::exists(entry.path() / "SubFrameworks")) {
          if (std::error_code code = CreateUmbrellaHeaderForAmbientModulesInner(
                  entry.path() / "SubFrameworks", true, umbrellaHeaders,
                  includePaths, frameworks, umbrellaHeaderSet, includePathSet,
                  frameworkSet)) {
            return code;
          }
        }
      } else if (!isFrameworksDir && !entry.is_symlink()) {
        // TODO: should it inherit isFrameworksDir? I think not
        if (std::error_code code = CreateUmbrellaHeaderForAmbientModulesInner(
                pathstring, false, umbrellaHeaders, includePaths, frameworks,
                umbrellaHeaderSet, includePathSet, frameworkSet)) {
          return code;
        }
      }
    } else if (isHeader(pathstring)) {
      addHeaderInclude(pathstring, umbrellaHeaders, umbrellaHeaderSet);
    }
  }

  return std::error_code();
}

static std::error_code CreateUmbrellaHeaderForAmbientModules(
    const std::vector<std::string>& args,
    std::vector<std::string>& umbrellaHeaders,
    std::vector<std::string>& includePaths,
    std::vector<std::string>& frameworks) {
  std::unordered_set<std::string> umbrellaHeaderSet;
  std::unordered_set<std::string> includePathSet;
  std::unordered_set<std::string> frameworkSet;

  umbrellaHeaderSet.reserve(1024);
  includePathSet.reserve(1024);
  frameworkSet.reserve(256);

  std::stringstream cmd = {};

  cmd << "clang -v -E -x c /dev/null 2>&1";

  for (auto& arg : args) {
    cmd << " " << arg;
  }

  std::string finalCmd = cmd.str();

  std::cerr << "Running: " << finalCmd << std::endl;

  FILE* pipe = popen(finalCmd.c_str(), "r");

  char buffer[512];
  bool inIncludeSection = false;

  std::vector<std::string> paths;

  while (fgets(buffer, sizeof(buffer), pipe)) {
    std::string line(buffer);

    if (line.find("#include <...> search starts here:") != std::string::npos) {
      inIncludeSection = true;
      continue;
    }
    if (inIncludeSection &&
        line.find("End of search list.") != std::string::npos) {
      break;
    }
    if (inIncludeSection) {
      rtrim(line);
      ltrim(line);
      paths.push_back(line);
    }
  }

  for (std::string path : paths) {
    if (path.find("Toolchains/XcodeDefault.xctoolchain/") !=
        std::string::npos) {
      continue;
    }

    std::cerr << "HeaderSearch - " << path << std::endl;

    bool isFrameworksDir = false;
    if (path.ends_with("(framework directory)")) {
      path = path.substr(0, path.size() - 22);
      isFrameworksDir = true;
    }
    if (std::error_code code = CreateUmbrellaHeaderForAmbientModulesInner(
            path, isFrameworksDir, umbrellaHeaders, includePaths, frameworks,
            umbrellaHeaderSet, includePathSet, frameworkSet)) {
      return code;
    }
  }

  for (const std::string& arg : args) {
    if (arg.find("-fmodule-map-file=") == 0) {
      std::string moduleMapFile = arg.substr(18);
      std::filesystem::path moduleMapPath(moduleMapFile);
      if (std::filesystem::exists(moduleMapPath)) {
        std::cerr << "Found module map arg: " << moduleMapPath.string()
                  << std::endl;
        if (std::error_code code = CreateUmbrellaHeaderForAmbientModule(
                moduleMapPath.parent_path(), false, moduleMapPath,
                umbrellaHeaders, includePaths, frameworks, umbrellaHeaderSet,
                includePathSet, frameworkSet)) {
          return code;
        }
        std::cerr << "Added module map headers from: " << moduleMapPath.string()
                  << std::endl;
      }
    }
  }

  pclose(pipe);

  return std::error_code();
}

// Sort headers so that -Swift headers come last (see
// https://github.com/NativeScript/ios-runtime/issues/1153)
int headerPriority(const std::string& h) {
  if (std::string::npos != h.find("-Swift")) {
    return 1;
  } else {
    return 0;
  }
}

std::string CreateUmbrellaHeader(const std::vector<std::string>& clangArgs,
                                 std::vector<std::string>& includePaths,
                                 std::vector<std::string>& frameworks) {
  // Generate umbrella header for all modules from the sdk
  std::vector<std::string> umbrellaHeaders;
  if (std::error_code code = CreateUmbrellaHeaderForAmbientModules(
          clangArgs, umbrellaHeaders, includePaths, frameworks)) {
    std::cerr << "Failed to create umbrella header: " << code.message()
              << std::endl;
    return "";
  }

  std::stable_sort(umbrellaHeaders.begin(), umbrellaHeaders.end(),
                   [](const std::string& h1, const std::string& h2) {
                     return headerPriority(h1) < headerPriority(h2);
                   });

  std::stringstream umbrellaHeaderContents;
  for (const auto& h : umbrellaHeaders) {
    umbrellaHeaderContents << "#import \"" << h.c_str() << "\"" << std::endl;
  }

  return umbrellaHeaderContents.str();
}

// int main(int argc, char** argv) {
//   std::vector<std::string> clangArgs;

//   for (int i = 1; i < argc; i++) {
//     clangArgs.push_back(argv[i]);
//   }

//   std::vector<std::string> includePaths;

//   std::cerr << "Creating umbrella header" << std::endl;

//   std::string umbrella = CreateUmbrellaHeader(clangArgs, includePaths);

//   // write umbrella header to a file

//   std::string umbrellaHeaderName = "umbrella.h";
//   FILE* umbrellaHeader = std::fopen(umbrellaHeaderName.c_str(), "w");
//   std::fwrite(umbrella.c_str(), 1, umbrella.size(), umbrellaHeader);
//   std::fclose(umbrellaHeader);

//   for (auto& path : includePaths) {
//     std::cerr << path << std::endl;
//   }

//   return 0;
// }

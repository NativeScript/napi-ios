#ifdef ENABLE_JS_RUNTIME

#include <filesystem>
#include <fstream>
#include <iostream>

#include "Bundle.h"
#include "Runtime.h"
#include "RuntimeConfig.h"
#include "segappend.h"

using namespace nativescript;

void bootFromBytecode(std::string baseDir, const void* data, size_t size) {
  RuntimeConfig.BaseDir = baseDir;

  auto runtime = Runtime();

  // TODO
  // runtime.ExecuteBytecode(data, size);

  runtime.RunLoop();
}

void bootFromModuleSpec(std::string baseDir, std::string spec) {
  RuntimeConfig.BaseDir = baseDir;

  auto runtime = Runtime();

  runtime.RunModule(spec);

  runtime.RunLoop();
}

int main(int argc, char** argv) {
#ifdef __APPLE__
  std::string bytecodePath = getBytecodePathFromBundle();
  if (!bytecodePath.empty()) {
    std::string bundlePath = getBundlePath();

    std::ifstream file(bytecodePath, std::ios::binary);
    if (!file.is_open()) {
      std::cout << "Failed to open bytecode file" << std::endl;
      return 1;
    }

    file.seekg(0, std::ios::end);
    size_t size = file.tellg();
    file.seekg(0, std::ios::beg);

    std::vector<uint8_t> data(size);
    file.read((char*)data.data(), size);

    file.close();

    bootFromBytecode(bundlePath, data.data(), size);

    return 0;
  }
#endif  // __APPLE__

  const uint8_t* segmentData;
  size_t segmentSize;
  auto status = segappend_load_segment("__nativescript_start",
                                       (void**)&segmentData, &segmentSize);

  std::string cwd = std::filesystem::current_path().string();

  if (status == segappend_ok) {
    auto runtime = Runtime();
    size_t bytecode_size = *(size_t*)segmentData;
    segmentData += sizeof(size_t);

    bootFromBytecode(cwd, segmentData, bytecode_size);
  } else {
    if (argc < 3) {
      std::cout << "Usage: " << argv[0] << " run <js file>" << std::endl;
      return 1;
    }

    std::string cmd = argv[1];

    if (cmd == "run") {
      bootFromModuleSpec(cwd, argv[2]);
    } else {
      std::cout << "Unknown command: " << cmd << std::endl;
      return 1;
    }
  }

  return 0;
}

#endif  // ENABLE_JS_RUNTIME

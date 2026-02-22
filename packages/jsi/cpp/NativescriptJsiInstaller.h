#pragma once

#include <jsi/jsi.h>

namespace nativescriptjsi {

class NativescriptJsiInstaller {
 public:
  static void install(facebook::jsi::Runtime& runtime);
};

}  // namespace nativescriptjsi

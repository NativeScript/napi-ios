#pragma once

#include <memory>
#include <string>

#include <NativeScriptNativeApiSpecJSI.h>
#include <ReactCommon/CallInvoker.h>
#include <jsi/jsi.h>

namespace facebook::react {

class NativeScriptNativeApiModule
    : public NativeScriptNativeApiCxxSpec<NativeScriptNativeApiModule> {
 public:
  explicit NativeScriptNativeApiModule(std::shared_ptr<CallInvoker> jsInvoker);

  bool install(jsi::Runtime& runtime, std::string metadataPath);
  bool isInstalled(jsi::Runtime& runtime);
  std::string defaultMetadataPath(jsi::Runtime& runtime);
  std::string getRuntimeBackend(jsi::Runtime& runtime);
  bool __writeTestMarker(jsi::Runtime& runtime, std::string content);

 private:
  std::shared_ptr<CallInvoker> jsInvoker_;
};

}  // namespace facebook::react

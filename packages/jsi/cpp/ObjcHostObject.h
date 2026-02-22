#pragma once

#include <jsi/jsi.h>

#include <memory>

namespace nativescriptjsi {

class ObjcHostObject : public facebook::jsi::HostObject {
 public:
  explicit ObjcHostObject();

  facebook::jsi::Value get(facebook::jsi::Runtime& rt,
                           const facebook::jsi::PropNameID& name) override;

  void set(facebook::jsi::Runtime& rt, const facebook::jsi::PropNameID& name,
           const facebook::jsi::Value& value) override;

  std::vector<facebook::jsi::PropNameID> getPropertyNames(
      facebook::jsi::Runtime& rt) override;
};

}  // namespace nativescriptjsi

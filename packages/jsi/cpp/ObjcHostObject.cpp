#include "ObjcHostObject.h"
#include <jsi/JSIDynamic.h>

namespace nativescriptjsi {

ObjcHostObject::ObjcHostObject() {}

facebook::jsi::Value ObjcHostObject::get(facebook::jsi::Runtime &rt,
                                            const facebook::jsi::PropNameID &name) {
  // TODO

  return facebook::jsi::Value();
}

void ObjcHostObject::set(facebook::jsi::Runtime &rt,
                            const facebook::jsi::PropNameID &name,
                            const facebook::jsi::Value &value) {
  // TODO
}

std::vector<facebook::jsi::PropNameID>
ObjcHostObject::getPropertyNames(facebook::jsi::Runtime &rt) {
  std::vector<facebook::jsi::PropNameID> names;

  return names;
}

} // namespace nativescriptjsi

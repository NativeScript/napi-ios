#ifndef C_FUNCTION_H
#define C_FUNCTION_H

#include "Cif.h"

namespace nativescript {

class CFunction {
 public:
  static napi_value jsCall(napi_env env, napi_callback_info cbinfo);

  CFunction(void* fnptr) : fnptr(fnptr) {}
  ~CFunction();

  void* fnptr;
  Cif* cif = nullptr;
};

}  // namespace nativescript

#endif /* C_FUNCTION_H */

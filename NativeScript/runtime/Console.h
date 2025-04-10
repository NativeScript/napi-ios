#ifndef CONSOLE_H
#define CONSOLE_H

#include "native_api_util.h"

namespace nativescript {

enum ConsoleLogType {
  kConsoleLogTypeLog,
  kConsoleLogTypeError,
  kConsoleLogTypeWarn,
  kConsoleLogTypeInfo,
  kConsoleLogTypeAssert,
};

class Console {
 public:
  static JS_CLASS_INIT(Init);

  static JS_METHOD(Constructor);

  static JS_METHOD(Log);

  static JS_METHOD(Time);

  static JS_METHOD(TimeEnd);

  static JS_METHOD(Dir);

  static JS_METHOD(Trace);
};

}  // namespace nativescript

#endif  // CONSOLE_H

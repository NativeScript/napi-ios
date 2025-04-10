#include "Console.h"

#include <sstream>
#include <string>

#include "js_native_api.h"
#include "native_api_util.h"
#include "runtime/RuntimeConfig.h"

#ifdef __APPLE__
#include <CoreFoundation/CFString.h>
void NSLog(CFStringRef format, ...);
#else
#include <iostream>
#endif

namespace nativescript {

JS_CLASS_INIT(Console::Init) {
  napi_value Console, console;

  const napi_property_descriptor properties[] = {
      napi_util::desc("log", Log, (void*)kConsoleLogTypeLog),
      napi_util::desc("error", Log, (void*)kConsoleLogTypeError),
      napi_util::desc("warn", Log, (void*)kConsoleLogTypeWarn),
      napi_util::desc("info", Log, (void*)kConsoleLogTypeInfo),
      napi_util::desc("assert", Log, (void*)kConsoleLogTypeAssert),
      napi_util::desc("time", Time, nullptr),
      napi_util::desc("timeEnd", TimeEnd, nullptr),
      napi_util::desc("dir", Dir, nullptr),
      napi_util::desc("trace", Trace, nullptr),
  };

  napi_define_class(env, "Console", NAPI_AUTO_LENGTH, Console::Constructor,
                    nullptr, 9, properties, &Console);

  napi_new_instance(env, Console, 0, nullptr, &console);

  const napi_property_descriptor globalProperties[] = {
      napi_util::desc("Console", Console),
      napi_util::desc("console", console),
  };

  napi_define_properties(env, global, 2, globalProperties);
}

JS_METHOD(Console::Constructor) {
  napi_value thisArg;
  napi_get_cb_info(env, cbinfo, nullptr, nullptr, &thisArg, nullptr);
  return thisArg;
}

JS_METHOD(Console::Log) {
  if (!RuntimeConfig.LogToSystemConsole) {
    return UNDEFINED;
  }

  size_t argc = 0;
  ConsoleLogType stream;
  void* data = nullptr;

  napi_get_cb_info(env, cbinfo, &argc, nullptr, nullptr, &data);

  stream = ConsoleLogType((unsigned long)data);

  size_t initialArg = 0;

  if (stream == kConsoleLogTypeAssert) {
    bool passes = false;

    if (argc > 0) {
      napi_value firstArg = nullptr;
      napi_get_cb_info(env, cbinfo, &argc, &firstArg, nullptr, nullptr);
      napi_coerce_to_bool(env, firstArg, &firstArg);
      napi_get_value_bool(env, firstArg, &passes);
    }

    if (!passes) {
      initialArg = 1;
    } else {
      return UNDEFINED;
    }
  }

  napi_value argv[argc];
  napi_get_cb_info(env, cbinfo, &argc, argv, nullptr, nullptr);

  napi_value global, Symbol, SymbolFor, symbolDescription, symbol;
  napi_get_global(env, &global);
  napi_get_named_property(env, global, "Symbol", &Symbol);
  napi_get_named_property(env, Symbol, "for", &SymbolFor);
  napi_create_string_utf8(env, "nodejs.util.inspect.custom", NAPI_AUTO_LENGTH,
                          &symbolDescription);
  napi_call_function(env, global, SymbolFor, 1, &symbolDescription, &symbol);

  std::stringstream log;

  // TODO(dj): what if we made this pretty?

  log << "CONSOLE";
  switch (stream) {
    case kConsoleLogTypeLog:
      log << " LOG";
      break;
    case kConsoleLogTypeError:
      log << " ERROR";
      break;
    case kConsoleLogTypeWarn:
      log << " WARN";
      break;
    case kConsoleLogTypeInfo:
      log << " INFO";
      break;
    case kConsoleLogTypeAssert:
      log << " ASSERT FAILED";
      break;
  }
  log << ": ";

  for (size_t i = initialArg; i < argc; i++) {
    napi_valuetype type;
    napi_typeof(env, argv[i], &type);

    bool hasSymbol = false;
    if (type == napi_object || type == napi_function) {
      napi_has_property(env, argv[i], symbol, &hasSymbol);
    }

    napi_value argstr = nullptr;

    if (hasSymbol) {
      napi_value fn;
      napi_get_property(env, argv[i], symbol, &fn);
      napi_call_function(env, argv[i], fn, 0, nullptr, &argstr);
    } else {
      napi_coerce_to_string(env, argv[i], &argstr);
    }

    size_t length = 0;
    napi_get_value_string_utf8(env, argstr, nullptr, 0, &length);
    char* strbuf = (char*)malloc(length + 2);
    napi_get_value_string_utf8(env, argstr, strbuf, length + 2, &length);
    strbuf[length] = i >= (argc - 1) ? '\0' : ' ';
    strbuf[length + 1] = '\0';
    log << strbuf;
    free(strbuf);
  }

  log << "\n";

  std::string logString = log.str();

#ifdef __APPLE__
  NSLog(CFSTR("%s"), logString.c_str());
#else
  switch (stream) {
    case kConsoleLogTypeLog:
    case kConsoleLogTypeInfo:
      std::cout << logString;
      break;
    case kConsoleLogTypeError:
    case kConsoleLogTypeWarn:
    case kConsoleLogTypeAssert:
      std::cerr << logString;
      break;
  }
#endif

  return UNDEFINED;
}

JS_METHOD(Console::Time) {
  napi_value thisArg;
  napi_get_cb_info(env, cbinfo, nullptr, nullptr, &thisArg, nullptr);
  return thisArg;
}

JS_METHOD(Console::TimeEnd) {
  napi_value thisArg;
  napi_get_cb_info(env, cbinfo, nullptr, nullptr, &thisArg, nullptr);
  return thisArg;
}

JS_METHOD(Console::Dir) {
  napi_value thisArg;
  napi_get_cb_info(env, cbinfo, nullptr, nullptr, &thisArg, nullptr);
  return thisArg;
}

JS_METHOD(Console::Trace) {
  napi_value thisArg;
  napi_get_cb_info(env, cbinfo, nullptr, nullptr, &thisArg, nullptr);
  return thisArg;
}

}  // namespace nativescript

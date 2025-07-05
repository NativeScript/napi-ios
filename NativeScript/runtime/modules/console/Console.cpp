#include "Console.h"

#include <sstream>
#include <string>

#include "js_native_api.h"
#include "native_api_util.h"
#include "runtime/RuntimeConfig.h"
#include "runtime/Util.h"
#ifdef TARGET_ENGINE_V8
#include "v8-api.h"
#endif

#ifdef __APPLE__
#include <CoreFoundation/CFString.h>
extern "C" void NSLog(CFStringRef format, ...);
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

std::string transformJSObject(napi_env env, napi_value object) {
  napi_value toStringFunc;
  bool hasToString = false;

  // Check if the object has a toString method
  napi_has_named_property(env, object, "toString", &hasToString);
  if (hasToString) {
    napi_get_named_property(env, object, "toString", &toStringFunc);
    if (napi_util::is_of_type(env, toStringFunc, napi_function)) {
      napi_value result;
      napi_call_function(env, object, toStringFunc, 0, nullptr, &result);
      auto value = napi_util::get_cxx_string(env, result);
      auto hasCustomToStringImplementation =
          value.find("[object Object]") == std::string::npos;
      if (hasCustomToStringImplementation) return value;
    }
  }
  // If no custom toString method, stringify the object
  return JsonStringifyObject(env, object, false);
}

std::string buildStringFromArg(napi_env env, napi_value val) {
  napi_valuetype type;
  napi_typeof(env, val, &type);

  if (type == napi_function) {
    napi_value funcString;
    napi_coerce_to_string(env, val, &funcString);
    return napi_util::get_string_value(env, funcString);
  } else if (napi_util::is_array(env, val)) {
    napi_value global;
    napi_get_global(env, &global);
    return JsonStringifyObject(env, val, false);
  } else if (type == napi_object) {
    return transformJSObject(env, val);
  } else if (type == napi_symbol) {
    napi_value symString;
    napi_coerce_to_string(env, val, &symString);
    return "Symbol(" + napi_util::get_cxx_string(env, symString) + ")";
  } else {
    napi_value defaultToString;
    napi_coerce_to_string(env, val, &defaultToString);
    return napi_util::get_string_value(env, defaultToString);
  }
}

std::string buildLogString(napi_env env, napi_callback_info info,
                           int startingIndex = 0) {
  NAPI_CALLBACK_BEGIN_VARGS()

  std::stringstream ss;

  if (argc) {
    for (size_t i = startingIndex; i < argc; i++) {
      // separate args with a space
      if (i != 0) {
        ss << " ";
      }

      std::string argString = buildStringFromArg(env, argv[i]);
      ss << argString;
    }
  } else {
    ss << std::endl;
  }

  return ss.str();
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

  log << buildLogString(env, cbinfo, initialArg);

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

#ifdef TARGET_ENGINE_V8
  v8_inspector::ConsoleAPIType method;
  switch (stream) {
    case kConsoleLogTypeLog:
      method = v8_inspector::ConsoleAPIType::kLog;
      break;
    case kConsoleLogTypeError:
      method = v8_inspector::ConsoleAPIType::kError;
      break;
    case kConsoleLogTypeWarn:
      method = v8_inspector::ConsoleAPIType::kWarning;
      break;
    case kConsoleLogTypeInfo:
      method = v8_inspector::ConsoleAPIType::kInfo;
      break;
    case kConsoleLogTypeAssert:
      method = v8_inspector::ConsoleAPIType::kAssert;
      break;
    default:
      break;
  }

  sendToDevToolsFrontEnd(env, method, logString);
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

#ifdef TARGET_ENGINE_V8
int Console::sendToDevToolsFrontEnd(napi_env env,
                                    v8_inspector::ConsoleAPIType method,
                                    napi_callback_info info) {
  if (!m_callback) {
    return 0;
  }
  NAPI_CALLBACK_BEGIN_VARGS()

  v8::Local<v8::Value>* v8_args = reinterpret_cast<v8::Local<v8::Value>*>(
      const_cast<napi_value*>(argv.data()));

  std::vector<v8::Local<v8::Value>> arg_vector;
  unsigned nargs = argc;
  arg_vector.reserve(nargs);
  for (unsigned ix = 0; ix < nargs; ix++) arg_vector.push_back(v8_args[ix]);

  m_callback(env, method, arg_vector);
  return 0;
}

void Console::sendToDevToolsFrontEnd(napi_env env,
                                     v8_inspector::ConsoleAPIType method,
                                     const std::string& message) {
  if (!m_callback) {
    return;
  }

  v8::Local<v8::Value> v8_message =
      v8::String::NewFromUtf8(env->isolate, message.c_str(),
                              v8::NewStringType::kNormal, message.length())
          .ToLocalChecked();

  std::vector<v8::Local<v8::Value>> args{
      v8_message,
  };
  m_callback(env, method, args);
}
#endif

ConsoleCallback Console::m_callback = nullptr;

}  // namespace nativescript

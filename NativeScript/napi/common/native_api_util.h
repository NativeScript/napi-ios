#ifndef NATIVE_API_UTIL_H_
#define NATIVE_API_UTIL_H_

#include <string>
#include <ios>
#include <cstddef>
#include <cwchar>

#ifdef TARGET_ENGINE_V8
namespace std {
template<>
struct char_traits<unsigned short> {
    using char_type = unsigned short;
    using int_type = int;
    using off_type = streamoff;
    using pos_type = streampos;
    using state_type = mbstate_t;
    
    static void assign(char_type& c1, const char_type& c2) noexcept { c1 = c2; }
    static void assign(char_type* s, size_t n, char_type a) noexcept {
        for (size_t i = 0; i < n; ++i) s[i] = a;
    }
    static bool eq(char_type c1, char_type c2) noexcept { return c1 == c2; }
    static bool lt(char_type c1, char_type c2) noexcept { return c1 < c2; }
    static int compare(const char_type* s1, const char_type* s2, size_t n) {
        for (size_t i = 0; i < n; ++i) {
            if (lt(s1[i], s2[i])) return -1;
            if (lt(s2[i], s1[i])) return 1;
        }
        return 0;
    }
    static size_t length(const char_type* s) {
        size_t len = 0;
        while (!eq(s[len], char_type(0))) ++len;
        return len;
    }
    static const char_type* find(const char_type* s, size_t n, const char_type& a) {
        for (size_t i = 0; i < n; ++i) if (eq(s[i], a)) return s + i;
        return nullptr;
    }
    static char_type* move(char_type* s1, const char_type* s2, size_t n) {
        if (n == 0) return s1;
        return (char_type*)memmove(s1, s2, n * sizeof(char_type));
    }
    static char_type* copy(char_type* s1, const char_type* s2, size_t n) {
        if (n == 0) return s1;
        return (char_type*)memcpy(s1, s2, n * sizeof(char_type));
    }
    static char_type to_char_type(int_type c) noexcept { return char_type(c); }
    static int_type to_int_type(char_type c) noexcept { return int_type(c); }
    static bool eq_int_type(int_type c1, int_type c2) noexcept { return c1 == c2; }
    static int_type eof() noexcept { return static_cast<int_type>(-1); }
    static int_type not_eof(int_type c) noexcept { return eq_int_type(c, eof()) ? 0 : c; }
};
}
#endif // TARGET_ENGINE_V8

#include <dlfcn.h>

#include <sstream>

#include "js_native_api.h"
#include "js_native_api_types.h"

#ifndef NAPI_PREAMBLE
#define NAPI_PREAMBLE napi_status status;
#endif

#define NAPI_CALLBACK_BEGIN(n_args)                                      \
  napi_status status;                                                    \
  napi_value argv[n_args];                                               \
  size_t argc = n_args;                                                  \
  napi_value jsThis;                                                     \
  void* data;                                                            \
  NAPI_GUARD(napi_get_cb_info(env, info, &argc, argv, &jsThis, &data)) { \
    NAPI_THROW_LAST_ERROR                                                \
    return NULL;                                                         \
  }

#define NAPI_CALLBACK_BEGIN_VARGS()                                          \
  napi_status status;                                                        \
  size_t argc;                                                               \
  void* data;                                                                \
  napi_value jsThis;                                                         \
  NAPI_GUARD(napi_get_cb_info(env, info, &argc, nullptr, &jsThis, &data)) {  \
    NAPI_THROW_LAST_ERROR                                                    \
    return NULL;                                                             \
  }                                                                          \
  std::vector<napi_value> argv(argc);                                        \
  if (argc > 0) {                                                            \
    NAPI_GUARD(                                                              \
        napi_get_cb_info(env, info, &argc, argv.data(), nullptr, nullptr)) { \
      NAPI_THROW_LAST_ERROR                                                  \
      return NULL;                                                           \
    }                                                                        \
  }

#define NAPI_ERROR_INFO                                                    \
  const napi_extended_error_info* error_info =                             \
      (napi_extended_error_info*)malloc(sizeof(napi_extended_error_info)); \
  napi_get_last_error_info(env, &error_info);

#define NAPI_THROW_LAST_ERROR \
  NAPI_ERROR_INFO             \
  napi_throw_error(env, NULL, error_info->error_message);

#ifndef DEBUG

#define NAPI_GUARD(expr)                                              \
  status = expr;                                                      \
  if (status != napi_ok) {                                            \
    NAPI_ERROR_INFO                                                   \
    std::stringstream msg;                                            \
    msg << "Node-API returned error: " << status << "\n    " << #expr \
        << "\n    ^\n    "                                            \
        << "at " << __FILE__ << ":" << __LINE__ << "";                \
  }                                                                   \
  if (status != napi_ok)

#else

#define NAPI_GUARD(expr) \
  status = expr;         \
  if (status != napi_ok)

#endif

#define NAPI_FUNCTION(name) \
  napi_value JS_##name(napi_env env, napi_callback_info cbinfo)

#define NAPI_FUNCTION_DESC(name) \
  {#name, NULL, JS_##name, NULL, NULL, NULL, napi_enumerable, NULL}

#define JS_METHOD(name) napi_value name(napi_env env, napi_callback_info cbinfo)

#define JS_CLASS_INIT(name) void name(napi_env env, napi_value global)

#define PROTOTYPE "prototype"
#define OBJECT "Object"
#define SET_PROTOTYPE_OF "setPrototypeOf"
#define CONSTRUCTOR "constructor"

#define UNDEFINED napi_util::undefined(env);

namespace napi_util {

class PersistentObject {
 public:
  PersistentObject(napi_env env, napi_value value)
      : env_(env), isOwnedRef_(true) {
    napi_create_reference(env_, value, 1, &ref_);
  }

  PersistentObject(napi_env env, napi_ref ref)
      : env_(env), ref_(ref), isOwnedRef_(false) {
    uint32_t result;
    napi_reference_ref(env, ref, &result);
  }

  ~PersistentObject() {
    if (isOwnedRef_)
      napi_delete_reference(env_, ref_);
    else {
      uint32_t result;
      napi_reference_unref(env_, ref_, &result);
    }
  }

  napi_value GetValue(napi_env env = nullptr) {
    if (env == nullptr) {
      env = env_;
    }
    napi_value value;
    napi_get_reference_value(env, ref_, &value);
    return value;
  }

  napi_ref GetRef() const { return ref_; }

  napi_env GetEnv() const { return env_; }

 private:
  bool isOwnedRef_ = false;
  napi_env env_;
  napi_ref ref_;
};

inline napi_property_descriptor desc(const char* name, napi_callback method,
                                     void* data = nullptr) {
  return {
      .utf8name = name,
      .name = nullptr,
      .method = method,
      .getter = nullptr,
      .setter = nullptr,
      .value = nullptr,
      .attributes = napi_configurable,
      .data = data,
  };
}

inline napi_property_descriptor desc(const char* name, napi_value value) {
  return {
      .utf8name = name,
      .name = nullptr,
      .method = nullptr,
      .getter = nullptr,
      .setter = nullptr,
      .value = value,
      .attributes = napi_configurable,
      .data = nullptr,
  };
}

inline std::string get_cxx_string(napi_env env, napi_value str) {
  size_t length = 0;
  napi_get_value_string_utf8(env, str, nullptr, 0, &length);
  char* strbuf = (char*)malloc(length + 1);
  napi_get_value_string_utf8(env, str, strbuf, length + 1, &length);
  std::string result = strbuf;
  free(strbuf);
  return result;
}

inline napi_value to_js_number(napi_env env, double value) {
  napi_value js_number;
  napi_create_double(env, value, &js_number);
  return js_number;
}
inline napi_value to_js_number(napi_env env, int32_t value) {
  napi_value js_number;
  napi_create_int32(env, value, &js_number);
  return js_number;
}

inline napi_value to_js_string(napi_env env, const std::string& str) {
  napi_value js_string;
  napi_create_string_utf8(env, str.c_str(), str.length(), &js_string);
  return js_string;
}

inline napi_value to_js_string(napi_env env, const char* str) {
  napi_value js_string;
  napi_create_string_utf8(env, str, strlen(str), &js_string);
  return js_string;
}

inline napi_value undefined(napi_env env) {
  napi_value undefined;
  napi_get_undefined(env, &undefined);
  return undefined;
}

inline napi_value null(napi_env env) {
  napi_value null;
  napi_get_null(env, &null);
  return null;
}

inline napi_ref make_ref(napi_env env, napi_value value,
                         uint32_t initialCount = 1) {
  napi_ref ref;
  napi_create_reference(env, value, initialCount, &ref);
  return ref;
}

inline napi_value get_ref_value(napi_env env, napi_ref ref) {
  napi_value value;
  napi_get_reference_value(env, ref, &value);
  return value;
}

inline napi_value get__proto__(napi_env env, napi_value object) {
  napi_value proto;
  napi_get_named_property(env, object, "__proto__", &proto);
  return proto;
}

inline void set__proto__(napi_env env, napi_value object,
                         napi_value __proto__) {
  napi_set_named_property(env, object, "__proto__", __proto__);
}

inline napi_value getPrototypeOf(napi_env env, napi_value object) {
  napi_value proto;
  napi_get_prototype(env, object, &proto);
  return proto;
}

inline napi_value get_prototype(napi_env env, napi_value object) {
  napi_value prototype;
  napi_get_named_property(env, object, "prototype", &prototype);
  return prototype;
}

inline void set_prototype(napi_env env, napi_value object,
                          napi_value prototype) {
  napi_set_named_property(env, object, "prototype", prototype);
}

inline char* get_string_value(napi_env env, napi_value str, size_t size = 0) {
  size_t str_size = size;
  if (str_size == 0) {
    napi_get_value_string_utf8(env, str, nullptr, 0, &str_size);
  }
  char* buffer = new char[str_size + 1];
  napi_get_value_string_utf8(env, str, buffer, str_size + 1, nullptr);
  return buffer;
}

inline bool has_property(napi_env env, napi_value object,
                         const char* propertyName) {
  bool result;
  napi_has_named_property(env, object, propertyName, &result);
  return result;
}

inline napi_value get_property(napi_env env, napi_value object,
                               const char* propertyName) {
  napi_value value;
  napi_get_named_property(env, object, propertyName, &value);
  return value;
}

inline napi_status define_property(
    napi_env env, napi_value object, const char* propertyName,
    napi_value value = nullptr, napi_callback getter = nullptr,
    napi_callback setter = nullptr, void* data = nullptr,
    napi_property_attributes attributes = napi_default_jsproperty) {
  napi_property_descriptor desc = {
      propertyName,  // utf8name
      nullptr,       // name
      nullptr,       // method
      getter,        // getter
      setter,        // setter
      value,         // value
      attributes,    // attributes
      data           // data
  };

  return napi_define_properties(env, object, 1, &desc);
}

inline void setPrototypeOf(napi_env env, napi_value object,
                           napi_value prototype) {
  napi_value global, global_object, set_proto;

  // Get the global object
  napi_get_global(env, &global);

  // Get the Object global object
  napi_get_named_property(env, global, OBJECT, &global_object);

  // Get the setPrototypeOf function from the Object global object
  napi_get_named_property(env, global_object, SET_PROTOTYPE_OF, &set_proto);

  // Prepare the arguments for the setPrototypeOf call
  napi_value argv[]{object, prototype};
  // Call setPrototypeOf(object, prototype)
  napi_call_function(env, global, set_proto, 2, argv, nullptr);
}

inline bool is_object_explicit(napi_env env, napi_value value) {
  napi_valuetype type;
  napi_typeof(env, value, &type);
  return type == napi_object;
}

inline bool is_object(napi_env env, napi_value value) {
  napi_valuetype type;
  napi_typeof(env, value, &type);
  return type == napi_object || type == napi_function;
}

inline bool is_of_type(napi_env env, napi_value value,
                       napi_valuetype expected_type) {
  napi_valuetype type;
  napi_typeof(env, value, &type);
  return type == expected_type;
}

inline bool is_number_object(napi_env env, napi_value value) {
  bool result;
  napi_value numberCtor;
  napi_value global;
  napi_get_global(env, &global);
  napi_get_named_property(env, global, "Number", &numberCtor);
  napi_instanceof(env, value, numberCtor, &result);
  return result;
}

inline napi_value valueOf(napi_env env, napi_value value) {
  napi_value valueOf, result;
  napi_get_named_property(env, value, "valueOf", &valueOf);
  napi_call_function(env, value, valueOf, 0, nullptr, &result);
  return result;
}

inline bool is_string_object(napi_env env, napi_value value) {
  bool result;
  napi_value stringCtor;
  napi_value global;
  napi_get_global(env, &global);
  napi_get_named_property(env, global, "String", &stringCtor);
  napi_instanceof(env, value, stringCtor, &result);
  return result;
}

inline bool is_boolean_object(napi_env env, napi_value value) {
  bool result;
  napi_value booleanCtor;
  napi_value global;
  napi_get_global(env, &global);
  napi_get_named_property(env, global, "Boolean", &booleanCtor);
  napi_instanceof(env, value, booleanCtor, &result);
  return result;
}

inline bool is_array(napi_env env, napi_value value) {
  bool result;
  napi_is_array(env, value, &result);
  return result;
}

inline bool is_arraybuffer(napi_env env, napi_value value) {
  bool result;
  napi_is_arraybuffer(env, value, &result);
  return result;
}

inline bool is_dataview(napi_env env, napi_value value) {
  bool result;
  napi_is_dataview(env, value, &result);
  return result;
}

inline bool is_typedarray(napi_env env, napi_value value) {
  bool result;
  napi_is_typedarray(env, value, &result);
  return result;
}

inline bool is_date(napi_env env, napi_value value) {
  bool result;
  napi_is_date(env, value, &result);
  return result;
}

inline bool is_undefined(napi_env env, napi_value value) {
  if (value == nullptr) return true;
  napi_valuetype type;
  napi_typeof(env, value, &type);
  return type == napi_undefined;
}

inline bool is_null(napi_env env, napi_value value) {
  napi_valuetype type;
  napi_typeof(env, value, &type);
  return type == napi_null;
}

inline napi_value get_true(napi_env env) {
  napi_value trueValue;
  napi_get_boolean(env, true, &trueValue);
  return trueValue;
}

inline napi_value get_false(napi_env env) {
  napi_value falseValue;
  napi_get_boolean(env, false, &falseValue);
  return falseValue;
}

inline bool get_bool(napi_env env, napi_value value) {
  bool result;
  napi_get_value_bool(env, value, &result);
  return result;
}

inline bool is_float(napi_env env, napi_value value) {
  napi_value global, number, is_int, result;
  napi_get_global(env, &global);
  napi_get_named_property(env, global, "Number", &number);
  napi_get_named_property(env, number, "isInteger", &is_int);
  napi_call_function(env, number, is_int, 1, &value, &result);

  return !napi_util::get_bool(env, result);
}

// Same as Object.create()`
inline napi_value object_create_from(napi_env env, napi_value object) {
  napi_value new_object;
  napi_create_object(env, &new_object);
  napi_set_named_property(env, new_object, "prototype", object);
  return new_object;
}

inline bool strict_equal(napi_env env, napi_value v1, napi_value v2) {
  bool equal;
  napi_strict_equals(env, v1, v2, &equal);
  return equal;
}

inline double get_number(napi_env env, napi_value value) {
  double result;
  napi_get_value_double(env, value, &result);
  return result;
}

inline int32_t get_int32(napi_env env, napi_value value) {
  int32_t result;
  napi_get_value_int32(env, value, &result);
  return result;
}

template <typename Func, typename... Args>
inline void run_in_handle_scope(napi_env env, Func func, Args&&... args) {
  napi_handle_scope scope;
  napi_open_handle_scope(env, &scope);

  // Call the provided function
  func(std::forward<Args>(args)...);

  napi_close_handle_scope(env, scope);
}

template <typename Func, typename... Args>
inline napi_value run_in_escapable_handle_scope(napi_env env, Func func,
                                                Args&&... args) {
  napi_escapable_handle_scope scope;
  napi_value result, escaped = nullptr;

  napi_open_escapable_handle_scope(env, &scope);

  // Call the provided function with forwarded arguments and get the result
  result = func(std::forward<Args>(args)...);

  if (result != nullptr) {
    // Escape the result
    napi_escape_handle(env, scope, result, &escaped);
  }

  napi_close_escapable_handle_scope(env, scope);

  return escaped;
}

inline napi_value napi_set_function(napi_env env, napi_value object,
                                    const char* name, napi_callback callback,
                                    void* data = nullptr) {
  napi_value fn;
  napi_create_function(env, name, strlen(name), callback, data, &fn);
  napi_set_named_property(env, object, name, fn);
  return fn;
}

//    inline napi_value symbolFor(napi_env env, const char *string) {
//        napi_value symbol;
//        node_api_symbol_for(env, string, strlen(string), &symbol);
//        return symbol;
//    }

inline bool is_null_or_undefined(napi_env env, napi_value value) {
  return value == nullptr || is_undefined(env, value) || is_null(env, value);
}

inline napi_value global(napi_env env) {
  napi_value global;
  napi_get_global(env, &global);
  return global;
}

inline void log_value(napi_env env, napi_value value) {
  napi_value global;
  napi_value console;
  napi_value log;
  napi_get_global(env, &global);
  napi_get_named_property(env, global, "console", &console);
  napi_get_named_property(env, console, "log", &log);
  napi_value argv[] = {value};

  napi_call_function(env, console, log, 1, argv, nullptr);
}

inline void napi_inherits(napi_env env, napi_value ctor,
                          napi_value super_ctor) {
  napi_value global, global_object, set_proto, ctor_proto_prop,
      super_ctor_proto_prop;
  napi_value argv[2];

  napi_get_global(env, &global);
  napi_get_named_property(env, global, OBJECT, &global_object);
  napi_get_named_property(env, global_object, SET_PROTOTYPE_OF, &set_proto);
  napi_get_named_property(env, ctor, PROTOTYPE, &ctor_proto_prop);
  napi_get_named_property(env, super_ctor, PROTOTYPE, &super_ctor_proto_prop);

  bool exception;

  napi_is_exception_pending(env, &exception);

  argv[0] = ctor_proto_prop;
  argv[1] = super_ctor_proto_prop;
  napi_call_function(env, global, set_proto, 2, argv, nullptr);

  argv[0] = ctor;
  argv[1] = super_ctor;
  napi_call_function(env, global, set_proto, 2, argv, nullptr);
}

}  // namespace napi_util

#endif /* NATIVE_API_UTIL_H_ */
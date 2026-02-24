#include "ObjCBridge.h"
#include "AutoreleasePool.h"
#include "Block.h"
#include "Class.h"
#include "ClassMember.h"
#include "Enum.h"
#include "InlineFunctions.h"
#include "Interop.h"
#include "Metadata.h"
#include "MetadataReader.h"
#include "NativeScript.h"
#include "Object.h"
#include "ObjectRef.h"
#include "Struct.h"
#include "TypeConv.h"
#include "Util.h"
#include "Variable.h"
#include "js_native_api.h"
#include "js_native_api_types.h"
#include "node_api_util.h"

#import <Foundation/Foundation.h>
#include <TargetConditionals.h>
#include <mach-o/dyld.h>
#include <mach-o/getsect.h>
#include <objc/runtime.h>
#include <cstring>
#include <initializer_list>

#ifdef EMBED_METADATA_SIZE
const unsigned char __attribute__((section("__objc_metadata,__objc_metadata")))
#if defined(__aarch64__)
embedded_metadata[EMBED_METADATA_SIZE] = "NSMDSectionHeaderARM";
#else
embedded_metadata[EMBED_METADATA_SIZE] = "NSMDSectionHeaderX86";
#endif
#endif

namespace nativescript {

void finalize_bridge_data(napi_env env, void* data, void* hint) {
  auto bridgeState = (ObjCBridgeState*)data;
  delete bridgeState;
}

MDMetadataReader* loadMetadataFromFile(const char* metadata_path) {
  if (metadata_path == nullptr) {
    metadata_path = "metadata.nsmd";
  }

  auto f = fopen(metadata_path == nullptr ? "metadata.nsmd" : metadata_path, "r");
  if (f == nullptr) {
    fprintf(stderr, "metadata.nsmd not found\n");
    exit(1);
  }
  fseek(f, 0, SEEK_END);
  auto size = ftell(f);
  fseek(f, 0, SEEK_SET);
  auto buffer = (uint8_t*)malloc(size);
  fread(buffer, 1, size, f);
  fclose(f);
  return new MDMetadataReader(buffer);
}

inline bool hasNamedProperty(napi_env env, napi_value object, const char* name) {
  bool hasProperty = false;
  napi_has_named_property(env, object, name, &hasProperty);
  return hasProperty;
}

inline bool isFunctionValue(napi_env env, napi_value value) {
  if (value == nullptr) {
    return false;
  }
  napi_valuetype valueType = napi_undefined;
  if (napi_typeof(env, value, &valueType) != napi_ok) {
    return false;
  }
  return valueType == napi_function;
}

inline void clearPendingException(napi_env env) {
  bool hasPendingException = false;
  if (napi_is_exception_pending(env, &hasPendingException) == napi_ok && hasPendingException) {
    napi_value exception = nullptr;
    napi_get_and_clear_last_exception(env, &exception);
  }
}

inline bool isConstructableValue(napi_env env, napi_value value) {
  if (!isFunctionValue(env, value)) {
    return false;
  }

  napi_value instance = nullptr;
  napi_status status = napi_new_instance(env, value, 0, nullptr, &instance);
  if (status == napi_ok) {
    return true;
  }

  clearPendingException(env);
  return false;
}

inline bool hasConstructableNamedProperty(napi_env env, napi_value global, const char* name) {
  if (!hasNamedProperty(env, global, name)) {
    return false;
  }

  napi_value value = nullptr;
  if (napi_get_named_property(env, global, name, &value) != napi_ok || value == nullptr) {
    clearPendingException(env);
    return false;
  }

  return isConstructableValue(env, value);
}

inline void defineGlobalValue(napi_env env, napi_value global, const char* name, napi_value value) {
  if (name == nullptr || value == nullptr) {
    return;
  }

  if (napi_set_named_property(env, global, name, value) == napi_ok) {
    return;
  }
  clearPendingException(env);

  napi_property_descriptor prop = {
      .utf8name = name,
      .method = nullptr,
      .getter = nullptr,
      .setter = nullptr,
      .value = value,
      .attributes = (napi_property_attributes)(napi_enumerable | napi_configurable),
      .data = nullptr,
  };
  if (napi_define_properties(env, global, 1, &prop) != napi_ok) {
    clearPendingException(env);
  }
}

inline bool defineConstructableGlobalValue(napi_env env, napi_value global, const char* name,
                                           napi_value value) {
  if (!isConstructableValue(env, value)) {
    return false;
  }

  if (napi_set_named_property(env, global, name, value) == napi_ok &&
      hasConstructableNamedProperty(env, global, name)) {
    return true;
  }
  clearPendingException(env);

  napi_property_descriptor prop = {
      .utf8name = name,
      .method = nullptr,
      .getter = nullptr,
      .setter = nullptr,
      .value = value,
      .attributes = (napi_property_attributes)(napi_enumerable | napi_configurable),
      .data = nullptr,
  };
  if (napi_define_properties(env, global, 1, &prop) == napi_ok &&
      hasConstructableNamedProperty(env, global, name)) {
    return true;
  }
  clearPendingException(env);

  napi_value key = nullptr;
  napi_create_string_utf8(env, name, NAPI_AUTO_LENGTH, &key);
  if (key != nullptr) {
    bool deleted = false;
    if (napi_delete_property(env, global, key, &deleted) == napi_ok && deleted) {
      if (napi_define_properties(env, global, 1, &prop) == napi_ok &&
          hasConstructableNamedProperty(env, global, name)) {
        return true;
      }
      clearPendingException(env);
      if (napi_set_named_property(env, global, name, value) == napi_ok &&
          hasConstructableNamedProperty(env, global, name)) {
        return true;
      }
      clearPendingException(env);
    } else {
      clearPendingException(env);
    }
  }

  return hasConstructableNamedProperty(env, global, name);
}

inline std::string buildStructEncoding(StructInfo* info) {
  if (info == nullptr || info->name == nullptr) {
    return "";
  }

  std::string encoding = "{";
  encoding += info->name;
  encoding += "=";
  for (const auto& field : info->fields) {
    if (field.type == nullptr) {
      return "";
    }
    field.type->encode(&encoding);
  }
  encoding += "}";
  return encoding;
}

inline void setTypeEncodingSymbol(napi_env env, napi_value value, const std::string& encoding) {
  if (value == nullptr || encoding.empty()) {
    return;
  }

  napi_value typeSymbol = jsSymbolFor(env, "type");
  napi_value encodedValue = nullptr;
  napi_create_string_utf8(env, encoding.c_str(), NAPI_AUTO_LENGTH, &encodedValue);
  if (typeSymbol != nullptr && encodedValue != nullptr) {
    napi_set_property(env, value, typeSymbol, encodedValue);
  }
}

inline void registerStructAlias(napi_env env, napi_value global, ObjCBridgeState* bridgeState,
                                const char* aliasName,
                                std::initializer_list<const char*> candidates) {
  if (bridgeState == nullptr || aliasName == nullptr) {
    return;
  }

  if (hasNamedProperty(env, global, aliasName)) {
    napi_value existing = nullptr;
    if (napi_get_named_property(env, global, aliasName, &existing) == napi_ok &&
        isFunctionValue(env, existing)) {
      return;
    }
  }

  for (const char* candidate : candidates) {
    if (candidate == nullptr || candidate[0] == '\0') {
      continue;
    }

    auto structIt = bridgeState->structOffsets.find(candidate);
    if (structIt != bridgeState->structOffsets.end()) {
      StructInfo* info = bridgeState->getStructInfo(env, structIt->second);
      if (info != nullptr) {
        napi_value cls = StructObject::getJSClass(env, info);
        if (isFunctionValue(env, cls)) {
          setTypeEncodingSymbol(env, cls, buildStructEncoding(info));
          defineGlobalValue(env, global, aliasName, cls);
          return;
        }
      }
    }

    if (hasNamedProperty(env, global, candidate)) {
      napi_value source = nullptr;
      if (napi_get_named_property(env, global, candidate, &source) == napi_ok &&
          isFunctionValue(env, source)) {
        defineGlobalValue(env, global, aliasName, source);
        return;
      }
    }
  }
}

inline void ensureSyntheticCGPoint(napi_env env, napi_value global) {
  if (hasConstructableNamedProperty(env, global, "CGPoint")) {
    return;
  }

  static StructInfo* syntheticInfo = nullptr;
  if (syntheticInfo == nullptr) {
    syntheticInfo = new StructInfo();
    syntheticInfo->name = strdup("CGPoint");
    syntheticInfo->size = sizeof(double) * 2;
    syntheticInfo->jsClass = nullptr;

    const char* doubleEncodingX = "d";
    const char* doubleEncodingY = "d";

    StructFieldInfo fieldX;
    fieldX.name = strdup("x");
    fieldX.offset = 0;
    fieldX.type = TypeConv::Make(env, &doubleEncodingX);
    syntheticInfo->fields.push_back(fieldX);

    StructFieldInfo fieldY;
    fieldY.name = strdup("y");
    fieldY.offset = sizeof(double);
    fieldY.type = TypeConv::Make(env, &doubleEncodingY);
    syntheticInfo->fields.push_back(fieldY);
  }

  napi_value cls = StructObject::getJSClass(env, syntheticInfo);
  if (!isFunctionValue(env, cls)) {
    return;
  }

  setTypeEncodingSymbol(env, cls, "{CGPoint=dd}");
  defineConstructableGlobalValue(env, global, "CGPoint", cls);
}

inline void ensureConstructableStructAlias(napi_env env, napi_value global,
                                           ObjCBridgeState* bridgeState, const char* aliasName,
                                           std::initializer_list<const char*> candidates) {
  if (bridgeState == nullptr || aliasName == nullptr) {
    return;
  }

  if (hasConstructableNamedProperty(env, global, aliasName)) {
    return;
  }

  for (const char* candidate : candidates) {
    if (candidate == nullptr || candidate[0] == '\0') {
      continue;
    }

    if (hasNamedProperty(env, global, candidate)) {
      napi_value value = nullptr;
      if (napi_get_named_property(env, global, candidate, &value) == napi_ok &&
          defineConstructableGlobalValue(env, global, aliasName, value)) {
        return;
      }
      clearPendingException(env);
    }

    auto structIt = bridgeState->structOffsets.find(candidate);
    if (structIt != bridgeState->structOffsets.end()) {
      StructInfo* info = bridgeState->getStructInfo(env, structIt->second);
      if (info != nullptr) {
        napi_value cls = StructObject::getJSClass(env, info);
        if (defineConstructableGlobalValue(env, global, aliasName, cls)) {
          setTypeEncodingSymbol(env, cls, buildStructEncoding(info));
          return;
        }
      }
    }
  }
}

inline void installMacUIColorCompatShim(napi_env env) {
  const char* script = R"(
    (function (globalObject) {
      if (typeof globalObject.UIColor === "undefined" &&
          typeof globalObject.NSColor === "function") {
        globalObject.UIColor = globalObject.NSColor;
      }

      const colorCtor = globalObject.UIColor || globalObject.NSColor;
      if (typeof colorCtor !== "function" || !colorCtor.prototype) {
        return;
      }

      if (typeof colorCtor.prototype.initWithRedGreenBlueAlpha === "function") {
        return;
      }

      colorCtor.prototype.initWithRedGreenBlueAlpha = function (red, green, blue, alpha) {
        if (typeof this.initWithSRGBRedGreenBlueAlpha === "function") {
          return this.initWithSRGBRedGreenBlueAlpha(red, green, blue, alpha);
        }
        if (typeof this.initWithCalibratedRedGreenBlueAlpha === "function") {
          return this.initWithCalibratedRedGreenBlueAlpha(red, green, blue, alpha);
        }
        if (typeof colorCtor.colorWithSRGBRedGreenBlueAlpha === "function") {
          return colorCtor.colorWithSRGBRedGreenBlueAlpha(red, green, blue, alpha);
        }
        if (typeof colorCtor.colorWithCalibratedRedGreenBlueAlpha === "function") {
          return colorCtor.colorWithCalibratedRedGreenBlueAlpha(red, green, blue, alpha);
        }
        return this;
      };
    })(globalThis);
  )";

  napi_value shim = nullptr;
  napi_create_string_utf8(env, script, NAPI_AUTO_LENGTH, &shim);
  if (shim != nullptr) {
    napi_value result = nullptr;
    napi_run_script(env, shim, &result);
  }
}

inline void* resolveSymbolPointer(ObjCBridgeState* bridgeState, const char* symbolName) {
  if (bridgeState == nullptr || symbolName == nullptr || symbolName[0] == '\0') {
    return nullptr;
  }

  void* symbol = dlsym(bridgeState->self_dl, symbolName);
  if (symbol == nullptr) {
    symbol = dlsym(RTLD_DEFAULT, symbolName);
  }
  if (symbol == nullptr) {
    std::string underscored = "_";
    underscored += symbolName;
    symbol = dlsym(bridgeState->self_dl, underscored.c_str());
    if (symbol == nullptr) {
      symbol = dlsym(RTLD_DEFAULT, underscored.c_str());
    }
  }

  return symbol;
}

inline void registerCompatFunctionIfMissing(napi_env env, napi_value global,
                                            ObjCBridgeState* bridgeState, const char* functionName,
                                            const char* encoding) {
  if (hasNamedProperty(env, global, functionName)) {
    return;
  }

  void* fn = resolveSymbolPointer(bridgeState, functionName);
  if (fn == nullptr && strcmp(functionName, "CC_SHA256") == 0) {
    void* commonCrypto = dlopen("/usr/lib/system/libcommonCrypto.dylib", RTLD_NOW | RTLD_LOCAL);
    if (commonCrypto != nullptr) {
      fn = dlsym(commonCrypto, functionName);
      if (fn == nullptr) {
        fn = dlsym(commonCrypto, "_CC_SHA256");
      }
    }
  }

  if (fn == nullptr) {
    return;
  }

  napi_value wrapper = FunctionPointer::wrapWithEncoding(env, fn, encoding, false);
  if (wrapper != nullptr) {
    napi_set_named_property(env, global, functionName, wrapper);
  }
}

void registerLegacyCompatGlobals(napi_env env, napi_value global, ObjCBridgeState* bridgeState) {
#if TARGET_OS_OSX
  registerStructAlias(env, global, bridgeState, "CGPoint",
                      {"CGPoint", "_CGPoint", "NSPoint", "_NSPoint"});
  registerStructAlias(env, global, bridgeState, "CGSize",
                      {"CGSize", "_CGSize", "NSSize", "_NSSize"});
  registerStructAlias(env, global, bridgeState, "CGRect",
                      {"CGRect", "_CGRect", "NSRect", "_NSRect"});
  ensureSyntheticCGPoint(env, global);
  ensureConstructableStructAlias(
      env, global, bridgeState, "CGPoint",
      {"CGPointStruct", "NSPoint", "NSPointStruct", "_CGPoint", "_NSPoint", "CGPoint"});
  installMacUIColorCompatShim(env);
#endif

  // CommonCrypto compatibility used by historical runtime tests and apps.
  registerCompatFunctionIfMissing(env, global, bridgeState, "CC_SHA256", "^C^vQ^C");
  registerCompatFunctionIfMissing(env, global, bridgeState, "CGColorGetComponents", "^d^v");

  // Backward compatibility for legacy metadata sets missing libdispatch entries.
  registerCompatFunctionIfMissing(env, global, bridgeState, "dispatch_get_global_queue", "^vqQ");
}

ObjCBridgeState::ObjCBridgeState(napi_env env, const char* metadata_path,
                                 const void* metadata_ptr) {
  napi_set_instance_data(env, this, finalize_bridge_data, nil);

  self_dl = dlopen(nullptr, RTLD_NOW);

  if (metadata_ptr && *((const char*)metadata_ptr) != '\0') {
#ifdef EMBED_METADATA_SIZE
    NSLog(@"Ignoring metadata pointer due to embedded metadata");
    metadata = new MDMetadataReader((void*)embedded_metadata);
#else
    NSLog(@"Using metadata from pointer: %p", metadata_ptr);
    metadata = new MDMetadataReader((void*)metadata_ptr);
#endif
  } else {
#ifdef EMBED_METADATA_SIZE
    if (metadata_path != nullptr) {
      NSLog(@"Loading metadata from file: %s", metadata_path);
      metadata = loadMetadataFromFile(metadata_path);
    } else {
      NSLog(@"Using embedded metadata");
      metadata = new MDMetadataReader((void*)embedded_metadata);
    }
#else
    unsigned long segmentSize = 0;
    auto segmentData = getsegmentdata((const mach_header_64*)_dyld_get_image_header(0),
                                      "__objc_metadata", &segmentSize);
    if (segmentData != nullptr) {
      metadata = new MDMetadataReader(segmentData);
    } else {
      metadata = loadMetadataFromFile(metadata_path);
    }
#endif
  }

  // objc_autoreleasePool = objc_autoreleasePoolPush();
}

ObjCBridgeState::~ObjCBridgeState() {
  // Clean up cached Cif objects
  for (auto& pair : cifs) {
    delete pair.second;
  }
  cifs.clear();

  for (auto& pair : mdMethodSignatureCache) {
    delete pair.second;
  }
  mdMethodSignatureCache.clear();

  for (auto& pair : mdBlockSignatureCache) {
    delete pair.second;
  }
  mdBlockSignatureCache.clear();

  // Clean up ObjCClass objects
  for (auto& pair : classes) {
    delete pair.second;
  }
  classes.clear();

  // Clean up ObjCProtocol objects
  for (auto& pair : protocols) {
    delete pair.second;
  }
  protocols.clear();

  // Clean up StructInfo objects
  for (auto& pair : structInfoCache) {
    delete pair.second;
  }
  structInfoCache.clear();

  // Clean up CFunction objects
  for (auto& pair : cFunctionCache) {
    delete pair.second;
  }
  cFunctionCache.clear();

  for (auto& pair : mdFunctionSignatureCache) {
    delete pair.second;
  }
  mdFunctionSignatureCache.clear();

  // if (objc_autoreleasePool != nullptr)
  //   objc_autoreleasePoolPop(objc_autoreleasePool);

  delete metadata;
  dlclose(self_dl);
}

napi_value ObjCBridgeState::proxyNativeObject(napi_env env, napi_value object, id nativeObject) {
  NAPI_PREAMBLE

  napi_value factory = get_ref_value(env, createNativeProxy);
  napi_value transferOwnershipFunc = get_ref_value(env, this->transferOwnershipToNative);
  napi_value result, global;
  napi_value args[3] = {object, nullptr, transferOwnershipFunc};
  napi_get_boolean(env, [nativeObject isKindOfClass:NSArray.class], &args[1]);
  napi_get_global(env, &global);
  napi_call_function(env, global, factory, 3, args, &result);

  // We need to wrap the proxied object separately except for Hermes,
  // We'll just ignore the error there.
  napi_wrap(env, result, nativeObject, nullptr, nullptr, nullptr);

  napi_ref ref = nullptr;
  NAPI_GUARD(napi_add_finalizer(env, result, nativeObject, finalize_objc_object, this, &ref)) {
    NAPI_THROW_LAST_ERROR
    return nullptr;
  }

  objectRefs[nativeObject] = ref;
  attachObjectLifecycleAssociation(env, nativeObject);

  return result;
}

}  // namespace nativescript

using namespace nativescript;

NAPI_FUNCTION(getArrayBuffer) {
  NAPI_CALLBACK_BEGIN(2)

  void* ptr = Pointer::unwrap(env, argv[0])->data;
  int64_t length;
  napi_get_value_int64(env, argv[1], &length);

  napi_value arrayBuffer;
  napi_create_external_arraybuffer(env, ptr, length, nullptr, nullptr, &arrayBuffer);

  return arrayBuffer;
}

NAPI_FUNCTION(init) {
  NAPI_CALLBACK_BEGIN(1)
  napi_valuetype type;
  napi_typeof(env, argv[0], &type);
  const char* metadata_path = nullptr;
  if (type == napi_string) {
    size_t len;
    napi_get_value_string_utf8(env, argv[0], nullptr, 0, &len);
    metadata_path = (char*)malloc(len + 1);
    napi_get_value_string_utf8(env, argv[0], (char*)metadata_path, len + 1, &len);
  }
  nativescript_init(env, metadata_path, nullptr);
  return nullptr;
}

NAPI_EXPORT NAPI_MODULE_REGISTER {
  const napi_property_descriptor property = NAPI_FUNCTION_DESC(init);
  napi_define_properties(env, exports, 1, &property);
  return exports;
}

NAPI_EXPORT void nativescript_init(void* _env, const char* metadata_path,
                                   const void* metadata_ptr) {
  napi_env env = (napi_env)_env;

  ObjCBridgeState* bridgeState = new ObjCBridgeState(env, metadata_path, metadata_ptr);

  napi_value objc;
  napi_create_object(env, &objc);

  const napi_property_descriptor objcProperties[] = {
      NAPI_FUNCTION_DESC(registerClass),  NAPI_FUNCTION_DESC(registerBlock),
      NAPI_FUNCTION_DESC(import),         NAPI_FUNCTION_DESC(autoreleasepool),
      NAPI_FUNCTION_DESC(getArrayBuffer),
  };

  napi_define_properties(env, objc, 5, objcProperties);

  napi_value global;
  napi_get_global(env, &global);

  const napi_property_descriptor globalProperties[] = {{
                                                           .utf8name = "objc",
                                                           .method = nullptr,
                                                           .getter = nullptr,
                                                           .setter = nullptr,
                                                           .value = objc,
                                                           .attributes = napi_enumerable,
                                                           .data = nullptr,
                                                       },
                                                       {
                                                           .utf8name = "ObjectRef",
                                                           .method = nullptr,
                                                           .getter = nullptr,
                                                           .setter = nullptr,
                                                           .value = defineObjectRefClass(env),
                                                           .attributes = napi_enumerable,
                                                           .data = nullptr,
                                                       },
                                                       {
                                                           .utf8name = "NativeClass",
                                                           .method = JS_registerClass,
                                                           .getter = nullptr,
                                                           .setter = nullptr,
                                                           .value = nullptr,
                                                           .attributes = napi_enumerable,
                                                           .data = nullptr,
                                                       }};

  napi_define_properties(env, global, 3, globalProperties);

  setupObjCClassDecorator(env);

  initProxyFactory(env, bridgeState);
  initFastEnumeratorIteratorFactory(env, bridgeState);

  registerInterop(env, global);
  registerInlineFunctions(env);

  bridgeState->registerVarGlobals(env, global);
  bridgeState->registerEnumGlobals(env, global);
  bridgeState->registerStructGlobals(env, global);
  bridgeState->registerUnionGlobals(env, global);
  bridgeState->registerFunctionGlobals(env, global);
  bridgeState->registerClassGlobals(env, global);
  bridgeState->registerProtocolGlobals(env, global);
  registerLegacyCompatGlobals(env, global, bridgeState);
}

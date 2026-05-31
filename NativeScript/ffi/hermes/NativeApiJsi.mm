#include "NativeApiJsi.h"

#ifdef TARGET_ENGINE_HERMES

#import <Foundation/Foundation.h>
#include <dispatch/dispatch.h>
#include <dlfcn.h>
#include <mach-o/dyld.h>
#include <mach-o/getsect.h>
#include <objc/message.h>
#include <objc/runtime.h>

#include <algorithm>
#include <atomic>
#include <cctype>
#include <cmath>
#include <cstdint>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <limits>
#include <memory>
#include <mutex>
#include <optional>
#include <stdexcept>
#include <string>
#include <thread>
#include <unordered_map>
#include <unordered_set>
#include <vector>

#include "Metadata.h"
#include "MetadataReader.h"
#include "ffi.h"
#include "NativeApiJsiSignatureDispatch.h"

@protocol NativeApiClassBuilderProtocol
@end

#ifdef EMBED_METADATA_SIZE
extern const unsigned char embedded_metadata[EMBED_METADATA_SIZE];
#endif

namespace nativescript {
namespace {

using facebook::jsi::Array;
using facebook::jsi::ArrayBuffer;
using facebook::jsi::BigInt;
using facebook::jsi::Function;
using facebook::jsi::HostObject;
using facebook::jsi::MutableBuffer;
using facebook::jsi::Object;
using facebook::jsi::PropNameID;
using facebook::jsi::Runtime;
using facebook::jsi::String;
using facebook::jsi::StringBuffer;
using facebook::jsi::Value;
using facebook::jsi::JSError;

using NativeApiConfig = NativeApiJsiConfig;
using NativeApiScheduler = NativeApiJsiScheduler;
using metagen::MDMemberFlag;
using metagen::MDMetadataReader;
using metagen::MDSectionOffset;
using metagen::MDTypeKind;

void SetNativeApiObjectPrototype(Runtime& runtime, Object& object,
                                       const Object& prototype) {
  Object objectConstructor =
      runtime.global().getPropertyAsObject(runtime, "Object");
  Function setPrototypeOf =
      objectConstructor.getPropertyAsFunction(runtime, "setPrototypeOf");
  setPrototypeOf.call(runtime, Value(runtime, object), Value(runtime, prototype));
}

// clang-format off
#define NATIVESCRIPT_NATIVE_API_RUNTIME_NAME "jsi"
#define NATIVESCRIPT_NATIVE_API_BACKEND_NAME "hermes"
#define NATIVESCRIPT_NATIVE_API_HOST_SET_VOID 1
#define NATIVESCRIPT_NATIVE_API_HOST_EXPLICIT_OVERRIDE 1
#define NATIVESCRIPT_NATIVE_API_HAS_ENGINE_SELECTOR_GROUP_FUNCTION 1
#include "../shared/bridge/ObjCBridge.mm"
#include "../shared/bridge/HostObjects.mm"
#include "../shared/bridge/Callbacks.mm"
#include "../shared/bridge/TypeConv.mm"
#include "../shared/bridge/Invocation.mm"
#include "../shared/bridge/ClassBuilder.mm"
#include "../shared/bridge/HostObject.mm"
// clang-format on

// --- GSD (Generated Signature Dispatch) for Hermes/JSI ---
// GsdObjCContext is the engine-neutral interface the generated invokers use:
// it reads jsi::Value arguments and writes the jsi::Value return value using
// the shared engine-neutral conversion helpers (which already operate on the
// jsi value type). Readers require the fast representation; anything else
// makes a reader return false so the invoker falls back to the generic path.
struct GsdObjCContext;
using ObjCGsdInvoker = bool (*)(GsdObjCContext&);
struct ObjCGsdDispatchEntry {
  uint64_t dispatchId;
  ObjCGsdInvoker invoker;
};

struct GsdObjCContext {
  Runtime& runtime;
  const std::shared_ptr<NativeApiBridge>& bridge;
  id self;
  SEL selector;
  const Value* arguments;
  Value result = Value::undefined();

  bool readNumber(size_t i, double* out) {
    const Value& v = arguments[i];
    if (!v.isNumber()) return false;
    *out = v.asNumber();
    return true;
  }
  bool readBool(size_t i, uint8_t* out) {
    const Value& v = arguments[i];
    if (!v.isBool()) return false;
    *out = v.getBool() ? 1 : 0;
    return true;
  }
  template <class T>
  bool readSigned(size_t i, T* out) {
    double tmp = 0;
    if (!readNumber(i, &tmp)) return false;
    *out = static_cast<T>(tmp);
    return true;
  }
  template <class T>
  bool readUnsigned(size_t i, T* out) {
    double tmp = 0;
    if (!readNumber(i, &tmp)) return false;
    *out = static_cast<T>(tmp);
    return true;
  }
  bool readFloat(size_t i, float* out) {
    double tmp = 0;
    if (!readNumber(i, &tmp)) return false;
    *out = static_cast<float>(tmp);
    return true;
  }
  bool readDouble(size_t i, double* out) { return readNumber(i, out); }
  bool readSelector(size_t i, SEL* out) {
    return readFastEngineSelectorArgument(runtime, arguments[i], out);
  }
  bool readClass(size_t i, Class* out) {
    Class cls = classFromEngineValue(runtime, arguments[i]);
    if (cls == Nil) return false;
    *out = cls;
    return true;
  }
  bool readObject(size_t i, id* out) {
    const Value& v = arguments[i];
    if (v.isNull() || v.isUndefined()) {
      *out = nil;
      return true;
    }
    if (!v.isObject()) return false;
    Object o = v.getObject(runtime);
    if (o.isHostObject<NativeApiObjectHostObject>(runtime)) {
      *out = o.getHostObject<NativeApiObjectHostObject>(runtime)->object();
      return true;
    }
    if (o.isHostObject<NativeApiClassHostObject>(runtime)) {
      *out = static_cast<id>(
          o.getHostObject<NativeApiClassHostObject>(runtime)->nativeClass());
      return true;
    }
    if (o.isHostObject<NativeApiProtocolHostObject>(runtime)) {
      *out = static_cast<id>(
          o.getHostObject<NativeApiProtocolHostObject>(runtime)
              ->nativeProtocol());
      return true;
    }
    return false;
  }

  void setVoid() { result = Value::undefined(); }
  void setBool(bool v) { result = Value(v); }
  void setInt32(int32_t v) { result = Value(static_cast<double>(v)); }
  void setUInt32(uint32_t v) { result = Value(static_cast<double>(v)); }
  void setUInt16(uint16_t v) {
    if (v >= 32 && v <= 126) {
      result = makeString(runtime, std::string(1, static_cast<char>(v)));
    } else {
      result = Value(static_cast<double>(v));
    }
  }
  void setInt64(int64_t v) { result = signedInteger64ToEngineValue(runtime, v); }
  void setUInt64(uint64_t v) {
    result = unsignedInteger64ToEngineValue(runtime, v);
  }
  void setDouble(double v) { result = Value(v); }
  void setSelector(SEL v) {
    const char* name = v != nullptr ? sel_getName(v) : nullptr;
    result = name != nullptr ? makeString(runtime, name) : Value::null();
  }
  void setClass(Class v) {
    if (v == nil) {
      result = Value::null();
      return;
    }
    const char* name = class_getName(v);
    NativeApiSymbol symbol{
        .kind = NativeApiSymbolKind::Class,
        .offset = MD_SECTION_OFFSET_NULL,
        .name = name != nullptr ? name : "",
        .runtimeName = name != nullptr ? name : "",
    };
    if (const NativeApiSymbol* found = bridge->findClass(symbol.name)) {
      symbol = *found;
    }
    result = makeNativeClassValue(runtime, bridge, std::move(symbol));
  }
};

// Close the anonymous namespace so the generated dispatch table lives in
// namespace nativescript; GsdObjCContext/ObjCGsdDispatchEntry stay reachable
// via the unnamed namespace's implicit using-directive.
}  // namespace (temporary close for GSD .inc)

#if defined(__has_include)
#if __has_include("GeneratedGsdSignatureDispatch.inc")
#include "GeneratedGsdSignatureDispatch.inc"
#endif
#endif

#ifndef NS_HAS_GENERATED_SIGNATURE_GSD_DISPATCH
inline constexpr ObjCGsdDispatchEntry kGeneratedObjCGsdDispatchEntries[] = {
    {0, nullptr}};
#endif

ObjCGsdInvoker lookupObjCGsdInvoker(uint64_t dispatchId) {
  if (!isGeneratedDispatchEnabled()) {
    return nullptr;
  }
  return lookupDispatchInvoker<ObjCGsdDispatchEntry, ObjCGsdInvoker>(
      kGeneratedObjCGsdDispatchEntries, dispatchId);
}

namespace {  // reopen anonymous namespace

// --- End GSD ---

Function CreateNativeApiSelectorGroupFunction(
    Runtime& runtime, std::shared_ptr<NativeApiBridge> bridge,
    Class lookupClass, bool receiverIsClass,
    std::shared_ptr<std::vector<NativeApiSelectorGroupEntry>> selectors,
    std::shared_ptr<
        std::vector<std::shared_ptr<NativeApiPreparedObjCInvocation>>>
        preparedInvocations) {
  return Function::createFromHostFunction(
      runtime, PropNameID::forAscii(runtime, "__nativeSelectorGroup"), 0,
      [bridge = std::move(bridge), lookupClass, receiverIsClass,
       selectors = std::move(selectors),
       preparedInvocations = std::move(preparedInvocations)](
          Runtime& runtime, const Value& thisValue, const Value* args,
          size_t count) -> Value {
        if (count >= selectors->size() ||
            (*selectors)[count].selectorName.empty()) {
          throw JSError(runtime,
                        "Objective-C selector is not available for this "
                        "argument count.");
        }

        const NativeApiSelectorGroupEntry& entry = (*selectors)[count];
        auto& prepared = (*preparedInvocations)[count];
        Class selectorLookupClass = lookupClass;
        id receiver = nil;
        std::shared_ptr<NativeApiObjectHostObject> receiverHostObject;
        if (receiverIsClass) {
          Class methodClass = prepared != nullptr ? prepared->receiverClass : Nil;
          if (methodClass == Nil) {
            SEL selector = sel_registerName(entry.selectorName.c_str());
            methodClass =
                NativeApiClassHostObject::classRespondingToClassSelector(
                    lookupClass, selector);
          }
          if (methodClass == Nil) {
            throw JSError(runtime,
                          "Objective-C selector is not available: " +
                              entry.selectorName);
          }
          selectorLookupClass = methodClass;
          receiver = static_cast<id>(methodClass);
        } else if (thisValue.isObject()) {
          Object receiverObject = thisValue.asObject(runtime);
          if (receiverObject.isHostObject<NativeApiObjectHostObject>(
                  runtime)) {
            receiverHostObject =
                receiverObject.getHostObject<NativeApiObjectHostObject>(
                    runtime);
            receiver = receiverHostObject->object();
          }
        }
        if (receiver == nil) {
          throw JSError(runtime,
                        "Objective-C selector requires a native receiver.");
        }

        if (!receiverIsClass) {
          SEL selector = sel_registerName(entry.selectorName.c_str());
          if (class_getInstanceMethod(selectorLookupClass, selector) == nullptr) {
            Class receiverClass = object_getClass(receiver);
            if (class_getInstanceMethod(receiverClass, selector) != nullptr) {
              selectorLookupClass = receiverClass;
            }
          }
        }

        if (prepared == nullptr) {
          prepared = prepareNativeApiObjCInvocation(
              runtime, bridge, selectorLookupClass, receiverIsClass, entry.selectorName,
              entry.hasMember ? &entry.member : nullptr);
          // Look up the engine-neutral GSD invoker for this signature.
          if (prepared->engineInvoker == nullptr) {
            uint64_t dispatchId = dispatchIdForEngineSignature(
                prepared->signature, SignatureCallKind::ObjCMethod);
            if (auto gsdInvoker = lookupObjCGsdInvoker(dispatchId)) {
              prepared->engineInvoker = reinterpret_cast<void*>(gsdInvoker);
            }
          }
        }

        Class gsdDispatchClass =
            receiverIsClass
                ? Nil
                : dispatchSuperclassForEngineDerivedReceiver(receiver,
                                                             lookupClass);
        // GSD fast path: read jsi args directly, call objc_msgSend with a
        // typed cast, produce the jsi return value — bypassing all generic
        // marshalling. Only engages for plain calls (no super dispatch, init
        // disown handling, or implicit NSError-out argument).
        if (prepared->engineInvoker != nullptr && gsdDispatchClass == Nil &&
            count == prepared->signature.argumentTypes.size() &&
            !(!receiverIsClass && prepared->isInitMethod) &&
            !prepared->isNSErrorOutMethod) {
          auto invoker =
              reinterpret_cast<ObjCGsdInvoker>(prepared->engineInvoker);
          GsdObjCContext ctx{runtime, bridge, receiver, prepared->selector,
                             args};
          if (invoker(ctx)) {
            return std::move(ctx.result);
          }
        }

        if (receiverIsClass) {
          return callPreparedObjCSelector(runtime, bridge, receiver, true,
                                          *prepared, args, count, Nil);
        }
        Class dispatchClass =
            dispatchSuperclassForEngineDerivedReceiver(receiver, lookupClass);
        return receiverHostObject->callPreparedObjectSelector(
            runtime, (*selectors)[count].selectorName, *prepared, args, count,
            dispatchClass);
      });
}

}  // namespace

#include "../shared/bridge/Install.mm"

Object CreateNativeApiJSI(Runtime& runtime, const NativeApiJsiConfig& config) {
  return CreateNativeApi(runtime, config);
}

void InstallNativeApiJSI(Runtime& runtime, const NativeApiJsiConfig& config) {
  InstallNativeApi(runtime, config);
}

}  // namespace nativescript

extern "C" void NativeScriptInstallNativeApiJSI(facebook::jsi::Runtime* runtime,
                                                const char* metadataPath) {
  if (runtime == nullptr) {
    return;
  }
  nativescript::NativeApiJsiConfig config;
  config.metadataPath = metadataPath;
  nativescript::InstallNativeApiJSI(*runtime, config);
}

#endif  // TARGET_ENGINE_HERMES

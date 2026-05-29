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
#define NATIVESCRIPT_NATIVE_API_HAS_ENGINE_SELECTOR_GROUP_FUNCTION 1
#include "../shared/bridge/ObjCBridge.mm"
#include "../shared/bridge/HostObjects.mm"
#include "../shared/bridge/Callbacks.mm"
#include "../shared/bridge/TypeConv.mm"
#include "../shared/bridge/Invocation.mm"
#include "../shared/bridge/ClassBuilder.mm"
#include "../shared/bridge/HostObject.mm"
// clang-format on

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

#ifndef nativescript_H
#define nativescript_H

#include <dlfcn.h>
#include <objc/runtime.h>
#include <stdint.h>

#include <map>
#include <mutex>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <vector>

#include "AutoreleasePool.h"
#include "CFunction.h"
#include "Cif.h"
#include "Class.h"
#include "MetadataReader.h"
#include "NativeScript.h"
#include "Protocol.h"
#include "Struct.h"
#include "TypeConv.h"
#include "js_native_api.h"
#include "objc/runtime.h"

extern "C" napi_value napi_register_module_v1(napi_env env, napi_value exports);

using namespace metagen;

namespace nativescript {

class ObjCBridgeState;

struct JSObjectFinalizerContext {
  ObjCBridgeState* bridgeState;
  uint64_t bridgeStateToken;
  id object;
  napi_ref ref;
};

void finalize_objc_object(napi_env /*env*/, void* data, void* hint);
bool IsBridgeStateLive(const ObjCBridgeState* bridgeState,
                       uint64_t token) noexcept;

// Determines how retain/release should be called when an Objective-C
// object is exposed to JavaScript land.
typedef enum ObjectOwnership {
  // The object is already owned by JS land, and will be released
  // when the JS object is garbage collected.
  kOwnedObject,
  // The object is not owned by JS land, so to "take ownership"
  // we will call retain and release when the JS object is
  // garbage collected.
  kUnownedObject,
} ObjectOwnership;

class ObjCBridgeState {
 public:
  ObjCBridgeState(napi_env env, const char* metadata_path = nullptr,
                  const void* metadata_ptr = nullptr);
  ~ObjCBridgeState();

  static inline ObjCBridgeState* InstanceData(napi_env env) {
    ObjCBridgeState* bridgeState;
    napi_status status = napi_get_instance_data(env, (void**)&bridgeState);
    if (status != napi_ok) {
      return nullptr;
    }
    return bridgeState;
  }

  static inline uintptr_t NormalizeHandleKey(void* handle) {
    if (handle == nullptr) {
      return 0;
    }
#if INTPTR_MAX == INT64_MAX
    return reinterpret_cast<uintptr_t>(handle) & 0x0000FFFFFFFFFFFFULL;
#else
    return reinterpret_cast<uintptr_t>(handle);
#endif
  }

  void registerVarGlobals(napi_env env, napi_value global);
  void registerEnumGlobals(napi_env env, napi_value global);
  void registerStructGlobals(napi_env env, napi_value global);
  void registerUnionGlobals(napi_env env, napi_value global);
  void registerFunctionGlobals(napi_env env, napi_value global);
  void registerClassGlobals(napi_env env, napi_value global);
  void registerProtocolGlobals(napi_env env, napi_value global);

  ObjCClass* getClass(napi_env env, MDSectionOffset offset);

  ObjCProtocol* getProtocol(napi_env env, MDSectionOffset offset);

  Cif* getMethodCif(napi_env env, Method method);
  Cif* getMethodCif(napi_env env, MDSectionOffset offset);
  Cif* getBlockCif(napi_env env, MDSectionOffset offset);
  Cif* getCFunctionCif(napi_env env, MDSectionOffset offset);

  napi_value proxyNativeObject(napi_env env, napi_value object,
                               id nativeObject);

  napi_value getObject(napi_env env, id object, napi_value constructor,
                       ObjectOwnership ownership = kUnownedObject);
  napi_value getObject(napi_env env, id object,
                       ObjectOwnership ownership = kUnownedObject,
                       MDSectionOffset classOffset = 0,
                       std::vector<MDSectionOffset>* protocolOffsets = nullptr);
  napi_value findCachedObjectWrapper(napi_env env, id object);
  inline void cacheHandleObject(napi_env env, void* handle, napi_value value) {
    if (handle == nullptr || value == nullptr) {
      return;
    }

    uintptr_t handleKey = NormalizeHandleKey(handle);
    auto it = handleObjectRefs.find(handleKey);
    if (it != handleObjectRefs.end()) {
      auto existing = get_ref_value(env, it->second);
      if (existing != nullptr) {
        bool isSameValue = false;
        if (napi_strict_equals(env, existing, value, &isSameValue) == napi_ok &&
            isSameValue) {
          return;
        }
      }

      napi_delete_reference(env, it->second);
      handleObjectRefs.erase(it);
    }

    napi_ref ref = nullptr;
    napi_create_reference(env, value, 0, &ref);
    handleObjectRefs[handleKey] = ref;
  }
  inline napi_value getCachedHandleObject(napi_env env, void* handle) {
    if (handle == nullptr) {
      return nullptr;
    }

    uintptr_t handleKey = NormalizeHandleKey(handle);
    auto it = handleObjectRefs.find(handleKey);
    if (it == handleObjectRefs.end()) {
      return nullptr;
    }

    auto value = get_ref_value(env, it->second);
    if (value == nullptr) {
      napi_delete_reference(env, it->second);
      handleObjectRefs.erase(it);
    }

    return value;
  }

  void unregisterObject(id object) noexcept;
  bool unregisterObjectIfRefMatches(id object, napi_ref ref) noexcept;
  void detachObject(id object) noexcept;
  void trackObject(id object) noexcept;
  bool isTrackedObjectAlive(id object) const noexcept;
  inline bool hasObjectRef(id object) const noexcept {
    std::lock_guard<std::mutex> lock(objectRefsMutex);

    if (objectRefs.find(object) != objectRefs.end()) {
      return true;
    }

    uintptr_t objectKey = NormalizeHandleKey((void*)object);
    for (const auto& entry : objectRefs) {
      if (NormalizeHandleKey((void*)entry.first) == objectKey) {
        return true;
      }
    }

    return false;
  }

  inline void beginRoundTripCacheFrame(napi_env /*env*/) {
    roundTripCacheFrames.emplace_back();
  }

  inline bool hasRoundTripCacheFrame() const {
    return !roundTripCacheFrames.empty();
  }

  inline void cacheRoundTripObject(napi_env env, id object, napi_value value) {
    if (object == nil || roundTripCacheFrames.empty()) {
      return;
    }

    auto& frame = roundTripCacheFrames.back();
    if (frame.find(object) != frame.end()) {
      return;
    }

    frame[object] = make_ref(env, value);
  }

  inline napi_value getRoundTripObject(napi_env env, id object) const {
    if (object == nil) {
      return nullptr;
    }

    if (roundTripCacheFrames.empty()) {
      auto recent = recentRoundTripCache.find(object);
      if (recent == recentRoundTripCache.end()) {
        uintptr_t objectKey = NormalizeHandleKey((void*)object);
        for (const auto& entry : recentRoundTripCache) {
          if (NormalizeHandleKey((void*)entry.first) == objectKey) {
            return get_ref_value(env, entry.second);
          }
        }

        return nullptr;
      }

      return get_ref_value(env, recent->second);
    }

    uintptr_t objectKey = NormalizeHandleKey((void*)object);
    for (auto frame = roundTripCacheFrames.rbegin();
         frame != roundTripCacheFrames.rend(); ++frame) {
      auto find = frame->find(object);
      if (find != frame->end()) {
        return get_ref_value(env, find->second);
      }

      for (const auto& entry : *frame) {
        if (NormalizeHandleKey((void*)entry.first) == objectKey) {
          return get_ref_value(env, entry.second);
        }
      }
    }

    auto recent = recentRoundTripCache.find(object);
    if (recent != recentRoundTripCache.end()) {
      return get_ref_value(env, recent->second);
    }

    return nullptr;
  }

  inline void endRoundTripCacheFrame(napi_env env) {
    if (roundTripCacheFrames.empty()) {
      return;
    }

    auto frame = std::move(roundTripCacheFrames.back());
    roundTripCacheFrames.pop_back();

    if (!roundTripCacheFrames.empty()) {
      auto& parent = roundTripCacheFrames.back();
      for (auto& entry : frame) {
        if (parent.find(entry.first) == parent.end()) {
          parent[entry.first] = entry.second;
        } else {
          napi_delete_reference(env, entry.second);
        }
      }
      return;
    }

    for (const auto& entry : recentRoundTripCache) {
      napi_delete_reference(env, entry.second);
    }
    recentRoundTripCache = std::move(frame);
  }

  inline bool tryResolveBridgedClassConstructor(napi_env env, napi_value value,
                                                Class* out) const {
    if (out == nullptr || value == nullptr) {
      return false;
    }

    auto readFunctionName = [&](napi_value candidate) -> std::string {
      napi_valuetype candidateType = napi_undefined;
      if (napi_typeof(env, candidate, &candidateType) != napi_ok ||
          candidateType != napi_function) {
        return "";
      }

      bool hasName = false;
      if (napi_has_named_property(env, candidate, "name", &hasName) !=
              napi_ok ||
          !hasName) {
        return "";
      }

      napi_value nameValue = nullptr;
      if (napi_get_named_property(env, candidate, "name", &nameValue) !=
              napi_ok ||
          nameValue == nullptr) {
        return "";
      }

      napi_valuetype nameType = napi_undefined;
      if (napi_typeof(env, nameValue, &nameType) != napi_ok ||
          nameType != napi_string) {
        return "";
      }

      size_t nameLength = 0;
      if (napi_get_value_string_utf8(env, nameValue, nullptr, 0, &nameLength) !=
              napi_ok ||
          nameLength == 0) {
        return "";
      }

      std::string name(nameLength, '\0');
      if (napi_get_value_string_utf8(env, nameValue, name.data(),
                                     name.size() + 1, &nameLength) != napi_ok) {
        return "";
      }

      name.resize(nameLength);
      return name;
    };

    auto matchesConstructor = [&](ObjCClass* bridgedClass) -> bool {
      if (bridgedClass == nullptr || bridgedClass->constructor == nullptr ||
          bridgedClass->nativeClass == nil) {
        return false;
      }

      napi_value constructor = get_ref_value(env, bridgedClass->constructor);
      if (constructor == nullptr) {
        return false;
      }

      bool isSameValue = false;
      if (napi_strict_equals(env, value, constructor, &isSameValue) ==
              napi_ok &&
          isSameValue) {
        *out = bridgedClass->nativeClass;
        return true;
      }

      return false;
    };

    for (const auto& entry : classesByPointer) {
      if (matchesConstructor(entry.second)) {
        return true;
      }
    }

    for (const auto& entry : classes) {
      if (matchesConstructor(entry.second)) {
        return true;
      }
    }

    std::string candidateName = readFunctionName(value);
    if (!candidateName.empty()) {
      for (const auto& entry : classesByPointer) {
        ObjCClass* bridgedClass = entry.second;
        if (bridgedClass == nullptr || bridgedClass->nativeClass == nil) {
          continue;
        }

        if (bridgedClass->name == candidateName) {
          *out = bridgedClass->nativeClass;
          return true;
        }
      }

      Class runtimeClass = objc_lookUpClass(candidateName.c_str());
      if (runtimeClass != nil) {
        *out = runtimeClass;
        return true;
      }
    }

    return false;
  }

  inline bool tryResolveBridgedProtocolConstructor(napi_env env,
                                                   napi_value value,
                                                   Protocol** out) const {
    if (out == nullptr || value == nullptr) {
      return false;
    }

    auto readFunctionName = [&](napi_value candidate) -> std::string {
      napi_valuetype candidateType = napi_undefined;
      if (napi_typeof(env, candidate, &candidateType) != napi_ok ||
          candidateType != napi_function) {
        return "";
      }

      bool hasName = false;
      if (napi_has_named_property(env, candidate, "name", &hasName) !=
              napi_ok ||
          !hasName) {
        return "";
      }

      napi_value nameValue = nullptr;
      if (napi_get_named_property(env, candidate, "name", &nameValue) !=
              napi_ok ||
          nameValue == nullptr) {
        return "";
      }

      napi_valuetype nameType = napi_undefined;
      if (napi_typeof(env, nameValue, &nameType) != napi_ok ||
          nameType != napi_string) {
        return "";
      }

      size_t nameLength = 0;
      if (napi_get_value_string_utf8(env, nameValue, nullptr, 0, &nameLength) !=
              napi_ok ||
          nameLength == 0) {
        return "";
      }

      std::string name(nameLength, '\0');
      if (napi_get_value_string_utf8(env, nameValue, name.data(),
                                     name.size() + 1, &nameLength) != napi_ok) {
        return "";
      }

      name.resize(nameLength);
      return name;
    };

    for (const auto& entry : protocols) {
      ObjCProtocol* bridgedProtocol = entry.second;
      if (bridgedProtocol == nullptr ||
          bridgedProtocol->constructor == nullptr) {
        continue;
      }

      napi_value constructor = get_ref_value(env, bridgedProtocol->constructor);
      if (constructor == nullptr) {
        continue;
      }

      bool isSameValue = false;
      if (napi_strict_equals(env, value, constructor, &isSameValue) !=
              napi_ok ||
          !isSameValue) {
        continue;
      }

      Protocol* runtimeProtocol =
          objc_getProtocol(bridgedProtocol->name.c_str());
      if (runtimeProtocol == nullptr) {
        static const std::string suffix = "Protocol";
        if (bridgedProtocol->name.size() > suffix.size() &&
            bridgedProtocol->name.compare(
                bridgedProtocol->name.size() - suffix.size(), suffix.size(),
                suffix) == 0) {
          std::string baseName = bridgedProtocol->name.substr(
              0, bridgedProtocol->name.size() - suffix.size());
          runtimeProtocol = objc_getProtocol(baseName.c_str());
        }
      }

      if (runtimeProtocol != nullptr) {
        *out = runtimeProtocol;
        return true;
      }
    }

    auto resolveProtocolByName =
        [](const std::string& protocolName) -> Protocol* {
      if (protocolName.empty()) {
        return nullptr;
      }

      Protocol* runtimeProtocol = objc_getProtocol(protocolName.c_str());
      if (runtimeProtocol != nullptr) {
        return runtimeProtocol;
      }

      static const std::string suffix = "Protocol";
      if (protocolName.size() > suffix.size() &&
          protocolName.compare(protocolName.size() - suffix.size(),
                               suffix.size(), suffix) == 0) {
        std::string baseName =
            protocolName.substr(0, protocolName.size() - suffix.size());
        return objc_getProtocol(baseName.c_str());
      }

      return nullptr;
    };

    std::string candidateName = readFunctionName(value);
    if (!candidateName.empty()) {
      for (const auto& entry : protocols) {
        ObjCProtocol* bridgedProtocol = entry.second;
        if (bridgedProtocol == nullptr) {
          continue;
        }

        if (bridgedProtocol->name == candidateName) {
          Protocol* runtimeProtocol =
              resolveProtocolByName(bridgedProtocol->name);
          if (runtimeProtocol != nullptr) {
            *out = runtimeProtocol;
            return true;
          }
        }
      }

      Protocol* runtimeProtocol = resolveProtocolByName(candidateName);
      if (runtimeProtocol != nullptr) {
        *out = runtimeProtocol;
        return true;
      }
    }

    return false;
  }

  inline bool tryResolveBridgedTypeConstructor(napi_env env, napi_value value,
                                               id* out) const {
    if (out == nullptr || value == nullptr) {
      return false;
    }

    Class bridgedClass = nil;
    if (tryResolveBridgedClassConstructor(env, value, &bridgedClass)) {
      *out = (id)bridgedClass;
      return true;
    }

    Protocol* bridgedProtocol = nullptr;
    if (tryResolveBridgedProtocolConstructor(env, value, &bridgedProtocol)) {
      *out = (id)bridgedProtocol;
      return true;
    }

    return false;
  }

  CFunction* getCFunction(napi_env env, MDSectionOffset offset);

  inline StructInfo* getStructInfo(napi_env env, MDSectionOffset offset) {
    auto cached = structInfoCache.find(offset);
    if (cached != structInfoCache.end()) {
      return cached->second;
    }

    auto structInfo = getStructInfoFromMetadata(env, metadata, offset);
    structInfoCache[offset] = structInfo;

    return structInfo;
  }

  inline StructInfo* getUnionInfo(napi_env env, MDSectionOffset offset) {
    auto cached = structInfoCache.find(offset);
    if (cached != structInfoCache.end()) {
      return cached->second;
    }

    auto structInfo = getStructInfoFromUnionMetadata(env, metadata, offset);
    structInfoCache[offset] = structInfo;

    return structInfo;
  }

 public:
  napi_env env = nullptr;
  uint64_t lifetimeToken = 0;
  std::unordered_map<id, napi_ref> objectRefs;
  std::unordered_map<uintptr_t, napi_ref> handleObjectRefs;

  napi_ref pointerClass = nullptr;
  napi_ref referenceClass = nullptr;
  napi_ref functionReferenceClass = nullptr;
  napi_ref createNativeProxy = nullptr;
  napi_ref createFastEnumeratorIterator = nullptr;
  napi_ref transferOwnershipToNative = nullptr;

  std::unordered_map<MDSectionOffset, ObjCClass*> classes;
  std::unordered_map<MDSectionOffset, ObjCProtocol*> protocols;
  std::unordered_map<Class, ObjCClass*> classesByPointer;
  std::unordered_map<Class, MDSectionOffset> mdClassesByPointer;
  std::unordered_map<Protocol*, MDSectionOffset> mdProtocolsByPointer;
  std::unordered_map<Class, napi_ref> constructorsByPointer;

  std::unordered_map<std::string, Cif*> cifs;
  std::unordered_map<MDSectionOffset, napi_ref> mdValueCache;
  std::unordered_map<MDSectionOffset, CFunction*> cFunctionCache;
  std::unordered_map<MDSectionOffset, Cif*> mdFunctionSignatureCache;
  std::unordered_map<MDSectionOffset, Cif*> mdMethodSignatureCache;
  std::unordered_map<MDSectionOffset, Cif*> mdBlockSignatureCache;
  std::unordered_map<std::string, MDSectionOffset> structOffsets;
  std::unordered_map<std::string, MDSectionOffset> unionOffsets;
  // std::unordered_map<std::string, MDSectionOffset> protocolOffsets;

  void* self_dl;

  MDMetadataReader* metadata;

 private:
  inline void storeObjectRef(id object, napi_ref ref) noexcept {
    std::lock_guard<std::mutex> lock(objectRefsMutex);
    objectRefs[object] = ref;
  }

  inline napi_value getNormalizedObjectRef(napi_env env, id object) const {
    std::lock_guard<std::mutex> lock(objectRefsMutex);

    auto exact = objectRefs.find(object);
    if (exact != objectRefs.end()) {
      return get_ref_value(env, exact->second);
    }

    uintptr_t objectKey = NormalizeHandleKey((void*)object);
    for (const auto& entry : objectRefs) {
      if (NormalizeHandleKey((void*)entry.first) != objectKey) {
        continue;
      }

      return get_ref_value(env, entry.second);
    }

    return nullptr;
  }

  inline napi_ref takeObjectRef(id object,
                                napi_ref expectedRef = nullptr) noexcept {
    std::lock_guard<std::mutex> lock(objectRefsMutex);

    auto exact = objectRefs.find(object);
    if (exact == objectRefs.end()) {
      return nullptr;
    }

    if (expectedRef != nullptr && exact->second != expectedRef) {
      return nullptr;
    }

    napi_ref ref = exact->second;
    objectRefs.erase(exact);
    return ref;
  }

  std::unordered_map<MDSectionOffset, StructInfo*> structInfoCache;
  std::vector<std::unordered_map<id, napi_ref>> roundTripCacheFrames;
  std::unordered_map<id, napi_ref> recentRoundTripCache;
  mutable std::mutex objectRefsMutex;
  void* trackedObjectLiveness = nullptr;
  void* objc_autoreleasePool;
};

}  // namespace nativescript

#endif /* nativescript_H */

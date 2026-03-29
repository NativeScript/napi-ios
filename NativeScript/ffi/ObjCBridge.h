#ifndef nativescript_H
#define nativescript_H

#include <dlfcn.h>
#include <objc/runtime.h>
#include <stdint.h>

#include <map>
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
  inline napi_value getNormalizedObjectRef(napi_env env, id object) const {
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

  std::unordered_map<MDSectionOffset, StructInfo*> structInfoCache;
  std::vector<std::unordered_map<id, napi_ref>> roundTripCacheFrames;
  std::unordered_map<id, napi_ref> recentRoundTripCache;
  void* objc_autoreleasePool;
};

}  // namespace nativescript

#endif /* nativescript_H */

#include "ClassMember.h"
#import <Foundation/Foundation.h>
#include <objc/objc.h>
#include <objc/runtime.h>
#include <algorithm>
#include <cctype>
#include <cstdlib>
#include <cstring>
#include <limits>
#include <unordered_set>
#include "ClassBuilder.h"
#include "MetadataReader.h"
#include "ObjCBridge.h"
#include "TypeConv.h"
#include "Util.h"
#include "ffi/Class.h"
#include "ffi/NativeScriptException.h"
#include "js_native_api.h"
#include "js_native_api_types.h"
#include "node_api_util.h"

namespace nativescript {

napi_value JS_NSObject_alloc(napi_env env, napi_callback_info cbinfo) {
  napi_value jsThis;
  napi_get_cb_info(env, cbinfo, nullptr, nullptr, &jsThis, nullptr);

  id self;
  napi_unwrap(env, jsThis, (void**)&self);

  bool supercall = class_conformsToProtocol(self, @protocol(ObjCBridgeClassBuilderProtocol));

  if (supercall) {
    ObjCBridgeState* state = ObjCBridgeState::InstanceData(env);
    ClassBuilder* builder = (ClassBuilder*)state->classesByPointer[self];
    if (!builder->isFinal) builder->build();
  }

  id result = [self alloc];
  return ObjCBridgeState::InstanceData(env)->getObject(env, result, jsThis, kOwnedObject);
}

void ObjCClassMember::defineMembers(napi_env env, ObjCClassMemberMap& memberMap,
                                    MDSectionOffset offset, napi_value constructor,
                                    ObjCClass* cls) {
  auto bridgeState = ObjCBridgeState::InstanceData(env);

  napi_value prototype;
  napi_get_named_property(env, constructor, "prototype", &prototype);

  bool next = true;

  while (next) {
    auto flags = bridgeState->metadata->getMemberFlag(offset);

    if (flags == mdMemberFlagNull) break;

    next = (flags & mdMemberNext) != 0;
    offset += sizeof(flags);

    napi_value jsObject;
    if ((flags & mdMemberStatic) != 0) {
      jsObject = constructor;
    } else {
      jsObject = prototype;
    }

    if ((flags & mdMemberProperty) != 0) {
      bool readonly = (flags & mdMemberReadonly) != 0;
      const char* name = bridgeState->metadata->getString(offset);
      offset += sizeof(MDSectionOffset);  // name

      MDSectionOffset getterSignature, setterSignature;

      const char* getterSelector = bridgeState->metadata->getString(offset);

      offset += sizeof(MDSectionOffset);  // getterSelector

      getterSignature = bridgeState->metadata->getOffset(offset);
      offset += sizeof(MDSectionOffset);  // getterSignature

      const char* setterSelector = nullptr;
      if (!readonly) {
        setterSelector = bridgeState->metadata->getString(offset);
        offset += sizeof(MDSectionOffset);  // setterSelector

        setterSignature = bridgeState->metadata->getOffset(offset);
        offset += sizeof(MDSectionOffset);  // setterSignature
      }

      auto updatedMember = ObjCClassMember(
          bridgeState, sel_registerName(getterSelector),
          !readonly ? sel_registerName(setterSelector) : nullptr,
          getterSignature + bridgeState->metadata->signaturesOffset,
          !readonly ? setterSignature + bridgeState->metadata->signaturesOffset : 0, flags);
      auto memberIt = memberMap.find(name);
      if (memberIt != memberMap.end()) {
        memberIt->second = updatedMember;
      } else {
        const auto& inserted = memberMap.emplace(name, updatedMember);
        memberIt = inserted.first;
      }

      napi_property_descriptor property = {
          .utf8name = name,
          .name = nil,
          .method = nil,
          .getter = jsGetter,
          .setter = readonly ? nil : jsSetter,
          .value = nil,
          .attributes = (napi_property_attributes)(napi_configurable | napi_enumerable),
          .data = &memberIt->second,
      };

      napi_define_properties(env, jsObject, 1, &property);
    } else {
      auto selector = bridgeState->metadata->getString(offset);
      offset += sizeof(MDSectionOffset);  // selector
      auto signature = bridgeState->metadata->getOffset(offset);
      offset += sizeof(MDSectionOffset);  // signature

      auto name = jsifySelector(selector);

      bool hasProperty = false;
      napi_has_named_property(env, jsObject, name.c_str(), &hasProperty);
      if (hasProperty && name != "init") {
        continue;
      }

      const auto& kv = memberMap.emplace(
          name, ObjCClassMember(bridgeState, sel_registerName(selector),
                                signature + bridgeState->metadata->signaturesOffset, flags));

      napi_property_descriptor property = {
          .utf8name = name.c_str(),
          .name = nil,
          .method = (flags & metagen::mdMemberIsInit) != 0 ? jsCallInit : jsCall,
          .getter = nil,
          .setter = nil,
          .value = nil,
          .attributes =
              (napi_property_attributes)(napi_configurable | napi_writable | napi_enumerable),
          .data = &kv.first->second,
      };

      if ((flags & mdMemberIsInit) != 0) {
        kv.first->second.cls = cls;
      }

      if (name == "alloc") {
        property.method = JS_NSObject_alloc;
      }

      napi_define_properties(env, jsObject, 1, &property);
    }
  }
}

inline bool objcNativeCall(napi_env env, Cif* cif, id self, void** avalues, void* rvalue) {
  bool classMethod = class_isMetaClass(object_getClass(self));
  SEL selector = avalues != nullptr && cif->cif.nargs >= 2 ? *((SEL*)avalues[1]) : nullptr;

  bool supercall = classMethod
                       ? class_conformsToProtocol(self, @protocol(ObjCBridgeClassBuilderProtocol))
                       : class_conformsToProtocol(object_getClass(self),
                                                  @protocol(ObjCBridgeClassBuilderProtocol));

  if (supercall && classMethod) {
    ObjCBridgeState* state = ObjCBridgeState::InstanceData(env);
    ClassBuilder* builder = (ClassBuilder*)state->classesByPointer[self];
    if (!builder->isFinal) builder->build();
  }

#if defined(__x86_64__)
  bool isStret = cif->returnType->type->size > 16 && cif->returnType->type->type == FFI_TYPE_STRUCT;
#endif

  @try {
    if (!supercall) {
#if defined(__x86_64__)
      if (isStret) {
        ffi_call(&cif->cif, FFI_FN(objc_msgSend_stret), rvalue, avalues);
      } else {
        ffi_call(&cif->cif, FFI_FN(objc_msgSend), rvalue, avalues);
      }
#else
      ffi_call(&cif->cif, FFI_FN(objc_msgSend), rvalue, avalues);
#endif
    } else {
      struct objc_super superobj = {self, class_getSuperclass(object_getClass(self))};
      auto superobjPtr = &superobj;
      avalues[0] = (void*)&superobjPtr;
#if defined(__x86_64__)
      if (isStret) {
        ffi_call(&cif->cif, FFI_FN(objc_msgSendSuper_stret), rvalue, avalues);
      } else {
        ffi_call(&cif->cif, FFI_FN(objc_msgSendSuper), rvalue, avalues);
      }
#else
      ffi_call(&cif->cif, FFI_FN(objc_msgSendSuper), rvalue, avalues);
#endif
    }

  } @catch (NSException* exception) {
    std::string message = exception.description.UTF8String;
    nativescript::NativeScriptException nativeScriptException(message);
    nativeScriptException.ReThrowToJS(env);
    return false;
  }

  return true;
}

// Utility function to check if a JS value can be converted to a specific type
bool canConvertToType(napi_env env, napi_value value, std::shared_ptr<TypeConv> typeConv) {
  if (typeConv == nullptr) {
    return false;
  }

  if (value == nullptr) {
    return true;  // null/undefined can convert to most types
  }

  napi_valuetype jsType;
  napi_typeof(env, value, &jsType);

  if (jsType == napi_null || jsType == napi_undefined) {
    return true;  // null/undefined are generally acceptable
  }

  // Check basic type compatibility based on TypeConv kind
  switch (typeConv->kind) {
    case mdTypeBool:
      return jsType == napi_boolean || jsType == napi_number;

    case mdTypeChar:
    case mdTypeUChar:
      return jsType == napi_boolean || jsType == napi_number || jsType == napi_bigint;

    case mdTypeSShort:
      return jsType == napi_number || jsType == napi_bigint;

    case mdTypeUShort:
      if (jsType == napi_string) {
        size_t len = 0;
        napi_get_value_string_utf16(env, value, nullptr, 0, &len);
        return len == 1;
      }
      return jsType == napi_number || jsType == napi_bigint;

    case mdTypeSInt:
    case mdTypeUInt:
    case mdTypeSLong:
    case mdTypeULong:
    case mdTypeSInt64:
    case mdTypeUInt64:
    case mdTypeFloat:
    case mdTypeDouble:
      return jsType == napi_number || jsType == napi_bigint;

    case mdTypeString:
      return jsType == napi_string || jsType == napi_object;

    case mdTypeAnyObject:
      return jsType == napi_object || jsType == napi_function || jsType == napi_string ||
             jsType == napi_number || jsType == napi_boolean;

    case mdTypeClass:
    case mdTypeClassObject:
    case mdTypeProtocolObject:
      return jsType == napi_function || jsType == napi_object;

    case mdTypeInstanceObject:
    case mdTypeNSStringObject:
    case mdTypeNSMutableStringObject: {
      if (jsType == napi_string) {
        // String can convert to NSString
        return true;
      }
      if (jsType == napi_object) {
        bool isArray;
        napi_is_array(env, value, &isArray);
        if (isArray) {
          // Array can convert to NSArray
          return true;
        }
        // Check if it's a wrapped native object
        void* wrapped;
        napi_status status = napi_unwrap(env, value, &wrapped);
        return status == napi_ok;
      }
      return false;
    }

    case mdTypeSelector:
      return jsType == napi_string;

    case mdTypePointer:
    case mdTypeOpaquePointer:
      return jsType == napi_object || jsType == napi_function || jsType == napi_bigint ||
             jsType == napi_string;

    case mdTypeStruct:
      return jsType == napi_object;

    case mdTypeBlock:
    case mdTypeFunctionPointer:
      return jsType == napi_function || jsType == napi_null || jsType == napi_undefined;

    default:
      return false;
  }
}

bool isPlainObjectLiteral(napi_env env, napi_value value) {
  if (value == nullptr) {
    return false;
  }

  napi_valuetype type = napi_undefined;
  napi_typeof(env, value, &type);
  if (type != napi_object) {
    return false;
  }

  bool isArray = false;
  napi_is_array(env, value, &isArray);
  if (isArray) {
    return false;
  }

  void* wrapped = nullptr;
  if (napi_unwrap(env, value, &wrapped) == napi_ok && wrapped != nullptr) {
    return false;
  }

  return true;
}

std::string lowerFirst(std::string value) {
  if (!value.empty()) {
    value[0] = (char)std::tolower(value[0]);
  }
  return value;
}

std::vector<std::string> selectorTokens(const char* selectorName) {
  std::vector<std::string> tokens;
  if (selectorName == nullptr) {
    return tokens;
  }

  std::string selector(selectorName);
  size_t start = 0;
  while (start < selector.size()) {
    size_t colon = selector.find(':', start);
    if (colon == std::string::npos) {
      break;
    }
    tokens.push_back(selector.substr(start, colon - start));
    start = colon + 1;
  }

  if (tokens.empty()) {
    return tokens;
  }

  std::string& first = tokens[0];
  if (first.rfind("initWith", 0) == 0 && first.size() > 8) {
    first = first.substr(8);
  } else if (first.rfind("init", 0) == 0 && first.size() > 4) {
    first = first.substr(4);
  }
  first = lowerFirst(first);

  for (size_t i = 1; i < tokens.size(); ++i) {
    tokens[i] = lowerFirst(tokens[i]);
  }

  return tokens;
}

bool tryResolveTokenArgs(napi_env env, const char* selectorName, napi_value tokenObject,
                         std::vector<napi_value>* resolvedArgs) {
  resolvedArgs->clear();

  std::vector<std::string> tokens = selectorTokens(selectorName);
  if (tokens.empty()) {
    return false;
  }

  for (const std::string& token : tokens) {
    if (token.empty()) {
      return false;
    }
    bool hasProperty = false;
    napi_has_named_property(env, tokenObject, token.c_str(), &hasProperty);
    if (!hasProperty) {
      return false;
    }
    napi_value tokenValue = nullptr;
    napi_get_named_property(env, tokenObject, token.c_str(), &tokenValue);
    resolvedArgs->push_back(tokenValue);
  }

  return !resolvedArgs->empty();
}

Cif* resolveInitCif(napi_env env, ObjCClassMember* candidate, Class nativeClass) {
  if (candidate == nullptr || candidate->bridgeState == nullptr) {
    return nullptr;
  }

  if (nativeClass != nil) {
    Method method = class_getInstanceMethod(nativeClass, candidate->methodOrGetter.selector);
    if (method == nullptr) {
      return nullptr;
    }
    Cif* runtimeCif = candidate->bridgeState->getMethodCif(env, method);
    Cif* metadataCif =
        candidate->bridgeState->getMethodCif(env, candidate->methodOrGetter.signatureOffset);

    // Metadata signatures currently under-specify some variadic Objective-C methods
    // (e.g. initWithTitle:...otherButtonTitles:), so fall back to runtime encoding there.
    if (metadataCif == nullptr) {
      return runtimeCif;
    }
    if (metadataCif->isVariadic ||
        (metadataCif->argc == 0 && runtimeCif != nullptr && runtimeCif->argc > 0)) {
      return runtimeCif != nullptr ? runtimeCif : metadataCif;
    }
    return metadataCif;
  }

  return candidate->bridgeState->getMethodCif(env, candidate->methodOrGetter.signatureOffset);
}

// Find the best initializer for a class given JS arguments.
ObjCClassMember* findInitializerForArgs(napi_env env, ObjCClassMemberMap* initializers,
                                        Class nativeClass, size_t argc, napi_value* argv,
                                        std::vector<napi_value>* selectedArgs) {
  if (initializers == nullptr) {
    napi_throw_error(env, "NativeScriptException",
                     "No Objective-C metadata available for constructor invocation.");
    return nullptr;
  }

  if (argc > 0 && argv == nullptr) {
    napi_throw_error(env, "NativeScriptException",
                     "Invalid constructor arguments for initializer resolution.");
    return nullptr;
  }

  struct Candidate {
    ObjCClassMember* member;
    Cif* cif;
    std::vector<napi_value> args;
    int bonus;
  };

  std::vector<Candidate> candidates;
  const bool hasTokenObject = argc == 1 && argv != nullptr && isPlainObjectLiteral(env, argv[0]);
  napi_value tokenObject = hasTokenObject ? argv[0] : nullptr;

  // First pass: find initializers with matching argument count
  for (auto& pair : *initializers) {
    auto* candidate = &pair.second;
    if (candidate == nullptr || candidate->methodOrGetter.selector == nullptr) {
      continue;
    }

    const std::string& memberName = pair.first;
    if (memberName.rfind("init", 0) != 0) {
      continue;
    }

    Cif* cif = resolveInitCif(env, candidate, nativeClass);
    if (cif == nullptr) {
      continue;
    }
    candidate->cif = cif;

    auto tryAddCandidate = [&](const std::vector<napi_value>& callArgs, int bonus) {
      if (cif->argc != callArgs.size()) {
        return;
      }

      for (size_t i = 0; i < callArgs.size(); ++i) {
        if (!canConvertToType(env, callArgs[i], cif->argTypes[i])) {
          return;
        }
      }

      candidates.push_back(Candidate{candidate, cif, callArgs, bonus});
    };

    std::vector<napi_value> regularArgs(argc);
    for (size_t i = 0; i < argc; ++i) {
      regularArgs[i] = argv[i];
    }
    tryAddCandidate(regularArgs, 0);

    if (hasTokenObject) {
      const char* selectorName = sel_getName(candidate->methodOrGetter.selector);
      if (selectorName == nullptr) {
        continue;
      }

      std::vector<napi_value> tokenArgs;
      if (tryResolveTokenArgs(env, selectorName, tokenObject, &tokenArgs)) {
        tryAddCandidate(tokenArgs, 100);
      }
    }
  }

  if (candidates.empty()) {
    napi_throw_error(env, "NativeScriptException",
                     "No initializer found that matches constructor invocation.");
    return nullptr;
  } else if (candidates.size() > 1) {
    auto scoreCandidate = [&](const Candidate& candidate) -> int {
      int score = candidate.bonus;
      const char* selectorCStr = sel_getName(candidate.member->methodOrGetter.selector);
      std::string selectorName = selectorCStr != nullptr ? selectorCStr : "";
      std::string selectorNameLower = selectorName;
      std::transform(selectorNameLower.begin(), selectorNameLower.end(), selectorNameLower.begin(),
                     [](unsigned char ch) { return (char)std::tolower(ch); });

      for (size_t i = 0; i < candidate.args.size(); ++i) {
        napi_valuetype jsType = napi_undefined;
        napi_typeof(env, candidate.args[i], &jsType);
        auto kind = candidate.cif->argTypes[i]->kind;

        if (jsType == napi_object) {
          bool isArray = false;
          napi_is_array(env, candidate.args[i], &isArray);
          if (isArray) {
            if (selectorNameLower.find("array") != std::string::npos) {
              score += 8;
            }
            if (selectorNameLower.find("url") != std::string::npos ||
                selectorNameLower.find("file") != std::string::npos ||
                selectorNameLower.find("coder") != std::string::npos) {
              score -= 2;
            }
          }
        }

        if ((kind == mdTypeNSStringObject || kind == mdTypeNSMutableStringObject) &&
            jsType == napi_string) {
          score += 4;
        } else if ((kind == mdTypeStruct) && jsType == napi_object) {
          score += 4;
        } else if ((kind == mdTypeBool && jsType == napi_boolean) ||
                   ((kind == mdTypeSInt || kind == mdTypeUInt || kind == mdTypeSLong ||
                     kind == mdTypeULong || kind == mdTypeSInt64 || kind == mdTypeUInt64 ||
                     kind == mdTypeFloat || kind == mdTypeDouble) &&
                    (jsType == napi_number || jsType == napi_bigint))) {
          score += 3;
        } else if ((kind == mdTypeClass || kind == mdTypeClassObject ||
                    kind == mdTypeProtocolObject) &&
                   jsType == napi_function) {
          score += 3;
        } else if ((kind == mdTypeAnyObject || kind == mdTypeInstanceObject) &&
                   (jsType == napi_object || jsType == napi_function)) {
          score += 2;
        } else if (kind == mdTypeString && jsType == napi_string) {
          score += 2;
        } else {
          score += 1;
        }
      }
      return score;
    };

    int bestScore = std::numeric_limits<int>::min();
    Candidate* bestCandidate = nullptr;
    bool tie = false;
    for (auto& candidate : candidates) {
      int score = scoreCandidate(candidate);
      if (score > bestScore) {
        bestScore = score;
        bestCandidate = &candidate;
        tie = false;
      } else if (score == bestScore) {
        tie = true;
      }
    }

    if (bestCandidate != nullptr && !tie) {
      if (selectedArgs != nullptr) {
        *selectedArgs = bestCandidate->args;
      }
      bestCandidate->member->cif = bestCandidate->cif;
      return bestCandidate->member;
    }

    // Prefer "init" if no arguments
    if (argc == 0) {
      for (const auto& candidate : candidates) {
        const char* selectorName = sel_getName(candidate.member->methodOrGetter.selector);
        if (strcmp(selectorName, "init") == 0) {
          if (selectedArgs != nullptr) {
            selectedArgs->clear();
          }
          candidate.member->cif = candidate.cif;
          return candidate.member;
        }
      }
    }

    // If multiple candidates, throw an error with details
    std::string errorMsg = "More than one initializer found that matches constructor invocation:";
    std::unordered_set<ObjCClassMember*> uniqueMembers;
    for (const auto& candidate : candidates) {
      if (!uniqueMembers.insert(candidate.member).second) {
        continue;
      }
      errorMsg += " ";
      errorMsg += sel_getName(candidate.member->methodOrGetter.selector);
    }
    napi_throw_error(env, "NativeScriptException", errorMsg.c_str());
    return nullptr;
  }

  if (selectedArgs != nullptr) {
    *selectedArgs = candidates[0].args;
  }
  candidates[0].member->cif = candidates[0].cif;
  return candidates[0].member;
}

inline id assertSelf(napi_env env, napi_value jsThis) {
  id self;
  napi_unwrap(env, jsThis, (void**)&self);

  if (self == nil) {
    napi_throw_error(env, "NativeScriptException",
                     "There was no native counterpart to the JavaScript object. Native API was "
                     "called with a likely plain object.");
    return nullptr;
  }

  return self;
}

ObjCClass* resolveInitMetadataClass(napi_env env, napi_value jsThis, ObjCClassMember* method,
                                    Class nativeClass) {
  ObjCBridgeState* state = ObjCBridgeState::InstanceData(env);
  if (state == nullptr) {
    return method != nullptr ? method->cls : nullptr;
  }

  auto resolveFromClass = [&](Class cls) -> ObjCClass* {
    if (cls == nil) {
      return nullptr;
    }

    auto bridgedIt = state->classesByPointer.find(cls);
    if (bridgedIt != state->classesByPointer.end() && bridgedIt->second != nullptr) {
      ObjCClass* bridgedClass = bridgedIt->second;
      if (bridgedClass->metadataOffset != MD_SECTION_OFFSET_NULL) {
        return bridgedClass;
      }
      if (bridgedClass->superclass != nullptr) {
        return bridgedClass->superclass;
      }
    }

    auto mdClsIt = state->mdClassesByPointer.find(cls);
    if (mdClsIt != state->mdClassesByPointer.end()) {
      return state->getClass(env, mdClsIt->second);
    }

    return nullptr;
  };

  if (jsThis != nullptr) {
    napi_value constructor = nullptr;
    if (napi_get_named_property(env, jsThis, "constructor", &constructor) == napi_ok &&
        constructor != nullptr) {
      Class constructorClass = nil;
      if (napi_unwrap(env, constructor, (void**)&constructorClass) == napi_ok) {
        ObjCClass* resolved = resolveFromClass(constructorClass);
        if (resolved != nullptr) {
          return resolved;
        }
      }
    }
  }

  if (nativeClass != nil) {
    for (Class current = nativeClass; current != nil; current = class_getSuperclass(current)) {
      ObjCClass* resolved = resolveFromClass(current);
      if (resolved != nullptr) {
        return resolved;
      }
    }
  }

  if (method != nullptr && method->cls != nullptr) {
    return method->cls;
  }

  return nullptr;
}

class RoundTripCacheFrameGuard {
 public:
  RoundTripCacheFrameGuard(napi_env env, ObjCBridgeState* bridgeState)
      : env_(env), bridgeState_(bridgeState) {
    if (bridgeState_ != nullptr) {
      bridgeState_->beginRoundTripCacheFrame(env_);
    }
  }

  ~RoundTripCacheFrameGuard() {
    if (bridgeState_ != nullptr) {
      bridgeState_->endRoundTripCacheFrame(env_);
    }
  }

 private:
  napi_env env_;
  ObjCBridgeState* bridgeState_;
};

napi_value ObjCClassMember::jsCallInit(napi_env env, napi_callback_info cbinfo) {
  napi_value jsThis;
  ObjCClassMember* method;

  size_t argc = 0;
  napi_get_cb_info(env, cbinfo, &argc, nullptr, &jsThis, (void**)&method);

  id self = assertSelf(env, jsThis);

  if (self == nullptr) {
    return nullptr;
  }

  RoundTripCacheFrameGuard roundTripCacheFrame(env, method->bridgeState);

  SEL sel = method->methodOrGetter.selector;
  Class nativeClass = [self class];
  std::vector<napi_value> resolvedInitArgs;
  if (sel == @selector(init) && argc > 0) {
    std::vector<napi_value> callArgs(argc);
    napi_status cbStatus = napi_get_cb_info(env, cbinfo, &argc, callArgs.data(), &jsThis, nullptr);
    if (cbStatus != napi_ok) {
      napi_throw_error(env, "NativeScriptException",
                       "Unable to read constructor arguments for initializer resolution.");
      return nullptr;
    }
    callArgs.resize(argc);
    ObjCClass* cls = resolveInitMetadataClass(env, jsThis, method, nativeClass);
    if (cls == nullptr) {
      napi_throw_error(env, "NativeScriptException",
                       "Unable to resolve Objective-C class metadata for initializer invocation.");
      return nullptr;
    }

    ObjCClassMember* newMethod = findInitializerForArgs(env, &cls->members, nativeClass, argc,
                                                        callArgs.data(), &resolvedInitArgs);
    if (newMethod != nullptr) {
      method = newMethod;
    } else {
      bool pendingException = false;
      napi_is_exception_pending(env, &pendingException);
      if (pendingException) {
        return nullptr;
      }
    }
  }

  Cif* cif = method->cif;
  if (cif == nullptr) {
    cif = method->cif =
        method->bridgeState->getMethodCif(env, method->methodOrGetter.signatureOffset);
  }

  if (!resolvedInitArgs.empty()) {
    argc = resolvedInitArgs.size();
    if (argc != cif->argc) {
      napi_throw_error(env, "NativeScriptException",
                       "Initializer resolution produced invalid argument count.");
      return nullptr;
    }
    for (size_t i = 0; i < argc; i++) {
      cif->argv[i] = resolvedInitArgs[i];
    }
  } else {
    argc = cif->argc;
    napi_get_cb_info(env, cbinfo, &argc, cif->argv, &jsThis, nullptr);
  }

  void* avalues[cif->cif.nargs];

  avalues[0] = (void*)&self;
  avalues[1] = (void*)&method->methodOrGetter.selector;

  bool shouldFreeAny = false;
  bool shouldFree[cif->argc];

  if (cif->argc > 0) {
    for (unsigned int i = 0; i < cif->argc; i++) {
      shouldFree[i] = false;
      avalues[i + 2] = cif->avalues[i];
      cif->argTypes[i]->toNative(env, cif->argv[i], avalues[i + 2], &shouldFree[i], &shouldFreeAny);
    }
  }

  id rvalue;
  bool retainedReceiver = false;
  if (!method->classMethod) {
    // init can return a different object and release the original receiver.
    // Keep the original receiver alive while this JS wrapper still references it.
    [self retain];
    retainedReceiver = true;
  }

  if (!objcNativeCall(env, cif, self, avalues, &rvalue)) {
    if (retainedReceiver) {
      [self release];
    }
    return nullptr;
  }

  for (unsigned int i = 0; i < cif->argc; i++) {
    if (shouldFree[i]) {
      cif->argTypes[i]->free(env, *((void**)avalues[i + 2]));
    }
  }

  if (rvalue == nil) {
    if (retainedReceiver) {
      [self release];
    }
    napi_value result;
    napi_get_null(env, &result);
    return result;
  }

  napi_value constructor = jsThis;
  if (!method->classMethod) {
    napi_get_named_property(env, jsThis, "constructor", &constructor);
  }

  napi_value result = method->bridgeState->getObject(env, rvalue, constructor, kUnownedObject);

  if (rvalue != self) {
    [rvalue release];
  } else if (retainedReceiver) {
    [self release];
  }

  return result;
}

napi_value ObjCClassMember::jsCall(napi_env env, napi_callback_info cbinfo) {
  napi_value jsThis;
  ObjCClassMember* method;

  napi_get_cb_info(env, cbinfo, nullptr, nullptr, &jsThis, (void**)&method);

  id self = assertSelf(env, jsThis);

  if (self == nullptr) {
    return nullptr;
  }

  RoundTripCacheFrameGuard roundTripCacheFrame(env, method->bridgeState);

  Cif* cif = method->cif;
  if (cif == nullptr) {
    cif = method->cif =
        method->bridgeState->getMethodCif(env, method->methodOrGetter.signatureOffset);
  }

  size_t argc = cif->argc;
  napi_get_cb_info(env, cbinfo, &argc, cif->argv, &jsThis, nullptr);

  void* avalues[cif->cif.nargs];
  void* rvalue = cif->rvalue;

  avalues[0] = (void*)&self;
  avalues[1] = (void*)&method->methodOrGetter.selector;

  bool shouldFreeAny = false;
  bool shouldFree[cif->argc];

  if (cif->argc > 0) {
    for (unsigned int i = 0; i < cif->argc; i++) {
      shouldFree[i] = false;
      avalues[i + 2] = cif->avalues[i];
      cif->argTypes[i]->toNative(env, cif->argv[i], avalues[i + 2], &shouldFree[i], &shouldFreeAny);
    }
  }

  // NSLog(@"objcNativeCall: %p, %@", self, NSStringFromSelector(method->methodOrGetter.selector));

  if (!objcNativeCall(env, cif, self, avalues, rvalue)) {
    return nullptr;
  }

  for (unsigned int i = 0; i < cif->argc; i++) {
    if (shouldFree[i]) {
      cif->argTypes[i]->free(env, *((void**)avalues[i + 2]));
    }
  }

  const char* selectorName = sel_getName(method->methodOrGetter.selector);
  if (strcmp(selectorName, "class") == 0) {
    const bool receiverIsClass = class_isMetaClass(object_getClass(self));
    if (!receiverIsClass) {
      napi_value constructor = jsThis;
      napi_get_named_property(env, jsThis, "constructor", &constructor);
      return constructor;
    }

    id classObject = self;
    return method->bridgeState->getObject(env, classObject, kUnownedObject, 0, nullptr);
  }

  if (cif->returnType->kind == mdTypeInstanceObject) {
    const bool receiverIsClass = class_isMetaClass(object_getClass(self));
    napi_value constructor = jsThis;
    if (!receiverIsClass) {
      napi_get_named_property(env, jsThis, "constructor", &constructor);
    }
    id obj = *((id*)rvalue);
    return method->bridgeState->getObject(env, obj, constructor,
                                          method->returnOwned ? kOwnedObject : kUnownedObject);
  }

  return cif->returnType->toJS(env, rvalue, method->returnOwned ? kReturnOwned : 0);
}

napi_value ObjCClassMember::jsGetter(napi_env env, napi_callback_info cbinfo) {
  napi_value jsThis;
  ObjCClassMember* method;

  napi_get_cb_info(env, cbinfo, nullptr, nullptr, &jsThis, (void**)&method);

  id self = assertSelf(env, jsThis);

  if (self == nullptr) {
    return nullptr;
  }

  Cif* cif = method->cif;
  if (cif == nullptr) {
    cif = method->cif =
        method->bridgeState->getMethodCif(env, method->methodOrGetter.signatureOffset);
  }

  void* avalues[2] = {&self, &method->methodOrGetter.selector};
  void* rvalue = cif->rvalue;

  // NSLog(@"objcNativeCall: %p, %@", self, NSStringFromSelector(method->methodOrGetter.selector));

  if (!objcNativeCall(env, cif, self, avalues, rvalue)) {
    return nullptr;
  }

  const char* selectorName = sel_getName(method->methodOrGetter.selector);
  if (strcmp(selectorName, "class") == 0) {
    id classObject = class_isMetaClass(object_getClass(self)) ? self : (id)object_getClass(self);
    return method->bridgeState->getObject(env, classObject, kUnownedObject, 0, nullptr);
  }

  if (cif->returnType->kind == mdTypeInstanceObject) {
    const bool receiverIsClass = class_isMetaClass(object_getClass(self));
    napi_value constructor = jsThis;
    if (!receiverIsClass) {
      napi_get_named_property(env, jsThis, "constructor", &constructor);
    }
    id obj = *((id*)rvalue);
    return method->bridgeState->getObject(env, obj, constructor,
                                          method->returnOwned ? kOwnedObject : kUnownedObject);
  }

  return cif->returnType->toJS(env, rvalue, 0);
}

napi_value ObjCClassMember::jsSetter(napi_env env, napi_callback_info cbinfo) {
  napi_value jsThis, argv;
  size_t argc = 1;
  ObjCClassMember* method;

  napi_get_cb_info(env, cbinfo, &argc, &argv, &jsThis, (void**)&method);

  id self = assertSelf(env, jsThis);

  if (self == nullptr) {
    return nullptr;
  }

  RoundTripCacheFrameGuard roundTripCacheFrame(env, method->bridgeState);

  Cif* cif = method->setterCif;
  if (cif == nullptr) {
    cif = method->setterCif =
        method->bridgeState->getMethodCif(env, method->setter.signatureOffset);
  }

  void* avalues[3] = {&self, &method->setter.selector, cif->avalues[0]};
  void* rvalue = nullptr;

  bool shouldFree = false;
  cif->argTypes[0]->toNative(env, argv, avalues[2], &shouldFree, &shouldFree);

  if (!objcNativeCall(env, cif, self, avalues, rvalue)) {
    return nullptr;
  }

  if (shouldFree) {
    cif->argTypes[0]->free(env, *((void**)avalues[2]));
  }

  return nullptr;
}

}  // namespace nativescript

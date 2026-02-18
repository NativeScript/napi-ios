#include "ClassBuilder.h"
#import <Foundation/Foundation.h>
#include <objc/runtime.h>
#include "Closure.h"
#include "Metadata.h"
#include "ObjCBridge.h"
#include "Util.h"
#include "js_native_api.h"
#include "node_api_util.h"

namespace nativescript {
namespace {
std::unordered_map<std::string, MethodDescriptor> gKnownExposedMethods;
}

ClassBuilder::ClassBuilder(napi_env env, napi_value constructor) {
  this->env = env;
  bridgeState = ObjCBridgeState::InstanceData(env);

  metadataOffset = MD_SECTION_OFFSET_NULL;

  napi_value superConstructor;
  napi_get_prototype(env, constructor, &superConstructor);
  Class superClassNative = nullptr;
  napi_unwrap(env, superConstructor, (void**)&superClassNative);

  if (superClassNative == nullptr) {
    // If the class does not inherit from a native class,
    // by default it inherits from NSObject.
    superClassNative = [NSObject class];
  }

  auto superClassIt = bridgeState->classesByPointer.find(superClassNative);
  if (superClassIt != bridgeState->classesByPointer.end()) {
    superclass = superClassIt->second;
  } else {
    auto mdClassIt = bridgeState->mdClassesByPointer.find(superClassNative);
    if (mdClassIt != bridgeState->mdClassesByPointer.end()) {
      superclass = bridgeState->getClass(env, mdClassIt->second);
    } else {
      superclass = nullptr;
    }
  }


  napi_value className;
  napi_get_named_property(env, constructor, "name", &className);
  static char classNameBuf[512];
  napi_get_value_string_utf8(env, className, classNameBuf, 512, nullptr);

  name = classNameBuf;
  if (objc_getClass(name.c_str()) != nullptr) {
    name += "_";
    name += std::to_string(rand());
  }

  nativeClass = objc_allocateClassPair(superClassNative, name.c_str(), 0);

  if (nativeClass == nullptr) {
    napi_throw_error(env, nullptr, "Failed to allocate class");
    return;
  }

  class_addProtocol(nativeClass, @protocol(ObjCBridgeClassBuilderProtocol));

  objc_registerClassPair(nativeClass);

  napi_remove_wrap(env, constructor, nullptr);

  napi_wrap(env, constructor, (void*)nativeClass, nullptr, nullptr, nullptr);

  napi_value prototype;
  napi_get_named_property(env, constructor, "prototype", &prototype);

  this->constructor = make_ref(env, constructor);
  this->prototype = make_ref(env, prototype);
}

ClassBuilder::~ClassBuilder() {
  if (nativeClass != nullptr) {
    objc_disposeClassPair(nativeClass);
    napi_delete_reference(env, constructor);
    napi_delete_reference(env, prototype);
  }
}

void ClassBuilder::addProtocol(ObjCProtocol* protocol) {
  if (!protocols.contains(protocol)) {
    protocols.emplace(protocol);
    // Not always there is a `Protocol` object for the protocol, so we
    // need to check if it exists first.
    Protocol* proto = objc_getProtocol(protocol->name.c_str());
    if (proto != nullptr) {
      class_addProtocol(nativeClass, proto);
    }
  }
}

MethodDescriptor* ClassBuilder::lookupMethodDescriptor(std::string& name, bool setter) {
  // 1. First we look up if there was a custom definition for the method
  // in ObjCExposedMethods static of the custom class.
  if (!setter) {
    auto findExposedMethod = exposedMethods.find(name);
    if (findExposedMethod != exposedMethods.end()) {
      return &findExposedMethod->second;
    }

    auto findKnownExposedMethod = gKnownExposedMethods.find(name);
    if (findKnownExposedMethod != gKnownExposedMethods.end()) {
      return &findKnownExposedMethod->second;
    }
  }

  auto getMemberDescriptor = [&](ObjCClassMember& member) -> MethodDescriptor* {
    if (setter) {
      if (member.methodOrGetter.isProperty && member.setter.selector != nullptr) {
        return &member.setter;
      }
      return nullptr;
    }

    return &member.methodOrGetter;
  };

  // 2. Then walk through the class hierarchy and see if we can find the
  // method in the superclass chain.
  ObjCClass* currentClass = superclass;
  while (currentClass != nullptr) {
    auto findMethod = currentClass->members.find(name);
    if (findMethod != currentClass->members.end()) {
      MethodDescriptor* descriptor = getMemberDescriptor(findMethod->second);
      if (descriptor != nullptr) {
        return descriptor;
      }
    }
    currentClass = currentClass->superclass;
  }

  // 3. And finally, look into all protocols implemented (directly or
  // indirectly) and try to find the method there.
  std::function<MethodDescriptor*(std::unordered_set<ObjCProtocol*> & protocols)> processProtocols =
      [&](std::unordered_set<ObjCProtocol*>& protocols) -> MethodDescriptor* {
    for (auto protocol : protocols) {
      auto findMethod = protocol->members.find(name);
      if (findMethod != protocol->members.end()) {
        MethodDescriptor* descriptor = getMemberDescriptor(findMethod->second);
        if (descriptor != nullptr) {
          return descriptor;
        }
      }
      MethodDescriptor* desc = processProtocols(protocol->protocols);
      if (desc != nullptr) return desc;
    }
    return (MethodDescriptor*)nullptr;
  };

  return processProtocols(protocols);
}

void ClassBuilder::addMethod(std::string& name, MethodDescriptor* desc, napi_value key,
                             napi_value func) {
  switch (desc->kind) {
    case kMethodDescEncoding: {
      const char* encoding = desc->encoding.c_str();
      auto closure = new Closure(encoding, false, true);
      closure->env = env;
      if (func != nullptr)
        closure->func = make_ref(env, func);
      else
        closure->propertyName = name;
      closure->thisConstructor = constructor;
      class_replaceMethod(nativeClass, desc->selector, (IMP)closure->fnptr, encoding);
      break;
    }

    case kMethodDescSignatureOffset: {
      std::string encoding;
      auto closure = new Closure(bridgeState->metadata, desc->signatureOffset, false, &encoding,
                                 true, desc->isProperty);
      closure->env = env;
      if (func != nullptr)
        closure->func = make_ref(env, func);
      else
        closure->propertyName = name;
      closure->thisConstructor = constructor;
      class_replaceMethod(nativeClass, desc->selector, (IMP)closure->fnptr, encoding.c_str());
      break;
    }
  }
}

void ClassBuilder::build() {
  if (isFinal) return;

  isFinal = true;

  napi_value constructor = get_ref_value(env, this->constructor),
             prototype = get_ref_value(env, this->prototype);

  // 1. Extract method definitions from ObjCExposedMethods static

  napi_value exposedMethods, exposedMethodNames;
  bool hasExposedMethods = false;
  napi_has_named_property(env, constructor, "ObjCExposedMethods", &hasExposedMethods);

  if (hasExposedMethods) {
    napi_get_named_property(env, constructor, "ObjCExposedMethods", &exposedMethods);

    napi_get_all_property_names(env, exposedMethods, napi_key_own_only, napi_key_skip_symbols,
                                napi_key_numbers_to_strings, &exposedMethodNames);

    uint32_t exposedMethodCount = 0;
    napi_get_array_length(env, exposedMethodNames, &exposedMethodCount);

    for (uint32_t i = 0; i < exposedMethodCount; i++) {
      napi_value exposedMethodName;
      napi_get_element(env, exposedMethodNames, i, &exposedMethodName);
      static char exposedMethodNameBuf[512];
      napi_get_value_string_utf8(env, exposedMethodName, exposedMethodNameBuf, 512, nullptr);
      std::string name = exposedMethodNameBuf;
      SEL selector = sel_registerName(name.c_str());
      std::string encoding;

      napi_value def, params, returns;
      napi_get_named_property(env, exposedMethods, name.c_str(), &def);
      napi_get_named_property(env, def, "params", &params);
      napi_get_named_property(env, def, "returns", &returns);

      uint32_t paramCount = 0;
      napi_get_array_length(env, params, &paramCount);

      encoding += getEncodedType(env, returns);
      encoding += "@:";

      for (uint32_t j = 0; j < paramCount; j++) {
        napi_value param;
        napi_get_element(env, params, j, &param);
        std::string enctype = getEncodedType(env, param);
        if (enctype == "v") {
          napi_throw_error(env, nullptr, "Void type not allowed in method params");
          return;
        }
        encoding += enctype;
      }

      auto descriptor = MethodDescriptor(selector, encoding);
      this->exposedMethods[name] = descriptor;
      gKnownExposedMethods[name] = descriptor;
      gKnownExposedMethods[jsifySelector(name)] = descriptor;
    }
  }

  // 2. Extract the protocol references from ObjCProtocols static

  napi_value protocols, protocol;
  bool hasProtocols = false;
  napi_has_named_property(env, constructor, "ObjCProtocols", &hasProtocols);

  if (hasProtocols) {
    napi_get_named_property(env, constructor, "ObjCProtocols", &protocols);

    uint32_t i = 0;
    uint32_t length = 0;
    napi_get_array_length(env, protocols, &length);

    while (i < length) {
      napi_get_element(env, protocols, i, &protocol);
      static char protocolNameBuf[512];
      napi_get_value_string_utf8(env, protocol, protocolNameBuf, 512, nullptr);
      ObjCProtocol* proto = nullptr;
      napi_unwrap(env, protocol, (void**)&proto);
      if (proto != nullptr) addProtocol(proto);
      i++;
    }
  }

  // 3. Walk over methods defined on the prototype and add them to the ObjC
  // class if we can find the corresponding method descriptor.

  napi_value properties;

  napi_get_all_property_names(env, prototype, napi_key_own_only, napi_key_skip_symbols,
                              napi_key_numbers_to_strings, &properties);

  uint32_t propertyCount = 0;
  napi_get_array_length(env, properties, &propertyCount);

  napi_value global, objectCtor, getOwnPropertyDescriptor;
  napi_get_global(env, &global);
  napi_get_named_property(env, global, "Object", &objectCtor);
  napi_get_named_property(env, objectCtor, "getOwnPropertyDescriptor",
                          &getOwnPropertyDescriptor);

  uint32_t i = 0;
  const bool traceDecoratedObject = this->name.find("TSDecoratedObject") != std::string::npos;
  if (traceDecoratedObject) {
    const char* superName =
        (superclass != nullptr && superclass->nativeClass != nil) ? class_getName(superclass->nativeClass)
                                                                   : "(null)";
    const unsigned long superMembers =
        superclass != nullptr ? (unsigned long)superclass->members.size() : 0;
    NSLog(@"[ClassBuilder build] class=%s superObj=%p superName=%s superMembers=%lu", this->name.c_str(),
          superclass, superName, superMembers);
    if (superclass != nullptr) {
      bool hasVoid = superclass->members.find("voidSelector") != superclass->members.end();
      bool hasVariadic = superclass->members.find("variadicSelectorX") != superclass->members.end();
      NSLog(@"[ClassBuilder build] class=%s superHas voidSelector=%d variadicSelectorX=%d",
            this->name.c_str(), hasVoid, hasVariadic);
    }
  }
  while (i < propertyCount) {
    napi_value property;
    napi_get_element(env, properties, i, &property);
    static char propertyNameBuf[512];
    napi_get_value_string_utf8(env, property, propertyNameBuf, 512, nullptr);
    std::string name = propertyNameBuf;
    napi_value descriptorArgs[] = {prototype, property};
    napi_value propertyDescriptor;
    napi_call_function(env, objectCtor, getOwnPropertyDescriptor, 2, descriptorArgs,
                       &propertyDescriptor);

    napi_valuetype descriptorType;
    napi_typeof(env, propertyDescriptor, &descriptorType);
    if (descriptorType == napi_undefined || descriptorType == napi_null) {
      i++;
      continue;
    }

    bool hasValue = false;
    napi_has_named_property(env, propertyDescriptor, "value", &hasValue);
    if (hasValue) {
      napi_value methodFunc;
      napi_get_named_property(env, propertyDescriptor, "value", &methodFunc);
      napi_valuetype funcType = napi_undefined;
      napi_typeof(env, methodFunc, &funcType);
      if (funcType == napi_function) {
        MethodDescriptor* desc = lookupMethodDescriptor(name);
        if (traceDecoratedObject) {
          NSLog(@"[ClassBuilder build] class=%s method=%s value desc=%p", this->name.c_str(),
                name.c_str(), desc);
        }
        if (desc != nullptr) {
          if (traceDecoratedObject) {
            NSLog(@"[ClassBuilder build] add method selector=%s", sel_getName(desc->selector));
          }
          addMethod(name, desc, property, methodFunc);
        }
      }
    }

    bool hasGetter = false;
    napi_has_named_property(env, propertyDescriptor, "get", &hasGetter);
    if (hasGetter) {
      napi_value getterFunc;
      napi_get_named_property(env, propertyDescriptor, "get", &getterFunc);
      napi_valuetype getterType = napi_undefined;
      napi_typeof(env, getterFunc, &getterType);
      if (getterType == napi_function) {
        MethodDescriptor* getterDesc = lookupMethodDescriptor(name);
        if (traceDecoratedObject) {
          NSLog(@"[ClassBuilder build] class=%s getter=%s desc=%p", this->name.c_str(),
                name.c_str(), getterDesc);
        }
        if (getterDesc != nullptr) {
          addMethod(name, getterDesc, property, getterFunc);
        }
      }
    }

    bool hasSetter = false;
    napi_has_named_property(env, propertyDescriptor, "set", &hasSetter);
    if (hasSetter) {
      napi_value setterFunc;
      napi_get_named_property(env, propertyDescriptor, "set", &setterFunc);
      napi_valuetype setterType = napi_undefined;
      napi_typeof(env, setterFunc, &setterType);
      if (setterType == napi_function) {
        MethodDescriptor* setterDesc = lookupMethodDescriptor(name, true);
        if (traceDecoratedObject) {
          NSLog(@"[ClassBuilder build] class=%s setter=%s desc=%p", this->name.c_str(),
                name.c_str(), setterDesc);
        }
        if (setterDesc != nullptr) {
          addMethod(name, setterDesc, property, setterFunc);
        }
      }
    }
    i++;
  }
}

// Static method to extend native classes with JavaScript-defined methods
napi_value ClassBuilder::ExtendCallback(napi_env env, napi_callback_info info) {
  size_t argc = 2;
  napi_value args[2];
  napi_value thisArg;

  napi_get_cb_info(env, info, &argc, args, &thisArg, nullptr);

  if (argc < 1) {
    napi_throw_error(env, nullptr,
                     "extend() requires at least one parameter with method definitions");
    return nullptr;
  }

  // Validate that the first argument is an object
  napi_valuetype argType;
  napi_typeof(env, args[0], &argType);
  if (argType != napi_object) {
    napi_throw_error(env, nullptr, "extend() first parameter must be an object");
    return nullptr;
  }

  // Get the native class from 'this' (the constructor function)
  Class baseNativeClass = nullptr;
  napi_unwrap(env, thisArg, (void**)&baseNativeClass);

  if (baseNativeClass == nullptr) {
    napi_throw_error(env, nullptr, "extend() can only be called on native class constructors");
    return nullptr;
  }

  // Create a unique class name
  napi_value baseClassName;
  napi_get_named_property(env, thisArg, "name", &baseClassName);
  static char baseClassNameBuf[512];
  napi_get_value_string_utf8(env, baseClassName, baseClassNameBuf, 512, nullptr);

  std::string newClassName = baseClassNameBuf;
  newClassName += "_Extended_";
  newClassName += std::to_string(rand());

  // Create the new constructor function that extends the base
  napi_value newConstructor;
  napi_define_class(env, newClassName.c_str(), newClassName.length(), JS_BridgedConstructor,
                    nullptr, 0, nullptr, &newConstructor);

  // Set up JavaScript inheritance from the base class
  napi_inherits(env, newConstructor, thisArg);

  // Get prototype for adding methods
  napi_value newPrototype;
  napi_get_named_property(env, newConstructor, "prototype", &newPrototype);

  // Copy methods and accessors preserving descriptors.
  napi_value global, objectCtor, getOwnPropertyDescriptors, defineProperties;
  napi_get_global(env, &global);
  napi_get_named_property(env, global, "Object", &objectCtor);
  napi_get_named_property(env, objectCtor, "getOwnPropertyDescriptors",
                          &getOwnPropertyDescriptors);
  napi_get_named_property(env, objectCtor, "defineProperties", &defineProperties);

  napi_value descriptors;
  napi_call_function(env, objectCtor, getOwnPropertyDescriptors, 1, args, &descriptors);

  napi_value defineArgs[] = {newPrototype, descriptors};
  napi_call_function(env, objectCtor, defineProperties, 2, defineArgs, nullptr);

  // Handle optional second parameter for protocols
  if (argc >= 2) {
    napi_valuetype secondArgType;
    napi_typeof(env, args[1], &secondArgType);
    if (secondArgType == napi_object) {
      napi_value exposedMethods;
      bool hasExposedMethods = false;
      napi_has_named_property(env, args[1], "exposedMethods", &hasExposedMethods);

      if (hasExposedMethods) {
        napi_get_named_property(env, args[1], "exposedMethods", &exposedMethods);
        napi_set_named_property(env, newConstructor, "ObjCExposedMethods", exposedMethods);
      }

      napi_value protocols;
      bool hasProtocols = false;
      napi_has_named_property(env, args[1], "protocols", &hasProtocols);

      if (hasProtocols) {
        napi_get_named_property(env, args[1], "protocols", &protocols);
        napi_set_named_property(env, newConstructor, "ObjCProtocols", protocols);
      }
    }
  }

  // Use ClassBuilder to create the native class and bridge the methods
  ClassBuilder* builder = new ClassBuilder(env, newConstructor);
  builder->build();

  // Register the builder in the bridge state
  auto bridgeState = ObjCBridgeState::InstanceData(env);
  bridgeState->classesByPointer[builder->nativeClass] = builder;

  return newConstructor;
}

}  // namespace nativescript

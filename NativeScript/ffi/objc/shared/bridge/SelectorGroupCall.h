#pragma once

#include "SelectorGroupState.h"

struct NativeApiResolvedSelectorGroupCall {
  id receiver = nil;
  NativeApiPreparedObjCInvocation* prepared = nullptr;
  std::shared_ptr<NativeApiObjectHostObject> receiverHostObject;
  std::optional<Object> initializerClassWrapper;
  Class dispatchClass = Nil;
  bool hasImmediateResult = false;
  Value immediateResult;
};

template <bool PrepareInitializer, typename ResolveReceiver,
          typename ResolveReceiverHost,
          typename LookupGsdInvoker>
inline NativeApiResolvedSelectorGroupCall resolveNativeApiSelectorGroupCall(
    Runtime& runtime, NativeApiSelectorGroupState& data, size_t argumentCount,
    ResolveReceiver&& resolveReceiver,
    ResolveReceiverHost&& resolveReceiverHost,
    LookupGsdInvoker&& lookupGsdInvoker) {
  if (argumentCount >= data.selectors->size() ||
      (*data.selectors)[argumentCount].selectorName.empty()) {
    throw JSError(
        runtime,
        "Objective-C selector is not available for the provided arguments count.");
  }

  NativeApiResolvedSelectorGroupCall result;
  NativeApiSelectorGroupEntry& entry = (*data.selectors)[argumentCount];
  auto& prepared = (*data.preparedInvocations)[argumentCount];
  Class selectorLookupClass = data.lookupClass;
  result.receiver =
      data.receiverIsClass ? static_cast<id>(data.lookupClass) : nil;
  if (!data.receiverIsClass) {
    result.receiver = data.boundReceiverState != nullptr
                          ? data.boundReceiverState->object()
                          : resolveReceiver();
  }
  if (result.receiver == nil) {
    throw JSError(runtime,
                  "Objective-C selector requires a native receiver.");
  }

  const bool propertyGetterCall =
      entry.hasMember && entry.member.property && argumentCount == 0;
  const std::string* selectorNamePtr = &entry.selectorName;
  const NativeApiMember* selectedMember =
      entry.hasMember ? &entry.member : nullptr;
  bool callTargetCanPrepare = true;
  if (prepared == nullptr || propertyGetterCall) {
    NativeApiSelectorGroupCallTarget callTarget =
        selectorGroupCallTargetForEntry(
            result.receiver, selectorLookupClass, data.receiverIsClass, entry,
            argumentCount);
    selectorNamePtr = callTarget.selectorName;
    selectedMember = callTarget.member;
    callTargetCanPrepare = callTarget.canPrepare;
    if (prepared != nullptr && prepared->selectorName != *selectorNamePtr) {
      prepared = nullptr;
    }
  }
  const std::string& selectorName =
      prepared != nullptr && !propertyGetterCall ? prepared->selectorName
                                                 : *selectorNamePtr;

  if (data.receiverIsClass) {
    Class methodClass = prepared != nullptr ? prepared->receiverClass : Nil;
    if (methodClass == Nil) {
      SEL selector = sel_registerName(selectorName.c_str());
      methodClass = NativeApiClassHostObject::classRespondingToClassSelector(
          data.lookupClass, selector);
    }
    if (methodClass == Nil) {
      throw JSError(runtime,
                    "Objective-C selector is not available: " +
                        entry.selectorName);
    }
    selectorLookupClass = methodClass;
    result.receiver = static_cast<id>(methodClass);
  }
  if (propertyGetterCall && !callTargetCanPrepare) {
    result.immediateResult =
        callObjCSelector(runtime, data.bridge, result.receiver,
                         data.receiverIsClass, selectorName, selectedMember,
                         nullptr, 0);
    result.hasImmediateResult = true;
    return result;
  }

  if (prepared == nullptr) {
    if (!data.receiverIsClass) {
      SEL selector = sel_registerName(selectorName.c_str());
      if (class_getInstanceMethod(selectorLookupClass, selector) == nullptr) {
        Class receiverClass = object_getClass(result.receiver);
        if (class_getInstanceMethod(receiverClass, selector) != nullptr) {
          selectorLookupClass = receiverClass;
        }
      }
    }
    prepared = prepareNativeApiObjCInvocation(
        runtime, data.bridge, selectorLookupClass, data.receiverIsClass,
        selectorName, selectedMember);
    if (prepared->engineInvoker == nullptr) {
      uint64_t dispatchId = dispatchIdForEngineSignature(
          prepared->signature, SignatureCallKind::ObjCMethod);
      if (auto gsdInvoker = lookupGsdInvoker(dispatchId)) {
        prepared->engineInvoker = reinterpret_cast<void*>(gsdInvoker);
        configureGeneratedEngineObjCInvocation(*prepared);
      }
    }
  }
  result.prepared = prepared.get();

  if constexpr (PrepareInitializer) {
    if (!data.receiverIsClass && prepared->isInitMethod) {
      if (data.boundReceiverState != nullptr) {
        result.receiverHostObject = data.boundReceiver.lock();
      }
      if (!result.receiverHostObject) {
        result.receiverHostObject = resolveReceiverHost();
      }
      Value classWrapperValue = data.bridge->findObjectExpando(
          runtime, result.receiver, "__nativeApiClassWrapper");
      if (classWrapperValue.isObject()) {
        result.initializerClassWrapper.emplace(
            classWrapperValue.asObject(runtime));
      }
      data.bridge->forgetRoundTripValue(result.receiver);
      data.bridge->forgetObjectExpandos(result.receiver);
    }
  }

  if (!data.receiverIsClass) {
    Class receiverClass = object_getClass(result.receiver);
    if (receiverClass == data.cachedReceiverClass) {
      result.dispatchClass = data.cachedDispatchClass;
    } else {
      result.dispatchClass = dispatchSuperclassForEngineDerivedReceiver(
          result.receiver, data.lookupClass);
      data.cachedReceiverClass = receiverClass;
      data.cachedDispatchClass = result.dispatchClass;
    }
  }
  return result;
}

Function CreateNativeApiSelectorGroupFunctionImpl(
    Runtime& runtime, std::shared_ptr<NativeApiBridge> bridge,
    Class lookupClass, bool receiverIsClass,
    std::shared_ptr<std::vector<NativeApiSelectorGroupEntry>> selectors,
    std::shared_ptr<
        std::vector<std::shared_ptr<NativeApiPreparedObjCInvocation>>>
        preparedInvocations,
    std::weak_ptr<NativeApiObjectHostObject> boundReceiver,
    std::shared_ptr<NativeApiObjectLifetimeState> boundReceiverState);

inline Function CreateNativeApiSelectorGroupFunction(
    Runtime& runtime, std::shared_ptr<NativeApiBridge> bridge,
    Class lookupClass, bool receiverIsClass,
    std::shared_ptr<std::vector<NativeApiSelectorGroupEntry>> selectors,
    std::shared_ptr<
        std::vector<std::shared_ptr<NativeApiPreparedObjCInvocation>>>
        preparedInvocations) {
  return CreateNativeApiSelectorGroupFunctionImpl(
      runtime, std::move(bridge), lookupClass, receiverIsClass,
      std::move(selectors), std::move(preparedInvocations), {}, nullptr);
}

inline Function CreateNativeApiBoundSelectorGroupFunction(
    Runtime& runtime, std::shared_ptr<NativeApiBridge> bridge,
    Class lookupClass,
    std::shared_ptr<NativeApiObjectHostObject> receiverHostObject,
    std::shared_ptr<std::vector<NativeApiSelectorGroupEntry>> selectors,
    std::shared_ptr<
        std::vector<std::shared_ptr<NativeApiPreparedObjCInvocation>>>
        preparedInvocations) {
  return CreateNativeApiSelectorGroupFunctionImpl(
      runtime, std::move(bridge), lookupClass, false, std::move(selectors),
      std::move(preparedInvocations), receiverHostObject,
      receiverHostObject != nullptr ? receiverHostObject->lifetimeState()
                                    : nullptr);
}

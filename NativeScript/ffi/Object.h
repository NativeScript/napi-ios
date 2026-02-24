#ifndef OBJECT_H
#define OBJECT_H

#include "ObjCBridge.h"

namespace nativescript {

void initProxyFactory(napi_env env, ObjCBridgeState* bridgeState);
void attachObjectLifecycleAssociation(napi_env env, id object);

}  // namespace nativescript

#endif /* OBJECT_H */

/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const PKPushTypeFileProvider: string;

declare interface PKPushRegistryDelegate extends NSObjectProtocol {
  pushRegistryDidUpdatePushCredentialsForType(registry: PKPushRegistry, pushCredentials: PKPushCredentials, type: string): void;

  pushRegistryDidReceiveIncomingPushWithPayloadForTypeWithCompletionHandler?(registry: PKPushRegistry, payload: PKPushPayload, type: string, completion: () => void): void;

  pushRegistryDidInvalidatePushTokenForType?(registry: PKPushRegistry, type: string): void;
}

declare class PKPushRegistryDelegate extends NativeObject implements PKPushRegistryDelegate {
}

declare class PKPushRegistry extends NSObject {
  delegate: PKPushRegistryDelegate;

  desiredPushTypes: NSSet;

  pushTokenForType(type: string): NSData;

  initWithQueue(queue: NSObject | null): this;

  setDelegate(delegate: PKPushRegistryDelegate | null): void;

  setDesiredPushTypes(desiredPushTypes: NSSet | null): void;
}

declare class PKPushPayload extends NSObject {
  readonly type: string;

  readonly dictionaryPayload: NSDictionary;
}

declare class PKPushCredentials extends NSObject {
  readonly type: string;

  readonly token: NSData;
}


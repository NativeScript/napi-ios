/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const EAConnectionIDNone: number;

declare const EAAccessoryKey: string;

declare const EAAccessoryDidConnectNotification: string;

declare const EABluetoothAccessoryPickerErrorDomain: string;

declare const EAAccessoryDidDisconnectNotification: string;

declare const EABluetoothAccessoryPickerErrorCode: {
  AlreadyConnected: 0,
  ResultNotFound: 1,
  ResultCancelled: 2,
  ResultFailed: 3,
};

declare const EAWiFiUnconfiguredAccessoryConfigurationStatus: {
  Success: 0,
  UserCancelledConfiguration: 1,
  Failed: 2,
};

declare const EAWiFiUnconfiguredAccessoryProperties: {
  AirPlay: 1,
  AirPrint: 2,
  HomeKit: 4,
};

declare const EAWiFiUnconfiguredAccessoryBrowserState: {
  WiFiUnavailable: 0,
  Stopped: 1,
  Searching: 2,
  Configuring: 3,
};

declare interface EAAccessoryDelegate extends NSObjectProtocol {
  accessoryDidDisconnect?(accessory: EAAccessory): void;
}

declare class EAAccessoryDelegate extends NativeObject implements EAAccessoryDelegate {
}

declare interface EAWiFiUnconfiguredAccessoryBrowserDelegate extends NSObjectProtocol {
}

declare class EAWiFiUnconfiguredAccessoryBrowserDelegate extends NativeObject implements EAWiFiUnconfiguredAccessoryBrowserDelegate {
}

declare class EASession extends NSObject {
  initWithAccessoryForProtocol(accessory: EAAccessory, protocolString: string): this;

  readonly accessory: EAAccessory;

  readonly protocolString: string;

  readonly inputStream: NSInputStream;

  readonly outputStream: NSOutputStream;
}

declare class EAAccessory extends NSObject {
  readonly connected: boolean;

  readonly connectionID: number;

  readonly manufacturer: string;

  readonly name: string;

  readonly modelNumber: string;

  readonly serialNumber: string;

  readonly firmwareRevision: string;

  readonly hardwareRevision: string;

  readonly dockType: string;

  readonly protocolStrings: NSArray;

  delegate: EAAccessoryDelegate;

  isConnected(): boolean;

  setDelegate(delegate: EAAccessoryDelegate): void;
}

declare class EAAccessoryManager extends NSObject {
  static sharedAccessoryManager(): EAAccessoryManager;

  registerForLocalNotifications(): void;

  unregisterForLocalNotifications(): void;

  readonly connectedAccessories: NSArray;
}


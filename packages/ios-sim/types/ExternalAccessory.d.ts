/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const EAAccessoryKey: string;

declare const EAAccessoryDidConnectNotification: string;

declare const EABluetoothAccessoryPickerErrorDomain: string;

declare const EAAccessoryDidDisconnectNotification: string;

declare const EAAccessorySelectedKey: string;

declare const EAConnectionIDNone: number;

declare const EAWiFiUnconfiguredAccessoryProperties: {
  AirPlay: 1,
  AirPrint: 2,
  HomeKit: 4,
};

declare const EAWiFiUnconfiguredAccessoryConfigurationStatus: {
  Success: 0,
  UserCancelledConfiguration: 1,
  Failed: 2,
};

declare const EAWiFiUnconfiguredAccessoryBrowserState: {
  WiFiUnavailable: 0,
  Stopped: 1,
  Searching: 2,
  Configuring: 3,
};

declare const EABluetoothAccessoryPickerErrorCode: {
  AlreadyConnected: 0,
  ResultNotFound: 1,
  ResultCancelled: 2,
  ResultFailed: 3,
};

declare interface EAAccessoryDelegate extends NSObjectProtocol {
  accessoryDidDisconnect?(accessory: EAAccessory): void;
}

declare class EAAccessoryDelegate extends NativeObject implements EAAccessoryDelegate {
}

declare interface EAWiFiUnconfiguredAccessoryBrowserDelegate extends NSObjectProtocol {
  accessoryBrowserDidUpdateState(browser: EAWiFiUnconfiguredAccessoryBrowser, state: interop.Enum<typeof EAWiFiUnconfiguredAccessoryBrowserState>): void;

  accessoryBrowserDidFindUnconfiguredAccessories(browser: EAWiFiUnconfiguredAccessoryBrowser, accessories: NSSet): void;

  accessoryBrowserDidRemoveUnconfiguredAccessories(browser: EAWiFiUnconfiguredAccessoryBrowser, accessories: NSSet): void;

  accessoryBrowserDidFinishConfiguringAccessoryWithStatus(browser: EAWiFiUnconfiguredAccessoryBrowser, accessory: EAWiFiUnconfiguredAccessory, status: interop.Enum<typeof EAWiFiUnconfiguredAccessoryConfigurationStatus>): void;
}

declare class EAWiFiUnconfiguredAccessoryBrowserDelegate extends NativeObject implements EAWiFiUnconfiguredAccessoryBrowserDelegate {
}

declare class EAWiFiUnconfiguredAccessoryBrowser extends NSObject {
  delegate: EAWiFiUnconfiguredAccessoryBrowserDelegate;

  readonly unconfiguredAccessories: NSSet;

  initWithDelegateQueue(delegate: EAWiFiUnconfiguredAccessoryBrowserDelegate | null, queue: NSObject | null): this;

  startSearchingForUnconfiguredAccessoriesMatchingPredicate(predicate: NSPredicate | null): void;

  stopSearchingForUnconfiguredAccessories(): void;

  configureAccessoryWithConfigurationUIOnViewController(accessory: EAWiFiUnconfiguredAccessory, viewController: UIViewController): void;

  setDelegate(delegate: EAWiFiUnconfiguredAccessoryBrowserDelegate | null): void;
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

  showBluetoothAccessoryPickerWithNameFilterCompletion(predicate: NSPredicate | null, completion: (p1: NSError) => void | null): void;

  registerForLocalNotifications(): void;

  unregisterForLocalNotifications(): void;

  readonly connectedAccessories: NSArray;
}

declare class EAWiFiUnconfiguredAccessory extends NSObject {
  readonly name: string;

  readonly manufacturer: string;

  readonly model: string;

  readonly ssid: string;

  readonly macAddress: string;

  readonly properties: interop.Enum<typeof EAWiFiUnconfiguredAccessoryProperties>;
}


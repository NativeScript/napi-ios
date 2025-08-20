/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const ASPickerDisplaySettingsDiscoveryTimeoutLong: number;

declare const ASPickerDisplaySettingsDiscoveryTimeoutMedium: number;

declare const ASErrorDomain: string;

declare const ASPickerDisplaySettingsDiscoveryTimeoutShort: number;

declare const ASPickerDisplayItemSetupOptions: {
  Rename: 1,
  ConfirmAuthorization: 2,
  FinishInApp: 4,
};

declare const ASAccessoryRenameOptions: {
  ASAccessoryRenameSSID: 1,
};

declare const ASAccessorySupportOptions: {
  PairingLE: 2,
  TransportBridging: 4,
  HID: 8,
};

declare const ASAccessoryState: {
  Unauthorized: 0,
  AwaitingAuthorization: 10,
  Authorized: 20,
};

declare const ASErrorCode: {
  Success: 0,
  Unknown: 1,
  ActivationFailed: 100,
  ConnectionFailed: 150,
  DiscoveryTimeout: 200,
  ExtensionNotFound: 300,
  Invalidated: 400,
  InvalidRequest: 450,
  PickerAlreadyActive: 500,
  PickerRestricted: 550,
  UserCancelled: 700,
  UserRestricted: 750,
};

declare const ASAccessoryEventType: {
  Unknown: 0,
  Activated: 10,
  Invalidated: 11,
  MigrationComplete: 20,
  AccessoryAdded: 30,
  AccessoryRemoved: 31,
  AccessoryChanged: 32,
  PickerDidPresent: 40,
  PickerDidDismiss: 50,
  PickerSetupBridging: 60,
  PickerSetupFailed: 70,
  PickerSetupPairing: 80,
  PickerSetupRename: 90,
};

declare const ASDiscoveryDescriptorRange: {
  Default: 0,
  Immediate: 10,
};

declare const ASDiscoveryDescriptorWiFiAwareServiceRole: {
  Subscriber: 10,
  Publisher: 20,
};

declare class ASPickerDisplaySettings extends NSObject {
  static readonly defaultSettings: ASPickerDisplaySettings;

  discoveryTimeout: number;

  setDiscoveryTimeout(discoveryTimeout: number): void;
}

declare class ASMigrationDisplayItem extends ASPickerDisplayItem {
  peripheralIdentifier: NSUUID;

  hotspotSSID: string;

  setPeripheralIdentifier(peripheralIdentifier: NSUUID | null): void;

  setHotspotSSID(hotspotSSID: string | null): void;
}

declare class ASAccessoryEvent extends NSObject {
  readonly eventType: interop.Enum<typeof ASAccessoryEventType>;

  readonly accessory: ASAccessory;

  readonly error: NSError;
}

declare class ASPropertyCompareString extends NSObject {
  readonly string: string;

  readonly compareOptions: interop.Enum<typeof NSStringCompareOptions>;

  initWithStringCompareOptions(string: string, compareOptions: interop.Enum<typeof NSStringCompareOptions>): this;
}

declare class ASDiscoveryDescriptor extends NSObject {
  supportedOptions: interop.Enum<typeof ASAccessorySupportOptions>;

  bluetoothCompanyIdentifier: number;

  bluetoothManufacturerDataBlob: NSData;

  bluetoothManufacturerDataMask: NSData;

  bluetoothNameSubstringCompareOptions: interop.Enum<typeof NSStringCompareOptions>;

  bluetoothNameSubstring: string;

  bluetoothRange: interop.Enum<typeof ASDiscoveryDescriptorRange>;

  bluetoothServiceDataBlob: NSData;

  bluetoothServiceDataMask: NSData;

  bluetoothServiceUUID: CBUUID;

  SSID: string;

  SSIDPrefix: string;

  wifiAwareServiceName: string;

  wifiAwareServiceRole: interop.Enum<typeof ASDiscoveryDescriptorWiFiAwareServiceRole>;

  wifiAwareModelNameMatch: ASPropertyCompareString;

  wifiAwareVendorNameMatch: ASPropertyCompareString;

  setSupportedOptions(supportedOptions: interop.Enum<typeof ASAccessorySupportOptions>): void;

  setBluetoothCompanyIdentifier(bluetoothCompanyIdentifier: number): void;

  setBluetoothManufacturerDataBlob(bluetoothManufacturerDataBlob: NSData | null): void;

  setBluetoothManufacturerDataMask(bluetoothManufacturerDataMask: NSData | null): void;

  setBluetoothNameSubstringCompareOptions(bluetoothNameSubstringCompareOptions: interop.Enum<typeof NSStringCompareOptions>): void;

  setBluetoothNameSubstring(bluetoothNameSubstring: string | null): void;

  setBluetoothRange(bluetoothRange: interop.Enum<typeof ASDiscoveryDescriptorRange>): void;

  setBluetoothServiceDataBlob(bluetoothServiceDataBlob: NSData | null): void;

  setBluetoothServiceDataMask(bluetoothServiceDataMask: NSData | null): void;

  setBluetoothServiceUUID(bluetoothServiceUUID: CBUUID | null): void;

  setSSID(SSID: string | null): void;

  setSSIDPrefix(SSIDPrefix: string | null): void;

  setWifiAwareServiceName(wifiAwareServiceName: string): void;

  setWifiAwareServiceRole(wifiAwareServiceRole: interop.Enum<typeof ASDiscoveryDescriptorWiFiAwareServiceRole>): void;

  setWifiAwareModelNameMatch(wifiAwareModelNameMatch: ASPropertyCompareString): void;

  setWifiAwareVendorNameMatch(wifiAwareVendorNameMatch: ASPropertyCompareString): void;
}

declare class ASAccessory extends NSObject {
  readonly state: interop.Enum<typeof ASAccessoryState>;

  readonly bluetoothIdentifier: NSUUID;

  readonly bluetoothTransportBridgingIdentifier: NSData;

  readonly displayName: string;

  readonly SSID: string;

  readonly wifiAwarePairedDeviceID: number;

  readonly descriptor: ASDiscoveryDescriptor;
}

declare class ASPickerDisplayItem extends NSObject {
  readonly name: string;

  readonly productImage: UIImage;

  readonly descriptor: ASDiscoveryDescriptor;

  renameOptions: interop.Enum<typeof ASAccessoryRenameOptions>;

  setupOptions: interop.Enum<typeof ASPickerDisplayItemSetupOptions>;

  initWithNameProductImageDescriptor(name: string, productImage: UIImage, descriptor: ASDiscoveryDescriptor): this;

  setRenameOptions(renameOptions: interop.Enum<typeof ASAccessoryRenameOptions>): void;

  setSetupOptions(setupOptions: interop.Enum<typeof ASPickerDisplayItemSetupOptions>): void;
}

declare class ASAccessorySettings extends NSObject {
  static readonly defaultSettings: ASAccessorySettings;

  SSID: string;

  bluetoothTransportBridgingIdentifier: NSData;

  setSSID(SSID: string | null): void;

  setBluetoothTransportBridgingIdentifier(bluetoothTransportBridgingIdentifier: NSData | null): void;
}

declare class ASAccessorySession extends NSObject {
  readonly accessories: NSArray;

  pickerDisplaySettings: ASPickerDisplaySettings;

  activateWithQueueEventHandler(queue: NSObject, eventHandler: (p1: ASAccessoryEvent) => void): void;

  invalidate(): void;

  showPickerWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  showPickerForDisplayItemsCompletionHandler(displayItems: NSArray<interop.Object> | Array<interop.Object>, completionHandler: (p1: NSError) => void | null): void;

  finishAuthorizationSettingsCompletionHandler(accessory: ASAccessory, settings: ASAccessorySettings, completionHandler: (p1: NSError) => void | null): void;

  failAuthorizationCompletionHandler(accessory: ASAccessory, completionHandler: (p1: NSError) => void | null): void;

  removeAccessoryCompletionHandler(accessory: ASAccessory, completionHandler: (p1: NSError) => void | null): void;

  renameAccessoryOptionsCompletionHandler(accessory: ASAccessory, renameOptions: interop.Enum<typeof ASAccessoryRenameOptions>, completionHandler: (p1: NSError) => void | null): void;

  updateAuthorizationDescriptorCompletionHandler(accessory: ASAccessory, descriptor: ASDiscoveryDescriptor, completionHandler: (p1: NSError) => void | null): void;

  setPickerDisplaySettings(pickerDisplaySettings: ASPickerDisplaySettings): void;
}


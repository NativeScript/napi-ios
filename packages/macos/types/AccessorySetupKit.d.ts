/// <reference types="@nativescript/objc-node-api" />

declare const ASErrorDomain: string;

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

declare const ASAccessoryState: {
  Unauthorized: 0,
  AwaitingAuthorization: 10,
  Authorized: 20,
};

declare const ASDiscoveryDescriptorRange: {
  Default: 0,
  Immediate: 10,
};


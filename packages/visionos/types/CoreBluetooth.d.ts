/// <reference types="@nativescript/objc-node-api" />

declare const CBUUIDCharacteristicObservationScheduleString: string;

declare const CBUUIDCharacteristicAggregateFormatString: string;

declare const CBUUIDCharacteristicUserDescriptionString: string;

declare const CBATTErrorDomain: string;

declare const CBConnectPeripheralOptionNotifyOnDisconnectionKey: string;

declare const CBCentralManagerScanOptionAllowDuplicatesKey: string;

declare const CBAdvertisementDataManufacturerDataKey: string;

declare const CBAdvertisementDataServiceDataKey: string;

declare const CBUUIDClientCharacteristicConfigurationString: string;

declare const CBUUIDCharacteristicExtendedPropertiesString: string;

declare const CBUUIDServerCharacteristicConfigurationString: string;

declare const CBUUIDCharacteristicFormatString: string;

declare const CBAdvertisementDataLocalNameKey: string;

declare const CBErrorDomain: string;

declare const CBAdvertisementDataServiceUUIDsKey: string;

declare const CBAdvertisementDataTxPowerLevelKey: string;

declare const CBUUIDCharacteristicValidRangeString: string;

declare const CBATTError: {
  InvalidHandle: 1,
  ReadNotPermitted: 2,
  WriteNotPermitted: 3,
  InvalidPdu: 4,
  InsufficientAuthentication: 5,
  RequestNotSupported: 6,
  InvalidOffset: 7,
  InsufficientAuthorization: 8,
  PrepareQueueFull: 9,
  AttributeNotFound: 10,
  AttributeNotLong: 11,
  InsufficientEncryptionKeySize: 12,
  InvalidAttributeValueLength: 13,
  UnlikelyError: 14,
  InsufficientEncryption: 15,
  UnsupportedGroupType: 16,
  InsufficientResources: 17,
};

declare const CBConnectionEvent: {
  Disconnected: 0,
  Connected: 1,
};

declare const CBError: {
  CBErrorUnknown: 0,
};

declare const CBCharacteristicProperties: {
  Broadcast: 1,
  Read: 2,
  WriteWithoutResponse: 4,
  Write: 8,
  Notify: 16,
  Indicate: 32,
  AuthenticatedSignedWrites: 64,
  ExtendedProperties: 128,
};

declare const CBCharacteristicWriteType: {
  With: 0,
  Without: 1,
};

declare interface CBCentralManagerDelegate extends NSObject {
  centralManagerDidUpdateState(central: interop.Object): void;

  centralManagerWillRestoreState?(central: interop.Object, dict: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  centralManagerDidDiscoverPeripheralAdvertisementDataRSSI?(central: interop.Object, peripheral: interop.Object, advertisementData: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, RSSI: NSNumber): void;

  centralManagerDidConnectPeripheral?(central: interop.Object, peripheral: interop.Object): void;

  centralManagerDidFailToConnectPeripheralError?(central: interop.Object, peripheral: interop.Object, error: NSError | null): void;

  centralManagerDidDisconnectPeripheralError?(central: interop.Object, peripheral: interop.Object, error: NSError | null): void;

  centralManagerDidDisconnectPeripheralTimestampIsReconnectingError?(central: interop.Object, peripheral: interop.Object, timestamp: number, isReconnecting: boolean, error: NSError | null): void;
}

declare class CBCentralManagerDelegate extends NativeObject implements CBCentralManagerDelegate {
}

declare interface CBPeripheralManagerDelegate extends NSObject {
  peripheralManagerDidUpdateState(peripheral: interop.Object): void;

  peripheralManagerWillRestoreState?(peripheral: interop.Object, dict: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  peripheralManagerDidStartAdvertisingError?(peripheral: interop.Object, error: NSError | null): void;

  peripheralManagerDidAddServiceError?(peripheral: interop.Object, service: interop.Object, error: NSError | null): void;

  peripheralManagerCentralDidSubscribeToCharacteristic?(peripheral: interop.Object, central: interop.Object, characteristic: interop.Object): void;

  peripheralManagerCentralDidUnsubscribeFromCharacteristic?(peripheral: interop.Object, central: interop.Object, characteristic: interop.Object): void;

  peripheralManagerDidReceiveReadRequest?(peripheral: interop.Object, request: interop.Object): void;

  peripheralManagerDidReceiveWriteRequests?(peripheral: interop.Object, requests: NSArray<interop.Object> | Array<interop.Object>): void;

  peripheralManagerIsReadyToUpdateSubscribers?(peripheral: interop.Object): void;

  peripheralManagerDidPublishL2CAPChannelError?(peripheral: interop.Object, PSM: number, error: NSError | null): void;

  peripheralManagerDidUnpublishL2CAPChannelError?(peripheral: interop.Object, PSM: number, error: NSError | null): void;

  peripheralManagerDidOpenL2CAPChannelError?(peripheral: interop.Object, channel: interop.Object | null, error: NSError | null): void;
}

declare class CBPeripheralManagerDelegate extends NativeObject implements CBPeripheralManagerDelegate {
}

declare interface CBPeripheralDelegate extends NSObject {
  peripheralDidDiscoverServices?(peripheral: interop.Object, error: NSError | null): void;

  peripheralDidDiscoverIncludedServicesForServiceError?(peripheral: interop.Object, service: interop.Object, error: NSError | null): void;

  peripheralDidDiscoverCharacteristicsForServiceError?(peripheral: interop.Object, service: interop.Object, error: NSError | null): void;

  peripheralDidUpdateValueForCharacteristicError?(peripheral: interop.Object, characteristic: interop.Object, error: NSError | null): void;

  peripheralDidWriteValueForCharacteristicError?(peripheral: interop.Object, characteristic: interop.Object, error: NSError | null): void;

  peripheralDidUpdateNotificationStateForCharacteristicError?(peripheral: interop.Object, characteristic: interop.Object, error: NSError | null): void;

  peripheralDidDiscoverDescriptorsForCharacteristicError?(peripheral: interop.Object, characteristic: interop.Object, error: NSError | null): void;

  peripheralDidUpdateValueForDescriptorError?(peripheral: interop.Object, descriptor: interop.Object, error: NSError | null): void;

  peripheralDidWriteValueForDescriptorError?(peripheral: interop.Object, descriptor: interop.Object, error: NSError | null): void;

  peripheralIsReadyToSendWriteWithoutResponse?(peripheral: interop.Object): void;

  peripheralDidOpenL2CAPChannelError?(peripheral: interop.Object, channel: interop.Object | null, error: NSError | null): void;
}

declare class CBPeripheralDelegate extends NativeObject implements CBPeripheralDelegate {
}


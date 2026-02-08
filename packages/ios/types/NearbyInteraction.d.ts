/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const NINearbyObjectWorldTransformNotAvailable: simd_float4x4;

declare const NIAlgorithmConvergenceStatusReasonInsufficientLighting: string;

declare const NIAlgorithmConvergenceStatusReasonInsufficientMovement: string;

declare const NIAlgorithmConvergenceStatusReasonInsufficientHorizontalSweep: string;

declare const NIErrorDomain: string;

declare const NINearbyObjectDistanceNotAvailable: number;

declare const NINearbyObjectAngleNotAvailable: number;

declare const NIAlgorithmConvergenceStatusReasonInsufficientVerticalSweep: string;

declare const NINearbyObjectDirectionNotAvailable: unknown /* ext vector */;

declare const NIAlgorithmConvergenceStatus: {
  Unknown: 0,
  NotConverged: 1,
  Converged: 2,
};

declare const NINearbyObjectRemovalReason: {
  Timeout: 0,
  PeerEnded: 1,
};

declare const NIDLTDOACoordinatesType: {
  Geodetic: 0,
  Relative: 1,
};

declare const NIDLTDOAMeasurementType: {
  Poll: 0,
  Response: 1,
  Final: 2,
};

declare const NINearbyObjectVerticalDirectionEstimate: {
  Unknown: 0,
  Same: 1,
  Above: 2,
  Below: 3,
  AboveOrBelow: 4,
};

declare const NIErrorCode: {
  UnsupportedPlatform: -5889,
  InvalidConfiguration: -5888,
  SessionFailed: -5887,
  ResourceUsageTimeout: -5886,
  ActiveSessionsLimitExceeded: -5885,
  UserDidNotAllow: -5884,
  InvalidARConfiguration: -5883,
  AccessoryPeerDeviceUnavailable: -5882,
  IncompatiblePeerDevice: -5881,
  ActiveExtendedDistanceSessionsLimitExceeded: -5880,
};

declare function NIAlgorithmConvergenceStatusReasonDescription(reason: string): string;

declare interface NISessionDelegate extends NSObjectProtocol {
  sessionDidUpdateNearbyObjects?(session: NISession, nearbyObjects: NSArray<interop.Object> | Array<interop.Object>): void;

  sessionDidRemoveNearbyObjectsWithReason?(session: NISession, nearbyObjects: NSArray<interop.Object> | Array<interop.Object>, reason: interop.Enum<typeof NINearbyObjectRemovalReason>): void;

  sessionWasSuspended?(session: NISession): void;

  sessionSuspensionEnded?(session: NISession): void;

  sessionDidInvalidateWithError?(session: NISession, error: NSError): void;

  sessionDidGenerateShareableConfigurationDataForObject?(session: NISession, shareableConfigurationData: NSData, object: NINearbyObject): void;

  sessionDidUpdateAlgorithmConvergenceForObject?(session: NISession, convergence: NIAlgorithmConvergence, object: NINearbyObject | null): void;

  sessionDidUpdateDLTDOAMeasurements?(session: NISession, measurements: NSArray<interop.Object> | Array<interop.Object>): void;

  sessionDidStartRunning?(session: NISession): void;
}

declare class NISessionDelegate extends NativeObject implements NISessionDelegate {
}

declare interface NIDeviceCapability {
  readonly supportsPreciseDistanceMeasurement: boolean;

  readonly supportsDirectionMeasurement: boolean;

  readonly supportsCameraAssistance: boolean;

  readonly supportsExtendedDistanceMeasurement: boolean;

  readonly supportsDLTDOAMeasurement: boolean;
}

declare class NIDeviceCapability extends NativeObject implements NIDeviceCapability {
}

declare class NIAlgorithmConvergence extends NSObject implements NSCopying, NSSecureCoding {
  readonly status: interop.Enum<typeof NIAlgorithmConvergenceStatus>;

  readonly reasons: NSArray;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class NISession extends NSObject {
  static readonly supported: boolean;

  static readonly deviceCapabilities: NIDeviceCapability;

  delegate: NISessionDelegate;

  delegateQueue: NSObject;

  readonly discoveryToken: NIDiscoveryToken;

  readonly configuration: NIConfiguration;

  runWithConfiguration(configuration: NIConfiguration): void;

  pause(): void;

  invalidate(): void;

  setARSession(session: ARSession): void;

  worldTransformForObject(object: NINearbyObject): simd_float4x4;

  static isSupported(): boolean;

  setDelegate(delegate: NISessionDelegate | null): void;

  setDelegateQueue(delegateQueue: NSObject | null): void;
}

declare class NIDLTDOAMeasurement extends NSObject implements NSCopying, NSSecureCoding {
  readonly address: number;

  readonly measurementType: interop.Enum<typeof NIDLTDOAMeasurementType>;

  readonly transmitTime: number;

  readonly receiveTime: number;

  readonly signalStrength: number;

  readonly carrierFrequencyOffset: number;

  readonly coordinatesType: interop.Enum<typeof NIDLTDOACoordinatesType>;

  readonly coordinates: unknown /* ext vector */;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class NINearbyObject extends NSObject implements NSCopying, NSSecureCoding {
  readonly discoveryToken: NIDiscoveryToken;

  readonly distance: number;

  readonly direction: unknown /* ext vector */;

  readonly verticalDirectionEstimate: interop.Enum<typeof NINearbyObjectVerticalDirectionEstimate>;

  readonly horizontalAngle: number;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class NIDLTDOAConfiguration extends NIConfiguration {
  networkIdentifier: number;

  initWithNetworkIdentifier(networkIdentifier: number): this;

  setNetworkIdentifier(networkIdentifier: number): void;
}

declare class NINearbyAccessoryConfiguration extends NIConfiguration {
  readonly accessoryDiscoveryToken: NIDiscoveryToken;

  cameraAssistanceEnabled: boolean;

  initWithDataError(data: NSData, error: interop.PointerConvertible): this;

  initWithAccessoryDataBluetoothPeerIdentifierError(accessoryData: NSData, identifier: NSUUID, error: interop.PointerConvertible): this;

  isCameraAssistanceEnabled(): boolean;

  setCameraAssistanceEnabled(cameraAssistanceEnabled: boolean): void;
}

declare class NINearbyPeerConfiguration extends NIConfiguration {
  readonly peerDiscoveryToken: NIDiscoveryToken;

  initWithPeerToken(peerToken: NIDiscoveryToken): this;

  cameraAssistanceEnabled: boolean;

  extendedDistanceMeasurementEnabled: boolean;

  isCameraAssistanceEnabled(): boolean;

  setCameraAssistanceEnabled(cameraAssistanceEnabled: boolean): void;

  isExtendedDistanceMeasurementEnabled(): boolean;

  setExtendedDistanceMeasurementEnabled(extendedDistanceMeasurementEnabled: boolean): void;
}

declare class NIConfiguration extends NSObject implements NSCopying, NSSecureCoding {
  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class NIDiscoveryToken extends NSObject implements NSCopying, NSSecureCoding {
  readonly deviceCapabilities: NIDeviceCapability;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}


/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const PTChannelErrorDomain: string;

declare const PTInstantiationErrorDomain: string;

declare const PTChannelError: {
  Unknown: 0,
  ChannelNotFound: 1,
  ChannelLimitReached: 2,
  CallActive: 3,
  TransmissionInProgress: 4,
  TransmissionNotFound: 5,
  AppNotForeground: 6,
  DeviceManagementRestriction: 7,
  ScreenTimeRestriction: 8,
  TransmissionNotAllowed: 9,
};

declare const PTInstantiationError: {
  Unknown: 0,
  InvalidPlatform: 1,
  MissingBackgroundMode: 2,
  MissingPushServerEnvironment: 3,
  MissingEntitlement: 4,
  InstantiationAlreadyInProgress: 5,
};

declare const PTServiceStatus: {
  Ready: 0,
  Connecting: 1,
  Unavailable: 2,
};

declare const PTChannelLeaveReason: {
  Unknown: 0,
  UserRequest: 1,
  DeveloperRequest: 2,
  SystemPolicy: 3,
};

declare const PTChannelJoinReason: {
  DeveloperRequest: 0,
  ChannelRestoration: 1,
};

declare const PTChannelTransmitRequestSource: {
  Unknown: 0,
  UserRequest: 1,
  DeveloperRequest: 2,
  HandsfreeButton: 3,
};

declare const PTTransmissionMode: {
  FullDuplex: 0,
  HalfDuplex: 1,
  ListenOnly: 2,
};

declare interface PTChannelRestorationDelegate extends NSObjectProtocol {
  channelDescriptorForRestoredChannelUUID(channelUUID: NSUUID): PTChannelDescriptor;
}

declare class PTChannelRestorationDelegate extends NativeObject implements PTChannelRestorationDelegate {
}

declare interface PTChannelManagerDelegate extends NSObjectProtocol {
  channelManagerDidJoinChannelWithUUIDReason(channelManager: PTChannelManager, channelUUID: NSUUID, reason: interop.Enum<typeof PTChannelJoinReason>): void;

  channelManagerDidLeaveChannelWithUUIDReason(channelManager: PTChannelManager, channelUUID: NSUUID, reason: interop.Enum<typeof PTChannelLeaveReason>): void;

  channelManagerChannelUUIDDidBeginTransmittingFromSource(channelManager: PTChannelManager, channelUUID: NSUUID, source: interop.Enum<typeof PTChannelTransmitRequestSource>): void;

  channelManagerChannelUUIDDidEndTransmittingFromSource(channelManager: PTChannelManager, channelUUID: NSUUID, source: interop.Enum<typeof PTChannelTransmitRequestSource>): void;

  channelManagerReceivedEphemeralPushToken(channelManager: PTChannelManager, pushToken: NSData): void;

  incomingPushResultForChannelManagerChannelUUIDPushPayload(channelManager: PTChannelManager, channelUUID: NSUUID, pushPayload: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): PTPushResult;

  channelManagerDidActivateAudioSession(channelManager: PTChannelManager, audioSession: AVAudioSession): void;

  channelManagerDidDeactivateAudioSession(channelManager: PTChannelManager, audioSession: AVAudioSession): void;

  channelManagerFailedToJoinChannelWithUUIDError?(channelManager: PTChannelManager, channelUUID: NSUUID, error: NSError): void;

  channelManagerFailedToLeaveChannelWithUUIDError?(channelManager: PTChannelManager, channelUUID: NSUUID, error: NSError): void;

  channelManagerFailedToBeginTransmittingInChannelWithUUIDError?(channelManager: PTChannelManager, channelUUID: NSUUID, error: NSError): void;

  channelManagerFailedToStopTransmittingInChannelWithUUIDError?(channelManager: PTChannelManager, channelUUID: NSUUID, error: NSError): void;

  incomingServiceUpdatePushForChannelManagerChannelUUIDPushPayloadIsHighPriorityRemainingHighPriorityBudgetWithCompletionHandler?(channelManager: PTChannelManager, channelUUID: NSUUID, pushPayload: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, isHighPriority: boolean, remainingHighPriorityBudget: number, completion: () => void): void;
}

declare class PTChannelManagerDelegate extends NativeObject implements PTChannelManagerDelegate {
}

declare class PTPushResult extends NSObject {
  static readonly leaveChannelPushResult: PTPushResult;

  static pushResultForActiveRemoteParticipant(participant: PTParticipant): PTPushResult;
}

declare class PTChannelManager extends NSObject {
  static channelManagerWithDelegateRestorationDelegateCompletionHandler(delegate: PTChannelManagerDelegate, restorationDelegate: PTChannelRestorationDelegate, completionHandler: (p1: PTChannelManager, p2: NSError) => void | null): void;

  readonly activeChannelUUID: NSUUID;

  requestJoinChannelWithUUIDDescriptor(channelUUID: NSUUID, descriptor: PTChannelDescriptor): void;

  requestBeginTransmittingWithChannelUUID(channelUUID: NSUUID): void;

  stopTransmittingWithChannelUUID(channelUUID: NSUUID): void;

  leaveChannelWithUUID(channelUUID: NSUUID): void;

  setChannelDescriptorForChannelUUIDCompletionHandler(channelDescriptor: PTChannelDescriptor, channelUUID: NSUUID, completionHandler: (p1: NSError) => void | null): void;

  setActiveRemoteParticipantForChannelUUIDCompletionHandler(participant: PTParticipant | null, channelUUID: NSUUID, completionHandler: (p1: NSError) => void | null): void;

  setServiceStatusForChannelUUIDCompletionHandler(status: interop.Enum<typeof PTServiceStatus>, channelUUID: NSUUID, completionHandler: (p1: NSError) => void | null): void;

  setTransmissionModeForChannelUUIDCompletionHandler(transmissionMode: interop.Enum<typeof PTTransmissionMode>, channelUUID: NSUUID, completionHandler: (p1: NSError) => void | null): void;

  setAccessoryButtonEventsEnabledForChannelUUIDCompletionHandler(enabled: boolean, channelUUID: NSUUID, completionHandler: (p1: NSError) => void | null): void;
}

declare class PTParticipant extends NSObject {
  readonly name: string;

  readonly image: UIImage;

  initWithNameImage(name: string, image: UIImage | null): this;
}

declare class PTChannelDescriptor extends NSObject {
  initWithNameImage(name: string, image: UIImage | null): this;

  readonly name: string;

  readonly image: UIImage;
}


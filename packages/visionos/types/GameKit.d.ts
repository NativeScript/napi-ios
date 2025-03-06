/// <reference types="@nativescript/objc-node-api" />

declare const GKVoiceChatServiceErrorDomain: string;

declare const GKPlayerDidChangeNotificationName: string;

declare const GKSessionErrorDomain: string;

declare const GKErrorDomain: string;

declare const GKVoiceChatPlayerState: {
  Connected: 0,
  Disconnected: 1,
  Speaking: 2,
  Silent: 3,
  Connecting: 4,
};

declare const GKMatchmakingMode: {
  Default: 0,
  NearbyOnly: 1,
  AutomatchOnly: 2,
};

declare const GKPlayerConnectionState: {
  Unknown: 0,
  Connected: 1,
  Disconnected: 2,
};

declare const GKMatchSendDataMode: {
  Reliable: 0,
  Unreliable: 1,
};

declare const GKInviteRecipientResponse: {
  InviteRecipientResponseAccepted: 0,
  InviteRecipientResponseDeclined: 1,
  InviteRecipientResponseFailed: 2,
  InviteRecipientResponseIncompatible: 3,
  InviteRecipientResponseUnableToConnect: 4,
  InviteRecipientResponseNoAnswer: 5,
  InviteeResponseAccepted: 0,
  InviteeResponseDeclined: 1,
  InviteeResponseFailed: 2,
  InviteeResponseIncompatible: 3,
  InviteeResponseUnableToConnect: 4,
  InviteeResponseNoAnswer: 5,
};

declare const GKTurnBasedMatchOutcome: {
  None: 0,
  Quit: 1,
  Won: 2,
  Lost: 3,
  Tied: 4,
  TimeExpired: 5,
  First: 6,
  Second: 7,
  Third: 8,
  Fourth: 9,
  CustomRange: 16711680,
};

declare const GKTurnBasedMatchStatus: {
  Unknown: 0,
  Open: 1,
  Ended: 2,
  Matching: 3,
};

declare const GKConnectionState: {
  Not: 0,
  GKConnectionStateConnected: 1,
};

declare const GKChallengeState: {
  Invalid: 0,
  Pending: 1,
  Completed: 2,
  Declined: 3,
};

declare const GKLeaderboardType: {
  Classic: 0,
  Recurring: 1,
};

declare const GKPhotoSize: {
  Small: 0,
  Normal: 1,
};

declare const GKErrorCode: {
  Unknown: 1,
  Cancelled: 2,
  CommunicationsFailure: 3,
  UserDenied: 4,
  InvalidCredentials: 5,
  NotAuthenticated: 6,
  AuthenticationInProgress: 7,
  InvalidPlayer: 8,
  ScoreNotSet: 9,
  ParentalControlsBlocked: 10,
  PlayerStatusExceedsMaximumLength: 11,
  PlayerStatusInvalid: 12,
  MatchRequestInvalid: 13,
  Underage: 14,
  GameUnrecognized: 15,
  NotSupported: 16,
  InvalidParameter: 17,
  UnexpectedConnection: 18,
  ChallengeInvalid: 19,
  TurnBasedMatchDataTooLarge: 20,
  TurnBasedTooManySessions: 21,
  TurnBasedInvalidParticipant: 22,
  TurnBasedInvalidTurn: 23,
  TurnBasedInvalidState: 24,
  InvitationsDisabled: 25,
  PlayerPhotoFailure: 26,
  UbiquityContainerUnavailable: 27,
  MatchNotConnected: 28,
  GameSessionRequestInvalid: 29,
  RestrictedToAutomatch: 30,
  APINotAvailable: 31,
  NotAuthorized: 32,
  ConnectionTimeout: 33,
  APIObsolete: 34,
  ICloudUnavailable: 35,
  LockdownMode: 36,
  AppUnlisted: 37,
  FriendListDescriptionMissing: 100,
  FriendListRestricted: 101,
  FriendListDenied: 102,
  FriendRequestNotAvailable: 103,
};

declare const GKMatchType: {
  PeerToPeer: 0,
  Hosted: 1,
  TurnBased: 2,
};

declare const GKGameCenterViewControllerState: {
  Default: -1,
  Leaderboards: 0,
  Achievements: 1,
  Challenges: 2,
  LocalPlayerProfile: 3,
  Dashboard: 4,
  LocalPlayerFriendsList: 5,
};

declare const GKTurnBasedParticipantStatus: {
  Unknown: 0,
  Invited: 1,
  Declined: 2,
  Matching: 3,
  Active: 4,
  Done: 5,
};

declare const GKLeaderboardPlayerScope: {
  Global: 0,
  FriendsOnly: 1,
};

declare const GKAccessPointLocation: {
  TopLeading: 0,
  TopTrailing: 1,
  BottomLeading: 2,
  BottomTrailing: 3,
};

declare const GKTransportType: {
  Unreliable: 0,
  Reliable: 1,
};

declare const GKLeaderboardTimeScope: {
  Today: 0,
  Week: 1,
  AllTime: 2,
};

declare interface GKSavedGameListener extends NSObject {
}

declare class GKSavedGameListener extends NativeObject implements GKSavedGameListener {
}

declare interface GKMatchmakerViewControllerDelegate extends NSObject {
  matchmakerViewControllerGetMatchPropertiesForRecipientWithCompletionHandler?(viewController: interop.Object, recipient: interop.Object, completionHandler: (p1: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>) => void): void;
}

declare class GKMatchmakerViewControllerDelegate extends NativeObject implements GKMatchmakerViewControllerDelegate {
}

declare interface GKChallengeListener extends NSObject {
}

declare class GKChallengeListener extends NativeObject implements GKChallengeListener {
}

declare interface GKTurnBasedMatchmakerViewControllerDelegate extends NSObject {
}

declare class GKTurnBasedMatchmakerViewControllerDelegate extends NativeObject implements GKTurnBasedMatchmakerViewControllerDelegate {
}

declare interface GKGameCenterControllerDelegate extends NSObject {
}

declare class GKGameCenterControllerDelegate extends NativeObject implements GKGameCenterControllerDelegate {
}

declare interface GKInviteEventListener {
}

declare class GKInviteEventListener extends NativeObject implements GKInviteEventListener {
}

declare interface GKLocalPlayerListener extends GKChallengeListener, GKInviteEventListener, GKTurnBasedEventListener, GKSavedGameListener {
}

declare class GKLocalPlayerListener extends NativeObject implements GKLocalPlayerListener {
}

declare interface GKTurnBasedEventListener {
  playerMatchEnded?(player: interop.Object, match: interop.Object): void;
}

declare class GKTurnBasedEventListener extends NativeObject implements GKTurnBasedEventListener {
}

declare interface GKMatchDelegate extends NSObject {
}

declare class GKMatchDelegate extends NativeObject implements GKMatchDelegate {
}

declare class GKVoiceChat extends NSObject {
  start(): void;

  stop(): void;

  readonly name: string;

  isActive: boolean;

  volume: number;

  static isVoIPAllowed(): boolean;
}

declare class GKMatchedPlayers extends NSObject {
  readonly properties: NSDictionary;

  readonly players: NSArray;

  readonly playerProperties: NSDictionary;
}


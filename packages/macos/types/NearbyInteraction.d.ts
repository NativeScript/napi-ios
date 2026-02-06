/// <reference types="@nativescript/objc-node-api" />

declare const NIDLTDOACoordinatesType: {
  Geodetic: 0,
  Relative: 1,
};

declare const NIAlgorithmConvergenceStatus: {
  Unknown: 0,
  NotConverged: 1,
  Converged: 2,
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

declare const NINearbyObjectRemovalReason: {
  Timeout: 0,
  PeerEnded: 1,
};

declare const NIErrorCode: {
  UnsupportedPlatform: -5889,
  InvalidConfiguration: -5888,
  SessionFailed: -5887,
  ResourceUsageTimeout: -5886,
  ActiveSessionsLimitExceeded: -5885,
  UserDidNotAllow: -5884,
  IncompatiblePeerDevice: -5881,
  ActiveExtendedDistanceSessionsLimitExceeded: -5880,
};


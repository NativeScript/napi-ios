/// <reference types="@nativescript/objc-node-api" />

declare const MLMultiArrayShapeConstraintType: {
  Unspecified: 1,
  Enumerated: 2,
  Range: 3,
};

declare const MLUpdateProgressEvent: {
  TrainingBegin: 1,
  EpochEnd: 2,
  MiniBatchEnd: 4,
};

declare const MLTaskState: {
  Suspended: 1,
  Running: 2,
  Cancelling: 3,
  Completed: 4,
  Failed: 5,
};


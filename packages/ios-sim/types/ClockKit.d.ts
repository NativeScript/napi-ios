/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const CLKWatchFaceLibraryErrorDomain: string;

declare const CLKWatchFaceLibraryErrorCode: {
  NotFileURL: 1,
  InvalidFile: 2,
  PermissionDenied: 3,
  FaceNotAvailable: 4,
  NoURL: 5,
};

declare class CLKWatchFaceLibrary extends NSObject {
  addWatchFaceAtURLCompletionHandler(fileURL: NSURL, handler: (p1: NSError) => void | null): void;
}


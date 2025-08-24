/// <reference types="@nativescript/objc-node-api" />

declare const kMTAudioProcessingTapCallbacksVersion_0: number;

declare const kMTAudioProcessingTapFlag_EndOfStream: number;

declare const kMTAudioProcessingTapFlag_StartOfStream: number;

declare const kMTAudioProcessingTapCreationFlag_PostEffects: number;

declare const kMTAudioProcessingTapCreationFlag_PreEffects: number;

declare class MTAudioProcessingTapCallbacks {
  constructor(init?: MTAudioProcessingTapCallbacks);
  version: number;
  clientInfo: interop.Pointer;
  init: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void | null;
  finalize: (p1: interop.PointerConvertible) => void | null;
  prepare: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void | null;
  unprepare: (p1: interop.PointerConvertible) => void | null;
  process: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible) => void | null;
}

declare class opaqueMTAudioProcessingTap {
  constructor(init?: opaqueMTAudioProcessingTap);
}

declare function MTAudioProcessingTapGetTypeID(): number;

declare function MTAudioProcessingTapCreate(allocator: interop.Object, callbacks: interop.PointerConvertible, flags: number, tapOut: interop.PointerConvertible): number;

declare function MTAudioProcessingTapGetStorage(tap: interop.Object): interop.Pointer;

declare function MTAudioProcessingTapGetSourceAudio(tap: interop.Object, numberFrames: number, bufferListInOut: interop.PointerConvertible, flagsOut: interop.PointerConvertible, timeRangeOut: interop.PointerConvertible, numberFramesOut: interop.PointerConvertible): number;

declare function MTCopyLocalizedNameForMediaType(mediaType: number): interop.Object;

declare function MTCopyLocalizedNameForMediaSubType(mediaType: number, mediaSubType: number): interop.Object;


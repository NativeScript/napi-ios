/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const kIOSurfacePlaneBytesPerElement: interop.Pointer;

declare const kIOSurfacePlaneSize: interop.Pointer;

declare const kIOSurfacePlaneInfo: interop.Pointer;

declare const IOSurfacePropertyKeyName: string;

declare const kIOSurfacePlaneBytesPerRow: interop.Pointer;

declare const kIOSurfacePlaneComponentRanges: interop.Pointer;

declare const kIOSurfaceOffset: interop.Pointer;

declare const IOSurfacePropertyKeyPlaneWidth: string;

declare const kIOSurfaceDefaultCache: number;

declare const kIOSurfaceICCProfile: interop.Pointer;

declare const kIOSurfaceColorSpace: interop.Pointer;

declare const kIOSurfacePixelSizeCastingAllowed: interop.Pointer;

declare const kIOSurfacePlaneComponentTypes: interop.Pointer;

declare const kIOSurfaceElementWidth: interop.Pointer;

declare const IOSurfacePropertyKeyPixelSizeCastingAllowed: string;

declare const IOSurfacePropertyKeyPixelFormat: string;

declare const IOSurfacePropertyKeyCacheMode: string;

declare const IOSurfacePropertyKeyPlaneElementHeight: string;

declare const IOSurfacePropertyKeyPlaneBytesPerElement: string;

declare const IOSurfacePropertyKeyPlaneBase: string;

declare const IOSurfacePropertyKeyPlaneBytesPerRow: string;

declare const IOSurfacePropertyKeyPlaneHeight: string;

declare const IOSurfacePropertyKeyElementHeight: string;

declare const IOSurfacePropertyKeyElementWidth: string;

declare const IOSurfacePropertyKeyBytesPerElement: string;

declare const IOSurfacePropertyKeyWidth: string;

declare const kIOSurfacePlaneOffset: interop.Pointer;

declare const kIOSurfacePlaneElementHeight: interop.Pointer;

declare const kIOSurfacePlaneBitsPerElement: interop.Pointer;

declare const kIOSurfaceBytesPerElement: interop.Pointer;

declare const kIOSurfacePlaneElementWidth: interop.Pointer;

declare const kIOSurfacePlaneComponentBitOffsets: interop.Pointer;

declare const kIOSurfacePlaneComponentBitDepths: interop.Pointer;

declare const kIOSurfacePixelFormat: interop.Pointer;

declare const kIOSurfaceCacheMode: interop.Pointer;

declare const kIOSurfacePlaneWidth: interop.Pointer;

declare const kIOSurfaceBytesPerRow: interop.Pointer;

declare const kIOSurfaceMapCopybackCache: number;

declare const kIOSurfaceMapDefaultCache: number;

declare const kIOSurfaceWriteThruCache: number;

declare const IOSurfacePropertyKeyPlaneSize: string;

declare const kIOSurfaceHeight: interop.Pointer;

declare const kIOSurfaceSubsampling: interop.Pointer;

declare const kIOSurfaceName: interop.Pointer;

declare const kIOSurfacePlaneComponentNames: interop.Pointer;

declare const kIOSurfaceMapWriteThruCache: number;

declare const IOSurfacePropertyKeyPlaneElementWidth: string;

declare const kIOSurfaceContentHeadroom: interop.Pointer;

declare const IOSurfacePropertyKeyOffset: string;

declare const kIOSurfaceWriteCombineCache: number;

declare const IOSurfacePropertyKeyPlaneInfo: string;

declare const IOSurfacePropertyKeyBytesPerRow: string;

declare const kIOSurfaceIsGlobal: interop.Pointer;

declare const IOSurfacePropertyKeyHeight: string;

declare const kIOSurfaceCopybackInnerCache: number;

declare const kIOSurfacePlaneBase: interop.Pointer;

declare const kIOSurfacePlaneHeight: interop.Pointer;

declare const kIOSurfaceAllocSize: interop.Pointer;

declare const kIOSurfaceWidth: interop.Pointer;

declare const kIOSurfaceInhibitCache: number;

declare const kIOSurfaceMapCopybackInnerCache: number;

declare const kIOSurfaceMapCacheShift: number;

declare const kIOSurfaceMapInhibitCache: number;

declare const IOSurfacePropertyKeyPlaneOffset: string;

declare const IOSurfacePropertyKeyAllocSize: string;

declare const kIOSurfaceElementHeight: interop.Pointer;

declare const kIOSurfaceMapWriteCombineCache: number;

declare const kIOSurfaceCopybackCache: number;

declare const IOSurfacePropertyAllocSizeKey: string;

declare const IOSurfacePurgeabilityState: {
  NonVolatile: 0,
  Volatile: 1,
  Empty: 2,
  KeepCurrent: 3,
};

declare const IOSurfaceComponentRange: {
  Unknown: 0,
  FullRange: 1,
  VideoRange: 2,
  WideRange: 3,
};

declare const IOSurfaceComponentType: {
  Unknown: 0,
  UnsignedInteger: 1,
  SignedInteger: 2,
  Float: 3,
  SignedNormalized: 4,
};

declare const IOSurfaceMemoryLedgerFlags: {
  kIOSurfaceMemoryLedgerFlagNoFootprint: 1,
};

declare const IOSurfaceLockOptions: {
  ReadOnly: 1,
  AvoidSync: 2,
};

declare const IOSurfaceComponentName: {
  Unknown: 0,
  Alpha: 1,
  Red: 2,
  Green: 3,
  Blue: 4,
  Luma: 5,
  ChromaRed: 6,
  ChromaBlue: 7,
};

declare const IOSurfaceMemoryLedgerTags: {
  Default: 1,
  Network: 2,
  Media: 3,
  Graphics: 4,
  Neural: 5,
};

declare const IOSurfaceSubsampling: {
  SubsamplingUnknown: 0,
  SubsamplingNone: 1,
  Subsampling422: 2,
  Subsampling420: 3,
  Subsampling411: 4,
};

declare function IOSurfaceGetTypeID(): number;

declare function IOSurfaceCreate(properties: interop.Object): interop.Object;

declare function IOSurfaceLookup(csid: number): interop.Object;

declare function IOSurfaceGetID(buffer: interop.Object): number;

declare function IOSurfaceLock(buffer: interop.Object, options: interop.Enum<typeof IOSurfaceLockOptions>, seed: interop.PointerConvertible): number;

declare function IOSurfaceUnlock(buffer: interop.Object, options: interop.Enum<typeof IOSurfaceLockOptions>, seed: interop.PointerConvertible): number;

declare function IOSurfaceGetAllocSize(buffer: interop.Object): number;

declare function IOSurfaceGetWidth(buffer: interop.Object): number;

declare function IOSurfaceGetHeight(buffer: interop.Object): number;

declare function IOSurfaceGetBytesPerElement(buffer: interop.Object): number;

declare function IOSurfaceGetBytesPerRow(buffer: interop.Object): number;

declare function IOSurfaceGetBaseAddress(buffer: interop.Object): interop.Pointer;

declare function IOSurfaceGetElementWidth(buffer: interop.Object): number;

declare function IOSurfaceGetElementHeight(buffer: interop.Object): number;

declare function IOSurfaceGetPixelFormat(buffer: interop.Object): number;

declare function IOSurfaceGetSeed(buffer: interop.Object): number;

declare function IOSurfaceGetPlaneCount(buffer: interop.Object): number;

declare function IOSurfaceGetWidthOfPlane(buffer: interop.Object, planeIndex: number): number;

declare function IOSurfaceGetHeightOfPlane(buffer: interop.Object, planeIndex: number): number;

declare function IOSurfaceGetBytesPerElementOfPlane(buffer: interop.Object, planeIndex: number): number;

declare function IOSurfaceGetBytesPerRowOfPlane(buffer: interop.Object, planeIndex: number): number;

declare function IOSurfaceGetBaseAddressOfPlane(buffer: interop.Object, planeIndex: number): interop.Pointer;

declare function IOSurfaceGetElementWidthOfPlane(buffer: interop.Object, planeIndex: number): number;

declare function IOSurfaceGetElementHeightOfPlane(buffer: interop.Object, planeIndex: number): number;

declare function IOSurfaceGetNumberOfComponentsOfPlane(buffer: interop.Object, planeIndex: number): number;

declare function IOSurfaceGetNameOfComponentOfPlane(buffer: interop.Object, planeIndex: number, componentIndex: number): interop.Enum<typeof IOSurfaceComponentName>;

declare function IOSurfaceGetTypeOfComponentOfPlane(buffer: interop.Object, planeIndex: number, componentIndex: number): interop.Enum<typeof IOSurfaceComponentType>;

declare function IOSurfaceGetRangeOfComponentOfPlane(buffer: interop.Object, planeIndex: number, componentIndex: number): interop.Enum<typeof IOSurfaceComponentRange>;

declare function IOSurfaceGetBitDepthOfComponentOfPlane(buffer: interop.Object, planeIndex: number, componentIndex: number): number;

declare function IOSurfaceGetBitOffsetOfComponentOfPlane(buffer: interop.Object, planeIndex: number, componentIndex: number): number;

declare function IOSurfaceGetSubsampling(buffer: interop.Object): interop.Enum<typeof IOSurfaceSubsampling>;

declare function IOSurfaceSetValue(buffer: interop.Object, key: interop.Object, value: interop.Object): void;

declare function IOSurfaceCopyValue(buffer: interop.Object, key: interop.Object): interop.Object;

declare function IOSurfaceRemoveValue(buffer: interop.Object, key: interop.Object): void;

declare function IOSurfaceSetValues(buffer: interop.Object, keysAndValues: interop.Object): void;

declare function IOSurfaceCopyAllValues(buffer: interop.Object): interop.Object;

declare function IOSurfaceRemoveAllValues(buffer: interop.Object): void;

declare function IOSurfaceCreateMachPort(buffer: interop.Object): number;

declare function IOSurfaceLookupFromMachPort(port: number): interop.Object;

declare function IOSurfaceGetPropertyMaximum(property: interop.Object): number;

declare function IOSurfaceGetPropertyAlignment(property: interop.Object): number;

declare function IOSurfaceAlignProperty(property: interop.Object, value: number): number;

declare function IOSurfaceIncrementUseCount(buffer: interop.Object): void;

declare function IOSurfaceDecrementUseCount(buffer: interop.Object): void;

declare function IOSurfaceGetUseCount(buffer: interop.Object): number;

declare function IOSurfaceIsInUse(buffer: interop.Object): number;

declare function IOSurfaceAllowsPixelSizeCasting(buffer: interop.Object): number;

declare function IOSurfaceSetPurgeable(buffer: interop.Object, newState: number, oldState: interop.PointerConvertible): number;

declare function IOSurfaceSetOwnershipIdentity(buffer: interop.Object, task_id_token: number, newLedgerTag: number, newLedgerOptions: number): number;

declare class IOSurface extends NSObject implements NSSecureCoding {
  initWithProperties(properties: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): this;

  lockWithOptionsSeed(options: interop.Enum<typeof IOSurfaceLockOptions>, seed: interop.PointerConvertible): number;

  unlockWithOptionsSeed(options: interop.Enum<typeof IOSurfaceLockOptions>, seed: interop.PointerConvertible): number;

  readonly allocationSize: number;

  readonly width: number;

  readonly height: number;

  readonly baseAddress: interop.Pointer;

  readonly pixelFormat: number;

  readonly bytesPerRow: number;

  readonly bytesPerElement: number;

  readonly elementWidth: number;

  readonly elementHeight: number;

  readonly surfaceID: number;

  readonly seed: number;

  readonly planeCount: number;

  widthOfPlaneAtIndex(planeIndex: number): number;

  heightOfPlaneAtIndex(planeIndex: number): number;

  bytesPerRowOfPlaneAtIndex(planeIndex: number): number;

  bytesPerElementOfPlaneAtIndex(planeIndex: number): number;

  elementWidthOfPlaneAtIndex(planeIndex: number): number;

  elementHeightOfPlaneAtIndex(planeIndex: number): number;

  baseAddressOfPlaneAtIndex(planeIndex: number): interop.Pointer;

  setAttachmentForKey(anObject: interop.Object, key: string): void;

  attachmentForKey(key: string): interop.Object;

  removeAttachmentForKey(key: string): void;

  setAllAttachments(dict: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  allAttachments(): NSDictionary;

  removeAllAttachments(): void;

  readonly inUse: boolean;

  incrementUseCount(): void;

  decrementUseCount(): void;

  readonly localUseCount: number;

  readonly allowsPixelSizeCasting: boolean;

  setPurgeableOldState(newState: interop.Enum<typeof IOSurfacePurgeabilityState>, oldState: interop.PointerConvertible): number;

  isInUse(): boolean;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}


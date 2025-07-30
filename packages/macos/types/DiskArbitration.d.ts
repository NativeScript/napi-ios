/// <reference types="@nativescript/objc-node-api" />

declare const kDADiskDescriptionWatchVolumePath: interop.Object;

declare const kDADiskEjectOptionDefault: number;

declare const kDADiskUnmountOptionForce: number;

declare const kDADiskUnmountOptionDefault: number;

declare const kDADiskRenameOptionDefault: number;

declare const kDADiskMountOptionNoFollow: number;

declare const kDADiskMountOptionDefault: number;

declare const kDAReturnBadArgument: number;

declare const kDAReturnNotPermitted: number;

declare const kDADiskDescriptionMatchMediaWhole: interop.Object;

declare const kDADiskClaimOptionDefault: number;

declare const kDAReturnNotFound: number;

declare const kDADiskDescriptionMatchVolumeUnrecognized: interop.Object;

declare const kDAReturnNotWritable: number;

declare const kDAReturnExclusiveAccess: number;

declare const kDADiskDescriptionMatchVolumeMountable: interop.Object;

declare const kDADiskDescriptionMediaLeafKey: interop.Pointer;

declare const kDADiskDescriptionDeviceVendorKey: interop.Pointer;

declare const kDADiskDescriptionVolumeNetworkKey: interop.Pointer;

declare const kDADiskDescriptionVolumePathKey: interop.Pointer;

declare const kDADiskDescriptionVolumeUUIDKey: interop.Pointer;

declare const kDADiskDescriptionMediaTypeKey: interop.Pointer;

declare const kDADiskDescriptionMediaBSDUnitKey: interop.Pointer;

declare const kDADiskDescriptionMediaEjectableKey: interop.Pointer;

declare const kDADiskDescriptionMediaUUIDKey: interop.Pointer;

declare const kDADiskDescriptionDevicePathKey: interop.Pointer;

declare const kDADiskDescriptionFSKitPrefix: interop.Pointer;

declare const kDADiskDescriptionBusPathKey: interop.Pointer;

declare const kDADiskDescriptionDeviceModelKey: interop.Pointer;

declare const kDADiskDescriptionDeviceInternalKey: interop.Pointer;

declare const kDADiskDescriptionMediaWritableKey: interop.Pointer;

declare const kDADiskDescriptionMediaWholeKey: interop.Pointer;

declare const kDADiskDescriptionMediaKindKey: interop.Pointer;

declare const kDADiskDescriptionMediaBSDNameKey: interop.Pointer;

declare const kDADiskDescriptionMediaBlockSizeKey: interop.Pointer;

declare const kDADiskDescriptionVolumeTypeKey: interop.Pointer;

declare const kDADiskDescriptionVolumeNameKey: interop.Pointer;

declare const kDADiskDescriptionVolumeKindKey: interop.Pointer;

declare const kDADiskDescriptionMediaRemovableKey: interop.Pointer;

declare const kDAReturnNotMounted: number;

declare const kDADiskDescriptionDeviceProtocolKey: interop.Pointer;

declare const kDADiskDescriptionDeviceUnitKey: interop.Pointer;

declare const kDADiskDescriptionMediaEncryptionDetailKey: interop.Pointer;

declare const kDADiskDescriptionMediaPathKey: interop.Pointer;

declare const kDADiskDescriptionMediaContentKey: interop.Pointer;

declare const kDAReturnBusy: number;

declare const kDAReturnSuccess: number;

declare const kDADiskDescriptionMediaBSDMajorKey: interop.Pointer;

declare const kDAReturnError: number;

declare const kDADiskDescriptionMatchMediaUnformatted: interop.Object;

declare const kDAReturnNotPrivileged: number;

declare const kDAReturnNotReady: number;

declare const kDADiskDescriptionDeviceGUIDKey: interop.Pointer;

declare const kDADiskDescriptionBusNameKey: interop.Pointer;

declare const kDADiskDescriptionWatchVolumeName: interop.Object;

declare const kDAReturnNoResources: number;

declare const kDADiskDescriptionMediaEncryptedKey: interop.Pointer;

declare const kDADiskDescriptionRepairRunningKey: interop.Pointer;

declare const kDADiskDescriptionMediaIconKey: interop.Pointer;

declare const kDADiskUnmountOptionWhole: number;

declare const kDADiskOptionDefault: number;

declare const kDADiskMountOptionWhole: number;

declare const kDADiskDescriptionVolumeMountableKey: interop.Pointer;

declare const kDADiskDescriptionMediaSizeKey: interop.Pointer;

declare const kDADiskDescriptionMediaBSDMinorKey: interop.Pointer;

declare const kDADiskDescriptionDeviceTDMLockedKey: interop.Pointer;

declare const kDAReturnUnsupported: number;

declare const kDADiskDescriptionDeviceRevisionKey: interop.Pointer;

declare const kDADiskDescriptionMediaNameKey: interop.Pointer;

declare class __DADissenter {
  constructor(init?: __DADissenter);
}

declare class __DADisk {
  constructor(init?: __DADisk);
}

declare class __DASession {
  constructor(init?: __DASession);
}

declare function DASessionGetTypeID(): number;

declare function DASessionCreate(allocator: interop.Object): interop.Object;

declare function DASessionScheduleWithRunLoop(session: interop.Object, runLoop: interop.Object, runLoopMode: interop.Object): void;

declare function DASessionUnscheduleFromRunLoop(session: interop.Object, runLoop: interop.Object, runLoopMode: interop.Object): void;

declare function DASessionSetDispatchQueue(session: interop.Object, queue: NSObject): void;

declare function DAApprovalSessionGetTypeID(): number;

declare function DAApprovalSessionCreate(allocator: interop.Object): interop.Object;

declare function DAApprovalSessionScheduleWithRunLoop(session: interop.Object, runLoop: interop.Object, runLoopMode: interop.Object): void;

declare function DAApprovalSessionUnscheduleFromRunLoop(session: interop.Object, runLoop: interop.Object, runLoopMode: interop.Object): void;

declare function DADiskGetTypeID(): number;

declare function DADiskCreateFromBSDName(allocator: interop.Object, session: interop.Object, name: string): interop.Object;

declare function DADiskCreateFromIOMedia(allocator: interop.Object, session: interop.Object, media: number): interop.Object;

declare function DADiskCreateFromVolumePath(allocator: interop.Object, session: interop.Object, path: interop.Object): interop.Object;

declare function DADiskGetBSDName(disk: interop.Object): string;

declare function DADiskCopyIOMedia(disk: interop.Object): number;

declare function DADiskCopyDescription(disk: interop.Object): interop.Object;

declare function DADiskCopyWholeDisk(disk: interop.Object): interop.Object;

declare function DADissenterCreate(allocator: interop.Object, status: number, string: interop.Object): interop.Object;

declare function DADissenterGetStatus(dissenter: interop.Object): number;

declare function DADissenterGetStatusString(dissenter: interop.Object): interop.Object;

declare function DARegisterDiskAppearedCallback(session: interop.Object, match: interop.Object, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, context: interop.PointerConvertible): void;

declare function DARegisterDiskDescriptionChangedCallback(session: interop.Object, match: interop.Object, watch: interop.Object, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void, context: interop.PointerConvertible): void;

declare function DARegisterDiskDisappearedCallback(session: interop.Object, match: interop.Object, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, context: interop.PointerConvertible): void;

declare function DADiskMount(disk: interop.Object, path: interop.Object, options: number, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void, context: interop.PointerConvertible): void;

declare function DADiskMountWithArguments(disk: interop.Object, path: interop.Object, options: number, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void, context: interop.PointerConvertible, arguments$: interop.PointerConvertible): void;

declare function DARegisterDiskMountApprovalCallback(session: interop.Object, match: interop.Object, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer, context: interop.PointerConvertible): void;

declare function DADiskRename(disk: interop.Object, name: interop.Object, options: number, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void, context: interop.PointerConvertible): void;

declare function DADiskUnmount(disk: interop.Object, options: number, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void, context: interop.PointerConvertible): void;

declare function DARegisterDiskUnmountApprovalCallback(session: interop.Object, match: interop.Object, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer, context: interop.PointerConvertible): void;

declare function DADiskEject(disk: interop.Object, options: number, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void, context: interop.PointerConvertible): void;

declare function DARegisterDiskEjectApprovalCallback(session: interop.Object, match: interop.Object, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer, context: interop.PointerConvertible): void;

declare function DADiskClaim(disk: interop.Object, options: number, release: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer, releaseContext: interop.PointerConvertible, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void, callbackContext: interop.PointerConvertible): void;

declare function DADiskIsClaimed(disk: interop.Object): number;

declare function DADiskUnclaim(disk: interop.Object): void;

declare function DARegisterDiskPeekCallback(session: interop.Object, match: interop.Object, order: number, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, context: interop.PointerConvertible): void;

declare function DADiskGetOptions(disk: interop.Object): number;

declare function DADiskSetOptions(disk: interop.Object, options: number, value: number): number;

declare function DAUnregisterCallback(session: interop.Object, callback: interop.PointerConvertible, context: interop.PointerConvertible): void;

declare function DAUnregisterApprovalCallback(session: interop.Object, callback: interop.PointerConvertible, context: interop.PointerConvertible): void;


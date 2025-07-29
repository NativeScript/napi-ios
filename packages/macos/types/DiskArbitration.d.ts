/// <reference types="@nativescript/objc-node-api" />

declare const kDADiskDescriptionWatchVolumePath: interop.Pointer;

declare const kDADiskEjectOptionDefault: number;

declare const kDADiskUnmountOptionForce: number;

declare const kDADiskUnmountOptionDefault: number;

declare const kDADiskRenameOptionDefault: number;

declare const kDADiskMountOptionNoFollow: number;

declare const kDADiskMountOptionDefault: number;

declare const kDAReturnNotMounted: number;

declare const kDAReturnBadArgument: number;

declare const kDAReturnNotPermitted: number;

declare const kDADiskDescriptionMatchMediaWhole: interop.Pointer;

declare const kDADiskClaimOptionDefault: number;

declare const kDAReturnNotFound: number;

declare const kDADiskDescriptionMatchVolumeUnrecognized: interop.Pointer;

declare const kDAReturnNotWritable: number;

declare const kDAReturnExclusiveAccess: number;

declare const kDADiskDescriptionMatchVolumeMountable: interop.Pointer;

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

declare const kDADiskDescriptionDeviceProtocolKey: interop.Pointer;

declare const kDADiskDescriptionDeviceUnitKey: interop.Pointer;

declare const kDADiskDescriptionMediaEncryptionDetailKey: interop.Pointer;

declare const kDADiskDescriptionMediaPathKey: interop.Pointer;

declare const kDADiskDescriptionMediaContentKey: interop.Pointer;

declare const kDAReturnBusy: number;

declare const kDAReturnSuccess: number;

declare const kDADiskDescriptionMediaBSDMajorKey: interop.Pointer;

declare const kDAReturnError: number;

declare const kDADiskDescriptionMatchMediaUnformatted: interop.Pointer;

declare const kDAReturnNotPrivileged: number;

declare const kDAReturnNotReady: number;

declare const kDADiskDescriptionDeviceGUIDKey: interop.Pointer;

declare const kDADiskDescriptionBusNameKey: interop.Pointer;

declare const kDADiskDescriptionWatchVolumeName: interop.Pointer;

declare const kDAReturnNoResources: number;

declare const kDADiskDescriptionMediaEncryptedKey: interop.Pointer;

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

declare function DASessionCreate(allocator: interop.PointerConvertible): interop.Pointer;

declare function DASessionScheduleWithRunLoop(session: interop.PointerConvertible, runLoop: interop.PointerConvertible, runLoopMode: interop.PointerConvertible): void;

declare function DASessionUnscheduleFromRunLoop(session: interop.PointerConvertible, runLoop: interop.PointerConvertible, runLoopMode: interop.PointerConvertible): void;

declare function DASessionSetDispatchQueue(session: interop.PointerConvertible, queue: NSObject): void;

declare function DAApprovalSessionGetTypeID(): number;

declare function DAApprovalSessionCreate(allocator: interop.PointerConvertible): interop.Pointer;

declare function DAApprovalSessionScheduleWithRunLoop(session: interop.PointerConvertible, runLoop: interop.PointerConvertible, runLoopMode: interop.PointerConvertible): void;

declare function DAApprovalSessionUnscheduleFromRunLoop(session: interop.PointerConvertible, runLoop: interop.PointerConvertible, runLoopMode: interop.PointerConvertible): void;

declare function DADiskGetTypeID(): number;

declare function DADiskCreateFromBSDName(allocator: interop.PointerConvertible, session: interop.PointerConvertible, name: string): interop.Pointer;

declare function DADiskCreateFromIOMedia(allocator: interop.PointerConvertible, session: interop.PointerConvertible, media: number): interop.Pointer;

declare function DADiskCreateFromVolumePath(allocator: interop.PointerConvertible, session: interop.PointerConvertible, path: interop.PointerConvertible): interop.Pointer;

declare function DADiskGetBSDName(disk: interop.PointerConvertible): string;

declare function DADiskCopyIOMedia(disk: interop.PointerConvertible): number;

declare function DADiskCopyDescription(disk: interop.PointerConvertible): interop.Pointer;

declare function DADiskCopyWholeDisk(disk: interop.PointerConvertible): interop.Pointer;

declare function DADissenterCreate(allocator: interop.PointerConvertible, status: number, string: interop.PointerConvertible): interop.Pointer;

declare function DADissenterGetStatus(dissenter: interop.PointerConvertible): number;

declare function DADissenterGetStatusString(dissenter: interop.PointerConvertible): interop.Pointer;

declare function DARegisterDiskAppearedCallback(session: interop.PointerConvertible, match: interop.PointerConvertible, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, context: interop.PointerConvertible): void;

declare function DARegisterDiskDescriptionChangedCallback(session: interop.PointerConvertible, match: interop.PointerConvertible, watch: interop.PointerConvertible, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void, context: interop.PointerConvertible): void;

declare function DARegisterDiskDisappearedCallback(session: interop.PointerConvertible, match: interop.PointerConvertible, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, context: interop.PointerConvertible): void;

declare function DADiskMount(disk: interop.PointerConvertible, path: interop.PointerConvertible, options: number, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void, context: interop.PointerConvertible): void;

declare function DADiskMountWithArguments(disk: interop.PointerConvertible, path: interop.PointerConvertible, options: number, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void, context: interop.PointerConvertible, arguments$: interop.PointerConvertible): void;

declare function DARegisterDiskMountApprovalCallback(session: interop.PointerConvertible, match: interop.PointerConvertible, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer, context: interop.PointerConvertible): void;

declare function DADiskRename(disk: interop.PointerConvertible, name: interop.PointerConvertible, options: number, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void, context: interop.PointerConvertible): void;

declare function DADiskUnmount(disk: interop.PointerConvertible, options: number, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void, context: interop.PointerConvertible): void;

declare function DARegisterDiskUnmountApprovalCallback(session: interop.PointerConvertible, match: interop.PointerConvertible, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer, context: interop.PointerConvertible): void;

declare function DADiskEject(disk: interop.PointerConvertible, options: number, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void, context: interop.PointerConvertible): void;

declare function DARegisterDiskEjectApprovalCallback(session: interop.PointerConvertible, match: interop.PointerConvertible, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer, context: interop.PointerConvertible): void;

declare function DADiskClaim(disk: interop.PointerConvertible, options: number, release: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer, releaseContext: interop.PointerConvertible, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void, callbackContext: interop.PointerConvertible): void;

declare function DADiskIsClaimed(disk: interop.PointerConvertible): number;

declare function DADiskUnclaim(disk: interop.PointerConvertible): void;

declare function DARegisterDiskPeekCallback(session: interop.PointerConvertible, match: interop.PointerConvertible, order: number, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, context: interop.PointerConvertible): void;

declare function DADiskGetOptions(disk: interop.PointerConvertible): number;

declare function DADiskSetOptions(disk: interop.PointerConvertible, options: number, value: number): number;

declare function DAUnregisterCallback(session: interop.PointerConvertible, callback: interop.PointerConvertible, context: interop.PointerConvertible): void;

declare function DAUnregisterApprovalCallback(session: interop.PointerConvertible, callback: interop.PointerConvertible, context: interop.PointerConvertible): void;


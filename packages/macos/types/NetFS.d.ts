/// <reference types="@nativescript/objc-node-api" />

declare class NetFSInterface {
  constructor(init?: NetFSInterface);
  _interface: interop.Pointer;
  _factoryID: interop.Pointer;
  _refCount: number;
}

declare class NetFSMountInterface_V1 {
  constructor(init?: NetFSMountInterface_V1);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  CreateSessionRef: (p1: interop.PointerConvertible) => number | null;
  GetServerInfo: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  ParseURL: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  CreateURL: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  OpenSession: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  EnumerateShares: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  Mount: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number | null;
  Cancel: (p1: interop.PointerConvertible) => number | null;
  CloseSession: (p1: interop.PointerConvertible) => number | null;
  GetMountInfo: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
}

declare function NetFSMountURLSync(url: interop.PointerConvertible, mountpath: interop.PointerConvertible, user: interop.PointerConvertible, passwd: interop.PointerConvertible, open_options: interop.PointerConvertible, mount_options: interop.PointerConvertible, mountpoints: interop.PointerConvertible): number;

declare function NetFSMountURLAsync(url: interop.PointerConvertible, mountpath: interop.PointerConvertible, user: interop.PointerConvertible, passwd: interop.PointerConvertible, open_options: interop.PointerConvertible, mount_options: interop.PointerConvertible, requestID: interop.PointerConvertible, dispatchq: NSObject, mount_report: (p1: number, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void): number;

declare function NetFSMountURLCancel(requestID: interop.PointerConvertible): number;

declare function NetFSMountURLProbe(hostname: interop.PointerConvertible): interop.Pointer;

declare function NetFSCopyURLForRemountingVolume(localPathURL: interop.PointerConvertible): interop.Pointer;

declare function NetFSInterface_AddRef(p1: interop.PointerConvertible): number;

declare function NetFSInterface_Release(p1: interop.PointerConvertible): number;

declare function NetFS_CreateInterface(factoryID: interop.PointerConvertible, interfaceFTbl: interop.PointerConvertible): interop.Pointer;

declare function NetFSQueryInterface(p1: interop.PointerConvertible, iid: CFUUIDBytes, ppv: interop.PointerConvertible): number;

declare function NetFSCFStringtoCString(p1: interop.PointerConvertible): string;


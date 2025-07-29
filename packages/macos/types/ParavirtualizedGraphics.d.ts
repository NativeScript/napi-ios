/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const PGResumeErrorDomain: string;

declare const ParavirtualizedGraphicsVersionString: interop.Pointer;

declare const ParavirtualizedGraphicsVersionNumber: number;

declare const PGResumeErrorCode: {
  InternalFault: 0,
  InvalidSuspendStateVersion: 1,
  InvalidContent: 2,
  InvalidGuestVersion: 3,
  IncompatibleDevice: 4,
  InvalidDisplayPortCount: 5,
};

declare class PGTask_s {
  constructor(init?: PGTask_s);
}

declare class PGPhysicalMemoryRange_s {
  constructor(init?: PGPhysicalMemoryRange_s);
  physicalAddress: number;
  physicalLength: number;
}

declare class PGTraceRange_s {
  constructor(init?: PGTraceRange_s);
}

declare class PGDisplayCoord_t {
  constructor(init?: PGDisplayCoord_t);
  x: number;
  y: number;
}

declare function PGNewDeviceWithDescriptor(descriptor: PGDeviceDescriptor): PGDevice;

declare function PGCreateDeviceWithDescriptor(descriptor: PGDeviceDescriptor): PGDevice;

declare function PGMaxDisplayPortCount(): number;

declare function PGCopyOptionROMURL(): NSURL;

declare interface PGDevice extends NSObjectProtocol {
  mmioReadAtOffset(offset: number): number;

  mmioWriteAtOffsetValue(offset: number, value: number): void;

  newDisplayWithDescriptorPortSerialNum(descriptor: PGDisplayDescriptor, port: number, serialNum: number): PGDisplay | null;

  willSuspend(): void;

  finishSuspend(): NSData | null;

  willResumeWithSuspendStateError(suspendState: NSData, error: interop.PointerConvertible): boolean;

  didResume(): void;

  pause(): void;

  unpause(): void;

  stop(): void;

  reset(): void;
}

declare class PGDevice extends NativeObject implements PGDevice {
}

declare interface PGDisplay extends NSObjectProtocol {
  readonly name: string;

  readonly sizeInMillimeters: CGSize;

  readonly queue: NSObject;

  readonly modeChangeHandler: (p1: PGDisplayCoord_t, p2: number) => void;

  readonly newFrameEventHandler: () => void;

  readonly cursorGlyphHandler: (p1: NSBitmapImageRep, p2: PGDisplayCoord_t) => void;

  readonly cursorShowHandler: (p1: boolean) => void;

  readonly cursorMoveHandler: () => void;

  readonly cursorPosition: PGDisplayCoord_t;

  readonly serialNum: number;

  readonly port: number;

  readonly minimumTextureUsage: interop.Enum<typeof MTLTextureUsage>;

  readonly guestPresentCount: number;

  readonly hostPresentCount: number;

  get modeList(): NSArray;
  set modeList(value: NSArray<interop.Object> | Array<interop.Object>);

  encodeCurrentFrameToCommandBufferTextureRegion(commandBuffer: MTLCommandBuffer, texture: MTLTexture, region: MTLRegion): boolean;

  setModeList(modeList: NSArray<interop.Object> | Array<interop.Object>): void;
}

declare class PGDisplay extends NativeObject implements PGDisplay {
}

declare class PGDisplayDescriptor extends NSObject {
  name: string;

  sizeInMillimeters: CGSize;

  queue: NSObject;

  modeChangeHandler: (p1: PGDisplayCoord_t, p2: number) => void;

  newFrameEventHandler: () => void;

  cursorGlyphHandler: (p1: NSBitmapImageRep, p2: PGDisplayCoord_t) => void;

  cursorShowHandler: (p1: boolean) => void;

  cursorMoveHandler: () => void;

  setName(name: string): void;

  setSizeInMillimeters(sizeInMillimeters: CGSize): void;

  setQueue(queue: NSObject): void;

  setModeChangeHandler(modeChangeHandler: (p1: PGDisplayCoord_t, p2: number) => void): void;

  setNewFrameEventHandler(newFrameEventHandler: () => void): void;

  setCursorGlyphHandler(cursorGlyphHandler: (p1: NSBitmapImageRep, p2: PGDisplayCoord_t) => void): void;

  setCursorShowHandler(cursorShowHandler: (p1: boolean) => void): void;

  setCursorMoveHandler(cursorMoveHandler: () => void): void;
}

declare class PGDisplayMode extends NSObject {
  readonly sizeInPixels: PGDisplayCoord_t;

  readonly refreshRate: number;

  initWithSizeInPixelsRefreshRateInHz(sizeInPixels: PGDisplayCoord_t, refreshRateInHz: number): this;
}

declare class PGDeviceDescriptor extends NSObject {
  device: MTLDevice;

  mmioLength: number;

  createTask: (p1: number, p2: interop.PointerConvertible) => interop.Pointer;

  destroyTask: (p1: interop.PointerConvertible) => void;

  mapMemory: (p1: interop.PointerConvertible, p2: number, p3: number, p4: boolean, p5: interop.PointerConvertible) => boolean;

  unmapMemory: (p1: interop.PointerConvertible, p2: number, p3: number) => boolean;

  readMemory: (p1: number, p2: number, p3: interop.PointerConvertible) => boolean;

  raiseInterrupt: (p1: number) => void;

  addTraceRange: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible) => void) => interop.Pointer;

  removeTraceRange: (p1: interop.PointerConvertible) => void;

  displayPortCount: number;

  setDevice(device: MTLDevice): void;

  setMmioLength(mmioLength: number): void;

  setCreateTask(createTask: (p1: number, p2: interop.PointerConvertible) => interop.Pointer): void;

  setDestroyTask(destroyTask: (p1: interop.PointerConvertible) => void): void;

  setMapMemory(mapMemory: (p1: interop.PointerConvertible, p2: number, p3: number, p4: boolean, p5: interop.PointerConvertible) => boolean): void;

  setUnmapMemory(unmapMemory: (p1: interop.PointerConvertible, p2: number, p3: number) => boolean): void;

  setReadMemory(readMemory: (p1: number, p2: number, p3: interop.PointerConvertible) => boolean): void;

  setRaiseInterrupt(raiseInterrupt: (p1: number) => void): void;

  setAddTraceRange(addTraceRange: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible) => void) => interop.Pointer): void;

  setRemoveTraceRange(removeTraceRange: (p1: interop.PointerConvertible) => void): void;

  setDisplayPortCount(displayPortCount: number): void;
}


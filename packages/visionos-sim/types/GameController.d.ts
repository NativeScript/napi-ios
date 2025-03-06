/// <reference types="@nativescript/objc-node-api" />

declare const GCInputRightBumper: string;

declare const GCInputLeftBumper: string;

declare const GCDualSenseAdaptiveTriggerDiscretePositionCount: number;

declare const GCPoint2Zero: GCPoint2;

declare const GCUIEventTypes: {
  None: 0,
  Gamepad: 1,
};

declare const GCControllerPlayerIndex: {
  IndexUnset: -1,
  Index1: 0,
  Index2: 1,
  Index3: 2,
  Index4: 3,
};

declare const GCTouchState: {
  Up: 0,
  Down: 1,
  Moving: 2,
};

declare const GCSystemGestureState: {
  Enabled: 0,
  AlwaysReceive: 1,
  Disabled: 2,
};

declare const GCDevicePhysicalInputElementChange: {
  UnknownChange: -1,
  NoChange: 0,
  Changed: 1,
};

declare const GCDeviceBatteryState: {
  Unknown: -1,
  Discharging: 0,
  Charging: 1,
  Full: 2,
};

declare const GCPhysicalInputSourceDirection: {
  NotApplicable: 0,
  Up: 1,
  Right: 2,
  Down: 4,
  Left: 8,
};

declare class GCMicroGamepadSnapshotData {
  constructor(init?: GCMicroGamepadSnapshotData);
  version: number;
  size: number;
  dpadX: number;
  dpadY: number;
  buttonA: number;
  buttonX: number;
}

declare class GCExtendedGamepadSnapShotDataV100 {
  constructor(init?: GCExtendedGamepadSnapShotDataV100);
  version: number;
  size: number;
  dpadX: number;
  dpadY: number;
  buttonA: number;
  buttonB: number;
  buttonX: number;
  buttonY: number;
  leftShoulder: number;
  rightShoulder: number;
  leftThumbstickX: number;
  leftThumbstickY: number;
  rightThumbstickX: number;
  rightThumbstickY: number;
  leftTrigger: number;
  rightTrigger: number;
}

declare class GCExtendedGamepadSnapshotData {
  constructor(init?: GCExtendedGamepadSnapshotData);
  version: number;
  size: number;
  dpadX: number;
  dpadY: number;
  buttonA: number;
  buttonB: number;
  buttonX: number;
  buttonY: number;
  leftShoulder: number;
  rightShoulder: number;
  leftThumbstickX: number;
  leftThumbstickY: number;
  rightThumbstickX: number;
  rightThumbstickY: number;
  leftTrigger: number;
  rightTrigger: number;
}

declare class GCRotationRate {
  constructor(init?: GCRotationRate);
  x: number;
  y: number;
  z: number;
}

declare class GCAcceleration {
  constructor(init?: GCAcceleration);
  x: number;
  y: number;
  z: number;
}

declare class GCDualSenseAdaptiveTriggerPositionalResistiveStrengths {
  constructor(init?: GCDualSenseAdaptiveTriggerPositionalResistiveStrengths);
  values: unknown /* const array */;
}

declare class GCPoint2 {
  constructor(init?: GCPoint2);
  x: number;
  y: number;
}

declare class GCGamepadSnapShotDataV100 {
  constructor(init?: GCGamepadSnapShotDataV100);
  version: number;
  size: number;
  dpadX: number;
  dpadY: number;
  buttonA: number;
  buttonB: number;
  buttonX: number;
  buttonY: number;
  leftShoulder: number;
  rightShoulder: number;
}

declare class GCQuaternion {
  constructor(init?: GCQuaternion);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class GCDualSenseAdaptiveTriggerPositionalAmplitudes {
  constructor(init?: GCDualSenseAdaptiveTriggerPositionalAmplitudes);
  values: unknown /* const array */;
}

declare class GCMicroGamepadSnapShotDataV100 {
  constructor(init?: GCMicroGamepadSnapShotDataV100);
  version: number;
  size: number;
  dpadX: number;
  dpadY: number;
  buttonA: number;
  buttonX: number;
}

declare class GCEulerAngles {
  constructor(init?: GCEulerAngles);
  pitch: number;
  yaw: number;
  roll: number;
}

declare function NSStringFromGCPoint2(point: GCPoint2): string;

declare function GCInputBackLeftButton(position: number): string;

declare function GCInputBackRightButton(position: number): string;

declare interface GCDirectionPadElementName extends GCPhysicalInputElementName {
}

declare class GCDirectionPadElementName extends NativeObject implements GCDirectionPadElementName {
}

declare interface GCSwitchElementName extends GCPhysicalInputElementName {
}

declare class GCSwitchElementName extends NativeObject implements GCSwitchElementName {
}

declare interface GCAxisElementName extends GCPhysicalInputElementName {
}

declare class GCAxisElementName extends NativeObject implements GCAxisElementName {
}

declare interface GCButtonElementName extends GCPhysicalInputElementName {
}

declare class GCButtonElementName extends NativeObject implements GCButtonElementName {
}

declare interface GCPhysicalInputElementName {
}

declare class GCPhysicalInputElementName extends NativeObject implements GCPhysicalInputElementName {
}

declare interface GCAxis2DInput extends NSObject {
  valueDidChangeHandler: (p1: GCPhysicalInputElement, p2: GCAxis2DInput, p3: GCPoint2) => void;

  readonly value: GCPoint2;

  readonly isAnalog: boolean;

  readonly canWrap: boolean;

  readonly lastValueTimestamp: number;

  readonly lastValueLatency: number;

  readonly sources: NSSet;
}

declare class GCAxis2DInput extends NativeObject implements GCAxis2DInput {
}

declare interface GCPhysicalInputElement extends NSObject {
  readonly aliases: NSSet;

  readonly localizedName: string;

  readonly sfSymbolsName: string;
}

declare class GCPhysicalInputElement extends NativeObject implements GCPhysicalInputElement {
}

declare class GCEventInteraction extends NSObject implements UIInteraction {
  init(): this;

  handledEventTypes: interop.Enum<typeof GCUIEventTypes>;

  readonly view: interop.Object;

  willMoveToView(view: interop.Object | null): void;

  didMoveToView(view: interop.Object | null): void;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  isProxy(): boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  zone(): interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}


/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Foundation.d.ts" />
/// <reference path="./Runtime.d.ts" />

declare interface SBApplicationDelegate {
  eventDidFailWithError(event: interop.PointerConvertible, error: NSError): interop.Object;
}

declare class SBApplicationDelegate extends NativeObject implements SBApplicationDelegate {
}

declare class SBElementArray<ObjectType = interop.Object> extends NSMutableArray {
  objectWithName(name: string): ObjectType;

  objectWithID(identifier: interop.Object): ObjectType;

  objectAtLocation(location: interop.Object): ObjectType;

  arrayByApplyingSelector(selector: string): NSArray;

  arrayByApplyingSelectorWithObject(aSelector: string, argument: interop.Object): NSArray;

  get(): NSArray;
}

declare class SBApplication extends SBObject implements NSCoding {
  initWithBundleIdentifier(ident: string): this;

  initWithURL(url: NSURL): this;

  initWithProcessIdentifier(pid: number): this;

  static applicationWithBundleIdentifier(ident: string): SBApplication;

  static applicationWithURL(url: NSURL): SBApplication;

  static applicationWithProcessIdentifier(pid: number): SBApplication;

  classForScriptingClass(className: string): interop.Object;

  readonly running: boolean;

  activate(): void;

  delegate: SBApplicationDelegate;

  launchFlags: interop.Enum<typeof LSLaunchFlags>;

  sendMode: number;

  timeout: number;

  isRunning(): boolean;

  setDelegate(delegate: SBApplicationDelegate | null): void;

  setLaunchFlags(launchFlags: interop.Enum<typeof LSLaunchFlags>): void;

  setSendMode(sendMode: number): void;

  setTimeout(timeout: number): void;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SBObject extends NSObject implements NSCoding {
  init(): this;

  initWithProperties(properties: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): this;

  initWithData(data: interop.Object): this;

  get(): interop.Object;

  lastError(): NSError;

  initWithElementCodePropertiesData(code: number, properties: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, data: interop.Object | null): this;

  propertyWithCode(code: number): SBObject;

  propertyWithClassCode(cls: interop.Object, code: number): SBObject;

  elementArrayWithCode(code: number): SBElementArray;

  sendEventIdParameters(eventClass: number, eventID: number, firstParamCode: number): interop.Object;

  setTo(value: interop.Object | null): void;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}


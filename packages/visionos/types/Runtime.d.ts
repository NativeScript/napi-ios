/// <reference types="@nativescript/objc-node-api" />

declare class simd_float4x3 {
  constructor(init?: simd_float4x3);
  columns: unknown /* const array */;
}

declare class simd_float3x3 {
  constructor(init?: simd_float3x3);
  columns: unknown /* const array */;
}

declare interface NSObject {
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

  readonly debugDescription?: string;
}

declare class NSObject extends NativeObject implements NSObject {
}

declare class OS_object extends NSObject {
  init(): this;
}

declare class OS_os_workgroup extends OS_object {
  init(): this;
}


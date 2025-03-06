/// <reference types="@nativescript/objc-node-api" />

declare const CAToneMapModeNever: string;

declare const CAToneMapModeAutomatic: string;

declare const CAToneMapModeIfSupported: string;

declare interface CAMetalDrawable extends MTLDrawable {
  readonly texture: MTLTexture;

  readonly layer: interop.Object;
}

declare class CAMetalDrawable extends NativeObject implements CAMetalDrawable {
}


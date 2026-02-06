/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const MTLFXSpatialScalerColorProcessingMode: {
  Perceptual: 0,
  Linear: 1,
  HDR: 2,
};

declare interface MTLFXTemporalScalerBase extends MTLFXFrameInterpolatableScaler {
  readonly colorTextureUsage: interop.Enum<typeof MTLTextureUsage>;

  readonly depthTextureUsage: interop.Enum<typeof MTLTextureUsage>;

  readonly motionTextureUsage: interop.Enum<typeof MTLTextureUsage>;

  readonly reactiveTextureUsage: interop.Enum<typeof MTLTextureUsage>;

  readonly outputTextureUsage: interop.Enum<typeof MTLTextureUsage>;

  inputContentWidth: number;

  inputContentHeight: number;

  colorTexture: MTLTexture;

  depthTexture: MTLTexture;

  motionTexture: MTLTexture;

  outputTexture: MTLTexture;

  exposureTexture: MTLTexture;

  reactiveMaskTexture: MTLTexture;

  preExposure: number;

  jitterOffsetX: number;

  jitterOffsetY: number;

  motionVectorScaleX: number;

  motionVectorScaleY: number;

  reset: boolean;

  depthReversed: boolean;

  readonly colorTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  readonly depthTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  readonly motionTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  readonly reactiveMaskTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  readonly outputTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  readonly inputWidth: number;

  readonly inputHeight: number;

  readonly outputWidth: number;

  readonly outputHeight: number;

  readonly inputContentMinScale: number;

  readonly inputContentMaxScale: number;

  fence: MTLFence;

  setInputContentWidth(inputContentWidth: number): void;

  setInputContentHeight(inputContentHeight: number): void;

  setColorTexture(colorTexture: MTLTexture | null): void;

  setDepthTexture(depthTexture: MTLTexture | null): void;

  setMotionTexture(motionTexture: MTLTexture | null): void;

  setOutputTexture(outputTexture: MTLTexture | null): void;

  setExposureTexture(exposureTexture: MTLTexture | null): void;

  setReactiveMaskTexture(reactiveMaskTexture: MTLTexture | null): void;

  setPreExposure(preExposure: number): void;

  setJitterOffsetX(jitterOffsetX: number): void;

  setJitterOffsetY(jitterOffsetY: number): void;

  setMotionVectorScaleX(motionVectorScaleX: number): void;

  setMotionVectorScaleY(motionVectorScaleY: number): void;

  setReset(reset: boolean): void;

  isDepthReversed(): boolean;

  setDepthReversed(depthReversed: boolean): void;

  setFence(fence: MTLFence | null): void;
}

declare class MTLFXTemporalScalerBase extends NativeObject implements MTLFXTemporalScalerBase {
}

declare interface MTLFXFrameInterpolatableScaler extends NSObjectProtocol {
}

declare class MTLFXFrameInterpolatableScaler extends NativeObject implements MTLFXFrameInterpolatableScaler {
}

declare interface MTLFXSpatialScaler extends MTLFXSpatialScalerBase {
  encodeToCommandBuffer(commandBuffer: MTLCommandBuffer): void;
}

declare class MTLFXSpatialScaler extends NativeObject implements MTLFXSpatialScaler {
}

declare interface MTLFXSpatialScalerBase extends NSObjectProtocol {
  readonly colorTextureUsage: interop.Enum<typeof MTLTextureUsage>;

  readonly outputTextureUsage: interop.Enum<typeof MTLTextureUsage>;

  inputContentWidth: number;

  inputContentHeight: number;

  colorTexture: MTLTexture;

  outputTexture: MTLTexture;

  readonly colorTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  readonly outputTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  readonly inputWidth: number;

  readonly inputHeight: number;

  readonly outputWidth: number;

  readonly outputHeight: number;

  readonly colorProcessingMode: interop.Enum<typeof MTLFXSpatialScalerColorProcessingMode>;

  fence: MTLFence;

  setInputContentWidth(inputContentWidth: number): void;

  setInputContentHeight(inputContentHeight: number): void;

  setColorTexture(colorTexture: MTLTexture | null): void;

  setOutputTexture(outputTexture: MTLTexture | null): void;

  setFence(fence: MTLFence | null): void;
}

declare class MTLFXSpatialScalerBase extends NativeObject implements MTLFXSpatialScalerBase {
}

declare interface MTL4FXSpatialScaler extends MTLFXSpatialScalerBase {
  encodeToCommandBuffer(commandBuffer: MTL4CommandBuffer): void;
}

declare class MTL4FXSpatialScaler extends NativeObject implements MTL4FXSpatialScaler {
}

declare class MTLFXSpatialScalerDescriptor extends NSObject implements NSCopying {
  colorTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  outputTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  inputWidth: number;

  inputHeight: number;

  outputWidth: number;

  outputHeight: number;

  colorProcessingMode: interop.Enum<typeof MTLFXSpatialScalerColorProcessingMode>;

  newSpatialScalerWithDevice(device: MTLDevice): MTLFXSpatialScaler;

  newSpatialScalerWithDeviceCompiler(device: MTLDevice, compiler: MTL4Compiler): MTL4FXSpatialScaler;

  static supportsMetal4FX(device: MTLDevice): boolean;

  static supportsDevice(device: MTLDevice): boolean;

  setColorTextureFormat(colorTextureFormat: interop.Enum<typeof MTLPixelFormat>): void;

  setOutputTextureFormat(outputTextureFormat: interop.Enum<typeof MTLPixelFormat>): void;

  setInputWidth(inputWidth: number): void;

  setInputHeight(inputHeight: number): void;

  setOutputWidth(outputWidth: number): void;

  setOutputHeight(outputHeight: number): void;

  setColorProcessingMode(colorProcessingMode: interop.Enum<typeof MTLFXSpatialScalerColorProcessingMode>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}


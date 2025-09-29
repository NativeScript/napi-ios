/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const MTLFXSpatialScalerColorProcessingMode: {
  Perceptual: 0,
  Linear: 1,
  HDR: 2,
};

declare interface MTLFXTemporalScaler extends NSObjectProtocol {
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

  readonly outputTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  readonly inputWidth: number;

  readonly inputHeight: number;

  readonly outputWidth: number;

  readonly outputHeight: number;

  readonly inputContentMinScale: number;

  readonly inputContentMaxScale: number;

  fence: MTLFence;

  encodeToCommandBuffer(commandBuffer: MTLCommandBuffer): void;

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

declare class MTLFXTemporalScaler extends NativeObject implements MTLFXTemporalScaler {
}

declare interface MTLFXSpatialScaler extends NSObjectProtocol {
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

  encodeToCommandBuffer(commandBuffer: MTLCommandBuffer): void;

  setInputContentWidth(inputContentWidth: number): void;

  setInputContentHeight(inputContentHeight: number): void;

  setColorTexture(colorTexture: MTLTexture | null): void;

  setOutputTexture(outputTexture: MTLTexture | null): void;

  setFence(fence: MTLFence | null): void;
}

declare class MTLFXSpatialScaler extends NativeObject implements MTLFXSpatialScaler {
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

declare class MTLFXTemporalScalerDescriptor extends NSObject implements NSCopying {
  colorTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  depthTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  motionTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  outputTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  inputWidth: number;

  inputHeight: number;

  outputWidth: number;

  outputHeight: number;

  autoExposureEnabled: boolean;

  requiresSynchronousInitialization: boolean;

  inputContentPropertiesEnabled: boolean;

  inputContentMinScale: number;

  inputContentMaxScale: number;

  reactiveMaskTextureEnabled: boolean;

  reactiveMaskTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  newTemporalScalerWithDevice(device: MTLDevice): MTLFXTemporalScaler;

  static supportedInputContentMinScaleForDevice(device: MTLDevice): number;

  static supportedInputContentMaxScaleForDevice(device: MTLDevice): number;

  static supportsDevice(device: MTLDevice): boolean;

  setColorTextureFormat(colorTextureFormat: interop.Enum<typeof MTLPixelFormat>): void;

  setDepthTextureFormat(depthTextureFormat: interop.Enum<typeof MTLPixelFormat>): void;

  setMotionTextureFormat(motionTextureFormat: interop.Enum<typeof MTLPixelFormat>): void;

  setOutputTextureFormat(outputTextureFormat: interop.Enum<typeof MTLPixelFormat>): void;

  setInputWidth(inputWidth: number): void;

  setInputHeight(inputHeight: number): void;

  setOutputWidth(outputWidth: number): void;

  setOutputHeight(outputHeight: number): void;

  isAutoExposureEnabled(): boolean;

  setAutoExposureEnabled(autoExposureEnabled: boolean): void;

  setRequiresSynchronousInitialization(requiresSynchronousInitialization: boolean): void;

  isInputContentPropertiesEnabled(): boolean;

  setInputContentPropertiesEnabled(inputContentPropertiesEnabled: boolean): void;

  setInputContentMinScale(inputContentMinScale: number): void;

  setInputContentMaxScale(inputContentMaxScale: number): void;

  isReactiveMaskTextureEnabled(): boolean;

  setReactiveMaskTextureEnabled(reactiveMaskTextureEnabled: boolean): void;

  setReactiveMaskTextureFormat(reactiveMaskTextureFormat: interop.Enum<typeof MTLPixelFormat>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}


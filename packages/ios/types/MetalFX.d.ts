/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const MTLFXSpatialScalerColorProcessingMode: {
  Perceptual: 0,
  Linear: 1,
  HDR: 2,
};

declare interface MTL4FXTemporalDenoisedScaler extends MTLFXTemporalDenoisedScalerBase {
  encodeToCommandBuffer(commandBuffer: MTL4CommandBuffer): void;
}

declare class MTL4FXTemporalDenoisedScaler extends NativeObject implements MTL4FXTemporalDenoisedScaler {
}

declare interface MTL4FXTemporalScaler extends MTLFXTemporalScalerBase {
  encodeToCommandBuffer(commandBuffer: MTL4CommandBuffer): void;
}

declare class MTL4FXTemporalScaler extends NativeObject implements MTL4FXTemporalScaler {
}

declare interface MTLFXSpatialScaler extends MTLFXSpatialScalerBase {
  encodeToCommandBuffer(commandBuffer: MTLCommandBuffer): void;
}

declare class MTLFXSpatialScaler extends NativeObject implements MTLFXSpatialScaler {
}

declare interface MTLFXTemporalDenoisedScaler extends MTLFXTemporalDenoisedScalerBase {
  encodeToCommandBuffer(commandBuffer: MTLCommandBuffer): void;
}

declare class MTLFXTemporalDenoisedScaler extends NativeObject implements MTLFXTemporalDenoisedScaler {
}

declare interface MTLFXTemporalDenoisedScalerBase extends MTLFXFrameInterpolatableScaler {
  readonly colorTextureUsage: interop.Enum<typeof MTLTextureUsage>;

  readonly depthTextureUsage: interop.Enum<typeof MTLTextureUsage>;

  readonly motionTextureUsage: interop.Enum<typeof MTLTextureUsage>;

  readonly reactiveTextureUsage: interop.Enum<typeof MTLTextureUsage>;

  readonly diffuseAlbedoTextureUsage: interop.Enum<typeof MTLTextureUsage>;

  readonly specularAlbedoTextureUsage: interop.Enum<typeof MTLTextureUsage>;

  readonly normalTextureUsage: interop.Enum<typeof MTLTextureUsage>;

  readonly roughnessTextureUsage: interop.Enum<typeof MTLTextureUsage>;

  readonly specularHitDistanceTextureUsage: interop.Enum<typeof MTLTextureUsage>;

  readonly denoiseStrengthMaskTextureUsage: interop.Enum<typeof MTLTextureUsage>;

  readonly transparencyOverlayTextureUsage: interop.Enum<typeof MTLTextureUsage>;

  readonly outputTextureUsage: interop.Enum<typeof MTLTextureUsage>;

  colorTexture: MTLTexture;

  depthTexture: MTLTexture;

  motionTexture: MTLTexture;

  diffuseAlbedoTexture: MTLTexture;

  specularAlbedoTexture: MTLTexture;

  normalTexture: MTLTexture;

  roughnessTexture: MTLTexture;

  specularHitDistanceTexture: MTLTexture;

  denoiseStrengthMaskTexture: MTLTexture;

  transparencyOverlayTexture: MTLTexture;

  outputTexture: MTLTexture;

  exposureTexture: MTLTexture;

  preExposure: number;

  reactiveMaskTexture: MTLTexture;

  jitterOffsetX: number;

  jitterOffsetY: number;

  motionVectorScaleX: number;

  motionVectorScaleY: number;

  shouldResetHistory: boolean;

  depthReversed: boolean;

  readonly colorTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  readonly depthTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  readonly motionTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  readonly diffuseAlbedoTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  readonly specularAlbedoTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  readonly normalTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  readonly roughnessTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  readonly specularHitDistanceTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  readonly denoiseStrengthMaskTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  readonly transparencyOverlayTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  readonly reactiveMaskTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  readonly outputTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  readonly inputWidth: number;

  readonly inputHeight: number;

  readonly outputWidth: number;

  readonly outputHeight: number;

  readonly inputContentMinScale: number;

  readonly inputContentMaxScale: number;

  worldToViewMatrix: simd_float4x4;

  viewToClipMatrix: simd_float4x4;

  fence: MTLFence;

  setColorTexture(colorTexture: MTLTexture | null): void;

  setDepthTexture(depthTexture: MTLTexture | null): void;

  setMotionTexture(motionTexture: MTLTexture | null): void;

  setDiffuseAlbedoTexture(diffuseAlbedoTexture: MTLTexture | null): void;

  setSpecularAlbedoTexture(specularAlbedoTexture: MTLTexture | null): void;

  setNormalTexture(normalTexture: MTLTexture | null): void;

  setRoughnessTexture(roughnessTexture: MTLTexture | null): void;

  setSpecularHitDistanceTexture(specularHitDistanceTexture: MTLTexture | null): void;

  setDenoiseStrengthMaskTexture(denoiseStrengthMaskTexture: MTLTexture | null): void;

  setTransparencyOverlayTexture(transparencyOverlayTexture: MTLTexture | null): void;

  setOutputTexture(outputTexture: MTLTexture | null): void;

  setExposureTexture(exposureTexture: MTLTexture | null): void;

  setPreExposure(preExposure: number): void;

  setReactiveMaskTexture(reactiveMaskTexture: MTLTexture | null): void;

  setJitterOffsetX(jitterOffsetX: number): void;

  setJitterOffsetY(jitterOffsetY: number): void;

  setMotionVectorScaleX(motionVectorScaleX: number): void;

  setMotionVectorScaleY(motionVectorScaleY: number): void;

  setShouldResetHistory(shouldResetHistory: boolean): void;

  isDepthReversed(): boolean;

  setDepthReversed(depthReversed: boolean): void;

  setWorldToViewMatrix(worldToViewMatrix: simd_float4x4): void;

  setViewToClipMatrix(viewToClipMatrix: simd_float4x4): void;

  setFence(fence: MTLFence | null): void;
}

declare class MTLFXTemporalDenoisedScalerBase extends NativeObject implements MTLFXTemporalDenoisedScalerBase {
}

declare interface MTLFXTemporalScaler extends MTLFXTemporalScalerBase {
  encodeToCommandBuffer(commandBuffer: MTLCommandBuffer): void;
}

declare class MTLFXTemporalScaler extends NativeObject implements MTLFXTemporalScaler {
}

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

declare interface MTLFXFrameInterpolatorBase extends NSObjectProtocol {
  readonly colorTextureUsage: interop.Enum<typeof MTLTextureUsage>;

  readonly outputTextureUsage: interop.Enum<typeof MTLTextureUsage>;

  readonly depthTextureUsage: interop.Enum<typeof MTLTextureUsage>;

  readonly motionTextureUsage: interop.Enum<typeof MTLTextureUsage>;

  readonly uiTextureUsage: interop.Enum<typeof MTLTextureUsage>;

  readonly colorTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  readonly depthTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  readonly motionTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  readonly outputTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  readonly inputWidth: number;

  readonly inputHeight: number;

  readonly outputWidth: number;

  readonly outputHeight: number;

  readonly uiTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  colorTexture: MTLTexture;

  prevColorTexture: MTLTexture;

  depthTexture: MTLTexture;

  motionTexture: MTLTexture;

  motionVectorScaleX: number;

  motionVectorScaleY: number;

  deltaTime: number;

  nearPlane: number;

  farPlane: number;

  fieldOfView: number;

  aspectRatio: number;

  uiTexture: MTLTexture;

  jitterOffsetX: number;

  jitterOffsetY: number;

  uiTextureComposited: boolean;

  shouldResetHistory: boolean;

  outputTexture: MTLTexture;

  fence: MTLFence;

  depthReversed: boolean;

  setColorTexture(colorTexture: MTLTexture | null): void;

  setPrevColorTexture(prevColorTexture: MTLTexture | null): void;

  setDepthTexture(depthTexture: MTLTexture | null): void;

  setMotionTexture(motionTexture: MTLTexture | null): void;

  setMotionVectorScaleX(motionVectorScaleX: number): void;

  setMotionVectorScaleY(motionVectorScaleY: number): void;

  setDeltaTime(deltaTime: number): void;

  setNearPlane(nearPlane: number): void;

  setFarPlane(farPlane: number): void;

  setFieldOfView(fieldOfView: number): void;

  setAspectRatio(aspectRatio: number): void;

  setUITexture(uiTexture: MTLTexture | null): void;

  setJitterOffsetX(jitterOffsetX: number): void;

  setJitterOffsetY(jitterOffsetY: number): void;

  isUITextureComposited(): boolean;

  setIsUITextureComposited(uiTextureComposited: boolean): void;

  setShouldResetHistory(shouldResetHistory: boolean): void;

  setOutputTexture(outputTexture: MTLTexture | null): void;

  setFence(fence: MTLFence | null): void;

  isDepthReversed(): boolean;

  setDepthReversed(depthReversed: boolean): void;
}

declare class MTLFXFrameInterpolatorBase extends NativeObject implements MTLFXFrameInterpolatorBase {
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

declare interface MTLFXFrameInterpolator extends MTLFXFrameInterpolatorBase {
  encodeToCommandBuffer(commandBuffer: MTLCommandBuffer): void;
}

declare class MTLFXFrameInterpolator extends NativeObject implements MTLFXFrameInterpolator {
}

declare interface MTL4FXFrameInterpolator extends MTLFXFrameInterpolatorBase {
  encodeToCommandBuffer(commandBuffer: MTL4CommandBuffer): void;
}

declare class MTL4FXFrameInterpolator extends NativeObject implements MTL4FXFrameInterpolator {
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

declare class MTLFXTemporalDenoisedScalerDescriptor extends NSObject implements NSCopying {
  colorTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  depthTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  motionTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  diffuseAlbedoTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  specularAlbedoTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  normalTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  roughnessTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  specularHitDistanceTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  denoiseStrengthMaskTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  transparencyOverlayTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  outputTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  inputWidth: number;

  inputHeight: number;

  outputWidth: number;

  outputHeight: number;

  requiresSynchronousInitialization: boolean;

  autoExposureEnabled: boolean;

  reactiveMaskTextureEnabled: boolean;

  reactiveMaskTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  specularHitDistanceTextureEnabled: boolean;

  denoiseStrengthMaskTextureEnabled: boolean;

  transparencyOverlayTextureEnabled: boolean;

  newTemporalDenoisedScalerWithDevice(device: MTLDevice): MTLFXTemporalDenoisedScaler;

  newTemporalDenoisedScalerWithDeviceCompiler(device: MTLDevice, compiler: MTL4Compiler): MTL4FXTemporalDenoisedScaler;

  static supportedInputContentMinScaleForDevice(device: MTLDevice): number;

  static supportedInputContentMaxScaleForDevice(device: MTLDevice): number;

  static supportsMetal4FX(device: MTLDevice): boolean;

  static supportsDevice(device: MTLDevice): boolean;

  setColorTextureFormat(colorTextureFormat: interop.Enum<typeof MTLPixelFormat>): void;

  setDepthTextureFormat(depthTextureFormat: interop.Enum<typeof MTLPixelFormat>): void;

  setMotionTextureFormat(motionTextureFormat: interop.Enum<typeof MTLPixelFormat>): void;

  setDiffuseAlbedoTextureFormat(diffuseAlbedoTextureFormat: interop.Enum<typeof MTLPixelFormat>): void;

  setSpecularAlbedoTextureFormat(specularAlbedoTextureFormat: interop.Enum<typeof MTLPixelFormat>): void;

  setNormalTextureFormat(normalTextureFormat: interop.Enum<typeof MTLPixelFormat>): void;

  setRoughnessTextureFormat(roughnessTextureFormat: interop.Enum<typeof MTLPixelFormat>): void;

  setSpecularHitDistanceTextureFormat(specularHitDistanceTextureFormat: interop.Enum<typeof MTLPixelFormat>): void;

  setDenoiseStrengthMaskTextureFormat(denoiseStrengthMaskTextureFormat: interop.Enum<typeof MTLPixelFormat>): void;

  setTransparencyOverlayTextureFormat(transparencyOverlayTextureFormat: interop.Enum<typeof MTLPixelFormat>): void;

  setOutputTextureFormat(outputTextureFormat: interop.Enum<typeof MTLPixelFormat>): void;

  setInputWidth(inputWidth: number): void;

  setInputHeight(inputHeight: number): void;

  setOutputWidth(outputWidth: number): void;

  setOutputHeight(outputHeight: number): void;

  setRequiresSynchronousInitialization(requiresSynchronousInitialization: boolean): void;

  isAutoExposureEnabled(): boolean;

  setAutoExposureEnabled(autoExposureEnabled: boolean): void;

  isReactiveMaskTextureEnabled(): boolean;

  setReactiveMaskTextureEnabled(reactiveMaskTextureEnabled: boolean): void;

  setReactiveMaskTextureFormat(reactiveMaskTextureFormat: interop.Enum<typeof MTLPixelFormat>): void;

  isSpecularHitDistanceTextureEnabled(): boolean;

  setSpecularHitDistanceTextureEnabled(specularHitDistanceTextureEnabled: boolean): void;

  isDenoiseStrengthMaskTextureEnabled(): boolean;

  setDenoiseStrengthMaskTextureEnabled(denoiseStrengthMaskTextureEnabled: boolean): void;

  isTransparencyOverlayTextureEnabled(): boolean;

  setTransparencyOverlayTextureEnabled(transparencyOverlayTextureEnabled: boolean): void;

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

  newTemporalScalerWithDeviceCompiler(device: MTLDevice, compiler: MTL4Compiler): MTL4FXTemporalScaler;

  static supportedInputContentMinScaleForDevice(device: MTLDevice): number;

  static supportedInputContentMaxScaleForDevice(device: MTLDevice): number;

  static supportsDevice(device: MTLDevice): boolean;

  static supportsMetal4FX(device: MTLDevice): boolean;

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

declare class MTLFXFrameInterpolatorDescriptor extends NSObject implements NSCopying {
  colorTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  outputTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  depthTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  motionTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  uiTextureFormat: interop.Enum<typeof MTLPixelFormat>;

  scaler: MTLFXFrameInterpolatableScaler;

  inputWidth: number;

  inputHeight: number;

  outputWidth: number;

  outputHeight: number;

  newFrameInterpolatorWithDevice(device: MTLDevice): MTLFXFrameInterpolator;

  newFrameInterpolatorWithDeviceCompiler(device: MTLDevice, compiler: MTL4Compiler): MTL4FXFrameInterpolator;

  static supportsMetal4FX(device: MTLDevice): boolean;

  static supportsDevice(device: MTLDevice): boolean;

  setColorTextureFormat(colorTextureFormat: interop.Enum<typeof MTLPixelFormat>): void;

  setOutputTextureFormat(outputTextureFormat: interop.Enum<typeof MTLPixelFormat>): void;

  setDepthTextureFormat(depthTextureFormat: interop.Enum<typeof MTLPixelFormat>): void;

  setMotionTextureFormat(motionTextureFormat: interop.Enum<typeof MTLPixelFormat>): void;

  setUITextureFormat(uiTextureFormat: interop.Enum<typeof MTLPixelFormat>): void;

  setScaler(scaler: MTLFXFrameInterpolatableScaler | null): void;

  setInputWidth(inputWidth: number): void;

  setInputHeight(inputHeight: number): void;

  setOutputWidth(outputWidth: number): void;

  setOutputHeight(outputHeight: number): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}


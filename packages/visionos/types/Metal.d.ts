/// <reference types="@nativescript/objc-node-api" />

declare const MTLTransformType: {
  PackedFloat4x3: 0,
  Component: 1,
};

declare const MTLMatrixLayout: {
  Column: 0,
  Row: 1,
};

declare const MTLIOCompressionMethod: {
  Zlib: 0,
  LZFSE: 1,
  LZ4: 2,
  LZMA: 3,
  LZBitmap: 4,
};

declare const MTLBindingAccess: {
  ReadOnly: 0,
  ReadWrite: 1,
  WriteOnly: 2,
};

declare const MTLMathFloatingPointFunctions: {
  Fast: 0,
  Precise: 1,
};

declare const MTLMathMode: {
  Safe: 0,
  Relaxed: 1,
  Fast: 2,
};

declare const MTLFunctionLogType: {
  MTLFunctionLogTypeValidation: 0,
};

declare class MTLSamplePosition {
  constructor(init?: MTLSamplePosition);
  x: number;
  y: number;
}

declare class MTLViewport {
  constructor(init?: MTLViewport);
  originX: number;
  originY: number;
  width: number;
  height: number;
  znear: number;
  zfar: number;
}

declare class MTLIndirectAccelerationStructureInstanceDescriptor {
  constructor(init?: MTLIndirectAccelerationStructureInstanceDescriptor);
  transformationMatrix: _MTLPackedFloat4x3;
  options: interop.Enum<typeof MTLAccelerationStructureInstanceOptions>;
  mask: number;
  intersectionFunctionTableOffset: number;
  userID: number;
  accelerationStructureID: MTLResourceID;
}

declare class MTLAccelerationStructureMotionInstanceDescriptor {
  constructor(init?: MTLAccelerationStructureMotionInstanceDescriptor);
  options: interop.Enum<typeof MTLAccelerationStructureInstanceOptions>;
  mask: number;
  intersectionFunctionTableOffset: number;
  accelerationStructureIndex: number;
  userID: number;
  motionTransformsStartIndex: number;
  motionTransformsCount: number;
  motionStartBorderMode: interop.Enum<typeof MTLMotionBorderMode>;
  motionEndBorderMode: interop.Enum<typeof MTLMotionBorderMode>;
  motionStartTime: number;
  motionEndTime: number;
}

declare class MTLAccelerationStructureUserIDInstanceDescriptor {
  constructor(init?: MTLAccelerationStructureUserIDInstanceDescriptor);
  transformationMatrix: _MTLPackedFloat4x3;
  options: interop.Enum<typeof MTLAccelerationStructureInstanceOptions>;
  mask: number;
  intersectionFunctionTableOffset: number;
  accelerationStructureIndex: number;
  userID: number;
}

declare class MTLComponentTransform {
  constructor(init?: MTLComponentTransform);
  scale: _MTLPackedFloat3;
  shear: _MTLPackedFloat3;
  pivot: _MTLPackedFloat3;
  rotation: MTLPackedFloatQuaternion;
  translation: _MTLPackedFloat3;
}

declare class _MTLPackedFloat4x3 {
  constructor(init?: _MTLPackedFloat4x3);
  columns: unknown /* const array */;
}

declare class unnamed_17262190234792335221 {
  constructor(init?: unnamed_17262190234792335221);
  x: number;
  y: number;
  z: number;
}

declare class _MTLPackedFloat3 {
  constructor(init?: _MTLPackedFloat3);
}

declare class MTLQuadTessellationFactorsHalf {
  constructor(init?: MTLQuadTessellationFactorsHalf);
  edgeTessellationFactor: unknown /* const array */;
  insideTessellationFactor: unknown /* const array */;
}

declare class MTLDrawPatchIndirectArguments {
  constructor(init?: MTLDrawPatchIndirectArguments);
  patchCount: number;
  instanceCount: number;
  patchStart: number;
  baseInstance: number;
}

declare class MTLVertexAmplificationViewMapping {
  constructor(init?: MTLVertexAmplificationViewMapping);
  viewportArrayIndexOffset: number;
  renderTargetArrayIndexOffset: number;
}

declare class MTLDrawIndexedPrimitivesIndirectArguments {
  constructor(init?: MTLDrawIndexedPrimitivesIndirectArguments);
  indexCount: number;
  instanceCount: number;
  indexStart: number;
  baseVertex: number;
  baseInstance: number;
}

declare class MTLDrawPrimitivesIndirectArguments {
  constructor(init?: MTLDrawPrimitivesIndirectArguments);
  vertexCount: number;
  instanceCount: number;
  vertexStart: number;
  baseInstance: number;
}

declare class MTLScissorRect {
  constructor(init?: MTLScissorRect);
  x: number;
  y: number;
  width: number;
  height: number;
}

declare class MTLDispatchThreadgroupsIndirectArguments {
  constructor(init?: MTLDispatchThreadgroupsIndirectArguments);
  threadgroupsPerGrid: unknown /* const array */;
}

declare class MTLTriangleTessellationFactorsHalf {
  constructor(init?: MTLTriangleTessellationFactorsHalf);
  edgeTessellationFactor: unknown /* const array */;
  insideTessellationFactor: number;
}

declare class MTLMapIndirectArguments {
  constructor(init?: MTLMapIndirectArguments);
  regionOriginX: number;
  regionOriginY: number;
  regionOriginZ: number;
  regionSizeWidth: number;
  regionSizeHeight: number;
  regionSizeDepth: number;
  mipMapLevel: number;
  sliceId: number;
}

declare class MTLAccelerationStructureSizes {
  constructor(init?: MTLAccelerationStructureSizes);
  accelerationStructureSize: number;
  buildScratchBufferSize: number;
  refitScratchBufferSize: number;
}

declare class MTLCounterResultStatistic {
  constructor(init?: MTLCounterResultStatistic);
  tessellationInputPatches: number;
  vertexInvocations: number;
  postTessellationVertexInvocations: number;
  clipperInvocations: number;
  clipperPrimitivesOut: number;
  fragmentInvocations: number;
  fragmentsPassed: number;
  computeKernelInvocations: number;
}

declare class MTLCounterResultStageUtilization {
  constructor(init?: MTLCounterResultStageUtilization);
  totalCycles: number;
  vertexCycles: number;
  tessellationCycles: number;
  postTessellationVertexCycles: number;
  fragmentCycles: number;
  renderTargetCycles: number;
}

declare class MTLCounterResultTimestamp {
  constructor(init?: MTLCounterResultTimestamp);
  timestamp: number;
}

declare class MTLSize {
  constructor(init?: MTLSize);
  width: number;
  height: number;
  depth: number;
}

declare class MTLSizeAndAlign {
  constructor(init?: MTLSizeAndAlign);
  size: number;
  align: number;
}

declare class MTLOrigin {
  constructor(init?: MTLOrigin);
  x: number;
  y: number;
  z: number;
}

declare class MTLTextureSwizzleChannels {
  constructor(init?: MTLTextureSwizzleChannels);
  red: interop.Enum<typeof MTLTextureSwizzle>;
  green: interop.Enum<typeof MTLTextureSwizzle>;
  blue: interop.Enum<typeof MTLTextureSwizzle>;
  alpha: interop.Enum<typeof MTLTextureSwizzle>;
}

declare class MTLPackedFloatQuaternion {
  constructor(init?: MTLPackedFloatQuaternion);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class _MTLAxisAlignedBoundingBox {
  constructor(init?: _MTLAxisAlignedBoundingBox);
  min: _MTLPackedFloat3;
  max: _MTLPackedFloat3;
}

declare class MTLClearColor {
  constructor(init?: MTLClearColor);
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

declare class MTLRegion {
  constructor(init?: MTLRegion);
  origin: MTLOrigin;
  size: MTLSize;
}

declare class MTLAccelerationStructureInstanceDescriptor {
  constructor(init?: MTLAccelerationStructureInstanceDescriptor);
  transformationMatrix: _MTLPackedFloat4x3;
  options: interop.Enum<typeof MTLAccelerationStructureInstanceOptions>;
  mask: number;
  intersectionFunctionTableOffset: number;
  accelerationStructureIndex: number;
}

declare class MTLResourceID {
  constructor(init?: MTLResourceID);
  _impl: number;
}

declare class MTLStageInRegionIndirectArguments {
  constructor(init?: MTLStageInRegionIndirectArguments);
  stageInOrigin: unknown /* const array */;
  stageInSize: unknown /* const array */;
}

declare class MTLIndirectCommandBufferExecutionRange {
  constructor(init?: MTLIndirectCommandBufferExecutionRange);
  location: number;
  length: number;
}

declare class MTLIndirectAccelerationStructureMotionInstanceDescriptor {
  constructor(init?: MTLIndirectAccelerationStructureMotionInstanceDescriptor);
  options: interop.Enum<typeof MTLAccelerationStructureInstanceOptions>;
  mask: number;
  intersectionFunctionTableOffset: number;
  userID: number;
  accelerationStructureID: MTLResourceID;
  motionTransformsStartIndex: number;
  motionTransformsCount: number;
  motionStartBorderMode: interop.Enum<typeof MTLMotionBorderMode>;
  motionEndBorderMode: interop.Enum<typeof MTLMotionBorderMode>;
  motionStartTime: number;
  motionEndTime: number;
}

type unnamed_601878930693187590Descriptor = 
  | { elements: unknown /* const array */ };

declare class unnamed_601878930693187590 {
  constructor(init?: unnamed_601878930693187590Descriptor);
  elements: unknown /* const array */;
}

declare function MTLIOCompressionContextDefaultChunkSize(): number;

declare interface MTLCommandEncoder extends NSObject {
  readonly device: MTLDevice;

  label: string;

  endEncoding(): void;

  insertDebugSignpost(string: string): void;

  pushDebugGroup(string: string): void;

  popDebugGroup(): void;
}

declare class MTLCommandEncoder extends NativeObject implements MTLCommandEncoder {
}

declare interface MTLParallelRenderCommandEncoder extends MTLCommandEncoder {
  renderCommandEncoder(): MTLRenderCommandEncoder;
}

declare class MTLParallelRenderCommandEncoder extends NativeObject implements MTLParallelRenderCommandEncoder {
}

declare interface MTLFunction extends NSObject {
  readonly device: MTLDevice;

  readonly functionType: interop.Enum<typeof MTLFunctionType>;

  readonly vertexAttributes: NSArray;

  readonly name: string;
}

declare class MTLFunction extends NativeObject implements MTLFunction {
}

declare interface MTLRenderPipelineState extends NSObject {
  readonly label: string;

  readonly device: MTLDevice;
}

declare class MTLRenderPipelineState extends NativeObject implements MTLRenderPipelineState {
}

declare interface MTLSamplerState extends NSObject {
  readonly label: string;

  readonly device: MTLDevice;
}

declare class MTLSamplerState extends NativeObject implements MTLSamplerState {
}

declare interface MTLComputePipelineState extends NSObject {
  readonly device: MTLDevice;

  readonly maxTotalThreadsPerThreadgroup: number;

  readonly threadExecutionWidth: number;
}

declare class MTLComputePipelineState extends NativeObject implements MTLComputePipelineState {
}

declare interface MTLBlitCommandEncoder extends MTLCommandEncoder {
  copyFromTextureSourceSliceSourceLevelSourceOriginSourceSizeToTextureDestinationSliceDestinationLevelDestinationOrigin(sourceTexture: MTLTexture, sourceSlice: number, sourceLevel: number, sourceOrigin: MTLOrigin, sourceSize: MTLSize, destinationTexture: MTLTexture, destinationSlice: number, destinationLevel: number, destinationOrigin: MTLOrigin): void;

  copyFromBufferSourceOffsetSourceBytesPerRowSourceBytesPerImageSourceSizeToTextureDestinationSliceDestinationLevelDestinationOrigin(sourceBuffer: MTLBuffer, sourceOffset: number, sourceBytesPerRow: number, sourceBytesPerImage: number, sourceSize: MTLSize, destinationTexture: MTLTexture, destinationSlice: number, destinationLevel: number, destinationOrigin: MTLOrigin): void;

  copyFromTextureSourceSliceSourceLevelSourceOriginSourceSizeToBufferDestinationOffsetDestinationBytesPerRowDestinationBytesPerImage(sourceTexture: MTLTexture, sourceSlice: number, sourceLevel: number, sourceOrigin: MTLOrigin, sourceSize: MTLSize, destinationBuffer: MTLBuffer, destinationOffset: number, destinationBytesPerRow: number, destinationBytesPerImage: number): void;

  generateMipmapsForTexture(texture: MTLTexture): void;

  fillBufferRangeValue(buffer: MTLBuffer, range: _NSRange, value: number): void;

  copyFromBufferSourceOffsetToBufferDestinationOffsetSize(sourceBuffer: MTLBuffer, sourceOffset: number, destinationBuffer: MTLBuffer, destinationOffset: number, size: number): void;
}

declare class MTLBlitCommandEncoder extends NativeObject implements MTLBlitCommandEncoder {
}

declare interface MTLDrawable extends NSObject {
  present(): void;

  presentAtTime(presentationTime: number): void;
}

declare class MTLDrawable extends NativeObject implements MTLDrawable {
}

declare interface MTLHeap extends MTLAllocation {
  label: string;

  readonly device: MTLDevice;

  readonly storageMode: interop.Enum<typeof MTLStorageMode>;

  readonly cpuCacheMode: interop.Enum<typeof MTLCPUCacheMode>;

  readonly size: number;

  readonly usedSize: number;

  maxAvailableSizeWithAlignment(alignment: number): number;

  newBufferWithLengthOptions(length: number, options: interop.Enum<typeof MTLResourceOptions>): MTLBuffer;

  newTextureWithDescriptor(descriptor: interop.Object): MTLTexture;

  setPurgeableState(state: interop.Enum<typeof MTLPurgeableState>): interop.Enum<typeof MTLPurgeableState>;
}

declare class MTLHeap extends NativeObject implements MTLHeap {
}

declare interface MTLCommandQueue extends NSObject {
  label: string;

  readonly device: MTLDevice;

  commandBuffer(): MTLCommandBuffer;

  commandBufferWithUnretainedReferences(): MTLCommandBuffer;
}

declare class MTLCommandQueue extends NativeObject implements MTLCommandQueue {
}

declare interface MTLComputeCommandEncoder extends MTLCommandEncoder {
  setComputePipelineState(state: MTLComputePipelineState): void;

  setBufferOffsetAtIndex(buffer: MTLBuffer | null, offset: number, index: number): void;

  setBuffersOffsetsWithRange(buffers: interop.PointerConvertible, offsets: interop.PointerConvertible, range: _NSRange): void;

  setTextureAtIndex(texture: MTLTexture | null, index: number): void;

  setTexturesWithRange(textures: interop.PointerConvertible, range: _NSRange): void;

  setSamplerStateAtIndex(sampler: MTLSamplerState | null, index: number): void;

  setSamplerStatesWithRange(samplers: interop.PointerConvertible, range: _NSRange): void;

  setSamplerStateLodMinClampLodMaxClampAtIndex(sampler: MTLSamplerState | null, lodMinClamp: number, lodMaxClamp: number, index: number): void;

  setSamplerStatesLodMinClampsLodMaxClampsWithRange(samplers: interop.PointerConvertible, lodMinClamps: interop.PointerConvertible, lodMaxClamps: interop.PointerConvertible, range: _NSRange): void;

  setThreadgroupMemoryLengthAtIndex(length: number, index: number): void;

  dispatchThreadgroupsThreadsPerThreadgroup(threadgroupsPerGrid: MTLSize, threadsPerThreadgroup: MTLSize): void;
}

declare class MTLComputeCommandEncoder extends NativeObject implements MTLComputeCommandEncoder {
}

declare interface MTLCommandBuffer extends NSObject {
  readonly device: MTLDevice;

  readonly commandQueue: MTLCommandQueue;

  readonly retainedReferences: boolean;

  label: string;

  enqueue(): void;

  commit(): void;

  addScheduledHandler(block: (p1: MTLCommandBuffer) => void): void;

  presentDrawable(drawable: MTLDrawable): void;

  presentDrawableAtTime(drawable: MTLDrawable, presentationTime: number): void;

  waitUntilScheduled(): void;

  addCompletedHandler(block: (p1: MTLCommandBuffer) => void): void;

  waitUntilCompleted(): void;

  readonly status: interop.Enum<typeof MTLCommandBufferStatus>;

  readonly error: NSError;

  blitCommandEncoder(): MTLBlitCommandEncoder;

  renderCommandEncoderWithDescriptor(renderPassDescriptor: interop.Object): MTLRenderCommandEncoder;

  computeCommandEncoder(): MTLComputeCommandEncoder;

  parallelRenderCommandEncoderWithDescriptor(renderPassDescriptor: interop.Object): MTLParallelRenderCommandEncoder;
}

declare class MTLCommandBuffer extends NativeObject implements MTLCommandBuffer {
}

declare interface MTLBuffer extends MTLResource {
  readonly length: number;

  contents(): interop.Pointer;
}

declare class MTLBuffer extends NativeObject implements MTLBuffer {
}

declare interface MTLDevice extends NSObject {
  readonly name: string;

  newCommandQueue(): MTLCommandQueue;

  newCommandQueueWithMaxCommandBufferCount(maxCommandBufferCount: number): MTLCommandQueue;

  newBufferWithLengthOptions(length: number, options: interop.Enum<typeof MTLResourceOptions>): MTLBuffer;

  newBufferWithBytesLengthOptions(pointer: interop.PointerConvertible, length: number, options: interop.Enum<typeof MTLResourceOptions>): MTLBuffer;

  newBufferWithBytesNoCopyLengthOptionsDeallocator(pointer: interop.PointerConvertible, length: number, options: interop.Enum<typeof MTLResourceOptions>, deallocator: (p1: interop.PointerConvertible, p2: number) => void | null): MTLBuffer;

  newDepthStencilStateWithDescriptor(descriptor: interop.Object): MTLDepthStencilState;

  newTextureWithDescriptor(descriptor: interop.Object): MTLTexture;

  newSamplerStateWithDescriptor(descriptor: interop.Object): MTLSamplerState;

  newDefaultLibrary(): MTLLibrary;

  newLibraryWithDataError(data: interop.Object, error: interop.PointerConvertible): MTLLibrary;

  newLibraryWithSourceOptionsError(source: string, options: interop.Object | null, error: interop.PointerConvertible): MTLLibrary;

  newLibraryWithSourceOptionsCompletionHandler(source: string, options: interop.Object | null, completionHandler: (p1: MTLLibrary, p2: NSError) => void): void;

  newRenderPipelineStateWithDescriptorError(descriptor: interop.Object, error: interop.PointerConvertible): MTLRenderPipelineState;

  newRenderPipelineStateWithDescriptorOptionsReflectionError(descriptor: interop.Object, options: interop.Enum<typeof MTLPipelineOption>, reflection: interop.PointerConvertible, error: interop.PointerConvertible): MTLRenderPipelineState;

  newRenderPipelineStateWithDescriptorCompletionHandler(descriptor: interop.Object, completionHandler: (p1: MTLRenderPipelineState, p2: NSError) => void): void;

  newRenderPipelineStateWithDescriptorOptionsCompletionHandler(descriptor: interop.Object, options: interop.Enum<typeof MTLPipelineOption>, completionHandler: (p1: MTLRenderPipelineState, p2: interop.Object, p3: NSError) => void): void;

  newComputePipelineStateWithFunctionError(computeFunction: MTLFunction, error: interop.PointerConvertible): MTLComputePipelineState;

  newComputePipelineStateWithFunctionOptionsReflectionError(computeFunction: MTLFunction, options: interop.Enum<typeof MTLPipelineOption>, reflection: interop.PointerConvertible, error: interop.PointerConvertible): MTLComputePipelineState;

  newComputePipelineStateWithFunctionCompletionHandler(computeFunction: MTLFunction, completionHandler: (p1: MTLComputePipelineState, p2: NSError) => void): void;

  newComputePipelineStateWithFunctionOptionsCompletionHandler(computeFunction: MTLFunction, options: interop.Enum<typeof MTLPipelineOption>, completionHandler: (p1: MTLComputePipelineState, p2: interop.Object, p3: NSError) => void): void;
}

declare class MTLDevice extends NativeObject implements MTLDevice {
}

declare interface MTLDepthStencilState extends NSObject {
  readonly label: string;

  readonly device: MTLDevice;
}

declare class MTLDepthStencilState extends NativeObject implements MTLDepthStencilState {
}

declare interface MTLRenderCommandEncoder extends MTLCommandEncoder {
  setRenderPipelineState(pipelineState: MTLRenderPipelineState): void;

  setVertexBufferOffsetAtIndex(buffer: MTLBuffer | null, offset: number, index: number): void;

  setVertexBuffersOffsetsWithRange(buffers: interop.PointerConvertible, offsets: interop.PointerConvertible, range: _NSRange): void;

  setVertexTextureAtIndex(texture: MTLTexture | null, index: number): void;

  setVertexTexturesWithRange(textures: interop.PointerConvertible, range: _NSRange): void;

  setVertexSamplerStateAtIndex(sampler: MTLSamplerState | null, index: number): void;

  setVertexSamplerStatesWithRange(samplers: interop.PointerConvertible, range: _NSRange): void;

  setVertexSamplerStateLodMinClampLodMaxClampAtIndex(sampler: MTLSamplerState | null, lodMinClamp: number, lodMaxClamp: number, index: number): void;

  setVertexSamplerStatesLodMinClampsLodMaxClampsWithRange(samplers: interop.PointerConvertible, lodMinClamps: interop.PointerConvertible, lodMaxClamps: interop.PointerConvertible, range: _NSRange): void;

  setViewport(viewport: MTLViewport): void;

  setFrontFacingWinding(frontFacingWinding: interop.Enum<typeof MTLWinding>): void;

  setCullMode(cullMode: interop.Enum<typeof MTLCullMode>): void;

  setDepthBiasSlopeScaleClamp(depthBias: number, slopeScale: number, clamp: number): void;

  setScissorRect(rect: MTLScissorRect): void;

  setTriangleFillMode(fillMode: interop.Enum<typeof MTLTriangleFillMode>): void;

  setFragmentBufferOffsetAtIndex(buffer: MTLBuffer | null, offset: number, index: number): void;

  setFragmentBuffersOffsetsWithRange(buffers: interop.PointerConvertible, offsets: interop.PointerConvertible, range: _NSRange): void;

  setFragmentTextureAtIndex(texture: MTLTexture | null, index: number): void;

  setFragmentTexturesWithRange(textures: interop.PointerConvertible, range: _NSRange): void;

  setFragmentSamplerStateAtIndex(sampler: MTLSamplerState | null, index: number): void;

  setFragmentSamplerStatesWithRange(samplers: interop.PointerConvertible, range: _NSRange): void;

  setFragmentSamplerStateLodMinClampLodMaxClampAtIndex(sampler: MTLSamplerState | null, lodMinClamp: number, lodMaxClamp: number, index: number): void;

  setFragmentSamplerStatesLodMinClampsLodMaxClampsWithRange(samplers: interop.PointerConvertible, lodMinClamps: interop.PointerConvertible, lodMaxClamps: interop.PointerConvertible, range: _NSRange): void;

  setBlendColorRedGreenBlueAlpha(red: number, green: number, blue: number, alpha: number): void;

  setDepthStencilState(depthStencilState: MTLDepthStencilState | null): void;

  setStencilReferenceValue(referenceValue: number): void;

  setVisibilityResultModeOffset(mode: interop.Enum<typeof MTLVisibilityResultMode>, offset: number): void;

  drawPrimitivesVertexStartVertexCountInstanceCount(primitiveType: interop.Enum<typeof MTLPrimitiveType>, vertexStart: number, vertexCount: number, instanceCount: number): void;

  drawPrimitivesVertexStartVertexCount(primitiveType: interop.Enum<typeof MTLPrimitiveType>, vertexStart: number, vertexCount: number): void;

  drawIndexedPrimitivesIndexCountIndexTypeIndexBufferIndexBufferOffsetInstanceCount(primitiveType: interop.Enum<typeof MTLPrimitiveType>, indexCount: number, indexType: interop.Enum<typeof MTLIndexType>, indexBuffer: MTLBuffer, indexBufferOffset: number, instanceCount: number): void;

  drawIndexedPrimitivesIndexCountIndexTypeIndexBufferIndexBufferOffset(primitiveType: interop.Enum<typeof MTLPrimitiveType>, indexCount: number, indexType: interop.Enum<typeof MTLIndexType>, indexBuffer: MTLBuffer, indexBufferOffset: number): void;
}

declare class MTLRenderCommandEncoder extends NativeObject implements MTLRenderCommandEncoder {
}

declare interface MTLTexture extends MTLResource {
  readonly textureType: interop.Enum<typeof MTLTextureType>;

  readonly pixelFormat: interop.Enum<typeof MTLPixelFormat>;

  readonly width: number;

  readonly height: number;

  readonly depth: number;

  readonly mipmapLevelCount: number;

  readonly sampleCount: number;

  readonly arrayLength: number;

  readonly usage: interop.Enum<typeof MTLTextureUsage>;

  readonly isFramebufferOnly: boolean;

  getBytesBytesPerRowBytesPerImageFromRegionMipmapLevelSlice(pixelBytes: interop.PointerConvertible, bytesPerRow: number, bytesPerImage: number, region: MTLRegion, level: number, slice: number): void;

  replaceRegionMipmapLevelSliceWithBytesBytesPerRowBytesPerImage(region: MTLRegion, level: number, slice: number, pixelBytes: interop.PointerConvertible, bytesPerRow: number, bytesPerImage: number): void;

  getBytesBytesPerRowFromRegionMipmapLevel(pixelBytes: interop.PointerConvertible, bytesPerRow: number, region: MTLRegion, level: number): void;

  replaceRegionMipmapLevelWithBytesBytesPerRow(region: MTLRegion, level: number, pixelBytes: interop.PointerConvertible, bytesPerRow: number): void;

  newTextureViewWithPixelFormat(pixelFormat: interop.Enum<typeof MTLPixelFormat>): MTLTexture;
}

declare class MTLTexture extends NativeObject implements MTLTexture {
}

declare interface MTLAllocation extends NSObject {
}

declare class MTLAllocation extends NativeObject implements MTLAllocation {
}

declare interface MTLLibrary extends NSObject {
  label: string;

  readonly device: MTLDevice;

  newFunctionWithName(functionName: string): MTLFunction;

  readonly functionNames: NSArray;
}

declare class MTLLibrary extends NativeObject implements MTLLibrary {
}

declare interface MTLResource extends MTLAllocation {
  label: string;

  readonly device: MTLDevice;

  readonly cpuCacheMode: interop.Enum<typeof MTLCPUCacheMode>;

  setPurgeableState(state: interop.Enum<typeof MTLPurgeableState>): interop.Enum<typeof MTLPurgeableState>;
}

declare class MTLResource extends NativeObject implements MTLResource {
}


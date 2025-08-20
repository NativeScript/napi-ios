/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./Foundation.d.ts" />

declare const MPSDataType: {
  Invalid: 0,
  FloatBit: 268435456,
  Float32: 268435488,
  Float16: 268435472,
  ComplexBit: 16777216,
  ComplexFloat32: 285212736,
  ComplexFloat16: 285212704,
  SignedBit: 536870912,
  IntBit: 536870912,
  Int2: 536870914,
  Int4: 536870916,
  Int8: 536870920,
  Int16: 536870928,
  Int32: 536870944,
  Int64: 536870976,
  UInt2: 2,
  UInt4: 4,
  UInt8: 8,
  UInt16: 16,
  UInt32: 32,
  UInt64: 64,
  AlternateEncodingBit: -2147483648,
  Bool: -2147483640,
  BFloat16: -1879048176,
  NormalizedBit: 1073741824,
  Unorm1: 1073741825,
  Unorm8: 1073741832,
};

declare const MPSAliasingStrategy: {
  Default: 0,
  DontCare: 0,
  ShallAlias: 1,
  ShallNotAlias: 2,
  AliasingReserved: 3,
  PreferTemporaryMemory: 4,
  PreferNonTemporaryMemory: 8,
};

declare const MPSRayDataType: {
  OriginDirection: 0,
  OriginMinDistanceDirectionMaxDistance: 1,
  OriginMaskDirectionMaxDistance: 2,
  PackedOriginDirection: 3,
};

declare const MPSBoundingBoxIntersectionTestType: {
  Default: 0,
  AxisAligned: 1,
  Fast: 2,
};

declare const MPSIntersectionType: {
  Nearest: 0,
  Any: 1,
};

declare const MPSAccelerationStructureStatus: {
  Unbuilt: 0,
  Built: 1,
};

declare const MPSRayMaskOptions: {
  None: 0,
  Primitive: 1,
  Instance: 2,
};

declare const MPSRayMaskOperator: {
  And: 0,
  NotAnd: 1,
  Or: 2,
  NotOr: 3,
  Xor: 4,
  NotXor: 5,
  LessThan: 6,
  LessThanOrEqualTo: 7,
  GreaterThan: 8,
  GreaterThanOrEqualTo: 9,
  Equal: 10,
  NotEqual: 11,
};

declare const MPSKernelOptions: {
  None: 0,
  SkipAPIValidation: 1,
  AllowReducedPrecision: 2,
  DisableInternalTiling: 4,
  InsertDebugGroups: 8,
  Verbose: 16,
};

declare const MPSAccelerationStructureUsage: {
  None: 0,
  Refit: 1,
  FrequentRebuild: 2,
  PreferGPUBuild: 4,
  PreferCPUBuild: 8,
};

declare const MPSIntersectionDataType: {
  MPSIntersectionDataTypeDistance: 0,
  PrimitiveIndex: 1,
  PrimitiveIndexCoordinates: 2,
  PrimitiveIndexInstanceIndex: 3,
  PrimitiveIndexInstanceIndexCoordinates: 4,
  PrimitiveIndexBufferIndex: 5,
  PrimitiveIndexBufferIndexCoordinates: 6,
  PrimitiveIndexBufferIndexInstanceIndex: 7,
  PrimitiveIndexBufferIndexInstanceIndexCoordinates: 8,
};

declare const MPSTriangleIntersectionTestType: {
  Default: 0,
  Watertight: 1,
};

declare class _MPSAxisAlignedBoundingBox {
  constructor(init?: _MPSAxisAlignedBoundingBox);
  min: unknown /* ext vector */;
  max: unknown /* ext vector */;
}

declare class MPSDimensionSlice {
  constructor(init?: MPSDimensionSlice);
  start: number;
  length: number;
}

declare class MPSImageCoordinate {
  constructor(init?: MPSImageCoordinate);
  x: number;
  y: number;
  channel: number;
}

declare interface MPSNDArrayAllocator extends NSObjectProtocol, NSSecureCoding, NSCopying {
  arrayForCommandBufferArrayDescriptorKernel(cmdBuf: MTLCommandBuffer, descriptor: MPSNDArrayDescriptor, kernel: MPSKernel): MPSNDArray;
}

declare class MPSNDArrayAllocator extends NativeObject implements MPSNDArrayAllocator {
}

declare interface MPSDeviceProvider {
  mpsMTLDevice(): MTLDevice;
}

declare class MPSDeviceProvider extends NativeObject implements MPSDeviceProvider {
}

declare interface MPSHeapProvider extends NSObjectProtocol {
  newHeapWithDescriptor(descriptor: MTLHeapDescriptor): MTLHeap;

  retireHeapCacheDelay?(heap: MTLHeap, seconds: number): void;
}

declare class MPSHeapProvider extends NativeObject implements MPSHeapProvider {
}

declare class MPSAccelerationStructureGroup extends NSObject {
  readonly device: MTLDevice;

  initWithDevice(device: MTLDevice): this;
}

// @ts-ignore ClassDecl.tsIgnore
declare class MPSAccelerationStructure extends MPSKernel implements NSSecureCoding, NSCopying {
  readonly group: MPSAccelerationStructureGroup;

  readonly boundingBox: _MPSAxisAlignedBoundingBox;

  readonly status: interop.Enum<typeof MPSAccelerationStructureStatus>;

  usage: interop.Enum<typeof MPSAccelerationStructureUsage>;

  initWithDevice(device: MTLDevice): this;

  initWithCoderDevice(aDecoder: NSCoder, device: MTLDevice): this;

  initWithGroup(group: MPSAccelerationStructureGroup): this;

  initWithCoderGroup(aDecoder: NSCoder, group: MPSAccelerationStructureGroup): this;

  rebuild(): void;

  rebuildWithCompletionHandler(completionHandler: (p1: MPSAccelerationStructure) => void): void;

  encodeRefitToCommandBuffer(commandBuffer: MTLCommandBuffer): void;

  copyWithZoneDevice(zone: interop.PointerConvertible, device: MTLDevice | null): this;

  copyWithZoneGroup(zone: interop.PointerConvertible, group: MPSAccelerationStructureGroup): this;

  encodeWithCoder(coder: NSCoder): void;

  setUsage(usage: interop.Enum<typeof MPSAccelerationStructureUsage>): void;

  static readonly supportsSecureCoding: boolean;

  // @ts-ignore MemberDecl.tsIgnore
  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class MPSNDArray extends NSObject {
  static defaultAllocator(): MPSNDArrayAllocator;

  label: string;

  readonly dataType: interop.Enum<typeof MPSDataType>;

  readonly dataTypeSize: number;

  readonly numberOfDimensions: number;

  lengthOfDimension(dimensionIndex: number): number;

  readonly device: MTLDevice;

  descriptor(): MPSNDArrayDescriptor;

  initWithDeviceDescriptor(device: MTLDevice, descriptor: MPSNDArrayDescriptor): this;

  initWithDeviceScalar(device: MTLDevice, value: number): this;

  initWithBufferOffsetDescriptor(buffer: MTLBuffer, offset: number, descriptor: MPSNDArrayDescriptor): this;

  userBuffer(): MTLBuffer | null;

  resourceSize(): number;

  arrayViewWithCommandBufferDescriptorAliasing(cmdBuf: MTLCommandBuffer, descriptor: MPSNDArrayDescriptor, aliasing: interop.Enum<typeof MPSAliasingStrategy>): MPSNDArray | null;

  arrayViewWithDescriptor(descriptor: MPSNDArrayDescriptor): MPSNDArray | null;

  arrayViewWithShapeStrides(shape: NSArray<interop.Object> | Array<interop.Object> | null, strides: NSArray<interop.Object> | Array<interop.Object>): MPSNDArray | null;

  arrayViewWithDimensionCountDimensionSizesStrides(numberOfDimensions: number, dimensionSizes: interop.PointerConvertible, dimStrides: interop.PointerConvertible): MPSNDArray | null;

  readonly parent: MPSNDArray;

  exportDataWithCommandBufferToBufferDestinationDataTypeOffsetRowStrides(cmdBuf: MTLCommandBuffer, buffer: MTLBuffer, destinationDataType: interop.Enum<typeof MPSDataType>, offset: number, rowStrides: interop.PointerConvertible): void;

  importDataWithCommandBufferFromBufferSourceDataTypeOffsetRowStrides(cmdBuf: MTLCommandBuffer, buffer: MTLBuffer, sourceDataType: interop.Enum<typeof MPSDataType>, offset: number, rowStrides: interop.PointerConvertible): void;

  exportDataWithCommandBufferToImagesOffset(cmdBuf: MTLCommandBuffer, images: NSArray<interop.Object> | Array<interop.Object>, offset: MPSImageCoordinate): void;

  importDataWithCommandBufferFromImagesOffset(cmdBuf: MTLCommandBuffer, images: NSArray<interop.Object> | Array<interop.Object>, offset: MPSImageCoordinate): void;

  readBytesStrideBytes(buffer: interop.PointerConvertible, strideBytesPerDimension: interop.PointerConvertible): void;

  writeBytesStrideBytes(buffer: interop.PointerConvertible, strideBytesPerDimension: interop.PointerConvertible): void;

  synchronizeOnCommandBuffer(commandBuffer: MTLCommandBuffer): void;

  setLabel(label: string | null): void;
}

declare class MPSNDArrayDescriptor extends NSObject {
  dataType: interop.Enum<typeof MPSDataType>;

  numberOfDimensions: number;

  preferPackedRows: boolean;

  lengthOfDimension(dimensionIndex: number): number;

  sliceRangeForDimension(dimensionIndex: number): MPSDimensionSlice;

  sliceDimensionWithSubrange(dimensionIndex: number, subRange: MPSDimensionSlice): void;

  transposeDimensionWithDimension(dimensionIndex: number, dimensionIndex2: number): void;

  permuteWithDimensionOrder(dimensionOrder: interop.PointerConvertible): void;

  dimensionOrder(): unknown /* ext vector */;

  getShape(): NSArray;

  static descriptorWithDataTypeDimensionCountDimensionSizes<This extends abstract new (...args: any) => any>(this: This, dataType: interop.Enum<typeof MPSDataType>, numberOfDimensions: number, dimensionSizes: interop.PointerConvertible): InstanceType<This>;

  static descriptorWithDataTypeShape<This extends abstract new (...args: any) => any>(this: This, dataType: interop.Enum<typeof MPSDataType>, shape: NSArray<interop.Object> | Array<interop.Object>): InstanceType<This>;

  static descriptorWithDataTypeDimensionSizes<This extends abstract new (...args: any) => any>(this: This, dataType: interop.Enum<typeof MPSDataType>, dimension0: number): InstanceType<This>;

  reshapeWithDimensionCountDimensionSizes(numberOfDimensions: number, dimensionSizes: interop.PointerConvertible): void;

  reshapeWithShape(shape: NSArray<interop.Object> | Array<interop.Object>): void;

  setDataType(dataType: interop.Enum<typeof MPSDataType>): void;

  setNumberOfDimensions(numberOfDimensions: number): void;

  setPreferPackedRows(preferPackedRows: boolean): void;
}

// @ts-ignore ClassDecl.tsIgnore
declare class MPSRayIntersector extends MPSKernel implements NSSecureCoding, NSCopying {
  cullMode: interop.Enum<typeof MTLCullMode>;

  frontFacingWinding: interop.Enum<typeof MTLWinding>;

  triangleIntersectionTestType: interop.Enum<typeof MPSTriangleIntersectionTestType>;

  boundingBoxIntersectionTestType: interop.Enum<typeof MPSBoundingBoxIntersectionTestType>;

  rayMaskOptions: interop.Enum<typeof MPSRayMaskOptions>;

  rayMaskOperator: interop.Enum<typeof MPSRayMaskOperator>;

  rayStride: number;

  intersectionStride: number;

  rayDataType: interop.Enum<typeof MPSRayDataType>;

  intersectionDataType: interop.Enum<typeof MPSIntersectionDataType>;

  rayIndexDataType: interop.Enum<typeof MPSDataType>;

  rayMask: number;

  initWithDevice(device: MTLDevice): this;

  initWithCoderDevice(aDecoder: NSCoder, device: MTLDevice): this;

  copyWithZoneDevice(zone: interop.PointerConvertible, device: MTLDevice | null): this;

  recommendedMinimumRayBatchSizeForRayCount(rayCount: number): number;

  encodeWithCoder(coder: NSCoder): void;

  encodeIntersectionToCommandBufferIntersectionTypeRayBufferRayBufferOffsetIntersectionBufferIntersectionBufferOffsetRayCountAccelerationStructure(commandBuffer: MTLCommandBuffer, intersectionType: interop.Enum<typeof MPSIntersectionType>, rayBuffer: MTLBuffer, rayBufferOffset: number, intersectionBuffer: MTLBuffer, intersectionBufferOffset: number, rayCount: number, accelerationStructure: MPSAccelerationStructure): void;

  encodeIntersectionToCommandBufferIntersectionTypeRayBufferRayBufferOffsetIntersectionBufferIntersectionBufferOffsetRayCountBufferRayCountBufferOffsetAccelerationStructure(commandBuffer: MTLCommandBuffer, intersectionType: interop.Enum<typeof MPSIntersectionType>, rayBuffer: MTLBuffer, rayBufferOffset: number, intersectionBuffer: MTLBuffer, intersectionBufferOffset: number, rayCountBuffer: MTLBuffer, rayCountBufferOffset: number, accelerationStructure: MPSAccelerationStructure): void;

  encodeIntersectionToCommandBufferIntersectionTypeRayBufferRayBufferOffsetRayIndexBufferRayIndexBufferOffsetIntersectionBufferIntersectionBufferOffsetRayIndexCountAccelerationStructure(commandBuffer: MTLCommandBuffer, intersectionType: interop.Enum<typeof MPSIntersectionType>, rayBuffer: MTLBuffer, rayBufferOffset: number, rayIndexBuffer: MTLBuffer, rayIndexBufferOffset: number, intersectionBuffer: MTLBuffer, intersectionBufferOffset: number, rayIndexCount: number, accelerationStructure: MPSAccelerationStructure): void;

  encodeIntersectionToCommandBufferIntersectionTypeRayBufferRayBufferOffsetRayIndexBufferRayIndexBufferOffsetIntersectionBufferIntersectionBufferOffsetRayIndexCountBufferRayIndexCountBufferOffsetAccelerationStructure(commandBuffer: MTLCommandBuffer, intersectionType: interop.Enum<typeof MPSIntersectionType>, rayBuffer: MTLBuffer, rayBufferOffset: number, rayIndexBuffer: MTLBuffer, rayIndexBufferOffset: number, intersectionBuffer: MTLBuffer, intersectionBufferOffset: number, rayIndexCountBuffer: MTLBuffer, rayIndexCountBufferOffset: number, accelerationStructure: MPSAccelerationStructure): void;

  encodeIntersectionToCommandBufferIntersectionTypeRayTextureIntersectionTextureAccelerationStructure(commandBuffer: MTLCommandBuffer, intersectionType: interop.Enum<typeof MPSIntersectionType>, rayTexture: MTLTexture, intersectionTexture: MTLTexture, accelerationStructure: MPSAccelerationStructure): void;

  setCullMode(cullMode: interop.Enum<typeof MTLCullMode>): void;

  setFrontFacingWinding(frontFacingWinding: interop.Enum<typeof MTLWinding>): void;

  setTriangleIntersectionTestType(triangleIntersectionTestType: interop.Enum<typeof MPSTriangleIntersectionTestType>): void;

  setBoundingBoxIntersectionTestType(boundingBoxIntersectionTestType: interop.Enum<typeof MPSBoundingBoxIntersectionTestType>): void;

  setRayMaskOptions(rayMaskOptions: interop.Enum<typeof MPSRayMaskOptions>): void;

  setRayMaskOperator(rayMaskOperator: interop.Enum<typeof MPSRayMaskOperator>): void;

  setRayStride(rayStride: number): void;

  setIntersectionStride(intersectionStride: number): void;

  setRayDataType(rayDataType: interop.Enum<typeof MPSRayDataType>): void;

  setIntersectionDataType(intersectionDataType: interop.Enum<typeof MPSIntersectionDataType>): void;

  setRayIndexDataType(rayIndexDataType: interop.Enum<typeof MPSDataType>): void;

  setRayMask(rayMask: number): void;

  static readonly supportsSecureCoding: boolean;

  // @ts-ignore MemberDecl.tsIgnore
  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class MPSCommandBuffer extends NSObject implements MTLCommandBuffer {
  readonly commandBuffer: MTLCommandBuffer;

  readonly rootCommandBuffer: MTLCommandBuffer;

  predicate: MPSPredicate;

  heapProvider: MPSHeapProvider;

  static commandBufferWithCommandBuffer<This extends abstract new (...args: any) => any>(this: This, commandBuffer: MTLCommandBuffer): InstanceType<This>;

  static commandBufferFromCommandQueue<This extends abstract new (...args: any) => any>(this: This, commandQueue: MTLCommandQueue): InstanceType<This>;

  initWithCommandBuffer(commandBuffer: MTLCommandBuffer): this;

  commitAndContinue(): void;

  prefetchHeapForWorkloadSize(size: number): void;

  setPredicate(predicate: MPSPredicate | null): void;

  setHeapProvider(heapProvider: MPSHeapProvider | null): void;

  readonly device: MTLDevice;

  readonly commandQueue: MTLCommandQueue;

  readonly retainedReferences: boolean;

  readonly errorOptions: interop.Enum<typeof MTLCommandBufferErrorOption>;

  label: string;

  readonly kernelStartTime: number;

  readonly kernelEndTime: number;

  readonly logs: MTLLogContainer;

  readonly GPUStartTime: number;

  readonly GPUEndTime: number;

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

  renderCommandEncoderWithDescriptor(renderPassDescriptor: MTLRenderPassDescriptor): MTLRenderCommandEncoder;

  computeCommandEncoderWithDescriptor(computePassDescriptor: MTLComputePassDescriptor): MTLComputeCommandEncoder;

  blitCommandEncoderWithDescriptor(blitPassDescriptor: MTLBlitPassDescriptor): MTLBlitCommandEncoder;

  computeCommandEncoder(): MTLComputeCommandEncoder;

  computeCommandEncoderWithDispatchType(dispatchType: interop.Enum<typeof MTLDispatchType>): MTLComputeCommandEncoder;

  encodeWaitForEventValue(event: MTLEvent, value: number): void;

  encodeSignalEventValue(event: MTLEvent, value: number): void;

  parallelRenderCommandEncoderWithDescriptor(renderPassDescriptor: MTLRenderPassDescriptor): MTLParallelRenderCommandEncoder;

  resourceStateCommandEncoder(): MTLResourceStateCommandEncoder;

  resourceStateCommandEncoderWithDescriptor(resourceStatePassDescriptor: MTLResourceStatePassDescriptor): MTLResourceStateCommandEncoder;

  accelerationStructureCommandEncoder(): MTLAccelerationStructureCommandEncoder;

  accelerationStructureCommandEncoderWithDescriptor(descriptor: MTLAccelerationStructurePassDescriptor): MTLAccelerationStructureCommandEncoder;

  pushDebugGroup(string: string): void;

  popDebugGroup(): void;

  useResidencySet(residencySet: MTLResidencySet): void;

  useResidencySetsCount(residencySets: interop.PointerConvertible, count: number): void;

  setLabel(label: string | null): void;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class MPSPredicate extends NSObject {
  readonly predicateBuffer: MTLBuffer;

  readonly predicateOffset: number;

  static predicateWithBufferOffset<This extends abstract new (...args: any) => any>(this: This, buffer: MTLBuffer, offset: number): InstanceType<This>;

  initWithBufferOffset(buffer: MTLBuffer, offset: number): this;

  initWithDevice(device: MTLDevice): this;
}

declare class MPSKeyedUnarchiver extends NSKeyedUnarchiver implements MPSDeviceProvider {
  static unarchivedObjectOfClassesFromDataDeviceError(classes: NSSet, data: NSData, device: MTLDevice, error: interop.PointerConvertible): interop.Object;

  static unarchivedObjectOfClassFromDataDeviceError(cls: interop.Object, data: NSData, device: MTLDevice, error: interop.PointerConvertible): interop.Object;

  initForReadingFromDataDeviceError(data: NSData, device: MTLDevice, error: interop.PointerConvertible): this;

  mpsMTLDevice(): MTLDevice;

  static unarchiveObjectWithDataDevice(data: NSData, device: MTLDevice): interop.Object;

  static unarchiveTopLevelObjectWithDataDeviceError(data: NSData, device: MTLDevice, error: interop.PointerConvertible): interop.Object;

  static unarchiveObjectWithFileDevice(path: string, device: MTLDevice): interop.Object;

  initWithDevice(device: MTLDevice): this;

  initForReadingWithDataDevice(data: NSData, device: MTLDevice): this;
}

declare class MPSMatrixDescriptor extends NSObject {
  rows: number;

  columns: number;

  readonly matrices: number;

  dataType: interop.Enum<typeof MPSDataType>;

  rowBytes: number;

  readonly matrixBytes: number;

  static matrixDescriptorWithDimensionsColumnsRowBytesDataType<This extends abstract new (...args: any) => any>(this: This, rows: number, columns: number, rowBytes: number, dataType: interop.Enum<typeof MPSDataType>): InstanceType<This>;

  static matrixDescriptorWithRowsColumnsRowBytesDataType<This extends abstract new (...args: any) => any>(this: This, rows: number, columns: number, rowBytes: number, dataType: interop.Enum<typeof MPSDataType>): InstanceType<This>;

  static matrixDescriptorWithRowsColumnsMatricesRowBytesMatrixBytesDataType<This extends abstract new (...args: any) => any>(this: This, rows: number, columns: number, matrices: number, rowBytes: number, matrixBytes: number, dataType: interop.Enum<typeof MPSDataType>): InstanceType<This>;

  static rowBytesFromColumnsDataType(columns: number, dataType: interop.Enum<typeof MPSDataType>): number;

  static rowBytesForColumnsDataType(columns: number, dataType: interop.Enum<typeof MPSDataType>): number;

  setRows(rows: number): void;

  setColumns(columns: number): void;

  setDataType(dataType: interop.Enum<typeof MPSDataType>): void;

  setRowBytes(rowBytes: number): void;
}

declare class MPSVectorDescriptor extends NSObject {
  length: number;

  readonly vectors: number;

  dataType: interop.Enum<typeof MPSDataType>;

  readonly vectorBytes: number;

  static vectorDescriptorWithLengthDataType<This extends abstract new (...args: any) => any>(this: This, length: number, dataType: interop.Enum<typeof MPSDataType>): InstanceType<This>;

  static vectorDescriptorWithLengthVectorsVectorBytesDataType<This extends abstract new (...args: any) => any>(this: This, length: number, vectors: number, vectorBytes: number, dataType: interop.Enum<typeof MPSDataType>): InstanceType<This>;

  static vectorBytesForLengthDataType(length: number, dataType: interop.Enum<typeof MPSDataType>): number;

  setLength(length: number): void;

  setDataType(dataType: interop.Enum<typeof MPSDataType>): void;
}

declare class MPSVector extends NSObject {
  readonly device: MTLDevice;

  readonly length: number;

  readonly vectors: number;

  readonly dataType: interop.Enum<typeof MPSDataType>;

  readonly vectorBytes: number;

  readonly offset: number;

  readonly data: MTLBuffer;

  initWithBufferDescriptor(buffer: MTLBuffer, descriptor: MPSVectorDescriptor): this;

  initWithBufferOffsetDescriptor(buffer: MTLBuffer, offset: number, descriptor: MPSVectorDescriptor): this;

  initWithDeviceDescriptor(device: MTLDevice, descriptor: MPSVectorDescriptor): this;

  synchronizeOnCommandBuffer(commandBuffer: MTLCommandBuffer): void;

  resourceSize(): number;
}

declare class MPSKernel extends NSObject implements NSCopying, NSSecureCoding {
  options: interop.Enum<typeof MPSKernelOptions>;

  readonly device: MTLDevice;

  label: string;

  initWithDevice(device: MTLDevice): this;

  copyWithZoneDevice(zone: interop.PointerConvertible, device: MTLDevice | null): this;

  initWithCoder(aDecoder: NSCoder): this;

  initWithCoderDevice(aDecoder: NSCoder, device: MTLDevice): this;

  setOptions(options: interop.Enum<typeof MPSKernelOptions>): void;

  setLabel(label: string | null): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;
}

declare class MPSMatrix extends NSObject {
  readonly device: MTLDevice;

  readonly rows: number;

  readonly columns: number;

  readonly matrices: number;

  readonly dataType: interop.Enum<typeof MPSDataType>;

  readonly rowBytes: number;

  readonly matrixBytes: number;

  readonly offset: number;

  readonly data: MTLBuffer;

  initWithBufferDescriptor(buffer: MTLBuffer, descriptor: MPSMatrixDescriptor): this;

  initWithBufferOffsetDescriptor(buffer: MTLBuffer, offset: number, descriptor: MPSMatrixDescriptor): this;

  initWithDeviceDescriptor(device: MTLDevice, descriptor: MPSMatrixDescriptor): this;

  synchronizeOnCommandBuffer(commandBuffer: MTLCommandBuffer): void;

  resourceSize(): number;
}


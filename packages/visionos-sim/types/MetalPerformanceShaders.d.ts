/// <reference types="@nativescript/objc-node-api" />

declare const MPSFunctionConstantNoneArray: unknown /* const array */;

declare const MPSFunctionConstantNone: number;

declare const MPSImageType: {
  Type2d: 0,
  Type2d_array: 1,
  TypeArray2d: 2,
  TypeArray2d_array: 3,
  Type_ArrayMask: 1,
  Type_BatchMask: 2,
  Type_typeMask: 3,
  Type_noAlpha: 4,
  Type_texelFormatMask: 56,
  Type_texelFormatShift: 3,
  Type_texelFormatStandard: 0,
  Type_texelFormatUnorm8: 8,
  Type_texelFormatFloat16: 16,
  Type_texelFormatBFloat16: 24,
  Type_bitCount: 6,
  Type_mask: 63,
  Type2d_noAlpha: 4,
  Type2d_array_noAlpha: 5,
  TypeArray2d_noAlpha: 6,
  TypeArray2d_array_noAlpha: 7,
};

declare const MPSDataType: {
  IntBit: 536870912,
  Int4: 536870916,
  UInt4: 4,
};

declare const MPSRNNMatrixId: {
  MPSRNNMatrixId_count: 29,
};

declare const MPSNNPaddingMethod: {
  Align: 3,
  AddRemainderTo: 12,
};

declare const MPSFloatDataTypeBit: {
  Sign: 8388608,
  Exponent: 8126464,
  Mantissa: 261120,
};

declare const MPSFloatDataTypeShift: {
  Sign: 23,
  Exponent: 18,
  Mantissa: 10,
};

declare const MPSCustomKernelIndex: {
  Dest: 0,
  Src0: 0,
  Src1: 1,
  Src2: 2,
  Src3: 3,
  Src4: 4,
  UserData: 30,
};

declare const MPSDeviceCapsValues: {
  CapsNull: 0,
  SupportsReadableArrayOfTextures: 1,
  SupportsWritableArrayOfTextures: 2,
  SupportsReadWriteTextures: 4,
  SupportsSimdgroupBarrier: 8,
  SupportsQuadShuffle: 16,
  SupportsSimdShuffle: 32,
  SupportsSimdReduction: 64,
  SupportsFloat32Filtering: 128,
  SupportsNorm16BicubicFiltering: 256,
  SupportsFloat16BicubicFiltering: 512,
  IsAppleDevice: 1024,
  SupportsSimdShuffleAndFill: 2048,
  SupportsBFloat16Arithmetic: 4096,
  CapsLast: 8192,
};

declare const MPSAliasingStrategy: {
  DontCare: 0,
  AliasingReserved: 3,
};

declare const MPSCNNReductionType: {
  MPSCNNReductionTypeCount: 4,
};

declare const MPSCNNLossType: {
  MPSCNNLossTypeCount: 10,
};

declare const MPSNDArrayQuantizationScheme: {
  None: 0,
  Affine: 1,
  LUT: 2,
};

declare class MPSIntersectionDistancePrimitiveIndexBufferIndexInstanceIndexCoordinates {
  constructor(init?: MPSIntersectionDistancePrimitiveIndexBufferIndexInstanceIndexCoordinates);
  distance: number;
  primitiveIndex: number;
  bufferIndex: number;
  instanceIndex: number;
  coordinates: unknown /* ext vector */;
}

declare class MPSMatrixOffset {
  constructor(init?: MPSMatrixOffset);
  rowOffset: number;
  columnOffset: number;
}

declare class MPSIntersectionDistancePrimitiveIndexCoordinates {
  constructor(init?: MPSIntersectionDistancePrimitiveIndexCoordinates);
  distance: number;
  primitiveIndex: number;
  coordinates: unknown /* ext vector */;
}

declare class MPSRayOriginMinDistanceDirectionMaxDistance {
  constructor(init?: MPSRayOriginMinDistanceDirectionMaxDistance);
  origin: _MPSPackedFloat3;
  minDistance: number;
  direction: _MPSPackedFloat3;
  maxDistance: number;
}

declare class MPSRayPackedOriginDirection {
  constructor(init?: MPSRayPackedOriginDirection);
  origin: _MPSPackedFloat3;
  direction: _MPSPackedFloat3;
}

declare class _MPSPackedFloat3 {
  constructor(init?: _MPSPackedFloat3);
}

declare class MPSNDArraySizes {
  constructor(init?: MPSNDArraySizes);
  dimensions: unknown /* const array */;
}

declare class MPSNDArrayOffsets {
  constructor(init?: MPSNDArrayOffsets);
  dimensions: unknown /* const array */;
}

declare class MPSImageHistogramInfo {
  constructor(init?: MPSImageHistogramInfo);
  numberOfHistogramEntries: number;
  histogramForAlpha: boolean;
  minPixelValue: unknown /* ext vector */;
  maxPixelValue: unknown /* ext vector */;
}

declare class MPSImageKeypointRangeInfo {
  constructor(init?: MPSImageKeypointRangeInfo);
  maximumKeypoints: number;
  minimumThresholdValue: number;
}

declare class MPSIntersectionDistancePrimitiveIndexBufferIndexCoordinates {
  constructor(init?: MPSIntersectionDistancePrimitiveIndexBufferIndexCoordinates);
  distance: number;
  primitiveIndex: number;
  bufferIndex: number;
  coordinates: unknown /* ext vector */;
}

declare class MPSMatrixCopyOffsets {
  constructor(init?: MPSMatrixCopyOffsets);
  sourceRowOffset: number;
  sourceColumnOffset: number;
  destinationRowOffset: number;
  destinationColumnOffset: number;
}

declare class MPSCustomKernelArgumentCount {
  constructor(init?: MPSCustomKernelArgumentCount);
  destinationTextureCount: number;
  sourceTextureCount: number;
  broadcastTextureCount: number;
}

declare class MPSCustomKernelSourceInfo {
  constructor(init?: MPSCustomKernelSourceInfo);
  kernelOrigin: unknown /* ext vector */;
  kernelPhase: unknown /* ext vector */;
  kernelSize: unknown /* ext vector */;
  offset: unknown /* ext vector */;
  stride: unknown /* ext vector */;
  dilationRate: unknown /* ext vector */;
  featureChannelOffset: number;
  featureChannels: number;
  imageArrayOffset: number;
  imageArraySize: number;
}

declare class MPSStateTextureInfo {
  constructor(init?: MPSStateTextureInfo);
  width: number;
  height: number;
  depth: number;
  arrayLength: number;
  pixelFormat: interop.Enum<typeof MTLPixelFormat>;
  textureType: interop.Enum<typeof MTLTextureType>;
  usage: interop.Enum<typeof MTLTextureUsage>;
  _reserved: unknown /* const array */;
}

declare class MPSImageReadWriteParams {
  constructor(init?: MPSImageReadWriteParams);
  featureChannelOffset: number;
  numberOfFeatureChannelsToReadWrite: number;
}

declare class unnamed_5272779459378518353 {
  constructor(init?: unnamed_5272779459378518353);
  x: number;
  y: number;
  z: number;
}

declare class MPSImageRegion {
  constructor(init?: MPSImageRegion);
  offset: MPSImageCoordinate;
  size: MPSImageCoordinate;
}

declare class MPSCustomKernelInfo {
  constructor(init?: MPSCustomKernelInfo);
  clipOrigin: unknown /* ext vector */;
  clipSize: unknown /* ext vector */;
  destinationFeatureChannels: number;
  destImageArraySize: number;
  sourceImageCount: number;
  threadgroupSize: number;
  subbatchIndex: number;
  subbatchStride: number;
  idiv: MPSIntegerDivisionParams;
}

declare class MPSImageCoordinate {
  constructor(init?: MPSImageCoordinate);
  x: number;
  y: number;
  channel: number;
}

declare class MPSDimensionSlice {
  constructor(init?: MPSDimensionSlice);
  start: number;
  length: number;
}

declare class MPSSize {
  constructor(init?: MPSSize);
  width: number;
  height: number;
  depth: number;
}

declare class MPSOrigin {
  constructor(init?: MPSOrigin);
  x: number;
  y: number;
  z: number;
}

declare class MPSIntersectionDistancePrimitiveIndex {
  constructor(init?: MPSIntersectionDistancePrimitiveIndex);
  distance: number;
  primitiveIndex: number;
}

declare class MPSIntersectionDistancePrimitiveIndexInstanceIndex {
  constructor(init?: MPSIntersectionDistancePrimitiveIndexInstanceIndex);
  distance: number;
  primitiveIndex: number;
  instanceIndex: number;
}

declare class MPSIntersectionDistance {
  constructor(init?: MPSIntersectionDistance);
  distance: number;
}

declare class MPSImageKeypointData {
  constructor(init?: MPSImageKeypointData);
  keypointCoordinate: unknown /* ext vector */;
  keypointColorValue: number;
}

declare class MPSRayOriginDirection {
  constructor(init?: MPSRayOriginDirection);
  origin: unknown /* ext vector */;
  direction: unknown /* ext vector */;
}

declare class MPSIntersectionDistancePrimitiveIndexBufferIndexInstanceIndex {
  constructor(init?: MPSIntersectionDistancePrimitiveIndexBufferIndexInstanceIndex);
  distance: number;
  primitiveIndex: number;
  bufferIndex: number;
  instanceIndex: number;
}

declare class MPSRegion {
  constructor(init?: MPSRegion);
  origin: MPSOrigin;
  size: MPSSize;
}

declare class MPSIntersectionDistancePrimitiveIndexBufferIndex {
  constructor(init?: MPSIntersectionDistancePrimitiveIndexBufferIndex);
  distance: number;
  primitiveIndex: number;
  bufferIndex: number;
}

declare class MPSRayOriginMaskDirectionMaxDistance {
  constructor(init?: MPSRayOriginMaskDirectionMaxDistance);
  origin: _MPSPackedFloat3;
  mask: number;
  direction: _MPSPackedFloat3;
  maxDistance: number;
}

declare class MPSIntegerDivisionParams {
  constructor(init?: MPSIntegerDivisionParams);
  divisor: number;
  recip: number;
  addend: number;
  shift: number;
}

declare class MPSScaleTransform {
  constructor(init?: MPSScaleTransform);
  scaleX: number;
  scaleY: number;
  translateX: number;
  translateY: number;
}

declare class MPSIntersectionDistancePrimitiveIndexInstanceIndexCoordinates {
  constructor(init?: MPSIntersectionDistancePrimitiveIndexInstanceIndexCoordinates);
  distance: number;
  primitiveIndex: number;
  instanceIndex: number;
  coordinates: unknown /* ext vector */;
}

declare class _MPSAxisAlignedBoundingBox {
  constructor(init?: _MPSAxisAlignedBoundingBox);
  min: unknown /* ext vector */;
  max: unknown /* ext vector */;
}

declare class MPSOffset {
  constructor(init?: MPSOffset);
  x: number;
  y: number;
  z: number;
}

type unnamed_14487582137863423632Descriptor = 
  | { elements: unknown /* const array */ };

declare class unnamed_14487582137863423632 {
  constructor(init?: unnamed_14487582137863423632Descriptor);
  elements: unknown /* const array */;
}

declare function MPSGetImageType(image: interop.Object): interop.Enum<typeof MPSImageType>;

declare function MPSHintTemporaryMemoryHighWaterMark(cmdBuf: MTLCommandBuffer, bytes: number): void;

declare function MPSSetHeapCacheDuration(cmdBuf: MTLCommandBuffer, seconds: number): void;

declare interface MPSDeviceProvider {
  mpsMTLDevice(): MTLDevice;
}

declare class MPSDeviceProvider extends NativeObject implements MPSDeviceProvider {
}

declare interface MPSNNGramMatrixCallback extends NSObject, NSSecureCoding, NSCopying {
  alphaForSourceImageDestinationImage(sourceImage: interop.Object, destinationImage: interop.Object): number;
}

declare class MPSNNGramMatrixCallback extends NativeObject implements MPSNNGramMatrixCallback {
}

declare interface MPSNDArrayAllocator extends NSObject, NSSecureCoding, NSCopying {
  arrayForCommandBufferArrayDescriptorKernel(cmdBuf: MTLCommandBuffer, descriptor: interop.Object, kernel: interop.Object): interop.Object;
}

declare class MPSNDArrayAllocator extends NativeObject implements MPSNDArrayAllocator {
}

declare interface MPSNNLossCallback extends NSObject, NSSecureCoding, NSCopying {
  scalarWeightForSourceImageDestinationImage(sourceImage: interop.Object, destinationImage: interop.Object): number;
}

declare class MPSNNLossCallback extends NativeObject implements MPSNNLossCallback {
}

declare interface MPSCNNConvolutionDataSource extends NSCopying, NSObject {
  dataType(): interop.Enum<typeof MPSDataType>;

  descriptor(): interop.Object;

  weights(): interop.Pointer;

  biasTerms(): interop.Pointer;

  load(): boolean;

  purge(): void;

  label(): string | null;

  rangesForUInt8Kernel?(): interop.Pointer;

  lookupTableForUInt8Kernel?(): interop.Pointer;

  weightsQuantizationType?(): interop.Enum<typeof MPSCNNWeightsQuantizationType>;
}

declare class MPSCNNConvolutionDataSource extends NativeObject implements MPSCNNConvolutionDataSource {
}

declare interface MPSImageTransformProvider extends NSSecureCoding, NSObject {
  transformForSourceImageHandle(image: interop.Object, handle: MPSHandle | null): MPSScaleTransform;
}

declare class MPSImageTransformProvider extends NativeObject implements MPSImageTransformProvider {
}

declare interface MPSNNPadding extends NSObject, NSSecureCoding {
  paddingMethod(): interop.Enum<typeof MPSNNPaddingMethod>;

  label?(): string;

  destinationImageDescriptorForSourceImagesSourceStatesForKernelSuggestedDescriptor?(sourceImages: NSArray<interop.Object> | Array<interop.Object>, sourceStates: NSArray<interop.Object> | Array<interop.Object> | null, kernel: interop.Object, inDescriptor: interop.Object): interop.Object;
}

declare class MPSNNPadding extends NativeObject implements MPSNNPadding {
}

declare interface MPSImageAllocator extends NSObject, NSSecureCoding {
  imageForCommandBufferImageDescriptorKernel(cmdBuf: MTLCommandBuffer, descriptor: interop.Object, kernel: interop.Object): interop.Object;

  imageBatchForCommandBufferImageDescriptorKernelCount?(cmdBuf: MTLCommandBuffer, descriptor: interop.Object, kernel: interop.Object, count: number): NSArray;
}

declare class MPSImageAllocator extends NativeObject implements MPSImageAllocator {
}

declare interface MPSImageSizeEncodingState extends NSObject {
  readonly sourceWidth: number;

  readonly sourceHeight: number;
}

declare class MPSImageSizeEncodingState extends NativeObject implements MPSImageSizeEncodingState {
}

declare interface MPSNNTrainableNode extends NSObject {
  trainingStyle: interop.Enum<typeof MPSNNTrainingStyle>;
}

declare class MPSNNTrainableNode extends NativeObject implements MPSNNTrainableNode {
}

declare interface MPSHandle extends NSSecureCoding, NSObject {
  label(): string | null;
}

declare class MPSHandle extends NativeObject implements MPSHandle {
}

declare interface MPSHeapProvider extends NSObject {
  newHeapWithDescriptor(descriptor: interop.Object): MTLHeap;

  retireHeapCacheDelay?(heap: MTLHeap, seconds: number): void;
}

declare class MPSHeapProvider extends NativeObject implements MPSHeapProvider {
}

declare class MPSNDArrayIdentity extends MPSNDArrayUnaryKernel {
  initWithDevice(device: MTLDevice): this;

  reshapeWithCommandBufferSourceArrayShapeDestinationArray(cmdBuf: MTLCommandBuffer | null, sourceArray: interop.Object, shape: NSArray<interop.Object> | Array<interop.Object>, destinationArray: interop.Object | null): interop.Object | null;

  reshapeWithCommandBufferSourceArrayDimensionCountDimensionSizesDestinationArray(cmdBuf: MTLCommandBuffer | null, sourceArray: interop.Object, numberOfDimensions: number, dimensionSizes: interop.PointerConvertible, destinationArray: interop.Object | null): interop.Object | null;

  reshapeWithCommandEncoderCommandBufferSourceArrayShapeDestinationArray(encoder: MTLComputeCommandEncoder | null, cmdBuf: MTLCommandBuffer | null, sourceArray: interop.Object, shape: NSArray<interop.Object> | Array<interop.Object>, destinationArray: interop.Object | null): interop.Object | null;

  reshapeWithCommandEncoderCommandBufferSourceArrayDimensionCountDimensionSizesDestinationArray(encoder: MTLComputeCommandEncoder | null, cmdBuf: MTLCommandBuffer | null, sourceArray: interop.Object, numberOfDimensions: number, dimensionSizes: interop.PointerConvertible, destinationArray: interop.Object | null): interop.Object | null;
}

declare class MPSNDArrayAffineInt4Dequantize extends MPSNDArrayMultiaryKernel {
  initWithDeviceQuantizationDescriptor(device: MTLDevice, quantizationDescriptor: MPSNDArrayAffineQuantizationDescriptor): this;
}

declare class MPSNDArrayVectorLUTDequantize extends MPSNDArrayMultiaryKernel {
  vectorAxis: number;

  initWithDeviceAxis(device: MTLDevice, axis: number): this;
}

declare class MPSNDArrayLUTDequantize extends MPSNDArrayMultiaryKernel {
  initWithDevice(device: MTLDevice): this;
}

declare class MPSNDArrayLUTQuantizationDescriptor extends MPSNDArrayQuantizationDescriptor {
  initWithDataType(quantizationDataType: interop.Enum<typeof MPSDataType>): this;

  initWithDataTypeVectorAxis(quantizationDataType: interop.Enum<typeof MPSDataType>, vectorAxis: number): this;
}

declare class MPSNDArrayQuantizedMatrixMultiplication extends MPSNDArrayMatrixMultiplication {
  initWithDeviceLeftQuantizationDescriptorRightQuantizationDescriptor(device: MTLDevice, leftQuantizationDescriptor: MPSNDArrayQuantizationDescriptor | null, rightQuantizationDescriptor: MPSNDArrayQuantizationDescriptor | null): this;
}

declare class MPSNDArrayAffineQuantizationDescriptor extends MPSNDArrayQuantizationDescriptor {
  hasZeroPoint: boolean;

  hasMinValue: boolean;

  implicitZeroPoint: boolean;

  init(): this;

  initWithDataTypeHasZeroPointHasMinValue(quantizationDataType: interop.Enum<typeof MPSDataType>, hasZeroPoint: boolean, hasMinValue: boolean): this;
}

declare class MPSNDArrayQuantizationDescriptor extends NSObject implements NSCopying {
  readonly quantizationDataType: interop.Enum<typeof MPSDataType>;

  readonly quantizationScheme: interop.Enum<typeof MPSNDArrayQuantizationScheme>;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}


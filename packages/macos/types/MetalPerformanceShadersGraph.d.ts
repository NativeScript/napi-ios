/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const MPSGraphPaddingMode: {
  Constant: 0,
  Reflect: 1,
  Symmetric: 2,
  ClampToEdge: 3,
  Zero: 4,
  Periodic: 5,
  AntiPeriodic: 6,
};

declare const MPSGraphPoolingReturnIndicesMode: {
  None: 0,
  GlobalFlatten1D: 1,
  GlobalFlatten2D: 2,
  GlobalFlatten3D: 3,
  GlobalFlatten4D: 4,
  LocalFlatten1D: 5,
  LocalFlatten2D: 6,
  LocalFlatten3D: 7,
  LocalFlatten4D: 8,
};

declare const MPSGraphNonMaximumSuppressionCoordinateMode: {
  CornersHeight: 0,
  CornersWidth: 1,
  CentersHeight: 2,
  CentersWidth: 3,
};

declare const MPSGraphLossReductionType: {
  None: 0,
  Axis: 0,
  Sum: 1,
  Mean: 2,
};

declare const MPSGraphReducedPrecisionFastMath: {
  None: 0,
  AllowFP16Conv2DWinogradTransformIntermediate: 2,
  AllowFP16Intermediates: 2,
  Default: 0,
};

declare const MPSGraphReductionMode: {
  Min: 0,
  Max: 1,
  Sum: 2,
  Product: 3,
  ArgumentMin: 4,
  ArgumentMax: 5,
};

declare const MPSGraphRandomDistribution: {
  Uniform: 0,
  Normal: 1,
  TruncatedNormal: 2,
};

declare const MPSGraphTensorNamedDataLayout: {
  NCHW: 0,
  NHWC: 1,
  OIHW: 2,
  HWIO: 3,
  CHW: 4,
  HWC: 5,
  HW: 6,
  NCDHW: 7,
  NDHWC: 8,
  OIDHW: 9,
  DHWIO: 10,
};

declare const MPSGraphRandomNormalSamplingMethod: {
  InvCDF: 0,
  BoxMuller: 1,
};

declare const MPSGraphOptions: {
  None: 0,
  SynchronizeResults: 1,
  Verbose: 2,
  Default: 1,
};

declare const MPSGraphResizeMode: {
  Nearest: 0,
  Bilinear: 1,
};

declare const MPSGraphSparseStorageType: {
  OO: 0,
  SC: 1,
  SR: 2,
};

declare const MPSGraphDeviceType: {
  MPSGraphDeviceTypeMetal: 0,
};

declare const MPSGraphDeploymentPlatform: {
  Mac: 0,
  I: 1,
  Tv: 2,
  Vision: 3,
};

declare const MPSGraphOptimizationProfile: {
  Performance: 0,
  PowerEfficiency: 1,
};

declare const MPSGraphScatterMode: {
  Add: 0,
  Sub: 1,
  Mul: 2,
  Div: 3,
  Min: 4,
  Max: 5,
  Set: 6,
};

declare const MPSGraphResizeNearestRoundingMode: {
  RoundPreferCeil: 0,
  RoundPreferFloor: 1,
  Ceil: 2,
  Floor: 3,
  RoundToEven: 4,
  RoundToOdd: 5,
};

declare const MPSGraphFFTScalingMode: {
  None: 0,
  Size: 1,
  Unitary: 2,
};

declare const MPSGraphRNNActivation: {
  None: 0,
  Relu: 1,
  Tanh: 2,
  Sigmoid: 3,
  HardSigmoid: 4,
};

declare const MPSGraphPaddingStyle: {
  Explicit: 0,
  TF_VALID: 1,
  TF_SAME: 2,
  ExplicitOffset: 3,
  ONNX_SAME_LOWER: 4,
};

declare const MPSGraphExecutionStage: {
  MPSGraphExecutionStageCompleted: 0,
};

declare const MPSGraphOptimization: {
  Level0: 0,
  Level1: 1,
};

declare class MPSGraphStencilOpDescriptor extends MPSGraphObject implements NSCopying {
  reductionMode: interop.Enum<typeof MPSGraphReductionMode>;

  get offsets(): NSArray;
  set offsets(value: NSArray<interop.Object> | Array<interop.Object>);

  get strides(): NSArray;
  set strides(value: NSArray<interop.Object> | Array<interop.Object>);

  get dilationRates(): NSArray;
  set dilationRates(value: NSArray<interop.Object> | Array<interop.Object>);

  get explicitPadding(): NSArray;
  set explicitPadding(value: NSArray<interop.Object> | Array<interop.Object>);

  boundaryMode: interop.Enum<typeof MPSGraphPaddingMode>;

  paddingStyle: interop.Enum<typeof MPSGraphPaddingStyle>;

  paddingConstant: number;

  static descriptorWithReductionModeOffsetsStridesDilationRatesExplicitPaddingBoundaryModePaddingStylePaddingConstant<This extends abstract new (...args: any) => any>(this: This, reductionMode: interop.Enum<typeof MPSGraphReductionMode>, offsets: NSArray<interop.Object> | Array<interop.Object>, strides: NSArray<interop.Object> | Array<interop.Object>, dilationRates: NSArray<interop.Object> | Array<interop.Object>, explicitPadding: NSArray<interop.Object> | Array<interop.Object>, boundaryMode: interop.Enum<typeof MPSGraphPaddingMode>, paddingStyle: interop.Enum<typeof MPSGraphPaddingStyle>, paddingConstant: number): InstanceType<This>;

  static descriptorWithOffsetsExplicitPadding<This extends abstract new (...args: any) => any>(this: This, offsets: NSArray<interop.Object> | Array<interop.Object>, explicitPadding: NSArray<interop.Object> | Array<interop.Object>): InstanceType<This>;

  static descriptorWithExplicitPadding<This extends abstract new (...args: any) => any>(this: This, explicitPadding: NSArray<interop.Object> | Array<interop.Object>): InstanceType<This>;

  static descriptorWithPaddingStyle<This extends abstract new (...args: any) => any>(this: This, paddingStyle: interop.Enum<typeof MPSGraphPaddingStyle>): InstanceType<This>;

  setReductionMode(reductionMode: interop.Enum<typeof MPSGraphReductionMode>): void;

  setOffsets(offsets: NSArray<interop.Object> | Array<interop.Object>): void;

  setStrides(strides: NSArray<interop.Object> | Array<interop.Object>): void;

  setDilationRates(dilationRates: NSArray<interop.Object> | Array<interop.Object>): void;

  setExplicitPadding(explicitPadding: NSArray<interop.Object> | Array<interop.Object>): void;

  setBoundaryMode(boundaryMode: interop.Enum<typeof MPSGraphPaddingMode>): void;

  setPaddingStyle(paddingStyle: interop.Enum<typeof MPSGraphPaddingStyle>): void;

  setPaddingConstant(paddingConstant: number): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class MPSGraphGRUDescriptor extends MPSGraphObject implements NSCopying {
  reverse: boolean;

  bidirectional: boolean;

  training: boolean;

  resetGateFirst: boolean;

  resetAfter: boolean;

  flipZ: boolean;

  updateGateActivation: interop.Enum<typeof MPSGraphRNNActivation>;

  resetGateActivation: interop.Enum<typeof MPSGraphRNNActivation>;

  outputGateActivation: interop.Enum<typeof MPSGraphRNNActivation>;

  static descriptor<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  setReverse(reverse: boolean): void;

  setBidirectional(bidirectional: boolean): void;

  setTraining(training: boolean): void;

  setResetGateFirst(resetGateFirst: boolean): void;

  setResetAfter(resetAfter: boolean): void;

  setFlipZ(flipZ: boolean): void;

  setUpdateGateActivation(updateGateActivation: interop.Enum<typeof MPSGraphRNNActivation>): void;

  setResetGateActivation(resetGateActivation: interop.Enum<typeof MPSGraphRNNActivation>): void;

  setOutputGateActivation(outputGateActivation: interop.Enum<typeof MPSGraphRNNActivation>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class MPSGraphLSTMDescriptor extends MPSGraphObject implements NSCopying {
  reverse: boolean;

  bidirectional: boolean;

  produceCell: boolean;

  training: boolean;

  forgetGateLast: boolean;

  inputGateActivation: interop.Enum<typeof MPSGraphRNNActivation>;

  forgetGateActivation: interop.Enum<typeof MPSGraphRNNActivation>;

  cellGateActivation: interop.Enum<typeof MPSGraphRNNActivation>;

  outputGateActivation: interop.Enum<typeof MPSGraphRNNActivation>;

  activation: interop.Enum<typeof MPSGraphRNNActivation>;

  static descriptor<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  setReverse(reverse: boolean): void;

  setBidirectional(bidirectional: boolean): void;

  setProduceCell(produceCell: boolean): void;

  setTraining(training: boolean): void;

  setForgetGateLast(forgetGateLast: boolean): void;

  setInputGateActivation(inputGateActivation: interop.Enum<typeof MPSGraphRNNActivation>): void;

  setForgetGateActivation(forgetGateActivation: interop.Enum<typeof MPSGraphRNNActivation>): void;

  setCellGateActivation(cellGateActivation: interop.Enum<typeof MPSGraphRNNActivation>): void;

  setOutputGateActivation(outputGateActivation: interop.Enum<typeof MPSGraphRNNActivation>): void;

  setActivation(activation: interop.Enum<typeof MPSGraphRNNActivation>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class MPSGraphPooling2DOpDescriptor extends MPSGraphObject implements NSCopying {
  kernelWidth: number;

  kernelHeight: number;

  strideInX: number;

  strideInY: number;

  dilationRateInX: number;

  dilationRateInY: number;

  paddingLeft: number;

  paddingRight: number;

  paddingTop: number;

  paddingBottom: number;

  paddingStyle: interop.Enum<typeof MPSGraphPaddingStyle>;

  dataLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>;

  returnIndicesMode: interop.Enum<typeof MPSGraphPoolingReturnIndicesMode>;

  returnIndicesDataType: interop.Enum<typeof MPSDataType>;

  ceilMode: boolean;

  includeZeroPadToAverage: boolean;

  static descriptorWithKernelWidthKernelHeightStrideInXStrideInYDilationRateInXDilationRateInYPaddingLeftPaddingRightPaddingTopPaddingBottomPaddingStyleDataLayout<This extends abstract new (...args: any) => any>(this: This, kernelWidth: number, kernelHeight: number, strideInX: number, strideInY: number, dilationRateInX: number, dilationRateInY: number, paddingLeft: number, paddingRight: number, paddingTop: number, paddingBottom: number, paddingStyle: interop.Enum<typeof MPSGraphPaddingStyle>, dataLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>): InstanceType<This>;

  static descriptorWithKernelWidthKernelHeightStrideInXStrideInYPaddingStyleDataLayout<This extends abstract new (...args: any) => any>(this: This, kernelWidth: number, kernelHeight: number, strideInX: number, strideInY: number, paddingStyle: interop.Enum<typeof MPSGraphPaddingStyle>, dataLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>): InstanceType<This>;

  setExplicitPaddingWithPaddingLeftPaddingRightPaddingTopPaddingBottom(paddingLeft: number, paddingRight: number, paddingTop: number, paddingBottom: number): void;

  setKernelWidth(kernelWidth: number): void;

  setKernelHeight(kernelHeight: number): void;

  setStrideInX(strideInX: number): void;

  setStrideInY(strideInY: number): void;

  setDilationRateInX(dilationRateInX: number): void;

  setDilationRateInY(dilationRateInY: number): void;

  setPaddingLeft(paddingLeft: number): void;

  setPaddingRight(paddingRight: number): void;

  setPaddingTop(paddingTop: number): void;

  setPaddingBottom(paddingBottom: number): void;

  setPaddingStyle(paddingStyle: interop.Enum<typeof MPSGraphPaddingStyle>): void;

  setDataLayout(dataLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>): void;

  setReturnIndicesMode(returnIndicesMode: interop.Enum<typeof MPSGraphPoolingReturnIndicesMode>): void;

  setReturnIndicesDataType(returnIndicesDataType: interop.Enum<typeof MPSDataType>): void;

  setCeilMode(ceilMode: boolean): void;

  setIncludeZeroPadToAverage(includeZeroPadToAverage: boolean): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class MPSGraphVariableOp extends MPSGraphOperation {
  readonly shape: NSArray;

  readonly dataType: interop.Enum<typeof MPSDataType>;
}

declare class MPSGraphDepthwiseConvolution2DOpDescriptor extends MPSGraphObject implements NSCopying {
  strideInX: number;

  strideInY: number;

  dilationRateInX: number;

  dilationRateInY: number;

  paddingLeft: number;

  paddingRight: number;

  paddingTop: number;

  paddingBottom: number;

  paddingStyle: interop.Enum<typeof MPSGraphPaddingStyle>;

  dataLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>;

  weightsLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>;

  static descriptorWithStrideInXStrideInYDilationRateInXDilationRateInYPaddingLeftPaddingRightPaddingTopPaddingBottomPaddingStyleDataLayoutWeightsLayout<This extends abstract new (...args: any) => any>(this: This, strideInX: number, strideInY: number, dilationRateInX: number, dilationRateInY: number, paddingLeft: number, paddingRight: number, paddingTop: number, paddingBottom: number, paddingStyle: interop.Enum<typeof MPSGraphPaddingStyle>, dataLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>, weightsLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>): InstanceType<This>;

  static descriptorWithDataLayoutWeightsLayout<This extends abstract new (...args: any) => any>(this: This, dataLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>, weightsLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>): InstanceType<This>;

  setExplicitPaddingWithPaddingLeftPaddingRightPaddingTopPaddingBottom(paddingLeft: number, paddingRight: number, paddingTop: number, paddingBottom: number): void;

  setStrideInX(strideInX: number): void;

  setStrideInY(strideInY: number): void;

  setDilationRateInX(dilationRateInX: number): void;

  setDilationRateInY(dilationRateInY: number): void;

  setPaddingLeft(paddingLeft: number): void;

  setPaddingRight(paddingRight: number): void;

  setPaddingTop(paddingTop: number): void;

  setPaddingBottom(paddingBottom: number): void;

  setPaddingStyle(paddingStyle: interop.Enum<typeof MPSGraphPaddingStyle>): void;

  setDataLayout(dataLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>): void;

  setWeightsLayout(weightsLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class MPSGraphConvolution2DOpDescriptor extends MPSGraphObject implements NSCopying {
  strideInX: number;

  strideInY: number;

  dilationRateInX: number;

  dilationRateInY: number;

  paddingLeft: number;

  paddingRight: number;

  paddingTop: number;

  paddingBottom: number;

  paddingStyle: interop.Enum<typeof MPSGraphPaddingStyle>;

  dataLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>;

  weightsLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>;

  groups: number;

  static descriptorWithStrideInXStrideInYDilationRateInXDilationRateInYGroupsPaddingLeftPaddingRightPaddingTopPaddingBottomPaddingStyleDataLayoutWeightsLayout<This extends abstract new (...args: any) => any>(this: This, strideInX: number, strideInY: number, dilationRateInX: number, dilationRateInY: number, groups: number, paddingLeft: number, paddingRight: number, paddingTop: number, paddingBottom: number, paddingStyle: interop.Enum<typeof MPSGraphPaddingStyle>, dataLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>, weightsLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>): InstanceType<This>;

  static descriptorWithStrideInXStrideInYDilationRateInXDilationRateInYGroupsPaddingStyleDataLayoutWeightsLayout<This extends abstract new (...args: any) => any>(this: This, strideInX: number, strideInY: number, dilationRateInX: number, dilationRateInY: number, groups: number, paddingStyle: interop.Enum<typeof MPSGraphPaddingStyle>, dataLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>, weightsLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>): InstanceType<This>;

  setExplicitPaddingWithPaddingLeftPaddingRightPaddingTopPaddingBottom(paddingLeft: number, paddingRight: number, paddingTop: number, paddingBottom: number): void;

  setStrideInX(strideInX: number): void;

  setStrideInY(strideInY: number): void;

  setDilationRateInX(dilationRateInX: number): void;

  setDilationRateInY(dilationRateInY: number): void;

  setPaddingLeft(paddingLeft: number): void;

  setPaddingRight(paddingRight: number): void;

  setPaddingTop(paddingTop: number): void;

  setPaddingBottom(paddingBottom: number): void;

  setPaddingStyle(paddingStyle: interop.Enum<typeof MPSGraphPaddingStyle>): void;

  setDataLayout(dataLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>): void;

  setWeightsLayout(weightsLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>): void;

  setGroups(groups: number): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class MPSGraphExecutable extends MPSGraphObject {
  options: interop.Enum<typeof MPSGraphOptions>;

  readonly feedTensors: NSArray;

  readonly targetTensors: NSArray;

  specializeWithDeviceInputTypesCompilationDescriptor(device: MPSGraphDevice | null, inputTypes: NSArray<interop.Object> | Array<interop.Object>, compilationDescriptor: MPSGraphCompilationDescriptor | null): void;

  getOutputTypesWithDeviceInputTypesCompilationDescriptor(device: MPSGraphDevice | null, inputTypes: NSArray<interop.Object> | Array<interop.Object>, compilationDescriptor: MPSGraphCompilationDescriptor | null): NSArray | null;

  runWithMTLCommandQueueInputsArrayResultsArrayExecutionDescriptor(commandQueue: MTLCommandQueue, inputsArray: NSArray<interop.Object> | Array<interop.Object>, resultsArray: NSArray<interop.Object> | Array<interop.Object> | null, executionDescriptor: MPSGraphExecutableExecutionDescriptor | null): NSArray;

  runAsyncWithMTLCommandQueueInputsArrayResultsArrayExecutionDescriptor(commandQueue: MTLCommandQueue, inputsArray: NSArray<interop.Object> | Array<interop.Object>, resultsArray: NSArray<interop.Object> | Array<interop.Object> | null, executionDescriptor: MPSGraphExecutableExecutionDescriptor | null): NSArray;

  encodeToCommandBufferInputsArrayResultsArrayExecutionDescriptor(commandBuffer: MPSCommandBuffer, inputsArray: NSArray<interop.Object> | Array<interop.Object>, resultsArray: NSArray<interop.Object> | Array<interop.Object> | null, executionDescriptor: MPSGraphExecutableExecutionDescriptor | null): NSArray;

  serializeToMPSGraphPackageAtURLDescriptor(url: NSURL, descriptor: MPSGraphExecutableSerializationDescriptor | null): void;

  initWithMPSGraphPackageAtURLCompilationDescriptor(mpsgraphPackageURL: NSURL, compilationDescriptor: MPSGraphCompilationDescriptor | null): this;

  initWithCoreMLPackageAtURLCompilationDescriptor(coreMLPackageURL: NSURL, compilationDescriptor: MPSGraphCompilationDescriptor | null): this;

  setOptions(options: interop.Enum<typeof MPSGraphOptions>): void;
}

declare class MPSGraphExecutableExecutionDescriptor extends MPSGraphObject implements NSCopying {
  scheduledHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void;

  completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void;

  waitUntilCompleted: boolean;

  waitForEventValue(event: MTLSharedEvent, value: number): void;

  signalEventAtExecutionEventValue(event: MTLSharedEvent, executionStage: interop.Enum<typeof MPSGraphExecutionStage>, value: number): void;

  setScheduledHandler(scheduledHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void): void;

  setCompletionHandler(completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSError) => void): void;

  setWaitUntilCompleted(waitUntilCompleted: boolean): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class MPSGraph extends MPSGraphObject {
  options: interop.Enum<typeof MPSGraphOptions>;

  static new<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  init(): this;

  readonly placeholderTensors: NSArray;

  compileWithDeviceFeedsTargetTensorsTargetOperationsCompilationDescriptor(device: MPSGraphDevice | null, feeds: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, targetTensors: NSArray<interop.Object> | Array<interop.Object>, targetOperations: NSArray<interop.Object> | Array<interop.Object> | null, compilationDescriptor: MPSGraphCompilationDescriptor | null): MPSGraphExecutable;

  runWithFeedsTargetTensorsTargetOperations(feeds: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, targetTensors: NSArray<interop.Object> | Array<interop.Object>, targetOperations: NSArray<interop.Object> | Array<interop.Object> | null): NSDictionary;

  runWithMTLCommandQueueFeedsTargetTensorsTargetOperations(commandQueue: MTLCommandQueue, feeds: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, targetTensors: NSArray<interop.Object> | Array<interop.Object>, targetOperations: NSArray<interop.Object> | Array<interop.Object> | null): NSDictionary;

  runWithMTLCommandQueueFeedsTargetOperationsResultsDictionary(commandQueue: MTLCommandQueue, feeds: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, targetOperations: NSArray<interop.Object> | Array<interop.Object> | null, resultsDictionary: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  runAsyncWithFeedsTargetTensorsTargetOperationsExecutionDescriptor(feeds: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, targetTensors: NSArray<interop.Object> | Array<interop.Object>, targetOperations: NSArray<interop.Object> | Array<interop.Object> | null, executionDescriptor: MPSGraphExecutionDescriptor | null): NSDictionary;

  runAsyncWithMTLCommandQueueFeedsTargetTensorsTargetOperationsExecutionDescriptor(commandQueue: MTLCommandQueue, feeds: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, targetTensors: NSArray<interop.Object> | Array<interop.Object>, targetOperations: NSArray<interop.Object> | Array<interop.Object> | null, executionDescriptor: MPSGraphExecutionDescriptor | null): NSDictionary;

  runAsyncWithMTLCommandQueueFeedsTargetOperationsResultsDictionaryExecutionDescriptor(commandQueue: MTLCommandQueue, feeds: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, targetOperations: NSArray<interop.Object> | Array<interop.Object> | null, resultsDictionary: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, executionDescriptor: MPSGraphExecutionDescriptor | null): void;

  encodeToCommandBufferFeedsTargetTensorsTargetOperationsExecutionDescriptor(commandBuffer: MPSCommandBuffer, feeds: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, targetTensors: NSArray<interop.Object> | Array<interop.Object>, targetOperations: NSArray<interop.Object> | Array<interop.Object> | null, executionDescriptor: MPSGraphExecutionDescriptor | null): NSDictionary;

  encodeToCommandBufferFeedsTargetOperationsResultsDictionaryExecutionDescriptor(commandBuffer: MPSCommandBuffer, feeds: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, targetOperations: NSArray<interop.Object> | Array<interop.Object> | null, resultsDictionary: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, executionDescriptor: MPSGraphExecutionDescriptor | null): void;

  setOptions(options: interop.Enum<typeof MPSGraphOptions>): void;

  gradientForPrimaryTensorWithTensorsName(primaryTensor: MPSGraphTensor, tensors: NSArray<interop.Object> | Array<interop.Object>, name: string | null): NSDictionary;

  reLUWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  reLUGradientWithIncomingGradientSourceTensorName(gradient: MPSGraphTensor, source: MPSGraphTensor, name: string | null): MPSGraphTensor;

  sigmoidWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  sigmoidGradientWithIncomingGradientSourceTensorName(gradient: MPSGraphTensor, source: MPSGraphTensor, name: string | null): MPSGraphTensor;

  softMaxWithTensorAxisName(tensor: MPSGraphTensor, axis: number, name: string | null): MPSGraphTensor;

  softMaxGradientWithIncomingGradientSourceTensorAxisName(gradient: MPSGraphTensor, source: MPSGraphTensor, axis: number, name: string | null): MPSGraphTensor;

  leakyReLUWithTensorAlphaName(tensor: MPSGraphTensor, alpha: number, name: string | null): MPSGraphTensor;

  leakyReLUWithTensorAlphaTensorName(tensor: MPSGraphTensor, alphaTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  leakyReLUGradientWithIncomingGradientSourceTensorAlphaTensorName(gradient: MPSGraphTensor, source: MPSGraphTensor, alphaTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  identityWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  exponentWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  exponentBase2WithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  exponentBase10WithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  logarithmWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  logarithmBase2WithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  logarithmBase10WithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  squareWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  squareRootWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  reciprocalSquareRootWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  reverseSquareRootWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  reciprocalWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  absoluteWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  absoluteSquareWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  negativeWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  signWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  signbitWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  ceilWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  floorWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  roundWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  rintWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  sinWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  cosWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  tanWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  sinhWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  coshWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  tanhWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  asinWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  acosWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  atanWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  asinhWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  acoshWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  atanhWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  notWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  isInfiniteWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  isFiniteWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  isNaNWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  erfWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  truncateWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  bitwiseNOTWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  bitwisePopulationCountWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  conjugateWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  additionWithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  subtractionWithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  multiplicationWithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  divisionWithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  moduloWithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  powerWithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  minimumWithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  maximumWithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  minimumWithNaNPropagationWithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  maximumWithNaNPropagationWithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  equalWithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  notEqualWithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  lessThanWithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  lessThanOrEqualToWithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  greaterThanWithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  greaterThanOrEqualToWithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  logicalANDWithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  logicalORWithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  logicalNANDWithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  logicalNORWithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  logicalXORWithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  logicalXNORWithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  atan2WithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  bitwiseANDWithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  bitwiseORWithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  bitwiseXORWithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  bitwiseLeftShiftWithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  bitwiseRightShiftWithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  selectWithPredicateTensorTruePredicateTensorFalsePredicateTensorName(predicateTensor: MPSGraphTensor, truePredicateTensor: MPSGraphTensor, falseSelectTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  clampWithTensorMinValueTensorMaxValueTensorName(tensor: MPSGraphTensor, minValueTensor: MPSGraphTensor, maxValueTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  divisionNoNaNWithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  floorModuloWithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  realPartOfTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  imaginaryPartOfTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  complexTensorWithRealTensorImaginaryTensorName(realTensor: MPSGraphTensor, imaginaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  callSymbolNameInputTensorsOutputTypesName(symbolName: string, inputTensors: NSArray<interop.Object> | Array<interop.Object>, outputTypes: NSArray<interop.Object> | Array<interop.Object>, name: string | null): NSArray;

  convolution2DWithSourceTensorWeightsTensorDescriptorName(source: MPSGraphTensor, weights: MPSGraphTensor, descriptor: MPSGraphConvolution2DOpDescriptor, name: string | null): MPSGraphTensor;

  convolution2DDataGradientWithIncomingGradientTensorWeightsTensorOutputShapeForwardConvolutionDescriptorName(incomingGradient: MPSGraphTensor, weights: MPSGraphTensor, outputShape: NSArray<interop.Object> | Array<interop.Object>, forwardConvolutionDescriptor: MPSGraphConvolution2DOpDescriptor, name: string | null): MPSGraphTensor;

  convolution2DDataGradientWithIncomingGradientTensorWeightsTensorOutputShapeTensorForwardConvolutionDescriptorName(gradient: MPSGraphTensor, weights: MPSGraphTensor, outputShapeTensor: MPSGraphTensor, forwardConvolutionDescriptor: MPSGraphConvolution2DOpDescriptor, name: string | null): MPSGraphTensor;

  convolution2DWeightsGradientWithIncomingGradientTensorSourceTensorOutputShapeForwardConvolutionDescriptorName(incomingGradient: MPSGraphTensor, source: MPSGraphTensor, outputShape: NSArray<interop.Object> | Array<interop.Object>, forwardConvolutionDescriptor: MPSGraphConvolution2DOpDescriptor, name: string | null): MPSGraphTensor;

  convolution2DWeightsGradientWithIncomingGradientTensorSourceTensorOutputShapeTensorForwardConvolutionDescriptorName(gradient: MPSGraphTensor, source: MPSGraphTensor, outputShapeTensor: MPSGraphTensor, forwardConvolutionDescriptor: MPSGraphConvolution2DOpDescriptor, name: string | null): MPSGraphTensor;

  convolution3DWithSourceTensorWeightsTensorDescriptorName(source: MPSGraphTensor, weights: MPSGraphTensor, descriptor: MPSGraphConvolution3DOpDescriptor, name: string | null): MPSGraphTensor;

  convolution3DDataGradientWithIncomingGradientTensorWeightsTensorOutputShapeForwardConvolutionDescriptorName(incomingGradient: MPSGraphTensor, weights: MPSGraphTensor, outputShape: NSArray<interop.Object> | Array<interop.Object>, forwardConvolutionDescriptor: MPSGraphConvolution3DOpDescriptor, name: string | null): MPSGraphTensor;

  convolution3DDataGradientWithIncomingGradientTensorWeightsTensorOutputShapeTensorForwardConvolutionDescriptorName(gradient: MPSGraphTensor, weights: MPSGraphTensor, outputShapeTensor: MPSGraphTensor, forwardConvolutionDescriptor: MPSGraphConvolution3DOpDescriptor, name: string | null): MPSGraphTensor;

  convolution3DWeightsGradientWithIncomingGradientTensorSourceTensorOutputShapeForwardConvolutionDescriptorName(incomingGradient: MPSGraphTensor, source: MPSGraphTensor, outputShape: NSArray<interop.Object> | Array<interop.Object>, forwardConvolutionDescriptor: MPSGraphConvolution3DOpDescriptor, name: string | null): MPSGraphTensor;

  convolution3DWeightsGradientWithIncomingGradientTensorSourceTensorOutputShapeTensorForwardConvolutionDescriptorName(gradient: MPSGraphTensor, source: MPSGraphTensor, outputShapeTensor: MPSGraphTensor, forwardConvolutionDescriptor: MPSGraphConvolution3DOpDescriptor, name: string | null): MPSGraphTensor;

  convolutionTranspose2DWithSourceTensorWeightsTensorOutputShapeDescriptorName(source: MPSGraphTensor, weights: MPSGraphTensor, outputShape: NSArray<interop.Object> | Array<interop.Object>, descriptor: MPSGraphConvolution2DOpDescriptor, name: string | null): MPSGraphTensor;

  convolutionTranspose2DWithSourceTensorWeightsTensorOutputShapeTensorDescriptorName(source: MPSGraphTensor, weights: MPSGraphTensor, outputShape: MPSGraphTensor, descriptor: MPSGraphConvolution2DOpDescriptor, name: string | null): MPSGraphTensor;

  convolutionTranspose2DDataGradientWithIncomingGradientTensorWeightsTensorOutputShapeForwardConvolutionDescriptorName(incomingGradient: MPSGraphTensor, weights: MPSGraphTensor, outputShape: NSArray<interop.Object> | Array<interop.Object>, forwardConvolutionDescriptor: MPSGraphConvolution2DOpDescriptor, name: string | null): MPSGraphTensor;

  convolutionTranspose2DDataGradientWithIncomingGradientTensorWeightsTensorOutputShapeTensorForwardConvolutionDescriptorName(incomingGradient: MPSGraphTensor, weights: MPSGraphTensor, outputShape: MPSGraphTensor, forwardConvolutionDescriptor: MPSGraphConvolution2DOpDescriptor, name: string | null): MPSGraphTensor;

  convolutionTranspose2DWeightsGradientWithIncomingGradientTensorSourceTensorOutputShapeForwardConvolutionDescriptorName(incomingGradientTensor: MPSGraphTensor, source: MPSGraphTensor, outputShape: NSArray<interop.Object> | Array<interop.Object>, forwardConvolutionDescriptor: MPSGraphConvolution2DOpDescriptor, name: string | null): MPSGraphTensor;

  convolutionTranspose2DWeightsGradientWithIncomingGradientTensorSourceTensorOutputShapeTensorForwardConvolutionDescriptorName(incomingGradientTensor: MPSGraphTensor, source: MPSGraphTensor, outputShape: MPSGraphTensor, forwardConvolutionDescriptor: MPSGraphConvolution2DOpDescriptor, name: string | null): MPSGraphTensor;

  controlDependencyWithOperationsDependentBlockName(operations: NSArray<interop.Object> | Array<interop.Object>, dependentBlock: () => NSArray, name: string | null): NSArray;

  ifWithPredicateTensorThenBlockElseBlockName(predicateTensor: MPSGraphTensor, thenBlock: () => NSArray, elseBlock: () => NSArray | null, name: string | null): NSArray;

  whileWithInitialInputsBeforeAfterName(initialInputs: NSArray<interop.Object> | Array<interop.Object>, before: (p1: NSArray<interop.Object> | Array<interop.Object>, p2: NSMutableArray) => MPSGraphTensor, after: (p1: NSArray<interop.Object> | Array<interop.Object>) => NSArray, name: string | null): NSArray;

  forLoopWithLowerBoundUpperBoundStepInitialBodyArgumentsBodyName(lowerBound: MPSGraphTensor, upperBound: MPSGraphTensor, step: MPSGraphTensor, initialBodyArguments: NSArray<interop.Object> | Array<interop.Object>, body: (p1: MPSGraphTensor, p2: NSArray<interop.Object> | Array<interop.Object>) => NSArray, name: string | null): NSArray;

  forLoopWithNumberOfIterationsInitialBodyArgumentsBodyName(numberOfIterations: MPSGraphTensor, initialBodyArguments: NSArray<interop.Object> | Array<interop.Object>, body: (p1: MPSGraphTensor, p2: NSArray<interop.Object> | Array<interop.Object>) => NSArray, name: string | null): NSArray;

  cumulativeSumWithTensorAxisExclusiveReverseName(tensor: MPSGraphTensor, axis: number, exclusive: boolean, reverse: boolean, name: string | null): MPSGraphTensor;

  cumulativeSumWithTensorAxisTensorExclusiveReverseName(tensor: MPSGraphTensor, axisTensor: MPSGraphTensor, exclusive: boolean, reverse: boolean, name: string | null): MPSGraphTensor;

  cumulativeSumWithTensorAxisName(tensor: MPSGraphTensor, axis: number, name: string | null): MPSGraphTensor;

  cumulativeSumWithTensorAxisTensorName(tensor: MPSGraphTensor, axisTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  cumulativeProductWithTensorAxisExclusiveReverseName(tensor: MPSGraphTensor, axis: number, exclusive: boolean, reverse: boolean, name: string | null): MPSGraphTensor;

  cumulativeProductWithTensorAxisTensorExclusiveReverseName(tensor: MPSGraphTensor, axisTensor: MPSGraphTensor, exclusive: boolean, reverse: boolean, name: string | null): MPSGraphTensor;

  cumulativeProductWithTensorAxisName(tensor: MPSGraphTensor, axis: number, name: string | null): MPSGraphTensor;

  cumulativeProductWithTensorAxisTensorName(tensor: MPSGraphTensor, axisTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  cumulativeMinimumWithTensorAxisExclusiveReverseName(tensor: MPSGraphTensor, axis: number, exclusive: boolean, reverse: boolean, name: string | null): MPSGraphTensor;

  cumulativeMinimumWithTensorAxisTensorExclusiveReverseName(tensor: MPSGraphTensor, axisTensor: MPSGraphTensor, exclusive: boolean, reverse: boolean, name: string | null): MPSGraphTensor;

  cumulativeMinimumWithTensorAxisName(tensor: MPSGraphTensor, axis: number, name: string | null): MPSGraphTensor;

  cumulativeMinimumWithTensorAxisTensorName(tensor: MPSGraphTensor, axisTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  cumulativeMaximumWithTensorAxisExclusiveReverseName(tensor: MPSGraphTensor, axis: number, exclusive: boolean, reverse: boolean, name: string | null): MPSGraphTensor;

  cumulativeMaximumWithTensorAxisTensorExclusiveReverseName(tensor: MPSGraphTensor, axisTensor: MPSGraphTensor, exclusive: boolean, reverse: boolean, name: string | null): MPSGraphTensor;

  cumulativeMaximumWithTensorAxisName(tensor: MPSGraphTensor, axis: number, name: string | null): MPSGraphTensor;

  cumulativeMaximumWithTensorAxisTensorName(tensor: MPSGraphTensor, axisTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  depthwiseConvolution2DWithSourceTensorWeightsTensorDescriptorName(source: MPSGraphTensor, weights: MPSGraphTensor, descriptor: MPSGraphDepthwiseConvolution2DOpDescriptor, name: string | null): MPSGraphTensor;

  depthwiseConvolution2DDataGradientWithIncomingGradientTensorWeightsTensorOutputShapeDescriptorName(incomingGradient: MPSGraphTensor, weights: MPSGraphTensor, outputShape: NSArray<interop.Object> | Array<interop.Object>, descriptor: MPSGraphDepthwiseConvolution2DOpDescriptor, name: string | null): MPSGraphTensor;

  depthwiseConvolution2DWeightsGradientWithIncomingGradientTensorSourceTensorOutputShapeDescriptorName(incomingGradient: MPSGraphTensor, source: MPSGraphTensor, outputShape: NSArray<interop.Object> | Array<interop.Object>, descriptor: MPSGraphDepthwiseConvolution2DOpDescriptor, name: string | null): MPSGraphTensor;

  depthwiseConvolution3DWithSourceTensorWeightsTensorDescriptorName(source: MPSGraphTensor, weights: MPSGraphTensor, descriptor: MPSGraphDepthwiseConvolution3DOpDescriptor, name: string | null): MPSGraphTensor;

  depthwiseConvolution3DDataGradientWithIncomingGradientTensorWeightsTensorOutputShapeDescriptorName(incomingGradient: MPSGraphTensor, weights: MPSGraphTensor, outputShape: NSArray<interop.Object> | Array<interop.Object> | null, descriptor: MPSGraphDepthwiseConvolution3DOpDescriptor, name: string | null): MPSGraphTensor;

  depthwiseConvolution3DWeightsGradientWithIncomingGradientTensorSourceTensorOutputShapeDescriptorName(incomingGradient: MPSGraphTensor, source: MPSGraphTensor, outputShape: NSArray<interop.Object> | Array<interop.Object>, descriptor: MPSGraphDepthwiseConvolution3DOpDescriptor, name: string | null): MPSGraphTensor;

  fastFourierTransformWithTensorAxesDescriptorName(tensor: MPSGraphTensor, axes: NSArray<interop.Object> | Array<interop.Object>, descriptor: MPSGraphFFTDescriptor, name: string | null): MPSGraphTensor;

  fastFourierTransformWithTensorAxesTensorDescriptorName(tensor: MPSGraphTensor, axesTensor: MPSGraphTensor, descriptor: MPSGraphFFTDescriptor, name: string | null): MPSGraphTensor;

  realToHermiteanFFTWithTensorAxesDescriptorName(tensor: MPSGraphTensor, axes: NSArray<interop.Object> | Array<interop.Object>, descriptor: MPSGraphFFTDescriptor, name: string | null): MPSGraphTensor;

  realToHermiteanFFTWithTensorAxesTensorDescriptorName(tensor: MPSGraphTensor, axesTensor: MPSGraphTensor, descriptor: MPSGraphFFTDescriptor, name: string | null): MPSGraphTensor;

  HermiteanToRealFFTWithTensorAxesDescriptorName(tensor: MPSGraphTensor, axes: NSArray<interop.Object> | Array<interop.Object>, descriptor: MPSGraphFFTDescriptor, name: string | null): MPSGraphTensor;

  HermiteanToRealFFTWithTensorAxesTensorDescriptorName(tensor: MPSGraphTensor, axesTensor: MPSGraphTensor, descriptor: MPSGraphFFTDescriptor, name: string | null): MPSGraphTensor;

  gatherNDWithUpdatesTensorIndicesTensorBatchDimensionsName(updatesTensor: MPSGraphTensor, indicesTensor: MPSGraphTensor, batchDimensions: number, name: string | null): MPSGraphTensor;

  gatherWithUpdatesTensorIndicesTensorAxisBatchDimensionsName(updatesTensor: MPSGraphTensor, indicesTensor: MPSGraphTensor, axis: number, batchDimensions: number, name: string | null): MPSGraphTensor;

  gatherAlongAxisWithUpdatesTensorIndicesTensorName(axis: number, updatesTensor: MPSGraphTensor, indicesTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  gatherAlongAxisTensorWithUpdatesTensorIndicesTensorName(axisTensor: MPSGraphTensor, updatesTensor: MPSGraphTensor, indicesTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  imToColWithSourceTensorDescriptorName(source: MPSGraphTensor, descriptor: MPSGraphImToColOpDescriptor, name: string | null): MPSGraphTensor;

  colToImWithSourceTensorOutputShapeDescriptorName(source: MPSGraphTensor, outputShape: NSArray<interop.Object> | Array<interop.Object>, descriptor: MPSGraphImToColOpDescriptor, name: string | null): MPSGraphTensor;

  bandPartWithTensorNumLowerNumUpperName(inputTensor: MPSGraphTensor, numLower: number, numUpper: number, name: string | null): MPSGraphTensor;

  bandPartWithTensorNumLowerTensorNumUpperTensorName(inputTensor: MPSGraphTensor, numLowerTensor: MPSGraphTensor, numUpperTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  softMaxCrossEntropyWithSourceTensorLabelsTensorAxisReductionTypeName(sourceTensor: MPSGraphTensor, labelsTensor: MPSGraphTensor, axis: number, reductionType: interop.Enum<typeof MPSGraphLossReductionType>, name: string | null): MPSGraphTensor;

  softMaxCrossEntropyGradientWithIncomingGradientTensorSourceTensorLabelsTensorAxisReductionTypeName(gradientTensor: MPSGraphTensor, sourceTensor: MPSGraphTensor, labelsTensor: MPSGraphTensor, axis: number, reductionType: interop.Enum<typeof MPSGraphLossReductionType>, name: string | null): MPSGraphTensor;

  inverseOfTensorName(inputTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  matrixMultiplicationWithPrimaryTensorSecondaryTensorName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  HammingDistanceWithPrimaryTensorSecondaryTensorResultDataTypeName(primaryTensor: MPSGraphTensor, secondaryTensor: MPSGraphTensor, resultDataType: interop.Enum<typeof MPSDataType>, name: string | null): MPSGraphTensor;

  scaledDotProductAttentionWithQueryTensorKeyTensorValueTensorMaskTensorScaleName(queryTensor: MPSGraphTensor, keyTensor: MPSGraphTensor, valueTensor: MPSGraphTensor, maskTensor: MPSGraphTensor | null, scale: number, name: string | null): MPSGraphTensor;

  scaledDotProductAttentionWithQueryTensorKeyTensorValueTensorScaleName(queryTensor: MPSGraphTensor, keyTensor: MPSGraphTensor, valueTensor: MPSGraphTensor, scale: number, name: string | null): MPSGraphTensor;

  placeholderWithShapeDataTypeName(shape: NSArray<interop.Object> | Array<interop.Object> | null, dataType: interop.Enum<typeof MPSDataType>, name: string | null): MPSGraphTensor;

  placeholderWithShapeName(shape: NSArray<interop.Object> | Array<interop.Object> | null, name: string | null): MPSGraphTensor;

  constantWithDataShapeDataType(data: NSData, shape: NSArray<interop.Object> | Array<interop.Object>, dataType: interop.Enum<typeof MPSDataType>): MPSGraphTensor;

  constantWithScalarDataType(scalar: number, dataType: interop.Enum<typeof MPSDataType>): MPSGraphTensor;

  constantWithScalarShapeDataType(scalar: number, shape: NSArray<interop.Object> | Array<interop.Object>, dataType: interop.Enum<typeof MPSDataType>): MPSGraphTensor;

  constantWithRealPartImaginaryPart(realPart: number, imaginaryPart: number): MPSGraphTensor;

  constantWithRealPartImaginaryPartDataType(realPart: number, imaginaryPart: number, dataType: interop.Enum<typeof MPSDataType>): MPSGraphTensor;

  constantWithRealPartImaginaryPartShapeDataType(realPart: number, imaginaryPart: number, shape: NSArray<interop.Object> | Array<interop.Object>, dataType: interop.Enum<typeof MPSDataType>): MPSGraphTensor;

  variableWithDataShapeDataTypeName(data: NSData, shape: NSArray<interop.Object> | Array<interop.Object>, dataType: interop.Enum<typeof MPSDataType>, name: string | null): MPSGraphTensor;

  variableFromTensorWithTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  readVariableName(variable: MPSGraphTensor, name: string | null): MPSGraphTensor;

  assignVariableWithValueOfTensorName(variable: MPSGraphTensor, tensor: MPSGraphTensor, name: string | null): MPSGraphOperation;

  nonMaximumSuppressionWithBoxesTensorScoresTensorIOUThresholdScoreThresholdPerClassSuppressionCoordinateModeName(boxesTensor: MPSGraphTensor, scoresTensor: MPSGraphTensor, IOUThreshold: number, scoreThreshold: number, perClassSuppression: boolean, coordinateMode: interop.Enum<typeof MPSGraphNonMaximumSuppressionCoordinateMode>, name: string | null): MPSGraphTensor;

  nonMaximumSuppressionWithBoxesTensorScoresTensorClassIndicesTensorIOUThresholdScoreThresholdPerClassSuppressionCoordinateModeName(boxesTensor: MPSGraphTensor, scoresTensor: MPSGraphTensor, classIndicesTensor: MPSGraphTensor, IOUThreshold: number, scoreThreshold: number, perClassSuppression: boolean, coordinateMode: interop.Enum<typeof MPSGraphNonMaximumSuppressionCoordinateMode>, name: string | null): MPSGraphTensor;

  nonZeroIndicesOfTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  meanOfTensorAxesName(tensor: MPSGraphTensor, axes: NSArray<interop.Object> | Array<interop.Object>, name: string | null): MPSGraphTensor;

  varianceOfTensorMeanTensorAxesName(tensor: MPSGraphTensor, meanTensor: MPSGraphTensor, axes: NSArray<interop.Object> | Array<interop.Object>, name: string | null): MPSGraphTensor;

  varianceOfTensorAxesName(tensor: MPSGraphTensor, axes: NSArray<interop.Object> | Array<interop.Object>, name: string | null): MPSGraphTensor;

  normalizationWithTensorMeanTensorVarianceTensorGammaTensorBetaTensorEpsilonName(tensor: MPSGraphTensor, mean: MPSGraphTensor, variance: MPSGraphTensor, gamma: MPSGraphTensor | null, beta: MPSGraphTensor | null, epsilon: number, name: string | null): MPSGraphTensor;

  normalizationGammaGradientWithIncomingGradientTensorSourceTensorMeanTensorVarianceTensorReductionAxesEpsilonName(incomingGradientTensor: MPSGraphTensor, sourceTensor: MPSGraphTensor, meanTensor: MPSGraphTensor, varianceTensor: MPSGraphTensor, axes: NSArray<interop.Object> | Array<interop.Object>, epsilon: number, name: string | null): MPSGraphTensor;

  normalizationBetaGradientWithIncomingGradientTensorSourceTensorReductionAxesName(incomingGradientTensor: MPSGraphTensor, sourceTensor: MPSGraphTensor, axes: NSArray<interop.Object> | Array<interop.Object>, name: string | null): MPSGraphTensor;

  normalizationGradientWithIncomingGradientTensorSourceTensorMeanTensorVarianceTensorGammaTensorGammaGradientTensorBetaGradientTensorReductionAxesEpsilonName(incomingGradientTensor: MPSGraphTensor, sourceTensor: MPSGraphTensor, meanTensor: MPSGraphTensor, varianceTensor: MPSGraphTensor, gamma: MPSGraphTensor | null, gammaGradient: MPSGraphTensor | null, betaGradient: MPSGraphTensor | null, axes: NSArray<interop.Object> | Array<interop.Object>, epsilon: number, name: string | null): MPSGraphTensor;

  oneHotWithIndicesTensorDepthAxisDataTypeOnValueOffValueName(indicesTensor: MPSGraphTensor, depth: number, axis: number, dataType: interop.Enum<typeof MPSDataType>, onValue: number, offValue: number, name: string | null): MPSGraphTensor;

  oneHotWithIndicesTensorDepthDataTypeOnValueOffValueName(indicesTensor: MPSGraphTensor, depth: number, dataType: interop.Enum<typeof MPSDataType>, onValue: number, offValue: number, name: string | null): MPSGraphTensor;

  oneHotWithIndicesTensorDepthAxisDataTypeName(indicesTensor: MPSGraphTensor, depth: number, axis: number, dataType: interop.Enum<typeof MPSDataType>, name: string | null): MPSGraphTensor;

  oneHotWithIndicesTensorDepthAxisName(indicesTensor: MPSGraphTensor, depth: number, axis: number, name: string | null): MPSGraphTensor;

  oneHotWithIndicesTensorDepthDataTypeName(indicesTensor: MPSGraphTensor, depth: number, dataType: interop.Enum<typeof MPSDataType>, name: string | null): MPSGraphTensor;

  oneHotWithIndicesTensorDepthName(indicesTensor: MPSGraphTensor, depth: number, name: string | null): MPSGraphTensor;

  stochasticGradientDescentWithLearningRateTensorValuesTensorGradientTensorName(learningRateTensor: MPSGraphTensor, valuesTensor: MPSGraphTensor, gradientTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  applyStochasticGradientDescentWithLearningRateTensorVariableGradientTensorName(learningRateTensor: MPSGraphTensor, variable: MPSGraphVariableOp, gradientTensor: MPSGraphTensor, name: string | null): MPSGraphOperation;

  adamWithLearningRateTensorBeta1TensorBeta2TensorEpsilonTensorBeta1PowerTensorBeta2PowerTensorValuesTensorMomentumTensorVelocityTensorMaximumVelocityTensorGradientTensorName(learningRateTensor: MPSGraphTensor, beta1Tensor: MPSGraphTensor, beta2Tensor: MPSGraphTensor, epsilonTensor: MPSGraphTensor, beta1PowerTensor: MPSGraphTensor, beta2PowerTensor: MPSGraphTensor, valuesTensor: MPSGraphTensor, momentumTensor: MPSGraphTensor, velocityTensor: MPSGraphTensor, maximumVelocityTensor: MPSGraphTensor | null, gradientTensor: MPSGraphTensor, name: string | null): NSArray;

  adamWithCurrentLearningRateTensorBeta1TensorBeta2TensorEpsilonTensorValuesTensorMomentumTensorVelocityTensorMaximumVelocityTensorGradientTensorName(currentLearningRateTensor: MPSGraphTensor, beta1Tensor: MPSGraphTensor, beta2Tensor: MPSGraphTensor, epsilonTensor: MPSGraphTensor, valuesTensor: MPSGraphTensor, momentumTensor: MPSGraphTensor, velocityTensor: MPSGraphTensor, maximumVelocityTensor: MPSGraphTensor | null, gradientTensor: MPSGraphTensor, name: string | null): NSArray;

  maxPooling2DWithSourceTensorDescriptorName(source: MPSGraphTensor, descriptor: MPSGraphPooling2DOpDescriptor, name: string | null): MPSGraphTensor;

  maxPooling2DReturnIndicesWithSourceTensorDescriptorName(source: MPSGraphTensor, descriptor: MPSGraphPooling2DOpDescriptor, name: string | null): NSArray;

  maxPooling2DGradientWithGradientTensorSourceTensorDescriptorName(gradient: MPSGraphTensor, source: MPSGraphTensor, descriptor: MPSGraphPooling2DOpDescriptor, name: string | null): MPSGraphTensor;

  maxPooling2DGradientWithGradientTensorIndicesTensorOutputShapeDescriptorName(gradient: MPSGraphTensor, indices: MPSGraphTensor, outputShape: NSArray<interop.Object> | Array<interop.Object>, descriptor: MPSGraphPooling2DOpDescriptor, name: string | null): MPSGraphTensor;

  maxPooling2DGradientWithGradientTensorIndicesTensorOutputShapeTensorDescriptorName(gradient: MPSGraphTensor, indices: MPSGraphTensor, outputShape: MPSGraphTensor, descriptor: MPSGraphPooling2DOpDescriptor, name: string | null): MPSGraphTensor;

  avgPooling2DWithSourceTensorDescriptorName(source: MPSGraphTensor, descriptor: MPSGraphPooling2DOpDescriptor, name: string | null): MPSGraphTensor;

  avgPooling2DGradientWithGradientTensorSourceTensorDescriptorName(gradient: MPSGraphTensor, source: MPSGraphTensor, descriptor: MPSGraphPooling2DOpDescriptor, name: string | null): MPSGraphTensor;

  maxPooling4DWithSourceTensorDescriptorName(source: MPSGraphTensor, descriptor: MPSGraphPooling4DOpDescriptor, name: string | null): MPSGraphTensor;

  maxPooling4DReturnIndicesWithSourceTensorDescriptorName(source: MPSGraphTensor, descriptor: MPSGraphPooling4DOpDescriptor, name: string | null): NSArray;

  maxPooling4DGradientWithGradientTensorSourceTensorDescriptorName(gradient: MPSGraphTensor, source: MPSGraphTensor, descriptor: MPSGraphPooling4DOpDescriptor, name: string | null): MPSGraphTensor;

  maxPooling4DGradientWithGradientTensorIndicesTensorOutputShapeDescriptorName(gradient: MPSGraphTensor, indices: MPSGraphTensor, outputShape: NSArray<interop.Object> | Array<interop.Object>, descriptor: MPSGraphPooling4DOpDescriptor, name: string | null): MPSGraphTensor;

  maxPooling4DGradientWithGradientTensorIndicesTensorOutputShapeTensorDescriptorName(gradient: MPSGraphTensor, indices: MPSGraphTensor, outputShape: MPSGraphTensor, descriptor: MPSGraphPooling4DOpDescriptor, name: string | null): MPSGraphTensor;

  avgPooling4DWithSourceTensorDescriptorName(source: MPSGraphTensor, descriptor: MPSGraphPooling4DOpDescriptor, name: string | null): MPSGraphTensor;

  avgPooling4DGradientWithGradientTensorSourceTensorDescriptorName(gradient: MPSGraphTensor, source: MPSGraphTensor, descriptor: MPSGraphPooling4DOpDescriptor, name: string | null): MPSGraphTensor;

  L2NormPooling4DWithSourceTensorDescriptorName(source: MPSGraphTensor, descriptor: MPSGraphPooling4DOpDescriptor, name: string | null): MPSGraphTensor;

  L2NormPooling4DGradientWithGradientTensorSourceTensorDescriptorName(gradient: MPSGraphTensor, source: MPSGraphTensor, descriptor: MPSGraphPooling4DOpDescriptor, name: string | null): MPSGraphTensor;

  quantizeTensorScaleZeroPointDataTypeName(tensor: MPSGraphTensor, scale: number, zeroPoint: number, dataType: interop.Enum<typeof MPSDataType>, name: string | null): MPSGraphTensor;

  dequantizeTensorScaleZeroPointDataTypeName(tensor: MPSGraphTensor, scale: number, zeroPoint: number, dataType: interop.Enum<typeof MPSDataType>, name: string | null): MPSGraphTensor;

  quantizeTensorScaleTensorZeroPointDataTypeAxisName(tensor: MPSGraphTensor, scaleTensor: MPSGraphTensor, zeroPoint: number, dataType: interop.Enum<typeof MPSDataType>, axis: number, name: string | null): MPSGraphTensor;

  dequantizeTensorScaleTensorZeroPointDataTypeAxisName(tensor: MPSGraphTensor, scaleTensor: MPSGraphTensor, zeroPoint: number, dataType: interop.Enum<typeof MPSDataType>, axis: number, name: string | null): MPSGraphTensor;

  quantizeTensorScaleTensorZeroPointTensorDataTypeAxisName(tensor: MPSGraphTensor, scaleTensor: MPSGraphTensor, zeroPointTensor: MPSGraphTensor, dataType: interop.Enum<typeof MPSDataType>, axis: number, name: string | null): MPSGraphTensor;

  dequantizeTensorScaleTensorZeroPointTensorDataTypeAxisName(tensor: MPSGraphTensor, scaleTensor: MPSGraphTensor, zeroPointTensor: MPSGraphTensor, dataType: interop.Enum<typeof MPSDataType>, axis: number, name: string | null): MPSGraphTensor;

  dequantizeTensorScaleTensorZeroPointTensorDataTypeName(tensor: MPSGraphTensor, scaleTensor: MPSGraphTensor, zeroPointTensor: MPSGraphTensor, dataType: interop.Enum<typeof MPSDataType>, name: string | null): MPSGraphTensor;

  dequantizeTensorScaleTensorDataTypeName(tensor: MPSGraphTensor, scaleTensor: MPSGraphTensor, dataType: interop.Enum<typeof MPSDataType>, name: string | null): MPSGraphTensor;

  dequantizeTensorLUTTensorName(tensor: MPSGraphTensor, LUTTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  dequantizeTensorLUTTensorAxisName(tensor: MPSGraphTensor, LUTTensor: MPSGraphTensor, axis: number, name: string | null): MPSGraphTensor;

  randomPhiloxStateTensorWithSeedName(seed: number, name: string | null): MPSGraphTensor;

  randomPhiloxStateTensorWithCounterLowCounterHighKeyName(counterLow: number, counterHigh: number, key: number, name: string | null): MPSGraphTensor;

  randomTensorWithShapeDescriptorName(shape: NSArray<interop.Object> | Array<interop.Object>, descriptor: MPSGraphRandomOpDescriptor, name: string | null): MPSGraphTensor;

  randomTensorWithShapeTensorDescriptorName(shapeTensor: MPSGraphTensor, descriptor: MPSGraphRandomOpDescriptor, name: string | null): MPSGraphTensor;

  randomTensorWithShapeDescriptorSeedName(shape: NSArray<interop.Object> | Array<interop.Object>, descriptor: MPSGraphRandomOpDescriptor, seed: number, name: string | null): MPSGraphTensor;

  randomTensorWithShapeTensorDescriptorSeedName(shapeTensor: MPSGraphTensor, descriptor: MPSGraphRandomOpDescriptor, seed: number, name: string | null): MPSGraphTensor;

  randomTensorWithShapeDescriptorStateTensorName(shape: NSArray<interop.Object> | Array<interop.Object>, descriptor: MPSGraphRandomOpDescriptor, state: MPSGraphTensor, name: string | null): NSArray;

  randomTensorWithShapeTensorDescriptorStateTensorName(shapeTensor: MPSGraphTensor, descriptor: MPSGraphRandomOpDescriptor, state: MPSGraphTensor, name: string | null): NSArray;

  randomUniformTensorWithShapeName(shape: NSArray<interop.Object> | Array<interop.Object>, name: string | null): MPSGraphTensor;

  randomUniformTensorWithShapeTensorName(shapeTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  randomUniformTensorWithShapeSeedName(shape: NSArray<interop.Object> | Array<interop.Object>, seed: number, name: string | null): MPSGraphTensor;

  randomUniformTensorWithShapeTensorSeedName(shapeTensor: MPSGraphTensor, seed: number, name: string | null): MPSGraphTensor;

  randomUniformTensorWithShapeStateTensorName(shape: NSArray<interop.Object> | Array<interop.Object>, state: MPSGraphTensor, name: string | null): NSArray;

  randomUniformTensorWithShapeTensorStateTensorName(shapeTensor: MPSGraphTensor, state: MPSGraphTensor, name: string | null): NSArray;

  dropoutTensorRateName(tensor: MPSGraphTensor, rate: number, name: string | null): MPSGraphTensor;

  dropoutTensorRateTensorName(tensor: MPSGraphTensor, rate: MPSGraphTensor, name: string | null): MPSGraphTensor;

  reductionSumWithTensorAxisName(tensor: MPSGraphTensor, axis: number, name: string | null): MPSGraphTensor;

  reductionSumWithTensorAxesName(tensor: MPSGraphTensor, axes: NSArray<interop.Object> | Array<interop.Object> | null, name: string | null): MPSGraphTensor;

  reductionMaximumWithTensorAxisName(tensor: MPSGraphTensor, axis: number, name: string | null): MPSGraphTensor;

  reductionMaximumWithTensorAxesName(tensor: MPSGraphTensor, axes: NSArray<interop.Object> | Array<interop.Object> | null, name: string | null): MPSGraphTensor;

  reductionMinimumWithTensorAxisName(tensor: MPSGraphTensor, axis: number, name: string | null): MPSGraphTensor;

  reductionMinimumWithTensorAxesName(tensor: MPSGraphTensor, axes: NSArray<interop.Object> | Array<interop.Object> | null, name: string | null): MPSGraphTensor;

  reductionMaximumPropagateNaNWithTensorAxisName(tensor: MPSGraphTensor, axis: number, name: string | null): MPSGraphTensor;

  reductionMaximumPropagateNaNWithTensorAxesName(tensor: MPSGraphTensor, axes: NSArray<interop.Object> | Array<interop.Object> | null, name: string | null): MPSGraphTensor;

  reductionMinimumPropagateNaNWithTensorAxisName(tensor: MPSGraphTensor, axis: number, name: string | null): MPSGraphTensor;

  reductionMinimumPropagateNaNWithTensorAxesName(tensor: MPSGraphTensor, axes: NSArray<interop.Object> | Array<interop.Object> | null, name: string | null): MPSGraphTensor;

  reductionProductWithTensorAxisName(tensor: MPSGraphTensor, axis: number, name: string | null): MPSGraphTensor;

  reductionProductWithTensorAxesName(tensor: MPSGraphTensor, axes: NSArray<interop.Object> | Array<interop.Object> | null, name: string | null): MPSGraphTensor;

  reductionArgMaximumWithTensorAxisName(tensor: MPSGraphTensor, axis: number, name: string | null): MPSGraphTensor;

  reductionArgMinimumWithTensorAxisName(tensor: MPSGraphTensor, axis: number, name: string | null): MPSGraphTensor;

  reductionAndWithTensorAxisName(tensor: MPSGraphTensor, axis: number, name: string | null): MPSGraphTensor;

  reductionAndWithTensorAxesName(tensor: MPSGraphTensor, axes: NSArray<interop.Object> | Array<interop.Object> | null, name: string | null): MPSGraphTensor;

  reductionOrWithTensorAxisName(tensor: MPSGraphTensor, axis: number, name: string | null): MPSGraphTensor;

  reductionOrWithTensorAxesName(tensor: MPSGraphTensor, axes: NSArray<interop.Object> | Array<interop.Object> | null, name: string | null): MPSGraphTensor;

  resizeTensorSizeModeCenterResultAlignCornersLayoutName(imagesTensor: MPSGraphTensor, size: NSArray<interop.Object> | Array<interop.Object>, mode: interop.Enum<typeof MPSGraphResizeMode>, centerResult: boolean, alignCorners: boolean, layout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>, name: string | null): MPSGraphTensor;

  resizeTensorSizeTensorModeCenterResultAlignCornersLayoutName(imagesTensor: MPSGraphTensor, size: MPSGraphTensor, mode: interop.Enum<typeof MPSGraphResizeMode>, centerResult: boolean, alignCorners: boolean, layout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>, name: string | null): MPSGraphTensor;

  resizeTensorSizeTensorModeCenterResultAlignCornersName(imagesTensor: MPSGraphTensor, size: MPSGraphTensor, mode: interop.Enum<typeof MPSGraphResizeMode>, centerResult: boolean, alignCorners: boolean, name: string | null): MPSGraphTensor;

  resizeNearestWithTensorSizeTensorNearestRoundingModeCenterResultAlignCornersLayoutName(imagesTensor: MPSGraphTensor, size: MPSGraphTensor, nearestRoundingMode: interop.Enum<typeof MPSGraphResizeNearestRoundingMode>, centerResult: boolean, alignCorners: boolean, layout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>, name: string | null): MPSGraphTensor;

  resizeNearestWithTensorSizeTensorNearestRoundingModeCenterResultAlignCornersName(imagesTensor: MPSGraphTensor, size: MPSGraphTensor, nearestRoundingMode: interop.Enum<typeof MPSGraphResizeNearestRoundingMode>, centerResult: boolean, alignCorners: boolean, name: string | null): MPSGraphTensor;

  resizeBilinearWithTensorSizeTensorCenterResultAlignCornersLayoutName(imagesTensor: MPSGraphTensor, size: MPSGraphTensor, centerResult: boolean, alignCorners: boolean, layout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>, name: string | null): MPSGraphTensor;

  resizeBilinearWithTensorSizeTensorCenterResultAlignCornersName(imagesTensor: MPSGraphTensor, size: MPSGraphTensor, centerResult: boolean, alignCorners: boolean, name: string | null): MPSGraphTensor;

  resizeTensorSizeTensorScaleOffsetTensorModeLayoutName(imagesTensor: MPSGraphTensor, size: MPSGraphTensor, scaleOffset: MPSGraphTensor, mode: interop.Enum<typeof MPSGraphResizeMode>, layout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>, name: string | null): MPSGraphTensor;

  resizeTensorSizeTensorScaleTensorOffsetTensorModeName(imagesTensor: MPSGraphTensor, size: MPSGraphTensor, scale: MPSGraphTensor, offset: MPSGraphTensor, mode: interop.Enum<typeof MPSGraphResizeMode>, name: string | null): MPSGraphTensor;

  resizeNearestWithTensorSizeTensorScaleOffsetTensorNearestRoundingModeLayoutName(imagesTensor: MPSGraphTensor, size: MPSGraphTensor, scaleOffset: MPSGraphTensor, nearestRoundingMode: interop.Enum<typeof MPSGraphResizeNearestRoundingMode>, layout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>, name: string | null): MPSGraphTensor;

  resizeNearestWithTensorSizeTensorScaleTensorOffsetTensorNearestRoundingModeName(imagesTensor: MPSGraphTensor, size: MPSGraphTensor, scale: MPSGraphTensor, offset: MPSGraphTensor, nearestRoundingMode: interop.Enum<typeof MPSGraphResizeNearestRoundingMode>, name: string | null): MPSGraphTensor;

  resizeBilinearWithTensorSizeTensorScaleOffsetTensorLayoutName(imagesTensor: MPSGraphTensor, size: MPSGraphTensor, scaleOffset: MPSGraphTensor, layout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>, name: string | null): MPSGraphTensor;

  resizeBilinearWithTensorSizeTensorScaleTensorOffsetTensorName(imagesTensor: MPSGraphTensor, size: MPSGraphTensor, scale: MPSGraphTensor, offset: MPSGraphTensor, name: string | null): MPSGraphTensor;

  resizeWithGradientTensorInputModeCenterResultAlignCornersLayoutName(gradient: MPSGraphTensor, input: MPSGraphTensor, mode: interop.Enum<typeof MPSGraphResizeMode>, centerResult: boolean, alignCorners: boolean, layout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>, name: string | null): MPSGraphTensor;

  resizeNearestWithGradientTensorInputNearestRoundingModeCenterResultAlignCornersLayoutName(gradient: MPSGraphTensor, input: MPSGraphTensor, nearestRoundingMode: interop.Enum<typeof MPSGraphResizeNearestRoundingMode>, centerResult: boolean, alignCorners: boolean, layout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>, name: string | null): MPSGraphTensor;

  resizeBilinearWithGradientTensorInputCenterResultAlignCornersLayoutName(gradient: MPSGraphTensor, input: MPSGraphTensor, centerResult: boolean, alignCorners: boolean, layout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>, name: string | null): MPSGraphTensor;

  resizeWithGradientTensorInputScaleOffsetTensorModeLayoutName(gradient: MPSGraphTensor, input: MPSGraphTensor, scaleOffset: MPSGraphTensor, mode: interop.Enum<typeof MPSGraphResizeMode>, layout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>, name: string | null): MPSGraphTensor;

  resizeWithGradientTensorInputScaleTensorOffsetTensorModeName(gradient: MPSGraphTensor, input: MPSGraphTensor, scale: MPSGraphTensor, offset: MPSGraphTensor, mode: interop.Enum<typeof MPSGraphResizeMode>, name: string | null): MPSGraphTensor;

  resizeNearestWithGradientTensorInputScaleOffsetTensorNearestRoundingModeLayoutName(gradient: MPSGraphTensor, input: MPSGraphTensor, scaleOffset: MPSGraphTensor, nearestRoundingMode: interop.Enum<typeof MPSGraphResizeNearestRoundingMode>, layout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>, name: string | null): MPSGraphTensor;

  resizeNearestWithGradientTensorInputScaleTensorOffsetTensorNearestRoundingModeName(gradient: MPSGraphTensor, input: MPSGraphTensor, scale: MPSGraphTensor, offset: MPSGraphTensor, nearestRoundingMode: interop.Enum<typeof MPSGraphResizeNearestRoundingMode>, name: string | null): MPSGraphTensor;

  resizeBilinearWithGradientTensorInputScaleOffsetTensorLayoutName(gradient: MPSGraphTensor, input: MPSGraphTensor, scaleOffset: MPSGraphTensor, layout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>, name: string | null): MPSGraphTensor;

  resizeBilinearWithGradientTensorInputScaleTensorOffsetTensorName(gradient: MPSGraphTensor, input: MPSGraphTensor, scale: MPSGraphTensor, offset: MPSGraphTensor, name: string | null): MPSGraphTensor;

  singleGateRNNWithSourceTensorRecurrentWeightInputWeightBiasInitStateMaskDescriptorName(source: MPSGraphTensor, recurrentWeight: MPSGraphTensor, inputWeight: MPSGraphTensor | null, bias: MPSGraphTensor | null, initState: MPSGraphTensor | null, mask: MPSGraphTensor | null, descriptor: MPSGraphSingleGateRNNDescriptor, name: string | null): NSArray;

  singleGateRNNWithSourceTensorRecurrentWeightInputWeightBiasInitStateDescriptorName(source: MPSGraphTensor, recurrentWeight: MPSGraphTensor, inputWeight: MPSGraphTensor | null, bias: MPSGraphTensor | null, initState: MPSGraphTensor | null, descriptor: MPSGraphSingleGateRNNDescriptor, name: string | null): NSArray;

  singleGateRNNWithSourceTensorRecurrentWeightInitStateDescriptorName(source: MPSGraphTensor, recurrentWeight: MPSGraphTensor, initState: MPSGraphTensor | null, descriptor: MPSGraphSingleGateRNNDescriptor, name: string | null): NSArray;

  singleGateRNNGradientsWithSourceTensorRecurrentWeightSourceGradientZStateStateGradientInputWeightBiasInitStateMaskDescriptorName(source: MPSGraphTensor, recurrentWeight: MPSGraphTensor, sourceGradient: MPSGraphTensor, zState: MPSGraphTensor, stateGradient: MPSGraphTensor | null, inputWeight: MPSGraphTensor | null, bias: MPSGraphTensor | null, initState: MPSGraphTensor | null, mask: MPSGraphTensor | null, descriptor: MPSGraphSingleGateRNNDescriptor, name: string | null): NSArray;

  singleGateRNNGradientsWithSourceTensorRecurrentWeightSourceGradientZStateInputWeightBiasInitStateMaskDescriptorName(source: MPSGraphTensor, recurrentWeight: MPSGraphTensor, sourceGradient: MPSGraphTensor, zState: MPSGraphTensor, inputWeight: MPSGraphTensor | null, bias: MPSGraphTensor | null, initState: MPSGraphTensor | null, mask: MPSGraphTensor | null, descriptor: MPSGraphSingleGateRNNDescriptor, name: string | null): NSArray;

  singleGateRNNGradientsWithSourceTensorRecurrentWeightSourceGradientZStateInputWeightBiasInitStateDescriptorName(source: MPSGraphTensor, recurrentWeight: MPSGraphTensor, sourceGradient: MPSGraphTensor, zState: MPSGraphTensor, inputWeight: MPSGraphTensor | null, bias: MPSGraphTensor | null, initState: MPSGraphTensor | null, descriptor: MPSGraphSingleGateRNNDescriptor, name: string | null): NSArray;

  singleGateRNNGradientsWithSourceTensorRecurrentWeightSourceGradientZStateInitStateDescriptorName(source: MPSGraphTensor, recurrentWeight: MPSGraphTensor, sourceGradient: MPSGraphTensor, zState: MPSGraphTensor, initState: MPSGraphTensor | null, descriptor: MPSGraphSingleGateRNNDescriptor, name: string | null): NSArray;

  LSTMWithSourceTensorRecurrentWeightInputWeightBiasInitStateInitCellMaskPeepholeDescriptorName(source: MPSGraphTensor, recurrentWeight: MPSGraphTensor, inputWeight: MPSGraphTensor | null, bias: MPSGraphTensor | null, initState: MPSGraphTensor | null, initCell: MPSGraphTensor | null, mask: MPSGraphTensor | null, peephole: MPSGraphTensor | null, descriptor: MPSGraphLSTMDescriptor, name: string | null): NSArray;

  LSTMWithSourceTensorRecurrentWeightInputWeightBiasInitStateInitCellDescriptorName(source: MPSGraphTensor, recurrentWeight: MPSGraphTensor, inputWeight: MPSGraphTensor | null, bias: MPSGraphTensor | null, initState: MPSGraphTensor | null, initCell: MPSGraphTensor | null, descriptor: MPSGraphLSTMDescriptor, name: string | null): NSArray;

  LSTMWithSourceTensorRecurrentWeightInitStateInitCellDescriptorName(source: MPSGraphTensor, recurrentWeight: MPSGraphTensor, initState: MPSGraphTensor | null, initCell: MPSGraphTensor | null, descriptor: MPSGraphLSTMDescriptor, name: string | null): NSArray;

  LSTMGradientsWithSourceTensorRecurrentWeightSourceGradientZStateCellOutputFwdStateGradientCellGradientInputWeightBiasInitStateInitCellMaskPeepholeDescriptorName(source: MPSGraphTensor, recurrentWeight: MPSGraphTensor, sourceGradient: MPSGraphTensor, zState: MPSGraphTensor, cellOutputFwd: MPSGraphTensor, stateGradient: MPSGraphTensor | null, cellGradient: MPSGraphTensor | null, inputWeight: MPSGraphTensor | null, bias: MPSGraphTensor | null, initState: MPSGraphTensor | null, initCell: MPSGraphTensor | null, mask: MPSGraphTensor | null, peephole: MPSGraphTensor | null, descriptor: MPSGraphLSTMDescriptor, name: string | null): NSArray;

  LSTMGradientsWithSourceTensorRecurrentWeightSourceGradientZStateCellOutputFwdInputWeightBiasInitStateInitCellMaskDescriptorName(source: MPSGraphTensor, recurrentWeight: MPSGraphTensor, sourceGradient: MPSGraphTensor, zState: MPSGraphTensor, cellOutputFwd: MPSGraphTensor, inputWeight: MPSGraphTensor | null, bias: MPSGraphTensor | null, initState: MPSGraphTensor | null, initCell: MPSGraphTensor | null, mask: MPSGraphTensor | null, descriptor: MPSGraphLSTMDescriptor, name: string | null): NSArray;

  LSTMGradientsWithSourceTensorRecurrentWeightSourceGradientZStateCellOutputFwdInputWeightBiasInitStateInitCellDescriptorName(source: MPSGraphTensor, recurrentWeight: MPSGraphTensor, sourceGradient: MPSGraphTensor, zState: MPSGraphTensor, cellOutputFwd: MPSGraphTensor, inputWeight: MPSGraphTensor | null, bias: MPSGraphTensor | null, initState: MPSGraphTensor | null, initCell: MPSGraphTensor | null, descriptor: MPSGraphLSTMDescriptor, name: string | null): NSArray;

  LSTMGradientsWithSourceTensorRecurrentWeightSourceGradientZStateCellOutputFwdDescriptorName(source: MPSGraphTensor, recurrentWeight: MPSGraphTensor, sourceGradient: MPSGraphTensor, zState: MPSGraphTensor, cellOutputFwd: MPSGraphTensor, descriptor: MPSGraphLSTMDescriptor, name: string | null): NSArray;

  GRUWithSourceTensorRecurrentWeightInputWeightBiasInitStateMaskSecondaryBiasDescriptorName(source: MPSGraphTensor, recurrentWeight: MPSGraphTensor, inputWeight: MPSGraphTensor | null, bias: MPSGraphTensor | null, initState: MPSGraphTensor | null, mask: MPSGraphTensor | null, secondaryBias: MPSGraphTensor | null, descriptor: MPSGraphGRUDescriptor, name: string | null): NSArray;

  GRUWithSourceTensorRecurrentWeightInputWeightBiasInitStateDescriptorName(source: MPSGraphTensor, recurrentWeight: MPSGraphTensor, inputWeight: MPSGraphTensor | null, bias: MPSGraphTensor | null, initState: MPSGraphTensor | null, descriptor: MPSGraphGRUDescriptor, name: string | null): NSArray;

  GRUWithSourceTensorRecurrentWeightInputWeightBiasDescriptorName(source: MPSGraphTensor, recurrentWeight: MPSGraphTensor, inputWeight: MPSGraphTensor | null, bias: MPSGraphTensor | null, descriptor: MPSGraphGRUDescriptor, name: string | null): NSArray;

  GRUGradientsWithSourceTensorRecurrentWeightSourceGradientZStateOutputFwdStateGradientInputWeightBiasInitStateMaskSecondaryBiasDescriptorName(source: MPSGraphTensor, recurrentWeight: MPSGraphTensor, sourceGradient: MPSGraphTensor, zState: MPSGraphTensor, outputFwd: MPSGraphTensor, stateGradient: MPSGraphTensor | null, inputWeight: MPSGraphTensor | null, bias: MPSGraphTensor | null, initState: MPSGraphTensor | null, mask: MPSGraphTensor | null, secondaryBias: MPSGraphTensor | null, descriptor: MPSGraphGRUDescriptor, name: string | null): NSArray;

  GRUGradientsWithSourceTensorRecurrentWeightSourceGradientZStateOutputFwdInputWeightBiasInitStateDescriptorName(source: MPSGraphTensor, recurrentWeight: MPSGraphTensor, sourceGradient: MPSGraphTensor, zState: MPSGraphTensor, outputFwd: MPSGraphTensor, inputWeight: MPSGraphTensor | null, bias: MPSGraphTensor | null, initState: MPSGraphTensor | null, descriptor: MPSGraphGRUDescriptor, name: string | null): NSArray;

  GRUGradientsWithSourceTensorRecurrentWeightSourceGradientZStateOutputFwdInputWeightBiasDescriptorName(source: MPSGraphTensor, recurrentWeight: MPSGraphTensor, sourceGradient: MPSGraphTensor, zState: MPSGraphTensor, outputFwd: MPSGraphTensor, inputWeight: MPSGraphTensor | null, bias: MPSGraphTensor | null, descriptor: MPSGraphGRUDescriptor, name: string | null): NSArray;

  sampleGridWithSourceTensorCoordinateTensorLayoutNormalizeCoordinatesRelativeCoordinatesAlignCornersPaddingModeSamplingModeConstantValueName(source: MPSGraphTensor, coordinates: MPSGraphTensor, layout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>, normalizeCoordinates: boolean, relativeCoordinates: boolean, alignCorners: boolean, paddingMode: interop.Enum<typeof MPSGraphPaddingMode>, samplingMode: interop.Enum<typeof MPSGraphResizeMode>, constantValue: number, name: string | null): MPSGraphTensor;

  sampleGridWithSourceTensorCoordinateTensorLayoutNormalizeCoordinatesRelativeCoordinatesAlignCornersPaddingModeNearestRoundingModeConstantValueName(source: MPSGraphTensor, coordinates: MPSGraphTensor, layout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>, normalizeCoordinates: boolean, relativeCoordinates: boolean, alignCorners: boolean, paddingMode: interop.Enum<typeof MPSGraphPaddingMode>, nearestRoundingMode: interop.Enum<typeof MPSGraphResizeNearestRoundingMode>, constantValue: number, name: string | null): MPSGraphTensor;

  scatterNDWithUpdatesTensorIndicesTensorShapeBatchDimensionsModeName(updatesTensor: MPSGraphTensor, indicesTensor: MPSGraphTensor, shape: NSArray<interop.Object> | Array<interop.Object>, batchDimensions: number, mode: interop.Enum<typeof MPSGraphScatterMode>, name: string | null): MPSGraphTensor;

  scatterNDWithUpdatesTensorIndicesTensorShapeBatchDimensionsName(updatesTensor: MPSGraphTensor, indicesTensor: MPSGraphTensor, shape: NSArray<interop.Object> | Array<interop.Object>, batchDimensions: number, name: string | null): MPSGraphTensor;

  scatterNDWithDataTensorUpdatesTensorIndicesTensorBatchDimensionsModeName(dataTensor: MPSGraphTensor, updatesTensor: MPSGraphTensor, indicesTensor: MPSGraphTensor, batchDimensions: number, mode: interop.Enum<typeof MPSGraphScatterMode>, name: string | null): MPSGraphTensor;

  scatterWithUpdatesTensorIndicesTensorShapeAxisModeName(updatesTensor: MPSGraphTensor, indicesTensor: MPSGraphTensor, shape: NSArray<interop.Object> | Array<interop.Object>, axis: number, mode: interop.Enum<typeof MPSGraphScatterMode>, name: string | null): MPSGraphTensor;

  scatterWithDataTensorUpdatesTensorIndicesTensorAxisModeName(dataTensor: MPSGraphTensor, updatesTensor: MPSGraphTensor, indicesTensor: MPSGraphTensor, axis: number, mode: interop.Enum<typeof MPSGraphScatterMode>, name: string | null): MPSGraphTensor;

  scatterAlongAxisWithUpdatesTensorIndicesTensorShapeModeName(axis: number, updatesTensor: MPSGraphTensor, indicesTensor: MPSGraphTensor, shape: NSArray<interop.Object> | Array<interop.Object>, mode: interop.Enum<typeof MPSGraphScatterMode>, name: string | null): MPSGraphTensor;

  scatterAlongAxisTensorWithUpdatesTensorIndicesTensorShapeModeName(axisTensor: MPSGraphTensor, updatesTensor: MPSGraphTensor, indicesTensor: MPSGraphTensor, shape: NSArray<interop.Object> | Array<interop.Object>, mode: interop.Enum<typeof MPSGraphScatterMode>, name: string | null): MPSGraphTensor;

  scatterAlongAxisWithDataTensorUpdatesTensorIndicesTensorModeName(axis: number, dataTensor: MPSGraphTensor, updatesTensor: MPSGraphTensor, indicesTensor: MPSGraphTensor, mode: interop.Enum<typeof MPSGraphScatterMode>, name: string | null): MPSGraphTensor;

  scatterAlongAxisTensorWithDataTensorUpdatesTensorIndicesTensorModeName(axisTensor: MPSGraphTensor, dataTensor: MPSGraphTensor, updatesTensor: MPSGraphTensor, indicesTensor: MPSGraphTensor, mode: interop.Enum<typeof MPSGraphScatterMode>, name: string | null): MPSGraphTensor;

  sortWithTensorAxisDescendingName(tensor: MPSGraphTensor, axis: number, descending: boolean, name: string | null): MPSGraphTensor;

  sortWithTensorAxisTensorDescendingName(tensor: MPSGraphTensor, axisTensor: MPSGraphTensor, descending: boolean, name: string | null): MPSGraphTensor;

  sortWithTensorAxisName(tensor: MPSGraphTensor, axis: number, name: string | null): MPSGraphTensor;

  sortWithTensorAxisTensorName(tensor: MPSGraphTensor, axisTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  argSortWithTensorAxisDescendingName(tensor: MPSGraphTensor, axis: number, descending: boolean, name: string | null): MPSGraphTensor;

  argSortWithTensorAxisTensorDescendingName(tensor: MPSGraphTensor, axisTensor: MPSGraphTensor, descending: boolean, name: string | null): MPSGraphTensor;

  argSortWithTensorAxisName(tensor: MPSGraphTensor, axis: number, name: string | null): MPSGraphTensor;

  argSortWithTensorAxisTensorName(tensor: MPSGraphTensor, axisTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  sparseTensorWithTypeTensorsShapeDataTypeName(sparseStorageType: interop.Enum<typeof MPSGraphSparseStorageType>, inputTensorArray: NSArray<interop.Object> | Array<interop.Object>, shape: NSArray<interop.Object> | Array<interop.Object>, dataType: interop.Enum<typeof MPSDataType>, name: string | null): MPSGraphTensor;

  sparseTensorWithDescriptorTensorsShapeName(sparseDescriptor: MPSGraphCreateSparseOpDescriptor, inputTensorArray: NSArray<interop.Object> | Array<interop.Object>, shape: NSArray<interop.Object> | Array<interop.Object>, name: string | null): MPSGraphTensor;

  stencilWithSourceTensorWeightsTensorDescriptorName(source: MPSGraphTensor, weights: MPSGraphTensor, descriptor: MPSGraphStencilOpDescriptor, name: string | null): MPSGraphTensor;

  reshapeTensorWithShapeName(tensor: MPSGraphTensor, shape: NSArray<interop.Object> | Array<interop.Object>, name: string | null): MPSGraphTensor;

  reshapeTensorWithShapeTensorName(tensor: MPSGraphTensor, shapeTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  transposeTensorDimensionWithDimensionName(tensor: MPSGraphTensor, dimensionIndex: number, dimensionIndex2: number, name: string | null): MPSGraphTensor;

  transposeTensorPermutationName(tensor: MPSGraphTensor, permutation: NSArray<interop.Object> | Array<interop.Object>, name: string | null): MPSGraphTensor;

  sliceTensorDimensionStartLengthName(tensor: MPSGraphTensor, dimensionIndex: number, start: number, length: number, name: string | null): MPSGraphTensor;

  sliceTensorStartsEndsStridesName(tensor: MPSGraphTensor, starts: NSArray<interop.Object> | Array<interop.Object>, ends: NSArray<interop.Object> | Array<interop.Object>, strides: NSArray<interop.Object> | Array<interop.Object>, name: string | null): MPSGraphTensor;

  sliceTensorStartsEndsStridesStartMaskEndMaskSqueezeMaskName(tensor: MPSGraphTensor, starts: NSArray<interop.Object> | Array<interop.Object>, ends: NSArray<interop.Object> | Array<interop.Object>, strides: NSArray<interop.Object> | Array<interop.Object>, startMask: number, endMask: number, squeezeMask: number, name: string | null): MPSGraphTensor;

  sliceTensorStartTensorEndTensorStrideTensorStartMaskEndMaskSqueezeMaskName(tensor: MPSGraphTensor, startTensor: MPSGraphTensor, endTensor: MPSGraphTensor, strideTensor: MPSGraphTensor, startMask: number, endMask: number, squeezeMask: number, name: string | null): MPSGraphTensor;

  sliceTensorStartTensorSizeTensorSqueezeMaskName(tensor: MPSGraphTensor, startTensor: MPSGraphTensor, sizeTensor: MPSGraphTensor, squeezeMask: number, name: string | null): MPSGraphTensor;

  sliceGradientTensorFwdInShapeTensorStartsEndsStridesName(inputGradientTensor: MPSGraphTensor, fwdInShapeTensor: MPSGraphTensor, starts: NSArray<interop.Object> | Array<interop.Object>, ends: NSArray<interop.Object> | Array<interop.Object>, strides: NSArray<interop.Object> | Array<interop.Object>, name: string | null): MPSGraphTensor;

  sliceGradientTensorFwdInShapeTensorStartTensorEndTensorStrideTensorStartMaskEndMaskSqueezeMaskName(inputGradientTensor: MPSGraphTensor, fwdInShapeTensor: MPSGraphTensor, startTensor: MPSGraphTensor, endTensor: MPSGraphTensor, strideTensor: MPSGraphTensor, startMask: number, endMask: number, squeezeMask: number, name: string | null): MPSGraphTensor;

  sliceGradientTensorFwdInShapeTensorStartTensorSizeTensorSqueezeMaskName(inputGradientTensor: MPSGraphTensor, fwdInShapeTensor: MPSGraphTensor, startTensor: MPSGraphTensor, sizeTensor: MPSGraphTensor, squeezeMask: number, name: string | null): MPSGraphTensor;

  sliceGradientTensorFwdInShapeTensorStartsEndsStridesStartMaskEndMaskSqueezeMaskName(inputGradientTensor: MPSGraphTensor, fwdInShapeTensor: MPSGraphTensor, starts: NSArray<interop.Object> | Array<interop.Object>, ends: NSArray<interop.Object> | Array<interop.Object>, strides: NSArray<interop.Object> | Array<interop.Object>, startMask: number, endMask: number, squeezeMask: number, name: string | null): MPSGraphTensor;

  sliceUpdateDataTensorUpdateTensorStartsTensorEndsTensorStridesTensorStartMaskEndMaskSqueezeMaskName(dataTensor: MPSGraphTensor, updateTensor: MPSGraphTensor, startsTensor: MPSGraphTensor, endsTensor: MPSGraphTensor, stridesTensor: MPSGraphTensor, startMask: number, endMask: number, squeezeMask: number, name: string | null): MPSGraphTensor;

  sliceUpdateDataTensorUpdateTensorStartsEndsStridesStartMaskEndMaskSqueezeMaskName(dataTensor: MPSGraphTensor, updateTensor: MPSGraphTensor, starts: NSArray<interop.Object> | Array<interop.Object>, ends: NSArray<interop.Object> | Array<interop.Object>, strides: NSArray<interop.Object> | Array<interop.Object>, startMask: number, endMask: number, squeezeMask: number, name: string | null): MPSGraphTensor;

  sliceUpdateDataTensorUpdateTensorStartsTensorEndsTensorStridesTensorName(dataTensor: MPSGraphTensor, updateTensor: MPSGraphTensor, startsTensor: MPSGraphTensor, endsTensor: MPSGraphTensor, stridesTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  sliceUpdateDataTensorUpdateTensorStartsEndsStridesName(dataTensor: MPSGraphTensor, updateTensor: MPSGraphTensor, starts: NSArray<interop.Object> | Array<interop.Object>, ends: NSArray<interop.Object> | Array<interop.Object>, strides: NSArray<interop.Object> | Array<interop.Object>, name: string | null): MPSGraphTensor;

  concatTensorWithTensorDimensionName(tensor: MPSGraphTensor, tensor2: MPSGraphTensor, dimensionIndex: number, name: string | null): MPSGraphTensor;

  concatTensorsDimensionName(tensors: NSArray<interop.Object> | Array<interop.Object>, dimensionIndex: number, name: string | null): MPSGraphTensor;

  concatTensorsDimensionInterleaveName(tensors: NSArray<interop.Object> | Array<interop.Object>, dimensionIndex: number, interleave: boolean, name: string | null): MPSGraphTensor;

  tileTensorWithMultiplierName(tensor: MPSGraphTensor, multiplier: NSArray<interop.Object> | Array<interop.Object>, name: string | null): MPSGraphTensor;

  tileGradientWithIncomingGradientTensorSourceTensorWithMultiplierName(incomingGradientTensor: MPSGraphTensor, sourceTensor: MPSGraphTensor, multiplier: NSArray<interop.Object> | Array<interop.Object>, name: string | null): MPSGraphTensor;

  padTensorWithPaddingModeLeftPaddingRightPaddingConstantValueName(tensor: MPSGraphTensor, paddingMode: interop.Enum<typeof MPSGraphPaddingMode>, leftPadding: NSArray<interop.Object> | Array<interop.Object>, rightPadding: NSArray<interop.Object> | Array<interop.Object>, constantValue: number, name: string | null): MPSGraphTensor;

  padGradientWithIncomingGradientTensorSourceTensorPaddingModeLeftPaddingRightPaddingName(incomingGradientTensor: MPSGraphTensor, sourceTensor: MPSGraphTensor, paddingMode: interop.Enum<typeof MPSGraphPaddingMode>, leftPadding: NSArray<interop.Object> | Array<interop.Object>, rightPadding: NSArray<interop.Object> | Array<interop.Object>, name: string | null): MPSGraphTensor;

  spaceToDepth2DTensorWidthAxisHeightAxisDepthAxisBlockSizeUsePixelShuffleOrderName(tensor: MPSGraphTensor, widthAxis: number, heightAxis: number, depthAxis: number, blockSize: number, usePixelShuffleOrder: boolean, name: string | null): MPSGraphTensor;

  spaceToDepth2DTensorWidthAxisTensorHeightAxisTensorDepthAxisTensorBlockSizeUsePixelShuffleOrderName(tensor: MPSGraphTensor, widthAxisTensor: MPSGraphTensor, heightAxisTensor: MPSGraphTensor, depthAxisTensor: MPSGraphTensor, blockSize: number, usePixelShuffleOrder: boolean, name: string | null): MPSGraphTensor;

  depthToSpace2DTensorWidthAxisHeightAxisDepthAxisBlockSizeUsePixelShuffleOrderName(tensor: MPSGraphTensor, widthAxis: number, heightAxis: number, depthAxis: number, blockSize: number, usePixelShuffleOrder: boolean, name: string | null): MPSGraphTensor;

  depthToSpace2DTensorWidthAxisTensorHeightAxisTensorDepthAxisTensorBlockSizeUsePixelShuffleOrderName(tensor: MPSGraphTensor, widthAxisTensor: MPSGraphTensor, heightAxisTensor: MPSGraphTensor, depthAxisTensor: MPSGraphTensor, blockSize: number, usePixelShuffleOrder: boolean, name: string | null): MPSGraphTensor;

  spaceToBatchTensorSpatialAxesBatchAxisBlockDimensionsUsePixelShuffleOrderName(tensor: MPSGraphTensor, spatialAxes: NSArray<interop.Object> | Array<interop.Object>, batchAxis: number, blockDimensions: NSArray<interop.Object> | Array<interop.Object>, usePixelShuffleOrder: boolean, name: string | null): MPSGraphTensor;

  spaceToBatchTensorSpatialAxesTensorBatchAxisTensorBlockDimensionsTensorUsePixelShuffleOrderName(tensor: MPSGraphTensor, spatialAxesTensor: MPSGraphTensor, batchAxisTensor: MPSGraphTensor, blockDimensionsTensor: MPSGraphTensor, usePixelShuffleOrder: boolean, name: string | null): MPSGraphTensor;

  batchToSpaceTensorSpatialAxesBatchAxisBlockDimensionsUsePixelShuffleOrderName(tensor: MPSGraphTensor, spatialAxes: NSArray<interop.Object> | Array<interop.Object>, batchAxis: number, blockDimensions: NSArray<interop.Object> | Array<interop.Object>, usePixelShuffleOrder: boolean, name: string | null): MPSGraphTensor;

  batchToSpaceTensorSpatialAxesTensorBatchAxisTensorBlockDimensionsTensorUsePixelShuffleOrderName(tensor: MPSGraphTensor, spatialAxesTensor: MPSGraphTensor, batchAxisTensor: MPSGraphTensor, blockDimensionsTensor: MPSGraphTensor, usePixelShuffleOrder: boolean, name: string | null): MPSGraphTensor;

  reverseTensorAxesTensorName(tensor: MPSGraphTensor, axesTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  reverseTensorAxesName(tensor: MPSGraphTensor, axes: NSArray<interop.Object> | Array<interop.Object>, name: string | null): MPSGraphTensor;

  reverseTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  flatten2DTensorAxisName(tensor: MPSGraphTensor, axis: number, name: string | null): MPSGraphTensor;

  flatten2DTensorAxisTensorName(tensor: MPSGraphTensor, axisTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  broadcastTensorToShapeName(tensor: MPSGraphTensor, shape: NSArray<interop.Object> | Array<interop.Object>, name: string | null): MPSGraphTensor;

  broadcastTensorToShapeTensorName(tensor: MPSGraphTensor, shapeTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  shapeOfTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  castTensorToTypeName(tensor: MPSGraphTensor, type: interop.Enum<typeof MPSDataType>, name: string | null): MPSGraphTensor;

  reinterpretCastTensorToTypeName(tensor: MPSGraphTensor, type: interop.Enum<typeof MPSDataType>, name: string | null): MPSGraphTensor;

  stackTensorsAxisName(inputTensors: NSArray<interop.Object> | Array<interop.Object>, axis: number, name: string | null): MPSGraphTensor;

  splitTensorSplitSizesAxisName(tensor: MPSGraphTensor, splitSizes: NSArray<interop.Object> | Array<interop.Object>, axis: number, name: string | null): NSArray;

  splitTensorSplitSizesTensorAxisName(tensor: MPSGraphTensor, splitSizesTensor: MPSGraphTensor, axis: number, name: string | null): NSArray;

  splitTensorNumSplitsAxisName(tensor: MPSGraphTensor, numSplits: number, axis: number, name: string | null): NSArray;

  squeezeTensorName(tensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  squeezeTensorAxisName(tensor: MPSGraphTensor, axis: number, name: string | null): MPSGraphTensor;

  squeezeTensorAxesName(tensor: MPSGraphTensor, axes: NSArray<interop.Object> | Array<interop.Object>, name: string | null): MPSGraphTensor;

  squeezeTensorAxesTensorName(tensor: MPSGraphTensor, axesTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  expandDimsOfTensorAxisName(tensor: MPSGraphTensor, axis: number, name: string | null): MPSGraphTensor;

  expandDimsOfTensorAxesName(tensor: MPSGraphTensor, axes: NSArray<interop.Object> | Array<interop.Object>, name: string | null): MPSGraphTensor;

  expandDimsOfTensorAxesTensorName(tensor: MPSGraphTensor, axesTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  coordinateAlongAxisWithShapeName(axis: number, shape: NSArray<interop.Object> | Array<interop.Object>, name: string | null): MPSGraphTensor;

  coordinateAlongAxisTensorWithShapeName(axisTensor: MPSGraphTensor, shape: NSArray<interop.Object> | Array<interop.Object>, name: string | null): MPSGraphTensor;

  coordinateAlongAxisWithShapeTensorName(axis: number, shapeTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  coordinateAlongAxisTensorWithShapeTensorName(axisTensor: MPSGraphTensor, shapeTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  topKWithSourceTensorKName(source: MPSGraphTensor, k: number, name: string | null): NSArray;

  topKWithSourceTensorKTensorName(source: MPSGraphTensor, kTensor: MPSGraphTensor, name: string | null): NSArray;

  topKWithSourceTensorAxisKName(source: MPSGraphTensor, axis: number, k: number, name: string | null): NSArray;

  bottomKWithSourceTensorAxisKName(source: MPSGraphTensor, axis: number, k: number, name: string | null): NSArray;

  topKWithSourceTensorAxisTensorKTensorName(source: MPSGraphTensor, axisTensor: MPSGraphTensor, kTensor: MPSGraphTensor, name: string | null): NSArray;

  bottomKWithSourceTensorAxisTensorKTensorName(source: MPSGraphTensor, axisTensor: MPSGraphTensor, kTensor: MPSGraphTensor, name: string | null): NSArray;

  topKWithGradientTensorSourceKName(gradient: MPSGraphTensor, source: MPSGraphTensor, k: number, name: string | null): MPSGraphTensor;

  topKWithGradientTensorSourceAxisKName(gradient: MPSGraphTensor, source: MPSGraphTensor, axis: number, k: number, name: string | null): MPSGraphTensor;

  bottomKWithGradientTensorSourceAxisKName(gradient: MPSGraphTensor, source: MPSGraphTensor, axis: number, k: number, name: string | null): MPSGraphTensor;

  topKWithGradientTensorSourceKTensorName(gradient: MPSGraphTensor, source: MPSGraphTensor, kTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  topKWithGradientTensorSourceAxisTensorKTensorName(gradient: MPSGraphTensor, source: MPSGraphTensor, axisTensor: MPSGraphTensor, kTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;

  bottomKWithGradientTensorSourceAxisTensorKTensorName(gradient: MPSGraphTensor, source: MPSGraphTensor, axisTensor: MPSGraphTensor, kTensor: MPSGraphTensor, name: string | null): MPSGraphTensor;
}

declare class MPSGraphExecutionDescriptor extends MPSGraphObject {
  scheduledHandler: (p1: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, p2: NSError) => void;

  completionHandler: (p1: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, p2: NSError) => void;

  waitUntilCompleted: boolean;

  compilationDescriptor: MPSGraphCompilationDescriptor;

  waitForEventValue(event: MTLSharedEvent, value: number): void;

  signalEventAtExecutionEventValue(event: MTLSharedEvent, executionStage: interop.Enum<typeof MPSGraphExecutionStage>, value: number): void;

  setScheduledHandler(scheduledHandler: (p1: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, p2: NSError) => void): void;

  setCompletionHandler(completionHandler: (p1: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, p2: NSError) => void): void;

  setWaitUntilCompleted(waitUntilCompleted: boolean): void;

  setCompilationDescriptor(compilationDescriptor: MPSGraphCompilationDescriptor | null): void;
}

declare class MPSGraphTensorData extends MPSGraphObject {
  readonly shape: NSArray;

  readonly dataType: interop.Enum<typeof MPSDataType>;

  readonly device: MPSGraphDevice;

  initWithDeviceDataShapeDataType(device: MPSGraphDevice, data: NSData, shape: NSArray<interop.Object> | Array<interop.Object>, dataType: interop.Enum<typeof MPSDataType>): this;

  initWithMTLBufferShapeDataType(buffer: MTLBuffer, shape: NSArray<interop.Object> | Array<interop.Object>, dataType: interop.Enum<typeof MPSDataType>): this;

  initWithMTLBufferShapeDataTypeRowBytes(buffer: MTLBuffer, shape: NSArray<interop.Object> | Array<interop.Object>, dataType: interop.Enum<typeof MPSDataType>, rowBytes: number): this;

  initWithMPSMatrix(matrix: MPSMatrix): this;

  initWithMPSMatrixRank(matrix: MPSMatrix, rank: number): this;

  initWithMPSVector(vector: MPSVector): this;

  initWithMPSVectorRank(vector: MPSVector, rank: number): this;

  initWithMPSNDArray(ndarray: MPSNDArray): this;

  initWithMPSImageBatch(imageBatch: NSArray<interop.Object> | Array<interop.Object>): this;

  initWithMTLTensor(tensor: MTLTensor): this;

  mpsndarray(): MPSNDArray;
}

declare class MPSGraphTensor extends MPSGraphObject implements NSCopying {
  readonly shape: NSArray;

  readonly dataType: interop.Enum<typeof MPSDataType>;

  readonly operation: MPSGraphOperation;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class MPSGraphType extends MPSGraphObject implements NSCopying {
  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class MPSGraphObject extends NSObject {
}

declare class MPSGraphCreateSparseOpDescriptor extends MPSGraphObject implements NSCopying {
  sparseStorageType: interop.Enum<typeof MPSGraphSparseStorageType>;

  dataType: interop.Enum<typeof MPSDataType>;

  static descriptorWithStorageTypeDataType<This extends abstract new (...args: any) => any>(this: This, sparseStorageType: interop.Enum<typeof MPSGraphSparseStorageType>, dataType: interop.Enum<typeof MPSDataType>): InstanceType<This>;

  setSparseStorageType(sparseStorageType: interop.Enum<typeof MPSGraphSparseStorageType>): void;

  setDataType(dataType: interop.Enum<typeof MPSDataType>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class MPSGraphImToColOpDescriptor extends MPSGraphObject implements NSCopying {
  kernelWidth: number;

  kernelHeight: number;

  strideInX: number;

  strideInY: number;

  dilationRateInX: number;

  dilationRateInY: number;

  paddingLeft: number;

  paddingRight: number;

  paddingTop: number;

  paddingBottom: number;

  dataLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>;

  static descriptorWithKernelWidthKernelHeightStrideInXStrideInYDilationRateInXDilationRateInYPaddingLeftPaddingRightPaddingTopPaddingBottomDataLayout<This extends abstract new (...args: any) => any>(this: This, kernelWidth: number, kernelHeight: number, strideInX: number, strideInY: number, dilationRateInX: number, dilationRateInY: number, paddingLeft: number, paddingRight: number, paddingTop: number, paddingBottom: number, dataLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>): InstanceType<This>;

  static descriptorWithKernelWidthKernelHeightStrideInXStrideInYDilationRateInXDilationRateInYDataLayout<This extends abstract new (...args: any) => any>(this: This, kernelWidth: number, kernelHeight: number, strideInX: number, strideInY: number, dilationRateInX: number, dilationRateInY: number, dataLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>): InstanceType<This>;

  setExplicitPaddingWithPaddingLeftPaddingRightPaddingTopPaddingBottom(paddingLeft: number, paddingRight: number, paddingTop: number, paddingBottom: number): void;

  setKernelWidth(kernelWidth: number): void;

  setKernelHeight(kernelHeight: number): void;

  setStrideInX(strideInX: number): void;

  setStrideInY(strideInY: number): void;

  setDilationRateInX(dilationRateInX: number): void;

  setDilationRateInY(dilationRateInY: number): void;

  setPaddingLeft(paddingLeft: number): void;

  setPaddingRight(paddingRight: number): void;

  setPaddingTop(paddingTop: number): void;

  setPaddingBottom(paddingBottom: number): void;

  setDataLayout(dataLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class MPSGraphExecutableSerializationDescriptor extends MPSGraphObject {
  append: boolean;

  deploymentPlatform: interop.Enum<typeof MPSGraphDeploymentPlatform>;

  minimumDeploymentTarget: string;

  setAppend(append: boolean): void;

  setDeploymentPlatform(deploymentPlatform: interop.Enum<typeof MPSGraphDeploymentPlatform>): void;

  setMinimumDeploymentTarget(minimumDeploymentTarget: string): void;
}

declare class MPSGraphRandomOpDescriptor extends MPSGraphObject implements NSCopying {
  distribution: interop.Enum<typeof MPSGraphRandomDistribution>;

  dataType: interop.Enum<typeof MPSDataType>;

  min: number;

  max: number;

  minInteger: number;

  maxInteger: number;

  mean: number;

  standardDeviation: number;

  samplingMethod: interop.Enum<typeof MPSGraphRandomNormalSamplingMethod>;

  static descriptorWithDistributionDataType<This extends abstract new (...args: any) => any>(this: This, distribution: interop.Enum<typeof MPSGraphRandomDistribution>, dataType: interop.Enum<typeof MPSDataType>): InstanceType<This>;

  setDistribution(distribution: interop.Enum<typeof MPSGraphRandomDistribution>): void;

  setDataType(dataType: interop.Enum<typeof MPSDataType>): void;

  setMin(min: number): void;

  setMax(max: number): void;

  setMinInteger(minInteger: number): void;

  setMaxInteger(maxInteger: number): void;

  setMean(mean: number): void;

  setStandardDeviation(standardDeviation: number): void;

  setSamplingMethod(samplingMethod: interop.Enum<typeof MPSGraphRandomNormalSamplingMethod>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class MPSGraphFFTDescriptor extends MPSGraphObject implements NSCopying {
  inverse: boolean;

  scalingMode: interop.Enum<typeof MPSGraphFFTScalingMode>;

  roundToOddHermitean: boolean;

  static descriptor<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  setInverse(inverse: boolean): void;

  setScalingMode(scalingMode: interop.Enum<typeof MPSGraphFFTScalingMode>): void;

  setRoundToOddHermitean(roundToOddHermitean: boolean): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class MPSGraphSingleGateRNNDescriptor extends MPSGraphObject implements NSCopying {
  reverse: boolean;

  bidirectional: boolean;

  training: boolean;

  activation: interop.Enum<typeof MPSGraphRNNActivation>;

  static descriptor<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  setReverse(reverse: boolean): void;

  setBidirectional(bidirectional: boolean): void;

  setTraining(training: boolean): void;

  setActivation(activation: interop.Enum<typeof MPSGraphRNNActivation>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class MPSGraphDevice extends MPSGraphObject {
  readonly type: interop.Enum<typeof MPSGraphDeviceType>;

  readonly metalDevice: MTLDevice;

  static deviceWithMTLDevice<This extends abstract new (...args: any) => any>(this: This, metalDevice: MTLDevice): InstanceType<This>;
}

declare class MPSGraphPooling4DOpDescriptor extends MPSGraphObject implements NSCopying {
  get kernelSizes(): NSArray;
  set kernelSizes(value: NSArray<interop.Object> | Array<interop.Object>);

  get strides(): NSArray;
  set strides(value: NSArray<interop.Object> | Array<interop.Object>);

  get dilationRates(): NSArray;
  set dilationRates(value: NSArray<interop.Object> | Array<interop.Object>);

  get paddingValues(): NSArray;
  set paddingValues(value: NSArray<interop.Object> | Array<interop.Object>);

  paddingStyle: interop.Enum<typeof MPSGraphPaddingStyle>;

  ceilMode: boolean;

  includeZeroPadToAverage: boolean;

  returnIndicesMode: interop.Enum<typeof MPSGraphPoolingReturnIndicesMode>;

  returnIndicesDataType: interop.Enum<typeof MPSDataType>;

  static descriptorWithKernelSizesStridesDilationRatesPaddingValuesPaddingStyle<This extends abstract new (...args: any) => any>(this: This, kernelSizes: NSArray<interop.Object> | Array<interop.Object>, strides: NSArray<interop.Object> | Array<interop.Object>, dilationRates: NSArray<interop.Object> | Array<interop.Object>, paddingValues: NSArray<interop.Object> | Array<interop.Object>, paddingStyle: interop.Enum<typeof MPSGraphPaddingStyle>): InstanceType<This>;

  static descriptorWithKernelSizesPaddingStyle<This extends abstract new (...args: any) => any>(this: This, kernelSizes: NSArray<interop.Object> | Array<interop.Object>, paddingStyle: interop.Enum<typeof MPSGraphPaddingStyle>): InstanceType<This>;

  setKernelSizes(kernelSizes: NSArray<interop.Object> | Array<interop.Object>): void;

  setStrides(strides: NSArray<interop.Object> | Array<interop.Object>): void;

  setDilationRates(dilationRates: NSArray<interop.Object> | Array<interop.Object>): void;

  setPaddingValues(paddingValues: NSArray<interop.Object> | Array<interop.Object>): void;

  setPaddingStyle(paddingStyle: interop.Enum<typeof MPSGraphPaddingStyle>): void;

  setCeilMode(ceilMode: boolean): void;

  setIncludeZeroPadToAverage(includeZeroPadToAverage: boolean): void;

  setReturnIndicesMode(returnIndicesMode: interop.Enum<typeof MPSGraphPoolingReturnIndicesMode>): void;

  setReturnIndicesDataType(returnIndicesDataType: interop.Enum<typeof MPSDataType>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class MPSGraphConvolution3DOpDescriptor extends MPSGraphObject implements NSCopying {
  strideInX: number;

  strideInY: number;

  strideInZ: number;

  dilationRateInX: number;

  dilationRateInY: number;

  dilationRateInZ: number;

  paddingLeft: number;

  paddingRight: number;

  paddingTop: number;

  paddingBottom: number;

  paddingFront: number;

  paddingBack: number;

  paddingStyle: interop.Enum<typeof MPSGraphPaddingStyle>;

  dataLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>;

  weightsLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>;

  groups: number;

  static descriptorWithStrideInXStrideInYStrideInZDilationRateInXDilationRateInYDilationRateInZGroupsPaddingLeftPaddingRightPaddingTopPaddingBottomPaddingFrontPaddingBackPaddingStyleDataLayoutWeightsLayout<This extends abstract new (...args: any) => any>(this: This, strideInX: number, strideInY: number, strideInZ: number, dilationRateInX: number, dilationRateInY: number, dilationRateInZ: number, groups: number, paddingLeft: number, paddingRight: number, paddingTop: number, paddingBottom: number, paddingFront: number, paddingBack: number, paddingStyle: interop.Enum<typeof MPSGraphPaddingStyle>, dataLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>, weightsLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>): InstanceType<This>;

  static descriptorWithStrideInXStrideInYStrideInZDilationRateInXDilationRateInYDilationRateInZGroupsPaddingStyleDataLayoutWeightsLayout<This extends abstract new (...args: any) => any>(this: This, strideInX: number, strideInY: number, strideInZ: number, dilationRateInX: number, dilationRateInY: number, dilationRateInZ: number, groups: number, paddingStyle: interop.Enum<typeof MPSGraphPaddingStyle>, dataLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>, weightsLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>): InstanceType<This>;

  setExplicitPaddingWithPaddingLeftPaddingRightPaddingTopPaddingBottomPaddingFrontPaddingBack(paddingLeft: number, paddingRight: number, paddingTop: number, paddingBottom: number, paddingFront: number, paddingBack: number): void;

  setStrideInX(strideInX: number): void;

  setStrideInY(strideInY: number): void;

  setStrideInZ(strideInZ: number): void;

  setDilationRateInX(dilationRateInX: number): void;

  setDilationRateInY(dilationRateInY: number): void;

  setDilationRateInZ(dilationRateInZ: number): void;

  setPaddingLeft(paddingLeft: number): void;

  setPaddingRight(paddingRight: number): void;

  setPaddingTop(paddingTop: number): void;

  setPaddingBottom(paddingBottom: number): void;

  setPaddingFront(paddingFront: number): void;

  setPaddingBack(paddingBack: number): void;

  setPaddingStyle(paddingStyle: interop.Enum<typeof MPSGraphPaddingStyle>): void;

  setDataLayout(dataLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>): void;

  setWeightsLayout(weightsLayout: interop.Enum<typeof MPSGraphTensorNamedDataLayout>): void;

  setGroups(groups: number): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class MPSGraphOperation extends MPSGraphObject implements NSCopying {
  readonly inputTensors: NSArray;

  readonly outputTensors: NSArray;

  readonly controlDependencies: NSArray;

  readonly graph: MPSGraph;

  readonly name: string;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class MPSGraphDepthwiseConvolution3DOpDescriptor extends MPSGraphObject implements NSCopying {
  get strides(): NSArray;
  set strides(value: NSArray<interop.Object> | Array<interop.Object>);

  get dilationRates(): NSArray;
  set dilationRates(value: NSArray<interop.Object> | Array<interop.Object>);

  get paddingValues(): NSArray;
  set paddingValues(value: NSArray<interop.Object> | Array<interop.Object>);

  paddingStyle: interop.Enum<typeof MPSGraphPaddingStyle>;

  channelDimensionIndex: number;

  static descriptorWithStridesDilationRatesPaddingValuesPaddingStyle<This extends abstract new (...args: any) => any>(this: This, strides: NSArray<interop.Object> | Array<interop.Object>, dilationRates: NSArray<interop.Object> | Array<interop.Object>, paddingValues: NSArray<interop.Object> | Array<interop.Object>, paddingStyle: interop.Enum<typeof MPSGraphPaddingStyle>): InstanceType<This>;

  static descriptorWithPaddingStyle<This extends abstract new (...args: any) => any>(this: This, paddingStyle: interop.Enum<typeof MPSGraphPaddingStyle>): InstanceType<This>;

  setStrides(strides: NSArray<interop.Object> | Array<interop.Object>): void;

  setDilationRates(dilationRates: NSArray<interop.Object> | Array<interop.Object>): void;

  setPaddingValues(paddingValues: NSArray<interop.Object> | Array<interop.Object>): void;

  setPaddingStyle(paddingStyle: interop.Enum<typeof MPSGraphPaddingStyle>): void;

  setChannelDimensionIndex(channelDimensionIndex: number): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

// @ts-ignore ClassDecl.tsIgnore
declare class MPSGraphShapedType extends MPSGraphType {
  get shape(): NSArray;
  set shape(value: NSArray<interop.Object> | Array<interop.Object>);

  dataType: interop.Enum<typeof MPSDataType>;

  initWithShapeDataType(shape: NSArray<interop.Object> | Array<interop.Object> | null, dataType: interop.Enum<typeof MPSDataType>): this;

  // @ts-ignore MemberDecl.tsIgnore
  isEqualTo(object: MPSGraphShapedType | null): boolean;

  setShape(shape: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setDataType(dataType: interop.Enum<typeof MPSDataType>): void;
}

declare class MPSGraphCompilationDescriptor extends MPSGraphObject implements NSCopying {
  disableTypeInference(): void;

  optimizationLevel: interop.Enum<typeof MPSGraphOptimization>;

  waitForCompilationCompletion: boolean;

  compilationCompletionHandler: (p1: MPSGraphExecutable, p2: NSError) => void;

  dispatchQueue: NSObject;

  optimizationProfile: interop.Enum<typeof MPSGraphOptimizationProfile>;

  get callables(): NSDictionary;
  set callables(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  reducedPrecisionFastMath: interop.Enum<typeof MPSGraphReducedPrecisionFastMath>;

  setOptimizationLevel(optimizationLevel: interop.Enum<typeof MPSGraphOptimization>): void;

  setWaitForCompilationCompletion(waitForCompilationCompletion: boolean): void;

  setCompilationCompletionHandler(compilationCompletionHandler: (p1: MPSGraphExecutable, p2: NSError) => void): void;

  setDispatchQueue(dispatchQueue: NSObject): void;

  setOptimizationProfile(optimizationProfile: interop.Enum<typeof MPSGraphOptimizationProfile>): void;

  setCallables(callables: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): void;

  setReducedPrecisionFastMath(reducedPrecisionFastMath: interop.Enum<typeof MPSGraphReducedPrecisionFastMath>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}


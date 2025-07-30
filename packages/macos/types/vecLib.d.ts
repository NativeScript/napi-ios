/// <reference types="@nativescript/objc-node-api" />

declare const _SparseNullMatrix_Complex_Double: SparseMatrix_Complex_Double;

declare const _SparseNullMatrix_Float: SparseMatrix_Float;

declare const _SparseDefaultNumericFactorOptions_Float: SparseNumericFactorOptions;

declare const _SparseNullMatrix_Complex_Float: SparseMatrix_Complex_Float;

declare const _SparseNullMatrix_Double: SparseMatrix_Double;

declare const _SparseDefaultNumericFactorOptions_Double: SparseNumericFactorOptions;

declare const _SparseDefaultSymbolicFactorOptions: SparseSymbolicFactorOptions;

declare const _SparseDefaultNumericFactorOptions_Complex_Float: SparseNumericFactorOptions;

declare const _SparseDefaultNumericFactorOptions_Complex_Double: SparseNumericFactorOptions;

declare const BNNSFlags: {
  BNNSFlagsUseClientPtr: 1,
};

declare const BNNSSparsityType: {
  BNNSSparsityTypeUnstructured: 0,
};

declare const SparseStatus_t: {
  StatusOK: 0,
  FactorizationFailed: -1,
  MatrixIsSingular: -2,
  InternalError: -3,
  ParameterError: -4,
  StatusReleased: -2147483647,
};

declare const BNNSDataLayout: {
  LayoutVector: 65536,
  Layout1DLastMajor: 98304,
  Layout1DFirstMajor: 98305,
  LayoutRowMajorMatrix: 131072,
  LayoutColumnMajorMatrix: 131073,
  Layout2DLastMajor: 163840,
  Layout2DFirstMajor: 163841,
  LayoutFullyConnectedSparse: 135169,
  LayoutImageCHW: 196608,
  LayoutSNE: 196609,
  LayoutNSE: 196610,
  LayoutMHA_DHK: 196611,
  Layout3DLastMajor: 229376,
  Layout3DFirstMajor: 229377,
  LayoutConvolutionWeightsOIHW: 262144,
  LayoutConvolutionWeightsOIHrWr: 262145,
  LayoutConvolutionWeightsIOHrWr: 262146,
  LayoutConvolutionWeightsOIHW_Pack32: 262160,
  Layout4DLastMajor: 294912,
  Layout4DFirstMajor: 294913,
  Layout5DLastMajor: 360448,
  Layout5DFirstMajor: 360449,
  Layout6DLastMajor: 425984,
  Layout6DFirstMajor: 425985,
  Layout7DLastMajor: 491520,
  Layout7DFirstMajor: 491521,
  Layout8DLastMajor: 557056,
  Layout8DFirstMajor: 557057,
};

declare const BNNSPaddingMode: {
  Constant: 0,
  Reflect: 1,
  Symmetric: 2,
};

declare const BNNSGraphArgumentType: {
  Pointer: 0,
  Tensor: 2,
};

declare const BNNSGraphArgumentIntent: {
  In: 1,
  Out: 2,
  InOut: 3,
};

declare const BNNSGraphOptimizationPreference: {
  Performance: 0,
  IRSize: 1,
};

declare const BNNSGraphMessageLevel: {
  Info: 1,
  Unsupported: 2,
  Warning: 4,
  Error: 8,
};

declare const BNNSRandomGeneratorMethod: {
  BNNSRandomGeneratorMethodAES_CTR: 0,
};

declare const BNNSEmbeddingFlags: {
  BNNSEmbeddingFlagScaleGradientByFrequency: 1,
};

declare const BNNSRelationalOperator: {
  Equal: 0,
  Less: 1,
  LessEqual: 2,
  Greater: 3,
  GreaterEqual: 4,
  NotEqual: 5,
  LogicalAND: 6,
  LogicalOR: 7,
  LogicalNOT: 8,
  LogicalNAND: 9,
  LogicalNOR: 10,
  LogicalXOR: 11,
};

declare const BNNSBoxCoordinateMode: {
  CornersHeight: 0,
  CornersWidth: 1,
  CenterSizeHeight: 2,
  CenterSizeWidth: 3,
};

declare const BNNSLinearSamplingMode: {
  Default: 0,
  AlignCorners: 1,
  UnalignCorners: 2,
  StrictAlignCorners: 3,
  OffsetCorners: 4,
};

declare const BNNSReduceFunction: {
  Max: 0,
  Min: 1,
  ArgMax: 2,
  ArgMin: 3,
  Mean: 4,
  MeanNonZero: 5,
  Sum: 6,
  SumSquare: 7,
  SumLog: 8,
  L1Norm: 9,
  LogicalOr: 10,
  LogicalAnd: 11,
  L2Norm: 12,
  LogSumExp: 13,
  Product: 14,
  None: 15,
  LogSum: 16,
  Any: 10,
  All: 11,
};

declare const BNNSOptimizerRegularizationFunction: {
  None: 0,
  L1: 1,
  L2: 2,
};

declare const BNNSOptimizerFunction: {
  SGDMomentum: 1,
  Adam: 2,
  RMSProp: 3,
  AdamW: 4,
  AdamAMSGrad: 5,
  AdamWAMSGrad: 6,
  SGDMomentumWithClipping: 7,
  AdamWithClipping: 8,
  RMSPropWithClipping: 9,
  AdamWWithClipping: 10,
  AdamAMSGradWithClipping: 11,
  AdamWAMSGradWithClipping: 12,
};

declare const BNNSArithmeticFunction: {
  Add: 0,
  Subtract: 1,
  Multiply: 2,
  Divide: 3,
  SquareRoot: 4,
  ReciprocalSquareRoot: 5,
  Ceil: 6,
  Floor: 7,
  Round: 8,
  Sin: 9,
  Cos: 10,
  Tan: 11,
  Asin: 12,
  Acos: 13,
  Atan: 14,
  Sinh: 15,
  Cosh: 16,
  Tanh: 17,
  Asinh: 18,
  Acosh: 19,
  Atanh: 20,
  Pow: 21,
  Exp: 22,
  Exp2: 23,
  Log: 24,
  Log2: 25,
  MultiplyNoNaN: 26,
  DivideNoNaN: 27,
  MultiplyAdd: 28,
  Minimum: 29,
  Maximum: 30,
  Select: 31,
  Abs: 32,
  Sign: 33,
  Negate: 34,
  Reciprocal: 35,
  Square: 36,
  FloorDivide: 37,
  TruncDivide: 38,
  TruncRemainder: 39,
  Erf: 40,
};

declare const BNNSLossReductionFunction: {
  None: 0,
  Sum: 1,
  WeightedMean: 2,
  Mean: 3,
  NonZeroWeightMean: 4,
};

declare const BNNSPoolingFunction: {
  Max: 0,
  AverageCountIncludePadding: 1,
  AverageCountExcludePadding: 2,
  UnMax: 3,
  L2Norm: 4,
  Average: 1,
};

declare const BNNSDataType: {
  FloatBit: 65536,
  Float16: 65552,
  Float32: 65568,
  BFloat16: 98320,
  IntBit: 131072,
  Int1: 131073,
  Int2: 131074,
  Int4: 131076,
  Int8: 131080,
  Int16: 131088,
  Int32: 131104,
  Int64: 131136,
  UIntBit: 262144,
  UInt1: 262145,
  UInt2: 262146,
  UInt3: 262147,
  UInt4: 262148,
  UInt6: 262150,
  UInt8: 262152,
  UInt16: 262160,
  UInt32: 262176,
  UInt64: 262208,
  IndexedBit: 524288,
  Indexed1: 524289,
  Indexed2: 524290,
  Indexed4: 524292,
  Indexed8: 524296,
  MiscellaneousBit: 1048576,
  Boolean: 1048584,
};

declare const quadrature_status: {
  SUCCESS: 0,
  ERROR: -1,
  INVALID_ARG_ERROR: -2,
  ALLOC_ERROR: -3,
  INTERNAL_ERROR: -99,
  INTEGRATE_MAX_EVAL_ERROR: -101,
  INTEGRATE_BAD_BEHAVIOUR_ERROR: -102,
};

declare const _SparseIterativeMethod_t: {
  CG: 0,
  GMRES: 1,
  LSMR: 2,
};

declare const BNNSTargetSystem: {
  BNNSTargetSystemGeneric: 0,
};

declare const SparseGMRESVariant_t: {
  DQ: 0,
  SparseVariantGMRES: 1,
  F: 2,
};

declare const SparseIterativeStatus_t: {
  Converged: 0,
  MaxIterations: 1,
  ParameterError: -1,
  IllConditioned: -2,
  InternalError: -99,
};

declare const SparsePreconditioner_t: {
  None: 0,
  User: 1,
  Diagonal: 2,
  DiagScaling: 3,
};

declare const SparseSubfactor_t: {
  Invalid: 0,
  P: 1,
  S: 2,
  L: 3,
  D: 4,
  PLPS: 5,
  Q: 6,
  R: 7,
  RP: 8,
  Sr: 9,
  Sc: 10,
};

declare const SparseScaling_t: {
  Default: 0,
  User: 1,
  EquilibriationInf: 2,
  HungarianScalingOnly: 3,
  HungarianScalingAndOrdering: 4,
};

declare const SparseOrder_t: {
  Default: 0,
  User: 1,
  AMD: 2,
  Metis: 3,
  COLAMD: 4,
  MTMetis: 5,
};

declare const SparseControl_t: {
  SparseDefaultControl: 0,
};

declare const BNNSNDArrayFlags: {
  Set: 0,
  Accumulate: 1,
};

declare const SparseTriangle_t: {
  Upper: 0,
  Lower: 1,
};

declare const SparseKind_t: {
  Ordinary: 0,
  Triangular: 1,
  UnitTriangular: 2,
  Symmetric: 3,
  Hermitian: 7,
};

declare const SparseUpdate_t: {
  SparseUpdatePartialRefactor: 0,
};

declare const BNNSDescriptorType: {
  Constant: 0,
  Sample: 1,
  Parameter: 2,
};

declare const BNNSQuantizerFunction: {
  Quantize: 0,
  Dequantize: 1,
};

declare const BNNSLossFunction: {
  SoftmaxCrossEntropy: 1,
  SigmoidCrossEntropy: 2,
  MeanSquareError: 3,
  Huber: 4,
  Yolo: 5,
  Log: 6,
  CosineDistance: 7,
  Hinge: 8,
  MeanAbsoluteError: 9,
  CategoricalCrossEntropy: 10,
};

declare const BNNSShuffleType: {
  PixelShuffle: 0,
  PixelUnshuffle: 1,
  DepthToSpace: 2,
  SpaceToDepth: 3,
};

declare const BNNSActivationFunction: {
  Identity: 0,
  RectifiedLinear: 1,
  LeakyRectifiedLinear: 2,
  Sigmoid: 3,
  Tanh: 4,
  ScaledTanh: 5,
  Abs: 6,
  Linear: 7,
  Clamp: 8,
  IntegerLinearSaturate: 9,
  IntegerLinearSaturatePerChannel: 10,
  Softmax: 11,
  GELUApproximation: 12,
  Gumbel: 13,
  GumbelMax: 14,
  HardSigmoid: 15,
  Softplus: 16,
  Softsign: 17,
  ELU: 18,
  ClampedLeakyRectifiedLinear: 19,
  LinearWithBias: 20,
  LogSoftmax: 21,
  LogSigmoid: 22,
  SELU: 23,
  CELU: 24,
  HardShrink: 25,
  SoftShrink: 26,
  TanhShrink: 27,
  Threshold: 28,
  PReLUPerChannel: 29,
  GELUApproximation2: 30,
  HardSwish: 30,
  SiLU: 31,
  ReLU6: 32,
  Erf: 33,
  GELU: 34,
  GELUApproximationSigmoid: 35,
};

declare const quadrature_integrator: {
  NG: 0,
  AG: 1,
  AGS: 2,
};

declare const BNNSOptimizerClippingFunction: {
  None: 0,
  ByValue: 1,
  ByNorm: 2,
  ByGlobalNorm: 3,
};

declare const BNNSLayerFlags: {
  Bidirectional: 1,
  DefaultActivations: 2,
};

declare const BNNSPointerSpecifier: {
  Alpha: 0,
  Beta: 1,
};

declare const BNNSFilterType: {
  Convolution: 0,
  FullyConnected: 1,
  BatchNorm: 2,
  InstanceNorm: 3,
  LayerNorm: 4,
  GroupNorm: 5,
  TransposedConvolution: 6,
  Quantization: 7,
  Arithmetic: 8,
};

declare const BNNSInterpolationMethod: {
  Nearest: 0,
  Linear: 1,
};

declare const BNNSOptimizerSGDMomentumVariant: {
  Variant0: 0,
  Variant1: 1,
  Variant2: 2,
};

declare const BNNSNormType: {
  BNNSL2Norm: 1,
};

declare const SparseLSMRConvergenceTest_t: {
  Default: 0,
  FongSaunders: 1,
};

declare const SparseFactorization_t: {
  Cholesky: 0,
  LDLT: 1,
  LDLTUnpivoted: 2,
  LDLTSBK: 3,
  LDLTTPP: 4,
  QR: 40,
  CholeskyAtA: 41,
  LU: 80,
  LUUnpivoted: 81,
  LUSPP: 82,
  LUTPP: 83,
};

declare class bnns_graph_compile_options_t {
  constructor(init?: bnns_graph_compile_options_t);
  data: interop.Pointer;
  size: number;
}

declare class bnns_graph_context_t {
  constructor(init?: bnns_graph_context_t);
  data: interop.Pointer;
  size: number;
}

declare class bnns_graph_t {
  constructor(init?: bnns_graph_t);
  data: interop.Pointer;
  size: number;
}

declare class BNNSFilterParameters {
  constructor(init?: BNNSFilterParameters);
  flags: number;
  n_threads: number;
  alloc_memory: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  free_memory: (p1: interop.PointerConvertible) => void | null;
}

declare class BNNSFullyConnectedLayerParameters {
  constructor(init?: BNNSFullyConnectedLayerParameters);
  in_size: number;
  out_size: number;
  weights: BNNSLayerData;
  bias: BNNSLayerData;
  activation: BNNSActivation;
}

declare class BNNSConvolutionLayerParameters {
  constructor(init?: BNNSConvolutionLayerParameters);
  x_stride: number;
  y_stride: number;
  x_padding: number;
  y_padding: number;
  k_width: number;
  k_height: number;
  in_channels: number;
  out_channels: number;
  weights: BNNSLayerData;
  bias: BNNSLayerData;
  activation: BNNSActivation;
}

declare class BNNSVectorDescriptor {
  constructor(init?: BNNSVectorDescriptor);
  size: number;
  data_type: interop.Enum<typeof BNNSDataType>;
  data_scale: number;
  data_bias: number;
}

declare class BNNSSparsityParameters {
  constructor(init?: BNNSSparsityParameters);
  flags: number;
  sparsity_ratio: unknown /* const array */;
  sparsity_type: interop.Enum<typeof BNNSSparsityType>;
  target_system: interop.Enum<typeof BNNSTargetSystem>;
}

declare class BNNSLayerParametersQuantization {
  constructor(init?: BNNSLayerParametersQuantization);
  axis_mask: number;
  function: interop.Enum<typeof BNNSQuantizerFunction>;
  i_desc: BNNSNDArrayDescriptor;
  o_desc: BNNSNDArrayDescriptor;
  scale: BNNSNDArrayDescriptor;
  bias: BNNSNDArrayDescriptor;
}

declare class BNNSLayerParametersEmbedding {
  constructor(init?: BNNSLayerParametersEmbedding);
  flags: interop.Enum<typeof BNNSEmbeddingFlags>;
  i_desc: BNNSNDArrayDescriptor;
  o_desc: BNNSNDArrayDescriptor;
  dictionary: BNNSNDArrayDescriptor;
  padding_idx: number;
  max_norm: number;
  norm_type: number;
}

declare class BNNSLayerParametersBroadcastMatMul {
  constructor(init?: BNNSLayerParametersBroadcastMatMul);
  alpha: number;
  beta: number;
  transA: boolean;
  transB: boolean;
  quadratic: boolean;
  a_is_weights: boolean;
  b_is_weights: boolean;
  iA_desc: BNNSNDArrayDescriptor;
  iB_desc: BNNSNDArrayDescriptor;
  o_desc: BNNSNDArrayDescriptor;
}

declare class BNNSLayerParametersLSTM {
  constructor(init?: BNNSLayerParametersLSTM);
  input_size: number;
  hidden_size: number;
  batch_size: number;
  num_layers: number;
  seq_len: number;
  dropout: number;
  lstm_flags: number;
  sequence_descriptor: BNNSNDArrayDescriptor;
  input_descriptor: BNNSLSTMDataDescriptor;
  output_descriptor: BNNSLSTMDataDescriptor;
  input_gate: BNNSLSTMGateDescriptor;
  forget_gate: BNNSLSTMGateDescriptor;
  candidate_gate: BNNSLSTMGateDescriptor;
  output_gate: BNNSLSTMGateDescriptor;
  hidden_activation: BNNSActivation;
}

declare class BNNSOptimizerAdamWithClippingFields {
  constructor(init?: BNNSOptimizerAdamWithClippingFields);
  learning_rate: number;
  beta1: number;
  beta2: number;
  time_step: number;
  epsilon: number;
  gradient_scale: number;
  regularization_scale: number;
  regularization_func: interop.Enum<typeof BNNSOptimizerRegularizationFunction>;
  clipping_func: interop.Enum<typeof BNNSOptimizerClippingFunction>;
  clip_gradients_min: number;
  clip_gradients_max: number;
  clip_gradients_max_norm: number;
  clip_gradients_use_norm: number;
}

declare class BNNSOptimizerSGDMomentumWithClippingFields {
  constructor(init?: BNNSOptimizerSGDMomentumWithClippingFields);
  learning_rate: number;
  momentum: number;
  gradient_scale: number;
  regularization_scale: number;
  nesterov: boolean;
  regularization_func: interop.Enum<typeof BNNSOptimizerRegularizationFunction>;
  sgd_momentum_variant: interop.Enum<typeof BNNSOptimizerSGDMomentumVariant>;
  clipping_func: interop.Enum<typeof BNNSOptimizerClippingFunction>;
  clip_gradients_min: number;
  clip_gradients_max: number;
  clip_gradients_max_norm: number;
  clip_gradients_use_norm: number;
}

declare class BNNSOptimizerSGDMomentumFields {
  constructor(init?: BNNSOptimizerSGDMomentumFields);
  learning_rate: number;
  momentum: number;
  gradient_scale: number;
  regularization_scale: number;
  clip_gradients: boolean;
  clip_gradients_min: number;
  clip_gradients_max: number;
  nesterov: boolean;
  regularization_func: interop.Enum<typeof BNNSOptimizerRegularizationFunction>;
  sgd_momentum_variant: interop.Enum<typeof BNNSOptimizerSGDMomentumVariant>;
}

declare class BNNSLayerParametersLossYolo {
  constructor(init?: BNNSLayerParametersLossYolo);
  function: interop.Enum<typeof BNNSLossFunction>;
  i_desc: BNNSNDArrayDescriptor;
  o_desc: BNNSNDArrayDescriptor;
  reduction: interop.Enum<typeof BNNSLossReductionFunction>;
  huber_delta: number;
  number_of_grid_columns: number;
  number_of_grid_rows: number;
  number_of_anchor_boxes: number;
  anchor_box_size: number;
  rescore: boolean;
  scale_xy: number;
  scale_wh: number;
  scale_object: number;
  scale_no_object: number;
  scale_classification: number;
  object_minimum_iou: number;
  no_object_maximum_iou: number;
  anchors_data: interop.Pointer;
}

declare class BNNSLayerParametersLossHuber {
  constructor(init?: BNNSLayerParametersLossHuber);
  function: interop.Enum<typeof BNNSLossFunction>;
  i_desc: BNNSNDArrayDescriptor;
  o_desc: BNNSNDArrayDescriptor;
  reduction: interop.Enum<typeof BNNSLossReductionFunction>;
  huber_delta: number;
}

declare class BNNSLayerParametersLossSigmoidCrossEntropy {
  constructor(init?: BNNSLayerParametersLossSigmoidCrossEntropy);
  function: interop.Enum<typeof BNNSLossFunction>;
  i_desc: BNNSNDArrayDescriptor;
  o_desc: BNNSNDArrayDescriptor;
  reduction: interop.Enum<typeof BNNSLossReductionFunction>;
  label_smooth: number;
}

declare class BNNSLayerParametersLossSoftmaxCrossEntropy {
  constructor(init?: BNNSLayerParametersLossSoftmaxCrossEntropy);
  function: interop.Enum<typeof BNNSLossFunction>;
  i_desc: BNNSNDArrayDescriptor;
  o_desc: BNNSNDArrayDescriptor;
  reduction: interop.Enum<typeof BNNSLossReductionFunction>;
  label_smooth: number;
}

declare class BNNSLayerParametersActivation {
  constructor(init?: BNNSLayerParametersActivation);
  i_desc: BNNSNDArrayDescriptor;
  o_desc: BNNSNDArrayDescriptor;
  activation: BNNSActivation;
  axis_flags: number;
}

declare class BNNSLayerParametersPooling {
  constructor(init?: BNNSLayerParametersPooling);
  i_desc: BNNSNDArrayDescriptor;
  o_desc: BNNSNDArrayDescriptor;
  bias: BNNSNDArrayDescriptor;
  activation: BNNSActivation;
  pooling_function: interop.Enum<typeof BNNSPoolingFunction>;
  k_width: number;
  k_height: number;
  x_stride: number;
  y_stride: number;
  x_dilation_stride: number;
  y_dilation_stride: number;
  x_padding: number;
  y_padding: number;
  pad: unknown /* const array */;
}

declare class BNNSLayerParametersFullyConnected {
  constructor(init?: BNNSLayerParametersFullyConnected);
  i_desc: BNNSNDArrayDescriptor;
  w_desc: BNNSNDArrayDescriptor;
  o_desc: BNNSNDArrayDescriptor;
  bias: BNNSNDArrayDescriptor;
  activation: BNNSActivation;
}

declare class BNNSLayerParametersConvolution {
  constructor(init?: BNNSLayerParametersConvolution);
  i_desc: BNNSNDArrayDescriptor;
  w_desc: BNNSNDArrayDescriptor;
  o_desc: BNNSNDArrayDescriptor;
  bias: BNNSNDArrayDescriptor;
  activation: BNNSActivation;
  x_stride: number;
  y_stride: number;
  x_dilation_stride: number;
  y_dilation_stride: number;
  x_padding: number;
  y_padding: number;
  groups: number;
  pad: unknown /* const array */;
}

declare class BNNSArithmeticBinary {
  constructor(init?: BNNSArithmeticBinary);
  in1: BNNSNDArrayDescriptor;
  in1_type: interop.Enum<typeof BNNSDescriptorType>;
  in2: BNNSNDArrayDescriptor;
  in2_type: interop.Enum<typeof BNNSDescriptorType>;
  out: BNNSNDArrayDescriptor;
  out_type: interop.Enum<typeof BNNSDescriptorType>;
}

declare class BNNSTensor {
  constructor(init?: BNNSTensor);
  data_type: interop.Enum<typeof BNNSDataType>;
  rank: number;
  shape: unknown /* const array */;
  stride: unknown /* const array */;
  data: interop.Pointer;
  data_size_in_bytes: number;
  name: string | null;
}

declare class BNNSActivation {
  constructor(init?: BNNSActivation);
  function: interop.Enum<typeof BNNSActivationFunction>;
  alpha: number;
  beta: number;
  iscale: number;
  ioffset: number;
  ishift: number;
  iscale_per_channel: interop.Pointer;
  ioffset_per_channel: interop.Pointer;
  ishift_per_channel: interop.Pointer;
}

declare class quadrature_integrate_options {
  constructor(init?: quadrature_integrate_options);
  integrator: interop.Enum<typeof quadrature_integrator>;
  abs_tolerance: number;
  rel_tolerance: number;
  qag_points_per_interval: number;
  max_intervals: number;
}

declare class SparseIterativeMethod {
  constructor(init?: SparseIterativeMethod);
  method: number;
  options: unnamed_16540550601182990950;
}

declare class SparseLSMROptions {
  constructor(init?: SparseLSMROptions);
  reportError: (p1: string) => void | null;
  lambda: number;
  nvec: number;
  convergenceTest: interop.Enum<typeof SparseLSMRConvergenceTest_t>;
  atol: number;
  rtol: number;
  btol: number;
  conditionLimit: number;
  maxIterations: number;
  reportStatus: (p1: string) => void | null;
}

declare class SparseGMRESOptions {
  constructor(init?: SparseGMRESOptions);
  reportError: (p1: string) => void | null;
  variant: interop.Enum<typeof SparseGMRESVariant_t>;
  nvec: number;
  maxIterations: number;
  atol: number;
  rtol: number;
  reportStatus: (p1: string) => void | null;
}

declare class SparseOpaquePreconditioner_Complex_Double {
  constructor(init?: SparseOpaquePreconditioner_Complex_Double);
  type: interop.Enum<typeof SparsePreconditioner_t>;
  mem: interop.Pointer;
  apply: (p1: interop.PointerConvertible, p2: interop.Enum<typeof CBLAS_TRANSPOSE>, p3: DenseMatrix_Complex_Double, p4: DenseMatrix_Complex_Double) => void | null;
}

declare class SparseOpaquePreconditioner_Float {
  constructor(init?: SparseOpaquePreconditioner_Float);
  type: interop.Enum<typeof SparsePreconditioner_t>;
  mem: interop.Pointer;
  apply: (p1: interop.PointerConvertible, p2: interop.Enum<typeof CBLAS_TRANSPOSE>, p3: DenseMatrix_Float, p4: DenseMatrix_Float) => void | null;
}

declare class SparseOpaqueSubfactor_Complex_Float {
  constructor(init?: SparseOpaqueSubfactor_Complex_Float);
  attributes: SparseAttributesComplex_t;
  contents: interop.Enum<typeof SparseSubfactor_t>;
  factor: SparseOpaqueFactorization_Complex_Float;
  workspaceRequiredStatic: number;
  workspaceRequiredPerRHS: number;
}

declare class SparseOpaqueSubfactor_Complex_Double {
  constructor(init?: SparseOpaqueSubfactor_Complex_Double);
  attributes: SparseAttributesComplex_t;
  contents: interop.Enum<typeof SparseSubfactor_t>;
  factor: SparseOpaqueFactorization_Complex_Double;
  workspaceRequiredStatic: number;
  workspaceRequiredPerRHS: number;
}

declare class SparseOpaqueFactorization_Complex_Float {
  constructor(init?: SparseOpaqueFactorization_Complex_Float);
  status: interop.Enum<typeof SparseStatus_t>;
  attributes: SparseAttributesComplex_t;
  symbolicFactorization: SparseOpaqueSymbolicFactorization;
  userFactorStorage: boolean;
  numericFactorization: interop.Pointer;
  solveWorkspaceRequiredStatic: number;
  solveWorkspaceRequiredPerRHS: number;
}

declare class SparseOpaqueFactorization_Complex_Double {
  constructor(init?: SparseOpaqueFactorization_Complex_Double);
  status: interop.Enum<typeof SparseStatus_t>;
  attributes: SparseAttributesComplex_t;
  symbolicFactorization: SparseOpaqueSymbolicFactorization;
  userFactorStorage: boolean;
  numericFactorization: interop.Pointer;
  solveWorkspaceRequiredStatic: number;
  solveWorkspaceRequiredPerRHS: number;
}

declare class SparseOpaqueFactorization_Double {
  constructor(init?: SparseOpaqueFactorization_Double);
  status: interop.Enum<typeof SparseStatus_t>;
  attributes: SparseAttributes_t;
  symbolicFactorization: SparseOpaqueSymbolicFactorization;
  userFactorStorage: boolean;
  numericFactorization: interop.Pointer;
  solveWorkspaceRequiredStatic: number;
  solveWorkspaceRequiredPerRHS: number;
}

declare class SparseOpaqueSymbolicFactorization {
  constructor(init?: SparseOpaqueSymbolicFactorization);
  status: interop.Enum<typeof SparseStatus_t>;
  rowCount: number;
  columnCount: number;
  attributes: SparseAttributes_t;
  blockSize: number;
  type: interop.Enum<typeof SparseFactorization_t>;
  factorization: interop.Pointer;
  workspaceSize_Float: number;
  workspaceSize_Double: number;
  factorSize_Float: number;
  factorSize_Double: number;
}

declare class SparseSymbolicFactorOptions {
  constructor(init?: SparseSymbolicFactorOptions);
  control: interop.Enum<typeof SparseControl_t>;
  orderMethod: interop.Enum<typeof SparseOrder_t>;
  order: interop.Pointer;
  ignoreRowsAndColumns: interop.Pointer;
  malloc: (p1: number) => interop.Pointer | null;
  free: (p1: interop.PointerConvertible) => void | null;
  reportError: (p1: string) => void | null;
}

declare class DenseMatrix_Complex_Float {
  constructor(init?: DenseMatrix_Complex_Float);
  rowCount: number;
  columnCount: number;
  columnStride: number;
  attributes: SparseAttributesComplex_t;
  data: interop.Pointer;
}

declare class DenseMatrix_Float {
  constructor(init?: DenseMatrix_Float);
  rowCount: number;
  columnCount: number;
  columnStride: number;
  attributes: SparseAttributes_t;
  data: interop.Pointer;
}

declare class DenseVector_Complex_Float {
  constructor(init?: DenseVector_Complex_Float);
  count: number;
  data: interop.Pointer;
}

declare class DenseVector_Complex_Double {
  constructor(init?: DenseVector_Complex_Double);
  count: number;
  data: interop.Pointer;
}

declare class DenseVector_Double {
  constructor(init?: DenseVector_Double);
  count: number;
  data: interop.Pointer;
}

declare class SparseMatrix_Float {
  constructor(init?: SparseMatrix_Float);
  structure: SparseMatrixStructure;
  data: interop.Pointer;
}

declare class SparseMatrixStructureComplex {
  constructor(init?: SparseMatrixStructureComplex);
  rowCount: number;
  columnCount: number;
  columnStarts: interop.Pointer;
  rowIndices: interop.Pointer;
  attributes: SparseAttributesComplex_t;
  blockSize: number;
}

declare class SparseAttributesComplex_t {
  constructor(init?: SparseAttributesComplex_t);
  transpose: boolean;
  triangle: interop.Enum<typeof SparseTriangle_t>;
  kind: interop.Enum<typeof SparseKind_t>;
  conjugate_transpose: boolean;
  _reserved: number;
  _allocatedBySparse: boolean;
}

declare class SparseAttributes_t {
  constructor(init?: SparseAttributes_t);
  transpose: boolean;
  triangle: interop.Enum<typeof SparseTriangle_t>;
  kind: interop.Enum<typeof SparseKind_t>;
  _reserved: number;
  _allocatedBySparse: boolean;
}

declare class bnns_graph_shape_t {
  constructor(init?: bnns_graph_shape_t);
  rank: number;
  shape: interop.Pointer;
}

declare class quadrature_integrate_function {
  constructor(init?: quadrature_integrate_function);
  fun: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void | null;
  fun_arg: interop.Pointer;
}

declare class SparseOpaqueFactorization_Float {
  constructor(init?: SparseOpaqueFactorization_Float);
  status: interop.Enum<typeof SparseStatus_t>;
  attributes: SparseAttributes_t;
  symbolicFactorization: SparseOpaqueSymbolicFactorization;
  userFactorStorage: boolean;
  numericFactorization: interop.Pointer;
  solveWorkspaceRequiredStatic: number;
  solveWorkspaceRequiredPerRHS: number;
}

declare class DenseVector_Float {
  constructor(init?: DenseVector_Float);
  count: number;
  data: interop.Pointer;
}

declare class bnns_graph_argument_t {
  constructor(init?: bnns_graph_argument_t);
  data_ptr_size: number;
}

declare class SparseOpaquePreconditioner_Complex_Float {
  constructor(init?: SparseOpaquePreconditioner_Complex_Float);
  type: interop.Enum<typeof SparsePreconditioner_t>;
  mem: interop.Pointer;
  apply: (p1: interop.PointerConvertible, p2: interop.Enum<typeof CBLAS_TRANSPOSE>, p3: DenseMatrix_Complex_Float, p4: DenseMatrix_Complex_Float) => void | null;
}

declare class BNNSArithmeticUnary {
  constructor(init?: BNNSArithmeticUnary);
  in: BNNSNDArrayDescriptor;
  in_type: interop.Enum<typeof BNNSDescriptorType>;
  out: BNNSNDArrayDescriptor;
  out_type: interop.Enum<typeof BNNSDescriptorType>;
}

declare class BNNSLayerData {
  constructor(init?: BNNSLayerData);
  data: interop.Pointer;
  data_type: interop.Enum<typeof BNNSDataType>;
  data_scale: number;
  data_bias: number;
  data_table: interop.Pointer;
}

declare class SparseMatrixStructure {
  constructor(init?: SparseMatrixStructure);
  rowCount: number;
  columnCount: number;
  columnStarts: interop.Pointer;
  rowIndices: interop.Pointer;
  attributes: SparseAttributes_t;
  blockSize: number;
}

declare class BNNSLayerParametersArithmetic {
  constructor(init?: BNNSLayerParametersArithmetic);
  arithmetic_function: interop.Enum<typeof BNNSArithmeticFunction>;
  arithmetic_function_fields: interop.Pointer;
  activation: BNNSActivation;
}

declare class BNNSOptimizerAdamFields {
  constructor(init?: BNNSOptimizerAdamFields);
  learning_rate: number;
  beta1: number;
  beta2: number;
  time_step: number;
  epsilon: number;
  gradient_scale: number;
  regularization_scale: number;
  clip_gradients: boolean;
  clip_gradients_min: number;
  clip_gradients_max: number;
  regularization_func: interop.Enum<typeof BNNSOptimizerRegularizationFunction>;
}

declare class BNNSLayerParametersMultiheadAttention {
  constructor(init?: BNNSLayerParametersMultiheadAttention);
  query: BNNSMHAProjectionParameters;
  key: BNNSMHAProjectionParameters;
  value: BNNSMHAProjectionParameters;
  add_zero_attn: boolean;
  key_attn_bias: BNNSNDArrayDescriptor;
  value_attn_bias: BNNSNDArrayDescriptor;
  output: BNNSMHAProjectionParameters;
  dropout: number;
  seed: number;
}

declare class BNNSImageStackDescriptor {
  constructor(init?: BNNSImageStackDescriptor);
  width: number;
  height: number;
  channels: number;
  row_stride: number;
  image_stride: number;
  data_type: interop.Enum<typeof BNNSDataType>;
  data_scale: number;
  data_bias: number;
}

declare class SparseOpaquePreconditioner_Double {
  constructor(init?: SparseOpaquePreconditioner_Double);
  type: interop.Enum<typeof SparsePreconditioner_t>;
  mem: interop.Pointer;
  apply: (p1: interop.PointerConvertible, p2: interop.Enum<typeof CBLAS_TRANSPOSE>, p3: DenseMatrix_Double, p4: DenseMatrix_Double) => void | null;
}

declare class DenseMatrix_Complex_Double {
  constructor(init?: DenseMatrix_Complex_Double);
  rowCount: number;
  columnCount: number;
  columnStride: number;
  attributes: SparseAttributesComplex_t;
  data: interop.Pointer;
}

declare class BNNSLayerParametersLossBase {
  constructor(init?: BNNSLayerParametersLossBase);
  function: interop.Enum<typeof BNNSLossFunction>;
  i_desc: BNNSNDArrayDescriptor;
  o_desc: BNNSNDArrayDescriptor;
  reduction: interop.Enum<typeof BNNSLossReductionFunction>;
}

declare class DenseMatrix_Double {
  constructor(init?: DenseMatrix_Double);
  rowCount: number;
  columnCount: number;
  columnStride: number;
  attributes: SparseAttributes_t;
  data: interop.Pointer;
}

declare class BNNSLayerParametersTensorContraction {
  constructor(init?: BNNSLayerParametersTensorContraction);
  operation: string | null;
  alpha: number;
  beta: number;
  iA_desc: BNNSNDArrayDescriptor;
  iB_desc: BNNSNDArrayDescriptor;
  o_desc: BNNSNDArrayDescriptor;
}

declare class BNNSLayerParametersResize {
  constructor(init?: BNNSLayerParametersResize);
  method: interop.Enum<typeof BNNSInterpolationMethod>;
  i_desc: BNNSNDArrayDescriptor;
  o_desc: BNNSNDArrayDescriptor;
  align_corners: boolean;
}

declare class BNNSNDArrayDescriptor {
  constructor(init?: BNNSNDArrayDescriptor);
  flags: interop.Enum<typeof BNNSNDArrayFlags>;
  layout: interop.Enum<typeof BNNSDataLayout>;
  size: unknown /* const array */;
  stride: unknown /* const array */;
  data: interop.Pointer;
  data_type: interop.Enum<typeof BNNSDataType>;
  table_data: interop.Pointer;
  table_data_type: interop.Enum<typeof BNNSDataType>;
  data_scale: number;
  data_bias: number;
}

declare class BNNSArithmeticTernary {
  constructor(init?: BNNSArithmeticTernary);
  in1: BNNSNDArrayDescriptor;
  in1_type: interop.Enum<typeof BNNSDescriptorType>;
  in2: BNNSNDArrayDescriptor;
  in2_type: interop.Enum<typeof BNNSDescriptorType>;
  in3: BNNSNDArrayDescriptor;
  in3_type: interop.Enum<typeof BNNSDescriptorType>;
  out: BNNSNDArrayDescriptor;
  out_type: interop.Enum<typeof BNNSDescriptorType>;
}

declare class BNNSPoolingLayerParameters {
  constructor(init?: BNNSPoolingLayerParameters);
  x_stride: number;
  y_stride: number;
  x_padding: number;
  y_padding: number;
  k_width: number;
  k_height: number;
  in_channels: number;
  out_channels: number;
  pooling_function: interop.Enum<typeof BNNSPoolingFunction>;
  bias: BNNSLayerData;
  activation: BNNSActivation;
}

declare class SparseMatrix_Complex_Double {
  constructor(init?: SparseMatrix_Complex_Double);
  structure: SparseMatrixStructureComplex;
  data: interop.Pointer;
}

declare class SparseMatrix_Double {
  constructor(init?: SparseMatrix_Double);
  structure: SparseMatrixStructure;
  data: interop.Pointer;
}

declare class BNNSOptimizerRMSPropFields {
  constructor(init?: BNNSOptimizerRMSPropFields);
  learning_rate: number;
  alpha: number;
  epsilon: number;
  centered: boolean;
  momentum: number;
  gradient_scale: number;
  regularization_scale: number;
  clip_gradients: boolean;
  clip_gradients_min: number;
  clip_gradients_max: number;
  regularization_func: interop.Enum<typeof BNNSOptimizerRegularizationFunction>;
}

declare class BNNSLayerParametersPermute {
  constructor(init?: BNNSLayerParametersPermute);
  i_desc: BNNSNDArrayDescriptor;
  o_desc: BNNSNDArrayDescriptor;
  permutation: unknown /* const array */;
}

declare class BNNSOptimizerRMSPropWithClippingFields {
  constructor(init?: BNNSOptimizerRMSPropWithClippingFields);
  learning_rate: number;
  alpha: number;
  epsilon: number;
  centered: boolean;
  momentum: number;
  gradient_scale: number;
  regularization_scale: number;
  regularization_func: interop.Enum<typeof BNNSOptimizerRegularizationFunction>;
  clipping_func: interop.Enum<typeof BNNSOptimizerClippingFunction>;
  clip_gradients_min: number;
  clip_gradients_max: number;
  clip_gradients_max_norm: number;
  clip_gradients_use_norm: number;
}

declare class bnns_user_message_data_t {
  constructor(init?: bnns_user_message_data_t);
  size: number;
  data: interop.Pointer;
}

declare class BNNSLayerParametersPadding {
  constructor(init?: BNNSLayerParametersPadding);
  i_desc: BNNSNDArrayDescriptor;
  o_desc: BNNSNDArrayDescriptor;
  padding_size: unknown /* const array */;
  padding_mode: interop.Enum<typeof BNNSPaddingMode>;
  padding_value: number;
}

declare class _SparseIterativeMethodBaseOptions {
  constructor(init?: _SparseIterativeMethodBaseOptions);
  reportError: (p1: string) => void | null;
}

declare class SparseCGOptions {
  constructor(init?: SparseCGOptions);
  reportError: (p1: string) => void | null;
  maxIterations: number;
  atol: number;
  rtol: number;
  reportStatus: (p1: string) => void | null;
}

declare class BNNSLSTMGateDescriptor {
  constructor(init?: BNNSLSTMGateDescriptor);
  iw_desc: unknown /* const array */;
  hw_desc: BNNSNDArrayDescriptor;
  cw_desc: BNNSNDArrayDescriptor;
  b_desc: BNNSNDArrayDescriptor;
  activation: BNNSActivation;
}

declare class SparseNumericFactorOptions {
  constructor(init?: SparseNumericFactorOptions);
  control: interop.Enum<typeof SparseControl_t>;
  scalingMethod: interop.Enum<typeof SparseScaling_t>;
  scaling: interop.Pointer;
  pivotTolerance: number;
  zeroTolerance: number;
}

declare class BNNSLayerParametersNormalization {
  constructor(init?: BNNSLayerParametersNormalization);
  i_desc: BNNSNDArrayDescriptor;
  o_desc: BNNSNDArrayDescriptor;
  beta_desc: BNNSNDArrayDescriptor;
  gamma_desc: BNNSNDArrayDescriptor;
  moving_mean_desc: BNNSNDArrayDescriptor;
  moving_variance_desc: BNNSNDArrayDescriptor;
  momentum: number;
  epsilon: number;
  activation: BNNSActivation;
  num_groups: number;
  normalization_axis: number;
}

declare class BNNSLayerParametersDropout {
  constructor(init?: BNNSLayerParametersDropout);
  i_desc: BNNSNDArrayDescriptor;
  o_desc: BNNSNDArrayDescriptor;
  rate: number;
  seed: number;
  control: number;
}

declare class SparseMatrix_Complex_Float {
  constructor(init?: SparseMatrix_Complex_Float);
  structure: SparseMatrixStructureComplex;
  data: interop.Pointer;
}

declare class BNNSLayerParametersReduction {
  constructor(init?: BNNSLayerParametersReduction);
  i_desc: BNNSNDArrayDescriptor;
  o_desc: BNNSNDArrayDescriptor;
  w_desc: BNNSNDArrayDescriptor;
  reduce_func: interop.Enum<typeof BNNSReduceFunction>;
  epsilon: number;
}

declare class BNNSLayerParametersCropResize {
  constructor(init?: BNNSLayerParametersCropResize);
  normalized_coordinates: boolean;
  spatial_scale: number;
  extrapolation_value: number;
  sampling_mode: interop.Enum<typeof BNNSLinearSamplingMode>;
  box_coordinate_mode: interop.Enum<typeof BNNSBoxCoordinateMode>;
  method: interop.Enum<typeof BNNSInterpolationMethod>;
}

declare class SparseOpaqueSubfactor_Float {
  constructor(init?: SparseOpaqueSubfactor_Float);
  attributes: SparseAttributes_t;
  contents: interop.Enum<typeof SparseSubfactor_t>;
  factor: SparseOpaqueFactorization_Float;
  workspaceRequiredStatic: number;
  workspaceRequiredPerRHS: number;
}

declare class SparseOpaqueSubfactor_Double {
  constructor(init?: SparseOpaqueSubfactor_Double);
  attributes: SparseAttributes_t;
  contents: interop.Enum<typeof SparseSubfactor_t>;
  factor: SparseOpaqueFactorization_Double;
  workspaceRequiredStatic: number;
  workspaceRequiredPerRHS: number;
}

declare class BNNSLSTMDataDescriptor {
  constructor(init?: BNNSLSTMDataDescriptor);
  data_desc: BNNSNDArrayDescriptor;
  hidden_desc: BNNSNDArrayDescriptor;
  cell_state_desc: BNNSNDArrayDescriptor;
}

declare class BNNSLayerParametersGram {
  constructor(init?: BNNSLayerParametersGram);
  alpha: number;
  i_desc: BNNSNDArrayDescriptor;
  o_desc: BNNSNDArrayDescriptor;
}

declare class BNNSMHAProjectionParameters {
  constructor(init?: BNNSMHAProjectionParameters);
  target_desc: BNNSNDArrayDescriptor;
  weights: BNNSNDArrayDescriptor;
  bias: BNNSNDArrayDescriptor;
}

type unnamed_8921679638105227745Descriptor = 
  | { tensor: interop.PointerConvertible }
  | { descriptor: interop.PointerConvertible }
  | { data_ptr: interop.PointerConvertible };

declare class unnamed_8921679638105227745 {
  constructor(init?: unnamed_8921679638105227745Descriptor);
  tensor: interop.Pointer;
  descriptor: interop.Pointer;
  data_ptr: interop.Pointer;
}

type unnamed_16540550601182990950Descriptor = 
  | { base: _SparseIterativeMethodBaseOptions }
  | { cg: SparseCGOptions }
  | { gmres: SparseGMRESOptions }
  | { lsmr: SparseLSMROptions }
  | { padding: unknown /* const array */ };

declare class unnamed_16540550601182990950 {
  constructor(init?: unnamed_16540550601182990950Descriptor);
  base: _SparseIterativeMethodBaseOptions;
  cg: SparseCGOptions;
  gmres: SparseGMRESOptions;
  lsmr: SparseLSMROptions;
  padding: unknown /* const array */;
}

declare function la_retain(object: NSObject): NSObject;

declare function la_release(object: NSObject): void;

declare function la_add_attributes(object: NSObject, attributes: number): void;

declare function la_remove_attributes(object: NSObject, attributes: number): void;

declare function la_status(object: NSObject): number;

declare function la_matrix_from_float_buffer(buffer: interop.PointerConvertible, matrix_rows: number, matrix_cols: number, matrix_row_stride: number, matrix_hint: number, attributes: number): NSObject;

declare function la_matrix_from_double_buffer(buffer: interop.PointerConvertible, matrix_rows: number, matrix_cols: number, matrix_row_stride: number, matrix_hint: number, attributes: number): NSObject;

declare function la_matrix_from_float_buffer_nocopy(buffer: interop.PointerConvertible, matrix_rows: number, matrix_cols: number, matrix_row_stride: number, matrix_hint: number, deallocator: (p1: interop.PointerConvertible) => void, attributes: number): NSObject;

declare function la_matrix_from_double_buffer_nocopy(buffer: interop.PointerConvertible, matrix_rows: number, matrix_cols: number, matrix_row_stride: number, matrix_hint: number, deallocator: (p1: interop.PointerConvertible) => void, attributes: number): NSObject;

declare function la_matrix_to_float_buffer(buffer: interop.PointerConvertible, buffer_row_stride: number, matrix: NSObject): number;

declare function la_matrix_to_double_buffer(buffer: interop.PointerConvertible, buffer_row_stride: number, matrix: NSObject): number;

declare function la_matrix_rows(matrix: NSObject): number;

declare function la_matrix_cols(matrix: NSObject): number;

declare function la_matrix_slice(matrix: NSObject, matrix_first_row: number, matrix_first_col: number, matrix_row_stride: number, matrix_col_stride: number, slice_rows: number, slice_cols: number): NSObject;

declare function la_identity_matrix(matrix_size: number, scalar_type: number, attributes: number): NSObject;

declare function la_diagonal_matrix_from_vector(vector: NSObject, matrix_diagonal: number): NSObject;

declare function la_vector_from_matrix_row(matrix: NSObject, matrix_row: number): NSObject;

declare function la_vector_from_matrix_col(matrix: NSObject, matrix_col: number): NSObject;

declare function la_vector_from_matrix_diagonal(matrix: NSObject, matrix_diagonal: number): NSObject;

declare function la_vector_to_float_buffer(buffer: interop.PointerConvertible, buffer_stride: number, vector: NSObject): number;

declare function la_vector_to_double_buffer(buffer: interop.PointerConvertible, buffer_stride: number, vector: NSObject): number;

declare function la_vector_length(vector: NSObject): number;

declare function la_vector_slice(vector: NSObject, vector_first: number, vector_stride: number, slice_length: number): NSObject;

declare function la_splat_from_float(scalar_value: number, attributes: number): NSObject;

declare function la_splat_from_double(scalar_value: number, attributes: number): NSObject;

declare function la_splat_from_vector_element(vector: NSObject, vector_index: number): NSObject;

declare function la_splat_from_matrix_element(matrix: NSObject, matrix_row: number, matrix_col: number): NSObject;

declare function la_vector_from_splat(splat: NSObject, simd_length: number): NSObject;

declare function la_matrix_from_splat(splat: NSObject, matrix_rows: number, matrix_cols: number): NSObject;

declare function la_transpose(matrix: NSObject): NSObject;

declare function la_scale_with_float(matrix: NSObject, scalar: number): NSObject;

declare function la_scale_with_double(matrix: NSObject, scalar: number): NSObject;

declare function la_sum(obj_left: NSObject, obj_right: NSObject): NSObject;

declare function la_difference(obj_left: NSObject, obj_right: NSObject): NSObject;

declare function la_elementwise_product(obj_left: NSObject, obj_right: NSObject): NSObject;

declare function la_inner_product(vector_left: NSObject, vector_right: NSObject): NSObject;

declare function la_outer_product(vector_left: NSObject, vector_right: NSObject): NSObject;

declare function la_matrix_product(matrix_left: NSObject, matrix_right: NSObject): NSObject;

declare function la_solve(matrix_system: NSObject, obj_rhs: NSObject): NSObject;

declare function la_norm_as_float(vector: NSObject, vector_norm: number): number;

declare function la_norm_as_double(vector: NSObject, vector_norm: number): number;

declare function la_normalized_vector(vector: NSObject, vector_norm: number): NSObject;

declare function SparseGetInertia(Factored: SparseOpaqueFactorization_Float, num_positive: interop.PointerConvertible, num_zero: interop.PointerConvertible, num_negative: interop.PointerConvertible): number;

declare function SparseGetInertia(Factored: SparseOpaqueFactorization_Double, num_positive: interop.PointerConvertible, num_zero: interop.PointerConvertible, num_negative: interop.PointerConvertible): number;

declare function SparseGetInertia(Factored: SparseOpaqueFactorization_Complex_Float, num_positive: interop.PointerConvertible, num_zero: interop.PointerConvertible, num_negative: interop.PointerConvertible): number;

declare function SparseGetInertia(Factored: SparseOpaqueFactorization_Complex_Double, num_positive: interop.PointerConvertible, num_zero: interop.PointerConvertible, num_negative: interop.PointerConvertible): number;

declare function _SparseSymbolicFactorSymmetric(factorType: interop.Enum<typeof SparseFactorization_t>, Matrix: interop.PointerConvertible, options: interop.PointerConvertible): SparseOpaqueSymbolicFactorization;

declare function _SparseSymbolicFactorQR(factorType: interop.Enum<typeof SparseFactorization_t>, Matrix: interop.PointerConvertible, options: interop.PointerConvertible): SparseOpaqueSymbolicFactorization;

declare function _SparseSymbolicFactorLU(factorType: interop.Enum<typeof SparseFactorization_t>, Matrix: interop.PointerConvertible, options: interop.PointerConvertible): SparseOpaqueSymbolicFactorization;

declare function _SparseRetainSymbolic(symbolicFactor: interop.PointerConvertible): void;

declare function _SparseDestroyOpaqueSymbolic(toFree: interop.PointerConvertible): void;

declare function _SparseGetOptionsFromSymbolicFactor(factor: interop.PointerConvertible): SparseSymbolicFactorOptions;

declare function _SparseTrap(): void;

declare function _SparseFromKindComplex(K: interop.Enum<typeof SparseKind_t>): interop.Enum<typeof SparseKind_t>;

declare function _SparseToKindComplex(K: interop.Enum<typeof SparseKind_t>): interop.Enum<typeof SparseKind_t>;

declare function _SparseFromAttributeComplex(K: SparseAttributesComplex_t): SparseAttributes_t;

declare function _SparseToAttributeComplex(K: SparseAttributes_t): SparseAttributesComplex_t;

declare function _SparseFromStructureComplex(K: SparseMatrixStructureComplex): SparseMatrixStructure;

declare function _SparseToStructureComplex(K: SparseMatrixStructure): SparseMatrixStructureComplex;

declare function _SparseConvertFromCoordinate_Double(m: number, n: number, nBlock: number, blockSize: number, attributes: SparseAttributes_t, row: interop.PointerConvertible, col: interop.PointerConvertible, val: interop.PointerConvertible, storage: string, workspace: interop.PointerConvertible): SparseMatrix_Double;

declare function _SparseConvertFromOpaque_Double(matrix: interop.PointerConvertible): SparseMatrix_Double;

declare function _SparseNumericFactorSymmetric_Double(symbolicFactor: interop.PointerConvertible, Matrix: interop.PointerConvertible, options: interop.PointerConvertible, factorStorage: interop.PointerConvertible, workspace: interop.PointerConvertible): SparseOpaqueFactorization_Double;

declare function _SparseNumericFactorQR_Double(symbolicFactor: interop.PointerConvertible, Matrix: interop.PointerConvertible, options: interop.PointerConvertible, factorStorage: interop.PointerConvertible, workspace: interop.PointerConvertible): SparseOpaqueFactorization_Double;

declare function _SparseNumericFactorLU_Double(symbolicFactor: interop.PointerConvertible, Matrix: interop.PointerConvertible, options: interop.PointerConvertible, factorStorage: interop.PointerConvertible, workspace: interop.PointerConvertible): SparseOpaqueFactorization_Double;

declare function _SparseFactorSymmetric_Double(factorType: interop.Enum<typeof SparseFactorization_t>, Matrix: interop.PointerConvertible, sfoptions: interop.PointerConvertible, nfoptions: interop.PointerConvertible): SparseOpaqueFactorization_Double;

declare function _SparseFactorQR_Double(factorType: interop.Enum<typeof SparseFactorization_t>, Matrix: interop.PointerConvertible, sfoptions: interop.PointerConvertible, nfoptions: interop.PointerConvertible): SparseOpaqueFactorization_Double;

declare function _SparseFactorLU_Double(factorType: interop.Enum<typeof SparseFactorization_t>, Matrix: interop.PointerConvertible, sfoptions: interop.PointerConvertible, nfoptions: interop.PointerConvertible): SparseOpaqueFactorization_Double;

declare function _SparseRefactorSymmetric_Double(Matrix: interop.PointerConvertible, Factorization: interop.PointerConvertible, nfoptions: interop.PointerConvertible, workspace: interop.PointerConvertible): void;

declare function _SparseRefactorQR_Double(Matrix: interop.PointerConvertible, Factorization: interop.PointerConvertible, nfoptions: interop.PointerConvertible, workspace: interop.PointerConvertible): void;

declare function _SparseRefactorLU_Double(Matrix: interop.PointerConvertible, Factorization: interop.PointerConvertible, nfoptions: interop.PointerConvertible, workspace: interop.PointerConvertible): void;

declare function _SparseUpdatePartialRefactorLU_Double(Opaque: interop.PointerConvertible, updateCount: number, updatedIndices: interop.PointerConvertible, newMatrix: SparseMatrix_Double): void;

declare function _SparseMultiplySubfactor_Double(Subfactor: interop.PointerConvertible, x: interop.PointerConvertible, y: interop.PointerConvertible, workspace: string): void;

declare function _SparseSolveSubfactor_Double(Subfactor: interop.PointerConvertible, b: interop.PointerConvertible, x: interop.PointerConvertible, workspace: string): void;

declare function _SparseSolveOpaque_Double(Factored: interop.PointerConvertible, RHS: interop.PointerConvertible, Soln: interop.PointerConvertible, workspace: interop.PointerConvertible): void;

declare function _SparseDestroyOpaqueNumeric_Double(toFree: interop.PointerConvertible): void;

declare function _SparseRetainNumeric_Double(numericFactor: interop.PointerConvertible): void;

declare function _SparseGetOptionsFromNumericFactor_Double(factor: interop.PointerConvertible): SparseNumericFactorOptions;

declare function _SparseGetWorkspaceRequired_Double(Subfactor: interop.Enum<typeof SparseSubfactor_t>, Factor: SparseOpaqueFactorization_Double, workStatic: interop.PointerConvertible, workPerRHS: interop.PointerConvertible): void;

declare function _SparseGetIterativeStateSize_Double(method: interop.PointerConvertible, preconditioner: boolean, m: number, n: number, nrhs: number): number;

declare function _SparseCGIterate_Double(options: interop.PointerConvertible, iteration: number, state: string, converged: interop.PointerConvertible, X: interop.PointerConvertible, B: interop.PointerConvertible, R: interop.PointerConvertible, Preconditioner: interop.PointerConvertible, ApplyOperator: (p1: boolean, p2: interop.Enum<typeof CBLAS_TRANSPOSE>, p3: DenseMatrix_Double, p4: DenseMatrix_Double) => void): void;

declare function _SparseCGSolve_Double(options: interop.PointerConvertible, X: interop.PointerConvertible, B: interop.PointerConvertible, ApplyOperator: (p1: boolean, p2: interop.Enum<typeof CBLAS_TRANSPOSE>, p3: DenseMatrix_Double, p4: DenseMatrix_Double) => void, Preconditioner: interop.PointerConvertible): interop.Enum<typeof SparseIterativeStatus_t>;

declare function _SparseGMRESIterate_Double(options: interop.PointerConvertible, iteration: number, state: string, converged: interop.PointerConvertible, X: interop.PointerConvertible, B: interop.PointerConvertible, R: interop.PointerConvertible, Preconditioner: interop.PointerConvertible, ApplyOperator: (p1: boolean, p2: interop.Enum<typeof CBLAS_TRANSPOSE>, p3: DenseMatrix_Double, p4: DenseMatrix_Double) => void): void;

declare function _SparseGMRESSolve_Double(options: interop.PointerConvertible, X: interop.PointerConvertible, B: interop.PointerConvertible, ApplyOperator: (p1: boolean, p2: interop.Enum<typeof CBLAS_TRANSPOSE>, p3: DenseMatrix_Double, p4: DenseMatrix_Double) => void, Preconditioner: interop.PointerConvertible): interop.Enum<typeof SparseIterativeStatus_t>;

declare function _SparseLSMRIterate_Double(options: interop.PointerConvertible, iteration: number, state: string, converged: interop.PointerConvertible, X: interop.PointerConvertible, B: interop.PointerConvertible, R: interop.PointerConvertible, Preconditioner: interop.PointerConvertible, ApplyOperator: (p1: boolean, p2: interop.Enum<typeof CBLAS_TRANSPOSE>, p3: DenseMatrix_Double, p4: DenseMatrix_Double) => void): void;

declare function _SparseLSMRSolve_Double(options: interop.PointerConvertible, X: interop.PointerConvertible, B: interop.PointerConvertible, ApplyOperator: (p1: boolean, p2: interop.Enum<typeof CBLAS_TRANSPOSE>, p3: DenseMatrix_Double, p4: DenseMatrix_Double) => void, Preconditioner: interop.PointerConvertible): interop.Enum<typeof SparseIterativeStatus_t>;

declare function _SparseCreatePreconditioner_Double(type: interop.Enum<typeof SparsePreconditioner_t>, A: interop.PointerConvertible): SparseOpaquePreconditioner_Double;

declare function _SparseReleaseOpaquePreconditioner_Double(toFree: interop.PointerConvertible): void;

declare function _SparseSpMV_Double(alpha: number, A: SparseMatrix_Double, x: DenseMatrix_Double, accumulate: boolean, y: DenseMatrix_Double): void;

declare function _SparseConvertFromCoordinate_Float(m: number, n: number, nBlock: number, blockSize: number, attributes: SparseAttributes_t, row: interop.PointerConvertible, col: interop.PointerConvertible, val: interop.PointerConvertible, storage: string, workspace: interop.PointerConvertible): SparseMatrix_Float;

declare function _SparseConvertFromOpaque_Float(matrix: interop.PointerConvertible): SparseMatrix_Float;

declare function _SparseNumericFactorSymmetric_Float(symbolicFactor: interop.PointerConvertible, Matrix: interop.PointerConvertible, options: interop.PointerConvertible, factorStorage: interop.PointerConvertible, workspace: interop.PointerConvertible): SparseOpaqueFactorization_Float;

declare function _SparseNumericFactorQR_Float(symbolicFactor: interop.PointerConvertible, Matrix: interop.PointerConvertible, options: interop.PointerConvertible, factorStorage: interop.PointerConvertible, workspace: interop.PointerConvertible): SparseOpaqueFactorization_Float;

declare function _SparseNumericFactorLU_Float(symbolicFactor: interop.PointerConvertible, Matrix: interop.PointerConvertible, options: interop.PointerConvertible, factorStorage: interop.PointerConvertible, workspace: interop.PointerConvertible): SparseOpaqueFactorization_Float;

declare function _SparseFactorSymmetric_Float(factorType: interop.Enum<typeof SparseFactorization_t>, Matrix: interop.PointerConvertible, sfoptions: interop.PointerConvertible, nfoptions: interop.PointerConvertible): SparseOpaqueFactorization_Float;

declare function _SparseFactorQR_Float(factorType: interop.Enum<typeof SparseFactorization_t>, Matrix: interop.PointerConvertible, sfoptions: interop.PointerConvertible, nfoptions: interop.PointerConvertible): SparseOpaqueFactorization_Float;

declare function _SparseFactorLU_Float(factorType: interop.Enum<typeof SparseFactorization_t>, Matrix: interop.PointerConvertible, sfoptions: interop.PointerConvertible, nfoptions: interop.PointerConvertible): SparseOpaqueFactorization_Float;

declare function _SparseRefactorSymmetric_Float(Matrix: interop.PointerConvertible, Factorization: interop.PointerConvertible, nfoptions: interop.PointerConvertible, workspace: interop.PointerConvertible): void;

declare function _SparseRefactorQR_Float(Matrix: interop.PointerConvertible, Factorization: interop.PointerConvertible, nfoptions: interop.PointerConvertible, workspace: interop.PointerConvertible): void;

declare function _SparseRefactorLU_Float(Matrix: interop.PointerConvertible, Factorization: interop.PointerConvertible, nfoptions: interop.PointerConvertible, workspace: interop.PointerConvertible): void;

declare function _SparseUpdatePartialRefactorLU_Float(Opaque: interop.PointerConvertible, updateCount: number, updatedIndices: interop.PointerConvertible, newMatrix: SparseMatrix_Float): void;

declare function _SparseMultiplySubfactor_Float(Subfactor: interop.PointerConvertible, x: interop.PointerConvertible, y: interop.PointerConvertible, workspace: string): void;

declare function _SparseSolveSubfactor_Float(Subfactor: interop.PointerConvertible, b: interop.PointerConvertible, x: interop.PointerConvertible, workspace: string): void;

declare function _SparseSolveOpaque_Float(Factored: interop.PointerConvertible, RHS: interop.PointerConvertible, Soln: interop.PointerConvertible, workspace: interop.PointerConvertible): void;

declare function _SparseDestroyOpaqueNumeric_Float(toFree: interop.PointerConvertible): void;

declare function _SparseRetainNumeric_Float(numericFactor: interop.PointerConvertible): void;

declare function _SparseGetOptionsFromNumericFactor_Float(factor: interop.PointerConvertible): SparseNumericFactorOptions;

declare function _SparseGetWorkspaceRequired_Float(Subfactor: interop.Enum<typeof SparseSubfactor_t>, Factor: SparseOpaqueFactorization_Float, workStatic: interop.PointerConvertible, workPerRHS: interop.PointerConvertible): void;

declare function _SparseGetIterativeStateSize_Float(method: interop.PointerConvertible, preconditioner: boolean, m: number, n: number, nrhs: number): number;

declare function _SparseCGIterate_Float(options: interop.PointerConvertible, iteration: number, state: string, converged: interop.PointerConvertible, X: interop.PointerConvertible, B: interop.PointerConvertible, R: interop.PointerConvertible, Preconditioner: interop.PointerConvertible, ApplyOperator: (p1: boolean, p2: interop.Enum<typeof CBLAS_TRANSPOSE>, p3: DenseMatrix_Float, p4: DenseMatrix_Float) => void): void;

declare function _SparseCGSolve_Float(options: interop.PointerConvertible, X: interop.PointerConvertible, B: interop.PointerConvertible, ApplyOperator: (p1: boolean, p2: interop.Enum<typeof CBLAS_TRANSPOSE>, p3: DenseMatrix_Float, p4: DenseMatrix_Float) => void, Preconditioner: interop.PointerConvertible): interop.Enum<typeof SparseIterativeStatus_t>;

declare function _SparseGMRESIterate_Float(options: interop.PointerConvertible, iteration: number, state: string, converged: interop.PointerConvertible, X: interop.PointerConvertible, B: interop.PointerConvertible, R: interop.PointerConvertible, Preconditioner: interop.PointerConvertible, ApplyOperator: (p1: boolean, p2: interop.Enum<typeof CBLAS_TRANSPOSE>, p3: DenseMatrix_Float, p4: DenseMatrix_Float) => void): void;

declare function _SparseGMRESSolve_Float(options: interop.PointerConvertible, X: interop.PointerConvertible, B: interop.PointerConvertible, ApplyOperator: (p1: boolean, p2: interop.Enum<typeof CBLAS_TRANSPOSE>, p3: DenseMatrix_Float, p4: DenseMatrix_Float) => void, Preconditioner: interop.PointerConvertible): interop.Enum<typeof SparseIterativeStatus_t>;

declare function _SparseLSMRIterate_Float(options: interop.PointerConvertible, iteration: number, state: string, converged: interop.PointerConvertible, X: interop.PointerConvertible, B: interop.PointerConvertible, R: interop.PointerConvertible, Preconditioner: interop.PointerConvertible, ApplyOperator: (p1: boolean, p2: interop.Enum<typeof CBLAS_TRANSPOSE>, p3: DenseMatrix_Float, p4: DenseMatrix_Float) => void): void;

declare function _SparseLSMRSolve_Float(options: interop.PointerConvertible, X: interop.PointerConvertible, B: interop.PointerConvertible, ApplyOperator: (p1: boolean, p2: interop.Enum<typeof CBLAS_TRANSPOSE>, p3: DenseMatrix_Float, p4: DenseMatrix_Float) => void, Preconditioner: interop.PointerConvertible): interop.Enum<typeof SparseIterativeStatus_t>;

declare function _SparseCreatePreconditioner_Float(type: interop.Enum<typeof SparsePreconditioner_t>, A: interop.PointerConvertible): SparseOpaquePreconditioner_Float;

declare function _SparseReleaseOpaquePreconditioner_Float(toFree: interop.PointerConvertible): void;

declare function _SparseSpMV_Float(alpha: number, A: SparseMatrix_Float, x: DenseMatrix_Float, accumulate: boolean, y: DenseMatrix_Float): void;

declare function _SparseConvertFromCoordinate_Complex_Double(m: number, n: number, nBlock: number, blockSize: number, attributes: SparseAttributesComplex_t, row: interop.PointerConvertible, col: interop.PointerConvertible, val: interop.PointerConvertible, storage: string, workspace: interop.PointerConvertible): SparseMatrix_Complex_Double;

declare function _SparseConvertFromOpaque_Complex_Double(matrix: interop.PointerConvertible): SparseMatrix_Complex_Double;

declare function _SparseNumericFactorSymmetric_Complex_Double(symbolicFactor: interop.PointerConvertible, Matrix: interop.PointerConvertible, options: interop.PointerConvertible, factorStorage: interop.PointerConvertible, workspace: interop.PointerConvertible): SparseOpaqueFactorization_Complex_Double;

declare function _SparseNumericFactorHermitian_Complex_Double(symbolicFactor: interop.PointerConvertible, Matrix: interop.PointerConvertible, options: interop.PointerConvertible, factorStorage: interop.PointerConvertible, workspace: interop.PointerConvertible): SparseOpaqueFactorization_Complex_Double;

declare function _SparseNumericFactorQR_Complex_Double(symbolicFactor: interop.PointerConvertible, Matrix: interop.PointerConvertible, options: interop.PointerConvertible, factorStorage: interop.PointerConvertible, workspace: interop.PointerConvertible): SparseOpaqueFactorization_Complex_Double;

declare function _SparseNumericFactorLU_Complex_Double(symbolicFactor: interop.PointerConvertible, Matrix: interop.PointerConvertible, options: interop.PointerConvertible, factorStorage: interop.PointerConvertible, workspace: interop.PointerConvertible): SparseOpaqueFactorization_Complex_Double;

declare function _SparseFactorSymmetric_Complex_Double(factorType: interop.Enum<typeof SparseFactorization_t>, Matrix: interop.PointerConvertible, sfoptions: interop.PointerConvertible, nfoptions: interop.PointerConvertible): SparseOpaqueFactorization_Complex_Double;

declare function _SparseFactorHermitian_Complex_Double(factorType: interop.Enum<typeof SparseFactorization_t>, Matrix: interop.PointerConvertible, sfoptions: interop.PointerConvertible, nfoptions: interop.PointerConvertible): SparseOpaqueFactorization_Complex_Double;

declare function _SparseFactorQR_Complex_Double(factorType: interop.Enum<typeof SparseFactorization_t>, Matrix: interop.PointerConvertible, sfoptions: interop.PointerConvertible, nfoptions: interop.PointerConvertible): SparseOpaqueFactorization_Complex_Double;

declare function _SparseFactorLU_Complex_Double(factorType: interop.Enum<typeof SparseFactorization_t>, Matrix: interop.PointerConvertible, sfoptions: interop.PointerConvertible, nfoptions: interop.PointerConvertible): SparseOpaqueFactorization_Complex_Double;

declare function _SparseRefactorSymmetric_Complex_Double(Matrix: interop.PointerConvertible, Factorization: interop.PointerConvertible, nfoptions: interop.PointerConvertible, workspace: interop.PointerConvertible): void;

declare function _SparseRefactorHermitian_Complex_Double(Matrix: interop.PointerConvertible, Factorization: interop.PointerConvertible, nfoptions: interop.PointerConvertible, workspace: interop.PointerConvertible): void;

declare function _SparseRefactorQR_Complex_Double(Matrix: interop.PointerConvertible, Factorization: interop.PointerConvertible, nfoptions: interop.PointerConvertible, workspace: interop.PointerConvertible): void;

declare function _SparseRefactorLU_Complex_Double(Matrix: interop.PointerConvertible, Factorization: interop.PointerConvertible, nfoptions: interop.PointerConvertible, workspace: interop.PointerConvertible): void;

declare function _SparseUpdatePartialRefactorLU_Complex_Double(Opaque: interop.PointerConvertible, updateCount: number, updatedIndices: interop.PointerConvertible, newMatrix: SparseMatrix_Complex_Double): void;

declare function _SparseMultiplySubfactor_Complex_Double(Subfactor: interop.PointerConvertible, x: interop.PointerConvertible, y: interop.PointerConvertible, workspace: string): void;

declare function _SparseSolveSubfactor_Complex_Double(Subfactor: interop.PointerConvertible, b: interop.PointerConvertible, x: interop.PointerConvertible, workspace: string): void;

declare function _SparseSolveOpaque_Complex_Double(Factored: interop.PointerConvertible, RHS: interop.PointerConvertible, Soln: interop.PointerConvertible, workspace: interop.PointerConvertible): void;

declare function _SparseDestroyOpaqueNumeric_Complex_Double(toFree: interop.PointerConvertible): void;

declare function _SparseRetainNumeric_Complex_Double(numericFactor: interop.PointerConvertible): void;

declare function _SparseGetOptionsFromNumericFactor_Complex_Double(factor: interop.PointerConvertible): SparseNumericFactorOptions;

declare function _SparseGetWorkspaceRequired_Complex_Double(Subfactor: interop.Enum<typeof SparseSubfactor_t>, Factor: SparseOpaqueFactorization_Complex_Double, workStatic: interop.PointerConvertible, workPerRHS: interop.PointerConvertible): void;

declare function _SparseGetIterativeStateSize_Complex_Double(method: interop.PointerConvertible, preconditioner: boolean, m: number, n: number, nrhs: number): number;

declare function _SparseCGIterate_Complex_Double(options: interop.PointerConvertible, iteration: number, state: string, converged: interop.PointerConvertible, X: interop.PointerConvertible, B: interop.PointerConvertible, R: interop.PointerConvertible, Preconditioner: interop.PointerConvertible, ApplyOperator: (p1: boolean, p2: interop.Enum<typeof CBLAS_TRANSPOSE>, p3: DenseMatrix_Complex_Double, p4: DenseMatrix_Complex_Double) => void): void;

declare function _SparseCGSolve_Complex_Double(options: interop.PointerConvertible, X: interop.PointerConvertible, B: interop.PointerConvertible, ApplyOperator: (p1: boolean, p2: interop.Enum<typeof CBLAS_TRANSPOSE>, p3: DenseMatrix_Complex_Double, p4: DenseMatrix_Complex_Double) => void, Preconditioner: interop.PointerConvertible): interop.Enum<typeof SparseIterativeStatus_t>;

declare function _SparseGMRESIterate_Complex_Double(options: interop.PointerConvertible, iteration: number, state: string, converged: interop.PointerConvertible, X: interop.PointerConvertible, B: interop.PointerConvertible, R: interop.PointerConvertible, Preconditioner: interop.PointerConvertible, ApplyOperator: (p1: boolean, p2: interop.Enum<typeof CBLAS_TRANSPOSE>, p3: DenseMatrix_Complex_Double, p4: DenseMatrix_Complex_Double) => void): void;

declare function _SparseGMRESSolve_Complex_Double(options: interop.PointerConvertible, X: interop.PointerConvertible, B: interop.PointerConvertible, ApplyOperator: (p1: boolean, p2: interop.Enum<typeof CBLAS_TRANSPOSE>, p3: DenseMatrix_Complex_Double, p4: DenseMatrix_Complex_Double) => void, Preconditioner: interop.PointerConvertible): interop.Enum<typeof SparseIterativeStatus_t>;

declare function _SparseLSMRIterate_Complex_Double(options: interop.PointerConvertible, iteration: number, state: string, converged: interop.PointerConvertible, X: interop.PointerConvertible, B: interop.PointerConvertible, R: interop.PointerConvertible, Preconditioner: interop.PointerConvertible, ApplyOperator: (p1: boolean, p2: interop.Enum<typeof CBLAS_TRANSPOSE>, p3: DenseMatrix_Complex_Double, p4: DenseMatrix_Complex_Double) => void): void;

declare function _SparseLSMRSolve_Complex_Double(options: interop.PointerConvertible, X: interop.PointerConvertible, B: interop.PointerConvertible, ApplyOperator: (p1: boolean, p2: interop.Enum<typeof CBLAS_TRANSPOSE>, p3: DenseMatrix_Complex_Double, p4: DenseMatrix_Complex_Double) => void, Preconditioner: interop.PointerConvertible): interop.Enum<typeof SparseIterativeStatus_t>;

declare function _SparseCreatePreconditioner_Complex_Double(type: interop.Enum<typeof SparsePreconditioner_t>, A: interop.PointerConvertible): SparseOpaquePreconditioner_Complex_Double;

declare function _SparseReleaseOpaquePreconditioner_Complex_Double(toFree: interop.PointerConvertible): void;

declare function _SparseSpMV_Complex_Double(alpha: unknown /* complex */, A: SparseMatrix_Complex_Double, x: DenseMatrix_Complex_Double, accumulate: boolean, y: DenseMatrix_Complex_Double): void;

declare function _SparseConvertFromCoordinate_Complex_Float(m: number, n: number, nBlock: number, blockSize: number, attributes: SparseAttributesComplex_t, row: interop.PointerConvertible, col: interop.PointerConvertible, val: interop.PointerConvertible, storage: string, workspace: interop.PointerConvertible): SparseMatrix_Complex_Float;

declare function _SparseConvertFromOpaque_Complex_Float(matrix: interop.PointerConvertible): SparseMatrix_Complex_Float;

declare function _SparseNumericFactorSymmetric_Complex_Float(symbolicFactor: interop.PointerConvertible, Matrix: interop.PointerConvertible, options: interop.PointerConvertible, factorStorage: interop.PointerConvertible, workspace: interop.PointerConvertible): SparseOpaqueFactorization_Complex_Float;

declare function _SparseNumericFactorHermitian_Complex_Float(symbolicFactor: interop.PointerConvertible, Matrix: interop.PointerConvertible, options: interop.PointerConvertible, factorStorage: interop.PointerConvertible, workspace: interop.PointerConvertible): SparseOpaqueFactorization_Complex_Float;

declare function _SparseNumericFactorQR_Complex_Float(symbolicFactor: interop.PointerConvertible, Matrix: interop.PointerConvertible, options: interop.PointerConvertible, factorStorage: interop.PointerConvertible, workspace: interop.PointerConvertible): SparseOpaqueFactorization_Complex_Float;

declare function _SparseNumericFactorLU_Complex_Float(symbolicFactor: interop.PointerConvertible, Matrix: interop.PointerConvertible, options: interop.PointerConvertible, factorStorage: interop.PointerConvertible, workspace: interop.PointerConvertible): SparseOpaqueFactorization_Complex_Float;

declare function _SparseFactorSymmetric_Complex_Float(factorType: interop.Enum<typeof SparseFactorization_t>, Matrix: interop.PointerConvertible, sfoptions: interop.PointerConvertible, nfoptions: interop.PointerConvertible): SparseOpaqueFactorization_Complex_Float;

declare function _SparseFactorHermitian_Complex_Float(factorType: interop.Enum<typeof SparseFactorization_t>, Matrix: interop.PointerConvertible, sfoptions: interop.PointerConvertible, nfoptions: interop.PointerConvertible): SparseOpaqueFactorization_Complex_Float;

declare function _SparseFactorQR_Complex_Float(factorType: interop.Enum<typeof SparseFactorization_t>, Matrix: interop.PointerConvertible, sfoptions: interop.PointerConvertible, nfoptions: interop.PointerConvertible): SparseOpaqueFactorization_Complex_Float;

declare function _SparseFactorLU_Complex_Float(factorType: interop.Enum<typeof SparseFactorization_t>, Matrix: interop.PointerConvertible, sfoptions: interop.PointerConvertible, nfoptions: interop.PointerConvertible): SparseOpaqueFactorization_Complex_Float;

declare function _SparseRefactorSymmetric_Complex_Float(Matrix: interop.PointerConvertible, Factorization: interop.PointerConvertible, nfoptions: interop.PointerConvertible, workspace: interop.PointerConvertible): void;

declare function _SparseRefactorHermitian_Complex_Float(Matrix: interop.PointerConvertible, Factorization: interop.PointerConvertible, nfoptions: interop.PointerConvertible, workspace: interop.PointerConvertible): void;

declare function _SparseRefactorQR_Complex_Float(Matrix: interop.PointerConvertible, Factorization: interop.PointerConvertible, nfoptions: interop.PointerConvertible, workspace: interop.PointerConvertible): void;

declare function _SparseRefactorLU_Complex_Float(Matrix: interop.PointerConvertible, Factorization: interop.PointerConvertible, nfoptions: interop.PointerConvertible, workspace: interop.PointerConvertible): void;

declare function _SparseUpdatePartialRefactorLU_Complex_Float(Opaque: interop.PointerConvertible, updateCount: number, updatedIndices: interop.PointerConvertible, newMatrix: SparseMatrix_Complex_Float): void;

declare function _SparseMultiplySubfactor_Complex_Float(Subfactor: interop.PointerConvertible, x: interop.PointerConvertible, y: interop.PointerConvertible, workspace: string): void;

declare function _SparseSolveSubfactor_Complex_Float(Subfactor: interop.PointerConvertible, b: interop.PointerConvertible, x: interop.PointerConvertible, workspace: string): void;

declare function _SparseSolveOpaque_Complex_Float(Factored: interop.PointerConvertible, RHS: interop.PointerConvertible, Soln: interop.PointerConvertible, workspace: interop.PointerConvertible): void;

declare function _SparseDestroyOpaqueNumeric_Complex_Float(toFree: interop.PointerConvertible): void;

declare function _SparseRetainNumeric_Complex_Float(numericFactor: interop.PointerConvertible): void;

declare function _SparseGetOptionsFromNumericFactor_Complex_Float(factor: interop.PointerConvertible): SparseNumericFactorOptions;

declare function _SparseGetWorkspaceRequired_Complex_Float(Subfactor: interop.Enum<typeof SparseSubfactor_t>, Factor: SparseOpaqueFactorization_Complex_Float, workStatic: interop.PointerConvertible, workPerRHS: interop.PointerConvertible): void;

declare function _SparseGetIterativeStateSize_Complex_Float(method: interop.PointerConvertible, preconditioner: boolean, m: number, n: number, nrhs: number): number;

declare function _SparseCGIterate_Complex_Float(options: interop.PointerConvertible, iteration: number, state: string, converged: interop.PointerConvertible, X: interop.PointerConvertible, B: interop.PointerConvertible, R: interop.PointerConvertible, Preconditioner: interop.PointerConvertible, ApplyOperator: (p1: boolean, p2: interop.Enum<typeof CBLAS_TRANSPOSE>, p3: DenseMatrix_Complex_Float, p4: DenseMatrix_Complex_Float) => void): void;

declare function _SparseCGSolve_Complex_Float(options: interop.PointerConvertible, X: interop.PointerConvertible, B: interop.PointerConvertible, ApplyOperator: (p1: boolean, p2: interop.Enum<typeof CBLAS_TRANSPOSE>, p3: DenseMatrix_Complex_Float, p4: DenseMatrix_Complex_Float) => void, Preconditioner: interop.PointerConvertible): interop.Enum<typeof SparseIterativeStatus_t>;

declare function _SparseGMRESIterate_Complex_Float(options: interop.PointerConvertible, iteration: number, state: string, converged: interop.PointerConvertible, X: interop.PointerConvertible, B: interop.PointerConvertible, R: interop.PointerConvertible, Preconditioner: interop.PointerConvertible, ApplyOperator: (p1: boolean, p2: interop.Enum<typeof CBLAS_TRANSPOSE>, p3: DenseMatrix_Complex_Float, p4: DenseMatrix_Complex_Float) => void): void;

declare function _SparseGMRESSolve_Complex_Float(options: interop.PointerConvertible, X: interop.PointerConvertible, B: interop.PointerConvertible, ApplyOperator: (p1: boolean, p2: interop.Enum<typeof CBLAS_TRANSPOSE>, p3: DenseMatrix_Complex_Float, p4: DenseMatrix_Complex_Float) => void, Preconditioner: interop.PointerConvertible): interop.Enum<typeof SparseIterativeStatus_t>;

declare function _SparseLSMRIterate_Complex_Float(options: interop.PointerConvertible, iteration: number, state: string, converged: interop.PointerConvertible, X: interop.PointerConvertible, B: interop.PointerConvertible, R: interop.PointerConvertible, Preconditioner: interop.PointerConvertible, ApplyOperator: (p1: boolean, p2: interop.Enum<typeof CBLAS_TRANSPOSE>, p3: DenseMatrix_Complex_Float, p4: DenseMatrix_Complex_Float) => void): void;

declare function _SparseLSMRSolve_Complex_Float(options: interop.PointerConvertible, X: interop.PointerConvertible, B: interop.PointerConvertible, ApplyOperator: (p1: boolean, p2: interop.Enum<typeof CBLAS_TRANSPOSE>, p3: DenseMatrix_Complex_Float, p4: DenseMatrix_Complex_Float) => void, Preconditioner: interop.PointerConvertible): interop.Enum<typeof SparseIterativeStatus_t>;

declare function _SparseCreatePreconditioner_Complex_Float(type: interop.Enum<typeof SparsePreconditioner_t>, A: interop.PointerConvertible): SparseOpaquePreconditioner_Complex_Float;

declare function _SparseReleaseOpaquePreconditioner_Complex_Float(toFree: interop.PointerConvertible): void;

declare function _SparseSpMV_Complex_Float(alpha: unknown /* complex */, A: SparseMatrix_Complex_Float, x: DenseMatrix_Complex_Float, accumulate: boolean, y: DenseMatrix_Complex_Float): void;

declare function quadrature_integrate(__f: interop.PointerConvertible, __a: number, __b: number, options: interop.PointerConvertible, status: interop.PointerConvertible, abs_error: interop.PointerConvertible, workspace_size: number, workspace: interop.PointerConvertible): number;

declare function BNNSGraphCompileOptionsMakeDefault(): bnns_graph_compile_options_t;

declare function BNNSGraphCompileOptionsDestroy(options: bnns_graph_compile_options_t): void;

declare function BNNSGraphCompileOptionsSetTargetSingleThread(options: bnns_graph_compile_options_t, value: boolean): void;

declare function BNNSGraphCompileOptionsGetTargetSingleThread(options: bnns_graph_compile_options_t): boolean;

declare function BNNSGraphCompileOptionsSetGenerateDebugInfo(options: bnns_graph_compile_options_t, value: boolean): void;

declare function BNNSGraphCompileOptionsGetGenerateDebugInfo(options: bnns_graph_compile_options_t): boolean;

declare function BNNSGraphCompileOptionsSetOptimizationPreference(options: bnns_graph_compile_options_t, preference: interop.Enum<typeof BNNSGraphOptimizationPreference>): void;

declare function BNNSGraphCompileOptionsGetOptimizationPreference(options: bnns_graph_compile_options_t): interop.Enum<typeof BNNSGraphOptimizationPreference>;

declare function BNNSGraphCompileOptionsSetMessageLogCallback(options: bnns_graph_compile_options_t, log_callback: (p1: interop.Enum<typeof BNNSGraphMessageLevel>, p2: string, p3: string, p4: interop.PointerConvertible) => void, additional_logging_arguments: interop.PointerConvertible): void;

declare function BNNSGraphCompileOptionsSetMessageLogMask(options: bnns_graph_compile_options_t, log_level_mask: number): void;

declare function BNNSGraphCompileOptionsSetOutputPath(options: bnns_graph_compile_options_t, path: string): void;

declare function BNNSGraphCompileOptionsGetOutputPath(options: bnns_graph_compile_options_t): string;

declare function BNNSGraphCompileOptionsSetOutputFD(options: bnns_graph_compile_options_t, fd: number): void;

declare function BNNSGraphCompileOptionsGetOutputFD(options: bnns_graph_compile_options_t): number;

declare function BNNSGraphCompileFromFile(filename: string, function$: string, options: bnns_graph_compile_options_t): bnns_graph_t;

declare function BNNSGraphGetInputCount(graph: bnns_graph_t, function$: string): number;

declare function BNNSGraphGetOutputCount(graph: bnns_graph_t, function$: string): number;

declare function BNNSGraphGetArgumentCount(graph: bnns_graph_t, function$: string): number;

declare function BNNSGraphGetFunctionCount(graph: bnns_graph_t): number;

declare function BNNSGraphGetInputNames(graph: bnns_graph_t, function$: string, input_names_count: number, input_names: interop.PointerConvertible): number;

declare function BNNSGraphGetOutputNames(graph: bnns_graph_t, function$: string, output_names_count: number, output_names: interop.PointerConvertible): number;

declare function BNNSGraphGetArgumentNames(graph: bnns_graph_t, function$: string, argument_names_count: number, argument_names: interop.PointerConvertible): number;

declare function BNNSGraphGetFunctionNames(graph: bnns_graph_t, function_name_count: number, function_names: interop.PointerConvertible): number;

declare function BNNSGraphGetArgumentIntents(graph: bnns_graph_t, function$: string, argument_intents_count: number, argument_intents: interop.PointerConvertible): number;

declare function BNNSGraphGetArgumentPosition(graph: bnns_graph_t, function$: string, argument: string): number;

declare function BNNSGraphGetArgumentInterleaveFactors(graph: bnns_graph_t, function$: string, argument_count: number, argument_interleave: interop.PointerConvertible, argument_interleave_counts: interop.PointerConvertible): number;

declare function BNNSGraphContextMake(graph: bnns_graph_t): bnns_graph_context_t;

declare function BNNSGraphContextMakeStreaming(graph: bnns_graph_t, function$: string, initial_states_count: number, initial_states: interop.PointerConvertible): bnns_graph_context_t;

declare function BNNSGraphContextDestroy(context: bnns_graph_context_t): void;

declare function BNNSGraphContextSetDynamicShapes(context: bnns_graph_context_t, function$: string, shapes_count: number, shapes: interop.PointerConvertible): number;

declare function BNNSGraphContextSetBatchSize(context: bnns_graph_context_t, function$: string, batch_size: number): number;

declare function BNNSGraphContextSetArgumentType(context: bnns_graph_context_t, argument_type: interop.Enum<typeof BNNSGraphArgumentType>): number;

declare function BNNSGraphContextEnableNanAndInfChecks(context: bnns_graph_context_t, enable_check_for_nans_inf: boolean): void;

declare function BNNSGraphContextSetStreamingAdvanceCount(context: bnns_graph_context_t, advance_count: number): number;

declare function BNNSGraphContextExecute(context: bnns_graph_context_t, function$: string, argument_count: number, arguments$: interop.PointerConvertible, workspace_size: number, workspace: string): number;

declare function BNNSGraphContextGetWorkspaceSize(context: bnns_graph_context_t, function$: string): number;

declare function BNNSGraphContextGetTensor(context: bnns_graph_context_t, function$: string, argument: string, fill_known_dynamic_shapes: boolean, tensor: interop.PointerConvertible): number;

declare function BNNSGraphTensorFillStrides(graph: bnns_graph_t, function$: string, argument: string, tensor: interop.PointerConvertible): number;

declare function BNNSGraphContextSetWorkspaceAllocationCallback(context: bnns_graph_context_t, realloc: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number) => number, free: (p1: interop.PointerConvertible, p2: number) => void, user_memory_context_size: number, user_memory_context: interop.PointerConvertible): number;

declare function BNNSGraphContextSetOutputAllocationCallback(context: bnns_graph_context_t, realloc: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number) => number, free: (p1: interop.PointerConvertible, p2: number) => void, user_memory_context_size: number, user_memory_context: interop.PointerConvertible): number;

declare function BNNSGraphContextSetMessageLogCallback(context: bnns_graph_context_t, log_callback_fn: (p1: interop.Enum<typeof BNNSGraphMessageLevel>, p2: string, p3: string, p4: interop.PointerConvertible) => void, additional_logging_arguments: interop.PointerConvertible): number;

declare function BNNSGraphContextSetMessageLogMask(context: bnns_graph_context_t, log_level_mask: number): number;

declare interface OS_la_object extends NSObjectProtocol {
}

declare class OS_la_object extends NativeObject implements OS_la_object {
}


/// <reference types="@nativescript/objc-node-api" />

declare const MDLVertexAttributeNormal: string;

declare const MDLVertexAttributeOcclusionValue: string;

declare const MDLVertexAttributeBitangent: string;

declare const MDLVertexAttributeTangent: string;

declare const MDLVertexAttributeJointIndices: string;

declare const MDLVertexAttributeSubdivisionStencil: string;

declare const MDLVertexAttributeShadingBasisV: string;

declare const MDLVertexAttributePosition: string;

declare const MDLVertexAttributeEdgeCrease: string;

declare const MDLVertexAttributeColor: string;

declare const MDLVertexAttributeBinormal: string;

declare const MDLVertexAttributeTextureCoordinate: string;

declare const MDLVertexAttributeAnisotropy: string;

declare const MDLVertexAttributeJointWeights: string;

declare const MDLVertexAttributeShadingBasisU: string;

declare const MDLAnimatedValueInterpolation: {
  Constant: 0,
  Linear: 1,
};

declare const MDLLightType: {
  Unknown: 0,
  Ambient: 1,
  Directional: 2,
  Spot: 3,
  Point: 4,
  Linear: 5,
  DiscArea: 6,
  RectangularArea: 7,
  SuperElliptical: 8,
  Photometric: 9,
  Probe: 10,
  Environment: 11,
};

declare const MDLTransformOpRotationOrder: {
  XYZ: 1,
  XZY: 2,
  YXZ: 3,
  YZX: 4,
  ZXY: 5,
  ZYX: 6,
};

declare const MDLMaterialPropertyType: {
  None: 0,
  String: 1,
  URL: 2,
  Texture: 3,
  Color: 4,
  Float: 5,
  Float2: 6,
  Float3: 7,
  Float4: 8,
  Matrix44: 9,
  Buffer: 10,
};

declare const MDLTextureChannelEncoding: {
  UInt8: 1,
  Uint8: 1,
  UInt16: 2,
  Uint16: 2,
  UInt24: 3,
  Uint24: 3,
  UInt32: 4,
  Uint32: 4,
  Float16: 258,
  Float16SR: 770,
  Float32: 260,
};

declare const MDLMaterialTextureFilterMode: {
  Nearest: 0,
  Linear: 1,
};

declare const MDLMaterialTextureWrapMode: {
  Clamp: 0,
  Repeat: 1,
  Mirror: 2,
};

declare const MDLCameraProjection: {
  Perspective: 0,
  Orthographic: 1,
};

declare const MDLVertexFormat: {
  Invalid: 0,
  PackedBit: 4096,
  UCharBits: 65536,
  CharBits: 131072,
  UCharNormalizedBits: 196608,
  CharNormalizedBits: 262144,
  UShortBits: 327680,
  ShortBits: 393216,
  UShortNormalizedBits: 458752,
  ShortNormalizedBits: 524288,
  UIntBits: 589824,
  IntBits: 655360,
  HalfBits: 720896,
  FloatBits: 786432,
  UChar: 65537,
  UChar2: 65538,
  UChar3: 65539,
  UChar4: 65540,
  Char: 131073,
  Char2: 131074,
  Char3: 131075,
  Char4: 131076,
  UCharNormalized: 196609,
  UChar2Normalized: 196610,
  UChar3Normalized: 196611,
  UChar4Normalized: 196612,
  CharNormalized: 262145,
  Char2Normalized: 262146,
  Char3Normalized: 262147,
  Char4Normalized: 262148,
  UShort: 327681,
  UShort2: 327682,
  UShort3: 327683,
  UShort4: 327684,
  Short: 393217,
  Short2: 393218,
  Short3: 393219,
  Short4: 393220,
  UShortNormalized: 458753,
  UShort2Normalized: 458754,
  UShort3Normalized: 458755,
  UShort4Normalized: 458756,
  ShortNormalized: 524289,
  Short2Normalized: 524290,
  Short3Normalized: 524291,
  Short4Normalized: 524292,
  UInt: 589825,
  UInt2: 589826,
  UInt3: 589827,
  UInt4: 589828,
  Int: 655361,
  Int2: 655362,
  Int3: 655363,
  Int4: 655364,
  Half: 720897,
  Half2: 720898,
  Half3: 720899,
  Half4: 720900,
  Float: 786433,
  Float2: 786434,
  Float3: 786435,
  Float4: 786436,
  Int1010102Normalized: 659460,
  UInt1010102Normalized: 593924,
};

declare const MDLMeshBufferType: {
  Vertex: 1,
  Index: 2,
  Custom: 3,
};

declare const MDLProbePlacement: {
  UniformGrid: 0,
  IrradianceDistribution: 1,
};

declare const MDLGeometryType: {
  Points: 0,
  Lines: 1,
  Triangles: 2,
  TriangleStrips: 3,
  Quads: 4,
  VariableTopology: 5,
};

declare const MDLIndexBitDepth: {
  Invalid: 0,
  UInt8: 8,
  Uint8: 8,
  UInt16: 16,
  Uint16: 16,
  UInt32: 32,
  Uint32: 32,
};

declare const MDLMaterialMipMapFilterMode: {
  Nearest: 0,
  Linear: 1,
};

declare const MDLMaterialSemantic: {
  BaseColor: 0,
  Subsurface: 1,
  Metallic: 2,
  Specular: 3,
  SpecularExponent: 4,
  SpecularTint: 5,
  Roughness: 6,
  Anisotropic: 7,
  AnisotropicRotation: 8,
  Sheen: 9,
  SheenTint: 10,
  Clearcoat: 11,
  ClearcoatGloss: 12,
  Emission: 13,
  Bump: 14,
  Opacity: 15,
  InterfaceIndexOfRefraction: 16,
  MaterialIndexOfRefraction: 17,
  ObjectSpaceNormal: 18,
  TangentSpaceNormal: 19,
  Displacement: 20,
  DisplacementScale: 21,
  AmbientOcclusion: 22,
  AmbientOcclusionScale: 23,
  None: 32768,
  UserDefined: 32769,
};

declare const MDLMaterialFace: {
  Front: 0,
  Back: 1,
  DoubleSided: 2,
};

declare class MDLAxisAlignedBoundingBox {
  constructor(init?: MDLAxisAlignedBoundingBox);
  maxBounds: unknown /* ext vector */;
  minBounds: unknown /* ext vector */;
}

declare class MDLVoxelIndexExtent {
  constructor(init?: MDLVoxelIndexExtent);
  minimumExtent: unknown /* ext vector */;
  maximumExtent: unknown /* ext vector */;
}

declare interface MDLLightProbeIrradianceDataSource extends NSObject {
  boundingBox: MDLAxisAlignedBoundingBox;

  sphericalHarmonicsLevel?: number;

  sphericalHarmonicsCoefficientsAtPosition?(position: unknown /* ext vector */): NSData;
}

declare class MDLLightProbeIrradianceDataSource extends NativeObject implements MDLLightProbeIrradianceDataSource {
}

declare class MDLUtility extends NSObject {
  static convertToUSDZWriteToURL(inputURL: NSURL, outputURL: NSURL): void;
}


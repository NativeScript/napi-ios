/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const GLKTextureLoaderGLErrorKey: string;

declare const GLKTextureLoaderErrorKey: string;

declare const GLKTextureLoaderSRGB: string;

declare const kGLKModelErrorDomain: string;

declare const kGLKModelErrorKey: string;

declare const GLKTextureLoaderGenerateMipmaps: string;

declare const GLKMatrix3Identity: _GLKMatrix3;

declare const GLKQuaternionIdentity: _GLKQuaternion;

declare const GLKTextureLoaderApplyPremultiplication: string;

declare const GLKTextureLoaderGrayscaleAsAlpha: string;

declare const GLKMatrix4Identity: _GLKMatrix4;

declare const GLKTextureLoaderOriginBottomLeft: string;

declare const GLKTextureLoaderErrorDomain: string;

declare const GLKTextureLoaderError: {
  FileOrURLNotFound: 0,
  InvalidNSData: 1,
  InvalidCGImage: 2,
  UnknownPathType: 3,
  UnknownFileType: 4,
  PVRAtlasUnsupported: 5,
  CubeMapInvalidNumFiles: 6,
  CompressedTextureUpload: 7,
  UncompressedTextureUpload: 8,
  UnsupportedCubeMapDimensions: 9,
  UnsupportedBitDepth: 10,
  UnsupportedPVRFormat: 11,
  DataPreprocessingFailure: 12,
  MipmapUnsupported: 13,
  UnsupportedOrientation: 14,
  ReorientationFailure: 15,
  AlphaPremultiplicationFailure: 16,
  InvalidEAGLContext: 17,
  IncompatibleFormatSRGB: 18,
  UnsupportedTextureTarget: 19,
};

declare const GLKFogMode: {
  Exp: 0,
  Exp2: 1,
  Linear: 2,
};

declare const GLKTextureTarget: {
  Target2D: 3553,
  TargetCubeMap: 34067,
  TargetCt: 2,
};

declare const GLKVertexAttrib: {
  Position: 0,
  Normal: 1,
  Color: 2,
  TexCoord0: 3,
  TexCoord1: 4,
};

declare const GLKTextureInfoOrigin: {
  Unknown: 0,
  TopLeft: 1,
  BottomLeft: 2,
};

declare const GLKTextureEnvMode: {
  Replace: 0,
  Modulate: 1,
  Decal: 2,
};

declare const GLKTextureInfoAlphaState: {
  None: 0,
  NonPremultiplied: 1,
  Premultiplied: 2,
};

declare const GLKLightingType: {
  Vertex: 0,
  Pixel: 1,
};

declare class GLKEffectPropertyPrv {
  constructor(init?: GLKEffectPropertyPrv);
}

declare class _GLKMatrixStack {
  constructor(init?: _GLKMatrixStack);
}

declare class unnamed_4340118264692572716 {
  constructor(init?: unnamed_4340118264692572716);
  v: _GLKVector3;
  s: number;
}

declare class unnamed_7441134392189584296 {
  constructor(init?: unnamed_7441134392189584296);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_6098001155817091449 {
  constructor(init?: unnamed_6098001155817091449);
  r: number;
  g: number;
  b: number;
  a: number;
}

declare class unnamed_5814871875344781407 {
  constructor(init?: unnamed_5814871875344781407);
  s: number;
  t: number;
  p: number;
}

declare class unnamed_11182655840045691336 {
  constructor(init?: unnamed_11182655840045691336);
  r: number;
  g: number;
  b: number;
}

declare class unnamed_12336166838884148760 {
  constructor(init?: unnamed_12336166838884148760);
  x: number;
  y: number;
  z: number;
}

declare class unnamed_10694942570132747244 {
  constructor(init?: unnamed_10694942570132747244);
  s: number;
  t: number;
}

declare class unnamed_9219172248061252020 {
  constructor(init?: unnamed_9219172248061252020);
  x: number;
  y: number;
}

declare class unnamed_3434959736976462309 {
  constructor(init?: unnamed_3434959736976462309);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_11135210489574831852 {
  constructor(init?: unnamed_11135210489574831852);
  m00: number;
  m01: number;
  m02: number;
  m10: number;
  m11: number;
  m12: number;
  m20: number;
  m21: number;
  m22: number;
}

declare class unnamed_1451960628348023403 {
  constructor(init?: unnamed_1451960628348023403);
  m00: number;
  m01: number;
  m02: number;
  m03: number;
  m10: number;
  m11: number;
  m12: number;
  m13: number;
  m20: number;
  m21: number;
  m22: number;
  m23: number;
  m30: number;
  m31: number;
  m32: number;
  m33: number;
}

declare class _GLKVertexAttributeParameters {
  constructor(init?: _GLKVertexAttributeParameters);
  type: number;
  size: number;
  normalized: number;
}

declare class unnamed_7827863014682369709 {
  constructor(init?: unnamed_7827863014682369709);
  m00: number;
  m01: number;
  m10: number;
  m11: number;
}

declare class unnamed_10207789714901716420 {
  constructor(init?: unnamed_10207789714901716420);
  s: number;
  t: number;
  p: number;
  q: number;
}

type _GLKQuaternionDescriptor = 
  | { q: unknown /* const array */ };

declare class _GLKQuaternion {
  constructor(init?: _GLKQuaternionDescriptor);
  q: unknown /* const array */;
}

type _GLKVector2Descriptor = 
  | { v: unknown /* const array */ };

declare class _GLKVector2 {
  constructor(init?: _GLKVector2Descriptor);
  v: unknown /* const array */;
}

type _GLKMatrix4Descriptor = 
  | { m: unknown /* const array */ };

declare class _GLKMatrix4 {
  constructor(init?: _GLKMatrix4Descriptor);
  m: unknown /* const array */;
}

type _GLKVector4Descriptor = 
  | { v: unknown /* const array */ };

declare class _GLKVector4 {
  constructor(init?: _GLKVector4Descriptor);
  v: unknown /* const array */;
}

type _GLKMatrix2Descriptor = 
  | { m2: unknown /* const array */ }
  | { m: unknown /* const array */ };

declare class _GLKMatrix2 {
  constructor(init?: _GLKMatrix2Descriptor);
  m2: unknown /* const array */;
  m: unknown /* const array */;
}

type _GLKVector3Descriptor = 
  | { v: unknown /* const array */ };

declare class _GLKVector3 {
  constructor(init?: _GLKVector3Descriptor);
  v: unknown /* const array */;
}

type _GLKMatrix3Descriptor = 
  | { m: unknown /* const array */ };

declare class _GLKMatrix3 {
  constructor(init?: _GLKMatrix3Descriptor);
  m: unknown /* const array */;
}

declare function GLKQuaternionMakeWithMatrix3(matrix: _GLKMatrix3): _GLKQuaternion;

declare function GLKQuaternionMakeWithMatrix4(matrix: _GLKMatrix4): _GLKQuaternion;

declare function GLKQuaternionAngle(quaternion: _GLKQuaternion): number;

declare function GLKQuaternionAxis(quaternion: _GLKQuaternion): _GLKVector3;

declare function GLKQuaternionSlerp(quaternionStart: _GLKQuaternion, quaternionEnd: _GLKQuaternion, t: number): _GLKQuaternion;

declare function GLKQuaternionRotateVector3Array(quaternion: _GLKQuaternion, vectors: interop.PointerConvertible, vectorCount: number): void;

declare function GLKQuaternionRotateVector4Array(quaternion: _GLKQuaternion, vectors: interop.PointerConvertible, vectorCount: number): void;

declare function GLKMatrix3Invert(matrix: _GLKMatrix3, isInvertible: interop.PointerConvertible): _GLKMatrix3;

declare function GLKMatrix3InvertAndTranspose(matrix: _GLKMatrix3, isInvertible: interop.PointerConvertible): _GLKMatrix3;

declare function GLKMatrix4Invert(matrix: _GLKMatrix4, isInvertible: interop.PointerConvertible): _GLKMatrix4;

declare function GLKMatrix4InvertAndTranspose(matrix: _GLKMatrix4, isInvertible: interop.PointerConvertible): _GLKMatrix4;

declare function GLKMatrixStackCreate(alloc: interop.Object): interop.Object;

declare function GLKMatrixStackGetTypeID(): number;

declare function GLKMatrixStackPush(stack: interop.Object): void;

declare function GLKMatrixStackPop(stack: interop.Object): void;

declare function GLKMatrixStackSize(stack: interop.Object): number;

declare function GLKMatrixStackLoadMatrix4(stack: interop.Object, matrix: _GLKMatrix4): void;

declare function GLKMatrixStackGetMatrix4(stack: interop.Object): _GLKMatrix4;

declare function GLKMatrixStackGetMatrix3(stack: interop.Object): _GLKMatrix3;

declare function GLKMatrixStackGetMatrix2(stack: interop.Object): _GLKMatrix2;

declare function GLKMatrixStackGetMatrix4Inverse(stack: interop.Object): _GLKMatrix4;

declare function GLKMatrixStackGetMatrix4InverseTranspose(stack: interop.Object): _GLKMatrix4;

declare function GLKMatrixStackGetMatrix3Inverse(stack: interop.Object): _GLKMatrix3;

declare function GLKMatrixStackGetMatrix3InverseTranspose(stack: interop.Object): _GLKMatrix3;

declare function GLKMatrixStackMultiplyMatrix4(stack: interop.Object, matrix: _GLKMatrix4): void;

declare function GLKMatrixStackMultiplyMatrixStack(stackLeft: interop.Object, stackRight: interop.Object): void;

declare function GLKMatrixStackTranslate(stack: interop.Object, tx: number, ty: number, tz: number): void;

declare function GLKMatrixStackTranslateWithVector3(stack: interop.Object, translationVector: _GLKVector3): void;

declare function GLKMatrixStackTranslateWithVector4(stack: interop.Object, translationVector: _GLKVector4): void;

declare function GLKMatrixStackScale(stack: interop.Object, sx: number, sy: number, sz: number): void;

declare function GLKMatrixStackScaleWithVector3(stack: interop.Object, scaleVector: _GLKVector3): void;

declare function GLKMatrixStackScaleWithVector4(stack: interop.Object, scaleVector: _GLKVector4): void;

declare function GLKMatrixStackRotate(stack: interop.Object, radians: number, x: number, y: number, z: number): void;

declare function GLKMatrixStackRotateWithVector3(stack: interop.Object, radians: number, axisVector: _GLKVector3): void;

declare function GLKMatrixStackRotateWithVector4(stack: interop.Object, radians: number, axisVector: _GLKVector4): void;

declare function GLKMatrixStackRotateX(stack: interop.Object, radians: number): void;

declare function GLKMatrixStackRotateY(stack: interop.Object, radians: number): void;

declare function GLKMatrixStackRotateZ(stack: interop.Object, radians: number): void;

declare function GLKMathProject(object: _GLKVector3, model: _GLKMatrix4, projection: _GLKMatrix4, viewport: interop.PointerConvertible): _GLKVector3;

declare function GLKMathUnproject(window: _GLKVector3, model: _GLKMatrix4, projection: _GLKMatrix4, viewport: interop.PointerConvertible, success: interop.PointerConvertible): _GLKVector3;

declare function NSStringFromGLKMatrix2(matrix: _GLKMatrix2): string;

declare function NSStringFromGLKMatrix3(matrix: _GLKMatrix3): string;

declare function NSStringFromGLKMatrix4(matrix: _GLKMatrix4): string;

declare function NSStringFromGLKVector2(vector: _GLKVector2): string;

declare function NSStringFromGLKVector3(vector: _GLKVector3): string;

declare function NSStringFromGLKVector4(vector: _GLKVector4): string;

declare function NSStringFromGLKQuaternion(quaternion: _GLKQuaternion): string;

declare function GLKVertexAttributeParametersFromModelIO(vertexFormat: interop.Enum<typeof MDLVertexFormat>): _GLKVertexAttributeParameters;

declare interface GLKNamedEffect {
  prepareToDraw(): void;
}

declare class GLKNamedEffect extends NativeObject implements GLKNamedEffect {
}

declare class GLKTextureLoader extends NSObject {
  static textureWithContentsOfFileOptionsError(path: string, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, outError: interop.PointerConvertible): GLKTextureInfo;

  static textureWithContentsOfURLOptionsError(url: NSURL, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, outError: interop.PointerConvertible): GLKTextureInfo;

  static textureWithNameScaleFactorBundleOptionsError(name: string, scaleFactor: number, bundle: NSBundle | null, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, outError: interop.PointerConvertible): GLKTextureInfo;

  static textureWithContentsOfDataOptionsError(data: NSData, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, outError: interop.PointerConvertible): GLKTextureInfo;

  static textureWithCGImageOptionsError(cgImage: interop.Object, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, outError: interop.PointerConvertible): GLKTextureInfo;

  static cubeMapWithContentsOfFilesOptionsError(paths: NSArray<interop.Object> | Array<interop.Object>, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, outError: interop.PointerConvertible): GLKTextureInfo;

  static cubeMapWithContentsOfFileOptionsError(path: string, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, outError: interop.PointerConvertible): GLKTextureInfo;

  static cubeMapWithContentsOfURLOptionsError(url: NSURL, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, outError: interop.PointerConvertible): GLKTextureInfo;

  initWithShareContext(context: NSOpenGLContext): this;

  textureWithContentsOfFileOptionsQueueCompletionHandler(path: string, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, queue: NSObject | null, block: (p1: GLKTextureInfo, p2: NSError) => void): void;

  textureWithContentsOfURLOptionsQueueCompletionHandler(url: NSURL, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, queue: NSObject | null, block: (p1: GLKTextureInfo, p2: NSError) => void): void;

  textureWithNameScaleFactorBundleOptionsQueueCompletionHandler(name: string, scaleFactor: number, bundle: NSBundle | null, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, queue: NSObject | null, block: (p1: GLKTextureInfo, p2: NSError) => void): void;

  textureWithContentsOfDataOptionsQueueCompletionHandler(data: NSData, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, queue: NSObject | null, block: (p1: GLKTextureInfo, p2: NSError) => void): void;

  textureWithCGImageOptionsQueueCompletionHandler(cgImage: interop.Object, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, queue: NSObject | null, block: (p1: GLKTextureInfo, p2: NSError) => void): void;

  cubeMapWithContentsOfFilesOptionsQueueCompletionHandler(paths: NSArray<interop.Object> | Array<interop.Object>, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, queue: NSObject | null, block: (p1: GLKTextureInfo, p2: NSError) => void): void;

  cubeMapWithContentsOfFileOptionsQueueCompletionHandler(path: string, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, queue: NSObject | null, block: (p1: GLKTextureInfo, p2: NSError) => void): void;

  cubeMapWithContentsOfURLOptionsQueueCompletionHandler(url: NSURL, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, queue: NSObject | null, block: (p1: GLKTextureInfo, p2: NSError) => void): void;
}

declare class GLKEffectPropertyFog extends GLKEffectProperty {
  enabled: number;

  mode: number;

  color: _GLKVector4;

  density: number;

  start: number;

  end: number;

  setEnabled(enabled: number): void;

  setMode(mode: number): void;

  setColor(color: _GLKVector4): void;

  setDensity(density: number): void;

  setStart(start: number): void;

  setEnd(end: number): void;
}

declare class GLKEffectPropertyMaterial extends GLKEffectProperty {
  ambientColor: _GLKVector4;

  diffuseColor: _GLKVector4;

  specularColor: _GLKVector4;

  emissiveColor: _GLKVector4;

  shininess: number;

  setAmbientColor(ambientColor: _GLKVector4): void;

  setDiffuseColor(diffuseColor: _GLKVector4): void;

  setSpecularColor(specularColor: _GLKVector4): void;

  setEmissiveColor(emissiveColor: _GLKVector4): void;

  setShininess(shininess: number): void;
}

declare class GLKEffectPropertyTransform extends GLKEffectProperty {
  modelviewMatrix: _GLKMatrix4;

  projectionMatrix: _GLKMatrix4;

  readonly normalMatrix: _GLKMatrix3;

  setModelviewMatrix(modelviewMatrix: _GLKMatrix4): void;

  setProjectionMatrix(projectionMatrix: _GLKMatrix4): void;
}

declare class GLKSubmesh extends NSObject {
  readonly type: number;

  readonly mode: number;

  readonly elementCount: number;

  readonly elementBuffer: GLKMeshBuffer;

  readonly mesh: GLKMesh;

  readonly name: string;
}

// @ts-ignore ClassDecl.tsIgnore
declare class GLKMeshBuffer extends NSObject implements MDLMeshBuffer {
  readonly length: number;

  readonly allocator: GLKMeshBufferAllocator;

  readonly glBufferName: number;

  readonly offset: number;

  // @ts-ignore MemberDecl.tsIgnore
  readonly zone: MDLMeshBufferZone;

  readonly type: interop.Enum<typeof MDLMeshBufferType>;

  fillDataOffset(data: NSData, offset: number): void;

  map(): MDLMeshBufferMap;

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

  readonly description: string;

  readonly debugDescription: string;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class GLKBaseEffect extends NSObject implements GLKNamedEffect {
  prepareToDraw(): void;

  colorMaterialEnabled: number;

  lightModelTwoSided: number;

  useConstantColor: number;

  readonly transform: GLKEffectPropertyTransform;

  readonly light0: GLKEffectPropertyLight;

  readonly light1: GLKEffectPropertyLight;

  readonly light2: GLKEffectPropertyLight;

  lightingType: interop.Enum<typeof GLKLightingType>;

  lightModelAmbientColor: _GLKVector4;

  readonly material: GLKEffectPropertyMaterial;

  readonly texture2d0: GLKEffectPropertyTexture;

  readonly texture2d1: GLKEffectPropertyTexture;

  get textureOrder(): NSArray;
  set textureOrder(value: NSArray<interop.Object> | Array<interop.Object>);

  constantColor: _GLKVector4;

  readonly fog: GLKEffectPropertyFog;

  label: string;

  setColorMaterialEnabled(colorMaterialEnabled: number): void;

  setLightModelTwoSided(lightModelTwoSided: number): void;

  setUseConstantColor(useConstantColor: number): void;

  setLightingType(lightingType: interop.Enum<typeof GLKLightingType>): void;

  setLightModelAmbientColor(lightModelAmbientColor: _GLKVector4): void;

  setTextureOrder(textureOrder: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setConstantColor(constantColor: _GLKVector4): void;

  setLabel(label: string | null): void;
}

declare class GLKEffectProperty extends NSObject {
}

declare class GLKEffectPropertyTexture extends GLKEffectProperty {
  enabled: number;

  name: number;

  target: interop.Enum<typeof GLKTextureTarget>;

  envMode: interop.Enum<typeof GLKTextureEnvMode>;

  setEnabled(enabled: number): void;

  setName(name: number): void;

  setTarget(target: interop.Enum<typeof GLKTextureTarget>): void;

  setEnvMode(envMode: interop.Enum<typeof GLKTextureEnvMode>): void;
}

declare class GLKMesh extends NSObject {
  initWithMeshError(mesh: MDLMesh, error: interop.PointerConvertible): this;

  static newMeshesFromAssetSourceMeshesError(asset: MDLAsset, sourceMeshes: interop.PointerConvertible, error: interop.PointerConvertible): NSArray;

  readonly vertexCount: number;

  readonly vertexBuffers: NSArray;

  readonly vertexDescriptor: MDLVertexDescriptor;

  readonly submeshes: NSArray;

  readonly name: string;
}

declare class GLKEffectPropertyLight extends GLKEffectProperty {
  enabled: number;

  position: _GLKVector4;

  ambientColor: _GLKVector4;

  diffuseColor: _GLKVector4;

  specularColor: _GLKVector4;

  spotDirection: _GLKVector3;

  spotExponent: number;

  spotCutoff: number;

  constantAttenuation: number;

  linearAttenuation: number;

  quadraticAttenuation: number;

  transform: GLKEffectPropertyTransform;

  setEnabled(enabled: number): void;

  setPosition(position: _GLKVector4): void;

  setAmbientColor(ambientColor: _GLKVector4): void;

  setDiffuseColor(diffuseColor: _GLKVector4): void;

  setSpecularColor(specularColor: _GLKVector4): void;

  setSpotDirection(spotDirection: _GLKVector3): void;

  setSpotExponent(spotExponent: number): void;

  setSpotCutoff(spotCutoff: number): void;

  setConstantAttenuation(constantAttenuation: number): void;

  setLinearAttenuation(linearAttenuation: number): void;

  setQuadraticAttenuation(quadraticAttenuation: number): void;

  setTransform(transform: GLKEffectPropertyTransform): void;
}

declare class GLKMeshBufferAllocator extends NSObject implements MDLMeshBufferAllocator {
  newZone(capacity: number): MDLMeshBufferZone;

  newZoneForBuffersWithSizeAndType(sizes: NSArray<interop.Object> | Array<interop.Object>, types: NSArray<interop.Object> | Array<interop.Object>): MDLMeshBufferZone;

  newBufferType(length: number, type: interop.Enum<typeof MDLMeshBufferType>): MDLMeshBuffer;

  newBufferWithDataType(data: NSData, type: interop.Enum<typeof MDLMeshBufferType>): MDLMeshBuffer;

  newBufferFromZoneLengthType(zone: MDLMeshBufferZone | null, length: number, type: interop.Enum<typeof MDLMeshBufferType>): MDLMeshBuffer;

  newBufferFromZoneDataType(zone: MDLMeshBufferZone | null, data: NSData, type: interop.Enum<typeof MDLMeshBufferType>): MDLMeshBuffer;

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

declare class GLKTextureInfo extends NSObject implements NSCopying {
  readonly name: number;

  readonly target: number;

  readonly width: number;

  readonly height: number;

  readonly depth: number;

  readonly alphaState: interop.Enum<typeof GLKTextureInfoAlphaState>;

  readonly textureOrigin: interop.Enum<typeof GLKTextureInfoOrigin>;

  readonly containsMipmaps: boolean;

  readonly mimapLevelCount: number;

  readonly arrayLength: number;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class GLKReflectionMapEffect extends GLKBaseEffect implements GLKNamedEffect {
  prepareToDraw(): void;

  readonly textureCubeMap: GLKEffectPropertyTexture;

  matrix: _GLKMatrix3;

  setMatrix(matrix: _GLKMatrix3): void;
}

declare class GLKSkyboxEffect extends NSObject implements GLKNamedEffect {
  prepareToDraw(): void;

  draw(): void;

  center: _GLKVector3;

  xSize: number;

  ySize: number;

  zSize: number;

  readonly textureCubeMap: GLKEffectPropertyTexture;

  readonly transform: GLKEffectPropertyTransform;

  label: string;

  setCenter(center: _GLKVector3): void;

  setXSize(xSize: number): void;

  setYSize(ySize: number): void;

  setZSize(zSize: number): void;

  setLabel(label: string | null): void;
}


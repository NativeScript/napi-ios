/// <reference types="@nativescript/objc-node-api" />

declare const SCNParticlePropertyContactPoint: string;

declare const SCNSceneSourceAnimationImportPolicyPlayRepeatedly: string;

declare const SCNHitTestRootNodeKey: string;

declare const SCNSceneSourceFlattenSceneKey: string;

declare const SCNParticlePropertySize: string;

declare const SCNConsistencyInvalidArgumentError: number;

declare const SCNSceneSourceAssetUnitMeterKey: string;

declare const SCNSceneSourceStrictConformanceKey: string;

declare const SCNSceneExportDestinationURL: string;

declare const SCNSceneFrameRateAttributeKey: string;

declare const SCNViewTransform: string;

declare const SCNConsistencyXMLSchemaValidationError: number;

declare const SCNParticlePropertyBounce: string;

declare const SCNPhysicsShapeTypeConcavePolyhedron: string;

declare const SCNLightTypeAmbient: string;

declare const SCNPhysicsTestBackfaceCullingKey: string;

declare const SCNSceneSourceAnimationImportPolicyDoNotPlay: string;

declare const SCNPhysicsTestSearchModeAll: string;

declare const SCNPhysicsShapeTypeConvexHull: string;

declare const SCNPhysicsShapeTypeBoundingBox: string;

declare const SCNParticlePropertyFriction: string;

declare const SCNParticlePropertyOpacity: string;

declare const SCNParticlePropertyVelocity: string;

declare const SCNParticlePropertyRotationAxis: string;

declare const SCNParticlePropertyAngle: string;

declare const SCNParticlePropertyPosition: string;

declare const SCNGeometrySourceSemanticBoneIndices: string;

declare const SCNGeometrySourceSemanticEdgeCrease: string;

declare const SCNGeometrySourceSemanticTexcoord: string;

declare const SCNLightingModelLambert: string;

declare const SCNLightingModelBlinn: string;

declare const SCNLightTypeOmni: string;

declare const SCNModelViewTransform: string;

declare const SCNNormalTransform: string;

declare const SCNConsistencyMissingAttributeError: number;

declare const SCNConsistencyMissingElementError: number;

declare const SCNConsistencyElementTypeErrorKey: string;

declare const SCNSceneSourceAnimationImportPolicyPlayUsingSceneTimeBase: string;

declare const SCNSceneSourceCheckConsistencyKey: string;

declare const SCNSceneSourceAssetAuthoringToolKey: string;

declare const SCNShaderModifierEntryPointGeometry: string;

declare const SCNProgramMappingChannelKey: string;

declare const SCNHitTestFirstFoundOnlyKey: string;

declare const SCNHitTestBoundingBoxOnlyKey: string;

declare const SCNMatrix4Identity: SCNMatrix4;

declare const SCNVector4Zero: SCNVector4;

declare const SCNParticlePropertyColor: string;

declare const SCNSceneSourceAssetAuthorKey: string;

declare const SCNGeometrySourceSemanticVertex: string;

declare const SCNSceneSourceAssetUnitNameKey: string;

declare const SCNErrorDomain: string;

declare const SCNConsistencyInvalidCountError: number;

declare const SCNShaderModifierEntryPointLightingModel: string;

declare const SCNSceneStartTimeAttributeKey: string;

declare const SCNConsistencyElementIDErrorKey: string;

declare const SCNConsistencyLineNumberErrorKey: string;

declare const SCNParticlePropertyFrame: string;

declare const SCNSceneSourceAssetModifiedDateKey: string;

declare const SCNDetailedErrorsKey: string;

declare const SCNSceneSourceAssetUnitKey: string;

declare const SCNSceneSourceAssetCreatedDateKey: string;

declare const SCNModelTransform: string;

declare const SCNPhysicsTestCollisionBitMaskKey: string;

declare const SCNPhysicsTestSearchModeKey: string;

declare const SCNProgramCompilationError: number;

declare const SCNHitTestIgnoreHiddenNodesKey: string;

declare const SCNParticlePropertyFrameRate: string;

declare const SCNPhysicsTestSearchModeAny: string;

declare const SCNSceneSourceOverrideAssetURLsKey: string;

declare const SCNGeometrySourceSemanticNormal: string;

declare const SCNHitTestBackFaceCullingKey: string;

declare const SCNPhysicsShapeScaleKey: string;

declare const SCNGeometrySourceSemanticBoneWeights: string;

declare const SCNSceneUpAxisAttributeKey: string;

declare const SCNParticlePropertyCharge: string;

declare const SCNPhysicsShapeKeepAsCompoundKey: string;

declare const SCNLightTypeDirectional: string;

declare const SCNSceneSourceAssetDirectoryURLsKey: string;

declare const SCNModelViewProjectionTransform: string;

declare const SCNParticlePropertyLife: string;

declare const SCNParticlePropertyContactNormal: string;

declare const SCNConsistencyInvalidURIError: number;

declare const SCNGeometrySourceSemanticColor: string;

declare const SCNHitTestIgnoreChildNodesKey: string;

declare const SCNSceneSourceAnimationImportPolicyKey: string;

declare const SCNHitTestClipToZRangeKey: string;

declare const SCNParticlePropertyAngularVelocity: string;

declare const SCNProjectionTransform: string;

declare const SCNHitTestSortResultsKey: string;

declare const SCNGeometrySourceSemanticVertexCrease: string;

declare const SCNSceneEndTimeAttributeKey: string;

declare const SCNVector3Zero: SCNVector3;

declare const SCNSceneSourceAnimationImportPolicyPlay: string;

declare const SCNLightTypeSpot: string;

declare const SCNLightingModelPhong: string;

declare const SCNSceneSourceAssetContributorsKey: string;

declare const SCNSceneSourceCreateNormalsIfAbsentKey: string;

declare const SCNShaderModifierEntryPointSurface: string;

declare const SCNLightingModelConstant: string;

declare const SCNShaderModifierEntryPointFragment: string;

declare const SCNPhysicsTestSearchModeClosest: string;

declare const SCNSceneSourceAssetUpAxisKey: string;

declare const SCNPhysicsShapeTypeKey: string;

declare const SCNGeometryPrimitiveType: {
  Triangles: 0,
  TriangleStrip: 1,
  Line: 2,
  Point: 3,
};

declare const SCNParticleImageSequenceAnimationMode: {
  Repeat: 0,
  Clamp: 1,
  AutoReverse: 2,
};

declare const SCNTransparencyMode: {
  AOne: 0,
  RGBZero: 1,
};

declare const SCNPhysicsCollisionCategory: {
  Default: 1,
  Static: 2,
  All: -1,
};

declare const SCNPhysicsBodyType: {
  Static: 0,
  Dynamic: 1,
  Kinematic: 2,
};

declare const SCNParticleEvent: {
  Birth: 0,
  Death: 1,
  Collision: 2,
};

declare const SCNParticleBirthDirection: {
  Constant: 0,
  SurfaceNormal: 1,
  Random: 2,
};

declare const SCNParticleOrientationMode: {
  BillboardScreenAligned: 0,
  BillboardViewAligned: 1,
  Free: 2,
  BillboardYAligned: 3,
};

declare const SCNCullMode: {
  Back: 0,
  Front: 1,
};

declare const SCNShadowMode: {
  Forward: 0,
  Deferred: 1,
  Modulated: 2,
};

declare const SCNFilterMode: {
  None: 0,
  Nearest: 1,
  Linear: 2,
};

declare const SCNAntialiasingMode: {
  None: 0,
  Multisampling2X: 1,
  Multisampling4X: 2,
};

declare const SCNParticleInputMode: {
  Life: 0,
  Distance: 1,
  OtherProperty: 2,
};

declare const SCNBillboardAxis: {
  X: 1,
  Y: 2,
  Z: 4,
  All: 7,
};

declare const SCNWrapMode: {
  Clamp: 1,
  Repeat: 2,
  ClampToBorder: 3,
  Mirror: 4,
};

declare const SCNPhysicsFieldScope: {
  Inside: 0,
  Outside: 1,
};

declare const SCNParticleBirthLocation: {
  Surface: 0,
  Volume: 1,
  Vertex: 2,
};

declare const SCNParticleBlendMode: {
  Additive: 0,
  Subtract: 1,
  Multiply: 2,
  Screen: 3,
  Alpha: 4,
  Replace: 5,
};

declare const SCNParticleSortingMode: {
  None: 0,
  ProjectedDepth: 1,
  Distance: 2,
  OldestFirst: 3,
  YoungestFirst: 4,
};

declare const SCNParticleModifierStage: {
  PreDynamics: 0,
  PostDynamics: 1,
  PreCollision: 2,
  PostCollision: 3,
};

declare const SCNSceneSourceStatus: {
  Error: -1,
  Parsing: 4,
  Validating: 8,
  Processing: 12,
  Complete: 16,
};

declare const SCNChamferMode: {
  Both: 0,
  Front: 1,
  Back: 2,
};

declare const SCNMorpherCalculationMode: {
  Normalized: 0,
  Additive: 1,
};

declare class SCNMatrix4 {
  constructor(init?: SCNMatrix4);
  m11: number;
  m12: number;
  m13: number;
  m14: number;
  m21: number;
  m22: number;
  m23: number;
  m24: number;
  m31: number;
  m32: number;
  m33: number;
  m34: number;
  m41: number;
  m42: number;
  m43: number;
  m44: number;
}

declare class SCNVector3 {
  constructor(init?: SCNVector3);
  x: number;
  y: number;
  z: number;
}

declare class SCNVector4 {
  constructor(init?: SCNVector4);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare function SCNVector3EqualToVector3(a: SCNVector3, b: SCNVector3): boolean;

declare function SCNVector4EqualToVector4(a: SCNVector4, b: SCNVector4): boolean;

declare function SCNMatrix4IsIdentity(m: SCNMatrix4): boolean;

declare function SCNMatrix4EqualToMatrix4(a: SCNMatrix4, b: SCNMatrix4): boolean;

declare function SCNMatrix4MakeRotation(angle: number, x: number, y: number, z: number): SCNMatrix4;

declare function SCNMatrix4Scale(m: SCNMatrix4, sx: number, sy: number, sz: number): SCNMatrix4;

declare function SCNMatrix4Rotate(m: SCNMatrix4, angle: number, x: number, y: number, z: number): SCNMatrix4;

declare function SCNMatrix4Invert(m: SCNMatrix4): SCNMatrix4;

declare function SCNMatrix4Mult(a: SCNMatrix4, b: SCNMatrix4): SCNMatrix4;

declare function SCNExportJavaScriptModule(context: interop.Object): void;

declare interface SCNPhysicsContactDelegate extends NSObject {
  physicsWorldDidBeginContact?(world: SCNPhysicsWorld, contact: SCNPhysicsContact): void;

  physicsWorldDidUpdateContact?(world: SCNPhysicsWorld, contact: SCNPhysicsContact): void;

  physicsWorldDidEndContact?(world: SCNPhysicsWorld, contact: SCNPhysicsContact): void;
}

declare class SCNPhysicsContactDelegate extends NativeObject implements SCNPhysicsContactDelegate {
}

declare interface SCNNodeRendererDelegate extends NSObject {
  renderNodeRendererArguments?(node: SCNNode, renderer: SCNRenderer, arguments$: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;
}

declare class SCNNodeRendererDelegate extends NativeObject implements SCNNodeRendererDelegate {
}

declare interface SCNActionable extends NSObject {
  runAction(action: SCNAction): void;

  runActionCompletionHandler(action: SCNAction, block: () => void | null): void;

  runActionForKey(action: SCNAction, key: string | null): void;

  runActionForKeyCompletionHandler(action: SCNAction, key: string | null, block: () => void | null): void;

  readonly hasActions: boolean;

  actionForKey(key: string): SCNAction;

  removeActionForKey(key: string): void;

  removeAllActions(): void;

  readonly actionKeys: NSArray;
}

declare class SCNActionable extends NativeObject implements SCNActionable {
}

declare interface SCNTechniqueSupport extends NSObject {
  technique: SCNTechnique;
}

declare class SCNTechniqueSupport extends NativeObject implements SCNTechniqueSupport {
}

declare interface SCNShadable extends NSObject {
  program?: SCNProgram;

  handleBindingOfSymbolUsingBlock?(symbol: string, block: (p1: number, p2: number, p3: SCNNode, p4: SCNRenderer) => void | null): void;

  handleUnbindingOfSymbolUsingBlock?(symbol: string, block: (p1: number, p2: number, p3: SCNNode, p4: SCNRenderer) => void | null): void;

  get shaderModifiers(): NSDictionary | undefined;
  set shaderModifiers(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | undefined);
}

declare class SCNShadable extends NativeObject implements SCNShadable {
}

declare interface SCNSceneRendererDelegate extends NSObject {
  rendererUpdateAtTime?(renderer: SCNSceneRenderer, time: number): void;

  rendererDidApplyAnimationsAtTime?(renderer: SCNSceneRenderer, time: number): void;

  rendererDidSimulatePhysicsAtTime?(renderer: SCNSceneRenderer, time: number): void;

  rendererWillRenderSceneAtTime?(renderer: SCNSceneRenderer, scene: SCNScene, time: number): void;

  rendererDidRenderSceneAtTime?(renderer: SCNSceneRenderer, scene: SCNScene, time: number): void;
}

declare class SCNSceneRendererDelegate extends NativeObject implements SCNSceneRendererDelegate {
}

declare interface SCNSceneRenderer extends NSObject {
  scene: SCNScene;

  sceneTime: number;

  delegate: SCNSceneRendererDelegate;

  hitTestOptions(point: CGPoint, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): NSArray;

  isNodeInsideFrustumWithPointOfView(node: SCNNode, pointOfView: SCNNode): boolean;

  projectPoint(point: SCNVector3): SCNVector3;

  unprojectPoint(point: SCNVector3): SCNVector3;

  isPlaying: boolean;

  loops: boolean;

  pointOfView: SCNNode;

  autoenablesDefaultLighting: boolean;

  isJitteringEnabled: boolean;

  prepareObjectShouldAbortBlock(object: interop.Object, block: () => boolean | null): boolean;

  prepareObjectsWithCompletionHandler(objects: NSArray<interop.Object> | Array<interop.Object>, completionHandler: (p1: boolean) => void | null): void;

  showsStatistics: boolean;

  overlaySKScene: SKScene;
}

declare class SCNSceneRenderer extends NativeObject implements SCNSceneRenderer {
}

declare interface SCNBufferStream extends NSObject {
  writeBytesLength(bytes: interop.PointerConvertible, length: number): void;
}

declare class SCNBufferStream extends NativeObject implements SCNBufferStream {
}

declare interface SCNBoundingVolume extends NSObject {
  getBoundingBoxMinMax(min: interop.PointerConvertible, max: interop.PointerConvertible): boolean;

  setBoundingBoxMinMax(min: interop.PointerConvertible, max: interop.PointerConvertible): void;

  getBoundingSphereCenterRadius(center: interop.PointerConvertible, radius: interop.PointerConvertible): boolean;
}

declare class SCNBoundingVolume extends NativeObject implements SCNBoundingVolume {
}

declare interface SCNAnimation extends NSObject {
}

declare class SCNAnimation extends NativeObject implements SCNAnimation {
}

declare interface SCNProgramDelegate extends NSObject {
  programHandleError?(program: SCNProgram, error: NSError): void;
}

declare class SCNProgramDelegate extends NativeObject implements SCNProgramDelegate {
}

declare interface SCNAnimatable extends NSObject {
  addAnimationForKey(animation: SCNAnimation, key: string | null): void;

  removeAllAnimations(): void;

  removeAnimationForKey(key: string): void;

  readonly animationKeys: NSArray;
}

declare class SCNAnimatable extends NativeObject implements SCNAnimatable {
}

declare class SCNPhysicsSliderJoint extends SCNPhysicsBehavior {
  static jointWithBodyAAxisAAnchorABodyBAxisBAnchorB<This extends abstract new (...args: any) => any>(this: This, bodyA: SCNPhysicsBody, axisA: SCNVector3, anchorA: SCNVector3, bodyB: SCNPhysicsBody, axisB: SCNVector3, anchorB: SCNVector3): InstanceType<This>;

  static jointWithBodyAxisAnchor<This extends abstract new (...args: any) => any>(this: This, body: SCNPhysicsBody, axis: SCNVector3, anchor: SCNVector3): InstanceType<This>;

  readonly bodyA: SCNPhysicsBody;

  axisA: SCNVector3;

  anchorA: SCNVector3;

  readonly bodyB: SCNPhysicsBody;

  axisB: SCNVector3;

  anchorB: SCNVector3;

  minimumLinearLimit: number;

  maximumLinearLimit: number;

  minimumAngularLimit: number;

  maximumAngularLimit: number;

  motorTargetLinearVelocity: number;

  motorMaximumForce: number;

  motorTargetAngularVelocity: number;

  motorMaximumTorque: number;
}

declare class SCNPhysicsBehavior extends NSObject implements NSSecureCoding {
  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SCNSkinner extends NSObject implements NSSecureCoding {
  skeleton: SCNNode;

  static skinnerWithBaseGeometryBonesBoneInverseBindTransformsBoneWeightsBoneIndices<This extends abstract new (...args: any) => any>(this: This, baseGeometry: SCNGeometry | null, bones: NSArray<interop.Object> | Array<interop.Object>, boneInverseBindTransforms: NSArray<interop.Object> | Array<interop.Object> | null, boneWeights: SCNGeometrySource, boneIndices: SCNGeometrySource): InstanceType<This>;

  baseGeometry: SCNGeometry;

  baseGeometryBindTransform: SCNMatrix4;

  readonly boneInverseBindTransforms: NSArray;

  readonly bones: NSArray;

  readonly boneWeights: SCNGeometrySource;

  readonly boneIndices: SCNGeometrySource;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SCNPhysicsContact extends NSObject {
  readonly nodeA: SCNNode;

  readonly nodeB: SCNNode;

  readonly contactPoint: SCNVector3;

  readonly contactNormal: SCNVector3;

  readonly collisionImpulse: number;

  readonly penetrationDistance: number;
}

declare class SCNPhysicsBody extends NSObject implements NSCopying, NSSecureCoding {
  static staticBody<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  static dynamicBody<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  static kinematicBody<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  static bodyWithTypeShape<This extends abstract new (...args: any) => any>(this: This, type: interop.Enum<typeof SCNPhysicsBodyType>, shape: SCNPhysicsShape | null): InstanceType<This>;

  type: interop.Enum<typeof SCNPhysicsBodyType>;

  mass: number;

  charge: number;

  friction: number;

  restitution: number;

  rollingFriction: number;

  physicsShape: SCNPhysicsShape;

  readonly isResting: boolean;

  allowsResting: boolean;

  velocity: SCNVector3;

  angularVelocity: SCNVector4;

  damping: number;

  angularDamping: number;

  velocityFactor: SCNVector3;

  angularVelocityFactor: SCNVector3;

  categoryBitMask: number;

  collisionBitMask: number;

  applyForceImpulse(direction: SCNVector3, impulse: boolean): void;

  applyForceAtPositionImpulse(direction: SCNVector3, position: SCNVector3, impulse: boolean): void;

  applyTorqueImpulse(torque: SCNVector4, impulse: boolean): void;

  clearAllForces(): void;

  resetTransform(): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SCNFloor extends SCNGeometry {
  static floor<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  reflectivity: number;

  reflectionFalloffStart: number;

  reflectionFalloffEnd: number;

  reflectionResolutionScaleFactor: number;
}

declare class SCNParticlePropertyController extends NSObject implements NSSecureCoding, NSCopying {
  static controllerWithAnimation<This extends abstract new (...args: any) => any>(this: This, animation: interop.Object): InstanceType<This>;

  animation: interop.Object;

  inputMode: interop.Enum<typeof SCNParticleInputMode>;

  inputScale: number;

  inputBias: number;

  inputOrigin: SCNNode;

  inputProperty: string;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class SCNLookAtConstraint extends SCNConstraint {
  static lookAtConstraintWithTarget<This extends abstract new (...args: any) => any>(this: This, target: SCNNode | null): InstanceType<This>;

  target: SCNNode;

  gimbalLockEnabled: boolean;
}

declare class SCNMorpher extends NSObject implements SCNAnimatable, NSSecureCoding {
  get targets(): NSArray;
  set targets(value: NSArray<interop.Object> | Array<interop.Object>);

  setWeightForTargetAtIndex(weight: number, targetIndex: number): void;

  weightForTargetAtIndex(targetIndex: number): number;

  calculationMode: interop.Enum<typeof SCNMorpherCalculationMode>;

  addAnimationForKey(animation: SCNAnimation, key: string | null): void;

  removeAllAnimations(): void;

  removeAnimationForKey(key: string): void;

  readonly animationKeys: NSArray;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  isProxy(): boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  zone(): interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SCNParticleSystem extends NSObject implements NSCopying, NSSecureCoding, SCNAnimatable {
  static particleSystem<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  static particleSystemNamedInDirectory<This extends abstract new (...args: any) => any>(this: This, name: string, directory: string | null): InstanceType<This>;

  emissionDuration: number;

  emissionDurationVariation: number;

  idleDuration: number;

  idleDurationVariation: number;

  loops: boolean;

  birthRate: number;

  birthRateVariation: number;

  warmupDuration: number;

  emitterShape: SCNGeometry;

  birthLocation: interop.Enum<typeof SCNParticleBirthLocation>;

  birthDirection: interop.Enum<typeof SCNParticleBirthDirection>;

  spreadingAngle: number;

  emittingDirection: SCNVector3;

  acceleration: SCNVector3;

  isLocal: boolean;

  particleAngle: number;

  particleAngleVariation: number;

  particleVelocity: number;

  particleVelocityVariation: number;

  particleAngularVelocity: number;

  particleAngularVelocityVariation: number;

  particleLifeSpan: number;

  particleLifeSpanVariation: number;

  systemSpawnedOnDying: SCNParticleSystem;

  systemSpawnedOnCollision: SCNParticleSystem;

  systemSpawnedOnLiving: SCNParticleSystem;

  particleImage: interop.Object;

  imageSequenceColumnCount: number;

  imageSequenceRowCount: number;

  imageSequenceInitialFrame: number;

  imageSequenceInitialFrameVariation: number;

  imageSequenceFrameRate: number;

  imageSequenceFrameRateVariation: number;

  imageSequenceAnimationMode: interop.Enum<typeof SCNParticleImageSequenceAnimationMode>;

  particleColor: interop.Object;

  particleColorVariation: SCNVector4;

  particleSize: number;

  particleSizeVariation: number;

  blendMode: interop.Enum<typeof SCNParticleBlendMode>;

  isBlackPassEnabled: boolean;

  orientationMode: interop.Enum<typeof SCNParticleOrientationMode>;

  sortingMode: interop.Enum<typeof SCNParticleSortingMode>;

  isLightingEnabled: boolean;

  affectedByGravity: boolean;

  affectedByPhysicsFields: boolean;

  particleDiesOnCollision: boolean;

  get colliderNodes(): NSArray;
  set colliderNodes(value: NSArray<interop.Object> | Array<interop.Object>);

  particleMass: number;

  particleMassVariation: number;

  particleBounce: number;

  particleBounceVariation: number;

  particleFriction: number;

  particleFrictionVariation: number;

  particleCharge: number;

  particleChargeVariation: number;

  dampingFactor: number;

  speedFactor: number;

  stretchFactor: number;

  fresnelExponent: number;

  get propertyControllers(): NSDictionary;
  set propertyControllers(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  reset(): void;

  handleEventForPropertiesWithBlock(event: interop.Enum<typeof SCNParticleEvent>, properties: NSArray<interop.Object> | Array<interop.Object>, block: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number) => void): void;

  addModifierForPropertiesAtStageWithBlock(properties: NSArray<interop.Object> | Array<interop.Object>, stage: interop.Enum<typeof SCNParticleModifierStage>, block: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: number) => void): void;

  removeModifiersOfStage(stage: interop.Enum<typeof SCNParticleModifierStage>): void;

  removeAllModifiers(): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  addAnimationForKey(animation: SCNAnimation, key: string | null): void;

  removeAllAnimations(): void;

  removeAnimationForKey(key: string): void;

  readonly animationKeys: NSArray;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  isProxy(): boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  zone(): interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class SCNTransaction extends NSObject {
  static begin(): void;

  static commit(): void;

  static flush(): void;

  static lock(): void;

  static unlock(): void;

  static animationDuration: number;

  static animationTimingFunction: interop.Object;

  static disableActions: boolean;

  static completionBlock: () => void;

  static valueForKey(key: string): interop.Object;

  static setValueForKey(value: interop.Object | null, key: string): void;
}

declare class SCNShape extends SCNGeometry {
  static shapeWithPathExtrusionDepth<This extends abstract new (...args: any) => any>(this: This, path: interop.Object | null, extrusionDepth: number): InstanceType<This>;

  path: interop.Object;

  extrusionDepth: number;

  chamferMode: interop.Enum<typeof SCNChamferMode>;

  chamferRadius: number;

  chamferProfile: interop.Object;
}

declare class SCNIKConstraint extends SCNConstraint {
  static inverseKinematicsConstraintWithChainRootNode<This extends abstract new (...args: any) => any>(this: This, chainRootNode: SCNNode): InstanceType<This>;

  readonly chainRootNode: SCNNode;

  targetPosition: SCNVector3;

  setMaxAllowedRotationAngleForJoint(angle: number, node: SCNNode): void;

  maxAllowedRotationAngleForJoint(node: SCNNode): number;
}

declare class SCNText extends SCNGeometry {
  static textWithStringExtrusionDepth<This extends abstract new (...args: any) => any>(this: This, string: interop.Object | null, extrusionDepth: number): InstanceType<This>;

  extrusionDepth: number;

  string: interop.Object;

  font: interop.Object;

  isWrapped: boolean;

  containerFrame: CGRect;

  truncationMode: string;

  alignmentMode: string;

  chamferRadius: number;

  chamferProfile: interop.Object;

  flatness: number;
}

declare class SCNLevelOfDetail extends NSObject implements NSCopying, NSSecureCoding {
  static levelOfDetailWithGeometryScreenSpaceRadius<This extends abstract new (...args: any) => any>(this: This, geometry: SCNGeometry | null, radius: number): InstanceType<This>;

  static levelOfDetailWithGeometryWorldSpaceDistance<This extends abstract new (...args: any) => any>(this: This, geometry: SCNGeometry | null, distance: number): InstanceType<This>;

  readonly geometry: SCNGeometry;

  readonly screenSpaceRadius: number;

  readonly worldSpaceDistance: number;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SCNCylinder extends SCNGeometry {
  static cylinderWithRadiusHeight<This extends abstract new (...args: any) => any>(this: This, radius: number, height: number): InstanceType<This>;

  radius: number;

  height: number;

  radialSegmentCount: number;

  heightSegmentCount: number;
}

declare class SCNBox extends SCNGeometry {
  static boxWithWidthHeightLengthChamferRadius<This extends abstract new (...args: any) => any>(this: This, width: number, height: number, length: number, chamferRadius: number): InstanceType<This>;

  width: number;

  height: number;

  length: number;

  chamferRadius: number;

  widthSegmentCount: number;

  heightSegmentCount: number;

  lengthSegmentCount: number;

  chamferSegmentCount: number;
}

declare class SCNPlane extends SCNGeometry {
  static planeWithWidthHeight<This extends abstract new (...args: any) => any>(this: This, width: number, height: number): InstanceType<This>;

  width: number;

  height: number;

  widthSegmentCount: number;

  heightSegmentCount: number;

  cornerRadius: number;

  cornerSegmentCount: number;
}

declare class SCNGeometryElement extends NSObject implements NSSecureCoding {
  static geometryElementWithDataPrimitiveTypePrimitiveCountBytesPerIndex<This extends abstract new (...args: any) => any>(this: This, data: NSData | null, primitiveType: interop.Enum<typeof SCNGeometryPrimitiveType>, primitiveCount: number, bytesPerIndex: number): InstanceType<This>;

  static geometryElementWithDataPrimitiveTypePrimitiveCountIndicesChannelCountInterleavedIndicesChannelsBytesPerIndex<This extends abstract new (...args: any) => any>(this: This, data: NSData | null, primitiveType: interop.Enum<typeof SCNGeometryPrimitiveType>, primitiveCount: number, indicesChannelCount: number, interleavedIndicesChannels: boolean, bytesPerIndex: number): InstanceType<This>;

  static geometryElementWithBufferPrimitiveTypePrimitiveCountIndicesChannelCountInterleavedIndicesChannelsBytesPerIndex<This extends abstract new (...args: any) => any>(this: This, buffer: MTLBuffer, primitiveType: interop.Enum<typeof SCNGeometryPrimitiveType>, primitiveCount: number, indicesChannelCount: number, interleavedIndicesChannels: boolean, bytesPerIndex: number): InstanceType<This>;

  readonly data: NSData;

  readonly primitiveType: interop.Enum<typeof SCNGeometryPrimitiveType>;

  readonly primitiveCount: number;

  readonly hasInterleavedIndicesChannels: boolean;

  readonly indicesChannelCount: number;

  readonly bytesPerIndex: number;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SCNGeometrySource extends NSObject implements NSSecureCoding {
  static geometrySourceWithDataSemanticVectorCountFloatComponentsComponentsPerVectorBytesPerComponentDataOffsetDataStride<This extends abstract new (...args: any) => any>(this: This, data: NSData, semantic: string, vectorCount: number, floatComponents: boolean, componentsPerVector: number, bytesPerComponent: number, offset: number, stride: number): InstanceType<This>;

  static geometrySourceWithVerticesCount<This extends abstract new (...args: any) => any>(this: This, vertices: interop.PointerConvertible, count: number): InstanceType<This>;

  static geometrySourceWithNormalsCount<This extends abstract new (...args: any) => any>(this: This, normals: interop.PointerConvertible, count: number): InstanceType<This>;

  static geometrySourceWithTextureCoordinatesCount<This extends abstract new (...args: any) => any>(this: This, texcoord: interop.PointerConvertible, count: number): InstanceType<This>;

  readonly data: NSData;

  readonly semantic: string;

  readonly vectorCount: number;

  readonly floatComponents: boolean;

  readonly componentsPerVector: number;

  readonly bytesPerComponent: number;

  readonly dataOffset: number;

  readonly dataStride: number;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SCNPhysicsVehicleWheel extends NSObject implements NSCopying, NSSecureCoding {
  static wheelWithNode<This extends abstract new (...args: any) => any>(this: This, node: SCNNode): InstanceType<This>;

  readonly node: SCNNode;

  suspensionStiffness: number;

  suspensionCompression: number;

  suspensionDamping: number;

  maximumSuspensionTravel: number;

  frictionSlip: number;

  maximumSuspensionForce: number;

  connectionPosition: SCNVector3;

  steeringAxis: SCNVector3;

  axle: SCNVector3;

  radius: number;

  suspensionRestLength: number;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SCNMaterial extends NSObject implements SCNAnimatable, SCNShadable, NSCopying, NSSecureCoding {
  static material<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  name: string;

  readonly diffuse: SCNMaterialProperty;

  readonly ambient: SCNMaterialProperty;

  readonly specular: SCNMaterialProperty;

  readonly emission: SCNMaterialProperty;

  readonly transparent: SCNMaterialProperty;

  readonly reflective: SCNMaterialProperty;

  readonly multiply: SCNMaterialProperty;

  readonly normal: SCNMaterialProperty;

  shininess: number;

  transparency: number;

  lightingModelName: string;

  isLitPerPixel: boolean;

  isDoubleSided: boolean;

  cullMode: interop.Enum<typeof SCNCullMode>;

  transparencyMode: interop.Enum<typeof SCNTransparencyMode>;

  locksAmbientWithDiffuse: boolean;

  writesToDepthBuffer: boolean;

  readsFromDepthBuffer: boolean;

  fresnelExponent: number;

  addAnimationForKey(animation: SCNAnimation, key: string | null): void;

  removeAllAnimations(): void;

  removeAnimationForKey(key: string): void;

  readonly animationKeys: NSArray;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  isProxy(): boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  zone(): interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;

  program: SCNProgram;

  handleBindingOfSymbolUsingBlock(symbol: string, block: (p1: number, p2: number, p3: SCNNode, p4: SCNRenderer) => void | null): void;

  handleUnbindingOfSymbolUsingBlock(symbol: string, block: (p1: number, p2: number, p3: SCNNode, p4: SCNRenderer) => void | null): void;

  get shaderModifiers(): NSDictionary;
  set shaderModifiers(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SCNCamera extends NSObject implements SCNAnimatable, SCNTechniqueSupport, NSCopying, NSSecureCoding {
  static camera<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  name: string;

  zNear: number;

  zFar: number;

  automaticallyAdjustsZRange: boolean;

  usesOrthographicProjection: boolean;

  orthographicScale: number;

  projectionTransform: SCNMatrix4;

  categoryBitMask: number;

  addAnimationForKey(animation: SCNAnimation, key: string | null): void;

  removeAllAnimations(): void;

  removeAnimationForKey(key: string): void;

  readonly animationKeys: NSArray;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  isProxy(): boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  zone(): interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;

  technique: SCNTechnique;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SCNLight extends NSObject implements SCNAnimatable, NSCopying, NSSecureCoding {
  static light<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  type: string;

  color: interop.Object;

  name: string;

  castsShadow: boolean;

  shadowColor: interop.Object;

  shadowRadius: number;

  shadowMapSize: CGSize;

  shadowSampleCount: number;

  shadowMode: interop.Enum<typeof SCNShadowMode>;

  shadowBias: number;

  orthographicScale: number;

  zNear: number;

  zFar: number;

  attenuationStartDistance: number;

  attenuationEndDistance: number;

  attenuationFalloffExponent: number;

  spotInnerAngle: number;

  spotOuterAngle: number;

  readonly gobo: SCNMaterialProperty;

  categoryBitMask: number;

  addAnimationForKey(animation: SCNAnimation, key: string | null): void;

  removeAllAnimations(): void;

  removeAnimationForKey(key: string): void;

  readonly animationKeys: NSArray;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  isProxy(): boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  zone(): interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SCNCapsule extends SCNGeometry {
  static capsuleWithCapRadiusHeight<This extends abstract new (...args: any) => any>(this: This, capRadius: number, height: number): InstanceType<This>;

  capRadius: number;

  height: number;

  radialSegmentCount: number;

  heightSegmentCount: number;

  capSegmentCount: number;
}

declare class SCNNode extends NSObject implements NSCopying, NSSecureCoding, SCNAnimatable, SCNActionable, SCNBoundingVolume {
  static node<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  static nodeWithGeometry(geometry: SCNGeometry | null): SCNNode;

  clone(): this;

  flattenedClone(): this;

  name: string;

  light: SCNLight;

  camera: SCNCamera;

  geometry: SCNGeometry;

  skinner: SCNSkinner;

  morpher: SCNMorpher;

  transform: SCNMatrix4;

  readonly worldTransform: SCNMatrix4;

  position: SCNVector3;

  rotation: SCNVector4;

  orientation: SCNVector4;

  eulerAngles: SCNVector3;

  scale: SCNVector3;

  pivot: SCNMatrix4;

  isHidden: boolean;

  opacity: number;

  renderingOrder: number;

  castsShadow: boolean;

  readonly parentNode: SCNNode;

  readonly childNodes: NSArray;

  addChildNode(child: SCNNode): void;

  insertChildNodeAtIndex(child: SCNNode, index: number): void;

  removeFromParentNode(): void;

  replaceChildNodeWith(oldChild: SCNNode, newChild: SCNNode): void;

  childNodeWithNameRecursively(name: string, recursively: boolean): SCNNode;

  childNodesPassingTest(predicate: (p1: SCNNode, p2: interop.PointerConvertible) => boolean): NSArray;

  enumerateChildNodesUsingBlock(block: (p1: SCNNode, p2: interop.PointerConvertible) => void): void;

  convertPositionToNode(position: SCNVector3, node: SCNNode | null): SCNVector3;

  convertPositionFromNode(position: SCNVector3, node: SCNNode | null): SCNVector3;

  convertTransformToNode(transform: SCNMatrix4, node: SCNNode | null): SCNMatrix4;

  convertTransformFromNode(transform: SCNMatrix4, node: SCNNode | null): SCNMatrix4;

  physicsBody: SCNPhysicsBody;

  physicsField: SCNPhysicsField;

  get constraints(): NSArray;
  set constraints(value: NSArray<interop.Object> | Array<interop.Object>);

  get filters(): NSArray;
  set filters(value: NSArray<interop.Object> | Array<interop.Object>);

  readonly presentationNode: SCNNode;

  isPaused: boolean;

  rendererDelegate: SCNNodeRendererDelegate;

  hitTestWithSegmentFromPointToPointOptions(pointA: SCNVector3, pointB: SCNVector3, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): NSArray;

  categoryBitMask: number;

  addParticleSystem(system: SCNParticleSystem): void;

  removeAllParticleSystems(): void;

  removeParticleSystem(system: SCNParticleSystem): void;

  readonly particleSystems: NSArray;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  addAnimationForKey(animation: SCNAnimation, key: string | null): void;

  removeAllAnimations(): void;

  removeAnimationForKey(key: string): void;

  readonly animationKeys: NSArray;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  isProxy(): boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  zone(): interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;

  runAction(action: SCNAction): void;

  runActionCompletionHandler(action: SCNAction, block: () => void | null): void;

  runActionForKey(action: SCNAction, key: string | null): void;

  runActionForKeyCompletionHandler(action: SCNAction, key: string | null, block: () => void | null): void;

  readonly hasActions: boolean;

  actionForKey(key: string): SCNAction;

  removeActionForKey(key: string): void;

  removeAllActions(): void;

  readonly actionKeys: NSArray;

  getBoundingBoxMinMax(min: interop.PointerConvertible, max: interop.PointerConvertible): boolean;

  setBoundingBoxMinMax(min: interop.PointerConvertible, max: interop.PointerConvertible): void;

  getBoundingSphereCenterRadius(center: interop.PointerConvertible, radius: interop.PointerConvertible): boolean;
}

declare class SCNRenderer extends NSObject implements SCNSceneRenderer, SCNTechniqueSupport {
  scene: SCNScene;

  renderAtTime(time: number): void;

  readonly nextFrameTime: number;

  sceneTime: number;

  delegate: SCNSceneRendererDelegate;

  hitTestOptions(point: CGPoint, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): NSArray;

  isNodeInsideFrustumWithPointOfView(node: SCNNode, pointOfView: SCNNode): boolean;

  projectPoint(point: SCNVector3): SCNVector3;

  unprojectPoint(point: SCNVector3): SCNVector3;

  isPlaying: boolean;

  loops: boolean;

  pointOfView: SCNNode;

  autoenablesDefaultLighting: boolean;

  isJitteringEnabled: boolean;

  prepareObjectShouldAbortBlock(object: interop.Object, block: () => boolean | null): boolean;

  prepareObjectsWithCompletionHandler(objects: NSArray<interop.Object> | Array<interop.Object>, completionHandler: (p1: boolean) => void | null): void;

  showsStatistics: boolean;

  overlaySKScene: SKScene;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  isProxy(): boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  zone(): interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;

  technique: SCNTechnique;
}

declare class SCNScene extends NSObject implements NSSecureCoding {
  static scene<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  readonly rootNode: SCNNode;

  readonly physicsWorld: SCNPhysicsWorld;

  attributeForKey(key: string): interop.Object;

  setAttributeForKey(attribute: interop.Object | null, key: string): void;

  readonly background: SCNMaterialProperty;

  static sceneNamed<This extends abstract new (...args: any) => any>(this: This, name: string): InstanceType<This>;

  static sceneNamedInDirectoryOptions<This extends abstract new (...args: any) => any>(this: This, name: string, directory: string | null, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): InstanceType<This>;

  static sceneWithURLOptionsError<This extends abstract new (...args: any) => any>(this: This, url: NSURL, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, error: interop.PointerConvertible): InstanceType<This>;

  fogStartDistance: number;

  fogEndDistance: number;

  fogDensityExponent: number;

  fogColor: interop.Object;

  isPaused: boolean;

  addParticleSystemWithTransform(system: SCNParticleSystem, transform: SCNMatrix4): void;

  removeAllParticleSystems(): void;

  removeParticleSystem(system: SCNParticleSystem): void;

  readonly particleSystems: NSArray;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SCNSceneSource extends NSObject {
  static sceneSourceWithURLOptions<This extends abstract new (...args: any) => any>(this: This, url: NSURL, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): InstanceType<This>;

  static sceneSourceWithDataOptions<This extends abstract new (...args: any) => any>(this: This, data: NSData, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): InstanceType<This>;

  initWithURLOptions(url: NSURL, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): this;

  initWithDataOptions(data: NSData, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): this;

  readonly url: NSURL;

  readonly data: NSData;

  sceneWithOptionsStatusHandler(options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, statusHandler: (p1: number, p2: interop.Enum<typeof SCNSceneSourceStatus>, p3: NSError, p4: interop.PointerConvertible) => void | null): SCNScene;

  sceneWithOptionsError(options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, error: interop.PointerConvertible): SCNScene;

  propertyForKey(key: string): interop.Object;

  entryWithIdentifierWithClass(uid: string, entryClass: interop.Object): interop.Object;

  identifiersOfEntriesWithClass(entryClass: interop.Object): NSArray;

  entriesPassingTest(predicate: (p1: interop.Object, p2: string, p3: interop.PointerConvertible) => boolean): NSArray;
}

declare class SCNView extends UIView implements SCNSceneRenderer, SCNTechniqueSupport {
  initWithFrameOptions(frame: CGRect, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): this;

  scene: SCNScene;

  rendersContinuously: boolean;

  allowsCameraControl: boolean;

  snapshot(): interop.Object;

  play(sender: interop.Object | null): void;

  pause(sender: interop.Object | null): void;

  stop(sender: interop.Object | null): void;

  preferredFramesPerSecond: number;

  antialiasingMode: interop.Enum<typeof SCNAntialiasingMode>;

  sceneTime: number;

  delegate: SCNSceneRendererDelegate;

  hitTestOptions(point: CGPoint, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): NSArray;

  isNodeInsideFrustumWithPointOfView(node: SCNNode, pointOfView: SCNNode): boolean;

  projectPoint(point: SCNVector3): SCNVector3;

  unprojectPoint(point: SCNVector3): SCNVector3;

  isPlaying: boolean;

  loops: boolean;

  pointOfView: SCNNode;

  autoenablesDefaultLighting: boolean;

  isJitteringEnabled: boolean;

  prepareObjectShouldAbortBlock(object: interop.Object, block: () => boolean | null): boolean;

  prepareObjectsWithCompletionHandler(objects: NSArray<interop.Object> | Array<interop.Object>, completionHandler: (p1: boolean) => void | null): void;

  showsStatistics: boolean;

  overlaySKScene: SKScene;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  isProxy(): boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  zone(): interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;

  technique: SCNTechnique;
}

declare class SCNTechnique extends NSObject implements SCNAnimatable, NSCopying, NSSecureCoding {
  static techniqueWithDictionary(dictionary: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): SCNTechnique;

  static techniqueBySequencingTechniques(techniques: NSArray<interop.Object> | Array<interop.Object>): SCNTechnique;

  handleBindingOfSymbolUsingBlock(symbol: string, block: (p1: number, p2: number, p3: SCNNode, p4: SCNRenderer) => void | null): void;

  readonly dictionaryRepresentation: NSDictionary;

  addAnimationForKey(animation: SCNAnimation, key: string | null): void;

  removeAllAnimations(): void;

  removeAnimationForKey(key: string): void;

  readonly animationKeys: NSArray;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  isProxy(): boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  zone(): interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SCNPhysicsField extends NSObject implements NSCopying, NSSecureCoding {
  strength: number;

  falloffExponent: number;

  minimumDistance: number;

  isActive: boolean;

  isExclusive: boolean;

  halfExtent: SCNVector3;

  usesEllipsoidalExtent: boolean;

  scope: interop.Enum<typeof SCNPhysicsFieldScope>;

  offset: SCNVector3;

  direction: SCNVector3;

  categoryBitMask: number;

  static dragField(): SCNPhysicsField;

  static vortexField(): SCNPhysicsField;

  static radialGravityField(): SCNPhysicsField;

  static linearGravityField(): SCNPhysicsField;

  static noiseFieldWithSmoothnessAnimationSpeed(smoothness: number, speed: number): SCNPhysicsField;

  static turbulenceFieldWithSmoothnessAnimationSpeed(smoothness: number, speed: number): SCNPhysicsField;

  static springField(): SCNPhysicsField;

  static electricField(): SCNPhysicsField;

  static magneticField(): SCNPhysicsField;

  static customFieldWithEvaluationBlock(block: (p1: SCNVector3, p2: SCNVector3, p3: number, p4: number, p5: number) => SCNVector3): SCNPhysicsField;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SCNHitTestResult extends NSObject {
  readonly node: SCNNode;

  readonly geometryIndex: number;

  readonly faceIndex: number;

  readonly localCoordinates: SCNVector3;

  readonly worldCoordinates: SCNVector3;

  readonly localNormal: SCNVector3;

  readonly worldNormal: SCNVector3;

  readonly modelTransform: SCNMatrix4;

  textureCoordinatesWithMappingChannel(channel: number): CGPoint;
}

declare class SCNMaterialProperty extends NSObject implements SCNAnimatable, NSSecureCoding {
  static materialPropertyWithContents<This extends abstract new (...args: any) => any>(this: This, contents: interop.Object): InstanceType<This>;

  contents: interop.Object;

  intensity: number;

  minificationFilter: interop.Enum<typeof SCNFilterMode>;

  magnificationFilter: interop.Enum<typeof SCNFilterMode>;

  mipFilter: interop.Enum<typeof SCNFilterMode>;

  contentsTransform: SCNMatrix4;

  wrapS: interop.Enum<typeof SCNWrapMode>;

  wrapT: interop.Enum<typeof SCNWrapMode>;

  mappingChannel: number;

  maxAnisotropy: number;

  static precomputedLightingEnvironmentContentsWithURLError(url: NSURL, error: interop.PointerConvertible): interop.Object;

  static precomputedLightingEnvironmentContentsWithDataError(data: NSData, error: interop.PointerConvertible): interop.Object;

  static precomputedLightingEnvironmentDataForContentsDeviceError(contents: interop.Object, device: MTLDevice | null, error: interop.PointerConvertible): NSData;

  addAnimationForKey(animation: SCNAnimation, key: string | null): void;

  removeAllAnimations(): void;

  removeAnimationForKey(key: string): void;

  readonly animationKeys: NSArray;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  isProxy(): boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  zone(): interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SCNGeometry extends NSObject implements SCNAnimatable, SCNBoundingVolume, SCNShadable, NSCopying, NSSecureCoding {
  static geometry<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  name: string;

  get materials(): NSArray;
  set materials(value: NSArray<interop.Object> | Array<interop.Object>);

  firstMaterial: SCNMaterial;

  insertMaterialAtIndex(material: SCNMaterial, index: number): void;

  removeMaterialAtIndex(index: number): void;

  replaceMaterialAtIndexWithMaterial(index: number, material: SCNMaterial): void;

  materialWithName(name: string): SCNMaterial;

  static geometryWithSourcesElements<This extends abstract new (...args: any) => any>(this: This, sources: NSArray<interop.Object> | Array<interop.Object>, elements: NSArray<interop.Object> | Array<interop.Object> | null): InstanceType<This>;

  static geometryWithSourcesElementsSourceChannels<This extends abstract new (...args: any) => any>(this: This, sources: NSArray<interop.Object> | Array<interop.Object>, elements: NSArray<interop.Object> | Array<interop.Object> | null, sourceChannels: NSArray<interop.Object> | Array<interop.Object> | null): InstanceType<This>;

  readonly geometrySources: NSArray;

  geometrySourcesForSemantic(semantic: string): NSArray;

  readonly geometryElements: NSArray;

  readonly geometryElementCount: number;

  geometryElementAtIndex(elementIndex: number): SCNGeometryElement;

  readonly geometrySourceChannels: NSArray;

  get levelsOfDetail(): NSArray;
  set levelsOfDetail(value: NSArray<interop.Object> | Array<interop.Object>);

  subdivisionLevel: number;

  edgeCreasesElement: SCNGeometryElement;

  edgeCreasesSource: SCNGeometrySource;

  addAnimationForKey(animation: SCNAnimation, key: string | null): void;

  removeAllAnimations(): void;

  removeAnimationForKey(key: string): void;

  readonly animationKeys: NSArray;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  isProxy(): boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  zone(): interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;

  getBoundingBoxMinMax(min: interop.PointerConvertible, max: interop.PointerConvertible): boolean;

  setBoundingBoxMinMax(min: interop.PointerConvertible, max: interop.PointerConvertible): void;

  getBoundingSphereCenterRadius(center: interop.PointerConvertible, radius: interop.PointerConvertible): boolean;

  program: SCNProgram;

  handleBindingOfSymbolUsingBlock(symbol: string, block: (p1: number, p2: number, p3: SCNNode, p4: SCNRenderer) => void | null): void;

  handleUnbindingOfSymbolUsingBlock(symbol: string, block: (p1: number, p2: number, p3: SCNNode, p4: SCNRenderer) => void | null): void;

  get shaderModifiers(): NSDictionary;
  set shaderModifiers(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SCNSphere extends SCNGeometry {
  static sphereWithRadius<This extends abstract new (...args: any) => any>(this: This, radius: number): InstanceType<This>;

  radius: number;

  isGeodesic: boolean;

  segmentCount: number;
}

declare class SCNCone extends SCNGeometry {
  static coneWithTopRadiusBottomRadiusHeight<This extends abstract new (...args: any) => any>(this: This, topRadius: number, bottomRadius: number, height: number): InstanceType<This>;

  topRadius: number;

  bottomRadius: number;

  height: number;

  radialSegmentCount: number;

  heightSegmentCount: number;
}

declare class SCNProgram extends NSObject implements NSCopying, NSSecureCoding {
  static program<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  vertexShader: string;

  fragmentShader: string;

  isOpaque: boolean;

  setSemanticForSymbolOptions(semantic: string | null, symbol: string, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): void;

  semanticForSymbol(symbol: string): string;

  delegate: SCNProgramDelegate;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SCNAction extends NSObject implements NSCopying, NSSecureCoding {
  duration: number;

  timingMode: interop.Enum<typeof SCNActionTimingMode>;

  timingFunction: (p1: number) => number;

  speed: number;

  reversedAction(): SCNAction;

  static moveByXYZDuration(deltaX: number, deltaY: number, deltaZ: number, duration: number): SCNAction;

  static moveByDuration(delta: SCNVector3, duration: number): SCNAction;

  static moveToDuration(location: SCNVector3, duration: number): SCNAction;

  static rotateByXYZDuration(xAngle: number, yAngle: number, zAngle: number, duration: number): SCNAction;

  static rotateToXYZDuration(xAngle: number, yAngle: number, zAngle: number, duration: number): SCNAction;

  static rotateToXYZDurationShortestUnitArc(xAngle: number, yAngle: number, zAngle: number, duration: number, shortestUnitArc: boolean): SCNAction;

  static rotateByAngleAroundAxisDuration(angle: number, axis: SCNVector3, duration: number): SCNAction;

  static rotateToAxisAngleDuration(axisAngle: SCNVector4, duration: number): SCNAction;

  static scaleByDuration(scale: number, sec: number): SCNAction;

  static scaleToDuration(scale: number, sec: number): SCNAction;

  static sequence(actions: NSArray<interop.Object> | Array<interop.Object>): SCNAction;

  static group(actions: NSArray<interop.Object> | Array<interop.Object>): SCNAction;

  static repeatActionCount(action: SCNAction, count: number): SCNAction;

  static repeatActionForever(action: SCNAction): SCNAction;

  static fadeInWithDuration(sec: number): SCNAction;

  static fadeOutWithDuration(sec: number): SCNAction;

  static fadeOpacityByDuration(factor: number, sec: number): SCNAction;

  static fadeOpacityToDuration(opacity: number, sec: number): SCNAction;

  static waitForDuration(sec: number): SCNAction;

  static waitForDurationWithRange(sec: number, durationRange: number): SCNAction;

  static removeFromParentNode(): SCNAction;

  static runBlock(block: (p1: SCNNode) => void): SCNAction;

  static runBlockQueue(block: (p1: SCNNode) => void, queue: interop.Object): SCNAction;

  static javaScriptActionWithScriptDuration(script: string, seconds: number): SCNAction;

  static customActionWithDurationActionBlock(seconds: number, block: (p1: SCNNode, p2: number) => void): SCNAction;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SCNConstraint extends NSObject implements NSCopying, NSSecureCoding, SCNAnimatable {
  isEnabled: boolean;

  influenceFactor: number;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  addAnimationForKey(animation: SCNAnimation, key: string | null): void;

  removeAllAnimations(): void;

  removeAnimationForKey(key: string): void;

  readonly animationKeys: NSArray;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  isProxy(): boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  zone(): interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class SCNTransformConstraint extends SCNConstraint {
  static transformConstraintInWorldSpaceWithBlock<This extends abstract new (...args: any) => any>(this: This, world: boolean, block: (p1: SCNNode, p2: SCNMatrix4) => SCNMatrix4): InstanceType<This>;
}

declare class SCNAnimationEvent extends NSObject {
  static animationEventWithKeyTimeBlock<This extends abstract new (...args: any) => any>(this: This, time: number, eventBlock: (p1: SCNAnimation, p2: interop.Object, p3: boolean) => void): InstanceType<This>;
}

declare class SCNPyramid extends SCNGeometry {
  static pyramidWithWidthHeightLength<This extends abstract new (...args: any) => any>(this: This, width: number, height: number, length: number): InstanceType<This>;

  width: number;

  height: number;

  length: number;

  widthSegmentCount: number;

  heightSegmentCount: number;

  lengthSegmentCount: number;
}

declare class SCNPhysicsShape extends NSObject implements NSCopying, NSSecureCoding {
  static shapeWithGeometryOptions<This extends abstract new (...args: any) => any>(this: This, geometry: SCNGeometry, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): InstanceType<This>;

  static shapeWithNodeOptions<This extends abstract new (...args: any) => any>(this: This, node: SCNNode, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): InstanceType<This>;

  static shapeWithShapesTransforms<This extends abstract new (...args: any) => any>(this: This, shapes: NSArray<interop.Object> | Array<interop.Object>, transforms: NSArray<interop.Object> | Array<interop.Object> | null): InstanceType<This>;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SCNTorus extends SCNGeometry {
  static torusWithRingRadiusPipeRadius<This extends abstract new (...args: any) => any>(this: This, ringRadius: number, pipeRadius: number): InstanceType<This>;

  ringRadius: number;

  pipeRadius: number;

  ringSegmentCount: number;

  pipeSegmentCount: number;
}

declare class SCNPhysicsVehicle extends SCNPhysicsBehavior {
  static vehicleWithChassisBodyWheels<This extends abstract new (...args: any) => any>(this: This, chassisBody: SCNPhysicsBody, wheels: NSArray<interop.Object> | Array<interop.Object>): InstanceType<This>;

  readonly speedInKilometersPerHour: number;

  readonly wheels: NSArray;

  readonly chassisBody: SCNPhysicsBody;

  applyEngineForceForWheelAtIndex(value: number, index: number): void;

  setSteeringAngleForWheelAtIndex(value: number, index: number): void;

  applyBrakingForceForWheelAtIndex(value: number, index: number): void;
}

declare class SCNPhysicsBallSocketJoint extends SCNPhysicsBehavior {
  static jointWithBodyAAnchorABodyBAnchorB<This extends abstract new (...args: any) => any>(this: This, bodyA: SCNPhysicsBody, anchorA: SCNVector3, bodyB: SCNPhysicsBody, anchorB: SCNVector3): InstanceType<This>;

  static jointWithBodyAnchor<This extends abstract new (...args: any) => any>(this: This, body: SCNPhysicsBody, anchor: SCNVector3): InstanceType<This>;

  readonly bodyA: SCNPhysicsBody;

  anchorA: SCNVector3;

  readonly bodyB: SCNPhysicsBody;

  anchorB: SCNVector3;
}

declare class SCNPhysicsHingeJoint extends SCNPhysicsBehavior {
  static jointWithBodyAAxisAAnchorABodyBAxisBAnchorB<This extends abstract new (...args: any) => any>(this: This, bodyA: SCNPhysicsBody, axisA: SCNVector3, anchorA: SCNVector3, bodyB: SCNPhysicsBody, axisB: SCNVector3, anchorB: SCNVector3): InstanceType<This>;

  static jointWithBodyAxisAnchor<This extends abstract new (...args: any) => any>(this: This, body: SCNPhysicsBody, axis: SCNVector3, anchor: SCNVector3): InstanceType<This>;

  readonly bodyA: SCNPhysicsBody;

  axisA: SCNVector3;

  anchorA: SCNVector3;

  readonly bodyB: SCNPhysicsBody;

  axisB: SCNVector3;

  anchorB: SCNVector3;
}

declare class SCNPhysicsWorld extends NSObject implements NSSecureCoding {
  gravity: SCNVector3;

  speed: number;

  timeStep: number;

  contactDelegate: SCNPhysicsContactDelegate;

  addBehavior(behavior: SCNPhysicsBehavior): void;

  removeBehavior(behavior: SCNPhysicsBehavior): void;

  removeAllBehaviors(): void;

  readonly allBehaviors: NSArray;

  rayTestWithSegmentFromPointToPointOptions(origin: SCNVector3, dest: SCNVector3, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): NSArray;

  contactTestBetweenBodyAndBodyOptions(bodyA: SCNPhysicsBody, bodyB: SCNPhysicsBody, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): NSArray;

  contactTestWithBodyOptions(body: SCNPhysicsBody, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): NSArray;

  convexSweepTestWithShapeFromTransformToTransformOptions(shape: SCNPhysicsShape, from: SCNMatrix4, to: SCNMatrix4, options: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): NSArray;

  updateCollisionPairs(): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SCNTube extends SCNGeometry {
  static tubeWithInnerRadiusOuterRadiusHeight<This extends abstract new (...args: any) => any>(this: This, innerRadius: number, outerRadius: number, height: number): InstanceType<This>;

  innerRadius: number;

  outerRadius: number;

  height: number;

  radialSegmentCount: number;

  heightSegmentCount: number;
}


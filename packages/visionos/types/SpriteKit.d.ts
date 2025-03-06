/// <reference types="@nativescript/objc-node-api" />

declare const SKRepeatMode: {
  Clamp: 1,
  Loop: 2,
};

declare const SKInterpolationMode: {
  Linear: 1,
  Spline: 2,
  Step: 3,
};

declare interface SKWarpable extends NSObject {
  warpGeometry: interop.Object;

  subdivisionLevels: number;
}

declare class SKWarpable extends NativeObject implements SKWarpable {
}

declare interface SKPhysicsContactDelegate extends NSObject {
  didBeginContact?(contact: SKPhysicsContact): void;

  didEndContact?(contact: SKPhysicsContact): void;
}

declare class SKPhysicsContactDelegate extends NativeObject implements SKPhysicsContactDelegate {
}

declare class SKNode extends UIResponder implements NSCopying, NSSecureCoding, UIFocusItem, UIFocusItemContainer, UICoordinateSpace {
  init(): this;

  initWithCoder(aDecoder: NSCoder): this;

  static node<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  static nodeWithFileNamed<This extends abstract new (...args: any) => any>(this: This, filename: string): InstanceType<This>;

  readonly frame: CGRect;

  calculateAccumulatedFrame(): CGRect;

  position: CGPoint;

  zPosition: number;

  zRotation: number;

  xScale: number;

  yScale: number;

  speed: number;

  alpha: number;

  isPaused: boolean;

  isHidden: boolean;

  isUserInteractionEnabled: boolean;

  readonly parent: SKNode;

  readonly children: NSArray;

  name: string;

  readonly scene: SKScene;

  physicsBody: SKPhysicsBody;

  userData: NSMutableDictionary;

  reachConstraints: interop.Object;

  get constraints(): NSArray;
  set constraints(value: NSArray<interop.Object> | Array<interop.Object>);

  setScale(scale: number): void;

  addChild(node: SKNode): void;

  insertChildAtIndex(node: SKNode, index: number): void;

  removeChildrenInArray(nodes: NSArray<interop.Object> | Array<interop.Object>): void;

  removeAllChildren(): void;

  removeFromParent(): void;

  childNodeWithName(name: string): SKNode;

  enumerateChildNodesWithNameUsingBlock(name: string, block: (p1: SKNode, p2: interop.PointerConvertible) => void): void;

  inParentHierarchy(parent: SKNode): boolean;

  runAction(action: SKAction): void;

  runActionCompletion(action: SKAction, block: () => void): void;

  runActionWithKey(action: SKAction, key: string): void;

  hasActions(): boolean;

  actionForKey(key: string): SKAction;

  removeActionForKey(key: string): void;

  removeAllActions(): void;

  containsPoint(p: CGPoint): boolean;

  nodeAtPoint(p: CGPoint): SKNode;

  nodesAtPoint(p: CGPoint): NSArray;

  convertPointFromNode(point: CGPoint, node: SKNode): CGPoint;

  convertPointToNode(point: CGPoint, node: SKNode): CGPoint;

  intersectsNode(node: SKNode): boolean;

  isEqualToNode(node: SKNode): boolean;

  static obstaclesFromSpriteTexturesAccuracy(sprites: NSArray<interop.Object> | Array<interop.Object>, accuracy: number): NSArray;

  static obstaclesFromNodeBounds(nodes: NSArray<interop.Object> | Array<interop.Object>): NSArray;

  static obstaclesFromNodePhysicsBodies(nodes: NSArray<interop.Object> | Array<interop.Object>): NSArray;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  readonly canBecomeFocused: boolean;

  readonly focusItemDeferralMode: interop.Enum<typeof UIFocusItemDeferralMode>;

  readonly preferredFocusEnvironments: NSArray;

  setNeedsFocusUpdate(): void;

  updateFocusIfNeeded(): void;

  shouldUpdateFocusInContext(context: interop.Object): boolean;

  didUpdateFocusInContextWithAnimationCoordinator(context: interop.Object, coordinator: interop.Object): void;

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

  readonly coordinateSpace: UICoordinateSpace;

  focusItemsInRect(rect: CGRect): NSArray;
}

declare class SKLabelNode extends SKNode {
  static labelNodeWithText<This extends abstract new (...args: any) => any>(this: This, text: string | null): InstanceType<This>;

  static labelNodeWithFontNamed<This extends abstract new (...args: any) => any>(this: This, fontName: string | null): InstanceType<This>;

  initWithFontNamed(fontName: string | null): this;

  verticalAlignmentMode: interop.Enum<typeof SKLabelVerticalAlignmentMode>;

  horizontalAlignmentMode: interop.Enum<typeof SKLabelHorizontalAlignmentMode>;

  fontName: string;

  text: string;

  fontSize: number;

  fontColor: interop.Object;

  colorBlendFactor: number;

  color: interop.Object;

  blendMode: interop.Enum<typeof SKBlendMode>;
}

declare class SKPhysicsWorld extends NSObject implements NSSecureCoding {
  gravity: CGVector;

  speed: number;

  contactDelegate: SKPhysicsContactDelegate;

  addJoint(joint: SKPhysicsJoint): void;

  removeJoint(joint: SKPhysicsJoint): void;

  removeAllJoints(): void;

  bodyAtPoint(point: CGPoint): SKPhysicsBody;

  bodyInRect(rect: CGRect): SKPhysicsBody;

  bodyAlongRayStartEnd(start: CGPoint, end: CGPoint): SKPhysicsBody;

  enumerateBodiesAtPointUsingBlock(point: CGPoint, block: (p1: SKPhysicsBody, p2: interop.PointerConvertible) => void): void;

  enumerateBodiesInRectUsingBlock(rect: CGRect, block: (p1: SKPhysicsBody, p2: interop.PointerConvertible) => void): void;

  enumerateBodiesAlongRayStartEndUsingBlock(start: CGPoint, end: CGPoint, block: (p1: SKPhysicsBody, p2: CGPoint, p3: CGVector, p4: interop.PointerConvertible) => void): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SKPhysicsContact extends NSObject {
  readonly bodyA: SKPhysicsBody;

  readonly bodyB: SKPhysicsBody;

  readonly contactPoint: CGPoint;

  readonly contactNormal: CGVector;

  readonly collisionImpulse: number;
}

declare class SKPhysicsJoint extends NSObject implements NSSecureCoding {
  bodyA: SKPhysicsBody;

  bodyB: SKPhysicsBody;

  readonly reactionForce: CGVector;

  readonly reactionTorque: number;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SKPhysicsJointLimit extends SKPhysicsJoint {
  maxLength: number;

  static jointWithBodyABodyBAnchorAAnchorB(bodyA: SKPhysicsBody, bodyB: SKPhysicsBody, anchorA: CGPoint, anchorB: CGPoint): SKPhysicsJointLimit;
}

declare class SKPhysicsJointSpring extends SKPhysicsJoint {
  static jointWithBodyABodyBAnchorAAnchorB(bodyA: SKPhysicsBody, bodyB: SKPhysicsBody, anchorA: CGPoint, anchorB: CGPoint): SKPhysicsJointSpring;

  damping: number;

  frequency: number;
}

declare class SKPhysicsJointPin extends SKPhysicsJoint {
  static jointWithBodyABodyBAnchor(bodyA: SKPhysicsBody, bodyB: SKPhysicsBody, anchor: CGPoint): SKPhysicsJointPin;

  shouldEnableLimits: boolean;

  lowerAngleLimit: number;

  upperAngleLimit: number;

  frictionTorque: number;

  rotationSpeed: number;
}

declare class SKTextureAtlas extends NSObject implements NSSecureCoding {
  static atlasNamed<This extends abstract new (...args: any) => any>(this: This, name: string): InstanceType<This>;

  textureNamed(name: string): SKTexture;

  static preloadTextureAtlasesWithCompletionHandler(textureAtlases: NSArray<interop.Object> | Array<interop.Object>, completionHandler: () => void): void;

  preloadWithCompletionHandler(completionHandler: () => void): void;

  readonly textureNames: NSArray;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SKTexture extends NSObject implements NSCopying, NSSecureCoding {
  static textureWithImageNamed<This extends abstract new (...args: any) => any>(this: This, name: string): InstanceType<This>;

  static textureWithRectInTexture<This extends abstract new (...args: any) => any>(this: This, rect: CGRect, texture: SKTexture): InstanceType<This>;

  static textureWithCGImage<This extends abstract new (...args: any) => any>(this: This, image: interop.PointerConvertible): InstanceType<This>;

  static textureWithImage<This extends abstract new (...args: any) => any>(this: This, image: interop.Object): InstanceType<This>;

  static textureWithDataSize<This extends abstract new (...args: any) => any>(this: This, pixelData: NSData, size: CGSize): InstanceType<This>;

  static textureWithDataSizeFlipped<This extends abstract new (...args: any) => any>(this: This, pixelData: NSData, size: CGSize, flipped: boolean): InstanceType<This>;

  static textureWithDataSizeRowLengthAlignment<This extends abstract new (...args: any) => any>(this: This, pixelData: NSData, size: CGSize, rowLength: number, alignment: number): InstanceType<This>;

  textureByApplyingCIFilter(filter: interop.Object): this;

  textureRect(): CGRect;

  size(): CGSize;

  filteringMode: interop.Enum<typeof SKTextureFilteringMode>;

  usesMipmaps: boolean;

  static preloadTexturesWithCompletionHandler(textures: NSArray<interop.Object> | Array<interop.Object>, completionHandler: () => void): void;

  preloadWithCompletionHandler(completionHandler: () => void): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SKView extends UIView {
  isPaused: boolean;

  showsFPS: boolean;

  showsDrawCount: boolean;

  showsNodeCount: boolean;

  isAsynchronous: boolean;

  ignoresSiblingOrder: boolean;

  disableDepthStencilBuffer: boolean;

  presentScene(scene: SKScene | null): void;

  presentSceneTransition(scene: SKScene, transition: SKTransition): void;

  readonly scene: SKScene;

  textureFromNode(node: SKNode): SKTexture;

  textureFromNodeCrop(node: SKNode, crop: CGRect): SKTexture;

  convertPointToScene(point: CGPoint, scene: SKScene): CGPoint;

  convertPointFromScene(point: CGPoint, scene: SKScene): CGPoint;
}

declare class SKCropNode extends SKNode {
  maskNode: SKNode;
}

declare class SKPhysicsJointSliding extends SKPhysicsJoint {
  static jointWithBodyABodyBAnchorAxis(bodyA: SKPhysicsBody, bodyB: SKPhysicsBody, anchor: CGPoint, axis: CGVector): SKPhysicsJointSliding;

  shouldEnableLimits: boolean;

  lowerDistanceLimit: number;

  upperDistanceLimit: number;
}

declare class SKVideoNode extends SKNode {
  static videoNodeWithAVPlayer(player: AVPlayer): SKVideoNode;

  initWithAVPlayer(player: AVPlayer): this;

  initWithCoder(aDecoder: NSCoder): this;

  play(): void;

  pause(): void;

  size: CGSize;

  anchorPoint: CGPoint;
}

declare class SKEmitterNode extends SKNode {
  advanceSimulationTime(sec: number): void;

  resetSimulation(): void;

  particleTexture: SKTexture;

  particleBlendMode: interop.Enum<typeof SKBlendMode>;

  particleColor: interop.Object;

  particleColorRedRange: number;

  particleColorGreenRange: number;

  particleColorBlueRange: number;

  particleColorAlphaRange: number;

  particleColorRedSpeed: number;

  particleColorGreenSpeed: number;

  particleColorBlueSpeed: number;

  particleColorAlphaSpeed: number;

  particleColorSequence: SKKeyframeSequence;

  particleColorBlendFactor: number;

  particleColorBlendFactorRange: number;

  particleColorBlendFactorSpeed: number;

  particleColorBlendFactorSequence: SKKeyframeSequence;

  particlePosition: CGPoint;

  particlePositionRange: CGVector;

  particleSpeed: number;

  particleSpeedRange: number;

  emissionAngle: number;

  emissionAngleRange: number;

  xAcceleration: number;

  yAcceleration: number;

  particleBirthRate: number;

  numParticlesToEmit: number;

  particleLifetime: number;

  particleLifetimeRange: number;

  particleRotation: number;

  particleRotationRange: number;

  particleRotationSpeed: number;

  particleSize: CGSize;

  particleScale: number;

  particleScaleRange: number;

  particleScaleSpeed: number;

  particleScaleSequence: SKKeyframeSequence;

  particleAlpha: number;

  particleAlphaRange: number;

  particleAlphaSpeed: number;

  particleAlphaSequence: SKKeyframeSequence;

  particleAction: SKAction;

  fieldBitMask: number;

  targetNode: SKNode;

  shader: interop.Object;

  particleZPosition: number;
}

declare class SKSpriteNode extends SKNode implements SKWarpable {
  static spriteNodeWithTextureSize<This extends abstract new (...args: any) => any>(this: This, texture: SKTexture | null, size: CGSize): InstanceType<This>;

  static spriteNodeWithTexture<This extends abstract new (...args: any) => any>(this: This, texture: SKTexture | null): InstanceType<This>;

  static spriteNodeWithTextureNormalMap<This extends abstract new (...args: any) => any>(this: This, texture: SKTexture | null, normalMap: SKTexture | null): InstanceType<This>;

  static spriteNodeWithImageNamed<This extends abstract new (...args: any) => any>(this: This, name: string): InstanceType<This>;

  static spriteNodeWithImageNamedNormalMapped<This extends abstract new (...args: any) => any>(this: This, name: string, generateNormalMap: boolean): InstanceType<This>;

  static spriteNodeWithColorSize<This extends abstract new (...args: any) => any>(this: This, color: interop.Object, size: CGSize): InstanceType<This>;

  initWithTextureColorSize(texture: SKTexture | null, color: interop.Object, size: CGSize): this;

  initWithTexture(texture: SKTexture | null): this;

  initWithImageNamed(name: string): this;

  initWithColorSize(color: interop.Object, size: CGSize): this;

  initWithCoder(aDecoder: NSCoder): this;

  texture: SKTexture;

  centerRect: CGRect;

  colorBlendFactor: number;

  color: interop.Object;

  blendMode: interop.Enum<typeof SKBlendMode>;

  anchorPoint: CGPoint;

  size: CGSize;

  warpGeometry: interop.Object;

  subdivisionLevels: number;

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

declare class SKAction extends NSObject implements NSCopying, NSSecureCoding {
  duration: number;

  timingMode: interop.Enum<typeof SKActionTimingMode>;

  speed: number;

  reversedAction(): SKAction;

  static moveByDuration(delta: CGVector, duration: number): SKAction;

  static moveByXYDuration(deltaX: number, deltaY: number, duration: number): SKAction;

  static moveToDuration(location: CGPoint, duration: number): SKAction;

  static moveToXDuration(x: number, duration: number): SKAction;

  static moveToYDuration(y: number, duration: number): SKAction;

  static rotateByAngleDuration(radians: number, duration: number): SKAction;

  static rotateToAngleDuration(radians: number, duration: number): SKAction;

  static rotateToAngleDurationShortestUnitArc(radians: number, duration: number, shortestUnitArc: boolean): SKAction;

  static resizeByWidthHeightDuration(width: number, height: number, duration: number): SKAction;

  static resizeToWidthHeightDuration(width: number, height: number, duration: number): SKAction;

  static resizeToWidthDuration(width: number, duration: number): SKAction;

  static resizeToHeightDuration(height: number, duration: number): SKAction;

  static scaleByDuration(scale: number, duration: number): SKAction;

  static scaleXByYDuration(xScale: number, yScale: number, duration: number): SKAction;

  static scaleToDuration(scale: number, duration: number): SKAction;

  static scaleXToYDuration(xScale: number, yScale: number, duration: number): SKAction;

  static scaleXToDuration(scale: number, duration: number): SKAction;

  static scaleYToDuration(scale: number, duration: number): SKAction;

  static sequence(actions: NSArray<interop.Object> | Array<interop.Object>): SKAction;

  static group(actions: NSArray<interop.Object> | Array<interop.Object>): SKAction;

  static repeatActionCount(action: SKAction, count: number): SKAction;

  static repeatActionForever(action: SKAction): SKAction;

  static fadeInWithDuration(duration: number): SKAction;

  static fadeOutWithDuration(duration: number): SKAction;

  static fadeAlphaByDuration(factor: number, duration: number): SKAction;

  static fadeAlphaToDuration(alpha: number, duration: number): SKAction;

  static animateWithTexturesTimePerFrame(textures: NSArray<interop.Object> | Array<interop.Object>, sec: number): SKAction;

  static animateWithTexturesTimePerFrameResizeRestore(textures: NSArray<interop.Object> | Array<interop.Object>, sec: number, resize: boolean, restore: boolean): SKAction;

  static playSoundFileNamedWaitForCompletion(soundFile: string, wait: boolean): SKAction;

  static colorizeWithColorColorBlendFactorDuration(color: interop.Object, colorBlendFactor: number, duration: number): SKAction;

  static colorizeWithColorBlendFactorDuration(colorBlendFactor: number, sec: number): SKAction;

  static followPathDuration(path: interop.PointerConvertible, duration: number): SKAction;

  static followPathAsOffsetOrientToPathDuration(path: interop.PointerConvertible, offset: boolean, orient: boolean, duration: number): SKAction;

  static followPathSpeed(path: interop.PointerConvertible, speed: number): SKAction;

  static followPathAsOffsetOrientToPathSpeed(path: interop.PointerConvertible, offset: boolean, orient: boolean, speed: number): SKAction;

  static speedByDuration(speed: number, duration: number): SKAction;

  static speedToDuration(speed: number, duration: number): SKAction;

  static waitForDuration(duration: number): SKAction;

  static waitForDurationWithRange(duration: number, durationRange: number): SKAction;

  static removeFromParent(): SKAction;

  static performSelectorOnTarget(selector: string, target: interop.Object): SKAction;

  static runBlock(block: () => void): SKAction;

  static runBlockQueue(block: () => void, queue: interop.Object): SKAction;

  static runActionOnChildWithName(action: SKAction, name: string): SKAction;

  static customActionWithDurationActionBlock(duration: number, block: (p1: SKNode, p2: number) => void): SKAction;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SKPhysicsBody extends NSObject implements NSCopying, NSSecureCoding {
  static bodyWithCircleOfRadius(r: number): SKPhysicsBody;

  static bodyWithCircleOfRadiusCenter(r: number, center: CGPoint): SKPhysicsBody;

  static bodyWithRectangleOfSize(s: CGSize): SKPhysicsBody;

  static bodyWithRectangleOfSizeCenter(s: CGSize, center: CGPoint): SKPhysicsBody;

  static bodyWithPolygonFromPath(path: interop.PointerConvertible): SKPhysicsBody;

  static bodyWithEdgeFromPointToPoint(p1: CGPoint, p2: CGPoint): SKPhysicsBody;

  static bodyWithEdgeChainFromPath(path: interop.PointerConvertible): SKPhysicsBody;

  static bodyWithEdgeLoopFromPath(path: interop.PointerConvertible): SKPhysicsBody;

  static bodyWithEdgeLoopFromRect(rect: CGRect): SKPhysicsBody;

  static bodyWithBodies(bodies: NSArray<interop.Object> | Array<interop.Object>): SKPhysicsBody;

  isDynamic: boolean;

  usesPreciseCollisionDetection: boolean;

  allowsRotation: boolean;

  isResting: boolean;

  friction: number;

  restitution: number;

  linearDamping: number;

  angularDamping: number;

  density: number;

  mass: number;

  readonly area: number;

  affectedByGravity: boolean;

  categoryBitMask: number;

  collisionBitMask: number;

  contactTestBitMask: number;

  readonly joints: NSArray;

  readonly node: SKNode;

  velocity: CGVector;

  angularVelocity: number;

  applyForce(force: CGVector): void;

  applyForceAtPoint(force: CGVector, point: CGPoint): void;

  applyTorque(torque: number): void;

  applyImpulse(impulse: CGVector): void;

  applyImpulseAtPoint(impulse: CGVector, point: CGPoint): void;

  applyAngularImpulse(impulse: number): void;

  allContactedBodies(): NSArray;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class SKEffectNode extends SKNode implements SKWarpable {
  filter: interop.Object;

  shouldCenterFilter: boolean;

  shouldEnableEffects: boolean;

  shouldRasterize: boolean;

  blendMode: interop.Enum<typeof SKBlendMode>;

  shader: interop.Object;

  warpGeometry: interop.Object;

  subdivisionLevels: number;

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

declare class SKPhysicsJointFixed extends SKPhysicsJoint {
  static jointWithBodyABodyBAnchor(bodyA: SKPhysicsBody, bodyB: SKPhysicsBody, anchor: CGPoint): SKPhysicsJointFixed;
}

declare class SKTransition extends NSObject implements NSCopying {
  static crossFadeWithDuration(sec: number): SKTransition;

  static fadeWithDuration(sec: number): SKTransition;

  static fadeWithColorDuration(color: interop.Object, sec: number): SKTransition;

  static flipHorizontalWithDuration(sec: number): SKTransition;

  static flipVerticalWithDuration(sec: number): SKTransition;

  static revealWithDirectionDuration(direction: interop.Enum<typeof SKTransitionDirection>, sec: number): SKTransition;

  static moveInWithDirectionDuration(direction: interop.Enum<typeof SKTransitionDirection>, sec: number): SKTransition;

  static pushWithDirectionDuration(direction: interop.Enum<typeof SKTransitionDirection>, sec: number): SKTransition;

  static doorsOpenHorizontalWithDuration(sec: number): SKTransition;

  static doorsOpenVerticalWithDuration(sec: number): SKTransition;

  static doorsCloseHorizontalWithDuration(sec: number): SKTransition;

  static doorsCloseVerticalWithDuration(sec: number): SKTransition;

  static doorwayWithDuration(sec: number): SKTransition;

  static transitionWithCIFilterDuration(filter: interop.Object, sec: number): SKTransition;

  pausesIncomingScene: boolean;

  pausesOutgoingScene: boolean;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class SKShapeNode extends SKNode {
  get path(): interop.Pointer;
  set path(value: interop.PointerConvertible);

  strokeColor: interop.Object;

  fillColor: interop.Object;

  blendMode: interop.Enum<typeof SKBlendMode>;

  isAntialiased: boolean;

  lineWidth: number;

  glowWidth: number;

  lineCap: interop.Enum<typeof CGLineCap>;

  lineJoin: interop.Enum<typeof CGLineJoin>;

  miterLimit: number;

  readonly lineLength: number;
}

declare class SKScene extends SKEffectNode {
  initWithSize(size: CGSize): this;

  static sceneWithSize<This extends abstract new (...args: any) => any>(this: This, size: CGSize): InstanceType<This>;

  size: CGSize;

  scaleMode: interop.Enum<typeof SKSceneScaleMode>;

  backgroundColor: interop.Object;

  anchorPoint: CGPoint;

  readonly physicsWorld: SKPhysicsWorld;

  readonly view: SKView;

  convertPointFromView(point: CGPoint): CGPoint;

  convertPointToView(point: CGPoint): CGPoint;

  update(currentTime: number): void;

  didEvaluateActions(): void;

  didSimulatePhysics(): void;

  didMoveToView(view: SKView): void;

  willMoveFromView(view: SKView): void;

  didChangeSize(oldSize: CGSize): void;
}

declare class SKKeyframeSequence extends NSObject implements NSSecureCoding, NSCopying {
  initWithKeyframeValuesTimes(values: NSArray<interop.Object> | Array<interop.Object>, times: NSArray<interop.Object> | Array<interop.Object>): this;

  initWithCapacity(numItems: number): this;

  initWithCoder(aDecoder: NSCoder): this;

  count(): number;

  addKeyframeValueTime(value: interop.Object, time: number): void;

  removeLastKeyframe(): void;

  removeKeyframeAtIndex(index: number): void;

  setKeyframeValueForIndex(value: interop.Object, index: number): void;

  setKeyframeTimeForIndex(time: number, index: number): void;

  setKeyframeValueTimeForIndex(value: interop.Object, time: number, index: number): void;

  getKeyframeValueForIndex(index: number): interop.Object;

  getKeyframeTimeForIndex(index: number): number;

  sampleAtTime(time: number): interop.Object;

  interpolationMode: interop.Enum<typeof SKInterpolationMode>;

  repeatMode: interop.Enum<typeof SKRepeatMode>;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}


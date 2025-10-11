/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const kCAMediaTimingFunctionEaseIn: string;

declare const kCATransactionAnimationDuration: string;

declare const kCAValueFunctionTranslateY: string;

declare const kCAValueFunctionTranslate: string;

declare const kCAValueFunctionScale: string;

declare const kCAValueFunctionRotateZ: string;

declare const kCAValueFunctionRotateX: string;

declare const kCATransactionDisableActions: string;

declare const kCAAlignmentCenter: string;

declare const kCAAlignmentRight: string;

declare const kCAAlignmentLeft: string;

declare const kCAAlignmentNatural: string;

declare const kCALineJoinRound: string;

declare const kCAFillRuleNonZero: string;

declare const kCAScrollHorizontally: string;

declare const kCAGradientLayerRadial: string;

declare const kCAMediaTimingFunctionEaseInEaseOut: string;

declare const kCAMediaTimingFunctionEaseOut: string;

declare const kCAEmitterLayerBackToFront: string;

declare const kCAEmitterLayerOldestLast: string;

declare const kCAEmitterLayerOutline: string;

declare const kCAEmitterLayerCircle: string;

declare const kCAEmitterLayerCuboid: string;

declare const kCAEmitterLayerLine: string;

declare const kCATransitionFromTop: string;

declare const kCATransitionFromLeft: string;

declare const kCATransitionFade: string;

declare const kCAAnimationCubicPaced: string;

declare const CAFrameRateRangeDefault: CAFrameRateRange;

declare const kCAScrollNone: string;

declare const kCACornerCurveCircular: string;

declare const kCAContentsFormatGray8Uint: string;

declare const kCAContentsFormatRGBA8Uint: string;

declare const kCAGravityResizeAspect: string;

declare const kCAGravityBottomRight: string;

declare const kCAGravityBottomLeft: string;

declare const kCAGravityRight: string;

declare const kCAGravityLeft: string;

declare const kCAGravityBottom: string;

declare const kCAGravityCenter: string;

declare const CADynamicRangeHigh: string;

declare const CADynamicRangeConstrainedHigh: string;

declare const CADynamicRangeAutomatic: string;

declare const CAToneMapModeAutomatic: string;

declare const kCAFillModeRemoved: string;

declare const kCAFillModeBackwards: string;

declare const kCAEmitterLayerSphere: string;

declare const CADynamicRangeStandard: string;

declare const kCAGravityTop: string;

declare const CAToneMapModeNever: string;

declare const kCAEmitterLayerAdditive: string;

declare const kCALineCapButt: string;

declare const kCATruncationStart: string;

declare const kCAEmitterLayerSurface: string;

declare const kCATransitionFromBottom: string;

declare const kCAMediaTimingFunctionLinear: string;

declare const kCAAnimationPaced: string;

declare const kCATransitionMoveIn: string;

declare const kCAFillRuleEvenOdd: string;

declare const kCAGravityTopRight: string;

declare const kCALineCapSquare: string;

declare const kCAOnOrderOut: string;

declare const kCAScrollBoth: string;

declare const kCATruncationNone: string;

declare const kCAAlignmentJustified: string;

declare const kCAValueFunctionScaleZ: string;

declare const kCAValueFunctionScaleY: string;

declare const kCAEmitterLayerPoints: string;

declare const kCATransactionAnimationTimingFunction: string;

declare const kCALineCapRound: string;

declare const kCATransitionReveal: string;

declare const kCATransactionCompletionBlock: string;

declare const kCAScrollVertically: string;

declare const kCAEmitterLayerUnordered: string;

declare const kCALineJoinBevel: string;

declare const kCATruncationEnd: string;

declare const kCACornerCurveContinuous: string;

declare const kCAGradientLayerConic: string;

declare const kCAFilterLinear: string;

declare const kCAAnimationLinear: string;

declare const kCAGradientLayerAxial: string;

declare const kCATruncationMiddle: string;

declare const kCAEmitterLayerVolume: string;

declare const kCAOnOrderIn: string;

declare const kCAGravityResize: string;

declare const kCAContentsFormatRGBA16Float: string;

declare const kCALineJoinMiter: string;

declare const kCAEmitterLayerOldestFirst: string;

declare const kCATransitionPush: string;

declare const kCAGravityTopLeft: string;

declare const kCAFillModeForwards: string;

declare const kCAValueFunctionScaleX: string;

declare const kCAGravityResizeAspectFill: string;

declare const kCAAnimationCubic: string;

declare const kCAAnimationRotateAuto: string;

declare const kCARendererMetalCommandQueue: string;

declare const kCAContentsFormatAutomatic: string;

declare const kCAFilterNearest: string;

declare const kCAEmitterLayerRectangle: string;

declare const kCAFillModeBoth: string;

declare const kCAValueFunctionRotateY: string;

declare const kCAFilterTrilinear: string;

declare const kCAValueFunctionTranslateZ: string;

declare const kCAAnimationRotateAutoReverse: string;

declare const kCAEmitterLayerPoint: string;

declare const kCAValueFunctionTranslateX: string;

declare const CAToneMapModeIfSupported: string;

declare const kCAMediaTimingFunctionDefault: string;

declare const kCATransitionFromRight: string;

declare const kCATransition: string;

declare const CATransform3DIdentity: CATransform3D;

declare const kCAAnimationDiscrete: string;

declare const kCARendererColorSpace: string;

declare const CACornerMask: {
  MinXMin: 1,
  MaxXMin: 2,
  MinXMax: 4,
  MaxXMax: 8,
};

declare const CAEdgeAntialiasingMask: {
  Left: 1,
  Right: 2,
  Bottom: 4,
  Top: 8,
};

declare const CAConstraintAttribute: {
  MinX: 0,
  MidX: 1,
  MaxX: 2,
  Width: 3,
  MinY: 4,
  MidY: 5,
  MaxY: 6,
  Height: 7,
};

declare const CAAutoresizingMask: {
  NotSizable: 0,
  MinXMargin: 1,
  WidthSizable: 2,
  MaxXMargin: 4,
  MinYMargin: 8,
  HeightSizable: 16,
  MaxYMargin: 32,
};

declare class CATransform3D {
  constructor(init?: CATransform3D);
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

declare class CAFrameRateRange {
  constructor(init?: CAFrameRateRange);
  minimum: number;
  maximum: number;
  preferred: number;
}

declare function CACurrentMediaTime(): number;

declare function CATransform3DIsIdentity(t: CATransform3D): boolean;

declare function CATransform3DEqualToTransform(a: CATransform3D, b: CATransform3D): boolean;

declare function CATransform3DMakeTranslation(tx: number, ty: number, tz: number): CATransform3D;

declare function CATransform3DMakeScale(sx: number, sy: number, sz: number): CATransform3D;

declare function CATransform3DMakeRotation(angle: number, x: number, y: number, z: number): CATransform3D;

declare function CATransform3DTranslate(t: CATransform3D, tx: number, ty: number, tz: number): CATransform3D;

declare function CATransform3DScale(t: CATransform3D, sx: number, sy: number, sz: number): CATransform3D;

declare function CATransform3DRotate(t: CATransform3D, angle: number, x: number, y: number, z: number): CATransform3D;

declare function CATransform3DConcat(a: CATransform3D, b: CATransform3D): CATransform3D;

declare function CATransform3DInvert(t: CATransform3D): CATransform3D;

declare function CATransform3DMakeAffineTransform(m: CGAffineTransform): CATransform3D;

declare function CATransform3DIsAffine(t: CATransform3D): boolean;

declare function CATransform3DGetAffineTransform(t: CATransform3D): CGAffineTransform;

declare function CAFrameRateRangeMake(minimum: number, maximum: number, preferred: number): CAFrameRateRange;

declare function CAFrameRateRangeIsEqualToRange(range: CAFrameRateRange, other: CAFrameRateRange): boolean;

declare interface CAMetalDisplayLinkDelegate {
  metalDisplayLinkNeedsUpdate(link: CAMetalDisplayLink, update: CAMetalDisplayLinkUpdate): void;
}

declare class CAMetalDisplayLinkDelegate extends NativeObject implements CAMetalDisplayLinkDelegate {
}

declare interface CALayoutManager extends NSObjectProtocol {
  preferredSizeOfLayer?(layer: CALayer): CGSize;

  invalidateLayoutOfLayer?(layer: CALayer): void;

  layoutSublayersOfLayer?(layer: CALayer): void;
}

declare class CALayoutManager extends NativeObject implements CALayoutManager {
}

declare interface CAAnimationDelegate extends NSObjectProtocol {
  animationDidStart?(anim: CAAnimation): void;

  animationDidStopFinished?(anim: CAAnimation, flag: boolean): void;
}

declare class CAAnimationDelegate extends NativeObject implements CAAnimationDelegate {
}

declare interface CAMetalDrawable extends MTLDrawable {
  readonly texture: MTLTexture;

  readonly layer: CAMetalLayer;
}

declare class CAMetalDrawable extends NativeObject implements CAMetalDrawable {
}

declare interface CALayerDelegate extends NSObjectProtocol {
  displayLayer?(layer: CALayer): void;

  drawLayerInContext?(layer: CALayer, ctx: interop.Object): void;

  layerWillDraw?(layer: CALayer): void;

  layoutSublayersOfLayer?(layer: CALayer): void;

  actionForLayerForKey?(layer: CALayer, event: string): CAAction;
}

declare class CALayerDelegate extends NativeObject implements CALayerDelegate {
}

declare interface CAAction {
  runActionForKeyObjectArguments(event: string, anObject: interop.Object, dict: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): void;
}

declare class CAAction extends NativeObject implements CAAction {
}

declare interface CAMediaTiming {
  beginTime: number;

  duration: number;

  speed: number;

  timeOffset: number;

  repeatCount: number;

  repeatDuration: number;

  autoreverses: boolean;

  fillMode: string;

  setBeginTime(beginTime: number): void;

  setDuration(duration: number): void;

  setSpeed(speed: number): void;

  setTimeOffset(timeOffset: number): void;

  setRepeatCount(repeatCount: number): void;

  setRepeatDuration(repeatDuration: number): void;

  setAutoreverses(autoreverses: boolean): void;

  setFillMode(fillMode: string): void;
}

declare class CAMediaTiming extends NativeObject implements CAMediaTiming {
}

declare class CAMetalDisplayLinkUpdate extends NSObject {
  readonly drawable: CAMetalDrawable;

  readonly targetTimestamp: number;

  readonly targetPresentationTimestamp: number;
}

declare class CAGradientLayer extends CALayer {
  get colors(): NSArray;
  set colors(value: NSArray<interop.Object> | Array<interop.Object>);

  get locations(): NSArray;
  set locations(value: NSArray<interop.Object> | Array<interop.Object>);

  startPoint: CGPoint;

  endPoint: CGPoint;

  type: string;

  setColors(colors: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setLocations(locations: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setStartPoint(startPoint: CGPoint): void;

  setEndPoint(endPoint: CGPoint): void;

  setType(type: string): void;
}

declare class CAMetalLayer extends CALayer {
  device: MTLDevice;

  readonly preferredDevice: MTLDevice;

  pixelFormat: interop.Enum<typeof MTLPixelFormat>;

  framebufferOnly: boolean;

  drawableSize: CGSize;

  nextDrawable(): CAMetalDrawable;

  maximumDrawableCount: number;

  presentsWithTransaction: boolean;

  colorspace: interop.Object;

  wantsExtendedDynamicRangeContent: boolean;

  EDRMetadata: CAEDRMetadata;

  displaySyncEnabled: boolean;

  allowsNextDrawableTimeout: boolean;

  get developerHUDProperties(): NSDictionary;
  set developerHUDProperties(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  readonly residencySet: MTLResidencySet;

  setDevice(device: MTLDevice | null): void;

  setPixelFormat(pixelFormat: interop.Enum<typeof MTLPixelFormat>): void;

  setFramebufferOnly(framebufferOnly: boolean): void;

  setDrawableSize(drawableSize: CGSize): void;

  setMaximumDrawableCount(maximumDrawableCount: number): void;

  setPresentsWithTransaction(presentsWithTransaction: boolean): void;

  setColorspace(colorspace: interop.Object | null): void;

  setWantsExtendedDynamicRangeContent(wantsExtendedDynamicRangeContent: boolean): void;

  setEDRMetadata(EDRMetadata: CAEDRMetadata | null): void;

  setDisplaySyncEnabled(displaySyncEnabled: boolean): void;

  setAllowsNextDrawableTimeout(allowsNextDrawableTimeout: boolean): void;

  setDeveloperHUDProperties(developerHUDProperties: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;
}

declare class CATiledLayer extends CALayer {
  static fadeDuration(): number;

  levelsOfDetail: number;

  levelsOfDetailBias: number;

  tileSize: CGSize;

  setLevelsOfDetail(levelsOfDetail: number): void;

  setLevelsOfDetailBias(levelsOfDetailBias: number): void;

  setTileSize(tileSize: CGSize): void;
}

declare class CARemoteLayerClient extends NSObject {
  initWithServerPort(port: number): this;

  invalidate(): void;

  readonly clientId: number;

  layer: CALayer;

  setLayer(layer: CALayer | null): void;
}

declare class CAConstraint extends NSObject implements NSSecureCoding {
  static constraintWithAttributeRelativeToAttributeScaleOffset<This extends abstract new (...args: any) => any>(this: This, attr: interop.Enum<typeof CAConstraintAttribute>, srcId: string, srcAttr: interop.Enum<typeof CAConstraintAttribute>, m: number, c: number): InstanceType<This>;

  static constraintWithAttributeRelativeToAttributeOffset<This extends abstract new (...args: any) => any>(this: This, attr: interop.Enum<typeof CAConstraintAttribute>, srcId: string, srcAttr: interop.Enum<typeof CAConstraintAttribute>, c: number): InstanceType<This>;

  static constraintWithAttributeRelativeToAttribute<This extends abstract new (...args: any) => any>(this: This, attr: interop.Enum<typeof CAConstraintAttribute>, srcId: string, srcAttr: interop.Enum<typeof CAConstraintAttribute>): InstanceType<This>;

  initWithAttributeRelativeToAttributeScaleOffset(attr: interop.Enum<typeof CAConstraintAttribute>, srcId: string, srcAttr: interop.Enum<typeof CAConstraintAttribute>, m: number, c: number): this;

  readonly attribute: interop.Enum<typeof CAConstraintAttribute>;

  readonly sourceName: string;

  readonly sourceAttribute: interop.Enum<typeof CAConstraintAttribute>;

  readonly scale: number;

  readonly offset: number;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CAKeyframeAnimation extends CAPropertyAnimation {
  get values(): NSArray;
  set values(value: NSArray<interop.Object> | Array<interop.Object>);

  path: interop.Object;

  get keyTimes(): NSArray;
  set keyTimes(value: NSArray<interop.Object> | Array<interop.Object>);

  get timingFunctions(): NSArray;
  set timingFunctions(value: NSArray<interop.Object> | Array<interop.Object>);

  calculationMode: string;

  get tensionValues(): NSArray;
  set tensionValues(value: NSArray<interop.Object> | Array<interop.Object>);

  get continuityValues(): NSArray;
  set continuityValues(value: NSArray<interop.Object> | Array<interop.Object>);

  get biasValues(): NSArray;
  set biasValues(value: NSArray<interop.Object> | Array<interop.Object>);

  rotationMode: string;

  setValues(values: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setPath(path: interop.Object | null): void;

  setKeyTimes(keyTimes: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setTimingFunctions(timingFunctions: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setCalculationMode(calculationMode: string): void;

  setTensionValues(tensionValues: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setContinuityValues(continuityValues: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setBiasValues(biasValues: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setRotationMode(rotationMode: string | null): void;
}

declare class CAEDRMetadata extends NSObject implements NSCopying, NSSecureCoding {
  static HDR10MetadataWithDisplayInfoContentInfoOpticalOutputScale(displayData: NSData | null, contentData: NSData | null, scale: number): CAEDRMetadata;

  static HDR10MetadataWithMinLuminanceMaxLuminanceOpticalOutputScale(minNits: number, maxNits: number, scale: number): CAEDRMetadata;

  static HLGMetadataWithAmbientViewingEnvironment(data: NSData): CAEDRMetadata;

  static readonly HLGMetadata: CAEDRMetadata;

  static readonly available: boolean;

  static isAvailable(): boolean;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CAMetalDisplayLink extends NSObject {
  initWithMetalLayer(layer: CAMetalLayer): this;

  addToRunLoopForMode(runloop: NSRunLoop, mode: string): void;

  removeFromRunLoopForMode(runloop: NSRunLoop, mode: string): void;

  invalidate(): void;

  delegate: CAMetalDisplayLinkDelegate;

  preferredFrameLatency: number;

  preferredFrameRateRange: CAFrameRateRange;

  paused: boolean;

  setDelegate(delegate: CAMetalDisplayLinkDelegate | null): void;

  setPreferredFrameLatency(preferredFrameLatency: number): void;

  setPreferredFrameRateRange(preferredFrameRateRange: CAFrameRateRange): void;

  isPaused(): boolean;

  setPaused(paused: boolean): void;
}

declare class CABasicAnimation extends CAPropertyAnimation {
  fromValue: interop.Object;

  toValue: interop.Object;

  byValue: interop.Object;

  setFromValue(fromValue: interop.Object | null): void;

  setToValue(toValue: interop.Object | null): void;

  setByValue(byValue: interop.Object | null): void;
}

declare class CATransformLayer extends CALayer {
}

declare class CAReplicatorLayer extends CALayer {
  instanceCount: number;

  preservesDepth: boolean;

  instanceDelay: number;

  instanceTransform: CATransform3D;

  instanceColor: interop.Object;

  instanceRedOffset: number;

  instanceGreenOffset: number;

  instanceBlueOffset: number;

  instanceAlphaOffset: number;

  setInstanceCount(instanceCount: number): void;

  setPreservesDepth(preservesDepth: boolean): void;

  setInstanceDelay(instanceDelay: number): void;

  setInstanceTransform(instanceTransform: CATransform3D): void;

  setInstanceColor(instanceColor: interop.Object | null): void;

  setInstanceRedOffset(instanceRedOffset: number): void;

  setInstanceGreenOffset(instanceGreenOffset: number): void;

  setInstanceBlueOffset(instanceBlueOffset: number): void;

  setInstanceAlphaOffset(instanceAlphaOffset: number): void;
}

declare class CARenderer extends NSObject {
  static rendererWithCGLContextOptions(ctx: interop.PointerConvertible, dict: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): CARenderer;

  static rendererWithMTLTextureOptions(tex: MTLTexture, dict: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): CARenderer;

  layer: CALayer;

  bounds: CGRect;

  beginFrameAtTimeTimeStamp(t: number, ts: interop.PointerConvertible): void;

  updateBounds(): CGRect;

  addUpdateRect(r: CGRect): void;

  render(): void;

  nextFrameTime(): number;

  endFrame(): void;

  setDestination(tex: MTLTexture): void;

  setLayer(layer: CALayer | null): void;

  setBounds(bounds: CGRect): void;
}

declare class CATransition extends CAAnimation {
  type: string;

  subtype: string;

  startProgress: number;

  endProgress: number;

  filter: interop.Object;

  setType(type: string): void;

  setSubtype(subtype: string | null): void;

  setStartProgress(startProgress: number): void;

  setEndProgress(endProgress: number): void;

  setFilter(filter: interop.Object): void;
}

declare class CAScrollLayer extends CALayer {
  scrollToPoint(p: CGPoint): void;

  scrollToRect(r: CGRect): void;

  scrollMode: string;

  setScrollMode(scrollMode: string): void;
}

declare class CAShapeLayer extends CALayer {
  path: interop.Object;

  fillColor: interop.Object;

  fillRule: string;

  strokeColor: interop.Object;

  strokeStart: number;

  strokeEnd: number;

  lineWidth: number;

  miterLimit: number;

  lineCap: string;

  lineJoin: string;

  lineDashPhase: number;

  get lineDashPattern(): NSArray;
  set lineDashPattern(value: NSArray<interop.Object> | Array<interop.Object>);

  setPath(path: interop.Object | null): void;

  setFillColor(fillColor: interop.Object | null): void;

  setFillRule(fillRule: string): void;

  setStrokeColor(strokeColor: interop.Object | null): void;

  setStrokeStart(strokeStart: number): void;

  setStrokeEnd(strokeEnd: number): void;

  setLineWidth(lineWidth: number): void;

  setMiterLimit(miterLimit: number): void;

  setLineCap(lineCap: string): void;

  setLineJoin(lineJoin: string): void;

  setLineDashPhase(lineDashPhase: number): void;

  setLineDashPattern(lineDashPattern: NSArray<interop.Object> | Array<interop.Object> | null): void;
}

declare class CAMediaTimingFunction extends NSObject implements NSSecureCoding {
  static functionWithName<This extends abstract new (...args: any) => any>(this: This, name: string): InstanceType<This>;

  static functionWithControlPoints<This extends abstract new (...args: any) => any>(this: This, c1x: number, c1y: number, c2x: number, c2y: number): InstanceType<This>;

  initWithControlPoints(c1x: number, c1y: number, c2x: number, c2y: number): this;

  getControlPointAtIndexValues(idx: number, ptr: interop.PointerConvertible): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CADisplayLink extends NSObject {
  addToRunLoopForMode(runloop: NSRunLoop, mode: string): void;

  removeFromRunLoopForMode(runloop: NSRunLoop, mode: string): void;

  invalidate(): void;

  readonly timestamp: number;

  readonly duration: number;

  readonly targetTimestamp: number;

  paused: boolean;

  preferredFrameRateRange: CAFrameRateRange;

  isPaused(): boolean;

  setPaused(paused: boolean): void;

  setPreferredFrameRateRange(preferredFrameRateRange: CAFrameRateRange): void;
}

declare class CAPropertyAnimation extends CAAnimation {
  static animationWithKeyPath<This extends abstract new (...args: any) => any>(this: This, path: string | null): InstanceType<This>;

  keyPath: string;

  additive: boolean;

  cumulative: boolean;

  valueFunction: CAValueFunction;

  setKeyPath(keyPath: string | null): void;

  isAdditive(): boolean;

  setAdditive(additive: boolean): void;

  isCumulative(): boolean;

  setCumulative(cumulative: boolean): void;

  setValueFunction(valueFunction: CAValueFunction | null): void;
}

declare class CAOpenGLLayer extends CALayer {
  asynchronous: boolean;

  canDrawInCGLContextPixelFormatForLayerTimeDisplayTime(ctx: interop.PointerConvertible, pf: interop.PointerConvertible, t: number, ts: interop.PointerConvertible): boolean;

  drawInCGLContextPixelFormatForLayerTimeDisplayTime(ctx: interop.PointerConvertible, pf: interop.PointerConvertible, t: number, ts: interop.PointerConvertible): void;

  copyCGLPixelFormatForDisplayMask(mask: number): interop.Pointer;

  releaseCGLPixelFormat(pf: interop.PointerConvertible): void;

  copyCGLContextForPixelFormat(pf: interop.PointerConvertible): interop.Pointer;

  releaseCGLContext(ctx: interop.PointerConvertible): void;

  colorspace: interop.Object;

  wantsExtendedDynamicRangeContent: boolean;

  isAsynchronous(): boolean;

  setAsynchronous(asynchronous: boolean): void;

  setColorspace(colorspace: interop.Object | null): void;

  setWantsExtendedDynamicRangeContent(wantsExtendedDynamicRangeContent: boolean): void;
}

declare class CALayer extends NSObject implements NSSecureCoding, CAMediaTiming {
  static layer<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  init(): this;

  initWithLayer(layer: interop.Object): this;

  presentationLayer(): this;

  modelLayer(): this;

  static defaultValueForKey(key: string): interop.Object;

  static needsDisplayForKey(key: string): boolean;

  shouldArchiveValueForKey(key: string): boolean;

  bounds: CGRect;

  position: CGPoint;

  zPosition: number;

  anchorPoint: CGPoint;

  anchorPointZ: number;

  transform: CATransform3D;

  affineTransform(): CGAffineTransform;

  setAffineTransform(m: CGAffineTransform): void;

  frame: CGRect;

  hidden: boolean;

  doubleSided: boolean;

  geometryFlipped: boolean;

  contentsAreFlipped(): boolean;

  readonly superlayer: CALayer;

  removeFromSuperlayer(): void;

  get sublayers(): NSArray;
  set sublayers(value: NSArray<interop.Object> | Array<interop.Object>);

  addSublayer(layer: CALayer): void;

  insertSublayerAtIndex(layer: CALayer, idx: number): void;

  insertSublayerBelow(layer: CALayer, sibling: CALayer | null): void;

  insertSublayerAbove(layer: CALayer, sibling: CALayer | null): void;

  replaceSublayerWith(oldLayer: CALayer, newLayer: CALayer): void;

  sublayerTransform: CATransform3D;

  mask: CALayer;

  masksToBounds: boolean;

  convertPointFromLayer(p: CGPoint, l: CALayer | null): CGPoint;

  convertPointToLayer(p: CGPoint, l: CALayer | null): CGPoint;

  convertRectFromLayer(r: CGRect, l: CALayer | null): CGRect;

  convertRectToLayer(r: CGRect, l: CALayer | null): CGRect;

  convertTimeFromLayer(t: number, l: CALayer | null): number;

  convertTimeToLayer(t: number, l: CALayer | null): number;

  hitTest(p: CGPoint): CALayer;

  containsPoint(p: CGPoint): boolean;

  contents: interop.Object;

  contentsRect: CGRect;

  contentsGravity: string;

  contentsScale: number;

  contentsCenter: CGRect;

  contentsFormat: string;

  wantsExtendedDynamicRangeContent: boolean;

  toneMapMode: string;

  preferredDynamicRange: string;

  contentsHeadroom: number;

  minificationFilter: string;

  magnificationFilter: string;

  minificationFilterBias: number;

  opaque: boolean;

  display(): void;

  setNeedsDisplay(): void;

  setNeedsDisplayInRect(r: CGRect): void;

  needsDisplay(): boolean;

  displayIfNeeded(): void;

  needsDisplayOnBoundsChange: boolean;

  drawsAsynchronously: boolean;

  drawInContext(ctx: interop.Object): void;

  renderInContext(ctx: interop.Object): void;

  edgeAntialiasingMask: interop.Enum<typeof CAEdgeAntialiasingMask>;

  allowsEdgeAntialiasing: boolean;

  backgroundColor: interop.Object;

  cornerRadius: number;

  maskedCorners: interop.Enum<typeof CACornerMask>;

  cornerCurve: string;

  static cornerCurveExpansionFactor(curve: string): number;

  borderWidth: number;

  borderColor: interop.Object;

  opacity: number;

  allowsGroupOpacity: boolean;

  compositingFilter: interop.Object;

  get filters(): NSArray;
  set filters(value: NSArray<interop.Object> | Array<interop.Object>);

  get backgroundFilters(): NSArray;
  set backgroundFilters(value: NSArray<interop.Object> | Array<interop.Object>);

  shouldRasterize: boolean;

  rasterizationScale: number;

  shadowColor: interop.Object;

  shadowOpacity: number;

  shadowOffset: CGSize;

  shadowRadius: number;

  shadowPath: interop.Object;

  autoresizingMask: interop.Enum<typeof CAAutoresizingMask>;

  layoutManager: CALayoutManager;

  preferredFrameSize(): CGSize;

  setNeedsLayout(): void;

  needsLayout(): boolean;

  layoutIfNeeded(): void;

  layoutSublayers(): void;

  resizeSublayersWithOldSize(size: CGSize): void;

  resizeWithOldSuperlayerSize(size: CGSize): void;

  static defaultActionForKey(event: string): CAAction;

  actionForKey(event: string): CAAction;

  get actions(): NSDictionary;
  set actions(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  addAnimationForKey(anim: CAAnimation, key: string | null): void;

  removeAllAnimations(): void;

  removeAnimationForKey(key: string): void;

  animationKeys(): NSArray;

  animationForKey(key: string): CAAnimation;

  name: string;

  delegate: CALayerDelegate;

  get style(): NSDictionary;
  set style(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  setBounds(bounds: CGRect): void;

  setPosition(position: CGPoint): void;

  setZPosition(zPosition: number): void;

  setAnchorPoint(anchorPoint: CGPoint): void;

  setAnchorPointZ(anchorPointZ: number): void;

  setTransform(transform: CATransform3D): void;

  setFrame(frame: CGRect): void;

  isHidden(): boolean;

  setHidden(hidden: boolean): void;

  isDoubleSided(): boolean;

  setDoubleSided(doubleSided: boolean): void;

  isGeometryFlipped(): boolean;

  setGeometryFlipped(geometryFlipped: boolean): void;

  setSublayers(sublayers: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setSublayerTransform(sublayerTransform: CATransform3D): void;

  setMask(mask: CALayer | null): void;

  setMasksToBounds(masksToBounds: boolean): void;

  setContents(contents: interop.Object | null): void;

  setContentsRect(contentsRect: CGRect): void;

  setContentsGravity(contentsGravity: string): void;

  setContentsScale(contentsScale: number): void;

  setContentsCenter(contentsCenter: CGRect): void;

  setContentsFormat(contentsFormat: string): void;

  setWantsExtendedDynamicRangeContent(wantsExtendedDynamicRangeContent: boolean): void;

  setToneMapMode(toneMapMode: string): void;

  setPreferredDynamicRange(preferredDynamicRange: string): void;

  setContentsHeadroom(contentsHeadroom: number): void;

  setMinificationFilter(minificationFilter: string): void;

  setMagnificationFilter(magnificationFilter: string): void;

  setMinificationFilterBias(minificationFilterBias: number): void;

  isOpaque(): boolean;

  setOpaque(opaque: boolean): void;

  setNeedsDisplayOnBoundsChange(needsDisplayOnBoundsChange: boolean): void;

  setDrawsAsynchronously(drawsAsynchronously: boolean): void;

  setEdgeAntialiasingMask(edgeAntialiasingMask: interop.Enum<typeof CAEdgeAntialiasingMask>): void;

  setAllowsEdgeAntialiasing(allowsEdgeAntialiasing: boolean): void;

  setBackgroundColor(backgroundColor: interop.Object | null): void;

  setCornerRadius(cornerRadius: number): void;

  setMaskedCorners(maskedCorners: interop.Enum<typeof CACornerMask>): void;

  setCornerCurve(cornerCurve: string): void;

  setBorderWidth(borderWidth: number): void;

  setBorderColor(borderColor: interop.Object | null): void;

  setOpacity(opacity: number): void;

  setAllowsGroupOpacity(allowsGroupOpacity: boolean): void;

  setCompositingFilter(compositingFilter: interop.Object | null): void;

  setFilters(filters: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setBackgroundFilters(backgroundFilters: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setShouldRasterize(shouldRasterize: boolean): void;

  setRasterizationScale(rasterizationScale: number): void;

  setShadowColor(shadowColor: interop.Object | null): void;

  setShadowOpacity(shadowOpacity: number): void;

  setShadowOffset(shadowOffset: CGSize): void;

  setShadowRadius(shadowRadius: number): void;

  setShadowPath(shadowPath: interop.Object | null): void;

  setAutoresizingMask(autoresizingMask: interop.Enum<typeof CAAutoresizingMask>): void;

  setLayoutManager(layoutManager: CALayoutManager): void;

  setActions(actions: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): void;

  setName(name: string | null): void;

  setDelegate(delegate: CALayerDelegate | null): void;

  setStyle(style: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): void;

  get constraints(): NSArray;
  set constraints(value: NSArray<interop.Object> | Array<interop.Object>);

  addConstraint(c: CAConstraint): void;

  setConstraints(constraints: NSArray<interop.Object> | Array<interop.Object> | null): void;

  static layerWithRemoteClientId(client_id: number): CALayer;

  scrollPoint(p: CGPoint): void;

  scrollRectToVisible(r: CGRect): void;

  readonly visibleRect: CGRect;

  createRemoteLayerBoundTo(serverPort: number): NSObject;

  hostRemoteLayer(layerID: number): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  beginTime: number;

  duration: number;

  speed: number;

  timeOffset: number;

  repeatCount: number;

  repeatDuration: number;

  autoreverses: boolean;

  fillMode: string;

  setBeginTime(beginTime: number): void;

  setDuration(duration: number): void;

  setSpeed(speed: number): void;

  setTimeOffset(timeOffset: number): void;

  setRepeatCount(repeatCount: number): void;

  setRepeatDuration(repeatDuration: number): void;

  setAutoreverses(autoreverses: boolean): void;

  setFillMode(fillMode: string): void;
}

declare class CAEmitterLayer extends CALayer {
  get emitterCells(): NSArray;
  set emitterCells(value: NSArray<interop.Object> | Array<interop.Object>);

  birthRate: number;

  lifetime: number;

  emitterPosition: CGPoint;

  emitterZPosition: number;

  emitterSize: CGSize;

  emitterDepth: number;

  emitterShape: string;

  emitterMode: string;

  renderMode: string;

  preservesDepth: boolean;

  velocity: number;

  scale: number;

  spin: number;

  seed: number;

  setEmitterCells(emitterCells: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setBirthRate(birthRate: number): void;

  setLifetime(lifetime: number): void;

  setEmitterPosition(emitterPosition: CGPoint): void;

  setEmitterZPosition(emitterZPosition: number): void;

  setEmitterSize(emitterSize: CGSize): void;

  setEmitterDepth(emitterDepth: number): void;

  setEmitterShape(emitterShape: string): void;

  setEmitterMode(emitterMode: string): void;

  setRenderMode(renderMode: string): void;

  setPreservesDepth(preservesDepth: boolean): void;

  setVelocity(velocity: number): void;

  setScale(scale: number): void;

  setSpin(spin: number): void;

  setSeed(seed: number): void;
}

declare class CATransaction extends NSObject {
  static begin(): void;

  static commit(): void;

  static flush(): void;

  static lock(): void;

  static unlock(): void;

  static animationDuration(): number;

  static setAnimationDuration(dur: number): void;

  static animationTimingFunction(): CAMediaTimingFunction;

  static setAnimationTimingFunction(function$: CAMediaTimingFunction | null): void;

  static disableActions(): boolean;

  static setDisableActions(flag: boolean): void;

  static completionBlock(): () => void;

  static setCompletionBlock(block: () => void | null): void;

  static valueForKey(key: string): interop.Object;

  static setValueForKey(anObject: interop.Object | null, key: string): void;
}

declare class CARemoteLayerServer extends NSObject {
  static sharedServer(): CARemoteLayerServer;

  readonly serverPort: number;
}

declare class CASpringAnimation extends CABasicAnimation {
  mass: number;

  stiffness: number;

  damping: number;

  initialVelocity: number;

  allowsOverdamping: boolean;

  readonly settlingDuration: number;

  initWithPerceptualDurationBounce(perceptualDuration: number, bounce: number): this;

  readonly perceptualDuration: number;

  readonly bounce: number;

  setMass(mass: number): void;

  setStiffness(stiffness: number): void;

  setDamping(damping: number): void;

  setInitialVelocity(initialVelocity: number): void;

  setAllowsOverdamping(allowsOverdamping: boolean): void;
}

declare class CATextLayer extends CALayer {
  string: interop.Object;

  font: interop.Object;

  fontSize: number;

  foregroundColor: interop.Object;

  wrapped: boolean;

  truncationMode: string;

  alignmentMode: string;

  allowsFontSubpixelQuantization: boolean;

  setString(string: interop.Object | null): void;

  setFont(font: interop.Object | null): void;

  setFontSize(fontSize: number): void;

  setForegroundColor(foregroundColor: interop.Object | null): void;

  isWrapped(): boolean;

  setWrapped(wrapped: boolean): void;

  setTruncationMode(truncationMode: string): void;

  setAlignmentMode(alignmentMode: string): void;

  setAllowsFontSubpixelQuantization(allowsFontSubpixelQuantization: boolean): void;
}

declare class CAValueFunction extends NSObject implements NSSecureCoding {
  static functionWithName<This extends abstract new (...args: any) => any>(this: This, name: string): InstanceType<This>;

  readonly name: string;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CAEmitterCell extends NSObject implements NSSecureCoding, CAMediaTiming {
  static emitterCell<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  static defaultValueForKey(key: string): interop.Object;

  shouldArchiveValueForKey(key: string): boolean;

  name: string;

  enabled: boolean;

  birthRate: number;

  lifetime: number;

  lifetimeRange: number;

  emissionLatitude: number;

  emissionLongitude: number;

  emissionRange: number;

  velocity: number;

  velocityRange: number;

  xAcceleration: number;

  yAcceleration: number;

  zAcceleration: number;

  scale: number;

  scaleRange: number;

  scaleSpeed: number;

  spin: number;

  spinRange: number;

  color: interop.Object;

  redRange: number;

  greenRange: number;

  blueRange: number;

  alphaRange: number;

  redSpeed: number;

  greenSpeed: number;

  blueSpeed: number;

  alphaSpeed: number;

  contents: interop.Object;

  contentsRect: CGRect;

  contentsScale: number;

  minificationFilter: string;

  magnificationFilter: string;

  minificationFilterBias: number;

  get emitterCells(): NSArray;
  set emitterCells(value: NSArray<interop.Object> | Array<interop.Object>);

  get style(): NSDictionary;
  set style(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  setName(name: string | null): void;

  isEnabled(): boolean;

  setEnabled(enabled: boolean): void;

  setBirthRate(birthRate: number): void;

  setLifetime(lifetime: number): void;

  setLifetimeRange(lifetimeRange: number): void;

  setEmissionLatitude(emissionLatitude: number): void;

  setEmissionLongitude(emissionLongitude: number): void;

  setEmissionRange(emissionRange: number): void;

  setVelocity(velocity: number): void;

  setVelocityRange(velocityRange: number): void;

  setXAcceleration(xAcceleration: number): void;

  setYAcceleration(yAcceleration: number): void;

  setZAcceleration(zAcceleration: number): void;

  setScale(scale: number): void;

  setScaleRange(scaleRange: number): void;

  setScaleSpeed(scaleSpeed: number): void;

  setSpin(spin: number): void;

  setSpinRange(spinRange: number): void;

  setColor(color: interop.Object | null): void;

  setRedRange(redRange: number): void;

  setGreenRange(greenRange: number): void;

  setBlueRange(blueRange: number): void;

  setAlphaRange(alphaRange: number): void;

  setRedSpeed(redSpeed: number): void;

  setGreenSpeed(greenSpeed: number): void;

  setBlueSpeed(blueSpeed: number): void;

  setAlphaSpeed(alphaSpeed: number): void;

  setContents(contents: interop.Object | null): void;

  setContentsRect(contentsRect: CGRect): void;

  setContentsScale(contentsScale: number): void;

  setMinificationFilter(minificationFilter: string): void;

  setMagnificationFilter(magnificationFilter: string): void;

  setMinificationFilterBias(minificationFilterBias: number): void;

  setEmitterCells(emitterCells: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setStyle(style: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  beginTime: number;

  duration: number;

  speed: number;

  timeOffset: number;

  repeatCount: number;

  repeatDuration: number;

  autoreverses: boolean;

  fillMode: string;

  setBeginTime(beginTime: number): void;

  setDuration(duration: number): void;

  setSpeed(speed: number): void;

  setTimeOffset(timeOffset: number): void;

  setRepeatCount(repeatCount: number): void;

  setRepeatDuration(repeatDuration: number): void;

  setAutoreverses(autoreverses: boolean): void;

  setFillMode(fillMode: string): void;
}

declare class CAAnimation extends NSObject implements NSSecureCoding, NSCopying, CAMediaTiming, CAAction {
  static animation<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  static defaultValueForKey(key: string): interop.Object;

  shouldArchiveValueForKey(key: string): boolean;

  timingFunction: CAMediaTimingFunction;

  delegate: CAAnimationDelegate;

  removedOnCompletion: boolean;

  preferredFrameRateRange: CAFrameRateRange;

  setTimingFunction(timingFunction: CAMediaTimingFunction | null): void;

  setDelegate(delegate: CAAnimationDelegate | null): void;

  isRemovedOnCompletion(): boolean;

  setRemovedOnCompletion(removedOnCompletion: boolean): void;

  setPreferredFrameRateRange(preferredFrameRateRange: CAFrameRateRange): void;

  static animationWithSCNAnimation(animation: SCNAnimation): CAAnimation;

  usesSceneTimeBase: boolean;

  fadeInDuration: number;

  fadeOutDuration: number;

  get animationEvents(): NSArray;
  set animationEvents(value: NSArray<interop.Object> | Array<interop.Object>);

  setUsesSceneTimeBase(usesSceneTimeBase: boolean): void;

  setFadeInDuration(fadeInDuration: number): void;

  setFadeOutDuration(fadeOutDuration: number): void;

  setAnimationEvents(animationEvents: NSArray<interop.Object> | Array<interop.Object>): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  beginTime: number;

  duration: number;

  speed: number;

  timeOffset: number;

  repeatCount: number;

  repeatDuration: number;

  autoreverses: boolean;

  fillMode: string;

  setBeginTime(beginTime: number): void;

  setDuration(duration: number): void;

  setSpeed(speed: number): void;

  setTimeOffset(timeOffset: number): void;

  setRepeatCount(repeatCount: number): void;

  setRepeatDuration(repeatDuration: number): void;

  setAutoreverses(autoreverses: boolean): void;

  setFillMode(fillMode: string): void;

  runActionForKeyObjectArguments(event: string, anObject: interop.Object, dict: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): void;
}

declare class CAConstraintLayoutManager extends NSObject implements CALayoutManager {
  static layoutManager<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  preferredSizeOfLayer(layer: CALayer): CGSize;

  invalidateLayoutOfLayer(layer: CALayer): void;

  layoutSublayersOfLayer(layer: CALayer): void;

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

declare class CAAnimationGroup extends CAAnimation {
  get animations(): NSArray;
  set animations(value: NSArray<interop.Object> | Array<interop.Object>);

  setAnimations(animations: NSArray<interop.Object> | Array<interop.Object> | null): void;
}


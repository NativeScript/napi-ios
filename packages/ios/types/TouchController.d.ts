/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const TCGameControllerProductCategoryTouchController: string;

declare const TCThrottleOrientation: {
  Vertical: 0,
  Horizontal: 1,
};

declare const TCControlContentsDpadDirection: {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
};

declare const TCControlContentsButtonShape: {
  Circle: 0,
  Rect: 1,
};

declare const TCControlLabelRole: {
  Button: 0,
  DirectionPad: 1,
};

declare const TCColliderShape: {
  Circle: 0,
  Rect: 1,
  LeftSide: 2,
  RightSide: 3,
};

declare const TCControlLayoutAnchorCoordinateSystem: {
  Relative: 0,
  Absolute: 1,
};

declare const TCControlLayoutAnchor: {
  TopLeft: 0,
  TopCenter: 1,
  TopRight: 2,
  CenterLeft: 3,
  Center: 4,
  CenterRight: 5,
  BottomLeft: 6,
  BottomCenter: 7,
  BottomRight: 8,
};

declare const TCControlContentsDpadElementStyle: {
  Circle: 0,
  Pentagon: 1,
};

declare interface TCControl extends NSObjectProtocol, TCControlLayout {
  readonly label: TCControlLabel;

  readonly colliderShape: interop.Enum<typeof TCColliderShape>;

  readonly pressed: boolean;

  enabled: boolean;

  handleTouchBeganAtPoint(point: CGPoint): void;

  handleTouchMovedAtPoint(point: CGPoint): void;

  handleTouchEndedAtPoint(point: CGPoint): void;

  highlightDuration?: number;

  isPressed(): boolean;

  isEnabled(): boolean;

  setEnabled(enabled: boolean): void;

  setHighlightDuration?(highlightDuration: number): void;
}

declare class TCControl extends NativeObject implements TCControl {
}

declare interface TCControlLayout extends NSObjectProtocol {
  anchor: interop.Enum<typeof TCControlLayoutAnchor>;

  anchorCoordinateSystem: interop.Enum<typeof TCControlLayoutAnchorCoordinateSystem>;

  offset: CGPoint;

  zIndex: number;

  size: CGSize;

  readonly position: CGPoint;

  setAnchor(anchor: interop.Enum<typeof TCControlLayoutAnchor>): void;

  setAnchorCoordinateSystem(anchorCoordinateSystem: interop.Enum<typeof TCControlLayoutAnchorCoordinateSystem>): void;

  setOffset(offset: CGPoint): void;

  setZIndex(zIndex: number): void;

  setSize(size: CGSize): void;
}

declare class TCControlLayout extends NativeObject implements TCControlLayout {
}

declare class TCDirectionPadDescriptor extends NSObject {
  compositeLabel: TCControlLabel;

  upLabel: TCControlLabel;

  downLabel: TCControlLabel;

  leftLabel: TCControlLabel;

  rightLabel: TCControlLabel;

  upContents: TCControlContents;

  downContents: TCControlContents;

  leftContents: TCControlContents;

  rightContents: TCControlContents;

  anchor: interop.Enum<typeof TCControlLayoutAnchor>;

  anchorCoordinateSystem: interop.Enum<typeof TCControlLayoutAnchorCoordinateSystem>;

  offset: CGPoint;

  zIndex: number;

  size: CGSize;

  colliderShape: interop.Enum<typeof TCColliderShape>;

  highlightDuration: number;

  radial: boolean;

  digital: boolean;

  mutuallyExclusiveInput: boolean;

  init(): this;

  setCompositeLabel(compositeLabel: TCControlLabel | null): void;

  setUpLabel(upLabel: TCControlLabel | null): void;

  setDownLabel(downLabel: TCControlLabel | null): void;

  setLeftLabel(leftLabel: TCControlLabel | null): void;

  setRightLabel(rightLabel: TCControlLabel | null): void;

  setUpContents(upContents: TCControlContents | null): void;

  setDownContents(downContents: TCControlContents | null): void;

  setLeftContents(leftContents: TCControlContents | null): void;

  setRightContents(rightContents: TCControlContents | null): void;

  setAnchor(anchor: interop.Enum<typeof TCControlLayoutAnchor>): void;

  setAnchorCoordinateSystem(anchorCoordinateSystem: interop.Enum<typeof TCControlLayoutAnchorCoordinateSystem>): void;

  setOffset(offset: CGPoint): void;

  setZIndex(zIndex: number): void;

  setSize(size: CGSize): void;

  setColliderShape(colliderShape: interop.Enum<typeof TCColliderShape>): void;

  setHighlightDuration(highlightDuration: number): void;

  isRadial(): boolean;

  setRadial(radial: boolean): void;

  isDigital(): boolean;

  setDigital(digital: boolean): void;

  inputIsMutuallyExclusive(): boolean;

  setMutuallyExclusiveInput(mutuallyExclusiveInput: boolean): void;
}

declare class TCThumbstick extends NSObject implements TCControl, TCControlLayout {
  backgroundContents: TCControlContents;

  stickContents: TCControlContents;

  hidesWhenNotPressed: boolean;

  stickSize: CGSize;

  readonly colliderShape: interop.Enum<typeof TCColliderShape>;

  highlightDuration: number;

  setBackgroundContents(backgroundContents: TCControlContents | null): void;

  setStickContents(stickContents: TCControlContents | null): void;

  setHidesWhenNotPressed(hidesWhenNotPressed: boolean): void;

  setStickSize(stickSize: CGSize): void;

  setHighlightDuration(highlightDuration: number): void;

  readonly label: TCControlLabel;

  readonly pressed: boolean;

  enabled: boolean;

  handleTouchBeganAtPoint(point: CGPoint): void;

  handleTouchMovedAtPoint(point: CGPoint): void;

  handleTouchEndedAtPoint(point: CGPoint): void;

  isPressed(): boolean;

  isEnabled(): boolean;

  setEnabled(enabled: boolean): void;

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

  anchor: interop.Enum<typeof TCControlLayoutAnchor>;

  anchorCoordinateSystem: interop.Enum<typeof TCControlLayoutAnchorCoordinateSystem>;

  offset: CGPoint;

  zIndex: number;

  size: CGSize;

  readonly position: CGPoint;

  setAnchor(anchor: interop.Enum<typeof TCControlLayoutAnchor>): void;

  setAnchorCoordinateSystem(anchorCoordinateSystem: interop.Enum<typeof TCControlLayoutAnchorCoordinateSystem>): void;

  setOffset(offset: CGPoint): void;

  setZIndex(zIndex: number): void;

  setSize(size: CGSize): void;
}

declare class TCSwitchDescriptor extends NSObject {
  label: TCControlLabel;

  contents: TCControlContents;

  switchedOnContents: TCControlContents;

  anchor: interop.Enum<typeof TCControlLayoutAnchor>;

  anchorCoordinateSystem: interop.Enum<typeof TCControlLayoutAnchorCoordinateSystem>;

  offset: CGPoint;

  zIndex: number;

  size: CGSize;

  colliderShape: interop.Enum<typeof TCColliderShape>;

  highlightDuration: number;

  init(): this;

  setLabel(label: TCControlLabel): void;

  setContents(contents: TCControlContents | null): void;

  setSwitchedOnContents(switchedOnContents: TCControlContents | null): void;

  setAnchor(anchor: interop.Enum<typeof TCControlLayoutAnchor>): void;

  setAnchorCoordinateSystem(anchorCoordinateSystem: interop.Enum<typeof TCControlLayoutAnchorCoordinateSystem>): void;

  setOffset(offset: CGPoint): void;

  setZIndex(zIndex: number): void;

  setSize(size: CGSize): void;

  setColliderShape(colliderShape: interop.Enum<typeof TCColliderShape>): void;

  setHighlightDuration(highlightDuration: number): void;
}

declare class TCButton extends NSObject implements TCControl, TCControlLayout {
  contents: TCControlContents;

  highlightDuration: number;

  readonly colliderShape: interop.Enum<typeof TCColliderShape>;

  setContents(contents: TCControlContents | null): void;

  setHighlightDuration(highlightDuration: number): void;

  readonly label: TCControlLabel;

  readonly pressed: boolean;

  enabled: boolean;

  handleTouchBeganAtPoint(point: CGPoint): void;

  handleTouchMovedAtPoint(point: CGPoint): void;

  handleTouchEndedAtPoint(point: CGPoint): void;

  isPressed(): boolean;

  isEnabled(): boolean;

  setEnabled(enabled: boolean): void;

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

  anchor: interop.Enum<typeof TCControlLayoutAnchor>;

  anchorCoordinateSystem: interop.Enum<typeof TCControlLayoutAnchorCoordinateSystem>;

  offset: CGPoint;

  zIndex: number;

  size: CGSize;

  readonly position: CGPoint;

  setAnchor(anchor: interop.Enum<typeof TCControlLayoutAnchor>): void;

  setAnchorCoordinateSystem(anchorCoordinateSystem: interop.Enum<typeof TCControlLayoutAnchorCoordinateSystem>): void;

  setOffset(offset: CGPoint): void;

  setZIndex(zIndex: number): void;

  setSize(size: CGSize): void;
}

declare class TCControlLabel extends NSObject {
  static readonly buttonA: TCControlLabel;

  static readonly buttonB: TCControlLabel;

  static readonly buttonX: TCControlLabel;

  static readonly buttonY: TCControlLabel;

  static readonly buttonMenu: TCControlLabel;

  static readonly buttonOptions: TCControlLabel;

  static readonly buttonLeftShoulder: TCControlLabel;

  static readonly buttonLeftTrigger: TCControlLabel;

  static readonly buttonRightShoulder: TCControlLabel;

  static readonly buttonRightTrigger: TCControlLabel;

  static readonly leftThumbstick: TCControlLabel;

  static readonly leftThumbstickButton: TCControlLabel;

  static readonly rightThumbstick: TCControlLabel;

  static readonly rightThumbstickButton: TCControlLabel;

  static readonly directionPad: TCControlLabel;

  initWithNameRole(name: string, role: interop.Enum<typeof TCControlLabelRole>): this;

  readonly name: string;

  readonly role: interop.Enum<typeof TCControlLabelRole>;
}

declare class TCTouchControllerDescriptor extends NSObject {
  device: MTLDevice;

  size: CGSize;

  drawableSize: CGSize;

  colorPixelFormat: interop.Enum<typeof MTLPixelFormat>;

  depthAttachmentPixelFormat: interop.Enum<typeof MTLPixelFormat>;

  stencilAttachmentPixelFormat: interop.Enum<typeof MTLPixelFormat>;

  sampleCount: number;

  init(): this;

  initWithMTKView(mtkView: MTKView): this;

  setDevice(device: MTLDevice): void;

  setSize(size: CGSize): void;

  setDrawableSize(drawableSize: CGSize): void;

  setColorPixelFormat(colorPixelFormat: interop.Enum<typeof MTLPixelFormat>): void;

  setDepthAttachmentPixelFormat(depthAttachmentPixelFormat: interop.Enum<typeof MTLPixelFormat>): void;

  setStencilAttachmentPixelFormat(stencilAttachmentPixelFormat: interop.Enum<typeof MTLPixelFormat>): void;

  setSampleCount(sampleCount: number): void;
}

declare class TCControlContents extends NSObject {
  static contentsWithImages<This extends abstract new (...args: any) => any>(this: This, images: NSArray<interop.Object> | Array<interop.Object>): InstanceType<This>;

  static buttonContentsForSystemImageNamedSizeShapeController(imageName: string, size: CGSize, shape: interop.Enum<typeof TCControlContentsButtonShape>, controller: TCTouchController): TCControlContents;

  static switchedOnContentsForSystemImageNamedSizeShapeController(imageName: string, size: CGSize, shape: interop.Enum<typeof TCControlContentsButtonShape>, controller: TCTouchController): TCControlContents;

  static thumbstickStickContentsOfSizeController(size: CGSize, controller: TCTouchController): TCControlContents;

  static thumbstickBackgroundContentsOfSizeController(size: CGSize, controller: TCTouchController): TCControlContents;

  static throttleIndicatorContentsOfSizeController(size: CGSize, controller: TCTouchController): TCControlContents;

  static throttleBackgroundContentsOfSizeController(size: CGSize, controller: TCTouchController): TCControlContents;

  static directionPadContentsForLabelSizeStyleDirectionController(label: TCControlLabel, size: CGSize, style: interop.Enum<typeof TCControlContentsDpadElementStyle>, direction: interop.Enum<typeof TCControlContentsDpadDirection>, controller: TCTouchController): TCControlContents;

  readonly images: NSArray;
}

declare class TCTouchController extends NSObject {
  static readonly supported: boolean;

  readonly device: MTLDevice;

  readonly controls: NSArray;

  readonly buttons: NSArray;

  readonly switches: NSArray;

  readonly thumbsticks: NSArray;

  readonly directionPads: NSArray;

  readonly throttles: NSArray;

  readonly touchpads: NSArray;

  size: CGSize;

  drawableSize: CGSize;

  initWithDescriptor(descriptor: TCTouchControllerDescriptor): this;

  automaticallyLayoutControlsForLabels(labels: NSArray<interop.Object> | Array<interop.Object>): void;

  addButtonWithDescriptor(descriptor: TCButtonDescriptor): TCButton;

  addSwitchWithDescriptor(descriptor: TCSwitchDescriptor): TCSwitch;

  addThumbstickWithDescriptor(descriptor: TCThumbstickDescriptor): TCThumbstick;

  addDirectionPadWithDescriptor(descriptor: TCDirectionPadDescriptor): TCDirectionPad;

  addThrottleWithDescriptor(descriptor: TCThrottleDescriptor): TCThrottle;

  addTouchpadWithDescriptor(descriptor: TCTouchpadDescriptor): TCTouchpad;

  removeAllControls(): void;

  removeControl(control: TCControl): void;

  controlAtPoint(point: CGPoint): TCControl;

  handleTouchBeganAtPointIndex(point: CGPoint, index: number): boolean;

  handleTouchMovedAtPointIndex(point: CGPoint, index: number): boolean;

  handleTouchEndedAtPointIndex(point: CGPoint, index: number): boolean;

  renderUsingRenderCommandEncoder(encoder: MTLRenderCommandEncoder): void;

  readonly connected: boolean;

  connect(): void;

  disconnect(): void;

  readonly controller: GCController;

  static isSupported(): boolean;

  setSize(size: CGSize): void;

  setDrawableSize(drawableSize: CGSize): void;

  isConnected(): boolean;
}

declare class TCControlImage extends NSObject {
  initWithTextureSize(texture: MTLTexture, size: CGSize): this;

  initWithTextureSizeHighlightTextureOffsetTintColor(texture: MTLTexture, size: CGSize, highlightTexture: MTLTexture | null, offset: CGPoint, tintColor: interop.Object): this;

  initWithCGImageSizeDevice(cgImage: interop.Object, size: CGSize, device: MTLDevice): this;

  initWithUIImageSizeDevice(uiImage: UIImage, size: CGSize, device: MTLDevice): this;

  texture: MTLTexture;

  highlightTexture: MTLTexture;

  size: CGSize;

  offset: CGPoint;

  tintColor: interop.Object;

  setTexture(texture: MTLTexture): void;

  setHighlightTexture(highlightTexture: MTLTexture | null): void;

  setSize(size: CGSize): void;

  setOffset(offset: CGPoint): void;

  setTintColor(tintColor: interop.Object): void;
}

declare class TCThumbstickDescriptor extends NSObject {
  label: TCControlLabel;

  backgroundContents: TCControlContents;

  stickContents: TCControlContents;

  hidesWhenNotPressed: boolean;

  stickSize: CGSize;

  size: CGSize;

  anchor: interop.Enum<typeof TCControlLayoutAnchor>;

  anchorCoordinateSystem: interop.Enum<typeof TCControlLayoutAnchorCoordinateSystem>;

  offset: CGPoint;

  zIndex: number;

  colliderShape: interop.Enum<typeof TCColliderShape>;

  highlightDuration: number;

  init(): this;

  setLabel(label: TCControlLabel): void;

  setBackgroundContents(backgroundContents: TCControlContents | null): void;

  setStickContents(stickContents: TCControlContents | null): void;

  setHidesWhenNotPressed(hidesWhenNotPressed: boolean): void;

  setStickSize(stickSize: CGSize): void;

  setSize(size: CGSize): void;

  setAnchor(anchor: interop.Enum<typeof TCControlLayoutAnchor>): void;

  setAnchorCoordinateSystem(anchorCoordinateSystem: interop.Enum<typeof TCControlLayoutAnchorCoordinateSystem>): void;

  setOffset(offset: CGPoint): void;

  setZIndex(zIndex: number): void;

  setColliderShape(colliderShape: interop.Enum<typeof TCColliderShape>): void;

  setHighlightDuration(highlightDuration: number): void;
}

declare class TCThrottle extends NSObject implements TCControl, TCControlLayout {
  backgroundContents: TCControlContents;

  indicatorContents: TCControlContents;

  readonly orientation: interop.Enum<typeof TCThrottleOrientation>;

  snapsToBaseValue: boolean;

  baseValue: number;

  indicatorSize: CGSize;

  throttleSize: CGSize;

  readonly colliderShape: interop.Enum<typeof TCColliderShape>;

  highlightDuration: number;

  setBackgroundContents(backgroundContents: TCControlContents | null): void;

  setIndicatorContents(indicatorContents: TCControlContents | null): void;

  setSnapsToBaseValue(snapsToBaseValue: boolean): void;

  setBaseValue(baseValue: number): void;

  setIndicatorSize(indicatorSize: CGSize): void;

  setThrottleSize(throttleSize: CGSize): void;

  setHighlightDuration(highlightDuration: number): void;

  readonly label: TCControlLabel;

  readonly pressed: boolean;

  enabled: boolean;

  handleTouchBeganAtPoint(point: CGPoint): void;

  handleTouchMovedAtPoint(point: CGPoint): void;

  handleTouchEndedAtPoint(point: CGPoint): void;

  isPressed(): boolean;

  isEnabled(): boolean;

  setEnabled(enabled: boolean): void;

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

  anchor: interop.Enum<typeof TCControlLayoutAnchor>;

  anchorCoordinateSystem: interop.Enum<typeof TCControlLayoutAnchorCoordinateSystem>;

  offset: CGPoint;

  zIndex: number;

  size: CGSize;

  readonly position: CGPoint;

  setAnchor(anchor: interop.Enum<typeof TCControlLayoutAnchor>): void;

  setAnchorCoordinateSystem(anchorCoordinateSystem: interop.Enum<typeof TCControlLayoutAnchorCoordinateSystem>): void;

  setOffset(offset: CGPoint): void;

  setZIndex(zIndex: number): void;

  setSize(size: CGSize): void;
}

declare class TCTouchpadDescriptor extends NSObject {
  label: TCControlLabel;

  contents: TCControlContents;

  anchor: interop.Enum<typeof TCControlLayoutAnchor>;

  anchorCoordinateSystem: interop.Enum<typeof TCControlLayoutAnchorCoordinateSystem>;

  offset: CGPoint;

  zIndex: number;

  size: CGSize;

  colliderShape: interop.Enum<typeof TCColliderShape>;

  highlightDuration: number;

  reportsRelativeValues: boolean;

  init(): this;

  setLabel(label: TCControlLabel): void;

  setContents(contents: TCControlContents | null): void;

  setAnchor(anchor: interop.Enum<typeof TCControlLayoutAnchor>): void;

  setAnchorCoordinateSystem(anchorCoordinateSystem: interop.Enum<typeof TCControlLayoutAnchorCoordinateSystem>): void;

  setOffset(offset: CGPoint): void;

  setZIndex(zIndex: number): void;

  setSize(size: CGSize): void;

  setColliderShape(colliderShape: interop.Enum<typeof TCColliderShape>): void;

  setHighlightDuration(highlightDuration: number): void;

  setReportsRelativeValues(reportsRelativeValues: boolean): void;
}

declare class TCSwitch extends NSObject implements TCControl, TCControlLayout {
  contents: TCControlContents;

  switchedOnContents: TCControlContents;

  highlightDuration: number;

  readonly switchedOn: boolean;

  readonly colliderShape: interop.Enum<typeof TCColliderShape>;

  setContents(contents: TCControlContents | null): void;

  setSwitchedOnContents(switchedOnContents: TCControlContents | null): void;

  setHighlightDuration(highlightDuration: number): void;

  isSwitchedOn(): boolean;

  readonly label: TCControlLabel;

  readonly pressed: boolean;

  enabled: boolean;

  handleTouchBeganAtPoint(point: CGPoint): void;

  handleTouchMovedAtPoint(point: CGPoint): void;

  handleTouchEndedAtPoint(point: CGPoint): void;

  isPressed(): boolean;

  isEnabled(): boolean;

  setEnabled(enabled: boolean): void;

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

  anchor: interop.Enum<typeof TCControlLayoutAnchor>;

  anchorCoordinateSystem: interop.Enum<typeof TCControlLayoutAnchorCoordinateSystem>;

  offset: CGPoint;

  zIndex: number;

  size: CGSize;

  readonly position: CGPoint;

  setAnchor(anchor: interop.Enum<typeof TCControlLayoutAnchor>): void;

  setAnchorCoordinateSystem(anchorCoordinateSystem: interop.Enum<typeof TCControlLayoutAnchorCoordinateSystem>): void;

  setOffset(offset: CGPoint): void;

  setZIndex(zIndex: number): void;

  setSize(size: CGSize): void;
}

declare class TCThrottleDescriptor extends NSObject {
  label: TCControlLabel;

  backgroundContents: TCControlContents;

  indicatorContents: TCControlContents;

  size: CGSize;

  indicatorSize: CGSize;

  throttleSize: CGSize;

  orientation: interop.Enum<typeof TCThrottleOrientation>;

  snapsToBaseValue: boolean;

  baseValue: number;

  anchor: interop.Enum<typeof TCControlLayoutAnchor>;

  anchorCoordinateSystem: interop.Enum<typeof TCControlLayoutAnchorCoordinateSystem>;

  offset: CGPoint;

  zIndex: number;

  colliderShape: interop.Enum<typeof TCColliderShape>;

  highlightDuration: number;

  init(): this;

  setLabel(label: TCControlLabel): void;

  setBackgroundContents(backgroundContents: TCControlContents | null): void;

  setIndicatorContents(indicatorContents: TCControlContents | null): void;

  setSize(size: CGSize): void;

  setIndicatorSize(indicatorSize: CGSize): void;

  setThrottleSize(throttleSize: CGSize): void;

  setOrientation(orientation: interop.Enum<typeof TCThrottleOrientation>): void;

  setSnapsToBaseValue(snapsToBaseValue: boolean): void;

  setBaseValue(baseValue: number): void;

  setAnchor(anchor: interop.Enum<typeof TCControlLayoutAnchor>): void;

  setAnchorCoordinateSystem(anchorCoordinateSystem: interop.Enum<typeof TCControlLayoutAnchorCoordinateSystem>): void;

  setOffset(offset: CGPoint): void;

  setZIndex(zIndex: number): void;

  setColliderShape(colliderShape: interop.Enum<typeof TCColliderShape>): void;

  setHighlightDuration(highlightDuration: number): void;
}

declare class TCTouchpad extends NSObject implements TCControl, TCControlLayout {
  contents: TCControlContents;

  readonly colliderShape: interop.Enum<typeof TCColliderShape>;

  highlightDuration: number;

  reportsRelativeValues: boolean;

  setContents(contents: TCControlContents | null): void;

  setHighlightDuration(highlightDuration: number): void;

  setReportsRelativeValues(reportsRelativeValues: boolean): void;

  readonly label: TCControlLabel;

  readonly pressed: boolean;

  enabled: boolean;

  handleTouchBeganAtPoint(point: CGPoint): void;

  handleTouchMovedAtPoint(point: CGPoint): void;

  handleTouchEndedAtPoint(point: CGPoint): void;

  isPressed(): boolean;

  isEnabled(): boolean;

  setEnabled(enabled: boolean): void;

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

  anchor: interop.Enum<typeof TCControlLayoutAnchor>;

  anchorCoordinateSystem: interop.Enum<typeof TCControlLayoutAnchorCoordinateSystem>;

  offset: CGPoint;

  zIndex: number;

  size: CGSize;

  readonly position: CGPoint;

  setAnchor(anchor: interop.Enum<typeof TCControlLayoutAnchor>): void;

  setAnchorCoordinateSystem(anchorCoordinateSystem: interop.Enum<typeof TCControlLayoutAnchorCoordinateSystem>): void;

  setOffset(offset: CGPoint): void;

  setZIndex(zIndex: number): void;

  setSize(size: CGSize): void;
}

declare class TCDirectionPad extends NSObject implements TCControl, TCControlLayout {
  compositeLabel: TCControlLabel;

  upLabel: TCControlLabel;

  downLabel: TCControlLabel;

  leftLabel: TCControlLabel;

  rightLabel: TCControlLabel;

  upContents: TCControlContents;

  downContents: TCControlContents;

  leftContents: TCControlContents;

  rightContents: TCControlContents;

  readonly colliderShape: interop.Enum<typeof TCColliderShape>;

  highlightDuration: number;

  radial: boolean;

  digital: boolean;

  mutuallyExclusiveInput: boolean;

  setCompositeLabel(compositeLabel: TCControlLabel | null): void;

  setUpLabel(upLabel: TCControlLabel | null): void;

  setDownLabel(downLabel: TCControlLabel | null): void;

  setLeftLabel(leftLabel: TCControlLabel | null): void;

  setRightLabel(rightLabel: TCControlLabel | null): void;

  setUpContents(upContents: TCControlContents | null): void;

  setDownContents(downContents: TCControlContents | null): void;

  setLeftContents(leftContents: TCControlContents | null): void;

  setRightContents(rightContents: TCControlContents | null): void;

  setHighlightDuration(highlightDuration: number): void;

  isRadial(): boolean;

  setRadial(radial: boolean): void;

  isDigital(): boolean;

  setDigital(digital: boolean): void;

  inputIsMutuallyExclusive(): boolean;

  setMutuallyExclusiveInput(mutuallyExclusiveInput: boolean): void;

  readonly label: TCControlLabel;

  readonly pressed: boolean;

  enabled: boolean;

  handleTouchBeganAtPoint(point: CGPoint): void;

  handleTouchMovedAtPoint(point: CGPoint): void;

  handleTouchEndedAtPoint(point: CGPoint): void;

  isPressed(): boolean;

  isEnabled(): boolean;

  setEnabled(enabled: boolean): void;

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

  anchor: interop.Enum<typeof TCControlLayoutAnchor>;

  anchorCoordinateSystem: interop.Enum<typeof TCControlLayoutAnchorCoordinateSystem>;

  offset: CGPoint;

  zIndex: number;

  size: CGSize;

  readonly position: CGPoint;

  setAnchor(anchor: interop.Enum<typeof TCControlLayoutAnchor>): void;

  setAnchorCoordinateSystem(anchorCoordinateSystem: interop.Enum<typeof TCControlLayoutAnchorCoordinateSystem>): void;

  setOffset(offset: CGPoint): void;

  setZIndex(zIndex: number): void;

  setSize(size: CGSize): void;
}

declare class TCButtonDescriptor extends NSObject {
  label: TCControlLabel;

  contents: TCControlContents;

  anchor: interop.Enum<typeof TCControlLayoutAnchor>;

  anchorCoordinateSystem: interop.Enum<typeof TCControlLayoutAnchorCoordinateSystem>;

  offset: CGPoint;

  zIndex: number;

  size: CGSize;

  colliderShape: interop.Enum<typeof TCColliderShape>;

  highlightDuration: number;

  init(): this;

  setLabel(label: TCControlLabel): void;

  setContents(contents: TCControlContents | null): void;

  setAnchor(anchor: interop.Enum<typeof TCControlLayoutAnchor>): void;

  setAnchorCoordinateSystem(anchorCoordinateSystem: interop.Enum<typeof TCControlLayoutAnchorCoordinateSystem>): void;

  setOffset(offset: CGPoint): void;

  setZIndex(zIndex: number): void;

  setSize(size: CGSize): void;

  setColliderShape(colliderShape: interop.Enum<typeof TCColliderShape>): void;

  setHighlightDuration(highlightDuration: number): void;
}


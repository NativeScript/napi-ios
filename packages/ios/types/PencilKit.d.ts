/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./UIKit.d.ts" />

declare const PKInkTypeCrayon: string;

declare const PKInkTypeWatercolor: string;

declare const PKInkTypeMonoline: string;

declare const PKInkTypeMarker: string;

declare const PKInkTypePencil: string;

declare const PKInkTypeReed: string;

declare const PKAppleDrawingTypeIdentifier: interop.Pointer;

declare const PKInkTypePen: string;

declare const PKInkTypeFountainPen: string;

declare const PKToolPickerCustomItemControlOptions: {
  None: 0,
  Width: 1,
  Opacity: 2,
};

declare const PKCanvasViewDrawingPolicy: {
  Default: 0,
  AnyInput: 1,
  PencilOnly: 2,
};

declare const PKContentVersion: {
  Version1: 1,
  Version2: 2,
  Version3: 3,
  Version4: 4,
  VersionLatest: 4,
};

declare const PKToolPickerVisibility: {
  Inherited: 0,
  Inactive: 1,
  Hidden: 2,
  Visible: 3,
};

declare const PKEraserType: {
  Vector: 0,
  Bitmap: 1,
  FixedWidthBitmap: 2,
};

declare interface PKToolPickerObserver extends NSObjectProtocol {
  toolPickerSelectedToolDidChange?(toolPicker: PKToolPicker): void;

  toolPickerSelectedToolItemDidChange?(toolPicker: PKToolPicker): void;

  toolPickerIsRulerActiveDidChange?(toolPicker: PKToolPicker): void;

  toolPickerVisibilityDidChange?(toolPicker: PKToolPicker): void;

  toolPickerFramesObscuredDidChange?(toolPicker: PKToolPicker): void;
}

declare class PKToolPickerObserver extends NativeObject implements PKToolPickerObserver {
}

declare interface PKToolPickerDelegate extends NSObjectProtocol {
}

declare class PKToolPickerDelegate extends NativeObject implements PKToolPickerDelegate {
}

declare interface PKCanvasViewDelegate extends NSObjectProtocol, UIScrollViewDelegate {
  canvasViewDrawingDidChange?(canvasView: PKCanvasView): void;

  canvasViewDidFinishRendering?(canvasView: PKCanvasView): void;

  canvasViewDidBeginUsingTool?(canvasView: PKCanvasView): void;

  canvasViewDidEndUsingTool?(canvasView: PKCanvasView): void;
}

declare class PKCanvasViewDelegate extends NativeObject implements PKCanvasViewDelegate {
}

declare class PKStrokePath extends NSObject implements NSCopying {
  initWithControlPointsCreationDate(controlPoints: NSArray<interop.Object> | Array<interop.Object>, creationDate: NSDate): this;

  readonly count: number;

  readonly creationDate: NSDate;

  pointAtIndex(i: number): PKStrokePoint;

  objectAtIndexedSubscript(i: number): PKStrokePoint;

  interpolatedLocationAt(parametricValue: number): CGPoint;

  interpolatedPointAt(parametricValue: number): PKStrokePoint;

  enumerateInterpolatedPointsInRangeStrideByDistanceUsingBlock(range: PKFloatRange, distanceStep: number, block: (p1: PKStrokePoint, p2: interop.PointerConvertible) => void): void;

  enumerateInterpolatedPointsInRangeStrideByTimeUsingBlock(range: PKFloatRange, timeStep: number, block: (p1: PKStrokePoint, p2: interop.PointerConvertible) => void): void;

  enumerateInterpolatedPointsInRangeStrideByParametricStepUsingBlock(range: PKFloatRange, parametricStep: number, block: (p1: PKStrokePoint, p2: interop.PointerConvertible) => void): void;

  parametricValueOffsetByDistance(parametricValue: number, distanceStep: number): number;

  parametricValueOffsetByTime(parametricValue: number, timeStep: number): number;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class PKFloatRange extends NSObject implements NSCopying {
  readonly lowerBound: number;

  readonly upperBound: number;

  initWithLowerBoundUpperBound(lowerBound: number, upperBound: number): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class PKStroke extends NSObject implements NSCopying {
  initWithInkStrokePathTransformMask(ink: PKInk, strokePath: PKStrokePath, transform: CGAffineTransform, mask: UIBezierPath | null): this;

  initWithInkStrokePathTransformMaskRandomSeed(ink: PKInk, strokePath: PKStrokePath, transform: CGAffineTransform, mask: UIBezierPath | null, randomSeed: number): this;

  readonly ink: PKInk;

  readonly transform: CGAffineTransform;

  readonly path: PKStrokePath;

  readonly mask: UIBezierPath;

  readonly renderBounds: CGRect;

  readonly maskedPathRanges: NSArray;

  readonly randomSeed: number;

  readonly requiredContentVersion: interop.Enum<typeof PKContentVersion>;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class PKDrawing extends NSObject implements NSCopying, NSSecureCoding {
  init(): this;

  initWithStrokes(strokes: NSArray<interop.Object> | Array<interop.Object>): this;

  initWithDataError(data: NSData, error: interop.PointerConvertible): this;

  dataRepresentation(): NSData;

  readonly strokes: NSArray;

  readonly bounds: CGRect;

  readonly requiredContentVersion: interop.Enum<typeof PKContentVersion>;

  imageFromRectScale(rect: CGRect, scale: number): UIImage;

  drawingByApplyingTransform(transform: CGAffineTransform): PKDrawing;

  drawingByAppendingDrawing(drawing: PKDrawing): PKDrawing;

  drawingByAppendingStrokes(strokes: NSArray<interop.Object> | Array<interop.Object>): PKDrawing;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class PKInkingTool extends PKTool {
  initWithInkTypeColorWidth(type: string, color: UIColor, width: number): this;

  initWithInkTypeColorWidthAzimuth(type: string, color: UIColor, width: number, angle: number): this;

  initWithInkTypeColor(type: string, color: UIColor): this;

  initWithInkWidth(ink: PKInk, width: number): this;

  static defaultWidthForInkType(inkType: string): number;

  static minimumWidthForInkType(inkType: string): number;

  static maximumWidthForInkType(inkType: string): number;

  readonly inkType: string;

  readonly color: UIColor;

  static convertColorFromUserInterfaceStyleTo(color: UIColor, fromUserInterfaceStyle: interop.Enum<typeof UIUserInterfaceStyle>, toUserInterfaceStyle: interop.Enum<typeof UIUserInterfaceStyle>): UIColor;

  readonly width: number;

  readonly azimuth: number;

  readonly ink: PKInk;

  readonly requiredContentVersion: interop.Enum<typeof PKContentVersion>;
}

declare class PKEraserTool extends PKTool {
  readonly eraserType: interop.Enum<typeof PKEraserType>;

  initWithEraserType(eraserType: interop.Enum<typeof PKEraserType>): this;

  initWithEraserTypeWidth(eraserType: interop.Enum<typeof PKEraserType>, width: number): this;

  readonly width: number;

  static defaultWidthForEraserType(eraserType: interop.Enum<typeof PKEraserType>): number;

  static minimumWidthForEraserType(eraserType: interop.Enum<typeof PKEraserType>): number;

  static maximumWidthForEraserType(eraserType: interop.Enum<typeof PKEraserType>): number;
}

declare class PKLassoTool extends PKTool {
  init(): this;
}

declare class PKTool extends NSObject implements NSCopying {
  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class PKResponderState extends NSObject {
  toolPickerVisibility: interop.Enum<typeof PKToolPickerVisibility>;

  activeToolPicker: PKToolPicker;

  setToolPickerVisibility(toolPickerVisibility: interop.Enum<typeof PKToolPickerVisibility>): void;

  setActiveToolPicker(activeToolPicker: PKToolPicker | null): void;
}

declare class PKToolPickerScribbleItem extends PKToolPickerItem {
  init(): this;
}

declare class PKToolPickerLassoItem extends PKToolPickerItem {
  init(): this;

  readonly lassoTool: PKLassoTool;
}

declare class PKToolPickerCustomItem extends PKToolPickerItem {
  initWithConfiguration(configuration: PKToolPickerCustomItemConfiguration): this;

  readonly configuration: PKToolPickerCustomItemConfiguration;

  color: UIColor;

  allowsColorSelection: boolean;

  width: number;

  reloadImage(): void;

  setColor(color: UIColor): void;

  setAllowsColorSelection(allowsColorSelection: boolean): void;

  setWidth(width: number): void;
}

declare class PKToolPickerItem extends NSObject implements NSCopying {
  readonly identifier: string;

  readonly tool: PKTool;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

// @ts-ignore ClassDecl.tsIgnore
declare class PKCanvasView extends UIScrollView implements PKToolPickerObserver {
  // @ts-ignore MemberDecl.tsIgnore
  delegate: PKCanvasViewDelegate;

  drawing: PKDrawing;

  tool: PKTool;

  rulerActive: boolean;

  readonly drawingGestureRecognizer: UIGestureRecognizer;

  drawingEnabled: boolean;

  allowsFingerDrawing: boolean;

  drawingPolicy: interop.Enum<typeof PKCanvasViewDrawingPolicy>;

  maximumSupportedContentVersion: interop.Enum<typeof PKContentVersion>;

  // @ts-ignore MemberDecl.tsIgnore
  setDelegate(delegate: PKCanvasViewDelegate | null): void;

  setDrawing(drawing: PKDrawing): void;

  setTool(tool: PKTool): void;

  isRulerActive(): boolean;

  setRulerActive(rulerActive: boolean): void;

  isDrawingEnabled(): boolean;

  setDrawingEnabled(drawingEnabled: boolean): void;

  setAllowsFingerDrawing(allowsFingerDrawing: boolean): void;

  setDrawingPolicy(drawingPolicy: interop.Enum<typeof PKCanvasViewDrawingPolicy>): void;

  setMaximumSupportedContentVersion(maximumSupportedContentVersion: interop.Enum<typeof PKContentVersion>): void;

  toolPickerSelectedToolDidChange(toolPicker: PKToolPicker): void;

  toolPickerSelectedToolItemDidChange(toolPicker: PKToolPicker): void;

  toolPickerIsRulerActiveDidChange(toolPicker: PKToolPicker): void;

  toolPickerVisibilityDidChange(toolPicker: PKToolPicker): void;

  toolPickerFramesObscuredDidChange(toolPicker: PKToolPicker): void;

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

declare class PKToolPickerRulerItem extends PKToolPickerItem {
  init(): this;
}

declare class PKToolPickerCustomItemConfiguration extends NSObject implements NSCopying {
  initWithIdentifierName(identifier: string, name: string): this;

  identifier: string;

  name: string;

  imageProvider: (p1: PKToolPickerCustomItem) => UIImage;

  viewControllerProvider: (p1: PKToolPickerCustomItem) => UIViewController;

  defaultWidth: number;

  get widthVariants(): NSDictionary;
  set widthVariants(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  defaultColor: UIColor;

  allowsColorSelection: boolean;

  toolAttributeControls: interop.Enum<typeof PKToolPickerCustomItemControlOptions>;

  setIdentifier(identifier: string): void;

  setName(name: string): void;

  setImageProvider(imageProvider: (p1: PKToolPickerCustomItem) => UIImage | null): void;

  setViewControllerProvider(viewControllerProvider: (p1: PKToolPickerCustomItem) => UIViewController | null): void;

  setDefaultWidth(defaultWidth: number): void;

  setWidthVariants(widthVariants: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  setDefaultColor(defaultColor: UIColor): void;

  setAllowsColorSelection(allowsColorSelection: boolean): void;

  setToolAttributeControls(toolAttributeControls: interop.Enum<typeof PKToolPickerCustomItemControlOptions>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class PKToolPicker extends NSObject {
  addObserver(observer: PKToolPickerObserver): void;

  removeObserver(observer: PKToolPickerObserver): void;

  setVisibleForFirstResponder(visible: boolean, responder: UIResponder): void;

  delegate: PKToolPickerDelegate;

  selectedTool: PKTool;

  selectedToolItem: PKToolPickerItem;

  selectedToolItemIdentifier: string;

  readonly toolItems: NSArray;

  static readonly defaultToolItems: NSArray;

  rulerActive: boolean;

  readonly isVisible: boolean;

  stateAutosaveName: string;

  maximumSupportedContentVersion: interop.Enum<typeof PKContentVersion>;

  frameObscuredInView(view: UIView): CGRect;

  overrideUserInterfaceStyle: interop.Enum<typeof UIUserInterfaceStyle>;

  colorUserInterfaceStyle: interop.Enum<typeof UIUserInterfaceStyle>;

  showsDrawingPolicyControls: boolean;

  accessoryItem: UIBarButtonItem;

  static sharedToolPickerForWindow(window: UIWindow): PKToolPicker;

  init(): this;

  initWithToolItems(items: NSArray<interop.Object> | Array<interop.Object>): this;

  colorMaximumLinearExposure: number;

  setDelegate(delegate: PKToolPickerDelegate | null): void;

  setSelectedTool(selectedTool: PKTool): void;

  setSelectedToolItem(selectedToolItem: PKToolPickerItem): void;

  setSelectedToolItemIdentifier(selectedToolItemIdentifier: string): void;

  isRulerActive(): boolean;

  setRulerActive(rulerActive: boolean): void;

  setStateAutosaveName(stateAutosaveName: string): void;

  setMaximumSupportedContentVersion(maximumSupportedContentVersion: interop.Enum<typeof PKContentVersion>): void;

  setOverrideUserInterfaceStyle(overrideUserInterfaceStyle: interop.Enum<typeof UIUserInterfaceStyle>): void;

  setColorUserInterfaceStyle(colorUserInterfaceStyle: interop.Enum<typeof UIUserInterfaceStyle>): void;

  setShowsDrawingPolicyControls(showsDrawingPolicyControls: boolean): void;

  setAccessoryItem(accessoryItem: UIBarButtonItem | null): void;

  setColorMaximumLinearExposure(colorMaximumLinearExposure: number): void;
}

declare class PKInk extends NSObject implements NSCopying {
  initWithInkTypeColor(type: string, color: UIColor): this;

  readonly inkType: string;

  readonly color: UIColor;

  readonly requiredContentVersion: interop.Enum<typeof PKContentVersion>;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class PKToolPickerEraserItem extends PKToolPickerItem {
  initWithEraserType(eraserType: interop.Enum<typeof PKEraserType>): this;

  initWithEraserTypeWidth(eraserType: interop.Enum<typeof PKEraserType>, width: number): this;

  readonly eraserTool: PKEraserTool;
}

declare class PKStrokePoint extends NSObject implements NSCopying {
  initWithLocationTimeOffsetSizeOpacityForceAzimuthAltitude(location: CGPoint, timeOffset: number, size: CGSize, opacity: number, force: number, azimuth: number, altitude: number): this;

  initWithLocationTimeOffsetSizeOpacityForceAzimuthAltitudeSecondaryScale(location: CGPoint, timeOffset: number, size: CGSize, opacity: number, force: number, azimuth: number, altitude: number, secondaryScale: number): this;

  initWithLocationTimeOffsetSizeOpacityForceAzimuthAltitudeSecondaryScaleThreshold(location: CGPoint, timeOffset: number, size: CGSize, opacity: number, force: number, azimuth: number, altitude: number, secondaryScale: number, threshold: number): this;

  readonly location: CGPoint;

  readonly timeOffset: number;

  readonly size: CGSize;

  readonly opacity: number;

  readonly azimuth: number;

  readonly force: number;

  readonly altitude: number;

  readonly secondaryScale: number;

  readonly threshold: number;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class PKToolPickerInkingItem extends PKToolPickerItem {
  initWithInkType(inkType: string): this;

  initWithInkTypeColor(inkType: string, color: UIColor): this;

  initWithInkTypeWidth(inkType: string, width: number): this;

  initWithInkTypeColorWidth(inkType: string, color: UIColor, width: number): this;

  initWithInkTypeColorWidthIdentifier(inkType: string, color: UIColor, width: number, identifier: string | null): this;

  initWithInkTypeColorWidthAzimuthIdentifier(inkType: string, color: UIColor, width: number, azimuth: number, identifier: string | null): this;

  readonly inkingTool: PKInkingTool;

  allowsColorSelection: boolean;

  setAllowsColorSelection(allowsColorSelection: boolean): void;
}


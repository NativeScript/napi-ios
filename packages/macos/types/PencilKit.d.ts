/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const PKInkTypeWatercolor: string;

declare const PKInkTypeMarker: string;

declare const PKInkTypePencil: string;

declare const PKInkTypePen: string;

declare const PKAppleDrawingTypeIdentifier: interop.Pointer;

declare const PKInkTypeCrayon: string;

declare const PKInkTypeFountainPen: string;

declare const PKInkTypeMonoline: string;

declare const PKContentVersion: {
  Version1: 1,
  Version2: 2,
  Version3: 3,
  VersionLatest: 3,
};

declare const PKEraserType: {
  Vector: 0,
  Bitmap: 1,
  FixedWidthBitmap: 2,
};

declare class PKStroke extends NSObject implements NSCopying {
  initWithInkStrokePathTransformMask(ink: PKInk, strokePath: PKStrokePath, transform: CGAffineTransform, mask: NSBezierPath | null): this;

  initWithInkStrokePathTransformMaskRandomSeed(ink: PKInk, strokePath: PKStrokePath, transform: CGAffineTransform, mask: NSBezierPath | null, randomSeed: number): this;

  readonly ink: PKInk;

  readonly transform: CGAffineTransform;

  readonly path: PKStrokePath;

  readonly mask: NSBezierPath;

  readonly renderBounds: CGRect;

  readonly maskedPathRanges: NSArray;

  readonly randomSeed: number;

  readonly requiredContentVersion: interop.Enum<typeof PKContentVersion>;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class PKLassoTool extends PKTool {
  init(): this;
}

declare class PKTool extends NSObject implements NSCopying {
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

  imageFromRectScale(rect: CGRect, scale: number): NSImage;

  drawingByApplyingTransform(transform: CGAffineTransform): PKDrawing;

  drawingByAppendingDrawing(drawing: PKDrawing): PKDrawing;

  drawingByAppendingStrokes(strokes: NSArray<interop.Object> | Array<interop.Object>): PKDrawing;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class PKInkingTool extends PKTool {
  initWithInkTypeColorWidth(type: string, color: NSColor, width: number): this;

  initWithInkTypeColor(type: string, color: NSColor): this;

  initWithInkWidth(ink: PKInk, width: number): this;

  static defaultWidthForInkType(inkType: string): number;

  static minimumWidthForInkType(inkType: string): number;

  static maximumWidthForInkType(inkType: string): number;

  readonly inkType: string;

  readonly color: NSColor;

  readonly width: number;

  readonly ink: PKInk;

  readonly requiredContentVersion: interop.Enum<typeof PKContentVersion>;
}

declare class PKInk extends NSObject implements NSCopying {
  initWithInkTypeColor(type: string, color: NSColor): this;

  readonly inkType: string;

  readonly color: NSColor;

  readonly requiredContentVersion: interop.Enum<typeof PKContentVersion>;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class PKStrokePoint extends NSObject implements NSCopying {
  initWithLocationTimeOffsetSizeOpacityForceAzimuthAltitude(location: CGPoint, timeOffset: number, size: CGSize, opacity: number, force: number, azimuth: number, altitude: number): this;

  initWithLocationTimeOffsetSizeOpacityForceAzimuthAltitudeSecondaryScale(location: CGPoint, timeOffset: number, size: CGSize, opacity: number, force: number, azimuth: number, altitude: number, secondaryScale: number): this;

  readonly location: CGPoint;

  readonly timeOffset: number;

  readonly size: CGSize;

  readonly opacity: number;

  readonly azimuth: number;

  readonly force: number;

  readonly altitude: number;

  readonly secondaryScale: number;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class PKFloatRange extends NSObject implements NSCopying {
  readonly lowerBound: number;

  readonly upperBound: number;

  initWithLowerBoundUpperBound(lowerBound: number, upperBound: number): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
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


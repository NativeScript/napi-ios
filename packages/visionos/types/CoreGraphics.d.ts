/// <reference types="@nativescript/objc-node-api" />

declare const kCGBitmapByteOrder32Host: interop.Enum<typeof CGBitmapInfo>;

declare const kCGBitmapByteOrder16Host: interop.Enum<typeof CGBitmapInfo>;

declare const kCGGlyphMax: number;

declare const kCGFontIndexMax: number;

declare const kCGFontIndexInvalid: number;

declare const kCGColorSpaceExtendedRange: interop.Pointer;

declare const CGGradientDrawingOptions: {
  BeforeStart: 1,
  AfterEnd: 2,
};

declare const CGPDFAccessPermissions: {
  LowQualityPrinting: 1,
  HighQualityPrinting: 2,
  DocumentChanges: 4,
  DocumentAssembly: 8,
  ContentCopying: 16,
  ContentAccessibility: 32,
  Commenting: 64,
  FormFieldEntry: 128,
};

declare const CGColorSpaceModel: {
  Unknown: -1,
  Monochrome: 0,
  RGB: 1,
  CMYK: 2,
  Lab: 3,
  DeviceN: 4,
  Indexed: 5,
  Pattern: 6,
  XYZ: 7,
};

declare const CGBlendMode: {
  Normal: 0,
  Multiply: 1,
  Screen: 2,
  Overlay: 3,
  Darken: 4,
  Lighten: 5,
  ColorDodge: 6,
  ColorBurn: 7,
  SoftLight: 8,
  HardLight: 9,
  Difference: 10,
  Exclusion: 11,
  Hue: 12,
  Saturation: 13,
  Color: 14,
  Luminosity: 15,
  Clear: 16,
  Copy: 17,
  SourceIn: 18,
  SourceOut: 19,
  SourceAtop: 20,
  DestinationOver: 21,
  DestinationIn: 22,
  DestinationOut: 23,
  DestinationAtop: 24,
  XOR: 25,
  PlusDarker: 26,
  PlusLighter: 27,
};

declare const CGFontPostScriptFormat: {
  Type1: 1,
  Type3: 3,
  Type42: 42,
};

declare const CGPathDrawingMode: {
  Fill: 0,
  EOFill: 1,
  Stroke: 2,
  FillStroke: 3,
  EOFillStroke: 4,
};

declare const CGError: {
  Success: 0,
  Failure: 1000,
  IllegalArgument: 1001,
  InvalidConnection: 1002,
  InvalidContext: 1003,
  CannotComplete: 1004,
  NotImplemented: 1006,
  RangeCheck: 1007,
  TypeCheck: 1008,
  InvalidOperation: 1010,
  NoneAvailable: 1011,
};

declare const CGInterpolationQuality: {
  Default: 0,
  None: 1,
  Low: 2,
  Medium: 4,
  High: 3,
};

declare const CGPathElementType: {
  MoveToPoint: 0,
  AddLineToPoint: 1,
  AddQuadCurveToPoint: 2,
  AddCurveToPoint: 3,
  CloseSubpath: 4,
};

declare const CGPDFBox: {
  Media: 0,
  Crop: 1,
  Bleed: 2,
  Trim: 3,
  Art: 4,
};

declare const CGPDFDataFormat: {
  Raw: 0,
  JPEGEncoded: 1,
  JPEG2000: 2,
};

declare const CGPDFObjectType: {
  Null: 1,
  Boolean: 2,
  Integer: 3,
  Real: 4,
  Name: 5,
  String: 6,
  Array: 7,
  Dictionary: 8,
  Stream: 9,
};

declare const CGLineCap: {
  Butt: 0,
  Round: 1,
  Square: 2,
};

declare const CGLineJoin: {
  Miter: 0,
  Round: 1,
  Bevel: 2,
};

declare const CGImageAlphaInfo: {
  None: 0,
  PremultipliedLast: 1,
  PremultipliedFirst: 2,
  Last: 3,
  First: 4,
  NoneSkipLast: 5,
  NoneSkipFirst: 6,
  Only: 7,
};

declare const CGPatternTiling: {
  NoDistortion: 0,
  ConstantSpacingMinimalDistortion: 1,
  ConstantSpacing: 2,
};

declare const CGColorRenderingIntent: {
  Default: 0,
  AbsoluteColorimetric: 1,
  RelativeColorimetric: 2,
  Perceptual: 3,
  Saturation: 4,
};

declare const CGTextDrawingMode: {
  Fill: 0,
  Stroke: 1,
  FillStroke: 2,
  Invisible: 3,
  FillClip: 4,
  StrokeClip: 5,
  FillStrokeClip: 6,
  Clip: 7,
};

declare const CGGlyphDeprecatedEnum: {
  Min: 0,
  Max: 1,
};

declare const CGColorConversionInfoTransformType: {
  From: 0,
  To: 1,
  Apply: 2,
};

declare class CGPath {
  constructor(init?: CGPath);
}

declare class CGPDFStream {
  constructor(init?: CGPDFStream);
}

declare class CGFont {
  constructor(init?: CGFont);
}

declare class CGDataConsumer {
  constructor(init?: CGDataConsumer);
}

declare class CGGradient {
  constructor(init?: CGGradient);
}

declare class CGShading {
  constructor(init?: CGShading);
}

declare class CGPDFObject {
  constructor(init?: CGPDFObject);
}

declare class CGDataProviderSequentialCallbacks {
  constructor(init?: CGDataProviderSequentialCallbacks);
  version: number;
  getBytes: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => number | null;
  skipForward: (p1: interop.PointerConvertible, p2: number) => number | null;
  rewind: (p1: interop.PointerConvertible) => void | null;
  releaseInfo: (p1: interop.PointerConvertible) => void | null;
}

declare class CGDataProvider {
  constructor(init?: CGDataProvider);
}

declare class CGColorSpace {
  constructor(init?: CGColorSpace);
}

declare class CGPDFDictionary {
  constructor(init?: CGPDFDictionary);
}

declare class ColorSyncProfile {
  constructor(init?: ColorSyncProfile);
}

declare class CGPDFPage {
  constructor(init?: CGPDFPage);
}

declare class CGColorConversionInfo {
  constructor(init?: CGColorConversionInfo);
}

declare class CGPDFScanner {
  constructor(init?: CGPDFScanner);
}

declare class CGLayer {
  constructor(init?: CGLayer);
}

declare class CGDataConsumerCallbacks {
  constructor(init?: CGDataConsumerCallbacks);
  putBytes: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => number | null;
  releaseConsumer: (p1: interop.PointerConvertible) => void | null;
}

declare class CGColorDataFormat {
  constructor(init?: CGColorDataFormat);
  version: number;
  colorspace_info: interop.Pointer;
  bitmap_info: interop.Enum<typeof CGBitmapInfo>;
  bits_per_component: number;
  bytes_per_row: number;
  intent: interop.Enum<typeof CGColorRenderingIntent>;
  decode: interop.Pointer;
}

declare class CGColorBufferFormat {
  constructor(init?: CGColorBufferFormat);
  version: number;
  bitmapInfo: interop.Enum<typeof CGBitmapInfo>;
  bitsPerComponent: number;
  bitsPerPixel: number;
  bytesPerRow: number;
}

declare class CGPDFString {
  constructor(init?: CGPDFString);
}

declare class CGPDFDocument {
  constructor(init?: CGPDFDocument);
}

declare class CGImage {
  constructor(init?: CGImage);
}

declare class CGPatternCallbacks {
  constructor(init?: CGPatternCallbacks);
  version: number;
  drawPattern: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  releaseInfo: (p1: interop.PointerConvertible) => void | null;
}

declare class CGColor {
  constructor(init?: CGColor);
}

declare class CGDataProviderDirectCallbacks {
  constructor(init?: CGDataProviderDirectCallbacks);
  version: number;
  getBytePointer: (p1: interop.PointerConvertible) => interop.Pointer | null;
  releaseBytePointer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  getBytesAtPosition: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => number | null;
  releaseInfo: (p1: interop.PointerConvertible) => void | null;
}

declare class CGContext {
  constructor(init?: CGContext);
}

declare class __IOSurface {
  constructor(init?: __IOSurface);
}

declare class CGFunctionCallbacks {
  constructor(init?: CGFunctionCallbacks);
  version: number;
  evaluate: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void | null;
  releaseInfo: (p1: interop.PointerConvertible) => void | null;
}

declare class CGPDFOperatorTable {
  constructor(init?: CGPDFOperatorTable);
}

declare class CGFunction {
  constructor(init?: CGFunction);
}

declare class CGPDFArray {
  constructor(init?: CGPDFArray);
}

declare class CGPathElement {
  constructor(init?: CGPathElement);
  type: interop.Enum<typeof CGPathElementType>;
  points: interop.Pointer;
}

declare class CGPattern {
  constructor(init?: CGPattern);
}

declare class CGPDFContentStream {
  constructor(init?: CGPDFContentStream);
}

declare function CGContextResetClip(c: interop.PointerConvertible): void;

declare function CGColorConversionInfoGetTypeID(): number;

declare function CGConvertColorDataWithFormat(width: number, height: number, dst_data: interop.PointerConvertible, dst_format: CGColorDataFormat, src_data: interop.PointerConvertible, src_format: CGColorDataFormat, options: interop.PointerConvertible): boolean;

declare function CGErrorSetCallback(callback: () => void): void;

declare function CGPDFContextSetParentTree(context: interop.PointerConvertible, parentTreeDictionary: interop.PointerConvertible): void;

declare function CGPDFContextSetIDTree(context: interop.PointerConvertible, IDTreeDictionary: interop.PointerConvertible): void;

declare function CGPDFContextSetPageTagStructureTree(context: interop.PointerConvertible, pageTagStructureTreeDictionary: interop.PointerConvertible): void;

declare function CGPDFScannerStop(s: interop.PointerConvertible): void;


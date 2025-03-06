/// <reference types="@nativescript/objc-node-api" />

declare const CIRAWDecoderVersionNone: string;

declare const kCICategoryHighDynamicRange: string;

declare const kCICategoryGradient: string;

declare const kCICategoryDistortionEffect: string;

declare const kCIAttributeType: string;

declare const CIRAWDecoderVersion6DNG: string;

declare const kCIAttributeSliderMin: string;

declare const CIRAWDecoderVersion6: string;

declare const kCIContextWorkingColorSpace: string;

declare const CIRAWDecoderVersion7: string;

declare const CIRAWDecoderVersion8DNG: string;

declare const kCIAttributeTypeAngle: string;

declare const CIFeatureTypeRectangle: string;

declare const CIFeatureTypeFace: string;

declare const kCICategoryBuiltIn: string;

declare const kCICategoryInterlaced: string;

declare const kCICategoryStillImage: string;

declare const kCICategoryTransition: string;

declare const kCICategoryColorEffect: string;

declare const kCICategoryColorAdjustment: string;

declare const kCIAttributeTypeRectangle: string;

declare const kCIAttributeTypePosition3: string;

declare const kCIAttributeTypePosition: string;

declare const kCIAttributeTypeBoolean: string;

declare const kCIAttributeDisplayName: string;

declare const kCIAttributeMin: string;

declare const kCIAttributeClass: string;

declare const kCIAttributeFilterName: string;

declare const kCIContextUseSoftwareRenderer: string;

declare const kCIContextOutputColorSpace: string;

declare const kCIFormatBGRA8: number;

declare const kCIFormatRGBA8: number;

declare const CIRAWDecoderVersion7DNG: string;

declare const CIRAWDecoderVersion8: string;

declare const kCIAttributeFilterCategories: string;

declare const kCIAttributeIdentity: string;

declare const kCICategoryStylize: string;

declare const kCIAttributeMax: string;

declare const kCIAttributeSliderMax: string;

declare const kCIImageColorSpace: string;

declare const kCICategoryNonSquarePixels: string;

declare const kCICategoryTileEffect: string;

declare const kCICategoryGeometryAdjustment: string;

declare const kCICategoryCompositeOperation: string;

declare const CIFeatureTypeText: string;

declare const kCIAttributeDefault: string;

declare const kCIAttributeTypeScalar: string;

declare const kCIAttributeTypeTime: string;

declare const CIFeatureTypeQRCode: string;

declare const kCIAttributeTypeDistance: string;

declare const kCIAttributeName: string;

declare const kCICategoryVideo: string;

declare const kCIAttributeTypeOffset: string;

declare const kCICategorySharpen: string;

declare const kCIAttributeFilterDisplayName: string;

declare const kCICategoryGenerator: string;

declare const kCICategoryBlur: string;

declare const kCICategoryHalftoneEffect: string;

declare const kCIImageCacheImmediately: string;

declare const CIDataMatrixCodeECCVersion: {
  Version000: 0,
  Version050: 50,
  Version080: 80,
  Version100: 100,
  Version140: 140,
  Version200: 200,
};

declare const CIRenderDestinationAlphaMode: {
  None: 0,
  Premultiplied: 1,
  Unpremultiplied: 2,
};

declare const CIQRCodeErrorCorrectionLevel: {
  L: 76,
  M: 77,
  Q: 81,
  H: 72,
};

declare interface CIFilter {
  readonly outputImage: interop.Object;

}

declare class CIFilter extends NativeObject implements CIFilter {
  static customAttributes(): NSDictionary;
}

declare interface CIFilterConstructor {
  filterWithName(name: string): interop.Object;
}

declare class CIFilterConstructor extends NativeObject implements CIFilterConstructor {
}


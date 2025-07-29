/// <reference types="@nativescript/objc-node-api" />

declare const kVDADecoderFlush_EmitFrames: number;

declare const kVDADecoderConfiguration_avcCData: interop.Pointer;

declare const kVDADecoderConfiguration_SourceFormat: interop.Pointer;

declare const kVDADecoderConfiguration_Height: interop.Pointer;

declare const kVDADecoderAllocationFailedErr: number;

declare const kVDADecoderParamErr: number;

declare const kVDADecoderDecoderFailedErr: number;

declare const kVDADecoderNoErr: number;

declare const kVDADecoderConfigurationError: number;

declare const kVDADecoderDecodeFlags_DontEmitFrame: number;

declare const kVDADecoderConfiguration_Width: interop.Pointer;

declare const kVDADecoderHardwareNotSupportedErr: number;

declare const kVDADecoderFormatNotSupportedErr: number;

declare class OpaqueVDADecoder {
  constructor(init?: OpaqueVDADecoder);
}

declare function VDADecoderCreate(decoderConfiguration: interop.PointerConvertible, destinationImageBufferAttributes: interop.PointerConvertible, outputCallback: interop.PointerConvertible, decoderOutputCallbackRefcon: interop.PointerConvertible, decoderOut: interop.PointerConvertible): number;

declare function VDADecoderDecode(decoder: interop.PointerConvertible, decodeFlags: number, compressedBuffer: interop.PointerConvertible, frameInfo: interop.PointerConvertible): number;

declare function VDADecoderFlush(decoder: interop.PointerConvertible, flushFlags: number): number;

declare function VDADecoderDestroy(decoder: interop.PointerConvertible): number;


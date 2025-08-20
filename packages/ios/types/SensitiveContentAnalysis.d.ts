/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const SCSensitivityAnalysisPolicy: {
  Disabled: 0,
  SimpleInterventions: 1,
  DescriptiveInterventions: 2,
};

declare const SCVideoStreamAnalyzerStreamDirection: {
  Outgoing: 1,
  Incoming: 2,
};

declare class SCVideoStreamAnalyzer extends NSObject {
  readonly analysis: SCSensitivityAnalysis;

  analysisChangedHandler: (p1: SCSensitivityAnalysis, p2: NSError) => void;

  initWithParticipantUUIDStreamDirectionError(participantUUID: string, streamDirection: interop.Enum<typeof SCVideoStreamAnalyzerStreamDirection>, error: interop.PointerConvertible): this;

  analyzePixelBuffer(pixelBuffer: interop.PointerConvertible): void;

  setAnalysisChangedHandler(analysisChangedHandler: (p1: SCSensitivityAnalysis, p2: NSError) => void): void;

  beginAnalysisOfDecompressionSessionError(decompressionSession: interop.PointerConvertible, error: interop.PointerConvertible): boolean;

  beginAnalysisOfCaptureDeviceInputError(captureDeviceInput: AVCaptureDeviceInput, error: interop.PointerConvertible): boolean;

  endAnalysis(): void;

  continueStream(): void;
}

declare class SCSensitivityAnalyzer extends NSObject {
  init(): this;

  readonly analysisPolicy: interop.Enum<typeof SCSensitivityAnalysisPolicy>;

  analyzeImageFileCompletionHandler(fileURL: NSURL, completionHandler: (p1: SCSensitivityAnalysis, p2: NSError) => void | null): void;

  analyzeCGImageCompletionHandler(image: interop.PointerConvertible, completionHandler: (p1: SCSensitivityAnalysis, p2: NSError) => void | null): void;

  analyzeVideoFileCompletionHandler(fileURL: NSURL, completionHandler: (p1: SCSensitivityAnalysis, p2: NSError) => void | null): NSProgress;
}

declare class SCSensitivityAnalysis extends NSObject {
  readonly sensitive: boolean;

  isSensitive(): boolean;

  readonly shouldInterruptVideo: boolean;

  readonly shouldIndicateSensitivity: boolean;

  readonly shouldMuteAudio: boolean;
}


/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const SCSensitivityAnalysisPolicy: {
  Disabled: 0,
  SimpleInterventions: 1,
  DescriptiveInterventions: 2,
};

declare class SCSensitivityAnalysis extends NSObject {
  readonly sensitive: boolean;

  isSensitive(): boolean;
}

declare class SCSensitivityAnalyzer extends NSObject {
  init(): this;

  readonly analysisPolicy: interop.Enum<typeof SCSensitivityAnalysisPolicy>;

  analyzeImageFileCompletionHandler(fileURL: NSURL, completionHandler: (p1: SCSensitivityAnalysis, p2: NSError) => void | null): void;

  analyzeCGImageCompletionHandler(image: interop.Object, completionHandler: (p1: SCSensitivityAnalysis, p2: NSError) => void | null): void;

  analyzeVideoFileCompletionHandler(fileURL: NSURL, completionHandler: (p1: SCSensitivityAnalysis, p2: NSError) => void | null): NSProgress;
}


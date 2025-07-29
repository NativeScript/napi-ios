/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./AppKit.d.ts" />

declare const SCStreamErrorDomain: string;

declare const RPApplicationInfoBundleIdentifierKey: string;

declare const RPVideoSampleOrientationKey: string;

declare const RPRecordingErrorDomain: string;

declare const RPRecordingErrorCode: {
  Unknown: -5800,
  UserDeclined: -5801,
  Disabled: -5802,
  FailedToStart: -5803,
  Failed: -5804,
  InsufficientStorage: -5805,
  Interrupted: -5806,
  ContentResize: -5807,
  BroadcastInvalidSession: -5808,
  SystemDormancy: -5809,
  Entitlements: -5810,
  ActivePhoneCall: -5811,
  FailedToSave: -5812,
  CarPlay: -5813,
  FailedApplicationConnectionInvalid: -5814,
  FailedApplicationConnectionInterrupted: -5815,
  FailedNoMatchingApplicationContext: -5816,
  FailedMediaServicesFailure: -5817,
  VideoMixingFailure: -5818,
  BroadcastSetupFailed: -5819,
  FailedToObtainURL: -5820,
  FailedIncorrectTimeStamps: -5821,
  FailedToProcessFirstSample: -5822,
  FailedAssetWriterFailedToSave: -5823,
  FailedNoAssetWriter: -5824,
  FailedAssetWriterInWrongState: -5825,
  FailedAssetWriterExportFailed: -5826,
  FailedToRemoveFile: -5827,
  FailedAssetWriterExportCanceled: -5828,
  AttemptToStopNonRecording: -5829,
  AttemptToStartInRecordingState: -5830,
  PhotoFailure: -5831,
  RecordingInvalidSession: -5832,
  FailedToStartCaptureStack: -5833,
  InvalidParameter: -5834,
  FilePermissions: -5835,
  ExportClipToURLInProgress: -5836,
  CodeSuccessful: 0,
};

declare const RPSampleBufferType: {
  Video: 1,
  AudioApp: 2,
  AudioMic: 3,
};

declare const RPCameraPosition: {
  Front: 1,
  Back: 2,
};

declare interface RPBroadcastActivityControllerDelegate extends NSObjectProtocol {
  broadcastActivityControllerDidFinishWithBroadcastControllerError(broadcastActivityController: RPBroadcastActivityController, broadcastController: RPBroadcastController | null, error: NSError | null): void;
}

declare class RPBroadcastActivityControllerDelegate extends NativeObject implements RPBroadcastActivityControllerDelegate {
}

declare interface RPScreenRecorderDelegate extends NSObjectProtocol {
  screenRecorderDidStopRecordingWithPreviewViewControllerError?(screenRecorder: RPScreenRecorder, previewViewController: RPPreviewViewController | null, error: NSError | null): void;

  screenRecorderDidChangeAvailability?(screenRecorder: RPScreenRecorder): void;
}

declare class RPScreenRecorderDelegate extends NativeObject implements RPScreenRecorderDelegate {
}

declare interface RPPreviewViewControllerDelegate extends NSObjectProtocol {
  previewControllerDidFinish?(previewController: RPPreviewViewController): void;

  previewControllerDidFinishWithActivityTypes?(previewController: RPPreviewViewController, activityTypes: NSSet): void;
}

declare class RPPreviewViewControllerDelegate extends NativeObject implements RPPreviewViewControllerDelegate {
}

declare interface RPBroadcastControllerDelegate extends NSObjectProtocol {
  broadcastControllerDidFinishWithError?(broadcastController: RPBroadcastController, error: NSError | null): void;

  broadcastControllerDidUpdateServiceInfo?(broadcastController: RPBroadcastController, serviceInfo: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  broadcastControllerDidUpdateBroadcastURL?(broadcastController: RPBroadcastController, broadcastURL: NSURL): void;
}

declare class RPBroadcastControllerDelegate extends NativeObject implements RPBroadcastControllerDelegate {
}

declare class RPBroadcastActivityController extends NSObject {
  static showBroadcastPickerAtPointFromWindowPreferredExtensionIdentifierCompletionHandler(point: CGPoint, window: NSWindow | null, preferredExtension: string | null, handler: (p1: RPBroadcastActivityController, p2: NSError) => void | null): void;

  delegate: RPBroadcastActivityControllerDelegate;

  setDelegate(delegate: RPBroadcastActivityControllerDelegate | null): void;
}

declare class RPScreenRecorder extends NSObject {
  static sharedRecorder(): RPScreenRecorder;

  startRecordingWithHandler(handler: (p1: NSError) => void | null): void;

  stopRecordingWithHandler(handler: (p1: RPPreviewViewController, p2: NSError) => void | null): void;

  stopRecordingWithOutputURLCompletionHandler(url: NSURL, completionHandler: (p1: NSError) => void | null): void;

  discardRecordingWithHandler(handler: () => void): void;

  startCaptureWithHandlerCompletionHandler(captureHandler: (p1: interop.PointerConvertible, p2: interop.Enum<typeof RPSampleBufferType>, p3: NSError) => void | null, completionHandler: (p1: NSError) => void | null): void;

  stopCaptureWithHandler(handler: (p1: NSError) => void | null): void;

  startClipBufferingWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  stopClipBufferingWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  exportClipToURLDurationCompletionHandler(url: NSURL, duration: number, completionHandler: (p1: NSError) => void | null): void;

  delegate: RPScreenRecorderDelegate;

  readonly available: boolean;

  readonly recording: boolean;

  microphoneEnabled: boolean;

  cameraEnabled: boolean;

  cameraPosition: interop.Enum<typeof RPCameraPosition>;

  readonly cameraPreviewView: NSView;

  setDelegate(delegate: RPScreenRecorderDelegate | null): void;

  isAvailable(): boolean;

  isRecording(): boolean;

  isMicrophoneEnabled(): boolean;

  setMicrophoneEnabled(microphoneEnabled: boolean): void;

  isCameraEnabled(): boolean;

  setCameraEnabled(cameraEnabled: boolean): void;

  setCameraPosition(cameraPosition: interop.Enum<typeof RPCameraPosition>): void;
}

declare class RPBroadcastHandler extends NSObject implements NSExtensionRequestHandling {
  updateServiceInfo(serviceInfo: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  updateBroadcastURL(broadcastURL: NSURL): void;

  beginRequestWithExtensionContext(context: NSExtensionContext): void;

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

declare class RPPreviewViewController extends NSViewController {
  previewControllerDelegate: RPPreviewViewControllerDelegate;

  setPreviewControllerDelegate(previewControllerDelegate: RPPreviewViewControllerDelegate | null): void;
}

declare class RPBroadcastController extends NSObject {
  readonly broadcasting: boolean;

  readonly paused: boolean;

  readonly broadcastURL: NSURL;

  readonly serviceInfo: NSDictionary;

  delegate: RPBroadcastControllerDelegate | null;

  startBroadcastWithHandler(handler: (p1: NSError) => void | null): void;

  pauseBroadcast(): void;

  resumeBroadcast(): void;

  finishBroadcastWithHandler(handler: (p1: NSError) => void | null): void;

  isBroadcasting(): boolean;

  isPaused(): boolean;

  setDelegate(delegate: RPBroadcastControllerDelegate | null): void;
}

declare class RPBroadcastSampleHandler extends RPBroadcastHandler {
  broadcastStartedWithSetupInfo(setupInfo: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): void;

  broadcastPaused(): void;

  broadcastResumed(): void;

  broadcastFinished(): void;

  broadcastAnnotatedWithApplicationInfo(applicationInfo: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  processSampleBufferWithType(sampleBuffer: interop.PointerConvertible, sampleBufferType: interop.Enum<typeof RPSampleBufferType>): void;

  finishBroadcastWithError(error: NSError): void;
}


/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./UIKit.d.ts" />

declare const AVKitErrorDomain: string;

declare const AVCaptureEventPhase: {
  Began: 0,
  Ended: 1,
  Cancelled: 2,
};

declare const AVVideoFrameAnalysisType: {
  None: 0,
  Default: 1,
  Text: 2,
  Subject: 4,
  VisualSearch: 8,
  MachineReadableCode: 16,
};

declare const AVKitError: {
  Unknown: -1000,
  PictureInPictureStartFailed: -1001,
};

declare const AVDisplayDynamicRange: {
  Automatic: 0,
  Standard: 1,
  ConstrainedHigh: 2,
  High: 3,
};

declare const AVAudioSessionRouteSelection: {
  None: 0,
  Local: 1,
  External: 2,
};

declare interface AVRoutePickerViewDelegate extends NSObjectProtocol {
  routePickerViewWillBeginPresentingRoutes?(routePickerView: AVRoutePickerView): void;

  routePickerViewDidEndPresentingRoutes?(routePickerView: AVRoutePickerView): void;
}

declare class AVRoutePickerViewDelegate extends NativeObject implements AVRoutePickerViewDelegate {
}

declare interface AVInputPickerInteractionDelegate extends NSObjectProtocol {
  inputPickerInteractionWillBeginPresenting?(inputPickerInteraction: AVInputPickerInteraction): void;

  inputPickerInteractionDidEndPresenting?(inputPickerInteraction: AVInputPickerInteraction): void;

  inputPickerInteractionWillBeginDismissing?(inputPickerInteraction: AVInputPickerInteraction): void;

  inputPickerInteractionDidEndDismissing?(inputPickerInteraction: AVInputPickerInteraction): void;
}

declare class AVInputPickerInteractionDelegate extends NativeObject implements AVInputPickerInteractionDelegate {
}

declare interface AVPictureInPictureSampleBufferPlaybackDelegate extends NSObjectProtocol {
  pictureInPictureControllerSetPlaying(pictureInPictureController: AVPictureInPictureController, playing: boolean): void;

  pictureInPictureControllerTimeRangeForPlayback(pictureInPictureController: AVPictureInPictureController): CMTimeRange;

  pictureInPictureControllerIsPlaybackPaused(pictureInPictureController: AVPictureInPictureController): boolean;

  pictureInPictureControllerDidTransitionToRenderSize(pictureInPictureController: AVPictureInPictureController, newRenderSize: CMVideoDimensions): void;

  pictureInPictureControllerSkipByIntervalCompletionHandler(pictureInPictureController: AVPictureInPictureController, skipInterval: CMTime, completionHandler: () => void): void;

  pictureInPictureControllerShouldProhibitBackgroundAudioPlayback?(pictureInPictureController: AVPictureInPictureController): boolean;
}

declare class AVPictureInPictureSampleBufferPlaybackDelegate extends NativeObject implements AVPictureInPictureSampleBufferPlaybackDelegate {
}

declare interface AVPictureInPictureControllerDelegate extends NSObjectProtocol {
  pictureInPictureControllerWillStartPictureInPicture?(pictureInPictureController: AVPictureInPictureController): void;

  pictureInPictureControllerDidStartPictureInPicture?(pictureInPictureController: AVPictureInPictureController): void;

  pictureInPictureControllerFailedToStartPictureInPictureWithError?(pictureInPictureController: AVPictureInPictureController, error: NSError): void;

  pictureInPictureControllerWillStopPictureInPicture?(pictureInPictureController: AVPictureInPictureController): void;

  pictureInPictureControllerDidStopPictureInPicture?(pictureInPictureController: AVPictureInPictureController): void;

  pictureInPictureControllerRestoreUserInterfaceForPictureInPictureStopWithCompletionHandler?(pictureInPictureController: AVPictureInPictureController, completionHandler: (p1: boolean) => void): void;
}

declare class AVPictureInPictureControllerDelegate extends NativeObject implements AVPictureInPictureControllerDelegate {
}

declare interface AVPlayerViewControllerDelegate extends NSObjectProtocol {
  playerViewControllerWillBeginFullScreenPresentationWithAnimationCoordinator?(playerViewController: AVPlayerViewController, coordinator: UIViewControllerTransitionCoordinator): void;

  playerViewControllerWillEndFullScreenPresentationWithAnimationCoordinator?(playerViewController: AVPlayerViewController, coordinator: UIViewControllerTransitionCoordinator): void;

  playerViewControllerRestoreUserInterfaceForFullScreenExitWithCompletionHandler?(playerViewController: AVPlayerViewController, completionHandler: (p1: boolean) => void): void;

  playerViewControllerWillStartPictureInPicture?(playerViewController: AVPlayerViewController): void;

  playerViewControllerDidStartPictureInPicture?(playerViewController: AVPlayerViewController): void;

  playerViewControllerFailedToStartPictureInPictureWithError?(playerViewController: AVPlayerViewController, error: NSError): void;

  playerViewControllerWillStopPictureInPicture?(playerViewController: AVPlayerViewController): void;

  playerViewControllerDidStopPictureInPicture?(playerViewController: AVPlayerViewController): void;

  playerViewControllerShouldAutomaticallyDismissAtPictureInPictureStart?(playerViewController: AVPlayerViewController): boolean;

  playerViewControllerRestoreUserInterfaceForPictureInPictureStopWithCompletionHandler?(playerViewController: AVPlayerViewController, completionHandler: (p1: boolean) => void): void;

  playerViewControllerWillPresentInterstitialTimeRange?(playerViewController: AVPlayerViewController, interstitial: AVInterstitialTimeRange): void;

  playerViewControllerDidPresentInterstitialTimeRange?(playerViewController: AVPlayerViewController, interstitial: AVInterstitialTimeRange): void;
}

declare class AVPlayerViewControllerDelegate extends NativeObject implements AVPlayerViewControllerDelegate {
}

declare class AVInterstitialTimeRange extends NSObject implements NSCopying, NSSecureCoding {
  readonly timeRange: CMTimeRange;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class AVPictureInPictureVideoCallViewController extends UIViewController {
}

declare class AVCaptureEventInteraction extends NSObject implements UIInteraction {
  initWithEventHandler(handler: (p1: AVCaptureEvent) => void): this;

  initWithPrimaryEventHandlerSecondaryEventHandler(primaryHandler: (p1: AVCaptureEvent) => void, secondaryHandler: (p1: AVCaptureEvent) => void): this;

  enabled: boolean;

  static defaultCaptureSoundDisabled: boolean;

  isEnabled(): boolean;

  setEnabled(enabled: boolean): void;

  static setDefaultCaptureSoundDisabled(defaultCaptureSoundDisabled: boolean): void;

  readonly view: UIView;

  willMoveToView(view: UIView | null): void;

  didMoveToView(view: UIView | null): void;

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

declare class AVCaptureEvent extends NSObject {
  readonly phase: interop.Enum<typeof AVCaptureEventPhase>;

  playSound(sound: AVCaptureEventSound): boolean;

  readonly shouldPlaySound: boolean;
}

declare class AVInputPickerInteraction extends NSObject implements UIInteraction {
  delegate: AVInputPickerInteractionDelegate;

  readonly presented: boolean;

  audioSession: AVAudioSession;

  present(): void;

  dismiss(): void;

  init(): this;

  initWithAudioSession(audioSession: AVAudioSession | null): this;

  setDelegate(delegate: AVInputPickerInteractionDelegate | null): void;

  isPresented(): boolean;

  setAudioSession(audioSession: AVAudioSession): void;

  readonly view: UIView;

  willMoveToView(view: UIView | null): void;

  didMoveToView(view: UIView | null): void;

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

declare class AVRoutePickerView extends UIView {
  delegate: AVRoutePickerViewDelegate;

  activeTintColor: UIColor;

  prioritizesVideoDevices: boolean;

  customRoutingController: AVCustomRoutingController;

  setDelegate(delegate: AVRoutePickerViewDelegate | null): void;

  setActiveTintColor(activeTintColor: UIColor | null): void;

  setPrioritizesVideoDevices(prioritizesVideoDevices: boolean): void;

  setCustomRoutingController(customRoutingController: AVCustomRoutingController): void;
}

declare class AVPictureInPictureControllerContentSource extends NSObject {
  initWithPlayerLayer(playerLayer: AVPlayerLayer): this;

  readonly playerLayer: AVPlayerLayer;

  initWithSampleBufferDisplayLayerPlaybackDelegate(sampleBufferDisplayLayer: AVSampleBufferDisplayLayer, playbackDelegate: AVPictureInPictureSampleBufferPlaybackDelegate): this;

  readonly sampleBufferDisplayLayer: AVSampleBufferDisplayLayer;

  readonly sampleBufferPlaybackDelegate: AVPictureInPictureSampleBufferPlaybackDelegate;

  initWithActiveVideoCallSourceViewContentViewController(sourceView: UIView, contentViewController: AVPictureInPictureVideoCallViewController): this;

  readonly activeVideoCallSourceView: UIView | null;

  readonly activeVideoCallContentViewController: AVPictureInPictureVideoCallViewController;
}

declare class AVPictureInPictureController extends NSObject {
  static isPictureInPictureSupported(): boolean;

  static pictureInPictureButtonStartImageCompatibleWithTraitCollection(traitCollection: UITraitCollection | null): UIImage;

  static pictureInPictureButtonStopImageCompatibleWithTraitCollection(traitCollection: UITraitCollection | null): UIImage;

  static readonly pictureInPictureButtonStartImage: UIImage;

  static readonly pictureInPictureButtonStopImage: UIImage;

  initWithContentSource(contentSource: AVPictureInPictureControllerContentSource): this;

  initWithPlayerLayer(playerLayer: AVPlayerLayer): this;

  contentSource: AVPictureInPictureControllerContentSource;

  readonly playerLayer: AVPlayerLayer;

  delegate: AVPictureInPictureControllerDelegate;

  startPictureInPicture(): void;

  stopPictureInPicture(): void;

  readonly pictureInPicturePossible: boolean;

  readonly pictureInPictureActive: boolean;

  readonly pictureInPictureSuspended: boolean;

  requiresLinearPlayback: boolean;

  canStartPictureInPictureAutomaticallyFromInline: boolean;

  setContentSource(contentSource: AVPictureInPictureControllerContentSource): void;

  setDelegate(delegate: AVPictureInPictureControllerDelegate | null): void;

  isPictureInPicturePossible(): boolean;

  isPictureInPictureActive(): boolean;

  isPictureInPictureSuspended(): boolean;

  setRequiresLinearPlayback(requiresLinearPlayback: boolean): void;

  setCanStartPictureInPictureAutomaticallyFromInline(canStartPictureInPictureAutomaticallyFromInline: boolean): void;

  invalidatePlaybackState(): void;
}

declare class AVCaptureEventSound extends NSObject {
  initWithURLError(url: NSURL, error: interop.PointerConvertible): this;

  static readonly cameraShutterSound: AVCaptureEventSound;

  static readonly beginVideoRecordingSound: AVCaptureEventSound;

  static readonly endVideoRecordingSound: AVCaptureEventSound;
}

declare class AVPlayerViewController extends UIViewController {
  player: AVPlayer;

  showsPlaybackControls: boolean;

  showsTimecodes: boolean;

  videoGravity: string;

  readonly readyForDisplay: boolean;

  readonly videoBounds: CGRect;

  readonly contentOverlayView: UIView;

  allowsPictureInPicturePlayback: boolean;

  allowsVideoFrameAnalysis: boolean;

  videoFrameAnalysisTypes: interop.Enum<typeof AVVideoFrameAnalysisType>;

  readonly toggleLookupAction: UIAction;

  canStartPictureInPictureAutomaticallyFromInline: boolean;

  updatesNowPlayingInfoCenter: boolean;

  entersFullScreenWhenPlaybackBegins: boolean;

  exitsFullScreenWhenPlaybackEnds: boolean;

  requiresLinearPlayback: boolean;

  get pixelBufferAttributes(): NSDictionary;
  set pixelBufferAttributes(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  delegate: AVPlayerViewControllerDelegate;

  get speeds(): NSArray;
  set speeds(value: NSArray<interop.Object> | Array<interop.Object>);

  readonly selectedSpeed: AVPlaybackSpeed;

  selectSpeed(speed: AVPlaybackSpeed): void;

  preferredDisplayDynamicRange: interop.Enum<typeof AVDisplayDynamicRange>;

  static readonly mediaCharacteristicsForSupportedCustomMediaSelectionSchemes: NSArray;

  setPlayer(player: AVPlayer | null): void;

  setShowsPlaybackControls(showsPlaybackControls: boolean): void;

  setShowsTimecodes(showsTimecodes: boolean): void;

  setVideoGravity(videoGravity: string): void;

  isReadyForDisplay(): boolean;

  setAllowsPictureInPicturePlayback(allowsPictureInPicturePlayback: boolean): void;

  setAllowsVideoFrameAnalysis(allowsVideoFrameAnalysis: boolean): void;

  setVideoFrameAnalysisTypes(videoFrameAnalysisTypes: interop.Enum<typeof AVVideoFrameAnalysisType>): void;

  setCanStartPictureInPictureAutomaticallyFromInline(canStartPictureInPictureAutomaticallyFromInline: boolean): void;

  setUpdatesNowPlayingInfoCenter(updatesNowPlayingInfoCenter: boolean): void;

  setEntersFullScreenWhenPlaybackBegins(entersFullScreenWhenPlaybackBegins: boolean): void;

  setExitsFullScreenWhenPlaybackEnds(exitsFullScreenWhenPlaybackEnds: boolean): void;

  setRequiresLinearPlayback(requiresLinearPlayback: boolean): void;

  setPixelBufferAttributes(pixelBufferAttributes: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): void;

  setDelegate(delegate: AVPlayerViewControllerDelegate): void;

  setSpeeds(speeds: NSArray<interop.Object> | Array<interop.Object>): void;

  setPreferredDisplayDynamicRange(preferredDisplayDynamicRange: interop.Enum<typeof AVDisplayDynamicRange>): void;
}

declare class AVPlaybackSpeed extends NSObject {
  static readonly systemDefaultSpeeds: NSArray;

  initWithRateLocalizedName(rate: number, localizedName: string): this;

  readonly rate: number;

  readonly localizedName: string;

  readonly localizedNumericName: string;
}


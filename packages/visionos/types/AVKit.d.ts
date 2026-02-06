/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./UIKit.d.ts" />

declare const AVKitErrorDomain: string;

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

declare const AVAudioSessionRouteSelection: {
  None: 0,
  Local: 1,
  External: 2,
};

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

declare class AVDisplayManager extends NSObject {
  preferredDisplayCriteria: AVDisplayCriteria;

  readonly displayCriteriaMatchingEnabled: boolean;

  setPreferredDisplayCriteria(preferredDisplayCriteria: AVDisplayCriteria | null): void;

  isDisplayCriteriaMatchingEnabled(): boolean;
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

declare class AVPlayerViewController extends UIViewController {
  player: AVPlayer;

  showsPlaybackControls: boolean;

  videoGravity: string;

  readonly videoBounds: CGRect;

  readonly contentOverlayView: UIView;

  allowsPictureInPicturePlayback: boolean;

  canStartPictureInPictureAutomaticallyFromInline: boolean;

  updatesNowPlayingInfoCenter: boolean;

  entersFullScreenWhenPlaybackBegins: boolean;

  exitsFullScreenWhenPlaybackEnds: boolean;

  requiresLinearPlayback: boolean;

  appliesPreferredDisplayCriteriaAutomatically: boolean;

  delegate: AVPlayerViewControllerDelegate;

  get speeds(): NSArray;
  set speeds(value: NSArray<interop.Object> | Array<interop.Object>);

  readonly selectedSpeed: AVPlaybackSpeed;

  selectSpeed(speed: AVPlaybackSpeed): void;

  requiresMonoscopicViewingMode: boolean;

  get contextualActions(): NSArray;
  set contextualActions(value: NSArray<interop.Object> | Array<interop.Object>);

  readonly contextualActionsInfoView: UIView;

  contextualActionsPreviewImage: UIImage;

  readonly groupExperienceCoordinator: interop.Object;

  get customInfoViewControllers(): NSArray;
  set customInfoViewControllers(value: NSArray<interop.Object> | Array<interop.Object>);

  get infoViewActions(): NSArray;
  set infoViewActions(value: NSArray<interop.Object> | Array<interop.Object>);

  readonly canBeginTrimming: boolean;

  beginTrimmingWithCompletionHandler(handler: (p1: boolean) => void | null): void;

  setPlayer(player: AVPlayer | null): void;

  setShowsPlaybackControls(showsPlaybackControls: boolean): void;

  setVideoGravity(videoGravity: string): void;

  setAllowsPictureInPicturePlayback(allowsPictureInPicturePlayback: boolean): void;

  setCanStartPictureInPictureAutomaticallyFromInline(canStartPictureInPictureAutomaticallyFromInline: boolean): void;

  setUpdatesNowPlayingInfoCenter(updatesNowPlayingInfoCenter: boolean): void;

  setEntersFullScreenWhenPlaybackBegins(entersFullScreenWhenPlaybackBegins: boolean): void;

  setExitsFullScreenWhenPlaybackEnds(exitsFullScreenWhenPlaybackEnds: boolean): void;

  setRequiresLinearPlayback(requiresLinearPlayback: boolean): void;

  setAppliesPreferredDisplayCriteriaAutomatically(appliesPreferredDisplayCriteriaAutomatically: boolean): void;

  setDelegate(delegate: AVPlayerViewControllerDelegate): void;

  setSpeeds(speeds: NSArray<interop.Object> | Array<interop.Object>): void;

  setRequiresMonoscopicViewingMode(requiresMonoscopicViewingMode: boolean): void;

  setContextualActions(contextualActions: NSArray<interop.Object> | Array<interop.Object>): void;

  setContextualActionsPreviewImage(contextualActionsPreviewImage: UIImage): void;

  setCustomInfoViewControllers(customInfoViewControllers: NSArray<interop.Object> | Array<interop.Object>): void;

  setInfoViewActions(infoViewActions: NSArray<interop.Object> | Array<interop.Object> | null): void;
}

declare class AVPictureInPictureVideoCallViewController extends UIViewController {
}

declare class AVPlaybackSpeed extends NSObject {
  static readonly systemDefaultSpeeds: NSArray;

  initWithRateLocalizedName(rate: number, localizedName: string): this;

  readonly rate: number;

  readonly localizedName: string;

  readonly localizedNumericName: string;
}


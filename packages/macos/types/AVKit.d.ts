/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./AppKit.d.ts" />
/// <reference path="./Runtime.d.ts" />

declare const AVPlayerViewControlsStyle: {
  None: 0,
  Inline: 1,
  Floating: 2,
  Minimal: 3,
  Default: 1,
};

declare const AVCaptureViewControlsStyle: {
  Inline: 0,
  Floating: 1,
  InlineDeviceSelection: 2,
  Default: 0,
};

declare const AVVideoFrameAnalysisType: {
  None: 0,
  Default: 1,
  Text: 2,
  Subject: 4,
  VisualSearch: 8,
};

declare const AVRoutePickerViewButtonState: {
  Normal: 0,
  NormalHighlighted: 1,
  Active: 2,
  ActiveHighlighted: 3,
};

declare const AVPlayerViewTrimResult: {
  OK: 0,
  Cancel: 1,
};

declare const AVDisplayDynamicRange: {
  Automatic: 0,
  Standard: 1,
  ConstrainedHigh: 2,
  High: 3,
};

declare interface AVRoutePickerViewDelegate extends NSObjectProtocol {
  routePickerViewWillBeginPresentingRoutes?(routePickerView: AVRoutePickerView): void;

  routePickerViewDidEndPresentingRoutes?(routePickerView: AVRoutePickerView): void;
}

declare class AVRoutePickerViewDelegate extends NativeObject implements AVRoutePickerViewDelegate {
}

declare interface AVPlayerViewPictureInPictureDelegate extends NSObjectProtocol {
  playerViewWillStartPictureInPicture?(playerView: AVPlayerView): void;

  playerViewDidStartPictureInPicture?(playerView: AVPlayerView): void;

  playerViewFailedToStartPictureInPictureWithError?(playerView: AVPlayerView, error: NSError): void;

  playerViewWillStopPictureInPicture?(playerView: AVPlayerView): void;

  playerViewDidStopPictureInPicture?(playerView: AVPlayerView): void;

  playerViewRestoreUserInterfaceForPictureInPictureStopWithCompletionHandler?(playerView: AVPlayerView, completionHandler: (p1: boolean) => void): void;

  playerViewShouldAutomaticallyDismissAtPictureInPictureStart?(playerView: AVPlayerView): boolean;
}

declare class AVPlayerViewPictureInPictureDelegate extends NativeObject implements AVPlayerViewPictureInPictureDelegate {
}

declare interface AVCaptureViewDelegate extends NSObjectProtocol {
  captureViewStartRecordingToFileOutput(captureView: AVCaptureView, fileOutput: AVCaptureFileOutput): void;
}

declare class AVCaptureViewDelegate extends NativeObject implements AVCaptureViewDelegate {
}

declare interface AVPlayerViewDelegate extends NSObjectProtocol {
  playerViewWillEnterFullScreen?(playerView: AVPlayerView): void;

  playerViewDidEnterFullScreen?(playerView: AVPlayerView): void;

  playerViewWillExitFullScreen?(playerView: AVPlayerView): void;

  playerViewDidExitFullScreen?(playerView: AVPlayerView): void;

  playerViewRestoreUserInterfaceForFullScreenExitWithCompletionHandler?(playerView: AVPlayerView, completionHandler: (p1: boolean) => void): void;
}

declare class AVPlayerViewDelegate extends NativeObject implements AVPlayerViewDelegate {
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

declare class AVCaptureView extends NSView {
  readonly session: AVCaptureSession;

  setSessionShowVideoPreviewShowAudioPreview(session: AVCaptureSession | null, showVideoPreview: boolean, showAudioPreview: boolean): void;

  readonly fileOutput: AVCaptureFileOutput;

  delegate: AVCaptureViewDelegate;

  controlsStyle: interop.Enum<typeof AVCaptureViewControlsStyle>;

  videoGravity: string;

  setDelegate(delegate: AVCaptureViewDelegate | null): void;

  setControlsStyle(controlsStyle: interop.Enum<typeof AVCaptureViewControlsStyle>): void;

  setVideoGravity(videoGravity: string): void;
}

declare class AVRoutePickerView extends NSView {
  delegate: AVRoutePickerViewDelegate;

  player: AVPlayer;

  routePickerButtonColorForState(state: interop.Enum<typeof AVRoutePickerViewButtonState>): NSColor;

  setRoutePickerButtonColorForState(color: NSColor | null, state: interop.Enum<typeof AVRoutePickerViewButtonState>): void;

  routePickerButtonBordered: boolean;

  setDelegate(delegate: AVRoutePickerViewDelegate | null): void;

  setPlayer(player: AVPlayer): void;

  isRoutePickerButtonBordered(): boolean;

  setRoutePickerButtonBordered(routePickerButtonBordered: boolean): void;
}

declare class AVPictureInPictureController extends NSObject {
  static isPictureInPictureSupported(): boolean;

  static readonly pictureInPictureButtonStartImage: NSImage;

  static readonly pictureInPictureButtonStopImage: NSImage;

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

  setContentSource(contentSource: AVPictureInPictureControllerContentSource): void;

  setDelegate(delegate: AVPictureInPictureControllerDelegate | null): void;

  isPictureInPicturePossible(): boolean;

  isPictureInPictureActive(): boolean;

  isPictureInPictureSuspended(): boolean;

  setRequiresLinearPlayback(requiresLinearPlayback: boolean): void;

  invalidatePlaybackState(): void;
}

declare class AVPictureInPictureControllerContentSource extends NSObject {
  initWithPlayerLayer(playerLayer: AVPlayerLayer): this;

  readonly playerLayer: AVPlayerLayer;

  initWithSampleBufferDisplayLayerPlaybackDelegate(sampleBufferDisplayLayer: AVSampleBufferDisplayLayer, playbackDelegate: AVPictureInPictureSampleBufferPlaybackDelegate): this;

  readonly sampleBufferDisplayLayer: AVSampleBufferDisplayLayer;

  readonly sampleBufferPlaybackDelegate: AVPictureInPictureSampleBufferPlaybackDelegate;
}

declare class AVPlaybackSpeed extends NSObject {
  static readonly systemDefaultSpeeds: NSArray;

  initWithRateLocalizedName(rate: number, localizedName: string): this;

  readonly rate: number;

  readonly localizedName: string;

  readonly localizedNumericName: string;
}

declare class AVPlayerView extends NSView {
  player: AVPlayer;

  controlsStyle: interop.Enum<typeof AVPlayerViewControlsStyle>;

  videoGravity: string;

  readonly readyForDisplay: boolean;

  readonly videoBounds: CGRect;

  readonly contentOverlayView: NSView;

  updatesNowPlayingInfoCenter: boolean;

  delegate: AVPlayerViewDelegate;

  get speeds(): NSArray;
  set speeds(value: NSArray<interop.Object> | Array<interop.Object>);

  readonly selectedSpeed: AVPlaybackSpeed;

  selectSpeed(speed: AVPlaybackSpeed): void;

  allowsVideoFrameAnalysis: boolean;

  videoFrameAnalysisTypes: interop.Enum<typeof AVVideoFrameAnalysisType>;

  allowsMagnification: boolean;

  magnification: number;

  setMagnificationCenteredAtPoint(magnification: number, point: CGPoint): void;

  preferredDisplayDynamicRange: interop.Enum<typeof AVDisplayDynamicRange>;

  setPlayer(player: AVPlayer | null): void;

  setControlsStyle(controlsStyle: interop.Enum<typeof AVPlayerViewControlsStyle>): void;

  setVideoGravity(videoGravity: string): void;

  isReadyForDisplay(): boolean;

  setUpdatesNowPlayingInfoCenter(updatesNowPlayingInfoCenter: boolean): void;

  setDelegate(delegate: AVPlayerViewDelegate): void;

  setSpeeds(speeds: NSArray<interop.Object> | Array<interop.Object>): void;

  setAllowsVideoFrameAnalysis(allowsVideoFrameAnalysis: boolean): void;

  setVideoFrameAnalysisTypes(videoFrameAnalysisTypes: interop.Enum<typeof AVVideoFrameAnalysisType>): void;

  setAllowsMagnification(allowsMagnification: boolean): void;

  setMagnification(magnification: number): void;

  setPreferredDisplayDynamicRange(preferredDisplayDynamicRange: interop.Enum<typeof AVDisplayDynamicRange>): void;

  showsFrameSteppingButtons: boolean;

  showsSharingServiceButton: boolean;

  actionPopUpButtonMenu: NSMenu;

  showsFullScreenToggleButton: boolean;

  showsTimecodes: boolean;

  setShowsFrameSteppingButtons(showsFrameSteppingButtons: boolean): void;

  setShowsSharingServiceButton(showsSharingServiceButton: boolean): void;

  setActionPopUpButtonMenu(actionPopUpButtonMenu: NSMenu | null): void;

  setShowsFullScreenToggleButton(showsFullScreenToggleButton: boolean): void;

  setShowsTimecodes(showsTimecodes: boolean): void;

  readonly canBeginTrimming: boolean;

  beginTrimmingWithCompletionHandler(handler: (p1: interop.Enum<typeof AVPlayerViewTrimResult>) => void | null): void;

  flashChapterNumberChapterTitle(chapterNumber: number, chapterTitle: string | null): void;

  allowsPictureInPicturePlayback: boolean;

  pictureInPictureDelegate: AVPlayerViewPictureInPictureDelegate;

  setAllowsPictureInPicturePlayback(allowsPictureInPicturePlayback: boolean): void;

  setPictureInPictureDelegate(pictureInPictureDelegate: AVPlayerViewPictureInPictureDelegate): void;
}


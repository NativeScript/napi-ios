/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const MPLanguageOptionCharacteristicVoiceOverTranslation: string;

declare const MPLanguageOptionCharacteristicDescribesVideo: string;

declare const MPLanguageOptionCharacteristicEasyToRead: string;

declare const MPLanguageOptionCharacteristicContainsOnlyForcedSubtitles: string;

declare const MPLanguageOptionCharacteristicIsAuxiliaryContent: string;

declare const MPLanguageOptionCharacteristicIsMainProgramContent: string;

declare const MPNowPlayingInfoPropertyInternationalStandardRecordingCode: string;

declare const MPNowPlayingInfoPropertyCreditsStartTime: string;

declare const MPNowPlayingInfoPropertyCurrentPlaybackDate: string;

declare const MPNowPlayingInfoPropertyExternalUserProfileIdentifier: string;

declare const MPNowPlayingInfoPropertyChapterCount: string;

declare const MPNowPlayingInfoPropertyDefaultPlaybackRate: string;

declare const MPNowPlayingInfoPropertyPlaybackRate: string;

declare const MPMediaPlaylistPropertyDescriptionText: string;

declare const MPMediaPlaylistPropertyPlaylistAttributes: string;

declare const MPMediaPlaylistPropertyCloudGlobalID: string;

declare const MPMediaItemPropertyIsPreorder: string;

declare const MPMediaItemPropertyUserGrouping: string;

declare const MPMediaItemPropertyLastPlayedDate: string;

declare const MPMediaItemPropertyHasProtectedAsset: string;

declare const MPMediaItemPropertyAssetURL: string;

declare const MPMediaItemPropertyIsCompilation: string;

declare const MPMediaItemPropertyLyrics: string;

declare const MPMediaItemPropertyDiscNumber: string;

declare const MPMediaItemPropertyAlbumTrackCount: string;

declare const MPMediaItemPropertyAlbumTrackNumber: string;

declare const MPMediaItemPropertyComposerPersistentID: string;

declare const MPMediaItemPropertyGenrePersistentID: string;

declare const MPMediaItemPropertyGenre: string;

declare const MPMediaItemPropertyAlbumArtistPersistentID: string;

declare const MPMediaItemPropertyArtistPersistentID: string;

declare const MPMediaItemPropertyArtist: string;

declare const MPMediaItemPropertyAlbumPersistentID: string;

declare const MPMediaItemPropertyTitle: string;

declare const MPErrorDomain: string;

declare const MPMediaItemPropertyComments: string;

declare const MPLanguageOptionCharacteristicTranscribesSpokenDialog: string;

declare const MPNowPlayingInfoCollectionIdentifier: string;

declare const MPMediaItemPropertyPlaybackDuration: string;

declare const MPMediaPlaybackIsPreparedToPlayDidChangeNotification: string;

declare const MPMediaItemPropertyIsCloudItem: string;

declare const MPNowPlayingInfoPropertyIsLiveStream: string;

declare const MPMediaItemPropertyArtwork: string;

declare const MPNowPlayingInfoPropertyPlaybackQueueCount: string;

declare const MPMediaItemPropertyPersistentID: string;

declare const MPNowPlayingInfoPropertyElapsedPlaybackTime: string;

declare const MPNowPlayingInfoPropertyMediaType: string;

declare const MPMediaItemPropertySkipCount: string;

declare const MPMediaPlaylistPropertySeedItems: string;

declare const MPNowPlayingInfoPropertyAssetURL: string;

declare const MPNowPlayingInfoProperty1x1AnimatedArtwork: string;

declare const MPNowPlayingInfoPropertyPlaybackProgress: string;

declare const MPNowPlayingInfoPropertyAdTimeRanges: string;

declare const MPNowPlayingInfoPropertyExternalContentIdentifier: string;

declare const MPLanguageOptionCharacteristicLanguageTranslation: string;

declare const MPNowPlayingInfoPropertyExcludeFromSuggestions: string;

declare const MPMediaPlaylistPropertyPersistentID: string;

declare const MPNowPlayingInfoProperty3x4AnimatedArtwork: string;

declare const MPMediaPlaylistPropertyName: string;

declare const MPNowPlayingInfoPropertyServiceIdentifier: string;

declare const MPMediaEntityPropertyPersistentID: string;

declare const MPMediaItemPropertyComposer: string;

declare const MPLanguageOptionCharacteristicDescribesMusicAndSound: string;

declare const MPMediaItemPropertyPlayCount: string;

declare const MPMediaItemPropertyMediaType: string;

declare const MPMediaItemPropertyPlaybackStoreID: string;

declare const MPNowPlayingInfoPropertyPlaybackQueueIndex: string;

declare const MPMediaItemPropertyDiscCount: string;

declare const MPMediaItemPropertyBeatsPerMinute: string;

declare const MPLanguageOptionCharacteristicDubbedTranslation: string;

declare const MPMediaItemPropertyDateAdded: string;

declare const MPMediaItemPropertyAlbumArtist: string;

declare const MPMediaItemPropertyPodcastPersistentID: string;

declare const MPNowPlayingInfoPropertyAvailableLanguageOptions: string;

declare const MPMediaItemPropertyReleaseDate: string;

declare const MPMediaItemPropertyPodcastTitle: string;

declare const MPNowPlayingInfoPropertyChapterNumber: string;

declare const MPMediaItemPropertyRating: string;

declare const MPMediaPlaylistPropertyAuthorDisplayName: string;

declare const MPMediaItemPropertyBookmarkTime: string;

declare const MPMediaItemPropertyIsExplicit: string;

declare const MPNowPlayingInfoPropertyCurrentLanguageOptions: string;

declare const MPMediaItemPropertyAlbumTitle: string;

declare const MPNowPlayingInfoMediaType: {
  None: 0,
  Audio: 1,
  Video: 2,
};

declare const MPNowPlayingPlaybackState: {
  Unknown: 0,
  Playing: 1,
  Paused: 2,
  Stopped: 3,
  Interrupted: 4,
};

declare const MPSeekCommandEventType: {
  Begin: 0,
  End: 1,
};

declare const MPRemoteCommandHandlerStatus: {
  Success: 0,
  NoSuchContent: 100,
  NoActionableNowPlayingItem: 110,
  DeviceNotFound: 120,
  CommandFailed: 200,
};

declare const MPRepeatType: {
  Off: 0,
  One: 1,
  All: 2,
};

declare const MPShuffleType: {
  Off: 0,
  Items: 1,
  Collections: 2,
};

declare const MPNowPlayingInfoLanguageOptionType: {
  Audible: 0,
  Legible: 1,
};

declare const MPMediaType: {
  Music: 1,
  Podcast: 2,
  AudioBook: 4,
  AudioITunesU: 8,
  AnyAudio: 255,
  Movie: 256,
  TVShow: 512,
  VideoPodcast: 1024,
  MusicVideo: 2048,
  VideoITunesU: 4096,
  HomeVideo: 8192,
  AnyVideo: 65280,
  Any: -1,
};

declare const MPChangeLanguageOptionSetting: {
  None: 0,
  NowPlayingItemOnly: 1,
  Permanent: 2,
};

declare const MPErrorCode: {
  Unknown: 0,
  PermissionDenied: 1,
  CloudServiceCapabilityMissing: 2,
  NetworkConnectionFailed: 3,
  NotFound: 4,
  NotSupported: 5,
  Cancelled: 6,
  RequestTimedOut: 7,
};

declare interface MPSystemMusicPlayerController extends NSObjectProtocol {
}

declare class MPSystemMusicPlayerController extends NativeObject implements MPSystemMusicPlayerController {
}

declare class MPChangePlaybackPositionCommand extends MPRemoteCommand {
}

declare class MPChangeShuffleModeCommand extends MPRemoteCommand {
  currentShuffleType: interop.Enum<typeof MPShuffleType>;

  setCurrentShuffleType(currentShuffleType: interop.Enum<typeof MPShuffleType>): void;
}

declare class MPRemoteCommand extends NSObject {
  enabled: boolean;

  addTargetAction(target: interop.Object, action: string): void;

  removeTargetAction(target: interop.Object, action: string | null): void;

  removeTarget(target: interop.Object | null): void;

  addTargetWithHandler(handler: (p1: MPRemoteCommandEvent) => interop.Enum<typeof MPRemoteCommandHandlerStatus>): interop.Object;

  isEnabled(): boolean;

  setEnabled(enabled: boolean): void;
}

declare class MPChangeShuffleModeCommandEvent extends MPRemoteCommandEvent {
  readonly shuffleType: interop.Enum<typeof MPShuffleType>;

  readonly preservesShuffleMode: boolean;
}

declare class MPChangeRepeatModeCommandEvent extends MPRemoteCommandEvent {
  readonly repeatType: interop.Enum<typeof MPRepeatType>;

  readonly preservesRepeatMode: boolean;
}

declare class MPChangePlaybackPositionCommandEvent extends MPRemoteCommandEvent {
  readonly positionTime: number;
}

declare class MPChangeLanguageOptionCommandEvent extends MPRemoteCommandEvent {
  readonly languageOption: MPNowPlayingInfoLanguageOption;

  readonly setting: interop.Enum<typeof MPChangeLanguageOptionSetting>;
}

declare class MPChangePlaybackRateCommandEvent extends MPRemoteCommandEvent {
  readonly playbackRate: number;
}

declare class MPRemoteCommandEvent extends NSObject {
  readonly command: MPRemoteCommand;

  readonly timestamp: number;
}

declare class MPChangeRepeatModeCommand extends MPRemoteCommand {
  currentRepeatType: interop.Enum<typeof MPRepeatType>;

  setCurrentRepeatType(currentRepeatType: interop.Enum<typeof MPRepeatType>): void;
}

declare class MPRatingCommand extends MPRemoteCommand {
  minimumRating: number;

  maximumRating: number;

  setMinimumRating(minimumRating: number): void;

  setMaximumRating(maximumRating: number): void;
}

declare class MPSkipIntervalCommand extends MPRemoteCommand {
  get preferredIntervals(): NSArray;
  set preferredIntervals(value: NSArray<interop.Object> | Array<interop.Object>);

  setPreferredIntervals(preferredIntervals: NSArray<interop.Object> | Array<interop.Object>): void;
}

declare class MPNowPlayingInfoLanguageOption extends NSObject {
  initWithTypeLanguageTagCharacteristicsDisplayNameIdentifier(languageOptionType: interop.Enum<typeof MPNowPlayingInfoLanguageOptionType>, languageTag: string, languageOptionCharacteristics: NSArray<interop.Object> | Array<interop.Object> | null, displayName: string, identifier: string): this;

  isAutomaticLegibleLanguageOption(): boolean;

  isAutomaticAudibleLanguageOption(): boolean;

  readonly languageOptionType: interop.Enum<typeof MPNowPlayingInfoLanguageOptionType>;

  readonly languageTag: string;

  readonly languageOptionCharacteristics: NSArray;

  readonly displayName: string;

  readonly identifier: string;
}

declare class MPMediaItemAnimatedArtwork extends NSObject {
  initWithArtworkIDPreviewImageRequestHandlerVideoAssetFileURLRequestHandler(artworkID: string, previewImageRequestHandler: (p1: CGSize, p2: (p1: NSImage) => void) => void | null, videoAssetFileURLRequestHandler: (p1: CGSize, p2: (p1: NSURL) => void) => void | null): this;
}

declare class MPContentItem extends NSObject {
  initWithIdentifier(identifier: string): this;

  readonly identifier: string;

  title: string;

  subtitle: string;

  artwork: MPMediaItemArtwork;

  playbackProgress: number;

  streamingContent: boolean;

  explicitContent: boolean;

  container: boolean;

  playable: boolean;

  setTitle(title: string | null): void;

  setSubtitle(subtitle: string | null): void;

  setArtwork(artwork: MPMediaItemArtwork | null): void;

  setPlaybackProgress(playbackProgress: number): void;

  isStreamingContent(): boolean;

  setStreamingContent(streamingContent: boolean): void;

  isExplicitContent(): boolean;

  setExplicitContent(explicitContent: boolean): void;

  isContainer(): boolean;

  setContainer(container: boolean): void;

  isPlayable(): boolean;

  setPlayable(playable: boolean): void;
}

declare class MPRatingCommandEvent extends MPRemoteCommandEvent {
  readonly rating: number;
}

declare class MPMediaItemArtwork extends NSObject {
  initWithBoundsSizeRequestHandler(boundsSize: CGSize, requestHandler: (p1: CGSize) => NSImage): this;

  imageWithSize(size: CGSize): NSImage;

  readonly bounds: CGRect;

  readonly imageCropRect: CGRect;
}

declare class MPFeedbackCommand extends MPRemoteCommand {
  active: boolean;

  localizedTitle: string;

  localizedShortTitle: string;

  isActive(): boolean;

  setActive(active: boolean): void;

  setLocalizedTitle(localizedTitle: string): void;

  setLocalizedShortTitle(localizedShortTitle: string): void;
}

declare class MPRemoteCommandCenter extends NSObject {
  readonly pauseCommand: MPRemoteCommand;

  readonly playCommand: MPRemoteCommand;

  readonly stopCommand: MPRemoteCommand;

  readonly togglePlayPauseCommand: MPRemoteCommand;

  readonly enableLanguageOptionCommand: MPRemoteCommand;

  readonly disableLanguageOptionCommand: MPRemoteCommand;

  readonly changePlaybackRateCommand: MPChangePlaybackRateCommand;

  readonly changeRepeatModeCommand: MPChangeRepeatModeCommand;

  readonly changeShuffleModeCommand: MPChangeShuffleModeCommand;

  readonly nextTrackCommand: MPRemoteCommand;

  readonly previousTrackCommand: MPRemoteCommand;

  readonly skipForwardCommand: MPSkipIntervalCommand;

  readonly skipBackwardCommand: MPSkipIntervalCommand;

  readonly seekForwardCommand: MPRemoteCommand;

  readonly seekBackwardCommand: MPRemoteCommand;

  readonly changePlaybackPositionCommand: MPChangePlaybackPositionCommand;

  readonly ratingCommand: MPRatingCommand;

  readonly likeCommand: MPFeedbackCommand;

  readonly dislikeCommand: MPFeedbackCommand;

  readonly bookmarkCommand: MPFeedbackCommand;

  static sharedCommandCenter(): MPRemoteCommandCenter;
}

declare class MPNowPlayingInfoCenter extends NSObject {
  static defaultCenter(): MPNowPlayingInfoCenter;

  get nowPlayingInfo(): NSDictionary;
  set nowPlayingInfo(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  playbackState: interop.Enum<typeof MPNowPlayingPlaybackState>;

  static readonly supportedAnimatedArtworkKeys: NSArray;

  setNowPlayingInfo(nowPlayingInfo: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): void;

  setPlaybackState(playbackState: interop.Enum<typeof MPNowPlayingPlaybackState>): void;
}

declare class MPSeekCommandEvent extends MPRemoteCommandEvent {
  readonly type: interop.Enum<typeof MPSeekCommandEventType>;
}

declare class MPChangePlaybackRateCommand extends MPRemoteCommand {
  get supportedPlaybackRates(): NSArray;
  set supportedPlaybackRates(value: NSArray<interop.Object> | Array<interop.Object>);

  setSupportedPlaybackRates(supportedPlaybackRates: NSArray<interop.Object> | Array<interop.Object>): void;
}

declare class MPSkipIntervalCommandEvent extends MPRemoteCommandEvent {
  readonly interval: number;
}

declare class MPNowPlayingInfoLanguageOptionGroup extends NSObject {
  initWithLanguageOptionsDefaultLanguageOptionAllowEmptySelection(languageOptions: NSArray<interop.Object> | Array<interop.Object>, defaultLanguageOption: MPNowPlayingInfoLanguageOption | null, allowEmptySelection: boolean): this;

  readonly languageOptions: NSArray;

  readonly defaultLanguageOption: MPNowPlayingInfoLanguageOption;

  readonly allowEmptySelection: boolean;
}

declare class MPFeedbackCommandEvent extends MPRemoteCommandEvent {
  readonly negative: boolean;

  isNegative(): boolean;
}


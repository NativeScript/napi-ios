/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const ITLibraryDidChangeNotification: string;

declare const ITLibPlaylistPropertyMaster: string;

declare const ITLibPlaylistPropertyKind: string;

declare const ITLibPlaylistPropertyVisible: string;

declare const ITLibPlaylistPropertyPrimary: string;

declare const ITLibPlaylistPropertyDistinguisedKind: string;

declare const ITLibPlaylistPropertyAllItemsPlaylist: string;

declare const ITLibPlaylistPropertyName: string;

declare const ITLibMediaItemPropertyYear: string;

declare const ITLibMediaItemPropertyVoiceOverLanguage: string;

declare const ITLibMediaItemPropertyTrackNumber: string;

declare const ITLibMediaItemPropertySkipDate: string;

declare const ITLibMediaItemPropertyFileSize: string;

declare const ITLibMediaItemPropertySampleRate: string;

declare const ITLibMediaItemPropertyRatingComputed: string;

declare const ITLibMediaItemPropertyIsPurchased: string;

declare const ITLibMediaItemPropertyPlayCount: string;

declare const ITLibMediaItemPropertySortTitle: string;

declare const ITLibMediaItemPropertyTitle: string;

declare const ITLibMediaItemPropertyDescription: string;

declare const ITLibMediaItemPropertyContentRating: string;

declare const ITLibMediaItemPropertyComposer: string;

declare const ITLibMediaItemPropertyCategory: string;

declare const ITLibMediaItemPropertyBitRate: string;

declare const ITLibMediaItemPropertyVideoEpisodeOrder: string;

declare const ITLibMediaItemPropertyVideoEpisode: string;

declare const ITLibMediaItemPropertyVideoSeason: string;

declare const ITLibMediaItemPropertyAlbumTrackCount: string;

declare const ITLibMediaItemPropertyAlbumDiscNumber: string;

declare const ITLibMediaItemPropertyAlbumDiscCount: string;

declare const ITLibMediaItemPropertyAlbumRatingComputed: string;

declare const ITLibMediaItemPropertySortAlbumTitle: string;

declare const ITLibMediaItemPropertyAlbumTitle: string;

declare const ITLibMediaEntityPropertyPersistentID: string;

declare const ITLibMediaItemPropertyVolumeAdjustment: string;

declare const ITLibMediaItemPropertyAlbumIsGapless: string;

declare const ITLibMediaItemPropertyMediaKind: string;

declare const ITLibMediaItemPropertyPlayStatus: string;

declare const ITLibPlaylistPropertyParentPersistentID: string;

declare const ITLibMediaItemPropertyAlbumArtist: string;

declare const ITLibMediaItemPropertyTotalTime: string;

declare const ITLibMediaItemPropertyLastPlayDate: string;

declare const ITLibMediaItemPropertyGenre: string;

declare const ITLibMediaItemPropertyVideoWidth: string;

declare const ITLibMediaItemPropertyHasArtwork: string;

declare const ITLibMediaItemPropertyIsUserDisabled: string;

declare const ITLibMediaItemPropertyMovementName: string;

declare const ITLibMediaItemPropertyFileType: string;

declare const ITLibMediaItemPropertyArtistName: string;

declare const ITLibMediaItemPropertyVolumeNormalizationEnergy: string;

declare const ITLibMediaItemPropertySortComposer: string;

declare const ITLibMediaItemPropertyVideoIsHD: string;

declare const ITLibMediaItemPropertySortAlbumArtist: string;

declare const ITLibMediaItemPropertyLyricsContentRating: string;

declare const ITLibMediaItemPropertyIsVideo: string;

declare const ITLibMediaItemPropertyStartTime: string;

declare const ITLibMediaItemPropertySortArtistName: string;

declare const ITLibMediaItemPropertyVideoSeries: string;

declare const ITLibMediaItemPropertyKind: string;

declare const ITLibMediaItemPropertyVideoHeight: string;

declare const ITLibMediaItemPropertyAlbumIsCompilation: string;

declare const ITLibMediaItemPropertyBeatsPerMinute: string;

declare const ITLibMediaItemPropertyMovementNumber: string;

declare const ITLibMediaItemPropertyAddedDate: string;

declare const ITLibMediaItemPropertyComments: string;

declare const ITLibMediaItemPropertyLocation: string;

declare const ITLibMediaItemPropertyStopTime: string;

declare const ITLibMediaItemPropertyGrouping: string;

declare const ITLibMediaItemPropertyIsDRMProtected: string;

declare const ITLibMediaItemPropertyVideoSortSeries: string;

declare const ITLibMediaItemPropertyWork: string;

declare const ITLibMediaItemPropertyRating: string;

declare const ITLibMediaItemPropertyAlbumRating: string;

declare const ITLibMediaItemPropertyReleaseDate: string;

declare const ITLibPlaylistPropertyItems: string;

declare const ITLibMediaItemPropertyModifiedDate: string;

declare const ITLibMediaItemPropertyLocationType: string;

declare const ITLibMediaItemPropertyMovementCount: string;

declare const ITLibMediaItemPropertyArtwork: string;

declare const ITLibMediaItemPropertyUserSkipCount: string;

declare const ITLibMediaItemPropertySize: string;

declare const ITLibInitOptions: {
  None: 0,
  LazyLoadData: 1,
};

declare const ITLibExportFeature: {
  ITLibExportFeatureNone: 0,
};

declare const ITLibPlaylistKind: {
  Regular: 0,
  Smart: 1,
  Genius: 2,
  Folder: 3,
  GeniusMix: 4,
};

declare const ITLibMediaItemPlayStatus: {
  None: 0,
  PartiallyPlayed: 1,
  Unplayed: 2,
};

declare const ITLibMediaItemLocationType: {
  Unknown: 0,
  File: 1,
  URL: 2,
  Remote: 3,
};

declare const ITLibArtworkFormat: {
  None: 0,
  Bitmap: 1,
  JPEG: 2,
  JPEG2000: 3,
  GIF: 4,
  PNG: 5,
  BMP: 6,
  TIFF: 7,
  PICT: 8,
};

declare const ITLibMediaItemLyricsContentRating: {
  None: 0,
  Explicit: 1,
  Clean: 2,
};

declare const ITLibDistinguishedPlaylistKind: {
  KindNone: 0,
  KindMovies: 1,
  KindTVShows: 2,
  KindMusic: 3,
  KindAudiobooks: 4,
  KindBooks: 4,
  KindRingtones: 5,
  KindPodcasts: 7,
  KindVoiceMemos: 14,
  KindPurchases: 16,
  KindiTunesU: 26,
  Kind90sMusic: 42,
  KindMyTopRated: 43,
  KindTop25MostPlayed: 44,
  KindRecentlyPlayed: 45,
  KindRecentlyAdded: 46,
  KindMusicVideos: 47,
  KindClassicalMusic: 48,
  KindLibraryMusicVideos: 49,
  KindHomeVideos: 50,
  KindApplications: 51,
  KindLovedSongs: 52,
  KindMusicShowsAndMovies: 53,
};

declare const ITLibMediaItemMediaKind: {
  KindUnknown: 1,
  KindSong: 2,
  KindMovie: 3,
  KindPodcast: 4,
  KindAudiobook: 5,
  KindPDFBooklet: 6,
  KindMusicVideo: 7,
  KindTVShow: 8,
  KindInteractiveBooklet: 9,
  KindHomeVideo: 12,
  KindRingtone: 14,
  KindDigitalBooklet: 15,
  KindIOSApplication: 16,
  KindVoiceMemo: 17,
  KindiTunesU: 18,
  KindBook: 19,
  KindPDFBook: 20,
  KindAlertTone: 21,
};

declare class ITLibrary extends NSObject {
  readonly applicationVersion: string;

  readonly features: interop.Enum<typeof ITLibExportFeature>;

  readonly apiMajorVersion: number;

  readonly apiMinorVersion: number;

  readonly mediaFolderLocation: NSURL;

  readonly musicFolderLocation: NSURL;

  readonly showContentRating: boolean;

  readonly allMediaItems: NSArray;

  readonly allPlaylists: NSArray;

  static libraryWithAPIVersionError<This extends abstract new (...args: any) => any>(this: This, requestedAPIVersion: string, error: interop.PointerConvertible): InstanceType<This>;

  static libraryWithAPIVersionOptionsError<This extends abstract new (...args: any) => any>(this: This, requestedAPIVersion: string, options: interop.Enum<typeof ITLibInitOptions>, error: interop.PointerConvertible): InstanceType<This>;

  initWithAPIVersionError(requestedAPIVersion: string, error: interop.PointerConvertible): this;

  initWithAPIVersionOptionsError(requestedAPIVersion: string, options: interop.Enum<typeof ITLibInitOptions>, error: interop.PointerConvertible): this;

  artworkForMediaFile(mediaFileURL: NSURL): ITLibArtwork;

  reloadData(): boolean;

  unloadData(): void;

  shouldShowContentRating(): boolean;
}

declare class ITLibMediaItem extends ITLibMediaEntity {
  readonly title: string;

  readonly sortTitle: string;

  readonly artist: ITLibArtist;

  readonly composer: string;

  readonly sortComposer: string;

  readonly rating: number;

  readonly ratingComputed: boolean;

  readonly startTime: number;

  readonly stopTime: number;

  readonly album: ITLibAlbum;

  readonly genre: string;

  readonly kind: string;

  readonly mediaKind: interop.Enum<typeof ITLibMediaItemMediaKind>;

  readonly fileSize: number;

  readonly size: number;

  readonly totalTime: number;

  readonly trackNumber: number;

  readonly category: string;

  readonly description: string;

  readonly lyricsContentRating: interop.Enum<typeof ITLibMediaItemLyricsContentRating>;

  readonly contentRating: string;

  readonly modifiedDate: NSDate;

  readonly addedDate: NSDate;

  readonly bitrate: number;

  readonly sampleRate: number;

  readonly beatsPerMinute: number;

  readonly playCount: number;

  readonly lastPlayedDate: NSDate;

  readonly playStatus: interop.Enum<typeof ITLibMediaItemPlayStatus>;

  readonly location: NSURL;

  readonly artworkAvailable: boolean;

  readonly artwork: ITLibArtwork;

  readonly comments: string;

  readonly purchased: boolean;

  readonly cloud: boolean;

  readonly drmProtected: boolean;

  readonly video: boolean;

  readonly videoInfo: ITLibMediaItemVideoInfo;

  readonly releaseDate: NSDate;

  readonly year: number;

  readonly fileType: number;

  readonly skipCount: number;

  readonly skipDate: NSDate;

  readonly voiceOverLanguage: string;

  readonly volumeAdjustment: number;

  readonly volumeNormalizationEnergy: number;

  readonly userDisabled: boolean;

  readonly grouping: string;

  readonly locationType: interop.Enum<typeof ITLibMediaItemLocationType>;

  isRatingComputed(): boolean;

  hasArtworkAvailable(): boolean;

  isPurchased(): boolean;

  isCloud(): boolean;

  isDRMProtected(): boolean;

  isVideo(): boolean;

  isUserDisabled(): boolean;
}

declare class ITLibArtist extends NSObject {
  readonly name: string;

  readonly sortName: string;

  readonly persistentID: NSNumber;
}

declare class ITLibPlaylist extends ITLibMediaEntity {
  readonly name: string;

  readonly primary: boolean;

  readonly parentID: NSNumber;

  readonly visible: boolean;

  readonly allItemsPlaylist: boolean;

  readonly items: NSArray;

  readonly distinguishedKind: interop.Enum<typeof ITLibDistinguishedPlaylistKind>;

  readonly kind: interop.Enum<typeof ITLibPlaylistKind>;

  readonly master: boolean;

  isPrimary(): boolean;

  isVisible(): boolean;

  isAllItemsPlaylist(): boolean;

  isMaster(): boolean;
}

declare class ITLibMediaEntity extends NSObject {
  readonly persistentID: NSNumber;

  valueForProperty(property: string): interop.Object;

  enumerateValuesForPropertiesUsingBlock(properties: NSSet | null, block: (p1: string, p2: interop.Object, p3: interop.PointerConvertible) => void): void;

  enumerateValuesExceptForPropertiesUsingBlock(properties: NSSet | null, block: (p1: string, p2: interop.Object, p3: interop.PointerConvertible) => void): void;
}

declare class ITLibAlbum extends NSObject {
  readonly title: string;

  readonly sortTitle: string;

  readonly compilation: boolean;

  readonly artist: ITLibArtist;

  readonly discCount: number;

  readonly discNumber: number;

  readonly rating: number;

  readonly ratingComputed: boolean;

  readonly gapless: boolean;

  readonly trackCount: number;

  readonly albumArtist: string;

  readonly sortAlbumArtist: string;

  readonly persistentID: NSNumber;

  isCompilation(): boolean;

  isRatingComputed(): boolean;

  isGapless(): boolean;
}

declare class ITLibMediaItemVideoInfo extends NSObject {
  readonly series: string;

  readonly sortSeries: string;

  readonly season: number;

  readonly episode: string;

  readonly episodeOrder: number;

  readonly hd: boolean;

  readonly videoWidth: number;

  readonly videoHeight: number;

  isHD(): boolean;
}

declare class ITLibArtwork extends NSObject {
  readonly image: NSImage;

  readonly imageData: NSData;

  readonly imageDataFormat: interop.Enum<typeof ITLibArtworkFormat>;
}


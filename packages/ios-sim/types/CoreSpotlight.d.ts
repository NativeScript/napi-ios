/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./Foundation.d.ts" />

declare const CSSearchQueryErrorDomain: string;

declare const CSIndexErrorDomain: string;

declare const CSSearchableItemActivityIdentifier: string;

declare const CSSearchableItemActionType: string;

declare const CSMailboxArchive: string;

declare const CSMailboxTrash: string;

declare const CSActionIdentifier: string;

declare const CSMailboxSent: string;

declare const CSMailboxInbox: string;

declare const CSMailboxJunk: string;

declare const CSSearchQueryString: string;

declare const CSQueryContinuationActionType: string;

declare const CSSuggestionHighlightAttributeName: string;

declare const CSMailboxDrafts: string;

declare const CSSearchableItemUpdateListenerOptions: {
  Default: 0,
  Summarization: 2,
  Priority: 4,
};

declare const CSSearchQueryErrorCode: {
  Unknown: -2000,
  IndexUnreachable: -2001,
  InvalidQuery: -2002,
  Cancelled: -2003,
};

declare const CSSuggestionKind: {
  None: 0,
  Custom: 1,
  Default: 2,
};

declare const CSIndexErrorCode: {
  UnknownError: -1,
  IndexUnavailableError: -1000,
  InvalidItemError: -1001,
  InvalidClientStateError: -1002,
  RemoteConnectionError: -1003,
  QuotaExceeded: -1004,
  IndexingUnsupported: -1005,
  MismatchedClientState: -1006,
};

declare const CSSearchQuerySourceOptions: {
  Default: 0,
  AllowMail: 1,
};

declare const CSUserInteraction: {
  Select: 0,
  Default: 0,
  Focus: 1,
};

declare interface CSSearchableIndexDelegate extends NSObjectProtocol {
  searchableIndexReindexAllSearchableItemsWithAcknowledgementHandler(searchableIndex: CSSearchableIndex, acknowledgementHandler: () => void): void;

  searchableIndexReindexSearchableItemsWithIdentifiersAcknowledgementHandler(searchableIndex: CSSearchableIndex, identifiers: NSArray<interop.Object> | Array<interop.Object>, acknowledgementHandler: () => void): void;

  searchableIndexDidThrottle?(searchableIndex: CSSearchableIndex): void;

  searchableIndexDidFinishThrottle?(searchableIndex: CSSearchableIndex): void;

  dataForSearchableIndexItemIdentifierTypeIdentifierError?(searchableIndex: CSSearchableIndex, itemIdentifier: string, typeIdentifier: string, outError: interop.PointerConvertible): NSData;

  fileURLForSearchableIndexItemIdentifierTypeIdentifierInPlaceError?(searchableIndex: CSSearchableIndex, itemIdentifier: string, typeIdentifier: string, inPlace: boolean, outError: interop.PointerConvertible): NSURL;

  searchableItemsForIdentifiersSearchableItemsHandler?(identifiers: NSArray<interop.Object> | Array<interop.Object>, searchableItemsHandler: (p1: NSArray<interop.Object> | Array<interop.Object>) => void): void;

  searchableItemsDidUpdate?(items: NSArray<interop.Object> | Array<interop.Object>): void;
}

declare class CSSearchableIndexDelegate extends NativeObject implements CSSearchableIndexDelegate {
}

declare class CSSuggestion extends NSObject implements NSSecureCoding, NSCopying {
  readonly localizedAttributedSuggestion: NSAttributedString;

  readonly suggestionKind: interop.Enum<typeof CSSuggestionKind>;

  compareByRank(other: CSSuggestion): interop.Enum<typeof NSComparisonResult>;

  compare(other: CSSuggestion): interop.Enum<typeof NSComparisonResult>;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class CSSearchQuery extends NSObject {
  initWithQueryStringQueryContext(queryString: string, queryContext: CSSearchQueryContext | null): this;

  initWithQueryStringAttributes(queryString: string, attributes: NSArray<interop.Object> | Array<interop.Object> | null): this;

  readonly cancelled: boolean;

  readonly foundItemCount: number;

  foundItemsHandler: (p1: NSArray<interop.Object> | Array<interop.Object>) => void;

  completionHandler: (p1: NSError) => void | null;

  get protectionClasses(): NSArray;
  set protectionClasses(value: NSArray<interop.Object> | Array<interop.Object>);

  start(): void;

  cancel(): void;

  isCancelled(): boolean;

  setFoundItemsHandler(foundItemsHandler: (p1: NSArray<interop.Object> | Array<interop.Object>) => void | null): void;

  setCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  setProtectionClasses(protectionClasses: NSArray<interop.Object> | Array<interop.Object>): void;
}

declare class CSIndexExtensionRequestHandler extends NSObject implements NSExtensionRequestHandling, CSSearchableIndexDelegate {
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

  searchableIndexReindexAllSearchableItemsWithAcknowledgementHandler(searchableIndex: CSSearchableIndex, acknowledgementHandler: () => void): void;

  searchableIndexReindexSearchableItemsWithIdentifiersAcknowledgementHandler(searchableIndex: CSSearchableIndex, identifiers: NSArray<interop.Object> | Array<interop.Object>, acknowledgementHandler: () => void): void;

  searchableIndexDidThrottle(searchableIndex: CSSearchableIndex): void;

  searchableIndexDidFinishThrottle(searchableIndex: CSSearchableIndex): void;

  dataForSearchableIndexItemIdentifierTypeIdentifierError(searchableIndex: CSSearchableIndex, itemIdentifier: string, typeIdentifier: string, outError: interop.PointerConvertible): NSData;

  fileURLForSearchableIndexItemIdentifierTypeIdentifierInPlaceError(searchableIndex: CSSearchableIndex, itemIdentifier: string, typeIdentifier: string, inPlace: boolean, outError: interop.PointerConvertible): NSURL;

  searchableItemsForIdentifiersSearchableItemsHandler(identifiers: NSArray<interop.Object> | Array<interop.Object>, searchableItemsHandler: (p1: NSArray<interop.Object> | Array<interop.Object>) => void): void;

  searchableItemsDidUpdate(items: NSArray<interop.Object> | Array<interop.Object>): void;
}

declare class CSImportExtension extends NSObject implements NSExtensionRequestHandling {
  updateAttributesForFileAtURLError(attributes: CSSearchableItemAttributeSet, contentURL: NSURL, error: interop.PointerConvertible): boolean;

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

declare class CSLocalizedString extends NSString {
  initWithLocalizedStrings(localizedStrings: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): this;

  localizedString(): string;
}

declare class CSPerson extends NSObject implements NSSecureCoding, NSCopying {
  initWithDisplayNameHandlesHandleIdentifier(displayName: string | null, handles: NSArray<interop.Object> | Array<interop.Object>, handleIdentifier: string): this;

  readonly displayName: string;

  readonly handles: NSArray;

  readonly handleIdentifier: string;

  contactIdentifier: string;

  setContactIdentifier(contactIdentifier: string | null): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class CSSearchableItemAttributeSet extends NSObject implements NSCopying, NSSecureCoding {
  initWithItemContentType(itemContentType: string): this;

  initWithContentType(contentType: UTType): this;

  setValueForCustomKey(value: NSSecureCoding | null, key: CSCustomAttributeKey): void;

  valueForCustomKey(key: CSCustomAttributeKey): NSSecureCoding;

  displayName: string;

  get alternateNames(): NSArray;
  set alternateNames(value: NSArray<interop.Object> | Array<interop.Object>);

  path: string;

  contentURL: NSURL;

  thumbnailURL: NSURL;

  thumbnailData: NSData;

  darkThumbnailURL: NSURL;

  relatedUniqueIdentifier: string;

  weakRelatedUniqueIdentifier: string;

  metadataModificationDate: NSDate;

  contentType: string;

  get contentTypeTree(): NSArray;
  set contentTypeTree(value: NSArray<interop.Object> | Array<interop.Object>);

  get keywords(): NSArray;
  set keywords(value: NSArray<interop.Object> | Array<interop.Object>);

  title: string;

  version: string;

  userCreated: NSNumber;

  userOwned: NSNumber;

  userCurated: NSNumber;

  rankingHint: NSNumber;

  domainIdentifier: string;

  setDisplayName(displayName: string | null): void;

  setAlternateNames(alternateNames: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setPath(path: string | null): void;

  setContentURL(contentURL: NSURL | null): void;

  setThumbnailURL(thumbnailURL: NSURL | null): void;

  setThumbnailData(thumbnailData: NSData | null): void;

  setDarkThumbnailURL(darkThumbnailURL: NSURL | null): void;

  setRelatedUniqueIdentifier(relatedUniqueIdentifier: string | null): void;

  setWeakRelatedUniqueIdentifier(weakRelatedUniqueIdentifier: string): void;

  setMetadataModificationDate(metadataModificationDate: NSDate | null): void;

  setContentType(contentType: string | null): void;

  setContentTypeTree(contentTypeTree: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setKeywords(keywords: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setTitle(title: string | null): void;

  setVersion(version: string | null): void;

  isUserCreated(): NSNumber;

  setUserCreated(userCreated: NSNumber): void;

  isUserOwned(): NSNumber;

  setUserOwned(userOwned: NSNumber): void;

  isUserCurated(): NSNumber;

  setUserCurated(userCurated: NSNumber): void;

  setRankingHint(rankingHint: NSNumber): void;

  setDomainIdentifier(domainIdentifier: string): void;

  supportsPhoneCall: NSNumber;

  supportsNavigation: NSNumber;

  get actionIdentifiers(): NSArray;
  set actionIdentifiers(value: NSArray<interop.Object> | Array<interop.Object>);

  sharedItemContentType: UTType;

  setSupportsPhoneCall(supportsPhoneCall: NSNumber | null): void;

  setSupportsNavigation(supportsNavigation: NSNumber | null): void;

  setActionIdentifiers(actionIdentifiers: NSArray<interop.Object> | Array<interop.Object>): void;

  setSharedItemContentType(sharedItemContentType: UTType): void;

  containerTitle: string;

  containerDisplayName: string;

  containerIdentifier: string;

  containerOrder: NSNumber;

  setContainerTitle(containerTitle: string | null): void;

  setContainerDisplayName(containerDisplayName: string | null): void;

  setContainerIdentifier(containerIdentifier: string | null): void;

  setContainerOrder(containerOrder: NSNumber | null): void;

  get providerDataTypeIdentifiers(): NSArray;
  set providerDataTypeIdentifiers(value: NSArray<interop.Object> | Array<interop.Object>);

  get providerFileTypeIdentifiers(): NSArray;
  set providerFileTypeIdentifiers(value: NSArray<interop.Object> | Array<interop.Object>);

  get providerInPlaceFileTypeIdentifiers(): NSArray;
  set providerInPlaceFileTypeIdentifiers(value: NSArray<interop.Object> | Array<interop.Object>);

  setProviderDataTypeIdentifiers(providerDataTypeIdentifiers: NSArray<interop.Object> | Array<interop.Object>): void;

  setProviderFileTypeIdentifiers(providerFileTypeIdentifiers: NSArray<interop.Object> | Array<interop.Object>): void;

  setProviderInPlaceFileTypeIdentifiers(providerInPlaceFileTypeIdentifiers: NSArray<interop.Object> | Array<interop.Object>): void;

  moveFrom(sourceAttributeSet: CSSearchableItemAttributeSet): void;

  subject: string;

  theme: string;

  contentDescription: string;

  identifier: string;

  get audiences(): NSArray;
  set audiences(value: NSArray<interop.Object> | Array<interop.Object>);

  fileSize: NSNumber;

  pageCount: NSNumber;

  pageWidth: NSNumber;

  pageHeight: NSNumber;

  securityMethod: string;

  creator: string;

  get encodingApplications(): NSArray;
  set encodingApplications(value: NSArray<interop.Object> | Array<interop.Object>);

  kind: string;

  get fontNames(): NSArray;
  set fontNames(value: NSArray<interop.Object> | Array<interop.Object>);

  setSubject(subject: string | null): void;

  setTheme(theme: string | null): void;

  setContentDescription(contentDescription: string | null): void;

  setIdentifier(identifier: string | null): void;

  setAudiences(audiences: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setFileSize(fileSize: NSNumber | null): void;

  setPageCount(pageCount: NSNumber | null): void;

  setPageWidth(pageWidth: NSNumber | null): void;

  setPageHeight(pageHeight: NSNumber | null): void;

  setSecurityMethod(securityMethod: string | null): void;

  setCreator(creator: string | null): void;

  setEncodingApplications(encodingApplications: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setKind(kind: string | null): void;

  setFontNames(fontNames: NSArray<interop.Object> | Array<interop.Object> | null): void;

  dueDate: NSDate;

  completionDate: NSDate;

  startDate: NSDate;

  endDate: NSDate;

  get importantDates(): NSArray;
  set importantDates(value: NSArray<interop.Object> | Array<interop.Object>);

  allDay: NSNumber;

  setDueDate(dueDate: NSDate | null): void;

  setCompletionDate(completionDate: NSDate | null): void;

  setStartDate(startDate: NSDate | null): void;

  setEndDate(endDate: NSDate | null): void;

  setImportantDates(importantDates: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setAllDay(allDay: NSNumber | null): void;

  accountIdentifier: string;

  get accountHandles(): NSArray;
  set accountHandles(value: NSArray<interop.Object> | Array<interop.Object>);

  HTMLContentData: NSData;

  textContent: string;

  get authors(): NSArray;
  set authors(value: NSArray<interop.Object> | Array<interop.Object>);

  get primaryRecipients(): NSArray;
  set primaryRecipients(value: NSArray<interop.Object> | Array<interop.Object>);

  get additionalRecipients(): NSArray;
  set additionalRecipients(value: NSArray<interop.Object> | Array<interop.Object>);

  get hiddenAdditionalRecipients(): NSArray;
  set hiddenAdditionalRecipients(value: NSArray<interop.Object> | Array<interop.Object>);

  get emailHeaders(): NSDictionary;
  set emailHeaders(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  get mailboxIdentifiers(): NSArray;
  set mailboxIdentifiers(value: NSArray<interop.Object> | Array<interop.Object>);

  get authorNames(): NSArray;
  set authorNames(value: NSArray<interop.Object> | Array<interop.Object>);

  get recipientNames(): NSArray;
  set recipientNames(value: NSArray<interop.Object> | Array<interop.Object>);

  get authorEmailAddresses(): NSArray;
  set authorEmailAddresses(value: NSArray<interop.Object> | Array<interop.Object>);

  get recipientEmailAddresses(): NSArray;
  set recipientEmailAddresses(value: NSArray<interop.Object> | Array<interop.Object>);

  get authorAddresses(): NSArray;
  set authorAddresses(value: NSArray<interop.Object> | Array<interop.Object>);

  get recipientAddresses(): NSArray;
  set recipientAddresses(value: NSArray<interop.Object> | Array<interop.Object>);

  get phoneNumbers(): NSArray;
  set phoneNumbers(value: NSArray<interop.Object> | Array<interop.Object>);

  get emailAddresses(): NSArray;
  set emailAddresses(value: NSArray<interop.Object> | Array<interop.Object>);

  get instantMessageAddresses(): NSArray;
  set instantMessageAddresses(value: NSArray<interop.Object> | Array<interop.Object>);

  likelyJunk: NSNumber;

  readonly isPriority: NSNumber;

  readonly textContentSummary: string;

  transcribedTextContent: string;

  setAccountIdentifier(accountIdentifier: string | null): void;

  setAccountHandles(accountHandles: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setHTMLContentData(HTMLContentData: NSData | null): void;

  setTextContent(textContent: string | null): void;

  setAuthors(authors: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setPrimaryRecipients(primaryRecipients: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setAdditionalRecipients(additionalRecipients: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setHiddenAdditionalRecipients(hiddenAdditionalRecipients: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setEmailHeaders(emailHeaders: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): void;

  setMailboxIdentifiers(mailboxIdentifiers: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setAuthorNames(authorNames: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setRecipientNames(recipientNames: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setAuthorEmailAddresses(authorEmailAddresses: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setRecipientEmailAddresses(recipientEmailAddresses: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setAuthorAddresses(authorAddresses: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setRecipientAddresses(recipientAddresses: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setPhoneNumbers(phoneNumbers: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setEmailAddresses(emailAddresses: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setInstantMessageAddresses(instantMessageAddresses: NSArray<interop.Object> | Array<interop.Object> | null): void;

  isLikelyJunk(): NSNumber;

  setLikelyJunk(likelyJunk: NSNumber): void;

  setTranscribedTextContent(transcribedTextContent: string): void;

  get editors(): NSArray;
  set editors(value: NSArray<interop.Object> | Array<interop.Object>);

  get participants(): NSArray;
  set participants(value: NSArray<interop.Object> | Array<interop.Object>);

  get projects(): NSArray;
  set projects(value: NSArray<interop.Object> | Array<interop.Object>);

  downloadedDate: NSDate;

  get contentSources(): NSArray;
  set contentSources(value: NSArray<interop.Object> | Array<interop.Object>);

  comment: string;

  copyright: string;

  lastUsedDate: NSDate;

  contentCreationDate: NSDate;

  contentModificationDate: NSDate;

  addedDate: NSDate;

  duration: NSNumber;

  get contactKeywords(): NSArray;
  set contactKeywords(value: NSArray<interop.Object> | Array<interop.Object>);

  get codecs(): NSArray;
  set codecs(value: NSArray<interop.Object> | Array<interop.Object>);

  get mediaTypes(): NSArray;
  set mediaTypes(value: NSArray<interop.Object> | Array<interop.Object>);

  streamable: NSNumber;

  totalBitRate: NSNumber;

  videoBitRate: NSNumber;

  audioBitRate: NSNumber;

  deliveryType: NSNumber;

  get organizations(): NSArray;
  set organizations(value: NSArray<interop.Object> | Array<interop.Object>);

  role: string;

  get languages(): NSArray;
  set languages(value: NSArray<interop.Object> | Array<interop.Object>);

  rights: string;

  get publishers(): NSArray;
  set publishers(value: NSArray<interop.Object> | Array<interop.Object>);

  get contributors(): NSArray;
  set contributors(value: NSArray<interop.Object> | Array<interop.Object>);

  get coverage(): NSArray;
  set coverage(value: NSArray<interop.Object> | Array<interop.Object>);

  rating: NSNumber;

  ratingDescription: string;

  playCount: NSNumber;

  information: string;

  director: string;

  producer: string;

  genre: string;

  get performers(): NSArray;
  set performers(value: NSArray<interop.Object> | Array<interop.Object>);

  originalFormat: string;

  originalSource: string;

  local: NSNumber;

  contentRating: NSNumber;

  URL: NSURL;

  setEditors(editors: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setParticipants(participants: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setProjects(projects: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setDownloadedDate(downloadedDate: NSDate | null): void;

  setContentSources(contentSources: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setComment(comment: string | null): void;

  setCopyright(copyright: string | null): void;

  setLastUsedDate(lastUsedDate: NSDate | null): void;

  setContentCreationDate(contentCreationDate: NSDate | null): void;

  setContentModificationDate(contentModificationDate: NSDate | null): void;

  setAddedDate(addedDate: NSDate | null): void;

  setDuration(duration: NSNumber | null): void;

  setContactKeywords(contactKeywords: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setCodecs(codecs: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setMediaTypes(mediaTypes: NSArray<interop.Object> | Array<interop.Object> | null): void;

  isStreamable(): NSNumber | null;

  setStreamable(streamable: NSNumber | null): void;

  setTotalBitRate(totalBitRate: NSNumber | null): void;

  setVideoBitRate(videoBitRate: NSNumber | null): void;

  setAudioBitRate(audioBitRate: NSNumber | null): void;

  setDeliveryType(deliveryType: NSNumber | null): void;

  setOrganizations(organizations: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setRole(role: string | null): void;

  setLanguages(languages: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setRights(rights: string | null): void;

  setPublishers(publishers: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setContributors(contributors: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setCoverage(coverage: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setRating(rating: NSNumber | null): void;

  setRatingDescription(ratingDescription: string | null): void;

  setPlayCount(playCount: NSNumber | null): void;

  setInformation(information: string | null): void;

  setDirector(director: string | null): void;

  setProducer(producer: string | null): void;

  setGenre(genre: string | null): void;

  setPerformers(performers: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setOriginalFormat(originalFormat: string | null): void;

  setOriginalSource(originalSource: string | null): void;

  isLocal(): NSNumber | null;

  setLocal(local: NSNumber | null): void;

  setContentRating(contentRating: NSNumber | null): void;

  setURL(URL: NSURL | null): void;

  audioSampleRate: NSNumber;

  audioChannelCount: NSNumber;

  tempo: NSNumber;

  keySignature: string;

  timeSignature: string;

  audioEncodingApplication: string;

  composer: string;

  lyricist: string;

  album: string;

  artist: string;

  audioTrackNumber: NSNumber;

  recordingDate: NSDate;

  musicalGenre: string;

  generalMIDISequence: NSNumber;

  musicalInstrumentCategory: string;

  musicalInstrumentName: string;

  setAudioSampleRate(audioSampleRate: NSNumber | null): void;

  setAudioChannelCount(audioChannelCount: NSNumber | null): void;

  setTempo(tempo: NSNumber | null): void;

  setKeySignature(keySignature: string | null): void;

  setTimeSignature(timeSignature: string | null): void;

  setAudioEncodingApplication(audioEncodingApplication: string | null): void;

  setComposer(composer: string | null): void;

  setLyricist(lyricist: string | null): void;

  setAlbum(album: string | null): void;

  setArtist(artist: string | null): void;

  setAudioTrackNumber(audioTrackNumber: NSNumber | null): void;

  setRecordingDate(recordingDate: NSDate | null): void;

  setMusicalGenre(musicalGenre: string | null): void;

  isGeneralMIDISequence(): NSNumber | null;

  setGeneralMIDISequence(generalMIDISequence: NSNumber | null): void;

  setMusicalInstrumentCategory(musicalInstrumentCategory: string | null): void;

  setMusicalInstrumentName(musicalInstrumentName: string | null): void;

  pixelHeight: NSNumber;

  pixelWidth: NSNumber;

  pixelCount: NSNumber;

  colorSpace: string;

  bitsPerSample: NSNumber;

  flashOn: NSNumber;

  focalLength: NSNumber;

  focalLength35mm: NSNumber;

  acquisitionMake: string;

  acquisitionModel: string;

  cameraOwner: string;

  lensModel: string;

  ISOSpeed: NSNumber;

  orientation: NSNumber;

  get layerNames(): NSArray;
  set layerNames(value: NSArray<interop.Object> | Array<interop.Object>);

  whiteBalance: NSNumber;

  aperture: NSNumber;

  profileName: string;

  resolutionWidthDPI: NSNumber;

  resolutionHeightDPI: NSNumber;

  exposureMode: NSNumber;

  exposureTime: NSNumber;

  EXIFVersion: string;

  EXIFGPSVersion: string;

  hasAlphaChannel: NSNumber;

  redEyeOn: NSNumber;

  meteringMode: string;

  maxAperture: NSNumber;

  fNumber: NSNumber;

  exposureProgram: string;

  exposureTimeString: string;

  setPixelHeight(pixelHeight: NSNumber | null): void;

  setPixelWidth(pixelWidth: NSNumber | null): void;

  setPixelCount(pixelCount: NSNumber | null): void;

  setColorSpace(colorSpace: string | null): void;

  setBitsPerSample(bitsPerSample: NSNumber | null): void;

  isFlashOn(): NSNumber | null;

  setFlashOn(flashOn: NSNumber | null): void;

  setFocalLength(focalLength: NSNumber | null): void;

  isFocalLength35mm(): NSNumber | null;

  setFocalLength35mm(focalLength35mm: NSNumber | null): void;

  setAcquisitionMake(acquisitionMake: string | null): void;

  setAcquisitionModel(acquisitionModel: string | null): void;

  setCameraOwner(cameraOwner: string | null): void;

  setLensModel(lensModel: string | null): void;

  setISOSpeed(ISOSpeed: NSNumber | null): void;

  setOrientation(orientation: NSNumber | null): void;

  setLayerNames(layerNames: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setWhiteBalance(whiteBalance: NSNumber | null): void;

  setAperture(aperture: NSNumber | null): void;

  setProfileName(profileName: string | null): void;

  setResolutionWidthDPI(resolutionWidthDPI: NSNumber | null): void;

  setResolutionHeightDPI(resolutionHeightDPI: NSNumber | null): void;

  setExposureMode(exposureMode: NSNumber | null): void;

  setExposureTime(exposureTime: NSNumber | null): void;

  setEXIFVersion(EXIFVersion: string | null): void;

  setEXIFGPSVersion(EXIFGPSVersion: string | null): void;

  setHasAlphaChannel(hasAlphaChannel: NSNumber | null): void;

  isRedEyeOn(): NSNumber | null;

  setRedEyeOn(redEyeOn: NSNumber | null): void;

  setMeteringMode(meteringMode: string | null): void;

  setMaxAperture(maxAperture: NSNumber | null): void;

  setFNumber(fNumber: NSNumber | null): void;

  setExposureProgram(exposureProgram: string | null): void;

  setExposureTimeString(exposureTimeString: string | null): void;

  headline: string;

  instructions: string;

  thoroughfare: string;

  subThoroughfare: string;

  postalCode: string;

  city: string;

  stateOrProvince: string;

  country: string;

  fullyFormattedAddress: string;

  altitude: NSNumber;

  latitude: NSNumber;

  longitude: NSNumber;

  speed: NSNumber;

  timestamp: NSDate;

  imageDirection: NSNumber;

  namedLocation: string;

  GPSTrack: NSNumber;

  GPSStatus: string;

  GPSMeasureMode: string;

  GPSDOP: NSNumber;

  GPSMapDatum: string;

  GPSDestLatitude: NSNumber;

  GPSDestLongitude: NSNumber;

  GPSDestBearing: NSNumber;

  GPSDestDistance: NSNumber;

  GPSProcessingMethod: string;

  GPSAreaInformation: string;

  GPSDateStamp: NSDate;

  GPSDifferental: NSNumber;

  setHeadline(headline: string | null): void;

  setInstructions(instructions: string | null): void;

  setThoroughfare(thoroughfare: string | null): void;

  setSubThoroughfare(subThoroughfare: string | null): void;

  setPostalCode(postalCode: string | null): void;

  setCity(city: string | null): void;

  setStateOrProvince(stateOrProvince: string | null): void;

  setCountry(country: string | null): void;

  setFullyFormattedAddress(fullyFormattedAddress: string | null): void;

  setAltitude(altitude: NSNumber | null): void;

  setLatitude(latitude: NSNumber | null): void;

  setLongitude(longitude: NSNumber | null): void;

  setSpeed(speed: NSNumber | null): void;

  setTimestamp(timestamp: NSDate | null): void;

  setImageDirection(imageDirection: NSNumber | null): void;

  setNamedLocation(namedLocation: string | null): void;

  setGPSTrack(GPSTrack: NSNumber | null): void;

  setGPSStatus(GPSStatus: string | null): void;

  setGPSMeasureMode(GPSMeasureMode: string | null): void;

  setGPSDOP(GPSDOP: NSNumber | null): void;

  setGPSMapDatum(GPSMapDatum: string | null): void;

  setGPSDestLatitude(GPSDestLatitude: NSNumber | null): void;

  setGPSDestLongitude(GPSDestLongitude: NSNumber | null): void;

  setGPSDestBearing(GPSDestBearing: NSNumber | null): void;

  setGPSDestDistance(GPSDestDistance: NSNumber | null): void;

  setGPSProcessingMethod(GPSProcessingMethod: string | null): void;

  setGPSAreaInformation(GPSAreaInformation: string | null): void;

  setGPSDateStamp(GPSDateStamp: NSDate | null): void;

  setGPSDifferental(GPSDifferental: NSNumber | null): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CSUserQueryContext extends CSSearchQueryContext {
  static userQueryContext(): CSUserQueryContext;

  static userQueryContextWithCurrentSuggestion(currentSuggestion: CSSuggestion | null): CSUserQueryContext;

  enableRankedResults: boolean;

  disableSemanticSearch: boolean;

  maxResultCount: number;

  maxSuggestionCount: number;

  maxRankedResultCount: number;

  setEnableRankedResults(enableRankedResults: boolean): void;

  setDisableSemanticSearch(disableSemanticSearch: boolean): void;

  setMaxResultCount(maxResultCount: number): void;

  setMaxSuggestionCount(maxSuggestionCount: number): void;

  setMaxRankedResultCount(maxRankedResultCount: number): void;
}

declare class CSUserQuery extends CSSearchQuery {
  static prepare(): void;

  static prepareProtectionClasses(protectionClasses: NSArray<interop.Object> | Array<interop.Object>): void;

  initWithUserQueryStringUserQueryContext(userQueryString: string | null, userQueryContext: CSUserQueryContext | null): this;

  readonly foundSuggestionCount: number;

  foundSuggestionsHandler: (p1: NSArray<interop.Object> | Array<interop.Object>) => void;

  userEngagedWithItemVisibleItemsUserInteractionType(item: CSSearchableItem, visibleItems: NSArray<interop.Object> | Array<interop.Object>, userInteractionType: interop.Enum<typeof CSUserInteraction>): void;

  userEngagedWithSuggestionVisibleSuggestionsUserInteractionType(suggestion: CSSuggestion, visibleSuggestions: NSArray<interop.Object> | Array<interop.Object>, userInteractionType: interop.Enum<typeof CSUserInteraction>): void;

  start(): void;

  cancel(): void;

  setFoundSuggestionsHandler(foundSuggestionsHandler: (p1: NSArray<interop.Object> | Array<interop.Object>) => void | null): void;
}

declare class CSSearchableItem extends NSObject implements NSSecureCoding, NSCopying {
  initWithUniqueIdentifierDomainIdentifierAttributeSet(uniqueIdentifier: string | null, domainIdentifier: string | null, attributeSet: CSSearchableItemAttributeSet): this;

  compareByRank(other: CSSearchableItem): interop.Enum<typeof NSComparisonResult>;

  uniqueIdentifier: string;

  domainIdentifier: string;

  expirationDate: NSDate;

  attributeSet: CSSearchableItemAttributeSet;

  isUpdate: boolean;

  updateListenerOptions: interop.Enum<typeof CSSearchableItemUpdateListenerOptions>;

  setUniqueIdentifier(uniqueIdentifier: string): void;

  setDomainIdentifier(domainIdentifier: string | null): void;

  setExpirationDate(expirationDate: NSDate | null): void;

  setAttributeSet(attributeSet: CSSearchableItemAttributeSet): void;

  setIsUpdate(isUpdate: boolean): void;

  setUpdateListenerOptions(updateListenerOptions: interop.Enum<typeof CSSearchableItemUpdateListenerOptions>): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class CSCustomAttributeKey extends NSObject implements NSCopying, NSSecureCoding {
  initWithKeyName(keyName: string): this;

  initWithKeyNameSearchableSearchableByDefaultUniqueMultiValued(keyName: string, searchable: boolean, searchableByDefault: boolean, unique: boolean, multiValued: boolean): this;

  readonly keyName: string;

  readonly searchable: boolean;

  readonly searchableByDefault: boolean;

  readonly unique: boolean;

  readonly multiValued: boolean;

  isSearchable(): boolean;

  isSearchableByDefault(): boolean;

  isUnique(): boolean;

  isMultiValued(): boolean;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class CSSearchQueryContext extends NSObject implements NSSecureCoding, NSCopying {
  get fetchAttributes(): NSArray;
  set fetchAttributes(value: NSArray<interop.Object> | Array<interop.Object>);

  get filterQueries(): NSArray;
  set filterQueries(value: NSArray<interop.Object> | Array<interop.Object>);

  keyboardLanguage: string;

  sourceOptions: interop.Enum<typeof CSSearchQuerySourceOptions>;

  setFetchAttributes(fetchAttributes: NSArray<interop.Object> | Array<interop.Object>): void;

  setFilterQueries(filterQueries: NSArray<interop.Object> | Array<interop.Object>): void;

  setKeyboardLanguage(keyboardLanguage: string | null): void;

  setSourceOptions(sourceOptions: interop.Enum<typeof CSSearchQuerySourceOptions>): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class CSSearchableIndex extends NSObject {
  indexDelegate: CSSearchableIndexDelegate;

  static isIndexingAvailable(): boolean;

  static defaultSearchableIndex<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  initWithName(name: string): this;

  initWithNameProtectionClass(name: string, protectionClass: string | null): this;

  indexSearchableItemsCompletionHandler(items: NSArray<interop.Object> | Array<interop.Object>, completionHandler: (p1: NSError) => void | null): void;

  deleteSearchableItemsWithIdentifiersCompletionHandler(identifiers: NSArray<interop.Object> | Array<interop.Object>, completionHandler: (p1: NSError) => void | null): void;

  deleteSearchableItemsWithDomainIdentifiersCompletionHandler(domainIdentifiers: NSArray<interop.Object> | Array<interop.Object>, completionHandler: (p1: NSError) => void | null): void;

  deleteAllSearchableItemsWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  setIndexDelegate(indexDelegate: CSSearchableIndexDelegate | null): void;

  beginIndexBatch(): void;

  endIndexBatchWithExpectedClientStateNewClientStateCompletionHandler(expectedClientState: NSData | null, newClientState: NSData, completionHandler: (p1: NSError) => void | null): void;

  endIndexBatchWithClientStateCompletionHandler(clientState: NSData, completionHandler: (p1: NSError) => void | null): void;

  fetchLastClientStateWithCompletionHandler(completionHandler: (p1: NSData, p2: NSError) => void | null): void;

  fetchDataForBundleIdentifierItemIdentifierContentTypeCompletionHandler(bundleIdentifier: string, itemIdentifier: string, contentType: UTType, completionHandler: (p1: NSData, p2: NSError) => void | null): void;
}


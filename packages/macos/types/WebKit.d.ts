/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./AppKit.d.ts" />
/// <reference path="./Foundation.d.ts" />

declare const WebViewDidChangeSelectionNotification: string;

declare const WebViewDidEndEditingNotification: string;

declare const WebViewDidBeginEditingNotification: string;

declare const WebViewProgressEstimateChangedNotification: string;

declare const WebViewProgressStartedNotification: string;

declare const WebElementLinkTitleKey: string;

declare const WebElementLinkURLKey: string;

declare const WebElementIsSelectedKey: string;

declare const WebElementImageKey: string;

declare const WebElementImageAltStringKey: string;

declare const WebMenuItemPDFPreviousPage: number;

declare const WebMenuItemTagOpenWithDefaultApplication: number;

declare const WebMenuItemTagLookUpInDictionary: number;

declare const WebMenuItemTagSearchInSpotlight: number;

declare const WebMenuItemTagLearnSpelling: number;

declare const WebMenuItemTagIgnoreSpelling: number;

declare const WebMenuItemTagSpellingGuess: number;

declare const WebMenuItemTagReload: number;

declare const WebMenuItemTagGoForward: number;

declare const WebMenuItemTagOpenFrameInNewWindow: number;

declare const WebMenuItemTagDownloadImageToDisk: number;

declare const WebMenuItemTagOpenImageInNewWindow: number;

declare const WebMenuItemTagDownloadLinkToDisk: number;

declare const WebMenuItemTagOpenLinkInNewWindow: number;

declare const WebPreferencesChangedNotification: string;

declare const WebActionOriginalURLKey: string;

declare const WebActionNavigationTypeKey: string;

declare const WebPlugInShouldLoadMainResourceKey: string;

declare const WebPlugInBaseURLKey: string;

declare const WebKitErrorJavaUnavailable: number;

declare const WebKitErrorCannotLoadPlugIn: number;

declare const WebKitErrorFrameLoadInterruptedByPolicyChange: number;

declare const WebKitErrorCannotShowURL: number;

declare const WebKitErrorCannotShowMIMEType: number;

declare const WebKitErrorMIMETypeKey: string;

declare const WebKitErrorDomain: string;

declare const WebHistorySavedNotification: string;

declare const WebHistoryLoadedNotification: string;

declare const WebHistoryAllItemsRemovedNotification: string;

declare const DOM_ANY_UNORDERED_NODE_TYPE: number;

declare const DOM_ORDERED_NODE_ITERATOR_TYPE: number;

declare const DOM_UNORDERED_NODE_ITERATOR_TYPE: number;

declare const DOM_BOOLEAN_TYPE: number;

declare const DOM_NUMBER_TYPE: number;

declare const DOMXPathException: string;

declare const DOM_SHOW_NOTATION: number;

declare const DOM_SHOW_DOCUMENT_FRAGMENT: number;

declare const DOM_SHOW_ENTITY: number;

declare const DOM_SHOW_ENTITY_REFERENCE: number;

declare const DOM_SHOW_ATTRIBUTE: number;

declare const DOM_SHOW_ALL: number;

declare const DOM_FILTER_REJECT: number;

declare const DOM_DOM_DELTA_PAGE: number;

declare const DOM_BOTH: number;

declare const DOM_VERTICAL: number;

declare const DOM_KEY_LOCATION_STANDARD: number;

declare const DOM_BUBBLING_PHASE: number;

declare const DOM_NODE_AFTER: number;

declare const DOM_END_TO_END: number;

declare const DOMRangeException: string;

declare const DOM_CSS_VMIN: number;

declare const DOM_CSS_VH: number;

declare const DOM_CSS_VW: number;

declare const DOM_CSS_RGBCOLOR: number;

declare const DOM_CSS_URI: number;

declare const DOM_CSS_STRING: number;

declare const DOM_CSS_DIMENSION: number;

declare const DOM_CSS_HZ: number;

declare const DOM_CSS_MS: number;

declare const DOM_CSS_GRAD: number;

declare const DOM_CSS_DEG: number;

declare const DOM_CSS_PT: number;

declare const DOM_CSS_MM: number;

declare const DOM_CSS_CM: number;

declare const DOM_CSS_EMS: number;

declare const DOM_CSS_PERCENTAGE: number;

declare const DOM_CSS_NUMBER: number;

declare const DOM_CSS_UNKNOWN: number;

declare const DOM_CSS_CUSTOM: number;

declare const DOM_CSS_VALUE_LIST: number;

declare const DOM_CSS_PRIMITIVE_VALUE: number;

declare const DOM_NAMESPACE_RULE: number;

declare const DOM_KEYFRAMES_RULE: number;

declare const DOM_PAGE_RULE: number;

declare const DOM_MEDIA_RULE: number;

declare const DOM_STYLE_RULE: number;

declare const DOM_UNKNOWN_RULE: number;

declare const DOM_DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: number;

declare const DOM_DOCUMENT_POSITION_CONTAINS: number;

declare const DOM_DOCUMENT_POSITION_PRECEDING: number;

declare const DOM_DOCUMENT_FRAGMENT_NODE: number;

declare const DOM_DOCUMENT_TYPE_NODE: number;

declare const DOM_DOCUMENT_NODE: number;

declare const DOM_COMMENT_NODE: number;

declare const DOM_ENTITY_NODE: number;

declare const DOM_ENTITY_REFERENCE_NODE: number;

declare const DOM_TEXT_NODE: number;

declare const DOM_ATTRIBUTE_NODE: number;

declare const DOMException$: string;

declare const WKWebsiteDataTypeSearchFieldRecentSearches: string;

declare const WKWebsiteDataTypeServiceWorkerRegistrations: string;

declare const WKWebsiteDataTypeIndexedDBDatabases: string;

declare const WKWebsiteDataTypeWebSQLDatabases: string;

declare const WKWebsiteDataTypeLocalStorage: string;

declare const WKWebsiteDataTypeSessionStorage: string;

declare const WKWebsiteDataTypeMemoryCache: string;

declare const WKWebsiteDataTypeFetchCache: string;

declare const WKWebExtensionMessagePortErrorDomain: string;

declare const WKWebExtensionDataTypeSession: string;

declare const WKWebExtensionContextNotificationUserInfoKeyMatchPatterns: string;

declare const WKWebExtensionContextNotificationUserInfoKeyPermissions: string;

declare const WKWebExtensionContextGrantedPermissionMatchPatternsWereRemovedNotification: string;

declare const WKWebExtensionContextPermissionsWereGrantedNotification: string;

declare const WKWebExtensionContextErrorsDidUpdateNotification: string;

declare const WKWebExtensionErrorDomain: string;

declare const WKWebExtensionPermissionWebNavigation: string;

declare const WKWebExtensionPermissionMenus: string;

declare const WKWebExtensionPermissionDeclarativeNetRequestWithHostAccess: string;

declare const WKWebExtensionPermissionDeclarativeNetRequest: string;

declare const WKWebExtensionPermissionCookies: string;

declare const WKWebExtensionPermissionContextMenus: string;

declare const WKWebExtensionPermissionClipboardWrite: string;

declare const WKWebExtensionMatchPatternErrorDomain: string;

declare const DOM_SUPPORTS_RULE: number;

declare const WKWebExtensionPermissionActiveTab: string;

declare const WKErrorDomain: string;

declare const DOM_ANY_TYPE: number;

declare const WKWebExtensionPermissionAlarms: string;

declare const DOMEventException: string;

declare const WebElementImageURLKey: string;

declare const WebActionButtonKey: string;

declare const WebMenuItemPDFSinglePage: number;

declare const WKWebExtensionContextPermissionMatchPatternsWereGrantedNotification: string;

declare const WKWebExtensionContextGrantedPermissionsWereRemovedNotification: string;

declare const DOM_WEBKIT_KEYFRAME_RULE: number;

declare const DOM_IMPORT_RULE: number;

declare const DOM_CSS_IDENT: number;

declare const WebKitErrorCannotFindPlugIn: number;

declare const DOM_MODIFICATION: number;

declare const DOM_FILTER_SKIP: number;

declare const WebElementLinkLabelKey: string;

declare const WKWebExtensionPermissionScripting: string;

declare const DOM_NOTATION_NODE: number;

declare const WKWebExtensionPermissionDeclarativeNetRequestFeedback: string;

declare const WKWebsiteDataTypeCookies: string;

declare const DOM_FONT_FACE_RULE: number;

declare const DOM_WEBKIT_REGION_RULE: number;

declare const WebKitErrorPlugInPageURLStringKey: string;

declare const DOM_ELEMENT_NODE: number;

declare const DOM_FILTER_ACCEPT: number;

declare const DOM_SHOW_TEXT: number;

declare const WebViewProgressFinishedNotification: string;

declare const WebMenuItemTagCopyLinkToClipboard: number;

declare const DOM_CSS_S: number;

declare const NSReadAccessURLDocumentOption: string;

declare const DOM_SHOW_DOCUMENT_TYPE: number;

declare const DOM_DOCUMENT_POSITION_FOLLOWING: number;

declare const WKWebExtensionPermissionTabs: string;

declare const WKWebExtensionPermissionWebRequest: string;

declare const DOM_START_TO_END: number;

declare const DOM_DOM_DELTA_LINE: number;

declare const WebMenuItemPDFAutoSize: number;

declare const WebHistoryItemChangedNotification: string;

declare const DOM_ALLOW_KEYBOARD_INPUT: number;

declare const DOM_NONE: number;

declare const WebPlugInContainerKey: string;

declare const WKWebsiteDataTypeOfflineWebApplicationCache: string;

declare const WKWebExtensionContextDeniedPermissionsWereRemovedNotification: string;

declare const WKWebsiteDataTypeHashSalt: string;

declare const WebHistoryItemsAddedNotification: string;

declare const WebViewDidChangeNotification: string;

declare const DOM_NODE_BEFORE_AND_AFTER: number;

declare const WKWebExtensionContextPermissionMatchPatternsWereDeniedNotification: string;

declare const DOM_CSS_INHERIT: number;

declare const DOM_ORDERED_NODE_SNAPSHOT_TYPE: number;

declare const WebMenuItemTagCopyImageToClipboard: number;

declare const DOM_ADDITION: number;

declare const WKWebExtensionDataRecordErrorDomain: string;

declare const WebMenuItemTagStop: number;

declare const DOM_CSS_COUNTER: number;

declare const WKWebExtensionPermissionUnlimitedStorage: string;

declare const DOM_CSS_RECT: number;

declare const WebElementFrameKey: string;

declare const DOM_STRING_TYPE: number;

declare const WebMenuItemPDFContinuous: number;

declare const WebKitErrorPlugInNameKey: string;

declare const DOM_KEY_LOCATION_RIGHT: number;

declare const WebActionModifierFlagsKey: string;

declare const DOM_NODE_INSIDE: number;

declare const DOM_END_TO_START: number;

declare const WKWebExtensionContextDeniedPermissionMatchPatternsWereRemovedNotification: string;

declare const WebMenuItemPDFNextPage: number;

declare const WKWebExtensionPermissionStorage: string;

declare const WKWebExtensionPermissionNativeMessaging: string;

declare const DOM_DOCUMENT_POSITION_DISCONNECTED: number;

declare const WebMenuItemTagCut: number;

declare const WebMenuItemTagNoGuessesFound: number;

declare const DOM_CSS_VMAX: number;

declare const WKWebExtensionContextPermissionsWereDeniedNotification: string;

declare const WebViewDidChangeTypingStyleNotification: string;

declare const DOM_WEBKIT_KEYFRAMES_RULE: number;

declare const WebMenuItemPDFZoomOut: number;

declare const DOM_CHARSET_RULE: number;

declare const WebMenuItemPDFActualSize: number;

declare const DOM_CAPTURING_PHASE: number;

declare const WebPlugInContainingElementKey: string;

declare const WebPlugInAttributesKey: string;

declare const WebMenuItemTagCopy: number;

declare const DOM_CSS_IN: number;

declare const WKWebExtensionDataTypeSynchronized: string;

declare const WebMenuItemTagSearchWeb: number;

declare const WebMenuItemTagPaste: number;

declare const DOM_PROCESSING_INSTRUCTION_NODE: number;

declare const WebHistoryItemsKey: string;

declare const WebKitErrorBlockedPlugInVersion: number;

declare const DOM_SHOW_DOCUMENT: number;

declare const WKWebsiteDataTypeMediaKeys: string;

declare const WebElementImageRectKey: string;

declare const DOM_CSS_RAD: number;

declare const DOM_HORIZONTAL: number;

declare const WebMenuItemTagOther: number;

declare const WebHistoryItemsRemovedNotification: string;

declare const DOM_NODE_BEFORE: number;

declare const DOM_KEYFRAME_RULE: number;

declare const WebMenuItemPDFZoomIn: number;

declare const DOM_UNORDERED_NODE_SNAPSHOT_TYPE: number;

declare const WebArchivePboardType: string;

declare const DOM_START_TO_START: number;

declare const DOM_CSS_KHZ: number;

declare const DOM_SHOW_ELEMENT: number;

declare const WebMenuItemTagGoBack: number;

declare const WebElementLinkTargetFrameKey: string;

declare const DOM_CDATA_SECTION_NODE: number;

declare const WKWebExtensionContextErrorDomain: string;

declare const DOM_CSS_PC: number;

declare const DOM_SHOW_PROCESSING_INSTRUCTION: number;

declare const DOM_CSS_PX: number;

declare const WKWebExtensionDataTypeLocal: string;

declare const DOM_AT_TARGET: number;

declare const DOM_CSS_ATTR: number;

declare const WebElementDOMNodeKey: string;

declare const WebActionElementKey: string;

declare const DOM_KEY_LOCATION_NUMPAD: number;

declare const DOM_REMOVAL: number;

declare const WKWebsiteDataTypeDiskCache: string;

declare const DOM_SHOW_COMMENT: number;

declare const DOM_SHOW_CDATA_SECTION: number;

declare const DOM_KEY_LOCATION_LEFT: number;

declare const DOM_CSS_EXS: number;

declare const WKWebsiteDataTypeFileSystem: string;

declare const DOM_DOM_DELTA_PIXEL: number;

declare const DOM_FIRST_ORDERED_NODE_TYPE: number;

declare const WebMenuItemPDFFacingPages: number;

declare const DOM_DOCUMENT_POSITION_CONTAINED_BY: number;

declare const WebCacheModel: {
  DocumentViewer: 0,
  DocumentBrowser: 1,
  PrimaryWebBrowser: 2,
};

declare const WebViewInsertAction: {
  Typed: 0,
  Pasted: 1,
  Dropped: 2,
};

declare const DOMXPathExceptionCode: {
  INVALID_EXPRESSION_: 51,
  TYPE_: 52,
};

declare const WKWebExtensionDataRecordError: {
  Unknown: 1,
  LocalStorageFailed: 2,
  SessionStorageFailed: 3,
  SynchronizedStorageFailed: 4,
};

declare const WKWebExtensionWindowType: {
  Normal: 0,
  Popup: 1,
};

declare const WKWebExtensionContextPermissionStatus: {
  DeniedExplicitly: -3,
  DeniedImplicitly: -2,
  RequestedImplicitly: -1,
  Unknown: 0,
  RequestedExplicitly: 1,
  GrantedImplicitly: 2,
  GrantedExplicitly: 3,
};

declare const WKWebExtensionTabChangedProperties: {
  None: 0,
  Loading: 2,
  Muted: 4,
  Pinned: 8,
  PlayingAudio: 16,
  ReaderMode: 32,
  Size: 64,
  Title: 128,
  URL: 256,
  ZoomFactor: 512,
};

declare const WKWebExtensionError: {
  Unknown: 1,
  ResourceNotFound: 2,
  InvalidResourceCodeSignature: 3,
  InvalidManifest: 4,
  UnsupportedManifestVersion: 5,
  InvalidManifestEntry: 6,
  InvalidDeclarativeNetRequestEntry: 7,
  InvalidBackgroundPersistence: 8,
  InvalidArchive: 9,
};

declare const WKDialogResult: {
  ShowDefault: 1,
  AskAgain: 2,
  Handled: 3,
};

declare const WKMediaCaptureType: {
  Camera: 0,
  Microphone: 1,
  CameraAndMicrophone: 2,
};

declare const WKInactiveSchedulingPolicy: {
  Suspend: 0,
  Throttle: 1,
  None: 2,
};

declare const WKNavigationType: {
  LinkActivated: 0,
  FormSubmitted: 1,
  BackForward: 2,
  Reload: 3,
  FormResubmitted: 4,
  Other: -1,
};

declare const WKContentMode: {
  Recommended: 0,
  Mobile: 1,
  Desktop: 2,
};

declare const WKCookiePolicy: {
  Allow: 0,
  Disallow: 1,
};

declare const WKFullscreenState: {
  NotIn: 0,
  Entering: 1,
  In: 2,
  Exiting: 3,
};

declare const WKMediaPlaybackState: {
  None: 0,
  Playing: 1,
  Paused: 2,
  Suspended: 3,
};

declare const WKErrorCode: {
  Unknown: 1,
  WebContentProcessTerminated: 2,
  WebViewInvalidated: 3,
  JavaScriptExceptionOccurred: 4,
  JavaScriptResultTypeIsUnsupported: 5,
  ContentRuleListStoreCompileFailed: 6,
  ContentRuleListStoreLookUpFailed: 7,
  ContentRuleListStoreRemoveFailed: 8,
  ContentRuleListStoreVersionMismatch: 9,
  AttributedStringContentFailedToLoad: 10,
  AttributedStringContentLoadTimedOut: 11,
  JavaScriptInvalidFrameTarget: 12,
  NavigationAppBoundDomain: 13,
  JavaScriptAppBoundDomain: 14,
  DuplicateCredential: 15,
  MalformedCredential: 16,
  CredentialNotFound: 17,
};

declare const DOMEventExceptionCode: {
  DOM_UNSPECIFIED_EVENT_TYPE_ERR: 0,
};

declare const WebDragDestinationAction: {
  None: 0,
  DHTML: 1,
  Edit: 2,
  Load: 4,
  Any: 4294967295,
};

declare const WKWebExtensionContextError: {
  Unknown: 1,
  AlreadyLoaded: 2,
  NotLoaded: 3,
  BaseURLAlreadyInUse: 4,
  NoBackgroundContent: 5,
  BackgroundContentFailedToLoad: 6,
};

declare const WKWebExtensionMatchPatternError: {
  Unknown: 1,
  InvalidScheme: 2,
  InvalidHost: 3,
  InvalidPath: 4,
};

declare const WKPermissionDecision: {
  Prompt: 0,
  Grant: 1,
  Deny: 2,
};

declare const WebDragSourceAction: {
  None: 0,
  DHTML: 1,
  Image: 2,
  Link: 4,
  Selection: 8,
  Any: 4294967295,
};

declare const WKUserScriptInjectionTime: {
  Start: 0,
  End: 1,
};

declare const WKDownloadPlaceholderPolicy: {
  Disable: 0,
  Enable: 1,
};

declare const WebNavigationType: {
  LinkClicked: 0,
  FormSubmitted: 1,
  BackForward: 2,
  Reload: 3,
  FormResubmitted: 4,
  Other: 5,
};

declare const WKWebExtensionMessagePortError: {
  Unknown: 1,
  NotConnected: 2,
  MessageInvalid: 3,
};

declare const DOMExceptionCode: {
  INDEX_SIZE_: 1,
  DOMSTRING_SIZE_: 2,
  HIERARCHY_REQUEST_: 3,
  WRONG_DOCUMENT_: 4,
  INVALID_CHARACTER_: 5,
  NO_DATA_ALLOWED_: 6,
  NO_MODIFICATION_ALLOWED_: 7,
  NOT_FOUND_: 8,
  NOT_SUPPORTED_: 9,
  INUSE_ATTRIBUTE_: 10,
  INVALID_STATE_: 11,
  SYNTAX_: 12,
  INVALID_MODIFICATION_: 13,
  NAMESPACE_: 14,
  INVALID_ACCESS_: 15,
};

declare const WKNavigationActionPolicy: {
  Cancel: 0,
  Allow: 1,
  Download: 2,
};

declare const WKDownloadRedirectPolicy: {
  Cancel: 0,
  Allow: 1,
};

declare const WKMediaCaptureState: {
  None: 0,
  Active: 1,
  Muted: 2,
};

declare const DOMRangeExceptionCode: {
  BAD_BOUNDARYPOINTS_: 1,
  INVALID_NODE_TYPE_: 2,
};

declare const WKWebExtensionWindowState: {
  Normal: 0,
  Minimized: 1,
  Maximized: 2,
  Fullscreen: 3,
};

declare const WKWebpagePreferencesUpgradeToHTTPSPolicy: {
  KeepAsRequested: 0,
  AutomaticFallbackToHTTP: 1,
  UserMediatedFallbackToHTTP: 2,
  ErrorOnFailure: 3,
};

declare const WKNavigationResponsePolicy: {
  Cancel: 0,
  Allow: 1,
  Download: 2,
};

declare const WKWebExtensionMatchPatternOptions: {
  None: 0,
  IgnoreSchemes: 1,
  IgnorePaths: 2,
  MatchBidirectionally: 4,
};

declare const WKAudiovisualMediaTypes: {
  None: 0,
  Audio: 1,
  Video: 2,
  All: -1,
};

declare const WKUserInterfaceDirectionPolicy: {
  Content: 0,
  System: 1,
};

declare class WebPreferencesPrivate {
  constructor(init?: WebPreferencesPrivate);
}

declare class DOMObjectInternal {
  constructor(init?: DOMObjectInternal);
}

declare interface WKURLSchemeHandler extends NSObjectProtocol {
  webViewStartURLSchemeTask(webView: WKWebView, urlSchemeTask: WKURLSchemeTask): void;

  webViewStopURLSchemeTask(webView: WKWebView, urlSchemeTask: WKURLSchemeTask): void;
}

declare class WKURLSchemeHandler extends NativeObject implements WKURLSchemeHandler {
}

declare interface WebOpenPanelResultListener extends NSObjectProtocol {
  chooseFilename(fileName: string): void;

  chooseFilenames(fileNames: NSArray<interop.Object> | Array<interop.Object>): void;

  cancel(): void;
}

declare class WebOpenPanelResultListener extends NativeObject implements WebOpenPanelResultListener {
}

declare interface WebResourceLoadDelegate extends NSObjectProtocol {
  webViewIdentifierForInitialRequestFromDataSource?(sender: WebView, request: NSURLRequest, dataSource: WebDataSource): interop.Object;

  webViewResourceWillSendRequestRedirectResponseFromDataSource?(sender: WebView, identifier: interop.Object, request: NSURLRequest, redirectResponse: NSURLResponse, dataSource: WebDataSource): NSURLRequest;

  webViewResourceDidReceiveAuthenticationChallengeFromDataSource?(sender: WebView, identifier: interop.Object, challenge: NSURLAuthenticationChallenge, dataSource: WebDataSource): void;

  webViewResourceDidCancelAuthenticationChallengeFromDataSource?(sender: WebView, identifier: interop.Object, challenge: NSURLAuthenticationChallenge, dataSource: WebDataSource): void;

  webViewResourceDidReceiveResponseFromDataSource?(sender: WebView, identifier: interop.Object, response: NSURLResponse, dataSource: WebDataSource): void;

  webViewResourceDidReceiveContentLengthFromDataSource?(sender: WebView, identifier: interop.Object, length: number, dataSource: WebDataSource): void;

  webViewResourceDidFinishLoadingFromDataSource?(sender: WebView, identifier: interop.Object, dataSource: WebDataSource): void;

  webViewResourceDidFailLoadingWithErrorFromDataSource?(sender: WebView, identifier: interop.Object, error: NSError, dataSource: WebDataSource): void;

  webViewPlugInFailedWithErrorDataSource?(sender: WebView, error: NSError, dataSource: WebDataSource): void;
}

declare class WebResourceLoadDelegate extends NativeObject implements WebResourceLoadDelegate {
}

declare interface WebPolicyDelegate extends NSObjectProtocol {
  webViewDecidePolicyForNavigationActionRequestFrameDecisionListener?(webView: WebView, actionInformation: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, request: NSURLRequest, frame: WebFrame, listener: WebPolicyDecisionListener): void;

  webViewDecidePolicyForNewWindowActionRequestNewFrameNameDecisionListener?(webView: WebView, actionInformation: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, request: NSURLRequest, frameName: string, listener: WebPolicyDecisionListener): void;

  webViewDecidePolicyForMIMETypeRequestFrameDecisionListener?(webView: WebView, type: string, request: NSURLRequest, frame: WebFrame, listener: WebPolicyDecisionListener): void;

  webViewUnableToImplementPolicyWithErrorFrame?(webView: WebView, error: NSError, frame: WebFrame): void;
}

declare class WebPolicyDelegate extends NativeObject implements WebPolicyDelegate {
}

declare interface WebDocumentSearching extends NSObjectProtocol {
  searchForDirectionCaseSensitiveWrap(string: string, forward: boolean, caseFlag: boolean, wrapFlag: boolean): boolean;
}

declare class WebDocumentSearching extends NativeObject implements WebDocumentSearching {
}

declare interface DOMXPathNSResolver extends NSObjectProtocol {
  lookupNamespaceURI(prefix: string): string;
}

declare class DOMXPathNSResolver extends NativeObject implements DOMXPathNSResolver {
}

declare interface DOMNodeFilter extends NSObjectProtocol {
  acceptNode(n: DOMNode): number;
}

declare class DOMNodeFilter extends NativeObject implements DOMNodeFilter {
}

declare interface DOMEventListener extends NSObjectProtocol {
  handleEvent(event: DOMEvent): void;
}

declare class DOMEventListener extends NativeObject implements DOMEventListener {
}

declare interface DOMEventTarget extends NSObjectProtocol, NSCopying {
  addEventListenerListenerUseCapture(type: string, listener: DOMEventListener, useCapture: boolean): void;

  removeEventListenerListenerUseCapture(type: string, listener: DOMEventListener, useCapture: boolean): void;

  dispatchEvent(event: DOMEvent): boolean;

  addEventListener(type: string, listener: DOMEventListener, useCapture: boolean): void;

  removeEventListener(type: string, listener: DOMEventListener, useCapture: boolean): void;
}

declare class DOMEventTarget extends NativeObject implements DOMEventTarget {
}

declare interface WKWebExtensionControllerDelegate extends NSObjectProtocol {
  webExtensionControllerOpenWindowsForExtensionContext?(controller: WKWebExtensionController, extensionContext: WKWebExtensionContext): NSArray;

  webExtensionControllerFocusedWindowForExtensionContext?(controller: WKWebExtensionController, extensionContext: WKWebExtensionContext): WKWebExtensionWindow;

  webExtensionControllerOpenNewWindowUsingConfigurationForExtensionContextCompletionHandler?(controller: WKWebExtensionController, configuration: WKWebExtensionWindowConfiguration, extensionContext: WKWebExtensionContext, completionHandler: (p1: WKWebExtensionWindow, p2: NSError) => void | null): void;

  webExtensionControllerOpenNewTabUsingConfigurationForExtensionContextCompletionHandler?(controller: WKWebExtensionController, configuration: WKWebExtensionTabConfiguration, extensionContext: WKWebExtensionContext, completionHandler: (p1: WKWebExtensionTab, p2: NSError) => void | null): void;

  webExtensionControllerOpenOptionsPageForExtensionContextCompletionHandler?(controller: WKWebExtensionController, extensionContext: WKWebExtensionContext, completionHandler: (p1: NSError) => void | null): void;

  webExtensionControllerPromptForPermissionsInTabForExtensionContextCompletionHandler?(controller: WKWebExtensionController, permissions: NSSet, tab: WKWebExtensionTab | null, extensionContext: WKWebExtensionContext, completionHandler: (p1: NSSet, p2: NSDate) => void | null): void;

  webExtensionControllerPromptForPermissionToAccessURLsInTabForExtensionContextCompletionHandler?(controller: WKWebExtensionController, urls: NSSet, tab: WKWebExtensionTab | null, extensionContext: WKWebExtensionContext, completionHandler: (p1: NSSet, p2: NSDate) => void | null): void;

  webExtensionControllerPromptForPermissionMatchPatternsInTabForExtensionContextCompletionHandler?(controller: WKWebExtensionController, matchPatterns: NSSet, tab: WKWebExtensionTab | null, extensionContext: WKWebExtensionContext, completionHandler: (p1: NSSet, p2: NSDate) => void | null): void;

  webExtensionControllerDidUpdateActionForExtensionContext?(controller: WKWebExtensionController, action: WKWebExtensionAction, context: WKWebExtensionContext): void;

  webExtensionControllerPresentPopupForActionForExtensionContextCompletionHandler?(controller: WKWebExtensionController, action: WKWebExtensionAction, context: WKWebExtensionContext, completionHandler: (p1: NSError) => void | null): void;

  webExtensionControllerSendMessageToApplicationWithIdentifierForExtensionContextReplyHandler?(controller: WKWebExtensionController, message: interop.Object, applicationIdentifier: string | null, extensionContext: WKWebExtensionContext, replyHandler: (p1: interop.Object, p2: NSError) => void | null): void;

  webExtensionControllerConnectUsingMessagePortForExtensionContextCompletionHandler?(controller: WKWebExtensionController, port: WKWebExtensionMessagePort, extensionContext: WKWebExtensionContext, completionHandler: (p1: NSError) => void | null): void;
}

declare class WKWebExtensionControllerDelegate extends NativeObject implements WKWebExtensionControllerDelegate {
}

declare interface WKURLSchemeTask extends NSObjectProtocol {
  readonly request: NSURLRequest;

  didReceiveResponse(response: NSURLResponse): void;

  didReceiveData(data: NSData): void;

  didFinish(): void;

  didFailWithError(error: NSError): void;
}

declare class WKURLSchemeTask extends NativeObject implements WKURLSchemeTask {
}

declare interface WKUIDelegate extends NSObjectProtocol {
  webViewCreateWebViewWithConfigurationForNavigationActionWindowFeatures?(webView: WKWebView, configuration: WKWebViewConfiguration, navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures): WKWebView;

  webViewDidClose?(webView: WKWebView): void;

  webViewRunJavaScriptAlertPanelWithMessageInitiatedByFrameCompletionHandler?(webView: WKWebView, message: string, frame: WKFrameInfo, completionHandler: () => void): void;

  webViewRunJavaScriptConfirmPanelWithMessageInitiatedByFrameCompletionHandler?(webView: WKWebView, message: string, frame: WKFrameInfo, completionHandler: (p1: boolean) => void): void;

  webViewRunJavaScriptTextInputPanelWithPromptDefaultTextInitiatedByFrameCompletionHandler?(webView: WKWebView, prompt: string, defaultText: string | null, frame: WKFrameInfo, completionHandler: (p1: string) => void | null): void;

  webViewRequestMediaCapturePermissionForOriginInitiatedByFrameTypeDecisionHandler?(webView: WKWebView, origin: WKSecurityOrigin, frame: WKFrameInfo, type: interop.Enum<typeof WKMediaCaptureType>, decisionHandler: (p1: interop.Enum<typeof WKPermissionDecision>) => void): void;

  webViewRunOpenPanelWithParametersInitiatedByFrameCompletionHandler?(webView: WKWebView, parameters: WKOpenPanelParameters, frame: WKFrameInfo, completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>) => void | null): void;
}

declare class WKUIDelegate extends NativeObject implements WKUIDelegate {
}

declare interface WKScriptMessageHandlerWithReply extends NSObjectProtocol {
  userContentControllerDidReceiveScriptMessageReplyHandler(userContentController: WKUserContentController, message: WKScriptMessage, replyHandler: (p1: interop.Object, p2: string) => void | null): void;
}

declare class WKScriptMessageHandlerWithReply extends NativeObject implements WKScriptMessageHandlerWithReply {
}

declare interface WKNavigationDelegate extends NSObjectProtocol {
  webViewDecidePolicyForNavigationActionDecisionHandler?(webView: WKWebView, navigationAction: WKNavigationAction, decisionHandler: (p1: interop.Enum<typeof WKNavigationActionPolicy>) => void): void;

  webViewDecidePolicyForNavigationActionPreferencesDecisionHandler?(webView: WKWebView, navigationAction: WKNavigationAction, preferences: WKWebpagePreferences, decisionHandler: (p1: interop.Enum<typeof WKNavigationActionPolicy>, p2: WKWebpagePreferences) => void): void;

  webViewDecidePolicyForNavigationResponseDecisionHandler?(webView: WKWebView, navigationResponse: WKNavigationResponse, decisionHandler: (p1: interop.Enum<typeof WKNavigationResponsePolicy>) => void): void;

  webViewDidStartProvisionalNavigation?(webView: WKWebView, navigation: WKNavigation): void;

  webViewDidReceiveServerRedirectForProvisionalNavigation?(webView: WKWebView, navigation: WKNavigation): void;

  webViewDidFailProvisionalNavigationWithError?(webView: WKWebView, navigation: WKNavigation, error: NSError): void;

  webViewDidCommitNavigation?(webView: WKWebView, navigation: WKNavigation): void;

  webViewDidFinishNavigation?(webView: WKWebView, navigation: WKNavigation): void;

  webViewDidFailNavigationWithError?(webView: WKWebView, navigation: WKNavigation, error: NSError): void;

  webViewDidReceiveAuthenticationChallengeCompletionHandler?(webView: WKWebView, challenge: NSURLAuthenticationChallenge, completionHandler: (p1: interop.Enum<typeof NSURLSessionAuthChallengeDisposition>, p2: NSURLCredential) => void | null): void;

  webViewWebContentProcessDidTerminate?(webView: WKWebView): void;

  webViewAuthenticationChallengeShouldAllowDeprecatedTLS?(webView: WKWebView, challenge: NSURLAuthenticationChallenge, decisionHandler: (p1: boolean) => void): void;

  webViewNavigationActionDidBecomeDownload?(webView: WKWebView, navigationAction: WKNavigationAction, download: WKDownload): void;

  webViewNavigationResponseDidBecomeDownload?(webView: WKWebView, navigationResponse: WKNavigationResponse, download: WKDownload): void;

  webViewShouldGoToBackForwardListItemWillUseInstantBackCompletionHandler?(webView: WKWebView, backForwardListItem: WKBackForwardListItem, willUseInstantBack: boolean, completionHandler: (p1: boolean) => void): void;
}

declare class WKNavigationDelegate extends NativeObject implements WKNavigationDelegate {
}

declare interface WKScriptMessageHandler extends NSObjectProtocol {
  userContentControllerDidReceiveScriptMessage(userContentController: WKUserContentController, message: WKScriptMessage): void;
}

declare class WKScriptMessageHandler extends NativeObject implements WKScriptMessageHandler {
}

declare interface WKDownloadDelegate extends NSObjectProtocol {
  downloadDecideDestinationUsingResponseSuggestedFilenameCompletionHandler(download: WKDownload, response: NSURLResponse, suggestedFilename: string, completionHandler: (p1: NSURL) => void | null): void;

  downloadWillPerformHTTPRedirectionNewRequestDecisionHandler?(download: WKDownload, response: NSHTTPURLResponse, request: NSURLRequest, decisionHandler: (p1: interop.Enum<typeof WKDownloadRedirectPolicy>) => void): void;

  downloadDidReceiveAuthenticationChallengeCompletionHandler?(download: WKDownload, challenge: NSURLAuthenticationChallenge, completionHandler: (p1: interop.Enum<typeof NSURLSessionAuthChallengeDisposition>, p2: NSURLCredential) => void | null): void;

  downloadDidFinish?(download: WKDownload): void;

  downloadDidFailWithErrorResumeData?(download: WKDownload, error: NSError, resumeData: NSData | null): void;

  downloadDecidePlaceholderPolicy?(download: WKDownload, completionHandler: (p1: interop.Enum<typeof WKDownloadPlaceholderPolicy>, p2: NSURL) => void | null): void;

  downloadDidReceivePlaceholderURLCompletionHandler?(download: WKDownload, url: NSURL, completionHandler: () => void): void;

  downloadDidReceiveFinalURL?(download: WKDownload, url: NSURL): void;
}

declare class WKDownloadDelegate extends NativeObject implements WKDownloadDelegate {
}

declare interface WebDownloadDelegate extends NSURLDownloadDelegate {
  downloadWindowForAuthenticationSheet?(download: WebDownload): NSWindow;
}

declare class WebDownloadDelegate extends NativeObject implements WebDownloadDelegate {
}

declare interface WKWebExtensionWindow extends NSObjectProtocol {
  tabsForWebExtensionContext?(context: WKWebExtensionContext): NSArray;

  activeTabForWebExtensionContext?(context: WKWebExtensionContext): WKWebExtensionTab;

  windowTypeForWebExtensionContext?(context: WKWebExtensionContext): interop.Enum<typeof WKWebExtensionWindowType>;

  windowStateForWebExtensionContext?(context: WKWebExtensionContext): interop.Enum<typeof WKWebExtensionWindowState>;

  setWindowStateForWebExtensionContextCompletionHandler?(state: interop.Enum<typeof WKWebExtensionWindowState>, context: WKWebExtensionContext, completionHandler: (p1: NSError) => void | null): void;

  isPrivateForWebExtensionContext?(context: WKWebExtensionContext): boolean;

  screenFrameForWebExtensionContext?(context: WKWebExtensionContext): CGRect;

  frameForWebExtensionContext?(context: WKWebExtensionContext): CGRect;

  setFrameForWebExtensionContextCompletionHandler?(frame: CGRect, context: WKWebExtensionContext, completionHandler: (p1: NSError) => void | null): void;

  focusForWebExtensionContextCompletionHandler?(context: WKWebExtensionContext, completionHandler: (p1: NSError) => void | null): void;

  closeForWebExtensionContextCompletionHandler?(context: WKWebExtensionContext, completionHandler: (p1: NSError) => void | null): void;
}

declare class WKWebExtensionWindow extends NativeObject implements WKWebExtensionWindow {
}

declare interface WKWebExtensionTab extends NSObjectProtocol {
  windowForWebExtensionContext?(context: WKWebExtensionContext): WKWebExtensionWindow;

  indexInWindowForWebExtensionContext?(context: WKWebExtensionContext): number;

  parentTabForWebExtensionContext?(context: WKWebExtensionContext): WKWebExtensionTab;

  setParentTabForWebExtensionContextCompletionHandler?(parentTab: WKWebExtensionTab | null, context: WKWebExtensionContext, completionHandler: (p1: NSError) => void | null): void;

  webViewForWebExtensionContext?(context: WKWebExtensionContext): WKWebView;

  titleForWebExtensionContext?(context: WKWebExtensionContext): string;

  isPinnedForWebExtensionContext?(context: WKWebExtensionContext): boolean;

  setPinnedForWebExtensionContextCompletionHandler?(pinned: boolean, context: WKWebExtensionContext, completionHandler: (p1: NSError) => void | null): void;

  isReaderModeAvailableForWebExtensionContext?(context: WKWebExtensionContext): boolean;

  isReaderModeActiveForWebExtensionContext?(context: WKWebExtensionContext): boolean;

  setReaderModeActiveForWebExtensionContextCompletionHandler?(active: boolean, context: WKWebExtensionContext, completionHandler: (p1: NSError) => void | null): void;

  isPlayingAudioForWebExtensionContext?(context: WKWebExtensionContext): boolean;

  isMutedForWebExtensionContext?(context: WKWebExtensionContext): boolean;

  setMutedForWebExtensionContextCompletionHandler?(muted: boolean, context: WKWebExtensionContext, completionHandler: (p1: NSError) => void | null): void;

  sizeForWebExtensionContext?(context: WKWebExtensionContext): CGSize;

  zoomFactorForWebExtensionContext?(context: WKWebExtensionContext): number;

  setZoomFactorForWebExtensionContextCompletionHandler?(zoomFactor: number, context: WKWebExtensionContext, completionHandler: (p1: NSError) => void | null): void;

  urlForWebExtensionContext?(context: WKWebExtensionContext): NSURL;

  pendingURLForWebExtensionContext?(context: WKWebExtensionContext): NSURL;

  isLoadingCompleteForWebExtensionContext?(context: WKWebExtensionContext): boolean;

  detectWebpageLocaleForWebExtensionContextCompletionHandler?(context: WKWebExtensionContext, completionHandler: (p1: NSLocale, p2: NSError) => void | null): void;

  takeSnapshotUsingConfigurationForWebExtensionContextCompletionHandler?(configuration: WKSnapshotConfiguration, context: WKWebExtensionContext, completionHandler: (p1: NSImage, p2: NSError) => void | null): void;

  loadURLForWebExtensionContextCompletionHandler?(url: NSURL, context: WKWebExtensionContext, completionHandler: (p1: NSError) => void | null): void;

  reloadFromOriginForWebExtensionContextCompletionHandler?(fromOrigin: boolean, context: WKWebExtensionContext, completionHandler: (p1: NSError) => void | null): void;

  goBackForWebExtensionContextCompletionHandler?(context: WKWebExtensionContext, completionHandler: (p1: NSError) => void | null): void;

  goForwardForWebExtensionContextCompletionHandler?(context: WKWebExtensionContext, completionHandler: (p1: NSError) => void | null): void;

  activateForWebExtensionContextCompletionHandler?(context: WKWebExtensionContext, completionHandler: (p1: NSError) => void | null): void;

  isSelectedForWebExtensionContext?(context: WKWebExtensionContext): boolean;

  setSelectedForWebExtensionContextCompletionHandler?(selected: boolean, context: WKWebExtensionContext, completionHandler: (p1: NSError) => void | null): void;

  duplicateUsingConfigurationForWebExtensionContextCompletionHandler?(configuration: WKWebExtensionTabConfiguration, context: WKWebExtensionContext, completionHandler: (p1: WKWebExtensionTab, p2: NSError) => void | null): void;

  closeForWebExtensionContextCompletionHandler?(context: WKWebExtensionContext, completionHandler: (p1: NSError) => void | null): void;

  shouldGrantPermissionsOnUserGestureForWebExtensionContext?(context: WKWebExtensionContext): boolean;

  shouldBypassPermissionsForWebExtensionContext?(context: WKWebExtensionContext): boolean;
}

declare class WKWebExtensionTab extends NativeObject implements WKWebExtensionTab {
}

declare interface WebDocumentRepresentation extends NSObjectProtocol {
  setDataSource(dataSource: WebDataSource): void;

  receivedDataWithDataSource(data: NSData, dataSource: WebDataSource): void;

  receivedErrorWithDataSource(error: NSError, dataSource: WebDataSource): void;

  finishedLoadingWithDataSource(dataSource: WebDataSource): void;

  canProvideDocumentSource(): boolean;

  documentSource(): string;

  title(): string;
}

declare class WebDocumentRepresentation extends NativeObject implements WebDocumentRepresentation {
}

declare interface WebPolicyDecisionListener extends NSObjectProtocol {
  use(): void;

  download(): void;

  ignore(): void;
}

declare class WebPolicyDecisionListener extends NativeObject implements WebPolicyDecisionListener {
}

declare interface WebEditingDelegate extends NSObjectProtocol {
  webViewShouldBeginEditingInDOMRange?(webView: WebView, range: DOMRange): boolean;

  webViewShouldEndEditingInDOMRange?(webView: WebView, range: DOMRange): boolean;

  webViewShouldInsertNodeReplacingDOMRangeGivenAction?(webView: WebView, node: DOMNode, range: DOMRange, action: interop.Enum<typeof WebViewInsertAction>): boolean;

  webViewShouldInsertTextReplacingDOMRangeGivenAction?(webView: WebView, text: string, range: DOMRange, action: interop.Enum<typeof WebViewInsertAction>): boolean;

  webViewShouldDeleteDOMRange?(webView: WebView, range: DOMRange): boolean;

  webViewShouldChangeSelectedDOMRangeToDOMRangeAffinityStillSelecting?(webView: WebView, currentRange: DOMRange, proposedRange: DOMRange, selectionAffinity: interop.Enum<typeof NSSelectionAffinity>, flag: boolean): boolean;

  webViewShouldApplyStyleToElementsInDOMRange?(webView: WebView, style: DOMCSSStyleDeclaration, range: DOMRange): boolean;

  webViewShouldChangeTypingStyleToStyle?(webView: WebView, currentStyle: DOMCSSStyleDeclaration, proposedStyle: DOMCSSStyleDeclaration): boolean;

  webViewDoCommandBySelector?(webView: WebView, selector: string): boolean;

  webViewDidBeginEditing?(notification: NSNotification): void;

  webViewDidChange?(notification: NSNotification): void;

  webViewDidEndEditing?(notification: NSNotification): void;

  webViewDidChangeTypingStyle?(notification: NSNotification): void;

  webViewDidChangeSelection?(notification: NSNotification): void;

  undoManagerForWebView?(webView: WebView): NSUndoManager;
}

declare class WebEditingDelegate extends NativeObject implements WebEditingDelegate {
}

declare interface WebPlugInViewFactory extends NSObjectProtocol {
}

declare class WebPlugInViewFactory extends NativeObject implements WebPlugInViewFactory {
  static plugInViewWithArguments(arguments$: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): NSView;
}

declare interface WebUIDelegate extends NSObjectProtocol {
  webViewCreateWebViewWithRequest?(sender: WebView, request: NSURLRequest): WebView;

  webViewShow?(sender: WebView): void;

  webViewCreateWebViewModalDialogWithRequest?(sender: WebView, request: NSURLRequest): WebView;

  webViewRunModal?(sender: WebView): void;

  webViewClose?(sender: WebView): void;

  webViewFocus?(sender: WebView): void;

  webViewUnfocus?(sender: WebView): void;

  webViewFirstResponder?(sender: WebView): NSResponder;

  webViewMakeFirstResponder?(sender: WebView, responder: NSResponder): void;

  webViewSetStatusText?(sender: WebView, text: string): void;

  webViewStatusText?(sender: WebView): string;

  webViewAreToolbarsVisible?(sender: WebView): boolean;

  webViewSetToolbarsVisible?(sender: WebView, visible: boolean): void;

  webViewIsStatusBarVisible?(sender: WebView): boolean;

  webViewSetStatusBarVisible?(sender: WebView, visible: boolean): void;

  webViewIsResizable?(sender: WebView): boolean;

  webViewSetResizable?(sender: WebView, resizable: boolean): void;

  webViewSetFrame?(sender: WebView, frame: CGRect): void;

  webViewFrame?(sender: WebView): CGRect;

  webViewRunJavaScriptAlertPanelWithMessageInitiatedByFrame?(sender: WebView, message: string, frame: WebFrame): void;

  webViewRunJavaScriptConfirmPanelWithMessageInitiatedByFrame?(sender: WebView, message: string, frame: WebFrame): boolean;

  webViewRunJavaScriptTextInputPanelWithPromptDefaultTextInitiatedByFrame?(sender: WebView, prompt: string, defaultText: string, frame: WebFrame): string;

  webViewRunBeforeUnloadConfirmPanelWithMessageInitiatedByFrame?(sender: WebView, message: string, frame: WebFrame): boolean;

  webViewRunOpenPanelForFileButtonWithResultListener?(sender: WebView, resultListener: WebOpenPanelResultListener): void;

  webViewRunOpenPanelForFileButtonWithResultListenerAllowMultipleFiles?(sender: WebView, resultListener: WebOpenPanelResultListener, allowMultipleFiles: boolean): void;

  webViewMouseDidMoveOverElementModifierFlags?(sender: WebView, elementInformation: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, modifierFlags: number): void;

  webViewContextMenuItemsForElementDefaultMenuItems?(sender: WebView, element: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, defaultMenuItems: NSArray<interop.Object> | Array<interop.Object>): NSArray;

  webViewValidateUserInterfaceItemDefaultValidation?(webView: WebView, item: NSValidatedUserInterfaceItem, defaultValidation: boolean): boolean;

  webViewShouldPerformActionFromSender?(webView: WebView, action: string, sender: interop.Object): boolean;

  webViewDragDestinationActionMaskForDraggingInfo?(webView: WebView, draggingInfo: NSDraggingInfo): number;

  webViewWillPerformDragDestinationActionForDraggingInfo?(webView: WebView, action: interop.Enum<typeof WebDragDestinationAction>, draggingInfo: NSDraggingInfo): void;

  webViewDragSourceActionMaskForPoint?(webView: WebView, point: CGPoint): number;

  webViewWillPerformDragSourceActionFromPointWithPasteboard?(webView: WebView, action: interop.Enum<typeof WebDragSourceAction>, point: CGPoint, pasteboard: NSPasteboard): void;

  webViewPrintFrameView?(sender: WebView, frameView: WebFrameView): void;

  webViewHeaderHeight?(sender: WebView): number;

  webViewFooterHeight?(sender: WebView): number;

  webViewDrawHeaderInRect?(sender: WebView, rect: CGRect): void;

  webViewDrawFooterInRect?(sender: WebView, rect: CGRect): void;

  webViewRunJavaScriptAlertPanelWithMessage?(sender: WebView, message: string): void;

  webViewRunJavaScriptConfirmPanelWithMessage?(sender: WebView, message: string): boolean;

  webViewRunJavaScriptTextInputPanelWithPromptDefaultText?(sender: WebView, prompt: string, defaultText: string): string;

  webViewSetContentRect?(sender: WebView, frame: CGRect): void;

  webViewContentRect?(sender: WebView): CGRect;
}

declare class WebUIDelegate extends NativeObject implements WebUIDelegate {
}

declare interface WKHTTPCookieStoreObserver extends NSObjectProtocol {
  cookiesDidChangeInCookieStore?(cookieStore: WKHTTPCookieStore): void;
}

declare class WKHTTPCookieStoreObserver extends NativeObject implements WKHTTPCookieStoreObserver {
}

declare interface WebDocumentView extends NSObjectProtocol {
  setDataSource(dataSource: WebDataSource): void;

  dataSourceUpdated(dataSource: WebDataSource): void;

  setNeedsLayout(flag: boolean): void;

  layout(): void;

  viewWillMoveToHostWindow(hostWindow: NSWindow): void;

  viewDidMoveToHostWindow(): void;
}

declare class WebDocumentView extends NativeObject implements WebDocumentView {
}

declare interface WebFrameLoadDelegate extends NSObjectProtocol {
  webViewDidStartProvisionalLoadForFrame?(sender: WebView, frame: WebFrame): void;

  webViewDidReceiveServerRedirectForProvisionalLoadForFrame?(sender: WebView, frame: WebFrame): void;

  webViewDidFailProvisionalLoadWithErrorForFrame?(sender: WebView, error: NSError, frame: WebFrame): void;

  webViewDidCommitLoadForFrame?(sender: WebView, frame: WebFrame): void;

  webViewDidReceiveTitleForFrame?(sender: WebView, title: string, frame: WebFrame): void;

  webViewDidReceiveIconForFrame?(sender: WebView, image: NSImage, frame: WebFrame): void;

  webViewDidFinishLoadForFrame?(sender: WebView, frame: WebFrame): void;

  webViewDidFailLoadWithErrorForFrame?(sender: WebView, error: NSError, frame: WebFrame): void;

  webViewDidChangeLocationWithinPageForFrame?(sender: WebView, frame: WebFrame): void;

  webViewWillPerformClientRedirectToURLDelayFireDateForFrame?(sender: WebView, URL: NSURL, seconds: number, date: NSDate, frame: WebFrame): void;

  webViewDidCancelClientRedirectForFrame?(sender: WebView, frame: WebFrame): void;

  webViewWillCloseFrame?(sender: WebView, frame: WebFrame): void;

  webViewDidClearWindowObjectForFrame?(webView: WebView, windowObject: WebScriptObject, frame: WebFrame): void;

  webViewWindowScriptObjectAvailable?(webView: WebView, windowScriptObject: WebScriptObject): void;

  webViewDidCreateJavaScriptContextForFrame?(webView: WebView, context: JSContext, frame: WebFrame): void;
}

declare class WebFrameLoadDelegate extends NativeObject implements WebFrameLoadDelegate {
}

declare interface WebDocumentText extends NSObjectProtocol {
  supportsTextEncoding(): boolean;

  string(): string;

  attributedString(): NSAttributedString;

  selectedString(): string;

  selectedAttributedString(): NSAttributedString;

  selectAll(): void;

  deselectAll(): void;
}

declare class WebDocumentText extends NativeObject implements WebDocumentText {
}

declare class DOMHTMLBodyElement extends DOMHTMLElement {
  aLink: string;

  background: string;

  bgColor: string;

  link: string;

  text: string;

  vLink: string;

  setALink(aLink: string): void;

  setBackground(background: string): void;

  setBgColor(bgColor: string): void;

  setLink(link: string): void;

  setText(text: string): void;

  setVLink(vLink: string): void;
}

declare class WKBackForwardListItem extends NSObject {
  readonly URL: NSURL;

  readonly title: string;

  readonly initialURL: NSURL;
}

declare class DOMHTMLScriptElement extends DOMHTMLElement {
  text: string;

  htmlFor: string;

  event: string;

  charset: string;

  defer: boolean;

  src: string;

  type: string;

  setText(text: string): void;

  setHtmlFor(htmlFor: string): void;

  setEvent(event: string): void;

  setCharset(charset: string): void;

  setDefer(defer: boolean): void;

  setSrc(src: string): void;

  setType(type: string): void;
}

declare class WebHistoryItem extends NSObject implements NSCopying {
  initWithURLStringTitleLastVisitedTimeInterval(URLString: string, title: string, time: number): this;

  readonly originalURLString: string;

  readonly URLString: string;

  readonly title: string;

  readonly lastVisitedTimeInterval: number;

  alternateTitle: string;

  readonly icon: NSImage;

  setAlternateTitle(alternateTitle: string): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class WebFrameView extends NSView {
  readonly webFrame: WebFrame;

  readonly documentView: NSView;

  allowsScrolling: boolean;

  readonly canPrintHeadersAndFooters: boolean;

  printOperationWithPrintInfo(printInfo: NSPrintInfo): NSPrintOperation;

  readonly documentViewShouldHandlePrint: boolean;

  printDocumentView(): void;

  setAllowsScrolling(allowsScrolling: boolean): void;
}

declare class WebDownload extends NSURLDownload {
}

declare class WKSecurityOrigin extends NSObject {
  readonly protocol: string;

  readonly host: string;

  readonly port: number;
}

declare class DOMXPathResult extends DOMObject {
  readonly resultType: number;

  readonly numberValue: number;

  readonly stringValue: string;

  readonly booleanValue: boolean;

  readonly singleNodeValue: DOMNode;

  readonly invalidIteratorState: boolean;

  readonly snapshotLength: number;

  iterateNext(): DOMNode;

  snapshotItem(index: number): DOMNode;
}

declare class DOMNodeIterator extends DOMObject {
  readonly root: DOMNode;

  readonly whatToShow: number;

  readonly filter: DOMNodeFilter;

  readonly expandEntityReferences: boolean;

  readonly referenceNode: DOMNode;

  readonly pointerBeforeReferenceNode: boolean;

  nextNode(): DOMNode;

  previousNode(): DOMNode;

  detach(): void;
}

declare class DOMOverflowEvent extends DOMEvent {
  readonly orient: number;

  readonly horizontalOverflow: boolean;

  readonly verticalOverflow: boolean;

  initOverflowEventHorizontalOverflowVerticalOverflow(orient: number, horizontalOverflow: boolean, verticalOverflow: boolean): this;
}

declare class DOMUIEvent extends DOMEvent {
  readonly view: DOMAbstractView;

  readonly detail: number;

  readonly keyCode: number;

  readonly charCode: number;

  readonly layerX: number;

  readonly layerY: number;

  readonly pageX: number;

  readonly pageY: number;

  readonly which: number;

  initUIEventCanBubbleCancelableViewDetail(type: string, canBubble: boolean, cancelable: boolean, view: DOMAbstractView, detail: number): this;

  initUIEvent(type: string, canBubble: boolean, cancelable: boolean, view: DOMAbstractView, detail: number): this;
}

declare class DOMEvent extends DOMObject {
  readonly type: string;

  readonly target: DOMEventTarget;

  readonly currentTarget: DOMEventTarget;

  readonly eventPhase: number;

  readonly bubbles: boolean;

  readonly cancelable: boolean;

  readonly timeStamp: number;

  readonly srcElement: DOMEventTarget;

  returnValue: boolean;

  cancelBubble: boolean;

  stopPropagation(): void;

  preventDefault(): void;

  initEventCanBubbleArgCancelableArg(eventTypeArg: string, canBubbleArg: boolean, cancelableArg: boolean): this;

  setReturnValue(returnValue: boolean): void;

  setCancelBubble(cancelBubble: boolean): void;

  initEvent(eventTypeArg: string, canBubbleArg: boolean, cancelableArg: boolean): this;
}

declare class DOMAbstractView extends DOMObject {
  readonly document: DOMDocument;
}

declare class DOMHTMLTitleElement extends DOMHTMLElement {
  text: string;

  setText(text: string): void;
}

declare class DOMHTMLTextAreaElement extends DOMHTMLElement {
  autofocus: boolean;

  disabled: boolean;

  readonly form: DOMHTMLFormElement;

  name: string;

  readOnly: boolean;

  rows: number;

  cols: number;

  readonly type: string;

  defaultValue: string;

  value: string;

  readonly willValidate: boolean;

  selectionStart: number;

  selectionEnd: number;

  accessKey: string;

  select(): void;

  setSelectionRangeEnd(start: number, end: number): void;

  setAutofocus(autofocus: boolean): void;

  setDisabled(disabled: boolean): void;

  setName(name: string): void;

  setReadOnly(readOnly: boolean): void;

  setRows(rows: number): void;

  setCols(cols: number): void;

  setDefaultValue(defaultValue: string): void;

  setValue(value: string): void;

  setSelectionStart(selectionStart: number): void;

  setSelectionEnd(selectionEnd: number): void;

  setAccessKey(accessKey: string): void;
}

declare class DOMHTMLQuoteElement extends DOMHTMLElement {
  cite: string;

  setCite(cite: string): void;
}

declare class DOMHTMLOptionsCollection extends DOMObject {
  selectedIndex: number;

  length: number;

  namedItem(name: string): DOMNode;

  addIndex(option: DOMHTMLOptionElement, index: number): void;

  remove(index: number): void;

  item(index: number): DOMNode;

  setSelectedIndex(selectedIndex: number): void;

  setLength(length: number): void;
}

declare class DOMHTMLOptionElement extends DOMHTMLElement {
  disabled: boolean;

  readonly form: DOMHTMLFormElement;

  label: string;

  defaultSelected: boolean;

  selected: boolean;

  value: string;

  readonly text: string;

  readonly index: number;

  setDisabled(disabled: boolean): void;

  setLabel(label: string): void;

  setDefaultSelected(defaultSelected: boolean): void;

  setSelected(selected: boolean): void;

  setValue(value: string): void;
}

declare class DOMHTMLObjectElement extends DOMHTMLElement {
  readonly form: DOMHTMLFormElement;

  code: string;

  align: string;

  archive: string;

  border: string;

  codeBase: string;

  codeType: string;

  data: string;

  declare: boolean;

  height: string;

  hspace: number;

  name: string;

  standby: string;

  type: string;

  useMap: string;

  vspace: number;

  width: string;

  readonly contentDocument: DOMDocument;

  readonly absoluteImageURL: NSURL;

  setCode(code: string): void;

  setAlign(align: string): void;

  setArchive(archive: string): void;

  setBorder(border: string): void;

  setCodeBase(codeBase: string): void;

  setCodeType(codeType: string): void;

  setData(data: string): void;

  setDeclare(declare: boolean): void;

  setHeight(height: string): void;

  setHspace(hspace: number): void;

  setName(name: string): void;

  setStandby(standby: string): void;

  setType(type: string): void;

  setUseMap(useMap: string): void;

  setVspace(vspace: number): void;

  setWidth(width: string): void;

  readonly contentFrame: WebFrame;
}

declare class DOMHTMLOListElement extends DOMHTMLElement {
  compact: boolean;

  start: number;

  type: string;

  setCompact(compact: boolean): void;

  setStart(start: number): void;

  setType(type: string): void;
}

declare class DOMHTMLModElement extends DOMHTMLElement {
  cite: string;

  dateTime: string;

  setCite(cite: string): void;

  setDateTime(dateTime: string): void;
}

declare class DOMHTMLMetaElement extends DOMHTMLElement {
  content: string;

  httpEquiv: string;

  name: string;

  scheme: string;

  setContent(content: string): void;

  setHttpEquiv(httpEquiv: string): void;

  setName(name: string): void;

  setScheme(scheme: string): void;
}

declare class DOMHTMLLegendElement extends DOMHTMLElement {
  readonly form: DOMHTMLFormElement;

  align: string;

  accessKey: string;

  setAlign(align: string): void;

  setAccessKey(accessKey: string): void;
}

declare class DOMHTMLInputElement extends DOMHTMLElement {
  accept: string;

  alt: string;

  autofocus: boolean;

  defaultChecked: boolean;

  checked: boolean;

  disabled: boolean;

  readonly form: DOMHTMLFormElement;

  files: DOMFileList;

  indeterminate: boolean;

  maxLength: number;

  multiple: boolean;

  name: string;

  readOnly: boolean;

  size: string;

  src: string;

  type: string;

  defaultValue: string;

  value: string;

  readonly willValidate: boolean;

  selectionStart: number;

  selectionEnd: number;

  align: string;

  useMap: string;

  accessKey: string;

  readonly altDisplayString: string;

  readonly absoluteImageURL: NSURL;

  select(): void;

  setSelectionRangeEnd(start: number, end: number): void;

  click(): void;

  setAccept(accept: string): void;

  setAlt(alt: string): void;

  setAutofocus(autofocus: boolean): void;

  setDefaultChecked(defaultChecked: boolean): void;

  setChecked(checked: boolean): void;

  setDisabled(disabled: boolean): void;

  setFiles(files: DOMFileList): void;

  setIndeterminate(indeterminate: boolean): void;

  setMaxLength(maxLength: number): void;

  setMultiple(multiple: boolean): void;

  setName(name: string): void;

  setReadOnly(readOnly: boolean): void;

  setSize(size: string): void;

  setSrc(src: string): void;

  setType(type: string): void;

  setDefaultValue(defaultValue: string): void;

  setValue(value: string): void;

  setSelectionStart(selectionStart: number): void;

  setSelectionEnd(selectionEnd: number): void;

  setAlign(align: string): void;

  setUseMap(useMap: string): void;

  setAccessKey(accessKey: string): void;
}

declare class DOMHTMLFrameSetElement extends DOMHTMLElement {
  cols: string;

  rows: string;

  setCols(cols: string): void;

  setRows(rows: string): void;
}

declare class DOMHTMLFrameElement extends DOMHTMLElement {
  frameBorder: string;

  longDesc: string;

  marginHeight: string;

  marginWidth: string;

  name: string;

  noResize: boolean;

  scrolling: string;

  src: string;

  readonly contentDocument: DOMDocument;

  readonly contentWindow: DOMAbstractView;

  location: string;

  readonly width: number;

  readonly height: number;

  setFrameBorder(frameBorder: string): void;

  setLongDesc(longDesc: string): void;

  setMarginHeight(marginHeight: string): void;

  setMarginWidth(marginWidth: string): void;

  setName(name: string): void;

  setNoResize(noResize: boolean): void;

  setScrolling(scrolling: string): void;

  setSrc(src: string): void;

  setLocation(location: string): void;

  readonly contentFrame: WebFrame;
}

declare class DOMHTMLFormElement extends DOMHTMLElement {
  acceptCharset: string;

  action: string;

  enctype: string;

  encoding: string;

  method: string;

  name: string;

  target: string;

  readonly elements: DOMHTMLCollection;

  readonly length: number;

  submit(): void;

  reset(): void;

  setAcceptCharset(acceptCharset: string): void;

  setAction(action: string): void;

  setEnctype(enctype: string): void;

  setEncoding(encoding: string): void;

  setMethod(method: string): void;

  setName(name: string): void;

  setTarget(target: string): void;
}

declare class DOMHTMLFontElement extends DOMHTMLElement {
  color: string;

  face: string;

  size: string;

  setColor(color: string): void;

  setFace(face: string): void;

  setSize(size: string): void;
}

declare class DOMHTMLBaseElement extends DOMHTMLElement {
  href: string;

  target: string;

  setHref(href: string): void;

  setTarget(target: string): void;
}

declare class DOMHTMLAreaElement extends DOMHTMLElement {
  alt: string;

  coords: string;

  noHref: boolean;

  shape: string;

  target: string;

  accessKey: string;

  readonly absoluteLinkURL: NSURL;

  href: string;

  readonly protocol: string;

  readonly host: string;

  readonly hostname: string;

  readonly port: string;

  readonly pathname: string;

  readonly search: string;

  readonly hashName: string;

  setAlt(alt: string): void;

  setCoords(coords: string): void;

  setNoHref(noHref: boolean): void;

  setShape(shape: string): void;

  setTarget(target: string): void;

  setAccessKey(accessKey: string): void;

  setHref(href: string): void;
}

declare class DOMHTMLAppletElement extends DOMHTMLElement {
  align: string;

  alt: string;

  archive: string;

  code: string;

  codeBase: string;

  height: string;

  hspace: number;

  name: string;

  object: string;

  vspace: number;

  width: string;

  setAlign(align: string): void;

  setAlt(alt: string): void;

  setArchive(archive: string): void;

  setCode(code: string): void;

  setCodeBase(codeBase: string): void;

  setHeight(height: string): void;

  setHspace(hspace: number): void;

  setName(name: string): void;

  setObject(object: string): void;

  setVspace(vspace: number): void;

  setWidth(width: string): void;
}

// @ts-ignore ClassDecl.tsIgnore
declare class DOMHTMLElement extends DOMElement {
  title: string;

  lang: string;

  dir: string;

  tabIndex: number;

  accessKey: string;

  // @ts-ignore MemberDecl.tsIgnore
  innerText: string;

  outerText: string;

  contentEditable: string;

  readonly isContentEditable: boolean;

  idName: string;

  readonly children: DOMHTMLCollection;

  readonly titleDisplayString: string;

  click(): void;

  setTitle(title: string): void;

  setLang(lang: string): void;

  setDir(dir: string): void;

  setTabIndex(tabIndex: number): void;

  setAccessKey(accessKey: string): void;

  setInnerText(innerText: string): void;

  setOuterText(outerText: string): void;

  setContentEditable(contentEditable: string): void;

  setIdName(idName: string): void;
}

declare class DOMFile extends DOMBlob {
  readonly name: string;
}

declare class DOMBlob extends DOMObject {
  readonly size: number;
}

declare class DOMRGBColor extends DOMObject {
  readonly red: DOMCSSPrimitiveValue;

  readonly green: DOMCSSPrimitiveValue;

  readonly blue: DOMCSSPrimitiveValue;

  readonly alpha: DOMCSSPrimitiveValue;

  readonly color: NSColor;
}

declare class DOMCounter extends DOMObject {
  readonly identifier: string;

  readonly listStyle: string;

  readonly separator: string;
}

declare class DOMCSSValueList extends DOMCSSValue {
  readonly length: number;

  item(index: number): DOMCSSValue;
}

declare class DOMCSSUnknownRule extends DOMCSSRule {
}

declare class DOMCSSStyleSheet extends DOMStyleSheet {
  readonly ownerRule: DOMCSSRule;

  readonly cssRules: DOMCSSRuleList;

  readonly rules: DOMCSSRuleList;

  insertRuleIndex(rule: string, index: number): number;

  deleteRule(index: number): void;

  addRuleStyleIndex(selector: string, style: string, index: number): number;

  removeRule(index: number): void;

  insertRule(rule: string, index: number): number;
}

declare class DOMCSSStyleRule extends DOMCSSRule {
  selectorText: string;

  readonly style: DOMCSSStyleDeclaration;

  setSelectorText(selectorText: string): void;
}

declare class DOMCSSStyleDeclaration extends DOMObject {
  cssText: string;

  readonly length: number;

  readonly parentRule: DOMCSSRule;

  getPropertyValue(propertyName: string): string;

  getPropertyCSSValue(propertyName: string): DOMCSSValue;

  removeProperty(propertyName: string): string;

  getPropertyPriority(propertyName: string): string;

  setPropertyValuePriority(propertyName: string, value: string, priority: string): void;

  item(index: number): string;

  getPropertyShorthand(propertyName: string): string;

  isPropertyImplicit(propertyName: string): boolean;

  setCssText(cssText: string): void;

  setProperty(propertyName: string, value: string, priority: string): void;

  azimuth(): string;

  setAzimuth(azimuth: string): void;

  background(): string;

  setBackground(background: string): void;

  backgroundAttachment(): string;

  setBackgroundAttachment(backgroundAttachment: string): void;

  backgroundColor(): string;

  setBackgroundColor(backgroundColor: string): void;

  backgroundImage(): string;

  setBackgroundImage(backgroundImage: string): void;

  backgroundPosition(): string;

  setBackgroundPosition(backgroundPosition: string): void;

  backgroundRepeat(): string;

  setBackgroundRepeat(backgroundRepeat: string): void;

  border(): string;

  setBorder(border: string): void;

  borderCollapse(): string;

  setBorderCollapse(borderCollapse: string): void;

  borderColor(): string;

  setBorderColor(borderColor: string): void;

  borderSpacing(): string;

  setBorderSpacing(borderSpacing: string): void;

  borderStyle(): string;

  setBorderStyle(borderStyle: string): void;

  borderTop(): string;

  setBorderTop(borderTop: string): void;

  borderRight(): string;

  setBorderRight(borderRight: string): void;

  borderBottom(): string;

  setBorderBottom(borderBottom: string): void;

  borderLeft(): string;

  setBorderLeft(borderLeft: string): void;

  borderTopColor(): string;

  setBorderTopColor(borderTopColor: string): void;

  borderRightColor(): string;

  setBorderRightColor(borderRightColor: string): void;

  borderBottomColor(): string;

  setBorderBottomColor(borderBottomColor: string): void;

  borderLeftColor(): string;

  setBorderLeftColor(borderLeftColor: string): void;

  borderTopStyle(): string;

  setBorderTopStyle(borderTopStyle: string): void;

  borderRightStyle(): string;

  setBorderRightStyle(borderRightStyle: string): void;

  borderBottomStyle(): string;

  setBorderBottomStyle(borderBottomStyle: string): void;

  borderLeftStyle(): string;

  setBorderLeftStyle(borderLeftStyle: string): void;

  borderTopWidth(): string;

  setBorderTopWidth(borderTopWidth: string): void;

  borderRightWidth(): string;

  setBorderRightWidth(borderRightWidth: string): void;

  borderBottomWidth(): string;

  setBorderBottomWidth(borderBottomWidth: string): void;

  borderLeftWidth(): string;

  setBorderLeftWidth(borderLeftWidth: string): void;

  borderWidth(): string;

  setBorderWidth(borderWidth: string): void;

  bottom(): string;

  setBottom(bottom: string): void;

  captionSide(): string;

  setCaptionSide(captionSide: string): void;

  clear(): string;

  setClear(clear: string): void;

  clip(): string;

  setClip(clip: string): void;

  color(): string;

  setColor(color: string): void;

  content(): string;

  setContent(content: string): void;

  counterIncrement(): string;

  setCounterIncrement(counterIncrement: string): void;

  counterReset(): string;

  setCounterReset(counterReset: string): void;

  cue(): string;

  setCue(cue: string): void;

  cueAfter(): string;

  setCueAfter(cueAfter: string): void;

  cueBefore(): string;

  setCueBefore(cueBefore: string): void;

  cursor(): string;

  setCursor(cursor: string): void;

  direction(): string;

  setDirection(direction: string): void;

  display(): string;

  setDisplay(display: string): void;

  elevation(): string;

  setElevation(elevation: string): void;

  emptyCells(): string;

  setEmptyCells(emptyCells: string): void;

  cssFloat(): string;

  setCssFloat(cssFloat: string): void;

  font(): string;

  setFont(font: string): void;

  fontFamily(): string;

  setFontFamily(fontFamily: string): void;

  fontSize(): string;

  setFontSize(fontSize: string): void;

  fontSizeAdjust(): string;

  setFontSizeAdjust(fontSizeAdjust: string): void;

  fontStretch(): string;

  setFontStretch(fontStretch: string): void;

  fontStyle(): string;

  setFontStyle(fontStyle: string): void;

  fontVariant(): string;

  setFontVariant(fontVariant: string): void;

  fontWeight(): string;

  setFontWeight(fontWeight: string): void;

  height(): string;

  setHeight(height: string): void;

  left(): string;

  setLeft(left: string): void;

  letterSpacing(): string;

  setLetterSpacing(letterSpacing: string): void;

  lineHeight(): string;

  setLineHeight(lineHeight: string): void;

  listStyle(): string;

  setListStyle(listStyle: string): void;

  listStyleImage(): string;

  setListStyleImage(listStyleImage: string): void;

  listStylePosition(): string;

  setListStylePosition(listStylePosition: string): void;

  listStyleType(): string;

  setListStyleType(listStyleType: string): void;

  margin(): string;

  setMargin(margin: string): void;

  marginTop(): string;

  setMarginTop(marginTop: string): void;

  marginRight(): string;

  setMarginRight(marginRight: string): void;

  marginBottom(): string;

  setMarginBottom(marginBottom: string): void;

  marginLeft(): string;

  setMarginLeft(marginLeft: string): void;

  markerOffset(): string;

  setMarkerOffset(markerOffset: string): void;

  marks(): string;

  setMarks(marks: string): void;

  maxHeight(): string;

  setMaxHeight(maxHeight: string): void;

  maxWidth(): string;

  setMaxWidth(maxWidth: string): void;

  minHeight(): string;

  setMinHeight(minHeight: string): void;

  minWidth(): string;

  setMinWidth(minWidth: string): void;

  orphans(): string;

  setOrphans(orphans: string): void;

  outline(): string;

  setOutline(outline: string): void;

  outlineColor(): string;

  setOutlineColor(outlineColor: string): void;

  outlineStyle(): string;

  setOutlineStyle(outlineStyle: string): void;

  outlineWidth(): string;

  setOutlineWidth(outlineWidth: string): void;

  overflow(): string;

  setOverflow(overflow: string): void;

  padding(): string;

  setPadding(padding: string): void;

  paddingTop(): string;

  setPaddingTop(paddingTop: string): void;

  paddingRight(): string;

  setPaddingRight(paddingRight: string): void;

  paddingBottom(): string;

  setPaddingBottom(paddingBottom: string): void;

  paddingLeft(): string;

  setPaddingLeft(paddingLeft: string): void;

  page(): string;

  setPage(page: string): void;

  pageBreakAfter(): string;

  setPageBreakAfter(pageBreakAfter: string): void;

  pageBreakBefore(): string;

  setPageBreakBefore(pageBreakBefore: string): void;

  pageBreakInside(): string;

  setPageBreakInside(pageBreakInside: string): void;

  pause(): string;

  setPause(pause: string): void;

  pauseAfter(): string;

  setPauseAfter(pauseAfter: string): void;

  pauseBefore(): string;

  setPauseBefore(pauseBefore: string): void;

  pitch(): string;

  setPitch(pitch: string): void;

  pitchRange(): string;

  setPitchRange(pitchRange: string): void;

  playDuring(): string;

  setPlayDuring(playDuring: string): void;

  position(): string;

  setPosition(position: string): void;

  quotes(): string;

  setQuotes(quotes: string): void;

  richness(): string;

  setRichness(richness: string): void;

  right(): string;

  setRight(right: string): void;

  size(): string;

  setSize(size: string): void;

  speak(): string;

  setSpeak(speak: string): void;

  speakHeader(): string;

  setSpeakHeader(speakHeader: string): void;

  speakNumeral(): string;

  setSpeakNumeral(speakNumeral: string): void;

  speakPunctuation(): string;

  setSpeakPunctuation(speakPunctuation: string): void;

  speechRate(): string;

  setSpeechRate(speechRate: string): void;

  stress(): string;

  setStress(stress: string): void;

  tableLayout(): string;

  setTableLayout(tableLayout: string): void;

  textAlign(): string;

  setTextAlign(textAlign: string): void;

  textDecoration(): string;

  setTextDecoration(textDecoration: string): void;

  textIndent(): string;

  setTextIndent(textIndent: string): void;

  textShadow(): string;

  setTextShadow(textShadow: string): void;

  textTransform(): string;

  setTextTransform(textTransform: string): void;

  top(): string;

  setTop(top: string): void;

  unicodeBidi(): string;

  setUnicodeBidi(unicodeBidi: string): void;

  verticalAlign(): string;

  setVerticalAlign(verticalAlign: string): void;

  visibility(): string;

  setVisibility(visibility: string): void;

  voiceFamily(): string;

  setVoiceFamily(voiceFamily: string): void;

  volume(): string;

  setVolume(volume: string): void;

  whiteSpace(): string;

  setWhiteSpace(whiteSpace: string): void;

  widows(): string;

  setWidows(widows: string): void;

  width(): string;

  setWidth(width: string): void;

  wordSpacing(): string;

  setWordSpacing(wordSpacing: string): void;

  zIndex(): string;

  setZIndex(zIndex: string): void;
}

declare class DOMCSSRuleList extends DOMObject {
  readonly length: number;

  item(index: number): DOMCSSRule;
}

declare class DOMCSSMediaRule extends DOMCSSRule {
  readonly media: DOMMediaList;

  readonly cssRules: DOMCSSRuleList;

  insertRuleIndex(rule: string, index: number): number;

  deleteRule(index: number): void;

  insertRule(rule: string, index: number): number;
}

declare class DOMCSSImportRule extends DOMCSSRule {
  readonly href: string;

  readonly media: DOMMediaList;

  readonly styleSheet: DOMCSSStyleSheet;
}

declare class DOMCSSFontFaceRule extends DOMCSSRule {
  readonly style: DOMCSSStyleDeclaration;
}

declare class DOMStyleSheet extends DOMObject {
  readonly type: string;

  disabled: boolean;

  readonly ownerNode: DOMNode;

  readonly parentStyleSheet: DOMStyleSheet;

  readonly href: string;

  readonly title: string;

  readonly media: DOMMediaList;

  setDisabled(disabled: boolean): void;
}

declare class DOMNodeList extends DOMObject {
  readonly length: number;

  item(index: number): DOMNode;
}

declare class DOMImplementation extends DOMObject {
  hasFeatureVersion(feature: string, version: string): boolean;

  createDocumentTypePublicIdSystemId(qualifiedName: string, publicId: string, systemId: string): DOMDocumentType;

  createDocumentQualifiedNameDoctype(namespaceURI: string, qualifiedName: string, doctype: DOMDocumentType): DOMDocument;

  createCSSStyleSheetMedia(title: string, media: string): DOMCSSStyleSheet;

  createHTMLDocument(title: string): DOMHTMLDocument;

  hasFeature(feature: string, version: string): boolean;

  createDocumentType(qualifiedName: string, publicId: string, systemId: string): DOMDocumentType;

  createDocument(namespaceURI: string, qualifiedName: string, doctype: DOMDocumentType): DOMDocument;

  createCSSStyleSheet(title: string, media: string): DOMCSSStyleSheet;
}

declare class DOMEntityReference extends DOMNode {
}

declare class DOMDocument extends DOMNode {
  readonly doctype: DOMDocumentType;

  readonly implementation: DOMImplementation;

  readonly documentElement: DOMElement;

  readonly inputEncoding: string;

  readonly xmlEncoding: string;

  xmlVersion: string;

  xmlStandalone: boolean;

  documentURI: string;

  readonly defaultView: DOMAbstractView;

  readonly styleSheets: DOMStyleSheetList;

  title: string;

  readonly referrer: string;

  readonly domain: string;

  readonly URL: string;

  cookie: string;

  body: DOMHTMLElement;

  readonly images: DOMHTMLCollection;

  readonly applets: DOMHTMLCollection;

  readonly links: DOMHTMLCollection;

  readonly forms: DOMHTMLCollection;

  readonly anchors: DOMHTMLCollection;

  readonly lastModified: string;

  charset: string;

  readonly defaultCharset: string;

  readonly readyState: string;

  readonly characterSet: string;

  readonly preferredStylesheetSet: string;

  selectedStylesheetSet: string;

  readonly activeElement: DOMElement;

  createElement(tagName: string): DOMElement;

  createDocumentFragment(): DOMDocumentFragment;

  createTextNode(data: string): DOMText;

  createComment(data: string): DOMComment;

  createCDATASection(data: string): DOMCDATASection;

  createProcessingInstructionData(target: string, data: string): DOMProcessingInstruction;

  createAttribute(name: string): DOMAttr;

  createEntityReference(name: string): DOMEntityReference;

  getElementsByTagName(tagname: string): DOMNodeList;

  importNodeDeep(importedNode: DOMNode, deep: boolean): DOMNode;

  createElementNSQualifiedName(namespaceURI: string, qualifiedName: string): DOMElement;

  createAttributeNSQualifiedName(namespaceURI: string, qualifiedName: string): DOMAttr;

  getElementsByTagNameNSLocalName(namespaceURI: string, localName: string): DOMNodeList;

  adoptNode(source: DOMNode): DOMNode;

  createEvent(eventType: string): DOMEvent;

  createRange(): DOMRange;

  createNodeIteratorWhatToShowFilterExpandEntityReferences(root: DOMNode, whatToShow: number, filter: DOMNodeFilter, expandEntityReferences: boolean): DOMNodeIterator;

  createTreeWalkerWhatToShowFilterExpandEntityReferences(root: DOMNode, whatToShow: number, filter: DOMNodeFilter, expandEntityReferences: boolean): DOMTreeWalker;

  getOverrideStylePseudoElement(element: DOMElement, pseudoElement: string): DOMCSSStyleDeclaration;

  createExpressionResolver(expression: string, resolver: DOMXPathNSResolver): DOMXPathExpression;

  createNSResolver(nodeResolver: DOMNode): DOMXPathNSResolver;

  evaluateContextNodeResolverTypeInResult(expression: string, contextNode: DOMNode, resolver: DOMXPathNSResolver, type: number, inResult: DOMXPathResult): DOMXPathResult;

  execCommandUserInterfaceValue(command: string, userInterface: boolean, value: string): boolean;

  execCommandUserInterface(command: string, userInterface: boolean): boolean;

  execCommand(command: string): boolean;

  queryCommandEnabled(command: string): boolean;

  queryCommandIndeterm(command: string): boolean;

  queryCommandState(command: string): boolean;

  queryCommandSupported(command: string): boolean;

  queryCommandValue(command: string): string;

  getElementsByName(elementName: string): DOMNodeList;

  elementFromPointY(x: number, y: number): DOMElement;

  createCSSStyleDeclaration(): DOMCSSStyleDeclaration;

  getComputedStylePseudoElement(element: DOMElement, pseudoElement: string): DOMCSSStyleDeclaration;

  getMatchedCSSRulesPseudoElement(element: DOMElement, pseudoElement: string): DOMCSSRuleList;

  getMatchedCSSRulesPseudoElementAuthorOnly(element: DOMElement, pseudoElement: string, authorOnly: boolean): DOMCSSRuleList;

  getElementsByClassName(classNames: string): DOMNodeList;

  hasFocus(): boolean;

  webkitCancelFullScreen(): void;

  getElementById(elementId: string): DOMElement;

  querySelector(selectors: string): DOMElement;

  querySelectorAll(selectors: string): DOMNodeList;

  setXmlVersion(xmlVersion: string): void;

  setXmlStandalone(xmlStandalone: boolean): void;

  setDocumentURI(documentURI: string): void;

  setTitle(title: string): void;

  setCookie(cookie: string): void;

  setBody(body: DOMHTMLElement): void;

  setCharset(charset: string): void;

  setSelectedStylesheetSet(selectedStylesheetSet: string): void;

  createProcessingInstruction(target: string, data: string): DOMProcessingInstruction;

  importNode(importedNode: DOMNode, deep: boolean): DOMNode;

  createElementNS(namespaceURI: string, qualifiedName: string): DOMElement;

  createAttributeNS(namespaceURI: string, qualifiedName: string): DOMAttr;

  getElementsByTagNameNS(namespaceURI: string, localName: string): DOMNodeList;

  createNodeIterator(root: DOMNode, whatToShow: number, filter: DOMNodeFilter, expandEntityReferences: boolean): DOMNodeIterator;

  createTreeWalker(root: DOMNode, whatToShow: number, filter: DOMNodeFilter, expandEntityReferences: boolean): DOMTreeWalker;

  getOverrideStyle(element: DOMElement, pseudoElement: string): DOMCSSStyleDeclaration;

  createExpression(expression: string, resolver: DOMXPathNSResolver): DOMXPathExpression;

  evaluate(expression: string, contextNode: DOMNode, resolver: DOMXPathNSResolver, type: number, inResult: DOMXPathResult): DOMXPathResult;

  getComputedStyle(element: DOMElement, pseudoElement: string): DOMCSSStyleDeclaration;

  readonly webFrame: WebFrame;

  URLWithAttributeString(string: string): NSURL;
}

declare class DOMComment extends DOMCharacterData {
}

declare class DOMCDATASection extends DOMText {
}

declare class DOMAttr extends DOMNode {
  readonly name: string;

  readonly specified: boolean;

  value: string;

  readonly ownerElement: DOMElement;

  readonly style: DOMCSSStyleDeclaration;

  setValue(value: string): void;
}

declare class DOMNode extends DOMObject implements DOMEventTarget {
  readonly nodeName: string;

  nodeValue: string;

  readonly nodeType: number;

  readonly parentNode: DOMNode;

  readonly childNodes: DOMNodeList;

  readonly firstChild: DOMNode;

  readonly lastChild: DOMNode;

  readonly previousSibling: DOMNode;

  readonly nextSibling: DOMNode;

  readonly ownerDocument: DOMDocument;

  readonly namespaceURI: string;

  prefix: string;

  readonly localName: string;

  readonly attributes: DOMNamedNodeMap;

  readonly baseURI: string;

  textContent: string;

  readonly parentElement: DOMElement;

  readonly isContentEditable: boolean;

  insertBeforeRefChild(newChild: DOMNode, refChild: DOMNode): DOMNode;

  replaceChildOldChild(newChild: DOMNode, oldChild: DOMNode): DOMNode;

  removeChild(oldChild: DOMNode): DOMNode;

  appendChild(newChild: DOMNode): DOMNode;

  hasChildNodes(): boolean;

  cloneNode(deep: boolean): DOMNode;

  normalize(): void;

  isSupportedVersion(feature: string, version: string): boolean;

  hasAttributes(): boolean;

  isSameNode(other: DOMNode): boolean;

  isEqualNode(other: DOMNode): boolean;

  lookupPrefix(namespaceURI: string): string;

  lookupNamespaceURI(prefix: string): string;

  isDefaultNamespace(namespaceURI: string): boolean;

  compareDocumentPosition(other: DOMNode): number;

  contains(other: DOMNode): boolean;

  setNodeValue(nodeValue: string): void;

  setPrefix(prefix: string): void;

  setTextContent(textContent: string): void;

  insertBefore(newChild: DOMNode, refChild: DOMNode): DOMNode;

  replaceChild(newChild: DOMNode, oldChild: DOMNode): DOMNode;

  isSupported(feature: string, version: string): boolean;

  boundingBox(): CGRect;

  lineBoxRects(): NSArray;

  readonly webArchive: WebArchive;

  addEventListenerListenerUseCapture(type: string, listener: DOMEventListener, useCapture: boolean): void;

  removeEventListenerListenerUseCapture(type: string, listener: DOMEventListener, useCapture: boolean): void;

  dispatchEvent(event: DOMEvent): boolean;

  addEventListener(type: string, listener: DOMEventListener, useCapture: boolean): void;

  removeEventListener(type: string, listener: DOMEventListener, useCapture: boolean): void;

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

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class WebUndefined extends NSObject implements NSCoding, NSCopying {
  static undefined(): WebUndefined;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class WebScriptObject extends NSObject {
  static throwException(exceptionMessage: string): boolean;

  JSObject(): interop.Pointer;

  callWebScriptMethodWithArguments(name: string, arguments$: NSArray<interop.Object> | Array<interop.Object>): interop.Object;

  evaluateWebScript(script: string): interop.Object;

  removeWebScriptKey(name: string): void;

  stringRepresentation(): string;

  webScriptValueAtIndex(index: number): interop.Object;

  setWebScriptValueAtIndexValue(index: number, value: interop.Object): void;

  setException(description: string): void;

  JSValue(): JSValue;
}

declare class WKWebViewConfiguration extends NSObject implements NSSecureCoding, NSCopying {
  processPool: WKProcessPool;

  preferences: WKPreferences;

  userContentController: WKUserContentController;

  webExtensionController: WKWebExtensionController;

  websiteDataStore: WKWebsiteDataStore;

  suppressesIncrementalRendering: boolean;

  applicationNameForUserAgent: string;

  allowsAirPlayForMediaPlayback: boolean;

  upgradeKnownHostsToHTTPS: boolean;

  mediaTypesRequiringUserActionForPlayback: interop.Enum<typeof WKAudiovisualMediaTypes>;

  defaultWebpagePreferences: WKWebpagePreferences;

  limitsNavigationsToAppBoundDomains: boolean;

  allowsInlinePredictions: boolean;

  userInterfaceDirectionPolicy: interop.Enum<typeof WKUserInterfaceDirectionPolicy>;

  setURLSchemeHandlerForURLScheme(urlSchemeHandler: WKURLSchemeHandler | null, urlScheme: string): void;

  urlSchemeHandlerForURLScheme(urlScheme: string): WKURLSchemeHandler;

  supportsAdaptiveImageGlyph: boolean;

  writingToolsBehavior: interop.Enum<typeof NSWritingToolsBehavior>;

  setProcessPool(processPool: WKProcessPool): void;

  setPreferences(preferences: WKPreferences): void;

  setUserContentController(userContentController: WKUserContentController): void;

  setWebExtensionController(webExtensionController: WKWebExtensionController | null): void;

  setWebsiteDataStore(websiteDataStore: WKWebsiteDataStore): void;

  setSuppressesIncrementalRendering(suppressesIncrementalRendering: boolean): void;

  setApplicationNameForUserAgent(applicationNameForUserAgent: string | null): void;

  setAllowsAirPlayForMediaPlayback(allowsAirPlayForMediaPlayback: boolean): void;

  setUpgradeKnownHostsToHTTPS(upgradeKnownHostsToHTTPS: boolean): void;

  setMediaTypesRequiringUserActionForPlayback(mediaTypesRequiringUserActionForPlayback: interop.Enum<typeof WKAudiovisualMediaTypes>): void;

  setDefaultWebpagePreferences(defaultWebpagePreferences: WKWebpagePreferences | null): void;

  setLimitsNavigationsToAppBoundDomains(limitsNavigationsToAppBoundDomains: boolean): void;

  setAllowsInlinePredictions(allowsInlinePredictions: boolean): void;

  setUserInterfaceDirectionPolicy(userInterfaceDirectionPolicy: interop.Enum<typeof WKUserInterfaceDirectionPolicy>): void;

  setSupportsAdaptiveImageGlyph(supportsAdaptiveImageGlyph: boolean): void;

  setWritingToolsBehavior(writingToolsBehavior: interop.Enum<typeof NSWritingToolsBehavior>): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class WKWebExtensionWindowConfiguration extends NSObject {
  readonly windowType: interop.Enum<typeof WKWebExtensionWindowType>;

  readonly windowState: interop.Enum<typeof WKWebExtensionWindowState>;

  readonly frame: CGRect;

  readonly tabURLs: NSArray;

  readonly tabs: NSArray;

  readonly shouldBeFocused: boolean;

  readonly shouldBePrivate: boolean;
}

declare class WKWebExtensionTabConfiguration extends NSObject {
  readonly window: WKWebExtensionWindow;

  readonly index: number;

  readonly parentTab: WKWebExtensionTab;

  readonly url: NSURL;

  readonly shouldBeActive: boolean;

  readonly shouldAddToSelection: boolean;

  readonly shouldBePinned: boolean;

  readonly shouldBeMuted: boolean;

  readonly shouldReaderModeBeActive: boolean;
}

declare class WKWebExtensionMessagePort extends NSObject {
  readonly applicationIdentifier: string;

  messageHandler: (p1: interop.Object, p2: NSError) => void | null;

  disconnectHandler: (p1: NSError) => void | null;

  readonly disconnected: boolean;

  sendMessageCompletionHandler(message: interop.Object | null, completionHandler: (p1: NSError) => void | null): void;

  disconnect(): void;

  disconnectWithError(error: NSError | null): void;

  setMessageHandler(messageHandler: (p1: interop.Object, p2: NSError) => void | null): void;

  setDisconnectHandler(disconnectHandler: (p1: NSError) => void | null): void;

  isDisconnected(): boolean;
}

declare class WKWebExtensionDataRecord extends NSObject {
  readonly displayName: string;

  readonly uniqueIdentifier: string;

  readonly containedDataTypes: NSSet;

  readonly errors: NSArray;

  readonly totalSizeInBytes: number;

  sizeInBytesOfTypes(dataTypes: NSSet): number;
}

declare class WKWebExtensionControllerConfiguration extends NSObject implements NSSecureCoding, NSCopying {
  static defaultConfiguration<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  static nonPersistentConfiguration<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  static configurationWithIdentifier<This extends abstract new (...args: any) => any>(this: This, identifier: NSUUID): InstanceType<This>;

  readonly persistent: boolean;

  readonly identifier: NSUUID;

  webViewConfiguration: WKWebViewConfiguration;

  defaultWebsiteDataStore: WKWebsiteDataStore;

  isPersistent(): boolean;

  setWebViewConfiguration(webViewConfiguration: WKWebViewConfiguration | null): void;

  setDefaultWebsiteDataStore(defaultWebsiteDataStore: WKWebsiteDataStore | null): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class WKWebExtensionController extends NSObject {
  init(): this;

  initWithConfiguration(configuration: WKWebExtensionControllerConfiguration): this;

  delegate: WKWebExtensionControllerDelegate | null;

  readonly configuration: WKWebExtensionControllerConfiguration;

  loadExtensionContextError(extensionContext: WKWebExtensionContext, error: interop.PointerConvertible): boolean;

  unloadExtensionContextError(extensionContext: WKWebExtensionContext, error: interop.PointerConvertible): boolean;

  extensionContextForExtension(extension: WKWebExtension): WKWebExtensionContext;

  extensionContextForURL(URL: NSURL): WKWebExtensionContext;

  readonly extensions: NSSet;

  readonly extensionContexts: NSSet;

  static readonly allExtensionDataTypes: NSSet;

  fetchDataRecordsOfTypesCompletionHandler(dataTypes: NSSet, completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>) => void): void;

  fetchDataRecordOfTypesForExtensionContextCompletionHandler(dataTypes: NSSet, extensionContext: WKWebExtensionContext, completionHandler: (p1: WKWebExtensionDataRecord) => void | null): void;

  removeDataOfTypesFromDataRecordsCompletionHandler(dataTypes: NSSet, dataRecords: NSArray<interop.Object> | Array<interop.Object>, completionHandler: () => void): void;

  didOpenWindow(newWindow: WKWebExtensionWindow): void;

  didCloseWindow(closedWindow: WKWebExtensionWindow): void;

  didFocusWindow(focusedWindow: WKWebExtensionWindow | null): void;

  didOpenTab(newTab: WKWebExtensionTab): void;

  didCloseTabWindowIsClosing(closedTab: WKWebExtensionTab, windowIsClosing: boolean): void;

  didActivateTabPreviousActiveTab(activatedTab: WKWebExtensionTab, previousTab: WKWebExtensionTab | null): void;

  didSelectTabs(selectedTabs: NSArray<interop.Object> | Array<interop.Object>): void;

  didDeselectTabs(deselectedTabs: NSArray<interop.Object> | Array<interop.Object>): void;

  didMoveTabFromIndexInWindow(movedTab: WKWebExtensionTab, index: number, oldWindow: WKWebExtensionWindow | null): void;

  didReplaceTabWithTab(oldTab: WKWebExtensionTab, newTab: WKWebExtensionTab): void;

  didChangeTabPropertiesForTab(properties: interop.Enum<typeof WKWebExtensionTabChangedProperties>, changedTab: WKWebExtensionTab): void;

  setDelegate(delegate: WKWebExtensionControllerDelegate | null): void;
}

declare class WKWebExtensionContext extends NSObject {
  static contextForExtension<This extends abstract new (...args: any) => any>(this: This, extension: WKWebExtension): InstanceType<This>;

  initForExtension(extension: WKWebExtension): this;

  readonly webExtension: WKWebExtension;

  readonly webExtensionController: WKWebExtensionController;

  readonly loaded: boolean;

  readonly errors: NSArray;

  baseURL: NSURL;

  uniqueIdentifier: string;

  inspectable: boolean;

  inspectionName: string;

  unsupportedAPIs: NSSet;

  readonly webViewConfiguration: WKWebViewConfiguration;

  readonly optionsPageURL: NSURL;

  readonly overrideNewTabPageURL: NSURL;

  get grantedPermissions(): NSDictionary;
  set grantedPermissions(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  get grantedPermissionMatchPatterns(): NSDictionary;
  set grantedPermissionMatchPatterns(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  get deniedPermissions(): NSDictionary;
  set deniedPermissions(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  get deniedPermissionMatchPatterns(): NSDictionary;
  set deniedPermissionMatchPatterns(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  hasRequestedOptionalAccessToAllHosts: boolean;

  hasAccessToPrivateData: boolean;

  readonly currentPermissions: NSSet;

  readonly currentPermissionMatchPatterns: NSSet;

  hasPermission(permission: string): boolean;

  hasPermissionInTab(permission: string, tab: WKWebExtensionTab | null): boolean;

  hasAccessToURL(url: NSURL): boolean;

  hasAccessToURLInTab(url: NSURL, tab: WKWebExtensionTab | null): boolean;

  readonly hasAccessToAllURLs: boolean;

  readonly hasAccessToAllHosts: boolean;

  readonly hasInjectedContent: boolean;

  hasInjectedContentForURL(url: NSURL): boolean;

  readonly hasContentModificationRules: boolean;

  permissionStatusForPermission(permission: string): interop.Enum<typeof WKWebExtensionContextPermissionStatus>;

  permissionStatusForPermissionInTab(permission: string, tab: WKWebExtensionTab | null): interop.Enum<typeof WKWebExtensionContextPermissionStatus>;

  setPermissionStatusForPermission(status: interop.Enum<typeof WKWebExtensionContextPermissionStatus>, permission: string): void;

  setPermissionStatusForPermissionExpirationDate(status: interop.Enum<typeof WKWebExtensionContextPermissionStatus>, permission: string, expirationDate: NSDate | null): void;

  permissionStatusForURL(url: NSURL): interop.Enum<typeof WKWebExtensionContextPermissionStatus>;

  permissionStatusForURLInTab(url: NSURL, tab: WKWebExtensionTab | null): interop.Enum<typeof WKWebExtensionContextPermissionStatus>;

  setPermissionStatusForURL(status: interop.Enum<typeof WKWebExtensionContextPermissionStatus>, url: NSURL): void;

  setPermissionStatusForURLExpirationDate(status: interop.Enum<typeof WKWebExtensionContextPermissionStatus>, url: NSURL, expirationDate: NSDate | null): void;

  permissionStatusForMatchPattern(pattern: WKWebExtensionMatchPattern): interop.Enum<typeof WKWebExtensionContextPermissionStatus>;

  permissionStatusForMatchPatternInTab(pattern: WKWebExtensionMatchPattern, tab: WKWebExtensionTab | null): interop.Enum<typeof WKWebExtensionContextPermissionStatus>;

  setPermissionStatusForMatchPattern(status: interop.Enum<typeof WKWebExtensionContextPermissionStatus>, pattern: WKWebExtensionMatchPattern): void;

  setPermissionStatusForMatchPatternExpirationDate(status: interop.Enum<typeof WKWebExtensionContextPermissionStatus>, pattern: WKWebExtensionMatchPattern, expirationDate: NSDate | null): void;

  loadBackgroundContentWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  actionForTab(tab: WKWebExtensionTab | null): WKWebExtensionAction;

  performActionForTab(tab: WKWebExtensionTab | null): void;

  readonly commands: NSArray;

  performCommand(command: WKWebExtensionCommand): void;

  performCommandForEvent(event: NSEvent): boolean;

  commandForEvent(event: NSEvent): WKWebExtensionCommand;

  menuItemsForTab(tab: WKWebExtensionTab): NSArray;

  userGesturePerformedInTab(tab: WKWebExtensionTab): void;

  hasActiveUserGestureInTab(tab: WKWebExtensionTab): boolean;

  clearUserGestureInTab(tab: WKWebExtensionTab): void;

  readonly openWindows: NSArray;

  readonly focusedWindow: WKWebExtensionWindow;

  readonly openTabs: NSSet;

  didOpenWindow(newWindow: WKWebExtensionWindow): void;

  didCloseWindow(closedWindow: WKWebExtensionWindow): void;

  didFocusWindow(focusedWindow: WKWebExtensionWindow | null): void;

  didOpenTab(newTab: WKWebExtensionTab): void;

  didCloseTabWindowIsClosing(closedTab: WKWebExtensionTab, windowIsClosing: boolean): void;

  didActivateTabPreviousActiveTab(activatedTab: WKWebExtensionTab, previousTab: WKWebExtensionTab | null): void;

  didSelectTabs(selectedTabs: NSArray<interop.Object> | Array<interop.Object>): void;

  didDeselectTabs(deselectedTabs: NSArray<interop.Object> | Array<interop.Object>): void;

  didMoveTabFromIndexInWindow(movedTab: WKWebExtensionTab, index: number, oldWindow: WKWebExtensionWindow | null): void;

  didReplaceTabWithTab(oldTab: WKWebExtensionTab, newTab: WKWebExtensionTab): void;

  didChangeTabPropertiesForTab(properties: interop.Enum<typeof WKWebExtensionTabChangedProperties>, changedTab: WKWebExtensionTab): void;

  isLoaded(): boolean;

  setBaseURL(baseURL: NSURL): void;

  setUniqueIdentifier(uniqueIdentifier: string): void;

  isInspectable(): boolean;

  setInspectable(inspectable: boolean): void;

  setInspectionName(inspectionName: string | null): void;

  setUnsupportedAPIs(unsupportedAPIs: NSSet | null): void;

  setGrantedPermissions(grantedPermissions: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  setGrantedPermissionMatchPatterns(grantedPermissionMatchPatterns: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  setDeniedPermissions(deniedPermissions: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  setDeniedPermissionMatchPatterns(deniedPermissionMatchPatterns: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;

  setHasRequestedOptionalAccessToAllHosts(hasRequestedOptionalAccessToAllHosts: boolean): void;

  setHasAccessToPrivateData(hasAccessToPrivateData: boolean): void;
}

declare class DOMText extends DOMCharacterData {
  readonly wholeText: string;

  splitText(offset: number): DOMText;

  replaceWholeText(content: string): DOMText;
}

declare class WKWebExtensionMatchPattern extends NSObject implements NSSecureCoding, NSCopying {
  static registerCustomURLScheme(urlScheme: string): void;

  static allURLsMatchPattern<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  static allHostsAndSchemesMatchPattern<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  static matchPatternWithString<This extends abstract new (...args: any) => any>(this: This, string: string): InstanceType<This>;

  static matchPatternWithSchemeHostPath<This extends abstract new (...args: any) => any>(this: This, scheme: string, host: string, path: string): InstanceType<This>;

  initWithStringError(string: string, error: interop.PointerConvertible): this;

  initWithSchemeHostPathError(scheme: string, host: string, path: string, error: interop.PointerConvertible): this;

  readonly string: string;

  readonly scheme: string;

  readonly host: string;

  readonly path: string;

  readonly matchesAllURLs: boolean;

  readonly matchesAllHosts: boolean;

  matchesURL(url: NSURL | null): boolean;

  matchesURLOptions(url: NSURL | null, options: interop.Enum<typeof WKWebExtensionMatchPatternOptions>): boolean;

  matchesPattern(pattern: WKWebExtensionMatchPattern | null): boolean;

  matchesPatternOptions(pattern: WKWebExtensionMatchPattern | null, options: interop.Enum<typeof WKWebExtensionMatchPatternOptions>): boolean;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class WKUserScript extends NSObject implements NSCopying {
  readonly source: string;

  readonly injectionTime: interop.Enum<typeof WKUserScriptInjectionTime>;

  readonly forMainFrameOnly: boolean;

  initWithSourceInjectionTimeForMainFrameOnly(source: string, injectionTime: interop.Enum<typeof WKUserScriptInjectionTime>, forMainFrameOnly: boolean): this;

  initWithSourceInjectionTimeForMainFrameOnlyInContentWorld(source: string, injectionTime: interop.Enum<typeof WKUserScriptInjectionTime>, forMainFrameOnly: boolean, contentWorld: WKContentWorld): this;

  isForMainFrameOnly(): boolean;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class WKUserContentController extends NSObject implements NSSecureCoding {
  readonly userScripts: NSArray;

  addUserScript(userScript: WKUserScript): void;

  removeAllUserScripts(): void;

  addScriptMessageHandlerContentWorldName(scriptMessageHandler: WKScriptMessageHandler, world: WKContentWorld, name: string): void;

  addScriptMessageHandlerWithReplyContentWorldName(scriptMessageHandlerWithReply: WKScriptMessageHandlerWithReply, contentWorld: WKContentWorld, name: string): void;

  addScriptMessageHandlerName(scriptMessageHandler: WKScriptMessageHandler, name: string): void;

  removeScriptMessageHandlerForNameContentWorld(name: string, contentWorld: WKContentWorld): void;

  removeScriptMessageHandlerForName(name: string): void;

  removeAllScriptMessageHandlersFromContentWorld(contentWorld: WKContentWorld): void;

  removeAllScriptMessageHandlers(): void;

  addContentRuleList(contentRuleList: WKContentRuleList): void;

  removeContentRuleList(contentRuleList: WKContentRuleList): void;

  removeAllContentRuleLists(): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class WKSnapshotConfiguration extends NSObject implements NSCopying {
  rect: CGRect;

  snapshotWidth: NSNumber;

  afterScreenUpdates: boolean;

  setRect(rect: CGRect): void;

  setSnapshotWidth(snapshotWidth: NSNumber | null): void;

  setAfterScreenUpdates(afterScreenUpdates: boolean): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class WKPreferences extends NSObject implements NSSecureCoding {
  minimumFontSize: number;

  javaScriptCanOpenWindowsAutomatically: boolean;

  fraudulentWebsiteWarningEnabled: boolean;

  shouldPrintBackgrounds: boolean;

  tabFocusesLinks: boolean;

  textInteractionEnabled: boolean;

  siteSpecificQuirksModeEnabled: boolean;

  elementFullscreenEnabled: boolean;

  inactiveSchedulingPolicy: interop.Enum<typeof WKInactiveSchedulingPolicy>;

  setMinimumFontSize(minimumFontSize: number): void;

  setJavaScriptCanOpenWindowsAutomatically(javaScriptCanOpenWindowsAutomatically: boolean): void;

  isFraudulentWebsiteWarningEnabled(): boolean;

  setFraudulentWebsiteWarningEnabled(fraudulentWebsiteWarningEnabled: boolean): void;

  setShouldPrintBackgrounds(shouldPrintBackgrounds: boolean): void;

  setTabFocusesLinks(tabFocusesLinks: boolean): void;

  isTextInteractionEnabled(): boolean;

  setTextInteractionEnabled(textInteractionEnabled: boolean): void;

  isSiteSpecificQuirksModeEnabled(): boolean;

  setSiteSpecificQuirksModeEnabled(siteSpecificQuirksModeEnabled: boolean): void;

  isElementFullscreenEnabled(): boolean;

  setElementFullscreenEnabled(elementFullscreenEnabled: boolean): void;

  setInactiveSchedulingPolicy(inactiveSchedulingPolicy: interop.Enum<typeof WKInactiveSchedulingPolicy>): void;

  javaEnabled: boolean;

  plugInsEnabled: boolean;

  javaScriptEnabled: boolean;

  setJavaEnabled(javaEnabled: boolean): void;

  setPlugInsEnabled(plugInsEnabled: boolean): void;

  setJavaScriptEnabled(javaScriptEnabled: boolean): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class WKPDFConfiguration extends NSObject implements NSCopying {
  rect: CGRect;

  allowTransparentBackground: boolean;

  setRect(rect: CGRect): void;

  setAllowTransparentBackground(allowTransparentBackground: boolean): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class WKOpenPanelParameters extends NSObject {
  readonly allowsMultipleSelection: boolean;

  readonly allowsDirectories: boolean;
}

declare class WKNavigationResponse extends NSObject {
  readonly forMainFrame: boolean;

  readonly response: NSURLResponse;

  readonly canShowMIMEType: boolean;

  isForMainFrame(): boolean;
}

declare class WKHTTPCookieStore extends NSObject {
  getAllCookies(completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>) => void): void;

  setCookieCompletionHandler(cookie: NSHTTPCookie, completionHandler: () => void | null): void;

  deleteCookieCompletionHandler(cookie: NSHTTPCookie, completionHandler: () => void | null): void;

  addObserver(observer: WKHTTPCookieStoreObserver): void;

  removeObserver(observer: WKHTTPCookieStoreObserver): void;

  setCookiePolicyCompletionHandler(policy: interop.Enum<typeof WKCookiePolicy>, completionHandler: () => void | null): void;

  getCookiePolicy(completionHandler: (p1: interop.Enum<typeof WKCookiePolicy>) => void): void;
}

declare class WKWebView extends NSView {
  readonly configuration: WKWebViewConfiguration;

  navigationDelegate: WKNavigationDelegate;

  UIDelegate: WKUIDelegate;

  readonly backForwardList: WKBackForwardList;

  initWithFrameConfiguration(frame: CGRect, configuration: WKWebViewConfiguration): this;

  initWithCoder(coder: NSCoder): this;

  loadRequest(request: NSURLRequest): WKNavigation;

  loadFileURLAllowingReadAccessToURL(URL: NSURL, readAccessURL: NSURL): WKNavigation;

  loadHTMLStringBaseURL(string: string, baseURL: NSURL | null): WKNavigation;

  loadDataMIMETypeCharacterEncodingNameBaseURL(data: NSData, MIMEType: string, characterEncodingName: string, baseURL: NSURL): WKNavigation;

  goToBackForwardListItem(item: WKBackForwardListItem): WKNavigation;

  readonly title: string;

  readonly URL: NSURL;

  readonly loading: boolean;

  readonly estimatedProgress: number;

  readonly hasOnlySecureContent: boolean;

  readonly serverTrust: interop.Object;

  readonly canGoBack: boolean;

  readonly canGoForward: boolean;

  goBack(): WKNavigation;

  goForward(): WKNavigation;

  reload(): WKNavigation;

  reloadFromOrigin(): WKNavigation;

  stopLoading(): void;

  evaluateJavaScriptCompletionHandler(javaScriptString: string, completionHandler: (p1: interop.Object, p2: NSError) => void | null): void;

  evaluateJavaScriptInFrameInContentWorldCompletionHandler(javaScriptString: string, frame: WKFrameInfo | null, contentWorld: WKContentWorld, completionHandler: (p1: interop.Object, p2: NSError) => void | null): void;

  callAsyncJavaScriptArgumentsInFrameInContentWorldCompletionHandler(functionBody: string, arguments$: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, frame: WKFrameInfo | null, contentWorld: WKContentWorld, completionHandler: (p1: interop.Object, p2: NSError) => void | null): void;

  closeAllMediaPresentationsWithCompletionHandler(completionHandler: () => void | null): void;

  closeAllMediaPresentations(): void;

  pauseAllMediaPlaybackWithCompletionHandler(completionHandler: () => void | null): void;

  pauseAllMediaPlayback(completionHandler: () => void | null): void;

  setAllMediaPlaybackSuspendedCompletionHandler(suspended: boolean, completionHandler: () => void | null): void;

  resumeAllMediaPlayback(completionHandler: () => void | null): void;

  suspendAllMediaPlayback(completionHandler: () => void | null): void;

  requestMediaPlaybackStateWithCompletionHandler(completionHandler: (p1: interop.Enum<typeof WKMediaPlaybackState>) => void): void;

  requestMediaPlaybackState(completionHandler: (p1: interop.Enum<typeof WKMediaPlaybackState>) => void): void;

  readonly cameraCaptureState: interop.Enum<typeof WKMediaCaptureState>;

  readonly microphoneCaptureState: interop.Enum<typeof WKMediaCaptureState>;

  setCameraCaptureStateCompletionHandler(state: interop.Enum<typeof WKMediaCaptureState>, completionHandler: () => void | null): void;

  setMicrophoneCaptureStateCompletionHandler(state: interop.Enum<typeof WKMediaCaptureState>, completionHandler: () => void | null): void;

  takeSnapshotWithConfigurationCompletionHandler(snapshotConfiguration: WKSnapshotConfiguration | null, completionHandler: (p1: NSImage, p2: NSError) => void | null): void;

  createPDFWithConfigurationCompletionHandler(pdfConfiguration: WKPDFConfiguration | null, completionHandler: (p1: NSData, p2: NSError) => void | null): void;

  createWebArchiveDataWithCompletionHandler(completionHandler: (p1: NSData, p2: NSError) => void | null): void;

  allowsBackForwardNavigationGestures: boolean;

  customUserAgent: string;

  allowsLinkPreview: boolean;

  allowsMagnification: boolean;

  magnification: number;

  setMagnificationCenteredAtPoint(magnification: number, point: CGPoint): void;

  pageZoom: number;

  findStringWithConfigurationCompletionHandler(string: string, configuration: WKFindConfiguration | null, completionHandler: (p1: WKFindResult) => void): void;

  static handlesURLScheme(urlScheme: string): boolean;

  startDownloadUsingRequestCompletionHandler(request: NSURLRequest, completionHandler: (p1: WKDownload) => void): void;

  resumeDownloadFromResumeDataCompletionHandler(resumeData: NSData, completionHandler: (p1: WKDownload) => void): void;

  mediaType: string;

  interactionState: interop.Object;

  loadSimulatedRequestResponseResponseData(request: NSURLRequest, response: NSURLResponse, data: NSData): WKNavigation;

  loadSimulatedRequestWithResponseResponseData(request: NSURLRequest, response: NSURLResponse, data: NSData): WKNavigation;

  loadFileRequestAllowingReadAccessToURL(request: NSURLRequest, readAccessURL: NSURL): WKNavigation;

  loadSimulatedRequestResponseHTMLString(request: NSURLRequest, string: string): WKNavigation;

  loadSimulatedRequestWithResponseHTMLString(request: NSURLRequest, string: string): WKNavigation;

  printOperationWithPrintInfo(printInfo: NSPrintInfo): NSPrintOperation;

  readonly themeColor: NSColor;

  underPageBackgroundColor: NSColor;

  readonly fullscreenState: interop.Enum<typeof WKFullscreenState>;

  readonly minimumViewportInset: NSEdgeInsets;

  readonly maximumViewportInset: NSEdgeInsets;

  setMinimumViewportInsetMaximumViewportInset(minimumViewportInset: NSEdgeInsets, maximumViewportInset: NSEdgeInsets): void;

  inspectable: boolean;

  readonly writingToolsActive: boolean;

  setNavigationDelegate(navigationDelegate: WKNavigationDelegate | null): void;

  setUIDelegate(UIDelegate: WKUIDelegate | null): void;

  isLoading(): boolean;

  setAllowsBackForwardNavigationGestures(allowsBackForwardNavigationGestures: boolean): void;

  setCustomUserAgent(customUserAgent: string | null): void;

  setAllowsLinkPreview(allowsLinkPreview: boolean): void;

  setAllowsMagnification(allowsMagnification: boolean): void;

  setMagnification(magnification: number): void;

  setPageZoom(pageZoom: number): void;

  setMediaType(mediaType: string | null): void;

  setInteractionState(interactionState: interop.Object | null): void;

  setUnderPageBackgroundColor(underPageBackgroundColor: NSColor | null): void;

  isInspectable(): boolean;

  setInspectable(inspectable: boolean): void;

  isWritingToolsActive(): boolean;

  readonly certificateChain: NSArray;
}

declare class WKContentRuleListStore extends NSObject {
  static defaultStore<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  static storeWithURL<This extends abstract new (...args: any) => any>(this: This, url: NSURL): InstanceType<This>;

  compileContentRuleListForIdentifierEncodedContentRuleListCompletionHandler(identifier: string, encodedContentRuleList: string, completionHandler: (p1: WKContentRuleList, p2: NSError) => void): void;

  lookUpContentRuleListForIdentifierCompletionHandler(identifier: string, completionHandler: (p1: WKContentRuleList, p2: NSError) => void): void;

  removeContentRuleListForIdentifierCompletionHandler(identifier: string, completionHandler: (p1: NSError) => void): void;

  getAvailableContentRuleListIdentifiers(completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>) => void): void;
}

declare class WKBackForwardList extends NSObject {
  readonly currentItem: WKBackForwardListItem;

  readonly backItem: WKBackForwardListItem;

  readonly forwardItem: WKBackForwardListItem;

  itemAtIndex(index: number): WKBackForwardListItem;

  readonly backList: NSArray;

  readonly forwardList: NSArray;
}

declare class DOMHTMLTableCellElement extends DOMHTMLElement {
  readonly cellIndex: number;

  align: string;

  axis: string;

  bgColor: string;

  ch: string;

  chOff: string;

  colSpan: number;

  rowSpan: number;

  headers: string;

  height: string;

  noWrap: boolean;

  vAlign: string;

  width: string;

  abbr: string;

  scope: string;

  setAlign(align: string): void;

  setAxis(axis: string): void;

  setBgColor(bgColor: string): void;

  setCh(ch: string): void;

  setChOff(chOff: string): void;

  setColSpan(colSpan: number): void;

  setRowSpan(rowSpan: number): void;

  setHeaders(headers: string): void;

  setHeight(height: string): void;

  setNoWrap(noWrap: boolean): void;

  setVAlign(vAlign: string): void;

  setWidth(width: string): void;

  setAbbr(abbr: string): void;

  setScope(scope: string): void;
}

declare class DOMHTMLMarqueeElement extends DOMHTMLElement {
  start(): void;

  stop(): void;
}

declare class WebResource extends NSObject implements NSCoding, NSCopying {
  initWithDataURLMIMETypeTextEncodingNameFrameName(data: NSData, URL: NSURL, MIMEType: string, textEncodingName: string, frameName: string): this;

  readonly data: NSData;

  readonly URL: NSURL;

  readonly MIMEType: string;

  readonly textEncodingName: string;

  readonly frameName: string;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class DOMHTMLPreElement extends DOMHTMLElement {
  width: number;

  wrap: boolean;

  setWidth(width: number): void;

  setWrap(wrap: boolean): void;
}

declare class DOMHTMLEmbedElement extends DOMHTMLElement {
  align: string;

  height: number;

  name: string;

  src: string;

  type: string;

  width: number;

  setAlign(align: string): void;

  setHeight(height: number): void;

  setName(name: string): void;

  setSrc(src: string): void;

  setType(type: string): void;

  setWidth(width: number): void;
}

declare class DOMHTMLHtmlElement extends DOMHTMLElement {
  version: string;

  setVersion(version: string): void;
}

declare class DOMHTMLTableRowElement extends DOMHTMLElement {
  readonly rowIndex: number;

  readonly sectionRowIndex: number;

  readonly cells: DOMHTMLCollection;

  align: string;

  bgColor: string;

  ch: string;

  chOff: string;

  vAlign: string;

  insertCell(index: number): DOMHTMLElement;

  deleteCell(index: number): void;

  setAlign(align: string): void;

  setBgColor(bgColor: string): void;

  setCh(ch: string): void;

  setChOff(chOff: string): void;

  setVAlign(vAlign: string): void;
}

declare class DOMHTMLTableSectionElement extends DOMHTMLElement {
  align: string;

  ch: string;

  chOff: string;

  vAlign: string;

  readonly rows: DOMHTMLCollection;

  insertRow(index: number): DOMHTMLElement;

  deleteRow(index: number): void;

  setAlign(align: string): void;

  setCh(ch: string): void;

  setChOff(chOff: string): void;

  setVAlign(vAlign: string): void;
}

declare class WKWebExtension extends NSObject {
  static extensionWithAppExtensionBundleCompletionHandler(appExtensionBundle: NSBundle, completionHandler: (p1: WKWebExtension, p2: NSError) => void | null): void;

  static extensionWithResourceBaseURLCompletionHandler(resourceBaseURL: NSURL, completionHandler: (p1: WKWebExtension, p2: NSError) => void | null): void;

  readonly errors: NSArray;

  readonly manifest: NSDictionary;

  readonly manifestVersion: number;

  supportsManifestVersion(manifestVersion: number): boolean;

  readonly defaultLocale: NSLocale;

  readonly displayName: string;

  readonly displayShortName: string;

  readonly displayVersion: string;

  readonly displayDescription: string;

  readonly displayActionLabel: string;

  readonly version: string;

  iconForSize(size: CGSize): NSImage;

  actionIconForSize(size: CGSize): NSImage;

  readonly requestedPermissions: NSSet;

  readonly optionalPermissions: NSSet;

  readonly requestedPermissionMatchPatterns: NSSet;

  readonly optionalPermissionMatchPatterns: NSSet;

  readonly allRequestedMatchPatterns: NSSet;

  readonly hasBackgroundContent: boolean;

  readonly hasPersistentBackgroundContent: boolean;

  readonly hasInjectedContent: boolean;

  readonly hasOptionsPage: boolean;

  readonly hasOverrideNewTabPage: boolean;

  readonly hasCommands: boolean;

  readonly hasContentModificationRules: boolean;
}

declare class DOMHTMLHeadingElement extends DOMHTMLElement {
  align: string;

  setAlign(align: string): void;
}

declare class DOMHTMLMenuElement extends DOMHTMLElement {
  compact: boolean;

  setCompact(compact: boolean): void;
}

declare class DOMHTMLDListElement extends DOMHTMLElement {
  compact: boolean;

  setCompact(compact: boolean): void;
}

declare class DOMHTMLLabelElement extends DOMHTMLElement {
  readonly form: DOMHTMLFormElement;

  htmlFor: string;

  accessKey: string;

  setHtmlFor(htmlFor: string): void;

  setAccessKey(accessKey: string): void;
}

declare class DOMHTMLDivElement extends DOMHTMLElement {
  align: string;

  setAlign(align: string): void;
}

declare class DOMRect extends DOMObject {
  readonly top: DOMCSSPrimitiveValue;

  readonly right: DOMCSSPrimitiveValue;

  readonly bottom: DOMCSSPrimitiveValue;

  readonly left: DOMCSSPrimitiveValue;
}

declare class DOMHTMLCollection extends DOMObject {
  readonly length: number;

  item(index: number): DOMNode;

  namedItem(name: string): DOMNode;

  tags(name: string): DOMNodeList;
}

declare class WebBackForwardList extends NSObject {
  addItem(item: WebHistoryItem): void;

  goBack(): void;

  goForward(): void;

  goToItem(item: WebHistoryItem): void;

  readonly backItem: WebHistoryItem;

  readonly currentItem: WebHistoryItem;

  readonly forwardItem: WebHistoryItem;

  backListWithLimit(limit: number): NSArray;

  forwardListWithLimit(limit: number): NSArray;

  capacity: number;

  readonly backListCount: number;

  readonly forwardListCount: number;

  containsItem(item: WebHistoryItem): boolean;

  itemAtIndex(index: number): WebHistoryItem;

  setCapacity(capacity: number): void;

  setPageCacheSize(size: number): void;

  pageCacheSize(): number;
}

declare class DOMCharacterData extends DOMNode {
  data: string;

  readonly length: number;

  substringDataLength(offset: number, length: number): string;

  appendData(data: string): void;

  insertDataData(offset: number, data: string): void;

  deleteDataLength(offset: number, length: number): void;

  replaceDataLengthData(offset: number, length: number, data: string): void;

  setData(data: string): void;

  substringData(offset: number, length: number): string;

  insertData(offset: number, data: string): void;

  deleteData(offset: number, length: number): void;

  replaceData(offset: number, length: number, data: string): void;
}

declare class WKFindResult extends NSObject implements NSCopying {
  readonly matchFound: boolean;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class WebDataSource extends NSObject {
  initWithRequest(request: NSURLRequest): this;

  readonly data: NSData;

  readonly representation: WebDocumentRepresentation;

  readonly webFrame: WebFrame;

  readonly initialRequest: NSURLRequest;

  readonly request: NSMutableURLRequest;

  readonly response: NSURLResponse;

  readonly textEncodingName: string;

  readonly loading: boolean;

  readonly pageTitle: string;

  readonly unreachableURL: NSURL;

  readonly webArchive: WebArchive;

  readonly mainResource: WebResource;

  readonly subresources: NSArray;

  subresourceForURL(URL: NSURL): WebResource;

  addSubresource(subresource: WebResource): void;

  isLoading(): boolean;
}

declare class DOMHTMLFieldSetElement extends DOMHTMLElement {
  readonly form: DOMHTMLFormElement;
}

declare class DOMMouseEvent extends DOMUIEvent {
  readonly screenX: number;

  readonly screenY: number;

  readonly clientX: number;

  readonly clientY: number;

  readonly ctrlKey: boolean;

  readonly shiftKey: boolean;

  readonly altKey: boolean;

  readonly metaKey: boolean;

  readonly button: number;

  readonly relatedTarget: DOMEventTarget;

  readonly offsetX: number;

  readonly offsetY: number;

  readonly x: number;

  readonly y: number;

  readonly fromElement: DOMNode;

  readonly toElement: DOMNode;

  initMouseEventCanBubbleCancelableViewDetailScreenXScreenYClientXClientYCtrlKeyAltKeyShiftKeyMetaKeyButtonRelatedTarget(type: string, canBubble: boolean, cancelable: boolean, view: DOMAbstractView, detail: number, screenX: number, screenY: number, clientX: number, clientY: number, ctrlKey: boolean, altKey: boolean, shiftKey: boolean, metaKey: boolean, button: number, relatedTarget: DOMEventTarget): this;

  initMouseEvent(type: string, canBubble: boolean, cancelable: boolean, view: DOMAbstractView, detail: number, screenX: number, screenY: number, clientX: number, clientY: number, ctrlKey: boolean, altKey: boolean, shiftKey: boolean, metaKey: boolean, button: number, relatedTarget: DOMEventTarget): this;
}

declare class DOMWheelEvent extends DOMMouseEvent {
  readonly wheelDeltaX: number;

  readonly wheelDeltaY: number;

  readonly wheelDelta: number;

  readonly isHorizontal: boolean;

  initWheelEventWheelDeltaYViewScreenXScreenYClientXClientYCtrlKeyAltKeyShiftKeyMetaKey(wheelDeltaX: number, wheelDeltaY: number, view: DOMAbstractView, screenX: number, screenY: number, clientX: number, clientY: number, ctrlKey: boolean, altKey: boolean, shiftKey: boolean, metaKey: boolean): this;
}

declare class DOMMutationEvent extends DOMEvent {
  readonly relatedNode: DOMNode;

  readonly prevValue: string;

  readonly newValue: string;

  readonly attrName: string;

  readonly attrChange: number;

  initMutationEventCanBubbleCancelableRelatedNodePrevValueNewValueAttrNameAttrChange(type: string, canBubble: boolean, cancelable: boolean, relatedNode: DOMNode, prevValue: string, newValue: string, attrName: string, attrChange: number): this;

  initMutationEvent(type: string, canBubble: boolean, cancelable: boolean, relatedNode: DOMNode, prevValue: string, newValue: string, attrName: string, attrChange: number): this;
}

declare class DOMHTMLParamElement extends DOMHTMLElement {
  name: string;

  type: string;

  value: string;

  valueType: string;

  setName(name: string): void;

  setType(type: string): void;

  setValue(value: string): void;

  setValueType(valueType: string): void;
}

declare class DOMHTMLHRElement extends DOMHTMLElement {
  align: string;

  noShade: boolean;

  size: string;

  width: string;

  setAlign(align: string): void;

  setNoShade(noShade: boolean): void;

  setSize(size: string): void;

  setWidth(width: string): void;
}

declare class WKDownload extends NSObject implements NSProgressReporting {
  readonly originalRequest: NSURLRequest;

  readonly webView: WKWebView | null;

  delegate: WKDownloadDelegate | null;

  readonly userInitiated: boolean;

  readonly originatingFrame: WKFrameInfo;

  cancel(completionHandler: (p1: NSData) => void | null): void;

  setDelegate(delegate: WKDownloadDelegate | null): void;

  isUserInitiated(): boolean;

  readonly progress: NSProgress;

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

declare class WKWebsiteDataStore extends NSObject implements NSSecureCoding {
  static defaultDataStore(): WKWebsiteDataStore;

  static nonPersistentDataStore(): WKWebsiteDataStore;

  readonly persistent: boolean;

  static allWebsiteDataTypes(): NSSet;

  fetchDataRecordsOfTypesCompletionHandler(dataTypes: NSSet, completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>) => void): void;

  removeDataOfTypesForDataRecordsCompletionHandler(dataTypes: NSSet, dataRecords: NSArray<interop.Object> | Array<interop.Object>, completionHandler: () => void): void;

  removeDataOfTypesModifiedSinceCompletionHandler(dataTypes: NSSet, date: NSDate, completionHandler: () => void): void;

  readonly httpCookieStore: WKHTTPCookieStore;

  readonly identifier: NSUUID;

  static dataStoreForIdentifier(identifier: NSUUID): WKWebsiteDataStore;

  static removeDataStoreForIdentifierCompletionHandler(identifier: NSUUID, completionHandler: (p1: NSError) => void | null): void;

  static fetchAllDataStoreIdentifiers(completionHandler: (p1: NSArray<interop.Object> | Array<interop.Object>) => void): void;

  get proxyConfigurations(): NSArray;
  set proxyConfigurations(value: NSArray<interop.Object> | Array<interop.Object>);

  isPersistent(): boolean;

  setProxyConfigurations(proxyConfigurations: NSArray<interop.Object> | Array<interop.Object>): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class DOMHTMLDirectoryElement extends DOMHTMLElement {
  compact: boolean;

  setCompact(compact: boolean): void;
}

declare class DOMCSSRule extends DOMObject {
  readonly type: number;

  cssText: string;

  readonly parentStyleSheet: DOMCSSStyleSheet;

  readonly parentRule: DOMCSSRule;

  setCssText(cssText: string): void;
}

declare class DOMHTMLDocument extends DOMDocument {
  readonly embeds: DOMHTMLCollection;

  readonly plugins: DOMHTMLCollection;

  readonly scripts: DOMHTMLCollection;

  readonly width: number;

  readonly height: number;

  dir: string;

  designMode: string;

  readonly compatMode: string;

  bgColor: string;

  fgColor: string;

  alinkColor: string;

  linkColor: string;

  vlinkColor: string;

  open(): void;

  close(): void;

  write(text: string): void;

  writeln(text: string): void;

  clear(): void;

  captureEvents(): void;

  releaseEvents(): void;

  setDir(dir: string): void;

  setDesignMode(designMode: string): void;

  setBgColor(bgColor: string): void;

  setFgColor(fgColor: string): void;

  setAlinkColor(alinkColor: string): void;

  setLinkColor(linkColor: string): void;

  setVlinkColor(vlinkColor: string): void;

  createDocumentFragmentWithMarkupStringBaseURL(markupString: string, baseURL: NSURL): DOMDocumentFragment;

  createDocumentFragmentWithText(text: string): DOMDocumentFragment;
}

declare class DOMHTMLLIElement extends DOMHTMLElement {
  type: string;

  value: number;

  setType(type: string): void;

  setValue(value: number): void;
}

declare class DOMProcessingInstruction extends DOMCharacterData {
  readonly target: string;

  readonly sheet: DOMStyleSheet;
}

declare class DOMCSSPrimitiveValue extends DOMCSSValue {
  readonly primitiveType: number;

  setFloatValueFloatValue(unitType: number, floatValue: number): void;

  getFloatValue(unitType: number): number;

  setStringValueStringValue(stringType: number, stringValue: string): void;

  getStringValue(): string;

  getCounterValue(): DOMCounter;

  getRectValue(): DOMRect;

  getRGBColorValue(): DOMRGBColor;

  setFloatValue(unitType: number, floatValue: number): void;

  setStringValue(stringType: number, stringValue: string): void;
}

declare class DOMHTMLOptGroupElement extends DOMHTMLElement {
  disabled: boolean;

  label: string;

  setDisabled(disabled: boolean): void;

  setLabel(label: string): void;
}

declare class WKWebExtensionAction extends NSObject {
  readonly webExtensionContext: WKWebExtensionContext | null;

  readonly associatedTab: WKWebExtensionTab;

  iconForSize(size: CGSize): NSImage;

  readonly label: string;

  readonly badgeText: string;

  hasUnreadBadgeText: boolean;

  inspectionName: string;

  readonly enabled: boolean;

  readonly menuItems: NSArray;

  readonly presentsPopup: boolean;

  readonly popupPopover: NSPopover;

  readonly popupWebView: WKWebView;

  closePopup(): void;

  setHasUnreadBadgeText(hasUnreadBadgeText: boolean): void;

  setInspectionName(inspectionName: string | null): void;

  isEnabled(): boolean;
}

declare class DOMHTMLBaseFontElement extends DOMHTMLElement {
  color: string;

  face: string;

  size: string;

  setColor(color: string): void;

  setFace(face: string): void;

  setSize(size: string): void;
}

declare class WKContentWorld extends NSObject {
  static readonly pageWorld: WKContentWorld;

  static readonly defaultClientWorld: WKContentWorld;

  static worldWithName(name: string): WKContentWorld;

  readonly name: string;
}

declare class DOMHTMLImageElement extends DOMHTMLElement {
  name: string;

  align: string;

  alt: string;

  border: string;

  height: number;

  hspace: number;

  isMap: boolean;

  longDesc: string;

  src: string;

  useMap: string;

  vspace: number;

  width: number;

  readonly complete: boolean;

  lowsrc: string;

  readonly naturalHeight: number;

  readonly naturalWidth: number;

  readonly x: number;

  readonly y: number;

  readonly altDisplayString: string;

  readonly absoluteImageURL: NSURL;

  setName(name: string): void;

  setAlign(align: string): void;

  setAlt(alt: string): void;

  setBorder(border: string): void;

  setHeight(height: number): void;

  setHspace(hspace: number): void;

  setIsMap(isMap: boolean): void;

  setLongDesc(longDesc: string): void;

  setSrc(src: string): void;

  setUseMap(useMap: string): void;

  setVspace(vspace: number): void;

  setWidth(width: number): void;

  setLowsrc(lowsrc: string): void;
}

// @ts-ignore ClassDecl.tsIgnore
declare class WebView extends NSView {
  static canShowMIMEType(MIMEType: string): boolean;

  static canShowMIMETypeAsHTML(MIMEType: string): boolean;

  static MIMETypesShownAsHTML(): NSArray;

  static setMIMETypesShownAsHTML(MIMETypes: NSArray<interop.Object> | Array<interop.Object>): void;

  static URLFromPasteboard(pasteboard: NSPasteboard): NSURL;

  static URLTitleFromPasteboard(pasteboard: NSPasteboard): string;

  static registerURLSchemeAsLocal(scheme: string): void;

  initWithFrameFrameNameGroupName(frame: CGRect, frameName: string, groupName: string): this;

  close(): void;

  shouldCloseWithWindow: boolean;

  UIDelegate: WebUIDelegate;

  resourceLoadDelegate: WebResourceLoadDelegate;

  downloadDelegate: WebDownloadDelegate;

  frameLoadDelegate: WebFrameLoadDelegate;

  policyDelegate: WebPolicyDelegate;

  readonly mainFrame: WebFrame;

  readonly selectedFrame: WebFrame;

  readonly backForwardList: WebBackForwardList;

  setMaintainsBackForwardList(flag: boolean): void;

  goBack(): boolean;

  goForward(): boolean;

  goToBackForwardItem(item: WebHistoryItem): boolean;

  textSizeMultiplier: number;

  applicationNameForUserAgent: string;

  customUserAgent: string;

  userAgentForURL(URL: NSURL): string;

  readonly supportsTextEncoding: boolean;

  customTextEncodingName: string;

  mediaStyle: string;

  stringByEvaluatingJavaScriptFromString(script: string): string;

  readonly windowScriptObject: WebScriptObject;

  preferences: WebPreferences;

  preferencesIdentifier: string;

  hostWindow: NSWindow;

  searchForDirectionCaseSensitiveWrap(string: string, forward: boolean, caseFlag: boolean, wrapFlag: boolean): boolean;

  static registerViewClassRepresentationClassForMIMEType(viewClass: interop.Object, representationClass: interop.Object, MIMEType: string): void;

  groupName: string;

  readonly estimatedProgress: number;

  readonly loading: boolean;

  elementAtPoint(point: CGPoint): NSDictionary;

  readonly pasteboardTypesForSelection: NSArray;

  writeSelectionWithPasteboardTypesToPasteboard(types: NSArray<interop.Object> | Array<interop.Object>, pasteboard: NSPasteboard): void;

  pasteboardTypesForElement(element: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): NSArray;

  writeElementWithPasteboardTypesToPasteboard(element: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, types: NSArray<interop.Object> | Array<interop.Object>, pasteboard: NSPasteboard): void;

  moveDragCaretToPoint(point: CGPoint): void;

  removeDragCaret(): void;

  drawsBackground: boolean;

  shouldUpdateWhileOffscreen: boolean;

  mainFrameURL: string;

  readonly mainFrameDocument: DOMDocument;

  readonly mainFrameTitle: string;

  readonly mainFrameIcon: NSImage;

  setShouldCloseWithWindow(shouldCloseWithWindow: boolean): void;

  setUIDelegate(UIDelegate: WebUIDelegate): void;

  setResourceLoadDelegate(resourceLoadDelegate: WebResourceLoadDelegate): void;

  setDownloadDelegate(downloadDelegate: WebDownloadDelegate): void;

  setFrameLoadDelegate(frameLoadDelegate: WebFrameLoadDelegate): void;

  setPolicyDelegate(policyDelegate: WebPolicyDelegate): void;

  setTextSizeMultiplier(textSizeMultiplier: number): void;

  setApplicationNameForUserAgent(applicationNameForUserAgent: string): void;

  setCustomUserAgent(customUserAgent: string): void;

  setCustomTextEncodingName(customTextEncodingName: string): void;

  setMediaStyle(mediaStyle: string): void;

  setPreferences(preferences: WebPreferences): void;

  setPreferencesIdentifier(preferencesIdentifier: string): void;

  setHostWindow(hostWindow: NSWindow): void;

  setGroupName(groupName: string): void;

  isLoading(): boolean;

  setDrawsBackground(drawsBackground: boolean): void;

  setShouldUpdateWhileOffscreen(shouldUpdateWhileOffscreen: boolean): void;

  setMainFrameURL(mainFrameURL: string): void;

  takeStringURLFrom(sender: interop.Object): void;

  stopLoading(sender: interop.Object): void;

  reload(sender: interop.Object): void;

  reloadFromOrigin(sender: interop.Object): void;

  readonly canGoBack: boolean;

  readonly canGoForward: boolean;

  readonly canMakeTextLarger: boolean;

  makeTextLarger(sender: interop.Object): void;

  readonly canMakeTextSmaller: boolean;

  makeTextSmaller(sender: interop.Object): void;

  readonly canMakeTextStandardSize: boolean;

  makeTextStandardSize(sender: interop.Object): void;

  toggleContinuousSpellChecking(sender: interop.Object): void;

  toggleSmartInsertDelete(sender: interop.Object): void;

  computedStyleForElementPseudoElement(element: DOMElement, pseudoElement: string): DOMCSSStyleDeclaration;

  editableDOMRangeForPoint(point: CGPoint): DOMRange;

  setSelectedDOMRangeAffinity(range: DOMRange, selectionAffinity: interop.Enum<typeof NSSelectionAffinity>): void;

  readonly selectedDOMRange: DOMRange;

  readonly selectionAffinity: interop.Enum<typeof NSSelectionAffinity>;

  readonly maintainsInactiveSelection: boolean;

  editable: boolean;

  typingStyle: DOMCSSStyleDeclaration;

  smartInsertDeleteEnabled: boolean;

  continuousSpellCheckingEnabled: boolean;

  readonly spellCheckerDocumentTag: number;

  readonly undoManager: NSUndoManager;

  editingDelegate: WebEditingDelegate;

  styleDeclarationWithText(text: string): DOMCSSStyleDeclaration;

  isEditable(): boolean;

  setEditable(editable: boolean): void;

  setTypingStyle(typingStyle: DOMCSSStyleDeclaration): void;

  setSmartInsertDeleteEnabled(smartInsertDeleteEnabled: boolean): void;

  isContinuousSpellCheckingEnabled(): boolean;

  setContinuousSpellCheckingEnabled(continuousSpellCheckingEnabled: boolean): void;

  setEditingDelegate(editingDelegate: WebEditingDelegate): void;

  replaceSelectionWithNode(node: DOMNode): void;

  replaceSelectionWithText(text: string): void;

  replaceSelectionWithMarkupString(markupString: string): void;

  replaceSelectionWithArchive(archive: WebArchive): void;

  deleteSelection(): void;

  applyStyle(style: DOMCSSStyleDeclaration): void;

  // @ts-ignore MemberDecl.tsIgnore
  copy(sender: interop.Object): void;

  cut(sender: interop.Object): void;

  paste(sender: interop.Object): void;

  copyFont(sender: interop.Object): void;

  pasteFont(sender: interop.Object): void;

  delete(sender: interop.Object): void;

  pasteAsPlainText(sender: interop.Object): void;

  pasteAsRichText(sender: interop.Object): void;

  // @ts-ignore MemberDecl.tsIgnore
  changeFont(sender: interop.Object): void;

  changeAttributes(sender: interop.Object): void;

  changeDocumentBackgroundColor(sender: interop.Object): void;

  // @ts-ignore MemberDecl.tsIgnore
  changeColor(sender: interop.Object): void;

  alignCenter(sender: interop.Object): void;

  alignJustified(sender: interop.Object): void;

  alignLeft(sender: interop.Object): void;

  alignRight(sender: interop.Object): void;

  checkSpelling(sender: interop.Object): void;

  showGuessPanel(sender: interop.Object): void;

  performFindPanelAction(sender: interop.Object): void;

  startSpeaking(sender: interop.Object): void;

  stopSpeaking(sender: interop.Object): void;

  moveToBeginningOfSentence(sender: interop.Object): void;

  moveToBeginningOfSentenceAndModifySelection(sender: interop.Object): void;

  moveToEndOfSentence(sender: interop.Object): void;

  moveToEndOfSentenceAndModifySelection(sender: interop.Object): void;

  selectSentence(sender: interop.Object): void;

  overWrite(sender: interop.Object): void;
}

declare class DOMHTMLAnchorElement extends DOMHTMLElement {
  charset: string;

  coords: string;

  hreflang: string;

  name: string;

  rel: string;

  rev: string;

  shape: string;

  target: string;

  type: string;

  accessKey: string;

  readonly text: string;

  readonly absoluteLinkURL: NSURL;

  href: string;

  readonly protocol: string;

  readonly host: string;

  readonly hostname: string;

  readonly port: string;

  readonly pathname: string;

  readonly search: string;

  readonly hashName: string;

  setCharset(charset: string): void;

  setCoords(coords: string): void;

  setHreflang(hreflang: string): void;

  setName(name: string): void;

  setRel(rel: string): void;

  setRev(rev: string): void;

  setShape(shape: string): void;

  setTarget(target: string): void;

  setType(type: string): void;

  setAccessKey(accessKey: string): void;

  setHref(href: string): void;
}

declare class DOMNamedNodeMap extends DOMObject {
  readonly length: number;

  getNamedItem(name: string): DOMNode;

  setNamedItem(node: DOMNode): DOMNode;

  removeNamedItem(name: string): DOMNode;

  item(index: number): DOMNode;

  getNamedItemNSLocalName(namespaceURI: string, localName: string): DOMNode;

  setNamedItemNS(node: DOMNode): DOMNode;

  removeNamedItemNSLocalName(namespaceURI: string, localName: string): DOMNode;

  getNamedItemNS(namespaceURI: string, localName: string): DOMNode;

  removeNamedItemNS(namespaceURI: string, localName: string): DOMNode;
}

declare class DOMRange extends DOMObject {
  readonly startContainer: DOMNode;

  readonly startOffset: number;

  readonly endContainer: DOMNode;

  readonly endOffset: number;

  readonly collapsed: boolean;

  readonly commonAncestorContainer: DOMNode;

  readonly text: string;

  setStartOffset(refNode: DOMNode, offset: number): void;

  setEndOffset(refNode: DOMNode, offset: number): void;

  setStartBefore(refNode: DOMNode): void;

  setStartAfter(refNode: DOMNode): void;

  setEndBefore(refNode: DOMNode): void;

  setEndAfter(refNode: DOMNode): void;

  collapse(toStart: boolean): void;

  selectNode(refNode: DOMNode): void;

  selectNodeContents(refNode: DOMNode): void;

  compareBoundaryPointsSourceRange(how: number, sourceRange: DOMRange): number;

  deleteContents(): void;

  extractContents(): DOMDocumentFragment;

  cloneContents(): DOMDocumentFragment;

  insertNode(newNode: DOMNode): void;

  surroundContents(newParent: DOMNode): void;

  cloneRange(): DOMRange;

  toString(): string;

  detach(): void;

  createContextualFragment(html: string): DOMDocumentFragment;

  compareNode(refNode: DOMNode): number;

  intersectsNode(refNode: DOMNode): boolean;

  comparePointOffset(refNode: DOMNode, offset: number): number;

  isPointInRangeOffset(refNode: DOMNode, offset: number): boolean;

  setStart(refNode: DOMNode, offset: number): void;

  setEnd(refNode: DOMNode, offset: number): void;

  compareBoundaryPoints(how: number, sourceRange: DOMRange): number;

  readonly webArchive: WebArchive;

  readonly markupString: string;
}

declare class WebArchive extends NSObject implements NSCoding, NSCopying {
  initWithMainResourceSubresourcesSubframeArchives(mainResource: WebResource, subresources: NSArray<interop.Object> | Array<interop.Object>, subframeArchives: NSArray<interop.Object> | Array<interop.Object>): this;

  initWithData(data: NSData): this;

  readonly mainResource: WebResource;

  readonly subresources: NSArray;

  readonly subframeArchives: NSArray;

  readonly data: NSData;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class DOMHTMLTableColElement extends DOMHTMLElement {
  align: string;

  ch: string;

  chOff: string;

  span: number;

  vAlign: string;

  width: string;

  setAlign(align: string): void;

  setCh(ch: string): void;

  setChOff(chOff: string): void;

  setSpan(span: number): void;

  setVAlign(vAlign: string): void;

  setWidth(width: string): void;
}

declare class DOMMediaList extends DOMObject {
  mediaText: string;

  readonly length: number;

  item(index: number): string;

  deleteMedium(oldMedium: string): void;

  appendMedium(newMedium: string): void;

  setMediaText(mediaText: string): void;
}

declare class DOMHTMLSelectElement extends DOMHTMLElement {
  autofocus: boolean;

  disabled: boolean;

  readonly form: DOMHTMLFormElement;

  multiple: boolean;

  name: string;

  size: number;

  readonly type: string;

  readonly options: DOMHTMLOptionsCollection;

  readonly length: number;

  selectedIndex: number;

  value: string;

  readonly willValidate: boolean;

  item(index: number): DOMNode;

  namedItem(name: string): DOMNode;

  addBefore(element: DOMHTMLElement, before: DOMHTMLElement): void;

  remove(index: number): void;

  setAutofocus(autofocus: boolean): void;

  setDisabled(disabled: boolean): void;

  setMultiple(multiple: boolean): void;

  setName(name: string): void;

  setSize(size: number): void;

  setSelectedIndex(selectedIndex: number): void;

  setValue(value: string): void;

  add(element: DOMHTMLElement, before: DOMHTMLElement): void;
}

declare class WebHistory extends NSObject {
  static optionalSharedHistory(): WebHistory;

  static setOptionalSharedHistory(history: WebHistory): void;

  loadFromURLError(URL: NSURL, error: interop.PointerConvertible): boolean;

  saveToURLError(URL: NSURL, error: interop.PointerConvertible): boolean;

  addItems(newItems: NSArray<interop.Object> | Array<interop.Object>): void;

  removeItems(items: NSArray<interop.Object> | Array<interop.Object>): void;

  removeAllItems(): void;

  readonly orderedLastVisitedDays: NSArray;

  orderedItemsLastVisitedOnDay(calendarDate: NSCalendarDate): NSArray;

  itemForURL(URL: NSURL): WebHistoryItem;

  historyItemLimit: number;

  historyAgeInDaysLimit: number;

  setHistoryItemLimit(historyItemLimit: number): void;

  setHistoryAgeInDaysLimit(historyAgeInDaysLimit: number): void;
}

declare class WKNavigationAction extends NSObject {
  readonly sourceFrame: WKFrameInfo;

  readonly targetFrame: WKFrameInfo;

  readonly navigationType: interop.Enum<typeof WKNavigationType>;

  readonly request: NSURLRequest;

  readonly shouldPerformDownload: boolean;

  readonly modifierFlags: interop.Enum<typeof NSEventModifierFlags>;

  readonly buttonNumber: number;
}

declare class WebFrame extends NSObject {
  initWithNameWebFrameViewWebView(name: string, view: WebFrameView, webView: WebView): this;

  readonly name: string;

  readonly webView: WebView;

  readonly frameView: WebFrameView;

  readonly DOMDocument: DOMDocument;

  readonly frameElement: DOMHTMLElement;

  loadRequest(request: NSURLRequest): void;

  loadDataMIMETypeTextEncodingNameBaseURL(data: NSData, MIMEType: string, encodingName: string, URL: NSURL): void;

  loadHTMLStringBaseURL(string: string, URL: NSURL): void;

  loadAlternateHTMLStringBaseURLForUnreachableURL(string: string, baseURL: NSURL, unreachableURL: NSURL): void;

  loadArchive(archive: WebArchive): void;

  readonly dataSource: WebDataSource;

  readonly provisionalDataSource: WebDataSource;

  stopLoading(): void;

  reload(): void;

  reloadFromOrigin(): void;

  findFrameNamed(name: string): WebFrame;

  readonly parentFrame: WebFrame;

  readonly childFrames: NSArray;

  readonly windowObject: WebScriptObject;

  readonly globalContext: interop.Pointer;

  readonly javaScriptContext: JSContext;
}

declare class WKProcessPool extends NSObject implements NSSecureCoding {
  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class DOMHTMLIFrameElement extends DOMHTMLElement {
  align: string;

  frameBorder: string;

  height: string;

  longDesc: string;

  marginHeight: string;

  marginWidth: string;

  name: string;

  scrolling: string;

  src: string;

  width: string;

  readonly contentDocument: DOMDocument;

  readonly contentWindow: DOMAbstractView;

  setAlign(align: string): void;

  setFrameBorder(frameBorder: string): void;

  setHeight(height: string): void;

  setLongDesc(longDesc: string): void;

  setMarginHeight(marginHeight: string): void;

  setMarginWidth(marginWidth: string): void;

  setName(name: string): void;

  setScrolling(scrolling: string): void;

  setSrc(src: string): void;

  setWidth(width: string): void;

  readonly contentFrame: WebFrame;
}

declare class DOMHTMLLinkElement extends DOMHTMLElement {
  disabled: boolean;

  charset: string;

  href: string;

  hreflang: string;

  media: string;

  rel: string;

  rev: string;

  target: string;

  type: string;

  readonly sheet: DOMStyleSheet;

  readonly absoluteLinkURL: NSURL;

  setDisabled(disabled: boolean): void;

  setCharset(charset: string): void;

  setHref(href: string): void;

  setHreflang(hreflang: string): void;

  setMedia(media: string): void;

  setRel(rel: string): void;

  setRev(rev: string): void;

  setTarget(target: string): void;

  setType(type: string): void;
}

declare class DOMHTMLStyleElement extends DOMHTMLElement {
  disabled: boolean;

  media: string;

  type: string;

  readonly sheet: DOMStyleSheet;

  setDisabled(disabled: boolean): void;

  setMedia(media: string): void;

  setType(type: string): void;
}

declare class DOMXPathExpression extends DOMObject {
  evaluateTypeInResult(contextNode: DOMNode, type: number, inResult: DOMXPathResult): DOMXPathResult;

  evaluate(contextNode: DOMNode, type: number, inResult: DOMXPathResult): DOMXPathResult;
}

declare class WKFrameInfo extends NSObject implements NSCopying {
  readonly mainFrame: boolean;

  readonly request: NSURLRequest;

  readonly securityOrigin: WKSecurityOrigin;

  readonly webView: WKWebView | null;

  isMainFrame(): boolean;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class DOMStyleSheetList extends DOMObject {
  readonly length: number;

  item(index: number): DOMStyleSheet;
}

declare class DOMHTMLTableElement extends DOMHTMLElement {
  caption: DOMHTMLTableCaptionElement;

  tHead: DOMHTMLTableSectionElement;

  tFoot: DOMHTMLTableSectionElement;

  readonly rows: DOMHTMLCollection;

  readonly tBodies: DOMHTMLCollection;

  align: string;

  bgColor: string;

  border: string;

  cellPadding: string;

  cellSpacing: string;

  frameBorders: string;

  rules: string;

  summary: string;

  width: string;

  createTHead(): DOMHTMLElement;

  deleteTHead(): void;

  createTFoot(): DOMHTMLElement;

  deleteTFoot(): void;

  createCaption(): DOMHTMLElement;

  deleteCaption(): void;

  insertRow(index: number): DOMHTMLElement;

  deleteRow(index: number): void;

  setCaption(caption: DOMHTMLTableCaptionElement): void;

  setTHead(tHead: DOMHTMLTableSectionElement): void;

  setTFoot(tFoot: DOMHTMLTableSectionElement): void;

  setAlign(align: string): void;

  setBgColor(bgColor: string): void;

  setBorder(border: string): void;

  setCellPadding(cellPadding: string): void;

  setCellSpacing(cellSpacing: string): void;

  setFrameBorders(frameBorders: string): void;

  setRules(rules: string): void;

  setSummary(summary: string): void;

  setWidth(width: string): void;
}

declare class WKWebsiteDataRecord extends NSObject {
  readonly displayName: string;

  readonly dataTypes: NSSet;
}

declare class DOMHTMLUListElement extends DOMHTMLElement {
  compact: boolean;

  type: string;

  setCompact(compact: boolean): void;

  setType(type: string): void;
}

declare class DOMCSSPageRule extends DOMCSSRule {
  selectorText: string;

  readonly style: DOMCSSStyleDeclaration;

  setSelectorText(selectorText: string): void;
}

declare class DOMKeyboardEvent extends DOMUIEvent {
  readonly keyIdentifier: string;

  readonly location: number;

  readonly keyLocation: number;

  readonly ctrlKey: boolean;

  readonly shiftKey: boolean;

  readonly altKey: boolean;

  readonly metaKey: boolean;

  readonly altGraphKey: boolean;

  readonly keyCode: number;

  readonly charCode: number;

  getModifierState(keyIdentifierArg: string): boolean;

  initKeyboardEventCanBubbleCancelableViewKeyIdentifierLocationCtrlKeyAltKeyShiftKeyMetaKeyAltGraphKey(type: string, canBubble: boolean, cancelable: boolean, view: DOMAbstractView, keyIdentifier: string, location: number, ctrlKey: boolean, altKey: boolean, shiftKey: boolean, metaKey: boolean, altGraphKey: boolean): this;

  initKeyboardEventCanBubbleCancelableViewKeyIdentifierLocationCtrlKeyAltKeyShiftKeyMetaKey(type: string, canBubble: boolean, cancelable: boolean, view: DOMAbstractView, keyIdentifier: string, location: number, ctrlKey: boolean, altKey: boolean, shiftKey: boolean, metaKey: boolean): this;

  initKeyboardEventCanBubbleCancelableViewKeyIdentifierKeyLocationCtrlKeyAltKeyShiftKeyMetaKeyAltGraphKey(type: string, canBubble: boolean, cancelable: boolean, view: DOMAbstractView, keyIdentifier: string, keyLocation: number, ctrlKey: boolean, altKey: boolean, shiftKey: boolean, metaKey: boolean, altGraphKey: boolean): this;

  initKeyboardEventCanBubbleCancelableViewKeyIdentifierKeyLocationCtrlKeyAltKeyShiftKeyMetaKey(type: string, canBubble: boolean, cancelable: boolean, view: DOMAbstractView, keyIdentifier: string, keyLocation: number, ctrlKey: boolean, altKey: boolean, shiftKey: boolean, metaKey: boolean): this;
}

declare class DOMEntity extends DOMNode {
  readonly publicId: string;

  readonly systemId: string;

  readonly notationName: string;
}

declare class DOMHTMLButtonElement extends DOMHTMLElement {
  autofocus: boolean;

  disabled: boolean;

  readonly form: DOMHTMLFormElement;

  type: string;

  name: string;

  value: string;

  readonly willValidate: boolean;

  accessKey: string;

  click(): void;

  setAutofocus(autofocus: boolean): void;

  setDisabled(disabled: boolean): void;

  setType(type: string): void;

  setName(name: string): void;

  setValue(value: string): void;

  setAccessKey(accessKey: string): void;
}

declare class WKFindConfiguration extends NSObject implements NSCopying {
  backwards: boolean;

  caseSensitive: boolean;

  wraps: boolean;

  setBackwards(backwards: boolean): void;

  setCaseSensitive(caseSensitive: boolean): void;

  setWraps(wraps: boolean): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class WKWindowFeatures extends NSObject {
  readonly menuBarVisibility: NSNumber;

  readonly statusBarVisibility: NSNumber;

  readonly toolbarsVisibility: NSNumber;

  readonly allowsResizing: NSNumber;

  readonly x: NSNumber;

  readonly y: NSNumber;

  readonly width: NSNumber;

  readonly height: NSNumber;
}

declare class DOMObject extends WebScriptObject implements NSCopying {
  readonly sheet: DOMStyleSheet;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class DOMFileList extends DOMObject {
  readonly length: number;

  item(index: number): DOMFile;
}

declare class DOMCSSValue extends DOMObject {
  cssText: string;

  readonly cssValueType: number;

  setCssText(cssText: string): void;
}

declare class DOMHTMLHeadElement extends DOMHTMLElement {
  profile: string;

  setProfile(profile: string): void;
}

declare class DOMProgressEvent extends DOMEvent {
  readonly lengthComputable: boolean;

  readonly loaded: number;

  readonly total: number;
}

declare class WebPreferences extends NSObject implements NSCoding {
  static standardPreferences(): WebPreferences;

  initWithIdentifier(anIdentifier: string): this;

  readonly identifier: string;

  standardFontFamily: string;

  fixedFontFamily: string;

  serifFontFamily: string;

  sansSerifFontFamily: string;

  cursiveFontFamily: string;

  fantasyFontFamily: string;

  defaultFontSize: number;

  defaultFixedFontSize: number;

  minimumFontSize: number;

  minimumLogicalFontSize: number;

  defaultTextEncodingName: string;

  userStyleSheetEnabled: boolean;

  userStyleSheetLocation: NSURL;

  javaEnabled: boolean;

  javaScriptEnabled: boolean;

  javaScriptCanOpenWindowsAutomatically: boolean;

  plugInsEnabled: boolean;

  allowsAnimatedImages: boolean;

  allowsAnimatedImageLooping: boolean;

  loadsImagesAutomatically: boolean;

  autosaves: boolean;

  shouldPrintBackgrounds: boolean;

  privateBrowsingEnabled: boolean;

  tabsToLinks: boolean;

  usesPageCache: boolean;

  cacheModel: interop.Enum<typeof WebCacheModel>;

  suppressesIncrementalRendering: boolean;

  allowsAirPlayForMediaPlayback: boolean;

  setStandardFontFamily(standardFontFamily: string): void;

  setFixedFontFamily(fixedFontFamily: string): void;

  setSerifFontFamily(serifFontFamily: string): void;

  setSansSerifFontFamily(sansSerifFontFamily: string): void;

  setCursiveFontFamily(cursiveFontFamily: string): void;

  setFantasyFontFamily(fantasyFontFamily: string): void;

  setDefaultFontSize(defaultFontSize: number): void;

  setDefaultFixedFontSize(defaultFixedFontSize: number): void;

  setMinimumFontSize(minimumFontSize: number): void;

  setMinimumLogicalFontSize(minimumLogicalFontSize: number): void;

  setDefaultTextEncodingName(defaultTextEncodingName: string): void;

  setUserStyleSheetEnabled(userStyleSheetEnabled: boolean): void;

  setUserStyleSheetLocation(userStyleSheetLocation: NSURL): void;

  isJavaEnabled(): boolean;

  setJavaEnabled(javaEnabled: boolean): void;

  isJavaScriptEnabled(): boolean;

  setJavaScriptEnabled(javaScriptEnabled: boolean): void;

  setJavaScriptCanOpenWindowsAutomatically(javaScriptCanOpenWindowsAutomatically: boolean): void;

  arePlugInsEnabled(): boolean;

  setPlugInsEnabled(plugInsEnabled: boolean): void;

  setAllowsAnimatedImages(allowsAnimatedImages: boolean): void;

  setAllowsAnimatedImageLooping(allowsAnimatedImageLooping: boolean): void;

  setLoadsImagesAutomatically(loadsImagesAutomatically: boolean): void;

  setAutosaves(autosaves: boolean): void;

  setShouldPrintBackgrounds(shouldPrintBackgrounds: boolean): void;

  setPrivateBrowsingEnabled(privateBrowsingEnabled: boolean): void;

  setTabsToLinks(tabsToLinks: boolean): void;

  setUsesPageCache(usesPageCache: boolean): void;

  setCacheModel(cacheModel: interop.Enum<typeof WebCacheModel>): void;

  setSuppressesIncrementalRendering(suppressesIncrementalRendering: boolean): void;

  setAllowsAirPlayForMediaPlayback(allowsAirPlayForMediaPlayback: boolean): void;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class WKNavigation extends NSObject {
  readonly effectiveContentMode: interop.Enum<typeof WKContentMode>;
}

declare class WKContentRuleList extends NSObject {
  readonly identifier: string;
}

declare class DOMDocumentFragment extends DOMNode {
}

declare class DOMHTMLParagraphElement extends DOMHTMLElement {
  align: string;

  setAlign(align: string): void;
}

declare class DOMHTMLTableCaptionElement extends DOMHTMLElement {
  align: string;

  setAlign(align: string): void;
}

declare class WKWebExtensionCommand extends NSObject {
  readonly webExtensionContext: WKWebExtensionContext | null;

  readonly identifier: string;

  readonly title: string;

  activationKey: string;

  modifierFlags: interop.Enum<typeof NSEventModifierFlags>;

  readonly menuItem: NSMenuItem;

  setActivationKey(activationKey: string | null): void;

  setModifierFlags(modifierFlags: interop.Enum<typeof NSEventModifierFlags>): void;
}

declare class WKWebpagePreferences extends NSObject {
  preferredContentMode: interop.Enum<typeof WKContentMode>;

  allowsContentJavaScript: boolean;

  lockdownModeEnabled: boolean;

  preferredHTTPSNavigationPolicy: interop.Enum<typeof WKWebpagePreferencesUpgradeToHTTPSPolicy>;

  setPreferredContentMode(preferredContentMode: interop.Enum<typeof WKContentMode>): void;

  setAllowsContentJavaScript(allowsContentJavaScript: boolean): void;

  isLockdownModeEnabled(): boolean;

  setLockdownModeEnabled(lockdownModeEnabled: boolean): void;

  setPreferredHTTPSNavigationPolicy(preferredHTTPSNavigationPolicy: interop.Enum<typeof WKWebpagePreferencesUpgradeToHTTPSPolicy>): void;
}

// @ts-ignore ClassDecl.tsIgnore
declare class DOMElement extends DOMNode {
  readonly tagName: string;

  readonly style: DOMCSSStyleDeclaration;

  readonly offsetLeft: number;

  readonly offsetTop: number;

  readonly offsetWidth: number;

  readonly offsetHeight: number;

  readonly clientLeft: number;

  readonly clientTop: number;

  readonly clientWidth: number;

  readonly clientHeight: number;

  scrollLeft: number;

  scrollTop: number;

  readonly scrollWidth: number;

  readonly scrollHeight: number;

  readonly offsetParent: DOMElement;

  innerHTML: string;

  outerHTML: string;

  // @ts-ignore MemberDecl.tsIgnore
  className: string;

  readonly innerText: string;

  readonly previousElementSibling: DOMElement;

  readonly nextElementSibling: DOMElement;

  readonly firstElementChild: DOMElement;

  readonly lastElementChild: DOMElement;

  readonly childElementCount: number;

  getAttribute(name: string): string;

  setAttributeValue(name: string, value: string): void;

  removeAttribute(name: string): void;

  getAttributeNode(name: string): DOMAttr;

  setAttributeNode(newAttr: DOMAttr): DOMAttr;

  removeAttributeNode(oldAttr: DOMAttr): DOMAttr;

  getElementsByTagName(name: string): DOMNodeList;

  getAttributeNSLocalName(namespaceURI: string, localName: string): string;

  setAttributeNSQualifiedNameValue(namespaceURI: string, qualifiedName: string, value: string): void;

  removeAttributeNSLocalName(namespaceURI: string, localName: string): void;

  getElementsByTagNameNSLocalName(namespaceURI: string, localName: string): DOMNodeList;

  getAttributeNodeNSLocalName(namespaceURI: string, localName: string): DOMAttr;

  setAttributeNodeNS(newAttr: DOMAttr): DOMAttr;

  hasAttribute(name: string): boolean;

  hasAttributeNSLocalName(namespaceURI: string, localName: string): boolean;

  focus(): void;

  blur(): void;

  scrollIntoView(alignWithTop: boolean): void;

  scrollIntoViewIfNeeded(centerIfNeeded: boolean): void;

  getElementsByClassName(name: string): DOMNodeList;

  webkitRequestFullScreen(flags: number): void;

  querySelector(selectors: string): DOMElement;

  querySelectorAll(selectors: string): DOMNodeList;

  setScrollLeft(scrollLeft: number): void;

  setScrollTop(scrollTop: number): void;

  setInnerHTML(innerHTML: string): void;

  setOuterHTML(outerHTML: string): void;

  setClassName(className: string): void;

  setAttribute(name: string, value: string): void;

  getAttributeNS(namespaceURI: string, localName: string): string;

  setAttributeNS(namespaceURI: string, qualifiedName: string, value: string): void;

  removeAttributeNS(namespaceURI: string, localName: string): void;

  getElementsByTagNameNS(namespaceURI: string, localName: string): DOMNodeList;

  getAttributeNodeNS(namespaceURI: string, localName: string): DOMAttr;

  hasAttributeNS(namespaceURI: string, localName: string): boolean;

  scrollByLines(lines: number): void;

  scrollByPages(pages: number): void;

  image(): NSImage;
}

declare class DOMCSSCharsetRule extends DOMCSSRule {
  readonly encoding: string;
}

declare class DOMHTMLMapElement extends DOMHTMLElement {
  readonly areas: DOMHTMLCollection;

  name: string;

  setName(name: string): void;
}

declare class DOMHTMLBRElement extends DOMHTMLElement {
  clear: string;

  setClear(clear: string): void;
}

declare class DOMDocumentType extends DOMNode {
  readonly name: string;

  readonly entities: DOMNamedNodeMap;

  readonly notations: DOMNamedNodeMap;

  readonly publicId: string;

  readonly systemId: string;

  readonly internalSubset: string;
}

declare class WKScriptMessage extends NSObject {
  readonly body: interop.Object;

  readonly webView: WKWebView;

  readonly frameInfo: WKFrameInfo;

  readonly name: string;

  readonly world: WKContentWorld;
}

declare class DOMTreeWalker extends DOMObject {
  readonly root: DOMNode;

  readonly whatToShow: number;

  readonly filter: DOMNodeFilter;

  readonly expandEntityReferences: boolean;

  currentNode: DOMNode;

  parentNode(): DOMNode;

  firstChild(): DOMNode;

  lastChild(): DOMNode;

  previousSibling(): DOMNode;

  nextSibling(): DOMNode;

  previousNode(): DOMNode;

  nextNode(): DOMNode;

  setCurrentNode(currentNode: DOMNode): void;
}


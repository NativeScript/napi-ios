/// <reference types="@nativescript/objc-node-api" />

declare const WKDownloadPlaceholderPolicy: {
  Disable: 0,
  Enable: 1,
};

declare const WKWebpagePreferencesUpgradeToHTTPSPolicy: {
  KeepAsRequested: 0,
  AutomaticFallbackToHTTP: 1,
  UserMediatedFallbackToHTTP: 2,
  ErrorOnFailure: 3,
};

declare interface WKScriptMessageHandlerWithReply extends NSObject {
}

declare class WKScriptMessageHandlerWithReply extends NativeObject implements WKScriptMessageHandlerWithReply {
}

declare interface WKUIDelegate extends NSObject {
  webViewCreateWebViewWithConfigurationForNavigationActionWindowFeatures?(webView: interop.Object, configuration: interop.Object, navigationAction: interop.Object, windowFeatures: interop.Object): interop.Object;

  webViewRunJavaScriptAlertPanelWithMessageInitiatedByFrameCompletionHandler?(webView: interop.Object, message: string, frame: interop.Object, completionHandler: () => void): void;

  webViewRunJavaScriptConfirmPanelWithMessageInitiatedByFrameCompletionHandler?(webView: interop.Object, message: string, frame: interop.Object, completionHandler: (p1: boolean) => void): void;

  webViewRunJavaScriptTextInputPanelWithPromptDefaultTextInitiatedByFrameCompletionHandler?(webView: interop.Object, prompt: string, defaultText: string | null, frame: interop.Object, completionHandler: (p1: string) => void | null): void;
}

declare class WKUIDelegate extends NativeObject implements WKUIDelegate {
}

declare interface WKDownloadDelegate extends NSObject {
  downloadDecideDestinationUsingResponseSuggestedFilenameCompletionHandler(download: interop.Object, response: interop.Object, suggestedFilename: string, completionHandler: (p1: NSURL) => void | null): void;

  downloadWillPerformHTTPRedirectionNewRequestDecisionHandler?(download: interop.Object, response: interop.Object, request: interop.Object, decisionHandler: (p1: interop.Enum<typeof WKDownloadRedirectPolicy>) => void): void;

  downloadDidReceiveAuthenticationChallengeCompletionHandler?(download: interop.Object, challenge: interop.Object, completionHandler: (p1: interop.Enum<typeof NSURLSessionAuthChallengeDisposition>, p2: interop.Object) => void | null): void;

  downloadDidFinish?(download: interop.Object): void;

  downloadDidFailWithErrorResumeData?(download: interop.Object, error: NSError, resumeData: NSData | null): void;

  downloadDecidePlaceholderPolicy?(download: interop.Object, completionHandler: (p1: interop.Enum<typeof WKDownloadPlaceholderPolicy>, p2: NSURL) => void | null): void;

  downloadDidReceivePlaceholderURLCompletionHandler?(download: interop.Object, url: NSURL, completionHandler: () => void): void;

  downloadDidReceiveFinalURL?(download: interop.Object, url: NSURL): void;
}

declare class WKDownloadDelegate extends NativeObject implements WKDownloadDelegate {
}

declare interface WKScriptMessageHandler extends NSObject {
  userContentControllerDidReceiveScriptMessage(userContentController: interop.Object, message: interop.Object): void;
}

declare class WKScriptMessageHandler extends NativeObject implements WKScriptMessageHandler {
}

declare interface WKNavigationDelegate extends NSObject {
  webViewDecidePolicyForNavigationActionDecisionHandler?(webView: interop.Object, navigationAction: interop.Object, decisionHandler: (p1: interop.Enum<typeof WKNavigationActionPolicy>) => void): void;

  webViewDecidePolicyForNavigationResponseDecisionHandler?(webView: interop.Object, navigationResponse: interop.Object, decisionHandler: (p1: interop.Enum<typeof WKNavigationResponsePolicy>) => void): void;

  webViewDidStartProvisionalNavigation?(webView: interop.Object, navigation: interop.Object): void;

  webViewDidReceiveServerRedirectForProvisionalNavigation?(webView: interop.Object, navigation: interop.Object): void;

  webViewDidFailProvisionalNavigationWithError?(webView: interop.Object, navigation: interop.Object, error: NSError): void;

  webViewDidCommitNavigation?(webView: interop.Object, navigation: interop.Object): void;

  webViewDidFinishNavigation?(webView: interop.Object, navigation: interop.Object): void;

  webViewDidFailNavigationWithError?(webView: interop.Object, navigation: interop.Object, error: NSError): void;

  webViewDidReceiveAuthenticationChallengeCompletionHandler?(webView: interop.Object, challenge: interop.Object, completionHandler: (p1: interop.Enum<typeof NSURLSessionAuthChallengeDisposition>, p2: interop.Object) => void | null): void;
}

declare class WKNavigationDelegate extends NativeObject implements WKNavigationDelegate {
}


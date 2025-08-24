/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./UIKit.d.ts" />
/// <reference path="./Runtime.d.ts" />

declare const TWTweetComposeViewControllerResultDone: number;

declare const TWRequestMethodPOST: number;

declare const TWRequestMethodGET: number;

declare const TWRequestMethodDELETE: number;

declare const TWTweetComposeViewControllerResultCancelled: number;

declare class TWTweetComposeViewController extends UIViewController {
  static canSendTweet(): boolean;

  setInitialText(text: string): boolean;

  addImage(image: UIImage): boolean;

  removeAllImages(): boolean;

  addURL(url: NSURL): boolean;

  removeAllURLs(): boolean;

  completionHandler: (p1: interop.Enum<typeof SLComposeViewControllerResult>) => void;

  setCompletionHandler(completionHandler: (p1: interop.Enum<typeof SLComposeViewControllerResult>) => void): void;
}

declare class TWRequest extends NSObject {
  initWithURLParametersRequestMethod(url: NSURL, parameters: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, requestMethod: interop.Enum<typeof SLRequestMethod>): this;

  account: ACAccount;

  readonly requestMethod: interop.Enum<typeof SLRequestMethod>;

  readonly URL: NSURL;

  readonly parameters: NSDictionary;

  addMultiPartDataWithNameType(data: NSData, name: string, type: string): void;

  signedURLRequest(): NSURLRequest;

  performRequestWithHandler(handler: (p1: NSData, p2: NSHTTPURLResponse, p3: NSError) => void): void;

  setAccount(account: ACAccount): void;
}


/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Foundation.d.ts" />
/// <reference path="./UIKit.d.ts" />

declare const FPUIErrorDomain: string;

declare const FPUIExtensionErrorCode: {
  UserCancelled: 0,
  Failed: 1,
};

declare class FPUIActionExtensionContext extends NSExtensionContext {
  readonly domainIdentifier: string;

  completeRequest(): void;

  cancelRequestWithError(error: NSError): void;
}

// @ts-ignore ClassDecl.tsIgnore
declare class FPUIActionExtensionViewController extends UIViewController {
  // @ts-ignore MemberDecl.tsIgnore
  readonly extensionContext: FPUIActionExtensionContext;

  prepareForError(error: NSError): void;

  prepareForActionWithIdentifierItemIdentifiers(actionIdentifier: string, itemIdentifiers: NSArray<interop.Object> | Array<interop.Object>): void;
}


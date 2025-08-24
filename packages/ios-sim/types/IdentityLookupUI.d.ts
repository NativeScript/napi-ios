/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./UIKit.d.ts" />
/// <reference path="./Foundation.d.ts" />

// @ts-ignore ClassDecl.tsIgnore
declare class ILClassificationUIExtensionViewController extends UIViewController {
  // @ts-ignore MemberDecl.tsIgnore
  readonly extensionContext: ILClassificationUIExtensionContext;

  prepareForClassificationRequest(request: ILClassificationRequest): void;

  classificationResponseForRequest(request: ILClassificationRequest): ILClassificationResponse;
}

declare class ILClassificationUIExtensionContext extends NSExtensionContext {
  readyForClassificationResponse: boolean;

  isReadyForClassificationResponse(): boolean;

  setReadyForClassificationResponse(readyForClassificationResponse: boolean): void;
}


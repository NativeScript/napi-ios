/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./UIKit.d.ts" />

declare const BCParameterNameBody: string;

declare const BCParameterNameGroup: string;

declare const BCParameterNameIntent: string;

declare const BCChatButtonStyle: {
  Light: 0,
  Dark: 1,
};

declare class BCChatAction extends NSObject {
  static openTranscriptIntentParameters(businessIdentifier: string, intentParameters: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;
}

declare class BCChatButton extends UIControl {
  initWithStyle(style: interop.Enum<typeof BCChatButtonStyle>): this;

  initWithCoder(coder: NSCoder): this;
}


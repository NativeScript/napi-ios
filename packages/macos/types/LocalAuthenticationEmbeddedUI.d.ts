/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./AppKit.d.ts" />

declare class LAAuthenticationView extends NSView {
  initWithContext(context: LAContext): this;

  initWithContextControlSize(context: LAContext, controlSize: interop.Enum<typeof NSControlSize>): this;

  readonly context: LAContext;

  readonly controlSize: interop.Enum<typeof NSControlSize>;
}


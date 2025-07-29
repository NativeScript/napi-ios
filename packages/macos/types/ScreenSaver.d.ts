/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./AppKit.d.ts" />
/// <reference path="./Foundation.d.ts" />

// @ts-ignore ClassDecl.tsIgnore
declare class ScreenSaverView extends NSView {
  static backingStoreType(): interop.Enum<typeof NSBackingStoreType>;

  static performGammaFade(): boolean;

  initWithFrameIsPreview(frame: CGRect, isPreview: boolean): this;

  animationTimeInterval: number;

  startAnimation(): void;

  stopAnimation(): void;

  readonly animating: boolean;

  // @ts-ignore MemberDecl.tsIgnore
  drawRect(rect: CGRect): void;

  animateOneFrame(): void;

  readonly hasConfigureSheet: boolean;

  readonly configureSheet: NSWindow | null;

  readonly preview: boolean;

  setAnimationTimeInterval(animationTimeInterval: number): void;

  isAnimating(): boolean;

  isPreview(): boolean;
}

declare class ScreenSaverDefaults extends NSUserDefaults {
  static defaultsForModuleWithName<This extends abstract new (...args: any) => any>(this: This, inModuleName: string): InstanceType<This>;
}


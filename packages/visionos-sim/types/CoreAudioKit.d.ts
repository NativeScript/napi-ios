/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./UIKit.d.ts" />

declare class AUGenericViewController extends UIViewController {
  auAudioUnit: AUAudioUnit;

  setAuAudioUnit(auAudioUnit: AUAudioUnit | null): void;
}

declare class AUAudioUnitViewConfiguration extends NSObject implements NSSecureCoding {
  initWithWidthHeightHostHasController(width: number, height: number, hostHasController: boolean): this;

  readonly width: number;

  readonly height: number;

  readonly hostHasController: boolean;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class AUViewController extends UIViewController implements NSExtensionRequestHandling {
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

declare class CABTMIDICentralViewController extends UITableViewController {
}

declare class CABTMIDILocalPeripheralViewController extends UIViewController {
}

declare class CAInterAppAudioTransportView extends UIView {
  enabled: boolean;

  readonly playing: boolean;

  readonly recording: boolean;

  readonly connected: boolean;

  labelColor: UIColor;

  currentTimeLabelFont: UIFont;

  rewindButtonColor: UIColor;

  playButtonColor: UIColor;

  pauseButtonColor: UIColor;

  recordButtonColor: UIColor;

  setOutputAudioUnit(au: interop.PointerConvertible): void;

  isEnabled(): boolean;

  setEnabled(enabled: boolean): void;

  isPlaying(): boolean;

  isRecording(): boolean;

  isConnected(): boolean;

  setLabelColor(labelColor: UIColor): void;

  setCurrentTimeLabelFont(currentTimeLabelFont: UIFont): void;

  setRewindButtonColor(rewindButtonColor: UIColor): void;

  setPlayButtonColor(playButtonColor: UIColor): void;

  setPauseButtonColor(pauseButtonColor: UIColor): void;

  setRecordButtonColor(recordButtonColor: UIColor): void;
}

declare class CAInterAppAudioSwitcherView extends UIView {
  showingAppNames: boolean;

  setOutputAudioUnit(au: interop.PointerConvertible): void;

  contentWidth(): number;

  isShowingAppNames(): boolean;

  setShowingAppNames(showingAppNames: boolean): void;
}


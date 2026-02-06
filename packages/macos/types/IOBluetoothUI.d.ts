/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./AppKit.d.ts" />

declare const kIOBluetoothServiceBrowserControllerOptionsNone: number;

declare const kIOBluetoothServiceBrowserControllerOptionsAutoStartInquiry: number;

declare const kIOBluetoothServiceBrowserControllerOptionsDisconnectWhenDone: number;

declare const kIOBluetoothUIUserCanceledErr: number;

declare const kIOBluetoothUISuccess: number;

declare const BluetoothKeyboardReturnType: {
  ANSI: 0,
  ISO: 1,
  JIS: 2,
  No: 3,
};

declare function IOBluetoothValidateHardwareWithDescription(cancelButtonTitle: interop.Object, descriptionText: interop.Object): number;

declare function IOBluetoothGetPairingController(): interop.Object;

declare function IOBluetoothGetDeviceSelectorController(): interop.Object;

declare class IOBluetoothServiceBrowserController extends NSWindowController {
  static serviceBrowserController(inOptions: number): IOBluetoothServiceBrowserController;

  static browseDevicesOptions(outRecord: interop.PointerConvertible, inOptions: number): number;

  static browseDevicesAsSheetForWindowOptionsWindow(outRecord: interop.PointerConvertible, inOptions: number, inWindow: NSWindow): number;

  static withServiceBrowserControllerRef(serviceBrowserControllerRef: interop.Object): IOBluetoothServiceBrowserController;

  getServiceBrowserControllerRef(): interop.Object;

  discover(outRecord: interop.PointerConvertible): number;

  discoverAsSheetForWindowWithRecord(sheetWindow: NSWindow, outRecord: interop.PointerConvertible): number;

  discoverWithDeviceAttributesServiceListServiceRecord(deviceAttributes: interop.PointerConvertible, serviceArray: NSArray<interop.Object> | Array<interop.Object>, outRecord: interop.PointerConvertible): number;

  setOptions(inOptions: number): void;

  runModal(): number;

  beginSheetModalForWindowModalDelegateDidEndSelectorContextInfo(sheetWindow: NSWindow, modalDelegate: interop.Object, didEndSelector: string, contextInfo: interop.PointerConvertible): number;

  getResults(): NSArray;

  getOptions(): number;

  setSearchAttributes(searchAttributes: interop.PointerConvertible): void;

  getSearchAttributes(): interop.Pointer;

  addAllowedUUID(allowedUUID: IOBluetoothSDPUUID): void;

  addAllowedUUIDArray(allowedUUIDArray: NSArray<interop.Object> | Array<interop.Object>): void;

  clearAllowedUUIDs(): void;

  setTitle(windowTitle: string): void;

  getTitle(): string;

  setDescriptionText(descriptionText: string): void;

  getDescriptionText(): string;

  setPrompt(prompt: string): void;

  getPrompt(): string;
}

declare class IOBluetoothAccessibilityIgnoredImageCell extends NSImageCell {
}

declare class IOBluetoothObjectPushUIController extends NSWindowController {
  initObjectPushWithBluetoothDeviceWithFilesDelegate(inDevice: IOBluetoothDevice, inFiles: NSArray<interop.Object> | Array<interop.Object>, inDelegate: interop.Object): this;

  runModal(): void;

  runPanel(): void;

  beginSheetModalForWindowModalDelegateDidEndSelectorContextInfo(sheetWindow: NSWindow, modalDelegate: interop.Object, didEndSelector: string, contextInfo: interop.PointerConvertible): number;

  stop(): void;

  setTitle(windowTitle: string): void;

  getTitle(): string;

  setIconImage(image: NSImage): void;

  getDevice(): IOBluetoothDevice;

  isTransferInProgress(): boolean;
}

declare class IOBluetoothPairingController extends NSWindowController {
  static pairingController(): IOBluetoothPairingController;

  runModal(): number;

  getResults(): NSArray;

  setOptions(options: number): void;

  getOptions(): number;

  setSearchAttributes(searchAttributes: interop.PointerConvertible): void;

  getSearchAttributes(): interop.Pointer;

  addAllowedUUID(allowedUUID: IOBluetoothSDPUUID): void;

  addAllowedUUIDArray(allowedUUIDArray: NSArray<interop.Object> | Array<interop.Object>): void;

  clearAllowedUUIDs(): void;

  setTitle(windowTitle: string): void;

  getTitle(): string;

  setDescriptionText(descriptionText: string): void;

  getDescriptionText(): string;

  setPrompt(prompt: string): void;

  getPrompt(): string;
}

declare class IOBluetoothAccessibilityIgnoredTextFieldCell extends NSTextFieldCell {
}

declare class IOBluetoothPasskeyDisplay extends NSView {
  usePasskeyNotificaitons: boolean;

  isIncomingRequest: boolean;

  passkey: string;

  returnImage: NSImage;

  returnHighlightImage: NSImage;

  centeredView: NSView;

  backgroundImageConstraint: NSLayoutConstraint;

  static sharedDisplayView(): IOBluetoothPasskeyDisplay;

  setPasskeyForDeviceUsingSSP(inString: string, device: IOBluetoothDevice, isSSP: boolean): void;

  advancePasskeyIndicator(): void;

  retreatPasskeyIndicator(): void;

  resetPasskeyIndicator(): void;

  setupUIForDevice(device: IOBluetoothDevice): void;

  setupUIForSSPDevice(device: IOBluetoothDevice): void;

  setPasskeyString(inString: string): void;

  setPasskeyIndicatorEnabled(inEnabled: boolean): void;

  resetAll(): void;

  setUsePasskeyNotificaitons(usePasskeyNotificaitons: boolean): void;

  setIsIncomingRequest(isIncomingRequest: boolean): void;

  setPasskey(passkey: string): void;

  setReturnImage(returnImage: NSImage): void;

  setReturnHighlightImage(returnHighlightImage: NSImage): void;

  setCenteredView(centeredView: NSView): void;

  setBackgroundImageConstraint(backgroundImageConstraint: NSLayoutConstraint): void;
}

declare class IOBluetoothDeviceSelectorController extends NSWindowController {
  static deviceSelector(): IOBluetoothDeviceSelectorController;

  runModal(): number;

  beginSheetModalForWindowModalDelegateDidEndSelectorContextInfo(sheetWindow: NSWindow, modalDelegate: interop.Object, didEndSelector: string, contextInfo: interop.PointerConvertible): number;

  getResults(): NSArray;

  setOptions(options: number): void;

  getOptions(): number;

  setSearchAttributes(searchAttributes: interop.PointerConvertible): void;

  getSearchAttributes(): interop.Pointer;

  addAllowedUUID(allowedUUID: IOBluetoothSDPUUID): void;

  addAllowedUUIDArray(allowedUUIDArray: NSArray<interop.Object> | Array<interop.Object>): void;

  clearAllowedUUIDs(): void;

  setTitle(windowTitle: string): void;

  getTitle(): string;

  setHeader(headerText: string): void;

  getHeader(): string;

  setDescriptionText(descriptionText: string): void;

  getDescriptionText(): string;

  setPrompt(prompt: string): void;

  getPrompt(): string;

  setCancel(prompt: string): void;

  getCancel(): string;
}


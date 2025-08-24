/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./UIKit.d.ts" />

declare const CoreLocationUIVersionNumber: number;

declare const CoreLocationUIVersionString: interop.Pointer;

declare const CLLocationButtonLabel: {
  None: 0,
  CurrentLocation: 1,
  SendCurrentLocation: 2,
  SendMyCurrentLocation: 3,
  ShareCurrentLocation: 4,
  ShareMyCurrentLocation: 5,
};

declare const CLLocationButtonIcon: {
  None: 0,
  ArrowFilled: 1,
  ArrowOutline: 2,
};

declare class CLLocationButton extends UIControl implements NSSecureCoding {
  icon: interop.Enum<typeof CLLocationButtonIcon>;

  label: interop.Enum<typeof CLLocationButtonLabel>;

  fontSize: number;

  cornerRadius: number;

  setIcon(icon: interop.Enum<typeof CLLocationButtonIcon>): void;

  setLabel(label: interop.Enum<typeof CLLocationButtonLabel>): void;

  setFontSize(fontSize: number): void;

  setCornerRadius(cornerRadius: number): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}


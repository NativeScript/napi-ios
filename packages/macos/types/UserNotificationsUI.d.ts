/// <reference types="@nativescript/objc-node-api" />

declare const UNNotificationContentExtensionResponseOption: {
  DoNotDismiss: 0,
  Dismiss: 1,
  DismissAndForwardAction: 2,
};

declare const UNNotificationContentExtensionMediaPlayPauseButtonType: {
  None: 0,
  Default: 1,
  Overlay: 2,
};

declare interface UNNotificationContentExtension extends NSObjectProtocol {
  didReceiveNotification(notification: UNNotification): void;

  didReceiveNotificationResponseCompletionHandler?(response: UNNotificationResponse, completion: (p1: interop.Enum<typeof UNNotificationContentExtensionResponseOption>) => void): void;

  readonly mediaPlayPauseButtonType?: interop.Enum<typeof UNNotificationContentExtensionMediaPlayPauseButtonType>;

  readonly mediaPlayPauseButtonFrame?: CGRect;

  readonly mediaPlayPauseButtonTintColor?: NSColor;

  mediaPlay?(): void;

  mediaPause?(): void;
}

declare class UNNotificationContentExtension extends NativeObject implements UNNotificationContentExtension {
}


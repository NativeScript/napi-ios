/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const AVCustomRoutingControllerAuthorizedRoutesDidChangeNotification: string;

declare const AVCustomRoutingEventReason: {
  Activate: 0,
  Deactivate: 1,
  Reactivate: 2,
};

declare interface AVCustomRoutingControllerDelegate extends NSObjectProtocol {
  customRoutingControllerHandleEventCompletionHandler(controller: AVCustomRoutingController, event: AVCustomRoutingEvent, completionHandler: (p1: boolean) => void): void;

  customRoutingControllerEventDidTimeOut?(controller: AVCustomRoutingController, event: AVCustomRoutingEvent): void;

  customRoutingControllerDidSelectItem?(controller: AVCustomRoutingController, customActionItem: AVCustomRoutingActionItem): void;
}

declare class AVCustomRoutingControllerDelegate extends NativeObject implements AVCustomRoutingControllerDelegate {
}

declare class AVCustomRoutingActionItem extends NSObject {
  type: UTType;

  overrideTitle: string;

  setType(type: UTType): void;

  setOverrideTitle(overrideTitle: string): void;
}

declare class AVCustomRoutingPartialIP extends NSObject {
  readonly address: NSData;

  readonly mask: NSData;

  initWithAddressMask(address: NSData, mask: NSData): this;
}

declare class AVCustomRoutingController extends NSObject {
  delegate: AVCustomRoutingControllerDelegate;

  readonly authorizedRoutes: NSArray;

  get knownRouteIPs(): NSArray;
  set knownRouteIPs(value: NSArray<interop.Object> | Array<interop.Object>);

  get customActionItems(): NSArray;
  set customActionItems(value: NSArray<interop.Object> | Array<interop.Object>);

  invalidateAuthorizationForRoute(route: AVCustomDeviceRoute): void;

  setActiveForRoute(active: boolean, route: AVCustomDeviceRoute): void;

  isRouteActive(route: AVCustomDeviceRoute): boolean;

  setDelegate(delegate: AVCustomRoutingControllerDelegate): void;

  setKnownRouteIPs(knownRouteIPs: NSArray<interop.Object> | Array<interop.Object>): void;

  setCustomActionItems(customActionItems: NSArray<interop.Object> | Array<interop.Object>): void;
}

declare class AVCustomDeviceRoute extends NSObject {
  readonly networkEndpoint: NSObject;

  readonly bluetoothIdentifier: NSUUID;
}

declare class AVCustomRoutingEvent extends NSObject {
  readonly reason: interop.Enum<typeof AVCustomRoutingEventReason>;

  readonly route: AVCustomDeviceRoute;
}


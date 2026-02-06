/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./UIKit.d.ts" />

declare interface VNDocumentCameraViewControllerDelegate extends NSObjectProtocol {
  documentCameraViewControllerDidFinishWithScan?(controller: VNDocumentCameraViewController, scan: VNDocumentCameraScan): void;

  documentCameraViewControllerDidCancel?(controller: VNDocumentCameraViewController): void;

  documentCameraViewControllerDidFailWithError?(controller: VNDocumentCameraViewController, error: NSError): void;
}

declare class VNDocumentCameraViewControllerDelegate extends NativeObject implements VNDocumentCameraViewControllerDelegate {
}

declare class VNDocumentCameraScan extends NSObject {
  readonly pageCount: number;

  imageOfPageAtIndex(index: number): UIImage;

  readonly title: string;
}

declare class VNDocumentCameraViewController extends UIViewController {
  delegate: VNDocumentCameraViewControllerDelegate;

  static readonly supported: boolean;

  setDelegate(delegate: VNDocumentCameraViewControllerDelegate | null): void;

  static isSupported(): boolean;
}


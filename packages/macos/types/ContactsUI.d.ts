/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./AppKit.d.ts" />

declare interface CNContactPickerDelegate extends NSObjectProtocol {
  contactPickerDidSelectContact?(picker: CNContactPicker, contact: CNContact): void;

  contactPickerDidSelectContactProperty?(picker: CNContactPicker, contactProperty: CNContactProperty): void;

  contactPickerWillClose?(picker: CNContactPicker): void;

  contactPickerDidClose?(picker: CNContactPicker): void;
}

declare class CNContactPickerDelegate extends NativeObject implements CNContactPickerDelegate {
}

declare class CNContactPicker extends NSObject {
  get displayedKeys(): NSArray;
  set displayedKeys(value: NSArray<interop.Object> | Array<interop.Object>);

  delegate: CNContactPickerDelegate | null;

  showRelativeToRectOfViewPreferredEdge(positioningRect: CGRect, positioningView: NSView, preferredEdge: interop.Enum<typeof NSRectEdge>): void;

  close(): void;

  setDisplayedKeys(displayedKeys: NSArray<interop.Object> | Array<interop.Object>): void;

  setDelegate(delegate: CNContactPickerDelegate | null): void;
}

declare class CNContactViewController extends NSViewController {
  static descriptorForRequiredKeys(): CNKeyDescriptor;

  contact: CNContact;

  setContact(contact: CNContact | null): void;
}


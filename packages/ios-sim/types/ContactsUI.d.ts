/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./UIKit.d.ts" />

declare interface CNContactViewControllerDelegate extends NSObjectProtocol {
  contactViewControllerShouldPerformDefaultActionForContactProperty?(viewController: CNContactViewController, property: CNContactProperty): boolean;

  contactViewControllerDidCompleteWithContact?(viewController: CNContactViewController, contact: CNContact | null): void;
}

declare class CNContactViewControllerDelegate extends NativeObject implements CNContactViewControllerDelegate {
}

declare interface CNContactPickerDelegate extends NSObjectProtocol {
  contactPickerDidCancel?(picker: CNContactPickerViewController): void;

  contactPickerDidSelectContact?(picker: CNContactPickerViewController, contact: CNContact): void;

  contactPickerDidSelectContactProperty?(picker: CNContactPickerViewController, contactProperty: CNContactProperty): void;

  contactPickerDidSelectContacts?(picker: CNContactPickerViewController, contacts: NSArray<interop.Object> | Array<interop.Object>): void;

  contactPickerDidSelectContactProperties?(picker: CNContactPickerViewController, contactProperties: NSArray<interop.Object> | Array<interop.Object>): void;
}

declare class CNContactPickerDelegate extends NativeObject implements CNContactPickerDelegate {
}

declare class CNContactPickerViewController extends UIViewController {
  get displayedPropertyKeys(): NSArray;
  set displayedPropertyKeys(value: NSArray<interop.Object> | Array<interop.Object>);

  delegate: CNContactPickerDelegate;

  predicateForEnablingContact: NSPredicate;

  predicateForSelectionOfContact: NSPredicate;

  predicateForSelectionOfProperty: NSPredicate;

  setDisplayedPropertyKeys(displayedPropertyKeys: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setDelegate(delegate: CNContactPickerDelegate | null): void;

  setPredicateForEnablingContact(predicateForEnablingContact: NSPredicate | null): void;

  setPredicateForSelectionOfContact(predicateForSelectionOfContact: NSPredicate | null): void;

  setPredicateForSelectionOfProperty(predicateForSelectionOfProperty: NSPredicate | null): void;
}

declare class CNContactViewController extends UIViewController {
  static descriptorForRequiredKeys(): CNKeyDescriptor;

  static viewControllerForContact<This extends abstract new (...args: any) => any>(this: This, contact: CNContact): InstanceType<This>;

  static viewControllerForUnknownContact<This extends abstract new (...args: any) => any>(this: This, contact: CNContact): InstanceType<This>;

  static viewControllerForNewContact<This extends abstract new (...args: any) => any>(this: This, contact: CNContact | null): InstanceType<This>;

  readonly contact: CNContact;

  get displayedPropertyKeys(): NSArray;
  set displayedPropertyKeys(value: NSArray<interop.Object> | Array<interop.Object>);

  delegate: CNContactViewControllerDelegate;

  contactStore: CNContactStore;

  parentGroup: CNGroup;

  parentContainer: CNContainer;

  alternateName: string;

  message: string;

  allowsEditing: boolean;

  allowsActions: boolean;

  shouldShowLinkedContacts: boolean;

  highlightPropertyWithKeyIdentifier(key: string, identifier: string | null): void;

  setDisplayedPropertyKeys(displayedPropertyKeys: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setDelegate(delegate: CNContactViewControllerDelegate | null): void;

  setContactStore(contactStore: CNContactStore | null): void;

  setParentGroup(parentGroup: CNGroup | null): void;

  setParentContainer(parentContainer: CNContainer | null): void;

  setAlternateName(alternateName: string | null): void;

  setMessage(message: string | null): void;

  setAllowsEditing(allowsEditing: boolean): void;

  setAllowsActions(allowsActions: boolean): void;

  setShouldShowLinkedContacts(shouldShowLinkedContacts: boolean): void;
}


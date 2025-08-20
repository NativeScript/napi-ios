/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./UIKit.d.ts" />

declare const ABPersonBirthdayProperty: string;

declare const ABPersonPostalAddressesProperty: string;

declare const ABPersonPhoneNumbersProperty: string;

declare const ABPersonOrganizationNameProperty: string;

declare const ABPersonPhoneticFamilyNameProperty: string;

declare const ABPersonPhoneticGivenNameProperty: string;

declare const ABPersonNicknameProperty: string;

declare const ABPersonPreviousFamilyNameProperty: string;

declare const ABPersonMiddleNameProperty: string;

declare const ABPersonNamePrefixProperty: string;

declare const ABPersonDepartmentNameProperty: string;

declare const ABPersonGivenNameProperty: string;

declare const ABPersonJobTitleProperty: string;

declare const ABPersonPhoneticMiddleNameProperty: string;

declare const ABPersonFamilyNameProperty: string;

declare const ABPersonDatesProperty: string;

declare const ABPersonEmailAddressesProperty: string;

declare const ABPersonInstantMessageAddressesProperty: string;

declare const ABPersonRelatedNamesProperty: string;

declare const ABPersonNameSuffixProperty: string;

declare const ABPersonNoteProperty: string;

declare const ABPersonUrlAddressesProperty: string;

declare const ABPersonSocialProfilesProperty: string;

declare function ABCreateStringWithAddressDictionary(address: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, addCountryName: boolean): string;

declare interface ABUnknownPersonViewControllerDelegate extends NSObjectProtocol {
  unknownPersonViewControllerDidResolveToPerson(unknownCardViewController: ABUnknownPersonViewController, person: interop.PointerConvertible): void;

  unknownPersonViewControllerShouldPerformDefaultActionForPersonPropertyIdentifier?(personViewController: ABUnknownPersonViewController, person: interop.PointerConvertible, property: number, identifier: number): boolean;
}

declare class ABUnknownPersonViewControllerDelegate extends NativeObject implements ABUnknownPersonViewControllerDelegate {
}

declare interface ABNewPersonViewControllerDelegate extends NSObjectProtocol {
  newPersonViewControllerDidCompleteWithNewPerson(newPersonView: ABNewPersonViewController, person: interop.PointerConvertible): void;
}

declare class ABNewPersonViewControllerDelegate extends NativeObject implements ABNewPersonViewControllerDelegate {
}

declare interface ABPersonViewControllerDelegate extends NSObjectProtocol {
  personViewControllerShouldPerformDefaultActionForPersonPropertyIdentifier(personViewController: ABPersonViewController, person: interop.PointerConvertible, property: number, identifier: number): boolean;
}

declare class ABPersonViewControllerDelegate extends NativeObject implements ABPersonViewControllerDelegate {
}

declare interface ABPeoplePickerNavigationControllerDelegate extends NSObjectProtocol {
  peoplePickerNavigationControllerDidSelectPerson?(peoplePicker: ABPeoplePickerNavigationController, person: interop.PointerConvertible): void;

  peoplePickerNavigationControllerDidSelectPersonPropertyIdentifier?(peoplePicker: ABPeoplePickerNavigationController, person: interop.PointerConvertible, property: number, identifier: number): void;

  peoplePickerNavigationControllerDidCancel?(peoplePicker: ABPeoplePickerNavigationController): void;

  peoplePickerNavigationControllerShouldContinueAfterSelectingPerson?(peoplePicker: ABPeoplePickerNavigationController, person: interop.PointerConvertible): boolean;

  peoplePickerNavigationControllerShouldContinueAfterSelectingPersonPropertyIdentifier?(peoplePicker: ABPeoplePickerNavigationController, person: interop.PointerConvertible, property: number, identifier: number): boolean;
}

declare class ABPeoplePickerNavigationControllerDelegate extends NativeObject implements ABPeoplePickerNavigationControllerDelegate {
}

declare class ABPeoplePickerNavigationController extends UINavigationController {
  peoplePickerDelegate: ABPeoplePickerNavigationControllerDelegate;

  get displayedProperties(): NSArray;
  set displayedProperties(value: NSArray<interop.Object> | Array<interop.Object>);

  get addressBook(): interop.Pointer;
  set addressBook(value: interop.PointerConvertible);

  predicateForEnablingPerson: NSPredicate;

  predicateForSelectionOfPerson: NSPredicate;

  predicateForSelectionOfProperty: NSPredicate;

  setPeoplePickerDelegate(peoplePickerDelegate: ABPeoplePickerNavigationControllerDelegate | null): void;

  setDisplayedProperties(displayedProperties: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setAddressBook(addressBook: interop.PointerConvertible): void;

  setPredicateForEnablingPerson(predicateForEnablingPerson: NSPredicate): void;

  setPredicateForSelectionOfPerson(predicateForSelectionOfPerson: NSPredicate): void;

  setPredicateForSelectionOfProperty(predicateForSelectionOfProperty: NSPredicate): void;
}

declare class ABPersonViewController extends UIViewController implements UIViewControllerRestoration {
  personViewDelegate: ABPersonViewControllerDelegate;

  get addressBook(): interop.Pointer;
  set addressBook(value: interop.PointerConvertible);

  get displayedPerson(): interop.Pointer;
  set displayedPerson(value: interop.PointerConvertible);

  get displayedProperties(): NSArray;
  set displayedProperties(value: NSArray<interop.Object> | Array<interop.Object>);

  allowsEditing: boolean;

  allowsActions: boolean;

  shouldShowLinkedPeople: boolean;

  setHighlightedItemForPropertyWithIdentifier(property: number, identifier: number): void;

  setPersonViewDelegate(personViewDelegate: ABPersonViewControllerDelegate | null): void;

  setAddressBook(addressBook: interop.PointerConvertible): void;

  setDisplayedPerson(displayedPerson: interop.PointerConvertible): void;

  setDisplayedProperties(displayedProperties: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setAllowsEditing(allowsEditing: boolean): void;

  setAllowsActions(allowsActions: boolean): void;

  setShouldShowLinkedPeople(shouldShowLinkedPeople: boolean): void;

  static viewControllerWithRestorationIdentifierPathCoder(identifierComponents: NSArray<interop.Object> | Array<interop.Object>, coder: NSCoder): UIViewController;
}

declare class ABNewPersonViewController extends UIViewController {
  newPersonViewDelegate: ABNewPersonViewControllerDelegate;

  get addressBook(): interop.Pointer;
  set addressBook(value: interop.PointerConvertible);

  get displayedPerson(): interop.Pointer;
  set displayedPerson(value: interop.PointerConvertible);

  get parentGroup(): interop.Pointer;
  set parentGroup(value: interop.PointerConvertible);

  setNewPersonViewDelegate(newPersonViewDelegate: ABNewPersonViewControllerDelegate | null): void;

  setAddressBook(addressBook: interop.PointerConvertible): void;

  setDisplayedPerson(displayedPerson: interop.PointerConvertible): void;

  setParentGroup(parentGroup: interop.PointerConvertible): void;
}

declare class ABUnknownPersonViewController extends UIViewController {
  unknownPersonViewDelegate: ABUnknownPersonViewControllerDelegate;

  get addressBook(): interop.Pointer;
  set addressBook(value: interop.PointerConvertible);

  get displayedPerson(): interop.Pointer;
  set displayedPerson(value: interop.PointerConvertible);

  alternateName: string;

  message: string;

  allowsActions: boolean;

  allowsAddingToAddressBook: boolean;

  setUnknownPersonViewDelegate(unknownPersonViewDelegate: ABUnknownPersonViewControllerDelegate | null): void;

  setAddressBook(addressBook: interop.PointerConvertible): void;

  setDisplayedPerson(displayedPerson: interop.PointerConvertible): void;

  setAlternateName(alternateName: string | null): void;

  setMessage(message: string | null): void;

  setAllowsActions(allowsActions: boolean): void;

  setAllowsAddingToAddressBook(allowsAddingToAddressBook: boolean): void;
}


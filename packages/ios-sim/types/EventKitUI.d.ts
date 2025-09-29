/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./UIKit.d.ts" />

declare const EKCalendarChooserDisplayStyle: {
  AllCalendars: 0,
  WritableCalendarsOnly: 1,
};

declare const EKEventEditViewAction: {
  Canceled: 0,
  Saved: 1,
  Deleted: 2,
  Cancelled: 0,
};

declare const EKCalendarChooserSelectionStyle: {
  Single: 0,
  Multiple: 1,
};

declare const EKEventViewAction: {
  Done: 0,
  Responded: 1,
  Deleted: 2,
};

declare function EventKitUIBundle(): NSBundle;

declare interface EKEventViewDelegate extends NSObjectProtocol {
  eventViewControllerDidCompleteWithAction(controller: EKEventViewController, action: interop.Enum<typeof EKEventViewAction>): void;
}

declare class EKEventViewDelegate extends NativeObject implements EKEventViewDelegate {
}

declare interface EKEventEditViewDelegate extends NSObjectProtocol {
  eventEditViewControllerDidCompleteWithAction(controller: EKEventEditViewController, action: interop.Enum<typeof EKEventEditViewAction>): void;

  eventEditViewControllerDefaultCalendarForNewEvents?(controller: EKEventEditViewController): EKCalendar;
}

declare class EKEventEditViewDelegate extends NativeObject implements EKEventEditViewDelegate {
}

declare interface EKCalendarChooserDelegate extends NSObjectProtocol {
  calendarChooserSelectionDidChange?(calendarChooser: EKCalendarChooser): void;

  calendarChooserDidFinish?(calendarChooser: EKCalendarChooser): void;

  calendarChooserDidCancel?(calendarChooser: EKCalendarChooser): void;
}

declare class EKCalendarChooserDelegate extends NativeObject implements EKCalendarChooserDelegate {
}

declare class EKEventEditViewController extends UINavigationController {
  editViewDelegate: EKEventEditViewDelegate;

  eventStore: EKEventStore;

  event: EKEvent;

  cancelEditing(): void;

  setEditViewDelegate(editViewDelegate: EKEventEditViewDelegate | null): void;

  setEventStore(eventStore: EKEventStore): void;

  setEvent(event: EKEvent | null): void;
}

declare class EKCalendarChooser extends UIViewController {
  initWithSelectionStyleDisplayStyleEventStore(selectionStyle: interop.Enum<typeof EKCalendarChooserSelectionStyle>, displayStyle: interop.Enum<typeof EKCalendarChooserDisplayStyle>, eventStore: EKEventStore): this;

  initWithSelectionStyleDisplayStyleEntityTypeEventStore(style: interop.Enum<typeof EKCalendarChooserSelectionStyle>, displayStyle: interop.Enum<typeof EKCalendarChooserDisplayStyle>, entityType: interop.Enum<typeof EKEntityType>, eventStore: EKEventStore): this;

  readonly selectionStyle: interop.Enum<typeof EKCalendarChooserSelectionStyle>;

  delegate: EKCalendarChooserDelegate;

  showsDoneButton: boolean;

  showsCancelButton: boolean;

  selectedCalendars: NSSet;

  setDelegate(delegate: EKCalendarChooserDelegate | null): void;

  setShowsDoneButton(showsDoneButton: boolean): void;

  setShowsCancelButton(showsCancelButton: boolean): void;

  setSelectedCalendars(selectedCalendars: NSSet): void;
}

declare class EKEventViewController extends UIViewController {
  delegate: EKEventViewDelegate;

  event: EKEvent;

  allowsEditing: boolean;

  allowsCalendarPreview: boolean;

  setDelegate(delegate: EKEventViewDelegate): void;

  setEvent(event: EKEvent): void;

  setAllowsEditing(allowsEditing: boolean): void;

  setAllowsCalendarPreview(allowsCalendarPreview: boolean): void;
}


/// <reference types="@nativescript/objc-node-api" />

declare const EKSpan: {
  ThisEvent: 0,
  FutureEvents: 1,
};

declare const EKAlarmProximity: {
  None: 0,
  Enter: 1,
  Leave: 2,
};

declare const EKSourceType: {
  Local: 0,
  Exchange: 1,
  CalDAV: 2,
  MobileMe: 3,
  Subscribed: 4,
  Birthdays: 5,
};

declare const EKCalendarEventAvailabilityMask: {
  None: 0,
  Busy: 1,
  Free: 2,
  Tentative: 4,
  Unavailable: 8,
};

declare const EKWeekday: {
  Sunday: 1,
  Monday: 2,
  Tuesday: 3,
  Wednesday: 4,
  Thursday: 5,
  Friday: 6,
  Saturday: 7,
};

declare const EKRecurrenceFrequency: {
  Daily: 0,
  Weekly: 1,
  Monthly: 2,
  Yearly: 3,
};

declare const EKEntityType: {
  Event: 0,
  Reminder: 1,
};

declare const EKEventStatus: {
  None: 0,
  Confirmed: 1,
  Tentative: 2,
  Canceled: 3,
};

declare const EKParticipantStatus: {
  Unknown: 0,
  Pending: 1,
  Accepted: 2,
  Declined: 3,
  Tentative: 4,
  Delegated: 5,
  Completed: 6,
  InProcess: 7,
};

declare const EKParticipantRole: {
  Unknown: 0,
  Required: 1,
  Optional: 2,
  Chair: 3,
  NonParticipant: 4,
};

declare const EKErrorCode: {
  EventNotMutable: 0,
  NoCalendar: 1,
  NoStartDate: 2,
  NoEndDate: 3,
  DatesInverted: 4,
  InternalFailure: 5,
  CalendarReadOnly: 6,
  DurationGreaterThanRecurrence: 7,
  AlarmGreaterThanRecurrence: 8,
  StartDateTooFarInFuture: 9,
  StartDateCollidesWithOtherOccurrence: 10,
  ObjectBelongsToDifferentStore: 11,
  InvitesCannotBeMoved: 12,
  InvalidSpan: 13,
  CalendarHasNoSource: 14,
  CalendarSourceCannotBeModified: 15,
  CalendarIsImmutable: 16,
  SourceDoesNotAllowCalendarAddDelete: 17,
  RecurringReminderRequiresDueDate: 18,
  StructuredLocationsNotSupported: 19,
  ReminderLocationsNotSupported: 20,
  AlarmProximityNotSupported: 21,
  CalendarDoesNotAllowEvents: 22,
  CalendarDoesNotAllowReminders: 23,
  SourceDoesNotAllowReminders: 24,
  SourceDoesNotAllowEvents: 25,
  PriorityIsInvalid: 26,
  InvalidEntityType: 27,
  ProcedureAlarmsNotMutable: 28,
  EventStoreNotAuthorized: 29,
  OSNotSupported: 30,
  InvalidInviteReplyCalendar: 31,
  NotificationsCollectionFlagNotSet: 32,
  SourceMismatch: 33,
  NotificationCollectionMismatch: 34,
  NotificationSavedWithoutCollection: 35,
  ReminderAlarmContainsEmailOrUrl: 36,
  Last: 37,
};

declare const EKParticipantScheduleStatus: {
  None: 0,
  Pending: 1,
  Sent: 2,
  Delivered: 3,
  RecipientNotRecognized: 4,
  NoPrivileges: 5,
  DeliveryFailed: 6,
  CannotDeliver: 7,
  RecipientNotAllowed: 8,
};

declare const EKEventAvailability: {
  NotSupported: -1,
  Busy: 0,
  Free: 1,
  Tentative: 2,
  Unavailable: 3,
};

declare const EKReminderPriority: {
  None: 0,
  High: 1,
  Medium: 5,
  Low: 9,
};

declare const EKParticipantType: {
  Unknown: 0,
  Person: 1,
  Room: 2,
  Resource: 3,
  Group: 4,
};

declare const EKCalendarType: {
  Local: 0,
  CalDAV: 1,
  Exchange: 2,
  Subscription: 3,
  Birthday: 4,
};

declare const EKAlarmType: {
  Display: 0,
  Audio: 1,
  Procedure: 2,
  Email: 3,
};

declare const EKEntityMask: {
  Event: 1,
  Reminder: 2,
};


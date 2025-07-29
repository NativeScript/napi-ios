/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const CalDateInvalidError: number;

declare const CalCalendarNotEditableError: number;

declare const CalCalendarStoreErrorDomain: string;

declare const CalAlarmActionProcedure: string;

declare const CalAlarmActionEmail: string;

declare const CalAttendeeStatusDeclined: string;

declare const CalAttendeeStatusAccepted: string;

declare const CalDefaultRecurrenceInterval: number;

declare const CalPriorityMedium: number;

declare const CalPriorityHigh: number;

declare const CalPriorityNone: number;

declare const CalCalendarTypeSubscription: string;

declare const CalCalendarTypeLocal: string;

declare const CalCalendarTypeBirthday: string;

declare const CalInsertedRecordsKey: string;

declare const CalTasksChangedExternallyNotification: string;

declare const CalTasksChangedNotification: string;

declare const CalAttendeeStatusTentative: string;

declare const CalEventsChangedExternallyNotification: string;

declare const CalCalendarTypeExchange: string;

declare const CalCalendarNotInRepository: number;

declare const CalUserUIDKey: string;

declare const CalDeletedRecordsKey: string;

declare const CalAlarmActionSound: string;

declare const CalAlarmActionDisplay: string;

declare const CalCalendarTypeCalDAV: string;

declare const CalPriorityLow: number;

declare const CalEventsChangedNotification: string;

declare const CalSenderProcessIDKey: string;

declare const CalUpdatedRecordsKey: string;

declare const CalCalendarTypeIMAP: string;

declare const CalAttendeeStatusNeedsAction: string;

declare const CalCalendarsChangedNotification: string;

declare const CalCalendarsChangedExternallyNotification: string;

declare const CalCalendarTitleNotUniqueError: number;

declare const CalSpan: {
  ThisEvent: 0,
  FutureEvents: 1,
  AllEvents: 2,
};

declare const CalRecurrenceType: {
  Daily: 0,
  Weekly: 1,
  Monthly: 2,
  Yearly: 3,
};

declare class CalAlarm extends NSObject implements NSCopying {
  static alarm(): interop.Object;

  setAcknowledged(date: NSDate): void;

  acknowledged(): NSDate;

  setRelatedTo(relatedTo: string): void;

  relatedTo(): string;

  action: string;

  sound: string;

  emailAddress: string;

  url: NSURL;

  relativeTrigger: number;

  absoluteTrigger: NSDate;

  triggerDateRelativeTo(date: NSDate): NSDate;

  setAction(action: string): void;

  setSound(sound: string): void;

  setEmailAddress(emailAddress: string): void;

  setUrl(url: NSURL): void;

  setRelativeTrigger(relativeTrigger: number): void;

  setAbsoluteTrigger(absoluteTrigger: NSDate): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class CalAttendee extends NSObject implements NSCopying {
  readonly address: NSURL;

  readonly commonName: string;

  readonly status: string;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class CalCalendarItem extends NSObject implements NSCopying {
  hasAlarm(): boolean;

  nextAlarmDate(): NSDate;

  calendar: CalCalendar;

  notes: string;

  url: NSURL;

  title: string;

  readonly uid: string;

  readonly dateStamp: NSDate;

  get alarms(): NSArray;
  set alarms(value: NSArray<interop.Object> | Array<interop.Object>);

  addAlarm(alarm: CalAlarm): void;

  addAlarms(alarms: NSArray<interop.Object> | Array<interop.Object>): void;

  removeAlarm(alarm: CalAlarm): void;

  removeAlarms(alarms: NSArray<interop.Object> | Array<interop.Object>): void;

  setCalendar(calendar: CalCalendar): void;

  setNotes(notes: string): void;

  setUrl(url: NSURL): void;

  setTitle(title: string): void;

  setAlarms(alarms: NSArray<interop.Object> | Array<interop.Object>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class CalCalendar extends NSObject implements NSCopying {
  static calendar(): interop.Object;

  color: NSColor;

  notes: string;

  title: string;

  readonly type: string;

  readonly uid: string;

  readonly isEditable: boolean;

  setColor(color: NSColor): void;

  setNotes(notes: string): void;

  setTitle(title: string): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class CalEvent extends CalCalendarItem {
  static event(): interop.Object;

  isAllDay: boolean;

  location: string;

  recurrenceRule: CalRecurrenceRule;

  startDate: NSDate;

  endDate: NSDate;

  readonly attendees: NSArray;

  readonly isDetached: boolean;

  readonly occurrence: NSDate;

  setIsAllDay(isAllDay: boolean): void;

  setLocation(location: string): void;

  setRecurrenceRule(recurrenceRule: CalRecurrenceRule): void;

  setStartDate(startDate: NSDate): void;

  setEndDate(endDate: NSDate): void;
}

declare class CalNthWeekDay extends NSObject implements NSCopying {
  readonly dayOfTheWeek: number;

  readonly weekNumber: number;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class CalCalendarStore extends NSObject {
  static defaultCalendarStore(): CalCalendarStore;

  calendars(): NSArray;

  calendarWithUID(UID: string): CalCalendar;

  saveCalendarError(calendar: CalCalendar, error: interop.PointerConvertible): boolean;

  removeCalendarError(calendar: CalCalendar, error: interop.PointerConvertible): boolean;

  eventsWithPredicate(predicate: NSPredicate): NSArray;

  eventWithUIDOccurrence(uid: string, date: NSDate): CalEvent;

  tasksWithPredicate(predicate: NSPredicate): NSArray;

  taskWithUID(uid: string): CalTask;

  saveEventSpanError(event: CalEvent, span: interop.Enum<typeof CalSpan>, error: interop.PointerConvertible): boolean;

  removeEventSpanError(event: CalEvent, span: interop.Enum<typeof CalSpan>, error: interop.PointerConvertible): boolean;

  saveTaskError(task: CalTask, error: interop.PointerConvertible): boolean;

  removeTaskError(task: CalTask, error: interop.PointerConvertible): boolean;

  static eventPredicateWithStartDateEndDateCalendars(startDate: NSDate, endDate: NSDate, calendars: NSArray<interop.Object> | Array<interop.Object>): NSPredicate;

  static eventPredicateWithStartDateEndDateUIDCalendars(startDate: NSDate, endDate: NSDate, UID: string, calendars: NSArray<interop.Object> | Array<interop.Object>): NSPredicate;

  static taskPredicateWithCalendars(calendars: NSArray<interop.Object> | Array<interop.Object>): NSPredicate;

  static taskPredicateWithUncompletedTasks(calendars: NSArray<interop.Object> | Array<interop.Object>): NSPredicate;

  static taskPredicateWithUncompletedTasksDueBeforeCalendars(dueDate: NSDate, calendars: NSArray<interop.Object> | Array<interop.Object>): NSPredicate;

  static taskPredicateWithTasksCompletedSinceCalendars(completedSince: NSDate, calendars: NSArray<interop.Object> | Array<interop.Object>): NSPredicate;
}

declare class CalRecurrenceEnd extends NSObject implements NSCopying {
  static recurrenceEndWithEndDate(endDate: NSDate): interop.Object;

  static recurrenceEndWithOccurrenceCount(occurrenceCount: number): interop.Object;

  readonly usesEndDate: boolean;

  readonly endDate: NSDate;

  readonly occurrenceCount: number;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class CalTask extends CalCalendarItem {
  static task(): interop.Object;

  dueDate: NSDate;

  priority: number;

  isCompleted: boolean;

  completedDate: NSDate;

  setDueDate(dueDate: NSDate): void;

  setPriority(priority: number): void;

  setIsCompleted(isCompleted: boolean): void;

  setCompletedDate(completedDate: NSDate): void;
}

declare class CalRecurrenceRule extends NSObject implements NSCopying {
  initDailyRecurrenceWithIntervalEnd(interval: number, end: CalRecurrenceEnd): this;

  initWeeklyRecurrenceWithIntervalEnd(interval: number, end: CalRecurrenceEnd): this;

  initWeeklyRecurrenceWithIntervalForDaysOfTheWeekEnd(interval: number, days: NSArray<interop.Object> | Array<interop.Object>, end: CalRecurrenceEnd): this;

  initMonthlyRecurrenceWithIntervalEnd(interval: number, end: CalRecurrenceEnd): this;

  initMonthlyRecurrenceWithIntervalForDaysOfTheMonthEnd(interval: number, monthDays: NSArray<interop.Object> | Array<interop.Object>, end: CalRecurrenceEnd): this;

  initMonthlyRecurrenceWithIntervalForDayOfTheWeekForWeekOfTheMonthEnd(interval: number, weekDay: number, monthWeek: number, end: CalRecurrenceEnd): this;

  initYearlyRecurrenceWithIntervalEnd(interval: number, end: CalRecurrenceEnd): this;

  initYearlyRecurrenceWithIntervalForMonthsOfTheYearEnd(interval: number, months: NSArray<interop.Object> | Array<interop.Object>, end: CalRecurrenceEnd): this;

  initYearlyRecurrenceWithIntervalForDayOfTheWeekForWeekOfTheMonthForMonthsOfTheYearEnd(interval: number, weekDay: number, monthWeek: number, months: NSArray<interop.Object> | Array<interop.Object>, end: CalRecurrenceEnd): this;

  readonly recurrenceEnd: CalRecurrenceEnd;

  readonly recurrenceType: interop.Enum<typeof CalRecurrenceType>;

  readonly recurrenceInterval: number;

  readonly firstDayOfTheWeek: number;

  readonly daysOfTheWeek: NSArray;

  readonly daysOfTheMonth: NSArray;

  readonly nthWeekDaysOfTheMonth: NSArray;

  readonly monthsOfTheYear: NSArray;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}


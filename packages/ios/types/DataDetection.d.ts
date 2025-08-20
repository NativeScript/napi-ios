/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare class DDMatchMoneyAmount extends DDMatch {
  readonly currency: string;

  readonly amount: number;
}

declare class DDMatchCalendarEvent extends DDMatch {
  readonly allDay: boolean;

  readonly startDate: NSDate;

  readonly startTimeZone: NSTimeZone;

  readonly endDate: NSDate;

  readonly endTimeZone: NSTimeZone;

  isAllDay(): boolean;
}

declare class DDMatchPostalAddress extends DDMatch {
  readonly street: string;

  readonly city: string;

  readonly state: string;

  readonly postalCode: string;

  readonly country: string;
}

declare class DDMatchLink extends DDMatch {
  readonly URL: NSURL;
}

declare class DDMatchFlightNumber extends DDMatch {
  readonly airline: string;

  readonly flightNumber: string;
}

declare class DDMatchEmailAddress extends DDMatch {
  readonly emailAddress: string;

  readonly label: string;
}

declare class DDMatchPhoneNumber extends DDMatch {
  readonly phoneNumber: string;

  readonly label: string;
}

declare class DDMatchShipmentTrackingNumber extends DDMatch {
  readonly carrier: string;

  readonly trackingNumber: string;
}

declare class DDMatch extends NSObject {
  readonly matchedString: string;
}


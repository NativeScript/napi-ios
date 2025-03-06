/// <reference types="@nativescript/objc-node-api" />

declare const IntentsVersionNumber: number;

declare const IntentsVersionString: interop.Pointer;

declare const INGetRestaurantGuestIntentResponseCode: {
  Success: 0,
  Failure: 1,
};

declare const INGetUserCurrentRestaurantReservationBookingsIntentResponseCode: {
  Success: 0,
  Failure: 1,
  FailureRequestUnsatisfiable: 2,
  Unspecified: 3,
};

declare const INGetAvailableRestaurantReservationBookingsIntentCode: {
  Success: 0,
  Failure: 1,
  FailureRequestUnsatisfiable: 2,
  FailureRequestUnspecified: 3,
};

declare const INBookRestaurantReservationIntentCode: {
  Success: 0,
  Denied: 1,
  Failure: 2,
  FailureRequiringAppLaunch: 3,
  FailureRequiringAppLaunchMustVerifyCredentials: 4,
  FailureRequiringAppLaunchServiceTemporarilyUnavailable: 5,
};

declare const INRestaurantReservationUserBookingStatus: {
  Pending: 0,
  Confirmed: 1,
  Denied: 2,
};

declare const INGetAvailableRestaurantReservationBookingDefaultsIntentResponseCode: {
  Success: 0,
  Failure: 1,
  Unspecified: 2,
};


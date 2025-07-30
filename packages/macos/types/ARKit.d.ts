/// <reference types="@nativescript/objc-node-api" />

declare const ar_error_domain: interop.Pointer;

declare const ar_device_anchor_query_status_t: {
  ar_device_anchor_query_status_success: 0,
  ar_device_anchor_query_status_failure: 1,
};

declare const ar_device_anchor_tracking_state_t: {
  ar_device_anchor_tracking_state_untracked: 0,
  ar_device_anchor_tracking_state_orientation_tracked: 1,
  ar_device_anchor_tracking_state_tracked: 2,
};

declare const ar_world_tracking_error_code_t: {
  ar_world_tracking_error_code_add_anchor_failed: 200,
  ar_world_tracking_error_code_anchor_max_limit_reached: 201,
  ar_world_tracking_error_code_remove_anchor_failed: 202,
};

declare const ar_data_provider_state_t: {
  ar_data_provider_state_initialized: 0,
  ar_data_provider_state_running: 1,
  ar_data_provider_state_paused: 2,
  ar_data_provider_state_stopped: 3,
};

declare const ar_authorization_type_t: {
  ar_authorization_type_none: 0,
  ar_authorization_type_hand_tracking: 1,
  ar_authorization_type_world_sensing: 2,
  ar_authorization_type_camera_access: 8,
};

declare const ar_authorization_status_t: {
  ar_authorization_status_not_determined: 0,
  ar_authorization_status_allowed: 1,
  ar_authorization_status_denied: 2,
};

declare const ar_session_error_code_t: {
  ar_session_error_code_data_provider_not_authorized: 100,
  ar_session_error_code_data_provider_failed_to_run: 101,
};

declare function ar_retain(object: interop.PointerConvertible): interop.Pointer;

declare function ar_release(object: interop.PointerConvertible): void;

declare function ar_anchor_get_origin_from_anchor_transform(anchor: NSObject): simd_float4x4;

declare function ar_anchor_get_identifier(anchor: NSObject, out_identifier: interop.PointerConvertible): void;

declare function ar_anchor_get_timestamp(anchor: NSObject): number;

declare function ar_trackable_anchor_is_tracked(anchor: NSObject): boolean;

declare function ar_authorization_result_get_authorization_type(authorization_result: NSObject): interop.Enum<typeof ar_authorization_type_t>;

declare function ar_authorization_result_get_status(authorization_result: NSObject): interop.Enum<typeof ar_authorization_status_t>;

declare function ar_authorization_results_get_count(authorization_results: NSObject): number;

declare function ar_authorization_results_enumerate_results(authorization_results: NSObject, authorization_results_enumerator: (p1: NSObject) => boolean): void;

declare function ar_authorization_results_enumerate_results_f(authorization_results: NSObject, context: interop.PointerConvertible, authorization_results_enumerator_function: (p1: interop.PointerConvertible, p2: NSObject) => boolean): void;

declare function ar_data_provider_get_state(data_provider: NSObject): interop.Enum<typeof ar_data_provider_state_t>;

declare function ar_data_provider_get_required_authorization_type(data_provider: NSObject): interop.Enum<typeof ar_authorization_type_t>;

declare function ar_data_providers_create(): NSObject;

declare function ar_data_providers_create_with_data_providers(data_provider: NSObject): NSObject;

declare function ar_data_providers_add_data_provider(data_providers: NSObject, data_provider_to_add: NSObject): void;

declare function ar_data_providers_add_data_providers(data_providers: NSObject, data_providers_to_add: NSObject): void;

declare function ar_data_providers_remove_data_provider(data_providers: NSObject, data_provider_to_remove: NSObject): void;

declare function ar_data_providers_remove_data_providers(data_providers: NSObject, data_providers_to_remove: NSObject): void;

declare function ar_data_providers_get_count(data_providers: NSObject): number;

declare function ar_data_providers_enumerate_data_providers(data_providers: NSObject, data_providers_enumerator: (p1: NSObject) => boolean): void;

declare function ar_data_providers_enumerate_data_providers_f(data_providers: NSObject, context: interop.PointerConvertible, data_providers_enumerator_function: (p1: interop.PointerConvertible, p2: NSObject) => boolean): void;

declare function ar_error_get_error_code(error: NSObject): number;

declare function ar_error_copy_cf_error(error: NSObject): interop.Object;

declare function ar_session_create_with_device(device: NSObject): NSObject;

declare function ar_session_set_data_provider_state_change_handler(session: NSObject, queue: NSObject, data_provider_state_change_handler: (p1: NSObject, p2: interop.Enum<typeof ar_data_provider_state_t>, p3: NSObject, p4: NSObject) => void): void;

declare function ar_session_set_data_provider_state_change_handler_f(session: NSObject, queue: NSObject, context: interop.PointerConvertible, data_provider_state_change_handler_function: (p1: interop.PointerConvertible, p2: NSObject, p3: interop.Enum<typeof ar_data_provider_state_t>, p4: NSObject, p5: NSObject) => void): void;

declare function ar_session_run(session: NSObject, data_providers: NSObject): void;

declare function ar_session_stop(session: NSObject): void;

declare function ar_session_copy_data_providers(session: NSObject): NSObject;

declare function ar_world_tracking_configuration_create(): NSObject;

declare function ar_world_tracking_provider_create(world_tracking_configuration: NSObject): NSObject;

declare function ar_world_tracking_provider_is_supported(): boolean;

declare function ar_device_anchor_create(): NSObject;

declare function ar_device_anchor_get_identifier(anchor: NSObject, out_identifier: interop.PointerConvertible): void;

declare function ar_device_anchor_get_origin_from_anchor_transform(anchor: NSObject): simd_float4x4;

declare function ar_device_anchor_get_timestamp(anchor: NSObject): number;

declare function ar_device_anchor_is_tracked(anchor: NSObject): boolean;

declare function ar_device_anchor_get_tracking_state(anchor: NSObject): interop.Enum<typeof ar_device_anchor_tracking_state_t>;

declare function ar_world_tracking_provider_query_device_anchor_at_timestamp(world_tracking_provider: NSObject, timestamp: number, device_anchor: NSObject): interop.Enum<typeof ar_device_anchor_query_status_t>;

declare function ar_world_tracking_provider_get_required_authorization_type(): interop.Enum<typeof ar_authorization_type_t>;

declare interface OS_ar_world_tracking_provider extends OS_ar_data_provider {
}

declare class OS_ar_world_tracking_provider extends NativeObject implements OS_ar_world_tracking_provider {
}

declare interface OS_ar_world_tracking_configuration extends NSObjectProtocol {
}

declare class OS_ar_world_tracking_configuration extends NativeObject implements OS_ar_world_tracking_configuration {
}

declare interface OS_ar_world_anchor extends OS_ar_trackable_anchor {
}

declare class OS_ar_world_anchor extends NativeObject implements OS_ar_world_anchor {
}

declare interface OS_ar_strings extends NSObjectProtocol {
}

declare class OS_ar_strings extends NativeObject implements OS_ar_strings {
}

declare interface OS_ar_session extends NSObjectProtocol {
}

declare class OS_ar_session extends NativeObject implements OS_ar_session {
}

declare interface OS_ar_device extends NSObjectProtocol {
}

declare class OS_ar_device extends NativeObject implements OS_ar_device {
}

declare interface OS_ar_error extends NSObjectProtocol {
}

declare class OS_ar_error extends NativeObject implements OS_ar_error {
}

declare interface OS_ar_trackable_anchor extends OS_ar_anchor {
}

declare class OS_ar_trackable_anchor extends NativeObject implements OS_ar_trackable_anchor {
}

declare interface OS_ar_anchor extends NSObjectProtocol {
}

declare class OS_ar_anchor extends NativeObject implements OS_ar_anchor {
}

declare interface OS_ar_data_provider extends NSObjectProtocol {
}

declare class OS_ar_data_provider extends NativeObject implements OS_ar_data_provider {
}

declare interface OS_ar_authorization_results extends NSObjectProtocol {
}

declare class OS_ar_authorization_results extends NativeObject implements OS_ar_authorization_results {
}

declare interface OS_ar_data_providers extends NSObjectProtocol {
}

declare class OS_ar_data_providers extends NativeObject implements OS_ar_data_providers {
}

declare interface OS_ar_device_anchor extends OS_ar_trackable_anchor {
}

declare class OS_ar_device_anchor extends NativeObject implements OS_ar_device_anchor {
}

declare interface OS_ar_world_anchors extends NSObjectProtocol {
}

declare class OS_ar_world_anchors extends NativeObject implements OS_ar_world_anchors {
}

declare interface OS_ar_authorization_result extends NSObjectProtocol {
}

declare class OS_ar_authorization_result extends NativeObject implements OS_ar_authorization_result {
}


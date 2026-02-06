/// <reference types="@nativescript/objc-node-api" />

declare const ar_accessory_location_name_grip: string;

declare const ar_error_domain: interop.Pointer;

declare const ar_accessory_location_name_aim: string;

declare const ar_accessory_location_name_grip_surface: string;

declare const ar_camera_type_t: {
  ar_camera_type_main: 0,
};

declare const ar_world_anchor_sharing_availability_t: {
  ar_world_anchor_sharing_availability_available: 0,
  ar_world_anchor_sharing_availability_unavailable: 1,
};

declare const ar_plane_classification_t: {
  ar_plane_classification_status_not_available: 0,
  ar_plane_classification_status_undetermined: 1,
  ar_plane_classification_status_unknown: 2,
  ar_plane_classification_wall: 3,
  ar_plane_classification_floor: 4,
  ar_plane_classification_ceiling: 5,
  ar_plane_classification_table: 6,
  ar_plane_classification_seat: 7,
  ar_plane_classification_window: 8,
  ar_plane_classification_door: 9,
};

declare const ar_scene_reconstruction_mode_t: {
  ar_scene_reconstruction_mode_default: 0,
  ar_scene_reconstruction_mode_classification: 1,
};

declare const ar_hand_chirality_t: {
  ar_hand_chirality_right: 0,
  ar_hand_chirality_left: 1,
};

declare const ar_hand_anchor_query_status_t: {
  ar_hand_anchor_query_status_success: 0,
  ar_hand_anchor_query_status_failure: 1,
};

declare const ar_hand_skeleton_joint_name_t: {
  ar_hand_skeleton_joint_name_wrist: 0,
  ar_hand_skeleton_joint_name_thumb_knuckle: 1,
  ar_hand_skeleton_joint_name_thumb_intermediate_base: 2,
  ar_hand_skeleton_joint_name_thumb_intermediate_tip: 3,
  ar_hand_skeleton_joint_name_thumb_tip: 4,
  ar_hand_skeleton_joint_name_index_finger_metacarpal: 5,
  ar_hand_skeleton_joint_name_index_finger_knuckle: 6,
  ar_hand_skeleton_joint_name_index_finger_intermediate_base: 7,
  ar_hand_skeleton_joint_name_index_finger_intermediate_tip: 8,
  ar_hand_skeleton_joint_name_index_finger_tip: 9,
  ar_hand_skeleton_joint_name_middle_finger_metacarpal: 10,
  ar_hand_skeleton_joint_name_middle_finger_knuckle: 11,
  ar_hand_skeleton_joint_name_middle_finger_intermediate_base: 12,
  ar_hand_skeleton_joint_name_middle_finger_intermediate_tip: 13,
  ar_hand_skeleton_joint_name_middle_finger_tip: 14,
  ar_hand_skeleton_joint_name_ring_finger_metacarpal: 15,
  ar_hand_skeleton_joint_name_ring_finger_knuckle: 16,
  ar_hand_skeleton_joint_name_ring_finger_intermediate_base: 17,
  ar_hand_skeleton_joint_name_ring_finger_intermediate_tip: 18,
  ar_hand_skeleton_joint_name_ring_finger_tip: 19,
  ar_hand_skeleton_joint_name_little_finger_metacarpal: 20,
  ar_hand_skeleton_joint_name_little_finger_knuckle: 21,
  ar_hand_skeleton_joint_name_little_finger_intermediate_base: 22,
  ar_hand_skeleton_joint_name_little_finger_intermediate_tip: 23,
  ar_hand_skeleton_joint_name_little_finger_tip: 24,
  ar_hand_skeleton_joint_name_forearm_wrist: 25,
  ar_hand_skeleton_joint_name_forearm_arm: 26,
};

declare const ar_accessory_anchor_tracking_state_t: {
  ar_accessory_anchor_tracking_state_untracked: 0,
  ar_accessory_anchor_tracking_state_orientation_tracked: 1,
  ar_accessory_anchor_tracking_state_position_orientation_tracked: 2,
  ar_accessory_anchor_tracking_state_position_orientation_tracked_low_accuracy: 3,
};

declare const ar_accessory_tracking_error_code_t: {
  ar_accessory_tracking_error_code_accessory_loading_failed: 1200,
};

declare const ar_transform_correction_t: {
  ar_transform_correction_none: 0,
  ar_transform_correction_rendered: 1,
};

declare const ar_surface_classification_t: {
  ar_surface_classification_none: 0,
  ar_surface_classification_wall: 1,
  ar_surface_classification_floor: 2,
  ar_surface_classification_ceiling: 3,
  ar_surface_classification_table: 4,
  ar_surface_classification_seat: 5,
  ar_surface_classification_window: 6,
  ar_surface_classification_door: 7,
  ar_surface_classification_stairs: 8,
  ar_surface_classification_bed: 9,
  ar_surface_classification_cabinet: 10,
  ar_surface_classification_home_appliance: 11,
  ar_surface_classification_tv: 12,
  ar_surface_classification_plant: 13,
};

declare const ar_authorization_status_t: {
  ar_authorization_status_not_determined: 0,
  ar_authorization_status_allowed: 1,
  ar_authorization_status_denied: 2,
};

declare const ar_barcode_detection_symbology_t: {
  ar_barcode_detection_symbology_none: 0,
  ar_barcode_detection_symbology_aztec: 1,
  ar_barcode_detection_symbology_codabar: 2,
  ar_barcode_detection_symbology_code_39: 4,
  ar_barcode_detection_symbology_code_39_checksum: 8,
  ar_barcode_detection_symbology_code_39_full_ascii: 16,
  ar_barcode_detection_symbology_code_39_full_ascii_checksum: 32,
  ar_barcode_detection_symbology_code_93: 64,
  ar_barcode_detection_symbology_code_93i: 128,
  ar_barcode_detection_symbology_code_128: 256,
  ar_barcode_detection_symbology_data_matrix: 512,
  ar_barcode_detection_symbology_ean_8: 1024,
  ar_barcode_detection_symbology_ean_13: 2048,
  ar_barcode_detection_symbology_gs1_databar: 4096,
  ar_barcode_detection_symbology_gs1_databar_expanded: 8192,
  ar_barcode_detection_symbology_gs1_databar_limited: 16384,
  ar_barcode_detection_symbology_itf: 32768,
  ar_barcode_detection_symbology_itf_14: 65536,
  ar_barcode_detection_symbology_itf_checksum: 131072,
  ar_barcode_detection_symbology_micropdf417: 262144,
  ar_barcode_detection_symbology_microqr: 524288,
  ar_barcode_detection_symbology_msi_plessey: 1048576,
  ar_barcode_detection_symbology_pdf417: 2097152,
  ar_barcode_detection_symbology_qr: 4194304,
  ar_barcode_detection_symbology_upce: 8388608,
};

declare const ar_session_error_code_t: {
  ar_session_error_code_data_provider_not_authorized: 100,
  ar_session_error_code_data_provider_failed_to_run: 101,
};

declare const ar_device_anchor_tracking_state_t: {
  ar_device_anchor_tracking_state_untracked: 0,
  ar_device_anchor_tracking_state_orientation_tracked: 1,
  ar_device_anchor_tracking_state_tracked: 2,
};

declare const ar_accessory_source_type_t: {
  ar_accessory_source_type_device: 1,
};

declare const ar_accessory_chirality_t: {
  ar_accessory_chirality_unspecified: 0,
  ar_accessory_chirality_left: 1,
  ar_accessory_chirality_right: 2,
};

declare const ar_camera_region_camera_enhancement_t: {
  ar_camera_region_stabilization: 0,
  ar_camera_region_contrast_and_vibrancy: 1,
};

declare const ar_hand_fidelity_t: {
  ar_hand_fidelity_nominal: 0,
  ar_hand_fidelity_high: 1,
};

declare const ar_object_tracking_error_code_t: {
  ar_object_tracking_error_code_reference_object_loading_failed: 1101,
};

declare const ar_data_provider_state_t: {
  ar_data_provider_state_initialized: 0,
  ar_data_provider_state_running: 1,
  ar_data_provider_state_paused: 2,
  ar_data_provider_state_stopped: 3,
};

declare const ar_plane_alignment_t: {
  ar_plane_alignment_none: 0,
  ar_plane_alignment_horizontal: 1,
  ar_plane_alignment_vertical: 2,
  ar_plane_alignment_slanted: 4,
};

declare const ar_mesh_classification_t: {
  ar_mesh_classification_none: 0,
  ar_mesh_classification_wall: 1,
  ar_mesh_classification_floor: 2,
  ar_mesh_classification_ceiling: 3,
  ar_mesh_classification_table: 4,
  ar_mesh_classification_seat: 5,
  ar_mesh_classification_window: 6,
  ar_mesh_classification_door: 7,
  ar_mesh_classification_stairs: 8,
  ar_mesh_classification_bed: 9,
  ar_mesh_classification_cabinet: 10,
  ar_mesh_classification_home_appliance: 11,
  ar_mesh_classification_tv: 12,
  ar_mesh_classification_plant: 13,
};

declare const ar_world_tracking_error_code_t: {
  ar_world_tracking_error_code_add_anchor_failed: 200,
  ar_world_tracking_error_code_anchor_max_limit_reached: 201,
  ar_world_tracking_error_code_remove_anchor_failed: 202,
};

declare const ar_device_anchor_query_status_t: {
  ar_device_anchor_query_status_success: 0,
  ar_device_anchor_query_status_failure: 1,
};

declare const ar_camera_rectification_type_t: {
  ar_camera_rectification_type_mono: 0,
  ar_camera_rectification_type_stereo_corrected: 1,
};

declare const ar_camera_position_t: {
  ar_camera_position_left: 1,
  ar_camera_position_right: 2,
};

declare const ar_camera_region_error_code_t: {
  ar_camera_region_error_code_add_anchor_failed: 1300,
  ar_camera_region_error_code_anchor_max_limit_reached: 1301,
  ar_camera_region_error_code_remove_anchor_failed: 1302,
};

declare const ar_authorization_type_t: {
  ar_authorization_type_none: 0,
  ar_authorization_type_hand_tracking: 1,
  ar_authorization_type_world_sensing: 2,
  ar_authorization_type_camera_access: 8,
  ar_authorization_type_accessory_tracking: 32,
};

declare const ar_geometry_primitive_type_t: {
  ar_geometry_primitive_type_line: 0,
  ar_geometry_primitive_type_triangle: 1,
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

declare function ar_session_create(): NSObject;

declare function ar_session_set_data_provider_state_change_handler(session: NSObject, queue: NSObject, data_provider_state_change_handler: (p1: NSObject, p2: interop.Enum<typeof ar_data_provider_state_t>, p3: NSObject, p4: NSObject) => void): void;

declare function ar_session_set_data_provider_state_change_handler_f(session: NSObject, queue: NSObject, context: interop.PointerConvertible, data_provider_state_change_handler_function: (p1: interop.PointerConvertible, p2: NSObject, p3: interop.Enum<typeof ar_data_provider_state_t>, p4: NSObject, p5: NSObject) => void): void;

declare function ar_session_run(session: NSObject, data_providers: NSObject): void;

declare function ar_session_stop(session: NSObject): void;

declare function ar_session_copy_data_providers(session: NSObject): NSObject;

declare function ar_session_set_authorization_update_handler(session: NSObject, authorization_update_queue: NSObject, authorization_update_handler: (p1: NSObject) => void): void;

declare function ar_session_set_authorization_update_handler_f(session: NSObject, authorization_update_queue: NSObject, context: interop.PointerConvertible, authorization_update_handler_function: (p1: interop.PointerConvertible, p2: NSObject) => void): void;

declare function ar_session_query_authorization_results(session: NSObject, authorization_types: interop.Enum<typeof ar_authorization_type_t>, results_handler: (p1: NSObject, p2: NSObject) => void): void;

declare function ar_session_request_authorization(session: NSObject, authorization_types: interop.Enum<typeof ar_authorization_type_t>, results_handler: (p1: NSObject, p2: NSObject) => void): void;

declare function ar_session_query_authorization_results_f(session: NSObject, authorization_types: interop.Enum<typeof ar_authorization_type_t>, context: interop.PointerConvertible, results_handler_function: (p1: interop.PointerConvertible, p2: NSObject, p3: NSObject) => void): void;

declare function ar_session_request_authorization_f(session: NSObject, authorization_types: interop.Enum<typeof ar_authorization_type_t>, context: interop.PointerConvertible, results_handler_function: (p1: interop.PointerConvertible, p2: NSObject, p3: NSObject) => void): void;

declare function ar_strings_get_count(strings: NSObject): number;

declare function ar_strings_enumerate_strings(strings: NSObject, strings_enumerator: (p1: string) => boolean): void;

declare function ar_strings_enumerate_strings_f(strings: NSObject, context: interop.PointerConvertible, strings_enumerator_function: (p1: interop.PointerConvertible, p2: string) => boolean): void;

declare function ar_accessory_is_equal_to_accessory(accessory: NSObject, other_accessory: NSObject): boolean;

declare function ar_accessory_get_identifier(accessory: NSObject, out_identifier: interop.PointerConvertible): void;

declare function ar_accessory_get_inherent_chirality(accessory: NSObject): interop.Enum<typeof ar_accessory_chirality_t>;

declare function ar_accessory_get_name(accessory: NSObject): string;

declare function ar_accessory_copy_location_names(accessory: NSObject): NSObject;

declare function ar_accessory_get_usdz_file_path(accessory: NSObject): interop.Object;

declare function ar_accessory_load_from_device(device: GCDevice, completion_handler: (p1: GCDevice, p2: boolean, p3: NSObject, p4: NSObject) => void): void;

declare function ar_accessory_load_from_device_f(device: GCDevice, context: interop.PointerConvertible, completion_handler_function: (p1: interop.PointerConvertible, p2: GCDevice, p3: boolean, p4: NSObject, p5: NSObject) => void): void;

declare function ar_accessory_get_source_type(accessory: NSObject): interop.Enum<typeof ar_accessory_source_type_t>;

declare function ar_accessory_get_source_device(accessory: NSObject): GCDevice;

declare function ar_accessories_create(): NSObject;

declare function ar_accessories_add_accessory(accessories: NSObject, accessory_to_add: NSObject): void;

declare function ar_accessories_add_accessories(accessories: NSObject, accessories_to_add: NSObject): void;

declare function ar_accessories_remove_accessory(accessories: NSObject, accessory_to_remove: NSObject): void;

declare function ar_accessories_remove_accessories(accessories: NSObject, accessories_to_remove: NSObject): void;

declare function ar_accessories_get_count(accessories: NSObject): number;

declare function ar_accessories_enumerate_accessories(accessories: NSObject, accessories_enumerator: (p1: NSObject) => boolean): void;

declare function ar_accessories_enumerate_accessories_f(accessories: NSObject, context: interop.PointerConvertible, accessories_enumerator_function: (p1: interop.PointerConvertible, p2: NSObject) => boolean): void;

declare function ar_accessory_anchor_create(): NSObject;

declare function ar_accessory_anchor_is_equal_to_accessory_anchor(anchor: NSObject, other_anchor: NSObject): boolean;

declare function ar_accessory_anchor_get_accessory(accessory_anchor: NSObject): NSObject;

declare function ar_accessory_anchor_get_tracking_state(accessory_anchor: NSObject): interop.Enum<typeof ar_accessory_anchor_tracking_state_t>;

declare function ar_accessory_anchor_is_held(accessory_anchor: NSObject): boolean;

declare function ar_accessory_anchor_get_held_chirality(accessory_anchor: NSObject): interop.Enum<typeof ar_accessory_chirality_t>;

declare function ar_accessory_anchor_get_velocity(accessory_anchor: NSObject): unknown /* ext vector */;

declare function ar_accessory_anchor_get_angular_velocity(accessory_anchor: NSObject): unknown /* ext vector */;

declare function ar_accessory_anchor_get_identifier(accessory_anchor: NSObject, out_identifier: interop.PointerConvertible): void;

declare function ar_accessory_anchor_get_origin_from_anchor_transform(accessory_anchor: NSObject): simd_float4x4;

declare function ar_accessory_anchor_get_origin_from_anchor_transform_with_correction(accessory_anchor: NSObject, transform_correction: interop.Enum<typeof ar_transform_correction_t>): simd_float4x4;

declare function ar_accessory_anchor_get_anchor_from_location_transform_with_correction(accessory_anchor: NSObject, location_name: string, transform_correction: interop.Enum<typeof ar_transform_correction_t>): simd_float4x4;

declare function ar_accessory_anchor_get_timestamp(accessory_anchor: NSObject): number;

declare function ar_accessory_anchor_is_tracked(accessory_anchor: NSObject): boolean;

declare function ar_accessory_anchors_get_count(accessory_anchors: NSObject): number;

declare function ar_accessory_anchors_enumerate_anchors(accessory_anchors: NSObject, accessory_anchors_enumerator: (p1: NSObject) => boolean): void;

declare function ar_accessory_anchors_enumerate_anchors_f(accessory_anchors: NSObject, context: interop.PointerConvertible, accessory_anchors_enumerator_function: (p1: interop.PointerConvertible, p2: NSObject) => boolean): void;

declare function ar_accessory_tracking_configuration_create(): NSObject;

declare function ar_accessory_tracking_configuration_set_accessories(configuration: NSObject, accessories: NSObject): void;

declare function ar_accessory_tracking_provider_create(accessory_tracking_configuration: NSObject): NSObject;

declare function ar_accessory_tracking_provider_set_update_handler(accessory_tracking_provider: NSObject, accessory_tracking_updates_queue: NSObject, accessory_tracking_update_handler: (p1: NSObject, p2: NSObject, p3: NSObject) => void): void;

declare function ar_accessory_tracking_provider_set_update_handler_f(accessory_tracking_provider: NSObject, accessory_tracking_updates_queue: NSObject, context: interop.PointerConvertible, accessory_tracking_update_handler_function: (p1: interop.PointerConvertible, p2: NSObject, p3: NSObject, p4: NSObject) => void): void;

declare function ar_accessory_tracking_provider_is_supported(): boolean;

declare function ar_accessory_tracking_provider_get_required_authorization_type(): interop.Enum<typeof ar_authorization_type_t>;

declare function ar_accessory_tracking_provider_get_latest_anchors(accessory_tracking_provider: NSObject): NSObject;

declare function ar_accessory_tracking_provider_predict_anchor_at_timestamp(accessory_tracking_provider: NSObject, anchor: NSObject, timestamp: number, predicted_anchor: NSObject): boolean;

declare function ar_data_get_bytes(data: NSObject): interop.Pointer;

declare function ar_data_get_length(data: NSObject): number;

declare function ar_barcode_anchor_get_symbology(barcode_anchor: NSObject): interop.Enum<typeof ar_barcode_detection_symbology_t>;

declare function ar_barcode_anchor_get_payload_string_value(barcode_anchor: NSObject): string;

declare function ar_barcode_anchor_copy_payload_data(barcode_anchor: NSObject): NSObject;

declare function ar_barcode_anchor_get_extent(barcode_anchor: NSObject): unknown /* ext vector */;

declare function ar_barcode_anchor_get_identifier(anchor: NSObject, out_identifier: interop.PointerConvertible): void;

declare function ar_barcode_anchor_get_origin_from_anchor_transform(anchor: NSObject): simd_float4x4;

declare function ar_barcode_anchor_get_timestamp(anchor: NSObject): number;

declare function ar_barcode_anchors_get_count(barcode_anchors: NSObject): number;

declare function ar_barcode_anchors_enumerate_anchors(barcode_anchors: NSObject, barcode_anchors_enumerator: (p1: NSObject) => boolean): void;

declare function ar_barcode_anchors_enumerate_anchors_f(barcode_anchors: NSObject, context: interop.PointerConvertible, barcode_anchors_enumerator_function: (p1: interop.PointerConvertible, p2: NSObject) => boolean): void;

declare function ar_barcode_detection_configuration_create(): NSObject;

declare function ar_barcode_detection_configuration_set_detection_symbology(barcode_detection_configuration: NSObject, symbology: interop.Enum<typeof ar_barcode_detection_symbology_t>): void;

declare function ar_barcode_detection_provider_create(barcode_detection_configuration: NSObject): NSObject;

declare function ar_barcode_detection_provider_is_supported(): boolean;

declare function ar_barcode_detection_provider_set_update_handler(barcode_detection_provider: NSObject, barcode_detection_updates_queue: NSObject, barcode_detection_update_handler: (p1: NSObject, p2: NSObject, p3: NSObject) => void): void;

declare function ar_barcode_detection_provider_set_update_handler_f(barcode_detection_provider: NSObject, barcode_detection_updates_queue: NSObject, context: interop.PointerConvertible, barcode_detection_update_handler_function: (p1: interop.PointerConvertible, p2: NSObject, p3: NSObject, p4: NSObject) => void): void;

declare function ar_barcode_detection_provider_get_required_authorization_type(): interop.Enum<typeof ar_authorization_type_t>;

declare function ar_camera_region_anchor_is_equal_to_camera_region_anchor(camera_region_anchor: NSObject, other_camera_region_anchor: NSObject): boolean;

declare function ar_camera_region_anchor_create_with_parameters(origin_from_anchor_transform: simd_float4x4, width: number, height: number, camera_enhancement: interop.Enum<typeof ar_camera_region_camera_enhancement_t>): NSObject;

declare function ar_camera_region_anchor_get_width(camera_region_anchor: NSObject): number;

declare function ar_camera_region_anchor_get_height(camera_region_anchor: NSObject): number;

declare function ar_camera_region_anchor_get_camera_enhancement(camera_region_anchor: NSObject): interop.Enum<typeof ar_camera_region_camera_enhancement_t>;

declare function ar_camera_region_anchor_get_pixel_buffer(camera_region_anchor: NSObject): interop.Object;

declare function ar_camera_region_anchor_get_identifier(camera_region_anchor: NSObject, out_identifier: interop.PointerConvertible): void;

declare function ar_camera_region_anchor_get_origin_from_anchor_transform(camera_region_anchor: NSObject): simd_float4x4;

declare function ar_camera_region_anchor_get_timestamp(camera_region_anchor: NSObject): number;

declare function ar_camera_region_anchors_get_count(camera_region_anchors: NSObject): number;

declare function ar_camera_region_anchors_enumerate_anchors(camera_region_anchors: NSObject, camera_region_anchors_enumerator: (p1: NSObject) => boolean): void;

declare function ar_camera_region_anchors_enumerate_anchors_f(camera_region_anchors: NSObject, context: interop.PointerConvertible, camera_region_anchors_enumerator_function: (p1: interop.PointerConvertible, p2: NSObject) => boolean): void;

declare function ar_camera_region_configuration_create(): NSObject;

declare function ar_camera_region_provider_create(camera_region_configuration: NSObject): NSObject;

declare function ar_camera_region_provider_is_supported(): boolean;

declare function ar_camera_region_provider_get_required_authorization_type(): interop.Enum<typeof ar_authorization_type_t>;

declare function ar_camera_region_provider_set_update_handler_for_anchor_with_identifier(camera_region_provider: NSObject, camera_region_anchor_identifier: interop.PointerConvertible, camera_region_anchor_updates_queue: NSObject, camera_region_anchor_update_handler: (p1: NSObject, p2: NSObject, p3: NSObject) => void): void;

declare function ar_camera_region_provider_set_update_handler_for_anchor_with_identifier_f(camera_region_provider: NSObject, camera_region_anchor_identifier: interop.PointerConvertible, camera_region_anchor_updates_queue: NSObject, context: interop.PointerConvertible, camera_region_anchor_update_handler_function: (p1: interop.PointerConvertible, p2: NSObject, p3: NSObject, p4: NSObject) => void): void;

declare function ar_camera_region_provider_add_camera_region_anchor(camera_region_provider: NSObject, camera_region_anchor: NSObject, add_anchor_completion_handler: (p1: NSObject, p2: boolean, p3: NSObject) => void): void;

declare function ar_camera_region_provider_add_camera_region_anchor_f(camera_region_provider: NSObject, camera_region_anchor: NSObject, context: interop.PointerConvertible, add_anchor_completion_handler_function: (p1: interop.PointerConvertible, p2: NSObject, p3: boolean, p4: NSObject) => void): void;

declare function ar_camera_region_provider_remove_camera_region_anchor(camera_region_provider: NSObject, camera_region_anchor: NSObject, remove_anchor_completion_handler: (p1: NSObject, p2: boolean, p3: NSObject) => void): void;

declare function ar_camera_region_provider_remove_camera_region_anchor_with_identifier(camera_region_provider: NSObject, camera_region_anchor_identifier: interop.PointerConvertible, remove_anchor_with_identifier_completion_handler: (p1: interop.PointerConvertible, p2: boolean, p3: NSObject) => void): void;

declare function ar_camera_region_provider_remove_camera_region_anchor_f(camera_region_provider: NSObject, camera_region_anchor: NSObject, context: interop.PointerConvertible, remove_anchor_completion_handler_function: (p1: interop.PointerConvertible, p2: NSObject, p3: boolean, p4: NSObject) => void): void;

declare function ar_camera_region_provider_remove_camera_region_anchor_with_identifier_f(camera_region_provider: NSObject, camera_region_anchor_identifier: interop.PointerConvertible, context: interop.PointerConvertible, remove_anchor_with_identifier_completion_handler_function: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: boolean, p4: NSObject) => void): void;

declare function ar_environment_probe_anchor_is_equal_to_environment_probe_anchor(environment_probe_anchor: NSObject, other_environment_probe_anchor: NSObject): boolean;

declare function ar_environment_probe_anchor_get_environment_texture(environment_probe: NSObject): MTLTexture;

declare function ar_environment_probe_anchor_get_camera_scale_reference(environment_probe: NSObject): number;

declare function ar_environment_probe_anchor_get_identifier(anchor: NSObject, out_identifier: interop.PointerConvertible): void;

declare function ar_environment_probe_anchor_get_origin_from_anchor_transform(anchor: NSObject): simd_float4x4;

declare function ar_environment_probe_anchor_get_timestamp(anchor: NSObject): number;

declare function ar_environment_probe_anchors_get_count(environment_probe_anchors: NSObject): number;

declare function ar_environment_probe_anchors_enumerate_anchors(environment_probe_anchors: NSObject, environment_probe_anchors_enumerator: (p1: NSObject) => boolean): void;

declare function ar_environment_probe_anchors_enumerate_anchors_f(environment_probe_anchors: NSObject, context: interop.PointerConvertible, environment_probe_anchors_enumerator_function: (p1: interop.PointerConvertible, p2: NSObject) => boolean): void;

declare function ar_environment_light_estimation_configuration_create(): NSObject;

declare function ar_environment_light_estimation_provider_create(environment_light_estimation_configuration: NSObject): NSObject;

declare function ar_environment_light_estimation_provider_is_supported(): boolean;

declare function ar_environment_light_estimation_provider_set_update_handler(environment_light_estimation_provider: NSObject, environment_light_estimation_anchor_updates_queue: NSObject, environment_light_estimation_update_handler: (p1: NSObject, p2: NSObject, p3: NSObject) => void): void;

declare function ar_environment_light_estimation_provider_set_update_handler_f(environment_light_estimation_provider: NSObject, environment_light_estimation_anchor_updates_queue: NSObject, context: interop.PointerConvertible, environment_light_estimation_update_handler_function: (p1: interop.PointerConvertible, p2: NSObject, p3: NSObject, p4: NSObject) => void): void;

declare function ar_environment_light_estimation_provider_get_required_authorization_type(): interop.Enum<typeof ar_authorization_type_t>;

declare function ar_skeleton_joint_is_equal_to_skeleton_joint(skeleton_joint: NSObject, other_skeleton_joint: NSObject): boolean;

declare function ar_skeleton_joint_get_index(joint: NSObject): number;

declare function ar_skeleton_joint_get_parent(joint: NSObject): NSObject;

declare function ar_skeleton_joint_get_parent_from_joint_transform(joint: NSObject): simd_float4x4;

declare function ar_skeleton_joint_get_anchor_from_joint_transform(joint: NSObject): simd_float4x4;

declare function ar_skeleton_joint_is_tracked(joint: NSObject): boolean;

declare function ar_hand_skeleton_create(): NSObject;

declare function ar_hand_skeleton_is_equal_to_hand_skeleton(hand_skeleton: NSObject, other_hand_skeleton: NSObject): boolean;

declare function ar_hand_skeleton_get_joint_named(hand_skeleton: NSObject, joint_name: interop.Enum<typeof ar_hand_skeleton_joint_name_t>): NSObject;

declare function ar_hand_skeleton_get_joint_count(hand_skeleton: NSObject): number;

declare function ar_hand_skeleton_enumerate_joints(hand_skeleton: NSObject, joint_enumerator: (p1: NSObject) => boolean): void;

declare function ar_hand_skeleton_enumerate_joints_f(hand_skeleton: NSObject, context: interop.PointerConvertible, joint_enumerator_function: (p1: interop.PointerConvertible, p2: NSObject) => boolean): void;

declare function ar_hand_anchor_create(): NSObject;

declare function ar_hand_anchor_is_equal_to_hand_anchor(anchor: NSObject, other_anchor: NSObject): boolean;

declare function ar_hand_anchor_get_hand_skeleton(hand_anchor: NSObject): NSObject;

declare function ar_hand_anchor_get_chirality(hand_anchor: NSObject): interop.Enum<typeof ar_hand_chirality_t>;

declare function ar_hand_anchor_get_fidelity(hand_anchor: NSObject): interop.Enum<typeof ar_hand_fidelity_t>;

declare function ar_hand_anchor_get_identifier(anchor: NSObject, out_identifier: interop.PointerConvertible): void;

declare function ar_hand_anchor_get_origin_from_anchor_transform(anchor: NSObject): simd_float4x4;

declare function ar_hand_anchor_get_timestamp(anchor: NSObject): number;

declare function ar_hand_anchor_is_tracked(anchor: NSObject): boolean;

declare function ar_hand_tracking_configuration_create(): NSObject;

declare function ar_hand_tracking_provider_create(hand_tracking_configuration: NSObject): NSObject;

declare function ar_hand_tracking_provider_set_update_handler(hand_tracking_provider: NSObject, hand_anchor_updates_queue: NSObject, hand_tracking_update_handler: (p1: NSObject, p2: NSObject) => void): void;

declare function ar_hand_tracking_provider_set_update_handler_f(hand_tracking_provider: NSObject, hand_anchor_updates_queue: NSObject, context: interop.PointerConvertible, hand_tracking_update_handler_function: (p1: interop.PointerConvertible, p2: NSObject, p3: NSObject) => void): void;

declare function ar_hand_tracking_provider_is_supported(): boolean;

declare function ar_hand_tracking_provider_get_latest_anchors(hand_tracking_provider: NSObject, hand_anchor_left: NSObject, hand_anchor_right: NSObject): boolean;

declare function ar_hand_tracking_provider_query_anchors_at_timestamp(hand_tracking_provider: NSObject, timestamp: number, hand_anchor_left: NSObject, hand_anchor_right: NSObject): interop.Enum<typeof ar_hand_anchor_query_status_t>;

declare function ar_hand_tracking_provider_get_required_authorization_type(): interop.Enum<typeof ar_authorization_type_t>;

declare function ar_identifiers_is_equal_to_identifiers(identifiers: NSObject, other_identifiers: NSObject): boolean;

declare function ar_identifiers_get_count(identifiers: NSObject): number;

declare function ar_identifiers_enumerate_identifiers(identifiers: NSObject, identifiers_enumerator: (p1: interop.PointerConvertible) => boolean): void;

declare function ar_identifiers_enumerate_identifiers_f(identifiers: NSObject, context: interop.PointerConvertible, identifiers_enumerator_function: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => boolean): void;

declare function ar_image_anchor_is_equal_to_image_anchor(anchor: NSObject, other_anchor: NSObject): boolean;

declare function ar_image_anchor_get_estimated_scale_factor(image_anchor: NSObject): number;

declare function ar_image_anchor_get_reference_image(image_anchor: NSObject): NSObject;

declare function ar_image_anchor_get_identifier(anchor: NSObject, out_identifier: interop.PointerConvertible): void;

declare function ar_image_anchor_get_origin_from_anchor_transform(anchor: NSObject): simd_float4x4;

declare function ar_image_anchor_get_timestamp(anchor: NSObject): number;

declare function ar_image_anchor_is_tracked(anchor: NSObject): boolean;

declare function ar_image_anchors_get_count(image_anchors: NSObject): number;

declare function ar_image_anchors_enumerate_anchors(image_anchors: NSObject, image_anchors_enumerator: (p1: NSObject) => boolean): void;

declare function ar_image_anchors_enumerate_anchors_f(image_anchors: NSObject, context: interop.PointerConvertible, image_anchors_enumerator_function: (p1: interop.PointerConvertible, p2: NSObject) => boolean): void;

declare function ar_reference_image_create_from_pixel_buffer(pixelBuffer: interop.Object, orientation: interop.Enum<typeof CGImagePropertyOrientation>, physicalWidth: number): NSObject;

declare function ar_reference_image_create_from_cgimage(image: interop.Object, orientation: interop.Enum<typeof CGImagePropertyOrientation>, physicalWidth: number): NSObject;

declare function ar_reference_image_is_equal_to_reference_image(reference_image: NSObject, other_reference_image: NSObject): boolean;

declare function ar_reference_image_set_name(reference_image: NSObject, name: string): void;

declare function ar_reference_image_get_name(reference_image: NSObject): string;

declare function ar_reference_image_get_resource_group_name(reference_image: NSObject): string;

declare function ar_reference_image_get_physical_width(reference_image: NSObject): number;

declare function ar_reference_image_get_physical_height(reference_image: NSObject): number;

declare function ar_reference_images_create(): NSObject;

declare function ar_reference_images_load_reference_images_in_group(group_name: string, bundle: interop.Object): NSObject;

declare function ar_reference_images_add_image(reference_images: NSObject, image_to_add: NSObject): void;

declare function ar_reference_images_add_images(reference_images: NSObject, images_to_add: NSObject): void;

declare function ar_reference_images_get_count(reference_images: NSObject): number;

declare function ar_reference_images_enumerate_images(reference_images: NSObject, reference_images_enumerator: (p1: NSObject) => boolean): void;

declare function ar_reference_images_enumerate_images_f(reference_images: NSObject, context: interop.PointerConvertible, reference_images_enumerator_function: (p1: interop.PointerConvertible, p2: NSObject) => boolean): void;

declare function ar_image_tracking_configuration_create(): NSObject;

declare function ar_image_tracking_configuration_add_reference_images(image_tracking_configuration: NSObject, reference_images: NSObject): void;

declare function ar_image_tracking_provider_create(image_tracking_configuration: NSObject): NSObject;

declare function ar_image_tracking_provider_set_update_handler(image_tracking_provider: NSObject, image_tracking_updates_queue: NSObject, image_tracking_update_handler: (p1: NSObject, p2: NSObject, p3: NSObject) => void): void;

declare function ar_image_tracking_provider_set_update_handler_f(image_tracking_provider: NSObject, image_tracking_updates_queue: NSObject, context: interop.PointerConvertible, image_tracking_update_handler_function: (p1: interop.PointerConvertible, p2: NSObject, p3: NSObject, p4: NSObject) => void): void;

declare function ar_image_tracking_provider_copy_all_image_anchors(image_tracking_provider: NSObject): NSObject;

declare function ar_image_tracking_provider_is_supported(): boolean;

declare function ar_image_tracking_provider_get_required_authorization_type(): interop.Enum<typeof ar_authorization_type_t>;

declare function ar_object_axis_aligned_bounding_box_is_equal_to_bounding_box(bounding_box: NSObject, other_bounding_box: NSObject): boolean;

declare function ar_object_axis_aligned_bounding_box_get_min(bounding_box: NSObject): unknown /* ext vector */;

declare function ar_object_axis_aligned_bounding_box_get_max(bounding_box: NSObject): unknown /* ext vector */;

declare function ar_object_axis_aligned_bounding_box_get_center(bounding_box: NSObject): unknown /* ext vector */;

declare function ar_object_axis_aligned_bounding_box_get_extent(bounding_box: NSObject): unknown /* ext vector */;

declare function ar_object_anchor_is_equal_to_object_anchor(object_anchor: NSObject, other_object_anchor: NSObject): boolean;

declare function ar_object_anchor_get_bounding_box(object_anchor: NSObject): NSObject;

declare function ar_object_anchor_get_reference_object(object_anchor: NSObject): NSObject;

declare function ar_object_anchors_get_count(object_anchors: NSObject): number;

declare function ar_object_anchor_get_identifier(anchor: NSObject, out_identifier: interop.PointerConvertible): void;

declare function ar_object_anchor_get_origin_from_anchor_transform(anchor: NSObject): simd_float4x4;

declare function ar_object_anchor_get_timestamp(anchor: NSObject): number;

declare function ar_object_anchor_is_tracked(anchor: NSObject): boolean;

declare function ar_object_anchors_enumerate_anchors(object_anchors: NSObject, object_anchors_enumerator: (p1: NSObject) => boolean): void;

declare function ar_object_anchors_enumerate_anchors_f(object_anchors: NSObject, context: interop.PointerConvertible, object_anchors_enumerator_function: (p1: interop.PointerConvertible, p2: NSObject) => boolean): void;

declare function ar_reference_object_is_equal_to_reference_object(reference_object: NSObject, other_reference_object: NSObject): boolean;

declare function ar_reference_object_get_identifier(reference_object: NSObject, out_uuid: interop.PointerConvertible): void;

declare function ar_reference_object_get_input_file_path(reference_object: NSObject): interop.Object;

declare function ar_reference_object_get_usdz_file_path(reference_object: NSObject): interop.Object;

declare function ar_reference_object_get_name(reference_object: NSObject): string;

declare function ar_reference_object_load_from_url(url: interop.Object, completion_handler: (p1: interop.PointerConvertible, p2: boolean, p3: NSObject, p4: NSObject) => void): void;

declare function ar_reference_object_load_from_url_f(url: interop.Object, context: interop.PointerConvertible, completion_handler_function: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: boolean, p4: NSObject, p5: NSObject) => void): void;

declare function ar_reference_object_load_with_name(name: string, bundle: interop.Object, completion_handler: (p1: string, p2: interop.PointerConvertible, p3: boolean, p4: NSObject, p5: NSObject) => void): void;

declare function ar_reference_object_load_with_name_f(name: string, bundle: interop.Object, context: interop.PointerConvertible, completion_handler_function: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: boolean, p5: NSObject, p6: NSObject) => void): void;

declare function ar_reference_objects_create(): NSObject;

declare function ar_reference_objects_add_object(reference_objects: NSObject, object_to_add: NSObject): void;

declare function ar_reference_objects_add_objects(reference_objects: NSObject, objects_to_add: NSObject): void;

declare function ar_reference_objects_get_count(reference_objects: NSObject): number;

declare function ar_reference_objects_enumerate_objects(reference_objects: NSObject, reference_objects_enumerator: (p1: NSObject) => boolean): void;

declare function ar_reference_objects_enumerate_objects_f(reference_objects: NSObject, context: interop.PointerConvertible, reference_objects_enumerator_function: (p1: interop.PointerConvertible, p2: NSObject) => boolean): void;

declare function ar_object_tracking_configuration_create(): NSObject;

declare function ar_object_tracking_configuration_add_reference_objects(object_tracking_configuration: NSObject, reference_objects: NSObject): void;

declare function ar_object_tracking_configuration_set_maximum_trackable_instances(object_tracking_configuration: NSObject, maximum_trackable_instances: number): void;

declare function ar_object_tracking_configuration_get_maximum_trackable_instances(object_tracking_configuration: NSObject): number;

declare function ar_object_tracking_configuration_set_maximum_instances_per_reference_object(object_tracking_configuration: NSObject, maximum_instances_per_reference_object: number): void;

declare function ar_object_tracking_configuration_get_maximum_instances_per_reference_object(object_tracking_configuration: NSObject): number;

declare function ar_object_tracking_configuration_set_detection_rate(object_tracking_configuration: NSObject, detection_rate: number): void;

declare function ar_object_tracking_configuration_get_detection_rate(object_tracking_configuration: NSObject): number;

declare function ar_object_tracking_configuration_set_stationary_object_tracking_rate(object_tracking_configuration: NSObject, stationary_object_tracking_rate: number): void;

declare function ar_object_tracking_configuration_get_stationary_object_tracking_rate(object_tracking_configuration: NSObject): number;

declare function ar_object_tracking_configuration_set_moving_object_tracking_rate(object_tracking_configuration: NSObject, moving_object_tracking_rate: number): void;

declare function ar_object_tracking_configuration_get_moving_object_tracking_rate(object_tracking_configuration: NSObject): number;

declare function ar_object_tracking_provider_create(object_tracking_configuration: NSObject): NSObject;

declare function ar_object_tracking_provider_set_update_handler(object_tracking_provider: NSObject, object_tracking_updates_queue: NSObject, object_tracking_update_handler: (p1: NSObject, p2: NSObject, p3: NSObject) => void): void;

declare function ar_object_tracking_provider_set_update_handler_f(object_tracking_provider: NSObject, object_tracking_updates_queue: NSObject, context: interop.PointerConvertible, object_tracking_update_handler_function: (p1: interop.PointerConvertible, p2: NSObject, p3: NSObject, p4: NSObject) => void): void;

declare function ar_object_tracking_provider_copy_all_object_anchors(object_tracking_provider: NSObject): NSObject;

declare function ar_object_tracking_provider_is_supported(): boolean;

declare function ar_object_tracking_provider_get_required_authorization_type(): interop.Enum<typeof ar_authorization_type_t>;

declare function ar_geometry_element_is_equal_to_geometry_element(geometry_element: NSObject, other_geometry_element: NSObject): boolean;

declare function ar_geometry_element_get_buffer(geometry_element: NSObject): MTLBuffer;

declare function ar_geometry_element_get_count(geometry_element: NSObject): number;

declare function ar_geometry_element_get_bytes_per_index(geometry_element: NSObject): number;

declare function ar_geometry_element_get_index_count_per_primitive(geometry_element: NSObject): number;

declare function ar_geometry_element_get_primitive_type(geometry_element: NSObject): interop.Enum<typeof ar_geometry_primitive_type_t>;

declare function ar_geometry_source_is_equal_to_geometry_source(geometry_source: NSObject, other_geometry_source: NSObject): boolean;

declare function ar_geometry_source_get_buffer(geometry_source: NSObject): MTLBuffer;

declare function ar_geometry_source_get_count(geometry_source: NSObject): number;

declare function ar_geometry_source_get_format(geometry_source: NSObject): interop.Enum<typeof MTLVertexFormat>;

declare function ar_geometry_source_get_components_per_vector(geometry_source: NSObject): number;

declare function ar_geometry_source_get_offset(geometry_source: NSObject): number;

declare function ar_geometry_source_get_stride(geometry_source: NSObject): number;

declare function ar_mesh_geometry_is_equal_to_mesh_geometry(mesh_geometry: NSObject, other_mesh_geometry: NSObject): boolean;

declare function ar_mesh_geometry_get_vertices(mesh_geometry: NSObject): NSObject;

declare function ar_mesh_geometry_get_normals(mesh_geometry: NSObject): NSObject;

declare function ar_mesh_geometry_get_faces(mesh_geometry: NSObject): NSObject;

declare function ar_mesh_geometry_get_classification(mesh_geometry: NSObject): NSObject;

declare function ar_mesh_geometries_get_count(mesh_geometries: NSObject): number;

declare function ar_mesh_geometries_enumerate_geometries(mesh_geometries: NSObject, mesh_geometries_enumerator: (p1: NSObject) => boolean): void;

declare function ar_mesh_geometries_enumerate_geometries_f(mesh_geometries: NSObject, context: interop.PointerConvertible, mesh_geometries_enumerator_function: (p1: interop.PointerConvertible, p2: NSObject) => boolean): void;

declare function ar_mesh_anchor_is_equal_to_mesh_anchor(mesh_anchor: NSObject, other_mesh_anchor: NSObject): boolean;

declare function ar_mesh_anchor_get_geometry(mesh_anchor: NSObject): NSObject;

declare function ar_mesh_anchor_get_identifier(anchor: NSObject, out_identifier: interop.PointerConvertible): void;

declare function ar_mesh_anchor_get_origin_from_anchor_transform(anchor: NSObject): simd_float4x4;

declare function ar_mesh_anchor_get_timestamp(anchor: NSObject): number;

declare function ar_mesh_anchors_get_count(mesh_anchors: NSObject): number;

declare function ar_mesh_anchors_enumerate_anchors(mesh_anchors: NSObject, mesh_anchors_enumerator: (p1: NSObject) => boolean): void;

declare function ar_mesh_anchors_enumerate_anchors_f(mesh_anchors: NSObject, context: interop.PointerConvertible, mesh_anchors_enumerator_function: (p1: interop.PointerConvertible, p2: NSObject) => boolean): void;

declare function ar_scene_reconstruction_configuration_create(): NSObject;

declare function ar_scene_reconstruction_configuration_get_scene_reconstruction_mode(scene_reconstruction_configuration: NSObject): interop.Enum<typeof ar_scene_reconstruction_mode_t>;

declare function ar_scene_reconstruction_configuration_set_scene_reconstruction_mode(scene_reconstruction_configuration: NSObject, scene_reconstruction_mode: interop.Enum<typeof ar_scene_reconstruction_mode_t>): void;

declare function ar_scene_reconstruction_provider_create(scene_reconstruction_configuration: NSObject): NSObject;

declare function ar_scene_reconstruction_provider_set_update_handler(scene_reconstruction_provider: NSObject, scene_reconstruction_updates_queue: NSObject, scene_reconstruction_update_handler: (p1: NSObject, p2: NSObject, p3: NSObject) => void): void;

declare function ar_scene_reconstruction_provider_set_update_handler_f(scene_reconstruction_provider: NSObject, scene_reconstruction_updates_queue: NSObject, context: interop.PointerConvertible, scene_reconstruction_update_handler_function: (p1: interop.PointerConvertible, p2: NSObject, p3: NSObject, p4: NSObject) => void): void;

declare function ar_scene_reconstruction_provider_copy_all_mesh_anchors(scene_reconstruction_provider: NSObject): NSObject;

declare function ar_scene_reconstruction_provider_is_supported(): boolean;

declare function ar_scene_reconstruction_provider_get_required_authorization_type(): interop.Enum<typeof ar_authorization_type_t>;

declare function ar_plane_detection_configuration_create(): NSObject;

declare function ar_plane_detection_configuration_set_alignment(plane_detection_configuration: NSObject, alignment: interop.Enum<typeof ar_plane_alignment_t>): void;

declare function ar_plane_anchor_is_equal_to_plane_anchor(anchor: NSObject, other_anchor: NSObject): boolean;

declare function ar_plane_anchor_get_alignment(plane_anchor: NSObject): interop.Enum<typeof ar_plane_alignment_t>;

declare function ar_plane_anchor_get_geometry(plane_anchor: NSObject): NSObject;

declare function ar_plane_anchor_get_plane_classification(plane_anchor: NSObject): interop.Enum<typeof ar_plane_classification_t>;

declare function ar_plane_anchor_get_surface_classification(plane_anchor: NSObject): interop.Enum<typeof ar_surface_classification_t>;

declare function ar_plane_anchor_get_identifier(anchor: NSObject, out_identifier: interop.PointerConvertible): void;

declare function ar_plane_anchor_get_origin_from_anchor_transform(anchor: NSObject): simd_float4x4;

declare function ar_plane_anchor_get_timestamp(anchor: NSObject): number;

declare function ar_plane_geometry_is_equal_to_plane_geometry(plane_geometry: NSObject, other_plane_geometry: NSObject): boolean;

declare function ar_plane_geometry_get_mesh_vertices(plane_geometry: NSObject): NSObject;

declare function ar_plane_geometry_get_mesh_faces(plane_geometry: NSObject): NSObject;

declare function ar_plane_geometry_get_plane_extent(plane_geometry: NSObject): NSObject;

declare function ar_plane_extent_is_equal_to_plane_extent(plane_extent: NSObject, other_plane_extent: NSObject): boolean;

declare function ar_plane_extent_get_width(plane_extent: NSObject): number;

declare function ar_plane_extent_get_height(plane_extent: NSObject): number;

declare function ar_plane_extent_get_plane_anchor_from_plane_extent_transform(plane_extent: NSObject): simd_float4x4;

declare function ar_plane_anchors_get_count(plane_anchors: NSObject): number;

declare function ar_plane_anchors_enumerate_anchors(plane_anchors: NSObject, plane_anchors_enumerator: (p1: NSObject) => boolean): void;

declare function ar_plane_anchors_enumerate_anchors_f(plane_anchors: NSObject, context: interop.PointerConvertible, plane_anchors_enumerator_function: (p1: interop.PointerConvertible, p2: NSObject) => boolean): void;

declare function ar_plane_detection_provider_create(plane_detection_configuration: NSObject): NSObject;

declare function ar_plane_detection_provider_set_update_handler(plane_detection_provider: NSObject, plane_detection_updates_queue: NSObject, plane_detection_update_handler: (p1: NSObject, p2: NSObject, p3: NSObject) => void): void;

declare function ar_plane_detection_provider_set_update_handler_f(plane_detection_provider: NSObject, plane_detection_updates_queue: NSObject, context: interop.PointerConvertible, plane_detection_update_handler_function: (p1: interop.PointerConvertible, p2: NSObject, p3: NSObject, p4: NSObject) => void): void;

declare function ar_plane_detection_provider_copy_all_plane_anchors(plane_detection_provider: NSObject): NSObject;

declare function ar_plane_detection_provider_is_supported(): boolean;

declare function ar_plane_detection_provider_get_required_authorization_type(): interop.Enum<typeof ar_authorization_type_t>;

declare function ar_room_anchor_is_equal_to_room_anchor(room_anchor: NSObject, other_room_anchor: NSObject): boolean;

declare function ar_room_anchor_is_current_room(room_anchor: NSObject): boolean;

declare function ar_room_anchor_get_geometry(room_anchor: NSObject): NSObject;

declare function ar_room_anchor_get_mesh_geometries_for_classification(room_anchor: NSObject, classification: interop.Enum<typeof ar_mesh_classification_t>): NSObject;

declare function ar_room_anchor_get_mesh_geometries_for_surface_classification(room_anchor: NSObject, classification: interop.Enum<typeof ar_surface_classification_t>): NSObject;

declare function ar_room_anchor_contains_point(room_anchor: NSObject, point: unknown /* ext vector */): boolean;

declare function ar_room_anchor_get_identifier(room_anchor: NSObject, out_identifier: interop.PointerConvertible): void;

declare function ar_room_anchor_get_origin_from_anchor_transform(room_anchor: NSObject): simd_float4x4;

declare function ar_room_anchor_get_timestamp(room_anchor: NSObject): number;

declare function ar_room_anchors_get_count(room_anchors: NSObject): number;

declare function ar_room_anchors_enumerate_anchors(room_anchors: NSObject, room_anchors_enumerator: (p1: NSObject) => boolean): void;

declare function ar_room_anchors_enumerate_anchors_f(room_anchors: NSObject, context: interop.PointerConvertible, room_anchors_enumerator_function: (p1: interop.PointerConvertible, p2: NSObject) => boolean): void;

declare function ar_room_tracking_configuration_create(): NSObject;

declare function ar_room_tracking_provider_create(room_tracking_configuration: NSObject): NSObject;

declare function ar_room_tracking_provider_set_update_handler(room_tracking_provider: NSObject, room_tracking_updates_queue: NSObject, room_tracking_update_handler: (p1: NSObject, p2: NSObject, p3: NSObject) => void): void;

declare function ar_room_tracking_provider_set_update_handler_f(room_tracking_provider: NSObject, room_tracking_updates_queue: NSObject, context: interop.PointerConvertible, room_tracking_update_handler_function: (p1: interop.PointerConvertible, p2: NSObject, p3: NSObject, p4: NSObject) => void): void;

declare function ar_room_tracking_provider_copy_current_room_anchor(room_tracking_provider: NSObject): NSObject;

declare function ar_room_tracking_provider_copy_all_room_anchors(room_tracking_provider: NSObject): NSObject;

declare function ar_room_anchor_get_plane_anchor_identifiers(room_anchor: NSObject): NSObject;

declare function ar_room_anchor_get_mesh_anchor_identifiers(room_anchor: NSObject): NSObject;

declare function ar_room_tracking_provider_is_supported(): boolean;

declare function ar_room_tracking_provider_get_required_authorization_type(): interop.Enum<typeof ar_authorization_type_t>;

declare function ar_coordinate_space_data_copy_recipient_identifers(shared_coordinate_space_data: NSObject): NSObject;

declare function ar_coordinate_space_data_create_from_cfdata(cfData: interop.Object): NSObject;

declare function ar_coordinate_space_data_copy_cfdata(data: NSObject): interop.Object;

declare function ar_shared_coordinate_space_configuration_create(): NSObject;

declare function ar_shared_coordinate_space_provider_create(shared_coordinate_space_configuration: NSObject): NSObject;

declare function ar_shared_coordinate_space_provider_get_participant_identifier(shared_coordinate_space_provider: NSObject, out_identifier: interop.PointerConvertible): void;

declare function ar_shared_coordinate_space_provider_push_data(shared_coordinate_space_provider: NSObject, coordinate_space_data: NSObject): void;

declare function ar_shared_coordinate_space_provider_is_supported(): boolean;

declare function ar_shared_coordinate_space_provider_copy_next_coordinate_space_data(shared_coordinate_space_provider: NSObject): NSObject;

declare function ar_shared_coordinate_space_provider_set_connected_participants_update_handler(shared_coordinate_space_provider: NSObject, connected_participants_update_queue: NSObject, connected_participants_update_handler: (p1: NSObject) => void): void;

declare function ar_shared_coordinate_provider_set_connected_participants_update_handler_f(shared_coordinate_space_provider: NSObject, connected_participants_update_queue: NSObject, context: interop.PointerConvertible, connected_participants_update_handler_function: (p1: interop.PointerConvertible, p2: NSObject) => void): void;

declare function ar_shared_coordinate_space_provider_set_sharing_status_update_handler(shared_coordinate_space_provider: NSObject, status_updates_queue: NSObject, sharing_status_update_handler: (p1: boolean) => void): void;

declare function ar_shared_coordinate_space_provider_set_sharing_status_update_handler_f(shared_coordinate_space_provider: NSObject, status_updates_queue: NSObject, context: interop.PointerConvertible, sharing_status_update_handler_function: (p1: interop.PointerConvertible, p2: boolean) => void): void;

declare function ar_shared_coordinate_space_provider_get_required_authorization_type(): interop.Enum<typeof ar_authorization_type_t>;

declare function ar_viewpoint_properties_create(): NSObject;

declare function ar_viewpoint_properties_get_device_from_left_viewpoint_transform(viewpoint_properties: NSObject): simd_float4x4;

declare function ar_viewpoint_properties_get_device_from_right_viewpoint_transform(viewpoint_properties: NSObject): simd_float4x4;

declare function ar_stereo_properties_configuration_create(): NSObject;

declare function ar_stereo_properties_provider_create(configuration: NSObject): NSObject;

declare function ar_stereo_properties_provider_is_supported(): boolean;

declare function ar_stereo_properties_provider_get_required_authorization_type(): interop.Enum<typeof ar_authorization_type_t>;

declare function ar_stereo_properties_provider_get_viewpoint_properties(stereo_properties_provider: NSObject, viewpoint_properties: NSObject): boolean;

declare function ar_world_anchor_is_equal_to_world_anchor(anchor: NSObject, other_anchor: NSObject): boolean;

declare function ar_world_anchor_create_with_origin_from_anchor_transform(origin_from_anchor_transform: simd_float4x4): NSObject;

declare function ar_world_anchor_get_identifier(anchor: NSObject, out_identifier: interop.PointerConvertible): void;

declare function ar_world_anchor_get_origin_from_anchor_transform(anchor: NSObject): simd_float4x4;

declare function ar_world_anchor_get_timestamp(anchor: NSObject): number;

declare function ar_world_anchor_is_tracked(anchor: NSObject): boolean;

declare function ar_world_anchors_get_count(world_anchors: NSObject): number;

declare function ar_world_anchors_enumerate_anchors(world_anchors: NSObject, world_anchors_enumerator: (p1: NSObject) => boolean): void;

declare function ar_world_anchors_enumerate_anchors_f(world_anchors: NSObject, context: interop.PointerConvertible, world_anchors_enumerator_function: (p1: interop.PointerConvertible, p2: NSObject) => boolean): void;

declare function ar_world_tracking_configuration_create(): NSObject;

declare function ar_world_tracking_provider_create(world_tracking_configuration: NSObject): NSObject;

declare function ar_world_tracking_provider_copy_all_world_anchors_f(world_tracking_provider: NSObject, context: interop.PointerConvertible, copy_all_anchors_completion_handler_function: (p1: interop.PointerConvertible, p2: NSObject) => void): void;

declare function ar_world_tracking_provider_copy_all_world_anchors(world_tracking_provider: NSObject, copy_all_anchors_completion_handler: (p1: NSObject) => void): void;

declare function ar_world_tracking_provider_set_anchor_update_handler(world_tracking_provider: NSObject, world_tracking_updates_queue: NSObject, world_tracking_anchor_update_handler: (p1: NSObject, p2: NSObject, p3: NSObject) => void): void;

declare function ar_world_tracking_provider_set_anchor_update_handler_f(world_tracking_provider: NSObject, world_tracking_updates_queue: NSObject, context: interop.PointerConvertible, world_tracking_anchor_update_handler_function: (p1: interop.PointerConvertible, p2: NSObject, p3: NSObject, p4: NSObject) => void): void;

declare function ar_world_tracking_provider_is_supported(): boolean;

declare function ar_world_tracking_provider_add_anchor(world_tracking_provider: NSObject, world_anchor: NSObject, add_anchor_completion_handler: (p1: NSObject, p2: boolean, p3: NSObject) => void): void;

declare function ar_world_tracking_provider_add_anchor_f(world_tracking_provider: NSObject, world_anchor: NSObject, context: interop.PointerConvertible, add_anchor_completion_handler_function: (p1: interop.PointerConvertible, p2: NSObject, p3: boolean, p4: NSObject) => void): void;

declare function ar_world_tracking_provider_remove_anchor(world_tracking_provider: NSObject, world_anchor: NSObject, remove_anchor_completion_handler: (p1: NSObject, p2: boolean, p3: NSObject) => void): void;

declare function ar_world_tracking_provider_remove_anchor_with_identifier(world_tracking_provider: NSObject, anchor_identifier: interop.PointerConvertible, remove_anchor_completion_handler: (p1: NSObject, p2: boolean, p3: NSObject) => void): void;

declare function ar_world_tracking_provider_remove_anchor_f(world_tracking_provider: NSObject, world_anchor: NSObject, context: interop.PointerConvertible, remove_anchor_completion_handler_function: (p1: interop.PointerConvertible, p2: NSObject, p3: boolean, p4: NSObject) => void): void;

declare function ar_world_tracking_provider_remove_anchor_with_identifier_f(world_tracking_provider: NSObject, anchor_identifier: interop.PointerConvertible, context: interop.PointerConvertible, remove_anchor_completion_handler_function: (p1: interop.PointerConvertible, p2: NSObject, p3: boolean, p4: NSObject) => void): void;

declare function ar_world_tracking_provider_remove_all_anchors(world_tracking_provider: NSObject, remove_all_anchors_completion_handler: (p1: boolean, p2: NSObject) => void): void;

declare function ar_world_tracking_provider_remove_all_anchors_f(world_tracking_provider: NSObject, context: interop.PointerConvertible, remove_all_anchors_completion_handler_function: (p1: interop.PointerConvertible, p2: boolean, p3: NSObject) => void): void;

declare function ar_world_anchor_shared_with_nearby_participants_create(origin_from_anchor_transform: simd_float4x4): NSObject;

declare function ar_world_anchor_is_shared_with_nearby_participants(world_anchor: NSObject): boolean;

declare function ar_world_tracking_provider_set_world_anchor_sharing_availability_update_handler(world_tracking_provider: NSObject, world_tracking_updates_queue: NSObject, world_anchor_sharing_availability_update_handler: (p1: interop.Enum<typeof ar_world_anchor_sharing_availability_t>) => void): void;

declare function ar_world_tracking_provider_set_world_anchor_sharing_availability_update_handler_f(world_tracking_provider: NSObject, world_tracking_updates_queue: NSObject, context: interop.PointerConvertible, world_anchor_sharing_availability_update_handler_function: (p1: interop.PointerConvertible, p2: interop.Enum<typeof ar_world_anchor_sharing_availability_t>) => void): void;

declare function ar_device_anchor_create(): NSObject;

declare function ar_device_anchor_get_identifier(anchor: NSObject, out_identifier: interop.PointerConvertible): void;

declare function ar_device_anchor_get_origin_from_anchor_transform(anchor: NSObject): simd_float4x4;

declare function ar_device_anchor_get_timestamp(anchor: NSObject): number;

declare function ar_device_anchor_is_tracked(anchor: NSObject): boolean;

declare function ar_device_anchor_get_tracking_state(anchor: NSObject): interop.Enum<typeof ar_device_anchor_tracking_state_t>;

declare function ar_world_tracking_provider_query_device_anchor_at_timestamp(world_tracking_provider: NSObject, timestamp: number, device_anchor: NSObject): interop.Enum<typeof ar_device_anchor_query_status_t>;

declare function ar_world_tracking_provider_get_required_authorization_type(): interop.Enum<typeof ar_authorization_type_t>;

declare function ar_camera_video_format_is_equal_to_camera_video_format(camera_video_format: NSObject, other_camera_video_format: NSObject): boolean;

declare function ar_camera_video_format_get_minimum_frame_duration(video_format: NSObject): number;

declare function ar_camera_video_format_get_maximum_frame_duration(video_format: NSObject): number;

declare function ar_camera_video_format_get_frame_size(video_format: NSObject): CGSize;

declare function ar_camera_video_format_get_pixel_format(video_format: NSObject): number;

declare function ar_camera_video_format_get_camera_type(video_format: NSObject): interop.Enum<typeof ar_camera_type_t>;

declare function ar_camera_video_format_get_camera_position(video_format: NSObject): interop.Enum<typeof ar_camera_position_t>;

declare function ar_camera_video_format_get_camera_rectification_type(video_format: NSObject): interop.Enum<typeof ar_camera_rectification_type_t>;

declare function ar_camera_video_format_copy_supported_video_formats(camera_type: interop.Enum<typeof ar_camera_type_t>, camera_position: interop.Enum<typeof ar_camera_position_t>): NSObject;

declare function ar_camera_video_formats_get_count(camera_video_formats: NSObject): number;

declare function ar_camera_video_formats_enumerate_video_formats(camera_video_formats: NSObject, camera_video_formats_enumerator: (p1: NSObject) => boolean): void;

declare function ar_camera_video_formats_enumerate_video_formats_f(camera_video_formats: NSObject, context: interop.PointerConvertible, camera_video_formats_enumerator_function: (p1: interop.PointerConvertible, p2: NSObject) => boolean): void;

declare function ar_camera_frame_is_equal_to_camera_frame(camera_frame: NSObject, other_camera_frame: NSObject): boolean;

declare function ar_camera_frame_get_frame_sample(camera_frame: NSObject, camera_position: interop.Enum<typeof ar_camera_position_t>): NSObject;

declare function ar_camera_frame_get_primary_frame_sample(camera_frame: NSObject): NSObject;

declare function ar_camera_frame_get_frame_samples(camera_frame: NSObject): NSObject;

declare function ar_camera_frame_samples_enumerate_frame_samples(camera_frame_samples: NSObject, camera_frame_sample_enumerator: (p1: NSObject) => boolean): void;

declare function ar_camera_frame_samples_enumerate_frame_samples_f(camera_frame_samples: NSObject, context: interop.PointerConvertible, camera_frame_sample_enumerator_function: (p1: interop.PointerConvertible, p2: NSObject) => boolean): void;

declare function ar_camera_frame_samples_get_count(camera_frame_samples: NSObject): number;

declare function ar_camera_frame_sample_is_equal_to_camera_frame_sample(camera_frame_sample: NSObject, other_camera_frame_sample: NSObject): boolean;

declare function ar_camera_frame_sample_get_pixel_buffer(camera_frame_sample: NSObject): interop.Object;

declare function ar_camera_frame_sample_get_camera_frame_parameters(camera_frame_sample: NSObject): NSObject;

declare function ar_camera_frame_parameters_is_equal_to_camera_frame_parameters(camera_frame_parameters: NSObject, other_camera_frame_parameters: NSObject): boolean;

declare function ar_camera_frame_parameters_get_intrinsics(camera_frame_parameters: NSObject): simd_float3x3;

declare function ar_camera_frame_parameters_get_extrinsics(camera_frame_parameters: NSObject): simd_float4x4;

declare function ar_camera_frame_parameters_get_capture_timestamp(camera_frame_parameters: NSObject): number;

declare function ar_camera_frame_parameters_get_mid_exposure_timestamp(camera_frame_parameters: NSObject): number;

declare function ar_camera_frame_parameters_get_color_temperature(camera_frame_parameters: NSObject): number;

declare function ar_camera_frame_parameters_get_exposure_duration(camera_frame_parameters: NSObject): number;

declare function ar_camera_frame_parameters_get_camera_type(camera_frame_parameters: NSObject): interop.Enum<typeof ar_camera_type_t>;

declare function ar_camera_frame_parameters_get_camera_position(camera_frame_parameters: NSObject): interop.Enum<typeof ar_camera_position_t>;

declare function ar_camera_frame_provider_create(): NSObject;

declare function ar_camera_frame_provider_set_update_handler(camera_frame_provider: NSObject, camera_video_format: NSObject, camera_frame_update_queue: NSObject, camera_frame_update_handler: (p1: NSObject) => void): void;

declare function ar_camera_frame_provider_set_update_handler_f(camera_frame_provider: NSObject, camera_video_format: NSObject, camera_frame_update_queue: NSObject, context: interop.PointerConvertible, camera_frame_update_handler_function: (p1: interop.PointerConvertible, p2: NSObject) => void): void;

declare function ar_camera_frame_provider_is_supported(): boolean;

declare function ar_camera_frame_provider_get_required_authorization_type(): interop.Enum<typeof ar_authorization_type_t>;

declare interface OS_ar_camera_region_provider extends OS_ar_data_provider {
}

declare class OS_ar_camera_region_provider extends NativeObject implements OS_ar_camera_region_provider {
}

declare interface OS_ar_accessories extends NSObjectProtocol {
}

declare class OS_ar_accessories extends NativeObject implements OS_ar_accessories {
}

declare interface OS_ar_camera_frame_sample extends NSObjectProtocol {
}

declare class OS_ar_camera_frame_sample extends NativeObject implements OS_ar_camera_frame_sample {
}

declare interface OS_ar_plane_detection_configuration extends NSObjectProtocol {
}

declare class OS_ar_plane_detection_configuration extends NativeObject implements OS_ar_plane_detection_configuration {
}

declare interface OS_ar_camera_frame extends NSObjectProtocol {
}

declare class OS_ar_camera_frame extends NativeObject implements OS_ar_camera_frame {
}

declare interface OS_ar_camera_video_formats extends NSObjectProtocol {
}

declare class OS_ar_camera_video_formats extends NativeObject implements OS_ar_camera_video_formats {
}

declare interface OS_ar_world_tracking_provider extends OS_ar_data_provider {
}

declare class OS_ar_world_tracking_provider extends NativeObject implements OS_ar_world_tracking_provider {
}

declare interface OS_ar_world_tracking_configuration extends NSObjectProtocol {
}

declare class OS_ar_world_tracking_configuration extends NativeObject implements OS_ar_world_tracking_configuration {
}

declare interface OS_ar_stereo_properties_configuration extends NSObjectProtocol {
}

declare class OS_ar_stereo_properties_configuration extends NativeObject implements OS_ar_stereo_properties_configuration {
}

declare interface OS_ar_shared_coordinate_space_provider extends OS_ar_data_provider {
}

declare class OS_ar_shared_coordinate_space_provider extends NativeObject implements OS_ar_shared_coordinate_space_provider {
}

declare interface OS_ar_shared_coordinate_space_configuration extends NSObjectProtocol {
}

declare class OS_ar_shared_coordinate_space_configuration extends NativeObject implements OS_ar_shared_coordinate_space_configuration {
}

declare interface OS_ar_room_tracking_provider extends OS_ar_data_provider {
}

declare class OS_ar_room_tracking_provider extends NativeObject implements OS_ar_room_tracking_provider {
}

declare interface OS_ar_room_tracking_configuration extends NSObjectProtocol {
}

declare class OS_ar_room_tracking_configuration extends NativeObject implements OS_ar_room_tracking_configuration {
}

declare interface OS_ar_room_anchors extends NSObjectProtocol {
}

declare class OS_ar_room_anchors extends NativeObject implements OS_ar_room_anchors {
}

declare interface OS_ar_room_anchor extends OS_ar_anchor {
}

declare class OS_ar_room_anchor extends NativeObject implements OS_ar_room_anchor {
}

declare interface OS_ar_plane_extent extends NSObjectProtocol {
}

declare class OS_ar_plane_extent extends NativeObject implements OS_ar_plane_extent {
}

declare interface OS_ar_plane_geometry extends NSObjectProtocol {
}

declare class OS_ar_plane_geometry extends NativeObject implements OS_ar_plane_geometry {
}

declare interface OS_ar_plane_anchor extends OS_ar_anchor {
}

declare class OS_ar_plane_anchor extends NativeObject implements OS_ar_plane_anchor {
}

declare interface OS_ar_scene_reconstruction_provider extends OS_ar_data_provider {
}

declare class OS_ar_scene_reconstruction_provider extends NativeObject implements OS_ar_scene_reconstruction_provider {
}

declare interface OS_ar_geometry_element extends NSObjectProtocol {
}

declare class OS_ar_geometry_element extends NativeObject implements OS_ar_geometry_element {
}

declare interface OS_ar_geometry_source extends NSObjectProtocol {
}

declare class OS_ar_geometry_source extends NativeObject implements OS_ar_geometry_source {
}

declare interface OS_ar_mesh_geometries extends NSObjectProtocol {
}

declare class OS_ar_mesh_geometries extends NativeObject implements OS_ar_mesh_geometries {
}

declare interface OS_ar_mesh_geometry extends NSObjectProtocol {
}

declare class OS_ar_mesh_geometry extends NativeObject implements OS_ar_mesh_geometry {
}

declare interface OS_ar_mesh_anchor extends OS_ar_anchor {
}

declare class OS_ar_mesh_anchor extends NativeObject implements OS_ar_mesh_anchor {
}

declare interface OS_ar_object_tracking_provider extends OS_ar_data_provider {
}

declare class OS_ar_object_tracking_provider extends NativeObject implements OS_ar_object_tracking_provider {
}

declare interface OS_ar_reference_objects extends NSObjectProtocol {
}

declare class OS_ar_reference_objects extends NativeObject implements OS_ar_reference_objects {
}

declare interface OS_ar_accessory_tracking_configuration extends NSObjectProtocol {
}

declare class OS_ar_accessory_tracking_configuration extends NativeObject implements OS_ar_accessory_tracking_configuration {
}

declare interface OS_ar_object_anchors extends NSObjectProtocol {
}

declare class OS_ar_object_anchors extends NativeObject implements OS_ar_object_anchors {
}

declare interface OS_ar_object_anchor extends OS_ar_trackable_anchor {
}

declare class OS_ar_object_anchor extends NativeObject implements OS_ar_object_anchor {
}

declare interface OS_ar_image_tracking_provider extends OS_ar_data_provider {
}

declare class OS_ar_image_tracking_provider extends NativeObject implements OS_ar_image_tracking_provider {
}

declare interface OS_ar_reference_images extends NSObjectProtocol {
}

declare class OS_ar_reference_images extends NativeObject implements OS_ar_reference_images {
}

declare interface OS_ar_hand_tracking_configuration extends NSObjectProtocol {
}

declare class OS_ar_hand_tracking_configuration extends NativeObject implements OS_ar_hand_tracking_configuration {
}

declare interface OS_ar_hand_anchor extends OS_ar_trackable_anchor {
}

declare class OS_ar_hand_anchor extends NativeObject implements OS_ar_hand_anchor {
}

declare interface OS_ar_reference_image extends NSObjectProtocol {
}

declare class OS_ar_reference_image extends NativeObject implements OS_ar_reference_image {
}

declare interface OS_ar_environment_light_estimation_provider extends OS_ar_data_provider {
}

declare class OS_ar_environment_light_estimation_provider extends NativeObject implements OS_ar_environment_light_estimation_provider {
}

declare interface OS_ar_camera_video_format extends NSObjectProtocol {
}

declare class OS_ar_camera_video_format extends NativeObject implements OS_ar_camera_video_format {
}

declare interface OS_ar_environment_probe_anchors extends NSObjectProtocol {
}

declare class OS_ar_environment_probe_anchors extends NativeObject implements OS_ar_environment_probe_anchors {
}

declare interface OS_ar_camera_region_configuration extends NSObjectProtocol {
}

declare class OS_ar_camera_region_configuration extends NativeObject implements OS_ar_camera_region_configuration {
}

declare interface OS_ar_camera_region_anchors extends NSObjectProtocol {
}

declare class OS_ar_camera_region_anchors extends NativeObject implements OS_ar_camera_region_anchors {
}

declare interface OS_ar_barcode_detection_provider extends OS_ar_data_provider {
}

declare class OS_ar_barcode_detection_provider extends NativeObject implements OS_ar_barcode_detection_provider {
}

declare interface OS_ar_barcode_anchor extends OS_ar_anchor {
}

declare class OS_ar_barcode_anchor extends NativeObject implements OS_ar_barcode_anchor {
}

declare interface OS_ar_accessory_tracking_provider extends OS_ar_data_provider {
}

declare class OS_ar_accessory_tracking_provider extends NativeObject implements OS_ar_accessory_tracking_provider {
}

declare interface OS_ar_accessory_anchors extends NSObjectProtocol {
}

declare class OS_ar_accessory_anchors extends NativeObject implements OS_ar_accessory_anchors {
}

declare interface OS_ar_accessory_anchor extends OS_ar_trackable_anchor {
}

declare class OS_ar_accessory_anchor extends NativeObject implements OS_ar_accessory_anchor {
}

declare interface OS_ar_world_anchor extends OS_ar_trackable_anchor {
}

declare class OS_ar_world_anchor extends NativeObject implements OS_ar_world_anchor {
}

declare interface OS_ar_accessory extends NSObjectProtocol {
}

declare class OS_ar_accessory extends NativeObject implements OS_ar_accessory {
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

declare interface OS_ar_environment_probe_anchor extends OS_ar_anchor {
}

declare class OS_ar_environment_probe_anchor extends NativeObject implements OS_ar_environment_probe_anchor {
}

declare interface OS_ar_environment_light_estimation_configuration extends NSObjectProtocol {
}

declare class OS_ar_environment_light_estimation_configuration extends NativeObject implements OS_ar_environment_light_estimation_configuration {
}

declare interface OS_ar_authorization_result extends NSObjectProtocol {
}

declare class OS_ar_authorization_result extends NativeObject implements OS_ar_authorization_result {
}

declare interface OS_ar_data_provider extends NSObjectProtocol {
}

declare class OS_ar_data_provider extends NativeObject implements OS_ar_data_provider {
}

declare interface OS_ar_identifiers extends NSObjectProtocol {
}

declare class OS_ar_identifiers extends NativeObject implements OS_ar_identifiers {
}

declare interface OS_ar_plane_anchors extends NSObjectProtocol {
}

declare class OS_ar_plane_anchors extends NativeObject implements OS_ar_plane_anchors {
}

declare interface OS_ar_camera_frame_parameters extends NSObjectProtocol {
}

declare class OS_ar_camera_frame_parameters extends NativeObject implements OS_ar_camera_frame_parameters {
}

declare interface OS_ar_reference_object extends NSObjectProtocol {
}

declare class OS_ar_reference_object extends NativeObject implements OS_ar_reference_object {
}

declare interface OS_ar_object_tracking_configuration extends NSObjectProtocol {
}

declare class OS_ar_object_tracking_configuration extends NativeObject implements OS_ar_object_tracking_configuration {
}

declare interface OS_ar_skeleton_joint extends NSObjectProtocol {
}

declare class OS_ar_skeleton_joint extends NativeObject implements OS_ar_skeleton_joint {
}

declare interface OS_ar_stereo_properties_provider extends OS_ar_data_provider {
}

declare class OS_ar_stereo_properties_provider extends NativeObject implements OS_ar_stereo_properties_provider {
}

declare interface OS_ar_anchor extends NSObjectProtocol {
}

declare class OS_ar_anchor extends NativeObject implements OS_ar_anchor {
}

declare interface OS_ar_camera_region_anchor extends OS_ar_anchor {
}

declare class OS_ar_camera_region_anchor extends NativeObject implements OS_ar_camera_region_anchor {
}

declare interface OS_ar_mesh_anchors extends NSObjectProtocol {
}

declare class OS_ar_mesh_anchors extends NativeObject implements OS_ar_mesh_anchors {
}

declare interface OS_ar_image_anchors extends NSObjectProtocol {
}

declare class OS_ar_image_anchors extends NativeObject implements OS_ar_image_anchors {
}

declare interface OS_ar_authorization_results extends NSObjectProtocol {
}

declare class OS_ar_authorization_results extends NativeObject implements OS_ar_authorization_results {
}

declare interface OS_ar_coordinate_space_data extends NSObjectProtocol {
}

declare class OS_ar_coordinate_space_data extends NativeObject implements OS_ar_coordinate_space_data {
}

declare interface OS_ar_hand_skeleton extends NSObjectProtocol {
}

declare class OS_ar_hand_skeleton extends NativeObject implements OS_ar_hand_skeleton {
}

declare interface OS_ar_hand_tracking_provider extends OS_ar_data_provider {
}

declare class OS_ar_hand_tracking_provider extends NativeObject implements OS_ar_hand_tracking_provider {
}

declare interface OS_ar_scene_reconstruction_configuration extends NSObjectProtocol {
}

declare class OS_ar_scene_reconstruction_configuration extends NativeObject implements OS_ar_scene_reconstruction_configuration {
}

declare interface OS_ar_image_anchor extends OS_ar_trackable_anchor {
}

declare class OS_ar_image_anchor extends NativeObject implements OS_ar_image_anchor {
}

declare interface OS_ar_viewpoint_properties extends NSObjectProtocol {
}

declare class OS_ar_viewpoint_properties extends NativeObject implements OS_ar_viewpoint_properties {
}

declare interface OS_ar_camera_frame_samples extends NSObjectProtocol {
}

declare class OS_ar_camera_frame_samples extends NativeObject implements OS_ar_camera_frame_samples {
}

declare interface OS_ar_data extends NSObjectProtocol {
}

declare class OS_ar_data extends NativeObject implements OS_ar_data {
}

declare interface OS_ar_barcode_detection_configuration extends NSObjectProtocol {
}

declare class OS_ar_barcode_detection_configuration extends NativeObject implements OS_ar_barcode_detection_configuration {
}

declare interface OS_ar_data_providers extends NSObjectProtocol {
}

declare class OS_ar_data_providers extends NativeObject implements OS_ar_data_providers {
}

declare interface OS_ar_plane_detection_provider extends OS_ar_data_provider {
}

declare class OS_ar_plane_detection_provider extends NativeObject implements OS_ar_plane_detection_provider {
}

declare interface OS_ar_object_axis_aligned_bounding_box extends NSObjectProtocol {
}

declare class OS_ar_object_axis_aligned_bounding_box extends NativeObject implements OS_ar_object_axis_aligned_bounding_box {
}

declare interface OS_ar_camera_frame_provider extends OS_ar_data_provider {
}

declare class OS_ar_camera_frame_provider extends NativeObject implements OS_ar_camera_frame_provider {
}

declare interface OS_ar_world_anchors extends NSObjectProtocol {
}

declare class OS_ar_world_anchors extends NativeObject implements OS_ar_world_anchors {
}

declare interface OS_ar_image_tracking_configuration extends NSObjectProtocol {
}

declare class OS_ar_image_tracking_configuration extends NativeObject implements OS_ar_image_tracking_configuration {
}

declare interface OS_ar_barcode_anchors extends NSObjectProtocol {
}

declare class OS_ar_barcode_anchors extends NativeObject implements OS_ar_barcode_anchors {
}

declare interface OS_ar_device_anchor extends OS_ar_trackable_anchor {
}

declare class OS_ar_device_anchor extends NativeObject implements OS_ar_device_anchor {
}

declare interface OS_ar_barcode_detection_callbacks extends NSObjectProtocol {
}

declare class OS_ar_barcode_detection_callbacks extends NativeObject implements OS_ar_barcode_detection_callbacks {
}


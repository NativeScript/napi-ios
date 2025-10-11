/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const cp_tracking_area_identifier_invalid: number;

declare const cp_tracking_area_render_value_invalid: number;

declare const cp_layer_renderer_configuration_error_domain: interop.Pointer;

declare const cp_drawable_target: {
  cp_drawable_target_built_in: 0,
  cp_drawable_target_capture: 1,
};

declare const cp_drawable_state: {
  cp_drawable_state_available: 0,
  cp_drawable_state_rendering: 1,
  cp_drawable_state_presenting: 2,
};

declare const cp_layer_renderer_layout: {
  cp_layer_renderer_layout_dedicated: 0,
  cp_layer_renderer_layout_shared: 1,
  cp_layer_renderer_layout_layered: 2,
};

declare const cp_layer_renderer_state: {
  cp_layer_renderer_state_paused: 1,
  cp_layer_renderer_state_running: 2,
  cp_layer_renderer_state_invalidated: 3,
};

declare const cp_axis_direction_convention: {
  cp_axis_direction_convention_right_up_back: 0,
  cp_axis_direction_convention_right_up_forward: 1,
  cp_axis_direction_convention_right_down_back: 2,
  cp_axis_direction_convention_right_down_forward: 3,
};

declare const cp_layer_renderer_configuration_error_code: {
  cp_layer_renderer_configuration_error_code_missing_configuration: -20,
  cp_layer_renderer_configuration_error_code_unsupported_color_format: -4,
  cp_layer_renderer_configuration_error_code_unsupported_color_usage: -5,
  cp_layer_renderer_configuration_error_code_unsupported_depth_format: -7,
  cp_layer_renderer_configuration_error_code_unsupported_depth_usage: -8,
  cp_layer_renderer_configuration_error_code_variable_rasterization_rate_is_not_supported: -16,
  cp_layer_renderer_configuration_error_code_temporal_anti_aliasing_not_supported: -17,
  cp_layer_renderer_configuration_error_code_not_enough_frames_requested: -10,
  cp_layer_renderer_configuration_error_code_too_many_frames_requested: -11,
  cp_layer_renderer_configuration_error_code_unsupported_forward_depth_range: -101,
  cp_layer_renderer_configuration_error_code_layout_not_supported: -6,
  cp_layer_renderer_configuration_error_code_unsupported_near_plane_distance: -104,
  cp_layer_renderer_configuration_error_code_unsupported_tracking_areas_format: -21,
  cp_layer_renderer_configuration_error_code_unsupported_tracking_areas_usage: -22,
  cp_layer_renderer_configuration_error_code_unsupported_drawable_render_context_stencil_format: -23,
  cp_layer_renderer_configuration_error_code_unsupported_render_quality: -18,
};

declare const cp_supported_layouts_options: {
  cp_supported_layouts_options_none: 0,
  cp_supported_layouts_options_foveation_enabled: 1,
  cp_supported_layouts_options_progressive_immersion_enabled: 2,
};

declare const cp_supported_color_formats_options: {
  cp_supported_color_formats_options_none: 0,
  cp_supported_color_formats_options_progressive_immersion_enabled: 1,
};

declare class cp_drawable {
  constructor(init?: cp_drawable);
}

declare class cp_drawable_render_context {
  constructor(init?: cp_drawable_render_context);
}

declare class cp_view {
  constructor(init?: cp_view);
}

declare class cp_view_texture_map {
  constructor(init?: cp_view_texture_map);
}

declare class cp_frame_timing {
  constructor(init?: cp_frame_timing);
}

declare class cp_tracking_area {
  constructor(init?: cp_tracking_area);
}

declare class cp_hover_effect {
  constructor(init?: cp_hover_effect);
}

declare class cp_time {
  constructor(init?: cp_time);
  cp_mach_abs_time: number;
}

declare class cp_texture_topology {
  constructor(init?: cp_texture_topology);
}

declare class cp_drawable_array {
  constructor(init?: cp_drawable_array);
}

declare class cp_frame {
  constructor(init?: cp_frame);
}

declare function cp_retain(obj: interop.PointerConvertible): interop.Pointer;

declare function cp_release(obj: interop.PointerConvertible): void;

declare function cp_time_to_cf_time_interval(time: cp_time): number;

declare function cp_time_wait_until(time: cp_time): void;

declare function cp_tracking_area_get_render_value(tracking_area: interop.PointerConvertible): number;

declare function cp_tracking_area_get_identifier(tracking_area: interop.PointerConvertible): number;

declare function cp_tracking_area_add_automatic_hover_effect(tracking_area: interop.PointerConvertible): interop.Pointer;

declare function cp_frame_timing_get_optimal_input_time(frame_timing: interop.PointerConvertible): cp_time;

declare function cp_frame_timing_get_rendering_deadline(frame_timing: interop.PointerConvertible): cp_time;

declare function cp_frame_timing_get_presentation_time(frame_timing: interop.PointerConvertible): cp_time;

declare function cp_frame_timing_get_trackable_anchor_time(frame_timing: interop.PointerConvertible): cp_time;

declare function cp_layer_renderer_capabilities_supports_foveation(layer_capabilities: CP_OBJECT_cp_layer_renderer_capabilities): boolean;

declare function cp_layer_renderer_capabilities_supported_color_formats_count_with_options(layer_capabilities: CP_OBJECT_cp_layer_renderer_capabilities, options: interop.Enum<typeof cp_supported_color_formats_options>): number;

declare function cp_layer_renderer_capabilities_supported_color_format_with_options(layer_capabilities: CP_OBJECT_cp_layer_renderer_capabilities, options: interop.Enum<typeof cp_supported_color_formats_options>, index: number): interop.Enum<typeof MTLPixelFormat>;

declare function cp_layer_renderer_capabilities_supported_depth_formats_count(layer_capabilities: CP_OBJECT_cp_layer_renderer_capabilities): number;

declare function cp_layer_renderer_capabilities_supported_depth_format(layer_capabilities: CP_OBJECT_cp_layer_renderer_capabilities, index: number): interop.Enum<typeof MTLPixelFormat>;

declare function cp_layer_renderer_capabilities_supported_tracking_areas_formats_count(layer_capabilities: CP_OBJECT_cp_layer_renderer_capabilities): number;

declare function cp_layer_renderer_capabilities_supported_tracking_areas_format(layer_capabilities: CP_OBJECT_cp_layer_renderer_capabilities, index: number): interop.Enum<typeof MTLPixelFormat>;

declare function cp_layer_renderer_capabilities_supported_layouts_count(layer_capabilities: CP_OBJECT_cp_layer_renderer_capabilities, options: interop.Enum<typeof cp_supported_layouts_options>): number;

declare function cp_layer_renderer_capabilities_supported_layout(layer_capabilities: CP_OBJECT_cp_layer_renderer_capabilities, options: interop.Enum<typeof cp_supported_layouts_options>, index: number): interop.Enum<typeof cp_layer_renderer_layout>;

declare function cp_layer_renderer_capabilities_supported_minimum_near_plane_distance(layer_capabilities: CP_OBJECT_cp_layer_renderer_capabilities): number;

declare function cp_layer_renderer_capabilities_drawable_render_context_supported_stencil_formats_count(layer_capabilities: CP_OBJECT_cp_layer_renderer_capabilities): number;

declare function cp_layer_renderer_capabilities_drawable_render_context_supported_stencil_format(layer_capabilities: CP_OBJECT_cp_layer_renderer_capabilities, index: number): interop.Enum<typeof MTLPixelFormat>;

declare function cp_layer_renderer_capabilities_get_default_render_quality(layer_capabilities: CP_OBJECT_cp_layer_renderer_capabilities): number;

declare function cp_layer_renderer_configuration_get_color_format(configuration: CP_OBJECT_cp_layer_renderer_configuration): interop.Enum<typeof MTLPixelFormat>;

declare function cp_layer_renderer_configuration_set_color_format(configuration: CP_OBJECT_cp_layer_renderer_configuration, color_format: interop.Enum<typeof MTLPixelFormat>): void;

declare function cp_layer_renderer_configuration_get_color_usage(configuration: CP_OBJECT_cp_layer_renderer_configuration): interop.Enum<typeof MTLTextureUsage>;

declare function cp_layer_renderer_configuration_set_color_usage(configuration: CP_OBJECT_cp_layer_renderer_configuration, color_usage: interop.Enum<typeof MTLTextureUsage>): void;

declare function cp_layer_renderer_configuration_get_tracking_areas_format(configuration: CP_OBJECT_cp_layer_renderer_configuration): interop.Enum<typeof MTLPixelFormat>;

declare function cp_layer_renderer_configuration_set_tracking_areas_format(configuration: CP_OBJECT_cp_layer_renderer_configuration, tracking_areas_format: interop.Enum<typeof MTLPixelFormat>): void;

declare function cp_layer_renderer_configuration_get_tracking_areas_usage(configuration: CP_OBJECT_cp_layer_renderer_configuration): interop.Enum<typeof MTLTextureUsage>;

declare function cp_layer_renderer_configuration_set_tracking_areas_usage(configuration: CP_OBJECT_cp_layer_renderer_configuration, tracking_areas_usage: interop.Enum<typeof MTLTextureUsage>): void;

declare function cp_layer_renderer_configuration_get_depth_format(configuration: CP_OBJECT_cp_layer_renderer_configuration): interop.Enum<typeof MTLPixelFormat>;

declare function cp_layer_renderer_configuration_set_depth_format(configuration: CP_OBJECT_cp_layer_renderer_configuration, depth_format: interop.Enum<typeof MTLPixelFormat>): void;

declare function cp_layer_renderer_configuration_get_depth_usage(configuration: CP_OBJECT_cp_layer_renderer_configuration): interop.Enum<typeof MTLTextureUsage>;

declare function cp_layer_renderer_configuration_set_depth_usage(configuration: CP_OBJECT_cp_layer_renderer_configuration, depth_usage: interop.Enum<typeof MTLTextureUsage>): void;

declare function cp_layer_renderer_configuration_get_foveation_enabled(configuration: CP_OBJECT_cp_layer_renderer_configuration): boolean;

declare function cp_layer_renderer_configuration_set_foveation_enabled(configuration: CP_OBJECT_cp_layer_renderer_configuration, foveation_enabled: boolean): void;

declare function cp_layer_renderer_configuration_get_generate_flipped_rasterization_rate_maps(configuration: CP_OBJECT_cp_layer_renderer_configuration): boolean;

declare function cp_layer_renderer_configuration_set_generate_flipped_rasterization_rate_maps(configuration: CP_OBJECT_cp_layer_renderer_configuration, generate_flipped_rasterization_rate_maps: boolean): void;

declare function cp_layer_renderer_configuration_get_layout(configuration: CP_OBJECT_cp_layer_renderer_configuration): interop.Enum<typeof cp_layer_renderer_layout>;

declare function cp_layer_renderer_configuration_set_layout(configuration: CP_OBJECT_cp_layer_renderer_configuration, layout: interop.Enum<typeof cp_layer_renderer_layout>): void;

declare function cp_layer_renderer_configuration_get_default_depth_range(configuration: CP_OBJECT_cp_layer_renderer_configuration): unknown /* ext vector */;

declare function cp_layer_renderer_configuration_set_default_depth_range(configuration: CP_OBJECT_cp_layer_renderer_configuration, depth_range: unknown /* ext vector */): void;

declare function cp_layer_renderer_configuration_set_drawable_render_context_stencil_format(configuration: CP_OBJECT_cp_layer_renderer_configuration, stencil_format: interop.Enum<typeof MTLPixelFormat>): void;

declare function cp_layer_renderer_configuration_get_drawable_render_context_stencil_format(configuration: CP_OBJECT_cp_layer_renderer_configuration): interop.Enum<typeof MTLPixelFormat>;

declare function cp_layer_renderer_configuration_get_drawable_render_context_raster_sample_count(configuration: CP_OBJECT_cp_layer_renderer_configuration): number;

declare function cp_layer_renderer_configuration_set_drawable_render_context_raster_sample_count(configuration: CP_OBJECT_cp_layer_renderer_configuration, raster_sample_count: number): void;

declare function cp_layer_renderer_configuration_get_max_render_quality(configuration: CP_OBJECT_cp_layer_renderer_configuration): number;

declare function cp_layer_renderer_configuration_set_max_render_quality(configuration: CP_OBJECT_cp_layer_renderer_configuration, render_quality: number): void;

declare function cp_layer_renderer_configuration_get_supports_mtl4(configuration: CP_OBJECT_cp_layer_renderer_configuration): boolean;

declare function cp_layer_renderer_configuration_set_supports_mtl4(configuration: CP_OBJECT_cp_layer_renderer_configuration, supports_mtl4: boolean): void;

declare function cp_texture_topology_get_array_length(texture_topology: interop.PointerConvertible): number;

declare function cp_texture_topology_get_texture_type(texture_topology: interop.PointerConvertible): interop.Enum<typeof MTLTextureType>;

declare function cp_layer_renderer_properties_create_using_configuration(configuration: CP_OBJECT_cp_layer_renderer_configuration, error: interop.PointerConvertible): CP_OBJECT_cp_layer_renderer_properties;

declare function cp_layer_renderer_properties_get_texture_topology_count(layer_properties: CP_OBJECT_cp_layer_renderer_properties): number;

declare function cp_layer_renderer_properties_get_texture_topology(layer_properties: CP_OBJECT_cp_layer_renderer_properties, index: number): interop.Pointer;

declare function cp_layer_renderer_properties_get_view_count(layer_properties: CP_OBJECT_cp_layer_renderer_properties): number;

declare function cp_layer_renderer_properties_get_tracking_areas_max_value(properties: CP_OBJECT_cp_layer_renderer_properties): number;

declare function cp_view_texture_map_get_texture_index(view_texture_map: interop.PointerConvertible): number;

declare function cp_view_texture_map_get_slice_index(view_texture_map: interop.PointerConvertible): number;

declare function cp_view_texture_map_get_viewport(view_texture_map: interop.PointerConvertible): MTLViewport;

declare function cp_view_get_view_texture_map(view: interop.PointerConvertible): interop.Pointer;

declare function cp_view_get_transform(view: interop.PointerConvertible): simd_float4x4;

declare function cp_drawable_render_context_draw_mask_on_stencil_attachment(render_context: interop.PointerConvertible, command_encoder: MTLRenderCommandEncoder, value: number): void;

declare function cp_drawable_render_context_end_encoding(render_context: interop.PointerConvertible, command_encoder: MTLRenderCommandEncoder): void;

declare function cp_drawable_render_context_mtl4_draw_mask_on_stencil_attachment(render_context: interop.PointerConvertible, command_encoder: MTL4RenderCommandEncoder, value: number): void;

declare function cp_drawable_render_context_mtl4_end_encoding(render_context: interop.PointerConvertible, command_encoder: MTL4RenderCommandEncoder): void;

declare function cp_drawable_get_texture_count(drawable: interop.PointerConvertible): number;

declare function cp_drawable_get_tracking_areas_texture_count(drawable: interop.PointerConvertible): number;

declare function cp_drawable_get_depth_texture(drawable: interop.PointerConvertible, index: number): MTLTexture;

declare function cp_drawable_get_color_texture(drawable: interop.PointerConvertible, index: number): MTLTexture;

declare function cp_drawable_get_tracking_areas_texture(drawable: interop.PointerConvertible, index: number): MTLTexture;

declare function cp_drawable_add_tracking_area(drawable: interop.PointerConvertible, identifier: number): interop.Pointer;

declare function cp_drawable_get_rasterization_rate_map_count(drawable: interop.PointerConvertible): number;

declare function cp_drawable_get_rasterization_rate_map(drawable: interop.PointerConvertible, index: number): MTLRasterizationRateMap;

declare function cp_drawable_get_flipped_rasterization_rate_map(drawable: interop.PointerConvertible, index: number): MTLRasterizationRateMap;

declare function cp_drawable_get_view_count(drawable: interop.PointerConvertible): number;

declare function cp_drawable_get_view(drawable: interop.PointerConvertible, index: number): interop.Pointer;

declare function cp_drawable_set_device_anchor(drawable: interop.PointerConvertible, device_anchor: NSObject): void;

declare function cp_drawable_get_device_anchor(drawable: interop.PointerConvertible): NSObject;

declare function cp_drawable_get_depth_range(drawable: interop.PointerConvertible): unknown /* ext vector */;

declare function cp_drawable_set_depth_range(drawable: interop.PointerConvertible, depth_range: unknown /* ext vector */): void;

declare function cp_drawable_encode_present(drawable: interop.PointerConvertible, command_buffer: MTLCommandBuffer): void;

declare function cp_drawable_mtl4_encode_present(drawable: interop.PointerConvertible): void;

declare function cp_drawable_get_state(drawable: interop.PointerConvertible): interop.Enum<typeof cp_drawable_state>;

declare function cp_drawable_get_target(drawable: interop.PointerConvertible): interop.Enum<typeof cp_drawable_target>;

declare function cp_drawable_get_presentation_frame_index(drawable: interop.PointerConvertible): number;

declare function cp_drawable_get_frame_timing(drawable: interop.PointerConvertible): interop.Pointer;

declare function cp_drawable_compute_projection(drawable: interop.PointerConvertible, normalized_device_coordinates_convension: interop.Enum<typeof cp_axis_direction_convention>, view_index: number): simd_float4x4;

declare function cp_drawable_add_render_context(drawable: interop.PointerConvertible, cmd_buffer: MTLCommandBuffer): interop.Pointer;

declare function cp_drawable_add_mtl4_render_context(drawable: interop.PointerConvertible): interop.Pointer;

declare function cp_drawable_array_get_drawable(drawable_array: interop.PointerConvertible, index: number): interop.Pointer;

declare function cp_drawable_array_get_count(drawable_array: interop.PointerConvertible): number;

declare function cp_frame_get_frame_index(frame: interop.PointerConvertible): number;

declare function cp_frame_predict_timing(frame: interop.PointerConvertible): interop.Pointer;

declare function cp_frame_query_drawables(frame: interop.PointerConvertible): interop.Pointer;

declare function cp_frame_start_update(frame: interop.PointerConvertible): void;

declare function cp_frame_end_update(frame: interop.PointerConvertible): void;

declare function cp_frame_start_submission(frame: interop.PointerConvertible): void;

declare function cp_frame_end_submission(frame: interop.PointerConvertible): void;

declare function cp_frame_monocular_frustum_matrix_for_drawable_target(frame: interop.PointerConvertible, drawable_target: interop.Enum<typeof cp_drawable_target>, normalized_device_coordinates_convension: interop.Enum<typeof cp_axis_direction_convention>, view_index: number, increase_tangents: unknown /* ext vector */, depth_range: unknown /* ext vector */): simd_float4x4;

declare function cp_frame_binocular_frustum_matrix_for_drawable_target(frame: interop.PointerConvertible, drawable_target: interop.Enum<typeof cp_drawable_target>, convention: interop.Enum<typeof cp_axis_direction_convention>, increase_tangents: unknown /* ext vector */, depth_range: unknown /* ext vector */): simd_float4x4;

declare function cp_frame_get_drawable_target_view_count(frame: interop.PointerConvertible, drawable_target: interop.Enum<typeof cp_drawable_target>): number;

declare function cp_frame_monocular_frustum_matrix(frame: interop.PointerConvertible, normalized_device_coordinates_convension: interop.Enum<typeof cp_axis_direction_convention>, view_index: number, increase_tangents: unknown /* ext vector */, depth_range: unknown /* ext vector */): simd_float4x4;

declare function cp_frame_binocular_frustum_matrix(frame: interop.PointerConvertible, convention: interop.Enum<typeof cp_axis_direction_convention>, increase_tangents: unknown /* ext vector */, depth_range: unknown /* ext vector */): simd_float4x4;

declare function cp_layer_renderer_get_configuration(layer_renderer: CP_OBJECT_cp_layer_renderer): CP_OBJECT_cp_layer_renderer_configuration;

declare function cp_layer_renderer_get_properties(layer_renderer: CP_OBJECT_cp_layer_renderer): CP_OBJECT_cp_layer_renderer_properties;

declare function cp_layer_renderer_get_device(layer_renderer: CP_OBJECT_cp_layer_renderer): MTLDevice;

declare function cp_layer_renderer_get_mtl4_command_queue(layer_renderer: CP_OBJECT_cp_layer_renderer): MTL4CommandQueue;

declare function cp_layer_renderer_get_state(layer_renderer: CP_OBJECT_cp_layer_renderer): interop.Enum<typeof cp_layer_renderer_state>;

declare function cp_layer_renderer_wait_until_running(layer_renderer: CP_OBJECT_cp_layer_renderer): void;

declare function cp_layer_renderer_query_next_frame(layer_renderer: CP_OBJECT_cp_layer_renderer): interop.Pointer;

declare function cp_layer_renderer_get_minimum_frame_repeat_count(layer_renderer: CP_OBJECT_cp_layer_renderer): number;

declare function cp_layer_renderer_set_minimum_frame_repeat_count(layer_renderer: CP_OBJECT_cp_layer_renderer, frame_repeat_count: number): void;

declare function cp_layer_renderer_get_render_quality(layer_renderer: CP_OBJECT_cp_layer_renderer): number;

declare function cp_layer_renderer_set_render_quality(layer_renderer: CP_OBJECT_cp_layer_renderer, render_quality: number): void;

declare class CP_OBJECT_cp_layer_renderer extends NSObject {
}

declare class CP_OBJECT_cp_layer_renderer_configuration extends NSObject {
}

declare class CP_OBJECT_cp_layer_renderer_properties extends NSObject {
}

declare class CP_OBJECT_cp_layer_renderer_capabilities extends NSObject {
}


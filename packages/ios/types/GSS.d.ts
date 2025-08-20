/// <reference types="@nativescript/objc-node-api" />

declare const __gss_krb5_nt_principal_name_oid_desc: gss_OID_desc_struct;

declare const __gss_krb5_nt_principal_oid_desc: gss_OID_desc_struct;

declare const __gss_krb5_nt_principal_name_referral_oid_desc: gss_OID_desc_struct;

declare const __gss_spnego_mechanism_oid_desc: gss_OID_desc_struct;

declare class gss_name_t_desc_struct {
  constructor(init?: gss_name_t_desc_struct);
}

declare class gss_OID_set_desc_struct {
  constructor(init?: gss_OID_set_desc_struct);
  count: number;
  elements: interop.Pointer;
}

declare class gss_buffer_set_desc_struct {
  constructor(init?: gss_buffer_set_desc_struct);
  count: number;
  elements: interop.Pointer;
}

declare class gss_OID_desc_struct {
  constructor(init?: gss_OID_desc_struct);
  length: number;
  elements: interop.Pointer;
}

declare class gss_cred_id_t_desc_struct {
  constructor(init?: gss_cred_id_t_desc_struct);
}

declare class krb5_ccache_data {
  constructor(init?: krb5_ccache_data);
}

declare class gss_buffer_desc_struct {
  constructor(init?: gss_buffer_desc_struct);
  length: number;
  value: interop.Pointer;
}

declare class gss_krb5_lucid_context_version {
  constructor(init?: gss_krb5_lucid_context_version);
  version: number;
}

declare class gss_krb5_lucid_context_v1 {
  constructor(init?: gss_krb5_lucid_context_v1);
  version: number;
  initiate: number;
  endtime: number;
  send_seq: number;
  recv_seq: number;
  protocol: number;
  rfc1964_kd: gss_krb5_rfc1964_keydata;
  cfx_kd: gss_krb5_cfx_keydata;
}

declare class gss_ctx_id_t_desc_struct {
  constructor(init?: gss_ctx_id_t_desc_struct);
}

declare class gss_krb5_rfc1964_keydata {
  constructor(init?: gss_krb5_rfc1964_keydata);
  sign_alg: number;
  seal_alg: number;
  ctx_key: gss_krb5_lucid_key;
}

declare class gss_channel_bindings_struct {
  constructor(init?: gss_channel_bindings_struct);
  initiator_addrtype: number;
  initiator_address: gss_buffer_desc_struct;
  acceptor_addrtype: number;
  acceptor_address: gss_buffer_desc_struct;
  application_data: gss_buffer_desc_struct;
}

declare class gss_krb5_cfx_keydata {
  constructor(init?: gss_krb5_cfx_keydata);
  have_acceptor_subkey: number;
  ctx_key: gss_krb5_lucid_key;
  acceptor_subkey: gss_krb5_lucid_key;
}

declare class gss_krb5_lucid_key {
  constructor(init?: gss_krb5_lucid_key);
  type: number;
  length: number;
  data: interop.Pointer;
}

declare function gss_accept_sec_context(minor_status: interop.PointerConvertible, context_handle: interop.PointerConvertible, acceptor_cred_handle: interop.PointerConvertible, input_token: interop.PointerConvertible, input_chan_bindings: interop.PointerConvertible, src_name: interop.PointerConvertible, mech_type: interop.PointerConvertible, output_token: interop.PointerConvertible, ret_flags: interop.PointerConvertible, time_rec: interop.PointerConvertible, delegated_cred_handle: interop.PointerConvertible): number;

declare function gss_acquire_cred(minor_status: interop.PointerConvertible, desired_name: interop.PointerConvertible, time_req: number, desired_mechs: interop.PointerConvertible, cred_usage: number, output_cred_handle: interop.PointerConvertible, actual_mechs: interop.PointerConvertible, time_rec: interop.PointerConvertible): number;

declare function gss_acquire_cred_with_password(minor_status: interop.PointerConvertible, desired_name: interop.PointerConvertible, password: interop.PointerConvertible, time_req: number, desired_mechs: interop.PointerConvertible, cred_usage: number, output_cred_handle: interop.PointerConvertible, actual_mechs: interop.PointerConvertible, time_rec: interop.PointerConvertible): number;

declare function gss_add_buffer_set_member(minor_status: interop.PointerConvertible, member_buffer: interop.PointerConvertible, buffer_set: interop.PointerConvertible): number;

declare function gss_add_cred(minor_status: interop.PointerConvertible, input_cred_handle: interop.PointerConvertible, desired_name: interop.PointerConvertible, desired_mech: interop.PointerConvertible, cred_usage: number, initiator_time_req: number, acceptor_time_req: number, output_cred_handle: interop.PointerConvertible, actual_mechs: interop.PointerConvertible, initiator_time_rec: interop.PointerConvertible, acceptor_time_rec: interop.PointerConvertible): number;

declare function gss_add_oid_set_member(minor_status: interop.PointerConvertible, member_oid: interop.PointerConvertible, oid_set: interop.PointerConvertible): number;

declare function gss_canonicalize_name(minor_status: interop.PointerConvertible, input_name: interop.PointerConvertible, mech_type: interop.PointerConvertible, output_name: interop.PointerConvertible): number;

declare function gss_compare_name(minor_status: interop.PointerConvertible, name1_arg: interop.PointerConvertible, name2_arg: interop.PointerConvertible, name_equal: interop.PointerConvertible): number;

declare function gss_context_time(minor_status: interop.PointerConvertible, context_handle: interop.PointerConvertible, time_rec: interop.PointerConvertible): number;

declare function gss_create_empty_buffer_set(minor_status: interop.PointerConvertible, buffer_set: interop.PointerConvertible): number;

declare function gss_create_empty_oid_set(minor_status: interop.PointerConvertible, oid_set: interop.PointerConvertible): number;

declare function gss_decapsulate_token(input_token: interop.PointerConvertible, oid: interop.PointerConvertible, output_token: interop.PointerConvertible): number;

declare function gss_delete_sec_context(minor_status: interop.PointerConvertible, context_handle: interop.PointerConvertible, output_token: interop.PointerConvertible): number;

declare function gss_destroy_cred(min_stat: interop.PointerConvertible, cred_handle: interop.PointerConvertible): number;

declare function gss_display_mech_attr(minor_status: interop.PointerConvertible, mech_attr: interop.PointerConvertible, name: interop.PointerConvertible, short_desc: interop.PointerConvertible, long_desc: interop.PointerConvertible): number;

declare function gss_display_name(minor_status: interop.PointerConvertible, input_name: interop.PointerConvertible, output_name_buffer: interop.PointerConvertible, output_name_type: interop.PointerConvertible): number;

declare function gss_display_status(minor_status: interop.PointerConvertible, status_value: number, status_type: number, mech_type: interop.PointerConvertible, message_content: interop.PointerConvertible, status_string: interop.PointerConvertible): number;

declare function gss_duplicate_name(minor_status: interop.PointerConvertible, src_name: interop.PointerConvertible, dest_name: interop.PointerConvertible): number;

declare function gss_duplicate_oid(minor_status: interop.PointerConvertible, src_oid: interop.PointerConvertible, dest_oid: interop.PointerConvertible): number;

declare function gss_encapsulate_token(input_token: interop.PointerConvertible, oid: interop.PointerConvertible, output_token: interop.PointerConvertible): number;

declare function gss_export_cred(minor_status: interop.PointerConvertible, cred_handle: interop.PointerConvertible, token: interop.PointerConvertible): number;

declare function gss_export_name(minor_status: interop.PointerConvertible, input_name: interop.PointerConvertible, exported_name: interop.PointerConvertible): number;

declare function gss_export_sec_context(minor_status: interop.PointerConvertible, context_handle: interop.PointerConvertible, interprocess_token: interop.PointerConvertible): number;

declare function gss_get_mic(minor_status: interop.PointerConvertible, context_handle: interop.PointerConvertible, qop_req: number, message_buffer: interop.PointerConvertible, message_token: interop.PointerConvertible): number;

declare function gss_import_cred(minor_status: interop.PointerConvertible, token: interop.PointerConvertible, cred_handle: interop.PointerConvertible): number;

declare function gss_import_name(minor_status: interop.PointerConvertible, input_name_buffer: interop.PointerConvertible, input_name_type: interop.PointerConvertible, output_name: interop.PointerConvertible): number;

declare function gss_import_sec_context(minor_status: interop.PointerConvertible, interprocess_token: interop.PointerConvertible, context_handle: interop.PointerConvertible): number;

declare function gss_indicate_mechs(minor_status: interop.PointerConvertible, mech_set: interop.PointerConvertible): number;

declare function gss_indicate_mechs_by_attrs(minor_status: interop.PointerConvertible, desired_mech_attrs: interop.PointerConvertible, except_mech_attrs: interop.PointerConvertible, critical_mech_attrs: interop.PointerConvertible, mechs: interop.PointerConvertible): number;

declare function gss_init_sec_context(minor_status: interop.PointerConvertible, initiator_cred_handle: interop.PointerConvertible, context_handle: interop.PointerConvertible, target_name: interop.PointerConvertible, input_mech_type: interop.PointerConvertible, req_flags: number, time_req: number, input_chan_bindings: interop.PointerConvertible, input_token: interop.PointerConvertible, actual_mech_type: interop.PointerConvertible, output_token: interop.PointerConvertible, ret_flags: interop.PointerConvertible, time_rec: interop.PointerConvertible): number;

declare function gss_inquire_attrs_for_mech(minor_status: interop.PointerConvertible, mech: interop.PointerConvertible, mech_attr: interop.PointerConvertible, known_mech_attrs: interop.PointerConvertible): number;

declare function gss_inquire_context(minor_status: interop.PointerConvertible, context_handle: interop.PointerConvertible, src_name: interop.PointerConvertible, targ_name: interop.PointerConvertible, lifetime_rec: interop.PointerConvertible, mech_type: interop.PointerConvertible, ctx_flags: interop.PointerConvertible, locally_initiated: interop.PointerConvertible, xopen: interop.PointerConvertible): number;

declare function gss_inquire_cred(minor_status: interop.PointerConvertible, cred_handle: interop.PointerConvertible, name_ret: interop.PointerConvertible, lifetime: interop.PointerConvertible, cred_usage: interop.PointerConvertible, mechanisms: interop.PointerConvertible): number;

declare function gss_inquire_cred_by_mech(minor_status: interop.PointerConvertible, cred_handle: interop.PointerConvertible, mech_type: interop.PointerConvertible, cred_name: interop.PointerConvertible, initiator_lifetime: interop.PointerConvertible, acceptor_lifetime: interop.PointerConvertible, cred_usage: interop.PointerConvertible): number;

declare function gss_inquire_cred_by_oid(minor_status: interop.PointerConvertible, cred_handle: interop.PointerConvertible, desired_object: interop.PointerConvertible, data_set: interop.PointerConvertible): number;

declare function gss_inquire_mech_for_saslname(minor_status: interop.PointerConvertible, sasl_mech_name: interop.PointerConvertible, mech_type: interop.PointerConvertible): number;

declare function gss_inquire_mechs_for_name(minor_status: interop.PointerConvertible, input_name: interop.PointerConvertible, mech_types: interop.PointerConvertible): number;

declare function gss_inquire_name(minor_status: interop.PointerConvertible, input_name: interop.PointerConvertible, name_is_MN: interop.PointerConvertible, MN_mech: interop.PointerConvertible, attrs: interop.PointerConvertible): number;

declare function gss_inquire_names_for_mech(minor_status: interop.PointerConvertible, mechanism: interop.PointerConvertible, name_types: interop.PointerConvertible): number;

declare function gss_inquire_saslname_for_mech(minor_status: interop.PointerConvertible, desired_mech: interop.PointerConvertible, sasl_mech_name: interop.PointerConvertible, mech_name: interop.PointerConvertible, mech_description: interop.PointerConvertible): number;

declare function gss_inquire_sec_context_by_oid(minor_status: interop.PointerConvertible, context_handle: interop.PointerConvertible, desired_object: interop.PointerConvertible, data_set: interop.PointerConvertible): number;

declare function gss_iter_creds(min_stat: interop.PointerConvertible, flags: number, mech: interop.PointerConvertible, useriter: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void): number;

declare function gss_iter_creds_f(min_stat: interop.PointerConvertible, flags: number, mech: interop.PointerConvertible, userctx: interop.PointerConvertible, useriter: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void): number;

declare function gss_krb5_ccache_name(minor_status: interop.PointerConvertible, name: string, out_name: interop.PointerConvertible): number;

declare function gss_krb5_copy_ccache(minor_status: interop.PointerConvertible, cred: interop.PointerConvertible, out: interop.PointerConvertible): number;

declare function gss_krb5_export_lucid_sec_context(minor_status: interop.PointerConvertible, context_handle: interop.PointerConvertible, version: number, rctx: interop.PointerConvertible): number;

declare function gss_krb5_free_lucid_sec_context(minor_status: interop.PointerConvertible, c: interop.PointerConvertible): number;

declare function gss_krb5_set_allowable_enctypes(minor_status: interop.PointerConvertible, cred: interop.PointerConvertible, num_enctypes: number, enctypes: interop.PointerConvertible): number;

declare function gss_oid_equal(a: interop.PointerConvertible, b: interop.PointerConvertible): number;

declare function gss_oid_to_str(minor_status: interop.PointerConvertible, oid: interop.PointerConvertible, oid_str: interop.PointerConvertible): number;

declare function gss_process_context_token(minor_status: interop.PointerConvertible, context_handle: interop.PointerConvertible, token_buffer: interop.PointerConvertible): number;

declare function gss_pseudo_random(minor_status: interop.PointerConvertible, context: interop.PointerConvertible, prf_key: number, prf_in: interop.PointerConvertible, desired_output_len: number, prf_out: interop.PointerConvertible): number;

declare function gss_release_buffer(minor_status: interop.PointerConvertible, buffer: interop.PointerConvertible): number;

declare function gss_release_buffer_set(minor_status: interop.PointerConvertible, buffer_set: interop.PointerConvertible): number;

declare function gss_release_cred(minor_status: interop.PointerConvertible, cred_handle: interop.PointerConvertible): number;

declare function gss_release_name(minor_status: interop.PointerConvertible, input_name: interop.PointerConvertible): number;

declare function gss_release_oid(minor_status: interop.PointerConvertible, oid: interop.PointerConvertible): number;

declare function gss_release_oid_set(minor_status: interop.PointerConvertible, set: interop.PointerConvertible): number;

declare function gss_seal(minor_status: interop.PointerConvertible, context_handle: interop.PointerConvertible, conf_req_flag: number, qop_req: number, input_message_buffer: interop.PointerConvertible, conf_state: interop.PointerConvertible, output_message_buffer: interop.PointerConvertible): number;

declare function gss_set_cred_option(minor_status: interop.PointerConvertible, cred_handle: interop.PointerConvertible, object: interop.PointerConvertible, value: interop.PointerConvertible): number;

declare function gss_set_sec_context_option(minor_status: interop.PointerConvertible, context_handle: interop.PointerConvertible, object: interop.PointerConvertible, value: interop.PointerConvertible): number;

declare function gss_sign(minor_status: interop.PointerConvertible, context_handle: interop.PointerConvertible, qop_req: number, message_buffer: interop.PointerConvertible, message_token: interop.PointerConvertible): number;

declare function gss_test_oid_set_member(minor_status: interop.PointerConvertible, member: interop.PointerConvertible, set: interop.PointerConvertible, present: interop.PointerConvertible): number;

declare function gss_unseal(minor_status: interop.PointerConvertible, context_handle: interop.PointerConvertible, input_message_buffer: interop.PointerConvertible, output_message_buffer: interop.PointerConvertible, conf_state: interop.PointerConvertible, qop_state: interop.PointerConvertible): number;

declare function gss_unwrap(minor_status: interop.PointerConvertible, context_handle: interop.PointerConvertible, input_message_buffer: interop.PointerConvertible, output_message_buffer: interop.PointerConvertible, conf_state: interop.PointerConvertible, qop_state: interop.PointerConvertible): number;

declare function gss_userok(name: interop.PointerConvertible, user: string): number;

declare function gss_verify(minor_status: interop.PointerConvertible, context_handle: interop.PointerConvertible, message_buffer: interop.PointerConvertible, token_buffer: interop.PointerConvertible, qop_state: interop.PointerConvertible): number;

declare function gss_verify_mic(minor_status: interop.PointerConvertible, context_handle: interop.PointerConvertible, message_buffer: interop.PointerConvertible, token_buffer: interop.PointerConvertible, qop_state: interop.PointerConvertible): number;

declare function gss_wrap(minor_status: interop.PointerConvertible, context_handle: interop.PointerConvertible, conf_req_flag: number, qop_req: number, input_message_buffer: interop.PointerConvertible, conf_state: interop.PointerConvertible, output_message_buffer: interop.PointerConvertible): number;

declare function gss_wrap_size_limit(minor_status: interop.PointerConvertible, context_handle: interop.PointerConvertible, conf_req_flag: number, qop_req: number, req_output_size: number, max_input_size: interop.PointerConvertible): number;

declare function gsskrb5_extract_authz_data_from_sec_context(minor_status: interop.PointerConvertible, context_handle: interop.PointerConvertible, ad_type: number, ad_data: interop.PointerConvertible): number;

declare function gsskrb5_register_acceptor_identity(identity: string): number;

declare function krb5_gss_register_acceptor_identity(identity: string): number;

declare function GSSCreateCredentialFromUUID(uuid: interop.PointerConvertible): interop.Pointer;

declare function GSSCreateError(mech: interop.PointerConvertible, major_status: number, minor_status: number): interop.Pointer;

declare function GSSCreateName(name: interop.PointerConvertible, name_type: interop.PointerConvertible, error: interop.PointerConvertible): interop.Pointer;

declare function GSSCredentialCopyName(cred: interop.PointerConvertible): interop.Pointer;

declare function GSSCredentialCopyUUID(credential: interop.PointerConvertible): interop.Pointer;

declare function GSSCredentialGetLifetime(cred: interop.PointerConvertible): number;

declare function GSSNameCreateDisplayString(name: interop.PointerConvertible): interop.Pointer;

declare function gss_aapl_change_password(name: interop.PointerConvertible, mech: interop.PointerConvertible, attributes: interop.PointerConvertible, error: interop.PointerConvertible): number;

declare function gss_aapl_initial_cred(desired_name: interop.PointerConvertible, desired_mech: interop.PointerConvertible, attributes: interop.PointerConvertible, output_cred_handle: interop.PointerConvertible, error: interop.PointerConvertible): number;


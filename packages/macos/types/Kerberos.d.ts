/// <reference types="@nativescript/objc-node-api" />

declare const CC_LOCK_READER: number;

declare const CC_LOCK_UNLOCK: number;

declare const CC_CRED_V4: number;

declare const CC_ERR_CACHE_FULL: number;

declare const CC_ERR_CACHE_RELEASE: number;

declare const CC_BAD_PARM: number;

declare const CC_NOT_SUPP: number;

declare const CC_NO_EXIST: number;

declare const CC_LOCKED: number;

declare const CC_FORMAT: number;

declare const CC_IO: number;

declare const CC_NOERROR: number;

declare const CC_API_VER_2: number;

declare const KRB_REALM_SZ: number;

declare const klCantDisplayUIErr: number;

declare const klPasswordMismatchErr: number;

declare const klCredentialsNeedValidationErr: number;

declare const klCredentialsBadAddressErr: number;

declare const klNoCredentialsErr: number;

declare const klCredentialsExpiredErr: number;

declare const klPrincipalDoesNotExistErr: number;

declare const klPreferencesReadErr: number;

declare const klBufferTooLargeErr: number;

declare const klBufferTooSmallErr: number;

declare const klBadV5ContextErr: number;

declare const klBadPrincipalErr: number;

declare const realmList_End: number;

declare const loginOption_DefaultForwardableTicket: number;

declare const loginOption_MaximalRenewableLifetime: number;

declare const loginOption_MaximalTicketLifetime: number;

declare const loginOption_RememberExtras: number;

declare const loginOption_RememberPrincipal: number;

declare const loginLibrary_UnknownDialog: number;

declare const loginLibrary_ProgressDialog: number;

declare const loginLibrary_ChangePasswordDialog: number;

declare const kerberosVersion_V4: number;

declare const cc_v4_ticket_size: number;

declare const cc_v4_realm_size: number;

declare const ccErrClientNotFound: number;

declare const ccErrBadInternalMessage: number;

declare const ccErrCCacheLocked: number;

declare const ccErrBadAPIVersion: number;

declare const ccErrInvalidLock: number;

declare const ccErrInvalidCredentialsIterator: number;

declare const ccErrInvalidCCacheIterator: number;

declare const ccErrInvalidCredentials: number;

declare const ccErrInvalidCCache: number;

declare const ccapi_version_6: number;

declare const ccapi_version_4: number;

declare const ccapi_version_3: number;

declare const klBadLoginOptionsErr: number;

declare const klV5InitializationFailedErr: number;

declare const CC_NOMEM: number;

declare const kerberosVersion_Any: number;

declare const loginOption_MinimalTicketLifetime: number;

declare const klCantContactServerErr: number;

declare const klNoRealmsErr: number;

declare const klMemFullErr: number;

declare const KRB_INSTANCE_SZ: number;

declare const loginOption_LoginName: number;

declare const ccErrBadLockType: number;

declare const ccErrCredentialsNotFound: number;

declare const CC_LOCK_WRITER: number;

declare const ccErrServerInsecure: number;

declare const ccErrNotImplemented: number;

declare const ccIteratorEnd: number;

declare const klSystemDefaultDoesNotExistErr: number;

declare const CC_CRED_MAX: number;

declare const ccErrContextLocked: number;

declare const klNoErr: number;

declare const CC_CRED_V5: number;

declare const CC_BAD_API_VERSION: number;

declare const loginOption_DefaultTicketLifetime: number;

declare const klInsecurePasswordErr: number;

declare const CC_ERR_CRED_VERSION: number;

declare const loginLibrary_LoginDialog: number;

declare const ccErrBadParam: number;

declare const ccapi_version_5: number;

declare const kerberosVersion_V5: number;

declare const loginOption_LoginInstance: number;

declare const klParameterErr: number;

declare const realmList_Start: number;

declare const ccErrContextUnlocked: number;

declare const ccErrBadCredentialsVersion: number;

declare const klCacheDoesNotExistErr: number;

declare const CC_BADNAME: number;

declare const ccapi_version_max: number;

declare const klPreferencesWriteErr: number;

declare const kerberosVersion_All: number;

declare const loginOption_MinimalRenewableLifetime: number;

declare const klUserCanceledErr: number;

declare const ccErrBadName: number;

declare const loginOption_DefaultAddresslessTicket: number;

declare const ccErrInvalidContext: number;

declare const MAX_V4_CRED_LEN: number;

declare const CC_NOTFOUND: number;

declare const CC_LOCK_NOBLOCK: number;

declare const ccErrNoMem: number;

declare const CC_CRED_UNKNOWN: number;

declare const ccNoError: number;

declare const klPasswordChangeFailedErr: number;

declare const CC_WRITE: number;

declare const ccErrInvalidString: number;

declare const ccErrContextNotFound: number;

declare const ccErrCCacheNotFound: number;

declare const loginOption_DefaultProxiableTicket: number;

declare const klRealmDoesNotExistErr: number;

declare const ccErrTimeOffsetNotSet: number;

declare const CC_ERR_CACHE_ATTACH: number;

declare const loginOption_DefaultRenewableLifetime: number;

declare const loginOption_DefaultRenewableTicket: number;

declare const klCapsLockErr: number;

declare const ccapi_version_2: number;

declare const ccapi_version_7: number;

declare const ccErrNeverDefault: number;

declare const loginLibrary_OptionsDialog: number;

declare const klInvalidOptionErr: number;

declare const ccErrServerCantBecomeUID: number;

declare const CC_END: number;

declare const klInvalidVersionErr: number;

declare const cc_v4_instance_size: number;

declare const cc_v4_key_size: number;

declare const loginLibrary_PrompterDialog: number;

declare const KRB_NAME_SZ: number;

declare const cc_v4_name_size: number;

declare const ccErrServerUnavailable: number;

declare const ccErrCCacheUnlocked: number;

declare const klServerInsecureErr: number;

declare const klBadPasswordErr: number;

declare const klNoHostnameErr: number;

declare const klBadOptionValueErr: number;

declare const cc_lock_types: {
  cc_lock_read: 0,
  cc_lock_write: 1,
  cc_lock_upgrade: 2,
  cc_lock_downgrade: 3,
};

declare const cc_lock_modes: {
  cc_lock_noblock: 0,
  cc_lock_block: 1,
};

declare const cc_credential_versions: {
  cc_credentials_v4: 1,
  cc_credentials_v5: 2,
  cc_credentials_v4_v5: 3,
};

declare const cc_string_to_key_type: {
  cc_v4_stk_afs: 0,
  cc_v4_stk_des: 1,
  cc_v4_stk_columbia_special: 2,
  cc_v4_stk_krb5: 3,
  cc_v4_stk_unknown: 4,
};

declare class infoNC {
  constructor(init?: infoNC);
  name: string | null;
  principal: string | null;
  vers: number;
}

declare class cc_credentials_v4_compat {
  constructor(init?: cc_credentials_v4_compat);
  kversion: number;
  principal: unknown /* const array */;
  principal_instance: unknown /* const array */;
  service: unknown /* const array */;
  service_instance: unknown /* const array */;
  realm: unknown /* const array */;
  session_key: unknown /* const array */;
  kvno: number;
  str_to_key: number;
  issue_date: number;
  lifetime: number;
  address: number;
  ticket_sz: number;
  ticket: unknown /* const array */;
  oops: number;
}

declare class kim_identity_opaque {
  constructor(init?: kim_identity_opaque);
}

declare class cc_string_d {
  constructor(init?: cc_string_d);
  data: string | null;
  functions: interop.Pointer;
  vector_functions: interop.Pointer;
}

declare class cc_string_f {
  constructor(init?: cc_string_f);
  release: (p1: interop.PointerConvertible) => number | null;
}

declare class cc_credentials_f {
  constructor(init?: cc_credentials_f);
  release: (p1: interop.PointerConvertible) => number | null;
  compare: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
}

declare class cc_credentials_union {
  constructor(init?: cc_credentials_union);
  version: number;
  credentials: unnamed_11984364579150877983;
}

declare class cc_ccache_iterator_d {
  constructor(init?: cc_ccache_iterator_d);
  functions: interop.Pointer;
  vector_functions: interop.Pointer;
}

declare class cc_ccache_iterator_f {
  constructor(init?: cc_ccache_iterator_f);
  release: (p1: interop.PointerConvertible) => number | null;
  next: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  clone: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
}

declare class cc_ccache_d {
  constructor(init?: cc_ccache_d);
  functions: interop.Pointer;
  vector_functions: interop.Pointer;
}

declare class cc_context_f {
  constructor(init?: cc_context_f);
  release: (p1: interop.PointerConvertible) => number | null;
  get_change_time: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  get_default_ccache_name: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  open_ccache: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible) => number | null;
  open_default_ccache: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  create_ccache: (p1: interop.PointerConvertible, p2: string, p3: number, p4: string, p5: interop.PointerConvertible) => number | null;
  create_default_ccache: (p1: interop.PointerConvertible, p2: number, p3: string, p4: interop.PointerConvertible) => number | null;
  create_new_ccache: (p1: interop.PointerConvertible, p2: number, p3: string, p4: interop.PointerConvertible) => number | null;
  new_ccache_iterator: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  lock: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  unlock: (p1: interop.PointerConvertible) => number | null;
  compare: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  wait_for_change: (p1: interop.PointerConvertible) => number | null;
}

declare class ccache_cit {
  constructor(init?: ccache_cit);
}

declare class kim_options_opaque {
  constructor(init?: kim_options_opaque);
}

declare class cc_context_d {
  constructor(init?: cc_context_d);
  functions: interop.Pointer;
  vector_functions: interop.Pointer;
}

declare class cc_credentials_v5_t {
  constructor(init?: cc_credentials_v5_t);
  client: string | null;
  server: string | null;
  keyblock: cc_data;
  authtime: number;
  starttime: number;
  endtime: number;
  renew_till: number;
  is_skey: number;
  ticket_flags: number;
  addresses: interop.Pointer;
  ticket: cc_data;
  second_ticket: cc_data;
  authdata: interop.Pointer;
}

declare class cc_credentials_iterator_d {
  constructor(init?: cc_credentials_iterator_d);
  functions: interop.Pointer;
  vector_functions: interop.Pointer;
}

declare class cc_ccache_f {
  constructor(init?: cc_ccache_f);
  release: (p1: interop.PointerConvertible) => number | null;
  destroy: (p1: interop.PointerConvertible) => number | null;
  set_default: (p1: interop.PointerConvertible) => number | null;
  get_credentials_version: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  get_name: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  get_principal: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  set_principal: (p1: interop.PointerConvertible, p2: number, p3: string) => number | null;
  store_credentials: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  remove_credentials: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  new_credentials_iterator: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  move: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  lock: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  unlock: (p1: interop.PointerConvertible) => number | null;
  get_last_default_time: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  get_change_time: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  compare: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  get_kdc_time_offset: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  set_kdc_time_offset: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  clear_kdc_time_offset: (p1: interop.PointerConvertible, p2: number) => number | null;
  wait_for_change: (p1: interop.PointerConvertible) => number | null;
}

declare class cc_credentials_d {
  constructor(init?: cc_credentials_d);
  data: interop.Pointer;
  functions: interop.Pointer;
  otherFunctions: interop.Pointer;
}

declare class cc_credentials_v5_compat {
  constructor(init?: cc_credentials_v5_compat);
  client: string | null;
  server: string | null;
  keyblock: cc_data;
  authtime: number;
  starttime: number;
  endtime: number;
  renew_till: number;
  is_skey: number;
  ticket_flags: number;
  addresses: interop.Pointer;
  ticket: cc_data;
  second_ticket: cc_data;
  authdata: interop.Pointer;
}

declare class cc_credentials_v4_t {
  constructor(init?: cc_credentials_v4_t);
  version: number;
  principal: unknown /* const array */;
  principal_instance: unknown /* const array */;
  service: unknown /* const array */;
  service_instance: unknown /* const array */;
  realm: unknown /* const array */;
  session_key: unknown /* const array */;
  kvno: number;
  string_to_key_type: number;
  issue_date: number;
  lifetime: number;
  address: number;
  ticket_size: number;
  ticket: unknown /* const array */;
}

declare class cc_data {
  constructor(init?: cc_data);
  type: number;
  length: number;
  data: interop.Pointer;
}

declare class cred_union {
  constructor(init?: cred_union);
  cred_type: number;
  cred: cred_ptr_union_compat;
}

declare class cc_credentials_iterator_f {
  constructor(init?: cc_credentials_iterator_f);
  release: (p1: interop.PointerConvertible) => number | null;
  next: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  clone: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
}

type cred_ptr_union_compatDescriptor = 
  | { pV4Cred: interop.PointerConvertible }
  | { pV5Cred: interop.PointerConvertible };

declare class cred_ptr_union_compat {
  constructor(init?: cred_ptr_union_compatDescriptor);
  pV4Cred: interop.Pointer;
  pV5Cred: interop.Pointer;
}

type unnamed_11984364579150877983Descriptor = 
  | { credentials_v4: interop.PointerConvertible }
  | { credentials_v5: interop.PointerConvertible };

declare class unnamed_11984364579150877983 {
  constructor(init?: unnamed_11984364579150877983Descriptor);
  credentials_v4: interop.Pointer;
  credentials_v5: interop.Pointer;
}

declare function cc_initialize(out_context: interop.PointerConvertible, in_version: number, out_supported_version: interop.PointerConvertible, out_vendor: interop.PointerConvertible): number;

declare function KLAcquireTickets(inPrincipal: interop.PointerConvertible, outPrincipal: interop.PointerConvertible, outCredCacheName: interop.PointerConvertible): number;

declare function KLAcquireNewTickets(inPrincipal: interop.PointerConvertible, outPrincipal: interop.PointerConvertible, outCredCacheName: interop.PointerConvertible): number;

declare function KLAcquireTicketsWithPassword(inPrincipal: interop.PointerConvertible, inLoginOptions: interop.PointerConvertible, inPassword: string, outCredCacheName: interop.PointerConvertible): number;

declare function KLAcquireNewTicketsWithPassword(inPrincipal: interop.PointerConvertible, inLoginOptions: interop.PointerConvertible, inPassword: string, outCredCacheName: interop.PointerConvertible): number;

declare function KLSetApplicationOptions(inAppOptions: interop.PointerConvertible): number;

declare function KLGetApplicationOptions(outAppOptions: interop.PointerConvertible): number;

declare function KLAcquireInitialTickets(inPrincipal: interop.PointerConvertible, inLoginOptions: interop.PointerConvertible, outPrincipal: interop.PointerConvertible, outCredCacheName: interop.PointerConvertible): number;

declare function KLAcquireNewInitialTickets(inPrincipal: interop.PointerConvertible, inLoginOptions: interop.PointerConvertible, outPrincipal: interop.PointerConvertible, outCredCacheName: interop.PointerConvertible): number;

declare function KLDestroyTickets(inPrincipal: interop.PointerConvertible): number;

declare function KLChangePassword(inPrincipal: interop.PointerConvertible): number;

declare function KLAcquireInitialTicketsWithPassword(inPrincipal: interop.PointerConvertible, inLoginOptions: interop.PointerConvertible, inPassword: string, outCredCacheName: interop.PointerConvertible): number;

declare function KLAcquireNewInitialTicketsWithPassword(inPrincipal: interop.PointerConvertible, inLoginOptions: interop.PointerConvertible, inPassword: string, outCredCacheName: interop.PointerConvertible): number;

declare function KLAcquireNewInitialTicketCredentialsWithPassword(inPrincipal: interop.PointerConvertible, inLoginOptions: interop.PointerConvertible, inPassword: string, inV5Context: interop.PointerConvertible, outGotV4Credentials: interop.PointerConvertible, outGotV5Credentials: interop.PointerConvertible, outV4Credentials: interop.PointerConvertible, outV5Credentials: interop.PointerConvertible): number;

declare function KLStoreNewInitialTicketCredentials(inPrincipal: interop.PointerConvertible, inV5Context: interop.PointerConvertible, inV4Credentials: interop.PointerConvertible, inV5Credentials: interop.PointerConvertible, outCredCacheName: interop.PointerConvertible): number;

declare function KLVerifyInitialTickets(inPrincipal: interop.PointerConvertible, inFailIfNoHostKey: number, outCredCacheName: interop.PointerConvertible): number;

declare function KLVerifyInitialTicketCredentials(inV4Credentials: interop.PointerConvertible, inV5Credentials: interop.PointerConvertible, inFailIfNoHostKey: number): number;

declare function KLAcquireNewInitialTicketsWithKeytab(inPrincipal: interop.PointerConvertible, inLoginOptions: interop.PointerConvertible, inKeytabName: string, outCredCacheName: interop.PointerConvertible): number;

declare function KLRenewInitialTickets(inPrincipal: interop.PointerConvertible, inLoginOptions: interop.PointerConvertible, outPrincipal: interop.PointerConvertible, outCredCacheName: interop.PointerConvertible): number;

declare function KLValidateInitialTickets(inPrincipal: interop.PointerConvertible, inLoginOptions: interop.PointerConvertible, outCredCacheName: interop.PointerConvertible): number;

declare function KLLastChangedTime(outLastChangedTime: interop.PointerConvertible): number;

declare function KLCacheHasValidTickets(inPrincipal: interop.PointerConvertible, inKerberosVersion: number, outFoundValidTickets: interop.PointerConvertible, outPrincipal: interop.PointerConvertible, outCredCacheName: interop.PointerConvertible): number;

declare function KLTicketStartTime(inPrincipal: interop.PointerConvertible, inKerberosVersion: number, outStartTime: interop.PointerConvertible): number;

declare function KLTicketExpirationTime(inPrincipal: interop.PointerConvertible, inKerberosVersion: number, outExpirationTime: interop.PointerConvertible): number;

declare function KLSetSystemDefaultCache(inPrincipal: interop.PointerConvertible): number;

declare function KLHandleError(inError: number, inDialogIdentifier: number, inShowAlert: number): number;

declare function KLGetErrorString(inError: number, outErrorString: interop.PointerConvertible): number;

declare function KLCancelAllDialogs(): number;

declare function KLChangePasswordWithPasswords(inPrincipal: interop.PointerConvertible, inOldPassword: string, inNewPassword: string, outRejected: interop.PointerConvertible, outRejectionError: interop.PointerConvertible, outRejectionDescription: interop.PointerConvertible): number;

declare function KLSetIdleCallback(inCallback: (p1: number) => void, inRefCon: number): number;

declare function KLGetIdleCallback(inCallback: interop.PointerConvertible, inRefCon: interop.PointerConvertible): number;

declare function KLGetDefaultLoginOption(inOption: number, ioBuffer: interop.PointerConvertible, ioBufferSize: interop.PointerConvertible): number;

declare function KLSetDefaultLoginOption(inOption: number, inBuffer: interop.PointerConvertible, inBufferSize: number): number;

declare function KLFindKerberosRealmByName(inRealmName: string, outIndex: interop.PointerConvertible): number;

declare function KLGetKerberosRealm(inIndex: number, outRealmName: interop.PointerConvertible): number;

declare function KLSetKerberosRealm(inIndex: number, inRealmName: string): number;

declare function KLRemoveKerberosRealm(inIndex: number): number;

declare function KLInsertKerberosRealm(inInsertBeforeIndex: number, inRealmName: string): number;

declare function KLRemoveAllKerberosRealms(): number;

declare function KLCountKerberosRealms(): number;

declare function KLGetKerberosDefaultRealm(outIndex: interop.PointerConvertible): number;

declare function KLGetKerberosDefaultRealmByName(outRealmName: interop.PointerConvertible): number;

declare function KLSetKerberosDefaultRealm(inIndex: number): number;

declare function KLSetKerberosDefaultRealmByName(inRealm: string): number;

declare function KLCreatePrincipalFromTriplet(inName: string, inInstance: string, inRealm: string, outPrincipal: interop.PointerConvertible): number;

declare function KLCreatePrincipalFromString(inFullPrincipal: string, inKerberosVersion: number, outPrincipal: interop.PointerConvertible): number;

declare function KLCreatePrincipalFromKerberos5Principal(inKerberos5Principal: interop.PointerConvertible, outPrincipal: interop.PointerConvertible): number;

declare function KLCreatePrincipalFromPrincipal(inPrincipal: interop.PointerConvertible, outPrincipal: interop.PointerConvertible): number;

declare function KLGetTripletFromPrincipal(inPrincipal: interop.PointerConvertible, outName: interop.PointerConvertible, outInstance: interop.PointerConvertible, outRealm: interop.PointerConvertible): number;

declare function KLGetStringFromPrincipal(inPrincipal: interop.PointerConvertible, inKerberosVersion: number, outFullPrincipal: interop.PointerConvertible): number;

declare function KLGetDisplayStringFromPrincipal(inPrincipal: interop.PointerConvertible, inKerberosVersion: number, outFullPrincipal: interop.PointerConvertible): number;

declare function KLComparePrincipal(inFirstPrincipal: interop.PointerConvertible, inSecondPrincipal: interop.PointerConvertible, outAreEquivalent: interop.PointerConvertible): number;

declare function KLDisposePrincipal(inPrincipal: interop.PointerConvertible): number;

declare function KLCreateLoginOptions(outOptions: interop.PointerConvertible): number;

declare function KLLoginOptionsSetTicketLifetime(ioOptions: interop.PointerConvertible, inTicketLifetime: number): number;

declare function KLLoginOptionsSetForwardable(ioOptions: interop.PointerConvertible, inForwardable: number): number;

declare function KLLoginOptionsSetProxiable(ioOptions: interop.PointerConvertible, inProxiable: number): number;

declare function KLLoginOptionsSetRenewableLifetime(ioOptions: interop.PointerConvertible, inRenewableLifetime: number): number;

declare function KLLoginOptionsSetAddressless(ioOptions: interop.PointerConvertible, inAddressless: number): number;

declare function KLLoginOptionsSetTicketStartTime(ioOptions: interop.PointerConvertible, inStartTime: number): number;

declare function KLLoginOptionsSetServiceName(ioOptions: interop.PointerConvertible, inServiceName: string): number;

declare function KLDisposeLoginOptions(ioOptions: interop.PointerConvertible): number;

declare function KLDisposeString(inStringToDispose: string): number;

declare function cc_shutdown(io_context: interop.PointerConvertible): number;

declare function cc_get_NC_info(in_context: interop.PointerConvertible, out_info: interop.PointerConvertible): number;

declare function cc_get_change_time(in_context: interop.PointerConvertible, out_change_time: interop.PointerConvertible): number;

declare function cc_open(in_context: interop.PointerConvertible, in_name: string, in_version: number, in_flags: number, out_ccache: interop.PointerConvertible): number;

declare function cc_create(in_context: interop.PointerConvertible, in_name: string, in_principal: string, in_version: number, in_flags: number, out_ccache: interop.PointerConvertible): number;

declare function cc_close(in_context: interop.PointerConvertible, ioCCache: interop.PointerConvertible): number;

declare function cc_destroy(in_context: interop.PointerConvertible, io_ccache: interop.PointerConvertible): number;

declare function cc_seq_fetch_NCs_begin(in_context: interop.PointerConvertible, out_nc_iterator: interop.PointerConvertible): number;

declare function cc_seq_fetch_NCs_next(in_context: interop.PointerConvertible, out_ccache: interop.PointerConvertible, in_nc_iterator: interop.PointerConvertible): number;

declare function cc_seq_fetch_NCs_end(in_context: interop.PointerConvertible, io_nc_iterator: interop.PointerConvertible): number;

declare function cc_get_name(in_context: interop.PointerConvertible, in_ccache: interop.PointerConvertible, out_name: interop.PointerConvertible): number;

declare function cc_get_cred_version(in_context: interop.PointerConvertible, in_ccache: interop.PointerConvertible, out_version: interop.PointerConvertible): number;

declare function cc_set_principal(in_context: interop.PointerConvertible, in_ccache: interop.PointerConvertible, in_version: number, in_principal: string): number;

declare function cc_get_principal(in_context: interop.PointerConvertible, in_ccache: interop.PointerConvertible, out_principal: interop.PointerConvertible): number;

declare function cc_store(in_context: interop.PointerConvertible, in_ccache: interop.PointerConvertible, in_credentials: cred_union): number;

declare function cc_remove_cred(in_context: interop.PointerConvertible, in_ccache: interop.PointerConvertible, in_credentials: cred_union): number;

declare function cc_seq_fetch_creds_begin(in_context: interop.PointerConvertible, in_ccache: interop.PointerConvertible, out_ccache_iterator: interop.PointerConvertible): number;

declare function cc_seq_fetch_creds_next(in_context: interop.PointerConvertible, out_cred_union: interop.PointerConvertible, in_ccache_iterator: interop.PointerConvertible): number;

declare function cc_seq_fetch_creds_end(in_context: interop.PointerConvertible, io_ccache_iterator: interop.PointerConvertible): number;

declare function cc_free_principal(in_context: interop.PointerConvertible, io_principal: interop.PointerConvertible): number;

declare function cc_free_name(in_context: interop.PointerConvertible, io_name: interop.PointerConvertible): number;

declare function cc_free_creds(in_context: interop.PointerConvertible, io_cred_union: interop.PointerConvertible): number;

declare function cc_free_NC_info(in_context: interop.PointerConvertible, io_info: interop.PointerConvertible): number;


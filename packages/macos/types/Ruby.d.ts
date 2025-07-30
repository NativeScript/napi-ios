/// <reference types="@nativescript/objc-node-api" />

declare const OnigEncDefaultCharEncoding: interop.Pointer;

declare const OnigDefaultSyntax: interop.Pointer;

declare const OnigSyntaxPython: OnigSyntaxType;

declare const OnigSyntaxPerl58_NG: OnigSyntaxType;

declare const OnigSyntaxJava: OnigSyntaxType;

declare const OnigSyntaxGrep: OnigSyntaxType;

declare const OnigSyntaxEmacs: OnigSyntaxType;

declare const OnigSyntaxPosixExtended: OnigSyntaxType;

declare const OnigSyntaxASIS: OnigSyntaxType;

declare const OnigEncodingASCII: OnigEncodingTypeST;

declare const ruby_patchlevel: number;

declare const ruby_platform: interop.Pointer;

declare const ruby_version: interop.Pointer;

declare const ruby_api_version: unknown /* const array */;

declare const rb_argv0: number;

declare const rb_output_rs: number;

declare const rb_default_rs: number;

declare const rb_output_fs: number;

declare const rb_stderr: number;

declare const rb_stdout: number;

declare const rb_eScriptError: number;

declare const rb_eEncCompatError: number;

declare const rb_eEncodingError: number;

declare const rb_eFloatDomainError: number;

declare const rb_eNoMethodError: number;

declare const rb_eFrozenError: number;

declare const rb_eIOError: number;

declare const rb_eRangeError: number;

declare const rb_eEOFError: number;

declare const rb_eArgError: number;

declare const rb_cUnboundMethod: number;

declare const rb_cTrueClass: number;

declare const rb_cTime: number;

declare const rb_cSymbol: number;

declare const rb_cString: number;

declare const rb_cStat: number;

declare const rb_cRational: number;

declare const rb_cRange: number;

declare const rb_cRandom: number;

declare const rb_cProc: number;

declare const rb_cMatch: number;

declare const rb_cInteger: number;

declare const rb_cHash: number;

declare const rb_cFloat: number;

declare const rb_cComplex: number;

declare const rb_cFile: number;

declare const rb_cFalseClass: number;

declare const rb_cEncoding: number;

declare const rb_cDir: number;

declare const rb_cBinding: number;

declare const rb_mWaitReadable: number;

declare const rb_mMath: number;

declare const rb_mFileTest: number;

declare const rb_mErrno: number;

declare const rb_mComparable: number;

declare const rb_mKernel: number;

declare const rb_eSignal: number;

declare const rb_eRuntimeError: number;

declare const rb_eTypeError: number;

declare const rb_eSystemCallError: number;

declare const rb_cBasicObject: number;

declare const rb_eFatal: number;

declare const OnigSyntaxPosixBasic: OnigSyntaxType;

declare const rb_eSecurityError: number;

declare const rb_cIO: number;

declare const ruby_copyright: interop.Pointer;

declare const OnigSyntaxRuby: OnigSyntaxType;

declare const rb_eStandardError: number;

declare const OnigSyntaxPerl58: OnigSyntaxType;

declare const rb_cNilClass: number;

declare const OnigDefaultCaseFoldFlag: number;

declare const rb_eZeroDivError: number;

declare const rb_cStruct: number;

declare const rb_cRegexp: number;

declare const rb_cData: number;

declare const rb_eNameError: number;

declare const rb_eSysStackError: number;

declare const rb_cClass: number;

declare const rb_cModule: number;

declare const rb_cNumeric: number;

declare const rb_eException: number;

declare const ruby_description: interop.Pointer;

declare const rb_stdin: number;

declare const OnigSyntaxGnuRegex: OnigSyntaxType;

declare const rb_eStopIteration: number;

declare const rb_rs: number;

declare const rb_fs: number;

declare const rb_cEnumerator: number;

declare const ruby_engine: interop.Pointer;

declare const rb_eIndexError: number;

declare const rb_eLocalJumpError: number;

declare const rb_cThread: number;

declare const rb_mGC: number;

declare const rb_eSystemExit: number;

declare const OnigSyntaxPerl: OnigSyntaxType;

declare const rb_eInterrupt: number;

declare const rb_cArray: number;

declare const rb_cObject: number;

declare const rb_mEnumerable: number;

declare const rb_cNameErrorMesg: number;

declare const ruby_release_date: interop.Pointer;

declare const rb_mProcess: number;

declare const rb_eSyntaxError: number;

declare const rb_eLoadError: number;

declare const rb_eRegexpError: number;

declare const rb_eNoMemError: number;

declare const rb_cCont: number;

declare const rb_eMathDomainError: number;

declare const rb_cMethod: number;

declare const rb_eThreadError: number;

declare const rb_eKeyError: number;

declare const rb_eNotImpError: number;

declare const rb_mWaitWritable: number;

declare const st_retval: {
  CONTINUE: 0,
  STOP: 1,
  DELETE: 2,
  CHECK: 3,
};

declare const ruby_rarray_flags: {
  EMBED_LEN_MAX: 3,
  EMBED_FLAG: 8192,
  EMBED_LEN_MASK: 98304,
  EMBED_LEN_SHIFT: 15,
  TRANSIENT_FLAG: 33554432,
  ENUM_END: 33554433,
};

declare const ruby_rstring_flags: {
  NOEMBED: 8192,
  EMBED_LEN_MASK: 507904,
  EMBED_LEN_SHIFT: 14,
  EMBED_LEN_MAX: 23,
  FSTR: 536870912,
  ENUM_END: 536870913,
};

declare const ruby_robject_flags: {
  MBED_LEN_MAX: 3,
  MBED: 8192,
  NUM_END: 8193,
};

declare const ruby_value_type: {
  NONE: 0,
  OBJECT: 1,
  CLASS: 2,
  MODULE: 3,
  FLOAT: 4,
  STRING: 5,
  REGEXP: 6,
  ARRAY: 7,
  HASH: 8,
  STRUCT: 9,
  BIGNUM: 10,
  FILE: 11,
  DATA: 12,
  MATCH: 13,
  COMPLEX: 14,
  RATIONAL: 15,
  NIL: 17,
  TRUE: 18,
  FALSE: 19,
  SYMBOL: 20,
  FIXNUM: 21,
  UNDEF: 22,
  IMEMO: 26,
  NODE: 27,
  ICLASS: 28,
  ZOMBIE: 29,
  MASK: 31,
};

declare const ruby_fl_type: {
  FL_WB_PROTECTED: 32,
  FL_PROMOTED0: 32,
  FL_PROMOTED1: 64,
  FL_PROMOTED: 96,
  FL_FINALIZE: 128,
  FL_TAINT: 256,
  FL_UNTRUSTED: 256,
  FL_EXIVAR: 1024,
  FL_FREEZE: 2048,
  FL_USHIFT: 12,
  FL_USER0: 4096,
  FL_USER1: 8192,
  FL_USER2: 16384,
  FL_USER3: 32768,
  FL_USER4: 65536,
  FL_USER5: 131072,
  FL_USER6: 262144,
  FL_USER7: 524288,
  FL_USER8: 1048576,
  FL_USER9: 2097152,
  FL_USER10: 4194304,
  FL_USER11: 8388608,
  FL_USER12: 16777216,
  FL_USER13: 33554432,
  FL_USER14: 67108864,
  FL_USER15: 134217728,
  FL_USER16: 268435456,
  FL_USER17: 536870912,
  FL_USER18: 1073741824,
  FL_USER19: -2147483648,
  ELTS_SHARED: 16384,
  FL_DUPPED: 1311,
  FL_SINGLETON: 4096,
};

declare const ruby_econv_flag_type: {
  ERROR_HANDLER_MASK: 255,
  INVALID_MASK: 15,
  INVALID_REPLACE: 2,
  UNDEF_MASK: 240,
  UNDEF_REPLACE: 32,
  UNDEF_HEX_CHARREF: 48,
  DECORATOR_MASK: 65280,
  NEWLINE_DECORATOR_MASK: 16128,
  NEWLINE_DECORATOR_READ_MASK: 3840,
  NEWLINE_DECORATOR_WRITE_MASK: 12288,
  UNIVERSAL_NEWLINE_DECORATOR: 256,
  CRLF_NEWLINE_DECORATOR: 4096,
  CR_NEWLINE_DECORATOR: 8192,
  XML_TEXT_DECORATOR: 16384,
  XML_ATTR_CONTENT_DECORATOR: 32768,
  STATEFUL_DECORATOR_MASK: 15728640,
  XML_ATTR_QUOTE_DECORATOR: 1048576,
  DEFAULT_NEWLINE_DECORATOR: 0,
  PARTIAL_INPUT: 65536,
  AFTER_OUTPUT: 131072,
  FLAGS_PLACEHOLDER: 131073,
};

declare const rb_econv_result_t: {
  econv_invalid_byte_sequence: 0,
  econv_undefined_conversion: 1,
  econv_destination_buffer_full: 2,
  econv_source_buffer_empty: 3,
  econv_finished: 4,
  econv_after_output: 5,
  econv_incomplete_input: 6,
};

declare const rb_io_wait_readwrite: {
  READ: 0,
  WRIT: 1,
};

declare const ruby_special_consts: {
  Qfalse: 0,
  Qtrue: 20,
  Qnil: 8,
  Qundef: 52,
  IMMEDIATE_MASK: 7,
  FIXNUM_FLAG: 1,
  FLONUM_MASK: 3,
  FLONUM_FLAG: 2,
  SYMBOL_FLAG: 12,
  SPECIAL_SHIFT: 8,
};

declare const ruby_coderange_type: {
  E_UNKNOWN: 0,
  E_7BIT: 1048576,
  E_VALID: 2097152,
  E_BROKEN: 3145728,
  E_MASK: 3145728,
};

declare const ruby_encoding_consts: {
  INLINE_MAX: 127,
  SHIFT: 22,
  MASK: 532676608,
  MAXNAMELEN: 42,
};

declare const rb_event_hook_flag_t: {
  SAFE: 1,
  DELETED: 2,
  RAW_ARG: 4,
};

declare const ruby_rmodule_flags: {
  IS_OVERLAID: 16384,
  IS_REFINEMENT: 32768,
  INCLUDED_INTO_REFINEMENT: 65536,
  ENUM_END: 65537,
};

declare class rb_io_enc_t {
  constructor(init?: rb_io_enc_t);
  enc: interop.Pointer;
  enc2: interop.Pointer;
  ecflags: number;
  ecopts: number;
}

declare class rb_io_buffer_t {
  constructor(init?: rb_io_buffer_t);
  ptr: string | null;
  off: number;
  len: number;
  capa: number;
}

declare class RMatch {
  constructor(init?: RMatch);
  basic: RBasic;
  str: number;
  rmatch: interop.Pointer;
  regexp: number;
}

declare class rmatch {
  constructor(init?: rmatch);
  regs: re_registers;
  char_offset_updated: number;
  char_offset_num_allocated: number;
  char_offset: interop.Pointer;
}

declare class rmatch_offset {
  constructor(init?: rmatch_offset);
  beg: number;
  end: number;
}

declare class OnigErrorInfo {
  constructor(init?: OnigErrorInfo);
  enc: interop.Pointer;
  par: interop.Pointer;
  par_end: interop.Pointer;
}

declare class re_registers {
  constructor(init?: re_registers);
  allocated: number;
  num_regs: number;
  beg: interop.Pointer;
  end: interop.Pointer;
  history_root: interop.Pointer;
}

declare class OnigSyntaxType {
  constructor(init?: OnigSyntaxType);
  op: number;
  op2: number;
  behavior: number;
  options: number;
  meta_char_table: OnigMetaCharTableType;
}

declare class OnigEncodingTypeST {
  constructor(init?: OnigEncodingTypeST);
  precise_mbc_enc_len: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  name: string | null;
  max_enc_len: number;
  min_enc_len: number;
  is_mbc_newline: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  mbc_to_code: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  code_to_mbclen: (p1: number, p2: interop.PointerConvertible) => number | null;
  code_to_mbc: (p1: number, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  mbc_case_fold: (p1: number, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number | null;
  apply_all_case_fold: (p1: number, p2: (p1: number, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  get_case_fold_codes_by_str: (p1: number, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number | null;
  property_name_to_ctype: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  is_code_ctype: (p1: number, p2: number, p3: interop.PointerConvertible) => number | null;
  get_ctype_code_range: (p1: number, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  left_adjust_char_head: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => interop.Pointer | null;
  is_allowed_reverse_match: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  case_map: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible) => number | null;
  ruby_encoding_index: number;
  flags: number;
}

declare class OnigMetaCharTableType {
  constructor(init?: OnigMetaCharTableType);
  esc: number;
  anychar: number;
  anytime: number;
  zero_or_one_time: number;
  one_or_more_time: number;
  anychar_anytime: number;
}

declare class OnigCaseFoldCodeItem {
  constructor(init?: OnigCaseFoldCodeItem);
  byte_len: number;
  code_len: number;
  code: unknown /* const array */;
}

declare class rb_digest_metadata_t {
  constructor(init?: rb_digest_metadata_t);
  api_version: number;
  digest_len: number;
  block_len: number;
  ctx_size: number;
  init_func: (p1: interop.PointerConvertible) => number | null;
  update_func: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => void | null;
  finish_func: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
}

declare class rb_trace_arg_struct {
  constructor(init?: rb_trace_arg_struct);
}

declare class rb_fdset_t {
  constructor(init?: rb_fdset_t);
  maxfd: number;
  fdset: interop.Pointer;
}

declare class rb_arithmetic_sequence_components_t {
  constructor(init?: rb_arithmetic_sequence_components_t);
  begin: number;
  end: number;
  step: number;
  exclude_end: number;
}

declare class st_table_entry {
  constructor(init?: st_table_entry);
}

declare class st_hash_type {
  constructor(init?: st_hash_type);
  compare: () => number | null;
  hash: () => number | null;
}

declare class st_table {
  constructor(init?: st_table);
  entry_power: number;
  bin_power: number;
  size_ind: number;
  rebuilds_num: number;
  type: interop.Pointer;
  num_entries: number;
  bins: interop.Pointer;
  entries_start: number;
  entries_bound: number;
  entries: interop.Pointer;
}

declare class rb_global_variable {
  constructor(init?: rb_global_variable);
}

declare class RData {
  constructor(init?: RData);
  basic: RBasic;
  dmark: (p1: interop.PointerConvertible) => void | null;
  dfree: (p1: interop.PointerConvertible) => void | null;
  data: interop.Pointer;
}

declare class rb_io_t {
  constructor(init?: rb_io_t);
  stdio_file: interop.Pointer;
  fd: number;
  mode: number;
  pid: number;
  lineno: number;
  pathv: number;
  finalize: (p1: interop.PointerConvertible, p2: number) => void | null;
  wbuf: rb_io_buffer_t;
  rbuf: rb_io_buffer_t;
  tied_io_for_writing: number;
  encs: rb_io_enc_t;
  readconv: interop.Pointer;
  cbuf: rb_io_buffer_t;
  writeconv: interop.Pointer;
  writeconv_asciicompat: number;
  writeconv_initialized: number;
  writeconv_pre_ecflags: number;
  writeconv_pre_ecopts: number;
  write_lock: number;
}

declare class RFile {
  constructor(init?: RFile);
  basic: RBasic;
  fptr: interop.Pointer;
}

declare class re_pattern_buffer {
  constructor(init?: re_pattern_buffer);
  p: interop.Pointer;
  used: number;
  alloc: number;
  num_mem: number;
  num_repeat: number;
  num_null_check: number;
  num_comb_exp_check: number;
  num_call: number;
  capture_history: number;
  bt_mem_start: number;
  bt_mem_end: number;
  stack_pop_level: number;
  repeat_range_alloc: number;
  options: number;
  repeat_range: interop.Pointer;
  enc: interop.Pointer;
  syntax: interop.Pointer;
  name_table: interop.Pointer;
  case_fold_flag: number;
  optimize: number;
  threshold_len: number;
  anchor: number;
  anchor_dmin: number;
  anchor_dmax: number;
  sub_anchor: number;
  exact: interop.Pointer;
  exact_end: interop.Pointer;
  map: unknown /* const array */;
  int_map: interop.Pointer;
  int_map_backward: interop.Pointer;
  dmin: number;
  dmax: number;
  chain: interop.Pointer;
}

declare class RRegexp {
  constructor(init?: RRegexp);
  basic: RBasic;
  ptr: interop.Pointer;
  src: number;
  usecnt: number;
}

declare class RArray {
  constructor(init?: RArray);
  basic: RBasic;
  as: unnamed_8947326465846909553;
}

declare class RString {
  constructor(init?: RString);
  basic: RBasic;
  as: unnamed_5811631881619703303;
}

declare class unnamed_9071603155498430573 {
  constructor(init?: unnamed_9071603155498430573);
  numiv: number;
  ivptr: interop.Pointer;
  iv_index_tbl: interop.Pointer;
}

declare class RObject {
  constructor(init?: RObject);
  basic: RBasic;
  as: unnamed_10013601549612586129;
}

declare class RClassDeprecated {
  constructor(init?: RClassDeprecated);
  basic: RBasic;
}

declare class unnamed_8252383207716883408 {
  constructor(init?: unnamed_8252383207716883408);
  dmark: (p1: interop.PointerConvertible) => void | null;
  dfree: (p1: interop.PointerConvertible) => void | null;
  dsize: (p1: interop.PointerConvertible) => number | null;
  reserved: unknown /* const array */;
}

declare class unnamed_10844333523920063151 {
  constructor(init?: unnamed_10844333523920063151);
  len: number;
  aux: unnamed_8417304171698770295;
  ptr: interop.Pointer;
}

declare class OnigCaptureTreeNodeStruct {
  constructor(init?: OnigCaptureTreeNodeStruct);
  group: number;
  beg: number;
  end: number;
  allocated: number;
  num_childs: number;
  childs: interop.Pointer;
}

declare class OnigCompileInfo {
  constructor(init?: OnigCompileInfo);
  num_of_elements: number;
  pattern_enc: interop.Pointer;
  target_enc: interop.Pointer;
  syntax: interop.Pointer;
  option: number;
  case_fold_flag: number;
}

declare class unnamed_10999803535462308628 {
  constructor(init?: unnamed_10999803535462308628);
  len: number;
  ptr: string | null;
  aux: unnamed_8416264486544584876;
}

declare class OnigRepeatRange {
  constructor(init?: OnigRepeatRange);
  lower: number;
  upper: number;
}

declare class rb_data_type_struct {
  constructor(init?: rb_data_type_struct);
  wrap_struct_name: string | null;
  function: unnamed_8252383207716883408;
  parent: interop.Pointer;
  data: interop.Pointer;
  flags: number;
}

declare class rb_debug_inspector_struct {
  constructor(init?: rb_debug_inspector_struct);
}

declare class rb_econv_t {
  constructor(init?: rb_econv_t);
}

declare class RTypedData {
  constructor(init?: RTypedData);
  basic: RBasic;
  type: interop.Pointer;
  typed_flag: number;
  data: interop.Pointer;
}

declare class rb_vm_struct {
  constructor(init?: rb_vm_struct);
}

declare class RBasic {
  constructor(init?: RBasic);
  flags: number;
  klass: number;
}

type unnamed_8417304171698770295Descriptor = 
  | { capa: number }
  | { shared: number };

declare class unnamed_8417304171698770295 {
  constructor(init?: unnamed_8417304171698770295Descriptor);
  capa: number;
  shared: number;
}

type unnamed_8416264486544584876Descriptor = 
  | { capa: number }
  | { shared: number };

declare class unnamed_8416264486544584876 {
  constructor(init?: unnamed_8416264486544584876Descriptor);
  capa: number;
  shared: number;
}

type unnamed_5811631881619703303Descriptor = 
  | { heap: unnamed_10999803535462308628 }
  | { ary: unknown /* const array */ };

declare class unnamed_5811631881619703303 {
  constructor(init?: unnamed_5811631881619703303Descriptor);
  heap: unnamed_10999803535462308628;
  ary: unknown /* const array */;
}

type unnamed_10013601549612586129Descriptor = 
  | { heap: unnamed_9071603155498430573 }
  | { ary: unknown /* const array */ };

declare class unnamed_10013601549612586129 {
  constructor(init?: unnamed_10013601549612586129Descriptor);
  heap: unnamed_9071603155498430573;
  ary: unknown /* const array */;
}

type unnamed_8947326465846909553Descriptor = 
  | { heap: unnamed_10844333523920063151 }
  | { ary: unknown /* const array */ };

declare class unnamed_8947326465846909553 {
  constructor(init?: unnamed_8947326465846909553Descriptor);
  heap: unnamed_10844333523920063151;
  ary: unknown /* const array */;
}

declare function eaccess(p1: string, p2: number): number;

declare function finite(p1: number): number;

declare function setproctitle(fmt: string): void;

declare function explicit_bzero(b: interop.PointerConvertible, len: number): void;

declare function ruby_xmalloc(p1: number): interop.Pointer;

declare function ruby_xmalloc2(p1: number, p2: number): interop.Pointer;

declare function ruby_xcalloc(p1: number, p2: number): interop.Pointer;

declare function ruby_xrealloc(p1: interop.PointerConvertible, p2: number): interop.Pointer;

declare function ruby_xrealloc2(p1: interop.PointerConvertible, p2: number, p3: number): interop.Pointer;

declare function ruby_xfree(p1: interop.PointerConvertible): void;

declare function rb_int2inum(p1: number): number;

declare function rb_uint2inum(p1: number): number;

declare function rb_ll2inum(p1: number): number;

declare function rb_ull2inum(p1: number): number;

declare function rb_out_of_int(num: number): void;

declare function rb_sym2id(p1: number): number;

declare function rb_id2sym(p1: number): number;

declare function rb_check_type(p1: number, p2: number): void;

declare function rb_str_to_str(p1: number): number;

declare function rb_string_value(p1: interop.PointerConvertible): number;

declare function rb_string_value_ptr(p1: interop.PointerConvertible): string;

declare function rb_string_value_cstr(p1: interop.PointerConvertible): string;

declare function rb_check_safe_obj(p1: number): void;

declare function rb_str_export(p1: number): number;

declare function rb_str_export_locale(p1: number): number;

declare function rb_get_path(p1: number): number;

declare function rb_get_path_no_checksafe(p1: number): number;

declare function rb_secure(p1: number): void;

declare function rb_safe_level(): number;

declare function rb_set_safe_level(p1: number): void;

declare function rb_set_safe_level_force(p1: number): void;

declare function rb_secure_update(p1: number): void;

declare function rb_insecure_operation(): void;

declare function rb_errinfo(): number;

declare function rb_set_errinfo(p1: number): void;

declare function rb_num2long(p1: number): number;

declare function rb_num2ulong(p1: number): number;

declare function rb_num2int(p1: number): number;

declare function rb_fix2int(p1: number): number;

declare function rb_num2uint(p1: number): number;

declare function rb_fix2uint(p1: number): number;

declare function rb_num2short(p1: number): number;

declare function rb_num2ushort(p1: number): number;

declare function rb_fix2short(p1: number): number;

declare function rb_fix2ushort(p1: number): number;

declare function rb_num2ll(p1: number): number;

declare function rb_num2ull(p1: number): number;

declare function rb_num2dbl(p1: number): number;

declare function rb_uint2big(p1: number): number;

declare function rb_int2big(p1: number): number;

declare function rb_newobj(): number;

declare function rb_newobj_of(p1: number, p2: number): number;

declare function rb_obj_setup(obj: number, klass: number, type: number): number;

declare function rb_obj_hide(obj: number): number;

declare function rb_obj_reveal(obj: number, klass: number): number;

declare function rb_float_value(p1: number): number;

declare function rb_float_new(p1: number): number;

declare function rb_float_new_in_heap(p1: number): number;

declare function rb_hash_size_num(hash: number): number;

declare function rb_data_object_wrap(p1: number, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible) => void, p4: (p1: interop.PointerConvertible) => void): number;

declare function rb_data_object_zalloc(p1: number, p2: number, p3: (p1: interop.PointerConvertible) => void, p4: (p1: interop.PointerConvertible) => void): number;

declare function rb_data_typed_object_wrap(klass: number, datap: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function rb_data_typed_object_zalloc(klass: number, size: number, type: interop.PointerConvertible): number;

declare function rb_typeddata_inherited_p(child: interop.PointerConvertible, parent: interop.PointerConvertible): number;

declare function rb_typeddata_is_kind_of(p1: number, p2: interop.PointerConvertible): number;

declare function rb_check_typeddata(p1: number, p2: interop.PointerConvertible): interop.Pointer;

declare function rb_big_sign(p1: number): number;

declare function rb_freeze_singleton_class(klass: number): void;

declare function rb_gc_writebarrier(a: number, b: number): void;

declare function rb_gc_writebarrier_unprotect(obj: number): void;

declare function rb_alloc_tmp_buffer(store: interop.PointerConvertible, len: number): interop.Pointer;

declare function rb_alloc_tmp_buffer_with_count(store: interop.PointerConvertible, len: number, count: number): interop.Pointer;

declare function rb_free_tmp_buffer(store: interop.PointerConvertible): void;

declare function ruby_malloc_size_overflow(p1: number, p2: number): void;

declare function rb_obj_infect(victim: number, carrier: number): void;

declare function rb_glob(p1: string, p2: (p1: string, p2: number, p3: interop.PointerConvertible) => void, p3: number): void;

declare function ruby_glob(p1: string, p2: number, p3: (p1: string, p2: number, p3: interop.PointerConvertible) => number, p4: number): number;

declare function ruby_brace_glob(p1: string, p2: number, p3: (p1: string, p2: number, p3: interop.PointerConvertible) => number, p4: number): number;

declare function rb_define_class(p1: string, p2: number): number;

declare function rb_define_module(p1: string): number;

declare function rb_define_class_under(p1: number, p2: string, p3: number): number;

declare function rb_define_module_under(p1: number, p2: string): number;

declare function rb_include_module(p1: number, p2: number): void;

declare function rb_extend_object(p1: number, p2: number): void;

declare function rb_prepend_module(p1: number, p2: number): void;

declare function rb_gvar_undef_getter(id: number, data: interop.PointerConvertible, gvar: interop.PointerConvertible): number;

declare function rb_gvar_undef_setter(val: number, id: number, data: interop.PointerConvertible, gvar: interop.PointerConvertible): void;

declare function rb_gvar_undef_marker(var: interop.PointerConvertible): void;

declare function rb_gvar_val_getter(id: number, data: interop.PointerConvertible, gvar: interop.PointerConvertible): number;

declare function rb_gvar_val_setter(val: number, id: number, data: interop.PointerConvertible, gvar: interop.PointerConvertible): void;

declare function rb_gvar_val_marker(var: interop.PointerConvertible): void;

declare function rb_gvar_var_getter(id: number, data: interop.PointerConvertible, gvar: interop.PointerConvertible): number;

declare function rb_gvar_var_setter(val: number, id: number, data: interop.PointerConvertible, gvar: interop.PointerConvertible): void;

declare function rb_gvar_var_marker(var: interop.PointerConvertible): void;

declare function rb_gvar_readonly_setter(val: number, id: number, data: interop.PointerConvertible, gvar: interop.PointerConvertible): void;

declare function rb_define_variable(p1: string, p2: interop.PointerConvertible): void;

declare function rb_define_virtual_variable(p1: string, p2: () => number, p3: () => void): void;

declare function rb_define_hooked_variable(p1: string, p2: interop.PointerConvertible, p3: () => number, p4: () => void): void;

declare function rb_define_readonly_variable(p1: string, p2: interop.PointerConvertible): void;

declare function rb_define_const(p1: number, p2: string, p3: number): void;

declare function rb_define_global_const(p1: string, p2: number): void;

declare function rb_define_method(p1: number, p2: string, p3: () => number, p4: number): void;

declare function rb_define_module_function(p1: number, p2: string, p3: () => number, p4: number): void;

declare function rb_define_global_function(p1: string, p2: () => number, p3: number): void;

declare function rb_undef_method(p1: number, p2: string): void;

declare function rb_define_alias(p1: number, p2: string, p3: string): void;

declare function rb_define_attr(p1: number, p2: string, p3: number, p4: number): void;

declare function rb_global_variable(p1: interop.PointerConvertible): void;

declare function rb_gc_register_mark_object(p1: number): void;

declare function rb_gc_register_address(p1: interop.PointerConvertible): void;

declare function rb_gc_unregister_address(p1: interop.PointerConvertible): void;

declare function rb_intern(p1: string): number;

declare function rb_intern2(p1: string, p2: number): number;

declare function rb_intern_str(str: number): number;

declare function rb_id2name(p1: number): string;

declare function rb_check_id(p1: interop.PointerConvertible): number;

declare function rb_to_id(p1: number): number;

declare function rb_id2str(p1: number): number;

declare function rb_sym2str(p1: number): number;

declare function rb_to_symbol(name: number): number;

declare function rb_check_symbol(namep: interop.PointerConvertible): number;

declare function rb_varargs_bad_length(p1: number, p2: number): number;

declare function rb_class2name(p1: number): string;

declare function rb_obj_classname(p1: number): string;

declare function rb_p(p1: number): void;

declare function rb_eval_string(p1: string): number;

declare function rb_eval_string_protect(p1: string, p2: interop.PointerConvertible): number;

declare function rb_eval_string_wrap(p1: string, p2: interop.PointerConvertible): number;

declare function rb_funcall(p1: number, p2: number, p3: number): number;

declare function rb_funcallv(p1: number, p2: number, p3: number, p4: interop.PointerConvertible): number;

declare function rb_funcallv_public(p1: number, p2: number, p3: number, p4: interop.PointerConvertible): number;

declare function rb_funcall_passing_block(p1: number, p2: number, p3: number, p4: interop.PointerConvertible): number;

declare function rb_funcall_with_block(p1: number, p2: number, p3: number, p4: interop.PointerConvertible, p5: number): number;

declare function rb_scan_args(p1: number, p2: interop.PointerConvertible, p3: string): number;

declare function rb_call_super(p1: number, p2: interop.PointerConvertible): number;

declare function rb_current_receiver(): number;

declare function rb_get_kwargs(keyword_hash: number, table: interop.PointerConvertible, required: number, optional: number, p5: interop.PointerConvertible): number;

declare function rb_extract_keywords(orighash: interop.PointerConvertible): number;

declare function rb_gv_set(p1: string, p2: number): number;

declare function rb_gv_get(p1: string): number;

declare function rb_iv_get(p1: number, p2: string): number;

declare function rb_iv_set(p1: number, p2: string, p3: number): number;

declare function rb_equal(p1: number, p2: number): number;

declare function rb_ruby_verbose_ptr(): interop.Pointer;

declare function rb_ruby_debug_ptr(): interop.Pointer;

declare function rb_raise(p1: number, p2: string): void;

declare function rb_fatal(p1: string): void;

declare function rb_bug(p1: string): void;

declare function rb_bug_errno(p1: string, p2: number): void;

declare function rb_sys_fail(p1: string): void;

declare function rb_sys_fail_str(p1: number): void;

declare function rb_mod_sys_fail(p1: number, p2: string): void;

declare function rb_mod_sys_fail_str(p1: number, p2: number): void;

declare function rb_readwrite_sys_fail(p1: interop.Enum<typeof rb_io_wait_readwrite>, p2: string): void;

declare function rb_iter_break(): void;

declare function rb_iter_break_value(p1: number): void;

declare function rb_exit(p1: number): void;

declare function rb_notimplement(): void;

declare function rb_syserr_new(p1: number, p2: string): number;

declare function rb_syserr_new_str(n: number, arg: number): number;

declare function rb_syserr_fail(p1: number, p2: string): void;

declare function rb_syserr_fail_str(p1: number, p2: number): void;

declare function rb_mod_syserr_fail(p1: number, p2: number, p3: string): void;

declare function rb_mod_syserr_fail_str(p1: number, p2: number, p3: number): void;

declare function rb_readwrite_syserr_fail(p1: interop.Enum<typeof rb_io_wait_readwrite>, p2: number, p3: string): void;

declare function rb_warning(p1: string): void;

declare function rb_compile_warning(p1: string, p2: number, p3: string): void;

declare function rb_sys_warning(p1: string): void;

declare function rb_warn(p1: string): void;

declare function rb_compile_warn(p1: string, p2: number, p3: string): void;

declare function rb_each(p1: number): number;

declare function rb_yield(p1: number): number;

declare function rb_yield_values(n: number): number;

declare function rb_yield_values2(n: number, argv: interop.PointerConvertible): number;

declare function rb_yield_splat(p1: number): number;

declare function rb_yield_block(p1: number, p2: number, p3: number, p4: interop.PointerConvertible, p5: number): number;

declare function rb_block_given_p(): number;

declare function rb_need_block(): void;

declare function rb_iterate(p1: (p1: number) => number, p2: number, p3: () => number, p4: number): number;

declare function rb_block_call(p1: number, p2: number, p3: number, p4: interop.PointerConvertible, p5: () => number, p6: number): number;

declare function rb_rescue(p1: () => number, p2: number, p3: () => number, p4: number): number;

declare function rb_rescue2(p1: () => number, p2: number, p3: () => number, p4: number): number;

declare function rb_ensure(p1: () => number, p2: number, p3: () => number, p4: number): number;

declare function rb_catch(p1: string, p2: () => number, p3: number): number;

declare function rb_catch_obj(p1: number, p2: () => number, p3: number): number;

declare function rb_throw(p1: string, p2: number): void;

declare function rb_throw_obj(p1: number, p2: number): void;

declare function rb_require(p1: string): number;

declare function st_init_table(p1: interop.PointerConvertible): interop.Pointer;

declare function st_init_table_with_size(p1: interop.PointerConvertible, p2: number): interop.Pointer;

declare function st_init_numtable(): interop.Pointer;

declare function st_init_numtable_with_size(p1: number): interop.Pointer;

declare function st_init_strtable(): interop.Pointer;

declare function st_init_strtable_with_size(p1: number): interop.Pointer;

declare function st_init_strcasetable(): interop.Pointer;

declare function st_init_strcasetable_with_size(p1: number): interop.Pointer;

declare function st_delete(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function st_delete_safe(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number): number;

declare function st_shift(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function st_insert(p1: interop.PointerConvertible, p2: number, p3: number): number;

declare function st_insert2(p1: interop.PointerConvertible, p2: number, p3: number, p4: (p1: number) => number): number;

declare function st_lookup(p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible): number;

declare function st_get_key(p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible): number;

declare function st_update(table: interop.PointerConvertible, key: number, func: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => number, arg: number): number;

declare function st_foreach(p1: interop.PointerConvertible, p2: () => number, p3: number): number;

declare function st_foreach_check(p1: interop.PointerConvertible, p2: () => number, p3: number, p4: number): number;

declare function st_keys(table: interop.PointerConvertible, keys: interop.PointerConvertible, size: number): number;

declare function st_keys_check(table: interop.PointerConvertible, keys: interop.PointerConvertible, size: number, never: number): number;

declare function st_values(table: interop.PointerConvertible, values: interop.PointerConvertible, size: number): number;

declare function st_values_check(table: interop.PointerConvertible, values: interop.PointerConvertible, size: number, never: number): number;

declare function st_add_direct(p1: interop.PointerConvertible, p2: number, p3: number): void;

declare function st_free_table(p1: interop.PointerConvertible): void;

declare function st_cleanup_safe(p1: interop.PointerConvertible, p2: number): void;

declare function st_clear(p1: interop.PointerConvertible): void;

declare function st_copy(p1: interop.PointerConvertible): interop.Pointer;

declare function st_numcmp(p1: number, p2: number): number;

declare function st_numhash(p1: number): number;

declare function st_locale_insensitive_strcasecmp(s1: string, s2: string): number;

declare function st_locale_insensitive_strncasecmp(s1: string, s2: string, n: number): number;

declare function st_memsize(p1: interop.PointerConvertible): number;

declare function st_hash(ptr: interop.PointerConvertible, len: number, h: number): number;

declare function st_hash_uint32(h: number, i: number): number;

declare function st_hash_uint(h: number, i: number): number;

declare function st_hash_end(h: number): number;

declare function st_hash_start(h: number): number;

declare function rb_hash_bulk_insert_into_st_table(p1: number, p2: interop.PointerConvertible, p3: number): void;

declare function rb_mem_clear(p1: interop.PointerConvertible, p2: number): void;

declare function rb_assoc_new(p1: number, p2: number): number;

declare function rb_check_array_type(p1: number): number;

declare function rb_ary_new(): number;

declare function rb_ary_new_capa(capa: number): number;

declare function rb_ary_new_from_args(n: number): number;

declare function rb_ary_new_from_values(n: number, elts: interop.PointerConvertible): number;

declare function rb_ary_tmp_new(p1: number): number;

declare function rb_ary_free(p1: number): void;

declare function rb_ary_modify(p1: number): void;

declare function rb_ary_freeze(p1: number): number;

declare function rb_ary_shared_with_p(p1: number, p2: number): number;

declare function rb_ary_aref(p1: number, p2: interop.PointerConvertible, p3: number): number;

declare function rb_ary_subseq(p1: number, p2: number, p3: number): number;

declare function rb_ary_store(p1: number, p2: number, p3: number): void;

declare function rb_ary_dup(p1: number): number;

declare function rb_ary_resurrect(ary: number): number;

declare function rb_ary_to_ary(p1: number): number;

declare function rb_ary_to_s(p1: number): number;

declare function rb_ary_cat(p1: number, p2: interop.PointerConvertible, p3: number): number;

declare function rb_ary_push(p1: number, p2: number): number;

declare function rb_ary_pop(p1: number): number;

declare function rb_ary_shift(p1: number): number;

declare function rb_ary_unshift(p1: number, p2: number): number;

declare function rb_ary_entry(p1: number, p2: number): number;

declare function rb_ary_each(p1: number): number;

declare function rb_ary_join(p1: number, p2: number): number;

declare function rb_ary_reverse(p1: number): number;

declare function rb_ary_rotate(p1: number, p2: number): number;

declare function rb_ary_sort(p1: number): number;

declare function rb_ary_sort_bang(p1: number): number;

declare function rb_ary_delete(p1: number, p2: number): number;

declare function rb_ary_delete_at(p1: number, p2: number): number;

declare function rb_ary_clear(p1: number): number;

declare function rb_ary_plus(p1: number, p2: number): number;

declare function rb_ary_concat(p1: number, p2: number): number;

declare function rb_ary_assoc(p1: number, p2: number): number;

declare function rb_ary_rassoc(p1: number, p2: number): number;

declare function rb_ary_includes(p1: number, p2: number): number;

declare function rb_ary_cmp(p1: number, p2: number): number;

declare function rb_ary_replace(copy: number, orig: number): number;

declare function rb_get_values_at(p1: number, p2: number, p3: number, p4: interop.PointerConvertible, p5: (p1: number, p2: number) => number): number;

declare function rb_ary_resize(ary: number, len: number): number;

declare function rb_big_new(p1: number, p2: number): number;

declare function rb_bigzero_p(x: number): number;

declare function rb_big_clone(p1: number): number;

declare function rb_big_2comp(p1: number): void;

declare function rb_big_norm(p1: number): number;

declare function rb_big_resize(big: number, len: number): void;

declare function rb_cstr_to_inum(p1: string, p2: number, p3: number): number;

declare function rb_str_to_inum(p1: number, p2: number, p3: number): number;

declare function rb_cstr2inum(p1: string, p2: number): number;

declare function rb_str2inum(p1: number, p2: number): number;

declare function rb_big2str(p1: number, p2: number): number;

declare function rb_big2long(p1: number): number;

declare function rb_big2ulong(p1: number): number;

declare function rb_big2ll(p1: number): number;

declare function rb_big2ull(p1: number): number;

declare function rb_big_pack(val: number, buf: interop.PointerConvertible, num_longs: number): void;

declare function rb_big_unpack(buf: interop.PointerConvertible, num_longs: number): number;

declare function rb_uv_to_utf8(p1: unknown /* const array */, p2: number): number;

declare function rb_dbl2big(p1: number): number;

declare function rb_big2dbl(p1: number): number;

declare function rb_big_cmp(p1: number, p2: number): number;

declare function rb_big_eq(p1: number, p2: number): number;

declare function rb_big_eql(p1: number, p2: number): number;

declare function rb_big_plus(p1: number, p2: number): number;

declare function rb_big_minus(p1: number, p2: number): number;

declare function rb_big_mul(p1: number, p2: number): number;

declare function rb_big_div(p1: number, p2: number): number;

declare function rb_big_idiv(p1: number, p2: number): number;

declare function rb_big_modulo(p1: number, p2: number): number;

declare function rb_big_divmod(p1: number, p2: number): number;

declare function rb_big_pow(p1: number, p2: number): number;

declare function rb_big_and(p1: number, p2: number): number;

declare function rb_big_or(p1: number, p2: number): number;

declare function rb_big_xor(p1: number, p2: number): number;

declare function rb_big_lshift(p1: number, p2: number): number;

declare function rb_big_rshift(p1: number, p2: number): number;

declare function rb_integer_pack(val: number, words: interop.PointerConvertible, numwords: number, wordsize: number, nails: number, flags: number): number;

declare function rb_integer_unpack(words: interop.PointerConvertible, numwords: number, wordsize: number, nails: number, flags: number): number;

declare function rb_absint_size(val: number, nlz_bits_ret: interop.PointerConvertible): number;

declare function rb_absint_numwords(val: number, word_numbits: number, nlz_bits_ret: interop.PointerConvertible): number;

declare function rb_absint_singlebit_p(val: number): number;

declare function rb_rational_raw(p1: number, p2: number): number;

declare function rb_rational_new(p1: number, p2: number): number;

declare function rb_Rational(p1: number, p2: number): number;

declare function rb_rational_num(rat: number): number;

declare function rb_rational_den(rat: number): number;

declare function rb_flt_rationalize_with_prec(p1: number, p2: number): number;

declare function rb_flt_rationalize(p1: number): number;

declare function rb_complex_raw(p1: number, p2: number): number;

declare function rb_complex_new(p1: number, p2: number): number;

declare function rb_complex_new_polar(abs: number, arg: number): number;

declare function rb_complex_polar(abs: number, arg: number): number;

declare function rb_complex_real(z: number): number;

declare function rb_complex_imag(z: number): number;

declare function rb_complex_plus(x: number, y: number): number;

declare function rb_complex_minus(x: number, y: number): number;

declare function rb_complex_mul(x: number, y: number): number;

declare function rb_complex_div(x: number, y: number): number;

declare function rb_complex_uminus(z: number): number;

declare function rb_complex_conjugate(z: number): number;

declare function rb_complex_abs(z: number): number;

declare function rb_complex_arg(z: number): number;

declare function rb_complex_pow(base: number, exp: number): number;

declare function rb_dbl_complex_new(real: number, imag: number): number;

declare function rb_Complex(p1: number, p2: number): number;

declare function rb_class_new(p1: number): number;

declare function rb_mod_init_copy(p1: number, p2: number): number;

declare function rb_singleton_class_clone(p1: number): number;

declare function rb_singleton_class_attached(p1: number, p2: number): void;

declare function rb_check_inheritable(p1: number): void;

declare function rb_define_class_id(p1: number, p2: number): number;

declare function rb_define_class_id_under(p1: number, p2: number, p3: number): number;

declare function rb_module_new(): number;

declare function rb_define_module_id(p1: number): number;

declare function rb_define_module_id_under(p1: number, p2: number): number;

declare function rb_mod_included_modules(p1: number): number;

declare function rb_mod_include_p(p1: number, p2: number): number;

declare function rb_mod_ancestors(p1: number): number;

declare function rb_class_instance_methods(p1: number, p2: interop.PointerConvertible, p3: number): number;

declare function rb_class_public_instance_methods(p1: number, p2: interop.PointerConvertible, p3: number): number;

declare function rb_class_protected_instance_methods(p1: number, p2: interop.PointerConvertible, p3: number): number;

declare function rb_class_private_instance_methods(p1: number, p2: interop.PointerConvertible, p3: number): number;

declare function rb_obj_singleton_methods(p1: number, p2: interop.PointerConvertible, p3: number): number;

declare function rb_define_method_id(p1: number, p2: number, p3: () => number, p4: number): void;

declare function rb_undef(p1: number, p2: number): void;

declare function rb_define_protected_method(p1: number, p2: string, p3: () => number, p4: number): void;

declare function rb_define_private_method(p1: number, p2: string, p3: () => number, p4: number): void;

declare function rb_define_singleton_method(p1: number, p2: string, p3: () => number, p4: number): void;

declare function rb_singleton_class(p1: number): number;

declare function rb_cmpint(p1: number, p2: number, p3: number): number;

declare function rb_cmperr(p1: number, p2: number): void;

declare function rb_fiber_new(p1: () => number, p2: number): number;

declare function rb_fiber_resume(fib: number, argc: number, argv: interop.PointerConvertible): number;

declare function rb_fiber_yield(argc: number, argv: interop.PointerConvertible): number;

declare function rb_fiber_current(): number;

declare function rb_fiber_alive_p(p1: number): number;

declare function rb_enum_values_pack(p1: number, p2: interop.PointerConvertible): number;

declare function rb_enumeratorize(p1: number, p2: number, p3: number, p4: interop.PointerConvertible): number;

declare function rb_enumeratorize_with_size(p1: number, p2: number, p3: number, p4: interop.PointerConvertible, p5: (p1: number, p2: number, p3: number) => number): number;

declare function rb_arithmetic_sequence_extract(p1: number, p2: interop.PointerConvertible): number;

declare function rb_exc_new(p1: number, p2: string, p3: number): number;

declare function rb_exc_new_cstr(p1: number, p2: string): number;

declare function rb_exc_new_str(p1: number, p2: number): number;

declare function rb_loaderror(p1: string): void;

declare function rb_loaderror_with_path(path: number, p2: string): void;

declare function rb_name_error(p1: number, p2: string): void;

declare function rb_name_error_str(p1: number, p2: string): void;

declare function rb_invalid_str(p1: string, p2: string): void;

declare function rb_error_frozen(p1: string): void;

declare function rb_error_frozen_object(p1: number): void;

declare function rb_error_untrusted(p1: number): void;

declare function rb_check_frozen(p1: number): void;

declare function rb_check_trusted(p1: number): void;

declare function rb_check_copyable(obj: number, orig: number): void;

declare function rb_sourceline(): number;

declare function rb_sourcefile(): string;

declare function rb_check_funcall(p1: number, p2: number, p3: number, p4: interop.PointerConvertible): number;

declare function rb_error_arity(p1: number, p2: number, p3: number): void;

declare function rb_fd_init(p1: interop.PointerConvertible): void;

declare function rb_fd_term(p1: interop.PointerConvertible): void;

declare function rb_fd_zero(p1: interop.PointerConvertible): void;

declare function rb_fd_set(p1: number, p2: interop.PointerConvertible): void;

declare function rb_fd_clr(p1: number, p2: interop.PointerConvertible): void;

declare function rb_fd_isset(p1: number, p2: interop.PointerConvertible): number;

declare function rb_fd_copy(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number): void;

declare function rb_fd_dup(dst: interop.PointerConvertible, src: interop.PointerConvertible): void;

declare function rb_fd_select(p1: number, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible): number;

declare function rb_exc_raise(p1: number): void;

declare function rb_exc_fatal(p1: number): void;

declare function rb_f_exit(p1: number, p2: interop.PointerConvertible): number;

declare function rb_f_abort(p1: number, p2: interop.PointerConvertible): number;

declare function rb_remove_method(p1: number, p2: string): void;

declare function rb_remove_method_id(p1: number, p2: number): void;

declare function rb_define_alloc_func(p1: number, p2: (p1: number) => number): void;

declare function rb_undef_alloc_func(p1: number): void;

declare function rb_get_alloc_func(p1: number): (p1: number) => number;

declare function rb_clear_constant_cache(): void;

declare function rb_clear_method_cache_by_class(p1: number): void;

declare function rb_alias(p1: number, p2: number, p3: number): void;

declare function rb_attr(p1: number, p2: number, p3: number, p4: number, p5: number): void;

declare function rb_method_boundp(p1: number, p2: number, p3: number): number;

declare function rb_method_basic_definition_p(p1: number, p2: number): number;

declare function rb_eval_cmd(p1: number, p2: number, p3: number): number;

declare function rb_obj_respond_to(p1: number, p2: number, p3: number): number;

declare function rb_respond_to(p1: number, p2: number): number;

declare function rb_f_notimplement(argc: number, argv: interop.PointerConvertible, obj: number): number;

declare function rb_interrupt(): void;

declare function rb_apply(p1: number, p2: number, p3: number): number;

declare function rb_backtrace(): void;

declare function rb_frame_this_func(): number;

declare function rb_obj_instance_eval(p1: number, p2: interop.PointerConvertible, p3: number): number;

declare function rb_obj_instance_exec(p1: number, p2: interop.PointerConvertible, p3: number): number;

declare function rb_mod_module_eval(p1: number, p2: interop.PointerConvertible, p3: number): number;

declare function rb_mod_module_exec(p1: number, p2: interop.PointerConvertible, p3: number): number;

declare function rb_load(p1: number, p2: number): void;

declare function rb_load_protect(p1: number, p2: number, p3: interop.PointerConvertible): void;

declare function rb_jump_tag(p1: number): void;

declare function rb_provided(p1: string): number;

declare function rb_feature_provided(p1: string, p2: interop.PointerConvertible): number;

declare function rb_provide(p1: string): void;

declare function rb_f_require(p1: number, p2: number): number;

declare function rb_require_safe(p1: number, p2: number): number;

declare function rb_obj_call_init(p1: number, p2: number, p3: interop.PointerConvertible): void;

declare function rb_class_new_instance(p1: number, p2: interop.PointerConvertible, p3: number): number;

declare function rb_block_proc(): number;

declare function rb_block_lambda(): number;

declare function rb_proc_new(p1: () => number, p2: number): number;

declare function rb_obj_is_proc(p1: number): number;

declare function rb_proc_call(p1: number, p2: number): number;

declare function rb_proc_call_with_block(p1: number, argc: number, argv: interop.PointerConvertible, p4: number): number;

declare function rb_proc_arity(p1: number): number;

declare function rb_proc_lambda_p(p1: number): number;

declare function rb_binding_new(): number;

declare function rb_obj_method(p1: number, p2: number): number;

declare function rb_obj_is_method(p1: number): number;

declare function rb_method_call(p1: number, p2: interop.PointerConvertible, p3: number): number;

declare function rb_method_call_with_block(p1: number, p2: interop.PointerConvertible, p3: number, p4: number): number;

declare function rb_mod_method_arity(p1: number, p2: number): number;

declare function rb_obj_method_arity(p1: number, p2: number): number;

declare function rb_protect(p1: (p1: number) => number, p2: number, p3: interop.PointerConvertible): number;

declare function rb_set_end_proc(p1: (p1: number) => void, p2: number): void;

declare function rb_exec_end_proc(): void;

declare function rb_thread_schedule(): void;

declare function rb_thread_wait_fd(p1: number): void;

declare function rb_thread_fd_writable(p1: number): number;

declare function rb_thread_fd_close(p1: number): void;

declare function rb_thread_alone(): number;

declare function rb_thread_sleep(p1: number): void;

declare function rb_thread_sleep_forever(): void;

declare function rb_thread_sleep_deadly(): void;

declare function rb_thread_stop(): number;

declare function rb_thread_wakeup(p1: number): number;

declare function rb_thread_wakeup_alive(p1: number): number;

declare function rb_thread_run(p1: number): number;

declare function rb_thread_kill(p1: number): number;

declare function rb_thread_create(p1: () => number, p2: interop.PointerConvertible): number;

declare function rb_thread_fd_select(p1: number, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible): number;

declare function rb_thread_wait_for(p1: timeval): void;

declare function rb_thread_current(): number;

declare function rb_thread_main(): number;

declare function rb_thread_local_aref(p1: number, p2: number): number;

declare function rb_thread_local_aset(p1: number, p2: number, p3: number): number;

declare function rb_thread_atfork(): void;

declare function rb_thread_atfork_before_exec(): void;

declare function rb_exec_recursive(p1: (p1: number, p2: number, p3: number) => number, p2: number, p3: number): number;

declare function rb_exec_recursive_paired(p1: (p1: number, p2: number, p3: number) => number, p2: number, p3: number, p4: number): number;

declare function rb_exec_recursive_outer(p1: (p1: number, p2: number, p3: number) => number, p2: number, p3: number): number;

declare function rb_exec_recursive_paired_outer(p1: (p1: number, p2: number, p3: number) => number, p2: number, p3: number, p4: number): number;

declare function rb_dir_getwd(): number;

declare function rb_file_s_expand_path(p1: number, p2: interop.PointerConvertible): number;

declare function rb_file_expand_path(p1: number, p2: number): number;

declare function rb_file_s_absolute_path(p1: number, p2: interop.PointerConvertible): number;

declare function rb_file_absolute_path(p1: number, p2: number): number;

declare function rb_file_dirname(fname: number): number;

declare function rb_find_file_ext_safe(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number): number;

declare function rb_find_file_safe(p1: number, p2: number): number;

declare function rb_find_file_ext(p1: interop.PointerConvertible, p2: interop.PointerConvertible): number;

declare function rb_find_file(p1: number): number;

declare function rb_file_directory_p(p1: number, p2: number): number;

declare function rb_str_encode_ospath(p1: number): number;

declare function rb_is_absolute_path(p1: string): number;

declare function rb_memerror(): void;

declare function rb_during_gc(): number;

declare function rb_gc_mark_locations(p1: interop.PointerConvertible, p2: interop.PointerConvertible): void;

declare function rb_mark_tbl(p1: interop.PointerConvertible): void;

declare function rb_mark_set(p1: interop.PointerConvertible): void;

declare function rb_mark_hash(p1: interop.PointerConvertible): void;

declare function rb_gc_mark_maybe(p1: number): void;

declare function rb_gc_mark(p1: number): void;

declare function rb_gc_force_recycle(p1: number): void;

declare function rb_gc(): void;

declare function rb_gc_copy_finalizer(p1: number, p2: number): void;

declare function rb_gc_finalize_deferred(): void;

declare function rb_gc_call_finalizer_at_exit(): void;

declare function rb_gc_enable(): number;

declare function rb_gc_disable(): number;

declare function rb_gc_start(): number;

declare function rb_define_finalizer(p1: number, p2: number): number;

declare function rb_undefine_finalizer(p1: number): number;

declare function rb_gc_count(): number;

declare function rb_gc_stat(p1: number): number;

declare function rb_gc_latest_gc_info(p1: number): number;

declare function rb_gc_adjust_memory_usage(p1: number): void;

declare function st_foreach_safe(p1: interop.PointerConvertible, p2: () => number, p3: number): void;

declare function rb_check_hash_type(p1: number): number;

declare function rb_hash_foreach(p1: number, p2: () => number, p3: number): void;

declare function rb_hash(p1: number): number;

declare function rb_hash_new(): number;

declare function rb_hash_dup(p1: number): number;

declare function rb_hash_freeze(p1: number): number;

declare function rb_hash_aref(p1: number, p2: number): number;

declare function rb_hash_lookup(p1: number, p2: number): number;

declare function rb_hash_lookup2(p1: number, p2: number, p3: number): number;

declare function rb_hash_fetch(p1: number, p2: number): number;

declare function rb_hash_aset(p1: number, p2: number, p3: number): number;

declare function rb_hash_clear(p1: number): number;

declare function rb_hash_delete_if(p1: number): number;

declare function rb_hash_delete(p1: number, p2: number): number;

declare function rb_hash_set_ifnone(hash: number, ifnone: number): number;

declare function rb_hash_update_by(hash1: number, hash2: number, func: (p1: number, p2: number, p3: number) => number): number;

declare function rb_hash_tbl(p1: number, file: string, line: number): interop.Pointer;

declare function rb_path_check(p1: string): number;

declare function rb_env_path_tainted(): number;

declare function rb_env_clear(): number;

declare function rb_hash_size(p1: number): number;

declare function rb_hash_free(p1: number): void;

declare function rb_io_write(p1: number, p2: number): number;

declare function rb_io_gets(p1: number): number;

declare function rb_io_getbyte(p1: number): number;

declare function rb_io_ungetc(p1: number, p2: number): number;

declare function rb_io_ungetbyte(p1: number, p2: number): number;

declare function rb_io_close(p1: number): number;

declare function rb_io_flush(p1: number): number;

declare function rb_io_eof(p1: number): number;

declare function rb_io_binmode(p1: number): number;

declare function rb_io_ascii8bit_binmode(p1: number): number;

declare function rb_io_addstr(p1: number, p2: number): number;

declare function rb_io_printf(p1: number, p2: interop.PointerConvertible, p3: number): number;

declare function rb_io_print(p1: number, p2: interop.PointerConvertible, p3: number): number;

declare function rb_io_puts(p1: number, p2: interop.PointerConvertible, p3: number): number;

declare function rb_io_fdopen(p1: number, p2: number, p3: string): number;

declare function rb_io_get_io(p1: number): number;

declare function rb_file_open(p1: string, p2: string): number;

declare function rb_file_open_str(p1: number, p2: string): number;

declare function rb_gets(): number;

declare function rb_write_error(p1: string): void;

declare function rb_write_error2(p1: string, p2: number): void;

declare function rb_close_before_exec(lowfd: number, maxhint: number, noclose_fds: number): void;

declare function rb_pipe(pipes: interop.PointerConvertible): number;

declare function rb_reserved_fd_p(fd: number): number;

declare function rb_cloexec_open(pathname: string, flags: number, mode: number): number;

declare function rb_cloexec_dup(oldfd: number): number;

declare function rb_cloexec_dup2(oldfd: number, newfd: number): number;

declare function rb_cloexec_pipe(fildes: unknown /* const array */): number;

declare function rb_cloexec_fcntl_dupfd(fd: number, minfd: number): number;

declare function rb_update_max_fd(fd: number): void;

declare function rb_fd_fix_cloexec(fd: number): void;

declare function rb_marshal_dump(p1: number, p2: number): number;

declare function rb_marshal_load(p1: number): number;

declare function rb_marshal_define_compat(newclass: number, oldclass: number, dumper: (p1: number) => number, loader: (p1: number, p2: number) => number): void;

declare function rb_num_zerodiv(): void;

declare function rb_num_coerce_bin(p1: number, p2: number, p3: number): number;

declare function rb_num_coerce_cmp(p1: number, p2: number, p3: number): number;

declare function rb_num_coerce_relop(p1: number, p2: number, p3: number): number;

declare function rb_num_coerce_bit(p1: number, p2: number, p3: number): number;

declare function rb_num2fix(p1: number): number;

declare function rb_fix2str(p1: number, p2: number): number;

declare function rb_dbl_cmp(p1: number, p2: number): number;

declare function rb_eql(p1: number, p2: number): number;

declare function rb_any_to_s(p1: number): number;

declare function rb_inspect(p1: number): number;

declare function rb_obj_is_instance_of(p1: number, p2: number): number;

declare function rb_obj_is_kind_of(p1: number, p2: number): number;

declare function rb_obj_alloc(p1: number): number;

declare function rb_obj_clone(p1: number): number;

declare function rb_obj_dup(p1: number): number;

declare function rb_obj_init_copy(p1: number, p2: number): number;

declare function rb_obj_taint(p1: number): number;

declare function rb_obj_tainted(p1: number): number;

declare function rb_obj_untaint(p1: number): number;

declare function rb_obj_untrust(p1: number): number;

declare function rb_obj_untrusted(p1: number): number;

declare function rb_obj_trust(p1: number): number;

declare function rb_obj_freeze(p1: number): number;

declare function rb_obj_frozen_p(p1: number): number;

declare function rb_obj_id(p1: number): number;

declare function rb_obj_class(p1: number): number;

declare function rb_class_real(p1: number): number;

declare function rb_class_inherited_p(p1: number, p2: number): number;

declare function rb_class_superclass(p1: number): number;

declare function rb_class_get_superclass(p1: number): number;

declare function rb_convert_type(p1: number, p2: number, p3: string, p4: string): number;

declare function rb_check_convert_type(p1: number, p2: number, p3: string, p4: string): number;

declare function rb_check_to_integer(p1: number, p2: string): number;

declare function rb_check_to_float(p1: number): number;

declare function rb_to_int(p1: number): number;

declare function rb_check_to_int(p1: number): number;

declare function rb_Integer(p1: number): number;

declare function rb_to_float(p1: number): number;

declare function rb_Float(p1: number): number;

declare function rb_String(p1: number): number;

declare function rb_Array(p1: number): number;

declare function rb_Hash(p1: number): number;

declare function rb_cstr_to_dbl(p1: string, p2: number): number;

declare function rb_str_to_dbl(p1: number, p2: number): number;

declare function rb_id_attrset(p1: number): number;

declare function rb_is_const_id(p1: number): number;

declare function rb_is_global_id(p1: number): number;

declare function rb_is_instance_id(p1: number): number;

declare function rb_is_attrset_id(p1: number): number;

declare function rb_is_class_id(p1: number): number;

declare function rb_is_local_id(p1: number): number;

declare function rb_is_junk_id(p1: number): number;

declare function rb_symname_p(p1: string): number;

declare function rb_sym_interned_p(p1: number): number;

declare function rb_backref_get(): number;

declare function rb_backref_set(p1: number): void;

declare function rb_lastline_get(): number;

declare function rb_lastline_set(p1: number): void;

declare function rb_last_status_set(status: number, pid: number): void;

declare function rb_last_status_get(): number;

declare function rb_proc_exec(p1: string): number;

declare function rb_f_exec(p1: number, p2: interop.PointerConvertible): number;

declare function rb_waitpid(pid: number, status: interop.PointerConvertible, flags: number): number;

declare function rb_syswait(pid: number): void;

declare function rb_spawn(p1: number, p2: interop.PointerConvertible): number;

declare function rb_spawn_err(p1: number, p2: interop.PointerConvertible, p3: string, p4: number): number;

declare function rb_proc_times(p1: number): number;

declare function rb_detach_process(pid: number): number;

declare function rb_range_new(p1: number, p2: number, p3: number): number;

declare function rb_range_beg_len(p1: number, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: number): number;

declare function rb_range_values(range: number, begp: interop.PointerConvertible, endp: interop.PointerConvertible, exclp: interop.PointerConvertible): number;

declare function rb_genrand_int32(): number;

declare function rb_genrand_real(): number;

declare function rb_reset_random_seed(): void;

declare function rb_random_bytes(rnd: number, n: number): number;

declare function rb_random_int(rnd: number, max: number): number;

declare function rb_random_int32(rnd: number): number;

declare function rb_random_real(rnd: number): number;

declare function rb_random_ulong_limited(rnd: number, limit: number): number;

declare function rb_genrand_ulong_limited(i: number): number;

declare function rb_memcicmp(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number): number;

declare function rb_match_busy(p1: number): void;

declare function rb_reg_nth_defined(p1: number, p2: number): number;

declare function rb_reg_nth_match(p1: number, p2: number): number;

declare function rb_reg_backref_number(match: number, backref: number): number;

declare function rb_reg_last_match(p1: number): number;

declare function rb_reg_match_pre(p1: number): number;

declare function rb_reg_match_post(p1: number): number;

declare function rb_reg_match_last(p1: number): number;

declare function rb_reg_new_str(p1: number, p2: number): number;

declare function rb_reg_new(p1: string, p2: number, p3: number): number;

declare function rb_reg_alloc(): number;

declare function rb_reg_init_str(re: number, s: number, options: number): number;

declare function rb_reg_match(p1: number, p2: number): number;

declare function rb_reg_match2(p1: number): number;

declare function rb_reg_options(p1: number): number;

declare function rb_get_argv(): number;

declare function rb_load_file(p1: string): interop.Pointer;

declare function rb_load_file_str(p1: number): interop.Pointer;

declare function rb_f_kill(p1: number, p2: interop.PointerConvertible): number;

declare function ruby_posix_signal(p1: number, p2: (p1: number) => void): (p1: number) => void;

declare function rb_trap_exit(): void;

declare function rb_trap_exec(): void;

declare function ruby_signal_name(p1: number): string;

declare function ruby_default_signal(p1: number): void;

declare function rb_f_sprintf(p1: number, p2: interop.PointerConvertible): number;

declare function rb_sprintf(p1: string): number;

declare function rb_vsprintf(p1: string, p2: string): number;

declare function rb_str_catf(p1: number, p2: string): number;

declare function rb_str_vcatf(p1: number, p2: string, p3: string): number;

declare function rb_str_format(p1: number, p2: interop.PointerConvertible, p3: number): number;

declare function rb_str_new(p1: string, p2: number): number;

declare function rb_str_new_cstr(p1: string): number;

declare function rb_str_new_shared(p1: number): number;

declare function rb_str_new_frozen(p1: number): number;

declare function rb_str_new_with_class(p1: number, p2: string, p3: number): number;

declare function rb_tainted_str_new_cstr(p1: string): number;

declare function rb_tainted_str_new(p1: string, p2: number): number;

declare function rb_external_str_new(p1: string, p2: number): number;

declare function rb_external_str_new_cstr(p1: string): number;

declare function rb_locale_str_new(p1: string, p2: number): number;

declare function rb_locale_str_new_cstr(p1: string): number;

declare function rb_filesystem_str_new(p1: string, p2: number): number;

declare function rb_filesystem_str_new_cstr(p1: string): number;

declare function rb_str_buf_new(p1: number): number;

declare function rb_str_buf_new_cstr(p1: string): number;

declare function rb_str_buf_new2(p1: string): number;

declare function rb_str_tmp_new(p1: number): number;

declare function rb_usascii_str_new(p1: string, p2: number): number;

declare function rb_usascii_str_new_cstr(p1: string): number;

declare function rb_utf8_str_new(p1: string, p2: number): number;

declare function rb_utf8_str_new_cstr(p1: string): number;

declare function rb_str_new_static(p1: string, p2: number): number;

declare function rb_usascii_str_new_static(p1: string, p2: number): number;

declare function rb_utf8_str_new_static(p1: string, p2: number): number;

declare function rb_str_free(p1: number): void;

declare function rb_str_shared_replace(p1: number, p2: number): void;

declare function rb_str_buf_append(p1: number, p2: number): number;

declare function rb_str_buf_cat(p1: number, p2: string, p3: number): number;

declare function rb_str_buf_cat2(p1: number, p2: string): number;

declare function rb_str_buf_cat_ascii(p1: number, p2: string): number;

declare function rb_obj_as_string(p1: number): number;

declare function rb_check_string_type(p1: number): number;

declare function rb_must_asciicompat(p1: number): void;

declare function rb_str_dup(p1: number): number;

declare function rb_str_resurrect(str: number): number;

declare function rb_str_locktmp(p1: number): number;

declare function rb_str_unlocktmp(p1: number): number;

declare function rb_str_dup_frozen(p1: number): number;

declare function rb_str_plus(p1: number, p2: number): number;

declare function rb_str_times(p1: number, p2: number): number;

declare function rb_str_sublen(p1: number, p2: number): number;

declare function rb_str_substr(p1: number, p2: number, p3: number): number;

declare function rb_str_subseq(p1: number, p2: number, p3: number): number;

declare function rb_str_subpos(p1: number, p2: number, p3: interop.PointerConvertible): string;

declare function rb_str_modify(p1: number): void;

declare function rb_str_modify_expand(p1: number, p2: number): void;

declare function rb_str_freeze(p1: number): number;

declare function rb_str_set_len(p1: number, p2: number): void;

declare function rb_str_resize(p1: number, p2: number): number;

declare function rb_str_cat(p1: number, p2: string, p3: number): number;

declare function rb_str_cat_cstr(p1: number, p2: string): number;

declare function rb_str_cat2(p1: number, p2: string): number;

declare function rb_str_append(p1: number, p2: number): number;

declare function rb_str_concat(p1: number, p2: number): number;

declare function rb_memhash(ptr: interop.PointerConvertible, len: number): number;

declare function rb_hash_start(p1: number): number;

declare function rb_hash_uint32(p1: number, p2: number): number;

declare function rb_hash_uint(p1: number, p2: number): number;

declare function rb_hash_end(p1: number): number;

declare function rb_str_hash(p1: number): number;

declare function rb_str_hash_cmp(p1: number, p2: number): number;

declare function rb_str_comparable(p1: number, p2: number): number;

declare function rb_str_cmp(p1: number, p2: number): number;

declare function rb_str_equal(str1: number, str2: number): number;

declare function rb_str_drop_bytes(p1: number, p2: number): number;

declare function rb_str_update(p1: number, p2: number, p3: number, p4: number): void;

declare function rb_str_replace(p1: number, p2: number): number;

declare function rb_str_inspect(p1: number): number;

declare function rb_str_dump(p1: number): number;

declare function rb_str_split(p1: number, p2: string): number;

declare function rb_str_setter(p1: number, p2: number, p3: interop.PointerConvertible): void;

declare function rb_str_intern(p1: number): number;

declare function rb_sym_to_s(p1: number): number;

declare function rb_str_strlen(p1: number): number;

declare function rb_str_length(p1: number): number;

declare function rb_str_offset(p1: number, p2: number): number;

declare function rb_str_capacity(p1: number): number;

declare function rb_str_ellipsize(p1: number, p2: number): number;

declare function rb_str_scrub(p1: number, p2: number): number;

declare function rb_sym_all_symbols(): number;

declare function rb_struct_new(p1: number): number;

declare function rb_struct_define(p1: string): number;

declare function rb_struct_define_under(p1: number, p2: string): number;

declare function rb_struct_alloc(p1: number, p2: number): number;

declare function rb_struct_initialize(p1: number, p2: number): number;

declare function rb_struct_aref(p1: number, p2: number): number;

declare function rb_struct_aset(p1: number, p2: number, p3: number): number;

declare function rb_struct_getmember(p1: number, p2: number): number;

declare function rb_struct_s_members(p1: number): number;

declare function rb_struct_members(p1: number): number;

declare function rb_struct_size(s: number): number;

declare function rb_struct_alloc_noinit(p1: number): number;

declare function rb_struct_define_without_accessor(p1: string, p2: number, p3: (p1: number) => number): number;

declare function rb_struct_define_without_accessor_under(outer: number, class_name: string, super: number, alloc: (p1: number) => number): number;

declare function rb_thread_check_ints(): void;

declare function rb_thread_interrupted(thval: number): number;

declare function rb_mutex_new(): number;

declare function rb_mutex_locked_p(mutex: number): number;

declare function rb_mutex_trylock(mutex: number): number;

declare function rb_mutex_lock(mutex: number): number;

declare function rb_mutex_unlock(mutex: number): number;

declare function rb_mutex_sleep(self: number, timeout: number): number;

declare function rb_mutex_synchronize(mutex: number, func: (p1: number) => number, arg: number): number;

declare function rb_timespec_now(p1: interop.PointerConvertible): void;

declare function rb_time_new(p1: number, p2: number): number;

declare function rb_time_nano_new(p1: number, p2: number): number;

declare function rb_time_timespec_new(p1: interop.PointerConvertible, p2: number): number;

declare function rb_time_num_new(p1: number, p2: number): number;

declare function rb_time_interval(num: number): timeval;

declare function rb_time_timeval(time: number): timeval;

declare function rb_time_timespec(time: number): timespec;

declare function rb_time_utc_offset(time: number): number;

declare function rb_mod_name(p1: number): number;

declare function rb_class_path(p1: number): number;

declare function rb_class_path_cached(p1: number): number;

declare function rb_set_class_path(p1: number, p2: number, p3: string): void;

declare function rb_set_class_path_string(p1: number, p2: number, p3: number): void;

declare function rb_path_to_class(p1: number): number;

declare function rb_path2class(p1: string): number;

declare function rb_name_class(p1: number, p2: number): void;

declare function rb_class_name(p1: number): number;

declare function rb_autoload_load(p1: number, p2: number): number;

declare function rb_autoload_p(p1: number, p2: number): number;

declare function rb_f_trace_var(p1: number, p2: interop.PointerConvertible): number;

declare function rb_f_untrace_var(p1: number, p2: interop.PointerConvertible): number;

declare function rb_f_global_variables(): number;

declare function rb_alias_variable(p1: number, p2: number): void;

declare function rb_copy_generic_ivar(p1: number, p2: number): void;

declare function rb_free_generic_ivar(p1: number): void;

declare function rb_ivar_get(p1: number, p2: number): number;

declare function rb_ivar_set(p1: number, p2: number, p3: number): number;

declare function rb_ivar_defined(p1: number, p2: number): number;

declare function rb_ivar_foreach(p1: number, p2: () => number, p3: number): void;

declare function rb_ivar_count(p1: number): number;

declare function rb_attr_get(p1: number, p2: number): number;

declare function rb_obj_instance_variables(p1: number): number;

declare function rb_obj_remove_instance_variable(p1: number, p2: number): number;

declare function rb_mod_const_at(p1: number, p2: interop.PointerConvertible): interop.Pointer;

declare function rb_mod_const_of(p1: number, p2: interop.PointerConvertible): interop.Pointer;

declare function rb_const_list(p1: interop.PointerConvertible): number;

declare function rb_mod_constants(p1: number, p2: interop.PointerConvertible, p3: number): number;

declare function rb_mod_remove_const(p1: number, p2: number): number;

declare function rb_const_defined(p1: number, p2: number): number;

declare function rb_const_defined_at(p1: number, p2: number): number;

declare function rb_const_defined_from(p1: number, p2: number): number;

declare function rb_const_get(p1: number, p2: number): number;

declare function rb_const_get_at(p1: number, p2: number): number;

declare function rb_const_get_from(p1: number, p2: number): number;

declare function rb_const_set(p1: number, p2: number, p3: number): void;

declare function rb_const_remove(p1: number, p2: number): number;

declare function rb_cvar_defined(p1: number, p2: number): number;

declare function rb_cvar_set(p1: number, p2: number, p3: number): void;

declare function rb_cvar_get(p1: number, p2: number): number;

declare function rb_cv_set(p1: number, p2: string, p3: number): void;

declare function rb_cv_get(p1: number, p2: string): number;

declare function rb_define_class_variable(p1: number, p2: string, p3: number): void;

declare function rb_mod_class_variables(p1: number, p2: interop.PointerConvertible, p3: number): number;

declare function rb_mod_remove_cvar(p1: number, p2: number): number;

declare function rb_frame_callee(): number;

declare function rb_frame_method_id_and_class(idp: interop.PointerConvertible, klassp: interop.PointerConvertible): number;

declare function rb_str_succ(p1: number): number;

declare function rb_time_succ(p1: number): number;

declare function rb_make_backtrace(): number;

declare function rb_make_exception(p1: number, p2: interop.PointerConvertible): number;

declare function ruby_native_thread_p(): number;

declare function rb_add_event_hook(func: (p1: number, p2: number, p3: number, p4: number, p5: number) => void, events: number, data: number): void;

declare function rb_remove_event_hook(func: (p1: number, p2: number, p3: number, p4: number, p5: number) => void): number;

declare function st_locale_insensitive_strcasecmp(s1: string, s2: string): number;

declare function st_locale_insensitive_strncasecmp(s1: string, s2: string, n: number): number;

declare function ruby_strtoul(str: string, endptr: interop.PointerConvertible, base: number): number;

declare function ruby_snprintf(str: string, n: number, fmt: string): number;

declare function ruby_vsnprintf(str: string, n: number, fmt: string, ap: string): number;

declare function ruby_sysinit(argc: interop.PointerConvertible, argv: interop.PointerConvertible): void;

declare function ruby_init(): void;

declare function ruby_options(argc: number, argv: interop.PointerConvertible): interop.Pointer;

declare function ruby_executable_node(n: interop.PointerConvertible, status: interop.PointerConvertible): number;

declare function ruby_run_node(n: interop.PointerConvertible): number;

declare function ruby_show_version(): void;

declare function ruby_show_copyright(): void;

declare function ruby_init_stack(p1: interop.PointerConvertible): void;

declare function ruby_setup(): number;

declare function ruby_cleanup(p1: number): number;

declare function ruby_finalize(): void;

declare function ruby_stop(p1: number): void;

declare function ruby_set_stack_size(p1: number): void;

declare function ruby_stack_check(): number;

declare function ruby_stack_length(p1: interop.PointerConvertible): number;

declare function ruby_exec_node(n: interop.PointerConvertible): number;

declare function ruby_script(name: string): void;

declare function ruby_set_script_name(name: number): void;

declare function ruby_prog_init(): void;

declare function ruby_set_argv(p1: number, p2: interop.PointerConvertible): void;

declare function ruby_process_options(p1: number, p2: interop.PointerConvertible): interop.Pointer;

declare function ruby_init_loadpath(): void;

declare function ruby_incpush(p1: string): void;

declare function ruby_sig_finalize(): void;

declare function rb_disable_super(): void;

declare function rb_enable_super(): void;

declare function rb_hash_iter_lev(): void;

declare function rb_hash_ifnone(): void;

declare function rb_str_associate(): void;

declare function rb_str_associated(): void;

declare function rb_autoload(p1: number, p2: number, p3: string): void;

declare function rb_clear_cache(): void;

declare function rb_frame_pop(): void;

declare function rb_frozen_class_p(p1: number): void;

declare function rb_compile_error(): void;

declare function rb_compile_error_with_enc(): void;

declare function rb_compile_error_append(): void;

declare function rb_struct_ptr(): void;

declare function rb_generic_ivar_table(): void;

declare function rb_mod_const_missing(p1: number, p2: number): number;

declare function rb_profile_frames(start: number, limit: number, buff: interop.PointerConvertible, lines: interop.PointerConvertible): number;

declare function rb_profile_frame_path(frame: number): number;

declare function rb_profile_frame_absolute_path(frame: number): number;

declare function rb_profile_frame_label(frame: number): number;

declare function rb_profile_frame_base_label(frame: number): number;

declare function rb_profile_frame_full_label(frame: number): number;

declare function rb_profile_frame_first_lineno(frame: number): number;

declare function rb_profile_frame_classpath(frame: number): number;

declare function rb_profile_frame_singleton_method_p(frame: number): number;

declare function rb_profile_frame_method_name(frame: number): number;

declare function rb_profile_frame_qualified_method_name(frame: number): number;

declare function rb_debug_inspector_open(func: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number, data: interop.PointerConvertible): number;

declare function rb_debug_inspector_frame_self_get(dc: interop.PointerConvertible, index: number): number;

declare function rb_debug_inspector_frame_class_get(dc: interop.PointerConvertible, index: number): number;

declare function rb_debug_inspector_frame_binding_get(dc: interop.PointerConvertible, index: number): number;

declare function rb_debug_inspector_frame_iseq_get(dc: interop.PointerConvertible, index: number): number;

declare function rb_debug_inspector_backtrace_locations(dc: interop.PointerConvertible): number;

declare function rb_add_event_hook(func: (p1: number, p2: number, p3: number, p4: number, p5: number) => void, events: number, data: number): void;

declare function rb_remove_event_hook(func: (p1: number, p2: number, p3: number, p4: number, p5: number) => void): number;

declare function rb_remove_event_hook_with_data(func: (p1: number, p2: number, p3: number, p4: number, p5: number) => void, data: number): number;

declare function rb_thread_add_event_hook(thval: number, func: (p1: number, p2: number, p3: number, p4: number, p5: number) => void, events: number, data: number): void;

declare function rb_thread_remove_event_hook(thval: number, func: (p1: number, p2: number, p3: number, p4: number, p5: number) => void): number;

declare function rb_thread_remove_event_hook_with_data(thval: number, func: (p1: number, p2: number, p3: number, p4: number, p5: number) => void, data: number): number;

declare function rb_tracepoint_new(target_thread_not_supported_yet: number, events: number, func: (p1: number, p2: interop.PointerConvertible) => void, data: interop.PointerConvertible): number;

declare function rb_tracepoint_enable(tpval: number): number;

declare function rb_tracepoint_disable(tpval: number): number;

declare function rb_tracepoint_enabled_p(tpval: number): number;

declare function rb_tracearg_from_tracepoint(tpval: number): interop.Pointer;

declare function rb_tracearg_event_flag(trace_arg: interop.PointerConvertible): number;

declare function rb_tracearg_event(trace_arg: interop.PointerConvertible): number;

declare function rb_tracearg_lineno(trace_arg: interop.PointerConvertible): number;

declare function rb_tracearg_path(trace_arg: interop.PointerConvertible): number;

declare function rb_tracearg_method_id(trace_arg: interop.PointerConvertible): number;

declare function rb_tracearg_callee_id(trace_arg: interop.PointerConvertible): number;

declare function rb_tracearg_defined_class(trace_arg: interop.PointerConvertible): number;

declare function rb_tracearg_binding(trace_arg: interop.PointerConvertible): number;

declare function rb_tracearg_self(trace_arg: interop.PointerConvertible): number;

declare function rb_tracearg_return_value(trace_arg: interop.PointerConvertible): number;

declare function rb_tracearg_raised_exception(trace_arg: interop.PointerConvertible): number;

declare function rb_tracearg_object(trace_arg: interop.PointerConvertible): number;

declare function rb_postponed_job_register(flags: number, func: (p1: interop.PointerConvertible) => void, data: interop.PointerConvertible): number;

declare function rb_postponed_job_register_one(flags: number, func: (p1: interop.PointerConvertible) => void, data: interop.PointerConvertible): number;

declare function rb_add_event_hook2(func: (p1: number, p2: number, p3: number, p4: number, p5: number) => void, events: number, data: number, hook_flag: interop.Enum<typeof rb_event_hook_flag_t>): void;

declare function rb_thread_add_event_hook2(thval: number, func: (p1: number, p2: number, p3: number, p4: number, p5: number) => void, events: number, data: number, hook_flag: interop.Enum<typeof rb_event_hook_flag_t>): void;

declare function onigenc_ascii_only_case_map(flagP: interop.PointerConvertible, pp: interop.PointerConvertible, end: interop.PointerConvertible, to: interop.PointerConvertible, to_end: interop.PointerConvertible, enc: interop.PointerConvertible): number;

declare function onigenc_mbclen_approximate(p: interop.PointerConvertible, e: interop.PointerConvertible, enc: interop.PointerConvertible): number;

declare function onigenc_step_back(enc: interop.PointerConvertible, start: interop.PointerConvertible, s: interop.PointerConvertible, end: interop.PointerConvertible, n: number): interop.Pointer;

declare function onigenc_init(): number;

declare function onigenc_set_default_encoding(enc: interop.PointerConvertible): number;

declare function onigenc_get_default_encoding(): interop.Pointer;

declare function onigenc_get_right_adjust_char_head_with_prev(enc: interop.PointerConvertible, start: interop.PointerConvertible, s: interop.PointerConvertible, end: interop.PointerConvertible, prev: interop.PointerConvertible): interop.Pointer;

declare function onigenc_get_prev_char_head(enc: interop.PointerConvertible, start: interop.PointerConvertible, s: interop.PointerConvertible, end: interop.PointerConvertible): interop.Pointer;

declare function onigenc_get_left_adjust_char_head(enc: interop.PointerConvertible, start: interop.PointerConvertible, s: interop.PointerConvertible, end: interop.PointerConvertible): interop.Pointer;

declare function onigenc_get_right_adjust_char_head(enc: interop.PointerConvertible, start: interop.PointerConvertible, s: interop.PointerConvertible, end: interop.PointerConvertible): interop.Pointer;

declare function onigenc_strlen(enc: interop.PointerConvertible, p: interop.PointerConvertible, end: interop.PointerConvertible): number;

declare function onigenc_strlen_null(enc: interop.PointerConvertible, p: interop.PointerConvertible): number;

declare function onigenc_str_bytelen_null(enc: interop.PointerConvertible, p: interop.PointerConvertible): number;

declare function onig_null_warn(s: string): void;

declare function onig_initialize(encodings: interop.Pointer, n: number): number;

declare function onig_init(): number;

declare function onig_error_code_to_str(s: interop.PointerConvertible, err_code: number): number;

declare function onig_set_warn_func(f: (p1: string) => void): void;

declare function onig_set_verb_warn_func(f: (p1: string) => void): void;

declare function onig_new(p1: interop.PointerConvertible, pattern: interop.PointerConvertible, pattern_end: interop.PointerConvertible, option: number, enc: interop.PointerConvertible, syntax: interop.PointerConvertible, einfo: interop.PointerConvertible): number;

declare function onig_reg_init(reg: interop.PointerConvertible, option: number, case_fold_flag: number, enc: interop.PointerConvertible, syntax: interop.PointerConvertible): number;

declare function onig_new_without_alloc(p1: interop.PointerConvertible, pattern: interop.PointerConvertible, pattern_end: interop.PointerConvertible, option: number, enc: interop.PointerConvertible, syntax: interop.PointerConvertible, einfo: interop.PointerConvertible): number;

declare function onig_new_deluxe(reg: interop.PointerConvertible, pattern: interop.PointerConvertible, pattern_end: interop.PointerConvertible, ci: interop.PointerConvertible, einfo: interop.PointerConvertible): number;

declare function onig_free(p1: interop.PointerConvertible): void;

declare function onig_free_body(p1: interop.PointerConvertible): void;

declare function onig_scan(reg: interop.PointerConvertible, str: interop.PointerConvertible, end: interop.PointerConvertible, region: interop.PointerConvertible, option: number, scan_callback: (p1: number, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number, callback_arg: interop.PointerConvertible): number;

declare function onig_search(p1: interop.PointerConvertible, str: interop.PointerConvertible, end: interop.PointerConvertible, start: interop.PointerConvertible, range: interop.PointerConvertible, region: interop.PointerConvertible, option: number): number;

declare function onig_search_gpos(p1: interop.PointerConvertible, str: interop.PointerConvertible, end: interop.PointerConvertible, global_pos: interop.PointerConvertible, start: interop.PointerConvertible, range: interop.PointerConvertible, region: interop.PointerConvertible, option: number): number;

declare function onig_match(p1: interop.PointerConvertible, str: interop.PointerConvertible, end: interop.PointerConvertible, at: interop.PointerConvertible, region: interop.PointerConvertible, option: number): number;

declare function onig_region_new(): interop.Pointer;

declare function onig_region_init(region: interop.PointerConvertible): void;

declare function onig_region_free(region: interop.PointerConvertible, free_self: number): void;

declare function onig_region_copy(to: interop.PointerConvertible, from: interop.PointerConvertible): void;

declare function onig_region_clear(region: interop.PointerConvertible): void;

declare function onig_region_resize(region: interop.PointerConvertible, n: number): number;

declare function onig_region_set(region: interop.PointerConvertible, at: number, beg: number, end: number): number;

declare function onig_name_to_group_numbers(reg: interop.PointerConvertible, name: interop.PointerConvertible, name_end: interop.PointerConvertible, nums: interop.PointerConvertible): number;

declare function onig_name_to_backref_number(reg: interop.PointerConvertible, name: interop.PointerConvertible, name_end: interop.PointerConvertible, region: interop.PointerConvertible): number;

declare function onig_foreach_name(reg: interop.PointerConvertible, func: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible) => number, arg: interop.PointerConvertible): number;

declare function onig_number_of_names(reg: interop.PointerConvertible): number;

declare function onig_number_of_captures(reg: interop.PointerConvertible): number;

declare function onig_number_of_capture_histories(reg: interop.PointerConvertible): number;

declare function onig_get_capture_tree(region: interop.PointerConvertible): interop.Pointer;

declare function onig_capture_tree_traverse(region: interop.PointerConvertible, at: number, callback_func: (p1: number, p2: number, p3: number, p4: number, p5: number, p6: interop.PointerConvertible) => number, arg: interop.PointerConvertible): number;

declare function onig_noname_group_capture_is_active(reg: interop.PointerConvertible): number;

declare function onig_get_encoding(reg: interop.PointerConvertible): interop.Pointer;

declare function onig_get_options(reg: interop.PointerConvertible): number;

declare function onig_get_case_fold_flag(reg: interop.PointerConvertible): number;

declare function onig_get_syntax(reg: interop.PointerConvertible): interop.Pointer;

declare function onig_set_default_syntax(syntax: interop.PointerConvertible): number;

declare function onig_copy_syntax(to: interop.PointerConvertible, from: interop.PointerConvertible): void;

declare function onig_get_syntax_op(syntax: interop.PointerConvertible): number;

declare function onig_get_syntax_op2(syntax: interop.PointerConvertible): number;

declare function onig_get_syntax_behavior(syntax: interop.PointerConvertible): number;

declare function onig_get_syntax_options(syntax: interop.PointerConvertible): number;

declare function onig_set_syntax_op(syntax: interop.PointerConvertible, op: number): void;

declare function onig_set_syntax_op2(syntax: interop.PointerConvertible, op2: number): void;

declare function onig_set_syntax_behavior(syntax: interop.PointerConvertible, behavior: number): void;

declare function onig_set_syntax_options(syntax: interop.PointerConvertible, options: number): void;

declare function onig_set_meta_char(syntax: interop.PointerConvertible, what: number, code: number): number;

declare function onig_copy_encoding(to: interop.PointerConvertible, from: interop.PointerConvertible): void;

declare function onig_get_default_case_fold_flag(): number;

declare function onig_set_default_case_fold_flag(case_fold_flag: number): number;

declare function onig_get_match_stack_limit_size(): number;

declare function onig_set_match_stack_limit_size(size: number): number;

declare function onig_get_parse_depth_limit(): number;

declare function onig_set_parse_depth_limit(depth: number): number;

declare function onig_end(): number;

declare function onig_version(): string;

declare function onig_copyright(): string;

declare function rb_reg_regcomp(p1: number): number;

declare function rb_reg_search(p1: number, p2: number, p3: number, p4: number): number;

declare function rb_reg_regsub(p1: number, p2: number, p3: interop.PointerConvertible, p4: number): number;

declare function rb_reg_adjust_startpos(p1: number, p2: number, p3: number, p4: number): number;

declare function rb_match_busy(p1: number): void;

declare function rb_reg_quote(p1: number): number;

declare function rb_reg_prepare_re(re: number, str: number): interop.Pointer;

declare function rb_reg_region_copy(p1: interop.PointerConvertible, p2: interop.PointerConvertible): number;

declare function rb_nativethread_self(): interop.Pointer;

declare function rb_nativethread_lock_initialize(lock: interop.PointerConvertible): void;

declare function rb_nativethread_lock_destroy(lock: interop.PointerConvertible): void;

declare function rb_nativethread_lock_lock(lock: interop.PointerConvertible): void;

declare function rb_nativethread_lock_unlock(lock: interop.PointerConvertible): void;

declare function rb_char_to_option_kcode(c: number, option: interop.PointerConvertible, kcode: interop.PointerConvertible): number;

declare function rb_enc_replicate(p1: string, p2: interop.PointerConvertible): number;

declare function rb_define_dummy_encoding(p1: string): number;

declare function rb_enc_dummy_p(enc: interop.PointerConvertible): number;

declare function rb_enc_to_index(enc: interop.PointerConvertible): number;

declare function rb_enc_get_index(obj: number): number;

declare function rb_enc_set_index(obj: number, encindex: number): void;

declare function rb_enc_capable(obj: number): number;

declare function rb_enc_find_index(name: string): number;

declare function rb_enc_alias(alias: string, orig: string): number;

declare function rb_to_encoding_index(p1: number): number;

declare function rb_to_encoding(p1: number): interop.Pointer;

declare function rb_find_encoding(p1: number): interop.Pointer;

declare function rb_enc_get(p1: number): interop.Pointer;

declare function rb_enc_compatible(p1: number, p2: number): interop.Pointer;

declare function rb_enc_check(p1: number, p2: number): interop.Pointer;

declare function rb_enc_associate_index(p1: number, p2: number): number;

declare function rb_enc_associate(p1: number, p2: interop.PointerConvertible): number;

declare function rb_enc_copy(dst: number, src: number): void;

declare function rb_enc_str_new(p1: string, p2: number, p3: interop.PointerConvertible): number;

declare function rb_enc_str_new_cstr(p1: string, p2: interop.PointerConvertible): number;

declare function rb_enc_str_new_static(p1: string, p2: number, p3: interop.PointerConvertible): number;

declare function rb_enc_reg_new(p1: string, p2: number, p3: interop.PointerConvertible, p4: number): number;

declare function rb_enc_sprintf(p1: interop.PointerConvertible, p2: string): number;

declare function rb_enc_vsprintf(p1: interop.PointerConvertible, p2: string, p3: string): number;

declare function rb_enc_strlen(p1: string, p2: string, p3: interop.PointerConvertible): number;

declare function rb_enc_nth(p1: string, p2: string, p3: number, p4: interop.PointerConvertible): string;

declare function rb_obj_encoding(p1: number): number;

declare function rb_enc_str_buf_cat(str: number, ptr: string, len: number, enc: interop.PointerConvertible): number;

declare function rb_enc_uint_chr(code: number, enc: interop.PointerConvertible): number;

declare function rb_external_str_new_with_enc(ptr: string, len: number, p3: interop.PointerConvertible): number;

declare function rb_str_export_to_enc(p1: number, p2: interop.PointerConvertible): number;

declare function rb_str_conv_enc(str: number, from: interop.PointerConvertible, to: interop.PointerConvertible): number;

declare function rb_str_conv_enc_opts(str: number, from: interop.PointerConvertible, to: interop.PointerConvertible, ecflags: number, ecopts: number): number;

declare function rb_enc_raise(p1: interop.PointerConvertible, p2: number, p3: string): void;

declare function rb_enc_from_index(idx: number): interop.Pointer;

declare function rb_enc_find(name: string): interop.Pointer;

declare function rb_enc_mbclen(p: string, e: string, enc: interop.PointerConvertible): number;

declare function rb_enc_fast_mbclen(p: string, e: string, enc: interop.PointerConvertible): number;

declare function rb_enc_precise_mbclen(p: string, e: string, enc: interop.PointerConvertible): number;

declare function rb_enc_ascget(p: string, e: string, len: interop.PointerConvertible, enc: interop.PointerConvertible): number;

declare function rb_enc_codepoint_len(p: string, e: string, len: interop.PointerConvertible, enc: interop.PointerConvertible): number;

declare function rb_enc_codepoint(p: string, e: string, enc: interop.PointerConvertible): number;

declare function rb_enc_codelen(code: number, enc: interop.PointerConvertible): number;

declare function rb_enc_code_to_mbclen(code: number, enc: interop.PointerConvertible): number;

declare function rb_enc_casefold(to: string, p: string, e: string, enc: interop.PointerConvertible): number;

declare function rb_enc_toupper(c: number, enc: interop.PointerConvertible): number;

declare function rb_enc_tolower(c: number, enc: interop.PointerConvertible): number;

declare function rb_intern3(p1: string, p2: number, p3: interop.PointerConvertible): number;

declare function rb_interned_id_p(p1: string, p2: number, p3: interop.PointerConvertible): number;

declare function rb_enc_symname_p(p1: string, p2: interop.PointerConvertible): number;

declare function rb_enc_symname2_p(p1: string, p2: number, p3: interop.PointerConvertible): number;

declare function rb_enc_str_coderange(p1: number): number;

declare function rb_str_coderange_scan_restartable(p1: string, p2: string, p3: interop.PointerConvertible, p4: interop.PointerConvertible): number;

declare function rb_enc_str_asciionly_p(p1: number): number;

declare function rb_enc_from_encoding(enc: interop.PointerConvertible): number;

declare function rb_enc_unicode_p(enc: interop.PointerConvertible): number;

declare function rb_ascii8bit_encoding(): interop.Pointer;

declare function rb_utf8_encoding(): interop.Pointer;

declare function rb_usascii_encoding(): interop.Pointer;

declare function rb_locale_encoding(): interop.Pointer;

declare function rb_filesystem_encoding(): interop.Pointer;

declare function rb_default_external_encoding(): interop.Pointer;

declare function rb_default_internal_encoding(): interop.Pointer;

declare function rb_ascii8bit_encindex(): number;

declare function rb_utf8_encindex(): number;

declare function rb_usascii_encindex(): number;

declare function rb_locale_encindex(): number;

declare function rb_filesystem_encindex(): number;

declare function rb_enc_default_external(): number;

declare function rb_enc_default_internal(): number;

declare function rb_enc_set_default_external(encoding: number): void;

declare function rb_enc_set_default_internal(encoding: number): void;

declare function rb_locale_charmap(klass: number): number;

declare function rb_memsearch(p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible): number;

declare function rb_enc_path_next(p1: string, p2: string, p3: interop.PointerConvertible): string;

declare function rb_enc_path_skip_prefix(p1: string, p2: string, p3: interop.PointerConvertible): string;

declare function rb_enc_path_last_separator(p1: string, p2: string, p3: interop.PointerConvertible): string;

declare function rb_enc_path_end(p1: string, p2: string, p3: interop.PointerConvertible): string;

declare function ruby_enc_find_basename(name: string, baselen: interop.PointerConvertible, alllen: interop.PointerConvertible, enc: interop.PointerConvertible): string;

declare function ruby_enc_find_extname(name: string, len: interop.PointerConvertible, enc: interop.PointerConvertible): string;

declare function rb_check_id_cstr(ptr: string, len: number, enc: interop.PointerConvertible): number;

declare function rb_check_symbol_cstr(ptr: string, len: number, enc: interop.PointerConvertible): number;

declare function rb_str_encode(str: number, to: number, ecflags: number, ecopts: number): number;

declare function rb_econv_has_convpath_p(from_encoding: string, to_encoding: string): number;

declare function rb_econv_prepare_options(opthash: number, ecopts: interop.PointerConvertible, ecflags: number): number;

declare function rb_econv_prepare_opts(opthash: number, ecopts: interop.PointerConvertible): number;

declare function rb_econv_open(source_encoding: string, destination_encoding: string, ecflags: number): interop.Pointer;

declare function rb_econv_open_opts(source_encoding: string, destination_encoding: string, ecflags: number, ecopts: number): interop.Pointer;

declare function rb_econv_convert(ec: interop.PointerConvertible, source_buffer_ptr: interop.PointerConvertible, source_buffer_end: interop.PointerConvertible, destination_buffer_ptr: interop.PointerConvertible, destination_buffer_end: interop.PointerConvertible, flags: number): interop.Enum<typeof rb_econv_result_t>;

declare function rb_econv_close(ec: interop.PointerConvertible): void;

declare function rb_econv_set_replacement(ec: interop.PointerConvertible, str: interop.PointerConvertible, len: number, encname: string): number;

declare function rb_econv_decorate_at_first(ec: interop.PointerConvertible, decorator_name: string): number;

declare function rb_econv_decorate_at_last(ec: interop.PointerConvertible, decorator_name: string): number;

declare function rb_econv_open_exc(senc: string, denc: string, ecflags: number): number;

declare function rb_econv_insert_output(ec: interop.PointerConvertible, str: interop.PointerConvertible, len: number, str_encoding: string): number;

declare function rb_econv_encoding_to_insert_output(ec: interop.PointerConvertible): string;

declare function rb_econv_check_error(ec: interop.PointerConvertible): void;

declare function rb_econv_make_exception(ec: interop.PointerConvertible): number;

declare function rb_econv_putbackable(ec: interop.PointerConvertible): number;

declare function rb_econv_putback(ec: interop.PointerConvertible, p: interop.PointerConvertible, n: number): void;

declare function rb_econv_asciicompat_encoding(encname: string): string;

declare function rb_econv_str_convert(ec: interop.PointerConvertible, src: number, flags: number): number;

declare function rb_econv_substr_convert(ec: interop.PointerConvertible, src: number, byteoff: number, bytesize: number, flags: number): number;

declare function rb_econv_str_append(ec: interop.PointerConvertible, src: number, dst: number, flags: number): number;

declare function rb_econv_substr_append(ec: interop.PointerConvertible, src: number, byteoff: number, bytesize: number, dst: number, flags: number): number;

declare function rb_econv_append(ec: interop.PointerConvertible, bytesrc: string, bytesize: number, dst: number, flags: number): number;

declare function rb_econv_binmode(ec: interop.PointerConvertible): void;

declare function rb_thread_call_with_gvl(func: (p1: interop.PointerConvertible) => interop.Pointer, data1: interop.PointerConvertible): interop.Pointer;

declare function rb_thread_call_without_gvl(func: (p1: interop.PointerConvertible) => interop.Pointer, data1: interop.PointerConvertible, ubf: (p1: interop.PointerConvertible) => void, data2: interop.PointerConvertible): interop.Pointer;

declare function rb_thread_call_without_gvl2(func: (p1: interop.PointerConvertible) => interop.Pointer, data1: interop.PointerConvertible, ubf: (p1: interop.PointerConvertible) => void, data2: interop.PointerConvertible): interop.Pointer;

declare function rb_io_make_open_file(obj: number): interop.Pointer;

declare function rb_io_stdio_file(fptr: interop.PointerConvertible): interop.Pointer;

declare function rb_fdopen(p1: number, p2: string): interop.Pointer;

declare function rb_io_modestr_fmode(modestr: string): number;

declare function rb_io_modestr_oflags(modestr: string): number;

declare function rb_io_oflags_fmode(oflags: number): number;

declare function rb_io_check_writable(p1: interop.PointerConvertible): void;

declare function rb_io_check_readable(p1: interop.PointerConvertible): void;

declare function rb_io_check_char_readable(fptr: interop.PointerConvertible): void;

declare function rb_io_check_byte_readable(fptr: interop.PointerConvertible): void;

declare function rb_io_fptr_finalize(p1: interop.PointerConvertible): number;

declare function rb_io_synchronized(p1: interop.PointerConvertible): void;

declare function rb_io_check_initialized(p1: interop.PointerConvertible): void;

declare function rb_io_check_closed(p1: interop.PointerConvertible): void;

declare function rb_io_get_io(io: number): number;

declare function rb_io_check_io(io: number): number;

declare function rb_io_get_write_io(io: number): number;

declare function rb_io_set_write_io(io: number, w: number): number;

declare function rb_io_wait_readable(p1: number): number;

declare function rb_io_wait_writable(p1: number): number;

declare function rb_wait_for_single_fd(fd: number, events: number, tv: interop.PointerConvertible): number;

declare function rb_io_set_nonblock(fptr: interop.PointerConvertible): void;

declare function rb_io_extract_encoding_option(opt: number, enc_p: interop.PointerConvertible, enc2_p: interop.PointerConvertible, fmode_p: interop.PointerConvertible): number;

declare function rb_io_bufwrite(io: number, buf: interop.PointerConvertible, size: number): number;

declare function rb_io_taint_check(p1: number): number;

declare function rb_eof_error(): void;

declare function rb_io_read_check(p1: interop.PointerConvertible): void;

declare function rb_io_read_pending(p1: interop.PointerConvertible): number;

declare function rb_stat_new(p1: interop.PointerConvertible): number;

declare function ruby_scan_oct(p1: string, p2: number, p3: interop.PointerConvertible): number;

declare function ruby_scan_hex(p1: string, p2: number, p3: interop.PointerConvertible): number;

declare function ruby_qsort(p1: interop.PointerConvertible, p2: number, p3: number, p4: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number, p5: interop.PointerConvertible): void;

declare function ruby_setenv(p1: string, p2: string): void;

declare function ruby_unsetenv(p1: string): void;

declare function ruby_strdup(p1: string): string;

declare function ruby_getcwd(): string;

declare function ruby_strtod(p1: string, p2: interop.PointerConvertible): number;

declare function ruby_each_words(p1: string, p2: (p1: string, p2: number, p3: interop.PointerConvertible) => void, p3: interop.PointerConvertible): void;

declare function ruby_vm_destruct(vm: interop.PointerConvertible): number;

declare function ruby_vm_at_exit(func: (p1: interop.PointerConvertible) => void): void;


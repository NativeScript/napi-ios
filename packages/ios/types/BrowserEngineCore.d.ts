/// <reference types="@nativescript/objc-node-api" />

declare function be_memory_inline_jit_restrict_rwx_to_rw_with_witness_impl(): void;

declare function be_memory_inline_jit_restrict_rwx_to_rx_with_witness_impl(): void;

declare function be_memory_inline_jit_restrict_with_witness_supported(): number;

declare function be_kevent(kq: number, changelist: interop.PointerConvertible, nchanges: number, eventlist: interop.PointerConvertible, nevents: number, be_flags: number): number;

declare function be_kevent64(kq: number, changelist: interop.PointerConvertible, nchanges: number, eventlist: interop.PointerConvertible, nevents: number, flags: number): number;


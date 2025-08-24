/// <reference types="@nativescript/objc-node-api" />

declare class __AGLPrivateRec {
  constructor(init?: __AGLPrivateRec);
}

declare class __AGLContextRec {
  constructor(init?: __AGLContextRec);
  rend: interop.Pointer;
  disp: __GLIFunctionDispatchRec;
  priv: interop.Pointer;
}

declare class __AGLPixelFormatRec {
  constructor(init?: __AGLPixelFormatRec);
}

declare class __AGLRendererInfoRec {
  constructor(init?: __AGLRendererInfoRec);
}

declare class __AGLPBufferRec {
  constructor(init?: __AGLPBufferRec);
}

type GLMfunctionsDescriptor = 
  | { page_alloc_func: (p1: number) => interop.Pointer | null }
  | { page_free_func: (p1: interop.PointerConvertible) => void | null }
  | { zero_func: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number) => void | null }
  | { copy_func: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: number, p6: number) => void | null }
  | { set_ubyte_func: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number) => void | null }
  | { set_ushort_func: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number) => void | null }
  | { set_uint_func: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number) => void | null }
  | { set_double_func: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number) => void | null };

declare class GLMfunctions {
  constructor(init?: GLMfunctionsDescriptor);
  page_alloc_func: (p1: number) => interop.Pointer | null;
  page_free_func: (p1: interop.PointerConvertible) => void | null;
  zero_func: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number) => void | null;
  copy_func: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: number, p6: number) => void | null;
  set_ubyte_func: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number) => void | null;
  set_ushort_func: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number) => void | null;
  set_uint_func: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number) => void | null;
  set_double_func: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number) => void | null;
}

declare function aglChoosePixelFormat(gdevs: interop.PointerConvertible, ndev: number, attribs: interop.PointerConvertible): interop.Pointer;

declare function aglCreatePixelFormat(attribs: interop.PointerConvertible): interop.Pointer;

declare function aglDestroyPixelFormat(pix: interop.PointerConvertible): void;

declare function aglNextPixelFormat(pix: interop.PointerConvertible): interop.Pointer;

declare function aglDescribePixelFormat(pix: interop.PointerConvertible, attrib: number, value: interop.PointerConvertible): number;

declare function aglDisplaysOfPixelFormat(pix: interop.PointerConvertible, ndevs: interop.PointerConvertible): interop.Pointer;

declare function aglDevicesOfPixelFormat(pix: interop.PointerConvertible, ndevs: interop.PointerConvertible): interop.Pointer;

declare function aglQueryRendererInfoForCGDirectDisplayIDs(dspIDs: interop.PointerConvertible, ndev: number): interop.Pointer;

declare function aglDestroyRendererInfo(rend: interop.PointerConvertible): void;

declare function aglNextRendererInfo(rend: interop.PointerConvertible): interop.Pointer;

declare function aglDescribeRenderer(rend: interop.PointerConvertible, prop: number, value: interop.PointerConvertible): number;

declare function aglQueryRendererInfo(gdevs: interop.PointerConvertible, ndev: number): interop.Pointer;

declare function aglCreateContext(pix: interop.PointerConvertible, share: interop.PointerConvertible): interop.Pointer;

declare function aglDestroyContext(ctx: interop.PointerConvertible): number;

declare function aglCopyContext(src: interop.PointerConvertible, dst: interop.PointerConvertible, mask: number): number;

declare function aglUpdateContext(ctx: interop.PointerConvertible): number;

declare function aglSetCurrentContext(ctx: interop.PointerConvertible): number;

declare function aglGetCurrentContext(): interop.Pointer;

declare function aglSetDrawable(ctx: interop.PointerConvertible, draw: interop.PointerConvertible): number;

declare function aglGetDrawable(ctx: interop.PointerConvertible): interop.Pointer;

declare function aglSetWindowRef(ctx: interop.PointerConvertible, window: interop.PointerConvertible): number;

declare function aglGetWindowRef(ctx: interop.PointerConvertible): interop.Pointer;

declare function aglSetHIViewRef(ctx: interop.PointerConvertible, hiview: interop.Object): number;

declare function aglGetHIViewRef(ctx: interop.PointerConvertible): interop.Object;

declare function aglSetOffScreen(ctx: interop.PointerConvertible, width: number, height: number, rowbytes: number, baseaddr: interop.PointerConvertible): number;

declare function aglSetFullScreen(ctx: interop.PointerConvertible, width: number, height: number, freq: number, device: number): number;

declare function aglSetVirtualScreen(ctx: interop.PointerConvertible, screen: number): number;

declare function aglGetVirtualScreen(ctx: interop.PointerConvertible): number;

declare function aglGetVersion(major: interop.PointerConvertible, minor: interop.PointerConvertible): void;

declare function aglConfigure(pname: number, param: number): number;

declare function aglSwapBuffers(ctx: interop.PointerConvertible): void;

declare function aglEnable(ctx: interop.PointerConvertible, pname: number): number;

declare function aglDisable(ctx: interop.PointerConvertible, pname: number): number;

declare function aglIsEnabled(ctx: interop.PointerConvertible, pname: number): number;

declare function aglSetInteger(ctx: interop.PointerConvertible, pname: number, params: interop.PointerConvertible): number;

declare function aglGetInteger(ctx: interop.PointerConvertible, pname: number, params: interop.PointerConvertible): number;

declare function aglUseFont(ctx: interop.PointerConvertible, fontID: number, face: number, size: number, first: number, count: number, base: number): number;

declare function aglGetError(): number;

declare function aglErrorString(code: number): interop.Pointer;

declare function aglResetLibrary(): void;

declare function aglSurfaceTexture(context: interop.PointerConvertible, target: number, internalformat: number, surfacecontext: interop.PointerConvertible): void;

declare function aglCreatePBuffer(width: number, height: number, target: number, internalFormat: number, max_level: number, pbuffer: interop.PointerConvertible): number;

declare function aglDestroyPBuffer(pbuffer: interop.PointerConvertible): number;

declare function aglDescribePBuffer(pbuffer: interop.PointerConvertible, width: interop.PointerConvertible, height: interop.PointerConvertible, target: interop.PointerConvertible, internalFormat: interop.PointerConvertible, max_level: interop.PointerConvertible): number;

declare function aglTexImagePBuffer(ctx: interop.PointerConvertible, pbuffer: interop.PointerConvertible, source: number): number;

declare function aglSetPBuffer(ctx: interop.PointerConvertible, pbuffer: interop.PointerConvertible, face: number, level: number, screen: number): number;

declare function aglGetPBuffer(ctx: interop.PointerConvertible, pbuffer: interop.PointerConvertible, face: interop.PointerConvertible, level: interop.PointerConvertible, screen: interop.PointerConvertible): number;

declare function aglGetCGLContext(ctx: interop.PointerConvertible, cgl_ctx: interop.PointerConvertible): number;

declare function aglGetCGLPixelFormat(pix: interop.PointerConvertible, cgl_pix: interop.PointerConvertible): number;

declare function glmSetMode(mode: number): void;

declare function glmSetFunc(type: number, func: GLMfunctions): void;

declare function glmSetInteger(param: number, value: number): void;

declare function glmGetInteger(param: number): number;

declare function glmPageFreeAll(): void;

declare function glmMalloc(size: number): interop.Pointer;

declare function glmCalloc(nmemb: number, size: number): interop.Pointer;

declare function glmRealloc(ptr: interop.PointerConvertible, size: number): interop.Pointer;

declare function glmFree(ptr: interop.PointerConvertible): void;

declare function glmVecAlloc(size: number): interop.Pointer;

declare function glmVecFree(ptr: interop.PointerConvertible): void;

declare function glmDCBAlloc(size: number): interop.Pointer;

declare function glmDCBFree(ptr: interop.PointerConvertible): void;

declare function glmZero(buffer: interop.PointerConvertible, width: number, height: number, rowbytes: number): void;

declare function glmCopy(src: interop.PointerConvertible, dst: interop.PointerConvertible, width: number, height: number, src_rowbytes: number, dst_rowbytes: number): void;

declare function glmSetUByte(buffer: interop.PointerConvertible, width: number, height: number, row_elems: number, value: number): void;

declare function glmSetUShort(buffer: interop.PointerConvertible, width: number, height: number, row_elems: number, value: number): void;

declare function glmSetUInt(buffer: interop.PointerConvertible, width: number, height: number, row_elems: number, value: number): void;

declare function glmSetDouble(buffer: interop.PointerConvertible, width: number, height: number, row_elems: number, value: number): void;

declare function glmGetError(): number;


/// <reference types="@nativescript/objc-node-api" />

declare const xBitReverseTable: unknown /* const array */;

declare const TtkNullElementOptions: interop.Pointer;

declare const tkIntPlatStubsPtr: interop.Pointer;

declare const tkMacOSXEmbedHandler: interop.Pointer;

declare const tkPlatStubsPtr: interop.Pointer;

declare const tkIntStubsPtr: interop.Pointer;

declare const tkPredefBitmapTable: Tcl_HashTable;

declare const tkPhotoImageType: Tk_ImageType;

declare const tkMainWindowList: interop.Pointer;

declare const tkImgFmtPPM: Tk_PhotoImageFormat;

declare const tkStateKeyObjType: Tcl_ObjType;

declare const tkFontObjType: Tcl_ObjType;

declare const tkCursorObjType: Tcl_ObjType;

declare const tkColorObjType: Tcl_ObjType;

declare const tkBitmapObjType: Tcl_ObjType;

declare const tkDisplayList: interop.Pointer;

declare const LU_SHIFT: number;

declare const LU_CAPS: number;

declare const Ttk_Box: number;

declare const tkStubsPtr: interop.Pointer;

declare const tkImgFmtGIF: Tk_PhotoImageFormat;

declare const Ttk_ElementClass: number;

declare const Ttk_Theme: number;

declare const Ttk_Padding: number;

declare const LU_IGNORE: number;

declare const ttkNullElementSpec: Ttk_ElementSpec;

declare const Ttk_StateMap: number;

declare const tkBezierSmoothMethod: Tk_SmoothMethod;

declare const tkOptionObjType: Tcl_ObjType;

declare const tkBorderObjType: Tcl_ObjType;

declare const Tcl_Obj: number;

declare const tkBitmapImageType: Tk_ImageType;

declare const XClassHint: number;

declare const tkTextIndexType: Tcl_ObjType;

declare const ttkStubsPtr: interop.Pointer;

declare const tkHandleEventProc: (p1: interop.PointerConvertible) => void;

declare const Ttk_Orient: {
  HORIZONT: 0,
  VERTIC: 1,
};

declare const ArrowDirection: {
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3,
};

declare const Ttk_Compound: {
  NONE: 0,
  TEXT: 1,
  IMAGE: 2,
  CENTER: 3,
  TOP: 4,
  BOTTOM: 5,
  LEFT: 6,
  RIGHT: 7,
};

declare const Ttk_ButtonDefaultState: {
  NORMAL: 0,
  ACTIVE: 1,
  DISABLED: 2,
};

declare const TTKStyleVersion2: {
  TK_STYLE_VERSION_2: 2,
};

declare const Tk_State: {
  NULL: -1,
  ACTIVE: 0,
  DISABLED: 1,
  NORMAL: 2,
  HIDDEN: 3,
};

declare const Tk_Justify: {
  LEFT: 0,
  RIGHT: 1,
  CENTER: 2,
};

declare const Tk_Anchor: {
  N: 0,
  NE: 1,
  E: 2,
  SE: 3,
  S: 4,
  SW: 5,
  W: 6,
  NW: 7,
  CENTER: 8,
};

declare const Tk_ConfigTypes: {
  BOOLEAN: 0,
  INT: 1,
  DOUBLE: 2,
  STRING: 3,
  UID: 4,
  COLOR: 5,
  FONT: 6,
  BITMAP: 7,
  BORDER: 8,
  RELIEF: 9,
  CURSOR: 10,
  ACTIVE_CURSOR: 11,
  JUSTIFY: 12,
  ANCHOR: 13,
  SYNONYM: 14,
  CAP_STYLE: 15,
  JOIN_STYLE: 16,
  PIXELS: 17,
  MM: 18,
  WINDOW: 19,
  CUSTOM: 20,
  END: 21,
};

declare const XIMCaretStyle: {
  Invisible: 0,
  Primary: 1,
  Secondary: 2,
};

declare const XIMCaretDirection: {
  ForwardChar: 0,
  BackwardChar: 1,
  ForwardWord: 2,
  BackwardWord: 3,
  CaretUp: 4,
  CaretDown: 5,
  NextLine: 6,
  PreviousLine: 7,
  LineStart: 8,
  LineEnd: 9,
  AbsolutePosition: 10,
  DontChange: 11,
};

declare const XIMStatusDataType: {
  Text: 0,
  Bitmap: 1,
};

declare const Ttk_Side: {
  LEFT: 0,
  TOP: 1,
  RIGHT: 2,
  BOTTOM: 3,
};

declare const Tk_OptionType: {
  BOOLEAN: 0,
  INT: 1,
  DOUBLE: 2,
  STRING: 3,
  STRING_TABLE: 4,
  COLOR: 5,
  FONT: 6,
  BITMAP: 7,
  BORDER: 8,
  RELIEF: 9,
  CURSOR: 10,
  JUSTIFY: 11,
  ANCHOR: 12,
  SYNONYM: 13,
  PIXELS: 14,
  WINDOW: 15,
  END: 16,
  CUSTOM: 17,
  STYLE: 18,
};

declare const Tk_RestrictAction: {
  DEFER_: 0,
  PROCESS_: 1,
  DISCARD_: 2,
};

declare const XICCEncodingStyle: {
  String: 0,
  CompoundText: 1,
  Text: 2,
  StdICCText: 3,
};

declare class TkFont {
  constructor(init?: TkFont);
  resourceRefCount: number;
  objRefCount: number;
  cacheHashPtr: interop.Pointer;
  namedHashPtr: interop.Pointer;
  screen: interop.Pointer;
  tabWidth: number;
  underlinePos: number;
  underlineHeight: number;
  fid: number;
  fa: TkFontAttributes;
  fm: TkFontMetrics;
  nextPtr: interop.Pointer;
}

declare class TkFontMetrics {
  constructor(init?: TkFontMetrics);
  ascent: number;
  descent: number;
  maxWidth: number;
  fixed: number;
}

declare class TtkImageSpec {
  constructor(init?: TtkImageSpec);
}

declare class TTKLayoutInstruction {
  constructor(init?: TTKLayoutInstruction);
  elementName: string | null;
  opcode: number;
}

declare class NullElement {
  constructor(init?: NullElement);
  unused: interop.Pointer;
}

declare class Ttk_ElementSpec {
  constructor(init?: Ttk_ElementSpec);
  version: interop.Enum<typeof TTKStyleVersion2>;
  elementSize: number;
  options: interop.Pointer;
  size: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible) => void | null;
  draw: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: number, p6: number) => void | null;
}

declare class Ttk_ElementOptionSpec {
  constructor(init?: Ttk_ElementOptionSpec);
  optionName: string | null;
  type: interop.Enum<typeof Tk_OptionType>;
  offset: number;
  defaultValue: string | null;
}

declare class Ttk_Style_ {
  constructor(init?: Ttk_Style_);
}

declare class Ttk_Layout_ {
  constructor(init?: Ttk_Layout_);
}

declare class Ttk_ElementClass_ {
  constructor(init?: Ttk_ElementClass_);
}

declare class Ttk_Box {
  constructor(init?: Ttk_Box);
  x: number;
  y: number;
  width: number;
  height: number;
}

declare class Ttk_StateSpec {
  constructor(init?: Ttk_StateSpec);
  onbits: number;
  offbits: number;
}

declare class TkIntPlatStubHooks {
  constructor(init?: TkIntPlatStubHooks);
}

declare class TkMacOSXEmbedHandler {
  constructor(init?: TkMacOSXEmbedHandler);
  registerWinProc: (p1: number, p2: interop.PointerConvertible) => number | null;
  getPortProc: (p1: interop.PointerConvertible) => interop.Pointer | null;
  containerExistProc: (p1: interop.PointerConvertible) => number | null;
  getClipProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  getOffsetProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
}

declare class TkPlatStubHooks {
  constructor(init?: TkPlatStubHooks);
}

declare class TkIntStubHooks {
  constructor(init?: TkIntStubHooks);
}

declare class TkWindowPrivate {
  constructor(init?: TkWindowPrivate);
  winPtr: interop.Pointer;
  view: NSView | null;
  context: interop.Object | null;
  xOff: number;
  yOff: number;
  size: CGSize;
  visRgn: interop.Object | null;
  aboveVisRgn: interop.Object | null;
  drawRgn: interop.Object | null;
  referenceCount: number;
  toplevel: interop.Pointer;
  flags: number;
}

declare class TkDisplayFocusInfo {
  constructor(init?: TkDisplayFocusInfo);
}

declare class TkWmInfo {
  constructor(init?: TkWmInfo);
}

declare class TkMainInfo {
  constructor(init?: TkMainInfo);
  refCount: number;
  winPtr: interop.Pointer;
  interp: interop.Pointer;
  nameTable: Tcl_HashTable;
  deletionEpoch: number;
  bindingTable: interop.Pointer;
  bindInfo: interop.Pointer;
  fontInfoPtr: interop.Pointer;
  tlFocusPtr: interop.Pointer;
  displayFocusPtr: interop.Pointer;
  optionRootPtr: interop.Pointer;
  imageTable: Tcl_HashTable;
  strictMotif: number;
  alwaysShowSelection: number;
  nextPtr: interop.Pointer;
}

declare class TkWindowEvent {
  constructor(init?: TkWindowEvent);
}

declare class TkDisplay {
  constructor(init?: TkDisplay);
  display: interop.Pointer;
  nextPtr: interop.Pointer;
  name: string | null;
  lastEventTime: number;
  borderInit: number;
  borderTable: Tcl_HashTable;
  atomInit: number;
  nameTable: Tcl_HashTable;
  atomTable: Tcl_HashTable;
  bindInfoStale: number;
  modeModMask: number;
  metaModMask: number;
  altModMask: number;
  lockUsage: interop.Enum<typeof TkDisplay::(unnamed at /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX26.0.sdk/System/Library/Frameworks/Tk.framework/Headers/tk-private/tkInt.h:209:5)>;
  numModKeyCodes: number;
  modKeyCodes: interop.Pointer;
  bitmapInit: number;
  bitmapAutoNumber: number;
  bitmapNameTable: Tcl_HashTable;
  bitmapIdTable: Tcl_HashTable;
  bitmapDataTable: Tcl_HashTable;
  numIdSearches: number;
  numSlowSearches: number;
  colorInit: number;
  stressPtr: interop.Pointer;
  colorNameTable: Tcl_HashTable;
  colorValueTable: Tcl_HashTable;
  cursorInit: number;
  cursorNameTable: Tcl_HashTable;
  cursorDataTable: Tcl_HashTable;
  cursorIdTable: Tcl_HashTable;
  cursorString: unknown /* const array */;
  cursorFont: number;
  errorPtr: interop.Pointer;
  deleteCount: number;
  delayedMotionPtr: interop.Pointer;
  focusDebug: number;
  implicitWinPtr: interop.Pointer;
  focusPtr: interop.Pointer;
  gcValueTable: Tcl_HashTable;
  gcIdTable: Tcl_HashTable;
  gcInit: number;
  maintainHashTable: Tcl_HashTable;
  geomInit: number;
  uidTable: Tcl_HashTable;
  uidInit: number;
  grabWinPtr: interop.Pointer;
  eventualGrabWinPtr: interop.Pointer;
  buttonWinPtr: interop.Pointer;
  serverWinPtr: interop.Pointer;
  firstGrabEventPtr: interop.Pointer;
  lastGrabEventPtr: interop.Pointer;
  grabFlags: number;
  gridInit: number;
  gridHashTable: Tcl_HashTable;
  imageId: number;
  postCommandGeneration: number;
  packInit: number;
  packerHashTable: Tcl_HashTable;
  placeInit: number;
  masterTable: Tcl_HashTable;
  slaveTable: Tcl_HashTable;
  selectionInfoPtr: interop.Pointer;
  multipleAtom: number;
  incrAtom: number;
  targetsAtom: number;
  timestampAtom: number;
  textAtom: number;
  compoundTextAtom: number;
  applicationAtom: number;
  windowAtom: number;
  clipboardAtom: number;
  utf8Atom: number;
  clipWindow: interop.Pointer;
  clipboardActive: number;
  clipboardAppPtr: interop.Pointer;
  clipTargetPtr: interop.Pointer;
  commTkwin: interop.Pointer;
  commProperty: number;
  registryProperty: number;
  appNameProperty: number;
  idStackPtr: interop.Pointer;
  defaultAllocProc: (p1: interop.PointerConvertible) => number | null;
  windowStackPtr: interop.Pointer;
  idCleanupScheduled: interop.Pointer;
  firstWmPtr: interop.Pointer;
  foregroundWmPtr: interop.Pointer;
  destroyCount: number;
  lastDestroyRequest: number;
  cmapPtr: interop.Pointer;
  winTable: Tcl_HashTable;
  refCount: number;
  mouseButtonState: number;
  mouseButtonWindow: number;
  warpWindow: number;
  warpX: number;
  warpY: number;
  flags: number;
  caret: TkCaret;
  iconDataSize: number;
  iconDataPtr: interop.Pointer;
}

declare class TkWindow {
  constructor(init?: TkWindow);
  display: interop.Pointer;
  dispPtr: interop.Pointer;
  screenNum: number;
  visual: interop.Pointer;
  depth: number;
  window: number;
  childList: interop.Pointer;
  lastChildPtr: interop.Pointer;
  parentPtr: interop.Pointer;
  nextPtr: interop.Pointer;
  mainPtr: interop.Pointer;
  pathName: string | null;
  nameUid: string | null;
  classUid: string | null;
  changes: XWindowChanges;
  dirtyChanges: number;
  atts: XSetWindowAttributes;
  dirtyAtts: number;
  flags: number;
  handlerList: interop.Pointer;
  tagPtr: interop.Pointer;
  numTags: number;
  optionLevel: number;
  selHandlerList: interop.Pointer;
  geomMgrPtr: interop.Pointer;
  geomData: interop.Pointer;
  reqWidth: number;
  reqHeight: number;
  internalBorderLeft: number;
  wmInfoPtr: interop.Pointer;
  classProcsPtr: interop.Pointer;
  instanceData: interop.Pointer;
  privatePtr: interop.Pointer;
  internalBorderRight: number;
  internalBorderTop: number;
  internalBorderBottom: number;
  minReqWidth: number;
  minReqHeight: number;
}

declare class TkCursor {
  constructor(init?: TkCursor);
  cursor: interop.Pointer;
  display: interop.Pointer;
  resourceRefCount: number;
  objRefCount: number;
  otherTable: interop.Pointer;
  hashPtr: interop.Pointer;
  idHashPtr: interop.Pointer;
  nextPtr: interop.Pointer;
}

declare class TkBindInfo_ {
  constructor(init?: TkBindInfo_);
}

declare class TkRegion_ {
  constructor(init?: TkRegion_);
}

declare class TkFontAttributes {
  constructor(init?: TkFontAttributes);
  family: string | null;
  size: number;
  weight: number;
  slant: number;
  underline: number;
  overstrike: number;
}

declare class TkColormap {
  constructor(init?: TkColormap);
}

declare class TtkStubs {
  constructor(init?: TtkStubs);
  magic: number;
  epoch: number;
  revision: number;
  hooks: interop.Pointer;
  Ttk_Theme: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: string) => number | null;
  ttk_RegisterCleanup: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void | null;
  ttk_RegisterElementSpec: (p1: number, p2: string, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  ttk_RegisterElement: (p1: interop.PointerConvertible, p2: number, p3: string, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => interop.Pointer | null;
  ttk_RegisterElementFactory: (p1: interop.PointerConvertible, p2: string, p3: number, p4: interop.PointerConvertible) => number | null;
  ttk_RegisterLayout: (p1: number, p2: string, p3: number) => void | null;
  reserved9: () => void | null;
  ttk_GetStateSpecFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ttk_NewStateSpecObj: (p1: number, p2: number) => interop.Pointer | null;
  Ttk_StateMap: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  ttk_StateMapLookup: (p1: interop.PointerConvertible, p2: number, p3: number) => interop.Pointer | null;
  ttk_StateTableLookup: (p1: interop.PointerConvertible, p2: number) => number | null;
  reserved15: () => void | null;
  reserved16: () => void | null;
  reserved17: () => void | null;
  reserved18: () => void | null;
  reserved19: () => void | null;
  ttk_GetPaddingFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  ttk_GetBorderFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  ttk_GetStickyFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  Ttk_Padding: (p1: interop.PointerConvertible) => (p1: number, p2: number, p3: number, p4: number) => number | null;
  Ttk_Box: (p1: interop.PointerConvertible) => (p1: number, p2: number, p3: number, p4: number) => number | null;
  ttk_BoxContains: (p1: number, p2: number, p3: number) => number | null;
  ttk_NewBoxObj: (p1: number) => interop.Pointer | null;
  reserved36: () => void | null;
  reserved37: () => void | null;
  reserved38: () => void | null;
  reserved39: () => void | null;
  ttk_GetOrientFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
}

declare class TkStubs {
  constructor(init?: TkStubs);
  magic: number;
  hooks: interop.Pointer;
  tk_MainLoop: () => void | null;
  tk_3DBorderColor: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tk_3DBorderGC: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => interop.Pointer | null;
  tk_3DHorizontalBevel: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: number, p8: number, p9: number, p10: number, p11: number) => void | null;
  tk_3DVerticalBevel: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: number, p8: number, p9: number) => void | null;
  tk_AddOption: (p1: interop.PointerConvertible, p2: string, p3: string, p4: number) => void | null;
  tk_BindEvent: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible) => void | null;
  tk_CanvasDrawableCoords: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => void | null;
  tk_CanvasEventuallyRedraw: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number) => void | null;
  tk_CanvasGetCoord: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: interop.PointerConvertible) => number | null;
  tk_CanvasGetTextInfo: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tk_CanvasPsBitmap: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: number, p6: number, p7: number) => number | null;
  tk_CanvasPsColor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tk_CanvasPsFont: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tk_CanvasPsPath: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number) => void | null;
  tk_CanvasPsStipple: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => number | null;
  tk_CanvasPsY: (p1: interop.PointerConvertible, p2: number) => number | null;
  tk_CanvasSetStippleOrigin: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tk_CanvasTagsParseProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: string, p5: string, p6: number) => number | null;
  tk_CanvasTagsPrintProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: number, p5: interop.PointerConvertible) => string | null;
  tk_CanvasTkwin: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tk_CanvasWindowCoords: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => void | null;
  tk_ChangeWindowAttributes: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void | null;
  tk_CharBbox: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible) => number | null;
  tk_ClearSelection: (p1: interop.PointerConvertible, p2: number) => void | null;
  tk_ClipboardAppend: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: string) => number | null;
  tk_ClipboardClear: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tk_ConfigureInfo: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: string, p5: string, p6: number) => number | null;
  tk_ConfigureValue: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: string, p5: string, p6: number) => number | null;
  tk_ConfigureWidget: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible, p6: string, p7: number) => number | null;
  tk_ConfigureWindow: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void | null;
  tk_ComputeTextLayout: (p1: interop.PointerConvertible, p2: string, p3: number, p4: number, p5: interop.Enum<typeof Tk_Justify>, p6: number, p7: interop.PointerConvertible, p8: interop.PointerConvertible) => interop.Pointer | null;
  tk_CoordsToWindow: (p1: number, p2: number, p3: interop.PointerConvertible) => interop.Pointer | null;
  tk_CreateBinding: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: string, p5: string, p6: number) => number | null;
  tk_CreateBindingTable: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tk_CreateErrorHandler: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number, p6: interop.PointerConvertible) => interop.Pointer | null;
  tk_CreateEventHandler: (p1: interop.PointerConvertible, p2: number, p3: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, p4: interop.PointerConvertible) => void | null;
  tk_CreateGenericHandler: (p1: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number, p2: interop.PointerConvertible) => void | null;
  tk_CreateImageType: (p1: interop.PointerConvertible) => void | null;
  tk_CreateItemType: (p1: interop.PointerConvertible) => void | null;
  tk_CreatePhotoImageFormat: (p1: interop.PointerConvertible) => void | null;
  tk_CreateSelHandler: (p1: interop.PointerConvertible, p2: number, p3: number, p4: (p1: interop.PointerConvertible, p2: number, p3: string, p4: number) => number, p5: interop.PointerConvertible, p6: number) => void | null;
  tk_CreateWindow: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string) => interop.Pointer | null;
  tk_CreateWindowFromPath: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string) => interop.Pointer | null;
  tk_DefineBitmap: (p1: interop.PointerConvertible, p2: string, p3: string, p4: number, p5: number) => number | null;
  tk_DefineCursor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tk_DeleteAllBindings: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tk_DeleteBinding: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: string) => number | null;
  tk_DeleteBindingTable: (p1: interop.PointerConvertible) => void | null;
  tk_DeleteErrorHandler: (p1: interop.PointerConvertible) => void | null;
  tk_DeleteEventHandler: (p1: interop.PointerConvertible, p2: number, p3: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, p4: interop.PointerConvertible) => void | null;
  tk_DeleteGenericHandler: (p1: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number, p2: interop.PointerConvertible) => void | null;
  tk_DeleteImage: (p1: interop.PointerConvertible, p2: string) => void | null;
  tk_DeleteSelHandler: (p1: interop.PointerConvertible, p2: number, p3: number) => void | null;
  tk_DestroyWindow: (p1: interop.PointerConvertible) => void | null;
  tk_DisplayName: (p1: interop.PointerConvertible) => string | null;
  tk_DistanceToTextLayout: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  tk_Draw3DPolygon: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: number, p7: number) => void | null;
  tk_Draw3DRectangle: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: number, p8: number, p9: number) => void | null;
  tk_DrawChars: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: string, p6: number, p7: number, p8: number) => void | null;
  tk_DrawFocusHighlight: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => void | null;
  tk_DrawTextLayout: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: number, p7: number, p8: number) => void | null;
  tk_Fill3DPolygon: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: number, p7: number) => void | null;
  tk_Fill3DRectangle: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: number, p8: number, p9: number) => void | null;
  tk_FindPhoto: (p1: interop.PointerConvertible, p2: string) => interop.Pointer | null;
  tk_FontId: (p1: interop.PointerConvertible) => number | null;
  tk_Free3DBorder: (p1: interop.PointerConvertible) => void | null;
  tk_FreeBitmap: (p1: interop.PointerConvertible, p2: number) => void | null;
  tk_FreeColor: (p1: interop.PointerConvertible) => void | null;
  tk_FreeColormap: (p1: interop.PointerConvertible, p2: number) => void | null;
  tk_FreeCursor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tk_FreeFont: (p1: interop.PointerConvertible) => void | null;
  tk_FreeGC: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tk_FreeImage: (p1: interop.PointerConvertible) => void | null;
  tk_FreeOptions: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: number) => void | null;
  tk_FreePixmap: (p1: interop.PointerConvertible, p2: number) => void | null;
  tk_FreeTextLayout: (p1: interop.PointerConvertible) => void | null;
  tk_FreeXId: (p1: interop.PointerConvertible, p2: number) => void | null;
  tk_GCForColor: (p1: interop.PointerConvertible, p2: number) => interop.Pointer | null;
  tk_GeometryRequest: (p1: interop.PointerConvertible, p2: number, p3: number) => void | null;
  tk_Get3DBorder: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string) => interop.Pointer | null;
  tk_GetAllBindings: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void | null;
  tk_GetAnchor: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible) => number | null;
  tk_GetAtomName: (p1: interop.PointerConvertible, p2: number) => string | null;
  tk_GetBinding: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: string) => string | null;
  tk_GetBitmap: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string) => number | null;
  tk_GetBitmapFromData: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: number, p5: number) => number | null;
  tk_GetCapStyle: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible) => number | null;
  tk_GetColor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string) => interop.Pointer | null;
  tk_GetColorByValue: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer | null;
  tk_GetColormap: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string) => number | null;
  tk_GetCursor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string) => interop.Pointer | null;
  tk_GetCursorFromData: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string, p5: number, p6: number, p7: number, p8: number, p9: string, p10: string) => interop.Pointer | null;
  tk_GetFont: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string) => interop.Pointer | null;
  tk_GetFontFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer | null;
  tk_GetFontMetrics: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tk_GetGC: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => interop.Pointer | null;
  tk_GetImage: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number) => void, p5: interop.PointerConvertible) => interop.Pointer | null;
  tk_GetImageMasterData: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible) => interop.Pointer | null;
  tk_GetItemTypes: () => interop.Pointer | null;
  tk_GetJoinStyle: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible) => number | null;
  tk_GetJustify: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible) => number | null;
  tk_GetNumMainWindows: () => number | null;
  tk_GetOption: (p1: interop.PointerConvertible, p2: string, p3: string) => string | null;
  tk_GetPixels: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: interop.PointerConvertible) => number | null;
  tk_GetPixmap: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number) => number | null;
  tk_GetRelief: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible) => number | null;
  tk_GetRootCoords: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void | null;
  tk_GetScrollInfo: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number | null;
  tk_GetScreenMM: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: interop.PointerConvertible) => number | null;
  tk_GetSelection: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string) => number, p6: interop.PointerConvertible) => number | null;
  tk_GetUid: (p1: string) => string | null;
  tk_GetVisual: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => interop.Pointer | null;
  tk_GetVRootGeometry: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => void | null;
  tk_Grab: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => number | null;
  tk_HandleEvent: (p1: interop.PointerConvertible) => void | null;
  tk_IdToWindow: (p1: interop.PointerConvertible, p2: number) => interop.Pointer | null;
  tk_ImageChanged: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number) => void | null;
  tk_Init: (p1: interop.PointerConvertible) => number | null;
  tk_InternAtom: (p1: interop.PointerConvertible, p2: string) => number | null;
  tk_IntersectTextLayout: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number) => number | null;
  tk_MaintainGeometry: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: number, p6: number) => void | null;
  tk_MainWindow: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tk_MakeWindowExist: (p1: interop.PointerConvertible) => void | null;
  tk_ManageGeometry: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void | null;
  tk_MapWindow: (p1: interop.PointerConvertible) => void | null;
  tk_MeasureChars: (p1: interop.PointerConvertible, p2: string, p3: number, p4: number, p5: number, p6: interop.PointerConvertible) => number | null;
  tk_MoveResizeWindow: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number) => void | null;
  tk_MoveWindow: (p1: interop.PointerConvertible, p2: number, p3: number) => void | null;
  tk_MoveToplevelWindow: (p1: interop.PointerConvertible, p2: number, p3: number) => void | null;
  tk_NameOf3DBorder: (p1: interop.PointerConvertible) => string | null;
  tk_NameOfAnchor: (p1: interop.Enum<typeof Tk_Anchor>) => string | null;
  tk_NameOfBitmap: (p1: interop.PointerConvertible, p2: number) => string | null;
  tk_NameOfCapStyle: (p1: number) => string | null;
  tk_NameOfColor: (p1: interop.PointerConvertible) => string | null;
  tk_NameOfCursor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => string | null;
  tk_NameOfFont: (p1: interop.PointerConvertible) => string | null;
  tk_NameOfImage: (p1: interop.PointerConvertible) => string | null;
  tk_NameOfJoinStyle: (p1: number) => string | null;
  tk_NameOfJustify: (p1: interop.Enum<typeof Tk_Justify>) => string | null;
  tk_NameOfRelief: (p1: number) => string | null;
  tk_NameToWindow: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible) => interop.Pointer | null;
  tk_OwnSelection: (p1: interop.PointerConvertible, p2: number, p3: (p1: interop.PointerConvertible) => void, p4: interop.PointerConvertible) => void | null;
  tk_ParseArgv: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: number) => number | null;
  tk_PhotoPutBlock_NoComposite: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: number, p6: number) => void | null;
  tk_PhotoPutZoomedBlock_NoComposite: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: number, p6: number, p7: number, p8: number, p9: number, p10: number) => void | null;
  tk_PhotoGetImage: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tk_PhotoBlank: (p1: interop.PointerConvertible) => void | null;
  tk_PhotoExpand_Panic: (p1: interop.PointerConvertible, p2: number, p3: number) => void | null;
  tk_PhotoGetSize: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void | null;
  tk_PhotoSetSize_Panic: (p1: interop.PointerConvertible, p2: number, p3: number) => void | null;
  tk_PointToChar: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  tk_PostscriptFontName: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tk_PreserveColormap: (p1: interop.PointerConvertible, p2: number) => void | null;
  tk_QueueWindowEvent: (p1: interop.PointerConvertible, p2: interop.Enum<typeof Tcl_QueuePosition>) => void | null;
  tk_RedrawImage: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number, p8: number) => void | null;
  tk_ResizeWindow: (p1: interop.PointerConvertible, p2: number, p3: number) => void | null;
  tk_RestackWindow: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  tk_RestrictEvents: (p1: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Enum<typeof Tk_RestrictAction>, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Enum<typeof Tk_RestrictAction> | null;
  tk_SafeInit: (p1: interop.PointerConvertible) => number | null;
  tk_SetAppName: (p1: interop.PointerConvertible, p2: string) => string | null;
  tk_SetBackgroundFromBorder: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tk_SetClass: (p1: interop.PointerConvertible, p2: string) => void | null;
  tk_SetGrid: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number) => void | null;
  tk_SetInternalBorder: (p1: interop.PointerConvertible, p2: number) => void | null;
  tk_SetWindowBackground: (p1: interop.PointerConvertible, p2: number) => void | null;
  tk_SetWindowBackgroundPixmap: (p1: interop.PointerConvertible, p2: number) => void | null;
  tk_SetWindowBorder: (p1: interop.PointerConvertible, p2: number) => void | null;
  tk_SetWindowBorderWidth: (p1: interop.PointerConvertible, p2: number) => void | null;
  tk_SetWindowBorderPixmap: (p1: interop.PointerConvertible, p2: number) => void | null;
  tk_SetWindowColormap: (p1: interop.PointerConvertible, p2: number) => void | null;
  tk_SetWindowVisual: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => number | null;
  tk_SizeOfBitmap: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void | null;
  tk_SizeOfImage: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void | null;
  tk_StrictMotif: (p1: interop.PointerConvertible) => number | null;
  tk_TextLayoutToPostscript: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tk_TextWidth: (p1: interop.PointerConvertible, p2: string, p3: number) => number | null;
  tk_UndefineCursor: (p1: interop.PointerConvertible) => void | null;
  tk_UnderlineChars: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: string, p6: number, p7: number, p8: number, p9: number) => void | null;
  tk_UnderlineTextLayout: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: number, p7: number) => void | null;
  tk_Ungrab: (p1: interop.PointerConvertible) => void | null;
  tk_UnmaintainGeometry: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tk_UnmapWindow: (p1: interop.PointerConvertible) => void | null;
  tk_UnsetGrid: (p1: interop.PointerConvertible) => void | null;
  tk_UpdatePointer: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number) => void | null;
  tk_AllocBitmapFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tk_Alloc3DBorderFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => interop.Pointer | null;
  tk_AllocColorFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => interop.Pointer | null;
  tk_AllocCursorFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => interop.Pointer | null;
  tk_AllocFontFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => interop.Pointer | null;
  tk_CreateOptionTable: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer | null;
  tk_DeleteOptionTable: (p1: interop.PointerConvertible) => void | null;
  tk_Free3DBorderFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tk_FreeBitmapFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tk_FreeColorFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tk_FreeConfigOptions: (p1: string, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void | null;
  tk_FreeSavedOptions: (p1: interop.PointerConvertible) => void | null;
  tk_FreeCursorFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tk_FreeFontFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tk_Get3DBorderFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer | null;
  tk_GetAnchorFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tk_GetBitmapFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tk_GetColorFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer | null;
  tk_GetCursorFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer | null;
  tk_GetOptionInfo: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => interop.Pointer | null;
  tk_GetOptionValue: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => interop.Pointer | null;
  tk_GetJustifyFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tk_GetMMFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  tk_GetPixelsFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  tk_GetReliefFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tk_GetScrollInfoObj: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number | null;
  tk_InitOptions: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  tk_MainEx: (p1: number, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible) => number, p4: interop.PointerConvertible) => void | null;
  tk_RestoreSavedOptions: (p1: interop.PointerConvertible) => void | null;
  tk_SetOptions: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible, p8: interop.PointerConvertible) => number | null;
  tk_InitConsoleChannels: (p1: interop.PointerConvertible) => void | null;
  tk_CreateConsoleWindow: (p1: interop.PointerConvertible) => number | null;
  tk_CreateSmoothMethod: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  reserved218: interop.Pointer;
  reserved219: interop.Pointer;
  tk_GetDash: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible) => number | null;
  tk_CreateOutline: (p1: interop.PointerConvertible) => void | null;
  tk_DeleteOutline: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tk_ConfigOutlineGC: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  tk_ChangeOutlineGC: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tk_ResetOutlineGC: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tk_CanvasPsOutline: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tk_SetTSOrigin: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => void | null;
  tk_CanvasGetCoordFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  tk_CanvasSetOffset: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void | null;
  tk_DitherPhoto: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number) => void | null;
  tk_PostscriptBitmap: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: number, p8: number) => number | null;
  tk_PostscriptColor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tk_PostscriptFont: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tk_PostscriptImage: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: number, p7: number, p8: number, p9: number) => number | null;
  tk_PostscriptPath: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number) => void | null;
  tk_PostscriptStipple: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number) => number | null;
  tk_PostscriptY: (p1: number, p2: interop.PointerConvertible) => number | null;
  tk_PostscriptPhoto: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: number) => number | null;
  tk_CreateClientMessageHandler: (p1: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number) => void | null;
  tk_DeleteClientMessageHandler: (p1: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number) => void | null;
  tk_CreateAnonymousWindow: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string) => interop.Pointer | null;
  tk_SetClassProcs: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void | null;
  tk_SetInternalBorderEx: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number) => void | null;
  tk_SetMinimumRequestSize: (p1: interop.PointerConvertible, p2: number, p3: number) => void | null;
  tk_SetCaretPos: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number) => void | null;
  tk_PhotoPutBlock_Panic: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: number, p6: number, p7: number) => void | null;
  tk_PhotoPutZoomedBlock_Panic: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: number, p6: number, p7: number, p8: number, p9: number, p10: number, p11: number) => void | null;
  tk_CollapseMotionEvents: (p1: interop.PointerConvertible, p2: number) => number | null;
  tk_RegisterStyleEngine: (p1: string, p2: interop.PointerConvertible) => interop.Pointer | null;
  tk_GetStyleEngine: (p1: string) => interop.Pointer | null;
  tk_RegisterStyledElement: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tk_GetElementId: (p1: string) => number | null;
  tk_CreateStyle: (p1: string, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => interop.Pointer | null;
  tk_GetStyle: (p1: interop.PointerConvertible, p2: string) => interop.Pointer | null;
  tk_FreeStyle: (p1: interop.PointerConvertible) => void | null;
  tk_NameOfStyle: (p1: interop.PointerConvertible) => string | null;
  tk_AllocStyleFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer | null;
  tk_GetStyleFromObj: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tk_FreeStyleFromObj: (p1: interop.PointerConvertible) => void | null;
  tk_GetStyledElement: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => interop.Pointer | null;
  tk_GetElementSize: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: interop.PointerConvertible, p5: number, p6: number, p7: number, p8: interop.PointerConvertible, p9: interop.PointerConvertible) => void | null;
  tk_GetElementBox: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: interop.PointerConvertible, p5: number, p6: number, p7: number, p8: number, p9: number, p10: interop.PointerConvertible, p11: interop.PointerConvertible, p12: interop.PointerConvertible, p13: interop.PointerConvertible) => void | null;
  tk_GetElementBorderWidth: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: interop.PointerConvertible) => number | null;
  tk_DrawElement: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: interop.PointerConvertible, p5: number, p6: number, p7: number, p8: number, p9: number, p10: number) => void | null;
  tk_PhotoExpand: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => number | null;
  tk_PhotoPutBlock: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: number, p8: number) => number | null;
  tk_PhotoPutZoomedBlock: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: number, p8: number, p9: number, p10: number, p11: number, p12: number) => number | null;
  tk_PhotoSetSize: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => number | null;
  tk_GetUserInactiveTime: (p1: interop.PointerConvertible) => number | null;
  tk_ResetUserInactiveTime: (p1: interop.PointerConvertible) => void | null;
  tk_Interp: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tk_CreateOldImageType: (p1: interop.PointerConvertible) => void | null;
  tk_CreateOldPhotoImageFormat: (p1: interop.PointerConvertible) => void | null;
}

declare class TkIntStubs {
  constructor(init?: TkIntStubs);
  magic: number;
  hooks: interop.Pointer;
  tkAllocWindow: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => interop.Pointer | null;
  tkBezierPoints: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void | null;
  tkBezierScreenPoints: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => void | null;
  tkBindDeadWindow: (p1: interop.PointerConvertible) => void | null;
  tkBindEventProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tkBindFree: (p1: interop.PointerConvertible) => void | null;
  tkBindInit: (p1: interop.PointerConvertible) => void | null;
  tkChangeEventWindow: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tkClipInit: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tkComputeAnchor: (p1: interop.Enum<typeof Tk_Anchor>, p2: interop.PointerConvertible, p3: number, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: interop.PointerConvertible) => void | null;
  tkCopyAndGlobalEval: (p1: interop.PointerConvertible, p2: string) => number | null;
  tkCreateBindingProcedure: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: string, p5: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number) => number, p6: (p1: interop.PointerConvertible) => void, p7: interop.PointerConvertible) => number | null;
  tkCreateCursorFromData: (p1: interop.PointerConvertible, p2: string, p3: string, p4: number, p5: number, p6: number, p7: number, p8: XColor, p9: XColor) => interop.Pointer | null;
  tkCreateFrame: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible, p5: number, p6: string) => number | null;
  tkCreateMainWindow: (p1: interop.PointerConvertible, p2: string, p3: string) => interop.Pointer | null;
  tkCurrentTime: (p1: interop.PointerConvertible) => number | null;
  tkDeleteAllImages: (p1: interop.PointerConvertible) => void | null;
  tkDoConfigureNotify: (p1: interop.PointerConvertible) => void | null;
  tkDrawInsetFocusHighlight: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: number) => void | null;
  tkEventDeadWindow: (p1: interop.PointerConvertible) => void | null;
  tkFillPolygon: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible, p5: number, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => void | null;
  tkFindStateNum: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: string) => number | null;
  tkFindStateString: (p1: interop.PointerConvertible, p2: number) => string | null;
  tkFocusDeadWindow: (p1: interop.PointerConvertible) => void | null;
  tkFocusFilterEvent: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tkFocusKeyEvent: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer | null;
  tkFontPkgInit: (p1: interop.PointerConvertible) => void | null;
  tkFontPkgFree: (p1: interop.PointerConvertible) => void | null;
  tkFreeBindingTags: (p1: interop.PointerConvertible) => void | null;
  tkpFreeCursor: (p1: interop.PointerConvertible) => void | null;
  tkGetBitmapData: (p1: interop.PointerConvertible, p2: string, p3: string, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => string | null;
  tkGetButtPoints: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible) => void | null;
  tkGetCursorByName: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string) => interop.Pointer | null;
  tkGetDefaultScreenName: (p1: interop.PointerConvertible, p2: string) => string | null;
  tkGetDisplay: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tkGetDisplayOf: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  tkGetFocusWin: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tkGetInterpNames: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tkGetMiterPoints: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible) => number | null;
  tkGetPointerCoords: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void | null;
  tkGetServerInfo: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tkGrabDeadWindow: (p1: interop.PointerConvertible) => void | null;
  tkGrabState: (p1: interop.PointerConvertible) => number | null;
  tkIncludePoint: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tkInOutEvents: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.Enum<typeof Tcl_QueuePosition>) => void | null;
  tkInstallFrameMenu: (p1: interop.PointerConvertible) => void | null;
  tkKeysymToString: (p1: number) => string | null;
  tkLineToArea: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tkLineToPoint: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tkMakeBezierCurve: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible) => number | null;
  tkMakeBezierPostscript: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number) => void | null;
  tkOptionClassChanged: (p1: interop.PointerConvertible) => void | null;
  tkOptionDeadWindow: (p1: interop.PointerConvertible) => void | null;
  tkOvalToArea: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tkOvalToPoint: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible) => number | null;
  tkpChangeFocus: (p1: interop.PointerConvertible, p2: number) => number | null;
  tkpCloseDisplay: (p1: interop.PointerConvertible) => void | null;
  tkpClaimFocus: (p1: interop.PointerConvertible, p2: number) => void | null;
  tkpDisplayWarning: (p1: string, p2: string) => void | null;
  tkpGetAppName: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tkpGetOtherWindow: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tkpGetWrapperWindow: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tkpInit: (p1: interop.PointerConvertible) => number | null;
  tkpInitializeMenuBindings: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tkpMakeContainer: (p1: interop.PointerConvertible) => void | null;
  tkpMakeMenuWindow: (p1: interop.PointerConvertible, p2: number) => void | null;
  tkpMakeWindow: (p1: interop.PointerConvertible, p2: number) => number | null;
  tkpMenuNotifyToplevelCreate: (p1: interop.PointerConvertible, p2: string) => void | null;
  tkpOpenDisplay: (p1: string) => interop.Pointer | null;
  tkPointerEvent: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tkPolygonToArea: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  tkPolygonToPoint: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  tkPositionInTree: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tkpRedirectKeyEvent: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tkpSetMainMenubar: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string) => void | null;
  tkpUseWindow: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string) => number | null;
  tkpWindowWasRecentlyDeleted: (p1: number, p2: interop.PointerConvertible) => number | null;
  tkQueueEventForAllChildren: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tkReadBitmapFile: (p1: interop.PointerConvertible, p2: number, p3: string, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible, p8: interop.PointerConvertible) => number | null;
  tkScrollWindow: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: number, p6: number, p7: number, p8: number, p9: interop.PointerConvertible) => number | null;
  tkSelDeadWindow: (p1: interop.PointerConvertible) => void | null;
  tkSelEventProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tkSelInit: (p1: interop.PointerConvertible) => void | null;
  tkSelPropProc: (p1: interop.PointerConvertible) => void | null;
  reserved84: interop.Pointer;
  tkSetWindowMenuBar: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string) => void | null;
  tkStringToKeysym: (p1: string) => number | null;
  tkThickPolyLineToArea: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number, p6: interop.PointerConvertible) => number | null;
  tkWmAddToColormapWindows: (p1: interop.PointerConvertible) => void | null;
  tkWmDeadWindow: (p1: interop.PointerConvertible) => void | null;
  tkWmFocusToplevel: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tkWmMapWindow: (p1: interop.PointerConvertible) => void | null;
  tkWmNewWindow: (p1: interop.PointerConvertible) => void | null;
  tkWmProtocolEventProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tkWmRemoveFromColormapWindows: (p1: interop.PointerConvertible) => void | null;
  tkWmRestackToplevel: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void | null;
  tkWmSetClass: (p1: interop.PointerConvertible) => void | null;
  tkWmUnmapWindow: (p1: interop.PointerConvertible) => void | null;
  tkDebugBitmap: (p1: interop.PointerConvertible, p2: string) => interop.Pointer | null;
  tkDebugBorder: (p1: interop.PointerConvertible, p2: string) => interop.Pointer | null;
  tkDebugCursor: (p1: interop.PointerConvertible, p2: string) => interop.Pointer | null;
  tkDebugColor: (p1: interop.PointerConvertible, p2: string) => interop.Pointer | null;
  tkDebugConfig: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer | null;
  tkDebugFont: (p1: interop.PointerConvertible, p2: string) => interop.Pointer | null;
  tkFindStateNumObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  tkGetBitmapPredefTable: () => interop.Pointer | null;
  tkGetDisplayList: () => interop.Pointer | null;
  tkGetMainInfoList: () => interop.Pointer | null;
  tkGetWindowFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  tkpGetString: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => string | null;
  tkpGetSubFonts: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tkpGetSystemDefault: (p1: interop.PointerConvertible, p2: string, p3: string) => interop.Pointer | null;
  tkpMenuThreadInit: () => void | null;
  reserved113: interop.Pointer;
  reserved114: interop.Pointer;
  reserved115: interop.Pointer;
  reserved116: interop.Pointer;
  reserved117: interop.Pointer;
  reserved118: interop.Pointer;
  reserved119: interop.Pointer;
  reserved120: interop.Pointer;
  reserved121: interop.Pointer;
  reserved122: interop.Pointer;
  reserved123: interop.Pointer;
  reserved124: interop.Pointer;
  reserved125: interop.Pointer;
  reserved126: interop.Pointer;
  reserved127: interop.Pointer;
  reserved128: interop.Pointer;
  reserved129: interop.Pointer;
  reserved130: interop.Pointer;
  reserved131: interop.Pointer;
  reserved132: interop.Pointer;
  reserved133: interop.Pointer;
  reserved134: interop.Pointer;
  tkpDrawHighlightBorder: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: number) => void | null;
  tkSetFocusWin: (p1: interop.PointerConvertible, p2: number) => void | null;
  tkpSetKeycodeAndState: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void | null;
  tkpGetKeySym: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tkpInitKeymapInfo: (p1: interop.PointerConvertible) => void | null;
  tkPhotoGetValidRegion: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tkWmStackorderToplevel: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tkFocusFree: (p1: interop.PointerConvertible) => void | null;
  tkClipCleanup: (p1: interop.PointerConvertible) => void | null;
  tkGCCleanup: (p1: interop.PointerConvertible) => void | null;
  reserved145: interop.Pointer;
  tkStylePkgInit: (p1: interop.PointerConvertible) => void | null;
  tkStylePkgFree: (p1: interop.PointerConvertible) => void | null;
  tkToplevelWindowForCommand: (p1: interop.PointerConvertible, p2: string) => interop.Pointer | null;
  tkGetOptionSpec: (p1: string, p2: interop.PointerConvertible) => interop.Pointer | null;
  tkMakeRawCurve: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible) => number | null;
  tkMakeRawCurvePostscript: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number) => void | null;
  tkpDrawFrame: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: number) => void | null;
  tkCreateThreadExitHandler: (p1: (p1: interop.PointerConvertible) => void, p2: interop.PointerConvertible) => void | null;
  tkDeleteThreadExitHandler: (p1: (p1: interop.PointerConvertible) => void, p2: interop.PointerConvertible) => void | null;
  reserved155: interop.Pointer;
  tkpTestembedCmd: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number | null;
  tkpTesttextCmd: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number | null;
  reserved158: interop.Pointer;
  reserved159: interop.Pointer;
  reserved160: interop.Pointer;
  reserved161: interop.Pointer;
  reserved162: interop.Pointer;
  reserved163: interop.Pointer;
  reserved164: interop.Pointer;
  reserved165: interop.Pointer;
  reserved166: interop.Pointer;
  reserved167: interop.Pointer;
  reserved168: interop.Pointer;
  tkStateParseProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: string, p5: string, p6: number) => number | null;
  tkStatePrintProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: number, p5: interop.PointerConvertible) => string | null;
  tkCanvasDashParseProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: string, p5: string, p6: number) => number | null;
  tkCanvasDashPrintProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: number, p5: interop.PointerConvertible) => string | null;
  tkOffsetParseProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: string, p5: string, p6: number) => number | null;
  tkOffsetPrintProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: number, p5: interop.PointerConvertible) => string | null;
  tkPixelParseProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: string, p5: string, p6: number) => number | null;
  tkPixelPrintProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: number, p5: interop.PointerConvertible) => string | null;
  tkOrientParseProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: string, p5: string, p6: number) => number | null;
  tkOrientPrintProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: number, p5: interop.PointerConvertible) => string | null;
  tkSmoothParseProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: string, p5: string, p6: number) => number | null;
  tkSmoothPrintProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: number, p5: interop.PointerConvertible) => string | null;
}

declare class Tk_ElementOptionSpec {
  constructor(init?: Tk_ElementOptionSpec);
  name: string | null;
  type: interop.Enum<typeof Tk_OptionType>;
}

declare class Tk_ImageType {
  constructor(init?: Tk_ImageType);
  name: string | null;
  createProc: (p1: interop.PointerConvertible, p2: string, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  getProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer | null;
  displayProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: number, p6: number, p7: number, p8: number, p9: number) => void | null;
  freeProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  deleteProc: (p1: interop.PointerConvertible) => void | null;
  postscriptProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: number, p7: number, p8: number, p9: number) => number | null;
  nextPtr: interop.Pointer;
  reserved: string | null;
}

declare class Tk_ItemType {
  constructor(init?: Tk_ItemType);
  name: string | null;
  itemSize: number;
  createProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible) => number | null;
  configSpecs: interop.Pointer;
  configProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible, p6: number) => number | null;
  coordProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible) => number | null;
  deleteProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void | null;
  displayProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: number, p8: number) => void | null;
  alwaysRedraw: number;
  pointProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  areaProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  postscriptProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number) => number | null;
  scaleProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: number, p6: number) => void | null;
  translateProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => void | null;
  indexProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: string, p5: interop.PointerConvertible) => number | null;
  icursorProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => void | null;
  selectionProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: string, p5: number) => number | null;
  insertProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: string) => void | null;
  dCharsProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => void | null;
  nextPtr: interop.Pointer;
  reserved1: string | null;
  reserved2: number;
  reserved3: string | null;
  reserved4: string | null;
}

declare class XVirtualEvent {
  constructor(init?: XVirtualEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  event: number;
  root: number;
  subwindow: number;
  time: number;
  x: number;
  y: number;
  x_root: number;
  y_root: number;
  state: number;
  name: string | null;
  same_screen: number;
  user_data: interop.Pointer;
}

declare class Tk_ClassProcs {
  constructor(init?: Tk_ClassProcs);
  size: number;
  worldChangedProc: (p1: interop.PointerConvertible) => void | null;
  createProc: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  modalProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
}

declare class Tk_FontMetrics {
  constructor(init?: Tk_FontMetrics);
  ascent: number;
  descent: number;
  linespace: number;
}

declare class TkOption {
  constructor(init?: TkOption);
}

declare class Tk_SavedOption {
  constructor(init?: Tk_SavedOption);
  optionPtr: interop.Pointer;
  valuePtr: interop.Pointer;
  internalForm: number;
}

declare class Tk_OptionSpec {
  constructor(init?: Tk_OptionSpec);
  type: interop.Enum<typeof Tk_OptionType>;
  optionName: string | null;
  dbName: string | null;
  dbClass: string | null;
  defValue: string | null;
  objOffset: number;
  internalOffset: number;
  flags: number;
  clientData: interop.Pointer;
  typeMask: number;
}

declare class Tk_StyleEngine_ {
  constructor(init?: Tk_StyleEngine_);
}

declare class Tk_Style_ {
  constructor(init?: Tk_Style_);
}

declare class Tk_Window_ {
  constructor(init?: Tk_Window_);
}

declare class Tk_OptionTable_ {
  constructor(init?: Tk_OptionTable_);
}

declare class Tk_Cursor_ {
  constructor(init?: Tk_Cursor_);
}

declare class Tk_Canvas_ {
  constructor(init?: Tk_Canvas_);
}

declare class Tk_BindingTable_ {
  constructor(init?: Tk_BindingTable_);
}

declare class _XIMStatusDrawCallbackStruct {
  constructor(init?: _XIMStatusDrawCallbackStruct);
  type: interop.Enum<typeof XIMStatusDataType>;
  data: unnamed_14461178624373966829;
}

declare class _XIMPreeditDrawCallbackStruct {
  constructor(init?: _XIMPreeditDrawCallbackStruct);
  caret: number;
  chg_first: number;
  chg_length: number;
  text: interop.Pointer;
}

declare class XIMStyles {
  constructor(init?: XIMStyles);
  count_styles: number;
  supported_styles: interop.Pointer;
}

declare class XwcTextItem {
  constructor(init?: XwcTextItem);
  chars: interop.Pointer;
  nchars: number;
  delta: number;
  font_set: interop.Pointer;
}

declare class XmbTextItem {
  constructor(init?: XmbTextItem);
  chars: string | null;
  nchars: number;
  delta: number;
  font_set: interop.Pointer;
}

declare class _XFontSet {
  constructor(init?: _XFontSet);
}

declare class XFontSetExtents {
  constructor(init?: XFontSetExtents);
  max_ink_extent: XRectangle;
  max_logical_extent: XRectangle;
}

declare class XTextItem16 {
  constructor(init?: XTextItem16);
  chars: interop.Pointer;
  nchars: number;
  delta: number;
  font: number;
}

declare class XCharStruct {
  constructor(init?: XCharStruct);
  lbearing: number;
  rbearing: number;
  width: number;
  ascent: number;
  descent: number;
  attributes: number;
}

declare class XClientMessageEvent {
  constructor(init?: XClientMessageEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  window: number;
  message_type: number;
  format: number;
  data: unnamed_13200893692902755379;
}

declare class XSelectionEvent {
  constructor(init?: XSelectionEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  requestor: number;
  selection: number;
  target: number;
  property: number;
  time: number;
}

declare class XSelectionRequestEvent {
  constructor(init?: XSelectionRequestEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  owner: number;
  requestor: number;
  selection: number;
  target: number;
  property: number;
  time: number;
}

declare class XMapRequestEvent {
  constructor(init?: XMapRequestEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  parent: number;
  window: number;
}

declare class XNoExposeEvent {
  constructor(init?: XNoExposeEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  drawable: number;
  major_code: number;
  minor_code: number;
}

declare class XGraphicsExposeEvent {
  constructor(init?: XGraphicsExposeEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  drawable: number;
  x: number;
  y: number;
  width: number;
  height: number;
  count: number;
  major_code: number;
  minor_code: number;
}

declare class XKeymapEvent {
  constructor(init?: XKeymapEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  window: number;
  key_vector: unknown /* const array */;
}

declare class XFocusChangeEvent {
  constructor(init?: XFocusChangeEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  window: number;
  mode: number;
  detail: number;
}

declare class XMotionEvent {
  constructor(init?: XMotionEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  window: number;
  root: number;
  subwindow: number;
  time: number;
  x: number;
  y: number;
  x_root: number;
  y_root: number;
  state: number;
  is_hint: number;
  same_screen: number;
}

declare class XButtonEvent {
  constructor(init?: XButtonEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  window: number;
  root: number;
  subwindow: number;
  time: number;
  x: number;
  y: number;
  x_root: number;
  y_root: number;
  state: number;
  button: number;
  same_screen: number;
}

declare class _XIMFilter {
  constructor(init?: _XIMFilter);
}

declare class _XKeytrans {
  constructor(init?: _XKeytrans);
}

declare class _XLockInfo {
  constructor(init?: _XLockInfo);
}

declare class _XrmHashBucketRec {
  constructor(init?: _XrmHashBucketRec);
}

declare class XHostAddress {
  constructor(init?: XHostAddress);
  family: number;
  length: number;
  address: string | null;
}

declare class XSetWindowAttributes {
  constructor(init?: XSetWindowAttributes);
  background_pixmap: number;
  background_pixel: number;
  border_pixmap: number;
  border_pixel: number;
  bit_gravity: number;
  win_gravity: number;
  backing_store: number;
  backing_planes: number;
  backing_pixel: number;
  save_under: number;
  event_mask: number;
  do_not_propagate_mask: number;
  override_redirect: number;
  colormap: number;
  cursor: number;
}

declare class ScreenFormat {
  constructor(init?: ScreenFormat);
  ext_data: interop.Pointer;
  depth: number;
  bits_per_pixel: number;
  scanline_pad: number;
}

declare class _XDisplay {
  constructor(init?: _XDisplay);
  ext_data: interop.Pointer;
  free_funcs: interop.Pointer;
  fd: number;
  conn_checker: number;
  proto_major_version: number;
  proto_minor_version: number;
  vendor: string | null;
  resource_base: number;
  resource_mask: number;
  resource_id: number;
  resource_shift: number;
  resource_alloc: () => number | null;
  byte_order: number;
  bitmap_unit: number;
  bitmap_pad: number;
  bitmap_bit_order: number;
  nformats: number;
  pixmap_format: interop.Pointer;
  vnumber: number;
  release: number;
  head: interop.Pointer;
  tail: interop.Pointer;
  qlen: number;
  request: number;
  last_req: string | null;
  buffer: string | null;
  bufptr: string | null;
  bufmax: string | null;
  max_request_size: number;
  db: interop.Pointer;
  synchandler: () => number | null;
  display_name: string | null;
  default_screen: number;
  nscreens: number;
  screens: interop.Pointer;
  motion_buffer: number;
  flags: number;
  min_keycode: number;
  max_keycode: number;
  keysyms: interop.Pointer;
  modifiermap: interop.Pointer;
  keysyms_per_keycode: number;
  xdefaults: string | null;
  scratch_buffer: string | null;
  scratch_length: number;
  ext_number: number;
  ext_procs: interop.Pointer;
  event_vec: unknown /* const array */;
  wire_vec: unknown /* const array */;
  lock_meaning: number;
  lock: interop.Pointer;
  async_handlers: interop.Pointer;
  bigreq_size: number;
  lock_fns: interop.Pointer;
  key_bindings: interop.Pointer;
  cursor_font: number;
  atoms: interop.Pointer;
  mode_switch: number;
  context_db: interop.Pointer;
  error_vec: interop.Pointer;
  cms: unnamed_16538877205104190706;
  im_filters: interop.Pointer;
  qfree: interop.Pointer;
  next_event_serial_num: number;
  savedsynchandler: () => number | null;
}

declare class _XExtData {
  constructor(init?: _XExtData);
  number: number;
  next: interop.Pointer;
  free_private: () => number | null;
  private_data: string | null;
}

declare class unnamed_14383236484837822929 {
  constructor(init?: unnamed_14383236484837822929);
  colormap: number;
  red_max: number;
  red_mult: number;
  green_max: number;
  green_mult: number;
  blue_max: number;
  blue_mult: number;
  base_pixel: number;
  visualid: number;
  killid: number;
}

declare class XClassHint {
  constructor(init?: XClassHint);
  res_name: string | null;
  res_class: string | null;
}

declare class unnamed_17485495249698911356 {
  constructor(init?: unnamed_17485495249698911356);
  value: interop.Pointer;
  encoding: number;
  format: number;
  nitems: number;
}

declare class unnamed_1739132022643102539 {
  constructor(init?: unnamed_1739132022643102539);
  flags: number;
  input: number;
  initial_state: number;
  icon_pixmap: number;
  icon_window: number;
  icon_x: number;
  icon_y: number;
  icon_mask: number;
  window_group: number;
}

declare class XSizeHints {
  constructor(init?: XSizeHints);
  flags: number;
  x: number;
  y: number;
  width: number;
  height: number;
  min_width: number;
  min_height: number;
  max_width: number;
  max_height: number;
  width_inc: number;
  height_inc: number;
  min_aspect: unnamed_16478190308515574018;
  max_aspect: unnamed_16478190308515574018;
  base_width: number;
  base_height: number;
  win_gravity: number;
}

declare class XExtCodes {
  constructor(init?: XExtCodes);
  extension: number;
  major_opcode: number;
  first_event: number;
  first_error: number;
}

declare class Tk_TSOffset {
  constructor(init?: Tk_TSOffset);
  flags: number;
  xoffset: number;
  yoffset: number;
}

declare class XExposeEvent {
  constructor(init?: XExposeEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  window: number;
  x: number;
  y: number;
  width: number;
  height: number;
  count: number;
}

declare class XResizeRequestEvent {
  constructor(init?: XResizeRequestEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  window: number;
  width: number;
  height: number;
}

declare class XKeyboardControl {
  constructor(init?: XKeyboardControl);
  key_click_percent: number;
  bell_percent: number;
  bell_pitch: number;
  bell_duration: number;
  led: number;
  led_mode: number;
  key: number;
  auto_repeat_mode: number;
}

declare class XChar2b {
  constructor(init?: XChar2b);
  byte1: number;
  byte2: number;
}

declare class XCirculateRequestEvent {
  constructor(init?: XCirculateRequestEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  parent: number;
  window: number;
  place: number;
}

declare class XMappingEvent {
  constructor(init?: XMappingEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  window: number;
  request: number;
  first_keycode: number;
  count: number;
}

declare class Ttk_Padding {
  constructor(init?: Ttk_Padding);
  left: number;
  top: number;
  right: number;
  bottom: number;
}

declare class XActivateDeactivateEvent {
  constructor(init?: XActivateDeactivateEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  window: number;
}

declare class Screen {
  constructor(init?: Screen);
  ext_data: interop.Pointer;
  display: interop.Pointer;
  root: number;
  width: number;
  height: number;
  mwidth: number;
  mheight: number;
  ndepths: number;
  depths: interop.Pointer;
  root_depth: number;
  root_visual: interop.Pointer;
  default_gc: interop.Pointer;
  cmap: number;
  white_pixel: number;
  black_pixel: number;
  max_maps: number;
  min_maps: number;
  backing_store: number;
  save_unders: number;
  root_input_mask: number;
}

declare class TkpClipMask {
  constructor(init?: TkpClipMask);
  type: number;
  value: unnamed_466373221483677888;
}

declare class XPoint {
  constructor(init?: XPoint);
  x: number;
  y: number;
}

declare class XModifierKeymap {
  constructor(init?: XModifierKeymap);
  max_keypermod: number;
  modifiermap: interop.Pointer;
}

declare class Tk_ArgvInfo {
  constructor(init?: Tk_ArgvInfo);
  key: string | null;
  type: number;
  src: string | null;
  dst: string | null;
  help: string | null;
}

declare class Tk_ObjCustomOption {
  constructor(init?: Tk_ObjCustomOption);
  name: string | null;
  setProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: string, p6: number, p7: string, p8: number) => number | null;
  getProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: number) => interop.Pointer | null;
  restoreProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string) => void | null;
  freeProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string) => void | null;
  clientData: interop.Pointer;
}

declare class XSelectionClearEvent {
  constructor(init?: XSelectionClearEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  window: number;
  selection: number;
  time: number;
}

declare class Tk_3DBorder_ {
  constructor(init?: Tk_3DBorder_);
}

declare class XRectangle {
  constructor(init?: XRectangle);
  x: number;
  y: number;
  width: number;
  height: number;
}

declare class XConfigureEvent {
  constructor(init?: XConfigureEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  event: number;
  window: number;
  x: number;
  y: number;
  width: number;
  height: number;
  border_width: number;
  above: number;
  override_redirect: number;
}

declare class Tk_TextLayout_ {
  constructor(init?: Tk_TextLayout_);
}

declare class Tk_PhotoImageBlock {
  constructor(init?: Tk_PhotoImageBlock);
  pixelPtr: interop.Pointer;
  width: number;
  height: number;
  pitch: number;
  pixelSize: number;
  offset: unknown /* const array */;
}

declare class Tk_SavedOptions {
  constructor(init?: Tk_SavedOptions);
  recordPtr: string | null;
  tkwin: interop.Pointer;
  numItems: number;
  items: unknown /* const array */;
  nextPtr: interop.Pointer;
}

declare class TkFontInfo {
  constructor(init?: TkFontInfo);
}

declare class Ttk_ResourceCache_ {
  constructor(init?: Ttk_ResourceCache_);
}

declare class XColormapEvent {
  constructor(init?: XColormapEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  window: number;
  colormap: number;
  new: number;
  state: number;
}

declare class XAnyEvent {
  constructor(init?: XAnyEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  window: number;
}

declare class TkToplevelFocusInfo {
  constructor(init?: TkToplevelFocusInfo);
}

declare class TtkEnsemble {
  constructor(init?: TtkEnsemble);
  name: string | null;
  command: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number | null;
  ensemble: interop.Pointer;
}

declare class Tk_Dash {
  constructor(init?: Tk_Dash);
  number: number;
  pattern: unnamed_5647942776478080617;
}

declare class XVisibilityEvent {
  constructor(init?: XVisibilityEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  window: number;
  state: number;
}

declare class XKeyboardState {
  constructor(init?: XKeyboardState);
  key_click_percent: number;
  bell_percent: number;
  bell_pitch: number;
  bell_duration: number;
  led_mask: number;
  global_auto_repeat: number;
  auto_repeats: unknown /* const array */;
}

declare class Ttk_StateTable {
  constructor(init?: Ttk_StateTable);
  index: number;
  onBits: number;
  offBits: number;
}

declare class Depth {
  constructor(init?: Depth);
  depth: number;
  nvisuals: number;
  visuals: interop.Pointer;
}

declare class XIconSize {
  constructor(init?: XIconSize);
  min_width: number;
  min_height: number;
  max_width: number;
  max_height: number;
  width_inc: number;
  height_inc: number;
}

declare class Tk_GeomMgr {
  constructor(init?: Tk_GeomMgr);
  name: string | null;
  requestProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  lostSlaveProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
}

declare class XKeyEvent {
  constructor(init?: XKeyEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  window: number;
  root: number;
  subwindow: number;
  time: number;
  x: number;
  y: number;
  x_root: number;
  y_root: number;
  state: number;
  keycode: number;
  same_screen: number;
  trans_chars: unknown /* const array */;
  nbytes: number;
}

declare class _XRegion {
  constructor(init?: _XRegion);
}

declare class TkGrabEvent {
  constructor(init?: TkGrabEvent);
}

declare class TkEventHandler {
  constructor(init?: TkEventHandler);
  mask: number;
  proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  clientData: interop.Pointer;
  nextPtr: interop.Pointer;
}

declare class _XInternalAsync {
  constructor(init?: _XInternalAsync);
}

declare class Ttk_LayoutNode_ {
  constructor(init?: Ttk_LayoutNode_);
}

declare class Tk_PhotoImageFormat {
  constructor(init?: Tk_PhotoImageFormat);
  name: string | null;
  fileMatchProc: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible) => number | null;
  stringMatchProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number | null;
  fileReadProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: number, p7: number, p8: number, p9: number, p10: number, p11: number) => number | null;
  stringReadProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: number, p7: number, p8: number, p9: number, p10: number) => number | null;
  fileWriteProc: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  stringWriteProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  nextPtr: interop.Pointer;
}

declare class TkpGCCache {
  constructor(init?: TkpGCCache);
  cachedForeground: number;
  cachedForegroundColor: interop.Object | null;
  cachedBackground: number;
  cachedBackgroundColor: interop.Object | null;
}

declare class _XIMPreeditCaretCallbackStruct {
  constructor(init?: _XIMPreeditCaretCallbackStruct);
  position: number;
  direction: interop.Enum<typeof XIMCaretDirection>;
  style: interop.Enum<typeof XIMCaretStyle>;
}

declare class Tk_ConfigSpec {
  constructor(init?: Tk_ConfigSpec);
  type: number;
  argvName: string | null;
  dbName: string | null;
  dbClass: string | null;
  defValue: string | null;
  offset: number;
  specFlags: number;
  customPtr: interop.Pointer;
}

declare class _XExten {
  constructor(init?: _XExten);
}

declare class XCreateWindowEvent {
  constructor(init?: XCreateWindowEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  parent: number;
  window: number;
  x: number;
  y: number;
  width: number;
  height: number;
  border_width: number;
  override_redirect: number;
}

declare class _XContextDB {
  constructor(init?: _XContextDB);
}

declare class _XIC {
  constructor(init?: _XIC);
}

declare class TkCaret {
  constructor(init?: TkCaret);
  winPtr: interop.Pointer;
  x: number;
  y: number;
  height: number;
}

declare class TkStressedCmap {
  constructor(init?: TkStressedCmap);
}

declare class Ttk_Theme_ {
  constructor(init?: Ttk_Theme_);
}

declare class XGCValues {
  constructor(init?: XGCValues);
  function: number;
  plane_mask: number;
  foreground: number;
  background: number;
  line_width: number;
  line_style: number;
  cap_style: number;
  join_style: number;
  fill_style: number;
  fill_rule: number;
  arc_mode: number;
  tile: number;
  stipple: number;
  ts_x_origin: number;
  ts_y_origin: number;
  font: number;
  subwindow_mode: number;
  graphics_exposures: number;
  clip_x_origin: number;
  clip_y_origin: number;
  clip_mask: number;
  dash_offset: number;
  dashes: number;
}

declare class Tk_ErrorHandler_ {
  constructor(init?: Tk_ErrorHandler_);
}

declare class Visual {
  constructor(init?: Visual);
  ext_data: interop.Pointer;
  visualid: number;
  class: number;
  red_mask: number;
  green_mask: number;
  blue_mask: number;
  bits_per_rgb: number;
  map_entries: number;
}

declare class XGravityEvent {
  constructor(init?: XGravityEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  event: number;
  window: number;
  x: number;
  y: number;
}

declare class XCrossingEvent {
  constructor(init?: XCrossingEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  window: number;
  root: number;
  subwindow: number;
  time: number;
  x: number;
  y: number;
  x_root: number;
  y_root: number;
  mode: number;
  detail: number;
  same_screen: number;
  focus: number;
  state: number;
}

declare class unnamed_16478190308515574018 {
  constructor(init?: unnamed_16478190308515574018);
  x: number;
  y: number;
}

declare class TtkStubHooks {
  constructor(init?: TtkStubHooks);
}

declare class XMapEvent {
  constructor(init?: XMapEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  event: number;
  window: number;
  override_redirect: number;
}

declare class Tk_Image__ {
  constructor(init?: Tk_Image__);
}

declare class TkpCursor_ {
  constructor(init?: TkpCursor_);
}

declare class Tk_ElementSpec {
  constructor(init?: Tk_ElementSpec);
  version: number;
  name: string | null;
  options: interop.Pointer;
  getSize: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: number, p7: number, p8: interop.PointerConvertible, p9: interop.PointerConvertible) => void | null;
  getBox: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: number, p7: number, p8: number, p9: number, p10: interop.PointerConvertible, p11: interop.PointerConvertible, p12: interop.PointerConvertible, p13: interop.PointerConvertible) => void | null;
  getBorderWidth: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  draw: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: number, p7: number, p8: number, p9: number, p10: number) => void | null;
}

declare class Tk_Font_ {
  constructor(init?: Tk_Font_);
}

declare class XDestroyWindowEvent {
  constructor(init?: XDestroyWindowEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  event: number;
  window: number;
}

declare class XSegment {
  constructor(init?: XSegment);
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

declare class XPixmapFormatValues {
  constructor(init?: XPixmapFormatValues);
  depth: number;
  bits_per_pixel: number;
  scanline_pad: number;
}

declare class XColor {
  constructor(init?: XColor);
  pixel: number;
  red: number;
  green: number;
  blue: number;
  flags: number;
  pad: number;
}

declare class Tk_SmoothMethod {
  constructor(init?: Tk_SmoothMethod);
  name: string | null;
  coordProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible) => number | null;
  postscriptProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: number) => void | null;
}

declare class Tk_CustomOption {
  constructor(init?: Tk_CustomOption);
  parseProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: string, p5: string, p6: number) => number | null;
  printProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: number, p5: interop.PointerConvertible) => string | null;
  clientData: interop.Pointer;
}

declare class Tk_PostscriptInfo_ {
  constructor(init?: Tk_PostscriptInfo_);
}

declare class XFontProp {
  constructor(init?: XFontProp);
  name: number;
  card32: number;
}

declare class XUnmapEvent {
  constructor(init?: XUnmapEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  event: number;
  window: number;
  from_configure: number;
}

declare class unnamed_16538877205104190706 {
  constructor(init?: unnamed_16538877205104190706);
  defaultCCCs: string | null;
  clientCmaps: string | null;
  perVisualIntensityMaps: string | null;
}

declare class XTimeCoord {
  constructor(init?: XTimeCoord);
  time: number;
  x: number;
  y: number;
}

declare class XConfigureRequestEvent {
  constructor(init?: XConfigureRequestEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  parent: number;
  window: number;
  x: number;
  y: number;
  width: number;
  height: number;
  border_width: number;
  above: number;
  detail: number;
  value_mask: number;
}

declare class funcs {
  constructor(init?: funcs);
  create_image: () => interop.Pointer | null;
  destroy_image: (p1: interop.PointerConvertible) => number | null;
  get_pixel: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  put_pixel: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number) => number | null;
  sub_image: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number) => interop.Pointer | null;
  add_pixel: (p1: interop.PointerConvertible, p2: number) => number | null;
}

declare class Tk_Item {
  constructor(init?: Tk_Item);
  id: number;
  nextPtr: interop.Pointer;
  staticTagSpace: unknown /* const array */;
  tagPtr: interop.Pointer;
  tagSpace: number;
  numTags: number;
  typePtr: interop.Pointer;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  prevPtr: interop.Pointer;
  state: interop.Enum<typeof Tk_State>;
  reserved1: string | null;
  redraw_flags: number;
}

declare class TkXLFDAttributes {
  constructor(init?: TkXLFDAttributes);
  foundry: string | null;
  slant: number;
  setwidth: number;
  charset: string | null;
}

declare class TkStubHooks {
  constructor(init?: TkStubHooks);
  tkPlatStubs: interop.Pointer;
  tkIntStubs: interop.Pointer;
  tkIntPlatStubs: interop.Pointer;
  tkIntXlibStubs: interop.Pointer;
}

declare class Tk_FakeWin {
  constructor(init?: Tk_FakeWin);
  display: interop.Pointer;
  dummy1: string | null;
  screenNum: number;
  visual: interop.Pointer;
  depth: number;
  window: number;
  dummy2: string | null;
  dummy3: string | null;
  parentPtr: interop.Pointer;
  dummy4: string | null;
  dummy5: string | null;
  pathName: string | null;
  nameUid: string | null;
  classUid: string | null;
  changes: XWindowChanges;
  dummy6: number;
  atts: XSetWindowAttributes;
  dummy7: number;
  flags: number;
  dummy8: string | null;
  dummy10: interop.Pointer;
  dummy11: number;
  dummy12: number;
  dummy13: string | null;
  dummy14: string | null;
  dummy15: interop.Pointer;
  reqWidth: number;
  reqHeight: number;
  internalBorderLeft: number;
  dummy16: string | null;
  dummy17: string | null;
  dummy18: interop.Pointer;
  dummy19: string | null;
  internalBorderRight: number;
  internalBorderTop: number;
  internalBorderBottom: number;
  minReqWidth: number;
  minReqHeight: number;
}

declare class TkStateMap {
  constructor(init?: TkStateMap);
  numKey: number;
  strKey: string | null;
}

declare class TkSelectionInfo {
  constructor(init?: TkSelectionInfo);
}

declare class _XImage {
  constructor(init?: _XImage);
  width: number;
  height: number;
  xoffset: number;
  format: number;
  data: string | null;
  byte_order: number;
  bitmap_unit: number;
  bitmap_bit_order: number;
  bitmap_pad: number;
  depth: number;
  bytes_per_line: number;
  bits_per_pixel: number;
  red_mask: number;
  green_mask: number;
  blue_mask: number;
  obdata: string | null;
  f: funcs;
}

declare class Tk_StyledElement_ {
  constructor(init?: Tk_StyledElement_);
}

declare class XIMCallback {
  constructor(init?: XIMCallback);
  client_data: string | null;
  callback: () => void | null;
}

declare class _XComposeStatus {
  constructor(init?: _XComposeStatus);
  compose_ptr: number;
  chars_matched: number;
}

declare class Tk_CanvasTextInfo {
  constructor(init?: Tk_CanvasTextInfo);
  selBorder: interop.Pointer;
  selBorderWidth: number;
  selFgColorPtr: interop.Pointer;
  selItemPtr: interop.Pointer;
  selectFirst: number;
  selectLast: number;
  anchorItemPtr: interop.Pointer;
  selectAnchor: number;
  insertBorder: interop.Pointer;
  insertWidth: number;
  insertBorderWidth: number;
  focusItemPtr: interop.Pointer;
  gotFocus: number;
  cursorOn: number;
}

declare class XFontStruct {
  constructor(init?: XFontStruct);
  ext_data: interop.Pointer;
  fid: number;
  direction: number;
  min_char_or_byte2: number;
  max_char_or_byte2: number;
  min_byte1: number;
  max_byte1: number;
  all_chars_exist: number;
  default_char: number;
  n_properties: number;
  properties: interop.Pointer;
  min_bounds: XCharStruct;
  max_bounds: XCharStruct;
  per_char: interop.Pointer;
  ascent: number;
  descent: number;
}

declare class TkPredefBitmap {
  constructor(init?: TkPredefBitmap);
  source: string | null;
  width: number;
  height: number;
  native: number;
}

declare class TkPlatStubs {
  constructor(init?: TkPlatStubs);
  magic: number;
  hooks: interop.Pointer;
}

declare class _XIMText {
  constructor(init?: _XIMText);
  length: number;
  feedback: interop.Pointer;
  encoding_is_wchar: number;
  string: unnamed_6138467059797537152;
}

declare class _XFreeFuncs {
  constructor(init?: _XFreeFuncs);
}

declare class TkSelHandler {
  constructor(init?: TkSelHandler);
}

declare class XWindowChanges {
  constructor(init?: XWindowChanges);
  x: number;
  y: number;
  width: number;
  height: number;
  border_width: number;
  sibling: number;
  stack_mode: number;
}

declare class TkClipboardTarget {
  constructor(init?: TkClipboardTarget);
}

declare class XPropertyEvent {
  constructor(init?: XPropertyEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  window: number;
  atom: number;
  time: number;
  state: number;
}

declare class _XDisplayAtoms {
  constructor(init?: _XDisplayAtoms);
}

declare class _XSQEvent {
  constructor(init?: _XSQEvent);
}

declare class TkIntPlatStubs {
  constructor(init?: TkIntPlatStubs);
  magic: number;
  hooks: interop.Pointer;
  tkCreateXEventSource: () => void | null;
  tkFreeWindowId: (p1: interop.PointerConvertible, p2: number) => void | null;
  tkInitXId: (p1: interop.PointerConvertible) => void | null;
  tkpCmapStressed: (p1: interop.PointerConvertible, p2: number) => number | null;
  tkpSync: (p1: interop.PointerConvertible) => void | null;
  tkUnixContainerId: (p1: interop.PointerConvertible) => number | null;
  tkUnixDoOneXEvent: (p1: interop.PointerConvertible) => number | null;
  tkUnixSetMenubar: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tkpScanWindowId: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible) => number | null;
  tkWmCleanup: (p1: interop.PointerConvertible) => void | null;
  tkSendCleanup: (p1: interop.PointerConvertible) => void | null;
  tkFreeXId: (p1: interop.PointerConvertible) => void | null;
  tkpWmSetState: (p1: interop.PointerConvertible, p2: number) => number | null;
  tkpTestsendCmd: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number | null;
}

declare class XArc {
  constructor(init?: XArc);
  x: number;
  y: number;
  width: number;
  height: number;
  angle1: number;
  angle2: number;
}

declare class TkIdStack {
  constructor(init?: TkIdStack);
}

declare class XErrorEvent {
  constructor(init?: XErrorEvent);
  type: number;
  display: interop.Pointer;
  resourceid: number;
  serial: number;
  error_code: number;
  request_code: number;
  minor_code: number;
}

declare class XWindowAttributes {
  constructor(init?: XWindowAttributes);
  x: number;
  y: number;
  width: number;
  height: number;
  border_width: number;
  depth: number;
  visual: interop.Pointer;
  root: number;
  class: number;
  bit_gravity: number;
  win_gravity: number;
  backing_store: number;
  backing_planes: number;
  backing_pixel: number;
  save_under: number;
  colormap: number;
  map_installed: number;
  map_state: number;
  all_event_masks: number;
  your_event_mask: number;
  do_not_propagate_mask: number;
  override_redirect: number;
  screen: interop.Pointer;
}

declare class ElArray {
  constructor(init?: ElArray);
}

declare class XCirculateEvent {
  constructor(init?: XCirculateEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  event: number;
  window: number;
  place: number;
}

declare class Tk_Outline {
  constructor(init?: Tk_Outline);
  gc: interop.Pointer;
  width: number;
  activeWidth: number;
  disabledWidth: number;
  offset: number;
  dash: Tk_Dash;
  activeDash: Tk_Dash;
  disabledDash: Tk_Dash;
  reserved1: interop.Pointer;
  reserved2: interop.Pointer;
  reserved3: interop.Pointer;
  tsoffset: Tk_TSOffset;
  color: interop.Pointer;
  activeColor: interop.Pointer;
  disabledColor: interop.Pointer;
  stipple: number;
  activeStipple: number;
  disabledStipple: number;
}

declare class unnamed_7469265493985640127 {
  constructor(init?: unnamed_7469265493985640127);
  visual: interop.Pointer;
  visualid: number;
  screen: number;
  depth: number;
  class: number;
  red_mask: number;
  green_mask: number;
  blue_mask: number;
  colormap_size: number;
  bits_per_rgb: number;
}

declare class XReparentEvent {
  constructor(init?: XReparentEvent);
  type: number;
  serial: number;
  send_event: number;
  display: interop.Pointer;
  event: number;
  window: number;
  parent: number;
  x: number;
  y: number;
  override_redirect: number;
}

declare class _XIM {
  constructor(init?: _XIM);
}

declare class _XLockPtrs {
  constructor(init?: _XLockPtrs);
}

declare class Tk_ImageMaster_ {
  constructor(init?: Tk_ImageMaster_);
}

declare class TkKeyEvent {
  constructor(init?: TkKeyEvent);
  keyEvent: XKeyEvent;
  charValuePtr: string | null;
  charValueLen: number;
}

declare class TkErrorHandler {
  constructor(init?: TkErrorHandler);
  dispPtr: interop.Pointer;
  firstRequest: number;
  lastRequest: number;
  error: number;
  request: number;
  minorCode: number;
  errorProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  clientData: interop.Pointer;
  nextPtr: interop.Pointer;
}

declare class XTextItem {
  constructor(init?: XTextItem);
  chars: string | null;
  nchars: number;
  delta: number;
  font: number;
}

type unnamed_466373221483677888Descriptor = 
  | { pixmap: number }
  | { region: interop.PointerConvertible };

declare class unnamed_466373221483677888 {
  constructor(init?: unnamed_466373221483677888Descriptor);
  pixmap: number;
  region: interop.Pointer;
}

type XEDataObjectDescriptor = 
  | { display: interop.PointerConvertible }
  | { gc: interop.PointerConvertible }
  | { visual: interop.PointerConvertible }
  | { screen: interop.PointerConvertible }
  | { pixmap_format: interop.PointerConvertible }
  | { font: interop.PointerConvertible };

declare class XEDataObject {
  constructor(init?: XEDataObjectDescriptor);
  display: interop.Pointer;
  gc: interop.Pointer;
  visual: interop.Pointer;
  screen: interop.Pointer;
  pixmap_format: interop.Pointer;
  font: interop.Pointer;
}

type unnamed_13200893692902755379Descriptor = 
  | { b: unknown /* const array */ }
  | { s: unknown /* const array */ }
  | { l: unknown /* const array */ };

declare class unnamed_13200893692902755379 {
  constructor(init?: unnamed_13200893692902755379Descriptor);
  b: unknown /* const array */;
  s: unknown /* const array */;
  l: unknown /* const array */;
}

type unnamed_14461178624373966829Descriptor = 
  | { text: interop.PointerConvertible }
  | { bitmap: number };

declare class unnamed_14461178624373966829 {
  constructor(init?: unnamed_14461178624373966829Descriptor);
  text: interop.Pointer;
  bitmap: number;
}

type _XEventDescriptor = 
  | { type: number }
  | { xany: XAnyEvent }
  | { xkey: XKeyEvent }
  | { xbutton: XButtonEvent }
  | { xmotion: XMotionEvent }
  | { xcrossing: XCrossingEvent }
  | { xfocus: XFocusChangeEvent }
  | { xexpose: XExposeEvent }
  | { xgraphicsexpose: XGraphicsExposeEvent }
  | { xnoexpose: XNoExposeEvent }
  | { xvisibility: XVisibilityEvent }
  | { xcreatewindow: XCreateWindowEvent }
  | { xdestroywindow: XDestroyWindowEvent }
  | { xunmap: XUnmapEvent }
  | { xmap: XMapEvent }
  | { xmaprequest: XMapRequestEvent }
  | { xreparent: XReparentEvent }
  | { xconfigure: XConfigureEvent }
  | { xgravity: XGravityEvent }
  | { xresizerequest: XResizeRequestEvent }
  | { xconfigurerequest: XConfigureRequestEvent }
  | { xcirculate: XCirculateEvent }
  | { xcirculaterequest: XCirculateRequestEvent }
  | { xproperty: XPropertyEvent }
  | { xselectionclear: XSelectionClearEvent }
  | { xselectionrequest: XSelectionRequestEvent }
  | { xselection: XSelectionEvent }
  | { xcolormap: XColormapEvent }
  | { xclient: XClientMessageEvent }
  | { xmapping: XMappingEvent }
  | { xerror: XErrorEvent }
  | { xkeymap: XKeymapEvent }
  | { pad: unknown /* const array */ };

declare class _XEvent {
  constructor(init?: _XEventDescriptor);
  type: number;
  xany: XAnyEvent;
  xkey: XKeyEvent;
  xbutton: XButtonEvent;
  xmotion: XMotionEvent;
  xcrossing: XCrossingEvent;
  xfocus: XFocusChangeEvent;
  xexpose: XExposeEvent;
  xgraphicsexpose: XGraphicsExposeEvent;
  xnoexpose: XNoExposeEvent;
  xvisibility: XVisibilityEvent;
  xcreatewindow: XCreateWindowEvent;
  xdestroywindow: XDestroyWindowEvent;
  xunmap: XUnmapEvent;
  xmap: XMapEvent;
  xmaprequest: XMapRequestEvent;
  xreparent: XReparentEvent;
  xconfigure: XConfigureEvent;
  xgravity: XGravityEvent;
  xresizerequest: XResizeRequestEvent;
  xconfigurerequest: XConfigureRequestEvent;
  xcirculate: XCirculateEvent;
  xcirculaterequest: XCirculateRequestEvent;
  xproperty: XPropertyEvent;
  xselectionclear: XSelectionClearEvent;
  xselectionrequest: XSelectionRequestEvent;
  xselection: XSelectionEvent;
  xcolormap: XColormapEvent;
  xclient: XClientMessageEvent;
  xmapping: XMappingEvent;
  xerror: XErrorEvent;
  xkeymap: XKeymapEvent;
  pad: unknown /* const array */;
}

type unnamed_5647942776478080617Descriptor = 
  | { pt: string | null }
  | { array: unknown /* const array */ };

declare class unnamed_5647942776478080617 {
  constructor(init?: unnamed_5647942776478080617Descriptor);
  pt: string | null;
  array: unknown /* const array */;
}

type unnamed_6138467059797537152Descriptor = 
  | { multi_byte: string | null }
  | { wide_char: interop.PointerConvertible };

declare class unnamed_6138467059797537152 {
  constructor(init?: unnamed_6138467059797537152Descriptor);
  multi_byte: string | null;
  wide_char: interop.Pointer;
}

declare function XAllocIconSize(): interop.Pointer;

declare function XAllocSizeHints(): interop.Pointer;

declare function XAllocStandardColormap(): interop.Pointer;

declare function XAllocWMHints(): interop.Pointer;

declare function XClipBox(): void;

declare function XCreateRegion(): interop.Pointer;

declare function XDefaultString(): string;

declare function XDeleteContext(): number;

declare function XDestroyRegion(): void;

declare function XEmptyRegion(): void;

declare function XEqualRegion(): void;

declare function XFindContext(): number;

declare function XGetClassHint(): number;

declare function XGetIconSizes(): number;

declare function XGetNormalHints(): number;

declare function XGetRGBColormaps(): number;

declare function XGetSizeHints(): number;

declare function XGetStandardColormap(): number;

declare function XGetTextProperty(): number;

declare function XGetWMClientMachine(): number;

declare function XGetWMHints(): interop.Pointer;

declare function XGetWMIconName(): number;

declare function XGetWMName(): number;

declare function XGetWMNormalHints(): number;

declare function XGetWMSizeHints(): number;

declare function XGetZoomHints(): number;

declare function XIntersectRegion(): void;

declare function XLookupString(): number;

declare function XMatchVisualInfo(): number;

declare function XOffsetRegion(): void;

declare function XPointInRegion(): number;

declare function XPolygonRegion(): interop.Pointer;

declare function XRectInRegion(): number;

declare function XSaveContext(): number;

declare function XSetClassHint(): void;

declare function XSetIconSizes(): void;

declare function XSetNormalHints(): void;

declare function XSetRGBColormaps(): void;

declare function XSetSizeHints(): void;

declare function XSetStandardProperties(): void;

declare function XSetTextProperty(): void;

declare function XSetWMHints(): void;

declare function XSetWMIconName(): void;

declare function XSetWMName(): void;

declare function XSetWMNormalHints(): void;

declare function XSetWMProperties(): void;

declare function XmbSetWMProperties(): void;

declare function XSetWMSizeHints(): void;

declare function XSetRegion(): void;

declare function XSetStandardColormap(): void;

declare function XSetZoomHints(): void;

declare function XShrinkRegion(): void;

declare function XSubtractRegion(): void;

declare function XmbTextListToTextProperty(): number;

declare function XwcTextListToTextProperty(): number;

declare function XwcFreeStringList(): void;

declare function XTextPropertyToStringList(): number;

declare function XmbTextPropertyToTextList(): number;

declare function XwcTextPropertyToTextList(): number;

declare function XUnionRectWithRegion(): void;

declare function XUnionRegion(): void;

declare function XWMGeometry(): number;

declare function XXorRegion(): void;

declare function Tk_InitStubs(interp: interop.PointerConvertible, version: string, exact: number): string;

declare function Tk_PkgInitStubsCheck(interp: interop.PointerConvertible, version: string, exact: number): string;

declare function Tk_MainLoop(): void;

declare function Tk_3DBorderColor(border: interop.PointerConvertible): interop.Pointer;

declare function Tk_3DBorderGC(tkwin: interop.PointerConvertible, border: interop.PointerConvertible, which: number): interop.Pointer;

declare function Tk_3DHorizontalBevel(tkwin: interop.PointerConvertible, drawable: number, border: interop.PointerConvertible, x: number, y: number, width: number, height: number, leftIn: number, rightIn: number, topBevel: number, relief: number): void;

declare function Tk_3DVerticalBevel(tkwin: interop.PointerConvertible, drawable: number, border: interop.PointerConvertible, x: number, y: number, width: number, height: number, leftBevel: number, relief: number): void;

declare function Tk_AddOption(tkwin: interop.PointerConvertible, name: string, value: string, priority: number): void;

declare function Tk_BindEvent(bindingTable: interop.PointerConvertible, eventPtr: interop.PointerConvertible, tkwin: interop.PointerConvertible, numObjects: number, objectPtr: interop.PointerConvertible): void;

declare function Tk_CanvasDrawableCoords(canvas: interop.PointerConvertible, x: number, y: number, drawableXPtr: interop.PointerConvertible, drawableYPtr: interop.PointerConvertible): void;

declare function Tk_CanvasEventuallyRedraw(canvas: interop.PointerConvertible, x1: number, y1: number, x2: number, y2: number): void;

declare function Tk_CanvasGetCoord(interp: interop.PointerConvertible, canvas: interop.PointerConvertible, str: string, doublePtr: interop.PointerConvertible): number;

declare function Tk_CanvasGetTextInfo(canvas: interop.PointerConvertible): interop.Pointer;

declare function Tk_CanvasPsBitmap(interp: interop.PointerConvertible, canvas: interop.PointerConvertible, bitmap: number, x: number, y: number, width: number, height: number): number;

declare function Tk_CanvasPsColor(interp: interop.PointerConvertible, canvas: interop.PointerConvertible, colorPtr: interop.PointerConvertible): number;

declare function Tk_CanvasPsFont(interp: interop.PointerConvertible, canvas: interop.PointerConvertible, font: interop.PointerConvertible): number;

declare function Tk_CanvasPsPath(interp: interop.PointerConvertible, canvas: interop.PointerConvertible, coordPtr: interop.PointerConvertible, numPoints: number): void;

declare function Tk_CanvasPsStipple(interp: interop.PointerConvertible, canvas: interop.PointerConvertible, bitmap: number): number;

declare function Tk_CanvasPsY(canvas: interop.PointerConvertible, y: number): number;

declare function Tk_CanvasSetStippleOrigin(canvas: interop.PointerConvertible, gc: interop.PointerConvertible): void;

declare function Tk_CanvasTagsParseProc(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, value: string, widgRec: string, offset: number): number;

declare function Tk_CanvasTagsPrintProc(clientData: interop.PointerConvertible, tkwin: interop.PointerConvertible, widgRec: string, offset: number, freeProcPtr: interop.PointerConvertible): string;

declare function Tk_CanvasTkwin(canvas: interop.PointerConvertible): interop.Pointer;

declare function Tk_CanvasWindowCoords(canvas: interop.PointerConvertible, x: number, y: number, screenXPtr: interop.PointerConvertible, screenYPtr: interop.PointerConvertible): void;

declare function Tk_ChangeWindowAttributes(tkwin: interop.PointerConvertible, valueMask: number, attsPtr: interop.PointerConvertible): void;

declare function Tk_CharBbox(layout: interop.PointerConvertible, index: number, xPtr: interop.PointerConvertible, yPtr: interop.PointerConvertible, widthPtr: interop.PointerConvertible, heightPtr: interop.PointerConvertible): number;

declare function Tk_ClearSelection(tkwin: interop.PointerConvertible, selection: number): void;

declare function Tk_ClipboardAppend(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, target: number, format: number, buffer: string): number;

declare function Tk_ClipboardClear(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible): number;

declare function Tk_ConfigureInfo(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, specs: interop.PointerConvertible, widgRec: string, argvName: string, flags: number): number;

declare function Tk_ConfigureValue(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, specs: interop.PointerConvertible, widgRec: string, argvName: string, flags: number): number;

declare function Tk_ConfigureWidget(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, specs: interop.PointerConvertible, argc: number, argv: interop.PointerConvertible, widgRec: string, flags: number): number;

declare function Tk_ConfigureWindow(tkwin: interop.PointerConvertible, valueMask: number, valuePtr: interop.PointerConvertible): void;

declare function Tk_ComputeTextLayout(font: interop.PointerConvertible, str: string, numChars: number, wrapLength: number, justify: interop.Enum<typeof Tk_Justify>, flags: number, widthPtr: interop.PointerConvertible, heightPtr: interop.PointerConvertible): interop.Pointer;

declare function Tk_CoordsToWindow(rootX: number, rootY: number, tkwin: interop.PointerConvertible): interop.Pointer;

declare function Tk_CreateBinding(interp: interop.PointerConvertible, bindingTable: interop.PointerConvertible, object: interop.PointerConvertible, eventStr: string, command: string, append: number): number;

declare function Tk_CreateBindingTable(interp: interop.PointerConvertible): interop.Pointer;

declare function Tk_CreateErrorHandler(display: interop.PointerConvertible, errNum: number, request: number, minorCode: number, errorProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number, clientData: interop.PointerConvertible): interop.Pointer;

declare function Tk_CreateEventHandler(token: interop.PointerConvertible, mask: number, proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, clientData: interop.PointerConvertible): void;

declare function Tk_CreateGenericHandler(proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number, clientData: interop.PointerConvertible): void;

declare function Tk_CreateImageType(typePtr: interop.PointerConvertible): void;

declare function Tk_CreateItemType(typePtr: interop.PointerConvertible): void;

declare function Tk_CreatePhotoImageFormat(formatPtr: interop.PointerConvertible): void;

declare function Tk_CreateSelHandler(tkwin: interop.PointerConvertible, selection: number, target: number, proc: (p1: interop.PointerConvertible, p2: number, p3: string, p4: number) => number, clientData: interop.PointerConvertible, format: number): void;

declare function Tk_CreateWindow(interp: interop.PointerConvertible, parent: interop.PointerConvertible, name: string, screenName: string): interop.Pointer;

declare function Tk_CreateWindowFromPath(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, pathName: string, screenName: string): interop.Pointer;

declare function Tk_DefineBitmap(interp: interop.PointerConvertible, name: string, source: string, width: number, height: number): number;

declare function Tk_DefineCursor(window: interop.PointerConvertible, cursor: interop.PointerConvertible): void;

declare function Tk_DeleteAllBindings(bindingTable: interop.PointerConvertible, object: interop.PointerConvertible): void;

declare function Tk_DeleteBinding(interp: interop.PointerConvertible, bindingTable: interop.PointerConvertible, object: interop.PointerConvertible, eventStr: string): number;

declare function Tk_DeleteBindingTable(bindingTable: interop.PointerConvertible): void;

declare function Tk_DeleteErrorHandler(handler: interop.PointerConvertible): void;

declare function Tk_DeleteEventHandler(token: interop.PointerConvertible, mask: number, proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, clientData: interop.PointerConvertible): void;

declare function Tk_DeleteGenericHandler(proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number, clientData: interop.PointerConvertible): void;

declare function Tk_DeleteImage(interp: interop.PointerConvertible, name: string): void;

declare function Tk_DeleteSelHandler(tkwin: interop.PointerConvertible, selection: number, target: number): void;

declare function Tk_DestroyWindow(tkwin: interop.PointerConvertible): void;

declare function Tk_DisplayName(tkwin: interop.PointerConvertible): string;

declare function Tk_DistanceToTextLayout(layout: interop.PointerConvertible, x: number, y: number): number;

declare function Tk_Draw3DPolygon(tkwin: interop.PointerConvertible, drawable: number, border: interop.PointerConvertible, pointPtr: interop.PointerConvertible, numPoints: number, borderWidth: number, leftRelief: number): void;

declare function Tk_Draw3DRectangle(tkwin: interop.PointerConvertible, drawable: number, border: interop.PointerConvertible, x: number, y: number, width: number, height: number, borderWidth: number, relief: number): void;

declare function Tk_DrawChars(display: interop.PointerConvertible, drawable: number, gc: interop.PointerConvertible, tkfont: interop.PointerConvertible, source: string, numBytes: number, x: number, y: number): void;

declare function Tk_DrawFocusHighlight(tkwin: interop.PointerConvertible, gc: interop.PointerConvertible, width: number, drawable: number): void;

declare function Tk_DrawTextLayout(display: interop.PointerConvertible, drawable: number, gc: interop.PointerConvertible, layout: interop.PointerConvertible, x: number, y: number, firstChar: number, lastChar: number): void;

declare function Tk_Fill3DPolygon(tkwin: interop.PointerConvertible, drawable: number, border: interop.PointerConvertible, pointPtr: interop.PointerConvertible, numPoints: number, borderWidth: number, leftRelief: number): void;

declare function Tk_Fill3DRectangle(tkwin: interop.PointerConvertible, drawable: number, border: interop.PointerConvertible, x: number, y: number, width: number, height: number, borderWidth: number, relief: number): void;

declare function Tk_FindPhoto(interp: interop.PointerConvertible, imageName: string): interop.Pointer;

declare function Tk_FontId(font: interop.PointerConvertible): number;

declare function Tk_Free3DBorder(border: interop.PointerConvertible): void;

declare function Tk_FreeBitmap(display: interop.PointerConvertible, bitmap: number): void;

declare function Tk_FreeColor(colorPtr: interop.PointerConvertible): void;

declare function Tk_FreeColormap(display: interop.PointerConvertible, colormap: number): void;

declare function Tk_FreeCursor(display: interop.PointerConvertible, cursor: interop.PointerConvertible): void;

declare function Tk_FreeFont(f: interop.PointerConvertible): void;

declare function Tk_FreeGC(display: interop.PointerConvertible, gc: interop.PointerConvertible): void;

declare function Tk_FreeImage(image: interop.PointerConvertible): void;

declare function Tk_FreeOptions(specs: interop.PointerConvertible, widgRec: string, display: interop.PointerConvertible, needFlags: number): void;

declare function Tk_FreePixmap(display: interop.PointerConvertible, pixmap: number): void;

declare function Tk_FreeTextLayout(textLayout: interop.PointerConvertible): void;

declare function Tk_FreeXId(display: interop.PointerConvertible, xid: number): void;

declare function Tk_GCForColor(colorPtr: interop.PointerConvertible, drawable: number): interop.Pointer;

declare function Tk_GeometryRequest(tkwin: interop.PointerConvertible, reqWidth: number, reqHeight: number): void;

declare function Tk_Get3DBorder(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, colorName: string): interop.Pointer;

declare function Tk_GetAllBindings(interp: interop.PointerConvertible, bindingTable: interop.PointerConvertible, object: interop.PointerConvertible): void;

declare function Tk_GetAnchor(interp: interop.PointerConvertible, str: string, anchorPtr: interop.PointerConvertible): number;

declare function Tk_GetAtomName(tkwin: interop.PointerConvertible, atom: number): string;

declare function Tk_GetBinding(interp: interop.PointerConvertible, bindingTable: interop.PointerConvertible, object: interop.PointerConvertible, eventStr: string): string;

declare function Tk_GetBitmap(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, str: string): number;

declare function Tk_GetBitmapFromData(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, source: string, width: number, height: number): number;

declare function Tk_GetCapStyle(interp: interop.PointerConvertible, str: string, capPtr: interop.PointerConvertible): number;

declare function Tk_GetColor(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, name: string): interop.Pointer;

declare function Tk_GetColorByValue(tkwin: interop.PointerConvertible, colorPtr: interop.PointerConvertible): interop.Pointer;

declare function Tk_GetColormap(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, str: string): number;

declare function Tk_GetCursor(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, str: string): interop.Pointer;

declare function Tk_GetCursorFromData(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, source: string, mask: string, width: number, height: number, xHot: number, yHot: number, fg: string, bg: string): interop.Pointer;

declare function Tk_GetFont(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, str: string): interop.Pointer;

declare function Tk_GetFontFromObj(tkwin: interop.PointerConvertible, objPtr: interop.PointerConvertible): interop.Pointer;

declare function Tk_GetFontMetrics(font: interop.PointerConvertible, fmPtr: interop.PointerConvertible): void;

declare function Tk_GetGC(tkwin: interop.PointerConvertible, valueMask: number, valuePtr: interop.PointerConvertible): interop.Pointer;

declare function Tk_GetImage(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, name: string, changeProc: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number) => void, clientData: interop.PointerConvertible): interop.Pointer;

declare function Tk_GetImageMasterData(interp: interop.PointerConvertible, name: string, typePtrPtr: interop.PointerConvertible): interop.Pointer;

declare function Tk_GetItemTypes(): interop.Pointer;

declare function Tk_GetJoinStyle(interp: interop.PointerConvertible, str: string, joinPtr: interop.PointerConvertible): number;

declare function Tk_GetJustify(interp: interop.PointerConvertible, str: string, justifyPtr: interop.PointerConvertible): number;

declare function Tk_GetNumMainWindows(): number;

declare function Tk_GetOption(tkwin: interop.PointerConvertible, name: string, className: string): string;

declare function Tk_GetPixels(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, str: string, intPtr: interop.PointerConvertible): number;

declare function Tk_GetPixmap(display: interop.PointerConvertible, d: number, width: number, height: number, depth: number): number;

declare function Tk_GetRelief(interp: interop.PointerConvertible, name: string, reliefPtr: interop.PointerConvertible): number;

declare function Tk_GetRootCoords(tkwin: interop.PointerConvertible, xPtr: interop.PointerConvertible, yPtr: interop.PointerConvertible): void;

declare function Tk_GetScrollInfo(interp: interop.PointerConvertible, argc: number, argv: interop.PointerConvertible, dblPtr: interop.PointerConvertible, intPtr: interop.PointerConvertible): number;

declare function Tk_GetScreenMM(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, str: string, doublePtr: interop.PointerConvertible): number;

declare function Tk_GetSelection(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, selection: number, target: number, proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string) => number, clientData: interop.PointerConvertible): number;

declare function Tk_GetUid(str: string): string;

declare function Tk_GetVisual(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, str: string, depthPtr: interop.PointerConvertible, colormapPtr: interop.PointerConvertible): interop.Pointer;

declare function Tk_GetVRootGeometry(tkwin: interop.PointerConvertible, xPtr: interop.PointerConvertible, yPtr: interop.PointerConvertible, widthPtr: interop.PointerConvertible, heightPtr: interop.PointerConvertible): void;

declare function Tk_Grab(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, grabGlobal: number): number;

declare function Tk_HandleEvent(eventPtr: interop.PointerConvertible): void;

declare function Tk_IdToWindow(display: interop.PointerConvertible, window: number): interop.Pointer;

declare function Tk_ImageChanged(master: interop.PointerConvertible, x: number, y: number, width: number, height: number, imageWidth: number, imageHeight: number): void;

declare function Tk_Init(interp: interop.PointerConvertible): number;

declare function Tk_InternAtom(tkwin: interop.PointerConvertible, name: string): number;

declare function Tk_IntersectTextLayout(layout: interop.PointerConvertible, x: number, y: number, width: number, height: number): number;

declare function Tk_MaintainGeometry(slave: interop.PointerConvertible, master: interop.PointerConvertible, x: number, y: number, width: number, height: number): void;

declare function Tk_MainWindow(interp: interop.PointerConvertible): interop.Pointer;

declare function Tk_MakeWindowExist(tkwin: interop.PointerConvertible): void;

declare function Tk_ManageGeometry(tkwin: interop.PointerConvertible, mgrPtr: interop.PointerConvertible, clientData: interop.PointerConvertible): void;

declare function Tk_MapWindow(tkwin: interop.PointerConvertible): void;

declare function Tk_MeasureChars(tkfont: interop.PointerConvertible, source: string, numBytes: number, maxPixels: number, flags: number, lengthPtr: interop.PointerConvertible): number;

declare function Tk_MoveResizeWindow(tkwin: interop.PointerConvertible, x: number, y: number, width: number, height: number): void;

declare function Tk_MoveWindow(tkwin: interop.PointerConvertible, x: number, y: number): void;

declare function Tk_MoveToplevelWindow(tkwin: interop.PointerConvertible, x: number, y: number): void;

declare function Tk_NameOf3DBorder(border: interop.PointerConvertible): string;

declare function Tk_NameOfAnchor(anchor: interop.Enum<typeof Tk_Anchor>): string;

declare function Tk_NameOfBitmap(display: interop.PointerConvertible, bitmap: number): string;

declare function Tk_NameOfCapStyle(cap: number): string;

declare function Tk_NameOfColor(colorPtr: interop.PointerConvertible): string;

declare function Tk_NameOfCursor(display: interop.PointerConvertible, cursor: interop.PointerConvertible): string;

declare function Tk_NameOfFont(font: interop.PointerConvertible): string;

declare function Tk_NameOfImage(imageMaster: interop.PointerConvertible): string;

declare function Tk_NameOfJoinStyle(join: number): string;

declare function Tk_NameOfJustify(justify: interop.Enum<typeof Tk_Justify>): string;

declare function Tk_NameOfRelief(relief: number): string;

declare function Tk_NameToWindow(interp: interop.PointerConvertible, pathName: string, tkwin: interop.PointerConvertible): interop.Pointer;

declare function Tk_OwnSelection(tkwin: interop.PointerConvertible, selection: number, proc: (p1: interop.PointerConvertible) => void, clientData: interop.PointerConvertible): void;

declare function Tk_ParseArgv(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, argcPtr: interop.PointerConvertible, argv: interop.PointerConvertible, argTable: interop.PointerConvertible, flags: number): number;

declare function Tk_PhotoPutBlock_NoComposite(handle: interop.PointerConvertible, blockPtr: interop.PointerConvertible, x: number, y: number, width: number, height: number): void;

declare function Tk_PhotoPutZoomedBlock_NoComposite(handle: interop.PointerConvertible, blockPtr: interop.PointerConvertible, x: number, y: number, width: number, height: number, zoomX: number, zoomY: number, subsampleX: number, subsampleY: number): void;

declare function Tk_PhotoGetImage(handle: interop.PointerConvertible, blockPtr: interop.PointerConvertible): number;

declare function Tk_PhotoBlank(handle: interop.PointerConvertible): void;

declare function Tk_PhotoExpand_Panic(handle: interop.PointerConvertible, width: number, height: number): void;

declare function Tk_PhotoGetSize(handle: interop.PointerConvertible, widthPtr: interop.PointerConvertible, heightPtr: interop.PointerConvertible): void;

declare function Tk_PhotoSetSize_Panic(handle: interop.PointerConvertible, width: number, height: number): void;

declare function Tk_PointToChar(layout: interop.PointerConvertible, x: number, y: number): number;

declare function Tk_PostscriptFontName(tkfont: interop.PointerConvertible, dsPtr: interop.PointerConvertible): number;

declare function Tk_PreserveColormap(display: interop.PointerConvertible, colormap: number): void;

declare function Tk_QueueWindowEvent(eventPtr: interop.PointerConvertible, position: interop.Enum<typeof Tcl_QueuePosition>): void;

declare function Tk_RedrawImage(image: interop.PointerConvertible, imageX: number, imageY: number, width: number, height: number, drawable: number, drawableX: number, drawableY: number): void;

declare function Tk_ResizeWindow(tkwin: interop.PointerConvertible, width: number, height: number): void;

declare function Tk_RestackWindow(tkwin: interop.PointerConvertible, aboveBelow: number, other: interop.PointerConvertible): number;

declare function Tk_RestrictEvents(proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Enum<typeof Tk_RestrictAction>, arg: interop.PointerConvertible, prevArgPtr: interop.PointerConvertible): (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Enum<typeof Tk_RestrictAction>;

declare function Tk_SafeInit(interp: interop.PointerConvertible): number;

declare function Tk_SetAppName(tkwin: interop.PointerConvertible, name: string): string;

declare function Tk_SetBackgroundFromBorder(tkwin: interop.PointerConvertible, border: interop.PointerConvertible): void;

declare function Tk_SetClass(tkwin: interop.PointerConvertible, className: string): void;

declare function Tk_SetGrid(tkwin: interop.PointerConvertible, reqWidth: number, reqHeight: number, gridWidth: number, gridHeight: number): void;

declare function Tk_SetInternalBorder(tkwin: interop.PointerConvertible, width: number): void;

declare function Tk_SetWindowBackground(tkwin: interop.PointerConvertible, pixel: number): void;

declare function Tk_SetWindowBackgroundPixmap(tkwin: interop.PointerConvertible, pixmap: number): void;

declare function Tk_SetWindowBorder(tkwin: interop.PointerConvertible, pixel: number): void;

declare function Tk_SetWindowBorderWidth(tkwin: interop.PointerConvertible, width: number): void;

declare function Tk_SetWindowBorderPixmap(tkwin: interop.PointerConvertible, pixmap: number): void;

declare function Tk_SetWindowColormap(tkwin: interop.PointerConvertible, colormap: number): void;

declare function Tk_SetWindowVisual(tkwin: interop.PointerConvertible, visual: interop.PointerConvertible, depth: number, colormap: number): number;

declare function Tk_SizeOfBitmap(display: interop.PointerConvertible, bitmap: number, widthPtr: interop.PointerConvertible, heightPtr: interop.PointerConvertible): void;

declare function Tk_SizeOfImage(image: interop.PointerConvertible, widthPtr: interop.PointerConvertible, heightPtr: interop.PointerConvertible): void;

declare function Tk_StrictMotif(tkwin: interop.PointerConvertible): number;

declare function Tk_TextLayoutToPostscript(interp: interop.PointerConvertible, layout: interop.PointerConvertible): void;

declare function Tk_TextWidth(font: interop.PointerConvertible, str: string, numBytes: number): number;

declare function Tk_UndefineCursor(window: interop.PointerConvertible): void;

declare function Tk_UnderlineChars(display: interop.PointerConvertible, drawable: number, gc: interop.PointerConvertible, tkfont: interop.PointerConvertible, source: string, x: number, y: number, firstByte: number, lastByte: number): void;

declare function Tk_UnderlineTextLayout(display: interop.PointerConvertible, drawable: number, gc: interop.PointerConvertible, layout: interop.PointerConvertible, x: number, y: number, underline: number): void;

declare function Tk_Ungrab(tkwin: interop.PointerConvertible): void;

declare function Tk_UnmaintainGeometry(slave: interop.PointerConvertible, master: interop.PointerConvertible): void;

declare function Tk_UnmapWindow(tkwin: interop.PointerConvertible): void;

declare function Tk_UnsetGrid(tkwin: interop.PointerConvertible): void;

declare function Tk_UpdatePointer(tkwin: interop.PointerConvertible, x: number, y: number, state: number): void;

declare function Tk_AllocBitmapFromObj(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, objPtr: interop.PointerConvertible): number;

declare function Tk_Alloc3DBorderFromObj(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, objPtr: interop.PointerConvertible): interop.Pointer;

declare function Tk_AllocColorFromObj(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, objPtr: interop.PointerConvertible): interop.Pointer;

declare function Tk_AllocCursorFromObj(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, objPtr: interop.PointerConvertible): interop.Pointer;

declare function Tk_AllocFontFromObj(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, objPtr: interop.PointerConvertible): interop.Pointer;

declare function Tk_CreateOptionTable(interp: interop.PointerConvertible, templatePtr: interop.PointerConvertible): interop.Pointer;

declare function Tk_DeleteOptionTable(optionTable: interop.PointerConvertible): void;

declare function Tk_Free3DBorderFromObj(tkwin: interop.PointerConvertible, objPtr: interop.PointerConvertible): void;

declare function Tk_FreeBitmapFromObj(tkwin: interop.PointerConvertible, objPtr: interop.PointerConvertible): void;

declare function Tk_FreeColorFromObj(tkwin: interop.PointerConvertible, objPtr: interop.PointerConvertible): void;

declare function Tk_FreeConfigOptions(recordPtr: string, optionToken: interop.PointerConvertible, tkwin: interop.PointerConvertible): void;

declare function Tk_FreeSavedOptions(savePtr: interop.PointerConvertible): void;

declare function Tk_FreeCursorFromObj(tkwin: interop.PointerConvertible, objPtr: interop.PointerConvertible): void;

declare function Tk_FreeFontFromObj(tkwin: interop.PointerConvertible, objPtr: interop.PointerConvertible): void;

declare function Tk_Get3DBorderFromObj(tkwin: interop.PointerConvertible, objPtr: interop.PointerConvertible): interop.Pointer;

declare function Tk_GetAnchorFromObj(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, anchorPtr: interop.PointerConvertible): number;

declare function Tk_GetBitmapFromObj(tkwin: interop.PointerConvertible, objPtr: interop.PointerConvertible): number;

declare function Tk_GetColorFromObj(tkwin: interop.PointerConvertible, objPtr: interop.PointerConvertible): interop.Pointer;

declare function Tk_GetCursorFromObj(tkwin: interop.PointerConvertible, objPtr: interop.PointerConvertible): interop.Pointer;

declare function Tk_GetOptionInfo(interp: interop.PointerConvertible, recordPtr: string, optionTable: interop.PointerConvertible, namePtr: interop.PointerConvertible, tkwin: interop.PointerConvertible): interop.Pointer;

declare function Tk_GetOptionValue(interp: interop.PointerConvertible, recordPtr: string, optionTable: interop.PointerConvertible, namePtr: interop.PointerConvertible, tkwin: interop.PointerConvertible): interop.Pointer;

declare function Tk_GetJustifyFromObj(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, justifyPtr: interop.PointerConvertible): number;

declare function Tk_GetMMFromObj(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, objPtr: interop.PointerConvertible, doublePtr: interop.PointerConvertible): number;

declare function Tk_GetPixelsFromObj(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, objPtr: interop.PointerConvertible, intPtr: interop.PointerConvertible): number;

declare function Tk_GetReliefFromObj(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, resultPtr: interop.PointerConvertible): number;

declare function Tk_GetScrollInfoObj(interp: interop.PointerConvertible, objc: number, objv: interop.Pointer, dblPtr: interop.PointerConvertible, intPtr: interop.PointerConvertible): number;

declare function Tk_InitOptions(interp: interop.PointerConvertible, recordPtr: string, optionToken: interop.PointerConvertible, tkwin: interop.PointerConvertible): number;

declare function Tk_MainEx(argc: number, argv: interop.PointerConvertible, appInitProc: (p1: interop.PointerConvertible) => number, interp: interop.PointerConvertible): void;

declare function Tk_RestoreSavedOptions(savePtr: interop.PointerConvertible): void;

declare function Tk_SetOptions(interp: interop.PointerConvertible, recordPtr: string, optionTable: interop.PointerConvertible, objc: number, objv: interop.Pointer, tkwin: interop.PointerConvertible, savePtr: interop.PointerConvertible, maskPtr: interop.PointerConvertible): number;

declare function Tk_InitConsoleChannels(interp: interop.PointerConvertible): void;

declare function Tk_CreateConsoleWindow(interp: interop.PointerConvertible): number;

declare function Tk_CreateSmoothMethod(interp: interop.PointerConvertible, method: interop.PointerConvertible): void;

declare function Tk_GetDash(interp: interop.PointerConvertible, value: string, dash: interop.PointerConvertible): number;

declare function Tk_CreateOutline(outline: interop.PointerConvertible): void;

declare function Tk_DeleteOutline(display: interop.PointerConvertible, outline: interop.PointerConvertible): void;

declare function Tk_ConfigOutlineGC(gcValues: interop.PointerConvertible, canvas: interop.PointerConvertible, item: interop.PointerConvertible, outline: interop.PointerConvertible): number;

declare function Tk_ChangeOutlineGC(canvas: interop.PointerConvertible, item: interop.PointerConvertible, outline: interop.PointerConvertible): number;

declare function Tk_ResetOutlineGC(canvas: interop.PointerConvertible, item: interop.PointerConvertible, outline: interop.PointerConvertible): number;

declare function Tk_CanvasPsOutline(canvas: interop.PointerConvertible, item: interop.PointerConvertible, outline: interop.PointerConvertible): number;

declare function Tk_SetTSOrigin(tkwin: interop.PointerConvertible, gc: interop.PointerConvertible, x: number, y: number): void;

declare function Tk_CanvasGetCoordFromObj(interp: interop.PointerConvertible, canvas: interop.PointerConvertible, obj: interop.PointerConvertible, doublePtr: interop.PointerConvertible): number;

declare function Tk_CanvasSetOffset(canvas: interop.PointerConvertible, gc: interop.PointerConvertible, offset: interop.PointerConvertible): void;

declare function Tk_DitherPhoto(handle: interop.PointerConvertible, x: number, y: number, width: number, height: number): void;

declare function Tk_PostscriptBitmap(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, psInfo: interop.PointerConvertible, bitmap: number, startX: number, startY: number, width: number, height: number): number;

declare function Tk_PostscriptColor(interp: interop.PointerConvertible, psInfo: interop.PointerConvertible, colorPtr: interop.PointerConvertible): number;

declare function Tk_PostscriptFont(interp: interop.PointerConvertible, psInfo: interop.PointerConvertible, font: interop.PointerConvertible): number;

declare function Tk_PostscriptImage(image: interop.PointerConvertible, interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, psinfo: interop.PointerConvertible, x: number, y: number, width: number, height: number, prepass: number): number;

declare function Tk_PostscriptPath(interp: interop.PointerConvertible, psInfo: interop.PointerConvertible, coordPtr: interop.PointerConvertible, numPoints: number): void;

declare function Tk_PostscriptStipple(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, psInfo: interop.PointerConvertible, bitmap: number): number;

declare function Tk_PostscriptY(y: number, psInfo: interop.PointerConvertible): number;

declare function Tk_PostscriptPhoto(interp: interop.PointerConvertible, blockPtr: interop.PointerConvertible, psInfo: interop.PointerConvertible, width: number, height: number): number;

declare function Tk_CreateClientMessageHandler(proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number): void;

declare function Tk_DeleteClientMessageHandler(proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number): void;

declare function Tk_CreateAnonymousWindow(interp: interop.PointerConvertible, parent: interop.PointerConvertible, screenName: string): interop.Pointer;

declare function Tk_SetClassProcs(tkwin: interop.PointerConvertible, procs: interop.PointerConvertible, instanceData: interop.PointerConvertible): void;

declare function Tk_SetInternalBorderEx(tkwin: interop.PointerConvertible, left: number, right: number, top: number, bottom: number): void;

declare function Tk_SetMinimumRequestSize(tkwin: interop.PointerConvertible, minWidth: number, minHeight: number): void;

declare function Tk_SetCaretPos(tkwin: interop.PointerConvertible, x: number, y: number, height: number): void;

declare function Tk_PhotoPutBlock_Panic(handle: interop.PointerConvertible, blockPtr: interop.PointerConvertible, x: number, y: number, width: number, height: number, compRule: number): void;

declare function Tk_PhotoPutZoomedBlock_Panic(handle: interop.PointerConvertible, blockPtr: interop.PointerConvertible, x: number, y: number, width: number, height: number, zoomX: number, zoomY: number, subsampleX: number, subsampleY: number, compRule: number): void;

declare function Tk_CollapseMotionEvents(display: interop.PointerConvertible, collapse: number): number;

declare function Tk_RegisterStyleEngine(name: string, parent: interop.PointerConvertible): interop.Pointer;

declare function Tk_GetStyleEngine(name: string): interop.Pointer;

declare function Tk_RegisterStyledElement(engine: interop.PointerConvertible, templatePtr: interop.PointerConvertible): number;

declare function Tk_GetElementId(name: string): number;

declare function Tk_CreateStyle(name: string, engine: interop.PointerConvertible, clientData: interop.PointerConvertible): interop.Pointer;

declare function Tk_GetStyle(interp: interop.PointerConvertible, name: string): interop.Pointer;

declare function Tk_FreeStyle(style: interop.PointerConvertible): void;

declare function Tk_NameOfStyle(style: interop.PointerConvertible): string;

declare function Tk_AllocStyleFromObj(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible): interop.Pointer;

declare function Tk_GetStyleFromObj(objPtr: interop.PointerConvertible): interop.Pointer;

declare function Tk_FreeStyleFromObj(objPtr: interop.PointerConvertible): void;

declare function Tk_GetStyledElement(style: interop.PointerConvertible, elementId: number, optionTable: interop.PointerConvertible): interop.Pointer;

declare function Tk_GetElementSize(style: interop.PointerConvertible, element: interop.PointerConvertible, recordPtr: string, tkwin: interop.PointerConvertible, width: number, height: number, inner: number, widthPtr: interop.PointerConvertible, heightPtr: interop.PointerConvertible): void;

declare function Tk_GetElementBox(style: interop.PointerConvertible, element: interop.PointerConvertible, recordPtr: string, tkwin: interop.PointerConvertible, x: number, y: number, width: number, height: number, inner: number, xPtr: interop.PointerConvertible, yPtr: interop.PointerConvertible, widthPtr: interop.PointerConvertible, heightPtr: interop.PointerConvertible): void;

declare function Tk_GetElementBorderWidth(style: interop.PointerConvertible, element: interop.PointerConvertible, recordPtr: string, tkwin: interop.PointerConvertible): number;

declare function Tk_DrawElement(style: interop.PointerConvertible, element: interop.PointerConvertible, recordPtr: string, tkwin: interop.PointerConvertible, d: number, x: number, y: number, width: number, height: number, state: number): void;

declare function Tk_PhotoExpand(interp: interop.PointerConvertible, handle: interop.PointerConvertible, width: number, height: number): number;

declare function Tk_PhotoPutBlock(interp: interop.PointerConvertible, handle: interop.PointerConvertible, blockPtr: interop.PointerConvertible, x: number, y: number, width: number, height: number, compRule: number): number;

declare function Tk_PhotoPutZoomedBlock(interp: interop.PointerConvertible, handle: interop.PointerConvertible, blockPtr: interop.PointerConvertible, x: number, y: number, width: number, height: number, zoomX: number, zoomY: number, subsampleX: number, subsampleY: number, compRule: number): number;

declare function Tk_PhotoSetSize(interp: interop.PointerConvertible, handle: interop.PointerConvertible, width: number, height: number): number;

declare function Tk_GetUserInactiveTime(dpy: interop.PointerConvertible): number;

declare function Tk_ResetUserInactiveTime(dpy: interop.PointerConvertible): void;

declare function Tk_Interp(tkwin: interop.PointerConvertible): interop.Pointer;

declare function Tk_CreateOldImageType(typePtr: interop.PointerConvertible): void;

declare function Tk_CreateOldPhotoImageFormat(formatPtr: interop.PointerConvertible): void;

declare function Ttk_RegisterCleanup(interp: interop.PointerConvertible, deleteData: interop.PointerConvertible, cleanupProc: interop.PointerConvertible): number;

declare function Ttk_RegisterElementSpec(theme: number, elementName: string, elementSpec: interop.PointerConvertible, clientData: interop.PointerConvertible): number;

declare function Ttk_RegisterElementFactory(interp: interop.PointerConvertible, name: string, factoryProc: number, clientData: interop.PointerConvertible): number;

declare function Ttk_RegisterLayout(theme: number, className: string, layoutSpec: number): number;

declare function Ttk_GetStateSpecFromObj(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, spec_rtn: interop.PointerConvertible): number;

declare function Ttk_StateTableLookup(map: interop.Pointer, state: number): number;

declare function Ttk_GetPaddingFromObj(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, objPtr: interop.PointerConvertible, pad_rtn: interop.PointerConvertible): number;

declare function Ttk_GetBorderFromObj(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, pad_rtn: interop.PointerConvertible): number;

declare function Ttk_GetStickyFromObj(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, sticky_rtn: interop.PointerConvertible): number;

declare function Ttk_BoxContains(box: number, x: number, y: number): number;

declare function Ttk_GetOrientFromObj(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, orient: interop.PointerConvertible): number;

declare function TkAllocWindow(dispPtr: interop.PointerConvertible, screenNum: number, parentPtr: interop.PointerConvertible): interop.Pointer;

declare function TkBezierPoints(control: interop.Pointer, numSteps: number, coordPtr: interop.PointerConvertible): void;

declare function TkBezierScreenPoints(canvas: interop.PointerConvertible, control: interop.Pointer, numSteps: number, xPointPtr: interop.PointerConvertible): void;

declare function TkBindDeadWindow(winPtr: interop.PointerConvertible): void;

declare function TkBindEventProc(winPtr: interop.PointerConvertible, eventPtr: interop.PointerConvertible): void;

declare function TkBindFree(mainPtr: interop.PointerConvertible): void;

declare function TkBindInit(mainPtr: interop.PointerConvertible): void;

declare function TkChangeEventWindow(eventPtr: interop.PointerConvertible, winPtr: interop.PointerConvertible): void;

declare function TkClipInit(interp: interop.PointerConvertible, dispPtr: interop.PointerConvertible): number;

declare function TkComputeAnchor(anchor: interop.Enum<typeof Tk_Anchor>, tkwin: interop.PointerConvertible, padX: number, padY: number, innerWidth: number, innerHeight: number, xPtr: interop.PointerConvertible, yPtr: interop.PointerConvertible): void;

declare function TkCopyAndGlobalEval(interp: interop.PointerConvertible, script: string): number;

declare function TkCreateBindingProcedure(interp: interop.PointerConvertible, bindingTable: interop.PointerConvertible, object: interop.PointerConvertible, eventString: string, evalProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number) => number, freeProc: (p1: interop.PointerConvertible) => void, clientData: interop.PointerConvertible): number;

declare function TkCreateCursorFromData(tkwin: interop.PointerConvertible, source: string, mask: string, width: number, height: number, xHot: number, yHot: number, fg: XColor, bg: XColor): interop.Pointer;

declare function TkCreateFrame(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, argc: number, argv: interop.PointerConvertible, toplevel: number, appName: string): number;

declare function TkCreateMainWindow(interp: interop.PointerConvertible, screenName: string, baseName: string): interop.Pointer;

declare function TkCurrentTime(dispPtr: interop.PointerConvertible): number;

declare function TkDeleteAllImages(mainPtr: interop.PointerConvertible): void;

declare function TkDoConfigureNotify(winPtr: interop.PointerConvertible): void;

declare function TkDrawInsetFocusHighlight(tkwin: interop.PointerConvertible, gc: interop.PointerConvertible, width: number, drawable: number, padding: number): void;

declare function TkEventDeadWindow(winPtr: interop.PointerConvertible): void;

declare function TkFillPolygon(canvas: interop.PointerConvertible, coordPtr: interop.PointerConvertible, numPoints: number, display: interop.PointerConvertible, drawable: number, gc: interop.PointerConvertible, outlineGC: interop.PointerConvertible): void;

declare function TkFindStateNum(interp: interop.PointerConvertible, option: string, mapPtr: interop.PointerConvertible, strKey: string): number;

declare function TkFindStateString(mapPtr: interop.PointerConvertible, numKey: number): string;

declare function TkFocusDeadWindow(winPtr: interop.PointerConvertible): void;

declare function TkFocusFilterEvent(winPtr: interop.PointerConvertible, eventPtr: interop.PointerConvertible): number;

declare function TkFocusKeyEvent(winPtr: interop.PointerConvertible, eventPtr: interop.PointerConvertible): interop.Pointer;

declare function TkFontPkgInit(mainPtr: interop.PointerConvertible): void;

declare function TkFontPkgFree(mainPtr: interop.PointerConvertible): void;

declare function TkFreeBindingTags(winPtr: interop.PointerConvertible): void;

declare function TkpFreeCursor(cursorPtr: interop.PointerConvertible): void;

declare function TkGetBitmapData(interp: interop.PointerConvertible, string: string, fileName: string, widthPtr: interop.PointerConvertible, heightPtr: interop.PointerConvertible, hotXPtr: interop.PointerConvertible, hotYPtr: interop.PointerConvertible): string;

declare function TkGetButtPoints(p1: interop.Pointer, p2: interop.Pointer, width: number, project: number, m1: interop.Pointer, m2: interop.Pointer): void;

declare function TkGetCursorByName(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, string: string): interop.Pointer;

declare function TkGetDefaultScreenName(interp: interop.PointerConvertible, screenName: string): string;

declare function TkGetDisplay(display: interop.PointerConvertible): interop.Pointer;

declare function TkGetDisplayOf(interp: interop.PointerConvertible, objc: number, objv: interop.Pointer, tkwinPtr: interop.PointerConvertible): number;

declare function TkGetFocusWin(winPtr: interop.PointerConvertible): interop.Pointer;

declare function TkGetInterpNames(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible): number;

declare function TkGetMiterPoints(p1: interop.Pointer, p2: interop.Pointer, p3: interop.Pointer, width: number, m1: interop.Pointer, m2: interop.Pointer): number;

declare function TkGetPointerCoords(tkwin: interop.PointerConvertible, xPtr: interop.PointerConvertible, yPtr: interop.PointerConvertible): void;

declare function TkGetServerInfo(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible): void;

declare function TkGrabDeadWindow(winPtr: interop.PointerConvertible): void;

declare function TkGrabState(winPtr: interop.PointerConvertible): number;

declare function TkIncludePoint(itemPtr: interop.PointerConvertible, pointPtr: interop.PointerConvertible): void;

declare function TkInOutEvents(eventPtr: interop.PointerConvertible, sourcePtr: interop.PointerConvertible, destPtr: interop.PointerConvertible, leaveType: number, enterType: number, position: interop.Enum<typeof Tcl_QueuePosition>): void;

declare function TkInstallFrameMenu(tkwin: interop.PointerConvertible): void;

declare function TkKeysymToString(keysym: number): string;

declare function TkLineToArea(end1Ptr: interop.Pointer, end2Ptr: interop.Pointer, rectPtr: interop.Pointer): number;

declare function TkLineToPoint(end1Ptr: interop.Pointer, end2Ptr: interop.Pointer, pointPtr: interop.Pointer): number;

declare function TkMakeBezierCurve(canvas: interop.PointerConvertible, pointPtr: interop.PointerConvertible, numPoints: number, numSteps: number, xPoints: interop.Pointer, dblPoints: interop.Pointer): number;

declare function TkMakeBezierPostscript(interp: interop.PointerConvertible, canvas: interop.PointerConvertible, pointPtr: interop.PointerConvertible, numPoints: number): void;

declare function TkOptionClassChanged(winPtr: interop.PointerConvertible): void;

declare function TkOptionDeadWindow(winPtr: interop.PointerConvertible): void;

declare function TkOvalToArea(ovalPtr: interop.PointerConvertible, rectPtr: interop.PointerConvertible): number;

declare function TkOvalToPoint(ovalPtr: interop.Pointer, width: number, filled: number, pointPtr: interop.Pointer): number;

declare function TkpChangeFocus(winPtr: interop.PointerConvertible, force: number): number;

declare function TkpCloseDisplay(dispPtr: interop.PointerConvertible): void;

declare function TkpClaimFocus(topLevelPtr: interop.PointerConvertible, force: number): void;

declare function TkpDisplayWarning(msg: string, title: string): void;

declare function TkpGetAppName(interp: interop.PointerConvertible, name: interop.PointerConvertible): void;

declare function TkpGetOtherWindow(winPtr: interop.PointerConvertible): interop.Pointer;

declare function TkpGetWrapperWindow(winPtr: interop.PointerConvertible): interop.Pointer;

declare function TkpInit(interp: interop.PointerConvertible): number;

declare function TkpInitializeMenuBindings(interp: interop.PointerConvertible, bindingTable: interop.PointerConvertible): void;

declare function TkpMakeContainer(tkwin: interop.PointerConvertible): void;

declare function TkpMakeMenuWindow(tkwin: interop.PointerConvertible, transient: number): void;

declare function TkpMakeWindow(winPtr: interop.PointerConvertible, parent: number): number;

declare function TkpMenuNotifyToplevelCreate(interp1: interop.PointerConvertible, menuName: string): void;

declare function TkpOpenDisplay(display_name: string): interop.Pointer;

declare function TkPointerEvent(eventPtr: interop.PointerConvertible, winPtr: interop.PointerConvertible): number;

declare function TkPolygonToArea(polyPtr: interop.PointerConvertible, numPoints: number, rectPtr: interop.PointerConvertible): number;

declare function TkPolygonToPoint(polyPtr: interop.PointerConvertible, numPoints: number, pointPtr: interop.PointerConvertible): number;

declare function TkPositionInTree(winPtr: interop.PointerConvertible, treePtr: interop.PointerConvertible): number;

declare function TkpRedirectKeyEvent(winPtr: interop.PointerConvertible, eventPtr: interop.PointerConvertible): void;

declare function TkpSetMainMenubar(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, menuName: string): void;

declare function TkpUseWindow(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, string: string): number;

declare function TkpWindowWasRecentlyDeleted(win: number, dispPtr: interop.PointerConvertible): number;

declare function TkQueueEventForAllChildren(winPtr: interop.PointerConvertible, eventPtr: interop.PointerConvertible): void;

declare function TkReadBitmapFile(display: interop.PointerConvertible, d: number, filename: string, width_return: interop.PointerConvertible, height_return: interop.PointerConvertible, bitmap_return: interop.PointerConvertible, x_hot_return: interop.PointerConvertible, y_hot_return: interop.PointerConvertible): number;

declare function TkScrollWindow(tkwin: interop.PointerConvertible, gc: interop.PointerConvertible, x: number, y: number, width: number, height: number, dx: number, dy: number, damageRgn: interop.PointerConvertible): number;

declare function TkSelDeadWindow(winPtr: interop.PointerConvertible): void;

declare function TkSelEventProc(tkwin: interop.PointerConvertible, eventPtr: interop.PointerConvertible): void;

declare function TkSelInit(tkwin: interop.PointerConvertible): void;

declare function TkSelPropProc(eventPtr: interop.PointerConvertible): void;

declare function TkSetWindowMenuBar(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, oldMenuName: string, menuName: string): void;

declare function TkStringToKeysym(name: string): number;

declare function TkThickPolyLineToArea(coordPtr: interop.PointerConvertible, numPoints: number, width: number, capStyle: number, joinStyle: number, rectPtr: interop.PointerConvertible): number;

declare function TkWmAddToColormapWindows(winPtr: interop.PointerConvertible): void;

declare function TkWmDeadWindow(winPtr: interop.PointerConvertible): void;

declare function TkWmFocusToplevel(winPtr: interop.PointerConvertible): interop.Pointer;

declare function TkWmMapWindow(winPtr: interop.PointerConvertible): void;

declare function TkWmNewWindow(winPtr: interop.PointerConvertible): void;

declare function TkWmProtocolEventProc(winPtr: interop.PointerConvertible, evenvPtr: interop.PointerConvertible): void;

declare function TkWmRemoveFromColormapWindows(winPtr: interop.PointerConvertible): void;

declare function TkWmRestackToplevel(winPtr: interop.PointerConvertible, aboveBelow: number, otherPtr: interop.PointerConvertible): void;

declare function TkWmSetClass(winPtr: interop.PointerConvertible): void;

declare function TkWmUnmapWindow(winPtr: interop.PointerConvertible): void;

declare function TkDebugBitmap(tkwin: interop.PointerConvertible, name: string): interop.Pointer;

declare function TkDebugBorder(tkwin: interop.PointerConvertible, name: string): interop.Pointer;

declare function TkDebugCursor(tkwin: interop.PointerConvertible, name: string): interop.Pointer;

declare function TkDebugColor(tkwin: interop.PointerConvertible, name: string): interop.Pointer;

declare function TkDebugConfig(interp: interop.PointerConvertible, table: interop.PointerConvertible): interop.Pointer;

declare function TkDebugFont(tkwin: interop.PointerConvertible, name: string): interop.Pointer;

declare function TkFindStateNumObj(interp: interop.PointerConvertible, optionPtr: interop.PointerConvertible, mapPtr: interop.PointerConvertible, keyPtr: interop.PointerConvertible): number;

declare function TkGetBitmapPredefTable(): interop.Pointer;

declare function TkGetDisplayList(): interop.Pointer;

declare function TkGetMainInfoList(): interop.Pointer;

declare function TkGetWindowFromObj(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, objPtr: interop.PointerConvertible, windowPtr: interop.PointerConvertible): number;

declare function TkpGetString(winPtr: interop.PointerConvertible, eventPtr: interop.PointerConvertible, dsPtr: interop.PointerConvertible): string;

declare function TkpGetSubFonts(interp: interop.PointerConvertible, tkfont: interop.PointerConvertible): void;

declare function TkpGetSystemDefault(tkwin: interop.PointerConvertible, dbName: string, className: string): interop.Pointer;

declare function TkpMenuThreadInit(): void;

declare function TkpDrawHighlightBorder(tkwin: interop.PointerConvertible, fgGC: interop.PointerConvertible, bgGC: interop.PointerConvertible, highlightWidth: number, drawable: number): void;

declare function TkSetFocusWin(winPtr: interop.PointerConvertible, force: number): void;

declare function TkpSetKeycodeAndState(tkwin: interop.PointerConvertible, keySym: number, eventPtr: interop.PointerConvertible): void;

declare function TkpGetKeySym(dispPtr: interop.PointerConvertible, eventPtr: interop.PointerConvertible): number;

declare function TkpInitKeymapInfo(dispPtr: interop.PointerConvertible): void;

declare function TkPhotoGetValidRegion(handle: interop.PointerConvertible): interop.Pointer;

declare function TkWmStackorderToplevel(parentPtr: interop.PointerConvertible): interop.Pointer;

declare function TkFocusFree(mainPtr: interop.PointerConvertible): void;

declare function TkClipCleanup(dispPtr: interop.PointerConvertible): void;

declare function TkGCCleanup(dispPtr: interop.PointerConvertible): void;

declare function TkStylePkgInit(mainPtr: interop.PointerConvertible): void;

declare function TkStylePkgFree(mainPtr: interop.PointerConvertible): void;

declare function TkToplevelWindowForCommand(interp: interop.PointerConvertible, cmdName: string): interop.Pointer;

declare function TkGetOptionSpec(name: string, optionTable: interop.PointerConvertible): interop.Pointer;

declare function TkMakeRawCurve(canvas: interop.PointerConvertible, pointPtr: interop.PointerConvertible, numPoints: number, numSteps: number, xPoints: interop.Pointer, dblPoints: interop.Pointer): number;

declare function TkMakeRawCurvePostscript(interp: interop.PointerConvertible, canvas: interop.PointerConvertible, pointPtr: interop.PointerConvertible, numPoints: number): void;

declare function TkpDrawFrame(tkwin: interop.PointerConvertible, border: interop.PointerConvertible, highlightWidth: number, borderWidth: number, relief: number): void;

declare function TkCreateThreadExitHandler(proc: (p1: interop.PointerConvertible) => void, clientData: interop.PointerConvertible): void;

declare function TkDeleteThreadExitHandler(proc: (p1: interop.PointerConvertible) => void, clientData: interop.PointerConvertible): void;

declare function TkpTestembedCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, argc: number, argv: interop.PointerConvertible): number;

declare function TkpTesttextCmd(dummy: interop.PointerConvertible, interp: interop.PointerConvertible, argc: number, argv: interop.PointerConvertible): number;

declare function TkStateParseProc(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, value: string, widgRec: string, offset: number): number;

declare function TkStatePrintProc(clientData: interop.PointerConvertible, tkwin: interop.PointerConvertible, widgRec: string, offset: number, freeProcPtr: interop.PointerConvertible): string;

declare function TkCanvasDashParseProc(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, value: string, widgRec: string, offset: number): number;

declare function TkCanvasDashPrintProc(clientData: interop.PointerConvertible, tkwin: interop.PointerConvertible, widgRec: string, offset: number, freeProcPtr: interop.PointerConvertible): string;

declare function TkOffsetParseProc(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, value: string, widgRec: string, offset: number): number;

declare function TkOffsetPrintProc(clientData: interop.PointerConvertible, tkwin: interop.PointerConvertible, widgRec: string, offset: number, freeProcPtr: interop.PointerConvertible): string;

declare function TkPixelParseProc(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, value: string, widgRec: string, offset: number): number;

declare function TkPixelPrintProc(clientData: interop.PointerConvertible, tkwin: interop.PointerConvertible, widgRec: string, offset: number, freeProcPtr: interop.PointerConvertible): string;

declare function TkOrientParseProc(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, value: string, widgRec: string, offset: number): number;

declare function TkOrientPrintProc(clientData: interop.PointerConvertible, tkwin: interop.PointerConvertible, widgRec: string, offset: number, freeProcPtr: interop.PointerConvertible): string;

declare function TkSmoothParseProc(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, value: string, widgRec: string, offset: number): number;

declare function TkSmoothPrintProc(clientData: interop.PointerConvertible, tkwin: interop.PointerConvertible, widgRec: string, offset: number, freeProcPtr: interop.PointerConvertible): string;

declare function Ttk_Init(interp: interop.PointerConvertible): number;

declare function Tk_BellObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_BindObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_BindtagsObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_ButtonObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_CanvasObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, argc: number, objv: interop.Pointer): number;

declare function Tk_CheckbuttonObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_ClipboardObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_ChooseColorObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_ChooseDirectoryObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_ChooseFontObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_DestroyObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_EntryObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_EventObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_FrameObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_FocusObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_FontObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_GetOpenFileObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_GetSaveFileObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_GrabObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_GridObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_ImageObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_LabelObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_LabelframeObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_ListboxObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_LowerObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_MenubuttonObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_MessageBoxObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_MessageObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_PanedWindowObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_OptionObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_PackObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_PlaceObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_RadiobuttonObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_RaiseObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_ScaleObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_ScrollbarCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, argc: number, argv: interop.PointerConvertible): number;

declare function Tk_SelectionObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_SendCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, argc: number, argv: interop.PointerConvertible): number;

declare function Tk_SendObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_SpinboxObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_TextObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_TkObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_TkwaitObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_ToplevelObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_UpdateObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_WinfoObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_WmObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tk_GetDoublePixelsFromObj(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, objPtr: interop.PointerConvertible, doublePtr: interop.PointerConvertible): number;

declare function TkEventInit(): void;

declare function TkRegisterObjTypes(): void;

declare function TkCreateMenuCmd(interp: interop.PointerConvertible): number;

declare function TkDeadAppCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, argc: number, argv: interop.PointerConvertible): number;

declare function TkCanvasGetCoordObj(interp: interop.PointerConvertible, canvas: interop.PointerConvertible, obj: interop.PointerConvertible, doublePtr: interop.PointerConvertible): number;

declare function TkGetDoublePixels(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, string: string, doublePtr: interop.PointerConvertible): number;

declare function TkPostscriptImage(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, psInfo: interop.PointerConvertible, ximage: interop.PointerConvertible, x: number, y: number, width: number, height: number): number;

declare function TkMapTopFrame(tkwin: interop.PointerConvertible): void;

declare function TkpGetBindingXEvent(interp: interop.PointerConvertible): interop.Pointer;

declare function TkCreateExitHandler(proc: (p1: interop.PointerConvertible) => void, clientData: interop.PointerConvertible): void;

declare function TkDeleteExitHandler(proc: (p1: interop.PointerConvertible) => void, clientData: interop.PointerConvertible): void;

declare function TkFinalize(p1: interop.PointerConvertible): void;

declare function TkFinalizeThread(p1: interop.PointerConvertible): void;

declare function TkpBuildRegionFromAlphaData(region: interop.PointerConvertible, x: number, y: number, width: number, height: number, dataPtr: interop.PointerConvertible, pixelStride: number, lineStride: number): void;

declare function TkPrintPadAmount(interp: interop.PointerConvertible, buffer: string, pad1: number, pad2: number): void;

declare function TkParsePadAmount(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, objPtr: interop.PointerConvertible, pad1Ptr: interop.PointerConvertible, pad2Ptr: interop.PointerConvertible): number;

declare function TkFocusSplit(winPtr: interop.PointerConvertible): void;

declare function TkFocusJoin(winPtr: interop.PointerConvertible): void;

declare function TkpAlwaysShowSelection(tkwin: interop.PointerConvertible): number;

declare function TkpDrawCharsInContext(display: interop.PointerConvertible, drawable: number, gc: interop.PointerConvertible, tkfont: interop.PointerConvertible, source: string, numBytes: number, rangeStart: number, rangeLength: number, x: number, y: number): void;

declare function TkpMeasureCharsInContext(tkfont: interop.PointerConvertible, source: string, numBytes: number, rangeStart: number, rangeLength: number, maxLength: number, flags: number, lengthPtr: interop.PointerConvertible): number;

declare function TkUnderlineCharsInContext(display: interop.PointerConvertible, drawable: number, gc: interop.PointerConvertible, tkfont: interop.PointerConvertible, string: string, numBytes: number, x: number, y: number, firstByte: number, lastByte: number): void;

declare function TkpGetFontAttrsForChar(tkwin: interop.PointerConvertible, tkfont: interop.PointerConvertible, c: number, faPtr: interop.PointerConvertible): void;

declare function TkBackgroundEvalObjv(interp: interop.PointerConvertible, objc: number, objv: interop.PointerConvertible, flags: number): number;

declare function TkUnsupported1ObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TkpGetGCCache(gc: interop.PointerConvertible): interop.Pointer;

declare function TkpInitGCCache(gc: interop.PointerConvertible): void;

declare function TkpFreeGCCache(gc: interop.PointerConvertible): void;

declare function TkMacOSXDefaultStartupScript(): void;

declare function TkpClipDrawableToRect(display: interop.PointerConvertible, d: number, x: number, y: number, width: number, height: number): void;

declare function TkpRetainRegion(r: interop.PointerConvertible): void;

declare function TkpReleaseRegion(r: interop.PointerConvertible): void;

declare function TkCreateXEventSource(): void;

declare function TkFreeWindowId(dispPtr: interop.PointerConvertible, w: number): void;

declare function TkInitXId(dispPtr: interop.PointerConvertible): void;

declare function TkpCmapStressed(tkwin: interop.PointerConvertible, colormap: number): number;

declare function TkpSync(display: interop.PointerConvertible): void;

declare function TkUnixContainerId(winPtr: interop.PointerConvertible): number;

declare function TkUnixDoOneXEvent(timePtr: interop.PointerConvertible): number;

declare function TkUnixSetMenubar(tkwin: interop.PointerConvertible, menubar: interop.PointerConvertible): void;

declare function TkpScanWindowId(interp: interop.PointerConvertible, string: string, idPtr: interop.PointerConvertible): number;

declare function TkWmCleanup(dispPtr: interop.PointerConvertible): void;

declare function TkSendCleanup(dispPtr: interop.PointerConvertible): void;

declare function TkFreeXId(dispPtr: interop.PointerConvertible): void;

declare function TkpWmSetState(winPtr: interop.PointerConvertible, state: number): number;

declare function TkpTestsendCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, argc: number, argv: interop.PointerConvertible): number;

declare function Ttk_GetStateSpecFromObj(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function Ttk_NewStateSpecObj(onbits: number, offbits: number): interop.Pointer;

declare function Ttk_GetStateMapFromObj(p1: interop.PointerConvertible, p2: interop.PointerConvertible): number;

declare function Ttk_StateMapLookup(p1: interop.PointerConvertible, Ttk_StateMap: number, p3: number): interop.Pointer;

declare function Ttk_StateTableLookup(map: interop.Pointer, p2: number): number;

declare function Ttk_GetPaddingFromObj(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible): number;

declare function Ttk_GetBorderFromObj(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function Ttk_MakePadding(l: number, t: number, r: number, b: number): number;

declare function Ttk_UniformPadding(borderWidth: number): number;

declare function Ttk_AddPadding(): number;

declare function Ttk_RelievePadding(): number;

declare function Ttk_MakeBox(x: number, y: number, width: number, height: number): number;

declare function Ttk_BoxContains(): number;

declare function Ttk_GetStickyFromObj(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function Ttk_NewStickyObj(p1: number): interop.Pointer;

declare function Ttk_PackBox(cavity: interop.PointerConvertible, w: number, h: number, side: interop.Enum<typeof Ttk_Side>): number;

declare function Ttk_StickBox(parcel: number, w: number, h: number, sticky: number): number;

declare function Ttk_AnchorBox(parcel: number, w: number, h: number, anchor: interop.Enum<typeof Tk_Anchor>): number;

declare function Ttk_PadBox(b: number, p: number): number;

declare function Ttk_ExpandBox(b: number, p: number): number;

declare function Ttk_PlaceBox(cavity: interop.PointerConvertible, w: number, h: number, p4: interop.Enum<typeof Ttk_Side>, p5: number): number;

declare function Ttk_PositionBox(cavity: interop.PointerConvertible, w: number, h: number, p4: number): number;

declare function Ttk_StylePkgInit(p1: interop.PointerConvertible): void;

declare function Ttk_GetTheme(interp: interop.PointerConvertible, name: string): number;

declare function Ttk_GetDefaultTheme(interp: interop.PointerConvertible): number;

declare function Ttk_GetCurrentTheme(interp: interop.PointerConvertible): number;

declare function Ttk_CreateTheme(interp: interop.PointerConvertible, name: string, parent: number): number;

declare function Ttk_SetThemeEnabledProc(): void;

declare function Ttk_UseTheme(p1: interop.PointerConvertible, Ttk_Theme: number): number;

declare function Ttk_RegisterCleanup(interp: interop.PointerConvertible, deleteData: interop.PointerConvertible, cleanupProc: (p1: interop.PointerConvertible) => void): void;

declare function Ttk_RegisterElement(interp: interop.PointerConvertible, theme: number, elementName: string, p4: interop.PointerConvertible, clientData: interop.PointerConvertible): interop.Pointer;

declare function Ttk_RegisterElementFactory(p1: interop.PointerConvertible, name: string, p3: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: string, p5: number, p6: interop.PointerConvertible) => number, clientData: interop.PointerConvertible): number;

declare function TtkNullElementSize(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible): void;

declare function TtkNullElementDraw(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, Ttk_Box: number, p6: number): void;

declare function Ttk_RegisterLayout(theme: number, className: string, layoutSpec: interop.PointerConvertible): void;

declare function Ttk_RegisterLayouts(theme: number, layoutTable: interop.PointerConvertible): void;

declare function Ttk_CreateLayout(p1: interop.PointerConvertible, Ttk_Theme: number, name: string, recordPtr: interop.PointerConvertible, p5: interop.PointerConvertible, tkwin: interop.PointerConvertible): interop.Pointer;

declare function Ttk_CreateSublayout(p1: interop.PointerConvertible, Ttk_Theme: number, p3: interop.PointerConvertible, name: string, p5: interop.PointerConvertible): interop.Pointer;

declare function Ttk_FreeLayout(p1: interop.PointerConvertible): void;

declare function Ttk_LayoutSize(p1: interop.PointerConvertible, p2: number, widthPtr: interop.PointerConvertible, heightPtr: interop.PointerConvertible): void;

declare function Ttk_PlaceLayout(p1: interop.PointerConvertible, p2: number, Ttk_Box: number): void;

declare function Ttk_DrawLayout(p1: interop.PointerConvertible, p2: number, p3: number): void;

declare function Ttk_RebindSublayout(p1: interop.PointerConvertible, recordPtr: interop.PointerConvertible): void;

declare function Ttk_IdentifyElement(p1: interop.PointerConvertible, x: number, y: number): interop.Pointer;

declare function Ttk_FindElement(p1: interop.PointerConvertible, nodeName: string): interop.Pointer;

declare function Ttk_ElementName(p1: interop.PointerConvertible): string;

declare function Ttk_ElementParcel(p1: interop.PointerConvertible): number;

declare function Ttk_ClientRegion(p1: interop.PointerConvertible, elementName: string): number;

declare function Ttk_LayoutNodeInternalParcel(p1: interop.PointerConvertible, p2: interop.PointerConvertible): number;

declare function Ttk_LayoutNodeInternalPadding(p1: interop.PointerConvertible, p2: interop.PointerConvertible): number;

declare function Ttk_LayoutNodeReqSize(p1: interop.PointerConvertible, p2: interop.PointerConvertible, w: interop.PointerConvertible, h: interop.PointerConvertible): void;

declare function Ttk_PlaceElement(p1: interop.PointerConvertible, p2: interop.PointerConvertible, Ttk_Box: number): void;

declare function Ttk_ChangeElementState(p1: interop.PointerConvertible, set: number, clr: number): void;

declare function Ttk_QueryOption(p1: interop.PointerConvertible, p2: string, p3: number): interop.Pointer;

declare function Ttk_LayoutStyle(p1: interop.PointerConvertible): interop.Pointer;

declare function Ttk_StyleDefault(p1: interop.PointerConvertible, optionName: string): interop.Pointer;

declare function Ttk_StyleMap(p1: interop.PointerConvertible, optionName: string, p3: number): interop.Pointer;

declare function Ttk_CreateResourceCache(p1: interop.PointerConvertible): interop.Pointer;

declare function Ttk_FreeResourceCache(p1: interop.PointerConvertible): void;

declare function Ttk_GetResourceCache(p1: interop.PointerConvertible): interop.Pointer;

declare function Ttk_UseFont(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): interop.Pointer;

declare function Ttk_UseColor(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): interop.Pointer;

declare function Ttk_UseBorder(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): interop.Pointer;

declare function Ttk_UseImage(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): interop.Pointer;

declare function Ttk_RegisterNamedColor(p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible): void;

declare function TtkGetImageSpec(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): interop.Pointer;

declare function TtkFreeImageSpec(p1: interop.PointerConvertible): void;

declare function TtkSelectImage(p1: interop.PointerConvertible, p2: number): interop.Pointer;

declare function Ttk_GetButtonDefaultStateFromObj(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function Ttk_GetCompoundFromObj(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function Ttk_InvokeEnsemble(commands: interop.PointerConvertible, cmdIndex: number, clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TtkEnumerateHashTable(p1: interop.PointerConvertible, p2: interop.PointerConvertible): number;

declare function TtkArrowSize(h: number, p2: interop.Enum<typeof ArrowDirection>, widthPtr: interop.PointerConvertible, heightPtr: interop.PointerConvertible): void;

declare function TtkDrawArrow(p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, Ttk_Box: number, p5: interop.Enum<typeof ArrowDirection>): void;

declare function TtkFillArrow(p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, Ttk_Box: number, p5: interop.Enum<typeof ArrowDirection>): void;

declare function TkFontParseXLFD(string: string, faPtr: interop.PointerConvertible, xaPtr: interop.PointerConvertible): number;

declare function TkFontGetAliasList(faceName: string): interop.Pointer;

declare function TkFontGetFallbacks(): interop.Pointer;

declare function TkFontGetPixels(tkwin: interop.PointerConvertible, size: number): number;

declare function TkFontGetPoints(tkwin: interop.PointerConvertible, size: number): number;

declare function TkFontGetGlobalClass(): interop.Pointer;

declare function TkFontGetSymbolClass(): interop.Pointer;

declare function TkCreateNamedFont(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, name: string, faPtr: interop.PointerConvertible): number;

declare function TkDeleteNamedFont(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible, name: string): number;

declare function TkFontGetFirstTextLayout(layout: interop.PointerConvertible, font: interop.PointerConvertible, dst: string): number;

declare function TkpDeleteFont(tkFontPtr: interop.PointerConvertible): void;

declare function TkpFontPkgInit(mainPtr: interop.PointerConvertible): void;

declare function TkpGetFontFromAttributes(tkFontPtr: interop.PointerConvertible, tkwin: interop.PointerConvertible, faPtr: interop.PointerConvertible): interop.Pointer;

declare function TkpGetFontFamilies(interp: interop.PointerConvertible, tkwin: interop.PointerConvertible): void;

declare function TkpGetNativeFont(tkwin: interop.PointerConvertible, name: string): interop.Pointer;


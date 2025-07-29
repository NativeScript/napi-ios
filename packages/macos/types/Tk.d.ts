/// <reference types="@nativescript/objc-node-api" />

declare const xBitReverseTable: unknown /* const array */;

declare const TtkNullElementOptions: interop.Pointer;

declare const tkIntPlatStubsPtr: interop.Pointer;

declare const tkMacOSXEmbedHandler: interop.Pointer;

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

declare const tkImgFmtGIF: Tk_PhotoImageFormat;

declare const Ttk_ElementClass: number;

declare const Ttk_Theme: number;

declare const Ttk_Padding: number;

declare const LU_IGNORE: number;

declare const ttkNullElementSpec: Ttk_ElementSpec;

declare const Ttk_StateMap: number;

declare const tkBezierSmoothMethod: Tk_SmoothMethod;

declare const tkOptionObjType: Tcl_ObjType;

declare const Tcl_Obj: number;

declare const tkBorderObjType: Tcl_ObjType;

declare const tkBitmapImageType: Tk_ImageType;

declare const XClassHint: number;

declare const tkTextIndexType: Tcl_ObjType;

declare const tkIntXlibStubsPtr: interop.Pointer;

declare const ttkStubsPtr: interop.Pointer;

declare const tkHandleEventProc: (p1: interop.PointerConvertible) => void;

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

declare const XIMStatusDataType: {
  Text: 0,
  Bitmap: 1,
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

declare const Ttk_Side: {
  LEFT: 0,
  TOP: 1,
  RIGHT: 2,
  BOTTOM: 3,
};

declare const XICCEncodingStyle: {
  String: 0,
  CompoundText: 1,
  Text: 2,
  StdICCText: 3,
};

declare const Ttk_Orient: {
  HORIZONT: 0,
  VERTIC: 1,
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

declare class TkIntStubHooks {
  constructor(init?: TkIntStubHooks);
}

declare class TkWindowPrivate {
  constructor(init?: TkWindowPrivate);
  winPtr: interop.Pointer;
  view: NSView | null;
  context: interop.Pointer;
  xOff: number;
  yOff: number;
  size: CGSize;
  visRgn: interop.Pointer;
  aboveVisRgn: interop.Pointer;
  drawRgn: interop.Pointer;
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

declare class TkClipboardTarget {
  constructor(init?: TkClipboardTarget);
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
  lockUsage: interop.Enum<typeof TkDisplay::(unnamed at /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX15.5.sdk/System/Library/Frameworks/Tk.framework/Headers/tk-private/tkInt.h:209:5)>;
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

declare class _XIMStatusDrawCallbackStruct {
  constructor(init?: _XIMStatusDrawCallbackStruct);
  type: interop.Enum<typeof XIMStatusDataType>;
  data: unnamed_4832909701413217176;
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
  data: unnamed_14199968436853847722;
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

declare class unnamed_1843488119328023465 {
  constructor(init?: unnamed_1843488119328023465);
  defaultCCCs: string | null;
  clientCmaps: string | null;
  perVisualIntensityMaps: string | null;
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

declare class XColor {
  constructor(init?: XColor);
  pixel: number;
  red: number;
  green: number;
  blue: number;
  flags: number;
  pad: number;
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
  cms: unnamed_1843488119328023465;
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

declare class unnamed_11692276042080515452 {
  constructor(init?: unnamed_11692276042080515452);
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

declare class unnamed_6996903127573615657 {
  constructor(init?: unnamed_6996903127573615657);
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

declare class XClassHint {
  constructor(init?: XClassHint);
  res_name: string | null;
  res_class: string | null;
}

declare class unnamed_15824078094813179419 {
  constructor(init?: unnamed_15824078094813179419);
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

declare class unnamed_16362221333588553264 {
  constructor(init?: unnamed_16362221333588553264);
  x: number;
  y: number;
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
  min_aspect: unnamed_16362221333588553264;
  max_aspect: unnamed_16362221333588553264;
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
  value: unnamed_7374624010445545990;
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

declare class XRectangle {
  constructor(init?: XRectangle);
  x: number;
  y: number;
  width: number;
  height: number;
}

declare class TkIntXlibStubs {
  constructor(init?: TkIntXlibStubs);
  magic: number;
  hooks: interop.Pointer;
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

declare class unnamed_4349523988261055836 {
  constructor(init?: unnamed_4349523988261055836);
  value: interop.Pointer;
  encoding: number;
  format: number;
  nitems: number;
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

declare class TkpGCCache {
  constructor(init?: TkpGCCache);
  cachedForeground: number;
  cachedForegroundColor: interop.Pointer;
  cachedBackground: number;
  cachedBackgroundColor: interop.Pointer;
}

declare class _XIMPreeditCaretCallbackStruct {
  constructor(init?: _XIMPreeditCaretCallbackStruct);
  position: number;
  direction: interop.Enum<typeof XIMCaretDirection>;
  style: interop.Enum<typeof XIMCaretStyle>;
}

declare class TkIntXlibStubHooks {
  constructor(init?: TkIntXlibStubHooks);
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

declare class TkFontInfo {
  constructor(init?: TkFontInfo);
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

declare class TtkStubHooks {
  constructor(init?: TtkStubHooks);
}

declare class TkpCursor_ {
  constructor(init?: TkpCursor_);
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

declare class TkXLFDAttributes {
  constructor(init?: TkXLFDAttributes);
  foundry: string | null;
  slant: number;
  setwidth: number;
  charset: string | null;
}

declare class TkStateMap {
  constructor(init?: TkStateMap);
  numKey: number;
  strKey: string | null;
}

declare class TkSelectionInfo {
  constructor(init?: TkSelectionInfo);
}

declare class ElArray {
  constructor(init?: ElArray);
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

declare class _XIMText {
  constructor(init?: _XIMText);
  length: number;
  feedback: interop.Pointer;
  encoding_is_wchar: number;
  string: unnamed_15897253141913602080;
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

type unnamed_4832909701413217176Descriptor = 
  | { text: interop.PointerConvertible }
  | { bitmap: number };

declare class unnamed_4832909701413217176 {
  constructor(init?: unnamed_4832909701413217176Descriptor);
  text: interop.Pointer;
  bitmap: number;
}

type unnamed_15897253141913602080Descriptor = 
  | { multi_byte: string | null }
  | { wide_char: interop.PointerConvertible };

declare class unnamed_15897253141913602080 {
  constructor(init?: unnamed_15897253141913602080Descriptor);
  multi_byte: string | null;
  wide_char: interop.Pointer;
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

type unnamed_14199968436853847722Descriptor = 
  | { b: unknown /* const array */ }
  | { s: unknown /* const array */ }
  | { l: unknown /* const array */ };

declare class unnamed_14199968436853847722 {
  constructor(init?: unnamed_14199968436853847722Descriptor);
  b: unknown /* const array */;
  s: unknown /* const array */;
  l: unknown /* const array */;
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

type unnamed_7374624010445545990Descriptor = 
  | { pixmap: number }
  | { region: interop.PointerConvertible };

declare class unnamed_7374624010445545990 {
  constructor(init?: unnamed_7374624010445545990Descriptor);
  pixmap: number;
  region: interop.Pointer;
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


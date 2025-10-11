/// <reference types="@nativescript/objc-node-api" />

declare const tclEmptyString: number;

declare const tclEmptyStringRep: string;

declare const tclOneWordHashKeyType: Tcl_HashKeyType;

declare const tclArrayHashKeyType: Tcl_HashKeyType;

declare const tclProcBodyType: Tcl_ObjType;

declare const tclListType: Tcl_ObjType;

declare const tclIntType: Tcl_ObjType;

declare const tclEndOffsetType: Tcl_ObjType;

declare const tclByteArrayType: Tcl_ObjType;

declare const tclTimeClientData: interop.Pointer;

declare const tclScaleTimeProcPtr: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void;

declare const tclOriginalNotifier: Tcl_NotifierProcs;

declare const tclPlatform: interop.Enum<typeof TclPlatformType>;

declare const tclFindExecutableSearchDone: number;

declare const TclBNMpSRmap: string;

declare const ltm_prime_tab: interop.Pointer;

declare const TclBNToomMulCutoff: number;

declare const TclBNKaratsubaMulCutoff: number;

declare const tclGetTimeProcPtr: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void;

declare const tclIntStubsPtr: interop.Pointer;

declare const tclIntPlatStubsPtr: interop.Pointer;

declare const tclByteCodeType: Tcl_ObjType;

declare const tclEnsembleCmdType: Tcl_ObjType;

declare const tclJumptableInfoType: AuxDataType;

declare const tclFreeObjList: interop.Pointer;

declare const tclObjHashKeyType: Tcl_HashKeyType;

declare const tclNativeExecutableName: string;

declare const tclPlatStubsPtr: interop.Pointer;

declare const tclDictType: Tcl_ObjType;

declare const tclDoubleType: Tcl_ObjType;

declare const tclStubsPtr: interop.Pointer;

declare const tclBooleanType: Tcl_ObjType;

declare const TclBNKaratsubaSqrCutoff: number;

declare const tclInstructionTable: interop.Pointer;

declare const TclBNToomSqrCutoff: number;

declare const tclRegexpType: Tcl_ObjType;

declare const tclForeachInfoType: AuxDataType;

declare const tclStringHashKeyType: Tcl_HashKeyType;

declare const tclMemDumpFileName: string;

declare const tclBignumType: Tcl_ObjType;

declare const tclStringType: Tcl_ObjType;

declare const tclDictUpdateInfoType: AuxDataType;

declare const tclArraySearchType: Tcl_ObjType;

declare const TclJumpType: {
  UNCONDITIONAL_: 0,
  TRUE_: 1,
  FALSE_: 2,
};

declare const Tcl_PathPart: {
  DIRNAME: 0,
  TAIL: 1,
  EXTENSION: 2,
  ROOT: 3,
};

declare const TclPlatformType: {
  UNIX: 0,
  WINDOWS: 2,
};

declare const ExceptionRangeType: {
  LOOP_: 0,
  CATCH_: 1,
};

declare const Tcl_ValueType: {
  INT: 0,
  DOUBLE: 1,
  EITHER: 2,
  WIDE_INT: 3,
};

declare const Tcl_PathType: {
  ABSOLUT: 0,
  RELATIV: 1,
  VOLUME_RELATIV: 2,
};

declare const PkgPreferOptions: {
  LATEST: 0,
  STABLE: 1,
};

declare const InstOperandType: {
  NONE: 0,
  INT1: 1,
  INT4: 2,
  UINT1: 3,
  UINT4: 4,
  IDX4: 5,
  LVT1: 6,
  LVT4: 7,
  AUX4: 8,
};

declare const TclEolTranslation: {
  AUTO: 0,
  CR: 1,
  LF: 2,
  CRLF: 3,
};

declare const Tcl_QueuePosition: {
  TAIL: 0,
  HEAD: 1,
  MARK: 2,
};

declare class TclOpCmdClientData {
  constructor(init?: TclOpCmdClientData);
  op: string | null;
  expected: string | null;
  i: unnamed_6097424430779907637;
}

declare class DictUpdateInfo {
  constructor(init?: DictUpdateInfo);
  length: number;
  varIndices: unknown /* const array */;
}

declare class JumpFixup {
  constructor(init?: JumpFixup);
  jumpType: interop.Enum<typeof TclJumpType>;
  codeOffset: number;
  cmdIndex: number;
  exceptIndex: number;
}

declare class AuxData {
  constructor(init?: AuxData);
  type: interop.Pointer;
  clientData: interop.Pointer;
}

declare class ExtCmdLoc {
  constructor(init?: ExtCmdLoc);
  type: number;
  start: number;
  path: interop.Pointer;
  loc: interop.Pointer;
  nloc: number;
  nuloc: number;
  litInfo: Tcl_HashTable;
}

declare class CmdLocation {
  constructor(init?: CmdLocation);
  codeOffset: number;
  numCodeBytes: number;
  srcOffset: number;
  numSrcBytes: number;
}

declare class ByteCode {
  constructor(init?: ByteCode);
  interpHandle: interop.Pointer;
  compileEpoch: number;
  nsPtr: interop.Pointer;
  nsEpoch: number;
  refCount: number;
  flags: number;
  source: string | null;
  procPtr: interop.Pointer;
  structureSize: number;
  numCommands: number;
  numSrcBytes: number;
  numCodeBytes: number;
  numLitObjects: number;
  numExceptRanges: number;
  numAuxDataItems: number;
  numCmdLocBytes: number;
  maxExceptDepth: number;
  maxStackDepth: number;
  codeStart: interop.Pointer;
  objArrayPtr: interop.Pointer;
  exceptArrayPtr: interop.Pointer;
  auxDataArrayPtr: interop.Pointer;
  codeDeltaStart: interop.Pointer;
  codeLengthStart: interop.Pointer;
  srcDeltaStart: interop.Pointer;
  srcLengthStart: interop.Pointer;
  localCachePtr: interop.Pointer;
}

declare class TclIntStubHooks {
  constructor(init?: TclIntStubHooks);
}

declare class InterpList {
  constructor(init?: InterpList);
  interpPtr: interop.Pointer;
  prevPtr: interop.Pointer;
  nextPtr: interop.Pointer;
}

declare class LimitHandler {
  constructor(init?: LimitHandler);
  flags: number;
  handlerProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  clientData: interop.Pointer;
  deleteProc: (p1: interop.PointerConvertible) => void | null;
  prevPtr: interop.Pointer;
  nextPtr: interop.Pointer;
}

declare class ExecEnv {
  constructor(init?: ExecEnv);
  execStackPtr: interop.Pointer;
  constants: unknown /* const array */;
}

declare class CompileEnv {
  constructor(init?: CompileEnv);
  iPtr: interop.Pointer;
  source: string | null;
  numSrcBytes: number;
  procPtr: interop.Pointer;
  numCommands: number;
  exceptDepth: number;
  maxExceptDepth: number;
  maxStackDepth: number;
  currStackDepth: number;
  localLitTable: LiteralTable;
  codeStart: interop.Pointer;
  codeNext: interop.Pointer;
  codeEnd: interop.Pointer;
  mallocedCodeArray: number;
  literalArrayPtr: interop.Pointer;
  literalArrayNext: number;
  literalArrayEnd: number;
  mallocedLiteralArray: number;
  exceptArrayPtr: interop.Pointer;
  exceptArrayNext: number;
  exceptArrayEnd: number;
  mallocedExceptArray: number;
  cmdMapPtr: interop.Pointer;
  cmdMapEnd: number;
  mallocedCmdMap: number;
  auxDataArrayPtr: interop.Pointer;
  auxDataArrayNext: number;
  auxDataArrayEnd: number;
  mallocedAuxDataArray: number;
  staticCodeSpace: unknown /* const array */;
  staticLiteralSpace: unknown /* const array */;
  staticExceptArraySpace: unknown /* const array */;
  staticCmdMapSpace: unknown /* const array */;
  staticAuxDataArraySpace: unknown /* const array */;
  extCmdMapPtr: interop.Pointer;
  line: number;
  atCmdStart: number;
  clLoc: interop.Pointer;
  clNext: interop.Pointer;
}

declare class ExtraFrameInfoField {
  constructor(init?: ExtraFrameInfoField);
  name: string | null;
  proc: (p1: interop.PointerConvertible) => interop.Pointer | null;
  clientData: interop.Pointer;
}

declare class ContLineLoc {
  constructor(init?: ContLineLoc);
  num: number;
  loc: unknown /* const array */;
}

declare class CFWord {
  constructor(init?: CFWord);
  framePtr: interop.Pointer;
  word: number;
  refCount: number;
}

declare class unnamed_7457919095575956670 {
  constructor(init?: unnamed_7457919095575956670);
  path: interop.Pointer;
}

declare class CmdFrame {
  constructor(init?: CmdFrame);
  type: number;
  level: number;
  line: interop.Pointer;
  nline: number;
  framePtr: interop.Pointer;
  nextPtr: interop.Pointer;
  data: unnamed_9065905938125104667;
  cmd: unnamed_17606793356190368671;
}

declare class AssocData {
  constructor(init?: AssocData);
  proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  clientData: interop.Pointer;
}

declare class Trace {
  constructor(init?: Trace);
  level: number;
  proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: string, p5: interop.PointerConvertible, p6: number, p7: interop.PointerConvertible) => number | null;
  clientData: interop.Pointer;
  nextPtr: interop.Pointer;
  flags: number;
  delProc: (p1: interop.PointerConvertible) => void | null;
}

declare class Interp {
  constructor(init?: Interp);
  result: string | null;
  freeProc: (p1: string) => void | null;
  errorLine: number;
  stubTable: interop.Pointer;
  handle: interop.Pointer;
  globalNsPtr: interop.Pointer;
  hiddenCmdTablePtr: interop.Pointer;
  interpInfo: interop.Pointer;
  unused2: Tcl_HashTable;
  numLevels: number;
  maxNestingDepth: number;
  framePtr: interop.Pointer;
  varFramePtr: interop.Pointer;
  activeVarTracePtr: interop.Pointer;
  returnCode: number;
  rootFramePtr: interop.Pointer;
  lookupNsPtr: interop.Pointer;
  appendResult: string | null;
  appendAvl: number;
  appendUsed: number;
  packageTable: Tcl_HashTable;
  packageUnknown: string | null;
  cmdCount: number;
  evalFlags: number;
  unused1: number;
  literalTable: LiteralTable;
  compileEpoch: number;
  compiledProcPtr: interop.Pointer;
  resolverPtr: interop.Pointer;
  scriptFile: interop.Pointer;
  flags: number;
  randSeed: number;
  tracePtr: interop.Pointer;
  assocData: interop.Pointer;
  execEnvPtr: interop.Pointer;
  emptyObjPtr: interop.Pointer;
  resultSpace: unknown /* const array */;
  objResultPtr: interop.Pointer;
  threadId: interop.Pointer;
  activeCmdTracePtr: interop.Pointer;
  activeInterpTracePtr: interop.Pointer;
  tracesForbiddingInline: number;
  returnOpts: interop.Pointer;
  errorInfo: interop.Pointer;
  eiVar: interop.Pointer;
  errorCode: interop.Pointer;
  ecVar: interop.Pointer;
  returnLevel: number;
  limit: unnamed_3918308343247493790;
  ensembleRewrite: unnamed_16593889917611252292;
  chanMsg: interop.Pointer;
  cmdFramePtr: interop.Pointer;
  invokeCmdFramePtr: interop.Pointer;
  invokeWord: number;
  linePBodyPtr: interop.Pointer;
  lineBCPtr: interop.Pointer;
  lineLABCPtr: interop.Pointer;
  lineLAPtr: interop.Pointer;
  scriptCLLocPtr: interop.Pointer;
  packagePrefer: number;
  varTraces: Tcl_HashTable;
  varSearches: Tcl_HashTable;
  allocCache: interop.Pointer;
  pendingObjDataPtr: interop.Pointer;
  asyncReadyPtr: interop.Pointer;
  stackBound: interop.Pointer;
}

declare class TclIntPlatStubHooks {
  constructor(init?: TclIntPlatStubHooks);
}

declare class CompiledLocal {
  constructor(init?: CompiledLocal);
  nextPtr: interop.Pointer;
  nameLength: number;
  frameIndex: number;
  flags: number;
  defValuePtr: interop.Pointer;
  resolveInfo: interop.Pointer;
  name: unknown /* const array */;
}

declare class Var {
  constructor(init?: Var);
  flags: number;
  value: unnamed_7604300924961546821;
}

declare class EnsembleCmdRep {
  constructor(init?: EnsembleCmdRep);
  nsPtr: interop.Pointer;
  epoch: number;
  token: interop.Pointer;
  fullSubcmdName: string | null;
  realPrefixObj: interop.Pointer;
}

declare class Namespace {
  constructor(init?: Namespace);
  name: string | null;
  fullName: string | null;
  clientData: interop.Pointer;
  deleteProc: (p1: interop.PointerConvertible) => void | null;
  parentPtr: interop.Pointer;
  childTable: Tcl_HashTable;
  nsId: number;
  interp: interop.Pointer;
  flags: number;
  activationCount: number;
  refCount: number;
  cmdTable: Tcl_HashTable;
  varTable: TclVarHashTable;
  exportArrayPtr: interop.Pointer;
  numExportPatterns: number;
  maxExportPatterns: number;
  cmdRefEpoch: number;
  resolverEpoch: number;
  cmdResProc: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible) => number | null;
  varResProc: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible) => number | null;
  compiledVarResProc: (p1: interop.PointerConvertible, p2: string, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number | null;
  exportLookupEpoch: number;
  ensembles: interop.Pointer;
  unknownHandlerPtr: interop.Pointer;
  commandPathLength: number;
  commandPathArray: interop.Pointer;
  commandPathSourceList: interop.Pointer;
}

declare class TclVarHashTable {
  constructor(init?: TclVarHashTable);
  table: Tcl_HashTable;
  nsPtr: interop.Pointer;
}

declare class Tcl_Ensemble {
  constructor(init?: Tcl_Ensemble);
}

declare class Command {
  constructor(init?: Command);
  hPtr: interop.Pointer;
  nsPtr: interop.Pointer;
  refCount: number;
  cmdEpoch: number;
  compileProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  objProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number | null;
  objClientData: interop.Pointer;
  proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number | null;
  clientData: interop.Pointer;
  deleteProc: (p1: interop.PointerConvertible) => void | null;
  deleteData: interop.Pointer;
  flags: number;
  importRefPtr: interop.Pointer;
  tracePtr: interop.Pointer;
}

declare class Tcl_ResolverInfo {
  constructor(init?: Tcl_ResolverInfo);
  cmdResProc: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible) => number | null;
  varResProc: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible) => number | null;
  compiledVarResProc: (p1: interop.PointerConvertible, p2: string, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number | null;
}

declare class ResolverScheme {
  constructor(init?: ResolverScheme);
  name: string | null;
  cmdResProc: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible) => number | null;
  varResProc: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible) => number | null;
  compiledVarResProc: (p1: interop.PointerConvertible, p2: string, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number | null;
  nextPtr: interop.Pointer;
}

declare class LocalCache {
  constructor(init?: LocalCache);
  refCount: number;
  numVars: number;
  varName0: interop.Pointer;
}

declare class LiteralEntry {
  constructor(init?: LiteralEntry);
  nextPtr: interop.Pointer;
  objPtr: interop.Pointer;
  refCount: number;
  nsPtr: interop.Pointer;
}

declare class CFWordBC {
  constructor(init?: CFWordBC);
  framePtr: interop.Pointer;
  pc: number;
  word: number;
  prevPtr: interop.Pointer;
}

declare class ExceptionRange {
  constructor(init?: ExceptionRange);
  type: interop.Enum<typeof ExceptionRangeType>;
  nestingLevel: number;
  codeOffset: number;
  numCodeBytes: number;
  breakOffset: number;
  continueOffset: number;
  catchOffset: number;
}

declare class ImportRef {
  constructor(init?: ImportRef);
  importedCmdPtr: interop.Pointer;
  nextPtr: interop.Pointer;
}

declare class TclFileAttrProcs {
  constructor(init?: TclFileAttrProcs);
  getProc: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  setProc: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
}

declare class TclPlatStubHooks {
  constructor(init?: TclPlatStubHooks);
}

declare class TclStubs {
  constructor(init?: TclStubs);
  magic: number;
  hooks: interop.Pointer;
  tcl_PkgProvideEx: (p1: interop.PointerConvertible, p2: string, p3: string, p4: interop.PointerConvertible) => number | null;
  tcl_PkgRequireEx: (p1: interop.PointerConvertible, p2: string, p3: string, p4: number, p5: interop.PointerConvertible) => string | null;
  tcl_Panic: (p1: string) => void | null;
  tcl_Alloc: (p1: number) => string | null;
  tcl_Free: (p1: string) => void | null;
  tcl_Realloc: (p1: string, p2: number) => string | null;
  tcl_DbCkalloc: (p1: number, p2: string, p3: number) => string | null;
  tcl_DbCkfree: (p1: string, p2: string, p3: number) => number | null;
  tcl_DbCkrealloc: (p1: string, p2: number, p3: string, p4: number) => string | null;
  tcl_CreateFileHandler: (p1: number, p2: number, p3: (p1: interop.PointerConvertible, p2: number) => void, p4: interop.PointerConvertible) => void | null;
  tcl_DeleteFileHandler: (p1: number) => void | null;
  tcl_SetTimer: (p1: interop.PointerConvertible) => void | null;
  tcl_Sleep: (p1: number) => void | null;
  tcl_WaitForEvent: (p1: interop.PointerConvertible) => number | null;
  tcl_AppendAllObjTypes: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tcl_AppendStringsToObj: (p1: interop.PointerConvertible) => void | null;
  tcl_AppendToObj: (p1: interop.PointerConvertible, p2: string, p3: number) => void | null;
  tcl_ConcatObj: (p1: number, p2: interop.PointerConvertible) => interop.Pointer | null;
  tcl_ConvertToType: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_DbDecrRefCount: (p1: interop.PointerConvertible, p2: string, p3: number) => void | null;
  tcl_DbIncrRefCount: (p1: interop.PointerConvertible, p2: string, p3: number) => void | null;
  tcl_DbIsShared: (p1: interop.PointerConvertible, p2: string, p3: number) => number | null;
  tcl_DbNewBooleanObj: (p1: number, p2: string, p3: number) => interop.Pointer | null;
  tcl_DbNewByteArrayObj: (p1: interop.PointerConvertible, p2: number, p3: string, p4: number) => interop.Pointer | null;
  tcl_DbNewDoubleObj: (p1: number, p2: string, p3: number) => interop.Pointer | null;
  tcl_DbNewListObj: (p1: number, p2: interop.PointerConvertible, p3: string, p4: number) => interop.Pointer | null;
  tcl_DbNewLongObj: (p1: number, p2: string, p3: number) => interop.Pointer | null;
  tcl_DbNewObj: (p1: string, p2: number) => interop.Pointer | null;
  tcl_DbNewStringObj: (p1: string, p2: number, p3: string, p4: number) => interop.Pointer | null;
  tcl_DuplicateObj: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tclFreeObj: (p1: interop.PointerConvertible) => void | null;
  tcl_GetBoolean: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible) => number | null;
  tcl_GetBooleanFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_GetByteArrayFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer | null;
  tcl_GetDouble: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible) => number | null;
  tcl_GetDoubleFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_GetIndexFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: string, p5: number, p6: interop.PointerConvertible) => number | null;
  tcl_GetInt: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible) => number | null;
  tcl_GetIntFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_GetLongFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_GetObjType: (p1: string) => interop.Pointer | null;
  tcl_GetStringFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => string | null;
  tcl_InvalidateStringRep: (p1: interop.PointerConvertible) => void | null;
  tcl_ListObjAppendList: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_ListObjAppendElement: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_ListObjGetElements: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  tcl_ListObjIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number | null;
  tcl_ListObjLength: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_ListObjReplace: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: number, p6: interop.PointerConvertible) => number | null;
  tcl_NewBooleanObj: (p1: number) => interop.Pointer | null;
  tcl_NewByteArrayObj: (p1: interop.PointerConvertible, p2: number) => interop.Pointer | null;
  tcl_NewDoubleObj: (p1: number) => interop.Pointer | null;
  tcl_NewIntObj: (p1: number) => interop.Pointer | null;
  tcl_NewListObj: (p1: number, p2: interop.PointerConvertible) => interop.Pointer | null;
  tcl_NewLongObj: (p1: number) => interop.Pointer | null;
  tcl_NewObj: () => interop.Pointer | null;
  tcl_NewStringObj: (p1: string, p2: number) => interop.Pointer | null;
  tcl_SetBooleanObj: (p1: interop.PointerConvertible, p2: number) => void | null;
  tcl_SetByteArrayLength: (p1: interop.PointerConvertible, p2: number) => interop.Pointer | null;
  tcl_SetByteArrayObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => void | null;
  tcl_SetDoubleObj: (p1: interop.PointerConvertible, p2: number) => void | null;
  tcl_SetIntObj: (p1: interop.PointerConvertible, p2: number) => void | null;
  tcl_SetListObj: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void | null;
  tcl_SetLongObj: (p1: interop.PointerConvertible, p2: number) => void | null;
  tcl_SetObjLength: (p1: interop.PointerConvertible, p2: number) => void | null;
  tcl_SetStringObj: (p1: interop.PointerConvertible, p2: string, p3: number) => void | null;
  tcl_AddErrorInfo: (p1: interop.PointerConvertible, p2: string) => void | null;
  tcl_AddObjErrorInfo: (p1: interop.PointerConvertible, p2: string, p3: number) => void | null;
  tcl_AllowExceptions: (p1: interop.PointerConvertible) => void | null;
  tcl_AppendElement: (p1: interop.PointerConvertible, p2: string) => void | null;
  tcl_AppendResult: (p1: interop.PointerConvertible) => void | null;
  tcl_AsyncCreate: (p1: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => number, p2: interop.PointerConvertible) => interop.Pointer | null;
  tcl_AsyncDelete: (p1: interop.PointerConvertible) => void | null;
  tcl_AsyncInvoke: (p1: interop.PointerConvertible, p2: number) => number | null;
  tcl_AsyncMark: (p1: interop.PointerConvertible) => void | null;
  tcl_AsyncReady: () => number | null;
  tcl_BackgroundError: (p1: interop.PointerConvertible) => void | null;
  tcl_Backslash: (p1: string, p2: interop.PointerConvertible) => number | null;
  tcl_BadChannelOption: (p1: interop.PointerConvertible, p2: string, p3: string) => number | null;
  tcl_CallWhenDeleted: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, p3: interop.PointerConvertible) => void | null;
  tcl_CancelIdleCall: (p1: (p1: interop.PointerConvertible) => void, p2: interop.PointerConvertible) => void | null;
  tcl_Close: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tcl_CommandComplete: (p1: string) => number | null;
  tcl_Concat: (p1: number, p2: interop.PointerConvertible) => string | null;
  tcl_ConvertElement: (p1: string, p2: string, p3: number) => number | null;
  tcl_ConvertCountedElement: (p1: string, p2: number, p3: string, p4: number) => number | null;
  tcl_CreateAlias: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: string, p5: number, p6: interop.PointerConvertible) => number | null;
  tcl_CreateAliasObj: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: string, p5: number, p6: interop.PointerConvertible) => number | null;
  tcl_CreateChannel: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: number) => interop.Pointer | null;
  tcl_CreateChannelHandler: (p1: interop.PointerConvertible, p2: number, p3: (p1: interop.PointerConvertible, p2: number) => void, p4: interop.PointerConvertible) => void | null;
  tcl_CreateCloseHandler: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible) => void, p3: interop.PointerConvertible) => void | null;
  tcl_CreateCommand: (p1: interop.PointerConvertible, p2: string, p3: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number, p4: interop.PointerConvertible, p5: (p1: interop.PointerConvertible) => void) => interop.Pointer | null;
  tcl_CreateEventSource: (p1: (p1: interop.PointerConvertible, p2: number) => void, p2: (p1: interop.PointerConvertible, p2: number) => void, p3: interop.PointerConvertible) => void | null;
  tcl_CreateExitHandler: (p1: (p1: interop.PointerConvertible) => void, p2: interop.PointerConvertible) => void | null;
  tcl_CreateInterp: () => interop.Pointer | null;
  tcl_CreateMathFunc: (p1: interop.PointerConvertible, p2: string, p3: number, p4: interop.PointerConvertible, p5: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number, p6: interop.PointerConvertible) => void | null;
  tcl_CreateObjCommand: (p1: interop.PointerConvertible, p2: string, p3: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number, p4: interop.PointerConvertible, p5: (p1: interop.PointerConvertible) => void) => interop.Pointer | null;
  tcl_CreateSlave: (p1: interop.PointerConvertible, p2: string, p3: number) => interop.Pointer | null;
  tcl_CreateTimerHandler: (p1: number, p2: (p1: interop.PointerConvertible) => void, p3: interop.PointerConvertible) => interop.Pointer | null;
  tcl_CreateTrace: (p1: interop.PointerConvertible, p2: number, p3: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: string, p5: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number, p6: interop.PointerConvertible, p7: number, p8: interop.PointerConvertible) => void, p4: interop.PointerConvertible) => interop.Pointer | null;
  tcl_DeleteAssocData: (p1: interop.PointerConvertible, p2: string) => void | null;
  tcl_DeleteChannelHandler: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: number) => void, p3: interop.PointerConvertible) => void | null;
  tcl_DeleteCloseHandler: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible) => void, p3: interop.PointerConvertible) => void | null;
  tcl_DeleteCommand: (p1: interop.PointerConvertible, p2: string) => number | null;
  tcl_DeleteCommandFromToken: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tcl_DeleteEvents: (p1: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number, p2: interop.PointerConvertible) => void | null;
  tcl_DeleteEventSource: (p1: (p1: interop.PointerConvertible, p2: number) => void, p2: (p1: interop.PointerConvertible, p2: number) => void, p3: interop.PointerConvertible) => void | null;
  tcl_DeleteExitHandler: (p1: (p1: interop.PointerConvertible) => void, p2: interop.PointerConvertible) => void | null;
  tcl_DeleteHashEntry: (p1: interop.PointerConvertible) => void | null;
  tcl_DeleteHashTable: (p1: interop.PointerConvertible) => void | null;
  tcl_DeleteInterp: (p1: interop.PointerConvertible) => void | null;
  tcl_DetachPids: (p1: number, p2: interop.PointerConvertible) => void | null;
  tcl_DeleteTimerHandler: (p1: interop.PointerConvertible) => void | null;
  tcl_DeleteTrace: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tcl_DontCallWhenDeleted: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, p3: interop.PointerConvertible) => void | null;
  tcl_DoOneEvent: (p1: number) => number | null;
  tcl_DoWhenIdle: (p1: (p1: interop.PointerConvertible) => void, p2: interop.PointerConvertible) => void | null;
  tcl_DStringAppend: (p1: interop.PointerConvertible, p2: string, p3: number) => string | null;
  tcl_DStringAppendElement: (p1: interop.PointerConvertible, p2: string) => string | null;
  tcl_DStringEndSublist: (p1: interop.PointerConvertible) => void | null;
  tcl_DStringFree: (p1: interop.PointerConvertible) => void | null;
  tcl_DStringGetResult: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tcl_DStringInit: (p1: interop.PointerConvertible) => void | null;
  tcl_DStringResult: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tcl_DStringSetLength: (p1: interop.PointerConvertible, p2: number) => void | null;
  tcl_DStringStartSublist: (p1: interop.PointerConvertible) => void | null;
  tcl_Eof: (p1: interop.PointerConvertible) => number | null;
  tcl_ErrnoId: () => string | null;
  tcl_ErrnoMsg: (p1: number) => string | null;
  tcl_Eval: (p1: interop.PointerConvertible, p2: string) => number | null;
  tcl_EvalFile: (p1: interop.PointerConvertible, p2: string) => number | null;
  tcl_EvalObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tcl_EventuallyFree: (p1: interop.PointerConvertible, p2: (p1: string) => void) => void | null;
  tcl_Exit: (p1: number) => void | null;
  tcl_ExposeCommand: (p1: interop.PointerConvertible, p2: string, p3: string) => number | null;
  tcl_ExprBoolean: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible) => number | null;
  tcl_ExprBooleanObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_ExprDouble: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible) => number | null;
  tcl_ExprDoubleObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_ExprLong: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible) => number | null;
  tcl_ExprLongObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_ExprObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_ExprString: (p1: interop.PointerConvertible, p2: string) => number | null;
  tcl_Finalize: () => void | null;
  tcl_FindExecutable: (p1: string) => void | null;
  tcl_FirstHashEntry: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer | null;
  tcl_Flush: (p1: interop.PointerConvertible) => number | null;
  tcl_FreeResult: (p1: interop.PointerConvertible) => void | null;
  tcl_GetAlias: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible) => number | null;
  tcl_GetAliasObj: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible) => number | null;
  tcl_GetAssocData: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible) => interop.Pointer | null;
  tcl_GetChannel: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible) => interop.Pointer | null;
  tcl_GetChannelBufferSize: (p1: interop.PointerConvertible) => number | null;
  tcl_GetChannelHandle: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  tcl_GetChannelInstanceData: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tcl_GetChannelMode: (p1: interop.PointerConvertible) => number | null;
  tcl_GetChannelName: (p1: interop.PointerConvertible) => string | null;
  tcl_GetChannelOption: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: interop.PointerConvertible) => number | null;
  tcl_GetChannelType: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tcl_GetCommandInfo: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible) => number | null;
  tcl_GetCommandName: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => string | null;
  tcl_GetErrno: () => number | null;
  tcl_GetHostName: () => string | null;
  tcl_GetInterpPath: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tcl_GetMaster: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tcl_GetNameOfExecutable: () => string | null;
  tcl_GetObjResult: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tcl_GetOpenFile: (p1: interop.PointerConvertible, p2: string, p3: number, p4: number, p5: interop.PointerConvertible) => number | null;
  tcl_GetPathType: (p1: string) => interop.Enum<typeof Tcl_PathType> | null;
  tcl_Gets: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tcl_GetsObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tcl_GetServiceMode: () => number | null;
  tcl_GetSlave: (p1: interop.PointerConvertible, p2: string) => interop.Pointer | null;
  tcl_GetStdChannel: (p1: number) => interop.Pointer | null;
  tcl_GetStringResult: (p1: interop.PointerConvertible) => string | null;
  tcl_GetVar: (p1: interop.PointerConvertible, p2: string, p3: number) => string | null;
  tcl_GetVar2: (p1: interop.PointerConvertible, p2: string, p3: string, p4: number) => string | null;
  tcl_GlobalEval: (p1: interop.PointerConvertible, p2: string) => number | null;
  tcl_GlobalEvalObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tcl_HideCommand: (p1: interop.PointerConvertible, p2: string, p3: string) => number | null;
  tcl_Init: (p1: interop.PointerConvertible) => number | null;
  tcl_InitHashTable: (p1: interop.PointerConvertible, p2: number) => void | null;
  tcl_InputBlocked: (p1: interop.PointerConvertible) => number | null;
  tcl_InputBuffered: (p1: interop.PointerConvertible) => number | null;
  tcl_InterpDeleted: (p1: interop.PointerConvertible) => number | null;
  tcl_IsSafe: (p1: interop.PointerConvertible) => number | null;
  tcl_JoinPath: (p1: number, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => string | null;
  tcl_LinkVar: (p1: interop.PointerConvertible, p2: string, p3: string, p4: number) => number | null;
  reserved188: interop.Pointer;
  tcl_MakeFileChannel: (p1: interop.PointerConvertible, p2: number) => interop.Pointer | null;
  tcl_MakeSafe: (p1: interop.PointerConvertible) => number | null;
  tcl_MakeTcpClientChannel: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tcl_Merge: (p1: number, p2: interop.PointerConvertible) => string | null;
  tcl_NextHashEntry: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tcl_NotifyChannel: (p1: interop.PointerConvertible, p2: number) => void | null;
  tcl_ObjGetVar2: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number) => interop.Pointer | null;
  tcl_ObjSetVar2: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number) => interop.Pointer | null;
  tcl_OpenCommandChannel: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number) => interop.Pointer | null;
  tcl_OpenFileChannel: (p1: interop.PointerConvertible, p2: string, p3: string, p4: number) => interop.Pointer | null;
  tcl_OpenTcpClient: (p1: interop.PointerConvertible, p2: number, p3: string, p4: string, p5: number, p6: number) => interop.Pointer | null;
  tcl_OpenTcpServer: (p1: interop.PointerConvertible, p2: number, p3: string, p4: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: number) => void, p5: interop.PointerConvertible) => interop.Pointer | null;
  tcl_Preserve: (p1: interop.PointerConvertible) => void | null;
  tcl_PrintDouble: (p1: interop.PointerConvertible, p2: number, p3: string) => void | null;
  tcl_PutEnv: (p1: string) => number | null;
  tcl_PosixError: (p1: interop.PointerConvertible) => string | null;
  tcl_QueueEvent: (p1: interop.PointerConvertible, p2: interop.Enum<typeof Tcl_QueuePosition>) => void | null;
  tcl_Read: (p1: interop.PointerConvertible, p2: string, p3: number) => number | null;
  tcl_ReapDetachedProcs: () => void | null;
  tcl_RecordAndEval: (p1: interop.PointerConvertible, p2: string, p3: number) => number | null;
  tcl_RecordAndEvalObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => number | null;
  tcl_RegisterChannel: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tcl_RegisterObjType: (p1: interop.PointerConvertible) => void | null;
  tcl_RegExpCompile: (p1: interop.PointerConvertible, p2: string) => interop.Pointer | null;
  tcl_RegExpExec: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string) => number | null;
  tcl_RegExpMatch: (p1: interop.PointerConvertible, p2: string, p3: string) => number | null;
  tcl_RegExpRange: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void | null;
  tcl_Release: (p1: interop.PointerConvertible) => void | null;
  tcl_ResetResult: (p1: interop.PointerConvertible) => void | null;
  tcl_ScanElement: (p1: string, p2: interop.PointerConvertible) => number | null;
  tcl_ScanCountedElement: (p1: string, p2: number, p3: interop.PointerConvertible) => number | null;
  tcl_SeekOld: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  tcl_ServiceAll: () => number | null;
  tcl_ServiceEvent: (p1: number) => number | null;
  tcl_SetAssocData: (p1: interop.PointerConvertible, p2: string, p3: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, p4: interop.PointerConvertible) => void | null;
  tcl_SetChannelBufferSize: (p1: interop.PointerConvertible, p2: number) => void | null;
  tcl_SetChannelOption: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string) => number | null;
  tcl_SetCommandInfo: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible) => number | null;
  tcl_SetErrno: (p1: number) => void | null;
  tcl_SetErrorCode: (p1: interop.PointerConvertible) => void | null;
  tcl_SetMaxBlockTime: (p1: interop.PointerConvertible) => void | null;
  tcl_SetPanicProc: (p1: (p1: string) => void) => void | null;
  tcl_SetRecursionLimit: (p1: interop.PointerConvertible, p2: number) => number | null;
  tcl_SetResult: (p1: interop.PointerConvertible, p2: string, p3: (p1: string) => void) => void | null;
  tcl_SetServiceMode: (p1: number) => number | null;
  tcl_SetObjErrorCode: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tcl_SetObjResult: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tcl_SetStdChannel: (p1: interop.PointerConvertible, p2: number) => void | null;
  tcl_SetVar: (p1: interop.PointerConvertible, p2: string, p3: string, p4: number) => string | null;
  tcl_SetVar2: (p1: interop.PointerConvertible, p2: string, p3: string, p4: string, p5: number) => string | null;
  tcl_SignalId: (p1: number) => string | null;
  tcl_SignalMsg: (p1: number) => string | null;
  tcl_SourceRCFile: (p1: interop.PointerConvertible) => void | null;
  tcl_SplitList: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  tcl_SplitPath: (p1: string, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void | null;
  tcl_StaticPackage: (p1: interop.PointerConvertible, p2: string, p3: (p1: interop.PointerConvertible) => number, p4: (p1: interop.PointerConvertible) => number) => void | null;
  tcl_StringMatch: (p1: string, p2: string) => number | null;
  tcl_TellOld: (p1: interop.PointerConvertible) => number | null;
  tcl_TraceVar: (p1: interop.PointerConvertible, p2: string, p3: number, p4: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string, p5: number) => string, p5: interop.PointerConvertible) => number | null;
  tcl_TraceVar2: (p1: interop.PointerConvertible, p2: string, p3: string, p4: number, p5: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string, p5: number) => string, p6: interop.PointerConvertible) => number | null;
  tcl_TranslateFileName: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible) => string | null;
  tcl_Ungets: (p1: interop.PointerConvertible, p2: string, p3: number, p4: number) => number | null;
  tcl_UnlinkVar: (p1: interop.PointerConvertible, p2: string) => void | null;
  tcl_UnregisterChannel: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tcl_UnsetVar: (p1: interop.PointerConvertible, p2: string, p3: number) => number | null;
  tcl_UnsetVar2: (p1: interop.PointerConvertible, p2: string, p3: string, p4: number) => number | null;
  tcl_UntraceVar: (p1: interop.PointerConvertible, p2: string, p3: number, p4: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string, p5: number) => string, p5: interop.PointerConvertible) => void | null;
  tcl_UntraceVar2: (p1: interop.PointerConvertible, p2: string, p3: string, p4: number, p5: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string, p5: number) => string, p6: interop.PointerConvertible) => void | null;
  tcl_UpdateLinkedVar: (p1: interop.PointerConvertible, p2: string) => void | null;
  tcl_UpVar: (p1: interop.PointerConvertible, p2: string, p3: string, p4: string, p5: number) => number | null;
  tcl_UpVar2: (p1: interop.PointerConvertible, p2: string, p3: string, p4: string, p5: string, p6: number) => number | null;
  tcl_VarEval: (p1: interop.PointerConvertible) => number | null;
  tcl_VarTraceInfo: (p1: interop.PointerConvertible, p2: string, p3: number, p4: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string, p5: number) => string, p5: interop.PointerConvertible) => interop.Pointer | null;
  tcl_VarTraceInfo2: (p1: interop.PointerConvertible, p2: string, p3: string, p4: number, p5: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string, p5: number) => string, p6: interop.PointerConvertible) => interop.Pointer | null;
  tcl_Write: (p1: interop.PointerConvertible, p2: string, p3: number) => number | null;
  tcl_WrongNumArgs: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: string) => void | null;
  tcl_DumpActiveMemory: (p1: string) => number | null;
  tcl_ValidateAllMemory: (p1: string, p2: number) => void | null;
  tcl_AppendResultVA: (p1: interop.PointerConvertible, p2: string) => void | null;
  tcl_AppendStringsToObjVA: (p1: interop.PointerConvertible, p2: string) => void | null;
  tcl_HashStats: (p1: interop.PointerConvertible) => string | null;
  tcl_ParseVar: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible) => string | null;
  tcl_PkgPresent: (p1: interop.PointerConvertible, p2: string, p3: string, p4: number) => string | null;
  tcl_PkgPresentEx: (p1: interop.PointerConvertible, p2: string, p3: string, p4: number, p5: interop.PointerConvertible) => string | null;
  tcl_PkgProvide: (p1: interop.PointerConvertible, p2: string, p3: string) => number | null;
  tcl_PkgRequire: (p1: interop.PointerConvertible, p2: string, p3: string, p4: number) => string | null;
  tcl_SetErrorCodeVA: (p1: interop.PointerConvertible, p2: string) => void | null;
  tcl_VarEvalVA: (p1: interop.PointerConvertible, p2: string) => number | null;
  tcl_WaitPid: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => interop.Pointer | null;
  tcl_PanicVA: (p1: string, p2: string) => void | null;
  tcl_GetVersion: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void | null;
  tcl_InitMemory: (p1: interop.PointerConvertible) => void | null;
  tcl_StackChannel: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible) => interop.Pointer | null;
  tcl_UnstackChannel: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tcl_GetStackedChannel: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tcl_SetMainLoop: (p1: () => void) => void | null;
  reserved285: interop.Pointer;
  tcl_AppendObjToObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tcl_CreateEncoding: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tcl_CreateThreadExitHandler: (p1: (p1: interop.PointerConvertible) => void, p2: interop.PointerConvertible) => void | null;
  tcl_DeleteThreadExitHandler: (p1: (p1: interop.PointerConvertible) => void, p2: interop.PointerConvertible) => void | null;
  tcl_DiscardResult: (p1: interop.PointerConvertible) => void | null;
  tcl_EvalEx: (p1: interop.PointerConvertible, p2: string, p3: number, p4: number) => number | null;
  tcl_EvalObjv: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number) => number | null;
  tcl_EvalObjEx: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => number | null;
  tcl_ExitThread: (p1: number) => void | null;
  tcl_ExternalToUtf: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: number, p5: number, p6: interop.PointerConvertible, p7: string, p8: number, p9: interop.PointerConvertible, p10: interop.PointerConvertible, p11: interop.PointerConvertible) => number | null;
  tcl_ExternalToUtfDString: (p1: interop.PointerConvertible, p2: string, p3: number, p4: interop.PointerConvertible) => string | null;
  tcl_FinalizeThread: () => void | null;
  tcl_FinalizeNotifier: (p1: interop.PointerConvertible) => void | null;
  tcl_FreeEncoding: (p1: interop.PointerConvertible) => void | null;
  tcl_GetCurrentThread: () => interop.Pointer | null;
  tcl_GetEncoding: (p1: interop.PointerConvertible, p2: string) => interop.Pointer | null;
  tcl_GetEncodingName: (p1: interop.PointerConvertible) => string | null;
  tcl_GetEncodingNames: (p1: interop.PointerConvertible) => void | null;
  tcl_GetIndexFromObjStruct: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: string, p6: number, p7: interop.PointerConvertible) => number | null;
  tcl_GetThreadData: (p1: interop.PointerConvertible, p2: number) => interop.Pointer | null;
  tcl_GetVar2Ex: (p1: interop.PointerConvertible, p2: string, p3: string, p4: number) => interop.Pointer | null;
  tcl_InitNotifier: () => interop.Pointer | null;
  tcl_MutexLock: (p1: interop.PointerConvertible) => void | null;
  tcl_MutexUnlock: (p1: interop.PointerConvertible) => void | null;
  tcl_ConditionNotify: (p1: interop.PointerConvertible) => void | null;
  tcl_ConditionWait: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void | null;
  tcl_NumUtfChars: (p1: string, p2: number) => number | null;
  tcl_ReadChars: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => number | null;
  tcl_RestoreResult: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tcl_SaveResult: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tcl_SetSystemEncoding: (p1: interop.PointerConvertible, p2: string) => number | null;
  tcl_SetVar2Ex: (p1: interop.PointerConvertible, p2: string, p3: string, p4: interop.PointerConvertible, p5: number) => interop.Pointer | null;
  tcl_ThreadAlert: (p1: interop.PointerConvertible) => void | null;
  tcl_ThreadQueueEvent: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.Enum<typeof Tcl_QueuePosition>) => void | null;
  tcl_UniCharAtIndex: (p1: string, p2: number) => number | null;
  tcl_UniCharToLower: (p1: number) => number | null;
  tcl_UniCharToTitle: (p1: number) => number | null;
  tcl_UniCharToUpper: (p1: number) => number | null;
  tcl_UniCharToUtf: (p1: number, p2: string) => number | null;
  tcl_UtfAtIndex: (p1: string, p2: number) => string | null;
  tcl_UtfCharComplete: (p1: string, p2: number) => number | null;
  tcl_UtfBackslash: (p1: string, p2: interop.PointerConvertible, p3: string) => number | null;
  tcl_UtfFindFirst: (p1: string, p2: number) => string | null;
  tcl_UtfFindLast: (p1: string, p2: number) => string | null;
  tcl_UtfNext: (p1: string) => string | null;
  tcl_UtfPrev: (p1: string, p2: string) => string | null;
  tcl_UtfToExternal: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: number, p5: number, p6: interop.PointerConvertible, p7: string, p8: number, p9: interop.PointerConvertible, p10: interop.PointerConvertible, p11: interop.PointerConvertible) => number | null;
  tcl_UtfToExternalDString: (p1: interop.PointerConvertible, p2: string, p3: number, p4: interop.PointerConvertible) => string | null;
  tcl_UtfToLower: (p1: string) => number | null;
  tcl_UtfToTitle: (p1: string) => number | null;
  tcl_UtfToUniChar: (p1: string, p2: interop.PointerConvertible) => number | null;
  tcl_UtfToUpper: (p1: string) => number | null;
  tcl_WriteChars: (p1: interop.PointerConvertible, p2: string, p3: number) => number | null;
  tcl_WriteObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tcl_GetString: (p1: interop.PointerConvertible) => string | null;
  tcl_GetDefaultEncodingDir: () => string | null;
  tcl_SetDefaultEncodingDir: (p1: string) => void | null;
  tcl_AlertNotifier: (p1: interop.PointerConvertible) => void | null;
  tcl_ServiceModeHook: (p1: number) => void | null;
  tcl_UniCharIsAlnum: (p1: number) => number | null;
  tcl_UniCharIsAlpha: (p1: number) => number | null;
  tcl_UniCharIsDigit: (p1: number) => number | null;
  tcl_UniCharIsLower: (p1: number) => number | null;
  tcl_UniCharIsSpace: (p1: number) => number | null;
  tcl_UniCharIsUpper: (p1: number) => number | null;
  tcl_UniCharIsWordChar: (p1: number) => number | null;
  tcl_UniCharLen: (p1: interop.PointerConvertible) => number | null;
  tcl_UniCharNcmp: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => number | null;
  tcl_UniCharToUtfDString: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => string | null;
  tcl_UtfToUniCharDString: (p1: string, p2: number, p3: interop.PointerConvertible) => interop.Pointer | null;
  tcl_GetRegExpFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => interop.Pointer | null;
  tcl_EvalTokens: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => interop.Pointer | null;
  tcl_FreeParse: (p1: interop.PointerConvertible) => void | null;
  tcl_LogCommandInfo: (p1: interop.PointerConvertible, p2: string, p3: string, p4: number) => void | null;
  tcl_ParseBraces: (p1: interop.PointerConvertible, p2: string, p3: number, p4: interop.PointerConvertible, p5: number, p6: interop.PointerConvertible) => number | null;
  tcl_ParseCommand: (p1: interop.PointerConvertible, p2: string, p3: number, p4: number, p5: interop.PointerConvertible) => number | null;
  tcl_ParseExpr: (p1: interop.PointerConvertible, p2: string, p3: number, p4: interop.PointerConvertible) => number | null;
  tcl_ParseQuotedString: (p1: interop.PointerConvertible, p2: string, p3: number, p4: interop.PointerConvertible, p5: number, p6: interop.PointerConvertible) => number | null;
  tcl_ParseVarName: (p1: interop.PointerConvertible, p2: string, p3: number, p4: interop.PointerConvertible, p5: number) => number | null;
  tcl_GetCwd: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => string | null;
  tcl_Chdir: (p1: string) => number | null;
  tcl_Access: (p1: string, p2: number) => number | null;
  tcl_Stat: (p1: string, p2: interop.PointerConvertible) => number | null;
  tcl_UtfNcmp: (p1: string, p2: string, p3: number) => number | null;
  tcl_UtfNcasecmp: (p1: string, p2: string, p3: number) => number | null;
  tcl_StringCaseMatch: (p1: string, p2: string, p3: number) => number | null;
  tcl_UniCharIsControl: (p1: number) => number | null;
  tcl_UniCharIsGraph: (p1: number) => number | null;
  tcl_UniCharIsPrint: (p1: number) => number | null;
  tcl_UniCharIsPunct: (p1: number) => number | null;
  tcl_RegExpExecObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: number, p6: number) => number | null;
  tcl_RegExpGetInfo: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tcl_NewUnicodeObj: (p1: interop.PointerConvertible, p2: number) => interop.Pointer | null;
  tcl_SetUnicodeObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => void | null;
  tcl_GetCharLength: (p1: interop.PointerConvertible) => number | null;
  tcl_GetUniChar: (p1: interop.PointerConvertible, p2: number) => number | null;
  tcl_GetUnicode: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tcl_GetRange: (p1: interop.PointerConvertible, p2: number, p3: number) => interop.Pointer | null;
  tcl_AppendUnicodeToObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => void | null;
  tcl_RegExpMatchObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_SetNotifier: (p1: interop.PointerConvertible) => void | null;
  tcl_GetAllocMutex: () => interop.Pointer | null;
  tcl_GetChannelNames: (p1: interop.PointerConvertible) => number | null;
  tcl_GetChannelNamesEx: (p1: interop.PointerConvertible, p2: string) => number | null;
  tcl_ProcObjCmd: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number | null;
  tcl_ConditionFinalize: (p1: interop.PointerConvertible) => void | null;
  tcl_MutexFinalize: (p1: interop.PointerConvertible) => void | null;
  tcl_CreateThread: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible) => void, p3: interop.PointerConvertible, p4: number, p5: number) => number | null;
  tcl_ReadRaw: (p1: interop.PointerConvertible, p2: string, p3: number) => number | null;
  tcl_WriteRaw: (p1: interop.PointerConvertible, p2: string, p3: number) => number | null;
  tcl_GetTopChannel: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tcl_ChannelBuffered: (p1: interop.PointerConvertible) => number | null;
  tcl_ChannelName: (p1: interop.PointerConvertible) => string | null;
  tcl_ChannelVersion: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tcl_ChannelBlockModeProc: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: number) => number | null;
  tcl_ChannelCloseProc: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tcl_ChannelClose2Proc: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => number | null;
  tcl_ChannelInputProc: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: string, p3: number, p4: interop.PointerConvertible) => number | null;
  tcl_ChannelOutputProc: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: string, p3: number, p4: interop.PointerConvertible) => number | null;
  tcl_ChannelSeekProc: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible) => number | null;
  tcl_ChannelSetOptionProc: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string) => number | null;
  tcl_ChannelGetOptionProc: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: interop.PointerConvertible) => number | null;
  tcl_ChannelWatchProc: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: number) => void | null;
  tcl_ChannelGetHandleProc: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  tcl_ChannelFlushProc: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible) => number | null;
  tcl_ChannelHandlerProc: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: number) => number | null;
  tcl_JoinThread: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tcl_IsChannelShared: (p1: interop.PointerConvertible) => number | null;
  tcl_IsChannelRegistered: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tcl_CutChannel: (p1: interop.PointerConvertible) => void | null;
  tcl_SpliceChannel: (p1: interop.PointerConvertible) => void | null;
  tcl_ClearChannelHandlers: (p1: interop.PointerConvertible) => void | null;
  tcl_IsChannelExisting: (p1: string) => number | null;
  tcl_UniCharNcasecmp: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => number | null;
  tcl_UniCharCaseMatch: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => number | null;
  tcl_FindHashEntry: (p1: interop.PointerConvertible, p2: string) => interop.Pointer | null;
  tcl_CreateHashEntry: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible) => interop.Pointer | null;
  tcl_InitCustomHashTable: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void | null;
  tcl_InitObjHashTable: (p1: interop.PointerConvertible) => void | null;
  tcl_CommandTraceInfo: (p1: interop.PointerConvertible, p2: string, p3: number, p4: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string, p5: number) => void, p5: interop.PointerConvertible) => interop.Pointer | null;
  tcl_TraceCommand: (p1: interop.PointerConvertible, p2: string, p3: number, p4: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string, p5: number) => void, p5: interop.PointerConvertible) => number | null;
  tcl_UntraceCommand: (p1: interop.PointerConvertible, p2: string, p3: number, p4: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string, p5: number) => void, p5: interop.PointerConvertible) => void | null;
  tcl_AttemptAlloc: (p1: number) => string | null;
  tcl_AttemptDbCkalloc: (p1: number, p2: string, p3: number) => string | null;
  tcl_AttemptRealloc: (p1: string, p2: number) => string | null;
  tcl_AttemptDbCkrealloc: (p1: string, p2: number, p3: string, p4: number) => string | null;
  tcl_AttemptSetObjLength: (p1: interop.PointerConvertible, p2: number) => number | null;
  tcl_GetChannelThread: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tcl_GetUnicodeFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer | null;
  tcl_GetMathFuncInfo: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible) => number | null;
  tcl_ListMathFuncs: (p1: interop.PointerConvertible, p2: string) => interop.Pointer | null;
  tcl_SubstObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => interop.Pointer | null;
  tcl_DetachChannel: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tcl_IsStandardChannel: (p1: interop.PointerConvertible) => number | null;
  tcl_FSCopyFile: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tcl_FSCopyDirectory: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_FSCreateDirectory: (p1: interop.PointerConvertible) => number | null;
  tcl_FSDeleteFile: (p1: interop.PointerConvertible) => number | null;
  tcl_FSLoadFile: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible, p8: interop.PointerConvertible) => number | null;
  tcl_FSMatchInDirectory: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: string, p5: interop.PointerConvertible) => number | null;
  tcl_FSLink: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => interop.Pointer | null;
  tcl_FSRemoveDirectory: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  tcl_FSRenameFile: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tcl_FSLstat: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tcl_FSUtime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tcl_FSFileAttrsGet: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  tcl_FSFileAttrsSet: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  tcl_FSFileAttrStrings: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer | null;
  tcl_FSStat: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tcl_FSAccess: (p1: interop.PointerConvertible, p2: number) => number | null;
  tcl_FSOpenFileChannel: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: number) => interop.Pointer | null;
  tcl_FSGetCwd: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tcl_FSChdir: (p1: interop.PointerConvertible) => number | null;
  tcl_FSConvertToPathType: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tcl_FSJoinPath: (p1: interop.PointerConvertible, p2: number) => interop.Pointer | null;
  tcl_FSSplitPath: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer | null;
  tcl_FSEqualPaths: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tcl_FSGetNormalizedPath: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer | null;
  tcl_FSJoinToPath: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => interop.Pointer | null;
  tcl_FSGetInternalRep: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer | null;
  tcl_FSGetTranslatedPath: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer | null;
  tcl_FSEvalFile: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tcl_FSNewNativePath: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer | null;
  tcl_FSGetNativePath: (p1: interop.PointerConvertible) => string | null;
  tcl_FSFileSystemInfo: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tcl_FSPathSeparator: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tcl_FSListVolumes: () => interop.Pointer | null;
  tcl_FSRegister: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tcl_FSUnregister: (p1: interop.PointerConvertible) => number | null;
  tcl_FSData: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tcl_FSGetTranslatedStringPath: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => string | null;
  tcl_FSGetFileSystemForPath: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tcl_FSGetPathType: (p1: interop.PointerConvertible) => interop.Enum<typeof Tcl_PathType> | null;
  tcl_OutputBuffered: (p1: interop.PointerConvertible) => number | null;
  tcl_FSMountsChanged: (p1: interop.PointerConvertible) => void | null;
  tcl_EvalTokensStandard: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => number | null;
  tcl_GetTime: (p1: interop.PointerConvertible) => void | null;
  tcl_CreateObjTrace: (p1: interop.PointerConvertible, p2: number, p3: number, p4: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: string, p5: interop.PointerConvertible, p6: number, p7: interop.PointerConvertible) => number, p5: interop.PointerConvertible, p6: (p1: interop.PointerConvertible) => void) => interop.Pointer | null;
  tcl_GetCommandInfoFromToken: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tcl_SetCommandInfoFromToken: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tcl_DbNewWideIntObj: (p1: number, p2: string, p3: number) => interop.Pointer | null;
  tcl_GetWideIntFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_NewWideIntObj: (p1: number) => interop.Pointer | null;
  tcl_SetWideIntObj: (p1: interop.PointerConvertible, p2: number) => void | null;
  tcl_AllocStatBuf: () => interop.Pointer | null;
  tcl_Seek: (p1: interop.PointerConvertible, p2: number, p3: number) => number | null;
  tcl_Tell: (p1: interop.PointerConvertible) => number | null;
  tcl_ChannelWideSeekProc: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible) => number | null;
  tcl_DictObjPut: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  tcl_DictObjGet: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  tcl_DictObjRemove: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_DictObjSize: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_DictObjFirst: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible) => number | null;
  tcl_DictObjNext: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void | null;
  tcl_DictObjDone: (p1: interop.PointerConvertible) => void | null;
  tcl_DictObjPutKeyList: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number | null;
  tcl_DictObjRemoveKeyList: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number | null;
  tcl_NewDictObj: () => interop.Pointer | null;
  tcl_DbNewDictObj: (p1: string, p2: number) => interop.Pointer | null;
  tcl_RegisterConfig: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: string) => void | null;
  tcl_CreateNamespace: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible) => void) => interop.Pointer | null;
  tcl_DeleteNamespace: (p1: interop.PointerConvertible) => void | null;
  tcl_AppendExportList: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_Export: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: number) => number | null;
  tcl_Import: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: number) => number | null;
  tcl_ForgetImport: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string) => number | null;
  tcl_GetCurrentNamespace: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tcl_GetGlobalNamespace: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tcl_FindNamespace: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: number) => interop.Pointer | null;
  tcl_FindCommand: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: number) => interop.Pointer | null;
  tcl_GetCommandFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer | null;
  tcl_GetCommandFullName: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void | null;
  tcl_FSEvalFileEx: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string) => number | null;
  tcl_SetExitProc: (p1: (p1: interop.PointerConvertible) => void) => (p1: interop.PointerConvertible) => void | null;
  tcl_LimitAddHandler: (p1: interop.PointerConvertible, p2: number, p3: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, p4: interop.PointerConvertible, p5: (p1: interop.PointerConvertible) => void) => void | null;
  tcl_LimitRemoveHandler: (p1: interop.PointerConvertible, p2: number, p3: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, p4: interop.PointerConvertible) => void | null;
  tcl_LimitReady: (p1: interop.PointerConvertible) => number | null;
  tcl_LimitCheck: (p1: interop.PointerConvertible) => number | null;
  tcl_LimitExceeded: (p1: interop.PointerConvertible) => number | null;
  tcl_LimitSetCommands: (p1: interop.PointerConvertible, p2: number) => void | null;
  tcl_LimitSetTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tcl_LimitSetGranularity: (p1: interop.PointerConvertible, p2: number, p3: number) => void | null;
  tcl_LimitTypeEnabled: (p1: interop.PointerConvertible, p2: number) => number | null;
  tcl_LimitTypeExceeded: (p1: interop.PointerConvertible, p2: number) => number | null;
  tcl_LimitTypeSet: (p1: interop.PointerConvertible, p2: number) => void | null;
  tcl_LimitTypeReset: (p1: interop.PointerConvertible, p2: number) => void | null;
  tcl_LimitGetCommands: (p1: interop.PointerConvertible) => number | null;
  tcl_LimitGetTime: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tcl_LimitGetGranularity: (p1: interop.PointerConvertible, p2: number) => number | null;
  tcl_SaveInterpState: (p1: interop.PointerConvertible, p2: number) => interop.Pointer | null;
  tcl_RestoreInterpState: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tcl_DiscardInterpState: (p1: interop.PointerConvertible) => void | null;
  tcl_SetReturnOptions: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tcl_GetReturnOptions: (p1: interop.PointerConvertible, p2: number) => interop.Pointer | null;
  tcl_IsEnsemble: (p1: interop.PointerConvertible) => number | null;
  tcl_CreateEnsemble: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: number) => interop.Pointer | null;
  tcl_FindEnsemble: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => interop.Pointer | null;
  tcl_SetEnsembleSubcommandList: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_SetEnsembleMappingDict: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_SetEnsembleUnknownHandler: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_SetEnsembleFlags: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => number | null;
  tcl_GetEnsembleSubcommandList: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_GetEnsembleMappingDict: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_GetEnsembleUnknownHandler: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_GetEnsembleFlags: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_GetEnsembleNamespace: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_SetTimeProc: (p1: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, p2: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, p3: interop.PointerConvertible) => void | null;
  tcl_QueryTimeProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void | null;
  tcl_ChannelThreadActionProc: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: number) => void | null;
  tcl_NewBignumObj: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tcl_DbNewBignumObj: (p1: interop.PointerConvertible, p2: string, p3: number) => interop.Pointer | null;
  tcl_SetBignumObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tcl_GetBignumFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_TakeBignumFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_TruncateChannel: (p1: interop.PointerConvertible, p2: number) => number | null;
  tcl_ChannelTruncateProc: (p1: interop.PointerConvertible) => (p1: interop.PointerConvertible, p2: number) => number | null;
  tcl_SetChannelErrorInterp: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tcl_GetChannelErrorInterp: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tcl_SetChannelError: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tcl_GetChannelError: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tcl_InitBignumFromDouble: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  tcl_GetNamespaceUnknownHandler: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer | null;
  tcl_SetNamespaceUnknownHandler: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_GetEncodingFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_GetEncodingSearchPath: () => interop.Pointer | null;
  tcl_SetEncodingSearchPath: (p1: interop.PointerConvertible) => number | null;
  tcl_GetEncodingNameFromEnvironment: (p1: interop.PointerConvertible) => string | null;
  tcl_PkgRequireProc: (p1: interop.PointerConvertible, p2: string, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number | null;
  tcl_AppendObjToErrorInfo: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tcl_AppendLimitedToObj: (p1: interop.PointerConvertible, p2: string, p3: number, p4: number, p5: string) => void | null;
  tcl_Format: (p1: interop.PointerConvertible, p2: string, p3: number, p4: interop.PointerConvertible) => interop.Pointer | null;
  tcl_AppendFormatToObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: number, p5: interop.PointerConvertible) => number | null;
  tcl_ObjPrintf: (p1: string) => interop.Pointer | null;
  tcl_AppendPrintfToObj: (p1: interop.PointerConvertible, p2: string) => void | null;
}

declare class TclIntStubs {
  constructor(init?: TclIntStubs);
  magic: number;
  hooks: interop.Pointer;
  reserved0: interop.Pointer;
  reserved1: interop.Pointer;
  reserved2: interop.Pointer;
  tclAllocateFreeObjects: () => void | null;
  reserved4: interop.Pointer;
  tclCleanupChildren: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  tclCleanupCommand: (p1: interop.PointerConvertible) => void | null;
  tclCopyAndCollapse: (p1: number, p2: string, p3: string) => number | null;
  tclCopyChannel: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible) => number | null;
  tclCreatePipeline: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  tclCreateProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible) => number | null;
  tclDeleteCompiledLocalVars: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tclDeleteVars: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  reserved13: interop.Pointer;
  tclDumpMemoryInfo: (p1: interop.PointerConvertible) => void | null;
  reserved15: interop.Pointer;
  tclExprFloatError: (p1: interop.PointerConvertible, p2: number) => void | null;
  reserved17: interop.Pointer;
  reserved18: interop.Pointer;
  reserved19: interop.Pointer;
  reserved20: interop.Pointer;
  reserved21: interop.Pointer;
  tclFindElement: (p1: interop.PointerConvertible, p2: string, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  tclFindProc: (p1: interop.PointerConvertible, p2: string) => interop.Pointer | null;
  reserved24: interop.Pointer;
  tclFreePackageInfo: (p1: interop.PointerConvertible) => void | null;
  reserved26: interop.Pointer;
  reserved27: interop.Pointer;
  tclpGetDefaultStdChannel: (p1: number) => interop.Pointer | null;
  reserved29: interop.Pointer;
  reserved30: interop.Pointer;
  tclGetExtension: (p1: string) => string | null;
  tclGetFrame: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible) => number | null;
  reserved33: interop.Pointer;
  tclGetIntForIndex: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number | null;
  reserved35: interop.Pointer;
  tclGetLong: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible) => number | null;
  tclGetLoadedPackages: (p1: interop.PointerConvertible, p2: string) => number | null;
  tclGetNamespaceForQualName: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible, p8: interop.PointerConvertible) => number | null;
  tclGetObjInterpProc: () => (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number | null;
  tclGetOpenMode: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible) => number | null;
  tclGetOriginalCommand: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tclpGetUserHome: (p1: string, p2: interop.PointerConvertible) => string | null;
  reserved43: interop.Pointer;
  tclGuessPackageName: (p1: string, p2: interop.PointerConvertible) => number | null;
  tclHideUnsafeCommands: (p1: interop.PointerConvertible) => number | null;
  tclInExit: () => number | null;
  reserved47: interop.Pointer;
  reserved48: interop.Pointer;
  reserved49: interop.Pointer;
  tclInitCompiledLocals: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void | null;
  tclInterpInit: (p1: interop.PointerConvertible) => number | null;
  reserved52: interop.Pointer;
  tclInvokeObjectCommand: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number | null;
  tclInvokeStringCommand: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number | null;
  tclIsProc: (p1: interop.PointerConvertible) => interop.Pointer | null;
  reserved56: interop.Pointer;
  reserved57: interop.Pointer;
  tclLookupVar: (p1: interop.PointerConvertible, p2: string, p3: string, p4: number, p5: string, p6: number, p7: number, p8: interop.PointerConvertible) => interop.Pointer | null;
  reserved59: interop.Pointer;
  tclNeedSpace: (p1: string, p2: string) => number | null;
  tclNewProcBodyObj: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tclObjCommandComplete: (p1: interop.PointerConvertible) => number | null;
  tclObjInterpProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number | null;
  tclObjInvoke: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number) => number | null;
  reserved65: interop.Pointer;
  reserved66: interop.Pointer;
  reserved67: interop.Pointer;
  reserved68: interop.Pointer;
  tclpAlloc: (p1: number) => string | null;
  reserved70: interop.Pointer;
  reserved71: interop.Pointer;
  reserved72: interop.Pointer;
  reserved73: interop.Pointer;
  tclpFree: (p1: string) => void | null;
  tclpGetClicks: () => number | null;
  tclpGetSeconds: () => number | null;
  tclpGetTime: (p1: interop.PointerConvertible) => void | null;
  tclpGetTimeZone: (p1: number) => number | null;
  reserved79: interop.Pointer;
  reserved80: interop.Pointer;
  tclpRealloc: (p1: string, p2: number) => string | null;
  reserved82: interop.Pointer;
  reserved83: interop.Pointer;
  reserved84: interop.Pointer;
  reserved85: interop.Pointer;
  reserved86: interop.Pointer;
  reserved87: interop.Pointer;
  tclPrecTraceProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string, p5: number) => string | null;
  tclPreventAliasLoop: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  reserved90: interop.Pointer;
  tclProcCleanupProc: (p1: interop.PointerConvertible) => void | null;
  tclProcCompileProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: string, p6: string) => number | null;
  tclProcDeleteProc: (p1: interop.PointerConvertible) => void | null;
  reserved94: interop.Pointer;
  reserved95: interop.Pointer;
  tclRenameCommand: (p1: interop.PointerConvertible, p2: string, p3: string) => number | null;
  tclResetShadowedCmdRefs: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tclServiceIdle: () => number | null;
  reserved99: interop.Pointer;
  reserved100: interop.Pointer;
  tclSetPreInitScript: (p1: string) => string | null;
  tclSetupEnv: (p1: interop.PointerConvertible) => void | null;
  tclSockGetPort: (p1: interop.PointerConvertible, p2: string, p3: string, p4: interop.PointerConvertible) => number | null;
  tclSockMinimumBuffers: (p1: number, p2: number) => number | null;
  reserved105: interop.Pointer;
  reserved106: interop.Pointer;
  reserved107: interop.Pointer;
  tclTeardownNamespace: (p1: interop.PointerConvertible) => void | null;
  tclUpdateReturnInfo: (p1: interop.PointerConvertible) => number | null;
  reserved110: interop.Pointer;
  tcl_AddInterpResolvers: (p1: interop.PointerConvertible, p2: string, p3: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible) => number, p4: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible) => number, p5: (p1: interop.PointerConvertible, p2: string, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number) => void | null;
  tcl_AppendExportList: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tcl_CreateNamespace: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: (p1: interop.PointerConvertible) => void) => interop.Pointer | null;
  tcl_DeleteNamespace: (p1: interop.PointerConvertible) => void | null;
  tcl_Export: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: number) => number | null;
  tcl_FindCommand: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: number) => interop.Pointer | null;
  tcl_FindNamespace: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: number) => interop.Pointer | null;
  tcl_GetInterpResolvers: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible) => number | null;
  tcl_GetNamespaceResolvers: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tcl_FindNamespaceVar: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: number) => interop.Pointer | null;
  tcl_ForgetImport: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string) => number | null;
  tcl_GetCommandFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer | null;
  tcl_GetCommandFullName: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void | null;
  tcl_GetCurrentNamespace: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tcl_GetGlobalNamespace: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tcl_GetVariableFullName: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void | null;
  tcl_Import: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: number) => number | null;
  tcl_PopCallFrame: (p1: interop.PointerConvertible) => void | null;
  tcl_PushCallFrame: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number) => number | null;
  tcl_RemoveInterpResolvers: (p1: interop.PointerConvertible, p2: string) => number | null;
  tcl_SetNamespaceResolvers: (p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible) => number, p3: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible) => number, p4: (p1: interop.PointerConvertible, p2: string, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number) => void | null;
  tclpHasSockets: (p1: interop.PointerConvertible) => number | null;
  tclpGetDate: (p1: interop.PointerConvertible, p2: number) => interop.Pointer | null;
  reserved134: interop.Pointer;
  reserved135: interop.Pointer;
  reserved136: interop.Pointer;
  reserved137: interop.Pointer;
  tclGetEnv: (p1: string, p2: interop.PointerConvertible) => string | null;
  reserved139: interop.Pointer;
  reserved140: interop.Pointer;
  tclpGetCwd: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => string | null;
  tclSetByteCodeFromAny: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number, p4: interop.PointerConvertible) => number | null;
  tclAddLiteralObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tclHideLiteral: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => void | null;
  tclGetAuxDataType: (p1: string) => interop.Pointer | null;
  tclHandleCreate: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tclHandleFree: (p1: interop.PointerConvertible) => void | null;
  tclHandlePreserve: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tclHandleRelease: (p1: interop.PointerConvertible) => void | null;
  tclRegAbout: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tclRegExpRangeUniChar: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void | null;
  tclSetLibraryPath: (p1: interop.PointerConvertible) => void | null;
  tclGetLibraryPath: () => interop.Pointer | null;
  reserved154: interop.Pointer;
  reserved155: interop.Pointer;
  tclRegError: (p1: interop.PointerConvertible, p2: string, p3: number) => void | null;
  tclVarTraceExists: (p1: interop.PointerConvertible, p2: string) => interop.Pointer | null;
  tclSetStartupScriptFileName: (p1: string) => void | null;
  tclGetStartupScriptFileName: () => string | null;
  reserved160: interop.Pointer;
  tclChannelTransform: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tclChannelEventScriptInvoker: (p1: interop.PointerConvertible, p2: number) => void | null;
  tclGetInstructionTable: () => interop.Pointer | null;
  tclExpandCodeArray: (p1: interop.PointerConvertible) => void | null;
  tclpSetInitialEncodings: () => void | null;
  tclListObjSetElement: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number | null;
  tclSetStartupScriptPath: (p1: interop.PointerConvertible) => void | null;
  tclGetStartupScriptPath: () => interop.Pointer | null;
  tclpUtfNcmp2: (p1: string, p2: string, p3: number) => number | null;
  tclCheckInterpTraces: (p1: interop.PointerConvertible, p2: string, p3: number, p4: interop.PointerConvertible, p5: number, p6: number, p7: number, p8: interop.PointerConvertible) => number | null;
  tclCheckExecutionTraces: (p1: interop.PointerConvertible, p2: string, p3: number, p4: interop.PointerConvertible, p5: number, p6: number, p7: number, p8: interop.PointerConvertible) => number | null;
  tclInThreadExit: () => number | null;
  tclUniCharMatch: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number) => number | null;
  reserved174: interop.Pointer;
  tclCallVarTraces: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: string, p5: string, p6: number, p7: number) => number | null;
  tclCleanupVar: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tclVarErrMsg: (p1: interop.PointerConvertible, p2: string, p3: string, p4: string, p5: string) => void | null;
  tcl_SetStartupScript: (p1: interop.PointerConvertible, p2: string) => void | null;
  tcl_GetStartupScript: (p1: interop.PointerConvertible) => interop.Pointer | null;
  reserved180: interop.Pointer;
  reserved181: interop.Pointer;
  tclpLocaltime: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tclpGmtime: (p1: interop.PointerConvertible) => interop.Pointer | null;
  reserved184: interop.Pointer;
  reserved185: interop.Pointer;
  reserved186: interop.Pointer;
  reserved187: interop.Pointer;
  reserved188: interop.Pointer;
  reserved189: interop.Pointer;
  reserved190: interop.Pointer;
  reserved191: interop.Pointer;
  reserved192: interop.Pointer;
  reserved193: interop.Pointer;
  reserved194: interop.Pointer;
  reserved195: interop.Pointer;
  reserved196: interop.Pointer;
  reserved197: interop.Pointer;
  tclObjGetFrame: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  reserved199: interop.Pointer;
  tclpObjRemoveDirectory: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  tclpObjCopyDirectory: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tclpObjCreateDirectory: (p1: interop.PointerConvertible) => number | null;
  tclpObjDeleteFile: (p1: interop.PointerConvertible) => number | null;
  tclpObjCopyFile: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tclpObjRenameFile: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tclpObjStat: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tclpObjAccess: (p1: interop.PointerConvertible, p2: number) => number | null;
  tclpOpenFileChannel: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => interop.Pointer | null;
  reserved209: interop.Pointer;
  reserved210: interop.Pointer;
  reserved211: interop.Pointer;
  tclpFindExecutable: (p1: string) => void | null;
  tclGetObjNameOfExecutable: () => interop.Pointer | null;
  tclSetObjNameOfExecutable: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tclStackAlloc: (p1: interop.PointerConvertible, p2: number) => interop.Pointer | null;
  tclStackFree: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tclPushStackFrame: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number) => number | null;
  tclPopStackFrame: (p1: interop.PointerConvertible) => void | null;
  reserved219: interop.Pointer;
  reserved220: interop.Pointer;
  reserved221: interop.Pointer;
  reserved222: interop.Pointer;
  reserved223: interop.Pointer;
  tclGetPlatform: () => interop.Pointer | null;
  tclTraceDictPath: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible, p5: number) => interop.Pointer | null;
  tclObjBeingDeleted: (p1: interop.PointerConvertible) => number | null;
  tclSetNsPath: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void | null;
  tclObjInterpProcCore: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void) => number | null;
  tclPtrMakeUpvar: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: number, p5: number) => number | null;
  tclObjLookupVar: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: number, p5: string, p6: number, p7: number, p8: interop.PointerConvertible) => interop.Pointer | null;
  tclGetNamespaceFromObj: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  tclEvalObjEx: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible, p5: number) => number | null;
  tclGetSrcInfoForPc: (p1: interop.PointerConvertible) => void | null;
  tclVarHashCreateVar: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible) => interop.Pointer | null;
  tclInitVarHashTable: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tclBackgroundException: (p1: interop.PointerConvertible, p2: number) => void | null;
  reserved237: interop.Pointer;
  reserved238: interop.Pointer;
  reserved239: interop.Pointer;
  reserved240: interop.Pointer;
  reserved241: interop.Pointer;
  reserved242: interop.Pointer;
  tclDbDumpActiveObjects: (p1: interop.PointerConvertible) => void | null;
}

declare class TclPlatStubs {
  constructor(init?: TclPlatStubs);
  magic: number;
  hooks: interop.Pointer;
}

declare class Tcl_NotifierProcs {
  constructor(init?: Tcl_NotifierProcs);
  setTimerProc: (p1: interop.PointerConvertible) => void | null;
  waitForEventProc: (p1: interop.PointerConvertible) => number | null;
  createFileHandlerProc: (p1: number, p2: number, p3: (p1: interop.PointerConvertible, p2: number) => void, p4: interop.PointerConvertible) => void | null;
  deleteFileHandlerProc: (p1: number) => void | null;
  initNotifierProc: () => interop.Pointer | null;
  finalizeNotifierProc: (p1: interop.PointerConvertible) => void | null;
  alertNotifierProc: (p1: interop.PointerConvertible) => void | null;
  serviceModeHookProc: (p1: number) => void | null;
}

declare class Tcl_GlobTypeData {
  constructor(init?: Tcl_GlobTypeData);
  type: number;
  perm: number;
  macType: interop.Pointer;
  macCreator: interop.Pointer;
}

declare class Tcl_Time {
  constructor(init?: Tcl_Time);
  sec: number;
  usec: number;
}

declare class Tcl_DictSearch {
  constructor(init?: Tcl_DictSearch);
  next: interop.Pointer;
  epoch: number;
  dictionaryPtr: interop.Pointer;
}

declare class Tcl_HashSearch {
  constructor(init?: Tcl_HashSearch);
  tablePtr: interop.Pointer;
  nextIndex: number;
  nextEntryPtr: interop.Pointer;
}

declare class Tcl_HashEntry {
  constructor(init?: Tcl_HashEntry);
  nextPtr: interop.Pointer;
  tablePtr: interop.Pointer;
  hash: interop.Pointer;
  clientData: interop.Pointer;
  key: unnamed_16126239951412607018;
}

declare class Tcl_HashKeyType {
  constructor(init?: Tcl_HashKeyType);
  version: number;
  flags: number;
  hashKeyProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  compareKeysProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  allocEntryProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer | null;
  freeEntryProc: (p1: interop.PointerConvertible) => void | null;
}

declare class Tcl_DString {
  constructor(init?: Tcl_DString);
  string: string | null;
  length: number;
  spaceAvl: number;
  staticSpace: unknown /* const array */;
}

declare class Tcl_CallFrame {
  constructor(init?: Tcl_CallFrame);
  nsPtr: interop.Pointer;
  dummy1: number;
  dummy2: number;
  dummy3: interop.Pointer;
  dummy4: interop.Pointer;
  dummy5: interop.Pointer;
  dummy6: number;
  dummy7: interop.Pointer;
  dummy8: interop.Pointer;
  dummy9: number;
  dummy10: interop.Pointer;
  dummy11: interop.Pointer;
  dummy12: interop.Pointer;
  dummy13: interop.Pointer;
}

declare class Tcl_Namespace {
  constructor(init?: Tcl_Namespace);
  name: string | null;
  fullName: string | null;
  clientData: interop.Pointer;
  deleteProc: (p1: interop.PointerConvertible) => void | null;
  parentPtr: interop.Pointer;
}

declare class Tcl_SavedResult {
  constructor(init?: Tcl_SavedResult);
  result: string | null;
  freeProc: (p1: string) => void | null;
  objResultPtr: interop.Pointer;
  appendResult: string | null;
  appendAvl: number;
  appendUsed: number;
  resultSpace: unknown /* const array */;
}

declare class unnamed_3475170141862813391 {
  constructor(init?: unnamed_3475170141862813391);
  ptr: interop.Pointer;
  value: number;
}

declare class unnamed_1718681146382766305 {
  constructor(init?: unnamed_1718681146382766305);
  ptr1: interop.Pointer;
  ptr2: interop.Pointer;
}

declare class Tcl_Value {
  constructor(init?: Tcl_Value);
  type: interop.Enum<typeof Tcl_ValueType>;
  intValue: number;
  doubleValue: number;
  wideValue: number;
}

declare class Tcl_RegExpInfo {
  constructor(init?: Tcl_RegExpInfo);
  nsubs: number;
  matches: interop.Pointer;
  extendStart: number;
  reserved: number;
}

declare class Tcl_RegExpIndices {
  constructor(init?: Tcl_RegExpIndices);
  start: number;
  end: number;
}

declare class Tcl_Trace_ {
  constructor(init?: Tcl_Trace_);
}

declare class Tcl_ThreadDataKey_ {
  constructor(init?: Tcl_ThreadDataKey_);
}

declare class Tcl_RegExp_ {
  constructor(init?: Tcl_RegExp_);
}

declare class Tcl_Pid_ {
  constructor(init?: Tcl_Pid_);
}

declare class Tcl_LoadHandle_ {
  constructor(init?: Tcl_LoadHandle_);
}

declare class Tcl_InterpState_ {
  constructor(init?: Tcl_InterpState_);
}

declare class Tcl_Dict_ {
  constructor(init?: Tcl_Dict_);
}

declare class Tcl_ChannelTypeVersion_ {
  constructor(init?: Tcl_ChannelTypeVersion_);
}

declare class Tcl_AsyncHandler_ {
  constructor(init?: Tcl_AsyncHandler_);
}

declare class CallFrame {
  constructor(init?: CallFrame);
  nsPtr: interop.Pointer;
  isProcCallFrame: number;
  objc: number;
  objv: interop.Pointer;
  callerPtr: interop.Pointer;
  callerVarPtr: interop.Pointer;
  level: number;
  procPtr: interop.Pointer;
  varTablePtr: interop.Pointer;
  numCompiledLocals: number;
  compiledLocals: interop.Pointer;
  clientData: interop.Pointer;
  localCachePtr: interop.Pointer;
}

declare class ForeachInfo {
  constructor(init?: ForeachInfo);
  numLists: number;
  firstValueTemp: number;
  loopCtTemp: number;
  varLists: unknown /* const array */;
}

declare class unnamed_16727889889338753574 {
  constructor(init?: unnamed_16727889889338753574);
  cmd: string | null;
  len: number;
}

declare class unnamed_16593889917611252292 {
  constructor(init?: unnamed_16593889917611252292);
  sourceObjs: interop.Pointer;
  numRemovedObjs: number;
  numInsertedObjs: number;
}

declare class Tcl_Config {
  constructor(init?: Tcl_Config);
  key: string | null;
  value: string | null;
}

declare class ProcessGlobalValue {
  constructor(init?: ProcessGlobalValue);
  epoch: number;
  numBytes: number;
  value: string | null;
  encoding: interop.Pointer;
  proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void | null;
  mutex: interop.Pointer;
  key: interop.Pointer;
}

declare class ActiveVarTrace {
  constructor(init?: ActiveVarTrace);
  varPtr: interop.Pointer;
  nextPtr: interop.Pointer;
  nextTracePtr: interop.Pointer;
}

declare class Tcl_ResolvedVarInfo {
  constructor(init?: Tcl_ResolvedVarInfo);
  fetchProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer | null;
  deleteProc: (p1: interop.PointerConvertible) => void | null;
}

declare class Tcl_HashTable {
  constructor(init?: Tcl_HashTable);
  buckets: interop.Pointer;
  staticBuckets: unknown /* const array */;
  numBuckets: number;
  numEntries: number;
  rebuildSize: number;
  downShift: number;
  mask: number;
  keyType: number;
  findProc: (p1: interop.PointerConvertible, p2: string) => interop.Pointer | null;
  createProc: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible) => interop.Pointer | null;
  typePtr: interop.Pointer;
}

declare class VarInHash {
  constructor(init?: VarInHash);
  var: Var;
  refCount: number;
  entry: Tcl_HashEntry;
}

declare class unnamed_3918308343247493790 {
  constructor(init?: unnamed_3918308343247493790);
  active: number;
  granularityTicker: number;
  exceeded: number;
  cmdCount: number;
  cmdHandlers: interop.Pointer;
  cmdGranularity: number;
  time: Tcl_Time;
  timeHandlers: interop.Pointer;
  timeGranularity: number;
  timeEvent: interop.Pointer;
  callbacks: Tcl_HashTable;
}

declare class Tcl_Channel_ {
  constructor(init?: Tcl_Channel_);
}

declare class List {
  constructor(init?: List);
  refCount: number;
  maxElemCount: number;
  elemCount: number;
  canonicalFlag: number;
  elements: interop.Pointer;
}

declare class Tcl_Encoding_ {
  constructor(init?: Tcl_Encoding_);
}

declare class Tcl_ObjType {
  constructor(init?: Tcl_ObjType);
  name: string | null;
  freeIntRepProc: (p1: interop.PointerConvertible) => void | null;
  dupIntRepProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  updateStringProc: (p1: interop.PointerConvertible) => void | null;
  setFromAnyProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
}

declare class Proc {
  constructor(init?: Proc);
  iPtr: interop.Pointer;
  refCount: number;
  cmdPtr: interop.Pointer;
  bodyPtr: interop.Pointer;
  numArgs: number;
  numCompiledLocals: number;
  firstLocalPtr: interop.Pointer;
  lastLocalPtr: interop.Pointer;
}

declare class Tcl_Filesystem {
  constructor(init?: Tcl_Filesystem);
  typeName: string | null;
  structureLength: number;
  version: interop.Pointer;
  pathInFilesystemProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  dupInternalRepProc: (p1: interop.PointerConvertible) => interop.Pointer | null;
  freeInternalRepProc: (p1: interop.PointerConvertible) => void | null;
  internalToNormalizedProc: (p1: interop.PointerConvertible) => interop.Pointer | null;
  createInternalRepProc: (p1: interop.PointerConvertible) => interop.Pointer | null;
  normalizePathProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => number | null;
  filesystemPathTypeProc: (p1: interop.PointerConvertible) => interop.Pointer | null;
  filesystemSeparatorProc: (p1: interop.PointerConvertible) => interop.Pointer | null;
  statProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  accessProc: (p1: interop.PointerConvertible, p2: number) => number | null;
  openFileChannelProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number) => interop.Pointer | null;
  matchInDirectoryProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: string, p5: interop.PointerConvertible) => number | null;
  utimeProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  linkProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => interop.Pointer | null;
  listVolumesProc: () => interop.Pointer | null;
  fileAttrStringsProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => interop.Pointer | null;
  fileAttrsGetProc: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  fileAttrsSetProc: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  createDirectoryProc: (p1: interop.PointerConvertible) => number | null;
  removeDirectoryProc: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  deleteFileProc: (p1: interop.PointerConvertible) => number | null;
  copyFileProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  renameFileProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  copyDirectoryProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number | null;
  lstatProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  loadFileProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
  getCwdProc: (p1: interop.PointerConvertible) => interop.Pointer | null;
  chdirProc: (p1: interop.PointerConvertible) => number | null;
}

declare class ForeachVarList {
  constructor(init?: ForeachVarList);
  numVars: number;
  varIndexes: unknown /* const array */;
}

declare class Tcl_Token {
  constructor(init?: Tcl_Token);
  type: number;
  start: string | null;
  size: number;
  numComponents: number;
}

declare class ExtraFrameInfo {
  constructor(init?: ExtraFrameInfo);
  length: number;
  fields: unknown /* const array */;
}

declare class VarTrace {
  constructor(init?: VarTrace);
  traceProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string, p5: number) => string | null;
  clientData: interop.Pointer;
  flags: number;
  nextPtr: interop.Pointer;
}

declare class ECL {
  constructor(init?: ECL);
  srcOffset: number;
  nline: number;
  line: interop.Pointer;
  next: interop.Pointer;
}

declare class EnsembleImplMap {
  constructor(init?: EnsembleImplMap);
  name: string | null;
  proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number | null;
  compileProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number | null;
}

declare class Tcl_Mutex_ {
  constructor(init?: Tcl_Mutex_);
}

declare class Tcl_Interp {
  constructor(init?: Tcl_Interp);
  result: string | null;
  freeProc: (p1: string) => void | null;
  errorLine: number;
}

declare class NamespacePathEntry {
  constructor(init?: NamespacePathEntry);
  nsPtr: interop.Pointer;
  creatorNsPtr: interop.Pointer;
  prevPtr: interop.Pointer;
  nextPtr: interop.Pointer;
}

declare class Tcl_Parse {
  constructor(init?: Tcl_Parse);
  commentStart: string | null;
  commentSize: number;
  commandStart: string | null;
  commandSize: number;
  numWords: number;
  tokenPtr: interop.Pointer;
  numTokens: number;
  tokensAvailable: number;
  errorType: number;
  string: string | null;
  end: string | null;
  interp: interop.Pointer;
  term: string | null;
  incomplete: number;
  staticTokens: unknown /* const array */;
}

declare class Tcl_Obj {
  constructor(init?: Tcl_Obj);
  refCount: number;
  bytes: string | null;
  length: number;
  typePtr: interop.Pointer;
  internalRep: unnamed_16940517678363118476;
}

declare class TclStubHooks {
  constructor(init?: TclStubHooks);
  tclPlatStubs: interop.Pointer;
  tclIntStubs: interop.Pointer;
  tclIntPlatStubs: interop.Pointer;
}

declare class CommandTrace {
  constructor(init?: CommandTrace);
  traceProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string, p5: number) => void | null;
  clientData: interop.Pointer;
  flags: number;
  nextPtr: interop.Pointer;
  refCount: number;
}

declare class Tcl_EncodingType {
  constructor(init?: Tcl_EncodingType);
  encodingName: string | null;
  toUtfProc: (p1: interop.PointerConvertible, p2: string, p3: number, p4: number, p5: interop.PointerConvertible, p6: string, p7: number, p8: interop.PointerConvertible, p9: interop.PointerConvertible, p10: interop.PointerConvertible) => number | null;
  fromUtfProc: (p1: interop.PointerConvertible, p2: string, p3: number, p4: number, p5: interop.PointerConvertible, p6: string, p7: number, p8: interop.PointerConvertible, p9: interop.PointerConvertible, p10: interop.PointerConvertible) => number | null;
  freeProc: (p1: interop.PointerConvertible) => void | null;
  clientData: interop.Pointer;
  nullSize: number;
}

declare class Tcl_TimerToken_ {
  constructor(init?: Tcl_TimerToken_);
}

declare class JumptableInfo {
  constructor(init?: JumptableInfo);
  hashTable: Tcl_HashTable;
}

declare class InstructionDesc {
  constructor(init?: InstructionDesc);
  name: string | null;
  numBytes: number;
  stackEffect: number;
  numOperands: number;
  opTypes: unknown /* const array */;
}

declare class Tcl_Var_ {
  constructor(init?: Tcl_Var_);
}

declare class Tcl_EncodingState_ {
  constructor(init?: Tcl_EncodingState_);
}

declare class Tcl_Condition_ {
  constructor(init?: Tcl_Condition_);
}

declare class Tcl_ThreadId_ {
  constructor(init?: Tcl_ThreadId_);
}

declare class JumpFixupArray {
  constructor(init?: JumpFixupArray);
  fixup: interop.Pointer;
  next: number;
  end: number;
  mallocedArray: number;
  staticFixupSpace: unknown /* const array */;
}

declare class unnamed_1231445110418831064 {
  constructor(init?: unnamed_1231445110418831064);
  codePtr: interop.Pointer;
  pc: string | null;
}

declare class ActiveCommandTrace {
  constructor(init?: ActiveCommandTrace);
  cmdPtr: interop.Pointer;
  nextPtr: interop.Pointer;
  nextTracePtr: interop.Pointer;
  reverseScan: number;
}

declare class AuxDataType {
  constructor(init?: AuxDataType);
  name: string | null;
  dupProc: (p1: interop.PointerConvertible) => interop.Pointer | null;
  freeProc: (p1: interop.PointerConvertible) => void | null;
  printProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number) => void | null;
}

declare class ActiveInterpTrace {
  constructor(init?: ActiveInterpTrace);
  nextPtr: interop.Pointer;
  nextTracePtr: interop.Pointer;
  reverseScan: number;
}

declare class ExecStack {
  constructor(init?: ExecStack);
  prevPtr: interop.Pointer;
  nextPtr: interop.Pointer;
  markerPtr: interop.Pointer;
  endPtr: interop.Pointer;
  tosPtr: interop.Pointer;
  stackWords: unknown /* const array */;
}

declare class Tcl_ChannelType {
  constructor(init?: Tcl_ChannelType);
  typeName: string | null;
  version: interop.Pointer;
  closeProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  inputProc: (p1: interop.PointerConvertible, p2: string, p3: number, p4: interop.PointerConvertible) => number | null;
  outputProc: (p1: interop.PointerConvertible, p2: string, p3: number, p4: interop.PointerConvertible) => number | null;
  seekProc: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible) => number | null;
  setOptionProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string) => number | null;
  getOptionProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: interop.PointerConvertible) => number | null;
  watchProc: (p1: interop.PointerConvertible, p2: number) => void | null;
  getHandleProc: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  close2Proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => number | null;
  blockModeProc: (p1: interop.PointerConvertible, p2: number) => number | null;
  flushProc: (p1: interop.PointerConvertible) => number | null;
  handlerProc: (p1: interop.PointerConvertible, p2: number) => number | null;
  wideSeekProc: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible) => number | null;
  threadActionProc: (p1: interop.PointerConvertible, p2: number) => void | null;
  truncateProc: (p1: interop.PointerConvertible, p2: number) => number | null;
}

declare class Tcl_CmdInfo {
  constructor(init?: Tcl_CmdInfo);
  isNativeObjectProc: number;
  objProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number | null;
  objClientData: interop.Pointer;
  proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number | null;
  clientData: interop.Pointer;
  deleteProc: (p1: interop.PointerConvertible) => void | null;
  deleteData: interop.Pointer;
  namespacePtr: interop.Pointer;
}

declare class TclFile_ {
  constructor(init?: TclFile_);
}

declare class Tcl_Event {
  constructor(init?: Tcl_Event);
  proc: (p1: interop.PointerConvertible, p2: number) => number | null;
  nextPtr: interop.Pointer;
}

declare class ArraySearch {
  constructor(init?: ArraySearch);
  id: number;
  varPtr: interop.Pointer;
  search: Tcl_HashSearch;
  nextEntry: interop.Pointer;
  nextPtr: interop.Pointer;
}

declare class Tcl_Command_ {
  constructor(init?: Tcl_Command_);
}

declare class LiteralTable {
  constructor(init?: LiteralTable);
  buckets: interop.Pointer;
  staticBuckets: unknown /* const array */;
  numBuckets: number;
  numEntries: number;
  rebuildSize: number;
  mask: number;
}

declare class Tcl_FSVersion_ {
  constructor(init?: Tcl_FSVersion_);
}

declare class TclIntPlatStubs {
  constructor(init?: TclIntPlatStubs);
  magic: number;
  hooks: interop.Pointer;
  tclGetAndDetachPids: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  tclpCloseFile: (p1: interop.PointerConvertible) => number | null;
  tclpCreateCommandChannel: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible) => interop.Pointer | null;
  tclpCreatePipe: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  tclpCreateProcess: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible) => number | null;
  reserved5: interop.Pointer;
  tclpMakeFile: (p1: interop.PointerConvertible, p2: number) => interop.Pointer | null;
  tclpOpenFile: (p1: string, p2: number) => interop.Pointer | null;
  tclUnixWaitForFile: (p1: number, p2: number, p3: number) => number | null;
  tclpCreateTempFile: (p1: string) => interop.Pointer | null;
  tclpReaddir: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tclpLocaltime_unix: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tclpGmtime_unix: (p1: interop.PointerConvertible) => interop.Pointer | null;
  tclpInetNtoa: (p1: in_addr) => string | null;
  tclUnixCopyFile: (p1: string, p2: string, p3: interop.PointerConvertible, p4: number) => number | null;
}

declare class ImportedCmdData {
  constructor(init?: ImportedCmdData);
  realCmdPtr: interop.Pointer;
  selfPtr: interop.Pointer;
}

declare class mp_int {
  constructor(init?: mp_int);
  used: number;
  alloc: number;
  sign: number;
  dp: interop.Pointer;
}

type unnamed_6097424430779907637Descriptor = 
  | { numArgs: number }
  | { identity: number };

declare class unnamed_6097424430779907637 {
  constructor(init?: unnamed_6097424430779907637Descriptor);
  numArgs: number;
  identity: number;
}

type unnamed_17606793356190368671Descriptor = 
  | { str: unnamed_16727889889338753574 }
  | { listPtr: interop.PointerConvertible };

declare class unnamed_17606793356190368671 {
  constructor(init?: unnamed_17606793356190368671Descriptor);
  str: unnamed_16727889889338753574;
  listPtr: interop.Pointer;
}

type unnamed_7604300924961546821Descriptor = 
  | { objPtr: interop.PointerConvertible }
  | { tablePtr: interop.PointerConvertible }
  | { linkPtr: interop.PointerConvertible };

declare class unnamed_7604300924961546821 {
  constructor(init?: unnamed_7604300924961546821Descriptor);
  objPtr: interop.Pointer;
  tablePtr: interop.Pointer;
  linkPtr: interop.Pointer;
}

type unnamed_16940517678363118476Descriptor = 
  | { longValue: number }
  | { doubleValue: number }
  | { otherValuePtr: interop.PointerConvertible }
  | { wideValue: number }
  | { twoPtrValue: unnamed_1718681146382766305 }
  | { ptrAndLongRep: unnamed_3475170141862813391 };

declare class unnamed_16940517678363118476 {
  constructor(init?: unnamed_16940517678363118476Descriptor);
  longValue: number;
  doubleValue: number;
  otherValuePtr: interop.Pointer;
  wideValue: number;
  twoPtrValue: unnamed_1718681146382766305;
  ptrAndLongRep: unnamed_3475170141862813391;
}

type unnamed_9065905938125104667Descriptor = 
  | { eval: unnamed_7457919095575956670 }
  | { tebc: unnamed_1231445110418831064 };

declare class unnamed_9065905938125104667 {
  constructor(init?: unnamed_9065905938125104667Descriptor);
  eval: unnamed_7457919095575956670;
  tebc: unnamed_1231445110418831064;
}

type unnamed_16126239951412607018Descriptor = 
  | { oneWordValue: string | null }
  | { objPtr: interop.PointerConvertible }
  | { words: unknown /* const array */ }
  | { string: unknown /* const array */ };

declare class unnamed_16126239951412607018 {
  constructor(init?: unnamed_16126239951412607018Descriptor);
  oneWordValue: string | null;
  objPtr: interop.Pointer;
  words: unknown /* const array */;
  string: unknown /* const array */;
}

declare function Tcl_IncrRefCount(objPtr: interop.PointerConvertible): void;

declare function Tcl_DecrRefCount(objPtr: interop.PointerConvertible): void;

declare function Tcl_IsShared(objPtr: interop.PointerConvertible): number;

declare function Tcl_InitStubs(interp: interop.PointerConvertible, version: string, exact: number): string;

declare function TclTomMathInitializeStubs(interp: interop.PointerConvertible, version: string, epoch: number, revision: number): string;

declare function Tcl_Main(argc: number, argv: interop.PointerConvertible, appInitProc: (p1: interop.PointerConvertible) => number): void;

declare function Tcl_PkgInitStubsCheck(interp: interop.PointerConvertible, version: string, exact: number): string;

declare function Tcl_PkgProvideEx(interp: interop.PointerConvertible, name: string, version: string, clientData: interop.PointerConvertible): number;

declare function Tcl_PkgRequireEx(interp: interop.PointerConvertible, name: string, version: string, exact: number, clientDataPtr: interop.PointerConvertible): string;

declare function Tcl_Panic(format: string): void;

declare function Tcl_Alloc(size: number): string;

declare function Tcl_Free(ptr: string): void;

declare function Tcl_Realloc(ptr: string, size: number): string;

declare function Tcl_DbCkalloc(size: number, file: string, line: number): string;

declare function Tcl_DbCkfree(ptr: string, file: string, line: number): number;

declare function Tcl_DbCkrealloc(ptr: string, size: number, file: string, line: number): string;

declare function Tcl_CreateFileHandler(fd: number, mask: number, proc: (p1: interop.PointerConvertible, p2: number) => void, clientData: interop.PointerConvertible): void;

declare function Tcl_DeleteFileHandler(fd: number): void;

declare function Tcl_SetTimer(timePtr: interop.PointerConvertible): void;

declare function Tcl_Sleep(ms: number): void;

declare function Tcl_WaitForEvent(timePtr: interop.PointerConvertible): number;

declare function Tcl_AppendAllObjTypes(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible): number;

declare function Tcl_AppendStringsToObj(objPtr: interop.PointerConvertible): void;

declare function Tcl_AppendToObj(objPtr: interop.PointerConvertible, bytes: string, length: number): void;

declare function Tcl_ConcatObj(objc: number, objv: interop.Pointer): interop.Pointer;

declare function Tcl_ConvertToType(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, typePtr: interop.PointerConvertible): number;

declare function Tcl_DbDecrRefCount(objPtr: interop.PointerConvertible, file: string, line: number): void;

declare function Tcl_DbIncrRefCount(objPtr: interop.PointerConvertible, file: string, line: number): void;

declare function Tcl_DbIsShared(objPtr: interop.PointerConvertible, file: string, line: number): number;

declare function Tcl_DbNewBooleanObj(boolValue: number, file: string, line: number): interop.Pointer;

declare function Tcl_DbNewByteArrayObj(bytes: interop.PointerConvertible, length: number, file: string, line: number): interop.Pointer;

declare function Tcl_DbNewDoubleObj(doubleValue: number, file: string, line: number): interop.Pointer;

declare function Tcl_DbNewListObj(objc: number, objv: interop.PointerConvertible, file: string, line: number): interop.Pointer;

declare function Tcl_DbNewLongObj(longValue: number, file: string, line: number): interop.Pointer;

declare function Tcl_DbNewObj(file: string, line: number): interop.Pointer;

declare function Tcl_DbNewStringObj(bytes: string, length: number, file: string, line: number): interop.Pointer;

declare function Tcl_DuplicateObj(objPtr: interop.PointerConvertible): interop.Pointer;

declare function TclFreeObj(objPtr: interop.PointerConvertible): void;

declare function Tcl_GetBoolean(interp: interop.PointerConvertible, src: string, boolPtr: interop.PointerConvertible): number;

declare function Tcl_GetBooleanFromObj(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, boolPtr: interop.PointerConvertible): number;

declare function Tcl_GetByteArrayFromObj(objPtr: interop.PointerConvertible, lengthPtr: interop.PointerConvertible): interop.Pointer;

declare function Tcl_GetDouble(interp: interop.PointerConvertible, src: string, doublePtr: interop.PointerConvertible): number;

declare function Tcl_GetDoubleFromObj(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, doublePtr: interop.PointerConvertible): number;

declare function Tcl_GetIndexFromObj(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, tablePtr: interop.PointerConvertible, msg: string, flags: number, indexPtr: interop.PointerConvertible): number;

declare function Tcl_GetInt(interp: interop.PointerConvertible, src: string, intPtr: interop.PointerConvertible): number;

declare function Tcl_GetIntFromObj(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, intPtr: interop.PointerConvertible): number;

declare function Tcl_GetLongFromObj(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, longPtr: interop.PointerConvertible): number;

declare function Tcl_GetObjType(typeName: string): interop.Pointer;

declare function Tcl_GetStringFromObj(objPtr: interop.PointerConvertible, lengthPtr: interop.PointerConvertible): string;

declare function Tcl_InvalidateStringRep(objPtr: interop.PointerConvertible): void;

declare function Tcl_ListObjAppendList(interp: interop.PointerConvertible, listPtr: interop.PointerConvertible, elemListPtr: interop.PointerConvertible): number;

declare function Tcl_ListObjAppendElement(interp: interop.PointerConvertible, listPtr: interop.PointerConvertible, objPtr: interop.PointerConvertible): number;

declare function Tcl_ListObjGetElements(interp: interop.PointerConvertible, listPtr: interop.PointerConvertible, objcPtr: interop.PointerConvertible, objvPtr: interop.PointerConvertible): number;

declare function Tcl_ListObjIndex(interp: interop.PointerConvertible, listPtr: interop.PointerConvertible, index: number, objPtrPtr: interop.PointerConvertible): number;

declare function Tcl_ListObjLength(interp: interop.PointerConvertible, listPtr: interop.PointerConvertible, lengthPtr: interop.PointerConvertible): number;

declare function Tcl_ListObjReplace(interp: interop.PointerConvertible, listPtr: interop.PointerConvertible, first: number, count: number, objc: number, objv: interop.Pointer): number;

declare function Tcl_NewBooleanObj(boolValue: number): interop.Pointer;

declare function Tcl_NewByteArrayObj(bytes: interop.PointerConvertible, length: number): interop.Pointer;

declare function Tcl_NewDoubleObj(doubleValue: number): interop.Pointer;

declare function Tcl_NewIntObj(intValue: number): interop.Pointer;

declare function Tcl_NewListObj(objc: number, objv: interop.Pointer): interop.Pointer;

declare function Tcl_NewLongObj(longValue: number): interop.Pointer;

declare function Tcl_NewObj(): interop.Pointer;

declare function Tcl_NewStringObj(bytes: string, length: number): interop.Pointer;

declare function Tcl_SetBooleanObj(objPtr: interop.PointerConvertible, boolValue: number): void;

declare function Tcl_SetByteArrayLength(objPtr: interop.PointerConvertible, length: number): interop.Pointer;

declare function Tcl_SetByteArrayObj(objPtr: interop.PointerConvertible, bytes: interop.PointerConvertible, length: number): void;

declare function Tcl_SetDoubleObj(objPtr: interop.PointerConvertible, doubleValue: number): void;

declare function Tcl_SetIntObj(objPtr: interop.PointerConvertible, intValue: number): void;

declare function Tcl_SetListObj(objPtr: interop.PointerConvertible, objc: number, objv: interop.Pointer): void;

declare function Tcl_SetLongObj(objPtr: interop.PointerConvertible, longValue: number): void;

declare function Tcl_SetObjLength(objPtr: interop.PointerConvertible, length: number): void;

declare function Tcl_SetStringObj(objPtr: interop.PointerConvertible, bytes: string, length: number): void;

declare function Tcl_AddErrorInfo(interp: interop.PointerConvertible, message: string): void;

declare function Tcl_AddObjErrorInfo(interp: interop.PointerConvertible, message: string, length: number): void;

declare function Tcl_AllowExceptions(interp: interop.PointerConvertible): void;

declare function Tcl_AppendElement(interp: interop.PointerConvertible, element: string): void;

declare function Tcl_AppendResult(interp: interop.PointerConvertible): void;

declare function Tcl_AsyncCreate(proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => number, clientData: interop.PointerConvertible): interop.Pointer;

declare function Tcl_AsyncDelete(async: interop.PointerConvertible): void;

declare function Tcl_AsyncInvoke(interp: interop.PointerConvertible, code: number): number;

declare function Tcl_AsyncMark(async: interop.PointerConvertible): void;

declare function Tcl_AsyncReady(): number;

declare function Tcl_BackgroundError(interp: interop.PointerConvertible): void;

declare function Tcl_Backslash(src: string, readPtr: interop.PointerConvertible): number;

declare function Tcl_BadChannelOption(interp: interop.PointerConvertible, optionName: string, optionList: string): number;

declare function Tcl_CallWhenDeleted(interp: interop.PointerConvertible, proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, clientData: interop.PointerConvertible): void;

declare function Tcl_CancelIdleCall(idleProc: (p1: interop.PointerConvertible) => void, clientData: interop.PointerConvertible): void;

declare function Tcl_Close(interp: interop.PointerConvertible, chan: interop.PointerConvertible): number;

declare function Tcl_CommandComplete(cmd: string): number;

declare function Tcl_Concat(argc: number, argv: interop.PointerConvertible): string;

declare function Tcl_ConvertElement(src: string, dst: string, flags: number): number;

declare function Tcl_ConvertCountedElement(src: string, length: number, dst: string, flags: number): number;

declare function Tcl_CreateAlias(slave: interop.PointerConvertible, slaveCmd: string, target: interop.PointerConvertible, targetCmd: string, argc: number, argv: interop.PointerConvertible): number;

declare function Tcl_CreateAliasObj(slave: interop.PointerConvertible, slaveCmd: string, target: interop.PointerConvertible, targetCmd: string, objc: number, objv: interop.Pointer): number;

declare function Tcl_CreateChannel(typePtr: interop.PointerConvertible, chanName: string, instanceData: interop.PointerConvertible, mask: number): interop.Pointer;

declare function Tcl_CreateChannelHandler(chan: interop.PointerConvertible, mask: number, proc: (p1: interop.PointerConvertible, p2: number) => void, clientData: interop.PointerConvertible): void;

declare function Tcl_CreateCloseHandler(chan: interop.PointerConvertible, proc: (p1: interop.PointerConvertible) => void, clientData: interop.PointerConvertible): void;

declare function Tcl_CreateCommand(interp: interop.PointerConvertible, cmdName: string, proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number, clientData: interop.PointerConvertible, deleteProc: (p1: interop.PointerConvertible) => void): interop.Pointer;

declare function Tcl_CreateEventSource(setupProc: (p1: interop.PointerConvertible, p2: number) => void, checkProc: (p1: interop.PointerConvertible, p2: number) => void, clientData: interop.PointerConvertible): void;

declare function Tcl_CreateExitHandler(proc: (p1: interop.PointerConvertible) => void, clientData: interop.PointerConvertible): void;

declare function Tcl_CreateInterp(): interop.Pointer;

declare function Tcl_CreateMathFunc(interp: interop.PointerConvertible, name: string, numArgs: number, argTypes: interop.PointerConvertible, proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => number, clientData: interop.PointerConvertible): void;

declare function Tcl_CreateObjCommand(interp: interop.PointerConvertible, cmdName: string, proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number, clientData: interop.PointerConvertible, deleteProc: (p1: interop.PointerConvertible) => void): interop.Pointer;

declare function Tcl_CreateSlave(interp: interop.PointerConvertible, slaveName: string, isSafe: number): interop.Pointer;

declare function Tcl_CreateTimerHandler(milliseconds: number, proc: (p1: interop.PointerConvertible) => void, clientData: interop.PointerConvertible): interop.Pointer;

declare function Tcl_CreateTrace(interp: interop.PointerConvertible, level: number, proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: string, p5: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number, p6: interop.PointerConvertible, p7: number, p8: interop.PointerConvertible) => void, clientData: interop.PointerConvertible): interop.Pointer;

declare function Tcl_DeleteAssocData(interp: interop.PointerConvertible, name: string): void;

declare function Tcl_DeleteChannelHandler(chan: interop.PointerConvertible, proc: (p1: interop.PointerConvertible, p2: number) => void, clientData: interop.PointerConvertible): void;

declare function Tcl_DeleteCloseHandler(chan: interop.PointerConvertible, proc: (p1: interop.PointerConvertible) => void, clientData: interop.PointerConvertible): void;

declare function Tcl_DeleteCommand(interp: interop.PointerConvertible, cmdName: string): number;

declare function Tcl_DeleteCommandFromToken(interp: interop.PointerConvertible, command: interop.PointerConvertible): number;

declare function Tcl_DeleteEvents(proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number, clientData: interop.PointerConvertible): void;

declare function Tcl_DeleteEventSource(setupProc: (p1: interop.PointerConvertible, p2: number) => void, checkProc: (p1: interop.PointerConvertible, p2: number) => void, clientData: interop.PointerConvertible): void;

declare function Tcl_DeleteExitHandler(proc: (p1: interop.PointerConvertible) => void, clientData: interop.PointerConvertible): void;

declare function Tcl_DeleteHashEntry(entryPtr: interop.PointerConvertible): void;

declare function Tcl_DeleteHashTable(tablePtr: interop.PointerConvertible): void;

declare function Tcl_DeleteInterp(interp: interop.PointerConvertible): void;

declare function Tcl_DetachPids(numPids: number, pidPtr: interop.PointerConvertible): void;

declare function Tcl_DeleteTimerHandler(token: interop.PointerConvertible): void;

declare function Tcl_DeleteTrace(interp: interop.PointerConvertible, trace: interop.PointerConvertible): void;

declare function Tcl_DontCallWhenDeleted(interp: interop.PointerConvertible, proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, clientData: interop.PointerConvertible): void;

declare function Tcl_DoOneEvent(flags: number): number;

declare function Tcl_DoWhenIdle(proc: (p1: interop.PointerConvertible) => void, clientData: interop.PointerConvertible): void;

declare function Tcl_DStringAppend(dsPtr: interop.PointerConvertible, bytes: string, length: number): string;

declare function Tcl_DStringAppendElement(dsPtr: interop.PointerConvertible, element: string): string;

declare function Tcl_DStringEndSublist(dsPtr: interop.PointerConvertible): void;

declare function Tcl_DStringFree(dsPtr: interop.PointerConvertible): void;

declare function Tcl_DStringGetResult(interp: interop.PointerConvertible, dsPtr: interop.PointerConvertible): void;

declare function Tcl_DStringInit(dsPtr: interop.PointerConvertible): void;

declare function Tcl_DStringResult(interp: interop.PointerConvertible, dsPtr: interop.PointerConvertible): void;

declare function Tcl_DStringSetLength(dsPtr: interop.PointerConvertible, length: number): void;

declare function Tcl_DStringStartSublist(dsPtr: interop.PointerConvertible): void;

declare function Tcl_Eof(chan: interop.PointerConvertible): number;

declare function Tcl_ErrnoId(): string;

declare function Tcl_ErrnoMsg(err: number): string;

declare function Tcl_Eval(interp: interop.PointerConvertible, script: string): number;

declare function Tcl_EvalFile(interp: interop.PointerConvertible, fileName: string): number;

declare function Tcl_EvalObj(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible): number;

declare function Tcl_EventuallyFree(clientData: interop.PointerConvertible, freeProc: (p1: string) => void): void;

declare function Tcl_Exit(status: number): void;

declare function Tcl_ExposeCommand(interp: interop.PointerConvertible, hiddenCmdToken: string, cmdName: string): number;

declare function Tcl_ExprBoolean(interp: interop.PointerConvertible, expr: string, ptr: interop.PointerConvertible): number;

declare function Tcl_ExprBooleanObj(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, ptr: interop.PointerConvertible): number;

declare function Tcl_ExprDouble(interp: interop.PointerConvertible, expr: string, ptr: interop.PointerConvertible): number;

declare function Tcl_ExprDoubleObj(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, ptr: interop.PointerConvertible): number;

declare function Tcl_ExprLong(interp: interop.PointerConvertible, expr: string, ptr: interop.PointerConvertible): number;

declare function Tcl_ExprLongObj(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, ptr: interop.PointerConvertible): number;

declare function Tcl_ExprObj(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, resultPtrPtr: interop.PointerConvertible): number;

declare function Tcl_ExprString(interp: interop.PointerConvertible, expr: string): number;

declare function Tcl_Finalize(): void;

declare function Tcl_FindExecutable(argv0: string): void;

declare function Tcl_FirstHashEntry(tablePtr: interop.PointerConvertible, searchPtr: interop.PointerConvertible): interop.Pointer;

declare function Tcl_Flush(chan: interop.PointerConvertible): number;

declare function Tcl_FreeResult(interp: interop.PointerConvertible): void;

declare function Tcl_GetAlias(interp: interop.PointerConvertible, slaveCmd: string, targetInterpPtr: interop.PointerConvertible, targetCmdPtr: interop.PointerConvertible, argcPtr: interop.PointerConvertible, argvPtr: interop.PointerConvertible): number;

declare function Tcl_GetAliasObj(interp: interop.PointerConvertible, slaveCmd: string, targetInterpPtr: interop.PointerConvertible, targetCmdPtr: interop.PointerConvertible, objcPtr: interop.PointerConvertible, objv: interop.PointerConvertible): number;

declare function Tcl_GetAssocData(interp: interop.PointerConvertible, name: string, procPtr: interop.PointerConvertible): interop.Pointer;

declare function Tcl_GetChannel(interp: interop.PointerConvertible, chanName: string, modePtr: interop.PointerConvertible): interop.Pointer;

declare function Tcl_GetChannelBufferSize(chan: interop.PointerConvertible): number;

declare function Tcl_GetChannelHandle(chan: interop.PointerConvertible, direction: number, handlePtr: interop.PointerConvertible): number;

declare function Tcl_GetChannelInstanceData(chan: interop.PointerConvertible): interop.Pointer;

declare function Tcl_GetChannelMode(chan: interop.PointerConvertible): number;

declare function Tcl_GetChannelName(chan: interop.PointerConvertible): string;

declare function Tcl_GetChannelOption(interp: interop.PointerConvertible, chan: interop.PointerConvertible, optionName: string, dsPtr: interop.PointerConvertible): number;

declare function Tcl_GetChannelType(chan: interop.PointerConvertible): interop.Pointer;

declare function Tcl_GetCommandInfo(interp: interop.PointerConvertible, cmdName: string, infoPtr: interop.PointerConvertible): number;

declare function Tcl_GetCommandName(interp: interop.PointerConvertible, command: interop.PointerConvertible): string;

declare function Tcl_GetErrno(): number;

declare function Tcl_GetHostName(): string;

declare function Tcl_GetInterpPath(askInterp: interop.PointerConvertible, slaveInterp: interop.PointerConvertible): number;

declare function Tcl_GetMaster(interp: interop.PointerConvertible): interop.Pointer;

declare function Tcl_GetNameOfExecutable(): string;

declare function Tcl_GetObjResult(interp: interop.PointerConvertible): interop.Pointer;

declare function Tcl_GetOpenFile(interp: interop.PointerConvertible, chanID: string, forWriting: number, checkUsage: number, filePtr: interop.PointerConvertible): number;

declare function Tcl_GetPathType(path: string): interop.Enum<typeof Tcl_PathType>;

declare function Tcl_Gets(chan: interop.PointerConvertible, dsPtr: interop.PointerConvertible): number;

declare function Tcl_GetsObj(chan: interop.PointerConvertible, objPtr: interop.PointerConvertible): number;

declare function Tcl_GetServiceMode(): number;

declare function Tcl_GetSlave(interp: interop.PointerConvertible, slaveName: string): interop.Pointer;

declare function Tcl_GetStdChannel(type: number): interop.Pointer;

declare function Tcl_GetStringResult(interp: interop.PointerConvertible): string;

declare function Tcl_GetVar(interp: interop.PointerConvertible, varName: string, flags: number): string;

declare function Tcl_GetVar2(interp: interop.PointerConvertible, part1: string, part2: string, flags: number): string;

declare function Tcl_GlobalEval(interp: interop.PointerConvertible, command: string): number;

declare function Tcl_GlobalEvalObj(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible): number;

declare function Tcl_HideCommand(interp: interop.PointerConvertible, cmdName: string, hiddenCmdToken: string): number;

declare function Tcl_Init(interp: interop.PointerConvertible): number;

declare function Tcl_InitHashTable(tablePtr: interop.PointerConvertible, keyType: number): void;

declare function Tcl_InputBlocked(chan: interop.PointerConvertible): number;

declare function Tcl_InputBuffered(chan: interop.PointerConvertible): number;

declare function Tcl_InterpDeleted(interp: interop.PointerConvertible): number;

declare function Tcl_IsSafe(interp: interop.PointerConvertible): number;

declare function Tcl_JoinPath(argc: number, argv: interop.PointerConvertible, resultPtr: interop.PointerConvertible): string;

declare function Tcl_LinkVar(interp: interop.PointerConvertible, varName: string, addr: string, type: number): number;

declare function Tcl_MakeFileChannel(handle: interop.PointerConvertible, mode: number): interop.Pointer;

declare function Tcl_MakeSafe(interp: interop.PointerConvertible): number;

declare function Tcl_MakeTcpClientChannel(tcpSocket: interop.PointerConvertible): interop.Pointer;

declare function Tcl_Merge(argc: number, argv: interop.PointerConvertible): string;

declare function Tcl_NextHashEntry(searchPtr: interop.PointerConvertible): interop.Pointer;

declare function Tcl_NotifyChannel(channel: interop.PointerConvertible, mask: number): void;

declare function Tcl_ObjGetVar2(interp: interop.PointerConvertible, part1Ptr: interop.PointerConvertible, part2Ptr: interop.PointerConvertible, flags: number): interop.Pointer;

declare function Tcl_ObjSetVar2(interp: interop.PointerConvertible, part1Ptr: interop.PointerConvertible, part2Ptr: interop.PointerConvertible, newValuePtr: interop.PointerConvertible, flags: number): interop.Pointer;

declare function Tcl_OpenCommandChannel(interp: interop.PointerConvertible, argc: number, argv: interop.PointerConvertible, flags: number): interop.Pointer;

declare function Tcl_OpenFileChannel(interp: interop.PointerConvertible, fileName: string, modeString: string, permissions: number): interop.Pointer;

declare function Tcl_OpenTcpClient(interp: interop.PointerConvertible, port: number, address: string, myaddr: string, myport: number, async: number): interop.Pointer;

declare function Tcl_OpenTcpServer(interp: interop.PointerConvertible, port: number, host: string, acceptProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: number) => void, callbackData: interop.PointerConvertible): interop.Pointer;

declare function Tcl_Preserve(data: interop.PointerConvertible): void;

declare function Tcl_PrintDouble(interp: interop.PointerConvertible, value: number, dst: string): void;

declare function Tcl_PutEnv(assignment: string): number;

declare function Tcl_PosixError(interp: interop.PointerConvertible): string;

declare function Tcl_QueueEvent(evPtr: interop.PointerConvertible, position: interop.Enum<typeof Tcl_QueuePosition>): void;

declare function Tcl_Read(chan: interop.PointerConvertible, bufPtr: string, toRead: number): number;

declare function Tcl_ReapDetachedProcs(): void;

declare function Tcl_RecordAndEval(interp: interop.PointerConvertible, cmd: string, flags: number): number;

declare function Tcl_RecordAndEvalObj(interp: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, flags: number): number;

declare function Tcl_RegisterChannel(interp: interop.PointerConvertible, chan: interop.PointerConvertible): void;

declare function Tcl_RegisterObjType(typePtr: interop.PointerConvertible): void;

declare function Tcl_RegExpCompile(interp: interop.PointerConvertible, pattern: string): interop.Pointer;

declare function Tcl_RegExpExec(interp: interop.PointerConvertible, regexp: interop.PointerConvertible, text: string, start: string): number;

declare function Tcl_RegExpMatch(interp: interop.PointerConvertible, text: string, pattern: string): number;

declare function Tcl_RegExpRange(regexp: interop.PointerConvertible, index: number, startPtr: interop.PointerConvertible, endPtr: interop.PointerConvertible): void;

declare function Tcl_Release(clientData: interop.PointerConvertible): void;

declare function Tcl_ResetResult(interp: interop.PointerConvertible): void;

declare function Tcl_ScanElement(str: string, flagPtr: interop.PointerConvertible): number;

declare function Tcl_ScanCountedElement(str: string, length: number, flagPtr: interop.PointerConvertible): number;

declare function Tcl_SeekOld(chan: interop.PointerConvertible, offset: number, mode: number): number;

declare function Tcl_ServiceAll(): number;

declare function Tcl_ServiceEvent(flags: number): number;

declare function Tcl_SetAssocData(interp: interop.PointerConvertible, name: string, proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, clientData: interop.PointerConvertible): void;

declare function Tcl_SetChannelBufferSize(chan: interop.PointerConvertible, sz: number): void;

declare function Tcl_SetChannelOption(interp: interop.PointerConvertible, chan: interop.PointerConvertible, optionName: string, newValue: string): number;

declare function Tcl_SetCommandInfo(interp: interop.PointerConvertible, cmdName: string, infoPtr: interop.PointerConvertible): number;

declare function Tcl_SetErrno(err: number): void;

declare function Tcl_SetErrorCode(interp: interop.PointerConvertible): void;

declare function Tcl_SetMaxBlockTime(timePtr: interop.PointerConvertible): void;

declare function Tcl_SetPanicProc(panicProc: (p1: string) => void): void;

declare function Tcl_SetRecursionLimit(interp: interop.PointerConvertible, depth: number): number;

declare function Tcl_SetResult(interp: interop.PointerConvertible, result: string, freeProc: (p1: string) => void): void;

declare function Tcl_SetServiceMode(mode: number): number;

declare function Tcl_SetObjErrorCode(interp: interop.PointerConvertible, errorObjPtr: interop.PointerConvertible): void;

declare function Tcl_SetObjResult(interp: interop.PointerConvertible, resultObjPtr: interop.PointerConvertible): void;

declare function Tcl_SetStdChannel(channel: interop.PointerConvertible, type: number): void;

declare function Tcl_SetVar(interp: interop.PointerConvertible, varName: string, newValue: string, flags: number): string;

declare function Tcl_SetVar2(interp: interop.PointerConvertible, part1: string, part2: string, newValue: string, flags: number): string;

declare function Tcl_SignalId(sig: number): string;

declare function Tcl_SignalMsg(sig: number): string;

declare function Tcl_SourceRCFile(interp: interop.PointerConvertible): void;

declare function Tcl_SplitList(interp: interop.PointerConvertible, listStr: string, argcPtr: interop.PointerConvertible, argvPtr: interop.PointerConvertible): number;

declare function Tcl_SplitPath(path: string, argcPtr: interop.PointerConvertible, argvPtr: interop.PointerConvertible): void;

declare function Tcl_StaticPackage(interp: interop.PointerConvertible, pkgName: string, initProc: (p1: interop.PointerConvertible) => number, safeInitProc: (p1: interop.PointerConvertible) => number): void;

declare function Tcl_StringMatch(str: string, pattern: string): number;

declare function Tcl_TellOld(chan: interop.PointerConvertible): number;

declare function Tcl_TraceVar(interp: interop.PointerConvertible, varName: string, flags: number, proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string, p5: number) => string, clientData: interop.PointerConvertible): number;

declare function Tcl_TraceVar2(interp: interop.PointerConvertible, part1: string, part2: string, flags: number, proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string, p5: number) => string, clientData: interop.PointerConvertible): number;

declare function Tcl_TranslateFileName(interp: interop.PointerConvertible, name: string, bufferPtr: interop.PointerConvertible): string;

declare function Tcl_Ungets(chan: interop.PointerConvertible, str: string, len: number, atHead: number): number;

declare function Tcl_UnlinkVar(interp: interop.PointerConvertible, varName: string): void;

declare function Tcl_UnregisterChannel(interp: interop.PointerConvertible, chan: interop.PointerConvertible): number;

declare function Tcl_UnsetVar(interp: interop.PointerConvertible, varName: string, flags: number): number;

declare function Tcl_UnsetVar2(interp: interop.PointerConvertible, part1: string, part2: string, flags: number): number;

declare function Tcl_UntraceVar(interp: interop.PointerConvertible, varName: string, flags: number, proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string, p5: number) => string, clientData: interop.PointerConvertible): void;

declare function Tcl_UntraceVar2(interp: interop.PointerConvertible, part1: string, part2: string, flags: number, proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string, p5: number) => string, clientData: interop.PointerConvertible): void;

declare function Tcl_UpdateLinkedVar(interp: interop.PointerConvertible, varName: string): void;

declare function Tcl_UpVar(interp: interop.PointerConvertible, frameName: string, varName: string, localName: string, flags: number): number;

declare function Tcl_UpVar2(interp: interop.PointerConvertible, frameName: string, part1: string, part2: string, localName: string, flags: number): number;

declare function Tcl_VarEval(interp: interop.PointerConvertible): number;

declare function Tcl_VarTraceInfo(interp: interop.PointerConvertible, varName: string, flags: number, procPtr: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string, p5: number) => string, prevClientData: interop.PointerConvertible): interop.Pointer;

declare function Tcl_VarTraceInfo2(interp: interop.PointerConvertible, part1: string, part2: string, flags: number, procPtr: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string, p5: number) => string, prevClientData: interop.PointerConvertible): interop.Pointer;

declare function Tcl_Write(chan: interop.PointerConvertible, s: string, slen: number): number;

declare function Tcl_WrongNumArgs(interp: interop.PointerConvertible, objc: number, objv: interop.Pointer, message: string): void;

declare function Tcl_DumpActiveMemory(fileName: string): number;

declare function Tcl_ValidateAllMemory(file: string, line: number): void;

declare function Tcl_AppendResultVA(interp: interop.PointerConvertible, argList: string): void;

declare function Tcl_AppendStringsToObjVA(objPtr: interop.PointerConvertible, argList: string): void;

declare function Tcl_HashStats(tablePtr: interop.PointerConvertible): string;

declare function Tcl_ParseVar(interp: interop.PointerConvertible, start: string, termPtr: interop.PointerConvertible): string;

declare function Tcl_PkgPresent(interp: interop.PointerConvertible, name: string, version: string, exact: number): string;

declare function Tcl_PkgPresentEx(interp: interop.PointerConvertible, name: string, version: string, exact: number, clientDataPtr: interop.PointerConvertible): string;

declare function Tcl_PkgProvide(interp: interop.PointerConvertible, name: string, version: string): number;

declare function Tcl_PkgRequire(interp: interop.PointerConvertible, name: string, version: string, exact: number): string;

declare function Tcl_SetErrorCodeVA(interp: interop.PointerConvertible, argList: string): void;

declare function Tcl_VarEvalVA(interp: interop.PointerConvertible, argList: string): number;

declare function Tcl_WaitPid(pid: interop.PointerConvertible, statPtr: interop.PointerConvertible, options: number): interop.Pointer;

declare function Tcl_PanicVA(format: string, argList: string): void;

declare function Tcl_GetVersion(major: interop.PointerConvertible, minor: interop.PointerConvertible, patchLevel: interop.PointerConvertible, type: interop.PointerConvertible): void;

declare function Tcl_InitMemory(interp: interop.PointerConvertible): void;

declare function Tcl_StackChannel(interp: interop.PointerConvertible, typePtr: interop.PointerConvertible, instanceData: interop.PointerConvertible, mask: number, prevChan: interop.PointerConvertible): interop.Pointer;

declare function Tcl_UnstackChannel(interp: interop.PointerConvertible, chan: interop.PointerConvertible): number;

declare function Tcl_GetStackedChannel(chan: interop.PointerConvertible): interop.Pointer;

declare function Tcl_SetMainLoop(proc: () => void): void;

declare function Tcl_AppendObjToObj(objPtr: interop.PointerConvertible, appendObjPtr: interop.PointerConvertible): void;

declare function Tcl_CreateEncoding(typePtr: interop.PointerConvertible): interop.Pointer;

declare function Tcl_CreateThreadExitHandler(proc: (p1: interop.PointerConvertible) => void, clientData: interop.PointerConvertible): void;

declare function Tcl_DeleteThreadExitHandler(proc: (p1: interop.PointerConvertible) => void, clientData: interop.PointerConvertible): void;

declare function Tcl_DiscardResult(statePtr: interop.PointerConvertible): void;

declare function Tcl_EvalEx(interp: interop.PointerConvertible, script: string, numBytes: number, flags: number): number;

declare function Tcl_EvalObjv(interp: interop.PointerConvertible, objc: number, objv: interop.Pointer, flags: number): number;

declare function Tcl_EvalObjEx(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, flags: number): number;

declare function Tcl_ExitThread(status: number): void;

declare function Tcl_ExternalToUtf(interp: interop.PointerConvertible, encoding: interop.PointerConvertible, src: string, srcLen: number, flags: number, statePtr: interop.PointerConvertible, dst: string, dstLen: number, srcReadPtr: interop.PointerConvertible, dstWrotePtr: interop.PointerConvertible, dstCharsPtr: interop.PointerConvertible): number;

declare function Tcl_ExternalToUtfDString(encoding: interop.PointerConvertible, src: string, srcLen: number, dsPtr: interop.PointerConvertible): string;

declare function Tcl_FinalizeThread(): void;

declare function Tcl_FinalizeNotifier(clientData: interop.PointerConvertible): void;

declare function Tcl_FreeEncoding(encoding: interop.PointerConvertible): void;

declare function Tcl_GetCurrentThread(): interop.Pointer;

declare function Tcl_GetEncoding(interp: interop.PointerConvertible, name: string): interop.Pointer;

declare function Tcl_GetEncodingName(encoding: interop.PointerConvertible): string;

declare function Tcl_GetEncodingNames(interp: interop.PointerConvertible): void;

declare function Tcl_GetIndexFromObjStruct(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, tablePtr: interop.PointerConvertible, offset: number, msg: string, flags: number, indexPtr: interop.PointerConvertible): number;

declare function Tcl_GetThreadData(keyPtr: interop.PointerConvertible, size: number): interop.Pointer;

declare function Tcl_GetVar2Ex(interp: interop.PointerConvertible, part1: string, part2: string, flags: number): interop.Pointer;

declare function Tcl_InitNotifier(): interop.Pointer;

declare function Tcl_MutexLock(mutexPtr: interop.PointerConvertible): void;

declare function Tcl_MutexUnlock(mutexPtr: interop.PointerConvertible): void;

declare function Tcl_ConditionNotify(condPtr: interop.PointerConvertible): void;

declare function Tcl_ConditionWait(condPtr: interop.PointerConvertible, mutexPtr: interop.PointerConvertible, timePtr: interop.PointerConvertible): void;

declare function Tcl_NumUtfChars(src: string, length: number): number;

declare function Tcl_ReadChars(channel: interop.PointerConvertible, objPtr: interop.PointerConvertible, charsToRead: number, appendFlag: number): number;

declare function Tcl_RestoreResult(interp: interop.PointerConvertible, statePtr: interop.PointerConvertible): void;

declare function Tcl_SaveResult(interp: interop.PointerConvertible, statePtr: interop.PointerConvertible): void;

declare function Tcl_SetSystemEncoding(interp: interop.PointerConvertible, name: string): number;

declare function Tcl_SetVar2Ex(interp: interop.PointerConvertible, part1: string, part2: string, newValuePtr: interop.PointerConvertible, flags: number): interop.Pointer;

declare function Tcl_ThreadAlert(threadId: interop.PointerConvertible): void;

declare function Tcl_ThreadQueueEvent(threadId: interop.PointerConvertible, evPtr: interop.PointerConvertible, position: interop.Enum<typeof Tcl_QueuePosition>): void;

declare function Tcl_UniCharAtIndex(src: string, index: number): number;

declare function Tcl_UniCharToLower(ch: number): number;

declare function Tcl_UniCharToTitle(ch: number): number;

declare function Tcl_UniCharToUpper(ch: number): number;

declare function Tcl_UniCharToUtf(ch: number, buf: string): number;

declare function Tcl_UtfAtIndex(src: string, index: number): string;

declare function Tcl_UtfCharComplete(src: string, length: number): number;

declare function Tcl_UtfBackslash(src: string, readPtr: interop.PointerConvertible, dst: string): number;

declare function Tcl_UtfFindFirst(src: string, ch: number): string;

declare function Tcl_UtfFindLast(src: string, ch: number): string;

declare function Tcl_UtfNext(src: string): string;

declare function Tcl_UtfPrev(src: string, start: string): string;

declare function Tcl_UtfToExternal(interp: interop.PointerConvertible, encoding: interop.PointerConvertible, src: string, srcLen: number, flags: number, statePtr: interop.PointerConvertible, dst: string, dstLen: number, srcReadPtr: interop.PointerConvertible, dstWrotePtr: interop.PointerConvertible, dstCharsPtr: interop.PointerConvertible): number;

declare function Tcl_UtfToExternalDString(encoding: interop.PointerConvertible, src: string, srcLen: number, dsPtr: interop.PointerConvertible): string;

declare function Tcl_UtfToLower(src: string): number;

declare function Tcl_UtfToTitle(src: string): number;

declare function Tcl_UtfToUniChar(src: string, chPtr: interop.PointerConvertible): number;

declare function Tcl_UtfToUpper(src: string): number;

declare function Tcl_WriteChars(chan: interop.PointerConvertible, src: string, srcLen: number): number;

declare function Tcl_WriteObj(chan: interop.PointerConvertible, objPtr: interop.PointerConvertible): number;

declare function Tcl_GetString(objPtr: interop.PointerConvertible): string;

declare function Tcl_GetDefaultEncodingDir(): string;

declare function Tcl_SetDefaultEncodingDir(path: string): void;

declare function Tcl_AlertNotifier(clientData: interop.PointerConvertible): void;

declare function Tcl_ServiceModeHook(mode: number): void;

declare function Tcl_UniCharIsAlnum(ch: number): number;

declare function Tcl_UniCharIsAlpha(ch: number): number;

declare function Tcl_UniCharIsDigit(ch: number): number;

declare function Tcl_UniCharIsLower(ch: number): number;

declare function Tcl_UniCharIsSpace(ch: number): number;

declare function Tcl_UniCharIsUpper(ch: number): number;

declare function Tcl_UniCharIsWordChar(ch: number): number;

declare function Tcl_UniCharLen(uniStr: interop.PointerConvertible): number;

declare function Tcl_UniCharNcmp(ucs: interop.PointerConvertible, uct: interop.PointerConvertible, numChars: number): number;

declare function Tcl_UniCharToUtfDString(uniStr: interop.PointerConvertible, uniLength: number, dsPtr: interop.PointerConvertible): string;

declare function Tcl_UtfToUniCharDString(src: string, length: number, dsPtr: interop.PointerConvertible): interop.Pointer;

declare function Tcl_GetRegExpFromObj(interp: interop.PointerConvertible, patObj: interop.PointerConvertible, flags: number): interop.Pointer;

declare function Tcl_EvalTokens(interp: interop.PointerConvertible, tokenPtr: interop.PointerConvertible, count: number): interop.Pointer;

declare function Tcl_FreeParse(parsePtr: interop.PointerConvertible): void;

declare function Tcl_LogCommandInfo(interp: interop.PointerConvertible, script: string, command: string, length: number): void;

declare function Tcl_ParseBraces(interp: interop.PointerConvertible, start: string, numBytes: number, parsePtr: interop.PointerConvertible, append: number, termPtr: interop.PointerConvertible): number;

declare function Tcl_ParseCommand(interp: interop.PointerConvertible, start: string, numBytes: number, nested: number, parsePtr: interop.PointerConvertible): number;

declare function Tcl_ParseExpr(interp: interop.PointerConvertible, start: string, numBytes: number, parsePtr: interop.PointerConvertible): number;

declare function Tcl_ParseQuotedString(interp: interop.PointerConvertible, start: string, numBytes: number, parsePtr: interop.PointerConvertible, append: number, termPtr: interop.PointerConvertible): number;

declare function Tcl_ParseVarName(interp: interop.PointerConvertible, start: string, numBytes: number, parsePtr: interop.PointerConvertible, append: number): number;

declare function Tcl_GetCwd(interp: interop.PointerConvertible, cwdPtr: interop.PointerConvertible): string;

declare function Tcl_Chdir(dirName: string): number;

declare function Tcl_Access(path: string, mode: number): number;

declare function Tcl_Stat(path: string, bufPtr: interop.PointerConvertible): number;

declare function Tcl_UtfNcmp(s1: string, s2: string, n: number): number;

declare function Tcl_UtfNcasecmp(s1: string, s2: string, n: number): number;

declare function Tcl_StringCaseMatch(str: string, pattern: string, nocase: number): number;

declare function Tcl_UniCharIsControl(ch: number): number;

declare function Tcl_UniCharIsGraph(ch: number): number;

declare function Tcl_UniCharIsPrint(ch: number): number;

declare function Tcl_UniCharIsPunct(ch: number): number;

declare function Tcl_RegExpExecObj(interp: interop.PointerConvertible, regexp: interop.PointerConvertible, textObj: interop.PointerConvertible, offset: number, nmatches: number, flags: number): number;

declare function Tcl_RegExpGetInfo(regexp: interop.PointerConvertible, infoPtr: interop.PointerConvertible): void;

declare function Tcl_NewUnicodeObj(unicode: interop.PointerConvertible, numChars: number): interop.Pointer;

declare function Tcl_SetUnicodeObj(objPtr: interop.PointerConvertible, unicode: interop.PointerConvertible, numChars: number): void;

declare function Tcl_GetCharLength(objPtr: interop.PointerConvertible): number;

declare function Tcl_GetUniChar(objPtr: interop.PointerConvertible, index: number): number;

declare function Tcl_GetUnicode(objPtr: interop.PointerConvertible): interop.Pointer;

declare function Tcl_GetRange(objPtr: interop.PointerConvertible, first: number, last: number): interop.Pointer;

declare function Tcl_AppendUnicodeToObj(objPtr: interop.PointerConvertible, unicode: interop.PointerConvertible, length: number): void;

declare function Tcl_RegExpMatchObj(interp: interop.PointerConvertible, textObj: interop.PointerConvertible, patternObj: interop.PointerConvertible): number;

declare function Tcl_SetNotifier(notifierProcPtr: interop.PointerConvertible): void;

declare function Tcl_GetAllocMutex(): interop.Pointer;

declare function Tcl_GetChannelNames(interp: interop.PointerConvertible): number;

declare function Tcl_GetChannelNamesEx(interp: interop.PointerConvertible, pattern: string): number;

declare function Tcl_ProcObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_ConditionFinalize(condPtr: interop.PointerConvertible): void;

declare function Tcl_MutexFinalize(mutex: interop.PointerConvertible): void;

declare function Tcl_CreateThread(idPtr: interop.PointerConvertible, proc: (p1: interop.PointerConvertible) => void, clientData: interop.PointerConvertible, stackSize: number, flags: number): number;

declare function Tcl_ReadRaw(chan: interop.PointerConvertible, dst: string, bytesToRead: number): number;

declare function Tcl_WriteRaw(chan: interop.PointerConvertible, src: string, srcLen: number): number;

declare function Tcl_GetTopChannel(chan: interop.PointerConvertible): interop.Pointer;

declare function Tcl_ChannelBuffered(chan: interop.PointerConvertible): number;

declare function Tcl_ChannelName(chanTypePtr: interop.PointerConvertible): string;

declare function Tcl_ChannelVersion(chanTypePtr: interop.PointerConvertible): interop.Pointer;

declare function Tcl_ChannelBlockModeProc(chanTypePtr: interop.PointerConvertible): (p1: interop.PointerConvertible, p2: number) => number;

declare function Tcl_ChannelCloseProc(chanTypePtr: interop.PointerConvertible): (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number;

declare function Tcl_ChannelClose2Proc(chanTypePtr: interop.PointerConvertible): (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number) => number;

declare function Tcl_ChannelInputProc(chanTypePtr: interop.PointerConvertible): (p1: interop.PointerConvertible, p2: string, p3: number, p4: interop.PointerConvertible) => number;

declare function Tcl_ChannelOutputProc(chanTypePtr: interop.PointerConvertible): (p1: interop.PointerConvertible, p2: string, p3: number, p4: interop.PointerConvertible) => number;

declare function Tcl_ChannelSeekProc(chanTypePtr: interop.PointerConvertible): (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible) => number;

declare function Tcl_ChannelSetOptionProc(chanTypePtr: interop.PointerConvertible): (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string) => number;

declare function Tcl_ChannelGetOptionProc(chanTypePtr: interop.PointerConvertible): (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: interop.PointerConvertible) => number;

declare function Tcl_ChannelWatchProc(chanTypePtr: interop.PointerConvertible): (p1: interop.PointerConvertible, p2: number) => void;

declare function Tcl_ChannelGetHandleProc(chanTypePtr: interop.PointerConvertible): (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number;

declare function Tcl_ChannelFlushProc(chanTypePtr: interop.PointerConvertible): (p1: interop.PointerConvertible) => number;

declare function Tcl_ChannelHandlerProc(chanTypePtr: interop.PointerConvertible): (p1: interop.PointerConvertible, p2: number) => number;

declare function Tcl_JoinThread(threadId: interop.PointerConvertible, result: interop.PointerConvertible): number;

declare function Tcl_IsChannelShared(channel: interop.PointerConvertible): number;

declare function Tcl_IsChannelRegistered(interp: interop.PointerConvertible, channel: interop.PointerConvertible): number;

declare function Tcl_CutChannel(channel: interop.PointerConvertible): void;

declare function Tcl_SpliceChannel(channel: interop.PointerConvertible): void;

declare function Tcl_ClearChannelHandlers(channel: interop.PointerConvertible): void;

declare function Tcl_IsChannelExisting(channelName: string): number;

declare function Tcl_UniCharNcasecmp(ucs: interop.PointerConvertible, uct: interop.PointerConvertible, numChars: number): number;

declare function Tcl_UniCharCaseMatch(uniStr: interop.PointerConvertible, uniPattern: interop.PointerConvertible, nocase: number): number;

declare function Tcl_FindHashEntry(tablePtr: interop.PointerConvertible, key: string): interop.Pointer;

declare function Tcl_CreateHashEntry(tablePtr: interop.PointerConvertible, key: string, newPtr: interop.PointerConvertible): interop.Pointer;

declare function Tcl_InitCustomHashTable(tablePtr: interop.PointerConvertible, keyType: number, typePtr: interop.PointerConvertible): void;

declare function Tcl_InitObjHashTable(tablePtr: interop.PointerConvertible): void;

declare function Tcl_CommandTraceInfo(interp: interop.PointerConvertible, varName: string, flags: number, procPtr: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string, p5: number) => void, prevClientData: interop.PointerConvertible): interop.Pointer;

declare function Tcl_TraceCommand(interp: interop.PointerConvertible, varName: string, flags: number, proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string, p5: number) => void, clientData: interop.PointerConvertible): number;

declare function Tcl_UntraceCommand(interp: interop.PointerConvertible, varName: string, flags: number, proc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string, p5: number) => void, clientData: interop.PointerConvertible): void;

declare function Tcl_AttemptAlloc(size: number): string;

declare function Tcl_AttemptDbCkalloc(size: number, file: string, line: number): string;

declare function Tcl_AttemptRealloc(ptr: string, size: number): string;

declare function Tcl_AttemptDbCkrealloc(ptr: string, size: number, file: string, line: number): string;

declare function Tcl_AttemptSetObjLength(objPtr: interop.PointerConvertible, length: number): number;

declare function Tcl_GetChannelThread(channel: interop.PointerConvertible): interop.Pointer;

declare function Tcl_GetUnicodeFromObj(objPtr: interop.PointerConvertible, lengthPtr: interop.PointerConvertible): interop.Pointer;

declare function Tcl_GetMathFuncInfo(interp: interop.PointerConvertible, name: string, numArgsPtr: interop.PointerConvertible, argTypesPtr: interop.PointerConvertible, procPtr: interop.PointerConvertible, clientDataPtr: interop.PointerConvertible): number;

declare function Tcl_ListMathFuncs(interp: interop.PointerConvertible, pattern: string): interop.Pointer;

declare function Tcl_SubstObj(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, flags: number): interop.Pointer;

declare function Tcl_DetachChannel(interp: interop.PointerConvertible, channel: interop.PointerConvertible): number;

declare function Tcl_IsStandardChannel(channel: interop.PointerConvertible): number;

declare function Tcl_FSCopyFile(srcPathPtr: interop.PointerConvertible, destPathPtr: interop.PointerConvertible): number;

declare function Tcl_FSCopyDirectory(srcPathPtr: interop.PointerConvertible, destPathPtr: interop.PointerConvertible, errorPtr: interop.PointerConvertible): number;

declare function Tcl_FSCreateDirectory(pathPtr: interop.PointerConvertible): number;

declare function Tcl_FSDeleteFile(pathPtr: interop.PointerConvertible): number;

declare function Tcl_FSLoadFile(interp: interop.PointerConvertible, pathPtr: interop.PointerConvertible, sym1: string, sym2: string, proc1Ptr: interop.PointerConvertible, proc2Ptr: interop.PointerConvertible, handlePtr: interop.PointerConvertible, unloadProcPtr: interop.PointerConvertible): number;

declare function Tcl_FSMatchInDirectory(interp: interop.PointerConvertible, result: interop.PointerConvertible, pathPtr: interop.PointerConvertible, pattern: string, types: interop.PointerConvertible): number;

declare function Tcl_FSLink(pathPtr: interop.PointerConvertible, toPtr: interop.PointerConvertible, linkAction: number): interop.Pointer;

declare function Tcl_FSRemoveDirectory(pathPtr: interop.PointerConvertible, recursive: number, errorPtr: interop.PointerConvertible): number;

declare function Tcl_FSRenameFile(srcPathPtr: interop.PointerConvertible, destPathPtr: interop.PointerConvertible): number;

declare function Tcl_FSLstat(pathPtr: interop.PointerConvertible, buf: interop.PointerConvertible): number;

declare function Tcl_FSUtime(pathPtr: interop.PointerConvertible, tval: interop.PointerConvertible): number;

declare function Tcl_FSFileAttrsGet(interp: interop.PointerConvertible, index: number, pathPtr: interop.PointerConvertible, objPtrRef: interop.PointerConvertible): number;

declare function Tcl_FSFileAttrsSet(interp: interop.PointerConvertible, index: number, pathPtr: interop.PointerConvertible, objPtr: interop.PointerConvertible): number;

declare function Tcl_FSFileAttrStrings(pathPtr: interop.PointerConvertible, objPtrRef: interop.PointerConvertible): interop.Pointer;

declare function Tcl_FSStat(pathPtr: interop.PointerConvertible, buf: interop.PointerConvertible): number;

declare function Tcl_FSAccess(pathPtr: interop.PointerConvertible, mode: number): number;

declare function Tcl_FSOpenFileChannel(interp: interop.PointerConvertible, pathPtr: interop.PointerConvertible, modeString: string, permissions: number): interop.Pointer;

declare function Tcl_FSGetCwd(interp: interop.PointerConvertible): interop.Pointer;

declare function Tcl_FSChdir(pathPtr: interop.PointerConvertible): number;

declare function Tcl_FSConvertToPathType(interp: interop.PointerConvertible, pathPtr: interop.PointerConvertible): number;

declare function Tcl_FSJoinPath(listObj: interop.PointerConvertible, elements: number): interop.Pointer;

declare function Tcl_FSSplitPath(pathPtr: interop.PointerConvertible, lenPtr: interop.PointerConvertible): interop.Pointer;

declare function Tcl_FSEqualPaths(firstPtr: interop.PointerConvertible, secondPtr: interop.PointerConvertible): number;

declare function Tcl_FSGetNormalizedPath(interp: interop.PointerConvertible, pathPtr: interop.PointerConvertible): interop.Pointer;

declare function Tcl_FSJoinToPath(pathPtr: interop.PointerConvertible, objc: number, objv: interop.Pointer): interop.Pointer;

declare function Tcl_FSGetInternalRep(pathPtr: interop.PointerConvertible, fsPtr: interop.PointerConvertible): interop.Pointer;

declare function Tcl_FSGetTranslatedPath(interp: interop.PointerConvertible, pathPtr: interop.PointerConvertible): interop.Pointer;

declare function Tcl_FSEvalFile(interp: interop.PointerConvertible, fileName: interop.PointerConvertible): number;

declare function Tcl_FSNewNativePath(fromFilesystem: interop.PointerConvertible, clientData: interop.PointerConvertible): interop.Pointer;

declare function Tcl_FSGetNativePath(pathPtr: interop.PointerConvertible): string;

declare function Tcl_FSFileSystemInfo(pathPtr: interop.PointerConvertible): interop.Pointer;

declare function Tcl_FSPathSeparator(pathPtr: interop.PointerConvertible): interop.Pointer;

declare function Tcl_FSListVolumes(): interop.Pointer;

declare function Tcl_FSRegister(clientData: interop.PointerConvertible, fsPtr: interop.PointerConvertible): number;

declare function Tcl_FSUnregister(fsPtr: interop.PointerConvertible): number;

declare function Tcl_FSData(fsPtr: interop.PointerConvertible): interop.Pointer;

declare function Tcl_FSGetTranslatedStringPath(interp: interop.PointerConvertible, pathPtr: interop.PointerConvertible): string;

declare function Tcl_FSGetFileSystemForPath(pathPtr: interop.PointerConvertible): interop.Pointer;

declare function Tcl_FSGetPathType(pathPtr: interop.PointerConvertible): interop.Enum<typeof Tcl_PathType>;

declare function Tcl_OutputBuffered(chan: interop.PointerConvertible): number;

declare function Tcl_FSMountsChanged(fsPtr: interop.PointerConvertible): void;

declare function Tcl_EvalTokensStandard(interp: interop.PointerConvertible, tokenPtr: interop.PointerConvertible, count: number): number;

declare function Tcl_GetTime(timeBuf: interop.PointerConvertible): void;

declare function Tcl_CreateObjTrace(interp: interop.PointerConvertible, level: number, flags: number, objProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: string, p5: interop.PointerConvertible, p6: number, p7: interop.PointerConvertible) => number, clientData: interop.PointerConvertible, delProc: (p1: interop.PointerConvertible) => void): interop.Pointer;

declare function Tcl_GetCommandInfoFromToken(token: interop.PointerConvertible, infoPtr: interop.PointerConvertible): number;

declare function Tcl_SetCommandInfoFromToken(token: interop.PointerConvertible, infoPtr: interop.PointerConvertible): number;

declare function Tcl_DbNewWideIntObj(wideValue: number, file: string, line: number): interop.Pointer;

declare function Tcl_GetWideIntFromObj(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, widePtr: interop.PointerConvertible): number;

declare function Tcl_NewWideIntObj(wideValue: number): interop.Pointer;

declare function Tcl_SetWideIntObj(objPtr: interop.PointerConvertible, wideValue: number): void;

declare function Tcl_AllocStatBuf(): interop.Pointer;

declare function Tcl_Seek(chan: interop.PointerConvertible, offset: number, mode: number): number;

declare function Tcl_Tell(chan: interop.PointerConvertible): number;

declare function Tcl_ChannelWideSeekProc(chanTypePtr: interop.PointerConvertible): (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible) => number;

declare function Tcl_DictObjPut(interp: interop.PointerConvertible, dictPtr: interop.PointerConvertible, keyPtr: interop.PointerConvertible, valuePtr: interop.PointerConvertible): number;

declare function Tcl_DictObjGet(interp: interop.PointerConvertible, dictPtr: interop.PointerConvertible, keyPtr: interop.PointerConvertible, valuePtrPtr: interop.PointerConvertible): number;

declare function Tcl_DictObjRemove(interp: interop.PointerConvertible, dictPtr: interop.PointerConvertible, keyPtr: interop.PointerConvertible): number;

declare function Tcl_DictObjSize(interp: interop.PointerConvertible, dictPtr: interop.PointerConvertible, sizePtr: interop.PointerConvertible): number;

declare function Tcl_DictObjFirst(interp: interop.PointerConvertible, dictPtr: interop.PointerConvertible, searchPtr: interop.PointerConvertible, keyPtrPtr: interop.PointerConvertible, valuePtrPtr: interop.PointerConvertible, donePtr: interop.PointerConvertible): number;

declare function Tcl_DictObjNext(searchPtr: interop.PointerConvertible, keyPtrPtr: interop.PointerConvertible, valuePtrPtr: interop.PointerConvertible, donePtr: interop.PointerConvertible): void;

declare function Tcl_DictObjDone(searchPtr: interop.PointerConvertible): void;

declare function Tcl_DictObjPutKeyList(interp: interop.PointerConvertible, dictPtr: interop.PointerConvertible, keyc: number, keyv: interop.PointerConvertible, valuePtr: interop.PointerConvertible): number;

declare function Tcl_DictObjRemoveKeyList(interp: interop.PointerConvertible, dictPtr: interop.PointerConvertible, keyc: number, keyv: interop.PointerConvertible): number;

declare function Tcl_NewDictObj(): interop.Pointer;

declare function Tcl_DbNewDictObj(file: string, line: number): interop.Pointer;

declare function Tcl_RegisterConfig(interp: interop.PointerConvertible, pkgName: string, configuration: interop.PointerConvertible, valEncoding: string): void;

declare function Tcl_CreateNamespace(interp: interop.PointerConvertible, name: string, clientData: interop.PointerConvertible, deleteProc: (p1: interop.PointerConvertible) => void): interop.Pointer;

declare function Tcl_DeleteNamespace(nsPtr: interop.PointerConvertible): void;

declare function Tcl_AppendExportList(interp: interop.PointerConvertible, nsPtr: interop.PointerConvertible, objPtr: interop.PointerConvertible): number;

declare function Tcl_Export(interp: interop.PointerConvertible, nsPtr: interop.PointerConvertible, pattern: string, resetListFirst: number): number;

declare function Tcl_Import(interp: interop.PointerConvertible, nsPtr: interop.PointerConvertible, pattern: string, allowOverwrite: number): number;

declare function Tcl_ForgetImport(interp: interop.PointerConvertible, nsPtr: interop.PointerConvertible, pattern: string): number;

declare function Tcl_GetCurrentNamespace(interp: interop.PointerConvertible): interop.Pointer;

declare function Tcl_GetGlobalNamespace(interp: interop.PointerConvertible): interop.Pointer;

declare function Tcl_FindNamespace(interp: interop.PointerConvertible, name: string, contextNsPtr: interop.PointerConvertible, flags: number): interop.Pointer;

declare function Tcl_FindCommand(interp: interop.PointerConvertible, name: string, contextNsPtr: interop.PointerConvertible, flags: number): interop.Pointer;

declare function Tcl_GetCommandFromObj(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible): interop.Pointer;

declare function Tcl_GetCommandFullName(interp: interop.PointerConvertible, command: interop.PointerConvertible, objPtr: interop.PointerConvertible): void;

declare function Tcl_FSEvalFileEx(interp: interop.PointerConvertible, fileName: interop.PointerConvertible, encodingName: string): number;

declare function Tcl_SetExitProc(proc: (p1: interop.PointerConvertible) => void): (p1: interop.PointerConvertible) => void;

declare function Tcl_LimitAddHandler(interp: interop.PointerConvertible, type: number, handlerProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, clientData: interop.PointerConvertible, deleteProc: (p1: interop.PointerConvertible) => void): void;

declare function Tcl_LimitRemoveHandler(interp: interop.PointerConvertible, type: number, handlerProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, clientData: interop.PointerConvertible): void;

declare function Tcl_LimitReady(interp: interop.PointerConvertible): number;

declare function Tcl_LimitCheck(interp: interop.PointerConvertible): number;

declare function Tcl_LimitExceeded(interp: interop.PointerConvertible): number;

declare function Tcl_LimitSetCommands(interp: interop.PointerConvertible, commandLimit: number): void;

declare function Tcl_LimitSetTime(interp: interop.PointerConvertible, timeLimitPtr: interop.PointerConvertible): void;

declare function Tcl_LimitSetGranularity(interp: interop.PointerConvertible, type: number, granularity: number): void;

declare function Tcl_LimitTypeEnabled(interp: interop.PointerConvertible, type: number): number;

declare function Tcl_LimitTypeExceeded(interp: interop.PointerConvertible, type: number): number;

declare function Tcl_LimitTypeSet(interp: interop.PointerConvertible, type: number): void;

declare function Tcl_LimitTypeReset(interp: interop.PointerConvertible, type: number): void;

declare function Tcl_LimitGetCommands(interp: interop.PointerConvertible): number;

declare function Tcl_LimitGetTime(interp: interop.PointerConvertible, timeLimitPtr: interop.PointerConvertible): void;

declare function Tcl_LimitGetGranularity(interp: interop.PointerConvertible, type: number): number;

declare function Tcl_SaveInterpState(interp: interop.PointerConvertible, status: number): interop.Pointer;

declare function Tcl_RestoreInterpState(interp: interop.PointerConvertible, state: interop.PointerConvertible): number;

declare function Tcl_DiscardInterpState(state: interop.PointerConvertible): void;

declare function Tcl_SetReturnOptions(interp: interop.PointerConvertible, options: interop.PointerConvertible): number;

declare function Tcl_GetReturnOptions(interp: interop.PointerConvertible, result: number): interop.Pointer;

declare function Tcl_IsEnsemble(token: interop.PointerConvertible): number;

declare function Tcl_CreateEnsemble(interp: interop.PointerConvertible, name: string, namespacePtr: interop.PointerConvertible, flags: number): interop.Pointer;

declare function Tcl_FindEnsemble(interp: interop.PointerConvertible, cmdNameObj: interop.PointerConvertible, flags: number): interop.Pointer;

declare function Tcl_SetEnsembleSubcommandList(interp: interop.PointerConvertible, token: interop.PointerConvertible, subcmdList: interop.PointerConvertible): number;

declare function Tcl_SetEnsembleMappingDict(interp: interop.PointerConvertible, token: interop.PointerConvertible, mapDict: interop.PointerConvertible): number;

declare function Tcl_SetEnsembleUnknownHandler(interp: interop.PointerConvertible, token: interop.PointerConvertible, unknownList: interop.PointerConvertible): number;

declare function Tcl_SetEnsembleFlags(interp: interop.PointerConvertible, token: interop.PointerConvertible, flags: number): number;

declare function Tcl_GetEnsembleSubcommandList(interp: interop.PointerConvertible, token: interop.PointerConvertible, subcmdListPtr: interop.PointerConvertible): number;

declare function Tcl_GetEnsembleMappingDict(interp: interop.PointerConvertible, token: interop.PointerConvertible, mapDictPtr: interop.PointerConvertible): number;

declare function Tcl_GetEnsembleUnknownHandler(interp: interop.PointerConvertible, token: interop.PointerConvertible, unknownListPtr: interop.PointerConvertible): number;

declare function Tcl_GetEnsembleFlags(interp: interop.PointerConvertible, token: interop.PointerConvertible, flagsPtr: interop.PointerConvertible): number;

declare function Tcl_GetEnsembleNamespace(interp: interop.PointerConvertible, token: interop.PointerConvertible, namespacePtrPtr: interop.PointerConvertible): number;

declare function Tcl_SetTimeProc(getProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, scaleProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, clientData: interop.PointerConvertible): void;

declare function Tcl_QueryTimeProc(getProc: interop.PointerConvertible, scaleProc: interop.PointerConvertible, clientData: interop.PointerConvertible): void;

declare function Tcl_ChannelThreadActionProc(chanTypePtr: interop.PointerConvertible): (p1: interop.PointerConvertible, p2: number) => void;

declare function Tcl_NewBignumObj(value: interop.PointerConvertible): interop.Pointer;

declare function Tcl_DbNewBignumObj(value: interop.PointerConvertible, file: string, line: number): interop.Pointer;

declare function Tcl_SetBignumObj(obj: interop.PointerConvertible, value: interop.PointerConvertible): void;

declare function Tcl_GetBignumFromObj(interp: interop.PointerConvertible, obj: interop.PointerConvertible, value: interop.PointerConvertible): number;

declare function Tcl_TakeBignumFromObj(interp: interop.PointerConvertible, obj: interop.PointerConvertible, value: interop.PointerConvertible): number;

declare function Tcl_TruncateChannel(chan: interop.PointerConvertible, length: number): number;

declare function Tcl_ChannelTruncateProc(chanTypePtr: interop.PointerConvertible): (p1: interop.PointerConvertible, p2: number) => number;

declare function Tcl_SetChannelErrorInterp(interp: interop.PointerConvertible, msg: interop.PointerConvertible): void;

declare function Tcl_GetChannelErrorInterp(interp: interop.PointerConvertible, msg: interop.PointerConvertible): void;

declare function Tcl_SetChannelError(chan: interop.PointerConvertible, msg: interop.PointerConvertible): void;

declare function Tcl_GetChannelError(chan: interop.PointerConvertible, msg: interop.PointerConvertible): void;

declare function Tcl_InitBignumFromDouble(interp: interop.PointerConvertible, initval: number, toInit: interop.PointerConvertible): number;

declare function Tcl_GetNamespaceUnknownHandler(interp: interop.PointerConvertible, nsPtr: interop.PointerConvertible): interop.Pointer;

declare function Tcl_SetNamespaceUnknownHandler(interp: interop.PointerConvertible, nsPtr: interop.PointerConvertible, handlerPtr: interop.PointerConvertible): number;

declare function Tcl_GetEncodingFromObj(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, encodingPtr: interop.PointerConvertible): number;

declare function Tcl_GetEncodingSearchPath(): interop.Pointer;

declare function Tcl_SetEncodingSearchPath(searchPath: interop.PointerConvertible): number;

declare function Tcl_GetEncodingNameFromEnvironment(bufPtr: interop.PointerConvertible): string;

declare function Tcl_PkgRequireProc(interp: interop.PointerConvertible, name: string, objc: number, objv: interop.Pointer, clientDataPtr: interop.PointerConvertible): number;

declare function Tcl_AppendObjToErrorInfo(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible): void;

declare function Tcl_AppendLimitedToObj(objPtr: interop.PointerConvertible, bytes: string, length: number, limit: number, ellipsis: string): void;

declare function Tcl_Format(interp: interop.PointerConvertible, format: string, objc: number, objv: interop.Pointer): interop.Pointer;

declare function Tcl_AppendFormatToObj(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, format: string, objc: number, objv: interop.Pointer): number;

declare function Tcl_ObjPrintf(format: string): interop.Pointer;

declare function Tcl_AppendPrintfToObj(objPtr: interop.PointerConvertible, format: string): void;

declare function Tcl_AppInit(interp: interop.PointerConvertible): number;

declare function mp_get_int(a: interop.PointerConvertible): number;

declare function TclUnixSetBlockingMode(fd: number, mode: number): number;

declare function TclpGetPwNam(name: string): interop.Pointer;

declare function TclpGetGrNam(name: string): interop.Pointer;

declare function TclpGetPwUid(uid: number): interop.Pointer;

declare function TclpGetGrGid(gid: number): interop.Pointer;

declare function TclpGetHostByName(name: string): interop.Pointer;

declare function TclpGetHostByAddr(addr: string, length: number, type: number): interop.Pointer;

declare function TclFreeLocalCache(interp: interop.PointerConvertible, localCachePtr: interop.PointerConvertible): void;

declare function TclThreadDataKeyGet(keyPtr: interop.PointerConvertible): interop.Pointer;

declare function TclThreadDataKeySet(keyPtr: interop.PointerConvertible, data: interop.PointerConvertible): void;

declare function TclAdvanceContinuations(line: interop.PointerConvertible, next: interop.PointerConvertible, loc: number): void;

declare function TclAdvanceLines(line: interop.PointerConvertible, start: string, end: string): void;

declare function TclArgumentEnter(interp: interop.PointerConvertible, objv: interop.Pointer, objc: number, cf: interop.PointerConvertible): void;

declare function TclArgumentRelease(interp: interop.PointerConvertible, objv: interop.Pointer, objc: number): void;

declare function TclArgumentGet(interp: interop.PointerConvertible, obj: interop.PointerConvertible, cfPtrPtr: interop.PointerConvertible, wordPtr: interop.PointerConvertible): void;

declare function TclArgumentBCEnter(interp: interop.PointerConvertible, objv: interop.Pointer, objc: number, codePtr: interop.PointerConvertible, cfPtr: interop.PointerConvertible, pc: number): void;

declare function TclArgumentBCRelease(interp: interop.PointerConvertible, objv: interop.Pointer, objc: number, codePtr: interop.PointerConvertible, pc: number): void;

declare function TclArraySet(interp: interop.PointerConvertible, arrayNameObj: interop.PointerConvertible, arrayElemObj: interop.PointerConvertible): number;

declare function TclBignumToDouble(bignum: interop.PointerConvertible): number;

declare function TclByteArrayMatch(string: interop.PointerConvertible, strLen: number, pattern: interop.PointerConvertible, ptnLen: number, flags: number): number;

declare function TclCeil(a: interop.PointerConvertible): number;

declare function TclCheckBadOctal(interp: interop.PointerConvertible, value: string): number;

declare function TclChanCaughtErrorBypass(interp: interop.PointerConvertible, chan: interop.PointerConvertible): number;

declare function TclCleanupLiteralTable(interp: interop.PointerConvertible, tablePtr: interop.PointerConvertible): void;

declare function TclContinuationsEnter(objPtr: interop.PointerConvertible, num: number, loc: interop.PointerConvertible): interop.Pointer;

declare function TclContinuationsEnterDerived(objPtr: interop.PointerConvertible, start: number, clNext: interop.PointerConvertible): void;

declare function TclContinuationsGet(objPtr: interop.PointerConvertible): interop.Pointer;

declare function TclContinuationsCopy(objPtr: interop.PointerConvertible, originObjPtr: interop.PointerConvertible): void;

declare function TclDoubleDigits(buf: string, value: number, signum: interop.PointerConvertible): number;

declare function TclDeleteNamespaceVars(nsPtr: interop.PointerConvertible): void;

declare function TclEvalEx(interp: interop.PointerConvertible, script: string, numBytes: number, flags: number, line: number, clNextOuter: interop.PointerConvertible, outerScript: string): number;

declare function TclFileAttrsCmd(interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclFileCopyCmd(interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclFileDeleteCmd(interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclFileMakeDirsCmd(interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclFileRenameCmd(interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclCreateLateExitHandler(proc: (p1: interop.PointerConvertible) => void, clientData: interop.PointerConvertible): void;

declare function TclDeleteLateExitHandler(proc: (p1: interop.PointerConvertible) => void, clientData: interop.PointerConvertible): void;

declare function TclFinalizeAllocSubsystem(): void;

declare function TclFinalizeAsync(): void;

declare function TclFinalizeDoubleConversion(): void;

declare function TclFinalizeEncodingSubsystem(): void;

declare function TclFinalizeEnvironment(): void;

declare function TclFinalizeExecution(): void;

declare function TclFinalizeIOSubsystem(): void;

declare function TclFinalizeFilesystem(): void;

declare function TclResetFilesystem(): void;

declare function TclFinalizeLoad(): void;

declare function TclFinalizeLock(): void;

declare function TclFinalizeMemorySubsystem(): void;

declare function TclFinalizeNotifier(): void;

declare function TclFinalizeObjects(): void;

declare function TclFinalizePreserve(): void;

declare function TclFinalizeSynchronization(): void;

declare function TclFinalizeThreadAlloc(): void;

declare function TclFinalizeThreadData(): void;

declare function TclFinalizeThreadObjects(): void;

declare function TclFloor(a: interop.PointerConvertible): number;

declare function TclFormatNaN(value: number, buffer: string): void;

declare function TclFSFileAttrIndex(pathPtr: interop.PointerConvertible, attributeName: string, indexPtr: interop.PointerConvertible): number;

declare function TclFSUnloadTempFile(loadHandle: interop.PointerConvertible): void;

declare function TclGetAsyncReadyPtr(): interop.Pointer;

declare function TclGetBgErrorHandler(interp: interop.PointerConvertible): interop.Pointer;

declare function TclGetChannelFromObj(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, chanPtr: interop.PointerConvertible, modePtr: interop.PointerConvertible, flags: number): number;

declare function TclGetNumberFromObj(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, clientDataPtr: interop.PointerConvertible, typePtr: interop.PointerConvertible): number;

declare function TclGetOpenModeEx(interp: interop.PointerConvertible, modeString: string, seekFlagPtr: interop.PointerConvertible, binaryPtr: interop.PointerConvertible): number;

declare function TclGetProcessGlobalValue(pgvPtr: interop.PointerConvertible): interop.Pointer;

declare function TclGetSrcInfoForCmd(iPtr: interop.PointerConvertible, lenPtr: interop.PointerConvertible): string;

declare function TclGlob(interp: interop.PointerConvertible, pattern: string, unquotedPrefix: interop.PointerConvertible, globFlags: number, types: interop.PointerConvertible): number;

declare function TclIncrObj(interp: interop.PointerConvertible, valuePtr: interop.PointerConvertible, incrPtr: interop.PointerConvertible): number;

declare function TclIncrObjVar2(interp: interop.PointerConvertible, part1Ptr: interop.PointerConvertible, part2Ptr: interop.PointerConvertible, incrPtr: interop.PointerConvertible, flags: number): interop.Pointer;

declare function TclInfoExistsCmd(dummy: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclInfoFrame(interp: interop.PointerConvertible, framePtr: interop.PointerConvertible): interop.Pointer;

declare function TclInfoGlobalsCmd(dummy: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclInfoLocalsCmd(dummy: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclInfoVarsCmd(dummy: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclInitAlloc(): void;

declare function TclInitDbCkalloc(): void;

declare function TclInitDoubleConversion(): void;

declare function TclInitEmbeddedConfigurationInformation(interp: interop.PointerConvertible): void;

declare function TclInitEncodingSubsystem(): void;

declare function TclInitIOSubsystem(): void;

declare function TclInitLimitSupport(interp: interop.PointerConvertible): void;

declare function TclInitNamespaceSubsystem(): void;

declare function TclInitNotifier(): void;

declare function TclInitObjSubsystem(): void;

declare function TclInitSubsystems(): void;

declare function TclInterpReady(interp: interop.PointerConvertible): number;

declare function TclIsLocalScalar(src: string, len: number): number;

declare function TclJoinThread(id: interop.PointerConvertible, result: interop.PointerConvertible): number;

declare function TclLimitRemoveAllHandlers(interp: interop.PointerConvertible): void;

declare function TclLindexList(interp: interop.PointerConvertible, listPtr: interop.PointerConvertible, argPtr: interop.PointerConvertible): interop.Pointer;

declare function TclLindexFlat(interp: interop.PointerConvertible, listPtr: interop.PointerConvertible, indexCount: number, indexArray: interop.Pointer): interop.Pointer;

declare function TclListLines(listObj: interop.PointerConvertible, line: number, n: number, lines: interop.PointerConvertible, elems: interop.PointerConvertible): void;

declare function TclListObjCopy(interp: interop.PointerConvertible, listPtr: interop.PointerConvertible): interop.Pointer;

declare function TclLoadFile(interp: interop.PointerConvertible, pathPtr: interop.PointerConvertible, symc: number, symbols: interop.Pointer, procPtrs: interop.Pointer, handlePtr: interop.PointerConvertible, clientDataPtr: interop.PointerConvertible, unloadProcPtr: interop.PointerConvertible): number;

declare function TclLsetList(interp: interop.PointerConvertible, listPtr: interop.PointerConvertible, indexPtr: interop.PointerConvertible, valuePtr: interop.PointerConvertible): interop.Pointer;

declare function TclLsetFlat(interp: interop.PointerConvertible, listPtr: interop.PointerConvertible, indexCount: number, indexArray: interop.Pointer, valuePtr: interop.PointerConvertible): interop.Pointer;

declare function TclMakeEnsemble(interp: interop.PointerConvertible, name: string, map: interop.Pointer): interop.Pointer;

declare function TclMarkList(interp: interop.PointerConvertible, list: string, end: string, argcPtr: interop.PointerConvertible, argszPtr: interop.PointerConvertible, argvPtr: interop.PointerConvertible): number;

declare function TclMergeReturnOptions(interp: interop.PointerConvertible, objc: number, objv: interop.Pointer, optionsPtrPtr: interop.PointerConvertible, codePtr: interop.PointerConvertible, levelPtr: interop.PointerConvertible): number;

declare function TclNokia770Doubles(): number;

declare function TclObjVarErrMsg(interp: interop.PointerConvertible, part1Ptr: interop.PointerConvertible, part2Ptr: interop.PointerConvertible, operation: string, reason: string, index: number): void;

declare function TclObjInvokeNamespace(interp: interop.PointerConvertible, objc: number, objv: interop.Pointer, nsPtr: interop.PointerConvertible, flags: number): number;

declare function TclObjUnsetVar2(interp: interop.PointerConvertible, part1Ptr: interop.PointerConvertible, part2Ptr: interop.PointerConvertible, flags: number): number;

declare function TclParseBackslash(src: string, numBytes: number, readPtr: interop.PointerConvertible, dst: string): number;

declare function TclParseHex(src: string, numBytes: number, resultPtr: interop.PointerConvertible): number;

declare function TclParseNumber(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, expected: string, bytes: string, numBytes: number, endPtrPtr: interop.PointerConvertible, flags: number): number;

declare function TclParseInit(interp: interop.PointerConvertible, string: string, numBytes: number, parsePtr: interop.PointerConvertible): void;

declare function TclParseAllWhiteSpace(src: string, numBytes: number): number;

declare function TclProcessReturn(interp: interop.PointerConvertible, code: number, level: number, returnOpts: interop.PointerConvertible): number;

declare function TclpGetCStackParams(stackBoundPtr: interop.PointerConvertible): number;

declare function TclpObjLstat(pathPtr: interop.PointerConvertible, buf: interop.PointerConvertible): number;

declare function TclpTempFileName(): interop.Pointer;

declare function TclNewFSPathObj(dirPtr: interop.PointerConvertible, addStrRep: string, len: number): interop.Pointer;

declare function TclpDeleteFile(path: string): number;

declare function TclpFinalizeCondition(condPtr: interop.PointerConvertible): void;

declare function TclpFinalizeMutex(mutexPtr: interop.PointerConvertible): void;

declare function TclpFinalizePipes(): void;

declare function TclpFinalizeSockets(): void;

declare function TclpThreadCreate(idPtr: interop.PointerConvertible, proc: (p1: interop.PointerConvertible) => void, clientData: interop.PointerConvertible, stackSize: number, flags: number): number;

declare function TclpFindVariable(name: string, lengthPtr: interop.PointerConvertible): number;

declare function TclpInitLibraryPath(valuePtr: interop.PointerConvertible, lengthPtr: interop.PointerConvertible, encodingPtr: interop.PointerConvertible): void;

declare function TclpInitLock(): void;

declare function TclpInitPlatform(): void;

declare function TclpInitUnlock(): void;

declare function TclpLoadFile(interp: interop.PointerConvertible, pathPtr: interop.PointerConvertible, sym1: string, sym2: string, proc1Ptr: interop.PointerConvertible, proc2Ptr: interop.PointerConvertible, clientDataPtr: interop.PointerConvertible, unloadProcPtr: interop.PointerConvertible): number;

declare function TclpObjListVolumes(): interop.Pointer;

declare function TclpMasterLock(): void;

declare function TclpMasterUnlock(): void;

declare function TclpMatchFiles(interp: interop.PointerConvertible, separators: string, dirPtr: interop.PointerConvertible, pattern: string, tail: string): number;

declare function TclpObjNormalizePath(interp: interop.PointerConvertible, pathPtr: interop.PointerConvertible, nextCheckpoint: number): number;

declare function TclpNativeJoinPath(prefix: interop.PointerConvertible, joining: string): void;

declare function TclpNativeSplitPath(pathPtr: interop.PointerConvertible, lenPtr: interop.PointerConvertible): interop.Pointer;

declare function TclpGetNativePathType(pathPtr: interop.PointerConvertible, driveNameLengthPtr: interop.PointerConvertible, driveNameRef: interop.PointerConvertible): interop.Enum<typeof Tcl_PathType>;

declare function TclCrossFilesystemCopy(interp: interop.PointerConvertible, source: interop.PointerConvertible, target: interop.PointerConvertible): number;

declare function TclpMatchInDirectory(interp: interop.PointerConvertible, resultPtr: interop.PointerConvertible, pathPtr: interop.PointerConvertible, pattern: string, types: interop.PointerConvertible): number;

declare function TclpGetNativeCwd(clientData: interop.PointerConvertible): interop.Pointer;

declare function TclNativeDupInternalRep(p1: interop.PointerConvertible): interop.Pointer;

declare function TclpObjLink(pathPtr: interop.PointerConvertible, toPtr: interop.PointerConvertible, linkType: number): interop.Pointer;

declare function TclpObjChdir(pathPtr: interop.PointerConvertible): number;

declare function TclPathPart(interp: interop.PointerConvertible, pathPtr: interop.PointerConvertible, portion: interop.Enum<typeof Tcl_PathPart>): interop.Pointer;

declare function TclpReadlink(fileName: string, linkPtr: interop.PointerConvertible): string;

declare function TclpSetInterfaces(): void;

declare function TclpSetVariables(interp: interop.PointerConvertible): void;

declare function TclpUnloadFile(loadHandle: interop.PointerConvertible): void;

declare function TclpThreadDataKeyGet(keyPtr: interop.PointerConvertible): interop.Pointer;

declare function TclpThreadDataKeySet(keyPtr: interop.PointerConvertible, data: interop.PointerConvertible): void;

declare function TclpThreadExit(status: number): void;

declare function TclpThreadGetStackSize(): number;

declare function TclRememberCondition(mutex: interop.PointerConvertible): void;

declare function TclRememberJoinableThread(id: interop.PointerConvertible): void;

declare function TclRememberMutex(mutex: interop.PointerConvertible): void;

declare function TclRemoveScriptLimitCallbacks(interp: interop.PointerConvertible): void;

declare function TclReToGlob(interp: interop.PointerConvertible, reStr: string, reStrLen: number, dsPtr: interop.PointerConvertible, flagsPtr: interop.PointerConvertible): number;

declare function TclSetBgErrorHandler(interp: interop.PointerConvertible, cmdPrefix: interop.PointerConvertible): void;

declare function TclSetBignumIntRep(objPtr: interop.PointerConvertible, bignumValue: interop.PointerConvertible): void;

declare function TclSetCmdNameObj(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible): void;

declare function TclSetProcessGlobalValue(pgvPtr: interop.PointerConvertible, newValue: interop.PointerConvertible, encoding: interop.PointerConvertible): void;

declare function TclSignalExitThread(id: interop.PointerConvertible, result: number): void;

declare function TclStackRealloc(interp: interop.PointerConvertible, ptr: interop.PointerConvertible, numBytes: number): interop.Pointer;

declare function TclStringMatch(str: string, strLen: number, pattern: string, ptnLen: number, flags: number): number;

declare function TclStringMatchObj(stringObj: interop.PointerConvertible, patternObj: interop.PointerConvertible, flags: number): number;

declare function TclStringObjReverse(objPtr: interop.PointerConvertible): interop.Pointer;

declare function TclSubstTokens(interp: interop.PointerConvertible, tokenPtr: interop.PointerConvertible, count: number, tokensLeftPtr: interop.PointerConvertible, line: number, clNextOuter: interop.PointerConvertible, outerScript: string): number;

declare function TclTransferResult(sourceInterp: interop.PointerConvertible, result: number, targetInterp: interop.PointerConvertible): void;

declare function TclpNativeToNormalized(clientData: interop.PointerConvertible): interop.Pointer;

declare function TclpFilesystemPathType(pathPtr: interop.PointerConvertible): interop.Pointer;

declare function TclpFindSymbol(interp: interop.PointerConvertible, loadHandle: interop.PointerConvertible, symbol: string): (p1: interop.PointerConvertible) => number;

declare function TclpDlopen(interp: interop.PointerConvertible, pathPtr: interop.PointerConvertible, loadHandle: interop.PointerConvertible, unloadProcPtr: interop.PointerConvertible): number;

declare function TclpUtime(pathPtr: interop.PointerConvertible, tval: interop.PointerConvertible): number;

declare function TclInitThreadStorage(): void;

declare function TclpFinalizeThreadDataThread(): void;

declare function TclFinalizeThreadStorage(): void;

declare function TclDisassembleByteCodeObj(objPtr: interop.PointerConvertible): interop.Pointer;

declare function Tcl_AfterObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_AppendObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_ApplyObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_ArrayObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_BinaryObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_BreakObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_CaseObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_CatchObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_CdObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclInitChanCmd(interp: interop.PointerConvertible): interop.Pointer;

declare function TclChanCreateObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclChanPostEventObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclClockInit(interp: interop.PointerConvertible): void;

declare function TclClockOldscanObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_CloseObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_ConcatObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_ContinueObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclCreateAbsoluteTimerHandler(timePtr: interop.PointerConvertible, proc: (p1: interop.PointerConvertible) => void, clientData: interop.PointerConvertible): interop.Pointer;

declare function TclDefaultBgErrorHandlerObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclInitDictCmd(interp: interop.PointerConvertible): interop.Pointer;

declare function Tcl_DisassembleObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_EncodingObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_EofObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_ErrorObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_EvalObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_ExecObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_ExitObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_ExprObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_FblockedObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_FconfigureObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_FcopyObjCmd(dummy: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_FileObjCmd(dummy: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_FileEventObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_FlushObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_ForObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_ForeachObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_FormatObjCmd(dummy: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_GetsObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_GlobalObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_GlobObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_IfObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_IncrObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclInitInfoCmd(interp: interop.PointerConvertible): interop.Pointer;

declare function Tcl_InterpObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, argc: number, objv: interop.Pointer): number;

declare function Tcl_JoinObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_LappendObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_LassignObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_LindexObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_LinsertObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_LlengthObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_ListObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_LoadObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_LrangeObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_LrepeatObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_LreplaceObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_LreverseObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_LsearchObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_LsetObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_LsortObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_NamespaceObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_OpenObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_PackageObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_PidObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_PutsObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_PwdObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_ReadObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_RegexpObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_RegsubObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_RenameObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_ReturnObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_ScanObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_SeekObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_SetObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_SplitObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_SocketObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_SourceObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclInitStringCmd(interp: interop.PointerConvertible): interop.Pointer;

declare function Tcl_SubstObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_SwitchObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_TellObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_TimeObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_TraceObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_UnloadObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_UnsetObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_UpdateObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_UplevelObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_UpvarObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_VariableObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_VwaitObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function Tcl_WhileObjCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclCompileAppendCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileBreakCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileCatchCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileContinueCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileDictAppendCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileDictForCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileDictGetCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileDictIncrCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileDictLappendCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileDictSetCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileDictUpdateCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileEnsemble(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileExprCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileForCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileForeachCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileGlobalCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileIfCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileInfoExistsCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileIncrCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileLappendCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileLassignCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileLindexCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileListCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileLlengthCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileLsetCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileNamespaceCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileNoOp(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileRegexpCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileReturnCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileSetCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileStringCmpCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileStringEqualCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileStringIndexCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileStringLenCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileStringMatchCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileSwitchCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileUpvarCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileVariableCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCompileWhileCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclInvertOpCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclCompileInvertOpCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclNotOpCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclCompileNotOpCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclAddOpCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclCompileAddOpCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclMulOpCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclCompileMulOpCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclAndOpCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclCompileAndOpCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclOrOpCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclCompileOrOpCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclXorOpCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclCompileXorOpCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclPowOpCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclCompilePowOpCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclLshiftOpCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclCompileLshiftOpCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclRshiftOpCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclCompileRshiftOpCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclModOpCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclCompileModOpCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclNeqOpCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclCompileNeqOpCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclStrneqOpCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclCompileStrneqOpCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclInOpCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclCompileInOpCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclNiOpCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclCompileNiOpCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclMinusOpCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclCompileMinusOpCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclDivOpCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclCompileDivOpCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclLessOpCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclCompileLessOpCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclLeqOpCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclCompileLeqOpCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclGreaterOpCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclCompileGreaterOpCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclGeqOpCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclCompileGeqOpCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclEqOpCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclCompileEqOpCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclStreqOpCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclCompileStreqOpCmd(interp: interop.PointerConvertible, parsePtr: interop.PointerConvertible, cmdPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclObjLookupVarEx(interp: interop.PointerConvertible, part1Ptr: interop.PointerConvertible, part2Ptr: interop.PointerConvertible, flags: number, msg: string, createPart1: number, createPart2: number, arrayPtrPtr: interop.PointerConvertible): interop.Pointer;

declare function TclLookupArrayElement(interp: interop.PointerConvertible, arrayNamePtr: interop.PointerConvertible, elNamePtr: interop.PointerConvertible, flags: number, msg: string, createPart1: number, createPart2: number, arrayPtr: interop.PointerConvertible, index: number): interop.Pointer;

declare function TclPtrGetVar(interp: interop.PointerConvertible, varPtr: interop.PointerConvertible, arrayPtr: interop.PointerConvertible, part1Ptr: interop.PointerConvertible, part2Ptr: interop.PointerConvertible, flags: number, index: number): interop.Pointer;

declare function TclPtrSetVar(interp: interop.PointerConvertible, varPtr: interop.PointerConvertible, arrayPtr: interop.PointerConvertible, part1Ptr: interop.PointerConvertible, part2Ptr: interop.PointerConvertible, newValuePtr: interop.PointerConvertible, flags: number, index: number): interop.Pointer;

declare function TclPtrIncrObjVar(interp: interop.PointerConvertible, varPtr: interop.PointerConvertible, arrayPtr: interop.PointerConvertible, part1Ptr: interop.PointerConvertible, part2Ptr: interop.PointerConvertible, incrPtr: interop.PointerConvertible, flags: number, index: number): interop.Pointer;

declare function TclPtrObjMakeUpvar(interp: interop.PointerConvertible, otherPtr: interop.PointerConvertible, myNamePtr: interop.PointerConvertible, myFlags: number, index: number): number;

declare function TclInvalidateNsPath(nsPtr: interop.PointerConvertible): void;

declare function TclObjCallVarTraces(iPtr: interop.PointerConvertible, arrayPtr: interop.PointerConvertible, varPtr: interop.PointerConvertible, part1Ptr: interop.PointerConvertible, part2Ptr: interop.PointerConvertible, flags: number, leaveErrMsg: number, index: number): number;

declare function TclCompareObjKeys(keyPtr: interop.PointerConvertible, hPtr: interop.PointerConvertible): number;

declare function TclFreeObjEntry(hPtr: interop.PointerConvertible): void;

declare function TclHashObjKey(tablePtr: interop.PointerConvertible, keyPtr: interop.PointerConvertible): number;

declare function TclTommath_Init(interp: interop.PointerConvertible): number;

declare function TclBNInitBignumFromLong(bignum: interop.PointerConvertible, initVal: number): void;

declare function TclBNInitBignumFromWideInt(bignum: interop.PointerConvertible, initVal: number): void;

declare function TclBNInitBignumFromWideUInt(bignum: interop.PointerConvertible, initVal: number): void;

declare function TclAllocateFreeObjects(): void;

declare function TclCleanupChildren(interp: interop.PointerConvertible, numPids: number, pidPtr: interop.PointerConvertible, errorChan: interop.PointerConvertible): number;

declare function TclCleanupCommand(cmdPtr: interop.PointerConvertible): void;

declare function TclCopyAndCollapse(count: number, src: string, dst: string): number;

declare function TclCopyChannel(interp: interop.PointerConvertible, inChan: interop.PointerConvertible, outChan: interop.PointerConvertible, toRead: number, cmdPtr: interop.PointerConvertible): number;

declare function TclCreatePipeline(interp: interop.PointerConvertible, argc: number, argv: interop.PointerConvertible, pidArrayPtr: interop.PointerConvertible, inPipePtr: interop.PointerConvertible, outPipePtr: interop.PointerConvertible, errFilePtr: interop.PointerConvertible): number;

declare function TclCreateProc(interp: interop.PointerConvertible, nsPtr: interop.PointerConvertible, procName: string, argsPtr: interop.PointerConvertible, bodyPtr: interop.PointerConvertible, procPtrPtr: interop.PointerConvertible): number;

declare function TclDeleteCompiledLocalVars(iPtr: interop.PointerConvertible, framePtr: interop.PointerConvertible): void;

declare function TclDeleteVars(iPtr: interop.PointerConvertible, tablePtr: interop.PointerConvertible): void;

declare function TclDumpMemoryInfo(outFile: interop.PointerConvertible): void;

declare function TclExprFloatError(interp: interop.PointerConvertible, value: number): void;

declare function TclFindElement(interp: interop.PointerConvertible, listStr: string, listLength: number, elementPtr: interop.PointerConvertible, nextPtr: interop.PointerConvertible, sizePtr: interop.PointerConvertible, bracePtr: interop.PointerConvertible): number;

declare function TclFindProc(iPtr: interop.PointerConvertible, procName: string): interop.Pointer;

declare function TclFreePackageInfo(iPtr: interop.PointerConvertible): void;

declare function TclpGetDefaultStdChannel(type: number): interop.Pointer;

declare function TclGetExtension(name: string): string;

declare function TclGetFrame(interp: interop.PointerConvertible, str: string, framePtrPtr: interop.PointerConvertible): number;

declare function TclGetIntForIndex(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, endValue: number, indexPtr: interop.PointerConvertible): number;

declare function TclGetLong(interp: interop.PointerConvertible, str: string, longPtr: interop.PointerConvertible): number;

declare function TclGetLoadedPackages(interp: interop.PointerConvertible, targetName: string): number;

declare function TclGetNamespaceForQualName(interp: interop.PointerConvertible, qualName: string, cxtNsPtr: interop.PointerConvertible, flags: number, nsPtrPtr: interop.PointerConvertible, altNsPtrPtr: interop.PointerConvertible, actualCxtPtrPtr: interop.PointerConvertible, simpleNamePtr: interop.PointerConvertible): number;

declare function TclGetObjInterpProc(): (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number;

declare function TclGetOpenMode(interp: interop.PointerConvertible, str: string, seekFlagPtr: interop.PointerConvertible): number;

declare function TclGetOriginalCommand(command: interop.PointerConvertible): interop.Pointer;

declare function TclpGetUserHome(name: string, bufferPtr: interop.PointerConvertible): string;

declare function TclGuessPackageName(fileName: string, bufPtr: interop.PointerConvertible): number;

declare function TclHideUnsafeCommands(interp: interop.PointerConvertible): number;

declare function TclInExit(): number;

declare function TclInitCompiledLocals(interp: interop.PointerConvertible, framePtr: interop.PointerConvertible, nsPtr: interop.PointerConvertible): void;

declare function TclInterpInit(interp: interop.PointerConvertible): number;

declare function TclInvokeObjectCommand(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, argc: number, argv: interop.PointerConvertible): number;

declare function TclInvokeStringCommand(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclIsProc(cmdPtr: interop.PointerConvertible): interop.Pointer;

declare function TclLookupVar(interp: interop.PointerConvertible, part1: string, part2: string, flags: number, msg: string, createPart1: number, createPart2: number, arrayPtrPtr: interop.PointerConvertible): interop.Pointer;

declare function TclNeedSpace(start: string, end: string): number;

declare function TclNewProcBodyObj(procPtr: interop.PointerConvertible): interop.Pointer;

declare function TclObjCommandComplete(cmdPtr: interop.PointerConvertible): number;

declare function TclObjInterpProc(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclObjInvoke(interp: interop.PointerConvertible, objc: number, objv: interop.Pointer, flags: number): number;

declare function TclpAlloc(size: number): string;

declare function TclpFree(ptr: string): void;

declare function TclpGetClicks(): number;

declare function TclpGetSeconds(): number;

declare function TclpGetTime(time: interop.PointerConvertible): void;

declare function TclpGetTimeZone(time: number): number;

declare function TclpRealloc(ptr: string, size: number): string;

declare function TclPrecTraceProc(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, name1: string, name2: string, flags: number): string;

declare function TclPreventAliasLoop(interp: interop.PointerConvertible, cmdInterp: interop.PointerConvertible, cmd: interop.PointerConvertible): number;

declare function TclProcCleanupProc(procPtr: interop.PointerConvertible): void;

declare function TclProcCompileProc(interp: interop.PointerConvertible, procPtr: interop.PointerConvertible, bodyPtr: interop.PointerConvertible, nsPtr: interop.PointerConvertible, description: string, procName: string): number;

declare function TclProcDeleteProc(clientData: interop.PointerConvertible): void;

declare function TclRenameCommand(interp: interop.PointerConvertible, oldName: string, newName: string): number;

declare function TclResetShadowedCmdRefs(interp: interop.PointerConvertible, newCmdPtr: interop.PointerConvertible): void;

declare function TclServiceIdle(): number;

declare function TclSetPreInitScript(string: string): string;

declare function TclSetupEnv(interp: interop.PointerConvertible): void;

declare function TclSockGetPort(interp: interop.PointerConvertible, str: string, proto: string, portPtr: interop.PointerConvertible): number;

declare function TclSockMinimumBuffers(sock: number, size: number): number;

declare function TclTeardownNamespace(nsPtr: interop.PointerConvertible): void;

declare function TclUpdateReturnInfo(iPtr: interop.PointerConvertible): number;

declare function Tcl_AddInterpResolvers(interp: interop.PointerConvertible, name: string, cmdProc: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible) => number, varProc: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible) => number, compiledVarProc: (p1: interop.PointerConvertible, p2: string, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number): void;

declare function Tcl_GetInterpResolvers(interp: interop.PointerConvertible, name: string, resInfo: interop.PointerConvertible): number;

declare function Tcl_GetNamespaceResolvers(namespacePtr: interop.PointerConvertible, resInfo: interop.PointerConvertible): number;

declare function Tcl_FindNamespaceVar(interp: interop.PointerConvertible, name: string, contextNsPtr: interop.PointerConvertible, flags: number): interop.Pointer;

declare function Tcl_GetVariableFullName(interp: interop.PointerConvertible, variable: interop.PointerConvertible, objPtr: interop.PointerConvertible): void;

declare function Tcl_PopCallFrame(interp: interop.PointerConvertible): void;

declare function Tcl_PushCallFrame(interp: interop.PointerConvertible, framePtr: interop.PointerConvertible, nsPtr: interop.PointerConvertible, isProcCallFrame: number): number;

declare function Tcl_RemoveInterpResolvers(interp: interop.PointerConvertible, name: string): number;

declare function Tcl_SetNamespaceResolvers(namespacePtr: interop.PointerConvertible, cmdProc: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible) => number, varProc: (p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible) => number, compiledVarProc: (p1: interop.PointerConvertible, p2: string, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => number): void;

declare function TclpHasSockets(interp: interop.PointerConvertible): number;

declare function TclpGetDate(time: interop.PointerConvertible, useGMT: number): interop.Pointer;

declare function TclGetEnv(name: string, valuePtr: interop.PointerConvertible): string;

declare function TclpGetCwd(interp: interop.PointerConvertible, cwdPtr: interop.PointerConvertible): string;

declare function TclSetByteCodeFromAny(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, hookProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => number, clientData: interop.PointerConvertible): number;

declare function TclAddLiteralObj(envPtr: interop.PointerConvertible, objPtr: interop.PointerConvertible, litPtrPtr: interop.PointerConvertible): number;

declare function TclHideLiteral(interp: interop.PointerConvertible, envPtr: interop.PointerConvertible, index: number): void;

declare function TclGetAuxDataType(typeName: string): interop.Pointer;

declare function TclHandleCreate(ptr: interop.PointerConvertible): interop.Pointer;

declare function TclHandleFree(handle: interop.PointerConvertible): void;

declare function TclHandlePreserve(handle: interop.PointerConvertible): interop.Pointer;

declare function TclHandleRelease(handle: interop.PointerConvertible): void;

declare function TclRegAbout(interp: interop.PointerConvertible, re: interop.PointerConvertible): number;

declare function TclRegExpRangeUniChar(re: interop.PointerConvertible, index: number, startPtr: interop.PointerConvertible, endPtr: interop.PointerConvertible): void;

declare function TclSetLibraryPath(pathPtr: interop.PointerConvertible): void;

declare function TclGetLibraryPath(): interop.Pointer;

declare function TclRegError(interp: interop.PointerConvertible, msg: string, status: number): void;

declare function TclVarTraceExists(interp: interop.PointerConvertible, varName: string): interop.Pointer;

declare function TclSetStartupScriptFileName(filename: string): void;

declare function TclGetStartupScriptFileName(): string;

declare function TclChannelTransform(interp: interop.PointerConvertible, chan: interop.PointerConvertible, cmdObjPtr: interop.PointerConvertible): number;

declare function TclChannelEventScriptInvoker(clientData: interop.PointerConvertible, flags: number): void;

declare function TclGetInstructionTable(): interop.Pointer;

declare function TclExpandCodeArray(envPtr: interop.PointerConvertible): void;

declare function TclpSetInitialEncodings(): void;

declare function TclListObjSetElement(interp: interop.PointerConvertible, listPtr: interop.PointerConvertible, index: number, valuePtr: interop.PointerConvertible): number;

declare function TclSetStartupScriptPath(pathPtr: interop.PointerConvertible): void;

declare function TclGetStartupScriptPath(): interop.Pointer;

declare function TclpUtfNcmp2(s1: string, s2: string, n: number): number;

declare function TclCheckInterpTraces(interp: interop.PointerConvertible, command: string, numChars: number, cmdPtr: interop.PointerConvertible, result: number, traceFlags: number, objc: number, objv: interop.Pointer): number;

declare function TclCheckExecutionTraces(interp: interop.PointerConvertible, command: string, numChars: number, cmdPtr: interop.PointerConvertible, result: number, traceFlags: number, objc: number, objv: interop.Pointer): number;

declare function TclInThreadExit(): number;

declare function TclUniCharMatch(string: interop.PointerConvertible, strLen: number, pattern: interop.PointerConvertible, ptnLen: number, flags: number): number;

declare function TclCallVarTraces(iPtr: interop.PointerConvertible, arrayPtr: interop.PointerConvertible, varPtr: interop.PointerConvertible, part1: string, part2: string, flags: number, leaveErrMsg: number): number;

declare function TclCleanupVar(varPtr: interop.PointerConvertible, arrayPtr: interop.PointerConvertible): void;

declare function TclVarErrMsg(interp: interop.PointerConvertible, part1: string, part2: string, operation: string, reason: string): void;

declare function Tcl_SetStartupScript(pathPtr: interop.PointerConvertible, encodingName: string): void;

declare function Tcl_GetStartupScript(encodingNamePtr: interop.PointerConvertible): interop.Pointer;

declare function TclpLocaltime(clock: interop.PointerConvertible): interop.Pointer;

declare function TclpGmtime(clock: interop.PointerConvertible): interop.Pointer;

declare function TclObjGetFrame(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, framePtrPtr: interop.PointerConvertible): number;

declare function TclpObjRemoveDirectory(pathPtr: interop.PointerConvertible, recursive: number, errorPtr: interop.PointerConvertible): number;

declare function TclpObjCopyDirectory(srcPathPtr: interop.PointerConvertible, destPathPtr: interop.PointerConvertible, errorPtr: interop.PointerConvertible): number;

declare function TclpObjCreateDirectory(pathPtr: interop.PointerConvertible): number;

declare function TclpObjDeleteFile(pathPtr: interop.PointerConvertible): number;

declare function TclpObjCopyFile(srcPathPtr: interop.PointerConvertible, destPathPtr: interop.PointerConvertible): number;

declare function TclpObjRenameFile(srcPathPtr: interop.PointerConvertible, destPathPtr: interop.PointerConvertible): number;

declare function TclpObjStat(pathPtr: interop.PointerConvertible, buf: interop.PointerConvertible): number;

declare function TclpObjAccess(pathPtr: interop.PointerConvertible, mode: number): number;

declare function TclpOpenFileChannel(interp: interop.PointerConvertible, pathPtr: interop.PointerConvertible, mode: number, permissions: number): interop.Pointer;

declare function TclpFindExecutable(argv0: string): void;

declare function TclGetObjNameOfExecutable(): interop.Pointer;

declare function TclSetObjNameOfExecutable(name: interop.PointerConvertible, encoding: interop.PointerConvertible): void;

declare function TclStackAlloc(interp: interop.PointerConvertible, numBytes: number): interop.Pointer;

declare function TclStackFree(interp: interop.PointerConvertible, freePtr: interop.PointerConvertible): void;

declare function TclPushStackFrame(interp: interop.PointerConvertible, framePtrPtr: interop.PointerConvertible, namespacePtr: interop.PointerConvertible, isProcCallFrame: number): number;

declare function TclPopStackFrame(interp: interop.PointerConvertible): void;

declare function TclGetPlatform(): interop.Pointer;

declare function TclTraceDictPath(interp: interop.PointerConvertible, rootPtr: interop.PointerConvertible, keyc: number, keyv: interop.Pointer, flags: number): interop.Pointer;

declare function TclObjBeingDeleted(objPtr: interop.PointerConvertible): number;

declare function TclSetNsPath(nsPtr: interop.PointerConvertible, pathLength: number, pathAry: interop.Pointer): void;

declare function TclObjInterpProcCore(interp: interop.PointerConvertible, procNameObj: interop.PointerConvertible, skip: number, errorProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void): number;

declare function TclPtrMakeUpvar(interp: interop.PointerConvertible, otherP1Ptr: interop.PointerConvertible, myName: string, myFlags: number, index: number): number;

declare function TclObjLookupVar(interp: interop.PointerConvertible, part1Ptr: interop.PointerConvertible, part2: string, flags: number, msg: string, createPart1: number, createPart2: number, arrayPtrPtr: interop.PointerConvertible): interop.Pointer;

declare function TclGetNamespaceFromObj(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, nsPtrPtr: interop.PointerConvertible): number;

declare function TclEvalObjEx(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, flags: number, invoker: interop.PointerConvertible, word: number): number;

declare function TclGetSrcInfoForPc(contextPtr: interop.PointerConvertible): void;

declare function TclVarHashCreateVar(tablePtr: interop.PointerConvertible, key: string, newPtr: interop.PointerConvertible): interop.Pointer;

declare function TclInitVarHashTable(tablePtr: interop.PointerConvertible, nsPtr: interop.PointerConvertible): void;

declare function TclBackgroundException(interp: interop.PointerConvertible, code: number): void;

declare function TclDbDumpActiveObjects(outFile: interop.PointerConvertible): void;

declare function TclGetAndDetachPids(interp: interop.PointerConvertible, chan: interop.PointerConvertible): void;

declare function TclpCloseFile(file: interop.PointerConvertible): number;

declare function TclpCreateCommandChannel(readFile: interop.PointerConvertible, writeFile: interop.PointerConvertible, errorFile: interop.PointerConvertible, numPids: number, pidPtr: interop.PointerConvertible): interop.Pointer;

declare function TclpCreatePipe(readPipe: interop.PointerConvertible, writePipe: interop.PointerConvertible): number;

declare function TclpCreateProcess(interp: interop.PointerConvertible, argc: number, argv: interop.PointerConvertible, inputFile: interop.PointerConvertible, outputFile: interop.PointerConvertible, errorFile: interop.PointerConvertible, pidPtr: interop.PointerConvertible): number;

declare function TclpMakeFile(channel: interop.PointerConvertible, direction: number): interop.Pointer;

declare function TclpOpenFile(fname: string, mode: number): interop.Pointer;

declare function TclUnixWaitForFile(fd: number, mask: number, timeout: number): number;

declare function TclpCreateTempFile(contents: string): interop.Pointer;

declare function TclpReaddir(dir: interop.PointerConvertible): interop.Pointer;

declare function TclpLocaltime_unix(clock: interop.PointerConvertible): interop.Pointer;

declare function TclpGmtime_unix(clock: interop.PointerConvertible): interop.Pointer;

declare function TclpInetNtoa(addr: in_addr): string;

declare function TclUnixCopyFile(src: string, dst: string, statBufPtr: interop.PointerConvertible, dontCopyAtts: number): number;

declare function TclEvalObjvInternal(interp: interop.PointerConvertible, objc: number, objv: interop.Pointer, command: string, length: number, flags: number): number;

declare function TclCompEvalObj(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible, invoker: interop.PointerConvertible, word: number): number;

declare function TclCleanupByteCode(codePtr: interop.PointerConvertible): void;

declare function TclCompileCmdWord(interp: interop.PointerConvertible, tokenPtr: interop.PointerConvertible, count: number, envPtr: interop.PointerConvertible): void;

declare function TclCompileExpr(interp: interop.PointerConvertible, script: string, numBytes: number, envPtr: interop.PointerConvertible, optimize: number): void;

declare function TclCompileExprWords(interp: interop.PointerConvertible, tokenPtr: interop.PointerConvertible, numWords: number, envPtr: interop.PointerConvertible): void;

declare function TclCompileScript(interp: interop.PointerConvertible, script: string, numBytes: number, envPtr: interop.PointerConvertible): void;

declare function TclCompileSyntaxError(interp: interop.PointerConvertible, envPtr: interop.PointerConvertible): void;

declare function TclCompileTokens(interp: interop.PointerConvertible, tokenPtr: interop.PointerConvertible, count: number, envPtr: interop.PointerConvertible): void;

declare function TclCreateAuxData(clientData: interop.PointerConvertible, typePtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): number;

declare function TclCreateExceptRange(type: interop.Enum<typeof ExceptionRangeType>, envPtr: interop.PointerConvertible): number;

declare function TclCreateExecEnv(interp: interop.PointerConvertible): interop.Pointer;

declare function TclCreateLiteral(iPtr: interop.PointerConvertible, bytes: string, length: number, hash: number, newPtr: interop.PointerConvertible, nsPtr: interop.PointerConvertible, flags: number, globalPtrPtr: interop.PointerConvertible): interop.Pointer;

declare function TclDeleteExecEnv(eePtr: interop.PointerConvertible): void;

declare function TclDeleteLiteralTable(interp: interop.PointerConvertible, tablePtr: interop.PointerConvertible): void;

declare function TclEmitForwardJump(envPtr: interop.PointerConvertible, jumpType: interop.Enum<typeof TclJumpType>, jumpFixupPtr: interop.PointerConvertible): void;

declare function TclGetExceptionRangeForPc(pc: interop.PointerConvertible, catchOnly: number, codePtr: interop.PointerConvertible): interop.Pointer;

declare function TclExpandJumpFixupArray(fixupArrayPtr: interop.PointerConvertible): void;

declare function TclExecuteByteCode(interp: interop.PointerConvertible, codePtr: interop.PointerConvertible): number;

declare function TclFinalizeAuxDataTypeTable(): void;

declare function TclFindCompiledLocal(name: string, nameChars: number, create: number, procPtr: interop.PointerConvertible): number;

declare function TclLookupLiteralEntry(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible): interop.Pointer;

declare function TclFixupForwardJump(envPtr: interop.PointerConvertible, jumpFixupPtr: interop.PointerConvertible, jumpDist: number, distThreshold: number): number;

declare function TclFreeCompileEnv(envPtr: interop.PointerConvertible): void;

declare function TclFreeJumpFixupArray(fixupArrayPtr: interop.PointerConvertible): void;

declare function TclInitAuxDataTypeTable(): void;

declare function TclInitByteCodeObj(objPtr: interop.PointerConvertible, envPtr: interop.PointerConvertible): void;

declare function TclInitCompilation(): void;

declare function TclInitCompileEnv(interp: interop.PointerConvertible, envPtr: interop.PointerConvertible, string: string, numBytes: number, invoker: interop.PointerConvertible, word: number): void;

declare function TclInitJumpFixupArray(fixupArrayPtr: interop.PointerConvertible): void;

declare function TclInitLiteralTable(tablePtr: interop.PointerConvertible): void;

declare function TclPrintInstruction(codePtr: interop.PointerConvertible, pc: interop.PointerConvertible): number;

declare function TclPrintObject(outFile: interop.PointerConvertible, objPtr: interop.PointerConvertible, maxChars: number): void;

declare function TclPrintSource(outFile: interop.PointerConvertible, string: string, maxChars: number): void;

declare function TclRegisterAuxDataType(typePtr: interop.PointerConvertible): void;

declare function TclRegisterLiteral(envPtr: interop.PointerConvertible, bytes: string, length: number, flags: number): number;

declare function TclReleaseLiteral(interp: interop.PointerConvertible, objPtr: interop.PointerConvertible): void;

declare function TclSingleOpCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclSortingOpCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclVariadicOpCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclNoIdentOpCmd(clientData: interop.PointerConvertible, interp: interop.PointerConvertible, objc: number, objv: interop.Pointer): number;

declare function TclWordKnownAtCompileTime(tokenPtr: interop.PointerConvertible, valuePtr: interop.PointerConvertible): number;


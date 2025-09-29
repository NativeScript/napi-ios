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

declare const tclDictType: Tcl_ObjType;

declare const tclDoubleType: Tcl_ObjType;

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

declare class TclOpCmdClientData {
  constructor(init?: TclOpCmdClientData);
  op: string | null;
  expected: string | null;
  i: unnamed_15168933827909229768;
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

declare class InstructionDesc {
  constructor(init?: InstructionDesc);
  name: string | null;
  numBytes: number;
  stackEffect: number;
  numOperands: number;
  opTypes: unknown /* const array */;
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

declare class LiteralEntry {
  constructor(init?: LiteralEntry);
  nextPtr: interop.Pointer;
  objPtr: interop.Pointer;
  refCount: number;
  nsPtr: interop.Pointer;
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

declare class unnamed_13373338001863078976 {
  constructor(init?: unnamed_13373338001863078976);
  cmd: string | null;
  len: number;
}

declare class unnamed_8515541993593250928 {
  constructor(init?: unnamed_8515541993593250928);
  codePtr: interop.Pointer;
  pc: string | null;
}

declare class unnamed_15929809299110372395 {
  constructor(init?: unnamed_15929809299110372395);
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
  data: unnamed_164377030102870047;
  cmd: unnamed_3600664622209610221;
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
  limit: unnamed_15038866089344729527;
  ensembleRewrite: unnamed_5645730893955504704;
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
  value: unnamed_12404584984572921;
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

declare class VarInHash {
  constructor(init?: VarInHash);
  var: Var;
  refCount: number;
  entry: Tcl_HashEntry;
}

declare class List {
  constructor(init?: List);
  refCount: number;
  maxElemCount: number;
  elemCount: number;
  canonicalFlag: number;
  elements: interop.Pointer;
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

declare class ExtraFrameInfo {
  constructor(init?: ExtraFrameInfo);
  length: number;
  fields: unknown /* const array */;
}

declare class unnamed_15038866089344729527 {
  constructor(init?: unnamed_15038866089344729527);
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

declare class NamespacePathEntry {
  constructor(init?: NamespacePathEntry);
  nsPtr: interop.Pointer;
  creatorNsPtr: interop.Pointer;
  prevPtr: interop.Pointer;
  nextPtr: interop.Pointer;
}

declare class CommandTrace {
  constructor(init?: CommandTrace);
  traceProc: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: string, p4: string, p5: number) => void | null;
  clientData: interop.Pointer;
  flags: number;
  nextPtr: interop.Pointer;
  refCount: number;
}

declare class JumptableInfo {
  constructor(init?: JumptableInfo);
  hashTable: Tcl_HashTable;
}

declare class ForeachVarList {
  constructor(init?: ForeachVarList);
  numVars: number;
  varIndexes: unknown /* const array */;
}

declare class JumpFixupArray {
  constructor(init?: JumpFixupArray);
  fixup: interop.Pointer;
  next: number;
  end: number;
  mallocedArray: number;
  staticFixupSpace: unknown /* const array */;
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

declare class TclFile_ {
  constructor(init?: TclFile_);
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

declare class ArraySearch {
  constructor(init?: ArraySearch);
  id: number;
  varPtr: interop.Pointer;
  search: Tcl_HashSearch;
  nextEntry: interop.Pointer;
  nextPtr: interop.Pointer;
}

declare class unnamed_5645730893955504704 {
  constructor(init?: unnamed_5645730893955504704);
  sourceObjs: interop.Pointer;
  numRemovedObjs: number;
  numInsertedObjs: number;
}

declare class ImportedCmdData {
  constructor(init?: ImportedCmdData);
  realCmdPtr: interop.Pointer;
  selfPtr: interop.Pointer;
}

type unnamed_15168933827909229768Descriptor = 
  | { numArgs: number }
  | { identity: number };

declare class unnamed_15168933827909229768 {
  constructor(init?: unnamed_15168933827909229768Descriptor);
  numArgs: number;
  identity: number;
}

type unnamed_3600664622209610221Descriptor = 
  | { str: unnamed_13373338001863078976 }
  | { listPtr: interop.PointerConvertible };

declare class unnamed_3600664622209610221 {
  constructor(init?: unnamed_3600664622209610221Descriptor);
  str: unnamed_13373338001863078976;
  listPtr: interop.Pointer;
}

type unnamed_12404584984572921Descriptor = 
  | { objPtr: interop.PointerConvertible }
  | { tablePtr: interop.PointerConvertible }
  | { linkPtr: interop.PointerConvertible };

declare class unnamed_12404584984572921 {
  constructor(init?: unnamed_12404584984572921Descriptor);
  objPtr: interop.Pointer;
  tablePtr: interop.Pointer;
  linkPtr: interop.Pointer;
}

type unnamed_164377030102870047Descriptor = 
  | { eval: unnamed_15929809299110372395 }
  | { tebc: unnamed_8515541993593250928 };

declare class unnamed_164377030102870047 {
  constructor(init?: unnamed_164377030102870047Descriptor);
  eval: unnamed_15929809299110372395;
  tebc: unnamed_8515541993593250928;
}

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


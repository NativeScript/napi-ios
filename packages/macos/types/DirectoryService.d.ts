/// <reference types="@nativescript/objc-node-api" />

declare const tDirPatternMatch: {
  eDSNoMatch1: 0,
  eDSAnyMatch: 1,
  eDSBeginAppleReserve1: 2,
  eDSEndAppleReserve1: 8191,
  eDSExact: 8193,
  eDSStartsWith: 8194,
  eDSEndsWith: 8195,
  eDSContains: 8196,
  eDSLessThan: 8197,
  eDSGreaterThan: 8198,
  eDSLessEqual: 8199,
  eDSGreaterEqual: 8200,
  eDSWildCardPattern: 8201,
  eDSRegularExpression: 8202,
  eDSCompoundExpression: 8203,
  eDSiExact: 8449,
  eDSiStartsWith: 8450,
  eDSiEndsWith: 8451,
  eDSiContains: 8452,
  eDSiLessThan: 8453,
  eDSiGreaterThan: 8454,
  eDSiLessEqual: 8455,
  eDSiGreaterEqual: 8456,
  eDSiWildCardPattern: 8457,
  eDSiRegularExpression: 8458,
  eDSiCompoundExpression: 8459,
  eDSLocalNodeNames: 8704,
  eDSSearchNodeName: 8705,
  eDSConfigNodeName: 8706,
  eDSLocalHostedNodes: 8707,
  eDSAuthenticationSearchNodeName: 8705,
  eDSContactsSearchNodeName: 8708,
  eDSNetworkSearchNodeName: 8709,
  eDSDefaultNetworkNodes: 8710,
  eDSCacheNodeName: 8711,
  dDSBeginPlugInCustom: 12288,
  eDSEndPlugInCustom: 20479,
  eDSBeginAppleReserve2: 20480,
  eDSEndAppleReserve2: 65534,
  eDSNoMatch2: 65535,
};

declare const tDirStatus: {
  DSNoErr: 0,
  DSOpenFailed: -14000,
  DSCloseFailed: -14001,
  DSOpenNodeFailed: -14002,
  DSBadDirRefences: -14003,
  DSNullRecordReference: -14004,
  DSMaxSessionsOpen: -14005,
  DSCannotAccessSession: -14006,
  DSDirSrvcNotOpened: -14007,
  DSNodeNotFound: -14008,
  DSUnknownNodeName: -14009,
  DSRegisterCustomFailed: -14010,
  DSGetCustomFailed: -14011,
  DSUnRegisterFailed: -14012,
  DSLocalDSDaemonInUse: -14015,
  DSNormalDSDaemonInUse: -14016,
  DSAllocationFailed: -14050,
  DSDeAllocateFailed: -14051,
  DSCustomBlockFailed: -14052,
  DSCustomUnblockFailed: -14053,
  DSCustomYieldFailed: -14054,
  DSCorruptBuffer: -14060,
  DSInvalidIndex: -14061,
  DSIndexOutOfRange: -14062,
  DSIndexNotFound: -14063,
  DSCorruptRecEntryData: -14065,
  DSRefSpaceFull: -14069,
  DSRefTableAllocError: -14070,
  DSInvalidReference: -14071,
  DSInvalidRefType: -14072,
  DSInvalidDirRef: -14073,
  DSInvalidNodeRef: -14074,
  DSInvalidRecordRef: -14075,
  DSInvalidAttrListRef: -14076,
  DSInvalidAttrValueRef: -14077,
  DSInvalidContinueData: -14078,
  DSInvalidBuffFormat: -14079,
  DSInvalidPatternMatchType: -14080,
  DSRefTableError: -14081,
  DSRefTableNilError: -14082,
  DSRefTableIndexOutOfBoundsError: -14083,
  DSRefTableEntryNilError: -14084,
  DSRefTableCSBPAllocError: -14085,
  DSRefTableFWAllocError: -14086,
  DSAuthFailed: -14090,
  DSAuthMethodNotSupported: -14091,
  DSAuthResponseBufTooSmall: -14092,
  DSAuthParameterError: -14093,
  DSAuthInBuffFormatError: -14094,
  DSAuthNoSuchEntity: -14095,
  DSAuthBadPassword: -14096,
  DSAuthContinueDataBad: -14097,
  DSAuthUnknownUser: -14098,
  DSAuthInvalidUserName: -14099,
  DSAuthCannotRecoverPasswd: -14100,
  DSAuthFailedClearTextOnly: -14101,
  DSAuthNoAuthServerFound: -14102,
  DSAuthServerError: -14103,
  DSInvalidContext: -14104,
  DSBadContextData: -14105,
  DSPermissionError: -14120,
  DSReadOnly: -14121,
  DSInvalidDomain: -14122,
  NetInfoError: -14123,
  DSInvalidRecordType: -14130,
  DSInvalidAttributeType: -14131,
  DSInvalidRecordName: -14133,
  DSAttributeNotFound: -14134,
  DSRecordAlreadyExists: -14135,
  DSRecordNotFound: -14136,
  DSAttributeDoesNotExist: -14137,
  DSRecordTypeDisabled: -14138,
  DSNoStdMappingAvailable: -14140,
  DSInvalidNativeMapping: -14141,
  DSSchemaError: -14142,
  DSAttributeValueNotFound: -14143,
  DSVersionMismatch: -14149,
  DSPlugInConfigFileError: -14150,
  DSInvalidPlugInConfigData: -14151,
  DSAuthNewPasswordRequired: -14161,
  DSAuthPasswordExpired: -14162,
  DSAuthPasswordQualityCheckFailed: -14165,
  DSAuthAccountDisabled: -14167,
  DSAuthAccountExpired: -14168,
  DSAuthAccountInactive: -14169,
  DSAuthPasswordTooShort: -14170,
  DSAuthPasswordTooLong: -14171,
  DSAuthPasswordNeedsLetter: -14172,
  DSAuthPasswordNeedsDigit: -14173,
  DSAuthPasswordChangeTooSoon: -14174,
  DSAuthInvalidLogonHours: -14175,
  DSAuthInvalidComputer: -14176,
  DSAuthPrimaryUnreachable: -14177,
  DSAuthMasterUnreachable: -14177,
  DSNullParameter: -14200,
  DSNullDataBuff: -14201,
  DSNullNodeName: -14202,
  DSNullRecEntryPtr: -14203,
  DSNullRecName: -14204,
  DSNullRecNameList: -14205,
  DSNullRecType: -14206,
  DSNullRecTypeList: -14207,
  DSNullAttribute: -14208,
  DSNullAttributeAccess: -14209,
  DSNullAttributeValue: -14210,
  DSNullAttributeType: -14211,
  DSNullAttributeTypeList: -14212,
  DSNullAttributeControlPtr: -14213,
  DSNullAttributeRequestList: -14214,
  DSNullDataList: -14215,
  DSNullDirNodeTypeList: -14216,
  DSNullAutMethod: -14217,
  DSNullAuthStepData: -14218,
  DSNullAuthStepDataResp: -14219,
  DSNullNodeInfoTypeList: -14220,
  DSNullPatternMatch: -14221,
  DSNullNodeNamePattern: -14222,
  DSNullTargetArgument: -14223,
  DSEmptyParameter: -14230,
  DSEmptyBuffer: -14231,
  DSEmptyNodeName: -14232,
  DSEmptyRecordName: -14233,
  DSEmptyRecordNameList: -14234,
  DSEmptyRecordType: -14235,
  DSEmptyRecordTypeList: -14236,
  DSEmptyRecordEntry: -14237,
  DSEmptyPatternMatch: -14238,
  DSEmptyNodeNamePattern: -14239,
  DSEmptyAttribute: -14240,
  DSEmptyAttributeType: -14241,
  DSEmptyAttributeTypeList: -14242,
  DSEmptyAttributeValue: -14243,
  DSEmptyAttributeRequestList: -14244,
  DSEmptyDataList: -14245,
  DSEmptyNodeInfoTypeList: -14246,
  DSEmptyAuthMethod: -14247,
  DSEmptyAuthStepData: -14248,
  DSEmptyAuthStepDataResp: -14249,
  DSEmptyPattern2Match: -14250,
  DSBadDataNodeLength: -14255,
  DSBadDataNodeFormat: -14256,
  DSBadSourceDataNode: -14257,
  DSBadTargetDataNode: -14258,
  DSBufferTooSmall: -14260,
  DSUnknownMatchType: -14261,
  DSUnSupportedMatchType: -14262,
  DSInvalDataList: -14263,
  DSAttrListError: -14264,
  ServerNotRunning: -14270,
  UnknownAPICall: -14271,
  UnknownServerError: -14272,
  UnknownPlugIn: -14273,
  PlugInDataError: -14274,
  PlugInNotFound: -14275,
  PlugInError: -14276,
  PlugInInitError: -14277,
  PlugInNotActive: -14278,
  PlugInFailedToInitialize: -14279,
  PlugInCallTimedOut: -14280,
  NoSearchNodesFound: -14290,
  SearchPathNotDefined: -14291,
  NotHandledByThisNode: -14292,
  IPCSendError: -14330,
  IPCReceiveError: -14331,
  ServerReplyError: -14332,
  DSTCPSendError: -14350,
  DSTCPReceiveError: -14351,
  DSTCPVersionMismatch: -14352,
  DSIPUnreachable: -14353,
  DSUnknownHost: -14354,
  PluginHandlerNotLoaded: -14400,
  NoPluginsLoaded: -14402,
  PluginAlreadyLoaded: -14404,
  PluginVersionNotFound: -14406,
  PluginNameNotFound: -14408,
  NoPluginFactoriesFound: -14410,
  PluginConfigAvailNotFound: -14412,
  PluginConfigFileNotFound: -14414,
  CFMGetFileSysRepErr: -14450,
  CFPlugInGetBundleErr: -14452,
  CFBndleGetInfoDictErr: -14454,
  CFDictGetValueErr: -14456,
  DSServerTimeout: -14470,
  DSContinue: -14471,
  DSInvalidHandle: -14472,
  DSSendFailed: -14473,
  DSReceiveFailed: -14474,
  DSBadPacket: -14475,
  DSInvalidTag: -14476,
  DSInvalidSession: -14477,
  DSInvalidName: -14478,
  DSUserUnknown: -14479,
  DSUnrecoverablePassword: -14480,
  DSAuthenticationFailed: -14481,
  DSBogusServer: -14482,
  DSOperationFailed: -14483,
  DSNotAuthorized: -14484,
  DSNetInfoError: -14485,
  DSContactPrimary: -14486,
  DSContactMaster: -14486,
  DSServiceUnavailable: -14487,
  DSInvalidFilePath: -14488,
  DSOperationTimeout: -14489,
  FWGetDirNodeNameErr1: -14501,
  FWGetDirNodeNameErr2: -14502,
  FWGetDirNodeNameErr3: -14503,
  FWGetDirNodeNameErr4: -14504,
  ParameterSendError: -14700,
  ParameterReceiveError: -14720,
  ServerSendError: -14740,
  ServerReceiveError: -14760,
  MemoryError: -14900,
  MemoryAllocError: -14901,
  ServerError: -14910,
  ParameterError: -14915,
  DataReceiveErr_NoDirRef: -14950,
  DataReceiveErr_NoRecRef: -14951,
  DataReceiveErr_NoAttrListRef: -14952,
  DataReceiveErr_NoAttrValueListRef: -14953,
  DataReceiveErr_NoAttrEntry: -14954,
  DataReceiveErr_NoAttrValueEntry: -14955,
  DataReceiveErr_NoNodeCount: -14956,
  DataReceiveErr_NoAttrCount: -14957,
  DataReceiveErr_NoRecEntry: -14958,
  DataReceiveErr_NoRecEntryCount: -14959,
  DataReceiveErr_NoRecMatchCount: -14960,
  DataReceiveErr_NoDataBuff: -14961,
  DataReceiveErr_NoContinueData: -14962,
  DataReceiveErr_NoNodeChangeToken: -14963,
  NoLongerSupported: -14986,
  UndefinedError: -14987,
  NotYetImplemented: -14988,
  DSLastValue: -14999,
};

declare class tAttributeEntry {
  constructor(init?: tAttributeEntry);
  fReserved1: number;
  fReserved2: tAccessControlEntry;
  fAttributeValueCount: number;
  fAttributeDataSize: number;
  fAttributeValueMaxSize: number;
  fAttributeSignature: tDataBuffer;
}

declare class tAccessControlEntry {
  constructor(init?: tAccessControlEntry);
  fGuestAccessFlags: number;
  fDirMemberFlags: number;
  fDirNodeMemberFlags: number;
  fOwnerFlags: number;
  fAdministratorFlags: number;
}

declare class tDataList {
  constructor(init?: tDataList);
  fDataNodeCount: number;
  fDataListHead: interop.Pointer;
}

declare class tDataBuffer {
  constructor(init?: tDataBuffer);
  fBufferSize: number;
  fBufferLength: number;
  fBufferData: unknown /* const array */;
}

declare class tAttributeValueEntry {
  constructor(init?: tAttributeValueEntry);
  fAttributeValueID: number;
  fAttributeValueData: tDataBuffer;
}

declare class tRecordEntry {
  constructor(init?: tRecordEntry);
  fReserved1: number;
  fReserved2: tAccessControlEntry;
  fRecordAttributeCount: number;
  fRecordNameAndType: tDataBuffer;
}

declare function dsOpenDirService(outDirReference: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsOpenDirServiceProxy(outDirRef: interop.PointerConvertible, inHostOrIPAddress: string, inIPPort: number, inAuthMethod: interop.PointerConvertible, inAuthStepData: interop.PointerConvertible, outAuthStepDataResponse: interop.PointerConvertible, ioContinueData: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsOpenDirServiceLocal(outDirRef: interop.PointerConvertible, inFilePath: string): interop.Enum<typeof tDirStatus>;

declare function dsCloseDirService(inDirReference: number): interop.Enum<typeof tDirStatus>;

declare function dsAddChildPIDToReference(inDirRef: number, inValidChildPID: number, inValidAPIReferenceToGrantChild: number): interop.Enum<typeof tDirStatus>;

declare function dsIsDirServiceRunning(): interop.Enum<typeof tDirStatus>;

declare function dsIsDirServiceLocalRunning(): interop.Enum<typeof tDirStatus>;

declare function dsGetDirNodeCount(inDirReference: number, outDirectoryNodeCount: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsGetDirNodeCountWithInfo(inDirReference: number, outDirectoryNodeCount: interop.PointerConvertible, outDirectoryNodeChangeToken: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsGetDirNodeList(inDirReference: number, inOutDataBufferPtr: interop.PointerConvertible, outDirNodeCount: interop.PointerConvertible, inOutContinueData: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsReleaseContinueData(inDirReference: number, inContinueData: number): interop.Enum<typeof tDirStatus>;

declare function dsFindDirNodes(inDirReference: number, inOutDataBufferPtr: interop.PointerConvertible, inNodeNamePattern: interop.PointerConvertible, inPatternMatchType: interop.Enum<typeof tDirPatternMatch>, outDirNodeCount: interop.PointerConvertible, inOutContinueData: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsGetDirNodeName(inDirReference: number, inOutDataBuffer: interop.PointerConvertible, inDirNodeIndex: number, inOutDataList: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsOpenDirNode(inDirReference: number, inDirNodeName: interop.PointerConvertible, outDirNodeReference: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsCloseDirNode(inDirNodeReference: number): interop.Enum<typeof tDirStatus>;

declare function dsGetDirNodeInfo(inDirNodeReference: number, inDirNodeInfoTypeList: interop.PointerConvertible, inOutDataBuffer: interop.PointerConvertible, inAttributeInfoOnly: number, outAttributeInfoCount: interop.PointerConvertible, outAttributeListRef: interop.PointerConvertible, inOutContinueData: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsGetRecordList(inDirNodeReference: number, inOutDataBuffer: interop.PointerConvertible, inRecordNameList: interop.PointerConvertible, inPatternMatchType: interop.Enum<typeof tDirPatternMatch>, inRecordTypeList: interop.PointerConvertible, inAttributeTypeList: interop.PointerConvertible, inAttributeInfoOnly: number, inOutRecordEntryCount: interop.PointerConvertible, inOutContinueData: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsGetRecordEntry(inDirNodeReference: number, inOutDataBuffer: interop.PointerConvertible, inRecordEntryIndex: number, outAttributeListRef: interop.PointerConvertible, outRecordEntryPtr: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsGetAttributeEntry(inDirNodeReference: number, inOutDataBuffer: interop.PointerConvertible, inAttributeListRef: number, inAttributeInfoIndex: number, outAttributeValueListRef: interop.PointerConvertible, outAttributeInfoPtr: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsGetAttributeValue(inDirNodeReference: number, inOutDataBuffer: interop.PointerConvertible, inAttributeValueIndex: number, inAttributeValueListRef: number, outAttributeValue: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsGetNextAttributeEntry(inDirNodeReference: number, inOutDataBuffer: interop.PointerConvertible, inAttributeListRef: number, inAttributeInfoIndex: number, inOutAttributeOffset: interop.PointerConvertible, outAttributeValueListRef: interop.PointerConvertible, outAttributeInfoPtr: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsGetNextAttributeValue(inDirNodeReference: number, inOutDataBuffer: interop.PointerConvertible, inAttributeValueIndex: number, inOutAttributeValueOffset: interop.PointerConvertible, inAttributeValueListRef: number, outAttributeValue: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsCloseAttributeList(inAttributeListRef: number): interop.Enum<typeof tDirStatus>;

declare function dsCloseAttributeValueList(inAttributeValueListRef: number): interop.Enum<typeof tDirStatus>;

declare function dsOpenRecord(inDirNodeReference: number, inRecordType: interop.PointerConvertible, inRecordName: interop.PointerConvertible, outRecordReference: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsGetRecordReferenceInfo(inRecordReference: number, outRecordInfo: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsGetRecordAttributeInfo(inRecordReference: number, inAttributeType: interop.PointerConvertible, outAttributeInfoPtr: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsGetRecordAttributeValueByID(inRecordReference: number, inAttributeType: interop.PointerConvertible, inValueID: number, outEntryPtr: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsGetRecordAttributeValueByIndex(inRecordReference: number, inAttributeType: interop.PointerConvertible, inValueIndex: number, outEntryPtr: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsGetRecordAttributeValueByValue(inRecordReference: number, inAttributeType: interop.PointerConvertible, inAttributeValue: interop.PointerConvertible, outEntryPtr: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsFlushRecord(inRecordReference: number): interop.Enum<typeof tDirStatus>;

declare function dsCloseRecord(inRecordReference: number): interop.Enum<typeof tDirStatus>;

declare function dsSetRecordName(inRecordReference: number, inNewRecordName: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsSetRecordType(inRecordReference: number, inNewRecordType: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsDeleteRecord(inRecordReference: number): interop.Enum<typeof tDirStatus>;

declare function dsCreateRecord(inDirNodeReference: number, inRecordType: interop.PointerConvertible, inRecordName: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsCreateRecordAndOpen(inDirNodeReference: number, inRecordType: interop.PointerConvertible, inRecordName: interop.PointerConvertible, outRecordReference: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsAddAttribute(inRecordReference: number, inNewAttribute: interop.PointerConvertible, inNewAttributeAccess: interop.PointerConvertible, inFirstAttributeValue: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsRemoveAttribute(inRecordReference: number, inAttribute: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsAddAttributeValue(inRecordReference: number, inAttributeType: interop.PointerConvertible, inAttributeValue: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsRemoveAttributeValue(inRecordReference: number, inAttributeType: interop.PointerConvertible, inAttributeValueID: number): interop.Enum<typeof tDirStatus>;

declare function dsSetAttributeValue(inRecordReference: number, inAttributeType: interop.PointerConvertible, inAttributeValuePtr: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsSetAttributeValues(inRecordReference: number, inAttributeType: interop.PointerConvertible, inAttributeValuesPtr: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsDoDirNodeAuth(inDirNodeReference: number, inDirNodeAuthName: interop.PointerConvertible, inDirNodeAuthOnlyFlag: number, inAuthStepData: interop.PointerConvertible, outAuthStepDataResponse: interop.PointerConvertible, inOutContinueData: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsDoDirNodeAuthOnRecordType(inDirNodeReference: number, inDirNodeAuthName: interop.PointerConvertible, inDirNodeAuthOnlyFlag: number, inAuthStepData: interop.PointerConvertible, outAuthStepDataResponse: interop.PointerConvertible, inOutContinueData: interop.PointerConvertible, inRecordType: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsDoAttributeValueSearch(inDirNodeReference: number, inOutDataBuffer: interop.PointerConvertible, inRecordTypeList: interop.PointerConvertible, inAttributeType: interop.PointerConvertible, inPatternMatchType: interop.Enum<typeof tDirPatternMatch>, inPattern2Match: interop.PointerConvertible, inOutMatchRecordCount: interop.PointerConvertible, inOutContinueData: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsDoMultipleAttributeValueSearch(inDirNodeReference: number, inOutDataBuffer: interop.PointerConvertible, inRecordTypeList: interop.PointerConvertible, inAttributeType: interop.PointerConvertible, inPatternMatchType: interop.Enum<typeof tDirPatternMatch>, inPatterns2Match: interop.PointerConvertible, inOutMatchRecordCount: interop.PointerConvertible, inOutContinueData: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsDoAttributeValueSearchWithData(inDirNodeReference: number, inOutDataBuffer: interop.PointerConvertible, inRecordTypeList: interop.PointerConvertible, inAttributeMatchType: interop.PointerConvertible, inPatternMatchType: interop.Enum<typeof tDirPatternMatch>, inPatternToMatch: interop.PointerConvertible, inAttributeTypeRequestList: interop.PointerConvertible, inAttributeInfoOnly: number, inOutMatchRecordCount: interop.PointerConvertible, inOutContinueData: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsDoMultipleAttributeValueSearchWithData(inDirNodeReference: number, inOutDataBuffer: interop.PointerConvertible, inRecordTypeList: interop.PointerConvertible, inAttributeMatchType: interop.PointerConvertible, inPatternMatchType: interop.Enum<typeof tDirPatternMatch>, inPatternsToMatch: interop.PointerConvertible, inAttributeTypeRequestList: interop.PointerConvertible, inAttributeInfoOnly: number, inOutMatchRecordCount: interop.PointerConvertible, inOutContinueData: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsDoPlugInCustomCall(inDirNodeReference: number, inCustomRequestCode: number, inCustomRequestData: interop.PointerConvertible, outCustomRequestResponse: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsVerifyDirRefNum(inDirReference: number): interop.Enum<typeof tDirStatus>;

declare function dsDataBufferAllocate(inDirReference: number, inBufferSize: number): interop.Pointer;

declare function dsDataBufferDeAllocate(inDirReference: number, inDataBufferPtr: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsDataNodeAllocateBlock(inDirReference: number, inDataNodeSize: number, inDataNodeLength: number, inDataNodeBuffer: interop.PointerConvertible): interop.Pointer;

declare function dsDataNodeAllocateString(inDirReference: number, inCString: string): interop.Pointer;

declare function dsDataNodeDeAllocate(inDirReference: number, inDataNodePtr: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsDataNodeSetLength(inDataNodePtr: interop.PointerConvertible, inDataNodeLength: number): interop.Enum<typeof tDirStatus>;

declare function dsDataNodeGetLength(inDataNodePtr: interop.PointerConvertible): number;

declare function dsDataNodeGetSize(inDataNodePtr: interop.PointerConvertible): number;

declare function dsDataListAllocate(inDirReference: number): interop.Pointer;

declare function dsDataListDeallocate(inDirReference: number, inDataList: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsDataListDeAllocate(inDirReference: number, inDataList: interop.PointerConvertible, inDeAllocateNodesFlag: number): interop.Enum<typeof tDirStatus>;

declare function dsGetPathFromList(inDirReference: number, inDataList: interop.PointerConvertible, inDelimiter: string): string;

declare function dsBuildFromPath(inDirReference: number, inPathCString: string, inPathSeparatorCString: string): interop.Pointer;

declare function dsBuildListFromPathAlloc(inDirReference: number, inDataList: interop.PointerConvertible, inPathCString: string, inPathSeparatorCString: string): interop.Enum<typeof tDirStatus>;

declare function dsBuildListFromNodesAlloc(inDirReferences: number, inDataList: interop.PointerConvertible, in1stDataNodePtr: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsBuildListFromStrings(inDirReference: number, in1stCString: string): interop.Pointer;

declare function dsBuildListFromStringsAlloc(inDirReferences: number, inDataList: interop.PointerConvertible, in1stCString: string): interop.Enum<typeof tDirStatus>;

declare function dsBuildListFromStringsAllocV(inDirRef: number, inDataList: interop.PointerConvertible, in1stCString: string, args: string): interop.Enum<typeof tDirStatus>;

declare function dsAppendStringToListAlloc(inDirReferences: number, inDataList: interop.PointerConvertible, inCString: string): interop.Enum<typeof tDirStatus>;

declare function dsDataListGetNodeCount(inDataList: interop.PointerConvertible): number;

declare function dsAllocStringsFromList(inDirRef: number, inDataList: interop.PointerConvertible): interop.Pointer;

declare function dsGetDataLength(inDataList: interop.PointerConvertible): number;

declare function dsDataListInsertAfter(inDirReferences: number, inDataList: interop.PointerConvertible, inInsertDataNode: interop.PointerConvertible, inNodeIndex: number): interop.Enum<typeof tDirStatus>;

declare function dsDataListMergeListAfter(inTargetList: interop.PointerConvertible, inSourceList: interop.PointerConvertible, inNodeIndex: number): interop.Enum<typeof tDirStatus>;

declare function dsDataListCopyList(inDirReference: number, inDataListSource: interop.PointerConvertible): interop.Pointer;

declare function dsDataListDeleteThisNode(inDirReference: number, inDataList: interop.PointerConvertible, inNodeIndex: number): interop.Enum<typeof tDirStatus>;

declare function dsDataListGetNodeAlloc(inDirReference: number, inDataListPtr: interop.PointerConvertible, inNodeIndex: number, outDataNode: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsAllocAttributeValueEntry(inDirRef: number, inAttrValueID: number, inAttrValueData: interop.PointerConvertible, inAttrValueDataLen: number): interop.Pointer;

declare function dsDeallocAttributeValueEntry(inDirRef: number, inAttrValueEntry: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsDeallocAttributeEntry(inDirRef: number, inAttrEntry: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsDeallocRecordEntry(inDirRef: number, inRecEntry: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsGetRecordNameFromEntry(inRecEntryPtr: interop.PointerConvertible, outRecName: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsGetRecordTypeFromEntry(inRecEntryPtr: interop.PointerConvertible, outRecType: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsParseAuthAuthority(inAuthAuthority: string, outVersion: interop.PointerConvertible, outAuthTag: interop.PointerConvertible, outAuthData: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsCopyDirStatusName(inDirStatus: number): string;

declare function dsFillAuthBuffer(inOutAuthBuffer: interop.PointerConvertible, inCount: number, inLen: number, inData: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsAppendAuthBuffer(inOutAuthBuffer: interop.PointerConvertible, inCount: number, inLen: number, inData: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsAppendAuthBufferWithAuthorityAttribute(inNodeRef: number, inRecordListBuffPtr: interop.PointerConvertible, inAttributePtr: interop.PointerConvertible, inValueRef: number, inUserName: string, inOutAuthBuffer: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsAppendAuthBufferWithAuthorityStrings(inUserName: string, inAuthAuthority: interop.Pointer, inOutAuthBuffer: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsServiceInformationAllocate(inServiceInfo: interop.PointerConvertible, inBufferSize: number, outPackedServiceInfo: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsBuildListFromNodes(inDirReferences: number, in1stDataNodePtr: interop.PointerConvertible): interop.Pointer;

declare function dsAppendStringToList(inDataList: interop.PointerConvertible, inCString: string): interop.Enum<typeof tDirStatus>;

declare function dsDataListInsertNode(inDataList: interop.PointerConvertible, inAfterDataNode: interop.PointerConvertible, inInsertDataNode: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsDataListMergeList(inDataList: interop.PointerConvertible, inAfterDataNode: interop.PointerConvertible, inMergeDataList: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsDataListRemoveThisNode(inDataList: interop.PointerConvertible, inNodeIndex: number, inDeleteCount: number): interop.Enum<typeof tDirStatus>;

declare function dsDataListRemoveNodes(inDataList: interop.PointerConvertible, in1stDataNode: interop.PointerConvertible, inDeleteCount: number): interop.Enum<typeof tDirStatus>;

declare function dsDataListGetNode(inDataListPtr: interop.PointerConvertible, inNodeIndex: number, outDataNode: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsRegisterCustomMemory(inDirReference: number, inCustomAllocate: (p1: number, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => interop.Enum<typeof tDirStatus>, inCustomDeAllocate: (p1: number, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => interop.Enum<typeof tDirStatus>, inClientData: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsGetCustomAllocate(inDirReference: number, outCustomAllocate: interop.PointerConvertible, outCustomDeAllocate: interop.PointerConvertible, outClientData: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsUnRegisterCustomMemory(inDirReference: number, inCustomAllocate: (p1: number, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => interop.Enum<typeof tDirStatus>, inCustomDeAllocate: (p1: number, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => interop.Enum<typeof tDirStatus>, inClientData: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsRegisterCustomThread(inDirReference: number, inCustomBlock: (p1: number, p2: interop.PointerConvertible) => interop.Enum<typeof tDirStatus>, inCustomUnBlock: (p1: number, p2: interop.PointerConvertible) => interop.Enum<typeof tDirStatus>, inCustomYield: (p1: number, p2: interop.PointerConvertible) => interop.Enum<typeof tDirStatus>, inClientData: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsGetCustomThread(inDirReference: number, outCustomBlock: interop.PointerConvertible, outCustomUnBlock: interop.PointerConvertible, outCustomYield: interop.PointerConvertible, outClientData: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;

declare function dsUnRegisterCustomThread(inDirReference: number, inCustomBlock: (p1: number, p2: interop.PointerConvertible) => interop.Enum<typeof tDirStatus>, inCustomUnBlock: (p1: number, p2: interop.PointerConvertible) => interop.Enum<typeof tDirStatus>, inCustomYield: (p1: number, p2: interop.PointerConvertible) => interop.Enum<typeof tDirStatus>, inClientData: interop.PointerConvertible): interop.Enum<typeof tDirStatus>;


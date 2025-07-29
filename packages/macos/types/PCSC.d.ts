/// <reference types="@nativescript/objc-node-api" />

declare const g_rgSCardT1Pci: _SCARD_IO_REQUEST;

declare const g_rgSCardT0Pci: _SCARD_IO_REQUEST;

declare const g_rgSCardRawPci: _SCARD_IO_REQUEST;

declare class MSCGenKeyParams {
  constructor(init?: MSCGenKeyParams);
  algoType: number;
  keySize: number;
  privateKeyACL: MSCKeyACL;
  publicKeyACL: MSCKeyACL;
  privateKeyPolicy: MSCKeyPolicy;
  publicKeyPolicy: MSCKeyPolicy;
  keyGenOptions: number;
  pOptParams: interop.Pointer;
  optParamsSize: number;
}

declare class MSCObjectACL {
  constructor(init?: MSCObjectACL);
  readPermission: number;
  writePermission: number;
  deletePermission: number;
}

declare class MSCKeyACL {
  constructor(init?: MSCKeyACL);
  readPermission: number;
  writePermission: number;
  usePermission: number;
}

declare class MSCKeyPolicy {
  constructor(init?: MSCKeyPolicy);
  cipherMode: number;
  cipherDirection: number;
}

declare class MSCInitTokenParams {
  constructor(init?: MSCInitTokenParams);
  transportKey: unknown /* const array */;
  transportKeyLen: number;
  transportBehavior: number;
  objectMemory: number;
  newTransportKey: unknown /* const array */;
  newTransportKeyLen: number;
  defaultCHV: unknown /* const array */;
  defaultCHVLen: number;
  defaultCHVTries: number;
  defaultCHVUnblock: unknown /* const array */;
  defaultCHVUnblockSize: number;
  defaultCHVUnblockTries: number;
  createObjectACL: number;
  createKeysACL: number;
  createPINsACL: number;
  maxNumberKeys: number;
  maxNumberPINs: number;
  maxNumberObjects: number;
}

declare class MSCEventWaitInfo {
  constructor(init?: MSCEventWaitInfo);
  arraySize: number;
  tokenArray: interop.Pointer;
  appData: interop.Pointer;
  callBack: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
}

declare class SCARD_READERSTATE_A {
  constructor(init?: SCARD_READERSTATE_A);
  szReader: string | null;
  pvUserData: interop.Pointer;
  dwCurrentState: number;
  dwEventState: number;
  cbAtr: number;
  rgbAtr: unknown /* const array */;
}

declare class MSCKeyInfo {
  constructor(init?: MSCKeyInfo);
  keyNum: number;
  keyType: number;
  keyPartner: number;
  keyMapping: number;
  keySize: number;
  keyPolicy: MSCKeyPolicy;
  keyACL: MSCKeyACL;
}

declare class MSCTokenConnection {
  constructor(init?: MSCTokenConnection);
  hContext: number;
  hCard: number;
  ioType: interop.Pointer;
  pMac: unknown /* const array */;
  macSize: number;
  tokenLibHandle: interop.Pointer;
  libPointers: CFDyLibPointers;
  tokenInfo: MSCTokenInfo;
  loggedIDs: number;
  shareMode: number;
  rwCallback: (p1: interop.PointerConvertible, p2: number) => number | null;
}

declare class MSCTokenInfo {
  constructor(init?: MSCTokenInfo);
  tokenName: unknown /* const array */;
  slotName: unknown /* const array */;
  svProvider: unknown /* const array */;
  tokenId: unknown /* const array */;
  tokenApp: unknown /* const array */;
  tokenAppLen: number;
  tokenIdLength: number;
  tokenState: number;
  tokenType: number;
  addParams: interop.Pointer;
  addParamsSize: number;
}

declare class CFDyLibPointers {
  constructor(init?: CFDyLibPointers);
  pvfWriteFramework: interop.Pointer;
  pvfInitializePlugin: interop.Pointer;
  pvfIdentifyToken: interop.Pointer;
  pvfFinalizePlugin: interop.Pointer;
  pvfGetStatus: interop.Pointer;
  pvfGetCapabilities: interop.Pointer;
  pvfExtendedFeature: interop.Pointer;
  pvfGenerateKeys: interop.Pointer;
  pvfImportKey: interop.Pointer;
  pvfExportKey: interop.Pointer;
  pvfComputeCrypt: interop.Pointer;
  pvfExtAuthenticate: interop.Pointer;
  pvfListKeys: interop.Pointer;
  pvfCreatePIN: interop.Pointer;
  pvfVerifyPIN: interop.Pointer;
  pvfChangePIN: interop.Pointer;
  pvfUnblockPIN: interop.Pointer;
  pvfListPINs: interop.Pointer;
  pvfCreateObject: interop.Pointer;
  pvfDeleteObject: interop.Pointer;
  pvfWriteObject: interop.Pointer;
  pvfReadObject: interop.Pointer;
  pvfListObjects: interop.Pointer;
  pvfLogoutAll: interop.Pointer;
  pvfGetChallenge: interop.Pointer;
}

declare class MSCCryptInit {
  constructor(init?: MSCCryptInit);
  keyNum: number;
  cipherMode: number;
  cipherDirection: number;
  optParams: interop.Pointer;
  optParamsSize: number;
}

declare class MSCStatusInfo {
  constructor(init?: MSCStatusInfo);
  appVersion: number;
  swVersion: number;
  freeMemory: number;
  totalMemory: number;
  usedPINs: number;
  usedKeys: number;
  loggedID: number;
}

declare class MSCObjectInfo {
  constructor(init?: MSCObjectInfo);
  objectID: unknown /* const array */;
  objectSize: number;
  objectACL: MSCObjectACL;
}

declare class _SCARD_IO_REQUEST {
  constructor(init?: _SCARD_IO_REQUEST);
  dwProtocol: number;
  cbPciLength: number;
}

declare function pcsc_stringify_error(err: number): string;

declare function SCardEstablishContext(dwScope: number, pvReserved1: interop.PointerConvertible, pvReserved2: interop.PointerConvertible, phContext: interop.PointerConvertible): number;

declare function SCardReleaseContext(hContext: number): number;

declare function SCardIsValidContext(hContext: number): number;

declare function SCardSetTimeout(hContext: number, dwTimeout: number): number;

declare function SCardConnect(hContext: number, szReader: string, dwShareMode: number, dwPreferredProtocols: number, phCard: interop.PointerConvertible, pdwActiveProtocol: interop.PointerConvertible): number;

declare function SCardReconnect(hCard: number, dwShareMode: number, dwPreferredProtocols: number, dwInitialization: number, pdwActiveProtocol: interop.PointerConvertible): number;

declare function SCardDisconnect(hCard: number, dwDisposition: number): number;

declare function SCardBeginTransaction(hCard: number): number;

declare function SCardEndTransaction(hCard: number, dwDisposition: number): number;

declare function SCardCancelTransaction(hCard: number): number;

declare function SCardStatus(hCard: number, mszReaderNames: string, pcchReaderLen: interop.PointerConvertible, pdwState: interop.PointerConvertible, pdwProtocol: interop.PointerConvertible, pbAtr: interop.PointerConvertible, pcbAtrLen: interop.PointerConvertible): number;

declare function SCardGetStatusChange(hContext: number, dwTimeout: number, rgReaderStates: interop.PointerConvertible, cReaders: number): number;

declare function SCardControl(hCard: number, pbSendBuffer: interop.PointerConvertible, cbSendLength: number, pbRecvBuffer: interop.PointerConvertible, pcbRecvLength: interop.PointerConvertible): number;

declare function SCardControl132(hCard: number, dwControlCode: number, pbSendBuffer: interop.PointerConvertible, cbSendLength: number, pbRecvBuffer: interop.PointerConvertible, cbRecvLength: number, lpBytesReturned: interop.PointerConvertible): number;

declare function SCardTransmit(hCard: number, pioSendPci: interop.PointerConvertible, pbSendBuffer: interop.PointerConvertible, cbSendLength: number, pioRecvPci: interop.PointerConvertible, pbRecvBuffer: interop.PointerConvertible, pcbRecvLength: interop.PointerConvertible): number;

declare function SCardListReaderGroups(hContext: number, mszGroups: string, pcchGroups: interop.PointerConvertible): number;

declare function SCardListReaders(hContext: number, mszGroups: string, mszReaders: string, pcchReaders: interop.PointerConvertible): number;

declare function SCardCancel(hContext: number): number;

declare function SCardGetAttrib(hCard: number, dwAttrId: number, pbAttr: interop.PointerConvertible, pcbAttrLen: interop.PointerConvertible): number;

declare function SCardSetAttrib(hCard: number, dwAttrId: number, pbAttr: interop.PointerConvertible, cbAttrLen: number): number;

declare function SCardUnload(): void;

declare function MSCListTokens(listScope: number, tokenArray: interop.PointerConvertible, arrayLength: interop.PointerConvertible): number;

declare function MSCEstablishConnection(tokenStruct: interop.PointerConvertible, sharingMode: number, applicationName: interop.PointerConvertible, nameSize: number, pConnection: interop.PointerConvertible): number;

declare function MSCReleaseConnection(pConnection: interop.PointerConvertible, endAction: number): number;

declare function MSCWaitForTokenEvent(tokenArray: interop.PointerConvertible, arraySize: number, timeoutValue: number): number;

declare function MSCCancelEventWait(): number;

declare function MSCBeginTransaction(pConnection: interop.PointerConvertible): number;

declare function MSCEndTransaction(pConnection: interop.PointerConvertible, endAction: number): number;

declare function MSCWriteFramework(pConnection: interop.PointerConvertible, pInitParams: interop.PointerConvertible): number;

declare function MSCGetStatus(pConnection: interop.PointerConvertible, pStatusInfo: interop.PointerConvertible): number;

declare function MSCGetCapabilities(pConnection: interop.PointerConvertible, Tag: number, p3: interop.PointerConvertible): number;

declare function MSCExtendedFeature(pConnection: interop.PointerConvertible, extFeature: number, outData: interop.PointerConvertible, outLength: number, inData: interop.PointerConvertible, inLength: interop.PointerConvertible): number;

declare function MSCGenerateKeys(pConnection: interop.PointerConvertible, prvKeyNum: number, pubKeyNum: number, pParams: interop.PointerConvertible): number;

declare function MSCImportKey(pConnection: interop.PointerConvertible, keyNum: number, pKeyACL: interop.PointerConvertible, pKeyBlob: interop.PointerConvertible, keyBlobSize: number, keyPolicy: interop.PointerConvertible, pAddParams: interop.PointerConvertible, addParamsSize: number): number;

declare function MSCExportKey(pConnection: interop.PointerConvertible, keyNum: number, pKeyBlob: interop.PointerConvertible, keyBlobSize: interop.PointerConvertible, pAddParams: interop.PointerConvertible, addParamsSize: number): number;

declare function MSCComputeCrypt(pConnection: interop.PointerConvertible, cryptInit: interop.PointerConvertible, pInputData: interop.PointerConvertible, inputDataSize: number, pOutputData: interop.PointerConvertible, outputDataSize: interop.PointerConvertible): number;

declare function MSCExtAuthenticate(pConnection: interop.PointerConvertible, keyNum: number, cipherMode: number, cipherDirection: number, pData: interop.PointerConvertible, dataSize: number): number;

declare function MSCListKeys(pConnection: interop.PointerConvertible, seqOption: number, pKeyInfo: interop.PointerConvertible): number;

declare function MSCCreatePIN(pConnection: interop.PointerConvertible, pinNum: number, pinAttempts: number, pPinCode: interop.PointerConvertible, pinCodeSize: number, pUnblockCode: interop.PointerConvertible, unblockCodeSize: number): number;

declare function MSCVerifyPIN(pConnection: interop.PointerConvertible, pinNum: number, pPinCode: interop.PointerConvertible, pinCodeSize: number): number;

declare function MSCChangePIN(pConnection: interop.PointerConvertible, pinNum: number, pOldPinCode: interop.PointerConvertible, oldPinCodeSize: number, pNewPinCode: interop.PointerConvertible, newPinCodeSize: number): number;

declare function MSCUnblockPIN(pConnection: interop.PointerConvertible, pinNum: number, pUnblockCode: interop.PointerConvertible, unblockCodeSize: number): number;

declare function MSCListPINs(pConnection: interop.PointerConvertible, pPinBitMask: interop.PointerConvertible): number;

declare function MSCCreateObject(pConnection: interop.PointerConvertible, objectID: string, objectSize: number, pObjectACL: interop.PointerConvertible): number;

declare function MSCDeleteObject(pConnection: interop.PointerConvertible, objectID: string, zeroFlag: number): number;

declare function MSCWriteObject(pConnection: interop.PointerConvertible, objectID: string, offset: number, pInputData: interop.PointerConvertible, dataSize: number, rwCallback: (p1: interop.PointerConvertible, p2: number) => number, addParams: interop.PointerConvertible): number;

declare function MSCReadObject(pConnection: interop.PointerConvertible, objectID: string, offset: number, pOutputData: interop.PointerConvertible, dataSize: number, rwCallback: (p1: interop.PointerConvertible, p2: number) => number, addParams: interop.PointerConvertible): number;

declare function MSCReadAllocateObject(pConnection: interop.PointerConvertible, objectID: string, pOutputData: interop.PointerConvertible, dataSize: interop.PointerConvertible, rwCallback: (p1: interop.PointerConvertible, p2: number) => number, addParams: interop.PointerConvertible): number;

declare function MSCListObjects(pConnection: interop.PointerConvertible, seqOption: number, pObjectInfo: interop.PointerConvertible): number;

declare function MSCLogoutAll(pConnection: interop.PointerConvertible): number;

declare function MSCGetChallenge(pConnection: interop.PointerConvertible, pSeed: interop.PointerConvertible, seedSize: number, pRandomData: interop.PointerConvertible, randomDataSize: number): number;

declare function MSCGetKeyAttributes(pConnection: interop.PointerConvertible, keyNumber: number, pKeyInfo: interop.PointerConvertible): number;

declare function MSCGetObjectAttributes(pConnection: interop.PointerConvertible, objectID: string, pObjectInfo: interop.PointerConvertible): number;

declare function msc_error(errorCode: number): string;

declare function MSCIsTokenReset(pConnection: interop.PointerConvertible): number;

declare function MSCClearReset(pConnection: interop.PointerConvertible): number;

declare function MSCIsTokenMoved(pConnection: interop.PointerConvertible): number;

declare function MSCIsTokenChanged(pConnection: interop.PointerConvertible): number;

declare function MSCIsTokenKnown(pConnection: interop.PointerConvertible): number;


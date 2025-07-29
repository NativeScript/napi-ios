/// <reference types="@nativescript/objc-node-api" />

declare const kLSMTextPreserveAcronyms: number;

declare const kLSMTextPreserveCase: number;

declare const kLSMMapLoadMutable: number;

declare const kLSMMapDiscardCounts: number;

declare const kLSMClusterTokens: number;

declare const kLSMMapTriplets: number;

declare const kLSMMapOverflow: number;

declare const kLSMMapBadCluster: number;

declare const kLSMClusterAgglomerative: number;

declare const kLSMTextApplySpamHeuristics: number;

declare const kLSMResultBestWords: number;

declare const kLSMClusterWords: number;

declare const kLSMMapBadPath: number;

declare const kLSMMapPairs: number;

declare const kLSMMapWriteError: number;

declare const kLSMMapNoSuchCategory: number;

declare const kLSMClusterCategories: number;

declare const kLSMMapHashText: number;

declare const kLSMMapOutOfState: number;

declare const kLSMClusterKMeans: number;

declare class __LSMResult {
  constructor(init?: __LSMResult);
}

declare class __LSMMap {
  constructor(init?: __LSMMap);
}

declare class __LSMText {
  constructor(init?: __LSMText);
}

declare function LSMMapGetTypeID(): number;

declare function LSMTextGetTypeID(): number;

declare function LSMResultGetTypeID(): number;

declare function LSMMapCreate(alloc: interop.PointerConvertible, flags: number): interop.Pointer;

declare function LSMMapSetProperties(mapref: interop.PointerConvertible, properties: interop.PointerConvertible): void;

declare function LSMMapGetProperties(mapref: interop.PointerConvertible): interop.Pointer;

declare function LSMMapStartTraining(mapref: interop.PointerConvertible): number;

declare function LSMMapAddCategory(mapref: interop.PointerConvertible): number;

declare function LSMMapGetCategoryCount(mapref: interop.PointerConvertible): number;

declare function LSMMapSetStopWords(mapref: interop.PointerConvertible, textref: interop.PointerConvertible): number;

declare function LSMMapAddText(mapref: interop.PointerConvertible, textref: interop.PointerConvertible, category: number): number;

declare function LSMMapAddTextWithWeight(mapref: interop.PointerConvertible, textref: interop.PointerConvertible, category: number, weight: number): number;

declare function LSMMapCompile(mapref: interop.PointerConvertible): number;

declare function LSMMapCreateClusters(alloc: interop.PointerConvertible, mapref: interop.PointerConvertible, subset: interop.PointerConvertible, numClusters: number, flags: number): interop.Pointer;

declare function LSMMapApplyClusters(mapref: interop.PointerConvertible, clusters: interop.PointerConvertible): number;

declare function LSMResultCreate(alloc: interop.PointerConvertible, mapref: interop.PointerConvertible, textref: interop.PointerConvertible, numResults: number, flags: number): interop.Pointer;

declare function LSMResultGetCount(result: interop.PointerConvertible): number;

declare function LSMResultGetCategory(result: interop.PointerConvertible, n: number): number;

declare function LSMResultGetScore(result: interop.PointerConvertible, n: number): number;

declare function LSMResultCopyWord(result: interop.PointerConvertible, n: number): interop.Pointer;

declare function LSMResultCopyToken(result: interop.PointerConvertible, n: number): interop.Pointer;

declare function LSMResultCopyWordCluster(result: interop.PointerConvertible, n: number): interop.Pointer;

declare function LSMResultCopyTokenCluster(result: interop.PointerConvertible, n: number): interop.Pointer;

declare function LSMMapWriteToURL(mapref: interop.PointerConvertible, file: interop.PointerConvertible, flags: number): number;

declare function LSMMapCreateFromURL(alloc: interop.PointerConvertible, file: interop.PointerConvertible, flags: number): interop.Pointer;

declare function LSMMapWriteToStream(mapref: interop.PointerConvertible, textref: interop.PointerConvertible, stream: interop.PointerConvertible, options: number): number;

declare function LSMTextCreate(alloc: interop.PointerConvertible, mapref: interop.PointerConvertible): interop.Pointer;

declare function LSMTextAddWord(textref: interop.PointerConvertible, word: interop.PointerConvertible): number;

declare function LSMTextAddWords(textref: interop.PointerConvertible, words: interop.PointerConvertible, locale: interop.PointerConvertible, flags: number): number;

declare function LSMTextAddToken(textref: interop.PointerConvertible, token: interop.PointerConvertible): number;


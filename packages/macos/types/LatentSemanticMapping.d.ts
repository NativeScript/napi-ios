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

declare function LSMMapCreate(alloc: interop.Object, flags: number): interop.Object;

declare function LSMMapSetProperties(mapref: interop.Object, properties: interop.Object): void;

declare function LSMMapGetProperties(mapref: interop.Object): interop.Object;

declare function LSMMapStartTraining(mapref: interop.Object): number;

declare function LSMMapAddCategory(mapref: interop.Object): number;

declare function LSMMapGetCategoryCount(mapref: interop.Object): number;

declare function LSMMapSetStopWords(mapref: interop.Object, textref: interop.Object): number;

declare function LSMMapAddText(mapref: interop.Object, textref: interop.Object, category: number): number;

declare function LSMMapAddTextWithWeight(mapref: interop.Object, textref: interop.Object, category: number, weight: number): number;

declare function LSMMapCompile(mapref: interop.Object): number;

declare function LSMMapCreateClusters(alloc: interop.Object, mapref: interop.Object, subset: interop.Object, numClusters: number, flags: number): interop.Object;

declare function LSMMapApplyClusters(mapref: interop.Object, clusters: interop.Object): number;

declare function LSMResultCreate(alloc: interop.Object, mapref: interop.Object, textref: interop.Object, numResults: number, flags: number): interop.Object;

declare function LSMResultGetCount(result: interop.Object): number;

declare function LSMResultGetCategory(result: interop.Object, n: number): number;

declare function LSMResultGetScore(result: interop.Object, n: number): number;

declare function LSMResultCopyWord(result: interop.Object, n: number): interop.Object;

declare function LSMResultCopyToken(result: interop.Object, n: number): interop.Object;

declare function LSMResultCopyWordCluster(result: interop.Object, n: number): interop.Object;

declare function LSMResultCopyTokenCluster(result: interop.Object, n: number): interop.Object;

declare function LSMMapWriteToURL(mapref: interop.Object, file: interop.Object, flags: number): number;

declare function LSMMapCreateFromURL(alloc: interop.Object, file: interop.Object, flags: number): interop.Object;

declare function LSMMapWriteToStream(mapref: interop.Object, textref: interop.Object, stream: interop.Object, options: number): number;

declare function LSMTextCreate(alloc: interop.Object, mapref: interop.Object): interop.Object;

declare function LSMTextAddWord(textref: interop.Object, word: interop.Object): number;

declare function LSMTextAddWords(textref: interop.Object, words: interop.Object, locale: interop.Object, flags: number): number;

declare function LSMTextAddToken(textref: interop.Object, token: interop.Object): number;


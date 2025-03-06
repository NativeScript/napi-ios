/// <reference types="@nativescript/objc-node-api" />

declare const NLContextualEmbeddingKeyRevision: string;

declare const NLContextualEmbeddingKeyLanguages: string;

declare const NLContextualEmbeddingKeyScripts: string;

declare const NLTaggerAssetsResult: {
  Available: 0,
  NotAvailable: 1,
  Error: 2,
};

declare const NLModelType: {
  Classifier: 0,
  Sequence: 1,
};

declare const NLContextualEmbeddingAssetsResult: {
  Available: 0,
  NotAvailable: 1,
  Error: 2,
};

declare const NLTokenizerAttributes: {
  Numeric: 1,
  Symbolic: 2,
  Emoji: 4,
};

declare const NLTaggerOptions: {
  OmitWords: 1,
  OmitPunctuation: 2,
  OmitWhitespace: 4,
  OmitOther: 8,
  JoinNames: 16,
  JoinContractions: 32,
};

declare const NLTokenUnit: {
  Word: 0,
  Sentence: 1,
  Paragraph: 2,
  Document: 3,
};

declare const NLDistanceType: {
  NLDistanceTypeCosine: 0,
};


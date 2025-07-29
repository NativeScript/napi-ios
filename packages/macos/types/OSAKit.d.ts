/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./AppKit.d.ts" />

declare const OSAStorageTextType: string;

declare const OSAStorageApplicationBundleType: string;

declare const OSAStorageScriptBundleType: string;

declare const OSAStorageScriptType: string;

declare const OSAScriptErrorBriefMessage: string;

declare const OSAScriptErrorMessage: string;

declare const OSAScriptErrorRangeKey: string;

declare const OSAScriptErrorAppAddressKey: string;

declare const OSAScriptErrorExpectedTypeKey: string;

declare const OSAScriptErrorBriefMessageKey: string;

declare const OSAScriptErrorMessageKey: string;

declare const OSAScriptErrorAppNameKey: string;

declare const OSAScriptErrorOffendingObjectKey: string;

declare const OSAScriptErrorNumberKey: string;

declare const OSAScriptErrorRange: string;

declare const OSAStorageApplicationType: string;

declare const OSAScriptErrorPartialResultKey: string;

declare const OSAScriptErrorNumber: string;

declare const OSAScriptErrorAppName: string;

declare const OSAStorageOptions: {
  Null: 0,
  PreventGetSource: 1,
  CompileIntoContext: 2,
  DontSetScriptLocation: 16777216,
  StayOpenApplet: 268435456,
  ShowStartupScreen: 536870912,
};

declare const OSAScriptState: {
  Stopped: 0,
  Running: 1,
  Recording: 2,
};

declare const OSALanguageFeatures: {
  Compiling: 2,
  GetSource: 4,
  AECoercion: 8,
  AESending: 16,
  Recording: 32,
  Convenience: 64,
  Dialects: 128,
  EventHandling: 256,
};

declare class OSAScriptController extends NSController {
  scriptView: OSAScriptView;

  resultView: NSTextView;

  script: OSAScript;

  language: OSALanguage;

  readonly scriptState: interop.Enum<typeof OSAScriptState>;

  readonly compiling: boolean;

  compileScript(sender: interop.Object | null): void;

  recordScript(sender: interop.Object | null): void;

  runScript(sender: interop.Object | null): void;

  stopScript(sender: interop.Object | null): void;

  setScriptView(scriptView: OSAScriptView | null): void;

  setResultView(resultView: NSTextView | null): void;

  setScript(script: OSAScript | null): void;

  setLanguage(language: OSALanguage | null): void;

  isCompiling(): boolean;
}

declare class OSALanguageInstance extends NSObject {
  static languageInstanceWithLanguage<This extends abstract new (...args: any) => any>(this: This, language: OSALanguage): InstanceType<This>;

  initWithLanguage(language: OSALanguage): this;

  readonly language: OSALanguage;

  readonly componentInstance: interop.Pointer;

  defaultTarget: NSAppleEventDescriptor;

  richTextFromDescriptor(descriptor: NSAppleEventDescriptor): NSAttributedString;

  setDefaultTarget(defaultTarget: NSAppleEventDescriptor): void;
}

declare class OSALanguage extends NSObject {
  static availableLanguages(): NSArray;

  static languageForName(name: string): OSALanguage;

  static languageForScriptDataDescriptor(descriptor: NSAppleEventDescriptor): OSALanguage;

  static defaultLanguage(): OSALanguage;

  static setDefaultLanguage(defaultLanguage: OSALanguage): void;

  initWithComponent(component: interop.PointerConvertible): this;

  sharedLanguageInstance(): OSALanguageInstance;

  readonly componentInstance: interop.Pointer;

  readonly name: string;

  readonly info: string;

  readonly version: string;

  readonly type: number;

  readonly subType: number;

  readonly manufacturer: number;

  readonly features: interop.Enum<typeof OSALanguageFeatures>;

  readonly threadSafe: boolean;

  isThreadSafe(): boolean;
}

declare class OSAScriptView extends NSTextView {
  source: string;

  usesScriptAssistant: boolean;

  usesTabs: boolean;

  tabWidth: number;

  wrapsLines: boolean;

  indentsWrappedLines: boolean;

  indentWidth: number;

  setSource(source: string | null): void;

  setUsesScriptAssistant(usesScriptAssistant: boolean): void;

  setUsesTabs(usesTabs: boolean): void;

  setTabWidth(tabWidth: number): void;

  setWrapsLines(wrapsLines: boolean): void;

  setIndentsWrappedLines(indentsWrappedLines: boolean): void;

  setIndentWidth(indentWidth: number): void;
}

declare class OSAScript extends NSObject implements NSCopying {
  static scriptDataDescriptorWithContentsOfURL(url: NSURL): NSAppleEventDescriptor;

  initWithSource(source: string): this;

  initWithSourceLanguage(source: string, language: OSALanguage | null): this;

  initWithSourceFromURLLanguageInstanceUsingStorageOptions(source: string, url: NSURL | null, instance: OSALanguageInstance | null, storageOptions: interop.Enum<typeof OSAStorageOptions>): this;

  initWithContentsOfURLError(url: NSURL, errorInfo: interop.PointerConvertible): this;

  initWithContentsOfURLLanguageError(url: NSURL, language: OSALanguage, errorInfo: interop.PointerConvertible): this;

  initWithContentsOfURLLanguageInstanceUsingStorageOptionsError(url: NSURL, instance: OSALanguageInstance | null, storageOptions: interop.Enum<typeof OSAStorageOptions>, errorInfo: interop.PointerConvertible): this;

  initWithCompiledDataError(data: NSData, errorInfo: interop.PointerConvertible): this;

  initWithCompiledDataFromURLUsingStorageOptionsError(data: NSData, url: NSURL | null, storageOptions: interop.Enum<typeof OSAStorageOptions>, errorInfo: interop.PointerConvertible): this;

  initWithScriptDataDescriptorFromURLLanguageInstanceUsingStorageOptionsError(data: NSAppleEventDescriptor, url: NSURL | null, instance: OSALanguageInstance | null, storageOptions: interop.Enum<typeof OSAStorageOptions>, errorInfo: interop.PointerConvertible): this;

  readonly source: string;

  readonly url: NSURL;

  language: OSALanguage;

  languageInstance: OSALanguageInstance;

  readonly compiled: boolean;

  compileAndReturnError(errorInfo: interop.PointerConvertible): boolean;

  executeAndReturnError(errorInfo: interop.PointerConvertible): NSAppleEventDescriptor;

  executeAppleEventError(event: NSAppleEventDescriptor, errorInfo: interop.PointerConvertible): NSAppleEventDescriptor;

  executeAndReturnDisplayValueError(displayValue: interop.PointerConvertible, errorInfo: interop.PointerConvertible): NSAppleEventDescriptor;

  executeHandlerWithNameArgumentsError(name: string, arguments$: NSArray<interop.Object> | Array<interop.Object>, errorInfo: interop.PointerConvertible): NSAppleEventDescriptor;

  readonly richTextSource: NSAttributedString;

  richTextFromDescriptor(descriptor: NSAppleEventDescriptor): NSAttributedString;

  writeToURLOfTypeError(url: NSURL, type: string, errorInfo: interop.PointerConvertible): boolean;

  writeToURLOfTypeUsingStorageOptionsError(url: NSURL, type: string, storageOptions: interop.Enum<typeof OSAStorageOptions>, errorInfo: interop.PointerConvertible): boolean;

  compiledDataForTypeUsingStorageOptionsError(type: string, storageOptions: interop.Enum<typeof OSAStorageOptions>, errorInfo: interop.PointerConvertible): NSData;

  setLanguage(language: OSALanguage): void;

  setLanguageInstance(languageInstance: OSALanguageInstance): void;

  isCompiled(): boolean;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}


/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./AppKit.d.ts" />

declare const AMLogLevel: {
  Debug: 0,
  Info: 1,
  Warn: 2,
  Error: 3,
};

declare const AMErrorCode: {
  WorkflowNewerVersion: -100,
  WorkflowPropertyListInvalid: -101,
  WorkflowNewerActionVersion: -111,
  WorkflowOlderActionVersion: -112,
  WorkflowActionsNotLoaded: -113,
  WorkflowNoEnabledActions: -114,
  UserCanceled: -128,
  NoSuchAction: -200,
  ActionNotLoadable: -201,
  ActionArchitectureMismatch: -202,
  ActionRuntimeMismatch: -203,
  ActionLoad: -204,
  ActionLink: -205,
  ActionApplicationResource: -206,
  ActionApplicationVersionResource: -207,
  ActionFileResource: -208,
  ActionLicenseResource: -209,
  ActionRequiredActionResource: -210,
  ActionInitialization: -211,
  ActionExecution: -212,
  ActionException: -213,
  ActionPropertyListInvalid: -214,
  ActionInsufficientData: -215,
  ActionIsDeprecated: -216,
  ActionFailedGatekeeper: -217,
  ActionSignatureCorrupt: -218,
  ActionQuarantine: -219,
  ActionXProtect: -220,
  ActionMalware: -221,
  ActionThirdPartyActionsNotAllowed: -222,
  ActionXPC: -223,
  ConversionNotPossible: -300,
  ConversionNoData: -301,
  ConversionFailed: -302,
};

declare interface AMWorkflowControllerDelegate extends NSObjectProtocol {
  workflowControllerWillRun?(controller: AMWorkflowController): void;

  workflowControllerWillStop?(controller: AMWorkflowController): void;

  workflowControllerDidRun?(controller: AMWorkflowController): void;

  workflowControllerDidStop?(controller: AMWorkflowController): void;

  workflowControllerWillRunAction?(controller: AMWorkflowController, action: AMAction): void;

  workflowControllerDidRunAction?(controller: AMWorkflowController, action: AMAction): void;

  workflowControllerDidError?(controller: AMWorkflowController, error: NSError): void;
}

declare class AMWorkflowControllerDelegate extends NativeObject implements AMWorkflowControllerDelegate {
}

declare class AMWorkflow extends NSObject implements NSCopying {
  static runWorkflowAtURLWithInputError(fileURL: NSURL, input: interop.Object | null, error: interop.PointerConvertible): interop.Object;

  init(): this;

  initWithContentsOfURLError(fileURL: NSURL, outError: interop.PointerConvertible): this;

  writeToURLError(fileURL: NSURL, outError: interop.PointerConvertible): boolean;

  setValueForVariableWithName(value: interop.Object | null, variableName: string): boolean;

  valueForVariableWithName(variableName: string): interop.Object;

  addAction(action: AMAction): void;

  removeAction(action: AMAction): void;

  insertActionAtIndex(action: AMAction, index: number): void;

  moveActionAtIndexToIndex(startIndex: number, endIndex: number): void;

  readonly fileURL: NSURL;

  readonly actions: NSArray;

  input: interop.Object;

  readonly output: interop.Object;

  setInput(input: interop.Object | null): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class AMAppleScriptAction extends AMBundleAction {
  script: OSAScript;

  setScript(script: OSAScript | null): void;
}

declare class AMAction extends NSObject {
  initWithDefinitionFromArchive(dict: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null, archived: boolean): this;

  initWithContentsOfURLError(fileURL: NSURL, outError: interop.PointerConvertible): this;

  readonly name: string;

  readonly ignoresInput: boolean;

  selectedInputType: string;

  selectedOutputType: string;

  progressValue: number;

  runWithInputFromActionError(input: interop.Object | null, anAction: AMAction | null, errorInfo: interop.PointerConvertible): interop.Object;

  runWithInputError(input: interop.Object | null, error: interop.PointerConvertible): interop.Object;

  runAsynchronouslyWithInput(input: interop.Object | null): void;

  willFinishRunning(): void;

  didFinishRunningWithError(errorInfo: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): void;

  finishRunningWithError(error: NSError | null): void;

  output: interop.Object;

  stop(): void;

  reset(): void;

  writeToDictionary(dictionary: NSMutableDictionary): void;

  opened(): void;

  activated(): void;

  closed(): void;

  updateParameters(): void;

  parametersUpdated(): void;

  logMessageWithLevelFormat(level: interop.Enum<typeof AMLogLevel>, format: string): void;

  readonly stopped: boolean;

  setSelectedInputType(selectedInputType: string): void;

  setSelectedOutputType(selectedOutputType: string): void;

  setProgressValue(progressValue: number): void;

  setOutput(output: interop.Object): void;

  isStopped(): boolean;
}

declare class AMShellScriptAction extends AMBundleAction {
  readonly remapLineEndings: boolean;

  readonly inputFieldSeparator: string;

  readonly outputFieldSeparator: string;
}

declare class AMWorkspace extends NSObject {
  static readonly sharedWorkspace: AMWorkspace;

  runWorkflowAtPathWithInputError(path: string, input: interop.Object, error: interop.PointerConvertible): interop.Object;
}

declare class AMWorkflowView extends NSView {
  editable: boolean;

  workflowController: AMWorkflowController;

  isEditable(): boolean;

  setEditable(editable: boolean): void;

  setWorkflowController(workflowController: AMWorkflowController | null): void;
}

declare class AMBundleAction extends AMAction implements NSCopying, NSSecureCoding {
  awakeFromBundle(): void;

  readonly hasView: boolean;

  readonly view: NSView;

  readonly bundle: NSBundle;

  parameters: NSMutableDictionary;

  setParameters(parameters: NSMutableDictionary | null): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class AMWorkflowController extends NSController {
  workflow: AMWorkflow;

  workflowView: AMWorkflowView;

  delegate: AMWorkflowControllerDelegate;

  readonly canRun: boolean;

  readonly running: boolean;

  readonly paused: boolean;

  run(sender: interop.Object): void;

  stop(sender: interop.Object): void;

  pause(sender: interop.Object): void;

  step(sender: interop.Object): void;

  reset(sender: interop.Object): void;

  setWorkflow(workflow: AMWorkflow | null): void;

  setWorkflowView(workflowView: AMWorkflowView | null): void;

  setDelegate(delegate: AMWorkflowControllerDelegate | null): void;

  isRunning(): boolean;

  isPaused(): boolean;
}


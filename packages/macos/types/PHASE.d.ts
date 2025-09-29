/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const PHASESpatialCategoryEarlyReflections: string;

declare const PHASEErrorDomain: string;

declare const PHASESpatialCategoryLateReverb: string;

declare const PHASESpatialCategoryDirectPathTransmission: string;

declare const PHASEAssetErrorDomain: string;

declare const PHASESoundEventErrorDomain: string;

declare const PHASEMaterialPreset: {
  Cardboard: 1833136740,
  Glass: 1833397363,
  Brick: 1833071211,
  Concrete: 1833132914,
  Drywall: 1833202295,
  Wood: 1834448228,
};

declare const PHASEAutomaticHeadTrackingFlags: {
  PHASEAutomaticHeadTrackingFlagOrientation: 1,
};

declare const PHASEPlaybackMode: {
  OneShot: 0,
  Looping: 1,
};

declare const PHASESoundEventPrepareState: {
  PrepareNotStarted: 0,
  PrepareInProgress: 1,
  Prepared: 2,
};

declare const PHASESoundEventPrepareHandlerReason: {
  Failure: 0,
  Prepared: 1,
  Terminated: 2,
};

declare const PHASEAssetError: {
  FailedToLoad: 1346920801,
  InvalidEngineInstance: 1346920802,
  BadParameters: 1346920803,
  AlreadyExists: 1346920804,
  GeneralError: 1346920805,
  MemoryAllocation: 1346920806,
};

declare const PHASESoundEventError: {
  NotFound: 1346925665,
  BadData: 1346925666,
  InvalidInstance: 1346925667,
  APIMisuse: 1346925668,
  SystemNotInitialized: 1346925669,
  OutOfMemory: 1346925670,
};

declare const PHASEError: {
  InitializeFailed: 1346913633,
  InvalidObject: 1346913634,
};

declare const PHASESpatializationMode: {
  Automatic: 0,
  AlwaysUseBinaural: 1,
  AlwaysUseChannelBased: 2,
};

declare const PHASERenderingState: {
  Stopped: 0,
  Started: 1,
  Paused: 2,
};

declare const PHASECullOption: {
  Terminate: 0,
  SleepWakeAtZero: 1,
  SleepWakeAtRandomOffset: 2,
  SleepWakeAtRealtimeOffset: 3,
  DoNotCull: 4,
};

declare const PHASEPushStreamBufferOptions: {
  Default: 1,
  Loops: 2,
  Interrupts: 4,
  InterruptsAtLoop: 8,
};

declare const PHASECalibrationMode: {
  None: 0,
  RelativeSpl: 1,
  AbsoluteSpl: 2,
};

declare const PHASEUpdateMode: {
  Automatic: 0,
  Manual: 1,
};

declare const PHASENormalizationMode: {
  None: 0,
  Dynamic: 1,
};

declare const PHASEReverbPreset: {
  None: 1917742958,
  SmallRoom: 1918063213,
  MediumRoom: 1917669997,
  LargeRoom: 1917604401,
  LargeRoom2: 1917604402,
  MediumChamber: 1917666152,
  LargeChamber: 1917600616,
  MediumHall: 1917667377,
  MediumHall2: 1917667378,
  MediumHall3: 1917667379,
  LargeHall: 1917601841,
  LargeHall2: 1917601842,
  Cathedral: 1917023336,
};

declare const PHASECurveType: {
  Linear: 1668435054,
  Squared: 1668436849,
  InverseSquared: 1668434257,
  Cubed: 1668432757,
  InverseCubed: 1668434243,
  Sine: 1668436846,
  InverseSine: 1668434259,
  Sigmoid: 1668436839,
  InverseSigmoid: 1668434247,
  HoldStartValue: 1668434003,
  JumpToEndValue: 1668434501,
};

declare const PHASESpatialPipelineFlags: {
  DirectPathTransmission: 1,
  EarlyReflections: 2,
  LateReverb: 4,
};

declare const PHASESoundEventStartHandlerReason: {
  Failure: 0,
  FinishedPlaying: 1,
  Terminated: 2,
};

declare const PHASEAssetType: {
  Resident: 0,
  Streamed: 1,
};

declare const PHASEPushStreamCompletionCallbackCondition: {
  PHASEPushStreamCompletionDataRendered: 0,
};

declare const PHASESoundEventSeekHandlerReason: {
  Failure: 0,
  FailureSeekAlreadyInProgress: 1,
  SeekSuccessful: 2,
};

declare const PHASEMediumPreset: {
  PHASEMediumPresetAir: 1835286898,
};

declare class PHASESource extends PHASEObject {
  initWithEngine(engine: PHASEEngine): this;

  initWithEngineShapes(engine: PHASEEngine, shapes: NSArray<interop.Object> | Array<interop.Object>): this;

  gain: number;

  readonly shapes: NSArray;

  setGain(gain: number): void;
}

declare class PHASEShape extends NSObject implements NSCopying {
  initWithEngineMesh(engine: PHASEEngine, mesh: MDLMesh): this;

  initWithEngineMeshMaterials(engine: PHASEEngine, mesh: MDLMesh, materials: NSArray<interop.Object> | Array<interop.Object>): this;

  readonly elements: NSArray;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class PHASEEngine extends NSObject {
  initWithUpdateMode(updateMode: interop.Enum<typeof PHASEUpdateMode>): this;

  startAndReturnError(error: interop.PointerConvertible): boolean;

  pause(): void;

  stop(): void;

  update(): void;

  outputSpatializationMode: interop.Enum<typeof PHASESpatializationMode>;

  readonly renderingState: interop.Enum<typeof PHASERenderingState>;

  readonly rootObject: PHASEObject;

  defaultMedium: PHASEMedium;

  defaultReverbPreset: interop.Enum<typeof PHASEReverbPreset>;

  unitsPerSecond: number;

  unitsPerMeter: number;

  readonly assetRegistry: PHASEAssetRegistry;

  readonly soundEvents: NSArray;

  readonly groups: NSDictionary;

  readonly duckers: NSArray;

  readonly activeGroupPreset: PHASEGroupPreset;

  setOutputSpatializationMode(outputSpatializationMode: interop.Enum<typeof PHASESpatializationMode>): void;

  setDefaultMedium(defaultMedium: PHASEMedium): void;

  setDefaultReverbPreset(defaultReverbPreset: interop.Enum<typeof PHASEReverbPreset>): void;

  setUnitsPerSecond(unitsPerSecond: number): void;

  setUnitsPerMeter(unitsPerMeter: number): void;
}

declare class PHASESoundEvent extends NSObject {
  initWithEngineAssetIdentifierMixerParametersError(engine: PHASEEngine, assetIdentifier: string, mixerParameters: PHASEMixerParameters, error: interop.PointerConvertible): this;

  initWithEngineAssetIdentifierError(engine: PHASEEngine, assetIdentifier: string, error: interop.PointerConvertible): this;

  prepareWithCompletion(handler: (p1: interop.Enum<typeof PHASESoundEventPrepareHandlerReason>) => void | null): void;

  startWithCompletion(handler: (p1: interop.Enum<typeof PHASESoundEventStartHandlerReason>) => void | null): void;

  seekToTimeCompletion(time: number, handler: (p1: interop.Enum<typeof PHASESoundEventSeekHandlerReason>) => void | null): void;

  pause(): void;

  resume(): void;

  stopAndInvalidate(): void;

  readonly renderingState: interop.Enum<typeof PHASERenderingState>;

  readonly prepareState: interop.Enum<typeof PHASESoundEventPrepareState>;

  readonly metaParameters: NSDictionary;

  readonly mixers: NSDictionary;

  readonly pushStreamNodes: NSDictionary;

  readonly pullStreamNodes: NSDictionary;

  readonly indefinite: boolean;

  isIndefinite(): boolean;
}

declare class PHASEObject extends NSObject implements NSCopying {
  initWithEngine(engine: PHASEEngine): this;

  addChildError(child: PHASEObject, error: interop.PointerConvertible): boolean;

  removeChild(child: PHASEObject): void;

  removeChildren(): void;

  readonly parent: PHASEObject;

  readonly children: NSArray;

  static readonly right: unknown /* ext vector */;

  static readonly up: unknown /* ext vector */;

  static readonly forward: unknown /* ext vector */;

  transform: simd_float4x4;

  worldTransform: simd_float4x4;

  setTransform(transform: simd_float4x4): void;

  setWorldTransform(worldTransform: simd_float4x4): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class PHASEGroupPreset extends NSObject {
  initWithEngineSettingsTimeToTargetTimeToReset(engine: PHASEEngine, settings: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, timeToTarget: number, timeToReset: number): this;

  readonly settings: NSDictionary;

  readonly timeToTarget: number;

  readonly timeToReset: number;

  activate(): void;

  activateWithTimeToTargetOverride(timeToTargetOverride: number): void;

  deactivate(): void;

  deactivateWithTimeToResetOverride(timeToResetOverride: number): void;
}

declare class PHASEGroupPresetSetting extends NSObject {
  initWithGainRateGainCurveTypeRateCurveType(gain: number, rate: number, gainCurveType: interop.Enum<typeof PHASECurveType>, rateCurveType: interop.Enum<typeof PHASECurveType>): this;

  readonly gain: number;

  readonly rate: number;

  readonly gainCurveType: interop.Enum<typeof PHASECurveType>;

  readonly rateCurveType: interop.Enum<typeof PHASECurveType>;
}

declare class PHASEEnvelopeDistanceModelParameters extends PHASEDistanceModelParameters {
  initWithEnvelope(envelope: PHASEEnvelope): this;

  readonly envelope: PHASEEnvelope;
}

declare class PHASEAssetRegistry extends NSObject {
  registerGlobalMetaParameterError(metaParameterDefinition: PHASEMetaParameterDefinition, error: interop.PointerConvertible): PHASEGlobalMetaParameterAsset;

  registerSoundEventAssetWithRootNodeIdentifierError(rootNode: PHASESoundEventNodeDefinition, identifier: string | null, error: interop.PointerConvertible): PHASESoundEventNodeAsset;

  registerSoundAssetAtURLIdentifierAssetTypeChannelLayoutNormalizationModeError(url: NSURL, identifier: string | null, assetType: interop.Enum<typeof PHASEAssetType>, channelLayout: AVAudioChannelLayout | null, normalizationMode: interop.Enum<typeof PHASENormalizationMode>, error: interop.PointerConvertible): PHASESoundAsset;

  registerSoundAssetWithDataIdentifierFormatNormalizationModeError(data: NSData, identifier: string | null, format: AVAudioFormat, normalizationMode: interop.Enum<typeof PHASENormalizationMode>, error: interop.PointerConvertible): PHASESoundAsset;

  unregisterAssetWithIdentifierCompletion(identifier: string, handler: (p1: boolean) => void | null): void;

  assetForIdentifier(identifier: string): PHASEAsset;

  readonly globalMetaParameters: NSDictionary;
}

declare class PHASESoundEventNodeAsset extends PHASEAsset {
}

declare class PHASEPullStreamNode extends PHASEStreamNode {
  renderBlock: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number;

  setRenderBlock(renderBlock: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => number): void;
}

declare class PHASEPushStreamNodeDefinition extends PHASEGeneratorNodeDefinition {
  initWithMixerDefinitionFormatIdentifier(mixerDefinition: PHASEMixerDefinition, format: AVAudioFormat, identifier: string): this;

  initWithMixerDefinitionFormat(mixerDefinition: PHASEMixerDefinition, format: AVAudioFormat): this;

  readonly format: AVAudioFormat;

  normalize: boolean;

  setNormalize(normalize: boolean): void;
}

declare class PHASERandomNodeDefinition extends PHASESoundEventNodeDefinition {
  init(): this;

  initWithIdentifier(identifier: string): this;

  addSubtreeWeight(subtree: PHASESoundEventNodeDefinition, weight: NSNumber): void;

  uniqueSelectionQueueLength: number;

  setUniqueSelectionQueueLength(uniqueSelectionQueueLength: number): void;
}

declare class PHASESwitchNodeDefinition extends PHASESoundEventNodeDefinition {
  initWithSwitchMetaParameterDefinitionIdentifier(switchMetaParameterDefinition: PHASEStringMetaParameterDefinition, identifier: string): this;

  initWithSwitchMetaParameterDefinition(switchMetaParameterDefinition: PHASEStringMetaParameterDefinition): this;

  addSubtreeSwitchValue(subtree: PHASESoundEventNodeDefinition, switchValue: string): void;

  readonly switchMetaParameterDefinition: PHASEStringMetaParameterDefinition;
}

declare class PHASESamplerNodeDefinition extends PHASEGeneratorNodeDefinition {
  initWithSoundAssetIdentifierMixerDefinitionIdentifier(soundAssetIdentifier: string, mixerDefinition: PHASEMixerDefinition, identifier: string): this;

  initWithSoundAssetIdentifierMixerDefinition(soundAssetIdentifier: string, mixerDefinition: PHASEMixerDefinition): this;

  readonly assetIdentifier: string;

  cullOption: interop.Enum<typeof PHASECullOption>;

  playbackMode: interop.Enum<typeof PHASEPlaybackMode>;

  setCullOption(cullOption: interop.Enum<typeof PHASECullOption>): void;

  setPlaybackMode(playbackMode: interop.Enum<typeof PHASEPlaybackMode>): void;
}

declare class PHASEGeneratorNodeDefinition extends PHASESoundEventNodeDefinition {
  setCalibrationModeLevel(calibrationMode: interop.Enum<typeof PHASECalibrationMode>, level: number): void;

  readonly calibrationMode: interop.Enum<typeof PHASECalibrationMode>;

  readonly level: number;

  rate: number;

  group: PHASEGroup;

  gainMetaParameterDefinition: PHASENumberMetaParameterDefinition;

  rateMetaParameterDefinition: PHASENumberMetaParameterDefinition;

  readonly mixerDefinition: PHASEMixerDefinition;

  setRate(rate: number): void;

  setGroup(group: PHASEGroup | null): void;

  setGainMetaParameterDefinition(gainMetaParameterDefinition: PHASENumberMetaParameterDefinition | null): void;

  setRateMetaParameterDefinition(rateMetaParameterDefinition: PHASENumberMetaParameterDefinition | null): void;
}

declare class PHASESoundEventNodeDefinition extends PHASEDefinition {
  readonly children: NSArray;
}

declare class PHASEMixerParameters extends NSObject {
  addSpatialMixerParametersWithIdentifierSourceListener(identifier: string, source: PHASESource, listener: PHASEListener): void;

  addAmbientMixerParametersWithIdentifierListener(identifier: string, listener: PHASEListener): void;
}

declare class PHASEAmbientMixerDefinition extends PHASEMixerDefinition {
  initWithChannelLayoutOrientationIdentifier(layout: AVAudioChannelLayout, orientation: simd_quatf, identifier: string): this;

  initWithChannelLayoutOrientation(layout: AVAudioChannelLayout, orientation: simd_quatf): this;

  readonly orientation: simd_quatf;

  readonly inputChannelLayout: AVAudioChannelLayout;
}

declare class PHASESpatialMixerDefinition extends PHASEMixerDefinition {
  initWithSpatialPipeline(spatialPipeline: PHASESpatialPipeline): this;

  initWithSpatialPipelineIdentifier(spatialPipeline: PHASESpatialPipeline, identifier: string): this;

  readonly spatialPipeline: PHASESpatialPipeline;

  distanceModelParameters: PHASEDistanceModelParameters;

  listenerDirectivityModelParameters: PHASEDirectivityModelParameters;

  sourceDirectivityModelParameters: PHASEDirectivityModelParameters;

  setDistanceModelParameters(distanceModelParameters: PHASEDistanceModelParameters | null): void;

  setListenerDirectivityModelParameters(listenerDirectivityModelParameters: PHASEDirectivityModelParameters | null): void;

  setSourceDirectivityModelParameters(sourceDirectivityModelParameters: PHASEDirectivityModelParameters | null): void;
}

declare class PHASEMappedMetaParameterDefinition extends PHASENumberMetaParameterDefinition {
  initWithInputMetaParameterDefinitionEnvelopeIdentifier(inputMetaParameterDefinition: PHASENumberMetaParameterDefinition, envelope: PHASEEnvelope, identifier: string): this;

  initWithInputMetaParameterDefinitionEnvelope(inputMetaParameterDefinition: PHASENumberMetaParameterDefinition, envelope: PHASEEnvelope): this;

  readonly envelope: PHASEEnvelope;

  readonly inputMetaParameterDefinition: PHASENumberMetaParameterDefinition;
}

declare class PHASEStringMetaParameterDefinition extends PHASEMetaParameterDefinition {
  initWithValueIdentifier(value: string, identifier: string): this;

  initWithValue(value: string): this;
}

declare class PHASENumberMetaParameterDefinition extends PHASEMetaParameterDefinition {
  initWithValueIdentifier(value: number, identifier: string): this;

  initWithValue(value: number): this;

  initWithValueMinimumMaximumIdentifier(value: number, minimum: number, maximum: number, identifier: string): this;

  initWithValueMinimumMaximum(value: number, minimum: number, maximum: number): this;

  readonly minimum: number;

  readonly maximum: number;
}

declare class PHASEDefinition extends NSObject {
  readonly identifier: string;
}

declare class PHASENumericPair extends NSObject {
  initWithFirstValueSecondValue(first: number, second: number): this;

  first: number;

  second: number;

  setFirst(first: number): void;

  setSecond(second: number): void;
}

declare class PHASEGlobalMetaParameterAsset extends PHASEAsset {
}

declare class PHASEEnvelope extends NSObject {
  initWithStartPointSegments(startPoint: unknown /* ext vector */, segments: NSArray<interop.Object> | Array<interop.Object>): this;

  evaluateForValue(x: number): number;

  readonly startPoint: unknown /* ext vector */;

  readonly segments: NSArray;

  readonly domain: PHASENumericPair;

  readonly range: PHASENumericPair;
}

declare class PHASEMixer extends NSObject {
  readonly identifier: string;

  readonly gain: number;

  readonly gainMetaParameter: PHASEMetaParameter;
}

declare class PHASEAsset extends NSObject {
  readonly identifier: string;
}

declare class PHASEConeDirectivityModelParameters extends PHASEDirectivityModelParameters {
  initWithSubbandParameters(subbandParameters: NSArray<interop.Object> | Array<interop.Object>): this;

  readonly subbandParameters: NSArray;
}

declare class PHASESoundAsset extends PHASEAsset {
  readonly url: NSURL;

  readonly data: NSData;

  readonly type: interop.Enum<typeof PHASEAssetType>;
}

declare class PHASEConeDirectivityModelSubbandParameters extends NSObject {
  init(): this;

  setInnerAngleOuterAngle(innerAngle: number, outerAngle: number): void;

  frequency: number;

  readonly innerAngle: number;

  readonly outerAngle: number;

  outerGain: number;

  setFrequency(frequency: number): void;

  setOuterGain(outerGain: number): void;
}

declare class PHASEOccluder extends PHASEObject {
  initWithEngineShapes(engine: PHASEEngine, shapes: NSArray<interop.Object> | Array<interop.Object>): this;

  readonly shapes: NSArray;
}

declare class PHASEContainerNodeDefinition extends PHASESoundEventNodeDefinition {
  init(): this;

  static new<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  initWithIdentifier(identifier: string): this;

  addSubtree(subtree: PHASESoundEventNodeDefinition): void;
}

declare class PHASEMetaParameterDefinition extends PHASEDefinition {
  readonly value: interop.Object;
}

declare class PHASEEnvelopeSegment extends NSObject {
  initWithEndPointCurveType(endPoint: unknown /* ext vector */, curveType: interop.Enum<typeof PHASECurveType>): this;

  endPoint: unknown /* ext vector */;

  curveType: interop.Enum<typeof PHASECurveType>;

  setEndPoint(endPoint: unknown /* ext vector */): void;

  setCurveType(curveType: interop.Enum<typeof PHASECurveType>): void;
}

declare class PHASEDucker extends NSObject {
  initWithEngineSourceGroupsTargetGroupsGainAttackTimeReleaseTimeAttackCurveReleaseCurve(engine: PHASEEngine, sourceGroups: NSSet, targetGroups: NSSet, gain: number, attackTime: number, releaseTime: number, attackCurve: interop.Enum<typeof PHASECurveType>, releaseCurve: interop.Enum<typeof PHASECurveType>): this;

  activate(): void;

  deactivate(): void;

  readonly sourceGroups: NSSet;

  readonly targetGroups: NSSet;

  readonly active: boolean;

  readonly gain: number;

  readonly attackTime: number;

  readonly releaseTime: number;

  readonly attackCurve: interop.Enum<typeof PHASECurveType>;

  readonly releaseCurve: interop.Enum<typeof PHASECurveType>;

  readonly identifier: string;

  isActive(): boolean;
}

declare class PHASECardioidDirectivityModelParameters extends PHASEDirectivityModelParameters {
  initWithSubbandParameters(subbandParameters: NSArray<interop.Object> | Array<interop.Object>): this;

  readonly subbandParameters: NSArray;
}

declare class PHASESpatialPipeline extends NSObject {
  initWithFlags(flags: interop.Enum<typeof PHASESpatialPipelineFlags>): this;

  readonly flags: interop.Enum<typeof PHASESpatialPipelineFlags>;

  readonly entries: NSDictionary;
}

declare class PHASEListener extends PHASEObject {
  initWithEngine(engine: PHASEEngine): this;

  gain: number;

  automaticHeadTrackingFlags: interop.Enum<typeof PHASEAutomaticHeadTrackingFlags>;

  setGain(gain: number): void;

  setAutomaticHeadTrackingFlags(automaticHeadTrackingFlags: interop.Enum<typeof PHASEAutomaticHeadTrackingFlags>): void;
}

declare class PHASEDistanceModelFadeOutParameters extends NSObject {
  initWithCullDistance(cullDistance: number): this;

  readonly cullDistance: number;
}

declare class PHASEBlendNodeDefinition extends PHASESoundEventNodeDefinition {
  initWithBlendMetaParameterDefinitionIdentifier(blendMetaParameterDefinition: PHASENumberMetaParameterDefinition, identifier: string): this;

  initWithBlendMetaParameterDefinition(blendMetaParameterDefinition: PHASENumberMetaParameterDefinition): this;

  initDistanceBlendWithSpatialMixerDefinitionIdentifier(spatialMixerDefinition: PHASESpatialMixerDefinition, identifier: string): this;

  initDistanceBlendWithSpatialMixerDefinition(spatialMixerDefinition: PHASESpatialMixerDefinition): this;

  readonly blendParameterDefinition: PHASENumberMetaParameterDefinition;

  readonly spatialMixerDefinitionForDistance: PHASESpatialMixerDefinition;

  addRangeForInputValuesBelowFullGainAtValueFadeCurveTypeSubtree(value: number, fullGainAtValue: number, fadeCurveType: interop.Enum<typeof PHASECurveType>, subtree: PHASESoundEventNodeDefinition): void;

  addRangeForInputValuesBetweenHighValueFullGainAtLowValueFullGainAtHighValueLowFadeCurveTypeHighFadeCurveTypeSubtree(lowValue: number, highValue: number, fullGainAtLowValue: number, fullGainAtHighValue: number, lowFadeCurveType: interop.Enum<typeof PHASECurveType>, highFadeCurveType: interop.Enum<typeof PHASECurveType>, subtree: PHASESoundEventNodeDefinition): void;

  addRangeForInputValuesAboveFullGainAtValueFadeCurveTypeSubtree(value: number, fullGainAtValue: number, fadeCurveType: interop.Enum<typeof PHASECurveType>, subtree: PHASESoundEventNodeDefinition): void;

  addRangeWithEnvelopeSubtree(envelope: PHASEEnvelope, subtree: PHASESoundEventNodeDefinition): void;
}

declare class PHASEGroup extends NSObject {
  initWithIdentifier(identifier: string): this;

  registerWithEngine(engine: PHASEEngine): void;

  unregisterFromEngine(): void;

  fadeGainDurationCurveType(gain: number, duration: number, curveType: interop.Enum<typeof PHASECurveType>): void;

  fadeRateDurationCurveType(rate: number, duration: number, curveType: interop.Enum<typeof PHASECurveType>): void;

  mute(): void;

  unmute(): void;

  solo(): void;

  unsolo(): void;

  readonly identifier: string;

  gain: number;

  rate: number;

  readonly muted: boolean;

  readonly soloed: boolean;

  setGain(gain: number): void;

  setRate(rate: number): void;

  isMuted(): boolean;

  isSoloed(): boolean;
}

declare class PHASEMedium extends NSObject {
  initWithEnginePreset(engine: PHASEEngine, preset: interop.Enum<typeof PHASEMediumPreset>): this;
}

declare class PHASEStringMetaParameter extends PHASEMetaParameter {
}

declare class PHASEPushStreamNode extends PHASEStreamNode {
  readonly gainMetaParameter: PHASENumberMetaParameter;

  readonly rateMetaParameter: PHASENumberMetaParameter;

  readonly mixer: PHASEMixer;

  readonly format: AVAudioFormat;

  scheduleBuffer(buffer: AVAudioPCMBuffer): void;

  scheduleBufferCompletionCallbackTypeCompletionHandler(buffer: AVAudioPCMBuffer, completionCallbackType: interop.Enum<typeof PHASEPushStreamCompletionCallbackCondition>, completionHandler: (p1: interop.Enum<typeof PHASEPushStreamCompletionCallbackCondition>) => void): void;

  scheduleBufferAtTimeOptions(buffer: AVAudioPCMBuffer, when: AVAudioTime | null, options: interop.Enum<typeof PHASEPushStreamBufferOptions>): void;

  scheduleBufferAtTimeOptionsCompletionCallbackTypeCompletionHandler(buffer: AVAudioPCMBuffer, when: AVAudioTime | null, options: interop.Enum<typeof PHASEPushStreamBufferOptions>, completionCallbackType: interop.Enum<typeof PHASEPushStreamCompletionCallbackCondition>, completionHandler: (p1: interop.Enum<typeof PHASEPushStreamCompletionCallbackCondition>) => void): void;
}

declare class PHASENumberMetaParameter extends PHASEMetaParameter {
  readonly minimum: number;

  readonly maximum: number;

  fadeToValueDuration(value: number, duration: number): void;
}

declare class PHASEStreamNode extends NSObject {
  readonly gainMetaParameter: PHASENumberMetaParameter;

  readonly rateMetaParameter: PHASENumberMetaParameter;

  readonly mixer: PHASEMixer;

  readonly format: AVAudioFormat;
}

declare class PHASEMetaParameter extends NSObject {
  readonly identifier: string;

  value: interop.Object;

  setValue(value: interop.Object): void;
}

declare class PHASEShapeElement extends NSObject {
  material: PHASEMaterial;

  setMaterial(material: PHASEMaterial | null): void;
}

declare class PHASEChannelMixerDefinition extends PHASEMixerDefinition {
  initWithChannelLayoutIdentifier(layout: AVAudioChannelLayout, identifier: string): this;

  initWithChannelLayout(layout: AVAudioChannelLayout): this;

  readonly inputChannelLayout: AVAudioChannelLayout;
}

declare class PHASEMixerDefinition extends PHASEDefinition {
  gain: number;

  gainMetaParameterDefinition: PHASENumberMetaParameterDefinition;

  setGain(gain: number): void;

  setGainMetaParameterDefinition(gainMetaParameterDefinition: PHASENumberMetaParameterDefinition | null): void;
}

declare class PHASEMaterial extends NSObject {
  initWithEnginePreset(engine: PHASEEngine, preset: interop.Enum<typeof PHASEMaterialPreset>): this;
}

declare class PHASEGeometricSpreadingDistanceModelParameters extends PHASEDistanceModelParameters {
  init(): this;

  rolloffFactor: number;

  setRolloffFactor(rolloffFactor: number): void;
}

declare class PHASEDistanceModelParameters extends NSObject {
  fadeOutParameters: PHASEDistanceModelFadeOutParameters;

  setFadeOutParameters(fadeOutParameters: PHASEDistanceModelFadeOutParameters | null): void;
}

declare class PHASECardioidDirectivityModelSubbandParameters extends NSObject {
  init(): this;

  frequency: number;

  pattern: number;

  sharpness: number;

  setFrequency(frequency: number): void;

  setPattern(pattern: number): void;

  setSharpness(sharpness: number): void;
}

declare class PHASEDirectivityModelParameters extends NSObject {
}

declare class PHASEPullStreamNodeDefinition extends PHASEGeneratorNodeDefinition {
  initWithMixerDefinitionFormatIdentifier(mixerDefinition: PHASEMixerDefinition, format: AVAudioFormat, identifier: string): this;

  initWithMixerDefinitionFormat(mixerDefinition: PHASEMixerDefinition, format: AVAudioFormat): this;

  readonly format: AVAudioFormat;

  normalize: boolean;

  setNormalize(normalize: boolean): void;
}

declare class PHASESpatialPipelineEntry extends NSObject {
  sendLevel: number;

  sendLevelMetaParameterDefinition: PHASENumberMetaParameterDefinition;

  setSendLevel(sendLevel: number): void;

  setSendLevelMetaParameterDefinition(sendLevelMetaParameterDefinition: PHASENumberMetaParameterDefinition | null): void;
}


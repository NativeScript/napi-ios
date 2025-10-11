/// <reference types="@nativescript/objc-node-api" />

declare const kFFPlugInAPINonRelRev: number;

declare const kFFPlugInAPIStage: number;

declare const kFFPlugInAPIMajorRev: number;

declare const kFFAPINonRelRev: number;

declare const kFFAPIStage: number;

declare const kFFAPIMinorAndBugRev: number;

declare const FFCAP_ET_CUSTOMFORCE: number;

declare const FFCAP_ET_DAMPER: number;

declare const FFCAP_ET_SAWTOOTHDOWN: number;

declare const FFCAP_ET_SQUARE: number;

declare const FFSCL_FOREGROUND: number;

declare const FFPROP_AUTOCENTER: number;

declare const FFPROP_FFGAIN: number;

declare const FFGFFS_DEVICELOST: number;

declare const FFGFFS_SAFETYSWITCHOFF: number;

declare const FFGFFS_POWEROFF: number;

declare const FFGFFS_POWERON: number;

declare const FFGFFS_ACTUATORSOFF: number;

declare const FFGFFS_STOPPED: number;

declare const FFGFFS_EMPTY: number;

declare const FFSFFC_SETACTUATORSOFF: number;

declare const FFSFFC_CONTINUE: number;

declare const FFEGES_EMULATED: number;

declare const FFEGES_PLAYING: number;

declare const FFES_NODOWNLOAD: number;

declare const FFEP_NODOWNLOAD: number;

declare const FFEP_NORESTART: number;

declare const FFEP_START: number;

declare const FFEP_ALLPARAMS: number;

declare const FFEP_DIRECTION: number;

declare const FFEP_AXES: number;

declare const FFEFF_SPHERICAL: number;

declare const FFCAP_ST_KINESTHETIC: number;

declare const kFFAPIMajorRev: number;

declare const FFEP_STARTDELAY: number;

declare const FFSCL_EXCLUSIVE: number;

declare const kFFPlugInAPIMinorAndBugRev: number;

declare const FFCAP_ET_FRICTION: number;

declare const FFEP_DURATION: number;

declare const FFSCL_NONEXCLUSIVE: number;

declare const FFSFFC_RESET: number;

declare const FFCAP_ET_CONSTANTFORCE: number;

declare const FFCAP_ET_SAWTOOTHUP: number;

declare const FFGFFS_USERFFSWITCHOFF: number;

declare const FFEFF_CARTESIAN: number;

declare const FFEP_GAIN: number;

declare const FFEP_TRIGGERBUTTON: number;

declare const FFCAP_ET_SINE: number;

declare const FFGFFS_USERFFSWITCHON: number;

declare const FFEFF_POLAR: number;

declare const FFCAP_ET_INERTIA: number;

declare const FFEB_NOTRIGGER: number;

declare const FFEP_ENVELOPE: number;

declare const FFES_SOLO: number;

declare const FFGFFS_SAFETYSWITCHON: number;

declare const FFSCL_BACKGROUND: number;

declare const FFCAP_ET_TRIANGLE: number;

declare const FFGFFS_PAUSED: number;

declare const FFSFFC_PAUSE: number;

declare const FFSFFC_STOPALL: number;

declare const FFEP_TYPESPECIFICPARAMS: number;

declare const FFEGES_NOTPLAYING: number;

declare const FFEP_SAMPLEPERIOD: number;

declare const FFEP_TRIGGERREPEATINTERVAL: number;

declare const FFCAP_ET_RAMPFORCE: number;

declare const FFCAP_ET_SPRING: number;

declare const FFSFFC_SETACTUATORSON: number;

declare const FFCAP_ST_VIBRATION: number;

declare const FFGFFS_ACTUATORSON: number;

declare class IOForceFeedbackDeviceInterface {
  constructor(init?: IOForceFeedbackDeviceInterface);
  _reserved: interop.Pointer;
  QueryInterface: (p1: interop.PointerConvertible, p2: CFUUIDBytes, p3: interop.PointerConvertible) => number | null;
  AddRef: (p1: interop.PointerConvertible) => number | null;
  Release: (p1: interop.PointerConvertible) => number | null;
  ForceFeedbackGetVersion: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  InitializeTerminate: (p1: interop.PointerConvertible, p2: NumVersion, p3: number, p4: number) => number | null;
  DestroyEffect: (p1: interop.PointerConvertible, p2: number) => number | null;
  DownloadEffect: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number) => number | null;
  Escape: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetEffectStatus: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  GetForceFeedbackCapabilities: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  GetForceFeedbackState: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => number | null;
  SendForceFeedbackCommand: (p1: interop.PointerConvertible, p2: number) => number | null;
  SetProperty: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => number | null;
  StartEffect: (p1: interop.PointerConvertible, p2: number, p3: number, p4: number) => number | null;
  StopEffect: (p1: interop.PointerConvertible, p2: number) => number | null;
}

declare class ForceFeedbackDeviceState {
  constructor(init?: ForceFeedbackDeviceState);
  dwSize: number;
  dwState: number;
  dwLoad: number;
}

declare class __FFEHIDDEN {
  constructor(init?: __FFEHIDDEN);
}

declare class FFCAPABILITIES {
  constructor(init?: FFCAPABILITIES);
  ffSpecVer: NumVersion;
  supportedEffects: number;
  emulatedEffects: number;
  subType: number;
  numFfAxes: number;
  ffAxes: unknown /* const array */;
  storageCapacity: number;
  playbackCapacity: number;
  firmwareVer: NumVersion;
  hardwareVer: NumVersion;
  driverVer: NumVersion;
}

declare class FFENVELOPE {
  constructor(init?: FFENVELOPE);
  dwSize: number;
  dwAttackLevel: number;
  dwAttackTime: number;
  dwFadeLevel: number;
  dwFadeTime: number;
}

declare class FFCONDITION {
  constructor(init?: FFCONDITION);
  lOffset: number;
  lPositiveCoefficient: number;
  lNegativeCoefficient: number;
  dwPositiveSaturation: number;
  dwNegativeSaturation: number;
  lDeadBand: number;
}

declare class FFPERIODIC {
  constructor(init?: FFPERIODIC);
  dwMagnitude: number;
  lOffset: number;
  dwPhase: number;
  dwPeriod: number;
}

declare class FFRAMPFORCE {
  constructor(init?: FFRAMPFORCE);
  lStart: number;
  lEnd: number;
}

declare class FFCUSTOMFORCE {
  constructor(init?: FFCUSTOMFORCE);
  cChannels: number;
  dwSamplePeriod: number;
  cSamples: number;
  rglForceData: interop.Pointer;
}

declare class __FFDHIDDEN {
  constructor(init?: __FFDHIDDEN);
}

declare class FFCONSTANTFORCE {
  constructor(init?: FFCONSTANTFORCE);
  lMagnitude: number;
}

declare class FFEFFESCAPE {
  constructor(init?: FFEFFESCAPE);
  dwSize: number;
  dwCommand: number;
  lpvInBuffer: interop.Pointer;
  cbInBuffer: number;
  lpvOutBuffer: interop.Pointer;
  cbOutBuffer: number;
}

declare class ForceFeedbackVersion {
  constructor(init?: ForceFeedbackVersion);
  apiVersion: NumVersion;
  plugInVersion: NumVersion;
}

declare class FFEFFECT {
  constructor(init?: FFEFFECT);
  dwSize: number;
  dwFlags: number;
  dwDuration: number;
  dwSamplePeriod: number;
  dwGain: number;
  dwTriggerButton: number;
  dwTriggerRepeatInterval: number;
  cAxes: number;
  rgdwAxes: interop.Pointer;
  rglDirection: interop.Pointer;
  lpEnvelope: interop.Pointer;
  cbTypeSpecificParams: number;
  lpvTypeSpecificParams: interop.Pointer;
  dwStartDelay: number;
}

declare function FFCreateDevice(hidDevice: number, pDeviceReference: interop.PointerConvertible): number;

declare function FFReleaseDevice(deviceReference: interop.PointerConvertible): number;

declare function FFIsForceFeedback(hidDevice: number): number;

declare function FFDeviceCreateEffect(deviceReference: interop.PointerConvertible, uuidRef: interop.Object, pEffectDefinition: interop.PointerConvertible, pEffectReference: interop.PointerConvertible): number;

declare function FFDeviceReleaseEffect(deviceReference: interop.PointerConvertible, effectReference: interop.PointerConvertible): number;

declare function FFDeviceEscape(deviceReference: interop.PointerConvertible, pFFEffectEscape: interop.PointerConvertible): number;

declare function FFDeviceGetForceFeedbackState(deviceReference: interop.PointerConvertible, pFFState: interop.PointerConvertible): number;

declare function FFDeviceSendForceFeedbackCommand(deviceReference: interop.PointerConvertible, flags: number): number;

declare function FFDeviceSetForceFeedbackProperty(deviceReference: interop.PointerConvertible, property: number, pValue: interop.PointerConvertible): number;

declare function FFDeviceGetForceFeedbackProperty(deviceReference: interop.PointerConvertible, property: number, pValue: interop.PointerConvertible, valueSize: number): number;

declare function FFDeviceSetCooperativeLevel(deviceReference: interop.PointerConvertible, taskIdentifier: interop.PointerConvertible, flags: number): number;

declare function FFDeviceGetForceFeedbackCapabilities(deviceReference: interop.PointerConvertible, pFFCapabilities: interop.PointerConvertible): number;

declare function FFEffectDownload(effectReference: interop.PointerConvertible): number;

declare function FFEffectEscape(effectReference: interop.PointerConvertible, pFFEffectEscape: interop.PointerConvertible): number;

declare function FFEffectGetEffectStatus(effectReference: interop.PointerConvertible, pFlags: interop.PointerConvertible): number;

declare function FFEffectGetParameters(effectReference: interop.PointerConvertible, pFFEffect: interop.PointerConvertible, flags: number): number;

declare function FFEffectSetParameters(effectReference: interop.PointerConvertible, pFFEffect: interop.PointerConvertible, flags: number): number;

declare function FFEffectStart(effectReference: interop.PointerConvertible, iterations: number, flags: number): number;

declare function FFEffectStop(effectReference: interop.PointerConvertible): number;

declare function FFEffectUnload(effectReference: interop.PointerConvertible): number;


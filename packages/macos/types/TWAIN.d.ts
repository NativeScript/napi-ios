/// <reference types="@nativescript/objc-node-api" />

declare class TW_CALLBACK {
  constructor(init?: TW_CALLBACK);
  CallBackProc: string | null;
  RefCon: string | null;
  Message: number;
}

declare class TW_DEVICEEVENT {
  constructor(init?: TW_DEVICEEVENT);
  Event: number;
  DeviceName: unknown /* const array */;
  BatteryMinutes: number;
  BatteryPercentage: number;
  PowerSupply: number;
  XResolution: TW_FIX32;
  YResolution: TW_FIX32;
  FlashUsed2: number;
  AutomaticCapture: number;
  TimeBeforeFirstCapture: number;
  TimeBetweenCaptures: number;
}

declare class TW_EXTIMAGEINFO {
  constructor(init?: TW_EXTIMAGEINFO);
  NumInfos: number;
  Info: unknown /* const array */;
}

declare class TW_TWUNKDSENTRYRETURN {
  constructor(init?: TW_TWUNKDSENTRYRETURN);
  returnCode: number;
  conditionCode: number;
  pDataSize: number;
}

declare class TW_USERINTERFACE {
  constructor(init?: TW_USERINTERFACE);
  ShowUI: number;
  ModalUI: number;
  hParent: interop.Pointer;
}

declare class TW_SETUPMEMXFER {
  constructor(init?: TW_SETUPMEMXFER);
  MinBufSize: number;
  MaxBufSize: number;
  Preferred: number;
}

declare class TW_SETUPFILEXFER2 {
  constructor(init?: TW_SETUPFILEXFER2);
  FileName: string | null;
  FileNameType: number;
  Format: number;
  VRefNum: number;
  ParID: number;
}

declare class TW_PALETTE8 {
  constructor(init?: TW_PALETTE8);
  NumColors: number;
  PaletteType: number;
  Colors: unknown /* const array */;
}

declare class TW_JPEGCOMPRESSION {
  constructor(init?: TW_JPEGCOMPRESSION);
  ColorSpace: number;
  SubSampling: number;
  NumComponents: number;
  RestartFrequency: number;
  QuantMap: unknown /* const array */;
  QuantTable: unknown /* const array */;
  HuffmanMap: unknown /* const array */;
  HuffmanDC: unknown /* const array */;
  HuffmanAC: unknown /* const array */;
}

declare class TW_IMAGEMEMXFER {
  constructor(init?: TW_IMAGEMEMXFER);
  Compression: number;
  BytesPerRow: number;
  Columns: number;
  Rows: number;
  XOffset: number;
  YOffset: number;
  BytesWritten: number;
  Memory: TW_MEMORY;
}

declare class TW_IMAGELAYOUT {
  constructor(init?: TW_IMAGELAYOUT);
  Frame: TW_FRAME;
  DocumentNumber: number;
  PageNumber: number;
  FrameNumber: number;
}

declare class TW_IDENTITY {
  constructor(init?: TW_IDENTITY);
  Id: string | null;
  Version: TW_VERSION;
  ProtocolMajor: number;
  ProtocolMinor: number;
  SupportedGroups: number;
  Manufacturer: unknown /* const array */;
  ProductFamily: unknown /* const array */;
  ProductName: unknown /* const array */;
}

declare class TW_GRAYRESPONSE {
  constructor(init?: TW_GRAYRESPONSE);
  Response: unknown /* const array */;
}

declare class TW_EVENT {
  constructor(init?: TW_EVENT);
  pEvent: string | null;
  TWMessage: number;
}

declare class TW_CAPABILITY {
  constructor(init?: TW_CAPABILITY);
  Cap: number;
  ConType: number;
  hContainer: interop.Pointer;
}

declare class TW_RANGE {
  constructor(init?: TW_RANGE);
  ItemType: number;
  MinValue: number;
  MaxValue: number;
  StepSize: number;
  DefaultValue: number;
  CurrentValue: number;
}

declare class TW_ONEVALUE {
  constructor(init?: TW_ONEVALUE);
  ItemType: number;
  Item: number;
}

declare class TW_ENUMERATION {
  constructor(init?: TW_ENUMERATION);
  ItemType: number;
  NumItems: number;
  CurrentIndex: number;
  DefaultIndex: number;
  ItemList: unknown /* const array */;
}

declare class TW_ARRAY {
  constructor(init?: TW_ARRAY);
  ItemType: number;
  NumItems: number;
  ItemList: unknown /* const array */;
}

declare class TW_VERSION {
  constructor(init?: TW_VERSION);
  MajorNum: number;
  MinorNum: number;
  Language: number;
  Country: number;
  Info: unknown /* const array */;
}

declare class TW_MEMORY {
  constructor(init?: TW_MEMORY);
  Flags: number;
  Length: number;
  TheMem: string | null;
}

declare class TW_ELEMENT8 {
  constructor(init?: TW_ELEMENT8);
  Index: number;
  Channel1: number;
  Channel2: number;
  Channel3: number;
}

declare class TW_CIEPOINT {
  constructor(init?: TW_CIEPOINT);
  X: TW_FIX32;
  Y: TW_FIX32;
  Z: TW_FIX32;
}

declare class TW_FIX32 {
  constructor(init?: TW_FIX32);
  Whole: number;
  Frac: number;
}

declare class TW_IMAGEINFO {
  constructor(init?: TW_IMAGEINFO);
  XResolution: TW_FIX32;
  YResolution: TW_FIX32;
  ImageWidth: number;
  ImageLength: number;
  SamplesPerPixel: number;
  BitsPerSample: unknown /* const array */;
  BitsPerPixel: number;
  Planar: number;
  PixelType: number;
  Compression: number;
}

declare class TW_TWUNKIDENTITY {
  constructor(init?: TW_TWUNKIDENTITY);
  identity: TW_IDENTITY;
  dsPath: unknown /* const array */;
}

declare class TW_DECODEFUNCTION {
  constructor(init?: TW_DECODEFUNCTION);
  StartIn: TW_FIX32;
  BreakIn: TW_FIX32;
  EndIn: TW_FIX32;
  StartOut: TW_FIX32;
  BreakOut: TW_FIX32;
  EndOut: TW_FIX32;
  Gamma: TW_FIX32;
  SampleCount: TW_FIX32;
}

declare class TW_TWUNKDSENTRYPARAMS {
  constructor(init?: TW_TWUNKDSENTRYPARAMS);
  destFlag: number;
  dest: TW_IDENTITY;
  dataGroup: number;
  dataArgType: number;
  message: number;
  pDataSize: number;
}

declare class TW_FRAME {
  constructor(init?: TW_FRAME);
  Left: TW_FIX32;
  Top: TW_FIX32;
  Right: TW_FIX32;
  Bottom: TW_FIX32;
}

declare class TW_SETUPAUDIOFILEXFER {
  constructor(init?: TW_SETUPAUDIOFILEXFER);
  FileName: unknown /* const array */;
  Format: number;
  VRefNum: number;
}

declare class TW_PASSTHRU {
  constructor(init?: TW_PASSTHRU);
  pCommand: string | null;
  CommandBytes: number;
  Direction: number;
  pData: string | null;
  DataBytes: number;
  DataBytesXfered: number;
}

declare class TW_TRANSFORMSTAGE {
  constructor(init?: TW_TRANSFORMSTAGE);
  Decode: unknown /* const array */;
  Mix: unknown /* const array */;
}

declare class TW_SETUPFILEXFER {
  constructor(init?: TW_SETUPFILEXFER);
  FileName: unknown /* const array */;
  Format: number;
  VRefNum: number;
}

declare class TW_CAPEXT {
  constructor(init?: TW_CAPEXT);
  Cap: number;
  Properties: number;
}

declare class TW_CUSTOMDSDATA {
  constructor(init?: TW_CUSTOMDSDATA);
  InfoLength: number;
  hData: interop.Pointer;
}

declare class TW_RGBRESPONSE {
  constructor(init?: TW_RGBRESPONSE);
  Response: unknown /* const array */;
}

declare class TW_AUDIOINFO {
  constructor(init?: TW_AUDIOINFO);
  Name: unknown /* const array */;
  Reserved: number;
}

declare class TW_CIECOLOR {
  constructor(init?: TW_CIECOLOR);
  ColorSpace: number;
  LowEndian: number;
  DeviceDependent: number;
  VersionNumber: number;
  StageABC: TW_TRANSFORMSTAGE;
  StageLMN: TW_TRANSFORMSTAGE;
  WhitePoint: TW_CIEPOINT;
  BlackPoint: TW_CIEPOINT;
  WhitePaper: TW_CIEPOINT;
  BlackInk: TW_CIEPOINT;
  Samples: unknown /* const array */;
}

declare class TW_FILESYSTEM {
  constructor(init?: TW_FILESYSTEM);
  InputName: unknown /* const array */;
  OutputName: unknown /* const array */;
  Context: string | null;
  Recursive: number;
  FileType: number;
  Size: number;
  CreateTimeDate: unknown /* const array */;
  ModifiedTimeDate: unknown /* const array */;
  FreeSpace: number;
  NewImageSize: number;
  NumberOfFiles: number;
  NumberOfSnippets: number;
  DeviceGroupMask: number;
  Reserved: unknown /* const array */;
}

declare class TW_INFO {
  constructor(init?: TW_INFO);
  InfoID: number;
  ItemType: number;
  NumItems: number;
  CondCode: number;
  Item: number;
}

declare class TW_STATUS {
  constructor(init?: TW_STATUS);
  ConditionCode: number;
  Reserved: number;
}

declare class TW_PENDINGXFERS {
  constructor(init?: TW_PENDINGXFERS);
  Count: number;
  TW_JOBCONTROL: unnamed_3104997768750170193;
}

type unnamed_3104997768750170193Descriptor = 
  | { EOJ: number }
  | { Reserved: number };

declare class unnamed_3104997768750170193 {
  constructor(init?: unnamed_3104997768750170193Descriptor);
  EOJ: number;
  Reserved: number;
}

declare function DSM_Entry(pOrigin: interop.PointerConvertible, pDest: interop.PointerConvertible, DG: number, DAT: number, MSG: number, pData: string): number;

declare function DS_Entry(pOrigin: interop.PointerConvertible, DG: number, DAT: number, MSG: number, pData: string): number;


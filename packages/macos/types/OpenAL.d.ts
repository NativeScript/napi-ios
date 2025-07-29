/// <reference types="@nativescript/objc-node-api" />

declare class ALCdevice_struct {
  constructor(init?: ALCdevice_struct);
}

declare class ALCcontext_struct {
  constructor(init?: ALCcontext_struct);
}

declare function alEnable(capability: number): void;

declare function alDisable(capability: number): void;

declare function alIsEnabled(capability: number): number;

declare function alGetString(param: number): string;

declare function alGetBooleanv(param: number, data: string): void;

declare function alGetIntegerv(param: number, data: interop.PointerConvertible): void;

declare function alGetFloatv(param: number, data: interop.PointerConvertible): void;

declare function alGetDoublev(param: number, data: interop.PointerConvertible): void;

declare function alGetBoolean(param: number): number;

declare function alGetInteger(param: number): number;

declare function alGetFloat(param: number): number;

declare function alGetDouble(param: number): number;

declare function alGetError(): number;

declare function alIsExtensionPresent(extname: string): number;

declare function alGetProcAddress(fname: string): interop.Pointer;

declare function alGetEnumValue(ename: string): number;

declare function alListenerf(param: number, value: number): void;

declare function alListener3f(param: number, value1: number, value2: number, value3: number): void;

declare function alListenerfv(param: number, values: interop.PointerConvertible): void;

declare function alListeneri(param: number, value: number): void;

declare function alListener3i(param: number, value1: number, value2: number, value3: number): void;

declare function alListeneriv(param: number, values: interop.PointerConvertible): void;

declare function alGetListenerf(param: number, value: interop.PointerConvertible): void;

declare function alGetListener3f(param: number, value1: interop.PointerConvertible, value2: interop.PointerConvertible, value3: interop.PointerConvertible): void;

declare function alGetListenerfv(param: number, values: interop.PointerConvertible): void;

declare function alGetListeneri(param: number, value: interop.PointerConvertible): void;

declare function alGetListener3i(param: number, value1: interop.PointerConvertible, value2: interop.PointerConvertible, value3: interop.PointerConvertible): void;

declare function alGetListeneriv(param: number, values: interop.PointerConvertible): void;

declare function alGenSources(n: number, sources: interop.PointerConvertible): void;

declare function alDeleteSources(n: number, sources: interop.PointerConvertible): void;

declare function alIsSource(sid: number): number;

declare function alSourcef(sid: number, param: number, value: number): void;

declare function alSource3f(sid: number, param: number, value1: number, value2: number, value3: number): void;

declare function alSourcefv(sid: number, param: number, values: interop.PointerConvertible): void;

declare function alSourcei(sid: number, param: number, value: number): void;

declare function alSource3i(sid: number, param: number, value1: number, value2: number, value3: number): void;

declare function alSourceiv(sid: number, param: number, values: interop.PointerConvertible): void;

declare function alGetSourcef(sid: number, param: number, value: interop.PointerConvertible): void;

declare function alGetSource3f(sid: number, param: number, value1: interop.PointerConvertible, value2: interop.PointerConvertible, value3: interop.PointerConvertible): void;

declare function alGetSourcefv(sid: number, param: number, values: interop.PointerConvertible): void;

declare function alGetSourcei(sid: number, param: number, value: interop.PointerConvertible): void;

declare function alGetSource3i(sid: number, param: number, value1: interop.PointerConvertible, value2: interop.PointerConvertible, value3: interop.PointerConvertible): void;

declare function alGetSourceiv(sid: number, param: number, values: interop.PointerConvertible): void;

declare function alSourcePlayv(ns: number, sids: interop.PointerConvertible): void;

declare function alSourceStopv(ns: number, sids: interop.PointerConvertible): void;

declare function alSourceRewindv(ns: number, sids: interop.PointerConvertible): void;

declare function alSourcePausev(ns: number, sids: interop.PointerConvertible): void;

declare function alSourcePlay(sid: number): void;

declare function alSourceStop(sid: number): void;

declare function alSourceRewind(sid: number): void;

declare function alSourcePause(sid: number): void;

declare function alSourceQueueBuffers(sid: number, numEntries: number, bids: interop.PointerConvertible): void;

declare function alSourceUnqueueBuffers(sid: number, numEntries: number, bids: interop.PointerConvertible): void;

declare function alGenBuffers(n: number, buffers: interop.PointerConvertible): void;

declare function alDeleteBuffers(n: number, buffers: interop.PointerConvertible): void;

declare function alIsBuffer(bid: number): number;

declare function alBufferData(bid: number, format: number, data: interop.PointerConvertible, size: number, freq: number): void;

declare function alBufferf(bid: number, param: number, value: number): void;

declare function alBuffer3f(bid: number, param: number, value1: number, value2: number, value3: number): void;

declare function alBufferfv(bid: number, param: number, values: interop.PointerConvertible): void;

declare function alBufferi(bid: number, param: number, value: number): void;

declare function alBuffer3i(bid: number, param: number, value1: number, value2: number, value3: number): void;

declare function alBufferiv(bid: number, param: number, values: interop.PointerConvertible): void;

declare function alGetBufferf(bid: number, param: number, value: interop.PointerConvertible): void;

declare function alGetBuffer3f(bid: number, param: number, value1: interop.PointerConvertible, value2: interop.PointerConvertible, value3: interop.PointerConvertible): void;

declare function alGetBufferfv(bid: number, param: number, values: interop.PointerConvertible): void;

declare function alGetBufferi(bid: number, param: number, value: interop.PointerConvertible): void;

declare function alGetBuffer3i(bid: number, param: number, value1: interop.PointerConvertible, value2: interop.PointerConvertible, value3: interop.PointerConvertible): void;

declare function alGetBufferiv(bid: number, param: number, values: interop.PointerConvertible): void;

declare function alDopplerFactor(value: number): void;

declare function alDopplerVelocity(value: number): void;

declare function alSpeedOfSound(value: number): void;

declare function alDistanceModel(distanceModel: number): void;

declare function alcCreateContext(device: interop.PointerConvertible, attrlist: interop.PointerConvertible): interop.Pointer;

declare function alcMakeContextCurrent(context: interop.PointerConvertible): number;

declare function alcProcessContext(context: interop.PointerConvertible): void;

declare function alcSuspendContext(context: interop.PointerConvertible): void;

declare function alcDestroyContext(context: interop.PointerConvertible): void;

declare function alcGetCurrentContext(): interop.Pointer;

declare function alcGetContextsDevice(context: interop.PointerConvertible): interop.Pointer;

declare function alcOpenDevice(devicename: string): interop.Pointer;

declare function alcCloseDevice(device: interop.PointerConvertible): number;

declare function alcGetError(device: interop.PointerConvertible): number;

declare function alcIsExtensionPresent(device: interop.PointerConvertible, extname: string): number;

declare function alcGetProcAddress(device: interop.PointerConvertible, funcname: string): interop.Pointer;

declare function alcGetEnumValue(device: interop.PointerConvertible, enumname: string): number;

declare function alcGetString(device: interop.PointerConvertible, param: number): string;

declare function alcGetIntegerv(device: interop.PointerConvertible, param: number, size: number, data: interop.PointerConvertible): void;

declare function alcCaptureOpenDevice(devicename: string, frequency: number, format: number, buffersize: number): interop.Pointer;

declare function alcCaptureCloseDevice(device: interop.PointerConvertible): number;

declare function alcCaptureStart(device: interop.PointerConvertible): void;

declare function alcCaptureStop(device: interop.PointerConvertible): void;

declare function alcCaptureSamples(device: interop.PointerConvertible, buffer: interop.PointerConvertible, samples: number): void;

declare function alutInit(argc: interop.PointerConvertible, argv: interop.PointerConvertible): void;

declare function alutExit(): void;

declare function alutLoadWAVFile(file: string, format: interop.PointerConvertible, data: interop.PointerConvertible, size: interop.PointerConvertible, freq: interop.PointerConvertible): void;

declare function alutLoadWAVMemory(memory: string, format: interop.PointerConvertible, data: interop.PointerConvertible, size: interop.PointerConvertible, freq: interop.PointerConvertible): void;

declare function alutUnloadWAV(format: number, data: interop.PointerConvertible, size: number, freq: number): void;


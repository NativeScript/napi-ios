/// <reference types="@nativescript/objc-node-api" />

declare const kIORegistryIterateRecursively: number;

declare const kOSAsyncRefSize: number;

declare const kOSAsyncRefCount: number;

declare const kOSAsyncRef64Count: number;

declare const kIOInterestCalloutRefconIndex: number;

declare const kIOMatchingCalloutCount: number;

declare const kMaxAsyncArgs: number;

declare const kOSNotificationMessageID: number;

declare const kIOKitNoticationMsgSizeMask: number;

declare const kIOAsyncCompletionNotificationType: number;

declare const kIOServicePublishNotificationType: number;

declare const kIOSystemStateSleepDescriptionHibernateStateHibernating: number;

declare const kSecondScale: number;

declare const kMicrosecondScale: number;

declare const kNanosecondScale: number;

declare const kIOMapGuardedSmall: number;

declare const kIOMapGuardedMask: number;

declare const kIOMapPostedCombinedReordered: number;

declare const kIOMapPostedReordered: number;

declare const kIOMatchingCalloutFuncIndex: number;

declare const kIOMapRealTimeCache: number;

declare const kIOMapPostedWrite: number;

declare const kIOMapWriteCombineCache: number;

declare const kIOServiceInteractionAllowed: number;

declare const kIOMapInhibitCache: number;

declare const kIOMapCacheShift: number;

declare const kIOMapAnywhere: number;

declare const kIOPostedReordered: number;

declare const kIORealTimeCache: number;

declare const kIOInhibitCache: number;

declare const kIOSystemStateSleepDescriptionHibernateStateInactive: number;

declare const kIOMapPrefault: number;

declare const kIOMapCopybackInnerCache: number;

declare const kIOAsyncReservedCount: number;

declare const kIOMapWriteThruCache: number;

declare const kIOKitNoticationTypeSizeAdjShift: number;

declare const kIOMapDefaultCache: number;

declare const kIOSystemStateSleepDescriptionHibernateStateWakingFromHibernate: number;

declare const kIOMapUnique: number;

declare const kIOServiceTerminatedNotificationType: number;

declare const kIOInterestCalloutServiceIndex: number;

declare const kFirstIOKitNotificationType: number;

declare const kIOAsyncReservedIndex: number;

declare const kIOMaxBusStall5usec: number;

declare const kIOMaxBusStallNone: number;

declare const kIOMatchingCalloutRefconIndex: number;

declare const kIOAsyncCalloutRefconIndex: number;

declare const kIOCopybackInnerCache: number;

declare const kIOWriteCombineCache: number;

declare const kIODefaultMemoryType: number;

declare const kIOPostedWrite: number;

declare const kOSAsyncRef64Size: number;

declare const kOSAsyncCompleteMessageID: number;

declare const kIOServiceMessageNotificationType: number;

declare const kIOCFSerializeToBinary: number;

declare const kIOMapOverwrite: number;

declare const kLastIOKitNotificationType: number;

declare const kIODefaultCache: number;

declare const kIOMapUserOptionsMask: number;

declare const kIORegistryIterateParents: number;

declare const kIOInterestCalloutCount: number;

declare const kTickScale: number;

declare const kIOMaxBusStall40usec: number;

declare const kIOMapReference: number;

declare const kIOMapStatic: number;

declare const kIOWriteThruCache: number;

declare const kIOServiceMatchedNotificationType: number;

declare const kIOMaxBusStall25usec: number;

declare const kIOMapReadOnly: number;

declare const kIOMapGuardedLarge: number;

declare const kIOMainPortDefault: number;

declare const kIOConnectMethodVarOutputSize: number;

declare const kIOInterestCalloutFuncIndex: number;

declare const kIOMapCopybackCache: number;

declare const kIOMaxBusStall30usec: number;

declare const kIOCopybackCache: number;

declare const kIOAsyncCalloutCount: number;

declare const kIOKitNoticationTypeMask: number;

declare const kMillisecondScale: number;

declare const kIOMaxBusStall20usec: number;

declare const kIOPostedCombinedReordered: number;

declare const kIOMaxBusStall10usec: number;

declare const kIOAsyncCalloutFuncIndex: number;

declare const kIOMapCacheMask: number;

declare class IOServiceInterestContent64 {
  constructor(init?: IOServiceInterestContent64);
  messageType: number;
  messageArgument: unknown /* const array */;
}

declare class _IODataQueueAppendix {
  constructor(init?: _IODataQueueAppendix);
  version: number;
  msgh: mach_msg_header_t;
}

declare class _IODataQueueMemory {
  constructor(init?: _IODataQueueMemory);
  queueSize: number;
  head: number;
  tail: number;
  queue: unknown /* const array */;
}

declare class IOVirtualRange {
  constructor(init?: IOVirtualRange);
  address: number;
  length: number;
}

declare class IOPhysicalRange {
  constructor(init?: IOPhysicalRange);
  address: number;
  length: number;
}

declare class OSNotificationHeader64 {
  constructor(init?: OSNotificationHeader64);
  size: number;
  type: number;
  reference: unknown /* const array */;
  content: interop.Pointer;
}

declare class IOServiceInterestContent {
  constructor(init?: IOServiceInterestContent);
  messageType: number;
  messageArgument: unknown /* const array */;
}

declare class IONotificationPort {
  constructor(init?: IONotificationPort);
}

declare class IONamedValue {
  constructor(init?: IONamedValue);
  value: number;
  name: string | null;
}

declare class IOAsyncCompletionContent {
  constructor(init?: IOAsyncCompletionContent);
  result: number;
  args: interop.Pointer;
}

declare class _IODataQueueEntry {
  constructor(init?: _IODataQueueEntry);
  size: number;
  data: unknown /* const array */;
}

declare class OSNotificationHeader {
  constructor(init?: OSNotificationHeader);
  size: number;
  type: number;
  reference: unknown /* const array */;
  content: interop.Pointer;
}

declare function IODataQueueDataAvailable(dataQueue: interop.PointerConvertible): number;

declare function IODataQueuePeek(dataQueue: interop.PointerConvertible): interop.Pointer;

declare function IODataQueueDequeue(dataQueue: interop.PointerConvertible, data: interop.PointerConvertible, dataSize: interop.PointerConvertible): number;

declare function IODataQueueWaitForAvailableData(dataQueue: interop.PointerConvertible, notificationPort: number): number;

declare function IODataQueueAllocateNotificationPort(): number;

declare function IODataQueueEnqueue(dataQueue: interop.PointerConvertible, data: interop.PointerConvertible, dataSize: number): number;

declare function IODataQueueSetNotificationPort(dataQueue: interop.PointerConvertible, notifyPort: number): number;

declare function IOCFUnserialize(buffer: string, allocator: interop.Object, options: number, errorString: interop.PointerConvertible): interop.Object;

declare function IOCFUnserializeBinary(buffer: string, bufferSize: number, allocator: interop.Object, options: number, errorString: interop.PointerConvertible): interop.Object;

declare function IOCFUnserializeWithSize(buffer: string, bufferSize: number, allocator: interop.Object, options: number, errorString: interop.PointerConvertible): interop.Object;

declare function IOCFSerialize(object: interop.Object, options: number): interop.Object;

declare function IOMainPort(bootstrapPort: number, mainPort: interop.PointerConvertible): number;

declare function IONotificationPortCreate(mainPort: number): interop.Pointer;

declare function IONotificationPortDestroy(notify: interop.PointerConvertible): void;

declare function IONotificationPortGetRunLoopSource(notify: interop.PointerConvertible): interop.Object;

declare function IONotificationPortGetMachPort(notify: interop.PointerConvertible): number;

declare function IONotificationPortSetImportanceReceiver(notify: interop.PointerConvertible): number;

declare function IONotificationPortSetDispatchQueue(notify: interop.PointerConvertible, queue: NSObject): void;

declare function IODispatchCalloutFromMessage(unused: interop.PointerConvertible, msg: interop.PointerConvertible, reference: interop.PointerConvertible): void;

declare function IOCreateReceivePort(msgType: number, recvPort: interop.PointerConvertible): number;

declare function IOObjectRelease(object: number): number;

declare function IOObjectRetain(object: number): number;

declare function IOObjectGetClass(object: number, className: unknown /* const array */): number;

declare function IOObjectCopyClass(object: number): interop.Object;

declare function IOObjectCopySuperclassForClass(classname: interop.Object): interop.Object;

declare function IOObjectCopyBundleIdentifierForClass(classname: interop.Object): interop.Object;

declare function IOObjectConformsTo(object: number, className: unknown /* const array */): number;

declare function IOObjectIsEqualTo(object: number, anObject: number): number;

declare function IOObjectGetKernelRetainCount(object: number): number;

declare function IOObjectGetUserRetainCount(object: number): number;

declare function IOObjectGetRetainCount(object: number): number;

declare function IOIteratorNext(iterator: number): number;

declare function IOIteratorReset(iterator: number): void;

declare function IOIteratorIsValid(iterator: number): number;

declare function IOServiceGetMatchingService(mainPort: number, matching: interop.Object): number;

declare function IOServiceGetMatchingServices(mainPort: number, matching: interop.Object, existing: interop.PointerConvertible): number;

declare function IOServiceAddMatchingNotification(notifyPort: interop.PointerConvertible, notificationType: unknown /* const array */, matching: interop.Object, callback: (p1: interop.PointerConvertible, p2: number) => void, refCon: interop.PointerConvertible, notification: interop.PointerConvertible): number;

declare function IOServiceAddInterestNotification(notifyPort: interop.PointerConvertible, service: number, interestType: unknown /* const array */, callback: (p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible) => void, refCon: interop.PointerConvertible, notification: interop.PointerConvertible): number;

declare function IOServiceMatchPropertyTable(service: number, matching: interop.Object, matches: interop.PointerConvertible): number;

declare function IOServiceGetBusyState(service: number, busyState: interop.PointerConvertible): number;

declare function IOServiceWaitQuiet(service: number, waitTime: interop.PointerConvertible): number;

declare function IOKitGetBusyState(mainPort: number, busyState: interop.PointerConvertible): number;

declare function IOKitWaitQuiet(mainPort: number, waitTime: interop.PointerConvertible): number;

declare function IOServiceOpen(service: number, owningTask: number, type: number, connect: interop.PointerConvertible): number;

declare function IOServiceClose(connect: number): number;

declare function IOConnectAddRef(connect: number): number;

declare function IOConnectRelease(connect: number): number;

declare function IOConnectGetService(connect: number, service: interop.PointerConvertible): number;

declare function IOConnectSetNotificationPort(connect: number, type: number, port: number, reference: number): number;

declare function IOConnectMapMemory(connect: number, memoryType: number, intoTask: number, atAddress: interop.PointerConvertible, ofSize: interop.PointerConvertible, options: number): number;

declare function IOConnectMapMemory64(connect: number, memoryType: number, intoTask: number, atAddress: interop.PointerConvertible, ofSize: interop.PointerConvertible, options: number): number;

declare function IOConnectUnmapMemory(connect: number, memoryType: number, fromTask: number, atAddress: number): number;

declare function IOConnectUnmapMemory64(connect: number, memoryType: number, fromTask: number, atAddress: number): number;

declare function IOConnectCallMethod(connection: number, selector: number, input: interop.PointerConvertible, inputCnt: number, inputStruct: interop.PointerConvertible, inputStructCnt: number, output: interop.PointerConvertible, outputCnt: interop.PointerConvertible, outputStruct: interop.PointerConvertible, outputStructCnt: interop.PointerConvertible): number;

declare function IOConnectCallAsyncMethod(connection: number, selector: number, wake_port: number, reference: interop.PointerConvertible, referenceCnt: number, input: interop.PointerConvertible, inputCnt: number, inputStruct: interop.PointerConvertible, inputStructCnt: number, output: interop.PointerConvertible, outputCnt: interop.PointerConvertible, outputStruct: interop.PointerConvertible, outputStructCnt: interop.PointerConvertible): number;

declare function IOConnectCallStructMethod(connection: number, selector: number, inputStruct: interop.PointerConvertible, inputStructCnt: number, outputStruct: interop.PointerConvertible, outputStructCnt: interop.PointerConvertible): number;

declare function IOConnectCallAsyncStructMethod(connection: number, selector: number, wake_port: number, reference: interop.PointerConvertible, referenceCnt: number, inputStruct: interop.PointerConvertible, inputStructCnt: number, outputStruct: interop.PointerConvertible, outputStructCnt: interop.PointerConvertible): number;

declare function IOConnectCallScalarMethod(connection: number, selector: number, input: interop.PointerConvertible, inputCnt: number, output: interop.PointerConvertible, outputCnt: interop.PointerConvertible): number;

declare function IOConnectCallAsyncScalarMethod(connection: number, selector: number, wake_port: number, reference: interop.PointerConvertible, referenceCnt: number, input: interop.PointerConvertible, inputCnt: number, output: interop.PointerConvertible, outputCnt: interop.PointerConvertible): number;

declare function IORegistryGetRootEntry(mainPort: number): number;

declare function IORegistryEntryFromPath(mainPort: number, path: unknown /* const array */): number;

declare function IORegistryEntryCopyFromPath(mainPort: number, path: interop.Object): number;

declare function IORegistryCreateIterator(mainPort: number, plane: unknown /* const array */, options: number, iterator: interop.PointerConvertible): number;

declare function IORegistryEntryCreateIterator(entry: number, plane: unknown /* const array */, options: number, iterator: interop.PointerConvertible): number;

declare function IORegistryIteratorEnterEntry(iterator: number): number;

declare function IORegistryIteratorExitEntry(iterator: number): number;

declare function IORegistryEntryGetName(entry: number, name: unknown /* const array */): number;

declare function IORegistryEntryGetNameInPlane(entry: number, plane: unknown /* const array */, name: unknown /* const array */): number;

declare function IORegistryEntryGetLocationInPlane(entry: number, plane: unknown /* const array */, location: unknown /* const array */): number;

declare function IORegistryEntryGetPath(entry: number, plane: unknown /* const array */, path: unknown /* const array */): number;

declare function IORegistryEntryCopyPath(entry: number, plane: unknown /* const array */): interop.Object;

declare function IORegistryEntryGetRegistryEntryID(entry: number, entryID: interop.PointerConvertible): number;

declare function IORegistryEntryCreateCFProperties(entry: number, properties: interop.PointerConvertible, allocator: interop.Object, options: number): number;

declare function IORegistryEntryCreateCFProperty(entry: number, key: interop.Object, allocator: interop.Object, options: number): interop.Object;

declare function IORegistryEntrySearchCFProperty(entry: number, plane: unknown /* const array */, key: interop.Object, allocator: interop.Object, options: number): interop.Object;

declare function IORegistryEntryGetChildIterator(entry: number, plane: unknown /* const array */, iterator: interop.PointerConvertible): number;

declare function IORegistryEntryGetChildEntry(entry: number, plane: unknown /* const array */, child: interop.PointerConvertible): number;

declare function IORegistryEntryGetParentIterator(entry: number, plane: unknown /* const array */, iterator: interop.PointerConvertible): number;

declare function IORegistryEntryGetParentEntry(entry: number, plane: unknown /* const array */, parent: interop.PointerConvertible): number;

declare function IORegistryEntryInPlane(entry: number, plane: unknown /* const array */): number;

declare function IOServiceMatching(name: string): interop.Object;

declare function IOServiceNameMatching(name: string): interop.Object;

declare function IOBSDNameMatching(mainPort: number, options: number, bsdName: string): interop.Object;

declare function IORegistryEntryIDMatching(entryID: number): interop.Object;


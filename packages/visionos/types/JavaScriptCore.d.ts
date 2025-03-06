/// <reference types="@nativescript/objc-node-api" />

declare const JSPropertyDescriptorSetKey: string;

declare const JSPropertyDescriptorGetKey: string;

declare const kJSClassDefinitionEmpty: JSClassDefinition;

declare const kJSClassAttributeNone: number;

declare const kJSPropertyAttributeDontDelete: number;

declare const kJSPropertyAttributeDontEnum: number;

declare const kJSPropertyAttributeReadOnly: number;

declare const JSPropertyDescriptorValueKey: string;

declare const JSPropertyDescriptorEnumerableKey: string;

declare const JSPropertyDescriptorWritableKey: string;

declare const JSPropertyDescriptorConfigurableKey: string;

declare const kJSPropertyAttributeNone: number;

declare const kJSClassAttributeNoAutomaticPrototype: number;

declare const JSTypedArrayType: {
  Int8Array: 0,
  Int16Array: 1,
  Int32Array: 2,
  Uint8Array: 3,
  Uint8ClampedArray: 4,
  Uint16Array: 5,
  Uint32Array: 6,
  Float32Array: 7,
  Float64Array: 8,
  ArrayBuffer: 9,
  None: 10,
  BigInt64Array: 11,
  BigUint64Array: 12,
};

declare const JSType: {
  Undefined: 0,
  Null: 1,
  Boolean: 2,
  Number: 3,
  String: 4,
  Object: 5,
};

declare class JSStaticFunction {
  constructor(init?: JSStaticFunction);
  name: string | null;
  callAsFunction: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible) => interop.Pointer | null;
  attributes: number;
}

declare class OpaqueJSValue {
  constructor(init?: OpaqueJSValue);
}

declare class OpaqueJSPropertyNameAccumulator {
  constructor(init?: OpaqueJSPropertyNameAccumulator);
}

declare class OpaqueJSPropertyNameArray {
  constructor(init?: OpaqueJSPropertyNameArray);
}

declare class OpaqueJSClass {
  constructor(init?: OpaqueJSClass);
}

declare class OpaqueJSString {
  constructor(init?: OpaqueJSString);
}

declare class OpaqueJSContext {
  constructor(init?: OpaqueJSContext);
}

declare class OpaqueJSContextGroup {
  constructor(init?: OpaqueJSContextGroup);
}

declare class JSStaticValue {
  constructor(init?: JSStaticValue);
  name: string | null;
  getProperty: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => interop.Pointer | null;
  setProperty: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => boolean | null;
  attributes: number;
}

declare class JSClassDefinition {
  constructor(init?: JSClassDefinition);
  version: number;
  attributes: number;
  className: string | null;
  parentClass: interop.Pointer;
  staticValues: interop.Pointer;
  staticFunctions: interop.Pointer;
  initialize: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void | null;
  finalize: (p1: interop.PointerConvertible) => void | null;
  hasProperty: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => boolean | null;
  getProperty: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => interop.Pointer | null;
  setProperty: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => boolean | null;
  deleteProperty: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => boolean | null;
  getPropertyNames: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible) => void | null;
  callAsFunction: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible) => interop.Pointer | null;
  callAsConstructor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => interop.Pointer | null;
  hasInstance: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => boolean | null;
  convertToType: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.Enum<typeof JSType>, p4: interop.PointerConvertible) => interop.Pointer | null;
}

declare function JSEvaluateScript(ctx: interop.PointerConvertible, script: interop.PointerConvertible, thisObject: interop.PointerConvertible, sourceURL: interop.PointerConvertible, startingLineNumber: number, exception: interop.PointerConvertible): interop.Pointer;

declare function JSCheckScriptSyntax(ctx: interop.PointerConvertible, script: interop.PointerConvertible, sourceURL: interop.PointerConvertible, startingLineNumber: number, exception: interop.PointerConvertible): boolean;

declare function JSGarbageCollect(ctx: interop.PointerConvertible): void;

declare function JSValueGetType(ctx: interop.PointerConvertible, value: interop.PointerConvertible): interop.Enum<typeof JSType>;

declare function JSValueIsUndefined(ctx: interop.PointerConvertible, value: interop.PointerConvertible): boolean;

declare function JSValueIsNull(ctx: interop.PointerConvertible, value: interop.PointerConvertible): boolean;

declare function JSValueIsBoolean(ctx: interop.PointerConvertible, value: interop.PointerConvertible): boolean;

declare function JSValueIsNumber(ctx: interop.PointerConvertible, value: interop.PointerConvertible): boolean;

declare function JSValueIsString(ctx: interop.PointerConvertible, value: interop.PointerConvertible): boolean;

declare function JSValueIsObject(ctx: interop.PointerConvertible, value: interop.PointerConvertible): boolean;

declare function JSValueIsObjectOfClass(ctx: interop.PointerConvertible, value: interop.PointerConvertible, jsClass: interop.PointerConvertible): boolean;

declare function JSValueIsEqual(ctx: interop.PointerConvertible, a: interop.PointerConvertible, b: interop.PointerConvertible, exception: interop.PointerConvertible): boolean;

declare function JSValueIsStrictEqual(ctx: interop.PointerConvertible, a: interop.PointerConvertible, b: interop.PointerConvertible): boolean;

declare function JSValueIsInstanceOfConstructor(ctx: interop.PointerConvertible, value: interop.PointerConvertible, constructor: interop.PointerConvertible, exception: interop.PointerConvertible): boolean;

declare function JSValueMakeUndefined(ctx: interop.PointerConvertible): interop.Pointer;

declare function JSValueMakeNull(ctx: interop.PointerConvertible): interop.Pointer;

declare function JSValueMakeBoolean(ctx: interop.PointerConvertible, boolean: boolean): interop.Pointer;

declare function JSValueMakeNumber(ctx: interop.PointerConvertible, number: number): interop.Pointer;

declare function JSValueMakeString(ctx: interop.PointerConvertible, string: interop.PointerConvertible): interop.Pointer;

declare function JSValueToBoolean(ctx: interop.PointerConvertible, value: interop.PointerConvertible): boolean;

declare function JSValueToNumber(ctx: interop.PointerConvertible, value: interop.PointerConvertible, exception: interop.PointerConvertible): number;

declare function JSValueToStringCopy(ctx: interop.PointerConvertible, value: interop.PointerConvertible, exception: interop.PointerConvertible): interop.Pointer;

declare function JSValueToObject(ctx: interop.PointerConvertible, value: interop.PointerConvertible, exception: interop.PointerConvertible): interop.Pointer;

declare function JSValueProtect(ctx: interop.PointerConvertible, value: interop.PointerConvertible): void;

declare function JSValueUnprotect(ctx: interop.PointerConvertible, value: interop.PointerConvertible): void;

declare function JSClassCreate(definition: interop.PointerConvertible): interop.Pointer;

declare function JSClassRetain(jsClass: interop.PointerConvertible): interop.Pointer;

declare function JSClassRelease(jsClass: interop.PointerConvertible): void;

declare function JSObjectMake(ctx: interop.PointerConvertible, jsClass: interop.PointerConvertible, data: interop.PointerConvertible): interop.Pointer;

declare function JSObjectMakeFunctionWithCallback(ctx: interop.PointerConvertible, name: interop.PointerConvertible, callAsFunction: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible) => interop.Pointer): interop.Pointer;

declare function JSObjectMakeConstructor(ctx: interop.PointerConvertible, jsClass: interop.PointerConvertible, callAsConstructor: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible) => interop.Pointer): interop.Pointer;

declare function JSObjectMakeFunction(ctx: interop.PointerConvertible, name: interop.PointerConvertible, parameterCount: number, parameterNames: interop.Pointer, body: interop.PointerConvertible, sourceURL: interop.PointerConvertible, startingLineNumber: number, exception: interop.PointerConvertible): interop.Pointer;

declare function JSObjectGetPrototype(ctx: interop.PointerConvertible, object: interop.PointerConvertible): interop.Pointer;

declare function JSObjectSetPrototype(ctx: interop.PointerConvertible, object: interop.PointerConvertible, value: interop.PointerConvertible): void;

declare function JSObjectHasProperty(ctx: interop.PointerConvertible, object: interop.PointerConvertible, propertyName: interop.PointerConvertible): boolean;

declare function JSObjectGetProperty(ctx: interop.PointerConvertible, object: interop.PointerConvertible, propertyName: interop.PointerConvertible, exception: interop.PointerConvertible): interop.Pointer;

declare function JSObjectSetProperty(ctx: interop.PointerConvertible, object: interop.PointerConvertible, propertyName: interop.PointerConvertible, value: interop.PointerConvertible, attributes: number, exception: interop.PointerConvertible): void;

declare function JSObjectDeleteProperty(ctx: interop.PointerConvertible, object: interop.PointerConvertible, propertyName: interop.PointerConvertible, exception: interop.PointerConvertible): boolean;

declare function JSObjectGetPropertyAtIndex(ctx: interop.PointerConvertible, object: interop.PointerConvertible, propertyIndex: number, exception: interop.PointerConvertible): interop.Pointer;

declare function JSObjectSetPropertyAtIndex(ctx: interop.PointerConvertible, object: interop.PointerConvertible, propertyIndex: number, value: interop.PointerConvertible, exception: interop.PointerConvertible): void;

declare function JSObjectGetPrivate(object: interop.PointerConvertible): interop.Pointer;

declare function JSObjectSetPrivate(object: interop.PointerConvertible, data: interop.PointerConvertible): boolean;

declare function JSObjectIsFunction(ctx: interop.PointerConvertible, object: interop.PointerConvertible): boolean;

declare function JSObjectCallAsFunction(ctx: interop.PointerConvertible, object: interop.PointerConvertible, thisObject: interop.PointerConvertible, argumentCount: number, arguments$: interop.Pointer, exception: interop.PointerConvertible): interop.Pointer;

declare function JSObjectIsConstructor(ctx: interop.PointerConvertible, object: interop.PointerConvertible): boolean;

declare function JSObjectCallAsConstructor(ctx: interop.PointerConvertible, object: interop.PointerConvertible, argumentCount: number, arguments$: interop.Pointer, exception: interop.PointerConvertible): interop.Pointer;

declare function JSObjectCopyPropertyNames(ctx: interop.PointerConvertible, object: interop.PointerConvertible): interop.Pointer;

declare function JSPropertyNameArrayRetain(array: interop.PointerConvertible): interop.Pointer;

declare function JSPropertyNameArrayRelease(array: interop.PointerConvertible): void;

declare function JSPropertyNameArrayGetCount(array: interop.PointerConvertible): number;

declare function JSPropertyNameArrayGetNameAtIndex(array: interop.PointerConvertible, index: number): interop.Pointer;

declare function JSPropertyNameAccumulatorAddName(accumulator: interop.PointerConvertible, propertyName: interop.PointerConvertible): void;

declare function JSGlobalContextRetain(ctx: interop.PointerConvertible): interop.Pointer;

declare function JSGlobalContextRelease(ctx: interop.PointerConvertible): void;

declare function JSContextGetGlobalObject(ctx: interop.PointerConvertible): interop.Pointer;

declare function JSStringCreateWithCharacters(chars: interop.PointerConvertible, numChars: number): interop.Pointer;

declare function JSStringCreateWithUTF8CString(string: string): interop.Pointer;

declare function JSStringRetain(string: interop.PointerConvertible): interop.Pointer;

declare function JSStringRelease(string: interop.PointerConvertible): void;

declare function JSStringGetLength(string: interop.PointerConvertible): number;

declare function JSStringGetCharactersPtr(string: interop.PointerConvertible): interop.Pointer;

declare function JSStringGetMaximumUTF8CStringSize(string: interop.PointerConvertible): number;

declare function JSStringGetUTF8CString(string: interop.PointerConvertible, buffer: string, bufferSize: number): number;

declare function JSStringIsEqual(a: interop.PointerConvertible, b: interop.PointerConvertible): boolean;

declare function JSStringIsEqualToUTF8CString(a: interop.PointerConvertible, b: string): boolean;

declare function JSStringCreateWithCFString(string: interop.PointerConvertible): interop.Pointer;

declare function JSStringCopyCFString(alloc: interop.PointerConvertible, string: interop.PointerConvertible): interop.Pointer;

declare interface JSExport {
}

declare class JSExport extends NativeObject implements JSExport {
}


import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import NativeScript from '@nativescript/react-native';
import NativeScriptNativeApi from '@nativescript/react-native/src/NativeScriptNativeApi';

type TestCase = {
  name: string;
  run: () => void | Promise<void>;
};

type TestResult = {
  name: string;
  status: 'pass' | 'fail';
  error?: string;
};

const marker = 'NATIVESCRIPT_RN_FFI_COMPAT';
let currentStep = 'startup';
let lastGlobalAccess = '';

function g(name: string): any {
  lastGlobalAccess = name;
  return (globalThis as Record<string, any>)[name];
}

function step<T>(name: string, callback: () => T): T {
  currentStep = name;
  return callback();
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function assertEqual<T>(actual: T, expected: T, message: string) {
  if (!Object.is(actual, expected)) {
    throw new Error(`${message}: expected ${String(expected)}, got ${String(actual)}`);
  }
}

function assertClose(actual: number, expected: number, message: string) {
  if (Math.abs(actual - expected) > 0.0001) {
    throw new Error(`${message}: expected ${expected}, got ${actual}`);
  }
}

function ptrNumber(value: any): number {
  assert(value && typeof value.toNumber === 'function', 'expected Pointer value');
  return value.toNumber();
}

function sameNativeHandle(a: any, b: any): boolean {
  const interop = g('interop');
  return ptrNumber(interop.handleof(a)) === ptrNumber(interop.handleof(b));
}

function writeMarker(payload: unknown) {
  const content = JSON.stringify(payload, null, 2);
  const writer = (NativeScriptNativeApi as any).__writeTestMarker;
  if (typeof writer === 'function') {
    writer(content);
  }
  console.log(`${marker} ${content}`);
}

function buildTests(): TestCase[] {
  return [
    {
      name: 'installs metadata-backed globals for classes, functions, constants, enums, protocols, and structs',
      run() {
        const api = g('__nativeScriptNativeApi');
        assert(api, 'Native API host object was not installed');
        assertEqual(api.runtime, 'jsi', 'runtime kind');
        assertEqual(api.backend, 'hermes', 'runtime backend');
        assert(api.metadata.classes > 0, 'class metadata should be loaded');
        assert(api.metadata.functions > 0, 'function metadata should be loaded');
        assert(api.metadata.constants > 0, 'constant metadata should be loaded');
        assert(api.metadata.enums > 0, 'enum metadata should be loaded');
        assert(api.metadata.protocols > 0, 'protocol metadata should be loaded');
        assert(api.metadata.structs > 0, 'struct metadata should be loaded');

        assert(typeof g('NSObject').alloc === 'function', 'NSObject global missing');
        assert(typeof g('CGRectGetWidth') === 'function', 'CGRectGetWidth global missing');
        assert(typeof g('CGRect') === 'function', 'CGRect struct global missing');
        assert(g('NSObjectProtocol'), 'NSObjectProtocol global missing');
        assertEqual(g('NSURLErrorTimedOut'), -1001, 'NSURLErrorTimedOut constant');
        assertEqual(g('NSComparisonResult').Same, 0, 'NSComparisonResult enum');
        assertEqual(g('UIUserInterfaceStyle').Dark, 2, 'UIUserInterfaceStyle enum');
      },
    },
    {
      name: 'dispatches Objective-C methods and properties with NativeScript-style calls',
      run() {
        const object = step('NSObject.alloc.init', () => g('NSObject').alloc().init());
        step('NSObject.respondsToSelector', () =>
          assert(object.respondsToSelector('init'), 'respondsToSelector failed'),
        );
        step('NSObject.isKindOfClass', () =>
          assert(object.isKindOfClass(g('NSObject')), 'isKindOfClass failed'),
        );
        step('NSObject.class', () =>
          assert(sameNativeHandle(object.class(), g('NSObject')), 'class() returned unexpected class'),
        );

        const array = step('NSMutableArray.alloc.init', () =>
          g('NSMutableArray').alloc().init(),
        );
        step('NSMutableArray.addObject alpha', () => array.addObject('alpha'));
        step('NSMutableArray.addObject beta', () => array.addObject('beta'));
        step('NSMutableArray.count', () => assertEqual(array.count, 2, 'NSMutableArray count'));
        step('NSMutableArray.objectAtIndex', () =>
          assertEqual(array.objectAtIndex(1), 'beta', 'NSMutableArray objectAtIndex'),
        );
      },
    },
    {
      name: 'marshals JavaScript arrays, objects, strings, and typed arrays into Foundation values',
      run() {
        const nsArray = g('NSArray').arrayWithArray(['a', 'b']);
        assertEqual(nsArray.count, 2, 'NSArray arrayWithArray count');
        assertEqual(nsArray.objectAtIndex(0), 'a', 'NSArray first value');

        const nsDict = g('NSDictionary').dictionaryWithDictionary({
          answer: 42,
          label: 'native',
        });
        assertEqual(nsDict.objectForKey('answer'), 42, 'NSDictionary numeric value');
        assertEqual(nsDict.objectForKey('label'), 'native', 'NSDictionary string value');

        const bytes = new Uint8Array([65, 66, 67, 0]);
        const data = g('NSData').dataWithBytesLength(bytes, bytes.byteLength);
        const roundTrip = new Uint8Array(g('interop').bufferFromData(data));
        assertEqual(roundTrip[0], 65, 'NSData byte 0');
        assertEqual(roundTrip[1], 66, 'NSData byte 1');
        assertEqual(roundTrip[2], 67, 'NSData byte 2');
      },
    },
    {
      name: 'marshals structs by constructor, fields, nested mutation, and C function calls',
      run() {
        const point = new (g('CGPoint'))({x: 10, y: 20});
        assertEqual(point.x, 10, 'CGPoint.x');
        assertEqual(point.y, 20, 'CGPoint.y');

        const rect = new (g('CGRect'))({
          origin: {x: 1, y: 2},
          size: {width: 30, height: 40},
        });
        assertEqual(rect.origin.x, 1, 'CGRect.origin.x');
        assertEqual(rect.origin.y, 2, 'CGRect.origin.y');
        assertEqual(rect.size.width, 30, 'CGRect.size.width');
        assertEqual(rect.size.height, 40, 'CGRect.size.height');

        rect.origin.y = 25;
        rect.size.height = 45;
        assertEqual(rect.origin.y, 25, 'nested CGRect origin mutation');
        assertEqual(rect.size.height, 45, 'nested CGRect size mutation');

        const literal = new (g('CGRect'))({
          origin: {x: 3, y: 4},
          size: {width: 50, height: 60},
        });
        assert(g('CGRectContainsPoint')(literal, {x: 10, y: 10}), 'CGRectContainsPoint literal');
        assertClose(g('CGRectGetWidth')(literal), 50, 'CGRectGetWidth');
      },
    },
    {
      name: 'supports NativeScript pointer and reference semantics',
      run() {
        const interop = g('interop');
        assertEqual(
          interop.sizeof(interop.Pointer),
          interop.sizeof(interop.types.pointer),
          'interop.Pointer sizeof',
        );

        const pointer = interop.alloc(4 * interop.sizeof(interop.types.int32));
        try {
          const ref = new interop.Reference(interop.types.int32, pointer);
          ref[0] = 123;
          ref[1] = 456;
          assertEqual(ref[0], 123, 'Reference index 0');
          assertEqual(ref[1], 456, 'Reference index 1');
          assertEqual(ptrNumber(interop.handleof(ref)), ptrNumber(pointer), 'Reference handle');

          const lazy = new interop.Reference(7);
          assertEqual(lazy.value, 7, 'lazy Reference initial value');
          lazy.value = 9;
          assertEqual(lazy.value, 9, 'lazy Reference assigned value');
        } finally {
          interop.free(pointer);
        }
      },
    },
    {
      name: 'supports C strings through interop.handleof and stringFromCString',
      run() {
        const interop = g('interop');
        const ptr = interop.handleof('hello');
        assertEqual(interop.stringFromCString(ptr), 'hello', 'stringFromCString');
        assertEqual(interop.stringFromCString(ptr, 2), 'he', 'stringFromCString length');
      },
    },
    {
      name: 'wraps protocol values with stable native handles',
      run() {
        const interop = g('interop');
        const nsObjectProtocol = g('NSObjectProtocol');
        const lookup = g('NSProtocolFromString')('NSObject');
        assert(nsObjectProtocol, 'NSObjectProtocol global missing');
        assert(lookup, 'NSProtocolFromString returned null');
        assertEqual(
          ptrNumber(interop.handleof(lookup)),
          ptrNumber(interop.handleof(nsObjectProtocol)),
          'protocol handle round trip',
        );
        assert(g('NSObject').conformsToProtocol(nsObjectProtocol), 'NSObject protocol conformance');
      },
    },
    {
      name: 'invokes blocks and exposes pointer parameters as References',
      run() {
        const seen: string[] = [];
        const array = g('NSArray').arrayWithArray(['a', 'b', 'c']);
        array.enumerateObjectsUsingBlock((value: string, index: number, stop: any) => {
          seen.push(`${index}:${value}`);
          if (index === 1) {
            stop.value = true;
          }
        });
        assertEqual(seen.join(','), '0:a,1:b', 'enumerateObjectsUsingBlock stop reference');
      },
    },
    {
      name: 'invokes C function pointer callbacks on the native caller thread',
      run() {
        let callbackRan = false;
        let callbackThreadHash = 0;
        const queue = g('dispatch_get_global_queue')(0, 0);
        g('dispatch_sync_f')(queue, null, () => {
          callbackRan = true;
          callbackThreadHash = g('NSThread').currentThread.hash;
        });
        assert(callbackRan, 'dispatch_sync_f callback did not run');
        assert(
          callbackThreadHash !== g('NSThread').currentThread.hash,
          'dispatch_sync_f callback should run on the dispatch queue thread',
        );
      },
    },
    {
      name: 'invokes Objective-C block callbacks inside dispatch_async_and_wait',
      run() {
        let callbackRan = false;
        const queue = g('dispatch_get_global_queue')(0, 0);
        g('dispatch_async_and_wait')(queue, () => {
          callbackRan = true;
        });
        assert(callbackRan, 'dispatch_async_and_wait block did not run');
      },
    },
    {
      name: 'runs UIKit native calls through runOnUI main-thread dispatch',
      async run() {
        let mainThread = false;
        await NativeScript.runOnUI(() => {
          mainThread = g('NSThread').isMainThread === true;
          const color = g('UIColor').colorWithRedGreenBlueAlpha(0.1, 0.2, 0.3, 1);
          assert(color, 'UIColor construction failed on UI thread');
        });
        assert(mainThread, 'runOnUI did not execute native calls on main thread');
      },
    },
  ];
}

async function runCompatibilitySuite() {
  writeMarker({
    marker,
    status: 'running',
    current: 'before NativeScript.init',
    passed: 0,
    total: 0,
    results: [],
  });
  NativeScript.init();

  const tests = buildTests();
  const results: TestResult[] = [];
  writeMarker({
    marker,
    status: 'running',
    current: 'initialized',
    passed: 0,
    total: tests.length,
    results,
    backend: NativeScript.getRuntimeBackend(),
  });

  for (const test of tests) {
    try {
      writeMarker({
        marker,
        status: 'running',
        current: test.name,
        passed: results.filter((result) => result.status === 'pass').length,
        total: tests.length,
        results,
        backend: NativeScript.getRuntimeBackend(),
      });
      await test.run();
      results.push({name: test.name, status: 'pass'});
    } catch (error) {
      results.push({
        name: test.name,
        status: 'fail',
        error:
          error instanceof Error
            ? `${error.name}: ${error.message}; step=${currentStep}; global=${lastGlobalAccess}`
            : `${String(error)}; step=${currentStep}; global=${lastGlobalAccess}`,
      });
      break;
    }
  }

  const failed = results.find((result) => result.status === 'fail');
  const payload = {
    marker,
    status: failed ? 'fail' : 'pass',
    passed: results.filter((result) => result.status === 'pass').length,
    total: tests.length,
    results,
    backend: NativeScript.getRuntimeBackend(),
  };
  writeMarker(payload);
  if (failed) {
    throw new Error(failed.error);
  }
  return payload;
}

export default function App(): React.JSX.Element {
  const [text, setText] = useState('Running NativeScript RN FFI compatibility tests...');

  useEffect(() => {
    runCompatibilitySuite()
      .then((payload) => setText(JSON.stringify(payload, null, 2)))
      .catch((error) => {
        setText(error instanceof Error ? error.message : String(error));
      });
  }, []);

  return (
    <SafeAreaView style={{flex: 1, padding: 16}}>
      <ScrollView>
        <Text selectable>{text}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

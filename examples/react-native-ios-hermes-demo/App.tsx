import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import NativeScriptNativeApi from '@nativescript/react-native-ios-hermes';

type NativeApiClass = Record<string, any>;

type NativeApiHost = {
  backend: string;
  metadata?: {classes?: number; functions?: number};
  runOnUI: (callback?: () => void) => Promise<void>;
  getClass(name: string): NativeApiClass | null;
  import(path: string): boolean;
};

const uiUserInterfaceStyle = {
  unspecified: 0,
  light: 1,
  dark: 2,
};

function requireNativeApi(): NativeApiHost {
  NativeScriptNativeApi.install();
  const api = (globalThis as any).__nativeScriptNativeApi as NativeApiHost | undefined;
  if (!api) {
    throw new Error('NativeScript Native API JSI host object was not installed');
  }
  return api;
}

async function applyUIKitTweaks() {
  if (Platform.OS !== 'ios') {
    throw new Error('This demo uses UIKit and must run on iOS');
  }

  const api = requireNativeApi();

  let nativeCallsRanOnMainThread = false;
  await api.runOnUI(() => {
    const NSThread = api.getClass('NSThread');
    const UIApplication = api.getClass('UIApplication');
    const UIColor = api.getClass('UIColor');

    if (!NSThread || !UIApplication || !UIColor) {
      throw new Error('UIKit/Foundation metadata was not available');
    }

    nativeCallsRanOnMainThread = NSThread.isMainThread === true;
    if (!nativeCallsRanOnMainThread) {
      throw new Error('runOnUI did not dispatch native calls to the main thread');
    }

    const app = UIApplication.sharedApplication;
    const window = app.invoke('keyWindow');
    if (!window) {
      throw new Error('No key UIWindow is available yet');
    }

    const nativeAccent = UIColor.systemPinkColor ?? UIColor.magentaColor;
    const nativeBackdrop = UIColor.colorWithRedGreenBlueAlpha(0.04, 0.08, 0.12, 1);

    window.invoke('setTintColor:', nativeAccent);
    window.invoke('setBackgroundColor:', nativeBackdrop);
    window.invoke('setOverrideUserInterfaceStyle:', uiUserInterfaceStyle.dark);

    const rootController = window.invoke('rootViewController');
    const rootView = rootController?.invoke('view');
    if (rootView) {
      rootView.invoke('setTintColor:', nativeAccent);
      rootView.invoke('setBackgroundColor:', nativeBackdrop);
    }
  });

  return {
    backend: api.backend,
    turboBackend: NativeScriptNativeApi.getRuntimeBackend(),
    classes: api.metadata?.classes ?? 0,
    functions: api.metadata?.functions ?? 0,
    nativeCallsRanOnMainThread,
  };
}

export default function App(): React.JSX.Element {
  const [status, setStatus] = useState('Ready');
  const [details, setDetails] = useState('');
  const [busy, setBusy] = useState(false);

  const runDemo = useCallback(async () => {
    setBusy(true);
    setStatus('Applying UIKit tweaks');
    try {
      const result = await applyUIKitTweaks();
      setStatus('UIKit updated from JavaScript');
      setDetails(JSON.stringify(result, null, 2));
    } catch (error) {
      setStatus('Demo failed');
      setDetails(error instanceof Error ? error.message : String(error));
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    runDemo();
  }, [runDemo]);

  const buttonLabel = useMemo(
    () => (busy ? 'Working...' : 'Run UIKit Tweak Again'),
    [busy],
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.panel}>
        <Text style={styles.kicker}>NativeScript TurboModule</Text>
        <Text style={styles.title}>Hermes JSI UIKit Demo</Text>
        <Text style={styles.status}>{status}</Text>
        <Text selectable style={styles.details}>
          {details}
        </Text>
        <Pressable
          accessibilityRole="button"
          disabled={busy}
          onPress={runDemo}
          style={({pressed}) => [
            styles.button,
            busy && styles.buttonDisabled,
            pressed && !busy && styles.buttonPressed,
          ]}>
          <Text style={styles.buttonText}>{buttonLabel}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    padding: 24,
  },
  panel: {
    gap: 14,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.26)',
    backgroundColor: 'rgba(8,14,22,0.82)',
    padding: 20,
  },
  kicker: {
    color: '#9bd4ff',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0,
  },
  status: {
    color: '#f7d276',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0,
  },
  details: {
    minHeight: 112,
    color: '#d8e7f4',
    fontFamily: Platform.select({ios: 'Menlo', default: 'monospace'}),
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
  },
  button: {
    minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#ff4fa3',
    paddingHorizontal: 16,
  },
  buttonPressed: {
    backgroundColor: '#e23f90',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0,
  },
});

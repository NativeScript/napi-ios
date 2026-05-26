#!/bin/bash
set -euo pipefail
source "$(dirname "$0")/build_utils.sh"
source "$SCRIPT_DIR/react_native_app_utils.sh"

RN_VERSION=${RN_VERSION:-0.85.3}
RN_CLI_VERSION=${RN_CLI_VERSION:-20.1.3}
APP_NAME=${RN_SMOKE_APP_NAME:-NativeScriptNativeApiSmoke}
APP_ROOT=${RN_SMOKE_APP_ROOT:-"$REPO_ROOT/build/react-native-smoke"}
APP_DIR="$APP_ROOT/$APP_NAME"
CONFIGURATION=${IOS_CONFIGURATION:-Release}
FORCE_RECREATE=${RN_SMOKE_FORCE_RECREATE:-1}
BUILD_TIMEOUT_SECONDS=${RN_SMOKE_BUILD_TIMEOUT_SECONDS:-1800}
LAUNCH_TIMEOUT_SECONDS=${RN_SMOKE_LAUNCH_TIMEOUT_SECONDS:-90}
MARKER="NATIVESCRIPT_RN_TURBO_SMOKE_PASS"
BUNDLE_ID="org.reactjs.native.example.$APP_NAME"
MARKER_FILE_NAME="NativeScriptNativeApiSmoke.marker"

rn_build_turbo_tarball
TARBALL=$(rn_latest_turbo_tarball)

if [[ "$FORCE_RECREATE" == "1" ]]; then
  rm -rf "$APP_DIR"
fi

rn_create_app_if_missing "$APP_DIR" "$APP_ROOT" "$APP_NAME" "$RN_VERSION" "$RN_CLI_VERSION" "React Native smoke app"
rn_install_turbo_tarball "$APP_DIR" "$TARBALL" "smoke app"

checkpoint "Writing smoke app entrypoint..."
node - "$APP_DIR/App.tsx" <<'NODE'
const fs = require('fs');
const target = process.argv[2];

fs.writeFileSync(target, `import React from 'react';
import {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import NativeScript from '@nativescript/react-native';

const marker = 'NATIVESCRIPT_RN_TURBO_SMOKE_PASS';

async function runSmoke(): Promise<string> {
  try {
    const installed = NativeScript.init();
    const api = (globalThis as any).__nativeScriptNativeApi;
    if (!installed || !api) {
      throw new Error('NativeScript Native API JSI host object was not installed');
    }

    const nsObject = NSObject;
    if (!nsObject || typeof nsObject.alloc !== 'function') {
      throw new Error('NSObject global install failed');
    }

    if (NSURLErrorTimedOut !== -1001) {
      throw new Error('constant global install failed');
    }

    if (NSComparisonResult.Same !== 0 || UIUserInterfaceStyle.Dark !== 2) {
      throw new Error('enum global install failed');
    }

    let nativeCallsRanOnMainThread = false;
    await NativeScript.runOnUI(() => {
      nativeCallsRanOnMainThread = NSThread?.isMainThread === true;
      if (!nativeCallsRanOnMainThread) {
        throw new Error('runOnUI did not dispatch native calls to the main thread');
      }
    });

    const summary = {
      installed,
      nativeCallsRanOnMainThread,
      runtime: api.runtime,
      backend: api.backend,
      classes: api.metadata?.classes ?? 0,
      constants: api.metadata?.constants ?? 0,
      enums: api.metadata?.enums ?? 0,
      constant: NSURLErrorTimedOut,
      enumValue: UIUserInterfaceStyle.Dark,
      metadataPath: NativeScript.defaultMetadataPath(),
      turboBackend: NativeScript.getRuntimeBackend(),
    };

    console.log(marker + ' ' + JSON.stringify(summary));
    return JSON.stringify(summary, null, 2);
  } catch (error) {
    console.error('NATIVESCRIPT_RN_TURBO_SMOKE_FAIL', error);
    throw error;
  }
}

export default function App(): React.JSX.Element {
  const [result, setResult] = useState('Running NativeScript TurboModule smoke test...');

  useEffect(() => {
    runSmoke()
      .then(setResult)
      .catch((error) => {
        setResult(error instanceof Error ? error.message : String(error));
      });
  }, []);

  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24}}>
      <Text selectable>{result}</Text>
    </SafeAreaView>
  );
}
`);
NODE

rn_install_pods "$APP_DIR" "smoke app"
UDID=$(rn_require_ios_simulator)
rn_build_ios_app "$APP_DIR" "$APP_ROOT" "$APP_NAME" "$CONFIGURATION" "$UDID" "$BUILD_TIMEOUT_SECONDS" "smoke app"
APP_BUNDLE="$RN_APP_BUNDLE"

checkpoint "Launching smoke app and waiting for TurboModule marker..."
MARKER_FILE=$(rn_launch_app_with_marker "$UDID" "$APP_BUNDLE" "$BUNDLE_ID" "$MARKER_FILE_NAME")
rn_wait_for_marker_file "$MARKER_FILE" "$MARKER" "$LAUNCH_TIMEOUT_SECONDS"

checkpoint "React Native NativeScript TurboModule smoke test passed."

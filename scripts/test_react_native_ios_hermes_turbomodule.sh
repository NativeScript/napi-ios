#!/bin/bash
set -euo pipefail
source "$(dirname "$0")/build_utils.sh"

RN_VERSION=${RN_VERSION:-0.85.3}
RN_CLI_VERSION=${RN_CLI_VERSION:-20.1.3}
APP_NAME=${RN_SMOKE_APP_NAME:-NativeScriptNativeApiSmoke}
APP_ROOT=${RN_SMOKE_APP_ROOT:-"$REPO_ROOT/build/react-native-ios-hermes-smoke"}
APP_DIR="$APP_ROOT/$APP_NAME"
CONFIGURATION=${IOS_CONFIGURATION:-Release}
FORCE_RECREATE=${RN_SMOKE_FORCE_RECREATE:-1}
BUILD_TIMEOUT_SECONDS=${RN_SMOKE_BUILD_TIMEOUT_SECONDS:-1800}
LAUNCH_TIMEOUT_SECONDS=${RN_SMOKE_LAUNCH_TIMEOUT_SECONDS:-90}
MARKER="NATIVESCRIPT_RN_TURBO_SMOKE_PASS"
BUNDLE_ID="org.reactjs.native.example.$APP_NAME"
MARKER_FILE_NAME="NativeScriptNativeApiSmoke.marker"

checkpoint "Building React Native iOS Hermes TurboModule tarball..."
"$SCRIPT_DIR/build_react_native_ios_hermes_turbomodule.sh"
TARBALL=$(ls -t "$REPO_ROOT/packages/react-native-ios-hermes/dist"/*.tgz | head -n 1)

if [[ "$FORCE_RECREATE" == "1" ]]; then
  rm -rf "$APP_DIR"
fi

if [[ ! -d "$APP_DIR" ]]; then
  checkpoint "Creating React Native smoke app ($RN_VERSION)..."
  mkdir -p "$APP_ROOT"
  npx --yes "@react-native-community/cli@$RN_CLI_VERSION" init "$APP_NAME" \
    --version "$RN_VERSION" \
    --directory "$APP_DIR" \
    --skip-git-init \
    --install-pods false \
    --pm npm
fi

checkpoint "Installing local TurboModule tarball into smoke app..."
(
  cd "$APP_DIR"
  npm install "$TARBALL"
)

checkpoint "Writing smoke app entrypoint..."
node - "$APP_DIR/App.tsx" <<'NODE'
const fs = require('fs');
const target = process.argv[2];

fs.writeFileSync(target, `import React from 'react';
import {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import NativeScriptNativeApi from '@nativescript/react-native-ios-hermes';

const marker = 'NATIVESCRIPT_RN_TURBO_SMOKE_PASS';

async function runSmoke(): Promise<string> {
  try {
    const installed = NativeScriptNativeApi.install();
    const api = (globalThis as any).__nativeScriptNativeApi;
    if (!installed || !api) {
      throw new Error('NativeScript Native API JSI host object was not installed');
    }

    const nsObject = api.getClass('NSObject');
    if (!nsObject || nsObject.available !== true) {
      throw new Error('NSObject metadata lookup failed');
    }

    let nativeCallsRanOnMainThread = false;
    await api.runOnUI(() => {
      const NSThread = api.getClass('NSThread');
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
      metadataPath: NativeScriptNativeApi.defaultMetadataPath(),
      turboBackend: NativeScriptNativeApi.getRuntimeBackend(),
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

checkpoint "Installing CocoaPods for smoke app..."
(
  cd "$APP_DIR/ios"
  if [[ -f Gemfile ]]; then
    bundle install
    RCT_NEW_ARCH_ENABLED=1 USE_HERMES=1 bundle exec pod install
  else
    RCT_NEW_ARCH_ENABLED=1 USE_HERMES=1 pod install
  fi
)

UDID=$(node <<'NODE'
const cp = require('child_process');
const devices = JSON.parse(cp.execFileSync('xcrun', ['simctl', 'list', 'devices', 'available', '--json'], {encoding: 'utf8'}));
const runtimes = Object.keys(devices.devices).filter((runtime) => runtime.includes('iOS')).sort().reverse();
for (const runtime of runtimes) {
  const booted = devices.devices[runtime].find((device) => device.state === 'Booted' && device.name.includes('iPhone'));
  if (booted) {
    console.log(booted.udid);
    process.exit(0);
  }
}
for (const runtime of runtimes) {
  const candidate = devices.devices[runtime].find((device) => device.name.includes('iPhone'));
  if (candidate) {
    console.log(candidate.udid);
    process.exit(0);
  }
}
process.exit(1);
NODE
)

if [[ -z "$UDID" ]]; then
  echo "No available iOS simulator found." >&2
  exit 1
fi

checkpoint "Building smoke app for simulator..."
xcrun simctl boot "$UDID" >/dev/null 2>&1 || true
xcrun simctl bootstatus "$UDID" -b

xcodebuild \
  -workspace "$APP_DIR/ios/$APP_NAME.xcworkspace" \
  -scheme "$APP_NAME" \
  -configuration "$CONFIGURATION" \
  -sdk iphonesimulator \
  -destination "platform=iOS Simulator,id=$UDID" \
  -derivedDataPath "$APP_DIR/ios/build/DerivedData" \
  build | tee "$APP_ROOT/xcodebuild.log" &
BUILD_PID=$!

SECONDS_WAITED=0
while kill -0 "$BUILD_PID" >/dev/null 2>&1; do
  if [[ "$SECONDS_WAITED" -ge "$BUILD_TIMEOUT_SECONDS" ]]; then
    kill "$BUILD_PID" >/dev/null 2>&1 || true
    echo "Smoke app build timed out after ${BUILD_TIMEOUT_SECONDS}s." >&2
    exit 1
  fi
  sleep 5
  SECONDS_WAITED=$((SECONDS_WAITED + 5))
done
wait "$BUILD_PID"

APP_BUNDLE=$(find "$APP_DIR/ios/build/DerivedData/Build/Products/$CONFIGURATION-iphonesimulator" -maxdepth 1 -name "$APP_NAME.app" -print -quit)
if [[ -z "$APP_BUNDLE" ]]; then
  echo "Built app bundle not found." >&2
  exit 1
fi

checkpoint "Launching smoke app and waiting for TurboModule marker..."
xcrun simctl install "$UDID" "$APP_BUNDLE"
DATA_CONTAINER=$(xcrun simctl get_app_container "$UDID" "$BUNDLE_ID" data)
MARKER_FILE="$DATA_CONTAINER/tmp/$MARKER_FILE_NAME"
rm -f "$MARKER_FILE"

SIMCTL_CHILD_NATIVESCRIPT_RN_TURBO_SMOKE_MARKER=1 \
  xcrun simctl launch --terminate-running-process "$UDID" "$BUNDLE_ID"

node - "$MARKER_FILE" "$MARKER" "$LAUNCH_TIMEOUT_SECONDS" <<'NODE'
const fs = require('fs');
const [markerFile, marker, timeoutSecondsText] = process.argv.slice(2);
const timeoutMs = Number(timeoutSecondsText) * 1000;
const startedAt = Date.now();

function poll() {
  if (fs.existsSync(markerFile)) {
    const content = fs.readFileSync(markerFile, 'utf8');
    console.log(`${marker} ${JSON.stringify({markerFile, content: content.trim()})}`);
    process.exit(0);
  }

  if (Date.now() - startedAt > timeoutMs) {
    console.error(`Timed out waiting for ${marker} file at ${markerFile}.`);
    process.exit(1);
  }

  setTimeout(poll, 2000);
}

poll();
NODE

checkpoint "React Native iOS Hermes TurboModule smoke test passed."

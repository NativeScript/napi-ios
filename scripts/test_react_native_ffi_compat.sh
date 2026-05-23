#!/bin/bash
set -euo pipefail
source "$(dirname "$0")/build_utils.sh"

RN_VERSION=${RN_FFI_COMPAT_VERSION:-0.85.3}
RN_CLI_VERSION=${RN_FFI_COMPAT_CLI_VERSION:-20.1.3}
APP_NAME=${RN_FFI_COMPAT_APP_NAME:-NativeScriptNativeApiFfiCompat}
APP_ROOT=${RN_FFI_COMPAT_APP_ROOT:-"$REPO_ROOT/build/react-native-ffi-compat"}
APP_DIR="$APP_ROOT/$APP_NAME"
CONFIGURATION=${IOS_CONFIGURATION:-Release}
FORCE_RECREATE=${RN_FFI_COMPAT_FORCE_RECREATE:-1}
BUILD_TIMEOUT_SECONDS=${RN_FFI_COMPAT_BUILD_TIMEOUT_SECONDS:-1800}
LAUNCH_TIMEOUT_SECONDS=${RN_FFI_COMPAT_LAUNCH_TIMEOUT_SECONDS:-120}
BUNDLE_ID="org.reactjs.native.example.$APP_NAME"
MARKER="NATIVESCRIPT_RN_FFI_COMPAT"
MARKER_FILE_NAME="NativeScriptNativeApiSmoke.marker"
APP_TSX="$REPO_ROOT/test/react-native/ffi-compat/App.tsx"

checkpoint "Building @nativescript/react-native TurboModule tarball..."
"$SCRIPT_DIR/build_react_native_turbomodule.sh"
TARBALL=$(ls -t "$REPO_ROOT/packages/react-native/dist"/*.tgz | head -n 1)

if [[ "$FORCE_RECREATE" == "1" ]]; then
  rm -rf "$APP_DIR"
fi

if [[ ! -d "$APP_DIR" ]]; then
  checkpoint "Creating React Native FFI compatibility app ($RN_VERSION)..."
  mkdir -p "$APP_ROOT"
  npx --yes "@react-native-community/cli@$RN_CLI_VERSION" init "$APP_NAME" \
    --version "$RN_VERSION" \
    --directory "$APP_DIR" \
    --skip-git-init \
    --install-pods false \
    --pm npm
fi

checkpoint "Installing local TurboModule tarball into FFI compatibility app..."
(
  cd "$APP_DIR"
  npm install "$TARBALL"
)

checkpoint "Installing FFI compatibility entrypoint..."
cp "$APP_TSX" "$APP_DIR/App.tsx"

checkpoint "Installing CocoaPods for FFI compatibility app..."
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

checkpoint "Building FFI compatibility app for simulator..."
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
    echo "FFI compatibility app build timed out after ${BUILD_TIMEOUT_SECONDS}s." >&2
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

checkpoint "Launching FFI compatibility app and waiting for test marker..."
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
let lastContent = '';
let lastPayload = null;

function finish(payload) {
  console.log(`${marker} ${JSON.stringify({markerFile, payload})}`);
  if (!payload || payload.status !== 'pass') {
    process.exit(1);
  }
  process.exit(0);
}

function poll() {
  if (fs.existsSync(markerFile)) {
    const content = fs.readFileSync(markerFile, 'utf8').trim();
    if (content && content !== lastContent) {
      lastContent = content;
      try {
        lastPayload = JSON.parse(content);
      } catch (error) {
        console.error(`Invalid ${marker} marker content at ${markerFile}: ${content}`);
        process.exit(1);
      }
      console.log(`${marker} ${JSON.stringify({markerFile, payload: lastPayload})}`);
      if (lastPayload.status !== 'running') {
        finish(lastPayload);
      }
    }
  }

  if (Date.now() - startedAt > timeoutMs) {
    console.error(`Timed out waiting for ${marker} file at ${markerFile}.`);
    if (lastPayload) {
      console.error(`Last ${marker} payload: ${JSON.stringify(lastPayload)}`);
    }
    process.exit(1);
  }

  setTimeout(poll, 2000);
}

poll();
NODE

checkpoint "React Native NativeScript FFI compatibility suite passed."

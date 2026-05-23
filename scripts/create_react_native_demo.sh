#!/bin/bash
set -euo pipefail
source "$(dirname "$0")/build_utils.sh"

RN_VERSION=${RN_DEMO_VERSION:-0.85.3}
RN_CLI_VERSION=${RN_DEMO_CLI_VERSION:-20.1.3}
APP_NAME=${RN_DEMO_APP_NAME:-NativeScriptNativeApiDemo}
APP_ROOT=${RN_DEMO_APP_ROOT:-"$REPO_ROOT/build/react-native-demo"}
APP_DIR="$APP_ROOT/$APP_NAME"
CONFIGURATION=${IOS_CONFIGURATION:-Release}
FORCE_RECREATE=${RN_DEMO_FORCE_RECREATE:-0}
RUN_BUILD=${RN_DEMO_BUILD:-1}
RUN_LAUNCH=${RN_DEMO_LAUNCH:-1}
BUILD_TIMEOUT_SECONDS=${RN_DEMO_BUILD_TIMEOUT_SECONDS:-1800}
LAUNCH_TIMEOUT_SECONDS=${RN_DEMO_LAUNCH_TIMEOUT_SECONDS:-90}
BUNDLE_ID="org.reactjs.native.example.$APP_NAME"
MARKER="NATIVESCRIPT_RN_TURBO_DEMO_PASS"
MARKER_FILE_NAME="NativeScriptNativeApiSmoke.marker"
DEMO_APP_TSX="$REPO_ROOT/examples/react-native-demo/App.tsx"

checkpoint "Building @nativescript/react-native TurboModule tarball..."
"$SCRIPT_DIR/build_react_native_turbomodule.sh"
TARBALL=$(ls -t "$REPO_ROOT/packages/react-native/dist"/*.tgz | head -n 1)

if [[ "$FORCE_RECREATE" == "1" ]]; then
  rm -rf "$APP_DIR"
fi

if [[ ! -d "$APP_DIR" ]]; then
  checkpoint "Creating React Native demo app ($RN_VERSION)..."
  mkdir -p "$APP_ROOT"
  npx --yes "@react-native-community/cli@$RN_CLI_VERSION" init "$APP_NAME" \
    --version "$RN_VERSION" \
    --directory "$APP_DIR" \
    --skip-git-init \
    --install-pods false \
    --pm npm
fi

checkpoint "Installing local TurboModule tarball into demo app..."
(
  cd "$APP_DIR"
  npm install "$TARBALL"
)

checkpoint "Installing demo entrypoint..."
cp "$DEMO_APP_TSX" "$APP_DIR/App.tsx"

checkpoint "Installing CocoaPods for demo app..."
(
  cd "$APP_DIR/ios"
  if [[ -f Gemfile ]]; then
    bundle install
    RCT_NEW_ARCH_ENABLED=1 USE_HERMES=1 bundle exec pod install
  else
    RCT_NEW_ARCH_ENABLED=1 USE_HERMES=1 pod install
  fi
)

if [[ "$RUN_BUILD" != "1" ]]; then
  checkpoint "React Native demo app is ready at $APP_DIR"
  exit 0
fi

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

checkpoint "Building demo app for simulator..."
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
    echo "Demo app build timed out after ${BUILD_TIMEOUT_SECONDS}s." >&2
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

if [[ "$RUN_LAUNCH" == "1" ]]; then
  checkpoint "Launching demo app..."
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
fi

checkpoint "React Native NativeScript demo app is ready at $APP_DIR"

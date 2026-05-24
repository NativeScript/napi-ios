#!/bin/bash
set -euo pipefail
source "$(dirname "$0")/build_utils.sh"
source "$SCRIPT_DIR/react_native_app_utils.sh"

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

rn_build_turbo_tarball
TARBALL=$(rn_latest_turbo_tarball)

if [[ "$FORCE_RECREATE" == "1" ]]; then
  rm -rf "$APP_DIR"
fi

rn_create_app_if_missing "$APP_DIR" "$APP_ROOT" "$APP_NAME" "$RN_VERSION" "$RN_CLI_VERSION" "React Native FFI compatibility app"
rn_install_turbo_tarball "$APP_DIR" "$TARBALL" "FFI compatibility app"

checkpoint "Installing FFI compatibility entrypoint..."
cp "$APP_TSX" "$APP_DIR/App.tsx"

rn_install_pods "$APP_DIR" "FFI compatibility app"
UDID=$(rn_require_ios_simulator)
rn_build_ios_app "$APP_DIR" "$APP_ROOT" "$APP_NAME" "$CONFIGURATION" "$UDID" "$BUILD_TIMEOUT_SECONDS" "FFI compatibility app"
APP_BUNDLE="$RN_APP_BUNDLE"

checkpoint "Launching FFI compatibility app and waiting for test marker..."
MARKER_FILE=$(rn_launch_app_with_marker "$UDID" "$APP_BUNDLE" "$BUNDLE_ID" "$MARKER_FILE_NAME")

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

#!/bin/bash
set -euo pipefail
source "$(dirname "$0")/build_utils.sh"
source "$SCRIPT_DIR/react_native_app_utils.sh"

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

rn_build_turbo_tarball
TARBALL=$(rn_latest_turbo_tarball)

if [[ "$FORCE_RECREATE" == "1" ]]; then
  rm -rf "$APP_DIR"
fi

rn_create_app_if_missing "$APP_DIR" "$APP_ROOT" "$APP_NAME" "$RN_VERSION" "$RN_CLI_VERSION" "React Native demo app"
rn_install_turbo_tarball "$APP_DIR" "$TARBALL" "demo app"

checkpoint "Installing demo entrypoint..."
cp "$DEMO_APP_TSX" "$APP_DIR/App.tsx"

rn_install_pods "$APP_DIR" "demo app"

if [[ "$RUN_BUILD" != "1" ]]; then
  checkpoint "React Native demo app is ready at $APP_DIR"
  exit 0
fi

UDID=$(rn_require_ios_simulator)
rn_build_ios_app "$APP_DIR" "$APP_ROOT" "$APP_NAME" "$CONFIGURATION" "$UDID" "$BUILD_TIMEOUT_SECONDS" "demo app"
APP_BUNDLE="$RN_APP_BUNDLE"

if [[ "$RUN_LAUNCH" == "1" ]]; then
  checkpoint "Launching demo app..."
  MARKER_FILE=$(rn_launch_app_with_marker "$UDID" "$APP_BUNDLE" "$BUNDLE_ID" "$MARKER_FILE_NAME")
  rn_wait_for_marker_file "$MARKER_FILE" "$MARKER" "$LAUNCH_TIMEOUT_SECONDS"
fi

checkpoint "React Native NativeScript demo app is ready at $APP_DIR"

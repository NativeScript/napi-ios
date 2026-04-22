#!/bin/bash
set -e
source "$(dirname "$0")/build_utils.sh"

rm -rf ./dist
if [ -z "$NO_UPDATE_VERSION" ]; then
  "$SCRIPT_DIR/update_version.sh" visionos
fi

VISION_ENGINE_ARG=${VISION_ENGINE_ARG:=}
if [ -z "$VISION_ENGINE_ARG" ]; then
  if [ -d "./Frameworks/libv8_monolith.xcframework/xros-arm64/libv8_monolith.framework" ] && [ -d "./Frameworks/libv8_monolith.xcframework/xrsimulator-arm64/libv8_monolith.framework" ]; then
    VISION_ENGINE_ARG="--v8"
  else
    checkpoint "visionOS V8 slices not found, falling back to JavaScriptCore"
    VISION_ENGINE_ARG="--jsc"
  fi
fi

"$SCRIPT_DIR/build_metadata_generator.sh"
"$SCRIPT_DIR/build_nativescript.sh" --no-catalyst --no-iphone --no-sim --no-macos --vision "$VISION_ENGINE_ARG"
"$SCRIPT_DIR/build_tklivesync.sh" --no-catalyst --no-iphone --no-sim --no-macos --vision
"$SCRIPT_DIR/prepare_dSYMs.sh"
"$SCRIPT_DIR/build_npm_vision.sh"

#!/bin/bash
set -e
source "$(dirname "$0")/build_utils.sh"

TARGET_ENGINE=${TARGET_ENGINE:=some}
BUILD_IPHONE=$(to_bool ${BUILD_IPHONE:=true})
BUILD_SIMULATOR=$(to_bool ${BUILD_SIMULATOR:=true})
BUILD_MACOS=$(to_bool ${BUILD_MACOS:=false})
EMBED_METADATA=$(to_bool ${EMBED_METADATA:=false})

# See build_nativescript.sh for all supported flags. This parent script is only
# interested in intercepting a subset of them.
for arg in $@; do
  case $arg in
    --v8|--quickjs|--jsc|--hermes) TARGET_ENGINE=some ;;
    --sim|--simulator) BUILD_SIMULATOR=true ;;
    --no-sim|--no-simulator) BUILD_SIMULATOR=false ;;
    --iphone|--device) BUILD_IPHONE=true ;;
    --no-iphone|--no-device) BUILD_IPHONE=false ;;
    --macos) BUILD_MACOS=true ;;
    --no-macos) BUILD_MACOS=false ;;
    --no-engine|--generic-napi) TARGET_ENGINE=none ;;
    --embed-metadata) EMBED_METADATA=true ;;
    *) ;;
  esac
done

rm -rf ./dist

# Sync the embedded runtime version when building the iOS runtime package.
if [ -z "$NO_UPDATE_VERSION" ] && [[ "$TARGET_ENGINE" != "none" ]]; then
  "$SCRIPT_DIR/update_version.sh" ios
fi

"$SCRIPT_DIR/build_metadata_generator.sh"

if $EMBED_METADATA; then
  checkpoint "Generating metadata, as --embed-metadata was passed..."

  if $BUILD_IPHONE; then
    checkpoint "Generating metadata for iOS (physical device)..."
    npm run metagen ios
  fi
  if $BUILD_SIMULATOR; then
    checkpoint "Generating metadata for iOS (simulator)..."
    npm run metagen ios-sim
  fi
  if $BUILD_MACOS; then
    checkpoint "Generating metadata for macOS..."
    npm run metagen macos
  fi

  checkpoint "... All metadata generated!"
elif [[ "$TARGET_ENGINE" != "none" ]]; then
  GSD_PLATFORM=
  if $BUILD_SIMULATOR; then
    GSD_PLATFORM=ios-sim
  elif $BUILD_IPHONE; then
    GSD_PLATFORM=ios
  elif $BUILD_MACOS; then
    GSD_PLATFORM=macos
  fi

  if [ -n "$GSD_PLATFORM" ]; then
    checkpoint "Generating signature dispatch bindings for $GSD_PLATFORM..."
    npm run metagen "$GSD_PLATFORM"
  fi
fi

"$SCRIPT_DIR/build_nativescript.sh" --no-vision "$@"

if [[ "$TARGET_ENGINE" == "none" ]]; then
  # If you're building *with* --no-engine, you're trying to make an npm release
  # of a workspace under ./packages/*, like @nativescript/ios-node-api.
  echo "Skipping build_npm_ios.sh due to --no-engine flag."
  echo "build_all_ios.sh finished!"
else
  # If you're building *without* --no-engine, you're trying to make an npm
  # release of the runtime workspace under ./packages/ios.
  TKLIVESYNC_ARGS=(--no-vision)
  if $BUILD_IPHONE; then
    TKLIVESYNC_ARGS+=(--iphone)
  else
    TKLIVESYNC_ARGS+=(--no-iphone)
  fi

  if $BUILD_SIMULATOR; then
    TKLIVESYNC_ARGS+=(--simulator)
  else
    TKLIVESYNC_ARGS+=(--no-simulator)
  fi

  if $BUILD_MACOS; then
    TKLIVESYNC_ARGS+=(--macos)
  else
    TKLIVESYNC_ARGS+=(--no-macos)
  fi

  "$SCRIPT_DIR/build_tklivesync.sh" "${TKLIVESYNC_ARGS[@]}"
  "$SCRIPT_DIR/prepare_dSYMs.sh"
  "$SCRIPT_DIR/build_npm_ios.sh"
fi

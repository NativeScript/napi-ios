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
    --no-engine) TARGET_ENGINE=none ;;
    --embed-metadata) EMBED_METADATA=true ;;
    *) ;;
  esac
done

rm -rf ./dist

# don't run if NO_UPDATE_VERSION is set
if [ -z "$NO_UPDATE_VERSION" ]; then
  # TODO: integrate version into runtime
  ./update_version.sh
fi

./build_metadata_generator.sh

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

./build_nativescript.sh --no-vision --no-engine $1 $2 $3 $4 $5 $6 $7 $8 $9

./prepare_dSYMs.sh
./build_npm_node_api.sh

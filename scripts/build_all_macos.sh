#!/bin/bash
set -e
source "$(dirname "$0")/build_utils.sh"

rm -rf ./dist

# don't run if NO_UPDATE_VERSION is set
if [ -z "$NO_UPDATE_VERSION" ]; then
  "$SCRIPT_DIR/update_version.sh" macos
fi

"$SCRIPT_DIR/build_metadata_generator.sh"
npm run metagen macos
"$SCRIPT_DIR/build_nativescript.sh" --no-catalyst --no-iphone --no-sim --macos
"$SCRIPT_DIR/build_tklivesync.sh" --no-catalyst --no-iphone --no-sim --no-vision --macos
"$SCRIPT_DIR/prepare_dSYMs.sh"
"$SCRIPT_DIR/build_npm_macos.sh"

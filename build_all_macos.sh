#!/bin/bash
set -e

rm -rf ./dist

# don't run if NO_UPDATE_VERSION is set
if [ -z "$NO_UPDATE_VERSION" ]; then
  # TODO: integrate version into runtime
  ./update_version.sh
fi

./build_metadata_generator.sh
./build_nativescript.sh --no-catalyst --no-iphone --no-sim --macos
./build_tklivesync.sh --no-catalyst --no-iphone --no-sim --macos
./prepare_dSYMs.sh
./build_npm_macos.sh
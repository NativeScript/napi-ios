#!/bin/bash
set -e

rm -rf ./dist
# dont run if NO_UPDATE_VERSION is set
if [ -z "$NO_UPDATE_VERSION" ]; then
  ./update_version.sh
fi
./build_metadata_generator.sh
./build_nativescript.sh --no-vision
./build_tklivesync.sh --no-vision
./prepare_dSYMs.sh
./build_npm_ios.sh
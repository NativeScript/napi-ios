#!/bin/bash
set -e

rm -rf ./dist
# don't run if NO_UPDATE_VERSION is set
# if [ -z "$NO_UPDATE_VERSION" ]; then
  # TODO: integrate version into runtime
  # ./update_version.sh
# fi
./build_metadata_generator.sh
./build_nativescript.sh --no-vision $1 $2
./build_tklivesync.sh --no-vision
./prepare_dSYMs.sh
./build_npm_ios.sh
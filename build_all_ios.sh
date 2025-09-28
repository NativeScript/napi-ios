#!/bin/bash
set -e

TARGET_ENGINE=${TARGET_ENGINE:=some}

# See build_nativescript.sh for all supported flags. This parent script is only
# interested in intercepting --no-engine.
for arg in $@; do
  case $arg in
    --v8|--quickjs|--jsc|--hermes) TARGET_ENGINE=some ;;
    --no-engine) TARGET_ENGINE=none ;;
    *) ;;
  esac
done

rm -rf ./dist
# don't run if NO_UPDATE_VERSION is set
# if [ -z "$NO_UPDATE_VERSION" ]; then
  # TODO: integrate version into runtime
  # ./update_version.sh
# fi
./build_metadata_generator.sh
./build_nativescript.sh --no-vision $1 $2 $3 $4 $5 $6 $7 $8 $9

if [[ "$TARGET_ENGINE" == "none" ]]; then
  # If you're building *with* --no-engine, you're trying to make an npm release
  # of a workspace under ./packages/*, like @nativescript/ios-node-api.
  echo "Skipping build_npm_ios.sh due to --no-engine flag."
  echo "build_all_ios.sh finished!"
else
  # If you're building *without* --no-engine, you're trying to make an npm
  # release of the root-level workspace, @nativescript/ios.
  ./build_tklivesync.sh --no-vision
  ./prepare_dSYMs.sh
  ./build_npm_ios.sh
fi
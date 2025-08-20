#!/bin/bash
set -e

TARGET_ENGINE=${TARGET_ENGINE:=v8} # default to v8 for compat

# See build_nativescript.sh for all supported flags. This parent script is only
# interested in --no-engine.
for arg in $@; do
  case $arg in
    --v8) TARGET_ENGINE=v8 ;;
    --quickjs) TARGET_ENGINE=quickjs ;;
    --jsc) TARGET_ENGINE=jsc ;;
    --hermes) TARGET_ENGINE=hermes ;;
    --no-engine) TARGET_ENGINE=none ;;
    *) ;;
  esac
done

rm -rf ./dist
./update_version.sh
./build_metadata_generator.sh
./build_nativescript.sh --no-catalyst --no-iphone --no-sim $1
./build_tklivesync.sh --no-catalyst --no-iphone --no-sim
./prepare_dSYMs.sh

if [[ "$TARGET_ENGINE" == "none" ]]; then
  # If you're building *with* --no-engine, you're trying to make an npm release
  # of a workspace under ./packages/*, like @nativescript/ios-node-api.
  echo "Skipping build_npm_vision.sh due to --no-engine flag."
  echo "build_all_vision.sh finished!"
else
  # If you're building *without* --no-engine, you're trying to make an npm
  # release of the root-level workspace, @nativescript/ios.
  ./build_npm_vision.sh
fi
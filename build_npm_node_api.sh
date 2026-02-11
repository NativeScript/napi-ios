#!/bin/bash
set -e
source "$(dirname "$0")/build_utils.sh"

checkpoint "Preparing npm packages for Node-API iOS and macOS builds"

cd packages/ios

npm pack --pack-destination ../../dist

cd ../macos

npm pack --pack-destination ../../dist

cd ../../

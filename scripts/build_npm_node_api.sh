#!/bin/bash
set -e
source "$(dirname "$0")/build_utils.sh"

checkpoint "Preparing npm packages for Node-API iOS and macOS builds"

for PACKAGE_DIR in packages/ios-node-api packages/macos-node-api; do
  rm -rf "$PACKAGE_DIR/dist"
  mkdir -p "$PACKAGE_DIR/dist"
  (
    cd "$PACKAGE_DIR"
    npm pack --pack-destination dist
  )
done

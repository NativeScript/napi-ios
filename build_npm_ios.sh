#!/bin/bash
set -e
source "$(dirname "$0")/build_utils.sh"

checkpoint "Preparing npm package for iOS..."
OUTPUT_DIR="dist/npm"
rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR/framework"
cp ./package.json "$OUTPUT_DIR"

cp -r "./project-template-ios/" "$OUTPUT_DIR/framework"

NATIVESCRIPT_IOS_XCFRAMEWORK="packages/ios/build/Release/NativeScript.apple.node"
if [ ! -d "$NATIVESCRIPT_IOS_XCFRAMEWORK" ]; then
  echo "Error: Expected to find the NativeScript iOS XCFramework at path \"$NATIVESCRIPT_IOS_XCFRAMEWORK\". Make sure to run ./build_nativescript.sh before running this script." >&2
  exit 1
fi

cp -r $NATIVESCRIPT_IOS_XCFRAMEWORK "$OUTPUT_DIR/framework/internal/NativeScript.xcframework"
rm "$OUTPUT_DIR/framework/internal/NativeScript.xcframework/react-native-node-api-module"

cp -r "dist/TKLiveSync.xcframework" "$OUTPUT_DIR/framework/internal"

mkdir -p "$OUTPUT_DIR/framework/internal/metadata-generator-x86_64"
cp -r "metadata-generator/dist/x86_64/." "$OUTPUT_DIR/framework/internal/metadata-generator-x86_64"

mkdir -p "$OUTPUT_DIR/framework/internal/metadata-generator-arm64"
cp -r "metadata-generator/dist/arm64/." "$OUTPUT_DIR/framework/internal/metadata-generator-arm64"

# Add xcframeworks to .zip (NPM modules do not support symlinks, unzipping is done by {N} CLI)
(
    set -e
    cd $OUTPUT_DIR/framework/internal
    zip -qr --symlinks XCFrameworks.zip *.xcframework
    rm -rf *.xcframework
)

pushd "$OUTPUT_DIR"
npm pack
mv *.tgz ../
popd

checkpoint "npm package created."
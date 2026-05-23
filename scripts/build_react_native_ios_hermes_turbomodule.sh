#!/bin/bash
set -euo pipefail
source "$(dirname "$0")/build_utils.sh"

PACKAGE_DIR="packages/react-native-ios-hermes"
OUTPUT_DIR="$PACKAGE_DIR/dist"
PACK_DESTINATION=${NPM_PACK_DESTINATION:-"$REPO_ROOT/build/npm-tarballs"}
VERSION_OVERRIDE=${NPM_PACKAGE_VERSION:-}
SKIP_PACK=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --no-pack)
      SKIP_PACK=true
      shift
      ;;
    *)
      echo "Unknown argument: $1" >&2
      exit 1
      ;;
  esac
done

checkpoint "Preparing React Native iOS Hermes TurboModule package..."

rm -rf "$PACKAGE_DIR/native-api-jsi" "$PACKAGE_DIR/metadata" "$PACKAGE_DIR/ios/vendor"
mkdir -p \
  "$PACKAGE_DIR/native-api-jsi/metadata/include" \
  "$PACKAGE_DIR/metadata" \
  "$PACKAGE_DIR/ios/vendor/libffi/include" \
  "$PACK_DESTINATION"

cp NativeScript/ffi/jsi/NativeApiJsi.h "$PACKAGE_DIR/native-api-jsi/"
cp NativeScript/ffi/jsi/NativeApiJsi.mm "$PACKAGE_DIR/native-api-jsi/"
cp NativeScript/ffi/jsi/NativeApiJsiReactNative.h "$PACKAGE_DIR/native-api-jsi/"
cp metadata-generator/include/Metadata.h "$PACKAGE_DIR/native-api-jsi/metadata/include/"
cp metadata-generator/include/MetadataReader.h "$PACKAGE_DIR/native-api-jsi/metadata/include/"
cp NativeScript/libffi/iphonesimulator-universal/include/ffi.h "$PACKAGE_DIR/ios/vendor/libffi/include/"
cp NativeScript/libffi/iphonesimulator-universal/include/ffitarget.h "$PACKAGE_DIR/ios/vendor/libffi/include/"

cp metadata-generator/metadata/metadata.ios-sim.arm64.nsmd "$PACKAGE_DIR/metadata/"
cp metadata-generator/metadata/metadata.ios-sim.x86_64.nsmd "$PACKAGE_DIR/metadata/"
cp metadata-generator/metadata/metadata.ios.arm64.nsmd "$PACKAGE_DIR/metadata/"

checkpoint "Creating Libffi.xcframework for the TurboModule pod..."
xcodebuild -create-xcframework \
  -library NativeScript/libffi/iphoneos-arm64/libffi.a \
  -headers NativeScript/libffi/iphoneos-arm64/include \
  -library NativeScript/libffi/iphonesimulator-universal/libffi.a \
  -headers NativeScript/libffi/iphonesimulator-universal/include \
  -output "$PACKAGE_DIR/ios/vendor/Libffi.xcframework"

if [[ -n "$VERSION_OVERRIDE" ]]; then
  TMP_FILE=$(mktemp)
  jq --arg version "$VERSION_OVERRIDE" '.version = $version' \
    "$PACKAGE_DIR/package.json" > "$TMP_FILE"
  mv "$TMP_FILE" "$PACKAGE_DIR/package.json"
fi

if [[ "$SKIP_PACK" == "true" ]]; then
  checkpoint "React Native TurboModule package staged."
  exit 0
fi

rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

checkpoint "Packing React Native iOS Hermes TurboModule..."
(
  cd "$PACKAGE_DIR"
  npm pack --pack-destination "$REPO_ROOT/$OUTPUT_DIR"
)

cp "$OUTPUT_DIR"/*.tgz "$PACK_DESTINATION/"

checkpoint "React Native TurboModule npm package created."

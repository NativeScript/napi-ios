#!/bin/bash
set -e
source "$(dirname "$0")/build_utils.sh"

BUILD_CATALYST=$(to_bool ${BUILD_CATALYST:=false}) # disable by default for now
BUILD_IPHONE=$(to_bool ${BUILD_IPHONE:=true})
BUILD_SIMULATOR=$(to_bool ${BUILD_SIMULATOR:=true})
BUILD_VISION=$(to_bool ${BUILD_VISION:=false}) # disable by default for now
BUILD_MACOS=$(to_bool ${BUILD_MACOS:=false}) # disable by default for now
VERBOSE=$(to_bool ${VERBOSE:=false})
BUILD_MACOS_CLI=$(to_bool ${BUILD_MACOS_CLI:=false})
EMBED_METADATA=$(to_bool ${EMBED_METADATA:=false})
CONFIG_BUILD=RelWithDebInfo

TARGET_ENGINE=${TARGET_ENGINE:=v8} # default to v8 for compat
METADATA_SIZE=${METADATA_SIZE:=0}

for arg in $@; do
  case $arg in
    --catalyst|--maccatalyst) BUILD_CATALYST=true ;;
    --no-catalyst|--no-maccatalyst) BUILD_CATALYST=false ;;
    --sim|--simulator) BUILD_SIMULATOR=true ;;
    --no-sim|--no-simulator) BUILD_SIMULATOR=false ;;
    --iphone|--device) BUILD_IPHONE=true ;;
    --no-iphone|--no-device) BUILD_IPHONE=false ;;
    --xr|--vision) BUILD_VISION=true ;;
    --no-xr|--no-vision) BUILD_VISION=false ;;
    --macos) BUILD_MACOS=true ;;
    --no-macos) BUILD_MACOS=false ;;
    --macos-cli) BUILD_MACOS_CLI=true ;;
    --no-macos-cli) BUILD_MACOS_CLI=false ;;
    --verbose|-v) VERBOSE=true ;;
    --v8) TARGET_ENGINE=v8 ;;
    --quickjs) TARGET_ENGINE=quickjs ;;
    --jsc) TARGET_ENGINE=jsc ;;
    --embed-metadata) EMBED_METADATA=true ;;
    --hermes) TARGET_ENGINE=hermes ;;
    --no-engine) TARGET_ENGINE=none ;;
    *) ;;
  esac
done

QUIET=
if ! $VERBOSE; then
  QUIET=-quiet
fi

DEV_TEAM=${DEVELOPMENT_TEAM:-}
DIST=$(PWD)/dist
mkdir -p $DIST

mkdir -p $DIST/intermediates

function cmake_build () {
  local platform="$1"
  shift
  local archs=("$@")
  local is_macos_cli=false

  if [ "$platform" == "macos-cli" ]; then
    platform="macos"
    is_macos_cli=true
  fi

  mkdir -p $DIST/intermediates/$platform

  if $EMBED_METADATA || $is_macos_cli; then

    for arch in "${archs[@]}"; do

      METADATA_SIZE=$(($METADATA_SIZE > $(stat -f%z "./metadata-generator/metadata/metadata.$platform.$arch.nsmd") ? $METADATA_SIZE : $(stat -f%z "./metadata-generator/metadata/metadata.$platform.$arch.nsmd")))

    done

  fi

  cmake -S=./NativeScript -B=$DIST/intermediates/$platform -GXcode -DTARGET_PLATFORM=$platform -DTARGET_ENGINE=$TARGET_ENGINE -DMETADATA_SIZE=$METADATA_SIZE -DBUILD_CLI_BINARY=$is_macos_cli

  cmake --build $DIST/intermediates/$platform --config $CONFIG_BUILD
}

if $BUILD_CATALYST; then
checkpoint "Building NativeScript for Mac Catalyst"

# cmake_build catalyst x86_64 arm64

fi

if $BUILD_SIMULATOR; then
checkpoint "Building NativeScript for iPhone (simulator)"

cmake_build ios-sim x86_64 arm64

fi

if $BUILD_IPHONE; then
checkpoint "Building NativeScript for iPhone (physical)"

cmake_build ios arm64

fi

if $BUILD_MACOS; then
checkpoint "Building NativeScript for macOS"

cmake_build macos x86_64 arm64

fi

if $BUILD_VISION; then

checkpoint "Building NativeScript for visionOS (physical)"

# cmake_build visionos arm64

checkpoint "Building NativeScript for visionOS (simulator)"

# cmake_build visionos-sim x86_64 arm64

fi

if $BUILD_MACOS_CLI; then

checkpoint "Building NativeScript for macOS CLI"

cmake_build macos-cli x86_64 arm64

fi

XCFRAMEWORKS=()
if $BUILD_CATALYST; then
  XCFRAMEWORKS+=( -framework "$DIST/intermediates/catalyst/$CONFIG_BUILD-maccatalyst/NativeScript.framework"
                  -debug-symbols "$DIST/intermediates/catalyst/$CONFIG_BUILD-maccatalyst/NativeScript.framework.dSYM" )
fi

if $BUILD_SIMULATOR; then
  XCFRAMEWORKS+=( -framework "$DIST/intermediates/ios-sim/$CONFIG_BUILD-iphonesimulator/NativeScript.framework"
                  -debug-symbols "$DIST/intermediates/ios-sim/$CONFIG_BUILD-iphonesimulator/NativeScript.framework.dSYM" )
fi

if $BUILD_IPHONE; then
  XCFRAMEWORKS+=( -framework "$DIST/intermediates/ios/$CONFIG_BUILD-iphoneos/NativeScript.framework"
                  -debug-symbols "$DIST/intermediates/ios/$CONFIG_BUILD-iphoneos/NativeScript.framework.dSYM" )
fi

if $BUILD_VISION; then
  XCFRAMEWORKS+=( -framework "$DIST/intermediates/visionos/$CONFIG_BUILD-xros/NativeScript.framework"
                  -debug-symbols "$DIST/intermediates/visionos/$CONFIG_BUILD-xros/NativeScript.framework.dSYM" )

  XCFRAMEWORKS+=( -framework "$DIST/intermediates/visionos-sim/$CONFIG_BUILD-xros/NativeScript.framework"
                  -debug-symbols "$DIST/intermediates/visionos-sim/$CONFIG_BUILD-xros/NativeScript.framework.dSYM" )
fi

if [[ -n "${XCFRAMEWORKS[@]}" ]]; then
  if [[ "$TARGET_ENGINE" == "none" ]]; then
    checkpoint "Creating the XCFramework for iOS (NativeScript.apple.node)"

    # We adhere to the prebuilds standard as described here:
    # https://github.com/callstackincubator/react-native-node-api/blob/9b231c14459b62d7df33360f930a00343d8c46e6/docs/PREBUILDS.md
    OUTPUT_DIR="packages/ios/build/$CONFIG_BUILD/NativeScript.apple.node"
    rm -rf $OUTPUT_DIR
    deno run -A ./scripts/build_xcframework.mts --output "$OUTPUT_DIR" ${XCFRAMEWORKS[@]}
  else
    checkpoint "Creating NativeScript.xcframework"

    OUTPUT_DIR="$DIST/NativeScript.xcframework"
    rm -rf $OUTPUT_DIR
    xcodebuild -create-xcframework ${XCFRAMEWORKS[@]} -output "$OUTPUT_DIR"
  fi
fi

# We're currently distributing two separate packages:
# 1. UIKit-based (@nativescript/ios-node-api)
# 2. AppKit-based (@nativescript/macos-node-api)
# As such, there's no point bundling both UIKit-based and AppKit-based into a
# single XCFramework.
if $BUILD_MACOS; then
  XCFRAMEWORKS=( -framework "$DIST/intermediates/macos/$CONFIG_BUILD/NativeScript.framework"
                  -debug-symbols "$DIST/intermediates/macos/$CONFIG_BUILD/NativeScript.framework.dSYM" )

  if [[ "$TARGET_ENGINE" == "none" ]]; then
    checkpoint "Creating the XCFramework for macOS (NativeScript.apple.node)"

    # We adhere to the prebuilds standard as described here:
    # https://github.com/callstackincubator/react-native-node-api/blob/9b231c14459b62d7df33360f930a00343d8c46e6/docs/PREBUILDS.md
    OUTPUT_DIR="packages/macos/build/$CONFIG_BUILD/NativeScript.apple.node"
    rm -rf $OUTPUT_DIR
    deno run -A ./scripts/build_xcframework.mts --output "$OUTPUT_DIR" ${XCFRAMEWORKS[@]}
  else
    checkpoint "Creating NativeScript.node for macOS"
    cp -r "$DIST/intermediates/macos/$CONFIG_BUILD/libNativeScript.dylib" "$DIST/NativeScript.node"
  fi
fi

if $BUILD_MACOS_CLI; then

checkpoint "Creating NativeScript CLI"

cp -r "$DIST/intermediates/macos/$CONFIG_BUILD/NativeScript" "$DIST/nsr"

fi

# rm -rf "$DIST/intermediates"

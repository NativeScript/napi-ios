#!/bin/bash
set -e
source "$(dirname "$0")/build_utils.sh"

function to_bool() {
  local arg="$1"
  case "$(echo "$arg" | tr '[:upper:]' '[:lower:]')" in
    [0-9]+)
      if [ $arg -eq 0 ]; then
        echo false
      else
        echo true
      fi
      ;;
    n|no|f|false) echo false ;;
    y|yes|t|true) echo true ;;
    * )
      if [ -n "$arg" ]; then
        echo "warning: invalid boolean argument ('$arg'). Expected true or false" >&2
      fi
      echo false
      ;;
  esac;
}

BUILD_CATALYST=$(to_bool ${BUILD_CATALYST:=false}) # disable by default for now
BUILD_IPHONE=$(to_bool ${BUILD_IPHONE:=true})
BUILD_SIMULATOR=$(to_bool ${BUILD_SIMULATOR:=true})
BUILD_VISION=$(to_bool ${BUILD_VISION:=false}) # disable by default for now
BUILD_MACOS=$(to_bool ${BUILD_MACOS:=false}) # disable by default for now
VERBOSE=$(to_bool ${VERBOSE:=false})
BUILD_MACOS_CLI=$(to_bool ${BUILD_MACOS_CLI:=false})
EMBED_METADATA=$(to_bool ${EMBED_METADATA:=false})
CONFIG_BUILD=RelWithDebugInfo
CONFIG_SIMPLE=Debug

ANY_FRAMEWORK=$(to_bool ${ANY_FRAMEWORK:=false})
if $BUILD_CATALYST || $BUILD_IPHONE || $BUILD_SIMULATOR || $BUILD_VISION || $BUILD_MACOS; then
  ANY_FRAMEWORK=$(to_bool ${ANY_FRAMEWORK:=true})
fi

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
  local is_macos_cli=false

  if [ "$platform" == "macos-cli" ]; then
    platform="macos"
    is_macos_cli=true
  fi

  mkdir -p $DIST/intermediates/$platform

  if $EMBED_METADATA || $is_macos_cli; then

    for arch in x86_64 arm64; do

      METADATA_SIZE=$(($METADATA_SIZE > $(stat -f%z "./metadata-generator/metadata.$platform.$arch.nsmd") ? $METADATA_SIZE : $(stat -f%z "./metadata-generator/metadata.$platform.$arch.nsmd")))

    done

  fi

  cmake -S=./NativeScript -B=$DIST/intermediates/$platform -GXcode -DTARGET_PLATFORM=$platform -DTARGET_ENGINE=$TARGET_ENGINE -DMETADATA_SIZE=$METADATA_SIZE -DBUILD_CLI_BINARY=$is_macos_cli

  cmake --build $DIST/intermediates/$platform --config $CONFIG_BUILD
}

if $BUILD_CATALYST; then
checkpoint "Building NativeScript for Mac Catalyst"

# cmake_build catalyst

fi

if $BUILD_SIMULATOR; then
checkpoint "Building NativeScript for iphone simulators (multi-arch)"

cmake_build ios-sim

fi

if $BUILD_IPHONE; then
checkpoint "Building NativeScript for ARM64 device"

cmake_build ios

fi

if $BUILD_MACOS; then
checkpoint "Building NativeScript for macOS"

cmake_build macos

fi

if $BUILD_VISION; then

checkpoint "Building NativeScript for visionOS Device"

# cmake_build visionos

checkpoint "Building NativeScript for visionOS Simulators"

# cmake_build visionos-sim

fi

if $BUILD_MACOS_CLI; then

checkpoint "Building NativeScript for macOS CLI"

cmake_build macos-cli

fi

XCFRAMEWORKS=()
if $BUILD_CATALYST; then
  XCFRAMEWORKS+=( -framework "$DIST/intermediates/catalyst/$CONFIG_SIMPLE-maccatalyst/NativeScript.framework"
                  -debug-symbols "$DIST/intermediates/catalyst/$CONFIG_SIMPLE-maccatalyst/NativeScript.framework.dSYM" )
fi

if $BUILD_SIMULATOR; then
  XCFRAMEWORKS+=( -framework "$DIST/intermediates/ios-sim/$CONFIG_SIMPLE-iphonesimulator/NativeScript.framework"
                  -debug-symbols "$DIST/intermediates/ios-sim/$CONFIG_SIMPLE-iphonesimulator/NativeScript.framework.dSYM" )
fi

if $BUILD_IPHONE; then
  XCFRAMEWORKS+=( -framework "$DIST/intermediates/ios/$CONFIG_SIMPLE-iphoneos/NativeScript.framework"
                  -debug-symbols "$DIST/intermediates/ios/$CONFIG_SIMPLE-iphoneos/NativeScript.framework.dSYM" )
fi

if $BUILD_MACOS; then
  XCFRAMEWORKS+=( -framework "$DIST/intermediates/macos/Release/NativeScript.framework"
                  -debug-symbols "$DIST/intermediates/macos/$CONFIG_SIMPLE/NativeScript.framework.dSYM" )
fi

if $BUILD_VISION; then
  XCFRAMEWORKS+=( -framework "$DIST/intermediates/visionos/$CONFIG_SIMPLE-xros/NativeScript.framework"
                  -debug-symbols "$DIST/intermediates/visionos/$CONFIG_SIMPLE-xros/NativeScript.framework.dSYM" )

  XCFRAMEWORKS+=( -framework "$DIST/intermediates/visionos-sim/$CONFIG_SIMPLE-xros/NativeScript.framework"
                  -debug-symbols "$DIST/intermediates/visionos-sim/$CONFIG_SIMPLE-xros/NativeScript.framework.dSYM" )
fi

if $ANY_FRAMEWORK; then

checkpoint "Creating NativeScript.xcframework"
OUTPUT_DIR="$DIST/NativeScript.xcframework"
rm -rf $OUTPUT_DIR
xcodebuild -create-xcframework ${XCFRAMEWORKS[@]} -output "$OUTPUT_DIR"

fi

if $BUILD_MACOS; then

checkpoint "Creating NativeScript.node"

cp -r "$DIST/intermediates/macos/$CONFIG_SIMPLE/libNativeScript.dylib" "$DIST/NativeScript.node"

fi

if $BUILD_MACOS_CLI; then

checkpoint "Creating NativeScript CLI"

cp -r "$DIST/intermediates/macos/$CONFIG_SIMPLE/NativeScript" "$DIST/ns"

fi

rm -rf "$DIST/intermediates"

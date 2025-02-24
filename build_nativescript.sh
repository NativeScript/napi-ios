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

BUILD_CATALYST=$(to_bool ${BUILD_CATALYST:=true})
BUILD_IPHONE=$(to_bool ${BUILD_IPHONE:=true})
BUILD_SIMULATOR=$(to_bool ${BUILD_SIMULATOR:=true})
BUILD_VISION=$(to_bool ${BUILD_VISION:=true})
BUILD_MACOS=$(to_bool ${BUILD_MACOS:=true})
VERBOSE=$(to_bool ${VERBOSE:=false})
EMBED_METADATA=$(to_bool ${EMBED_METADATA:=false})

TARGET_ENGINE=${TARGET_ENGINE:=none}
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
    --verbose|-v) VERBOSE=true ;;
    --v8) TARGET_ENGINE=v8 ;;
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

checkpoint "Cleanup NativeScript"
# xcodebuild -project v8ios.xcodeproj \
#            -target "NativeScript" \
#            -configuration Release clean \
#            $QUIET

if $BUILD_CATALYST; then
checkpoint "Building NativeScript for Mac Catalyst"
# xcodebuild archive -project v8ios.xcodeproj \
#                    -scheme "NativeScript" \
#                    -configuration Release \
#                    -destination "platform=macOS,variant=Mac Catalyst" \
#                    $QUIET \
#                    EXCLUDED_ARCHS="x86_64" \
#                    SKIP_INSTALL=NO \
#                    BUILD_LIBRARIES_FOR_DISTRIBUTION=YES \
#                    INCLUDE_DEFAULT_METADATA=$INCLUDE_DEFAULT_METADATA\
#                    -archivePath $DIST/intermediates/NativeScript.maccatalyst.xcarchive
fi

if $BUILD_SIMULATOR; then
checkpoint "Building NativeScript for iphone simulators (multi-arch)"
# xcodebuild archive -project v8ios.xcodeproj \
#                    -scheme "NativeScript" \
#                    -configuration Release \
#                    -destination "generic/platform=iOS Simulator" \
#                    $QUIET \
#                    EXCLUDED_ARCHS="i386" \
#                    DEVELOPMENT_TEAM=$DEV_TEAM \
#                    SKIP_INSTALL=NO \
#                    BUILD_LIBRARIES_FOR_DISTRIBUTION=YES \
#                    INCLUDE_DEFAULT_METADATA=$INCLUDE_DEFAULT_METADATA\
#                    -archivePath $DIST/intermediates/NativeScript.iphonesimulator.xcarchive

mkdir -p $DIST/intermediates/ios-sim

if $EMBED_METADATA; then

  for arch in x86_64 arm64; do

    METADATA_SIZE=$(($METADATA_SIZE > $(stat -f%z "./metadata-generator/metadata.ios.$arch.nsmd") ? $METADATA_SIZE : $(stat -f%z "./metadata-generator/metadata.ios.$arch.nsmd")))

  done

fi

cmake -S=./NativeScript -B=$DIST/intermediates/ios-sim -GXcode -DTARGET_PLATFORM=ios-sim -DTARGET_ENGINE=$TARGET_ENGINE -DMETADATA_SIZE=$METADATA_SIZE

cmake --build $DIST/intermediates/ios-sim --config Release

fi

if $BUILD_IPHONE; then
checkpoint "Building NativeScript for ARM64 device"
# xcodebuild archive -project v8ios.xcodeproj \
#                    -scheme "NativeScript" \
#                    -configuration Release \
#                    -destination "generic/platform=iOS" \
#                    $QUIET \
#                    EXCLUDED_ARCHS="armv7" \
#                    DEVELOPMENT_TEAM=$DEV_TEAM \
#                    SKIP_INSTALL=NO \
#                    BUILD_LIBRARIES_FOR_DISTRIBUTION=YES \
#                    INCLUDE_DEFAULT_METADATA=$INCLUDE_DEFAULT_METADATA\
#                    -archivePath $DIST/intermediates/NativeScript.iphoneos.xcarchive

mkdir -p $DIST/intermediates/ios

if $EMBED_METADATA; then

  for arch in x86_64 arm64; do

    METADATA_SIZE=$(($METADATA_SIZE > $(stat -f%z "./metadata-generator/metadata.ios.$arch.nsmd") ? $METADATA_SIZE : $(stat -f%z "./metadata-generator/metadata.ios.$arch.nsmd")))

  done

fi

cmake -S=./NativeScript -B=$DIST/intermediates/ios -GXcode -DTARGET_PLATFORM=ios -DTARGET_ENGINE=$TARGET_ENGINE -DMETADATA_SIZE=$METADATA_SIZE

cmake --build $DIST/intermediates/ios --config Release

fi

if $BUILD_MACOS; then
checkpoint "Building NativeScript for macOS"
# xcodebuild archive -project v8ios.xcodeproj \
#                    -scheme "NativeScript" \
#                    -configuration Release \
#                    -destination "generic/platform=iOS" \
#                    $QUIET \
#                    EXCLUDED_ARCHS="armv7" \
#                    DEVELOPMENT_TEAM=$DEV_TEAM \
#                    SKIP_INSTALL=NO \
#                    BUILD_LIBRARIES_FOR_DISTRIBUTION=YES \
#                    INCLUDE_DEFAULT_METADATA=$INCLUDE_DEFAULT_METADATA\
#                    -archivePath $DIST/intermediates/NativeScript.iphoneos.xcarchive

mkdir -p $DIST/intermediates/macos

if $EMBED_METADATA; then

  for arch in x86_64 arm64; do

    METADATA_SIZE=$(($METADATA_SIZE > $(stat -f%z "./metadata-generator/metadata.macos.$arch.nsmd") ? $METADATA_SIZE : $(stat -f%z "./metadata-generator/metadata.macos.$arch.nsmd")))

  done

fi

cmake -S=./NativeScript -B=$DIST/intermediates/macos -GXcode -DTARGET_PLATFORM=macos -DTARGET_ENGINE=$TARGET_ENGINE -DMETADATA_SIZE=$METADATA_SIZE

cmake --build $DIST/intermediates/macos --config Release

fi

if $BUILD_CATALYST; then
checkpoint "Building NativeScript for Mac Catalyst"
# xcodebuild archive -project v8ios.xcodeproj \
#                    -scheme "NativeScript" \
#                    -configuration Release \
#                    -destination "generic/platform=macOS,variant=Mac Catalyst" \
#                    $QUIET \
#                    EXCLUDED_ARCHS="x86_64" \
#                    SKIP_INSTALL=NO \
#                    BUILD_LIBRARY_FOR_DISTRIBUTION=YES \
#                    -archivePath $DIST/intermediates/NativeScript.maccatalyst.xcarchive
fi

if $BUILD_VISION; then

checkpoint "Building NativeScript for visionOS Device"
# xcodebuild archive -project v8ios.xcodeproj \
#                    -scheme "NativeScript" \
#                    -configuration Release \
#                    -destination "generic/platform=visionOS" \
#                    $QUIET \
#                    EXCLUDED_ARCHS="i386 x86_64" \
#                    VALID_ARCHS=arm64 \
#                    DEVELOPMENT_TEAM=$DEV_TEAM \
#                    SKIP_INSTALL=NO \
#                    BUILD_LIBRARY_FOR_DISTRIBUTION=YES \
#                    -archivePath $DIST/intermediates/NativeScript.xros.xcarchive

# checkpoint "Building NativeScript for visionOS Simulators"
# xcodebuild archive -project v8ios.xcodeproj \
#                    -scheme "NativeScript" \
#                    -configuration Release \
#                    -destination "generic/platform=visionOS Simulator" \
#                    $QUIET \
#                    EXCLUDED_ARCHS="i386 x86_64" \
#                    VALID_ARCHS=arm64 \
#                    DEVELOPMENT_TEAM=$DEV_TEAM \
#                    SKIP_INSTALL=NO \
#                    BUILD_LIBRARY_FOR_DISTRIBUTION=YES \
#                    -archivePath $DIST/intermediates/NativeScript.xrsimulator.xcarchive
fi

XCFRAMEWORKS=()
if $BUILD_CATALYST; then
  XCFRAMEWORKS+=( -framework "$DIST/intermediates/NativeScript.maccatalyst.xcarchive/Products/Library/Frameworks/NativeScript.framework" \
                  -debug-symbols "$DIST/intermediates/NativeScript.maccatalyst.xcarchive/dSYMs/NativeScript.framework.dSYM" )
fi

if $BUILD_SIMULATOR; then
  XCFRAMEWORKS+=( -framework "$DIST/intermediates/ios-sim/Release-iphonesimulator/NativeScript.framework" )
fi

if $BUILD_IPHONE; then
  XCFRAMEWORKS+=( -framework "$DIST/intermediates/ios/Release-iphoneos/NativeScript.framework" )
fi

if $BUILD_MACOS; then
  XCFRAMEWORKS+=( -framework "$DIST/intermediates/macos/Release/NativeScript.framework" )
fi

if $BUILD_VISION; then
  XCFRAMEWORKS+=( -framework "$DIST/intermediates/NativeScript.xros.xcarchive/Products/Library/Frameworks/NativeScript.framework" \
                  -debug-symbols "$DIST/intermediates/NativeScript.xros.xcarchive/dSYMs/NativeScript.framework.dSYM" )
  XCFRAMEWORKS+=( -framework "$DIST/intermediates/NativeScript.xrsimulator.xcarchive/Products/Library/Frameworks/NativeScript.framework" \
                  -debug-symbols "$DIST/intermediates/NativeScript.xrsimulator.xcarchive/dSYMs/NativeScript.framework.dSYM" )
fi

if [ "$TARGET_ENGINE" != "none" ]; then

checkpoint "Creating NativeScript.xcframework"
OUTPUT_DIR="$DIST/NativeScript.xcframework"
rm -rf $OUTPUT_DIR
xcodebuild -create-xcframework ${XCFRAMEWORKS[@]} -output "$OUTPUT_DIR"

else

checkpoint "Creating NativeScript.node"

cp -r "$DIST/intermediates/macos/Release/libNativeScript.dylib" "$DIST/NativeScript.node"

fi

rm -rf "$DIST/intermediates"


# DSYM_OUTPUT_DIR="$DIST/NativeScript.framework.dSYM"
# cp -r "$DIST/NativeScript.iphoneos.xcarchive/dSYMs/NativeScript.framework.dSYM/" $DSYM_OUTPUT_DIR
# lipo -create \
#     "$DIST/NativeScript.iphonesimulator.xcarchive/dSYMs/NativeScript.framework.dSYM/Contents/Resources/DWARF/NativeScript" \
#     "$DIST/NativeScript.iphoneos.xcarchive/dSYMs/NativeScript.framework.dSYM/Contents/Resources/DWARF/NativeScript" \
#     -output "$DSYM_OUTPUT_DIR/Contents/Resources/DWARF/NativeScript"

# pushd $DIST
# zip -qr "NativeScript.framework.dSYM.zip" "NativeScript.framework.dSYM"
# zip -qr "NativeScript.macos.framework.dSYM.zip" "NativeScript.maccatalyst.xcarchive/dSYMs/NativeScript.framework.dSYM"
# rm -rf "NativeScript.framework.dSYM"
# popd

# rm -rf "$DIST/NativeScript.maccatalyst.xcarchive"
# rm -rf "$DIST/NativeScript.x86_64-iphonesimulator.xcarchive"
# rm -rf "$DIST/NativeScript.arm64-iphonesimulator.xcarchive"
# rm -rf "$DIST/NativeScript.iphonesimulator.xcarchive"
# rm -rf "$DIST/NativeScript.iphoneos.xcarchive"

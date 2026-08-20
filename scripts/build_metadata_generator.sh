#!/bin/bash
set -e
source "$(dirname "$0")/build_utils.sh"

function metadata_generator_source_hash {
    find src include CMakeLists.txt -type f -print | LC_ALL=C sort | xargs shasum | awk '{print $1}' | shasum | awk '{print $1}'
}

function build {
    rm -rf build
    mkdir build
    cmake -B build -DCMAKE_BUILD_TYPE=Release -DMETADATA_BINARY_ARCH=$1 -DCMAKE_OSX_ARCHITECTURES=$1
    cmake --build build --target clean
    cmake --build build -j$NUMJOBS
    mkdir "dist/$1"
    cp -r "build/bin" "dist/$1"
}

pushd "metadata-generator"
rm -rf dist
mkdir dist

HOST_ARCH=$(uname -m)
case "$HOST_ARCH" in
    arm64|x86_64) ;;
    *)
        echo "Unsupported metadata generator host architecture: $HOST_ARCH" >&2
        exit 1
        ;;
esac

XCRUN_CLANG=$(xcrun --find clang)
TOOLCHAIN_USR_DIR=$(cd "$(dirname "$XCRUN_CLANG")/.." && pwd)
LIBCLANG_PATH="$TOOLCHAIN_USR_DIR/lib/libclang.dylib"
LIBCLANG_ARCHS=$(lipo -archs "$LIBCLANG_PATH")

for arch in arm64 x86_64; do
    if [[ " $LIBCLANG_ARCHS " != *" $arch "* ]]; then
        checkpoint "Skipping metadata generator for $arch (libclang has: $LIBCLANG_ARCHS)"
        continue
    fi
    checkpoint "Building metadata generator for $arch ..."
    build "$arch"
    otool -L "dist/$arch/bin/objc-metadata-generator"
done

if [ ! -x "dist/$HOST_ARCH/bin/objc-metadata-generator" ]; then
    echo "Toolchain libclang cannot build the host metadata generator architecture $HOST_ARCH." >&2
    exit 1
fi
metadata_generator_source_hash > dist/.source_hash
rm -rf build
popd

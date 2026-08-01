#!/bin/bash
set -e
source "$(dirname "$0")/build_utils.sh"

function metadata_generator_source_hash {
    find src include tests symbol-analyzer CMakeLists.txt build-step-metadata-generator.py \
      \( -name target -type d -prune \) -o -type f -print | \
      LC_ALL=C sort | xargs shasum | awk '{print $1}' | shasum | awk '{print $1}'
}

function build {
    rm -rf build
    mkdir build
    cmake -B build -DCMAKE_BUILD_TYPE=Release -DMETADATA_BINARY_ARCH=$1 -DCMAKE_OSX_ARCHITECTURES=$1
    cmake --build build --target clean
    cmake --build build -j$NUMJOBS
    mkdir "dist/$1"
    cp -r "build/bin" "dist/$1"

    local rust_arch="$1"
    if [ "$1" = "arm64" ]; then
      rust_arch="aarch64"
    fi
    local rust_target="${rust_arch}-apple-darwin"
    cargo build --locked --release --manifest-path symbol-analyzer/Cargo.toml --target "$rust_target"
    cp "symbol-analyzer/target/$rust_target/release/ns-metadata-symbols" "dist/$1/bin/"
}

pushd "metadata-generator"
rm -rf dist
mkdir dist
checkpoint "Building metadata generator for x86_64 ..."
build "x86_64"
# make sure the binary is linked against the system libc++ instead of an @rpath one (which happens when compiling on arm64)
# todo: perhaps there is a better way to do this with cmake?
#install_name_tool -change @rpath/libc++.1.dylib /usr/lib/libc++.1.dylib dist/x86_64/bin/objc-metadata-generator
otool -L  dist/x86_64/bin/objc-metadata-generator

checkpoint "Building metadata generator for arm64 ..."
build "arm64"
otool -L  dist/arm64/bin/objc-metadata-generator
metadata_generator_source_hash > dist/.source_hash
rm -rf build
popd

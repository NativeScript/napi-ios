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
mkdir -p dist
architectures=${METADATA_GENERATOR_ARCHS:-"x86_64 arm64"}
for architecture in $architectures; do
    case "$architecture" in
        x86_64|arm64) ;;
        *) echo "Unsupported metadata generator architecture: $architecture" >&2; exit 2 ;;
    esac

    checkpoint "Building metadata generator for $architecture ..."
    rm -rf "dist/$architecture"
    build "$architecture"
    otool -L "dist/$architecture/bin/objc-metadata-generator"
done
metadata_generator_source_hash > dist/.source_hash
rm -rf build
popd

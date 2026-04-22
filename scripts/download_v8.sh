#!/bin/bash
set -e
source "$(dirname "$0")/build_utils.sh"

# https://github.com/DjDeveloperr/v8-build/releases/download/v14.3.92-1/libv8_monolith-mac.zip
V8_VERSION="v14.3.92-1"

function download_v8() {
    checkpoint "Downloading v8 (version $V8_VERSION)..."
    
    mkdir -p /tmp/v8-dl/

    curl -L https://github.com/DjDeveloperr/v8-build/releases/download/$V8_VERSION/libv8_monolith-mac.zip -o /tmp/v8-dl/v8-$V8_VERSION-mac.zip
    curl -L https://github.com/DjDeveloperr/v8-build/releases/download/$V8_VERSION/libv8_monolith-ios.zip -o /tmp/v8-dl/v8-$V8_VERSION-ios.zip
    
    checkpoint 'extracting v8...'
    unzip -o /tmp/v8-dl/v8-$V8_VERSION-mac.zip -d ./Frameworks
    unzip -o /tmp/v8-dl/v8-$V8_VERSION-ios.zip -d ./Frameworks
}

if [ ! -d "./Frameworks/libv8_monolith.xcframework" ]; then
    download_v8
fi

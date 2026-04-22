# @nativescript/ios-node-api

An embeddable, engine-agnostic NativeScript runtime for iOS based on Node-API.

## Installation

These steps assume that you're making an iOS app that includes a Node-API-capable JavaScript runtime and manages its JS dependencies using npm (or similar package managers).

First, install the npm package:

```sh
npm install @nativescript/ios-node-api
```

Next, embed the xcframework provided at `build/ios-universal/NativeScript.xcframework` into your iOS app. For convenience, we provide `NativeScript.podspec` so that you can link it as a local podspec. For React Native (or Expo) apps, this will be autolinked.

## Usage

Until we have some example projects to provide, a few example usages in an Expo app are shown in this [tweet](https://x.com/birch_js/status/1773401773266604240).

## Contributing

To build `@nativescript/ios-node-api` for yourself:

```sh
git clone git@github.com:NativeScript/napi-ios.git
cd napi-ios
npm install

# This script does the following:
# 1. Builds the metadata generator, which consists of the following steps:
#    - Download LLVM
#    - Inside ./metadata-generator, run cmake to produce:
#      - ./metadata-generator/dist/arm64/bin/objc-metadata-generator
#      - ./metadata-generator/dist/x86_64/bin/objc-metadata-generator
# 2. Generates metadata for iOS and macOS:
#    - ./metadata-generator/metadata/metadata.ios.arm64.{h,nsmd}
#    - ./metadata-generator/metadata/metadata.ios-sim.{arm64,x86_64}.{h,nsmd}
#    - ./metadata-generator/metadata/metadata.macos.{arm64,x86_64}.{h,nsmd}
# 3. Builds the NativeScript iOS XCFramework:
#    - ./packages/ios-node-api/build/RelWithDebInfo/NativeScript.apple.node
# 4. Builds the NativeScript macOS XCFramework:
#    - ./packages/macos-node-api/build/RelWithDebInfo/NativeScript.apple.node
./scripts/build_all_react_native.sh
```

Currently, we are following a convention of committing most, if not all, of these build files to source, so you may find that it's ready set up to begin with.

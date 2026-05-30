> [!NOTE]  
> The instructions below detail how to get started developing NativeScript's V8-based iOS runtime, `@nativescript/ios`.
>
> Package docs:
>
> - `@nativescript/ios`: [packages/ios/README.md](packages/ios/README.md)
> - `@nativescript/macos`: [packages/macos/README.md](packages/macos/README.md)
> - `@nativescript/visionos`: [packages/visionos/README.md](packages/visionos/README.md)
> - `@nativescript/ios-node-api`: [packages/ios-node-api/README.md](packages/ios-node-api/README.md)
> - `@nativescript/macos-node-api`: [packages/macos-node-api/README.md](packages/macos-node-api/README.md)

# Getting Started

**Prerequisites**:
- Download v8 static libraries from here:
  - Create a `Frameworks` folder at the root. Unzip and move the `v8_ios` folder inside so they are at `Frameworks/v8_ios`.

To start diving into the v8 iOS runtime make sure you have Xcode and [Homebrew](https://brew.sh/) installed, and then run the following
```bash
# Install CMake
brew install cmake

# Install jq (for scripting json replacements)
brew install jq

# (Optional) Install clang-format to format the code
brew install clang-format

# To avoid errors, you might need to link cmake to: /usr/local/bin/cmake
# xcode doesn't read your profile during the build step, which causes it to ignore the PATH
sudo ln -s /usr/local/bin/cmake $(which cmake)

# Clone repo
git clone https://github.com/NativeScript/ios.git

# Initialize and clone the submodules
cd ios
git submodule update --init

# Ensure that you have the required llvm binaries for building the metadata generator
./scripts/download_llvm.sh

sudo gem install xcodeproj
sudo gem install cocoapods

# Open the runtime in Xcode
open NativeScriptRuntime.xcodeproj
```

Select the `TestRunner` target and an emulator and hit Run (the play button).

<img width="453" alt="Screenshot 2020-09-09 at 18 25 43" src="https://user-images.githubusercontent.com/879060/92626234-ee627680-f2c9-11ea-941b-6b43600f54e4.png">

This should take a while, but once built the emulator should start and show a black screen (this is normal). In this phase the app will run all the built-in tests, and report the results to the console:
```
Runtime initialization took 55ms
2020-09-09 18:30:37.797265+0200 TestRunner[14285:1238340] CONSOLE LOG: Application Start!
2020-09-09 18:30:38.288740+0200 TestRunner[14285:1238340] No implementation found for exposed method "nonExistingSelector"
2020-09-09 18:30:49.720055+0200 TestRunner[14285:1238340] CONSOLE LOG: SUCCESS: 684 specs, 0 failures, 0 skipped, 0 disabled in 11.81s.
```

If all tests pass, everything is good! At this point you can make changes to the runtime, add breakpoints and step through with the debugger. In the next section we'll see how to attach the runtime to an existing NativeScript application allowing us to debug runtime issues in actual apps.

# Attaching the runtime to a NativeScript app

In the existing app, we need to prepare the Xcode project using `ns prepare ios`. This will create a folder named `platforms/ios` and in there a `<appname>.xcworkspace` (or .xcodeproject but note the following...).

**IMPORTANT**: You can only attach the runtime to a `.xcworkspace` project (not a `.xcodeproj` project). If your app's platforms/ios folder does not contain a .xcworkspace file yet, you can do the following:

Add a new file `App_Resources/iOS/Podfile` with the following contents: 

```
pod 'IQKeyboardManager'
```

Now `ns clean` and prepare again with `ns prepare ios`.
This will make sure when the iOS project is generated that you end up with a .xcworkspace file so attaching the v8 runtime source works properly.

You can now open the `platforms/ios/{project-name}.xcworkspace` file in Xcode and then drag the `NativeScriptRuntime.xcodeproj` from the root of this repo under the `<appname>` in the Xcode sidebar.

<img width="941" alt="Screenshot 2020-09-09 at 18 46 18" src="https://user-images.githubusercontent.com/879060/92628228-c294c000-f2cc-11ea-8822-58df689d3cd3.png">

Remove the `NativeScript.xcframework` and `TKLiveSync.xcframework` from the General tab, as we will no longer be using the framework from node_modules and instead will use the source directly:

<img width="693" alt="Screenshot 2020-09-09 at 18 47 23" src="https://user-images.githubusercontent.com/879060/92628311-e6f09c80-f2cc-11ea-8977-201517badc3b.png">

Hitting Run in Xcode should start the app in the simulator, and we can now add breakpoints to the runtime and step through it with the debugger. To apply changes to the javascript, make sure you run `ns prepare ios` to re-bundle it into the `platforms/ios` folder.

## Only required when running on a physical device

Add the `Nativescript.framework` and `TKLiveSync.framework` from the NativeScriptRuntime workspace:

<img width="402" alt="Screen Shot 2021-04-12 at 11 49 10 AM" src="https://user-images.githubusercontent.com/2379994/114423589-51c8c580-9b85-11eb-9d30-eb1cbf73454a.png">

## Troubleshooting

If you encounter vague errors like this when building your app with the runtime included (This has been observed sometimes while Profiling apps in Xcode):

```
/path/to/ios/NativeScript/inspector/src/base/atomicops.h:311:11: No matching function for call to 'Relaxed_Load'
```

This is most likely related to `Build Active Architecture Only` setting in Xcode for various targets (your app and the included NativeScript runtime). You should check to make sure your app `Build Settings` and the NativeScript runtime targets `NativeScript` and `TKLiveSync` Build Settings are set to YES for both Debug and Release. See this reference:
https://github.com/QuickBlox/quickblox-ios-sdk/issues/993#issuecomment-379656716


# Overview

POC showing the [{N} iOS runtime](https://github.com/NativeScript/ios-runtime) running with the V8 engine.

Supported architectures:

 - x86_64
 - arm64

iOS deployment target:
 - 9.0

The `--jitless` mode in which V8 is running is explained in the following [document](https://docs.google.com/document/d/1YYU17VqFMBeSJ8whCqXknOGXtXDVDLulchsTkmi0YdI/edit#heading=h.mz26kq2dsu6k)

# V8 Artifacts

Local V8 source build and patch scripts have been removed from this repo.

To provision V8 artifacts, use:

```bash
./scripts/download_v8.sh
```

This downloads and extracts prebuilt V8 binaries into `Frameworks/`.

# Hermes Artifacts

To provision Hermes artifacts, use:

```bash
./scripts/download_hermes.sh
```

This downloads and extracts a prebuilt Hermes XCFramework into `Frameworks/`.

# Building a Distribution Package

1. Bump the version in `packages/ios/package.json`

2. Run: `npm run update-version:ios` (*This will update the runtime headers with version info*)

3. Build & pack: `npm run build-ios`

This will create: `packages/ios/dist/nativescript-ios-{version}.tgz` NPM package ready for publishing.

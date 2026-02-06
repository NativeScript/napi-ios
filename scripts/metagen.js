#!/usr/bin/env node

const { spawnSync } = require("node:child_process");
const fs = require("node:fs/promises");
const path = require("node:path");

const COMMON_FRAMEWORKS = [
  "Foundation",
  "CoreFoundation",
  "CoreGraphics",
  "CoreText",
  "QuartzCore",
  "WebKit",
  "Metal",
  "MetalKit",
  "MetalPerformanceShaders",
  "SpriteKit",
  "SceneKit",
  "ModelIO",
  "GameController",
  "GameKit",
  "GameplayKit",
  "CloudKit",
  "Intents",
  "Contacts",
  "CoreSpotlight",
  "JavaScriptCore",
  "UserNotifications",
  "CoreHaptics",
  "EventKit",
  "AddressBook",
  "MapKit",
  "CoreServices",
  "CoreMedia",
  "CoreVideo",
  "CoreImage",
  "CoreData",
  "CoreMIDI",
  "CoreML",
  "CoreBluetooth",
  "CoreLocation",
  "CoreMotion",
  "MLCompute",
  "AudioToolbox",
  "AudioUnit",
  "AVFoundation",
  "NaturalLanguage",
  "Symbols",
];

const MACOS_FRAMEWORKS = ["AppKit", "CoreAudio", "ScreenCaptureKit"];
const IOS_FRAMEWORKS = ["UIKit"];

function getSDKPath(platform) {
  const output = spawnSync("xcrun", ["--sdk", platform, "--show-sdk-path"], {
    stdio: ["ignore", "pipe", "inherit"],
    encoding: "utf8",
  });

  if (output.status !== 0) {
    throw new Error(`Failed to get SDK path for ${platform}`);
  }

  return output.stdout.trim();
}

const sdks = {
  macos: {
    path: getSDKPath("macosx"),
    frameworks: [...COMMON_FRAMEWORKS, ...MACOS_FRAMEWORKS],
    targets: {
      x86_64: "x86_64-apple-macos11.0",
      arm64: "arm64-apple-macos11.0",
    },
  },
  ios: {
    path: getSDKPath("iphoneos"),
    frameworks: [...COMMON_FRAMEWORKS, ...IOS_FRAMEWORKS],
    targets: {
      arm64: "arm64-apple-ios13.0",
    },
    tnsTarget: "ios-arm64",
  },
  "ios-sim": {
    path: getSDKPath("iphonesimulator"),
    frameworks: [...COMMON_FRAMEWORKS, ...IOS_FRAMEWORKS],
    targets: {
      x86_64: "x86_64-apple-ios13.0-simulator",
      arm64: "arm64-apple-ios13.0-simulator",
    },
    tnsTarget: "ios-arm64_x86_64-simulator",
  },
  catalyst: {
    path: getSDKPath("iphoneos"),
    frameworks: [...COMMON_FRAMEWORKS, ...MACOS_FRAMEWORKS, ...IOS_FRAMEWORKS],
    targets: {
      x86_64: "x86_64-apple-ios13.0-macabi",
      arm64: "arm64-apple-ios13.0-macabi",
    },
    tnsTarget: "ios-arm64_x86_64-maccatalyst",
  },
  visionos: {
    path: getSDKPath("xros"),
    frameworks: [...COMMON_FRAMEWORKS],
    targets: {
      arm64: "arm64-apple-xros26.0",
    },
    tnsTarget: "xros-arm64",
  },
  "visionos-sim": {
    path: getSDKPath("xrsimulator"),
    frameworks: [...COMMON_FRAMEWORKS],
    targets: {
      arm64: "arm64-apple-xros26.0-simulator",
    },
    tnsTarget: "xros-arm64_x86_64-simulator",
  },
};

async function main() {
  const sdkName = process.argv[2] ?? "macos";
  const sdk = sdks[sdkName];

  if (!sdk) {
    throw new Error(`Invalid platform: ${sdkName}`);
  }

  const typesDir = path.resolve(__dirname, "..", "packages", sdkName, "types");
  await fs.rm(typesDir, { recursive: true, force: true });
  await fs.mkdir(typesDir, { recursive: true });

  for (const arch of Object.keys(sdk.targets)) {
    const exec = path.resolve(
      __dirname,
      "..",
      "metadata-generator",
      "dist",
      "arm64",
      "bin",
      "objc-metadata-generator",
    );

    const args = [
      `types=${typesDir}`,
      ...(sdkName === "macos"
        ? [
            "ts-index-mode=frameworks-list",
            "ts-index-frameworks=Foundation,AppKit",
          ]
        : ["ts-index-mode=all"]),
      "-verbose",
      "-output-bin",
      path.resolve(
        __dirname,
        "..",
        "metadata-generator",
        "metadata",
        `metadata.${sdkName}.${arch}.nsmd`,
      ),
      "-output-umbrella",
      path.resolve(
        __dirname,
        "..",
        "metadata-generator",
        "metadata",
        `metadata.${sdkName}.${arch}.h`,
      ),
      "Xclang",
      "-isysroot",
      sdk.path,
      "-std=gnu99",
      "-target",
      sdk.targets[arch],
    ];

    // for (const framework of sdk.frameworks) {
    //   args.push(`framework=${framework}`);
    // }

    console.log(`$ MetadataGenerator ${args.join(" ")}`);

    const output = spawnSync(exec, args, {
      stdio: "inherit",
    });

    if (output.status !== 0) {
      throw new Error("Failed to generate metadata");
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

const COMMON_FRAMEWORKS = [
  "Foundation",
  "CoreFoundation",
  "CoreGraphics",
  "CoreText",
  "QuartzCore",
  "WebKit",

  // Optional for core compat
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

interface SDK {
  path: string;
  frameworks: string[];
  targets: Record<string, string>;
  tnsTarget?: string;
}

function getSDKPath(platform: string) {
  const { stdout, success } = new Deno.Command("xcrun", {
    args: ["--sdk", platform, "--show-sdk-path"],
    stdout: "piped",
    stderr: "inherit",
    stdin: "null",
  }).outputSync();
  if (!success) {
    throw new Error(`Failed to get SDK path for ${platform}`);
  }
  return new TextDecoder().decode(stdout).trim();
}

const sdks: Record<string, SDK> = {
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
      arm64: "arm64-apple-xros13.0",
    },
    tnsTarget: "xros-arm64",
  },
  "visionos-sim": {
    path: getSDKPath("xrsimulator"),
    frameworks: [...COMMON_FRAMEWORKS],
    targets: {
      arm64: "arm64-apple-xros13.0-simulator",
    },
    tnsTarget: "xros-arm64_x86_64-simulator",
  },
};

const sdkName = Deno.args[0] ?? "macos";
const sdk = sdks[sdkName];
if (!sdk) {
  throw new Error(`Invalid platform: ${sdkName}`);
}

await Deno.remove(new URL(`../packages/${sdkName}/types`, import.meta.url), {
  recursive: true,
}).catch(() => {});
await Deno.mkdir(new URL(`../packages/${sdkName}/types`, import.meta.url), {
  recursive: true,
}).catch(() => {});

for (const arch in sdk.targets) {
  const exec = new URL(
    "../metadata-generator/dist/arm64/bin/objc-metadata-generator",
    import.meta.url,
  );
  // Ex: -verbose -output-bin -output-umbrella -docset-path Xclang -isysroot /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.5.sdk -std=gnu99 -target arm64-apple-ios18.5-simulator
  const args = [
    `types=${
      new URL(`../packages/${sdkName}/types`, import.meta.url).pathname
    }`,
    "-verbose",
    "-output-bin",
    new URL(
      `../metadata-generator/metadata/metadata.${sdkName}.${arch}.nsmd`,
      import.meta.url,
    ).pathname,
    "-output-umbrella",
    new URL(
      `../metadata-generator/metadata/metadata.${sdkName}.${arch}.h`,
      import.meta.url,
    ).pathname,
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

  console.log(`%c$ MetadataGenerator ${args.join(" ")}`, "color: grey");

  const proc = new Deno.Command(exec, {
    stdin: "null",
    stdout: "inherit",
    stderr: "inherit",
    args,
  });

  const output = proc.outputSync();
  if (!output.success) {
    console.log(output);
    throw new Error("Failed to generate metadata");
  }
}

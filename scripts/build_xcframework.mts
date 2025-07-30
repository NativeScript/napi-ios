import path from "node:path";
import process from "node:process";
import yargsParser from "yargs-parser";
import { createXCframework } from "react-native-node-api";

main();

/**
 * Builds an XCFramework in the style that `react-native-node-api` expects,
 * following the [prebuilds standard](https://github.com/callstackincubator/react-native-node-api/blob/9b231c14459b62d7df33360f930a00343d8c46e6/docs/PREBUILDS.md).
 *
 * This is really just an XCFramework renamed with a `.node` extension,
 * containing an extra file named `react-native-api-module`. Once `cmake-rn`
 * supports it, we may be able to replace this whole script with a simple
 * `cmake-rn` call.
 */
async function main() {
  const __dirname = import.meta.dirname;
  if (!__dirname) {
    throw new Error("Expected import.meta.dirname to be truthy.");
  }

  const monorepoRoot = path.resolve(__dirname, "..");

  // Args are designed to match the names of the args from cmake we're
  // interested in.
  const args = yargsParser(process.argv.slice(2), {
    configuration: {
      "short-option-groups": false,
    },
    string: ["output", "framework", "debug-symbols"],
    array: ["framework", "debug-symbols"],
    boolean: ["help"],
    alias: {
      h: "help",
    },
    default: {
      help: false,
    },
  });

  const {
    output,
    framework: frameworks = new Array<string>(),
    "debug-symbols": debugSymbols = new Array<string>(),
    help,
  } = args;

  const helpText = `
Typical usage:

$ deno run -A ./scripts/build_xcframework.mts --output packages/ios/build/Release/NativeScript.apple.node -framework dist/intermediates/ios/RelWithDebInfo-iphoneos/NativeScript.framework -debug-symbols dist/intermediates/ios/RelWithDebInfo-iphoneos/NativeScript.framework.dSYM

$ deno run -A ./scripts/build_xcframework.mts --output packages/macos/build/Release/NativeScript.apple.node -framework dist/intermediates/macos/RelWithDebInfo/NativeScript.framework -debug-symbols dist/intermediates/macos/RelWithDebInfo/NativeScript.framework.dSYM
`.trim();

  if (help) {
    console.log(helpText);
    process.exit(0);
  }

  if (!output) {
    console.log(
      `Please specify the output directory by passing the \`--output\` arg.\n\n${helpText}`
    );
    process.exit(1);
  }

  if (!isStringArray(frameworks) || !isStringArray(debugSymbols)) {
    console.log(
      `Expected -framework and -debug-symbols to be parsed as arrays.\n\n${helpText}`
    );
    process.exit(1);
  }

  if (!frameworks?.length) {
    console.log(
      `Please specify at least one framework to bundle into the xcframework by passing the \`-framework\` arg one or more times.\n\n${helpText}`
    );
    process.exit(1);
  }

  const outputPath = path.resolve(monorepoRoot, output);
  const frameworkPaths = frameworks.map((framework) =>
    path.resolve(monorepoRoot, framework)
  );
  // TODO: Pass this to the createXCFramework() options, once supported.
  const _dsymPaths =
    debugSymbols?.map((dsym) => path.resolve(monorepoRoot, dsym)) ?? [];

  try {
    await createXCframework({
      outputPath,
      frameworkPaths,
      // dsymPaths,
      autoLink: true,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "<unknown>";
    console.error(`Failed to assemble XCFramework: ${errorMessage}`, error);
    process.exit(1);
  }

  console.log(
    `\x1b[32m✔\x1b[0m XCFramework assembled into \x1b[2m${path.relative(
      monorepoRoot,
      outputPath
    )}\x1b[22m`
  );
}

function isStringArray(value: unknown): value is Array<string> {
  if (!Array.isArray(value)) {
    return false;
  }

  for (const element of value) {
    if (typeof element !== "string") {
      return false;
    }
  }

  return true;
}

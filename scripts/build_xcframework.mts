import path from "node:path";
import process from "node:process";
import { parseArgs } from "node:util";
import { createXCframework } from "react-native-node-api";

main();

async function main() {
  const __dirname = import.meta.dirname;
  if (!__dirname) {
    throw new Error("Expected import.meta.dirname to be truthy.");
  }

  const monorepoRoot = path.resolve(__dirname, "..");

  const args = parseArgs({
    args: process.argv.slice(2),
    options: {
      output: {
        type: "string",
      },
      framework: {
        multiple: true,
        type: "string",
      },
      "debug-symbols": {
        multiple: true,
        type: "string",
      },
      help: {
        short: "h",
        type: "boolean",
        default: false,
      },
    },
  });

  const {
    values: {
      output,
      framework: frameworks,
      "debug-symbols": debugSymbols,
      help,
    },
  } = args;

  const helpText = `
Typical usage:

$ deno run -A ./scripts/build_xcframework.ts --output packages/ios/build/Release/NativeScript.apple.node --framework dist/intermediates/ios/RelWithDebInfo-iphoneos/NativeScript.framework
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

  if (!frameworks?.length) {
    console.log(
      `Please specify at least one framework to bundle into the xcframework by passing the \`--framework\` arg one or more times.\n\n${helpText}`
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
    console.error(`Failed to assemble XCFramework: ${errorMessage}`);
    process.exit(1);
  }

  console.log(
    `\x1b[32m✔\x1b[0m XCFramework assembled into \x1b[2m${path.relative(
      monorepoRoot,
      outputPath
    )}\x1b[22m`
  );
}

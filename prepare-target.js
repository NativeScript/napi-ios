const process = require("node:process");
const path = require("node:path");
const fs = require("node:fs");

const cmdArgs = process.argv.slice(2);
const target = cmdArgs[0]; // ios, macos or visionos

const packagePath = path.resolve(__dirname, "package.json");
const packageJson = JSON.parse(fs.readFileSync(packagePath));

packageJson.name = `@nativescript/${target}`;
packageJson.description = `NativeScript Runtime for ${
  target === "ios" ? "iOS" : target === "macos" ? "macOS" : "visionOS"
}`;

fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));

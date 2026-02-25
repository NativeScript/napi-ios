const process = require("node:process");
const semver = require("semver");

let currentVersion = process.env.NPM_VERSION;
if (!currentVersion) {
  const cmdArgs = process.argv.slice(2);
  const target = cmdArgs[0];

  switch (target) {
    case "root":
      currentVersion = require("../package.json").version;
      break;
    case "macos":
      currentVersion = require("../packages/macos/package.json").version;
      break;
    case "ios":
      currentVersion = require("../packages/ios/package.json").version;
      break;
    default:
      throw new Error(
        `Unknown target "${target}". Expected one of "root", "macos", or "ios".`,
      );
  }
}

function validateNpmTag(version) {
  const parsed = semver.parse(version);
  return (
    parsed.prerelease.length === 0 || /^[a-zA-Z]+$/.test(parsed.prerelease[0])
  );
}

function getNpmTag(version) {
  if (!validateNpmTag(version)) {
    throw new Error(`Invalid npm tag "${version}"`);
  }
  const parsed = semver.parse(version);
  return parsed.prerelease[0] || "latest";
}

console.log(getNpmTag(currentVersion));

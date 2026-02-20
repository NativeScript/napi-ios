const path = require('node:path');
const fs = require('node:fs');
const { getDefaultConfig } = require('@expo/metro-config');
const { makeMetroConfig } = require('@rnx-kit/metro-config');

const exampleWorkspace = path.resolve(__dirname, '.');
const nativescriptJsi = path.resolve(__dirname, '..');
const monorepoRoot = path.resolve(__dirname, '../../..');

const allNodeModules = [
  path.resolve(exampleWorkspace, 'node_modules'),
  path.resolve(nativescriptJsi, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = makeMetroConfig(getDefaultConfig(__dirname));

config.resolver.nodeModulesPaths = allNodeModules;
config.resolver.extraNodeModules = {
  'nativescript-jsi': nativescriptJsi,
};

config.watchFolders = [
  ...allNodeModules.filter((filePath) => fs.existsSync(filePath)),
  nativescriptJsi,
];
console.log(config.watchFolders);

module.exports = config;

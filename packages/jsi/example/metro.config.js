const path = require('node:path');
const { makeMetroConfig } = require('@rnx-kit/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = makeMetroConfig({
  transformer: {
    getTransformOptions: () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
});
config.watchFolders = [
  ...new Set([
    ...config.watchFolders,
    // Watch the parent directory, for the "nativescript-jsi" package.
    path.resolve('..'),
  ]),
];

module.exports = config;

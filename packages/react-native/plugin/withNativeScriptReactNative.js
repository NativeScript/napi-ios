const pkg = require('../package.json');

const DEFAULTS = {
  ios: {
    hermes: true,
    newArchitecture: true,
  },
  babelPlugin: true,
};

const BABEL_PLUGIN = '@nativescript/react-native/babel-plugin';

function readBoolean(value, fallback) {
  return typeof value === 'boolean' ? value : fallback;
}

function normalizeOptions(options = {}) {
  const ios = options.ios || {};
  return {
    babelPlugin: readBoolean(options.babelPlugin, DEFAULTS.babelPlugin),
    ios: {
      hermes: readBoolean(
        ios.hermes,
        readBoolean(options.hermes, DEFAULTS.ios.hermes),
      ),
      newArchitecture: readBoolean(
        ios.newArchitecture,
        readBoolean(options.newArchitecture, DEFAULTS.ios.newArchitecture),
      ),
    },
  };
}

function ensureBabelPlugin(projectRoot) {
  const fs = require('fs');
  const path = require('path');
  const candidates = ['babel.config.js', 'babel.config.cjs'];
  let babelConfigPath = candidates
    .map((candidate) => path.join(projectRoot, candidate))
    .find((candidate) => fs.existsSync(candidate));

  if (!babelConfigPath) {
    babelConfigPath = path.join(projectRoot, 'babel.config.js');
    fs.writeFileSync(
      babelConfigPath,
      [
        'module.exports = function(api) {',
        '  api.cache(true);',
        '  return {',
        "    presets: ['babel-preset-expo'],",
        `    plugins: ['${BABEL_PLUGIN}'],`,
        '  };',
        '};',
        '',
      ].join('\n'),
    );
    return;
  }

  let source = fs.readFileSync(babelConfigPath, 'utf8');
  if (source.includes(BABEL_PLUGIN)) {
    return;
  }

  const pluginEntry = `'${BABEL_PLUGIN}', `;
  if (/plugins\s*:\s*\[/.test(source)) {
    source = source.replace(/plugins\s*:\s*\[/, (match) => `${match}${pluginEntry}`);
  } else if (/return\s*\{/.test(source)) {
    source = source.replace(
      /return\s*\{/,
      (match) => `${match}\n    plugins: ['${BABEL_PLUGIN}'],`,
    );
  } else if (/module\.exports\s*=\s*\{/.test(source)) {
    source = source.replace(
      /module\.exports\s*=\s*\{/,
      (match) => `${match}\n  plugins: ['${BABEL_PLUGIN}'],`,
    );
  } else if (/export\s+default\s+\{/.test(source)) {
    source = source.replace(
      /export\s+default\s+\{/,
      (match) => `${match}\n  plugins: ['${BABEL_PLUGIN}'],`,
    );
  } else {
    source += `\n// @nativescript/react-native: add '${BABEL_PLUGIN}' to your Babel plugins.\n`;
  }

  fs.writeFileSync(babelConfigPath, source);
}

function withNativeScriptBabelPlugin(config) {
  let withDangerousMod;
  try {
    ({withDangerousMod} = require('expo/config-plugins'));
  } catch (error) {
    return config;
  }

  return withDangerousMod(config, [
    'ios',
    async (modConfig) => {
      ensureBabelPlugin(modConfig.modRequest.projectRoot);
      return modConfig;
    },
  ]);
}

function withNativeScriptReactNative(config, options) {
  const normalized = normalizeOptions(options);

  config.ios = config.ios || {};

  if (normalized.ios.hermes) {
    config.ios.jsEngine = 'hermes';
  }

  if (normalized.ios.newArchitecture) {
    // Expo SDKs have accepted both the root and iOS-scoped keys over time.
    // Set both so CNG and existing native projects agree on the required RN mode.
    config.newArchEnabled = true;
    config.ios.newArchEnabled = true;
  }

  if (normalized.babelPlugin) {
    config = withNativeScriptBabelPlugin(config);
  }

  return config;
}

module.exports = withNativeScriptReactNative;
module.exports.default = withNativeScriptReactNative;
module.exports.withNativeScriptReactNative = withNativeScriptReactNative;
module.exports.ensureBabelPlugin = ensureBabelPlugin;
module.exports.pkg = pkg;

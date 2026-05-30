const pkg = require('../package.json');

const DEFAULTS = {
  ios: {
    hermes: true,
    newArchitecture: true,
  },
};

function readBoolean(value, fallback) {
  return typeof value === 'boolean' ? value : fallback;
}

function normalizeOptions(options = {}) {
  const ios = options.ios || {};
  return {
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

  return config;
}

module.exports = withNativeScriptReactNative;
module.exports.default = withNativeScriptReactNative;
module.exports.withNativeScriptReactNative = withNativeScriptReactNative;
module.exports.pkg = pkg;

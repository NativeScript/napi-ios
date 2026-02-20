# nativescript-jsi

A JSI projection for NativeScript

## Installation


```sh
npm install nativescript-jsi
```


## Usage


```js
import { multiply } from 'nativescript-jsi';

// ...

const result = multiply(3, 7);
```


## Contributing

```sh
cd packages/jsi/example

# Generate the Xcode project (packages/jsi/example/ios):
npx expo prebuild --platform ios --clean

# Install CocoaPods for the iOS and macOS apps:
cd ios && pod install && cd ..
cd macos && pod install && cd ..

# ==== iOS ====
# Build and run the iOS example app.
npm run ios
# =============

# === macOS ===
# You will need two terminals for this.
# Terminal 1: Start up the Metro bundler.
npm run start
# Terminal 2: Build and run the macOS app.
npm run macos
# =============
```

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)

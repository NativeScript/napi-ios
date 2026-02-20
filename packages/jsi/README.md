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

To run the example app:

```sh
cd packages/jsi/example

# To run on iOS:
npm run ios

# To run on Android:
npm run android
```

React Native CLI defaults to emulator/simulator unless you have a real device connected.  You can pass `-- --list-devices` if you want to interactively choose the device to run on.

If you want to run on a real device on iOS, you will need to open `packages/jsi/example/ios/NativescriptJsiExample.xcworkspace` and configure codesigning to use your Apple Developer Account's team.

## License

MIT

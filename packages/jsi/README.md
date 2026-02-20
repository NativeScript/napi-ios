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

# Build and run the iOS example app.
npm run ios
```

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)

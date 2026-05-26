# NativeScript Expo Demo

This example is meant to be copied into a generated Expo app after installing
`@nativescript/react-native`.

```sh
npx create-expo-app NativeScriptExpoDemo --template blank-typescript
cd NativeScriptExpoDemo
npm install /path/to/nativescript-react-native-0.0.1.tgz
cp /path/to/napi-ios/examples/expo-demo/app.config.js ./app.config.js
cp /path/to/napi-ios/examples/expo-demo/App.tsx ./App.tsx
npx expo prebuild --platform ios
npx expo run:ios
```

The package config plugin enables the iOS New Architecture and Hermes during
prebuild. This custom native module cannot run inside Expo Go.
